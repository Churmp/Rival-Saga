const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const effects = require("../token-control-effects.js");
const contract = require("../token-effect-contract.js");
const tokenSandbox = require("../token-sandbox-session.js");
const { sanitizeSharedGamePayloadForDelivery } = require("../server.js");

const seriesOrder = ["Kanto", "Johto", "Hoenn"];
const tierOrder = ["LC", "LC Elite", "Safari", "Safari Elite", "Poke", "Poke Elite", "Great", "Great Elite", "Ultra", "Ultra Elite", "Master", "Master Elite"];
let idSequence = 0;

function fixture() {
  return {
    series: "Kanto",
    gym: 1,
    players: [
      {
        id: "gold",
        name: "Gold",
        badgePoints: 6,
        moveAccessGrants: [],
        perks: [],
        inventory: [
          { id: "gold-leftovers", name: "Leftovers", type: "ITEM" },
          { id: "gold-recover", name: "Recover", moveName: "Recover", type: "TM" },
          { id: "gold-master-ball", name: "Master Ball", type: "ITEM" }
        ]
      },
      {
        id: "red",
        name: "Red",
        badgePoints: 6,
        moveAccessGrants: [],
        perks: [],
        inventory: [
          { id: "red-leftovers-1", name: "Leftovers", type: "ITEM" },
          { id: "red-leftovers-2", name: "Leftovers", type: "ITEM" },
          { id: "red-recover", name: "Recover", moveName: "Recover", type: "TM" },
          { id: "red-master-ball", name: "Master Ball", type: "ITEM" }
        ]
      },
      {
        id: "steevee",
        name: "Steevee",
        badgePoints: 6,
        moveAccessGrants: [],
        perks: [],
        inventory: [{ id: "steevee-leftovers", name: "Leftovers", type: "ITEM" }]
      }
    ],
    pokemonRecords: [
      { id: "gold-garchomp", trainerId: "gold", name: "Garchomp", battleTier: "Great", status: "Active", rosterType: "Active", buffs: [], effectBuffs: [], nerfs: [] },
      { id: "red-garchomp", trainerId: "red", name: "Garchomp", battleTier: "Great", status: "Active", rosterType: "Active", buffs: [], effectBuffs: [], nerfs: [] },
      { id: "red-lucario", trainerId: "red", name: "Lucario", battleTier: "Great", status: "Active", rosterType: "Active", buffs: [], effectBuffs: [], nerfs: [] }
    ],
    lingeringStatuses: [],
    globalPokemonRules: {},
    banlistHistory: [],
    effectOperations: []
  };
}

function options(state, gym = state.gym, phase = "action") {
  const naturalTier = state.naturalBattleTier || "Great";
  return {
    series: state.series,
    gym,
    phase,
    seriesOrder,
    now: `2026-07-${String(gym).padStart(2, "0")}T12:00:00.000Z`,
    makeId: (prefix) => `${prefix}-${gym}-${++idSequence}`,
    battleTeamKey: () => `${state.series}:G${gym}`,
    teamSizeForPlayer: () => 6,
    battleTierForPokemon: (pokemon) => pokemon.battleTier || "Great",
    naturalBattleTier: () => naturalTier,
    tierIndexForName: (tier) => tierOrder.indexOf(tier),
    requiredBadgePointsForPokemon: (pokemon) => Math.max(0, tierOrder.indexOf(pokemon.battleTier || "Great") - tierOrder.indexOf(naturalTier)),
    bringLegalityForPokemon: (pokemon) => state.blockedArenaTrapTargetIds?.includes(pokemon.id)
      ? { ok: false, reason: `${pokemon.name} is not Badge-legal.` }
      : { ok: true, reason: "" },
    abilityExists: () => true,
    moveExists: () => true
  };
}

function source(extra = {}) {
  return {
    sourceTokenId: "token-1",
    sourceTokenName: "Control Token",
    actorPlayerId: "steevee",
    actorPlayerName: "Steevee",
    sourceEffectId: "event-1",
    ...extra
  };
}

function placeSubstitute(state, pokemonId, ownerId, extra = {}) {
  return effects.resolveSubstitutePlacement(state, source({
    sourceTokenName: "Substitute",
    targetPokemonId: pokemonId,
    requiredOwnerPlayerId: ownerId,
    ...extra
  }), options(state));
}

test("[TCF-001] contract exposes selected-target and application-scope semantics", () => {
  assert.deepEqual(contract.validate(), []);
  assert.equal(contract.definitions["restrict-token"].targetScope, "species");
  assert.equal(contract.definitions["restrict-token"].applicationScope, "globalSpecies");
  assert.equal(contract.definitions.substitute.applicationScope, "rosterInstance");
  assert.equal(contract.definitions["flame-curse"].selectedTargetType, "rosterInstance");
  assert.equal(contract.definitions["flame-curse"].applicationScope, "globalSpecies");
  assert.equal(contract.definitions["extra-ban-token"].targetScope, "rosterInstance");
  assert.equal(contract.definitions["extra-ban-token"].selectedTargetType, "rosterInstance");
  assert.equal(contract.definitions["extra-ban-token"].applicationScope, "globalSpecies");
  assert.equal(contract.definitions["extra-ban-token"].substituteInterceptionPolicy, "negateEntireEffect");
  assert.equal(contract.definitions["extra-ban-token"].substituteChecksSelectedTargetOnly, true);
  assert.equal(contract.definitions["rage-candy-bar"].duration.startsWith("2 Gyms"), true);
});

test("[TCF-002] Substitute placement enforces ownership and does not duplicate an active attachment", () => {
  const state = fixture();
  const wrongOwner = placeSubstitute(state, "gold-garchomp", "red");
  assert.equal(wrongOwner.result, "noEffect");
  assert.equal(state.lingeringStatuses.length, 0);
  const placed = placeSubstitute(state, "gold-garchomp", "gold");
  assert.equal(placed.result, "resolved");
  assert.equal(placed.status.applicationScope, "rosterInstance");
  assert.deepEqual(placed.status.affectedRosterInstanceIds, ["gold-garchomp"]);
  const duplicate = placeSubstitute(state, "gold-garchomp", "gold");
  assert.equal(duplicate.result, "noEffect");
  assert.equal(state.lingeringStatuses.filter((status) => status.type === "substitute-attached").length, 1);
});

test("[TCF-003] a one-instance effect consumes Substitute and exempts only that roster instance", () => {
  const state = fixture();
  placeSubstitute(state, "gold-garchomp", "gold");
  const interception = effects.interceptEffectWithSubstitute(state, source({
    effectType: "curse-iron-ball",
    applicationScope: "rosterInstance",
    selectedRosterInstanceIds: ["gold-garchomp"],
    affectedRosterInstanceIds: ["gold-garchomp"]
  }), options(state));
  assert.equal(interception.result, "intercepted");
  assert.equal(interception.negateEntireEffect, false);
  assert.deepEqual(interception.excludedRosterInstanceIds, ["gold-garchomp"]);
  assert.equal(state.lingeringStatuses[0].status, "consumed");
});

