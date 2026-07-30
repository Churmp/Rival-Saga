"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const effects = require("../token-control-effects.js");
const contract = require("../token-effect-contract.js");

function pokemon(id, trainerId, name, extra = {}) {
  return { id, trainerId, name, currentSpecies: name, status: "Active", rosterType: "Active", ...extra };
}

function player(id, name, inventory = []) {
  return { id, name, inventory, pokemonIds: [] };
}

function baseState() {
  return {
    series: "Hoenn",
    gym: 3,
    players: [
      player("gold", "Gold", [{ id: "leftovers-1", name: "Leftovers", type: "ITEM" }]),
      player("red", "Red", [{ id: "master-1", name: "Master Ball", type: "ITEM", tier: "Master Ball" }]),
      player("blue", "Blue")
    ],
    pokemonRecords: [
      pokemon("gold-a", "gold", "Slaking"),
      pokemon("gold-b", "gold", "Furret"),
      pokemon("red-a", "red", "Lucario"),
      pokemon("red-b", "red", "Garchomp"),
      pokemon("blue-a", "blue", "Abra")
    ],
    lingeringStatuses: [],
    effectOperations: [],
    delayedEffects: [],
    broughtTeamSnapshots: [],
    copiedActivations: []
  };
}

const options = (overrides = {}) => ({
  series: "Hoenn",
  gym: 3,
  phase: "action",
  seriesOrder: ["Kanto", "Johto", "Hoenn", "Sinnoh"],
  now: "2026-07-29T12:00:00.000Z",
  makeId: (prefix) => `${prefix}-test`,
  ...overrides
});

test("[STR-001] Smokescreen replaces one corresponding target and never adds one", () => {
  const state = baseState();
  const parentSource = { targetType: "pokemon", targetScope: "rosterInstance", targetPlayerId: "gold", targetPokemonId: "gold-a", targetPokemonName: "Slaking" };
  assert.deepEqual(effects.smokescreenWheelPlayers(state).map((entry) => entry.id), ["gold", "red", "blue"]);

  const original = effects.resolveSmokescreenRedirect(state, { parentSource, wheelResultPlayerId: "gold" });
  assert.equal(original.result, "resolvedNoEffect");
  assert.equal(original.keptOriginalTarget, true);
  assert.equal(original.targetPatch, null);

  const awaiting = effects.resolveSmokescreenRedirect(state, { parentSource, wheelResultPlayerId: "red" });
  assert.equal(awaiting.result, "awaitingRequiredChoice");
  assert.deepEqual(awaiting.candidates.map((entry) => entry.id), ["red-a", "red-b"]);

  const redirected = effects.resolveSmokescreenRedirect(state, {
    parentSource,
    wheelResultPlayerId: "red",
    replacementTargetId: "red-b"
  });
  assert.equal(redirected.result, "redirected");
  assert.equal(redirected.targetPatch.targetPokemonId, "red-b");
  assert.equal(redirected.targetPatch.targetPlayerId, "red");
  assert.equal(Object.hasOwn(redirected, "addedTargetId"), false);

  const noTarget = effects.resolveSmokescreenRedirect(state, { parentSource, wheelResultPlayerId: "blue" }, {
    isLegalPokemon: () => false
  });
  assert.equal(noTarget.result, "resolvedNoEffect");
  assert.equal(noTarget.noLegalCorrespondingTarget, true);
  assert.equal(noTarget.keptOriginalTarget, true);
});

test("[STR-002] Smokescreen contract and result safety enforce replacement-wheel semantics", () => {
  const definition = contract.definitionFor("smokescreen");
  assert.equal(definition.resolverId, "smokescreenRedirect");
  assert.equal(definition.mechanicContract.targetOperation, "replaceOneCorrespondingTarget");
  assert.equal(contract.runtimeResultSafetyFor(definition, { closed: true, addedTargetId: "red" }).ok, false);
  assert.equal(contract.runtimeResultSafetyFor(definition, {
    closed: true,
    wheelResultPlayerId: "red",
    originalTargetPlayerId: "gold",
    replacedOriginalTarget: true,
    replacementTargetId: "red-a"
  }).ok, true);
  assert.equal(contract.runtimeResultSafetyFor(definition, {
    closed: true,
    wheelResultPlayerId: "gold",
    originalTargetPlayerId: "gold",
    keptOriginalTarget: true
  }).ok, true);
});

