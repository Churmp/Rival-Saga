const fs = require("fs");
const path = require("path");
const { Dex } = require("pokemon-showdown");

const rootDir = path.resolve(__dirname, "..");
const { itemShopData } = require(path.join(rootDir, "shop-data.js"));
const itemReferenceData = require(path.join(rootDir, "item-reference-data.js"));
const { shopChoicePokemonTypes } = require(path.join(rootDir, "shop-choice-data.js"));

const spriteDataPath = path.join(rootDir, "shop-sprite-data.js");
const shopSpriteData = fs.existsSync(spriteDataPath)
  ? require(spriteDataPath)
  : { items: {}, itemAliases: {}, teraTypes: {} };

const repoItemSpriteBase = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/";
const showdownTypeBase = "https://play.pokemonshowdown.com/sprites/types/";
const fallbackLabel = "initials";
const customShopSpriteAuditProducts = Object.freeze([
  {
    id: "utility-badge-point",
    name: "Badge Point",
    shopGroup: "held",
    disableExternalSpriteLookup: true
  },
  {
    id: "legacy-ticket",
    name: "Legacy Ticket",
    shopGroup: "held",
    disableExternalSpriteLookup: true
  }
]);

function auditProducts() {
  return [...itemShopData, ...customShopSpriteAuditProducts];
}

function spriteSlug(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "")
    .replace(/\+/g, " ")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-")
    .toLowerCase();
}

function itemReferenceFor(name) {
  return itemReferenceData.items?.[spriteSlug(name)] || null;
}

function teraTypeForProduct(name) {
  const match = String(name || "").match(/^(.+?)\s+Tera\s+Type$/i);
  if (!match) return "";
  const type = match[1].trim();
  return shopChoicePokemonTypes.includes(type) ? type : "";
}

function fileExists(localPath) {
  return Boolean(localPath && fs.existsSync(path.join(rootDir, localPath)));
}

function metadataForProduct(item) {
  const slug = spriteSlug(item.name);
  return shopSpriteData.items?.[slug]
    || shopSpriteData.items?.[item.id]
    || shopSpriteData.itemAliases?.[slug]
    || null;
}

function sourceForProduct(item) {
  const teraType = teraTypeForProduct(item.name);
  const metadata = metadataForProduct(item);
  const reference = itemReferenceFor(item.name);
  const dexItem = Dex.items.get(item.name);
  const slug = spriteSlug(item.name);
  const conventionItemPath = `assets/shop/items/${slug}.png`;
  const conventionTeraPath = teraType ? `assets/shop/tera-types/${spriteSlug(teraType)}.png` : "";
  const localSprite = metadata?.localSprite || (teraType ? conventionTeraPath : conventionItemPath);

  if (fileExists(localSprite)) {
    return {
      source: localSprite,
      sourceKind: "local",
      provider: metadata?.sourceProvider || (teraType ? "Pokemon Showdown Tera Type Icons" : "Local Item Sprite"),
      providerKey: metadata?.providerKey || (teraType ? `Tera${teraType}` : slug),
      exists: true
    };
  }
  if (teraType) {
    return {
      source: `${showdownTypeBase}Tera${teraType}.png`,
      sourceKind: "remote",
      provider: "Pokemon Showdown Tera Type Icons",
      providerKey: `Tera${teraType}`,
      exists: false
    };
  }
  if (reference?.spriteUrl) {
    return {
      source: reference.spriteUrl,
      sourceKind: "remote",
      provider: "PokeAPI",
      providerKey: reference.pokeapiKey || slug,
      exists: true
    };
  }
  if (dexItem?.exists && Number.isFinite(Number(dexItem.spritenum))) {
    return {
      source: "Pokemon Showdown itemicons-sheet.png",
      sourceKind: "atlas",
      provider: "Pokemon Showdown Item Atlas",
      providerKey: String(dexItem.id || slug),
      spritenum: Number(dexItem.spritenum),
      exists: false
    };
  }
  return {
    source: `${repoItemSpriteBase}${slug}.png`,
    sourceKind: "remote",
    provider: "PokeAPI sprite repository",
    providerKey: slug,
    exists: false
  };
}

