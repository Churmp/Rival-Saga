#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const Module = require("module");

const SCRIPT_PATH = path.join(__dirname, "v1-purge-stage9f-retire-encounter-taxonomy.js");
let source = fs.readFileSync(SCRIPT_PATH, "utf8");

const anchor = `  app = replaceOnce(app,
    '    responseTypes: ["encounter-reroll", "steal-encounter"]',
    '    responseTypes: ["pokemon-reroll"]',
    "pokemon-result response types");
  app = replaceOnce(app,
    '    responseTypes: ["encounter-reroll", "steal-encounter"],',
    '    responseTypes: ["pokemon-reroll"],',
    "Pokemon result event response types");`;

const replacement = `  mustCount(app, '    responseTypes: ["encounter-reroll", "steal-encounter"]', 2, "Pokemon-result response lists");
  app = app.replaceAll('    responseTypes: ["encounter-reroll", "steal-encounter"]', '    responseTypes: ["pokemon-reroll"]');`;

if ((source.split(anchor).length - 1) !== 1) {
  console.error("Stage 9F fixed runner failed safely: response-list patch anchor was not found exactly once.");
  process.exit(1);
}
source = source.replace(anchor, replacement);

const runner = new Module(SCRIPT_PATH, module);
runner.filename = SCRIPT_PATH;
runner.paths = Module._nodeModulePaths(path.dirname(SCRIPT_PATH));
runner._compile(source, SCRIPT_PATH);
