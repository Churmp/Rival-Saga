const assert = require("node:assert/strict");
const fs = require("node:fs");
const net = require("node:net");
const os = require("node:os");
const path = require("node:path");
const { spawn } = require("node:child_process");
const { test, before, after } = require("node:test");

const {
  createSessionManager,
  prepareCommitCandidate,
  committedSessionRecord,
  synchronizeConnectedRevision
} = require("../token-sandbox-session.js");
const { createScenarioController } = require("../token-control-controller.js");
const encounterTokenRuntime = require("../encounter-token-runtime.js");
const { controlStateFixture } = require("./token-controller-test-fixture.js");

function stateFixture(marker = "real") {
  return {
    marker,
    players: [{ id: "player-1", name: "Gold", inventory: [] }],
    pokemonRecords: [],
    interactionEvents: [],
    transactions: [],
    log: [],
    lingeringStatuses: [],
    fieldTokens: [],
    effectAuditRecords: [],
    tokenConsumptions: [],
    tokenActivations: [],
    testingTools: { ignoreTurnOrder: false, freeMode: false, controlledPlayerId: "player-1", activeScenario: null },
    activePlayerId: "player-1",
    activePage: "playerHub",
    liveRefereeScreen: "play",
    liveRefereeCollapsed: true,
    liveTable: { currentPendingEventId: "", resolutionAnnouncements: [] }
  };
}

function createPersistenceHarness() {
  const manager = createSessionManager({ createSessionId: () => "sandbox-test-session", now: () => "2026-01-01T00:00:00.000Z" });
  let localBytes = JSON.stringify(stateFixture());
  let backendBytes = localBytes;
  let backendRevision = 4;
  const pushes = { state: 0, activity: 0, response: 0, status: 0 };

  function writeLocal(nextState, sessionId = "") {
    if (!manager.canPersistGameplay({ sessionId })) return false;
    localBytes = JSON.stringify(nextState);
    return true;
  }

  function push(kind, nextState, sessionId = "") {
    if (!manager.canPersistGameplay({ sessionId })) return false;
    pushes[kind] += 1;
    if (kind === "state") {
      backendBytes = JSON.stringify(nextState);
      backendRevision += 1;
    }
    return true;
  }

  return {
    manager,
    pushes,
    writeLocal,
    push,
    localBytes: () => localBytes,
    backendBytes: () => backendBytes,
    backendRevision: () => backendRevision
  };
}

test("[TSB-001] persistence isolation blocks local, state, activity, response, and status writes", () => {
  const harness = createPersistenceHarness();
  const realLocal = harness.localBytes();
  const realBackend = harness.backendBytes();
  const entered = harness.manager.enter({ realState: stateFixture(), revision: 4, revisionVerified: true, persistenceQuiescent: true });
  entered.workingState.marker = "sandbox";
  entered.workingState.players[0].inventory.push({ id: "restrict", name: "Restrict" });
  assert.equal(harness.writeLocal(entered.workingState), false);
  ["state", "activity", "response", "status"].forEach((kind) => assert.equal(harness.push(kind, entered.workingState), false));
  assert.equal(harness.localBytes(), realLocal);
  assert.equal(harness.backendBytes(), realBackend);
  assert.deepEqual(harness.pushes, { state: 0, activity: 0, response: 0, status: 0 });
});

test("[TSB-002] a save callback scheduled before entry cannot persist the working clone", async () => {
  const harness = createPersistenceHarness();
  let currentState = stateFixture();
  const originalBytes = harness.localBytes();
  const timer = setTimeout(() => harness.writeLocal(currentState), 20);
  const entered = harness.manager.enter({ realState: currentState, revision: 4, revisionVerified: true, persistenceQuiescent: true });
  currentState = entered.workingState;
  currentState.marker = "sandbox-from-stale-timer";
  await new Promise((resolve) => setTimeout(resolve, 45));
  clearTimeout(timer);
  assert.equal(harness.localBytes(), originalBytes);
});

test("[TSB-003] direct low-level gameplay writers fail closed during sandbox", () => {
  const harness = createPersistenceHarness();
  const entered = harness.manager.enter({ realState: stateFixture(), revision: 4, revisionVerified: true });
  entered.workingState.marker = "direct-bypass";
  assert.equal(harness.writeLocal(entered.workingState), false);
  assert.equal(harness.push("state", entered.workingState), false);
  assert.equal(harness.localBytes(), JSON.stringify(stateFixture()));
});

test("[TSB-004] remote events are buffered without mutating working state or storage", () => {
  const harness = createPersistenceHarness();
  const entered = harness.manager.enter({ realState: stateFixture(), revision: 4, revisionVerified: true });
  const beforeWorking = JSON.stringify(entered.workingState);
  harness.manager.bufferRemoteEvent({ type: "activity-created", activity: { id: "remote-1" }, version: 5 });
  assert.equal(JSON.stringify(entered.workingState), beforeWorking);
  assert.equal(harness.localBytes(), JSON.stringify(stateFixture()));
  assert.equal(harness.manager.info().remoteEventCount, 1);
  const discarded = harness.manager.discard({ authoritativeState: stateFixture("remote-authoritative") });
  assert.equal(discarded.state.marker, "remote-authoritative");
});

test("[TSB-005] refresh abandons in-memory sandbox and loads unchanged real persistence", () => {
  const harness = createPersistenceHarness();
  const entered = harness.manager.enter({ realState: stateFixture(), revision: 4, revisionVerified: true });
  entered.workingState.marker = "sandbox";
  const refreshedManager = createSessionManager();
  const reloaded = JSON.parse(harness.localBytes());
  assert.equal(refreshedManager.isActive(), false);
  assert.equal(reloaded.marker, "real");
});

test("[TSB-006] clean discard removes sandbox gameplay and uses authoritative real state", () => {
  const harness = createPersistenceHarness();
  const entered = harness.manager.enter({ realState: stateFixture(), revision: 4, revisionVerified: true });
  entered.workingState.log.push({ id: "sandbox-log" });
  entered.workingState.effectAuditRecords.push({ id: "sandbox-audit" });
  entered.workingState.players[0].inventory.push({ id: "sandbox-token" });
  entered.workingState.pokemonRecords.push({ id: "sandbox-pokemon" });
  entered.workingState.lingeringStatuses.push({ id: "sandbox-status" });
  entered.workingState.fieldTokens.push({ id: "sandbox-field" });
  entered.workingState.interactionEvents.push({ id: "sandbox-event" });
  const discarded = harness.manager.discard({ authoritativeState: stateFixture("latest-real") });
  assert.equal(discarded.usedFallback, false);
  assert.equal(discarded.state.marker, "latest-real");
  assert.equal(discarded.state.log.length, 0);
  assert.equal(harness.manager.isActive(), false);
});

