#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const Module = require("module");

const STAGE_PATH = path.join(__dirname, "v1-purge-stage6-contamination-survey.js");
const source = fs.readFileSync(STAGE_PATH, "utf8");

const anchor = '  fs.writeFileSync(REPORT_PATH, `${out.join("\\n")}\\n`, "utf8");';
const occurrences = source.split(anchor).length - 1;
if (occurrences !== 1) {
  console.error(`Stage 6 fixed runner refused to patch: expected 1 report-write anchor, found ${occurrences}.`);
  process.exitCode = 1;
} else {
  const replacement = [
    '  const sanitizedReport = `${out.join("\\n")}\\n`',
    '    .split("\\n")',
    '    .map((line) => line.replace(/[ \\t]+$/g, ""))',
    '    .join("\\n");',
    '  fs.writeFileSync(REPORT_PATH, sanitizedReport, "utf8");',
  ].join("\n");

  const patchedSource = source.replace(anchor, replacement);
  const stageModule = new Module(STAGE_PATH, module);
  stageModule.filename = STAGE_PATH;
  stageModule.paths = Module._nodeModulePaths(path.dirname(STAGE_PATH));
  stageModule._compile(patchedSource, STAGE_PATH);
}