test("[TCF-004] a multi-instance effect preserves unprotected targets", () => {
  const state = fixture();
  placeSubstitute(state, "gold-garchomp", "gold");
  const interception = effects.interceptEffectWithSubstitute(state, source({
    effectType: "multi-status",
    applicationScope: "selectedRosterInstances",
    selectedRosterInstanceIds: ["gold-garchomp", "red-lucario"],
    affectedRosterInstanceIds: ["gold-garchomp", "red-lucario"]
  }), options(state));
  assert.deepEqual(interception.affectedRosterInstanceIds, ["gold-garchomp", "red-lucario"]);
  assert.deepEqual(interception.excludedRosterInstanceIds, ["gold-garchomp"]);
  assert.equal(interception.negateEntireEffect, false);
});

test("[TCF-005] an exact-instance Flame Curse is intercepted only for its selected roster instance", () => {
  const state = fixture();
  placeSubstitute(state, "gold-garchomp", "gold");
  const interception = effects.interceptEffectWithSubstitute(state, source({
    effectType: "curse-flame-orb",
    applicationScope: "rosterInstance",
    selectedRosterInstanceId: "gold-garchomp",
    selectedRosterInstanceIds: ["gold-garchomp"],
    affectedRosterInstanceIds: ["gold-garchomp"]
  }), options(state));
  assert.equal(interception.result, "intercepted");
  assert.deepEqual(interception.excludedRosterInstanceIds, ["gold-garchomp"]);
  assert.deepEqual(interception.affectedRosterInstanceIds, ["gold-garchomp"]);
  assert.equal(state.lingeringStatuses.find((status) => status.type === "substitute-attached").status, "consumed");
});

test("[TCF-006] one Substitute negates an entire species-wide Ban and creates current-phase protection", () => {
  const state = fixture();
  placeSubstitute(state, "gold-garchomp", "gold");
  const interception = effects.interceptEffectWithSubstitute(state, source({
    effectType: "ban",
    applicationScope: "globalSpecies",
    speciesName: "Garchomp",
    selectedRosterInstanceId: "gold-garchomp",
    selectedRosterInstanceIds: ["gold-garchomp"],
    substituteInterceptionPolicy: "negateEntireEffect",
    substituteChecksSelectedTargetOnly: true
  }), options(state));
  assert.equal(interception.negateEntireEffect, true);
  assert.equal(interception.consumedStatusIds.length, 1);
  assert.equal(interception.createdStatusIds.length, 1);
  assert.equal(effects.activeSpeciesStatuses(state, "Garchomp", "ban", options(state)).length, 0);
  assert.equal(effects.speciesHasBanPhaseProtection(state, "Garchomp", options(state)), true);
  assert.equal(effects.speciesHasBanPhaseProtection(state, "Garchomp", options(state, 1, "shop")), false);
});

test("[TCF-007] a universal Ban checks only its selected roster-instance anchor", () => {
  const state = fixture();
  const goldSubstitute = placeSubstitute(state, "gold-garchomp", "gold").status;
  const redSubstitute = placeSubstitute(state, "red-garchomp", "red").status;
  const beforeFirst = effects.snapshot(state);
  const interception = effects.interceptEffectWithSubstitute(state, source({
    effectType: "ban",
    applicationScope: "globalSpecies",
    speciesName: "Garchomp",
    selectedRosterInstanceId: "gold-garchomp",
    selectedRosterInstanceIds: ["gold-garchomp"],
    substituteInterceptionPolicy: "negateEntireEffect",
    substituteChecksSelectedTargetOnly: true
  }), options(state));
  assert.equal(interception.negateEntireEffect, true);
  assert.deepEqual(interception.consumedStatusIds, [goldSubstitute.id]);
  assert.equal(goldSubstitute.status, "consumed");
  assert.equal(redSubstitute.status, "active");
  assert.equal(effects.activeSpeciesStatuses(state, "Garchomp", "ban", options(state)).length, 0);
  const reloaded = JSON.parse(JSON.stringify(state));
  assert.equal(reloaded.lingeringStatuses.find((status) => status.id === redSubstitute.id).status, "active");
  effects.restore(state, beforeFirst);
  assert.equal(state.lingeringStatuses.find((status) => status.id === goldSubstitute.id).status, "active");
  assert.equal(state.lingeringStatuses.find((status) => status.id === redSubstitute.id).status, "active");

  const reversed = effects.interceptEffectWithSubstitute(state, source({
    effectType: "ban",
    applicationScope: "globalSpecies",
    speciesName: "Garchomp",
    selectedRosterInstanceId: "red-garchomp",
    selectedRosterInstanceIds: ["red-garchomp"],
    substituteInterceptionPolicy: "negateEntireEffect",
    substituteChecksSelectedTargetOnly: true
  }), options(state));
  assert.deepEqual(reversed.consumedStatusIds, [redSubstitute.id]);
  assert.equal(state.lingeringStatuses.find((status) => status.id === goldSubstitute.id).status, "active");
  assert.equal(state.lingeringStatuses.find((status) => status.id === redSubstitute.id).status, "consumed");
});

test("[TCF-008] a species-wide Ban without a selected-instance interception rule does not inspect every Substitute", () => {
  const state = fixture();
  const goldSubstitute = placeSubstitute(state, "gold-garchomp", "gold").status;
  const redSubstitute = placeSubstitute(state, "red-garchomp", "red").status;
  const interception = effects.interceptEffectWithSubstitute(state, source({
    effectType: "ban",
    applicationScope: "globalSpecies",
    speciesName: "Garchomp"
  }), options(state));
  assert.equal(interception.result, "notIntercepted");
  assert.deepEqual(interception.consumedStatusIds, []);
  assert.equal(goldSubstitute.status, "active");
  assert.equal(redSubstitute.status, "active");
});

test("[TCF-009] Extra Ban retains its selected anchor but applies to the species globally", () => {
  const state = fixture();
  const resolution = effects.resolveExtraBan(state, source({
    targetPokemonId: "gold-garchomp",
    selectedRosterInstanceId: "gold-garchomp",
    selectedRosterInstanceIds: ["gold-garchomp"]
  }), options(state));
  assert.equal(resolution.result, "resolved");
  assert.equal(resolution.status.selectedTargetType, "rosterInstance");
  assert.equal(resolution.status.selectedRosterInstanceId, "gold-garchomp");
  assert.equal(resolution.status.selectedSpeciesId, "garchomp");
  assert.equal(resolution.status.applicationScope, "globalSpecies");
  assert.equal(effects.battleLegality(state, state.pokemonRecords[0], "Garchomp", options(state)).legal, false);
  assert.equal(effects.battleLegality(state, state.pokemonRecords[1], "Garchomp", options(state)).legal, false);
});

