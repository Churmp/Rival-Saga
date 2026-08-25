"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const routeEngine = require("../implementation/route-encounter-engine.js");
const routeCatalog = require("../implementation/route-pokemon-catalog.js");
const routeLifecycle = require("../implementation/route-series-lifecycle.js");
const routeAudit = require("../implementation/route-generation-audit.js");
const routeActions = require("../implementation/route-action-resolver.js");
const regionalVariance = require("../implementation/route-regional-variance.js");

const tierIds = [
  "lc",
  "lc-elite",
  "safari",
  "safari-elite",
  "poke",
  "poke-elite",
  "great",
  "great-elite",
  "ultra",
  "ultra-elite",
  "master",
  "master-elite"
];

const types = ["Fire", "Water", "Grass", "Electric", "Fighting", "Psychic"];
const fixtureRegions = regionalVariance.SERIES_REGIONS;

function fixtureCatalog() {
  return tierIds.flatMap((tierId, tierIndex) => (
    Array.from({ length: 36 }, (_, index) => ({
      speciesId: `${tierId}-species-${index + 1}`,
      displayName: `${tierId} Species ${index + 1}`,
      balanceTier: tierId,
      balanceTierLabel: tierId.toUpperCase(),
      balanceTierOrder: tierIndex + 1,
      primaryType: types[index % types.length],
      types: [types[index % types.length], types[(index + 1) % types.length]],
      regionalIdentity: {
        debutGeneration: (index % fixtureRegions.length) + 1,
        debutRegion: fixtureRegions[index % fixtureRegions.length],
        regionalOrigin: fixtureRegions[index % fixtureRegions.length],
        identitySource: "fixture",
        unresolvedRegionalIdentity: ""
      }
    }))
  ));
}

function createState(seed = "route-test-seed") {
  return routeEngine.createV2RouteSeriesState({
    seriesId: "series-route-test",
    seed,
    pokemonCatalog: fixtureCatalog()
  });
}

function createGameStateWithInitializedRoutes(options = {}) {
  const base = {
    players: [
      { id: "player-1", name: "Player 1", pokemonIds: [] },
      { id: "player-2", name: "Player 2", pokemonIds: [] }
    ],
    pokemonRecords: []
  };
  const initialized = routeLifecycle.initializeV2Series(base, {
    seriesId: options.seriesId || "series-action-test",
    seed: options.seed || "action-test-seed"
  });
  let withBudget = routeActions.setV2PlayerActionBudget(initialized.state, {
    seriesId: options.seriesId || "series-action-test",
    playerId: "player-1",
    available: options.playerOneActions ?? 2
  }).state;
  withBudget = routeActions.setV2PlayerActionBudget(withBudget, {
    seriesId: options.seriesId || "series-action-test",
    playerId: "player-2",
    available: options.playerTwoActions ?? 0
  }).state;
  return withBudget;
}

function v2ActionPhase(state, seriesId = "series-action-test") {
  return state.v2.actionPhaseBySeriesId[seriesId];
}

function v2RouteState(state, seriesId = "series-action-test") {
  return state.v2.routeEncounterBySeriesId[seriesId];
}

function tierCountsFor(route) {
  return route.residents.filter((resident) => !resident.premium).reduce((counts, resident) => {
    counts[resident.battleTier.id] = Number(counts[resident.battleTier.id] || 0) + 1;
    return counts;
  }, {});
}

function aggregateRouteTierCounts(routeNumber, count = 160) {
  const totals = {};
  for (let index = 0; index < count; index += 1) {
    const state = createState(`aggregate-${routeNumber}-${index}`);
    const route = state.routes.find((entry) => entry.routeNumber === routeNumber);
    const counts = tierCountsFor(route);
    Object.entries(counts).forEach(([tierId, value]) => {
      totals[tierId] = Number(totals[tierId] || 0) + value;
    });
  }
  return totals;
}

function ratio(counts, tierId) {
  const total = Object.values(counts).reduce((sum, value) => sum + value, 0);
  return Number(counts[tierId] || 0) / total;
}

test("series start generates nine stable hidden route populations", () => {
  const first = createState("stable-seed");
  const second = createState("stable-seed");

  assert.equal(first.actionPhaseVersion, routeEngine.ACTION_PHASE_VERSION_V2);
  assert.equal(first.schemaVersion, routeEngine.ROUTE_ENGINE_SCHEMA_VERSION);
  assert.equal(first.routes.length, 9);
  assert.deepEqual(first.routes, second.routes);

  for (const route of first.routes) {
    const normalResidents = route.residents.filter((resident) => !resident.premium);
    const premiumResidents = route.residents.filter((resident) => resident.premium);
    assert.ok(normalResidents.length >= routeEngine.DEFAULT_ROUTE_POPULATION_MIN);
    assert.ok(normalResidents.length <= routeEngine.DEFAULT_ROUTE_POPULATION_MAX);
    assert.equal(premiumResidents.length, routeEngine.DEFAULT_ROUTE_PREMIUM_RESIDENT_COUNT);
    assert.deepEqual(route.premiumResidentIds, premiumResidents.map((resident) => resident.residentId));
    assert.equal(route.publicDiscoveryResidentIds.length, 0);
    assert.deepEqual(route.privateKnowledgeByPlayerId, {});
    assert.equal(route.pendingEncounterOpportunities.length, 0);
    assert.equal(route.encounterResults.length, 0);
    assert.ok(route.residents.every((resident) => resident.battleTier?.id));
    assert.ok(route.residents.every((resident) => resident.source?.kind));
    assert.equal(route.generation.populationSize, normalResidents.length);
    assert.equal(route.generation.normalPopulationSize, normalResidents.length);
    assert.equal(route.generation.premiumResidentCount, premiumResidents.length);
  }
});

test("fresh deterministic Series can generate different persisted Route sizes", () => {
  const seeds = ["variable-size-a", "variable-size-b", "variable-size-c", "variable-size-d", "variable-size-e"];
  const routeSizesBySeed = seeds.map((seed) => createState(seed).routes.map((route) => route.residents.length));
  const uniqueSizes = new Set(routeSizesBySeed.flat());

  assert.ok(uniqueSizes.size > 1, "deterministic fixtures should demonstrate variable Route sizes");
  for (const sizes of routeSizesBySeed) {
    assert.equal(sizes.length, 9);
    sizes.forEach((size) => {
      assert.ok(size >= routeEngine.DEFAULT_ROUTE_POPULATION_MIN + routeEngine.DEFAULT_ROUTE_PREMIUM_RESIDENT_COUNT);
      assert.ok(size <= routeEngine.DEFAULT_ROUTE_POPULATION_MAX + routeEngine.DEFAULT_ROUTE_PREMIUM_RESIDENT_COUNT);
    });
  }
  assert.deepEqual(createState(seeds[0]).routes.map((route) => route.residents.length), routeSizesBySeed[0]);
});

test("Premium Residents are permanent fixed slots from premium tiers with reduced encounter weight", () => {
  const state = createState("premium-resident-contract");
  const premiumTierIds = new Set(routeEngine.PREMIUM_ROUTE_TIER_IDS);

  state.routes.forEach((route) => {
    const premiumResidents = route.residents.filter((resident) => resident.premium);
    assert.equal(premiumResidents.length, routeEngine.DEFAULT_ROUTE_PREMIUM_RESIDENT_COUNT);
    assert.deepEqual(route.premiumResidentIds, premiumResidents.map((resident) => resident.residentId));
    assert.equal(premiumResidents.every((resident) => resident.permanent === true), true);
    assert.equal(premiumResidents.every((resident) => resident.slotKind === "premium"), true);
    assert.equal(premiumResidents.every((resident) => premiumTierIds.has(resident.battleTier.id)), true);
    assert.equal(premiumResidents.every((resident) => resident.encounterWeight === routeEngine.DEFAULT_ROUTE_PREMIUM_ENCOUNTER_WEIGHT), true);
    assert.equal(premiumResidents.every((resident) => resident.generationProvenance?.regionalVariance?.regionalClass === "not-applied"), true);
    assert.equal(route.generation.regionalVariance.appliesToPremiumResidents, false);
  });

  const reloaded = routeLifecycle.serializeAndReloadV2RouteState(state);
  assert.deepEqual(
    reloaded.routes.map((route) => route.premiumResidentIds),
    state.routes.map((route) => route.premiumResidentIds)
  );
});

