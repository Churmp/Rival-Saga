#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const EXPECTED_BRANCH = "audit/purge-v1-runtime";
const REPORT_REL = "V1_PURGE_STAGE8C_ENCOUNTER_CALLGRAPH.md";
const REPORT_PATH = path.join(ROOT, REPORT_REL);
const FILES = ["app.js", "token-effect-contract.js", "token-control-effects.js", "index.html"];

const GROUPS = Object.freeze({
  "Honey V1 bridge": [
    "ensureHoneyEndOfActionProcedures",
    "resolveHoneyEndOfActionProcedure",
    "augmentHoneyCausalUndoAfterAcquisition",
    "honeyEligibleEncounterResults",
    "resolveHoneyEncounterCopy",
    "honey-end-action",
    "honey-encounter-copy",
  ],
  "Live Referee encounter channel": [
    "createPokemonResultTimingWindow",
    "currentEncounterPendingActivity",
    "liveRefereePromptIsEncounterResult",
    "liveActivityTimingCategory",
    "liveTokenPromptDetails",
    "TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT",
    "TOKEN_TIMING_CATEGORIES.ENCOUNTER",
    "EFFECT_TARGET_TYPES.ENCOUNTER_RESULT",
    "EFFECT_TARGET_CATEGORIES.ENCOUNTER_RESULT",
    "TOKEN_USE_TYPES.ENCOUNTER_MODIFIER",
    '"encounter-result"',
    '"encounter-reroll"',
    '"steal-encounter"',
  ],
  "Generic token activation bridge": [
    "TOKEN_TIMING_ENGINE_V1_DEFINITIONS",
    "resolveImmediateTokenUse",
    "applyActivationOverlay",
    'resolverId === "extraEncounter"',
    '["extraEncounter", "safeguard"]',
  ],
  "Current Route token runtime": [
    "V2_ROUTE_TOKEN_IDS",
    "useV2RouteRerollToken",
    "useV2ExtraEncounter",
    "applyV2RouteRepel",
    "useV2MasterBallOnOpportunity",
  ],
  "Encounter contract migration": [
    'encounter({ id: "reroll-token"',
    'encounter({ id: "extra-encounter-token"',
    'encounter({ id: "repel-token"',
    'encounter({ id: "quick-ball-token"',
    'encounter({ id: "dream-ball-token"',
    'encounter({ id: "honey-token"',
    'encounter({ id: "master-ball-token"',
    'encounter({ id: "beast-ball-token"',
    '"encounter-token-runtime"',
    '"encounterWheelEdit"',
    '"encounterTransfer"',
    '"encounterGrant"',
    '"encounterCopy"',
    '"encounterChoose"',
  ],
});

function git(args, inherit = false) {
  const result = execFileSync("git", args, {
    cwd: ROOT,
    encoding: "utf8",
    stdio: inherit ? "inherit" : ["ignore", "pipe", "pipe"],
  });
  return typeof result === "string" ? result.trim() : "";
}

function clean(value) {
  return String(value || "").replace(/\r/g, "");
}

function read(rel) {
  const full = path.join(ROOT, rel);
  return fs.existsSync(full) ? fs.readFileSync(full, "utf8") : null;
}

function ensureSafe() {
  const branch = git(["branch", "--show-current"]);
  if (branch !== EXPECTED_BRANCH) throw new Error(`Refusing to run on ${branch || "detached HEAD"}.`);
  const status = git(["status", "--porcelain"]);
  if (status) throw new Error(`Working tree must be clean before Stage 8C.\n${status}`);

  const app = read("app.js") || "";
  const css = read("styles.css") || "";
  const runner = read("scripts/run-token-qa-coverage.js") || "";
  const sandbox = read("scripts/test-token-sandbox.js") || "";

  for (const marker of [
    "function renderActionPhase() {\n  renderV2RouteActionPhase();\n}",
    "const V2_ROUTE_TOKEN_IDS",
    "function useV2RouteRerollToken(",
    "function useV2ExtraEncounter(",
    "function applyV2RouteRepel(",
    "function useV2MasterBallOnOpportunity(",
  ]) if (!app.includes(marker)) throw new Error(`Current Route invariant missing: ${marker}`);

  for (const marker of [
    "state.encounterSessions",
    "function startEncounterSession(",
    "encounterWheelDefinition(",
    'label: "Open Encounter Wheel"',
  ]) if (app.includes(marker)) throw new Error(`Previous runtime purge invariant failed: ${marker}`);

  for (const marker of [".encounter-tab", ".encounter-overlay", ".encounter-modal"]) {
    if (css.includes(marker)) throw new Error(`Previous CSS purge invariant failed: ${marker}`);
  }

  if (fs.existsSync(path.join(ROOT, "scripts/test-encounter-token-runtime.js"))) {
    throw new Error("Stage 8B invariant failed: retired Encounter runtime test still exists.");
  }
  if (runner.includes("test-encounter-token-runtime.js")) throw new Error("Stage 8B invariant failed: QA runner still references retired Encounter runtime test.");
  if (sandbox.includes("encounterTokenRuntime") || sandbox.includes("[TSB-024]")) throw new Error("Stage 8B invariant failed: token sandbox still contains V1 Extra Encounter runtime residue.");
}

function lineNumber(text, index) {
  return clean(text.slice(0, index)).split("\n").length;
}

function allOccurrences(text, marker) {
  const out = [];
  let from = 0;
  while (true) {
    const at = text.indexOf(marker, from);
    if (at < 0) return out;
    out.push(at);
    from = at + Math.max(1, marker.length);
  }
}

