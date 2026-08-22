const assert = require("node:assert/strict");
const test = require("node:test");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const rootDir = path.resolve(__dirname, "..");
const appSource = fs.readFileSync(path.join(rootDir, "app.js"), "utf8");
const indexSource = fs.readFileSync(path.join(rootDir, "index.html"), "utf8");
const cssSource = fs.readFileSync(path.join(rootDir, "styles.css"), "utf8");
const { itemShopData } = require("../shop-data.js");
const { staticShopChoiceDefinitions } = require("../shop-choice-data.js");
const shopSpriteData = require("../shop-sprite-data.js");
const shopBrowseData = require("../shop-browse-data.js");
const { auditItemShopSprites, classifyProduct, summaryFor } = require("./audit-item-shop-sprites.js");

const groupIds = new Set(["held", "berry", "pokemon-specific", "battle-mechanics"]);
const roleIds = new Set(["offense", "defense", "recovery", "speed", "utility"]);
const tagIds = new Set([
  "type-boost", "status", "switching", "weather", "terrain", "setup", "multi-hit",
  "choice", "screens", "build-enabling", "paradox", "mega", "z-move", "tera"
]);
const chooserParentNames = [
  "Berries",
  "Type Resist Berries",
  "Competitive Berries",
  "33% Heal Berry",
  "Buy One Type Plate",
  "Buy One Type Boosting Item",
  "Type Gems",
  "Toxic Orb or Flame Orb",
  "Weather Rock",
  "Deep Sea Tooth / Scale",
  "Genesect Drive",
  "One Tera Type",
  "One Z Move Type",
  "One Mega Stone Not Listed"
];
const trainerResourceTestData = [
  {
    id: "legacy-ticket",
    name: "Legacy Ticket",
    tokenType: "legacy",
    type: "TICKET",
    tier: "Tickets",
    category: "Legacy Tickets",
    price: 5000,
    shopGroup: "held",
    roles: ["utility"],
    tags: ["build-enabling"]
  },
  {
    id: "utility-badge-point",
    name: "Badge Point",
    shopAction: "badge-point",
    tier: "Trainer Resources",
    category: "Trainer Resources",
    price: 0,
    shopGroup: "held",
    roles: ["utility"],
    tags: ["build-enabling"]
  }
];
const catalogItemShopData = [...itemShopData, ...trainerResourceTestData];

