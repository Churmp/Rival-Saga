const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "rival-saga-persistence-"));
const gamesDir = path.join(tempRoot, "games");
fs.mkdirSync(gamesDir, { recursive: true });
fs.writeFileSync(path.join(tempRoot, "users.json"), JSON.stringify({ users: [] }));
fs.writeFileSync(path.join(tempRoot, "ruleset-patches.json"), JSON.stringify({ patches: [] }));

const gameId = "large-persistence-contract";
const orphanedCommitGameId = "orphaned-action-destination-contract";
const manualCompletionGameId = "manual-action-completion-contract";
const outgoingCompletionGameId = "outgoing-action-completion-contract";
const outgoingUndoGameId = "outgoing-action-undo-contract";
const acceptedStartGameId = "accepted-action-start-contract";
const compactedHistoryGameId = "compacted-history-contract";
const routePresenceGameId = "route-presence-contract";
const baseState = {
  players: [{ id: "player-1", name: "Player 1", inventory: [] }],
  pokemonRecords: [],
  interactionEvents: [],
  transactions: [],
  log: [],
  lingeringStatuses: [],
  series: "Hoenn",
  gym: 8,
  currentPhase: "start"
};
fs.writeFileSync(path.join(gamesDir, `${gameId}.json`), JSON.stringify({
  id: gameId,
  name: "Large Persistence Contract",
  version: 7,
  updatedAt: "2026-01-01T00:00:00.000Z",
  state: baseState,
  members: [],
  activity: []
}));
const orphanedCommitState = {
  ...baseState,
  currentPhase: "action",
  actionPhaseState: {
    selections: {
      "Hoenn-G8": {
        series: "Hoenn",
        gym: 8,
        selectedLocationId: "gamecorner",
        playerVisits: { "player-1": [] },
        actionOperations: [],
        activeActionOperationId: "",
        destinationCommit: {
          id: "destination-orphaned",
          requestId: "destination-orphaned",
          status: "resolving",
          playerId: "player-1",
          actionNumber: 1,
          locationId: "gamecorner",
          serviceId: "gamecorner-gamble",
          operationId: "operation-missing"
        }
      }
    },
    seriesTrackers: {}
  }
};
fs.writeFileSync(path.join(gamesDir, `${orphanedCommitGameId}.json`), JSON.stringify({
  id: orphanedCommitGameId,
  name: "Orphaned Action Destination Contract",
  version: 3,
  updatedAt: "2026-01-01T00:00:00.000Z",
  state: orphanedCommitState,
  members: [],
  activity: []
}));
const manualCompletionState = {
  ...baseState,
  currentPhase: "action",
  wheelSessions: [],
  departmentStoreVisits: [{
    id: "department-store-session-1", actionVisitId: "department-store-visit-1", playerId: "player-1",
    series: "Hoenn", gym: 8, status: "active", clearanceProducts: [], normalPurchases: []
  }],
  actionPhaseState: {
    selections: {
      "Hoenn-G8": {
        series: "Hoenn", gym: 8, selectedLocationId: "department-store",
        playerVisits: { "player-1": [{
          id: "department-store-visit-1", playerId: "player-1", locationId: "department-store",
          locationName: "Department Store", serviceId: "department-store-primary", actionCost: 1,
          series: "Hoenn", gym: 8, phase: "action", actionOperationId: "department-store-operation-1",
          actionOperationStatus: "resolving"
        }] },
        actionOperations: [{
          id: "department-store-operation-1", visitId: "department-store-visit-1", playerId: "player-1",
          actionNumber: 1, locationId: "department-store", serviceId: "department-store-primary",
          status: "resolving", linkedFeatureType: "department-store", linkedFeatureSessionId: "department-store-session-1"
        }],
        activeActionOperationId: "department-store-operation-1",
        destinationCommit: {
          id: "department-store-destination-1", requestId: "department-store-destination-1", status: "resolving",
          playerId: "player-1", actionNumber: 1, locationId: "department-store",
          serviceId: "department-store-primary", operationId: "department-store-operation-1"
        }
      }
    },
    seriesTrackers: {}
  }
};
fs.writeFileSync(path.join(gamesDir, `${manualCompletionGameId}.json`), JSON.stringify({
  id: manualCompletionGameId,
  name: "Manual Action Completion Contract",
  version: 5,
  updatedAt: "2026-01-01T00:00:00.000Z",
  state: manualCompletionState,
  members: [],
  activity: []
}));
const activeOutgoingActionState = structuredClone(manualCompletionState);
fs.writeFileSync(path.join(gamesDir, `${outgoingCompletionGameId}.json`), JSON.stringify({
  id: outgoingCompletionGameId,
  name: "Outgoing Action Completion Contract",
  version: 13,
  updatedAt: "2026-01-01T00:00:00.000Z",
  state: activeOutgoingActionState,
  members: [],
  activity: []
}));
fs.writeFileSync(path.join(gamesDir, `${outgoingUndoGameId}.json`), JSON.stringify({
  id: outgoingUndoGameId,
  name: "Outgoing Action Undo Contract",
  version: 17,
  updatedAt: "2026-01-01T00:00:00.000Z",
  state: activeOutgoingActionState,
  members: [],
  activity: []
}));
const acceptedActionStartState = {
  ...baseState, currentPhase: "action", departmentStoreVisits: [],
  actionPhaseState: { selections: { "Hoenn-G8": {
    series: "Hoenn", gym: 8, selectedLocationId: "", playerVisits: { "player-1": [] }, actionOperations: [], activeActionOperationId: "",
    destinationCommit: { id: "department-store-destination-starting", requestId: "department-store-destination-starting", status: "accepted", playerId: "player-1", actionNumber: 1, locationId: "department-store", serviceId: "department-store-primary", operationId: "", acceptedAt: "2026-01-01T00:00:00.000Z" }
  } }, seriesTrackers: {} }
};
fs.writeFileSync(path.join(gamesDir, `${acceptedStartGameId}.json`), JSON.stringify({
  id: acceptedStartGameId,
  name: "Accepted Action Start Contract",
  version: 19,
  updatedAt: "2026-01-01T00:00:00.000Z",
  state: acceptedActionStartState,
  members: [],
  activity: []
}));
const repeatedInventory = [{ id: "inventory-probe", description: "x".repeat(20000) }];
const legacyResolvedActivity = {
  id: "legacy-resolved-activity",
  status: "resolved",
  payload: {
    undoData: {
      actionType: "undoUtilityTokenActivation",
      previousPlayers: [{ id: "player-1", inventory: repeatedInventory }]
    }
  }
};
const compactedHistoryState = {
  ...baseState,
  interactionEvents: [legacyResolvedActivity],
  log: Array.from({ length: 60 }, (_, index) => ({
    id: `phase-log-${index + 1}`,
    eventOrder: index + 1,
    timestamp: new Date(2026, 0, index + 1).toISOString(),
    undoable: true,
    undone: false,
    undoData: {
      actionType: "undoPhaseAdvance",
      previousState: {
        series: "Hoenn", gym: 8, currentPhase: "action", phaseState: { marker: "before" },
        seriesOrder: ["Hoenn"], seriesChoiceRequired: false,
        inventories: { "player-1": repeatedInventory }, pokemonRecords: []
      },
      newState: {
        series: "Hoenn", gym: 8, currentPhase: "battle", phaseState: { marker: "after" },
        seriesOrder: ["Hoenn"], seriesChoiceRequired: false,
        inventories: { "player-1": repeatedInventory }, pokemonRecords: []
      }
    }
  }))
};
fs.writeFileSync(path.join(gamesDir, `${compactedHistoryGameId}.json`), JSON.stringify({
  id: compactedHistoryGameId,
  name: "Compacted History Contract",
  version: 11,
  updatedAt: "2026-01-01T00:00:00.000Z",
  state: compactedHistoryState,
  members: [],
  activity: [legacyResolvedActivity]
}));
const routePresenceState = {
  ...baseState,
  series: "Kanto",
  gym: 3,
  players: [
    { id: "gold", name: "Gold", inventory: [], pokemonIds: ["route-pokemon-gold-001"] },
    { id: "red", name: "Red", inventory: [], pokemonIds: [] }
  ],
  pokemonRecords: [{
    id: "route-pokemon-gold-001",
    name: "Pikachu",
    trainerId: "gold",
    ownerId: "gold",
    source: "Route Encounter",
    routeEncounterMetadata: {
      sourceType: "v2-route-encounter",
      routeNumber: 3,
      playerId: "gold"
    }
  }]
};
fs.writeFileSync(path.join(gamesDir, `${routePresenceGameId}.json`), JSON.stringify({
  id: routePresenceGameId,
  name: "Route Presence Contract",
  version: 23,
  updatedAt: "2026-01-01T00:00:00.000Z",
  state: routePresenceState,
  members: [],
  activity: []
}));

