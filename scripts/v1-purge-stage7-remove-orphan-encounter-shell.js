#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const EXPECTED_BRANCH = "audit/purge-v1-runtime";
const APP_REL = "app.js";
const CSS_REL = "styles.css";
const APP_PATH = path.join(ROOT, APP_REL);
const CSS_PATH = path.join(ROOT, CSS_REL);

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
  if (!needle) return 0;
  let total = 0;
  let at = 0;
  while (true) {
    at = text.indexOf(needle, at);
    if (at < 0) return total;
    total += 1;
    at += needle.length;
  }
}

function ensureExactly(text, needle, expected, label = needle) {
  const actual = count(text, needle);
  if (actual !== expected) {
    throw new Error(`${label}: expected ${expected} occurrence(s), found ${actual}.`);
  }
}

function lineStart(text, index) {
  const found = text.lastIndexOf("\n", Math.max(0, index - 1));
  return found < 0 ? 0 : found + 1;
}

function consumeLineBreak(text, index) {
  let at = index;
  while (at < text.length && (text[at] === " " || text[at] === "\t")) at += 1;
  if (text.startsWith("\r\n", at)) return at + 2;
  if (text[at] === "\n") return at + 1;
  return index;
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
      if (ch === "*" && next === "/") {
        mode = "code";
        i += 1;
      }
      continue;
    }
    if (mode === "single" || mode === "double" || mode === "template") {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (ch === "\\") {
        escaped = true;
        continue;
      }
      if ((mode === "single" && ch === "'") || (mode === "double" && ch === '"') || (mode === "template" && ch === "`")) {
        mode = "code";
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
      continue;
    }
    if (ch === "{") depth += 1;
    if (ch === "}") {
      depth -= 1;
      if (depth === 0) return i + 1;
      if (depth < 0) throw new Error("Balanced-brace scan underflowed.");
    }
  }
  throw new Error("Balanced-brace scan reached EOF before closing the block.");
}

function removeBalancedIf(text, marker, requiredInside) {
  ensureExactly(text, marker, 1, marker);
  const markerIndex = text.indexOf(marker);
  const openIndex = text.indexOf("{", markerIndex);
  if (openIndex < 0 || openIndex > markerIndex + marker.length) {
    throw new Error(`Could not locate opening brace for ${marker}.`);
  }
  const end = matchingBraceEnd(text, openIndex);
  const block = text.slice(markerIndex, end);
  for (const required of requiredInside) {
    if (!block.includes(required)) throw new Error(`${marker} block is missing expected marker: ${required}`);
  }
  const start = lineStart(text, markerIndex);
  const after = consumeLineBreak(text, end);
  return text.slice(0, start) + text.slice(after);
}

function removeEncounterLocationObject(text) {
  const summary = 'summary: "Roll the Encounter Wheel for the current gym twice."';
  ensureExactly(text, summary, 1, "retired Encounter Action summary");
  const summaryIndex = text.indexOf(summary);
  const idMarker = 'id: "encounter"';
  const idIndex = text.lastIndexOf(idMarker, summaryIndex);
  if (idIndex < 0 || summaryIndex - idIndex > 500) {
    throw new Error("Could not bind retired Encounter Action summary to its id object.");
  }

  let openLineStart = lineStart(text, idIndex);
  let searchAt = openLineStart - 1;
  let openIndex = -1;
  while (searchAt >= 0) {
    const candidateStart = lineStart(text, searchAt);
    const candidateEndRaw = text.indexOf("\n", candidateStart);
    const candidateEnd = candidateEndRaw < 0 ? text.length : candidateEndRaw;
    const candidate = text.slice(candidateStart, candidateEnd).replace(/\r$/, "").trim();
    if (candidate === "{") {
      openIndex = text.indexOf("{", candidateStart);
      openLineStart = candidateStart;
      break;
    }
    if (openLineStart - candidateStart > 300) break;
    searchAt = candidateStart - 1;
  }
  if (openIndex < 0) throw new Error("Could not locate opening object brace for retired Encounter Action.");

  const end = matchingBraceEnd(text, openIndex);
  const block = text.slice(openIndex, end);
  for (const required of [
    'id: "encounter"',
    'name: "Encounter"',
    'category: "pokemon"',
    'actionCost: 1',
    summary,
    'effects: [{ type: "roll-wheel", wheel: "encounter", rolls: 2 }]',
  ]) {
    if (!block.includes(required)) throw new Error(`Encounter Action object missing expected marker: ${required}`);
  }

  let after = end;
  while (after < text.length && (text[after] === " " || text[after] === "\t")) after += 1;
  if (text[after] === ",") after += 1;
  after = consumeLineBreak(text, after);
  return text.slice(0, openLineStart) + text.slice(after);
}

