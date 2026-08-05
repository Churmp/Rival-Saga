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
    now: `2026-08-03T15:00:${String(sequence).padStart(2, "0")}.000Z`,
    makeId: (prefix) => `${prefix}-completion-${++sequence}`,
    keyForSpecies: effects.defaultSpeciesKey
  };
}

test("[TCS-001] Restrict uses canonical identity, six-Gym expiration, and exact Rage immunity", () => {
  const state = controlStateFixture("completion-restrict");
  const rage = effects.resolveRageCandyBar(state, {
    targetPokemonId: "gold-garchomp",
    requiredOwnerPlayerId: "gold"
  }, options(state));
  assert.equal(rage.result, "resolved");
  const restricted = effects.resolveRestrict(state, {
    speciesName: "  GARCHOMP  ",
    expiresAtSeries: "Kanto",
    expiresAtGym: 7
  }, options(state));
  assert.equal(restricted.status.durationGyms, 6);
  assert.equal(effects.battleLegality(state, state.pokemonRecords.find((p) => p.id === "gold-garchomp"), "garchomp", options(state)).legal, true);
  assert.equal(effects.battleLegality(state, state.pokemonRecords.find((p) => p.id === "red-garchomp"), "Garchomp", options(state)).legal, false);
  effects.expireAtStartOfGym(state, options(state, { gym: 6 }));
  assert.equal(restricted.status.status, "active");
  assert.equal(effects.expireAtStartOfGym(state, options(state, { gym: 7 })).some((status) => status.id === restricted.status.id), true);
  assert.equal(effects.defaultSpeciesKey("Nidoran♀"), "nidoran-f");
  assert.equal(effects.defaultSpeciesKey("Mr. Mime"), effects.defaultSpeciesKey("MR MIME"));
  assert.equal(effects.defaultSpeciesKey("Farfetch’d"), effects.defaultSpeciesKey("Farfetchd"));
});

test("[TCS-002] Extra Ban requires an exact Active anchor and checks Substitute only there", () => {
  const state = controlStateFixture("completion-extra-ban");
  const legacy = effects.resolveExtraBan(state, { targetPokemonId: "red-lucario-legacy" }, options(state));
  assert.equal(legacy.result, "noEffect");
  assert.match(legacy.reason, /Active roster/i);
  effects.resolveSubstitutePlacement(state, { targetPokemonId: "red-garchomp-2", requiredOwnerPlayerId: "red" }, options(state));
  const ban = effects.resolveExtraBan(state, { targetPokemonId: "red-garchomp" }, options(state));
  const firstInterception = effects.interceptEffectWithSubstitute(state, {
    ...ban.status,
    effectType: "ban",
    sourceEffectId: "extra-ban-first"
  }, options(state));
  assert.equal(firstInterception.negateEntireEffect, false);
  assert.equal(state.lingeringStatuses.find((status) => status.targetPokemonId === "red-garchomp-2" && status.type === "substitute-attached").status, "active");
  effects.resolveSubstitutePlacement(state, { targetPokemonId: "red-garchomp", requiredOwnerPlayerId: "red" }, options(state));
  const selectedInterception = effects.interceptEffectWithSubstitute(state, {
    ...ban.status,
    effectType: "ban",
    sourceEffectId: "extra-ban-selected"
  }, options(state));
  assert.equal(selectedInterception.negateEntireEffect, true);
  assert.deepEqual(selectedInterception.consumedStatusIds.length, 1);
});

test("[TCS-003] Unban removes one exact status, fails stale, and preserves another schedule", () => {
  const state = controlStateFixture("completion-unban");
  const restrict = effects.createStatus(state, {
    type: "restrict", name: "Restricted", targetPokemonName: "Lucario", speciesId: "lucario",
    applicationScope: "globalSpecies", durationGyms: 6, expiresAtSeries: "Kanto", expiresAtGym: 7
  }, options(state));
  const ban = effects.createStatus(state, {
    type: "ban", name: "Banned", targetPokemonName: "Lucario", speciesId: "lucario",
    applicationScope: "globalSpecies", duration: "Indefinite"
  }, options(state));
  const ambiguous = effects.resolveUnban(state, { speciesName: "Lucario" }, options(state));
  assert.equal(ambiguous.exactChoiceRequired, true);
  const unban = effects.resolveUnban(state, {
    speciesName: "LUCARIO",
    selectedStatusId: restrict.id,
    expiresAtSeries: "Kanto",
    expiresAtGym: 7
  }, options(state));
  assert.deepEqual(unban.removedStatusIds, [restrict.id]);
  assert.equal(restrict.status, "removed");
  assert.equal(ban.status, "active");
  assert.equal(ban.duration, "Indefinite");
  const stale = effects.resolveUnban(state, { speciesName: "Lucario", selectedStatusId: "missing-status" }, options(state));
  assert.equal(stale.staleTarget, true);
});

