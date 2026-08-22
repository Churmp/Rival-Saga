// Extracted from C:\Users\Steven\Downloads\Pokemon Rival Saga.xlsx (Item Shop, TM Shop).
// Keep this data reusable for Shop UI and future purchase logic.
const rivalSagaShopMoveClassification = typeof module !== "undefined" && module.exports
  ? require("./move-classification-data.js")
  : globalThis.rivalSagaMoveClassification || {};
const rivalSagaShopChoiceData = typeof module !== "undefined" && module.exports
  ? require("./shop-choice-data.js")
  : globalThis.rivalSagaShopChoiceData || {};
const rivalSagaStaticShopChoiceDefinitions = rivalSagaShopChoiceData.staticShopChoiceDefinitions || {};
const rivalSagaUnpurchasableMoveKeys = new Set([
  ...(rivalSagaShopMoveClassification.singlesExcludedMoves || []),
  ...(rivalSagaShopMoveClassification.removedMoves || []),
  ...(rivalSagaShopMoveClassification.naturalizedRareTmMoves || []).map((entry) => entry.name),
  ...(rivalSagaShopMoveClassification.zeroCompatibilityTmShopMoves || [])
].map((name) => String(name || "").toLowerCase().replace(/[^a-z0-9]+/g, "")));

const rawItemShopData = [
    {
        "id":  "item-berries-not-in-pokeball",
        "name":  "Berries",
        "tier":  "Level 1",
        "level":  1,
        "price":  200,
        "category":  "Berries",
        "description":  ""
    },
    {
        "id":  "item-berry-juice",
        "name":  "Berry Juice",
        "tier":  "Level 1",
        "level":  1,
        "price":  200,
        "category":  "Berries",
        "description":  ""
    },
    {
        "id":  "item-protective-pads",
        "name":  "Protective Pads",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "category":  "Very Niche",
        "description":  ""
    },
    {
        "id":  "item-sticky-barb",
        "name":  "Sticky Barb",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "category":  "Very Niche",
        "description":  ""
    },
    {
        "id":  "item-room-service",
        "name":  "Room Service",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "category":  "Very Niche",
        "description":  ""
    },
    {
        "id":  "item-iron-ball",
        "name":  "Iron Ball",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "category":  "Very Niche",
        "description":  ""
    },
    {
        "id":  "item-float-stone",
        "name":  "Float Stone",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "category":  "Very Niche",
        "description":  ""
    },
    {
        "id":  "item-ring-target",
        "name":  "Ring Target",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "category":  "Very Niche",
        "description":  ""
    },
    {
        "id":  "item-full-incense",
        "name":  "Full Incense",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "category":  "Very Niche",
        "description":  ""
    },
    {
        "id":  "item-lagging-tail",
        "name":  "Lagging Tail",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "category":  "Very Niche",
        "description":  ""
    },
    {
        "id":  "item-binding-band",
        "name":  "Binding Band",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "category":  "Very Niche",
        "description":  ""
    },
    {
        "id":  "item-grip-claw",
        "name":  "Grip Claw",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "category":  "Very Niche",
        "description":  ""
    },
    {
        "id":  "item-big-root",
        "name":  "Big Root",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "category":  "Very Niche",
        "description":  ""
    },
    {
        "id":  "item-utility-umbrella",
        "name":  "Utility Umbrella",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "category":  "Very Niche",
        "description":  ""
    },
    {
        "id":  "item-snowball",
        "name":  "Snowball",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "category":  "Very Niche",
        "description":  ""
    },
    {
        "id":  "item-cell-battery",
        "name":  "Cell Battery",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "category":  "Very Niche",
        "description":  ""
    },
    {
        "id":  "item-luminous-moss",
        "name":  "Luminous Moss",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "category":  "Very Niche",
        "description":  ""
    },
    {
        "id":  "item-big-nugget",
        "name":  "Big Nugget",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "category":  "Very Niche",
        "description":  "Has no normal held-item effect. Its primary competitive use is as a very high-power Fling target."
    },
    {
        "id":  "item-shed-shell",
        "name":  "Shed Shell",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "category":  "Very Niche",
        "description":  ""
    },
    {
        "id":  "item-shell-bell",
        "name":  "Shell Bell",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "category":  "Very Niche",
        "description":  ""
    },
    {
        "id":  "item-safety-goggles",
        "name":  "Safety Goggles",
        "tier":  "Level 1",
        "level":  1,
        "price":  1000,
        "category":  "Niche",
        "description":  ""
    },
    {
        "id":  "item-adrenaline-orb",
        "name":  "Adrenaline Orb",
        "tier":  "Level 1",
        "level":  1,
        "price":  1000,
        "category":  "Niche",
        "description":  ""
    },
    {
        "id":  "item-quick-claw",
        "name":  "Quick Claw",
        "tier":  "Level 1",
        "level":  1,
        "price":  1000,
        "category":  "Niche",
        "description":  ""
    },
    {
        "id":  "item-bright-powder",
        "name":  "Bright Powder",
        "tier":  "Level 1",
        "level":  1,
        "price":  1000,
        "category":  "Niche",
        "description":  ""
    },
    {
        "id":  "item-lax-incense",
        "name":  "Lax Incense",
        "tier":  "Level 1",
        "level":  1,
        "price":  1000,
        "category":  "Niche",
        "description":  ""
    },
    {
        "id":  "item-focus-band",
        "name":  "Focus Band",
        "tier":  "Level 1",
        "level":  1,
        "price":  1000,
        "category":  "Niche",
        "description":  ""
    },
    {
        "id":  "item-king-s-rock",
        "name":  "King\u0027s Rock",
        "tier":  "Level 1",
        "level":  1,
        "price":  1000,
        "category":  "Niche",
        "description":  ""
    },
    {
        "id":  "item-mirror-herb",
        "name":  "Mirror Herb",
        "tier":  "Level 1",
        "level":  1,
        "price":  1000,
        "category":  "Niche",
        "description":  ""
    },
    {
        "id":  "item-mental-herb",
        "name":  "Mental Herb",
        "tier":  "Level 1",
        "level":  1,
        "price":  1000,
        "category":  "Niche",
        "description":  ""
    },
    {
        "id":  "item-blunder-policy",
        "name":  "Blunder Policy",
        "tier":  "Level 1",
        "level":  1,
        "price":  1000,
        "category":  "Niche",
        "description":  ""
    },
    {
        "id":  "item-ability-shield",
        "name":  "Ability Shield",
        "tier":  "Level 1",
        "level":  1,
        "price":  1000,
        "category":  "Niche",
        "description":  ""
    },
    {
        "id":  "item-punching-glove",
        "name":  "Punching Glove",
        "tier":  "Level 1",
        "level":  1,
        "price":  1000,
        "category":  "Niche",
        "description":  ""
    },
    {
        "id":  "item-clear-amulet",
        "name":  "Clear Amulet",
        "tier":  "Level 1",
        "level":  1,
        "price":  1000,
        "category":  "Niche",
        "description":  ""
    },
    {
        "id":  "item-metronome",
        "name":  "Metronome",
        "tier":  "Level 1",
        "level":  1,
        "price":  1500,
        "category":  "Pokemon Specific",
        "description":  ""
    },
    {
        "id":  "item-thick-club",
        "name":  "Thick Club",
        "tier":  "Level 1",
        "level":  1,
        "price":  1500,
        "category":  "Pokemon Specific",
        "description":  ""
    },
    {
        "id":  "item-leek",
        "name":  "Leek",
        "tier":  "Level 1",
        "level":  1,
        "price":  1500,
        "category":  "Pokemon Specific",
        "description":  ""
    },
    {
        "id":  "item-deep-sea-tooth-scale",
        "name":  "Deep Sea Tooth / Scale",
        "tier":  "Level 1",
        "level":  1,
        "price":  1500,
        "category":  "Pokemon Specific",
        "description":  ""
    },
    {
        "id":  "item-light-ball",
        "name":  "Light Ball",
        "tier":  "Level 1",
        "level":  1,
        "price":  2000,
        "category":  "Pokemon Specific",
        "description":  ""
    },
    {
        "id":  "item-type-resist-berry",
        "name":  "Type Resist Berries",
        "tier":  "Level 2",
        "level":  2,
        "price":  400,
        "category":  "Berries",
        "description":  ""
    },
    {
        "id":  "item-sitrus-or-lum-berry",
        "name":  "Competitive Berries",
        "tier":  "Level 2",
        "level":  2,
        "price":  500,
        "category":  "Berries",
        "description":  ""
    },
    {
        "id":  "item-33-heal-berry",
        "name":  "33% Heal Berry",
        "tier":  "Level 2",
        "level":  2,
        "price":  500,
        "category":  "Berries",
        "description":  ""
    },
    {
        "id":  "item-terrain-extender",
        "name":  "Terrain Extender",
        "tier":  "Level 2",
        "level":  2,
        "price":  1000,
        "category":  "Useful",
        "description":  ""
    },
    {
        "id":  "item-air-balloon",
        "name":  "Air Balloon",
        "tier":  "Level 2",
        "level":  2,
        "price":  1000,
        "category":  "Useful",
        "description":  ""
    },
    {
        "id":  "item-muscle-band",
        "name":  "Muscle Band",
        "tier":  "Level 2",
        "level":  2,
        "price":  1000,
        "category":  "Useful",
        "description":  ""
    },
    {
        "id":  "item-wise-glasses",
        "name":  "Wise Glasses",
        "tier":  "Level 2",
        "level":  2,
        "price":  1000,
        "category":  "Useful",
        "description":  ""
    },
    {
        "id":  "item-wide-lens",
        "name":  "Wide Lens",
        "tier":  "Level 2",
        "level":  2,
        "price":  1000,
        "category":  "Useful",
        "description":  ""
    },
    {
        "id":  "item-zoom-lens",
        "name":  "Zoom Lens",
        "tier":  "Level 2",
        "level":  2,
        "price":  1000,
        "category":  "Useful",
        "description":  ""
    },
    {
        "id":  "item-scope-lens",
        "name":  "Scope Lens",
        "tier":  "Level 2",
        "level":  2,
        "price":  2000,
        "category":  "More Useful",
        "description":  ""
    },
    {
        "id":  "item-black-sludge",
        "name":  "Black Sludge",
        "tier":  "Level 2",
        "level":  2,
        "price":  2000,
        "category":  "More Useful",
        "description":  ""
    },
    {
        "id":  "item-misty-seed",
        "name":  "Misty Seed",
        "tier":  "Level 2",
        "level":  2,
        "price":  2000,
        "category":  "More Useful",
        "description":  ""
    },
    {
        "id":  "item-grassy-seed",
        "name":  "Grassy Seed",
        "tier":  "Level 2",
        "level":  2,
        "price":  2000,
        "category":  "More Useful",
        "description":  ""
    },
    {
        "id":  "item-psychic-seed",
        "name":  "Psychic Seed",
        "tier":  "Level 2",
        "level":  2,
        "price":  2000,
        "category":  "More Useful",
        "description":  ""
    },
    {
        "id":  "item-electric-seed",
        "name":  "Electric Seed",
        "tier":  "Level 2",
        "level":  2,
        "price":  2000,
        "category":  "More Useful",
        "description":  ""
    },
    {
        "id":  "item-covert-cloak",
        "name":  "Covert Cloak",
        "tier":  "Level 2",
        "level":  2,
        "price":  2000,
        "category":  "More Useful",
        "description":  ""
    },
    {
        "id":  "item-red-card",
        "name":  "Red Card",
        "tier":  "Level 2",
        "level":  2,
        "price":  2000,
        "category":  "More Useful",
        "description":  ""
    },
    {
        "id":  "item-throat-spray",
        "name":  "Throat Spray",
        "tier":  "Level 2",
        "level":  2,
        "price":  2500,
        "category":  "Very Useful",
        "description":  ""
    },
    {
        "id":  "item-buy-one-type-plate",
        "name":  "Buy One Type Plate",
        "tier":  "Level 2",
        "level":  2,
        "price":  3000,
        "category":  "Very Useful",
        "description":  ""
    },
    {
        "id":  "item-buy-one-type-boosting-item",
        "name":  "Buy One Type Boosting Item",
        "tier":  "Level 2",
        "level":  2,
        "price":  3000,
        "category":  "Very Useful",
        "description":  ""
    },
    {
        "id":  "item-expert-belt",
        "name":  "Expert Belt",
        "tier":  "Level 2",
        "level":  2,
        "price":  3000,
        "category":  "Very Useful",
        "description":  ""
    },
    {
        "id":  "item-eviolite",
        "name":  "Eviolite",
        "tier":  "Level 2",
        "level":  2,
        "price":  3500,
        "category":  "Very Useful",
        "description":  ""
    },
    {
        "id":  "item-toxic-orb-or-flame-orb",
        "name":  "Toxic Orb or Flame Orb",
        "tier":  "Level 3",
        "level":  3,
        "price":  1500,
        "category":  "Good",
        "description":  ""
    },
    {
        "id":  "item-light-clay",
        "name":  "Light Clay",
        "tier":  "Level 3",
        "level":  3,
        "price":  3000,
        "category":  "Good",
        "description":  ""
    },
    {
        "id":  "item-weather-rock",
        "name":  "Weather Rock",
        "tier":  "Level 3",
        "level":  3,
        "price":  1500,
        "category":  "Good",
        "description":  ""
    },
    {
        "id":  "item-white-herb",
        "name":  "White Herb",
        "tier":  "Level 3",
        "level":  3,
        "price":  2000,
        "category":  "Good",
        "description":  ""
    },
    {
        "id":  "item-power-herb",
        "name":  "Power Herb",
        "tier":  "Level 3",
        "level":  3,
        "price":  2000,
        "category":  "Good",
        "description":  ""
    },
    {
        "id":  "item-type-gems",
        "name":  "Type Gems",
        "tier":  "Level 3",
        "level":  3,
        "price":  3000,
        "category":  "Really Good",
        "description":  ""
    },
    {
        "id":  "item-eject-pack",
        "name":  "Eject Pack",
        "tier":  "Level 3",
        "level":  3,
        "price":  3000,
        "category":  "Really Good",
        "description":  ""
    },
    {
        "id":  "item-eject-button",
        "name":  "Eject Button",
        "tier":  "Level 3",
        "level":  3,
        "price":  3000,
        "category":  "Really Good",
        "description":  ""
    },
    {
        "id":  "item-loaded-dice",
        "name":  "Loaded Dice",
        "tier":  "Level 3",
        "level":  3,
        "price":  4000,
        "category":  "Really Good",
        "description":  ""
    },
    {
        "id":  "item-soul-dew",
        "name":  "Soul Dew",
        "tier":  "Level 3",
        "level":  3,
        "price":  2000,
        "category":  "Legendary Items",
        "description":  ""
    },
    {
        "id":  "item-genesect-drive",
        "name":  "Genesect Drive",
        "tier":  "Level 3",
        "level":  3,
        "price":  2000,
        "category":  "Legendary Items",
        "description":  ""
    },
    {
        "id":  "item-adamant-orb",
        "name":  "Adamant Orb",
        "tier":  "Level 3",
        "level":  3,
        "price":  2000,
        "category":  "Legendary Items",
        "description":  ""
    },
    {
        "id":  "item-lustrous-orb",
        "name":  "Lustrous Orb",
        "tier":  "Level 3",
        "level":  3,
        "price":  2000,
        "category":  "Legendary Items",
        "description":  ""
    },
    {
        "id":  "item-griseous-orb",
        "name":  "Griseous Orb",
        "tier":  "Level 3",
        "level":  3,
        "price":  2000,
        "category":  "Legendary Items",
        "description":  ""
    },
    {
        "id":  "item-rusted-shield",
        "name":  "Rusted Shield",
        "tier":  "Level 3",
        "level":  3,
        "price":  5000,
        "category":  "Legendary Items",
        "description":  ""
    },
    {
        "id":  "item-rusted-sword",
        "name":  "Rusted Sword",
        "tier":  "Level 3",
        "level":  3,
        "price":  5000,
        "category":  "Legendary Items",
        "description":  ""
    },
    {
        "id":  "item-weakness-policy",
        "name":  "Weakness Policy",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "category":  "Strong",
        "description":  ""
    },
    {
        "id":  "item-booster-energy",
        "name":  "Booster Energy",
        "tier":  "Level 4",
        "level":  4,
        "price":  3000,
        "category":  "Strong",
        "description":  ""
    },
    {
        "id":  "item-rocky-helmet",
        "name":  "Rocky Helmet",
        "tier":  "Level 4",
        "level":  4,
        "price":  4500,
        "category":  "Strong",
        "description":  ""
    },
    {
        "id":  "item-focus-sash",
        "name":  "Focus Sash",
        "tier":  "Level 4",
        "level":  4,
        "price":  4500,
        "category":  "Strong",
        "description":  ""
    },
    {
        "id":  "item-assault-vest",
        "name":  "Assault Vest",
        "tier":  "Level 4",
        "level":  4,
        "price":  5500,
        "category":  "Strong",
        "description":  ""
    },
    {
        "id":  "item-life-orb",
        "name":  "Life Orb",
        "tier":  "Level 4",
        "level":  4,
        "price":  5500,
        "category":  "Strong",
        "description":  ""
    },
    {
        "id":  "item-heavy-duty-boots",
        "name":  "Heavy-Duty Boots",
        "tier":  "Level 4",
        "level":  4,
        "price":  5500,
        "category":  "Strong",
        "description":  ""
    },
    {
        "id":  "item-leftovers",
        "name":  "Leftovers",
        "tier":  "Level 4",
        "level":  4,
        "price":  7000,
        "category":  "Really Strong",
        "description":  ""
    },
    {
        "id":  "item-choice-band",
        "name":  "Choice Band",
        "tier":  "Level 4",
        "level":  4,
        "price":  7000,
        "category":  "Really Strong",
        "description":  ""
    },
    {
        "id":  "item-choice-scarf",
        "name":  "Choice Scarf",
        "tier":  "Level 4",
        "level":  4,
        "price":  7000,
        "category":  "Really Strong",
        "description":  ""
    },
    {
        "id":  "item-choice-specs",
        "name":  "Choice Specs",
        "tier":  "Level 4",
        "level":  4,
        "price":  7000,
        "category":  "Really Strong",
        "description":  ""
    },
    {
        "id":  "item-one-tera-type",
        "name":  "One Tera Type",
        "tier":  "Level 5",
        "level":  5,
        "price":  7500,
        "category":  "General",
        "description":  ""
    },
    {
        "id":  "item-one-z-move-type",
        "name":  "One Z Move Type",
        "tier":  "Level 5",
        "level":  5,
        "price":  7500,
        "category":  "General",
        "description":  ""
    },
    {
        "id":  "item-normalium-z",
        "name":  "Normalium Z",
        "tier":  "Level 5",
        "level":  5,
        "price":  7500,
        "category":  "General",
        "description":  ""
    },
    {
        "id":  "item-kommonium-z",
        "name":  "Kommonium Z",
        "tier":  "Level 5",
        "level":  5,
        "price":  10000,
        "category":  "General",
        "description":  ""
    },
    {
        "id":  "item-one-mega-stone-not-listed",
        "name":  "One Mega Stone Not Listed",
        "tier":  "Level 5",
        "level":  5,
        "price":  7500,
        "category":  "General",
        "description":  ""
    },
    {
        "id":  "item-kangaskhanite",
        "name":  "Kangaskhanite",
        "tier":  "Level 5",
        "level":  5,
        "price":  7500,
        "category":  "General",
        "description":  ""
    },
    {
        "id":  "item-metagrossite",
        "name":  "Metagrossite",
        "tier":  "Level 5",
        "level":  5,
        "price":  7500,
        "category":  "General",
        "description":  ""
    },
    {
        "id":  "item-lucarionite",
        "name":  "Lucarionite",
        "tier":  "Level 5",
        "level":  5,
        "price":  7500,
        "category":  "General",
        "description":  ""
    },
    {
        "id":  "item-gengarite",
        "name":  "Gengarite",
        "tier":  "Level 5",
        "level":  5,
        "price":  7500,
        "category":  "General",
        "description":  ""
    },
    {
        "id":  "item-salamencite",
        "name":  "Salamencite",
        "tier":  "Level 5",
        "level":  5,
        "price":  7500,
        "category":  "General",
        "description":  ""
    },
    {
        "id":  "item-blastoisinite",
        "name":  "Blastoisinite",
        "tier":  "Level 5",
        "level":  5,
        "price":  7500,
        "category":  "General",
        "description":  ""
    }
];