function removeEncounterCssBlock(text) {
  const startMarker = ".encounter-tab {";
  const endMarker = "@keyframes pokemon-result-pop {";
  ensureExactly(text, startMarker, 1, startMarker);
  ensureExactly(text, endMarker, 1, endMarker);
  const startIndex = text.indexOf(startMarker);
  const endIndex = text.indexOf(endMarker, startIndex);
  if (endIndex < 0) throw new Error("Encounter CSS end boundary occurs before its start boundary.");
  const block = text.slice(startIndex, endIndex);
  for (const required of [
    ".encounter-overlay",
    ".encounter-modal",
    ".encounter-layout",
    ".encounter-wheel-section",
    ".encounter-controls",
    ".encounter-entry-list",
    ".encounter-result-list",
    ".encounter-result-added",
  ]) {
    if (!block.includes(required)) throw new Error(`Encounter CSS block missing expected selector: ${required}`);
  }
  for (const forbiddenShared of [
    "\n.wheel-session-list",
    "\n.wheel-session-card",
    "\n.wheel-session-detail",
    "\n.wheel-meta {",
    "@keyframes",
  ]) {
    if (block.includes(forbiddenShared)) {
      throw new Error(`Refusing to remove Encounter CSS because shared marker appeared inside boundary: ${forbiddenShared.trim()}`);
    }
  }
  const start = lineStart(text, startIndex);
  return text.slice(0, start) + text.slice(endIndex);
}

function assertCurrentRuntime(app, css) {
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
  for (const marker of [
    "@keyframes pokemon-result-pop {",
    "@keyframes pokemon-result-reveal {",
    ".wheel-session-list {",
    ".wheel-session-card {",
    ".wheel-session-detail {",
    ".wheel-meta {",
  ]) {
    if (!css.includes(marker)) throw new Error(`Shared/current CSS invariant missing: ${marker}`);
  }
}

function assertRetiredShellGone(app, css) {
  for (const marker of [
    'summary: "Roll the Encounter Wheel for the current gym twice."',
    "encounterWheelDefinition(",
    "startEncounterSession(",
    'if (location.id === "encounter") {',
    'if (location?.id === "encounter") {',
    'id: "encounter-wheel"',
    'label: "Open Encounter Wheel"',
  ]) {
    if (app.includes(marker)) throw new Error(`Retired Encounter Action shell marker remains: ${marker}`);
  }
  for (const marker of [
    ".encounter-tab",
    ".encounter-overlay",
    ".encounter-modal",
    ".encounter-layout",
    ".encounter-wheel-section",
    ".encounter-controls",
    ".encounter-entry-list",
    ".encounter-result-list",
    ".encounter-result-added",
  ]) {
    if (css.includes(marker)) throw new Error(`Retired Encounter CSS marker remains: ${marker}`);
  }
}

function ensureSafeStart() {
  const branch = git(["branch", "--show-current"]);
  if (branch !== EXPECTED_BRANCH) {
    throw new Error(`Refusing to run on ${branch || "detached HEAD"}. Switch to ${EXPECTED_BRANCH}.`);
  }
  const status = git(["status", "--porcelain"]);
  if (status) throw new Error(`Working tree must be clean before Stage 7.\n${status}`);
}

let committed = false;
let wroteRuntime = false;

try {
  ensureSafeStart();
  let app = fs.readFileSync(APP_PATH, "utf8");
  let css = fs.readFileSync(CSS_PATH, "utf8");

  assertCurrentRuntime(app, css);

  app = removeEncounterLocationObject(app);
  app = removeBalancedIf(app, 'if (location.id === "encounter") {', ["encounterWheelDefinition()", 'id: "encounter-wheel"', 'label: "Open Encounter Wheel"']);
  app = removeBalancedIf(app, 'if (location?.id === "encounter") {', ["startEncounterSession({ skipConfirmCheck: true })", "persistStartedActionDestination()"]);
  css = removeEncounterCssBlock(css);

  assertCurrentRuntime(app, css);
  assertRetiredShellGone(app, css);

  fs.writeFileSync(APP_PATH, app, "utf8");
  fs.writeFileSync(CSS_PATH, css, "utf8");
  wroteRuntime = true;

  run("node", ["--check", APP_REL]);
  run("node", ["--test", "scripts/test-v2-route-runtime-sequences.js"]);
  run("node", ["--test", "versions/next-action-phase/tests/test-route-encounter-engine.js"]);

  git(["add", APP_REL, CSS_REL]);
  run("git", ["diff", "--cached", "--check"]);
  const staged = git(["diff", "--cached", "--stat"]);
  if (!staged) throw new Error("Stage 7 produced no staged runtime changes.");
  console.log(`\n${staged}`);
  console.log("Retired Encounter Action location/service/start shell removed.");
  console.log("Orphan Encounter-only CSS removed; shared Random Pokemon/Game Corner wheel styles preserved.");
  console.log("Token/Live Referee encounter semantics and Perk/Bulletin text remain deliberately deferred.");

  git(["commit", "-m", "Remove orphan Encounter action and styles"], { inherit: true });
  committed = true;
  git(["push", "origin", EXPECTED_BRANCH], { inherit: true });
  console.log("\nStage 7 complete: orphan Encounter Action shell and styles removed and pushed.");
} catch (error) {
  console.error(`\nV1 purge Stage 7 failed safely:\n${error.message}`);
  if (!committed && wroteRuntime) {
    try {
      git(["reset", "HEAD", "--", APP_REL, CSS_REL]);
      git(["checkout", "--", APP_REL, CSS_REL]);
      console.error("Stage 7 runtime files were restored because no commit was created.");
    } catch (restoreError) {
      console.error(`Automatic restore also failed: ${restoreError.message}`);
      console.error("Do not make further edits; inspect git status before retrying.");
    }
  } else if (committed) {
    console.error("The Stage 7 commit exists locally but push failed. Do NOT rerun the script; push/reconcile the existing commit instead.");
  }
  process.exitCode = 1;
}
