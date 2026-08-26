#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const BRANCH = "audit/purge-v1-runtime";

function git(args, inherit = false) {
  const out = execFileSync("git", args, { cwd: ROOT, encoding: "utf8", stdio: inherit ? "inherit" : ["ignore", "pipe", "pipe"] });
  return typeof out === "string" ? out.trim() : "";
}
function read(rel) { return fs.readFileSync(path.join(ROOT, rel), "utf8"); }
function write(rel, text) { fs.writeFileSync(path.join(ROOT, rel), normalize(text), "utf8"); }
function normalize(text) { return String(text).replace(/\r/g, "").replace(/[ \t]+$/gm, "").replace(/\n+$/g, "") + "\n"; }
function count(text, needle) { return text.split(needle).length - 1; }
function mustCount(text, needle, expected, label = needle) { const found = count(text, needle); if (found !== expected) throw new Error(`${label}: expected ${expected}, found ${found}.`); }
function replaceOnce(text, from, to, label = from) { mustCount(text, from, 1, label); return text.replace(from, to); }
function braceEnd(text, open) {
  let depth = 0, mode = "code", escaped = false;
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
  throw new Error("Unmatched brace.");
}
function lineRange(text, start, end) {
  let s = text.lastIndexOf("\n", Math.max(0, start - 1)); s = s < 0 ? 0 : s + 1;
  let e = end;
  while (e < text.length && /[ \t]/.test(text[e])) e += 1;
  if (text.startsWith("\r\n", e)) e += 2; else if (text[e] === "\n") e += 1;
  return { s, e };
}
function removeObjectProperty(text, marker, label) {
  mustCount(text, marker, 1, label);
  const start = text.indexOf(marker), open = text.indexOf("{", start);
  let end = braceEnd(text, open);
  if (text[end] === ",") end += 1;
  const r = lineRange(text, start, end);
  return text.slice(0, r.s) + text.slice(r.e);
}
function removeTest(text, title) {
  const marker = `test("${title}",`;
  mustCount(text, marker, 1, `test ${title}`);
  const start = text.indexOf(marker);
  const arrow = text.indexOf("=>", start);
  const open = text.indexOf("{", arrow);
  let end = braceEnd(text, open);
  const close = text.indexOf(");", end);
  if (close < 0 || close - end > 20) throw new Error(`${title}: test closing boundary not found.`);
  end = close + 2;
  const r = lineRange(text, start, end);
  return text.slice(0, r.s) + text.slice(r.e);
}
function run(args) { execFileSync("node", args, { cwd: ROOT, stdio: "inherit", env: process.env }); }

