"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawn } = require("node:child_process");
const { test, before, after } = require("node:test");
const {
  controlStateFixture,
  loadGame,
  saveGame,
  startTemporaryServer,
  stopTemporaryServer
} = require("./token-controller-test-fixture.js");

let server;
let browserProcess;
let browserProfile;
let cdp;
const browserErrors = [];
const browserDiagnostics = [];

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function availablePort() {
  const net = require("node:net");
  const listener = net.createServer();
  await new Promise((resolve, reject) => listener.listen(0, "127.0.0.1", resolve).once("error", reject));
  const port = listener.address().port;
  await new Promise((resolve) => listener.close(resolve));
  return port;
}

function browserExecutable() {
  const candidates = [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
  ];
  const executable = candidates.find((candidate) => fs.existsSync(candidate));
  if (!executable) throw new Error("No supported Chromium browser was found for Token browser QA.");
  return executable;
}

async function waitForJson(url, timeoutMs = 10000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return response.json();
    } catch {
      // Chromium is still opening its debugging endpoint.
    }
    await delay(50);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

class CdpClient {
  constructor(url) {
    this.socket = new WebSocket(url);
    this.sequence = 0;
    this.pending = new Map();
    this.listeners = new Map();
  }

  async open() {
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error("Timed out opening the Chromium debugging socket.")), 10000);
      this.socket.addEventListener("open", () => {
        clearTimeout(timeout);
        resolve();
      }, { once: true });
      this.socket.addEventListener("error", (event) => {
        clearTimeout(timeout);
        reject(event);
      }, { once: true });
    });
    this.socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(message.error.message));
        else pending.resolve(message.result || {});
        return;
      }
      (this.listeners.get(message.method) || []).forEach((listener) => listener(message.params || {}));
    });
    this.socket.addEventListener("close", () => {
      const diagnostic = browserDiagnostics.join(" ").trim();
      this.pending.forEach(({ reject, method }) => reject(new Error(
        `Chromium closed the debugging socket while waiting for ${method}.${diagnostic ? ` ${diagnostic}` : ""}`
      )));
      this.pending.clear();
    });
  }

  send(method, params = {}, timeoutMs = 10000) {
    const id = ++this.sequence;
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`Timed out waiting for Chromium command ${method}.`));
      }, timeoutMs);
      this.pending.set(id, {
        method,
        resolve: (value) => {
          clearTimeout(timeout);
          resolve(value);
        },
        reject: (error) => {
          clearTimeout(timeout);
          reject(error);
        }
      });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  on(method, listener) {
    const listeners = this.listeners.get(method) || [];
    listeners.push(listener);
    this.listeners.set(method, listeners);
  }

  once(method, timeoutMs = 10000) {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error(`Timed out waiting for CDP event ${method}`)), timeoutMs);
      const listener = (params) => {
        clearTimeout(timeout);
        const listeners = this.listeners.get(method) || [];
        this.listeners.set(method, listeners.filter((entry) => entry !== listener));
        resolve(params);
      };
      this.on(method, listener);
    });
  }

  async close() {
    if (this.socket.readyState === WebSocket.CLOSED) return;
    const closed = new Promise((resolve) => {
      const timeout = setTimeout(resolve, 1000);
      this.socket.addEventListener("close", () => {
        clearTimeout(timeout);
        resolve();
      }, { once: true });
    });
    this.socket.close();
    await closed;
  }
}

async function evaluate(expression, timeoutMs = 10000) {
  let result;
  try {
    result = await cdp.send("Runtime.evaluate", {
      expression,
      awaitPromise: true,
      returnByValue: true
    }, timeoutMs);
  } catch (error) {
    throw new Error(`${error.message} Expression: ${String(expression).replace(/\s+/g, " ").slice(0, 240)}`);
  }
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text || "Browser evaluation failed.");
  }
  return result.result?.value;
}

async function waitUntil(expression, timeoutMs = 10000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    const errorText = await evaluate("document.querySelector('#qa-error:not([hidden])')?.textContent || ''");
    if (errorText) throw new Error(errorText);
    if (await evaluate(expression)) return;
    await delay(40);
  }
  const diagnostic = await evaluate(`JSON.stringify({
    url: location.href,
    title: document.title,
    readyState: document.readyState,
    busy: document.body?.dataset.busy,
    error: document.getElementById('qa-error')?.textContent || '',
    scripts: [...document.scripts].map((script) => script.src)
  })`);
  throw new Error(`Timed out waiting for browser condition: ${expression}\n${diagnostic}\nBrowser errors: ${browserErrors.join(" | ")}`);
}

async function persistBrowserState(gameId) {
  const snapshot = await evaluate("createPersistableStateSnapshot(state)", 30000);
  const current = await loadGame(server.baseUrl, gameId);
  await saveGame(server.baseUrl, gameId, snapshot, Number(current.version || 0));
  return snapshot;
}

async function navigate(scenarioId) {
  const gameId = `${scenarioId.toLowerCase()}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const bootstrap = await fetch(`${server.baseUrl}/api/games`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ id: gameId, name: `Token QA ${scenarioId}` })
  });
  if (!bootstrap.ok) throw new Error(`Could not bootstrap browser QA game: ${bootstrap.status}`);
  const loaded = cdp.once("Page.loadEventFired");
  await cdp.send("Page.navigate", {
    url: `${server.baseUrl}/token-qa-harness.html?scenario=${encodeURIComponent(scenarioId)}&gameId=${encodeURIComponent(gameId)}`
  });
  await loaded;
  await waitUntil("document.body?.dataset.busy === 'false'");
}

async function reload() {
  const loaded = cdp.once("Page.loadEventFired");
  await cdp.send("Page.reload", { ignoreCache: true });
  await loaded;
  await waitUntil("document.body?.dataset.busy === 'false'");
}

async function reloadProduction(marker) {
  const loaded = cdp.once("Page.loadEventFired", 60000);
  await cdp.send("Page.reload", { ignoreCache: true }, 60000);
  await loaded;
  await waitUntil(`(() => { try { return typeof state === "object" && state?.marker === ${JSON.stringify(marker)}; } catch { return false; } })()`, 30000);
}

async function navigateProduction(state, scenarioId) {
  const gameId = `${scenarioId.toLowerCase()}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const bootstrap = await fetch(`${server.baseUrl}/api/games`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ id: gameId, name: `Production QA ${scenarioId}` })
  });
  const payload = await bootstrap.json();
  if (!bootstrap.ok) throw new Error(`Could not bootstrap production browser QA game: ${bootstrap.status}`);
  await saveGame(server.baseUrl, gameId, state, Number(payload.game?.version || 0));
  const loaded = cdp.once("Page.loadEventFired", 60000);
  await cdp.send("Page.navigate", {
    url: `${server.baseUrl}/?view=game&game=${encodeURIComponent(gameId)}`
  }, 60000);
  await loaded;
  await waitUntil(`(() => { try {
    return typeof liveRefereeWickedBlowTargetScreenMarkup === "function"
      && typeof state === "object"
      && state?.marker === ${JSON.stringify(state.marker)};
  } catch { return false; } })()`, 60000);
  return gameId;
}

async function click(action) {
  const point = await evaluate(`(() => {
    const button = document.querySelector('[data-action="${action}"]');
    if (!button) throw new Error('Visible action ${action} was not found.');
    const rect = button.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) throw new Error('Visible action ${action} has no clickable area.');
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  })()`);
  await cdp.send("Input.dispatchMouseEvent", { type: "mousePressed", x: point.x, y: point.y, button: "left", clickCount: 1 });
  await cdp.send("Input.dispatchMouseEvent", { type: "mouseReleased", x: point.x, y: point.y, button: "left", clickCount: 1 });
  await waitUntil("document.body?.dataset.busy === 'false'");
}

async function check(key) {
  return evaluate(`document.querySelector('[data-check="${key}"]')?.textContent || ''`);
}

async function step() {
  return Number(await evaluate("document.body?.dataset.step || '-1'"));
}

function assertNoNewBrowserErrors(startIndex) {
  assert.deepEqual(browserErrors.slice(startIndex), []);
}

before(async () => {
  server = await startTemporaryServer("token-browser");
  const debuggingPort = await availablePort();
  browserProfile = fs.mkdtempSync(path.join(os.tmpdir(), "rival-saga-token-browser-profile-"));
  browserProcess = spawn(browserExecutable(), [
    "--headless=new",
    `--remote-debugging-port=${debuggingPort}`,
    "--remote-allow-origins=*",
    `--user-data-dir=${browserProfile}`,
    "--disable-background-networking",
    "--disable-component-update",
    "--disable-default-apps",
    "--disable-extensions",
    "--disable-gpu",
    "--disable-gpu-sandbox",
    "--no-sandbox",
    "--no-first-run",
    "--no-default-browser-check",
    "--window-size=1280,900",
    "about:blank"
  ], { stdio: ["ignore", "ignore", "pipe"] });
  browserProcess.stderr.on("data", (chunk) => {
    if (browserDiagnostics.join("").length < 20000) browserDiagnostics.push(String(chunk).trim());
  });
  browserProcess.on("exit", (code, signal) => browserDiagnostics.push(`Chromium exited with code ${code} and signal ${signal || "none"}.`));

  await waitForJson(`http://127.0.0.1:${debuggingPort}/json/version`);
  const targets = await waitForJson(`http://127.0.0.1:${debuggingPort}/json/list`);
  const page = targets.find((target) => target.type === "page");
  if (!page?.webSocketDebuggerUrl) throw new Error("Chromium did not expose a debuggable page.");
  cdp = new CdpClient(page.webSocketDebuggerUrl);
  await cdp.open();
  await Promise.all([
    cdp.send("Page.enable"),
    cdp.send("Runtime.enable"),
    cdp.send("Log.enable"),
    cdp.send("Network.enable")
  ]);
  await cdp.send("Network.setBlockedURLs", { urls: ["https://img.pokemondb.net/*"] });
  cdp.on("Runtime.exceptionThrown", (params) => browserErrors.push(params.exceptionDetails?.exception?.description || params.exceptionDetails?.text || "Uncaught exception"));
  cdp.on("Runtime.consoleAPICalled", (params) => {
    if (params.type === "error") browserErrors.push(params.args.map((arg) => arg.value || arg.description || "").join(" "));
  });
  cdp.on("Log.entryAdded", ({ entry }) => {
    const message = `${entry?.text || "Browser log error"}${entry?.url ? ` (${entry.url})` : ""}`;
    if (entry?.level === "error" && !/img\.pokemondb\.net/.test(message)) {
      browserErrors.push(message);
    }
  });
  cdp.on("Page.javascriptDialogOpening", ({ message = "", type = "dialog" } = {}) => {
    browserErrors.push(`Unexpected ${type}: ${message}`);
    cdp.send("Page.handleJavaScriptDialog", { accept: false }).catch(() => {});
  });
});

after(async () => {
  if (cdp) {
    try {
      await cdp.send("Browser.close", {}, 3000);
    } catch {
      // Chromium may close the socket before acknowledging its shutdown command.
    }
    await cdp.close();
  }
  if (browserProcess && browserProcess.exitCode === null) {
    const exited = new Promise((resolve) => browserProcess.once("exit", resolve));
    browserProcess.kill();
    await Promise.race([exited, delay(3000)]);
  }
  if (browserProfile && fs.existsSync(browserProfile)) {
    try {
      fs.rmSync(browserProfile, { recursive: true, force: true, maxRetries: 3, retryDelay: 50 });
    } catch {
      // A Chromium child may briefly retain a profile lock after the parent exits.
    }
  }
  await stopTemporaryServer(server);
});

test("[BROWSER-001] visible Rage Restrict Unban flow survives backend refresh", async () => {
  const errorStart = browserErrors.length;
  await navigate("BROWSER-001");
  assert.equal(await step(), 0);
  await click("rage");
  assert.equal(await step(), 1);
  assert.equal(await check("gold-legality"), "Legal");
  await click("restrict");
  assert.equal(await step(), 2);
  assert.equal(await check("gold-legality"), "Legal");
  assert.equal(await check("red-legality"), "Illegal");
  assert.equal(await check("restrict-count"), "1");
  await reload();
  assert.equal(await step(), 2);
  assert.equal(await check("gold-legality"), "Legal");
  assert.equal(await check("red-legality"), "Illegal");
  assert.equal(await check("restrict-count"), "1");
  await click("unban");
  assert.equal(await step(), 3);
  assert.equal(await check("gold-legality"), "Legal");
  assert.equal(await check("red-legality"), "Legal");
  assert.equal(await check("restrict-count"), "0");
  assert.equal(await check("unban-count"), "1");
  await click("retryProtected");
  assert.equal(await step(), 4);
  assert.equal(await check("restrict-retry"), "Rejected");
  assert.equal(await check("extra-ban-retry"), "Rejected");
  await reload();
  assert.equal(await step(), 4);
  assert.equal(await check("unban-count"), "1");
  assert.match(await evaluate("document.getElementById('save-state').textContent"), /Reloaded revision/);
  assertNoNewBrowserErrors(errorStart);
});

test("[BROWSER-002] selected Substitute negates Extra Ban and visible undo survives refresh", async () => {
  const errorStart = browserErrors.length;
  await navigate("BROWSER-002");
  await click("substituteRed");
  await click("substituteGold");
  await click("extraBan");
  assert.equal(await step(), 3);
  assert.equal(await check("red-substitute"), "consumed");
  assert.equal(await check("gold-substitute"), "active");
  assert.equal(await check("ban-count"), "0");
  assert.equal(await check("phase-protection-count"), "1");
  await reload();
  assert.equal(await check("red-substitute"), "consumed");
  assert.equal(await check("gold-substitute"), "active");
  await click("undoBan");
  assert.equal(await step(), 4);
  assert.equal(await check("red-substitute"), "active");
  assert.equal(await check("gold-substitute"), "active");
  assert.equal(await check("phase-protection-count"), "0");
  await reload();
  assert.equal(await check("red-substitute"), "active");
  assert.equal(await check("gold-substitute"), "active");
  assertNoNewBrowserErrors(errorStart);
});

test("[BROWSER-003] visible Arena Trap and Clear Smog outcomes survive backend refresh", async () => {
  const errorStart = browserErrors.length;
  await navigate("BROWSER-003");
  await click("arena");
  assert.equal(await check("arena-exact"), "Blocked");
  assert.equal(await check("arena-replacement"), "Rejected");
  assert.equal(await check("arena-curse"), "Blocked");
  assert.equal(await check("arena-draft-member"), "Inserted");
  assert.equal(await check("arena-team-member"), "Inserted");
  assert.equal(await check("arena-slot-lock"), "Locked");
  assert.equal(await check("arena-compensation"), "Choice required");
  assert.equal(await check("arena-custom-move"), "Not selected");
  await click("arenaCompensation");
  assert.equal(await check("arena-exact"), "Yes");
  assert.equal(await check("arena-compensation"), "Move: Recover");
  assert.equal(await check("arena-custom-move"), "Recover");
  await click("rageForClear");
  assert.equal(await check("rage-buff-count"), "2");
  assert.equal(await check("move-grant"), "active");
  assert.equal(await check("rage-immunity"), "Active");
  await click("clear");
  assert.equal(await step(), 4);
  assert.equal(await check("rage-buff-count"), "0");
  assert.equal(await check("move-grant"), "removed");
  assert.equal(await check("rage-immunity"), "Active");
  await reload();
  assert.equal(await check("arena-replacement"), "Rejected");
  assert.equal(await check("arena-curse"), "Blocked");
  assert.equal(await check("arena-draft-member"), "Inserted");
  assert.equal(await check("arena-team-member"), "Inserted");
  assert.equal(await check("arena-slot-lock"), "Locked");
  assert.equal(await check("arena-compensation"), "Move: Recover");
  assert.equal(await check("arena-custom-move"), "Recover");
  assert.equal(await check("rage-buff-count"), "0");
  assert.equal(await check("move-grant"), "removed");
  assertNoNewBrowserErrors(errorStart);
});

test("[BROWSER-004] visible Incinerate and Steal operations survive backend refresh", async () => {
  const errorStart = browserErrors.length;
  await navigate("BROWSER-004");
  await click("incinerate");
  assert.equal(await step(), 1);
  assert.equal(await check("gold-leftovers"), "0");
  assert.equal(await check("red-leftovers"), "2");
  assert.equal(await check("red-recover"), "0");
  assert.equal(await check("steevee-leftovers"), "1");
  assert.equal(await check("destroy-operations"), "2");
  await reload();
  assert.equal(await check("gold-leftovers"), "0");
  assert.equal(await check("red-leftovers"), "2");
  assert.equal(await check("red-recover"), "0");
  assert.equal(await check("destroy-operations"), "2");
  await click("steal");
  assert.equal(await step(), 2);
  assert.equal(await check("lucario-owner"), "Steevee");
  assert.equal(await check("red-team-reference"), "Reference removed");
  assert.equal(await check("red-build-reference"), "Reference removed");
  assert.equal(await check("transfer-operations"), "1");
  await reload();
  assert.equal(await check("lucario-owner"), "Steevee");
  assert.equal(await check("transfer-operations"), "1");
  assert.match(await evaluate("document.getElementById('save-state').textContent"), /Reloaded revision/);
  assertNoNewBrowserErrors(errorStart);
});

test("[BROWSER-005] visible Wicked Blow exact-instance replacement survives backend refresh", async () => {
  const errorStart = browserErrors.length;
  await navigate("BROWSER-005");
  assert.equal(await check("wicked-stable-id"), "red-garchomp-2");
  assert.equal(await check("wicked-roster-species"), "Garchomp");
  await click("wicked");
  assert.equal(await step(), 1);
  assert.equal(await check("wicked-stable-id"), "red-garchomp-2");
  assert.equal(await check("wicked-roster-species"), "Barbaracle");
  assert.equal(await check("wicked-team-membership"), "Not added");
  assert.equal(await check("wicked-build-species"), "Barbaracle");
  assert.equal(await check("wicked-build-reset"), "Reset");
  assert.equal(await check("wicked-operation-count"), "1");
  assert.equal(await check("wicked-tier-roll"), "Great Elite -> Poke");
  await reload();
  assert.equal(await check("wicked-stable-id"), "red-garchomp-2");
  assert.equal(await check("wicked-roster-species"), "Barbaracle");
  assert.equal(await check("wicked-team-membership"), "Not added");
  assert.equal(await check("wicked-build-species"), "Barbaracle");
  assert.equal(await check("wicked-operation-count"), "1");
  assert.match(await evaluate("document.getElementById('save-state').textContent"), /Reloaded revision/);
  assertNoNewBrowserErrors(errorStart);
});

