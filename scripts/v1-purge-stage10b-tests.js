"use strict";
module.exports = function tests(c){
  const {read,rep,reps,replTest,constObj,absent}=c; const edits=new Map(); let s;

  s=read("scripts/test-backend-persistence.js");
  s=constObj(s,"activeOutgoingActionState","const activeOutgoingActionState = structuredClone(manualCompletionState);");
  s=constObj(s,"acceptedActionStartState",`const acceptedActionStartState = {
  ...baseState, currentPhase: "action", departmentStoreVisits: [],
  actionPhaseState: { selections: { "Hoenn-G8": {
    series: "Hoenn", gym: 8, selectedLocationId: "", playerVisits: { "player-1": [] }, actionOperations: [], activeActionOperationId: "",
    destinationCommit: { id: "department-store-destination-starting", requestId: "department-store-destination-starting", status: "accepted", playerId: "player-1", actionNumber: 1, locationId: "department-store", serviceId: "department-store-primary", operationId: "", acceptedAt: "2026-01-01T00:00:00.000Z" }
  } }, seriesTrackers: {} }
};`);
  s=rep(s,'  advancedState.encounterSessions[0].status = "completed";','  advancedState.departmentStoreVisits[0].status = "completed";',"completion feature");
  s=rep(s,'  undoneState.encounterSessions = [];','  undoneState.departmentStoreVisits = [];',"undo feature");
  s=replTest(s,"allows an accepted Action destination to start its matching operation",`test("allows an accepted Action destination to start its matching operation", async () => {
  const startedState = structuredClone(acceptedActionStartState);
  const gymState = startedState.actionPhaseState.selections["Hoenn-G8"];
  gymState.playerVisits["player-1"] = [{ id: "department-store-visit-starting", playerId: "player-1", locationId: "department-store", locationName: "Department Store", serviceId: "department-store-primary", actionCost: 1, series: "Hoenn", gym: 8, phase: "action", actionOperationId: "department-store-operation-starting", actionOperationStatus: "resolving" }];
  gymState.actionOperations = [{ id: "department-store-operation-starting", visitId: "department-store-visit-starting", playerId: "player-1", actionNumber: 1, locationId: "department-store", serviceId: "department-store-primary", status: "resolving", linkedFeatureType: "department-store", linkedFeatureSessionId: "department-store-session-starting" }];
  gymState.activeActionOperationId = "department-store-operation-starting";
  gymState.destinationCommit.status = "resolving"; gymState.destinationCommit.operationId = "department-store-operation-starting";
  startedState.departmentStoreVisits = [{ id: "department-store-session-starting", actionVisitId: "department-store-visit-starting", playerId: "player-1", series: "Hoenn", gym: 8, status: "active", clearanceProducts: [], normalPurchases: [] }];
  const response = await fetch(\`${origin}/api/games/${acceptedStartGameId}/state\`, { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify({ clientId: "action-start-client", expectedVersion: 19, state: startedState }) });
  assert.equal(response.status, 200); const payload = await response.json(); assert.equal(payload.version, 20);
  const stored = JSON.parse(fs.readFileSync(path.join(gamesDir, \`${acceptedStartGameId}.json\`), "utf8"));
  const storedGymState = stored.state.actionPhaseState.selections["Hoenn-G8"];
  assert.equal(storedGymState.destinationCommit.status, "resolving");
  assert.equal(storedGymState.destinationCommit.operationId, "department-store-operation-starting");
  assert.equal(storedGymState.actionOperations[0].status, "resolving");
  assert.equal(stored.state.departmentStoreVisits[0].id, "department-store-session-starting");
});`);
  absent(s,['locationId: "encounter"','serviceId: "encounter-wheel"',"encounterSessions",'linkedFeatureType: "encounter"'],"persistence"); edits.set("scripts/test-backend-persistence.js",s);

  s=read("scripts/test-provisional-declaration-runtime.js");
  s=rep(s,'    locationId: "encounter",\n    serviceId: "encounter-roll"','    locationId: "department-store",\n    serviceId: "department-store-primary"',"runtime multiline destination");
  s=rep(s,'locationId: "encounter", serviceId: "encounter-roll"','locationId: "department-store", serviceId: "department-store-primary"',"runtime inline destination");
  s=reps(s,'locationId: "pc", serviceId: "pc-service"','locationId: "department-store", serviceId: "department-store-primary"',2,"retired PC fixtures");
  absent(s,['locationId: "encounter"','serviceId: "encounter-roll"','locationId: "pc"','serviceId: "pc-service"'],"provisional runtime"); edits.set("scripts/test-provisional-declaration-runtime.js",s);

  s=read("scripts/test-provisional-declaration-server.js");
  s=reps(s,'locationId: "encounter", serviceId: "encounter-roll"','locationId: "department-store", serviceId: "department-store-primary"',2,"server destinations");
  absent(s,['locationId: "encounter"','serviceId: "encounter-roll"'],"provisional server"); edits.set("scripts/test-provisional-declaration-server.js",s);

  return edits;
};
