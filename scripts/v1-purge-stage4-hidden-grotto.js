#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const EXPECTED_BRANCH = "audit/purge-v1-runtime";
const APP_PATH = path.join(ROOT, "app.js");

function git(args, options = {}) {
  const result = execFileSync("git", args, {
    cwd: ROOT,
    encoding: "utf8",
    stdio: options.inherit ? "inherit" : ["ignore", "pipe", "pipe"],
  });
  return typeof result === "string" ? result.trim() : "";
}

function ensureSafeBranch() {
  const branch = git(["branch", "--show-current"]);
  if (branch !== EXPECTED_BRANCH) throw new Error(`Refusing to run on ${branch || "detached HEAD"}. Switch to ${EXPECTED_BRANCH} first.`);
  const status = git(["status", "--porcelain"]);
  if (status) throw new Error(`Working tree must be clean before Stage 4. Current changes:\n${status}`);
}

function count(text, needle) {
  return text.split(needle).length - 1;
}

function requireCount(text, needle, expected, label = needle) {
  const actual = count(text, needle);
  if (actual !== expected) throw new Error(`Expected ${expected} occurrence(s) of ${label}; found ${actual}. Refusing to guess.`);
}

function replaceExactOnce(text, oldValue, newValue = "", label = oldValue) {
  requireCount(text, oldValue, 1, label);
  return text.replace(oldValue, newValue);
}

function findMatchingDelimiter(text, openIndex, openChar, closeChar) {
  let depth = 0;
  let mode = "code";
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
    if (mode === "single") {
      if (ch === "\\") i += 1;
      else if (ch === "'") mode = "code";
      continue;
    }
    if (mode === "double") {
      if (ch === "\\") i += 1;
      else if (ch === '"') mode = "code";
      continue;
    }
    if (mode === "template") {
      if (ch === "\\") i += 1;
      else if (ch === "`") mode = "code";
      continue;
    }
    if (ch === "/" && next === "/") { mode = "line-comment"; i += 1; continue; }
    if (ch === "/" && next === "*") { mode = "block-comment"; i += 1; continue; }
    if (ch === "'") { mode = "single"; continue; }
    if (ch === '"') { mode = "double"; continue; }
    if (ch === "`") { mode = "template"; continue; }
    if (ch === openChar) depth += 1;
    else if (ch === closeChar) {
      depth -= 1;
      if (depth === 0) return i;
      if (depth < 0) break;
    }
  }
  throw new Error(`Could not find matching ${closeChar} for ${openChar} at ${openIndex}.`);
}

function findMatchingBrace(text, openIndex) {
  let depth = 0;
  let mode = "code";
  let templateExprDepth = 0;
  for (let i = openIndex; i < text.length; i += 1) {
    const ch = text[i];
    const next = text[i + 1];
    if (mode === "line-comment") { if (ch === "\n") mode = "code"; continue; }
    if (mode === "block-comment") { if (ch === "*" && next === "/") { mode = "code"; i += 1; } continue; }
    if (mode === "single") { if (ch === "\\") i += 1; else if (ch === "'") mode = "code"; continue; }
    if (mode === "double") { if (ch === "\\") i += 1; else if (ch === '"') mode = "code"; continue; }
    if (mode === "template") {
      if (ch === "\\") { i += 1; continue; }
      if (ch === "`" && templateExprDepth === 0) { mode = "code"; continue; }
      if (ch === "$" && next === "{") { templateExprDepth += 1; depth += 1; i += 1; continue; }
      if (ch === "}" && templateExprDepth > 0) { templateExprDepth -= 1; depth -= 1; continue; }
      continue;
    }
    if (ch === "/" && next === "/") { mode = "line-comment"; i += 1; continue; }
    if (ch === "/" && next === "*") { mode = "block-comment"; i += 1; continue; }
    if (ch === "'") { mode = "single"; continue; }
    if (ch === '"') { mode = "double"; continue; }
    if (ch === "`") { mode = "template"; templateExprDepth = 0; continue; }
    if (ch === "{") depth += 1;
    else if (ch === "}") {
      depth -= 1;
      if (depth === 0) return i;
      if (depth < 0) break;
    }
  }
  throw new Error("Could not find matching function/object brace.");
}

function findStatementSemicolon(text, startIndex) {
  let mode = "code", paren = 0, bracket = 0, brace = 0;
  for (let i = startIndex; i < text.length; i += 1) {
    const ch = text[i], next = text[i + 1];
    if (mode === "line-comment") { if (ch === "\n") mode = "code"; continue; }
    if (mode === "block-comment") { if (ch === "*" && next === "/") { mode = "code"; i += 1; } continue; }
    if (mode === "single") { if (ch === "\\") i += 1; else if (ch === "'") mode = "code"; continue; }
    if (mode === "double") { if (ch === "\\") i += 1; else if (ch === '"') mode = "code"; continue; }
    if (mode === "template") { if (ch === "\\") i += 1; else if (ch === "`") mode = "code"; continue; }
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
    else if (ch === ";" && paren === 0 && bracket === 0 && brace === 0) return i;
  }
  throw new Error("Could not find declaration semicolon.");
}