test("[BROWSER-006] visible standard Curse enforcement, repair, refresh, and expiration", async () => {
  const errorStart = browserErrors.length;
  await navigate("BROWSER-006");
  await click("flameCurse");
  assert.equal(await check("curse-configured-item"), "Leftovers");
  assert.equal(await check("curse-effective-item"), "Flame Orb");
  await click("silencingCurse");
  assert.equal(await check("curse-silencing-repair"), "required");
  assert.equal(await check("curse-silenced-moves"), "4");
  await click("repairSilencing");
  assert.equal(await check("curse-silencing-repair"), "completed");
  assert.equal(await check("curse-silenced-moves"), "2");
  await click("imprisonCurse");
  assert.equal(await check("curse-configured-nature"), "Jolly");
  assert.equal(await check("curse-effective-nature"), "Neutral");
  assert.equal(await check("curse-effective-ev-total"), "0");
  await click("toxicCurse");
  await click("ironCurse");
  assert.equal(await step(), 6);
  assert.equal(await check("curse-active-count"), "5");
  await reload();
  assert.equal(await check("curse-active-count"), "5");
  assert.equal(await check("curse-effective-item"), "Flame Orb");
  assert.equal(await check("curse-silencing-repair"), "completed");
  await click("expireCurses");
  assert.equal(await step(), 7);
  assert.equal(await check("curse-active-count"), "0");
  assert.equal(await check("curse-effective-item"), "Leftovers");
  assert.equal(await check("curse-configured-nature"), "Jolly");
  await reload();
  assert.equal(await check("curse-active-count"), "0");
  assertNoNewBrowserErrors(errorStart);
});

test("[BROWSER-007] production Wicked Blow hydration and Sabotage Token authority", async () => {
  const productionState = controlStateFixture("production-live-referee-regressions");
  productionState.activePlayerId = "steevee";
  productionState.activeView = "sheet";
  productionState.liveRefereeCollapsed = false;
  productionState.testingTools.freeMode = true;
  productionState.testingTools.controlledPlayerId = "steevee";
  productionState.pokemonRecords.push({
    id: "red-eevee",
    trainerId: "red",
    name: "Eevee",
    currentSpecies: "Eevee",
    rosterType: "Active",
    status: "Active",
    moves: ["Tackle"]
  });
  await navigateProduction(productionState, "BROWSER-007");
  const errorStart = browserErrors.length;

  const initial = await evaluate(`(() => {
    document.querySelectorAll('script[data-rival-saga-build-data], script[src*="pokemon-build-data.js"]').forEach((script) => script.remove());
    delete window.rivalSagaBuildData;
    pokemonBuildDataLoadPromise = null;
    liveRefereeWickedBlowDataPromise = null;
    liveRefereeWickedBlowDataState = "idle";
    state.liveRefereeScreen = "tokenTarget";
    state.liveRefereeSelectedEffectName = "Wicked Blow";
    const actor = state.players.find((player) => player.id === "steevee");
    const html = liveRefereeWickedBlowTargetScreenMarkup({
      tokenName: "Wicked Blow",
      metadata: tokenEffectMetadataByName("Wicked Blow"),
      actor
    });
    return {
      loading: html.includes('data-wicked-blow-loading-state="loading"'),
      disabledAsMissingData: html.includes("needs loaded evolution data"),
      scriptSrc: document.querySelector('script[data-rival-saga-build-data]')?.src || ""
    };
  })()`);
  assert.equal(initial.loading, true);
  assert.equal(initial.disabledAsMissingData, false);
  assert.match(initial.scriptSrc, new RegExp(`^${server.baseUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/pokemon-build-data\\.js\\?v=7$`));
  await waitUntil("pokemonBuildDataReady() && liveRefereeWickedBlowDataState === 'ready'", 30000);

  const hydrated = await evaluate(`(() => {
    const actor = state.players.find((player) => player.id === "steevee");
    const html = liveRefereeWickedBlowTargetScreenMarkup({
      tokenName: "Wicked Blow",
      metadata: tokenEffectMetadataByName("Wicked Blow"),
      actor
    });
    const rosters = liveRefereeWickedBlowActiveRosterTargets();
    const targets = rosters.flatMap((entry) => entry.targets);
    const ordinary = targets.find((entry) => entry.pokemon.id === "red-garchomp");
    const ambiguous = targets.find((entry) => entry.pokemon.id === "red-eevee");
    const resolution = controlTokenEffects.resolveWickedBlow(state, {
      actorPlayerId: "steevee",
      targetPokemonId: "red-garchomp",
      targetOwnerPlayerId: "red",
      sourceEffectId: "browser-007-wicked",
      sourceTokenName: "Wicked Blow"
    }, controlTokenEffectOptions());
    return {
      loading: html.includes("data-wicked-blow-loading-state"),
      ordinarySelectable: Boolean(ordinary?.preview?.ok),
      ambiguousBlocked: ambiguous?.preview?.ok === false && /different Battle Tiers/.test(ambiguous.preview.reason),
      resolutionResult: resolution.result,
      stableId: state.pokemonRecords.find((pokemon) => pokemon.id === "red-garchomp")?.id || "",
      operationCount: state.effectOperations.filter((operation) => operation.sourceEffectId === "browser-007-wicked").length
    };
  })()`);
  assert.equal(hydrated.loading, false);
  assert.equal(hydrated.ordinarySelectable, true);
  assert.equal(hydrated.ambiguousBlocked, true);
  assert.equal(hydrated.resolutionResult, "resolved");
  assert.equal(hydrated.stableId, "red-garchomp");
  assert.equal(hydrated.operationCount, 1);

  const sabotage = await evaluate(`(() => {
    const actor = state.players.find((player) => player.id === "steevee");
    actor.inventory = [
      { id: "toxic-1", name: "Toxic Curse", type: "TOKEN" },
      { id: "toxic-2", name: "Toxic Curse", type: "TOKEN" },
      { id: "flame-1", name: "Flame Curse", type: "TOKEN" },
      { id: "category-protection", name: "Protection Token", type: "TOKEN", tokenType: "protection" },
      { id: "blocked-devolve", name: "Devolve", type: "TOKEN", tokenType: "curse" },
      { id: "development-seven", name: "7 Tools Of The Bandit", type: "TOKEN", tokenType: "protection" },
      { id: "illegal-wicked", name: "Wicked Blow", type: "TOKEN", tokenType: "control" }
    ];
    state.currentPhase = "battle";
    state.phase = "battle";
    const phaseState = ensureGymPhaseState();
    phaseState.currentPhase = "battle";
    phaseState.flowState = "sabotage";
    phaseState.battlePhase = { ...(phaseState.battlePhase || {}), substep: "sabotage" };
    const prompt = getCurrentLivePrompt();
    const available = liveRefereeAvailableTokenGroups(prompt, actor.id);
    const markup = liveRefereeTokenListScreenMarkup(prompt, actor.id);
    const fullInventoryNames = actor.inventory.map((item) => item.name);
    actor.inventory = actor.inventory.filter((item) => item.name === "Protection Token");
    const empty = liveRefereeAvailableTokenGroups(prompt, actor.id);
    const emptyMarkup = liveRefereeTokenListScreenMarkup(prompt, actor.id);
    return {
      fullInventoryNames,
      legal: available.groups.map((group) => ({ name: group.name, count: group.count })),
      canonicalGroups: liveRefereeTokenInventoryGroups({ inventory: [
        { id: "category-protection", name: "Protection Token", type: "TOKEN" }
      ] }).length,
      hasCurseHeading: markup.includes("<h3>Curse Token</h3>"),
      categoryIsSelectable: /<h3[^>]*data-live-referee-effect-pick/.test(markup),
      hasPlaceholder: /Protection Token x/.test(markup),
      hasBlockedReference: /7 Tools Of The Bandit/.test(markup),
      blockedIsSelectable: /data-live-referee-effect-pick="7 Tools Of The Bandit"/.test(markup),
      hasIllegalTiming: /Wicked Blow x/.test(markup),
      emptyCount: empty.groups.length,
      emptyMessage: emptyMarkup.includes("No usable tokens right now.")
    };
  })()`);
  assert.deepEqual(sabotage.legal, [
    { name: "Devolve", count: 1 },
    { name: "Flame Curse", count: 1 },
    { name: "Toxic Curse", count: 2 }
  ]);
  assert.equal(sabotage.canonicalGroups, 0);
  assert.equal(sabotage.hasCurseHeading, true);
  assert.equal(sabotage.categoryIsSelectable, false);
  assert.equal(sabotage.hasPlaceholder, false);
  assert.equal(sabotage.hasBlockedReference, true);
  assert.equal(sabotage.blockedIsSelectable, false);
  assert.equal(sabotage.hasIllegalTiming, false);
  assert.equal(sabotage.emptyCount, 0);
  assert.equal(sabotage.emptyMessage, true);
  assertNoNewBrowserErrors(errorStart);
});

test("[BROWSER-008] production 7 Tools and Counterspell preserve exact inventory across refresh", async () => {
  const errorStart = browserErrors.length;
  const sevenState = controlStateFixture("browser-008-seven-tools");
  sevenState.players.find((player) => player.id === "steevee").inventory.push({
    id: "steevee-seven-tools-1",
    canonicalId: "seven-tools",
    name: "7 Tools Of The Bandit",
    type: "TOKEN",
    tokenType: "protection"
  });
  await navigateProduction(sevenState, "BROWSER-008-SEVEN");
  const sevenResult = await evaluate(`(async () => {
    const actor = state.players.find((player) => player.id === "steevee");
    const protector = state.players.find((player) => player.id === "gold");
    const root = createTokenPendingEventFromUse({
      actor,
      actorPlayerId: actor.id,
      tokenName: "Restrict",
      category: TOKEN_TIMING_CATEGORIES.CONTROL,
      targetPlayerId: protector.id,
      targetPlayerName: protector.name,
      targetPokemonId: "gold-garchomp",
      targetPokemonName: "Garchomp",
      targetText: "Garchomp",
      targetType: EFFECT_TARGET_TYPES.POKEMON,
      targetScope: EFFECT_TARGET_SCOPES.SPECIES,
      notes: ""
    });
    if (!root) throw new Error("Could not create the Restrict test event.");
    const immunity = recordTokenResponseToActivity(root, {
      actor: protector,
      actorPlayerId: protector.id,
      tokenName: "Immunity",
      category: TOKEN_TIMING_CATEGORIES.PROTECTION,
      targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT,
      targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT,
      notes: ""
    }, "protection-token");
    if (!immunity) throw new Error("Could not record the Immunity response.");
    const safeguard = applyLingeringEffect({
      type: "safeguard",
      targetPlayerId: protector.id,
      payload: { protectionScope: ["tokenCopy"] }
    });
    const blockedPlan = specialTokenResponseResolutionPlan(
      root,
      currentInteractionPromptStep(root),
      actor.id,
      tokenEffectMetadataByName("7 Tools Of The Bandit")
    );
    safeguard.status = "expired";
    const seven = recordTokenResponseToActivity(root, {
      actor,
      actorPlayerId: actor.id,
      tokenName: "7 Tools Of The Bandit",
      category: TOKEN_TIMING_CATEGORIES.PROTECTION,
      targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT,
      targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT,
      notes: ""
    }, "protection-token");
    if (!seven) throw new Error("Could not record the 7 Tools response.");
    const resolution = resolveCurrentInteractionPrompt(root, { force: true, source: "browser-test" });
    const copies = actor.inventory.filter((item) => item.tokenRuntimeState?.kind === "temporaryCopy");
    if (backendSync.saveTimer) {
      clearTimeout(backendSync.saveTimer);
      backendSync.saveTimer = null;
    }
    await pushBackendState({ force: true });
    return {
      resolution,
      copies: copies.map((item) => ({ id: item.id, name: item.name, sourceTokenId: item.tokenRuntimeState.sourceTokenId })),
      immunityStatus: root.promptResolutions[interactionResponsePromptStepId(immunity)]?.status,
      sevenCount: actor.inventory.filter((item) => item.name === "7 Tools Of The Bandit").length,
      safeguardBlocked: !blockedPlan.ok && /Safeguard/.test(blockedPlan.reason)
    };
  })()`);
  assert.equal(sevenResult.resolution.resolved, true);
  assert.equal(sevenResult.copies.length, 1);
  assert.equal(sevenResult.copies[0].name, "Immunity");
  assert.equal(sevenResult.copies[0].sourceTokenId, "gold-immunity-1");
  assert.equal(sevenResult.immunityStatus, "negated");
  assert.equal(sevenResult.sevenCount, 0);
  assert.equal(sevenResult.safeguardBlocked, true);
  await reloadProduction("browser-008-seven-tools");
  const sevenReload = await evaluate(`(() => {
    const actor = state.players.find((player) => player.id === "steevee");
    const copies = actor.inventory.filter((item) => item.tokenRuntimeState?.kind === "temporaryCopy");
    return { copies: copies.length, available: copies.length ? tokenInventoryRecordAvailability(copies[0]).ok : false };
  })()`);
  assert.deepEqual(sevenReload, { copies: 1, available: true });
  const sevenUndo = await evaluate(`(() => {
    const activity = getCurrentPendingEvent();
    const resolution = resolveCurrentInteractionPrompt(activity, { force: true, source: "browser-test-finish" });
    const effectLog = state.log.find((entry) => !entry.undone && entry.undoData?.actionType?.startsWith("undoTokenEffectContract"));
    if (!resolution.closed || !effectLog) throw new Error("7 Tools root did not produce an undoable terminal result.");
    undoLogEntry(effectLog.id);
    const actor = state.players.find((player) => player.id === "steevee");
    const protector = state.players.find((player) => player.id === "gold");
    return {
      seven: actor.inventory.filter((item) => item.id === "steevee-seven-tools-1").length,
      restrict: actor.inventory.filter((item) => item.name === "Restrict").length,
      immunity: protector.inventory.filter((item) => item.id === "gold-immunity-1").length,
      temporary: actor.inventory.filter((item) => item.tokenRuntimeState?.kind === "temporaryCopy").length
    };
  })()`);
  assert.deepEqual(sevenUndo, { seven: 1, restrict: 3, immunity: 1, temporary: 0 });

  const counterState = controlStateFixture("browser-008-counterspell");
  counterState.players.find((player) => player.id === "steevee").inventory.push({
    id: "steevee-counterspell-1",
    canonicalId: "counterspell",
    name: "Counterspell",
    type: "TOKEN",
    tokenType: "protection"
  });
  await navigateProduction(counterState, "BROWSER-008-COUNTER");
  const counterResult = await evaluate(`(async () => {
    const actor = state.players.find((player) => player.id === "steevee");
    const protector = state.players.find((player) => player.id === "gold");
    const root = createTokenPendingEventFromUse({
      actor,
      actorPlayerId: actor.id,
      tokenName: "Restrict",
      category: TOKEN_TIMING_CATEGORIES.CONTROL,
      targetPlayerId: protector.id,
      targetPlayerName: protector.name,
      targetPokemonId: "gold-garchomp",
      targetPokemonName: "Garchomp",
      targetText: "Garchomp",
      targetType: EFFECT_TARGET_TYPES.POKEMON,
      targetScope: EFFECT_TARGET_SCOPES.SPECIES,
      notes: ""
    });
    if (!root) throw new Error("Could not create the Counterspell test event.");
    const consumedRootId = root.payload.consumedTokenId;
    const immunity = recordTokenResponseToActivity(root, {
      actor: protector,
      actorPlayerId: protector.id,
      tokenName: "Immunity",
      category: TOKEN_TIMING_CATEGORIES.PROTECTION,
      targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT,
      targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT,
      notes: ""
    }, "protection-token");
    if (!immunity) throw new Error("Could not record the Counterspell parent response.");
    const counterspell = recordTokenResponseToActivity(root, {
      actor,
      actorPlayerId: actor.id,
      tokenName: "Counterspell",
      category: TOKEN_TIMING_CATEGORIES.PROTECTION,
      targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT,
      targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT,
      notes: ""
    }, "protection-token");
    if (!counterspell) throw new Error("Could not record Counterspell.");
    const resolution = resolveCurrentInteractionPrompt(root, { force: true, source: "browser-test" });
    const restored = actor.inventory.find((item) => item.id === consumedRootId);
    const duplicate = resolveCurrentInteractionPrompt(root, { force: true, source: "browser-test-duplicate" });
    if (backendSync.saveTimer) {
      clearTimeout(backendSync.saveTimer);
      backendSync.saveTimer = null;
    }
    await pushBackendState({ force: true });
    return {
      resolution,
      duplicatePromptId: duplicate.promptId || "",
      consumedRootId,
      restoredId: restored?.id || "",
      runtimeKind: restored?.tokenRuntimeState?.kind || "",
      available: restored ? tokenInventoryRecordAvailability(restored).ok : null,
      exactCount: actor.inventory.filter((item) => item.id === consumedRootId).length
    };
  })()`);
  assert.equal(counterResult.resolution.resolved, true);
  assert.equal(counterResult.restoredId, counterResult.consumedRootId);
  assert.equal(counterResult.runtimeKind, "cooldown");
  assert.equal(counterResult.available, false);
  assert.equal(counterResult.exactCount, 1);
  await reloadProduction("browser-008-counterspell");
  const counterReload = await evaluate(`(() => {
    const actor = state.players.find((player) => player.id === "steevee");
    const restored = actor.inventory.find((item) => item.id === "steevee-restrict-1");
    return {
      exists: Boolean(restored),
      available: restored ? tokenInventoryRecordAvailability(restored).ok : null,
      exactCount: actor.inventory.filter((item) => item.id === "steevee-restrict-1").length
    };
  })()`);
  assert.deepEqual(counterReload, { exists: true, available: false, exactCount: 1 });
  const counterUndo = await evaluate(`(() => {
    const effectLog = state.log.find((entry) => !entry.undone && entry.undoData?.actionType?.startsWith("undoTokenEffectContract"));
    if (!effectLog) throw new Error("Counterspell result did not retain its root undo record.");
    undoLogEntry(effectLog.id);
    const actor = state.players.find((player) => player.id === "steevee");
    const protector = state.players.find((player) => player.id === "gold");
    return {
      counterspell: actor.inventory.filter((item) => item.id === "steevee-counterspell-1").length,
      restrict: actor.inventory.filter((item) => item.name === "Restrict").length,
      cooldowns: actor.inventory.filter((item) => item.tokenRuntimeState?.kind === "cooldown").length,
      immunity: protector.inventory.filter((item) => item.id === "gold-immunity-1").length
    };
  })()`);
  assert.deepEqual(counterUndo, { counterspell: 1, restrict: 3, cooldowns: 0, immunity: 1 });
  assertNoNewBrowserErrors(errorStart);
});

