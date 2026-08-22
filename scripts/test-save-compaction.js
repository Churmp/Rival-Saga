const assert = require("node:assert/strict");
const test = require("node:test");

const saveCompaction = require("../save-compaction.js");

function phaseSnapshot({ inventories, phase = "action", marker = "before" } = {}) {
  return {
    series: "Hoenn",
    gym: 8,
    currentPhase: phase,
    phaseState: { marker },
    seriesOrder: ["Hoenn"],
    seriesChoiceRequired: false,
    momentum: { gold: 2, silver: 1 },
    inventories,
    pokemonRecords: [{ id: "pokemon-1", name: "Pikachu" }],
    lingeringStatuses: []
  };
}

test("phase undo stores changed fields instead of duplicate full snapshots", () => {
  const inventory = [{ id: "item-1", description: "x".repeat(10000) }];
  const undoData = {
    actionType: "undoPhaseAdvance",
    previousState: phaseSnapshot({ inventories: { gold: inventory, silver: [] } }),
    newState: phaseSnapshot({ inventories: { gold: inventory, silver: [] }, phase: "battle", marker: "after" })
  };
  const beforeBytes = Buffer.byteLength(JSON.stringify(undoData));
  assert.equal(saveCompaction.compactUndoData(undoData), true);
  const afterBytes = Buffer.byteLength(JSON.stringify(undoData));
  assert.equal(undoData.newState, undefined);
  assert.equal(undoData.previousState.inventories, undefined);
  assert.equal(undoData.previousState.pokemonRecords, undefined);
  assert.deepEqual(undoData.previousState.phaseState, { marker: "before" });
  assert.ok(afterBytes < beforeBytes / 10);
});

test("phase undo retains only the previous inventory for players changed by the transition", () => {
  const undoData = {
    actionType: "undoPhaseAdvance",
    previousState: phaseSnapshot({ inventories: { gold: [{ id: "token-1" }], silver: [{ id: "item-1" }] } }),
    newState: phaseSnapshot({ inventories: { gold: [], silver: [{ id: "item-1" }] }, phase: "battle", marker: "after" })
  };
  saveCompaction.compactUndoData(undoData);
  assert.deepEqual(undoData.previousState.inventories, { gold: [{ id: "token-1" }] });
});

test("only the newest bounded set remains undoable while older rows stay as history", () => {
  const state = {
    log: Array.from({ length: 70 }, (_, index) => ({
      id: `log-${index + 1}`,
      eventOrder: index + 1,
      timestamp: new Date(2026, 0, index + 1).toISOString(),
      undoable: true,
      undone: false,
      undoData: { actionType: "removePokemonRecord", pokemonId: `pokemon-${index + 1}` }
    })),
    interactionEvents: []
  };
  const result = saveCompaction.compactUndoSnapshots(state, { maxUndoEntries: 50 });
  assert.equal(result.retainedUndoEntries, 50);
  assert.equal(state.log.filter((entry) => entry.undoData).length, 50);
  assert.equal(state.log.find((entry) => entry.id === "log-1").undoExpired, true);
  assert.equal(state.log.find((entry) => entry.id === "log-70").undoable, true);
});

test("terminal interaction records drop duplicate undo payloads", () => {
  const state = {
    log: [],
    interactionEvents: [
      { id: "resolved", status: "resolved", payload: { undoData: { actionType: "removePokemonRecord", pokemonId: "one" } } },
      { id: "open", status: "open", payload: { undoData: { actionType: "removePokemonRecord", pokemonId: "two" } } }
    ]
  };
  saveCompaction.compactUndoSnapshots(state);
  assert.equal(state.interactionEvents[0].payload.undoData, undefined);
  assert.equal(state.interactionEvents[1].payload.undoData.pokemonId, "two");
});