test("[TSB-007] concurrent real revision rejects commit and preserves reviewable sandbox", () => {
  const harness = createPersistenceHarness();
  const entered = harness.manager.enter({ realState: stateFixture(), revision: 4, revisionVerified: true });
  entered.workingState.marker = "sandbox";
  const result = harness.manager.beginCommit({ currentRevision: 5, workingState: entered.workingState });
  assert.equal(result.ok, false);
  assert.equal(result.reason, "revision-conflict");
  assert.equal(harness.manager.isActive(), true);
  assert.equal(harness.backendBytes(), JSON.stringify(stateFixture()));
});

test("[TSB-008] commit failure retains baseline, working state, and discard path", () => {
  const harness = createPersistenceHarness();
  const entered = harness.manager.enter({ realState: stateFixture(), revision: 4, revisionVerified: true });
  entered.workingState.marker = "sandbox";
  const commit = harness.manager.beginCommit({ currentRevision: 4, workingState: entered.workingState });
  assert.equal(commit.ok, true);
  harness.manager.commitFailed("forced backend failure");
  assert.equal(harness.manager.isActive(), true);
  assert.equal(harness.manager.info().status, "active");
  assert.equal(harness.manager.baselineState().marker, "real");
  const discarded = harness.manager.discard({ authoritativeState: stateFixture("real-after-failure") });
  assert.equal(discarded.state.marker, "real-after-failure");
  assert.equal(harness.backendBytes(), JSON.stringify(stateFixture()));
});

test("[TSB-009] successful commit permits exactly one session-bound persistence transaction", () => {
  const harness = createPersistenceHarness();
  const entered = harness.manager.enter({ realState: stateFixture(), revision: 4, revisionVerified: true });
  entered.workingState.marker = "committed-sandbox";
  entered.workingState.log.push({ id: "sandbox-log", sandboxOrigin: { sessionId: "sandbox-test-session" } });
  const commit = harness.manager.beginCommit({ currentRevision: 4, workingState: entered.workingState });
  assert.equal(commit.ok, true);
  assert.equal(harness.push("state", commit.state, commit.sessionId), true);
  assert.equal(harness.push("activity", commit.state), false);
  assert.equal(harness.pushes.state, 1);
  assert.equal(harness.backendRevision(), 5);
  assert.equal(JSON.parse(harness.backendBytes()).marker, "committed-sandbox");
  assert.equal(JSON.parse(harness.backendBytes()).log[0].sandboxOrigin.sessionId, "sandbox-test-session");
  harness.manager.completeCommit();
  assert.equal(harness.manager.isActive(), false);
});

test("[TSB-010] Advanced Repair mutations disappear with sandbox discard", () => {
  const harness = createPersistenceHarness();
  const entered = harness.manager.enter({ realState: stateFixture(), revision: 4, revisionVerified: true });
  entered.workingState.log.push({ id: "token-action" }, { id: "repair-action" });
  entered.workingState.effectAuditRecords.push({ id: "repair-audit", result: "repaired" });
  const discarded = harness.manager.discard({ authoritativeState: stateFixture() });
  assert.equal(discarded.state.log.length, 0);
  assert.equal(discarded.state.effectAuditRecords.length, 0);
  assert.equal(harness.localBytes(), JSON.stringify(stateFixture()));
});

test("[TSB-011] commit candidate preserves suppressed preexisting open events byte-for-byte", () => {
  const baseline = stateFixture();
  baseline.interactionEvents = [
    { id: "real-open-1", status: "open", responses: [{ id: "response-1" }], priorityState: { cursor: 2 } },
    { id: "real-open-2", status: "open", responses: [], resolutionState: { status: "pending" } }
  ];
  const working = structuredClone(baseline);
  working.interactionEvents[0].status = "canceled";
  working.interactionEvents[0].cancellationReason = "temporary sandbox display";
  working.interactionEvents.push({ id: "scenario-event", status: "open", sandboxOrigin: true });
  working.testingTools = {
    ignoreTurnOrder: true,
    freeMode: true,
    controlledPlayerId: "scenario-player",
    activeScenario: { suppressedInteractionEventIds: ["real-open-1", "real-open-2"] }
  };
  const candidate = prepareCommitCandidate({ workingState: working, baselineState: baseline });
  assert.equal(candidate.interactionEvents.length, 3);
  assert.deepEqual(candidate.interactionEvents.slice(0, 2), baseline.interactionEvents);
  assert.deepEqual(candidate.interactionEvents.find((event) => event.id === "scenario-event"), working.interactionEvents[2]);
});

test("[TSB-012] commit candidate strips testing controls and transient client state", () => {
  const baseline = stateFixture();
  baseline.testingTools = { ignoreTurnOrder: false, freeMode: false, controlledPlayerId: "real-controller", activeScenario: null };
  baseline.activePlayerId = "real-controller";
  baseline.activePage = "battlePhase";
  baseline.liveRefereeScreen = "play";
  baseline.liveRefereeCollapsed = true;
  baseline.liveTable = { currentPendingEventId: "real-event", resolutionAnnouncements: [{ id: "real-announcement" }] };
  const working = structuredClone(baseline);
  working.testingTools = { ignoreTurnOrder: true, freeMode: true, controlledPlayerId: "sandbox-controller", activeScenario: { id: "scenario" } };
  working.activePlayerId = "sandbox-controller";
  working.activePage = "info";
  working.liveRefereeScreen = "tokenList";
  working.liveRefereeCollapsed = false;
  working.liveTable = { currentPendingEventId: "scenario-event", resolutionAnnouncements: [{ id: "scenario-announcement" }] };
  const candidate = prepareCommitCandidate({ workingState: working, baselineState: baseline });
  assert.deepEqual(candidate.testingTools, baseline.testingTools);
  assert.equal(candidate.activePlayerId, baseline.activePlayerId);
  assert.equal(candidate.activePage, baseline.activePage);
  assert.equal(candidate.liveRefereeScreen, baseline.liveRefereeScreen);
  assert.equal(candidate.liveRefereeCollapsed, baseline.liveRefereeCollapsed);
  assert.deepEqual(candidate.liveTable, baseline.liveTable);
});