test("[BROWSER-009] provisional Action Control declaration survives refresh, withdraws, and can be claimed again", async () => {
  const errorStart = browserErrors.length;
  const productionState = controlStateFixture("browser-009-provisional");
  productionState.currentPhase = "action";
  productionState.phaseState = { "Kanto-G1": { currentPhase: "action" } };
  productionState.actionPhaseState = {
    selections: {
      "Kanto-G1": {
        series: "Kanto",
        gym: 1,
        playerVisits: { gold: [], red: [], steevee: [] },
        selectedLocationId: "encounter",
        turnOrderPlayerIds: ["gold", "red", "steevee"],
        actionOperations: [],
        activeActionOperationId: "",
        destinationCommit: null
      }
    },
    seriesTrackers: {}
  };
  productionState.activePlayerId = "steevee";
  productionState.liveRefereeCollapsed = false;
  const gameId = await navigateProduction(productionState, "BROWSER-009-PROVISIONAL");

  await waitUntil(`document.querySelector('[data-live-referee-screen="declareEffects"]')`);
  assert.match(await evaluate("document.querySelector('#liveRefereePanel')?.textContent || ''"), /Control Timing Open/i);
  await evaluate(`document.querySelector('[data-live-referee-screen="declareEffects"]').click()`);
  await waitUntil(`document.querySelector('[data-provisional-effect-claim][data-effect-contract-id="incinerate"]')`);
  await evaluate(`document.querySelector('[data-provisional-effect-claim][data-effect-contract-id="incinerate"]').click()`);
  await waitUntil(`currentProvisionalDeclaration()?.payload?.effectContractId === "incinerate"`);
  assert.equal(await evaluate(`state.players.find((player) => player.id === "steevee").inventory.filter((item) => item.name === "Incinerate").length`), 3);
  assert.equal(await evaluate(`currentProvisionalDeclaration().payload.consumptionState`), "notConsumed");
  assert.equal(await evaluate(`currentProvisionalDeclaration().payload.mutationState`), "notStarted");

  await evaluate(`document.querySelector('[data-live-referee-toggle]').click()`);
  assert.equal(await evaluate(`state.liveRefereeCollapsed`), true);
  assert.equal(await evaluate(`Boolean(currentProvisionalDeclaration())`), true);
  await evaluate(`document.querySelector('[data-live-referee-toggle]').click()`);
  await waitUntil(`document.querySelector('[data-incinerate-target-form]')`);
  const declarationId = await evaluate(`currentProvisionalDeclaration().id`);
  await reloadProduction("browser-009-provisional");
  await waitUntil(`document.querySelector('[data-incinerate-target-form]')`);
  assert.equal(await evaluate(`currentProvisionalDeclaration().id`), declarationId);

  await evaluate(`(() => {
    const choices = [...document.querySelectorAll('[data-incinerate-player-card]:not(.empty)')];
    choices.forEach((card) => {
      const input = card.querySelector('[data-incinerate-target]');
      if (input) { input.checked = true; input.dispatchEvent(new Event('change', { bubbles: true })); }
    });
  })()`);
  await delay(500);
  const persisted = await fetch(`${server.baseUrl}/api/games/${gameId}/state`).then((response) => response.json());
  const persistedDeclaration = persisted.state.interactionEvents.find((entry) => entry.id === declarationId);
  assert.ok(persistedDeclaration.payload.draftSelections.resourceSelections.length >= 1);

  await evaluate(`document.querySelector('[data-provisional-declaration-withdraw]').click()`);
  await waitUntil(`!currentProvisionalDeclaration()`);
  assert.equal(await evaluate(`state.players.find((player) => player.id === "steevee").inventory.filter((item) => item.name === "Incinerate").length`), 3);
  assert.equal(await evaluate(`actionTurnInfo().currentPlayerId`), "gold");
  assert.equal(await evaluate(`actionTurnInfo().totalActionUnits`), 0);

  await waitUntil(`document.querySelector('[data-live-referee-screen="declareEffects"]')`);
  await evaluate(`document.querySelector('[data-live-referee-screen="declareEffects"]').click()`);
  await waitUntil(`document.querySelector('[data-provisional-effect-claim][data-effect-contract-id="incinerate"]')`);
  await evaluate(`document.querySelector('[data-provisional-effect-claim][data-effect-contract-id="incinerate"]').click()`);
  await waitUntil(`document.querySelector('[data-incinerate-target-form]')`);
  await evaluate(`(() => {
    [...document.querySelectorAll('[data-incinerate-player-card]:not(.empty)')].forEach((card) => {
      const input = card.querySelector('[data-incinerate-target]');
      if (input) { input.checked = true; input.dispatchEvent(new Event('change', { bubbles: true })); }
    });
  })()`);
  await waitUntil(`document.querySelector('[data-incinerate-confirm]') && !document.querySelector('[data-incinerate-confirm]').disabled`);
  await evaluate(`document.querySelector('[data-incinerate-confirm]').click()`);
  await waitUntil(`getCurrentPendingEvent()?.payload?.declarationStage === "confirmed"`);
  assert.equal(await evaluate(`state.players.find((player) => player.id === "steevee").inventory.filter((item) => item.name === "Incinerate").length`), 2);
  assert.equal(await evaluate(`state.tokenConsumptions.filter((entry) => entry.tokenName === "Incinerate").length`), 1);
  assert.equal(await evaluate(`actionTurnInfo().currentPlayerId`), "gold");
  assert.equal(await evaluate(`actionTurnInfo().totalActionUnits`), 0);
  await reloadProduction("browser-009-provisional");
  assert.equal(await evaluate(`Boolean(currentProvisionalDeclaration())`), false);
  assert.equal(await evaluate(`state.interactionEvents.filter((entry) => entry.id === ${JSON.stringify(declarationId)} && entry.status === "open").length`), 0);
  assert.equal(await evaluate(`getCurrentPendingEvent()?.payload?.declarationStage`), "confirmed");
  assert.equal(await evaluate(`state.tokenConsumptions.filter((entry) => entry.tokenName === "Incinerate").length`), 1);
  assertNoNewBrowserErrors(errorStart);
});

test("[BROWSER-010] Extra Encounter persists one normal Encounter session and undo restores the exact pre-use state", async () => {
  const errorStart = browserErrors.length;
  const productionState = controlStateFixture("browser-010-extra-encounter");
  productionState.currentPhase = "action";
  productionState.phaseState = { "Kanto:G1": { currentPhase: "action", flowState: "action" } };
  productionState.encounterSessions = [];
  productionState.players.find((player) => player.id === "steevee").inventory.push({
    id: "steevee-extra-encounter-1",
    canonicalId: "extra-encounter-token",
    name: "Extra Encounter Token",
    type: "TOKEN",
    tokenType: "encounter"
  });
  await navigateProduction(productionState, "BROWSER-010-EXTRA-ENCOUNTER");

  const resolved = await evaluate(`(async () => {
    const actor = state.players.find((player) => player.id === "steevee");
    const activation = await resolveImmediateTokenUse({
      actor,
      actorPlayerId: actor.id,
      tokenName: "Extra Encounter Token",
      targetPlayerId: "gold",
      targetPlayerName: "Gold",
      targetType: EFFECT_TARGET_TYPES.PLAYER,
      targetScope: EFFECT_TARGET_SCOPES.SINGLE_PLAYER
    });
    if (!activation) throw new Error("Extra Encounter did not resolve.");
    const session = state.encounterSessions.find((entry) => entry.id === state.selectedEncounterSessionId);
    if (backendSync.saveTimer) {
      clearTimeout(backendSync.saveTimer);
      backendSync.saveTimer = null;
    }
    await pushBackendState({ force: true });
    const log = state.log.find((entry) => !entry.undone
      && entry.undoData?.actionType === "undoUtilityTokenActivation"
      && entry.tokenUse?.tokenName === "Extra Encounter Token");
    return {
      sessionId: session?.id || "",
      playerId: session?.playerId || "",
      maxRolls: Number(session?.maxRolls || 0),
      grantCount: session?.extraEncounterGrants?.length || 0,
      tokenCount: actor.inventory.filter((item) => item.id === "steevee-extra-encounter-1").length,
      selectedSessionId: state.selectedEncounterSessionId,
      modalOpen: state.encounterModalOpen,
      logId: log?.id || ""
    };
  })()`);
  assert.equal(resolved.playerId, "gold");
  assert.equal(resolved.maxRolls, 1);
  assert.equal(resolved.grantCount, 1);
  assert.equal(resolved.tokenCount, 0);
  assert.equal(resolved.selectedSessionId, resolved.sessionId);
  assert.equal(resolved.modalOpen, true);
  assert.ok(resolved.logId);

  await reloadProduction("browser-010-extra-encounter");
  const reloaded = await evaluate(`(() => {
    const session = state.encounterSessions.find((entry) => entry.id === ${JSON.stringify(resolved.sessionId)});
    return {
      sessionCount: state.encounterSessions.length,
      playerId: session?.playerId || "",
      maxRolls: Number(session?.maxRolls || 0),
      grantId: session?.extraEncounterGrants?.[0]?.id || "",
      tokenCount: state.players.find((player) => player.id === "steevee").inventory
        .filter((item) => item.id === "steevee-extra-encounter-1").length
    };
  })()`);
  assert.equal(reloaded.sessionCount, 1);
  assert.equal(reloaded.playerId, "gold");
  assert.equal(reloaded.maxRolls, 1);
  assert.ok(reloaded.grantId);
  assert.equal(reloaded.tokenCount, 0);

  const undone = await evaluate(`(() => {
    const log = state.log.find((entry) => !entry.undone
      && entry.undoData?.actionType === "undoUtilityTokenActivation"
      && entry.tokenUse?.tokenName === "Extra Encounter Token");
    if (!log) throw new Error("Extra Encounter undo record was not found after refresh.");
    undoLogEntry(log.id);
    return {
      sessionCount: state.encounterSessions.length,
      tokenCount: state.players.find((player) => player.id === "steevee").inventory
        .filter((item) => item.id === "steevee-extra-encounter-1").length,
      selectedSessionId: state.selectedEncounterSessionId,
      modalOpen: state.encounterModalOpen,
      undone: Boolean(state.log.find((entry) => entry.id === log.id)?.undone)
    };
  })()`);
  assert.deepEqual(undone, {
    sessionCount: 0,
    tokenCount: 1,
    selectedSessionId: "",
    modalOpen: false,
    undone: true
  });
  assertNoNewBrowserErrors(errorStart);
});

test("[BROWSER-011] Teleport persists one delayed return and never reopens a terminal event", async () => {
  const errorStart = browserErrors.length;
  const productionState = controlStateFixture("browser-011-teleport");
  productionState.currentPhase = "action";
  productionState.phaseState = { "Kanto:G1": { currentPhase: "action", flowState: "action" } };
  productionState.players.find((player) => player.id === "gold").inventory.push({
    id: "gold-teleport-1",
    canonicalId: "teleport",
    name: "Teleport",
    type: "TOKEN",
    tokenType: "protection"
  });
  const gameId = await navigateProduction(productionState, "BROWSER-011-TELEPORT");

  const scheduled = await evaluate(`(() => {
    backendSync.enabled = false;
    const actor = state.players.find((player) => player.id === "steevee");
    const responder = state.players.find((player) => player.id === "gold");
    const root = createTokenPendingEventFromUse({
      actor,
      actorPlayerId: actor.id,
      tokenName: "Restrict",
      category: TOKEN_TIMING_CATEGORIES.CONTROL,
      targetPlayerId: responder.id,
      targetPlayerName: responder.name,
      targetPokemonId: "gold-garchomp",
      targetPokemonName: "Garchomp",
      targetText: "Garchomp",
      targetType: EFFECT_TARGET_TYPES.POKEMON,
      targetScope: EFFECT_TARGET_SCOPES.SPECIES,
      notes: ""
    });
    if (!root) throw new Error("Could not create the Teleport parent event.");
    const response = recordTokenResponseToActivity(root, {
      actor: responder,
      actorPlayerId: responder.id,
      tokenName: "Teleport",
      category: TOKEN_TIMING_CATEGORIES.PROTECTION,
      targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT,
      targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT,
      notes: ""
    }, "protection-token");
    if (!response) throw new Error("Could not record Teleport.");
    const resolution = resolveCurrentInteractionPrompt(root, { force: true, source: "browser-test" });
    const delayed = state.delayedEffects.find((entry) => entry.sourceResponseId === response.id);
    if (!resolution.closed || !delayed) throw new Error("Teleport did not create one delayed record.");
    return {
      delayedId: delayed.id,
      status: delayed.status,
      dueGym: delayed.dueAt.gym,
      duePhase: delayed.dueAt.phase,
      rootStatus: root.status,
      restrictCount: actor.inventory.filter((item) => item.name === "Restrict").length,
      teleportCount: responder.inventory.filter((item) => item.id === "gold-teleport-1").length
    };
  })()`);
  assert.equal(scheduled.status, "pending");
  assert.equal(scheduled.dueGym, 2);
  assert.equal(scheduled.duePhase, "action");
  assert.equal(scheduled.rootStatus, "resolved");
  assert.equal(scheduled.restrictCount, 2);
  assert.equal(scheduled.teleportCount, 0);
  const savedDeclaration = await persistBrowserState(gameId);
  assert.equal(savedDeclaration.delayedEffects.filter((entry) => entry.id === scheduled.delayedId).length, 1);

  await reloadProduction("browser-011-teleport");
  assert.equal(await evaluate(`state.delayedEffects.filter((entry) => entry.id === ${JSON.stringify(scheduled.delayedId)}).length`), 1);
  const returned = await evaluate(`(() => {
    backendSync.enabled = false;
    state.gym = 2;
    state.currentPhase = "action";
    state.phase = "action";
    state.phaseState ||= {};
    state.phaseState["Kanto:G2"] = { currentPhase: "action", flowState: "action" };
    const first = processDueTeleportDelayedEffects();
    const second = processDueTeleportDelayedEffects();
    const delayed = state.delayedEffects.find((entry) => entry.id === ${JSON.stringify(scheduled.delayedId)});
    const events = state.interactionEvents.filter((entry) => entry.id === delayed.returnInteractionEventId);
    return { first, second, status: delayed.status, eventId: delayed.returnInteractionEventId, eventCount: events.length, eventStatus: events[0]?.status || "" };
  })()`);
  assert.equal(returned.first.opened, 1);
  assert.equal(returned.second.opened, 0);
  assert.equal(returned.status, "awaitingReturnResolution");
  assert.equal(returned.eventCount, 1);
  assert.equal(returned.eventStatus, "open");
  const savedReturn = await persistBrowserState(gameId);
  assert.equal(savedReturn.interactionEvents.filter((entry) => entry.id === returned.eventId && entry.status === "open").length, 1);

  await reloadProduction("browser-011-teleport");
  const terminal = await evaluate(`(() => {
    backendSync.enabled = false;
    const event = state.interactionEvents.find((entry) => entry.id === ${JSON.stringify(returned.eventId)});
    const result = resolveCurrentInteractionPrompt(event, { force: true, source: "browser-test-return" });
    const duplicate = processDueTeleportDelayedEffects();
    const delayed = state.delayedEffects.find((entry) => entry.id === ${JSON.stringify(scheduled.delayedId)});
    return { result, duplicate, delayedStatus: delayed.status, eventStatus: event.status };
  })()`);
  assert.equal(terminal.result.closed, true);
  assert.equal(terminal.duplicate.opened, 0);
  assert.equal(terminal.delayedStatus, "resolved");
  assert.equal(terminal.eventStatus, "resolved");
  const savedTerminal = await persistBrowserState(gameId);
  assert.equal(savedTerminal.interactionEvents.filter((entry) => entry.id === returned.eventId && entry.status === "resolved").length, 1);
  assert.equal(savedTerminal.delayedEffects.filter((entry) => entry.id === scheduled.delayedId && entry.status === "resolved").length, 1);
  await reloadProduction("browser-011-teleport");
  assert.equal(await evaluate(`state.interactionEvents.filter((entry) => entry.id === ${JSON.stringify(returned.eventId)} && entry.status === "open").length`), 0);
  assertNoNewBrowserErrors(errorStart);
});

test("[BROWSER-012] Revenge required choice persists, resolves exact snapshot records, and undoes", async () => {
  const errorStart = browserErrors.length;
  const productionState = controlStateFixture("browser-012-revenge");
  productionState.currentPhase = "battle-results";
  productionState.phase = "battle-results";
  productionState.phaseState = { "Kanto:G1": { currentPhase: "battle-results", flowState: "battle-results" } };
  productionState.players.find((player) => player.id === "gold").inventory.push({
    id: "gold-revenge-1",
    canonicalId: "revenge",
    name: "Revenge",
    type: "TOKEN",
    tokenType: "protection"
  });
  productionState.lingeringStatuses.push({
    id: "browser-012-curse",
    type: "toxic-curse",
    name: "Toxic Curse",
    status: "active",
    isCurse: true,
    series: "Kanto",
    gym: 1,
    actorPlayerId: "red",
    targetPlayerId: "gold",
    selectedRosterInstanceId: "gold-garchomp",
    payload: { sourcePlayerId: "red", selectedRosterInstanceId: "gold-garchomp" }
  });
  productionState.battleRecords = [
    {
      id: "browser-012-gold-red", series: "Kanto", gym: 1, player1Id: "gold", player2Id: "red", winnerId: "gold",
      player1Differential: 1, player2Differential: -1,
      player1Pokemon: [{ pokemonId: "gold-garchomp", pokemonName: "Garchomp", kos: 1, deaths: 0 }],
      player2Pokemon: [
        { pokemonId: "red-garchomp", pokemonName: "Garchomp", kos: 0, deaths: 1 },
        { pokemonId: "red-lucario", pokemonName: "Lucario", kos: 0, deaths: 1 }
      ]
    },
    {
      id: "browser-012-gold-steevee", series: "Kanto", gym: 1, player1Id: "gold", player2Id: "steevee", winnerId: "gold",
      player1Differential: 1, player2Differential: -1,
      player1Pokemon: [{ pokemonId: "gold-garchomp", pokemonName: "Garchomp", kos: 1, deaths: 0 }],
      player2Pokemon: [{ pokemonId: "steevee-alakazam", pokemonName: "Alakazam", kos: 0, deaths: 1 }]
    },
    {
      id: "browser-012-red-steevee", series: "Kanto", gym: 1, player1Id: "red", player2Id: "steevee", winnerId: "red",
      player1Differential: 1, player2Differential: -1,
      player1Pokemon: [{ pokemonId: "red-garchomp", pokemonName: "Garchomp", kos: 1, deaths: 0 }],
      player2Pokemon: [{ pokemonId: "steevee-alakazam", pokemonName: "Alakazam", kos: 0, deaths: 1 }]
    }
  ];
  const gameId = await navigateProduction(productionState, "BROWSER-012-REVENGE");

  const offered = await evaluate(`(() => {
    backendSync.enabled = false;
    const balanceBefore = state.players.find((player) => player.id === "gold").balance;
    finalizeGymResults({ skipPendingGuard: true });
    const procedure = state.postPayoutProcedures.find((entry) => entry.type === "revenge");
    const event = state.interactionEvents.find((entry) => entry.id === procedure?.interactionEventId);
    state.liveRefereeCollapsed = false;
    render();
    return {
      procedureId: procedure?.id || "",
      eventId: event?.id || "",
      status: procedure?.status || "",
      hasForm: Boolean(document.querySelector("[data-revenge-procedure-form]")),
      tokenCount: state.players.find((player) => player.id === "gold").inventory.filter((item) => item.id === "gold-revenge-1").length,
      gymResults: state.gymResults.filter((entry) => entry.key === "Kanto:G1" && !entry.undone).length,
      payoutApplied: state.players.find((player) => player.id === "gold").balance > balanceBefore,
      snapshotSource: state.broughtTeamSnapshots.find((entry) => entry.id === procedure?.broughtSnapshotId)?.source || ""
    };
  })()`);
  assert.ok(offered.procedureId);
  assert.ok(offered.eventId);
  assert.equal(offered.status, "awaitingChoice");
  assert.equal(offered.hasForm, true);
  assert.equal(offered.tokenCount, 1);
  assert.equal(offered.gymResults, 1);
  assert.equal(offered.payoutApplied, true);
  assert.equal(offered.snapshotSource, "finalizedGymPayout");
  const savedOffer = await persistBrowserState(gameId);
  assert.equal(savedOffer.postPayoutProcedures.filter((entry) => entry.id === offered.procedureId && entry.status === "awaitingChoice").length, 1);

  await reloadProduction("browser-012-revenge");
  const resolved = await evaluate(`(() => {
    backendSync.enabled = false;
    state.liveRefereeCollapsed = false;
    render();
    const form = document.querySelector('[data-revenge-procedure-form="${offered.eventId}"]');
    if (!form) throw new Error("Revenge required-choice form did not survive refresh.");
    const offender = form.querySelector('[name="revenge-offender"][value="red"]');
    offender.checked = true;
    const panel = form.querySelector('[data-revenge-offender-panel="red"]');
    [...panel.querySelectorAll('[data-revenge-pokemon]')].slice(0, 2).forEach((input) => { input.checked = true; });
    const completed = resolveRevengePostPayoutProcedureFromForm(form);
    if (!completed) throw new Error("Revenge did not complete from the required-choice form.");
    const procedure = state.postPayoutProcedures.find((entry) => entry.id === ${JSON.stringify(offered.procedureId)});
    return {
      procedureStatus: procedure.status,
      eventStatus: state.interactionEvents.find((entry) => entry.id === ${JSON.stringify(offered.eventId)})?.status || "",
      redGarchomp: findPokemonRecord("red-garchomp")?.status || "",
      redLucario: findPokemonRecord("red-lucario")?.status || "",
      tokenCount: state.players.find((player) => player.id === "gold").inventory.filter((item) => item.id === "gold-revenge-1").length,
      openEvents: state.interactionEvents.filter((entry) => entry.id === ${JSON.stringify(offered.eventId)} && entry.status === "open").length
    };
  })()`);
  assert.deepEqual(resolved, {
    procedureStatus: "resolved",
    eventStatus: "resolved",
    redGarchomp: "Released",
    redLucario: "Released",
    tokenCount: 0,
    openEvents: 0
  });
  const savedRevenge = await persistBrowserState(gameId);
  assert.equal(savedRevenge.postPayoutProcedures.filter((entry) => entry.id === offered.procedureId && entry.status === "resolved").length, 1);
  assert.equal(savedRevenge.pokemonRecords.find((entry) => entry.id === "red-garchomp")?.status, "Released");
  assert.equal(savedRevenge.pokemonRecords.find((entry) => entry.id === "red-lucario")?.status, "Released");

  await reloadProduction("browser-012-revenge");
  const undone = await evaluate(`(() => {
    const log = state.log.find((entry) => !entry.undone && entry.postPayoutProcedureId === ${JSON.stringify(offered.procedureId)});
    if (!log) throw new Error("Revenge History undo record did not survive refresh.");
    undoLogEntry(log.id);
    return {
      redGarchomp: findPokemonRecord("red-garchomp")?.status || "",
      redLucario: findPokemonRecord("red-lucario")?.status || "",
      tokenCount: state.players.find((player) => player.id === "gold").inventory.filter((item) => item.id === "gold-revenge-1").length,
      procedureStatus: state.postPayoutProcedures.find((entry) => entry.id === ${JSON.stringify(offered.procedureId)})?.status || ""
    };
  })()`);
  assert.deepEqual(undone, {
    redGarchomp: "Active",
    redLucario: "Active",
    tokenCount: 1,
    procedureStatus: "awaitingChoice"
  });
  assertNoNewBrowserErrors(errorStart);
});

