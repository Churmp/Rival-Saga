#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const EXPECTED_BRANCH = "audit/purge-v1-runtime";
const APP_PATH = path.join(ROOT, "app.js");
const INDEX_PATH = path.join(ROOT, "index.html");

function git(args, { inherit = false } = {}) {
  const result = execFileSync("git", args, {
    cwd: ROOT,
    encoding: "utf8",
    stdio: inherit ? "inherit" : ["ignore", "pipe", "pipe"],
  });
  return typeof result === "string" ? result.trim() : "";
}

function count(text, needle) {
  return text.split(needle).length - 1;
}

function requireCount(text, needle, expected, label = needle) {
  const actual = count(text, needle);
  if (actual !== expected) {
    throw new Error(`Expected ${expected} occurrence(s) of ${label}; found ${actual}. Refusing to guess.`);
  }
}

function requireMarkers(text, markers, label) {
  const missing = markers.filter((marker) => !text.includes(marker));
  if (missing.length) throw new Error(`${label}: ${missing.join(", ")}`);
}

function replaceExactOnce(text, oldValue, newValue = "", label = oldValue) {
  requireCount(text, oldValue, 1, label);
  return text.replace(oldValue, newValue);
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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
    if (ch === "$" && next === "{") {
      state.templateExprDepth += 1;
      return i + 1;
    }
    if (ch === "}" && state.templateExprDepth > 0) {
      state.templateExprDepth -= 1;
      return i;
    }
    if (ch === "`" && state.templateExprDepth === 0) state.mode = "code";
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
  throw new Error(`Could not match ${openChar}${closeChar} beginning at offset ${openIndex}.`);
}

function functionRange(text, name) {
  const pattern = new RegExp(`(^|\\n)(?:async\\s+)?function\\s+${escapeRegExp(name)}\\s*\\(`, "g");
  const matches = [...text.matchAll(pattern)];
  if (matches.length !== 1) {
    throw new Error(`Expected exactly one function declaration for ${name}; found ${matches.length}.`);
  }
  const prefixLength = matches[0][1] ? matches[0][1].length : 0;
  const start = matches[0].index + prefixLength;
  const paramsOpen = text.indexOf("(", start);
  if (paramsOpen < 0) throw new Error(`Missing parameter list for ${name}.`);
  const paramsClose = matchingDelimiter(text, paramsOpen, "(", ")");
  const bodyOpen = text.indexOf("{", paramsClose + 1);
  if (bodyOpen < 0) throw new Error(`Missing body for ${name}.`);
  const bodyClose = matchingDelimiter(text, bodyOpen, "{", "}");
  let end = bodyClose + 1;
  if (text[end] === "\r" && text[end + 1] === "\n") end += 2;
  else if (text[end] === "\n") end += 1;
  if (text[end] === "\r" && text[end + 1] === "\n") end += 2;
  else if (text[end] === "\n") end += 1;
  return { start, end };
}

function removeFunction(text, name) {
  const { start, end } = functionRange(text, name);
  return text.slice(0, start) + text.slice(end);
}

function functionSource(text, name) {
  const { start, end } = functionRange(text, name);
  let source = text.slice(start, end);
  source = source.replace(/(?:\r?\n){1,2}$/, "");
  return source;
}

function replaceFunctionSource(text, name, source) {
  const { start, end } = functionRange(text, name);
  return text.slice(0, start) + `${source}\n\n` + text.slice(end);
}

function declarationRange(text, name) {
  const candidates = [`const ${name} =`, `let ${name} =`, `var ${name} =`];
  const hits = [];
  for (const marker of candidates) {
    let from = 0;
    while (true) {
      const index = text.indexOf(marker, from);
      if (index < 0) break;
      hits.push(index);
      from = index + marker.length;
    }
  }
  if (hits.length !== 1) throw new Error(`Expected exactly one declaration for ${name}; found ${hits.length}.`);
  const start = hits[0];
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
    else if (ch === ";" && paren === 0 && bracket === 0 && brace === 0) {
      let end = i + 1;
      if (text[end] === "\r" && text[end + 1] === "\n") end += 2;
      else if (text[end] === "\n") end += 1;
      if (text[end] === "\r" && text[end + 1] === "\n") end += 2;
      else if (text[end] === "\n") end += 1;
      return { start, end };
    }
  }
  throw new Error(`Could not terminate declaration ${name}.`);
}

