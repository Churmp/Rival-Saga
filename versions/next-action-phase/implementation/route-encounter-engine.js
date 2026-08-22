"use strict";

const regionalVariance = require("./route-regional-variance.js");

const ACTION_PHASE_VERSION_V2 = "action-phase-v2-real-series";
const ROUTE_ENGINE_SCHEMA_VERSION = 1;
const DEFAULT_ROUTE_COUNT = 9;
const DEFAULT_ROUTE_POPULATION_MIN = 20;
const DEFAULT_ROUTE_POPULATION_MAX = 30;
const DEFAULT_ROUTE_PREMIUM_RESIDENT_COUNT = 2;
const DEFAULT_ROUTE_PREMIUM_ENCOUNTER_WEIGHT = 0.15;
const PREMIUM_ROUTE_TIER_IDS = Object.freeze(["ultra-elite", "master", "master-elite"]);
const DEFAULT_REPEL_SUPPRESSION_COUNT = 5;
const EXTRA_ENCOUNTER_TOKEN_PRICE = 2500;

const APPROVED_ROUTE_TIER_DISTRIBUTIONS = Object.freeze({
  1: Object.freeze([
    Object.freeze({ tierId: "lc", weight: 75 }),
    Object.freeze({ tierId: "lc-elite", weight: 20 }),
    Object.freeze({ tierId: "safari", weight: 5 })
  ]),
  2: Object.freeze([
    Object.freeze({ tierId: "lc", weight: 25 }),
    Object.freeze({ tierId: "lc-elite", weight: 60 }),
    Object.freeze({ tierId: "safari", weight: 15 })
  ]),
  3: Object.freeze([
    Object.freeze({ tierId: "safari", weight: 75 }),
    Object.freeze({ tierId: "poke", weight: 23 }),
    Object.freeze({ tierId: "great", weight: 2 }),
    Object.freeze({ tierId: "ultra", weight: 0 }),
    Object.freeze({ tierId: "master", weight: 0 })
  ]),
  4: Object.freeze([
    Object.freeze({ tierId: "safari", weight: 63 }),
    Object.freeze({ tierId: "poke", weight: 29 }),
    Object.freeze({ tierId: "great", weight: 7 }),
    Object.freeze({ tierId: "ultra", weight: 1 }),
    Object.freeze({ tierId: "master", weight: 0 })
  ]),
  5: Object.freeze([
    Object.freeze({ tierId: "safari", weight: 42 }),
    Object.freeze({ tierId: "poke", weight: 34 }),
    Object.freeze({ tierId: "great", weight: 20 }),
    Object.freeze({ tierId: "ultra", weight: 3.5 }),
    Object.freeze({ tierId: "master", weight: 0.5 })
  ]),
  6: Object.freeze([
    Object.freeze({ tierId: "safari", weight: 28 }),
    Object.freeze({ tierId: "poke", weight: 34 }),
    Object.freeze({ tierId: "great", weight: 28 }),
    Object.freeze({ tierId: "ultra", weight: 9 }),
    Object.freeze({ tierId: "master", weight: 1 })
  ]),
  7: Object.freeze([
    Object.freeze({ tierId: "safari", weight: 16 }),
    Object.freeze({ tierId: "poke", weight: 28 }),
    Object.freeze({ tierId: "great", weight: 38 }),
    Object.freeze({ tierId: "ultra", weight: 15 }),
    Object.freeze({ tierId: "master", weight: 3 })
  ]),
  8: Object.freeze([
    Object.freeze({ tierId: "safari", weight: 9 }),
    Object.freeze({ tierId: "poke", weight: 21 }),
    Object.freeze({ tierId: "great", weight: 39 }),
    Object.freeze({ tierId: "ultra", weight: 27 }),
    Object.freeze({ tierId: "master", weight: 4 })
  ]),
  9: Object.freeze([
    Object.freeze({ tierId: "safari", weight: 5 }),
    Object.freeze({ tierId: "poke", weight: 15 }),
    Object.freeze({ tierId: "great", weight: 42 }),
    Object.freeze({ tierId: "ultra", weight: 32 }),
    Object.freeze({ tierId: "master", weight: 6 })
  ])
});

const DEFAULT_ROUTE_TIER_PLAN = APPROVED_ROUTE_TIER_DISTRIBUTIONS;

const DEFAULT_ROUTE_PREMIUM_TIER_PLAN = Object.freeze({
  1: Object.freeze([
    Object.freeze({ tierId: "ultra-elite", weight: 80 }),
    Object.freeze({ tierId: "master", weight: 18 }),
    Object.freeze({ tierId: "master-elite", weight: 2 })
  ]),
  2: Object.freeze([
    Object.freeze({ tierId: "ultra-elite", weight: 75 }),
    Object.freeze({ tierId: "master", weight: 22 }),
    Object.freeze({ tierId: "master-elite", weight: 3 })
  ]),
  3: Object.freeze([
    Object.freeze({ tierId: "ultra-elite", weight: 68 }),
    Object.freeze({ tierId: "master", weight: 27 }),
    Object.freeze({ tierId: "master-elite", weight: 5 })
  ]),
  4: Object.freeze([
    Object.freeze({ tierId: "ultra-elite", weight: 60 }),
    Object.freeze({ tierId: "master", weight: 32 }),
    Object.freeze({ tierId: "master-elite", weight: 8 })
  ]),
  5: Object.freeze([
    Object.freeze({ tierId: "ultra-elite", weight: 50 }),
    Object.freeze({ tierId: "master", weight: 38 }),
    Object.freeze({ tierId: "master-elite", weight: 12 })
  ]),
  6: Object.freeze([
    Object.freeze({ tierId: "ultra-elite", weight: 40 }),
    Object.freeze({ tierId: "master", weight: 45 }),
    Object.freeze({ tierId: "master-elite", weight: 15 })
  ]),
  7: Object.freeze([
    Object.freeze({ tierId: "ultra-elite", weight: 30 }),
    Object.freeze({ tierId: "master", weight: 50 }),
    Object.freeze({ tierId: "master-elite", weight: 20 })
  ]),
  8: Object.freeze([
    Object.freeze({ tierId: "ultra-elite", weight: 22 }),
    Object.freeze({ tierId: "master", weight: 52 }),
    Object.freeze({ tierId: "master-elite", weight: 26 })
  ]),
  9: Object.freeze([
    Object.freeze({ tierId: "ultra-elite", weight: 15 }),
    Object.freeze({ tierId: "master", weight: 50 }),
    Object.freeze({ tierId: "master-elite", weight: 35 })
  ])
});