test("[BROWSER-013] After You and Follow Me preserve chain order and inventory-copy lifecycle", async () => {
  const errorStart = browserErrors.length;
  const afterState = controlStateFixture("browser-013-after-you");
  afterState.players.find((player) => player.id === "steevee").inventory.push({
    id: "steevee-after-you-1",
    canonicalId: "after-you",
    name: "After You",
    type: "TOKEN",
    tokenType: "protection"
  });
  await navigateProduction(afterState, "BROWSER-013-AFTER");
  const afterResult = await evaluate(`(async () => {
    const actor = state.players.find((player) => player.id === "steevee");
    const protector = state.players.find((player) => player.id === "gold");
    const root = createTokenPendingEventFromUse({
      actor,
      actorPlayerId: actor.id,
      tokenName: "Restrict",
      category: TOKEN_TIMING_CATEGORIES.CONTROL,
      targetPlayerId: protector.id,
      targetPlayerName: protector.name,
      targetPokemonId: "gold-garchomp",
      targetPokemonName: "Garchomp",
      targetText: "Garchomp",
      targetType: EFFECT_TARGET_TYPES.POKEMON,
      targetScope: EFFECT_TARGET_SCOPES.SPECIES,
      notes: ""
    });
    if (!root) throw new Error("Could not create After You's Restrict parent.");
    const immunity = recordTokenResponseToActivity(root, {
      actor: protector,
      actorPlayerId: protector.id,
      tokenName: "Immunity",
      category: TOKEN_TIMING_CATEGORIES.PROTECTION,
      targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT,
      targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT,
      notes: ""
    }, "protection-token");
    if (!immunity) throw new Error("Could not record original Immunity.");
    const afterYou = recordTokenResponseToActivity(root, {
      actor,
      actorPlayerId: actor.id,
      tokenName: "After You",
      category: TOKEN_TIMING_CATEGORIES.PROTECTION,
      targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT,
      targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT,
      notes: ""
    }, "protection-token");
    if (!afterYou) throw new Error("Could not record After You.");
    const copiedResolution = resolveCurrentInteractionPrompt(root, { force: true, source: "browser-test-after-you" });
    const immunityResolution = root.promptResolutions[interactionResponsePromptStepId(immunity)];
    const currentAfterCopy = currentInteractionPromptStep(root);
    const rootResolution = resolveCurrentInteractionPrompt(root, { force: true, source: "browser-test-after-you-root" });
    if (backendSync.saveTimer) {
      clearTimeout(backendSync.saveTimer);
      backendSync.saveTimer = null;
    }
    await pushBackendState({ force: true });
    return {
      copiedResolution,
      rootResolution,
      immunityStatus: immunityResolution?.status || "",
      immunityOutcome: immunityResolution?.outcome || "",
      resumedRoot: currentAfterCopy.kind === "event",
      copiedActivations: state.copiedActivations.map((entry) => ({
        status: entry.status,
        definitionId: entry.sourceDefinitionId,
        inventoryRecordCreated: entry.inventoryRecordCreated,
        copiedInventoryConsumed: entry.copiedInventoryConsumed
      })),
      afterYouCount: actor.inventory.filter((item) => item.id === "steevee-after-you-1").length,
      immunityCount: protector.inventory.filter((item) => item.id === "gold-immunity-1").length,
      rootStatus: root.status,
      restrictStatusCount: state.lingeringStatuses.filter((entry) => entry.type === "restrict" && entry.status === "active").length
    };
  })()`);
  assert.equal(afterResult.copiedResolution.resolved, true);
  assert.equal(afterResult.copiedResolution.closed, false);
  assert.equal(afterResult.immunityStatus, "negated");
  assert.equal(afterResult.resumedRoot, true);
  assert.equal(afterResult.rootResolution.closed, true);
  assert.equal(afterResult.rootStatus, "resolved");
  assert.equal(afterResult.restrictStatusCount, 1);
  assert.deepEqual(afterResult.copiedActivations, [{
    status: "negated-original",
    definitionId: "immunity",
    inventoryRecordCreated: false,
    copiedInventoryConsumed: false
  }]);
  assert.equal(afterResult.afterYouCount, 0);
  assert.equal(afterResult.immunityCount, 0);
  await reloadProduction("browser-013-after-you");
  assert.deepEqual(await evaluate(`(() => ({
    openEvents: state.interactionEvents.filter((entry) => entry.status === "open").length,
    copiedActivations: state.copiedActivations.filter((entry) => entry.sourceDefinitionId === "immunity").length,
    restrictStatuses: state.lingeringStatuses.filter((entry) => entry.type === "restrict" && entry.status === "active").length
  }))()`), { openEvents: 0, copiedActivations: 1, restrictStatuses: 1 });

  const controlCopyState = controlStateFixture("browser-013-after-control");
  controlCopyState.players.find((player) => player.id === "gold").inventory.push({
    id: "gold-after-you-control-1",
    canonicalId: "after-you",
    name: "After You",
    type: "TOKEN",
    tokenType: "protection"
  });
  await navigateProduction(controlCopyState, "BROWSER-013-AFTER-CONTROL");
  const controlCopyResult = await evaluate(`(async () => {
    const source = state.players.find((player) => player.id === "steevee");
    const actor = state.players.find((player) => player.id === "gold");
    const root = createTokenPendingEventFromUse({
      actor: source,
      actorPlayerId: source.id,
      tokenName: "Restrict",
      category: TOKEN_TIMING_CATEGORIES.CONTROL,
      targetPlayerId: "gold",
      targetPlayerName: "Gold",
      targetPokemonId: "gold-garchomp",
      targetPokemonName: "Garchomp",
      targetText: "Garchomp",
      targetType: EFFECT_TARGET_TYPES.POKEMON,
      targetScope: EFFECT_TARGET_SCOPES.SPECIES,
      notes: ""
    });
    if (!root) throw new Error("Could not create ordinary After You parent.");
    const afterYou = recordTokenResponseToActivity(root, {
      actor,
      actorPlayerId: actor.id,
      tokenName: "After You",
      category: TOKEN_TIMING_CATEGORIES.PROTECTION,
      targetPlayerId: "steevee",
      targetPlayerName: "Steevee",
      targetPokemonId: "steevee-alakazam",
      targetPokemonName: "Alakazam",
      targetText: "Alakazam",
      targetType: EFFECT_TARGET_TYPES.POKEMON,
      targetScope: EFFECT_TARGET_SCOPES.SPECIES,
      notes: ""
    }, "protection-token");
    if (!afterYou) throw new Error("Could not record ordinary After You copy.");
    const copiedResolution = resolveCurrentInteractionPrompt(root, { force: true, source: "browser-test-after-you-control" });
    const afterCopySpecies = state.lingeringStatuses
      .filter((entry) => entry.type === "restrict" && entry.status === "active")
      .map((entry) => entry.targetPokemonNameKey).sort();
    const rootResolution = resolveCurrentInteractionPrompt(root, { force: true, source: "browser-test-after-you-control-root" });
    if (backendSync.saveTimer) {
      clearTimeout(backendSync.saveTimer);
      backendSync.saveTimer = null;
    }
    await pushBackendState({ force: true });
    return {
      copiedResolved: copiedResolution.resolved,
      copiedClosedRoot: copiedResolution.closed,
      afterCopySpecies,
      rootClosed: rootResolution.closed,
      finalSpecies: state.lingeringStatuses
        .filter((entry) => entry.type === "restrict" && entry.status === "active")
        .map((entry) => entry.targetPokemonNameKey).sort(),
      copiedActivation: state.copiedActivations.map((entry) => ({ definitionId: entry.sourceDefinitionId, status: entry.status })),
      afterYouCount: actor.inventory.filter((item) => item.id === "gold-after-you-control-1").length
    };
  })()`);
  assert.equal(controlCopyResult.copiedResolved, true);
  assert.equal(controlCopyResult.copiedClosedRoot, false);
  assert.deepEqual(controlCopyResult.afterCopySpecies, ["alakazam"]);
  assert.equal(controlCopyResult.rootClosed, true);
  assert.deepEqual(controlCopyResult.finalSpecies, ["alakazam", "garchomp"]);
  assert.deepEqual(controlCopyResult.copiedActivation, [{ definitionId: "restrict-token", status: "resolved" }]);
  assert.equal(controlCopyResult.afterYouCount, 0);
  await reloadProduction("browser-013-after-control");
  assert.deepEqual(await evaluate(`(() => ({
    openEvents: state.interactionEvents.filter((entry) => entry.status === "open").length,
    copiedActivations: state.copiedActivations.filter((entry) => entry.sourceDefinitionId === "restrict-token" && entry.status === "resolved").length,
    restrictSpecies: state.lingeringStatuses.filter((entry) => entry.type === "restrict" && entry.status === "active").map((entry) => entry.targetPokemonNameKey).sort()
  }))()`), { openEvents: 0, copiedActivations: 1, restrictSpecies: ["alakazam", "garchomp"] });

  const followState = controlStateFixture("browser-013-follow-me");
  followState.players.find((player) => player.id === "gold").inventory.push(
    { id: "gold-steal-1", canonicalId: "steal-token", name: "Steal", type: "TOKEN", tokenType: "control" },
    { id: "gold-restrict-1", canonicalId: "restrict-token", name: "Restrict", type: "TOKEN", tokenType: "control" }
  );
  followState.players.find((player) => player.id === "steevee").inventory.push({
    id: "steevee-follow-me-1", canonicalId: "follow-me", name: "Follow Me", type: "TOKEN", tokenType: "protection"
  });
  followState.pokemonRecords.push({
    id: "steevee-second", trainerId: "steevee", name: "Kadabra", currentSpecies: "Kadabra",
    status: "Active", rosterType: "Active", buffs: [], nerfs: [], effectBuffs: [], moveAccessGrants: []
  });
  await navigateProduction(followState, "BROWSER-013-FOLLOW");
  const followResult = await evaluate(`(async () => {
    const source = state.players.find((player) => player.id === "gold");
    const follower = state.players.find((player) => player.id === "steevee");
    const root = createTokenPendingEventFromUse({
      actor: source,
      actorPlayerId: source.id,
      tokenName: "Steal",
      category: TOKEN_TIMING_CATEGORIES.CONTROL,
      targetPlayerId: follower.id,
      targetPlayerName: follower.name,
      targetPokemonId: "steevee-alakazam",
      targetPokemonName: "Alakazam",
      targetText: "Steevee's Alakazam",
      targetType: EFFECT_TARGET_TYPES.POKEMON,
      targetScope: EFFECT_TARGET_SCOPES.ROSTER_INSTANCE,
      notes: ""
    });
    if (!root) throw new Error("Could not create Follow Me's Steal parent.");
    const follow = recordTokenResponseToActivity(root, {
      actor: follower,
      actorPlayerId: follower.id,
      tokenName: "Follow Me",
      category: TOKEN_TIMING_CATEGORIES.PROTECTION,
      targetPokemonId: "steevee-second",
      targetPokemonName: "Kadabra",
      targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT,
      targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT,
      notes: ""
    }, "protection-token");
    if (!follow) throw new Error("Could not record Follow Me.");
    const redirectResolution = resolveCurrentInteractionPrompt(root, { force: true, source: "browser-test-follow-me" });
    const pendingRelationship = state.copiedTokenRelationships.find((entry) => entry.sourceEffectId === follow.id);
    const pendingStatus = pendingRelationship?.status || "";
    const rootResolution = resolveCurrentInteractionPrompt(root, { force: true, source: "browser-test-follow-me-root" });
    const activeRelationship = state.copiedTokenRelationships.find((entry) => entry.id === pendingRelationship?.id);
    const copiedBefore = follower.inventory.filter((item) => item.copyProvenance?.copySourceType === "followMe").length;
    const consumed = consumeTokenForEffect({
      player: source,
      tokenName: "Restrict",
      metadata: tokenEffectMetadataByName("Restrict"),
      source: "browser-follow-me-consumption"
    });
    const copiedAfter = follower.inventory.filter((item) => item.copyProvenance?.copySourceType === "followMe");
    controlTokenEffects.copyConsumedTokenForRelationships(state, consumed.consumption, {
      ...controlTokenEffectOptions(),
      definitionFor: (value) => globalThis.rivalSagaTokenEffectContract.definitionFor(value)
    });
    if (backendSync.saveTimer) {
      clearTimeout(backendSync.saveTimer);
      backendSync.saveTimer = null;
    }
    await pushBackendState({ force: true });
    return {
      rootId: root.id,
      redirectResolution,
      rootResolution,
      pendingStatus,
      activeStatus: activeRelationship?.status || "",
      redirectedPokemonId: root.payload.targetPokemonId,
      redirectedOwnerId: state.pokemonRecords.find((entry) => entry.id === "steevee-second")?.trainerId || "",
      copiedBefore,
      copiedAfter: copiedAfter.map((item) => ({ definitionId: item.canonicalDefinitionId, sourceInventoryRecordId: item.copyProvenance.sourceInventoryRecordId })),
      copiedAfterDuplicateAttempt: follower.inventory.filter((item) => item.copyProvenance?.copySourceType === "followMe").length
    };
  })()`);
  assert.equal(followResult.redirectResolution.resolved, true);
  assert.equal(followResult.pendingStatus, "pendingParentResolution");
  assert.equal(followResult.rootResolution.closed, true);
  assert.equal(followResult.activeStatus, "active");
  assert.equal(followResult.redirectedPokemonId, "steevee-second");
  assert.equal(followResult.redirectedOwnerId, "gold");
  assert.equal(followResult.copiedBefore, 0);
  assert.deepEqual(followResult.copiedAfter, [{ definitionId: "restrict-token", sourceInventoryRecordId: "gold-restrict-1" }]);
  assert.equal(followResult.copiedAfterDuplicateAttempt, 1);
  await reloadProduction("browser-013-follow-me");
  assert.deepEqual(await evaluate(`(() => ({
    relationships: state.copiedTokenRelationships.filter((entry) => entry.relationshipType === "followMe" && entry.status === "active").length,
    copies: state.players.find((player) => player.id === "steevee").inventory.filter((item) => item.copyProvenance?.copySourceType === "followMe").length
  }))()`), { relationships: 1, copies: 1 });
  const followExpired = await evaluate(`(async () => {
    const expired = controlTokenEffects.expireTokenCopyRelationships(state, {
      ...controlTokenEffectOptions(),
      series: "Kanto",
      gym: 2,
      phase: "action"
    });
    if (backendSync.saveTimer) {
      clearTimeout(backendSync.saveTimer);
      backendSync.saveTimer = null;
    }
    await pushBackendState({ force: true });
    return {
      expired: expired.length,
      active: state.copiedTokenRelationships.filter((entry) => entry.relationshipType === "followMe" && entry.status === "active").length,
      copies: state.players.find((player) => player.id === "steevee").inventory.filter((item) => item.copyProvenance?.copySourceType === "followMe").length
    };
  })()`);
  assert.deepEqual(followExpired, { expired: 1, active: 0, copies: 1 });
  await reloadProduction("browser-013-follow-me");
  const followUndo = await evaluate(`(() => {
    const effectLog = state.log
      .filter((entry) => !entry.undone && entry.undoData?.actionType?.startsWith("undoTokenEffectContract") && entry.linkedEventId === ${JSON.stringify(followResult.rootId)})
      .sort((left, right) => Number(right.eventOrder || 0) - Number(left.eventOrder || 0))[0];
    if (!effectLog) throw new Error("Follow Me did not retain its root History undo record.");
    undoLogEntry(effectLog.id);
    const source = state.players.find((player) => player.id === "gold");
    const follower = state.players.find((player) => player.id === "steevee");
    return {
      relationships: state.copiedTokenRelationships.filter((entry) => entry.relationshipType === "followMe").length,
      copies: follower.inventory.filter((item) => item.copyProvenance?.copySourceType === "followMe").length,
      followMe: follower.inventory.filter((item) => item.id === "steevee-follow-me-1").length,
      steal: source.inventory.filter((item) => item.id === "gold-steal-1").length,
      restrict: source.inventory.filter((item) => item.id === "gold-restrict-1").length,
      kadabraOwner: findPokemonRecord("steevee-second")?.trainerId || ""
    };
  })()`);
  assert.deepEqual(followUndo, {
    relationships: 0,
    copies: 0,
    followMe: 1,
    steal: 1,
    restrict: 1,
    kadabraOwner: "steevee"
  });
  assertNoNewBrowserErrors(errorStart);
});

