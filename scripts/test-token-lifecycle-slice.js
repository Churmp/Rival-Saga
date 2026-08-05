"use strict";

const assert = require("node:assert/strict");
const { test } = require("node:test");
const effects = require("../token-control-effects.js");
const contract = require("../token-effect-contract.js");
const { controlStateFixture } = require("./token-controller-test-fixture.js");

let sequence = 0;
function options(state, overrides = {}) {
  return {
    state,
    series: overrides.series || state.series,
    gym: Number(overrides.gym || state.gym),
    phase: overrides.phase || state.phase,
    seriesOrder: ["Kanto", "Johto", "Hoenn"],
    now: `2026-08-04T12:00:${String(sequence).padStart(2, "0")}.000Z`,
    makeId: (prefix) => `${prefix}-lifecycle-${++sequence}`,
    definitionFor: (value) => contract.definitionFor(value)
  };
}

test("[TLS-001] Cold Wave suppresses every explicit ongoing consumer without mutating or reviving its source", () => {
  const state = controlStateFixture("lifecycle-cold-wave");
  state.players.find((player) => player.id === "steevee").inventory.push({ id: "steevee-follow-source", name: "Restrict", type: "TOKEN" });
  state.lingeringStatuses.push(
    { id: "ongoing-money", type: "test-ongoing", status: "active", isOngoingEffect: true, series: "Kanto", gym: 1, targetPlayerId: "gold" },
    { id: "duration-only", type: "duration-only", status: "active", durationGyms: 2, series: "Kanto", gym: 1, targetPlayerId: "gold" }
  );
  const relationship = effects.createFollowMeCopyRelationship(state, {
    sourceEffectId: "follow-source", sourcePlayerId: "steevee", beneficiaryPlayerId: "gold"
  }, options(state));
  assert.equal(relationship.record.isOngoingEffect, true);
  const cold = effects.resolveColdWave(state, { sourceEffectId: "cold-source" }, options(state));
  assert.deepEqual(new Set(cold.suppressedEffectIds), new Set(["ongoing-money", relationship.record.id]));
  assert.equal(effects.activeStatuses(state, options(state), (status) => status.id === "ongoing-money").length, 0);
  assert.equal(effects.activeStatuses(state, options(state), (status) => status.id === "duration-only").length, 1);
  const consumption = { id: "consume-during-cold", playerId: "steevee", tokenId: "steevee-follow-source", tokenName: "Restrict", inventoryItem: { id: "steevee-follow-source", name: "Restrict" } };
  assert.equal(effects.copyConsumedTokenForRelationships(state, consumption, options(state)).length, 0);
  effects.expireColdWaveAtGymEnd(state, options(state, { phase: "end" }));
  assert.equal(effects.copyConsumedTokenForRelationships(state, consumption, options(state)).length, 1);
  state.lingeringStatuses.find((status) => status.id === "ongoing-money").status = "expired";
  assert.equal(effects.activeStatuses(state, options(state), (status) => status.id === "ongoing-money").length, 0);
});

test("[TLS-002] Wicked Blow keeps exact Active identity and deliberately fails closed for unresolved mixed-tier branches", () => {
  const state = controlStateFixture("lifecycle-wicked");
  const target = state.pokemonRecords.find((pokemon) => pokemon.id === "red-garchomp");
  const result = effects.resolveWickedBlow(state, {
    actorPlayerId: "steevee", targetPokemonId: target.id, sourceEffectId: "wicked-linear"
  }, {
    ...options(state),
    wickedBlowReplacementPlan: () => ({ ok: true, pokemonPatch: { name: "Barbaracle", currentSpecies: "Barbaracle", moves: [] }, replacementSpecies: "Barbaracle", replacementTier: "C", finalEvolutionTier: "S", poolSize: 1 })
  });
  assert.equal(result.result, "resolved");
  assert.equal(result.pokemon.id, "red-garchomp");
  assert.equal(result.pokemon.name, "Barbaracle");
  const unresolved = effects.wickedBlowResolutionPlan(state, result.pokemon, {
    ...options(state),
    wickedBlowReplacementPlan: () => ({ ok: false, reason: "Final-evolution branches have different Battle Tiers." })
  }, true);
  assert.equal(unresolved.ok, false);
  assert.match(unresolved.reason, /different Battle Tiers/i);
});

