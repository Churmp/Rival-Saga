#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const Module = require("module");

const SCRIPT_PATH = path.join(__dirname, "v1-purge-stage9b-retire-encounter-contract-layer.js");
let source = fs.readFileSync(SCRIPT_PATH, "utf8");

const functionAnchor = 'const st=ms[0].index,op=text.indexOf("{",st),en=braceEnd(text,op),r=lineRange(text,st,en);';
const functionReplacement = 'const st=ms[0].index,sigClose=text.indexOf(") {",st); if(sigClose<0)throw new Error(`${name}: function body boundary not found`); const op=text.indexOf("{",sigClose),en=braceEnd(text,op),r=lineRange(text,st,en);';
if (!source.includes(functionAnchor)) {
  console.error("Stage 9B fixed runner failed safely: expected function-removal parser anchor was not found.");
  process.exit(1);
}
source = source.replace(functionAnchor, functionReplacement);

const verificationAnchor = '  contract=removeFreezeProperty(contract,"reroll-token");\n  contract=removeFreezeProperty(contract,"honey-token");';
const verificationReplacement = '  contract=removeFreezeProperty(contract,"reroll-token");\n  contract=removeFreezeProperty(contract,"extra-encounter-token");\n  contract=removeFreezeProperty(contract,"honey-token");';
if (!source.includes(verificationAnchor)) {
  console.error("Stage 9B fixed runner failed safely: expected verification cleanup anchor was not found.");
  process.exit(1);
}
source = source.replace(verificationAnchor, verificationReplacement);

const phaseAnchor = '  contract=removePhaseSetProperties(contract);';
const phaseReplacement = `  contract=removePhaseSetProperties(contract);
  {
    const marker = '    "honey-token": {';
    if (count(contract, marker) !== 1) throw new Error(\`Honey implementation override: expected one property, found \${count(contract, marker)}.\`);
    const st = contract.indexOf(marker);
    const op = contract.indexOf("{", st);
    const en = braceEnd(contract, op);
    let close = en;
    if (contract[close] === ",") close += 1;
    const r = lineRange(contract, st, close);
    contract = contract.slice(0, r.s) + contract.slice(r.e);
  }
  {
    const marker = '      if (definition.id === "honey-token") {';
    if (count(contract, marker) !== 1) throw new Error(\`Honey contract validator: expected one block, found \${count(contract, marker)}.\`);
    const st = contract.indexOf(marker);
    const op = contract.indexOf("{", st);
    const en = braceEnd(contract, op);
    const r = lineRange(contract, st, en);
    contract = contract.slice(0, r.s) + contract.slice(r.e);
  }`;
if (!source.includes(phaseAnchor)) {
  console.error("Stage 9B fixed runner failed safely: expected phase-set cleanup anchor was not found.");
  process.exit(1);
}
source = source.replace(phaseAnchor, phaseReplacement);

const legacyPhrase = "retired Encounter Wheel transfer path no longer exists.";
if (!source.includes(legacyPhrase)) {
  console.error("Stage 9B fixed runner failed safely: expected Quick Ball legacy wording was not found.");
  process.exit(1);
}
source = source.replace(legacyPhrase, "retired wheel-era transfer path no longer exists.");

const runner = new Module(SCRIPT_PATH, module);
runner.filename = SCRIPT_PATH;
runner.paths = Module._nodeModulePaths(path.dirname(SCRIPT_PATH));
runner._compile(source, SCRIPT_PATH);
