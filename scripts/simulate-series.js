#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const rootDir = path.resolve(__dirname, "..");
const seriesNames = ["Kanto", "Johto", "Hoenn", "Sinnoh", "Unova", "Kalos", "Alola", "Galar", "Paldea"];

function readWorkspaceFile(fileName) {
  return fs.readFileSync(path.join(rootDir, fileName), "utf8");
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/pok[eé]/g, "poke")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseArgs(argv) {
  const options = {
    series: 2,
    players: 6,
    seed: "rival-beta",
    startingBalance: 30000,
    json: false,
    verbose: false,
    report: true,
    reportDir: path.join("data", "simulations")
  };
  for (let index = 2; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];
    if (arg === "--series" && next) {
      options.series = Math.max(1, Math.min(seriesNames.length, Number(next) || options.series));
      index += 1;
    } else if (arg === "--players" && next) {
      options.players = Math.max(2, Math.min(12, Number(next) || options.players));
      index += 1;
    } else if (arg === "--seed" && next) {
      options.seed = next;
      index += 1;
    } else if (arg === "--starting-balance" && next) {
      options.startingBalance = Math.max(0, Number(next) || options.startingBalance);
      index += 1;
    } else if (arg === "--json") {
      options.json = true;
    } else if (arg === "--verbose") {
      options.verbose = true;
    } else if (arg === "--no-report") {
      options.report = false;
    } else if (arg === "--report-dir" && next) {
      options.reportDir = next;
      index += 1;
    } else if (arg === "--help" || arg === "-h") {
      options.help = true;
    }
  }
  return options;
}

function printHelp() {
  console.log(`Rival Saga series simulator

Usage:
  node scripts/simulate-series.js [--series 2] [--players 6] [--seed beta] [--json] [--verbose] [--no-report]

What it does:
  - Loads real token/shop/Pokemon pool data from the workspace.
  - Creates deterministic bot players.
  - Simulates encounters, shop buys, battles, Game Corner style rewards, and token activations.
  - Fails on broken invariants such as negative balances, duplicate inventory IDs, missing token definitions, or orphaned Pokemon/status records.
  - Writes readable Markdown and JSON reports to data/simulations by default.
`);
}

function createRng(seedText) {
  let state = 2166136261;
  for (const char of String(seedText || "seed")) {
    state ^= char.charCodeAt(0);
    state = Math.imul(state, 16777619);
  }
  return function rng() {
    state += 0x6D2B79F5;
    let value = state;
    value = Math.imul(value ^ value >>> 15, value | 1);
    value ^= value + Math.imul(value ^ value >>> 7, value | 61);
    return ((value ^ value >>> 14) >>> 0) / 4294967296;
  };
}

function randomApi(seedText) {
  const rng = createRng(seedText);
  return {
    value: rng,
    chance(probability) {
      return rng() < probability;
    },
    int(min, max) {
      return Math.floor(rng() * (max - min + 1)) + min;
    },
    pick(items) {
      return items.length ? items[Math.floor(rng() * items.length)] : null;
    },
    shuffle(items) {
      const copy = [...items];
      for (let index = copy.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(rng() * (index + 1));
        [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
      }
      return copy;
    },
    weighted(items, weightFn) {
      const weightedItems = items
        .map((item) => ({ item, weight: Math.max(0, Number(weightFn(item) || 0)) }))
        .filter((entry) => entry.weight > 0);
      const total = weightedItems.reduce((sum, entry) => sum + entry.weight, 0);
      let roll = rng() * total;
      for (const entry of weightedItems) {
        roll -= entry.weight;
        if (roll <= 0) return entry.item;
      }
      return weightedItems.at(-1)?.item || null;
    }
  };
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
      if (char === "\\") {
        index += 1;
      } else if (char === quote) {
        quote = "";
      }
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
    if (char === openChar) {
      depth += 1;
    } else if (char === closeChar) {
      depth -= 1;
      if (depth === 0) return index;
    }
  }
  throw new Error(`Could not find matching ${closeChar} in source.`);
}

function extractObjectFreezeStatement(source, name) {
  const prefix = `const ${name} = Object.freeze(`;
  const start = source.indexOf(prefix);
  if (start < 0) throw new Error(`Could not find ${name} in app.js.`);
  const openIndex = start + prefix.length - 1;
  const closeIndex = findMatchingClose(source, openIndex);
  return source.slice(start, closeIndex + 2);
}

function runInSandbox(code, label) {
  const sandbox = { console };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: label });
  return sandbox;
}

