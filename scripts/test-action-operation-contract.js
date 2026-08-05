const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const appSource = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
const cssSource = fs.readFileSync(path.join(__dirname, "..", "styles.css"), "utf8");
const htmlSource = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");

function harness() {
  const state = { visits: [], operations: [], pending: false, manualTask: false };
  const commit = (playerId, locationId, featureStatus = "completed") => {
    const visit = { id: `visit-${state.visits.length + 1}`, playerId, locationId, actionCost: 1 };
    state.visits.push(visit);
    state.operations.push({
      id: `operation-${visit.id}`,
      visitId: visit.id,
      playerId,
      actionNumber: state.visits.filter((entry) => entry.playerId === playerId).length,
      locationId,
      committed: true,
      status: "resolving",
      featureStatus
    });
    return visit;
  };
  const activeOperation = () => state.operations.find((operation) => operation.status === "resolving") || null;
  const complete = (visitId) => {
    const operation = state.operations.find((entry) => entry.visitId === visitId);
    if (!operation || operation.status === "completed") return Boolean(operation);
    if (state.pending || state.manualTask || operation.featureStatus !== "completed") return false;
    operation.status = "completed";
    return true;
  };
  const turn = (order) => {
    const operation = activeOperation();
    if (operation) return operation.playerId;
    return order[state.visits.length % order.length];
  };
  return { state, commit, complete, turn };
}

test("all Action visit commits use the shared operation entry point", () => {
  assert.equal((appSource.match(/actionVisitsForPlayer\([^\n]+\)\.push\(visit\)/g) || []).length, 0);
  assert.match(appSource, /function commitActionVisit\(visit\)/);
  assert.match(appSource, /function completeActionOperationForVisit\(visitId/);
});

test("simple immediate Action advances exactly once", () => {
  const h = harness();
  const visit = h.commit("p1", "ranger-base");
  assert.equal(h.turn(["p1", "p2"]), "p1");
  assert.equal(h.complete(visit.id), true);
  assert.equal(h.complete(visit.id), true);
  assert.equal(h.turn(["p1", "p2"]), "p2");
});

test("Hidden Grotto choices hold Action ownership", () => {
  const h = harness();
  const visit = h.commit("p1", "hidden-grotto", "type-choice");
  assert.equal(h.complete(visit.id), false);
  h.state.operations[0].featureStatus = "pokemon-choice";
  assert.equal(h.complete(visit.id), false);
  h.state.operations[0].featureStatus = "completed";
  assert.equal(h.complete(visit.id), true);
});

test("Encounter result and nested response chain hold Action ownership", () => {
  const h = harness();
  const visit = h.commit("p1", "encounter", "pending");
  h.state.pending = true;
  assert.equal(h.complete(visit.id), false);
  h.state.operations[0].featureStatus = "completed";
  assert.equal(h.complete(visit.id), false);
  h.state.pending = false;
  assert.equal(h.complete(visit.id), true);
});

test("Daycare visit remains resolving until explicitly finished", () => {
  const h = harness();
  const visit = h.commit("p1", "pokemon-breeder", "active");
  assert.equal(h.turn(["p1", "p2"]), "p1");
  assert.equal(h.complete(visit.id), false);
  h.state.operations[0].featureStatus = "completed";
  assert.equal(h.complete(visit.id), true);
});

test("Trade return does not replace the Action operation", () => {
  const h = harness();
  h.commit("p1", "encounter", "pending");
  h.state.pending = true;
  const serialized = JSON.stringify(h.state);
  assert.equal(JSON.parse(serialized).operations[0].playerId, "p1");
  assert.equal(h.turn(["p1", "p2"]), "p1");
});

test("manual result task blocks Action completion", () => {
  const h = harness();
  const visit = h.commit("p1", "pokemon-breeder");
  h.state.manualTask = true;
  assert.equal(h.complete(visit.id), false);
});

test("reload preserves committed cost, owner, Action number, and session", () => {
  const h = harness();
  h.commit("p1", "hidden-grotto", "pokemon-choice");
  const restored = JSON.parse(JSON.stringify(h.state));
  assert.equal(restored.visits.length, 1);
  assert.deepEqual(restored.operations[0], {
    id: "operation-visit-1", visitId: "visit-1", playerId: "p1", actionNumber: 1,
    locationId: "hidden-grotto", committed: true, status: "resolving", featureStatus: "pokemon-choice"
  });
});

test("completing an operation selects the exact next player", () => {
  const h = harness();
  const visit = h.commit("p2", "hidden-grotto");
  assert.equal(h.turn(["p2", "p3", "p1"]), "p2");
  h.complete(visit.id);
  assert.equal(h.turn(["p2", "p3", "p1"]), "p3");
});

test("cancel before confirmation spends no Action", () => {
  const h = harness();
  assert.equal(h.state.visits.length, 0);
  assert.equal(h.turn(["p1", "p2"]), "p1");
});

test("closing an intermediate submenu cannot complete an operation", () => {
  const h = harness();
  h.commit("p1", "hidden-grotto", "pokemon-choice");
  assert.equal(h.state.operations[0].status, "resolving");
});

test("required completion hooks and bounded picker layout are wired", () => {
  for (const hook of [
    "silph-co-choice-complete", "hidden-grotto-choice-complete", "bulletin-quests-confirmed",
    "encounter-session-closed", "wheel-session-closed", "dragons-den-placement-complete"
  ]) assert.match(appSource, new RegExp(hook));
  assert.match(appSource, /data-finish-action-operation/);
  assert.match(cssSource, /\.live-referee-picker-scroll\s*\{[^}]*min-height:\s*0;[^}]*overflow-y:\s*auto;/s);
  assert.match(cssSource, /\.live-referee-stage \.live-referee-tokens-screen\s*\{[^}]*overflow:\s*hidden;/s);
});

test("accepted destination reservations continue into their exact local starter", () => {
  assert.match(appSource, /function matchingAcceptedActionDestination\(\{ playerId = "", locationId = "", serviceId = "" \} = \{\}\)/);
  assert.match(appSource, /function createLocationActionVisit[\s\S]*matchingAcceptedActionDestination\(\{ playerId: player\.id, locationId: location\.id, serviceId \}\)/);
  assert.match(appSource, /function createGameCornerActionSession[\s\S]*matchingAcceptedActionDestination\(\{ playerId: player\.id, locationId: location\.id, serviceId: service\.id \}\)/);
  assert.match(appSource, /function startEncounterSession\(\{ skipConfirmCheck = false \} = \{\}\)/);
  assert.match(appSource, /startEncounterSession\(\{ skipConfirmCheck: true \}\)/);
  assert.match(appSource, /if \(!startEncounterSession\([\s\S]*throw new Error\("The Encounter location could not start\."\)/);
});

test("Action Phase Demo Mode controls and player switching are wired", () => {
  assert.match(htmlSource, /id="actionDemoStatus"/);
  assert.match(htmlSource, /id="actionToggleDemoMode"/);
  assert.match(appSource, /function renderActionDemoControls\(\)/);
  assert.match(appSource, /data-action-player-id=/);
  assert.match(appSource, /setTestingToolsState\(\{ controlledPlayerId: playerId \}\)/);
  assert.match(cssSource, /\.action-demo-controls\s*\{/);
  assert.match(cssSource, /\.action-turn-chip\.selectable/);
});
