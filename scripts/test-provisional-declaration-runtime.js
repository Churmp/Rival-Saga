"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const lifecycle = require("../interaction-situation-lifecycle.js");
const runtime = require("../provisional-declaration-runtime.js");

function actionState() {
  return {
    series: "Kanto",
    gym: 1,
    phaseState: { "Kanto-G1": { currentPhase: "action" } },
    players: [{ id: "austin", name: "Austin" }, { id: "steevee", name: "Steevee" }],
    interactionEvents: [],
    actionPhaseState: {
      selections: {
        "Kanto-G1": {
          series: "Kanto",
          gym: 1,
          playerVisits: { austin: [], steevee: [] },
          turnOrderPlayerIds: ["austin", "steevee"],
          actionOperations: [],
          activeActionOperationId: "",
          destinationCommit: null
        }
      },
      seriesTrackers: {}
    }
  };
}

function timing(state) {
  return runtime.controlTimingStatus(state, { actionsPerPlayer: 3, isBlocking: lifecycle.isBlocking });
}

function ordinaryTiming(state, options = {}) {
  return runtime.ordinaryControlTimingStatus(state, {
    actionsPerPlayer: 3,
    isBlocking: lifecycle.isBlocking,
    ...options
  });
}

function setPhase(state, currentPhase, flowState) {
  state.currentPhase = currentPhase;
  state.phaseState = { "Kanto:G1": { currentPhase, flowState } };
  return state;
}

test("[PD-RUNTIME-001] Action decision begins with ordinary Control Timing open", () => {
  const state = actionState();
  const result = timing(state);
  assert.equal(result.open, true);
  assert.equal(result.decision.currentPlayerId, "austin");
  assert.equal(result.decision.actionNumber, 1);
});

test("[PD-RUNTIME-002] a provisional exact effect claim blocks the destination without consuming or mutating", () => {
  const state = actionState();
  const activity = runtime.createActivity({
    declarationId: "declaration-1",
    claimKey: "claim-1",
    declaringPlayerId: "steevee",
    declaringPlayerName: "Steevee",
    effectContractId: "incinerate",
    effectName: "Incinerate",
    inventoryRecordId: "incinerate-exact-1",
    series: "Kanto",
    gym: 1,
    interruptedActionPlayerId: "austin",
    interruptedActionPlayerName: "Austin",
    interruptedContinuation: { actionPlayerId: "austin", actionNumber: 1 }
  });
  state.interactionEvents.push(activity);
  assert.equal(timing(state).open, false);
  assert.equal(activity.payload.declarationStage, runtime.DECLARATION_STAGES.PROVISIONAL);
  assert.equal(activity.payload.consumptionState, runtime.CONSUMPTION_STATES.NOT_CONSUMED);
  assert.equal(activity.payload.mutationState, runtime.MUTATION_STATES.NOT_STARTED);
  assert.equal(activity.payload.responsesAllowed, false);
  assert.equal(activity.eligiblePlayerIds.length, 0);
});

test("[PD-RUNTIME-003] drafts persist by revision and stale revisions fail closed", () => {
  const activity = runtime.createActivity({ declarationId: "declaration-1", effectName: "Wicked Blow" });
  const first = runtime.updateDraft(activity, { targetPokemonId: "exact-roster-7" }, 1);
  assert.equal(first.ok, true);
  assert.equal(activity.payload.draftSelections.targetPokemonId, "exact-roster-7");
  assert.equal(activity.payload.declarationRevision, 2);
  const stale = runtime.updateDraft(activity, { targetPokemonId: "other" }, 1);
  assert.equal(stale.ok, false);
  assert.equal(stale.reason, "revision-conflict");
  assert.equal(activity.payload.draftSelections.targetPokemonId, "exact-roster-7");
  const reloaded = JSON.parse(JSON.stringify(activity));
  assert.equal(runtime.currentProvisional({ interactionEvents: [reloaded] }).payload.draftSelections.targetPokemonId, "exact-roster-7");
});