function loadSourceData() {
  const appSource = readWorkspaceFile("app.js");
  const appDataCode = [
    extractObjectFreezeStatement(appSource, "TOKEN_TIMING_CATEGORIES"),
    extractObjectFreezeStatement(appSource, "EFFECT_TARGET_TYPES"),
    extractObjectFreezeStatement(appSource, "EFFECT_TARGET_SCOPES"),
    extractObjectFreezeStatement(appSource, "EFFECT_APPLICATION_SCOPES"),
    extractObjectFreezeStatement(appSource, "defaultTokenShopData"),
    extractObjectFreezeStatement(appSource, "utilityTokenDefinitions"),
    extractObjectFreezeStatement(appSource, "statusTokenDefinitions"),
    "globalThis.__rivalSagaData = { defaultTokenShopData, utilityTokenDefinitions, statusTokenDefinitions };"
  ].join("\n");
  const appData = runInSandbox(appDataCode, "app-data-sim.js").__rivalSagaData;

  const shopCode = `${readWorkspaceFile("shop-data.js")}\nglobalThis.__shopData = { itemShopData, tmShopData };`;
  const shopData = runInSandbox(shopCode, "shop-data-sim.js").__shopData;

  const balanceSandbox = runInSandbox(readWorkspaceFile("pokemon-balance-tiers.js"), "pokemon-balance-tiers-sim.js");
  const pokemonPool = (balanceSandbox.RIVAL_SAGA_BALANCE_TIER_ROWS || [])
    .filter((row) => row.displayName && Number(row.balanceTierOrder || 0) > 0);

  return {
    tokens: appData.defaultTokenShopData,
    utilityDefinitions: appData.utilityTokenDefinitions,
    statusDefinitions: appData.statusTokenDefinitions,
    items: shopData.itemShopData,
    tms: shopData.tmShopData,
    pokemonPool
  };
}

function definitionLookup(definitions) {
  const byKey = new Map();
  Object.entries(definitions).forEach(([id, definition]) => {
    byKey.set(slugify(id), { id, definition });
    (definition.names || [definition.label]).filter(Boolean).forEach((name) => {
      byKey.set(slugify(name), { id, definition });
    });
  });
  return byKey;
}

function issue(league, severity, message, context = {}) {
  const entry = {
    severity,
    message,
    series: league.series,
    gym: league.gym,
    phase: league.phase,
    context
  };
  league.issues.push(entry);
  if (severity === "error") league.errorCount += 1;
  else league.warningCount += 1;
}

function logEvent(league, type, message, context = {}) {
  league.log.push({
    index: league.log.length + 1,
    series: league.series,
    gym: league.gym,
    phase: league.phase,
    type,
    message,
    context
  });
}

function createLeague(options, data) {
  const league = {
    seed: options.seed,
    series: seriesNames[0],
    gym: 1,
    phase: "setup",
    roundIndex: 1,
    players: [],
    pokemonRecords: [],
    lingeringStatuses: [],
    log: [],
    counters: {
      battles: 0,
      purchases: 0,
      encounters: 0,
      tokensActivated: 0,
      statusesCreated: 0,
      steals: 0,
      incinerates: 0,
      classTokensSkipped: 0,
      gameCornerRewards: 0
    },
    nextPokemonId: 1,
    nextInventoryId: 1,
    nextStatusId: 1,
    issues: [],
    errorCount: 0,
    warningCount: 0
  };
  for (let index = 0; index < options.players; index += 1) {
    league.players.push({
      id: `bot-${index + 1}`,
      name: `Bot ${index + 1}`,
      balance: options.startingBalance,
      sagaPoints: 0,
      wins: 0,
      losses: 0,
      inventory: [],
      buffs: [],
      nerfs: []
    });
  }
  return league;
}

function activeRoster(league, player) {
  return league.pokemonRecords.filter((pokemon) => pokemon.trainerId === player.id && pokemon.status !== "Released" && pokemon.status !== "Removed");
}

function pokemonById(league, pokemonId) {
  return league.pokemonRecords.find((pokemon) => pokemon.id === pokemonId) || null;
}

function playerById(league, playerId) {
  return league.players.find((player) => player.id === playerId) || null;
}

function addPokemon(league, player, row, source = "Simulation Encounter") {
  if (!row) return null;
  const pokemon = {
    id: `sim-pokemon-${league.nextPokemonId++}`,
    name: row.displayName,
    trainerId: player.id,
    status: "Active",
    rosterType: "Active",
    buffs: [],
    nerfs: [],
    source,
    balanceTier: row.balanceTier,
    balanceTierOrder: Number(row.balanceTierOrder || 0),
    acquiredSeries: league.series,
    acquiredGym: league.gym
  };
  league.pokemonRecords.push(pokemon);
  if (source !== "Initial Roster") {
    logEvent(league, "encounter", `${player.name} gained ${pokemon.name} from ${source}.`, {
      playerId: player.id,
      pokemonId: pokemon.id,
      pokemon: pokemon.name,
      source,
      tier: pokemon.balanceTier
    });
  }
  return pokemon;
}

function inventoryTypeForShop(shopType) {
  if (shopType === "tokens") return "TOKEN";
  if (shopType === "tms") return "TM";
  return "ITEM";
}