function restorationPlanForProduct(item) {
  const teraType = teraTypeForProduct(item.name);
  const slug = spriteSlug(item.name);
  const reference = itemReferenceFor(item.name);
  const dexItem = Dex.items.get(item.name);
  if (teraType) {
    return {
      name: item.name,
      id: item.id,
      productType: "tera-type",
      localSprite: `assets/shop/tera-types/${spriteSlug(teraType)}.png`,
      sourceProvider: "Pokemon Showdown Tera Type Icons",
      providerKey: `Tera${teraType}`,
      originalSourceUrl: `${showdownTypeBase}Tera${teraType}.png`,
      restoreMethod: "download",
      renderMode: "smooth"
    };
  }
  if (reference?.spriteUrl) {
    return {
      name: item.name,
      id: item.id,
      productType: item.shopGroup || "held",
      localSprite: `assets/shop/items/${slug}.png`,
      sourceProvider: "PokeAPI",
      providerKey: reference.pokeapiKey || slug,
      originalSourceUrl: reference.spriteUrl,
      restoreMethod: "download",
      renderMode: "pixel"
    };
  }
  if (dexItem?.exists && Number.isFinite(Number(dexItem.spritenum))) {
    return {
      name: item.name,
      id: item.id,
      productType: item.shopGroup || "held",
      localSprite: `assets/shop/items/${slug}.png`,
      sourceProvider: "Pokemon Showdown Item Atlas",
      providerKey: String(dexItem.id || slug),
      originalSourceUrl: "https://play.pokemonshowdown.com/sprites/itemicons-sheet.png",
      restoreMethod: "atlas-crop",
      spritenum: Number(dexItem.spritenum),
      renderMode: "pixel"
    };
  }
  if (item.name === "Badge Point") {
    return {
      name: item.name,
      id: item.id,
      productType: item.shopGroup || "held",
      localSprite: "assets/shop/custom/badge-point.svg",
      sourceProvider: "Rival Saga Custom",
      providerKey: "badge-point",
      originalSourceUrl: "",
      restoreMethod: "custom-badge-point",
      renderMode: "smooth"
    };
  }
  if (item.name === "Legacy Ticket") {
    return {
      name: item.name,
      id: item.id,
      productType: item.shopGroup || "held",
      localSprite: "assets/shop/custom/legacy-ticket.svg",
      sourceProvider: "Rival Saga Custom",
      providerKey: "legacy-ticket",
      originalSourceUrl: "",
      restoreMethod: "custom-legacy-ticket",
      renderMode: "smooth"
    };
  }
  return {
    name: item.name,
    id: item.id,
    productType: item.shopGroup || "held",
    localSprite: "",
    sourceProvider: "",
    providerKey: slug,
    originalSourceUrl: "",
    restoreMethod: "unresolved",
    renderMode: "pixel"
  };
}

function restorationPlan() {
  return auditProducts().map(restorationPlanForProduct);
}

function classifyProduct(item) {
  const teraType = teraTypeForProduct(item.name);
  const reference = itemReferenceFor(item.name);
  const source = sourceForProduct(item);
  const isLocal = source.sourceKind === "local";
  const explicitReferenceMissing = !teraType && !reference?.spriteUrl;
  let classification = "unresolved";

  if (teraType) {
    classification = isLocal ? "mechanic-product" : "mechanic-product-unresolved";
  } else if (isLocal && source.provider === "Rival Saga Custom") {
    classification = "intentional-custom";
  } else if (isLocal) {
    classification = "canonical-item-resolved";
  } else if (reference?.spriteUrl) {
    classification = "canonical-item-remote";
  } else if (source.provider === "Pokemon Showdown Item Atlas") {
    classification = "canonical-item-missing";
  }

  return {
    name: item.name,
    id: item.id,
    productType: teraType ? "tera-type" : item.shopGroup || "held",
    resolvedSpriteSource: source.source,
    sourceKind: source.sourceKind,
    sourceProvider: source.provider,
    providerKey: source.providerKey,
    spritenum: source.spritenum ?? null,
    exists: source.exists,
    fallback: source.exists ? "" : fallbackLabel,
    classification,
    explicitReferenceMissing
  };
}

