#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const EXPECTED_BRANCH = "audit/purge-v1-runtime";
const APP_REL = "app.js";
const APP_PATH = path.join(ROOT, APP_REL);
const CONTROL_PATH = path.join(ROOT, "token-control-effects.js");
const CONTRACT_PATH = path.join(ROOT, "token-effect-contract.js");
const SANDBOX_PATH = path.join(ROOT, "scripts/test-token-sandbox.js");

function git(args, inherit = false) {
  const out = execFileSync("git", args, {
    cwd: ROOT,
    encoding: "utf8",
    stdio: inherit ? "inherit" : ["ignore", "pipe", "pipe"],
  });
  return typeof out === "string" ? out.trim() : "";
}

function run(command, args) {
  execFileSync(command, args, { cwd: ROOT, stdio: "inherit" });
}

function count(text, needle) {
  return text.split(needle).length - 1;
}

function matchingBraceEnd(text, openIndex) {
  if (text[openIndex] !== "{") throw new Error("Brace scan did not start on an opening brace.");
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
      if (depth < 0) throw new Error("Brace scan underflowed.");
    }
  }
  throw new Error("Brace scan reached EOF.");
}

function wholeLineRange(text, start, end) {
  let lineStart = text.lastIndexOf("\n", Math.max(0, start - 1));
  lineStart = lineStart < 0 ? 0 : lineStart + 1;
  if (text.slice(lineStart, start).trim()) lineStart = start;
  let lineEnd = end;
  while (lineEnd < text.length && /[ \t]/.test(text[lineEnd])) lineEnd += 1;
  if (text.startsWith("\r\n", lineEnd)) lineEnd += 2;
  else if (text[lineEnd] === "\n") lineEnd += 1;
  return { start: lineStart, end: lineEnd };
}

function removeNamedFunction(text, name) {
  const re = new RegExp(`(?:async\\s+)?function\\s+${name}\\s*\\(`, "g");
  const matches = [...text.matchAll(re)];
  if (matches.length !== 1) throw new Error(`${name}: expected exactly one definition, found ${matches.length}.`);
  const start = matches[0].index;
  const open = text.indexOf("{", start);
  if (open < 0) throw new Error(`${name}: opening brace not found.`);
  const end = matchingBraceEnd(text, open);
  const range = wholeLineRange(text, start, end);
  return text.slice(0, range.start) + text.slice(range.end);
}

function removeIfBlockContaining(text, marker, label) {
  if (count(text, marker) !== 1) throw new Error(`${label}: expected one marker, found ${count(text, marker)}.`);
  const markerAt = text.indexOf(marker);
  const ifAt = text.lastIndexOf("if", markerAt);
  if (ifAt < 0 || markerAt - ifAt > 160) throw new Error(`${label}: owning if statement not found safely.`);
  const open = text.indexOf("{", ifAt);
  if (open < 0 || open > markerAt + 200) throw new Error(`${label}: opening brace not found safely.`);
  const end = matchingBraceEnd(text, open);
  if (/^\s*else\b/.test(text.slice(end))) throw new Error(`${label}: unexpected else branch.`);
  const range = wholeLineRange(text, ifAt, end);
  return text.slice(0, range.start) + text.slice(range.end);
}

function removeDeclarationLine(text, marker, label) {
  if (count(text, marker) !== 1) throw new Error(`${label}: expected one marker, found ${count(text, marker)}.`);
  const at = text.indexOf(marker);
  let start = text.lastIndexOf("\n", Math.max(0, at - 1));
  start = start < 0 ? 0 : start + 1;
  const semi = text.indexOf(";", at);
  if (semi < 0) throw new Error(`${label}: terminating semicolon not found.`);
  const range = wholeLineRange(text, start, semi + 1);
  return text.slice(0, range.start) + text.slice(range.end);
}

let originalApp = "";
let wroteApp = false;
let committed = false;

