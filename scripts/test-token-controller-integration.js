"use strict";

const assert = require("node:assert/strict");
const { test, before, after } = require("node:test");
const effects = require("../token-control-effects.js");
const { createScenarioController } = require("../token-control-controller.js");
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

const controllerTierOrder = ["LC", "LC Elite", "Safari", "Safari Elite", "Poke", "Poke Elite", "Great", "Great Elite", "Ultra", "Ultra Elite", "Master", "Master Elite"];

function deterministicWickedBlowPlan(state, pokemon, targetContext = {}) {
  if (state.wickedBlowNoPool) return { ok: false, reason: "No legal Pokemon are available in the replacement tier." };
  const finalEvolutionTier = pokemon.finalEvolutionTier || "Great Elite";
  const finalTierIndex = controllerTierOrder.indexOf(finalEvolutionTier);
  const replacementTierIndex = finalTierIndex - 3;
  if (replacementTierIndex < 0) return { ok: false, reason: "No Battle Tier exists three ordered steps below the final tier." };
  const tierCalculation = {
    finalEvolutionSpecies: [pokemon.finalEvolutionSpecies || pokemon.name],
    finalEvolutionTier,
    finalEvolutionTierIndex: finalTierIndex,
    orderedStepsBelow: 3,
    replacementTier: controllerTierOrder[replacementTierIndex],
    replacementTierIndex
  };
  if (targetContext.preview) return { ok: true, poolSize: 3, tierCalculation };
  const replacementSpecies = pokemon.wickedBlowReplacement || "Barbaracle";
  return {
    ok: true,
    replacementSpecies,
    teamSpecies: replacementSpecies,
    pokemonPatch: {
      ...pokemon,
      name: replacementSpecies,
      currentSpecies: replacementSpecies,
      baseSpecies: replacementSpecies,
      seriesStartSpecies: replacementSpecies,
      resetsToSpecies: replacementSpecies
    },
    assignedBadgePoints: 0,
    poolSize: 3,
    tierCalculation: { ...tierCalculation, rolledSpecies: replacementSpecies, receivedSpecies: replacementSpecies },
    teambuilderSlotPatch: (_slot, index) => ({
      pokemonRecordId: pokemon.id,
      slotIndex: index,
      selectedBattleSpecies: replacementSpecies,
      selectedBattleForm: replacementSpecies,
      assignedBadgePoints: 0,
      ability: "",
      item: "",
      moves: ["", "", "", ""]
    })
  };
}

const controllerConfig = {
  seriesOrder: ["Kanto", "Johto", "Hoenn"],
  idPrefix: "integration",
  battleTierForPokemon: (pokemon) => pokemon.battleTier || "Great",
  naturalBattleTier: () => "Great",
  tierIndexForName: (tier) => controllerTierOrder.indexOf(tier),
  requiredBadgePointsForPokemon: (pokemon) => Math.max(0, controllerTierOrder.indexOf(pokemon.battleTier || "Great") - controllerTierOrder.indexOf("Great")),
  bringLegalityForPokemon: () => ({ ok: true, reason: "" }),
  abilityExists: () => true,
  moveExists: () => true,
  resourceDefinitionForName: (name) => {
    const key = String(name || "").trim().toLowerCase();
    if (["leftovers", "master ball"].includes(key)) return { name, type: "ITEM" };
    if (["recover", "ice shard"].includes(key)) return { name, moveName: name, type: "TM" };
    return null;
  },
  wickedBlowReplacementPlan: deterministicWickedBlowPlan
};
let server;

function controllerFor(state, extras = {}) {
  return createScenarioController(state, { ...controllerConfig, ...extras });
}

function declareAndResolve(controller, input) {
  const declared = controller.declare(input);
  assert.equal(declared.ok, true, declared.reason);
  const resolved = controller.resolve(declared.event.id);
  assert.equal(resolved.ok, true, resolved.reason);
  return { declared, resolved };
}

function activeStatuses(state, type) {
  return state.lingeringStatuses.filter((status) => status.type === type && status.status === "active");
}

before(async () => {
  server = await startTemporaryServer("token-controller-integration");
});

after(async () => {
  await stopTemporaryServer(server);
});

test("[TCI-001] Unban removes Restrict, mirrors one protection, blocks recurrence, reloads, expires, and undoes exactly", async () => {
  const controller = controllerFor(controlStateFixture("unban-restrict"));
  const restrict = declareAndResolve(controller, {
    tokenId: "restrict-token",
    actorPlayerId: "steevee",
    tokenInventoryId: "steevee-restrict-1",
    targetPokemonId: "red-garchomp",
    speciesName: "Garchomp"
  });
  const restrictedState = controller.getState();
  const restrictStatus = activeStatuses(restrictedState, "restrict")[0];
  assert.equal(restrictStatus.sourceTokenId, "steevee-restrict-1");
  assert.equal(restrictStatus.sourceTokenName, "Restrict");
  assert.equal(restrictStatus.durationGyms, 6);
  assert.equal(restrictStatus.expiresAtSeries, "Kanto");
  assert.equal(restrictStatus.expiresAtGym, 7);
  assert.equal(restrictedState.globalPokemonRules.garchomp.sourceStatusId, restrictStatus.id);
  assert.equal(restrict.declared.event.currentPriorityPlayerId, "red");

  const unban = declareAndResolve(controller, {
    tokenId: "unban-token",
    actorPlayerId: "steevee",
    tokenInventoryId: "steevee-unban-1",
    targetPokemonId: "red-garchomp",
    speciesName: "Garchomp"
  });
  const state = controller.getState();
  const protections = activeStatuses(state, "unban-protection");
  assert.equal(protections.length, 1);
  assert.equal(restrictStatus.status, "removed");
  assert.equal(controller.battleLegality("gold-garchomp").legal, true);
  assert.equal(controller.battleLegality("red-garchomp").legal, true);
  assert.equal(protections[0].durationGyms, 6);
  assert.equal(protections[0].expiresAtGym, 7);
  assert.equal(state.globalPokemonRules.garchomp.status, "Unbanned");
  assert.equal(state.globalPokemonRules.garchomp.sourceStatusId, protections[0].id);
  assert.equal(inventoryCount(state, "steevee", "Unban"), 1);
  assert.equal(state.tokenConsumptions.find((entry) => entry.tokenName === "Unban").policy, "provisional-consume-on-legal-declaration");
  assert.equal(state.tokenActivations.find((entry) => entry.id === unban.declared.activation.id).status, "resolved");

  const inventoryBeforeBlocked = findPlayer(state, "steevee").inventory.length;
  const blockedRestrict = controller.declare({
    tokenId: "restrict-token",
    actorPlayerId: "steevee",
    tokenInventoryId: "steevee-restrict-2",
    targetPokemonId: "red-garchomp",
    speciesName: "Garchomp"
  });
  const blockedBan = controller.declare({
    tokenId: "extra-ban-token",
    actorPlayerId: "steevee",
    tokenInventoryId: "steevee-extra-ban-1",
    targetPokemonId: "red-garchomp"
  });
  assert.equal(blockedRestrict.ok, false);
  assert.equal(blockedBan.ok, false);
  assert.match(blockedRestrict.reason, /protected/i);
  assert.match(blockedBan.reason, /protected/i);
  assert.equal(findPlayer(state, "steevee").inventory.length, inventoryBeforeBlocked);

  const unrelatedController = controllerFor(structuredClone(state), { idPrefix: "unban-unrelated" });
  const unrelated = unrelatedController.declare({
    tokenId: "restrict-token",
    actorPlayerId: "steevee",
    tokenInventoryId: "steevee-restrict-2",
    targetPokemonId: "red-lucario",
    speciesName: "Lucario"
  });
  assert.equal(unrelated.ok, true, unrelated.reason);

  await saveGame(server.baseUrl, "unban-restrict", state, 0);
  const reloaded = await loadGame(server.baseUrl, "unban-restrict");
  assert.equal(reloaded.version, 1);
  assert.equal(activeStatuses(reloaded.state, "unban-protection").length, 1);
  assert.equal(reloaded.state.globalPokemonRules.garchomp.sourceStatusId, protections[0].id);

  const undoController = controllerFor(reloaded.state, { idPrefix: "unban-reload" });
  const undone = undoController.undo(unban.declared.activation.id);
  assert.equal(undone.ok, true);
  assert.equal(activeStatuses(undoController.getState(), "unban-protection").length, 0);
  assert.equal(activeStatuses(undoController.getState(), "restrict").length, 1);
  assert.equal(inventoryCount(undoController.getState(), "steevee", "Unban"), 2);
  assert.equal(undoController.getState().tokenConsumptions.some((entry) => entry.tokenName === "Unban"), false);

  const expiryController = controllerFor(reloaded.state, { idPrefix: "unban-expiry" });
  expiryController.expireStartOfGym({ series: "Kanto", gym: 7 });
  assert.equal(activeStatuses(expiryController.getState(), "unban-protection").length, 0);
  assert.equal(expiryController.getState().globalPokemonRules.garchomp.status, "Normal");
  assert.equal(expiryController.getState().globalPokemonRules.garchomp.expiredWithStatusId, protections[0].id);
});

