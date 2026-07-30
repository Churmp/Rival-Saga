"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const results = require("../token-result-summary.js");

function fixture() {
  return {
    players: [
      { id: "steevee", name: "Steevee" },
      { id: "test-4", name: "Test Player 4" },
      { id: "gold", name: "Gold" }
    ],
    pokemonRecords: [
      { id: "steevee-seedot-1", trainerId: "steevee", name: "Seedot", currentSpecies: "Seedot", rosterType: "Active", status: "Active" },
      { id: "steevee-seedot-2", trainerId: "steevee", name: "Seedot", currentSpecies: "Seedot", rosterType: "Active", status: "Active" },
      { id: "test-seedot", trainerId: "test-4", name: "Seedot", currentSpecies: "Seedot", rosterType: "Active", status: "Active" },
      { id: "gold-lucario", trainerId: "steevee", name: "Lucario", currentSpecies: "Lucario", rosterType: "Active", status: "Active" }
    ],
    tokenConsumptions: []
  };
}

function activity(overrides = {}) {
  return {
    id: "event-1",
    title: "Restrict",
    actorPlayerId: "test-4",
    targetPlayerId: "steevee",
    responses: [],
    payload: {
      tokenName: "Restrict",
      selectedTargetType: "species",
      selectedSpeciesId: "seedot",
      targetPokemonName: "Seedot",
      applicationScope: "globalSpecies"
    },
    ...overrides
  };
}

