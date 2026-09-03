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
const { STANDARD_Z_CRYSTAL_PRICE, auditItemShopZCatalog } = require("./audit-item-shop-z-catalog.js");

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
    price: 4000,
    dynamicPrice: true,
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
    dynamicPrice: true,
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
  const folder = declaredFolders[folderId] || declaredFolders.root;
  if (Array.isArray(folder.items)) {
    return Array.from(folder.items)
      .map((entryName) => catalogItemShopData.find((entry) => entry.name === entryName))
      .filter(Boolean)
      .filter((entry) => {
        const placement = shopBrowseData.placements[entry.name];
        if (folderId === "root") return placement?.type === "featured";
        return placement?.type === "folder" && pathEquals(placement.path || [], folderPathFor(folderId));
      });
  }
  return catalogItemShopData.filter((entry) => {
    const placement = shopBrowseData.placements[entry.name];
    return folderId === "root"
      ? placement?.type === "featured"
      : placement?.type === "folder" && pathEquals(placement.path || [], folderPathFor(folderId));
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

  assert.equal(featuredNames.length, 18);
  assert.equal(browseItemsForFolder("root").length, 18);
  assert.deepEqual(
    featuredNames.filter((name) => ["mega", "z-move"].includes(item(name).mechanicFamily)),
    [],
    "default root should not feature Mega Stones or Z-Crystals"
  );
  assert.equal(declaredFolders["trainer-resources"], undefined);
  assert.equal(shopBrowseData.placements["Legacy Ticket"].type, "featured");
  assert.equal(shopBrowseData.placements["Legacy Ticket"].path, undefined);
  assert.equal(shopBrowseData.placements["Badge Point"].type, "featured");
  assert.equal(shopBrowseData.placements["Badge Point"].path, undefined);
  assert.equal(shopBrowseData.placements["Sitrus Berry"].type, "featured");
  assert.equal(shopBrowseData.placements["Sitrus Berry"].path, undefined);
  assert.equal(shopBrowseData.placements["Berry Juice"].type, "folder");
  assert.deepEqual(shopBrowseData.placements["Berry Juice"].path, ["berries", "healing-berries"]);
  assert.equal(shopBrowseData.placements["Booster Energy"].type, "folder");
  assert.deepEqual(shopBrowseData.placements["Booster Energy"].path, ["pokemon-specific", "paradox-items"]);
  assert.deepEqual(names(browseItemsForFolder("root")).slice(0, 2), ["Badge Point", "Legacy Ticket"]);
  assert.deepEqual(
    Object.values(shopBrowseData.placements).filter((placement) => (placement.path || []).includes("trainer-resources")),
    [],
    "Trainer Resources should not remain in browse placement paths"
  );
  ["Sitrus Berry", "Light Clay", "Eviolite", "Assault Vest", "Heavy-Duty Boots"].forEach((name) => {
    assert.equal(shopBrowseData.placements[name].type, "featured", `${name} should be featured only`);
    assert.equal(browseItemsForFolder("oddball-utility").some((entry) => entry.name === name), false, `${name} should not browse in Oddball Utility`);
    assert.ok(browseItemsForFolder("root").some((entry) => entry.name === name), `${name} should browse on root storefront`);
  });
  ["Berry Juice", "Booster Energy", "Normalium Z", "Kommonium Z", "Kangaskhanite", "Metagrossite"].forEach((name) => {
    assert.equal(shopBrowseData.placements[name].type, "folder", `${name} should not be a static root feature`);
    assert.equal(browseItemsForFolder("root").some((entry) => entry.name === name), false, `${name} should not leak onto default root storefront`);
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
  assert.equal(itemShopData.some((entry) => entry.name === "Blank Plate"), false, "Blank Plate should be removed from concrete Item Shop products");
  assert.equal(staticShopChoiceDefinitions["Buy One Type Plate"].options.includes("Blank Plate"), false, "Blank Plate should be removed from the plate chooser");
});

test("approved Item Shop prices are authoritative on individual products", () => {
  const expectedPrices = {
    "Berry Juice": 200,
    "White Herb": 2500,
    "Mirror Herb": 1500,
    "Adrenaline Orb": 500,
    "Muscle Band": 750,
    "Wise Glasses": 750,
    "Punching Glove": 750,
    "Metronome": 1250,
    "Black Sludge": 1500,
    "Ability Shield": 500,
    "Focus Band": 500,
    "Light Ball": 1000,
    "Thick Club": 500,
    "Leek": 500,
    "Deep Sea Tooth": 500,
    "Deep Sea Scale": 500,
    "Damp Rock": 2000,
    "Heat Rock": 2000,
    "Icy Rock": 2000,
    "Smooth Rock": 2000,
    "Sitrus Berry": 2000,
    "Lum Berry": 1500,
    "Custap Berry": 1000,
    "Occa Berry": 300,
    "Passho Berry": 300,
    "Wacan Berry": 300,
    "Rindo Berry": 300,
    "Yache Berry": 300,
    "Chople Berry": 300,
    "Kebia Berry": 300,
    "Shuca Berry": 300,
    "Coba Berry": 300,
    "Payapa Berry": 300,
    "Tanga Berry": 300,
    "Charti Berry": 300,
    "Kasib Berry": 300,
    "Haban Berry": 300,
    "Colbur Berry": 300,
    "Babiri Berry": 300,
    "Chilan Berry": 300,
    "Roseli Berry": 300,
    "Toxic Orb": 3000,
    "Flame Orb": 3000,
    "Light Clay": 3000,
    "Booster Energy": 3000,
    "Normalium Z": 7500,
    "Kommonium Z": 7500,
    "Mimikium Z": 7500,
    "Snorlium Z": 7500,
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

test("all concrete Z-Crystals use the standard mechanic access price", () => {
  const zCrystals = itemShopData.filter((entry) => entry.mechanicFamily === "z-move" && /\bZ$/.test(entry.name));
  assert.equal(zCrystals.length, 35);
  zCrystals.forEach((entry) => {
    assert.equal(entry.price, STANDARD_Z_CRYSTAL_PRICE, `${entry.name} should cost the standard Z-Crystal price`);
    assert.notEqual(entry.cannotPurchase, true, `${entry.name} should be purchasable`);
    assert.notEqual(entry.balanceReviewRequired, true, `${entry.name} should not remain in balance review`);
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
  assert.equal(itemShopData.some((entry) => entry.name === "Blank Plate"), false);
  assert.equal(names(applyFilters({ canAfford: true, balance: 3000 })).includes("Eviolite"), false);
  assert.ok(names(applyFilters({ minPrice: 7500, maxPrice: 7500 })).includes("Normalium Z"));
});

test("default storefront and folder navigation are declared as presentation architecture", () => {
  const folderBlock = sourceBlock("const ITEM_SHOP_DEFAULT_STOREFRONT_ITEM_NAMES", "const SAGA_TIERS");
  [
    "Badge Point",
    "Legacy Ticket",
    "Sitrus Berry",
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
    "Choice Specs"
  ].forEach((name) => assert.ok(declaredFolders.root.items.includes(name), `${name} should be in the curated storefront`));
  ["Berry Juice", "Booster Energy", "Normalium Z", "Kommonium Z", "Kangaskhanite", "Metagrossite"]
    .forEach((name) => assert.equal(declaredFolders.root.items.includes(name), false, `${name} should stay out of the static storefront`));
  assert.equal(declaredFolders["status-berries"].items.includes("Lum Berry"), false, "Lum Berry should leave Status Berries");
  assert.equal(declaredFolders["competitive-berries"].items.includes("Lum Berry"), true, "Lum Berry should live under Competitive Berries");
  assert.equal(declaredFolders["type-plates"].items.includes("Blank Plate"), false, "Blank Plate should be removed from Type Plates");
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
    "terastallization",
    "z-moves",
    "mega-evolution"
  ].forEach((folderId) => assert.ok(folderBlock.includes(`id: "${folderId}"`), `${folderId} folder should exist`));
  assert.equal(folderBlock.includes('id: "trainer-resources"'), false);
  assert.match(appSource, /function normalizeItemShopFolderPath\(path\)/);
  assert.match(appSource, /function createShopFolderCard\(folder, player = activePlayer\(\)\)/);
  assert.match(appSource, /data-item-shop-folder/);
  assert.match(appSource, /data-item-shop-folder-back/);
  assert.match(appSource, /data-item-shop-folder-index/);
  assert.match(appSource, /function itemShopCountText/);
  assert.match(appSource, /Core items and trainer resources/);
  assert.match(appSource, /shopPhaseOnly/);
});

test("filtering uses flat products while idle browsing uses folder presentation cards", () => {
  assert.match(appSource, /function itemShopHasActiveFilters/);
  assert.match(appSource, /function itemShopBrowsePlacementForItem\(item\)/);
  assert.match(appSource, /function itemShopItemsForFolder\(folderId = "root", \{ descendants = false \} = \{\}\)/);
  assert.match(appSource, /const cards = filteredMode \? \[\] : itemShopPresentationCardsForCurrentFolder\(player\);/);
  assert.match(appSource, /createItemShopPresentationSections\(itemShopCurrentFolder\(\), cards, player\)/);
  assert.match(appSource, /createItemShopResultSections\(entries, player\)/);
  assert.match(appSource, /function itemShopFolderAffordableItems\(folderId = "root", player = activePlayer\(\)\)/);
  assert.match(appSource, /filters\.canAfford\s*\?\s*itemShopFolderAffordableItems\(folder\.id, player\)\.length/);
  assert.match(appSource, /function itemShopRecommendedMechanicProducts\(player = activePlayer\(\)\)/);
  assert.match(appSource, /createItemShopRecommendationSection\(recommendations, player\)/);
  assert.match(appSource, /ITEM_SHOP_RECOMMENDATION_DRAWER_UI_KEY = "rival-saga-item-shop-recommendation-drawer-v1"/);
  assert.match(appSource, /function itemShopRecommendationDrawerScope\(player = activePlayer\(\)\)/);
  assert.match(appSource, /function itemShopRecommendationDrawerCollapsed\(player = activePlayer\(\)\)/);
  assert.match(appSource, /function setItemShopRecommendationDrawerCollapsed\(player = activePlayer\(\), collapsed = false\)/);
  assert.match(appSource, /data-item-shop-recommendations-dismiss/);
  assert.match(appSource, /data-item-shop-recommendations-restore/);
  assert.doesNotMatch(sourceBlock("const CLIENT_LOCAL_STATE_KEYS", "const SANDBOX_SAFE_CLIENT_UI_KEYS"), /itemShopRecommendationDrawer/i);
});

test("species-linked mechanic products expose recommendation eligibility metadata", () => {
  assert.deepEqual(item("Kangaskhanite").eligibility, { pokemonSpecies: ["Kangaskhan"] });
  assert.equal(item("Kangaskhanite").recommendOnOwnership, true);
  assert.deepEqual(item("Metagrossite").eligibility, { pokemonSpecies: ["Metagross"] });
  assert.equal(item("Metagrossite").recommendOnOwnership, true);
  assert.deepEqual(item("Kommonium Z").eligibility, { pokemonSpecies: ["Kommo-o"] });
  assert.equal(item("Kommonium Z").recommendOnOwnership, true);
  assert.deepEqual(item("Mimikium Z").eligibility, { pokemonSpecies: ["Mimikyu"] });
  assert.equal(item("Mimikium Z").recommendOnOwnership, true);
  assert.deepEqual(item("Snorlium Z").eligibility, { pokemonSpecies: ["Snorlax"] });
  assert.equal(item("Snorlium Z").recommendOnOwnership, true);
  assert.equal(item("Normalium Z").eligibility, null);
  assert.equal(item("Normalium Z").recommendOnOwnership, false);
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
  const badgeMetadata = spriteMetadata("Badge Point");
  assert.equal(badgeMetadata.localSprite, "assets/shop/custom/badge-point.svg");
  assert.equal(badgeMetadata.sourceProvider, "Rival Saga Custom");
  const legacyTicketMetadata = spriteMetadata("Legacy Ticket");
  assert.equal(legacyTicketMetadata.localSprite, "assets/shop/custom/legacy-ticket.svg");
  assert.equal(legacyTicketMetadata.sourceProvider, "Rival Saga Custom");
  ["Ability Shield", "Booster Energy", "Covert Cloak", "Room Service", "Utility Umbrella", "Blunder Policy"].forEach((name) => {
    const metadata = spriteMetadata(name);
    assert.equal(metadata.localSprite.startsWith("assets/shop/items/"), true, `${name} item sprite directory`);
    assert.notEqual(metadata.sourceProvider, "", `${name} source provider`);
  });
});

test("species-specific Z-Crystals use local Z-family icon assets and standard pricing", () => {
  [
    "Aloraichium Z",
    "Decidium Z",
    "Eevium Z",
    "Incinium Z",
    "Lunalium Z",
    "Lycanium Z",
    "Marshadium Z",
    "Mewnium Z",
    "Mimikium Z",
    "Pikanium Z",
    "Pikashunium Z",
    "Primarium Z",
    "Snorlium Z",
    "Solganium Z",
    "Tapunium Z",
    "Ultranecrozium Z"
  ].forEach((name) => {
    const metadata = spriteMetadata(name);
    const entry = item(name);
    assert.equal(metadata.localSprite, `assets/shop/items/${spriteSlug(name)}.png`);
    assert.equal(metadata.sourceProvider, "Pokemon Showdown Item Atlas");
    assert.equal(metadata.restoreMethod, "atlas-crop");
    assert.equal(entry.price, STANDARD_Z_CRYSTAL_PRICE, `${name} should use the standard Z-Crystal price`);
    assert.notEqual(entry.cannotPurchase, true, `${name} should be purchasable after pricing`);
    assert.notEqual(entry.balanceReviewRequired, true, `${name} should not remain in balance review after pricing`);
  });
  assert.equal(item("Kommonium Z").cannotPurchase, undefined);
  assert.equal(item("Kommonium Z").price, STANDARD_Z_CRYSTAL_PRICE);
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

test("Z catalog audit reports all species-specific crystals priced at the standard rate", () => {
  const audit = auditItemShopZCatalog(itemShopData);
  const missingNames = names(audit.missing);
  const unpricedNames = names(audit.unpriced);
  assert.deepEqual(missingNames, []);
  assert.deepEqual(unpricedNames, []);
  assert.deepEqual(names(audit.mispriced), []);
  assert.equal(audit.speciesSpecific.find((entry) => entry.name === "Kommonium Z")?.price, STANDARD_Z_CRYSTAL_PRICE);
  assert.equal(audit.speciesSpecific.find((entry) => entry.name === "Mimikium Z")?.present, true);
  assert.equal(audit.speciesSpecific.find((entry) => entry.name === "Mimikium Z")?.price, STANDARD_Z_CRYSTAL_PRICE);
  assert.match(fs.readFileSync(path.join(rootDir, "ITEM_SHOP_Z_CATALOG_BALANCE_REVIEW.md"), "utf8"), /Mimikium Z[\s\S]*Present[\s\S]*\$7,500/);
  assert.doesNotMatch(fs.readFileSync(path.join(rootDir, "ITEM_SHOP_Z_CATALOG_BALANCE_REVIEW.md"), "utf8"), /Needs balance review|Unpriced/);
});

test("sprite audit has zero unresolved known products and keeps initials as failure fallback", () => {
  const summary = summaryFor(auditItemShopSprites());
  assert.equal(summary.concreteProductsAudited, 287);
  assert.equal(summary.counts["intentional-custom"], 2);
  assert.equal(summary.counts["balance-review-unpriced"] || 0, 0);
  assert.equal(summary.canonicalItemMissing, 0);
  assert.equal(summary.mechanicProductsUnresolved, 0);
  assert.equal(summary.unresolved, 0);
  assert.equal(summary.unexpectedInitialsFallbacks, 0);

  const badgePoint = classifyProduct(trainerResourceTestData.find((entry) => entry.name === "Badge Point"));
  assert.equal(badgePoint.classification, "intentional-custom");
  assert.equal(badgePoint.resolvedSpriteSource, "assets/shop/custom/badge-point.svg");
  assert.equal(badgePoint.fallback, "");
  const legacyTicket = classifyProduct(trainerResourceTestData.find((entry) => entry.name === "Legacy Ticket"));
  assert.equal(legacyTicket.classification, "intentional-custom");
  assert.equal(legacyTicket.resolvedSpriteSource, "assets/shop/custom/legacy-ticket.svg");
  assert.equal(legacyTicket.fallback, "");

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
