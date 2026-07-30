"use strict";

const assert = require("node:assert/strict");
const { test, before, after } = require("node:test");
const contract = require("../token-effect-contract.js");
const effects = require("../token-control-effects.js");
const { createScenarioController, STANDARD_CURSE_TOKEN_IDS } = require("../token-control-controller.js");
const {
  controlStateFixture,
  findPlayer,
  findPokemon,
  inventoryCount,
  startTemporaryServer,
  stopTemporaryServer,
  loadGame,
  saveGame
} = require("./token-controller-test-fixture.js");

const config = {
  idPrefix: "standard-curses",
  seriesOrder: ["Kanto", "Johto", "Hoenn"],
  battleTeamKey: () => "Kanto:G1",
  teamSizeForPlayer: () => 6,
  battleTierForPokemon: (pokemon) => pokemon.battleTier || "Great",
  naturalBattleTier: () => "Great",
  tierIndexForName: () => 0,
  requiredBadgePointsForPokemon: () => 0,
  bringLegalityForPokemon: () => ({ ok: true, reason: "" }),
  abilityExists: () => true,
  moveExists: () => true
};

let server;

before(async () => {
  server = await startTemporaryServer("standard-curses");
});

after(async () => {
  await stopTemporaryServer(server);
});

function controllerFor(state, extras = {}) {
  return createScenarioController(state, { ...config, ...extras });
}

function declareAndResolve(controller, input) {
  const declared = controller.declare(input);
  assert.equal(declared.ok, true, declared.reason);
  const resolved = controller.resolve(declared.event.id);
  assert.equal(resolved.ok, true, resolved.reason);
  return { declared, resolved };
}

function activeCurse(state, type) {
  return state.lingeringStatuses.find((status) => status.type === type && status.status === "active");
}

function redBuild(state, pokemonId = "red-garchomp") {
  state.teambuilder = {
    ...state.teambuilder,
    activeBuildByPlayerId: { red: "red-build" },
    buildsByPlayerId: {
      red: [{
        id: "red-build",
        playerId: "red",
        slots: [{
          slotIndex: 0,
          pokemonRecordId: pokemonId,
          item: "Leftovers",
          nature: "Jolly",
          moves: ["Earthquake", "Dragon Claw", "Protect", "Swords Dance"],
          evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 },
          ivs: { hp: 31, atk: 31, def: 31, spa: 0, spd: 31, spe: 31 }
        }]
      }]
    },
    setRepairByStatusId: {}
  };
}

test("[SCL-001] the five standard Curse contracts use one Active-roster anchor and global-species application", () => {
  assert.deepEqual(STANDARD_CURSE_TOKEN_IDS, [
    "toxic-curse",
    "iron-ball-curse",
    "flame-curse",
    "silencing-curse",
    "imprison-curse"
  ]);
  STANDARD_CURSE_TOKEN_IDS.forEach((id) => {
    const definition = contract.definitions[id];
    assert.equal(definition.targetType, "pokemon");
    assert.equal(definition.targetScope, "rosterInstance");
    assert.equal(definition.selectedTargetType, "rosterInstance");
    assert.equal(definition.applicationScope, "globalSpecies");
    assert.equal(definition.targetControllerRelation, "anyPlayer");
    assert.equal(definition.resolverMode, "automatic");
  });
});

test("[SCL-002] own and rival Active Roster Pokemon are legal while non-Active records fail before consumption", () => {
  const ownState = controlStateFixture("curse-own");
  const ownController = controllerFor(ownState, { idPrefix: "curse-own" });
  const own = ownController.declare({
    tokenId: "toxic-curse",
    tokenInventoryId: "steevee-toxic-1",
    actorPlayerId: "steevee",
    targetPokemonId: "steevee-alakazam"
  });
  assert.equal(own.ok, true, own.reason);

  const rivalState = controlStateFixture("curse-rival");
  const rivalController = controllerFor(rivalState, { idPrefix: "curse-rival" });
  const rival = rivalController.declare({
    tokenId: "iron-ball-curse",
    tokenInventoryId: "steevee-iron-1",
    actorPlayerId: "steevee",
    targetPokemonId: "red-garchomp"
  });
  assert.equal(rival.ok, true, rival.reason);

  const nonActiveState = controlStateFixture("curse-non-active");
  const nonActiveController = controllerFor(nonActiveState, { idPrefix: "curse-non-active" });
  const before = inventoryCount(nonActiveState, "steevee", "Toxic Curse");
  const rejected = nonActiveController.declare({
    tokenId: "toxic-curse",
    tokenInventoryId: "steevee-toxic-1",
    actorPlayerId: "steevee",
    targetPokemonId: "red-lucario-legacy"
  });
  assert.equal(rejected.ok, false);
  assert.match(rejected.reason, /Active Roster/);
  assert.equal(inventoryCount(nonActiveController.getState(), "steevee", "Toxic Curse"), before);
});