test("[TCI-002] Unban removes a universal Ban and applies the same six-Gym protection contract", () => {
  const controller = controllerFor(controlStateFixture("unban-ban"), { idPrefix: "unban-ban" });
  declareAndResolve(controller, {
    tokenId: "extra-ban-token",
    actorPlayerId: "steevee",
    tokenInventoryId: "steevee-extra-ban-1",
    targetPokemonId: "red-lucario"
  });
  assert.equal(controller.battleLegality("gold-lucario").legal, false);
  const result = declareAndResolve(controller, {
    tokenId: "unban-token",
    actorPlayerId: "steevee",
    tokenInventoryId: "steevee-unban-1",
    targetPokemonId: "red-lucario",
    speciesName: "Lucario"
  });
  assert.equal(result.resolved.resolution.removedStatusIds.length, 1);
  assert.equal(controller.battleLegality("gold-lucario").legal, true);
  assert.equal(activeStatuses(controller.getState(), "unban-protection").length, 1);
  assert.equal(controller.getState().globalPokemonRules.lucario.status, "Unbanned");
  assert.equal(controller.undo(result.declared.activation.id).ok, true);
  assert.equal(activeStatuses(controller.getState(), "ban").length, 1);
  assert.equal(activeStatuses(controller.getState(), "unban-protection").length, 0);
  assert.equal(controller.battleLegality("gold-lucario").legal, false);
});

test("[TCI-003] Restrict gives the directly affected player priority and Immunity negates, reloads, and undoes before Substitute", async () => {
  const controller = controllerFor(controlStateFixture("restrict-immunity"), { idPrefix: "restrict-immunity" });
  const substitute = controller.declare({
    tokenId: "substitute",
    actorPlayerId: "red",
    tokenInventoryId: "red-sub-1",
    targetPokemonId: "red-garchomp"
  });
  assert.equal(substitute.ok, true, substitute.reason);
  const substituteStatus = activeStatuses(controller.getState(), effects.CONTROL_STATUS_TYPES.SUBSTITUTE)[0];

  const declared = controller.declare({
    tokenId: "restrict-token",
    actorPlayerId: "steevee",
    tokenInventoryId: "steevee-restrict-1",
    targetPokemonId: "red-garchomp",
    speciesName: "Garchomp"
  });
  assert.equal(declared.ok, true, declared.reason);
  assert.equal(declared.event.currentPriorityPlayerId, "red");
  const immunity = controller.respondImmunity(declared.event.id, { playerId: "red", tokenInventoryId: "red-immunity-1" });
  assert.equal(immunity.ok, true, immunity.reason);
  assert.equal(immunity.event.resolution, "negated-by-immunity");
  assert.equal(activeStatuses(controller.getState(), "restrict").length, 0);
  assert.equal(substituteStatus.status, "active");
  assert.equal(controller.getState().globalPokemonRules.garchomp, undefined);
  assert.equal(inventoryCount(controller.getState(), "red", "Immunity"), 0);

  await saveGame(server.baseUrl, "restrict-immunity", controller.getState(), 0);
  const reloaded = await loadGame(server.baseUrl, "restrict-immunity");
  assert.equal(reloaded.state.interactionEvents.find((event) => event.id === declared.event.id)?.resolution, "negated-by-immunity");
  assert.equal(inventoryCount(reloaded.state, "red", "Immunity"), 0);
  assert.equal(activeStatuses(reloaded.state, "restrict").length, 0);
  const undoController = controllerFor(reloaded.state);
  assert.equal(undoController.undo(declared.activation.id).ok, true);
  assert.equal(inventoryCount(undoController.getState(), "red", "Immunity"), 1);
  assert.equal(inventoryCount(undoController.getState(), "steevee", "Restrict"), 3);
  assert.equal(activeStatuses(undoController.getState(), "restrict").length, 0);
});

test("[TCI-004] Restrict consumes one exact Substitute, preserves other matching targets, reloads, undoes, and honors Rage first", async () => {
  const controller = controllerFor(controlStateFixture("restrict-substitute"), { idPrefix: "restrict-substitute" });
  const placed = controller.declare({
    tokenId: "substitute",
    actorPlayerId: "red",
    tokenInventoryId: "red-sub-1",
    targetPokemonId: "red-garchomp"
  });
  const restricted = declareAndResolve(controller, {
    tokenId: "restrict-token",
    actorPlayerId: "steevee",
    tokenInventoryId: "steevee-restrict-1",
    targetPokemonId: "red-garchomp",
    speciesName: "Garchomp"
  });
  const state = controller.getState();
  const substitute = state.lingeringStatuses.find((status) => status.id === placed.resolution.status.id);
  const restrictStatus = activeStatuses(state, "restrict")[0];
  assert.equal(substitute.status, "consumed");
  assert.deepEqual(restrictStatus.excludedRosterInstanceIds, ["red-garchomp"]);
  assert.equal(controller.battleLegality("red-garchomp").legal, true);
  assert.equal(controller.battleLegality("red-garchomp-2").legal, false);
  assert.equal(controller.battleLegality("gold-garchomp").legal, false);

  await saveGame(server.baseUrl, "restrict-substitute", state, 0);
  const reloaded = await loadGame(server.baseUrl, "restrict-substitute");
  const reloadedStatus = activeStatuses(reloaded.state, "restrict")[0];
  assert.deepEqual(reloadedStatus.excludedRosterInstanceIds, ["red-garchomp"]);
  assert.equal(reloaded.state.lingeringStatuses.find((status) => status.id === substitute.id).status, "consumed");

  const undoController = controllerFor(reloaded.state, { idPrefix: "restrict-sub-undo" });
  assert.equal(undoController.undo(restricted.declared.activation.id).ok, true);
  assert.equal(activeStatuses(undoController.getState(), "restrict").length, 0);
  assert.equal(undoController.getState().lingeringStatuses.find((status) => status.id === substitute.id).status, "active");
  assert.equal(inventoryCount(undoController.getState(), "steevee", "Restrict"), 3);

  const rageController = controllerFor(controlStateFixture("restrict-rage"), { idPrefix: "restrict-rage" });
  declareAndResolve(rageController, {
    tokenId: "rage-candy-bar",
    actorPlayerId: "gold",
    tokenInventoryId: "gold-rage-1",
    targetPokemonId: "gold-garchomp"
  });
  rageController.declare({
    tokenId: "substitute",
    actorPlayerId: "gold",
    tokenInventoryId: "gold-sub-1",
    targetPokemonId: "gold-garchomp"
  });
  declareAndResolve(rageController, {
    tokenId: "restrict-token",
    actorPlayerId: "steevee",
    tokenInventoryId: "steevee-restrict-1",
    targetPokemonId: "gold-garchomp",
    speciesName: "Garchomp"
  });
  assert.equal(rageController.battleLegality("gold-garchomp").legal, true);
  assert.equal(activeStatuses(rageController.getState(), effects.CONTROL_STATUS_TYPES.SUBSTITUTE)[0].status, "active");
  assert.equal(rageController.battleLegality("red-garchomp").legal, false);
});