test("Regional Variance uses recovered featured plus universal weighted blend", () => {
  assert.deepEqual(routeEngine.SERIES_REGIONS, regionalVariance.SERIES_REGIONS);
  assert.equal(routeEngine.REGIONAL_VARIANCE_RULES.status, "active");
  assert.equal(routeEngine.REGIONAL_VARIANCE_RULES.universalPoolShare, 0.5);
  assert.equal(routeEngine.REGIONAL_VARIANCE_RULES.featuredPoolShare, 0.5);
  assert.equal(routeEngine.REGIONAL_VARIANCE_RULES.appliesToPremiumResidents, false);
  assert.equal(routeEngine.REGIONAL_VARIANCE_RULES.repeatSuppressionMultiplier, 0.25);

  const candidates = [
    { regionalIdentity: { regionalOrigin: "Kanto" } },
    { regionalIdentity: { regionalOrigin: "Unova" } },
    { regionalIdentity: { regionalOrigin: "Johto" } },
    { regionalIdentity: { regionalOrigin: "Hoenn" } }
  ];
  const context = regionalVariance.regionalVarianceContext({ seriesRegion: "Kanto", candidates });
  const featured = regionalVariance.getRegionalVarianceWeight({
    seriesRegion: "Kanto",
    candidate: candidates[0],
    context
  });
  const other = regionalVariance.getRegionalVarianceWeight({
    seriesRegion: "Kanto",
    candidate: candidates[1],
    context
  });

  assert.equal(featured.weight, 2.5);
  assert.equal(other.weight, 0.5);
  assert.equal(featured.regionalClass, "featured-region");
  assert.equal(featured.configuredClass, "featured-region");
  assert.equal(other.configuredClass, "other-region");
  assert.equal(featured.dedicatedFeaturedWeightShare, 0.5);
  assert.equal(regionalVariance.repeatSuppressionWeight(0), 1);
  assert.equal(regionalVariance.repeatSuppressionWeight(1), 0.25);
  assert.equal(regionalVariance.repeatSuppressionWeight(2), 0.0625);
});

test("Regional Variance metadata persists on generated normal residents without changing tier gates", () => {
  const state = routeEngine.createV2RouteSeriesState({
    seriesId: "Kanto",
    seed: "regional-provenance",
    pokemonCatalog: fixtureCatalog()
  });

  state.routes.forEach((route) => {
    assert.equal(route.generation.seriesRegion, "Kanto");
    assert.equal(route.generation.regionalVariance.status, "active");
    route.residents.filter((resident) => !resident.premium).forEach((resident) => {
      assert.ok(resident.regionalIdentity?.regionalOrigin);
      assert.equal(resident.generationProvenance.regionalVariance.rulesStatus, "active");
      assert.notEqual(resident.generationProvenance.regionalVariance.regionalClass, "unresolved-neutral");
      assert.equal(Number.isFinite(resident.generationProvenance.repeatPenalty), true);
      assert.ok(route.generation.tierDistribution.some((tier) => tier.tierId === resident.battleTier.id));
    });
  });

  const reloaded = routeLifecycle.serializeAndReloadV2RouteState(state);
  assert.deepEqual(reloaded.routes, state.routes);
});

test("Route 1 uses the approved LC / LC Elite / Safari weighted table", () => {
  const allowed = new Set(["lc", "lc-elite", "safari"]);
  const state = createState("route-1-allowed-tiers");
  const route = state.routes.find((entry) => entry.routeNumber === 1);
  assert.ok(route.residents.filter((resident) => !resident.premium).every((resident) => allowed.has(resident.battleTier.id)));
  assert.equal(route.routeQuality, undefined);
  assert.deepEqual(route.generation.tierDistribution, routeEngine.APPROVED_ROUTE_TIER_DISTRIBUTIONS[1]);

  const counts = aggregateRouteTierCounts(1);
  assert.ok(ratio(counts, "lc") > 0.68 && ratio(counts, "lc") < 0.82);
  assert.ok(ratio(counts, "lc-elite") > 0.14 && ratio(counts, "lc-elite") < 0.27);
  assert.ok(ratio(counts, "safari") > 0.025 && ratio(counts, "safari") < 0.08);
});

test("Route 2 uses the approved LC / LC Elite / Safari weighted table", () => {
  const allowed = new Set(["lc", "lc-elite", "safari"]);
  const state = createState("route-2-allowed-tiers");
  const route = state.routes.find((entry) => entry.routeNumber === 2);
  assert.ok(route.residents.filter((resident) => !resident.premium).every((resident) => allowed.has(resident.battleTier.id)));
  assert.equal(route.routeQuality, undefined);
  assert.deepEqual(route.generation.tierDistribution, routeEngine.APPROVED_ROUTE_TIER_DISTRIBUTIONS[2]);

  const counts = aggregateRouteTierCounts(2);
  assert.ok(ratio(counts, "lc") > 0.18 && ratio(counts, "lc") < 0.33);
  assert.ok(ratio(counts, "lc-elite") > 0.52 && ratio(counts, "lc-elite") < 0.68);
  assert.ok(ratio(counts, "safari") > 0.10 && ratio(counts, "safari") < 0.20);
});

test("Routes 3-9 receive deterministic hidden Route Quality with a fixed seed", () => {
  const first = createState("quality-fixed-seed");
  const second = createState("quality-fixed-seed");
  const firstQualities = first.routes.slice(2).map((route) => route.routeQuality);
  const secondQualities = second.routes.slice(2).map((route) => route.routeQuality);

  assert.deepEqual(firstQualities, secondQualities);
  assert.equal(first.routes[0].routeQuality, undefined);
  assert.equal(first.routes[1].routeQuality, undefined);
  assert.ok(firstQualities.every((quality) => quality && Number.isInteger(quality.shift)));
});

test("Route Quality maps to approved shifts and clamps to Route 3 / Route 9 curves", () => {
  const expected = { poor: -2, weak: -1, normal: 0, strong: 1, loaded: 2 };
  Object.entries(expected).forEach(([qualityId, shift]) => {
    const quality = routeEngine.resolveRouteQuality(6, { routeQualityByRoute: { 6: qualityId } });
    assert.equal(quality.shift, shift);
    assert.equal(quality.baseCurveRoute, 6);
    assert.equal(quality.appliedCurveRoute, 6 + shift);
  });

  assert.equal(routeEngine.resolveRouteQuality(3, { routeQualityByRoute: { 3: "poor" } }).appliedCurveRoute, 3);
  assert.equal(routeEngine.resolveRouteQuality(3, { routeQualityByRoute: { 3: "weak" } }).appliedCurveRoute, 3);
  assert.equal(routeEngine.resolveRouteQuality(8, { routeQualityByRoute: { 8: "loaded" } }).appliedCurveRoute, 9);
  assert.equal(routeEngine.resolveRouteQuality(9, { routeQualityByRoute: { 9: "loaded" } }).appliedCurveRoute, 9);
});

test("weighted generation uses the effective shifted curve", () => {
  const state = routeEngine.createV2RouteSeriesState({
    seriesId: "series-route-test",
    seed: "forced-quality-curve",
    pokemonCatalog: fixtureCatalog(),
    routeQualityByRoute: { 6: "weak", 8: "loaded" }
  });
  const routeSix = state.routes.find((route) => route.routeNumber === 6);
  const routeEight = state.routes.find((route) => route.routeNumber === 8);

  assert.equal(routeSix.routeQuality.appliedCurveRoute, 5);
  assert.equal(routeSix.generation.distributionRoute, 5);
  assert.deepEqual(routeSix.generation.tierDistribution, routeEngine.APPROVED_ROUTE_TIER_DISTRIBUTIONS[5]);
  assert.equal(routeEight.routeQuality.appliedCurveRoute, 9);
  assert.equal(routeEight.generation.distributionRoute, 9);
  assert.deepEqual(routeEight.generation.tierDistribution, routeEngine.APPROVED_ROUTE_TIER_DISTRIBUTIONS[9]);
});

