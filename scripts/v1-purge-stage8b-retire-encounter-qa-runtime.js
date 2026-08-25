#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const EXPECTED_BRANCH = "audit/purge-v1-runtime";
const RUNNER_REL = "scripts/run-token-qa-coverage.js";
const SANDBOX_REL = "scripts/test-token-sandbox.js";
const RETIRED_TEST_REL = "scripts/test-encounter-token-runtime.js";
const RUNNER_PATH = path.join(ROOT, RUNNER_REL);
const SANDBOX_PATH = path.join(ROOT, SANDBOX_REL);
const RETIRED_TEST_PATH = path.join(ROOT, RETIRED_TEST_REL);

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

function replaceExactlyOnce(text, needle, replacement, label) {
  const total = count(text, needle);
  if (total !== 1) throw new Error(`${label}: expected exactly 1 occurrence, found ${total}.`);
  return text.replace(needle, replacement);
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

function removeExactNodeTest(text, marker) {
  if (count(text, marker) !== 1) throw new Error(`Expected exactly one sandbox test marker: ${marker}`);
  const start = text.indexOf(marker);
  const open = text.indexOf("{", start);
  if (open < 0) throw new Error(`Could not locate test body for ${marker}`);
  const close = matchingBraceEnd(text, open);
  let end = close;
  while (end < text.length && (text[end] === " " || text[end] === "\t")) end += 1;
  if (!text.startsWith(");", end)) throw new Error(`Could not locate test terminator for ${marker}`);
  end += 2;
  if (text.startsWith("\r\n", end)) end += 2;
  else if (text[end] === "\n") end += 1;
  if (text.startsWith("\r\n", end)) end += 2;
  else if (text[end] === "\n") end += 1;
  return text.slice(0, start) + text.slice(end);
}

function ensureSafeStart() {
  const branch = git(["branch", "--show-current"]);
  if (branch !== EXPECTED_BRANCH) {
    throw new Error(`Refusing to run on ${branch || "detached HEAD"}. Switch to ${EXPECTED_BRANCH}.`);
  }
  const status = git(["status", "--porcelain"]);
  if (status) throw new Error(`Working tree must be clean before Stage 8B.\n${status}`);
  if (!fs.existsSync(RETIRED_TEST_PATH)) throw new Error(`${RETIRED_TEST_REL} is already missing; inspect branch state before rerunning.`);
}

let wroteFiles = false;
let committed = false;

try {
  ensureSafeStart();

  let runner = fs.readFileSync(RUNNER_PATH, "utf8");
  let sandbox = fs.readFileSync(SANDBOX_PATH, "utf8");
  const retiredTest = fs.readFileSync(RETIRED_TEST_PATH, "utf8");

  if (!retiredTest.includes('require("../encounter-token-runtime.js")')) {
    throw new Error("Retired Encounter runtime test no longer has its expected deleted-runtime import.");
  }
  if (!sandbox.includes('[TSB-024] Extra Encounter mutates only the sandbox clone and discard removes the exact grant')) {
    throw new Error("Expected obsolete TSB-024 Extra Encounter sandbox test is missing.");
  }
  if (!sandbox.includes('[TSB-027] lifecycle-slice delayed, encounter, suppression, evolution, and payout mutations commit idempotently and discard exactly')) {
    throw new Error("Current/deferred TSB-027 lifecycle sandbox test is missing; refusing to edit the sandbox suite.");
  }

  runner = replaceExactlyOnce(
    runner,
    '  "scripts/test-encounter-token-runtime.js",\n',
    "",
    "token QA runner retired Encounter test entry"
  );

  sandbox = replaceExactlyOnce(
    sandbox,
    'const encounterTokenRuntime = require("../encounter-token-runtime.js");\n',
    "",
    "token sandbox deleted Encounter runtime import"
  );

  sandbox = removeExactNodeTest(
    sandbox,
    'test("[TSB-024] Extra Encounter mutates only the sandbox clone and discard removes the exact grant", () => {'
  );

  if (runner.includes("test-encounter-token-runtime.js") || runner.includes("encounter-token-runtime.js")) {
    throw new Error("Retired Encounter runtime test still appears in executable QA runner.");
  }
  for (const marker of [
    'require("../encounter-token-runtime.js")',
    "encounterTokenRuntime",
    "baseline.encounterSessions = []",
    "sandbox-extra-session",
    "sandbox-extra-grant",
    "[TSB-024]",
  ]) {
    if (sandbox.includes(marker)) throw new Error(`Deleted Encounter runtime sandbox residue remains: ${marker}`);
  }
  if (!sandbox.includes('[TSB-027] lifecycle-slice delayed, encounter, suppression, evolution, and payout mutations commit idempotently and discard exactly')) {
    throw new Error("TSB-027 was damaged while removing TSB-024.");
  }

  fs.writeFileSync(RUNNER_PATH, runner, "utf8");
  fs.writeFileSync(SANDBOX_PATH, sandbox, "utf8");
  fs.unlinkSync(RETIRED_TEST_PATH);
  wroteFiles = true;

  run("node", ["--check", RUNNER_REL]);
  run("node", ["--check", SANDBOX_REL]);
  run("node", ["--test", SANDBOX_REL]);
  run("node", ["--test", "scripts/test-v2-route-runtime-sequences.js"]);
  run("node", ["--test", "versions/next-action-phase/tests/test-route-encounter-engine.js"]);

  git(["add", RUNNER_REL, SANDBOX_REL]);
  git(["rm", "--", RETIRED_TEST_REL]);
  run("git", ["diff", "--cached", "--check"]);

  const staged = git(["diff", "--cached", "--stat"]);
  if (!staged) throw new Error("Stage 8B produced no staged changes.");
  console.log(`\n${staged}`);
  console.log("Deleted the obsolete Encounter Token runtime test and removed its executable QA wiring.");
  console.log("Removed obsolete TSB-024, which directly exercised deleted encounterSessions/grantExtraEncounter V1 runtime.");
  console.log("Preserved TSB-027 and other token-control lifecycle tests for the later Route-token migration.");
  console.log("Historical QA evidence and production Encounter token contracts remain intentionally deferred.");

  git(["commit", "-m", "Retire obsolete Encounter runtime QA"], { inherit: true });
  committed = true;
  git(["push", "origin", EXPECTED_BRANCH], { inherit: true });
  console.log("\nStage 8B complete: obsolete Encounter runtime QA wiring removed and pushed.");
} catch (error) {
  console.error(`\nV1 purge Stage 8B failed safely:\n${error.message}`);
  if (!committed && wroteFiles) {
    try {
      git(["reset", "HEAD", "--", RUNNER_REL, SANDBOX_REL, RETIRED_TEST_REL]);
      git(["checkout", "--", RUNNER_REL, SANDBOX_REL, RETIRED_TEST_REL]);
      console.error("Stage 8B changes were restored because no commit was created.");
    } catch (restoreError) {
      console.error(`Automatic restore also failed: ${restoreError.message}`);
      console.error("Do not rerun until the working tree is inspected.");
    }
  } else if (committed) {
    console.error("The Stage 8B commit exists locally. Do not rerun; inspect/push that commit instead.");
  }
  process.exitCode = 1;
}
