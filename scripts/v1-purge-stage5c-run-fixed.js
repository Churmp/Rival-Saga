#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const Module = require("module");

const STAGE_PATH = path.join(__dirname, "v1-purge-stage5c-remove-encounter-wheel.js");
const source = fs.readFileSync(STAGE_PATH, "utf8");

const anchor = '    app = app.replace(/^[ \\t]*renderEncounterOverlay\\(\\);\\r?\\n/gm, "");';
const occurrences = source.split(anchor).length - 1;
if (occurrences !== 1) {
  console.error(`Stage 5C fixed runner refused to patch: expected 1 renderEncounterOverlay cleanup anchor, found ${occurrences}.`);
  process.exitCode = 1;
} else {
  const injected = [
    '    app = replaceExactOnce(',
    '      app,',
    '      [',
    "        '      if (state.encounterModalOpen) {',",
    "        '        state.encounterModalOpen = false;',",
    "        '        saveState();',",
    "        '        renderEncounterOverlay();',",
    "        '      }',",
    '      ].join("\\n") + "\\n",',
    '      "",',
    '      "Encounter modal cleanup in phase-agenda close path"',
    '    );',
    '',
    anchor,
  ].join("\n");

  const patchedSource = source.replace(anchor, injected);
  const stageModule = new Module(STAGE_PATH, module);
  stageModule.filename = STAGE_PATH;
  stageModule.paths = Module._nodeModulePaths(path.dirname(STAGE_PATH));
  stageModule._compile(patchedSource, STAGE_PATH);
}