test("[TCS-004] Clear Smog removes only exact provenance and preserves native build data", () => {
  const state = controlStateFixture("completion-clear-smog");
  const pokemon = state.pokemonRecords.find((entry) => entry.id === "gold-garchomp");
  pokemon.ability = "Rough Skin";
  pokemon.moves = ["Earthquake", "Protect"];
  pokemon.buffs = ["+3 Levels", "AAA Ability: Levitate", "Native Ribbon"];
  pokemon.effectBuffs = [
    { id: "rage-level", label: "+3 Levels", type: "levelBonus", status: "active", clearable: true },
    { id: "aaa-ability", label: "AAA Ability: Levitate", type: "abilityGrant", status: "active", clearable: true },
    { id: "expired-buff", label: "Expired", type: "levelBonus", status: "expired", clearable: true }
  ];
  state.players.find((player) => player.id === "gold").moveAccessGrants = [
    { id: "exact-move", pokemonRecordId: pokemon.id, moveName: "Fake Out", status: "active", active: true },
    { id: "player-wide", moveName: "Recover", status: "active", active: true }
  ];
  const result = effects.resolveClearSmog(state, { targetPokemonId: pokemon.id, sourceEffectId: "clear" }, options(state));
  assert.deepEqual(result.removedEffectBuffIds, ["rage-level", "aaa-ability"]);
  assert.deepEqual(result.removedMoveGrantIds, ["exact-move"]);
  assert.deepEqual(pokemon.buffs, ["Native Ribbon"]);
  assert.equal(pokemon.ability, "Rough Skin");
  assert.deepEqual(pokemon.moves, ["Earthquake", "Protect"]);
  assert.equal(pokemon.effectBuffs.find((buff) => buff.id === "expired-buff").status, "expired");
  assert.equal(state.players.find((player) => player.id === "gold").moveAccessGrants.find((grant) => grant.id === "player-wide").status, "active");
});

test("[TCS-005] Rage Candy shares one enhancement, extends, and remains exact across same-species copies", () => {
  const state = controlStateFixture("completion-rage");
  state.pokemonRecords.push({ ...structuredClone(state.pokemonRecords[0]), id: "gold-garchomp-2", buffs: [], effectBuffs: [] });
  const first = effects.resolveRageCandyBar(state, { targetPokemonId: "gold-garchomp", requiredOwnerPlayerId: "gold" }, options(state));
  const extended = effects.resolveRageCandyBar(state, { targetPokemonId: "gold-garchomp", requiredOwnerPlayerId: "gold" }, options(state));
  const second = effects.resolveRageCandyBar(state, { targetPokemonId: "gold-garchomp-2", requiredOwnerPlayerId: "gold" }, options(state));
  assert.equal(first.status.id, extended.status.id);
  assert.equal(extended.status.durationGyms, 4);
  assert.equal(extended.status.extensionCount, 1);
  assert.equal(state.pokemonRecords.find((p) => p.id === "gold-garchomp").effectBuffs.length, 2);
  assert.notEqual(second.status.id, first.status.id);
  assert.equal(effects.pokemonHasRestrictImmunity(state, state.pokemonRecords.find((p) => p.id === "gold-garchomp"), options(state)), true);
  assert.equal(effects.pokemonHasRestrictImmunity(state, state.pokemonRecords.find((p) => p.id === "red-garchomp"), options(state)), false);
});

test("[TCS-006] Safeguard executable category matrix is exact-player and fail-closed", () => {
  const state = controlStateFixture("completion-safeguard");
  const definition = contract.definitionFor("safeguard");
  assert.equal(definition.canBeRespondedTo, true);
  const result = effects.resolveSafeguard(state, {
    targetPlayerId: "gold", actorPlayerId: "gold", expiresAtSeries: "Kanto", expiresAtGym: 2, expiresAtPhase: "start"
  }, options(state));
  assert.equal(result.result, "resolved");
  effects.SAFEGUARD_PROTECTED_CATEGORIES.forEach((category) => {
    assert.equal(effects.playerHasActiveSafeguard(state, "gold", category, options(state)), true, category);
    assert.equal(effects.playerHasActiveSafeguard(state, "red", category, options(state)), false, `${category}:target-scope`);
  });
  ["itemSteal", "itemDestroy", "tmSteal", "tmDestroy", "pokemonSteal", "forcedPayment", "counterspellRestoration"].forEach((category) => {
    assert.equal(effects.safeguardProtectsOperation(category), false, category);
    assert.equal(effects.playerHasActiveSafeguard(state, "gold", category, options(state)), false, category);
  });
  assert.equal(effects.expireAtStartOfGym(state, options(state, { gym: 2 })).some((status) => status.id === result.status.id), true);
  assert.equal(effects.playerHasActiveSafeguard(state, "gold", "tokenCopy", options(state, { gym: 2 })), false);
});
