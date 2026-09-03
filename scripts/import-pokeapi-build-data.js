const fs = require("fs");
const path = require("path");
const { Dex: showdownDex, toID: showdownId } = require("pokemon-showdown");
const { singlesExcludedMoves, removedMoves } = require("../move-classification-rules.js");

const [, , inputPath = "pokemon-build-data.js", outputPath = inputPath] = process.argv;
const rootDir = path.resolve(__dirname, "..");
const cacheDir = path.join(__dirname, ".pokeapi-cache");
const apiRoot = "https://pokeapi.co/api/v2";
const requestConcurrency = 8;
const userAgent = "RivalSagaDataImporter/1.0";
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
const baseLearnsetLearnMethods = new Set([
  "level-up",
  "remember",
  "reminder"
]);
const legendsArceusNativePokemon = new Set([
  "arcanine-hisui", "avalugg-hisui", "basculegion", "basculegion-female", "basculegion-male",
  "basculin-white-striped", "braviary-hisui", "decidueye-hisui", "dialga-origin", "electrode-hisui",
  "enamorus", "enamorus-incarnate", "enamorus-therian", "goodra-hisui", "growlithe-hisui",
  "kleavor", "lilligant-hisui", "overqwil", "palkia-origin", "qwilfish-hisui", "samurott-hisui",
  "sliggoo-hisui", "sneasel-hisui", "sneasler", "typhlosion-hisui", "ursaluna",
  "ursaluna-bloodmoon", "voltorb-hisui", "wyrdeer", "zoroark-hisui", "zorua-hisui"
]);
const learnsetVersionGroupOrder = Object.freeze([
  "red-green-japan", "red-blue", "blue-japan", "yellow",
  "gold-silver", "crystal",
  "ruby-sapphire", "colosseum", "xd", "emerald", "firered-leafgreen",
  "diamond-pearl", "platinum", "heartgold-soulsilver",
  "black-white", "black-2-white-2",
  "x-y", "omega-ruby-alpha-sapphire",
  "sun-moon", "ultra-sun-ultra-moon",
  "lets-go-pikachu-lets-go-eevee",
  "sword-shield", "the-isle-of-armor", "the-crown-tundra",
  "brilliant-diamond-shining-pearl", "legends-arceus",
  "scarlet-violet", "the-teal-mask", "the-indigo-disk",
  "legends-z-a", "legends-za", "champions"
]);
const showdownSpeciesAliases = Object.freeze({
  "basculegion-female": "basculegionf",
  "indeedee-female": "indeedeef",
  "oinkologne-female": "oinkolognef",
  "tauros-paldea-aqua-breed": "taurospaldeaaqua",
  "tauros-paldea-blaze-breed": "taurospaldeablaze",
  "tauros-paldea-combat-breed": "taurospaldeacombat"
});
const showdownLearnMethodNames = Object.freeze({
  M: "machine",
  T: "tutor",
  L: "level-up",
  R: "restricted",
  E: "egg",
  D: "dream-world",
  S: "event",
  V: "virtual-console"
});