test("[TCF-010] Arena Trap creates one exact-instance bring obligation and expires at Battle Results", () => {
  const state = fixture();
  const ownTarget = effects.resolveArenaTrap(state, source({ targetPokemonId: "gold-garchomp", actorPlayerId: "gold" }), options(state));
  assert.equal(ownTarget.result, "noEffect");
  const resolution = effects.resolveArenaTrap(state, source({ targetPokemonId: "red-lucario", actorPlayerId: "gold" }), options(state));
  assert.equal(resolution.result, "resolved");
  assert.equal(resolution.status.applicationScope, "rosterInstance");
  assert.equal(resolution.status.payload.mustBeBrought, true);
  assert.equal(resolution.status.payload.forcedTeamMember, true);
  assert.equal(resolution.status.payload.teamSlotLock, true);
  assert.equal(resolution.status.payload.compensationStatus, "notRequired");
  assert.deepEqual(resolution.status.payload.grantedCustomizations, []);
  assert.equal(resolution.teamMutation.minimumBadgePoints, 0);
  assert.equal(resolution.teamMutation.rosterInstanceId, "red-lucario");
  assert.equal(state.teambuilder.buildsByPlayerId.red[0].slots.some((slot) => slot.pokemonRecordId === "red-lucario"), true);
  assert.equal(state.battleTeams["Kanto:G1"].red.selected.includes("red-lucario"), true);
  assert.equal(effects.forcedTeamStatusForPokemon(state, "red-lucario", options(state)).id, resolution.status.id);
  assert.equal(effects.pokemonHasArenaTrap(state, state.pokemonRecords[2], options(state)), true);
  assert.equal(effects.pokemonHasArenaTrap(state, state.pokemonRecords[1], options(state)), false);
  const expired = effects.expireArenaTrapsAtBattleEnd(state, options(state, 1, "battle-results"));
  assert.deepEqual(expired.map((status) => status.id), [resolution.status.id]);
  assert.equal(effects.pokemonHasArenaTrap(state, state.pokemonRecords[2], options(state, 1, "battle-results")), false);
  assert.equal(effects.forcedTeamStatusForPokemon(state, "red-lucario", options(state, 1, "battle-results")), null);
  assert.equal(state.battleTeams["Kanto:G1"].red.selected.includes("red-lucario"), true);
  assert.equal(expired.cleanupRecords[0].retainedHistoricalTeamSelection, true);
});

test("[TCF-010C] Arena Trap eligibility is independent from ordered-tier compensation", () => {
  const cases = [
    { tier: "Great", compensation: false, steps: 0 },
    { tier: "Poke Elite", compensation: false, steps: 1 },
    { tier: "Poke", compensation: true, steps: 2 },
    { tier: "Safari", compensation: true, steps: 4 },
    { tier: "Great Elite", compensation: false, steps: 0 }
  ];
  cases.forEach(({ tier, compensation, steps }, index) => {
    const state = fixture();
    state.pokemonRecords[2].battleTier = tier;
    const result = effects.resolveArenaTrap(state, source({
      sourceEffectId: `arena-tier-${index}`,
      targetPokemonId: "red-lucario",
      actorPlayerId: "gold"
    }), options(state));
    assert.equal(result.result, "resolved", tier);
    assert.equal(result.compensationRequired, compensation, tier);
    assert.equal(result.customization.tierStepsBelow, steps, tier);
  });
});

test("[TCF-010D] Badge-legal higher targets preserve minimum Badges and Badge-illegal targets fail before mutation", () => {
  const state = fixture();
  state.naturalBattleTier = "Poke";
  state.pokemonRecords[2].battleTier = "Great";
  const legal = effects.resolveArenaTrap(state, source({ targetPokemonId: "red-lucario", actorPlayerId: "gold" }), options(state));
  assert.equal(legal.result, "resolved");
  assert.equal(legal.teamMutation.minimumBadgePoints, 2);
  assert.equal(state.teambuilder.buildsByPlayerId.red[0].slots[0].assignedBadgePoints, 2);
  assert.equal(state.battleTeams["Kanto:G1"].red.badgeBoosts[0], 2);

  const blocked = fixture();
  blocked.naturalBattleTier = "Poke";
  blocked.pokemonRecords[2].battleTier = "Great";
  blocked.blockedArenaTrapTargetIds = ["red-lucario"];
  const denied = effects.resolveArenaTrap(blocked, source({ targetPokemonId: "red-lucario", actorPlayerId: "gold" }), options(blocked));
  assert.equal(denied.result, "noEffect");
  assert.match(denied.reason, /Badge-legal/);
  assert.equal(blocked.lingeringStatuses.length, 0);
  assert.equal(blocked.teambuilder, undefined);
});

test("[TCF-010E] Arena Trap compensation is exact, structured, reloadable, expiring, and undo-safe", () => {
  const state = fixture();
  state.pokemonRecords[2].battleTier = "Poke";
  const before = effects.snapshot(state);
  const trapped = effects.resolveArenaTrap(state, source({ targetPokemonId: "red-lucario", actorPlayerId: "gold" }), options(state));
  assert.equal(trapped.customization.status, "pending");
  assert.equal(effects.pendingArenaTrapCustomizations(state, "red", options(state)).length, 1);
  const wrongOwner = effects.applyArenaTrapCustomization(state, {
    statusId: trapped.status.id,
    actorPlayerId: "gold",
    kind: "ability",
    name: "Levitate"
  }, options(state));
  assert.equal(wrongOwner.result, "noEffect");
  const selected = effects.applyArenaTrapCustomization(state, {
    statusId: trapped.status.id,
    actorPlayerId: "red",
    kind: "ability",
    name: "Levitate"
  }, options(state));
  assert.equal(selected.result, "resolved");
  assert.equal(selected.grant.pokemonRecordId, "red-lucario");
  assert.equal(selected.grant.sourceStatusId, trapped.status.id);
  assert.equal(state.pokemonRecords[2].effectBuffs.find((buff) => buff.id === selected.grant.id).abilityName, "Levitate");
  assert.equal(state.pokemonRecords[1].effectBuffs.length, 0);
  assert.equal(state.teambuilder.buildsByPlayerId.red[0].slots[0].ability, "Levitate");
  assert.equal(effects.pendingArenaTrapCustomizations(state, "red", options(state)).length, 0);
  const reloaded = JSON.parse(JSON.stringify(state));
  assert.equal(reloaded.lingeringStatuses.find((status) => status.id === trapped.status.id).payload.customization.name, "Levitate");
  const expired = effects.expireArenaTrapsAtBattleEnd(reloaded, options(reloaded, 1, "battle-results"));
  assert.equal(expired.length, 1);
  assert.equal(reloaded.pokemonRecords[2].effectBuffs.find((buff) => buff.id === selected.grant.id).status, "expired");
  effects.restore(state, before);
  assert.equal(state.lingeringStatuses.length, 0);
  assert.equal(state.pokemonRecords[2].effectBuffs.length, 0);
});

test("[TCF-010F] the customization registry bans generic injections but preserves source-specific class exceptions", () => {
  const expectedAbilityBans = ["Wonder Guard", "Moody", "Huge Power", "Pure Power", "Contrary", "Shadow Tag", "Arena Trap", "Hadron Engine", "Orichalcum Pulse", "Simple", "Water Bubble"];
  const expectedMoveBans = ["Last Respects", "Double Iron Bash"];
  assert.deepEqual([...effects.GENERIC_CUSTOMIZATION_BANS.ability], expectedAbilityBans);
  assert.deepEqual([...effects.GENERIC_CUSTOMIZATION_BANS.move], expectedMoveBans);
  expectedAbilityBans.forEach((name) => {
    assert.equal(effects.customizationLegality({ kind: "ability", name, sourceType: "token" }).ok, false, name);
  });
  expectedMoveBans.forEach((name) => {
    assert.equal(effects.customizationLegality({ kind: "move", name, sourceType: "token" }).ok, false, name);
  });
  assert.equal(effects.customizationLegality({ kind: "ability", name: "Levitate", sourceType: "token" }).ok, true);
  assert.equal(effects.customizationLegality({
    kind: "ability",
    name: "Wonder Guard",
    sourceType: "class",
    explicitAbilityAllowlist: ["Wonder Guard"]
  }).ok, true);
  assert.equal(effects.customizationLegality({
    kind: "ability",
    name: "Wonder Guard",
    sourceType: "class",
    explicitAbilityAllowlist: ["Huge Power"]
  }).ok, false);
  const naturallyLegalPokemon = { ability: "Wonder Guard", moves: ["Last Respects", "Double Iron Bash"] };
  assert.deepEqual(naturallyLegalPokemon, { ability: "Wonder Guard", moves: ["Last Respects", "Double Iron Bash"] });
});