test("[TCI-005] Arena Trap fails closed for own and non-Active targets and enforces the exact rival instance", async () => {
  const controller = controllerFor(controlStateFixture("arena-trap"), { idPrefix: "arena" });
  const baselineInventory = inventoryCount(controller.getState(), "steevee", "Arena Trap");
  const own = controller.declare({ tokenId: "arena-trap", actorPlayerId: "steevee", tokenInventoryId: "steevee-arena-1", targetPokemonId: "steevee-alakazam" });
  const nonActive = controller.declare({ tokenId: "arena-trap", actorPlayerId: "steevee", tokenInventoryId: "steevee-arena-1", targetPokemonId: "red-lucario-legacy" });
  assert.equal(own.ok, false);
  assert.equal(nonActive.ok, false);
  assert.equal(inventoryCount(controller.getState(), "steevee", "Arena Trap"), baselineInventory);
  assert.equal(controller.getState().tokenActivations.length, 0);

  const trapped = declareAndResolve(controller, {
    tokenId: "arena-trap",
    actorPlayerId: "steevee",
    tokenInventoryId: "steevee-arena-1",
    targetPokemonId: "red-garchomp"
  });
  const trappedState = controller.getState();
  const trappedBuild = trappedState.teambuilder.buildsByPlayerId.red[0];
  assert.equal(trappedBuild.slots.some((slot) => slot.pokemonRecordId === "red-garchomp"), true);
  assert.equal(trappedState.battleTeams["Kanto:G1"].red.selected.includes("red-garchomp"), true);
  assert.equal(trapped.resolved.resolution.teamMutation.rosterInstanceId, "red-garchomp");
  assert.equal(trapped.resolved.resolution.status.payload.sourceStatusId, trapped.resolved.resolution.status.id);
  assert.equal(trapped.resolved.resolution.status.payload.compensationStatus, "notRequired");
  assert.equal(controller.validateDraftTeam("red", ["red-garchomp"]).valid, true);
  assert.equal(controller.validateLockedTeam("red", ["red-garchomp"]).valid, true);
  assert.equal(controller.validateDraftTeam("red", ["red-garchomp-2"]).valid, false);
  assert.deepEqual(controller.validateLockedTeam("red", ["red-garchomp-2"]).missingPokemonIds, ["red-garchomp"]);
  assert.equal(controller.validateCurseTarget("red-garchomp").ok, false);
  assert.equal(controller.validateCurseTarget("red-garchomp-2").ok, true);

  await saveGame(server.baseUrl, "arena-trap", controller.getState(), 0);
  const reloaded = await loadGame(server.baseUrl, "arena-trap");
  const reloadedController = controllerFor(reloaded.state, { idPrefix: "arena-reload" });
  assert.equal(reloadedController.getState().teambuilder.buildsByPlayerId.red[0].slots.some((slot) => slot.pokemonRecordId === "red-garchomp"), true);
  assert.equal(reloadedController.getState().battleTeams["Kanto:G1"].red.selected.includes("red-garchomp"), true);
  assert.equal(reloadedController.validateLockedTeam("red", ["red-garchomp-2"]).valid, false);
  assert.equal(reloadedController.validateCurseTarget("red-garchomp").ok, false);
  const expired = reloadedController.expireArenaTraps();
  assert.equal(expired.length, 1);
  assert.equal(reloadedController.validateLockedTeam("red", ["red-garchomp-2"]).valid, true);

  const undoController = controllerFor(reloaded.state, { idPrefix: "arena-undo" });
  assert.equal(undoController.undo(trapped.declared.activation.id).ok, true);
  assert.equal(activeStatuses(undoController.getState(), "arena-trap").length, 0);
  assert.equal(inventoryCount(undoController.getState(), "steevee", "Arena Trap"), baselineInventory);
  assert.equal(undoController.getState().teambuilder.buildsByPlayerId?.red, undefined);
  assert.equal(undoController.getState().battleTeams?.["Kanto:G1"]?.red, undefined);
});

test("[TCI-005B] Arena Trap compensation blocks Team Lock, applies a move to the exact set, reloads, and undoes with Arena Trap", async () => {
  const state = controlStateFixture("arena-trap-compensation");
  findPokemon(state, "red-lucario").battleTier = "Poke";
  state.teambuilder.activeBuildByPlayerId = { red: "red-original-build" };
  state.teambuilder.buildsByPlayerId = {
    red: [{
      id: "red-original-build",
      playerId: "red",
      series: "Kanto",
      gym: 1,
      slotCount: 6,
      slots: [{ pokemonRecordId: "red-garchomp-2", slotIndex: 0, moves: ["Tackle"] }]
    }]
  };
  state.battleTeams = { "Kanto:G1": { red: { selected: ["red-garchomp-2"], badgeBoosts: [0], locked: false } } };
  const originalBuild = structuredClone(state.teambuilder.buildsByPlayerId.red);
  const originalBattleTeam = structuredClone(state.battleTeams["Kanto:G1"].red);
  const controller = controllerFor(state, { idPrefix: "arena-compensation" });
  const trapped = declareAndResolve(controller, {
    tokenId: "arena-trap",
    actorPlayerId: "steevee",
    tokenInventoryId: "steevee-arena-1",
    targetPokemonId: "red-lucario"
  });
  const trappedState = controller.getState();
  assert.equal(trapped.resolved.resolution.compensationRequired, true);
  assert.equal(controller.validateLockedTeam("red", ["red-lucario"]).valid, false);
  assert.match(controller.validateLockedTeam("red", ["red-lucario"]).errors.join(" "), /Ability or move choice/);
  const choice = effects.applyArenaTrapCustomization(trappedState, {
    statusId: trapped.resolved.resolution.status.id,
    actorPlayerId: "red",
    kind: "move",
    name: "Recover",
    moveSlotIndex: 2
  }, {
    series: "Kanto",
    gym: 1,
    phase: "action",
    makeId: (prefix) => `${prefix}-integration-choice`,
    battleTeamKey: () => "Kanto:G1",
    teamSizeForPlayer: () => 6,
    moveExists: () => true
  });
  assert.equal(choice.result, "resolved");
  assert.equal(findPlayer(trappedState, "red").moveAccessGrants[0].moveName, "Recover");
  assert.equal(findPlayer(trappedState, "red").moveAccessGrants[0].pokemonRecordId, "red-lucario");
  const trappedSlot = trappedState.teambuilder.buildsByPlayerId.red[0].slots.find((slot) => slot.pokemonRecordId === "red-lucario");
  assert.equal(trappedSlot.moves[2], "Recover");
  assert.equal(controller.validateLockedTeam("red", ["red-lucario"]).valid, true);

  await saveGame(server.baseUrl, "arena-trap-compensation", trappedState, 0);
  const reloaded = await loadGame(server.baseUrl, "arena-trap-compensation");
  assert.equal(findPlayer(reloaded.state, "red").moveAccessGrants[0].moveName, "Recover");
  assert.equal(reloaded.state.teambuilder.buildsByPlayerId.red[0].slots.find((slot) => slot.pokemonRecordId === "red-lucario").moves[2], "Recover");
  const undoController = controllerFor(reloaded.state, { idPrefix: "arena-compensation-undo" });
  assert.equal(undoController.undo(trapped.declared.activation.id).ok, true);
  assert.equal(activeStatuses(undoController.getState(), "arena-trap").length, 0);
  assert.equal(findPlayer(undoController.getState(), "red").moveAccessGrants.length, 0);
  assert.deepEqual(undoController.getState().teambuilder.buildsByPlayerId.red, originalBuild);
  assert.deepEqual(undoController.getState().battleTeams["Kanto:G1"].red, originalBattleTeam);
});

