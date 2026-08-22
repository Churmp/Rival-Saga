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
  if (!executable) throw new Error("No supported Chromium browser was found for V2 Route runtime QA.");
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
      const timeout = setTimeout(() => reject(new Error("Timed out opening Chromium debugging socket.")), 10000);
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
  }

  send(method, params = {}, timeoutMs = 10000) {
    const id = ++this.sequence;
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`Timed out waiting for Chromium command ${method}.`));
      }, timeoutMs);
      this.pending.set(id, {
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
      const timeout = setTimeout(() => reject(new Error(`Timed out waiting for CDP event ${method}.`)), timeoutMs);
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
    this.socket.close();
    await delay(50);
  }
}

async function evaluate(expression, timeoutMs = 30000) {
  const result = await cdp.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true
  }, timeoutMs);
  if (result.exceptionDetails) {
    const message = result.exceptionDetails.exception?.description || result.exceptionDetails.text || "Browser evaluation failed.";
    console.error(message);
    console.error(String(expression).replace(/\s+/g, " ").slice(0, 500));
    throw new Error(message);
  }
  return result.result?.value;
}

async function waitUntil(expression, timeoutMs = 30000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    if (await evaluate(expression, timeoutMs)) return;
    await delay(50);
  }
  throw new Error(`Timed out waiting for browser condition: ${expression}`);
}

function routeFixture(marker) {
  const state = controlStateFixture(marker);
  state.series = "Kanto";
  state.gym = 3;
  state.phase = "action";
  state.activePage = "actionPhase";
  state.activePlayerId = "gold";
  state.ruleset = {
    actionPhaseVersion: "action-phase-v2-real-series",
    supportedActionPhaseVersions: ["action-phase-v1-current-series", "action-phase-v2-real-series"]
  };
  state.players.forEach((player) => {
    player.balance = 10000;
    player.pokemonIds = state.pokemonRecords.filter((pokemon) => pokemon.trainerId === player.id).map((pokemon) => pokemon.id);
  });
  state.players[0].inventory.unshift(
    { id: "gold-route-extra-1", name: "Extra Encounter Token", type: "TOKEN", canonicalId: "extra-encounter-token" },
    { id: "gold-route-reroll-1", name: "Reroll Token", type: "TOKEN", canonicalId: "reroll-token" },
    { id: "gold-route-repel-1", name: "Repel Token", type: "TOKEN", canonicalId: "repel-token" },
    { id: "gold-route-master-1", name: "Master Ball Token", type: "TOKEN", canonicalId: "master-ball-token" }
  );
  state.players[1].inventory.unshift(
    { id: "red-route-reroll-1", name: "Reroll Token", type: "TOKEN", canonicalId: "reroll-token" },
    { id: "red-route-master-1", name: "Master Ball Token", type: "TOKEN", canonicalId: "master-ball-token" }
  );
  state.v2 = {};
  return state;
}

async function openRouteGame(marker) {
  const gameId = `v2-route-${marker.toLowerCase()}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const created = await fetch(`${server.baseUrl}/api/games`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ id: gameId, name: `V2 Route ${marker}` })
  });
  const payload = await created.json();
  if (!created.ok) throw new Error(`Could not create V2 Route test game: ${created.status}`);
  await saveGame(server.baseUrl, gameId, routeFixture(marker), Number(payload.game?.version || 0));
  await flushAndQuietCurrentPage();
  const loaded = cdp.once("Page.loadEventFired", 60000);
  await cdp.send("Page.navigate", { url: `${server.baseUrl}/?view=game&game=${encodeURIComponent(gameId)}&page=actionPhase` }, 60000);
  await loaded;
  await waitUntil(`typeof v2EnsureRouteSeriesState === "function" && state?.marker === ${JSON.stringify(marker)}`, 60000);
  return gameId;
}

async function flushAndQuietCurrentPage() {
  const clean = await evaluate(`(async () => {
    if (typeof saveState === "function") await saveState({ immediate: true, immediateBackend: true });
    if (typeof storedStateSaveTimer !== "undefined" && storedStateSaveTimer) clearTimeout(storedStateSaveTimer);
    if (typeof clientUiStateSaveTimer !== "undefined" && clientUiStateSaveTimer) clearTimeout(clientUiStateSaveTimer);
    if (typeof storedStateSaveTimer !== "undefined") storedStateSaveTimer = null;
    if (typeof clientUiStateSaveTimer !== "undefined") clientUiStateSaveTimer = null;
    if (typeof storedStateSaveQueued !== "undefined") storedStateSaveQueued = false;
    if (typeof clientUiStateSaveQueued !== "undefined") clientUiStateSaveQueued = false;
    if (typeof backendSync === "object") {
      if (backendSync.saveTimer) clearTimeout(backendSync.saveTimer);
      backendSync.saveTimer = null;
      backendSync.stateSaveInFlight = null;
      backendSync.stateSaveAbortController = null;
      backendSync.saveStatus = "saved";
      backendSync.saveError = "";
      backendSync.savePersistedRevision = backendSync.saveRequestedRevision;
    }
    return {
      href: location.href,
      backendDirty: typeof backendStateSaveIsDirty === "function" ? backendStateSaveIsDirty() : false
    };
  })()`, 60000);
  assert.equal(clean.backendDirty, false, "backend save state should be clean before reload");
  return clean;
}

async function persistAndReload(gameId, marker) {
  const clean = await flushAndQuietCurrentPage();
  const loaded = cdp.once("Page.loadEventFired", 60000);
  await cdp.send("Page.navigate", { url: clean.href }, 60000);
  await loaded;
  await waitUntil(`typeof v2EnsureRouteSeriesState === "function" && state?.marker === ${JSON.stringify(marker)}`, 60000);
}

before(async () => {
  server = await startTemporaryServer("v2-route-runtime");
  const debuggingPort = await availablePort();
  browserProfile = fs.mkdtempSync(path.join(os.tmpdir(), "rival-saga-v2-route-profile-"));
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
  ], { stdio: ["ignore", "ignore", "ignore"] });
  await waitForJson(`http://127.0.0.1:${debuggingPort}/json/version`);
  const targets = await waitForJson(`http://127.0.0.1:${debuggingPort}/json/list`);
  const page = targets.find((target) => target.type === "page");
  cdp = new CdpClient(page.webSocketDebuggerUrl);
  await cdp.open();
  await Promise.all([
    cdp.send("Page.enable"),
    cdp.send("Runtime.enable")
  ]);
});

after(async () => {
  if (cdp) await cdp.close().catch(() => {});
  if (browserProcess && !browserProcess.killed) browserProcess.kill();
  if (browserProcess) {
    await Promise.race([
      new Promise((resolve) => browserProcess.once("exit", resolve)),
      delay(1000)
    ]);
  }
  if (browserProfile && fs.existsSync(browserProfile)) fs.rmSync(browserProfile, { recursive: true, force: true });
  await stopTemporaryServer(server);
});

