const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const balance = require("../action-phase-balance.js");
const appSource = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");

test("Game Corner Ticket prices and Slot Machine weights are exact", () => {
  assert.deepEqual(balance.TICKET_TIERS.map(({ name, price }) => [name, price]), [
    ["Safari Ticket", 2000], ["Poké Ticket", 3000], ["Great Ticket", 5000],
    ["Ultra Ticket", 7000], ["Master Ticket", 9000]
  ]);
  assert.deepEqual(balance.SLOT_MACHINE_RESULTS.map(({ label, weight }) => [label, weight]), [
    ["Better Luck Next Time", 20], ["Safari Ticket", 30], ["Poké Ticket", 25],
    ["Great Ticket", 15], ["Ultra Ticket", 7], ["Master Ticket", 3]
  ]);
  assert.equal(balance.SLOT_MACHINE_RESULTS.reduce((sum, result) => sum + result.weight, 0), 100);
});

test("every Slot Machine result band is reachable deterministically", () => {
  assert.equal(balance.resultForRng(0).id, "nothing");
  assert.equal(balance.resultForRng(0.199999).id, "nothing");
  assert.equal(balance.resultForRng(0.2).id, "safari");
  assert.equal(balance.resultForRng(0.5).id, "poke");
  assert.equal(balance.resultForRng(0.75).id, "great");
  assert.equal(balance.resultForRng(0.9).id, "ultra");
  assert.equal(balance.resultForRng(0.97).id, "master");
});

test("Department Store normal savings cap supports exact and partial exhaustion", () => {
  assert.deepEqual(balance.normalDepartmentPrice(4000, 0), { listedPrice: 4000, discount: 1000, finalPrice: 3000, remainingAllowance: 2000 });
  assert.deepEqual(balance.normalDepartmentPrice(4000, 2500), { listedPrice: 4000, discount: 500, finalPrice: 3500, remainingAllowance: 0 });
  assert.deepEqual(balance.normalDepartmentPrice(4000, 3000), { listedPrice: 4000, discount: 0, finalPrice: 4000, remainingAllowance: 0 });
  assert.equal(balance.salePrice(1000), 750);
});

test("Clearance is half off with a $3,000 maximum discount", () => {
  assert.deepEqual(balance.clearancePrice(4000), { listedPrice: 4000, discount: 2000, finalPrice: 2000 });
  assert.deepEqual(balance.clearancePrice(10000), { listedPrice: 10000, discount: 3000, finalPrice: 7000 });
});

test("Elite Battle Tiers consolidate to their parent tier", () => {
  for (const [input, expected] of [
    ["Safari Elite", "safari"], ["Poké Elite", "poke"], ["Poke Elite", "poke"],
    ["Great Elite", "great"], ["Ultra Elite", "ultra"], ["Master Elite", "master"]
  ]) assert.equal(balance.consolidatedTier(input), expected);
});

test("Graveyard values and floor thresholds are exact", () => {
  assert.deepEqual(balance.GRAVEYARD_VALUES, { safari: 1500, poke: 2500, great: 3500, ultra: 5000, master: 7500 });
  assert.deepEqual([5000, 6000, 11500, 12000, 18500].map(balance.curseRolls), [0, 1, 1, 2, 3]);
});

test("Silph Co. and Dragon's Den Battle Tier prices are exact", () => {
  assert.deepEqual(balance.SILPH_COSTS, { safari: 1000, poke: 2000, great: 3000, ultra: 4000, master: 5000 });
  assert.deepEqual(balance.DRAGON_DEN_COSTS, { safari: 1000, poke: 1500, great: 2500, ultra: 4000, master: 6000 });
  assert.equal(balance.silphTotalCost(["Safari", "Great Elite", "Master"]), 9000);
});

test("runtime wiring persists random options, final sale, facility flags, and grouped undo", () => {
  assert.match(appSource, /clearanceProducts:\s*rolls/);
  assert.match(appSource, /clearance, finalSale: clearance/);
  assert.match(appSource, /normalSavingsUsed/);
  assert.match(appSource, /previousDepartmentStoreVisits/);
  assert.match(appSource, /rewardApplied:\s*false/);
  assert.match(appSource, /processAutomaticFacilityReturns\(\)/);
  assert.match(appSource, /developments, cost: totalCost/);
  assert.match(appSource, /rolledAbilities: randomUniqueSample[\s\S]*rolledMoves: randomUniqueSample/);
  assert.match(appSource, /type: isGameCorner \? "TICKET" : "TOKEN"/);
});

test("finalized Action lifecycles are reload-stable and idempotent", () => {
  assert.match(appSource, /deposit\.status !== "active" \|\| deposit\.rewardApplied \|\| !breederPickupEligible\(deposit\)/);
  assert.match(appSource, /deposit\.status = "completed";\s*deposit\.rewardApplied = true;/);
  assert.match(appSource, /session\.status !== "active" \|\| session\.returnApplied \|\| !dragonDenReturnEligible\(session\)/);
  assert.match(appSource, /session\.status = "completed";\s*session\.returnApplied = true;/);
  assert.match(appSource, /visit\.clearanceProducts \|\|= \[\];/);
  assert.match(appSource, /if \(entry\.finalSale \|\| entry\.clearance\) return false;/);
  assert.match(appSource, /pokemonIds: ids, developments, cost: totalCost/);
  const finalizedSilphRenderer = appSource.slice(appSource.lastIndexOf("function renderSilphCoDetails"), appSource.indexOf("async function startHiddenGrottoSession"));
  assert.doesNotMatch(finalizedSilphRenderer, /randomUniqueSample|data-silph-reroll/);
});

test("obsolete Move Dojo location and point discounts are no longer active", () => {
  const locationsBlock = appSource.slice(appSource.indexOf("const actionPhaseRules"), appSource.indexOf("const confirmedEventGuidance"));
  assert.doesNotMatch(locationsBlock, /id:\s*"move-dojo"/);
  assert.match(appSource, /function actionShopDiscountPercent[\s\S]*return 0;/);
  assert.match(appSource, /\["items", "tms"\].*locationId === "department-store"/);
});
