#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const BRANCH = "audit/purge-v1-runtime";
const REPORT_REL = "V1_PURGE_STAGE9_POST_HONEY_SURVEY.md";
const REPORT = path.join(ROOT, REPORT_REL);
const FILES = [
  "app.js",
  "index.html",
  "server.js",
  "styles.css",
  "token-effect-contract.js",
  "token-control-effects.js",
  "scripts/run-token-qa-coverage.js",
  "scripts/test-token-sandbox.js",
  "package.json",
];

const GROUPS = Object.freeze({
  "Retired Action/Encounter runtime": [
    "ACTION_PHASE_VERSION_V1",
    "renderV1ActionPhase",
    "hiddenGrottoSessions",
    "startHiddenGrottoSession",
    "encounterSessions",
    "selectedEncounterSessionId",
    "encounterModalOpen",
    "encounterWheelDefinition(",
    "startEncounterSession(",
    "spinEncounterWheel(",
    "renderEncounterOverlay(",
    "encounter-token-runtime",
    "Open Encounter Wheel",
    "Encounter Wheel",
    'sourceType === "encounter"',
    'sourceType: "encounter"',
    'locationId: "encounter"',
    'serviceId: "encounter-wheel"',
  ],
  "Honey retired bridge": [
    "honey-end-action",
    "honey-encounter-copy",
    "ensureHoneyEndOfActionProcedures",
    "resolveHoneyEndOfActionProcedure",
    "skipHoneyEndOfActionProcedure",
    "honeyEligibleEncounterResults",
    "augmentHoneyCausalUndoAfterAcquisition",
    "Honey copied Encounter",
    "copiedFromRandomPokemonSessionId",
  ],
  "Legacy Encounter Live Referee channel": [
    '"encounter-result"',
    '"encounter-reroll"',
    '"steal-encounter"',
    "TOKEN_TIMING_CATEGORIES.ENCOUNTER",
    "TOKEN_USE_TYPES.ENCOUNTER_MODIFIER",
    "TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT",
    "TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_TOKEN",
    "EFFECT_TARGET_TYPES.ENCOUNTER_RESULT",
    "EFFECT_TARGET_CATEGORIES.ENCOUNTER_RESULT",
    "createPokemonResultTimingWindow",
    "currentEncounterPendingActivity",
    "liveRefereePromptIsEncounterResult",
    "recordEncounterTokenUse",
  ],
  "Encounter contract/resolver residue": [
    'resolverId: "reroll"',
    'resolverId: "extraEncounter"',
    'resolverId: "encounterWheelEdit"',
    'resolverId: "encounterTransfer"',
    'resolverId: "encounterGrant"',
    'resolverId: "encounterCopy"',
    'resolverId: "encounterChoose"',
    '"encounterWheelEdit"',
    '"encounterTransfer"',
    '"encounterGrant"',
    '"encounterCopy"',
    '"encounterChoose"',
    "encounterBeforeRoll",
    "encounterResult",
    "currentActionPhase",
    "Hidden Grotto",
  ],
  "Current Route token runtime": [
    "V2_ROUTE_TOKEN_IDS",
    "useV2RouteRerollToken",
    "useV2ExtraEncounter",
    "applyV2RouteRepel",
    "useV2MasterBallOnOpportunity",
  ],
  "V1-named current infrastructure": [
    "TOKEN_TIMING_ENGINE_V1_DEFINITIONS",
    "V1_PURGE",
    "v1-purge",
  ],
  "Stale QA/tooling": [
    "test-encounter-token-runtime.js",
    "encounterTokenRuntime",
    "grantExtraEncounter",
    "encounter runtime",
    "Encounter runtime",
  ],
});

function git(args, inherit = false) {
  const out = execFileSync("git", args, { cwd: ROOT, encoding: "utf8", stdio: inherit ? "inherit" : ["ignore", "pipe", "pipe"] });
  return typeof out === "string" ? out.trim() : "";
}
function count(text, needle) { return text.split(needle).length - 1; }
function clean(s) { return String(s || "").replace(/\r/g, ""); }
function lineNo(text, idx) { return clean(text.slice(0, idx)).split("\n").length; }
function all(text, marker) {
  const out = [];
  let from = 0;
  while (true) {
    const at = text.indexOf(marker, from);
    if (at < 0) return out;
    out.push(at);
    from = at + Math.max(1, marker.length);
  }
}
function ctx(text, idx, radius = 2) {
  const normalized = clean(text);
  const line = lineNo(text, idx);
  const lines = normalized.split("\n");
  const start = Math.max(1, line - radius);
  const end = Math.min(lines.length, line + radius);
  const body = [];
  for (let n = start; n <= end; n++) body.push(`${String(n).padStart(6, " ")} | ${lines[n - 1].replace(/[ \t]+$/g, "")}`);
  return { line, body: body.join("\n") };
}
function sanitize(lines) {
  return lines.join("\n").replace(/\r/g, "").split("\n").map((line) => line.replace(/[ \t]+$/g, "")).join("\n").replace(/\n+$/g, "") + "\n";
}