test("V2 normal Route Action persists and remains exactly once through reload", async () => {
  const marker = "V2-NORMAL";
  const gameId = await openRouteGame(marker);
  const before = await evaluate(`(() => {
    state.activePlayerId = "gold";
    const actionPhase = v2EnsureActionPhase(state.series);
    const routeState = v2EnsureRouteSeriesState(state.series);
    const routeBefore = v2FindRoute(routeState, 1);
    const previewBefore = v2RoutePublicPreview(routeBefore);
    const premiumBefore = routeBefore.residents.filter((resident) => resident.premium);
    const committed = v2CommitRouteAction("gold", 1);
    const drawn = v2DrawRouteActionEncounter(committed.action.actionId, { actingPlayerId: "gold" });
    const pokemon = v2FinalizeRouteActionAcquisition(committed.action.actionId, { actingPlayerId: "gold" });
    const drawnAgain = v2DrawRouteActionEncounter(committed.action.actionId, { actingPlayerId: "gold" });
    const pokemonAgain = v2FinalizeRouteActionAcquisition(committed.action.actionId, { actingPlayerId: "gold" });
    const route = v2FindRoute(routeState, 1);
    return {
      actionId: committed.action.actionId,
      resultId: drawn.resultId,
      pokemonId: pokemon.id,
      drawnAgain: drawnAgain.resultId,
      pokemonAgain: pokemonAgain.id,
      spends: actionPhase.spends.length,
      actions: actionPhase.actions.length,
      premiumCount: premiumBefore.length,
      premiumIds: premiumBefore.map((resident) => resident.residentId),
      premiumTierIds: premiumBefore.map((resident) => resident.battleTier.id),
      premiumWeights: premiumBefore.map((resident) => resident.encounterWeight),
      previewPremiumSlots: previewBefore.premiumSlotCount,
      previewPremiumKnownBeforeDraw: previewBefore.premiumSlots.filter((slot) => slot.known).length,
      opportunities: route.pendingEncounterOpportunities.length,
      results: route.encounterResults.length,
      acquisitions: route.finalizedAcquisitions.length,
      pokemonRecords: state.pokemonRecords.filter((entry) => entry.routeEncounterMetadata?.resultId === drawn.resultId).length,
      goldPokemonIds: state.players.find((player) => player.id === "gold").pokemonIds.filter((id) => id === pokemon.id).length
    };
  })()`);
  assert.equal(before.drawnAgain, before.resultId);
  assert.equal(before.pokemonAgain, before.pokemonId);
  assert.equal(before.spends, 1);
  assert.equal(before.actions, 1);
  assert.equal(before.premiumCount, 2);
  assert.equal(before.previewPremiumSlots, 2);
  assert.equal(before.previewPremiumKnownBeforeDraw, 0);
  assert.equal(before.premiumTierIds.every((tierId) => ["ultra-elite", "master", "master-elite"].includes(tierId)), true);
  assert.equal(before.premiumWeights.every((weight) => weight === 0.15), true);
  assert.equal(before.opportunities, 1);
  assert.equal(before.results, 1);
  assert.equal(before.acquisitions, 1);
  assert.equal(before.pokemonRecords, 1);
  assert.equal(before.goldPokemonIds, 1);
  await persistAndReload(gameId, marker);
  const afterReload = await evaluate(`(() => {
    const route = v2FindRoute(v2EnsureRouteSeriesState(state.series), 1);
    const actionPhase = v2EnsureActionPhase(state.series);
    return {
      spends: actionPhase.spends.length,
      actions: actionPhase.actions.length,
      premiumIds: route.premiumResidentIds,
      premiumCount: route.residents.filter((resident) => resident.premium).length,
      results: route.encounterResults.length,
      acquisitions: route.finalizedAcquisitions.length,
      pokemonRecords: state.pokemonRecords.filter((entry) => entry.routeEncounterMetadata?.resultId === ${JSON.stringify(before.resultId)}).length
    };
  })()`);
  assert.deepEqual(afterReload, { spends: 1, actions: 1, premiumIds: before.premiumIds, premiumCount: 2, results: 1, acquisitions: 1, pokemonRecords: 1 });
});

test("remote authoritative Route reload preserves client-local V2 Route workspace", async () => {
  const marker = "V2-LOCAL-ROUTE";
  const gameId = await openRouteGame(marker);
  const localBefore = await evaluate(`(() => {
    state.activePage = "actionPhase";
    state.activePlayerId = "gold";
    const routeState = v2EnsureRouteSeriesState(state.series);
    state.routeUiState = normalizeRouteUiState({
      routeWorkspaceBySeriesId: {
        [state.series]: {
          screen: "result",
          selectedActionId: "encounter",
          selectedRouteNumber: 7,
          activeActionId: "client-local-action",
          activeOpportunityId: "client-local-opportunity"
        }
      },
      activeRouteActionIdBySeriesId: { [state.series]: "client-local-action" },
      lastRouteAcquisitionMessage: "Client-local acquisition note"
    });
    render();
    const route = v2FindRoute(routeState, 1);
    return {
      series: state.series,
      routeState,
      revealResidentId: route.residents[0].residentId,
      workspace: structuredClone(state.routeUiState.routeWorkspaceBySeriesId[state.series]),
      activePage: state.activePage,
      message: state.routeUiState.lastRouteAcquisitionMessage,
      boardClass: document.querySelector("#actionLocationBoard")?.className || ""
    };
  })()`);
  assert.equal(localBefore.workspace.screen, "result");
  assert.equal(localBefore.workspace.selectedRouteNumber, 7);
  assert.match(localBefore.boardClass, /v2-route-reveal-stage/);

  const authoritative = await loadGame(server.baseUrl, gameId);
  const remoteState = structuredClone(authoritative.state);
  remoteState.v2 ||= {};
  remoteState.v2.routeEncounterBySeriesId ||= {};
  const remoteRouteState = structuredClone(localBefore.routeState);
  const routeOne = remoteRouteState.routes.find((route) => route.routeNumber === 1);
  routeOne.publicDiscoveryResidentIds = [localBefore.revealResidentId];
  remoteRouteState.revision = Number(remoteRouteState.revision || 0) + 1;
  remoteState.v2.routeEncounterBySeriesId[localBefore.series] = remoteRouteState;
  remoteState.v2.routeWorkspaceBySeriesId = {
    [localBefore.series]: {
      screen: "route-list",
      selectedActionId: "encounter",
      selectedRouteNumber: 1,
      activeActionId: "remote-leak-attempt",
      activeOpportunityId: ""
    }
  };
  remoteState.v2.activeRouteActionIdBySeriesId = { [localBefore.series]: "remote-leak-attempt" };
  remoteState.v2.lastRouteAcquisitionMessage = "Remote leak attempt";
  await saveGame(server.baseUrl, gameId, remoteState, authoritative.version, { clientId: "remote-route-client" });

  const afterRemoteReload = await evaluate(`(async () => {
    await loadBackendState({ renderAfter: true });
    const route = v2FindRoute(v2EnsureRouteSeriesState(state.series), 1);
    const preview = v2RoutePublicPreview(route);
    return {
      workspace: structuredClone(state.routeUiState.routeWorkspaceBySeriesId[state.series]),
      activeRouteActionId: state.routeUiState.activeRouteActionIdBySeriesId[state.series],
      activePage: state.activePage,
      message: state.routeUiState.lastRouteAcquisitionMessage,
      boardClass: document.querySelector("#actionLocationBoard")?.className || "",
      discoveries: preview.discoveries,
      leakedWorkspace: Boolean(state.v2.routeWorkspaceBySeriesId),
      leakedActiveAction: Boolean(state.v2.activeRouteActionIdBySeriesId),
      leakedMessage: Boolean(state.v2.lastRouteAcquisitionMessage)
    };
  })()`, 60000);

  assert.equal(afterRemoteReload.activePage, "actionPhase");
  assert.equal(afterRemoteReload.workspace.screen, "result");
  assert.equal(afterRemoteReload.workspace.selectedRouteNumber, 7);
  assert.equal(afterRemoteReload.workspace.activeActionId, "client-local-action");
  assert.equal(afterRemoteReload.activeRouteActionId, "client-local-action");
  assert.equal(afterRemoteReload.message, "Client-local acquisition note");
  assert.match(afterRemoteReload.boardClass, /v2-route-reveal-stage/);
  assert.equal(afterRemoteReload.discoveries.length, 1, "authoritative public Route discovery should still update");
  assert.equal(afterRemoteReload.leakedWorkspace, false);
  assert.equal(afterRemoteReload.leakedActiveAction, false);
  assert.equal(afterRemoteReload.leakedMessage, false);
});

