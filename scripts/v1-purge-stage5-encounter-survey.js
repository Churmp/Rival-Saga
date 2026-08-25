#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const EXPECTED_BRANCH = "audit/purge-v1-runtime";
const REPORT_REL = "V1_PURGE_STAGE5_CONTEXT.md";
const REPORT_PATH = path.join(ROOT, REPORT_REL);

function git(args, { inherit = false } = {}) {
  const result = execFileSync("git", args, {
    cwd: ROOT,
    encoding: "utf8",
    stdio: inherit ? "inherit" : ["ignore", "pipe", "pipe"],
  });
  return typeof result === "string" ? result.trim() : "";
}

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}

function lineNumber(text, index) {
  return text.slice(0, index).split("\n").length;
}

function hitLines(text, needle, max = 100) {
  const hits = [];
  let from = 0;
  while (hits.length < max) {
    const index = text.indexOf(needle, from);
    if (index < 0) break;
    hits.push(lineNumber(text, index));
    from = index + Math.max(needle.length, 1);
  }
  return hits;
}

function contexts(text, needle, radius = 18, max = 30) {
  const lines = text.split("\n");
  const hits = [];
  let from = 0;
  while (hits.length < max) {
    const index = text.indexOf(needle, from);
    if (index < 0) break;
    hits.push(index);
    from = index + Math.max(needle.length, 1);
  }
  const out = [`Occurrences: ${hits.length}${hits.length === max ? "+" : ""}`];
  for (const [i, index] of hits.entries()) {
    const line = lineNumber(text, index);
    const start = Math.max(1, line - radius);
    const end = Math.min(lines.length, line + radius);
    out.push(`\n#### Hit ${i + 1} — line ${line}\n\n\`\`\`text`);
    for (let n = start; n <= end; n += 1) {
      out.push(`${String(n).padStart(6, " ")} | ${lines[n - 1]}`);
    }
    out.push("```\n");
  }
  return out.join("\n");
}