function addInventoryItem(league, player, item, shopType, price = Number(item.price || 0)) {
  const entry = {
    id: `${slugify(item.id || item.name || shopType)}-${league.nextInventoryId++}`,
    catalogId: item.id || "",
    name: item.name,
    type: inventoryTypeForShop(shopType),
    tokenType: item.tokenType || (shopType === "tokens" ? "token" : undefined),
    tier: item.tier || "",
    category: item.category || "",
    gameCornerTier: item.gameCornerTier || "",
    gameCornerTierId: item.gameCornerTierId || "",
    price
  };
  player.inventory.unshift(entry);
  return entry;
}

function spend(player, amount) {
  player.balance = Number(player.balance || 0) - Number(amount || 0);
}

function earn(player, amount) {
  player.balance = Number(player.balance || 0) + Number(amount || 0);
}

function statusExpiresRound(league, durationGyms) {
  return durationGyms ? league.roundIndex + Number(durationGyms || 0) : null;
}

function activeStatusesForPokemon(league, pokemon) {
  return league.lingeringStatuses.filter((status) => status.status === "active"
    && (status.targetPokemonId === pokemon.id || status.targetPokemonName === pokemon.name));
}

function hasStatusType(league, pokemon, type) {
  return activeStatusesForPokemon(league, pokemon).some((status) => status.type === type);
}

function hasRestrictImmunity(league, pokemon) {
  return (pokemon.buffs || []).some((buff) => /restrict immune/i.test(String(buff)))
    || activeStatusesForPokemon(league, pokemon).some((status) => status.payload?.restrictImmune);
}

function addStatus(league, definition, actor, targetPlayer, pokemon, choice = "") {
  const status = {
    id: `sim-status-${league.nextStatusId++}`,
    type: definition.statusType || definition.type,
    name: definition.statusName || definition.name || definition.label || "Status",
    category: definition.category || "",
    isCurse: definition.category === "curse",
    status: "active",
    actorPlayerId: actor.id,
    targetPlayerId: targetPlayer?.id || "",
    targetPokemonId: pokemon?.id || "",
    targetPokemonName: pokemon?.name || "",
    series: league.series,
    gym: league.gym,
    roundIndex: league.roundIndex,
    durationGyms: definition.durationGyms || null,
    expiresRound: statusExpiresRound(league, definition.durationGyms),
    payload: { ...(definition.payload || {}) }
  };
  if (definition.payloadFromChoice && choice) status.payload[definition.payloadFromChoice] = choice;
  league.lingeringStatuses.push(status);
  league.counters.statusesCreated += 1;
  logEvent(league, "status", `${actor.name} created ${status.name}${pokemon ? ` on ${pokemon.name}` : targetPlayer ? ` on ${targetPlayer.name}` : ""}.`, {
    statusId: status.id,
    statusType: status.type,
    actor: actor.name,
    targetPlayer: targetPlayer?.name || "",
    targetPokemon: pokemon?.name || "",
    choice,
    durationGyms: status.durationGyms
  });
  return status;
}

function expireStatuses(league) {
  league.lingeringStatuses.forEach((status) => {
    if (status.status === "active" && status.expiresRound !== null && league.roundIndex >= status.expiresRound) {
      status.status = "expired";
      logEvent(league, "status-expired", `${status.name} expired${status.targetPokemonName ? ` on ${status.targetPokemonName}` : ""}.`, {
        statusId: status.id,
        statusType: status.type,
        targetPlayerId: status.targetPlayerId,
        targetPokemonId: status.targetPokemonId
      });
    }
  });
}

function tokenIdentity(token) {
  return [token.catalogId, token.id, token.name].map(slugify).filter(Boolean);
}

function tokenDefinitionFor(token, lookups) {
  for (const key of tokenIdentity(token)) {
    if (lookups.status.has(key)) return { kind: "status", id: lookups.status.get(key).id, definition: lookups.status.get(key).definition };
    if (lookups.utility.has(key)) return { kind: "utility", id: lookups.utility.get(key).id, definition: lookups.utility.get(key).definition };
  }
  if (tokenIdentity(token).includes("reroll-token") || slugify(token.name) === "reroll") return { kind: "special", id: "reroll-token", definition: { effectType: "reroll" } };
  return null;
}

function removeInventoryEntry(player, entry) {
  const index = player.inventory.findIndex((item) => item.id === entry.id);
  if (index >= 0) return player.inventory.splice(index, 1)[0];
  return null;
}

function randomOpponent(league, player, rng) {
  return rng.pick(league.players.filter((candidate) => candidate.id !== player.id));
}

function randomTargetPokemon(league, targetPlayer, rng, options = {}) {
  const roster = activeRoster(league, targetPlayer)
    .filter((pokemon) => !options.keepRosterAlive || activeRoster(league, targetPlayer).length > 1);
  return rng.pick(roster);
}