const itemShopMetadataById = Object.freeze({
  "item-berries-not-in-pokeball": { shopGroup: "berry", roles: ["utility", "recovery"], tags: ["status"] },
  "item-berry-juice": { shopGroup: "berry", roles: ["recovery"] },
  "item-protective-pads": { shopGroup: "held", roles: ["offense", "utility"] },
  "item-sticky-barb": { shopGroup: "held", roles: ["utility"], tags: ["switching"] },
  "item-room-service": { shopGroup: "held", roles: ["speed"], tags: ["terrain"] },
  "item-iron-ball": { shopGroup: "held", roles: ["utility", "speed"], tags: ["build-enabling"] },
  "item-float-stone": { shopGroup: "held", roles: ["utility"] },
  "item-ring-target": { shopGroup: "held", roles: ["utility"], tags: ["build-enabling"] },
  "item-full-incense": { shopGroup: "held", roles: ["speed"], tags: ["build-enabling"] },
  "item-lagging-tail": { shopGroup: "held", roles: ["speed"], tags: ["build-enabling"] },
  "item-binding-band": { shopGroup: "held", roles: ["offense"] },
  "item-grip-claw": { shopGroup: "held", roles: ["utility"] },
  "item-big-root": { shopGroup: "held", roles: ["recovery"] },
  "item-utility-umbrella": { shopGroup: "held", roles: ["utility"], tags: ["weather"] },
  "item-snowball": { shopGroup: "held", roles: ["offense"], tags: ["weather"] },
  "item-cell-battery": { shopGroup: "held", roles: ["offense"] },
  "item-luminous-moss": { shopGroup: "held", roles: ["defense"] },
  "item-big-nugget": { shopGroup: "held", roles: ["utility"] },
  "item-shed-shell": { shopGroup: "held", roles: ["utility"], tags: ["switching"] },
  "item-shell-bell": { shopGroup: "held", roles: ["offense", "recovery"] },
  "item-safety-goggles": { shopGroup: "held", roles: ["defense", "utility"], tags: ["weather"] },
  "item-adrenaline-orb": { shopGroup: "held", roles: ["speed"], tags: ["setup"] },
  "item-quick-claw": { shopGroup: "held", roles: ["speed"] },
  "item-bright-powder": { shopGroup: "held", roles: ["defense"] },
  "item-lax-incense": { shopGroup: "held", roles: ["defense"] },
  "item-focus-band": { shopGroup: "held", roles: ["defense"] },
  "item-king-s-rock": { shopGroup: "held", roles: ["offense"], tags: ["multi-hit"] },
  "item-mirror-herb": { shopGroup: "held", roles: ["utility"], tags: ["setup"] },
  "item-mental-herb": { shopGroup: "held", roles: ["utility"], tags: ["status"] },
  "item-blunder-policy": { shopGroup: "held", roles: ["speed"], tags: ["setup"] },
  "item-ability-shield": { shopGroup: "held", roles: ["defense", "utility"], tags: ["build-enabling"] },
  "item-punching-glove": { shopGroup: "held", roles: ["offense"] },
  "item-clear-amulet": { shopGroup: "held", roles: ["defense", "utility"] },
  "item-metronome": { shopGroup: "held", roles: ["offense"] },
  "item-thick-club": { shopGroup: "pokemon-specific", roles: ["offense"], tags: ["build-enabling"] },
  "item-leek": { shopGroup: "pokemon-specific", roles: ["offense"], tags: ["build-enabling"] },
  "item-deep-sea-tooth-scale": { shopGroup: "pokemon-specific", roles: ["offense", "defense"], tags: ["build-enabling"] },
  "item-light-ball": { shopGroup: "pokemon-specific", roles: ["offense"], tags: ["build-enabling"] },
  "item-type-resist-berry": { shopGroup: "berry", roles: ["defense"], tags: ["type-boost"] },
  "item-sitrus-or-lum-berry": { shopGroup: "berry", roles: ["recovery", "utility"], tags: ["status"] },
  "item-33-heal-berry": { shopGroup: "berry", roles: ["recovery"] },
  "item-terrain-extender": { shopGroup: "held", roles: ["utility"], tags: ["terrain"] },
  "item-air-balloon": { shopGroup: "held", roles: ["defense", "utility"] },
  "item-muscle-band": { shopGroup: "held", roles: ["offense"] },
  "item-wise-glasses": { shopGroup: "held", roles: ["offense"] },
  "item-wide-lens": { shopGroup: "held", roles: ["offense", "utility"] },
  "item-zoom-lens": { shopGroup: "held", roles: ["offense", "utility"] },
  "item-scope-lens": { shopGroup: "held", roles: ["offense"] },
  "item-black-sludge": { shopGroup: "held", roles: ["defense", "recovery"], tags: ["build-enabling"] },
  "item-misty-seed": { shopGroup: "held", roles: ["defense"], tags: ["terrain", "setup"] },
  "item-grassy-seed": { shopGroup: "held", roles: ["defense"], tags: ["terrain", "setup"] },
  "item-psychic-seed": { shopGroup: "held", roles: ["defense"], tags: ["terrain", "setup"] },
  "item-electric-seed": { shopGroup: "held", roles: ["defense"], tags: ["terrain", "setup"] },
  "item-covert-cloak": { shopGroup: "held", roles: ["defense", "utility"] },
  "item-red-card": { shopGroup: "held", roles: ["defense", "utility"], tags: ["switching"] },
  "item-throat-spray": { shopGroup: "held", roles: ["offense"], tags: ["setup"] },
  "item-buy-one-type-plate": { shopGroup: "held", roles: ["offense"], tags: ["type-boost"] },
  "item-buy-one-type-boosting-item": { shopGroup: "held", roles: ["offense"], tags: ["type-boost"] },
  "item-expert-belt": { shopGroup: "held", roles: ["offense"] },
  "item-eviolite": { shopGroup: "held", roles: ["defense"], tags: ["build-enabling"] },
  "item-toxic-orb-or-flame-orb": { shopGroup: "held", roles: ["offense", "utility"], tags: ["status", "build-enabling"] },
  "item-light-clay": { shopGroup: "held", roles: ["defense", "utility"], tags: ["screens"] },
  "item-weather-rock": { shopGroup: "held", roles: ["utility"], tags: ["weather"] },
  "item-white-herb": { shopGroup: "held", roles: ["utility"], tags: ["setup"] },
  "item-power-herb": { shopGroup: "held", roles: ["offense", "utility"], tags: ["setup"] },
  "item-type-gems": { shopGroup: "held", roles: ["offense"], tags: ["type-boost"] },
  "item-eject-pack": { shopGroup: "held", roles: ["utility"], tags: ["switching"] },
  "item-eject-button": { shopGroup: "held", roles: ["utility"], tags: ["switching"] },
  "item-loaded-dice": { shopGroup: "held", roles: ["offense"], tags: ["multi-hit", "build-enabling"] },
  "item-soul-dew": { shopGroup: "pokemon-specific", roles: ["offense", "defense"], tags: ["build-enabling"] },
  "item-genesect-drive": { shopGroup: "pokemon-specific", roles: ["offense", "utility"], tags: ["type-boost", "build-enabling"] },
  "item-adamant-orb": { shopGroup: "pokemon-specific", roles: ["offense"], tags: ["type-boost", "build-enabling"] },
  "item-lustrous-orb": { shopGroup: "pokemon-specific", roles: ["offense"], tags: ["type-boost", "build-enabling"] },
  "item-griseous-orb": { shopGroup: "pokemon-specific", roles: ["offense"], tags: ["type-boost", "build-enabling"] },
  "item-rusted-shield": { shopGroup: "pokemon-specific", roles: ["defense"], tags: ["build-enabling"] },
  "item-rusted-sword": { shopGroup: "pokemon-specific", roles: ["offense"], tags: ["build-enabling"] },
  "item-weakness-policy": { shopGroup: "held", roles: ["offense"], tags: ["setup"] },
  "item-booster-energy": { shopGroup: "pokemon-specific", roles: ["offense", "speed"], tags: ["setup", "paradox", "build-enabling"] },
  "item-rocky-helmet": { shopGroup: "held", roles: ["defense"] },
  "item-focus-sash": { shopGroup: "held", roles: ["defense", "utility"] },
  "item-assault-vest": { shopGroup: "held", roles: ["defense"], tags: ["build-enabling"] },
  "item-life-orb": { shopGroup: "held", roles: ["offense"] },
  "item-heavy-duty-boots": { shopGroup: "held", roles: ["defense", "utility"] },
  "item-leftovers": { shopGroup: "held", roles: ["defense", "recovery"] },
  "item-choice-band": { shopGroup: "held", roles: ["offense"], tags: ["choice"] },
  "item-choice-scarf": { shopGroup: "held", roles: ["offense", "speed"], tags: ["choice"] },
  "item-choice-specs": { shopGroup: "held", roles: ["offense"], tags: ["choice"] },
  "item-one-tera-type": { shopGroup: "battle-mechanics", roles: ["utility"], tags: ["tera"], mechanicFamily: "tera" },
  "item-one-z-move-type": { shopGroup: "battle-mechanics", roles: ["offense"], tags: ["z-move"], mechanicFamily: "z-move" },
  "item-normalium-z": { shopGroup: "battle-mechanics", roles: ["offense"], tags: ["z-move"], mechanicFamily: "z-move" },
  "item-kommonium-z": { shopGroup: "battle-mechanics", roles: ["offense"], tags: ["z-move"], mechanicFamily: "z-move" },
  "item-one-mega-stone-not-listed": { shopGroup: "battle-mechanics", roles: ["offense", "defense"], tags: ["mega"], mechanicFamily: "mega" },
  "item-kangaskhanite": { shopGroup: "battle-mechanics", roles: ["offense"], tags: ["mega"], mechanicFamily: "mega" },
  "item-metagrossite": { shopGroup: "battle-mechanics", roles: ["offense", "defense"], tags: ["mega"], mechanicFamily: "mega" },
  "item-lucarionite": { shopGroup: "battle-mechanics", roles: ["offense"], tags: ["mega"], mechanicFamily: "mega" },
  "item-gengarite": { shopGroup: "battle-mechanics", roles: ["offense", "speed"], tags: ["mega"], mechanicFamily: "mega" },
  "item-salamencite": { shopGroup: "battle-mechanics", roles: ["offense", "speed"], tags: ["mega"], mechanicFamily: "mega" },
  "item-blastoisinite": { shopGroup: "battle-mechanics", roles: ["offense", "defense"], tags: ["mega"], mechanicFamily: "mega" }
});