test("transient Route public activity is local-only, deduped, failure-tolerant, and can notify obtained Pokemon", async () => {
  const marker = "V2-ROUTE-ACTIVITY";
  const gameId = await openRouteGame(marker);
  const duplicateSummary = await evaluate(`(() => {
    state.routeUiState = normalizeRouteUiState({ publicActivityToasts: [] });
    const now = Date.now();
    const fresh = {
      activityId: "route-activity-duplicate",
      kind: "v2-route-encounter",
      stage: "encountered",
      actorName: "Remote",
      routeNumber: 2,
      occurredAt: new Date(now).toISOString(),
      expiresAt: new Date(now + 30000).toISOString()
    };
    const expired = {
      activityId: "route-activity-expired",
      kind: "v2-route-encounter",
      stage: "encountered",
      actorName: "Remote",
      routeNumber: 3,
      occurredAt: new Date(now - 60000).toISOString(),
      expiresAt: new Date(now - 1000).toISOString()
    };
    return {
      first: presentV2RoutePublicActivity(fresh),
      duplicate: presentV2RoutePublicActivity(fresh),
      expired: presentV2RoutePublicActivity(expired),
      count: state.routeUiState.publicActivityToasts.length,
      stages: state.routeUiState.publicActivityToasts.map((toast) => toast.stage)
    };
  })()`);
  assert.deepEqual(duplicateSummary, { first: true, duplicate: false, expired: false, count: 1, stages: ["encountered"] });

  const failureSummary = await evaluate(`(async () => {
    const originalFetch = fetch;
    let calls = 0;
    fetch = () => {
      calls += 1;
      return Promise.reject(new Error("simulated public activity outage"));
    };
    try {
      pushV2RoutePublicActivity({ stage: "exploring", actorPlayerId: "gold", seriesId: state.series, routeNumber: 1 });
      await new Promise((resolve) => setTimeout(resolve, 0));
      return {
        calls,
        pendingGameplayWrites: backendSync.pendingGameplayWrites.size,
        saveStatus: backendSync.saveStatus
      };
    } finally {
      fetch = originalFetch;
    }
  })()`);
  assert.equal(failureSummary.calls, 1);
  assert.equal(failureSummary.pendingGameplayWrites, 0);
  assert.notEqual(failureSummary.saveStatus, "conflict");

  const acquired = await evaluate(`(async () => {
    state.activePlayerId = "gold";
    state.activePage = "actionPhase";
    const committed = v2CommitRouteAction("gold", 1);
    v2DrawRouteActionEncounter(committed.action.actionId, { actingPlayerId: "gold" });
    const pokemon = v2FinalizeRouteActionAcquisition(committed.action.actionId, { actingPlayerId: "gold" });
    state.routeUiState = normalizeRouteUiState({
      routeWorkspaceBySeriesId: {
        [state.series]: {
          screen: "route-list",
          selectedActionId: "encounter",
          selectedRouteNumber: 5,
          activeActionId: "",
          activeOpportunityId: ""
        }
      },
      activeRouteActionIdBySeriesId: {},
      lastRouteAcquisitionMessage: "",
      publicActivityToasts: []
    });
    await saveState({ immediate: true, immediateBackend: true });
    render();
    return {
      pokemonId: pokemon.id,
      pokemonName: pokemon.name,
      routeNumber: pokemon.routeEncounterMetadata.routeNumber,
      workspace: structuredClone(state.routeUiState.routeWorkspaceBySeriesId[state.series])
    };
  })()`, 60000);

  const response = await fetch(`${server.baseUrl}/api/games/${gameId}/presence/activity`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      clientId: "remote-route-activity-client",
      stage: "obtained",
      actorPlayerId: "gold",
      seriesId: "Kanto",
      routeNumber: acquired.routeNumber,
      pokemonRecordId: acquired.pokemonId,
      publicText: `leak ${acquired.pokemonName}`
    })
  });
  assert.equal(response.status, 202);
  const payload = await response.json();
  assert.equal(payload.activity.stage, "obtained");
  assert.equal(payload.activity.pokemonName, acquired.pokemonName);
  assert.equal(payload.activity.publicText, undefined);

  await waitUntil(`state.routeUiState?.publicActivityToasts?.some((toast) => toast.stage === "obtained" && toast.pokemonName === ${JSON.stringify(acquired.pokemonName)})`, 10000);
  const presentation = await evaluate(`(() => {
    const toast = state.routeUiState.publicActivityToasts.find((entry) => entry.stage === "obtained");
    return {
      toast,
      workspace: structuredClone(state.routeUiState.routeWorkspaceBySeriesId[state.series]),
      activePage: state.activePage,
      boardText: document.querySelector("#activityToastStack")?.textContent || ""
    };
  })()`);
  assert.equal(presentation.toast.pokemonName, acquired.pokemonName);
  assert.equal(presentation.workspace.screen, acquired.workspace.screen);
  assert.equal(presentation.workspace.selectedRouteNumber, acquired.workspace.selectedRouteNumber);
  assert.equal(presentation.activePage, "actionPhase");
  assert.match(presentation.boardText, new RegExp(acquired.pokemonName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
});

test("V2 token and duplicate reroll sequences persist exact inventory, revisions, and acquisition", async () => {
  const marker = "V2-REROLLS";
  const gameId = await openRouteGame(marker);
  const summary = await evaluate(`(() => {
    state.activePlayerId = "gold";
    const routeState = v2EnsureRouteSeriesState(state.series);
    const actionPhase = v2EnsureActionPhase(state.series);
    const first = v2CommitRouteAction("gold", 1).action;
    const firstResult = v2DrawRouteActionEncounter(first.actionId, { actingPlayerId: "gold" });
    const tokenReroll = v2UseRerollTokenOnAction(first.actionId, "gold-route-reroll-1", { actingPlayerId: "gold", idempotencyKey: "reroll-token-once" });
    const tokenRerollAgain = v2UseRerollTokenOnAction(first.actionId, "gold-route-reroll-1", { actingPlayerId: "gold", idempotencyKey: "reroll-token-once" });
    const firstPokemon = v2FinalizeRouteActionAcquisition(first.actionId, { actingPlayerId: "gold" });
    const second = v2CommitRouteAction("gold", 2).action;
    const secondResult = v2DrawRouteActionEncounter(second.actionId, { actingPlayerId: "gold" });
    const current = v2CurrentResultRevision(secondResult);
    state.pokemonRecords.push({ id: "gold-route-dupe", trainerId: "gold", ownerId: "gold", name: current.displayName, currentSpecies: current.displayName, status: "Active", rosterType: "Active" });
    const duplicateReroll = v2RerollRouteActionResult(second.actionId, { actingPlayerId: "gold" });
    const secondPokemon = v2FinalizeRouteActionAcquisition(second.actionId, { actingPlayerId: "gold" });
    return {
      firstResultId: firstResult.resultId,
      firstRevisions: tokenReroll.revisions.length,
      tokenAgainRevisions: tokenRerollAgain.revisions.length,
      rerollTokenCount: state.players.find((player) => player.id === "gold").inventory.filter((item) => item.id === "gold-route-reroll-1").length,
      rerollOperations: v2RouteEffectOperations(state.series).filter((operation) => operation.type === "reroll-token").length,
      firstPokemonId: firstPokemon.id,
      secondResultId: secondResult.resultId,
      secondRevisions: duplicateReroll.revisions.length,
      secondPokemonId: secondPokemon.id,
      spends: actionPhase.spends.length,
      pokemonRecords: state.pokemonRecords.filter((entry) => entry.routeEncounterMetadata?.resultId === firstResult.resultId || entry.routeEncounterMetadata?.resultId === secondResult.resultId).length,
      routeResults: routeState.routes.flatMap((route) => route.encounterResults).length
    };
  })()`);
  assert.equal(summary.firstRevisions, 2);
  assert.equal(summary.tokenAgainRevisions, 2);
  assert.equal(summary.rerollTokenCount, 0);
  assert.equal(summary.rerollOperations, 1);
  assert.equal(summary.secondRevisions, 2);
  assert.equal(summary.spends, 2);
  assert.equal(summary.pokemonRecords, 2);
  assert.equal(summary.routeResults, 2);
  await persistAndReload(gameId, marker);
  const afterReload = await evaluate(`(() => ({
    rerollOperations: v2RouteEffectOperations(state.series).filter((operation) => operation.type === "reroll-token").length,
    acquiredResults: v2EnsureRouteSeriesState(state.series).routes.flatMap((route) => route.encounterResults).filter((result) => result.status === "acquired").length,
    routePokemon: state.pokemonRecords.filter((entry) => entry.routeEncounterMetadata).length
  }))()`);
  assert.deepEqual(afterReload, { rerollOperations: 1, acquiredResults: 2, routePokemon: 2 });
});

