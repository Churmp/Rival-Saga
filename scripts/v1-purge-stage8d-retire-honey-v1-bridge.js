#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const EXPECTED_BRANCH = "audit/purge-v1-runtime";
const APP_REL = "app.js";
const APP_PATH = path.join(ROOT, APP_REL);
const CONTRACT_PATH = path.join(ROOT, "token-effect-contract.js");
const CONTROL_EFFECTS_PATH = path.join(ROOT, "token-control-effects.js");
const SANDBOX_TEST_PATH = path.join(ROOT, "scripts/test-token-sandbox.js");

const HONEY_FUNCTIONS = [
  "augmentHoneyCausalUndoAfterAcquisition",
  "honeyEligibleEncounterResults",
  "ensureHoneyEndOfActionProcedures",
  "honeyProcedureForActivity",
  "liveRefereeHoneyProcedureScreenMarkup",
  "resolveHoneyEndOfActionProcedure",
];

function git(args, { inherit = false } = {}) {
  const result = execFileSync("git", args, {
    cwd: ROOT,
    encoding: "utf8",
    stdio: inherit ? "inherit" : ["ignore", "pipe", "pipe"],
  });
  return typeof result === "string" ? result.trim() : "";
}

function run(command, args) {
  execFileSync(command, args, { cwd: ROOT, stdio: "inherit" });
}

