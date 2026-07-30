#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const rootDir = path.resolve(__dirname, "..");
const cacheDir = path.join(__dirname, ".pokeapi-cache");
const apiRoot = "https://pokeapi.co/api/v2";
const userAgent = "RivalSagaEncounterImporter/1.0";
const hoennVersions = ["ruby", "sapphire", "emerald", "omega-ruby", "alpha-sapphire"];
const normalEncounterMethods = ["walk", "surf", "old-rod", "good-rod", "super-rod", "rock-smash"];

const hoennGymLocationBuckets = [
  {
    gym: 1,
    label: "Before Roxanne",
    locations: [
      "hoenn-route-101",
      "hoenn-route-102",
      "hoenn-route-103",
      "hoenn-route-104",
      "petalburg-woods",
      "rustboro-city"
    ]
  },
  {
    gym: 2,
    label: "Before Brawly",
    locations: [
      "hoenn-route-105",
      "hoenn-route-106",
      "dewford-town",
      "granite-cave",
      "hoenn-route-116",
      "rusturf-tunnel"
    ]
  },
  {
    gym: 3,
    label: "Before Wattson",
    locations: [
      "hoenn-route-107",
      "hoenn-route-108",
      "abandoned-ship",
      "sea-mauville",
      "hoenn-route-109",
      "slateport-city",
      "hoenn-route-110",
      "mauville-city",
      "hoenn-route-117"
    ]
  },
  {
    gym: 4,
    label: "Before Flannery",
    locations: [
      "hoenn-route-111",
      "hoenn-route-112",
      "fiery-path",
      "hoenn-route-113",
      "hoenn-route-114",
      "meteor-falls",
      "mt-chimney",
      "jagged-pass",
      "lavaridge-town"
    ]
  },
  {
    gym: 5,
    label: "Before Norman",
    locations: [
      "hoenn-route-111",
      "mirage-tower",
      "desert-underpass",
      "hoenn-route-115",
      "petalburg-city"
    ]
  },
  {
    gym: 6,
    label: "Before Winona",
    locations: [
      "hoenn-route-118",
      "hoenn-route-119",
      "fortree-city",
      "hoenn-route-120"
    ]
  },
  {
    gym: 7,
    label: "Before Tate and Liza",
    locations: [
      "hoenn-route-121",
      "hoenn-safari-zone",
      "lilycove-city",
      "mt-pyre",
      "hoenn-route-122",
      "hoenn-route-123",
      "hoenn-route-124",
      "mossdeep-city",
      "shoal-cave",
      "magma-hideout",
      "team-magma-hideout",
      "team-aqua-hideout"
    ]
  },
  {
    gym: 8,
    label: "Before Wallace/Juan",
    locations: [
      "hoenn-route-125",
      "hoenn-route-126",
      "sootopolis-city",
      "hoenn-route-127",
      "hoenn-route-128",
      "seafloor-cavern",
      "underwater",
      "cave-of-origin"
    ]
  },
  {
    gym: 9,
    label: "Post-Gym / League Approach",
    locations: [
      "hoenn-route-129",
      "hoenn-route-130",
      "hoenn-route-131",
      "pacifidlog-town",
      "hoenn-route-132",
      "hoenn-route-133",
      "hoenn-route-134",
      "sky-pillar",
      "ever-grande-city",
      "hoenn-victory-road",
      "mirage-island",
      "artisan-cave",
      "hoenn-altering-cave",
      "hoenn-battle-frontier"
    ]
  }
];

function parseArgs(argv) {
  const options = {
    outDir: path.join("data", "encounters"),
    versions: hoennVersions,
    includeMethods: normalEncounterMethods,
    json: false
  };
  for (let index = 2; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];
    if (arg === "--out-dir" && next) {
      options.outDir = next;
      index += 1;
    } else if (arg === "--versions" && next) {
      options.versions = next.split(",").map((entry) => dataKey(entry)).filter(Boolean);
      index += 1;
    } else if (arg === "--methods" && next) {
      options.includeMethods = dataKey(next) === "all"
        ? []
        : next.split(",").map((entry) => dataKey(entry)).filter(Boolean);
      index += 1;
    } else if (arg === "--json") {
      options.json = true;
    } else if (arg === "--help" || arg === "-h") {
      options.help = true;
    }
  }
  return options;
}

