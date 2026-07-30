"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const runtime = require("../encounter-token-runtime.js");

function fixture() {
  return {
    series: "Kanto",
    gym: 1,
    currentPhase: "action",
    phaseState: { "Kanto:G1": { currentPhase: "action", flowState: "action" } },
    players: [{ id: "red", name: "Red" }, { id: "gold", name: "Gold" }],
    encounterSessions: []
  };
}

const wheel = {
  id: "kanto-gym-1",
  entries: [{ id: "abra", pokemonName: "Abra", weight: 1 }]
};

test("[ETR-001] Extra Encounter fails before mutation outside Action Phase or without a legal target", () => {
  const state = fixture();
  state.currentPhase = "battle";
  state.phaseState["Kanto:G1"].currentPhase = "battle";
  assert.equal(runtime.validateExtraEncounter(state, { playerId: "gold" }, { wheelDefinition: wheel }).ok, false);
  assert.equal(state.encounterSessions.length, 0);
  state.currentPhase = "action";
  state.phaseState["Kanto:G1"].currentPhase = "action";
  assert.equal(runtime.validateExtraEncounter(state, { playerId: "missing" }, { wheelDefinition: wheel }).ok, false);
  assert.equal(runtime.validateExtraEncounter(state, { playerId: "gold" }, { wheelDefinition: null }).ok, false);
  assert.equal(state.encounterSessions.length, 0);
});

test("[ETR-002] Extra Encounter creates one standalone authoritative roll for the chosen player", () => {
  const state = fixture();
  const result = runtime.grantExtraEncounter(state, {
    playerId: "gold",
    sourceTokenId: "token-extra-1",
    sourceActivationId: "activation-extra-1"
  }, {
    wheelDefinition: wheel,
    sessionId: "session-extra-1",
    grantId: "grant-extra-1",
    now: "2026-07-29T12:00:00.000Z"
  });
  assert.equal(result.ok, true);
  assert.equal(result.created, true);
  assert.equal(result.session.playerId, "gold");
  assert.equal(result.session.maxRolls, 1);
  assert.equal(result.session.actionVisitId, "");
  assert.equal(result.session.extraEncounterGrants[0].sourceTokenId, "token-extra-1");
});

test("[ETR-003] an open Encounter session receives exactly one additional roll", () => {
  const state = fixture();
  state.encounterSessions.push({
    id: "normal-session",
    playerId: "gold",
    series: "Kanto",
    gym: 1,
    wheelId: wheel.id,
    maxRolls: 2,
    rolls: [{ id: "roll-1" }, { id: "roll-2" }],
    status: "review",
    extraEncounterGrants: []
  });
  const result = runtime.grantExtraEncounter(state, {
    playerId: "gold",
    sourceTokenId: "token-extra-2"
  }, { wheelDefinition: wheel, grantId: "grant-extra-2" });
  assert.equal(result.created, false);
  assert.equal(result.session.id, "normal-session");
  assert.equal(result.session.maxRolls, 3);
  assert.equal(result.session.status, "pending");
});

test("[ETR-004] duplicate completion cannot grant a second roll", () => {
  const state = fixture();
  const input = { playerId: "gold", sourceTokenId: "token-extra-3", sourceActivationId: "activation-extra-3" };
  const first = runtime.grantExtraEncounter(state, input, {
    wheelDefinition: wheel,
    sessionId: "session-extra-3",
    grantId: "grant-extra-3"
  });
  const second = runtime.grantExtraEncounter(state, input, { wheelDefinition: wheel });
  assert.equal(first.session.maxRolls, 1);
  assert.equal(second.duplicate, true);
  assert.equal(second.session.maxRolls, 1);
  assert.equal(second.session.extraEncounterGrants.length, 1);
});

test("[ETR-005] refresh preserves the exact session and grant identity", () => {
  const state = fixture();
  runtime.grantExtraEncounter(state, {
    playerId: "red",
    sourceTokenId: "token-extra-4"
  }, {
    wheelDefinition: wheel,
    sessionId: "session-extra-4",
    grantId: "grant-extra-4"
  });
  const reloaded = JSON.parse(JSON.stringify(state));
  const duplicate = runtime.grantExtraEncounter(reloaded, {
    playerId: "red",
    sourceTokenId: "token-extra-4"
  }, { wheelDefinition: wheel });
  assert.equal(duplicate.duplicate, true);
  assert.equal(duplicate.session.id, "session-extra-4");
  assert.equal(duplicate.grant.id, "grant-extra-4");
});
