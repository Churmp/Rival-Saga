#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const BRANCH = "audit/purge-v1-runtime";
const REPORT_REL = "V1_PURGE_FINAL_AUDIT.md";
const REPORT = path.join(ROOT, REPORT_REL);
const MAX_BYTES = 6 * 1024 * 1024;
const TEXT_EXTENSIONS = new Set([".js", ".mjs", ".cjs", ".json", ".html", ".css", ".md", ".txt", ".yml", ".yaml", ".toml"]);

const GROUPS = Object.freeze({
  "Retired Action/version runtime": [
    "ACTION_PHASE_VERSION_V1",
    "renderV1ActionPhase",
    "current-action-phase",
    "legacy-action-phase",
    "action-phase-v1",
  ],
  "Retired Hidden Grotto runtime": [
    "hiddenGrottoSessions",
    "startHiddenGrottoSession",
    "renderHiddenGrotto",
    "hidden-grotto",
  ],
  "Retired Encounter Wheel runtime": [
    "encounterSessions",
    "selectedEncounterSessionId",
    "encounterModalOpen",
    "encounterWheelDefinitions",
    "encounterWheelDefinition(",
    "startEncounterSession(",
    "spinEncounterWheel(",
    "renderEncounterOverlay(",
    "encounter-token-runtime.js",
    "encounter-token-runtime",
    'sourceType === "encounter"',
    'sourceType: "encounter"',
    'locationId: "encounter"',
    'serviceId: "encounter-wheel"',
  ],
  "Retired Encounter event/taxonomy": [
    "encounterSessionId",
    "encounterRollId",
    "encounterCopyRecords",
    "TOKEN_TIMING_CATEGORIES.ENCOUNTER",
    "TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT",
    "TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_TOKEN",
    "EFFECT_TARGET_CATEGORIES.ENCOUNTER_RESULT",
    "EFFECT_TARGET_TYPES.ENCOUNTER_RESULT",
    "TOKEN_USE_TYPES.ENCOUNTER_MODIFIER",
    '"encounter-result"',
    '"encounter-reroll"',
    '"steal-encounter"',
    "TOKEN_TIMING_ENGINE_V1_DEFINITIONS",
    'source: "engine-v1"',
    '"token-engine-v1"',
    'resolverId: "encounterWheelEdit"',
    'resolverId: "encounterTransfer"',
    'resolverId: "encounterGrant"',
    'resolverId: "encounterCopy"',
    'resolverId: "encounterChoose"',
  ],
  "Retired Encounter static UI": [
    ".encounter-tab",
    ".encounter-overlay",
    ".encounter-modal",
    ".encounter-layout",
    ".encounter-wheel",
    ".encounter-entry",
    ".encounter-result",
    ".encounter-controls",
    ".encounter-toggle",
    ".encounter-skip",
  ],
  "Obsolete Encounter QA/tooling": [
    "test-encounter-token-runtime.js",
    "Encounter runtime",
    "encounter runtime",
  ],
  "Rules-review text only": [
    "Hidden Grotto",
    "Encounter Wheel",
  ],
  "Current Route preservation": [
    "useV2RouteRerollToken",
    "useV2ExtraEncounter",
    "applyV2RouteRepel",
    "useV2MasterBallOnOpportunity",
    "routeEncounterBySeriesId",
    "randomPokemonSessions",
    "pokemon-result",
    "pokemon-reroll",
  ],
});

function git(args, inherit = false) {
  const out = execFileSync("git", args, { cwd: ROOT, encoding: "utf8", stdio: inherit ? "inherit" : ["ignore", "pipe", "pipe"] });
  return typeof out === "string" ? out.trim() : "";
}
function clean(text) { return String(text || "").replace(/\r/g, ""); }
function all(text, marker) { const out = []; let from = 0; while (true) { const at = text.indexOf(marker, from); if (at < 0) return out; out.push(at); from = at + Math.max(1, marker.length); } }
function lineOf(text, at) { return clean(text.slice(0, at)).split("\n").length; }
function ctx(text, at, radius = 2) {
  const src = clean(text), line = lineOf(text, at), lines = src.split("\n");
  const start = Math.max(1, line - radius), end = Math.min(lines.length, line + radius), body = [];
  for (let n = start; n <= end; n += 1) body.push(`${String(n).padStart(6, " ")} | ${lines[n - 1].replace(/[ \t]+$/g, "")}`);
  return { line, body: body.join("\n") };
}
function sanitize(lines) { return lines.join("\n").replace(/\r/g, "").split("\n").map((line) => line.replace(/[ \t]+$/g, "")).join("\n").replace(/\n+$/g, "") + "\n"; }
function category(rel) {
  if (["app.js", "server.js", "index.html", "styles.css", "token-effect-contract.js", "token-control-effects.js"].includes(rel)) return "production/runtime";
  if (/^(scripts\/test-|versions\/.*\/tests\/)/.test(rel) || /(^|\/)test[^/]*\.js$/i.test(rel)) return "tests";
  if (rel.startsWith("scripts/")) return "scripts/tooling";
  if (rel.startsWith("versions/")) return "versions";
  if (/\.md$/i.test(rel)) return "docs";
  return "other";
}
function excluded(rel) {
  return /^V1_PURGE_.*\.md$/i.test(rel)
    || rel === REPORT_REL
    || /^scripts\/v1-purge-stage.*\.js$/i.test(rel)
    || rel === "scripts/v1-purge-autopilot-command.txt"
    || rel === ".github/workflows/v1-purge-autopilot.yml";
}

