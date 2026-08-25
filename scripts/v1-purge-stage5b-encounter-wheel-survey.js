#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const EXPECTED_BRANCH = "audit/purge-v1-runtime";
const REPORT_REL = "V1_PURGE_STAGE5B_CONTEXT.md";
const REPORT_PATH = path.join(ROOT, REPORT_REL);

function git(args, { inherit = false } = {}) {
  const result = execFileSync("git", args, {
    cwd: ROOT,
    encoding: "utf8",
    stdio: inherit ? "inherit" : ["ignore", "pipe", "pipe"],
  });
  return typeof result === "string" ? result.trim() : "";
}

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}

function lineNumber(text, index) {
  return text.slice(0, index).split("\n").length;
}

function count(text, needle) {
  return text.split(needle).length - 1;
}

function allContexts(text, needle, radius = 5, max = 80) {
  const lines = text.split("\n");
  const hits = [];
  let from = 0;
  while (hits.length < max) {
    const index = text.indexOf(needle, from);
    if (index < 0) break;
    hits.push(index);
    from = index + Math.max(1, needle.length);
  }
  const out = [`Occurrences: ${hits.length}${hits.length === max ? "+" : ""}`];
  for (const [i, index] of hits.entries()) {
    const line = lineNumber(text, index);
    const start = Math.max(1, line - radius);
    const end = Math.min(lines.length, line + radius);
    out.push(`\n#### Hit ${i + 1} — line ${line}\n\n\`\`\`text`);
    for (let n = start; n <= end; n += 1) out.push(`${String(n).padStart(6, " ")} | ${lines[n - 1]}`);
    out.push("```");
  }
  return out.join("\n");
}

function skipQuotedOrComment(text, i, state) {
  const ch = text[i];
  const next = text[i + 1];
  if (state.mode === "line-comment") {
    if (ch === "\n") state.mode = "code";
    return i;
  }
  if (state.mode === "block-comment") {
    if (ch === "*" && next === "/") {
      state.mode = "code";
      return i + 1;
    }
    return i;
  }
  if (state.mode === "single" || state.mode === "double") {
    if (ch === "\\") return i + 1;
    if ((state.mode === "single" && ch === "'") || (state.mode === "double" && ch === '"')) state.mode = "code";
    return i;
  }
  if (state.mode === "template") {
    if (ch === "\\") return i + 1;
    if (ch === "`" && state.templateExprDepth === 0) {
      state.mode = "code";
      return i;
    }
    if (ch === "$" && next === "{") {
      state.templateExprDepth += 1;
      return i + 1;
    }
    if (ch === "}" && state.templateExprDepth > 0) state.templateExprDepth -= 1;
    return i;
  }
  if (ch === "/" && next === "/") {
    state.mode = "line-comment";
    return i + 1;
  }
  if (ch === "/" && next === "*") {
    state.mode = "block-comment";
    return i + 1;
  }
  if (ch === "'") state.mode = "single";
  else if (ch === '"') state.mode = "double";
  else if (ch === "`") {
    state.mode = "template";
    state.templateExprDepth = 0;
  }
  return i;
}

function matchingDelimiter(text, openIndex, openChar, closeChar) {
  let depth = 0;
  const state = { mode: "code", templateExprDepth: 0 };
  for (let i = openIndex; i < text.length; i += 1) {
    const before = state.mode;
    i = skipQuotedOrComment(text, i, state);
    if (before !== "code" || state.mode !== "code") continue;
    const ch = text[i];
    if (ch === openChar) depth += 1;
    else if (ch === closeChar) {
      depth -= 1;
      if (depth === 0) return i;
    }
  }
  throw new Error(`Could not match ${openChar}${closeChar} from line ${lineNumber(text, openIndex)}.`);
}

function functionSource(text, name) {
  const asyncMarker = `async function ${name}`;
  const syncMarker = `function ${name}`;
  let start = text.indexOf(asyncMarker);
  if (start < 0) start = text.indexOf(syncMarker);
  if (start < 0) return null;
  const nameStart = text.indexOf(name, start);
  const paramsOpen = text.indexOf("(", nameStart + name.length);
  if (paramsOpen < 0) throw new Error(`Missing parameter list for ${name}.`);
  const paramsClose = matchingDelimiter(text, paramsOpen, "(", ")");
  const bodyOpen = text.indexOf("{", paramsClose + 1);
  if (bodyOpen < 0) throw new Error(`Missing body for ${name}.`);
  const bodyClose = matchingDelimiter(text, bodyOpen, "{", "}");
  return text.slice(start, bodyClose + 1);
}