test("[STR-003] Cold Wave suppresses only explicit ongoing effects and preserves records", () => {
  const state = baseState();
  const explicit = effects.createStatus(state, {
    type: "class-aura",
    name: "Class Aura",
    isOngoingEffect: true,
    duration: "Two Gyms",
    expiresAtGym: 5
  }, options());
  const durationOnly = effects.createStatus(state, {
    type: "long-buff",
    name: "Long Buff",
    duration: "Two Gyms",
    expiresAtGym: 5
  }, options({ makeId: () => "duration-only" }));
  const cold = effects.resolveColdWave(state, { sourceEffectId: "cold-1" }, options({ makeId: () => "cold-status" }));
  assert.equal(cold.result, "resolved");
  assert.equal(effects.statusSuppressedByColdWave(state, explicit, options()), true);
  assert.equal(effects.statusSuppressedByColdWave(state, durationOnly, options()), false);
  assert.equal(explicit.status, "active");
  assert.equal(explicit.expiresAtGym, 5);
  effects.expireColdWaveAtGymEnd(state, options());
  assert.equal(effects.statusSuppressedByColdWave(state, explicit, options()), false);
});

test("[STR-004] Lingering Aroma replaces one benefiting ongoing record for its remaining lifetime", () => {
  const state = baseState();
  state.players.find((entry) => entry.id === "gold").balance = 1000;
  state.players.find((entry) => entry.id === "red").balance = 1000;
  const explicit = effects.createStatus(state, {
    type: "aura", name: "Aura", isOngoingEffect: true, targetPlayerId: "gold", durationGyms: 2, expiresAtGym: 5
  }, options());
  const durationOnly = effects.createStatus(state, { id: "duration-only", type: "buff", name: "Buff", duration: "One Gym" }, options());
  const rejected = effects.resolveLingeringAroma(state, { sourceEffectId: "aroma-bad", targetEffectId: durationOnly.id, beneficiaryPlayerId: "gold" }, options());
  assert.equal(rejected.result, "systemFailure");
  const resolved = effects.resolveLingeringAroma(state, { sourceEffectId: "aroma-1", targetEffectId: explicit.id, beneficiaryPlayerId: "gold" }, options({ makeId: () => "aroma-status" }));
  assert.equal(resolved.result, "resolved");
  assert.equal(resolved.status.payload.targetOngoingEffectId, explicit.id);
  assert.equal(explicit.status, "replaced");
  assert.equal(resolved.status.expiresAtGym, 5);
  assert.equal(resolved.status.payload.replacementText, "Players must pay me $500 to declare an effect that targets me.");
  state.players.find((entry) => entry.id === "blue").balance = 400;
  const insufficient = effects.applyLingeringAromaTargetingCosts(state, {
    sourceEffectId: "declaration-insufficient", declaringPlayerId: "blue", targetPlayerIds: ["gold"]
  }, options());
  assert.equal(insufficient.result, "blocked");
  assert.equal(state.players.find((entry) => entry.id === "blue").balance, 400);
  assert.equal(state.players.find((entry) => entry.id === "gold").balance, 1000);
  const selfTarget = effects.applyLingeringAromaTargetingCosts(state, {
    sourceEffectId: "declaration-self", declaringPlayerId: "gold", targetPlayerIds: ["gold"]
  }, options());
  assert.deepEqual(selfTarget.costs, []);
  const costs = effects.applyLingeringAromaTargetingCosts(state, {
    sourceEffectId: "declaration-1", declaringPlayerId: "red", targetPlayerIds: ["gold", "gold"]
  }, options({ makeId: () => "aroma-cost" }));
  assert.equal(costs.result, "resolved");
  assert.equal(costs.costs.length, 1);
  assert.equal(state.players.find((entry) => entry.id === "red").balance, 500);
  assert.equal(state.players.find((entry) => entry.id === "gold").balance, 1500);
  const duplicate = effects.applyLingeringAromaTargetingCosts(state, {
    sourceEffectId: "declaration-1", declaringPlayerId: "red", targetPlayerIds: ["gold"]
  }, options());
  assert.equal(duplicate.duplicateResolution, true);
  assert.equal(state.players.find((entry) => entry.id === "red").balance, 500);
  assert.equal(state.players.find((entry) => entry.id === "gold").balance, 1500);
  assert.equal(effects.undoAtomicEffectOperation(state, costs.operation.id), true);
  assert.equal(state.players.find((entry) => entry.id === "red").balance, 1000);
  assert.equal(state.players.find((entry) => entry.id === "gold").balance, 1000);
  const restoredReplacement = state.lingeringStatuses.find((entry) => entry.id === resolved.status.id);
  restoredReplacement.status = "expired";
  effects.expireLingeringAromaRelationships(state, options());
  assert.equal(state.lingeringStatuses.find((entry) => entry.id === explicit.id).status, "expired");
});

