#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const ROOT = path.resolve(__dirname, "..");
const BRANCH = "audit/purge-v1-runtime";
function git(args, inherit=false){const out=execFileSync("git",args,{cwd:ROOT,encoding:"utf8",stdio:inherit?"inherit":["ignore","pipe","pipe"]});return typeof out==="string"?out.trim():"";}
function read(rel){return fs.readFileSync(path.join(ROOT,rel),"utf8").replace(/\r/g,"");}
function norm(t){return String(t).replace(/\r/g,"").replace(/[ \t]+$/gm,"").replace(/\n+$/g,"")+"\n";}
function write(rel,t){fs.writeFileSync(path.join(ROOT,rel),norm(t),"utf8");}
function count(t,n){return t.split(n).length-1;}
function need(t,n,e,l=n){const f=count(t,n);if(f!==e)throw new Error(`${l}: expected ${e}, found ${f}.`);}
function rep(t,a,b,l=a){need(t,a,1,l);return t.replace(a,b);}
function reps(t,a,b,e,l=a){need(t,a,e,l);return t.split(a).join(b);}
function line(t,s,e=1,l=s){const n=`${s}\n`;need(t,n,e,l);return t.split(n).join("");}
function braceEnd(t,o){let d=0,m="c",x=false;for(let i=o;i<t.length;i++){const c=t[i],n=t[i+1];if(m==="l"){if(c==="\n")m="c";continue}if(m==="b"){if(c==="*"&&n==="/"){m="c";i++}continue}if(m!=="c"){if(x){x=false;continue}if(c==="\\"){x=true;continue}if((m==="s"&&c==="'")||(m==="d"&&c==='"')||(m==="t"&&c==="`"))m="c";continue}if(c==="/"&&n==="/"){m="l";i++;continue}if(c==="/"&&n==="*"){m="b";i++;continue}if(c==="'"){m="s";continue}if(c==='"'){m="d";continue}if(c==="`"){m="t";continue}if(c==="{")d++;if(c==="}"&&--d===0)return i+1}throw new Error("Unmatched brace");}
function range(t,s,e){let a=t.lastIndexOf("\n",Math.max(0,s-1));a=a<0?0:a+1;while(e<t.length&&/[ \t]/.test(t[e]))e++;if(t[e]===";")e++;if(t[e]==="\n")e++;return{a,e};}
function objProp(t,m,l){need(t,m,1,l);const s=t.indexOf(m),o=t.indexOf("{",s);let e=braceEnd(t,o);if(t[e]===",")e++;const r=range(t,s,e);return t.slice(0,r.a)+t.slice(r.e);}
function testRange(t,title){const m=`test("${title}",`;need(t,m,1,`test ${title}`);const s=t.indexOf(m),ar=t.indexOf("=>",s),o=t.indexOf("{",ar);let e=braceEnd(t,o),cl=t.indexOf(");",e);if(ar<0||o<0||cl<0||cl-e>40)throw new Error(`Bad test boundary: ${title}`);return range(t,s,cl+2);}
function rmTest(t,title){const r=testRange(t,title);return t.slice(0,r.a)+t.slice(r.e);}
function replTest(t,title,v){const r=testRange(t,title);return t.slice(0,r.a)+norm(v)+t.slice(r.e);}
function constObj(t,name,v){const m=`const ${name} = {`;need(t,m,1,`const ${name}`);const s=t.indexOf(m),o=t.indexOf("{",s);let e=braceEnd(t,o);if(t[e]===";")e++;const r=range(t,s,e);return t.slice(0,r.a)+norm(v)+t.slice(r.e);}
function pushEntry(t,id,v){const m=`tokens.push({\n  tokenId: "${id}",`;need(t,m,1,`coverage ${id}`);const s=t.indexOf(m),o=t.indexOf("{",s),e=braceEnd(t,o),cl=t.indexOf(");",e);if(cl<0||cl-e>10)throw new Error(`Bad coverage boundary: ${id}`);const r=range(t,s,cl+2);return t.slice(0,r.a)+norm(v)+t.slice(r.e);}
function absent(t,ns,l){const h=ns.filter(n=>t.includes(n));if(h.length)throw new Error(`${l}: stale markers remain: ${h.join(", ")}`);}
module.exports={fs,path,execFileSync,ROOT,BRANCH,git,read,norm,write,count,need,rep,reps,line,objProp,rmTest,replTest,constObj,pushEntry,absent};
