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
  if (branch !== EXPECTED_BRANCH) {
    throw new Error(`Refusing to run on ${branch || "detached HEAD"}. Switch to ${EXPECTED_BRANCH} first.`);
  }
  const status = git(["status", "--porcelain"]);
  if (status) {
    throw new Error(`Working tree must be clean before Stage 4. Current changes:\n${status}`);
  }
}

function count(text, needle) {
  if (!needle) return 0;
  return text.split(needle).length - 1;
}

function requireCount(text, needle, expected, label = needle) {
  const actual = count(text, needle);
  if (actual !== expected) {
    throw new Error(`Expected ${expected} occurrence(s) of ${label}; found ${actual}. Refusing to guess.`);
  }
}

function replaceExactOnce(text, oldValue, newValue = "", label = oldValue) {
  requireCount(text, oldValue, 1, label);
  return text.replace(oldValue, newValue);
}

function findMatchingBrace(text, openIndex) {
  let depth = 0;
  let mode = "code";
  let templateExprDepth = 0;

  for (let i = openIndex; i < text.length; i += 1) {
    const ch = text[i];
    const next = text[i + 1];

    if (mode === "line-comment") {
      if (ch === "\n") mode = "code";
      continue;
    }
    if (mode === "block-comment") {
      if (ch === "*" && next === "/") {
        mode = "code";
        i += 1;
      }
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
      if (ch === "\\") {
        i += 1;
        continue;
      }
      if (ch === "`" && templateExprDepth === 0) {
        mode = "code";
        continue;
      }
      if (ch === "$" && next === "{") {
        templateExprDepth += 1;
        depth += 1;
        i += 1;
        continue;
      }
      if (ch === "}" && templateExprDepth > 0) {
        templateExprDepth -= 1;
        depth -= 1;
        continue;
      }
      continue;
    }

    if (ch === "/" && next === "/") {
      mode = "line-comment";
      i += 1;
      continue;
    }
    if (ch === "/" && next === "*") {
      mode = "block-comment";
      i += 1;
      continue;
    }
    if (ch === "'") {
      mode = "single";
      continue;
    }
    if (ch === '"') {
      mode = "double";
      continue;
    }
    if (ch === "`") {
      mode = "template";
      templateExprDepth = 0;
      continue;
    }
    if (ch === "{") depth += 1;
    if (ch === "}") {
      depth -= 1;
      if (depth === 0) return i;
      if (depth < 0) break;
    }
  }
  throw new Error("Could not find matching brace.");
}

