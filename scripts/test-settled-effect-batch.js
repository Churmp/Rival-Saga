"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const effects = require("../token-control-effects.js");
const contract = require("../token-effect-contract.js");
const { sanitizeSharedGamePayloadForDelivery } = require("../server.js");

function makeIdFactory() {
  let next = 0;
  return (prefix) => `${prefix}-${++next}`;
}

function options(extra = {}) {
  return {
    series: "Hoenn",
    gym: 3,
    phase: "action",
    seriesOrder: ["Kanto", "Johto", "Hoenn", "Sinnoh"],
    now: "2026-07-29T16:00:00.000Z",
    makeId: makeIdFactory(),
    definitionFor: (value) => contract.definitionFor(value),
    keyForSpecies: effects.defaultSpeciesKey,
    ...extra
  };
}

function pokemon(id, trainerId, name, extra = {}) {
  return { id, trainerId, name, currentSpecies: name, status: "Active", rosterType: "Active", buffs: [], effectBuffs: [], ...extra };
}

function stateFixture() {
  return {
    series: "Hoenn",
    gym: 3,
    players: [
      { id: "gold", name: "Gold", balance: 2000, inventory: [] },
      { id: "red", name: "Red", balance: 2000, inventory: [] },
      { id: "blue", name: "Blue", balance: 2000, inventory: [] }
    ],
    pokemonRecords: [
      pokemon("gold-a", "gold", "Gardevoir"),
      pokemon("gold-b", "gold", "Gardevoir"),
      pokemon("red-a", "red", "Gardevoir"),
      pokemon("red-b", "red", "Gallade"),
      pokemon("blue-a", "blue", "Gallade")
    ],
    lingeringStatuses: [],
    effectOperations: [],
    copiedActivations: [],
    copiedTokenRelationships: [],
    privateEffectRecords: [],
    encounterCopyRecords: [],
    randomPokemonSessions: [],
    teambuilder: {},
    battleTeams: {}
  };
}

test("[SEB-001] Haze requires two names and applies species-wide with exact-instance protection", () => {
  const state = stateFixture();
  state.pokemonRecords.find((entry) => entry.id === "gold-a").effectBuffs.push({ id: "buff-1", status: "active", label: "Test Buff" });
  const sameName = effects.resolveHazeCurse(state, {
    sourceEffectId: "haze-bad",
    targetPokemonIds: ["gold-a", "red-a"]
  }, options());
  assert.equal(sameName.result, "systemFailure");

  const substitute = effects.resolveSubstitutePlacement(state, {
    sourceEffectId: "sub-1",
    sourceTokenId: "sub-token",
    targetPokemonId: "gold-b",
    requiredOwnerPlayerId: "gold"
  }, options());
  assert.equal(substitute.result, "resolved");
  const resolved = effects.resolveHazeCurse(state, {
    sourceEffectId: "haze-1",
    targetPokemonIds: ["gold-a", "red-b"]
  }, options());
  assert.equal(resolved.result, "resolved");
  assert.deepEqual(new Set(resolved.resultData.affectedRosterInstanceIds), new Set(["gold-a", "red-a", "red-b", "blue-a"]));
  assert.deepEqual(resolved.resultData.excludedRosterInstanceIds, ["gold-b"]);
  assert.deepEqual(resolved.resultData.consumedStatusIds, [substitute.status.id]);
  assert.deepEqual(state.pokemonRecords.find((entry) => entry.id === "gold-a").effectBuffs, [{ id: "buff-1", status: "active", label: "Test Buff" }]);
  assert.equal(resolved.statuses.every((status) => status.payload.negateBuffs === true && status.durationGyms === 2), true);
  const appSource = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
  assert.match(appSource, /data-haze-selected-species/);
  assert.match(appSource, /Species already selected/);
});