function printHelp() {
  console.log(`Rival Saga Hoenn encounter importer

Usage:
  node scripts/import-pokeapi-hoenn-encounters.js [--versions ruby,sapphire,emerald,omega-ruby,alpha-sapphire] [--methods walk,surf,old-rod]

What it does:
  - Downloads Hoenn location/location-area encounter data from PokeAPI.
  - Groups locations into draft "before Gym" buckets.
  - Defaults to ordinary wild methods: ${normalEncounterMethods.join(", ")}. Use --methods all to include gifts/static one-time encounters.
  - Cross-checks the draft buckets against the current Rival Saga Hoenn wheels in app.js.
  - Writes JSON and Markdown reports under data/encounters.
`);
}

function dataKey(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/['.]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function normalizePokemonName(name) {
  return dataKey(name)
    .replace(/-f$/i, "-female")
    .replace(/-m$/i, "-male")
    .replace(/-altered$/i, "")
    .replace(/-normal$/i, "");
}

function displayNameFromApiName(name) {
  const special = {
    "mr-mime": "Mr. Mime",
    "mime-jr": "Mime Jr.",
    "ho-oh": "Ho-Oh",
    "porygon-z": "Porygon-Z",
    "jangmo-o": "Jangmo-o",
    "hakamo-o": "Hakamo-o",
    "kommo-o": "Kommo-o",
    "type-null": "Type: Null",
    "nidoran-f": "Nidoran-F",
    "nidoran-m": "Nidoran-M"
  };
  const key = dataKey(name);
  if (special[key]) return special[key];
  return String(name || "")
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function cachePathFor(kind, id) {
  return path.join(cacheDir, kind, `${dataKey(id)}.json`);
}

function apiNameFromUrl(url) {
  return String(url || "").split("/").filter(Boolean).pop() || "";
}

function readWorkspaceFile(fileName) {
  return fs.readFileSync(path.join(rootDir, fileName), "utf8");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJson(kind, id, url = `${apiRoot}/${kind}/${id}`) {
  const localPath = cachePathFor(kind, id);
  if (fs.existsSync(localPath)) return JSON.parse(fs.readFileSync(localPath, "utf8"));

  for (let attempt = 1; attempt <= 4; attempt += 1) {
    const response = await fetch(url, { headers: { "user-agent": userAgent } });
    if (response.status === 404) return null;
    if (response.ok) {
      const json = await response.json();
      fs.mkdirSync(path.dirname(localPath), { recursive: true });
      fs.writeFileSync(localPath, JSON.stringify(json));
      return json;
    }
    if (attempt === 4) throw new Error(`PokeAPI ${kind}/${id} failed with ${response.status}`);
    await sleep(300 * attempt);
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

function matchingCloseFor(openChar) {
  return openChar === "(" ? ")" : openChar === "[" ? "]" : "}";
}

function findMatchingClose(source, openIndex) {
  const openChar = source[openIndex];
  const closeChar = matchingCloseFor(openChar);
  let depth = 0;
  let quote = "";
  let lineComment = false;
  let blockComment = false;
  for (let index = openIndex; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];
    if (lineComment) {
      if (char === "\n") lineComment = false;
      continue;
    }
    if (blockComment) {
      if (char === "*" && next === "/") {
        blockComment = false;
        index += 1;
      }
      continue;
    }
    if (quote) {
      if (char === "\\") index += 1;
      else if (char === quote) quote = "";
      continue;
    }
    if (char === "/" && next === "/") {
      lineComment = true;
      index += 1;
      continue;
    }
    if (char === "/" && next === "*") {
      blockComment = true;
      index += 1;
      continue;
    }
    if (char === "\"" || char === "'" || char === "`") {
      quote = char;
      continue;
    }
    if (char === openChar) depth += 1;
    else if (char === closeChar) {
      depth -= 1;
      if (depth === 0) return index;
    }
  }
  throw new Error(`Could not find matching ${closeChar}.`);
}

function extractObjectFreezeStatement(source, name) {
  const prefix = `const ${name} = Object.freeze(`;
  const start = source.indexOf(prefix);
  if (start < 0) throw new Error(`Could not find ${name} in app.js.`);
  const openIndex = start + prefix.length - 1;
  const closeIndex = findMatchingClose(source, openIndex);
  return source.slice(start, closeIndex + 2);
}

function loadExistingHoennWheels() {
  const appSource = readWorkspaceFile("app.js");
  const code = [
    "function normalizePokemonApiName(name) { return String(name || '').toLowerCase().trim().replace(/['.]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }",
    "function normalizePokemonName(name) { return normalizePokemonApiName(name); }",
    "function normalizeEncounterEntryId(name, index = 0) { const base = normalizePokemonName(name).replace(/-sf$/i, '').replace(/^hyperspace-hole$/i, 'hyperspace-hole'); return index ? `${base}-${index + 1}` : base; }",
    "function encounterEntry(name, index = 0) { const raw = String(name || '').trim(); const isWater = /\\s+SF$/i.test(raw); const displayName = raw.replace(/\\s+SF$/i, '').trim(); const id = normalizeEncounterEntryId(displayName, index); const isHyperspace = normalizePokemonName(displayName) === 'hyperspace-hole'; return { id, pokemonName: displayName, displayName, weight: 1, category: isWater ? 'fishing' : isHyperspace ? 'special' : 'land', enabledByDefault: !isWater, removable: true }; }",
    "function makeEncounterWheel(series, gym, names) { const seen = new Map(); return { id: `${String(series).toLowerCase()}-gym-${gym}`, series, gym, name: `${series} Gym ${gym} Encounter Wheel`, rollsPerAction: 2, rerollable: true, entries: names.map((name) => { const key = normalizePokemonName(String(name).replace(/\\s+SF$/i, '').trim()); const count = seen.get(key) || 0; seen.set(key, count + 1); return encounterEntry(name, count); }) }; }",
    extractObjectFreezeStatement(appSource, "encounterWheelDefinitions"),
    "globalThis.__wheels = encounterWheelDefinitions;"
  ].join("\n");
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: "existing-encounter-wheels.js" });
  return Object.fromEntries(Object.entries(sandbox.__wheels || {})
    .filter(([, wheel]) => wheel.series === "Hoenn")
    .map(([key, wheel]) => [key, wheel]));
}

function encounterCategory(methodName) {
  const method = dataKey(methodName);
  if (/rod|fish/.test(method)) return "fishing";
  if (method === "surf" || method === "seaweed") return "surf";
  return "land";
}

function encounterLevelRange(details = []) {
  const levels = details.flatMap((detail) => [Number(detail.min_level || 0), Number(detail.max_level || 0)]).filter(Boolean);
  return levels.length ? [Math.min(...levels), Math.max(...levels)] : [];
}

function encounterChance(details = []) {
  return details.reduce((sum, detail) => sum + Number(detail.chance || 0), 0);
}

function encounterMatchesOptions(versionDetail, options) {
  const version = dataKey(versionDetail.version?.name);
  if (options.versions.length && !options.versions.includes(version)) return false;
  if (!options.includeMethods.length) return true;
  return (versionDetail.encounter_details || []).some((detail) => options.includeMethods.includes(dataKey(detail.method?.name)));
}

function compactEncounter(pokemonEncounter, area, location, options) {
  const versionDetails = (pokemonEncounter.version_details || []).filter((detail) => encounterMatchesOptions(detail, options));
  if (!versionDetails.length) return null;
  const details = versionDetails.flatMap((detail) => detail.encounter_details || []);
  const methods = [...new Set(details.map((detail) => dataKey(detail.method?.name)).filter(Boolean))].sort();
  const categories = [...new Set(methods.map(encounterCategory))].sort();
  const levelRange = encounterLevelRange(details);
  const chance = versionDetails.reduce((sum, detail) => sum + Number(detail.max_chance || 0), 0) || encounterChance(details);
  const pokemonName = pokemonEncounter.pokemon?.name || "";
  const displayName = displayNameFromApiName(pokemonName);
  return {
    key: normalizePokemonName(pokemonName),
    pokemonName,
    displayName,
    location: location.name,
    locationLabel: displayNameFromApiName(location.name),
    area: area.name,
    areaLabel: displayNameFromApiName(area.name),
    versions: [...new Set(versionDetails.map((detail) => dataKey(detail.version?.name)).filter(Boolean))].sort(),
    methods,
    categories,
    category: categories.includes("land") ? "land" : categories[0] || "land",
    levelRange,
    chance
  };
}

function mergeGymEncounters(entries) {
  const byPokemon = new Map();
  entries.forEach((entry) => {
    const existing = byPokemon.get(entry.key);
    if (!existing) {
      byPokemon.set(entry.key, {
        key: entry.key,
        pokemonName: entry.pokemonName,
        displayName: entry.displayName,
        weight: 1,
        categories: new Set(entry.categories),
        versions: new Set(entry.versions),
        methods: new Set(entry.methods),
        locations: new Set([entry.location]),
        areas: new Set([entry.area]),
        levelMin: entry.levelRange[0] || null,
        levelMax: entry.levelRange[1] || null,
        chanceTotal: Number(entry.chance || 0),
        sightings: 1
      });
      return;
    }
    entry.categories.forEach((category) => existing.categories.add(category));
    entry.versions.forEach((version) => existing.versions.add(version));
    entry.methods.forEach((method) => existing.methods.add(method));
    existing.locations.add(entry.location);
    existing.areas.add(entry.area);
    if (entry.levelRange.length) {
      existing.levelMin = existing.levelMin === null ? entry.levelRange[0] : Math.min(existing.levelMin, entry.levelRange[0]);
      existing.levelMax = existing.levelMax === null ? entry.levelRange[1] : Math.max(existing.levelMax, entry.levelRange[1]);
    }
    existing.chanceTotal += Number(entry.chance || 0);
    existing.sightings += 1;
    existing.weight = Math.max(1, existing.sightings);
  });
  return [...byPokemon.values()]
    .map((entry) => ({
      ...entry,
      categories: [...entry.categories].sort(),
      versions: [...entry.versions].sort(),
      methods: [...entry.methods].sort(),
      locations: [...entry.locations].sort(),
      areas: [...entry.areas].sort()
    }))
    .sort((a, b) => a.displayName.localeCompare(b.displayName));
}

function namesFromWheel(wheel) {
  return [...new Set((wheel?.entries || []).map((entry) => entry.displayName || entry.pokemonName).filter(Boolean))];
}

function compareGym(gymDraft, existingWheel) {
  const draftKeys = new Map(gymDraft.entries.map((entry) => [normalizePokemonName(entry.displayName), entry]));
  const existingNames = namesFromWheel(existingWheel);
  const existingKeys = new Map(existingNames.map((name) => [normalizePokemonName(name), name]));
  const overlap = [...draftKeys.keys()].filter((key) => existingKeys.has(key)).sort();
  const pokeapiOnly = [...draftKeys.entries()]
    .filter(([key]) => !existingKeys.has(key))
    .map(([, entry]) => entry.displayName)
    .sort();
  const rivalSagaOnly = [...existingKeys.entries()]
    .filter(([key]) => !draftKeys.has(key))
    .map(([, name]) => name)
    .sort();
  return {
    gym: gymDraft.gym,
    label: gymDraft.label,
    pokeapiCount: draftKeys.size,
    rivalSagaCount: existingKeys.size,
    overlapCount: overlap.length,
    overlap: overlap.map((key) => existingKeys.get(key)),
    pokeapiOnly,
    rivalSagaOnly
  };
}

function markdownTable(headers, rows) {
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map((cell) => String(cell ?? "").replace(/\|/g, "\\|")).join(" | ")} |`)
  ].join("\n");
}

function shortList(items, limit = 40) {
  if (!items.length) return "-";
  const shown = items.slice(0, limit).join(", ");
  return items.length > limit ? `${shown}, +${items.length - limit} more` : shown;
}

function buildMarkdownReport(payload) {
  const summaryRows = payload.crossCheck.map((entry) => [
    entry.gym,
    entry.label,
    entry.pokeapiCount,
    entry.rivalSagaCount,
    entry.overlapCount,
    entry.pokeapiOnly.length,
    entry.rivalSagaOnly.length
  ]);
  const sections = payload.crossCheck.map((entry) => [
    `## Gym ${entry.gym}: ${entry.label}`,
    "",
    `Locations: ${shortList(payload.gymWheels.find((wheel) => wheel.gym === entry.gym)?.locations || [], 80)}`,
    "",
    `Overlap: ${shortList(entry.overlap)}`,
    "",
    `PokeAPI only: ${shortList(entry.pokeapiOnly)}`,
    "",
    `Rival Saga only: ${shortList(entry.rivalSagaOnly)}`
  ].join("\n"));
  return [
    "# Hoenn PokeAPI Encounter Cross-Check",
    "",
    `Generated: ${payload.generatedAt}`,
    `Versions: ${payload.versions.join(", ")}`,
    `Methods: ${payload.methods.length ? payload.methods.join(", ") : "all PokeAPI encounter methods"}`,
    "",
    "This is a draft/cross-check report. It does not replace live Rival Saga wheels.",
    "",
    "## Summary",
    "",
    markdownTable(["Gym", "Bucket", "PokeAPI", "Rival Saga", "Overlap", "PokeAPI Only", "Rival Saga Only"], summaryRows),
    "",
    "## Missing Bucket Locations",
    "",
    payload.missingLocations.length ? payload.missingLocations.map((entry) => `- Gym ${entry.gym}: ${entry.location}`).join("\n") : "None.",
    "",
    ...sections,
    ""
  ].join("\n");
}

