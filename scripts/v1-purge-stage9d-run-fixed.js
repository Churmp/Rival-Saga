#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const Module = require("module");

const SCRIPT_PATH = path.join(__dirname, "v1-purge-stage9d-normalize-live-pokemon-results.js");
let source = fs.readFileSync(SCRIPT_PATH, "utf8");

const bad = '    alert(`${draft.tokenName || "This Token"} is not supported from the generic Pokemon result window. Route Encounter Tokens are used from Routes.`);';
const fixed = '    alert(String(draft.tokenName || "This Token") + " is not supported from the generic Pokemon result window. Route Encounter Tokens are used from Routes.");';
const count = source.split(bad).length - 1;
if (count !== 1) {
  console.error(`Stage 9D fixed runner failed safely: expected one nested-template syntax anchor, found ${count}.`);
  process.exit(1);
}
source = source.replace(bad, fixed);

const runner = new Module(SCRIPT_PATH, module);
runner.filename = SCRIPT_PATH;
runner.paths = Module._nodeModulePaths(path.dirname(SCRIPT_PATH));
runner._compile(source, SCRIPT_PATH);
