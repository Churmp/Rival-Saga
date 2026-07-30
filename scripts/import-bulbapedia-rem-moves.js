const fs = require("fs");
const path = require("path");

const [, , inputPath = "pokemon-build-data.js", outputPath = inputPath, ...rawTargets] = process.argv;
const rootDir = path.resolve(__dirname, "..");
const cacheDir = path.join(__dirname, ".bulbapedia-cache", "pokemon");
const reminderListPath = path.join(rootDir, "bulbapedia-rem-moves.json");
const userAgent = "RivalSagaDataImporter/1.0";
const batchSize = 20;
const requestDelayMs = 150;
const importAll = rawTargets.includes("--all");
const refreshCache = rawTargets.includes("--refresh");
const targetKeys = rawTargets.filter((target) => !target.startsWith("--"));

if (!importAll && !targetKeys.length) {
  console.error(
    "Usage: node scripts/import-bulbapedia-rem-moves.js "
    + "<pokemon-build-data.js> [output] <--all|pokemon-key...> [--refresh]"
  );
  process.exit(1);
}

function dataKey(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[\u2019'.]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function readBuildData(filePath) {
  const resolved = path.resolve(rootDir, filePath);
  delete require.cache[resolved];
  return structuredClone(require(resolved));
}

function buildOutput(data) {
  return `const rivalSagaBuildData = Object.freeze(${JSON.stringify(data, null, 2)});

if (typeof window !== "undefined") {
  window.rivalSagaBuildData = rivalSagaBuildData;
}

if (typeof module !== "undefined") {
  module.exports = rivalSagaBuildData;
}
`;
}

function compactNulls(value) {
  if (Array.isArray(value)) return value.map(compactNulls);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(Object.entries(value)
    .filter(([, entryValue]) => entryValue !== undefined && entryValue !== null && entryValue !== "")
    .map(([key, entryValue]) => [key, compactNulls(entryValue)]));
}

function pageTitleForEntry(entry, data) {
  const speciesName = data.species?.[entry.speciesKey]?.name || entry.displayName || entry.pokeapiKey || "";
  const baseName = String(speciesName)
    .replace(/\s+\(.+\)$/g, "")
    .replace(/^Mega\s+/i, "")
    .trim();
  return `${baseName}_(Pok\u00e9mon)`;
}

function pageBaseName(pageTitle) {
  return String(pageTitle || "").replace(/_\(Pok\u00e9mon\)$/i, "");
}

function cachePathFor(title) {
  return path.join(cacheDir, `${dataKey(title)}.wikitext`);
}

async function fetchBulbapediaRaw(title) {
  fs.mkdirSync(cacheDir, { recursive: true });
  const localPath = cachePathFor(title);
  if (!refreshCache && fs.existsSync(localPath)) return fs.readFileSync(localPath, "utf8");

  const url = `https://bulbapedia.bulbagarden.net/w/index.php?title=${encodeURIComponent(title)}&action=raw`;
  const response = await fetch(url, { headers: { "user-agent": userAgent } });
  if (!response.ok) throw new Error(`Bulbapedia ${title} failed with ${response.status}`);
  const text = await response.text();
  fs.writeFileSync(localPath, text);
  return text;
}

function sleep(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

function chunks(values, size) {
  const result = [];
  for (let index = 0; index < values.length; index += size) {
    result.push(values.slice(index, index + size));
  }
  return result;
}

function normalizedPageTitle(value) {
  return String(value || "").replace(/_/g, " ");
}

async function fetchBulbapediaBatch(titles) {
  const url = new URL("https://bulbapedia.bulbagarden.net/w/api.php");
  url.searchParams.set("action", "query");
  url.searchParams.set("prop", "revisions");
  url.searchParams.set("rvprop", "content");
  url.searchParams.set("rvslots", "main");
  url.searchParams.set("redirects", "1");
  url.searchParams.set("titles", titles.join("|"));
  url.searchParams.set("format", "json");
  url.searchParams.set("formatversion", "2");

  let lastError = null;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, { headers: { "user-agent": userAgent } });
      if (!response.ok) throw new Error(`Bulbapedia batch failed with ${response.status}`);
      const payload = await response.json();
      const aliases = new Map();
      [...(payload.query?.normalized || []), ...(payload.query?.redirects || [])]
        .forEach((entry) => aliases.set(entry.from, entry.to));
      const pages = new Map((payload.query?.pages || [])
        .filter((page) => !page.missing)
        .map((page) => [
          page.title,
          page.revisions?.[0]?.slots?.main?.content || ""
        ]));
      const result = new Map();
      titles.forEach((title) => {
        let resolvedTitle = normalizedPageTitle(title);
        const visited = new Set();
        while (aliases.has(resolvedTitle) && !visited.has(resolvedTitle)) {
          visited.add(resolvedTitle);
          resolvedTitle = aliases.get(resolvedTitle);
        }
        const text = pages.get(resolvedTitle)
          || [...pages.entries()].find(([pageTitle]) => dataKey(pageTitle) === dataKey(resolvedTitle))?.[1];
        if (text) result.set(title, text);
      });
      return result;
    } catch (error) {
      lastError = error;
      if (attempt < 3) await sleep(500 * attempt);
    }
  }
  throw lastError;
}