test("V2 player-specific duplicate preferences filter only the acting player's random pool", async () => {
  const marker = "V2-DUP-PREF";
  const gameId = await openRouteGame(marker);
  const beforeReload = await evaluate(`(() => {
    state.activePlayerId = "gold";
    const routeState = v2EnsureRouteSeriesState(state.series);
    const route = v2FindRoute(routeState, 1);
    const resident = route.residents.find((entry) => !entry.premium);
    const other = route.residents.find((entry) => !entry.premium && entry.residentId !== resident.residentId);
    route.publicDiscoveryResidentIds = [...new Set([...(route.publicDiscoveryResidentIds || []), resident.residentId])].sort();
    state.pokemonRecords.push(
      { id: "gold-duplicate-pref-owned", trainerId: "gold", ownerId: "gold", name: resident.displayName, currentSpecies: resident.displayName, status: "Active", rosterType: "Active" },
      { id: "red-duplicate-pref-owned", trainerId: "red", ownerId: "red", name: resident.displayName, currentSpecies: resident.displayName, status: "Active", rosterType: "Active" }
    );
    state.players.forEach((player) => {
      player.pokemonIds = state.pokemonRecords.filter((pokemon) => pokemon.trainerId === player.id).map((pokemon) => pokemon.id);
    });
    const defaultControls = getRouteDuplicatePreferenceControlsForPlayer(routeState, 1, "gold");
    const routeSnapshot = JSON.stringify(route.residents);
    const publicSnapshot = JSON.stringify(route.publicDiscoveryResidentIds);
    v2SetRouteDuplicatePreference({ playerId: "gold", routeNumber: 1, residentId: resident.residentId, enabled: false });
    const offControls = getRouteDuplicatePreferenceControlsForPlayer(routeState, 1, "gold");
    const goldEligible = v2EligibleResidents(route, [], { routeState, playerId: "gold" }).map((entry) => entry.residentId);
    const redEligible = v2EligibleResidents(route, [], { routeState, playerId: "red" }).map((entry) => entry.residentId);
    const residentsUnchangedAfterPreference = JSON.stringify(route.residents) === routeSnapshot;
    const publicUnchangedAfterPreference = JSON.stringify(route.publicDiscoveryResidentIds) === publicSnapshot;
    const opportunity = v2CreateRouteEncounterOpportunity({ playerId: "gold", routeNumber: 1 }).opportunity;
    let drawBlocked = false;
    try {
      v2DrawRouteOpportunityEncounter(opportunity.opportunityId, { actingPlayerId: "gold", residentId: resident.residentId });
    } catch (error) {
      drawBlocked = /eligible/i.test(error.message);
    }
    const drawn = v2DrawRouteOpportunityEncounter(opportunity.opportunityId, { actingPlayerId: "gold", residentId: other.residentId });
    const rerollEligible = v2EligibleResidents(route, [other.residentId], { routeState, opportunityId: opportunity.opportunityId, playerId: "gold" }).map((entry) => entry.residentId);
    const masterOpportunity = v2CreateRouteEncounterOpportunity({ playerId: "gold", routeNumber: 1 }).opportunity;
    const masterCapabilities = getMasterBallOpportunityCapabilitiesForPlayer(routeState, masterOpportunity.opportunityId, "gold");
    return {
      residentId: resident.residentId,
      defaultOn: defaultControls.some((control) => control.residentId === resident.residentId && control.duplicateEnabled === true),
      off: offControls.some((control) => control.residentId === resident.residentId && control.duplicateEnabled === false),
      goldExcluded: !goldEligible.includes(resident.residentId),
      redStillEligible: redEligible.includes(resident.residentId),
      drawBlocked,
      drawnResidentId: drawn.revisions[0].residentId,
      rerollExcluded: !rerollEligible.includes(resident.residentId),
      masterStillEligible: masterCapabilities.eligibleResidents.some((entry) => entry.residentId === resident.residentId),
      residentsUnchangedAfterPreference,
      publicUnchangedAfterPreference,
      preference: routeState.duplicatePreferencesByPlayerId.gold["route-1"][resident.residentId]
    };
  })()`, 60000);
  assert.equal(beforeReload.defaultOn, true);
  assert.equal(beforeReload.off, true);
  assert.equal(beforeReload.goldExcluded, true);
  assert.equal(beforeReload.redStillEligible, true);
  assert.equal(beforeReload.drawBlocked, true);
  assert.equal(beforeReload.rerollExcluded, true);
  assert.equal(beforeReload.masterStillEligible, true);
  assert.equal(beforeReload.residentsUnchangedAfterPreference, true);
  assert.equal(beforeReload.publicUnchangedAfterPreference, true);
  assert.equal(beforeReload.preference.enabled, false);

  await persistAndReload(gameId, marker);
  const afterReload = await evaluate(`(() => {
    const routeState = v2EnsureRouteSeriesState(state.series);
    const route = v2FindRoute(routeState, 1);
    const residentId = ${JSON.stringify(beforeReload.residentId)};
    const persistedOff = routeState.duplicatePreferencesByPlayerId.gold["route-1"][residentId]?.enabled === false;
    const stillExcluded = !v2EligibleResidents(route, [], { routeState, playerId: "gold" }).some((entry) => entry.residentId === residentId);
    const resident = route.residents.find((entry) => entry.residentId === residentId);
    state.pokemonRecords
      .filter((pokemon) => pokemon.trainerId === "gold" && [pokemon.acquiredSpeciesId, pokemon.currentSpecies, pokemon.name].some((value) => v2Slugify(value) === v2Slugify(resident.speciesId) || v2Slugify(value) === v2Slugify(resident.displayName)))
      .forEach((pokemon) => {
        pokemon.status = "Removed";
        pokemon.rosterType = "Removed";
      });
    const dormantIncluded = v2EligibleResidents(route, [], { routeState, playerId: "gold" }).some((entry) => entry.residentId === residentId);
    const dormantControls = getRouteDuplicatePreferenceControlsForPlayer(routeState, 1, "gold").filter((control) => control.residentId === residentId).length;
    state.pokemonRecords.push({
      id: "gold-duplicate-pref-owned-again",
      trainerId: "gold",
      ownerId: "gold",
      name: resident.displayName,
      currentSpecies: resident.displayName,
      acquiredSpeciesId: resident.speciesId,
      status: "Legacy",
      rosterType: "Legacy"
    });
    const effectiveAgain = !v2EligibleResidents(route, [], { routeState, playerId: "gold" }).some((entry) => entry.residentId === residentId);
    v2SetRouteDuplicatePreference({ playerId: "gold", routeNumber: 1, residentId, enabled: true });
    const reenabled = v2EligibleResidents(route, [], { routeState, playerId: "gold" }).some((entry) => entry.residentId === residentId);
    return {
      persistedOff,
      stillExcluded,
      dormantIncluded,
      dormantControls,
      effectiveAgain,
      reenabled,
      preferenceBucket: routeState.duplicatePreferencesByPlayerId.gold?.["route-1"]?.[residentId] || null,
      premiumCount: route.residents.filter((entry) => entry.premium).length,
      premiumWeights: route.residents.filter((entry) => entry.premium).map((entry) => entry.encounterWeight)
    };
  })()`, 60000);
  assert.equal(afterReload.persistedOff, true);
  assert.equal(afterReload.stillExcluded, true);
  assert.equal(afterReload.dormantIncluded, true);
  assert.equal(afterReload.dormantControls, 0);
  assert.equal(afterReload.effectiveAgain, true);
  assert.equal(afterReload.reenabled, true);
  assert.equal(afterReload.preferenceBucket, null);
  assert.equal(afterReload.premiumCount, 2);
  assert.equal(afterReload.premiumWeights.every((weight) => weight === 0.15), true);
});

