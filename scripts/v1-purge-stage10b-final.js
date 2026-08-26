#!/usr/bin/env node
"use strict";
const c=require("./v1-purge-stage10b-lib.js"),core=require("./v1-purge-stage10b-core.js"),tests=require("./v1-purge-stage10b-tests.js");
const {fs,path,execFileSync,ROOT,BRANCH,git,write}=c;
function node(args){execFileSync("node",args,{cwd:ROOT,stdio:"inherit",env:process.env});}
try{
 if(git(["branch","--show-current"])!==BRANCH)throw new Error(`Run only on ${BRANCH}.`);
 const status=git(["status","--porcelain"]);if(status)throw new Error(`Working tree must be clean.\n${status}`);
 const edits=new Map([...core(c),...tests(c)]);
 let pkg=JSON.parse(c.read("package.json"));
 for(const k of["import:encounters:hoenn","test:action-balance"]){if(!Object.hasOwn(pkg.scripts||{},k))throw new Error(`Missing package script ${k}`);delete pkg.scripts[k];}
 edits.set("package.json",JSON.stringify(pkg,null,2));
 const dels=["action-phase-balance.js","scripts/test-action-phase-balance.js","scripts/import-pokeapi-hoenn-encounters.js","scripts/v1-purge-inspect.js"];
 for(const rel of dels)if(!fs.existsSync(path.join(ROOT,rel)))throw new Error(`Expected stale file missing: ${rel}`);
 for(const [rel,text]of edits)write(rel,text); for(const rel of dels)fs.unlinkSync(path.join(ROOT,rel));
 for(const rel of [...edits.keys()].filter(x=>x.endsWith(".js")))node(["--check",rel]);
 git(["add","-A"]);execFileSync("git",["diff","--cached","--check"],{cwd:ROOT,stdio:"inherit"});
 const stat=git(["diff","--cached","--stat"]);if(!stat)throw new Error("Stage 10B produced no diff.");console.log(`\n${stat}`);
 git(["commit","-m","Retire stale V1 runtime support"],true);git(["push","origin",BRANCH],true);console.log("\nStage 10B runtime cleanup complete. Run targeted verification separately.");
}catch(e){console.error(`\nStage 10B failed safely:\n${e.stack||e.message}`);try{execFileSync("git",["reset","--hard","HEAD"],{cwd:ROOT,stdio:"ignore"});}catch{}process.exitCode=1;}