test("[TCI-005C] Badge-illegal Arena Trap declarations reject before Token consumption", () => {
  const state = controlStateFixture("arena-trap-badge-illegal");
  const before = inventoryCount(state, "steevee", "Arena Trap");
  const controller = controllerFor(state, {
    idPrefix: "arena-badge-illegal",
    bringLegalityForPokemon: (pokemon) => pokemon.id === "red-lucario"
      ? { ok: false, reason: "Red lacks the required Badge capacity." }
      : { ok: true, reason: "" }
  });
  const declaration = controller.declare({
    tokenId: "arena-trap",
    actorPlayerId: "steevee",
    tokenInventoryId: "steevee-arena-1",
    targetPokemonId: "red-lucario"
  });
  assert.equal(declaration.ok, false);
  assert.match(declaration.reason, /Badge capacity/);
  assert.equal(inventoryCount(controller.getState(), "steevee", "Arena Trap"), before);
  assert.equal(controller.getState().tokenActivations.length, 0);
});

test("[TCI-006] Clear Smog removes exact Rage buffs and move grants while preserving natural and player-wide state", async () => {
  const state = controlStateFixture("clear-smog");
  const controller = controllerFor(state, { idPrefix: "clear" });
  declareAndResolve(controller, {
    tokenId: "rage-candy-bar",
    actorPlayerId: "gold",
    tokenInventoryId: "gold-rage-1",
    targetPokemonId: "gold-garchomp"
  });
  const target = findPokemon(controller.getState(), "gold-garchomp");
  const untouched = findPokemon(controller.getState(), "red-garchomp");
  const untouchedBefore = structuredClone(untouched);
  target.buffs.push("Custom Buff");
  target.buffs.push("TM Move Pending");
  findPlayer(controller.getState(), "gold").moveAccessGrants.push(
    { id: "exact-grant", pokemonRecordId: target.id, moveName: "Spore", status: "active", active: true },
    { id: "other-grant", pokemonRecordId: untouched.id, moveName: "Moonblast", status: "active", active: true }
  );
  controller.getState().classStateByPlayerId.gold.moveAccessGrants.push({ id: "class-player-wide", moveName: "Recover", status: "active", active: true });
  controller.getState().perkSystem.moveAccessGrantsByPlayerId.gold = [{ id: "perk-player-wide", moveName: "Encore", status: "active", active: true }];
  const preserved = {
    trainerId: target.trainerId,
    rosterType: target.rosterType,
    level: target.level,
    naturalLevel: target.naturalLevel,
    ability: target.ability,
    moves: structuredClone(target.moves),
    baseStats: structuredClone(target.baseStats),
    origin: target.origin,
    classMarker: controller.getState().classStateByPlayerId.gold.persistentMarker,
    perkMarker: controller.getState().perkSystem.persistentMarker
  };

  const clear = declareAndResolve(controller, {
    tokenId: "clear-smog",
    actorPlayerId: "steevee",
    tokenInventoryId: "steevee-clear-1",
    targetPokemonId: "gold-garchomp"
  });
  const cleared = findPokemon(controller.getState(), "gold-garchomp");
  assert.deepEqual(cleared.effectBuffs.map((buff) => [buff.type, buff.amount, buff.status]), [
    ["levelBonus", 3, "removed"],
    ["evCapBonus", 252, "removed"]
  ]);
  assert.deepEqual(cleared.buffs, ["Custom Buff", "TM Move Pending"]);
  assert.equal(findPlayer(controller.getState(), "gold").moveAccessGrants.find((grant) => grant.id === "exact-grant").status, "removed");
  assert.equal(findPlayer(controller.getState(), "gold").moveAccessGrants.find((grant) => grant.id === "other-grant").status, "active");
  assert.deepEqual({
    trainerId: cleared.trainerId,
    rosterType: cleared.rosterType,
    level: cleared.level,
    naturalLevel: cleared.naturalLevel,
    ability: cleared.ability,
    moves: cleared.moves,
    baseStats: cleared.baseStats,
    origin: cleared.origin,
    classMarker: controller.getState().classStateByPlayerId.gold.persistentMarker,
    perkMarker: controller.getState().perkSystem.persistentMarker
  }, preserved);
  assert.equal(controller.getState().classStateByPlayerId.gold.moveAccessGrants[0].status, "active");
  assert.equal(controller.getState().perkSystem.moveAccessGrantsByPlayerId.gold[0].status, "active");
  assert.equal(untouched.effectBuffs.length, 0);
  assert.deepEqual(untouched, untouchedBefore);
  assert.equal(effects.pokemonHasRestrictImmunity(controller.getState(), cleared, { series: "Kanto", gym: 1, phase: "action" }), true);

  await saveGame(server.baseUrl, "clear-smog", controller.getState(), 0);
  const reloaded = await loadGame(server.baseUrl, "clear-smog");
  assert.equal(findPokemon(reloaded.state, "gold-garchomp").effectBuffs.every((buff) => buff.status === "removed"), true);
  assert.equal(findPlayer(reloaded.state, "gold").moveAccessGrants.find((grant) => grant.id === "exact-grant").status, "removed");

  const undoController = controllerFor(reloaded.state, { idPrefix: "clear-undo" });
  assert.equal(undoController.undo(clear.declared.activation.id).ok, true);
  const restored = findPokemon(undoController.getState(), "gold-garchomp");
  assert.deepEqual(restored.effectBuffs.map((buff) => [buff.type, buff.amount, buff.status]), [
    ["levelBonus", 3, "active"],
    ["evCapBonus", 252, "active"]
  ]);
  assert.equal(findPlayer(undoController.getState(), "gold").moveAccessGrants.find((grant) => grant.id === "exact-grant").status, "active");
  assert.equal(activeStatuses(undoController.getState(), effects.CONTROL_STATUS_TYPES.RAGE_ENHANCEMENT).length, 1);
  assert.deepEqual(findPokemon(undoController.getState(), "red-garchomp"), untouchedBefore);
  assert.equal(undoController.getState().classStateByPlayerId.gold.persistentMarker, "keep-class");
  assert.equal(undoController.getState().perkSystem.persistentMarker, "keep-perks");
});

