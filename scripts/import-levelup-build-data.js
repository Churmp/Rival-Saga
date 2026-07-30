const fs = require("fs");
const path = require("path");

const [, , inputPath, outputPath = "pokemon-build-data.js"] = process.argv;
const excludedLearnsetVersionGroups = new Set([
  "lets-go-pikachu-lets-go-eevee",
  "legends-z-a",
  "legends-za"
]);
const conditionallyExcludedLearnsetVersionGroups = new Set(["legends-arceus"]);
const rivalSagaLearnsetVersionGroups = new Set([
  "red-blue", "yellow", "gold-silver", "crystal", "ruby-sapphire", "emerald", "firered-leafgreen",
  "diamond-pearl", "platinum", "heartgold-soulsilver", "black-white", "black-2-white-2", "x-y",
  "omega-ruby-alpha-sapphire", "sun-moon", "ultra-sun-ultra-moon", "sword-shield",
  "the-isle-of-armor", "the-crown-tundra", "brilliant-diamond-shining-pearl", "legends-arceus",
  "scarlet-violet", "the-teal-mask", "the-indigo-disk"
]);
const legendsArceusNativePokemon = new Set([
  "arcanine-hisui", "avalugg-hisui", "basculegion", "basculegion-female", "basculegion-male",
  "basculin-white-striped", "braviary-hisui", "decidueye-hisui", "dialga-origin", "electrode-hisui",
  "enamorus", "enamorus-incarnate", "enamorus-therian", "goodra-hisui", "growlithe-hisui",
  "kleavor", "lilligant-hisui", "overqwil", "palkia-origin", "qwilfish-hisui", "samurott-hisui",
  "sliggoo-hisui", "sneasel-hisui", "sneasler", "typhlosion-hisui", "ursaluna",
  "ursaluna-bloodmoon", "voltorb-hisui", "wyrdeer", "zoroark-hisui", "zorua-hisui"
]);
const baseLearnsetLearnMethods = new Set([
  "level-up"
]);

if (!inputPath) {
  console.error("Usage: node scripts/import-levelup-build-data.js <levelup-dedup-view.json> [pokemon-build-data.js]");
  process.exit(1);
}

function dataKey(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function isLegendsArceusNativePokemon(key, entry = {}) {
  return [key, entry.pokeapiKey, entry.displayName]
    .map(dataKey)
    .some((candidate) => legendsArceusNativePokemon.has(candidate));
}

function learnsetVersionGroupAllowed(versionGroup, pokemonKey, entry = {}) {
  const key = dataKey(versionGroup);
  if (!key || !rivalSagaLearnsetVersionGroups.has(key) || excludedLearnsetVersionGroups.has(key)) return false;
  if (conditionallyExcludedLearnsetVersionGroups.has(key)) {
    return isLegendsArceusNativePokemon(pokemonKey, entry);
  }
  return true;
}

function uniqueMoves(moves = [], pokemonKey, pokemonEntry = {}) {
  const seen = new Set();
  return moves
    .filter((entry) => {
      const versionGroup = dataKey(entry.versionGroup || entry.version_group || entry.versionGroupName || "");
      const learnMethod = dataKey(entry.learnMethod || entry.learn_method || entry.moveLearnMethod || entry.move_learn_method || "");
      return (!versionGroup || learnsetVersionGroupAllowed(versionGroup, pokemonKey, pokemonEntry))
        && (!learnMethod || baseLearnsetLearnMethods.has(learnMethod));
    })
    .map((entry) => ({
      level: Number(entry.level || 0),
      name: String(entry.move || entry.name || "").trim(),
      moveId: Number(entry.moveId || 0) || undefined
    }))
    .filter((entry) => {
      const key = dataKey(entry.name);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

const source = JSON.parse(fs.readFileSync(inputPath, "utf8"));
const sourcePokemon = source.pokemon || {};
const pokemon = {};
const moves = {};

Object.entries(sourcePokemon)
  .sort(([a], [b]) => a.localeCompare(b))
  .forEach(([key, entry]) => {
    const details = uniqueMoves(
      entry.uniqueLevelUpMovesAcrossLegalVersionGroups || entry.canonicalLevelUpMoves || [],
      key,
      entry
    );
    pokemon[key] = {
      displayName: entry.displayName || key,
      dex: Number(entry.dex || 0) || undefined,
      familyChainId: Number(entry.familyChainId || 0) || undefined,
      canonicalVersionGroup: !learnsetVersionGroupAllowed(entry.canonicalVersionGroup, key, entry)
        ? ""
        : entry.canonicalVersionGroup || "",
      inheritsMovesFrom: entry.inheritsMovesFrom || null,
      levelUpMoves: details.map((move) => move.name),
      levelUpMoveDetails: details,
      abilities: [],
      hiddenAbilities: []
    };
    details.forEach((move) => {
      const moveKey = dataKey(move.name);
      if (!moveKey) return;
      moves[moveKey] ||= {
        name: move.name,
        moveId: move.moveId
      };
    });
  });

const natures = [
  "Hardy", "Lonely", "Brave", "Adamant", "Naughty",
  "Bold", "Docile", "Relaxed", "Impish", "Lax",
  "Timid", "Hasty", "Serious", "Jolly", "Naive",
  "Modest", "Mild", "Quiet", "Bashful", "Rash",
  "Calm", "Gentle", "Sassy", "Careful", "Quirky"
];

const output = `const rivalSagaBuildData = Object.freeze(${JSON.stringify({
  schemaVersion: 2,
  source: {
    kind: "rival-saga-levelup-dedup-view",
    pokemonCount: Object.keys(pokemon).length,
    moveCount: Object.keys(moves).length,
    versionGroups: [...rivalSagaLearnsetVersionGroups]
      .filter((versionGroup) => !excludedLearnsetVersionGroups.has(versionGroup)),
    excludedLearnsetVersionGroups: [...excludedLearnsetVersionGroups],
    conditionallyExcludedLearnsetVersionGroups: [...conditionallyExcludedLearnsetVersionGroups],
    legendsArceusNativePokemon: [...legendsArceusNativePokemon].sort(),
    baseLearnsetLearnMethods: [...baseLearnsetLearnMethods]
  },
  pokemon,
  moves,
  items: {},
  natures
}, null, 2)});

if (typeof window !== "undefined") {
  window.rivalSagaBuildData = rivalSagaBuildData;
}

if (typeof module !== "undefined") {
  module.exports = rivalSagaBuildData;
}
`;

fs.writeFileSync(path.resolve(outputPath), output);
console.log(`Imported ${Object.keys(pokemon).length} Pokemon and ${Object.keys(moves).length} level-up moves into ${outputPath}.`);
