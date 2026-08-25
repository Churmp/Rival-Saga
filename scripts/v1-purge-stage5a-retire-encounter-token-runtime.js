#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const EXPECTED_BRANCH = "audit/purge-v1-runtime";
const APP_PATH = path.join(ROOT, "app.js");
const INDEX_PATH = path.join(ROOT, "index.html");
const RUNTIME_PATH = path.join(ROOT, "encounter-token-runtime.js");

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

function replaceExactOnce(text, oldValue, newValue = "", label = oldValue) {
  requireCount(text, oldValue, 1, label);
  return text.replace(oldValue, newValue);
}

function requireMarkers(text, markers, label) {
  const missing = markers.filter((marker) => !text.includes(marker));
  if (missing.length) throw new Error(`${label}: ${missing.join(", ")}`);
}

function findMatchingBrace(text, openIndex) {
  let depth = 0;
  let mode = "code";
  let templateExprDepth = 0;
  for (let i = openIndex; i < text.length; i += 1) {
    const ch = text[i];
    const next = text[i + 1];
    if (mode === "line-comment") {
      if (ch === "\n") mode = "code";
      continue;
    }
    if (mode === "block-comment") {
      if (ch === "*" && next === "/") {
        mode = "code";
        i += 1;
      }
      continue;
    }
    if (mode === "single") {
      if (ch === "\\") i += 1;
      else if (ch === "'") mode = "code";
      continue;
    }
    if (mode === "double") {
      if (ch === "\\") i += 1;
      else if (ch === '"') mode = "code";
      continue;
    }
    if (mode === "template") {
      if (ch === "\\") {
        i += 1;
        continue;
      }
      if (ch === "`" && templateExprDepth === 0) {
        mode = "code";
        continue;
      }
      if (ch === "$" && next === "{") {
        templateExprDepth += 1;
        depth += 1;
        i += 1;
        continue;
      }
      if (ch === "}" && templateExprDepth > 0) {
        templateExprDepth -= 1;
        depth -= 1;
        continue;
      }
      continue;
    }
    if (ch === "/" && next === "/") {
      mode = "line-comment";
      i += 1;
      continue;
    }
    if (ch === "/" && next === "*") {
      mode = "block-comment";
      i += 1;
      continue;
    }
    if (ch === "'") {
      mode = "single";
      continue;
    }
    if (ch === '"') {
      mode = "double";
      continue;
    }
    if (ch === "`") {
      mode = "template";
      templateExprDepth = 0;
      continue;
    }
    if (ch === "{") depth += 1;
    else if (ch === "}") {
      depth -= 1;
      if (depth === 0) return i;
      if (depth < 0) break;
    }
  }
  throw new Error("Could not find matching brace while removing the legacy Extra Encounter branch.");
}

function removeExtraEncounterGrantBranch(text) {
  const marker = '  if (metadata.resolverId === "extraEncounter") {';
  requireCount(text, marker, 1, "legacy Extra Encounter resolution branch after validation removal");
  const start = text.indexOf(marker);
  const openBrace = text.indexOf("{", start + marker.length - 1);
  const closeBrace = findMatchingBrace(text, openBrace);
  const suffix = text.slice(closeBrace + 1);
  if (!suffix.startsWith(' else if (metadata.resolverId === "safeguard") {')) {
    throw new Error("Legacy Extra Encounter branch is not followed by the expected Safeguard branch.");
  }
  const afterElse = closeBrace + 1 + " else ".length;
  return text.slice(0, start) + "  " + text.slice(afterElse);
}

function ensureSafeBranch() {
  const branch = git(["branch", "--show-current"]);
  if (branch !== EXPECTED_BRANCH) {
    throw new Error(`Refusing to run on ${branch || "detached HEAD"}. Switch to ${EXPECTED_BRANCH} first.`);
  }
  const status = git(["status", "--porcelain"]);
  if (status) throw new Error(`Working tree must be clean before Stage 5A.\n${status}`);
}

