#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const BRANCH = "audit/purge-v1-runtime";
const REPORT_REL = "V1_PURGE_STAGE9E_FINAL_PRODUCTION_RESIDUE.md";
const REPORT = path.join(ROOT, REPORT_REL);
const FILES = ["app.js", "server.js", "index.html", "styles.css", "token-effect-contract.js", "token-control-effects.js"];

const GROUPS = Object.freeze({
  "Retired Encounter runtime identity": [
    '"encounter-result"',
    '"encounter-before-roll"',
    "encounterBeforeRoll",
    "encounterCopyRecords",
    "encounterSessionId",
    "encounterRollId",
    "undoEncounterActionVisit",
    "startEncounterSession",
    "encounterSessions",
    "renderEncounterOverlay",
    "encounterWheelDefinition",
    "Encounter Wheel",
    "encounter-wheel",
  ],
  "Encounter timing/target taxonomy": [
    "TOKEN_TIMING_CATEGORIES.ENCOUNTER",
    "TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT",
    "TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_TOKEN",
    "EFFECT_TARGET_CATEGORIES.ENCOUNTER_RESULT",
    "EFFECT_TARGET_TYPES.ENCOUNTER_RESULT",
    "TOKEN_USE_TYPES.ENCOUNTER_MODIFIER",
    'ENCOUNTER: "encounter"',
    'ENCOUNTER_RESULT: "encounterResult"',
    'ENCOUNTER_TOKEN: "encounterToken"',
    'ENCOUNTER_MODIFIER: "encounterModifier"',
  ],
  "Old Encounter token wording": [
    "Reroll any wheel result",
    "roll an extra encounter",
    "encounter wheel",
    "Encounter Wheel",
    "steal another player\'s encounter",
    "copy that encounter",
    "Choose your encounter",
    "Before an encounter wheel",
    "Encounter Tokens",
    "Encounter Token",
  ],
  "Shared/current result infrastructure": [
    '"pokemon-result"',
    "createPokemonResultTimingWindow",
    "liveResultSessionForActivity",
    "recordPokemonResultTokenUse",
    "rerollRandomPokemonSession",
    "randomPokemonSessions",
  ],
  "Current Route token infrastructure": [
    "V2_ROUTE_TOKEN_IDS",
    "useV2RouteRerollToken",
    "useV2ExtraEncounter",
    "applyV2RouteRepel",
    "useV2MasterBallOnOpportunity",
  ],
  "Version/V1 production residue": [
    "ACTION_PHASE_VERSION_V1",
    "renderV1ActionPhase",
    "current-action-phase",
    "legacy-action-phase",
    "action-phase-v1",
  ],
  "Hidden Grotto text/config (rules-review deferred)": [
    "Hidden Grotto",
    "hidden-grotto",
    "hiddenGrotto",
  ],
});

function git(args, inherit = false) {
  const out = execFileSync("git", args, { cwd: ROOT, encoding: "utf8", stdio: inherit ? "inherit" : ["ignore", "pipe", "pipe"] });
  return typeof out === "string" ? out.trim() : "";
}
function all(text, marker) {
  const out = []; let from = 0;
  while (true) { const at = text.indexOf(marker, from); if (at < 0) return out; out.push(at); from = at + Math.max(1, marker.length); }
}
function clean(text) { return String(text || "").replace(/\r/g, ""); }
function lineOf(text, at) { return clean(text.slice(0, at)).split("\n").length; }
function context(text, at, radius = 2) {
  const src = clean(text), line = lineOf(text, at), lines = src.split("\n");
  const start = Math.max(1, line - radius), end = Math.min(lines.length, line + radius), body = [];
  for (let n = start; n <= end; n += 1) body.push(`${String(n).padStart(6, " ")} | ${lines[n - 1].replace(/[ \t]+$/g, "")}`);
  return { line, body: body.join("\n") };
}
function sanitize(lines) {
  return lines.join("\n").replace(/\r/g, "").split("\n").map((line) => line.replace(/[ \t]+$/g, "")).join("\n").replace(/\n+$/g, "") + "\n";
}