const ROUTE_QUALITY_TABLE = Object.freeze([
  Object.freeze({ id: "poor", label: "Poor", weight: 5, shift: -2 }),
  Object.freeze({ id: "weak", label: "Weak", weight: 20, shift: -1 }),
  Object.freeze({ id: "normal", label: "Normal", weight: 50, shift: 0 }),
  Object.freeze({ id: "strong", label: "Strong", weight: 20, shift: 1 }),
  Object.freeze({ id: "loaded", label: "Loaded", weight: 5, shift: 2 })
]);

function cloneJson(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function text(value, fallback = "") {
  const normalized = String(value ?? "").trim();
  return normalized || fallback;
}

function slugify(value) {
  return text(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function pad3(value) {
  return String(value).padStart(3, "0");
}

function routeIdFor(routeNumber) {
  const number = Number(routeNumber);
  assert(Number.isInteger(number) && number >= 1 && number <= DEFAULT_ROUTE_COUNT, `Route must be 1-${DEFAULT_ROUTE_COUNT}.`);
  return `route-${number}`;
}

function normalizeRouteId(routeIdOrNumber) {
  if (typeof routeIdOrNumber === "number") return routeIdFor(routeIdOrNumber);
  const raw = text(routeIdOrNumber);
  const match = raw.match(/^route-(\d+)$/i) || raw.match(/^(\d+)$/);
  assert(match, `Invalid route id: ${raw || "(empty)"}.`);
  return routeIdFor(Number(match[1]));
}

function hashSeed(seed) {
  let hash = 2166136261;
  for (const char of text(seed, "rival-saga-v2-route-seed")) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function createRng(seed) {
  let state = hashSeed(seed) || 1;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function chooseOne(entries, rng) {
  assert(entries.length, "Cannot choose from an empty list.");
  return entries[Math.floor(rng() * entries.length)];
}

function routePopulationSize(rng, options = {}) {
  const explicit = Number(options.populationSize || 0);
  if (explicit) {
    assert(explicit >= DEFAULT_ROUTE_POPULATION_MIN && explicit <= DEFAULT_ROUTE_POPULATION_MAX, "Route population size must stay in the approved 20-30 resident range.");
    return explicit;
  }
  const min = DEFAULT_ROUTE_POPULATION_MIN;
  const max = DEFAULT_ROUTE_POPULATION_MAX;
  return min + Math.floor(rng() * (max - min + 1));
}

function weightedChoice(entries, rng, weightForEntry = (entry) => entry.weight) {
  const weighted = entries
    .map((entry) => ({ entry, weight: Math.max(0, Number(weightForEntry(entry) || 0)) }))
    .filter((entry) => entry.weight > 0);
  assert(weighted.length, "Cannot choose from a weighted list with no positive weights.");
  const total = weighted.reduce((sum, entry) => sum + entry.weight, 0);
  let roll = rng() * total;
  for (const entry of weighted) {
    roll -= entry.weight;
    if (roll <= 0) return entry.entry;
  }
  return weighted[weighted.length - 1].entry;
}

function normalizeTierDistribution(distribution, routeNumber) {
  const entries = Array.isArray(distribution)
    ? distribution
    : Object.entries(distribution || {}).map(([tierId, weight]) => ({ tierId, weight }));
  const normalized = entries.map((entry) => ({
    tierId: slugify(entry.tierId || entry.id || entry.battleTierId || entry[0]),
    weight: Number(entry.weight ?? entry.percent ?? entry.percentage ?? entry[1] ?? 0)
  })).filter((entry) => entry.tierId);
  assert(normalized.length, `Route ${routeNumber} needs at least one tier distribution entry.`);
  const total = normalized.reduce((sum, entry) => sum + Math.max(0, entry.weight), 0);
  assert(total > 0, `Route ${routeNumber} tier distribution needs positive total weight.`);
  return normalized;
}

function clampRouteCurve(routeNumber) {
  return Math.max(3, Math.min(9, Number(routeNumber)));
}

function routeQualityById(qualityId) {
  const id = slugify(qualityId || "normal");
  const quality = ROUTE_QUALITY_TABLE.find((entry) => entry.id === id);
  assert(quality, `Unknown Route Quality: ${qualityId}.`);
  return quality;
}

function resolveRouteQuality(routeNumber, options = {}) {
  const baseCurveRoute = Number(routeNumber);
  if (baseCurveRoute < 3) return null;
  const forced = options.routeQualityByRoute?.[baseCurveRoute] ?? options.routeQualities?.[baseCurveRoute];
  const quality = forced ? routeQualityById(forced) : weightedChoice(ROUTE_QUALITY_TABLE, options.rng || createRng(`${options.seed || ""}:route-quality:${baseCurveRoute}`));
  const appliedCurveRoute = clampRouteCurve(baseCurveRoute + quality.shift);
  return {
    id: quality.id,
    label: quality.label,
    shift: quality.shift,
    baseCurveRoute,
    appliedCurveRoute
  };
}

function effectiveDistributionForRoute(routeNumber, options = {}) {
  const distributions = options.routeTierPlan || options.routeTierDistributions || DEFAULT_ROUTE_TIER_PLAN;
  const routeQuality = routeNumber >= 3
    ? resolveRouteQuality(routeNumber, {
        rng: options.rng,
        seed: options.seed,
        routeQualityByRoute: options.routeQualityByRoute,
        routeQualities: options.routeQualities
      })
    : null;
  const distributionRoute = routeQuality?.appliedCurveRoute || routeNumber;
  const distribution = normalizeTierDistribution(distributions[distributionRoute], distributionRoute);
  return {
    routeQuality,
    distributionRoute,
    distribution
  };
}

function normalizeTypes(entry = {}) {
  const source = Array.isArray(entry.types)
    ? entry.types
    : [entry.primaryType, entry.secondaryType, entry.type1, entry.type2];
  return [...new Set(source.map((type) => text(type)).filter(Boolean))];
}

function normalizeBattleTier(entry = {}) {
  const id = slugify(entry.battleTierId || entry.balanceTier || entry.battleTier?.id || entry.tierId || entry.tier);
  assert(id, `Pokemon catalog entry ${entry.displayName || entry.name || "(unknown)"} is missing a Battle Tier.`);
  return {
    id,
    label: text(entry.battleTierLabel || entry.balanceTierLabel || entry.battleTier?.label || entry.tierLabel, id),
    order: Number(entry.battleTierOrder || entry.balanceTierOrder || entry.battleTier?.order || entry.tierOrder || 0)
  };
}

function normalizePokemonCatalog(rows = []) {
  assert(Array.isArray(rows), "Pokemon catalog must be an array.");
  return rows.map((entry) => {
    const displayName = text(entry.displayName || entry.name || entry.pokemonName);
    assert(displayName, "Pokemon catalog entries need a displayName or name.");
    const speciesId = slugify(entry.speciesId || entry.speciesKey || entry.key || entry.pokeapiKey || displayName);
    const types = normalizeTypes(entry);
    const battleTier = normalizeBattleTier(entry);
    return {
      speciesId,
      displayName,
      battleTier,
      types,
      primaryType: text(entry.primaryType || types[0]),
      regionalIdentity: cloneJson(entry.regionalIdentity || {}),
      source: {
        kind: text(entry.sourceKind || entry.source?.kind, "regional-generator"),
        sourceId: text(entry.sourceId || entry.source?.sourceId || speciesId)
      }
    };
  });
}

function groupCatalogByTier(catalog) {
  const tiers = new Map();
  catalog.forEach((entry) => {
    if (!tiers.has(entry.battleTier.id)) tiers.set(entry.battleTier.id, []);
    tiers.get(entry.battleTier.id).push(entry);
  });
  return tiers;
}

function sampleCatalogEntryForTier({ catalog, tierBuckets, tierId, rng, usedSpeciesIds, crossRouteSpeciesCounts, seriesRegion = "", regionalVarianceRules = regionalVariance.REGIONAL_VARIANCE_RULES, applyRegionalVariance = true }) {
  const preferred = tierBuckets.get(tierId) || [];
  const tierPool = preferred.filter((entry) => !usedSpeciesIds.has(entry.speciesId));
  assert(preferred.length, `Pokemon catalog is missing entries for Battle Tier ${tierId}.`);
  assert(tierPool.length, `Pokemon catalog does not have enough unique ${tierId} species for this Route.`);
  const regionalContext = regionalVariance.regionalVarianceContext({ seriesRegion, candidates: tierPool });
  const choice = weightedChoice(tierPool, rng, (entry) => {
    const priorRouteCount = Number(crossRouteSpeciesCounts.get(entry.speciesId) || 0);
    const regional = applyRegionalVariance
      ? regionalVariance.getRegionalVarianceWeight({ seriesRegion, candidate: entry, context: regionalContext, rules: regionalVarianceRules })
      : { weight: 1 };
    return Number(regional.weight || 1) * regionalVariance.repeatSuppressionWeight(priorRouteCount, regionalVarianceRules);
  });
  const priorRouteCount = Number(crossRouteSpeciesCounts.get(choice.speciesId) || 0);
  const regionalSelection = applyRegionalVariance
    ? regionalVariance.getRegionalVarianceWeight({ seriesRegion, candidate: choice, context: regionalContext, rules: regionalVarianceRules })
    : {
        weight: 1,
        regionalClass: "not-applied",
        configuredClass: "not-applied",
        rulesId: regionalVarianceRules?.id || "regional-variance-unconfigured",
        rulesStatus: regionalVarianceRules?.status || "unresolved"
      };
  choice.__routeSelectionProvenance = {
    regionalVariance: regionalSelection,
    repeatPenalty: regionalVariance.repeatSuppressionWeight(priorRouteCount, regionalVarianceRules),
    priorRouteCount
  };
  usedSpeciesIds.add(choice.speciesId);
  crossRouteSpeciesCounts.set(choice.speciesId, Number(crossRouteSpeciesCounts.get(choice.speciesId) || 0) + 1);
  return choice;
}

function generateRouteResidents({ routeNumber, routeId, catalog, tierBuckets, distribution, populationSize, rng, crossRouteSpeciesCounts, usedSpeciesIds = new Set(), seriesRegion = "", regionalVarianceRules }) {
  const chosen = [];
  while (chosen.length < populationSize) {
    const tier = weightedChoice(distribution, rng);
    chosen.push(sampleCatalogEntryForTier({
      catalog,
      tierBuckets,
      tierId: tier.tierId,
      rng,
      usedSpeciesIds,
      crossRouteSpeciesCounts,
      seriesRegion,
      regionalVarianceRules,
      applyRegionalVariance: true
    }));
  }
  assert(
    chosen.length >= 20 && chosen.length <= 30,
    `${routeIdFor(routeNumber)} generated ${chosen.length} residents; expected approximately 20-30.`
  );
  return chosen.map((entry, index) => createResident(routeId, index, entry));
}

function generatePremiumRouteResidents({ routeNumber, routeId, tierBuckets, rng, usedSpeciesIds, crossRouteSpeciesCounts, startIndex, premiumTierPlan, regionalVarianceRules }) {
  const distribution = normalizeTierDistribution(
    (premiumTierPlan || DEFAULT_ROUTE_PREMIUM_TIER_PLAN)[routeNumber] || DEFAULT_ROUTE_PREMIUM_TIER_PLAN[DEFAULT_ROUTE_COUNT],
    routeNumber
  );
  const chosen = [];
  while (chosen.length < DEFAULT_ROUTE_PREMIUM_RESIDENT_COUNT) {
    const tier = weightedChoice(distribution, rng);
    chosen.push(sampleCatalogEntryForTier({
      tierBuckets,
      tierId: tier.tierId,
      rng,
      usedSpeciesIds,
      crossRouteSpeciesCounts,
      regionalVarianceRules,
      applyRegionalVariance: false
    }));
  }
  return chosen.map((entry, index) => createResident(routeId, startIndex + index, entry, {
    slotKind: "premium",
    premium: true,
    encounterWeight: DEFAULT_ROUTE_PREMIUM_ENCOUNTER_WEIGHT,
    source: {
      ...entry.source,
      kind: "premium-route-resident",
      sourceId: entry.speciesId,
      premiumTierTable: "v2-route-premium-draft"
    }
  }));
}

function createResident(routeId, index, catalogEntry, metadata = {}) {
  return {
    residentId: metadata.residentId || `${routeId}:resident:${pad3(index + 1)}`,
    routeId,
    permanent: metadata.permanent !== false,
    slotKind: metadata.slotKind || "normal",
    premium: Boolean(metadata.premium),
    encounterWeight: Number(metadata.encounterWeight || 1),
    speciesId: catalogEntry.speciesId,
    displayName: catalogEntry.displayName,
    battleTier: cloneJson(catalogEntry.battleTier),
    primaryType: catalogEntry.primaryType || "",
    types: cloneJson(catalogEntry.types || []),
    regionalIdentity: cloneJson(catalogEntry.regionalIdentity || {}),
    generationProvenance: {
      source: metadata.premium ? "premium-route-resident" : "normal-route-resident",
      regionalVariance: cloneJson(catalogEntry.__routeSelectionProvenance?.regionalVariance || {}),
      repeatPenalty: Number(catalogEntry.__routeSelectionProvenance?.repeatPenalty || 1),
      priorRouteCount: Number(catalogEntry.__routeSelectionProvenance?.priorRouteCount || 0)
    },
    source: cloneJson(metadata.source || catalogEntry.source || { kind: "regional-generator", sourceId: catalogEntry.speciesId })
  };
}

function createV2RouteSeriesState(options = {}) {
  const catalog = normalizePokemonCatalog(options.pokemonCatalog || []);
  assert(catalog.length, "Route generation requires a Pokemon catalog.");
  const routeCount = Number(options.routeCount || DEFAULT_ROUTE_COUNT);
  assert(routeCount === DEFAULT_ROUTE_COUNT, `V2 currently supports exactly ${DEFAULT_ROUTE_COUNT} Routes.`);
  const rng = createRng(options.seed || options.seriesId || "rival-saga-v2-routes");
  const seriesRegion = regionalVariance.normalizeSeriesRegion(options.seriesRegion || options.seriesId || "");
  const regionalVarianceRules = options.regionalVarianceRules || regionalVariance.REGIONAL_VARIANCE_RULES;
  const tierBuckets = groupCatalogByTier(catalog);
  const crossRouteSpeciesCounts = new Map();
  const routes = [];
  for (let routeNumber = 1; routeNumber <= routeCount; routeNumber += 1) {
    const routeId = routeIdFor(routeNumber);
    const { routeQuality, distributionRoute, distribution } = effectiveDistributionForRoute(routeNumber, {
      rng,
      seed: options.seed || options.seriesId,
      routeTierPlan: options.routeTierPlan,
      routeTierDistributions: options.routeTierDistributions,
      routeQualityByRoute: options.routeQualityByRoute,
      routeQualities: options.routeQualities
    });
    const populationSize = routePopulationSize(rng, options);
    const usedSpeciesIds = new Set();
    const residents = generateRouteResidents({
      routeNumber,
      routeId,
      catalog,
      tierBuckets,
      distribution,
      populationSize,
      rng,
      crossRouteSpeciesCounts,
      usedSpeciesIds,
      seriesRegion,
      regionalVarianceRules
    });
    const premiumResidents = generatePremiumRouteResidents({
      routeNumber,
      routeId,
      tierBuckets,
      rng,
      usedSpeciesIds,
      crossRouteSpeciesCounts,
      startIndex: residents.length,
      premiumTierPlan: options.premiumTierPlan || options.routePremiumTierPlan,
      regionalVarianceRules
    });
    residents.push(...premiumResidents);
    routes.push({
      routeId,
      routeNumber,
      ...(routeQuality ? { routeQuality } : {}),
      generation: {
        source: "approved-v2-route-distribution",
        seriesRegion,
        regionalVariance: {
          rulesId: regionalVarianceRules.id,
          status: regionalVarianceRules.status,
          appliesToPremiumResidents: false
        },
        populationSize,
        normalPopulationSize: populationSize,
        premiumResidentCount: premiumResidents.length,
        premiumTierDistribution: cloneJson((options.premiumTierPlan || options.routePremiumTierPlan || DEFAULT_ROUTE_PREMIUM_TIER_PLAN)[routeNumber]),
        premiumEncounterWeight: DEFAULT_ROUTE_PREMIUM_ENCOUNTER_WEIGHT,
        distributionRoute,
        tierDistribution: cloneJson(distribution)
      },
      premiumResidentIds: premiumResidents.map((resident) => resident.residentId),
      residents,
      publicDiscoveryResidentIds: [],
      privateKnowledgeByPlayerId: {},
      suppressions: [],
      pendingEncounterOpportunities: [],
      encounterResults: [],
      finalizedAcquisitions: []
    });
  }
  return {
    schemaVersion: ROUTE_ENGINE_SCHEMA_VERSION,
    actionPhaseVersion: ACTION_PHASE_VERSION_V2,
    seriesId: text(options.seriesId, "series-v2"),
    seed: text(options.seed || options.seriesId, "rival-saga-v2-routes"),
    revision: 0,
    counters: {
      opportunity: 0,
      result: 0,
      suppression: 0,
      acquisition: 0,
      temporaryResident: 0
    },
    duplicatePreferencesByPlayerId: {},
    routes
  };
}

function nextCounterId(state, key, prefix) {
  state.counters ||= {};
  state.counters[key] = Number(state.counters[key] || 0) + 1;
  return `${prefix}-${pad3(state.counters[key])}`;
}

function findRoute(state, routeIdOrNumber) {
  const routeId = normalizeRouteId(routeIdOrNumber);
  const route = (state.routes || []).find((entry) => entry.routeId === routeId);
  assert(route, `Route not found: ${routeId}.`);
  return route;
}

function findResident(route, residentId) {
  return (route.residents || []).find((entry) => entry.residentId === residentId) || null;
}

function publicDiscoverySet(route) {
  return new Set(route.publicDiscoveryResidentIds || []);
}

function privateKnowledgeSet(route, playerId) {
  return new Set(route.privateKnowledgeByPlayerId?.[playerId] || []);
}

function playerKnowsPermanentResident(route, resident, playerId) {
  if (!resident || resident.permanent === false) return false;
  return publicDiscoverySet(route).has(resident.residentId) || privateKnowledgeSet(route, playerId).has(resident.residentId);
}

function normalizeDuplicatePreferenceState(value = {}) {
  const source = value && typeof value === "object" ? value : {};
  const byPlayer = {};
  Object.entries(source).forEach(([playerId, routeMap]) => {
    const normalizedPlayerId = text(playerId);
    if (!normalizedPlayerId || !routeMap || typeof routeMap !== "object") return;
    Object.entries(routeMap).forEach(([routeId, residentMap]) => {
      const normalizedRouteId = text(routeId);
      if (!normalizedRouteId || !residentMap || typeof residentMap !== "object") return;
      Object.entries(residentMap).forEach(([residentId, preference]) => {
        const normalizedResidentId = text(residentId);
        if (!normalizedResidentId || !preference || typeof preference !== "object") return;
        if (preference.enabled !== false) return;
        byPlayer[normalizedPlayerId] ||= {};
        byPlayer[normalizedPlayerId][normalizedRouteId] ||= {};
        byPlayer[normalizedPlayerId][normalizedRouteId][normalizedResidentId] = {
          playerId: normalizedPlayerId,
          routeId: normalizedRouteId,
          residentId: normalizedResidentId,
          speciesId: text(preference.speciesId),
          enabled: false,
          updatedAt: text(preference.updatedAt)
        };
      });
    });
  });
  return byPlayer;
}

function duplicatePreferenceRecord(state, playerId, routeId, residentId) {
  return state.duplicatePreferencesByPlayerId?.[text(playerId)]?.[text(routeId)]?.[text(residentId)] || null;
}

function routeDuplicatePreference(state, options = {}) {
  const route = findRoute(state, options.routeId ?? options.routeNumber);
  const residentId = text(options.residentId);
  const resident = findResident(route, residentId);
  assert(resident, `Resident ${residentId || "(empty)"} is not part of ${route.routeId}.`);
  const record = duplicatePreferenceRecord(state, options.playerId, route.routeId, resident.residentId);
  return {
    playerId: text(options.playerId),
    routeId: route.routeId,
    residentId: resident.residentId,
    speciesId: resident.speciesId,
    enabled: record?.enabled !== false,
    defaulted: !record,
    record: record ? cloneJson(record) : null
  };
}

function setRouteDuplicatePreference(state, options = {}) {
  const next = cloneJson(state);
  next.duplicatePreferencesByPlayerId = normalizeDuplicatePreferenceState(next.duplicatePreferencesByPlayerId);
  const route = findRoute(next, options.routeId ?? options.routeNumber);
  const playerId = text(options.playerId);
  const residentId = text(options.residentId);
  const resident = findResident(route, residentId);
  assert(playerId, "Duplicate preference requires a playerId.");
  assert(resident, `Resident ${residentId || "(empty)"} is not part of ${route.routeId}.`);
  assert(resident.permanent !== false, "Duplicate preference can only target permanent Route residents.");
  const enabled = options.enabled !== false;
  if (!enabled) {
    assert(playerKnowsPermanentResident(route, resident, playerId), "Duplicate OFF requires that player to know the Route resident.");
    assert(playerOwnsSpecies(options.ownedPokemon || [], [resident.speciesId, resident.displayName]), "Duplicate OFF requires that player to own the Route resident species.");
  }
  next.duplicatePreferencesByPlayerId[playerId] ||= {};
  next.duplicatePreferencesByPlayerId[playerId][route.routeId] ||= {};
  if (enabled) {
    delete next.duplicatePreferencesByPlayerId[playerId][route.routeId][resident.residentId];
    if (!Object.keys(next.duplicatePreferencesByPlayerId[playerId][route.routeId]).length) delete next.duplicatePreferencesByPlayerId[playerId][route.routeId];
    if (!Object.keys(next.duplicatePreferencesByPlayerId[playerId]).length) delete next.duplicatePreferencesByPlayerId[playerId];
  } else {
    next.duplicatePreferencesByPlayerId[playerId][route.routeId][resident.residentId] = {
      playerId,
      routeId: route.routeId,
      residentId: resident.residentId,
      speciesId: text(options.speciesId || resident.speciesId),
      enabled: false,
      updatedAt: text(options.updatedAt)
    };
  }
  bumpRevision(next);
  return {
    state: next,
    preference: routeDuplicatePreference(next, { playerId, routeId: route.routeId, residentId: resident.residentId })
  };
}

function duplicatePreferenceFiltersResident(state, resident, options = {}) {
  if (!resident || resident.permanent === false) return false;
  const playerId = text(options.playerId);
  if (!playerId) return false;
  const record = duplicatePreferenceRecord(state, playerId, resident.routeId, resident.residentId);
  if (record?.enabled !== false) return false;
  return playerOwnsSpecies(options.ownedPokemon || [], [resident.speciesId, resident.displayName]);
}

function getRouteDuplicatePreferenceControls(state, options = {}) {
  const route = findRoute(state, options.routeId ?? options.routeNumber);
  const playerId = text(options.playerId);
  if (!playerId) return [];
  const knownResidentIds = new Set([...publicDiscoverySet(route), ...privateKnowledgeSet(route, playerId)]);
  return (route.residents || [])
    .filter((resident) => resident.permanent !== false && knownResidentIds.has(resident.residentId))
    .filter((resident) => playerOwnsSpecies(options.ownedPokemon || [], [resident.speciesId, resident.displayName]))
    .map((resident) => {
      const preference = routeDuplicatePreference(state, { playerId, routeId: route.routeId, residentId: resident.residentId });
      return {
        playerId,
        routeId: route.routeId,
        routeNumber: route.routeNumber,
        residentId: resident.residentId,
        speciesId: resident.speciesId,
        displayName: resident.displayName,
        slotKind: resident.slotKind === "premium" || resident.premium === true ? "premium" : "normal",
        premium: resident.slotKind === "premium" || resident.premium === true,
        duplicateEnabled: preference.enabled,
        defaulted: preference.defaulted
      };
    });
}

function bumpRevision(state) {
  state.revision = Number(state.revision || 0) + 1;
}

function revealResidentToTable(state, routeIdOrNumber, residentId) {
  const next = cloneJson(state);
  const route = findRoute(next, routeIdOrNumber);
  assert(findResident(route, residentId), `Resident ${residentId} is not part of ${route.routeId}.`);
  const known = publicDiscoverySet(route);
  known.add(residentId);
  route.publicDiscoveryResidentIds = [...known].sort();
  bumpRevision(next);
  return next;
}

function revealResidentToPlayer(state, routeIdOrNumber, residentId, playerId) {
  assert(text(playerId), "Private reveal requires a playerId.");
  const next = cloneJson(state);
  const route = findRoute(next, routeIdOrNumber);
  assert(findResident(route, residentId), `Resident ${residentId} is not part of ${route.routeId}.`);
  route.privateKnowledgeByPlayerId ||= {};
  const known = privateKnowledgeSet(route, playerId);
  known.add(residentId);
  route.privateKnowledgeByPlayerId[playerId] = [...known].sort();
  bumpRevision(next);
  return next;
}

function createRouteEncounterOpportunity(state, options = {}) {
  const next = cloneJson(state);
  const route = findRoute(next, options.routeId ?? options.routeNumber);
  const kind = text(options.kind || options.source?.kind, "normal-route-action");
  if (kind === "extra-encounter-token") {
    const currentProgressionRoute = Number(options.currentProgressionRoute || options.currentGym || 0);
    assert(currentProgressionRoute >= route.routeNumber, "Extra Encounter Token cannot target a Route above current progression.");
  }
  const opportunity = {
    opportunityId: nextCounterId(next, "opportunity", "route-opportunity"),
    status: "pending",
    playerId: text(options.playerId),
    routeId: route.routeId,
    routeNumber: route.routeNumber,
    kind,
    source: cloneJson(options.source || {}),
    encounterCount: 1,
    temporaryResidents: [],
    createdRevision: Number(next.revision || 0),
    consumedByResultId: ""
  };
  assert(opportunity.playerId, "Route encounter opportunity requires a playerId.");
  route.pendingEncounterOpportunities.push(opportunity);
  bumpRevision(next);
  return { state: next, opportunity };
}

function grantExtraEncounterOpportunity(state, options = {}) {
  return createRouteEncounterOpportunity(state, {
    ...options,
    kind: "extra-encounter-token",
    source: {
      kind: "extra-encounter-token",
      purchasePrice: EXTRA_ENCOUNTER_TOKEN_PRICE,
      freelyPurchasable: true,
      storable: true,
      encounterCount: 1,
      tokenInventoryId: text(options.tokenInventoryId),
      sourceEffectId: text(options.sourceEffectId)
    }
  });
}

function activeSuppressedResidentIds(route) {
  const ids = new Set();
  (route.suppressions || [])
    .filter((entry) => entry.status !== "expired" && entry.status !== "removed")
    .forEach((entry) => (entry.residentIds || []).forEach((residentId) => ids.add(residentId)));
  return ids;
}

function getEligibleRouteResidents(state, options = {}) {
  const route = findRoute(state, options.routeId ?? options.routeNumber);
  const suppressed = activeSuppressedResidentIds(route);
  const exclude = new Set(options.excludeResidentIds || []);
  const permanent = (route.residents || []).filter((resident) => (
    !suppressed.has(resident.residentId)
    && !exclude.has(resident.residentId)
    && !duplicatePreferenceFiltersResident(state, resident, options)
  ));
  const opportunity = options.opportunityId
    ? (route.pendingEncounterOpportunities || []).find((entry) => entry.opportunityId === options.opportunityId)
    : null;
  const temporary = (opportunity?.temporaryResidents || []).filter((resident) => !exclude.has(resident.residentId));
  return [...permanent, ...temporary];
}

function findOpportunity(state, opportunityId) {
  for (const route of state.routes || []) {
    const opportunity = (route.pendingEncounterOpportunities || []).find((entry) => entry.opportunityId === opportunityId);
    if (opportunity) return { route, opportunity };
  }
  throw new Error(`Route encounter opportunity not found: ${opportunityId}.`);
}

function resultRevisionFromResident({ resident, revisionNumber, reason, source }) {
  return {
    revisionNumber,
    residentId: resident.residentId,
    permanentResident: resident.permanent !== false,
    speciesId: resident.speciesId,
    displayName: resident.displayName,
    battleTier: cloneJson(resident.battleTier),
    primaryType: resident.primaryType || "",
    types: cloneJson(resident.types || []),
    slotKind: resident.slotKind === "premium" || resident.premium === true ? "premium" : "normal",
    premium: resident.slotKind === "premium" || resident.premium === true,
    source: cloneJson(resident.source || {}),
    reason: text(reason, revisionNumber === 1 ? "initial-draw" : "reroll"),
    sourceEffectId: text(source?.sourceEffectId),
    sourceTokenId: text(source?.sourceTokenId || source?.tokenInventoryId),
    supersedesRevision: revisionNumber > 1 ? revisionNumber - 1 : null
  };
}

function chooseEligibleResident(state, route, options = {}) {
  const eligible = getEligibleRouteResidents(state, {
    routeId: route.routeId,
    opportunityId: options.opportunityId,
    excludeResidentIds: options.excludeResidentIds || [],
    playerId: options.playerId,
    ownedPokemon: options.ownedPokemon || []
  });
  assert(eligible.length, `No eligible residents remain on ${route.routeId}.`);
  if (options.residentId) {
    const selected = eligible.find((resident) => resident.residentId === options.residentId);
    assert(selected, `Resident ${options.residentId} is not eligible on ${route.routeId}.`);
    return selected;
  }
  const rng = createRng(options.seed || `${state.seed}:${route.routeId}:${state.revision}:${eligible.length}`);
  return weightedChoice(eligible, rng, (resident) => resident.encounterWeight ?? 1);
}

function discoverPermanentResident(next, route, resident) {
  if (resident.permanent === false) return false;
  const known = publicDiscoverySet(route);
  const changed = !known.has(resident.residentId);
  known.add(resident.residentId);
  route.publicDiscoveryResidentIds = [...known].sort();
  return changed;
}

function drawRouteEncounter(state, options = {}) {
  const next = cloneJson(state);
  const { route, opportunity } = findOpportunity(next, options.opportunityId);
  assert(opportunity.status === "pending", "Route encounter opportunity is not pending.");
  const resident = chooseEligibleResident(next, route, {
    opportunityId: opportunity.opportunityId,
    playerId: opportunity.playerId,
    ownedPokemon: options.ownedPokemon || [],
    residentId: options.residentId,
    seed: options.seed
  });
  const resultId = nextCounterId(next, "result", "route-result");
  const publiclyDiscovered = discoverPermanentResident(next, route, resident);
  const result = {
    resultId,
    status: "unresolved",
    playerId: opportunity.playerId,
    routeId: route.routeId,
    routeNumber: route.routeNumber,
    opportunityId: opportunity.opportunityId,
    currentRevision: 1,
    revisions: [resultRevisionFromResident({ resident, revisionNumber: 1, reason: "initial-draw", source: opportunity.source })],
    publicDiscoveryEvents: publiclyDiscovered ? [{ revisionNumber: 1, residentId: resident.residentId }] : [],
    finalizedAcquisitionId: ""
  };
  opportunity.status = "consumed";
  opportunity.consumedByResultId = resultId;
  route.encounterResults.push(result);
  bumpRevision(next);
  return { state: next, result };
}

function currentResultRevision(result) {
  return (result.revisions || []).find((entry) => entry.revisionNumber === result.currentRevision) || result.revisions?.at(-1) || null;
}

function ownedPokemonIdentityKeys(entry) {
  if (typeof entry === "string") return [slugify(entry)];
  return [
    entry?.speciesId,
    entry?.canonicalSpeciesId,
    entry?.speciesKey,
    entry?.key,
    entry?.displayName,
    entry?.name,
    entry?.pokemonName
  ].map(slugify).filter(Boolean);
}

function normalizeOwnedSpeciesIds(ownedPokemon = []) {
  const rows = Array.isArray(ownedPokemon)
    ? ownedPokemon
    : [
        ...(ownedPokemon.pokemon || []),
        ...(ownedPokemon.pokemonRecords || []),
        ...(ownedPokemon.activePokemon || []),
        ...(ownedPokemon.pcPokemon || [])
      ];
  return new Set(rows
    .filter((entry) => (
      typeof entry === "string"
      || (!["Released", "Removed"].includes(entry?.status) && !["Released", "Removed"].includes(entry?.rosterType))
    ))
    .flatMap(ownedPokemonIdentityKeys));
}

function playerOwnsSpecies(ownedPokemon, speciesIdentity) {
  const owned = normalizeOwnedSpeciesIds(ownedPokemon);
  const targets = Array.isArray(speciesIdentity) ? speciesIdentity : [speciesIdentity];
  return targets.map(slugify).filter(Boolean).some((target) => owned.has(target));
}

function isPersonalDuplicateEncounterResult(state, options = {}) {
  const { result } = findRouteResult(state, options.resultId);
  const current = currentResultRevision(result);
  return Boolean(current && playerOwnsSpecies(options.ownedPokemon || [], [current.speciesId, current.displayName]));
}

function findRouteResult(state, resultId) {
  for (const route of state.routes || []) {
    const result = (route.encounterResults || []).find((entry) => entry.resultId === resultId);
    if (result) return { route, result };
  }
  throw new Error(`Route encounter result not found: ${resultId}.`);
}

function rerollRouteEncounterResult(state, options = {}) {
  const next = cloneJson(state);
  const { route, result } = findRouteResult(next, options.resultId);
  assert(result.status === "unresolved", "Only unresolved Route encounter results can be rerolled.");
  const current = currentResultRevision(result);
  assert(current, "Route encounter result has no current revision.");
  if (options.requireDuplicate) {
    assert(playerOwnsSpecies(options.ownedPokemon || [], [current.speciesId, current.displayName]), "Result is not a duplicate for the acting player's own collection.");
  }
  const nextRevisionNumber = Number(result.currentRevision || 1) + 1;
  const resident = chooseEligibleResident(next, route, {
    opportunityId: result.opportunityId,
    excludeResidentIds: [current.residentId],
    playerId: result.playerId,
    ownedPokemon: options.ownedPokemon || [],
    residentId: options.residentId,
    seed: options.seed
  });
  const publiclyDiscovered = discoverPermanentResident(next, route, resident);
  result.revisions.push(resultRevisionFromResident({
    resident,
    revisionNumber: nextRevisionNumber,
    reason: options.reason || (options.requireDuplicate ? "personal-duplicate-reroll" : "reroll"),
    source: options.source || {}
  }));
  result.currentRevision = nextRevisionNumber;
  if (publiclyDiscovered) {
    result.publicDiscoveryEvents ||= [];
    result.publicDiscoveryEvents.push({ revisionNumber: nextRevisionNumber, residentId: resident.residentId });
  }
  bumpRevision(next);
  return { state: next, result };
}

function applyRouteRepel(state, options = {}) {
  const next = cloneJson(state);
  const route = findRoute(next, options.routeId ?? options.routeNumber);
  const battleTierId = slugify(options.battleTierId || options.battleTier);
  assert(battleTierId, "Repel requires a Battle Tier.");
  const count = Number(options.count || DEFAULT_REPEL_SUPPRESSION_COUNT);
  const alreadySuppressed = activeSuppressedResidentIds(route);
  const candidates = (route.residents || []).filter((resident) => (
    resident.battleTier?.id === battleTierId && !alreadySuppressed.has(resident.residentId)
  ));
  assert(candidates.length >= count, `${route.routeId} has only ${candidates.length} unsuppressed ${battleTierId} residents; Repel requires ${count}.`);
  const rng = createRng(options.seed || `${next.seed}:${route.routeId}:repel:${battleTierId}:${next.revision}`);
  const selected = [];
  const pool = [...candidates];
  while (selected.length < count) {
    const choice = chooseOne(pool, rng);
    selected.push(choice);
    pool.splice(pool.indexOf(choice), 1);
  }
  const suppression = {
    suppressionId: nextCounterId(next, "suppression", "route-suppression"),
    routeId: route.routeId,
    battleTierId,
    residentIds: selected.map((resident) => resident.residentId).sort(),
    count,
    status: "active",
    source: cloneJson(options.source || { kind: "repel" }),
    createdRevision: Number(next.revision || 0)
  };
  route.suppressions.push(suppression);
  bumpRevision(next);
  return { state: next, suppression };
}

function removeRouteSuppression(state, suppressionId) {
  const next = cloneJson(state);
  for (const route of next.routes || []) {
    const suppression = (route.suppressions || []).find((entry) => entry.suppressionId === suppressionId);
    if (suppression) {
      suppression.status = "removed";
      bumpRevision(next);
      return { state: next, suppression };
    }
  }
  throw new Error(`Route suppression not found: ${suppressionId}.`);
}

function selectTemporaryInjectionResidents(options = {}) {
  const catalog = normalizePokemonCatalog(options.pokemonCatalog || []);
  const primaryType = text(options.primaryType);
  assert(primaryType, "Temporary injection requires a Primary Type.");
  const count = Number(options.count || 4);
  const battleTierIds = new Set((options.battleTierIds || []).map(slugify).filter(Boolean));
  const candidates = catalog.filter((entry) => (
    entry.primaryType.toLowerCase() === primaryType.toLowerCase()
    && (!battleTierIds.size || battleTierIds.has(entry.battleTier.id))
  ));
  assert(candidates.length >= count, `Only ${candidates.length} ${primaryType} Primary Type candidates are available; need ${count}.`);
  const rng = createRng(options.seed || `temporary-injection:${primaryType}`);
  const pool = [...candidates];
  const selected = [];
  while (selected.length < count) {
    const choice = chooseOne(pool, rng);
    selected.push(choice);
    pool.splice(pool.indexOf(choice), 1);
  }
  return selected.map((entry) => ({
    ...entry,
    source: {
      kind: "temporary-primary-type-injection",
      primaryType,
      sourceEffectId: text(options.sourceEffectId)
    }
  }));
}

function addTemporaryResidentsToOpportunity(state, options = {}) {
  const next = cloneJson(state);
  const { route, opportunity } = findOpportunity(next, options.opportunityId);
  assert(opportunity.status === "pending", "Temporary residents can only be added to a pending opportunity.");
  const residents = (options.residents || []).map((entry) => {
    const resident = createResident(route.routeId, next.counters.temporaryResident || 0, entry, {
      permanent: false,
      residentId: `temporary-resident-${pad3(Number(next.counters.temporaryResident || 0) + 1)}`,
      source: entry.source || { kind: "temporary-injection" }
    });
    nextCounterId(next, "temporaryResident", "temporary-resident");
    return resident;
  });
  assert(residents.length, "At least one temporary resident is required.");
  opportunity.temporaryResidents.push(...residents);
  bumpRevision(next);
  return { state: next, opportunity, residents };
}

function getMasterBallEligibleResidents(state, options = {}) {
  const playerId = text(options.playerId);
  assert(playerId, "Master Ball eligibility requires a playerId.");
  const route = findRoute(state, options.routeId ?? options.routeNumber);
  const known = new Set([
    ...publicDiscoverySet(route),
    ...privateKnowledgeSet(route, playerId)
  ]);
  return (route.residents || []).filter((resident) => known.has(resident.residentId));
}

function createMasterBallRouteResult(state, options = {}) {
  const next = cloneJson(state);
  const route = findRoute(next, options.routeId ?? options.routeNumber);
  const opportunityId = text(options.opportunityId);
  assert(opportunityId, "Master Ball requires a pending Route encounter opportunity.");
  const opportunity = (route.pendingEncounterOpportunities || []).find((entry) => entry.opportunityId === opportunityId);
  assert(opportunity, `Route encounter opportunity not found: ${opportunityId}.`);
  assert(opportunity.status === "pending", "Master Ball opportunity is not pending.");
  assert(opportunity.playerId === text(options.playerId), "Master Ball can only resolve the acting player's own pending opportunity.");
  const eligible = getMasterBallEligibleResidents(next, { routeId: route.routeId, playerId: options.playerId });
  const resident = eligible.find((entry) => entry.residentId === options.residentId);
  assert(resident, "Master Ball can only select a resident revealed to that player on that Route.");
  const resultId = nextCounterId(next, "result", "route-result");
  const result = {
    resultId,
    status: "unresolved",
    playerId: text(options.playerId),
    routeId: route.routeId,
    routeNumber: route.routeNumber,
    opportunityId,
    currentRevision: 1,
    revisions: [resultRevisionFromResident({
      resident,
      revisionNumber: 1,
      reason: "master-ball-selection",
      source: options.source || { kind: "master-ball" }
    })],
    publicDiscoveryEvents: [],
    finalizedAcquisitionId: "",
    selectionVisibility: {
      selectedFromKnownRouteResident: true,
      selectedFromPublicDiscovery: publicDiscoverySet(route).has(resident.residentId),
      selectedFromPrivateKnowledge: privateKnowledgeSet(route, options.playerId).has(resident.residentId)
    }
  };
  opportunity.status = "consumed";
  opportunity.consumedByResultId = resultId;
  route.encounterResults.push(result);
  bumpRevision(next);
  return { state: next, result };
}

function finalizeRouteEncounterAcquisition(state, options = {}) {
  const next = cloneJson(state);
  const { route, result } = findRouteResult(next, options.resultId);
  if (result.status === "finalized") {
    const existing = (route.finalizedAcquisitions || []).find((entry) => (
      entry.acquisitionId === result.finalizedAcquisitionId || entry.resultId === result.resultId
    ));
    assert(existing, "Finalized Route encounter result is missing its acquisition record.");
    return { state: next, acquisition: existing, result };
  }
  assert(result.status === "unresolved", "Only unresolved Route encounter results can be finalized.");
  const current = currentResultRevision(result);
  assert(current, "Route encounter result has no current revision.");
  const acquisition = {
    acquisitionId: text(options.acquisitionId) || nextCounterId(next, "acquisition", "route-acquisition"),
    resultId: result.resultId,
    revisionNumber: result.currentRevision,
    playerId: result.playerId,
    routeId: route.routeId,
    routeNumber: route.routeNumber,
    residentId: current.residentId,
    speciesId: current.speciesId,
    displayName: current.displayName,
    battleTier: cloneJson(current.battleTier),
    rosterPokemonId: text(options.rosterPokemonId),
    sourceLabel: "Route Encounter",
    finalizedRevision: Number(next.revision || 0)
  };
  result.status = "finalized";
  result.finalizedAcquisitionId = acquisition.acquisitionId;
  route.finalizedAcquisitions.push(acquisition);
  bumpRevision(next);
  return { state: next, acquisition, result };
}

module.exports = {
  ACTION_PHASE_VERSION_V2,
  ROUTE_ENGINE_SCHEMA_VERSION,
  DEFAULT_ROUTE_COUNT,
  DEFAULT_ROUTE_POPULATION_MIN,
  DEFAULT_ROUTE_POPULATION_MAX,
  DEFAULT_ROUTE_PREMIUM_RESIDENT_COUNT,
  DEFAULT_ROUTE_PREMIUM_ENCOUNTER_WEIGHT,
  DEFAULT_REPEL_SUPPRESSION_COUNT,
  EXTRA_ENCOUNTER_TOKEN_PRICE,
  PREMIUM_ROUTE_TIER_IDS,
  REGIONAL_VARIANCE_RULES: regionalVariance.REGIONAL_VARIANCE_RULES,
  SERIES_REGIONS: regionalVariance.SERIES_REGIONS,
  APPROVED_ROUTE_TIER_DISTRIBUTIONS,
  DEFAULT_ROUTE_TIER_PLAN,
  DEFAULT_ROUTE_PREMIUM_TIER_PLAN,
  ROUTE_QUALITY_TABLE,
  resolveRouteQuality,
  effectiveDistributionForRoute,
  normalizePokemonCatalog,
  createV2RouteSeriesState,
  createRouteEncounterOpportunity,
  grantExtraEncounterOpportunity,
  drawRouteEncounter,
  rerollRouteEncounterResult,
  isPersonalDuplicateEncounterResult,
  playerOwnsSpecies,
  routeDuplicatePreference,
  setRouteDuplicatePreference,
  getRouteDuplicatePreferenceControls,
  revealResidentToPlayer,
  revealResidentToTable,
  getEligibleRouteResidents,
  applyRouteRepel,
  removeRouteSuppression,
  selectTemporaryInjectionResidents,
  addTemporaryResidentsToOpportunity,
  getMasterBallEligibleResidents,
  createMasterBallRouteResult,
  finalizeRouteEncounterAcquisition
};
