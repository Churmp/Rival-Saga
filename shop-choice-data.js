var shopChoicePokemonTypes = Object.freeze([
  "Normal", "Fire", "Water", "Electric", "Grass", "Ice",
  "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug",
  "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy"
]);

const shopChoicePlateNames = Object.freeze({
  Normal: "Blank Plate",
  Fire: "Flame Plate",
  Water: "Splash Plate",
  Electric: "Zap Plate",
  Grass: "Meadow Plate",
  Ice: "Icicle Plate",
  Fighting: "Fist Plate",
  Poison: "Toxic Plate",
  Ground: "Earth Plate",
  Flying: "Sky Plate",
  Psychic: "Mind Plate",
  Bug: "Insect Plate",
  Rock: "Stone Plate",
  Ghost: "Spooky Plate",
  Dragon: "Draco Plate",
  Dark: "Dread Plate",
  Steel: "Iron Plate",
  Fairy: "Pixie Plate"
});

const shopChoiceBoostingItemNames = Object.freeze({
  Normal: "Silk Scarf",
  Fire: "Charcoal",
  Water: "Mystic Water",
  Electric: "Magnet",
  Grass: "Miracle Seed",
  Ice: "Never-Melt Ice",
  Fighting: "Black Belt",
  Poison: "Poison Barb",
  Ground: "Soft Sand",
  Flying: "Sharp Beak",
  Psychic: "Twisted Spoon",
  Bug: "Silver Powder",
  Rock: "Hard Stone",
  Ghost: "Spell Tag",
  Dragon: "Dragon Fang",
  Dark: "Black Glasses",
  Steel: "Metal Coat",
  Fairy: "Fairy Feather"
});

const simpleBerryOptions = Object.freeze([
  "Cheri Berry", "Chesto Berry", "Pecha Berry", "Rawst Berry", "Aspear Berry", "Persim Berry", "Leppa Berry", "Oran Berry",
  "Ganlon Berry", "Apicot Berry", "Lansat Berry", "Starf Berry", "Micle Berry", "Kee Berry", "Maranga Berry"
]);

const typeResistBerryOptions = Object.freeze([
  "Occa Berry", "Passho Berry", "Wacan Berry", "Rindo Berry", "Yache Berry", "Chople Berry", "Kebia Berry", "Shuca Berry", "Coba Berry",
  "Payapa Berry", "Tanga Berry", "Charti Berry", "Kasib Berry", "Haban Berry", "Colbur Berry", "Babiri Berry", "Chilan Berry", "Roseli Berry"
]);

const competitiveBerryOptions = Object.freeze([
  "Sitrus Berry", "Lum Berry", "Custap Berry", "Liechi Berry", "Salac Berry", "Petaya Berry"
]);

const zCrystalOptions = Object.freeze([
  "Normalium Z", "Firium Z", "Waterium Z", "Electrium Z", "Grassium Z", "Icium Z",
  "Fightinium Z", "Poisonium Z", "Groundium Z", "Flyinium Z", "Psychium Z", "Buginium Z",
  "Rockium Z", "Ghostium Z", "Dragonium Z", "Darkinium Z", "Steelium Z", "Fairium Z"
]);

const unlistedMegaStoneOptions = Object.freeze([
  "Abomasite", "Absolite", "Aerodactylite", "Aggronite", "Alakazite", "Altarianite", "Ampharosite", "Audinite",
  "Banettite", "Beedrillite", "Blazikenite", "Cameruptite", "Charizardite X", "Charizardite Y", "Diancite",
  "Galladite", "Garchompite", "Gardevoirite", "Glalitite", "Gyaradosite", "Heracronite", "Houndoominite",
  "Latiasite", "Latiosite", "Lopunnite", "Manectite", "Mawilite", "Medichamite", "Mewtwonite X", "Mewtwonite Y",
  "Pidgeotite", "Pinsirite", "Sablenite", "Sceptilite", "Scizorite", "Sharpedonite", "Slowbronite", "Steelixite",
  "Swampertite", "Tyranitarite", "Venusaurite"
]);