test("[TSB-013] post-discard connected revision reloads newer authoritative state", async () => {
  let loadedRevision = 5;
  let loadCount = 0;
  const result = await synchronizeConnectedRevision({
    connectedRevision: 6,
    loadedRevision,
    loadAuthoritative: async () => {
      loadCount += 1;
      loadedRevision = 6;
      return { version: loadedRevision, state: stateFixture("revision-6") };
    }
  });
  assert.equal(result.reloaded, true);
  assert.equal(result.revision, 6);
  assert.equal(loadCount, 1);
});

test("[TSB-014] post-commit connected revision does not reload an already-current client", async () => {
  let loadCount = 0;
  const result = await synchronizeConnectedRevision({
    connectedRevision: 6,
    loadedRevision: 6,
    loadAuthoritative: async () => {
      loadCount += 1;
      return { version: 6 };
    }
  });
  assert.equal(result.reloaded, false);
  assert.equal(result.revision, 6);
  assert.equal(loadCount, 0);
});

let serverProcess;
let serverBaseUrl;
let serverDataDir;

async function availablePort() {
  const listener = net.createServer();
  await new Promise((resolve, reject) => listener.listen(0, "127.0.0.1", resolve).once("error", reject));
  const port = listener.address().port;
  await new Promise((resolve) => listener.close(resolve));
  return port;
}

async function waitForServer(url, timeoutMs = 5000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(`${url}/api/health`);
      if (response.ok) return;
    } catch {
      // Server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  throw new Error("Timed out waiting for sandbox test server.");
}

before(async () => {
  const port = await availablePort();
  serverBaseUrl = `http://127.0.0.1:${port}`;
  serverDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "rival-saga-sandbox-test-"));
  serverProcess = spawn(process.execPath, [path.join(__dirname, "..", "server.js")], {
    cwd: path.join(__dirname, ".."),
    env: { ...process.env, PORT: String(port), RIVAL_SAGA_DATA_DIR: serverDataDir },
    stdio: ["ignore", "pipe", "pipe"]
  });
  await waitForServer(serverBaseUrl);
});

after(async () => {
  if (serverProcess && !serverProcess.killed) serverProcess.kill();
  await new Promise((resolve) => setTimeout(resolve, 50));
  if (serverDataDir && fs.existsSync(serverDataDir)) fs.rmSync(serverDataDir, { recursive: true, force: true });
});

test("[TSB-015] server atomically rejects stale sandbox revisions and preserves newer state", async () => {
  const first = await fetch(`${serverBaseUrl}/api/games/sandbox-test/state`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      expectedVersion: 0,
      sandboxSessionId: "sandbox-http-1",
      commitType: "token-scenario",
      state: stateFixture("revision-1")
    })
  });
  assert.equal(first.status, 200);
  assert.equal((await first.json()).version, 1);

  const stale = await fetch(`${serverBaseUrl}/api/games/sandbox-test/state`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      expectedVersion: 0,
      sandboxSessionId: "sandbox-http-stale",
      commitType: "token-scenario",
      state: stateFixture("must-not-win")
    })
  });
  const stalePayload = await stale.json();
  assert.equal(stale.status, 409);
  assert.equal(stalePayload.currentVersion, 1);

  const afterConflict = await fetch(`${serverBaseUrl}/api/games/sandbox-test/state`).then((response) => response.json());
  assert.equal(afterConflict.version, 1);
  assert.equal(afterConflict.state.marker, "revision-1");

  const second = await fetch(`${serverBaseUrl}/api/games/sandbox-test/state`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      expectedVersion: 1,
      sandboxSessionId: "sandbox-http-2",
      commitType: "token-scenario",
      state: stateFixture("revision-2")
    })
  });
  assert.equal(second.status, 200);
  assert.equal((await second.json()).version, 2);

  const finalState = await fetch(`${serverBaseUrl}/api/games/sandbox-test/state`).then((response) => response.json());
  assert.equal(finalState.version, 2);
  assert.equal(finalState.state.marker, "revision-2");
});

test("[TSB-016] ambiguous successful commit is recovered and never applied twice", async () => {
  const committedState = stateFixture("ambiguous-success");
  committedState.sandboxCommitHistory = [{
    sessionId: "sandbox-ambiguous-1",
    scenarioName: "Recovery Test",
    committedAt: "2026-01-01T00:00:00.000Z"
  }];
  const accepted = await fetch(`${serverBaseUrl}/api/games/sandbox-recovery/state`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      expectedVersion: 0,
      sandboxSessionId: "sandbox-ambiguous-1",
      commitType: "token-scenario",
      state: committedState
    })
  });
  assert.equal(accepted.status, 200);

  const recovered = await fetch(`${serverBaseUrl}/api/games/sandbox-recovery/state`).then((response) => response.json());
  assert.equal(recovered.version, 1);
  assert.ok(committedSessionRecord(recovered, "sandbox-ambiguous-1"));
  assert.equal(recovered.state.marker, "ambiguous-success");

  const duplicate = await fetch(`${serverBaseUrl}/api/games/sandbox-recovery/state`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      expectedVersion: 0,
      sandboxSessionId: "sandbox-ambiguous-1",
      commitType: "token-scenario",
      state: stateFixture("must-not-apply-twice")
    })
  });
  const duplicatePayload = await duplicate.json();
  assert.equal(duplicate.status, 200);
  assert.equal(duplicatePayload.alreadyCommitted, true);
  assert.equal(duplicatePayload.version, 1);

  const finalState = await fetch(`${serverBaseUrl}/api/games/sandbox-recovery/state`).then((response) => response.json());
  assert.equal(finalState.version, 1);
  assert.equal(finalState.state.marker, "ambiguous-success");
});