test("[SCL-003] forced-item Curses affect every matching Active Roster record and preserve configured items", () => {
  [
    ["toxic-curse", "steevee-toxic-1", "curse-toxic-orb", "Toxic Orb"],
    ["iron-ball-curse", "steevee-iron-1", "curse-iron-ball", "Iron Ball"],
    ["flame-curse", "steevee-flame-1", "curse-flame-orb", "Flame Orb"]
  ].forEach(([tokenId, tokenInventoryId, statusType, forcedItem]) => {
    const state = controlStateFixture(`curse-forced-${tokenId}`);
    redBuild(state, "red-garchomp-2");
    const controller = controllerFor(state, { idPrefix: `curse-forced-${tokenId}` });
    const result = declareAndResolve(controller, {
      tokenId,
      tokenInventoryId,
      actorPlayerId: "steevee",
      targetPokemonId: "red-garchomp-2"
    });
    const status = activeCurse(controller.getState(), statusType);
    assert.equal(status.targetPokemonId, "");
    assert.equal(status.selectedRosterInstanceId, "red-garchomp-2");
    assert.equal(status.applicationScope, "globalSpecies");
    assert.deepEqual(status.affectedRosterInstanceIds.sort(), ["gold-garchomp", "red-garchomp", "red-garchomp-2"].sort());
    assert.equal(effects.statusAffectsPokemon(status, findPokemon(controller.getState(), "red-garchomp-2"), config), true);
    assert.equal(effects.statusAffectsPokemon(status, findPokemon(controller.getState(), "red-garchomp"), config), true);
    assert.equal(effects.statusAffectsPokemon(status, findPokemon(controller.getState(), "gold-garchomp"), config), true);
    const savedSlot = controller.getState().teambuilder.buildsByPlayerId.red[0].slots[0];
    const effective = effects.applyStandardCurseSetOverrides(savedSlot, effects.standardCurseSetRules([status]));
    assert.equal(savedSlot.item, "Leftovers");
    assert.equal(effective.item, forcedItem);
    assert.equal(result.resolved.resolution.duplicateResolution, undefined);
  });
});

