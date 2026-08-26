#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const BRANCH = "audit/purge-v1-runtime";
const APP_PATH = path.join(ROOT, "app.js");
const SERVER_PATH = path.join(ROOT, "server.js");

function git(args, inherit = false) {
  const out = execFileSync("git", args, { cwd: ROOT, encoding: "utf8", stdio: inherit ? "inherit" : ["ignore", "pipe", "pipe"] });
  return typeof out === "string" ? out.trim() : "";
}
function count(text, needle) { return text.split(needle).length - 1; }
function mustCount(text, needle, expected, label = needle) {
  const found = count(text, needle);
  if (found !== expected) throw new Error(`${label}: expected ${expected}, found ${found}.`);
}
function replaceOnce(text, from, to, label) {
  mustCount(text, from, 1, label);
  return text.replace(from, to);
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
  throw new Error("Unmatched function brace.");
}
function functionRange(text, name) {
  const re = new RegExp(`(?:async\\s+)?function\\s+${name}\\s*\\(`, "g");
  const matches = [...text.matchAll(re)];
  if (matches.length !== 1) throw new Error(`${name}: expected exactly one function, found ${matches.length}.`);
  const start = matches[0].index;
  const sigClose = text.indexOf(") {", start);
  if (sigClose < 0) throw new Error(`${name}: body boundary not found.`);
  const open = text.indexOf("{", sigClose);
  let end = braceEnd(text, open);
  if (text[end] === ";") end += 1;
  if (text[end] === "\r") end += 1;
  if (text[end] === "\n") end += 1;
  return { start, end };
}
function replaceFunction(text, name, replacement) {
  const { start, end } = functionRange(text, name);
  return text.slice(0, start) + replacement.replace(/\n+$/g, "") + "\n\n" + text.slice(end).replace(/^\s*\n/, "");
}
function removeLineContaining(text, marker, expected = 1) {
  const re = new RegExp(`^.*${marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}.*\\r?\\n`, "gm");
  const matches = text.match(re) || [];
  if (matches.length !== expected) throw new Error(`${marker}: expected ${expected} matching lines, found ${matches.length}.`);
  return text.replace(re, "");
}
function normalizeEof(text) { return text.replace(/\r/g, "").replace(/[ \t]+$/gm, "").replace(/\n+$/g, "") + "\n"; }
function runNode(args) { execFileSync("node", args, { cwd: ROOT, stdio: "inherit", env: process.env }); }

function ensureSafe(app, server) {
  if (git(["branch", "--show-current"]) !== BRANCH) throw new Error(`Run only on ${BRANCH}.`);
  const status = git(["status", "--porcelain"]);
  if (status) throw new Error(`Working tree must be clean before Stage 9D.\n${status}`);
  for (const marker of [
    "function renderActionPhase() {\n  renderV2RouteActionPhase();\n}",
    "function useV2RouteRerollToken(",
    "function useV2ExtraEncounter(",
    "function applyV2RouteRepel(",
    "function useV2MasterBallOnOpportunity(",
    "function rerollRandomPokemonSession(",
    "randomPokemonSessions: []",
  ]) if (!app.includes(marker)) throw new Error(`Current runtime invariant missing: ${marker}`);
  for (const marker of ["state.encounterSessions", "function startEncounterSession(", "function renderEncounterOverlay(", "function undoEncounterActionVisit("]) {
    if (app.includes(marker)) throw new Error(`Previous Encounter runtime purge invariant failed: ${marker}`);
  }
  for (const marker of ['resolverId: "encounterWheelEdit"', 'resolverId: "encounterTransfer"', 'resolverId: "encounterGrant"', 'resolverId: "encounterCopy"', 'resolverId: "encounterChoose"']) {
    const contract = fs.readFileSync(path.join(ROOT, "token-effect-contract.js"), "utf8");
    if (contract.includes(marker)) throw new Error(`Stage 9B contract prerequisite failed: ${marker}`);
  }
  if (!server.includes("previousEncounterCopyRecords")) throw new Error("Expected orphan server Encounter-copy rollback field was not found.");
}

