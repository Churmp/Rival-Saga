"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");

const runtime = require("../token-inventory-runtime.js");
const contract = require("../token-effect-contract.js");

const appSource = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");

function sourceToken(overrides = {}) {
  return {
    id: "owned-immunity-1",
    canonicalId: "immunity",
    name: "Immunity",
    type: "TOKEN",
    tokenType: "protection",
    ...overrides
  };
}

function context(overrides = {}) {
  return {
    series: "Kanto",
    gym: 2,
    phase: "action",
    seriesOrder: ["Kanto", "Johto", "Hoenn"],
    ...overrides
  };
}

test("[TIR-001] 7 Tools creates an exact temporary copy without mutating the source record", () => {
  const source = sourceToken();
  const copy = runtime.temporaryCopy(source, {
    id: "temporary-immunity-1",
    ownerPlayerId: "player-b",
    sourceDefinitionId: "immunity",
    sourceActivationId: "response-immunity",
    sourceResponseId: "response-immunity",
    ...context()
  });
  assert.notEqual(copy, source);
  assert.equal(source.tokenRuntimeState, undefined);
  assert.equal(copy.id, "temporary-immunity-1");
  assert.equal(copy.canonicalId, "immunity");
  assert.equal(copy.tokenRuntimeState.kind, runtime.RUNTIME_KINDS.TEMPORARY_COPY);
  assert.equal(copy.tokenRuntimeState.sourceTokenId, source.id);
  assert.equal(runtime.itemAvailability(copy, context()).ok, true);
  assert.equal(runtime.itemAvailability(copy, context({ gym: 3, phase: "start" })).ok, false);
});

test("[TIR-002] unused temporary copies expire once and other inventory records remain", () => {
  const copy = runtime.temporaryCopy(sourceToken(), {
    id: "temporary-immunity-2",
    ownerPlayerId: "player-b",
    sourceDefinitionId: "immunity",
    ...context()
  });
  const permanent = sourceToken({ id: "permanent-immunity" });
  const players = [{ id: "player-b", inventory: [copy, permanent] }];
  const result = runtime.expireInventory(players, context({ gym: 3, phase: "start" }), { now: "2026-07-26T12:00:00.000Z" });
  assert.deepEqual(players[0].inventory.map((item) => item.id), ["permanent-immunity"]);
  assert.deepEqual(result.removedTemporaryCopies.map((entry) => entry.item.id), ["temporary-immunity-2"]);
  assert.equal(result.completedCooldowns.length, 0);
  assert.equal(runtime.expireInventory(players, context({ gym: 3, phase: "start" })).removedTemporaryCopies.length, 0);
});

test("[TIR-003] Counterspell restores the same exact Token ID on a two-Gym phase anchor", () => {
  const source = sourceToken({ id: "owned-restrict-1", canonicalId: "restrict-token", name: "Restrict Token", tokenType: "control" });
  const restored = runtime.cooldownRestoration(source, {
    ownerPlayerId: "player-a",
    sourceDefinitionId: "restrict-token",
    sourceActivationId: "event-restrict",
    sourceResponseId: "response-counterspell",
    cooldownGyms: 2,
    anchorPhase: "action",
    ...context()
  });
  assert.equal(restored.id, source.id);
  assert.equal(restored.tokenRuntimeState.sourceTokenId, source.id);
  assert.equal(runtime.itemAvailability(restored, context()).ok, false);
  assert.equal(runtime.itemAvailability(restored, context({ gym: 3, phase: "shop" })).ok, false);
  assert.equal(runtime.itemAvailability(restored, context({ gym: 4, phase: "start" })).ok, false);
  assert.equal(runtime.itemAvailability(restored, context({ gym: 4, phase: "action" })).ok, true);
});

test("[TIR-004] completed cooldown records remain exact, become usable, and survive JSON reload", () => {
  const restored = runtime.cooldownRestoration(sourceToken({ id: "owned-immunity-cooldown" }), {
    ownerPlayerId: "player-a",
    sourceDefinitionId: "immunity",
    cooldownGyms: 2,
    anchorPhase: "action",
    ...context()
  });
  const players = JSON.parse(JSON.stringify([{ id: "player-a", inventory: [restored] }]));
  const result = runtime.expireInventory(players, context({ gym: 4, phase: "action" }), { now: "2026-07-26T12:30:00.000Z" });
  assert.equal(players[0].inventory[0].id, "owned-immunity-cooldown");
  assert.equal(players[0].inventory[0].tokenRuntimeState.status, runtime.RUNTIME_STATUSES.EXPIRED);
  assert.equal(runtime.itemAvailability(players[0].inventory[0], context({ gym: 4, phase: "action" })).ok, true);
  assert.deepEqual(result.completedCooldowns.map((entry) => entry.itemId), ["owned-immunity-cooldown"]);
  assert.equal(runtime.expireInventory(players, context({ gym: 4, phase: "shop" })).completedCooldowns.length, 0);
});

test("[TIR-005] contract safety and production wiring fail closed around atomic response inventory work", () => {
  assert.equal(contract.runtimeResultSafetyFor("seven-tools", { closed: true, negatedProtectionToken: true }).ok, false);
  assert.equal(contract.runtimeResultSafetyFor("seven-tools", {
    closed: true,
    negatedProtectionToken: true,
    temporaryCopyTokenId: "temporary-immunity-1"
  }).ok, true);
  assert.match(appSource, /specialTokenResponseResolutionPlan\(activity, promptStep, draft\.actorPlayerId, metadata, draft\)/);
  assert.match(appSource, /Safeguard prevents this player's Protection Token from being copied/);
  assert.match(appSource, /tokenInventoryRuntime\.temporaryCopy\(plan\.sourceItem/);
  assert.match(appSource, /tokenInventoryRuntime\.cooldownRestoration\(plan\.sourceItem/);
  assert.match(appSource, /state\.players = previousPlayers;\s*state\.tokenConsumptions = previousConsumptions;/);
  assert.match(appSource, /cancelFailedTokenResponseAndRefund\(activity, step/);
});
