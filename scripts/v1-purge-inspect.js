#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const EXPECTED_BRANCH = "audit/purge-v1-runtime";
const REPORT_PATH = path.join(ROOT, "V1_PURGE_RUNTIME_CONTEXT.md");

function git(args, options = {}) {
  return execFileSync("git", args, {
    cwd: ROOT,
    encoding: "utf8",
    stdio: options.inherit ? "inherit" : ["ignore", "pipe", "pipe"],
  }).trim();
}

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function lineNumberAt(text, index) {
  return text.slice(0, index).split("\n").length;
}

function contextsFor(relativePath, patterns, radius = 12, maxPerPattern = 12) {
  const text = read(relativePath);
  const lines = text.split("\n");
  const sections = [];

  for (const pattern of patterns) {
    const needle = typeof pattern === "string" ? pattern : pattern.needle;
    const label = typeof pattern === "string" ? pattern : pattern.label;
    let from = 0;
    const hits = [];
    while (hits.length < maxPerPattern) {
      const index = text.indexOf(needle, from);
      if (index === -1) break;
      hits.push(index);
      from = index + Math.max(1, needle.length);
    }

    sections.push(`### ${label}\n\nOccurrences shown: ${hits.length}${hits.length === maxPerPattern ? "+" : ""}\n`);
    if (!hits.length) {
      sections.push("_No occurrences._\n");
      continue;
    }

    hits.forEach((index, hitIndex) => {
      const line = lineNumberAt(text, index);
      const start = Math.max(1, line - radius);
      const end = Math.min(lines.length, line + radius);
      const snippet = lines
        .slice(start - 1, end)
        .map((value, offset) => `${String(start + offset).padStart(6, " ")} | ${value}`)
        .join("\n");
      sections.push(`\n#### Hit ${hitIndex + 1} — line ${line}\n\n\`\`\`\`text\n${snippet}\n\`\`\`\`\n`);
    });
  }

  return sections.join("\n");
}

function ensureSafeBranch() {
  const branch = git(["branch", "--show-current"]);
  if (branch !== EXPECTED_BRANCH) {
    throw new Error(`Refusing to run on ${branch || "detached HEAD"}. Switch to ${EXPECTED_BRANCH} first.`);
  }

  const status = git(["status", "--porcelain"]);
  if (status) {
    throw new Error(`Working tree must be clean before inspection. Current changes:\n${status}`);
  }
}

function main() {
  ensureSafeBranch();

  const head = git(["rev-parse", "HEAD"]);
  const sections = [
    "# V1 Purge Runtime Context",
    "",
    `Generated from \`${head}\` on \`${EXPECTED_BRANCH}\`.`,
    "",
    "This report is temporary purge tooling. It records exact current code boundaries so V1 can be removed surgically without relying on stale line numbers or keyword-wide deletion.",
    "",
  ];

  sections.push("## app.js — version contract and dispatch\n");
  sections.push(contextsFor("app.js", [
    "ACTION_PHASE_VERSION_V1",
    "ACTION_PHASE_VERSION_V2",
    "function normalizeActionPhaseVersion",
    "function activeActionPhaseVersion",
    "supportedActionPhaseVersions",
    "function renderActionPhase()",
    "activeActionPhaseVersion() === ACTION_PHASE_VERSION_V1",
    "activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2",
  ], 18));

  sections.push("\n## app.js — retired encounter domains\n");
  sections.push(contextsFor("app.js", [
    "hiddenGrottoSessions",
    "function startHiddenGrottoSession",
    "encounterWheelDefinition",
    "encounterTokenRuntime",
    "rivalSagaEncounterTokenRuntime",
    "encounterOverlay",
    "includeFishing",
    "includeSurf",
  ], 14));

  sections.push("\n## server.js — persisted version contract\n");
  sections.push(contextsFor("server.js", [
    "ACTION_PHASE_VERSION_V1",
    "ACTION_PHASE_VERSION_V2",
    "function normalizeActionPhaseVersion",
    "function persistedActionPhaseVersion",
    "actionPhaseVersion",
  ], 18));

  sections.push("\n## index.html — retired encounter UI\n");
  sections.push(contextsFor("index.html", [
    "Encounter Wheel",
    "encounterOverlay",
    "encounterTab",
    "Hidden Grotto",
    "encounter-token-runtime.js",
  ], 12));

  sections.push("\n## token-effect-contract.js — old wheel semantics\n");
  sections.push(contextsFor("token-effect-contract.js", [
    "reroll-token",
    "extra-encounter-token",
    "repel-token",
    "dream-ball-token",
    "honey-token",
    "master-ball-token",
    "Hidden Grotto",
    "Encounter Wheel",
  ], 10));

  sections.push("\n## action-phase-balance.js — mixed/shared boundary\n");
  sections.push(contextsFor("action-phase-balance.js", [
    "consolidatedTier",
    "GAME_CORNER",
    "SILPH_COSTS",
    "curseRolls",
    "module.exports",
    "rivalSagaActionPhaseBalance",
  ], 12));

  sections.push("\n## package.json — legacy scripts/tests\n");
  sections.push(contextsFor("package.json", [
    "import:encounters:hoenn",
    "test:action-balance",
    "test:action-workspace",
    "test:v2-route",
    "audit:v2-routes",
  ], 5));

  fs.writeFileSync(REPORT_PATH, `${sections.join("\n")}\n`, "utf8");
  git(["add", path.relative(ROOT, REPORT_PATH)]);
  git(["commit", "-m", "Capture exact V1 purge runtime boundaries"], { inherit: true });
  git(["push", "origin", EXPECTED_BRANCH], { inherit: true });

  console.log(`\nWrote and pushed ${path.basename(REPORT_PATH)}.`);
}

try {
  main();
} catch (error) {
  console.error(`\nV1 purge inspection failed safely:\n${error.message}`);
  process.exitCode = 1;
}