test("no exact duplicate species exists inside a generated Route", () => {
  const state = createState("no-route-duplicates");
  state.routes.forEach((route) => {
    const speciesIds = route.residents.map((resident) => resident.speciesId);
    assert.equal(new Set(speciesIds).size, speciesIds.length, `${route.routeId} should not contain duplicate species.`);
  });
});

test("normal route action can scout ahead and publicly discovers rolled permanent resident", () => {
  const initial = createState();
  const { state: withOpportunity, opportunity } = routeEngine.createRouteEncounterOpportunity(initial, {
    playerId: "player-1",
    routeNumber: 9
  });
  assert.equal(opportunity.routeId, "route-9");
  assert.equal(opportunity.encounterCount, 1);
  assert.equal(withOpportunity.routes.find((route) => route.routeId === "route-9").pendingEncounterOpportunities.length, 1);

  const chosenResident = withOpportunity.routes.find((route) => route.routeId === "route-9").residents[0];
  const { state: resolved, result } = routeEngine.drawRouteEncounter(withOpportunity, {
    opportunityId: opportunity.opportunityId,
    residentId: chosenResident.residentId
  });
  const routeNine = resolved.routes.find((route) => route.routeId === "route-9");

  assert.equal(result.playerId, "player-1");
  assert.equal(result.routeId, "route-9");
  assert.equal(result.currentRevision, 1);
  assert.equal(result.revisions[0].residentId, chosenResident.residentId);
  assert.ok(routeNine.publicDiscoveryResidentIds.includes(chosenResident.residentId));
  assert.equal(routeNine.residents.length, withOpportunity.routes.find((route) => route.routeId === "route-9").residents.length, "route population stays stable after encounter");
  assert.equal(routeNine.pendingEncounterOpportunities.filter((entry) => entry.status === "pending").length, 0);
});

test("private reveal and table reveal remain separate knowledge states", () => {
  const initial = createState();
  const route = initial.routes[2];
  const resident = route.residents[3];

  const privatelyRevealed = routeEngine.revealResidentToPlayer(initial, route.routeId, resident.residentId, "player-1");
  const privateRoute = privatelyRevealed.routes.find((entry) => entry.routeId === route.routeId);
  assert.deepEqual(privateRoute.privateKnowledgeByPlayerId["player-1"], [resident.residentId]);
  assert.deepEqual(privateRoute.publicDiscoveryResidentIds, []);

  const publiclyRevealed = routeEngine.revealResidentToTable(privatelyRevealed, route.routeId, resident.residentId);
  const publicRoute = publiclyRevealed.routes.find((entry) => entry.routeId === route.routeId);
  assert.deepEqual(publicRoute.privateKnowledgeByPlayerId["player-1"], [resident.residentId]);
  assert.deepEqual(publicRoute.publicDiscoveryResidentIds, [resident.residentId]);
});

test("Premium Residents can be revealed and selected by Master Ball when known", () => {
  const initial = createState("premium-master-ball");
  const route = initial.routes[8];
  const premiumResident = route.residents.find((resident) => resident.premium);
  assert.ok(premiumResident, "Route 9 should have a premium resident");

  const privatelyRevealed = routeEngine.revealResidentToPlayer(initial, route.routeId, premiumResident.residentId, "player-1");
  const { state: withOpportunity, opportunity } = routeEngine.createRouteEncounterOpportunity(privatelyRevealed, {
    playerId: "player-1",
    routeNumber: 9
  });
  const { state: resolved, result } = routeEngine.createMasterBallRouteResult(withOpportunity, {
    playerId: "player-1",
    routeNumber: 9,
    opportunityId: opportunity.opportunityId,
    residentId: premiumResident.residentId
  });
  const resolvedRoute = resolved.routes.find((entry) => entry.routeId === route.routeId);

  assert.equal(result.revisions[0].residentId, premiumResident.residentId);
  assert.equal(result.revisions[0].permanentResident, true);
  assert.equal(result.revisions[0].battleTier.id, premiumResident.battleTier.id);
  assert.equal(resolvedRoute.publicDiscoveryResidentIds.includes(premiumResident.residentId), false);
  assert.ok(resolvedRoute.privateKnowledgeByPlayerId["player-1"].includes(premiumResident.residentId));
});

test("reroll preserves result identity, creates revision history, and stays on the same route", () => {
  const initial = createState("reroll-seed");
  const { state: withOpportunity, opportunity } = routeEngine.createRouteEncounterOpportunity(initial, {
    playerId: "player-1",
    routeNumber: 4
  });
  const route = withOpportunity.routes.find((entry) => entry.routeId === "route-4");
  const firstResident = route.residents[0];
  const secondResident = route.residents[1];
  const { state: drawn, result } = routeEngine.drawRouteEncounter(withOpportunity, {
    opportunityId: opportunity.opportunityId,
    residentId: firstResident.residentId
  });

  const rerolled = routeEngine.rerollRouteEncounterResult(drawn, {
    resultId: result.resultId,
    residentId: secondResident.residentId,
    reason: "reroll-token"
  });
  const updated = rerolled.result;
  const updatedRoute = rerolled.state.routes.find((entry) => entry.routeId === "route-4");

  assert.equal(updated.resultId, result.resultId);
  assert.equal(updated.routeId, "route-4");
  assert.equal(updated.currentRevision, 2);
  assert.equal(updated.revisions.length, 2);
  assert.equal(updated.revisions[0].residentId, firstResident.residentId);
  assert.equal(updated.revisions[1].residentId, secondResident.residentId);
  assert.ok(updatedRoute.publicDiscoveryResidentIds.includes(firstResident.residentId));
  assert.ok(updatedRoute.publicDiscoveryResidentIds.includes(secondResident.residentId));
});

test("personal duplicate free reroll checks only the acting player's own collection", () => {
  const initial = createState("duplicate-seed");
  const { state: withOpportunity, opportunity } = routeEngine.createRouteEncounterOpportunity(initial, {
    playerId: "player-1",
    routeNumber: 1
  });
  const route = withOpportunity.routes.find((entry) => entry.routeId === "route-1");
  const duplicateResident = route.residents[0];
  const replacementResident = route.residents[2];
  const { state: drawn, result } = routeEngine.drawRouteEncounter(withOpportunity, {
    opportunityId: opportunity.opportunityId,
    residentId: duplicateResident.residentId
  });

  assert.equal(routeEngine.isPersonalDuplicateEncounterResult(drawn, {
    resultId: result.resultId,
    ownedPokemon: [{ speciesId: duplicateResident.speciesId }]
  }), true);
  assert.equal(routeEngine.isPersonalDuplicateEncounterResult(drawn, {
    resultId: result.resultId,
    ownedPokemon: [{ name: duplicateResident.displayName }]
  }), true);
  assert.equal(routeEngine.isPersonalDuplicateEncounterResult(drawn, {
    resultId: result.resultId,
    ownedPokemon: [{ speciesId: replacementResident.speciesId }]
  }), false);
  assert.throws(() => routeEngine.rerollRouteEncounterResult(drawn, {
    resultId: result.resultId,
    requireDuplicate: true,
    ownedPokemon: [{ speciesId: replacementResident.speciesId }]
  }), /not a duplicate/);

  const { result: rerolled } = routeEngine.rerollRouteEncounterResult(drawn, {
    resultId: result.resultId,
    requireDuplicate: true,
    ownedPokemon: [{ speciesId: duplicateResident.speciesId }],
    residentId: replacementResident.residentId
  });
  assert.equal(rerolled.currentRevision, 2);
});