try {
  if (git(["branch", "--show-current"]) !== BRANCH) throw new Error(`Run only on ${BRANCH}.`);
  const status = git(["status", "--porcelain"]);
  if (status) throw new Error(`Working tree must be clean before Stage 9E.\n${status}`);
  const app = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");
  const server = fs.readFileSync(path.join(ROOT, "server.js"), "utf8");
  for (const marker of [
    "function renderActionPhase() {\n  renderV2RouteActionPhase();\n}",
    "function useV2RouteRerollToken(",
    "function useV2ExtraEncounter(",
    "function applyV2RouteRepel(",
    "function useV2MasterBallOnOpportunity(",
    "function rerollRandomPokemonSession(",
    "function recordPokemonResultTokenUse(",
    'type: "pokemon-result"',
  ]) if (!app.includes(marker)) throw new Error(`Stage 9D/current invariant missing: ${marker}`);
  for (const marker of [
    'type: "encounter-result"',
    "currentEncounterPendingActivity",
    "recordEncounterTokenUse",
    "state.encounterCopyRecords",
    "previousEncounterCopyRecords",
    "undoEncounterActionVisit(undoData)",
  ]) if (app.includes(marker) || server.includes(marker)) throw new Error(`Stage 9D invariant failed: ${marker}`);

  const hits = [];
  for (const rel of FILES) {
    const p = path.join(ROOT, rel);
    if (!fs.existsSync(p)) continue;
    const text = fs.readFileSync(p, "utf8");
    for (const [group, markers] of Object.entries(GROUPS)) {
      for (const marker of markers) for (const at of all(text, marker)) {
        const ctx = context(text, at);
        hits.push({ group, rel, marker, line: ctx.line, body: ctx.body });
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

  const out = [
    "# V1 Purge Stage 9E — Final Production Residue Survey",
    "",
    `Generated from \`${git(["rev-parse", "HEAD"])}\`.`,
    "",
    "Production/static files only. Historical reports, purge scripts, and archaeology docs are intentionally excluded.",
    "",
    "## Summary",
    "",
    "| Group | File | Marker | Count | Lines |",
    "|---|---|---|---:|---|",
  ];
  const grouped = new Map();
  for (const hit of unique) {
    const key = `${hit.group}\0${hit.rel}\0${hit.marker}`;
    const row = grouped.get(key) || { ...hit, lines: [] };
    row.lines.push(hit.line); grouped.set(key, row);
  }
  for (const row of grouped.values()) out.push(`| ${row.group} | \`${row.rel}\` | \`${row.marker.replace(/\|/g, "\\|")}\` | ${row.lines.length} | ${row.lines.join(", ")} |`);
  out.push("", "## Detailed contexts", "");
  let section = "";
  for (const hit of unique) {
    const next = `${hit.group} — ${hit.rel}`;
    if (next !== section) { section = next; out.push(`### ${hit.group} — \`${hit.rel}\``, ""); }
    out.push(`#### \`${hit.marker}\` — line ${hit.line}`, "", "```text", hit.body, "```", "");
  }

  fs.writeFileSync(REPORT, sanitize(out), "utf8");
  git(["add", REPORT_REL]);
  execFileSync("git", ["diff", "--cached", "--check"], { cwd: ROOT, stdio: "inherit" });
  const staged = git(["diff", "--cached", "--stat"]);
  if (!staged) throw new Error("Stage 9E produced no report.");
  console.log(`\n${staged}`);
  git(["commit", "-m", "Map final production V1 residue"], true);
  git(["push", "origin", BRANCH], true);
  console.log(`\nStage 9E complete: wrote and pushed ${REPORT_REL}.`);
} catch (error) {
  console.error(`\nV1 purge Stage 9E failed safely:\n${error.message}`);
  try { execFileSync("git", ["reset", "--hard", "HEAD"], { cwd: ROOT, stdio: "ignore" }); } catch {}
  process.exitCode = 1;
}
