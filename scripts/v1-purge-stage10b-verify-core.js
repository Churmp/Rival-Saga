#!/usr/bin/env node
"use strict";

const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const TESTS = [
  "scripts/test-game-shell-loading.js",
  "scripts/test-action-operation-contract.js",
  "scripts/test-backend-persistence.js",
  "scripts/test-provisional-declaration-runtime.js",
  "scripts/test-provisional-declaration-server.js",
];

try {
  for (const file of TESTS) {
    console.log(`\n=== ${file} ===`);
    execFileSync("node", ["--test", file], {
      cwd: ROOT,
      stdio: "inherit",
      env: process.env,
      timeout: 180000,
    });
  }
  console.log("\nStage 10B core verification passed.");
} catch (error) {
  if (error?.signal === "SIGTERM" || error?.code === "ETIMEDOUT") {
    console.error("\nStage 10B core verification timed out in the test shown above.");
  } else {
    console.error(`\nStage 10B core verification failed: ${error?.message || error}`);
  }
  process.exitCode = 1;
}
