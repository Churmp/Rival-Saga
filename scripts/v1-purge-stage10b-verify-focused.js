#!/usr/bin/env node
"use strict";

const path = require("node:path");
const { spawnSync } = require("node:child_process");

const ROOT = path.resolve(__dirname, "..");
const TESTS = [
  { file: "scripts/test-action-operation-contract.js", timeout: 180000 },
  { file: "scripts/test-backend-persistence.js", timeout: 180000 },
  { file: "scripts/test-provisional-declaration-runtime.js", timeout: 180000 },
  { file: "scripts/test-provisional-declaration-server.js", timeout: 180000 },
  { file: "scripts/test-token-controller-integration.js", timeout: 180000 },
  { file: "scripts/test-token-sandbox.js", timeout: 180000 },
  { file: "scripts/test-v2-route-browser-mount.js", timeout: 240000 },
  { file: "scripts/test-v2-route-runtime-sequences.js", timeout: 240000 },
  { file: "versions/next-action-phase/tests/test-route-encounter-engine.js", timeout: 180000 },
];

const failures = [];
for (const { file, timeout } of TESTS) {
  console.log(`\n=== VERIFY ${file} ===`);
  const result = spawnSync(process.execPath, ["--test", file], {
    cwd: ROOT,
    stdio: "inherit",
    env: process.env,
    timeout,
  });

  if (result.error?.code === "ETIMEDOUT" || result.signal) {
    const reason = result.error?.code === "ETIMEDOUT" ? "timeout" : `signal ${result.signal}`;
    console.error(`VERIFY TIMEOUT ${file}: ${reason}`);
    failures.push(`${file}: ${reason}`);
    continue;
  }
  if (result.status !== 0) {
    console.error(`VERIFY FAIL ${file}: exit ${result.status}`);
    failures.push(`${file}: exit ${result.status}`);
    continue;
  }
  console.log(`VERIFY PASS ${file}`);
}

console.log("\n=== Stage 10B focused verification summary ===");
if (failures.length) {
  for (const failure of failures) console.error(`FAIL ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`PASS ${TESTS.length}/${TESTS.length} focused tests.`);
}
