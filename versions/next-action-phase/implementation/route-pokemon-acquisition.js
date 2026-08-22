"use strict";

function cloneJson(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value));
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

function normalizeArray(value) {
  return Array.isArray(value) ? value : [];
}

function playerById(state, playerId) {
  return normalizeArray(state.players).find((player) => player.id === playerId) || null;
}

function currentResultRevision(result) {
  return normalizeArray(result?.revisions).find((entry) => entry.revisionNumber === result.currentRevision)
    || normalizeArray(result?.revisions).at(-1)
    || null;
}

function routePokemonRecordId({ playerId, acquisitionId }) {
  return `route-pokemon-${slugify(playerId)}-${slugify(acquisitionId)}`;
}

function createCanonicalRoutePokemonRecord(gameState, options = {}) {
  const next = cloneJson(gameState);
  next.pokemonRecords ||= [];
  next.players ||= [];
  const playerId = text(options.playerId || options.result?.playerId);
  const player = playerById(next, playerId);
  if (!player) throw new Error(`Player not found for Route Pokemon acquisition: ${playerId || "(empty)"}.`);
  const result = options.result || {};
  const revision = options.revision || currentResultRevision(result);
  if (!revision) throw new Error("Route encounter result has no current revision to acquire.");
  const acquisitionId = text(options.acquisitionId || result.finalizedAcquisitionId);
  if (!acquisitionId) throw new Error("Route Pokemon acquisition requires a stable acquisition ID.");
  const existing = next.pokemonRecords.find((record) => (
    record.routeEncounterMetadata?.acquisitionId === acquisitionId
    || record.acquisitionMetadata?.acquisitionId === acquisitionId
    || record.id === routePokemonRecordId({ playerId, acquisitionId })
  ));
  if (existing) {
    player.pokemonIds = [...new Set([...normalizeArray(player.pokemonIds), existing.id])];
    return { state: next, pokemon: existing, created: false };
  }

  const pokemon = {
    id: text(options.pokemonRecordId) || routePokemonRecordId({ playerId, acquisitionId }),
    name: revision.displayName,
    trainerId: playerId,
    ownerId: playerId,
    baseSpecies: revision.displayName,
    currentSpecies: revision.displayName,
    acquiredSpeciesId: revision.speciesId,
    acquiredSpeciesName: revision.displayName,
    rosterSpeciesId: revision.speciesId,
    rosterSpeciesName: revision.displayName,
    seriesStartSpecies: revision.displayName,
    resetsToSpecies: revision.displayName,
    status: "Active",
    rosterType: "Active",
    rosterStatus: "active",
    ruleStatus: "Normal",
    firstCaughtSeries: text(options.seriesId || result.seriesId, "series-v2"),
    firstCaughtGym: Number(options.routeNumber || result.routeNumber || 1),
    source: "Route Encounter",
    sourceTier: revision.battleTier?.id || "",
    acquisitionTier: revision.battleTier?.id || "",
    addedAt: text(options.now) || new Date().toISOString(),
    kills: 0,
    deaths: 0,
    gymsBrought: 0,
    gymsBenched: 0,
    gymsOnRoster: 0,
    battlesWon: 0,
    battlesLost: 0,
    buffs: [],
    effectBuffs: [],
    nerfs: [],
    breederStatus: null,
    dragonDenStatus: null,
    evolutionHistory: [],
    routeEncounterMetadata: {
      acquisitionId,
      seriesId: text(options.seriesId || result.seriesId, "series-v2"),
      routeId: result.routeId,
      routeNumber: Number(result.routeNumber || options.routeNumber || 0),
      opportunityId: result.opportunityId,
      resultId: result.resultId,
      residentId: revision.residentId,
      speciesId: revision.speciesId,
      displayName: revision.displayName,
      battleTier: cloneJson(revision.battleTier),
      finalRevision: result.currentRevision,
      playerId
    },
    acquisitionMetadata: {
      acquisitionId,
      source: "Route Encounter",
      sourceType: "v2-route-encounter",
      resultId: result.resultId,
      finalRevision: result.currentRevision
    },
    log: [{
      action: "Route Encounter",
      series: text(options.seriesId || result.seriesId, "series-v2"),
      gym: Number(options.routeNumber || result.routeNumber || 1),
      notes: `Acquired from ${result.routeId || "Route"} via ${result.resultId || "Route result"}.`,
      timestamp: text(options.now) || new Date().toISOString()
    }]
  };

  next.pokemonRecords.unshift(pokemon);
  player.pokemonIds = [...new Set([...normalizeArray(player.pokemonIds), pokemon.id])];
  return { state: next, pokemon, created: true };
}

module.exports = {
  createCanonicalRoutePokemonRecord,
  routePokemonRecordId
};