try {
  if (git(["branch", "--show-current"]) !== BRANCH) throw new Error(`Run only on ${BRANCH}.`);
  const status = git(["status", "--porcelain"]);
  if (status) throw new Error(`Working tree must be clean.\n${status}`);

  const app = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");
  for (const marker of [
    "function renderActionPhase() {\n  renderV2RouteActionPhase();\n}",
    "const V2_ROUTE_TOKEN_IDS",
    "function useV2RouteRerollToken(",
    "function useV2ExtraEncounter(",
    "function applyV2RouteRepel(",
    "function useV2MasterBallOnOpportunity(",
    "randomPokemonSessions: []",
    "function renderRandomPokemonPanel(",
    "function renderWheelPanel(",
  ]) if (!app.includes(marker)) throw new Error(`Current runtime invariant missing: ${marker}`);

  for (const marker of [
    "state.encounterSessions",
    "function startEncounterSession(",
    "encounterWheelDefinition(",
    'pending?.sourceType === "honey-end-action"',
    "function ensureHoneyEndOfActionProcedures(",
    "function resolveHoneyEndOfActionProcedure(",
    "function skipHoneyEndOfActionProcedure(",
  ]) if (app.includes(marker)) throw new Error(`Prior purge invariant failed: ${marker}`);

  const head = git(["rev-parse", "HEAD"]);
  const hits = [];
  for (const rel of FILES) {
    const full = path.join(ROOT, rel);
    if (!fs.existsSync(full)) continue;
    const text = fs.readFileSync(full, "utf8");
    for (const [group, markers] of Object.entries(GROUPS)) {
      for (const marker of markers) {
        for (const at of all(text, marker)) {
          const c = ctx(text, at);
          hits.push({ group, rel, marker, line: c.line, context: c.body });
        }
      }
    }
  }

  const unique = [];
  const seen = new Set();
  for (const hit of hits) {
    const key = `${hit.group}\0${hit.rel}\0${hit.marker}\0${hit.line}`;
    if (!seen.has(key)) { seen.add(key); unique.push(hit); }
  }
  unique.sort((a, b) => a.group.localeCompare(b.group) || a.rel.localeCompare(b.rel) || a.line - b.line || a.marker.localeCompare(b.marker));

  const report = [
    "# V1 Purge Stage 9 — Post-Honey Production Survey",
    "",
    `Generated from \`${head}\`.`,
    "",
    "Fresh survey after Stage 8E. It covers production runtime, token contracts/control effects, and executable QA wiring only.",
    "",
    "## Summary",
    "",
    "| Group | File | Marker | Count | Lines |",
    "|---|---|---|---:|---|",
  ];
  const summary = new Map();
  for (const hit of unique) {
    const key = `${hit.group}\0${hit.rel}\0${hit.marker}`;
    const item = summary.get(key) || { ...hit, lines: [] };
    item.lines.push(hit.line);
    summary.set(key, item);
  }
  for (const item of summary.values()) report.push(`| ${item.group} | \`${item.rel}\` | \`${item.marker.replace(/\|/g, "\\|")}\` | ${item.lines.length} | ${item.lines.join(", ")} |`);

  report.push("", "## Detailed contexts", "");
  let section = "";
  for (const hit of unique) {
    const next = `${hit.group} — ${hit.rel}`;
    if (next !== section) { section = next; report.push(`### ${hit.group} — \`${hit.rel}\``, ""); }
    report.push(`#### \`${hit.marker}\` — line ${hit.line}`, "", "```text", hit.context, "```", "");
  }

  fs.writeFileSync(REPORT, sanitize(report), "utf8");
  git(["add", REPORT_REL]);
  execFileSync("git", ["diff", "--cached", "--check"], { cwd: ROOT, stdio: "inherit" });
  const stat = git(["diff", "--cached", "--stat"]);
  if (!stat) throw new Error("Survey produced no staged report.");
  console.log(`\n${stat}`);
  git(["commit", "-m", "Map post-Honey V1 residue"], true);
  git(["push", "origin", BRANCH], true);
  console.log(`\nStage 9A complete: wrote and pushed ${REPORT_REL}.`);
} catch (error) {
  console.error(`\nV1 purge Stage 9A failed safely:\n${error.message}`);
  process.exitCode = 1;
}