test("[TCI-007] Substitute consumes exactly one inventory item and duplicate placement leaves inventory and activations unchanged", () => {
  const controller = controllerFor(controlStateFixture("substitute-inventory"), { idPrefix: "sub-inventory" });
  const before = inventoryCount(controller.getState(), "gold", "Substitute");
  const first = controller.declare({ tokenId: "substitute", actorPlayerId: "gold", tokenInventoryId: "gold-sub-1", targetPokemonId: "gold-garchomp" });
  assert.equal(first.ok, true, first.reason);
  assert.equal(inventoryCount(controller.getState(), "gold", "Substitute"), before - 1);
  assert.equal(controller.getState().tokenConsumptions.filter((entry) => entry.tokenName === "Substitute").length, 1);
  assert.equal(controller.getState().tokenActivations.filter((entry) => entry.tokenName === "Substitute").length, 1);
  const activationsBeforeDuplicate = controller.getState().tokenActivations.length;
  const consumptionsBeforeDuplicate = controller.getState().tokenConsumptions.length;
  const duplicate = controller.declare({ tokenId: "substitute", actorPlayerId: "gold", tokenInventoryId: "gold-sub-2", targetPokemonId: "gold-garchomp" });
  assert.equal(duplicate.ok, false);
  assert.match(duplicate.reason, /already has/i);
  assert.equal(inventoryCount(controller.getState(), "gold", "Substitute"), before - 1);
  assert.equal(controller.getState().tokenActivations.length, activationsBeforeDuplicate);
  assert.equal(controller.getState().tokenConsumptions.length, consumptionsBeforeDuplicate);
  assert.equal(controller.getState().tokenConsumptions[0].policy, "provisional-consume-on-legal-declaration");
});

test("[TCI-008] Arena Trap stale-target resolution cancels safely and refunds the declaration", async () => {
  const controller = controllerFor(controlStateFixture("arena-stale"), { idPrefix: "arena-stale" });
  const before = inventoryCount(controller.getState(), "steevee", "Arena Trap");
  const declared = controller.declare({
    tokenId: "arena-trap",
    actorPlayerId: "steevee",
    tokenInventoryId: "steevee-arena-1",
    targetPokemonId: "red-lucario"
  });
  assert.equal(declared.ok, true, declared.reason);
  assert.equal(inventoryCount(controller.getState(), "steevee", "Arena Trap"), before - 1);
  findPokemon(controller.getState(), "red-lucario").rosterType = "Legacy";
  findPokemon(controller.getState(), "red-lucario").status = "Legacy";
  const resolved = controller.resolve(declared.event.id);
  assert.equal(resolved.ok, true);
  assert.equal(resolved.resolution.result, "systemFailure");
  assert.equal(resolved.resolution.refunded, true);
  assert.equal(resolved.event.status, "canceled");
  assert.equal(resolved.event.resolution, "canceledRefunded");
  assert.equal(inventoryCount(controller.getState(), "steevee", "Arena Trap"), before);
  assert.equal(activeStatuses(controller.getState(), "arena-trap").length, 0);
  assert.equal(controller.getState().tokenConsumptions.find((entry) => entry.id === declared.event.payload.consumptionRecordId).status, "refunded");

  await saveGame(server.baseUrl, "arena-stale", controller.getState(), 0);
  const reloaded = await loadGame(server.baseUrl, "arena-stale");
  assert.equal(reloaded.state.interactionEvents.find((event) => event.id === declared.event.id).status, "canceled");
  assert.equal(inventoryCount(reloaded.state, "steevee", "Arena Trap"), before);
});

test("[TCI-009] Incinerate respects responses, removes one stable record per rival, reloads, undoes, and resolves empty matches", async () => {
  const responseController = controllerFor(controlStateFixture("incinerate-response"), { idPrefix: "incinerate-response" });
  const goldBefore = structuredClone(findPlayer(responseController.getState(), "gold").inventory);
  const redBefore = structuredClone(findPlayer(responseController.getState(), "red").inventory);
  const responseDeclaration = responseController.declare({
    tokenId: "incinerate",
    actorPlayerId: "steevee",
    tokenInventoryId: "steevee-incinerate-1",
    resourceSelections: [
      { playerId: "gold", resourceId: "gold-leftovers" },
      { playerId: "red", resourceId: "red-recover" }
    ]
  });
  assert.equal(responseDeclaration.ok, true, responseDeclaration.reason);
  const responderId = responseDeclaration.event.currentPriorityPlayerId;
  const immunity = findPlayer(responseController.getState(), responderId).inventory.find((item) => item.name === "Immunity");
  assert.ok(immunity, `${responderId} needs an Immunity fixture`);
  const negated = responseController.respondImmunity(responseDeclaration.event.id, {
    playerId: responderId,
    tokenInventoryId: immunity.id
  });
  assert.equal(negated.ok, true, negated.reason);
  assert.deepEqual(findPlayer(responseController.getState(), "gold").inventory.filter((item) => item.type !== "TOKEN"), goldBefore.filter((item) => item.type !== "TOKEN"));
  assert.deepEqual(findPlayer(responseController.getState(), "red").inventory.filter((item) => item.type !== "TOKEN"), redBefore.filter((item) => item.type !== "TOKEN"));
  assert.equal(responseController.getState().effectOperations.length, 0);

  const controller = controllerFor(controlStateFixture("incinerate-resolve"), { idPrefix: "incinerate-resolve" });
  const result = declareAndResolve(controller, {
    tokenId: "incinerate",
    actorPlayerId: "steevee",
    tokenInventoryId: "steevee-incinerate-1",
    resourceSelections: [
      { playerId: "gold", resourceId: "gold-leftovers" },
      { playerId: "red", resourceId: "red-recover" }
    ]
  });
  const state = controller.getState();
  assert.equal(result.resolved.resolution.result, "resolved");
  assert.deepEqual(result.declared.event.payload.resourceSelections.map((selection) => selection.resourceId), ["gold-leftovers", "red-recover"]);
  assert.equal(state.effectOperations.length, 2);
  assert.equal(findPlayer(state, "gold").inventory.some((item) => item.id === "gold-leftovers"), false);
  assert.equal(findPlayer(state, "red").inventory.some((item) => item.id === "red-recover"), false);
  assert.equal(findPlayer(state, "red").inventory.some((item) => item.id === "red-leftovers-1"), true);
  assert.equal(findPlayer(state, "red").inventory.some((item) => item.id === "red-leftovers-2"), true);
  assert.equal(findPlayer(state, "steevee").inventory.some((item) => item.id === "steevee-leftovers"), true);
  assert.equal(state.effectOperations.every((operation) => operation.sourceEffectId === result.declared.event.id), true);
  assert.equal(state.effectOperations.every((operation) => operation.sourceActivationId === result.declared.activation.id), true);

  await saveGame(server.baseUrl, "incinerate-resolve", state, 0);
  const reloaded = await loadGame(server.baseUrl, "incinerate-resolve");
  assert.equal(reloaded.state.effectOperations.length, 2);
  assert.equal(findPlayer(reloaded.state, "gold").inventory.some((item) => item.id === "gold-leftovers"), false);
  assert.equal(findPlayer(reloaded.state, "red").inventory.some((item) => item.id === "red-recover"), false);
  assert.deepEqual(reloaded.state.interactionEvents.find((event) => event.id === result.declared.event.id).payload.resourceSelections.map((selection) => selection.resourceId), ["gold-leftovers", "red-recover"]);
  const duplicateController = controllerFor(structuredClone(reloaded.state), { idPrefix: "incinerate-duplicate" });
  const duplicate = duplicateController.resolve(result.declared.event.id);
  assert.equal(duplicate.ok, false);
  assert.equal(duplicateController.getState().effectOperations.length, 2);
  assert.equal(findPlayer(duplicateController.getState(), "red").inventory.some((item) => item.id === "red-leftovers-1"), true);
  const undoController = controllerFor(reloaded.state, { idPrefix: "incinerate-undo" });
  assert.equal(undoController.undo(result.declared.activation.id).ok, true);
  assert.equal(findPlayer(undoController.getState(), "gold").inventory.some((item) => item.id === "gold-leftovers"), true);
  assert.equal(findPlayer(undoController.getState(), "red").inventory.some((item) => item.id === "red-recover"), true);
  assert.equal(undoController.getState().effectOperations.length, 0);

  const emptyState = controlStateFixture("incinerate-empty");
  emptyState.players.filter((player) => player.id !== "steevee").forEach((player) => {
    const eligibleIds = new Set(effects.incinerateEligibleResources(player).map((resource) => resource.id));
    player.inventory = player.inventory.filter((resource) => !eligibleIds.has(resource.id));
  });
  const emptyController = controllerFor(emptyState, { idPrefix: "incinerate-empty" });
  const empty = declareAndResolve(emptyController, {
    tokenId: "incinerate",
    actorPlayerId: "steevee",
    tokenInventoryId: "steevee-incinerate-2",
    resourceSelections: []
  });
  assert.equal(empty.resolved.resolution.result, "noEffect");
  assert.equal(emptyController.getState().effectOperations.length, 0);
  assert.equal(inventoryCount(emptyController.getState(), "steevee", "Incinerate"), 2);

  const skippedState = controlStateFixture("incinerate-skipped-rival");
  const gold = findPlayer(skippedState, "gold");
  const goldEligibleIds = new Set(effects.incinerateEligibleResources(gold).map((resource) => resource.id));
  gold.inventory = gold.inventory.filter((resource) => !goldEligibleIds.has(resource.id));
  const skippedController = controllerFor(skippedState, { idPrefix: "incinerate-skipped-rival" });
  const skipped = declareAndResolve(skippedController, {
    tokenId: "incinerate",
    actorPlayerId: "steevee",
    tokenInventoryId: "steevee-incinerate-3",
    resourceSelections: [{ playerId: "red", resourceId: "red-leftovers-2" }]
  });
  assert.equal(skipped.resolved.resolution.result, "resolved");
  assert.deepEqual(skipped.resolved.resolution.skippedPlayerIds, ["gold"]);
  assert.equal(findPlayer(skippedController.getState(), "red").inventory.some((item) => item.id === "red-leftovers-2"), false);
});