test("[TSB-017] server rejects structurally invalid state and serves sandbox assets", async () => {
  const invalid = await fetch(`${serverBaseUrl}/api/games/sandbox-invalid/state`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ expectedVersion: 0, state: { players: [] } })
  });
  assert.equal(invalid.status, 400);
  const moduleAsset = await fetch(`${serverBaseUrl}/token-sandbox-session.js`);
  const controllerAsset = await fetch(`${serverBaseUrl}/token-control-controller.js`);
  const browserHarnessAsset = await fetch(`${serverBaseUrl}/token-qa-harness.html`);
  const rulesAsset = await fetch(`${serverBaseUrl}/SAGA_TOKEN_RULES.md`);
  assert.equal(moduleAsset.status, 200);
  assert.equal(controllerAsset.status, 200);
  assert.equal(browserHarnessAsset.status, 200);
  assert.equal(rulesAsset.status, 200);
});

test("[TSB-018] application wiring contains low-level guards and revision-bound commit", () => {
  const source = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
  const entryFunction = source.slice(
    source.indexOf("async function prepareTokenScenarioSandboxEntry"),
    source.indexOf("function syncTokenSandboxBanner")
  );
  const discardFunction = source.slice(
    source.indexOf("async function discardTokenScenarioSandbox"),
    source.indexOf("async function finalizeSuccessfulTokenSandboxCommit")
  );
  assert.match(source, /function writeStoredState[\s\S]*canPersistGameplay/);
  assert.match(source, /function cancelQueuedGameplayPersistence/);
  assert.doesNotMatch(entryFunction, /writeStoredState\(/);
  assert.doesNotMatch(discardFunction, /writeStoredState\(/);
  assert.match(source, /if \(tokenScenarioSandboxActive\(\)\) \{\s*tokenScenarioSandbox\.bufferRemoteEvent/);
  assert.match(source, /expectedVersion: commit\.expectedRevision/);
  assert.match(source, /sandboxSessionId: commit\.sessionId/);
  assert.match(source, /await fetchAuthoritativeGameState\(\)/);
});

test("[TSB-019] real controller mutations discard cleanly and commit to authoritative state exactly once", async () => {
  const gameId = "sandbox-controller-commit";
  const baselineState = controlStateFixture("sandbox-controller-baseline");
  const seeded = await fetch(`${serverBaseUrl}/api/games/${gameId}/state`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ expectedVersion: 0, state: baselineState })
  });
  assert.equal(seeded.status, 200);
  assert.equal((await seeded.json()).version, 1);

  const before = await fetch(`${serverBaseUrl}/api/games/${gameId}/state`).then((response) => response.json());
  assert.equal(before.version, 1);
  assert.equal(before.state.lingeringStatuses.length, 0);
  assert.equal(before.state.tokenConsumptions.length, 0);
  assert.equal(before.state.tokenActivations.length, 0);

  const discardManager = createSessionManager({ createSessionId: () => "sandbox-controller-discard" });
  const discardEntry = discardManager.enter({
    realState: before.state,
    revision: before.version,
    revisionVerified: true,
    persistenceQuiescent: true,
    scenarioName: "Controller Restrict Discard"
  });
  const discardController = createScenarioController(discardEntry.workingState, {
    idPrefix: "sandbox-discard",
    seriesOrder: ["Kanto", "Johto", "Hoenn"]
  });
  const discardedDeclaration = discardController.declare({
    tokenId: "restrict-token",
    actorPlayerId: "steevee",
    tokenInventoryId: "steevee-restrict-1",
    targetPokemonId: "red-garchomp",
    speciesName: "Garchomp"
  });
  assert.equal(discardedDeclaration.ok, true, discardedDeclaration.reason);
  assert.equal(discardController.resolve(discardedDeclaration.event.id).ok, true);
  discardManager.setWorkingState(discardController.getState());
  assert.equal(discardManager.canPersistGameplay({ sessionId: "sandbox-controller-discard" }), false);
  assert.equal(discardController.getState().lingeringStatuses.filter((status) => status.type === "restrict").length, 1);

  const authoritativeDuringDiscard = await fetch(`${serverBaseUrl}/api/games/${gameId}/state`).then((response) => response.json());
  assert.equal(authoritativeDuringDiscard.version, 1);
  assert.equal(authoritativeDuringDiscard.state.lingeringStatuses.length, 0);
  const discarded = discardManager.discard({ authoritativeState: authoritativeDuringDiscard.state });
  assert.equal(discarded.usedFallback, false);
  assert.equal(discarded.state.lingeringStatuses.length, 0);
  assert.equal(discarded.state.tokenConsumptions.length, 0);
  assert.equal(discarded.state.tokenActivations.length, 0);

  const commitManager = createSessionManager({
    createSessionId: () => "sandbox-controller-commit-session",
    now: () => "2026-07-24T14:00:00.000Z"
  });
  const commitEntry = commitManager.enter({
    realState: authoritativeDuringDiscard.state,
    revision: authoritativeDuringDiscard.version,
    revisionVerified: true,
    persistenceQuiescent: true,
    scenarioName: "Controller Restrict Commit"
  });
  commitEntry.workingState.testingTools = {
    ignoreTurnOrder: true,
    freeMode: true,
    controlledPlayerId: "steevee",
    activeScenario: { id: "temporary-controller-scenario" }
  };
  const commitController = createScenarioController(commitEntry.workingState, {
    idPrefix: "sandbox-commit",
    seriesOrder: ["Kanto", "Johto", "Hoenn"]
  });
  const committedDeclaration = commitController.declare({
    tokenId: "restrict-token",
    actorPlayerId: "steevee",
    tokenInventoryId: "steevee-restrict-1",
    targetPokemonId: "red-garchomp",
    speciesName: "Garchomp"
  });
  assert.equal(committedDeclaration.ok, true, committedDeclaration.reason);
  assert.equal(commitController.resolve(committedDeclaration.event.id).ok, true);
  commitManager.setWorkingState(commitController.getState());
  const candidate = prepareCommitCandidate({
    workingState: commitController.getState(),
    baselineState: authoritativeDuringDiscard.state
  });
  candidate.sandboxCommitHistory ||= [];
  candidate.sandboxCommitHistory.push({
    sessionId: "sandbox-controller-commit-session",
    scenarioName: "Controller Restrict Commit",
    committedAt: "2026-07-24T14:00:00.000Z"
  });
  const commit = commitManager.beginCommit({
    currentRevision: authoritativeDuringDiscard.version,
    workingState: candidate
  });
  assert.equal(commit.ok, true);
  assert.equal(commitManager.canPersistGameplay({ sessionId: commit.sessionId }), true);

  const committedResponse = await fetch(`${serverBaseUrl}/api/games/${gameId}/state`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      expectedVersion: commit.expectedRevision,
      sandboxSessionId: commit.sessionId,
      commitType: "token-scenario",
      state: commit.state
    })
  });
  assert.equal(committedResponse.status, 200);
  assert.equal((await committedResponse.json()).version, 2);
  commitManager.completeCommit();

  const after = await fetch(`${serverBaseUrl}/api/games/${gameId}/state`).then((response) => response.json());
  assert.equal(after.version, 2);
  assert.equal(after.state.lingeringStatuses.filter((status) => status.type === "restrict" && status.status === "active").length, 1);
  assert.equal(after.state.tokenConsumptions.filter((entry) => entry.tokenName === "Restrict").length, 1);
  assert.equal(after.state.tokenActivations.filter((entry) => entry.tokenName === "Restrict").length, 1);
  assert.equal(after.state.testingTools.freeMode, false);
  assert.equal(after.state.testingTools.activeScenario, null);
  assert.equal(after.state.globalPokemonRules.garchomp.sourceStatusId, after.state.lingeringStatuses.find((status) => status.type === "restrict").id);

  const duplicate = await fetch(`${serverBaseUrl}/api/games/${gameId}/state`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      expectedVersion: 1,
      sandboxSessionId: "sandbox-controller-commit-session",
      commitType: "token-scenario",
      state: commit.state
    })
  });
  const duplicatePayload = await duplicate.json();
  assert.equal(duplicate.status, 200);
  assert.equal(duplicatePayload.alreadyCommitted, true);
  assert.equal(duplicatePayload.version, 2);
  const finalAuthoritative = await fetch(`${serverBaseUrl}/api/games/${gameId}/state`).then((response) => response.json());
  assert.equal(finalAuthoritative.version, 2);
  assert.equal(finalAuthoritative.state.lingeringStatuses.filter((status) => status.type === "restrict").length, 1);
  assert.equal(finalAuthoritative.state.tokenConsumptions.filter((entry) => entry.tokenName === "Restrict").length, 1);
  assert.equal(finalAuthoritative.state.tokenActivations.filter((entry) => entry.tokenName === "Restrict").length, 1);
});

