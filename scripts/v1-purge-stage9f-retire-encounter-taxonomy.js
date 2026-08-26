#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const BRANCH = "audit/purge-v1-runtime";
const APP_REL = "app.js";
const CONTROL_REL = "token-control-effects.js";
const APP_PATH = path.join(ROOT, APP_REL);
const CONTROL_PATH = path.join(ROOT, CONTROL_REL);

function git(args, inherit = false) {
  const out = execFileSync("git", args, { cwd: ROOT, encoding: "utf8", stdio: inherit ? "inherit" : ["ignore", "pipe", "pipe"] });
  return typeof out === "string" ? out.trim() : "";
}
function runNode(args) { execFileSync("node", args, { cwd: ROOT, stdio: "inherit", env: process.env }); }
function count(text, needle) { return text.split(needle).length - 1; }
function mustCount(text, needle, expected, label = needle) {
  const found = count(text, needle);
  if (found !== expected) throw new Error(`${label}: expected ${expected}, found ${found}.`);
}
function replaceOnce(text, from, to, label = from) {
  mustCount(text, from, 1, label);
  return text.replace(from, to);
}
function removeLine(text, line, label = line) {
  const lf = `${line}\n`;
  const crlf = `${line}\r\n`;
  const hits = count(text, lf) + count(text, crlf);
  if (hits !== 1) throw new Error(`${label}: expected exactly one line, found ${hits}.`);
  return text.includes(crlf) ? text.replace(crlf, "") : text.replace(lf, "");
}
function braceEnd(text, open) {
  let depth = 0, mode = "code", escaped = false;
  for (let i = open; i < text.length; i += 1) {
    const c = text[i], n = text[i + 1];
    if (mode === "line") { if (c === "\n") mode = "code"; continue; }
    if (mode === "block") { if (c === "*" && n === "/") { mode = "code"; i += 1; } continue; }
    if (mode !== "code") {
      if (escaped) { escaped = false; continue; }
      if (c === "\\") { escaped = true; continue; }
      if ((mode === "single" && c === "'") || (mode === "double" && c === '"') || (mode === "template" && c === "`")) mode = "code";
      continue;
    }
    if (c === "/" && n === "/") { mode = "line"; i += 1; continue; }
    if (c === "/" && n === "*") { mode = "block"; i += 1; continue; }
    if (c === "'") { mode = "single"; continue; }
    if (c === '"') { mode = "double"; continue; }
    if (c === "`") { mode = "template"; continue; }
    if (c === "{") depth += 1;
    if (c === "}" && --depth === 0) return i + 1;
  }
  throw new Error("Balanced-brace scan reached EOF.");
}
function wholeLineRange(text, start, end) {
  let s = text.lastIndexOf("\n", Math.max(0, start - 1));
  s = s < 0 ? 0 : s + 1;
  if (text.slice(s, start).trim()) s = start;
  let e = end;
  while (e < text.length && (text[e] === " " || text[e] === "\t")) e += 1;
  if (text.startsWith("\r\n", e)) e += 2; else if (text[e] === "\n") e += 1;
  return { s, e };
}
function removeObjectProperty(text, marker, label) {
  mustCount(text, marker, 1, label);
  const start = text.indexOf(marker);
  const open = text.indexOf("{", start);
  let end = braceEnd(text, open);
  // Object.freeze({ ... }) has a closing parenthesis after the object brace.
  if (text[end] === ")") end += 1;
  if (text[end] === ",") end += 1;
  const r = wholeLineRange(text, start, end);
  return text.slice(0, r.s) + text.slice(r.e);
}
function removeIfBlock(text, marker, label) {
  mustCount(text, marker, 1, label);
  const start = text.indexOf(marker);
  const open = text.indexOf("{", start);
  const end = braceEnd(text, open);
  const r = wholeLineRange(text, start, end);
  return text.slice(0, r.s) + text.slice(r.e);
}
function functionRange(text, name) {
  const re = new RegExp(`(?:async\\s+)?function\\s+${name}\\s*\\(`, "g");
  const matches = [...text.matchAll(re)];
  if (matches.length !== 1) throw new Error(`${name}: expected one definition, found ${matches.length}.`);
  const start = matches[0].index;
  const sigClose = text.indexOf(") {", start);
  if (sigClose < 0) throw new Error(`${name}: signature boundary not found.`);
  const open = text.indexOf("{", sigClose);
  const end = braceEnd(text, open);
  return wholeLineRange(text, start, end);
}
function replaceFunction(text, name, body) {
  const r = functionRange(text, name);
  return text.slice(0, r.s) + body.replace(/\n+$/g, "") + "\n\n" + text.slice(r.e).replace(/^\s*\n/, "");
}
function removeFunction(text, name) {
  const r = functionRange(text, name);
  return text.slice(0, r.s) + text.slice(r.e);
}
function normalizeEof(text) { return text.replace(/\r/g, "").replace(/[ \t]+$/gm, "").replace(/\n+$/g, "") + "\n"; }

