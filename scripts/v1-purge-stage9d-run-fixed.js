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

const broadPresetAnchor = '    mustCount(app, marker, 1, "admin Encounter preset");\n    const start = app.indexOf(marker);';
const scopedPresetAnchor = '    const presetsAnchor = "  const presets = {";\n    mustCount(app, presetsAnchor, 1, "admin preset collection");\n    const presetsStart = app.indexOf(presetsAnchor);\n    const start = app.indexOf(marker, presetsStart);\n    if (start < 0) throw new Error("Admin Encounter preset was not found inside the preset collection.");';
if ((source.split(broadPresetAnchor).length - 1) !== 1) {
  console.error("Stage 9D fixed runner failed safely: broad admin preset anchor was not found exactly once.");
  process.exit(1);
}
source = source.replace(broadPresetAnchor, scopedPresetAnchor);

const runner = new Module(SCRIPT_PATH, module);
runner.filename = SCRIPT_PATH;
runner.paths = Module._nodeModulePaths(path.dirname(SCRIPT_PATH));
runner._compile(source, SCRIPT_PATH);
