#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const ROOT = path.resolve(__dirname, "..");
const OUTPUT_TAIL_LINES = 35;
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

function outputTail(result) {
  const text = [result.stdout, result.stderr]
    .filter(Boolean)
    .join("\n")
    .trim();
  if (!text) return "(no captured output)";
  return text.split(/\r?\n/).slice(-OUTPUT_TAIL_LINES).join("\n");
}

const results = [];
for (const { file, timeout } of TESTS) {
  console.log(`\n=== VERIFY ${file} ===`);
  const startedAt = Date.now();
  const result = spawnSync(process.execPath, ["--test", file], {
    cwd: ROOT,
    env: process.env,
    encoding: "utf8",
    timeout,
    maxBuffer: 20 * 1024 * 1024,
  });
  const durationMs = Date.now() - startedAt;

  let status = "PASS";
  let reason = "";
  if (result.error?.code === "ETIMEDOUT" || result.signal) {
    status = "TIMEOUT";
    reason = result.error?.code === "ETIMEDOUT" ? "timeout" : `signal ${result.signal}`;
  } else if (result.error) {
    status = "ERROR";
    reason = result.error.message || String(result.error);
  } else if (result.status !== 0) {
    status = "FAIL";
    reason = `exit ${result.status}`;
  }

  const diagnostic = status === "PASS" ? "" : outputTail(result);
  results.push({ file, status, reason, durationMs, diagnostic });

  const seconds = (durationMs / 1000).toFixed(1);
  if (status === "PASS") {
    console.log(`VERIFY PASS ${file} (${seconds}s)`);
  } else {
    console.error(`VERIFY ${status} ${file}: ${reason} (${seconds}s)`);
    console.error("--- diagnostic tail ---");
    console.error(diagnostic);
    console.error("--- end diagnostic tail ---");
  }
}

const failures = results.filter((result) => result.status !== "PASS");
console.log("\n=== Stage 10B focused verification summary ===");
for (const result of results) {
  const seconds = (result.durationMs / 1000).toFixed(1);
  const suffix = result.reason ? ` — ${result.reason}` : "";
  const line = `${result.status.padEnd(7)} ${result.file} (${seconds}s)${suffix}`;
  if (result.status === "PASS") console.log(line);
  else console.error(line);
}
console.log(`${results.length - failures.length}/${results.length} focused tests passed.`);

if (process.env.GITHUB_STEP_SUMMARY) {
  const rows = results.map((result) => {
    const seconds = (result.durationMs / 1000).toFixed(1);
    const detail = result.reason ? result.reason.replace(/\|/g, "\\|") : "—";
    return `| ${result.status} | \`${result.file}\` | ${seconds}s | ${detail} |`;
  });
  const markdown = [
    "## Stage 10B focused verification",
    "",
    "| Result | Test | Duration | Detail |",
    "| --- | --- | ---: | --- |",
    ...rows,
    "",
    `**${results.length - failures.length}/${results.length} focused tests passed.**`,
    "",
  ].join("\n");
  fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, markdown, "utf8");
}

if (failures.length) process.exitCode = 1;
