"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const regionalVariance = require("./route-regional-variance.js");

const DEFAULT_PROJECT_ROOT = path.resolve(__dirname, "..", "..", "..");

const FORM_KEY_ALIASES = Object.freeze({
  "basculegion-blue": "basculegion-female",
  "basculegion-red": "basculegion-male",
  "calyrex-icerider": "calyrex-ice",
  "calyrex-shadowrider": "calyrex-shadow",
  "darmanitan-galar": "darmanitan-galar-standard",
  "darmanitan-galar-zen": "darmanitan-galar-standard",
  "enamorus-t": "enamorus-therian",
  "farfetchd-galar": "farfetchd-galar",
  "groudon-primal": "groudon",
  "kyogre-primal": "kyogre",
  "landorus-i": "landorus-incarnate",
  "landorus-t": "landorus-therian",
  "lycanroc-day": "lycanroc-midday",
  "lycanroc-night": "lycanroc-midnight",
  "ogerpon-fire": "ogerpon-hearthflame-mask",
  "ogerpon-rock": "ogerpon-cornerstone-mask",
  "ogerpon-water": "ogerpon-wellspring-mask",
  "tauros-paldea-aqua": "tauros-paldea-aqua-breed",
  "tauros-paldea-blaze": "tauros-paldea-blaze-breed",
  "tauros-paldea-combat": "tauros-paldea-combat-breed",
  "thundurus-i": "thundurus-incarnate",
  "thundurus-t": "thundurus-therian",
  "tornadus-i": "tornadus-incarnate",
  "tornadus-t": "tornadus-therian",
  "urshifu-rapid": "urshifu-rapid-strike",
  "urshifu-single": "urshifu-single-strike",
  "zacian-c": "zacian",
  "zamazenta-c": "zamazenta"
});

const ROUTE_GENERATION_TIER_IDS = Object.freeze([
  "lc",
  "lc-elite",
  "safari",
  "poke",
  "great",
  "ultra",
  "master",
  "ultra-elite",
  "master-elite"
]);

function text(value, fallback = "") {
  const normalized = String(value ?? "").trim();
  return normalized || fallback;
}