try {
  if (git(["branch", "--show-current"]) !== BRANCH) throw new Error(`Run only on ${BRANCH}.`);
  const status = git(["status", "--porcelain"]); if (status) throw new Error(`Working tree must be clean.\n${status}`);

  // Current-only game shell contract.
  let shell = read("game-shell-contract.js");
  mustCount(shell, 'const ACTION_PHASE_VERSION_V1 = "action-phase-v1-current-series";', 1);
  shell = shell.replace('  const ACTION_PHASE_VERSION_V1 = "action-phase-v1-current-series";\n', "");
  shell = replaceOnce(shell,
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
  }`,
    "game-shell actionPhaseVersion");
  if (shell.includes("ACTION_PHASE_VERSION_V1") || shell.includes("action-phase-v1")) throw new Error("game-shell V1 version residue survived.");
  write("game-shell-contract.js", shell);

  // Current-only shell fixtures.
  let fixtures = read("scripts/fixtures/game-shell-fixtures.js");
  fixtures = replaceOnce(fixtures, '    actionPhaseVersion: "action-phase-v1-current-series",', '    actionPhaseVersion: "action-phase-v2-real-series",', "currentProgressed version");
  fixtures = removeObjectProperty(fixtures, "  supportedLegacy: {", "supportedLegacy fixture");
  if (fixtures.includes("action-phase-v1")) throw new Error("game-shell fixture V1 residue survived.");
  write("scripts/fixtures/game-shell-fixtures.js", fixtures);

  let shellTest = read("scripts/test-game-shell-loading.js");
  shellTest = replaceOnce(shellTest, "  fixtures.supportedLegacy,\n", "", "supportedLegacy record list");
  shellTest = replaceOnce(shellTest,
    'test("normalizes current, legacy, modern, and malformed optional records", () => {\n  for (const record of [fixtures.currentProgressed, fixtures.currentEmpty, fixtures.supportedLegacy, fixtures.modernTokenReferee, fixtures.malformedOptional]) {',
    'test("normalizes current, modern, and malformed optional records", () => {\n  for (const record of [fixtures.currentProgressed, fixtures.currentEmpty, fixtures.modernTokenReferee, fixtures.malformedOptional]) {',
    "game shell normalization test");
  shellTest = replaceOnce(shellTest, '  assert.equal(progressed.actionPhaseVersion, "action-phase-v1-current-series");', '  assert.equal(progressed.actionPhaseVersion, "action-phase-v2-real-series");', "progressed shell version");
  shellTest = replaceOnce(shellTest,
`test("brand-new summaries default to V2 while legacy snapshots remain V1-compatible", () => {
  assert.equal(contract.DEFAULT_ACTION_PHASE_VERSION, "action-phase-v2-real-series");
  assert.equal(contract.normalizeGameSummary({ id: "brand-new", name: "Brand New", state: null }).summary.actionPhaseVersion, "action-phase-v2-real-series");
  assert.equal(contract.normalizeGameSummary({
    id: "pre-version-save",
    name: "Pre-version Save",
    state: { series: "Kanto", gym: 2, currentPhase: "action", players: [] }
  }).summary.actionPhaseVersion, "action-phase-v1-current-series");
});`,
`test("all summaries use the one current Action Phase version", () => {
  assert.equal(contract.DEFAULT_ACTION_PHASE_VERSION, "action-phase-v2-real-series");
  assert.equal(contract.normalizeGameSummary({ id: "brand-new", name: "Brand New", state: null }).summary.actionPhaseVersion, "action-phase-v2-real-series");
  assert.equal(contract.normalizeGameSummary({
    id: "pre-version-save",
    name: "Pre-version Save",
    state: { series: "Kanto", gym: 2, currentPhase: "action", players: [] }
  }).summary.actionPhaseVersion, "action-phase-v2-real-series");
});`, "current-only shell default test");
  shellTest = replaceOnce(shellTest, '  assert.equal(progressed.actionPhaseVersion, "action-phase-v1-current-series");', '  assert.equal(progressed.actionPhaseVersion, "action-phase-v2-real-series");', "API progressed version");
  shellTest = removeTest(shellTest, "persisted V1 games load as V1 without converting the save");
  shellTest = replaceOnce(shellTest, '  assert.equal((await response.json()).games.length, 7);', '  assert.equal((await response.json()).games.length, 6);', "game list count");
  if (shellTest.includes("action-phase-v1") || shellTest.includes("supportedLegacy") || /persisted V1 games/.test(shellTest)) throw new Error("game-shell test V1 residue survived.");
  write("scripts/test-game-shell-loading.js", shellTest);

  // Current Route static/browser tests should assert one current renderer, not coexistence.
  let mount = read("scripts/test-v2-route-browser-mount.js");
  mount = replaceOnce(mount,
`test("new game UI defaults to V2 without exposing legacy V1 prominently", () => {
  const createCard = indexHtml.match(/<section class="site-shell-card site-create-game-card">[\\s\\S]*?<\\/section>/)?.[0] || "";
  const createBody = functionBody("createSiteGame");
  assert.match(appJs, /const DEFAULT_ACTION_PHASE_VERSION = ACTION_PHASE_VERSION_V2/);
  assert.match(appJs, /const ACTION_PHASE_VERSION_V2 = "action-phase-v2-real-series"/);
  assert.match(appJs, /supportedActionPhaseVersions: \\[ACTION_PHASE_VERSION_V1, ACTION_PHASE_VERSION_V2\\]/);
  assert.match(createBody, /DEFAULT_ACTION_PHASE_VERSION/);
  assert.doesNotMatch(createCard, /action-phase-v1-current-series|Action Phase Version|V1/i);
});`,
`test("new game UI exposes only the current Action Phase version", () => {
  const createCard = indexHtml.match(/<section class="site-shell-card site-create-game-card">[\\s\\S]*?<\\/section>/)?.[0] || "";
  const createBody = functionBody("createSiteGame");
  assert.match(appJs, /const DEFAULT_ACTION_PHASE_VERSION = ACTION_PHASE_VERSION_V2/);
  assert.match(appJs, /const ACTION_PHASE_VERSION_V2 = "action-phase-v2-real-series"/);
  assert.match(appJs, /supportedActionPhaseVersions: \\[ACTION_PHASE_VERSION_V2\\]/);
  assert.match(createBody, /DEFAULT_ACTION_PHASE_VERSION/);
  assert.doesNotMatch(createCard, /action-phase-v1-current-series|Action Phase Version|V1/i);
});`, "route mount current-only version test");
  mount = replaceOnce(mount,
`test("renderActionPhase delegates V2 without replacing the V1 branch", () => {
  const body = functionBody("renderActionPhase");
  const v2Branch = body.indexOf("renderV2RouteActionPhase()");
  const v1Branch = body.indexOf("ensureActionPhaseGymState()");
  assert.match(body, /activeActionPhaseVersion\\(\\) === ACTION_PHASE_VERSION_V2/);
  assert.match(body, /renderV2RouteActionPhase\\(\\)/);
  assert.match(body, /ensureActionPhaseGymState\\(\\)/, "V1 render path should still be present");
  assert.match(body, /renderActionWorkspaceRootMenu\\(\\{ player, visits, disabledReason: timingPauseReason \\}\\)/, "V1 root Action Workspace should still render");
  assert.ok(v2Branch >= 0 && v1Branch >= 0 && v2Branch < v1Branch, "V2 should route before the V1 workspace is initialized");
});`,
`test("renderActionPhase delegates directly to the one current Route Action renderer", () => {
  const body = functionBody("renderActionPhase");
  assert.match(body, /renderV2RouteActionPhase\\(\\)/);
  assert.doesNotMatch(body, /activeActionPhaseVersion|ensureActionPhaseGymState|renderActionWorkspaceRootMenu/);
});`, "route mount renderer test");
  if (mount.includes("ACTION_PHASE_VERSION_V1") || mount.includes("action-phase-v1")) throw new Error("Route mount V1 residue survived.");
  write("scripts/test-v2-route-browser-mount.js", mount);

  let runtimeSeq = read("scripts/test-v2-route-runtime-sequences.js");
  runtimeSeq = replaceOnce(runtimeSeq,
    '    supportedActionPhaseVersions: ["action-phase-v1-current-series", "action-phase-v2-real-series"]',
    '    supportedActionPhaseVersions: ["action-phase-v2-real-series"]',
    "Route runtime fixture version list");
  if (runtimeSeq.includes("action-phase-v1")) throw new Error("Route runtime fixture V1 residue survived.");
  write("scripts/test-v2-route-runtime-sequences.js", runtimeSeq);

  // Remove final deleted Encounter client/state buckets from current support modules.
  let controller = read("token-control-controller.js");
  controller = replaceOnce(controller, "    state.encounterCopyRecords ||= [];\n", "", "controller Encounter-copy bucket");
  write("token-control-controller.js", controller);
  let sandbox = read("token-sandbox-session.js");
  sandbox = replaceOnce(sandbox, '    "encounterModalOpen",\n', "", "sandbox Encounter modal key");
  sandbox = replaceOnce(sandbox, '    "selectedEncounterSessionId",\n', "", "sandbox Encounter selected-session key");
  write("token-sandbox-session.js", sandbox);

  // Mixed Action-operation test: retain current operation infrastructure, remove deleted location assertions.
  let actionOps = read("scripts/test-action-operation-contract.js");
  actionOps = replaceOnce(actionOps,
    '    "silph-co-choice-complete", "hidden-grotto-choice-complete", "bulletin-quests-confirmed",\n    "encounter-session-closed", "wheel-session-closed", "dragons-den-placement-complete"',
    '    "silph-co-choice-complete", "bulletin-quests-confirmed",\n    "wheel-session-closed", "dragons-den-placement-complete"',
    "Action operation completion hooks");
  actionOps = removeTest(actionOps, "obtaining every Encounter result completes the linked Action operation");
  actionOps = replaceOnce(actionOps, 'test("phase advancement is blocked while a V1 Action operation is unresolved", () => {', 'test("phase advancement is blocked while a current Action operation is unresolved", () => {', "Action operation phase-block title");
  actionOps = removeTest(actionOps, "Hidden Grotto supports direct type choice starts");
  actionOps = replaceOnce(actionOps,
`  assert.match(appSource, /function startEncounterSession\\(\\{ skipConfirmCheck = false \\} = \\{\\}\\)\\/);
  assert.match(appSource, /startEncounterSession\\(\\{ skipConfirmCheck: true \\}\\)\\/);
  assert.match(appSource, /if \\(!startEncounterSession\\([\\s\\S]*throw new Error\\(\"The Encounter location could not start\\.\"\\)\\/);
  assert.match(appSource, /async function persistStartedActionDestination\\(\\)\\/);
  assert.match(appSource, /if \\(location\\?\\.id === \"encounter\"\\)[\\s\\S]*await persistStartedActionDestination\\(\\);[\\s\\S]*return;/);`,
`  assert.match(appSource, /async function persistStartedActionDestination\\(\\)\\/);`,
    "accepted destination retired Encounter assertions");
  for (const marker of ["startHiddenGrottoSession", "startEncounterSession", "encounter-session-closed", "hidden-grotto-choice-complete"]) if (actionOps.includes(marker)) throw new Error(`Action-operation test stale marker survived: ${marker}`);
  write("scripts/test-action-operation-contract.js", actionOps);

  // Pure V1 balance/import tooling belongs in Git history.
  const balanceRefs = git(["grep", "-l", "action-phase-balance.js", "--", "."]).split("\n").filter(Boolean);
  const unexpectedBalanceRefs = balanceRefs.filter((rel) => rel !== "scripts/test-action-phase-balance.js");
  if (unexpectedBalanceRefs.length) throw new Error(`action-phase-balance.js still has unexpected consumers: ${unexpectedBalanceRefs.join(", ")}`);
  fs.unlinkSync(path.join(ROOT, "action-phase-balance.js"));
  fs.unlinkSync(path.join(ROOT, "scripts/test-action-phase-balance.js"));
  fs.unlinkSync(path.join(ROOT, "scripts/import-pokeapi-hoenn-encounters.js"));

  let pkg = JSON.parse(read("package.json"));
  delete pkg.scripts["import:encounters:hoenn"];
  delete pkg.scripts["test:action-balance"];
  write("package.json", JSON.stringify(pkg, null, 2));

  // Validate edited support files and the current-only tests before commit.
  for (const rel of ["game-shell-contract.js", "token-control-controller.js", "token-sandbox-session.js", "scripts/test-game-shell-loading.js", "scripts/test-v2-route-browser-mount.js", "scripts/test-v2-route-runtime-sequences.js", "scripts/test-action-operation-contract.js"]) run(["--check", rel]);
  run(["--test", "scripts/test-game-shell-loading.js"]);
  run(["--test", "scripts/test-v2-route-browser-mount.js"]);
  run(["--test", "scripts/test-action-operation-contract.js"]);

  git(["add", "-A"]);
  execFileSync("git", ["diff", "--cached", "--check"], { cwd: ROOT, stdio: "inherit" });
  const staged = git(["diff", "--cached", "--stat"]); if (!staged) throw new Error("Stage 10B produced no diff.");
  console.log(`\n${staged}`);
  console.log("Converted the game-shell contract/tests to current-only Action Phase semantics.");
  console.log("Removed final deleted Encounter/Honey client buckets from support modules and current operation tests.");
  console.log("Deleted the orphan V1 Action balance module/test and Hoenn Encounter-Wheel importer.");
  git(["commit", "-m", "Retire stale V1 support and tests"], true);
  git(["push", "origin", BRANCH], true);
  console.log("\nStage 10B complete: stale V1 support/test layer retired and pushed.");
} catch (error) {
  console.error(`\nV1 purge Stage 10B failed safely:\n${error.message}`);
  try { execFileSync("git", ["reset", "--hard", "HEAD"], { cwd: ROOT, stdio: "ignore" }); } catch {}
  process.exitCode = 1;
}