test("V2 Extra Encounter remains atomic when Duplicate OFF removes every random candidate", async () => {
  const marker = "V2-EXTRA-DUP-EMPTY";
  await openRouteGame(marker);
  const summary = await evaluate(`(() => {
    state.activePlayerId = "gold";
    const routeState = v2EnsureRouteSeriesState(state.series);
    const route = v2FindRoute(routeState, 1);
    const gold = state.players.find((player) => player.id === "gold");
    route.publicDiscoveryResidentIds = route.residents.map((resident) => resident.residentId).sort();
    route.residents.forEach((resident, index) => {
      state.pokemonRecords.push({
        id: "gold-owns-all-extra-" + index,
        trainerId: "gold",
        ownerId: "gold",
        name: resident.displayName,
        currentSpecies: resident.displayName,
        acquiredSpeciesId: resident.speciesId,
        status: "Active",
        rosterType: "Active"
      });
      v2SetRouteDuplicatePreference({
        playerId: "gold",
        routeNumber: 1,
        residentId: resident.residentId,
        enabled: false
      });
    });
    const tokenId = "gold-route-extra-1";
    const tokenCountBefore = gold.inventory.filter((item) => item.id === tokenId).length;
    const opportunitiesBefore = route.pendingEncounterOpportunities.length;
    const resultsBefore = route.encounterResults.length;
    const operationsBefore = v2RouteEffectOperations(state.series).length;
    let blocked = "";
    try {
      v2UseExtraEncounter("gold", 1, tokenId, { idempotencyKey: "extra-empty-pool" });
    } catch (error) {
      blocked = error.message;
    }
    return {
      blocked,
      tokenCountBefore,
      tokenCountAfter: gold.inventory.filter((item) => item.id === tokenId).length,
      opportunitiesBefore,
      opportunitiesAfter: route.pendingEncounterOpportunities.length,
      resultsBefore,
      resultsAfter: route.encounterResults.length,
      operationsBefore,
      operationsAfter: v2RouteEffectOperations(state.series).length
    };
  })()`, 60000);
  assert.match(summary.blocked, /No eligible|eligible/i);
  assert.equal(summary.tokenCountBefore, 1);
  assert.equal(summary.tokenCountAfter, 1);
  assert.equal(summary.opportunitiesAfter, summary.opportunitiesBefore);
  assert.equal(summary.resultsAfter, summary.resultsBefore);
  assert.equal(summary.operationsAfter, summary.operationsBefore);
});

test("V2 Extra Encounter, Repel, and Master Ball are exact-once through backend reload", async () => {
  const marker = "V2-TOKENS";
  const gameId = await openRouteGame(marker);
  const summary = await evaluate(`(() => {
    state.activePlayerId = "gold";
    const routeState = v2EnsureRouteSeriesState(state.series);
    const route = v2FindRoute(routeState, 1);
    const gold = state.players.find((player) => player.id === "gold");
    const balanceBefore = gold.balance;
    const purchased = v2PurchaseExtraEncounter("gold", { idempotencyKey: "buy-extra-once" });
    const purchasedAgain = v2PurchaseExtraEncounter("gold", { idempotencyKey: "buy-extra-once" });
    const futureTokenBefore = gold.inventory.filter((item) => item.id === purchased.id).length;
    let futureRouteBlocked = "";
    try {
      v2UseExtraEncounter("gold", 9, purchased.id, { idempotencyKey: "future-extra-blocked" });
    } catch (error) {
      futureRouteBlocked = error.message;
    }
    const futureTokenAfter = gold.inventory.filter((item) => item.id === purchased.id).length;
    const extraOperation = v2UseExtraEncounter("gold", 1, purchased.id, { idempotencyKey: "use-extra-once" });
    const extraAgain = v2UseExtraEncounter("gold", 1, purchased.id, { idempotencyKey: "use-extra-once" });
    const extraPokemon = v2FinalizeRouteActionAcquisition(extraOperation.operationId, { actingPlayerId: "gold" });
    const repelCapabilities = getRouteRepelCapabilitiesForPlayer(routeState, 1, "gold");
    const tierCounts = Object.fromEntries(repelCapabilities.tiers.map((tier) => [tier.tierId, tier.unsuppressedEligibleCount]));
    const eliteRepelRoute = routeState.routes.find((candidateRoute) => getRouteRepelCapabilitiesForPlayer(routeState, candidateRoute.routeNumber, "gold").tiers.some((tier) => /-elite$/.test(tier.tierId) && tier.canApplyRepel));
    const eliteCapabilities = eliteRepelRoute ? getRouteRepelCapabilitiesForPlayer(routeState, eliteRepelRoute.routeNumber, "gold") : null;
    const eliteTier = eliteCapabilities?.tiers.find((tier) => /-elite$/.test(tier.tierId) && tier.canApplyRepel)?.tierId || "";
    const illegalTier = repelCapabilities.tiers.find((tier) => !tier.canApplyRepel);
    let illegalRepelBlocked = "";
    if (illegalTier) {
      try {
        v2ApplyRepelToRoute("gold", 1, illegalTier.tierId, "gold-route-repel-1", { idempotencyKey: "illegal-repel" });
      } catch (error) {
        illegalRepelBlocked = error.message;
      }
    }
    if (!eliteRepelRoute || !eliteTier) throw new Error("No generated Route exposed a legal Elite-tier Repel candidate.");
    gold.inventory.unshift({ id: "gold-route-repel-elite-1", name: "Repel Token", type: "TOKEN", canonicalId: "repel-token" });
    const eliteSuppression = v2ApplyRepelToRoute("gold", eliteRepelRoute.routeNumber, eliteTier, "gold-route-repel-elite-1", { idempotencyKey: "repel-elite-once" });
    const tierCountsAfterElite = eliteRepelRoute.residents.reduce((counts, resident) => {
      counts[resident.battleTier.id] = (counts[resident.battleTier.id] || 0) + (eliteSuppression.residentIds.includes(resident.residentId) ? 1 : 0);
      return counts;
    }, {});
    const repelTier = Object.entries(tierCounts).sort((a, b) => b[1] - a[1]).find(([, count]) => count >= 5)[0];
    const suppression = v2ApplyRepelToRoute("gold", 1, repelTier, "gold-route-repel-1", { idempotencyKey: "repel-once" });
    const suppressionAgain = v2ApplyRepelToRoute("gold", 1, repelTier, "gold-route-repel-1", { idempotencyKey: "repel-once" });
    const repelAction = v2CommitRouteAction("gold", 1).action;
    const repelResult = v2DrawRouteActionEncounter(repelAction.actionId, { actingPlayerId: "gold" });
    const repelPokemon = v2FinalizeRouteActionAcquisition(repelAction.actionId, { actingPlayerId: "gold" });
    const masterAction = v2CommitRouteAction("gold", 1).action;
    const knownResident = route.residents.find((resident) => !route.publicDiscoveryResidentIds.includes(resident.residentId));
    route.privateKnowledgeByPlayerId.gold = [knownResident.residentId];
    const masterOperation = v2UseMasterBallOnOpportunity("gold", masterAction.opportunityId, knownResident.residentId, "gold-route-master-1", { idempotencyKey: "master-once" });
    const masterAgain = v2UseMasterBallOnOpportunity("gold", masterAction.opportunityId, knownResident.residentId, "gold-route-master-1", { idempotencyKey: "master-once" });
    const masterPokemon = v2FinalizeRouteActionAcquisition(masterOperation.operationId, { actingPlayerId: "gold" });
    return {
      purchaseSame: purchased.id === purchasedAgain.id,
      extraSame: extraOperation.operationId === extraAgain.operationId,
      masterSame: masterOperation.operationId === masterAgain.operationId,
      moneySpent: balanceBefore - gold.balance,
      futureRouteBlocked,
      futureTokenBefore,
      futureTokenAfter,
      extraTokenCount: gold.inventory.filter((item) => item.id === purchased.id).length,
      repelTokenCount: gold.inventory.filter((item) => item.id === "gold-route-repel-1").length,
      eliteRepelTokenCount: gold.inventory.filter((item) => item.id === "gold-route-repel-elite-1").length,
      masterTokenCount: gold.inventory.filter((item) => item.id === "gold-route-master-1").length,
      suppressionCount: routeState.routes.reduce((sum, entry) => sum + entry.suppressions.length, 0),
      suppressionSize: suppression.residentIds.length,
      suppressionSame: suppression.suppressionId === suppressionAgain.suppressionId,
      eliteRepelTier: eliteTier,
      eliteSuppressionSize: eliteSuppression.residentIds.length,
      eliteSuppressionAllElite: tierCountsAfterElite[eliteTier] === V2_REPEL_SUPPRESSION_COUNT,
      illegalRepelBlocked,
      repelCapabilityTiers: repelCapabilities.tiers.map((tier) => ({ tierId: tier.tierId, label: tier.label, currentResidentCount: tier.currentResidentCount, unsuppressedEligibleCount: tier.unsuppressedEligibleCount, canApplyRepel: tier.canApplyRepel, blockReason: tier.blockReason })),
      repelAvoidedSuppression: !suppression.residentIds.includes(v2CurrentResultRevision(repelResult).residentId),
      actionsSpent: v2EnsureActionPhase(state.series).spends.length,
      effectOperations: v2RouteEffectOperations(state.series).map((operation) => operation.type).sort(),
      pokemonIds: [extraPokemon.id, repelPokemon.id, masterPokemon.id],
      acquiredResults: route.encounterResults.filter((result) => result.status === "acquired").length
    };
  })()`);
  assert.equal(summary.purchaseSame, true);
  assert.equal(summary.extraSame, true);
  assert.equal(summary.masterSame, true);
  assert.equal(summary.moneySpent, 2500);
  assert.match(summary.futureRouteBlocked, /above current progression/i);
  assert.equal(summary.futureTokenBefore, 1);
  assert.equal(summary.futureTokenAfter, 1);
  assert.equal(summary.extraTokenCount, 0);
  assert.equal(summary.repelTokenCount, 0);
  assert.equal(summary.eliteRepelTokenCount, 0);
  assert.equal(summary.masterTokenCount, 0);
  assert.equal(summary.suppressionCount, 2);
  assert.equal(summary.suppressionSize, 5);
  assert.equal(summary.suppressionSame, true);
  assert.match(summary.eliteRepelTier, /-elite$/);
  assert.equal(summary.eliteSuppressionSize, 5);
  assert.equal(summary.eliteSuppressionAllElite, true);
  if (summary.illegalRepelBlocked) assert.match(summary.illegalRepelBlocked, /requires exactly 5|only/i);
  assert.ok(summary.repelCapabilityTiers.some((tier) => tier.tierId === "lc-elite" || /-elite$/.test(tier.tierId)));
  assert.equal(summary.repelCapabilityTiers.every((tier) => typeof tier.currentResidentCount === "number" && typeof tier.unsuppressedEligibleCount === "number" && typeof tier.canApplyRepel === "boolean"), true);
  assert.equal(summary.repelAvoidedSuppression, true);
  assert.equal(summary.actionsSpent, 2);
  assert.deepEqual(summary.effectOperations, ["extra-encounter-token", "master-ball-token", "repel-token", "repel-token"]);
  assert.equal(summary.acquiredResults, 3);
  await persistAndReload(gameId, marker);
  const afterReload = await evaluate(`(() => {
    const routeState = v2EnsureRouteSeriesState(state.series);
    return {
      suppressions: routeState.routes.reduce((sum, route) => sum + route.suppressions.length, 0),
      effectOperations: v2RouteEffectOperations(state.series).length,
      routePokemon: state.pokemonRecords.filter((entry) => entry.routeEncounterMetadata).length,
      spentActions: v2EnsureActionPhase(state.series).spends.length
    };
  })()`);
  assert.deepEqual(afterReload, { suppressions: 2, effectOperations: 4, routePokemon: 3, spentActions: 2 });
});

