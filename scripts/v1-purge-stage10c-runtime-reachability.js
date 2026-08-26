#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const FILES = [
  "app.js",
  "server.js",
  "index.html",
  "token-effect-contract.js",
  "token-control-effects.js",
];

function read(rel) {
  const file = path.join(ROOT, rel);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function count(text, marker) {
  let total = 0;
  let from = 0;
  while (true) {
    const at = text.indexOf(marker, from);
    if (at < 0) return total;
    total += 1;
    from = at + Math.max(1, marker.length);
  }
}

const sources = Object.fromEntries(FILES.map((rel) => [rel, read(rel)]));
const app = sources["app.js"];
const server = sources["server.js"];
const index = sources["index.html"];
const combinedRuntime = FILES.map((rel) => `\n/* ${rel} */\n${sources[rel]}`).join("\n");

const failures = [];
const passes = [];

function requireMarker(label, text, marker) {
  if (!text.includes(marker)) failures.push(`${label}: missing ${JSON.stringify(marker)}`);
  else passes.push(label);
}

function forbidMarker(label, text, marker) {
  const hits = count(text, marker);
  if (hits) failures.push(`${label}: found ${hits} occurrence(s) of ${JSON.stringify(marker)}`);
  else passes.push(label);
}

// Positive current-runtime invariants. These prove the mounted Action path is V2 Route,
// rather than merely proving that old strings disappeared.
requireMarker(
  "Action Phase delegates directly to V2 Route",
  app,
  "function renderActionPhase() {\n  renderV2RouteActionPhase();\n}"
);
requireMarker("V2 Action Phase version is defined", combinedRuntime, 'ACTION_PHASE_VERSION_V2 = "action-phase-v2-real-series"');
requireMarker("V2 Route series state is mounted", app, "function v2EnsureRouteSeriesState(");
requireMarker("V2 Route action commit is mounted", app, "function v2CommitRouteAction(");
requireMarker("V2 Route encounter draw is mounted", app, "function v2DrawRouteActionEncounter(");
requireMarker("V2 Route acquisition is mounted", app, "function v2FinalizeRouteActionAcquisition(");
requireMarker("Route state persists in V2 bucket", app, "routeEncounterBySeriesId");
requireMarker("Current Pokémon-result reroll infrastructure survives", app, "function rerollRandomPokemonSession(");
requireMarker("Current Pokémon-result token tracking survives", app, "function recordPokemonResultTokenUse(");
requireMarker("Current Route Reroll survives", app, "function useV2RouteRerollToken(");
requireMarker("Current Route Extra Encounter survives", app, "function useV2ExtraEncounter(");
requireMarker("Current Route Repel survives", app, "function applyV2RouteRepel(");
requireMarker("Current Route Master Ball survives", app, "function useV2MasterBallOnOpportunity(");

// Retired V1 Action/version runtime. These are exact executable identities, not broad V1 wording.
for (const marker of [
  "ACTION_PHASE_VERSION_V1",
  '"action-phase-v1-current-series"',
  "renderV1ActionPhase",
]) {
  forbidMarker(`No retired V1 Action runtime: ${marker}`, combinedRuntime, marker);
}

// Retired Hidden Grotto runtime. Generic prose such as "Hidden Grotto" is intentionally NOT checked.
for (const marker of [
  "hiddenGrottoSessions",
  "startHiddenGrottoSession",
  "renderHiddenGrotto",
  "createHiddenGrottoActionSession",
  "completeHiddenGrotto",
  "hidden-grotto-choice-complete",
]) {
  forbidMarker(`No retired Hidden Grotto runtime: ${marker}`, combinedRuntime, marker);
}

// Retired V1 Encounter Wheel runtime and its state/event bridges. Generic "encounter" terminology
// is intentionally allowed because Routes, Pokémon results, and live Tokens still use that concept.
for (const marker of [
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
  'type: "encounter-result"',
  '"encounter-result"',
  'sourceType: "encounter"',
  'sourceType === "encounter"',
  'serviceId: "encounter-wheel"',
  'locationId: "encounter"',
]) {
  forbidMarker(`No retired Encounter runtime: ${marker}`, combinedRuntime, marker);
}

// The current browser shell must not expose a selector or fallback that can deliberately choose V1.
forbidMarker("New-game shell has no V1 Action selector", index, "action-phase-v1");
forbidMarker("Server has no V1 Action version constant", server, "ACTION_PHASE_VERSION_V1");

console.log("\n=== Stage 10C runtime reachability gate ===");
if (failures.length) {
  for (const failure of failures) console.error(`FAIL ${failure}`);
  console.error(`\n${failures.length} runtime-reachability gate(s) failed.`);
  process.exitCode = 1;
} else {
  console.log(`PASS ${passes.length}/${passes.length} runtime-reachability gates.`);
  console.log("No production path to V1 Action, V1 Encounter Wheel, or Hidden Grotto runtime was detected.");
  console.log("Route-era Pokémon-result and Route Token infrastructure remains present.");
}

if (process.env.GITHUB_STEP_SUMMARY) {
  const lines = [
    "## Stage 10C — V1 runtime reachability",
    "",
    failures.length
      ? `**FAIL — ${failures.length} runtime-reachability gate(s) failed.**`
      : `**PASS — ${passes.length}/${passes.length} runtime-reachability gates passed.**`,
    "",
    "Scope: production/runtime entry points and exact retired state/handler identities only. Historical docs, purge archaeology, and generic Encounter-era Token wording are outside this gate.",
    "",
  ];
  if (failures.length) {
    lines.push("### Failures", "", ...failures.map((failure) => `- ${failure}`), "");
  }
  fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, lines.join("\n"), "utf8");
}
