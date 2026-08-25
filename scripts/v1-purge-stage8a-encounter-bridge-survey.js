#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const EXPECTED_BRANCH = "audit/purge-v1-runtime";
const REPORT_REL = "V1_PURGE_STAGE8_ENCOUNTER_BRIDGES.md";
const REPORT_PATH = path.join(ROOT, REPORT_REL);
const FILES = [
  "app.js",
  "token-effect-contract.js",
  "scripts/run-token-qa-coverage.js",
  "scripts/test-encounter-token-runtime.js",
  "scripts/test-token-sandbox.js",
  "scripts/token-qa-coverage-data.js",
];

const GROUPS = [
  ["Old encounter result/event bridge", [
    'sourceType === "encounter"', 'sourceType: "encounter"', '"encounter-result"',
    "TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT", "EFFECT_TARGET_TYPES.ENCOUNTER_RESULT",
    '"encounterResult"', '"encounterBeforeRoll"'
  ]],
  ["Old encounter resolver IDs", [
    '"extraEncounter"', '"encounterWheelEdit"', '"encounterTransfer"',
    '"encounterGrant"', '"encounterCopy"', '"encounterChoose"'
  ]],
  ["Encounter-family contract model", [
    "encounter({", 'family === "Encounter"', 'family: "Encounter"', '"wheelWindow"'
  ]],
  ["Current V2 Route token runtime", [
    "function useV2RouteRerollToken(", "function useV2ExtraEncounter(",
    "function applyV2RouteRepel(", "function useV2MasterBallOnOpportunity(", "V2_ROUTE_TOKEN_IDS"
  ]],
  ["Encounter token names", [
    '"Reroll"', '"Extra Encounter Token"', '"Repel"', '"Quick Ball Token"',
    '"Dream Ball Token"', '"Honey"', '"Master Ball Token"', '"Beast Ball"'
  ]],
  ["Old encounter verification/tooling", [
    '"encounter-token-runtime"', "test-encounter-token-runtime.js", "encounter-token-runtime.js"
  ]],
];

function git(args, inherit = false) {
  const result = execFileSync("git", args, {
    cwd: ROOT,
    encoding: "utf8",
    stdio: inherit ? "inherit" : ["ignore", "pipe", "pipe"],
  });
  return typeof result === "string" ? result.trim() : "";
}

function read(rel) {
  const full = path.join(ROOT, rel);
  return fs.existsSync(full) ? fs.readFileSync(full, "utf8") : null;
}

function ensureSafe() {
  const branch = git(["branch", "--show-current"]);
  if (branch !== EXPECTED_BRANCH) throw new Error(`Refusing to run on ${branch || "detached HEAD"}.`);
  const status = git(["status", "--porcelain"]);
  if (status) throw new Error(`Working tree must be clean before Stage 8A.\n${status}`);
}

function clean(text) {
  return String(text || "").replace(/\r/g, "");
}

function lineAt(text, index) {
  return clean(text.slice(0, index)).split("\n").length;
}

function context(text, index, radius = 4) {
  const source = clean(text);
  const idx = clean(text.slice(0, index)).length;
  const lines = source.split("\n");
  const line = source.slice(0, idx).split("\n").length;
  const start = Math.max(1, line - radius);
  const end = Math.min(lines.length, line + radius);
  return {
    line,
    body: Array.from({ length: end - start + 1 }, (_, i) => {
      const n = start + i;
      return `${String(n).padStart(6, " ")} | ${lines[n - 1].replace(/[ \t]+$/g, "")}`;
    }).join("\n"),
  };
}

function matchingBraceEnd(text, open) {
  let depth = 0;
  let mode = "code";
  let escaped = false;
  for (let i = open; i < text.length; i += 1) {
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
      if (depth < 0) return -1;
    }
  }
  return -1;
}

function functionSpans(text) {
  const spans = [];
  const re = /(?:async\s+)?function\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*\([^)]*\)\s*\{/g;
  let m;
  while ((m = re.exec(text))) {
    const open = text.indexOf("{", m.index);
    const end = matchingBraceEnd(text, open);
    if (open >= 0 && end > open) spans.push({
      name: m[1], start: m.index, end,
      startLine: lineAt(text, m.index), endLine: lineAt(text, end),
    });
  }
  return spans;
}

