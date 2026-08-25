#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const EXPECTED_BRANCH = "audit/purge-v1-runtime";
const REPORT_REL = "V1_PURGE_STAGE3_CONTEXT.md";
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

function lineAt(text, index) {
  return text.slice(0, index).split("\n").length;
}

function contexts(text, needle, radius = 10, max = 40) {
  const lines = text.split("\n");
  const hits = [];
  let from = 0;
  while (hits.length < max) {
    const index = text.indexOf(needle, from);
    if (index < 0) break;
    hits.push(index);
    from = index + Math.max(1, needle.length);
  }
  const out = [`Occurrences: ${hits.length}${hits.length === max ? "+" : ""}`];
  for (const [i, index] of hits.entries()) {
    const line = lineAt(text, index);
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

function matchingFunctions(text, matcher) {
  const results = [];
  const re = /(^|\n)(async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\([^)]*\)\s*\{/g;
  let match;
  while ((match = re.exec(text))) {
    const name = match[3];
    const open = text.indexOf("{", match.index);
    let depth = 0;
    let quote = "";
    let templateDepth = 0;
    let escaped = false;
    let end = -1;
    for (let i = open; i < text.length; i += 1) {
      const ch = text[i];
      const next = text[i + 1];
      if (quote) {
        if (escaped) { escaped = false; continue; }
        if (ch === "\\") { escaped = true; continue; }
        if (quote === "`" && ch === "$" && next === "{") { templateDepth += 1; i += 1; continue; }
        if (quote === "`" && ch === "}" && templateDepth > 0) { templateDepth -= 1; continue; }
        if (ch === quote && (quote !== "`" || templateDepth === 0)) quote = "";
        continue;
      }
      if (ch === "'" || ch === '"' || ch === "`") { quote = ch; continue; }
      if (ch === "/" && next === "/") {
        const nl = text.indexOf("\n", i + 2);
        i = nl < 0 ? text.length : nl;
        continue;
      }
      if (ch === "/" && next === "*") {
        const close = text.indexOf("*/", i + 2);
        i = close < 0 ? text.length : close + 1;
        continue;
      }
      if (ch === "{") depth += 1;
      if (ch === "}") {
        depth -= 1;
        if (depth === 0) { end = i + 1; break; }
      }
    }
    if (end < 0) continue;
    const source = text.slice(match.index + (match[1] ? 1 : 0), end);
    if (!matcher.test(name) && !matcher.test(source)) continue;
    const startLine = lineAt(text, match.index + (match[1] ? 1 : 0));
    const endLine = lineAt(text, end - 1);
    const refs = (text.match(new RegExp(`\\b${name}\\b`, "g")) || []).length;
    results.push({ name, startLine, endLine, chars: source.length, refs, source });
  }
  return results;
}

function ensureSafe() {
  const branch = git(["branch", "--show-current"]);
  if (branch !== EXPECTED_BRANCH) throw new Error(`Refusing to run on ${branch || "detached HEAD"}.`);
  const status = git(["status", "--porcelain"]);
  if (status) throw new Error(`Working tree must be clean before survey.\n${status}`);
}

function main() {
  ensureSafe();
  const head = git(["rev-parse", "HEAD"]);
  const app = read("app.js");
  const index = read("index.html");
  const tokenContract = read("token-effect-contract.js");
  const packageJson = read("package.json");
  const encounterRuntimePath = path.join(ROOT, "encounter-token-runtime.js");
  const encounterRuntime = fs.existsSync(encounterRuntimePath) ? fs.readFileSync(encounterRuntimePath, "utf8") : "";

  if (app.includes("ACTION_PHASE_VERSION_V1")) throw new Error("Stage 1 invariant failed: ACTION_PHASE_VERSION_V1 still exists.");
  if (!app.includes("function renderActionPhase() {\n  renderV2RouteActionPhase();\n}")) {
    throw new Error("Stage 2 invariant failed: renderActionPhase is not current-only.");
  }

  const sections = [
    "# V1 Purge Stage 3 Context",
    "",
    `Generated from \`${head}\` after the current-only renderer purge.`,
    "",
    "Purpose: map remaining retired Encounter Wheel / Hidden Grotto runtime and distinguish it from current Route encounter/token code.",
    "",
  ];

  const appNeedles = [
    "encounterTokenRuntime",
    "metadata.resolverId === \"extraEncounter\"",
    "V2_ROUTE_TOKEN_IDS",
    "extra-encounter-token",
    "encounterWheelDefinition",
    "encounterSessions",
    "renderWheelPanel",
    "encounterOverlay",
    "hiddenGrottoSessions",
    "hidden-grotto",
    "Hidden Grotto",
    "startHiddenGrottoSession",
    "renderHiddenGrottoDetails",
    "includeFishing",
    "includeSurf",
    "Hyperspace",
    "randomPokemonSessions",
    "activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2",
    "activeActionPhaseVersion() !== ACTION_PHASE_VERSION_V2",
  ];

  sections.push("## app.js — remaining reference contexts\n");
  for (const needle of appNeedles) {
    sections.push(`### ${needle}\n\n${contexts(app, needle, 12)}\n`);
  }

  const funcs = matchingFunctions(app, /(hiddenGrotto|encounterWheel|encounterSession|renderWheel|fishing|surf|hyperspace|randomPokemon|extraEncounter)/i);
  sections.push("\n## app.js — candidate function inventory\n");
  sections.push("| Function | Lines | Chars | Whole-file name refs |\n|---|---:|---:|---:|");
  for (const fn of funcs) sections.push(`| \`${fn.name}\` | ${fn.startLine}-${fn.endLine} | ${fn.chars} | ${fn.refs} |`);
  sections.push("");

  for (const fn of funcs) {
    sections.push(`### Function ${fn.name} — lines ${fn.startLine}-${fn.endLine}\n`);
    if (fn.source.length <= 8000) {
      sections.push(`\`\`\`javascript\n${fn.source}\n\`\`\`\n`);
    } else {
      const fnLines = fn.source.split("\n");
      sections.push(`Large function (${fn.source.length} chars). First/last 35 lines:\n\n\`\`\`javascript\n${fnLines.slice(0, 35).join("\n")}\n...\n${fnLines.slice(-35).join("\n")}\n\`\`\`\n`);
    }
  }

  sections.push("\n## index.html — retired static encounter UI\n");
  for (const needle of ["Encounter Wheel", "encounterOverlay", "encounterTab", "Hidden Grotto", "encounter-token-runtime.js"]) {
    sections.push(`### ${needle}\n\n${contexts(index, needle, 10)}\n`);
  }

  sections.push("\n## token-effect-contract.js — encounter wording\n");
  for (const needle of ["extra-encounter-token", "reroll-token", "repel-token", "dream-ball-token", "honey-token", "master-ball-token", "Encounter Wheel", "Hidden Grotto"]) {
    sections.push(`### ${needle}\n\n${contexts(tokenContract, needle, 9)}\n`);
  }

  sections.push("\n## package.json — encounter/runtime tests and scripts\n");
  for (const needle of ["encounter", "action-workspace", "action-balance", "v2-route"]) {
    sections.push(`### ${needle}\n\n${contexts(packageJson, needle, 4)}\n`);
  }

  sections.push("\n## encounter-token-runtime.js — full retired runtime candidate\n");
  sections.push(encounterRuntime ? `\`\`\`javascript\n${encounterRuntime}\n\`\`\`` : "_File not present._");

  fs.writeFileSync(REPORT_PATH, `${sections.join("\n")}\n`, "utf8");
  git(["add", REPORT_REL]);
  git(["commit", "-m", "Capture post-renderer V1 dead-domain boundaries"], { inherit: true });
  git(["push", "origin", EXPECTED_BRANCH], { inherit: true });
  console.log(`\nStage 3 survey complete: wrote and pushed ${REPORT_REL}.`);
}

try {
  main();
} catch (error) {
  console.error(`\nV1 purge Stage 3 survey failed safely:\n${error.message}`);
  process.exitCode = 1;
}