process.env.RIVAL_SAGA_DATA_DIR = tempRoot;
const { server } = require("../server.js");
let origin = "";

test.before(async () => {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  origin = `http://127.0.0.1:${server.address().port}`;
});

test.after(async () => {
  await new Promise((resolve) => server.close(resolve));
  fs.rmSync(tempRoot, { recursive: true, force: true });
});

test("accepts a versioned state payload larger than the former 25 MiB ceiling", async () => {
  const largeState = { ...baseState, persistenceProbe: "x".repeat(26 * 1024 * 1024) };
  const response = await fetch(`${origin}/api/games/${gameId}/state`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ clientId: "persistence-test", expectedVersion: 7, state: largeState })
  });
  assert.equal(response.status, 200);
  const payload = await response.json();
  assert.equal(payload.version, 8);
  const stored = JSON.parse(fs.readFileSync(path.join(gamesDir, `${gameId}.json`), "utf8"));
  assert.equal(stored.version, 8);
  assert.equal(stored.state.persistenceProbe.length, 26 * 1024 * 1024);
  assert.equal(fs.readFileSync(path.join(gamesDir, `${gameId}.json`), "utf8").includes("\n"), false);
});

test("rejects a stale full-state overwrite without changing authoritative state", async () => {
  const response = await fetch(`${origin}/api/games/${gameId}/state`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ clientId: "stale-client", expectedVersion: 7, state: baseState })
  });
  assert.equal(response.status, 409);
  const payload = await response.json();
  assert.equal(payload.error, "version-conflict");
  assert.equal(payload.currentVersion, 8);
  const stored = JSON.parse(fs.readFileSync(path.join(gamesDir, `${gameId}.json`), "utf8"));
  assert.equal(stored.version, 8);
  assert.equal(stored.state.persistenceProbe.length, 26 * 1024 * 1024);
});

