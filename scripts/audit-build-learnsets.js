const { Dex, toID } = require("pokemon-showdown");
const buildData = require("../pokemon-build-data.js");
const moveUsefulness = require("../showdown-move-usefulness.js");

const speciesAliases = Object.freeze({
  "basculegion-female": "basculegionf",
  "indeedee-female": "indeedeef",
  "oinkologne-female": "oinkolognef",
  "tauros-paldea-aqua-breed": "taurospaldeaaqua",
  "tauros-paldea-blaze-breed": "taurospaldeablaze",
  "tauros-paldea-combat-breed": "taurospaldeacombat"
});

function dataKey(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/['.]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function sourceDetail(source) {
  const value = String(source || "");
  const generation = Number(value.charAt(0));
  const sourceCode = value.charAt(1).toUpperCase();
  if (!Number.isInteger(generation) || generation < 1 || generation > 9) return null;
  if (!"MTLREDSV".includes(sourceCode) || sourceCode === "C" || value === "8V") return null;
  return { sourceCode };
}

function speciesForEntry(pokemonKey, entry = {}) {
  const inheritedKey = entry.inheritsMovesFrom;
  const inheritedEntry = inheritedKey ? buildData.pokemon[inheritedKey] : null;
  const candidates = [
    speciesAliases[pokemonKey],
    inheritedEntry?.displayName,
    inheritedEntry?.pokeapiKey,
    inheritedKey,
    entry.displayName,
    entry.pokeapiKey,
    pokemonKey
  ].map(toID).filter(Boolean);
  for (const candidate of candidates) {
    const species = Dex.species.get(candidate);
    if (species.exists) return species;
  }
  return null;
}

function learnsetChain(species) {
  const chain = [];
  const seen = new Set();
  let current = species;
  while (current?.exists && !seen.has(current.id)) {
    seen.add(current.id);
    chain.push(current);
    current = current.prevo ? Dex.species.get(current.prevo) : null;
  }
  return chain;
}

function moveToken(move) {
  const moveId = Number(move?.moveId || 0);
  return moveId ? `id:${moveId}` : `name:${dataKey(move?.name || move?.move)}`;
}

const missingPokemon = [];
const missingLevelUpMoves = [];
const missingTmMoves = [];
const duplicateBuckets = [];

Object.entries(buildData.pokemon).forEach(([pokemonKey, entry]) => {
  const species = speciesForEntry(pokemonKey, entry);
  if (!species) {
    missingPokemon.push(pokemonKey);
    return;
  }

  const expected = new Map();
  learnsetChain(species).forEach((chainSpecies) => {
    const learnset = Dex.species.getLearnsetData(chainSpecies.id).learnset || {};
    Object.entries(learnset).forEach(([moveId, sources]) => {
      const legalSources = (sources || []).map(sourceDetail).filter(Boolean);
      if (!legalSources.length) return;
      const move = Dex.moves.get(moveId);
      if (!move.exists) return;
      const token = move.num ? `id:${move.num}` : `name:${dataKey(move.name)}`;
      const current = expected.get(token) || { name: move.name, levelUp: false };
      if (legalSources.some((source) => source.sourceCode === "L")) current.levelUp = true;
      expected.set(token, current);
    });
  });

  const levelUp = new Set((entry.levelUpMoveDetails || []).map(moveToken));
  const tm = new Set((entry.tmMoveDetails || []).map(moveToken));
  levelUp.forEach((token) => {
    if (tm.has(token)) duplicateBuckets.push(`${pokemonKey}: ${token}`);
  });
  expected.forEach((move, token) => {
    if (move.levelUp && !levelUp.has(token)) missingLevelUpMoves.push(`${pokemonKey}: ${move.name}`);
    if (!move.levelUp && !levelUp.has(token) && !tm.has(token)) missingTmMoves.push(`${pokemonKey}: ${move.name}`);
  });
});

const medichamFakeOut = (buildData.pokemon.medicham?.tmMoveDetails || [])
  .find((move) => dataKey(move.name) === "fake-out");
const sceptileShedTail = (buildData.pokemon.sceptile?.levelUpMoveDetails || [])
  .find((move) => dataKey(move.name) === "shed-tail");
const showdownMetadataMissing = Object.values(buildData.moves)
  .filter((move) => !move.showdownId)
  .map((move) => move.name);
const medichamMoveNames = [
  ...(buildData.pokemon.medicham?.levelUpMoves || []),
  ...(buildData.pokemon.medicham?.tmMoves || [])
];
const medichamUsefulnessContext = {
  species: {
    id: "medicham",
    name: "Medicham",
    baseSpecies: "Medicham",
    types: buildData.pokemon.medicham?.types || [],
    baseStats: buildData.pokemon.medicham?.baseStats || {},
    weightKg: Number(buildData.pokemon.medicham?.weight || 0) / 10,
    hasEvolutions: false
  },
  moveNames: medichamMoveNames,
  selectedMoves: [],
  ability: "Pure Power",
  item: ""
};
const usefulnessSamples = Object.fromEntries(["Fake Out", "Recover", "Hyper Beam"].map((name) => [
  name,
  moveUsefulness.classify({
    ...medichamUsefulnessContext,
    move: buildData.moves[dataKey(name)]
  })
]));

const report = {
  pokemon: Object.keys(buildData.pokemon).length,
  moves: Object.keys(buildData.moves).length,
  missingPokemon,
  missingLevelUpMoveCount: missingLevelUpMoves.length,
  missingTmMoveCount: missingTmMoves.length,
  duplicateBucketCount: duplicateBuckets.length,
  showdownMetadataMissingCount: showdownMetadataMissing.length,
  medichamFakeOut,
  sceptileShedTail,
  usefulnessSamples,
  samples: {
    missingLevelUpMoves: missingLevelUpMoves.slice(0, 10),
    missingTmMoves: missingTmMoves.slice(0, 10),
    duplicateBuckets: duplicateBuckets.slice(0, 10),
    showdownMetadataMissing: showdownMetadataMissing.slice(0, 10)
  }
};

console.log(JSON.stringify(report, null, 2));

if (
  missingPokemon.length
  || missingLevelUpMoves.length
  || missingTmMoves.length
  || duplicateBuckets.length
  || showdownMetadataMissing.length
  || medichamFakeOut?.learnMethod !== "egg"
  || sceptileShedTail?.source !== "bulbapedia-rem"
  || usefulnessSamples["Fake Out"] !== "useful"
  || usefulnessSamples.Recover !== "useful"
  || usefulnessSamples["Hyper Beam"] !== "usually-useless"
) {
  process.exit(1);
}