test("V2 multiplayer isolation protects private knowledge, ownership, and attribution", async () => {
  const marker = "V2-MULTI";
  const gameId = await openRouteGame(marker);
  const summary = await evaluate(`(() => {
    const routeState = v2EnsureRouteSeriesState(state.series);
    const route = v2FindRoute(routeState, 1);
    const [goldOnly, redOnly] = route.residents.slice(0, 2);
    route.privateKnowledgeByPlayerId.gold = [goldOnly.residentId];
    route.privateKnowledgeByPlayerId.red = [redOnly.residentId];
    const goldView = getRouteViewForPlayer(routeState, 1, "gold");
    const redView = getRouteViewForPlayer(routeState, 1, "red");
    const publicBefore = getRoutePublicView(route).publicDiscoveries.length;
    const goldAction = v2CommitRouteAction("gold", 1).action;
    const goldResult = v2DrawRouteActionEncounter(goldAction.actionId, { actingPlayerId: "gold" });
    const current = v2CurrentResultRevision(goldResult);
    state.pokemonRecords.push({ id: "red-owns-gold-result", trainerId: "red", ownerId: "red", name: current.displayName, currentSpecies: current.displayName, status: "Active", rosterType: "Active" });
    const failures = [];
    for (const attempt of [
      () => v2DrawRouteActionEncounter(goldAction.actionId, { actingPlayerId: "red" }),
      () => v2RerollRouteActionResult(goldAction.actionId, { actingPlayerId: "red" }),
      () => v2UseRerollTokenOnAction(goldAction.actionId, "red-route-reroll-1", { actingPlayerId: "red" }),
      () => v2FinalizeRouteActionAcquisition(goldAction.actionId, { actingPlayerId: "red" }),
      () => v2UseMasterBallOnOpportunity("red", goldAction.opportunityId, redOnly.residentId, "red-route-master-1")
    ]) {
      try {
        attempt();
        failures.push("allowed");
      } catch (error) {
        failures.push(error.message);
      }
    }
    let duplicateBlocked = "";
    try {
      v2RerollRouteActionResult(goldAction.actionId, { actingPlayerId: "gold" });
    } catch (error) {
      duplicateBlocked = error.message;
    }
    state.pokemonRecords.push({ id: "gold-owns-gold-result", trainerId: "gold", ownerId: "gold", name: current.displayName, currentSpecies: current.displayName, status: "Active", rosterType: "Active" });
    const duplicateReroll = v2RerollRouteActionResult(goldAction.actionId, { actingPlayerId: "gold" });
    const goldPokemon = v2FinalizeRouteActionAcquisition(goldAction.actionId, { actingPlayerId: "gold" });
    const redAction = v2CommitRouteAction("red", 1).action;
    const redResult = v2DrawRouteActionEncounter(redAction.actionId, { actingPlayerId: "red" });
    const redPokemon = v2FinalizeRouteActionAcquisition(redAction.actionId, { actingPlayerId: "red" });
    return {
      publicBefore,
      goldSeesGoldPrivate: goldView.knownResidents.some((resident) => resident.residentId === goldOnly.residentId),
      goldSeesRedPrivate: goldView.knownResidents.some((resident) => resident.residentId === redOnly.residentId),
      redSeesRedPrivate: redView.knownResidents.some((resident) => resident.residentId === redOnly.residentId),
      redSeesGoldPrivate: redView.knownResidents.some((resident) => resident.residentId === goldOnly.residentId),
      failures,
      duplicateBlocked,
      duplicateRevisions: duplicateReroll.revisions.length,
      publicAfter: getRoutePublicView(route).publicDiscoveries.length,
      goldSpends: v2ActionLedgerFor(v2EnsureActionPhase(state.series), "gold").spentActionIds.length,
      redSpends: v2ActionLedgerFor(v2EnsureActionPhase(state.series), "red").spentActionIds.length,
      goldOwns: state.players.find((player) => player.id === "gold").pokemonIds.includes(goldPokemon.id),
      redOwns: state.players.find((player) => player.id === "red").pokemonIds.includes(redPokemon.id),
      wrongGoldInventorySpent: state.players.find((player) => player.id === "gold").inventory.some((item) => item.id === "red-route-reroll-1"),
      redRerollStillPresent: state.players.find((player) => player.id === "red").inventory.some((item) => item.id === "red-route-reroll-1")
    };
  })()`);
  assert.equal(summary.publicBefore, 0);
  assert.equal(summary.goldSeesGoldPrivate, true);
  assert.equal(summary.goldSeesRedPrivate, false);
  assert.equal(summary.redSeesRedPrivate, true);
  assert.equal(summary.redSeesGoldPrivate, false);
  assert.equal(summary.failures.every((message) => /another player|not pending|belongs|only resolve/i.test(message)), true, JSON.stringify(summary.failures));
  assert.match(summary.duplicateBlocked, /not a duplicate/i);
  assert.equal(summary.duplicateRevisions, 2);
  assert.equal(summary.publicAfter > summary.publicBefore, true);
  assert.equal(summary.goldSpends, 1);
  assert.equal(summary.redSpends, 1);
  assert.equal(summary.goldOwns, true);
  assert.equal(summary.redOwns, true);
  assert.equal(summary.wrongGoldInventorySpent, false);
  assert.equal(summary.redRerollStillPresent, true);
  await persistAndReload(gameId, marker);
  const afterReload = await evaluate(`(() => ({
    goldRoutePokemon: state.pokemonRecords.filter((entry) => entry.trainerId === "gold" && entry.routeEncounterMetadata).length,
    redRoutePokemon: state.pokemonRecords.filter((entry) => entry.trainerId === "red" && entry.routeEncounterMetadata).length,
    publicDiscoveries: getRoutePublicView(v2FindRoute(v2EnsureRouteSeriesState(state.series), 1)).publicDiscoveries.length
  }))()`);
  assert.equal(afterReload.goldRoutePokemon, 1);
  assert.equal(afterReload.redRoutePokemon, 1);
  assert.equal(afterReload.publicDiscoveries > 0, true);
});

