"use strict";

const { spawnSync } = require("node:child_process");
const { buildReport, checkFreshness, printSummary } = require("./generate-token-qa-coverage.js");

const testFiles = [
  "scripts/test-control-token-foundation.js",
  "scripts/test-token-controller-integration.js",
  "scripts/test-token-completion-slice.js",
  "scripts/test-token-lifecycle-slice.js",
  "scripts/test-token-result-summary.js",
  "scripts/test-standard-curse-tokens.js",
  "scripts/test-settled-token-rulings.js",
  "scripts/test-settled-effect-batch.js",
  "scripts/test-token-inventory-runtime.js",
  "scripts/test-provisional-declaration-runtime.js",
  "scripts/test-provisional-declaration-server.js",
  "scripts/test-token-sandbox.js",
  "scripts/test-token-browser.js"
];

const result = spawnSync(process.execPath, ["--test", ...testFiles], {
  cwd: process.cwd(),
  stdio: "inherit"
});

if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status || 1);

try {
  const { report } = buildReport();
  checkFreshness(report);
  console.log("");
  printSummary();
  console.log("TOKEN_QA_COVERAGE.md is fresh; all referenced test IDs exist.");
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