function auditItemShopSprites() {
  return auditProducts().map(classifyProduct);
}

function summaryFor(records) {
  const counts = records.reduce((acc, record) => {
    acc[record.classification] = (acc[record.classification] || 0) + 1;
    return acc;
  }, {});
  const explicitReferenceMissing = records.filter((record) => record.explicitReferenceMissing);
  const canonicalMissing = records.filter((record) => record.classification === "canonical-item-missing");
  const mechanicUnresolved = records.filter((record) => record.classification === "mechanic-product-unresolved");
  const unresolved = records.filter((record) => record.classification === "unresolved");
  const unexpectedInitials = records.filter((record) => record.fallback === fallbackLabel && !["canonical-item-missing", "mechanic-product-unresolved", "unresolved"].includes(record.classification));
  return {
    concreteProductsAudited: records.length,
    counts,
    explicitReferenceMissing: explicitReferenceMissing.length,
    canonicalItemMissing: canonicalMissing.length,
    mechanicProductsUnresolved: mechanicUnresolved.length,
    unresolved: unresolved.length,
    unexpectedInitialsFallbacks: unexpectedInitials.length,
    missingManifest: {
      realPokemonItems: canonicalMissing.map((record) => record.name).sort(),
      mechanicProducts: mechanicUnresolved.map((record) => record.name).sort(),
      other: unresolved.map((record) => record.name).sort()
    }
  };
}

function printText(records) {
  const summary = summaryFor(records);
  console.log(`Concrete products audited: ${summary.concreteProductsAudited}`);
  console.log(`Explicit reference sprites missing: ${summary.explicitReferenceMissing}`);
  console.log(`Canonical item missing: ${summary.canonicalItemMissing}`);
  console.log(`Mechanic products unresolved: ${summary.mechanicProductsUnresolved}`);
  console.log(`Unexpected initials fallbacks: ${summary.unexpectedInitialsFallbacks}`);
  console.log("");
  console.log("Classification counts:");
  Object.entries(summary.counts).sort(([a], [b]) => a.localeCompare(b)).forEach(([key, count]) => {
    console.log(`  ${key}: ${count}`);
  });
  console.log("");
  console.log("Missing manifest:");
  console.log(`  Real Pokemon items (${summary.missingManifest.realPokemonItems.length}): ${summary.missingManifest.realPokemonItems.join(", ") || "none"}`);
  console.log(`  Mechanic products (${summary.missingManifest.mechanicProducts.length}): ${summary.missingManifest.mechanicProducts.join(", ") || "none"}`);
  console.log(`  Other (${summary.missingManifest.other.length}): ${summary.missingManifest.other.join(", ") || "none"}`);
}

if (require.main === module) {
  const records = auditItemShopSprites();
  const summary = summaryFor(records);
  if (process.argv.includes("--restore-manifest")) {
    const plan = restorationPlan();
    console.log(JSON.stringify({
      schemaVersion: 1,
      generatedAt: new Date().toISOString(),
      sources: {
        pokeapi: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/",
        pokemonShowdownItemAtlas: "https://play.pokemonshowdown.com/sprites/itemicons-sheet.png",
        pokemonShowdownTeraTypes: "https://play.pokemonshowdown.com/sprites/types/"
      },
      records: plan
    }, null, 2));
  } else if (process.argv.includes("--json")) {
    console.log(JSON.stringify({ summary, records }, null, 2));
  } else {
    printText(records);
  }
  if (process.argv.includes("--check")) {
    const ok = summary.canonicalItemMissing === 0
      && summary.mechanicProductsUnresolved === 0
      && summary.unresolved === 0
      && summary.unexpectedInitialsFallbacks === 0;
    if (!ok) process.exit(1);
  }
}

module.exports = {
  auditItemShopSprites,
  classifyProduct,
  restorationPlan,
  restorationPlanForProduct,
  spriteSlug,
  summaryFor,
  teraTypeForProduct
};
