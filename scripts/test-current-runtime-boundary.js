#!/usr/bin/env node
"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const RUNTIME_FILES = [
  "app.js",
  "server.js",
  "index.html",
  "game-shell-contract.js",
  "token-effect-contract.js",
  "token-control-effects.js",
  "token-control-controller.js",
  "token-sandbox-session.js",
];

const sources = Object.fromEntries(
  RUNTIME_FILES.map((rel) => [rel, fs.readFileSync(path.join(ROOT, rel), "utf8")])
);
const app = sources["app.js"];
const combinedRuntime = RUNTIME_FILES.map((rel) => `\n/* ${rel} */\n${sources[rel]}`).join("\n");

test("current Action Phase mounts the Route-era runtime", () => {
  assert.match(app, /function renderActionPhase\(\)\s*\{\s*renderV2RouteActionPhase\(\);\s*\}/);
  assert.match(combinedRuntime, /ACTION_PHASE_VERSION_V2\s*=\s*"action-phase-v2-real-series"/);
  assert.match(app, /function v2EnsureRouteSeriesState\(/);
  assert.match(app, /function v2CommitRouteAction\(/);
  assert.match(app, /function v2DrawRouteActionEncounter\(/);
  assert.match(app, /function v2FinalizeRouteActionAcquisition\(/);
  assert.match(app, /routeEncounterBySeriesId/);
});

test("retired Action, Encounter Wheel, and Hidden Grotto entrypoints stay absent", () => {
  const retiredMarkers = [
    "ACTION_PHASE_VERSION_V1",
    '"action-phase-v1-current-series"',
    "renderV1ActionPhase",
    "hiddenGrottoSessions",
    "startHiddenGrottoSession",
    "renderHiddenGrotto",
    "createHiddenGrottoActionSession",
    "completeHiddenGrotto",
    "hidden-grotto-choice-complete",
    "encounterSessions",
    "selectedEncounterSessionId",
    "encounterModalOpen",
    "encounterWheelDefinitions",
    "encounterWheelDefinition(",
    "startEncounterSession(",
    "spinEncounterWheel(",
    "renderEncounterOverlay(",
    "encounterSessionId",
    "encounterRollId",
    "encounterCopyRecords",
    "currentEncounterPendingActivity",
    "recordEncounterTokenUse",
    "undoEncounterActionVisit",
    '"encounter-result"',
    'sourceType: "encounter"',
    'sourceType === "encounter"',
    'serviceId: "encounter-wheel"',
    'locationId: "encounter"',
  ];

  for (const marker of retiredMarkers) {
    assert.equal(combinedRuntime.includes(marker), false, `retired runtime marker returned: ${marker}`);
  }
});

test("current Route Pokemon-result and Token hooks remain mounted", () => {
  for (const marker of [
    "function rerollRandomPokemonSession(",
    "function recordPokemonResultTokenUse(",
    "function useV2RouteRerollToken(",
    "function useV2ExtraEncounter(",
    "function applyV2RouteRepel(",
    "function useV2MasterBallOnOpportunity(",
  ]) {
    assert.equal(app.includes(marker), true, `current runtime marker missing: ${marker}`);
  }
});