try {
  if (git(["branch", "--show-current"]) !== EXPECTED_BRANCH) throw new Error(`Run Stage 8E only on ${EXPECTED_BRANCH}.`);
  const status = git(["status", "--porcelain"]);
  if (status) throw new Error(`Working tree must be clean before Stage 8E.\n${status}`);

  originalApp = fs.readFileSync(APP_PATH, "utf8");
  const control = fs.readFileSync(CONTROL_PATH, "utf8");
  const contract = fs.readFileSync(CONTRACT_PATH, "utf8");
  const sandbox = fs.readFileSync(SANDBOX_PATH, "utf8");

  for (const marker of [
    "const V2_ROUTE_TOKEN_IDS",
    "function useV2RouteRerollToken(",
    "function useV2ExtraEncounter(",
    "function applyV2RouteRepel(",
    "function useV2MasterBallOnOpportunity(",
    "function createPokemonResultTimingWindow(",
    "function renderRandomPokemonPanel(",
  ]) if (!originalApp.includes(marker)) throw new Error(`Current/shared invariant missing: ${marker}`);

  for (const marker of [
    'pending?.sourceType === "honey-end-action"',
    "function ensureHoneyEndOfActionProcedures(",
    "function resolveHoneyEndOfActionProcedure(",
    "augmentHoneyCausalUndoAfterAcquisition(",
    "honeyAcquisitionSnapshot",
  ]) if (originalApp.includes(marker)) throw new Error(`Stage 8D invariant failed; marker unexpectedly remains: ${marker}`);

  const skipDeclaration = 'const honeySkip = liveClosestEventTarget(event, "[data-honey-procedure-skip]");';
  if (count(originalApp, skipDeclaration) !== 1) throw new Error("Expected exactly one orphan Honey skip declaration.");
  if (count(originalApp, "skipHoneyEndOfActionProcedure(") !== 2) throw new Error("Expected one orphan Honey skip call plus one function definition.");

  const emptyTransitionMarker = 'if (!target.flowOnly && previousPhase === "action" && target.phase === "battle") {';
  if (count(originalApp, emptyTransitionMarker) !== 1) throw new Error("Expected exactly one Action-to-Battle transition block.");
  const transitionAt = originalApp.indexOf(emptyTransitionMarker);
  const transitionOpen = originalApp.indexOf("{", transitionAt);
  const transitionEnd = matchingBraceEnd(originalApp, transitionOpen);
  if (originalApp.slice(transitionOpen + 1, transitionEnd - 1).trim()) throw new Error("Action-to-Battle transition block is not empty; refusing to remove it.");

  let app = originalApp;
  app = removeDeclarationLine(app, skipDeclaration, "Honey skip declaration");
  app = removeIfBlockContaining(app, "if (honeySkip) {", "Honey skip click branch");
  app = removeNamedFunction(app, "skipHoneyEndOfActionProcedure");
  app = removeIfBlockContaining(app, emptyTransitionMarker, "empty Action-to-Battle transition block");

  for (const marker of [
    "honeySkip",
    "[data-honey-procedure-skip]",
    "skipHoneyEndOfActionProcedure(",
    emptyTransitionMarker,
  ]) if (app.includes(marker)) throw new Error(`Stage 8E residue remains: ${marker}`);

  if (!control.includes("function resolveHoneyEncounterCopy(")) throw new Error("Deferred resolveHoneyEncounterCopy helper is missing.");
  if (!contract.includes('encounter({ id: "honey-token"')) throw new Error("Honey contract definition was unexpectedly removed before migration.");
  if (!sandbox.includes("[TSB-027]") || !sandbox.includes("controlTokenEffects.resolveHoneyEncounterCopy")) throw new Error("TSB-027 Honey helper coverage is missing.");

  fs.writeFileSync(APP_PATH, app, "utf8");
  wroteApp = true;

  run("node", ["--check", APP_REL]);
  run("node", ["--test", "scripts/test-token-sandbox.js"]);
  run("node", ["--test", "scripts/test-v2-route-runtime-sequences.js"]);
  run("node", ["--test", "versions/next-action-phase/tests/test-route-encounter-engine.js"]);

  git(["add", APP_REL]);
  run("git", ["diff", "--cached", "--check"]);
  const names = git(["diff", "--cached", "--name-only"]);
  if (names !== APP_REL) throw new Error(`Stage 8E must stage only ${APP_REL}; staged: ${names || "nothing"}`);
  const stat = git(["diff", "--cached", "--stat"]);
  if (!stat) throw new Error("Stage 8E produced no staged changes.");

  console.log(`\n${stat}`);
  console.log("Removed orphan Honey skip UI/helper and the empty Action-to-Battle shell left after Stage 8D.");
  console.log("Deferred Honey Route migration helper/contract/test coverage remain intact.");

  git(["commit", "-m", "Finish Honey V1 residue cleanup"], true);
  committed = true;
  git(["push", "origin", EXPECTED_BRANCH], true);
  console.log("\nStage 8E complete: Honey V1 production residue fully removed and pushed.");
} catch (error) {
  console.error(`\nV1 purge Stage 8E failed safely:\n${error.message}`);
  if (!committed && wroteApp) {
    try {
      fs.writeFileSync(APP_PATH, originalApp, "utf8");
      git(["reset", "HEAD", "--", APP_REL]);
      console.error("Stage 8E app.js changes were restored because no commit was created.");
    } catch (restoreError) {
      console.error(`Automatic restore also failed: ${restoreError.message}`);
      console.error("Do not rerun until the working tree is inspected.");
    }
  } else if (committed) {
    console.error("The Stage 8E commit exists locally. Do not rerun; inspect/push that commit instead.");
  }
  process.exitCode = 1;
}