function findStatementSemicolon(text, startIndex) {
  let mode = "code";
  let paren = 0;
  let bracket = 0;
  let brace = 0;
  let templateExprDepth = 0;

  for (let i = startIndex; i < text.length; i += 1) {
    const ch = text[i];
    const next = text[i + 1];

    if (mode === "line-comment") {
      if (ch === "\n") mode = "code";
      continue;
    }
    if (mode === "block-comment") {
      if (ch === "*" && next === "/") {
        mode = "code";
        i += 1;
      }
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
      if (ch === "\\") {
        i += 1;
        continue;
      }
      if (ch === "`" && templateExprDepth === 0) {
        mode = "code";
        continue;
      }
      if (ch === "$" && next === "{") {
        templateExprDepth += 1;
        brace += 1;
        i += 1;
        continue;
      }
      if (ch === "}" && templateExprDepth > 0) {
        templateExprDepth -= 1;
        brace -= 1;
        continue;
      }
      continue;
    }

    if (ch === "/" && next === "/") {
      mode = "line-comment";
      i += 1;
      continue;
    }
    if (ch === "/" && next === "*") {
      mode = "block-comment";
      i += 1;
      continue;
    }
    if (ch === "'") {
      mode = "single";
      continue;
    }
    if (ch === '"') {
      mode = "double";
      continue;
    }
    if (ch === "`") {
      mode = "template";
      templateExprDepth = 0;
      continue;
    }

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

function removeHiddenGrottoLocation(text) {
  const marker = '    {\n      id: "hidden-grotto",';
  requireCount(text, marker, 1, "Hidden Grotto Action location object");
  const start = text.indexOf(marker);
  const openBrace = start + 4;
  const closeBrace = findMatchingBrace(text, openBrace);
  let end = closeBrace + 1;
  while (text[end] === " " || text[end] === "\t") end += 1;
  if (text[end] !== ",") throw new Error("Hidden Grotto Action location object is not followed by the expected comma.");
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
    const bodyOpen = text.indexOf("{", match.index + match[0].length);
    if (bodyOpen === -1) throw new Error(`Could not find body for function ${name}.`);
    const bodyClose = findMatchingBrace(text, bodyOpen);
    let start = match.index;
    if (start > 0 && text[start - 1] === "\n") {
      const previousLineStart = text.lastIndexOf("\n", start - 2) + 1;
      if (text.slice(previousLineStart, start).trim() === "") start = previousLineStart;
    }
    let end = bodyClose + 1;
    if (text[end] === "\r") end += 1;
    if (text[end] === "\n") end += 1;
    ranges.push({ name, start, end });
    regex.lastIndex = bodyClose + 1;
  }
  return ranges;
}

function removeRanges(text, ranges) {
  const sorted = [...ranges].sort((a, b) => b.start - a.start);
  for (const range of sorted) text = text.slice(0, range.start) + text.slice(range.end);
  return text;
}

function removeGrottoVariableDeclarations(text) {
  const regex = /(^|\n)([ \t]*)(const|let|var)\s+([A-Za-z_$][\w$]*)\s*=/g;
  const ranges = [];
  let match;
  while ((match = regex.exec(text))) {
    const name = match[4];
    if (!/(?:HiddenGrotto|hiddenGrotto|HIDDEN_GROTTO)/.test(name)) continue;
    const declarationStart = match.index + (match[1] ? 1 : 0);
    const semicolon = findStatementSemicolon(text, declarationStart);
    let end = semicolon + 1;
    if (text[end] === "\r") end += 1;
    if (text[end] === "\n") end += 1;
    ranges.push({ name, start: declarationStart, end });
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

function runNodeCheck(file) {
  execFileSync(process.execPath, ["--check", file], { cwd: ROOT, stdio: "inherit" });
}

function runCurrentRouteTests() {
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
    if (app.includes("ACTION_PHASE_VERSION_V1")) {
      throw new Error("Stage 1 invariant failed: ACTION_PHASE_VERSION_V1 still exists.");
    }
    requireCount(app, "function renderActionPhase() {\n  renderV2RouteActionPhase();\n}", 1, "current-only renderActionPhase");
    requireCount(app, "function renderV2RouteActionPhase()", 1, "current Route renderer");
    requireCount(app, "const V2_ROUTE_TOKEN_IDS", 1, "current Route token IDs");

    app = removeHiddenGrottoLocation(app);

    app = replaceExactOnce(
      app,
      "    hiddenGrottoSessions: [],\n",
      "",
      "default hiddenGrottoSessions state"
    );

    app = replaceExactOnce(
      app,
      [
        "  nextState.hiddenGrottoSessions ||= [];",
        "  nextState.hiddenGrottoSessions.forEach((session) => {",
        '    session.status = ["type-choice", "pokemon-choice", "completed", "undone"].includes(session.status) ? session.status : "type-choice";',
        "    session.rolledTypes ||= [];",
        "    session.rolledPokemon ||= [];",
        "  });",
        "",
      ].join("\n"),
      "",
      "Hidden Grotto state normalization"
    );

    app = replaceExactOnce(
      app,
      '    "hidden-grotto": state.hiddenGrottoSessions,\n',
      "",
      "Hidden Grotto action-operation collection"
    );

    app = removeUndoBranch(app);

    const grottoFunctions = functionRangesMatching(app, (name) => /(?:HiddenGrotto|hiddenGrotto)/.test(name));
    const removedFunctionNames = grottoFunctions.map((entry) => entry.name);
    const requiredFunctions = [
      "getHiddenGrottoTierCap",
      "renderHiddenGrottoDetails",
      "startHiddenGrottoSession",
      "chooseHiddenGrottoType",
      "chooseHiddenGrottoPokemon",
      "getHiddenGrottoEligiblePokemonByType",
      "isHiddenGrottoEncounterEligible",
      "hiddenGrottoLowTierNfeCutoffIndex",
      "hiddenGrottoEntryHasNoEvolutionNote",
      "hiddenGrottoFinalEvolutionSpeciesIds",
      "hiddenGrottoSpeciesForEntry",
      "isHiddenGrottoFullyEvolvedEntry",
      "hiddenGrottoExcludesLowTierNfe",
      "getHiddenGrottoPool",
      "hiddenGrottoAvailableTypes",
      "activeHiddenGrottoSession",
    ];
    const missingFunctions = requiredFunctions.filter((name) => !removedFunctionNames.includes(name));
    if (missingFunctions.length) {
      throw new Error(`Expected Hidden Grotto functions were not found: ${missingFunctions.join(", ")}`);
    }
    app = removeRanges(app, grottoFunctions);

    const variableResult = removeGrottoVariableDeclarations(app);
    app = variableResult.text;
    if (!variableResult.names.includes("HIDDEN_GROTTO_TIER_STEP_BONUS")) {
      throw new Error("Expected HIDDEN_GROTTO_TIER_STEP_BONUS declaration was not found.");
    }
    if (!variableResult.names.includes("hiddenGrottoTypes")) {
      throw new Error("Expected hiddenGrottoTypes declaration was not found.");
    }

    const forbiddenRuntimeMarkers = [
      "state.hiddenGrottoSessions",
      "nextState.hiddenGrottoSessions",
      "hiddenGrottoSessions:",
      'id: "hidden-grotto"',
      '"hidden-grotto": state.hiddenGrottoSessions',
      'undoData.actionType === "undoHiddenGrottoAction"',
      "function renderHiddenGrottoDetails",
      "function startHiddenGrottoSession",
      "function chooseHiddenGrottoType",
      "function chooseHiddenGrottoPokemon",
      "function activeHiddenGrottoSession",
      "function getHiddenGrottoPool",
      "function getHiddenGrottoTierCap",
      "HIDDEN_GROTTO_TIER_STEP_BONUS",
    ];
    const leftovers = forbiddenRuntimeMarkers.filter((marker) => app.includes(marker));
    if (leftovers.length) {
      throw new Error(`Hidden Grotto runtime markers remain after purge: ${leftovers.join(", ")}`);
    }

    if (!app.includes("function renderV2RouteActionPhase()")) throw new Error("Current Route renderer disappeared during Stage 4.");
    if (!app.includes("const V2_ROUTE_TOKEN_IDS")) throw new Error("Current Route token IDs disappeared during Stage 4.");
    if (!app.includes("function useV2RouteActionToken")) throw new Error("Current Route token handler disappeared during Stage 4.");

    fs.writeFileSync(APP_PATH, app, "utf8");
    wrote = true;

    runNodeCheck("app.js");
    runCurrentRouteTests();

    git(["add", "app.js"]);
    execFileSync("git", ["diff", "--cached", "--check"], { cwd: ROOT, stdio: "inherit" });
    const staged = git(["diff", "--cached", "--stat"]);
    if (!staged) throw new Error("Stage 4 produced no staged changes.");

    console.log(`\n${staged}`);
    console.log(`Removed Hidden Grotto functions: ${removedFunctionNames.sort().join(", ")}`);
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
      } catch (_) {
        // Preserve the original error; report rollback trouble below if status remains dirty.
      }
    }
    const suffix = committed
      ? "\nThe commit was created locally but push did not finish; do not rerun the stage until we inspect it."
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