function context(text, index, radius = 3) {
  const source = clean(text);
  const normalizedIndex = clean(text.slice(0, index)).length;
  const line = source.slice(0, normalizedIndex).split("\n").length;
  const lines = source.split("\n");
  const start = Math.max(1, line - radius);
  const end = Math.min(lines.length, line + radius);
  const body = [];
  for (let n = start; n <= end; n += 1) {
    body.push(`${String(n).padStart(6, " ")} | ${lines[n - 1].replace(/[ \t]+$/g, "")}`);
  }
  return { line, body: body.join("\n") };
}

function matchingBraceEnd(text, openIndex) {
  let depth = 0;
  let mode = "code";
  let escaped = false;
  for (let i = openIndex; i < text.length; i += 1) {
    const ch = text[i];
    const next = text[i + 1];
    if (mode === "line") {
      if (ch === "\n") mode = "code";
      continue;
    }
    if (mode === "block") {
      if (ch === "*" && next === "/") { mode = "code"; i += 1; }
      continue;
    }
    if (["single", "double", "template"].includes(mode)) {
      if (escaped) { escaped = false; continue; }
      if (ch === "\\") { escaped = true; continue; }
      if ((mode === "single" && ch === "'") || (mode === "double" && ch === '"') || (mode === "template" && ch === "`")) mode = "code";
      continue;
    }
    if (ch === "/" && next === "/") { mode = "line"; i += 1; continue; }
    if (ch === "/" && next === "*") { mode = "block"; i += 1; continue; }
    if (ch === "'") { mode = "single"; continue; }
    if (ch === '"') { mode = "double"; continue; }
    if (ch === "`") { mode = "template"; continue; }
    if (ch === "{") depth += 1;
    if (ch === "}") {
      depth -= 1;
      if (depth === 0) return i + 1;
    }
  }
  return -1;
}

function functionSpans(text) {
  const spans = [];
  const re = /(?:async\s+)?function\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*\([^)]*\)\s*\{/g;
  let match;
  while ((match = re.exec(text))) {
    const open = text.indexOf("{", match.index);
    const end = matchingBraceEnd(text, open);
    if (end > open) spans.push({ name: match[1], start: match.index, end, startLine: lineNumber(text, match.index), endLine: lineNumber(text, end) });
  }
  return spans;
}

function enclosingFunction(spans, index) {
  const candidates = spans.filter((span) => span.start <= index && index < span.end).sort((a, b) => (a.end - a.start) - (b.end - b.start));
  return candidates[0] || null;
}

function sanitizeReport(lines) {
  return `${lines.join("\n")}`
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/g, ""))
    .join("\n")
    .replace(/\n+$/g, "") + "\n";
}

try {
  ensureSafe();
  const head = git(["rev-parse", "HEAD"]);
  const data = new Map();
  for (const rel of FILES) {
    const text = read(rel);
    if (text !== null) data.set(rel, { text, spans: functionSpans(text) });
  }

  const hits = [];
  for (const [group, markers] of Object.entries(GROUPS)) {
    for (const [rel, file] of data) {
      for (const marker of markers) {
        for (const at of allOccurrences(file.text, marker)) {
          const ctx = context(file.text, at);
          const fn = enclosingFunction(file.spans, at);
          hits.push({ group, rel, marker, line: ctx.line, context: ctx.body, fn });
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
    "# V1 Purge Stage 8C — Encounter Callgraph Survey",
    "",
    `Generated from \`${head}\`.`,
    "",
    "Purpose: identify the exact remaining call sites for the Honey V1 bridge and Live Referee encounter-result channel before production deletion/migration.",
    "",
    "This survey does not modify production runtime or token rules.",
    "",
    "## Summary",
    "",
    "| Group | File | Marker | Count | Lines | Enclosing functions |",
    "|---|---|---|---:|---|---|",
  ];

  const summary = new Map();
  for (const hit of unique) {
    const key = `${hit.group}\0${hit.rel}\0${hit.marker}`;
    const item = summary.get(key) || { ...hit, lines: [], functions: new Set() };
    item.lines.push(hit.line);
    if (hit.fn) item.functions.add(hit.fn.name);
    summary.set(key, item);
  }
  for (const item of summary.values()) {
    report.push(`| ${item.group} | \`${item.rel}\` | \`${item.marker.replace(/\|/g, "\\|")}\` | ${item.lines.length} | ${item.lines.join(", ")} | ${[...item.functions].map((name) => `\`${name}\``).join(", ")} |`);
  }

  report.push("", "## Detailed contexts", "");
  let heading = "";
  for (const hit of unique) {
    const nextHeading = `${hit.group} — ${hit.rel}`;
    if (nextHeading !== heading) {
      heading = nextHeading;
      report.push(`### ${hit.group} — \`${hit.rel}\``, "");
    }
    const fnText = hit.fn ? ` — function \`${hit.fn.name}\` (${hit.fn.startLine}-${hit.fn.endLine})` : "";
    report.push(`#### \`${hit.marker}\` — line ${hit.line}${fnText}`, "", "```text", hit.context, "```", "");
  }

  fs.writeFileSync(REPORT_PATH, sanitizeReport(report), "utf8");
  git(["add", REPORT_REL]);
  execFileSync("git", ["diff", "--cached", "--check"], { cwd: ROOT, stdio: "inherit" });
  const staged = git(["diff", "--cached", "--stat"]);
  if (!staged) throw new Error("Stage 8C produced no staged report.");
  console.log(`\n${staged}`);
  git(["commit", "-m", "Map Encounter callgraph boundaries"], true);
  git(["push", "origin", EXPECTED_BRANCH], true);
  console.log(`\nStage 8C complete: wrote and pushed ${REPORT_REL}.`);
} catch (error) {
  console.error(`\nV1 purge Stage 8C failed safely:\n${error.message}`);
  process.exitCode = 1;
}
