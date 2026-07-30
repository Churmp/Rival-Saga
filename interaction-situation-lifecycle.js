(function initInteractionSituationLifecycle(globalScope, factory) {
  const api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (globalScope) globalScope.rivalSagaInteractionSituationLifecycle = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function createInteractionSituationLifecycle() {
  "use strict";

  const STATUSES = Object.freeze({
    PENDING: "pending",
    AWAITING_RESPONSE: "awaitingResponse",
    AWAITING_REQUIRED_CHOICE: "awaitingRequiredChoice",
    RESOLVING: "resolving",
    RESOLVED: "resolved",
    WITHDRAWN: "withdrawn",
    CANCELED_REFUNDED: "canceledRefunded",
    FAILED_RECOVERY_REQUIRED: "failedRecoveryRequired"
  });
  const MUTATION_STATES = Object.freeze({
    NOT_STARTED: "notStarted",
    STARTED: "started",
    COMPLETED: "completed",
    ROLLED_BACK: "rolledBack"
  });
  const TERMINAL_STATUSES = new Set([STATUSES.RESOLVED, STATUSES.WITHDRAWN, STATUSES.CANCELED_REFUNDED]);
  const VALID_STATUSES = new Set(Object.values(STATUSES));
  const VALID_MUTATION_STATES = new Set(Object.values(MUTATION_STATES));

  function cloneJson(value) {
    return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
  }

  function isMisroutedResponseActivity(record) {
    if (!record || typeof record !== "object" || Array.isArray(record)) return false;
    return Boolean(
      record.activity
      && record.respondingToPromptId
      && record.promptId
      && !record.actorPlayerId
      && !record.sourceType
      && ["pass", "response", "manual"].includes(String(record.type || "").toLowerCase())
    );
  }

  function cleanActivityRecords(records = []) {
    return (Array.isArray(records) ? records : []).filter((record) => !isMisroutedResponseActivity(record));
  }

  function currentPriorityPlayerId(activity) {
    const entries = Object.values(activity?.promptPriority || {}).filter((entry) => entry && typeof entry === "object");
    const active = entries.find((entry) => !entry.complete && entry.currentPriorityPlayerId);
    return String(active?.currentPriorityPlayerId || "");
  }

  function inferredStatus(activity, situation = {}) {
    const legacyStatus = String(activity?.status || "open");
    if (["resolved", "negated", "expired", "undone"].includes(legacyStatus)) return STATUSES.RESOLVED;
    if (legacyStatus === "withdrawn") return STATUSES.WITHDRAWN;
    if (legacyStatus === "canceled") return STATUSES.CANCELED_REFUNDED;
    if (VALID_STATUSES.has(situation.status)) return situation.status;
    if (activity?.payload?.requiredChoice || activity?.payload?.requiredChoiceText) return STATUSES.AWAITING_REQUIRED_CHOICE;
    if (currentPriorityPlayerId(activity) || (activity?.eligiblePlayerIds || []).length) return STATUSES.AWAITING_RESPONSE;
    return STATUSES.PENDING;
  }

  function normalizeSituation(activity, options = {}) {
    const source = activity?.situation && typeof activity.situation === "object" && !Array.isArray(activity.situation)
      ? activity.situation
      : {};
    let status = inferredStatus(activity, source);
    let mutationState = VALID_MUTATION_STATES.has(source.mutationState)
      ? source.mutationState
      : source.mutationsCompleted
        ? MUTATION_STATES.COMPLETED
        : source.mutationsStarted
          ? MUTATION_STATES.STARTED
          : MUTATION_STATES.NOT_STARTED;
    if (mutationState === MUTATION_STATES.COMPLETED && !TERMINAL_STATUSES.has(status)) status = STATUSES.RESOLVED;
    const tokenConsumed = source.tokenConsumed !== undefined
      ? Boolean(source.tokenConsumed)
      : Boolean(activity?.payload?.consumedTokenId || activity?.payload?.consumptionRecordId || activity?.payload?.tokenConsumptionIds?.length);
    const actingPlayerId = String(source.actingPlayerId || currentPriorityPlayerId(activity) || "");
    const requiredAction = String(source.requiredAction || (
      status === STATUSES.AWAITING_RESPONSE
        ? "Respond or choose No Response."
        : status === STATUSES.AWAITING_REQUIRED_CHOICE
          ? activity?.payload?.requiredChoiceText || "Complete the required choice."
          : status === STATUSES.RESOLVING
            ? "Wait for resolution to finish."
            : status === STATUSES.FAILED_RECOVERY_REQUIRED
              ? "A host must recover or cancel this event."
              : status === STATUSES.PENDING
                ? "Continue this situation in the Live Referee."
                : ""
    ));
    return {
      version: 1,
      status,
      whatHappened: String(source.whatHappened || activity?.title || activity?.message || "A gameplay situation is active."),
      actingPlayerId,
      requiredAction,
      blockingReason: String(source.blockingReason || (TERMINAL_STATUSES.has(status) ? "" : "This situation must reach a terminal state before gameplay advances.")),
      resumesAfter: String(source.resumesAfter || activity?.payload?.resumesAfter || "Return to the previous gameplay situation."),
      tokenConsumed,
      mutationState,
      mutationsStarted: mutationState === MUTATION_STATES.STARTED || mutationState === MUTATION_STATES.COMPLETED,
      mutationsCompleted: mutationState === MUTATION_STATES.COMPLETED,
      completionKey: String(source.completionKey || ""),
      failureReason: String(source.failureReason || ""),
      updatedAt: String(source.updatedAt || activity?.updatedAt || activity?.createdAt || options.now || "")
    };
  }

  function legacyStatusFor(situationStatus) {
    if (situationStatus === STATUSES.RESOLVED) return "resolved";
    if (situationStatus === STATUSES.WITHDRAWN) return "withdrawn";
    if (situationStatus === STATUSES.CANCELED_REFUNDED) return "canceled";
    return "open";
  }

  function syncActivity(activity, patch = {}, options = {}) {
    if (!activity || typeof activity !== "object") return null;
    const current = normalizeSituation(activity, options);
    const next = normalizeSituation({
      ...activity,
      situation: { ...current, ...patch, updatedAt: patch.updatedAt || options.now || current.updatedAt }
    }, options);
    activity.situation = next;
    activity.status = legacyStatusFor(next.status);
    return next;
  }

  function isTerminal(activity) {
    return TERMINAL_STATUSES.has(normalizeSituation(activity).status);
  }

  function isBlocking(activity) {
    return !isMisroutedResponseActivity(activity) && !isTerminal(activity);
  }

  function beginResolution(activity, completionKey, options = {}) {
    const situation = normalizeSituation(activity, options);
    if (situation.mutationState === MUTATION_STATES.COMPLETED && String(activity?.status || "open") === "open") {
      const reconciled = syncActivity(activity, {
        status: STATUSES.RESOLVED,
        requiredAction: "",
        blockingReason: ""
      }, options);
      return { allowed: false, reason: "already-completed", reconciled: true, situation: reconciled };
    }
    if (TERMINAL_STATUSES.has(situation.status)) return { allowed: false, reason: "terminal", situation };
    if (situation.status === STATUSES.RESOLVING && situation.completionKey === completionKey) {
      return { allowed: false, reason: "already-resolving", situation };
    }
    const next = syncActivity(activity, {
      status: STATUSES.RESOLVING,
      actingPlayerId: "",
      requiredAction: "Wait for resolution to finish.",
      completionKey: String(completionKey || situation.completionKey || ""),
      mutationState: MUTATION_STATES.STARTED,
      failureReason: ""
    }, options);
    return { allowed: true, reason: "", situation: next };
  }

  function markResolved(activity, patch = {}, options = {}) {
    return syncActivity(activity, {
      ...patch,
      status: STATUSES.RESOLVED,
      actingPlayerId: "",
      requiredAction: "",
      blockingReason: "",
      mutationState: MUTATION_STATES.COMPLETED,
      failureReason: ""
    }, options);
  }

  function markCanceledRefunded(activity, patch = {}, options = {}) {
    return syncActivity(activity, {
      ...patch,
      status: STATUSES.CANCELED_REFUNDED,
      actingPlayerId: "",
      requiredAction: "",
      blockingReason: "",
      mutationState: patch.mutationState || MUTATION_STATES.ROLLED_BACK,
      failureReason: ""
    }, options);
  }

  function markWithdrawn(activity, patch = {}, options = {}) {
    return syncActivity(activity, {
      ...patch,
      status: STATUSES.WITHDRAWN,
      actingPlayerId: "",
      requiredAction: "",
      blockingReason: "",
      tokenConsumed: false,
      mutationState: MUTATION_STATES.NOT_STARTED,
      failureReason: ""
    }, options);
  }

  function markFailed(activity, reason, patch = {}, options = {}) {
    return syncActivity(activity, {
      ...patch,
      status: STATUSES.FAILED_RECOVERY_REQUIRED,
      actingPlayerId: "",
      requiredAction: "A host must recover or cancel this event.",
      blockingReason: String(reason || "The controller could not safely finish this situation."),
      failureReason: String(reason || "The controller could not safely finish this situation.")
    }, options);
  }

  function recoveryPlan(activity) {
    const situation = normalizeSituation(activity);
    if (situation.mutationState === MUTATION_STATES.COMPLETED) {
      return { action: "closeResolved", refund: false, rollback: false };
    }
    if (situation.mutationState === MUTATION_STATES.STARTED) {
      return { action: "rollbackAndRefund", refund: situation.tokenConsumed, rollback: true };
    }
    return { action: "cancelAndRefund", refund: situation.tokenConsumed, rollback: false };
  }

  function restoreMutationSnapshot(targetState, snapshot, clone = cloneJson) {
    if (!targetState || !snapshot) return [];
    const fields = [
      ["players", "previousPlayers"],
      ["pokemonRecords", "previousPokemonRecords"],
      ["fieldTokens", "previousFieldTokens"],
      ["lingeringStatuses", "previousLingeringStatuses"],
      ["tokenActivations", "previousTokenActivations"],
      ["playerNotifications", "previousPlayerNotifications"],
      ["randomPokemonSessions", "previousRandomPokemonSessions"],
      ["globalPokemonRules", "previousGlobalPokemonRules"],
      ["banlistHistory", "previousBanlistHistory"],
      ["teambuilder", "previousTeambuilder"],
      ["battleTeams", "previousBattleTeams"],
      ["perkSystem", "previousPerkSystem"],
      ["classStateByPlayerId", "previousClassStateByPlayerId"],
      ["phaseState", "previousPhaseState"],
      ["effectAuditRecords", "previousEffectAuditRecords"],
      ["effectOperations", "previousEffectOperations"]
    ];
    const restored = [];
    fields.forEach(([stateKey, snapshotKey]) => {
      if (snapshot[snapshotKey] === undefined) return;
      targetState[stateKey] = clone(snapshot[snapshotKey]);
      restored.push(stateKey);
    });
    return restored;
  }

  function indicatorFor(activity, collapsed = false) {
    const situation = normalizeSituation(activity);
    return {
      visible: isBlocking(activity),
      collapsed: Boolean(collapsed),
      reopensSituationId: isBlocking(activity) ? String(activity?.id || "") : "",
      status: situation.status,
      text: situation.requiredAction || situation.whatHappened
    };
  }

  return Object.freeze({
    STATUSES,
    MUTATION_STATES,
    normalizeSituation,
    syncActivity,
    isTerminal,
    isBlocking,
    beginResolution,
    markResolved,
    markWithdrawn,
    markCanceledRefunded,
    markFailed,
    recoveryPlan,
    restoreMutationSnapshot,
    indicatorFor,
    isMisroutedResponseActivity,
    cleanActivityRecords
  });
});