test("[SEB-002] Devolve overlays every matching Active instance and restores exact identities", () => {
  const state = stateFixture();
  const originalIds = state.pokemonRecords.map((entry) => entry.id);
  const invalid = effects.resolveDevolveCurse(state, { sourceEffectId: "devolve-bad", targetPokemonId: "gold-a" }, options({
    preEvolutionFor: () => ({ ok: false, reason: "Ambiguous parent" })
  }));
  assert.equal(invalid.result, "systemFailure");
  assert.equal(state.pokemonRecords.some((entry) => entry.temporarySpeciesOverlay), false);

  const resolved = effects.resolveDevolveCurse(state, { sourceEffectId: "devolve-1", targetPokemonId: "gold-a" }, options({
    preEvolutionFor: () => ({ ok: true, speciesName: "Kirlia", speciesId: "kirlia" })
  }));
  assert.equal(resolved.result, "resolved");
  assert.deepEqual(resolved.resultData.affectedRosterInstanceIds, ["gold-a", "gold-b", "red-a"]);
  assert.equal(state.pokemonRecords.filter((entry) => entry.name === "Gardevoir").every((entry) => entry.temporarySpeciesOverlay.speciesName === "Kirlia"), true);
  assert.deepEqual(state.pokemonRecords.map((entry) => entry.id), originalIds);
  resolved.status.status = "expired";
  assert.deepEqual(effects.restoreExpiredDevolveOverlays(state), ["gold-a", "gold-b", "red-a"]);
  assert.equal(state.pokemonRecords.some((entry) => entry.temporarySpeciesOverlay), false);
});

test("[SEB-003] Knock Off destroys exact Item/TM records and only final TM loss requests revision", () => {
  const state = stateFixture();
  const red = state.players.find((entry) => entry.id === "red");
  red.inventory.push(
    { id: "item-1", name: "Leftovers", type: "ITEM" },
    { id: "master-1", name: "Master Ball", type: "ITEM", tier: "Master Ball" },
    { id: "tm-1", name: "TM: Ice Punch", moveName: "Ice Punch", type: "TM" },
    { id: "tm-2", name: "TM: Ice Punch", moveName: "Ice Punch", type: "TM" }
  );
  const target = state.pokemonRecords.find((entry) => entry.id === "red-b");
  target.heldItemInventoryId = "item-1";
  target.heldItem = "Leftovers";
  const slot = {
    pokemonRecordId: target.id,
    lockedSlotId: "locked-red-b",
    itemInventoryItemId: "item-1",
    item: "Leftovers",
    moves: ["Ice Punch"],
    moveProvenance: [{ moveName: "Ice Punch", source: "tm", inventoryRecordId: "tm-1" }]
  };
  const item = effects.resolveKnockOffCurse(state, {
    sourceEffectId: "knock-item", targetPokemonId: target.id, choiceKind: "item", inventoryRecordId: "item-1", buildSlot: slot
  }, options());
  assert.equal(item.result, "resolved");
  assert.equal(red.inventory.some((entry) => entry.id === "item-1"), false);
  assert.equal(slot.itemInventoryItemId, "");
  const master = effects.resolveKnockOffCurse(state, {
    sourceEffectId: "knock-master", targetPokemonId: target.id, choiceKind: "item", inventoryRecordId: "master-1",
    buildSlot: { ...slot, itemInventoryItemId: "master-1" }
  }, options());
  assert.equal(master.result, "systemFailure");
  assert.equal(red.inventory.some((entry) => entry.id === "master-1"), true);

  const firstTm = effects.resolveKnockOffCurse(state, {
    sourceEffectId: "knock-tm-1", targetPokemonId: target.id, choiceKind: "tm", inventoryRecordId: "tm-1", moveName: "Ice Punch",
    buildSlot: slot, lockedTeamSlots: [slot]
  }, options());
  assert.equal(firstTm.result, "resolved");
  assert.equal(firstTm.resultData.remainingTmCopies, 1);
  assert.deepEqual(firstTm.resultData.impactedLockedSlots, []);
  slot.moveProvenance[0].inventoryRecordId = "tm-2";
  const finalTm = effects.resolveKnockOffCurse(state, {
    sourceEffectId: "knock-tm-2", targetPokemonId: target.id, choiceKind: "tm", inventoryRecordId: "tm-2", moveName: "Ice Punch",
    buildSlot: slot, lockedTeamSlots: [slot]
  }, options());
  assert.equal(finalTm.result, "resolved");
  assert.equal(finalTm.resultData.remainingTmCopies, 0);
  assert.deepEqual(finalTm.resultData.impactedLockedSlots, [{ pokemonRecordId: "red-b", lockedSlotId: "locked-red-b", moveName: "Ice Punch" }]);
  assert.deepEqual(slot.moves, ["Ice Punch"]);
  assert.equal(effects.undoAtomicEffectOperation(state, finalTm.operation.id), true);
  assert.equal(state.players.find((entry) => entry.id === "red").inventory.some((entry) => entry.id === "tm-2"), true);
});