test("[TCF-010B] Arena Trap overfills a full team without deleting an unlocked member", () => {
  const state = fixture();
  state.pokemonRecords.push(
    { id: "red-one", trainerId: "red", name: "One", status: "Active", rosterType: "Active", buffs: [], effectBuffs: [], nerfs: [] },
    { id: "red-two", trainerId: "red", name: "Two", status: "Active", rosterType: "Active", buffs: [], effectBuffs: [], nerfs: [] },
    { id: "red-three", trainerId: "red", name: "Three", status: "Active", rosterType: "Active", buffs: [], effectBuffs: [], nerfs: [] },
    { id: "red-four", trainerId: "red", name: "Four", status: "Active", rosterType: "Active", buffs: [], effectBuffs: [], nerfs: [] },
    { id: "red-five", trainerId: "red", name: "Five", status: "Active", rosterType: "Active", buffs: [], effectBuffs: [], nerfs: [] }
  );
  const selectedBefore = ["red-garchomp", "red-one", "red-two", "red-three", "red-four", "red-five"];
  state.teambuilder = {
    activeBuildByPlayerId: { red: "red-build" },
    buildsByPlayerId: { red: [{ id: "red-build", playerId: "red", series: "Kanto", gym: 1, slotCount: 6, slots: selectedBefore.map((pokemonRecordId, slotIndex) => ({ pokemonRecordId, slotIndex })) }] }
  };
  state.battleTeams = { "Kanto:G1": { red: { selected: [...selectedBefore], locked: false } } };
  const resolution = effects.resolveArenaTrap(state, source({ targetPokemonId: "red-lucario", actorPlayerId: "gold" }), options(state));
  const selectedAfter = state.teambuilder.buildsByPlayerId.red[0].slots.map((slot) => slot.pokemonRecordId).filter(Boolean);
  assert.equal(resolution.result, "resolved");
  assert.deepEqual(selectedAfter.slice(0, 6), selectedBefore);
  assert.equal(selectedAfter[6], "red-lucario");
  assert.equal(resolution.teamMutation.repairRequired, true);
  assert.equal(state.teambuilder.teamRepairByPlayerId.red.requiredRemovalCount, 1);
  assert.equal(state.teambuilder.teamRepairByPlayerId.red.forcedRosterInstanceIds.includes("red-lucario"), true);
  assert.equal(state.battleTeams["Kanto:G1"].red.selected.length, 7);
});

test("[TCF-011] Clear Smog removes selected-instance buffs and grants without touching another Pokemon", () => {
  const state = fixture();
  const gold = state.players.find((player) => player.id === "gold");
  const target = state.pokemonRecords[0];
  target.buffs = ["+3 Levels", "Dragon's Den Ability: Levitate", "TM Move Pending"];
  target.effectBuffs = [{ id: "buff-1", type: "levelBonus", amount: 3, label: "+3 Levels", status: "active", clearable: true }];
  gold.moveAccessGrants = [
    { id: "target-grant", pokemonRecordId: "gold-garchomp", moveNames: ["Fake Out"], status: "active", active: true },
    { id: "other-grant", pokemonRecordId: "red-garchomp", moveNames: ["Recover"], status: "active", active: true }
  ];
  const resolution = effects.resolveClearSmog(state, source({ targetPokemonId: "gold-garchomp" }), options(state));
  assert.equal(resolution.result, "resolved");
  assert.equal(target.effectBuffs[0].status, "removed");
  assert.deepEqual(target.buffs, ["TM Move Pending"]);
  assert.equal(gold.moveAccessGrants[0].status, "removed");
  assert.equal(gold.moveAccessGrants[0].active, false);
  assert.equal(gold.moveAccessGrants[1].status, "active");
});

test("[TCF-012] Rage Candy Restrict immunity is checked before Substitute", () => {
  const state = fixture();
  effects.resolveRageCandyBar(state, source({ targetPokemonId: "gold-garchomp", requiredOwnerPlayerId: "gold" }), options(state));
  const substitute = placeSubstitute(state, "gold-garchomp", "gold").status;
  const interception = effects.interceptEffectWithSubstitute(state, source({
    effectType: "restrict",
    applicationScope: "globalSpecies",
    speciesName: "Garchomp"
  }), options(state));
  assert.deepEqual(interception.rageImmuneRosterInstanceIds, ["gold-garchomp"]);
  assert.equal(substitute.status, "active");
  const restrict = effects.resolveRestrict(state, source({
    speciesName: "Garchomp",
    affectedRosterInstanceIds: interception.affectedRosterInstanceIds,
    excludedRosterInstanceIds: interception.excludedRosterInstanceIds
  }), options(state));
  assert.equal(restrict.result, "resolved");
  assert.equal(effects.battleLegality(state, state.pokemonRecords[0], "Garchomp", options(state)).legal, true);
  assert.equal(effects.battleLegality(state, state.pokemonRecords[1], "Garchomp", options(state)).legal, false);
});

test("[TCF-013] instance Restrict affects only selected roster instances", () => {
  const state = fixture();
  const restriction = effects.createInstanceRestriction(state, source({
    selectedRosterInstanceIds: ["gold-garchomp"],
    applicationScope: "submittedTeamInstances",
    durationGyms: 1,
    sourceEffectId: "new-tricks-future"
  }), options(state));
  assert.equal(restriction.result, "resolved");
  assert.equal(effects.battleLegality(state, state.pokemonRecords[0], "Garchomp", options(state)).legal, false);
  assert.equal(effects.battleLegality(state, state.pokemonRecords[1], "Garchomp", options(state)).legal, true);
});

test("[TCF-014] Rage Candy is one timed enhancement; reuse extends without stacking and expiration removes all benefits", () => {
  const state = fixture();
  const first = effects.resolveRageCandyBar(state, source({ targetPokemonId: "gold-garchomp", requiredOwnerPlayerId: "gold" }), options(state));
  assert.equal(first.status.durationGyms, 2);
  assert.equal(first.pokemon.effectBuffs.length, 2);
  assert.ok(first.pokemon.effectBuffs.every((buff) => !buff.permanent && buff.sourceStatusId === first.status.id));
  const repeated = effects.resolveRageCandyBar(state, source({ targetPokemonId: "gold-garchomp", requiredOwnerPlayerId: "gold" }), options(state, 2));
  assert.equal(repeated.extended, true);
  assert.equal(repeated.status.id, first.status.id);
  assert.equal(repeated.status.durationGyms, 4);
  assert.equal(repeated.pokemon.effectBuffs.length, 2);
  assert.equal(effects.remainingGyms(repeated.status, options(state, 4)), 1);
  const expired = effects.expireAtStartOfGym(state, options(state, 5, "start"));
  assert.equal(expired.some((status) => status.id === first.status.id), true);
  assert.equal(effects.pokemonHasRestrictImmunity(state, state.pokemonRecords[0], options(state, 5)), false);
  assert.ok(state.pokemonRecords[0].effectBuffs.every((buff) => buff.status === "expired"));
  assert.deepEqual(state.pokemonRecords[0].buffs, []);
});