function canonicalPokemonKey(value) {
  return text(value)
    .replace(/[♀]/g, "-f")
    .replace(/[♂]/g, "-m")
    .replace(/[’']/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function readScriptContext(projectRoot = DEFAULT_PROJECT_ROOT) {
  const context = { globalThis: {} };
  vm.createContext(context);
  vm.runInContext(
    fs.readFileSync(path.join(projectRoot, "pokemon-balance-tiers.js"), "utf8"),
    context,
    { filename: "pokemon-balance-tiers.js" }
  );
  vm.runInContext(
    `${fs.readFileSync(path.join(projectRoot, "pokemon-build-data.js"), "utf8")}\nglobalThis.__RIVAL_SAGA_BUILD_DATA__ = rivalSagaBuildData;`,
    context,
    { filename: "pokemon-build-data.js" }
  );
  return {
    balanceTiers: context.globalThis.RIVAL_SAGA_BALANCE_TIERS || [],
    balanceTierRows: context.globalThis.RIVAL_SAGA_BALANCE_TIER_ROWS || [],
    buildData: context.globalThis.__RIVAL_SAGA_BUILD_DATA__ || {}
  };
}

function buildPokemonLookup(pokemonData = {}) {
  const lookup = new Map();
  Object.entries(pokemonData).forEach(([key, entry]) => {
    [
      key,
      entry?.displayName,
      entry?.pokeapiKey,
      entry?.speciesKey
    ].forEach((candidate) => {
      const normalized = canonicalPokemonKey(candidate);
      if (normalized && !lookup.has(normalized)) lookup.set(normalized, { key, entry });
    });
  });
  return lookup;
}

function resolveBuildPokemon(row, lookup) {
  const rowKey = canonicalPokemonKey(row.displayName);
  const direct = lookup.get(rowKey);
  if (direct) return { ...direct, resolution: "direct", requestedKey: rowKey, resolvedKey: direct.key };
  const aliasKey = FORM_KEY_ALIASES[rowKey];
  if (aliasKey && lookup.has(aliasKey)) {
    const alias = lookup.get(aliasKey);
    return { ...alias, resolution: "alias", requestedKey: rowKey, resolvedKey: alias.key, aliasKey };
  }
  return { key: "", entry: null, resolution: "missing", requestedKey: rowKey, resolvedKey: aliasKey || "" };
}

function validateTypeData(types) {
  if (!Array.isArray(types) || !types.length) return false;
  return types.every((type) => typeof type === "string" && type.trim());
}

function buildV2RoutePokemonCatalog(options = {}) {
  const data = options.data || readScriptContext(options.projectRoot);
  const pokemonData = data.buildData?.pokemon || {};
  const lookup = buildPokemonLookup(pokemonData);
  const knownTierIds = new Set((data.balanceTiers || []).map((tier) => canonicalPokemonKey(tier.id)));
  const report = {
    sources: {
      balanceTiers: "pokemon-balance-tiers.js globalThis.RIVAL_SAGA_BALANCE_TIERS",
      balanceTierRows: "pokemon-balance-tiers.js globalThis.RIVAL_SAGA_BALANCE_TIER_ROWS",
      pokemonBuildData: "pokemon-build-data.js rivalSagaBuildData.pokemon",
      pokemonSpeciesData: "pokemon-build-data.js rivalSagaBuildData.species"
    },
    totalTierRows: (data.balanceTierRows || []).length,
    buildPokemonCount: Object.keys(pokemonData).length,
    eligibleCount: 0,
    eligibleByBattleTier: {},
    malformed: [],
    excluded: [],
    aliasResolutions: [],
    duplicateSpeciesIds: [],
    regionalIdentity: {
      validCount: 0,
      unresolved: [],
      byRegion: {},
      byGeneration: {}
    }
  };
  const catalog = [];
  const seenSpeciesIds = new Map();

  (data.balanceTierRows || []).forEach((row, index) => {
    const rowLabel = row.displayName || `(row ${index})`;
    const speciesId = canonicalPokemonKey(row.displayName);
    const battleTierId = canonicalPokemonKey(row.balanceTier);
    const rowErrors = [];
    if (!speciesId) rowErrors.push("missing species ID");
    if (!battleTierId) rowErrors.push("missing Battle Tier");
    if (battleTierId && !knownTierIds.has(battleTierId)) rowErrors.push(`unrecognized Battle Tier ${battleTierId}`);

    const resolved = resolveBuildPokemon(row, lookup);
    if (!resolved.entry) rowErrors.push(`missing build-data Pokemon for ${rowLabel}`);
    const types = Array.isArray(resolved.entry?.types) ? resolved.entry.types.map(text).filter(Boolean) : [];
    if (resolved.entry && !validateTypeData(types)) rowErrors.push(`invalid type data for ${rowLabel}`);
    const primaryType = types[0] || "";
    if (resolved.entry && !primaryType) rowErrors.push(`missing Primary Type for ${rowLabel}`);
    const speciesRecord = data.buildData?.species?.[resolved.entry?.speciesKey] || data.buildData?.species?.[String(resolved.entry?.speciesKey || "")] || null;
    const regionalIdentity = regionalVariance.deriveRegionalIdentity({
      species: speciesRecord || {},
      pokemon: resolved.entry || {},
      key: resolved.entry?.pokeapiKey || resolved.key || row.displayName,
      displayName: row.displayName
    });

    if (seenSpeciesIds.has(speciesId)) {
      rowErrors.push(`duplicate canonical species identifier ${speciesId}`);
      report.duplicateSpeciesIds.push({
        speciesId,
        firstDisplayName: seenSpeciesIds.get(speciesId),
        duplicateDisplayName: row.displayName
      });
    }

    if (rowErrors.length) {
      report.malformed.push({
        index,
        displayName: rowLabel,
        speciesId,
        battleTier: battleTierId,
        errors: rowErrors
      });
      return;
    }

    seenSpeciesIds.set(speciesId, row.displayName);
    if (resolved.resolution === "alias") {
      report.aliasResolutions.push({
        displayName: row.displayName,
        requestedKey: resolved.requestedKey,
        resolvedKey: resolved.resolvedKey
      });
    }

    const eligible = ROUTE_GENERATION_TIER_IDS.includes(battleTierId);
    const entry = {
      speciesId,
      displayName: row.displayName,
      battleTierId,
      balanceTier: battleTierId,
      battleTierLabel: row.balanceTierLabel || battleTierId,
      battleTierOrder: Number(row.balanceTierOrder || 0),
      primaryType,
      types,
      source: {
        kind: "rival-saga-real-pokemon-data",
        sourceId: speciesId,
        tierRowDisplayName: row.displayName,
        buildDataKey: resolved.key,
        buildDataResolution: resolved.resolution,
        buildDataDisplayName: resolved.entry.displayName || ""
      },
      regionalIdentity
    };

    if (!eligible) {
      report.excluded.push({
        displayName: row.displayName,
        speciesId,
        battleTier: battleTierId,
        reason: "Battle Tier is valid data but not used by the approved V2 Route generation curves."
      });
      return;
    }

    catalog.push(entry);
    if (regionalIdentity.unresolvedRegionalIdentity) {
      report.regionalIdentity.unresolved.push({
        displayName: row.displayName,
        speciesId,
        pokeapiKey: resolved.entry?.pokeapiKey || "",
        speciesKey: resolved.entry?.speciesKey || "",
        reason: regionalIdentity.unresolvedRegionalIdentity
      });
    } else {
      report.regionalIdentity.validCount += 1;
    }
    const regionKey = regionalIdentity.regionalOrigin || regionalIdentity.debutRegion || "Unresolved";
    const generationKey = regionalIdentity.debutGeneration ? `Generation ${regionalIdentity.debutGeneration}` : "Unresolved";
    report.regionalIdentity.byRegion[regionKey] = Number(report.regionalIdentity.byRegion[regionKey] || 0) + 1;
    report.regionalIdentity.byGeneration[generationKey] = Number(report.regionalIdentity.byGeneration[generationKey] || 0) + 1;
    report.eligibleCount += 1;
    report.eligibleByBattleTier[battleTierId] = Number(report.eligibleByBattleTier[battleTierId] || 0) + 1;
  });

  return { catalog, report };
}

function validateV2RoutePokemonCatalog(catalog = [], options = {}) {
  const knownTierIds = new Set(options.knownTierIds || ROUTE_GENERATION_TIER_IDS);
  const errors = [];
  const speciesIds = new Map();
  const tierCounts = {};
  catalog.forEach((entry, index) => {
    const prefix = `${entry?.displayName || `(catalog ${index})`}`;
    const speciesId = canonicalPokemonKey(entry?.speciesId);
    const tierId = canonicalPokemonKey(entry?.battleTierId || entry?.balanceTier || entry?.battleTier?.id);
    if (!speciesId) errors.push(`${prefix}: missing species ID`);
    if (speciesId && speciesIds.has(speciesId)) errors.push(`${prefix}: duplicate canonical species identifier ${speciesId}`);
    if (speciesId) speciesIds.set(speciesId, prefix);
    if (!tierId) errors.push(`${prefix}: missing Battle Tier`);
    else if (!knownTierIds.has(tierId)) errors.push(`${prefix}: unrecognized Battle Tier ${tierId}`);
    const types = Array.isArray(entry?.types) ? entry.types.filter(Boolean) : [];
    if (!entry?.primaryType) errors.push(`${prefix}: missing Primary Type`);
    if (!validateTypeData(types)) errors.push(`${prefix}: invalid type data`);
    if (!entry?.regionalIdentity?.regionalOrigin && !entry?.regionalIdentity?.unresolvedRegionalIdentity) {
      errors.push(`${prefix}: missing regional identity metadata`);
    }
    if (tierId) tierCounts[tierId] = Number(tierCounts[tierId] || 0) + 1;
  });
  return {
    ok: errors.length === 0,
    errors,
    tierCounts,
    catalogCount: catalog.length
  };
}

module.exports = {
  DEFAULT_PROJECT_ROOT,
  FORM_KEY_ALIASES,
  ROUTE_GENERATION_TIER_IDS,
  canonicalPokemonKey,
  readScriptContext,
  buildV2RoutePokemonCatalog,
  validateV2RoutePokemonCatalog
};