test("[STR-005] Move Deleter is a stable next-Gym global move restriction", () => {
  const state = baseState();
  const resolution = effects.resolveMoveDeleter(state, { sourceEffectId: "move-1", moveName: "Recover" }, options({ moveExists: (name) => name === "Recover" }));
  assert.equal(resolution.result, "resolved");
  assert.equal(effects.moveRestrictionForName(state, "Recover", options()), null);
  const nextGym = options({ gym: 4 });
  assert.equal(effects.moveRestrictionForName(state, "recover", nextGym)?.id, resolution.status.id);
  assert.equal(effects.expireMoveRestrictionsAtGymEnd(state, nextGym).length, 1);
  assert.equal(effects.moveRestrictionForName(state, "Recover", nextGym), null);
});

test("[STR-006] copied activations use fresh declaration data, costs, provenance, and no inventory", () => {
  const state = baseState();
  const policy = contract.copyActivationPolicyFor(contract.copyActivationModes.AFTER_YOU);
  const unpaid = effects.createCopiedActivation(state, {
    sourceActivation: { id: "source-1", tokenId: "restrict-token", actorPlayerId: "red" },
    sourceCopyEffectId: "after-you-1",
    copiedUserPlayerId: "gold",
    copyMode: contract.copyActivationModes.AFTER_YOU,
    copyPolicy: policy,
    explicitCosts: [{ id: "cost-1", paid: false }]
  }, options());
  assert.equal(unpaid.result, "awaitingRequiredChoice");
  const resolved = effects.createCopiedActivation(state, {
    sourceActivation: { id: "source-1", tokenId: "restrict-token", actorPlayerId: "red" },
    sourceCopyEffectId: "after-you-1",
    copiedUserPlayerId: "gold",
    copyMode: contract.copyActivationModes.AFTER_YOU,
    copyPolicy: policy,
    targets: ["blue-a"],
    choices: { species: "Abra" },
    explicitCosts: [{ id: "cost-1", paid: true }]
  }, options({ makeId: () => "copy-1" }));
  assert.equal(resolved.result, "resolved");
  assert.equal(resolved.record.inventoryRecordCreated, false);
  assert.equal(resolved.record.copiedInventoryConsumed, false);
  assert.equal(resolved.record.copyProvenance.sourceActivationId, "source-1");
  assert.equal(state.players[0].inventory.length, 1);
  const recursive = effects.createCopiedActivation(state, {
    sourceActivation: resolved.record,
    sourceCopyEffectId: "after-you-2",
    copiedUserPlayerId: "blue",
    copyPolicy: policy
  }, options());
  assert.equal(recursive.result, "blocked");
  assert.notEqual(contract.definitionFor("after-you").copyActivationMode, contract.definitionFor("follow-me").copyActivationMode);
  assert.equal(contract.definitionFor("seven-tools").copyActivationPolicy.createsInventoryRecord, true);
});

