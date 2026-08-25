#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const EXPECTED_BRANCH = "audit/purge-v1-runtime";
const STAGE6_REPORT = path.join(ROOT, "V1_PURGE_STAGE6_CONTAMINATION.md");
const REPORT_REL = "V1_PURGE_STAGE6_RUNTIME_SUMMARY.md";
const REPORT_PATH = path.join(ROOT, REPORT_REL);
const RUNTIME_FILES = ["app.js", "index.html", "server.js", "styles.css", "token-effect-contract.js"];

const GROUPS = [
  {
    name: "V1/version switch residue",
    markers: ["ACTION_PHASE_VERSION_V1", "renderV1ActionPhase", "current-action-phase", "legacy-action-phase", "action-phase-v1"],
  },
  {
    name: "Hidden Grotto residue",
    markers: ["hiddenGrottoSessions", "startHiddenGrottoSession", "renderHiddenGrotto", "Hidden Grotto", "hidden-grotto"],
  },
  {
    name: "Retired Encounter Wheel residue",
    markers: [
      "encounterSessions", "selectedEncounterSessionId", "encounterModalOpen", "encounterWheelDefinitions",
      "encounterWheelDefinition(", "startEncounterSession(", "spinEncounterWheel(", "renderEncounterOverlay(",
      "encounter-token-runtime.js", "Encounter Wheel", "encounter-roll:", 'sourceType === "encounter"',
      'sourceType: "encounter"', 'locationId: "encounter"', 'serviceId: "encounter-wheel"',
    ],
  },
  {
    name: "Encounter-specific token contract residue",
    markers: [
      'resolverId: "extraEncounter"', 'resolverId: "encounterWheelEdit"', 'resolverId: "encounterTransfer"',
      'resolverId: "encounterGrant"', 'resolverId: "encounterCopy"', 'resolverId: "encounterChoose"',
      '"extraEncounter"', '"encounterWheelEdit"', '"encounterTransfer"', '"encounterGrant"',
      '"encounterCopy"', '"encounterChoose"',
    ],
  },
  {
    name: "Encounter CSS/static residue",
    markers: [
      ".encounter-tab", ".encounter-overlay", ".encounter-modal", ".encounter-layout", ".encounter-wheel",
      ".encounter-entry", ".encounter-result", ".encounter-controls", ".encounter-toggle", ".encounter-skip",
    ],
  },
  {
    name: "Obsolete encounter QA/test names",
    markers: ["test-encounter-token-runtime.js", "encounter-token-runtime", "encounter runtime", "Encounter runtime"],
  },
];

function git(args, { inherit = false } = {}) {
  const result = execFileSync("git", args, {
    cwd: ROOT,
    encoding: "utf8",
    stdio: inherit ? "inherit" : ["ignore", "pipe", "pipe"],
  });
  return typeof result === "string" ? result.trim() : "";
}

function ensureSafe() {
  const branch = git(["branch", "--show-current"]);
  if (branch !== EXPECTED_BRANCH) throw new Error(`Refusing to run on ${branch || "detached HEAD"}. Switch to ${EXPECTED_BRANCH}.`);
  const status = git(["status", "--porcelain"]);
  if (status) throw new Error(`Working tree must be clean before Stage 6B.\n${status}`);
  if (!fs.existsSync(STAGE6_REPORT)) throw new Error("Stage 6 report is missing. Run Stage 6 successfully before Stage 6B.");
}

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}

function lineFor(text, index) {
  return text.slice(0, index).split("\n").length;
}

function contextFor(text, index, radius = 3) {
  const lines = text.split(/\r?\n/);
  const line = lineFor(text.replace(/\r/g, ""), text.slice(0, index).replace(/\r/g, "").length);
  const start = Math.max(1, line - radius);
  const end = Math.min(lines.length, line + radius);
  const out = [];
  for (let n = start; n <= end; n += 1) out.push(`${String(n).padStart(6, " ")} | ${lines[n - 1].replace(/[ \t]+$/g, "")}`);
  return { line, text: out.join("\n") };
}