async function loadHoennLocationData(options) {
  const region = await fetchJson("region", "hoenn");
  if (!region) throw new Error("PokeAPI did not return Hoenn region data.");
  const locations = await mapLimit(region.locations || [], 6, async (locationRef) => {
    const locationName = apiNameFromUrl(locationRef.url) || locationRef.name;
    const location = await fetchJson("location", locationName, locationRef.url);
    if (!location) return null;
    const areas = await mapLimit(location.areas || [], 6, async (areaRef) => {
      const areaName = apiNameFromUrl(areaRef.url) || areaRef.name;
      const area = await fetchJson("location-area", areaName, areaRef.url);
      if (!area) return null;
      const encounters = (area.pokemon_encounters || [])
        .map((entry) => compactEncounter(entry, area, location, options))
        .filter(Boolean);
      return { area, encounters };
    });
    return {
      name: location.name,
      label: displayNameFromApiName(location.name),
      areas: areas.filter(Boolean)
    };
  });
  return locations.filter(Boolean);
}

function buildDraftWheels(locations, options) {
  const byLocation = new Map(locations.map((location) => [location.name, location]));
  const missingLocations = [];
  const gymWheels = hoennGymLocationBuckets.map((bucket) => {
    const rawEntries = [];
    bucket.locations.forEach((locationName) => {
      const location = byLocation.get(locationName);
      if (!location) {
        missingLocations.push({ gym: bucket.gym, location: locationName });
        return;
      }
      location.areas.forEach((area) => rawEntries.push(...area.encounters));
    });
    return {
      id: `hoenn-gym-${bucket.gym}`,
      series: "Hoenn",
      gym: bucket.gym,
      label: bucket.label,
      name: `Hoenn Gym ${bucket.gym} PokeAPI Draft Wheel`,
      locations: bucket.locations,
      sourceVersions: options.versions,
      entries: mergeGymEncounters(rawEntries)
    };
  });
  return { gymWheels, missingLocations };
}