try {
  if (git(["branch", "--show-current"]) !== BRANCH) throw new Error(`Run only on ${BRANCH}.`);
  const status = git(["status", "--porcelain"]);
  if (status) throw new Error(`Working tree must be clean before final audit.\n${status}`);

  const app = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");
  const control = fs.readFileSync(path.join(ROOT, "token-control-effects.js"), "utf8");
  for (const marker of [
    "function renderActionPhase() {\n  renderV2RouteActionPhase();\n}",
    "function useV2RouteRerollToken(",
    "function useV2ExtraEncounter(",
    "function applyV2RouteRepel(",
    "function useV2MasterBallOnOpportunity(",
    "function rerollRandomPokemonSession(",
    "function recordPokemonResultTokenUse(",
    "function liveRefereePromptHasPokemonResult(",
    '"pokemon-reroll"',
    "TOKEN_TIMING_ENGINE_DEFINITIONS",
  ]) if (!app.includes(marker)) throw new Error(`Stage 9F/current invariant missing: ${marker}`);
  for (const marker of [
    "TOKEN_TIMING_CATEGORIES.ENCOUNTER",
    "TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT",
    "EFFECT_TARGET_TYPES.ENCOUNTER_RESULT",
    '"encounter-result"',
    '"encounter-reroll"',
    '"steal-encounter"',
    "encounterSessionId",
    "encounterCopyRecords",
    "TOKEN_TIMING_ENGINE_V1_DEFINITIONS",
    '"token-engine-v1"',
  ]) if (app.includes(marker) || control.includes(marker)) throw new Error(`Stage 9F prerequisite failed: ${marker}`);

  const tracked = git(["ls-files", "-z"]).split("\0").filter(Boolean).filter((rel) => !excluded(rel));
  const hits = [];
  for (const rel of tracked) {
    const ext = path.extname(rel).toLowerCase();
    if (!TEXT_EXTENSIONS.has(ext)) continue;
    const p = path.join(ROOT, rel);
    let stat; try { stat = fs.statSync(p); } catch { continue; }
    if (!stat.isFile() || stat.size > MAX_BYTES) continue;
    let text; try { text = fs.readFileSync(p, "utf8"); } catch { continue; }
    for (const [group, markers] of Object.entries(GROUPS)) for (const marker of markers) for (const at of all(text, marker)) {
      const c = ctx(text, at);
      hits.push({ group, rel, marker, line: c.line, body: c.body, category: category(rel) });
    }
  }
  const seen = new Set(), unique = [];
  for (const hit of hits) {
    const key = `${hit.group}\0${hit.rel}\0${hit.marker}\0${hit.line}`;
    if (!seen.has(key)) { seen.add(key); unique.push(hit); }
  }
  unique.sort((a, b) => a.group.localeCompare(b.group) || a.category.localeCompare(b.category) || a.rel.localeCompare(b.rel) || a.line - b.line || a.marker.localeCompare(b.marker));

  const out = [
    "# Rival Saga V1 Purge — Final Whole-Repo Audit",
    "",
    `Generated from \`${git(["rev-parse", "HEAD"])}\`.`,
    "",
    "Excluded from contamination scoring: generated V1_PURGE reports, purge-stage scripts, the autopilot command file, and the autopilot workflow itself.",
    "",
    "The Rules-review text group is intentionally informational: old terminology inside still-unreviewed Perk/Bulletin rules is not automatically executable V1 contamination.",
    "",
    "## Summary",
    "",
    "| Group | Category | File | Marker | Count | Lines |",
    "|---|---|---|---|---:|---|",
  ];
  const grouped = new Map();
  for (const hit of unique) {
    const key = `${hit.group}\0${hit.category}\0${hit.rel}\0${hit.marker}`;
    const row = grouped.get(key) || { ...hit, lines: [] };
    row.lines.push(hit.line); grouped.set(key, row);
  }
  for (const row of grouped.values()) out.push(`| ${row.group} | ${row.category} | \`${row.rel}\` | \`${row.marker.replace(/\|/g, "\\|")}\` | ${row.lines.length} | ${row.lines.join(", ")} |`);
  out.push("", "## Detailed contexts", "");
  let sec = "";
  for (const hit of unique) {
    const next = `${hit.group} — ${hit.category} — ${hit.rel}`;
    if (next !== sec) { sec = next; out.push(`### ${hit.group} — ${hit.category} — \`${hit.rel}\``, ""); }
    out.push(`#### \`${hit.marker}\` — line ${hit.line}`, "", "```text", hit.body, "```", "");
  }

  fs.writeFileSync(REPORT, sanitize(out), "utf8");
  git(["add", REPORT_REL]);
  execFileSync("git", ["diff", "--cached", "--check"], { cwd: ROOT, stdio: "inherit" });
  const staged = git(["diff", "--cached", "--stat"]);
  if (!staged) throw new Error("Final audit produced no report.");
  console.log(`\n${staged}`);
  git(["commit", "-m", "Capture final V1 purge audit"], true);
  git(["push", "origin", BRANCH], true);
  console.log(`\nFinal audit complete: wrote and pushed ${REPORT_REL}.`);
} catch (error) {
  console.error(`\nFinal V1 purge audit failed safely:\n${error.message}`);
  try { execFileSync("git", ["reset", "--hard", "HEAD"], { cwd: ROOT, stdio: "ignore" }); } catch {}
  process.exitCode = 1;
}