async function fetchBulbapediaPages(titles) {
  const pages = new Map();
  const pending = [];
  titles.forEach((title) => {
    const localPath = cachePathFor(title);
    if (!refreshCache && fs.existsSync(localPath)) {
      pages.set(title, fs.readFileSync(localPath, "utf8"));
    } else {
      pending.push(title);
    }
  });

  const batches = chunks(pending, batchSize);
  for (let index = 0; index < batches.length; index += 1) {
    const requestedTitles = batches[index];
    const fetched = await fetchBulbapediaBatch(requestedTitles);
    fetched.forEach((text, title) => pages.set(title, text));
    if ((index + 1) % 5 === 0 || index === batches.length - 1) {
      console.log(`  Bulbapedia batches ${index + 1}/${batches.length}`);
    }
    if (index < batches.length - 1) await sleep(requestDelayMs);
  }
  return pages;
}

function splitTemplateArgs(line) {
  const trimmed = String(line || "").trim();
  if (!trimmed.startsWith("{{") || !trimmed.endsWith("}}")) return [];
  const body = trimmed.slice(2, -2);
  const parts = [];
  let current = "";
  let depth = 0;
  for (let index = 0; index < body.length; index += 1) {
    const pair = body.slice(index, index + 2);
    if (pair === "{{") {
      depth += 1;
      current += pair;
      index += 1;
      continue;
    }
    if (pair === "}}") {
      depth = Math.max(0, depth - 1);
      current += pair;
      index += 1;
      continue;
    }
    const char = body[index];
    if (char === "|" && depth === 0) {
      parts.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  parts.push(current.trim());
  return parts;
}

function cleanMoveName(value) {
  return String(value || "")
    .replace(/\{\{m\|([^}|]+).*?\}\}/g, "$1")
    .replace(/\[\[([^|\]]+\|)?([^\]]+)\]\]/g, "$2")
    .replace(/'''/g, "")
    .trim();
}

function remMoveNameFromLearnlist(line) {
  const args = splitTemplateArgs(line);
  const templateName = dataKey(args[0]);
  if (!templateName.startsWith("learnlist-level")) return "";
  if (!String(args[1] || "").includes("{{tt|Rem.")) return "";
  const moveIndex = templateName === "learnlist-levelza" ? 3 : 2;
  return cleanMoveName(args[moveIndex]);
}

function cleanHeading(value) {
  return cleanMoveName(value)
    .replace(/\{\{[^{}]+\}\}/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function gameCodeFromLine(line) {
  const match = String(line || "").match(/^\{\{gameabbrev\d+\|([^}|]+)/i);
  return match ? String(match[1] || "").trim() : "";
}

function gameCodeForTemplate(templateName, currentGameCode) {
  if (templateName.includes("za")) return "ZA";
  if (currentGameCode) return currentGameCode;
  const generationMatch = templateName.match(/(?:^|-)levelh-(\d+)$/);
  if (generationMatch?.[1] === "9") return "SV";
  return generationMatch?.[1] ? `Generation ${generationMatch[1]}` : "";
}

function supportedReminderGame(gameCode) {
  const key = dataKey(gameCode);
  return key !== "za"
    && key !== "pe"
    && key !== "lgpe"
    && !key.includes("lets-go");
}

function parseBulbapediaRemMoveBlocks(wikitext) {
  const blocks = [];
  let formHeading = "";
  let currentGameCode = "";
  let currentBlock = null;

  String(wikitext || "").split(/\r?\n/).forEach((line) => {
    const headingMatch = String(line).trim().match(/^(=+)\s*(.*?)\s*\1$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      if (level <= 4) formHeading = "";
      if (level === 5) {
        formHeading = cleanHeading(headingMatch[2]);
        currentGameCode = "";
      }
    }

    const nextGameCode = gameCodeFromLine(line);
    if (nextGameCode) currentGameCode = nextGameCode;

    const args = splitTemplateArgs(line);
    const templateName = dataKey(args[0]);
    if (templateName.startsWith("learnlist-levelh")) {
      currentBlock = {
        heading: formHeading,
        gameCode: gameCodeForTemplate(templateName, currentGameCode),
        remMoves: []
      };
      blocks.push(currentBlock);
      return;
    }
    if (templateName.startsWith("learnlist-levelf")) {
      currentBlock = null;
      return;
    }
    if (!currentBlock || !supportedReminderGame(currentBlock.gameCode)) return;

    const moveName = remMoveNameFromLearnlist(line);
    if (!moveName) return;
    if (!currentBlock.remMoves.some((move) => dataKey(move) === dataKey(moveName))) {
      currentBlock.remMoves.push(moveName);
    }
  });

  return blocks.filter((block) => supportedReminderGame(block.gameCode) && block.remMoves.length);
}

function formTokensForEntry(key, entry, pageTitle) {
  const speciesTokens = new Set(dataKey(pageBaseName(pageTitle)).split("-").filter(Boolean));
  const tokens = new Set([
    ...dataKey(key).split("-"),
    ...dataKey(entry.displayName).split("-"),
    ...dataKey(entry.pokeapiKey).split("-")
  ].filter(Boolean));
  speciesTokens.forEach((token) => tokens.delete(token));
  ["form", "forme", "mode"].forEach((token) => tokens.delete(token));
  const regionalAliases = {
    alola: "alolan",
    galar: "galarian",
    hisui: "hisuian",
    paldea: "paldean"
  };
  Object.entries(regionalAliases).forEach(([shortName, adjective]) => {
    if (tokens.has(shortName)) tokens.add(adjective);
    if (tokens.has(adjective)) tokens.add(shortName);
  });
  return tokens;
}

function headingTokensForBlock(block, pageTitle) {
  const speciesTokens = new Set(dataKey(pageBaseName(pageTitle)).split("-").filter(Boolean));
  const tokens = new Set(dataKey(block.heading).split("-").filter(Boolean));
  speciesTokens.forEach((token) => tokens.delete(token));
  ["form", "forme", "mode"].forEach((token) => tokens.delete(token));
  return tokens;
}

function blockMatchScore(block, key, entry, pageTitle) {
  const headingKey = dataKey(block.heading);
  const displayKey = dataKey(entry.displayName);
  const pageKey = dataKey(pageBaseName(pageTitle));
  if (!headingKey || headingKey === "all-forms" || headingKey === "all-formes") return 1;
  if (headingKey === displayKey) return 100;
  if (headingKey === pageKey && displayKey === pageKey) return 95;

  const headingTokens = headingTokensForBlock(block, pageTitle);
  const formTokens = formTokensForEntry(key, entry, pageTitle);
  if (!headingTokens.size && !formTokens.size) return 90;
  const overlap = [...headingTokens].filter((token) => formTokens.has(token)).length;
  if (!overlap) return 0;
  const exactTokenMatch = overlap === headingTokens.size && overlap === formTokens.size;
  return (exactTokenMatch ? 80 : 40) + overlap;
}

function assignBlocksToSourceKeys(blocks, sourceKeys, data, pageTitle) {
  const assignments = new Map(sourceKeys.map((key) => [key, []]));
  const ambiguous = [];
  blocks.forEach((block) => {
    if (sourceKeys.length === 1 || !block.heading || /^all forms?$/i.test(block.heading)) {
      sourceKeys.forEach((key) => assignments.get(key).push(block));
      return;
    }
    const scores = sourceKeys
      .map((key) => ({
        key,
        score: blockMatchScore(block, key, data.pokemon[key], pageTitle)
      }))
      .sort((a, b) => b.score - a.score);
    const bestScore = scores[0]?.score || 0;
    const matches = scores.filter((candidate) => candidate.score === bestScore && candidate.score > 0);
    if (matches.length === 1) {
      assignments.get(matches[0].key).push(block);
    } else {
      ambiguous.push({
        heading: block.heading,
        gameCode: block.gameCode,
        remMoves: block.remMoves,
        candidates: matches.map((candidate) => candidate.key)
      });
    }
  });
  return { assignments, ambiguous };
}

function uniqueMoveNames(blocks) {
  const moves = [];
  const seen = new Set();
  blocks.flatMap((block) => block.remMoves).forEach((moveName) => {
    const key = dataKey(moveName);
    if (!key || seen.has(key)) return;
    seen.add(key);
    moves.push(moveName);
  });
  return moves;
}

function clearReminderDetails(entry) {
  const details = (Array.isArray(entry.levelUpMoveDetails) ? entry.levelUpMoveDetails : [])
    .filter((detail) => detail.source !== "bulbapedia-rem")
    .map((detail) => {
      const nextDetail = { ...detail };
      delete nextDetail.reminderMove;
      return nextDetail;
    });
  entry.levelUpMoveDetails = details;
  entry.levelUpMoves = details.map((detail) => detail.name || detail.move).filter(Boolean);
}

function ensureMoveDetail(entry, moveName, moveCatalog = {}) {
  const moveKey = dataKey(moveName);
  const move = moveCatalog[moveKey] || { name: moveName };
  const details = Array.isArray(entry.levelUpMoveDetails) ? entry.levelUpMoveDetails : [];
  const existingIndex = details.findIndex((detail) => (
    (Number(move.moveId || 0) && Number(detail.moveId || 0) === Number(move.moveId))
    || dataKey(detail.name || detail.move) === moveKey
  ));
  if (existingIndex >= 0) {
    details[existingIndex] = {
      ...details[existingIndex],
      reminderMove: true
    };
    entry.levelUpMoveDetails = details;
    entry.levelUpMoves = details.map((candidate) => candidate.name || candidate.move).filter(Boolean);
    return false;
  }
  const detail = compactNulls({
    level: 0,
    name: move.name || moveName,
    moveId: move.moveId,
    source: "bulbapedia-rem",
    reminderMove: true
  });
  details.push(detail);
  entry.levelUpMoveDetails = details;
  entry.levelUpMoves = details.map((candidate) => candidate.name || candidate.move).filter(Boolean);
  moveCatalog[moveKey] ||= compactNulls({
    name: move.name || moveName,
    moveId: move.moveId,
    pokeapiKey: move.pokeapiKey || moveKey
  });
  return true;
}

function sourceKeysForImport(data) {
  const requestedKeys = importAll
    ? Object.entries(data.pokemon)
      .filter(([, entry]) => !entry.inheritsMovesFrom)
      .map(([key]) => key)
    : targetKeys.map(dataKey);
  return [...new Set(requestedKeys.map((requestedKey) => {
    const requestedEntry = data.pokemon[requestedKey];
    if (!requestedEntry) throw new Error(`Unknown Pokemon key: ${requestedKey}`);
    return requestedEntry.inheritsMovesFrom && data.pokemon[requestedEntry.inheritsMovesFrom]
      ? requestedEntry.inheritsMovesFrom
      : requestedKey;
  }))];
}

function inheritedKeysForSource(data, sourceKey) {
  return Object.entries(data.pokemon)
    .filter(([, entry]) => entry.inheritsMovesFrom === sourceKey)
    .map(([key]) => key);
}

async function main() {
  const data = readBuildData(inputPath);
  data.source ||= {};
  data.pokemon ||= {};
  data.moves ||= {};

  const requestedSourceKeys = sourceKeysForImport(data);
  const sourceKeysByTitle = new Map();
  requestedSourceKeys.forEach((sourceKey) => {
    const title = pageTitleForEntry(data.pokemon[sourceKey], data);
    if (!sourceKeysByTitle.has(title)) sourceKeysByTitle.set(title, new Set());
    sourceKeysByTitle.get(title).add(sourceKey);
  });

  const pageTitles = [...sourceKeysByTitle.keys()].sort((a, b) => a.localeCompare(b));
  console.log(`Fetching ${pageTitles.length} Bulbapedia Pokemon page(s)...`);
  const pageWikitext = importAll
    ? await fetchBulbapediaPages(pageTitles)
    : new Map(await Promise.all(pageTitles.map(async (title) => [title, await fetchBulbapediaRaw(title)])));

  requestedSourceKeys.forEach((sourceKey) => {
    clearReminderDetails(data.pokemon[sourceKey]);
    inheritedKeysForSource(data, sourceKey).forEach((key) => clearReminderDetails(data.pokemon[key]));
  });

  const importedPages = [];
  const reminderEntries = {};
  const ambiguousAssignments = [];
  const missingPages = [];
  let addedCount = 0;

  for (const [title, sourceKeySet] of sourceKeysByTitle) {
    const wikitext = pageWikitext.get(title);
    if (!wikitext) {
      missingPages.push(title);
      continue;
    }
    const sourceKeys = [...sourceKeySet];
    const blocks = parseBulbapediaRemMoveBlocks(wikitext);
    const { assignments, ambiguous } = assignBlocksToSourceKeys(blocks, sourceKeys, data, title);
    if (ambiguous.length) ambiguousAssignments.push({ title, ambiguous });

    for (const sourceKey of sourceKeys) {
      const remMoves = uniqueMoveNames(assignments.get(sourceKey) || []);
      const affectedKeys = [sourceKey, ...inheritedKeysForSource(data, sourceKey)];
      const addedMoves = [];
      affectedKeys.forEach((key) => {
        remMoves.forEach((moveName) => {
          if (ensureMoveDetail(data.pokemon[key], moveName, data.moves) && key === sourceKey) {
            addedMoves.push(moveName);
            addedCount += 1;
          }
        });
      });
      if (remMoves.length) {
        reminderEntries[sourceKey] = {
          title,
          moves: remMoves
        };
        importedPages.push({ key: sourceKey, title, remMoves, addedMoves, affectedKeys });
      }
    }
  }

  const reminderMoveEntryCount = Object.values(reminderEntries)
    .reduce((total, entry) => total + entry.moves.length, 0);
  data.source.bulbapediaRemMoveImports = {
    importedAt: new Date().toISOString(),
    reminderPokemonCount: Object.keys(reminderEntries).length,
    reminderMoveEntryCount,
    pages: importedPages.map(({ key, title, remMoves, addedMoves, affectedKeys }) => ({
      key,
      title,
      remMoveCount: remMoves.length,
      addedMoveCount: addedMoves.length,
      affectedKeys
    }))
  };
  data.source.moveCount = Object.keys(data.moves).length;

  if (importAll) {
    fs.writeFileSync(reminderListPath, `${JSON.stringify(compactNulls({
      source: "Bulbapedia supported-game leveling-up tables",
      generatedAt: new Date().toISOString(),
      excludedGames: ["Let's Go Pikachu/Eevee", "Legends: Z-A"],
      pokemon: reminderEntries,
      missingPages,
      ambiguousAssignments
    }), null, 2)}\n`);
  }
  fs.writeFileSync(path.resolve(rootDir, outputPath), buildOutput(compactNulls(data)));

  const ambiguousCount = ambiguousAssignments
    .reduce((total, page) => total + page.ambiguous.length, 0);
  console.log(`Imported ${addedCount} Rem.-only move(s) from ${importedPages.length} Pokemon entries.`);
  console.log(`Reminder entries: ${reminderMoveEntryCount}`);
  console.log(`Missing pages: ${missingPages.length}`);
  console.log(`Ambiguous form blocks: ${ambiguousCount}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
