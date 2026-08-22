(function initRivalSagaSaveCompaction(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.rivalSagaSaveCompaction = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function createRivalSagaSaveCompaction() {
  const DEFAULT_UNDO_HISTORY_LIMIT = 50;
  const PHASE_UNDO_REQUIRED_KEYS = new Set([
    "series",
    "gym",
    "currentPhase",
    "phaseState",
    "seriesOrder",
    "seriesChoiceRequired"
  ]);
  const TERMINAL_ACTIVITY_STATUSES = new Set([
    "resolved",
    "negated",
    "expired",
    "undone",
    "withdrawn",
    "cancelled",
    "canceled",
    "canceledrefunded",
    "failed"
  ]);

  function isPlainObject(value) {
    return Boolean(value && typeof value === "object" && !Array.isArray(value));
  }

  function valuesEqual(left, right) {
    if (left === right) return true;
    if (left === undefined || right === undefined) return false;
    try {
      return JSON.stringify(left) === JSON.stringify(right);
    } catch {
      return false;
    }
  }

  function compactIdBackedSnapshot(undoData, fullKey, idsKey) {
    if (!Array.isArray(undoData[fullKey])) return false;
    undoData[idsKey] ||= undoData[fullKey].map((entry) => entry?.id).filter(Boolean);
    delete undoData[fullKey];
    return true;
  }

  function compactChangedPlayerMap(previousState, newState, key) {
    const previous = previousState[key];
    const next = newState[key];
    if (!isPlainObject(previous) || !isPlainObject(next)) return false;
    const changed = Object.fromEntries(Object.entries(previous)
      .filter(([playerId, value]) => !valuesEqual(value, next[playerId])));
    if (Object.keys(changed).length) previousState[key] = changed;
    else delete previousState[key];
    return true;
  }

  function compactPhaseAdvanceUndo(undoData) {
    if (undoData.actionType !== "undoPhaseAdvance" || !isPlainObject(undoData.previousState)) return false;
    const previousState = undoData.previousState;
    const newState = isPlainObject(undoData.newState) ? undoData.newState : null;
    let changed = false;
    if (newState) {
      if (compactChangedPlayerMap(previousState, newState, "inventories")) changed = true;
      if (compactChangedPlayerMap(previousState, newState, "momentum")) changed = true;
      Object.keys(previousState).forEach((key) => {
        if (PHASE_UNDO_REQUIRED_KEYS.has(key) || key === "inventories" || key === "momentum") return;
        if (!valuesEqual(previousState[key], newState[key])) return;
        delete previousState[key];
        changed = true;
      });
    }
    if (Object.prototype.hasOwnProperty.call(undoData, "newState")) {
      delete undoData.newState;
      changed = true;
    }
    return changed;
  }

  function compactUndoData(undoData) {
    if (!isPlainObject(undoData)) return false;
    let changed = false;
    changed = compactIdBackedSnapshot(undoData, "previousInteractionEvents", "previousInteractionEventIds") || changed;
    changed = compactIdBackedSnapshot(undoData, "previousTransactions", "previousTransactionIds") || changed;
    changed = compactPhaseAdvanceUndo(undoData) || changed;
    return changed;
  }

  function undoRecency(entry, index) {
    const eventOrder = Number(entry?.eventOrder || 0);
    const timestamp = Date.parse(entry?.timestamp || "") || 0;
    return { entry, index, eventOrder, timestamp };
  }

  function compactUndoSnapshots(state, { maxUndoEntries = DEFAULT_UNDO_HISTORY_LIMIT } = {}) {
    if (!isPlainObject(state)) return { changed: false, retainedUndoEntries: 0, expiredUndoEntries: 0 };
    const log = Array.isArray(state.log) ? state.log : [];
    const limit = Math.max(0, Number.isFinite(Number(maxUndoEntries)) ? Math.floor(Number(maxUndoEntries)) : DEFAULT_UNDO_HISTORY_LIMIT);
    const candidates = log
      .map(undoRecency)
      .filter(({ entry }) => entry?.undoable && !entry.undone && isPlainObject(entry.undoData))
      .sort((left, right) => right.eventOrder - left.eventOrder || right.timestamp - left.timestamp || left.index - right.index);
    const retained = new Set(candidates.slice(0, limit).map(({ entry }) => entry));
    let changed = false;
    let expiredUndoEntries = 0;

    log.forEach((entry) => {
      if (!isPlainObject(entry?.undoData)) return;
      changed = compactUndoData(entry.undoData) || changed;
      if (retained.has(entry)) return;
      delete entry.undoData;
      if (entry.undoable && !entry.undone) {
        entry.undoable = false;
        entry.undoExpired = true;
        entry.undoExpiredReason = `Only the latest ${limit} reversible events retain rollback data.`;
        expiredUndoEntries += 1;
      }
      changed = true;
    });

    (Array.isArray(state.interactionEvents) ? state.interactionEvents : []).forEach((activity) => {
      if (!isPlainObject(activity?.payload?.undoData)) return;
      const normalizedStatus = String(activity.status || activity.situation?.status || "").toLowerCase().replace(/[^a-z]/g, "");
      if (TERMINAL_ACTIVITY_STATUSES.has(normalizedStatus)) {
        delete activity.payload.undoData;
        changed = true;
        return;
      }
      changed = compactUndoData(activity.payload.undoData) || changed;
    });

    return {
      changed,
      retainedUndoEntries: retained.size,
      expiredUndoEntries
    };
  }

  return Object.freeze({
    DEFAULT_UNDO_HISTORY_LIMIT,
    compactUndoData,
    compactUndoSnapshots
  });
});
