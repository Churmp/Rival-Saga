#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const EXPECTED_BRANCH = "audit/purge-v1-runtime";
const REPORT_REL = "V1_PURGE_STAGE6_CONTAMINATION.md";
const REPORT_PATH = path.join(ROOT, REPORT_REL);

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
  if (status) throw new Error(`Working tree must be clean before Stage 6 survey.\n${status}`);
}

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}

function count(text, needle) {
  return text.split(needle).length - 1;
}

function lineFor(text, index) {
  return text.slice(0, index).split("\n").length;
}

function contextFor(text, index, radius = 2) {
  const lines = text.split("\n");
  const line = lineFor(text, index);
  const start = Math.max(1, line - radius);
  const end = Math.min(lines.length, line + radius);
  const out = [];
  for (let n = start; n <= end; n += 1) out.push(`${String(n).padStart(6, " ")} | ${lines[n - 1]}`);
  return { line, text: out.join("\n") };
}

function categoryFor(rel) {
  if (rel === "app.js" || rel === "index.html" || rel === "server.js" || rel === "styles.css" || rel === "token-effect-contract.js") return "production/runtime";
  if (rel.startsWith("scripts/test-") || rel.includes("/tests/") || rel.startsWith("test")) return "tests";
  if (rel.startsWith("scripts/")) return "scripts/tooling";
  if (rel.startsWith("versions/")) return "versions";
  if (/\.(md|txt)$/i.test(rel)) return "docs/reports";
  return "other";
}

