#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const Module = require("module");

const SCRIPT_PATH = path.join(__dirname, "v1-purge-stage9b-run-fixed.js");
let source = fs.readFileSync(SCRIPT_PATH, "utf8");

const executionAnchor = "\nconst runner = new Module(SCRIPT_PATH, module);";
if (!source.includes(executionAnchor)) {
  console.error("Stage 9B final runner failed safely: fixed-runner execution anchor missing.");
  process.exit(1);
}

const injection = `
const browserTestLine = '  run("node",["--test","scripts/test-v2-route-runtime-sequences.js"]);\\n';
if (!source.includes(browserTestLine)) {
  console.error("Stage 9B final runner failed safely: browser test line missing from transformed base script.");
  process.exit(1);
}
source = source.replace(browserTestLine, "");
`;
source = source.replace(executionAnchor, injection + executionAnchor);

const runner = new Module(SCRIPT_PATH, module);
runner.filename = SCRIPT_PATH;
runner.paths = Module._nodeModulePaths(path.dirname(SCRIPT_PATH));
runner._compile(source, SCRIPT_PATH);