function activateStatusToken(league, actor, token, tokenInfo, rng) {
  const definition = tokenInfo.definition;
  let targetPlayer = definition.targetMode === "player" ? randomOpponent(league, actor, rng) : randomOpponent(league, actor, rng);
  let targetPokemon = null;
  let choice = "";

  if (definition.statusType === "unban-protection") {
    const candidates = league.pokemonRecords.filter((pokemon) => pokemon.status !== "Removed"
      && (hasStatusType(league, pokemon, "ban") || hasStatusType(league, pokemon, "restrict")));
    targetPokemon = rng.pick(candidates);
    targetPlayer = targetPokemon ? playerById(league, targetPokemon.trainerId) : null;
  } else if (definition.targetMode !== "player") {
    targetPokemon = randomTargetPokemon(league, targetPlayer, rng);
  }

  if (definition.targetMode !== "player" && !targetPokemon) return false;
  if (definition.statusType === "restrict" && hasRestrictImmunity(league, targetPokemon)) return false;
  if (definition.category === "curse" && targetPokemon && (targetPokemon.nerfs || []).some((nerf) => /arena trapped/i.test(String(nerf)))) return false;

  if (definition.choiceLabel) {
    if (/move/i.test(definition.choiceLabel)) choice = rng.pick(["Protect", "Earthquake", "Thunderbolt", "Recover", "Teleport"]) || "Protect";
    else choice = rng.pick((targetPlayer?.inventory || []).filter((item) => ["ITEM", "TM"].includes(item.type)).map((item) => item.name)) || "Leftovers";
  }

  removeInventoryEntry(actor, token);
  if (definition.statusType === "unban-protection" && targetPokemon) {
    activeStatusesForPokemon(league, targetPokemon).forEach((status) => {
      if (["ban", "restrict"].includes(status.type)) status.status = "removed";
    });
  }
  if (definition.statusType === "curse-knock-off" && targetPlayer && choice) {
    const choiceKey = slugify(choice);
    const index = targetPlayer.inventory.findIndex((item) => ["ITEM", "TM"].includes(item.type)
      && !/masterball/i.test(`${item.tier || ""} ${item.name || ""}`)
      && (slugify(item.name) === choiceKey || slugify(item.moveName) === choiceKey));
    if (index >= 0) targetPlayer.inventory.splice(index, 1);
  }
  addStatus(league, definition, actor, targetPlayer, targetPokemon, choice);
  league.counters.tokensActivated += 1;
  logEvent(league, "token", `${actor.name} used ${token.name}${targetPokemon ? ` on ${targetPokemon.name}` : targetPlayer ? ` on ${targetPlayer.name}` : ""}.`, {
    token: token.name,
    tokenId: token.id,
    tokenKind: tokenInfo.kind,
    definitionId: tokenInfo.id,
    actor: actor.name,
    targetPlayer: targetPlayer?.name || "",
    targetPokemon: targetPokemon?.name || "",
    choice
  });
  return true;
}

function gameCornerTierRank(token) {
  const text = `${token.gameCornerTierId || ""} ${token.gameCornerTier || ""} ${token.name || ""}`.toLowerCase();
  if (/master/.test(text)) return 11;
  if (/ultra/.test(text)) return 9;
  if (/great/.test(text)) return 7;
  if (/poke/.test(text)) return 5;
  return 3;
}

function pokemonPoolForRank(data, rank) {
  const maxRank = Math.max(1, rank);
  return data.pokemonPool.filter((row) => Number(row.balanceTierOrder || 0) <= maxRank);
}

function activateGameCornerToken(league, actor, token, data, rng) {
  const pool = pokemonPoolForRank(data, gameCornerTierRank(token));
  const row = rng.pick(pool.length ? pool : data.pokemonPool);
  if (!row) return false;
  removeInventoryEntry(actor, token);
  addPokemon(league, actor, row, `${token.name} Reward`);
  league.counters.gameCornerRewards += 1;
  league.counters.tokensActivated += 1;
  logEvent(league, "game-corner", `${actor.name} used ${token.name} and won ${row.displayName}.`, {
    token: token.name,
    reward: row.displayName,
    tier: row.balanceTier
  });
  return true;
}

