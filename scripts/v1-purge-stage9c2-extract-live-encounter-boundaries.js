#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path"),{execFileSync}=require("child_process");
const ROOT=path.resolve(__dirname,".."),BRANCH="audit/purge-v1-runtime",REL="V1_PURGE_STAGE9C2_BOUNDARIES.md",OUT=path.join(ROOT,REL);
function git(a,inh=false){const o=execFileSync("git",a,{cwd:ROOT,encoding:"utf8",stdio:inh?"inherit":["ignore","pipe","pipe"]});return typeof o==="string"?o.trim():"";}
function clean(s){return String(s).replace(/\r/g,"");}
function block(lines,start,end,label,file="app.js"){const out=[`## ${label} — \`${file}:${start}-${end}\``,"","```js"];for(let i=start;i<=end&&i<=lines.length;i++)out.push(`${String(i).padStart(6," ")} | ${lines[i-1].replace(/[ \t]+$/g,"")}`);out.push("```","");return out;}
try{
 if(git(["branch","--show-current"])!==BRANCH)throw new Error(`Run only on ${BRANCH}`);const s=git(["status","--porcelain"]);if(s)throw new Error(`Working tree not clean:\n${s}`);
 const app=clean(fs.readFileSync(path.join(ROOT,"app.js"),"utf8")).split("\n"),server=clean(fs.readFileSync(path.join(ROOT,"server.js"),"utf8")).split("\n");
 const ranges=[
  [600,890,"Live response/timing constants"],[2480,2790,"Default state + generic token metadata"],[2940,3550,"Token engine definitions/normalizers"],[3760,4520,"Snapshot/undo/persistence token plumbing"],[21870,21930,"State normalization near Encounter copy records"],[23120,23190,"Pokemon result timing window"],[25480,25610,"Live timing category/prompt details"],[26130,26220,"Current Live prompt result-session handling"],[26370,26440,"Manual Live event types"],[27090,27210,"Manual timing-window options"],[27550,27630,"Encounter pending activity/token recording"],[27970,28070,"Live token can-use encounter guard"],[28250,28320,"Live token inventory/timing labels"],[29370,29430,"Target-category mapping"],[46920,47010,"Sandbox/admin Live scenarios"],[47450,47540,"Admin test-event creation"],[48870,48930,"Causal undo cleanup"],[59290,59690,"State snapshot/undo restoration"],
 ];
 const out=["# Stage 9C2 — Final Live Encounter Source Boundaries","",`Generated from \`${git(["rev-parse","HEAD"])}\`.`,""];
 for(const [a,b,l] of ranges)out.push(...block(app,a,b,l));out.push(...block(server,1275,1320,"Server state normalization","server.js"));
 fs.writeFileSync(OUT,out.join("\n").replace(/\n+$/g,"")+"\n","utf8");git(["add",REL]);execFileSync("git",["diff","--cached","--check"],{cwd:ROOT,stdio:"inherit"});console.log(`\n${git(["diff","--cached","--stat"])}`);git(["commit","-m","Capture final Encounter source boundaries"],true);git(["push","origin",BRANCH],true);console.log(`\nStage 9C2 complete: wrote and pushed ${REL}.`);
}catch(e){console.error(`\nStage 9C2 failed safely:\n${e.message}`);process.exitCode=1;}