test("[SCL-004] Arena Curse immunity and Substitute protect only exact matching instances", () => {
  const immuneState = controlStateFixture("curse-immune");
  effects.createStatus(immuneState, {
    type: "arena-trap",
    name: "Arena Trapped",
    status: "active",
    targetPokemonId: "red-lucario",
    targetPlayerId: "red",
    applicationScope: "rosterInstance",
    affectedRosterInstanceIds: ["red-lucario"],
    payload: { curseImmune: true }
  }, { ...config, series: "Kanto", gym: 1, phase: "action" });
  const immuneController = controllerFor(immuneState, { idPrefix: "curse-immune" });
  const immune = declareAndResolve(immuneController, {
    tokenId: "toxic-curse",
    tokenInventoryId: "steevee-toxic-1",
    actorPlayerId: "steevee",
    targetPokemonId: "red-lucario"
  });
  const immuneStatus = activeCurse(immuneController.getState(), "curse-toxic-orb");
  assert.deepEqual(immune.resolved.event.substituteInterception.curseImmuneRosterInstanceIds, ["red-lucario"]);
  assert.deepEqual(immuneStatus.excludedRosterInstanceIds, ["red-lucario"]);
  assert.equal(effects.statusAffectsPokemon(immuneStatus, findPokemon(immuneController.getState(), "red-lucario"), config), false);
  assert.equal(effects.statusAffectsPokemon(immuneStatus, findPokemon(immuneController.getState(), "gold-lucario"), config), true);

  const substituteState = controlStateFixture("curse-substitute");
  const substituteController = controllerFor(substituteState, { idPrefix: "curse-substitute" });
  const substitute = substituteController.declare({
    tokenId: "substitute",
    tokenInventoryId: "gold-sub-1",
    actorPlayerId: "gold",
    targetPokemonId: "gold-garchomp"
  });
  assert.equal(substitute.ok, true, substitute.reason);
  const flame = declareAndResolve(substituteController, {
    tokenId: "flame-curse",
    tokenInventoryId: "steevee-flame-1",
    actorPlayerId: "steevee",
    targetPokemonId: "gold-garchomp"
  });
  assert.equal(flame.resolved.resolution.result, "resolved");
  const flameStatus = activeCurse(substituteController.getState(), "curse-flame-orb");
  assert.deepEqual(flameStatus.excludedRosterInstanceIds, ["gold-garchomp"]);
  assert.equal(effects.statusAffectsPokemon(flameStatus, findPokemon(substituteController.getState(), "gold-garchomp"), config), false);
  assert.equal(effects.statusAffectsPokemon(flameStatus, findPokemon(substituteController.getState(), "red-garchomp"), config), true);
  assert.equal(effects.statusAffectsPokemon(flameStatus, findPokemon(substituteController.getState(), "red-garchomp-2"), config), true);
  assert.equal(substituteController.getState().lingeringStatuses.find((status) => status.type === "substitute-attached").status, "consumed");
});

test("[SCL-005] Silencing requires an explicit move choice and never truncates the saved set implicitly", () => {
  const state = controlStateFixture("curse-silencing");
  redBuild(state);
  const controller = controllerFor(state, { idPrefix: "curse-silencing" });
  const result = declareAndResolve(controller, {
    tokenId: "silencing-curse",
    tokenInventoryId: "steevee-silencing-1",
    actorPlayerId: "steevee",
    targetPokemonId: "red-garchomp"
  });
  const resolvedState = controller.getState();
  const status = activeCurse(resolvedState, "curse-silencing");
  const savedSlot = resolvedState.teambuilder.buildsByPlayerId.red[0].slots[0];
  assert.deepEqual(savedSlot.moves, ["Earthquake", "Dragon Claw", "Protect", "Swords Dance"]);
  assert.equal(result.resolved.resolution.repair.status, "required");
  assert.equal(effects.applyStandardCurseSetOverrides(savedSlot, effects.standardCurseSetRules([status])).curseRepairRequired, true);
  const repaired = effects.completeSilencingSetRepair(resolvedState, {
    sourceStatusId: status.id,
    buildId: "red-build",
    moveNames: ["Protect", "Swords Dance"]
  }, { now: "2026-07-26T12:00:00.000Z" });
  assert.equal(repaired.ok, true, repaired.reason);
  assert.deepEqual(savedSlot.moves, ["Protect", "Swords Dance", "", ""]);
  assert.equal(resolvedState.teambuilder.setRepairByStatusId[status.id].status, "completed");
});

test("[SCL-006] Imprison is a temporary effective-set override and leaves configured EVs, IVs, and Nature intact", () => {
  const state = controlStateFixture("curse-imprison");
  redBuild(state);
  const controller = controllerFor(state, { idPrefix: "curse-imprison" });
  declareAndResolve(controller, {
    tokenId: "imprison-curse",
    tokenInventoryId: "steevee-imprison-1",
    actorPlayerId: "steevee",
    targetPokemonId: "red-garchomp"
  });
  const status = activeCurse(controller.getState(), "curse-imprison");
  const slot = controller.getState().teambuilder.buildsByPlayerId.red[0].slots[0];
  const before = JSON.parse(JSON.stringify(slot));
  const effective = effects.applyStandardCurseSetOverrides(slot, effects.standardCurseSetRules([status]));
  assert.equal(effective.nature, "");
  assert.deepEqual(effective.evs, { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 });
  assert.deepEqual(effective.ivs, { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 });
  assert.deepEqual(slot, before);
});

