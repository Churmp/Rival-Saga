#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const EXPECTED_BRANCH = "audit/purge-v1-runtime";

function run(command, args, { inherit = false } = {}) {
  const result = spawnSync(command, args, {
    cwd: ROOT,
    encoding: "utf8",
    stdio: inherit ? "inherit" : ["ignore", "pipe", "pipe"],
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    const stderr = String(result.stderr || "").trim();
    throw new Error(`${command} ${args.join(" ")} failed${stderr ? `:\n${stderr}` : ""}`);
  }
  return String(result.stdout || "").trim();
}

function git(args, options) {
  return run("git", args, options);
}

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function write(relativePath, content) {
  fs.writeFileSync(path.join(ROOT, relativePath), content, "utf8");
}

function countOccurrences(text, needle) {
  if (!needle) return 0;
  let count = 0;
  let index = 0;
  while ((index = text.indexOf(needle, index)) !== -1) {
    count += 1;
    index += needle.length;
  }
  return count;
}

function replaceExact(text, before, after, expectedCount, label) {
  const count = countOccurrences(text, before);
  if (count !== expectedCount) {
    throw new Error(`${label}: expected ${expectedCount} exact occurrence(s), found ${count}. Refusing to edit.`);
  }
  return text.split(before).join(after);
}

function ensureSafeStart() {
  const branch = git(["branch", "--show-current"]);
  if (branch !== EXPECTED_BRANCH) {
    throw new Error(`Refusing to run on ${branch || "detached HEAD"}. Switch to ${EXPECTED_BRANCH} first.`);
  }
  const status = git(["status", "--porcelain"]);
  if (status) {
    throw new Error(`Working tree must be clean before Stage 1. Current changes:\n${status}`);
  }
}

function editApp() {
  let text = read("app.js");

  text = replaceExact(
    text,
`const CURRENT_RULESET_VERSION = "S3-dev";
const ACTION_PHASE_VERSION_V1 = "action-phase-v1-current-series";
const ACTION_PHASE_VERSION_V2 = "action-phase-v2-real-series";
const DEFAULT_ACTION_PHASE_VERSION = ACTION_PHASE_VERSION_V2;
const ACTION_PHASE_VERSION_LABELS = Object.freeze({
  [ACTION_PHASE_VERSION_V1]: "Action Phase V1 / Legacy",
  [ACTION_PHASE_VERSION_V2]: "Action Phase V2 / Current"
});

function normalizeActionPhaseVersion(value) {
  if (value === ACTION_PHASE_VERSION_V1) return ACTION_PHASE_VERSION_V1;
  return value === ACTION_PHASE_VERSION_V2 ? ACTION_PHASE_VERSION_V2 : DEFAULT_ACTION_PHASE_VERSION;
}`,
`const CURRENT_RULESET_VERSION = "S3-dev";
const ACTION_PHASE_VERSION_V2 = "action-phase-v2-real-series";
const DEFAULT_ACTION_PHASE_VERSION = ACTION_PHASE_VERSION_V2;
const ACTION_PHASE_VERSION_LABELS = Object.freeze({
  [ACTION_PHASE_VERSION_V2]: "Action Phase V2 / Current"
});

function normalizeActionPhaseVersion() {
  return DEFAULT_ACTION_PHASE_VERSION;
}`,
    1,
    "app.js version constants/normalizer"
  );

  text = replaceExact(
    text,
    "supportedActionPhaseVersions: [ACTION_PHASE_VERSION_V1, ACTION_PHASE_VERSION_V2],",
    "supportedActionPhaseVersions: [ACTION_PHASE_VERSION_V2],",
    1,
    "app.js default supported versions"
  );

  text = replaceExact(
    text,
`      "Action Phase V2 is the current/default Rival Saga ruleset for newly created games.",
      "Action Phase V1 is archived/maintenance-only and remains available for explicitly persisted legacy saves.",
      "New feature development targets Action Phase V2 exclusively."`,
`      "The current Action Phase is the only playable Rival Saga ruleset.",
      "Historical Action Phase implementations live in Git archives, not production runtime code."`,
    1,
    "app.js ruleset notes"
  );

  text = replaceExact(
    text,
    "        ACTION_PHASE_VERSION_V1,\n",
    "",
    2,
    "app.js backend supported-version injection"
  );

  text = replaceExact(
    text,
    ": ACTION_PHASE_VERSION_V1,",
    ": DEFAULT_ACTION_PHASE_VERSION,",
    1,
    "app.js unversioned-state fallback"
  );

  for (const retired of ["ACTION_PHASE_VERSION_V1", "action-phase-v1-current-series", "Action Phase V1"]) {
    const count = countOccurrences(text, retired);
    if (count !== 0) throw new Error(`app.js still contains retired marker ${retired} (${count} occurrence(s)).`);
  }

  write("app.js", text);
}

function editServer() {
  let text = read("server.js");

  text = replaceExact(
    text,
`const ACTION_PHASE_VERSION_V1 = "action-phase-v1-current-series";
const ACTION_PHASE_VERSION_V2 = "action-phase-v2-real-series";`,
`const ACTION_PHASE_VERSION_V2 = "action-phase-v2-real-series";`,
    1,
    "server.js version constants"
  );

  text = replaceExact(
    text,
`function normalizeActionPhaseVersion(value) {
  if (value === ACTION_PHASE_VERSION_V1) return ACTION_PHASE_VERSION_V1;
  return value === ACTION_PHASE_VERSION_V2 ? ACTION_PHASE_VERSION_V2 : DEFAULT_ACTION_PHASE_VERSION;
}

function persistedActionPhaseVersion(game = {}) {
  const candidate = game.actionPhaseVersion || game.state?.ruleset?.actionPhaseVersion || game.state?.actionPhaseVersion;
  if (candidate) return normalizeActionPhaseVersion(candidate);
  return game.state ? ACTION_PHASE_VERSION_V1 : DEFAULT_ACTION_PHASE_VERSION;
}`,
`function normalizeActionPhaseVersion() {
  return DEFAULT_ACTION_PHASE_VERSION;
}

function persistedActionPhaseVersion() {
  return DEFAULT_ACTION_PHASE_VERSION;
}`,
    1,
    "server.js version normalization/persistence"
  );

  for (const retired of ["ACTION_PHASE_VERSION_V1", "action-phase-v1-current-series"]) {
    const count = countOccurrences(text, retired);
    if (count !== 0) throw new Error(`server.js still contains retired marker ${retired} (${count} occurrence(s)).`);
  }

  write("server.js", text);
}

function validate() {
  run(process.execPath, ["--check", "app.js"], { inherit: true });
  run(process.execPath, ["--check", "server.js"], { inherit: true });

  const app = read("app.js");
  const server = read("server.js");
  if (!app.includes("supportedActionPhaseVersions: [ACTION_PHASE_VERSION_V2],")) {
    throw new Error("Stage 1 validation failed: app.js is not current-only in createDefaultRuleset().");
  }
  if (!app.includes("function renderActionPhase()")) {
    throw new Error("Stage 1 validation failed: Action Phase renderer unexpectedly disappeared.");
  }
  if (!app.includes("activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2")) {
    throw new Error("Stage 1 validation failed: expected Stage 2 dispatch boundary is missing.");
  }
  if (!server.includes("function persistedActionPhaseVersion()")) {
    throw new Error("Stage 1 validation failed: current-only server persisted version helper missing.");
  }
}

function commitAndPush() {
  git(["add", "app.js", "server.js"]);
  const staged = git(["diff", "--cached", "--name-only"]);
  if (!staged) throw new Error("Stage 1 produced no staged changes.");
  git(["commit", "-m", "Purge V1 action phase version compatibility"], { inherit: true });
  git(["push", "origin", EXPECTED_BRANCH], { inherit: true });
}

try {
  ensureSafeStart();
  editApp();
  editServer();
  validate();
  commitAndPush();
  console.log("\nStage 1 complete: V1 version compatibility removed and pushed.");
} catch (error) {
  console.error(`\nV1 purge Stage 1 failed safely:\n${error.message}`);
  process.exitCode = 1;
}