function activateUtilityToken(league, actor, token, tokenInfo, data, rng) {
  const definition = tokenInfo.definition;
  if (definition.effectType === "trainer-class-wheel") {
    league.counters.classTokensSkipped += 1;
    return false;
  }
  if (token.tokenType === "game-corner-wheel" || token.tokenType === "game-corner" || /safari zone token/i.test(token.name)) {
    return activateGameCornerToken(league, actor, token, data, rng);
  }

  const targetPlayer = definition.selfOnly ? actor : randomOpponent(league, actor, rng);
  const targetPokemon = definition.targetMode === "single-pokemon"
    ? randomTargetPokemon(league, targetPlayer, rng, { keepRosterAlive: definition.effectType === "steal-pokemon" })
    : null;
  if (definition.targetMode === "single-pokemon" && !targetPokemon) return false;
  if (definition.effectType === "steal-pokemon" && targetPlayer.id === actor.id) return false;

  removeInventoryEntry(actor, token);

  if (definition.effectType === "add-buffs") {
    targetPokemon.buffs = [...new Set([...(targetPokemon.buffs || []), ...(definition.buffs || [])])];
    (definition.lingeringStatuses || []).forEach((statusDefinition) => {
      addStatus(league, {
        type: statusDefinition.type,
        name: statusDefinition.name,
        category: definition.category,
        durationGyms: statusDefinition.durationGyms,
        payload: statusDefinition.payload || {}
      }, actor, targetPlayer, targetPokemon);
    });
  } else if (definition.effectType === "add-nerfs") {
    targetPokemon.nerfs = [...new Set([...(targetPokemon.nerfs || []), ...(definition.nerfs || [])])];
  } else if (definition.effectType === "clear-buffs") {
    targetPokemon.buffs = [];
  } else if (definition.effectType === "steal-pokemon") {
    targetPokemon.trainerId = actor.id;
    targetPokemon.status = "Active";
    targetPokemon.rosterType = "Active";
    league.counters.steals += 1;
    logEvent(league, "steal", `${actor.name} stole ${targetPokemon.name} from ${targetPlayer.name} with ${token.name}.`, {
      token: token.name,
      actor: actor.name,
      targetPlayer: targetPlayer.name,
      pokemon: targetPokemon.name
    });
  } else if (definition.effectType === "remove-from-rivals") {
    const removableNames = league.players
      .filter((player) => player.id !== actor.id)
      .flatMap((player) => player.inventory.filter((item) => ["ITEM", "TM"].includes(item.type) && !/masterball/i.test(`${item.tier || ""} ${item.name || ""}`)).map((item) => item.name));
    const choice = rng.pick(removableNames);
    if (choice) {
      league.players.filter((player) => player.id !== actor.id).forEach((player) => {
        const index = player.inventory.findIndex((item) => ["ITEM", "TM"].includes(item.type) && slugify(item.name) === slugify(choice));
        if (index >= 0) player.inventory.splice(index, 1);
      });
      league.counters.incinerates += 1;
      logEvent(league, "incinerate", `${actor.name} removed rival copies of ${choice} with ${token.name}.`, {
        token: token.name,
        actor: actor.name,
        removedName: choice
      });
    }
  } else if (definition.effectType === "player-buff") {
    targetPlayer.buffs = [...new Set([...(targetPlayer.buffs || []), definition.buff])];
  } else if (definition.effectType === "player-nerf") {
    targetPlayer.nerfs = [...new Set([...(targetPlayer.nerfs || []), definition.nerf])];
  }

  league.counters.tokensActivated += 1;
  logEvent(league, "token", `${actor.name} used ${token.name}.`, {
    token: token.name,
    tokenId: token.id,
    tokenKind: tokenInfo.kind,
    definitionId: tokenInfo.id,
    effectType: definition.effectType,
    actor: actor.name,
    targetPlayer: targetPlayer?.name || "",
    targetPokemon: targetPokemon?.name || ""
  });
  return true;
}

function maybeActivateToken(league, player, data, lookups, rng) {
  const tokens = rng.shuffle(player.inventory.filter((item) => item.type === "TOKEN" || item.tokenType));
  for (const token of tokens.slice(0, 2)) {
    if (rng.chance(0.55)) continue;
    const tokenInfo = tokenDefinitionFor(token, lookups);
    if (!tokenInfo) {
      issue(league, "error", "Owned token has no activation definition.", { player: player.name, token });
      continue;
    }
    if (tokenInfo.kind === "special") {
      continue;
    }
    const activated = tokenInfo.kind === "status"
      ? activateStatusToken(league, player, token, tokenInfo, rng)
      : activateUtilityToken(league, player, token, tokenInfo, data, rng);
    if (activated) return true;
  }
  return false;
}

function affordableChoices(player, entries, maxSpendRatio = 0.8) {
  const cap = Math.max(0, Number(player.balance || 0) * maxSpendRatio);
  return entries.filter((entry) => Number(entry.price || 0) > 0 && Number(entry.price || 0) <= cap && !entry.cannotPurchase);
}

function shopLevelForGym(gym) {
  return Math.max(1, Math.min(5, 1 + Math.floor((Number(gym || 1) - 1) / 2)));
}

function buyRandomShopItem(league, player, data, rng) {
  const level = shopLevelForGym(league.gym);
  const tokenChoices = affordableChoices(player, data.tokens.filter((item) => !item.cannotPurchase), 0.75);
  const itemChoices = affordableChoices(player, data.items.filter((item) => Number(item.level || 1) <= level), 0.45);
  const tmChoices = affordableChoices(player, data.tms.filter((item) => Number(item.level || 1) <= level), 0.45);
  const buckets = [
    { shopType: "tokens", entries: tokenChoices, weight: 5 },
    { shopType: "items", entries: itemChoices, weight: 3 },
    { shopType: "tms", entries: tmChoices, weight: 2 }
  ].filter((bucket) => bucket.entries.length);
  const bucket = rng.weighted(buckets, (entry) => entry.weight);
  if (!bucket) return false;
  const item = rng.pick(bucket.entries);
  if (!item) return false;
  const price = Number(item.price || 0);
  if (price > player.balance) return false;
  spend(player, price);
  addInventoryItem(league, player, item, bucket.shopType, price);
  league.counters.purchases += 1;
  logEvent(league, "purchase", `${player.name} bought ${item.name} from ${bucket.shopType} for ${price}.`, {
    player: player.name,
    item: item.name,
    shopType: bucket.shopType,
    price,
    balanceAfter: player.balance
  });
  return true;
}

