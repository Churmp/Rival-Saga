const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const appSource = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
const cssSource = fs.readFileSync(path.join(__dirname, "..", "styles.css"), "utf8");

function context({ freeTesting, viewerLinkedPlayerId = "steevee", priorityPlayerId = "", actionPlayerId = "", taskPlayerId = "" }) {
  const currentDecisionPlayerId = priorityPlayerId || actionPlayerId || taskPlayerId || "";
  const controlledPlayerId = freeTesting && currentDecisionPlayerId ? currentDecisionPlayerId : viewerLinkedPlayerId;
  return {
    viewerLinkedPlayerId,
    currentDecisionPlayerId,
    controlledPlayerId,
    controlMode: freeTesting && currentDecisionPlayerId ? "freeTestingDecisionOwner" : "profile",
    allowed: !currentDecisionPlayerId || controlledPlayerId === currentDecisionPlayerId
  };
}

test("Free Testing controls the Action owner and consumes only that inventory", () => {
  const result = context({ freeTesting: true, actionPlayerId: "test-player-4" });
  const inventory = { steevee: 3, "test-player-4": 2 };
  inventory[result.controlledPlayerId] -= 1;
  assert.equal(result.controlledPlayerId, "test-player-4");
  assert.deepEqual(inventory, { steevee: 3, "test-player-4": 1 });
});

test("Action advancement moves controlled context", () => {
  assert.equal(context({ freeTesting: true, actionPlayerId: "p4" }).controlledPlayerId, "p4");
  assert.equal(context({ freeTesting: true, actionPlayerId: "p1" }).controlledPlayerId, "p1");
});

test("targeted pending effect controls the first priority player", () => {
  assert.equal(context({ freeTesting: true, priorityPlayerId: "target" }).controlledPlayerId, "target");
});

test("Pass moves control to the next eligible priority player", () => {
  const before = context({ freeTesting: true, priorityPlayerId: "p2" });
  const after = context({ freeTesting: true, priorityPlayerId: "p3" });
  assert.equal(before.controlledPlayerId, "p2");
  assert.equal(after.controlledPlayerId, "p3");
});

test("nested response uses child priority and restores parent priority", () => {
  const parent = context({ freeTesting: true, priorityPlayerId: "p2" });
  const child = context({ freeTesting: true, priorityPlayerId: "p4", actionPlayerId: "p1" });
  const resumed = context({ freeTesting: true, priorityPlayerId: "p2", actionPlayerId: "p1" });
  assert.deepEqual([parent.controlledPlayerId, child.controlledPlayerId, resumed.controlledPlayerId], ["p2", "p4", "p2"]);
});

test("opening and closing an unsubmitted Trade preserves the decision owner", () => {
  const before = context({ freeTesting: true, actionPlayerId: "p4" });
  const after = context({ freeTesting: true, actionPlayerId: "p4" });
  assert.equal(before.controlledPlayerId, after.controlledPlayerId);
});

test("unfinished Action operation stays authoritative outside nested responses", () => {
  assert.equal(context({ freeTesting: true, actionPlayerId: "p4" }).controlledPlayerId, "p4");
});

test("reload reconstructs context without click state", () => {
  const saved = JSON.stringify({ freeTesting: true, viewerLinkedPlayerId: "steevee", actionPlayerId: "p4" });
  assert.equal(context(JSON.parse(saved)).controlledPlayerId, "p4");
});

test("normal multiplayer viewer waits for another trainer's decision", () => {
  const result = context({ freeTesting: false, viewerLinkedPlayerId: "steevee", actionPlayerId: "p4" });
  assert.equal(result.controlledPlayerId, "steevee");
  assert.equal(result.allowed, false);
});

test("disabling Free Testing immediately returns control to the viewer trainer", () => {
  assert.equal(context({ freeTesting: true, viewerLinkedPlayerId: "steevee", actionPlayerId: "p4" }).controlledPlayerId, "p4");
  assert.equal(context({ freeTesting: false, viewerLinkedPlayerId: "steevee", actionPlayerId: "p4" }).controlledPlayerId, "steevee");
});

test("actor, consumption, pending event, log, and announcement share the draft actor", () => {
  assert.match(appSource, /return resolveTokenUse\(draft, \{ context: \{ pendingEvent: pending \} \}\)/);
  assert.match(appSource, /player: responder\.name/);
  assert.match(appSource, /actorPlayerId: draft\.actorPlayerId/);
  assert.doesNotMatch(appSource, /preferredId = testing\.freeMode \? testing\.controlledPlayerId/);
});

test("one context helper drives inventory, drafts, Trade, and pentagon badge", () => {
  assert.match(appSource, /function getLiveRefereeControlledPlayerContext\(/);
  assert.match(appSource, /function liveRefereeAvailableTokenGroups\(prompt, playerId = liveRefereeControlledPlayerId\(\)\)/);
  assert.match(appSource, /const actorPlayerId = liveRefereeSelectedPlayerId\(form\);/);
  assert.match(appSource, /function liveRefereeDealScreenMarkup\(prompt, selectedPlayerId = liveRefereeControlledPlayerId\(\)\)/);
  assert.match(appSource, /const controlledContext = getLiveRefereeControlledPlayerContext\(state, prompt\);/);
  assert.match(cssSource, /\.live-referee-player-node\.controlled\.free-testing-controlled::after\s*\{\s*content:\s*"CONTROLLED";/s);
});