function removeDeclaration(text, name) {
  const { start, end } = declarationRange(text, name);
  return text.slice(0, start) + text.slice(end);
}

function statementEnd(text, start) {
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
    else if (ch === ";" && paren === 0 && bracket === 0 && brace === 0) {
      let end = i + 1;
      if (text[end] === "\r" && text[end + 1] === "\n") end += 2;
      else if (text[end] === "\n") end += 1;
      return end;
    }
  }
  throw new Error("Could not find statement terminator.");
}

function removeStatementByAnchor(text, anchor, label = anchor) {
  requireCount(text, anchor, 1, label);
  const start = text.indexOf(anchor);
  const end = statementEnd(text, start);
  return text.slice(0, start) + text.slice(end);
}

function removeIfBlockFromSource(source, marker, label = marker) {
  requireCount(source, marker, 1, label);
  const start = source.indexOf(marker);
  const markerBraceOffset = marker.lastIndexOf("{");
  const braceOpen = markerBraceOffset >= 0
    ? start + markerBraceOffset
    : source.indexOf("{", start + marker.length);
  if (braceOpen < 0) throw new Error(`Could not find opening brace for ${label}.`);
  const braceClose = matchingDelimiter(source, braceOpen, "{", "}");
  let end = braceClose + 1;
  if (source[end] === "\r" && source[end + 1] === "\n") end += 2;
  else if (source[end] === "\n") end += 1;
  return source.slice(0, start) + source.slice(end);
}

function removeBetweenPreserveEnd(text, startMarker, endMarker, label) {
  requireCount(text, startMarker, 1, `${label} start`);
  const start = text.indexOf(startMarker);
  const end = text.indexOf(endMarker, start + startMarker.length);
  if (end < 0) throw new Error(`Could not find ${label} end marker.`);
  return text.slice(0, start) + text.slice(end);
}

function ensureSafeBranch() {
  const branch = git(["branch", "--show-current"]);
  if (branch !== EXPECTED_BRANCH) {
    throw new Error(`Refusing to run on ${branch || "detached HEAD"}. Switch to ${EXPECTED_BRANCH} first.`);
  }
  const status = git(["status", "--porcelain"]);
  if (status) throw new Error(`Working tree must be clean before Stage 5C.\n${status}`);
}

function runChecks() {
  execFileSync(process.execPath, ["--check", "app.js"], { cwd: ROOT, stdio: "inherit" });
  execFileSync(process.execPath, ["--test", "scripts/test-v2-route-runtime-sequences.js"], { cwd: ROOT, stdio: "inherit" });
  execFileSync(process.execPath, ["--test", "versions/next-action-phase/tests/test-route-encounter-engine.js"], { cwd: ROOT, stdio: "inherit" });
}

