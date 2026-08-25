const path = require("node:path");

const rootDir = path.resolve(__dirname, "..");
const { itemShopData } = require(path.join(rootDir, "shop-data.js"));

const STANDARD_Z_CRYSTAL_PRICE = 7500;

const supportedSpeciesSpecificZCrystals = Object.freeze([
  { name: "Aloraichium Z", pokemonSpecies: ["Raichu-Alola", "Alolan Raichu"] },
  { name: "Decidium Z", pokemonSpecies: ["Decidueye"] },
  { name: "Eevium Z", pokemonSpecies: ["Eevee"] },
  { name: "Incinium Z", pokemonSpecies: ["Incineroar"] },
  { name: "Kommonium Z", pokemonSpecies: ["Kommo-o"] },
  { name: "Lunalium Z", pokemonSpecies: ["Lunala", "Necrozma-Dawn-Wings"] },
  { name: "Lycanium Z", pokemonSpecies: ["Lycanroc"] },
  { name: "Marshadium Z", pokemonSpecies: ["Marshadow"] },
  { name: "Mewnium Z", pokemonSpecies: ["Mew"] },
  { name: "Mimikium Z", pokemonSpecies: ["Mimikyu"] },
  { name: "Pikanium Z", pokemonSpecies: ["Pikachu"] },
  { name: "Pikashunium Z", pokemonSpecies: ["Pikachu-Cap"] },
  { name: "Primarium Z", pokemonSpecies: ["Primarina"] },
  { name: "Snorlium Z", pokemonSpecies: ["Snorlax"] },
  { name: "Solganium Z", pokemonSpecies: ["Solgaleo", "Necrozma-Dusk-Mane"] },
  { name: "Tapunium Z", pokemonSpecies: ["Tapu Koko", "Tapu Lele", "Tapu Bulu", "Tapu Fini"] },
  { name: "Ultranecrozium Z", pokemonSpecies: ["Necrozma"] }
]);

function auditItemShopZCatalog(products = itemShopData) {
  const byName = new Map((products || []).map((product) => [product.name, product]));
  const speciesSpecific = supportedSpeciesSpecificZCrystals.map((definition) => {
    const product = byName.get(definition.name) || null;
    const price = Number(product?.price || 0);
    const priced = Boolean(product && price > 0);
    const correctPrice = priced && price === STANDARD_Z_CRYSTAL_PRICE;
    return {
      ...definition,
      present: Boolean(product),
      priced,
      correctPrice,
      price: priced ? price : null,
      mechanicFamily: product?.mechanicFamily || "",
      eligibility: product?.eligibility || null,
      recommendOnOwnership: product?.recommendOnOwnership === true
    };
  });
  return {
    speciesSpecific,
    missing: speciesSpecific.filter((entry) => !entry.present),
    unpriced: speciesSpecific.filter((entry) => !entry.priced),
    mispriced: speciesSpecific.filter((entry) => entry.present && entry.priced && !entry.correctPrice)
  };
}

function formatZCatalogAuditMarkdown(audit = auditItemShopZCatalog()) {
  const lines = [
    "# Item Shop Z-Crystal Price Audit",
    "",
    "All supported species-specific Z-Crystals use the standard $7,500 Rival Saga Z-Crystal mechanic price.",
    "",
    "| Crystal | Species metadata | Catalog status | Price status |",
    "| --- | --- | --- | --- |"
  ];
  audit.speciesSpecific.forEach((entry) => {
    const priceStatus = !entry.priced
      ? "Unpriced"
      : entry.correctPrice
        ? "$7,500"
        : `$${entry.price.toLocaleString("en-US")} (expected $7,500)`;
    lines.push(`| ${entry.name} | ${entry.pokemonSpecies.join(", ")} | ${entry.present ? "Present" : "Missing"} | ${priceStatus} |`);
  });
  return `${lines.join("\n")}\n`;
}

if (require.main === module) {
  const audit = auditItemShopZCatalog();
  process.stdout.write(formatZCatalogAuditMarkdown(audit));
  if (process.argv.includes("--check") && audit.missing.length) process.exitCode = 1;
  if (process.argv.includes("--check") && audit.unpriced.length) process.exitCode = 1;
  if (process.argv.includes("--check") && audit.mispriced.length) process.exitCode = 1;
}

module.exports = {
  STANDARD_Z_CRYSTAL_PRICE,
  supportedSpeciesSpecificZCrystals,
  auditItemShopZCatalog,
  formatZCatalogAuditMarkdown
};