function declarationSource(text, name) {
  const candidates = [`const ${name} =`, `let ${name} =`, `var ${name} =`];
  let start = -1;
  for (const marker of candidates) {
    const index = text.indexOf(marker);
    if (index >= 0 && (start < 0 || index < start)) start = index;
  }
  if (start < 0) return null;
  const state = { mode: "code", templateExprDepth: 0 };
  let paren = 0;
  let bracket = 0;
  let brace = 0;
  for (let i = start; i < text.length; i += 1) {
    const before = state.mode;
    i = skipQuotedOrComment(text, i, state);
    if (before !== "code" || state.mode !== "code") continue;
    const ch = text[i];
    if (ch === "(") paren += 1;
    else if (ch === ")") paren -= 1;
    else if (ch === "[") bracket += 1;
    else if (ch === "]") bracket -= 1;
    else if (ch === "{") brace += 1;
    else if (ch === "}") brace -= 1;
    else if (ch === ";" && paren === 0 && bracket === 0 && brace === 0) return text.slice(start, i + 1);
  }
  throw new Error(`Could not terminate declaration ${name}.`);
}

function ensureSafe() {
  const branch = git(["branch", "--show-current"]);
  if (branch !== EXPECTED_BRANCH) throw new Error(`Refusing to run on ${branch || "detached HEAD"}.`);
  const status = git(["status", "--porcelain"]);
  if (status) throw new Error(`Working tree must be clean before Stage 5B survey.\n${status}`);
}

