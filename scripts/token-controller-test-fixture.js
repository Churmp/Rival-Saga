"use strict";

const fs = require("node:fs");
const net = require("node:net");
const os = require("node:os");
const path = require("node:path");
const { spawn } = require("node:child_process");

function token(id, name) {
  return { id, name, type: "TOKEN", category: "Token" };
}

function resource(id, name, type = "ITEM", extras = {}) {
  return { id, name, type, ...extras };
}

function player(id, name, inventory = []) {
  return {
    id,
    name,
    balance: 10000,
    inventory,
    moveAccessGrants: [],
    perks: [],
    buffs: []
  };
}

function pokemon(id, trainerId, name, extras = {}) {
  return {
    id,
    trainerId,
    name,
    currentSpecies: name,
    acquiredSpecies: name,
    rosterType: "Active",
    status: "Active",
    level: 51,
    naturalLevel: 51,
    ability: "Natural Ability",
    moves: ["Tackle"],
    buffs: [],
    nerfs: [],
    effectBuffs: [],
    ...extras
  };
}

function controlStateFixture(marker = "controller-fixture") {
  return {
    marker,
    series: "Kanto",
    gym: 1,
    phase: "action",
    players: [
      player("gold", "Gold", [
        token("gold-rage-1", "Rage Candy Bar"),
        token("gold-rage-2", "Rage Candy Bar"),
        token("gold-sub-1", "Substitute"),
        token("gold-sub-2", "Substitute"),
        token("gold-clear-1", "Clear Smog"),
        token("gold-immunity-1", "Immunity"),
        token("gold-toxic-1", "Toxic Curse"),
        token("gold-iron-1", "Iron Ball Curse"),
        token("gold-flame-1", "Flame Curse"),
        token("gold-silencing-1", "Silencing Curse"),
        token("gold-imprison-1", "Imprison Curse"),
        resource("gold-leftovers", "Leftovers"),
        resource("gold-recover", "Recover", "TM", { moveName: "Recover" }),
        resource("gold-master-ball", "Master Ball")
      ]),
      player("red", "Red", [
        token("red-sub-1", "Substitute"),
        token("red-sub-2", "Substitute"),
        token("red-immunity-1", "Immunity"),
        resource("red-leftovers-1", "Leftovers"),
        resource("red-leftovers-2", "Leftovers"),
        resource("red-recover", "Recover", "TM", { moveName: "Recover" }),
        resource("red-master-ball", "Master Ball")
      ]),
      player("steevee", "Steevee", [
        token("steevee-restrict-1", "Restrict"),
        token("steevee-restrict-2", "Restrict"),
        token("steevee-restrict-3", "Restrict"),
        token("steevee-unban-1", "Unban"),
        token("steevee-unban-2", "Unban"),
        token("steevee-extra-ban-1", "Extra Ban"),
        token("steevee-extra-ban-2", "Extra Ban"),
        token("steevee-arena-1", "Arena Trap"),
        token("steevee-arena-2", "Arena Trap"),
        token("steevee-arena-3", "Arena Trap"),
        token("steevee-clear-1", "Clear Smog"),
        token("steevee-incinerate-1", "Incinerate"),
        token("steevee-incinerate-2", "Incinerate"),
        token("steevee-incinerate-3", "Incinerate"),
        token("steevee-steal-1", "Steal"),
        token("steevee-steal-2", "Steal"),
        token("steevee-steal-3", "Steal"),
        token("steevee-wicked-1", "Wicked Blow"),
        token("steevee-wicked-2", "Wicked Blow"),
        token("steevee-wicked-3", "Wicked Blow"),
        token("steevee-wicked-4", "Wicked Blow"),
        token("steevee-toxic-1", "Toxic Curse"),
        token("steevee-toxic-2", "Toxic Curse"),
        token("steevee-iron-1", "Iron Ball Curse"),
        token("steevee-flame-1", "Flame Curse"),
        token("steevee-flame-2", "Flame Curse"),
        token("steevee-silencing-1", "Silencing Curse"),
        token("steevee-imprison-1", "Imprison Curse"),
        resource("steevee-leftovers", "Leftovers")
      ])
    ],
    pokemonRecords: [
      pokemon("gold-garchomp", "gold", "Garchomp", { baseStats: { hp: 108 }, origin: "Daycare" }),
      pokemon("gold-lucario", "gold", "Lucario"),
      pokemon("red-garchomp", "red", "Garchomp", { baseStats: { hp: 108 }, origin: "Safari" }),
      pokemon("red-garchomp-2", "red", "Garchomp"),
      pokemon("red-lucario", "red", "Lucario"),
      pokemon("red-lucario-legacy", "red", "Lucario", { rosterType: "Legacy", status: "Legacy" }),
      pokemon("steevee-alakazam", "steevee", "Alakazam")
    ],
    interactionEvents: [],
    transactions: [],
    log: [],
    lingeringStatuses: [],
    globalPokemonRules: {},
    banlistHistory: [],
    fieldTokens: [],
    effectAuditRecords: [],
    effectOperations: [],
    tokenConsumptions: [],
    tokenActivations: [],
    tokenUndoHistory: [],
    classStateByPlayerId: {
      gold: { classId: "professor", moveAccessGrants: [], persistentMarker: "keep-class" }
    },
    perkSystem: {
      moveAccessGrantsByPlayerId: {},
      persistentMarker: "keep-perks"
    },
    teambuilder: { moveAccessGrantsByPlayerId: {} },
    testingTools: { ignoreTurnOrder: false, freeMode: false, controlledPlayerId: "gold", activeScenario: null },
    activePlayerId: "gold",
    activePage: "playerHub",
    liveRefereeScreen: "play",
    liveRefereeCollapsed: true,
    liveTable: { currentPendingEventId: "", resolutionAnnouncements: [] }
  };
}

