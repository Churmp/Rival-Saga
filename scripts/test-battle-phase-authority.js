const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.join(__dirname, "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");

function functionSource(name, nextName) {
  const start = app.indexOf(`function ${name}(`);
  assert.notEqual(start, -1, `${name} should exist`);
  const end = nextName ? app.indexOf(`function ${nextName}(`, start + 1) : app.length;
  assert.notEqual(end, -1, `${nextName} should follow ${name}`);
  return app.slice(start, end);
}

test("Battle Phase overview is read-only and hands editing to Teambuilder", () => {
  const source = functionSource("renderTeamLockCards", "renderBattleStatInputs");
  assert.doesNotMatch(source, /data-badge-slot|data-battle-form-slot|<select/);
  assert.match(source, /Build in Teambuilder|View in Teambuilder/);
  assert.match(app, /data-teambuilder-lock-team/);
  assert.match(app, /submitAndLockTeambuilderTeam/);
});

test("locked snapshots use exact roster identity, revisions, and frozen set data", () => {
  const source = functionSource("lockedBattleTeamSlotSnapshot", "lockedBattleTeamSlots");
  assert.match(source, /pokemonRecordId/);
  assert.match(source, /lockedSlotId/);
  assert.match(source, /assignedBadgePoints/);
  assert.match(source, /setSnapshot/);
  assert.match(app, /team\.revisionNumber = Math\.max\(0, Number\(team\.revisionNumber \|\| 0\)\) \+ 1/);
});

test("viewer-specific evaluator fails closed for hidden slots", () => {
  const source = functionSource("sanitizeBattleTeamSlot", "getBattleTeamView");
  assert.match(source, /revealLevel === BATTLE_REVEAL_LEVELS\.HIDDEN/);
  assert.match(source, /hidden: true/);
  assert.doesNotMatch(source.slice(0, source.indexOf("const species")), /selectedBattleSpecies|pokemonName/);
  const grantSource = functionSource("normalizeBattleRevealGrant", "battleRevealGrantsForCurrentGym");
  ["PLAYER", "PLAYERS", "ALL_OPPONENTS", "PUBLIC", "HOST"].forEach((scope) => assert.match(grantSource, new RegExp(`"${scope}"`)));
});

test("Team Preview grants durable public summary knowledge", () => {
  assert.match(app, /function grantBattleTeamVisibility/);
  assert.match(app, /sourceId: "TEAM_PREVIEW"/);
  assert.match(app, /revealLevel: BATTLE_REVEAL_LEVELS\.PUBLIC_SUMMARY/);
  assert.match(app, /grantPublicBattleTeamPreview\(\);\s*await commitLockedTeamRevealsForCurrentPhase/s);
});

test("Battle Phase keeps reporting, schedule, results, history, and revision surfaces", () => {
  [
    "battleRevisionWindowList",
    "battleRecordingView",
    "battleScheduleList",
    "gymResultsPreview",
    "battleRecordsList",
    "battleHistory"
  ].forEach((id) => assert.match(html, new RegExp(`id="${id}"`)));
});

test("new battle presentation includes phase rail, mystery slots, and responsive strips", () => {
  assert.match(html, /id="battlePhaseRail"/);
  assert.match(html, /id="battlePlayer1TeamStrip"/);
  assert.match(css, /\.battle-phase-rail/);
  assert.match(css, /\.battle-team-slot\.mystery/);
  assert.match(css, /\.battle-team-strip/);
  assert.match(css, /@media \(max-width: 900px\)/);
});