function simulateActionPhase(league, data, lookups, rng) {
  league.phase = "action";
  league.players.forEach((player) => {
    for (let action = 0; action < 3; action += 1) {
      if (rng.chance(0.45)) {
        const maxRank = Math.min(12, 2 + league.gym + Math.floor(league.roundIndex / 9));
        const row = rng.pick(pokemonPoolForRank(data, maxRank));
        addPokemon(league, player, row, "Action Encounter");
        league.counters.encounters += 1;
      } else {
        maybeActivateToken(league, player, data, lookups, rng);
      }
    }
  });
}

function simulateBattlePhase(league, data, lookups, rng) {
  league.phase = "battle";
  league.players.forEach((player) => maybeActivateToken(league, player, data, lookups, rng));
  const pairings = rng.shuffle(league.players);
  for (let index = 0; index < pairings.length - 1; index += 2) {
    const a = pairings[index];
    const b = pairings[index + 1];
    const winner = rng.chance(0.5) ? a : b;
    const loser = winner === a ? b : a;
    winner.wins += 1;
    loser.losses += 1;
    winner.sagaPoints += 3;
    loser.sagaPoints += 1;
    earn(winner, 9500 + league.gym * 500);
    earn(loser, 5500 + league.gym * 350);
    league.counters.battles += 1;
    logEvent(league, "battle", `${winner.name} defeated ${loser.name}.`, {
      winner: winner.name,
      loser: loser.name,
      winnerSagaPoints: winner.sagaPoints,
      loserSagaPoints: loser.sagaPoints,
      winnerBalance: winner.balance,
      loserBalance: loser.balance
    });
  }
}

function simulateShopPhase(league, data, lookups, rng) {
  league.phase = "shop";
  league.players.forEach((player) => {
    const buys = rng.int(1, 4);
    for (let count = 0; count < buys; count += 1) buyRandomShopItem(league, player, data, rng);
    maybeActivateToken(league, player, data, lookups, rng);
  });
}

function validateTokenCoverage(league, data, lookups) {
  data.tokens.forEach((token) => {
    if (token.cannotPurchase) return;
    const tokenInfo = tokenDefinitionFor({ ...token, type: "TOKEN", catalogId: token.id }, lookups);
    if (!tokenInfo) {
      issue(league, "error", "Token shop entry has no activation definition or special handler.", {
        id: token.id,
        name: token.name
      });
    }
  });
}

function validateLeague(league, data, lookups) {
  const playerIds = new Set(league.players.map((player) => player.id));
  const pokemonIds = new Set();
  const inventoryIds = new Set();
  league.players.forEach((player) => {
    if (!Number.isFinite(player.balance) || player.balance < 0) {
      issue(league, "error", "Player has invalid or negative balance.", { player: player.name, balance: player.balance });
    }
    activeRoster(league, player).length || issue(league, "error", "Player active roster is empty.", { player: player.name });
    (player.inventory || []).forEach((item) => {
      if (!item.id || !item.name || !item.type) {
        issue(league, "error", "Inventory item is missing id/name/type.", { player: player.name, item });
      }
      if (inventoryIds.has(item.id)) {
        issue(league, "error", "Duplicate inventory item id detected.", { player: player.name, itemId: item.id, itemName: item.name });
      }
      inventoryIds.add(item.id);
      if ((item.type === "TOKEN" || item.tokenType) && !tokenDefinitionFor(item, lookups)) {
        issue(league, "error", "Inventory token cannot resolve to a definition.", { player: player.name, item });
      }
    });
  });
  league.pokemonRecords.forEach((pokemon) => {
    if (pokemonIds.has(pokemon.id)) {
      issue(league, "error", "Duplicate Pokemon id detected.", { pokemonId: pokemon.id });
    }
    pokemonIds.add(pokemon.id);
    if (!playerIds.has(pokemon.trainerId)) {
      issue(league, "error", "Pokemon points at missing trainer.", { pokemon });
    }
  });
  league.lingeringStatuses.forEach((status) => {
    if (status.targetPlayerId && !playerIds.has(status.targetPlayerId)) {
      issue(league, "error", "Status points at missing player.", { status });
    }
    if (status.targetPokemonId && !pokemonIds.has(status.targetPokemonId)) {
      issue(league, "error", "Status points at missing Pokemon.", { status });
    }
    if (status.status === "active" && status.expiresRound !== null && league.roundIndex >= status.expiresRound) {
      issue(league, "error", "Expired status is still active.", { status });
    }
  });
}