test("[STR-007] Purge releases the immutable brought snapshot absolutely and idempotently", () => {
  const state = baseState();
  effects.resolveSubstitutePlacement(state, { sourceEffectId: "sub-1", targetPokemonId: "red-a" }, options());
  const marker = effects.resolvePurgeMarker(state, { sourceEffectId: "purge-1", actorPlayerId: "gold", targetPlayerId: "red" }, options());
  const snapshot = effects.createImmutableBroughtSnapshot(state, {
    id: "snapshot-1",
    broughtByPlayer: { red: ["red-a", "red-b"] }
  }, options());
  const resolved = effects.resolvePostPayoutPurge(state, { markerStatusId: marker.status.id, broughtSnapshotId: snapshot.id }, options({ makeId: () => "purge-op" }));
  assert.equal(resolved.result, "resolved");
  assert.deepEqual(resolved.releasedPokemon.map((entry) => entry.id), ["red-a", "red-b"]);
  assert.equal(state.lingeringStatuses.some((status) => status.type === effects.CONTROL_STATUS_TYPES.SUBSTITUTE), true);
  const duplicate = effects.resolvePostPayoutPurge(state, { markerStatusId: marker.status.id, broughtSnapshotId: snapshot.id }, options());
  assert.equal(duplicate.duplicateResolution, true);
  assert.equal(effects.undoAtomicEffectOperation(state, resolved.operation.id), true);
  assert.equal(state.pokemonRecords.find((entry) => entry.id === "red-a").status, "Active");
});

test("[STR-008] Revenge releases exactly two and never guesses a held inventory record", () => {
  const state = baseState();
  const snapshot = effects.createImmutableBroughtSnapshot(state, {
    id: "snapshot-2",
    broughtByPlayer: {
      gold: ["gold-a"],
      red: [
        { rosterInstanceId: "red-a", heldItemName: "Master Ball", heldInventoryItemId: "master-1" },
        { rosterInstanceId: "red-b", heldItemName: "Leftovers", heldInventoryItemId: "" }
      ]
    }
  }, options());
  const common = {
    sourceEffectId: "revenge-1",
    sourcePlayerId: "gold",
    offenderPlayerId: "red",
    broughtSnapshotId: snapshot.id,
    selectedRosterInstanceIds: ["red-a", "red-b"],
    qualifyingCurseRecords: [{ id: "curse-1", sourcePlayerId: "red", targetPlayerId: "gold", targetRosterInstanceId: "gold-a" }]
  };
  const guessed = effects.resolveRevengePostPayout(state, { ...common, heldItemSelection: { rosterInstanceId: "red-b", inventoryItemId: "leftovers-1" } }, options());
  assert.equal(guessed.result, "systemFailure");
  const master = effects.resolveRevengePostPayout(state, { ...common, heldItemSelection: { rosterInstanceId: "red-a", inventoryItemId: "master-1" } }, options());
  assert.equal(master.result, "systemFailure");
  const resolved = effects.resolveRevengePostPayout(state, common, options({ makeId: () => "revenge-op" }));
  assert.equal(resolved.result, "resolved");
  assert.deepEqual(resolved.releasedPokemon.map((entry) => entry.id), ["red-a", "red-b"]);
  assert.equal(effects.undoAtomicEffectOperation(state, resolved.operation.id), true);
  assert.equal(state.pokemonRecords.find((entry) => entry.id === "red-b").status, "Active");
});

test("[STR-009] Teleport revalidates on return and refunds only system failures", () => {
  const state = baseState();
  const scheduled = effects.scheduleTeleportDelayedEffect(state, {
    sourceResponseId: "teleport-response-1",
    sourcePlayerId: "gold",
    parentEffect: { id: "parent-1", tokenId: "restrict-token", targetPokemonId: "red-a" },
    teleportConsumptionRecordId: "consume-teleport",
    parentConsumptionRecordIds: ["consume-parent"]
  }, options({ phase: "action", makeId: () => "delayed-1" }));
  assert.equal(scheduled.result, "delayed");
  const gameplayIllegal = effects.resolveTeleportDelayedEffect(state, scheduled.record.id, options({
    gym: 4,
    phase: "action",
    revalidateEffect: () => ({ ok: false, classification: "gameplay", reason: "Target is no longer legal." })
  }));
  assert.equal(gameplayIllegal.result, "resolvedNoEffect");
  assert.equal(gameplayIllegal.refundRequired, false);
  assert.equal(gameplayIllegal.record.teleportConsumptionRecordId, "consume-teleport");
  assert.equal(effects.resolveTeleportDelayedEffect(state, scheduled.record.id, options({ gym: 4, phase: "action" })).duplicateResolution, true);

  const second = effects.scheduleTeleportDelayedEffect(state, {
    sourceResponseId: "teleport-response-2",
    parentEffect: { id: "parent-2" }
  }, options({ phase: "battle", makeId: () => "delayed-2" }));
  const systemFailure = effects.resolveTeleportDelayedEffect(state, second.record.id, options({
    gym: 4,
    phase: "battle",
    revalidateEffect: () => ({ ok: false, classification: "unsupported", reason: "Resolver unavailable." })
  }));
  assert.equal(systemFailure.result, "canceledRefunded");
  assert.equal(systemFailure.refundRequired, true);

  const third = effects.scheduleTeleportDelayedEffect(state, {
    sourceResponseId: "teleport-response-3",
    parentEffect: { id: "parent-3" }
  }, options({ phase: "shop", makeId: () => "delayed-3" }));
  const success = effects.resolveTeleportDelayedEffect(state, third.record.id, options({
    gym: 4,
    phase: "shop",
    revalidateEffect: () => ({ ok: true }),
    resolveEffect: (_parent, context) => ({ result: "resolved", reason: "Done", resultData: { durationAnchor: context.resolutionPhaseAnchor } })
  }));
  assert.equal(success.result, "resolved");
  assert.deepEqual(success.record.resultData.durationAnchor, { series: "Hoenn", gym: 4, phase: "shop" });
});