test("[TCI-010] Steal is blocked pre-consumption by Sticky Hold and intercepted by Substitute", () => {
  const stickyState = controlStateFixture("steal-sticky");
  findPlayer(stickyState, "red").perks = ["Sticky Hold"];
  const stickyController = controllerFor(stickyState, { idPrefix: "steal-sticky" });
  const before = inventoryCount(stickyController.getState(), "steevee", "Steal");
  const blocked = stickyController.declare({
    tokenId: "steal-token",
    actorPlayerId: "steevee",
    tokenInventoryId: "steevee-steal-1",
    targetPokemonId: "red-lucario"
  });
  assert.equal(blocked.ok, false);
  assert.match(blocked.reason, /Sticky Hold/);
  assert.equal(inventoryCount(stickyController.getState(), "steevee", "Steal"), before);

  const controller = controllerFor(controlStateFixture("steal-substitute"), { idPrefix: "steal-substitute" });
  const substitute = controller.declare({
    tokenId: "substitute",
    actorPlayerId: "red",
    tokenInventoryId: "red-sub-1",
    targetPokemonId: "red-lucario"
  });
  assert.equal(substitute.ok, true, substitute.reason);
  const declared = controller.declare({
    tokenId: "steal-token",
    actorPlayerId: "steevee",
    tokenInventoryId: "steevee-steal-1",
    targetPokemonId: "red-lucario"
  });
  assert.equal(declared.ok, true, declared.reason);
  const resolved = controller.resolve(declared.event.id);
  assert.equal(resolved.ok, true);
  assert.equal(resolved.resolution.result, "negated");
  assert.equal(findPokemon(controller.getState(), "red-lucario").trainerId, "red");
  assert.equal(controller.getState().lingeringStatuses.find((status) => status.id === substitute.resolution.status.id).status, "consumed");
  assert.equal(controller.getState().effectOperations.length, 0);
  assert.equal(inventoryCount(controller.getState(), "steevee", "Steal"), 2);
});

test("[TCI-011] Steal transfers one exact Pokemon through reload and undo, while stale targets refund", async () => {
  const state = controlStateFixture("steal-transfer");
  findPlayer(state, "red").buffs = ["Safeguard"];
  state.battleTeams = { "Kanto:G1": { red: { selected: ["red-lucario", "red-garchomp"], badgeBoosts: [1, 0], locked: false } } };
  state.teambuilder = {
    ...state.teambuilder,
    activeBuildByPlayerId: { red: "red-build" },
    buildsByPlayerId: {
      red: [{
        id: "red-build",
        playerId: "red",
        series: "Kanto",
        gym: 1,
        slots: [
          { slotIndex: 0, pokemonRecordId: "red-lucario", moves: ["Aura Sphere"] },
          { slotIndex: 1, pokemonRecordId: "red-garchomp", moves: ["Earthquake"] }
        ]
      }]
    }
  };
  const controller = controllerFor(state, { idPrefix: "steal-transfer" });
  const result = declareAndResolve(controller, {
    tokenId: "steal-token",
    actorPlayerId: "steevee",
    tokenInventoryId: "steevee-steal-1",
    targetPokemonId: "red-lucario"
  });
  assert.equal(result.resolved.resolution.result, "resolved");
  assert.equal(findPokemon(controller.getState(), "red-lucario").trainerId, "steevee");
  assert.deepEqual(controller.getState().battleTeams["Kanto:G1"].red.selected, ["red-garchomp"]);
  assert.equal(controller.getState().teambuilder.buildsByPlayerId.red[0].slots[0].pokemonRecordId, undefined);
  assert.equal(controller.getState().effectOperations[0].previousOwnerPlayerId, "red");
  assert.equal(controller.getState().effectOperations[0].newOwnerPlayerId, "steevee");
  assert.equal(controller.getState().effectOperations[0].sourceActivationId, result.declared.activation.id);

  await saveGame(server.baseUrl, "steal-transfer", controller.getState(), 0);
  const reloaded = await loadGame(server.baseUrl, "steal-transfer");
  assert.equal(findPokemon(reloaded.state, "red-lucario").trainerId, "steevee");
  assert.equal(reloaded.state.effectOperations.length, 1);
  const undoController = controllerFor(reloaded.state, { idPrefix: "steal-undo" });
  assert.equal(undoController.undo(result.declared.activation.id).ok, true);
  assert.equal(findPokemon(undoController.getState(), "red-lucario").trainerId, "red");
  assert.deepEqual(undoController.getState().battleTeams["Kanto:G1"].red.selected, ["red-lucario", "red-garchomp"]);
  assert.equal(undoController.getState().teambuilder.buildsByPlayerId.red[0].slots[0].pokemonRecordId, "red-lucario");
  assert.equal(undoController.getState().effectOperations.length, 0);

  const staleController = controllerFor(controlStateFixture("steal-stale"), { idPrefix: "steal-stale" });
  const staleBefore = inventoryCount(staleController.getState(), "steevee", "Steal");
  const stale = staleController.declare({
    tokenId: "steal-token",
    actorPlayerId: "steevee",
    tokenInventoryId: "steevee-steal-1",
    targetPokemonId: "red-lucario"
  });
  assert.equal(stale.ok, true, stale.reason);
  findPokemon(staleController.getState(), "red-lucario").status = "Removed";
  const staleResult = staleController.resolve(stale.event.id);
  assert.equal(staleResult.resolution.result, "systemFailure");
  assert.equal(staleResult.resolution.refunded, true);
  assert.equal(inventoryCount(staleController.getState(), "steevee", "Steal"), staleBefore);
  assert.equal(staleController.getState().effectOperations.length, 0);
});

