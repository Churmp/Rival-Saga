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
    throw new Error(`Working tree must be clean before Stage 2. Current changes:\n${status}`);
  }
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
  throw new Error("Could not find matching function brace.");
}

function replaceWholeFunction(text, signature, replacement, expectedMarker) {
  const start = text.indexOf(signature);
  if (start === -1) throw new Error(`Missing function signature: ${signature}`);
  if (text.indexOf(signature, start + signature.length) !== -1) {
    throw new Error(`Expected exactly one function signature: ${signature}`);
  }
  const open = text.indexOf("{", start + signature.length - 1);
  if (open === -1) throw new Error(`Missing opening brace for ${signature}`);
  const end = findMatchingBrace(text, open);
  const original = text.slice(start, end + 1);
  if (!original.includes(expectedMarker)) {
    throw new Error(`Refusing to replace ${signature}; expected marker not found: ${expectedMarker}`);
  }
  return {
    text: text.slice(0, start) + replacement + text.slice(end + 1),
    removedChars: original.length - replacement.length,
  };
}

function runCheck(file) {
  execFileSync(process.execPath, ["--check", file], { cwd: ROOT, stdio: "inherit" });
}

function main() {
  ensureSafeBranch();
  let app = fs.readFileSync(APP_PATH, "utf8");

  if (app.includes("ACTION_PHASE_VERSION_V1")) {
    throw new Error("Stage 1 invariant failed: ACTION_PHASE_VERSION_V1 still exists in app.js.");
  }

  const replacement = [
    "function renderActionPhase() {",
    "  renderV2RouteActionPhase();",
    "}",
  ].join("\n");

  const result = replaceWholeFunction(
    app,
    "function renderActionPhase() {",
    replacement,
    "renderV2RouteActionPhase();"
  );
  app = result.text;

  if (app.includes("function renderActionPhase() {\n  if (activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2)")) {
    throw new Error("Legacy Action Phase dispatch still exists after rewrite.");
  }
  const occurrences = app.split("function renderActionPhase() {").length - 1;
  if (occurrences !== 1) {
    throw new Error(`Expected one renderActionPhase function after rewrite; found ${occurrences}.`);
  }

  fs.writeFileSync(APP_PATH, app, "utf8");
  runCheck("app.js");

  git(["add", "app.js"]);
  const staged = git(["diff", "--cached", "--stat"]);
  if (!staged) throw new Error("Stage 2 produced no staged changes.");
  console.log(`\n${staged}`);
  console.log(`Removed approximately ${result.removedChars.toLocaleString()} characters from the legacy Action Phase renderer.`);

  git(["commit", "-m", "Remove legacy V1 Action Phase renderer"], { inherit: true });
  git(["push", "origin", EXPECTED_BRANCH], { inherit: true });
  console.log("\nStage 2 complete: renderActionPhase is current-only and pushed.");
}

try {
  main();
} catch (error) {
  console.error(`\nV1 purge Stage 2 failed safely:\n${error.message}`);
  process.exitCode = 1;
}
