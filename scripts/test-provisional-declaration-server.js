"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "rival-saga-provisional-"));
const gamesDir = path.join(tempRoot, "games");
fs.mkdirSync(gamesDir, { recursive: true });
fs.writeFileSync(path.join(tempRoot, "users.json"), JSON.stringify({
  users: [{ id: "host", loginId: "host", displayName: "Host", role: "admin", gameIds: [] }]
}));
fs.writeFileSync(path.join(tempRoot, "ruleset-patches.json"), JSON.stringify({ patches: [] }));

process.env.RIVAL_SAGA_DATA_DIR = tempRoot;
const { server } = require("../server.js");

let origin = "";

function baseState({ tokenName = "Incinerate", tokenId = "incinerate" } = {}) {
  return {
    series: "Kanto",
    gym: 1,
    currentPhase: "action",
    phaseState: { "Kanto-G1": { currentPhase: "action" } },
    players: [
      { id: "austin", name: "Austin", inventory: [] },
      { id: "steevee", name: "Steevee", inventory: [{ id: "exact-token-1", name: tokenName, type: "TOKEN", tokenDefinitionId: tokenId }] },
      { id: "gold", name: "Gold", inventory: [{ id: "gold-item-1", name: "Leftovers", type: "ITEM" }] }
    ],
    pokemonRecords: [
      { id: "austin-abra-1", trainerId: "austin", name: "Abra", status: "Active", rosterType: "Active" },
      { id: "gold-abra-2", trainerId: "gold", name: "Abra", status: "Active", rosterType: "Active" }
    ],
    interactionEvents: [],
    transactions: [],
    tokenConsumptions: [],
    log: [],
    lingeringStatuses: [],
    fieldTokens: [],
    actionPhaseState: {
      selections: {
        "Kanto-G1": {
          series: "Kanto",
          gym: 1,
          playerVisits: { austin: [], steevee: [], gold: [] },
          selectedLocationId: "encounter",
          turnOrderPlayerIds: ["austin", "steevee", "gold"],
          actionOperations: [],
          activeActionOperationId: "",
          destinationCommit: null
        }
      },
      seriesTrackers: {}
    }
  };
}

function lingeringCostState(balance = 1000) {
  const state = baseState({ tokenName: "Purge Curse", tokenId: "purge-curse" });
  state.players.find((player) => player.id === "steevee").balance = balance;
  state.players.find((player) => player.id === "gold").balance = 1000;
  state.lingeringStatuses.push({
    id: "gold-lingering-aroma",
    type: "ongoing-effect-text-replacement",
    status: "active",
    targetPlayerId: "gold",
    beneficiaryPlayerId: "gold",
    series: "Kanto",
    gym: 1,
    payload: { declarationCostAmount: 500 }
  });
  return state;
}

function seedGame(id, state = baseState()) {
  const game = {
    id,
    name: id,
    description: "isolated provisional declaration test",
    status: "active",
    maxPlayers: 5,
    members: [{ userId: "host", role: "owner" }],
    activity: [],
    version: 1,
    createdAt: "2026-07-28T12:00:00.000Z",
    updatedAt: "2026-07-28T12:00:00.000Z",
    state
  };
  fs.writeFileSync(path.join(gamesDir, `${id}.json`), JSON.stringify(game, null, 2));
  return game;
}