test("[TCI-012] Wicked Blow targets either player's exact Active Roster instance without requiring a Battle Phase team", async () => {
  const outsideState = controlStateFixture("wicked-outside-team");
  outsideState.battleTeams = {};
  const outsideInventoryBeforePreview = inventoryCount(outsideState, "steevee", "Wicked Blow");
  const outsidePreviewBefore = JSON.stringify(outsideState);
  const outsidePreview = effects.wickedBlowResolutionPlan(outsideState, findPokemon(outsideState, "red-lucario"), {
    series: "Kanto",
    gym: 1,
    phase: "action",
    battleTeamKey: () => "Kanto:G1",
    wickedBlowReplacementPlan: deterministicWickedBlowPlan
  }, true);
  assert.equal(outsidePreview.ok, true, outsidePreview.reason);
  assert.equal(JSON.stringify(outsideState), outsidePreviewBefore);
  assert.equal(inventoryCount(outsideState, "steevee", "Wicked Blow"), outsideInventoryBeforePreview);
  const outsideController = controllerFor(outsideState, { idPrefix: "wicked-outside" });
  const outsideResult = declareAndResolve(outsideController, {
    tokenId: "wicked-blow",
    actorPlayerId: "steevee",
    tokenInventoryId: "steevee-wicked-1",
    targetPokemonId: "red-lucario"
  });
  assert.equal(outsideResult.resolved.resolution.result, "resolved");
  assert.equal(findPokemon(outsideController.getState(), "red-lucario").name, "Barbaracle");
  assert.deepEqual(outsideController.getState().battleTeams, {});

  const selfState = controlStateFixture("wicked-self");
  selfState.battleTeams = {};
  const selfController = controllerFor(selfState, { idPrefix: "wicked-self" });
  const selfResult = declareAndResolve(selfController, {
    tokenId: "wicked-blow",
    actorPlayerId: "steevee",
    tokenInventoryId: "steevee-wicked-1",
    targetPokemonId: "steevee-alakazam"
  });
  assert.equal(selfResult.resolved.resolution.result, "resolved");
  assert.equal(findPokemon(selfController.getState(), "steevee-alakazam").name, "Barbaracle");
  assert.deepEqual(selfController.getState().battleTeams, {});

  const nonActiveState = controlStateFixture("wicked-non-active");
  const sourcePokemon = findPokemon(nonActiveState, "red-lucario");
  nonActiveState.pokemonRecords.push(
    { ...sourcePokemon, id: "red-reserve", rosterType: "Reserve" },
    { ...sourcePokemon, id: "red-released", rosterType: "Released", status: "Released" },
    { ...sourcePokemon, id: "red-daycare", breederStatus: { status: "active" } },
    { ...sourcePokemon, id: "red-temporary", temporaryActive: true }
  );
  nonActiveState.battleTeams = { "Kanto:G1": { red: { selected: ["red-reserve"], selectedBattleSpecies: ["Lucario"] } } };
  const nonActiveController = controllerFor(nonActiveState, { idPrefix: "wicked-non-active" });
  const nonActiveCount = inventoryCount(nonActiveController.getState(), "steevee", "Wicked Blow");
  for (const targetPokemonId of ["red-reserve", "red-released", "red-daycare", "red-temporary"]) {
    const rejected = nonActiveController.declare({
      tokenId: "wicked-blow",
      actorPlayerId: "steevee",
      tokenInventoryId: "steevee-wicked-1",
      targetPokemonId
    });
    assert.equal(rejected.ok, false, `${targetPokemonId} should not be targetable.`);
  }
  assert.equal(inventoryCount(nonActiveController.getState(), "steevee", "Wicked Blow"), nonActiveCount);

  const state = controlStateFixture("wicked-rival-exact");
  state.battleTeams = {
    "Kanto:G1": {
      red: {
        selected: ["red-garchomp", "red-garchomp-2"],
        selectedBattleSpecies: ["Garchomp", "Garchomp"],
        badgeBoosts: [1, 2],
        locked: true,
        lockedSlots: [
          { pokemonRecordId: "red-garchomp", selectedBattleSpecies: "Garchomp", assignedBadgePoints: 1 },
          { pokemonRecordId: "red-garchomp-2", selectedBattleSpecies: "Garchomp", assignedBadgePoints: 2 }
        ]
      }
    }
  };
  state.teambuilder = {
    ...state.teambuilder,
    activeBuildByPlayerId: { red: "red-wicked-build" },
    buildsByPlayerId: {
      red: [{
        id: "red-wicked-build",
        playerId: "red",
        series: "Kanto",
        gym: 1,
        slots: [
          { slotIndex: 0, pokemonRecordId: "red-garchomp", selectedBattleSpecies: "Garchomp", ability: "Rough Skin", moves: ["Earthquake"] },
          { slotIndex: 1, pokemonRecordId: "red-garchomp-2", selectedBattleSpecies: "Garchomp", ability: "Sand Veil", moves: ["Dragon Claw"] }
        ]
      }]
    }
  };
  const controller = controllerFor(state, { idPrefix: "wicked-rival" });
  const result = declareAndResolve(controller, {
    tokenId: "wicked-blow",
    actorPlayerId: "steevee",
    tokenInventoryId: "steevee-wicked-1",
    targetPokemonId: "red-garchomp-2",
    targetPlayerId: "red"
  });
  const resolvedState = controller.getState();
  assert.equal(result.resolved.resolution.result, "resolved");
  assert.equal(findPokemon(resolvedState, "red-garchomp").name, "Garchomp");
  assert.equal(findPokemon(resolvedState, "red-garchomp-2").name, "Barbaracle");
  assert.deepEqual(resolvedState.battleTeams["Kanto:G1"].red.selected, ["red-garchomp", "red-garchomp-2"]);
  assert.deepEqual(resolvedState.battleTeams["Kanto:G1"].red.selectedBattleSpecies, ["Garchomp", "Barbaracle"]);
  assert.equal(resolvedState.battleTeams["Kanto:G1"].red.lockedSlots[1].selectedBattleSpecies, "Barbaracle");
  assert.equal(resolvedState.teambuilder.buildsByPlayerId.red[0].slots[0].moves[0], "Earthquake");
  assert.deepEqual(resolvedState.teambuilder.buildsByPlayerId.red[0].slots[1].moves, ["", "", "", ""]);
  assert.equal(resolvedState.effectOperations[0].targetObjectId, "red-garchomp-2");
  assert.equal(resolvedState.effectOperations[0].targetObjectName, "Garchomp");
  assert.equal(resolvedState.effectOperations[0].replacementObjectName, "Barbaracle");
  assert.equal(resolvedState.effectOperations[0].previousLocation, "activeRoster");
  assert.equal(resolvedState.effectOperations[0].tierCalculation.finalEvolutionTier, "Great Elite");
  assert.equal(resolvedState.effectOperations[0].tierCalculation.replacementTier, "Poke");
  assert.equal(controller.resolve(result.declared.event.id).ok, false);
  assert.equal(resolvedState.effectOperations.length, 1);

  await saveGame(server.baseUrl, "wicked-rival-exact", resolvedState, 0);
  const reloaded = await loadGame(server.baseUrl, "wicked-rival-exact");
  assert.equal(findPokemon(reloaded.state, "red-garchomp-2").name, "Barbaracle");
  assert.equal(reloaded.state.effectOperations[0].replacementObjectName, "Barbaracle");
  const undoController = controllerFor(reloaded.state, { idPrefix: "wicked-undo" });
  assert.equal(undoController.undo(result.declared.activation.id).ok, true);
  assert.equal(findPokemon(undoController.getState(), "red-garchomp-2").name, "Garchomp");
  assert.deepEqual(undoController.getState().battleTeams["Kanto:G1"].red.selectedBattleSpecies, ["Garchomp", "Garchomp"]);
  assert.equal(undoController.getState().teambuilder.buildsByPlayerId.red[0].slots[1].moves[0], "Dragon Claw");
  assert.equal(undoController.getState().effectOperations.length, 0);

  const noPoolState = controlStateFixture("wicked-no-pool");
  noPoolState.wickedBlowNoPool = true;
  noPoolState.battleTeams = {};
  const noPoolController = controllerFor(noPoolState, { idPrefix: "wicked-no-pool" });
  const noPoolCount = inventoryCount(noPoolController.getState(), "steevee", "Wicked Blow");
  const noPool = noPoolController.declare({
    tokenId: "wicked-blow",
    actorPlayerId: "steevee",
    tokenInventoryId: "steevee-wicked-1",
    targetPokemonId: "red-lucario"
  });
  assert.equal(noPool.ok, false);
  assert.match(noPool.reason, /No legal Pokemon/);
  assert.equal(inventoryCount(noPoolController.getState(), "steevee", "Wicked Blow"), noPoolCount);

  const staleState = controlStateFixture("wicked-stale");
  staleState.battleTeams = {};
  const staleController = controllerFor(staleState, { idPrefix: "wicked-stale" });
  const staleCount = inventoryCount(staleController.getState(), "steevee", "Wicked Blow");
  const stale = staleController.declare({
    tokenId: "wicked-blow",
    actorPlayerId: "steevee",
    tokenInventoryId: "steevee-wicked-1",
    targetPokemonId: "red-lucario"
  });
  assert.equal(stale.ok, true, stale.reason);
  findPokemon(staleController.getState(), "red-lucario").rosterType = "Reserve";
  const staleResult = staleController.resolve(stale.event.id);
  assert.equal(staleResult.resolution.result, "systemFailure");
  assert.equal(staleResult.resolution.refunded, true);
  assert.equal(inventoryCount(staleController.getState(), "steevee", "Wicked Blow"), staleCount);
  assert.equal(staleController.getState().effectOperations.length, 0);
});