test("player-specific Duplicate OFF filters only that player's standard Route encounter pool", () => {
  const initial = createState("duplicate-filter");
  const route = initial.routes.find((entry) => entry.routeNumber === 1);
  const disabledResident = route.residents.find((resident) => !resident.premium);
  const otherResident = route.residents.find((resident) => resident.residentId !== disabledResident.residentId && !resident.premium);
  const owned = [{ speciesId: disabledResident.speciesId, displayName: disabledResident.displayName, status: "Active", rosterType: "Active" }];

  assert.equal(routeEngine.routeDuplicatePreference(initial, {
    playerId: "player-1",
    routeNumber: 1,
    residentId: disabledResident.residentId
  }).enabled, true);
  assert.deepEqual(routeEngine.getRouteDuplicatePreferenceControls(initial, {
    playerId: "player-1",
    routeNumber: 1,
    ownedPokemon: owned
  }), []);
  assert.throws(() => routeEngine.setRouteDuplicatePreference(initial, {
    playerId: "player-1",
    routeNumber: 1,
    residentId: disabledResident.residentId,
    enabled: false,
    ownedPokemon: owned
  }), /know/);

  const discovered = routeEngine.revealResidentToTable(initial, 1, disabledResident.residentId);
  const controls = routeEngine.getRouteDuplicatePreferenceControls(discovered, {
    playerId: "player-1",
    routeNumber: 1,
    ownedPokemon: owned
  });
  assert.equal(controls.length, 1);
  assert.equal(controls[0].duplicateEnabled, true);
  assert.deepEqual(routeEngine.getRouteDuplicatePreferenceControls(discovered, {
    playerId: "player-2",
    routeNumber: 1,
    ownedPokemon: []
  }), []);
  assert.throws(() => routeEngine.setRouteDuplicatePreference(discovered, {
    playerId: "player-1",
    routeNumber: 1,
    residentId: disabledResident.residentId,
    enabled: false,
    ownedPokemon: []
  }), /own/);
  assert.throws(() => routeEngine.setRouteDuplicatePreference(discovered, {
    playerId: "player-1",
    routeNumber: 1,
    residentId: disabledResident.residentId,
    enabled: false,
    ownedPokemon: [{ speciesId: disabledResident.speciesId, status: "Removed", rosterType: "Removed" }]
  }), /own/);

  const routeSnapshot = JSON.stringify(discovered.routes);
  const publicSnapshot = JSON.stringify(discovered.routes.find((entry) => entry.routeNumber === 1).publicDiscoveryResidentIds);
  const disabled = routeEngine.setRouteDuplicatePreference(discovered, {
    playerId: "player-1",
    routeNumber: 1,
    residentId: disabledResident.residentId,
    enabled: false,
    ownedPokemon: owned
  }).state;
  assert.equal(routeEngine.routeDuplicatePreference(disabled, {
    playerId: "player-1",
    routeNumber: 1,
    residentId: disabledResident.residentId
  }).enabled, false);
  assert.equal(JSON.stringify(disabled.routes), routeSnapshot);
  assert.equal(JSON.stringify(disabled.routes.find((entry) => entry.routeNumber === 1).publicDiscoveryResidentIds), publicSnapshot);

  const playerOneEligible = routeEngine.getEligibleRouteResidents(disabled, {
    playerId: "player-1",
    routeNumber: 1,
    ownedPokemon: owned
  });
  const playerTwoEligible = routeEngine.getEligibleRouteResidents(disabled, {
    playerId: "player-2",
    routeNumber: 1,
    ownedPokemon: owned
  });
  assert.equal(playerOneEligible.some((resident) => resident.residentId === disabledResident.residentId), false);
  assert.equal(playerTwoEligible.some((resident) => resident.residentId === disabledResident.residentId), true);

  const withOpportunity = routeEngine.createRouteEncounterOpportunity(disabled, {
    playerId: "player-1",
    routeNumber: 1
  });
  assert.throws(() => routeEngine.drawRouteEncounter(withOpportunity.state, {
    opportunityId: withOpportunity.opportunity.opportunityId,
    residentId: disabledResident.residentId,
    ownedPokemon: owned
  }), /not eligible/);
  const drawn = routeEngine.drawRouteEncounter(withOpportunity.state, {
    opportunityId: withOpportunity.opportunity.opportunityId,
    residentId: otherResident.residentId,
    ownedPokemon: owned
  });
  assert.throws(() => routeEngine.rerollRouteEncounterResult(drawn.state, {
    resultId: drawn.result.resultId,
    residentId: disabledResident.residentId,
    ownedPokemon: owned
  }), /not eligible/);

  const reenabled = routeEngine.setRouteDuplicatePreference(disabled, {
    playerId: "player-1",
    routeNumber: 1,
    residentId: disabledResident.residentId,
    enabled: true
  }).state;
  assert.equal(routeEngine.getEligibleRouteResidents(reenabled, {
    playerId: "player-1",
    routeNumber: 1,
    ownedPokemon: owned
  }).some((resident) => resident.residentId === disabledResident.residentId), true);
  const reloaded = routeLifecycle.serializeAndReloadV2RouteState(disabled);
  assert.deepEqual(reloaded.duplicatePreferencesByPlayerId, disabled.duplicatePreferencesByPlayerId);
});

test("Duplicate OFF does not block explicit known-resident targeting or mutate Premium/temporary mechanics", () => {
  const initial = createState("duplicate-explicit");
  const route = initial.routes.find((entry) => entry.routeNumber === 9);
  const ordinaryResident = route.residents.find((resident) => !resident.premium);
  const premiumResident = route.residents.find((resident) => resident.premium);
  const ordinaryOwned = [{ speciesId: ordinaryResident.speciesId, displayName: ordinaryResident.displayName, status: "Legacy", rosterType: "Legacy" }];
  const premiumOwned = [{ speciesId: premiumResident.speciesId, displayName: premiumResident.displayName, status: "Active", rosterType: "Active" }];
  const premiumWeightBefore = premiumResident.encounterWeight;
  const premiumIdsBefore = route.premiumResidentIds.slice();
  const normalEligible = routeEngine.getEligibleRouteResidents(initial, { routeNumber: 9 });
  const premiumShareBefore = normalEligible
    .filter((resident) => resident.premium)
    .reduce((sum, resident) => sum + resident.encounterWeight, 0)
    / normalEligible.reduce((sum, resident) => sum + resident.encounterWeight, 0);

  let state = routeEngine.revealResidentToTable(initial, 9, ordinaryResident.residentId);
  state = routeEngine.revealResidentToPlayer(state, 9, premiumResident.residentId, "player-1");
  assert.equal(routeEngine.getRouteDuplicatePreferenceControls(state, {
    playerId: "player-1",
    routeNumber: 9,
    ownedPokemon: ordinaryOwned
  }).some((control) => control.residentId === ordinaryResident.residentId), true);
  assert.equal(routeEngine.getRouteDuplicatePreferenceControls(state, {
    playerId: "player-1",
    routeNumber: 9,
    ownedPokemon: premiumOwned
  }).some((control) => control.residentId === premiumResident.residentId && control.premium), true);

  state = routeEngine.setRouteDuplicatePreference(state, {
    playerId: "player-1",
    routeNumber: 9,
    residentId: ordinaryResident.residentId,
    enabled: false,
    ownedPokemon: ordinaryOwned
  }).state;
  const routeAfterPreference = state.routes.find((entry) => entry.routeNumber === 9);
  assert.deepEqual(routeAfterPreference.premiumResidentIds, premiumIdsBefore);
  assert.equal(routeAfterPreference.residents.find((resident) => resident.residentId === premiumResident.residentId).encounterWeight, premiumWeightBefore);
  const filteredEligible = routeEngine.getEligibleRouteResidents(state, {
    playerId: "player-1",
    routeNumber: 9,
    ownedPokemon: ordinaryOwned
  });
  const premiumShareAfter = filteredEligible
    .filter((resident) => resident.premium)
    .reduce((sum, resident) => sum + resident.encounterWeight, 0)
    / filteredEligible.reduce((sum, resident) => sum + resident.encounterWeight, 0);
  assert.ok(premiumShareAfter > premiumShareBefore);

  const opportunity = routeEngine.createRouteEncounterOpportunity(state, {
    playerId: "player-1",
    routeNumber: 9
  });
  const master = routeEngine.createMasterBallRouteResult(opportunity.state, {
    playerId: "player-1",
    opportunityId: opportunity.opportunity.opportunityId,
    routeNumber: 9,
    residentId: ordinaryResident.residentId
  });
  assert.equal(master.result.revisions[0].residentId, ordinaryResident.residentId);

  const tempOpportunity = routeEngine.createRouteEncounterOpportunity(state, {
    playerId: "player-1",
    routeNumber: 9
  });
  const injected = routeEngine.addTemporaryResidentsToOpportunity(tempOpportunity.state, {
    opportunityId: tempOpportunity.opportunity.opportunityId,
    residents: routeEngine.selectTemporaryInjectionResidents({
      pokemonCatalog: fixtureCatalog(),
      route: tempOpportunity.state.routes.find((entry) => entry.routeNumber === 9),
      primaryType: "Fire",
      battleTierIds: ["lc"],
      count: 4,
      seed: "temp-duplicate-toggle"
    })
  });
  assert.throws(() => routeEngine.setRouteDuplicatePreference(injected.state, {
    playerId: "player-1",
    routeNumber: 9,
    residentId: injected.residents[0].residentId,
    enabled: false
  }), /not part|permanent Route residents/);
});

