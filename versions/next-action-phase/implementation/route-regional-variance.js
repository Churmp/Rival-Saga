"use strict";

const SERIES_REGIONS = Object.freeze([
  "Kanto",
  "Johto",
  "Hoenn",
  "Sinnoh",
  "Unova",
  "Kalos",
  "Alola",
  "Galar",
  "Paldea"
]);

const GENERATION_TO_REGION = Object.freeze({
  1: "Kanto",
  2: "Johto",
  3: "Hoenn",
  4: "Sinnoh",
  5: "Unova",
  6: "Kalos",
  7: "Alola",
  8: "Galar",
  9: "Paldea"
});

const REGION_TO_GENERATION = Object.freeze(Object.fromEntries(
  Object.entries(GENERATION_TO_REGION).map(([generation, region]) => [region.toLowerCase(), Number(generation)])
));

const REGIONAL_FORM_REGION_BY_KEY_PART = Object.freeze({
  alola: "Alola",
  galar: "Galar",
  paldea: "Paldea"
});

const UNRESOLVED_REGIONAL_FORM_KEY_PARTS = Object.freeze(["hisui"]);

const REGIONAL_VARIANCE_RULES = Object.freeze({
  id: "regional-variance-featured-universal-50",
  status: "active",
  source: "Recovered V2 Route Regional Variance ruling: featured/current Series generation receives a 50% dedicated weighted preference while the universal legal pool remains available.",
  appliesToPremiumResidents: false,
  universalPoolShare: 0.5,
  featuredPoolShare: 0.5,
  repeatSuppressionMultiplier: 0.25
});

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

function parseGenerationNumber(value) {
  const match = String(value || "").match(/(?:generation\s*)?([ivx]+|\d+)/i);
  if (!match) return 0;
  const token = match[1].toLowerCase();
  if (/^\d+$/.test(token)) return Number(token);
  const roman = { i: 1, ii: 2, iii: 3, iv: 4, v: 5, vi: 6, vii: 7, viii: 8, ix: 9 };
  return roman[token] || 0;
}

function normalizeSeriesRegion(value) {
  const key = slugify(value);
  return SERIES_REGIONS.find((region) => slugify(region) === key) || "";
}

function generationRegion(generation) {
  return GENERATION_TO_REGION[Number(generation)] || "";
}

function regionGeneration(region) {
  return REGION_TO_GENERATION[String(region || "").toLowerCase()] || 0;
}

function regionalFormRegionForKey(key) {
  const normalized = slugify(key);
  const matched = Object.entries(REGIONAL_FORM_REGION_BY_KEY_PART)
    .find(([part]) => normalized.includes(`-${part}`) || normalized.startsWith(`${part}-`) || normalized.endsWith(`-${part}`));
  return matched?.[1] || "";
}

function unresolvedRegionalFormReasonForKey(key) {
  const normalized = slugify(key);
  const matched = UNRESOLVED_REGIONAL_FORM_KEY_PARTS
    .find((part) => normalized.includes(`-${part}`) || normalized.startsWith(`${part}-`) || normalized.endsWith(`-${part}`));
  return matched ? `Regional form identity for ${matched} is not mapped to an approved Series region.` : "";
}

function deriveRegionalIdentity({ species = {}, pokemon = {}, key = "", displayName = "" } = {}) {
  const formKey = slugify(key || pokemon.pokeapiKey || displayName || species.pokeapiKey);
  const formRegion = regionalFormRegionForKey(formKey);
  if (formRegion) {
    return {
      debutGeneration: regionGeneration(formRegion),
      debutRegion: formRegion,
      regionalOrigin: formRegion,
      identitySource: "regional-form-key",
      unresolvedRegionalIdentity: ""
    };
  }
  const unresolvedForm = unresolvedRegionalFormReasonForKey(formKey);
  if (unresolvedForm) {
    return {
      debutGeneration: parseGenerationNumber(species.generation),
      debutRegion: generationRegion(parseGenerationNumber(species.generation)),
      regionalOrigin: "",
      identitySource: "unresolved-regional-form",
      unresolvedRegionalIdentity: unresolvedForm
    };
  }
  const debutGeneration = parseGenerationNumber(species.generation);
  const debutRegion = generationRegion(debutGeneration);
  return {
    debutGeneration,
    debutRegion,
    regionalOrigin: debutRegion,
    identitySource: debutRegion ? "pokeapi-species-generation" : "missing-pokeapi-species-generation",
    unresolvedRegionalIdentity: debutRegion ? "" : "Missing or unsupported PokeAPI species generation."
  };
}