test("[TLS-003] Teleport classifies legal, gameplay-no-effect, system-failure, and duplicate returns exactly", () => {
  const makeState = (id) => ({ ...controlStateFixture(id), delayedEffects: [] });
  const schedule = (state, id) => effects.scheduleTeleportDelayedEffect(state, {
    sourceResponseId: `response-${id}`, sourcePlayerId: "gold", parentEffect: { id: `parent-${id}`, payload: { tokenName: "Restrict", targetPokemonId: "red-garchomp" } }
  }, options(state, { phase: "action" }));
  const legalState = makeState("teleport-legal");
  const legal = schedule(legalState, "legal");
  const resolved = effects.resolveTeleportDelayedEffect(legalState, legal.record.id, {
    ...options(legalState, { gym: 2, phase: "action" }), revalidateEffect: () => ({ ok: true }), resolveEffect: () => ({ result: "resolved", resultData: { exact: true } })
  });
  assert.equal(resolved.result, "resolved");
  assert.equal(effects.resolveTeleportDelayedEffect(legalState, legal.record.id, options(legalState, { gym: 2, phase: "action" })).duplicateResolution, true);
  const staleState = makeState("teleport-stale");
  const stale = schedule(staleState, "stale");
  assert.equal(effects.resolveTeleportDelayedEffect(staleState, stale.record.id, {
    ...options(staleState, { gym: 2, phase: "action" }), revalidateEffect: () => ({ ok: false, classification: "gameplay", reason: "Target left Active Roster." })
  }).result, "resolvedNoEffect");
  const failedState = makeState("teleport-failed");
  const failed = schedule(failedState, "failed");
  const failure = effects.resolveTeleportDelayedEffect(failedState, failed.record.id, {
    ...options(failedState, { gym: 2, phase: "action" }), revalidateEffect: () => ({ ok: false, classification: "unsupported", reason: "Resolver missing." })
  });
  assert.equal(failure.result, "canceledRefunded");
  assert.equal(failure.refundRequired, true);
});

test("[TLS-004] Reroll supersedes one exact unresolved result once and preserves a causal original revision", () => {
  const state = controlStateFixture("lifecycle-reroll");
  state.randomPokemonSessions = [{ id: "result-1", sourceType: "encounter", status: "pending", rerollable: true, playerId: "gold", ownerPlayerId: "gold", resultOwnerPlayerId: "gold", resultDisplayName: "Abra", resultPokemonName: "abra", resultMetadata: { key: "abra" } }];
  state.players.find((player) => player.id === "gold").inventory.push({ id: "gold-reroll-1", name: "Reroll", canonicalId: "reroll-token", type: "TOKEN" });
  const input = { sourceEffectId: "reroll-operation-1", actorPlayerId: "gold", tokenInventoryRecordId: "gold-reroll-1", targetResultId: "result-1", replacementResult: { key: "ralts", displayName: "Ralts" } };
  const result = effects.resolveRerollResultRecord(state, input, options(state));
  assert.equal(result.result, "resolved");
  assert.equal(result.session.resultDisplayName, "Ralts");
  assert.equal(result.previousResult.status, "superseded");
  assert.equal(state.players.find((player) => player.id === "gold").inventory.some((item) => item.id === "gold-reroll-1"), false);
  assert.equal(effects.resolveRerollResultRecord(state, input, options(state)).duplicateResolution, true);
  result.session.status = "confirmed";
  assert.equal(effects.resolveRerollResultRecord(state, { ...input, sourceEffectId: "reroll-stale" }, options(state)).result, "noEffect");

  const wheelState = controlStateFixture("lifecycle-reroll-wheel");
  wheelState.randomPokemonSessions = [{ id: "wheel-result-1", sourceType: "game-corner", status: "pending", rerollable: true, playerId: "gold", ownerPlayerId: "gold", resultOwnerPlayerId: "gold", resultDisplayName: "Eevee", resultPokemonName: "eevee" }];
  wheelState.players.find((player) => player.id === "gold").inventory.push({ id: "gold-wheel-reroll-1", name: "Reroll", canonicalId: "reroll-token", type: "TOKEN" });
  const wheelResult = effects.resolveRerollResultRecord(wheelState, {
    sourceEffectId: "reroll-wheel-operation-1", actorPlayerId: "gold", tokenInventoryRecordId: "gold-wheel-reroll-1",
    targetResultId: "wheel-result-1", replacementResult: { key: "porygon", displayName: "Porygon" }
  }, options(wheelState));
  assert.equal(wheelResult.result, "resolved");
  assert.equal(wheelResult.session.resultDisplayName, "Porygon");
  assert.equal(wheelResult.operation.targetResultId, "wheel-result-1");
});

