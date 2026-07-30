(function registerRivalSagaTokenInventoryRuntime(root, factory) {
  const runtime = factory();
  if (typeof module === "object" && module.exports) module.exports = runtime;
  if (root) root.rivalSagaTokenInventoryRuntime = runtime;
})(typeof globalThis !== "undefined" ? globalThis : this, function createTokenInventoryRuntime() {
  "use strict";

  const RUNTIME_KINDS = Object.freeze({
    TEMPORARY_COPY: "temporaryCopy",
    COOLDOWN: "cooldown"
  });
  const RUNTIME_STATUSES = Object.freeze({
    ACTIVE: "active",
    EXPIRED: "expired"
  });
  const PHASE_ORDER = Object.freeze(["start", "action", "battle", "battle-results", "shop"]);

  function clone(value) {
    if (typeof structuredClone === "function") return structuredClone(value);
    return JSON.parse(JSON.stringify(value));
  }

  function contextRecord(context = {}) {
    return {
      series: String(context.series || ""),
      gym: Math.max(1, Number(context.gym || 1)),
      phase: String(context.phase || ""),
      seriesOrder: Array.isArray(context.seriesOrder) ? context.seriesOrder.map(String) : []
    };
  }

  function gymDistance(startSeries, startGym, endSeries, endGym, seriesOrder = []) {
    const startIndex = seriesOrder.indexOf(startSeries);
    const endIndex = seriesOrder.indexOf(endSeries);
    if (startIndex < 0 || endIndex < 0) {
      return startSeries === endSeries ? Math.max(0, Number(endGym) - Number(startGym)) : 1;
    }
    if (endIndex < startIndex) return 0;
    if (startIndex === endIndex) return Math.max(0, Number(endGym) - Number(startGym));
    return ((9 - Number(startGym)) + Number(endGym)) + ((endIndex - startIndex - 1) * 9);
  }

  function phaseAnchorReached(runtimeState, context = {}) {
    const current = contextRecord(context);
    const elapsed = gymDistance(
      runtimeState.createdSeries,
      runtimeState.createdGym,
      current.series,
      current.gym,
      current.seriesOrder
    );
    const duration = Math.max(0, Number(runtimeState.cooldownGyms || 0));
    if (elapsed > duration) return true;
    if (elapsed < duration) return false;
    const anchorIndex = PHASE_ORDER.indexOf(runtimeState.anchorPhase || "");
    const currentIndex = PHASE_ORDER.indexOf(current.phase || "");
    if (anchorIndex < 0 || currentIndex < 0) return runtimeState.anchorPhase === current.phase;
    return currentIndex >= anchorIndex;
  }

  function itemRuntimeState(item) {
    const value = item?.tokenRuntimeState;
    return value && typeof value === "object" && !Array.isArray(value) ? value : null;
  }

  function itemAvailability(item, context = {}) {
    const runtimeState = itemRuntimeState(item);
    if (!runtimeState) return { ok: true, status: "usable", reason: "", runtimeState };
    if (runtimeState.status === RUNTIME_STATUSES.EXPIRED) {
      return runtimeState.kind === RUNTIME_KINDS.COOLDOWN
        ? { ok: true, status: "cooldownComplete", reason: "", runtimeState }
        : { ok: false, status: "expired", reason: "This temporary copied Token has expired.", runtimeState };
    }
    if (runtimeState.kind === RUNTIME_KINDS.TEMPORARY_COPY) {
      const current = contextRecord(context);
      const sameGym = runtimeState.createdSeries === current.series
        && Number(runtimeState.createdGym) === Number(current.gym);
      return sameGym
        ? { ok: true, status: "temporary", reason: "Temporary copy available for this Gym.", runtimeState }
        : { ok: false, status: "expired", reason: "This temporary copied Token expired at the end of its creation Gym.", runtimeState };
    }
    if (runtimeState.kind === RUNTIME_KINDS.COOLDOWN) {
      return phaseAnchorReached(runtimeState, context)
        ? { ok: true, status: "cooldownComplete", reason: "", runtimeState }
        : {
          ok: false,
          status: "cooldown",
          reason: `This exact Token is on cooldown until the ${runtimeState.anchorPhase || "matching"} phase two Gyms after Counterspell.`,
          runtimeState
        };
    }
    return { ok: false, status: "blocked", reason: "This Token has an unknown runtime inventory state.", runtimeState };
  }

  function temporaryCopy(sourceItem, input = {}) {
    if (!sourceItem || !String(sourceItem.id || "").trim()) throw new Error("A temporary Token copy needs an exact source inventory record.");
    const now = input.createdAt || new Date().toISOString();
    const copy = clone(sourceItem);
    copy.id = String(input.id || `temporary-token-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
    copy.source = "7 Tools Of The Bandit temporary copy";
    copy.tokenRuntimeState = {
      kind: RUNTIME_KINDS.TEMPORARY_COPY,
      status: RUNTIME_STATUSES.ACTIVE,
      ownerPlayerId: String(input.ownerPlayerId || ""),
      sourceTokenId: String(sourceItem.id || ""),
      sourceDefinitionId: String(input.sourceDefinitionId || ""),
      sourceActivationId: String(input.sourceActivationId || ""),
      sourceResponseId: String(input.sourceResponseId || ""),
      createdSeries: String(input.series || ""),
      createdGym: Math.max(1, Number(input.gym || 1)),
      createdPhase: String(input.phase || ""),
      expiresAt: "endOfCreationGym",
      createdAt: now
    };
    return copy;
  }

  function cooldownRestoration(sourceItem, input = {}) {
    if (!sourceItem || !String(sourceItem.id || "").trim()) throw new Error("Counterspell needs the exact consumed Token inventory record.");
    const restored = clone(sourceItem);
    restored.source = restored.source || "Counterspell restoration";
    restored.tokenRuntimeState = {
      kind: RUNTIME_KINDS.COOLDOWN,
      status: RUNTIME_STATUSES.ACTIVE,
      ownerPlayerId: String(input.ownerPlayerId || ""),
      sourceTokenId: String(sourceItem.id || ""),
      sourceDefinitionId: String(input.sourceDefinitionId || ""),
      sourceActivationId: String(input.sourceActivationId || ""),
      sourceResponseId: String(input.sourceResponseId || ""),
      createdSeries: String(input.series || ""),
      createdGym: Math.max(1, Number(input.gym || 1)),
      createdPhase: String(input.phase || ""),
      anchorPhase: String(input.anchorPhase || input.phase || ""),
      cooldownGyms: Math.max(0, Number(input.cooldownGyms || 2)),
      createdAt: input.createdAt || new Date().toISOString()
    };
    return restored;
  }

  function expireInventory(players = [], context = {}, options = {}) {
    const removedTemporaryCopies = [];
    const completedCooldowns = [];
    const now = options.now || new Date().toISOString();
    (players || []).forEach((player) => {
      const retained = [];
      (player.inventory || []).forEach((item) => {
        const runtimeState = itemRuntimeState(item);
        if (!runtimeState || runtimeState.status === RUNTIME_STATUSES.EXPIRED) {
          retained.push(item);
          return;
        }
        const availability = itemAvailability(item, context);
        if (runtimeState.kind === RUNTIME_KINDS.TEMPORARY_COPY && !availability.ok) {
          removedTemporaryCopies.push({ playerId: player.id, item: clone(item) });
          return;
        }
        if (runtimeState.kind === RUNTIME_KINDS.COOLDOWN && availability.ok) {
          runtimeState.status = RUNTIME_STATUSES.EXPIRED;
          runtimeState.completedAt = now;
          completedCooldowns.push({ playerId: player.id, itemId: item.id, itemName: item.name || "Token" });
        }
        retained.push(item);
      });
      player.inventory = retained;
    });
    return { removedTemporaryCopies, completedCooldowns };
  }

  return Object.freeze({
    RUNTIME_KINDS,
    RUNTIME_STATUSES,
    PHASE_ORDER,
    gymDistance,
    phaseAnchorReached,
    itemRuntimeState,
    itemAvailability,
    temporaryCopy,
    cooldownRestoration,
    expireInventory
  });
});
