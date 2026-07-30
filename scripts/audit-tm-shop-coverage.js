const buildData = require("../pokemon-build-data.js");
const { tmShopData } = require("../shop-data.js");
const moveClassification = require("../move-classification-data.js");

function moveKey(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
}

const excludedMoveKeys = new Set([
  ...(moveClassification.singlesExcludedMoves || []),
  ...(moveClassification.removedMoves || [])
].map(moveKey));
const naturalizedMoveKeys = new Set(
  (moveClassification.naturalizedRareTmMoves || []).map((entry) => moveKey(entry.name))
);

const compatibleMoves = new Map();
Object.values(buildData.pokemon || {}).forEach((pokemon) => {
  const details = Array.isArray(pokemon.tmMoveDetails) && pokemon.tmMoveDetails.length
    ? pokemon.tmMoveDetails
    : (pokemon.tmMoves || []).map((name) => ({ name }));
  details.forEach((detail) => {
    const name = String(detail.name || detail.move || "").trim();
    const key = moveKey(name);
    if (!key || excludedMoveKeys.has(key) || naturalizedMoveKeys.has(key)) return;
    if (!compatibleMoves.has(key)) {
      compatibleMoves.set(key, { name, pokemon: new Set(), methods: new Set() });
    }
    const entry = compatibleMoves.get(key);
    entry.pokemon.add(pokemon.name || pokemon.pokeapiKey || "Unknown");
    if (detail.learnMethod) entry.methods.add(detail.learnMethod);
  });
});

const shopByMove = new Map();
(tmShopData || []).forEach((entry) => {
  const key = moveKey(entry.name);
  if (!shopByMove.has(key)) shopByMove.set(key, []);
  shopByMove.get(key).push(entry);
});

const missing = [...compatibleMoves.entries()]
  .filter(([key]) => !shopByMove.has(key))
  .map(([, entry]) => ({
    name: entry.name,
    compatiblePokemonCount: entry.pokemon.size,
    learnMethods: [...entry.methods].sort()
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

const duplicateShopMoves = [...shopByMove.entries()]
  .filter(([, entries]) => entries.length > 1)
  .map(([, entries]) => entries.map((entry) => entry.name));

const shopOnly = [...shopByMove.entries()]
  .filter(([key]) => !compatibleMoves.has(key))
  .map(([, entries]) => entries[0].name)
  .sort((a, b) => a.localeCompare(b));

const eventOnlyMethods = new Set(["event", "restricted"]);
const missingEventOrRestrictedOnly = missing.filter((entry) => (
  entry.learnMethods.length && entry.learnMethods.every((method) => eventOnlyMethods.has(method))
));
const missingOther = missing.filter((entry) => !missingEventOrRestrictedOnly.includes(entry));

const result = {
  naturalizedRareTmMoveCount: (moveClassification.naturalizedRareTmMoves || []).length,
  naturalizedRareTmMoves: moveClassification.naturalizedRareTmMoves || [],
  zeroCompatibilityTmShopMoveCount: (moveClassification.zeroCompatibilityTmShopMoves || []).length,
  zeroCompatibilityTmShopMoves: moveClassification.zeroCompatibilityTmShopMoves || [],
  compatibleTmMoves: compatibleMoves.size,
  shopTmEntries: (tmShopData || []).length,
  coveredCompatibleMoves: compatibleMoves.size - missing.length,
  coveragePercent: Number(((compatibleMoves.size - missing.length) / Math.max(1, compatibleMoves.size) * 100).toFixed(1)),
  missingCount: missing.length,
  missing,
  missingEventOrRestrictedOnlyCount: missingEventOrRestrictedOnly.length,
  missingEventOrRestrictedOnly,
  missingOtherCount: missingOther.length,
  missingOther,
  duplicateShopMoveCount: duplicateShopMoves.length,
  duplicateShopMoves,
  shopOnlyCount: shopOnly.length,
  shopOnly
};

console.log(JSON.stringify(result, null, 2));

if (process.argv.includes("--strict") && (missing.length || duplicateShopMoves.length)) {
  process.exitCode = 1;
}
