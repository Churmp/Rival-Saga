#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const BRANCH = "audit/purge-v1-runtime";

function git(args, inherit = false) {
  const out = execFileSync("git", args, {
    cwd: ROOT,
    encoding: "utf8",
    stdio: inherit ? "inherit" : ["ignore", "pipe", "pipe"]
  });
  return typeof out === "string" ? out.trim() : "";
}
function read(rel) { return fs.readFileSync(path.join(ROOT, rel), "utf8").replace(/\r/g, ""); }
function normalize(text) { return String(text).replace(/\r/g, "").replace(/[ \t]+$/gm, "").replace(/\n+$/g, "") + "\n"; }
function write(rel, text) { fs.writeFileSync(path.join(ROOT, rel), normalize(text), "utf8"); }
function count(text, needle) { return text.split(needle).length - 1; }
function requireCount(text, needle, expected, label = needle) {
  const found = count(text, needle);
  if (found !== expected) throw new Error(`${label}: expected ${expected}, found ${found}.`);
}
function replaceExact(text, from, to, label = from) {
  requireCount(text, from, 1, label);
  return text.replace(from, to);
}
function replaceAllExpected(text, from, to, expected, label = from) {
  requireCount(text, from, expected, label);
  return text.split(from).join(to);
}
function removeExactLine(text, line, label = line) {
  const withNewline = `${line}\n`;
  requireCount(text, withNewline, 1, label);
  return text.replace(withNewline, "");
}
function braceEnd(text, open) {
  let depth = 0;
  let mode = "code";
  let escaped = false;
  for (let i = open; i < text.length; i += 1) {
    const c = text[i], n = text[i + 1];
    if (mode === "line") { if (c === "\n") mode = "code"; continue; }
    if (mode === "block") { if (c === "*" && n === "/") { mode = "code"; i += 1; } continue; }
    if (mode !== "code") {
      if (escaped) { escaped = false; continue; }
      if (c === "\\") { escaped = true; continue; }
      if ((mode === "single" && c === "'") || (mode === "double" && c === '"') || (mode === "template" && c === "`")) mode = "code";
      continue;
    }
    if (c === "/" && n === "/") { mode = "line"; i += 1; continue; }
    if (c === "/" && n === "*") { mode = "block"; i += 1; continue; }
    if (c === "'") { mode = "single"; continue; }
    if (c === '"') { mode = "double"; continue; }
    if (c === "`") { mode = "template"; continue; }
    if (c === "{") depth += 1;
    if (c === "}" && --depth === 0) return i + 1;
  }
  throw new Error("Unmatched brace while editing source.");
}
function lineRange(text, start, end) {
  let s = text.lastIndexOf("\n", Math.max(0, start - 1));
  s = s < 0 ? 0 : s + 1;
  let e = end;
  while (e < text.length && /[ \t]/.test(text[e])) e += 1;
  if (text[e] === "\n") e += 1;
  return { s, e };
}
function removeObjectProperty(text, marker, label) {
  requireCount(text, marker, 1, label);
  const start = text.indexOf(marker);
  const open = text.indexOf("{", start);
  if (open < 0) throw new Error(`${label}: object opening brace not found.`);
  let end = braceEnd(text, open);
  if (text[end] === ",") end += 1;
  const range = lineRange(text, start, end);
  return text.slice(0, range.s) + text.slice(range.e);
}
function testRange(text, title) {
  const marker = `test("${title}",`;
  requireCount(text, marker, 1, `test ${title}`);
  const start = text.indexOf(marker);
  const arrow = text.indexOf("=>", start);
  const open = text.indexOf("{", arrow);
  if (arrow < 0 || open < 0) throw new Error(`${title}: test body start not found.`);
  let end = braceEnd(text, open);
  const close = text.indexOf(");", end);
  if (close < 0 || close - end > 30) throw new Error(`${title}: test closing boundary not found.`);
  end = close + 2;
  return lineRange(text, start, end);
}
function removeTest(text, title) {
  const range = testRange(text, title);
  return text.slice(0, range.s) + text.slice(range.e);
}
function replaceTest(text, title, replacement) {
  const range = testRange(text, title);
  return text.slice(0, range.s) + normalize(replacement) + text.slice(range.e);
}
function run(args) { execFileSync("node", args, { cwd: ROOT, stdio: "inherit", env: process.env }); }