function removeRanges(text, ranges) {
  for (const range of [...ranges].sort((a, b) => b.start - a.start)) text = text.slice(0, range.start) + text.slice(range.end);
  return text;
}

function removeHiddenGrottoLocation(text) {
  const marker = '    {\n      id: "hidden-grotto",';
  requireCount(text, marker, 1, "Hidden Grotto Action location object");
  const start = text.indexOf(marker);
  const openBrace = start + 4;
  const closeBrace = findMatchingBrace(text, openBrace);
  let end = closeBrace + 1;
  while (text[end] === " " || text[end] === "\t") end += 1;
  if (text[end] !== ",") throw new Error("Hidden Grotto location object is not followed by the expected comma.");
  end += 1;
  if (text[end] === "\r") end += 1;
  if (text[end] === "\n") end += 1;
  return text.slice(0, start) + text.slice(end);
}

function functionRangesMatching(text, predicate) {
  const ranges = [];
  const regex = /(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/g;
  let match;
  while ((match = regex.exec(text))) {
    const name = match[1];
    if (!predicate(name)) continue;
    const parenOpen = text.indexOf("(", match.index);
    const parenClose = findMatchingDelimiter(text, parenOpen, "(", ")");
    let bodyOpen = parenClose + 1;
    while (/\s/.test(text[bodyOpen] || "")) bodyOpen += 1;
    if (text[bodyOpen] !== "{") throw new Error(`Could not identify the body opening brace for ${name}.`);
    const bodyClose = findMatchingBrace(text, bodyOpen);
    let start = match.index;
    const previousLineStart = start > 0 ? text.lastIndexOf("\n", start - 1) + 1 : 0;
    if (text.slice(previousLineStart, start).trim() === "") start = previousLineStart;
    let end = bodyClose + 1;
    if (text[end] === "\r") end += 1;
    if (text[end] === "\n") end += 1;
    ranges.push({ name, start, end });
    regex.lastIndex = bodyClose + 1;
  }
  return ranges;
}

function removeGrottoVariableDeclarations(text) {
  const regex = /(^|\n)([ \t]*)(const|let|var)\s+([A-Za-z_$][\w$]*)\s*=/g;
  const ranges = [];
  let match;
  while ((match = regex.exec(text))) {
    const name = match[4];
    if (!/(?:HiddenGrotto|hiddenGrotto|HIDDEN_GROTTO)/.test(name)) continue;
    const start = match.index + (match[1] ? 1 : 0);
    const semicolon = findStatementSemicolon(text, start);
    let end = semicolon + 1;
    if (text[end] === "\r") end += 1;
    if (text[end] === "\n") end += 1;
    ranges.push({ name, start, end });
    regex.lastIndex = semicolon + 1;
  }
  return { text: removeRanges(text, ranges), names: ranges.map((range) => range.name) };
}

function removeUndoBranch(text) {
  const marker = 'else if (undoData.actionType === "undoHiddenGrottoAction") {';
  requireCount(text, marker, 1, "Hidden Grotto undo branch");
  const start = text.indexOf(marker);
  const openBrace = text.indexOf("{", start + marker.length - 1);
  const closeBrace = findMatchingBrace(text, openBrace);
  return text.slice(0, start) + text.slice(closeBrace + 1);
}

function runChecks() {
  execFileSync(process.execPath, ["--check", "app.js"], { cwd: ROOT, stdio: "inherit" });
  execFileSync(process.execPath, ["--test", "scripts/test-v2-route-runtime-sequences.js"], { cwd: ROOT, stdio: "inherit" });
  execFileSync(process.execPath, ["--test", "versions/next-action-phase/tests/test-route-encounter-engine.js"], { cwd: ROOT, stdio: "inherit" });
}

function main() {
  ensureSafeBranch();
  const original = fs.readFileSync(APP_PATH, "utf8");
  let app = original;
  let wrote = false;
  let committed = false;
  try {
    if (app.includes("ACTION_PHASE_VERSION_V1")) throw new Error("Stage 1 invariant failed: ACTION_PHASE_VERSION_V1 still exists.");
    requireCount(app, "function renderActionPhase() {\n  renderV2RouteActionPhase();\n}", 1, "current-only renderActionPhase");
    requireCount(app, "function renderV2RouteActionPhase()", 1, "current Route renderer");
    requireCount(app, "const V2_ROUTE_TOKEN_IDS", 1, "current Route token IDs");

    app = removeHiddenGrottoLocation(app);
    app = replaceExactOnce(app, "    hiddenGrottoSessions: [],\n", "", "default hiddenGrottoSessions state");
    app = replaceExactOnce(app, [
      "  nextState.hiddenGrottoSessions ||= [];",
      "  nextState.hiddenGrottoSessions.forEach((session) => {",
      '    session.status = ["type-choice", "pokemon-choice", "completed", "undone"].includes(session.status) ? session.status : "type-choice";',
      "    session.rolledTypes ||= [];",
      "    session.rolledPokemon ||= [];",
      "  });",
      "",
    ].join("\n"), "", "Hidden Grotto state normalization");
    app = replaceExactOnce(app, '    "hidden-grotto": state.hiddenGrottoSessions,\n', "", "Hidden Grotto operation collection");
    app = removeUndoBranch(app);

    const functionRanges = functionRangesMatching(app, (name) => /(?:HiddenGrotto|hiddenGrotto)/.test(name));
    const removedFunctions = functionRanges.map((entry) => entry.name);
    const requiredFunctions = [
      "getHiddenGrottoTierCap", "renderHiddenGrottoDetails", "startHiddenGrottoSession",
      "chooseHiddenGrottoType", "chooseHiddenGrottoPokemon", "getHiddenGrottoEligiblePokemonByType",
      "isHiddenGrottoEncounterEligible", "hiddenGrottoLowTierNfeCutoffIndex", "hiddenGrottoEntryHasNoEvolutionNote",
      "hiddenGrottoFinalEvolutionSpeciesIds", "hiddenGrottoSpeciesForEntry", "isHiddenGrottoFullyEvolvedEntry",
      "hiddenGrottoExcludesLowTierNfe", "getHiddenGrottoPool", "hiddenGrottoAvailableTypes", "activeHiddenGrottoSession",
    ];
    const missing = requiredFunctions.filter((name) => !removedFunctions.includes(name));
    if (missing.length) throw new Error(`Expected Hidden Grotto functions were not found: ${missing.join(", ")}`);
    app = removeRanges(app, functionRanges);

    const variableResult = removeGrottoVariableDeclarations(app);
    app = variableResult.text;
    for (const name of ["HIDDEN_GROTTO_TIER_STEP_BONUS", "hiddenGrottoTypes"]) {
      if (!variableResult.names.includes(name)) throw new Error(`Expected ${name} declaration was not found.`);
    }

    const forbiddenRuntimeMarkers = [
      "state.hiddenGrottoSessions", "nextState.hiddenGrottoSessions", "hiddenGrottoSessions:",
      'id: "hidden-grotto"', '"hidden-grotto": state.hiddenGrottoSessions',
      'undoData.actionType === "undoHiddenGrottoAction"', "function renderHiddenGrottoDetails",
      "function startHiddenGrottoSession", "function activeHiddenGrottoSession", "function getHiddenGrottoPool",
      "function getHiddenGrottoTierCap", "HIDDEN_GROTTO_TIER_STEP_BONUS",
    ];
    const leftovers = forbiddenRuntimeMarkers.filter((marker) => app.includes(marker));
    if (leftovers.length) throw new Error(`Hidden Grotto runtime markers remain: ${leftovers.join(", ")}`);

    for (const marker of ["function renderV2RouteActionPhase()", "const V2_ROUTE_TOKEN_IDS", "function useV2RouteActionToken"]) {
      if (!app.includes(marker)) throw new Error(`Current Route invariant disappeared: ${marker}`);
    }

    fs.writeFileSync(APP_PATH, app, "utf8");
    wrote = true;
    runChecks();
    git(["add", "app.js"]);
    execFileSync("git", ["diff", "--cached", "--check"], { cwd: ROOT, stdio: "inherit" });
    const staged = git(["diff", "--cached", "--stat"]);
    if (!staged) throw new Error("Stage 4 produced no staged changes.");
    console.log(`\n${staged}`);
    console.log(`Removed Hidden Grotto functions: ${removedFunctions.sort().join(", ")}`);
    console.log(`Removed Hidden Grotto declarations: ${variableResult.names.sort().join(", ")}`);
    console.log("Preserved perk/bulletin descriptive data for later dedicated rules review.");
    git(["commit", "-m", "Remove retired Hidden Grotto runtime"], { inherit: true });
    committed = true;
    git(["push", "origin", EXPECTED_BRANCH], { inherit: true });
    console.log("\nStage 4 complete: retired Hidden Grotto runtime removed and pushed.");
  } catch (error) {
    if (wrote && !committed) {
      try {
        fs.writeFileSync(APP_PATH, original, "utf8");
        git(["reset", "HEAD", "--", "app.js"]);
      } catch (_) {}
    }
    const suffix = committed
      ? "\nThe commit exists locally but the push did not finish; do not rerun until we inspect it."
      : "\nNo Stage 4 runtime commit was created; app.js was restored if it had been written.";
    throw new Error(`${error.message}${suffix}`);
  }
}

try {
  main();
} catch (error) {
  console.error(`\nV1 purge Stage 4 failed safely:\n${error.message}`);
  process.exitCode = 1;
}
