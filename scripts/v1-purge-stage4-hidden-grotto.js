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
  return text.split(needle).length - 1;
}

function requireCount(text, needle, expected, label = needle) {
  const actual = count(text, needle);
  if (actual !== expected) {
    throw new Error(`Expected ${expected} occurrence(s) of ${label}; found ${actual}. Refusing to guess.`);
  }
}

function requireMarkers(text, markers, label) {
  const missing = markers.filter((marker) => !text.includes(marker));
  if (missing.length) {
    throw new Error(`${label}: ${missing.join(", ")}`);
  }
}

function replaceExactOnce(text, oldValue, newValue = "", label = oldValue) {
  requireCount(text, oldValue, 1, label);
  return text.replace(oldValue, newValue);
}

function removeBetween(text, startMarker, endMarker, label) {
  requireCount(text, startMarker, 1, `${label} start marker`);
  requireCount(text, endMarker, 1, `${label} end marker`);
  const start = text.indexOf(startMarker);
  const end = text.indexOf(endMarker);
  if (end <= start) {
    throw new Error(`${label} end marker appears before its start marker.`);
  }
  return text.slice(0, start) + text.slice(end);
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

function removeDeclarationByName(text, name) {
  const candidates = ["const", "let", "var"]
    .map((kind) => `${kind} ${name} =`)
    .filter((marker) => text.includes(marker));
  if (candidates.length !== 1) {
    throw new Error(`Expected exactly one declaration for ${name}; found ${candidates.length}.`);
  }
  const marker = candidates[0];
  requireCount(text, marker, 1, `${name} declaration`);
  let start = text.indexOf(marker);
  const lineStart = text.lastIndexOf("\n", start - 1) + 1;
  if (!text.slice(lineStart, start).trim()) start = lineStart;
  const semicolon = findStatementSemicolon(text, start);
  let end = semicolon + 1;
  if (text[end] === "\r") end += 1;
  if (text[end] === "\n") end += 1;
  return text.slice(0, start) + text.slice(end);
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

  const currentRouteMarkers = [
    "function renderV2RouteActionPhase()",
    "const V2_ROUTE_TOKEN_IDS",
    "function useV2RouteRerollToken(",
    "function useV2ExtraEncounter(",
    "function applyV2RouteRepel(",
    "function useV2MasterBallOnOpportunity(",
  ];

  const neighboringMarkers = [
    "function renderRangerBaseDetails(",
    "function renderBulletinBoardDetails(",
    "function pendingSilphCoSession(",
    "function encounterWheelKey(",
  ];

  try {
    if (app.includes("ACTION_PHASE_VERSION_V1")) {
      throw new Error("Stage 1 invariant failed: ACTION_PHASE_VERSION_V1 still exists.");
    }
    requireCount(app, "function renderActionPhase() {\n  renderV2RouteActionPhase();\n}", 1, "current-only renderActionPhase");
    requireMarkers(app, currentRouteMarkers, "Current Route preflight invariant missing");
    requireMarkers(app, neighboringMarkers, "Neighbor preflight invariant missing");

    app = removeBetween(
      app,
      '    {\n      id: "hidden-grotto",',
      '    {\n      id: "dragons-den",',
      "Hidden Grotto Action location"
    );

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

    app = removeBetween(
      app,
      ' else if (undoData.actionType === "undoHiddenGrottoAction") {',
      ' else if (undoData.actionType === "undoEncounterAction") {',
      "Hidden Grotto undo branch"
    );

    app = replaceExactOnce(
      app,
      [
        "function getHiddenGrottoTierCap(gymNumber = state.gym) {",
        "  const naturalTier = getNaturalGymTier(gymNumber);",
        "  const naturalTierIndex = getTierIndex(naturalTier);",
        "  if (naturalTierIndex < 0) return naturalTier;",
        "  return getTierNameByIndex(naturalTierIndex + HIDDEN_GROTTO_TIER_STEP_BONUS);",
        "}",
        "",
      ].join("\n"),
      "",
      "getHiddenGrottoTierCap"
    );

    app = removeBetween(
      app,
      "function renderHiddenGrottoDetails(",
      "function renderRangerBaseDetails(",
      "Hidden Grotto detail renderer"
    );

    app = removeBetween(
      app,
      "async function startHiddenGrottoSession(",
      "function renderBulletinBoardDetails(",
      "Hidden Grotto session runtime"
    );

    app = removeBetween(
      app,
      "function getHiddenGrottoEligiblePokemonByType(",
      "function pendingSilphCoSession(",
      "Hidden Grotto pool helpers"
    );

    app = removeBetween(
      app,
      "function activeHiddenGrottoSession(",
      "function encounterWheelKey(",
      "Hidden Grotto active-session helper"
    );

    app = removeDeclarationByName(app, "HIDDEN_GROTTO_TIER_STEP_BONUS");
    app = removeDeclarationByName(app, "hiddenGrottoTypes");

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
      "function getHiddenGrottoEligiblePokemonByType",
      "function isHiddenGrottoEncounterEligible",
      "HIDDEN_GROTTO_TIER_STEP_BONUS",
      "hiddenGrottoTypes",
    ];
    const leftovers = forbiddenRuntimeMarkers.filter((marker) => app.includes(marker));
    if (leftovers.length) {
      throw new Error(`Hidden Grotto runtime markers remain: ${leftovers.join(", ")}`);
    }

    requireMarkers(app, currentRouteMarkers, "Current Route invariant disappeared");
    requireMarkers(app, neighboringMarkers, "Neighbor invariant disappeared");

    fs.writeFileSync(APP_PATH, app, "utf8");
    wrote = true;

    runChecks();

    git(["add", "app.js"]);
    execFileSync("git", ["diff", "--cached", "--check"], { cwd: ROOT, stdio: "inherit" });
    const staged = git(["diff", "--cached", "--stat"]);
    if (!staged) throw new Error("Stage 4 produced no staged changes.");

    console.log(`\n${staged}`);
    console.log("Removed retired Hidden Grotto runtime and state plumbing.");
    console.log("Verified current Route token handlers survived unchanged by boundary checks.");
    console.log("Preserved perk/bulletin descriptive data for later dedicated rules review.");

    git(["commit", "-m", "Remove retired Hidden Grotto runtime"], { inherit: true });
    committed = true;
    git(["push", "origin", EXPECTED_BRANCH], { inherit: true });
    console.log("\nStage 4 complete: retired Hidden Grotto runtime removed and pushed.");
  } catch (error) {
    if (wrote && !committed) {
      try {
        git(["reset", "HEAD", "--", "app.js"]);
      } catch (_) {}
      try {
        fs.writeFileSync(APP_PATH, original, "utf8");
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