function main() {
  ensureSafeBranch();
  const originalApp = fs.readFileSync(APP_PATH, "utf8");
  const originalIndex = fs.readFileSync(INDEX_PATH, "utf8");
  let app = originalApp;
  let index = originalIndex;
  let wrote = false;
  let committed = false;

  const currentRouteMarkers = [
    "const V2_ROUTE_TOKEN_IDS",
    "function useV2RouteRerollToken(",
    "function useV2ExtraEncounter(",
    "function applyV2RouteRepel(",
    "function useV2MasterBallOnOpportunity(",
    "function renderV2RouteActionPhase(",
  ];
  const sharedRandomPokemonMarkers = [
    "randomPokemonSessions: []",
    "function pendingRandomPokemonSessions(",
    "function selectedRandomPokemonSession(",
    "async function createRandomPokemonSession(",
    "async function confirmRandomPokemonSession(",
    "async function rerollRandomPokemonSession(",
    "function renderRandomPokemonPanel(",
  ];

  try {
    if (app.includes("ACTION_PHASE_VERSION_V1")) throw new Error("Stage 1 invariant failed.");
    requireCount(app, "function renderActionPhase() {\n  renderV2RouteActionPhase();\n}", 1, "current-only renderActionPhase");
    requireMarkers(app, currentRouteMarkers, "Current Route preflight invariant missing");
    requireMarkers(app, sharedRandomPokemonMarkers, "Shared Random Pokemon preflight invariant missing");
    if (app.includes("encounterTokenRuntime") || fs.existsSync(path.join(ROOT, "encounter-token-runtime.js"))) {
      throw new Error("Stage 5A invariant failed: legacy encounter-token runtime still exists.");
    }
    if (app.includes("state.hiddenGrottoSessions")) throw new Error("Stage 4 invariant failed: Hidden Grotto runtime remains.");

    for (const marker of [
      "encounterSessions: []",
      "function encounterWheelDefinition(",
      "function startEncounterSession(",
      "function spinEncounterWheel(",
      "function renderEncounterOverlay(",
      "const encounterWheelDefinitions =",
    ]) {
      if (!app.includes(marker)) throw new Error(`Expected retired Encounter Wheel marker missing before purge: ${marker}`);
    }

    const retiredFunctions = [
      "normalizeEncounterEntryId",
      "encounterEntry",
      "makeEncounterWheel",
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
      "createEncounterPokemonResultSession",
      "hydrateEncounterRollSprite",
      "encounterRollWasObtained",
      "encounterSessionReadyForAutomaticCompletion",
      "completeObtainedEncounterSession",
      "addEncounterRollToRoster",
      "rerollEncounterRoll",
      "updateEncounterActionLog",
      "activeEncounterSessionForPlayer",
      "startEncounterSession",
      "completeEncounterRoll",
      "spinEncounterWheel",
      "closeEncounterSession",
      "renderEncounterOverlay",
      "undoEncounterActionVisit",
    ];
    retiredFunctions.forEach((name) => { app = removeFunction(app, name); });

    for (const name of [
      "starterWheelDefinitions",
      "hyperspaceWheelDefinitions",
      "encounterWheelDefinitions",
      "ENCOUNTER_POINTER_ANGLE_DEGREES",
    ]) {
      app = removeDeclaration(app, name);
    }

    let source = functionSource(app, "rerollRandomPokemonResult");
    source = removeIfBlockFromSource(
      source,
      '  if (String(targetResultId || "").startsWith("encounter-roll:")) {',
      "legacy Encounter-roll reroll branch"
    );
    if (source.includes("encounter-roll:") || source.includes("rerollEncounterRoll")) {
      throw new Error("Encounter-roll reroll bridge survived rewrite.");
    }
    app = replaceFunctionSource(app, "rerollRandomPokemonResult", source);

    source = functionSource(app, "confirmRandomPokemonSession");
    source = removeBetweenPreserveEnd(
      source,
      '  if (randomSession.sourceType === "encounter") {',
      '  if (randomSession.sourceType !== "game-corner-token" || !session || !token) {',
      "legacy Encounter confirmation bridge"
    );
    if (source.includes("state.encounterSessions") || source.includes("completeObtainedEncounterSession") || source.includes("updateEncounterActionLog")) {
      throw new Error("Encounter confirmation bridge survived shared Random Pokemon rewrite.");
    }
    app = replaceFunctionSource(app, "confirmRandomPokemonSession", source);

    source = functionSource(app, "rerollRandomPokemonSession");
    source = replaceExactOnce(
      source,
      [
        '  const encounterSession = randomSession.sourceType === "encounter"',
        '    ? (state.encounterSessions || []).find((entry) => entry.id === randomSession.encounterSessionId)',
        '    : null;',
        '  const available = encounterSession ? encounterEntriesForSession(encounterSession) : availablePokemonForGameCornerTier(randomSession.tierId);',
      ].join("\n"),
      '  const available = availablePokemonForGameCornerTier(randomSession.tierId);',
      "legacy Encounter pool branch in random Pokemon reroll"
    );
    source = replaceExactOnce(
      source,
      '      type: encounterSession ? "encounter-reroll" : "pokemon-reroll",',
      '      type: "pokemon-reroll",',
      "legacy Encounter interaction response type"
    );
    source = removeIfBlockFromSource(source, "  if (encounterSession) {", "legacy Encounter action-log update");
    source = replaceExactOnce(
      source,
      '    targetResultId: randomSession.id, resultKind: encounterSession ? "encounter-result" : "wheel-result",',
      '    targetResultId: randomSession.id, resultKind: "wheel-result",',
      "legacy Encounter result-kind branch"
    );
    if (source.includes("encounterSession")) throw new Error("encounterSession variable survived random Pokemon reroll rewrite.");
    app = replaceFunctionSource(app, "rerollRandomPokemonSession", source);

    source = functionSource(app, "honeyEligibleEncounterResults");
    source = replaceExactOnce(
      source,
      [
        '    const parent = (state.encounterSessions || []).find((entry) => entry.id === session.encounterSessionId);',
        '    return String(session.series || parent?.series || state.series) === String(state.series)',
        '      && Number(session.gym || parent?.gym || state.gym) === Number(state.gym);',
      ].join("\n"),
      [
        '    return String(session.series || state.series) === String(state.series)',
        '      && Number(session.gym || state.gym) === Number(state.gym);',
      ].join("\n"),
      "Honey legacy Encounter parent lookup"
    );
    app = replaceFunctionSource(app, "honeyEligibleEncounterResults", source);

    app = removeStatementByAnchor(
      app,
      [
        '  (state.encounterSessions || [])',
        '    .filter((session) => ["pending", "review"].includes(session.status))',
        '    .forEach((session) => {',
      ].join("\n"),
      "legacy Encounter results in shared reroll-target list"
    );

    app = replaceExactOnce(
      app,
      '  "encounterModalOpen",\n  "selectedEncounterSessionId",\n',
      "",
      "Encounter presentation-only state keys"
    );
    app = replaceExactOnce(
      app,
      '    encounterSessions: [],\n    selectedEncounterSessionId: "",\n    encounterModalOpen: false,\n',
      "",
      "Encounter default state"
    );
    app = replaceExactOnce(app, '    previousEncounterSessions: structuredClone(state.encounterSessions || []),\n', "", "Encounter causal rollback snapshot");
    app = replaceExactOnce(app, '    previousSelectedEncounterSessionId: state.selectedEncounterSessionId || "",\n', "", "selected Encounter causal rollback snapshot");
    app = replaceExactOnce(app, '    previousEncounterModalOpen: Boolean(state.encounterModalOpen),\n', "", "Encounter modal causal rollback snapshot");
    app = replaceExactOnce(
      app,
      '    encounterSessions: causalIdCollectionDelta(snapshot.previousEncounterSessions, state.encounterSessions),\n',
      "",
      "Encounter causal collection delta"
    );
    app = replaceExactOnce(
      app,
      '    "effectOperations", "copiedActivations", "copiedTokenRelationships", "wheelSessions", "encounterSessions",\n',
      '    "effectOperations", "copiedActivations", "copiedTokenRelationships", "wheelSessions",\n',
      "Encounter causal merge collection key"
    );
    app = replaceExactOnce(
      app,
      '  state.encounterSessions = applyCausalIdCollectionUndo(state.encounterSessions, undoData.encounterSessions);\n',
      "",
      "Encounter causal undo application"
    );

    app = removeBetweenPreserveEnd(
      app,
      '  nextState.encounterSessions ||= [];\n',
      '  nextState.randomPokemonSessions ||= [];\n',
      "Encounter state normalization block"
    );

    app = removeStatementByAnchor(
      app,
      [
        '  gymState.actionOperations.forEach((operation) => {',
        '    if (operation.status !== "resolving" || operation.linkedFeatureType !== "encounter") return;',
      ].join("\n"),
      "Encounter automatic Action-operation completion loop"
    );
    app = replaceExactOnce(app, '    encounter: state.encounterSessions,\n', "", "Encounter linked Action-operation collection");
    app = replaceExactOnce(app, '    "encounterSessions",\n', "", "Encounter sandbox collection key");

    app = replaceExactOnce(
      app,
      '  if (undoData.previousEncounterSessions) state.encounterSessions = structuredClone(undoData.previousEncounterSessions);\n',
      "",
      "Encounter generic undo snapshot restoration"
    );
    app = replaceExactOnce(
      app,
      [
        '  if (Object.prototype.hasOwnProperty.call(undoData, "previousSelectedEncounterSessionId")) {',
        '    state.selectedEncounterSessionId = undoData.previousSelectedEncounterSessionId || "";',
        '  }',
        '  if (Object.prototype.hasOwnProperty.call(undoData, "previousEncounterModalOpen")) {',
        '    state.encounterModalOpen = Boolean(undoData.previousEncounterModalOpen);',
        '  }',
      ].join("\n") + "\n",
      "",
      "Encounter generic undo presentation-state restoration"
    );

    const undoElseMarker = ' else if (undoData.actionType === "undoEncounterAction") {';
    const undoIfMarker = 'if (undoData.actionType === "undoEncounterAction") {';
    if (app.includes(undoElseMarker)) {
      requireCount(app, undoElseMarker, 1, "Encounter undo branch");
      const start = app.indexOf(undoElseMarker);
      const braceOpen = app.indexOf("{", start);
      const braceClose = matchingDelimiter(app, braceOpen, "{", "}");
      app = app.slice(0, start) + app.slice(braceClose + 1);
    } else if (app.includes(undoIfMarker)) {
      requireCount(app, undoIfMarker, 1, "Encounter undo branch");
      const start = app.indexOf(undoIfMarker);
      const braceOpen = app.indexOf("{", start);
      const braceClose = matchingDelimiter(app, braceOpen, "{", "}");
      let end = braceClose + 1;
      if (app[end] === "\r" && app[end + 1] === "\n") end += 2;
      else if (app[end] === "\n") end += 1;
      app = app.slice(0, start) + app.slice(end);
    } else {
      throw new Error("Encounter undo dispatch branch was not found.");
    }

    app = replaceExactOnce(
      app,
      [
        '  encounterTab: document.querySelector("#encounterTab"),',
        '  encounterOverlay: document.querySelector("#encounterOverlay"),',
        '  closeEncounterOverlay: document.querySelector("#closeEncounterOverlay"),',
        '  encounterSessionList: document.querySelector("#encounterSessionList"),',
        '  encounterTitle: document.querySelector("#encounterTitle"),',
        '  encounterBody: document.querySelector("#encounterBody"),',
      ].join("\n") + "\n",
      "",
      "Encounter DOM element registry"
    );

    for (const [anchor, label] of [
      ['  els.encounterTab?.addEventListener("click", () => {', "Encounter tab listener"],
      ['  els.closeEncounterOverlay?.addEventListener("click", () => {', "Encounter close listener"],
      ['  els.encounterOverlay?.addEventListener("click", (event) => {', "Encounter overlay click listener"],
      ['  els.encounterOverlay?.addEventListener("input", (event) => {', "Encounter overlay input listener"],
    ]) {
      app = removeStatementByAnchor(app, anchor, label);
    }

    app = app.replace(/^[ \t]*renderEncounterOverlay\(\);\r?\n/gm, "");

    index = replaceExactOnce(
      index,
      [
        '      <button id="encounterTab" class="encounter-tab hidden" type="button" aria-controls="encounterOverlay" aria-expanded="false">Encounter</button>',
        '      <section id="encounterOverlay" class="encounter-overlay hidden" aria-label="Encounter Wheel">',
        '        <div class="encounter-modal">',
        '          <div class="panel-header">',
        '            <div>',
        '              <p class="eyebrow">Encounter Wheel</p>',
        '              <h2 id="encounterTitle">Encounter Wheel</h2>',
        '            </div>',
        '            <button id="closeEncounterOverlay" class="ghost-button" type="button">Close</button>',
        '          </div>',
        '          <div id="encounterSessionList" class="wheel-session-list"></div>',
        '          <div id="encounterBody"></div>',
        '        </div>',
        '      </section>',
      ].join("\n") + "\n",
      "",
      "Encounter Wheel static overlay"
    );

    const forbiddenAppMarkers = [
      "state.encounterSessions",
      "nextState.encounterSessions",
      "encounterSessions: []",
      "selectedEncounterSessionId",
      "encounterModalOpen",
      "encounterWheelDefinitions",
      "hyperspaceWheelDefinitions",
      "starterWheelDefinitions",
      "function encounterWheelDefinition(",
      "function startEncounterSession(",
      "function spinEncounterWheel(",
      "function closeEncounterSession(",
      "function renderEncounterOverlay(",
      "function undoEncounterActionVisit(",
      "function rerollEncounterRoll(",
      "function addEncounterRollToRoster(",
      "function createEncounterPokemonResultSession(",
      'linkedFeatureType !== "encounter"',
      'encounter: state.encounterSessions',
      'startsWith("encounter-roll:")',
      "els.encounterOverlay",
      "els.encounterTab",
    ];
    const survivors = forbiddenAppMarkers.filter((marker) => app.includes(marker));
    if (survivors.length) throw new Error(`Retired Encounter Wheel runtime markers remain:\n${survivors.join("\n")}`);

    for (const marker of ["encounterTab", "encounterOverlay", "Encounter Wheel"]) {
      if (index.includes(marker)) throw new Error(`Retired Encounter Wheel HTML marker remains: ${marker}`);
    }
    requireMarkers(app, currentRouteMarkers, "Current Route invariant disappeared");
    requireMarkers(app, sharedRandomPokemonMarkers, "Shared Random Pokemon invariant disappeared");
    requireCount(app, "randomPokemonSessions: []", 1, "shared Random Pokemon default state");
    requireCount(app, "function renderRandomPokemonPanel(", 1, "shared Random Pokemon panel");
    requireCount(app, "function renderWheelPanel(", 1, "shared generic wheel panel");

    fs.writeFileSync(APP_PATH, app, "utf8");
    fs.writeFileSync(INDEX_PATH, index, "utf8");
    wrote = true;

    runChecks();

    git(["add", "app.js", "index.html"]);
    execFileSync("git", ["diff", "--cached", "--check"], { cwd: ROOT, stdio: "inherit" });
    const staged = git(["diff", "--cached", "--stat"]);
    if (!staged) throw new Error("Stage 5C produced no staged changes.");

    console.log(`\n${staged}`);
    console.log("Retired Encounter Wheel runtime/state and static overlay removed.");
    console.log("Shared Random Pokemon, Game Corner result, Honey bridge, generic wheel, and current Route infrastructure were preserved.");
    console.log("Encounter-only branches were stripped from shared Random Pokemon confirmation/reroll paths.");
    console.log("Encounter CSS is intentionally deferred to the later static CSS/orphan cleanup stage.");

    git(["commit", "-m", "Remove retired Encounter Wheel runtime"], { inherit: true });
    committed = true;
    git(["push", "origin", EXPECTED_BRANCH], { inherit: true });
    console.log("\nStage 5C complete: retired Encounter Wheel runtime removed and pushed.");
  } catch (error) {
    if (wrote && !committed) {
      try { git(["reset", "HEAD", "--", "app.js", "index.html"]); } catch (_) {}
      try { fs.writeFileSync(APP_PATH, originalApp, "utf8"); } catch (_) {}
      try { fs.writeFileSync(INDEX_PATH, originalIndex, "utf8"); } catch (_) {}
    }
    const suffix = committed
      ? "\nThe commit exists locally but the push did not finish; do not rerun until we inspect it."
      : "\nNo Stage 5C runtime commit was created; app.js/index.html were restored if they had been written.";
    throw new Error(`${error.message}${suffix}`);
  }
}

try {
  main();
} catch (error) {
  console.error(`\nV1 purge Stage 5C failed safely:\n${error.message}`);
  process.exitCode = 1;
}
