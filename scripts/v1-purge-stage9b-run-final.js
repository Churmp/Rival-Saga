#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const Module = require("module");

const SCRIPT_PATH = path.join(__dirname, "v1-purge-stage9b-run-fixed.js");
let source = fs.readFileSync(SCRIPT_PATH, "utf8");

const anchor = 'source = source.replace(writeAnchor, writeReplacement);\n\nconst runner = new Module(SCRIPT_PATH, module);';
const replacement = `source = source.replace(writeAnchor, writeReplacement);

const browserTestLine = '  run("node",["--test","scripts/test-v2-route-runtime-sequences.js"]);\\n';
if (!source.includes('const runner = new Module(SCRIPT_PATH, module);')) {
  console.error("Stage 9B final runner failed safely: fixed-runner execution anchor missing.");
  process.exit(1);
}

const baseSource = fs.readFileSync(path.join(__dirname, "v1-purge-stage9b-retire-encounter-contract-layer.js"), "utf8");
if (!baseSource.includes(browserTestLine)) {
  console.error("Stage 9B final runner failed safely: browser test line missing from base script.");
  process.exit(1);
}

const runner = new Module(SCRIPT_PATH, module);`;
if (!source.includes(anchor)) {
  console.error("Stage 9B final runner failed safely: expected fixed-runner anchor missing.");
  process.exit(1);
}
source = source.replace(anchor, replacement);

const OriginalModuleCompile = Module.prototype._compile;
let patchedBase = false;
Module.prototype._compile = function patchedCompile(content, filename) {
  if (!patchedBase && path.resolve(filename) === path.resolve(path.join(__dirname, "v1-purge-stage9b-retire-encounter-contract-layer.js"))) {
    patchedBase = true;
    content = content.replace('  run("node",["--test","scripts/test-v2-route-runtime-sequences.js"]);\n', "");
  }
  return OriginalModuleCompile.call(this, content, filename);
};

try {
  const finalRunner = new Module(SCRIPT_PATH, module);
  finalRunner.filename = SCRIPT_PATH;
  finalRunner.paths = Module._nodeModulePaths(path.dirname(SCRIPT_PATH));
  finalRunner._compile(source, SCRIPT_PATH);
} finally {
  Module.prototype._compile = OriginalModuleCompile;
}