test("Extra Encounter Token grants one route opportunity but cannot farm ahead of progression", () => {
  const initial = createState();

  assert.throws(() => routeEngine.grantExtraEncounterOpportunity(initial, {
    playerId: "player-1",
    routeNumber: 6,
    currentProgressionRoute: 4,
    tokenInventoryId: "token-extra-1"
  }), /above current progression/);

  const { opportunity } = routeEngine.grantExtraEncounterOpportunity(initial, {
    playerId: "player-1",
    routeNumber: 4,
    currentProgressionRoute: 4,
    tokenInventoryId: "token-extra-1"
  });
  assert.equal(opportunity.kind, "extra-encounter-token");
  assert.equal(opportunity.routeId, "route-4");
  assert.equal(opportunity.encounterCount, 1);
  assert.equal(opportunity.source.purchasePrice, routeEngine.EXTRA_ENCOUNTER_TOKEN_PRICE);
  assert.equal(opportunity.source.freelyPurchasable, true);
  assert.equal(opportunity.source.storable, true);
});

test("Repel suppresses five exact residents of the chosen Battle Tier", () => {
  const initial = createState("repel-seed");
  const route = initial.routes.find((entry) => entry.routeId === "route-1");
  const targetTier = "lc";
  const { state: repelled, suppression } = routeEngine.applyRouteRepel(initial, {
    routeNumber: 1,
    battleTierId: targetTier,
    seed: "exact-repel"
  });
  const eligible = routeEngine.getEligibleRouteResidents(repelled, { routeNumber: 1 });

  assert.equal(suppression.residentIds.length, 5);
  assert.ok(suppression.residentIds.every((residentId) => route.residents.find((resident) => (
    resident.residentId === residentId && resident.battleTier.id === targetTier
  ))));
  assert.ok(suppression.residentIds.every((residentId) => !eligible.some((resident) => resident.residentId === residentId)));
});

test("temporary Primary-Type injection adds nonresident encounter options without public route discovery", () => {
  const initial = createState("injection-seed");
  const { state: withOpportunity, opportunity } = routeEngine.createRouteEncounterOpportunity(initial, {
    playerId: "player-1",
    routeNumber: 5
  });
  const routeBeforeInjection = withOpportunity.routes.find((entry) => entry.routeId === "route-5");
  const injectionCatalog = fixtureCatalog().filter((entry) => !(entry.primaryType === "Fire" && entry.balanceTier === "master"));
  const injectedCandidates = routeEngine.selectTemporaryInjectionResidents({
    pokemonCatalog: injectionCatalog,
    route: routeBeforeInjection,
    primaryType: "Fire",
    count: 4,
    tierRollOverrides: [
      { rollId: "base-or-lower", baseOrLower: true, requestedTierId: "poke", candidateTierIds: ["lc", "lc-elite", "safari", "safari-elite", "poke"] },
      { rollId: "plus-1", baseOrLower: false, requestedTierId: "poke-elite", candidateTierIds: ["poke-elite"] },
      { rollId: "plus-2", baseOrLower: false, requestedTierId: "great", candidateTierIds: ["great"] },
      { rollId: "forced-master-fallback", baseOrLower: false, requestedTierId: "master", candidateTierIds: ["master"] }
    ],
    seed: "fire-injection"
  });
  const { state: injected, residents } = routeEngine.addTemporaryResidentsToOpportunity(withOpportunity, {
    opportunityId: opportunity.opportunityId,
    residents: injectedCandidates
  });
  const selectedTemporary = residents[0];
  const { state: drawn, result } = routeEngine.drawRouteEncounter(injected, {
    opportunityId: opportunity.opportunityId,
    residentId: selectedTemporary.residentId
  });
  const route = drawn.routes.find((entry) => entry.routeId === "route-5");

  assert.equal(residents.length, 4);
  assert.ok(residents.every((resident) => resident.permanent === false));
  assert.deepEqual(residents.slice(0, 3).map((resident) => resident.source.tierRoll.rollId), ["base-or-lower", "plus-1", "plus-2"]);
  assert.ok(residents.every((resident) => resident.battleTier.id !== "master-elite"));
  assert.ok(residents.some((resident) => resident.source.tierRoll.fallbackTierIds?.length));
  assert.ok(residents.every((resident) => tierIds.indexOf(resident.battleTier.id) <= tierIds.indexOf("master")));
  assert.equal(result.revisions[0].permanentResident, false);
  assert.equal(route.publicDiscoveryResidentIds.includes(selectedTemporary.residentId), false);
});

test("Master Ball can select public or private Route knowledge, not arbitrary hidden residents", () => {
  const initial = createState("master-ball-seed");
  const route = initial.routes.find((entry) => entry.routeId === "route-2");
  const publicResident = route.residents[0];
  const privateResident = route.residents[1];
  const hiddenResident = route.residents[2];

  const publicState = routeEngine.revealResidentToTable(initial, "route-2", publicResident.residentId);
  const knownState = routeEngine.revealResidentToPlayer(publicState, "route-2", privateResident.residentId, "player-1");
  const playerOneEligible = routeEngine.getMasterBallEligibleResidents(knownState, {
    routeNumber: 2,
    playerId: "player-1"
  });
  const playerTwoEligible = routeEngine.getMasterBallEligibleResidents(knownState, {
    routeNumber: 2,
    playerId: "player-2"
  });

  assert.deepEqual(playerOneEligible.map((resident) => resident.residentId).sort(), [
    privateResident.residentId,
    publicResident.residentId
  ].sort());
  assert.deepEqual(playerTwoEligible.map((resident) => resident.residentId), [publicResident.residentId]);
  const { state: opportunityState, opportunity } = routeEngine.createRouteEncounterOpportunity(knownState, {
    routeNumber: 2,
    playerId: "player-1"
  });

  assert.throws(() => routeEngine.createMasterBallRouteResult(opportunityState, {
    routeNumber: 2,
    playerId: "player-1",
    opportunityId: opportunity.opportunityId,
    residentId: hiddenResident.residentId
  }), /revealed to that player/);

  const { state: selectedState, result } = routeEngine.createMasterBallRouteResult(opportunityState, {
    routeNumber: 2,
    playerId: "player-1",
    opportunityId: opportunity.opportunityId,
    residentId: privateResident.residentId
  });
  assert.equal(result.revisions[0].residentId, privateResident.residentId);
  assert.equal(result.selectionVisibility.selectedFromPrivateKnowledge, true);
  assert.deepEqual(result.publicDiscoveryEvents, []);
  const consumedOpportunity = selectedState.routes.find((entry) => entry.routeId === "route-2")
    .pendingEncounterOpportunities.find((entry) => entry.opportunityId === opportunity.opportunityId);
  assert.equal(consumedOpportunity.status, "consumed");
  assert.equal(consumedOpportunity.consumedByResultId, result.resultId);
});