test("[SEB-004] Honey creates an acquisition-ready identity without copying owner or transient result state", () => {
  const state = stateFixture();
  state.randomPokemonSessions.push({
    id: "encounter-result-1", sourceType: "encounter", status: "confirmed", series: "Hoenn", gym: 3,
    ownerPlayerId: "red", playerId: "red", resultOwnerPlayerId: "red", rosterPokemonId: "red-existing",
    encounterSessionId: "encounter-1", resultDisplayName: "Glaceon", tierId: "great-elite", level: 88,
    rerollHistory: ["Eevee"], modifiers: ["boost"], tokenId: "reroll-1", heldItemId: "item-x",
    resultMetadata: { form: "standard", ownerPlayerId: "red", note: "private bonus", intrinsicRolledProperties: { shiny: true } }
  });
  const copied = effects.resolveHoneyEncounterCopy(state, {
    sourceEffectId: "honey-1", sourceRandomPokemonSessionId: "encounter-result-1", ownerPlayerId: "gold"
  }, options());
  assert.equal(copied.result, "resolved");
  assert.notEqual(copied.randomSession.id, "encounter-result-1");
  assert.equal(copied.randomSession.ownerPlayerId, "gold");
  assert.equal(copied.randomSession.resultDisplayName, "Glaceon");
  assert.equal(copied.randomSession.tierId, "great-elite");
  assert.equal(copied.randomSession.level, 88);
  assert.equal(copied.randomSession.rerollable, false);
  assert.deepEqual(copied.randomSession.intrinsicRolledProperties, { shiny: true });
  ["rosterPokemonId", "rerollHistory", "modifiers", "tokenId", "heldItemId"].forEach((key) => assert.equal(Object.hasOwn(copied.randomSession, key), false));
  assert.deepEqual(copied.randomSession.resultMetadata, {
    speciesId: "", speciesName: "Glaceon", form: "standard", intrinsicRolledProperties: { shiny: true }
  });
  const duplicate = effects.resolveHoneyEncounterCopy(state, {
    sourceEffectId: "honey-1", sourceRandomPokemonSessionId: "encounter-result-1", ownerPlayerId: "gold"
  }, options());
  assert.equal(duplicate.duplicateResolution, true);
  assert.equal(state.randomPokemonSessions.length, 2);
});

test("[SEB-005] Follow Me creates idempotent real inventory copies without virtual recursion", () => {
  const state = stateFixture();
  const relationship = effects.createFollowMeCopyRelationship(state, {
    sourceEffectId: "follow-response-1", activateAfterEffectId: "parent-1", sourcePlayerId: "red", beneficiaryPlayerId: "gold"
  }, options());
  assert.equal(relationship.record.status, "pendingParentResolution");
  effects.settleTokenCopyRelationshipsForEffect(state, "parent-1", "resolved", options({ canActivateRelationship: () => true }));
  assert.equal(relationship.record.status, "active");
  const consumption = {
    id: "consumption-1", playerId: "red", tokenDefinitionId: "restrict-token", tokenId: "restrict-record-1",
    tokenName: "Restrict", linkedEventId: "restrict-event-1", inventoryItem: { id: "restrict-record-1", name: "Restrict", type: "TOKEN" }
  };
  const first = effects.copyConsumedTokenForRelationships(state, consumption, options());
  assert.equal(first.length, 1);
  assert.equal(state.players.find((entry) => entry.id === "gold").inventory[0].canonicalDefinitionId, "restrict-token");
  effects.copyConsumedTokenForRelationships(state, consumption, options());
  assert.equal(state.players.find((entry) => entry.id === "gold").inventory.length, 1);
  const virtual = effects.copyConsumedTokenForRelationships(state, { ...consumption, id: "virtual-1", isVirtualActivation: true }, options());
  assert.deepEqual(virtual, []);
});