function enclosing(spans, index) {
  const found = spans.filter((s) => s.start <= index && index < s.end);
  found.sort((a, b) => (a.end - a.start) - (b.end - b.start));
  return found[0] || null;
}

function occurrences(text, marker) {
  const out = [];
  let from = 0;
  while (true) {
    const at = text.indexOf(marker, from);
    if (at < 0) return out;
    out.push(at);
    from = at + Math.max(1, marker.length);
  }
}

function extract(text, span, maxLines = 220) {
  const lines = clean(text.slice(span.start, span.end)).split("\n");
  if (lines.length <= maxLines) return lines.join("\n");
  return [...lines.slice(0, 100), `// ... ${lines.length - 200} lines omitted ...`, ...lines.slice(-100)].join("\n");
}

function countId(text, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return (text.match(new RegExp(`\\b${escaped}\\b`, "g")) || []).length;
}

function assertInvariants(app, css) {
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
    "state.encounterSessions", "function startEncounterSession(", "function renderEncounterOverlay(",
    "encounterWheelDefinition(", 'summary: "Roll the Encounter Wheel for the current gym twice."',
    'label: "Open Encounter Wheel"'
  ]) if (app.includes(marker)) throw new Error(`Previous purge invariant failed: ${marker}`);

  for (const marker of [".encounter-tab", ".encounter-overlay", ".encounter-modal", ".encounter-layout"]) {
    if (css.includes(marker)) throw new Error(`Stage 7 CSS invariant failed: ${marker}`);
  }
}