function bootstrapRosters(league, data, rng) {
  const starterPool = data.pokemonPool.filter((row) => Number(row.balanceTierOrder || 0) <= 3);
  league.players.forEach((player) => {
    for (let count = 0; count < 6; count += 1) addPokemon(league, player, rng.pick(starterPool), "Initial Roster");
  });
}

function simulate(options) {
  const data = loadSourceData();
  const rng = randomApi(options.seed);
  const lookups = {
    utility: definitionLookup(data.utilityDefinitions),
    status: definitionLookup(data.statusDefinitions)
  };
  const league = createLeague(options, data);
  bootstrapRosters(league, data, rng);
  validateTokenCoverage(league, data, lookups);

  for (let seriesIndex = 0; seriesIndex < options.series; seriesIndex += 1) {
    league.series = seriesNames[seriesIndex];
    for (let gym = 1; gym <= 9; gym += 1) {
      league.gym = gym;
      league.roundIndex = seriesIndex * 9 + gym;
      league.phase = "start";
      expireStatuses(league);
      simulateActionPhase(league, data, lookups, rng);
      validateLeague(league, data, lookups);
      simulateBattlePhase(league, data, lookups, rng);
      validateLeague(league, data, lookups);
      simulateShopPhase(league, data, lookups, rng);
      validateLeague(league, data, lookups);
    }
  }
  return league;
}

function summarize(league) {
  return {
    seed: league.seed,
    simulatedThrough: `${league.series} Gym ${league.gym}`,
    players: league.players.length,
    pokemon: league.pokemonRecords.length,
    inventory: league.players.reduce((sum, player) => sum + player.inventory.length, 0),
    activeStatuses: league.lingeringStatuses.filter((status) => status.status === "active").length,
    expiredStatuses: league.lingeringStatuses.filter((status) => status.status === "expired").length,
    counters: league.counters,
    errors: league.errorCount,
    warnings: league.warningCount,
    issues: league.issues.slice(0, 80)
  };
}

function eventTypeCounts(log) {
  return log.reduce((counts, entry) => {
    counts[entry.type] = (counts[entry.type] || 0) + 1;
    return counts;
  }, {});
}

function inventoryCounts(player) {
  return (player.inventory || []).reduce((counts, item) => {
    counts[item.type || "OTHER"] = (counts[item.type || "OTHER"] || 0) + 1;
    return counts;
  }, {});
}

function standingsForReport(league) {
  return league.players
    .map((player) => {
      const roster = activeRoster(league, player);
      return {
        id: player.id,
        name: player.name,
        wins: player.wins,
        losses: player.losses,
        sagaPoints: player.sagaPoints,
        balance: player.balance,
        rosterCount: roster.length,
        inventoryCount: player.inventory.length,
        inventoryCounts: inventoryCounts(player),
        rosterPreview: roster.slice(0, 12).map((pokemon) => pokemon.name),
        tokenPreview: player.inventory.filter((item) => item.type === "TOKEN").slice(0, 12).map((item) => item.name),
        itemPreview: player.inventory.filter((item) => item.type === "ITEM").slice(0, 12).map((item) => item.name),
        tmPreview: player.inventory.filter((item) => item.type === "TM").slice(0, 12).map((item) => item.name)
      };
    })
    .sort((a, b) => b.sagaPoints - a.sagaPoints || b.wins - a.wins || b.balance - a.balance);
}

function reportPayload(league, summary) {
  return {
    summary,
    eventTypeCounts: eventTypeCounts(league.log),
    standings: standingsForReport(league),
    activeStatuses: league.lingeringStatuses.filter((status) => status.status === "active"),
    expiredStatuses: league.lingeringStatuses.filter((status) => status.status === "expired").slice(-80),
    issues: league.issues,
    eventLog: league.log
  };
}