test("[BROWSER-014] Haze selector shows chosen species and disables duplicate names", async () => {
  const errorStart = browserErrors.length;
  const hazeState = controlStateFixture("browser-014-haze-ui");
  hazeState.players.find((player) => player.id === "steevee").inventory.push({
    id: "steevee-haze-ui-1",
    canonicalId: "haze-curse",
    name: "Haze Curse",
    type: "TOKEN",
    tokenType: "curse"
  });
  await navigateProduction(hazeState, "BROWSER-014-HAZE");
  const presentation = await evaluate(`(() => {
    const actor = state.players.find((player) => player.id === "steevee");
    const draft = liveRefereeEffectDraftFor("Haze Curse", actor.id);
    draft.targetPokemonIds = ["gold-garchomp"];
    state.liveRefereeEffectDraft = draft;
    const markup = liveRefereeHazeTargetScreenMarkup({
      tokenName: "Haze Curse",
      metadata: tokenEffectMetadataByName("Haze Curse"),
      actor
    });
    const documentCopy = new DOMParser().parseFromString(markup, "text/html");
    const inputFor = (id) => [...documentCopy.querySelectorAll("[data-haze-curse-target]")].find((input) => input.value === id);
    return {
      situation: documentCopy.querySelector(".live-referee-situation")?.textContent || documentCopy.body.textContent,
      selectedText: documentCopy.querySelector('[data-haze-selected-species="garchomp"]')?.textContent.trim() || "",
      selectedChecked: Boolean(inputFor("gold-garchomp")?.checked),
      selectedDisabled: Boolean(inputFor("gold-garchomp")?.disabled),
      duplicateOneDisabled: Boolean(inputFor("red-garchomp")?.disabled),
      duplicateTwoDisabled: Boolean(inputFor("red-garchomp-2")?.disabled),
      differentSpeciesDisabled: Boolean(inputFor("gold-lucario")?.disabled),
      duplicateExplanation: markup.includes("Species already selected")
    };
  })()`);
  assert.match(presentation.situation, /two different Pokemon names/i);
  assert.match(presentation.selectedText, /Garchomp/i);
  assert.equal(presentation.selectedChecked, true);
  assert.equal(presentation.selectedDisabled, false);
  assert.equal(presentation.duplicateOneDisabled, true);
  assert.equal(presentation.duplicateTwoDisabled, true);
  assert.equal(presentation.differentSpeciesDisabled, false);
  assert.equal(presentation.duplicateExplanation, true);
  assertNoNewBrowserErrors(errorStart);
});

test("[BROWSER-015] Ditto transforms one exact record, survives refresh, and undoes from History", async () => {
  const errorStart = browserErrors.length;
  const productionState = controlStateFixture("browser-015-ditto");
  productionState.players.find((player) => player.id === "gold").inventory.push({
    id: "gold-ditto-1",
    canonicalId: "ditto-token",
    name: "Ditto",
    type: "TOKEN",
    tokenType: "control"
  });
  await navigateProduction(productionState, "BROWSER-015-DITTO");
  const transformed = await evaluate(`(async () => {
    const actor = state.players.find((player) => player.id === "gold");
    const metadata = tokenEffectMetadataByName("Ditto");
    const markup = liveRefereeDittoTargetScreenMarkup({ tokenName: "Ditto", metadata, actor });
    const documentCopy = new DOMParser().parseFromString(markup, "text/html");
    const options = [...documentCopy.querySelectorAll('[data-live-referee-effect-field="resourceDefinitionId"] option')]
      .map((option) => ({ value: option.value, text: option.textContent.trim() }));
    const result = resolveDittoInventoryCopyUse({
      actor,
      actorPlayerId: actor.id,
      tokenName: "Ditto",
      category: TOKEN_TIMING_CATEGORIES.CONTROL,
      resourceDefinitionId: "immunity",
      targetType: EFFECT_TARGET_TYPES.RESOURCE,
      targetScope: EFFECT_TARGET_SCOPES.SINGLE_RESOURCE
    }, metadata);
    if (!result) throw new Error("Ditto did not transform through the production resolver.");
    if (backendSync.saveTimer) {
      clearTimeout(backendSync.saveTimer);
      backendSync.saveTimer = null;
    }
    await pushBackendState({ force: true });
    const copies = actor.inventory.filter((item) => item.copyProvenance?.copySourceType === "ditto");
    return {
      pickerHasImmunity: options.some((option) => option.value === "immunity"),
      pickerHasDitto: options.some((option) => option.value === "ditto-token"),
      sourceCount: actor.inventory.filter((item) => item.id === "gold-ditto-1").length,
      copies: copies.map((item) => ({
        name: item.name,
        definitionId: item.canonicalDefinitionId,
        sourceInventoryRecordId: item.copyProvenance?.sourceInventoryRecordId || ""
      })),
      copiedActivations: state.copiedActivations.length
    };
  })()`);
  assert.deepEqual(transformed, {
    pickerHasImmunity: true,
    pickerHasDitto: false,
    sourceCount: 0,
    copies: [{ name: "Immunity", definitionId: "immunity", sourceInventoryRecordId: "gold-ditto-1" }],
    copiedActivations: 0
  });
  await reloadProduction("browser-015-ditto");
  const undone = await evaluate(`(() => {
    const actor = state.players.find((player) => player.id === "gold");
    const before = actor.inventory.filter((item) => item.copyProvenance?.copySourceType === "ditto").length;
    const effectLog = state.log.find((entry) => !entry.undone && entry.type === "ditto-token-copy" && entry.undoData?.actionType === "undoTokenEffectContract");
    if (!effectLog) throw new Error("Ditto History undo record did not survive refresh.");
    undoLogEntry(effectLog.id);
    const restoredActor = state.players.find((player) => player.id === "gold");
    return {
      before,
      ditto: restoredActor.inventory.filter((item) => item.id === "gold-ditto-1").length,
      copies: restoredActor.inventory.filter((item) => item.copyProvenance?.copySourceType === "ditto").length,
      copiedActivations: state.copiedActivations.length
    };
  })()`);
  assert.deepEqual(undone, { before: 1, ditto: 1, copies: 0, copiedActivations: 0 });
  assertNoNewBrowserErrors(errorStart);
});

test("[BROWSER-016] Lingering Aroma replacement, paid negation, expiration, refresh, and ordered History undo", async () => {
  const errorStart = browserErrors.length;
  const productionState = controlStateFixture("browser-016-lingering-aroma");
  productionState.players.find((player) => player.id === "gold").inventory.push({
    id: "gold-aroma-1", canonicalId: "lingering-aroma", name: "Lingering Aroma", type: "TOKEN", tokenType: "control"
  });
  productionState.players.find((player) => player.id === "red").inventory.push({
    id: "red-embargo-1", canonicalId: "embargo", name: "Embargo", type: "TOKEN", tokenType: "protection"
  });
  productionState.lingeringStatuses.push({
    id: "ongoing-gold-1",
    type: "test-ongoing",
    name: "Gold Ongoing Effect",
    status: "active",
    isOngoingEffect: true,
    actorPlayerId: "steevee",
    targetPlayerId: "gold",
    series: "Kanto",
    gym: 1,
    durationGyms: 2,
    expiresAtSeries: "Kanto",
    expiresAtGym: 3,
    payload: { targetPlayerId: "gold" }
  });
  await navigateProduction(productionState, "BROWSER-016-AROMA");
  const result = await evaluate(`(async () => {
    const gold = state.players.find((player) => player.id === "gold");
    const red = state.players.find((player) => player.id === "red");
    const aromaMetadata = tokenEffectMetadataByName("Lingering Aroma");
    const markup = liveRefereeLingeringAromaTargetScreenMarkup({ tokenName: "Lingering Aroma", metadata: aromaMetadata, actor: gold });
    const aroma = createTokenPendingEventFromUse({
      actor: gold,
      actorPlayerId: gold.id,
      tokenName: "Lingering Aroma",
      category: TOKEN_TIMING_CATEGORIES.CONTROL,
      targetText: "ongoing-gold-1",
      targetType: EFFECT_TARGET_TYPES.RESOURCE,
      targetScope: EFFECT_TARGET_SCOPES.SINGLE_RESOURCE,
      notes: ""
    });
    if (!aroma) throw new Error("Lingering Aroma declaration failed.");
    const aromaResolution = resolveCurrentInteractionPrompt(aroma, { force: true, source: "browser-test-aroma" });
    if (!aromaResolution.closed) throw new Error("Lingering Aroma did not resolve terminally.");
    const replacement = state.lingeringStatuses.find((entry) => entry.type === "ongoing-effect-text-replacement" && entry.status === "active");
    const embargo = createTokenPendingEventFromUse({
      actor: red,
      actorPlayerId: red.id,
      tokenName: "Embargo",
      category: TOKEN_TIMING_CATEGORIES.PROTECTION,
      targetPlayerId: gold.id,
      targetPlayerName: gold.name,
      targetText: gold.name,
      targetType: EFFECT_TARGET_TYPES.PLAYER,
      targetScope: EFFECT_TARGET_SCOPES.SINGLE_PLAYER,
      notes: ""
    });
    if (!embargo) throw new Error("The paid targeting declaration failed.");
    const negated = resolveInteractionActivity(embargo.id, "negated", {
      renderAfter: false,
      resultContext: { detail: "The confirmed declaration was negated after its Lingering Aroma cost was paid." }
    });
    if (!negated) throw new Error("The paid targeting declaration did not reach a terminal negated result.");
    if (backendSync.saveTimer) {
      clearTimeout(backendSync.saveTimer);
      backendSync.saveTimer = null;
    }
    await pushBackendState({ force: true });
    return {
      aromaId: aroma.id,
      embargoId: embargo.id,
      selectorContainsExactEffect: markup.includes("ongoing-gold-1") && markup.includes("Gold Ongoing Effect"),
      originalStatus: state.lingeringStatuses.find((entry) => entry.id === "ongoing-gold-1")?.status || "",
      replacementStatus: replacement?.status || "",
      replacementTargetId: replacement?.payload?.targetOngoingEffectId || "",
      embargoStatus: embargo.status,
      goldBalance: gold.balance,
      redBalance: red.balance,
      costOperations: state.effectOperations.filter((entry) => entry.operationType === "lingeringAromaDeclarationCost").length
    };
  })()`);
  assert.deepEqual(result, {
    aromaId: result.aromaId,
    embargoId: result.embargoId,
    selectorContainsExactEffect: true,
    originalStatus: "replaced",
    replacementStatus: "active",
    replacementTargetId: "ongoing-gold-1",
    embargoStatus: "negated",
    goldBalance: 10500,
    redBalance: 9500,
    costOperations: 1
  });
  await reloadProduction("browser-016-lingering-aroma");
  const expired = await evaluate(`(async () => {
    const original = state.lingeringStatuses.find((entry) => entry.id === "ongoing-gold-1");
    original.status = "expired";
    const expiredRecords = controlTokenEffects.expireLingeringAromaRelationships(state, controlTokenEffectOptions());
    if (backendSync.saveTimer) {
      clearTimeout(backendSync.saveTimer);
      backendSync.saveTimer = null;
    }
    await pushBackendState({ force: true });
    return {
      expired: expiredRecords.length,
      replacementStatus: state.lingeringStatuses.find((entry) => entry.type === "ongoing-effect-text-replacement")?.status || "",
      goldBalance: state.players.find((player) => player.id === "gold").balance,
      redBalance: state.players.find((player) => player.id === "red").balance
    };
  })()`);
  assert.deepEqual(expired, { expired: 1, replacementStatus: "expired", goldBalance: 10500, redBalance: 9500 });
  await reloadProduction("browser-016-lingering-aroma");
  const undone = await evaluate(`(() => {
    const logFor = (eventId) => state.log
      .filter((entry) => !entry.undone && entry.linkedEventId === eventId && entry.undoData?.actionType === "undoTokenEffectContract")
      .sort((left, right) => Number(right.eventOrder || 0) - Number(left.eventOrder || 0))[0];
    const embargoLog = logFor(${JSON.stringify(result.embargoId)});
    if (!embargoLog) throw new Error("Embargo History undo record did not survive refresh.");
    undoLogEntry(embargoLog.id);
    const afterEmbargo = {
      replacementStatus: state.lingeringStatuses.find((entry) => entry.type === "ongoing-effect-text-replacement")?.status || "",
      goldBalance: state.players.find((player) => player.id === "gold").balance,
      redBalance: state.players.find((player) => player.id === "red").balance
    };
    const aromaLog = logFor(${JSON.stringify(result.aromaId)});
    if (!aromaLog) throw new Error("Lingering Aroma History undo record did not survive refresh.");
    undoLogEntry(aromaLog.id);
    return {
      afterEmbargo,
      aroma: state.players.find((player) => player.id === "gold").inventory.filter((item) => item.id === "gold-aroma-1").length,
      originalStatus: state.lingeringStatuses.find((entry) => entry.id === "ongoing-gold-1")?.status || "",
      replacements: state.lingeringStatuses.filter((entry) => entry.type === "ongoing-effect-text-replacement").length
    };
  })()`);
  assert.deepEqual(undone, {
    afterEmbargo: { replacementStatus: "active", goldBalance: 10000, redBalance: 10000 },
    aroma: 1,
    originalStatus: "active",
    replacements: 0
  });
  assertNoNewBrowserErrors(errorStart);
});

test("[BROWSER-017] Move Deleter rejects next-Gym selection, import, export, and validation through expiration and undo", async () => {
  const errorStart = browserErrors.length;
  const productionState = controlStateFixture("browser-017-move-deleter");
  productionState.players.find((player) => player.id === "gold").inventory.push({
    id: "gold-move-deleter-1", canonicalId: "move-deleter", name: "Move Deleter", type: "TOKEN", tokenType: "control"
  });
  await navigateProduction(productionState, "BROWSER-017-MOVE-DELETER");
  const declared = await evaluate(`(async () => {
    await ensurePokemonBuildDataLoaded({ renderOnLoad: false });
    const actor = state.players.find((player) => player.id === "gold");
    const root = createTokenPendingEventFromUse({
      actor,
      actorPlayerId: actor.id,
      tokenName: "Move Deleter",
      category: TOKEN_TIMING_CATEGORIES.CONTROL,
      targetText: "Recover",
      targetType: EFFECT_TARGET_TYPES.RESOURCE,
      targetScope: EFFECT_TARGET_SCOPES.SINGLE_RESOURCE,
      notes: ""
    });
    if (!root) throw new Error("Move Deleter declaration failed.");
    const resolution = resolveCurrentInteractionPrompt(root, { force: true, source: "browser-test-move-deleter" });
    if (!resolution.closed) throw new Error("Move Deleter did not resolve terminally.");
    if (backendSync.saveTimer) {
      clearTimeout(backendSync.saveTimer);
      backendSync.saveTimer = null;
    }
    await pushBackendState({ force: true });
    const status = state.lingeringStatuses.find((entry) => entry.type === "global-move-restriction");
    return { rootId: root.id, activeSeries: status?.payload?.activeSeries || "", activeGym: status?.payload?.activeGym || 0, moveName: status?.payload?.moveName || "" };
  })()`);
  assert.deepEqual(declared, { rootId: declared.rootId, activeSeries: "Kanto", activeGym: 2, moveName: "Recover" });
  await reloadProduction("browser-017-move-deleter");
  const enforced = await evaluate(`(async () => {
    await ensurePokemonBuildDataLoaded({ renderOnLoad: false });
    state.gym = 2;
    const player = state.players.find((entry) => entry.id === "gold");
    const slot = normalizeTeamBuildSlot({ pokemonRecordId: "gold-lucario", selectedBattleSpecies: "Lucario", moves: ["Recover"] }, player.id);
    const build = normalizeTeamBuildDraft({ id: "move-deleter-build", playerId: player.id, series: "Kanto", gym: 2, slots: [slot] }, player.id);
    const rules = teambuilderRuleContextForPokemon(findPokemonRecord("gold-lucario"));
    const validation = validateTeamBuildDraft(build, player.id);
    const alertMessages = [];
    const originalAlert = window.alert;
    window.alert = (message) => alertMessages.push(String(message || ""));
    const imported = importShowdownTeamToActiveBuild("Lucario\\n- Recover", player);
    window.alert = originalAlert;
    const exported = teambuilderExportShowdownText(build, player);
    return {
      bannedNames: rules.bannedMoveNames,
      validationBlocks: validation.issues.some((issue) => /Move Deleter/.test(issue.message)),
      imported,
      exported,
      importRejection: alertMessages[0] || ""
    };
  })()`);
  assert.deepEqual(enforced, {
    bannedNames: ["Recover"],
    validationBlocks: true,
    imported: false,
    exported: "",
    importRejection: "Import rejected: Recover is unavailable because of Move Deleter."
  });
  const expired = await evaluate(`(async () => {
    const records = controlTokenEffects.expireMoveRestrictionsAtGymEnd(state, { ...controlTokenEffectOptions(), series: "Kanto", gym: 2 });
    if (backendSync.saveTimer) {
      clearTimeout(backendSync.saveTimer);
      backendSync.saveTimer = null;
    }
    await pushBackendState({ force: true });
    return { expired: records.length, active: controlTokenEffects.activeMoveRestrictions(state, controlTokenEffectOptions()).length };
  })()`);
  assert.deepEqual(expired, { expired: 1, active: 0 });
  await reloadProduction("browser-017-move-deleter");
  const undone = await evaluate(`(() => {
    const effectLog = state.log.find((entry) => !entry.undone && entry.linkedEventId === ${JSON.stringify(declared.rootId)} && entry.undoData?.actionType === "undoTokenEffectContract");
    if (!effectLog) throw new Error("Move Deleter History undo record did not survive refresh.");
    undoLogEntry(effectLog.id);
    return {
      token: state.players.find((player) => player.id === "gold").inventory.filter((item) => item.id === "gold-move-deleter-1").length,
      restrictions: state.lingeringStatuses.filter((entry) => entry.type === "global-move-restriction").length
    };
  })()`);
  assert.deepEqual(undone, { token: 1, restrictions: 0 });
  assertNoNewBrowserErrors(errorStart);
});