test("finalized acquisition records preserve route, resident, revision, species, and Battle Tier identity", () => {
  const initial = createState("finalize-seed");
  const { state: withOpportunity, opportunity } = routeEngine.createRouteEncounterOpportunity(initial, {
    playerId: "player-1",
    routeNumber: 3
  });
  const resident = withOpportunity.routes.find((route) => route.routeId === "route-3").residents[0];
  const { state: drawn, result } = routeEngine.drawRouteEncounter(withOpportunity, {
    opportunityId: opportunity.opportunityId,
    residentId: resident.residentId
  });
  const { state: finalized, acquisition } = routeEngine.finalizeRouteEncounterAcquisition(drawn, {
    resultId: result.resultId,
    rosterPokemonId: "pokemon-record-1"
  });
  const finalizedRoute = finalized.routes.find((route) => route.routeId === "route-3");

  assert.equal(acquisition.resultId, result.resultId);
  assert.equal(acquisition.revisionNumber, 1);
  assert.equal(acquisition.residentId, resident.residentId);
  assert.equal(acquisition.speciesId, resident.speciesId);
  assert.equal(acquisition.battleTier.id, resident.battleTier.id);
  assert.equal(finalizedRoute.encounterResults[0].status, "finalized");
  assert.equal(finalizedRoute.finalizedAcquisitions[0].sourceLabel, "Route Encounter");
});

test("real Pokemon data normalizes into a valid V2 Route catalog", () => {
  const { catalog, report } = routeCatalog.buildV2RoutePokemonCatalog();
  const validation = routeCatalog.validateV2RoutePokemonCatalog(catalog);

  assert.equal(validation.ok, true, validation.errors.join("\n"));
  assert.equal(catalog.length, report.eligibleCount);
  assert.ok(catalog.length > 800);
  assert.ok(report.eligibleByBattleTier.lc > 300);
  assert.ok(report.eligibleByBattleTier["lc-elite"] > 100);
  assert.ok(report.eligibleByBattleTier.safari > 100);
  assert.ok(report.eligibleByBattleTier.master > 20);
  assert.ok(catalog.every((entry) => entry.source.kind === "rival-saga-real-pokemon-data"));
  assert.ok(catalog.every((entry) => entry.source.buildDataKey));
  assert.ok(catalog.every((entry) => entry.regionalIdentity));
  assert.equal(report.regionalIdentity.validCount + report.regionalIdentity.unresolved.length, report.eligibleCount);
  assert.ok(report.regionalIdentity.byRegion.Kanto > 0);
  assert.ok(report.regionalIdentity.byRegion.Unova > 0);
  assert.ok(report.regionalIdentity.unresolved.every((entry) => entry.reason));
  assert.equal(report.malformed.length, 0);
  assert.ok(report.aliasResolutions.some((entry) => entry.displayName === "Basculegion-Blue" && entry.resolvedKey === "basculegion-female"));
  assert.ok(report.aliasResolutions.some((entry) => entry.displayName === "Basculegion-Red" && entry.resolvedKey === "basculegion-male"));
});

test("invalid V2 Route catalog data reports required-field problems clearly", () => {
  const validation = routeCatalog.validateV2RoutePokemonCatalog([
    { displayName: "No Species", balanceTier: "lc", primaryType: "Grass", types: ["Grass"] },
    { speciesId: "missing-tier", displayName: "Missing Tier", primaryType: "Fire", types: ["Fire"] },
    { speciesId: "bad-tier", displayName: "Bad Tier", balanceTier: "weird", primaryType: "Water", types: ["Water"] },
    { speciesId: "missing-primary", displayName: "Missing Primary", balanceTier: "lc", types: ["Grass"] },
    { speciesId: "bad-types", displayName: "Bad Types", balanceTier: "lc", primaryType: "Grass", types: [] },
    { speciesId: "bad-types", displayName: "Duplicate", balanceTier: "lc", primaryType: "Grass", types: ["Grass"] }
  ]);

  assert.equal(validation.ok, false);
  assert.ok(validation.errors.some((error) => error.includes("missing species ID")));
  assert.ok(validation.errors.some((error) => error.includes("missing Battle Tier")));
  assert.ok(validation.errors.some((error) => error.includes("unrecognized Battle Tier weird")));
  assert.ok(validation.errors.some((error) => error.includes("missing Primary Type")));
  assert.ok(validation.errors.some((error) => error.includes("invalid type data")));
  assert.ok(validation.errors.some((error) => error.includes("duplicate canonical species identifier bad-types")));
});

test("V2 Series initialization creates Route state once and preserves it on later initialization", () => {
  const first = routeLifecycle.initializeV2Series({}, {
    seriesId: "series-real-init",
    seed: "real-init-seed"
  });
  const routeStateSnapshot = JSON.stringify(first.routeState);
  const second = routeLifecycle.initializeV2Series(first.state, {
    seriesId: "series-real-init",
    seed: "different-seed-that-must-not-regenerate"
  });

  assert.equal(first.created, true);
  assert.equal(second.created, false);
  assert.equal(JSON.stringify(second.routeState), routeStateSnapshot);
  assert.deepEqual(second.state.v2.routeEncounterBySeriesId["series-real-init"], first.routeState);
});

test("same Series seed produces deterministic fresh real-data Route state", () => {
  const first = routeLifecycle.initializeV2Series({}, {
    seriesId: "series-deterministic-a",
    seed: "real-data-deterministic"
  });
  const second = routeLifecycle.initializeV2Series({}, {
    seriesId: "series-deterministic-a",
    seed: "real-data-deterministic"
  });

  assert.deepEqual(first.routeState, second.routeState);
});

test("save and reload preserves exact V2 Route populations and Route Quality", () => {
  const initialized = routeLifecycle.initializeV2Series({}, {
    seriesId: "series-roundtrip",
    seed: "roundtrip-seed"
  });
  const reloaded = routeLifecycle.serializeAndReloadV2RouteState(initialized.routeState);

  assert.deepEqual(reloaded, initialized.routeState);
  initialized.routeState.routes.forEach((route, index) => {
    assert.deepEqual(reloaded.routes[index].residents, route.residents);
    assert.deepEqual(reloaded.routes[index].routeQuality, route.routeQuality);
    assert.deepEqual(reloaded.routes[index].generation, route.generation);
  });
});

test("save and reload preserves discoveries, private knowledge, opportunities, revisions, suppressions, and acquisitions", () => {
  const initialized = routeLifecycle.initializeV2Series({}, {
    seriesId: "series-mutated-roundtrip",
    seed: "mutated-roundtrip-seed"
  });
  const routeOne = initialized.routeState.routes.find((route) => route.routeNumber === 1);
  const firstResident = routeOne.residents[0];
  const secondResident = routeOne.residents[1];
  const thirdResident = routeOne.residents[2];

  let state = routeEngine.revealResidentToPlayer(initialized.routeState, 1, firstResident.residentId, "player-1");
  state = routeEngine.revealResidentToTable(state, 1, firstResident.residentId);
  const repel = routeEngine.applyRouteRepel(state, {
    routeNumber: 1,
    battleTierId: thirdResident.battleTier.id,
    count: 1,
    seed: "roundtrip-repel"
  });
  state = repel.state;
  const opportunity = routeEngine.createRouteEncounterOpportunity(state, {
    playerId: "player-1",
    routeNumber: 1
  });
  state = opportunity.state;
  const drawn = routeEngine.drawRouteEncounter(state, {
    opportunityId: opportunity.opportunity.opportunityId,
    residentId: firstResident.residentId
  });
  state = drawn.state;
  const rerolled = routeEngine.rerollRouteEncounterResult(state, {
    resultId: drawn.result.resultId,
    residentId: secondResident.residentId,
    reason: "roundtrip-reroll"
  });
  state = rerolled.state;
  const finalized = routeEngine.finalizeRouteEncounterAcquisition(state, {
    resultId: rerolled.result.resultId,
    rosterPokemonId: "pokemon-roundtrip-1"
  });
  state = finalized.state;

  const reloaded = routeLifecycle.serializeAndReloadV2RouteState(state);
  assert.deepEqual(reloaded, state);
  const reloadedRoute = reloaded.routes.find((route) => route.routeNumber === 1);
  assert.ok(reloadedRoute.publicDiscoveryResidentIds.includes(firstResident.residentId));
  assert.ok(reloadedRoute.privateKnowledgeByPlayerId["player-1"].includes(firstResident.residentId));
  assert.equal(reloadedRoute.suppressions[0].suppressionId, repel.suppression.suppressionId);
  assert.equal(reloadedRoute.pendingEncounterOpportunities[0].opportunityId, opportunity.opportunity.opportunityId);
  assert.equal(reloadedRoute.encounterResults[0].revisions.length, 2);
  assert.equal(reloadedRoute.finalizedAcquisitions[0].rosterPokemonId, "pokemon-roundtrip-1");
});

