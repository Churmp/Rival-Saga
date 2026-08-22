"use strict";

const routeEngine = require("./route-encounter-engine.js");
const routeCatalog = require("./route-pokemon-catalog.js");
const regionalVariance = require("./route-regional-variance.js");

function tierCountsForResidents(residents = []) {
  return residents.reduce((counts, resident) => {
    const tierId = resident.battleTier?.id || "unknown";
    counts[tierId] = Number(counts[tierId] || 0) + 1;
    return counts;
  }, {});
}

function duplicateSpeciesInRoute(route) {
  const seen = new Set();
  const duplicates = new Set();
  (route.residents || []).forEach((resident) => {
    if (seen.has(resident.speciesId)) duplicates.add(resident.speciesId);
    seen.add(resident.speciesId);
  });
  return [...duplicates].sort();
}

function repeatedSpeciesAcrossRoutes(routes = []) {
  const counts = new Map();
  routes.forEach((route) => {
    (route.residents || []).forEach((resident) => {
      if (!counts.has(resident.speciesId)) {
        counts.set(resident.speciesId, { speciesId: resident.speciesId, displayName: resident.displayName, count: 0, routes: [] });
      }
      const record = counts.get(resident.speciesId);
      record.count += 1;
      record.routes.push(route.routeId);
    });
  });
  return [...counts.values()].filter((entry) => entry.count > 1).sort((a, b) => b.count - a.count || a.speciesId.localeCompare(b.speciesId));
}

function regionalCompositionForResidents(residents = [], seriesRegion = "") {
  const normalResidents = residents.filter((resident) => !resident.premium);
  const featured = normalResidents.filter((resident) => (
    regionalVariance.regionalVarianceClass(seriesRegion, resident.regionalIdentity) === "featured-region"
  ));
  const byRegion = {};
  normalResidents.forEach((resident) => {
    const region = resident.regionalIdentity?.regionalOrigin || resident.regionalIdentity?.debutRegion || "Unresolved";
    byRegion[region] = Number(byRegion[region] || 0) + 1;
  });
  return {
    totalNormalResidents: normalResidents.length,
    featuredRegionResidents: featured.length,
    featuredRegionPercent: normalResidents.length ? featured.length / normalResidents.length : 0,
    otherRegionResidents: normalResidents.length - featured.length,
    otherRegionPercent: normalResidents.length ? (normalResidents.length - featured.length) / normalResidents.length : 0,
    byRegion
  };
}

function regionalBaselineForTierCounts(catalog = [], tierCounts = {}, seriesRegion = "") {
  const byTier = new Map();
  catalog.forEach((entry) => {
    const tierId = entry.battleTierId || entry.balanceTier || entry.battleTier?.id || "unknown";
    if (!byTier.has(tierId)) byTier.set(tierId, { total: 0, featured: 0 });
    const record = byTier.get(tierId);
    record.total += 1;
    if (regionalVariance.regionalVarianceClass(seriesRegion, entry.regionalIdentity) === "featured-region") {
      record.featured += 1;
    }
  });
  let expectedFeaturedResidents = 0;
  let totalResidents = 0;
  Object.entries(tierCounts || {}).forEach(([tierId, count]) => {
    const residentCount = Number(count || 0);
    const record = byTier.get(tierId);
    if (!record?.total || !residentCount) return;
    expectedFeaturedResidents += residentCount * (record.featured / record.total);
    totalResidents += residentCount;
  });
  return {
    expectedFeaturedResidents,
    totalNormalResidents: totalResidents,
    expectedFeaturedPercent: totalResidents ? expectedFeaturedResidents / totalResidents : 0
  };
}

function routeRegionalSummary(route, seriesRegion) {
  return regionalCompositionForResidents(route.residents || [], seriesRegion);
}