function writeOutputs(options, payload) {
  const outDir = path.resolve(rootDir, options.outDir);
  fs.mkdirSync(outDir, { recursive: true });
  const jsonPath = path.join(outDir, "hoenn-pokeapi-draft.json");
  const markdownPath = path.join(outDir, "hoenn-pokeapi-crosscheck.md");
  fs.writeFileSync(jsonPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(markdownPath, buildMarkdownReport(payload), "utf8");
  return { jsonPath, markdownPath };
}

async function main() {
  const options = parseArgs(process.argv);
  if (options.help) {
    printHelp();
    return;
  }
  fs.mkdirSync(cacheDir, { recursive: true });
  const existingHoennWheels = loadExistingHoennWheels();
  const locations = await loadHoennLocationData(options);
  const { gymWheels, missingLocations } = buildDraftWheels(locations, options);
  const crossCheck = gymWheels.map((wheel) => compareGym(wheel, existingHoennWheels[`hoenn-gym-${wheel.gym}`]));
  const payload = {
    generatedAt: new Date().toISOString(),
    source: "PokeAPI region/location/location-area encounter data",
    region: "hoenn",
    versions: options.versions,
    methods: options.includeMethods,
    bucketPolicy: "Draft main-story Hoenn locations grouped before each Rival Saga gym; review before live use.",
    locationCount: locations.length,
    missingLocations,
    gymWheels,
    crossCheck
  };
  const paths = writeOutputs(options, payload);
  if (options.json) {
    console.log(JSON.stringify({ paths, crossCheck, missingLocations }, null, 2));
    return;
  }
  console.log(`Imported Hoenn PokeAPI encounter draft from ${locations.length} locations.`);
  console.log(`Versions: ${options.versions.join(", ")}`);
  console.log(`Draft JSON: ${paths.jsonPath}`);
  console.log(`Cross-check report: ${paths.markdownPath}`);
  console.log("Summary:");
  crossCheck.forEach((entry) => {
    console.log(`  Gym ${entry.gym}: PokeAPI ${entry.pokeapiCount}, Rival Saga ${entry.rivalSagaCount}, overlap ${entry.overlapCount}, PokeAPI-only ${entry.pokeapiOnly.length}, Rival-Saga-only ${entry.rivalSagaOnly.length}`);
  });
  if (missingLocations.length) {
    console.log(`Missing bucket locations: ${missingLocations.map((entry) => `G${entry.gym}:${entry.location}`).join(", ")}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
