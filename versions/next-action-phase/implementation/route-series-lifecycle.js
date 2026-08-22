"use strict";

const routeEngine = require("./route-encounter-engine.js");
const routeCatalog = require("./route-pokemon-catalog.js");

function cloneJson(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value));
}

function text(value, fallback = "") {
  const normalized = String(value ?? "").trim();
  return normalized || fallback;
}

function counterFromId(id) {
  const match = String(id || "").match(/-(\d+)$/);
  return match ? Number(match[1]) : 0;
}

function normalizeArray(value) {
  return Array.isArray(value) ? value : [];
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
        if (!normalizedResidentId || !preference || typeof preference !== "object" || preference.enabled !== false) return;
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

function deriveRouteCounters(routeState) {
  const counters = {
    opportunity: 0,
    result: 0,
    suppression: 0,
    acquisition: 0,
    temporaryResident: 0
  };
  normalizeArray(routeState.routes).forEach((route) => {
    normalizeArray(route.pendingEncounterOpportunities).forEach((opportunity) => {
      counters.opportunity = Math.max(counters.opportunity, counterFromId(opportunity.opportunityId));
      normalizeArray(opportunity.temporaryResidents).forEach((resident) => {
        counters.temporaryResident = Math.max(counters.temporaryResident, counterFromId(resident.residentId));
      });
    });
    normalizeArray(route.encounterResults).forEach((result) => {
      counters.result = Math.max(counters.result, counterFromId(result.resultId));
    });
    normalizeArray(route.suppressions).forEach((suppression) => {
      counters.suppression = Math.max(counters.suppression, counterFromId(suppression.suppressionId));
    });
    normalizeArray(route.finalizedAcquisitions).forEach((acquisition) => {
      counters.acquisition = Math.max(counters.acquisition, counterFromId(acquisition.acquisitionId));
    });
  });
  return counters;
}

function normalizeV2RouteEncounterState(routeState) {
  const next = cloneJson(routeState || {});
  next.schemaVersion = Number(next.schemaVersion || routeEngine.ROUTE_ENGINE_SCHEMA_VERSION);
  next.actionPhaseVersion = text(next.actionPhaseVersion, routeEngine.ACTION_PHASE_VERSION_V2);
  next.seriesId = text(next.seriesId, "series-v2");
  next.seed = text(next.seed || next.seriesId, "rival-saga-v2-routes");
  next.revision = Number(next.revision || 0);
  next.duplicatePreferencesByPlayerId = normalizeDuplicatePreferenceState(next.duplicatePreferencesByPlayerId);
  next.routes = normalizeArray(next.routes).map((route) => {
    const persistedPremiumIds = new Set(normalizeArray(route.premiumResidentIds));
    return {
      ...route,
      residents: normalizeArray(route.residents).map((resident) => {
        const premium = resident.slotKind === "premium" || resident.premium === true || persistedPremiumIds.has(resident.residentId);
      return {
        ...resident,
        slotKind: premium ? "premium" : "normal",
        premium,
        encounterWeight: Number(resident.encounterWeight || (premium ? routeEngine.DEFAULT_ROUTE_PREMIUM_ENCOUNTER_WEIGHT : 1))
      };
      }),
      publicDiscoveryResidentIds: normalizeArray(route.publicDiscoveryResidentIds),
      privateKnowledgeByPlayerId: route.privateKnowledgeByPlayerId && typeof route.privateKnowledgeByPlayerId === "object"
        ? route.privateKnowledgeByPlayerId
        : {},
      suppressions: normalizeArray(route.suppressions),
      pendingEncounterOpportunities: normalizeArray(route.pendingEncounterOpportunities),
      encounterResults: normalizeArray(route.encounterResults),
      finalizedAcquisitions: normalizeArray(route.finalizedAcquisitions)
    };
  }).map((route) => ({
    ...route,
    premiumResidentIds: route.residents.filter((resident) => resident.premium).map((resident) => resident.residentId)
  }));
  const derived = deriveRouteCounters(next);
  next.counters = {
    opportunity: Math.max(Number(next.counters?.opportunity || 0), derived.opportunity),
    result: Math.max(Number(next.counters?.result || 0), derived.result),
    suppression: Math.max(Number(next.counters?.suppression || 0), derived.suppression),
    acquisition: Math.max(Number(next.counters?.acquisition || 0), derived.acquisition),
    temporaryResident: Math.max(Number(next.counters?.temporaryResident || 0), derived.temporaryResident)
  };
  return next;
}

function ensureV2RouteStateBucket(state) {
  state.v2 ||= {};
  state.v2.routeEncounterBySeriesId ||= {};
  return state.v2.routeEncounterBySeriesId;
}

function initializeV2Series(gameState = {}, options = {}) {
  const next = cloneJson(gameState);
  const seriesId = text(options.seriesId || next.seriesId || next.series || next.ruleset?.seriesId, "series-v2");
  const seed = text(options.seed || next.seriesSeed || `${seriesId}:route-encounters`, `${seriesId}:route-encounters`);
  const bucket = ensureV2RouteStateBucket(next);
  if (bucket[seriesId]) {
    bucket[seriesId] = normalizeV2RouteEncounterState(bucket[seriesId]);
    return {
      state: next,
      routeState: bucket[seriesId],
      created: false,
      catalogReport: null,
      catalogValidation: null
    };
  }

  const { catalog, report } = routeCatalog.buildV2RoutePokemonCatalog({
    projectRoot: options.projectRoot,
    data: options.data
  });
  const validation = routeCatalog.validateV2RoutePokemonCatalog(catalog);
  if (!validation.ok) {
    const error = new Error(`V2 Route Pokemon catalog is invalid: ${validation.errors.slice(0, 10).join("; ")}`);
    error.validation = validation;
    error.catalogReport = report;
    throw error;
  }

  const routeState = routeEngine.createV2RouteSeriesState({
    seriesId,
    seed,
    pokemonCatalog: catalog,
    seriesRegion: seriesId,
    regionalVarianceRules: options.regionalVarianceRules,
    populationSize: options.populationSize
  });
  bucket[seriesId] = normalizeV2RouteEncounterState(routeState);
  next.v2.activeRouteEncounterSeriesId = seriesId;
  return {
    state: next,
    routeState: bucket[seriesId],
    created: true,
    catalogReport: report,
    catalogValidation: validation
  };
}

function serializeAndReloadV2RouteState(routeState) {
  return normalizeV2RouteEncounterState(JSON.parse(JSON.stringify(routeState)));
}

module.exports = {
  normalizeV2RouteEncounterState,
  initializeV2Series,
  serializeAndReloadV2RouteState
};