function main() {
  ensureSafe();
  const head = git(["rev-parse", "HEAD"]);
  const app = read("app.js");
  const index = read("index.html");
  const styles = read("styles.css");

  if (fs.existsSync(path.join(ROOT, "encounter-token-runtime.js"))) throw new Error("Stage 5A invariant failed: encounter-token-runtime.js still exists.");
  for (const marker of ["encounterTokenRuntime", "rivalSagaEncounterTokenRuntime"]) {
    if (app.includes(marker)) throw new Error(`Stage 5A invariant failed: ${marker} remains in app.js.`);
  }
  for (const marker of [
    "const V2_ROUTE_TOKEN_IDS",
    "function useV2RouteRerollToken(",
    "function useV2ExtraEncounter(",
    "function applyV2RouteRepel(",
    "function useV2MasterBallOnOpportunity(",
  ]) {
    if (!app.includes(marker)) throw new Error(`Current Route invariant missing: ${marker}`);
  }

  const functionNames = [
    "encounterWheelKey",
    "encounterWheelDefinition",
    "pendingEncounterSessions",
    "selectedEncounterSession",
    "encounterEntriesForSession",
    "weightedEncounterEntry",
    "buildEncounterWheelSegments",
    "getEncounterSegmentAtPointer",
    "updateEncounterLivePointerDisplay",
    "animateEncounterLivePointer",
    "resolveEncounterSpecialResult",
    "encounterEntryCenterDegrees",
    "nextEncounterLandingRotation",
    "encounterRollFreeRerollReason",
    "pendingRandomPokemonSessions",
    "rerollRandomPokemonResult",
    "selectedRandomPokemonSession",
    "createRandomPokemonSession",
    "createEncounterPokemonResultSession",
    "hydrateEncounterRollSprite",
    "encounterRollWasObtained",
    "encounterSessionReadyForAutomaticCompletion",
    "completeObtainedEncounterSession",
    "addEncounterRollToRoster",
    "rerollEncounterRoll",
    "confirmRandomPokemonSession",
    "rerollRandomPokemonSession",
    "cancelRandomPokemonSession",
    "updateEncounterActionLog",
    "activeEncounterSessionForPlayer",
    "startEncounterSession",
    "renderRandomPokemonPanel",
    "completeEncounterRoll",
    "spinEncounterWheel",
    "closeEncounterSession",
    "renderEncounterOverlay",
    "renderWheelPanel",
    "cancelCurrentGymWheelSessionsForPlayers",
    "honeyEligibleEncounterResults",
    "reverseWheelSessionsForActionVisit",
    "undoEncounterActionVisit",
  ];

  const declarationNames = [
    "normalizeEncounterEntryId",
    "encounterEntry",
    "makeEncounterWheel",
    "starterWheelDefinitions",
    "hyperspaceWheelDefinitions",
    "encounterWheelDefinitions",
    "ENCOUNTER_POINTER_ANGLE_DEGREES",
  ];

  const occurrenceNeedles = [
    "encounterSessions",
    "selectedEncounterSessionId",
    "encounterModalOpen",
    "encounterOverlay",
    "encounterTab",
    "includeFishing",
    "includeSurf",
    "encounterWheelDefinitions",
    "encounterWheelDefinition(",
    "startEncounterSession(",
    "spinEncounterWheel(",
    "closeEncounterSession(",
    "renderEncounterOverlay(",
    "data-encounter",
    "undoEncounterActionVisit(",
    'featureType: "encounter"',
    '"encounter": state.encounterSessions',
  ];

  const sections = [
    "# V1 Purge Stage 5B Focused Encounter Wheel Context",
    "",
    `Generated from \`${head}\` after Stage 5A.`,
    "",
    "This report intentionally separates the retired Encounter Wheel/session UI from shared Random Pokemon and token-effect helpers.",
    "",
    "## Occurrence contexts",
  ];

  for (const needle of occurrenceNeedles) {
    sections.push(`\n### ${needle}\n\n${allContexts(app, needle, 5)}\n`);
  }

  sections.push("\n## Function inventory and source\n");
  sections.push("| Function | Refs | Source chars |\n|---|---:|---:|");
  const functionRows = [];
  for (const name of functionNames) {
    const source = functionSource(app, name);
    functionRows.push({ name, source, refs: count(app, name) });
    sections.push(`| \`${name}\` | ${count(app, name)} | ${source ? source.length : 0} |`);
  }
  sections.push("");
  for (const row of functionRows) {
    sections.push(`\n### Function ${row.name}\n`);
    sections.push(row.source ? `\`\`\`javascript\n${row.source}\n\`\`\`` : "_Not found._");
  }

  sections.push("\n## Declaration inventory and source\n");
  sections.push("| Declaration | Refs | Source chars |\n|---|---:|---:|");
  const declarationRows = [];
  for (const name of declarationNames) {
    const source = declarationSource(app, name);
    declarationRows.push({ name, source, refs: count(app, name) });
    sections.push(`| \`${name}\` | ${count(app, name)} | ${source ? source.length : 0} |`);
  }
  sections.push("");
  for (const row of declarationRows) {
    sections.push(`\n### Declaration ${row.name}\n`);
    sections.push(row.source ? `\`\`\`javascript\n${row.source}\n\`\`\`` : "_Not found._");
  }

  sections.push("\n## index.html Encounter UI contexts\n");
  for (const needle of ["encounterTab", "encounterOverlay", "Encounter Wheel"]) {
    sections.push(`\n### ${needle}\n\n${allContexts(index, needle, 10)}\n`);
  }

  sections.push("\n## styles.css Encounter UI contexts\n");
  for (const needle of [".encounter-tab", ".encounter-overlay", ".encounter-modal", ".encounter-wheel", ".encounter-pointer"]) {
    sections.push(`\n### ${needle}\n\n${allContexts(styles, needle, 8)}\n`);
  }

  fs.writeFileSync(REPORT_PATH, `${sections.join("\n")}\n`, "utf8");
  git(["add", REPORT_REL]);
  git(["commit", "-m", "Capture focused Encounter Wheel purge boundaries"], { inherit: true });
  git(["push", "origin", EXPECTED_BRANCH], { inherit: true });
  console.log(`\nStage 5B survey complete: wrote and pushed ${REPORT_REL}.`);
}

try {
  main();
} catch (error) {
  console.error(`\nV1 purge Stage 5B survey failed safely:\n${error.message}`);
  process.exitCode = 1;
}
