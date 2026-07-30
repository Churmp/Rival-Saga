"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");

const lifecycle = require("../interaction-situation-lifecycle.js");

function responsePriority(currentPriorityPlayerId = "gold") {
  return {
    "event:arena": {
      currentPriorityPlayerId,
      complete: !currentPriorityPlayerId,
      priorityIndex: currentPriorityPlayerId ? 1 : 2
    }
  };
}

function activeEvent(overrides = {}) {
  return {
    id: "arena",
    type: "controlToken",
    title: "Gold used Arena Trap on Steven's Lucario.",
    status: "open",
    actorPlayerId: "gold",
    eligiblePlayerIds: ["steven", "gold"],
    promptPriority: responsePriority(),
    payload: {
      tokenName: "Arena Trap",
      tokenConsumptionIds: ["consume-arena"],
      consumedTokenId: "arena-token-1"
    },
    createdAt: "2026-07-24T12:00:00.000Z",
    ...overrides
  };
}

test("[LRL-001] the actual response-shaped stuck record is not a standalone situation", () => {
  const parent = activeEvent({ status: "resolved", promptPriority: responsePriority("") });
  const malformed = {
    id: "interaction-response-pass",
    type: "pass",
    playerId: "steven",
    respondingToPromptId: "event:arena",
    promptId: "event:arena",
    activityStatus: "open",
    activity: parent
  };
  assert.equal(lifecycle.isMisroutedResponseActivity(malformed), true);
  assert.deepEqual(lifecycle.cleanActivityRecords([malformed, parent]).map((entry) => entry.id), ["arena"]);
  assert.equal(lifecycle.isBlocking(malformed), false);
});

test("[LRL-002] refresh preserves response and required-choice situations", () => {
  const awaitingResponse = activeEvent();
  awaitingResponse.situation = lifecycle.normalizeSituation(awaitingResponse);
  const responseReload = JSON.parse(JSON.stringify(awaitingResponse));
  assert.equal(lifecycle.normalizeSituation(responseReload).status, lifecycle.STATUSES.AWAITING_RESPONSE);
  assert.equal(lifecycle.normalizeSituation(responseReload).actingPlayerId, "gold");

  const awaitingChoice = activeEvent({
    promptPriority: responsePriority(""),
    payload: { requiredChoice: true, requiredChoiceText: "Choose an injected move." }
  });
  awaitingChoice.situation = lifecycle.normalizeSituation(awaitingChoice);
  const choiceReload = JSON.parse(JSON.stringify(awaitingChoice));
  assert.equal(lifecycle.normalizeSituation(choiceReload).status, lifecycle.STATUSES.AWAITING_REQUIRED_CHOICE);
  assert.equal(lifecycle.normalizeSituation(choiceReload).requiredAction, "Choose an injected move.");
});

test("[LRL-003] a completed mutation with a stale open shell reconciles without replay", () => {
  const event = activeEvent({
    situation: {
      status: lifecycle.STATUSES.RESOLVING,
      mutationState: lifecycle.MUTATION_STATES.COMPLETED,
      completionKey: "arena:resolve"
    }
  });
  const decision = lifecycle.beginResolution(event, "arena:resolve");
  assert.equal(decision.allowed, false);
  assert.equal(decision.reconciled, true);
  assert.equal(event.status, "resolved");
  assert.equal(lifecycle.isBlocking(event), false);
});

test("[LRL-004] partial recovery restores the exact mutation snapshot and requests one refund", () => {
  const state = {
    players: [{ id: "gold", inventory: [] }, { id: "steven", inventory: [], balance: 5 }],
    pokemonRecords: [{ id: "lucario", trainerId: "gold" }],
    effectOperations: [{ id: "partial" }]
  };
  const snapshot = {
    previousPlayers: [{ id: "gold", inventory: [{ id: "arena-token-1", name: "Arena Trap" }] }, { id: "steven", inventory: [], balance: 10 }],
    previousPokemonRecords: [{ id: "lucario", trainerId: "steven" }],
    previousEffectOperations: []
  };
  const event = activeEvent({
    situation: {
      status: lifecycle.STATUSES.FAILED_RECOVERY_REQUIRED,
      tokenConsumed: true,
      mutationState: lifecycle.MUTATION_STATES.STARTED
    }
  });
  const plan = lifecycle.recoveryPlan(event);
  assert.deepEqual(plan, { action: "rollbackAndRefund", refund: true, rollback: true });
  assert.deepEqual(lifecycle.restoreMutationSnapshot(state, snapshot).sort(), ["effectOperations", "players", "pokemonRecords"]);
  assert.equal(state.pokemonRecords[0].trainerId, "steven");
  assert.equal(state.players[0].inventory.filter((item) => item.id === "arena-token-1").length, 1);
  lifecycle.markCanceledRefunded(event, { mutationState: lifecycle.MUTATION_STATES.ROLLED_BACK });
  assert.equal(lifecycle.isBlocking(event), false);
});