test("[PD-RUNTIME-004] withdrawal is terminal and spends nothing", () => {
  const state = actionState();
  const activity = runtime.createActivity({
    declarationId: "declaration-1",
    declaringPlayerId: "steevee",
    effectName: "Restrict",
    interruptedContinuation: { actionPlayerId: "austin", actionNumber: 1 }
  });
  state.interactionEvents.push(activity);
  const result = runtime.markWithdrawn(activity);
  assert.equal(result.ok, true);
  assert.equal(activity.status, "withdrawn");
  assert.equal(activity.payload.consumptionState, runtime.CONSUMPTION_STATES.NOT_CONSUMED);
  assert.equal(activity.payload.mutationState, runtime.MUTATION_STATES.NOT_STARTED);
  assert.equal(lifecycle.isBlocking(activity), false);
  assert.equal(timing(state).open, true);
  assert.equal(timing(state).decision.currentPlayerId, "austin");
  assert.equal(timing(state).decision.actionNumber, 1);
});

test("[PD-RUNTIME-005] destination commitment wins atomically and closes Control Timing", () => {
  const state = actionState();
  const reserved = runtime.reserveDestination(state, {
    requestId: "destination-1",
    commitId: "destination-1",
    playerId: "austin",
    actionNumber: 1,
    locationId: "encounter",
    serviceId: "encounter-roll"
  }, undefined, { actionsPerPlayer: 3, isBlocking: lifecycle.isBlocking });
  assert.equal(reserved.ok, true);
  assert.equal(timing(state).open, false);
  assert.equal(timing(state).destinationCommit.id, "destination-1");
  const duplicate = runtime.reserveDestination(state, {
    requestId: "destination-1",
    playerId: "austin",
    actionNumber: 1
  }, undefined, { actionsPerPlayer: 3, isBlocking: lifecycle.isBlocking });
  assert.equal(duplicate.ok, true);
  assert.equal(duplicate.duplicate, true);
});

test("[PD-RUNTIME-006] an active location operation keeps Control closed and completion reopens it", () => {
  const state = actionState();
  const gymState = runtime.actionGymState(state);
  gymState.destinationCommit = {
    id: "destination-1", status: runtime.DESTINATION_STATES.RESOLVING,
    playerId: "austin", actionNumber: 1, locationId: "encounter", serviceId: "encounter-roll", operationId: "operation-1"
  };
  gymState.actionOperations.push({ id: "operation-1", playerId: "austin", actionNumber: 1, status: "resolving" });
  gymState.activeActionOperationId = "operation-1";
  assert.equal(timing(state).open, false);
  gymState.playerVisits.austin.push({ id: "visit-1", playerId: "austin", actionCost: 1 });
  gymState.actionOperations[0].status = "completed";
  gymState.activeActionOperationId = "";
  gymState.destinationCommit.status = runtime.DESTINATION_STATES.COMPLETED;
  assert.equal(timing(state).open, true);
  assert.equal(timing(state).decision.currentPlayerId, "steevee");
});

test("[PD-RUNTIME-007] only an unstarted destination may be released", () => {
  const state = actionState();
  runtime.reserveDestination(state, {
    requestId: "destination-1", commitId: "destination-1", playerId: "austin", actionNumber: 1,
    locationId: "pc", serviceId: "pc-service"
  }, undefined, { actionsPerPlayer: 3, isBlocking: lifecycle.isBlocking });
  const released = runtime.releaseDestination(state, "destination-1");
  assert.equal(released.ok, true);
  assert.equal(released.commit.status, runtime.DESTINATION_STATES.RELEASED);
  assert.equal(timing(state).open, true);

  const second = actionState();
  runtime.reserveDestination(second, {
    requestId: "destination-2", commitId: "destination-2", playerId: "austin", actionNumber: 1,
    locationId: "pc", serviceId: "pc-service"
  }, undefined, { actionsPerPlayer: 3, isBlocking: lifecycle.isBlocking });
  runtime.actionGymState(second).destinationCommit.status = runtime.DESTINATION_STATES.RESOLVING;
  runtime.actionGymState(second).destinationCommit.operationId = "operation-2";
  assert.equal(runtime.releaseDestination(second, "destination-2").reason, "destination-operation-started");
});