test("ID counters continue safely after reload", () => {
  const initialized = routeLifecycle.initializeV2Series({}, {
    seriesId: "series-counter-roundtrip",
    seed: "counter-roundtrip-seed"
  });
  const first = routeEngine.createRouteEncounterOpportunity(initialized.routeState, {
    playerId: "player-1",
    routeNumber: 1
  });
  const reloaded = routeLifecycle.serializeAndReloadV2RouteState(first.state);
  const second = routeEngine.createRouteEncounterOpportunity(reloaded, {
    playerId: "player-2",
    routeNumber: 2
  });

  assert.equal(first.opportunity.opportunityId, "route-opportunity-001");
  assert.equal(second.opportunity.opportunityId, "route-opportunity-002");
});

test("real-data generation never creates same-Route duplicate species", () => {
  const initialized = routeLifecycle.initializeV2Series({}, {
    seriesId: "series-real-no-dupes",
    seed: "real-no-dupes-seed"
  });
  initialized.routeState.routes.forEach((route) => {
    assert.deepEqual(routeAudit.duplicateSpeciesInRoute(route), []);
  });
});

test("multi-Series real-data audit completes across deterministic seeds without structural failure", () => {
  const audit = routeAudit.generateV2RouteAudit({
    seriesCount: 3,
    seedPrefix: "test-real-audit"
  });

  assert.equal(audit.catalog.validation.ok, true, audit.catalog.validation.errors.join("\n"));
  assert.equal(audit.structuralFailures.length, 0);
  assert.deepEqual(audit.seriesRegions, regionalVariance.SERIES_REGIONS);
  assert.equal(audit.totalGeneratedSeries, regionalVariance.SERIES_REGIONS.length * 3);
  assert.equal(audit.series.length, regionalVariance.SERIES_REGIONS.length * 3);
  assert.ok(audit.series.every((series) => series.routes.length === 9));
  assert.ok(audit.series.every((series) => series.regionalComposition.totalNormalResidents > 0));
  assert.equal(audit.regionalVerification.ok, true);
  assert.ok(audit.regionalSimulation.every((entry) => entry.averageRealizedNativePercent > entry.averageUnbiasedBaselinePercent));
  assert.ok(audit.regionalVerification.regionalVariationRange > 0);
});

test("valid Route Action commits and spends exactly 1 Action", () => {
  const state = createGameStateWithInitializedRoutes();
  const committed = routeActions.commitRouteAction(state, {
    seriesId: "series-action-test",
    actionId: "route-action-alpha",
    playerId: "player-1",
    routeNumber: 3
  });
  const actionPhase = v2ActionPhase(committed.state);

  assert.equal(committed.action.status, "committed");
  assert.equal(committed.action.type, routeActions.ROUTE_ACTION_TYPE);
  assert.equal(committed.spend.amount, 1);
  assert.equal(actionPhase.spends.length, 1);
  assert.deepEqual(actionPhase.playerActionLedger["player-1"].spentActionIds, ["route-action-alpha"]);
});

test("one Route Action creates exactly one encounter opportunity and future Routes remain legal", () => {
  const state = createGameStateWithInitializedRoutes();
  const committed = routeActions.commitRouteAction(state, {
    seriesId: "series-action-test",
    actionId: "route-action-future",
    playerId: "player-1",
    routeNumber: 9
  });
  const routeNine = v2RouteState(committed.state).routes.find((route) => route.routeNumber === 9);

  assert.equal(committed.action.routeNumber, 9);
  assert.equal(committed.opportunity.encounterCount, 1);
  assert.equal(routeNine.pendingEncounterOpportunities.length, 1);
  assert.equal(routeNine.pendingEncounterOpportunities[0].source.actionId, "route-action-future");
});

test("invalid or no-Action player cannot commit a Route Action", () => {
  const state = createGameStateWithInitializedRoutes({ playerOneActions: 0 });
  assert.throws(() => routeActions.commitRouteAction(state, {
    seriesId: "series-action-test",
    actionId: "route-action-no-player",
    playerId: "missing-player",
    routeNumber: 1
  }), /Player not found/);
  assert.throws(() => routeActions.commitRouteAction(state, {
    seriesId: "series-action-test",
    actionId: "route-action-no-actions",
    playerId: "player-1",
    routeNumber: 1
  }), /no V2 Actions available/);
});

test("duplicate Route Action commit does not spend twice", () => {
  const state = createGameStateWithInitializedRoutes();
  const first = routeActions.commitRouteAction(state, {
    seriesId: "series-action-test",
    actionId: "route-action-idempotent",
    playerId: "player-1",
    routeNumber: 2
  });
  const second = routeActions.commitRouteAction(first.state, {
    seriesId: "series-action-test",
    actionId: "route-action-idempotent",
    playerId: "player-1",
    routeNumber: 2
  });

  assert.equal(second.duplicate, true);
  assert.equal(v2ActionPhase(second.state).spends.length, 1);
  assert.equal(v2RouteState(second.state).routes.find((route) => route.routeNumber === 2).pendingEncounterOpportunities.length, 1);
});

test("Route Action causal chain preserves action, opportunity, and result IDs", () => {
  const state = createGameStateWithInitializedRoutes();
  const committed = routeActions.commitRouteAction(state, {
    seriesId: "series-action-test",
    actionId: "route-action-causal",
    playerId: "player-1",
    routeNumber: 4
  });
  const route = v2RouteState(committed.state).routes.find((entry) => entry.routeNumber === 4);
  const drawn = routeActions.drawRouteActionEncounter(committed.state, {
    seriesId: "series-action-test",
    actionId: "route-action-causal",
    residentId: route.residents[0].residentId
  });

  assert.equal(drawn.action.causalChain.actionId, "route-action-causal");
  assert.equal(drawn.action.causalChain.spendId, committed.spend.spendId);
  assert.equal(drawn.action.causalChain.opportunityId, committed.opportunity.opportunityId);
  assert.equal(drawn.action.causalChain.resultId, drawn.result.resultId);
  assert.equal(drawn.result.opportunityId, committed.opportunity.opportunityId);
});

test("finalizing a Route encounter creates one canonical Pokemon record with Route metadata", () => {
  const state = createGameStateWithInitializedRoutes();
  const committed = routeActions.commitRouteAction(state, {
    seriesId: "series-action-test",
    actionId: "route-action-acquire",
    playerId: "player-1",
    routeNumber: 5
  });
  const route = v2RouteState(committed.state).routes.find((entry) => entry.routeNumber === 5);
  const drawn = routeActions.drawRouteActionEncounter(committed.state, {
    seriesId: "series-action-test",
    actionId: "route-action-acquire",
    residentId: route.residents[0].residentId
  });
  const acquired = routeActions.finalizeRouteActionAcquisition(drawn.state, {
    seriesId: "series-action-test",
    actionId: "route-action-acquire",
    now: "2026-08-13T00:00:00.000Z"
  });

  assert.equal(acquired.state.pokemonRecords.length, 1);
  assert.equal(acquired.pokemon.source, "Route Encounter");
  assert.equal(acquired.pokemon.trainerId, "player-1");
  assert.equal(acquired.pokemon.routeEncounterMetadata.seriesId, "series-action-test");
  assert.equal(acquired.pokemon.routeEncounterMetadata.routeId, "route-5");
  assert.equal(acquired.pokemon.routeEncounterMetadata.resultId, drawn.result.resultId);
  assert.equal(acquired.pokemon.routeEncounterMetadata.residentId, route.residents[0].residentId);
  assert.equal(acquired.pokemon.routeEncounterMetadata.finalRevision, 1);
  assert.ok(acquired.state.players.find((player) => player.id === "player-1").pokemonIds.includes(acquired.pokemon.id));
});

