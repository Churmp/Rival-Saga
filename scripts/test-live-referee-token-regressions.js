"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");

const contract = require("../token-effect-contract.js");
const { startTemporaryServer, stopTemporaryServer } = require("./token-controller-test-fixture.js");

const appSource = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");

test("[LRR-001] exact inventory records require a canonical Token effect", () => {
  assert.equal(contract.inventoryDefinitionFor({ id: "owned-toxic-1", name: "Toxic Curse", type: "TOKEN" })?.id, "toxic-curse");
  assert.equal(contract.inventoryDefinitionFor({ id: "owned-toxic-2", canonicalId: "toxic-curse", type: "TOKEN" })?.id, "toxic-curse");
  assert.equal(contract.inventoryDefinitionFor({ id: "protection-category", name: "Protection Token", type: "TOKEN" }), null);
  assert.equal(contract.inventoryDefinitionFor({ id: "curse-category", name: "Curses", type: "TOKEN" }), null);
});

test("[LRR-002] Sabotage legality belongs to Curse contracts, not Control categories", () => {
  ["toxic-curse", "iron-ball-curse", "flame-curse", "silencing-curse", "imprison-curse"].forEach((id) => {
    const definition = contract.definitionFor(id);
    assert.equal(definition.timingWindows.includes("sabotage"), true, `${id} should expose its explicit Sabotage Curse window.`);
    assert.equal(definition.legalControlContexts.includes("sabotageCurseWindow"), true);
    assert.equal(definition.timingPermissions.sabotageCurseWindow, true);
  });
  assert.equal(contract.definitionFor("wicked-blow").timingWindows.includes("sabotage"), false);
  assert.equal(contract.definitionFor("payday-field"), null);
});

test("[LRR-003] blocked inventory effects fail while completed exact-inventory responses remain usable", () => {
  assert.equal(contract.activationUsabilityFor("foresight-curse").ok, false);
  assert.equal(contract.activationUsabilityFor("seven-tools").ok, true);
  assert.equal(contract.activationUsabilityFor("counterspell").ok, true);
  assert.equal(contract.activationUsabilityFor("toxic-curse").ok, true);
});

test("[LRR-004] the production picker counts canonical inventory records and renders category headings as text", () => {
  assert.match(appSource, /const definition = liveRefereeInventoryTokenContract\(item\);\s*if \(!definition\) return;/);
  assert.match(appSource, /existing\.items\.push\(item\);\s*existing\.count \+= 1;/);
  assert.match(appSource, /<h3>\$\{escapeHtml\(tokenTimingCategoryLabel\(category\)\)\}<\/h3>/);
  assert.doesNotMatch(appSource, /data-live-referee-effect-pick="Protection Token"/);
  assert.match(appSource, /No usable tokens right now\./);
});

test("[LRR-005] Wicked Blow renders a loading state and awaits the shared build-data loader before eligibility", () => {
  assert.match(appSource, /function requestLiveRefereeWickedBlowData\(\)/);
  assert.match(appSource, /ensurePokemonBuildDataLoaded\(\{ renderOnLoad: false \}\)/);
  assert.match(appSource, /if \(!pokemonBuildDataReady\(\)\) \{\s*requestLiveRefereeWickedBlowData\(\);/);
  assert.match(appSource, /if \(!liveRefereeWickedBlowDataReady\(\)\) return \[\];/);
  assert.match(appSource, /await pickLiveRefereeEffect\(refereeEffectPick\);/);
  assert.match(appSource, /metadata\.id === "wicked-blow"\) await requestLiveRefereeWickedBlowData\(\)/);
});

test("[LRR-006] the production server serves the authoritative build-data asset used by lazy hydration", async (context) => {
  const server = await startTemporaryServer("live-referee-build-data");
  context.after(() => stopTemporaryServer(server));
  const response = await fetch(`${server.baseUrl}/pokemon-build-data.js?v=7`);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") || "", /javascript/);
  const text = await response.text();
  assert.match(text.slice(0, 200), /const rivalSagaBuildData/);
  assert.match(text, /window\.rivalSagaBuildData = rivalSagaBuildData/);
});