var staticShopChoiceDefinitions = Object.freeze({
  Berries: {
    label: "Choose Berry",
    note: "Pick one basic, status, or simple stat berry.",
    options: simpleBerryOptions
  },
  "Berries Not In PokeBall": {
    label: "Choose Berry",
    note: "Pick one basic, status, or simple stat berry.",
    options: simpleBerryOptions
  },
  "Deep Sea Tooth / Scale": {
    label: "Choose Clamperl Item",
    note: "Pick one Deep Sea item.",
    options: ["Deep Sea Tooth", "Deep Sea Scale"]
  },
  "Type Resist Berries": {
    label: "Choose Type Resist Berry",
    note: "Pick one berry that weakens a super-effective hit.",
    options: typeResistBerryOptions
  },
  "Type Resist Berry": {
    label: "Choose Type Resist Berry",
    note: "Pick one berry that weakens a super-effective hit.",
    options: typeResistBerryOptions
  },
  "Stat Change Berry": {
    label: "Choose Berry",
    note: "Pick one simple stat berry.",
    options: ["Ganlon Berry", "Apicot Berry", "Lansat Berry", "Starf Berry", "Micle Berry", "Kee Berry", "Maranga Berry"]
  },
  "Competitive Berries": {
    label: "Choose Competitive Berry",
    note: "Pick one Sitrus, Lum, Custap, or offensive stat berry.",
    options: competitiveBerryOptions
  },
  "Toxic Orb or Flame Orb": {
    label: "Choose Status Orb",
    note: "Pick one Toxic Orb or Flame Orb.",
    options: ["Toxic Orb", "Flame Orb"]
  },
  "Weather Rock": {
    label: "Choose Weather Rock",
    note: "Pick one weather-extending held item.",
    options: ["Damp Rock", "Heat Rock", "Icy Rock", "Smooth Rock"]
  },
  "Sitrus or Lum Berry": {
    label: "Choose Competitive Berry",
    note: "Pick one Sitrus, Lum, Custap, or offensive stat berry.",
    options: competitiveBerryOptions
  },
  "33% Heal Berry": {
    label: "Choose Healing Berry",
    note: "Pick one 33% healing berry.",
    options: ["Figy Berry", "Wiki Berry", "Mago Berry", "Aguav Berry", "Iapapa Berry"]
  },
  "Buy One Type Plate": {
    label: "Choose Plate",
    note: "Pick one type plate.",
    options: shopChoicePokemonTypes.map((type) => shopChoicePlateNames[type])
  },
  "Buy One Type Boosting Item": {
    label: "Choose Type Booster",
    note: "Pick one type-boosting held item.",
    options: shopChoicePokemonTypes.map((type) => shopChoiceBoostingItemNames[type])
  },
  "Type Gems": {
    label: "Choose Gem",
    note: "Pick one type gem.",
    options: shopChoicePokemonTypes.map((type) => `${type} Gem`)
  },
  "One Tera Type": {
    label: "Choose Tera Type",
    note: "Pick one Tera Type access item.",
    options: shopChoicePokemonTypes.map((type) => `${type} Tera Type`)
  },
  "One Z Move Type": {
    label: "Choose Z-Crystal",
    note: "Pick one type-based Z-Crystal.",
    options: zCrystalOptions
  },
  "One Mega Stone Not Listed": {
    label: "Choose Mega Stone",
    note: "Pick one Mega Stone not sold as its own shop entry.",
    options: unlistedMegaStoneOptions
  },
  "Genesect Drive": {
    label: "Choose Drive",
    note: "Pick one Genesect Drive.",
    options: ["Burn Drive", "Chill Drive", "Douse Drive", "Shock Drive"]
  }
});

if (typeof window !== "undefined") {
  window.rivalSagaShopChoiceData = {
    shopChoicePokemonTypes,
    staticShopChoiceDefinitions
  };
}

if (typeof module !== "undefined") {
  module.exports = {
    shopChoicePokemonTypes,
    staticShopChoiceDefinitions
  };
}