function main() {
  ensureSafe();
  const head = git(["rev-parse", "HEAD"]);
  const app = read("app.js");
  const css = read("styles.css");
  if (app === null || css === null) throw new Error("app.js or styles.css missing.");
  assertInvariants(app, css);

  const data = new Map();
  for (const rel of FILES) {
    const text = read(rel);
    if (text !== null) data.set(rel, { text, spans: functionSpans(text) });
  }

  const hits = [];
  for (const [rel, file] of data) {
    for (const [group, markers] of GROUPS) {
      for (const marker of markers) {
        for (const at of occurrences(file.text, marker)) {
          const ctx = context(file.text, at);
          const fn = enclosing(file.spans, at);
          hits.push({ rel, group, marker, line: ctx.line, body: ctx.body, fn });
        }
      }
    }
  }

  const uniqueMap = new Map();
  for (const hit of hits) {
    const key = `${hit.rel}\0${hit.group}\0${hit.marker}\0${hit.line}`;
    if (!uniqueMap.has(key)) uniqueMap.set(key, hit);
  }
  const unique = [...uniqueMap.values()].sort((a, b) => a.rel.localeCompare(b.rel) || a.line - b.line);

  const out = [
    "# V1 Purge Stage 8A — Encounter Bridge Boundary Survey", "",
    `Generated from \`${head}\`.`, "",
    "Purpose: separate dead wheel-era Encounter runtime bridges from token concepts that must be migrated onto the current V2 Route encounter system.", "",
    "This stage is read-only with respect to production runtime. It does not change token rules.", "",
    "## Marker summary", "",
    "| File | Group | Marker | Count | Lines | Enclosing functions |",
    "|---|---|---|---:|---|---|",
  ];

  const summary = new Map();
  for (const hit of unique) {
    const key = `${hit.rel}\0${hit.group}\0${hit.marker}`;
    const item = summary.get(key) || { rel: hit.rel, group: hit.group, marker: hit.marker, lines: [], fns: new Set() };
    item.lines.push(hit.line);
    if (hit.fn) item.fns.add(hit.fn.name);
    summary.set(key, item);
  }
  for (const item of [...summary.values()].sort((a, b) => a.rel.localeCompare(b.rel) || a.group.localeCompare(b.group) || a.marker.localeCompare(b.marker))) {
    out.push(`| \`${item.rel}\` | ${item.group} | \`${item.marker.replace(/\|/g, "\\|")}\` | ${item.lines.length} | ${item.lines.join(", ")} | ${[...item.fns].map((n) => `\`${n}\``).join(", ")} |`);
  }

  const appSpans = data.get("app.js").spans;
  out.push("", "## Current V2 Route token handlers", "");
  for (const name of ["useV2RouteRerollToken", "useV2ExtraEncounter", "applyV2RouteRepel", "useV2MasterBallOnOpportunity"]) {
    const span = appSpans.find((s) => s.name === name);
    if (!span) throw new Error(`Missing current Route handler span: ${name}`);
    out.push(`### \`${name}\` — lines ${span.startLine}-${span.endLine} — refs ${countId(app, name)}`, "", "```js", extract(app, span, 260), "```", "");
  }

  const bridgeFns = new Map();
  for (const hit of unique) {
    if (hit.rel !== "app.js" || !hit.fn) continue;
    if (["Current V2 Route token runtime", "Encounter token names"].includes(hit.group)) continue;
    bridgeFns.set(`${hit.fn.name}\0${hit.fn.startLine}`, hit.fn);
  }
  out.push("", "## app.js functions containing old Encounter bridge markers", "");
  for (const span of [...bridgeFns.values()].sort((a, b) => a.startLine - b.startLine)) {
    out.push(`### \`${span.name}\` — lines ${span.startLine}-${span.endLine}`, "", "```js", extract(app, span), "```", "");
  }

  const contract = read("token-effect-contract.js") || "";
  out.push("", "## Encounter-family token definitions", "");
  clean(contract).split("\n").forEach((line, i) => {
    if (line.includes("encounter({ id:")) out.push(`### line ${i + 1}`, "", "```js", line.trimEnd(), "```", "");
  });

  out.push("", "## Detailed marker contexts", "");
  let last = "";
  for (const hit of unique) {
    if (hit.rel !== last) { last = hit.rel; out.push(`### \`${last}\``, ""); }
    const fn = hit.fn ? ` — function \`${hit.fn.name}\` (${hit.fn.startLine}-${hit.fn.endLine})` : "";
    out.push(`#### ${hit.group} — \`${hit.marker}\` — line ${hit.line}${fn}`, "", "```text", hit.body, "```", "");
  }

  out.push("", "## Stale tooling inventory", "");
  for (const rel of FILES.filter((x) => x.startsWith("scripts/"))) {
    const t = read(rel);
    out.push(`- \`${rel}\` — ${t === null ? "absent" : `present, ${clean(t).split("\n").length} lines`}`);
  }

  out.push("", "## Decision boundary for Stage 8B", "",
    "1. Dead wheel-era runtime bridge: remove.",
    "2. Shared generic Pokemon-result / Live Referee infrastructure: preserve, removing only Encounter-specific branches.",
    "3. Current Route token: migrate contract/runtime metadata to the existing V2 Route handler.",
    "4. Encounter token concept without current Route implementation: preserve the concept, but do not claim deleted V1 runtime verification.",
    "5. Historical QA/tooling tied only to deleted Encounter runtime: defer until production runtime is clean.",
    ""
  );

  fs.writeFileSync(REPORT_PATH, out.join("\n").replace(/[ \t]+\n/g, "\n").replace(/\n+$/g, "") + "\n", "utf8");
  git(["add", REPORT_REL]);
  execFileSync("git", ["diff", "--cached", "--check"], { cwd: ROOT, stdio: "inherit" });
  const staged = git(["diff", "--cached", "--stat"]);
  if (!staged) throw new Error("Stage 8A produced no staged report.");
  console.log(`\n${staged}`);
  git(["commit", "-m", "Map remaining Encounter token bridges"], true);
  git(["push", "origin", EXPECTED_BRANCH], true);
  console.log(`\nStage 8A complete: wrote and pushed ${REPORT_REL}.`);
}

try {
  main();
} catch (error) {
  console.error(`\nV1 purge Stage 8A failed safely:\n${error.message}`);
  process.exitCode = 1;
}