function item(name) {
  const entry = catalogItemShopData.find((candidate) => candidate.name === name);
  assert.ok(entry, `${name} should exist in Item Shop data`);
  return entry;
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

function spriteMetadata(name) {
  const metadata = shopSpriteData.items?.[spriteSlug(name)];
  assert.ok(metadata, `${name} should have sprite metadata`);
  assert.ok(metadata.localSprite, `${name} should have a local sprite path`);
  assert.ok(fs.existsSync(path.join(rootDir, metadata.localSprite)), `${name} local sprite should exist`);
  return metadata;
}

function names(entries) {
  return entries.map((entry) => entry.name);
}

function applyFilters({
  group = "all",
  roles = [],
  tags = [],
  canAfford = false,
  balance = Infinity,
  search = "",
  minPrice = null,
  maxPrice = null
} = {}) {
  const term = search.trim().toLowerCase();
  return catalogItemShopData
    .filter((entry) => group === "all" || entry.shopGroup === group)
    .filter((entry) => !roles.length || roles.every((role) => entry.roles.includes(role)))
    .filter((entry) => !tags.length || tags.every((tag) => entry.tags.includes(tag)))
    .filter((entry) => !canAfford || entry.price <= balance)
    .filter((entry) => minPrice === null || entry.price >= minPrice)
    .filter((entry) => maxPrice === null || entry.price <= maxPrice)
    .filter((entry) => !term || [
      entry.name,
      entry.shopGroup,
      ...(entry.roles || []),
      ...(entry.tags || [])
    ].join(" ").toLowerCase().includes(term));
}

function sourceBlock(startMarker, endMarker) {
  const start = appSource.indexOf(startMarker);
  assert.notEqual(start, -1, `${startMarker} source block should exist`);
  const end = appSource.indexOf(endMarker, start);
  assert.notEqual(end, -1, `${endMarker} source block should exist`);
  return appSource.slice(start, end);
}

function declaredItemShopFolders() {
  const storefrontSource = appSource.match(/const ITEM_SHOP_DEFAULT_STOREFRONT_ITEM_NAMES = Object\.freeze\((\[[\s\S]*?\])\);/);
  assert.ok(storefrontSource, "default storefront declaration should exist");
  const folderSource = appSource.match(/const ITEM_SHOP_FOLDERS = Object\.freeze\(([\s\S]*?)\);\r?\nconst SAGA_TIERS/);
  assert.ok(folderSource, "folder declaration should exist");
  const storefront = vm.runInNewContext(storefrontSource[1]);
  return vm.runInNewContext(`(${folderSource[1]})`, { ITEM_SHOP_DEFAULT_STOREFRONT_ITEM_NAMES: storefront });
}

const declaredFolders = declaredItemShopFolders();

function folderPathFor(folderId) {
  const pathParts = [];
  let folder = declaredFolders[folderId];
  while (folder && folder.id && folder.id !== "root") {
    pathParts.unshift(folder.id);
    folder = declaredFolders[folder.parent];
  }
  return pathParts;
}

function pathEquals(left = [], right = []) {
  return left.length === right.length && left.every((entry, index) => entry === right[index]);
}

function browseItemsForFolder(folderId = "root") {
  return catalogItemShopData.filter((entry) => {
    const placement = shopBrowseData.placements[entry.name];
    if (folderId === "root") return placement?.type === "featured";
    return placement?.type === "folder" && pathEquals(placement.path || [], folderPathFor(folderId));
  });
}

test("Item Shop markup adds folder navigation and keeps obsolete tier controls removed", () => {
  assert.equal(indexSource.includes("Minimum tier"), false);
  assert.equal(indexSource.includes("Item Tier"), false);
  assert.equal(indexSource.includes("shopTierFilterGroup"), false);
  assert.equal(indexSource.includes("tierFilter"), false);
  assert.equal(indexSource.includes("class=\"app-tabs\""), false);
  assert.equal(indexSource.includes("id=\"itemShopGroupNav\""), false);
  assert.equal(indexSource.includes("shop-filter-price"), false);
  assert.equal(indexSource.includes("id=\"minPriceFilter\""), false);
  assert.equal(indexSource.includes("id=\"maxPriceFilter\""), false);
  assert.equal(indexSource.includes("shop-filter-sort"), false);
  assert.equal(indexSource.includes("id=\"shopSortSelect\""), false);
  assert.match(indexSource, /id="itemShopFiltersToggle"/);
  assert.match(indexSource, /id="itemShopAdvancedFilters"/);
  assert.match(indexSource, /id="itemShopBreadcrumb"/);
  assert.match(indexSource, /id="itemShopRoleFilters"/);
  assert.match(indexSource, /id="itemShopTagFilters"/);
  assert.match(indexSource, /id="itemShopCanAffordFilter"/);
  assert.match(indexSource, /id="itemShopAppliedFilters"/);
  const shopTabs = [...indexSource.matchAll(/data-shop="([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(shopTabs, ["items", "tms", "tokens"]);
  assert.equal(indexSource.includes('data-shop="utility"'), false);
  assert.ok(indexSource.indexOf("shop-choice-data.js") < indexSource.indexOf("shop-data.js"), "choice data should load before derived shop data");
  assert.ok(indexSource.indexOf("shop-browse-data.js") < indexSource.indexOf("app.js"), "browse placement data should load before app");
});

test("explicit browse placement gives every concrete product one normal location", () => {
  const productNames = catalogItemShopData.map((entry) => entry.name);
  const placementNames = Object.keys(shopBrowseData.placements);
  assert.equal(placementNames.length, catalogItemShopData.length);
  assert.deepEqual(placementNames.filter((name) => !productNames.includes(name)), []);

  const featuredNames = [];
  const folderOnlyNames = [];
  catalogItemShopData.forEach((entry) => {
    const placement = shopBrowseData.placements[entry.name];
    assert.ok(placement, `${entry.name} should have explicit browsePlacement`);
    if (placement.type === "featured") {
      assert.equal(placement.path, undefined, `${entry.name} featured placement should not also have a folder path`);
      featuredNames.push(entry.name);
      return;
    }
    assert.equal(placement.type, "folder", `${entry.name} should be featured or folder placed`);
    assert.ok(Array.isArray(placement.path) && placement.path.length > 0, `${entry.name} folder placement should include a path`);
    let parentId = "root";
    placement.path.forEach((folderId) => {
      assert.ok(declaredFolders[folderId], `${entry.name} references existing folder ${folderId}`);
      assert.equal(declaredFolders[folderId].parent, parentId, `${entry.name} references a valid folder path`);
      parentId = folderId;
    });
    folderOnlyNames.push(entry.name);
  });

  assert.equal(featuredNames.length, 21);
  assert.equal(browseItemsForFolder("root").length, 21);
  assert.deepEqual(names(browseItemsForFolder("trainer-resources")).sort(), ["Badge Point", "Legacy Ticket"]);
  assert.equal(shopBrowseData.placements["Legacy Ticket"].type, "folder");
  assert.deepEqual(shopBrowseData.placements["Legacy Ticket"].path, ["trainer-resources"]);
  assert.equal(shopBrowseData.placements["Badge Point"].type, "folder");
  assert.deepEqual(shopBrowseData.placements["Badge Point"].path, ["trainer-resources"]);
  ["Light Clay", "Eviolite", "Assault Vest", "Heavy-Duty Boots"].forEach((name) => {
    assert.equal(shopBrowseData.placements[name].type, "featured", `${name} should be featured only`);
    assert.equal(browseItemsForFolder("oddball-utility").some((entry) => entry.name === name), false, `${name} should not browse in Oddball Utility`);
    assert.ok(browseItemsForFolder("root").some((entry) => entry.name === name), `${name} should browse on root storefront`);
  });
  folderOnlyNames.forEach((name) => {
    assert.equal(browseItemsForFolder("root").some((entry) => entry.name === name), false, `${name} should not leak onto root storefront`);
  });
});

test("chooser parents are hidden and chooser options become canonical products", () => {
  chooserParentNames.forEach((name) => {
    assert.equal(itemShopData.some((entry) => entry.name === name), false, `${name} should not render as a product card`);
    assert.ok(staticShopChoiceDefinitions[name]?.options?.length, `${name} should keep a source chooser definition`);
  });
  assert.equal(item("Sitrus Berry").id, "item-sitrus-or-lum-berry--sitrus-berry");
  assert.equal(item("Toxic Orb").id, "item-toxic-orb-or-flame-orb--toxic-orb");
  assert.equal(item("Normalium Z").id, "item-one-z-move-type--normalium-z");
  assert.equal(item("Venusaurite").id, "item-one-mega-stone-not-listed--venusaurite");
  assert.equal(item("Burn Drive").parentShopItemName, "Genesect Drive");
});

test("approved Item Shop prices are authoritative on individual products", () => {
  const expectedPrices = {
    "Berry Juice": 200,
    "Toxic Orb": 3000,
    "Flame Orb": 3000,
    "Light Clay": 3000,
    "Booster Energy": 3000,
    "Normalium Z": 7500,
    "Kommonium Z": 10000,
    Kangaskhanite: 7500,
    Metagrossite: 7500,
    Lucarionite: 7500,
    Gengarite: 7500,
    Salamencite: 7500,
    Blastoisinite: 7500
  };
  Object.entries(expectedPrices).forEach(([name, price]) => {
    assert.equal(item(name).price, price, `${name} price`);
  });
});

test("every Item Shop product has explicit valid metadata", () => {
  catalogItemShopData.forEach((entry) => {
    assert.ok(groupIds.has(entry.shopGroup), `${entry.name} group`);
    assert.ok(Array.isArray(entry.roles), `${entry.name} roles`);
    assert.ok(Array.isArray(entry.tags), `${entry.name} tags`);
    entry.roles.forEach((role) => assert.ok(roleIds.has(role), `${entry.name} role ${role}`));
    entry.tags.forEach((tag) => assert.ok(tagIds.has(tag), `${entry.name} tag ${tag}`));
  });
});

test("product type, role, tag, price, and search filters target individual products", () => {
  assert.ok(names(applyFilters({ group: "held" })).includes("Leftovers"));
  assert.equal(names(applyFilters({ group: "held" })).includes("Sitrus Berry"), false);
  assert.ok(names(applyFilters({ group: "berry" })).includes("Lum Berry"));
  assert.ok(names(applyFilters({ group: "pokemon-specific" })).includes("Booster Energy"));
  assert.ok(names(applyFilters({ group: "battle-mechanics" })).includes("Normalium Z"));
  assert.equal(names(applyFilters({ group: "battle-mechanics" })).includes("Leftovers"), false);

  assert.ok(names(applyFilters({ roles: ["offense"] })).includes("Choice Scarf"));
  assert.deepEqual(names(applyFilters({ roles: ["offense"], tags: ["choice"] })).sort(), ["Choice Band", "Choice Scarf", "Choice Specs"]);
  assert.ok(names(applyFilters({ tags: ["paradox"] })).includes("Booster Energy"));
  assert.ok(names(applyFilters({ search: "weather" })).includes("Damp Rock"));
  assert.equal(names(applyFilters({ canAfford: true, balance: 3000 })).includes("Eviolite"), false);
  assert.ok(names(applyFilters({ minPrice: 7500, maxPrice: 7500 })).includes("Normalium Z"));
});

test("default storefront and folder navigation are declared as presentation architecture", () => {
  const folderBlock = sourceBlock("const ITEM_SHOP_DEFAULT_STOREFRONT_ITEM_NAMES", "const SAGA_TIERS");
  [
    "Berry Juice",
    "Air Balloon",
    "Covert Cloak",
    "Loaded Dice",
    "Expert Belt",
    "Eviolite",
    "Light Clay",
    "Rocky Helmet",
    "Focus Sash",
    "Assault Vest",
    "Life Orb",
    "Heavy-Duty Boots",
    "Leftovers",
    "Choice Band",
    "Choice Scarf",
    "Choice Specs",
    "Booster Energy",
    "Normalium Z",
    "Kommonium Z",
    "Kangaskhanite",
    "Metagrossite"
  ].forEach((name) => assert.ok(folderBlock.includes(`"${name}"`), `${name} should be in the curated storefront`));
  [
    "berries",
    "type-plates",
    "type-boosting-items",
    "type-gems",
    "weather-terrain",
    "status-setup",
    "switching-positioning",
    "pokemon-specific",
    "battle-mechanics",
    "specialist-items",
    "trainer-resources",
    "terastallization",
    "z-moves",
    "mega-evolution"
  ].forEach((folderId) => assert.ok(folderBlock.includes(`id: "${folderId}"`), `${folderId} folder should exist`));
  assert.match(appSource, /function normalizeItemShopFolderPath\(path\)/);
  assert.match(appSource, /function createShopFolderCard\(folder\)/);
  assert.match(appSource, /data-item-shop-folder/);
  assert.match(appSource, /data-item-shop-folder-back/);
  assert.match(appSource, /data-item-shop-folder-index/);
  assert.match(appSource, /function itemShopCountText/);
  assert.match(appSource, /Trainer progression and legacy resources/);
  assert.match(appSource, /shopPhaseOnly/);
});

test("filtering uses flat products while idle browsing uses folder presentation cards", () => {
  assert.match(appSource, /function itemShopHasActiveFilters/);
  assert.match(appSource, /function itemShopBrowsePlacementForItem\(item\)/);
  assert.match(appSource, /function itemShopItemsForFolder\(folderId = "root", \{ descendants = false \} = \{\}\)/);
  assert.match(appSource, /const cards = itemShopPresentationCardsForCurrentFolder\(\);/);
  assert.match(appSource, /createItemShopPresentationSection\(itemShopCurrentFolder\(\), cards, player\)/);
  assert.match(appSource, /createItemShopResultSections\(entries, player\)/);
  assert.match(appSource, /Matching products across the current Item Shop catalog/);
});

test("Item Shop cards no longer expose chooser accordions", () => {
  assert.match(appSource, /const choiceDefinition = state\.activeShop === "items" \? null : shopChoiceDefinitionForItem\(item\);/);
  assert.match(appSource, /button\.textContent = item\.cannotPurchase \? "Unavailable" : !unlocked \? "Locked" : hasChoices/);
  assert.match(appSource, /if \(!directPurchase && !hasChoices\) buttonGroup\.append\(buyNowButton\)/);
  assert.match(cssSource, /\.item-shop-folder-card/);
  assert.match(cssSource, /\.item-shop-folder-collage/);
  assert.match(cssSource, /\.item-shop-parent-back|\.item-shop-browse-nav/);
});

test("sprite and copy safeguards prefer real catalog/reference data", () => {
  assert.match(indexSource, /shop-sprite-data\.js/);
  assert.match(indexSource, /shop-browse-data\.js/);
  assert.match(appSource, /shopSpriteData/);
  assert.match(appSource, /shopBrowseData/);
  assert.match(appSource, /spriteMetadata\?\.localSprite/);
  assert.match(appSource, /importedItem\?\.spriteUrl/);
  assert.match(appSource, /data-shop-render-mode/);
  assert.match(appSource, /item\.name === "Big Nugget"/);
  assert.match(item("Big Nugget").description, /competitive use/i);
});

test("restored sprite metadata covers real item examples with local assets", () => {
  ["Ability Shield", "Booster Energy", "Covert Cloak", "Room Service", "Utility Umbrella", "Blunder Policy"].forEach((name) => {
    const metadata = spriteMetadata(name);
    assert.equal(metadata.localSprite.startsWith("assets/shop/items/"), true, `${name} item sprite directory`);
    assert.notEqual(metadata.sourceProvider, "", `${name} source provider`);
  });
});

test("derived products resolve to concrete local assets rather than chooser parents", () => {
  const expectations = {
    "Flame Plate": "flame-plate.png",
    Charcoal: "charcoal.png",
    "Fire Gem": "fire-gem.png",
    "Heat Rock": "heat-rock.png",
    "Burn Drive": "burn-drive.png",
    "Deep Sea Tooth": "deep-sea-tooth.png",
    Salamencite: "salamencite.png",
    "Firium Z": "firium-z.png"
  };
  Object.entries(expectations).forEach(([name, filename]) => {
    const metadata = spriteMetadata(name);
    assert.ok(metadata.localSprite.endsWith(filename), `${name} should resolve to its own concrete asset`);
    assert.equal(/berries|type-gems|weather-rock|one-z-move-type|genesect-drive|deep-sea-tooth-scale/i.test(metadata.localSprite), false, `${name} should not use a chooser-parent asset`);
  });
});

test("all Tera Type products resolve to deliberate local Tera assets", () => {
  const teraProducts = itemShopData.filter((entry) => /\bTera Type$/.test(entry.name));
  assert.equal(teraProducts.length, 18);
  teraProducts.forEach((entry) => {
    const metadata = spriteMetadata(entry.name);
    assert.equal(metadata.productType, "tera-type", `${entry.name} product type`);
    assert.equal(metadata.sourceProvider, "Pokemon Showdown Tera Type Icons", `${entry.name} source provider`);
    assert.equal(metadata.localSprite.startsWith("assets/shop/tera-types/"), true, `${entry.name} Tera directory`);
    assert.equal(metadata.renderMode, "smooth", `${entry.name} render mode`);
  });
});

test("sprite audit has zero unresolved known products and keeps initials as failure fallback", () => {
  const summary = summaryFor(auditItemShopSprites());
  assert.equal(summary.concreteProductsAudited, 270);
  assert.equal(summary.canonicalItemMissing, 0);
  assert.equal(summary.mechanicProductsUnresolved, 0);
  assert.equal(summary.unresolved, 0);
  assert.equal(summary.unexpectedInitialsFallbacks, 0);

  const unknown = classifyProduct({ name: "Fixture Unknown Item", id: "fixture-unknown-item", shopGroup: "held" });
  assert.equal(unknown.classification, "unresolved");
  assert.equal(unknown.fallback, "initials");
});

test("purchase path continues to deduct exactly discounted price times quantity", () => {
  assert.match(appSource, /const price = discountedShopPrice\(item, shopType, player\);/);
  assert.match(appSource, /const total = price \* quantity;/);
  assert.match(appSource, /applyPlayerMoneyChange\(player, -total,/);
  assert.match(appSource, /meta: shopCartMetaForItem\(item, shopType\),/);
  assert.match(appSource, /shopCartEntryMetaLabel\(entry\)/);
});