function declarationIndex(text, matcher) {
  const rows = [];
  const regex = /(^|\n)(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(|(^|\n)(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=/g;
  let match;
  while ((match = regex.exec(text))) {
    const name = match[2] || match[4] || "";
    if (!matcher.test(name)) continue;
    const index = match.index + ((match[1] || match[3]) ? 1 : 0);
    rows.push({ name, line: lineNumber(text, index) });
  }
  return rows;
}

function ensureSafe() {
  const branch = git(["branch", "--show-current"]);
  if (branch !== EXPECTED_BRANCH) {
    throw new Error(`Refusing to run on ${branch || "detached HEAD"}. Switch to ${EXPECTED_BRANCH}.`);
  }
  const status = git(["status", "--porcelain"]);
  if (status) throw new Error(`Working tree must be clean before Stage 5 survey.\n${status}`);
}

function main() {
  ensureSafe();
  const head = git(["rev-parse", "HEAD"]);
  const app = read("app.js");
  const index = read("index.html");
  const styles = read("styles.css");
  const tokenContract = read("token-effect-contract.js");
  const packageJson = read("package.json");
  const encounterRuntimePath = path.join(ROOT, "encounter-token-runtime.js");
  const encounterRuntime = fs.existsSync(encounterRuntimePath)
    ? fs.readFileSync(encounterRuntimePath, "utf8")
    : "";

  if (app.includes("ACTION_PHASE_VERSION_V1")) {
    throw new Error("Stage 1 invariant failed: ACTION_PHASE_VERSION_V1 still exists.");
  }
  if (!app.includes("function renderActionPhase() {\n  renderV2RouteActionPhase();\n}")) {
    throw new Error("Stage 2 invariant failed: Action Phase renderer is not current-only.");
  }
  for (const marker of [
    "state.hiddenGrottoSessions",
    "function startHiddenGrottoSession(",
    'id: "hidden-grotto"',
  ]) {
    if (app.includes(marker)) throw new Error(`Stage 4 invariant failed: ${marker} remains.`);
  }
  for (const marker of [
    "const V2_ROUTE_TOKEN_IDS",
    "function useV2RouteRerollToken(",
    "function useV2ExtraEncounter(",
    "function applyV2RouteRepel(",
    "function useV2MasterBallOnOpportunity(",
  ]) {
    if (!app.includes(marker)) throw new Error(`Current Route invariant missing: ${marker}`);
  }

  const files = {
    "app.js": app,
    "index.html": index,
    "styles.css": styles,
    "token-effect-contract.js": tokenContract,
    "package.json": packageJson,
    "encounter-token-runtime.js": encounterRuntime,
  };

  const needles = {
    "app.js": [
      "encounterTokenRuntime",
      "function resolveImmediateTokenUse(",
      'metadata.resolverId === "extraEncounter"',
      "extraEncounterValidation",
      "encounterWheelDefinitions",
      "function encounterWheelDefinition(",
      "function encounterWheelKey(",
      "encounterSessions",
      "function activeEncounterSession(",
      "function renderWheelPanel(",
      "function closeWheelPanel(",
      "encounterOverlay",
      "encounterTab",
      "includeFishing",
      "includeSurf",
      "Fishing",
      "Surf",
      "Hyperspace",
      "randomPokemonSessions",
      "function useV2ExtraEncounter(",
      "function useV2RouteRerollToken(",
      "function applyV2RouteRepel(",
      "function useV2MasterBallOnOpportunity(",
    ],
    "index.html": [
      "encounter-token-runtime.js",
      "encounterTab",
      "encounterOverlay",
      "Encounter Wheel",
      "includeFishing",
      "includeSurf",
    ],
    "styles.css": [
      ".encounter-overlay",
      ".encounter-tab",
      ".encounter-modal",
      ".encounter-wheel",
      "fishing",
      "surf",
    ],
    "token-effect-contract.js": [
      "extra-encounter-token",
      "reroll-token",
      "repel-token",
      "dream-ball-token",
      "honey-token",
      "master-ball-token",
      "extraEncounter",
      "Encounter Wheel",
      "Hidden Grotto",
    ],
    "package.json": [
      "encounter",
      "action-workspace",
      "action-balance",
      "v2-route",
    ],
  };

  const sections = [
    "# V1 Purge Stage 5 Encounter Context",
    "",
    `Generated from \`${head}\` after Hidden Grotto runtime removal.`,
    "",
    "Purpose: isolate the retired Encounter Wheel and legacy encounter-token runtime from the current Route encounter/token system.",
    "",
    "## Compact occurrence index",
    "",
  ];

  for (const [file, fileNeedles] of Object.entries(needles)) {
    sections.push(`### ${file}`);
    sections.push("");
    for (const needle of fileNeedles) {
      const hits = hitLines(files[file], needle);
      sections.push(`- \`${needle}\`: ${hits.length} occurrence(s)${hits.length ? ` — lines ${hits.join(", ")}` : ""}`);
    }
    sections.push("");
  }

  sections.push("## app.js candidate declaration index\n");
  const declarations = declarationIndex(app, /(encounter|wheel|fishing|surf|hyperspace|randomPokemon)/i);
  sections.push("| Declaration | Line |\n|---|---:|");
  for (const row of declarations) sections.push(`| \`${row.name}\` | ${row.line} |`);
  sections.push("");

  for (const [file, fileNeedles] of Object.entries(needles)) {
    sections.push(`\n## ${file} detailed contexts\n`);
    for (const needle of fileNeedles) {
      sections.push(`### ${needle}\n\n${contexts(files[file], needle)}\n`);
    }
  }

  sections.push("\n## encounter-token-runtime.js full source\n");
  sections.push(encounterRuntime
    ? `\`\`\`javascript\n${encounterRuntime}\n\`\`\``
    : "_File not present._");

  fs.writeFileSync(REPORT_PATH, `${sections.join("\n")}\n`, "utf8");
  git(["add", REPORT_REL]);
  git(["commit", "-m", "Map legacy Encounter Wheel purge boundaries"], { inherit: true });
  git(["push", "origin", EXPECTED_BRANCH], { inherit: true });
  console.log(`\nStage 5 survey complete: wrote and pushed ${REPORT_REL}.`);
}

try {
  main();
} catch (error) {
  console.error(`\nV1 purge Stage 5 survey failed safely:\n${error.message}`);
  process.exitCode = 1;
}
