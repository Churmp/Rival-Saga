(function exposeShowdownMoveUsefulness(root, factory) {
  const api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root) root.rivalSagaShowdownMoveUsefulness = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function createShowdownMoveUsefulness() {
  "use strict";

  // Synced from Pokemon Showdown's BattleMoveSearch guidance on 2026-07-21.
  // Source: https://github.com/smogon/pokemon-showdown-client/blob/master/play.pokemonshowdown.com/src/battle-dex-search.ts
  const usefulStatusMoves = new Set([
    "acidarmor", "agility", "aromatherapy", "auroraveil", "autotomize", "banefulbunker", "batonpass",
    "bellydrum", "bulkup", "burningbulwark", "calmmind", "chillyreception", "clangoroussoul", "coil",
    "cottonguard", "courtchange", "curse", "defog", "destinybond", "detect", "disable", "dragondance",
    "encore", "extremeevoboost", "filletaway", "geomancy", "glare", "haze", "healbell", "healingwish",
    "healorder", "heartswap", "honeclaws", "kingsshield", "leechseed", "lightscreen", "lovelykiss",
    "lunardance", "magiccoat", "maxguard", "memento", "milkdrink", "moonlight", "morningsun",
    "nastyplot", "naturesmadness", "noretreat", "obstruct", "painsplit", "partingshot", "perishsong",
    "protect", "quiverdance", "recover", "reflect", "reflecttype", "rest", "revivalblessing", "roar",
    "rockpolish", "roost", "shedtail", "shellsmash", "shiftgear", "shoreup", "silktrap", "slackoff",
    "sleeppowder", "sleeptalk", "softboiled", "spikes", "spikyshield", "spore", "stealthrock",
    "stickyweb", "strengthsap", "substitute", "switcheroo", "swordsdance", "synthesis", "tailglow",
    "tailwind", "taunt", "thunderwave", "tidyup", "toxic", "transform", "trick", "victorydance",
    "whirlwind", "willowisp", "wish", "yawn"
  ]);

  const usefulWeakMoves = new Set([
    "accelerock", "acrobatics", "aquacutter", "avalanche", "barbbarrage", "bonemerang", "bouncybubble",
    "bulletpunch", "buzzybuzz", "ceaselessedge", "circlethrow", "clearsmog", "doubleironbash",
    "dragondarts", "dragontail", "drainingkiss", "endeavor", "facade", "firefang", "flipturn",
    "flowertrick", "freezedry", "frustration", "geargrind", "gigadrain", "grassknot", "gyroball",
    "icefang", "iceshard", "iciclespear", "infernalparade", "knockoff", "lastrespects", "lowkick",
    "machpunch", "mortalspin", "mysticalpower", "naturesmadness", "nightshade", "nuzzle", "pikapapow",
    "populationbomb", "psychocut", "psyshieldbash", "pursuit", "quickattack", "ragefist", "rapidspin",
    "return", "rockblast", "ruination", "saltcure", "scorchingsands", "seismictoss", "shadowclaw",
    "shadowsneak", "sizzlyslide", "stoneaxe", "storedpower", "stormthrow", "suckerpunch", "superfang",
    "surgingstrikes", "tachyoncutter", "tailslap", "thunderclap", "tripleaxel", "tripledive", "twinbeam",
    "uturn", "vacuumwave", "veeveevolley", "voltswitch", "watershuriken", "weatherball"
  ]);

  const usuallyUselessStrongMoves = new Set([
    "belch", "burnup", "crushclaw", "dragonrush", "dreameater", "eggbomb", "firepledge", "flyingpress",
    "futuresight", "grasspledge", "hyperbeam", "hyperfang", "hyperspacehole", "jawlock", "landswrath",
    "megakick", "megapunch", "mistyexplosion", "muddywater", "nightdaze", "pollenpuff", "rockclimb",
    "selfdestruct", "shelltrap", "skyuppercut", "slam", "strength", "submission", "synchronoise",
    "takedown", "thrash", "uproar", "waterpledge"
  ]);

  function key(value) {
    return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
  }

  function includesAny(values, candidates) {
    return candidates.some((candidate) => values.has(candidate));
  }

  function classify(options = {}) {
    const move = options.move || {};
    const id = key(move.showdownId || move.name);
    if (!id) return "useful";

    const species = options.species || {};
    const moveIds = new Set((options.moveNames || []).map(key).filter(Boolean));
    const selectedMoves = (options.selectedMoves || []).map(key).filter(Boolean);
    let ability = key(options.ability);
    const item = key(options.item);
    const types = new Set((species.types || []).map(key));
    const baseSpecies = key(species.baseSpecies || species.name);
    const speciesId = key(species.id || species.name);
    const baseStats = species.baseStats || {};
    const flags = new Set(move.showdownFlags || []);
    const power = Number(move.power || 0);
    const category = String(move.category || "");

    if (item === "pidgeotite") ability = "noguard";
    if (item === "blastoisinite") ability = "megalauncher";
    if (item === "aerodactylite") ability = "toughclaws";
    if (item === "glalitite") ability = "refrigerate";

    switch (id) {
      case "fakeout":
      case "flamecharge":
      case "nuzzle":
      case "poweruppunch":
      case "trailblaze":
        return ability === "sheerforce" ? "usually-useless" : "useful";
      case "solarbeam":
      case "solarblade":
        return includesAny(new Set([ability]), ["desolateland", "drought", "chlorophyll", "orichalcumpulse"])
          || item === "powerherb" ? "useful" : "usually-useless";
      case "dynamicpunch":
      case "grasswhistle":
      case "inferno":
      case "sing":
        return ability === "noguard" ? "useful" : "usually-useless";
      case "heatcrash":
      case "heavyslam": {
        const minimumWeight = species.hasEvolutions ? 75 : 130;
        return Number(species.weightKg || 0) >= minimumWeight ? "useful" : "usually-useless";
      }
      case "aerialace":
        return ["technician", "toughclaws"].includes(ability) && !moveIds.has("bravebird") ? "useful" : "usually-useless";
      case "ancientpower":
        return ["serenegrace", "technician"].includes(ability) || !moveIds.has("powergem") ? "useful" : "usually-useless";
      case "aquajet": return moveIds.has("jetpunch") ? "usually-useless" : "useful";
      case "aurawheel": return baseSpecies === "morpeko" ? "useful" : "usually-useless";
      case "axekick": return moveIds.has("highjumpkick") ? "usually-useless" : "useful";
      case "barrier": return moveIds.has("acidarmor") ? "usually-useless" : "useful";
      case "bellydrum":
        return includesAny(moveIds, ["aquajet", "jetpunch", "extremespeed"]) || ["iceface", "unburden"].includes(ability)
          ? "useful" : "usually-useless";
      case "bulletseed": return ["skilllink", "technician"].includes(ability) ? "useful" : "usually-useless";
      case "chillingwater": return moveIds.has("scald") ? "usually-useless" : "useful";
      case "counter":
      case "mirrorcoat": return Number(baseStats.hp || 0) >= 65 ? "useful" : "usually-useless";
      case "dazzlinggleam": return moveIds.has("alluringvoice") ? "usually-useless" : "useful";
      case "darkvoid": return "usually-useless";
      case "dualwingbeat": return ability === "technician" || !moveIds.has("drillpeck") ? "useful" : "usually-useless";
      case "electroshot": return "useful";
      case "feint": return ability === "refrigerate" ? "useful" : "usually-useless";
      case "futuresight": return "useful";
      case "grassyglide": return ability === "grassysurge" ? "useful" : "usually-useless";
      case "gyroball": return Number(baseStats.spe || 0) <= 60 ? "useful" : "usually-useless";
      case "headbutt": return ability === "serenegrace" ? "useful" : "usually-useless";
      case "hex": return moveIds.has("infernalparade") ? "usually-useless" : "useful";
      case "hiddenpowerelectric": return moveIds.has("thunderbolt") ? "usually-useless" : "useful";
      case "hiddenpowerfighting":
        return includesAny(moveIds, ["aurasphere", "focusblast"]) ? "usually-useless" : "useful";
      case "hiddenpowerfire":
        return includesAny(moveIds, ["flamethrower", "mysticalfire", "burningjealousy", "incinerate"])
          ? "usually-useless" : "useful";
      case "hiddenpowergrass":
        return includesAny(moveIds, ["energyball", "grassknot", "gigadrain"]) ? "usually-useless" : "useful";
      case "hiddenpowerice":
        return includesAny(moveIds, ["icebeam", "aurorabeam", "glaciate"]) ? "usually-useless" : "useful";
      case "hiddenpowerflying": return "usually-useless";
      case "hiddenpowerbug": return "usually-useless";
      case "hiddenpowerpsychic": return baseSpecies === "unown" ? "useful" : "usually-useless";
      case "hyperspacefury": return speciesId === "hoopaunbound" ? "useful" : "usually-useless";
      case "hypnosis": return ability === "baddreams" ? "useful" : "usually-useless";
      case "icepunch":
        return !moveIds.has("icespinner") || ["sheerforce", "ironfist"].includes(ability) || item === "punchingglove"
          ? "useful" : "usually-useless";
      case "iciclecrash": return moveIds.has("mountaingale") ? "usually-useless" : "useful";
      case "iciclespear": return "useful";
      case "icywind": return baseSpecies === "keldeo" ? "useful" : "usually-useless";
      case "incinerate":
        return includesAny(moveIds, ["flamethrower", "mysticalfire", "burningjealousy"]) ? "usually-useless" : "useful";
      case "infestation": return moveIds.has("stickyweb") ? "useful" : "usually-useless";
      case "irondefense": return includesAny(moveIds, ["acidarmor", "barrier"]) ? "usually-useless" : "useful";
      case "irontail": return includesAny(moveIds, ["ironhead", "gunkshot", "poisonjab"]) ? "usually-useless" : "useful";
      case "jumpkick": return includesAny(moveIds, ["highjumpkick", "axekick"]) ? "usually-useless" : "useful";
      case "lastresort": return selectedMoves.length < 3 ? "useful" : "usually-useless";
      case "leafblade":
      case "meteorbeam": return "useful";
      case "leechlife":
      case "magiccoat": return "useful";
      case "mysticalfire": return moveIds.has("flamethrower") ? "usually-useless" : "useful";
      case "naturepower":
      case "needlearm": return "usually-useless";
      case "nightslash": return moveIds.has("crunch") || moveIds.has("knockoff") ? "usually-useless" : "useful";
      case "outrage": return moveIds.has("glaiverush") ? "usually-useless" : "useful";
      case "petaldance": return ability === "owntempo" ? "useful" : "usually-useless";
      case "phantomforce": return includesAny(moveIds, ["poltergeist", "shadowclaw"]) ? "usually-useless" : "useful";
      case "poisonfang":
        return types.has("poison") && !includesAny(moveIds, ["gunkshot", "poisonjab"]) ? "useful" : "usually-useless";
      case "raindance": return "usually-useless";
      case "relicsong": return speciesId === "meloetta" ? "useful" : "usually-useless";
      case "refresh": return includesAny(moveIds, ["aromatherapy", "healbell"]) ? "usually-useless" : "useful";
      case "risingvoltage": return ["electricsurge", "hadronengine"].includes(ability) ? "useful" : "usually-useless";
      case "rocktomb": return ability === "technician" ? "useful" : "usually-useless";
      case "selfdestruct": return "usually-useless";
      case "shadowpunch": return ability === "ironfist" && !moveIds.has("ragefist") ? "useful" : "usually-useless";
      case "shelter": return includesAny(moveIds, ["acidarmor", "irondefense"]) ? "usually-useless" : "useful";
      case "skyuppercut": return "usually-useless";
      case "smackdown": return types.has("ground") ? "useful" : "usually-useless";
      case "smartstrike": return types.has("steel") && !moveIds.has("ironhead") ? "useful" : "usually-useless";
      case "soak": return ability === "unaware" ? "useful" : "usually-useless";
      case "steelwing": return moveIds.has("ironhead") ? "usually-useless" : "useful";
      case "stompingtantrum": return includesAny(moveIds, ["earthquake", "drillrun"]) ? "usually-useless" : "useful";
      case "stunspore": return moveIds.has("thunderwave") ? "usually-useless" : "useful";
      case "sunnyday": return "usually-useless";
      case "technoblast": return item.endsWith("drive") || item === "dousedrive" ? "useful" : "usually-useless";
      case "teleport": return "useful";
      case "temperflare":
        return includesAny(moveIds, ["flareblitz", "pyroball", "sacredfire", "bitterblade", "firepunch"])
          ? "usually-useless" : "useful";
      case "terrainpulse":
      case "waterpulse":
        return ["megalauncher", "technician"].includes(ability) && !moveIds.has("originpulse") ? "useful" : "usually-useless";
      case "thief": return "usually-useless";
      case "toxicspikes": return ability === "toxicdebris" ? "usually-useless" : "useful";
      case "triattack": return "useful";
      case "trickroom": return Number(baseStats.spe || 0) <= 100 ? "useful" : "usually-useless";
      case "wildcharge": return moveIds.has("supercellslam") ? "usually-useless" : "useful";
      case "zapcannon": return ability === "noguard" ? "useful" : "usually-useless";
    }

    if ((move.showdownStatus === "slp" || id === "yawn")) return "usually-useless";
    if (category === "Status") return usefulStatusMoves.has(id) ? "useful" : "usually-useless";
    if (power < 75) {
      return usefulWeakMoves.has(id) || (ability === "technician" && power === 60) ? "useful" : "usually-useless";
    }
    if (id === "skydrop") return "useful";
    if (flags.has("charge")) return item === "powerherb" ? "useful" : "usually-useless";
    if (flags.has("recharge")) return "usually-useless";
    if (flags.has("slicing") && ability === "sharpness") return "useful";
    return usuallyUselessStrongMoves.has(id) ? "usually-useless" : "useful";
  }

  return Object.freeze({
    classify,
    labels: Object.freeze({
      useful: "Useful",
      "usually-useless": "Usually Useless"
    }),
    source: "Pokemon Showdown BattleMoveSearch",
    syncedOn: "2026-07-21"
  });
});