test("[SEB-006] Ditto copy records are canonical, idempotent, non-activating, and undoable", () => {
  const state = stateFixture();
  const copied = effects.createCanonicalTokenInventoryCopy(state, {
    ownerPlayerId: "gold", definition: contract.definitionFor("immunity"), sourceEffectId: "ditto-consumption-1",
    sourceInventoryRecordId: "ditto-1", sourcePlayerId: "gold", copySourceType: "ditto"
  }, options());
  assert.equal(copied.result, "resolved");
  assert.equal(copied.record.canonicalDefinitionId, "immunity");
  assert.equal(copied.record.copyProvenance.copySourceType, "ditto");
  assert.equal(state.copiedActivations.length, 0);
  const duplicate = effects.createCanonicalTokenInventoryCopy(state, {
    ownerPlayerId: "gold", definition: contract.definitionFor("immunity"), sourceEffectId: "ditto-consumption-1",
    sourceInventoryRecordId: "ditto-1", sourcePlayerId: "gold", copySourceType: "ditto"
  }, options());
  assert.equal(duplicate.duplicateResolution, true);
  assert.equal(state.players[0].inventory.length, 1);
  assert.equal(effects.undoAtomicEffectOperation(state, copied.operation.id), true);
  assert.equal(state.players[0].inventory.length, 0);
});

test("[SEB-007] After You publishes an explicit per-Protection fail-closed matrix", () => {
  const matrix = contract.afterYouProtectionInteractionMatrix;
  const expected = contract.list.filter((definition) => definition.family === "Protection").map((definition) => definition.id);
  expected.forEach((id) => assert.ok(matrix[id], `${id} must be classified`));
  assert.deepEqual(Object.keys(matrix).sort(), expected.sort());
  assert.equal(matrix.immunity.supported, true);
  assert.equal(matrix.immunity.negatesOriginal, true);
  assert.equal(matrix.safeguard.supported, true);
  assert.equal(matrix.substitute.supported, false);
  assert.equal(matrix["seven-tools"].supported, false);
  assert.equal(matrix["after-you"].supported, false);
  assert.equal(contract.activationUsabilityFor("after-you").ok, true);
  const appSource = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
  assert.match(appSource, /function applyAfterYouCopiedActivation/);
  assert.match(appSource, /Copied Immunity negated the original/);
  assert.match(appSource, /isVirtualActivation: true/);
});

test("[SEB-008] Foresight remains blocked and shared delivery strips private records", () => {
  const state = stateFixture();
  state.pokemonRecords = [
    pokemon("foresight-1", "gold", "Abra"),
    pokemon("foresight-2", "gold", "Bulbasaur"),
    pokemon("foresight-3", "red", "Charmander"),
    pokemon("foresight-4", "red", "Squirtle"),
    pokemon("foresight-5", "blue", "Pikachu"),
    pokemon("foresight-6", "blue", "Eevee")
  ];
  const marked = effects.resolveForesightCurse(state, {
    sourceEffectId: "foresight-1", actorPlayerId: "gold",
    targetPokemonIds: state.pokemonRecords.map((entry) => entry.id)
  }, options());
  assert.equal(marked.result, "resolved");
  assert.equal(marked.record.authorizedPlayerId, "gold");
  assert.deepEqual(marked.record.privatePayload.matchingMoveSets, []);
  assert.equal(JSON.stringify(marked.resultData).includes("moves"), false);
  const shared = sanitizeSharedGamePayloadForDelivery({ state });
  assert.equal(Object.hasOwn(shared.state, "privateEffectRecords"), false);
  assert.equal(contract.activationUsabilityFor("foresight-curse").ok, false);
  const serverSource = fs.readFileSync(path.join(__dirname, "..", "server.js"), "utf8");
  assert.match(serverSource, /sharedPayloadKey\(key\) === "privateeffectrecords"/);
  assert.match(serverSource, /sanitizeSharedGamePayloadForDelivery/);
});