test("[SCL-007] phase-anchored Curse duration survives before the matching phase and expires at that phase two Gyms later", () => {
  const state = controlStateFixture("curse-expiration");
  const controller = controllerFor(state, { idPrefix: "curse-expiration" });
  declareAndResolve(controller, {
    tokenId: "toxic-curse",
    tokenInventoryId: "steevee-toxic-1",
    actorPlayerId: "steevee",
    targetPokemonId: "red-garchomp"
  });
  const status = activeCurse(controller.getState(), "curse-toxic-orb");
  assert.equal(status.expiresAtGym, 3);
  assert.equal(status.expiresAtPhase, "action");
  assert.deepEqual(controller.expireAtPhase({ series: "Kanto", gym: 3, phase: "start" }), []);
  assert.equal(status.status, "active");
  const expired = controller.expireAtPhase({ series: "Kanto", gym: 3, phase: "action" });
  assert.deepEqual(expired.map((entry) => entry.id), [status.id]);
  assert.equal(status.status, "expired");
});

test("[SCL-008] stale exact targets refund once, duplicate completion is inert, and undo restores the declaration snapshot", () => {
  const staleState = controlStateFixture("curse-stale");
  const staleController = controllerFor(staleState, { idPrefix: "curse-stale" });
  const before = inventoryCount(staleState, "steevee", "Toxic Curse");
  const declared = staleController.declare({
    tokenId: "toxic-curse",
    tokenInventoryId: "steevee-toxic-1",
    actorPlayerId: "steevee",
    targetPokemonId: "red-garchomp"
  });
  assert.equal(declared.ok, true, declared.reason);
  findPokemon(staleController.getState(), "red-garchomp").rosterType = "Reserve";
  const failed = staleController.resolve(declared.event.id);
  assert.equal(failed.resolution.result, "systemFailure");
  assert.equal(failed.resolution.refunded, true);
  assert.equal(inventoryCount(staleController.getState(), "steevee", "Toxic Curse"), before);
  assert.equal(staleController.resolve(declared.event.id).ok, false);
  assert.equal(inventoryCount(staleController.getState(), "steevee", "Toxic Curse"), before);

  const undoController = controllerFor(controlStateFixture("curse-undo"), { idPrefix: "curse-undo" });
  const result = declareAndResolve(undoController, {
    tokenId: "iron-ball-curse",
    tokenInventoryId: "steevee-iron-1",
    actorPlayerId: "steevee",
    targetPokemonId: "red-garchomp-2"
  });
  assert.equal(undoController.resolve(result.declared.event.id).ok, false);
  assert.equal(undoController.undo(result.declared.activation.id).ok, true);
  assert.equal(activeCurse(undoController.getState(), "curse-iron-ball"), undefined);
  assert.equal(inventoryCount(undoController.getState(), "steevee", "Iron Ball Curse"), 1);
});

test("[SCL-009] exact Curse state and non-destructive set configuration survive backend reload", async () => {
  const state = controlStateFixture("curse-reload");
  redBuild(state);
  const controller = controllerFor(state, { idPrefix: "curse-reload" });
  declareAndResolve(controller, {
    tokenId: "imprison-curse",
    tokenInventoryId: "steevee-imprison-1",
    actorPlayerId: "steevee",
    targetPokemonId: "red-garchomp"
  });
  await saveGame(server.baseUrl, "standard-curse-reload", controller.getState(), 0);
  const reloaded = await loadGame(server.baseUrl, "standard-curse-reload");
  const status = activeCurse(reloaded.state, "curse-imprison");
  const slot = reloaded.state.teambuilder.buildsByPlayerId.red[0].slots[0];
  assert.equal(status.targetPokemonId, "");
  assert.equal(status.selectedRosterInstanceId, "red-garchomp");
  assert.equal(status.applicationScope, "globalSpecies");
  assert.equal(slot.nature, "Jolly");
  assert.equal(slot.evs.atk, 252);
  assert.equal(slot.ivs.spa, 0);
  assert.equal(findPlayer(reloaded.state, "steevee").inventory.some((item) => item.id === "steevee-imprison-1"), false);
});