try {
  let app = fs.readFileSync(APP_PATH, "utf8");
  let server = fs.readFileSync(SERVER_PATH, "utf8");
  ensureSafe(app, server);

  // Normalize the shared Random Pokemon pending-result event. The current result drawer/reroll
  // infrastructure is shared by Game Corner and other systems, so preserve it and remove only
  // the retired Encounter-specific event identity and payload fields.
  app = replaceOnce(app,
    '  const isEncounter = session.sourceType === "encounter";\n',
    "",
    "createPokemonResultTimingWindow Encounter source switch");
  app = replaceOnce(app,
    '    type: isEncounter ? "encounter-result" : "pokemon-result",',
    '    type: "pokemon-result",',
    "createPokemonResultTimingWindow event type");
  app = removeLineContaining(app, 'encounterSessionId: session.encounterSessionId || "",');
  app = removeLineContaining(app, 'encounterRollId: session.encounterRollId || "",');

  app = replaceOnce(app,
    '    || (/pokemon-result|encounter-result/.test(activity.type || "") ? activity.sourceId : "");',
    '    || (activity.type === "pokemon-result" ? activity.sourceId : "");',
    "live result-session fallback");
  app = removeLineContaining(app, 'if (activity.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT || activity.type === "encounter-result") return TOKEN_TIMING_CATEGORIES.ENCOUNTER;');

  // Keep the shared response IDs for now (Reroll/Quick Ball rules are a separate current-rules
  // review), but stop advertising a V1 Encounter-specific event type.
  const encounterResultRule = `  encounterResult: {\n    label: "Encounter Result",\n    responseTypes: ["encounter-reroll", "steal-encounter"]\n  },\n`;
  const encounterResultStringRule = `  "encounter-result": {\n    label: "Encounter Result",\n    responseTypes: ["encounter-reroll", "steal-encounter"]\n  }\n`;
  app = replaceOnce(app, encounterResultRule, "", "activityResponseRules encounterResult alias");
  app = replaceOnce(app, encounterResultStringRule, "", "activityResponseRules encounter-result alias");
  app = replaceOnce(app,
    `  "pokemon-result": {\n    label: "Pokemon Result",\n    responseTypes: ["encounter-reroll", "steal-encounter"]\n  },\n`,
    `  "pokemon-result": {\n    label: "Pokemon Result",\n    responseTypes: ["encounter-reroll", "steal-encounter"]\n  }\n`,
    "activityResponseRules trailing comma");

  // Genericize the Live Referee prompt while preserving the shared Pokemon-result flow.
  app = replaceOnce(app,
    '  if (resultSession || activity?.type === "encounter-result" || activity?.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT) {',
    '  if (resultSession) {',
    "liveTokenPromptDetails result condition");
  app = replaceOnce(app, '    const resultName = resultSession?.resultDisplayName || activity?.payload?.resultName || "an encounter";', '    const resultName = resultSession?.resultDisplayName || activity?.payload?.resultName || "a Pokemon result";', "Live result fallback name");
  app = replaceOnce(app, '      type: "encounter-result-pending",', '      type: "pokemon-result-pending",', "Live result prompt type");
  app = replaceOnce(app, '      title: "Encounter Result Pending",', '      title: "Pokemon Result Pending",', "Live result prompt title");
  app = replaceOnce(app,
    '      body: `${resultOwner?.name || actor?.name || "A player"} rolled ${resultName}. Encounter modifiers, rerolls, responses, and trades may happen before this result is finalized.`,',
    '      body: `${resultOwner?.name || actor?.name || "A player"} rolled ${resultName}. Legal rerolls, responses, and trades may happen before this result is finalized.`,',
    "Live result prompt body");
  app = replaceOnce(app,
    '      helperText: "Use Encounter Tokens during this window, trade, record No Response, then finalize the result."',
    '      helperText: "Use any legal result response during this window, trade, record No Response, then finalize the result."',
    "Live result prompt helper");
  app = removeLineContaining(app, 'const isEncounterResult = Boolean(resultSession?.sourceType === "encounter" || pendingEvent.type === "encounter-result");');
  app = replaceOnce(app,
    '        type: tokenPrompt?.type || (isEncounterResult ? "encounter-result-pending" : "pokemon-result-pending"),',
    '        type: tokenPrompt?.type || "pokemon-result-pending",',
    "current Live prompt result type");

  // Replace the V1 Encounter-token recorder with a generic Pokemon-result responder. Reroll is
  // current/shared. Other old Encounter modifiers fail closed until their Route/current rules
  // are explicitly implemented.
  app = replaceFunction(app, "currentEncounterPendingActivity", `function currentPokemonResultPendingActivity() {
  const activity = getCurrentPendingEvent();
  if (!activity || activity.status !== "open") return null;
  return liveResultSessionForActivity(activity) ? activity : null;
}`);
  app = replaceFunction(app, "recordEncounterTokenUse", `async function recordPokemonResultTokenUse(draft) {
  const activity = currentPokemonResultPendingActivity();
  if (!activity) {
    alert("This Token is used from a pending Pokemon result window.");
    return null;
  }
  if (!tokenNameIsReroll(draft.tokenName)) {
    alert(`${draft.tokenName || "This Token"} is not supported from the generic Pokemon result window. Route Encounter Tokens are used from Routes.`);
    return null;
  }
  const session = liveResultSessionForActivity(activity);
  if (!session) {
    alert("The pending Pokemon result is no longer available.");
    return null;
  }
  await rerollRandomPokemonSession(session.id, { actorPlayerId: draft.actorPlayerId });
  return activity;
}`);
  mustCount(app, "recordEncounterTokenUse", 1, "recordEncounterTokenUse remaining call");
  app = app.replace("recordEncounterTokenUse(draft)", "recordPokemonResultTokenUse(draft)");
  if (app.includes("currentEncounterPendingActivity") || app.includes("recordEncounterTokenUse")) throw new Error("Old Encounter result recorder names survived migration.");

  // Only route result-oriented tokens to the generic result responder when there is an actual
  // current Random Pokemon result. Manual Encounter events are no longer a supported runtime.
  app = replaceOnce(app,
    '    if (metadata.timingWindows.includes(TOKEN_TIMING_WINDOWS.WHEEL_WINDOW) || metadata.timingCategory === TOKEN_TIMING_CATEGORIES.ENCOUNTER) {\n      return recordPokemonResultTokenUse(draft);\n    }',
    '    if ((metadata.timingWindows.includes(TOKEN_TIMING_WINDOWS.WHEEL_WINDOW) || metadata.timingCategory === TOKEN_TIMING_CATEGORIES.ENCOUNTER) && liveResultSessionForActivity(pendingEvent)) {\n      return recordPokemonResultTokenUse(draft);\n    }',
    "resolveTokenUse result responder guard");

  // Remove custom V1 encounterBeforeRoll/encounterResult timing-window aliases while preserving
  // the generic shared wheel window used by current Random Pokemon rerolls.
  app = replaceOnce(app,
    '    if (resultSession || /encounter-result|pokemon-result/i.test(pendingKind)) {\n      windows.add("encounterResult");\n      windows.add(TOKEN_TIMING_WINDOWS.WHEEL_WINDOW);\n    } else if (pendingEvent.payload?.encounterStage === "beforeRoll" || /encounter-before|wheel-before/i.test(pendingKind)) {\n      windows.add("encounterBeforeRoll");\n    } else if (/wheel/i.test(pendingKind)) {',
    '    if (resultSession || /pokemon-result/i.test(pendingKind)) {\n      windows.add(TOKEN_TIMING_WINDOWS.WHEEL_WINDOW);\n    } else if (/wheel/i.test(pendingKind)) {',
    "token timing V1 Encounter aliases");
  app = removeLineContaining(app, 'if (context.encounterBeforeRoll) windows.add("encounterBeforeRoll");');
  app = removeLineContaining(app, 'if (context.encounterResult) windows.add("encounterResult");');

  // Manual/admin V1 Encounter windows are no longer valid Live Referee scenarios.
  app = removeLineContaining(app, '[TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT, "Encounter"],');
  app = removeLineContaining(app, '[TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT, "Encounter Result"],');
  app = replaceOnce(app,
    '  const finalEventType = timingWindow === TOKEN_PENDING_EVENT_TYPES.TEAM_LOCK_WINDOW\n    ? TOKEN_PENDING_EVENT_TYPES.TEAM_LOCK_WINDOW\n    : timingWindow === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT\n      ? TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT\n      : eventType;',
    '  const finalEventType = timingWindow === TOKEN_PENDING_EVENT_TYPES.TEAM_LOCK_WINDOW\n    ? TOKEN_PENDING_EVENT_TYPES.TEAM_LOCK_WINDOW\n    : eventType;',
    "manual Live Encounter timing coercion");
  app = replaceOnce(app,
    '  } else if (kind === "encounterBefore") {\n    activity = createTokenScenarioEvent({ actor, target, title: `${actor.name}\'s encounter is about to begin.`, message: "Choose before-roll Encounter effects now.", type: "encounter-before-roll", targeted: false, payload: { encounterStage: "beforeRoll" } });\n  } else if (kind === "encounterResult") {\n    activity = createTokenScenarioEvent({ actor, target, title: `${actor.name} rolled Abra.`, message: `${actor.name} rolled Abra. The result is pending.`, type: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT, targeted: false, payload: { encounterStage: "result", resultName: "Abra" } });\n',
    "",
    "admin Encounter scenario branches");

  // Remove the admin Encounter preset object using brace-aware boundaries.
  {
    const marker = "    encounter: {";
    mustCount(app, marker, 1, "admin Encounter preset");
    const start = app.indexOf(marker);
    const open = app.indexOf("{", start);
    let end = braceEnd(app, open);
    if (app[end] === ",") end += 1;
    if (app[end] === "\r") end += 1;
    if (app[end] === "\n") end += 1;
    app = app.slice(0, start) + app.slice(end);
  }

  // Honey's old encounter-copy runtime is gone, so its dedicated state/undo buckets are now
  // unreachable. Remove them from client and server rollback state.
  const appEncounterCopyMarkers = [
    "    encounterCopyRecords: [],",
    "    previousEncounterCopyRecords: structuredClone(state.encounterCopyRecords || [])",
    "    encounterCopyRecords: causalIdCollectionDelta(snapshot.previousEncounterCopyRecords, state.encounterCopyRecords),",
    "  state.encounterCopyRecords = applyCausalIdCollectionUndo(state.encounterCopyRecords, undoData.encounterCopyRecords);",
    "    encounterCopyRecords: structuredClone(state.encounterCopyRecords || []),",
    "  if (undoData.previousEncounterCopyRecords) state.encounterCopyRecords = structuredClone(undoData.previousEncounterCopyRecords);",
    "    if (previous.encounterCopyRecords) state.encounterCopyRecords = structuredClone(previous.encounterCopyRecords);",
  ];
  for (const marker of appEncounterCopyMarkers) app = removeLineContaining(app, marker);
  // Normalization may use nextState rather than state.
  const normalizeMarker = "nextState.encounterCopyRecords";
  const normalizeLines = app.split(/\r?\n/).filter((line) => line.includes(normalizeMarker));
  if (normalizeLines.length > 1) throw new Error(`Unexpected Encounter-copy normalization shape: ${normalizeLines.length} lines.`);
  if (normalizeLines.length === 1) app = removeLineContaining(app, normalizeLines[0].trim());
  server = removeLineContaining(server, "previousEncounterCopyRecords: cloneJson(state.encounterCopyRecords || [])");

  // Remove the dead V1 Action undo dispatch which calls a function deleted in Stage 5C.
  app = replaceOnce(app,
    '    } else if (undoData.locationId === "encounter" || undoData.encounterSessionId) {\n      undoEncounterActionVisit(undoData);\n    } else {',
    '    } else {',
    "dead Encounter Action undo dispatch");

  app = normalizeEof(app);
  server = normalizeEof(server);

  // Fail closed on the V1 runtime names this stage owns, while explicitly allowing current Route
  // encounterResults data and unresolved token taxonomy for the next bounded audit.
  for (const marker of [
    'type: "encounter-result"',
    'activity.type === "encounter-result"',
    "currentEncounterPendingActivity",
    "recordEncounterTokenUse",
    "encounterBeforeRoll",
    'kind === "encounterBefore"',
    'kind === "encounterResult"',
    "state.encounterCopyRecords",
    "previousEncounterCopyRecords",
    "undoEncounterActionVisit(undoData)",
  ]) if (app.includes(marker)) throw new Error(`Stage 9D app contamination survived: ${marker}`);
  if (server.includes("encounterCopyRecords") || server.includes("previousEncounterCopyRecords")) throw new Error("Stage 9D server Encounter-copy rollback residue survived.");
  for (const marker of [
    "function useV2RouteRerollToken(",
    "function useV2ExtraEncounter(",
    "function applyV2RouteRepel(",
    "function useV2MasterBallOnOpportunity(",
    "function rerollRandomPokemonSession(",
    'type: "pokemon-result"',
    "function recordPokemonResultTokenUse(",
  ]) if (!app.includes(marker)) throw new Error(`Preservation invariant failed after patch: ${marker}`);

  fs.writeFileSync(APP_PATH, app, "utf8");
  fs.writeFileSync(SERVER_PATH, server, "utf8");

  runNode(["--check", "app.js"]);
  runNode(["--check", "server.js"]);
  runNode(["--test", "scripts/test-token-sandbox.js"]);
  runNode(["--test", "scripts/test-v2-route-runtime-sequences.js"]);
  runNode(["--test", "scripts/test-v2-route-engine.js"]);

  git(["add", "app.js", "server.js"]);
  execFileSync("git", ["diff", "--cached", "--check"], { cwd: ROOT, stdio: "inherit" });
  const staged = git(["diff", "--cached", "--stat"]);
  if (!staged) throw new Error("Stage 9D produced no runtime diff.");
  console.log(`\n${staged}`);
  console.log("Normalized shared pending Random Pokemon results to one current pokemon-result Live Referee path.");
  console.log("Preserved shared Reroll runtime and all four current Route token handlers.");
  console.log("Removed old manual/admin Encounter windows, orphan Encounter-copy rollback state, and dead V1 Action undo dispatch.");
  git(["commit", "-m", "Normalize Live Pokemon result runtime"], true);
  git(["push", "origin", BRANCH], true);
  console.log("\nStage 9D complete: Live Pokemon-result runtime normalized and pushed.");
} catch (error) {
  console.error(`\nV1 purge Stage 9D failed safely:\n${error.message}`);
  try {
    execFileSync("git", ["reset", "--hard", "HEAD"], { cwd: ROOT, stdio: "ignore" });
    console.error("Stage 9D runtime files restored because no commit was created.");
  } catch {}
  process.exitCode = 1;
}