test("[TSB-020] Arena Trap team ownership discards exactly and commits once without duplication", async () => {
  const gameId = "sandbox-arena-team-ownership";
  const baselineState = controlStateFixture("sandbox-arena-baseline");
  const seeded = await fetch(`${serverBaseUrl}/api/games/${gameId}/state`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ expectedVersion: 0, state: baselineState })
  });
  assert.equal(seeded.status, 200);
  assert.equal((await seeded.json()).version, 1);

  const discardManager = createSessionManager({ createSessionId: () => "sandbox-arena-discard" });
  const discardEntry = discardManager.enter({
    realState: baselineState,
    revision: 1,
    revisionVerified: true,
    persistenceQuiescent: true,
    scenarioName: "Arena Trap Discard"
  });
  const discardController = createScenarioController(discardEntry.workingState, {
    idPrefix: "sandbox-arena-discard",
    seriesOrder: ["Kanto", "Johto", "Hoenn"]
  });
  const discardedDeclaration = discardController.declare({
    tokenId: "arena-trap",
    actorPlayerId: "steevee",
    tokenInventoryId: "steevee-arena-1",
    targetPokemonId: "red-garchomp"
  });
  assert.equal(discardedDeclaration.ok, true, discardedDeclaration.reason);
  assert.equal(discardController.resolve(discardedDeclaration.event.id).ok, true);
  const sandboxState = discardController.getState();
  assert.equal(sandboxState.battleTeams["Kanto:G1"].red.selected.includes("red-garchomp"), true);
  assert.equal(sandboxState.teambuilder.buildsByPlayerId.red[0].slots.some((slot) => slot.pokemonRecordId === "red-garchomp"), true);
  discardManager.setWorkingState(sandboxState);

  const authoritative = await fetch(`${serverBaseUrl}/api/games/${gameId}/state`).then((response) => response.json());
  const discarded = discardManager.discard({ authoritativeState: authoritative.state });
  assert.deepEqual(discarded.state.teambuilder, baselineState.teambuilder);
  assert.deepEqual(discarded.state.battleTeams, baselineState.battleTeams);
  assert.equal(discarded.state.lingeringStatuses.length, 0);
  assert.equal(discarded.state.tokenConsumptions.length, 0);

  const commitManager = createSessionManager({
    createSessionId: () => "sandbox-arena-commit",
    now: () => "2026-07-24T15:00:00.000Z"
  });
  const commitEntry = commitManager.enter({
    realState: authoritative.state,
    revision: authoritative.version,
    revisionVerified: true,
    persistenceQuiescent: true,
    scenarioName: "Arena Trap Commit"
  });
  const commitController = createScenarioController(commitEntry.workingState, {
    idPrefix: "sandbox-arena-commit",
    seriesOrder: ["Kanto", "Johto", "Hoenn"]
  });
  const committedDeclaration = commitController.declare({
    tokenId: "arena-trap",
    actorPlayerId: "steevee",
    tokenInventoryId: "steevee-arena-1",
    targetPokemonId: "red-garchomp"
  });
  assert.equal(committedDeclaration.ok, true, committedDeclaration.reason);
  assert.equal(commitController.resolve(committedDeclaration.event.id).ok, true);
  commitManager.setWorkingState(commitController.getState());
  const candidate = prepareCommitCandidate({
    workingState: commitController.getState(),
    baselineState: authoritative.state
  });
  candidate.sandboxCommitHistory ||= [];
  candidate.sandboxCommitHistory.push({
    sessionId: "sandbox-arena-commit",
    scenarioName: "Arena Trap Commit",
    committedAt: "2026-07-24T15:00:00.000Z"
  });
  const commit = commitManager.beginCommit({ currentRevision: authoritative.version, workingState: candidate });
  assert.equal(commit.ok, true);

  const committedResponse = await fetch(`${serverBaseUrl}/api/games/${gameId}/state`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      expectedVersion: commit.expectedRevision,
      sandboxSessionId: commit.sessionId,
      commitType: "token-scenario",
      state: commit.state
    })
  });
  assert.equal(committedResponse.status, 200);
  assert.equal((await committedResponse.json()).version, 2);
  commitManager.completeCommit();

  const duplicate = await fetch(`${serverBaseUrl}/api/games/${gameId}/state`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      expectedVersion: 1,
      sandboxSessionId: "sandbox-arena-commit",
      commitType: "token-scenario",
      state: commit.state
    })
  });
  const duplicatePayload = await duplicate.json();
  assert.equal(duplicate.status, 200);
  assert.equal(duplicatePayload.alreadyCommitted, true);
  assert.equal(duplicatePayload.version, 2);

  const finalState = await fetch(`${serverBaseUrl}/api/games/${gameId}/state`).then((response) => response.json());
  const arenaStatuses = finalState.state.lingeringStatuses.filter((status) => status.type === "arena-trap" && status.status === "active");
  const selectedSlots = finalState.state.teambuilder.buildsByPlayerId.red[0].slots.filter((slot) => slot.pokemonRecordId === "red-garchomp");
  const selectedTeamMembers = finalState.state.battleTeams["Kanto:G1"].red.selected.filter((id) => id === "red-garchomp");
  assert.equal(arenaStatuses.length, 1);
  assert.equal(arenaStatuses[0].payload.teamSlotLock, true);
  assert.equal(selectedSlots.length, 1);
  assert.equal(selectedTeamMembers.length, 1);
  assert.equal(finalState.state.tokenConsumptions.filter((entry) => entry.tokenName === "Arena Trap").length, 1);
  assert.equal(finalState.state.tokenActivations.filter((entry) => entry.tokenName === "Arena Trap").length, 1);
});