test("[LRL-005] duplicate completion is a terminal no-op", () => {
  const event = activeEvent();
  assert.equal(lifecycle.beginResolution(event, "arena:resolve").allowed, true);
  lifecycle.markResolved(event);
  const duplicate = lifecycle.beginResolution(event, "arena:resolve");
  assert.equal(duplicate.allowed, false);
  assert.equal(duplicate.reason, "terminal");
});

test("[LRL-006] terminal situations never reopen after serialization", () => {
  const resolved = activeEvent();
  lifecycle.markResolved(resolved);
  const reloadedResolved = JSON.parse(JSON.stringify(resolved));
  assert.equal(lifecycle.isBlocking(reloadedResolved), false);

  const canceled = activeEvent();
  lifecycle.markCanceledRefunded(canceled);
  const reloadedCanceled = JSON.parse(JSON.stringify(canceled));
  assert.equal(lifecycle.isBlocking(reloadedCanceled), false);
});

test("[LRL-007] collapsing only changes the indicator; reopening returns to the same situation", () => {
  const event = activeEvent();
  const collapsed = lifecycle.indicatorFor(event, true);
  const expanded = lifecycle.indicatorFor(event, false);
  assert.equal(collapsed.visible, true);
  assert.equal(collapsed.reopensSituationId, event.id);
  assert.equal(expanded.reopensSituationId, event.id);
  assert.equal(lifecycle.normalizeSituation(event).status, lifecycle.STATUSES.AWAITING_RESPONSE);
});

test("[LRL-008] normal navigation returns only after a terminal resolution", () => {
  const event = activeEvent();
  assert.equal(lifecycle.isBlocking(event), true);
  lifecycle.markResolved(event);
  assert.equal(lifecycle.isBlocking(event), false);
});

test("[LRL-009] response POSTs stay nested under their parent activity", async (context) => {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "rival-saga-live-lifecycle-"));
  const gamesDir = path.join(tempRoot, "games");
  fs.mkdirSync(gamesDir, { recursive: true });
  fs.writeFileSync(path.join(tempRoot, "users.json"), JSON.stringify({ users: [] }));
  fs.writeFileSync(path.join(tempRoot, "ruleset-patches.json"), JSON.stringify({ patches: [] }));
  const parent = activeEvent();
  fs.writeFileSync(path.join(gamesDir, "lifecycle.json"), JSON.stringify({
    id: "lifecycle",
    name: "Lifecycle",
    version: 1,
    state: { players: [{ id: "steven", name: "Steven" }, { id: "gold", name: "Gold" }], interactionEvents: [parent] },
    activity: [parent]
  }, null, 2));
  process.env.RIVAL_SAGA_DATA_DIR = tempRoot;
  const serverPath = require.resolve("../server.js");
  delete require.cache[serverPath];
  const { server } = require("../server.js");
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  context.after(async () => {
    await new Promise((resolve) => server.close(resolve));
    fs.rmSync(tempRoot, { recursive: true, force: true });
    delete process.env.RIVAL_SAGA_DATA_DIR;
    delete require.cache[serverPath];
  });
  const origin = `http://127.0.0.1:${server.address().port}`;
  const responseRecord = {
    id: "pass-1",
    type: "pass",
    playerId: "steven",
    respondingToPromptId: "event:arena",
    promptId: "event:arena",
    createsPrompt: false
  };
  const response = await fetch(`${origin}/api/games/lifecycle/activity/arena/responses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...responseRecord, activityStatus: "open", activity: parent })
  });
  assert.equal(response.status, 201);
  const saved = JSON.parse(fs.readFileSync(path.join(gamesDir, "lifecycle.json"), "utf8"));
  assert.deepEqual(saved.state.interactionEvents.map((entry) => entry.id), ["arena"]);
  assert.deepEqual(saved.activity.map((entry) => entry.id), ["arena"]);
  assert.deepEqual(saved.state.interactionEvents[0].responses.map((entry) => entry.id), ["pass-1"]);
});

test("[LRL-010] production wiring uses lifecycle blocking and host-only failure recovery", () => {
  const appSource = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
  const serverSource = fs.readFileSync(path.join(__dirname, "..", "server.js"), "utf8");
  assert.match(appSource, /interactionSituationLifecycle\.isBlocking\(event\)/);
  assert.match(appSource, /data-live-recovery-cancel/);
  assert.match(appSource, /Only a host or site admin can recover a failed event/);
  assert.match(serverSource, /resource === "activity" && !resourceId && req\.method === "POST"/);
});
