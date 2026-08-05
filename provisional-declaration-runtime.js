(function registerRivalSagaProvisionalDeclarationRuntime(root, factory) {
  const runtime = factory();
  if (typeof module === "object" && module.exports) module.exports = runtime;
  if (root) root.rivalSagaProvisionalDeclarationRuntime = runtime;
})(typeof globalThis !== "undefined" ? globalThis : this, function createProvisionalDeclarationRuntime() {
  "use strict";

  const DECLARATION_STAGES = Object.freeze({
    PROVISIONAL: "provisional",
    CONFIRMED: "confirmed",
    WITHDRAWN: "withdrawn"
  });
  const CONSUMPTION_STATES = Object.freeze({
    NOT_CONSUMED: "notConsumed",
    CONSUMED: "consumed"
  });
  const MUTATION_STATES = Object.freeze({
    NOT_STARTED: "notStarted",
    STARTED: "started",
    COMPLETED: "completed"
  });
  const DESTINATION_STATES = Object.freeze({
    ACCEPTED: "accepted",
    RESOLVING: "resolving",
    COMPLETED: "completed",
    RELEASED: "released"
  });
  const ORDINARY_CONTROL_CONTEXTS = Object.freeze({
    GYM_START_PREPARATION: "gymStartPreparationControl",
    ACTION_OPEN: "actionOpenControl",
    TEAM_BUILDING: "teamBuilding",
    SHOP: "shop",
    POST_BATTLE: "postBattleControl"
  });

  function clone(value) {
    if (typeof structuredClone === "function") return structuredClone(value);
    return JSON.parse(JSON.stringify(value));
  }

  function actionKey(series, gym) {
    return `${series}-G${Number(gym || 1)}`;
  }

  function phaseStateRecord(state = {}) {
    const series = String(state.series || "");
    const gym = Number(state.gym || 1);
    return state.phaseState?.[`${series}:G${gym}`]
      || state.phaseState?.[actionKey(series, gym)]
      || null;
  }

  function phaseFor(state = {}) {
    return String(phaseStateRecord(state)?.currentPhase || state.currentPhase || "");
  }

  function flowStateFor(state = {}, options = {}) {
    if (options.flowState) return String(options.flowState);
    return String(phaseStateRecord(state)?.flowState || "");
  }

  function actionGymState(state = {}, { create = false } = {}) {
    const key = actionKey(state.series, state.gym);
    if (create) {
      state.actionPhaseState ||= { selections: {}, seriesTrackers: {} };
      state.actionPhaseState.selections ||= {};
      state.actionPhaseState.selections[key] ||= {
        series: state.series,
        gym: Number(state.gym || 1),
        playerVisits: {},
        turnOrderPlayerIds: [],
        actionOperations: [],
        activeActionOperationId: "",
        destinationCommit: null
      };
    }
    return state.actionPhaseState?.selections?.[key] || null;
  }

  function activeVisit(visit = {}) {
    return !visit.undone
      && !visit.cancelled
      && !["undone", "cancelled"].includes(String(visit.status || "").toLowerCase());
  }

  function actionUsed(gymState, playerId) {
    return (gymState?.playerVisits?.[playerId] || [])
      .filter(activeVisit)
      .reduce((total, visit) => total + Math.max(0, Number(visit.actionCost || 1)), 0);
  }

  function activeActionOperation(gymState) {
    const operations = Array.isArray(gymState?.actionOperations) ? gymState.actionOperations : [];
    return operations.find((entry) => entry.id === gymState?.activeActionOperationId && entry.status === "resolving")
      || operations.find((entry) => entry.status === "resolving")
      || null;
  }

  function actionDecisionContext(state = {}, options = {}) {
    const actionsPerPlayer = Math.max(1, Number(options.actionsPerPlayer || 3));
    const gymState = actionGymState(state) || {};
    const playerIds = new Set((state.players || []).map((player) => String(player.id || "")).filter(Boolean));
    const order = (gymState.turnOrderPlayerIds || []).map(String).filter((id) => playerIds.has(id));
    const operation = activeActionOperation(gymState);
    if (operation) {
      return {
        phase: phaseFor(state),
        series: state.series || "",
        gym: Number(state.gym || 1),
        currentPlayerId: String(operation.playerId || ""),
        actionNumber: Math.max(1, Number(operation.actionNumber || actionUsed(gymState, operation.playerId))),
        allComplete: false,
        operation,
        gymState
      };
    }
    const totalUsed = order.reduce((total, playerId) => total + actionUsed(gymState, playerId), 0);
    const allComplete = !order.length || order.every((playerId) => actionUsed(gymState, playerId) >= actionsPerPlayer);
    if (allComplete) {
      return {
        phase: phaseFor(state), series: state.series || "", gym: Number(state.gym || 1),
        currentPlayerId: "", actionNumber: 0, allComplete: true, operation: null, gymState
      };
    }
    for (let offset = 0; offset < order.length; offset += 1) {
      const playerId = order[(totalUsed + offset) % order.length];
      const used = actionUsed(gymState, playerId);
      if (used < actionsPerPlayer) {
        return {
          phase: phaseFor(state), series: state.series || "", gym: Number(state.gym || 1),
          currentPlayerId: playerId, actionNumber: used + 1, allComplete: false, operation: null, gymState
        };
      }
    }
    return {
      phase: phaseFor(state), series: state.series || "", gym: Number(state.gym || 1),
      currentPlayerId: "", actionNumber: 0, allComplete: true, operation: null, gymState
    };
  }

  function isProvisionalActivity(activity = {}) {
    return activity.type === "provisional-effect-declaration"
      && activity.payload?.declarationStage === DECLARATION_STAGES.PROVISIONAL
      && String(activity.status || "open") === "open";
  }

  function currentProvisional(state = {}) {
    return (state.interactionEvents || []).find(isProvisionalActivity) || null;
  }

  function blockingActivity(state = {}, isBlocking = null) {
    return (state.interactionEvents || []).find((activity) => {
      if (typeof isBlocking === "function") return isBlocking(activity);
      return String(activity?.status || "open") === "open";
    }) || null;
  }

  function activeDestinationCommit(gymState = {}) {
    const commit = gymState.destinationCommit;
    return commit && [DESTINATION_STATES.ACCEPTED, DESTINATION_STATES.RESOLVING].includes(commit.status) ? commit : null;
  }

  function controlTimingStatus(state = {}, options = {}) {
    const decision = actionDecisionContext(state, options);
    if (decision.phase !== "action") return { open: false, reason: "Ordinary Control Timing is only open in the Action Phase decision window.", decision };
    if (decision.allComplete || !decision.currentPlayerId) return { open: false, reason: "The Action Phase has no remaining destination decision.", decision };
    if (decision.operation) return { open: false, reason: "A location operation is already active.", decision };
    const pending = blockingActivity(state, options.isBlocking);
    if (pending) return { open: false, reason: "A gameplay situation is already active.", decision, pending };
    const destinationCommit = activeDestinationCommit(decision.gymState);
    if (destinationCommit) return { open: false, reason: "The Action destination has already been committed.", decision, destinationCommit };
    return { open: true, reason: "", decision };
  }

  function ordinaryControlTimingStatus(state = {}, options = {}) {
    const phase = phaseFor(state);
    const flowState = flowStateFor(state, options);
    const decision = actionDecisionContext(state, options);
    const pending = blockingActivity(state, options.isBlocking);
    const externalBlockReason = typeof options.blockingReason === "function"
      ? String(options.blockingReason(state) || "")
      : String(options.blockingReason || "");

    if (pending) {
      return { open: false, reason: "A gameplay situation is already active.", phase, flowState, decision, pending };
    }
    if (externalBlockReason) {
      return { open: false, reason: externalBlockReason, phase, flowState, decision };
    }

    if (phase === "start" && flowState === "preGym") {
      return {
        open: true,
        reason: "",
        phase,
        flowState,
        context: ORDINARY_CONTROL_CONTEXTS.GYM_START_PREPARATION,
        provisionalDestinationRace: false,
        decision
      };
    }

    if (phase === "action") {
      if (decision.operation) {
        return { open: false, reason: "A location operation is already active.", phase, flowState, decision };
      }
      const destinationCommit = activeDestinationCommit(decision.gymState);
      if (destinationCommit) {
        return {
          open: false,
          reason: "The Action destination has already been committed.",
          phase,
          flowState,
          decision,
          destinationCommit
        };
      }
      return {
        open: true,
        reason: "",
        phase,
        flowState,
        context: ORDINARY_CONTROL_CONTEXTS.ACTION_OPEN,
        provisionalDestinationRace: Boolean(!decision.allComplete && decision.currentPlayerId),
        decision
      };
    }

    if (phase === "battle" && flowState === "teamBuild") {
      return {
        open: true,
        reason: "",
        phase,
        flowState,
        context: ORDINARY_CONTROL_CONTEXTS.TEAM_BUILDING,
        provisionalDestinationRace: false,
        decision
      };
    }

    if (phase === "shop" && flowState === "shopping") {
      return {
        open: true,
        reason: "",
        phase,
        flowState,
        context: ORDINARY_CONTROL_CONTEXTS.SHOP,
        provisionalDestinationRace: false,
        decision
      };
    }

    if (phase === "battle-results" && flowState === "gymPayout" && options.battlePayoutComplete) {
      return {
        open: true,
        reason: "",
        phase,
        flowState,
        context: ORDINARY_CONTROL_CONTEXTS.POST_BATTLE,
        provisionalDestinationRace: false,
        decision
      };
    }

    return {
      open: false,
      reason: "Ordinary Control Timing is closed during the current phase procedure.",
      phase,
      flowState,
      decision
    };
  }

  function normalizeDraftSelections(value = {}) {
    const source = value && typeof value === "object" && !Array.isArray(value) ? value : {};
    const cards = source.incinerateCards && typeof source.incinerateCards === "object" && !Array.isArray(source.incinerateCards)
      ? Object.fromEntries(Object.entries(source.incinerateCards).map(([playerId, card]) => [String(playerId), {
        category: ["all", "item", "tm"].includes(card?.category) ? card.category : "all",
        query: String(card?.query || "").slice(0, 100),
        resourceId: String(card?.resourceId || "")
      }]))
      : {};
    return {
      targetPokemonId: String(source.targetPokemonId || ""),
      targetPokemonIds: Array.isArray(source.targetPokemonIds) ? [...new Set(source.targetPokemonIds.map((id) => String(id || "")).filter(Boolean))] : [],
      selectedStatusId: String(source.selectedStatusId || ""),
      targetPlayerId: String(source.targetPlayerId || ""),
      targetPlayerIds: Array.isArray(source.targetPlayerIds) ? [...new Set(source.targetPlayerIds.map((id) => String(id || "")).filter(Boolean))] : [],
      targetText: String(source.targetText || "").slice(0, 160),
      notes: String(source.notes || "").slice(0, 500),
      resourceDefinitionId: String(source.resourceDefinitionId || ""),
      choiceKind: ["item", "tm"].includes(String(source.choiceKind || "").toLowerCase()) ? String(source.choiceKind).toLowerCase() : "",
      inventoryRecordId: String(source.inventoryRecordId || ""),
      moveName: String(source.moveName || "").slice(0, 120),
      resourceSelections: Array.isArray(source.resourceSelections) ? source.resourceSelections.map((entry) => ({
        playerId: String(entry?.playerId || ""),
        resourceId: String(entry?.resourceId || "")
      })).filter((entry) => entry.playerId && entry.resourceId) : [],
      incinerateCards: cards
    };
  }

  function createActivity(input = {}, now = new Date().toISOString()) {
    const declarationId = String(input.declarationId || `provisional-${Date.now()}`);
    const effectName = String(input.effectName || "Effect");
    const actorName = String(input.declaringPlayerName || "A player");
    const interruptedName = String(input.interruptedActionPlayerName || "the Action player");
    return {
      id: declarationId,
      type: "provisional-effect-declaration",
      title: `${actorName} is declaring ${effectName}.`,
      message: `${interruptedName}'s Action is paused while ${actorName} completes the declaration.`,
      actorPlayerId: String(input.declaringPlayerId || ""),
      targetPlayerId: "",
      sourceType: "provisional-declaration",
      sourceId: String(input.effectContractId || ""),
      responseTypes: [],
      eligiblePlayerIds: [],
      responses: [],
      transactions: [],
      promptPriority: {},
      promptResolutions: {},
      series: String(input.series || ""),
      gym: Math.max(1, Number(input.gym || 1)),
      phase: "action",
      status: "open",
      createdAt: now,
      updatedAt: now,
      payload: {
        liveTable: true,
        responsesAllowed: false,
        transactionsAllowed: false,
        provisionalDeclarationId: declarationId,
        declarationStage: DECLARATION_STAGES.PROVISIONAL,
        confirmationState: DECLARATION_STAGES.PROVISIONAL,
        consumptionState: CONSUMPTION_STATES.NOT_CONSUMED,
        mutationState: MUTATION_STATES.NOT_STARTED,
        effectContractId: String(input.effectContractId || ""),
        effectName,
        exactInventoryRecordId: String(input.inventoryRecordId || ""),
        declaringPlayerId: String(input.declaringPlayerId || ""),
        responsibleActorPlayerId: String(input.declaringPlayerId || ""),
        interruptedActionPlayerId: String(input.interruptedActionPlayerId || ""),
        interruptedContinuation: clone(input.interruptedContinuation || {}),
        timingContext: clone(input.timingContext || {}),
        draftSelections: normalizeDraftSelections(input.draftSelections),
        declarationRevision: 1,
        claimKey: String(input.claimKey || ""),
        createdAt: now,
        confirmedAt: "",
        withdrawnAt: ""
      },
      situation: {
        version: 1,
        status: "awaitingRequiredChoice",
        whatHappened: `${actorName} began declaring ${effectName}.`,
        actingPlayerId: String(input.declaringPlayerId || ""),
        requiredAction: `Complete the ${effectName} declaration or withdraw.`,
        blockingReason: `${interruptedName}'s destination decision is paused.`,
        resumesAfter: `Return to ${interruptedName}'s Action ${Math.max(1, Number(input.interruptedContinuation?.actionNumber || 1))} destination decision.`,
        tokenConsumed: false,
        mutationState: MUTATION_STATES.NOT_STARTED,
        mutationsStarted: false,
        mutationsCompleted: false,
        completionKey: "",
        failureReason: "",
        updatedAt: now
      }
    };
  }

  function updateDraft(activity, draftSelections, expectedRevision, now = new Date().toISOString()) {
    if (!isProvisionalActivity(activity)) return { ok: false, reason: "not-provisional", activity };
    const currentRevision = Math.max(1, Number(activity.payload?.declarationRevision || 1));
    if (Number(expectedRevision) !== currentRevision) return { ok: false, reason: "revision-conflict", currentRevision, activity };
    activity.payload.draftSelections = normalizeDraftSelections(draftSelections);
    activity.payload.declarationRevision = currentRevision + 1;
    activity.updatedAt = now;
    activity.situation.updatedAt = now;
    return { ok: true, revision: activity.payload.declarationRevision, activity };
  }

  function markWithdrawn(activity, now = new Date().toISOString(), reason = "Player withdrew before confirmation.") {
    if (!isProvisionalActivity(activity)) return { ok: false, reason: "not-provisional", activity };
    activity.payload.declarationStage = DECLARATION_STAGES.WITHDRAWN;
    activity.payload.confirmationState = DECLARATION_STAGES.WITHDRAWN;
    activity.payload.withdrawnAt = now;
    activity.payload.withdrawalReason = reason;
    activity.status = "withdrawn";
    activity.updatedAt = now;
    activity.situation = {
      ...(activity.situation || {}),
      status: "withdrawn",
      actingPlayerId: "",
      requiredAction: "",
      blockingReason: "",
      tokenConsumed: false,
      mutationState: MUTATION_STATES.NOT_STARTED,
      mutationsStarted: false,
      mutationsCompleted: false,
      updatedAt: now
    };
    return { ok: true, activity };
  }

  function reserveDestination(state, input = {}, now = new Date().toISOString(), options = {}) {
    const timing = controlTimingStatus(state, options);
    const gymState = actionGymState(state, { create: true });
    const requestId = String(input.requestId || "");
    if (gymState.destinationCommit?.requestId === requestId && requestId) {
      return { ok: true, duplicate: true, commit: gymState.destinationCommit, timing };
    }
    if (!timing.open) return { ok: false, reason: timing.reason, timing };
    const destinationPlayerId = String(input.playerId || "");
    const expectedPlayerId = options.allowAnyActionPlayer ? destinationPlayerId : timing.decision.currentPlayerId;
    const expectedActionNumber = options.allowAnyActionPlayer
      ? actionUsed(gymState, destinationPlayerId) + 1
      : timing.decision.actionNumber;
    if (!destinationPlayerId || destinationPlayerId !== expectedPlayerId) {
      return { ok: false, reason: "The Action decision belongs to another player.", timing };
    }
    if (Number(input.actionNumber || 0) !== expectedActionNumber) {
      return { ok: false, reason: "The Action number is stale.", timing };
    }
    const commit = {
      id: String(input.commitId || `destination-${Date.now()}`),
      requestId,
      status: DESTINATION_STATES.ACCEPTED,
      playerId: String(input.playerId || ""),
      actionNumber: expectedActionNumber,
      locationId: String(input.locationId || ""),
      serviceId: String(input.serviceId || ""),
      acceptedAt: now,
      operationId: ""
    };
    gymState.destinationCommit = commit;
    return { ok: true, duplicate: false, commit, timing };
  }

  function releaseDestination(state, commitId, now = new Date().toISOString(), reason = "Action destination did not start.") {
    const gymState = actionGymState(state);
    const commit = gymState?.destinationCommit || null;
    if (!commit || String(commit.id || "") !== String(commitId || "")) {
      return { ok: false, reason: "destination-commit-not-found", commit };
    }
    if ([DESTINATION_STATES.COMPLETED, DESTINATION_STATES.RELEASED].includes(commit.status)) {
      return { ok: true, duplicate: true, commit };
    }
    if (commit.status === DESTINATION_STATES.RESOLVING || commit.operationId) {
      return { ok: false, reason: "destination-operation-started", commit };
    }
    commit.status = DESTINATION_STATES.RELEASED;
    commit.releasedAt = now;
    commit.releaseReason = String(reason || "Action destination did not start.");
    return { ok: true, duplicate: false, commit };
  }

  return Object.freeze({
    DECLARATION_STAGES,
    CONSUMPTION_STATES,
    MUTATION_STATES,
    DESTINATION_STATES,
    ORDINARY_CONTROL_CONTEXTS,
    actionKey,
    phaseStateRecord,
    phaseFor,
    actionGymState,
    actionUsed,
    activeActionOperation,
    actionDecisionContext,
    isProvisionalActivity,
    currentProvisional,
    blockingActivity,
    activeDestinationCommit,
    controlTimingStatus,
    ordinaryControlTimingStatus,
    normalizeDraftSelections,
    createActivity,
    updateDraft,
    markWithdrawn,
    reserveDestination,
    releaseDestination
  });
});