test("[TSB-021] Incinerate and Steal operations discard exactly and commit once without duplication", async () => {
  const gameId = "sandbox-control-operations";
  const baselineState = controlStateFixture("sandbox-control-operations-baseline");
  baselineState.battleTeams = {
    "Kanto:G1": {
      red: { selected: ["red-lucario", "red-garchomp"], badgeBoosts: [1, 0], locked: false }
    }
  };
  baselineState.teambuilder = {
    ...baselineState.teambuilder,
    activeBuildByPlayerId: { red: "sandbox-red-build" },
    buildsByPlayerId: {
      red: [{
        id: "sandbox-red-build",
        series: "Kanto",
        gym: 1,
        slots: [
          { slotIndex: 0, pokemonRecordId: "red-lucario" },
          { slotIndex: 1, pokemonRecordId: "red-garchomp" }
        ]
      }]
    }
  };
  const controllerOptions = {
    seriesOrder: ["Kanto", "Johto", "Hoenn"],
    resourceDefinitionForName: (name) => String(name || "").trim().toLowerCase() === "leftovers"
      ? { name: "Leftovers", type: "ITEM" }
      : null
  };
  const runOperations = (workingState, idPrefix) => {
    const scenarioController = createScenarioController(workingState, { ...controllerOptions, idPrefix });
    const incinerate = scenarioController.declare({
      tokenId: "incinerate",
      actorPlayerId: "steevee",
      tokenInventoryId: "steevee-incinerate-1",
      resourceSelections: [
        { playerId: "gold", resourceId: "gold-leftovers" },
        { playerId: "red", resourceId: "red-recover" }
      ]
    });
    assert.equal(incinerate.ok, true, incinerate.reason);
    assert.equal(scenarioController.resolve(incinerate.event.id).resolution.result, "resolved");
    const steal = scenarioController.declare({
      tokenId: "steal-token",
      actorPlayerId: "steevee",
      tokenInventoryId: "steevee-steal-1",
      targetPokemonId: "red-lucario"
    });
    assert.equal(steal.ok, true, steal.reason);
    assert.equal(scenarioController.resolve(steal.event.id).resolution.result, "resolved");
    return scenarioController;
  };

  const seeded = await fetch(`${serverBaseUrl}/api/games/${gameId}/state`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ expectedVersion: 0, state: baselineState })
  });
  assert.equal(seeded.status, 200);
  assert.equal((await seeded.json()).version, 1);

  const discardManager = createSessionManager({ createSessionId: () => "sandbox-operations-discard" });
  const discardEntry = discardManager.enter({
    realState: baselineState,
    revision: 1,
    revisionVerified: true,
    persistenceQuiescent: true,
    scenarioName: "Control Operations Discard"
  });
  const discardController = runOperations(discardEntry.workingState, "sandbox-operations-discard");
  assert.equal(discardController.getState().effectOperations.length, 3);
  assert.equal(discardController.getState().pokemonRecords.find((pokemon) => pokemon.id === "red-lucario").trainerId, "steevee");
  discardManager.setWorkingState(discardController.getState());
  const authoritative = await fetch(`${serverBaseUrl}/api/games/${gameId}/state`).then((response) => response.json());
  assert.equal(authoritative.version, 1);
  assert.equal(authoritative.state.effectOperations.length, 0);
  assert.equal(authoritative.state.pokemonRecords.find((pokemon) => pokemon.id === "red-lucario").trainerId, "red");
  const discarded = discardManager.discard({ authoritativeState: authoritative.state });
  assert.equal(discarded.state.effectOperations.length, 0);
  assert.equal(discarded.state.players.find((player) => player.id === "gold").inventory.some((item) => item.id === "gold-leftovers"), true);
  assert.equal(discarded.state.pokemonRecords.find((pokemon) => pokemon.id === "red-lucario").trainerId, "red");

  const commitManager = createSessionManager({
    createSessionId: () => "sandbox-operations-commit",
    now: () => "2026-07-24T16:00:00.000Z"
  });
  const commitEntry = commitManager.enter({
    realState: authoritative.state,
    revision: authoritative.version,
    revisionVerified: true,
    persistenceQuiescent: true,
    scenarioName: "Control Operations Commit"
  });
  const commitController = runOperations(commitEntry.workingState, "sandbox-operations-commit");
  const candidate = prepareCommitCandidate({
    workingState: commitController.getState(),
    baselineState: authoritative.state
  });
  candidate.sandboxCommitHistory ||= [];
  candidate.sandboxCommitHistory.push({
    sessionId: "sandbox-operations-commit",
    scenarioName: "Control Operations Commit",
    committedAt: "2026-07-24T16:00:00.000Z"
  });
  const commit = commitManager.beginCommit({ currentRevision: authoritative.version, workingState: candidate });
  assert.equal(commit.ok, true);
  const committedResponse = await fetch(`${serverBaseUrl}/api/games/${gameId}/state`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      expectedVersion: commit.expectedRevision,
      sandboxSessionId: commit.sessionId,
      commitType: "token-scenario",
      state: commit.state
    })
  });
  assert.equal(committedResponse.status, 200);
  assert.equal((await committedResponse.json()).version, 2);
  commitManager.completeCommit();

  const duplicate = await fetch(`${serverBaseUrl}/api/games/${gameId}/state`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      expectedVersion: 1,
      sandboxSessionId: "sandbox-operations-commit",
      commitType: "token-scenario",
      state: commit.state
    })
  });
  const duplicatePayload = await duplicate.json();
  assert.equal(duplicate.status, 200);
  assert.equal(duplicatePayload.alreadyCommitted, true);
  assert.equal(duplicatePayload.version, 2);

  const finalState = await fetch(`${serverBaseUrl}/api/games/${gameId}/state`).then((response) => response.json());
  assert.equal(finalState.version, 2);
  assert.equal(finalState.state.effectOperations.filter((operation) => operation.operationType === "destroyInventoryResource").length, 2);
  assert.equal(finalState.state.effectOperations.filter((operation) => operation.operationType === "transferPokemonOwnership").length, 1);
  assert.equal(finalState.state.pokemonRecords.find((pokemon) => pokemon.id === "red-lucario").trainerId, "steevee");
  assert.equal(finalState.state.players.find((player) => player.id === "gold").inventory.some((item) => item.id === "gold-leftovers"), false);
  assert.equal(finalState.state.tokenConsumptions.filter((entry) => ["Incinerate", "Steal"].includes(entry.tokenName)).length, 2);
});

