"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.join(__dirname, "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const contract = require("../token-effect-contract.js");

function functionSource(name, nextName) {
  const start = app.indexOf(`function ${name}(`);
  assert.notEqual(start, -1, `${name} should exist`);
  const end = nextName ? app.indexOf(`function ${nextName}(`, start + 1) : app.length;
  assert.notEqual(end, -1, `${nextName} should follow ${name}`);
  return app.slice(start, end);
}

test("Sabotage permissions are explicit contract data", () => {
  ["toxic-curse", "iron-ball-curse", "flame-curse", "silencing-curse", "imprison-curse"].forEach((id) => {
    assert.equal(contract.definitionFor(id).timingPermissions.sabotageCurseWindow, true);
  });
  ["wicked-blow", "immunity-token"].forEach((id) => {
    assert.notEqual(contract.definitionFor(id)?.timingPermissions?.sabotageCurseWindow, true);
  });
});

test("one canonical context evaluator owns runtime, timing, targets, and blockers", () => {
  const source = functionSource("getUsableEffectsForContext", "normalizeLiveRefereeScreenName");
  assert.match(source, /tokenRuntimeUsabilityCheck/);
  assert.match(source, /tokenUseTimingCheck/);
  assert.match(source, /liveRefereeEffectHasRequiredTargets/);
  assert.match(source, /WAITING_FOR_REVISIONS/);
  assert.match(source, /timingPermissions\?\.sabotageCurseWindow/);
  assert.match(source, /definition\?\.isResponse/);
  assert.match(functionSource("liveRefereeAvailableTokenGroups", "liveRefereeTokenUseIntentLabel"), /getUsableEffectsForContext/);
});

test("resolved standard Curses open structured blocking revision operations", () => {
  const resolver = functionSource("applyAutomaticControlFoundationActivity", "applyAutomaticStatusTokenActivity");
  assert.match(resolver, /resolution\.result === "resolved"/);
  assert.match(resolver, /openSabotageRevisionWindowsForStatusActivation/);
  const opener = functionSource("openSabotageRevisionWindowsForStatusActivation", "openTeamPreviewMembershipRevisionWindow");
  ["affectedRosterInstanceIds", "revisionReason", "requiredChanges", "allowedScope", "snapshotRevision", "scopeBaseline"].forEach((field) => {
    assert.match(opener, new RegExp(field));
  });
  assert.match(opener, /createBattleRevisionOperation/);
});

test("parent operations wait for every child and block proactive progression", () => {
  const completion = functionSource("completeBattleRevisionOperationTask", "confirmBattleRevisionWindow");
  assert.match(completion, /revisionTasks\.some\(\(entry\) => entry\.status === "pending"\)/);
  assert.match(completion, /operation\.status = "RESOLVED"/);
  const phaseAdvance = functionSource("confirmPhaseAdvance", "advancePhase");
  assert.match(phaseAdvance, /currentBlockingBattleRevisionOperation/);
  assert.match(functionSource("revealTeamPreview", "validateBattleTeamSlots"), /currentBlockingBattleRevisionOperation/);
  assert.match(functionSource("renderLiveRefereeMainPromptScreen", "liveRefereeHistoryPromptForActivity"), /Sabotage paused - team revision required/);
});

test("revision confirmation validates the full team and enforces allowed scope", () => {
  const validation = functionSource("validateBattleRevisionWindow", "completeBattleRevisionOperationTask");
  assert.match(validation, /validateTeamBuildDraft/);
  assert.match(validation, /fullTeamErrors/);
  assert.match(validation, /battleRevisionScopeErrors/);
  const scope = functionSource("battleRevisionScopeErrors", "validateBattleRevisionWindow");
  assert.match(scope, /teamMembership/);
  assert.match(scope, /badgeAssignments/);
  assert.match(scope, /unrelatedPokemonSets/);
  assert.match(scope, /operationAffectedIds/);
  assert.match(scope, /revisionTasks.*flatMap/s);
  assert.match(app, /data-teambuilder-confirm-revision/);
});

test("cleaned effects cancel obsolete child tasks without restoring stale snapshots", () => {
  const source = functionSource("reconcileBattleRevisionOperations", "battlePhaseStateMeta");
  assert.match(source, /activeStatusIds/);
  assert.match(source, /window\.status = "canceled"/);
  assert.match(source, /task\.status = "canceled"/);
  assert.doesNotMatch(source, /scopeBaseline.*restore|restore.*scopeBaseline/i);
});