try {
  if (git(["branch", "--show-current"]) !== BRANCH) throw new Error(`Run only on ${BRANCH}.`);
  const status = git(["status", "--porcelain"]);
  if (status) throw new Error(`Working tree must be clean.\n${status}`);

  const edits = new Map();

  let shell = read("game-shell-contract.js");
  shell = removeExactLine(shell, '  const ACTION_PHASE_VERSION_V1 = "action-phase-v1-current-series";', "game-shell V1 constant");
  shell = replaceExact(shell,
`  function actionPhaseVersion(record = {}) {
    const state = isObject(record.state) ? record.state : {};
    const candidate = record.actionPhaseVersion
      || record.ruleset?.actionPhaseVersion
      || state.ruleset?.actionPhaseVersion
      || state.actionPhaseVersion;
    if (candidate === ACTION_PHASE_VERSION_V1) return ACTION_PHASE_VERSION_V1;
    if (candidate === ACTION_PHASE_VERSION_V2) return ACTION_PHASE_VERSION_V2;
    return isObject(record.state) ? ACTION_PHASE_VERSION_V1 : DEFAULT_ACTION_PHASE_VERSION;
  }`,
`  function actionPhaseVersion() {
    return DEFAULT_ACTION_PHASE_VERSION;
  }`, "game-shell actionPhaseVersion body");
  if (shell.includes("ACTION_PHASE_VERSION_V1") || shell.includes("action-phase-v1")) throw new Error("game-shell V1 residue survived transformation.");
  edits.set("game-shell-contract.js", shell);

  let fixtures = read("scripts/fixtures/game-shell-fixtures.js");
  fixtures = replaceAllExpected(fixtures, '    actionPhaseVersion: "action-phase-v1-current-series",', '    actionPhaseVersion: "action-phase-v2-real-series",', 2, "shell fixture V1 version strings");
  fixtures = removeObjectProperty(fixtures, "  supportedLegacy: {", "supportedLegacy fixture");
  if (fixtures.includes("action-phase-v1") || fixtures.includes("supportedLegacy")) throw new Error("shell fixture V1 residue survived transformation.");
  edits.set("scripts/fixtures/game-shell-fixtures.js", fixtures);

  let shellTest = read("scripts/test-game-shell-loading.js");
  shellTest = removeExactLine(shellTest, "  fixtures.supportedLegacy,", "supportedLegacy records entry");
  shellTest = replaceExact(shellTest,
    'test("normalizes current, legacy, modern, and malformed optional records", () => {\n  for (const record of [fixtures.currentProgressed, fixtures.currentEmpty, fixtures.supportedLegacy, fixtures.modernTokenReferee, fixtures.malformedOptional]) {',
    'test("normalizes current, modern, and malformed optional records", () => {\n  for (const record of [fixtures.currentProgressed, fixtures.currentEmpty, fixtures.modernTokenReferee, fixtures.malformedOptional]) {',
    "shell normalization test");
  shellTest = replaceTest(shellTest, "brand-new summaries default to V2 while legacy snapshots remain V1-compatible", `test("all summaries use the one current Action Phase version", () => {\n  assert.equal(contract.DEFAULT_ACTION_PHASE_VERSION, "action-phase-v2-real-series");\n  assert.equal(contract.normalizeGameSummary({ id: "brand-new", name: "Brand New", state: null }).summary.actionPhaseVersion, "action-phase-v2-real-series");\n  assert.equal(contract.normalizeGameSummary({\n    id: "pre-version-save",\n    name: "Pre-version Save",\n    state: { series: "Kanto", gym: 2, currentPhase: "action", players: [] }\n  }).summary.actionPhaseVersion, "action-phase-v2-real-series");\n});`);
  shellTest = removeTest(shellTest, "persisted V1 games load as V1 without converting the save");
  shellTest = replaceAllExpected(shellTest, '  assert.equal(progressed.actionPhaseVersion, "action-phase-v1-current-series");', '  assert.equal(progressed.actionPhaseVersion, "action-phase-v2-real-series");', 2, "progressed shell V1 assertions");
  shellTest = replaceExact(shellTest, '  assert.equal((await response.json()).games.length, 7);', '  assert.equal((await response.json()).games.length, 6);', "shell game-list count");
  if (shellTest.includes("action-phase-v1") || shellTest.includes("supportedLegacy") || shellTest.includes("persisted V1 games")) throw new Error("game-shell test V1 residue survived transformation.");
  edits.set("scripts/test-game-shell-loading.js", shellTest);

  let mount = read("scripts/test-v2-route-browser-mount.js");
  mount = replaceTest(mount, "new game UI defaults to V2 without exposing legacy V1 prominently", `test("new game UI exposes only the current Action Phase version", () => {\n  const createCard = indexHtml.match(/<section class="site-shell-card site-create-game-card">[\\s\\S]*?<\\/section>/)?.[0] || "";\n  const createBody = functionBody("createSiteGame");\n  assert.match(appJs, /const DEFAULT_ACTION_PHASE_VERSION = ACTION_PHASE_VERSION_V2/);\n  assert.match(appJs, /const ACTION_PHASE_VERSION_V2 = "action-phase-v2-real-series"/);\n  assert.match(appJs, /supportedActionPhaseVersions: \\[ACTION_PHASE_VERSION_V2\\]/);\n  assert.match(createBody, /DEFAULT_ACTION_PHASE_VERSION/);\n  assert.doesNotMatch(createCard, /action-phase-v1-current-series|Action Phase Version|V1/i);\n});`);
  mount = replaceTest(mount, "renderActionPhase delegates V2 without replacing the V1 branch", `test("renderActionPhase delegates directly to the one current Route Action renderer", () => {\n  const body = functionBody("renderActionPhase");\n  assert.match(body, /renderV2RouteActionPhase\\(\\)/);\n  assert.doesNotMatch(body, /activeActionPhaseVersion|ensureActionPhaseGymState|renderActionWorkspaceRootMenu/);\n});`);
  if (mount.includes("ACTION_PHASE_VERSION_V1") || mount.includes("action-phase-v1") || mount.includes("V1 branch")) throw new Error("Route mount V1 residue survived transformation.");
  edits.set("scripts/test-v2-route-browser-mount.js", mount);

  let runtimeSeq = read("scripts/test-v2-route-runtime-sequences.js");
  runtimeSeq = replaceExact(runtimeSeq,
    '    supportedActionPhaseVersions: ["action-phase-v1-current-series", "action-phase-v2-real-series"]',
    '    supportedActionPhaseVersions: ["action-phase-v2-real-series"]',
    "Route runtime supported version list");
  if (runtimeSeq.includes("action-phase-v1")) throw new Error("Route runtime V1 residue survived transformation.");
  edits.set("scripts/test-v2-route-runtime-sequences.js", runtimeSeq);

  let controller = read("token-control-controller.js");
  controller = removeExactLine(controller, "    state.encounterCopyRecords ||= [];", "controller Encounter-copy bucket");
  if (controller.includes("encounterCopyRecords")) throw new Error("controller Encounter-copy residue survived transformation.");
  edits.set("token-control-controller.js", controller);

  let sandbox = read("token-sandbox-session.js");
  sandbox = removeExactLine(sandbox, '    "encounterModalOpen",', "sandbox Encounter modal key");
  sandbox = removeExactLine(sandbox, '    "selectedEncounterSessionId",', "sandbox Encounter selected-session key");
  if (sandbox.includes("encounterModalOpen") || sandbox.includes("selectedEncounterSessionId")) throw new Error("sandbox Encounter modal residue survived transformation.");
  edits.set("token-sandbox-session.js", sandbox);

  let actionOps = read("scripts/test-action-operation-contract.js");
  actionOps = replaceExact(actionOps,
    '    "silph-co-choice-complete", "hidden-grotto-choice-complete", "bulletin-quests-confirmed",\n    "encounter-session-closed", "wheel-session-closed", "dragons-den-placement-complete"',
    '    "silph-co-choice-complete", "bulletin-quests-confirmed",\n    "wheel-session-closed", "dragons-den-placement-complete"',
    "Action-operation completion hook list");
  actionOps = removeTest(actionOps, "obtaining every Encounter result completes the linked Action operation");
  actionOps = replaceExact(actionOps, 'test("phase advancement is blocked while a V1 Action operation is unresolved", () => {', 'test("phase advancement is blocked while a current Action operation is unresolved", () => {', "Action-operation phase-block title");
  actionOps = removeTest(actionOps, "Hidden Grotto supports direct type choice starts");
  actionOps = removeExactLine(actionOps, '  assert.match(appSource, /function startEncounterSession\\(\\{ skipConfirmCheck = false \\} = \\{\\}\\)\\/);', "accepted-destination Encounter starter declaration");
  actionOps = removeExactLine(actionOps, '  assert.match(appSource, /startEncounterSession\\(\\{ skipConfirmCheck: true \\}\\)\\/);', "accepted-destination Encounter starter call");
  actionOps = removeExactLine(actionOps, '  assert.match(appSource, /if \\(!startEncounterSession\\([\\s\\S]*throw new Error\\("The Encounter location could not start\\."\\)\\/);', "accepted-destination Encounter failure assertion");
  actionOps = removeExactLine(actionOps, '  assert.match(appSource, /if \\(location\\?\\.id === "encounter"\\)[\\s\\S]*await persistStartedActionDestination\\(\\);[\\s\\S]*return;/);', "accepted-destination Encounter location assertion");
  for (const marker of ["startHiddenGrottoSession", "startEncounterSession", "encounter-session-closed", "hidden-grotto-choice-complete", "V1 Action operation"]) if (actionOps.includes(marker)) throw new Error(`Action-operation stale marker survived transformation: ${marker}`);
  edits.set("scripts/test-action-operation-contract.js", actionOps);

  for (const rel of ["action-phase-balance.js", "scripts/test-action-phase-balance.js", "scripts/import-pokeapi-hoenn-encounters.js"]) {
    if (!fs.existsSync(path.join(ROOT, rel))) throw new Error(`Expected stale file is already missing: ${rel}`);
  }
  let pkg = JSON.parse(read("package.json"));
  if (!Object.prototype.hasOwnProperty.call(pkg.scripts || {}, "import:encounters:hoenn")) throw new Error("package script import:encounters:hoenn missing before cleanup.");
  if (!Object.prototype.hasOwnProperty.call(pkg.scripts || {}, "test:action-balance")) throw new Error("package script test:action-balance missing before cleanup.");
  delete pkg.scripts["import:encounters:hoenn"];
  delete pkg.scripts["test:action-balance"];
  edits.set("package.json", JSON.stringify(pkg, null, 2));

  for (const [rel, content] of edits) write(rel, content);
  fs.unlinkSync(path.join(ROOT, "action-phase-balance.js"));
  fs.unlinkSync(path.join(ROOT, "scripts/test-action-phase-balance.js"));
  fs.unlinkSync(path.join(ROOT, "scripts/import-pokeapi-hoenn-encounters.js"));

  for (const rel of ["game-shell-contract.js", "token-control-controller.js", "token-sandbox-session.js", "scripts/test-game-shell-loading.js", "scripts/test-v2-route-browser-mount.js", "scripts/test-v2-route-runtime-sequences.js", "scripts/test-action-operation-contract.js"]) run(["--check", rel]);
  run(["--test", "scripts/test-game-shell-loading.js"]);
  run(["--test", "scripts/test-v2-route-browser-mount.js"]);
  run(["--test", "scripts/test-action-operation-contract.js"]);

  git(["add", "-A"]);
  execFileSync("git", ["diff", "--cached", "--check"], { cwd: ROOT, stdio: "inherit" });
  const staged = git(["diff", "--cached", "--stat"]);
  if (!staged) throw new Error("Stage 10B produced no diff.");
  console.log(`\n${staged}`);
  console.log("\nStage 10B preflight passed: current-only shell semantics, stale support buckets, active tests, and orphan tooling are clean.");
  git(["commit", "-m", "Retire stale V1 support and tests"], true);
  git(["push", "origin", BRANCH], true);
  console.log("\nStage 10B complete: deterministic stale-support cleanup committed and pushed.");
} catch (error) {
  console.error(`\nV1 purge Stage 10B failed safely:\n${error.message}`);
  try { execFileSync("git", ["reset", "--hard", "HEAD"], { cwd: ROOT, stdio: "ignore" }); } catch {}
  process.exitCode = 1;
}