function generateV2RouteAudit(options = {}) {
  const seriesCount = Number(options.seriesCount || 25);
  const seedPrefix = options.seedPrefix || "v2-route-audit";
  const seriesRegions = Array.isArray(options.seriesRegions) && options.seriesRegions.length
    ? options.seriesRegions.map(regionalVariance.normalizeSeriesRegion).filter(Boolean)
    : regionalVariance.SERIES_REGIONS;
  const { catalog, report } = routeCatalog.buildV2RoutePokemonCatalog({
    projectRoot: options.projectRoot,
    data: options.data
  });
  const validation = routeCatalog.validateV2RoutePokemonCatalog(catalog);
  const series = [];
  const structuralFailures = [];

  for (const seriesRegion of seriesRegions) {
    for (let index = 0; index < seriesCount; index += 1) {
      const seed = `${seedPrefix}-${seriesRegion.toLowerCase()}-${index + 1}`;
      try {
        const routeState = routeEngine.createV2RouteSeriesState({
          seriesId: seriesRegion,
          seriesRegion,
          seed,
          pokemonCatalog: catalog
        });
        const routeSummaries = routeState.routes.map((route) => {
          const normalResidents = (route.residents || []).filter((resident) => !resident.premium);
          const normalTierCounts = tierCountsForResidents(normalResidents);
          const regionalComposition = routeRegionalSummary(route, seriesRegion);
          const unbiasedBaseline = regionalBaselineForTierCounts(catalog, normalTierCounts, seriesRegion);
          return {
            routeId: route.routeId,
            routeNumber: route.routeNumber,
            routeQuality: route.routeQuality || null,
            effectiveCurve: route.generation?.distributionRoute || route.routeNumber,
            residentCount: route.residents.length,
            normalResidentCount: normalResidents.length,
            premiumResidentCount: (route.residents || []).filter((resident) => resident.premium).length,
            tierCounts: tierCountsForResidents(route.residents),
            normalTierCounts,
            duplicateSpeciesIds: duplicateSpeciesInRoute(route),
            regionalComposition: {
              ...regionalComposition,
              unbiasedBaselinePercent: unbiasedBaseline.expectedFeaturedPercent,
              elevationOverBaseline: regionalComposition.featuredRegionPercent - unbiasedBaseline.expectedFeaturedPercent
            }
          };
        });
        const repeatedSpecies = repeatedSpeciesAcrossRoutes(routeState.routes);
        const seriesNormalResidents = routeState.routes.flatMap((route) => (route.residents || []).filter((resident) => !resident.premium));
        const seriesNormalTierCounts = tierCountsForResidents(seriesNormalResidents);
        const seriesRegionalComposition = regionalCompositionForResidents(routeState.routes.flatMap((route) => route.residents || []), seriesRegion);
        const seriesUnbiasedBaseline = regionalBaselineForTierCounts(catalog, seriesNormalTierCounts, seriesRegion);
        const duplicateRoutes = routeSummaries.filter((route) => route.duplicateSpeciesIds.length);
        if (duplicateRoutes.length) {
          structuralFailures.push({ seed, reason: "same-route duplicate species", duplicateRoutes });
        }
        series.push({
          seed,
          seriesRegion,
          regionalVariance: cloneRegionalVarianceSummary(routeState.routes[0]?.generation?.regionalVariance),
          regionalComposition: {
            ...seriesRegionalComposition,
            unbiasedBaselinePercent: seriesUnbiasedBaseline.expectedFeaturedPercent,
            elevationOverBaseline: seriesRegionalComposition.featuredRegionPercent - seriesUnbiasedBaseline.expectedFeaturedPercent
          },
          routes: routeSummaries,
          repeatedSpeciesCount: repeatedSpecies.length,
          repeatedSpecies
        });
      } catch (error) {
        structuralFailures.push({ seed, reason: error.message });
      }
    }
  }

  const regionalSimulation = seriesRegions.map((seriesRegion) => {
    const regionSeries = series.filter((entry) => entry.seriesRegion === seriesRegion);
    const realized = regionSeries.map((entry) => entry.regionalComposition.featuredRegionPercent);
    const baselines = regionSeries.map((entry) => entry.regionalComposition.unbiasedBaselinePercent);
    const averageRealizedNativePercent = average(realized);
    const averageUnbiasedBaselinePercent = average(baselines);
    return {
      seriesRegion,
      seriesCount: regionSeries.length,
      regionalPoolEntries: Number(report.regionalIdentity.byRegion[seriesRegion] || 0),
      averageRealizedNativePercent,
      averageUnbiasedBaselinePercent,
      averageElevationOverBaseline: averageRealizedNativePercent - averageUnbiasedBaselinePercent,
      minRealizedNativePercent: realized.length ? Math.min(...realized) : 0,
      maxRealizedNativePercent: realized.length ? Math.max(...realized) : 0
    };
  });
  const minimumElevationOverBaseline = Number(options.minimumElevationOverBaseline ?? 0.15);
  const realizedValues = regionalSimulation.map((entry) => entry.averageRealizedNativePercent);
  const regionalVariationRange = realizedValues.length ? Math.max(...realizedValues) - Math.min(...realizedValues) : 0;
  const regionalVerification = {
    minimumElevationOverBaseline,
    regionalVariationRange,
    allRegionsElevated: regionalSimulation.every((entry) => entry.seriesCount > 0 && entry.averageElevationOverBaseline >= minimumElevationOverBaseline),
    variationObserved: regionalVariationRange >= Number(options.minimumRegionalVariationRange ?? 0.03)
  };
  regionalVerification.ok = regionalVerification.allRegionsElevated && regionalVerification.variationObserved;

  return {
    generatedAt: new Date().toISOString(),
    seriesCount,
    seriesRegions,
    totalGeneratedSeries: series.length,
    regionalSimulation,
    regionalVerification,
    catalog: {
      eligibleCount: catalog.length,
      eligibleByBattleTier: report.eligibleByBattleTier,
      regionalIdentity: report.regionalIdentity,
      malformed: report.malformed,
      excluded: report.excluded,
      aliasResolutions: report.aliasResolutions,
      validation
    },
    structuralFailures,
    series
  };
}

function average(values = []) {
  const numeric = values.map(Number).filter((value) => Number.isFinite(value));
  return numeric.length ? numeric.reduce((sum, value) => sum + value, 0) / numeric.length : 0;
}

function cloneRegionalVarianceSummary(summary) {
  return summary ? JSON.parse(JSON.stringify(summary)) : null;
}

module.exports = {
  tierCountsForResidents,
  duplicateSpeciesInRoute,
  repeatedSpeciesAcrossRoutes,
  regionalCompositionForResidents,
  regionalBaselineForTierCounts,
  generateV2RouteAudit
};