test("V2 Route reveal effects preserve private and public knowledge boundaries", async () => {
  const marker = "V2-REVEALS";
  const gameId = await openRouteGame(marker);
  const summary = await evaluate(`(() => {
    const routeState = v2EnsureRouteSeriesState(state.series);
    const route = v2FindRoute(routeState, 1);
    const privateOperation = v2ApplyRouteRevealEffect({
      visibility: "player",
      routeNumber: 1,
      targetPlayerId: "gold",
      actingPlayerId: "gold",
      count: 1,
      source: { kind: "test-route-effect", sourceType: "test", sourceId: "private-reveal" },
      idempotencyKey: "private-reveal-once"
    });
    const privateAgain = v2ApplyRouteRevealEffect({
      visibility: "player",
      routeNumber: 1,
      targetPlayerId: "gold",
      actingPlayerId: "gold",
      count: 1,
      source: { kind: "test-route-effect", sourceType: "test", sourceId: "private-reveal" },
      idempotencyKey: "private-reveal-once"
    });
    const privateResidentId = privateOperation.residentIds[0];
    const redAction = v2CommitRouteAction("red", 1).action;
    let redMasterBlocked = "";
    try {
      v2UseMasterBallOnOpportunity("red", redAction.opportunityId, privateResidentId, "red-route-master-1");
    } catch (error) {
      redMasterBlocked = error.message;
    }
    const goldAction = v2CommitRouteAction("gold", 1).action;
    const goldMaster = v2UseMasterBallOnOpportunity("gold", goldAction.opportunityId, privateResidentId, "gold-route-master-1", { idempotencyKey: "gold-master-private" });
    const goldPokemon = v2FinalizeRouteActionAcquisition(goldMaster.operationId, { actingPlayerId: "gold" });
    const publicOperation = v2ApplyRouteRevealEffect({
      visibility: "table",
      routeNumber: 1,
      actingPlayerId: "gold",
      count: 1,
      filter: { excludeResidentIds: [privateResidentId] },
      source: { kind: "test-route-effect", sourceType: "test", sourceId: "public-reveal" },
      idempotencyKey: "public-reveal-once"
    });
    const goldView = getRouteViewForPlayer(routeState, 1, "gold");
    const redView = getRouteViewForPlayer(routeState, 1, "red");
    return {
      privateSame: privateOperation.operationId === privateAgain.operationId,
      privateResidentId,
      publicResidentId: publicOperation.residentIds[0],
      redMasterBlocked,
      goldMasterResultId: goldMaster.resultId,
      goldPokemonId: goldPokemon.id,
      publicDiscoveries: getRoutePublicView(route).publicDiscoveries.map((resident) => resident.residentId),
      goldKnown: goldView.knownResidents.map((resident) => resident.residentId),
      redKnown: redView.knownResidents.map((resident) => resident.residentId),
      goldPrivate: goldView.privateDiscoveries.map((resident) => resident.residentId),
      redPrivate: redView.privateDiscoveries.map((resident) => resident.residentId),
      visibleGoldEffects: goldView.activeVisibleEffects.map((effect) => effect.type).sort(),
      visibleRedEffects: redView.activeVisibleEffects.map((effect) => effect.type).sort(),
      operationTypes: v2RouteEffectOperations(state.series).map((operation) => operation.type).sort()
    };
  })()`);
  assert.equal(summary.privateSame, true);
  assert.match(summary.redMasterBlocked, /revealed|known|Master Ball/i);
  assert.ok(summary.goldKnown.includes(summary.privateResidentId));
  assert.equal(summary.redKnown.includes(summary.privateResidentId), false);
  assert.ok(summary.goldPrivate.includes(summary.privateResidentId));
  assert.equal(summary.redPrivate.includes(summary.privateResidentId), false);
  assert.ok(summary.publicDiscoveries.includes(summary.publicResidentId));
  assert.ok(summary.goldKnown.includes(summary.publicResidentId));
  assert.ok(summary.redKnown.includes(summary.publicResidentId));
  assert.deepEqual(summary.visibleGoldEffects.filter((type) => type.startsWith("reveal")), ["reveal-to-player", "reveal-to-table"]);
  assert.deepEqual(summary.visibleRedEffects.filter((type) => type.startsWith("reveal")), ["reveal-to-table"]);
  await persistAndReload(gameId, marker);
  const afterReload = await evaluate(`(() => {
    const routeState = v2EnsureRouteSeriesState(state.series);
    const goldView = getRouteViewForPlayer(routeState, 1, "gold");
    const redView = getRouteViewForPlayer(routeState, 1, "red");
    return {
      goldKnown: goldView.knownResidents.map((resident) => resident.residentId),
      redKnown: redView.knownResidents.map((resident) => resident.residentId),
      publicDiscoveries: getRoutePublicView(v2FindRoute(routeState, 1)).publicDiscoveries.map((resident) => resident.residentId),
      routeEffects: v2RouteEffectOperations(state.series).filter((operation) => operation.type === "reveal-to-player" || operation.type === "reveal-to-table").length
    };
  })()`);
  assert.ok(afterReload.goldKnown.includes(summary.privateResidentId));
  assert.equal(afterReload.redKnown.includes(summary.privateResidentId), false);
  assert.ok(afterReload.publicDiscoveries.includes(summary.publicResidentId));
  assert.equal(afterReload.routeEffects, 2);
});