function findPlayer(state, id) {
  return state.players.find((entry) => entry.id === id);
}

function findPokemon(state, id) {
  return state.pokemonRecords.find((entry) => entry.id === id);
}

function inventoryCount(state, playerId, name) {
  return findPlayer(state, playerId).inventory.filter((entry) => entry.name === name).length;
}

async function availablePort() {
  const listener = net.createServer();
  await new Promise((resolve, reject) => listener.listen(0, "127.0.0.1", resolve).once("error", reject));
  const port = listener.address().port;
  await new Promise((resolve) => listener.close(resolve));
  return port;
}

async function waitForServer(baseUrl, timeoutMs = 5000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(`${baseUrl}/api/health`);
      if (response.ok) return;
    } catch {
      // The temporary server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  throw new Error("Timed out waiting for the temporary Rival Saga server.");
}

async function startTemporaryServer(label = "controller") {
  const port = await availablePort();
  const baseUrl = `http://127.0.0.1:${port}`;
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), `rival-saga-${label}-`));
  const processHandle = spawn(process.execPath, [path.join(__dirname, "..", "server.js")], {
    cwd: path.join(__dirname, ".."),
    env: { ...process.env, PORT: String(port), RIVAL_SAGA_DATA_DIR: dataDir },
    stdio: ["ignore", "pipe", "pipe"]
  });
  await waitForServer(baseUrl);
  return { baseUrl, dataDir, processHandle };
}

async function stopTemporaryServer(server) {
  if (server?.processHandle && !server.processHandle.killed) server.processHandle.kill();
  await new Promise((resolve) => setTimeout(resolve, 50));
  if (server?.dataDir && fs.existsSync(server.dataDir)) fs.rmSync(server.dataDir, { recursive: true, force: true });
}

async function loadGame(baseUrl, gameId) {
  const response = await fetch(`${baseUrl}/api/games/${gameId}/state`);
  if (!response.ok) throw new Error(`Could not load ${gameId}: ${response.status}`);
  return response.json();
}

async function saveGame(baseUrl, gameId, state, expectedVersion = 0, extra = {}) {
  const response = await fetch(`${baseUrl}/api/games/${gameId}/state`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ state, expectedVersion, ...extra })
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(`Could not save ${gameId}: ${response.status} ${JSON.stringify(payload)}`);
  return payload;
}

module.exports = {
  controlStateFixture,
  findPlayer,
  findPokemon,
  inventoryCount,
  startTemporaryServer,
  stopTemporaryServer,
  loadGame,
  saveGame
};
