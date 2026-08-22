"use strict";

const { generateV2RouteAudit } = require("./implementation/route-generation-audit.js");

function argValue(name, fallback) {
  const prefix = `--${name}=`;
  const match = process.argv.find((arg) => arg.startsWith(prefix));
  return match ? match.slice(prefix.length) : fallback;
}

const seriesCount = Number(argValue("series", 25));
const seedPrefix = argValue("seed", "v2-route-audit");
const audit = generateV2RouteAudit({ seriesCount, seedPrefix });

console.log(`V2 Route generation audit`);
console.log(`Series regions: ${audit.seriesRegions.join(", ")}`);
console.log(`Series generated per region: ${audit.seriesCount}`);
console.log(`Total generated Series: ${audit.totalGeneratedSeries}`);
console.log(`Eligible catalog entries: ${audit.catalog.eligibleCount}`);
console.log(`Eligible by Battle Tier: ${JSON.stringify(audit.catalog.eligibleByBattleTier)}`);
console.log(`Regional Variance: ${audit.series[0]?.regionalVariance?.status || "unknown"} (${audit.series[0]?.regionalVariance?.rulesId || "no rules id"})`);
console.log(`Regional identity unresolved: ${audit.catalog.regionalIdentity.unresolved.length}`);
console.log(`Regional identity by region: ${JSON.stringify(audit.catalog.regionalIdentity.byRegion)}`);
console.log(`Regional simulation summary:`);
audit.regionalSimulation.forEach((entry) => {
  console.log(`- ${entry.seriesRegion}: realized=${(entry.averageRealizedNativePercent * 100).toFixed(1)}%, unbiased=${(entry.averageUnbiasedBaselinePercent * 100).toFixed(1)}%, elevation=${(entry.averageElevationOverBaseline * 100).toFixed(1)}%, pool=${entry.regionalPoolEntries}`);
});
console.log(`Regional verification: ${audit.regionalVerification.ok ? "passed" : "failed"} (min elevation ${(audit.regionalVerification.minimumElevationOverBaseline * 100).toFixed(1)}%, variation range ${(audit.regionalVerification.regionalVariationRange * 100).toFixed(1)}%)`);
console.log(`Malformed source rows: ${audit.catalog.malformed.length}`);
if (audit.catalog.malformed.length) {
  audit.catalog.malformed.slice(0, 20).forEach((entry) => {
    console.log(`- malformed ${entry.displayName}: ${entry.errors.join("; ")}`);
  });
}
console.log(`Excluded valid source rows: ${audit.catalog.excluded.length}`);
console.log(`Alias resolutions: ${audit.catalog.aliasResolutions.length}`);
console.log(`Structural failures: ${audit.structuralFailures.length}`);
audit.structuralFailures.forEach((failure) => {
  console.log(`- ${failure.seed}: ${failure.reason}`);
});

audit.series.slice(0, 5).forEach((series) => {
  console.log(`\n${series.seed} [${series.seriesRegion}] featured=${(series.regionalComposition.featuredRegionPercent * 100).toFixed(1)}% unbiased=${(series.regionalComposition.unbiasedBaselinePercent * 100).toFixed(1)}% repeated=${series.repeatedSpeciesCount}`);
  series.routes.forEach((route) => {
    const quality = route.routeQuality ? `${route.routeQuality.id} (${route.routeQuality.shift >= 0 ? "+" : ""}${route.routeQuality.shift})` : "none";
    console.log(`  ${route.routeId}: quality=${quality}, curve=${route.effectiveCurve}, residents=${route.residentCount} (${route.normalResidentCount} normal + ${route.premiumResidentCount} premium), featured=${(route.regionalComposition.featuredRegionPercent * 100).toFixed(1)}%, unbiased=${(route.regionalComposition.unbiasedBaselinePercent * 100).toFixed(1)}%, tiers=${JSON.stringify(route.tierCounts)}, dupes=${route.duplicateSpeciesIds.length}`);
  });
});

if (audit.structuralFailures.length || !audit.regionalVerification.ok) process.exitCode = 1;