test("V2 temporary Primary-Type injection stays scoped to one opportunity through reroll, duplicate, acquisition, and reload", async () => {
  const marker = "V2-INJECTION";
  const gameId = await openRouteGame(marker);
  const summary = await evaluate(`(() => {
    state.activePlayerId = "gold";
    const routeState = v2EnsureRouteSeriesState(state.series);
    const route = v2FindRoute(routeState, 1);
    const action = v2CommitRouteAction("gold", 1).action;
    const existingSpecies = new Set(route.residents.map((resident) => resident.speciesId));
    const tierScope = ["lc", "lc-elite", "safari", "poke", "great", "ultra", "master"];
    const grouped = v2BuildRoutePokemonCatalog().reduce((map, entry) => {
      if (existingSpecies.has(entry.speciesId)) return map;
      if (!tierScope.includes(entry.battleTier.id)) return map;
      map[entry.primaryType] ||= [];
      map[entry.primaryType].push(entry);
      return map;
    }, {});
    const primaryType = Object.entries(grouped).find(([, entries]) => entries.length >= 4)[0];
    const injectCapabilities = getTemporaryPrimaryTypeInjectionCapabilities({
      opportunityId: action.opportunityId,
      playerId: "gold",
      primaryType,
      battleTierIds: tierScope,
      count: 4
    });
    const injection = v2ApplyTemporaryPrimaryTypeInjection({
      opportunityId: action.opportunityId,
      playerId: "gold",
      actingPlayerId: "gold",
      primaryType,
      battleTierIds: tierScope,
      count: 4,
      source: { kind: "test-route-effect", sourceType: "test", sourceId: "primary-type-injection" },
      idempotencyKey: "inject-once"
    });
    const injectionAgain = v2ApplyTemporaryPrimaryTypeInjection({
      opportunityId: action.opportunityId,
      playerId: "gold",
      actingPlayerId: "gold",
      primaryType,
      battleTierIds: tierScope,
      count: 4,
      source: { kind: "test-route-effect", sourceType: "test", sourceId: "primary-type-injection" },
      idempotencyKey: "inject-once"
    });
    const opportunity = v2FindOpportunity(routeState, action.opportunityId).opportunity;
    const temporary = opportunity.temporaryResidents;
    const selectedTemporary = temporary[0];
    let redInjectionBlocked = "";
    try {
      v2ApplyTemporaryPrimaryTypeInjection({
        opportunityId: action.opportunityId,
        playerId: "red",
        actingPlayerId: "red",
        primaryType,
        battleTierIds: tierScope,
        count: 4
      });
    } catch (error) {
      redInjectionBlocked = error.message;
    }
    const result = v2DrawRouteActionEncounter(action.actionId, { actingPlayerId: "gold", residentId: selectedTemporary.residentId, reason: "temporary-test-draw" });
    const current = v2CurrentResultRevision(result);
    const firstRevisionCount = result.revisions.length;
    state.pokemonRecords.push({ id: "gold-temp-dupe", trainerId: "gold", ownerId: "gold", name: current.displayName, currentSpecies: current.displayName, status: "Active", rosterType: "Active" });
    const duplicateReroll = v2RerollRouteActionResult(action.actionId, { actingPlayerId: "gold" });
    const pokemon = v2FinalizeRouteActionAcquisition(action.actionId, { actingPlayerId: "gold" });
    const nextAction = v2CommitRouteAction("gold", 2).action;
    const nextEligible = v2EligibleResidents(v2FindRoute(routeState, 2), [], { opportunityId: nextAction.opportunityId });
    return {
      canInject: injectCapabilities.canInject,
      injectionSame: injection.operationId === injectionAgain.operationId,
      primaryType,
      tempCount: temporary.length,
      tempResidentIds: temporary.map((resident) => resident.residentId),
      tempPrimaryTypes: temporary.map((resident) => resident.primaryType),
      tempTierIds: temporary.map((resident) => resident.battleTier.id),
      permanentHasTemp: temporary.some((resident) => route.residents.some((permanent) => permanent.residentId === resident.residentId || permanent.speciesId === resident.speciesId)),
      resultPermanent: current.permanentResident,
      publicDiscoveredTemp: route.publicDiscoveryResidentIds.includes(selectedTemporary.residentId),
      firstRevisionCount,
      rerollRevisionCount: duplicateReroll.revisions.length,
      routePokemonId: pokemon.id,
      tempRoutePokemon: state.pokemonRecords.filter((entry) => entry.routeEncounterMetadata?.resultId === result.resultId).length,
      tempRoutePokemonIds: state.pokemonRecords.filter((entry) => entry.routeEncounterMetadata?.resultId === result.resultId).map((entry) => entry.id),
      nextOpportunityHasTempLeak: nextEligible.some((resident) => temporary.some((temp) => temp.residentId === resident.residentId)),
      redInjectionBlocked,
      injectionStatus: v2FindRouteEffectOperation(state.series, injection.operationId).status,
      liveOperationTypes: v2RouteEffectOperations(state.series).map((operation) => operation.type),
      visibleGoldEffects: getRouteViewForPlayer(routeState, 1, "gold").activeVisibleEffects.map((effect) => effect.type),
      visibleRedEffects: getRouteViewForPlayer(routeState, 1, "red").activeVisibleEffects.map((effect) => effect.type)
    };
  })()`);
  assert.equal(summary.canInject, true);
  assert.equal(summary.injectionSame, true);
  assert.equal(summary.tempCount, 4);
  assert.equal(summary.tempPrimaryTypes.every((type) => type === summary.primaryType), true);
  assert.equal(summary.tempTierIds.every((tier) => ["lc", "lc-elite", "safari", "poke", "great", "ultra", "master"].includes(tier)), true);
  assert.equal(summary.permanentHasTemp, false);
  assert.equal(summary.resultPermanent, false);
  assert.equal(summary.publicDiscoveredTemp, false);
  assert.equal(summary.firstRevisionCount, 1);
  assert.equal(summary.rerollRevisionCount, 2);
  assert.equal(summary.tempRoutePokemon, 1, JSON.stringify(summary.tempRoutePokemonIds));
  assert.equal(summary.nextOpportunityHasTempLeak, false);
  assert.match(summary.redInjectionBlocked, /another player|belongs/i);
  assert.equal(summary.injectionStatus, "consumed");
  assert.deepEqual(summary.liveOperationTypes, ["temporary-injection"]);
  assert.equal(summary.visibleGoldEffects.includes("temporary-injection"), false);
  assert.equal(summary.visibleRedEffects.includes("temporary-injection"), false);
  await persistAndReload(gameId, marker);
  const afterReload = await evaluate(`(() => {
    const routeState = v2EnsureRouteSeriesState(state.series);
    const route = v2FindRoute(routeState, 1);
    const operations = v2RouteEffectOperations(state.series);
    const operation = operations.find((entry) => entry.type === "temporary-injection");
    if (!operation) return {
      missingOperation: true,
      operationTypes: operations.map((entry) => entry.type).sort(),
      series: state.series,
      effectKeys: Object.keys(state.v2?.routeEffectOperationsBySeriesId || {}),
      keyedTypes: Object.fromEntries(Object.entries(state.v2?.routeEffectOperationsBySeriesId || {}).map(([key, value]) => [key, (value || []).map((entry) => entry.type)])),
      opportunityTempCounts: routeState.routes.flatMap((entry) => entry.pendingEncounterOpportunities || []).map((entry) => ({ id: entry.opportunityId, status: entry.status, temps: (entry.temporaryResidents || []).length }))
    };
    const opportunity = v2FindOpportunity(routeState, operation.opportunityId).opportunity;
    return {
      missingOperation: false,
      tempCount: opportunity.temporaryResidents.length,
      permanentHasTemp: opportunity.temporaryResidents.some((temp) => route.residents.some((resident) => resident.residentId === temp.residentId)),
      publicTempCount: opportunity.temporaryResidents.filter((temp) => route.publicDiscoveryResidentIds.includes(temp.residentId)).length,
      operationStatus: operation.status,
      routePokemon: state.pokemonRecords.filter((entry) => entry.routeEncounterMetadata).length
    };
  })()`);
  assert.deepEqual(afterReload, { missingOperation: false, tempCount: 4, permanentHasTemp: false, publicTempCount: 0, operationStatus: "consumed", routePokemon: 1 });
});
