const fs = require("fs");
const path = require("path");
const buildData = require("../pokemon-build-data.js");
const shopData = require("../shop-data.js");
const rules = require("../move-classification-rules.js");

const rootDir = path.resolve(__dirname, "..");
const outputPath = path.join(rootDir, "move-classification-data.js");

function moveKey(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function compatibilityGroupForPokemon(pokemonKey, pokemon) {
  const familyChainId = pokemon?.familyChainId;
  if (familyChainId === undefined || familyChainId === null || String(familyChainId).trim() === "") {
    throw new Error(`Missing familyChainId for ${pokemonKey}; cannot classify Natural move compatibility safely.`);
  }
  return String(familyChainId);
}

function buildClassification() {
  const excludedMoveKeys = new Set([
    ...rules.singlesExcludedMoves,
    ...rules.removedMoves
  ].map(moveKey));
  const manualNaturalMoveKeys = new Set((rules.manualNaturalMoves || []).map(moveKey));
  const byMove = new Map();

  Object.entries(buildData.pokemon || {}).forEach(([pokemonKey, pokemon]) => {
    const compatibilityGroup = compatibilityGroupForPokemon(pokemonKey, pokemon);
    const pokemonName = String(pokemon.displayName || pokemon.name || pokemon.pokeapiKey || pokemonKey).trim();
    const details = Array.isArray(pokemon.tmMoveDetails) && pokemon.tmMoveDetails.length
      ? pokemon.tmMoveDetails
      : (pokemon.tmMoves || []).map((name) => ({ name }));
    details.forEach((detail) => {
      const name = String(detail.name || detail.move || "").trim();
      const key = moveKey(name);
      if (!key || excludedMoveKeys.has(key)) return;
      if (!byMove.has(key)) {
        byMove.set(key, {
          name,
          compatibilityGroups: new Set(),
          pokemon: new Map(),
          formerLearnMethods: new Set()
        });
      }
      const entry = byMove.get(key);
      entry.compatibilityGroups.add(compatibilityGroup);
      entry.pokemon.set(pokemonKey, pokemonName);
      if (detail.learnMethod) entry.formerLearnMethods.add(detail.learnMethod);
    });
  });

  const naturalizedRareTmMoves = [...byMove.values()]
    .filter((entry) => entry.compatibilityGroups.size > 0
      && (entry.compatibilityGroups.size <= rules.rareTmNaturalCompatibilityMax
        || manualNaturalMoveKeys.has(moveKey(entry.name))))
    .map((entry) => ({
      name: entry.name,
      compatiblePokemonCount: entry.pokemon.size,
      compatibilityGroupCount: entry.compatibilityGroups.size,
      compatibilityGroups: [...entry.compatibilityGroups]
        .sort((a, b) => Number(a) - Number(b) || a.localeCompare(b)),
      pokemon: [...entry.pokemon.entries()]
        .map(([key, name]) => ({ key, name }))
        .sort((a, b) => a.name.localeCompare(b.name) || a.key.localeCompare(b.key)),
      formerLearnMethods: [...entry.formerLearnMethods].sort(),
      manualNaturalException: manualNaturalMoveKeys.has(moveKey(entry.name))
        && entry.compatibilityGroups.size > rules.rareTmNaturalCompatibilityMax
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const compatibleMoveKeys = new Set(byMove.keys());
  const rawTmShopData = shopData.rawTmShopData || shopData.tmShopData || [];
  const zeroCompatibilityTmShopMoves = rawTmShopData
    .map((entry) => String(entry.name || "").trim())
    .filter((name) => name && !compatibleMoveKeys.has(moveKey(name)) && !excludedMoveKeys.has(moveKey(name)))
    .sort((a, b) => a.localeCompare(b));

  return {
    schemaVersion: 3,
    rareTmNaturalCompatibilityMax: rules.rareTmNaturalCompatibilityMax,
    manualNaturalMoves: [...(rules.manualNaturalMoves || [])],
    singlesExcludedMoves: [...rules.singlesExcludedMoves],
    removedMoves: [...rules.removedMoves],
    naturalizedRareTmMoves,
    zeroCompatibilityTmShopMoves
  };
}

function buildOutput(classification) {
  return `const rivalSagaMoveClassification = Object.freeze(${JSON.stringify(classification, null, 2)});

if (typeof window !== "undefined") {
  window.rivalSagaMoveClassification = rivalSagaMoveClassification;
}

if (typeof module !== "undefined") {
  module.exports = rivalSagaMoveClassification;
}
`;
}

const classification = buildClassification();
fs.writeFileSync(outputPath, buildOutput(classification));
console.log(`Wrote ${classification.naturalizedRareTmMoves.length} naturalized rare TM moves to move-classification-data.js.`);
console.log(`Zero-compatibility shop moves: ${classification.zeroCompatibilityTmShopMoves.length}.`);
