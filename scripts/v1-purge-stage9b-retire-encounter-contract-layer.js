#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const ROOT = path.resolve(__dirname, "..");
const BRANCH = "audit/purge-v1-runtime";
const PATHS = {
  contract: path.join(ROOT, "token-effect-contract.js"),
  control: path.join(ROOT, "token-control-effects.js"),
  sandbox: path.join(ROOT, "scripts/test-token-sandbox.js"),
  app: path.join(ROOT, "app.js"),
};
function git(args, inherit=false){ const out=execFileSync("git",args,{cwd:ROOT,encoding:"utf8",stdio:inherit?"inherit":["ignore","pipe","pipe"]}); return typeof out==="string"?out.trim():""; }
function run(cmd,args){ execFileSync(cmd,args,{cwd:ROOT,stdio:"inherit"}); }
function count(s,n){ return s.split(n).length-1; }
function braceEnd(text, open){ let d=0,m="code",esc=false; for(let i=open;i<text.length;i++){ const c=text[i],n=text[i+1]; if(m==="line"){if(c==="\n")m="code";continue;} if(m==="block"){if(c==="*"&&n==="/"){m="code";i++;}continue;} if(["s","d","t"].includes(m)){if(esc){esc=false;continue;}if(c==="\\"){esc=true;continue;}if((m==="s"&&c==="'")||(m==="d"&&c==='"')||(m==="t"&&c==="`"))m="code";continue;} if(c==="/"&&n==="/"){m="line";i++;continue;} if(c==="/"&&n==="*"){m="block";i++;continue;} if(c==="'"){m="s";continue;} if(c==='"'){m="d";continue;} if(c==="`"){m="t";continue;} if(c==="{")d++; else if(c==="}"){d--;if(d===0)return i+1;} } throw new Error("Unclosed brace block"); }
function lineRange(text,start,end){ let s=text.lastIndexOf("\n",Math.max(0,start-1)); s=s<0?0:s+1; let e=end; while(e<text.length&&/[ \t]/.test(text[e]))e++; if(text.startsWith("\r\n",e))e+=2; else if(text[e]==="\n")e++; return {s,e}; }
function removeFunction(text,name){ const re=new RegExp(`function\\s+${name}\\s*\\(`,"g"), ms=[...text.matchAll(re)]; if(ms.length!==1)throw new Error(`${name}: expected 1 definition, found ${ms.length}`); const st=ms[0].index,op=text.indexOf("{",st),en=braceEnd(text,op),r=lineRange(text,st,en); return text.slice(0,r.s)+text.slice(r.e); }
function removeFreezeProperty(text,id){ const marker=`    "${id}": Object.freeze({`; if(count(text,marker)!==1)throw new Error(`${id}: verification property count mismatch`); const st=text.indexOf(marker),op=text.indexOf("{",st),en=braceEnd(text,op); let close=text.indexOf(")",en); if(close<0||close-en>4)throw new Error(`${id}: Object.freeze close missing`); close++; if(text[close]===",")close++; const r=lineRange(text,st,close); return text.slice(0,r.s)+text.slice(r.e); }
function replaceOne(text,oldValue,newValue,label){ if(count(text,oldValue)!==1)throw new Error(`${label}: expected exact old text once, found ${count(text,oldValue)}`); return text.replace(oldValue,newValue); }
function replaceEncounterLine(text,id,newLine){ const lines=text.split(/\r?\n/); const hits=[]; lines.forEach((line,i)=>{if(line.includes(`encounter({ id: "${id}"`))hits.push(i);}); if(hits.length!==1)throw new Error(`${id}: expected one Encounter contract line, found ${hits.length}`); lines[hits[0]]=newLine; return lines.join("\n")+(text.endsWith("\n")?"\n":""); }
function editConstArray(text,name,removeValues){ const marker=`const ${name} = Object.freeze([`; const st=text.indexOf(marker); if(st<0)throw new Error(`${name} missing`); const op=text.indexOf("[",st),cl=text.indexOf("]);",op); if(cl<0)throw new Error(`${name} close missing`); let body=text.slice(op+1,cl); for(const value of removeValues){ const before=count(body,`"${value}"`); if(before<1)throw new Error(`${name}: ${value} missing`); body=body.replace(new RegExp(`\\s*"${value}"\\s*,?`,"g"),""); }
  body=body.replace(/,\s*,/g,",").replace(/\[\s*,/g,"[").replace(/,\s*$/g,""); return text.slice(0,op+1)+body+text.slice(cl); }
function removePhaseSetProperties(text){ const marker="const phaseSets = Object.freeze({"; const st=text.indexOf(marker); if(st<0)throw new Error("phaseSets missing"); const op=text.indexOf("{",st),en=braceEnd(text,op); let block=text.slice(st,en); for(const prop of ["encounterBefore","encounterResult"]){ const re=new RegExp(`\\n\\s*${prop}: \\[[^\\]]*\\],?`); if(!re.test(block))throw new Error(`phaseSets.${prop} missing`); block=block.replace(re,""); } return text.slice(0,st)+block+text.slice(en); }

let originals={}; let wrote=false, committed=false;
try{
  if(git(["branch","--show-current"])!==BRANCH)throw new Error(`Run only on ${BRANCH}`);
  const status=git(["status","--porcelain"]); if(status)throw new Error(`Working tree not clean:\n${status}`);
  for(const [k,p] of Object.entries(PATHS)) originals[k]=fs.readFileSync(p,"utf8");
  const app=originals.app;
  for(const marker of ["const V2_ROUTE_TOKEN_IDS","function useV2RouteRerollToken(","function useV2ExtraEncounter(","function applyV2RouteRepel(","function useV2MasterBallOnOpportunity("]) if(!app.includes(marker))throw new Error(`Route invariant missing: ${marker}`);
  if(app.includes("controlTokenEffects.resolveHoneyEncounterCopy"))throw new Error("Honey helper still has a production app caller; refusing removal.");
  if(app.includes("controlTokenEffects.resolveRerollResultRecord"))throw new Error("Legacy reroll helper still has a production app caller; refusing removal.");

  let contract=originals.contract;
  contract=removeFreezeProperty(contract,"reroll-token");
  contract=removeFreezeProperty(contract,"honey-token");
  contract=editConstArray(contract,"registeredRuntimeVerificationTests",["encounter-token-runtime"]);
  contract=editConstArray(contract,"legalTimingValues",["encounterBeforeRoll","encounterResult"]);
  contract=editConstArray(contract,"targetTypes",["encounterResult"]);
  contract=editConstArray(contract,"registeredResolverIds",["reroll","extraEncounter","encounterWheelEdit","encounterTransfer","encounterGrant","encounterCopy","encounterChoose"]);
  contract=removePhaseSetProperties(contract);

  const routeReason=(name,handler)=>`${name} is resolved only inside the current Route action through ${handler}; generic Token/Live Referee activation is intentionally blocked.`;
  const blocked=(id,name,rules,reason,aliases="")=>`    encounter({ id: "${id}", name: "${name}"${aliases}, rulesText: "${rules}", legalPhases: [], timingWindows: [], isResponse: false, requiresPendingEvent: false, createsPendingEvent: false, opensResponseWindow: false, targetType: "manual", targetScope: "manual", resolverMode: resolverModes.HOST_CONFIRMED, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "${reason.replace(/"/g,'\\"')}", requiredChoices: [] }),`;
  contract=replaceEncounterLine(contract,"reroll-token",blocked("reroll-token","Reroll","Reroll your unresolved Route encounter result.",routeReason("Reroll","useV2RouteRerollToken"),', aliases: ["Reroll Token"]'));
  contract=replaceEncounterLine(contract,"extra-encounter-token",blocked("extra-encounter-token","Extra Encounter Token","Gain one additional encounter opportunity on a currently legal Route.",routeReason("Extra Encounter","useV2ExtraEncounter"),', aliases: ["Extra Encounter"]'));
  contract=replaceEncounterLine(contract,"repel-token",blocked("repel-token","Repel","On a Route, suppress five eligible residents of a chosen Battle Tier.",routeReason("Repel","applyV2RouteRepel")));
  contract=replaceEncounterLine(contract,"master-ball-token",blocked("master-ball-token","Master Ball Token","Use a pending Route opportunity to choose a known eligible resident.",routeReason("Master Ball","useV2MasterBallOnOpportunity")));
  contract=replaceEncounterLine(contract,"quick-ball-token",blocked("quick-ball-token","Quick Ball Token","Exchange your encounter for another player's encounter.","Quick Ball is retained as a Saga Token concept but is blocked until its current Route-era transfer rules are reviewed; the retired Encounter Wheel transfer path no longer exists."));
  contract=replaceEncounterLine(contract,"dream-ball-token",blocked("dream-ball-token","Dream Ball Token","Grant an encountered Pokemon access to a chosen legal ability.","Dream Ball is retained as a Saga Token concept but is blocked until its Route-era grant timing and persistence are reviewed; the retired before-wheel path no longer exists."));
  contract=replaceEncounterLine(contract,"honey-token",blocked("honey-token","Honey","Copy an eligible encounter.","Honey is retained as a Saga Token concept but is blocked until its Route-era copy rules are reviewed; the retired end-of-Action Encounter-copy runtime no longer exists."));
  contract=replaceEncounterLine(contract,"beast-ball-token",blocked("beast-ball-token","Beast Ball","Grant an encountered Pokemon access to a chosen legal move.","Beast Ball is retained as a Saga Token concept but is blocked until its Route-era grant timing and persistence are reviewed; the retired before-wheel path no longer exists."));

  for(const marker of ["encounter-token-runtime",'resolverId: "encounterWheelEdit"','resolverId: "encounterTransfer"','resolverId: "encounterGrant"','resolverId: "encounterCopy"','resolverId: "encounterChoose"','resolverId: "extraEncounter"','resolverId: "reroll"',"encounterBeforeRoll",'targetType: "encounterResult"',"Hidden Grotto","Encounter Wheel"]) if(contract.includes(marker))throw new Error(`Contract V1 residue remains: ${marker}`);

  let control=originals.control;
  control=removeFunction(control,"resolveHoneyEncounterCopy");
  control=removeFunction(control,"resolveRerollResultRecord");
  control=replaceOne(control,"    resolveHoneyEncounterCopy,\n","","remove Honey export");
  control=replaceOne(control,"    resolveRerollResultRecord,\n","","remove Reroll export");
  for(const marker of ["resolveHoneyEncounterCopy","resolveRerollResultRecord","Honey copied Encounter",'sourceType: "encounter"']) if(control.includes(marker))throw new Error(`Control helper residue remains: ${marker}`);

  let sandbox=originals.sandbox;
  sandbox=replaceOne(sandbox,'test("[TSB-027] lifecycle-slice delayed, encounter, suppression, evolution, and payout mutations commit idempotently and discard exactly", () => {','test("[TSB-027] lifecycle-slice delayed, suppression, evolution, and payout mutations commit idempotently and discard exactly", () => {',"rename TSB-027");
  sandbox=sandbox.replace(/\n  const gold = baseline\.players\.find\(\(player\) => player\.id === "gold"\);/,"");
  sandbox=sandbox.replace(/\n  gold\.inventory\.push\(\{ id: "sandbox-reroll-token"[^\n]*\);/,"");
  sandbox=sandbox.replace(/\n  baseline\.randomPokemonSessions = \[[\s\S]*?\n  \];/,"");
  sandbox=sandbox.replace(/\n  const honey = controlTokenEffects\.resolveHoneyEncounterCopy\([\s\S]*?assert\.equal\(honey\.result, "resolved"\);/,"");
  sandbox=sandbox.replace(/\n  const reroll = controlTokenEffects\.resolveRerollResultRecord\([\s\S]*?assert\.equal\(reroll\.result, "resolved"\);/,"");
  sandbox=sandbox.replace(/\n  assert\.equal\(candidate\.randomPokemonSessions\.some\(\(entry\) => entry\.copiedFromRandomPokemonSessionId === "sandbox-honey-source"\), true\);/,"");
  sandbox=sandbox.replace(/\n  assert\.equal\(candidate\.randomPokemonSessions\.find\(\(entry\) => entry\.id === "sandbox-reroll-result"\)\.resultDisplayName, "Ralts"\);/,"");
  for(const marker of ["resolveHoneyEncounterCopy","resolveRerollResultRecord","sandbox-honey-source","sandbox-reroll-result","Encounter Wheel",'sourceType: "encounter"',"copiedFromRandomPokemonSessionId"]) if(sandbox.includes(marker))throw new Error(`Sandbox encounter helper residue remains: ${marker}`);

  fs.writeFileSync(PATHS.contract,contract,"utf8"); fs.writeFileSync(PATHS.control,control,"utf8"); fs.writeFileSync(PATHS.sandbox,sandbox,"utf8"); wrote=true;
  run("node",["--check","token-effect-contract.js"]); run("node",["--check","token-control-effects.js"]); run("node",["--check","scripts/test-token-sandbox.js"]);
  run("node",["--test","scripts/test-token-sandbox.js"]);
  run("node",["--test","scripts/test-v2-route-runtime-sequences.js"]);
  run("node",["--test","versions/next-action-phase/tests/test-route-encounter-engine.js"]);
  git(["add","token-effect-contract.js","token-control-effects.js","scripts/test-token-sandbox.js"]); run("git",["diff","--cached","--check"]);
  const names=git(["diff","--cached","--name-only"]).split("\n").filter(Boolean).sort(); const expected=["scripts/test-token-sandbox.js","token-control-effects.js","token-effect-contract.js"].sort(); if(JSON.stringify(names)!==JSON.stringify(expected))throw new Error(`Unexpected staged files: ${names.join(", ")}`);
  console.log(`\n${git(["diff","--cached","--stat"])}`);
  console.log("Retired wheel-era Encounter token contracts, verification claims, resolvers, Honey/Reroll helper runtime, and sandbox coverage removed.");
  console.log("Current Route-native Reroll, Extra Encounter, Repel, and Master Ball remain authoritative; generic activation is blocked.");
  console.log("Quick Ball, Dream Ball, Honey, and Beast Ball remain as blocked concepts pending Route-era rules review.");
  git(["commit","-m","Retire legacy Encounter token contract layer"],true); committed=true; git(["push","origin",BRANCH],true);
  console.log("\nStage 9B complete: legacy Encounter token contract/helper layer removed and pushed.");
}catch(error){ console.error(`\nV1 purge Stage 9B failed safely:\n${error.message}`); if(wrote&&!committed){ try{ for(const [k,p] of Object.entries(PATHS)) if(k!=="app") fs.writeFileSync(p,originals[k],"utf8"); git(["reset","HEAD","--","token-effect-contract.js","token-control-effects.js","scripts/test-token-sandbox.js"]); console.error("Stage 9B files restored because no commit was created."); }catch(e){console.error(`Restore failed: ${e.message}`);} } process.exitCode=1; }