function runChecks() {
  execFileSync(process.execPath, ["--check", "app.js"], { cwd: ROOT, stdio: "inherit" });
  execFileSync(process.execPath, ["--test", "scripts/test-v2-route-runtime-sequences.js"], { cwd: ROOT, stdio: "inherit" });
  execFileSync(process.execPath, ["--test", "versions/next-action-phase/tests/test-route-encounter-engine.js"], { cwd: ROOT, stdio: "inherit" });
}

function productionRuntimeRefs() {
  const output = git([
    "grep", "-n", "-E",
    "encounterTokenRuntime|rivalSagaEncounterTokenRuntime|encounter-token-runtime\\.js",
    "--",
    "app.js", "index.html", "server.js", "package.json", "*.js", "scripts/*.js", "versions/*.js", "versions/**/*.js"
  ]);
  if (!output) return [];
  return output.split("\n").filter((line) => !line.includes("scripts/v1-purge-") && !line.includes("V1_PURGE_"));
}

function main() {
  ensureSafeBranch();
  if (!fs.existsSync(RUNTIME_PATH)) throw new Error("encounter-token-runtime.js is already missing; refusing to infer partial Stage 5A state.");

  const originalApp = fs.readFileSync(APP_PATH, "utf8");
  const originalIndex = fs.readFileSync(INDEX_PATH, "utf8");
  const originalRuntime = fs.readFileSync(RUNTIME_PATH, "utf8");
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
  ];

  try {
    if (app.includes("ACTION_PHASE_VERSION_V1")) throw new Error("Stage 1 invariant failed.");
    requireCount(app, "function renderActionPhase() {\n  renderV2RouteActionPhase();\n}", 1, "current-only renderActionPhase");
    requireMarkers(app, currentRouteMarkers, "Current Route preflight invariant missing");
    for (const marker of ["state.hiddenGrottoSessions", "function startHiddenGrottoSession("]) {
      if (app.includes(marker)) throw new Error(`Stage 4 invariant failed: ${marker}`);
    }

    requireCount(app, "encounterTokenRuntime", 4, "legacy encounterTokenRuntime references");
    requireCount(app, 'metadata.resolverId === "extraEncounter"', 3, "legacy generic Extra Encounter resolver branches");
    requireCount(index, '<script defer src="encounter-token-runtime.js?v=1"></script>', 1, "legacy encounter runtime script tag");

    app = replaceExactOnce(
      app,
      'const encounterTokenRuntime = globalThis.rivalSagaEncounterTokenRuntime;\nif (!encounterTokenRuntime) throw new Error("Encounter Token runtime failed to load.");\n',
      "",
      "legacy Encounter Token global runtime dependency"
    );

    app = replaceExactOnce(
      app,
      '  const metadata = tokenEffectMetadataByName(draft.tokenName);\n',
      [
        '  const metadata = tokenEffectMetadataByName(draft.tokenName);',
        '  if (metadata.resolverId === "extraEncounter") {',
        '    alert("Extra Encounter is used from the current Route action. Open Routes and use the Token on the Route you want to explore.");',
        '    return null;',
        '  }',
        "",
      ].join("\n"),
      "resolveImmediateTokenUse metadata line"
    );

    app = replaceExactOnce(
      app,
      [
        '  let extraEncounterValidation = null;',
        '  if (metadata.resolverId === "extraEncounter") {',
        '    extraEncounterValidation = encounterTokenRuntime.validateExtraEncounter(state, {',
        '      playerId: draft.targetPlayerId',
        '    }, {',
        '      wheelDefinition: encounterWheelDefinition(state.series, state.gym)',
        '    });',
        '    if (!extraEncounterValidation.ok) {',
        '      alert(extraEncounterValidation.reason);',
        '      return null;',
        '    }',
        '  }',
      ].join("\n") + "\n",
      "",
      "legacy Extra Encounter pre-consumption validation"
    );

    app = removeExtraEncounterGrantBranch(app);
    app = replaceExactOnce(app, '  let encounterSessionId = "";\n', "", "legacy Encounter session result variable");

    app = replaceExactOnce(
      app,
      [
        '  const outcomeTitle = metadata.resolverId === "extraEncounter"',
        '      ? `Extra Encounter ready for ${extraEncounterValidation?.player?.name || "the chosen player"}.`',
        '    : metadata.resolverId === "safeguard"',
      ].join("\n"),
      '  const outcomeTitle = metadata.resolverId === "safeguard"',
      "legacy Extra Encounter outcome title"
    );

    app = replaceExactOnce(
      app,
      [
        '      operations: encounterSessionId ? [{',
        '        type: "extraEncounterGrant",',
        '        targetPlayerId: extraEncounterValidation?.player?.id || "",',
        '        encounterSessionId',
        '      }] : []',
      ].join("\n"),
      '      operations: []',
      "legacy Extra Encounter result-summary operation"
    );

    index = replaceExactOnce(
      index,
      '    <script defer src="encounter-token-runtime.js?v=1"></script>\n',
      "",
      "legacy Encounter Token runtime script include"
    );

    const forbiddenAppMarkers = [
      "encounterTokenRuntime",
      "rivalSagaEncounterTokenRuntime",
      "extraEncounterValidation",
      "encounterSessionId",
      "extra-encounter-created",
      "gained one Encounter Wheel roll",
      "Extra Encounter Ready",
    ];
    const leftovers = forbiddenAppMarkers.filter((marker) => app.includes(marker));
    if (leftovers.length) throw new Error(`Legacy generic Extra Encounter markers remain: ${leftovers.join(", ")}`);
    requireCount(app, 'metadata.resolverId === "extraEncounter"', 1, "Route-only generic Extra Encounter guard");
    requireCount(app, "Extra Encounter is used from the current Route action.", 1, "Route-only Extra Encounter guidance");
    requireMarkers(app, currentRouteMarkers, "Current Route invariant disappeared");

    fs.writeFileSync(APP_PATH, app, "utf8");
    fs.writeFileSync(INDEX_PATH, index, "utf8");
    fs.unlinkSync(RUNTIME_PATH);
    wrote = true;

    runChecks();

    const unexpectedRefs = productionRuntimeRefs();
    if (unexpectedRefs.length) {
      throw new Error(`Legacy Encounter Token runtime references remain in production/runtime files:\n${unexpectedRefs.join("\n")}`);
    }

    git(["add", "app.js", "index.html", "encounter-token-runtime.js"]);
    execFileSync("git", ["diff", "--cached", "--check"], { cwd: ROOT, stdio: "inherit" });
    const staged = git(["diff", "--cached", "--stat"]);
    if (!staged) throw new Error("Stage 5A produced no staged changes.");
    console.log(`\n${staged}`);
    console.log("Legacy Encounter Token runtime dependency removed.");
    console.log("Generic Extra Encounter activation now redirects to the current Route action before consumption.");
    console.log("Current Route Extra Encounter/Reroll/Repel/Master Ball handlers survived invariant checks.");

    git(["commit", "-m", "Retire legacy Encounter Token runtime"], { inherit: true });
    committed = true;
    git(["push", "origin", EXPECTED_BRANCH], { inherit: true });
    console.log("\nStage 5A complete: legacy Encounter Token runtime removed and pushed.");
  } catch (error) {
    if (wrote && !committed) {
      try { git(["reset", "HEAD", "--", "app.js", "index.html", "encounter-token-runtime.js"]); } catch (_) {}
      try { fs.writeFileSync(APP_PATH, originalApp, "utf8"); } catch (_) {}
      try { fs.writeFileSync(INDEX_PATH, originalIndex, "utf8"); } catch (_) {}
      try { fs.writeFileSync(RUNTIME_PATH, originalRuntime, "utf8"); } catch (_) {}
    }
    const suffix = committed
      ? "\nThe commit exists locally but the push did not finish; do not rerun until we inspect it."
      : "\nNo Stage 5A runtime commit was created; changed files were restored if written.";
    throw new Error(`${error.message}${suffix}`);
  }
}

try {
  main();
} catch (error) {
  console.error(`\nV1 purge Stage 5A failed safely:\n${error.message}`);
  process.exitCode = 1;
}