function regionalVarianceClass(seriesRegion, identity = {}) {
  const normalizedSeries = normalizeSeriesRegion(seriesRegion);
  const candidateRegion = normalizeSeriesRegion(identity.regionalOrigin || identity.debutRegion);
  if (!normalizedSeries) return "unknown-series";
  if (!candidateRegion) return "unknown-candidate-region";
  return normalizedSeries === candidateRegion ? "featured-region" : "other-region";
}

function regionalVarianceContext({ seriesRegion, candidates = [] } = {}) {
  const normalizedSeries = normalizeSeriesRegion(seriesRegion);
  const legalCandidates = Array.isArray(candidates) ? candidates : [];
  const featuredCandidateCount = legalCandidates.filter((entry) => (
    regionalVarianceClass(normalizedSeries, entry?.regionalIdentity || entry) === "featured-region"
  )).length;
  return {
    seriesRegion: normalizedSeries,
    candidateCount: legalCandidates.length,
    featuredCandidateCount
  };
}

function getRegionalVarianceWeight({ seriesRegion, candidate, candidates = [], context = null, rules = REGIONAL_VARIANCE_RULES } = {}) {
  const identity = candidate?.regionalIdentity || candidate || {};
  const regionalClass = regionalVarianceClass(seriesRegion, identity);
  const active = rules?.status === "active";
  const selectionContext = context || regionalVarianceContext({ seriesRegion, candidates });
  const candidateCount = Number(selectionContext.candidateCount || 0);
  const featuredCandidateCount = Number(selectionContext.featuredCandidateCount || 0);
  const universalPoolShare = Number(rules?.universalPoolShare ?? 1);
  const featuredPoolShare = Number(rules?.featuredPoolShare ?? 0);
  const canApplyPreference = active && candidateCount > 0 && featuredCandidateCount > 0;
  const universalWeight = canApplyPreference ? universalPoolShare : 1;
  const featuredBonus = canApplyPreference && regionalClass === "featured-region"
    ? featuredPoolShare * (candidateCount / featuredCandidateCount)
    : 0;
  const totalPoolShare = universalPoolShare + featuredPoolShare;
  return {
    weight: universalWeight + featuredBonus,
    regionalClass: active ? regionalClass : "unresolved-neutral",
    configuredClass: regionalClass,
    rulesId: rules?.id || "regional-variance-unconfigured",
    rulesStatus: rules?.status || "unresolved",
    candidateCount,
    featuredCandidateCount,
    universalPoolShare,
    featuredPoolShare,
    dedicatedFeaturedWeightShare: totalPoolShare ? featuredPoolShare / totalPoolShare : 0
  };
}

function repeatSuppressionWeight(priorPlacements = 0, rules = REGIONAL_VARIANCE_RULES) {
  const placements = Math.max(0, Number(priorPlacements || 0));
  return Math.pow(Number(rules?.repeatSuppressionMultiplier ?? 0.25), placements);
}

module.exports = {
  SERIES_REGIONS,
  GENERATION_TO_REGION,
  REGION_TO_GENERATION,
  REGIONAL_VARIANCE_RULES,
  normalizeSeriesRegion,
  parseGenerationNumber,
  generationRegion,
  regionGeneration,
  deriveRegionalIdentity,
  regionalVarianceClass,
  regionalVarianceContext,
  getRegionalVarianceWeight,
  repeatSuppressionWeight
};