test("[TSB-022] Wicked Blow resolves only in the sandbox clone and discard restores the exact Active Roster instance", () => {
  const baseline = controlStateFixture("sandbox-wicked-baseline");
  baseline.battleTeams = {};
  baseline.teambuilder = {
    ...baseline.teambuilder,
    activeBuildByPlayerId: { red: "sandbox-wicked-build" },
    buildsByPlayerId: {
      red: [{
        id: "sandbox-wicked-build",
        playerId: "red",
        series: "Kanto",
        gym: 1,
        slots: [{ slotIndex: 0, pokemonRecordId: "red-garchomp-2", selectedBattleSpecies: "Garchomp", moves: ["Dragon Claw"] }]
      }]
    }
  };
  const baselineBytes = JSON.stringify(baseline);
  const manager = createSessionManager({ createSessionId: () => "sandbox-wicked" });
  const entered = manager.enter({
    realState: baseline,
    revision: 3,
    revisionVerified: true,
    persistenceQuiescent: true,
    scenarioName: "Wicked Blow"
  });
  const controller = createScenarioController(entered.workingState, {
    idPrefix: "sandbox-wicked",
    seriesOrder: ["Kanto", "Johto", "Hoenn"],
    wickedBlowReplacementPlan: (_state, pokemon, targetContext) => targetContext.preview
      ? { ok: true, poolSize: 2, tierCalculation: { finalEvolutionTier: "Great Elite", replacementTier: "Poke" } }
      : {
        ok: true,
        replacementSpecies: "Barbaracle",
        teamSpecies: "Barbaracle",
        pokemonPatch: { ...pokemon, name: "Barbaracle", currentSpecies: "Barbaracle" },
        assignedBadgePoints: 0,
        poolSize: 2,
        tierCalculation: { finalEvolutionTier: "Great Elite", replacementTier: "Poke", orderedStepsBelow: 3 },
        teambuilderSlotPatch: (_slot, index) => ({ pokemonRecordId: pokemon.id, slotIndex: index, selectedBattleSpecies: "Barbaracle", moves: ["", "", "", ""] })
      }
  });
  const declared = controller.declare({
    tokenId: "wicked-blow",
    actorPlayerId: "steevee",
    tokenInventoryId: "steevee-wicked-1",
    targetPokemonId: "red-garchomp-2"
  });
  assert.equal(declared.ok, true, declared.reason);
  const resolved = controller.resolve(declared.event.id);
  assert.equal(resolved.ok, true);
  assert.equal(resolved.resolution.result, "resolved");
  assert.equal(controller.getState().pokemonRecords.find((pokemon) => pokemon.id === "red-garchomp-2").name, "Barbaracle");
  assert.equal(controller.getState().teambuilder.buildsByPlayerId.red[0].slots[0].selectedBattleSpecies, "Barbaracle");
  assert.deepEqual(controller.getState().battleTeams, {});
  assert.equal(controller.getState().effectOperations[0].operationType, "rerollPokemon");
  assert.equal(JSON.stringify(baseline), baselineBytes);

  manager.setWorkingState(controller.getState());
  const discarded = manager.discard({ authoritativeState: structuredClone(baseline) });
  assert.equal(discarded.state.pokemonRecords.find((pokemon) => pokemon.id === "red-garchomp-2").name, "Garchomp");
  assert.deepEqual(discarded.state.battleTeams, {});
  assert.equal(discarded.state.teambuilder.buildsByPlayerId.red[0].slots[0].selectedBattleSpecies, "Garchomp");
  assert.equal(discarded.state.teambuilder.buildsByPlayerId.red[0].slots[0].moves[0], "Dragon Claw");
  assert.equal(discarded.state.effectOperations.length, 0);
});

