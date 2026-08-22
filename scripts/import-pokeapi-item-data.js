const fs = require("fs");
const path = require("path");
const vm = require("vm");

const rootDir = path.resolve(__dirname, "..");
const shopDataPath = path.join(rootDir, "shop-data.js");
const outputPath = path.join(rootDir, "item-reference-data.js");
const cacheDir = path.join(__dirname, ".pokeapi-cache", "item");
const apiRoot = "https://pokeapi.co/api/v2/item";
const requestConcurrency = 8;
const ignoredConcreteNames = new Set(["One Tera Type"]);
const pokeapiKeyAliases = Object.freeze({
  leek: "stick"
});
const descriptionFallbacks = Object.freeze({
  "ability-shield": "Protects the holder's Ability from being changed, suppressed, or ignored by opposing effects.",
  "blank-plate": "Boosts the power of the holder's Normal-type moves.",
  "booster-energy": "Consumed to activate Protosynthesis or Quark Drive when its usual field condition is absent.",
  "clear-amulet": "Prevents the holder's stats from being lowered by opposing effects.",
  "covert-cloak": "Protects the holder from additional effects attached to damaging moves.",
  "fairy-feather": "Boosts the power of the holder's Fairy-type moves.",
  "loaded-dice": "Makes the holder's multi-hit moves more likely to hit four or five times.",
  "mirror-herb": "Consumed to copy an opponent's stat increases once.",
  "punching-glove": "Boosts punching moves and prevents those moves from making contact.",
  "kommonium-z": "Allows Kommo-o to turn Clanging Scales into Clangorous Soulblaze."
});

function dataKey(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/['.]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function readShopData() {
  const context = {};
  vm.createContext(context);
  vm.runInContext(`${fs.readFileSync(shopDataPath, "utf8")};this.itemShopDataForImport=itemShopData;`, context);
  return context.itemShopDataForImport || [];
}

function englishEntry(entries = [], field) {
  return entries.find((entry) => entry.language?.name === "en")?.[field] || "";
}

function englishFlavor(entries = []) {
  const englishEntries = entries.filter((entry) => entry.language?.name === "en");
  const newest = englishEntries[englishEntries.length - 1] || englishEntries[0];
  return String(newest?.text || "").replace(/\s+/g, " ").trim();
}

function fillEffectChance(text, effectChance) {
  return String(text || "")
    .replace(/\$effect_chance/g, effectChance ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

function cachePathFor(key) {
  return path.join(cacheDir, `${key}.json`);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchItem(key) {
  const requestKey = pokeapiKeyAliases[key]
    || (/ium-z$/.test(key) ? `${key}--held` : key);
  const localPath = cachePathFor(requestKey);
  if (fs.existsSync(localPath)) return JSON.parse(fs.readFileSync(localPath, "utf8"));
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    const response = await fetch(`${apiRoot}/${requestKey}`, {
      headers: { "user-agent": "RivalSagaItemImporter/1.0" }
    });
    if (response.status === 404) return null;
    if (response.ok) {
      const json = await response.json();
      fs.mkdirSync(cacheDir, { recursive: true });
      fs.writeFileSync(localPath, JSON.stringify(json));
      return json;
    }
    if (attempt === 4) throw new Error(`PokeAPI item/${requestKey} failed with ${response.status}`);
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

function itemMetadata(raw, requestedName) {
  const effectEntry = (raw.effect_entries || []).find((entry) => entry.language?.name === "en");
  const shortEffect = fillEffectChance(effectEntry?.short_effect, raw.effect_chance);
  const fullEffect = fillEffectChance(effectEntry?.effect, raw.effect_chance);
  const flavorText = englishFlavor(raw.flavor_text_entries);
  const requestedKey = dataKey(requestedName);
  const importedDescription = shortEffect || flavorText || fullEffect;
  const description = !importedDescription || /^XXX\b/i.test(importedDescription)
    ? descriptionFallbacks[requestedKey] || importedDescription
    : importedDescription;
  return {
    name: englishEntry(raw.names, "name") || requestedName,
    pokeapiKey: raw.name,
    itemId: raw.id,
    category: String(raw.category?.name || "").split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" "),
    attributes: (raw.attributes || []).map((entry) => entry.name).filter(Boolean),
    spriteUrl: raw.sprites?.default || "",
    shortDesc: description,
    description
  };
}

function buildOutput(items, missing) {
  const payload = {
    schemaVersion: 1,
    source: {
      provider: "PokeAPI",
      importedAt: new Date().toISOString(),
      itemCount: Object.keys(items).length,
      missing
    },
    items
  };
  return `const rivalSagaItemData = Object.freeze(${JSON.stringify(payload, null, 2)});

if (typeof window !== "undefined") {
  window.rivalSagaItemData = rivalSagaItemData;
}

if (typeof module !== "undefined") {
  module.exports = rivalSagaItemData;
}
`;
}

async function main() {
  const itemShopData = readShopData();
  const { staticShopChoiceDefinitions } = require(path.join(rootDir, "shop-choice-data.js"));
  const names = new Set();
  itemShopData.forEach((item) => {
    const definition = staticShopChoiceDefinitions[item.name];
    if (definition?.options?.length) {
      if (ignoredConcreteNames.has(item.name)) return;
      definition.options.forEach((name) => {
        if (!/\bTera Type$/i.test(name)) names.add(name);
      });
      return;
    }
    names.add(item.name);
  });

  const entries = [...names]
    .map((name) => ({ name, key: dataKey(name) }))
    .filter((entry) => entry.key)
    .sort((a, b) => a.name.localeCompare(b.name));
  const items = {};
  const missing = [];
  console.log(`Importing ${entries.length} held-item descriptions from PokeAPI...`);
  await mapLimit(entries, requestConcurrency, async (entry, index) => {
    const raw = await fetchItem(entry.key);
    if (!raw) {
      missing.push(entry.name);
      return;
    }
    items[entry.key] = itemMetadata(raw, entry.name);
    if ((index + 1) % 25 === 0) console.log(`  Items ${index + 1}/${entries.length}`);
  });
  fs.writeFileSync(outputPath, buildOutput(items, missing));
  console.log(`Wrote ${Object.keys(items).length} item records to item-reference-data.js.`);
  if (missing.length) console.log(`Missing: ${missing.join(", ")}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