test("[TCF-015] exact-instance Substitute interception and Rage duration survive reload and snapshot undo", () => {
  const state = fixture();
  effects.resolveRageCandyBar(state, source({ targetPokemonId: "gold-garchomp", requiredOwnerPlayerId: "gold" }), options(state));
  placeSubstitute(state, "red-garchomp", "red");
  const beforeInterception = effects.snapshot(state);
  const interception = effects.interceptEffectWithSubstitute(state, source({
    effectType: "curse-flame-orb",
    applicationScope: "rosterInstance",
    selectedRosterInstanceId: "red-garchomp",
    selectedRosterInstanceIds: ["red-garchomp"],
    affectedRosterInstanceIds: ["red-garchomp"]
  }), options(state));
  const reloaded = JSON.parse(JSON.stringify(state));
  assert.equal(reloaded.lingeringStatuses.find((entry) => entry.type === "substitute-attached").status, "consumed");
  assert.deepEqual(interception.excludedRosterInstanceIds, ["red-garchomp"]);
  effects.restore(state, beforeInterception);
  assert.equal(state.lingeringStatuses.find((entry) => entry.type === "substitute-attached").status, "active");
});

test("[TCF-016] Substitute and composite enhancements stay isolated in sandbox discard and commit candidates", () => {
  const realState = fixture();
  const manager = tokenSandbox.createSessionManager({
    createSessionId: () => "substitute-sandbox",
    now: () => "2026-07-01T12:00:00.000Z"
  });
  const entered = manager.enter({ realState, revision: 12, revisionVerified: true, persistenceQuiescent: true, controlledPlayerId: "gold" });
  effects.resolveRageCandyBar(entered.workingState, source({ targetPokemonId: "gold-garchomp", requiredOwnerPlayerId: "gold" }), options(entered.workingState));
  placeSubstitute(entered.workingState, "gold-garchomp", "gold");
  assert.equal(realState.lingeringStatuses.length, 0);
  manager.discard();
  assert.equal(realState.pokemonRecords[0].effectBuffs.length, 0);

  const second = manager.enter({ realState, revision: 12, revisionVerified: true, persistenceQuiescent: true, controlledPlayerId: "gold" });
  placeSubstitute(second.workingState, "gold-garchomp", "gold");
  const commit = manager.beginCommit({ currentRevision: 12, workingState: second.workingState });
  const candidate = tokenSandbox.prepareCommitCandidate({ workingState: commit.state, baselineState: realState });
  assert.equal(candidate.lingeringStatuses.filter((status) => status.type === "substitute-attached").length, 1);
  manager.completeCommit();
});

test("[TCF-016B] Arena Trap compensation stays isolated through sandbox discard and commit", () => {
  const realState = fixture();
  realState.pokemonRecords[2].battleTier = "Poke";
  const manager = tokenSandbox.createSessionManager({
    createSessionId: () => "arena-customization-sandbox",
    now: () => "2026-07-01T12:00:00.000Z"
  });
  const first = manager.enter({ realState, revision: 20, revisionVerified: true, persistenceQuiescent: true, controlledPlayerId: "gold" });
  const trapped = effects.resolveArenaTrap(first.workingState, source({ targetPokemonId: "red-lucario", actorPlayerId: "gold" }), options(first.workingState));
  effects.applyArenaTrapCustomization(first.workingState, {
    statusId: trapped.status.id,
    actorPlayerId: "red",
    kind: "move",
    name: "Recover"
  }, options(first.workingState));
  assert.equal(realState.lingeringStatuses.length, 0);
  assert.equal(realState.players.find((player) => player.id === "red").moveAccessGrants.length, 0);
  manager.discard();

  const second = manager.enter({ realState, revision: 20, revisionVerified: true, persistenceQuiescent: true, controlledPlayerId: "gold" });
  const secondTrap = effects.resolveArenaTrap(second.workingState, source({ targetPokemonId: "red-lucario", actorPlayerId: "gold" }), options(second.workingState));
  effects.applyArenaTrapCustomization(second.workingState, {
    statusId: secondTrap.status.id,
    actorPlayerId: "red",
    kind: "ability",
    name: "Levitate"
  }, options(second.workingState));
  const commit = manager.beginCommit({ currentRevision: 20, workingState: second.workingState });
  const candidate = tokenSandbox.prepareCommitCandidate({ workingState: commit.state, baselineState: realState });
  assert.equal(candidate.lingeringStatuses.find((status) => status.type === "arena-trap").payload.customization.name, "Levitate");
  assert.equal(candidate.pokemonRecords.find((pokemon) => pokemon.id === "red-lucario").effectBuffs.some((buff) => buff.abilityName === "Levitate"), true);
  manager.completeCommit();
});

test("[TCF-017] Live Referee orders resolved responses, Substitute interception, and parent mutation", () => {
  const appSource = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
  const resolverStart = appSource.indexOf("function applyResolvedTokenPendingEvent");
  const negationCheck = appSource.indexOf("tokenPendingEventNegations(activity)", resolverStart);
  const interceptionCheck = appSource.indexOf("applySubstituteInterceptionBeforeMutation(activity, metadata)", resolverStart);
  const foundationCall = appSource.indexOf("applyAutomaticControlFoundationActivity(activity, metadata)", resolverStart);
  assert.ok(negationCheck > resolverStart && interceptionCheck > negationCheck && foundationCall > interceptionCheck);
  assert.match(appSource, /excludedRosterInstanceIds/);
  assert.match(appSource, /speciesHasBanPhaseProtection/);
  assert.match(appSource, /controlTokenEffects\.battleLegality/);
  assert.match(appSource, /previousTokenConsumptions: structuredClone\(state\.tokenConsumptions \|\| \[\]\)/);
  assert.match(appSource, /state\.tokenConsumptions = structuredClone\(undoData\.previousTokenConsumptions\)/);
});

test("[TCF-018] blocked runtime usability fails before Token consumption", () => {
  const blockedIds = ["foresight-curse"];
  let inventoryCount = blockedIds.length;
  blockedIds.forEach((tokenId) => {
    const gate = contract.activationUsabilityFor(tokenId);
    if (gate.mayConsume) inventoryCount -= 1;
    assert.equal(gate.ok, false, `${tokenId} must fail closed`);
    assert.equal(gate.mayConsume, false, `${tokenId} must not reach consumption`);
    assert.ok(gate.reason.length > 0, `${tokenId} must explain why it is blocked`);
  });
  assert.equal(inventoryCount, blockedIds.length);

  const appSource = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
  const timingStart = appSource.indexOf("function tokenUseTimingCheck");
  const timingEnd = appSource.indexOf("function canUseTokenNow", timingStart);
  const timingSource = appSource.slice(timingStart, timingEnd);
  assert.ok(timingSource.indexOf("tokenRuntimeUsabilityCheck(metadata)") < timingSource.indexOf("playerHasTokenForEffect"));
  const responseStart = appSource.indexOf("function recordTokenResponseToActivity");
  const responseEnd = appSource.indexOf("function currentEncounterPendingActivity", responseStart);
  const responseSource = appSource.slice(responseStart, responseEnd);
  assert.ok(responseSource.indexOf("tokenRuntimeUsabilityCheck(metadata)") < responseSource.indexOf("consumeTokenForEffect"));

  ["teleport", "revenge", "after-you", "ditto-token", "follow-me", "knock-off-curse", "haze-curse", "devolve-token", "lingering-aroma", "honey-token"].forEach((tokenId) => {
    const gate = contract.activationUsabilityFor(tokenId);
    assert.equal(gate.ok, true, `${tokenId} has a production runtime surface`);
    assert.equal(gate.mayConsume, true, `${tokenId} may consume only through its completed confirmation flow`);
  });
});