test("[TRS-001] Arena Trap result names the exact owner and duplicate roster slot without implying species scope", () => {
  const state = fixture();
  const event = activity({
    title: "Arena Trap",
    payload: {
      tokenName: "Arena Trap",
      selectedTargetType: "rosterInstance",
      selectedRosterInstanceId: "steevee-seedot-1",
      targetPokemonId: "steevee-seedot-1",
      targetPlayerId: "steevee",
      applicationScope: "rosterInstance"
    }
  });
  const summary = results.buildResultSummary({
    state,
    activity: event,
    finalOutcome: "resolved",
    resultData: {
      affectedRosterInstanceIds: ["steevee-seedot-1"],
      teamMutation: { rosterInstanceId: "steevee-seedot-1", forcedTeamMember: true, teamSlotLock: true },
      compensationStatus: "pendingChoice",
      customization: { required: true, status: "pending", choiceOwnerPlayerId: "steevee", tierStepsBelow: 2 },
      grantedCustomizations: []
    }
  });
  const announcement = results.announcementForResult(summary, state);
  assert.match(announcement.title, /Test Player 4's Arena Trap resolved/);
  assert.match(announcement.detail, /Steevee's Seedot \(Active roster slot 1\)/);
  assert.match(announcement.detail, /added to Steevee's Battle Phase team/);
  assert.doesNotMatch(announcement.detail, /all (?:matching )?Seedot/i);
  assert.equal(announcement.cards.find((card) => card.label === "Target").value, "Steevee's Seedot (Active roster slot 1)");
  assert.match(announcement.detail, /must choose one AAA-approved Ability or injectable move/);
  assert.equal(announcement.cards.find((card) => card.label === "Compensation").value, "Choice Required");
});

test("[TRS-001B] completed Arena Trap compensation names the exact granted customization", () => {
  const state = fixture();
  const event = activity({
    title: "Arena Trap",
    payload: {
      tokenName: "Arena Trap",
      selectedTargetType: "rosterInstance",
      selectedRosterInstanceId: "steevee-seedot-1",
      targetPokemonId: "steevee-seedot-1",
      targetPlayerId: "steevee",
      applicationScope: "rosterInstance"
    }
  });
  const summary = results.buildResultSummary({
    state,
    activity: event,
    finalOutcome: "resolved",
    resultData: {
      affectedRosterInstanceIds: ["steevee-seedot-1"],
      teamMutation: { rosterInstanceId: "steevee-seedot-1", forcedTeamMember: true, teamSlotLock: true },
      compensationStatus: "completed",
      grantedCustomizations: [{ kind: "ability", name: "Levitate", label: "Ability: Levitate", pokemonRecordId: "steevee-seedot-1" }]
    }
  });
  const announcement = results.announcementForResult(summary, state);
  assert.match(announcement.detail, /gained Ability: Levitate/);
  assert.equal(announcement.cards.find((card) => card.label === "Compensation").value, "Ability: Levitate");
});

test("[TRS-002] Immunity produces a complete negated causal summary and retains both consumptions", () => {
  const state = fixture();
  state.tokenConsumptions = [
    { id: "consume-restrict", tokenId: "restrict-1", tokenName: "Restrict", playerId: "test-4", linkedEventId: "event-1", status: "consumed" },
    { id: "consume-immunity", tokenId: "immunity-1", tokenName: "Immunity", playerId: "steevee", linkedEventId: "event-1", linkedResponseId: "response-1", status: "consumed" }
  ];
  const event = activity({
    responses: [{ id: "response-1", type: "token", tokenName: "Immunity", playerId: "steevee", outcome: "negates-parent" }]
  });
  const summary = results.buildResultSummary({
    state,
    activity: event,
    finalOutcome: "negated",
    resolvedByEffectId: "response-1",
    resultData: { preventedMutationTypes: ["restrict"] }
  });
  const announcement = results.announcementForResult(summary, state);
  assert.equal(summary.finalOutcome, "negated");
  assert.equal(summary.resolvedByEffectId, "response-1");
  assert.equal(summary.originalActorId, "test-4");
  assert.equal(summary.responseEffects[0].actorId, "steevee");
  assert.equal(announcement.title, "Immunity negated Restrict.");
  assert.match(announcement.detail, /Steevee used Immunity/);
  assert.match(announcement.detail, /Test Player 4's Restrict/);
  assert.match(announcement.detail, /No Seedot Restrict was created/);
  assert.match(announcement.detail, /Both Tokens remain consumed/);
  assert.doesNotMatch(announcement.title + announcement.detail, /cancel/i);
});

test("[TRS-003] administrative cancellation is distinct and reports refunds", () => {
  const state = fixture();
  state.tokenConsumptions = [
    { id: "consume-restrict", tokenId: "restrict-1", tokenName: "Restrict", playerId: "test-4", linkedEventId: "event-1", status: "refunded", refundStatus: "refunded" }
  ];
  const summary = results.buildResultSummary({ state, activity: activity(), finalOutcome: "canceledRefunded" });
  const announcement = results.announcementForResult(summary, state);
  assert.equal(summary.finalOutcome, "canceledRefunded");
  assert.match(announcement.title, /canceled and refunded/i);
  assert.match(announcement.detail, /returned to its owner/i);
});

test("[TRS-004] Substitute exemption identifies the protected instance and remaining species scope", () => {
  const state = fixture();
  const summary = results.buildResultSummary({
    state,
    activity: activity(),
    finalOutcome: "partiallyResolved",
    resultData: {
      affectedRosterInstanceIds: ["steevee-seedot-2", "test-seedot"],
      excludedRosterInstanceIds: ["steevee-seedot-1"],
      consumedSubstituteStatusIds: ["substitute-1"]
    }
  });
  const announcement = results.announcementForResult(summary, state);
  assert.match(announcement.detail, /Steevee's Substitute was consumed/);
  assert.match(announcement.detail, /protecting Steevee's Seedot \(Active roster slot 1\)/);
  assert.match(announcement.detail, /still resolved against all other Seedot/);
});

test("[TRS-005] structured result survives JSON reload and compact chain omits passes", () => {
  const state = fixture();
  const event = activity({
    responses: [
      { id: "pass-1", type: "pass", playerId: "steevee" },
      { id: "response-1", type: "token", tokenName: "Immunity", playerId: "steevee", outcome: "negates-parent" }
    ]
  });
  const before = results.buildResultSummary({ state, activity: event, finalOutcome: "negated", resolvedByEffectId: "response-1" });
  const after = results.normalizeResultSummary(JSON.parse(JSON.stringify(before)));
  assert.deepEqual(after, before);
  assert.equal(after.chainNodes.filter((node) => node.kind === "response").length, 1);
  assert.equal(after.chainNodes.some((node) => node.effectName === "pass"), false);
});

test("[TRS-006] Incinerate announces every exact destroyed inventory record", () => {
  const state = fixture();
  const event = activity({
    actorPlayerId: "steevee",
    targetPlayerId: "",
    payload: {
      tokenName: "Incinerate",
      selectedTargetType: "resource",
      targetText: "Leftovers",
      applicationScope: "allPlayers"
    }
  });
  const summary = results.buildResultSummary({
    state,
    activity: event,
    finalOutcome: "resolved",
    resultData: {
      operations: [
        {
          id: "destroy-gold",
          operationType: "destroyInventoryResource",
          sourceTokenName: "Incinerate",
          sourcePlayerId: "steevee",
          targetPlayerId: "gold",
          targetObjectId: "gold-leftovers",
          targetObjectName: "Leftovers",
          objectCategory: "Item",
          previousOwnerPlayerId: "gold",
          previousLocation: "inventory",
          newLocation: "destroyed"
        },
        {
          id: "destroy-test",
          operationType: "destroyInventoryResource",
          sourceTokenName: "Incinerate",
          sourcePlayerId: "steevee",
          targetPlayerId: "test-4",
          targetObjectId: "test-leftovers",
          targetObjectName: "Leftovers",
          objectCategory: "Item",
          previousOwnerPlayerId: "test-4",
          previousLocation: "inventory",
          newLocation: "destroyed"
        }
      ]
    }
  });
  const announcement = results.announcementForResult(summary, state);
  assert.equal(announcement.title, "Steevee's Incinerate resolved.");
  assert.match(announcement.detail, /Gold's Leftovers/);
  assert.match(announcement.detail, /Test Player 4's Leftovers/);
  assert.equal(summary.operations.length, 2);
});

test("[TRS-007] Steal announces the exact ownership transfer after resolution", () => {
  const state = fixture();
  const event = activity({
    actorPlayerId: "steevee",
    targetPlayerId: "gold",
    payload: {
      tokenName: "Steal",
      selectedTargetType: "rosterInstance",
      selectedRosterInstanceId: "gold-lucario",
      targetPokemonId: "gold-lucario",
      targetPokemonName: "Lucario",
      applicationScope: "rosterInstance"
    }
  });
  const summary = results.buildResultSummary({
    state,
    activity: event,
    finalOutcome: "resolved",
    resultData: {
      operations: [{
        id: "transfer-lucario",
        operationType: "transferPokemonOwnership",
        sourceTokenName: "Steal",
        sourcePlayerId: "steevee",
        targetPlayerId: "gold",
        targetObjectId: "gold-lucario",
        targetObjectName: "Lucario",
        objectCategory: "Pokemon",
        previousOwnerPlayerId: "gold",
        newOwnerPlayerId: "steevee",
        previousLocation: "Active",
        newLocation: "Active"
      }]
    }
  });
  const announcement = results.announcementForResult(summary, state);
  assert.equal(announcement.title, "Steevee stole Gold's Lucario.");
  assert.match(announcement.detail, /moved from Gold's Active to Steevee's Active/);
  assert.equal(summary.operations[0].previousOwnerPlayerId, "gold");
});

test("[TRS-008] Sticky Hold produces a specific blocked Steal result", () => {
  const state = fixture();
  const event = activity({
    actorPlayerId: "steevee",
    payload: { tokenName: "Steal", selectedTargetType: "rosterInstance", selectedRosterInstanceId: "gold-lucario" }
  });
  const summary = results.buildResultSummary({
    state,
    activity: event,
    finalOutcome: "blocked",
    resultData: { protectionResult: "blockedByStickyHold", operations: [] }
  });
  const announcement = results.announcementForResult(summary, state);
  assert.match(announcement.title, /Steal was blocked/);
  assert.match(announcement.detail, /Sticky Hold/);
});

test("[TRS-009] Wicked Blow names the exact owner, old species, replacement, and tier calculation", () => {
  const state = fixture();
  state.pokemonRecords.push({
    id: "gold-garchomp-2",
    trainerId: "gold",
    name: "Barbaracle",
    currentSpecies: "Barbaracle",
    rosterType: "Active",
    status: "Active"
  });
  const event = activity({
    actorPlayerId: "steevee",
    targetPlayerId: "gold",
    payload: {
      tokenName: "Wicked Blow",
      selectedTargetType: "rosterInstance",
      selectedRosterInstanceId: "gold-garchomp-2",
      targetPokemonId: "gold-garchomp-2",
      targetPokemonName: "Garchomp",
      applicationScope: "rosterInstance"
    }
  });
  const summary = results.buildResultSummary({
    state,
    activity: event,
    finalOutcome: "resolved",
    resultData: {
      operations: [{
        id: "reroll-gold-garchomp-2",
        operationType: "rerollPokemon",
        sourceTokenName: "Wicked Blow",
        sourcePlayerId: "steevee",
        targetPlayerId: "gold",
        targetObjectId: "gold-garchomp-2",
        targetObjectName: "Garchomp",
        replacementObjectName: "Barbaracle",
        objectCategory: "Pokemon",
        previousOwnerPlayerId: "gold",
        newOwnerPlayerId: "gold",
        previousLocation: "Active",
        newLocation: "Active",
        tierCalculation: {
          finalEvolutionTier: "Great Elite",
          replacementTier: "Poke",
          orderedStepsBelow: 3
        }
      }]
    }
  });
  const announcement = results.announcementForResult(summary, state);
  assert.equal(announcement.title, "Steevee used Wicked Blow on Gold's Garchomp.");
  assert.match(announcement.detail, /exact Garchomp roster instance became Barbaracle/);
  assert.match(announcement.detail, /Great Elite moved three ordered Battle Tier steps down to Poke/);
  assert.equal(announcement.cards.find((card) => card.label === "Original").value, "Garchomp");
  assert.equal(announcement.cards.find((card) => card.label === "Replacement").value, "Barbaracle");
  assert.equal(announcement.cards.find((card) => card.label === "Tier Roll").value, "Great Elite -> Poke");
  assert.equal(summary.operations[0].targetObjectId, "gold-garchomp-2");
});

test("[TRS-010] a standard Curse names its exact anchor and species-wide affected/protected records", () => {
  const state = fixture();
  const event = activity({
    title: "Flame Curse",
    actorPlayerId: "gold",
    targetPlayerId: "test-4",
    payload: {
      tokenName: "Flame Curse",
      selectedTargetType: "rosterInstance",
      selectedRosterInstanceId: "test-seedot",
      targetPokemonId: "test-seedot",
      targetPokemonName: "Seedot",
      applicationScope: "globalSpecies"
    }
  });
  const summary = results.buildResultSummary({
    state,
    activity: event,
    finalOutcome: "partiallyResolved",
    resultData: {
      createdStatusIds: ["curse-flame-seedot"],
      consideredRosterInstanceIds: ["steevee-seedot-1", "steevee-seedot-2", "test-seedot"],
      affectedRosterInstanceIds: ["steevee-seedot-1", "steevee-seedot-2"],
      excludedRosterInstanceIds: ["test-seedot"],
      consumedSubstituteStatusIds: ["substitute-test-seedot"],
      partiallyResolved: true
    },
    continuation: "Flame Orb is forced for two phase-anchored Gyms."
  });
  const announcement = results.announcementForResult(summary, state);
  assert.equal(summary.selectedRosterInstanceId, "test-seedot");
  assert.deepEqual(summary.affectedRosterInstanceIds, ["steevee-seedot-1", "steevee-seedot-2"]);
  assert.deepEqual(summary.excludedRosterInstanceIds, ["test-seedot"]);
  assert.deepEqual(summary.consideredRosterInstanceIds, ["steevee-seedot-1", "steevee-seedot-2", "test-seedot"]);
  assert.deepEqual(summary.consumedSubstituteStatusIds, ["substitute-test-seedot"]);
  assert.equal(summary.partiallyResolved, true);
  assert.match(announcement.title, /Gold's Flame Curse resolved across Seedot/);
  assert.match(announcement.detail, /Selected anchor: Test Player 4's Seedot/);
  assert.match(announcement.detail, /Considered: Steevee's Seedot \(Active roster slot 1\), Steevee's Seedot \(Active roster slot 2\), Test Player 4's Seedot/);
  assert.match(announcement.detail, /Affected: Steevee's Seedot \(Active roster slot 1\), Steevee's Seedot \(Active roster slot 2\)/);
  assert.match(announcement.detail, /Protected: Test Player 4's Seedot/);
  assert.match(announcement.detail, /1 Substitute was consumed/);
});
