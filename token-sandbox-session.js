(function registerRivalSagaTokenSandbox(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.rivalSagaTokenSandbox = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function createRivalSagaTokenSandboxApi() {
  "use strict";

  function cloneValue(value) {
    if (typeof structuredClone === "function") return structuredClone(value);
    return JSON.parse(JSON.stringify(value));
  }

  function defaultSessionId() {
    const suffix = Math.random().toString(36).slice(2, 8);
    return `sandbox-${Date.now()}-${suffix}`;
  }

  const clientOnlyStateKeys = Object.freeze([
    "activePlayerId",
    "activePage",
    "activeView",
    "activeShop",
    "tokenShopCategoryFilter",
    "shopSort",
    "shopExpandedChoiceGroups",
    "shopCart",
    "activityLogCollapsed",
    "activityLogFilters",
    "activityResponseDrawerOpen",
    "liveRefereeCollapsed",
    "liveRefereeX",
    "liveRefereeY",
    "liveRefereeWidth",
    "liveRefereeHeight",
    "liveRefereeScreen",
    "liveRefereeSelectedEffectName",
    "activityToasts",
    "wheelDrawerOpen",
    "selectedWheelSessionId",
    "skipWheelAnimation",
    "randomPokemonDrawerOpen",
    "selectedRandomPokemonSessionId",
    "opponentDrawer"
  ]);

  function restoreRecordCollection(candidate, baseline, key, recordIds) {
    if (!Array.isArray(candidate?.[key]) || !Array.isArray(baseline?.[key]) || !recordIds.size) return;
    const baselineById = new Map(baseline[key]
      .filter((record) => recordIds.has(String(record?.id || "")))
      .map((record) => [String(record.id), record]));
    candidate[key] = candidate[key].map((record) => {
      const baselineRecord = baselineById.get(String(record?.id || ""));
      return baselineRecord ? cloneValue(baselineRecord) : record;
    });
  }

  function prepareCommitCandidate({ workingState, baselineState } = {}) {
    if (!workingState || !baselineState) throw new Error("Working and baseline states are required.");
    const candidate = cloneValue(workingState);
    const baseline = cloneValue(baselineState);
    const scenario = candidate.testingTools?.activeScenario || {};
    const suppressedEventIds = new Set((scenario.suppressedInteractionEventIds || []).map(String));
    restoreRecordCollection(candidate, baseline, "interactionEvents", suppressedEventIds);
    candidate.testingTools = cloneValue(baseline.testingTools || {
      ignoreTurnOrder: false,
      freeMode: false,
      controlledPlayerId: "",
      activeScenario: null
    });
    clientOnlyStateKeys.forEach((key) => {
      if (baseline[key] === undefined) delete candidate[key];
      else candidate[key] = cloneValue(baseline[key]);
    });
    candidate.liveTable = {
      ...(candidate.liveTable || {}),
      currentPendingEventId: baseline.liveTable?.currentPendingEventId || "",
      resolutionAnnouncements: cloneValue(baseline.liveTable?.resolutionAnnouncements || [])
    };
    return candidate;
  }

  function committedSessionRecord(authoritativePayload, sessionId) {
    const id = String(sessionId || "");
    if (!id) return null;
    const records = [
      ...(Array.isArray(authoritativePayload?.sandboxCommits) ? authoritativePayload.sandboxCommits : []),
      ...(Array.isArray(authoritativePayload?.state?.sandboxCommitHistory) ? authoritativePayload.state.sandboxCommitHistory : [])
    ];
    return records.find((record) => String(record?.sessionId || "") === id) || null;
  }

  async function synchronizeConnectedRevision({ connectedRevision = 0, loadedRevision = 0, loadAuthoritative } = {}) {
    const connected = Number(connectedRevision || 0);
    const loaded = Number(loadedRevision || 0);
    if (connected <= loaded) return { reloaded: false, revision: Math.max(connected, loaded) };
    if (typeof loadAuthoritative !== "function") throw new Error("A loader is required for a newer connected revision.");
    const result = await loadAuthoritative(connected);
    return { reloaded: true, revision: Number(result?.version || connected), result };
  }

  function createSessionManager({ clone = cloneValue, createSessionId = defaultSessionId, now = () => new Date().toISOString() } = {}) {
    let session = null;

    function info() {
      if (!session) return null;
      return {
        id: session.id,
        scenarioName: session.scenarioName,
        controlledPlayerId: session.controlledPlayerId,
        controlledPlayerName: session.controlledPlayerName,
        entryRevision: session.entryRevision,
        revisionVerified: session.revisionVerified,
        persistenceQuiescent: session.persistenceQuiescent,
        status: session.status,
        startedAt: session.startedAt,
        remoteEventCount: session.remoteEvents.length,
        lastError: session.lastError
      };
    }

    function enter({ realState, revision = 0, revisionVerified = false, persistenceQuiescent = false, scenarioName = "Token Scenario", controlledPlayerId = "", controlledPlayerName = "" } = {}) {
      if (session) throw new Error("A Token sandbox session is already active.");
      if (!realState || typeof realState !== "object" || Array.isArray(realState)) throw new Error("A real-state object is required.");
      const baselineState = clone(realState);
      session = {
        id: createSessionId(),
        scenarioName: String(scenarioName || "Token Scenario"),
        controlledPlayerId: String(controlledPlayerId || ""),
        controlledPlayerName: String(controlledPlayerName || ""),
        entryRevision: Number(revision || 0),
        revisionVerified: Boolean(revisionVerified),
        persistenceQuiescent: Boolean(persistenceQuiescent),
        status: "active",
        startedAt: now(),
        baselineState,
        workingState: clone(baselineState),
        remoteEvents: [],
        lastError: ""
      };
      return { info: info(), workingState: session.workingState };
    }

    function setWorkingState(nextState) {
      if (!session) return nextState;
      session.workingState = nextState;
      return session.workingState;
    }

    function baselineState() {
      return session ? clone(session.baselineState) : null;
    }

    function bufferRemoteEvent(payload) {
      if (!session) return false;
      session.remoteEvents.push(clone(payload));
      return true;
    }

    function canPersistGameplay({ sessionId = "" } = {}) {
      if (!session) return true;
      return session.status === "committing" && session.id === String(sessionId || "");
    }

    function beginCommit({ currentRevision, workingState } = {}) {
      if (!session) return { ok: false, reason: "inactive" };
      if (!session.revisionVerified) return { ok: false, reason: "revision-unavailable", expectedRevision: session.entryRevision };
      const actualRevision = Number(currentRevision || 0);
      if (actualRevision !== session.entryRevision) {
        session.status = "conflict";
        session.lastError = `Real state changed from revision ${session.entryRevision} to ${actualRevision}.`;
        return { ok: false, reason: "revision-conflict", expectedRevision: session.entryRevision, actualRevision };
      }
      session.status = "committing";
      session.lastError = "";
      if (workingState) session.workingState = workingState;
      return {
        ok: true,
        sessionId: session.id,
        expectedRevision: session.entryRevision,
        state: clone(session.workingState)
      };
    }

    function commitFailed(error = "Commit failed.") {
      if (!session) return null;
      session.status = "active";
      session.lastError = String(error?.message || error || "Commit failed.");
      return info();
    }

    function completeCommit() {
      if (!session) return null;
      const completed = info();
      session = null;
      return completed;
    }

    function discard({ authoritativeState = null } = {}) {
      if (!session) return { state: authoritativeState ? clone(authoritativeState) : null, usedFallback: false, info: null };
      const discarded = info();
      const usedFallback = !authoritativeState;
      const nextState = clone(authoritativeState || session.baselineState);
      session = null;
      return { state: nextState, usedFallback, info: discarded };
    }

    return Object.freeze({
      isActive: () => Boolean(session),
      info,
      enter,
      setWorkingState,
      baselineState,
      bufferRemoteEvent,
      canPersistGameplay,
      beginCommit,
      commitFailed,
      completeCommit,
      discard
    });
  }

  return Object.freeze({
    createSessionManager,
    prepareCommitCandidate,
    committedSessionRecord,
    synchronizeConnectedRevision,
    clientOnlyStateKeys
  });
});
