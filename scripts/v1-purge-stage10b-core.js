"use strict";
module.exports = function core(c){
  const {read,rep,reps,line,objProp,rmTest,replTest,absent}=c; const edits=new Map();

  let s=read("game-shell-contract.js");
  s=line(s,'  const ACTION_PHASE_VERSION_V1 = "action-phase-v1-current-series";',1,"shell V1 constant");
  s=rep(s,`  function actionPhaseVersion(record = {}) {
    const state = isObject(record.state) ? record.state : {};
    const candidate = record.actionPhaseVersion
      || record.ruleset?.actionPhaseVersion
      || state.ruleset?.actionPhaseVersion
      || state.actionPhaseVersion;
    if (candidate === ACTION_PHASE_VERSION_V1) return ACTION_PHASE_VERSION_V1;
    if (candidate === ACTION_PHASE_VERSION_V2) return ACTION_PHASE_VERSION_V2;
    return isObject(record.state) ? ACTION_PHASE_VERSION_V1 : DEFAULT_ACTION_PHASE_VERSION;
  }`,`  function actionPhaseVersion() {
    return DEFAULT_ACTION_PHASE_VERSION;
  }`,"shell actionPhaseVersion");
  absent(s,["ACTION_PHASE_VERSION_V1","action-phase-v1-current-series"],"shell"); edits.set("game-shell-contract.js",s);

  s=read("scripts/fixtures/game-shell-fixtures.js");
  s=reps(s,'    actionPhaseVersion: "action-phase-v1-current-series",','    actionPhaseVersion: "action-phase-v2-real-series",',2,"fixture versions");
  s=objProp(s,"  supportedLegacy: {","supportedLegacy fixture");
  absent(s,["action-phase-v1-current-series","supportedLegacy"],"shell fixtures"); edits.set("scripts/fixtures/game-shell-fixtures.js",s);

  s=read("scripts/test-game-shell-loading.js");
  s=line(s,"  fixtures.supportedLegacy,",1,"supportedLegacy list");
  s=rep(s,'test("normalizes current, legacy, modern, and malformed optional records", () => {\n  for (const record of [fixtures.currentProgressed, fixtures.currentEmpty, fixtures.supportedLegacy, fixtures.modernTokenReferee, fixtures.malformedOptional]) {','test("normalizes current, modern, and malformed optional records", () => {\n  for (const record of [fixtures.currentProgressed, fixtures.currentEmpty, fixtures.modernTokenReferee, fixtures.malformedOptional]) {',"shell normalization");
  s=replTest(s,"brand-new summaries default to V2 while legacy snapshots remain V1-compatible",`test("all summaries use the one current Action Phase version", () => {
  assert.equal(contract.DEFAULT_ACTION_PHASE_VERSION, "action-phase-v2-real-series");
  assert.equal(contract.normalizeGameSummary({ id: "brand-new", name: "Brand New", state: null }).summary.actionPhaseVersion, "action-phase-v2-real-series");
  assert.equal(contract.normalizeGameSummary({ id: "pre-version-save", name: "Pre-version Save", state: { series: "Kanto", gym: 2, currentPhase: "action", players: [] } }).summary.actionPhaseVersion, "action-phase-v2-real-series");
});`);
  s=rmTest(s,"persisted V1 games load as V1 without converting the save");
  s=reps(s,'  assert.equal(progressed.actionPhaseVersion, "action-phase-v1-current-series");','  assert.equal(progressed.actionPhaseVersion, "action-phase-v2-real-series");',2,"shell version assertions");
  s=rep(s,'  assert.equal((await response.json()).games.length, 7);','  assert.equal((await response.json()).games.length, 6);',"shell game count");
  absent(s,["action-phase-v1-current-series","supportedLegacy","persisted V1 games"],"shell tests"); edits.set("scripts/test-game-shell-loading.js",s);

  s=read("scripts/test-v2-route-browser-mount.js");
  s=replTest(s,"new game UI defaults to V2 without exposing legacy V1 prominently",`test("new game UI exposes the current Action Phase version", () => {
  const createCard = indexHtml.match(/<section class="site-shell-card site-create-game-card">[\\s\\S]*?<\\/section>/)?.[0] || "";
  const createBody = functionBody("createSiteGame");
  assert.match(appJs, /const DEFAULT_ACTION_PHASE_VERSION = ACTION_PHASE_VERSION_V2/);
  assert.match(appJs, /const ACTION_PHASE_VERSION_V2 = "action-phase-v2-real-series"/);
  assert.match(appJs, /supportedActionPhaseVersions: \\[ACTION_PHASE_VERSION_V2\\]/);
  assert.match(createBody, /DEFAULT_ACTION_PHASE_VERSION/);
  assert.doesNotMatch(createCard, /Action Phase Version|\\bV1\\b/i);
});`);
  s=replTest(s,"renderActionPhase delegates V2 without replacing the V1 branch",`test("renderActionPhase delegates directly to the current Route Action renderer", () => {
  const body = functionBody("renderActionPhase");
  assert.match(body, /renderV2RouteActionPhase\\(\\)/);
  assert.doesNotMatch(body, /activeActionPhaseVersion|ensureActionPhaseGymState|renderActionWorkspaceRootMenu/);
});`);
  absent(s,["ACTION_PHASE_VERSION_V1","action-phase-v1-current-series","V1 branch"],"route mount"); edits.set("scripts/test-v2-route-browser-mount.js",s);

  s=read("scripts/test-v2-route-runtime-sequences.js");
  s=rep(s,'    supportedActionPhaseVersions: ["action-phase-v1-current-series", "action-phase-v2-real-series"]','    supportedActionPhaseVersions: ["action-phase-v2-real-series"]',"route versions");
  s=rep(s,'test("V2 Extra Encounter remains atomic when Duplicate OFF removes every random candidate", async () => {','test("[V2R-EXTRA-001] V2 Extra Encounter remains atomic when Duplicate OFF removes every random candidate", async () => {',"extra atomic id");
  s=rep(s,'test("V2 Extra Encounter, Repel, and Master Ball are exact-once through backend reload", async () => {','test("[V2R-EXTRA-002] V2 Extra Encounter, Repel, and Master Ball are exact-once through backend reload", async () => {',"extra reload id");
  absent(s,["action-phase-v1-current-series"],"route runtime"); edits.set("scripts/test-v2-route-runtime-sequences.js",s);

  s=read("token-control-controller.js"); s=line(s,"    state.encounterCopyRecords ||= [];",1,"controller copy bucket"); absent(s,["encounterCopyRecords"],"controller"); edits.set("token-control-controller.js",s);
  s=read("token-sandbox-session.js"); s=line(s,'    "encounterModalOpen",',1); s=line(s,'    "selectedEncounterSessionId",',1); absent(s,["encounterModalOpen","selectedEncounterSessionId"],"sandbox"); edits.set("token-sandbox-session.js",s);

  s=read("scripts/test-action-operation-contract.js");
  s=rep(s,'    "silph-co-choice-complete", "hidden-grotto-choice-complete", "bulletin-quests-confirmed",\n    "encounter-session-closed", "wheel-session-closed", "dragons-den-placement-complete"','    "silph-co-choice-complete", "bulletin-quests-confirmed",\n    "wheel-session-closed", "dragons-den-placement-complete"',"operation hooks");
  s=rmTest(s,"obtaining every Encounter result completes the linked Action operation");
  s=rep(s,'test("phase advancement is blocked while a V1 Action operation is unresolved", () => {','test("phase advancement is blocked while a current Action operation is unresolved", () => {',"operation title");
  s=rmTest(s,"Hidden Grotto supports direct type choice starts");
  for(const x of[
    '  assert.match(appSource, /function startEncounterSession\\(\\{ skipConfirmCheck = false \\} = \\{\\}\\)\\//);',
    '  assert.match(appSource, /startEncounterSession\\(\\{ skipConfirmCheck: true \\}\\)\\//);',
    '  assert.match(appSource, /if \\(!startEncounterSession\\([\\s\\S]*throw new Error\\("The Encounter location could not start\\."\\)\\//);',
    '  assert.match(appSource, /if \\(location\\?\\.id === "encounter"\\)[\\s\\S]*await persistStartedActionDestination\\(\\);[\\s\\S]*return;/);'
  ])s=line(s,x,1,`stale assertion ${x}`);
  absent(s,["startHiddenGrottoSession","startEncounterSession","encounter-session-closed","hidden-grotto-choice-complete","V1 Action operation"],"action operations"); edits.set("scripts/test-action-operation-contract.js",s);
  return edits;
};