function dataKey(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/['.]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const excludedMoveKeys = new Set([...singlesExcludedMoves, ...removedMoves].map(dataKey));

function rivalSagaMoveIsExcluded(moveName) {
  return excludedMoveKeys.has(dataKey(moveName));
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

function allowedLearnsetVersionGroups(raw = {}, pokemonKey, entry = {}) {
  const groups = new Set();
  (raw.moves || []).forEach((rawMove) => {
    (rawMove.version_group_details || []).forEach((source) => {
      const versionGroup = source.version_group?.name;
      if (learnsetVersionGroupAllowed(versionGroup, pokemonKey, entry)) groups.add(versionGroup);
    });
  });
  return groups;
}

function learnsetVersionGroupRank(versionGroup) {
  const index = learnsetVersionGroupOrder.indexOf(dataKey(versionGroup));
  return index >= 0 ? index : learnsetVersionGroupOrder.length;
}

function sortLearnsetVersionGroups(versionGroups = []) {
  return [...new Set(versionGroups)].sort((a, b) => (
    learnsetVersionGroupRank(a) - learnsetVersionGroupRank(b) || String(a).localeCompare(String(b))
  ));
}

function isTmBucketLearnMethod(learnMethod) {
  const key = dataKey(learnMethod);
  return Boolean(key) && !baseLearnsetLearnMethods.has(key);
}

function showdownSourceDetail(source) {
  const value = String(source || "");
  const generation = Number(value.charAt(0));
  const sourceCode = value.charAt(1).toUpperCase();
  if (!Number.isInteger(generation) || generation < 1 || generation > 9) return null;
  if (!showdownLearnMethodNames[sourceCode] || sourceCode === "C") return null;
  if (value === "8V") return null;
  return {
    source: value,
    generation,
    sourceCode,
    learnMethod: showdownLearnMethodNames[sourceCode],
    level: sourceCode === "L" ? Number.parseInt(value.slice(2), 10) || 0 : 0
  };
}

function showdownSpeciesForEntry(pokemonKey, entry = {}, pokemonCatalog = {}) {
  const inheritedKey = entry.inheritsMovesFrom;
  const inheritedEntry = inheritedKey ? pokemonCatalog[inheritedKey] : null;
  const candidates = [
    showdownSpeciesAliases[pokemonKey],
    inheritedEntry?.displayName,
    inheritedEntry?.pokeapiKey,
    inheritedKey,
    entry.displayName,
    entry.pokeapiKey,
    pokemonKey
  ].map(showdownId).filter(Boolean);
  for (const candidate of candidates) {
    const species = showdownDex.species.get(candidate);
    if (species.exists) return species;
  }
  return null;
}

function showdownLearnsetChain(species) {
  const chain = [];
  const seen = new Set();
  let current = species;
  while (current?.exists && !seen.has(current.id)) {
    seen.add(current.id);
    chain.push(current);
    current = current.prevo ? showdownDex.species.get(current.prevo) : null;
  }
  return chain;
}

function ensureShowdownMoveSeed(moveId, moveCatalog = {}) {
  const raw = showdownDex.moves.get(moveId);
  if (!raw?.exists) return null;
  const existingMatch = Object.entries(moveCatalog)
    .find(([, move]) => Number(move?.moveId || 0) === Number(raw.num || 0));
  const key = existingMatch?.[0] || dataKey(raw.name || raw.id);
  moveCatalog[key] = compactNulls({
    ...(moveCatalog[key] || {}),
    name: raw.name,
    moveId: raw.num,
    pokeapiKey: moveCatalog[key]?.pokeapiKey || raw.id,
    source: moveCatalog[key]?.source || (moveCatalog[key] ? undefined : "pokemon-showdown"),
    type: moveCatalog[key]?.type || raw.type,
    category: moveCatalog[key]?.category || raw.category,
    power: moveCatalog[key]?.power ?? raw.basePower,
    accuracy: moveCatalog[key]?.accuracy ?? (raw.accuracy === true ? null : raw.accuracy),
    pp: moveCatalog[key]?.pp ?? raw.pp,
    priority: moveCatalog[key]?.priority ?? raw.priority,
    description: moveCatalog[key]?.description || raw.shortDesc || raw.desc,
    showdownId: raw.id,
    showdownStatus: raw.status || undefined,
    showdownFlags: Object.entries(raw.flags || {})
      .filter(([, enabled]) => Boolean(enabled))
      .map(([flag]) => flag)
  });
  return moveCatalog[key];
}

function dedupeMoveCatalogById(moveCatalog = {}) {
  const keyByMoveId = new Map();
  Object.entries(moveCatalog).forEach(([key, move]) => {
    const moveId = Number(move?.moveId || 0);
    if (!moveId) return;
    const existingKey = keyByMoveId.get(moveId);
    if (!existingKey) {
      keyByMoveId.set(moveId, key);
      return;
    }
    moveCatalog[existingKey] = compactNulls({
      ...move,
      ...moveCatalog[existingKey],
      showdownId: moveCatalog[existingKey].showdownId || move.showdownId,
      showdownStatus: moveCatalog[existingKey].showdownStatus || move.showdownStatus,
      showdownFlags: moveCatalog[existingKey].showdownFlags?.length
        ? moveCatalog[existingKey].showdownFlags
        : move.showdownFlags
    });
    delete moveCatalog[key];
  });
}

function mergeShowdownHistoricalLearnset(entry, pokemonKey, pokemonCatalog, moveCatalog, learnsetRaw = null, allowedVersionGroups = null) {
  const species = showdownSpeciesForEntry(pokemonKey, entry, pokemonCatalog);
  if (!species) return { entry, matched: false };

  const byMove = new Map();
  showdownLearnsetChain(species).forEach((chainSpecies) => {
    const learnset = showdownDex.species.getLearnsetData(chainSpecies.id).learnset || {};
    Object.entries(learnset).forEach(([moveId, sources]) => {
      const legalSources = (sources || []).map(showdownSourceDetail).filter(Boolean);
      if (!legalSources.length) return;
      const current = byMove.get(moveId) || [];
      byMove.set(moveId, [...current, ...legalSources.map((source) => ({ ...source, inheritedFrom: chainSpecies.id }))]);
    });
  });

  const levelDetails = levelUpMoveDetailsFor(entry)
    .filter((move) => !rivalSagaMoveIsExcluded(move.name || move.move))
    .map((move) => ({ ...move }));
  const levelKeys = new Set(levelDetails.map((move) => Number(move.moveId || 0) || dataKey(move.name || move.move)));
  const tmDetails = (entry.tmMoveDetails || [])
    .filter((move) => !rivalSagaMoveIsExcluded(move.name || move.move))
    .map((move) => ({ ...move }));
  const tmKeys = new Set(tmDetails.map((move) => Number(move.moveId || 0) || dataKey(move.name || move.move)));

  byMove.forEach((sources, moveId) => {
    const move = ensureShowdownMoveSeed(moveId, moveCatalog);
    if (!move) return;
    if (rivalSagaMoveIsExcluded(move.name)) return;
    if (!rawLearnsetMoveAllowedForShowdownMerge(learnsetRaw, move, allowedVersionGroups)) return;
    const moveKey = Number(move.moveId || 0) || dataKey(move.name);
    const levelSource = sources
      .filter((source) => source.sourceCode === "L")
      .sort((a, b) => b.generation - a.generation || b.level - a.level)[0] || null;
    if (levelSource) {
      if (!levelKeys.has(moveKey)) {
        levelDetails.push(compactNulls({
          level: levelSource.level,
          name: move.name,
          moveId: move.moveId,
          source: "pokemon-showdown",
          sourceGeneration: levelSource.generation,
          inheritedFrom: levelSource.inheritedFrom
        }));
        levelKeys.add(moveKey);
      }
      return;
    }
    if (levelKeys.has(moveKey) || tmKeys.has(moveKey)) return;
    const tmSource = sources.sort((a, b) => b.generation - a.generation || b.source.localeCompare(a.source))[0];
    tmDetails.push(compactNulls({
      name: move.name,
      moveId: move.moveId,
      versionGroup: `showdown-gen-${tmSource.generation}`,
      learnMethod: tmSource.learnMethod,
      source: "pokemon-showdown",
      sourceCode: tmSource.source,
      inheritedFrom: tmSource.inheritedFrom
    }));
    tmKeys.add(moveKey);
  });

  const filteredTmDetails = tmDetails.filter((move) => (
    !levelKeys.has(Number(move.moveId || 0) || dataKey(move.name || move.move))
  ));
  return {
    matched: true,
    entry: compactNulls({
      ...entry,
      levelUpMoves: levelDetails.map((move) => move.name || move.move).filter(Boolean),
      levelUpMoveDetails: levelDetails,
      tmMoves: filteredTmDetails.map((move) => move.name || move.move).filter(Boolean),
      tmMoveDetails: filteredTmDetails
    })
  };
}

function readBuildData(filePath) {
  const resolved = path.resolve(rootDir, filePath);
  delete require.cache[resolved];
  return structuredClone(require(resolved));
}

function titleCase(value) {
  return String(value || "")
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function apiNameFromUrl(url) {
  return String(url || "").split("/").filter(Boolean).pop() || "";
}

function idFromUrl(url) {
  return Number(apiNameFromUrl(url)) || 0;
}

function normalizeStatName(name) {
  return {
    hp: "hp",
    attack: "atk",
    defense: "def",
    "special-attack": "spa",
    "special-defense": "spd",
    speed: "spe"
  }[name] || dataKey(name);
}

function englishNamedValue(entries = [], fallback = "") {
  const entry = entries.find((candidate) => candidate.language?.name === "en");
  return entry?.name || fallback;
}

function englishEffect(entries = [], effectChance = null) {
  const entry = entries.find((candidate) => candidate.language?.name === "en");
  const fillChance = (text) => String(text || "").replace(/\$effect_chance/g, effectChance ?? "");
  return {
    effect: fillChance(entry?.effect || ""),
    shortDesc: fillChance(entry?.short_effect || "")
  };
}

function englishFlavor(entries = []) {
  const englishEntries = entries.filter((entry) => entry.language?.name === "en");
  const newest = englishEntries[englishEntries.length - 1] || englishEntries[0];
  return String(newest?.flavor_text || "").replace(/\s+/g, " ").trim();
}

function compactNulls(value) {
  if (Array.isArray(value)) return value.map(compactNulls);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(Object.entries(value)
    .filter(([, entryValue]) => entryValue !== undefined && entryValue !== null && entryValue !== "")
    .map(([key, entryValue]) => [key, compactNulls(entryValue)]));
}

function cachePathFor(kind, id) {
  return path.join(cacheDir, kind, `${dataKey(id)}.json`);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJson(kind, id, url = `${apiRoot}/${kind}/${id}`) {
  const localPath = cachePathFor(kind, id);
  if (fs.existsSync(localPath)) {
    return JSON.parse(fs.readFileSync(localPath, "utf8"));
  }

  for (let attempt = 1; attempt <= 4; attempt += 1) {
    const response = await fetch(url, { headers: { "user-agent": userAgent } });
    if (response.status === 404) return null;
    if (response.ok) {
      const json = await response.json();
      fs.mkdirSync(path.dirname(localPath), { recursive: true });
      fs.writeFileSync(localPath, JSON.stringify(json));
      return json;
    }
    if (attempt === 4) {
      throw new Error(`PokeAPI ${kind}/${id} failed with ${response.status}`);
    }
    await sleep(350 * attempt);
  }
  return null;
}

async function mapLimit(entries, limit, task) {
  const results = new Array(entries.length);
  let cursor = 0;
  async function worker() {
    while (cursor < entries.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await task(entries[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, entries.length) }, worker));
  return results;
}

function moveMetadata(raw, existing = {}) {
  const name = englishNamedValue(raw.names, existing.name || titleCase(raw.name));
  const effect = englishEffect(raw.effect_entries, raw.effect_chance);
  return compactNulls({
    ...existing,
    name,
    moveId: raw.id,
    pokeapiKey: raw.name,
    type: titleCase(raw.type?.name),
    category: titleCase(raw.damage_class?.name),
    power: raw.power,
    accuracy: raw.accuracy,
    pp: raw.pp,
    maxPp: Number.isFinite(Number(raw.pp)) ? Math.floor(Number(raw.pp) * 8 / 5) : undefined,
    priority: raw.priority,
    effectChance: raw.effect_chance,
    target: titleCase(raw.target?.name),
    ailment: titleCase(raw.meta?.ailment?.name),
    moveClass: titleCase(raw.meta?.category?.name),
    drain: raw.meta?.drain,
    healing: raw.meta?.healing,
    critRate: raw.meta?.crit_rate,
    ailmentChance: raw.meta?.ailment_chance,
    flinchChance: raw.meta?.flinch_chance,
    statChance: raw.meta?.stat_chance,
    minHits: raw.meta?.min_hits,
    maxHits: raw.meta?.max_hits,
    minTurns: raw.meta?.min_turns,
    maxTurns: raw.meta?.max_turns,
    statChanges: raw.stat_changes?.map((change) => ({
      stat: normalizeStatName(change.stat?.name),
      stages: change.change
    })),
    ...effect,
    description: effect.shortDesc || effect.effect || englishFlavor(raw.flavor_text_entries)
  });
}

function pokemonMetadata(raw, existing = {}) {
  const abilityRefs = (raw.abilities || [])
    .sort((a, b) => Number(a.slot || 0) - Number(b.slot || 0))
    .map((entry) => ({
      key: dataKey(entry.ability?.name),
      name: titleCase(entry.ability?.name),
      hidden: Boolean(entry.is_hidden),
      slot: Number(entry.slot || 0),
      url: entry.ability?.url || ""
    }));
  return compactNulls({
    ...existing,
    pokeapiKey: raw.name,
    pokeapiPokemonId: raw.id,
    speciesKey: apiNameFromUrl(raw.species?.url),
    types: (raw.types || [])
      .sort((a, b) => Number(a.slot || 0) - Number(b.slot || 0))
      .map((entry) => titleCase(entry.type?.name)),
    baseStats: Object.fromEntries((raw.stats || []).map((entry) => [
      normalizeStatName(entry.stat?.name),
      Number(entry.base_stat || 0)
    ])),
    abilities: abilityRefs.filter((entry) => !entry.hidden).map((entry) => entry.name),
    hiddenAbilities: abilityRefs.filter((entry) => entry.hidden).map((entry) => entry.name),
    abilityKeys: abilityRefs.map((entry) => entry.key),
    height: raw.height,
    weight: raw.weight,
    baseExperience: raw.base_experience,
    sprite: raw.sprites?.other?.["official-artwork"]?.front_default
      || raw.sprites?.other?.home?.front_default
      || raw.sprites?.front_default
  });
}

function levelUpMoveDetailsFor(entry = {}) {
  return Array.isArray(entry.levelUpMoveDetails) && entry.levelUpMoveDetails.length
    ? entry.levelUpMoveDetails
    : (entry.levelUpMoves || []).map((name) => ({ name }));
}

function rawMoveMatchesDetail(rawMove, detail) {
  const moveId = Number(detail.moveId || 0);
  if (moveId) return idFromUrl(rawMove.move?.url) === moveId;
  return dataKey(rawMove.move?.name) === dataKey(detail.name || detail.move);
}

function rawMoveMatchesMove(rawMove, move) {
  const moveId = Number(move?.moveId || 0);
  if (moveId) return idFromUrl(rawMove.move?.url) === moveId;
  return dataKey(rawMove.move?.name) === dataKey(move?.name || move?.move);
}

function rawMoveHasAllowedLearnsetSource(rawMove, allowedVersionGroups) {
  return (rawMove?.version_group_details || [])
    .some((source) => allowedVersionGroups.has(source.version_group?.name));
}

function rawMoveHasExplicitlyIgnoredLearnsetSource(rawMove, allowedVersionGroups) {
  return (rawMove?.version_group_details || []).some((source) => {
    const versionGroup = dataKey(source.version_group?.name);
    return !allowedVersionGroups.has(source.version_group?.name)
      && (excludedLearnsetVersionGroups.has(versionGroup)
        || conditionallyExcludedLearnsetVersionGroups.has(versionGroup));
  });
}

function rawLearnsetMoveAllowedForShowdownMerge(learnsetRaw, move, allowedVersionGroups) {
  if (!learnsetRaw || !allowedVersionGroups?.size) return true;
  const rawMove = (learnsetRaw.moves || [])
    .find((candidate) => rawMoveMatchesMove(candidate, move));
  if (!rawMove) return true;
  return !rawMoveHasExplicitlyIgnoredLearnsetSource(rawMove, allowedVersionGroups)
    || rawMoveHasAllowedLearnsetSource(rawMove, allowedVersionGroups);
}

function allowedBaseLearnsetSources(rawMove, allowedVersionGroups) {
  return (rawMove?.version_group_details || []).filter((source) => (
    baseLearnsetLearnMethods.has(source.move_learn_method?.name)
      && allowedVersionGroups.has(source.version_group?.name)
  ));
}

function latestAllowedBaseLearnsetSource(rawMove, allowedVersionGroups) {
  return allowedBaseLearnsetSources(rawMove, allowedVersionGroups)
    .sort((a, b) => learnsetVersionGroupRank(b.version_group?.name) - learnsetVersionGroupRank(a.version_group?.name))[0] || null;
}

function allowedTmLearnsetSources(rawMove, allowedVersionGroups) {
  return (rawMove?.version_group_details || []).filter((source) => (
    isTmBucketLearnMethod(source.move_learn_method?.name)
      && allowedVersionGroups.has(source.version_group?.name)
  ));
}

function latestAllowedTmLearnsetSource(rawMove, allowedVersionGroups) {
  return allowedTmLearnsetSources(rawMove, allowedVersionGroups)
    .sort((a, b) => learnsetVersionGroupRank(b.version_group?.name) - learnsetVersionGroupRank(a.version_group?.name))[0] || null;
}

function hasAllowedBaseLearnsetSource(raw, detail, allowedVersionGroups) {
  const rawMove = (raw.moves || []).find((candidate) => rawMoveMatchesDetail(candidate, detail));
  return Boolean(latestAllowedBaseLearnsetSource(rawMove, allowedVersionGroups));
}

function latestAllowedLevelUpVersionGroup(raw, allowedVersionGroups) {
  const found = new Set();
  (raw.moves || []).forEach((rawMove) => {
    (rawMove.version_group_details || []).forEach((source) => {
      const versionGroup = source.version_group?.name;
      if (source.move_learn_method?.name === "level-up" && allowedVersionGroups.has(versionGroup)) {
        found.add(versionGroup);
      }
    });
  });
  return [...found].sort((a, b) => learnsetVersionGroupRank(b) - learnsetVersionGroupRank(a))[0] || "";
}

function buildBaseLearnsetDetail(rawMove, source, moveCatalog = {}) {
  const moveKey = dataKey(rawMove.move?.name);
  return compactNulls({
    level: Number(source.level_learned_at || 0),
    name: moveCatalog[moveKey]?.name || titleCase(rawMove.move?.name),
    moveId: idFromUrl(rawMove.move?.url)
  });
}

function buildTmLearnsetDetail(rawMove, source, moveCatalog = {}) {
  const moveKey = dataKey(rawMove.move?.name);
  return compactNulls({
    name: moveCatalog[moveKey]?.name || titleCase(rawMove.move?.name),
    moveId: idFromUrl(rawMove.move?.url),
    versionGroup: source.version_group?.name,
    learnMethod: source.move_learn_method?.name
  });
}

function ensureMoveSeed(rawMove, moveCatalog = {}) {
  const moveKey = dataKey(rawMove.move?.name);
  if (!moveKey) return;
  moveCatalog[moveKey] ||= compactNulls({
    name: titleCase(rawMove.move?.name),
    moveId: idFromUrl(rawMove.move?.url),
    pokeapiKey: rawMove.move?.name
  });
}

function baseLearnsetDetailsFromRaw(entry, learnsetRaw, allowedVersionGroups, moveCatalog) {
  const details = levelUpMoveDetailsFor(entry)
    .filter((detail) => !rivalSagaMoveIsExcluded(detail.name || detail.move))
    .filter((detail) => detail.source === "bulbapedia-rem"
      || (detail.source === "pokemon-showdown"
        && rawLearnsetMoveAllowedForShowdownMerge(learnsetRaw, detail, allowedVersionGroups))
      || hasAllowedBaseLearnsetSource(learnsetRaw, detail, allowedVersionGroups));
  const seen = new Set(details.map((detail) => Number(detail.moveId || 0) || dataKey(detail.name || detail.move)));
  (learnsetRaw.moves || []).forEach((rawMove) => {
    if (rivalSagaMoveIsExcluded(rawMove.move?.name)) return;
    const source = latestAllowedBaseLearnsetSource(rawMove, allowedVersionGroups);
    if (!source) return;
    const moveKey = idFromUrl(rawMove.move?.url) || dataKey(rawMove.move?.name);
    if (!moveKey || seen.has(moveKey)) return;
    ensureMoveSeed(rawMove, moveCatalog);
    details.push(buildBaseLearnsetDetail(rawMove, source, moveCatalog));
    seen.add(moveKey);
  });
  return details;
}

function tmLearnsetDetailsFromRaw(learnsetRaw, allowedVersionGroups, moveCatalog) {
  const details = [];
  const seen = new Set();
  (learnsetRaw.moves || []).forEach((rawMove) => {
    if (rivalSagaMoveIsExcluded(rawMove.move?.name)) return;
    const source = latestAllowedTmLearnsetSource(rawMove, allowedVersionGroups);
    if (!source) return;
    const moveKey = idFromUrl(rawMove.move?.url) || dataKey(rawMove.move?.name);
    if (!moveKey || seen.has(moveKey)) return;
    ensureMoveSeed(rawMove, moveCatalog);
    details.push(buildTmLearnsetDetail(rawMove, source, moveCatalog));
    seen.add(moveKey);
  });
  return details;
}

function filterBaseLearnsetVersionGroups(entry, learnsetRaw, allowedVersionGroups, moveCatalog) {
  if (!learnsetRaw || !allowedVersionGroups?.size) return entry;
  const details = levelUpMoveDetailsFor(entry);
  const filteredDetails = baseLearnsetDetailsFromRaw(entry, learnsetRaw, allowedVersionGroups, moveCatalog);
  const canonicalVersionGroup = !allowedVersionGroups.has(dataKey(entry.canonicalVersionGroup))
    ? latestAllowedLevelUpVersionGroup(learnsetRaw, allowedVersionGroups)
    : entry.canonicalVersionGroup;
  if (filteredDetails.length === details.length && canonicalVersionGroup === entry.canonicalVersionGroup) return entry;
  return compactNulls({
    ...entry,
    canonicalVersionGroup,
    levelUpMoves: filteredDetails.map((move) => move.name || move.move).filter(Boolean),
    levelUpMoveDetails: filteredDetails
  });
}

function filterPokemonLearnsets(entry, learnsetRaw, allowedVersionGroups, moveCatalog) {
  if (!learnsetRaw || !allowedVersionGroups?.size) return entry;
  const baseEntry = filterBaseLearnsetVersionGroups(entry, learnsetRaw, allowedVersionGroups, moveCatalog);
  const baseMoveKeys = new Set(levelUpMoveDetailsFor(baseEntry)
    .map((move) => Number(move.moveId || 0) || dataKey(move.name || move.move))
    .filter(Boolean));
  const tmDetails = tmLearnsetDetailsFromRaw(learnsetRaw, allowedVersionGroups, moveCatalog)
    .filter((move) => !baseMoveKeys.has(Number(move.moveId || 0) || dataKey(move.name || move.move)));
  const nextEntry = {
    ...baseEntry
  };
  delete nextEntry.tmMoves;
  delete nextEntry.tmMoveDetails;
  if (tmDetails.length) {
    nextEntry.tmMoves = tmDetails.map((move) => move.name || move.move).filter(Boolean);
    nextEntry.tmMoveDetails = tmDetails;
  }
  return compactNulls(nextEntry);
}

function abilityMetadata(raw) {
  const effect = englishEffect(raw.effect_entries);
  return compactNulls({
    name: englishNamedValue(raw.names, titleCase(raw.name)),
    abilityId: raw.id,
    pokeapiKey: raw.name,
    generation: titleCase(raw.generation?.name),
    ...effect,
    description: effect.shortDesc || effect.effect || englishFlavor(raw.flavor_text_entries)
  });
}

function speciesMetadata(raw) {
  return compactNulls({
    name: englishNamedValue(raw.names, titleCase(raw.name)),
    speciesId: raw.id,
    pokeapiKey: raw.name,
    generation: titleCase(raw.generation?.name),
    color: titleCase(raw.color?.name),
    shape: titleCase(raw.shape?.name),
    habitat: titleCase(raw.habitat?.name),
    eggGroups: (raw.egg_groups || []).map((entry) => titleCase(entry.name)),
    genus: englishNamedValue(raw.genera, ""),
    flavorText: englishFlavor(raw.flavor_text_entries),
    captureRate: raw.capture_rate,
    baseHappiness: raw.base_happiness,
    hatchCounter: raw.hatch_counter,
    genderRate: raw.gender_rate,
    isBaby: raw.is_baby,
    isLegendary: raw.is_legendary,
    isMythical: raw.is_mythical,
    evolvesFrom: apiNameFromUrl(raw.evolves_from_species?.url)
  });
}

function buildOutput(data) {
  const usefulnessSource = fs.readFileSync(path.join(rootDir, "showdown-move-usefulness.js"), "utf8")
    .replace("  if (typeof module !== \"undefined\" && module.exports) module.exports = api;\n", "");
  return `const rivalSagaBuildData = Object.freeze(${JSON.stringify(data, null, 2)});

if (typeof window !== "undefined") {
  window.rivalSagaBuildData = rivalSagaBuildData;
}

if (typeof module !== "undefined") {
  module.exports = rivalSagaBuildData;
}

// Bundled here so the lazy-loaded Teambuilder data and its Showdown guidance
// always arrive together, including when an older local server is still running.
${usefulnessSource}
`;
}

async function main() {
  fs.mkdirSync(cacheDir, { recursive: true });
  const data = readBuildData(inputPath);
  data.source ||= {};
  data.pokemon ||= {};
  data.moves ||= {};
  data.abilities ||= {};
  data.species ||= {};
  data.items ||= {};
  data.natures ||= [];

  const missingPokemon = [];
  const missingMoves = [];
  const pokemonEntries = Object.entries(data.pokemon);
  const includedVersionGroups = new Set([...rivalSagaLearnsetVersionGroups]
    .filter((versionGroup) => !excludedLearnsetVersionGroups.has(versionGroup)));
  const observedTmLearnMethods = new Set();
  let showdownMatchedPokemon = 0;
  const showdownMissingPokemon = [];
  const abilityRefs = new Map();
  const speciesRefs = new Map();

  console.log(`Enriching ${pokemonEntries.length} Pokemon from PokeAPI...`);
  await mapLimit(pokemonEntries, requestConcurrency, async ([key, entry], index) => {
    const raw = await fetchJson("pokemon", entry.pokeapiKey || key);
    if (!raw) {
      missingPokemon.push(key);
      return;
    }
    let learnsetRaw = raw;
    if (entry.inheritsMovesFrom && data.pokemon[entry.inheritsMovesFrom]) {
      const sourceEntry = data.pokemon[entry.inheritsMovesFrom];
      learnsetRaw = await fetchJson("pokemon", sourceEntry.pokeapiKey || entry.inheritsMovesFrom) || raw;
    }
    const allowedVersionGroups = allowedLearnsetVersionGroups(learnsetRaw, key, entry);
    allowedVersionGroups.forEach((versionGroup) => includedVersionGroups.add(versionGroup));
    (learnsetRaw.moves || []).forEach((rawMove) => {
      (rawMove.version_group_details || []).forEach((source) => {
        if (!allowedVersionGroups.has(source.version_group?.name)) return;
        if (isTmBucketLearnMethod(source.move_learn_method?.name)) {
          observedTmLearnMethods.add(source.move_learn_method?.name);
        }
      });
    });
    const filteredEntry = filterPokemonLearnsets(
      pokemonMetadata(raw, entry),
      learnsetRaw,
      allowedVersionGroups,
      data.moves
    );
    const showdownMerge = mergeShowdownHistoricalLearnset(
      filteredEntry,
      key,
      data.pokemon,
      data.moves,
      learnsetRaw,
      allowedVersionGroups
    );
    data.pokemon[key] = showdownMerge.entry;
    if (showdownMerge.matched) showdownMatchedPokemon += 1;
    else showdownMissingPokemon.push(key);
    (raw.abilities || []).forEach((ability) => {
      const abilityKey = dataKey(ability.ability?.name);
      if (abilityKey) abilityRefs.set(abilityKey, ability.ability?.url);
    });
    const speciesKey = apiNameFromUrl(raw.species?.url);
    if (speciesKey) speciesRefs.set(speciesKey, raw.species?.url);
    if ((index + 1) % 100 === 0) console.log(`  Pokemon ${index + 1}/${pokemonEntries.length}`);
  });

  Object.keys(data.moves).forEach((moveKey) => {
    ensureShowdownMoveSeed(data.moves[moveKey]?.moveId || moveKey, data.moves);
  });
  dedupeMoveCatalogById(data.moves);

  const moveEntries = Object.entries(data.moves);
  console.log(`Enriching ${moveEntries.length} moves from PokeAPI...`);
  await mapLimit(moveEntries, requestConcurrency, async ([key, entry], index) => {
    const moveRef = entry.moveId || entry.pokeapiKey || key;
    if (entry.source === "pokemon-showdown" && !fs.existsSync(cachePathFor("move", moveRef))) {
      return;
    }
    const raw = await fetchJson("move", moveRef);
    if (!raw) {
      missingMoves.push(key);
      return;
    }
    data.moves[key] = moveMetadata(raw, entry);
    if ((index + 1) % 100 === 0) console.log(`  Moves ${index + 1}/${moveEntries.length}`);
  });

  const abilityEntries = [...abilityRefs.entries()].sort(([a], [b]) => a.localeCompare(b));
  console.log(`Enriching ${abilityEntries.length} abilities from PokeAPI...`);
  await mapLimit(abilityEntries, requestConcurrency, async ([key, url], index) => {
    const raw = await fetchJson("ability", key, url);
    if (raw) data.abilities[key] = abilityMetadata(raw);
    if ((index + 1) % 75 === 0) console.log(`  Abilities ${index + 1}/${abilityEntries.length}`);
  });

  const speciesEntries = [...speciesRefs.entries()].sort(([a], [b]) => a.localeCompare(b));
  console.log(`Enriching ${speciesEntries.length} species records from PokeAPI...`);
  await mapLimit(speciesEntries, requestConcurrency, async ([key, url], index) => {
    const raw = await fetchJson("pokemon-species", key, url);
    if (raw) data.species[key] = speciesMetadata(raw);
    if ((index + 1) % 100 === 0) console.log(`  Species ${index + 1}/${speciesEntries.length}`);
  });

  data.schemaVersion = Math.max(Number(data.schemaVersion || 0), 4);
  data.source = {
    ...data.source,
    pokemonCount: Object.keys(data.pokemon).length,
    moveCount: Object.keys(data.moves).length,
    versionGroups: sortLearnsetVersionGroups(includedVersionGroups),
    excludedLearnsetVersionGroups: [...excludedLearnsetVersionGroups],
    conditionallyExcludedLearnsetVersionGroups: [...conditionallyExcludedLearnsetVersionGroups],
    legendsArceusNativePokemon: [...legendsArceusNativePokemon].sort(),
    baseLearnsetLearnMethods: [...baseLearnsetLearnMethods],
    tmLearnsetLearnMethods: [...observedTmLearnMethods].sort(),
    tmLearnsetRule: "Every permitted non-level-up learn method is treated as TM-gated.",
    singlesExcludedMoves: [...singlesExcludedMoves],
    removedMoves: [...removedMoves],
    showdownLearnsetSource: "pokemon-showdown",
    showdownMatchedPokemon,
    showdownMissingPokemon,
    pokeapiEnrichedAt: new Date().toISOString(),
    pokeapiPokemonCount: pokemonEntries.length - missingPokemon.length,
    pokeapiMoveCount: moveEntries.length - missingMoves.length,
    abilityCount: Object.keys(data.abilities).length,
    speciesCount: Object.keys(data.species).length,
    missingPokemon,
    missingMoves
  };

  fs.writeFileSync(path.resolve(rootDir, outputPath), buildOutput(compactNulls(data)));
  console.log(`Wrote enriched build data to ${outputPath}.`);
  console.log(`Missing Pokemon: ${missingPokemon.length}. Missing moves: ${missingMoves.length}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