const hiddenItemShopProductNames = Object.freeze(new Set([
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
  "Normalium Z",
  "One Mega Stone Not Listed"
]));

const itemShopParentByName = new Map(rawItemShopData.map((item) => [item.name, item]));

function shopDataSlug(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function itemShopMetadataFor(item) {
  const metadata = itemShopMetadataById[item.id] || {};
  return {
    shopGroup: metadata.shopGroup || "held",
    roles: metadata.roles || [],
    tags: metadata.tags || [],
    mechanicFamily: metadata.mechanicFamily || ""
  };
}

function itemShopChoiceNames(parentName) {
  return (rivalSagaStaticShopChoiceDefinitions[parentName]?.options || []).map((option) =>
    typeof option === "string" ? option : option?.name
  ).filter(Boolean);
}

function createDerivedItemShopEntry(parentName, choiceName, overrides = {}) {
  const parent = itemShopParentByName.get(parentName);
  if (!parent) return null;
  const id = overrides.id || `${parent.id}--${shopDataSlug(choiceName)}`;
  const metadata = {
    ...itemShopMetadataFor(parent),
    ...(overrides.metadata || {})
  };
  return {
    ...parent,
    id,
    name: choiceName,
    price: overrides.price ?? parent.price,
    description: overrides.description || parent.description,
    parentShopItemName: parentName,
    spriteKey: overrides.spriteKey || choiceName,
    imageKey: overrides.imageKey || choiceName,
    shopGroup: metadata.shopGroup || "held",
    roles: metadata.roles || [],
    tags: metadata.tags || [],
    mechanicFamily: metadata.mechanicFamily || ""
  };
}

function createDerivedItemShopEntries(parentName, overrides = {}) {
  return itemShopChoiceNames(parentName)
    .map((choiceName) => createDerivedItemShopEntry(parentName, choiceName, overrides))
    .filter(Boolean);
}

const derivedItemShopData = [
  ...createDerivedItemShopEntries("Berries", {
    metadata: { shopGroup: "berry", roles: ["recovery", "utility"], tags: ["status"] }
  }),
  ...createDerivedItemShopEntries("Type Resist Berries", {
    metadata: { shopGroup: "berry", roles: ["defense"], tags: ["type-boost"] }
  }),
  ...createDerivedItemShopEntries("Competitive Berries", {
    metadata: { shopGroup: "berry", roles: ["recovery", "utility"], tags: ["status", "setup"] }
  }),
  ...createDerivedItemShopEntries("33% Heal Berry", {
    metadata: { shopGroup: "berry", roles: ["recovery"], tags: [] }
  }),
  ...createDerivedItemShopEntries("Buy One Type Plate", {
    metadata: { shopGroup: "held", roles: ["offense"], tags: ["type-boost"] }
  }),
  ...createDerivedItemShopEntries("Buy One Type Boosting Item", {
    metadata: { shopGroup: "held", roles: ["offense"], tags: ["type-boost"] }
  }),
  ...createDerivedItemShopEntries("Type Gems", {
    metadata: { shopGroup: "held", roles: ["offense"], tags: ["type-boost"] }
  }),
  ...createDerivedItemShopEntries("Toxic Orb or Flame Orb", {
    price: 3000,
    metadata: { shopGroup: "held", roles: ["offense", "utility"], tags: ["status", "build-enabling"] }
  }),
  ...createDerivedItemShopEntries("Weather Rock", {
    metadata: { shopGroup: "held", roles: ["utility"], tags: ["weather"] }
  }),
  ...createDerivedItemShopEntries("Deep Sea Tooth / Scale", {
    metadata: { shopGroup: "pokemon-specific", roles: ["offense", "defense"], tags: ["build-enabling"] }
  }),
  ...createDerivedItemShopEntries("Genesect Drive", {
    metadata: { shopGroup: "pokemon-specific", roles: ["offense", "utility"], tags: ["type-boost", "build-enabling"] }
  }),
  ...createDerivedItemShopEntries("One Tera Type", {
    metadata: { shopGroup: "battle-mechanics", roles: ["utility"], tags: ["tera"], mechanicFamily: "tera" }
  }),
  ...createDerivedItemShopEntries("One Z Move Type", {
    metadata: { shopGroup: "battle-mechanics", roles: ["offense"], tags: ["z-move"], mechanicFamily: "z-move" }
  }),
  ...createDerivedItemShopEntries("One Mega Stone Not Listed", {
    metadata: { shopGroup: "battle-mechanics", roles: ["offense", "defense"], tags: ["mega"], mechanicFamily: "mega" }
  })
];

const itemShopData = [
  ...rawItemShopData
    .filter((item) => !hiddenItemShopProductNames.has(item.name))
    .map((item) => ({
      ...item,
      ...itemShopMetadataFor(item)
    })),
  ...derivedItemShopData
];

const rawTmShopData = [
    {
        "id":  "tm-acid",
        "name":  "Acid",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Poison",
        "category":  "Special",
        "description":  "Has a chance to lower the target's Special Defense by one stage."
    },
    {
        "id":  "tm-hold-back",
        "name":  "Hold Back",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Normal",
        "category":  "Physical",
        "description":  "Always leaves the target with at least 1 HP."
    },
    {
        "id":  "tm-quick-guard",
        "name":  "Quick Guard",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Fighting",
        "category":  "Status",
        "description":  "Prevents priority moves from hitting the user's side this turn."
    },
    {
        "id":  "tm-rototiller",
        "name":  "Rototiller",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Ground",
        "category":  "Status",
        "description":  "Raises the Attack and Special Attack of all grounded Grass Pokemon."
    },
    {
        "id":  "tm-water-gun",
        "name":  "Water Gun",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Water",
        "category":  "Special",
        "description":  "Inflicts regular damage with no additional effect."
    },
    {
        "id":  "tm-flail",
        "name":  "Flail",
        "tier":  "Level 1",
        "level":  1,
        "price":  1000,
        "type":  "Normal",
        "category":  "Physical",
        "description":  "Inflicts more damage when the user has less HP remaining."
    },
    {
        "id":  "tm-fury-swipes",
        "name":  "Fury Swipes",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-payday",
        "name":  "Payday",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-feint",
        "name":  "Feint",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-cut",
        "name":  "Cut",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-horn-attack",
        "name":  "Horn Attack",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-echoed-voice",
        "name":  "Echoed Voice",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-bind",
        "name":  "Bind",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-constrict",
        "name":  "Constrict",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-snore",
        "name":  "Snore",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-slam",
        "name":  "Slam",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-smelling-salts",
        "name":  "Smelling Salts",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-double-hit",
        "name":  "Double Hit",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-mega-punch",
        "name":  "Mega Punch",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-comet-punch",
        "name":  "Comet Punch",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-natural-gift",
        "name":  "Natural Gift",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-trump-card",
        "name":  "Trump Card",
        "tier":  "Level 1",
        "level":  1,
        "price":  1000,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-chip-away",
        "name":  "Chip Away",
        "tier":  "Level 1",
        "level":  1,
        "price":  1000,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-round",
        "name":  "Round",
        "tier":  "Level 1",
        "level":  1,
        "price":  1000,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-swift",
        "name":  "Swift",
        "tier":  "Level 1",
        "level":  1,
        "price":  1000,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-covet",
        "name":  "Covet",
        "tier":  "Level 1",
        "level":  1,
        "price":  1000,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-take-down",
        "name":  "Take Down",
        "tier":  "Level 1",
        "level":  1,
        "price":  1000,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-selfdestruct",
        "name":  "Selfdestruct",
        "tier":  "Level 1",
        "level":  1,
        "price":  1000,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-secret-power",
        "name":  "Secret Power",
        "tier":  "Level 1",
        "level":  1,
        "price":  1250,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-slash",
        "name":  "Slash",
        "tier":  "Level 1",
        "level":  1,
        "price":  1250,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-retaliate",
        "name":  "Retaliate",
        "tier":  "Level 1",
        "level":  1,
        "price":  1250,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-octozooka",
        "name":  "Octazooka",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Water",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-chilling-water",
        "name":  "Chilling Water",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Water",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-whirlpool",
        "name":  "Whirlpool",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Unknown",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-bubblebeam",
        "name":  "Bubblebeam",
        "tier":  "Level 1",
        "level":  1,
        "price":  1000,
        "type":  "Water",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-water-pulse",
        "name":  "Water Pulse",
        "tier":  "Level 1",
        "level":  1,
        "price":  1000,
        "type":  "Water",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-flame-wheel",
        "name":  "Flame Wheel",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Fire",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-fire-spin",
        "name":  "Fire Spin",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Fire",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-incinerate",
        "name":  "Incinerate",
        "tier":  "Level 1",
        "level":  1,
        "price":  1250,
        "type":  "Fire",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-razor-leaf",
        "name":  "Razor Leaf",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Grass",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-magical-leaf",
        "name":  "Magical Leaf",
        "tier":  "Level 1",
        "level":  1,
        "price":  1000,
        "type":  "Grass",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-shock-wave",
        "name":  "Shock Wave",
        "tier":  "Level 1",
        "level":  1,
        "price":  1000,
        "type":  "Electric",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-volt-tackle",
        "name":  "Volt Tackle",
        "tier":  "Level 1",
        "level":  1,
        "price":  1000,
        "type":  "Electric",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-spark",
        "name":  "Spark",
        "tier":  "Level 1",
        "level":  1,
        "price":  1000,
        "type":  "Electric",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-rock-smash",
        "name":  "Rock Smash",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Fighting",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-karate-chop",
        "name":  "Karate Chop",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Fighting",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-storm-throw",
        "name":  "Storm Throw",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Fighting",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-upper-hand",
        "name":  "Upper Hand",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Fighting",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-rolling-kick",
        "name":  "Rolling Kick",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Fighting",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-submission",
        "name":  "Submission",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Fighting",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-vital-throw",
        "name":  "Vital Throw",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Fighting",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-double-kick",
        "name":  "Double Kick",
        "tier":  "Level 1",
        "level":  1,
        "price":  1000,
        "type":  "Fighting",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-air-cutter",
        "name":  "Air Cutter",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Flying",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-aerial-ace",
        "name":  "Aerial Ace",
        "tier":  "Level 1",
        "level":  1,
        "price":  1000,
        "type":  "Flying",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-wing-attack",
        "name":  "Wing Attack",
        "tier":  "Level 1",
        "level":  1,
        "price":  1000,
        "type":  "Flying",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-pluck",
        "name":  "Pluck",
        "tier":  "Level 1",
        "level":  1,
        "price":  1250,
        "type":  "Flying",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-fury-cutter",
        "name":  "Fury Cutter",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Bug",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-twineedle",
        "name":  "Twineedle",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Bug",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-pounce",
        "name":  "Pounce",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Bug",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-struggle-bug",
        "name":  "Struggle Bug",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Bug",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-metal-claw",
        "name":  "Metal Claw",
        "tier":  "Level 1",
        "level":  1,
        "price":  1250,
        "type":  "Steel",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-steel-roller",
        "name":  "Steel Roller",
        "tier":  "Level 1",
        "level":  1,
        "price":  1500,
        "type":  "Steel",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-mud-shot",
        "name":  "Mud Shot",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Ground",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-mud-bomb",
        "name":  "Mud Bomb",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Ground",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-sand-tomb",
        "name":  "Sand Tomb",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Ground",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-rock-throw",
        "name":  "Rock Throw",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Rock",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-psywave",
        "name":  "Psywave",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Psychic",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-confusion",
        "name":  "Confusion",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Psychic",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-synchronoise",
        "name":  "Synchronoise",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Psychic",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-beat-up",
        "name":  "Beat up",
        "tier":  "Level 1",
        "level":  1,
        "price":  1000,
        "type":  "Dark",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-thief",
        "name":  "Thief",
        "tier":  "Level 1",
        "level":  1,
        "price":  1000,
        "type":  "Dark",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-brutal-swing",
        "name":  "Brutal Swing",
        "tier":  "Level 1",
        "level":  1,
        "price":  1000,
        "type":  "Dark",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-feint-attack",
        "name":  "Feint Attack",
        "tier":  "Level 1",
        "level":  1,
        "price":  1000,
        "type":  "Dark",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-fling",
        "name":  "Fling",
        "tier":  "Level 1",
        "level":  1,
        "price":  1000,
        "type":  "Dark",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-poison-tail",
        "name":  "Poison Tail",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Poison",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-dragonbreath",
        "name":  "DragonBreath",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Dragon",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-breaking-swipe",
        "name":  "Breaking Swipe",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Dragon",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-misty-explosion",
        "name":  "Misty Explosion",
        "tier":  "Level 1",
        "level":  1,
        "price":  1000,
        "type":  "Fairy",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-bubble",
        "name":  "Bubble",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Water",
        "category":  "Really Ass Moves",
        "description":  ""
    },
    {
        "id":  "tm-vine-whip",
        "name":  "Vine Whip",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Grass",
        "category":  "Really Ass Moves",
        "description":  ""
    },
    {
        "id":  "tm-twister",
        "name":  "Twister",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Dragon",
        "category":  "Really Ass Moves",
        "description":  ""
    },
    {
        "id":  "tm-rage",
        "name":  "Rage",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Normal",
        "category":  "Really Ass Moves",
        "description":  ""
    },
    {
        "id":  "tm-false-swipe",
        "name":  "False Swipe",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Normal",
        "category":  "Really Ass Moves",
        "description":  ""
    },
    {
        "id":  "tm-razor-wind",
        "name":  "Razor Wind",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Normal",
        "category":  "Really Ass Moves",
        "description":  ""
    },
    {
        "id":  "tm-skull-bash",
        "name":  "Skull Bash",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Normal",
        "category":  "Really Ass Moves",
        "description":  ""
    },
    {
        "id":  "tm-present",
        "name":  "Present",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Normal",
        "category":  "Really Ass Moves",
        "description":  ""
    },
    {
        "id":  "tm-double-slap",
        "name":  "Double Slap",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Normal",
        "category":  "Really Ass Moves",
        "description":  ""
    },
    {
        "id":  "tm-astonish",
        "name":  "Astonish",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Ghost",
        "category":  "Really Ass Moves",
        "description":  ""
    },
    {
        "id":  "tm-lick",
        "name":  "Lick",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Ghost",
        "category":  "Really Ass Moves",
        "description":  ""
    },
    {
        "id":  "tm-mud-slap",
        "name":  "Mud-Slap",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Ground",
        "category":  "Really Ass Moves",
        "description":  ""
    },
    {
        "id":  "tm-mega-drain",
        "name":  "Mega Drain",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Grass",
        "category":  "Really Ass Moves",
        "description":  ""
    },
    {
        "id":  "tm-dream-eater",
        "name":  "Dream Eater",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Psychic",
        "category":  "Really Ass Moves",
        "description":  ""
    },
    {
        "id":  "tm-dragon-rage",
        "name":  "Dragon Rage",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Unknown",
        "category":  "Really Ass Moves",
        "description":  ""
    },
    {
        "id":  "tm-bide",
        "name":  "Bide",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Normal",
        "category":  "Really Ass Moves",
        "description":  ""
    },
    {
        "id":  "tm-disarming-voice",
        "name":  "Disarming Voice",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Fairy",
        "category":  "Really Ass Moves",
        "description":  ""
    },
    {
        "id":  "tm-fairy-wind",
        "name":  "Fairy Wind",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Fairy",
        "category":  "Really Ass Moves",
        "description":  ""
    },
    {
        "id":  "tm-rollout",
        "name":  "Rollout",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Rock",
        "category":  "Really Ass Moves",
        "description":  ""
    },
    {
        "id":  "tm-ice-ball",
        "name":  "Ice Ball",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Ice",
        "category":  "Really Ass Moves",
        "description":  ""
    },
    {
        "id":  "tm-smog",
        "name":  "Smog",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Poison",
        "category":  "Really Ass Moves",
        "description":  ""
    },
    {
        "id":  "tm-poison-sting",
        "name":  "Poison Sting",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Poison",
        "category":  "Really Ass Moves",
        "description":  ""
    },
    {
        "id":  "tm-sonic-boom",
        "name":  "Sonic Boom",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Normal",
        "category":  "Really Ass Moves",
        "description":  ""
    },
    {
        "id":  "tm-absorb",
        "name":  "Absorb",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Grass",
        "category":  "Really Ass Moves",
        "description":  ""
    },
    {
        "id":  "tm-peck",
        "name":  "Peck",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Flying",
        "category":  "Really Ass Moves",
        "description":  ""
    },
    {
        "id":  "tm-gust",
        "name":  "Gust",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Flying",
        "category":  "Really Ass Moves",
        "description":  ""
    },
    {
        "id":  "tm-amnesia",
        "name":  "Amnesia",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-charge",
        "name":  "Charge",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-venom-drench",
        "name":  "Venom Drench",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-defense-curl",
        "name":  "Defense Curl",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-psych-up",
        "name":  "Psych Up",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-metal-sound",
        "name":  "Metal Sound",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-eerie-impulse",
        "name":  "Eerie Impulse",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-screech",
        "name":  "Screech",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-feather-dance",
        "name":  "Feather Dance",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-charm",
        "name":  "Charm",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-captivate",
        "name":  "Captivate",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-fake-tears",
        "name":  "Fake Tears",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-scary-face",
        "name":  "Scary Face",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-baby-doll-eyes",
        "name":  "Baby-Doll Eyes",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-string-shot",
        "name":  "String Shot",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-confide",
        "name":  "Confide",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-tickle",
        "name":  "Tickle",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-sweet-scent",
        "name":  "Sweet Scent",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-flash",
        "name":  "Flash",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-sand-attack",
        "name":  "Sand Attack",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-smokescreen",
        "name":  "Smokescreen",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-tail-whip",
        "name":  "Tail Whip",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-leer",
        "name":  "Leer",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-growl",
        "name":  "Growl",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-harden",
        "name":  "Harden",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-sharpen",
        "name":  "Sharpen",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-cotton-spore",
        "name":  "Cotton Spore",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-noble-roar",
        "name":  "Noble Roar",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-tearful-look",
        "name":  "Tearful Look",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-life-dew",
        "name":  "Life Dew",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Unknown",
        "category":  "Usable Status Moves",
        "description":  ""
    },
    {
        "id":  "tm-teeter-dance",
        "name":  "Teeter Dance",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Unknown",
        "category":  "Usable Status Moves",
        "description":  ""
    },
    {
        "id":  "tm-gravity",
        "name":  "Gravity",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Unknown",
        "category":  "Usable Status Moves",
        "description":  ""
    },
    {
        "id":  "tm-tailwind",
        "name":  "Tailwind",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Unknown",
        "category":  "Usable Status Moves",
        "description":  ""
    },
    {
        "id":  "tm-recycle",
        "name":  "Recycle",
        "tier":  "Level 1",
        "level":  1,
        "price":  1000,
        "type":  "Unknown",
        "category":  "Usable Status Moves",
        "description":  ""
    },
    {
        "id":  "tm-grassy-terrain",
        "name":  "Grassy Terrain",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Unknown",
        "category":  "Usable Status Moves",
        "description":  ""
    },
    {
        "id":  "tm-misty-terrain",
        "name":  "Misty Terrain",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Unknown",
        "category":  "Usable Status Moves",
        "description":  ""
    },
    {
        "id":  "tm-electric-terrain",
        "name":  "Electric Terrain",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Unknown",
        "category":  "Usable Status Moves",
        "description":  ""
    },
    {
        "id":  "tm-psychic-terrain",
        "name":  "Psychic Terrain",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Unknown",
        "category":  "Usable Status Moves",
        "description":  ""
    },
    {
        "id":  "tm-grass-whistle",
        "name":  "Grass Whistle",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Unknown",
        "category":  "Usable Status Moves",
        "description":  ""
    },
    {
        "id":  "tm-sing",
        "name":  "Sing",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Unknown",
        "category":  "Usable Status Moves",
        "description":  ""
    },
    {
        "id":  "tm-block",
        "name":  "Block",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Unknown",
        "category":  "Usable Status Moves",
        "description":  ""
    },
    {
        "id":  "tm-mean-look",
        "name":  "Mean Look",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Unknown",
        "category":  "Usable Status Moves",
        "description":  ""
    },
    {
        "id":  "tm-laser-focus",
        "name":  "Laser Focus",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Unknown",
        "category":  "Usable Status Moves",
        "description":  ""
    },
    {
        "id":  "tm-magic-coat",
        "name":  "Magic Coat",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Unknown",
        "category":  "Usable Status Moves",
        "description":  ""
    },
    {
        "id":  "tm-refresh",
        "name":  "Refresh",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Unknown",
        "category":  "Usable Status Moves",
        "description":  ""
    },
    {
        "id":  "tm-me-first",
        "name":  "Me First",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Unknown",
        "category":  "Usable Status Moves",
        "description":  ""
    },
    {
        "id":  "tm-mirror-move",
        "name":  "Mirror Move",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Unknown",
        "category":  "Usable Status Moves",
        "description":  ""
    },
    {
        "id":  "tm-copycat",
        "name":  "Copycat",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Unknown",
        "category":  "Usable Status Moves",
        "description":  ""
    },
    {
        "id":  "tm-reflect-type",
        "name":  "Reflect Type",
        "tier":  "Level 1",
        "level":  1,
        "price":  1000,
        "type":  "Unknown",
        "category":  "Usable Status Moves",
        "description":  ""
    },
    {
        "id":  "tm-assist",
        "name":  "Assist",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Unknown",
        "category":  "Usable Status Moves",
        "description":  ""
    },
    {
        "id":  "tm-poison-powder",
        "name":  "Poison Powder",
        "tier":  "Level 1",
        "level":  1,
        "price":  750,
        "type":  "Unknown",
        "category":  "Usable Status Moves",
        "description":  ""
    },
    {
        "id":  "tm-heal-block",
        "name":  "Heal Block",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Unknown",
        "category":  "Usable Status Moves",
        "description":  ""
    },
    {
        "id":  "tm-soak",
        "name":  "Soak",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Unknown",
        "category":  "Usable Status Moves",
        "description":  ""
    },
    {
        "id":  "tm-stuff-cheeks",
        "name":  "Stuff Cheeks",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Unknown",
        "category":  "Usable Status Moves",
        "description":  ""
    },
    {
        "id":  "tm-corrosive-gas",
        "name":  "Corrosive Gas",
        "tier":  "Level 1",
        "level":  1,
        "price":  500,
        "type":  "Unknown",
        "category":  "Usable Status Moves",
        "description":  ""
    },
    {
        "id":  "tm-supersonic",
        "name":  "Supersonic",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Unknown",
        "category":  "Pretty Shit Status Moves",
        "description":  ""
    },
    {
        "id":  "tm-swagger",
        "name":  "Swagger",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Unknown",
        "category":  "Pretty Shit Status Moves",
        "description":  ""
    },
    {
        "id":  "tm-confuse-ray",
        "name":  "Confuse Ray",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Unknown",
        "category":  "Pretty Shit Status Moves",
        "description":  ""
    },
    {
        "id":  "tm-power-swap",
        "name":  "Power Swap",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Unknown",
        "category":  "Pretty Shit Status Moves",
        "description":  ""
    },
    {
        "id":  "tm-guard-swap",
        "name":  "Guard Swap",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Unknown",
        "category":  "Pretty Shit Status Moves",
        "description":  ""
    },
    {
        "id":  "tm-speed-swap",
        "name":  "Speed Swap",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Unknown",
        "category":  "Pretty Shit Status Moves",
        "description":  ""
    },
    {
        "id":  "tm-power-split",
        "name":  "Power Split",
        "tier":  "Level 1",
        "level":  1,
        "price":  250,
        "type":  "Unknown",
        "category":  "Pretty Shit Status Moves",
        "description":  ""
    },
    {
        "id":  "tm-sweet-kiss",
        "name":  "Sweet Kiss",
        "tier":  "Level 2",
        "level":  2,
        "price":  1500,
        "type":  "Fairy",
        "category":  "Status",
        "description":  "Confuses the target."
    },
    {
        "id":  "tm-yawn",
        "name":  "Yawn",
        "tier":  "Level 2",
        "level":  2,
        "price":  1500,
        "type":  "Normal",
        "category":  "Status",
        "description":  "Puts the target to sleep at the end of the next turn."
    },
    {
        "id":  "tm-destiny-bond",
        "name":  "Destiny Bond",
        "tier":  "Level 2",
        "level":  2,
        "price":  2000,
        "type":  "Ghost",
        "category":  "Status",
        "description":  "If the user faints before its next move, the Pokemon that fainted it also faints."
    },
    {
        "id":  "tm-dizzy-punch",
        "name":  "Dizzy Punch",
        "tier":  "Level 2",
        "level":  2,
        "price":  1250,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-stomp",
        "name":  "Stomp",
        "tier":  "Level 2",
        "level":  2,
        "price":  1500,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-nature-power",
        "name":  "Nature Power",
        "tier":  "Level 2",
        "level":  2,
        "price":  1500,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-super-fang",
        "name":  "Super Fang",
        "tier":  "Level 2",
        "level":  2,
        "price":  1750,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-headbutt",
        "name":  "Headbutt",
        "tier":  "Level 2",
        "level":  2,
        "price":  1750,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-crush-claw",
        "name":  "Crush Claw",
        "tier":  "Level 2",
        "level":  2,
        "price":  2000,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-strength",
        "name":  "Strength",
        "tier":  "Level 2",
        "level":  2,
        "price":  2000,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-wring-out",
        "name":  "Wring Out",
        "tier":  "Level 2",
        "level":  2,
        "price":  2000,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-rock-climb",
        "name":  "Rock Climb",
        "tier":  "Level 2",
        "level":  2,
        "price":  2250,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-uproar",
        "name":  "Uproar",
        "tier":  "Level 2",
        "level":  2,
        "price":  2250,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-crabhammer",
        "name":  "Crabhammer",
        "tier":  "Level 2",
        "level":  2,
        "price":  1250,
        "type":  "Water",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-dive",
        "name":  "Dive",
        "tier":  "Level 2",
        "level":  2,
        "price":  1500,
        "type":  "Water",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-water-pledge",
        "name":  "Water Pledge",
        "tier":  "Level 2",
        "level":  2,
        "price":  2000,
        "type":  "Water",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-flame-burst",
        "name":  "Flame Burst",
        "tier":  "Level 2",
        "level":  2,
        "price":  1500,
        "type":  "Fire",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-burning-jealousy",
        "name":  "Burning Jealousy",
        "tier":  "Level 2",
        "level":  2,
        "price":  1750,
        "type":  "Fire",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-temper-flare",
        "name":  "Temper Flare",
        "tier":  "Level 2",
        "level":  2,
        "price":  1750,
        "type":  "Fire",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-fire-fang",
        "name":  "Fire Fang",
        "tier":  "Level 2",
        "level":  2,
        "price":  1750,
        "type":  "Fire",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-fire-pledge",
        "name":  "Fire Pledge",
        "tier":  "Level 2",
        "level":  2,
        "price":  2000,
        "type":  "Fire",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-grass-pledge",
        "name":  "Grass Pledge",
        "tier":  "Level 2",
        "level":  2,
        "price":  2000,
        "type":  "Grass",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-wood-hammer",
        "name":  "Wood Hammer",
        "tier":  "Level 2",
        "level":  2,
        "price":  2000,
        "type":  "Grass",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-electroweb",
        "name":  "Electroweb",
        "tier":  "Level 2",
        "level":  2,
        "price":  1500,
        "type":  "Electric",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-electro-ball",
        "name":  "Electro Ball",
        "tier":  "Level 2",
        "level":  2,
        "price":  1750,
        "type":  "Electric",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-thunder-fang",
        "name":  "Thunder Fang",
        "tier":  "Level 2",
        "level":  2,
        "price":  1750,
        "type":  "Electric",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-parabolic-charge",
        "name":  "Parabolic Charge",
        "tier":  "Level 2",
        "level":  2,
        "price":  1750,
        "type":  "Electric",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-zap-cannon",
        "name":  "Zap Cannon",
        "tier":  "Level 2",
        "level":  2,
        "price":  2000,
        "type":  "Electric",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-nuzzle",
        "name":  "Nuzzle",
        "tier":  "Level 2",
        "level":  2,
        "price":  2000,
        "type":  "Electric",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-wake-up-slap",
        "name":  "Wake Up Slap",
        "tier":  "Level 2",
        "level":  2,
        "price":  1500,
        "type":  "Fighting",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-low-sweep",
        "name":  "Low Sweep",
        "tier":  "Level 2",
        "level":  2,
        "price":  1500,
        "type":  "Fighting",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-force-palm",
        "name":  "Force Palm",
        "tier":  "Level 2",
        "level":  2,
        "price":  1500,
        "type":  "Fighting",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-final-gambit",
        "name":  "Final Gambit",
        "tier":  "Level 2",
        "level":  2,
        "price":  2000,
        "type":  "Fighting",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-dynamic-punch",
        "name":  "Dynamic Punch",
        "tier":  "Level 2",
        "level":  2,
        "price":  2000,
        "type":  "Fighting",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-sky-drop",
        "name":  "Sky Drop",
        "tier":  "Level 2",
        "level":  2,
        "price":  1500,
        "type":  "Flying",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-sky-attack",
        "name":  "Sky Attack",
        "tier":  "Level 2",
        "level":  2,
        "price":  1500,
        "type":  "Flying",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-silver-wind",
        "name":  "Silver Wind",
        "tier":  "Level 2",
        "level":  2,
        "price":  1250,
        "type":  "Bug",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-fell-stinger",
        "name":  "Fell Stinger",
        "tier":  "Level 2",
        "level":  2,
        "price":  1750,
        "type":  "Bug",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-bug-bite",
        "name":  "Bug Bite",
        "tier":  "Level 2",
        "level":  2,
        "price":  1750,
        "type":  "Bug",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-metal-burst",
        "name":  "Metal Burst",
        "tier":  "Level 2",
        "level":  2,
        "price":  1750,
        "type":  "Steel",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-steel-wing",
        "name":  "Steel Wing",
        "tier":  "Level 2",
        "level":  2,
        "price":  1750,
        "type":  "Steel",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-hard-press",
        "name":  "Hard Press",
        "tier":  "Level 2",
        "level":  2,
        "price":  2000,
        "type":  "Steel",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-magnitude",
        "name":  "Magnitude",
        "tier":  "Level 2",
        "level":  2,
        "price":  1500,
        "type":  "Ground",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-dig",
        "name":  "Dig",
        "tier":  "Level 2",
        "level":  2,
        "price":  1500,
        "type":  "Ground",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-bulldoze",
        "name":  "Bulldoze",
        "tier":  "Level 2",
        "level":  2,
        "price":  1500,
        "type":  "Ground",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-ancient-power",
        "name":  "Ancient Power",
        "tier":  "Level 2",
        "level":  2,
        "price":  1250,
        "type":  "Rock",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-rock-tomb",
        "name":  "Rock Tomb",
        "tier":  "Level 2",
        "level":  2,
        "price":  1500,
        "type":  "Rock",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-psybeam",
        "name":  "Psybeam",
        "tier":  "Level 2",
        "level":  2,
        "price":  1250,
        "type":  "Psychic",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-bite",
        "name":  "Bite",
        "tier":  "Level 2",
        "level":  2,
        "price":  1500,
        "type":  "Dark",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-snarl",
        "name":  "Snarl",
        "tier":  "Level 2",
        "level":  2,
        "price":  1500,
        "type":  "Dark",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-punishment",
        "name":  "Punishment",
        "tier":  "Level 2",
        "level":  2,
        "price":  1500,
        "type":  "Dark",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-sludge",
        "name":  "Sludge",
        "tier":  "Level 2",
        "level":  2,
        "price":  1500,
        "type":  "Poison",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-belch",
        "name":  "Belch",
        "tier":  "Level 2",
        "level":  2,
        "price":  1750,
        "type":  "Poison",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-poison-fang",
        "name":  "Poison Fang",
        "tier":  "Level 2",
        "level":  2,
        "price":  1750,
        "type":  "Poison",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-barb-barrage",
        "name":  "Barb Barrage",
        "tier":  "Level 2",
        "level":  2,
        "price":  2000,
        "type":  "Poison",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-aurora-beam",
        "name":  "Aurora Beam",
        "tier":  "Level 2",
        "level":  2,
        "price":  1250,
        "type":  "Ice",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-icy-wind",
        "name":  "Icy Wind",
        "tier":  "Level 2",
        "level":  2,
        "price":  1500,
        "type":  "Ice",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-ice-fang",
        "name":  "Ice Fang",
        "tier":  "Level 2",
        "level":  2,
        "price":  1750,
        "type":  "Ice",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-ominous-wind",
        "name":  "Ominous Wind",
        "tier":  "Level 2",
        "level":  2,
        "price":  1250,
        "type":  "Ghost",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-shadow-punch",
        "name":  "Shadow Punch",
        "tier":  "Level 2",
        "level":  2,
        "price":  1500,
        "type":  "Ghost",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-happy-hour",
        "name":  "Happy Hour",
        "tier":  "Level 2",
        "level":  2,
        "price":  1250,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-celebrate",
        "name":  "Celebrate",
        "tier":  "Level 2",
        "level":  2,
        "price":  1250,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-hold-hands",
        "name":  "Hold Hands",
        "tier":  "Level 2",
        "level":  2,
        "price":  1250,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-cotton-guard",
        "name":  "Cotton Guard",
        "tier":  "Level 2",
        "level":  2,
        "price":  1250,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-stockpile",
        "name":  "Stockpile",
        "tier":  "Level 2",
        "level":  2,
        "price":  1500,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-minimize",
        "name":  "Minimize",
        "tier":  "Level 2",
        "level":  2,
        "price":  1500,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-double-team",
        "name":  "Double Team",
        "tier":  "Level 2",
        "level":  2,
        "price":  1500,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-tidy-up",
        "name":  "Tidy Up",
        "tier":  "Level 2",
        "level":  2,
        "price":  2000,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-mimic",
        "name":  "Mimic",
        "tier":  "Level 2",
        "level":  2,
        "price":  1000,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-spiky-shield",
        "name":  "Spiky Shield",
        "tier":  "Level 2",
        "level":  2,
        "price":  1250,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-mind-reader",
        "name":  "Mind Reader",
        "tier":  "Level 2",
        "level":  2,
        "price":  1250,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-lock-on",
        "name":  "Lock On",
        "tier":  "Level 2",
        "level":  2,
        "price":  1250,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-sleep-talk",
        "name":  "Sleep Talk",
        "tier":  "Level 2",
        "level":  2,
        "price":  1250,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-ingrain",
        "name":  "Ingrain",
        "tier":  "Level 2",
        "level":  2,
        "price":  1500,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-aqua-ring",
        "name":  "Aqua Ring",
        "tier":  "Level 2",
        "level":  2,
        "price":  1500,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-magnet-rise",
        "name":  "Magnet Rise",
        "tier":  "Level 2",
        "level":  2,
        "price":  1500,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-endure",
        "name":  "Endure",
        "tier":  "Level 2",
        "level":  2,
        "price":  1500,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-disable",
        "name":  "Disable",
        "tier":  "Level 2",
        "level":  2,
        "price":  1500,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-focus-energy",
        "name":  "Focus Energy",
        "tier":  "Level 2",
        "level":  2,
        "price":  1500,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-psycho-shift",
        "name":  "Psycho Shift",
        "tier":  "Level 2",
        "level":  2,
        "price":  1500,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-hypnosis",
        "name":  "Hypnosis",
        "tier":  "Level 2",
        "level":  2,
        "price":  1500,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-lovely-kiss",
        "name":  "Lovely Kiss",
        "tier":  "Level 2",
        "level":  2,
        "price":  1500,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-accupressure",
        "name":  "Acupressure",
        "tier":  "Level 2",
        "level":  2,
        "price":  1500,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-stun-spore",
        "name":  "Stun Spore",
        "tier":  "Level 2",
        "level":  2,
        "price":  1500,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-sleep-powder",
        "name":  "Sleep Powder",
        "tier":  "Level 2",
        "level":  2,
        "price":  1500,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-pain-split",
        "name":  "Pain Split",
        "tier":  "Level 2",
        "level":  2,
        "price":  2000,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-ice-shard",
        "name":  "Ice Shard",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Ice",
        "category":  "Physical",
        "description":  "Usually moves first."
    },
    {
        "id":  "tm-terrain-pulse",
        "name":  "Terrain Pulse",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-mega-kick",
        "name":  "Mega Kick",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-hyper-beam",
        "name":  "Hyper Beam",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-endeavor",
        "name":  "Endeavor",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-quick-attack",
        "name":  "Quick Attack",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-giga-impact",
        "name":  "Giga Impact",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-last-resort",
        "name":  "Last Resort",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-tail-slap",
        "name":  "Tail Slap",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-fake-out",
        "name":  "Fake Out",
        "tier":  "Level 3",
        "level":  3,
        "price":  3000,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-rapid-spin",
        "name":  "Rapid Spin",
        "tier":  "Level 3",
        "level":  3,
        "price":  3000,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-brine",
        "name":  "Brine",
        "tier":  "Level 3",
        "level":  3,
        "price":  2250,
        "type":  "Water",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-razor-shell",
        "name":  "Razor Shell",
        "tier":  "Level 3",
        "level":  3,
        "price":  2250,
        "type":  "Water",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-hydro-cannon",
        "name":  "Hydro Cannon",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Water",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-aqua-jet",
        "name":  "Aqua Jet",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Water",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-aqua-cutter",
        "name":  "Aqua Cutter",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Water",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-sparkling-aria",
        "name":  "Sparkling Aria",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Water",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-muddy-water",
        "name":  "Muddy Water",
        "tier":  "Level 3",
        "level":  3,
        "price":  3000,
        "type":  "Water",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-flame-charge",
        "name":  "Flame Charge",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Fire",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-fire-punch",
        "name":  "Fire Punch",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Fire",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-blast-burn",
        "name":  "Blast Burn",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Fire",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-blaze-kick",
        "name":  "Blaze Kick",
        "tier":  "Level 3",
        "level":  3,
        "price":  2750,
        "type":  "Fire",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-burn-up",
        "name":  "Burn Up",
        "tier":  "Level 3",
        "level":  3,
        "price":  2750,
        "type":  "Fire",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-heat-crash",
        "name":  "Heat Crash",
        "tier":  "Level 3",
        "level":  3,
        "price":  3250,
        "type":  "Fire",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-frenzy-plant",
        "name":  "Frenzy Plant",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Grass",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-trailblaze",
        "name":  "Trailblaze",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Grass",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-grassy-glide",
        "name":  "Grassy Glide",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Grass",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-bullet-seed",
        "name":  "Bullet Seed",
        "tier":  "Level 3",
        "level":  3,
        "price":  2750,
        "type":  "Grass",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-seed-bomb",
        "name":  "Seed Bomb",
        "tier":  "Level 3",
        "level":  3,
        "price":  3000,
        "type":  "Grass",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-solar-blade",
        "name":  "Solar Blade",
        "tier":  "Level 3",
        "level":  3,
        "price":  3000,
        "type":  "Grass",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-petal-blizzard",
        "name":  "Petal Blizzard",
        "tier":  "Level 3",
        "level":  3,
        "price":  3500,
        "type":  "Grass",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-solar-beam",
        "name":  "Solar Beam",
        "tier":  "Level 3",
        "level":  3,
        "price":  3500,
        "type":  "Grass",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-charge-beam",
        "name":  "Charge Beam",
        "tier":  "Level 3",
        "level":  3,
        "price":  2250,
        "type":  "Electric",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-thunder-punch",
        "name":  "Thunder Punch",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Electric",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-wild-charge",
        "name":  "Wild Charge",
        "tier":  "Level 3",
        "level":  3,
        "price":  2750,
        "type":  "Electric",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-sky-uppercut",
        "name":  "Sky Uppercut",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Fighting",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-vacuum-wave",
        "name":  "Vacuum Wave",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Fighting",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-brick-break",
        "name":  "Brick Break",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Fighting",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-focus-punch",
        "name":  "Focus Punch",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Fighting",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-mach-punch",
        "name":  "Mach Punch",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Fighting",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-sacred-sword",
        "name":  "Sacred Sword",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Fighting",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-cross-chop",
        "name":  "Cross Chop",
        "tier":  "Level 3",
        "level":  3,
        "price":  2750,
        "type":  "Fighting",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-revenge",
        "name":  "Revenge",
        "tier":  "Level 3",
        "level":  3,
        "price":  2750,
        "type":  "Fighting",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-circle-throw",
        "name":  "Circle Throw",
        "tier":  "Level 3",
        "level":  3,
        "price":  3000,
        "type":  "Fighting",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-reversal",
        "name":  "Reversal",
        "tier":  "Level 3",
        "level":  3,
        "price":  3000,
        "type":  "Fighting",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-counter",
        "name":  "Counter",
        "tier":  "Level 3",
        "level":  3,
        "price":  3000,
        "type":  "Fighting",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-power-up-punch",
        "name":  "Power-Up Punch",
        "tier":  "Level 3",
        "level":  3,
        "price":  3000,
        "type":  "Fighting",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-bounce",
        "name":  "Bounce",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Flying",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-fly",
        "name":  "Fly",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Flying",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-drill-peck",
        "name":  "Drill Peck",
        "tier":  "Level 3",
        "level":  3,
        "price":  2750,
        "type":  "Flying",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-air-slash",
        "name":  "Air Slash",
        "tier":  "Level 3",
        "level":  3,
        "price":  3250,
        "type":  "Flying",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-infestation",
        "name":  "Infestation",
        "tier":  "Level 3",
        "level":  3,
        "price":  2000,
        "type":  "Bug",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-skitter-smack",
        "name":  "Skitter Smack",
        "tier":  "Level 3",
        "level":  3,
        "price":  2250,
        "type":  "Bug",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-pin-missile",
        "name":  "Pin Missile",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Bug",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-signal-beam",
        "name":  "Signal Beam",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Bug",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-iron-tail",
        "name":  "Iron Tail",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Steel",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-bullet-punch",
        "name":  "Bullet Punch",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Steel",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-smart-strike",
        "name":  "Smart Strike",
        "tier":  "Level 3",
        "level":  3,
        "price":  2750,
        "type":  "Steel",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-gyro-ball",
        "name":  "Gyro Ball",
        "tier":  "Level 3",
        "level":  3,
        "price":  3250,
        "type":  "Steel",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-drill-run",
        "name":  "Drill Run",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Ground",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-stomping-tantrum",
        "name":  "Stomping Tantrum",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Ground",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-scorching-sands",
        "name":  "Scorching Sands",
        "tier":  "Level 3",
        "level":  3,
        "price":  3000,
        "type":  "Ground",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-smack-down",
        "name":  "Smack Down",
        "tier":  "Level 3",
        "level":  3,
        "price":  2000,
        "type":  "Rock",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-rock-blast",
        "name":  "Rock Blast",
        "tier":  "Level 3",
        "level":  3,
        "price":  2750,
        "type":  "Rock",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-future-sight",
        "name":  "Future Sight",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Psychic",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-psycho-cut",
        "name":  "Psycho Cut",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Psychic",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-heart-stamp",
        "name":  "Heart Stamp",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Psychic",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-extrasensory",
        "name":  "Extrasensory",
        "tier":  "Level 3",
        "level":  3,
        "price":  2750,
        "type":  "Psychic",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-mirror-coat",
        "name":  "Mirror Coat",
        "tier":  "Level 3",
        "level":  3,
        "price":  3000,
        "type":  "Psychic",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-night-slash",
        "name":  "Night Slash",
        "tier":  "Level 3",
        "level":  3,
        "price":  2250,
        "type":  "Dark",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-lash-out",
        "name":  "Lash Out",
        "tier":  "Level 3",
        "level":  3,
        "price":  2250,
        "type":  "Dark",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-power-trip",
        "name":  "Power Trip",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Dark",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-payback",
        "name":  "Payback",
        "tier":  "Level 3",
        "level":  3,
        "price":  2750,
        "type":  "Dark",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-assurance",
        "name":  "Assurance",
        "tier":  "Level 3",
        "level":  3,
        "price":  3000,
        "type":  "Dark",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-venoshock",
        "name":  "Venoshock",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Poison",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-cross-poison",
        "name":  "Cross Poison",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Poison",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-acid-spray",
        "name":  "Acid Spray",
        "tier":  "Level 3",
        "level":  3,
        "price":  2750,
        "type":  "Poison",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-clear-smog",
        "name":  "Clear Smog",
        "tier":  "Level 3",
        "level":  3,
        "price":  2750,
        "type":  "Poison",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-avalanche",
        "name":  "Avalanche",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Ice",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-sheer-cold",
        "name":  "Sheer Cold",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Ice",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-ice-punch",
        "name":  "Ice Punch",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Ice",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-ice-hammer",
        "name":  "Ice Hammer",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Ice",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-icicle-spear",
        "name":  "Icicle Spear",
        "tier":  "Level 3",
        "level":  3,
        "price":  2750,
        "type":  "Ice",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-phantom-force",
        "name":  "Phantom Force",
        "tier":  "Level 3",
        "level":  3,
        "price":  2250,
        "type":  "Ghost",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-shadow-claw",
        "name":  "Shadow Claw",
        "tier":  "Level 3",
        "level":  3,
        "price":  2250,
        "type":  "Ghost",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-shadow-sneak",
        "name":  "Shadow Sneak",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Ghost",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-roar-of-time",
        "name":  "Roar Of Time",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Dragon",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-dual-chop",
        "name":  "Dual Chop",
        "tier":  "Level 3",
        "level":  3,
        "price":  3000,
        "type":  "Dragon",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-dragon-rush",
        "name":  "Dragon Rush",
        "tier":  "Level 3",
        "level":  3,
        "price":  3000,
        "type":  "Dragon",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-dragon-tail",
        "name":  "Dragon Tail",
        "tier":  "Level 3",
        "level":  3,
        "price":  3000,
        "type":  "Dragon",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-dragon-cheer",
        "name":  "Dragon Cheer",
        "tier":  "Level 3",
        "level":  3,
        "price":  4000,
        "type":  "Dragon",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-growth",
        "name":  "Growth",
        "tier":  "Level 3",
        "level":  3,
        "price":  2000,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-work-up",
        "name":  "Work Up",
        "tier":  "Level 3",
        "level":  3,
        "price":  2000,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-hone-claws",
        "name":  "Hone Claws",
        "tier":  "Level 3",
        "level":  3,
        "price":  2000,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-meditate",
        "name":  "Meditate",
        "tier":  "Level 3",
        "level":  3,
        "price":  2000,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-howl",
        "name":  "Howl",
        "tier":  "Level 3",
        "level":  3,
        "price":  2000,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-rock-polish",
        "name":  "Rock Polish",
        "tier":  "Level 3",
        "level":  3,
        "price":  2000,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-agility",
        "name":  "Agility",
        "tier":  "Level 3",
        "level":  3,
        "price":  2000,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-autotomize",
        "name":  "Autotomize",
        "tier":  "Level 3",
        "level":  3,
        "price":  2000,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-quiver-dance",
        "name":  "Quiver Dance",
        "tier":  "Level 3",
        "level":  3,
        "price":  2000,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-coil",
        "name":  "Coil",
        "tier":  "Level 3",
        "level":  3,
        "price":  2000,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-iron-defense",
        "name":  "Iron Defense",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-acid-armor",
        "name":  "Acid Armor",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-barrier",
        "name":  "Barrier",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-curse",
        "name":  "Curse",
        "tier":  "Level 3",
        "level":  3,
        "price":  2750,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-switcheroo",
        "name":  "Switcheroo",
        "tier":  "Level 3",
        "level":  3,
        "price":  2000,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-parting-shot",
        "name":  "Parting Shot",
        "tier":  "Level 3",
        "level":  3,
        "price":  2000,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-reflect",
        "name":  "Reflect",
        "tier":  "Level 3",
        "level":  3,
        "price":  2000,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-light-screen",
        "name":  "Light Screen",
        "tier":  "Level 3",
        "level":  3,
        "price":  2000,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-trick",
        "name":  "Trick",
        "tier":  "Level 3",
        "level":  3,
        "price":  2000,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-rest",
        "name":  "Rest",
        "tier":  "Level 3",
        "level":  3,
        "price":  2250,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-sunny-day",
        "name":  "Sunny Day",
        "tier":  "Level 3",
        "level":  3,
        "price":  2250,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-rain-dance",
        "name":  "Rain Dance",
        "tier":  "Level 3",
        "level":  3,
        "price":  2250,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-sandstorm",
        "name":  "Sandstorm",
        "tier":  "Level 3",
        "level":  3,
        "price":  2250,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-snowscape",
        "name":  "Snowscape",
        "tier":  "Level 3",
        "level":  3,
        "price":  2250,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-heal-bell",
        "name":  "Heal Bell",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-aromatherapy",
        "name":  "Aromatherapy",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-whirlwind",
        "name":  "Whirlwind",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-roar",
        "name":  "Roar",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-haze",
        "name":  "Haze",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-memento",
        "name":  "Memento",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-healing-wish",
        "name":  "Healing Wish",
        "tier":  "Level 3",
        "level":  3,
        "price":  2500,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-defog",
        "name":  "Defog",
        "tier":  "Level 3",
        "level":  3,
        "price":  3000,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-leech-seed",
        "name":  "Leech Seed",
        "tier":  "Level 3",
        "level":  3,
        "price":  3000,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-explosion",
        "name":  "Explosion",
        "tier":  "Level 4",
        "level":  4,
        "price":  3500,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-thrash",
        "name":  "Thrash",
        "tier":  "Level 4",
        "level":  4,
        "price":  3750,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-horn-drill",
        "name":  "Horn Drill",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-body-slam",
        "name":  "Body Slam",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-tri-attack",
        "name":  "Tri Attack",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-double-edge",
        "name":  "Double-Edge",
        "tier":  "Level 4",
        "level":  4,
        "price":  4250,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-weatherball",
        "name":  "Weatherball",
        "tier":  "Level 4",
        "level":  4,
        "price":  4500,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-aqua-tail",
        "name":  "Aqua Tail",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Water",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-waterfall",
        "name":  "Waterfall",
        "tier":  "Level 4",
        "level":  4,
        "price":  4250,
        "type":  "Water",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-liquidation",
        "name":  "Liquidation",
        "tier":  "Level 4",
        "level":  4,
        "price":  4500,
        "type":  "Water",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-raging-fury",
        "name":  "Raging Fury",
        "tier":  "Level 4",
        "level":  4,
        "price":  3250,
        "type":  "Fire",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-mystical-fire",
        "name":  "Mystical Fire",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Fire",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-heat-wave",
        "name":  "Heat Wave",
        "tier":  "Level 4",
        "level":  4,
        "price":  4500,
        "type":  "Fire",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-grass-knot",
        "name":  "Grass Knot",
        "tier":  "Level 4",
        "level":  4,
        "price":  3500,
        "type":  "Grass",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-leaf-blade",
        "name":  "Leaf Blade",
        "tier":  "Level 4",
        "level":  4,
        "price":  3500,
        "type":  "Grass",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-petal-dance",
        "name":  "Petal Dance",
        "tier":  "Level 4",
        "level":  4,
        "price":  3750,
        "type":  "Grass",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-rising-voltage",
        "name":  "Rising Voltage",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Electric",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-discharge",
        "name":  "Discharge",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Electric",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-supercell-slam",
        "name":  "Supercell Slam",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Electric",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-low-kick",
        "name":  "Low Kick",
        "tier":  "Level 4",
        "level":  4,
        "price":  3500,
        "type":  "Fighting",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-aura-sphere",
        "name":  "Aura Sphere",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Fighting",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-hammer-arm",
        "name":  "Hammer Arm",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Fighting",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-seismic-toss",
        "name":  "Seismic Toss",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Fighting",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-drain-punch",
        "name":  "Drain Punch",
        "tier":  "Level 4",
        "level":  4,
        "price":  4250,
        "type":  "Fighting",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-focus-blast",
        "name":  "Focus Blast",
        "tier":  "Level 4",
        "level":  4,
        "price":  4500,
        "type":  "Fighting",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-dual-wingbeat",
        "name":  "Dual Wingbeat",
        "tier":  "Level 4",
        "level":  4,
        "price":  3500,
        "type":  "Flying",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-x-scissor",
        "name":  "X-Scissor",
        "tier":  "Level 4",
        "level":  4,
        "price":  3250,
        "type":  "Bug",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-first-impression",
        "name":  "First Impression",
        "tier":  "Level 4",
        "level":  4,
        "price":  3500,
        "type":  "Bug",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-leech-life",
        "name":  "Leech Life",
        "tier":  "Level 4",
        "level":  4,
        "price":  3500,
        "type":  "Bug",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-lunge",
        "name":  "Lunge",
        "tier":  "Level 4",
        "level":  4,
        "price":  3500,
        "type":  "Bug",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-megahorn",
        "name":  "Megahorn",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Bug",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-heavy-slam",
        "name":  "Heavy Slam",
        "tier":  "Level 4",
        "level":  4,
        "price":  4250,
        "type":  "Steel",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-flash-cannon",
        "name":  "Flash Cannon",
        "tier":  "Level 4",
        "level":  4,
        "price":  4500,
        "type":  "Steel",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-steel-beam",
        "name":  "Steel Beam",
        "tier":  "Level 4",
        "level":  4,
        "price":  4750,
        "type":  "Steel",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-fissure",
        "name":  "Fissure",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Ground",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-high-horsepower",
        "name":  "High Horsepower",
        "tier":  "Level 4",
        "level":  4,
        "price":  5000,
        "type":  "Ground",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-rock-slide",
        "name":  "Rock Slide",
        "tier":  "Level 4",
        "level":  4,
        "price":  3500,
        "type":  "Rock",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-power-gem",
        "name":  "Power Gem",
        "tier":  "Level 4",
        "level":  4,
        "price":  3500,
        "type":  "Rock",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-head-smash",
        "name":  "Head Smash",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Rock",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-psychic-noise",
        "name":  "Psychic Noise",
        "tier":  "Level 4",
        "level":  4,
        "price":  3500,
        "type":  "Psychic",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-expanding-force",
        "name":  "Expanding Force",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Psychic",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-zen-headbutt",
        "name":  "Zen Headbutt",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Psychic",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-psychic-fangs",
        "name":  "Psychic Fangs",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Psychic",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-stored-power",
        "name":  "Stored Power",
        "tier":  "Level 4",
        "level":  4,
        "price":  4250,
        "type":  "Psychic",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-crunch",
        "name":  "Crunch",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Dark",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-throat-chop",
        "name":  "Throat Chop",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Dark",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-darkest-lariat",
        "name":  "Darkest Lariat",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Dark",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-pursuit",
        "name":  "Pursuit",
        "tier":  "Level 4",
        "level":  4,
        "price":  4250,
        "type":  "Dark",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-foul-play",
        "name":  "Foul Play",
        "tier":  "Level 4",
        "level":  4,
        "price":  4500,
        "type":  "Dark",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-poison-jab",
        "name":  "Poison Jab",
        "tier":  "Level 4",
        "level":  4,
        "price":  4500,
        "type":  "Poison",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-freeze-dry",
        "name":  "Freeze Dry",
        "tier":  "Level 4",
        "level":  4,
        "price":  3250,
        "type":  "Ice",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-ice-spinner",
        "name":  "Ice Spinner",
        "tier":  "Level 4",
        "level":  4,
        "price":  3750,
        "type":  "Ice",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-icicle-crash",
        "name":  "Icicle Crash",
        "tier":  "Level 4",
        "level":  4,
        "price":  3750,
        "type":  "Ice",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-frost-breath",
        "name":  "Frost Breath",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Ice",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-hex",
        "name":  "Hex",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Ghost",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-night-shade",
        "name":  "Night Shade",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Ghost",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-spacial-rend",
        "name":  "Spacial Rend",
        "tier":  "Level 4",
        "level":  4,
        "price":  3500,
        "type":  "Dragon",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-dragon-claw",
        "name":  "Dragon Claw",
        "tier":  "Level 4",
        "level":  4,
        "price":  3750,
        "type":  "Dragon",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-dragon-pulse",
        "name":  "Dragon Pulse",
        "tier":  "Level 4",
        "level":  4,
        "price":  3750,
        "type":  "Dragon",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-scale-shot",
        "name":  "Scale Shot",
        "tier":  "Level 4",
        "level":  4,
        "price":  4250,
        "type":  "Dragon",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-moonblast",
        "name":  "Moonblast",
        "tier":  "Level 4",
        "level":  4,
        "price":  3750,
        "type":  "Fairy",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-dazzling-gleam",
        "name":  "Dazzling Gleam",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Fairy",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-alluring-voice",
        "name":  "Alluring Voice",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Fairy",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-draining-kiss",
        "name":  "Draining Kiss",
        "tier":  "Level 4",
        "level":  4,
        "price":  4250,
        "type":  "Fairy",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-belly-drum",
        "name":  "Belly Drum",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-cosmic-power",
        "name":  "Cosmic Power",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-shell-smash",
        "name":  "Shell Smash",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-shift-gear",
        "name":  "Shift Gear",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-detect",
        "name":  "Detect",
        "tier":  "Level 4",
        "level":  4,
        "price":  3000,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-protect",
        "name":  "Protect",
        "tier":  "Level 4",
        "level":  4,
        "price":  3500,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-taunt",
        "name":  "Taunt",
        "tier":  "Level 4",
        "level":  4,
        "price":  3500,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-trick-room",
        "name":  "Trick Room",
        "tier":  "Level 4",
        "level":  4,
        "price":  3500,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-perish-song",
        "name":  "Perish Song",
        "tier":  "Level 4",
        "level":  4,
        "price":  3500,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-baton-pass",
        "name":  "Baton Pass",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-glare",
        "name":  "Glare",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-substitute",
        "name":  "Substitute",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-encore",
        "name":  "Encore",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-softboiled",
        "name":  "SoftBoiled",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-roost",
        "name":  "Roost",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-recover",
        "name":  "Recover",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Normal",
        "category":  "Status",
        "description":  "Restores half of the user's maximum HP."
    },
    {
        "id":  "tm-synthesis",
        "name":  "Synthesis",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-wish",
        "name":  "Wish",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-morning-sun",
        "name":  "Morning Sun",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-moonlight",
        "name":  "Moonlight",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-slack-off",
        "name":  "Slack Off",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-strength-sap",
        "name":  "Strength Sap",
        "tier":  "Level 4",
        "level":  4,
        "price":  4000,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-extreme-speed",
        "name":  "Extreme Speed",
        "tier":  "Level 5",
        "level":  5,
        "price":  5000,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-hyper-voice",
        "name":  "Hyper Voice",
        "tier":  "Level 5",
        "level":  5,
        "price":  5000,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-boomburst",
        "name":  "Boomburst",
        "tier":  "Level 5",
        "level":  5,
        "price":  5000,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-hidden-power",
        "name":  "Hidden Power",
        "tier":  "Level 5",
        "level":  5,
        "price":  5500,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-tera-blast",
        "name":  "Tera Blast",
        "tier":  "Level 5",
        "level":  5,
        "price":  5500,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-facade",
        "name":  "Facade",
        "tier":  "Level 5",
        "level":  5,
        "price":  5500,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-frustration",
        "name":  "Frustration",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-return",
        "name":  "Return",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Normal",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-surf",
        "name":  "Surf",
        "tier":  "Level 5",
        "level":  5,
        "price":  5500,
        "type":  "Water",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-scald",
        "name":  "Scald",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Water",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-hydro-pump",
        "name":  "Hydro Pump",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Water",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-water-spout",
        "name":  "Water Spout",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Water",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-flip-turn",
        "name":  "Flip Turn",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Water",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-flare-blitz",
        "name":  "Flare Blitz",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Fire",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-overheat",
        "name":  "Overheat",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Fire",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-fire-blast",
        "name":  "Fire Blast",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Fire",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-flamethrower",
        "name":  "Flamethrower",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Fire",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-eruption",
        "name":  "Eruption",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Fire",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-giga-drain",
        "name":  "Giga Drain",
        "tier":  "Level 5",
        "level":  5,
        "price":  5500,
        "type":  "Grass",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-energy-ball",
        "name":  "Energy Ball",
        "tier":  "Level 5",
        "level":  5,
        "price":  5500,
        "type":  "Grass",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-leaf-storm",
        "name":  "Leaf Storm",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Grass",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-power-whip",
        "name":  "Power Whip",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Grass",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-thunder",
        "name":  "Thunder",
        "tier":  "Level 5",
        "level":  5,
        "price":  5000,
        "type":  "Electric",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-thunderbolt",
        "name":  "Thunderbolt",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Electric",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-volt-switch",
        "name":  "Volt Switch",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Electric",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-superpower",
        "name":  "Superpower",
        "tier":  "Level 5",
        "level":  5,
        "price":  5000,
        "type":  "Fighting",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-body-press",
        "name":  "Body Press",
        "tier":  "Level 5",
        "level":  5,
        "price":  5500,
        "type":  "Fighting",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-close-combat",
        "name":  "Close Combat",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Fighting",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-high-jump-kick",
        "name":  "High Jump Kick",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Fighting",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-hurricane",
        "name":  "Hurricane",
        "tier":  "Level 5",
        "level":  5,
        "price":  5500,
        "type":  "Flying",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-acrobatics",
        "name":  "Acrobatics",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Flying",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-brave-bird",
        "name":  "Brave Bird",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Flying",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-pollen-puff",
        "name":  "Pollen Puff",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Bug",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-bug-buzz",
        "name":  "Bug Buzz",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Bug",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-u-turn",
        "name":  "U-Turn",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Bug",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-iron-head",
        "name":  "Iron Head",
        "tier":  "Level 5",
        "level":  5,
        "price":  5000,
        "type":  "Steel",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-earthquake",
        "name":  "Earthquake",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Ground",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-earth-power",
        "name":  "Earth Power",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Ground",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-stone-edge",
        "name":  "Stone Edge",
        "tier":  "Level 5",
        "level":  5,
        "price":  5500,
        "type":  "Rock",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-meteor-beam",
        "name":  "Meteor Beam",
        "tier":  "Level 5",
        "level":  5,
        "price":  5500,
        "type":  "Rock",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-psychic",
        "name":  "Psychic",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Psychic",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-psyshock",
        "name":  "Psyshock",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Psychic",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-dark-pulse",
        "name":  "Dark Pulse",
        "tier":  "Level 5",
        "level":  5,
        "price":  5000,
        "type":  "Dark",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-knock-off",
        "name":  "Knock Off",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Dark",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-sucker-punch",
        "name":  "Sucker Punch",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Dark",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-gunk-shot",
        "name":  "Gunk Shot",
        "tier":  "Level 5",
        "level":  5,
        "price":  5500,
        "type":  "Poison",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-sludge-bomb",
        "name":  "Sludge Bomb",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Poison",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-sludge-wave",
        "name":  "Sludge Wave",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Poison",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-blizzard",
        "name":  "Blizzard",
        "tier":  "Level 5",
        "level":  5,
        "price":  5000,
        "type":  "Ice",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-ice-beam",
        "name":  "Ice Beam",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Ice",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-triple-axel",
        "name":  "Triple Axel",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Ice",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-shadow-ball",
        "name":  "Shadow Ball",
        "tier":  "Level 5",
        "level":  5,
        "price":  5000,
        "type":  "Ghost",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-poltergeist",
        "name":  "Poltergeist",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Ghost",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-outrage",
        "name":  "Outrage",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Dragon",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-draco-meteor",
        "name":  "Draco Meteor",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Dragon",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-play-rough",
        "name":  "Play Rough",
        "tier":  "Level 5",
        "level":  5,
        "price":  5500,
        "type":  "Fairy",
        "category":  "Move",
        "description":  ""
    },
    {
        "id":  "tm-swords-dance",
        "name":  "Swords Dance",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-calm-mind",
        "name":  "Calm Mind",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-bulk-up",
        "name":  "Bulk Up",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-dragon-dance",
        "name":  "Dragon Dance",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-nasty-plot",
        "name":  "Nasty Plot",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Unknown",
        "category":  "Stat Changes",
        "description":  ""
    },
    {
        "id":  "tm-aurora-veil",
        "name":  "Aurora Veil",
        "tier":  "Level 5",
        "level":  5,
        "price":  5000,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-toxic",
        "name":  "Toxic",
        "tier":  "Level 5",
        "level":  5,
        "price":  5000,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-thunder-wave",
        "name":  "Thunder Wave",
        "tier":  "Level 5",
        "level":  5,
        "price":  5000,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-will-o-wisp",
        "name":  "Will-o-Wisp",
        "tier":  "Level 5",
        "level":  5,
        "price":  5000,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-stealth-rock",
        "name":  "Stealth Rock",
        "tier":  "Level 5",
        "level":  5,
        "price":  5500,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-spikes",
        "name":  "Spikes",
        "tier":  "Level 5",
        "level":  5,
        "price":  5500,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-toxic-spikes",
        "name":  "Toxic Spikes",
        "tier":  "Level 5",
        "level":  5,
        "price":  5500,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-sticky-web",
        "name":  "Sticky Web",
        "tier":  "Level 5",
        "level":  5,
        "price":  5500,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id":  "tm-teleport",
        "name":  "Teleport",
        "tier":  "Level 5",
        "level":  5,
        "price":  6000,
        "type":  "Unknown",
        "category":  "Status",
        "description":  ""
    },
    {
        "id": "tm-magic-room",
        "name": "Magic Room",
        "tier": "Level 1",
        "level": 1,
        "price": 250,
        "type": "Psychic",
        "category": "Status",
        "description": ""
    },
    {
        "id": "tm-spite",
        "name": "Spite",
        "tier": "Level 1",
        "level": 1,
        "price": 250,
        "type": "Ghost",
        "category": "Status",
        "description": ""
    },
    {
        "id": "tm-guard-split",
        "name": "Guard Split",
        "tier": "Level 1",
        "level": 1,
        "price": 250,
        "type": "Psychic",
        "category": "Status",
        "description": ""
    },
    {
        "id": "tm-power-trick",
        "name": "Power Trick",
        "tier": "Level 1",
        "level": 1,
        "price": 250,
        "type": "Psychic",
        "category": "Status",
        "description": ""
    },
    {
        "id": "tm-metronome",
        "name": "Metronome",
        "tier": "Level 1",
        "level": 1,
        "price": 250,
        "type": "Normal",
        "category": "Status",
        "description": ""
    },
    {
        "id": "tm-attract",
        "name": "Attract",
        "tier": "Level 1",
        "level": 1,
        "price": 250,
        "type": "Normal",
        "category": "Status",
        "description": ""
    },
    {
        "id": "tm-torment",
        "name": "Torment",
        "tier": "Level 1",
        "level": 1,
        "price": 250,
        "type": "Dark",
        "category": "Status",
        "description": ""
    },
    {
        "id": "tm-nightmare",
        "name": "Nightmare",
        "tier": "Level 1",
        "level": 1,
        "price": 250,
        "type": "Ghost",
        "category": "Status",
        "description": ""
    },
    {
        "id": "tm-skill-swap",
        "name": "Skill Swap",
        "tier": "Level 1",
        "level": 1,
        "price": 250,
        "type": "Psychic",
        "category": "Status",
        "description": ""
    },
    {
        "id": "tm-snatch",
        "name": "Snatch",
        "tier": "Level 1",
        "level": 1,
        "price": 250,
        "type": "Dark",
        "category": "Status",
        "description": ""
    },
    {
        "id": "tm-safeguard",
        "name": "Safeguard",
        "tier": "Level 1",
        "level": 1,
        "price": 250,
        "type": "Normal",
        "category": "Status",
        "description": ""
    },
    {
        "id": "tm-telekinesis",
        "name": "Telekinesis",
        "tier": "Level 1",
        "level": 1,
        "price": 250,
        "type": "Psychic",
        "category": "Status",
        "description": ""
    },
    {
        "id": "tm-imprison",
        "name": "Imprison",
        "tier": "Level 1",
        "level": 1,
        "price": 250,
        "type": "Psychic",
        "category": "Status",
        "description": ""
    },
    {
        "id": "tm-role-play",
        "name": "Role Play",
        "tier": "Level 1",
        "level": 1,
        "price": 250,
        "type": "Psychic",
        "category": "Status",
        "description": ""
    },
    {
        "id": "tm-gastro-acid",
        "name": "Gastro Acid",
        "tier": "Level 1",
        "level": 1,
        "price": 250,
        "type": "Poison",
        "category": "Status",
        "description": ""
    },
    {
        "id": "tm-worry-seed",
        "name": "Worry Seed",
        "tier": "Level 1",
        "level": 1,
        "price": 250,
        "type": "Grass",
        "category": "Status",
        "description": ""
    },
    {
        "id": "tm-foresight",
        "name": "Foresight",
        "tier": "Level 1",
        "level": 1,
        "price": 250,
        "type": "Normal",
        "category": "Status",
        "description": ""
    },
    {
        "id": "tm-mist",
        "name": "Mist",
        "tier": "Level 1",
        "level": 1,
        "price": 250,
        "type": "Ice",
        "category": "Status",
        "description": ""
    },
    {
        "id": "tm-mud-sport",
        "name": "Mud Sport",
        "tier": "Level 1",
        "level": 1,
        "price": 250,
        "type": "Ground",
        "category": "Status",
        "description": ""
    },
    {
        "id": "tm-bestow",
        "name": "Bestow",
        "tier": "Level 1",
        "level": 1,
        "price": 250,
        "type": "Normal",
        "category": "Status",
        "description": ""
    },
    {
        "id": "tm-lucky-chant",
        "name": "Lucky Chant",
        "tier": "Level 1",
        "level": 1,
        "price": 250,
        "type": "Normal",
        "category": "Status",
        "description": ""
    },
    {
        "id": "tm-heal-pulse",
        "name": "Heal Pulse",
        "tier": "Level 1",
        "level": 1,
        "price": 250,
        "type": "Psychic",
        "category": "Status",
        "description": ""
    },
    {
        "id": "tm-flatter",
        "name": "Flatter",
        "tier": "Level 1",
        "level": 1,
        "price": 250,
        "type": "Dark",
        "category": "Status",
        "description": ""
    },
    {
        "id": "tm-odor-sleuth",
        "name": "Odor Sleuth",
        "tier": "Level 1",
        "level": 1,
        "price": 250,
        "type": "Normal",
        "category": "Status",
        "description": ""
    },
    {
        "id": "tm-simple-beam",
        "name": "Simple Beam",
        "tier": "Level 1",
        "level": 1,
        "price": 250,
        "type": "Normal",
        "category": "Status",
        "description": ""
    },
    {
        "id": "tm-ion-deluge",
        "name": "Ion Deluge",
        "tier": "Level 1",
        "level": 1,
        "price": 250,
        "type": "Electric",
        "category": "Status",
        "description": ""
    },
    {
        "id": "tm-water-sport",
        "name": "Water Sport",
        "tier": "Level 1",
        "level": 1,
        "price": 250,
        "type": "Water",
        "category": "Status",
        "description": ""
    },
    {
        "id": "tm-wonder-room",
        "name": "Wonder Room",
        "tier": "Level 1",
        "level": 1,
        "price": 250,
        "type": "Psychic",
        "category": "Status",
        "description": ""
    },
    {
        "id": "tm-entrainment",
        "name": "Entrainment",
        "tier": "Level 1",
        "level": 1,
        "price": 250,
        "type": "Normal",
        "category": "Status",
        "description": ""
    },
    {
        "id": "tm-spit-up",
        "name": "Spit Up",
        "tier": "Level 1",
        "level": 1,
        "price": 250,
        "type": "Normal",
        "category": "Special",
        "description": ""
    },
    {
        "id": "tm-swallow",
        "name": "Swallow",
        "tier": "Level 1",
        "level": 1,
        "price": 250,
        "type": "Normal",
        "category": "Status",
        "description": ""
    },
    {
        "id": "tm-grudge",
        "name": "Grudge",
        "tier": "Level 1",
        "level": 1,
        "price": 250,
        "type": "Ghost",
        "category": "Status",
        "description": ""
    },
    {
        "id": "tm-miracle-eye",
        "name": "Miracle Eye",
        "tier": "Level 1",
        "level": 1,
        "price": 250,
        "type": "Psychic",
        "category": "Status",
        "description": ""
    },
    {
        "id": "tm-crafty-shield",
        "name": "Crafty Shield",
        "tier": "Level 1",
        "level": 1,
        "price": 250,
        "type": "Fairy",
        "category": "Status",
        "description": ""
    },
    {
        "id": "tm-powder",
        "name": "Powder",
        "tier": "Level 1",
        "level": 1,
        "price": 250,
        "type": "Bug",
        "category": "Status",
        "description": ""
    },
    {
        "id": "tm-camouflage",
        "name": "Camouflage",
        "tier": "Level 1",
        "level": 1,
        "price": 250,
        "type": "Normal",
        "category": "Status",
        "description": ""
    }
];

const tmShopData = rawTmShopData.filter((entry) => !rivalSagaUnpurchasableMoveKeys.has(
  String(entry.name || "").toLowerCase().replace(/[^a-z0-9]+/g, "")
));

if (typeof window !== "undefined") {
  window.rivalSagaShopData = { itemShopData, tmShopData, rawTmShopData, itemShopMetadataById };
}

if (typeof module !== "undefined") {
  module.exports = { itemShopData, tmShopData, rawTmShopData, itemShopMetadataById };
}