test("[TCF-019] 7 Tools cannot negate and close without its copy obligation", () => {
  const incomplete = contract.runtimeResultSafetyFor("seven-tools", {
    negatedProtectionToken: true,
    closed: true
  });
  assert.equal(incomplete.ok, false);
  const copied = contract.runtimeResultSafetyFor("seven-tools", {
    negatedProtectionToken: true,
    temporaryCopyTokenId: "temporary-immunity-1",
    closed: true
  });
  assert.equal(copied.ok, true);
  const guided = contract.runtimeResultSafetyFor("seven-tools", {
    negatedProtectionToken: true,
    mandatoryGuidedContinuationId: "copy-continuation-1",
    closed: false
  });
  assert.equal(guided.ok, true);
});

test("[TCF-020] Smokescreen cannot fall back to additive-target resolution", () => {
  assert.equal(contract.runtimeResultSafetyFor("smokescreen", {
    replacedOriginalTarget: true,
    wheelResultPlayerId: "gold",
    originalTargetPlayerId: "red",
    replacementTargetId: "gold-lucario",
    closed: true
  }).ok, true);
  assert.equal(contract.runtimeResultSafetyFor("smokescreen", {
    originalTargetsPreserved: true,
    addedTargetId: "gold",
    addedTargetResponseOpportunityId: "priority-gold",
    closed: true
  }).ok, false);
  const appSource = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
  assert.match(appSource, /metadata\.resolverId === "smokescreenRedirect"/);
});

test("[TCF-021] Follow Me cannot close after redirect without its ongoing Copy obligation", () => {
  assert.equal(contract.runtimeResultSafetyFor("follow-me", {
    redirectedTarget: true,
    closed: true
  }).ok, false);
  assert.equal(contract.runtimeResultSafetyFor("follow-me", {
    redirectedTarget: true,
    ongoingCopyRelationshipId: "follow-copy-gym-1",
    closed: true
  }).ok, true);
});

test("[TCF-022] shared Foresight payloads omit private set information", () => {
  const shared = sanitizeSharedGamePayloadForDelivery({
    interactionEvents: [{
      id: "foresight-event-1",
      sourceId: "foresight-curse",
      payload: {
        revealSetIfBrought: true,
        selectedRosterInstanceIds: ["gold-garchomp"],
        privateSetData: { moves: ["Earthquake"], ability: "Rough Skin", item: "Rocky Helmet" },
        revealedSets: [{ nature: "Jolly", evs: { attack: 252 }, ivs: { attack: 31 }, teraType: "Ground" }]
      }
    }]
  });
  const payload = shared.interactionEvents[0].payload;
  assert.equal(payload.revealSetIfBrought, true);
  assert.deepEqual(payload.selectedRosterInstanceIds, ["gold-garchomp"]);
  assert.equal(Object.hasOwn(payload, "privateSetData"), false);
  assert.equal(Object.hasOwn(payload, "revealedSets"), false);
  assert.equal(contract.runtimeResultSafetyFor("foresight-curse", { sharedPayloadContainsPrivateSetData: true }).ok, false);
  assert.equal(contract.runtimeResultSafetyFor("foresight-curse", { closed: true }).ok, false);
  assert.equal(contract.runtimeResultSafetyFor("foresight-curse", {
    sourcePlayerId: "steevee",
    playerScopedPrivateRecordId: "private-foresight-1",
    revealRecipientPlayerIds: ["steevee", "gold"]
  }).ok, false);
});

test("[TCF-023] production shell loads and delegates to the shared Control controller", () => {
  const appSource = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
  const indexSource = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  const serverSource = fs.readFileSync(path.join(__dirname, "..", "server.js"), "utf8");
  assert.match(indexSource, /token-control-controller\.js/);
  assert.match(serverSource, /"\/token-control-controller\.js"/);
  assert.match(appSource, /tokenControlController\.validateDeclaration/);
  assert.match(appSource, /tokenControlController\.resolveFoundationActivity/);
  assert.match(appSource, /seriesOrder:\s*seriesNames/);
});