test("transient Route public activity is allowlisted and does not revise or persist game state", async () => {
  const response = await fetch(`${origin}/api/games/${routePresenceGameId}/presence/activity`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      clientId: "presence-contract-client",
      stage: "encountered",
      actorPlayerId: "gold",
      actorName: "Untrusted Name",
      seriesId: "Kanto",
      routeNumber: 3,
      publicText: "Gold encountered Mewtwo",
      pokemonName: "Mewtwo",
      pokemonRecordId: "route-pokemon-gold-001",
      privateKnowledgeByPlayerId: { gold: ["resident-secret"] }
    })
  });
  assert.equal(response.status, 202);
  const payload = await response.json();
  assert.equal(payload.activity.stage, "encountered");
  assert.equal(payload.activity.actorName, "Gold");
  assert.equal(payload.activity.routeNumber, 3);
  assert.equal(payload.activity.kind, "v2-route-encounter");
  assert.equal(payload.activity.publicText, undefined);
  assert.equal(payload.activity.pokemonName, undefined);
  assert.equal(payload.activity.pokemonRecordId, undefined);
  assert.equal(payload.activity.privateKnowledgeByPlayerId, undefined);

  const stored = JSON.parse(fs.readFileSync(path.join(gamesDir, `${routePresenceGameId}.json`), "utf8"));
  assert.equal(stored.version, 23);
  assert.deepEqual(stored.activity, []);
  assert.deepEqual(stored.state.interactionEvents, []);
});

test("transient Route obtained activity identifies only an authoritative Route Pokemon", async () => {
  const response = await fetch(`${origin}/api/games/${routePresenceGameId}/presence/activity`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      clientId: "presence-obtained-client",
      stage: "obtained",
      actorPlayerId: "gold",
      seriesId: "Kanto",
      routeNumber: 3,
      pokemonRecordId: "route-pokemon-gold-001"
    })
  });
  assert.equal(response.status, 202);
  const payload = await response.json();
  assert.equal(payload.activity.stage, "obtained");
  assert.equal(payload.activity.actorName, "Gold");
  assert.equal(payload.activity.pokemonRecordId, "route-pokemon-gold-001");
  assert.equal(payload.activity.pokemonName, "Pikachu");
  const stored = JSON.parse(fs.readFileSync(path.join(gamesDir, `${routePresenceGameId}.json`), "utf8"));
  assert.equal(stored.version, 23);
});