const GROUPS = [
  {
    name: "V1/version switch residue",
    markers: [
      "ACTION_PHASE_VERSION_V1",
      "renderV1ActionPhase",
      "current-action-phase",
      "legacy-action-phase",
      "action-phase-v1",
    ],
  },
  {
    name: "Hidden Grotto residue",
    markers: [
      "hiddenGrottoSessions",
      "startHiddenGrottoSession",
      "renderHiddenGrotto",
      "Hidden Grotto",
      "hidden-grotto",
    ],
  },
  {
    name: "Retired Encounter Wheel residue",
    markers: [
      "encounterSessions",
      "selectedEncounterSessionId",
      "encounterModalOpen",
      "encounterWheelDefinitions",
      "encounterWheelDefinition(",
      "startEncounterSession(",
      "spinEncounterWheel(",
      "renderEncounterOverlay(",
      "encounter-token-runtime.js",
      "Encounter Wheel",
      "encounter-roll:",
      'sourceType === "encounter"',
      'sourceType: "encounter"',
      'locationId: "encounter"',
      'serviceId: "encounter-wheel"',
    ],
  },
  {
    name: "Encounter-specific token contract residue",
    markers: [
      'resolverId: "extraEncounter"',
      'resolverId: "encounterWheelEdit"',
      'resolverId: "encounterTransfer"',
      'resolverId: "encounterGrant"',
      'resolverId: "encounterCopy"',
      'resolverId: "encounterChoose"',
      '"extraEncounter"',
      '"encounterWheelEdit"',
      '"encounterTransfer"',
      '"encounterGrant"',
      '"encounterCopy"',
      '"encounterChoose"',
    ],
  },
  {
    name: "Encounter CSS/static residue",
    markers: [
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
  },
  {
    name: "Obsolete encounter QA/test names",
    markers: [
      "test-encounter-token-runtime.js",
      "encounter-token-runtime",
      "encounter runtime",
      "Encounter runtime",
    ],
  },
];

const TEXT_EXTENSIONS = new Set([
  ".js", ".mjs", ".cjs", ".json", ".html", ".css", ".md", ".txt", ".yml", ".yaml", ".toml",
]);

function trackedTextFiles() {
  return git(["ls-files", "-z"]).split("\0").filter(Boolean).filter((rel) => {
    const ext = path.extname(rel).toLowerCase();
    if (!TEXT_EXTENSIONS.has(ext)) return false;
    try {
      return fs.statSync(path.join(ROOT, rel)).size <= 6 * 1024 * 1024;
    } catch (_) {
      return false;
    }
  });
}

function main() {
  ensureSafe();
  const head = git(["rev-parse", "HEAD"]);
  const app = read("app.js");
  const index = read("index.html");

  const requiredCurrentMarkers = [
    "function renderActionPhase() {\n  renderV2RouteActionPhase();\n}",
    "const V2_ROUTE_TOKEN_IDS",
    "function useV2RouteRerollToken(",
    "function useV2ExtraEncounter(",
    "function applyV2RouteRepel(",
    "function useV2MasterBallOnOpportunity(",
    "randomPokemonSessions: []",
    "function renderRandomPokemonPanel(",
    "function renderWheelPanel(",
  ];
  for (const marker of requiredCurrentMarkers) {
    if (!app.includes(marker)) throw new Error(`Current runtime invariant missing before survey: ${marker}`);
  }

  for (const marker of [
    "state.hiddenGrottoSessions",
    "function startHiddenGrottoSession(",
    "state.encounterSessions",
    "function startEncounterSession(",
    "function spinEncounterWheel(",
    "function renderEncounterOverlay(",
  ]) {
    if (app.includes(marker)) throw new Error(`Previous purge invariant failed: ${marker} remains in app.js.`);
  }
  for (const marker of ["encounterTab", "encounterOverlay", "Encounter Wheel"]) {
    if (index.includes(marker)) throw new Error(`Previous purge invariant failed: ${marker} remains in index.html.`);
  }

  const files = trackedTextFiles();
  const fileText = new Map();
  for (const rel of files) {
    try { fileText.set(rel, read(rel)); } catch (_) {}
  }

  const hits = [];
  for (const group of GROUPS) {
    for (const [rel, text] of fileText.entries()) {
      for (const marker of group.markers) {
        let from = 0;
        let occurrence = 0;
        while (true) {
          const index = text.indexOf(marker, from);
          if (index < 0) break;
          occurrence += 1;
          const ctx = contextFor(text, index, 2);
          hits.push({
            group: group.name,
            category: categoryFor(rel),
            rel,
            marker,
            occurrence,
            line: ctx.line,
            context: ctx.text,
          });
          from = index + Math.max(marker.length, 1);
          if (occurrence >= 50) break;
        }
      }
    }
  }

  const dedupe = new Map();
  for (const hit of hits) {
    const key = `${hit.group}\u0000${hit.rel}\u0000${hit.marker}\u0000${hit.line}`;
    if (!dedupe.has(key)) dedupe.set(key, hit);
  }
  const uniqueHits = [...dedupe.values()].sort((a, b) =>
    a.group.localeCompare(b.group) || a.category.localeCompare(b.category) || a.rel.localeCompare(b.rel) || a.line - b.line
  );

  const summary = new Map();
  for (const hit of uniqueHits) {
    const key = `${hit.group}\u0000${hit.category}\u0000${hit.rel}\u0000${hit.marker}`;
    const item = summary.get(key) || { group: hit.group, category: hit.category, rel: hit.rel, marker: hit.marker, lines: [] };
    if (!item.lines.includes(hit.line)) item.lines.push(hit.line);
    summary.set(key, item);
  }

  const out = [
    "# V1 Purge Stage 6 — Whole-Repo Contamination Survey",
    "",
    `Generated from \`${head}\` after Stage 5C removed the retired Encounter Wheel runtime.`,
    "",
    "Purpose: identify remaining retired V1 contamination without treating current Route, shared Random Pokemon, generic wheel infrastructure, or the current Legacy feature as obsolete.",
    "",
    "## Summary",
    "",
    `Tracked text files scanned: **${fileText.size}**`,
    `Unique marker hits: **${uniqueHits.length}**`,
    "",
    "| Group | Category | File | Marker | Lines |",
    "|---|---|---|---|---|",
  ];

  for (const item of [...summary.values()].sort((a, b) =>
    a.group.localeCompare(b.group) || a.category.localeCompare(b.category) || a.rel.localeCompare(b.rel) || a.marker.localeCompare(b.marker)
  )) {
    out.push(`| ${item.group} | ${item.category} | \`${item.rel}\` | \`${item.marker.replace(/\|/g, "\\|")}\` | ${item.lines.join(", ")} |`);
  }

  out.push("", "## Detailed contexts", "");
  let currentGroup = "";
  for (const hit of uniqueHits) {
    if (hit.group !== currentGroup) {
      currentGroup = hit.group;
      out.push(`\n### ${currentGroup}\n`);
    }
    out.push(`#### ${hit.category} — \`${hit.rel}\` — \`${hit.marker}\` — line ${hit.line}\n`);
    out.push("```text");
    out.push(hit.context);
    out.push("```", "");
  }

  fs.writeFileSync(REPORT_PATH, `${out.join("\n")}\n`, "utf8");
  git(["add", REPORT_REL]);
  execFileSync("git", ["diff", "--cached", "--check"], { cwd: ROOT, stdio: "inherit" });
  const staged = git(["diff", "--cached", "--stat"]);
  if (!staged) throw new Error("Stage 6 survey produced no report changes.");
  console.log(`\n${staged}`);
  git(["commit", "-m", "Map remaining V1 contamination"], { inherit: true });
  git(["push", "origin", EXPECTED_BRANCH], { inherit: true });
  console.log(`\nStage 6 survey complete: wrote and pushed ${REPORT_REL}.`);
}

try {
  main();
} catch (error) {
  console.error(`\nV1 purge Stage 6 survey failed safely:\n${error.message}`);
  process.exitCode = 1;
}