test("[BROWSER-018] Knock Off final TM loss opens a persisted Sabotage revision and exact History undo", async () => {
  const errorStart = browserErrors.length;
  const productionState = controlStateFixture("browser-018-knock-off");
  productionState.players.find((player) => player.id === "gold").inventory.push({
    id: "gold-knock-off-1", canonicalId: "knock-off-curse", name: "Knock Off Curse", type: "TOKEN", tokenType: "curse"
  });
  await navigateProduction(productionState, "BROWSER-018-KNOCK-OFF");
  const resolved = await evaluate(`(async () => {
    await ensurePokemonBuildDataLoaded({ renderOnLoad: false });
    const actor = state.players.find((player) => player.id === "gold");
    const red = state.players.find((player) => player.id === "red");
    const build = activeTeamBuildDraftForPlayer(red.id, { create: true });
    build.slots = [normalizeTeamBuildSlot({
      pokemonRecordId: "red-garchomp",
      selectedBattleSpecies: "Garchomp",
      moves: ["Recover"],
      moveProvenance: [{ moveName: "Recover", source: "tm", inventoryRecordId: "red-recover" }]
    }, red.id)];
    build.slotCount = 1;
    const teams = currentPhaseTeams();
    teams.red.selected = ["red-garchomp"];
    teams.red.badgeBoosts = [0];
    teams.red.locked = true;
    teams.red.lockedSlots = lockedBattleTeamSlots(red.id);
    const draft = liveRefereeEffectDraftFor("Knock Off Curse", actor.id);
    draft.targetPokemonId = "red-garchomp";
    state.liveRefereeEffectDraft = draft;
    const selector = liveRefereeKnockOffTargetScreenMarkup({ tokenName: "Knock Off Curse", metadata: tokenEffectMetadataByName("Knock Off Curse"), actor });
    const root = createTokenPendingEventFromUse({
      actor,
      actorPlayerId: actor.id,
      tokenName: "Knock Off Curse",
      category: TOKEN_TIMING_CATEGORIES.CURSE,
      targetPlayerId: red.id,
      targetPlayerName: red.name,
      targetPokemonId: "red-garchomp",
      targetPokemonName: "Garchomp",
      targetText: "Red's Garchomp",
      targetType: EFFECT_TARGET_TYPES.POKEMON,
      targetScope: EFFECT_TARGET_SCOPES.ROSTER_INSTANCE,
      choiceKind: "tm",
      inventoryRecordId: "red-recover",
      moveName: "Recover",
      teamLock: true,
      notes: ""
    });
    if (!root) throw new Error("Knock Off Curse declaration failed.");
    const resolution = resolveCurrentInteractionPrompt(root, { force: true, source: "browser-test-knock-off" });
    if (!resolution.closed) throw new Error("Knock Off Curse did not resolve terminally.");
    if (backendSync.saveTimer) {
      clearTimeout(backendSync.saveTimer);
      backendSync.saveTimer = null;
    }
    await pushBackendState({ force: true });
    const revisions = openBattleRevisionWindows({ playerId: red.id, revisionType: BATTLE_REVISION_TYPES.SABOTAGE_SET });
    return {
      rootId: root.id,
      selectorHasExactTm: selector.includes("TM Move - Recover"),
      tmCount: red.inventory.filter((item) => item.id === "red-recover").length,
      moveStillPresent: build.slots[0].moves.includes("Recover"),
      revisions: revisions.map((entry) => ({
        pokemonId: entry.affectedPokemonRecordId,
        sourceActivityId: entry.sourceActivityId,
        requiredChanges: entry.requiredChanges
      }))
    };
  })()`);
  assert.equal(resolved.selectorHasExactTm, true);
  assert.equal(resolved.tmCount, 0);
  assert.equal(resolved.moveStillPresent, true);
  assert.equal(resolved.revisions.length, 1);
  assert.equal(resolved.revisions[0].pokemonId, "red-garchomp");
  assert.equal(resolved.revisions[0].sourceActivityId, resolved.rootId);
  assert.deepEqual(resolved.revisions[0].requiredChanges, ["Replace Recover"]);
  await reloadProduction("browser-018-knock-off");
  const undone = await evaluate(`(() => {
    const persistedRevisions = openBattleRevisionWindows({ playerId: "red", revisionType: BATTLE_REVISION_TYPES.SABOTAGE_SET }).length;
    const effectLog = state.log.find((entry) => !entry.undone && entry.linkedEventId === ${JSON.stringify(resolved.rootId)} && entry.undoData?.actionType === "undoTokenEffectContract");
    if (!effectLog) throw new Error("Knock Off History undo record did not survive refresh.");
    undoLogEntry(effectLog.id);
    const red = state.players.find((player) => player.id === "red");
    const actor = state.players.find((player) => player.id === "gold");
    const build = activeTeamBuildDraftForPlayer(red.id);
    return {
      persistedRevisions,
      revisionsAfterUndo: openBattleRevisionWindows({ playerId: red.id, revisionType: BATTLE_REVISION_TYPES.SABOTAGE_SET }).length,
      tmCount: red.inventory.filter((item) => item.id === "red-recover").length,
      tokenCount: actor.inventory.filter((item) => item.id === "gold-knock-off-1").length,
      moveStillPresent: build?.slots?.[0]?.moves?.includes("Recover") || false
    };
  })()`);
  assert.deepEqual(undone, { persistedRevisions: 1, revisionsAfterUndo: 0, tmCount: 1, tokenCount: 1, moveStillPresent: true });
  assertNoNewBrowserErrors(errorStart);
});

test("[BROWSER-019] production Restrict declaration, rendered response, refresh, and causal History undo", async () => {
  const errorStart = browserErrors.length;
  const productionState = controlStateFixture("browser-019-restrict");
  const gameId = await navigateProduction(productionState, "BROWSER-019-RESTRICT");
  const resolved = await evaluate(`(() => {
    const actor = state.players.find((player) => player.id === "steevee");
    state.liveRefereeSelectedEffectName = "Restrict";
    state.testingTools.controlledPlayerId = actor.id;
    state.liveRefereeEffectDraft = null;
    const picker = liveRefereeEffectUseScreenMarkup(getCurrentLivePrompt(), actor.id);
    const activity = createTokenPendingEventFromUse({
      actor, actorPlayerId: actor.id, tokenName: "Restrict", category: TOKEN_TIMING_CATEGORIES.CONTROL,
      targetText: "GARCHOMP", targetPokemonName: "GARCHOMP",
      targetType: EFFECT_TARGET_TYPES.POKEMON, targetScope: EFFECT_TARGET_SCOPES.SPECIES
    });
    if (!activity) throw new Error("Restrict declaration did not open.");
    const responseMarkup = liveRefereeOtherResponseScreenMarkup(getCurrentLivePrompt());
    activity.eligiblePlayerIds = [];
    activity.responseTypes = [];
    activity.payload.responsesAllowed = false;
    const confirmed = resolveInteractionActivity(activity.id, "resolved", { renderAfter: false });
    if (!confirmed) throw new Error("Restrict confirmation did not resolve.");
    const status = state.lingeringStatuses.find((entry) => entry.type === "restrict" && entry.status === "active");
    const buildValidation = validateTeamBuildDraft({ playerId: "red", gym: 1, slots: [normalizeTeamBuildSlot({ pokemonRecordId: "red-garchomp", selectedBattleSpecies: "Garchomp" }, "red")] }, "red");
    const submittedRoster = currentRosterSnapshot("red").find((entry) => entry.pokemonId === "red-garchomp");
    return {
      picker: picker.includes("Pokemon Species / Name"),
      response: /response|Protection|Pass/i.test(responseMarkup),
      terminal: interactionSituationLifecycle.isTerminal(activity),
      durationGyms: status?.durationGyms || 0,
      statusId: status?.id || "",
      teambuilderBlocked: buildValidation.issues.some((issue) => /restricted/i.test(issue.message)),
      submittedBlocked: submittedRoster?.available === false
    };
  })()`);
  assert.equal(resolved.picker, true);
  assert.equal(resolved.response, true);
  assert.equal(resolved.terminal, true);
  assert.equal(resolved.durationGyms, 6);
  assert.ok(resolved.statusId);
  assert.equal(resolved.teambuilderBlocked, true);
  assert.equal(resolved.submittedBlocked, true);
  await persistBrowserState(gameId);
  await reloadProduction("browser-019-restrict");
  const undone = await evaluate(`(() => {
    const pokemon = state.pokemonRecords.find((entry) => entry.id === "red-garchomp");
    pokemon.userLaterNote = "preserve-me";
    const entry = state.log.find((item) => !item.undone && item.undoData?.actionType === "undoTokenEffectContractCausal" && item.undoData?.tokenDefinitionId === "restrict-token");
    if (!entry) throw new Error("Restrict causal History record did not survive refresh.");
    undoLogEntry(entry.id);
    return {
      token: state.players.find((player) => player.id === "steevee").inventory.some((item) => item.id === "steevee-restrict-1"),
      active: state.lingeringStatuses.some((status) => status.type === "restrict" && status.status === "active"),
      note: pokemon.userLaterNote,
      terminal: state.interactionEvents.every((activity) => activity.status !== "open")
    };
  })()`);
  assert.deepEqual(undone, { token: true, active: false, note: "preserve-me", terminal: true });
  assertNoNewBrowserErrors(errorStart);
});

test("[BROWSER-020] production Extra Ban exact Active anchor, refresh, and causal History undo", async () => {
  const errorStart = browserErrors.length;
  const productionState = controlStateFixture("browser-020-extra-ban");
  productionState.lingeringStatuses.push({
    id: "other-copy-substitute", type: "substitute-attached", status: "active", targetPlayerId: "red",
    targetPokemonId: "red-garchomp-2", targetPokemonName: "Garchomp", durationGyms: 1,
    series: "Kanto", gym: 1, payload: { blocksNextAffectingEffect: true }
  });
  await navigateProduction(productionState, "BROWSER-020-EXTRA-BAN");
  const result = await evaluate(`(async () => {
    const actor = state.players.find((player) => player.id === "steevee");
    const metadata = tokenEffectMetadataByName("Extra Ban");
    state.liveRefereeSelectedEffectName = "Extra Ban";
    state.testingTools.controlledPlayerId = actor.id;
    const picker = liveRefereeEffectUseScreenMarkup(getCurrentLivePrompt(), actor.id);
    const activity = createTokenPendingEventFromUse({
      actor, actorPlayerId: actor.id, tokenName: "Extra Ban", category: TOKEN_TIMING_CATEGORIES.CONTROL,
      targetPlayerId: "red", targetPokemonId: "red-garchomp", targetPokemonName: "Garchomp",
      targetType: EFFECT_TARGET_TYPES.POKEMON, targetScope: EFFECT_TARGET_SCOPES.ROSTER_INSTANCE
    });
    if (!activity) throw new Error("Extra Ban declaration did not open.");
    const responseMarkup = liveRefereeOtherResponseScreenMarkup(getCurrentLivePrompt());
    const resolution = resolveCurrentInteractionPrompt(activity, { force: true, source: "browser-extra-ban" });
    if (!resolution.closed) throw new Error("Extra Ban did not resolve terminally.");
    await pushBackendState({ force: true });
    const ban = state.lingeringStatuses.find((status) => status.type === "ban" && status.status === "active");
    const buildValidation = validateTeamBuildDraft({ playerId: "red", gym: 1, slots: [normalizeTeamBuildSlot({ pokemonRecordId: "red-garchomp", selectedBattleSpecies: "Garchomp" }, "red")] }, "red");
    const submittedRoster = currentRosterSnapshot("red").find((entry) => entry.pokemonId === "red-garchomp");
    return {
      pickerHasActive: picker.includes("red-garchomp"),
      pickerExcludesLegacy: !picker.includes("red-lucario-legacy"),
      response: /response|Protection|Pass/i.test(responseMarkup),
      selectedAnchor: ban?.selectedRosterInstanceId || "",
      otherSubstituteActive: state.lingeringStatuses.find((status) => status.id === "other-copy-substitute")?.status === "active",
      teambuilderBlocked: buildValidation.issues.some((issue) => /banned/i.test(issue.message)),
      submittedBlocked: submittedRoster?.available === false
    };
  })()`, 30000);
  assert.deepEqual(result, { pickerHasActive: true, pickerExcludesLegacy: true, response: true, selectedAnchor: "red-garchomp", otherSubstituteActive: true, teambuilderBlocked: true, submittedBlocked: true });
  await reloadProduction("browser-020-extra-ban");
  const undone = await evaluate(`(() => {
    state.pokemonRecords.find((pokemon) => pokemon.id === "red-garchomp").laterEdit = "kept";
    const entry = state.log.find((item) => !item.undone && item.undoData?.tokenDefinitionId === "extra-ban-token");
    undoLogEntry(entry.id);
    return {
      token: state.players.find((player) => player.id === "steevee").inventory.some((item) => item.id === "steevee-extra-ban-1"),
      ban: state.lingeringStatuses.some((status) => status.type === "ban" && status.status === "active"),
      laterEdit: state.pokemonRecords.find((pokemon) => pokemon.id === "red-garchomp").laterEdit
    };
  })()`);
  assert.deepEqual(undone, { token: true, ban: false, laterEdit: "kept" });
  assertNoNewBrowserErrors(errorStart);
});

test("[BROWSER-021] production Unban exact-status picker, refresh, and causal restoration", async () => {
  const errorStart = browserErrors.length;
  const productionState = controlStateFixture("browser-021-unban");
  productionState.lingeringStatuses.push(
    { id: "restrict-exact", type: "restrict", name: "Restricted", status: "active", targetPokemonName: "Lucario", speciesId: "lucario", applicationScope: "globalSpecies", series: "Kanto", gym: 1, durationGyms: 6, expiresAtSeries: "Kanto", expiresAtGym: 7, payload: { preventsBattleTeamSubmission: true } },
    { id: "ban-other", type: "ban", name: "Banned", status: "active", targetPokemonName: "Lucario", speciesId: "lucario", applicationScope: "globalSpecies", series: "Kanto", gym: 1, duration: "Indefinite", payload: { preventsBattleTeamSubmission: true } }
  );
  await navigateProduction(productionState, "BROWSER-021-UNBAN");
  const result = await evaluate(`(async () => {
    const actor = state.players.find((player) => player.id === "steevee");
    state.liveRefereeSelectedEffectName = "Unban";
    state.testingTools.controlledPlayerId = actor.id;
    state.liveRefereeEffectDraft = normalizeLiveRefereeEffectDraft({ effectId: "unban", effectName: "Unban", actorPlayerId: actor.id, navigationKey: liveRefereeNavigationKey(), selectedStatusId: "restrict-exact", targetText: "Lucario" });
    const picker = liveRefereeEffectUseScreenMarkup(getCurrentLivePrompt(), actor.id);
    const activity = createTokenPendingEventFromUse({
      actor, actorPlayerId: actor.id, tokenName: "Unban", category: TOKEN_TIMING_CATEGORIES.CONTROL,
      targetText: "Lucario", targetPokemonName: "Lucario", selectedStatusId: "restrict-exact",
      targetType: EFFECT_TARGET_TYPES.POKEMON, targetScope: EFFECT_TARGET_SCOPES.SPECIES
    });
    if (!activity) throw new Error("Unban declaration did not open.");
    const responseMarkup = liveRefereeOtherResponseScreenMarkup(getCurrentLivePrompt());
    const resolution = resolveCurrentInteractionPrompt(activity, { force: true, source: "browser-unban" });
    if (!resolution.closed) throw new Error("Unban did not resolve terminally.");
    await pushBackendState({ force: true });
    return {
      exactPicker: picker.includes("restrict-exact") && picker.includes("ban-other"),
      response: /response|Protection|Pass/i.test(responseMarkup),
      restrictRemoved: state.lingeringStatuses.find((status) => status.id === "restrict-exact")?.status === "removed",
      banPreserved: state.lingeringStatuses.find((status) => status.id === "ban-other")?.status === "active",
      protection: state.lingeringStatuses.some((status) => status.type === "unban-protection" && status.status === "active")
    };
  })()`, 30000);
  assert.deepEqual(result, { exactPicker: true, response: true, restrictRemoved: true, banPreserved: true, protection: true });
  await reloadProduction("browser-021-unban");
  const undone = await evaluate(`(() => {
    const entry = state.log.find((item) => !item.undone && item.undoData?.tokenDefinitionId === "unban-token");
    undoLogEntry(entry.id);
    const restored = state.lingeringStatuses.find((status) => status.id === "restrict-exact");
    return {
      restrict: restored?.status,
      expiry: restored?.expiresAtGym,
      ban: state.lingeringStatuses.find((status) => status.id === "ban-other")?.status,
      protection: state.lingeringStatuses.some((status) => status.type === "unban-protection" && status.status === "active")
    };
  })()`);
  assert.deepEqual(undone, { restrict: "active", expiry: 7, ban: "active", protection: false });
  assertNoNewBrowserErrors(errorStart);
});

test("[BROWSER-022] production Clear Smog provenance, rendered result, refresh, and causal undo", async () => {
  const errorStart = browserErrors.length;
  const productionState = controlStateFixture("browser-022-clear-smog");
  const target = productionState.pokemonRecords.find((pokemon) => pokemon.id === "gold-garchomp");
  target.buffs = ["+3 Levels", "AAA Ability: Levitate", "Native Ribbon"];
  target.effectBuffs = [
    { id: "clear-level", type: "levelBonus", label: "+3 Levels", amount: 3, status: "active", clearable: true },
    { id: "clear-ability", type: "abilityGrant", label: "AAA Ability: Levitate", abilityName: "Levitate", status: "active", clearable: true }
  ];
  productionState.players.find((player) => player.id === "gold").moveAccessGrants.push({ id: "clear-move", pokemonRecordId: target.id, moveName: "Fake Out", status: "active", active: true });
  await navigateProduction(productionState, "BROWSER-022-CLEAR-SMOG");
  const result = await evaluate(`(async () => {
    const actor = state.players.find((player) => player.id === "steevee");
    state.liveRefereeSelectedEffectName = "Clear Smog";
    state.testingTools.controlledPlayerId = actor.id;
    const picker = liveRefereeEffectUseScreenMarkup(getCurrentLivePrompt(), actor.id);
    const activity = createTokenPendingEventFromUse({
      actor, actorPlayerId: actor.id, tokenName: "Clear Smog", category: TOKEN_TIMING_CATEGORIES.CONTROL,
      targetPlayerId: "gold", targetPokemonId: "gold-garchomp", targetPokemonName: "Garchomp",
      targetType: EFFECT_TARGET_TYPES.POKEMON, targetScope: EFFECT_TARGET_SCOPES.ROSTER_INSTANCE
    });
    const responseMarkup = liveRefereeOtherResponseScreenMarkup(getCurrentLivePrompt());
    const resolution = resolveCurrentInteractionPrompt(activity, { force: true, source: "browser-clear-smog" });
    if (!resolution.closed) throw new Error("Clear Smog did not resolve terminally.");
    const renderedResult = liveRefereeResolutionAnnouncementMarkup(tokenResultSummary.announcementForResult(activity.payload.finalResultSummary, state));
    await pushBackendState({ force: true });
    const pokemon = findPokemonRecord("gold-garchomp");
    return {
      picker: picker.includes("gold-garchomp"), response: /response|Protection|Pass/i.test(responseMarkup),
      summary: renderedResult || JSON.stringify(activity.payload?.finalResultSummary || {}),
      removed: pokemon.effectBuffs.every((buff) => buff.status === "removed"),
      native: pokemon.buffs.includes("Native Ribbon"),
      grant: state.players.find((player) => player.id === "gold").moveAccessGrants.find((grant) => grant.id === "clear-move")?.status
    };
  })()`, 30000);
  assert.equal(result.picker, true);
  assert.equal(result.response, true);
  assert.match(result.summary, /Clear Smog|removed/i);
  assert.equal(result.removed, true);
  assert.equal(result.native, true);
  assert.equal(result.grant, "removed");
  await reloadProduction("browser-022-clear-smog");
  const undone = await evaluate(`(() => {
    const pokemon = findPokemonRecord("gold-garchomp");
    pokemon.moves ||= [];
    pokemon.moves.push("Later Move");
    const entry = state.log.find((item) => !item.undone && item.undoData?.tokenDefinitionId === "clear-smog");
    undoLogEntry(entry.id);
    return {
      buffs: pokemon.effectBuffs.map((buff) => buff.status),
      labels: pokemon.buffs,
      laterMove: pokemon.moves.includes("Later Move"),
      grant: state.players.find((player) => player.id === "gold").moveAccessGrants.find((grant) => grant.id === "clear-move")?.status
    };
  })()`);
  assert.deepEqual(undone, { buffs: ["active", "active"], labels: ["+3 Levels", "AAA Ability: Levitate", "Native Ribbon"], laterMove: true, grant: "active" });
  assertNoNewBrowserErrors(errorStart);
});

