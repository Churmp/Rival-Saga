#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const Module = require("module");

const SCRIPT_PATH = path.join(__dirname, "v1-purge-stage9f-retire-encounter-taxonomy.js");
let source = fs.readFileSync(SCRIPT_PATH, "utf8");

const responseAnchor = `  app = replaceOnce(app,
    '    responseTypes: ["encounter-reroll", "steal-encounter"]',
    '    responseTypes: ["pokemon-reroll"]',
    "pokemon-result response types");
  app = replaceOnce(app,
    '    responseTypes: ["encounter-reroll", "steal-encounter"],',
    '    responseTypes: ["pokemon-reroll"],',
    "Pokemon result event response types");`;
const responseReplacement = `  mustCount(app, '    responseTypes: ["encounter-reroll", "steal-encounter"]', 2, "Pokemon-result response lists");
  app = app.replaceAll('    responseTypes: ["encounter-reroll", "steal-encounter"]', '    responseTypes: ["pokemon-reroll"]');`;
if ((source.split(responseAnchor).length - 1) !== 1) {
  console.error("Stage 9F fixed runner failed safely: response-list patch anchor was not found exactly once.");
  process.exit(1);
}
source = source.replace(responseAnchor, responseReplacement);

const constantAnchor = `  app = removeLine(app, '  ENCOUNTER_RESULT: "encounterResult",', "Encounter target category constant");
  // EFFECT_TARGET_TYPES has the same literal key/value; remove the second remaining occurrence.
  if (count(app, '  ENCOUNTER_RESULT: "encounterResult",') !== 1) throw new Error("Encounter target type constant: expected one remaining occurrence after category removal.");
  app = removeLine(app, '  ENCOUNTER_RESULT: "encounterResult",', "Encounter target type constant");
  app = removeLine(app, '  ENCOUNTER_MODIFIER: "encounterModifier"', "Encounter use type constant");
  app = removeLine(app, '  ENCOUNTER_RESULT: "encounterResult",', "Encounter pending-event result constant");`;
const constantReplacement = `  mustCount(app, '  ENCOUNTER_RESULT: "encounterResult",', 3, "Encounter result taxonomy constants");
  app = app.replaceAll('  ENCOUNTER_RESULT: "encounterResult",\\n', '');
  app = removeLine(app, '  ENCOUNTER_MODIFIER: "encounterModifier"', "Encounter use type constant");`;
if ((source.split(constantAnchor).length - 1) !== 1) {
  console.error("Stage 9F fixed runner failed safely: duplicate Encounter constant anchor was not found exactly once.");
  process.exit(1);
}
source = source.replace(constantAnchor, constantReplacement);

const auditAnchor = `  mustCount(app, '"token-engine-v1"', 1, "V1 token audit tag");
  app = app.replace('"token-engine-v1"', '"token-engine"');`;
const auditReplacement = `  mustCount(app, '"token-engine-v1"', 3, "V1 token audit tags");
  app = app.replaceAll('"token-engine-v1"', '"token-engine"');`;
if ((source.split(auditAnchor).length - 1) !== 1) {
  console.error("Stage 9F fixed runner failed safely: V1 token audit-tag patch anchor was not found exactly once.");
  process.exit(1);
}
source = source.replace(auditAnchor, auditReplacement);

const eofAnchor = `  app = normalizeEof(app);
  control = normalizeEof(control);`;
const eofReplacement = `  mustCount(app, '"encounter-reroll"', 1, "final old Reroll response ID");
  app = app.replaceAll('"encounter-reroll"', '"pokemon-reroll"');

  app = normalizeEof(app);
  control = normalizeEof(control);`;
if ((source.split(eofAnchor).length - 1) !== 1) {
  console.error("Stage 9F fixed runner failed safely: late Reroll residue anchor was not found exactly once.");
  process.exit(1);
}
source = source.replace(eofAnchor, eofReplacement);

const runner = new Module(SCRIPT_PATH, module);
runner.filename = SCRIPT_PATH;
runner.paths = Module._nodeModulePaths(path.dirname(SCRIPT_PATH));
runner._compile(source, SCRIPT_PATH);