function main() {
  ensureSafe();
  const head = git(["rev-parse", "HEAD"]);
  const app = read("app.js");
  const index = read("index.html");

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
  ]) {
    if (!app.includes(marker)) throw new Error(`Current runtime invariant missing: ${marker}`);
  }
  for (const marker of ["state.hiddenGrottoSessions", "function startHiddenGrottoSession(", "state.encounterSessions", "function startEncounterSession(", "function renderEncounterOverlay("]) {
    if (app.includes(marker)) throw new Error(`Previous purge invariant failed: ${marker}`);
  }
  for (const marker of ["encounterTab", "encounterOverlay", "Encounter Wheel"]) {
    if (index.includes(marker)) throw new Error(`Previous Stage 5C HTML invariant failed: ${marker}`);
  }

  const hits = [];
  for (const rel of RUNTIME_FILES) {
    const full = path.join(ROOT, rel);
    if (!fs.existsSync(full)) continue;
    const text = fs.readFileSync(full, "utf8");
    for (const group of GROUPS) {
      for (const marker of group.markers) {
        let from = 0;
        while (true) {
          const indexAt = text.indexOf(marker, from);
          if (indexAt < 0) break;
          const ctx = contextFor(text, indexAt, 3);
          hits.push({ rel, group: group.name, marker, line: ctx.line, context: ctx.text });
          from = indexAt + Math.max(marker.length, 1);
          if (hits.filter((hit) => hit.rel === rel && hit.group === group.name && hit.marker === marker).length >= 100) break;
        }
      }
    }
  }

  const dedupe = new Map();
  for (const hit of hits) {
    const key = `${hit.rel}\u0000${hit.group}\u0000${hit.marker}\u0000${hit.line}`;
    if (!dedupe.has(key)) dedupe.set(key, hit);
  }
  const unique = [...dedupe.values()].sort((a, b) => a.rel.localeCompare(b.rel) || a.group.localeCompare(b.group) || a.line - b.line || a.marker.localeCompare(b.marker));

  const summary = new Map();
  for (const hit of unique) {
    const key = `${hit.rel}\u0000${hit.group}\u0000${hit.marker}`;
    const item = summary.get(key) || { rel: hit.rel, group: hit.group, marker: hit.marker, lines: [] };
    if (!item.lines.includes(hit.line)) item.lines.push(hit.line);
    summary.set(key, item);
  }

  const out = [
    "# V1 Purge Stage 6B — Production Runtime Summary",
    "",
    `Generated from \`${head}\`.`,
    "",
    "Scope is intentionally limited to files that ship or directly define production behavior:",
    "",
    ...RUNTIME_FILES.map((rel) => `- \`${rel}\``),
    "",
    `Unique runtime contamination hits: **${unique.length}**`,
    "",
    "## Summary",
    "",
    "| File | Group | Marker | Lines |",
    "|---|---|---|---|",
  ];

  for (const item of [...summary.values()].sort((a, b) => a.rel.localeCompare(b.rel) || a.group.localeCompare(b.group) || a.marker.localeCompare(b.marker))) {
    out.push(`| \`${item.rel}\` | ${item.group} | \`${item.marker.replace(/\|/g, "\\|")}\` | ${item.lines.join(", ")} |`);
  }

  out.push("", "## Detailed contexts", "");
  let lastFile = "";
  for (const hit of unique) {
    if (hit.rel !== lastFile) {
      lastFile = hit.rel;
      out.push(`### \`${hit.rel}\``, "");
    }
    out.push(`#### ${hit.group} — \`${hit.marker}\` — line ${hit.line}`, "", "```text", hit.context, "```", "");
  }

  const report = `${out.join("\n")}`
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/g, ""))
    .join("\n")
    .replace(/\n+$/g, "") + "\n";

  fs.writeFileSync(REPORT_PATH, report, "utf8");
  git(["add", REPORT_REL]);
  execFileSync("git", ["diff", "--cached", "--check"], { cwd: ROOT, stdio: "inherit" });
  const staged = git(["diff", "--cached", "--stat"]);
  if (!staged) throw new Error("Stage 6B produced no staged summary report.");
  console.log(`\n${staged}`);
  git(["commit", "-m", "Summarize remaining runtime contamination"], { inherit: true });
  git(["push", "origin", EXPECTED_BRANCH], { inherit: true });
  console.log(`\nStage 6B complete: wrote and pushed ${REPORT_REL}.`);
}

try {
  main();
} catch (error) {
  console.error(`\nV1 purge Stage 6B failed safely:\n${error.message}`);
  process.exitCode = 1;
}