async function request(pathname, { method = "GET", body } = {}) {
  const response = await fetch(`${origin}${pathname}`, {
    method,
    headers: body ? { "content-type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined
  });
  const payload = await response.json();
  return { response, payload };
}

async function claim(id, version = 1, overrides = {}) {
  return request(`/api/games/${id}/provisional-declarations`, {
    method: "POST",
    body: {
      clientId: "test-client",
      expectedVersion: version,
      declarationId: overrides.declarationId || `${id}-declaration`,
      claimKey: overrides.claimKey || `${id}:claim`,
      declaringPlayerId: overrides.declaringPlayerId || "steevee",
      inventoryRecordId: overrides.inventoryRecordId || "exact-token-1",
      effectContractId: overrides.effectContractId || "incinerate",
      draftSelections: overrides.draftSelections || {}
    }
  });
}

test.before(async () => {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  origin = `http://127.0.0.1:${server.address().port}`;
});

test.after(async () => {
  await new Promise((resolve) => server.close(resolve));
  fs.rmSync(tempRoot, { recursive: true, force: true });
});

test("[PD-SERVER-001] Incinerate claims before targets, persists its draft, and confirms exactly once", async () => {
  const id = "provisional-incinerate";
  seedGame(id);
  const claimed = await claim(id);
  assert.equal(claimed.response.status, 201);
  assert.equal(claimed.payload.activity.payload.declarationStage, "provisional");
  assert.equal(claimed.payload.activity.payload.responsesAllowed, false);
  assert.equal(claimed.payload.state.players.find((player) => player.id === "steevee").inventory.length, 1);
  assert.equal(claimed.payload.state.tokenConsumptions.length, 0);

  const drafted = await request(`/api/games/${id}/provisional-declarations/${claimed.payload.activity.id}/draft`, {
    method: "PUT",
    body: {
      clientId: "test-client",
      declaringPlayerId: "steevee",
      expectedDeclarationRevision: 1,
      draftSelections: {
        resourceSelections: [{ playerId: "gold", resourceId: "gold-item-1" }],
        incinerateCards: { gold: { category: "item", query: "left", resourceId: "gold-item-1" } }
      }
    }
  });
  assert.equal(drafted.response.status, 200);
  assert.equal(drafted.payload.activity.payload.declarationRevision, 2);

  const refreshed = await request(`/api/games/${id}/state`);
  const restored = refreshed.payload.state.interactionEvents.find((entry) => entry.id === claimed.payload.activity.id);
  assert.equal(restored.payload.draftSelections.resourceSelections[0].resourceId, "gold-item-1");
  assert.equal(restored.payload.draftSelections.incinerateCards.gold.query, "left");

  const confirmed = await request(`/api/games/${id}/provisional-declarations/${claimed.payload.activity.id}/confirm`, {
    method: "POST",
    body: {
      clientId: "test-client",
      expectedVersion: drafted.payload.version,
      expectedDeclarationRevision: 2,
      declaringPlayerId: "steevee",
      draftSelections: restored.payload.draftSelections
    }
  });
  assert.equal(confirmed.response.status, 200);
  assert.equal(confirmed.payload.activity.payload.declarationStage, "confirmed");
  assert.equal(confirmed.payload.activity.payload.consumptionState, "consumed");
  assert.equal(confirmed.payload.state.tokenConsumptions.length, 1);
  assert.equal(confirmed.payload.state.players.find((player) => player.id === "steevee").inventory.length, 0);
  assert.equal(confirmed.payload.state.players.find((player) => player.id === "gold").inventory.length, 1, "resolution has not started during declaration confirmation");

  const duplicate = await request(`/api/games/${id}/provisional-declarations/${claimed.payload.activity.id}/confirm`, {
    method: "POST",
    body: {
      clientId: "test-client",
      expectedVersion: drafted.payload.version,
      expectedDeclarationRevision: 2,
      declaringPlayerId: "steevee",
      draftSelections: restored.payload.draftSelections
    }
  });
  assert.equal(duplicate.response.status, 200);
  assert.equal(duplicate.payload.duplicate, true);
  assert.equal(duplicate.payload.state.tokenConsumptions.length, 1);
});

test("[PD-SERVER-002] withdrawal and host release consume nothing and restore the same Action", async () => {
  const withdrawId = "provisional-withdraw";
  seedGame(withdrawId);
  const claimed = await claim(withdrawId);
  const withdrawn = await request(`/api/games/${withdrawId}/provisional-declarations/${claimed.payload.activity.id}/withdraw`, {
    method: "POST",
    body: {
      clientId: "test-client",
      expectedVersion: claimed.payload.version,
      declaringPlayerId: "steevee"
    }
  });
  assert.equal(withdrawn.response.status, 200);
  assert.equal(withdrawn.payload.activity.status, "withdrawn");
  assert.equal(withdrawn.payload.state.tokenConsumptions.length, 0);
  assert.equal(withdrawn.payload.state.players.find((player) => player.id === "steevee").inventory.length, 1);
  const gymState = withdrawn.payload.state.actionPhaseState.selections["Kanto-G1"];
  assert.equal(gymState.playerVisits.austin.length, 0);
  assert.equal(gymState.destinationCommit, null);

  const reclaimed = await claim(withdrawId, withdrawn.payload.version, {
    declarationId: `${withdrawId}-second-declaration`
  });
  assert.equal(reclaimed.response.status, 201);
  assert.notEqual(reclaimed.payload.activity.id, claimed.payload.activity.id);
  assert.equal(reclaimed.payload.activity.payload.declarationStage, "provisional");
  assert.equal(reclaimed.payload.state.tokenConsumptions.length, 0);

  const releaseId = "provisional-release";
  seedGame(releaseId);
  const abandoned = await claim(releaseId);
  const released = await request(`/api/games/${releaseId}/provisional-declarations/${abandoned.payload.activity.id}/release`, {
    method: "POST",
    body: { clientId: "host-client", expectedVersion: abandoned.payload.version, userId: "host" }
  });
  assert.equal(released.response.status, 200);
  assert.equal(released.payload.activity.status, "withdrawn");
  assert.equal(released.payload.state.tokenConsumptions.length, 0);
});

test("[PD-SERVER-003] claim and destination races accept only the first authoritative operation", async () => {
  const claimFirstId = "race-claim-first";
  seedGame(claimFirstId);
  const claimed = await claim(claimFirstId);
  const losingDestination = await request(`/api/games/${claimFirstId}/action-destination-commits`, {
    method: "POST",
    body: {
      clientId: "destination-client", expectedVersion: 1, requestId: "destination-loser", commitId: "destination-loser",
      playerId: "austin", actionNumber: 1, locationId: "encounter", serviceId: "encounter-roll"
    }
  });
  assert.equal(losingDestination.response.status, 409);
  assert.equal(losingDestination.payload.currentSituation.id, claimed.payload.activity.id);
  const claimFirstReload = await request(`/api/games/${claimFirstId}/state`);
  assert.equal(claimFirstReload.payload.state.actionPhaseState.selections["Kanto-G1"].destinationCommit, null);

  const destinationFirstId = "race-destination-first";
  seedGame(destinationFirstId);
  const destination = await request(`/api/games/${destinationFirstId}/action-destination-commits`, {
    method: "POST",
    body: {
      clientId: "destination-client", expectedVersion: 1, requestId: "destination-winner", commitId: "destination-winner",
      playerId: "austin", actionNumber: 1, locationId: "encounter", serviceId: "encounter-roll"
    }
  });
  assert.equal(destination.response.status, 201);
  const losingClaim = await claim(destinationFirstId, 1);
  assert.equal(losingClaim.response.status, 409);
  assert.equal(losingClaim.payload.currentSituation.id, "destination-winner");
  const destinationFirstReload = await request(`/api/games/${destinationFirstId}/state`);
  assert.equal(destinationFirstReload.payload.state.actionPhaseState.selections["Kanto-G1"].destinationCommit.id, "destination-winner");
  assert.equal(destinationFirstReload.payload.state.players.find((player) => player.id === "steevee").inventory.length, 1);
});

test("[PD-SERVER-004] duplicate and competing claims create one blocking situation", async () => {
  const id = "race-duplicate-claim";
  seedGame(id);
  const first = await claim(id, 1, { claimKey: "stable-claim" });
  const duplicate = await claim(id, 1, { claimKey: "stable-claim", declarationId: "different-client-id" });
  assert.equal(duplicate.response.status, 200);
  assert.equal(duplicate.payload.duplicate, true);
  assert.equal(duplicate.payload.activity.id, first.payload.activity.id);
  assert.equal(duplicate.payload.state.interactionEvents.filter((entry) => entry.status === "open").length, 1);

  const competing = await claim(id, first.payload.version, {
    claimKey: "other-claim",
    declaringPlayerId: "steevee",
    declarationId: "other-declaration"
  });
  assert.equal(competing.response.status, 409);
  assert.equal(competing.payload.state.interactionEvents.filter((entry) => entry.status === "open").length, 1);
});

test("[PD-SERVER-005] stale exact targets fail before consumption", async () => {
  const id = "provisional-stale-target";
  seedGame(id, baseState({ tokenName: "Wicked Blow", tokenId: "wicked-blow" }));
  const claimed = await claim(id, 1, { effectContractId: "wicked-blow" });
  assert.equal(claimed.response.status, 201);
  const draft = await request(`/api/games/${id}/provisional-declarations/${claimed.payload.activity.id}/draft`, {
    method: "PUT",
    body: {
      declaringPlayerId: "steevee",
      expectedDeclarationRevision: 1,
      draftSelections: { targetPokemonId: "austin-abra-1" }
    }
  });
  const staleState = structuredClone(draft.payload.state);
  staleState.pokemonRecords = staleState.pokemonRecords.filter((entry) => entry.id !== "austin-abra-1");
  const saved = await request(`/api/games/${id}/state`, {
    method: "PUT",
    body: { clientId: "target-moved", expectedVersion: draft.payload.version, state: staleState }
  });
  assert.equal(saved.response.status, 200);
  const confirmation = await request(`/api/games/${id}/provisional-declarations/${claimed.payload.activity.id}/confirm`, {
    method: "POST",
    body: {
      clientId: "test-client",
      expectedVersion: saved.payload.version,
      expectedDeclarationRevision: 2,
      declaringPlayerId: "steevee",
      draftSelections: { targetPokemonId: "austin-abra-1" }
    }
  });
  assert.equal(confirmation.response.status, 409);
  assert.match(confirmation.payload.reason, /Active Roster/i);
  const refreshed = await request(`/api/games/${id}/state`);
  assert.equal(refreshed.payload.state.tokenConsumptions.length, 0);
  assert.equal(refreshed.payload.state.players.find((player) => player.id === "steevee").inventory.length, 1);
});

test("[PD-SERVER-006] stale full-state saves cannot erase authoritative timing", async () => {
  const id = "provisional-stale-save";
  const initial = seedGame(id);
  const staleState = structuredClone(initial.state);
  const claimed = await claim(id);
  const overwrite = await request(`/api/games/${id}/state`, {
    method: "PUT",
    body: { clientId: "stale-client", state: staleState }
  });
  assert.equal(overwrite.response.status, 409);
  assert.equal(overwrite.payload.error, "authoritative-timing-conflict");
  const refreshed = await request(`/api/games/${id}/state`);
  assert.equal(refreshed.payload.state.interactionEvents.some((entry) => entry.id === claimed.payload.activity.id && entry.status === "open"), true);
});

test("[PD-SERVER-007] Lingering Aroma declaration cost is confirmed once, blocks insufficient funds, and ignores withdrawal", async () => {
  const successId = "lingering-cost-success";
  seedGame(successId, lingeringCostState());
  const claimed = await claim(successId, 1, {
    effectContractId: "purge-curse",
    draftSelections: { targetPlayerId: "gold" }
  });
  assert.equal(claimed.response.status, 201);
  assert.equal(claimed.payload.state.players.find((player) => player.id === "steevee").balance, 1000);
  const confirmed = await request(`/api/games/${successId}/provisional-declarations/${claimed.payload.activity.id}/confirm`, {
    method: "POST",
    body: {
      clientId: "test-client",
      expectedVersion: claimed.payload.version,
      expectedDeclarationRevision: 1,
      declaringPlayerId: "steevee",
      draftSelections: { targetPlayerId: "gold" }
    }
  });
  assert.equal(confirmed.response.status, 200);
  assert.equal(confirmed.payload.state.players.find((player) => player.id === "steevee").balance, 500);
  assert.equal(confirmed.payload.state.players.find((player) => player.id === "gold").balance, 1500);
  assert.equal(confirmed.payload.state.tokenConsumptions.length, 1);
  assert.ok(confirmed.payload.activity.payload.lingeringAromaDeclarationCostOperationId);
  const duplicate = await request(`/api/games/${successId}/provisional-declarations/${claimed.payload.activity.id}/confirm`, {
    method: "POST",
    body: {
      clientId: "test-client",
      expectedVersion: claimed.payload.version,
      expectedDeclarationRevision: 1,
      declaringPlayerId: "steevee",
      draftSelections: { targetPlayerId: "gold" }
    }
  });
  assert.equal(duplicate.response.status, 200);
  assert.equal(duplicate.payload.duplicate, true);
  assert.equal(duplicate.payload.state.players.find((player) => player.id === "steevee").balance, 500);
  assert.equal(duplicate.payload.state.players.find((player) => player.id === "gold").balance, 1500);

  const blockedId = "lingering-cost-blocked";
  seedGame(blockedId, lingeringCostState(400));
  const blockedClaim = await claim(blockedId, 1, {
    effectContractId: "purge-curse",
    draftSelections: { targetPlayerId: "gold" }
  });
  const blocked = await request(`/api/games/${blockedId}/provisional-declarations/${blockedClaim.payload.activity.id}/confirm`, {
    method: "POST",
    body: {
      clientId: "test-client",
      expectedVersion: blockedClaim.payload.version,
      expectedDeclarationRevision: 1,
      declaringPlayerId: "steevee",
      draftSelections: { targetPlayerId: "gold" }
    }
  });
  assert.equal(blocked.response.status, 409);
  assert.equal(blocked.payload.error, "illegal-declaration-cost");
  const blockedReload = await request(`/api/games/${blockedId}/state`);
  assert.equal(blockedReload.payload.state.players.find((player) => player.id === "steevee").balance, 400);
  assert.equal(blockedReload.payload.state.players.find((player) => player.id === "gold").balance, 1000);
  assert.equal(blockedReload.payload.state.tokenConsumptions.length, 0);

  const withdrawId = "lingering-cost-withdraw";
  seedGame(withdrawId, lingeringCostState());
  const withdrawClaim = await claim(withdrawId, 1, {
    effectContractId: "purge-curse",
    draftSelections: { targetPlayerId: "gold" }
  });
  const withdrawn = await request(`/api/games/${withdrawId}/provisional-declarations/${withdrawClaim.payload.activity.id}/withdraw`, {
    method: "POST",
    body: { clientId: "test-client", expectedVersion: withdrawClaim.payload.version, declaringPlayerId: "steevee" }
  });
  assert.equal(withdrawn.response.status, 200);
  assert.equal(withdrawn.payload.state.players.find((player) => player.id === "steevee").balance, 1000);
  assert.equal(withdrawn.payload.state.players.find((player) => player.id === "gold").balance, 1000);
  assert.equal(withdrawn.payload.state.tokenConsumptions.length, 0);
});
