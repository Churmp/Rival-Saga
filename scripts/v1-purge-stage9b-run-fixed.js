#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const Module = require("module");

const SCRIPT_PATH = path.join(__dirname, "v1-purge-stage9b-retire-encounter-contract-layer.js");
let source = fs.readFileSync(SCRIPT_PATH, "utf8");

const anchor = '  contract=removeFreezeProperty(contract,"reroll-token");\n  contract=removeFreezeProperty(contract,"honey-token");';
const replacement = '  contract=removeFreezeProperty(contract,"reroll-token");\n  contract=removeFreezeProperty(contract,"extra-encounter-token");\n  contract=removeFreezeProperty(contract,"honey-token");';

if (!source.includes(anchor)) {
  console.error("Stage 9B fixed runner failed safely: expected verification cleanup anchor was not found.");
  process.exit(1);
}
source = source.replace(anchor, replacement);

const runner = new Module(SCRIPT_PATH, module);
runner.filename = SCRIPT_PATH;
runner.paths = Module._nodeModulePaths(path.dirname(SCRIPT_PATH));
runner._compile(source, SCRIPT_PATH);