test("transient Route obtained activity rejects non-authoritative Pokemon claims", async () => {
  const response = await fetch(`${origin}/api/games/${routePresenceGameId}/presence/activity`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      stage: "obtained",
      actorPlayerId: "red",
      seriesId: "Kanto",
      routeNumber: 3,
      pokemonRecordId: "route-pokemon-gold-001"
    })
  });
  assert.equal(response.status, 400);
  const stored = JSON.parse(fs.readFileSync(path.join(gamesDir, `${routePresenceGameId}.json`), "utf8"));
  assert.equal(stored.version, 23);
  assert.deepEqual(stored.activity, []);
});

test("allows a matching client revision to clear an orphaned Action destination", async () => {
  const repairedState = structuredClone(orphanedCommitState);
  const gymState = repairedState.actionPhaseState.selections["Hoenn-G8"];
  gymState.selectedLocationId = "";
  gymState.destinationCommit = null;
  const response = await fetch(`${origin}/api/games/${orphanedCommitGameId}/state`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ clientId: "repair-client", expectedVersion: 3, state: repairedState })
  });
  assert.equal(response.status, 200);
  const payload = await response.json();
  assert.equal(payload.version, 4);
  const stored = JSON.parse(fs.readFileSync(path.join(gamesDir, `${orphanedCommitGameId}.json`), "utf8"));
  assert.equal(stored.state.actionPhaseState.selections["Hoenn-G8"].destinationCommit, null);
  assert.equal(stored.state.actionPhaseState.selections["Hoenn-G8"].selectedLocationId, "");
});

test("completes a manual location operation without uploading a full state snapshot", async () => {
  const response = await fetch(`${origin}/api/games/${manualCompletionGameId}/action-destination-commits/department-store-destination-1/complete`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ clientId: "completion-client", expectedVersion: 5, operationId: "department-store-operation-1" })
  });
  assert.equal(response.status, 200);
  const payload = await response.json();
  assert.equal(payload.version, 6);
  assert.equal(payload.commit.status, "completed");
  assert.equal(payload.operation.status, "completed");
  assert.equal(payload.state, undefined);
  const stored = JSON.parse(fs.readFileSync(path.join(gamesDir, `${manualCompletionGameId}.json`), "utf8"));
  const gymState = stored.state.actionPhaseState.selections["Hoenn-G8"];
  assert.equal(gymState.activeActionOperationId, "");
  assert.equal(gymState.playerVisits["player-1"][0].actionOperationStatus, "completed");
  assert.equal(stored.state.departmentStoreVisits[0].status, "completed");
  assert.equal(stored.state.departmentStoreVisits[0].actionOperationReady, true);
});

test("allows outgoing-gym Action completion while advancing to the next gym", async () => {
  const advancedState = structuredClone(activeOutgoingActionState);
  const gymState = advancedState.actionPhaseState.selections["Hoenn-G8"];
  gymState.actionOperations[0].status = "completed";
  gymState.actionOperations[0].completedAt = "2026-01-01T00:05:00.000Z";
  gymState.activeActionOperationId = "";
  gymState.destinationCommit.status = "completed";
  gymState.destinationCommit.completedAt = "2026-01-01T00:05:00.000Z";
  gymState.playerVisits["player-1"][0].actionOperationStatus = "completed";
  advancedState.departmentStoreVisits[0].status = "completed";
  advancedState.series = "Hoenn";
  advancedState.gym = 9;
  advancedState.currentPhase = "start";

  const response = await fetch(`${origin}/api/games/${outgoingCompletionGameId}/state`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ clientId: "phase-advance-client", expectedVersion: 13, state: advancedState })
  });

  assert.equal(response.status, 200);
  const payload = await response.json();
  assert.equal(payload.version, 14);
  const stored = JSON.parse(fs.readFileSync(path.join(gamesDir, `${outgoingCompletionGameId}.json`), "utf8"));
  assert.equal(stored.state.gym, 9);
  assert.equal(stored.state.actionPhaseState.selections["Hoenn-G8"].destinationCommit.status, "completed");
});