test("[TCF-024] Arena Trap uses compact Teambuilder status and field-level injection tags", () => {
  const appSource = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
  const stylesSource = fs.readFileSync(path.join(__dirname, "..", "styles.css"), "utf8");
  const rendererStart = appSource.indexOf("function renderTeambuilderSelectedSlotEditor");
  const rendererEnd = appSource.indexOf("function renderTeambuilderSetInspector", rendererStart);
  const rendererSource = appSource.slice(rendererStart, rendererEnd);
  assert.ok(rendererStart > 0 && rendererEnd > rendererStart);
  assert.match(rendererSource, /renderTeambuilderStatusRow\(arenaPresentation, rules, pokemon\)/);
  assert.match(appSource, /renderTeambuilderArenaTrapStatus\(arena\)/);
  assert.match(rendererSource, /teambuilder-field-source/);
  assert.match(rendererSource, /teambuilder-move-source/);
  assert.doesNotMatch(rendererSource, /teambuilder-forced-member-notice/);
  assert.match(appSource, /teambuilder-status-icon locked/);
  assert.match(appSource, /teambuilder-status-icon protected/);
  assert.match(appSource, /data-tooltip-title="Locked"/);
  assert.match(appSource, /data-tooltip-title="Curse Immune"/);
  assert.match(stylesSource, /\.teambuilder-status-icon\s*\{/);
  assert.match(stylesSource, /\.teambuilder-status-icon::after/);
  assert.match(rendererSource, /teambuilder-form-choice/);
  assert.match(rendererSource, /teambuilder-loadout-footer/);
  assert.match(rendererSource, /Total EV/);
  assert.match(stylesSource, /\.teambuilder-set-body\s*\{[\s\S]*?grid-template-rows:\s*310px;/);
  assert.match(stylesSource, /\.teambuilder-large-sprite img\s*\{[\s\S]*?width:\s*84px;[\s\S]*?height:\s*84px;/);
  assert.match(stylesSource, /\.teambuilder-loadout-footer\s*\{/);
});

test("[TCF-025] revised Control contracts expose the approved runtime boundary", () => {
  assert.equal(contract.activationUsabilityFor("wicked-blow").ok, true);
  assert.equal(contract.definitions["wicked-blow"].targetControllerRelation, "anyPlayer");
  assert.equal(contract.definitions["wicked-blow"].resolverMode, "automatic");
  assert.equal(contract.definitions["wicked-blow"].selectedTargetType, "rosterInstance");
  assert.equal(contract.definitions["wicked-blow"].mechanicContract.activeRosterRequired, true);
  assert.equal(contract.definitions["wicked-blow"].mechanicContract.currentBattlePhaseTeamRequired, false);
  assert.equal(contract.definitions["wicked-blow"].mechanicContract.doesNotCreateTeamMembership, true);
  assert.equal(contract.definitions.incinerate.resolverMode, "automatic");
  assert.equal(contract.definitions.incinerate.applicationScope, "allPlayers");
  assert.deepEqual(contract.definitions["steal-token"].effectTags, ["Steal"]);
  assert.equal(contract.definitions["steal-token"].applicationScope, "rosterInstance");
});

test("[TCF-026] Incinerate destroys one independently selected exact resource per eligible rival", () => {
  const state = fixture();
  const result = effects.resolveIncinerate(state, source({
    sourceTokenName: "Incinerate",
    resourceSelections: [
      { playerId: "gold", resourceId: "gold-leftovers" },
      { playerId: "red", resourceId: "red-recover" }
    ],
    consumptionRecordId: "consume-incinerate-1"
  }), options(state));
  assert.equal(result.result, "resolved");
  assert.deepEqual(result.affectedPlayerIds.sort(), ["gold", "red"]);
  assert.equal(state.players.find((player) => player.id === "steevee").inventory.some((item) => item.id === "steevee-leftovers"), true);
  assert.equal(state.players.find((player) => player.id === "gold").inventory.some((item) => item.id === "gold-leftovers"), false);
  assert.equal(state.players.find((player) => player.id === "red").inventory.some((item) => item.id === "red-recover"), false);
  assert.equal(state.players.find((player) => player.id === "red").inventory.some((item) => item.id === "red-leftovers-1"), true);
  assert.equal(state.players.find((player) => player.id === "red").inventory.some((item) => item.id === "red-leftovers-2"), true);
  assert.equal(result.operations.length, 2);
  assert.deepEqual(result.operations.map((operation) => operation.targetObjectName).sort(), ["Leftovers", "Recover"]);
  assert.equal(result.operations.every((operation) => operation.operationType === effects.EFFECT_OPERATION_TYPES.DESTROY_INVENTORY_RESOURCE), true);
  assert.equal(result.operations.every((operation) => operation.consumptionRecordId === "consume-incinerate-1"), true);
  assert.equal(state.effectOperations.length, 2);

  const emptyState = fixture();
  emptyState.players.filter((player) => player.id !== "steevee").forEach((player) => {
    const eligibleIds = new Set(effects.incinerateEligibleResources(player).map((resource) => resource.id));
    player.inventory = player.inventory.filter((resource) => !eligibleIds.has(resource.id));
  });
  const empty = effects.resolveIncinerate(emptyState, source({
    sourceTokenName: "Incinerate",
    resourceSelections: []
  }), options(emptyState));
  assert.equal(empty.result, "noEffect");
  assert.equal(empty.operations.length, 0);
  assert.deepEqual(empty.skippedPlayerIds.sort(), ["gold", "red"]);
});

test("[TCF-027] Incinerate fails closed before mutation when any stable selection is invalid", () => {
  const state = fixture();
  const before = structuredClone(state.players);
  const result = effects.resolveIncinerate(state, source({
    sourceTokenName: "Incinerate",
    resourceSelections: [
      { playerId: "gold", resourceId: "missing-resource" },
      { playerId: "red", resourceId: "red-recover" }
    ]
  }), options(state));
  assert.equal(result.result, "systemFailure");
  assert.equal(result.refundRequired, true);
  assert.deepEqual(state.players, before);
  assert.equal(state.effectOperations.length, 0);
});

test("[TCF-027A] Incinerate UI exposes independent stable-ID rival selection cards", () => {
  const appSource = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
  const stylesSource = fs.readFileSync(path.join(__dirname, "..", "styles.css"), "utf8");
  assert.match(appSource, /function liveRefereeIncineratePlayerCardMarkup/);
  assert.match(appSource, /data-incinerate-target data-player-id=/);
  assert.match(appSource, /resourceSelections = metadata\.id === "incinerate"/);
  assert.match(appSource, /data-incinerate-required-count/);
  assert.match(appSource, /data-incinerate-confirm/);
  assert.match(appSource, /function expandInventoryCategoryRecords/);
  assert.match(appSource, /inventoryCategoryContainer: true/);
  assert.match(appSource, /incinerateCards: cards/);
  assert.match(appSource, /persistLiveRefereeIncinerateCardDraft/);
  assert.match(stylesSource, /\.live-referee-incinerate-grid\s*\{[\s\S]*?grid-template-columns:\s*repeat\(auto-fit/);
  assert.match(stylesSource, /\.live-referee-incinerate-confirmation\s*\{/);
  assert.match(stylesSource, /\.live-referee-incinerate-list \[hidden\]\s*\{[\s\S]*?display:\s*none !important/);
});

test("[TCF-027B] Incinerate excludes category containers and preserves duplicate concrete records", () => {
  const player = {
    id: "gold",
    inventory: [
      { id: "berries-category", name: "Berries", type: "ITEM", inventoryCategoryContainer: true },
      { id: "sitrus-1", name: "Sitrus Berry", type: "ITEM" },
      { id: "sitrus-2", name: "Sitrus Berry", type: "ITEM" },
      { id: "recover-1", name: "Recover", moveName: "Recover", type: "TM" }
    ]
  };
  const eligible = effects.incinerateEligibleResources(player);
  assert.deepEqual(eligible.map((resource) => resource.id), ["sitrus-1", "sitrus-2", "recover-1"]);
  assert.equal(new Set(eligible.map((resource) => resource.id)).size, 3);
});

test("[TCF-028] Steal transfers one exact roster instance and removes stale team references", () => {
  const state = fixture();
  state.players.find((player) => player.id === "red").buffs = ["Safeguard"];
  state.battleTeams = {
    "Kanto:G1": {
      red: { selected: ["red-lucario", "red-garchomp"], badgeBoosts: [2, 0] }
    }
  };
  state.teambuilder = {
    activeBuildByPlayerId: { red: "red-build-1" },
    buildsByPlayerId: {
      red: [{
        id: "red-build-1",
        series: "Kanto",
        gym: 1,
        slots: [
          { slotIndex: 0, pokemonRecordId: "red-lucario", moves: ["Aura Sphere"] },
          { slotIndex: 1, pokemonRecordId: "red-garchomp" }
        ]
      }]
    }
  };
  const result = effects.resolveStealPokemon(state, source({
    sourceTokenName: "Steal",
    targetPokemonId: "red-lucario",
    effectTags: ["Steal"],
    consumptionRecordId: "consume-steal-1"
  }), options(state));
  assert.equal(result.result, "resolved");
  assert.equal(state.pokemonRecords.find((pokemon) => pokemon.id === "red-lucario").trainerId, "steevee");
  assert.deepEqual(state.battleTeams["Kanto:G1"].red.selected, ["red-garchomp"]);
  assert.deepEqual(state.battleTeams["Kanto:G1"].red.badgeBoosts, [0]);
  assert.equal(state.teambuilder.buildsByPlayerId.red[0].slots[0].pokemonRecordId, undefined);
  assert.equal(result.operations[0].previousOwnerPlayerId, "red");
  assert.equal(result.operations[0].newOwnerPlayerId, "steevee");
  assert.equal(result.operations[0].targetSnapshot.trainerId, "red");
  assert.equal(result.operations[0].consumptionRecordId, "consume-steal-1");
});

test("[TCF-029] Sticky Hold blocks formal Steal while Safeguard does not", () => {
  const state = fixture();
  state.players.find((player) => player.id === "red").perks = ["Sticky Hold"];
  const blocked = effects.resolveStealPokemon(state, source({
    sourceTokenName: "Steal",
    targetPokemonId: "red-lucario",
    effectTags: ["Steal"]
  }), options(state));
  assert.equal(blocked.result, "blocked");
  assert.equal(blocked.protectionResult, "blockedByStickyHold");
  assert.equal(state.pokemonRecords.find((pokemon) => pokemon.id === "red-lucario").trainerId, "red");
  assert.equal(state.effectOperations.length, 0);

  state.players.find((player) => player.id === "red").perks = [];
  state.players.find((player) => player.id === "red").buffs = ["Safeguard"];
  const resolved = effects.resolveStealPokemon(state, source({
    sourceTokenName: "Steal",
    targetPokemonId: "red-lucario",
    effectTags: ["Steal"]
  }), options(state));
  assert.equal(resolved.result, "resolved");
});

test("[TCF-030] production revalidates before Substitute and snapshots structured operations for undo", () => {
  const appSource = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
  const resolutionStart = appSource.indexOf("function applyResolvedTokenPendingEvent");
  const resolutionEnd = appSource.indexOf("function tokenUseOptionRows", resolutionStart);
  const resolutionSource = appSource.slice(resolutionStart, resolutionEnd);
  assert.ok(resolutionStart > 0 && resolutionEnd > resolutionStart);
  assert.ok(resolutionSource.indexOf("validateResolutionState") < resolutionSource.indexOf("applySubstituteInterceptionBeforeMutation"));
  assert.match(appSource, /previousEffectOperations: structuredClone\(state\.effectOperations \|\| \[\]\)/);
  assert.match(appSource, /state\.effectOperations = structuredClone\(undoData\.previousEffectOperations\)/);
  assert.match(appSource, /\["arena-trap", "clear-smog", "steal-pokemon", "remove-from-rivals"\]/);
  assert.match(appSource, /"steal-token",\s*"wicked-blow"/);
  assert.match(appSource, /function liveRefereeWickedBlowTargetScreenMarkup/);
  assert.match(appSource, /function liveRefereeWickedBlowActiveRosterTargets/);
  assert.match(appSource, /Use Wicked Blow on which Active Roster Pokemon/);
  assert.doesNotMatch(appSource, /Use Wicked Blow on which current Battle Phase team Pokemon/);
  const wickedResolutionBranch = appSource.slice(
    appSource.indexOf('metadata.id === "wicked-blow" && resolution.result === "resolved"'),
    appSource.indexOf("syncPlayerPokemonLists();", appSource.indexOf('metadata.id === "wicked-blow" && resolution.result === "resolved"'))
  );
  assert.doesNotMatch(wickedResolutionBranch, /syncUnlockedBattleTeamFromBuild/);
  assert.match(appSource, /replacementTierIndex = finalTierIndex - 3/);
});

test("[TCF-031] Wicked Blow replaces one exact Active Roster instance and keeps matching references coherent", () => {
  const state = fixture();
  state.battleTeams = {
    "Kanto:G1": {
      red: {
        selected: ["red-garchomp", "red-lucario"],
        selectedBattleSpecies: ["Garchomp", "Lucario"],
        badgeBoosts: [2, 0],
        lockedSlots: [
          { pokemonRecordId: "red-garchomp", selectedBattleSpecies: "Garchomp", assignedBadgePoints: 2 },
          { pokemonRecordId: "red-lucario", selectedBattleSpecies: "Lucario", assignedBadgePoints: 0 }
        ]
      }
    }
  };
  state.teambuilder = {
    buildsByPlayerId: {
      red: [{
        id: "red-build",
        series: "Kanto",
        gym: 1,
        slots: [
          { pokemonRecordId: "red-garchomp", moves: ["Earthquake"], ability: "Rough Skin" },
          { pokemonRecordId: "red-lucario", moves: ["Aura Sphere"] }
        ]
      }]
    }
  };
  const result = effects.resolveWickedBlow(state, source({
    sourceTokenName: "Wicked Blow",
    targetPokemonId: "red-garchomp",
    targetOwnerPlayerId: "red",
    consumptionRecordId: "consume-wicked-1"
  }), {
    ...options(state),
    wickedBlowReplacementPlan: (_targetState, pokemon, targetContext) => targetContext.preview
      ? { ok: true, poolSize: 4, tierCalculation: { finalEvolutionTier: "Great Elite", replacementTier: "Poke" } }
      : {
        ok: true,
        replacementSpecies: "Barbaracle",
        teamSpecies: "Barbaracle",
        pokemonPatch: { ...pokemon, name: "Barbaracle", currentSpecies: "Barbaracle" },
        assignedBadgePoints: 0,
        poolSize: 4,
        tierCalculation: { finalEvolutionTier: "Great Elite", replacementTier: "Poke", orderedStepsBelow: 3 },
        teambuilderSlotPatch: (_slot, index) => ({ pokemonRecordId: pokemon.id, slotIndex: index, selectedBattleSpecies: "Barbaracle", moves: ["", "", "", ""], ability: "" })
      }
  });
  assert.equal(result.result, "resolved");
  assert.equal(state.pokemonRecords.find((pokemon) => pokemon.id === "red-garchomp").name, "Barbaracle");
  assert.equal(state.pokemonRecords.find((pokemon) => pokemon.id === "red-lucario").name, "Lucario");
  assert.deepEqual(state.battleTeams["Kanto:G1"].red.selected, ["red-garchomp", "red-lucario"]);
  assert.deepEqual(state.battleTeams["Kanto:G1"].red.selectedBattleSpecies, ["Barbaracle", "Lucario"]);
  assert.equal(state.battleTeams["Kanto:G1"].red.lockedSlots[0].selectedBattleSpecies, "Barbaracle");
  assert.equal(state.teambuilder.buildsByPlayerId.red[0].slots[0].selectedBattleSpecies, "Barbaracle");
  assert.deepEqual(state.teambuilder.buildsByPlayerId.red[0].slots[0].moves, ["", "", "", ""]);
  assert.equal(result.operations[0].operationType, effects.EFFECT_OPERATION_TYPES.REROLL_POKEMON);
  assert.equal(result.operations[0].targetObjectId, "red-garchomp");
  assert.equal(result.operations[0].replacementObjectName, "Barbaracle");
  assert.equal(result.operations[0].previousLocation, "activeRoster");

  const noTeamState = fixture();
  noTeamState.battleTeams = {};
  const noTeamResult = effects.resolveWickedBlow(noTeamState, source({
    sourceTokenName: "Wicked Blow",
    targetPokemonId: "red-lucario",
    targetOwnerPlayerId: "red"
  }), {
    ...options(noTeamState),
    wickedBlowReplacementPlan: (_targetState, pokemon, context) => context.preview
      ? { ok: true, poolSize: 2, tierCalculation: { finalEvolutionTier: "Great Elite", replacementTier: "Poke" } }
      : {
        ok: true,
        replacementSpecies: "Barbaracle",
        pokemonPatch: { ...pokemon, name: "Barbaracle", currentSpecies: "Barbaracle" },
        poolSize: 2,
        tierCalculation: { finalEvolutionTier: "Great Elite", replacementTier: "Poke", orderedStepsBelow: 3 }
      }
  });
  assert.equal(noTeamResult.result, "resolved");
  assert.equal(noTeamState.pokemonRecords.find((pokemon) => pokemon.id === "red-lucario").name, "Barbaracle");
  assert.deepEqual(noTeamState.battleTeams, {});

  const reserve = { ...noTeamState.pokemonRecords.find((pokemon) => pokemon.id === "red-garchomp"), id: "red-reserve", rosterType: "Reserve" };
  noTeamState.pokemonRecords.push(reserve);
  assert.equal(effects.wickedBlowActiveRosterTarget(noTeamState, reserve, options(noTeamState)).ok, false);
});