test("[TCI-013] Move Deleter persists one canonical next-Gym restriction and undoes exactly", async () => {
  const state = controlStateFixture("move-deleter-runtime");
  findPlayer(state, "steevee").inventory.push({
    id: "steevee-move-deleter-1",
    canonicalId: "move-deleter",
    name: "Move Deleter",
    type: "TOKEN"
  });
  const controller = controllerFor(state, { idPrefix: "move-deleter" });
  const result = declareAndResolve(controller, {
    tokenId: "move-deleter",
    actorPlayerId: "steevee",
    tokenInventoryId: "steevee-move-deleter-1",
    resourceName: "Recover"
  });
  const resolvedState = controller.getState();
  assert.equal(inventoryCount(resolvedState, "steevee", "Move Deleter"), 0);
  assert.equal(effects.moveRestrictionForName(resolvedState, "Recover", { series: "Kanto", gym: 1 }), null);
  assert.equal(effects.moveRestrictionForName(resolvedState, "recover", { series: "Kanto", gym: 2 })?.payload?.moveName, "Recover");

  await saveGame(server.baseUrl, "move-deleter-runtime", resolvedState, 0);
  const reloaded = await loadGame(server.baseUrl, "move-deleter-runtime");
  assert.equal(effects.moveRestrictionForName(reloaded.state, "RECOVER", { series: "Kanto", gym: 2 })?.payload?.moveName, "Recover");
  const undoController = controllerFor(reloaded.state, { idPrefix: "move-deleter-undo" });
  assert.equal(undoController.undo(result.declared.activation.id).ok, true);
  assert.equal(effects.moveRestrictionForName(undoController.getState(), "Recover", { series: "Kanto", gym: 2 }), null);
  assert.equal(inventoryCount(undoController.getState(), "steevee", "Move Deleter"), 1);
});

test("[TCI-014] Cold Wave suppresses explicit ongoing effects through reload without mutating them", async () => {
  const state = controlStateFixture("cold-wave-runtime");
  findPlayer(state, "steevee").inventory.push({
    id: "steevee-cold-wave-1",
    canonicalId: "cold-wave",
    name: "Cold Wave",
    type: "TOKEN"
  });
  const explicit = effects.createStatus(state, {
    id: "cold-wave-explicit-source",
    type: "class-aura",
    name: "Class Aura",
    isOngoingEffect: true,
    duration: "Two Gyms",
    expiresAtGym: 3
  }, { series: "Kanto", gym: 1, phase: "action", makeId: () => "cold-wave-explicit-source" });
  const durationOnly = effects.createStatus(state, {
    id: "cold-wave-duration-only",
    type: "ordinary-buff",
    name: "Ordinary Buff",
    duration: "Two Gyms",
    expiresAtGym: 3
  }, { series: "Kanto", gym: 1, phase: "action", makeId: () => "cold-wave-duration-only" });
  const controller = controllerFor(state, { idPrefix: "cold-wave" });
  const result = declareAndResolve(controller, {
    tokenId: "cold-wave",
    actorPlayerId: "steevee",
    tokenInventoryId: "steevee-cold-wave-1"
  });
  const resolvedState = controller.getState();
  assert.equal(effects.statusSuppressedByColdWave(resolvedState, explicit, { series: "Kanto", gym: 1, phase: "action" }), true);
  assert.equal(effects.statusSuppressedByColdWave(resolvedState, durationOnly, { series: "Kanto", gym: 1, phase: "action" }), false);
  assert.equal(explicit.status, "active");
  assert.equal(explicit.expiresAtGym, 3);

  await saveGame(server.baseUrl, "cold-wave-runtime", resolvedState, 0);
  const reloaded = await loadGame(server.baseUrl, "cold-wave-runtime");
  const reloadedExplicit = reloaded.state.lingeringStatuses.find((entry) => entry.id === explicit.id);
  assert.equal(effects.statusSuppressedByColdWave(reloaded.state, reloadedExplicit, { series: "Kanto", gym: 1, phase: "action" }), true);
  const undoController = controllerFor(reloaded.state, { idPrefix: "cold-wave-undo" });
  assert.equal(undoController.undo(result.declared.activation.id).ok, true);
  assert.equal(effects.statusSuppressedByColdWave(undoController.getState(), explicit, { series: "Kanto", gym: 1, phase: "action" }), false);
  assert.equal(inventoryCount(undoController.getState(), "steevee", "Cold Wave"), 1);
});