test("[PD-RUNTIME-008] ordinary Control remains open after the final Action operation without inventing another actor", () => {
  const state = actionState();
  const gymState = runtime.actionGymState(state);
  gymState.playerVisits.austin = Array.from({ length: 3 }, (_, index) => ({ id: `a-${index}`, playerId: "austin", actionCost: 1 }));
  gymState.playerVisits.steevee = Array.from({ length: 3 }, (_, index) => ({ id: `s-${index}`, playerId: "steevee", actionCost: 1 }));
  assert.equal(timing(state).open, false);
  const result = ordinaryTiming(state);
  assert.equal(result.open, true);
  assert.equal(result.context, runtime.ORDINARY_CONTROL_CONTEXTS.ACTION_OPEN);
  assert.equal(result.provisionalDestinationRace, false);
  assert.equal(result.decision.currentPlayerId, "");
});

test("[PD-RUNTIME-009] Team Building and Shopping expose ordinary Control while adjacent procedures remain closed", () => {
  const teamBuild = ordinaryTiming(setPhase(actionState(), "battle", "teamBuild"));
  assert.equal(teamBuild.open, true);
  assert.equal(teamBuild.context, runtime.ORDINARY_CONTROL_CONTEXTS.TEAM_BUILDING);

  const shopping = ordinaryTiming(setPhase(actionState(), "shop", "shopping"));
  assert.equal(shopping.open, true);
  assert.equal(shopping.context, runtime.ORDINARY_CONTROL_CONTEXTS.SHOP);

  for (const flowState of ["teamLock", "sabotage", "teamPreview", "rivalBattles"]) {
    const closed = ordinaryTiming(setPhase(actionState(), "battle", flowState));
    assert.equal(closed.open, false, `${flowState} must not inherit ordinary Control Timing`);
  }
});

test("[PD-RUNTIME-010] Battle Payout opens ordinary Control only after its terminal result exists", () => {
  const state = setPhase(actionState(), "battle-results", "gymPayout");
  assert.equal(ordinaryTiming(state, { battlePayoutComplete: false }).open, false);
  const completed = ordinaryTiming(state, { battlePayoutComplete: true });
  assert.equal(completed.open, true);
  assert.equal(completed.context, runtime.ORDINARY_CONTROL_CONTEXTS.POST_BATTLE);
});

test("[PD-RUNTIME-011] active situations and required-choice blockers close every ordinary Control context", () => {
  const state = setPhase(actionState(), "shop", "shopping");
  state.interactionEvents.push({ id: "pending-1", status: "open", situation: { status: "awaitingResponse" } });
  assert.equal(ordinaryTiming(state).open, false);
  state.interactionEvents = [];
  const requiredChoice = ordinaryTiming(state, { blockingReason: "A required choice is still open." });
  assert.equal(requiredChoice.open, false);
  assert.equal(requiredChoice.reason, "A required choice is still open.");
});

test("[PD-RUNTIME-012] Gym Start preparation, Team Preview, and unfinished payout never leak ordinary Control", () => {
  assert.equal(ordinaryTiming(setPhase(actionState(), "start", "preGym")).open, false);
  assert.equal(ordinaryTiming(setPhase(actionState(), "start", "gymStart")).open, false);
  assert.equal(ordinaryTiming(setPhase(actionState(), "battle", "teamPreview")).open, false);
  assert.equal(ordinaryTiming(setPhase(actionState(), "battle-results", "gymPayout"), { battlePayoutComplete: false }).open, false);
});