function markdownTable(headers, rows) {
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map((cell) => String(cell ?? "").replace(/\|/g, "\\|")).join(" | ")} |`)
  ].join("\n");
}

function shortList(items, empty = "-") {
  return items && items.length ? items.join(", ") : empty;
}

function eventRowsForMarkdown(log) {
  if (log.length <= 160) return log;
  return [
    ...log.slice(0, 40),
    { index: "...", series: "...", gym: "...", phase: "...", type: "...", message: `${log.length - 120} middle events omitted from Markdown. See JSON for the full event log.` },
    ...log.slice(-120)
  ];
}

function buildMarkdownReport(payload) {
  const { summary, standings, activeStatuses, issues, eventLog } = payload;
  const counterRows = Object.entries(summary.counters).map(([key, value]) => [key, value]);
  const eventCountRows = Object.entries(payload.eventTypeCounts).sort((a, b) => b[1] - a[1]).map(([key, value]) => [key, value]);
  const standingRows = standings.map((player, index) => [
    index + 1,
    player.name,
    `${player.wins}-${player.losses}`,
    player.sagaPoints,
    player.balance,
    player.rosterCount,
    player.inventoryCount,
    `T:${player.inventoryCounts.TOKEN || 0} I:${player.inventoryCounts.ITEM || 0} TM:${player.inventoryCounts.TM || 0}`
  ]);
  const rosterSections = standings.map((player) => [
    `### ${player.name}`,
    `- Roster: ${shortList(player.rosterPreview)}`,
    `- Tokens: ${shortList(player.tokenPreview)}`,
    `- Items: ${shortList(player.itemPreview)}`,
    `- TMs: ${shortList(player.tmPreview)}`
  ].join("\n"));
  const statusRows = activeStatuses.slice(0, 80).map((status) => [
    status.name,
    status.type,
    status.targetPokemonName || "-",
    status.targetPlayerId || "-",
    status.expiresRound ?? "-"
  ]);
  const issueRows = issues.slice(0, 80).map((entry) => [
    entry.severity,
    `${entry.series} G${entry.gym}`,
    entry.phase,
    entry.message
  ]);
  const logRows = eventRowsForMarkdown(eventLog).map((entry) => [
    entry.index,
    `${entry.series} G${entry.gym}`,
    entry.phase,
    entry.type,
    entry.message
  ]);

  return [
    `# Rival Saga Simulation Report`,
    "",
    `Seed: ${summary.seed}`,
    `Simulated through: ${summary.simulatedThrough}`,
    `Players: ${summary.players}`,
    `Pokemon records: ${summary.pokemon}`,
    `Inventory entries: ${summary.inventory}`,
    `Active statuses: ${summary.activeStatuses}; expired statuses: ${summary.expiredStatuses}`,
    "",
    "## Counters",
    "",
    markdownTable(["Counter", "Value"], counterRows),
    "",
    "## Event Types Tested",
    "",
    eventCountRows.length ? markdownTable(["Type", "Events"], eventCountRows) : "No events logged.",
    "",
    "## Standings",
    "",
    markdownTable(["Rank", "Player", "Record", "SP", "Money", "Roster", "Inventory", "Inventory Mix"], standingRows),
    "",
    "## Player Snapshots",
    "",
    rosterSections.join("\n\n"),
    "",
    "## Active Statuses",
    "",
    statusRows.length ? markdownTable(["Name", "Type", "Pokemon", "Target Player", "Expires Round"], statusRows) : "No active statuses.",
    "",
    "## Issues",
    "",
    issueRows.length ? markdownTable(["Severity", "Round", "Phase", "Message"], issueRows) : "No simulation issues detected.",
    "",
    "## Event Log",
    "",
    markdownTable(["#", "Round", "Phase", "Type", "Message"], logRows),
    ""
  ].join("\n");
}

function safeReportName(seed) {
  return slugify(seed || "simulation") || "simulation";
}

function writeSimulationReports(options, league, summary) {
  if (!options.report) return null;
  const payload = reportPayload(league, summary);
  const reportDir = path.resolve(rootDir, options.reportDir);
  fs.mkdirSync(reportDir, { recursive: true });
  const baseName = `${safeReportName(summary.seed)}-s${options.series}-p${options.players}`;
  const jsonPath = path.join(reportDir, `${baseName}.json`);
  const markdownPath = path.join(reportDir, `${baseName}.md`);
  fs.writeFileSync(jsonPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(markdownPath, buildMarkdownReport(payload), "utf8");
  return { jsonPath, markdownPath };
}

function main() {
  const options = parseArgs(process.argv);
  if (options.help) {
    printHelp();
    return;
  }
  const league = simulate(options);
  const summary = summarize(league);
  const reportPaths = writeSimulationReports(options, league, summary);
  if (options.json) {
    console.log(JSON.stringify(summary, null, 2));
  } else {
    console.log(`Rival Saga simulation complete (${summary.seed})`);
    console.log(`Simulated through: ${summary.simulatedThrough}`);
    console.log(`Players: ${summary.players}`);
    console.log(`Pokemon records: ${summary.pokemon}`);
    console.log(`Inventory entries: ${summary.inventory}`);
    console.log(`Active statuses: ${summary.activeStatuses}; expired: ${summary.expiredStatuses}`);
    console.log(`Counters: ${JSON.stringify(summary.counters)}`);
    if (summary.counters.classTokensSkipped) {
      console.log(`Class token activations skipped by design: ${summary.counters.classTokensSkipped} (trainer classes intentionally excluded from this pass).`);
    }
    if (summary.issues.length) {
      console.log(`Issues (${summary.errors} errors, ${summary.warnings} warnings):`);
      summary.issues.forEach((entry, index) => {
        console.log(`${index + 1}. [${entry.severity}] ${entry.series} G${entry.gym} ${entry.phase}: ${entry.message}`);
        if (options.verbose) console.log(`   ${JSON.stringify(entry.context)}`);
      });
    } else {
      console.log("No simulation issues detected.");
    }
    if (reportPaths) {
      console.log(`Markdown report: ${reportPaths.markdownPath}`);
      console.log(`JSON report: ${reportPaths.jsonPath}`);
    }
  }
  if (summary.errors) process.exitCode = 1;
}

main();