function count(text, needle) {
  return text.split(needle).length - 1;
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function matchingBraceEnd(text, openIndex) {
  if (text[openIndex] !== "{") throw new Error("Balanced-brace scan did not start on an opening brace.");
  let depth = 0;
  let mode = "code";
  let escaped = false;
  for (let i = openIndex; i < text.length; i += 1) {
    const ch = text[i];
    const next = text[i + 1];
    if (mode === "line-comment") {
      if (ch === "\n") mode = "code";
      continue;
    }
    if (mode === "block-comment") {
      if (ch === "*" && next === "/") { mode = "code"; i += 1; }
      continue;
    }
    if (["single", "double", "template"].includes(mode)) {
      if (escaped) { escaped = false; continue; }
      if (ch === "\\") { escaped = true; continue; }
      if ((mode === "single" && ch === "'") || (mode === "double" && ch === '"') || (mode === "template" && ch === "`")) mode = "code";
      continue;
    }
    if (ch === "/" && next === "/") { mode = "line-comment"; i += 1; continue; }
    if (ch === "/" && next === "*") { mode = "block-comment"; i += 1; continue; }
    if (ch === "'") { mode = "single"; continue; }
    if (ch === '"') { mode = "double"; continue; }
    if (ch === "`") { mode = "template"; continue; }
    if (ch === "{") depth += 1;
    if (ch === "}") {
      depth -= 1;
      if (depth === 0) return i + 1;
      if (depth < 0) throw new Error("Balanced-brace scan underflowed.");
    }
  }
  throw new Error("Balanced-brace scan reached EOF before closing the block.");
}

function trimWholeLineRange(text, start, end) {
  let lineStart = text.lastIndexOf("\n", Math.max(0, start - 1));
  lineStart = lineStart < 0 ? 0 : lineStart + 1;
  if (text.slice(lineStart, start).trim()) lineStart = start;

  let finalEnd = end;
  while (finalEnd < text.length && (text[finalEnd] === " " || text[finalEnd] === "\t")) finalEnd += 1;
  if (text.startsWith("\r\n", finalEnd)) finalEnd += 2;
  else if (text[finalEnd] === "\n") finalEnd += 1;

  if (lineStart !== start) {
    if (text.startsWith("\r\n", finalEnd)) finalEnd += 2;
    else if (text[finalEnd] === "\n") finalEnd += 1;
  }
  return { start: lineStart, end: finalEnd };
}

function removeNamedFunction(text, name) {
  const re = new RegExp(`(?:async\\s+)?function\\s+${escapeRegExp(name)}\\s*\\(`, "g");
  const matches = [...text.matchAll(re)];
  if (matches.length !== 1) throw new Error(`${name}: expected exactly one function definition, found ${matches.length}.`);
  const start = matches[0].index;
  const open = text.indexOf("{", start);
  if (open < 0) throw new Error(`${name}: opening brace not found.`);
  const end = matchingBraceEnd(text, open);
  const range = trimWholeLineRange(text, start, end);
  return text.slice(0, range.start) + text.slice(range.end);
}

function removeIfBlock(text, marker, label) {
  if (count(text, marker) !== 1) throw new Error(`${label}: expected exactly one marker, found ${count(text, marker)}.`);
  const markerAt = text.indexOf(marker);
  const ifAt = text.lastIndexOf("if", markerAt);
  if (ifAt < 0 || markerAt - ifAt > 12) throw new Error(`${label}: could not locate owning if statement.`);
  const open = text.indexOf("{", markerAt);
  if (open < 0) throw new Error(`${label}: opening brace not found.`);
  const end = matchingBraceEnd(text, open);
  const after = text.slice(end).match(/^\s*else\b/);
  if (after) throw new Error(`${label}: unexpected else branch; refusing automatic removal.`);
  const range = trimWholeLineRange(text, ifAt, end);
  return text.slice(0, range.start) + text.slice(range.end);
}

function statementEnd(text, start) {
  let paren = 0;
  let bracket = 0;
  let brace = 0;
  let mode = "code";
  let escaped = false;
  for (let i = start; i < text.length; i += 1) {
    const ch = text[i];
    const next = text[i + 1];
    if (mode === "line-comment") {
      if (ch === "\n") mode = "code";
      continue;
    }
    if (mode === "block-comment") {
      if (ch === "*" && next === "/") { mode = "code"; i += 1; }
      continue;
    }
    if (["single", "double", "template"].includes(mode)) {
      if (escaped) { escaped = false; continue; }
      if (ch === "\\") { escaped = true; continue; }
      if ((mode === "single" && ch === "'") || (mode === "double" && ch === '"') || (mode === "template" && ch === "`")) mode = "code";
      continue;
    }
    if (ch === "/" && next === "/") { mode = "line-comment"; i += 1; continue; }
    if (ch === "/" && next === "*") { mode = "block-comment"; i += 1; continue; }
    if (ch === "'") { mode = "single"; continue; }
    if (ch === '"') { mode = "double"; continue; }
    if (ch === "`") { mode = "template"; continue; }
    if (ch === "(") paren += 1;
    else if (ch === ")") paren -= 1;
    else if (ch === "[") bracket += 1;
    else if (ch === "]") bracket -= 1;
    else if (ch === "{") brace += 1;
    else if (ch === "}") brace -= 1;
    else if (ch === ";" && paren === 0 && bracket === 0 && brace === 0) return i + 1;
  }
  throw new Error("Statement scan reached EOF before finding a terminating semicolon.");
}

function removeStatementStartingWith(text, marker, label) {
  if (count(text, marker) !== 1) throw new Error(`${label}: expected exactly one marker, found ${count(text, marker)}.`);
  const markerAt = text.indexOf(marker);
  let start = text.lastIndexOf("\n", Math.max(0, markerAt - 1));
  start = start < 0 ? 0 : start + 1;
  if (!text.slice(start, markerAt).trim().match(/^$/)) throw new Error(`${label}: marker is not at the start of a statement line.`);
  const end = statementEnd(text, markerAt);
  const range = trimWholeLineRange(text, start, end);
  return text.slice(0, range.start) + text.slice(range.end);
}

function ensureSafeStart(app, contract, controlEffects, sandbox) {
  const branch = git(["branch", "--show-current"]);
  if (branch !== EXPECTED_BRANCH) throw new Error(`Refusing to run on ${branch || "detached HEAD"}. Switch to ${EXPECTED_BRANCH}.`);
  const status = git(["status", "--porcelain"]);
  if (status) throw new Error(`Working tree must be clean before Stage 8D.\n${status}`);

  for (const marker of [
    "function renderActionPhase() {\n  renderV2RouteActionPhase();\n}",
    "const V2_ROUTE_TOKEN_IDS",
    "function useV2RouteRerollToken(",
    "function useV2ExtraEncounter(",
    "function applyV2RouteRepel(",
    "function useV2MasterBallOnOpportunity(",
    "function createPokemonResultTimingWindow(",
    "randomPokemonSessions: []",
    "function renderRandomPokemonPanel(",
    "function renderWheelPanel(",
  ]) if (!app.includes(marker)) throw new Error(`Current/shared runtime invariant missing: ${marker}`);

  for (const marker of [
    "state.encounterSessions",
    "function startEncounterSession(",
    "encounterWheelDefinition(",
    'label: "Open Encounter Wheel"',
  ]) if (app.includes(marker)) throw new Error(`Previous Encounter purge invariant failed: ${marker}`);

  for (const name of HONEY_FUNCTIONS) {
    const matches = [...app.matchAll(new RegExp(`(?:async\\s+)?function\\s+${escapeRegExp(name)}\\s*\\(`, "g"))];
    if (matches.length !== 1) throw new Error(`${name}: expected exactly one pre-purge definition, found ${matches.length}.`);
  }

  if (!app.includes('if (pending?.sourceType === "honey-end-action") {')) throw new Error("Honey Live Referee render branch is missing.");
  if (!app.includes('const honeyChoice = liveClosestEventTarget(event, "[data-honey-result-choice]");')) throw new Error("Honey Live Referee click declaration is missing.");
  if (!app.includes("const honeyProcedures = ensureHoneyEndOfActionProcedures();")) throw new Error("Honey Action->Battle transition declaration is missing.");
  if (!app.includes("const honeyAcquisitionSnapshot")) throw new Error("Honey acquisition snapshot declaration is missing.");
  if (!app.includes("augmentHoneyCausalUndoAfterAcquisition(randomSession, honeyAcquisitionSnapshot)")) throw new Error("Honey acquisition augmentation call is missing.");

  if (!controlEffects.includes("function resolveHoneyEncounterCopy(")) throw new Error("Deferred Honey helper is missing from token-control-effects.js.");
  if (!sandbox.includes("[TSB-027]")) throw new Error("TSB-027 is missing from token sandbox tests.");
  if (!sandbox.includes("controlTokenEffects.resolveHoneyEncounterCopy")) throw new Error("TSB-027/deferred Honey helper coverage is missing.");
  if (!contract.includes('encounter({ id: "honey-token"')) throw new Error("Honey contract definition is unexpectedly missing before the later contract migration stage.");
}

function assertAfter(app, originalContract, contract, controlEffects, sandbox) {
  for (const name of HONEY_FUNCTIONS) {
    if (new RegExp(`(?:async\\s+)?function\\s+${escapeRegExp(name)}\\s*\\(`).test(app)) {
      throw new Error(`Retired Honey V1 function remains: ${name}`);
    }
  }

  for (const marker of [
    'pending?.sourceType === "honey-end-action"',
    "[data-honey-result-choice]",
    "ensureHoneyEndOfActionProcedures()",
    "honeyAcquisitionSnapshot",
    "augmentHoneyCausalUndoAfterAcquisition(",
    'sourceType: "honey-end-action"',
    'type: "honey-encounter-copy"',
  ]) if (app.includes(marker)) throw new Error(`Retired Honey V1 app bridge remains: ${marker}`);

  for (const marker of [
    "const V2_ROUTE_TOKEN_IDS",
    "function useV2RouteRerollToken(",
    "function useV2ExtraEncounter(",
    "function applyV2RouteRepel(",
    "function useV2MasterBallOnOpportunity(",
    "function createPokemonResultTimingWindow(",
    "function renderRandomPokemonPanel(",
    "function renderWheelPanel(",
  ]) if (!app.includes(marker)) throw new Error(`Current/shared runtime damaged: ${marker}`);

  if (contract !== originalContract) throw new Error("token-effect-contract.js changed during Stage 8D; this stage must not migrate token rules.");
  if (!controlEffects.includes("function resolveHoneyEncounterCopy(")) throw new Error("Deferred Honey helper was damaged.");
  if (!sandbox.includes("[TSB-027]") || !sandbox.includes("controlTokenEffects.resolveHoneyEncounterCopy")) throw new Error("Deferred Honey sandbox coverage was damaged.");
}

let originalApp = "";
let originalContract = "";
let wroteApp = false;
let committed = false;

try {
  originalApp = fs.readFileSync(APP_PATH, "utf8");
  originalContract = fs.readFileSync(CONTRACT_PATH, "utf8");
  const originalControlEffects = fs.readFileSync(CONTROL_EFFECTS_PATH, "utf8");
  const originalSandbox = fs.readFileSync(SANDBOX_TEST_PATH, "utf8");

  ensureSafeStart(originalApp, originalContract, originalControlEffects, originalSandbox);

  let app = originalApp;

  app = removeIfBlock(app, 'if (pending?.sourceType === "honey-end-action") {', "Honey Live Referee render branch");

  app = removeStatementStartingWith(
    app,
    'const honeyChoice = liveClosestEventTarget(event, "[data-honey-result-choice]");',
    "Honey Live Referee click declaration"
  );
  app = removeIfBlock(app, "if (honeyChoice) {", "Honey Live Referee click branch");

  app = removeStatementStartingWith(
    app,
    "const honeyAcquisitionSnapshot",
    "Honey acquisition snapshot"
  );
  app = removeStatementStartingWith(
    app,
    "augmentHoneyCausalUndoAfterAcquisition(randomSession, honeyAcquisitionSnapshot)",
    "Honey acquisition causal-undo augmentation"
  );

  app = removeStatementStartingWith(
    app,
    "const honeyProcedures = ensureHoneyEndOfActionProcedures();",
    "Honey Action-to-Battle procedure declaration"
  );
  app = removeIfBlock(app, "if (honeyProcedures.length) {", "Honey Action-to-Battle blocking branch");

  for (const name of HONEY_FUNCTIONS) app = removeNamedFunction(app, name);

  assertAfter(app, originalContract, fs.readFileSync(CONTRACT_PATH, "utf8"), originalControlEffects, originalSandbox);

  fs.writeFileSync(APP_PATH, app, "utf8");
  wroteApp = true;

  run("node", ["--check", APP_REL]);
  run("node", ["--test", "scripts/test-token-sandbox.js"]);
  run("node", ["--test", "scripts/test-v2-route-runtime-sequences.js"]);
  run("node", ["--test", "versions/next-action-phase/tests/test-route-encounter-engine.js"]);

  git(["add", APP_REL]);
  run("git", ["diff", "--cached", "--check"]);

  const stagedNames = git(["diff", "--cached", "--name-only"]);
  if (stagedNames.trim() !== APP_REL) throw new Error(`Stage 8D must stage only ${APP_REL}; staged: ${stagedNames || "nothing"}`);
  const staged = git(["diff", "--cached", "--stat"]);
  if (!staged) throw new Error("Stage 8D produced no staged changes.");

  console.log(`\n${staged}`);
  console.log("Retired Honey end-of-Action Encounter-copy entry/UI/acquisition bridge removed.");
  console.log("Deferred resolveHoneyEncounterCopy helper and TSB-027 were preserved for later Route migration.");
  console.log("Current Route tokens and generic Pokemon-result/Live Referee infrastructure were preserved.");

  git(["commit", "-m", "Retire Honey V1 encounter bridge"], { inherit: true });
  committed = true;
  git(["push", "origin", EXPECTED_BRANCH], { inherit: true });
  console.log("\nStage 8D complete: retired Honey V1 end-of-Action Encounter bridge and pushed.");
} catch (error) {
  console.error(`\nV1 purge Stage 8D failed safely:\n${error.message}`);
  if (!committed && wroteApp) {
    try {
      fs.writeFileSync(APP_PATH, originalApp, "utf8");
      git(["reset", "HEAD", "--", APP_REL]);
      console.error("Stage 8D app.js changes were restored because no commit was created.");
    } catch (restoreError) {
      console.error(`Automatic restore also failed: ${restoreError.message}`);
      console.error("Do not rerun until the working tree is inspected.");
    }
  } else if (committed) {
    console.error("The Stage 8D commit exists locally. Do not rerun; inspect/push that commit instead.");
  }
  process.exitCode = 1;
}
