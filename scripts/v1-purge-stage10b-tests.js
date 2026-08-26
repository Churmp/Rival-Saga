"use strict";
module.exports = function tests(c){
  const {read,rep,reps,line,rmTest,replTest,constObj,pushEntry,absent}=c; const edits=new Map(); let s;

  s=read("scripts/test-settled-effect-batch.js");
  s=line(s,"    encounterCopyRecords: [],",1);
  s=reps(s,'"encounter-result-1"','"pokemon-result-1"',4,"Honey result id");
  s=reps(s,'sourceType: "encounter"','sourceType: "pokemon-result"',1,"Honey source");
  s=rep(s,'    encounterSessionId: "encounter-1", resultDisplayName:','    resultDisplayName:',"Honey retired session link");
  absent(s,["encounterCopyRecords",'sourceType: "encounter"',"encounterSessionId"],"settled batch"); edits.set("scripts/test-settled-effect-batch.js",s);

  s=read("scripts/test-token-lifecycle-slice.js");
  s=reps(s,'sourceType: "encounter"','sourceType: "pokemon-result"',2,"lifecycle source");
  s=rep(s,'sourceLabel: "Encounter Wheel"','sourceLabel: "Pokemon Result"',"Honey label");
  s=reps(s,'"source-encounter"','"source-pokemon-result"',4,"Honey source id");
  s=rep(s,'test("[TLS-005] Honey copies only settled intrinsic encounter identity and rejects recursive or stale sources", () => {','test("[TLS-005] Honey copies only settled intrinsic Pokemon-result identity and rejects recursive or stale sources", () => {',"Honey title");
  absent(s,['sourceType: "encounter"','sourceLabel: "Encounter Wheel"','"source-encounter"'],"lifecycle"); edits.set("scripts/test-token-lifecycle-slice.js",s);

  s=read("scripts/test-token-browser.js");
  s=rmTest(s,"[BROWSER-010] Extra Encounter persists one normal Encounter session and undo restores the exact pre-use state");
  s=rep(s,'test("[BROWSER-028] production Reroll supersedes one exact encounter result through refresh and causal undo", async () => {','test("[BROWSER-028] production Reroll supersedes one exact Pokemon result through refresh and causal undo", async () => {',"Reroll title");
  s=line(s,'  productionState.encounterSessions = [{ id: "browser-028-encounter", status: "review", playerId: "gold", series: "Kanto", gym: 1, rolls: [], removedEntryIds: [] }];',1);
  s=reps(s,'sourceType: "encounter", sourceLabel: "Encounter Wheel"','sourceType: "pokemon-result", sourceLabel: "Pokemon Result"',3,"shared Pokemon result sources");
  s=rep(s,' encounterSessionId: "browser-028-encounter",','',"Reroll session link");
  s=rep(s,'state.tokenConsumptions.filter((entry) => entry.source === "encounter-reroll").length','state.tokenConsumptions.filter((entry) => entry.source === "pokemon-reroll").length',"Reroll consumption");
  absent(s,["encounterSessions","selectedEncounterSessionId","encounterModalOpen",'sourceType: "encounter"','"encounter-reroll"',"Encounter Wheel"],"browser fixtures"); edits.set("scripts/test-token-browser.js",s);

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
  const response = await fetch(\`\${origin}/api/games/\${acceptedStartGameId}/state\`, { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify({ clientId: "action-start-client", expectedVersion: 19, state: startedState }) });
  assert.equal(response.status, 200); const payload = await response.json(); assert.equal(payload.version, 20);
  const stored = JSON.parse(fs.readFileSync(path.join(gamesDir, \`\${acceptedStartGameId}.json\`), "utf8"));
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

  s=read("scripts/token-qa-coverage-data.js");
  s=pushEntry(s,"extra-encounter-token",`tokens.push({
  tokenId: "extra-encounter-token",
  requirements: [
    requirement("Current Route progression and chosen-route validation happen before mutation", "Covered", "V2R-EXTRA-002"),
    requirement("No eligible resident fails atomically without consuming the exact Token or creating Route state", "Covered", "V2R-EXTRA-001"),
    requirement("Purchase and use are idempotent exact-once operations", "Covered", "V2R-EXTRA-002"),
    requirement("Successful acquisition and effect-operation state survive backend reload", "Covered", "V2R-EXTRA-002")
  ],
  scenarios: [
    scenario({ id: "EXTRA-ENCOUNTER-ROUTE-ATOMIC-001", name: "Duplicate filtering cannot partially consume Extra Encounter", coverage: "Covered", level: "Browser", testFile: "scripts/test-v2-route-runtime-sequences.js", testId: "V2R-EXTRA-001", setup: "Gold owns every discovered Route resident and disables Duplicate rotation for each while holding one exact Extra Encounter Token.", action: "Use Extra Encounter when the Route has no eligible random resident.", expected: "The use fails before mutation and preserves the exact Token and Route state.", assertions: ["Token count is unchanged.", "No opportunity or result is added.", "No effect operation is recorded."] }),
    scenario({ id: "EXTRA-ENCOUNTER-ROUTE-PERSISTENCE-001", name: "Current Route Extra Encounter is exact-once across reload", coverage: "Covered", level: "Browser", testFile: "scripts/test-v2-route-runtime-sequences.js", testId: "V2R-EXTRA-002", setup: "Gold purchases one Extra Encounter during the current V2 Route Action flow.", action: "Retry purchase and use with stable idempotency keys, acquire the result, persist, and reload.", expected: "Only one purchase/use resolves and the current Route operation/acquisition persists.", assertions: ["Duplicate purchase returns the same Token identity.", "Duplicate use returns the same operation identity.", "Locked future Routes reject use without consuming the Token.", "Reload preserves operation and acquisition."], flags: { reload: true } })
  ]
});`);
  absent(s,["test-encounter-token-runtime.js","encounter-token-runtime","TSB-024","BROWSER-010"],"Extra Encounter coverage"); edits.set("scripts/token-qa-coverage-data.js",s);
  return edits;
};