function ensureSafe(app, control) {
  if (git(["branch", "--show-current"]) !== BRANCH) throw new Error(`Run only on ${BRANCH}.`);
  const status = git(["status", "--porcelain"]);
  if (status) throw new Error(`Working tree must be clean before Stage 9F.\n${status}`);
  for (const marker of [
    "function useV2RouteRerollToken(",
    "function useV2ExtraEncounter(",
    "function applyV2RouteRepel(",
    "function useV2MasterBallOnOpportunity(",
    "function rerollRandomPokemonSession(",
    "function recordPokemonResultTokenUse(",
    'type: "pokemon-result"',
  ]) if (!app.includes(marker)) throw new Error(`Current runtime invariant missing: ${marker}`);
  for (const marker of [
    'type: "encounter-result"',
    "currentEncounterPendingActivity",
    "recordEncounterTokenUse",
    "state.encounterCopyRecords",
    "previousEncounterCopyRecords",
    "undoEncounterActionVisit(undoData)",
  ]) if (app.includes(marker)) throw new Error(`Stage 9D prerequisite failed: ${marker}`);
  if (!control.includes("encounterCopyRecords")) throw new Error("Expected final token-control Encounter-copy snapshot residue was not found.");
}

try {
  let app = fs.readFileSync(APP_PATH, "utf8");
  let control = fs.readFileSync(CONTROL_PATH, "utf8");
  ensureSafe(app, control);

  // Current result-response naming: preserve Reroll, remove the unimplemented Quick Ball response.
  app = replaceOnce(app,
    '    responseTypes: ["encounter-reroll", "steal-encounter"]',
    '    responseTypes: ["pokemon-reroll"]',
    "pokemon-result response types");
  app = replaceOnce(app,
    '    responseTypes: ["encounter-reroll", "steal-encounter"],',
    '    responseTypes: ["pokemon-reroll"],',
    "Pokemon result event response types");
  app = replaceOnce(app,
    '  "encounter-reroll": {\n    id: "encounter-reroll",\n    label: "Reroll Encounter",\n    tokenNames: ["Reroll Token"],\n    description: "Future hook: force a Pokemon result to be rerolled."\n  },',
    '  "pokemon-reroll": {\n    id: "pokemon-reroll",\n    label: "Reroll Pokemon Result",\n    tokenNames: ["Reroll Token"],\n    description: "Reroll an eligible unresolved Pokemon result."\n  },',
    "Reroll response definition");
  app = removeObjectProperty(app, '  "steal-encounter": {', "obsolete Quick Ball response definition");

  // Remove the retired Encounter timing/target type taxonomy. Encounter remains a shop/category
  // concept; it is no longer a special pending-event runtime type.
  app = removeLine(app, '  ENCOUNTER: "encounter",', "Encounter timing category constant");
  app = removeLine(app, '  ENCOUNTER_RESULT: "encounterResult",', "Encounter target category constant");
  // EFFECT_TARGET_TYPES has the same literal key/value; remove the second remaining occurrence.
  if (count(app, '  ENCOUNTER_RESULT: "encounterResult",') !== 1) throw new Error("Encounter target type constant: expected one remaining occurrence after category removal.");
  app = removeLine(app, '  ENCOUNTER_RESULT: "encounterResult",', "Encounter target type constant");
  app = removeLine(app, '  ENCOUNTER_MODIFIER: "encounterModifier"', "Encounter use type constant");
  app = removeLine(app, '  ENCOUNTER_RESULT: "encounterResult",', "Encounter pending-event result constant");
  app = removeLine(app, '  ENCOUNTER_TOKEN: "encounterToken",', "Encounter pending-event token constant");
  app = removeObjectProperty(app, '  [TOKEN_TIMING_CATEGORIES.ENCOUNTER]: Object.freeze({', "Encounter timing defaults");

  // Current token-shop descriptions: describe implemented Route behavior, or clearly mark
  // unresolved Route-era concepts as unavailable instead of advertising retired wheel behavior.
  const shopUpdates = new Map([
    ['    { id: "reroll-token", name: "Reroll", tokenType: "reroll", tier: "Encounter", category: "Encounter", price: 1000, description: "Reroll any wheel result." },', '    { id: "reroll-token", name: "Reroll", tokenType: "reroll", tier: "Encounter", category: "Encounter", price: 1000, description: "Reroll an eligible unresolved Pokemon result." },'],
    ['    { id: "extra-encounter-token", name: "Extra Encounter Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 3500, description: "Use in Action Phase to roll an extra encounter." },', '    { id: "extra-encounter-token", name: "Extra Encounter Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 3500, description: "Gain one additional encounter opportunity on a currently legal Route." },'],
    ['    { id: "repel-token", name: "Repel", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 3500, description: "Remove one Pokemon for every 5 entries on an encounter wheel." },', '    { id: "repel-token", name: "Repel", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 3500, description: "On a Route, suppress five eligible residents of a chosen Battle Tier." },'],
    ['    { id: "quick-ball-token", name: "Quick Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 12500, description: "Release an encounter and steal another player\'s encounter." },', '    { id: "quick-ball-token", name: "Quick Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 12500, description: "Route-era transfer rules pending review. Generic activation is currently unavailable." },'],
    ['    { id: "dream-ball-token", name: "Dream Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 8000, description: "Before an encounter wheel, name almost any ability. The encounter has access to that ability." },', '    { id: "dream-ball-token", name: "Dream Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 8000, description: "Route-era ability-grant rules pending review. Generic activation is currently unavailable." },'],
    ['    { id: "honey-token", name: "Honey", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 7000, description: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter." },', '    { id: "honey-token", name: "Honey", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 7000, description: "Route-era encounter-copy rules pending review. Generic activation is currently unavailable." },'],
    ['    { id: "master-ball-token", name: "Master Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 12500, description: "Choose your encounter. Other players cannot change it." },', '    { id: "master-ball-token", name: "Master Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 12500, description: "Use a pending Route opportunity to choose a known eligible resident." },'],
    ['    { id: "beast-ball-token", name: "Beast Ball", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 8000, description: "Before an encounter wheel, name any move. The encounter has access to that move." },', '    { id: "beast-ball-token", name: "Beast Ball", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 8000, description: "Route-era move-grant rules pending review. Generic activation is currently unavailable." },'],
  ]);
  for (const [from, to] of shopUpdates) app = replaceOnce(app, from, to, `shop token ${from.slice(10, 40)}`);

  // Reroll remains a contextual shared Pokemon-result feature, not an Encounter pending-event type.
  app = replaceOnce(app,
    '    timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,\n    useType: TOKEN_USE_TYPES.ENCOUNTER_MODIFIER,\n    createsPendingEvent: false,\n    requiresPendingEvent: true,\n    requiredPendingType: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT,\n    responseRole: "encounterModifier",\n    livePromptType: "encounterToken",\n    timing: "pending-result",\n    targetType: "pending-random-result",\n    validTargets: ["random-pokemon-result", "encounter-result", "quest-roll"],',
    '    timingCategory: TOKEN_TIMING_CATEGORIES.MANUAL,\n    useType: TOKEN_USE_TYPES.RESPONSE,\n    createsPendingEvent: false,\n    requiresPendingEvent: false,\n    responseRole: "resultModifier",\n    livePromptType: TOKEN_PENDING_EVENT_TYPES.MANUAL_EVENT,\n    timing: "contextual-result",\n    targetType: "manual",\n    validTargets: ["random-pokemon-result", "pokemon-result", "quest-roll"],',
    "Reroll effect timing definition");

  // All Encounter utility metadata is now manual/contextual. Actual implemented Route tokens use
  // their dedicated Route handlers; unresolved concepts remain deliberately blocked by contract.
  const utilityUpdates = new Map([
    ['  "extra-encounter-token": { names: ["Extra Encounter Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Extra Encounter Available", note: "Spend during Action Phase to roll an extra encounter." },', '  "extra-encounter-token": { names: ["Extra Encounter Token"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.MANUAL, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "Resolved directly inside the current Route action." },'],
    ['  "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, choiceLabel: "Pokemon Name", effectType: "log", note: "Remove one Pokemon per 5 entries from Encounter Wheel. Wheel editor hook pending." },', '  "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.MANUAL, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "Resolved directly inside the current Route action." },'],
    ['  "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },', '  "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.MANUAL, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "Route-era transfer rules pending review; generic activation unavailable." },'],
    ['  "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },', '  "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.MANUAL, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "Route-era ability-grant rules pending review; generic activation unavailable." },'],
    ['  "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "At End of Action, copies one immutable completed Encounter result into a new acquisition-ready Encounter without rerolling." },', '  "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.MANUAL, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "Route-era encounter-copy rules pending review; generic activation unavailable." },'],
    ['  "master-ball-token": { names: ["Master Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Master Ball Pending", note: "Choose encounter; cannot be changed by other players." },', '  "master-ball-token": { names: ["Master Ball Token"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.MANUAL, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "Resolved directly inside the current Route action." },'],
    ['  "beast-ball-token": { names: ["Beast Ball"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Beast Ball Pending", note: "Encounter move choice marker." }', '  "beast-ball-token": { names: ["Beast Ball"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.MANUAL, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "Route-era move-grant rules pending review; generic activation unavailable." }'],
  ]);
  for (const [from, to] of utilityUpdates) app = replaceOnce(app, from, to, `utility token ${from.slice(3, 35)}`);

  // The old generic Extra Encounter engine entry is superseded by the current Route handler.
  app = removeObjectProperty(app, '  "extra-encounter-token": Object.freeze({', "old Extra Encounter engine definition");
  app = replaceOnce(app,
    '    timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,\n    timingWindows: [TOKEN_TIMING_WINDOWS.WHEEL_WINDOW, TOKEN_TIMING_WINDOWS.MANUAL_HOST],\n    activationPattern: TOKEN_ACTIVATION_PATTERNS.RESPONSE,\n    persistence: TOKEN_PERSISTENCE_BUCKETS.INSTANT,\n    resolutionPayloads: [TOKEN_RESOLUTION_PAYLOADS.WHEEL, TOKEN_RESOLUTION_PAYLOADS.REPLACEMENT],\n    targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT,\n    targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT,',
    '    timingCategory: TOKEN_TIMING_CATEGORIES.MANUAL,\n    timingWindows: [TOKEN_TIMING_WINDOWS.WHEEL_WINDOW, TOKEN_TIMING_WINDOWS.MANUAL_HOST],\n    activationPattern: TOKEN_ACTIVATION_PATTERNS.RESPONSE,\n    persistence: TOKEN_PERSISTENCE_BUCKETS.INSTANT,\n    resolutionPayloads: [TOKEN_RESOLUTION_PAYLOADS.REPLACEMENT],\n    targetType: EFFECT_TARGET_TYPES.MANUAL,\n    targetScope: EFFECT_TARGET_SCOPES.MANUAL,',
    "Reroll engine definition");

  // The remaining timing engine is current shared infrastructure; remove its historical V1 name.
  mustCount(app, "TOKEN_TIMING_ENGINE_V1_DEFINITIONS", 2, "V1 token timing engine identifier");
  app = app.replaceAll("TOKEN_TIMING_ENGINE_V1_DEFINITIONS", "TOKEN_TIMING_ENGINE_DEFINITIONS");
  mustCount(app, 'source: "engine-v1"', 2, "V1 token timing source tags");
  app = app.replaceAll('source: "engine-v1"', 'source: "engine"');
  mustCount(app, '"token-engine-v1"', 1, "V1 token audit tag");
  app = app.replace('"token-engine-v1"', '"token-engine"');

  // Encounter-category shop metadata now falls back to manual/contextual behavior rather than
  // recreating a hidden Encounter pending-event channel.
  app = replaceOnce(app,
    '  if (key === "reroll") return TOKEN_TIMING_CATEGORIES.ENCOUNTER;\n  if (Object.values(TOKEN_TIMING_CATEGORIES).includes(key)) return key;\n  if (key === "curses") return TOKEN_TIMING_CATEGORIES.CURSE;\n  if (key === "encounters") return TOKEN_TIMING_CATEGORIES.ENCOUNTER;',
    '  if (key === "reroll" || key === "encounter" || key === "encounters") return TOKEN_TIMING_CATEGORIES.MANUAL;\n  if (Object.values(TOKEN_TIMING_CATEGORIES).includes(key)) return key;\n  if (key === "curses") return TOKEN_TIMING_CATEGORIES.CURSE;',
    "token timing category normalization");
  app = removeLine(app, '  if (key === "pending-random-result" || key === "pending-result") return EFFECT_TARGET_TYPES.ENCOUNTER_RESULT;', "pending result target normalization");
  app = removeLine(app, '  if (/encounter|random/.test(key)) return EFFECT_TARGET_TYPES.ENCOUNTER_RESULT;', "encounter/random target normalization");
  app = removeLine(app, '  if (category === TOKEN_TIMING_CATEGORIES.ENCOUNTER) return EFFECT_TARGET_TYPES.ENCOUNTER_RESULT;', "Encounter target inference");
  app = removeLine(app, '  if (targetType === EFFECT_TARGET_TYPES.ENCOUNTER_RESULT) return EFFECT_TARGET_SCOPES.CURRENT_PROMPT;', "Encounter target scope inference");
  app = removeLine(app, '  if (targetType === EFFECT_TARGET_TYPES.ENCOUNTER_RESULT) return EFFECT_TARGET_CATEGORIES.ENCOUNTER_RESULT;', "Encounter target category inference");
  app = removeLine(app, '    [TOKEN_TIMING_CATEGORIES.ENCOUNTER]: "Encounter Token",', "Encounter timing label");
  app = removeLine(app, '    [TOKEN_TIMING_CATEGORIES.ENCOUNTER, "Encounter Token"],', "Encounter timing filter option");
  app = removeLine(app, '    [TOKEN_TIMING_CATEGORIES.ENCOUNTER]: 3,', "Encounter Live sort order");
  app = removeLine(app, '  if (prompt?.pendingEvent && category === TOKEN_TIMING_CATEGORIES.ENCOUNTER) return "Modify";', "Encounter Live action label");
  app = replaceOnce(app,
    '    if ((metadata.timingWindows.includes(TOKEN_TIMING_WINDOWS.WHEEL_WINDOW) || metadata.timingCategory === TOKEN_TIMING_CATEGORIES.ENCOUNTER) && liveResultSessionForActivity(pendingEvent)) {',
    '    if (metadata.timingWindows.includes(TOKEN_TIMING_WINDOWS.WHEEL_WINDOW) && liveResultSessionForActivity(pendingEvent)) {',
    "generic result responder guard");

  // Genericize the remaining Live Referee result predicate and remove the old target form.
  mustCount(app, "liveRefereePromptIsEncounterResult", 2, "Live Encounter result predicate references");
  app = replaceFunction(app, "liveRefereePromptIsEncounterResult", [
    "function liveRefereePromptHasPokemonResult(prompt) {",
    "  const activity = prompt?.pendingEvent;",
    "  return Boolean(prompt?.resultSession || liveResultSessionForActivity(activity));",
    "}",
  ].join("\n"));
  app = app.replace("liveRefereePromptIsEncounterResult(prompt)", "liveRefereePromptHasPokemonResult(prompt)");
  app = removeIfBlock(app, '  if (targetType === EFFECT_TARGET_TYPES.ENCOUNTER_RESULT) {', "old Encounter-result target form");
  mustCount(app, "liveRefereeCurrentEncounterLine", 1, "orphan current Encounter line helper");
  app = removeFunction(app, "liveRefereeCurrentEncounterLine");

  // Remove stale generic Extra Encounter resolver plumbing, now unreachable after Route migration.
  app = removeIfBlock(app, '  if (metadata.resolverId === "extraEncounter") {', "old Extra Encounter resolver guard");
  app = removeLine(app, '  if (definition.resolverId === "extraEncounter") return EFFECT_RESOLUTION_MODES.AUTOMATIC;', "old Extra Encounter resolution mode");

  // Remove the last stale V1 state/audit fields.
  app = removeLine(app, "    encounterSessionId,", "undefined Encounter session undo field");
  app = replaceOnce(app,
    '    "randomPokemonSessions", "delayedEffects", "broughtTeamSnapshots", "postPayoutProcedures",\n    "encounterCopyRecords", "pokemonLog", "banlistHistory"',
    '    "randomPokemonSessions", "delayedEffects", "broughtTeamSnapshots", "postPayoutProcedures",\n    "pokemonLog", "banlistHistory"',
    "orphan Encounter copy collection key");
  control = removeLine(control, "      encounterCopyRecords: state.encounterCopyRecords || []", "token-control snapshot Encounter copies");
  control = removeLine(control, "    state.encounterCopyRecords = clone(saved.encounterCopyRecords || []);", "token-control restore Encounter copies");

  // Genericize the shared Reroll audit record.
  app = replaceOnce(app, 'title: "Reroll replaced an encounter result"', 'title: "Reroll replaced a Pokemon result"', "Reroll audit title");
  app = replaceOnce(app, 'type: "encounter-reroll-token", categories: ["tokens", "pokemon", "encounter"]', 'type: "pokemon-reroll-token", categories: ["tokens", "pokemon"]', "Reroll audit type/categories");
  app = replaceOnce(app, 'tags: ["reroll-token", "encounter-result", resultKind || "result"]', 'tags: ["reroll-token", "pokemon-result", resultKind || "result"]', "Reroll audit tags");

  app = normalizeEof(app);
  control = normalizeEof(control);

  // These are the retired runtime identities Stage 9F owns. Product/category names such as
  // "Extra Encounter Token" and deferred Bulletin/Perk text are intentionally not banned.
  for (const marker of [
    "TOKEN_TIMING_CATEGORIES.ENCOUNTER",
    "TOKEN_USE_TYPES.ENCOUNTER_MODIFIER",
    "TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT",
    "TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_TOKEN",
    "EFFECT_TARGET_TYPES.ENCOUNTER_RESULT",
    "EFFECT_TARGET_CATEGORIES.ENCOUNTER_RESULT",
    '"encounter-result"',
    "encounterSessionId",
    "encounterCopyRecords",
    "TOKEN_TIMING_ENGINE_V1_DEFINITIONS",
    'source: "engine-v1"',
    '"token-engine-v1"',
    '"steal-encounter"',
    '"encounter-reroll"',
    "liveRefereePromptIsEncounterResult",
    "liveRefereeCurrentEncounterLine",
    'resolverId: "extraEncounter"',
    'resolverId === "extraEncounter"',
  ]) if (app.includes(marker) || control.includes(marker)) throw new Error(`Stage 9F contamination survived: ${marker}`);

  // Old wheel text may remain only in rules-review-deferred Bulletin content, never token runtime.
  if (count(app, "Encounter Wheel") > 1) throw new Error(`Unexpected Encounter Wheel production text remains in ${count(app, "Encounter Wheel")} places; expected only deferred Bulletin wording.`);
  for (const marker of [
    "function useV2RouteRerollToken(",
    "function useV2ExtraEncounter(",
    "function applyV2RouteRepel(",
    "function useV2MasterBallOnOpportunity(",
    "function rerollRandomPokemonSession(",
    "function recordPokemonResultTokenUse(",
    "function liveRefereePromptHasPokemonResult(",
    '"pokemon-reroll"',
    "TOKEN_TIMING_ENGINE_DEFINITIONS",
  ]) if (!app.includes(marker)) throw new Error(`Preservation invariant failed: ${marker}`);

  fs.writeFileSync(APP_PATH, app, "utf8");
  fs.writeFileSync(CONTROL_PATH, control, "utf8");

  runNode(["--check", APP_REL]);
  runNode(["--check", CONTROL_REL]);
  runNode(["--test", "scripts/test-token-sandbox.js"]);
  runNode(["--test", "scripts/test-v2-route-runtime-sequences.js"]);
  runNode(["--test", "versions/next-action-phase/tests/test-route-encounter-engine.js"]);

  git(["add", APP_REL, CONTROL_REL]);
  execFileSync("git", ["diff", "--cached", "--check"], { cwd: ROOT, stdio: "inherit" });
  const staged = git(["diff", "--cached", "--stat"]);
  if (!staged) throw new Error("Stage 9F produced no runtime diff.");
  console.log(`\n${staged}`);
  console.log("Retired the special Live Encounter timing/target taxonomy and stale Encounter-result metadata.");
  console.log("Preserved shared Pokemon-result Reroll behavior and all current Route token handlers.");
  console.log("Unresolved Quick Ball, Dream Ball, Honey, and Beast Ball remain visible but explicitly unavailable pending Route-era rules review.");
  git(["commit", "-m", "Retire legacy Encounter timing taxonomy"], true);
  git(["push", "origin", BRANCH], true);
  console.log("\nStage 9F complete: legacy Encounter timing taxonomy retired and pushed.");
} catch (error) {
  console.error(`\nV1 purge Stage 9F failed safely:\n${error.message}`);
  try {
    execFileSync("git", ["reset", "--hard", "HEAD"], { cwd: ROOT, stdio: "ignore" });
    console.error("Stage 9F runtime files restored because no commit was created.");
  } catch {}
  process.exitCode = 1;
}