test("[TLS-005] Honey copies only settled intrinsic encounter identity and rejects recursive or stale sources", () => {
  const state = controlStateFixture("lifecycle-honey");
  state.randomPokemonSessions = [{ id: "source-encounter", sourceType: "encounter", sourceLabel: "Encounter Wheel", status: "confirmed", series: "Kanto", gym: 1, resultDisplayName: "Rotom-Wash", tierId: "B", level: 54, resultMetadata: { speciesId: "rotom", speciesName: "Rotom", form: "Wash", intrinsicRolledProperties: { shiny: true } }, ownerPlayerId: "red", rosterPokemonId: "red-old", acquiredAt: "old" }];
  const result = effects.resolveHoneyEncounterCopy(state, { sourceEffectId: "honey-1", ownerPlayerId: "gold", sourceRandomPokemonSessionId: "source-encounter" }, options(state));
  assert.equal(result.result, "resolved");
  assert.notEqual(result.randomSession.id, "source-encounter");
  assert.equal(result.randomSession.resultMetadata.form, "Wash");
  assert.equal(result.randomSession.tierId, "B");
  assert.equal(result.randomSession.level, 54);
  assert.equal(result.randomSession.rosterPokemonId, undefined);
  result.randomSession.status = "confirmed";
  assert.equal(effects.resolveHoneyEncounterCopy(state, { sourceEffectId: "honey-recursive", ownerPlayerId: "gold", sourceRandomPokemonSessionId: result.randomSession.id }, options(state)).result, "systemFailure");
  state.randomPokemonSessions[0].status = "pending";
  assert.equal(effects.resolveHoneyEncounterCopy(state, { sourceEffectId: "honey-stale", ownerPlayerId: "gold", sourceRandomPokemonSessionId: "source-encounter" }, options(state)).result, "systemFailure");
});

test("[TLS-006] Purge releases immutable exact IDs atomically, preserves same-species nonmembers, and fails closed when a snapshot member is absent", () => {
  const state = controlStateFixture("lifecycle-purge");
  const snapshot = effects.createImmutableBroughtSnapshot(state, { id: "purge-snapshot", broughtByPlayer: { red: [{ rosterInstanceId: "red-garchomp" }, { rosterInstanceId: "red-lucario" }] } }, options(state));
  const marker = effects.resolvePurgeMarker(state, { sourceEffectId: "purge-root", actorPlayerId: "steevee", targetPlayerId: "red" }, options(state));
  const result = effects.resolvePostPayoutPurge(state, { markerStatusId: marker.status.id, broughtSnapshotId: snapshot.id }, options(state));
  assert.equal(result.result, "resolved");
  assert.deepEqual(new Set(result.releasedPokemon.map((pokemon) => pokemon.id)), new Set(["red-garchomp", "red-lucario"]));
  assert.equal(state.pokemonRecords.find((pokemon) => pokemon.id === "red-garchomp-2").status, "Active");
  assert.equal(effects.resolvePostPayoutPurge(state, { markerStatusId: marker.status.id, broughtSnapshotId: snapshot.id }, options(state)).duplicateResolution, true);
  const failedState = controlStateFixture("lifecycle-purge-missing");
  const failedSnapshot = effects.createImmutableBroughtSnapshot(failedState, { id: "missing-snapshot", broughtByPlayer: { red: [{ rosterInstanceId: "missing-id" }] } }, options(failedState));
  const failedMarker = effects.resolvePurgeMarker(failedState, { sourceEffectId: "purge-failed", actorPlayerId: "steevee", targetPlayerId: "red" }, options(failedState));
  const failure = effects.resolvePostPayoutPurge(failedState, { markerStatusId: failedMarker.status.id, broughtSnapshotId: failedSnapshot.id }, options(failedState));
  assert.equal(failure.result, "systemFailure");
  assert.equal(failedMarker.status.status, "active");
});
