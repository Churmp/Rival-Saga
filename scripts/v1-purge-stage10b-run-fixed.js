#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const Module = require("module");

const SCRIPT_PATH = path.join(__dirname, "v1-purge-stage10b-retire-stale-support-tests.js");
let source = fs.readFileSync(SCRIPT_PATH, "utf8");

const anchor = `  fixtures = replaceOnce(fixtures, '    actionPhaseVersion: "action-phase-v1-current-series",', '    actionPhaseVersion: "action-phase-v2-real-series",', "currentProgressed version");`;
const replacement = `  mustCount(fixtures, '    actionPhaseVersion: "action-phase-v1-current-series",', 2, "legacy fixture version strings");
  fixtures = fixtures.replaceAll('    actionPhaseVersion: "action-phase-v1-current-series",', '    actionPhaseVersion: "action-phase-v2-real-series",');`;
if ((source.split(anchor).length - 1) !== 1) {
  console.error("Stage 10B fixed runner failed safely: fixture-version anchor not found exactly once.");
  process.exit(1);
}
source = source.replace(anchor, replacement);

const runner = new Module(SCRIPT_PATH, module);
runner.filename = SCRIPT_PATH;
runner.paths = Module._nodeModulePaths(path.dirname(SCRIPT_PATH));
runner._compile(source, SCRIPT_PATH);