test("allows undo to clear the matching outgoing-gym Action destination", async () => {
  const undoneState = structuredClone(activeOutgoingActionState);
  const gymState = undoneState.actionPhaseState.selections["Hoenn-G8"];
  gymState.playerVisits["player-1"] = [];
  gymState.actionOperations = [];
  gymState.activeActionOperationId = "";
  gymState.destinationCommit = null;
  undoneState.departmentStoreVisits = [];

  const response = await fetch(`${origin}/api/games/${outgoingUndoGameId}/state`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ clientId: "undo-action-client", expectedVersion: 17, state: undoneState })
  });

  assert.equal(response.status, 200);
  const payload = await response.json();
  assert.equal(payload.version, 18);
  const stored = JSON.parse(fs.readFileSync(path.join(gamesDir, `${outgoingUndoGameId}.json`), "utf8"));
  assert.equal(stored.state.actionPhaseState.selections["Hoenn-G8"].destinationCommit, null);
  assert.equal(stored.state.actionPhaseState.selections["Hoenn-G8"].actionOperations.length, 0);
});

test("allows an accepted Action destination to start its matching operation", async () => {
  const startedState = structuredClone(acceptedActionStartState);
  const gymState = startedState.actionPhaseState.selections["Hoenn-G8"];
  gymState.playerVisits["player-1"] = [{ id: "department-store-visit-starting", playerId: "player-1", locationId: "department-store", locationName: "Department Store", serviceId: "department-store-primary", actionCost: 1, series: "Hoenn", gym: 8, phase: "action", actionOperationId: "department-store-operation-starting", actionOperationStatus: "resolving" }];
  gymState.actionOperations = [{ id: "department-store-operation-starting", visitId: "department-store-visit-starting", playerId: "player-1", actionNumber: 1, locationId: "department-store", serviceId: "department-store-primary", status: "resolving", linkedFeatureType: "department-store", linkedFeatureSessionId: "department-store-session-starting" }];
  gymState.activeActionOperationId = "department-store-operation-starting";
  gymState.destinationCommit.status = "resolving"; gymState.destinationCommit.operationId = "department-store-operation-starting";
  startedState.departmentStoreVisits = [{ id: "department-store-session-starting", actionVisitId: "department-store-visit-starting", playerId: "player-1", series: "Hoenn", gym: 8, status: "active", clearanceProducts: [], normalPurchases: [] }];
  const response = await fetch(`${origin}/api/games/${acceptedStartGameId}/state`, { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify({ clientId: "action-start-client", expectedVersion: 19, state: startedState }) });
  assert.equal(response.status, 200); const payload = await response.json(); assert.equal(payload.version, 20);
  const stored = JSON.parse(fs.readFileSync(path.join(gamesDir, `${acceptedStartGameId}.json`), "utf8"));
  const storedGymState = stored.state.actionPhaseState.selections["Hoenn-G8"];
  assert.equal(storedGymState.destinationCommit.status, "resolving");
  assert.equal(storedGymState.destinationCommit.operationId, "department-store-operation-starting");
  assert.equal(storedGymState.actionOperations[0].status, "resolving");
  assert.equal(stored.state.departmentStoreVisits[0].id, "department-store-session-starting");
});

test("compacts legacy undo history on load and persists the compact response normally", async () => {
  const originalBytes = fs.statSync(path.join(gamesDir, `${compactedHistoryGameId}.json`)).size;
  const loadResponse = await fetch(`${origin}/api/games/${compactedHistoryGameId}/state`);
  assert.equal(loadResponse.status, 200);
  const loaded = await loadResponse.json();
  assert.equal(loaded.storageCompacted, true);
  assert.equal(loaded.state.log.filter((entry) => entry.undoData).length, 50);
  assert.equal(loaded.state.log.some((entry) => entry.undoExpired), true);
  assert.equal(loaded.state.log.find((entry) => entry.undoData)?.undoData.newState, undefined);
  assert.equal(loaded.state.interactionEvents[0].payload.undoData, undefined);

  const saveResponse = await fetch(`${origin}/api/games/${compactedHistoryGameId}/state`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ clientId: "compaction-client", expectedVersion: 11, state: loaded.state })
  });
  assert.equal(saveResponse.status, 200);
  const storedPath = path.join(gamesDir, `${compactedHistoryGameId}.json`);
  const stored = JSON.parse(fs.readFileSync(storedPath, "utf8"));
  assert.equal(stored.version, 12);
  assert.equal(stored.state.interactionEvents[0].payload.undoData, undefined);
  assert.equal(stored.activity[0].payload.undoData, undefined);
  assert.ok(fs.statSync(storedPath).size < originalBytes / 10);
});