test("[BROWSER-023] production Rage Candy extension, generated rules, refresh, and ordered causal undo", async () => {
  const errorStart = browserErrors.length;
  const productionState = controlStateFixture("browser-023-rage");
  await navigateProduction(productionState, "BROWSER-023-RAGE");
  const result = await evaluate(`(async () => {
    const actor = state.players.find((player) => player.id === "gold");
    const resolveOne = (tokenId) => {
      const token = actor.inventory.find((item) => item.id === tokenId);
      const activity = createTokenPendingEventFromUse({
        actor, actorPlayerId: actor.id, tokenName: token.name, category: TOKEN_TIMING_CATEGORIES.CONTROL,
        targetPlayerId: actor.id, targetPokemonId: "gold-garchomp", targetPokemonName: "Garchomp",
        targetType: EFFECT_TARGET_TYPES.POKEMON, targetScope: EFFECT_TARGET_SCOPES.ROSTER_INSTANCE
      });
      const resolution = resolveCurrentInteractionPrompt(activity, { force: true, source: "browser-rage" });
      if (!resolution.closed) throw new Error("Rage Candy did not resolve terminally.");
      return activity;
    };
    state.liveRefereeSelectedEffectName = "Rage Candy Bar";
    state.testingTools.controlledPlayerId = actor.id;
    const picker = liveRefereeEffectUseScreenMarkup(getCurrentLivePrompt(), actor.id);
    const first = resolveOne("gold-rage-1");
    const second = resolveOne("gold-rage-2");
    const pokemon = findPokemonRecord("gold-garchomp");
    const rules = teambuilderRuleContextForPokemon(pokemon);
    await pushBackendState({ force: true });
    return {
      picker: picker.includes("gold-garchomp"),
      duration: state.lingeringStatuses.find((status) => status.type === "rage-candy-enhancement" && status.status === "active")?.durationGyms,
      buffCount: pokemon.effectBuffs.filter((buff) => buff.status === "active").length,
      level: teambuilderEffectiveLevelForPokemon(pokemon),
      evBonus: rules.evCapBonuses.reduce((sum, entry) => sum + entry.amount, 0),
      eventIds: [first.id, second.id]
    };
  })()`, 30000);
  assert.deepEqual({ picker: result.picker, duration: result.duration, buffCount: result.buffCount, level: result.level, evBonus: result.evBonus }, { picker: true, duration: 4, buffCount: 2, level: 103, evBonus: 252 });
  await reloadProduction("browser-023-rage");
  const undone = await evaluate(`(() => {
    const pokemon = findPokemonRecord("gold-garchomp");
    pokemon.laterEdit = "kept";
    const logs = state.log.filter((item) => !item.undone && item.undoData?.tokenDefinitionId === "rage-candy-bar").sort((a, b) => b.eventOrder - a.eventOrder);
    undoLogEntry(logs[0].id);
    const afterExtension = state.lingeringStatuses.find((status) => status.type === "rage-candy-enhancement" && status.status === "active")?.durationGyms || 0;
    undoLogEntry(logs[1].id);
    return {
      afterExtension,
      active: state.lingeringStatuses.some((status) => status.type === "rage-candy-enhancement" && status.status === "active"),
      tokens: state.players.find((player) => player.id === "gold").inventory.filter((item) => ["gold-rage-1", "gold-rage-2"].includes(item.id)).length,
      laterEdit: pokemon.laterEdit
    };
  })()`);
  assert.deepEqual(undone, { afterExtension: 2, active: false, tokens: 2, laterEdit: "kept" });
  assertNoNewBrowserErrors(errorStart);
});

test("[BROWSER-024] production Safeguard response lifecycle, category scope, refresh, and causal undo", async () => {
  const errorStart = browserErrors.length;
  const productionState = controlStateFixture("browser-024-safeguard");
  productionState.players.find((player) => player.id === "gold").inventory.push({ id: "gold-safeguard-1", canonicalId: "safeguard", name: "Safeguard", type: "TOKEN", tokenType: "protection" });
  const gameId = await navigateProduction(productionState, "BROWSER-024-SAFEGUARD");
  const result = await evaluate(`(() => {
    const actor = state.players.find((player) => player.id === "gold");
    state.liveRefereeSelectedEffectName = "Safeguard";
    state.testingTools.controlledPlayerId = actor.id;
    const picker = liveRefereeEffectUseScreenMarkup(getCurrentLivePrompt(), actor.id);
    const metadata = tokenEffectMetadataByName("Safeguard");
    const activity = createTokenPendingEventFromUse({
      actor, actorPlayerId: actor.id, targetPlayerId: actor.id, targetPlayerName: actor.name,
      tokenName: "Safeguard", category: TOKEN_TIMING_CATEGORIES.PROTECTION,
      targetType: EFFECT_TARGET_TYPES.PLAYER, targetScope: EFFECT_TARGET_SCOPES.SINGLE_PLAYER
    });
    if (!activity) throw new Error("Safeguard declaration did not open.");
    const responseMarkup = liveRefereeOtherResponseScreenMarkup(getCurrentLivePrompt());
    const resolution = resolveCurrentInteractionPrompt(activity, { force: true, source: "browser-safeguard" });
    if (!resolution.closed) throw new Error("Safeguard did not resolve terminally.");
    return {
      selfPicker: picker.includes('data-live-referee-effect-field="targetPlayerId"'),
      responseEnabled: metadata.canBeRespondedTo && /response|Protection|Pass/i.test(responseMarkup),
      protected: ["moneySteal", "moneyDestroy", "moneyCopy", "tokenSteal", "tokenDestroy", "tokenCopy", "followMe", "embargo"].every((category) => controlTokenEffects.playerHasActiveSafeguard(state, actor.id, category, controlTokenEffectOptions())),
      nonProtected: ["itemSteal", "itemDestroy", "tmSteal", "tmDestroy", "pokemonSteal", "forcedPayment", "counterspellRestoration"].every((category) => !controlTokenEffects.playerHasActiveSafeguard(state, actor.id, category, controlTokenEffectOptions())),
      otherPlayer: !controlTokenEffects.playerHasActiveSafeguard(state, "red", "tokenCopy", controlTokenEffectOptions())
    };
  })()`);
  assert.deepEqual(result, { selfPicker: true, responseEnabled: true, protected: true, nonProtected: true, otherPlayer: true });
  await persistBrowserState(gameId);
  await reloadProduction("browser-024-safeguard");
  const undone = await evaluate(`(() => {
    const actor = state.players.find((player) => player.id === "gold");
    actor.balance = 12345;
    const entry = state.log.find((item) => !item.undone && item.undoData?.tokenDefinitionId === "safeguard");
    undoLogEntry(entry.id);
    return {
      token: actor.inventory.some((item) => item.id === "gold-safeguard-1"),
      active: state.lingeringStatuses.some((status) => status.type === "safeguard" && status.status === "active"),
      balance: actor.balance
    };
  })()`);
  assert.deepEqual(undone, { token: true, active: false, balance: 12345 });
  assertNoNewBrowserErrors(errorStart);
});

test("[BROWSER-025] production Cold Wave suppresses explicit ongoing consumers through refresh, expiration, and causal undo", async () => {
  const errorStart = browserErrors.length;
  const productionState = controlStateFixture("browser-025-cold-wave");
  productionState.players.find((player) => player.id === "steevee").inventory.push({ id: "steevee-cold-wave-1", canonicalId: "cold-wave", name: "Cold Wave", type: "TOKEN" });
  productionState.lingeringStatuses.push(
    { id: "browser-025-ongoing-survivor", type: "test-ongoing", name: "Ongoing Survivor", status: "active", isOngoingEffect: true, series: "Kanto", gym: 1, targetPlayerId: "gold" },
    { id: "browser-025-ongoing-expires", type: "test-ongoing", name: "Ongoing Expiring", status: "active", isOngoingEffect: true, series: "Kanto", gym: 1, targetPlayerId: "red" },
    { id: "browser-025-duration-only", type: "duration-only", name: "Duration Only", status: "active", durationGyms: 2, series: "Kanto", gym: 1, targetPlayerId: "gold" }
  );
  const gameId = await navigateProduction(productionState, "BROWSER-025-COLD-WAVE");
  const resolved = await evaluate(`(() => {
    backendSync.enabled = false;
    const actor = state.players.find((player) => player.id === "steevee");
    state.liveRefereeSelectedEffectName = "Cold Wave";
    state.testingTools.controlledPlayerId = actor.id;
    const picker = liveRefereeEffectUseScreenMarkup(getCurrentLivePrompt(), actor.id);
    const activity = createTokenPendingEventFromUse({ actor, actorPlayerId: actor.id, tokenName: "Cold Wave", category: TOKEN_TIMING_CATEGORIES.CONTROL, targetType: EFFECT_TARGET_TYPES.TABLE, targetScope: EFFECT_TARGET_SCOPES.TABLE_WIDE });
    if (!activity) throw new Error("Cold Wave declaration did not open.");
    const result = resolveCurrentInteractionPrompt(activity, { force: true, source: "browser-cold-wave" });
    const suppression = state.lingeringStatuses.find((status) => status.type === "cold-wave-suppression" && status.status === "active");
    const survivor = state.lingeringStatuses.find((status) => status.id === "browser-025-ongoing-survivor");
    const durationOnly = state.lingeringStatuses.find((status) => status.id === "browser-025-duration-only");
    return {
      picker: /Cold Wave|table-wide/i.test(picker), closed: result.closed, suppressionId: suppression?.id || "",
      survivorPresent: survivor?.status === "active", survivorSuppressed: controlTokenEffects.statusSuppressedByColdWave(state, survivor, controlTokenEffectOptions()),
      durationActive: controlTokenEffects.activeStatuses(state, controlTokenEffectOptions(), (status) => status.id === durationOnly.id).length === 1,
      rendered: /Suppressed by Cold Wave/.test(statusDisplayLabel(survivor))
    };
  })()`);
  assert.deepEqual({ ...resolved, suppressionId: Boolean(resolved.suppressionId) }, { picker: true, closed: true, suppressionId: true, survivorPresent: true, survivorSuppressed: true, durationActive: true, rendered: true });
  await persistBrowserState(gameId);
  await reloadProduction("browser-025-cold-wave");
  const expiredAndUndone = await evaluate(`(() => {
    backendSync.enabled = false;
    const expiring = state.lingeringStatuses.find((status) => status.id === "browser-025-ongoing-expires");
    expiring.status = "expired";
    expiring.expiredAt = "2026-08-04T18:00:00.000Z";
    controlTokenEffects.expireColdWaveAtGymEnd(state, { ...controlTokenEffectOptions(), phase: "end" });
    const survivor = state.lingeringStatuses.find((status) => status.id === "browser-025-ongoing-survivor");
    const resumed = controlTokenEffects.activeStatuses(state, controlTokenEffectOptions(), (status) => status.id === survivor.id).length;
    const revived = controlTokenEffects.activeStatuses(state, controlTokenEffectOptions(), (status) => status.id === expiring.id).length;
    state.players.find((player) => player.id === "red").coldWaveLaterNote = "preserve";
    const history = state.log.find((entry) => !entry.undone && entry.undoData?.tokenDefinitionId === "cold-wave");
    undoLogEntry(history.id);
    return {
      resumed, revived,
      suppressionCount: state.lingeringStatuses.filter((status) => status.type === "cold-wave-suppression").length,
      token: state.players.find((player) => player.id === "steevee").inventory.some((item) => item.id === "steevee-cold-wave-1"),
      laterNote: state.players.find((player) => player.id === "red").coldWaveLaterNote,
      survivorStatus: survivor.status, expiringStatus: expiring.status
    };
  })()`);
  assert.deepEqual(expiredAndUndone, { resumed: 1, revived: 0, suppressionCount: 0, token: true, laterNote: "preserve", survivorStatus: "active", expiringStatus: "expired" });
  assertNoNewBrowserErrors(errorStart);
});

test("[BROWSER-026] production Wicked Blow preserves exact references and causal undo while mixed-tier branches fail closed", async () => {
  const errorStart = browserErrors.length;
  const productionState = controlStateFixture("browser-026-wicked-blow");
  productionState.battleTeams = { "Kanto:G1": { red: { selected: ["red-garchomp"], lockedSlots: [{ id: "red-locked-1", pokemonRecordId: "red-garchomp", selectedBattleSpecies: "Garchomp", setSnapshot: { species: "Garchomp", moves: ["Earthquake"] } }] } } };
  productionState.teambuilder = { ...productionState.teambuilder, activeBuildByPlayerId: { red: "red-build-1" }, buildsByPlayerId: { red: [{ id: "red-build-1", playerId: "red", series: "Kanto", gym: 1, slots: [{ id: "red-slot-1", pokemonRecordId: "red-garchomp", selectedBattleSpecies: "Garchomp", moves: ["Earthquake"], ability: "Rough Skin" }] }] } };
  const gameId = await navigateProduction(productionState, "BROWSER-026-WICKED-BLOW");
  const result = await evaluate(`(async () => {
    backendSync.enabled = false;
    await ensurePokemonBuildDataLoaded({ renderOnLoad: false });
    const actor = state.players.find((player) => player.id === "steevee");
    state.liveRefereeSelectedEffectName = "Wicked Blow";
    state.testingTools.controlledPlayerId = actor.id;
    const picker = liveRefereeEffectUseScreenMarkup(getCurrentLivePrompt(), actor.id);
    const activity = createTokenPendingEventFromUse({ actor, actorPlayerId: actor.id, tokenName: "Wicked Blow", category: TOKEN_TIMING_CATEGORIES.CONTROL, targetPlayerId: "red", targetPokemonId: "red-garchomp", targetPokemonName: "Garchomp", targetType: EFFECT_TARGET_TYPES.POKEMON, targetScope: EFFECT_TARGET_SCOPES.ROSTER_INSTANCE });
    if (!activity) throw new Error("Wicked Blow declaration did not open.");
    const resolution = resolveCurrentInteractionPrompt(activity, { force: true, source: "browser-wicked-completion" });
    const pokemon = findPokemonRecord("red-garchomp");
    return {
      pickerExact: picker.includes("red-garchomp") || /Garchomp/.test(picker), closed: resolution.closed,
      stableId: pokemon.id, replacement: pokemon.name,
      teamSpecies: state.battleTeams["Kanto:G1"].red.lockedSlots[0].selectedBattleSpecies,
      buildSpecies: state.teambuilder.buildsByPlayerId.red[0].slots[0].selectedBattleSpecies,
      noNewMembership: !state.battleTeams["Kanto:G1"].red.selected.includes("red-garchomp-2"),
      historyCausal: state.log.some((entry) => entry.undoData?.tokenDefinitionId === "wicked-blow" && entry.undoData.actionType === "undoTokenEffectContractCausal")
    };
  })()`, 30000);
  assert.equal(result.pickerExact, true);
  assert.equal(result.closed, true);
  assert.equal(result.stableId, "red-garchomp");
  assert.notEqual(result.replacement, "Garchomp");
  assert.equal(result.teamSpecies, result.replacement);
  assert.equal(result.buildSpecies, result.replacement);
  assert.equal(result.noNewMembership, true);
  assert.equal(result.historyCausal, true);
  await persistBrowserState(gameId);
  await reloadProduction("browser-026-wicked-blow");
  const undone = await evaluate(`(() => {
    const pokemon = findPokemonRecord("red-garchomp");
    pokemon.userLaterNote = "keep-wicked-note";
    state.teambuilder.unrelatedLaterSetting = "keep";
    const history = state.log.find((entry) => !entry.undone && entry.undoData?.tokenDefinitionId === "wicked-blow");
    undoLogEntry(history.id);
    return {
      species: pokemon.name, note: pokemon.userLaterNote,
      teamSpecies: state.battleTeams["Kanto:G1"].red.lockedSlots[0].selectedBattleSpecies,
      buildSpecies: state.teambuilder.buildsByPlayerId.red[0].slots[0].selectedBattleSpecies,
      laterSetting: state.teambuilder.unrelatedLaterSetting,
      token: state.players.find((player) => player.id === "steevee").inventory.some((item) => item.id === "steevee-wicked-1")
    };
  })()`);
  assert.deepEqual(undone, { species: "Garchomp", note: "keep-wicked-note", teamSpecies: "Garchomp", buildSpecies: "Garchomp", laterSetting: "keep", token: true });
  assertNoNewBrowserErrors(errorStart);
});

test("[BROWSER-027] production Teleport returned-event History undo restores both exact Tokens without reopening terminal chains", async () => {
  const errorStart = browserErrors.length;
  const productionState = controlStateFixture("browser-027-teleport-undo");
  productionState.currentPhase = "action";
  productionState.phaseState = { "Kanto:G1": { currentPhase: "action", flowState: "action" } };
  productionState.players.find((player) => player.id === "gold").inventory.push({ id: "gold-teleport-undo-1", canonicalId: "teleport", name: "Teleport", type: "TOKEN" });
  const gameId = await navigateProduction(productionState, "BROWSER-027-TELEPORT-UNDO");
  const scheduled = await evaluate(`(() => {
    backendSync.enabled = false;
    const actor = state.players.find((player) => player.id === "steevee");
    const responder = state.players.find((player) => player.id === "gold");
    const root = createTokenPendingEventFromUse({ actor, actorPlayerId: actor.id, tokenName: "Restrict", category: TOKEN_TIMING_CATEGORIES.CONTROL, targetPlayerId: responder.id, targetPokemonId: "gold-garchomp", targetPokemonName: "Garchomp", targetText: "Garchomp", targetType: EFFECT_TARGET_TYPES.POKEMON, targetScope: EFFECT_TARGET_SCOPES.SPECIES });
    const response = recordTokenResponseToActivity(root, { actor: responder, actorPlayerId: responder.id, tokenName: "Teleport", category: TOKEN_TIMING_CATEGORIES.PROTECTION, targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT }, "protection-token");
    const result = resolveCurrentInteractionPrompt(root, { force: true, source: "browser-teleport-undo-schedule" });
    const delayed = state.delayedEffects.find((entry) => entry.sourceResponseId === response.id);
    return { closed: result.closed, delayedId: delayed.id, originalEventId: root.id };
  })()`);
  assert.equal(scheduled.closed, true);
  await persistBrowserState(gameId);
  await reloadProduction("browser-027-teleport-undo");
  const returned = await evaluate(`(() => {
    backendSync.enabled = false;
    state.gym = 2; state.currentPhase = "action"; state.phase = "action";
    state.phaseState["Kanto:G2"] = { currentPhase: "action", flowState: "action" };
    const opened = processDueTeleportDelayedEffects();
    const delayed = state.delayedEffects.find((entry) => entry.id === ${JSON.stringify(scheduled.delayedId)});
    return { opened: opened.opened, eventId: delayed.returnInteractionEventId };
  })()`);
  assert.equal(returned.opened, 1);
  await persistBrowserState(gameId);
  await reloadProduction("browser-027-teleport-undo");
  const terminal = await evaluate(`(() => {
    backendSync.enabled = false;
    const event = state.interactionEvents.find((entry) => entry.id === ${JSON.stringify(returned.eventId)});
    const result = resolveCurrentInteractionPrompt(event, { force: true, source: "browser-teleport-undo-return" });
    const history = state.log.find((entry) => !entry.undone && entry.linkedEventId === event.id && entry.undoData?.actionType === "undoTokenEffectContractCausal");
    const originalHistory = state.log.find((entry) => entry.linkedEventId === ${JSON.stringify(scheduled.originalEventId)} && entry.undoData?.actionType === "undoTokenEffectContractCausal");
    return { closed: result.closed, eventStatus: event.status, historyId: history?.id || "", originalUndoable: originalHistory?.undoable !== false };
  })()`);
  assert.deepEqual({ ...terminal, historyId: Boolean(terminal.historyId) }, { closed: true, eventStatus: "resolved", historyId: true, originalUndoable: false });
  await persistBrowserState(gameId);
  await reloadProduction("browser-027-teleport-undo");
  const undone = await evaluate(`(() => {
    const event = state.interactionEvents.find((entry) => entry.id === ${JSON.stringify(returned.eventId)});
    findPokemonRecord("gold-garchomp").teleportLaterNote = "preserve";
    const history = state.log.find((entry) => !entry.undone && entry.linkedEventId === event.id && entry.undoData?.actionType === "undoTokenEffectContractCausal");
    undoLogEntry(history.id);
    return {
      restrictTokens: state.players.find((player) => player.id === "steevee").inventory.filter((item) => item.name === "Restrict").length,
      teleport: state.players.find((player) => player.id === "gold").inventory.some((item) => item.id === "gold-teleport-undo-1"),
      delayed: state.delayedEffects.filter((entry) => entry.id === ${JSON.stringify(scheduled.delayedId)}).length,
      restriction: state.lingeringStatuses.filter((status) => status.type === "restrict" && status.status === "active").length,
      terminal: event.status, laterNote: findPokemonRecord("gold-garchomp").teleportLaterNote
    };
  })()`);
  assert.deepEqual(undone, { restrictTokens: 3, teleport: true, delayed: 0, restriction: 0, terminal: "resolved", laterNote: "preserve" });
  assertNoNewBrowserErrors(errorStart);
});