test("[TSB-023] standard Curse status and configured set remain isolated until a sandbox commit candidate is prepared", () => {
  const baseline = controlStateFixture("sandbox-standard-curse-baseline");
  baseline.teambuilder = {
    ...baseline.teambuilder,
    activeBuildByPlayerId: { red: "sandbox-standard-curse-build" },
    buildsByPlayerId: {
      red: [{
        id: "sandbox-standard-curse-build",
        playerId: "red",
        series: "Kanto",
        gym: 1,
        slots: [{ slotIndex: 0, pokemonRecordId: "red-garchomp", item: "Leftovers", nature: "Jolly", moves: ["Earthquake"] }]
      }]
    }
  };
  const baselineBytes = JSON.stringify(baseline);
  const manager = createSessionManager({ createSessionId: () => "sandbox-standard-curse" });
  const entered = manager.enter({
    realState: baseline,
    revision: 8,
    revisionVerified: true,
    persistenceQuiescent: true,
    scenarioName: "Standard Curse"
  });
  const controller = createScenarioController(entered.workingState, {
    idPrefix: "sandbox-standard-curse",
    seriesOrder: ["Kanto", "Johto", "Hoenn"]
  });
  const declared = controller.declare({
    tokenId: "flame-curse",
    actorPlayerId: "steevee",
    tokenInventoryId: "steevee-flame-1",
    targetPokemonId: "red-garchomp"
  });
  assert.equal(declared.ok, true, declared.reason);
  assert.equal(controller.resolve(declared.event.id).resolution.result, "resolved");
  assert.equal(JSON.stringify(baseline), baselineBytes);
  assert.equal(controller.getState().lingeringStatuses.filter((status) => status.type === "curse-flame-orb" && status.status === "active").length, 1);
  assert.equal(controller.getState().teambuilder.buildsByPlayerId.red[0].slots[0].item, "Leftovers");

  manager.setWorkingState(controller.getState());
  const candidate = prepareCommitCandidate({ workingState: controller.getState(), baselineState: baseline });
  assert.equal(candidate.lingeringStatuses.filter((status) => status.type === "curse-flame-orb" && status.status === "active").length, 1);
  assert.equal(candidate.tokenConsumptions.filter((entry) => entry.tokenName === "Flame Curse").length, 1);
  const discarded = manager.discard({ authoritativeState: structuredClone(baseline) });
  assert.equal(discarded.state.lingeringStatuses.length, 0);
  assert.equal(discarded.state.tokenConsumptions.length, 0);
  assert.equal(discarded.state.teambuilder.buildsByPlayerId.red[0].slots[0].item, "Leftovers");
});

test("[TSB-024] Extra Encounter mutates only the sandbox clone and discard removes the exact grant", () => {
  const baseline = controlStateFixture("sandbox-extra-encounter-baseline");
  baseline.currentPhase = "action";
  baseline.phaseState = { "Kanto:G1": { currentPhase: "action", flowState: "action" } };
  baseline.encounterSessions = [];
  const baselineBytes = JSON.stringify(baseline);
  const manager = createSessionManager({ createSessionId: () => "sandbox-extra-encounter" });
  const entered = manager.enter({
    realState: baseline,
    revision: 9,
    revisionVerified: true,
    persistenceQuiescent: true,
    scenarioName: "Extra Encounter"
  });
  const result = encounterTokenRuntime.grantExtraEncounter(entered.workingState, {
    playerId: "gold",
    sourceTokenId: "steevee-extra-encounter-1",
    sourceActivationId: "activation-extra-encounter-1"
  }, {
    wheelDefinition: { id: "kanto-gym-1", entries: [{ id: "abra", pokemonName: "Abra", weight: 1 }] },
    sessionId: "sandbox-extra-session",
    grantId: "sandbox-extra-grant"
  });
  assert.equal(result.ok, true);
  assert.equal(result.session.playerId, "gold");
  assert.equal(result.session.maxRolls, 1);
  assert.equal(JSON.stringify(baseline), baselineBytes);

  manager.setWorkingState(entered.workingState);
  const candidate = prepareCommitCandidate({ workingState: entered.workingState, baselineState: baseline });
  assert.equal(candidate.encounterSessions.length, 1);
  assert.equal(candidate.encounterSessions[0].extraEncounterGrants[0].id, "sandbox-extra-grant");
  const discarded = manager.discard({ authoritativeState: structuredClone(baseline) });
  assert.deepEqual(discarded.state.encounterSessions, []);
});

test("[TSB-025] Immunity negation and both consumptions remain isolated in the sandbox clone", () => {
  const baseline = controlStateFixture("sandbox-immunity-baseline");
  const baselineBytes = JSON.stringify(baseline);
  const manager = createSessionManager({ createSessionId: () => "sandbox-immunity" });
  const entered = manager.enter({
    realState: baseline,
    revision: 10,
    revisionVerified: true,
    persistenceQuiescent: true,
    scenarioName: "Immunity"
  });
  const controller = createScenarioController(entered.workingState, {
    idPrefix: "sandbox-immunity",
    seriesOrder: ["Kanto", "Johto", "Hoenn"]
  });
  const declared = controller.declare({
    tokenId: "restrict-token",
    actorPlayerId: "steevee",
    tokenInventoryId: "steevee-restrict-1",
    targetPokemonId: "red-garchomp",
    speciesName: "Garchomp"
  });
  assert.equal(declared.ok, true, declared.reason);
  const immunity = controller.respondImmunity(declared.event.id, {
    playerId: "red",
    tokenInventoryId: "red-immunity-1"
  });
  assert.equal(immunity.ok, true, immunity.reason);
  assert.equal(immunity.event.resolution, "negated-by-immunity");
  assert.equal(controller.getState().lingeringStatuses.filter((status) => status.type === "restrict" && status.status === "active").length, 0);
  assert.equal(controller.getState().tokenConsumptions.length, 2);
  assert.equal(JSON.stringify(baseline), baselineBytes);

  manager.setWorkingState(controller.getState());
  const candidate = prepareCommitCandidate({ workingState: controller.getState(), baselineState: baseline });
  assert.equal(candidate.tokenConsumptions.length, 2);
  assert.equal(candidate.interactionEvents.find((event) => event.id === declared.event.id)?.resolution, "negated-by-immunity");
  const discarded = manager.discard({ authoritativeState: structuredClone(baseline) });
  assert.equal(discarded.state.tokenConsumptions.length, 0);
  assert.equal(discarded.state.players.find((player) => player.id === "red").inventory.some((item) => item.id === "red-immunity-1"), true);
  assert.equal(discarded.state.players.find((player) => player.id === "steevee").inventory.some((item) => item.id === "steevee-restrict-1"), true);
});