test("[STR-010] production surfaces enforce Move Deleter and post-payout Purge", () => {
  const appSource = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
  assert.match(appSource, /activeMoveRestrictions/);
  assert.match(appSource, /Unavailable this Gym because of Move Deleter/);
  assert.match(appSource, /captureCurrentGymBroughtTeamSnapshot/);
  assert.match(appSource, /resolvePostPayoutPurgeMarkers/);
  assert.match(appSource, /smokescreenWheelResultPlayerId/);
  assert.match(appSource, /metadata\.opensResponseWindow !== false && metadata\.canBeRespondedTo !== false/);
  assert.match(appSource, /eligiblePlayerIds: responsesAllowed \? tokenWindowEligiblePlayerIds\(draft\) : \[\]/);
  assert.match(appSource, /payload\.responsesAllowed === false\s*\? \[\]/);
});

test("[STR-011] Teleport has one persisted delayed-return production lifecycle", () => {
  const appSource = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
  const definition = contract.definitionFor("teleport");
  assert.equal(contract.activationUsabilityFor(definition).ok, true);
  assert.equal(definition.mechanicContract.revalidateAtReturn, true);
  assert.equal(definition.mechanicContract.gameplayIllegalityRefunds, false);
  assert.equal(definition.mechanicContract.systemCorruptUnsupportedResult, "canceledRefunded");
  assert.match(appSource, /function teleportDelayableParentPlan/);
  assert.match(appSource, /function processDueTeleportDelayedEffects/);
  assert.match(appSource, /interaction-teleport-return-/);
  assert.match(appSource, /teleportReturnRevalidation/);
  assert.match(appSource, /refundTokenConsumptionsByIds\(teleportDelayedConsumptionIds\(record\)/);
  assert.match(appSource, /record\.status = "awaitingReturnResolution"/);
  assert.match(appSource, /activity\.payload\.delayedEffectId = responseEffect\.delayedRecord\.id/);
  assert.match(appSource, /processDueTeleportDelayedEffects\(\)/);
});

test("[STR-012] Revenge has a persisted post-payout choice and atomic production resolver", () => {
  const appSource = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
  const definition = contract.definitionFor("revenge");
  assert.equal(contract.activationUsabilityFor(definition).ok, true);
  assert.equal(definition.opensResponseWindow, false);
  assert.equal(definition.mechanicContract.optionalOfferCanBeDeclinedWithoutConsumption, true);
  assert.match(appSource, /function createRevengePostPayoutProcedures/);
  assert.match(appSource, /function resolveRevengePostPayoutProcedureFromForm/);
  assert.match(appSource, /data-revenge-procedure-confirm/);
  assert.match(appSource, /Choose exactly two Pokemon from that player's immutable brought team/);
  assert.match(appSource, /resolveRevengePostPayout\(state/);
  assert.match(appSource, /consumeTokenForEffect\(\{/);
  assert.match(appSource, /previousPostPayoutProcedures/);
  assert.match(appSource, /previousPostPayoutInteractionEvents/);
  assert.match(appSource, /createRevengePostPayoutProcedures\(broughtTeamSnapshot\)/);
});