test("[BROWSER-028] production Reroll supersedes one exact encounter result through refresh and causal undo", async () => {
  const errorStart = browserErrors.length;
  const productionState = controlStateFixture("browser-028-reroll");
  productionState.players.find((player) => player.id === "gold").inventory.push(
    { id: "gold-reroll-browser-1", canonicalId: "reroll-token", name: "Reroll", type: "TOKEN" },
    { id: "gold-reroll-browser-2", canonicalId: "reroll-token", name: "Reroll", type: "TOKEN" }
  );
  productionState.encounterSessions = [{ id: "browser-028-encounter", status: "review", playerId: "gold", series: "Kanto", gym: 1, rolls: [], removedEntryIds: [] }];
  productionState.randomPokemonSessions = [{ id: "browser-028-result", sourceType: "encounter", sourceLabel: "Encounter Wheel", status: "pending", rerollable: true, interactionLocked: false, playerId: "gold", ownerPlayerId: "gold", resultOwnerPlayerId: "gold", encounterSessionId: "browser-028-encounter", series: "Kanto", gym: 1, tierId: "C", resultPokemonName: "abra", resultDisplayName: "Abra", resultMetadata: { key: "abra", displayName: "Abra" }, rerollHistory: [], resultHistory: [] }];
  const gameId = await navigateProduction(productionState, "BROWSER-028-REROLL");
  const rerolled = await evaluate(`(async () => {
    backendSync.enabled = false;
    state.testingTools.controlledPlayerId = "gold";
    fetchStablePokemonSprite = async (name, existingSpriteKey = "") => ({ spriteKey: existingSpriteKey || getPokemonSpriteLookupKey(name), spriteUrl: "" });
    openRerollTargetModal("gold");
    const picker = els.rerollTargetList?.innerHTML || "";
    const operation = await rerollRandomPokemonSession("browser-028-result", { actorPlayerId: "gold", sourceEffectId: "browser-028-reroll-operation" });
    const result = state.randomPokemonSessions.find((entry) => entry.id === "browser-028-result");
    const beforeRetry = JSON.stringify({ result: result.resultDisplayName, inventory: state.players.find((player) => player.id === "gold").inventory, operations: state.effectOperations });
    await rerollRandomPokemonSession("browser-028-result", { actorPlayerId: "gold", sourceEffectId: "browser-028-reroll-operation" });
    return {
      picker: picker.includes("browser-028-result") || picker.includes("Abra"), replacement: result.resultDisplayName,
      oldStatus: result.resultHistory[0]?.status || "", supersedes: Boolean(result.supersedesResultRevisionId),
      inventory: state.players.find((player) => player.id === "gold").inventory.filter((item) => item.canonicalId === "reroll-token").length,
      consumption: state.tokenConsumptions.filter((entry) => entry.source === "encounter-reroll").length,
      operationId: operation?.id || "", retryStable: beforeRetry === JSON.stringify({ result: result.resultDisplayName, inventory: state.players.find((player) => player.id === "gold").inventory, operations: state.effectOperations })
    };
  })()`, 30000);
  assert.equal(rerolled.picker, true);
  assert.notEqual(rerolled.replacement, "Abra");
  assert.equal(rerolled.oldStatus, "superseded");
  assert.equal(rerolled.supersedes, true);
  assert.equal(rerolled.inventory, 1);
  assert.equal(rerolled.consumption, 1);
  assert.ok(rerolled.operationId);
  assert.equal(rerolled.retryStable, true);
  await persistBrowserState(gameId);
  await reloadProduction("browser-028-reroll");
  const undone = await evaluate(`(() => {
    const result = state.randomPokemonSessions.find((entry) => entry.id === "browser-028-result");
    result.userLaterNote = "keep-result-note";
    const history = state.log.find((entry) => !entry.undone && entry.undoData?.tokenDefinitionId === "reroll-token");
    undoLogEntry(history.id);
    return {
      result: result.resultDisplayName, history: result.rerollHistory.length, note: result.userLaterNote,
      inventory: state.players.find((player) => player.id === "gold").inventory.filter((item) => item.canonicalId === "reroll-token").length,
      operations: state.effectOperations.filter((entry) => entry.sourceEffectId === "browser-028-reroll-operation").length
    };
  })()`);
  assert.deepEqual(undone, { result: "Abra", history: 0, note: "keep-result-note", inventory: 2, operations: 0 });
  assertNoNewBrowserErrors(errorStart);
});

test("[BROWSER-029] production Honey exact-result selection reaches acquisition and causal undo", async () => {
  const errorStart = browserErrors.length;
  const productionState = controlStateFixture("browser-029-honey");
  productionState.players.find((player) => player.id === "gold").inventory.push({ id: "gold-honey-browser-1", canonicalId: "honey-token", name: "Honey", type: "TOKEN" });
  productionState.randomPokemonSessions = [
    { id: "browser-029-source-a", sourceType: "encounter", sourceLabel: "Encounter Wheel", status: "confirmed", series: "Kanto", gym: 1, ownerPlayerId: "red", resultOwnerPlayerId: "red", resultDisplayName: "Garchomp", tierId: "S", tier: "S", level: 54, resultMetadata: { speciesId: "garchomp", speciesName: "Garchomp", form: "Standard", intrinsicRolledProperties: { shiny: true } } },
    { id: "browser-029-source-b", sourceType: "encounter", sourceLabel: "Encounter Wheel", status: "confirmed", series: "Kanto", gym: 1, ownerPlayerId: "steevee", resultOwnerPlayerId: "steevee", resultDisplayName: "Lucario", tierId: "A", tier: "A", level: 52, resultMetadata: { speciesId: "lucario", speciesName: "Lucario", form: "Standard" } }
  ];
  const gameId = await navigateProduction(productionState, "BROWSER-029-HONEY");
  const offered = await evaluate(`(() => {
    backendSync.enabled = false;
    const created = ensureHoneyEndOfActionProcedures();
    const pair = created.find((entry) => entry.procedure.sourcePlayerId === "gold");
    const markup = liveRefereeHoneyProcedureScreenMarkup(getCurrentLivePrompt(), pair.activity);
    return { activityId: pair.activity.id, procedureId: pair.procedure.id, choices: pair.procedure.eligibleRandomPokemonSessionIds.length, markup: markup.includes("Garchomp") && markup.includes("Lucario"), responseTypes: pair.activity.responseTypes.length };
  })()`);
  assert.deepEqual({ ...offered, activityId: Boolean(offered.activityId), procedureId: Boolean(offered.procedureId) }, { activityId: true, procedureId: true, choices: 2, markup: true, responseTypes: 0 });
  await persistBrowserState(gameId);
  await reloadProduction("browser-029-honey");
  const copied = await evaluate(`(() => {
    backendSync.enabled = false;
    const sourceBefore = structuredClone(state.randomPokemonSessions.find((entry) => entry.id === "browser-029-source-a"));
    const ok = resolveHoneyEndOfActionProcedure(${JSON.stringify(offered.activityId)}, "browser-029-source-a");
    const procedure = state.endOfActionProcedures.find((entry) => entry.id === ${JSON.stringify(offered.procedureId)});
    const copy = state.randomPokemonSessions.find((entry) => entry.id === procedure.copiedRandomPokemonSessionId);
    return {
      ok, copyId: copy?.id || "", fresh: copy?.id !== sourceBefore.id, species: copy?.resultDisplayName,
      form: copy?.resultMetadata?.form, tier: copy?.tierId, level: copy?.level, pending: copy?.status,
      selected: state.selectedRandomPokemonSessionId === copy?.id, sourceUnchanged: JSON.stringify(sourceBefore) === JSON.stringify(state.randomPokemonSessions.find((entry) => entry.id === sourceBefore.id)),
      tokenCount: state.players.find((player) => player.id === "gold").inventory.filter((item) => item.id === "gold-honey-browser-1").length
    };
  })()`);
  assert.deepEqual({ ...copied, copyId: Boolean(copied.copyId) }, { ok: true, copyId: true, fresh: true, species: "Garchomp", form: "Standard", tier: "S", level: 54, pending: "pending", selected: true, sourceUnchanged: true, tokenCount: 0 });
  await persistBrowserState(gameId);
  await reloadProduction("browser-029-honey");
  const acquired = await evaluate(`(async () => {
    backendSync.enabled = false;
    globalThis.confirm = () => true;
    fetchStablePokemonSprite = async (name, existingSpriteKey = "") => ({ spriteKey: existingSpriteKey || getPokemonSpriteLookupKey(name), spriteUrl: "" });
    await confirmRandomPokemonSession(${JSON.stringify(copied.copyId)}, { skipPendingGuard: true });
    const copy = state.randomPokemonSessions.find((entry) => entry.id === ${JSON.stringify(copied.copyId)});
    return { status: copy.status, pokemonId: copy.rosterPokemonId || "", rosterExists: Boolean(findPokemonRecord(copy.rosterPokemonId)) };
  })()`, 30000);
  assert.deepEqual({ ...acquired, pokemonId: Boolean(acquired.pokemonId) }, { status: "confirmed", pokemonId: true, rosterExists: true });
  await persistBrowserState(gameId);
  await reloadProduction("browser-029-honey");
  const undone = await evaluate(`(() => {
    state.players.find((player) => player.id === "red").honeyLaterNote = "keep";
    const history = state.log.find((entry) => !entry.undone && entry.undoData?.tokenDefinitionId === "honey-token");
    undoLogEntry(history.id);
    return {
      copy: state.randomPokemonSessions.some((entry) => entry.id === ${JSON.stringify(copied.copyId)}),
      acquired: Boolean(findPokemonRecord(${JSON.stringify(acquired.pokemonId)})),
      sourceA: state.randomPokemonSessions.find((entry) => entry.id === "browser-029-source-a")?.status,
      sourceB: state.randomPokemonSessions.find((entry) => entry.id === "browser-029-source-b")?.status,
      token: state.players.find((player) => player.id === "gold").inventory.some((item) => item.id === "gold-honey-browser-1"),
      procedure: state.endOfActionProcedures.find((entry) => entry.id === ${JSON.stringify(offered.procedureId)})?.status,
      laterNote: state.players.find((player) => player.id === "red").honeyLaterNote
    };
  })()`);
  assert.deepEqual(undone, { copy: false, acquired: false, sourceA: "confirmed", sourceB: "confirmed", token: true, procedure: "undone", laterNote: "keep" });
  assertNoNewBrowserErrors(errorStart);
});

test("[BROWSER-030] production Purge uses the immutable brought snapshot through payout and causal undo", async () => {
  const errorStart = browserErrors.length;
  const productionState = controlStateFixture("browser-030-purge");
  productionState.players.find((player) => player.id === "steevee").inventory.push({ id: "steevee-purge-browser-1", canonicalId: "purge-curse", name: "Purge Curse", type: "TOKEN" });
  const gameId = await navigateProduction(productionState, "BROWSER-030-PURGE");
  const declared = await evaluate(`(() => {
    backendSync.enabled = false;
    const actor = state.players.find((player) => player.id === "steevee");
    const activity = createTokenPendingEventFromUse({ actor, actorPlayerId: actor.id, tokenName: "Purge Curse", category: TOKEN_TIMING_CATEGORIES.CURSE, targetPlayerId: "red", targetPlayerName: "Red", targetType: EFFECT_TARGET_TYPES.PLAYER, targetScope: EFFECT_TARGET_SCOPES.SINGLE_PLAYER });
    if (!activity) throw new Error("Purge declaration did not open.");
    const result = resolveCurrentInteractionPrompt(activity, { force: true, source: "browser-purge-declare" });
    const marker = state.lingeringStatuses.find((status) => status.type === "curse-purge" && status.status === "active");
    return { closed: result.closed, eventId: activity.id, markerId: marker?.id || "", responses: activity.responseTypes.length, eligible: activity.eligiblePlayerIds.length, tradeWindow: Boolean(activity.payload?.tradeWindow) };
  })()`);
  assert.deepEqual({ ...declared, eventId: Boolean(declared.eventId), markerId: Boolean(declared.markerId) }, { closed: true, eventId: true, markerId: true, responses: 0, eligible: 0, tradeWindow: false });
  await persistBrowserState(gameId);
  await reloadProduction("browser-030-purge");
  const finalized = await evaluate(`(() => {
    backendSync.enabled = false;
    state.pokemonRecords.push({ id: "red-later-purge", trainerId: "red", name: "Garchomp", currentSpecies: "Garchomp", rosterType: "Active", status: "Active", moves: ["Tackle"], buffs: [], nerfs: [], effectBuffs: [] });
    state.currentPhase = "battle-results"; state.phase = "battle-results";
    state.phaseState = { "Kanto:G1": { currentPhase: "battle-results", flowState: "battle-results" } };
    state.battleRecords = [
      { id: "purge-gold-red", series: "Kanto", gym: 1, player1Id: "gold", player2Id: "red", winnerId: "gold", player1Differential: 1, player2Differential: -1, player1Pokemon: [{ pokemonId: "gold-garchomp", pokemonName: "Garchomp", kos: 1, deaths: 0 }], player2Pokemon: [{ pokemonId: "red-garchomp", pokemonName: "Garchomp", kos: 0, deaths: 1 }, { pokemonId: "red-lucario", pokemonName: "Lucario", kos: 0, deaths: 1 }] },
      { id: "purge-gold-steevee", series: "Kanto", gym: 1, player1Id: "gold", player2Id: "steevee", winnerId: "gold", player1Differential: 1, player2Differential: -1, player1Pokemon: [{ pokemonId: "gold-lucario", pokemonName: "Lucario", kos: 1, deaths: 0 }], player2Pokemon: [{ pokemonId: "steevee-alakazam", pokemonName: "Alakazam", kos: 0, deaths: 1 }] },
      { id: "purge-red-steevee", series: "Kanto", gym: 1, player1Id: "red", player2Id: "steevee", winnerId: "red", player1Differential: 1, player2Differential: -1, player1Pokemon: [{ pokemonId: "red-garchomp", pokemonName: "Garchomp", kos: 1, deaths: 0 }], player2Pokemon: [{ pokemonId: "steevee-alakazam", pokemonName: "Alakazam", kos: 0, deaths: 1 }] }
    ];
    globalThis.confirm = () => true;
    finalizeGymResults({ skipPendingGuard: true });
    const snapshot = state.broughtTeamSnapshots.find((entry) => entry.source === "finalizedGymPayout");
    const rootHistory = state.log.find((entry) => !entry.undone && entry.linkedEventId === ${JSON.stringify(declared.eventId)} && entry.undoData?.tokenDefinitionId === "purge-curse");
    return {
      snapshotId: snapshot?.id || "", redSnapshot: controlTokenEffects.broughtSnapshotPlayer(snapshot, "red")?.pokemon.map((entry) => entry.rosterInstanceId).sort() || [],
      garchomp: findPokemonRecord("red-garchomp")?.status, lucario: findPokemonRecord("red-lucario")?.status,
      duplicateSpecies: findPokemonRecord("red-garchomp-2")?.status, later: findPokemonRecord("red-later-purge")?.status,
      operationCount: state.effectOperations.filter((entry) => entry.operationType === "purgePostPayout").length,
      causal: rootHistory?.undoData?.actionType === "undoTokenEffectContractCausal" && rootHistory?.purgePostPayoutCompleted === true,
      openRequired: state.interactionEvents.filter((entry) => entry.status === "open" && entry.payload?.requiresRequiredChoice).length
    };
  })()`);
  assert.deepEqual({ ...finalized, snapshotId: Boolean(finalized.snapshotId) }, { snapshotId: true, redSnapshot: ["red-garchomp", "red-lucario"], garchomp: "Released", lucario: "Released", duplicateSpecies: "Active", later: "Active", operationCount: 1, causal: true, openRequired: 0 });
  await persistBrowserState(gameId);
  await reloadProduction("browser-030-purge");
  const undone = await evaluate(`(() => {
    findPokemonRecord("red-later-purge").userLaterNote = "keep-purge-later";
    const history = state.log.find((entry) => !entry.undone && entry.linkedEventId === ${JSON.stringify(declared.eventId)} && entry.undoData?.tokenDefinitionId === "purge-curse");
    undoLogEntry(history.id);
    return {
      garchomp: findPokemonRecord("red-garchomp")?.status, lucario: findPokemonRecord("red-lucario")?.status,
      duplicateSpecies: findPokemonRecord("red-garchomp-2")?.status, later: findPokemonRecord("red-later-purge")?.status,
      laterNote: findPokemonRecord("red-later-purge")?.userLaterNote,
      token: state.players.find((player) => player.id === "steevee").inventory.some((item) => item.id === "steevee-purge-browser-1"),
      marker: state.lingeringStatuses.filter((status) => status.type === "curse-purge").length,
      operation: state.effectOperations.filter((entry) => entry.operationType === "purgePostPayout").length
    };
  })()`);
  assert.deepEqual(undone, { garchomp: "Active", lucario: "Active", duplicateSpecies: "Active", later: "Active", laterNote: "keep-purge-later", token: true, marker: 0, operation: 0 });
  assertNoNewBrowserErrors(errorStart);
});