test("duplicate finalization cannot create a second Pokemon", () => {
  const state = createGameStateWithInitializedRoutes();
  const completed = routeActions.completeRouteAction(state, {
    seriesId: "series-action-test",
    actionId: "route-action-duplicate-acquire",
    playerId: "player-1",
    routeNumber: 1,
    now: "2026-08-13T00:00:00.000Z"
  });
  const duplicate = routeActions.finalizeRouteActionAcquisition(completed.state, {
    seriesId: "series-action-test",
    actionId: "route-action-duplicate-acquire",
    now: "2026-08-13T00:00:01.000Z"
  });

  assert.equal(duplicate.duplicate, true);
  assert.equal(duplicate.state.pokemonRecords.length, 1);
  assert.equal(duplicate.state.pokemonRecords[0].id, completed.pokemon.id);
});

test("Route Action settles only after required acquisition", () => {
  const state = createGameStateWithInitializedRoutes();
  const committed = routeActions.commitRouteAction(state, {
    seriesId: "series-action-test",
    actionId: "route-action-settlement",
    playerId: "player-1",
    routeNumber: 1
  });
  assert.throws(() => routeActions.settleRouteAction(committed.state, {
    seriesId: "series-action-test",
    actionId: "route-action-settlement"
  }), /before Pokemon acquisition/);
});

test("JSON round-trip before encounter preserves committed Route Action and opportunity", () => {
  const state = createGameStateWithInitializedRoutes();
  const committed = routeActions.commitRouteAction(state, {
    seriesId: "series-action-test",
    actionId: "route-action-reload-before-roll",
    playerId: "player-1",
    routeNumber: 6
  });
  const reloaded = routeActions.serializeAndReloadV2ActionGameState(committed.state);

  assert.deepEqual(v2ActionPhase(reloaded).actions, v2ActionPhase(committed.state).actions);
  assert.deepEqual(v2RouteState(reloaded).routes.find((route) => route.routeNumber === 6).pendingEncounterOpportunities,
    v2RouteState(committed.state).routes.find((route) => route.routeNumber === 6).pendingEncounterOpportunities);
});

test("JSON round-trip after encounter preserves unresolved result and Action relationship", () => {
  const state = createGameStateWithInitializedRoutes();
  const committed = routeActions.commitRouteAction(state, {
    seriesId: "series-action-test",
    actionId: "route-action-reload-result",
    playerId: "player-1",
    routeNumber: 7
  });
  const route = v2RouteState(committed.state).routes.find((entry) => entry.routeNumber === 7);
  const drawn = routeActions.drawRouteActionEncounter(committed.state, {
    seriesId: "series-action-test",
    actionId: "route-action-reload-result",
    residentId: route.residents[0].residentId
  });
  const reloaded = routeActions.serializeAndReloadV2ActionGameState(drawn.state);
  const action = v2ActionPhase(reloaded).actions[0];
  const result = v2RouteState(reloaded).routes.find((entry) => entry.routeNumber === 7).encounterResults[0];

  assert.equal(action.resultId, result.resultId);
  assert.equal(result.status, "unresolved");
  assert.equal(result.currentRevision, 1);
});

test("JSON round-trip after reroll preserves complete revision history", () => {
  const state = createGameStateWithInitializedRoutes();
  const committed = routeActions.commitRouteAction(state, {
    seriesId: "series-action-test",
    actionId: "route-action-reload-reroll",
    playerId: "player-1",
    routeNumber: 8
  });
  const route = v2RouteState(committed.state).routes.find((entry) => entry.routeNumber === 8);
  const drawn = routeActions.drawRouteActionEncounter(committed.state, {
    seriesId: "series-action-test",
    actionId: "route-action-reload-reroll",
    residentId: route.residents[0].residentId
  });
  const rerolledRouteState = routeEngine.rerollRouteEncounterResult(v2RouteState(drawn.state), {
    resultId: drawn.result.resultId,
    residentId: route.residents[1].residentId
  }).state;
  const mutated = structuredClone(drawn.state);
  mutated.v2.routeEncounterBySeriesId["series-action-test"] = rerolledRouteState;
  const reloaded = routeActions.serializeAndReloadV2ActionGameState(mutated);
  const result = v2RouteState(reloaded).routes.find((entry) => entry.routeNumber === 8).encounterResults[0];

  assert.equal(result.currentRevision, 2);
  assert.equal(result.revisions.length, 2);
  assert.equal(result.revisions[0].residentId, route.residents[0].residentId);
  assert.equal(result.revisions[1].residentId, route.residents[1].residentId);
});

test("JSON round-trip after acquisition allows safe settlement without duplicate Pokemon", () => {
  const state = createGameStateWithInitializedRoutes();
  const committed = routeActions.commitRouteAction(state, {
    seriesId: "series-action-test",
    actionId: "route-action-reload-acquired",
    playerId: "player-1",
    routeNumber: 2
  });
  const route = v2RouteState(committed.state).routes.find((entry) => entry.routeNumber === 2);
  const drawn = routeActions.drawRouteActionEncounter(committed.state, {
    seriesId: "series-action-test",
    actionId: "route-action-reload-acquired",
    residentId: route.residents[0].residentId
  });
  const acquired = routeActions.finalizeRouteActionAcquisition(drawn.state, {
    seriesId: "series-action-test",
    actionId: "route-action-reload-acquired"
  });
  const reloaded = routeActions.serializeAndReloadV2ActionGameState(acquired.state);
  const duplicateAcquire = routeActions.finalizeRouteActionAcquisition(reloaded, {
    seriesId: "series-action-test",
    actionId: "route-action-reload-acquired"
  });
  const settled = routeActions.settleRouteAction(duplicateAcquire.state, {
    seriesId: "series-action-test",
    actionId: "route-action-reload-acquired"
  });

  assert.equal(duplicateAcquire.state.pokemonRecords.length, 1);
  assert.equal(settled.action.status, "settled");
});

test("fully settled Route Action reloads with one spend and one Pokemon", () => {
  const state = createGameStateWithInitializedRoutes();
  const completed = routeActions.completeRouteAction(state, {
    seriesId: "series-action-test",
    actionId: "route-action-full-reload",
    playerId: "player-1",
    routeNumber: 1
  });
  const reloaded = routeActions.serializeAndReloadV2ActionGameState(completed.state);
  const action = v2ActionPhase(reloaded).actions[0];

  assert.equal(v2ActionPhase(reloaded).spends.length, 1);
  assert.equal(reloaded.pokemonRecords.length, 1);
  assert.equal(action.status, "settled");
  assert.equal(action.causalChain.pokemonRecordId, reloaded.pokemonRecords[0].id);
});

test("Extra Encounter opportunities remain distinct from Action-spending opportunities", () => {
  const state = createGameStateWithInitializedRoutes();
  const extra = routeEngine.grantExtraEncounterOpportunity(v2RouteState(state), {
    playerId: "player-1",
    routeNumber: 1,
    currentProgressionRoute: 1,
    tokenInventoryId: "extra-token-1"
  });
  const mutated = structuredClone(state);
  mutated.v2.routeEncounterBySeriesId["series-action-test"] = extra.state;

  assert.equal(v2ActionPhase(mutated).spends.length, 0);
  const opportunity = v2RouteState(mutated).routes.find((route) => route.routeNumber === 1).pendingEncounterOpportunities[0];
  assert.equal(opportunity.kind, "extra-encounter-token");
  assert.equal(opportunity.source.tokenInventoryId, "extra-token-1");
});
