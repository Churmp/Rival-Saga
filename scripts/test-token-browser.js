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
  const loaded = cdp.once("Page.loadEventFired", 30000);
  await cdp.send("Page.navigate", {
    url: `${server.baseUrl}/?view=game&game=${encodeURIComponent(gameId)}`
  }, 30000);
  await loaded;
  await waitUntil(`(() => { try {
    return typeof liveRefereeWickedBlowTargetScreenMarkup === "function"
      && typeof state === "object"
      && state?.marker === ${JSON.stringify(state.marker)};
  } catch { return false; } })()`, 30000);
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
      { id: "electric-field-token", name: "Electric Field Token", type: "TOKEN", tokenType: "field" },
      { id: "grassy-field-token", name: "Grassy Field Token", type: "TOKEN", tokenType: "field" },
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
    actor.inventory = actor.inventory.filter((item) => ["Protection Token", "Electric Field Token", "Grassy Field Token"].includes(item.name));
    const empty = liveRefereeAvailableTokenGroups(prompt, actor.id);
    const emptyMarkup = liveRefereeTokenListScreenMarkup(prompt, actor.id);
    return {
      fullInventoryNames,
      legal: available.groups.map((group) => ({ name: group.name, count: group.count })),
      canonicalGroups: liveRefereeTokenInventoryGroups({ inventory: [
        { id: "category-protection", name: "Protection Token", type: "TOKEN" },
        { id: "electric-field-token", name: "Electric Field Token", type: "TOKEN" },
        { id: "grassy-field-token", name: "Grassy Field Token", type: "TOKEN" }
      ] }).length,
      hasCurseHeading: markup.includes("<h3>Curse Token</h3>"),
      categoryIsSelectable: /<h3[^>]*data-live-referee-effect-pick/.test(markup),
      hasPlaceholder: /Protection Token x|Electric Field|Grassy Field/.test(markup),
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
    const effectLog = state.log.find((entry) => !entry.undone && entry.undoData?.actionType === "undoTokenEffectContract");
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
    const effectLog = state.log.find((entry) => !entry.undone && entry.undoData?.actionType === "undoTokenEffectContract");
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
  const gameId = await navigateProduction(productionState, "BROWSER-012-REVENGE");

  const offered = await evaluate(`(() => {
    backendSync.enabled = false;
    state.broughtTeamSnapshots ||= [];
    const snapshot = controlTokenEffects.createImmutableBroughtSnapshot(state, {
      id: "browser-012-snapshot",
      series: "Kanto",
      gym: 1,
      broughtByPlayer: {
        gold: ["gold-garchomp"],
        red: ["red-garchomp", "red-lucario"]
      }
    }, controlTokenEffectOptions());
    state.lingeringStatuses.push({
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
    const created = createRevengePostPayoutProcedures(snapshot);
    state.liveRefereeCollapsed = false;
    render();
    return {
      procedureId: created[0]?.procedure?.id || "",
      eventId: created[0]?.event?.id || "",
      status: created[0]?.procedure?.status || "",
      hasForm: Boolean(document.querySelector("[data-revenge-procedure-form]")),
      tokenCount: state.players.find((player) => player.id === "gold").inventory.filter((item) => item.id === "gold-revenge-1").length
    };
  })()`);
  assert.ok(offered.procedureId);
  assert.ok(offered.eventId);
  assert.equal(offered.status, "awaitingChoice");
  assert.equal(offered.hasForm, true);
  assert.equal(offered.tokenCount, 1);
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
