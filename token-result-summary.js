(function registerRivalSagaTokenResultSummary(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.rivalSagaTokenResultSummary = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function createTokenResultSummaryApi() {
  "use strict";

  const FINAL_OUTCOMES = Object.freeze({
    REJECTED: "rejected",
    WITHDRAWN: "withdrawn",
    NEGATED: "negated",
    BLOCKED: "blocked",
    REDIRECTED: "redirected",
    PARTIALLY_RESOLVED: "partiallyResolved",
    RESOLVED_NO_EFFECT: "resolvedNoEffect",
    CANCELED_REFUNDED: "canceledRefunded",
    RESOLVED: "resolved"
  });

  function clone(value) {
    if (value === undefined) return undefined;
    if (typeof structuredClone === "function") return structuredClone(value);
    return JSON.parse(JSON.stringify(value));
  }

  function unique(values = []) {
    return [...new Set((values || []).map((value) => String(value || "").trim()).filter(Boolean))];
  }

  function possessive(name = "") {
    const clean = String(name || "").trim();
    if (!clean) return "The table's";
    return `${clean}${/s$/i.test(clean) ? "'" : "'s"}`;
  }

  function playerName(state, playerId, fallback = "Unknown player") {
    return (state?.players || []).find((player) => player.id === playerId)?.name || fallback;
  }

  function speciesKey(value = "") {
    return String(value || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }

  function rosterInstancePresentation(state, rosterInstanceId = "") {
    const pokemon = (state?.pokemonRecords || []).find((record) => record.id === rosterInstanceId);
    if (!pokemon) return { label: "Selected Pokemon", ownerName: "", speciesName: "", distinction: "" };
    const ownerName = playerName(state, pokemon.trainerId, "Unknown player");
    const speciesName = pokemon.currentSpecies || pokemon.name || "Pokemon";
    const nickname = String(pokemon.nickname || "").trim();
    const matching = (state?.pokemonRecords || []).filter((record) => (
      record.trainerId === pokemon.trainerId
      && !["Released", "Removed"].includes(record.status)
      && speciesKey(record.currentSpecies || record.name) === speciesKey(speciesName)
    ));
    const activeRoster = (state?.pokemonRecords || []).filter((record) => (
      record.trainerId === pokemon.trainerId
      && !["Released", "Removed"].includes(record.status)
      && (record.rosterType || "Active") === "Active"
    ));
    const activeSlot = activeRoster.findIndex((record) => record.id === pokemon.id);
    const distinction = nickname
      ? nickname
      : matching.length > 1 && activeSlot >= 0
        ? `Active roster slot ${activeSlot + 1}`
        : "";
    const pokemonLabel = nickname ? `${nickname} (${speciesName})` : speciesName;
    return {
      label: `${possessive(ownerName)} ${pokemonLabel}${!nickname && distinction ? ` (${distinction})` : ""}`,
      ownerName,
      speciesName,
      distinction
    };
  }

  function normalizeResponseEffect(effect = {}) {
    return {
      effectId: String(effect.effectId || effect.id || ""),
      effectName: String(effect.effectName || effect.name || "Response"),
      actorId: String(effect.actorId || effect.playerId || ""),
      outcome: String(effect.outcome || "resolved"),
      selectedTargetType: String(effect.selectedTargetType || "currentPrompt"),
      selectedRosterInstanceId: String(effect.selectedRosterInstanceId || ""),
      selectedSpeciesId: String(effect.selectedSpeciesId || "")
    };
  }

  function normalizeTokenRecord(record = {}) {
    return {
      id: String(record.id || ""),
      tokenId: String(record.tokenId || ""),
      tokenName: String(record.tokenName || record.name || "Token"),
      playerId: String(record.playerId || ""),
      linkedEventId: String(record.linkedEventId || record.eventId || ""),
      linkedResponseId: String(record.linkedResponseId || record.responseId || ""),
      status: String(record.status || "consumed"),
      refundStatus: String(record.refundStatus || "not-refunded")
    };
  }

  function normalizeEffectOperation(operation = {}) {
    return {
      id: String(operation.id || ""),
      operationType: String(operation.operationType || ""),
      status: String(operation.status || "resolved"),
      sourceEffectId: String(operation.sourceEffectId || ""),
      sourceActivationId: String(operation.sourceActivationId || ""),
      sourceTokenName: String(operation.sourceTokenName || ""),
      sourcePlayerId: String(operation.sourcePlayerId || ""),
      targetPlayerId: String(operation.targetPlayerId || ""),
      targetObjectId: String(operation.targetObjectId || ""),
      targetObjectName: String(operation.targetObjectName || ""),
      replacementObjectName: String(operation.replacementObjectName || ""),
      objectCategory: String(operation.objectCategory || ""),
      previousOwnerPlayerId: String(operation.previousOwnerPlayerId || ""),
      newOwnerPlayerId: String(operation.newOwnerPlayerId || ""),
      previousLocation: String(operation.previousLocation || ""),
      newLocation: String(operation.newLocation || ""),
      protectionResult: String(operation.protectionResult || "notProtected"),
      tierCalculation: clone(operation.tierCalculation || {})
    };
  }

  function normalizeResultSummary(summary = {}) {
    const source = summary && typeof summary === "object" && !Array.isArray(summary) ? summary : {};
    const finalOutcome = Object.values(FINAL_OUTCOMES).includes(source.finalOutcome)
      ? source.finalOutcome
      : FINAL_OUTCOMES.RESOLVED;
    return {
      originalEffectId: String(source.originalEffectId || ""),
      originalEffectName: String(source.originalEffectName || "Effect"),
      originalActorId: String(source.originalActorId || ""),
      selectedTargetType: String(source.selectedTargetType || ""),
      selectedPlayerId: String(source.selectedPlayerId || ""),
      selectedRosterInstanceId: String(source.selectedRosterInstanceId || ""),
      selectedSpeciesId: String(source.selectedSpeciesId || ""),
      selectedTargetLabel: String(source.selectedTargetLabel || ""),
      applicationScope: String(source.applicationScope || ""),
      responseEffects: (source.responseEffects || []).map(normalizeResponseEffect),
      finalOutcome,
      resolvedByEffectId: String(source.resolvedByEffectId || ""),
      createdStatusIds: unique(source.createdStatusIds),
      removedStatusIds: unique(source.removedStatusIds),
      preventedMutationTypes: unique(source.preventedMutationTypes),
      consideredRosterInstanceIds: unique(source.consideredRosterInstanceIds),
      affectedRosterInstanceIds: unique(source.affectedRosterInstanceIds),
      excludedRosterInstanceIds: unique(source.excludedRosterInstanceIds),
      protectedRosterInstanceIds: unique(source.protectedRosterInstanceIds || source.excludedRosterInstanceIds),
      consumedSubstituteStatusIds: unique(source.consumedSubstituteStatusIds),
      fullyProtected: Boolean(source.fullyProtected),
      partiallyResolved: Boolean(source.partiallyResolved),
      consumedTokenRecords: (source.consumedTokenRecords || []).map(normalizeTokenRecord),
      refundedTokenRecords: (source.refundedTokenRecords || []).map(normalizeTokenRecord),
      continuation: String(source.continuation || ""),
      teamMutation: source.teamMutation ? clone(source.teamMutation) : null,
      compensationStatus: String(source.compensationStatus || ""),
      customization: source.customization ? clone(source.customization) : null,
      grantedCustomizations: clone(source.grantedCustomizations || []),
      operations: (source.operations || []).map(normalizeEffectOperation),
      protectionResult: String(source.protectionResult || ""),
      chainNodes: clone(source.chainNodes || []),
      createdAt: source.createdAt || new Date().toISOString()
    };
  }

  function responseEffectsForActivity(activity, resultData = {}) {
    const fromActivity = (activity?.responses || [])
      .filter((response) => response.type !== "pass" && !["canceled", "cancelled", "undone"].includes(String(response.status || "").toLowerCase()))
      .map((response) => normalizeResponseEffect({
        effectId: response.id,
        effectName: response.tokenName || response.note || response.type || "Response",
        actorId: response.playerId,
        outcome: response.resolutionOutcome === "negates-parent" || response.outcome === "negates-parent" ? "resolved" : response.resolutionOutcome || "resolved",
        selectedTargetType: response.selectedTargetType || "currentPrompt",
        selectedRosterInstanceId: response.selectedRosterInstanceId,
        selectedSpeciesId: response.selectedSpeciesId
      }));
    const merged = [...fromActivity, ...(resultData.responseEffects || []).map(normalizeResponseEffect)];
    const byId = new Map();
    merged.forEach((effect) => byId.set(effect.effectId || `${effect.effectName}:${effect.actorId}`, effect));
    return [...byId.values()];
  }

  function buildResultSummary({ state, activity, finalOutcome = FINAL_OUTCOMES.RESOLVED, resolvedByEffectId = "", resultData = {}, continuation = "" } = {}) {
    const payload = activity?.payload || {};
    const selectedRosterInstanceId = payload.selectedRosterInstanceId || payload.targetPokemonId || "";
    const target = rosterInstancePresentation(state, selectedRosterInstanceId);
    const responseEffects = responseEffectsForActivity(activity, resultData);
    const consumedTokenRecords = (resultData.consumedTokenRecords || (state?.tokenConsumptions || [])
      .filter((record) => (record.linkedEventId || record.eventId) === activity?.id))
      .map(normalizeTokenRecord);
    const refundedTokenRecords = (resultData.refundedTokenRecords || consumedTokenRecords
      .filter((record) => record.status === "refunded" || record.refundStatus === "refunded"))
      .map(normalizeTokenRecord);
    const originalEffectName = String(payload.tokenName || activity?.title || "Effect").trim();
    const selectedSpeciesId = String(payload.selectedSpeciesId || payload.speciesId || payload.speciesName || payload.targetPokemonName || target.speciesName || "");
    const chainNodes = [
      {
        kind: "original",
        effectId: activity?.id || "",
        effectName: originalEffectName,
        actorId: activity?.actorPlayerId || "",
        selectedTargetType: payload.selectedTargetType || payload.targetType || "",
        selectedRosterInstanceId,
        selectedSpeciesId
      },
      ...responseEffects.map((effect) => ({ kind: "response", ...effect })),
      { kind: "final", outcome: finalOutcome, resolvedByEffectId: resolvedByEffectId || "" }
    ];
    return normalizeResultSummary({
      originalEffectId: activity?.id || "",
      originalEffectName,
      originalActorId: activity?.actorPlayerId || "",
      selectedTargetType: payload.selectedTargetType || payload.targetType || "",
      selectedPlayerId: payload.targetPlayerId || activity?.targetPlayerId || "",
      selectedRosterInstanceId,
      selectedSpeciesId,
      selectedTargetLabel: selectedRosterInstanceId ? target.label : payload.targetPokemonName || payload.targetText || "",
      applicationScope: payload.applicationScope || payload.targetScope || "",
      responseEffects,
      finalOutcome,
      resolvedByEffectId,
      createdStatusIds: resultData.createdStatusIds || [],
      removedStatusIds: resultData.removedStatusIds || [],
      preventedMutationTypes: resultData.preventedMutationTypes || [],
      consideredRosterInstanceIds: resultData.consideredRosterInstanceIds || payload.consideredRosterInstanceIds || [],
      affectedRosterInstanceIds: resultData.affectedRosterInstanceIds || payload.affectedRosterInstanceIds || [],
      excludedRosterInstanceIds: resultData.excludedRosterInstanceIds || payload.excludedRosterInstanceIds || [],
      protectedRosterInstanceIds: resultData.protectedRosterInstanceIds || resultData.excludedRosterInstanceIds || payload.excludedRosterInstanceIds || [],
      consumedSubstituteStatusIds: resultData.consumedSubstituteStatusIds || [],
      fullyProtected: Boolean(resultData.fullyProtected),
      partiallyResolved: Boolean(resultData.partiallyResolved),
      consumedTokenRecords,
      refundedTokenRecords,
      continuation,
      teamMutation: resultData.teamMutation || null,
      compensationStatus: resultData.compensationStatus || "",
      customization: resultData.customization || null,
      grantedCustomizations: resultData.grantedCustomizations || [],
      operations: resultData.operations || [],
      protectionResult: resultData.protectionResult || "",
      chainNodes
    });
  }

  function outcomeLabel(outcome = "") {
    return {
      rejected: "Rejected",
      withdrawn: "Withdrawn",
      negated: "Negated",
      blocked: "Blocked",
      redirected: "Redirected",
      partiallyResolved: "Partially Resolved",
      resolvedNoEffect: "Resolved - No Effect",
      canceledRefunded: "Canceled And Refunded",
      resolved: "Resolved"
    }[outcome] || "Resolved";
  }

  function announcementForResult(summaryInput, state) {
    const summary = normalizeResultSummary(summaryInput);
    const actorName = playerName(state, summary.originalActorId, "The table");
    const target = rosterInstancePresentation(state, summary.selectedRosterInstanceId);
    const response = summary.responseEffects.find((effect) => effect.effectId === summary.resolvedByEffectId)
      || summary.responseEffects[summary.responseEffects.length - 1]
      || null;
    const responseActorName = response ? playerName(state, response.actorId, "A player") : "";
    const responseName = response?.effectName || "A response";
    const speciesName = target.speciesName || summary.selectedTargetLabel || summary.selectedSpeciesId || "the target";
    const consumed = summary.consumedTokenRecords.filter((record) => record.status !== "refunded");
    const refunded = summary.refundedTokenRecords;
    let title = `${possessive(actorName)} ${summary.originalEffectName} resolved.`;
    let detail = summary.selectedRosterInstanceId
      ? `This result applied only to ${target.label}.${summary.continuation ? ` ${summary.continuation}` : ""}`
      : summary.continuation || "The intended mutation completed.";

    if (summary.originalEffectName === "Incinerate" && summary.operations.length) {
      const destroyed = summary.operations
        .filter((operation) => operation.operationType === "destroyInventoryResource")
        .map((operation) => `${possessive(playerName(state, operation.targetPlayerId, "A rival"))} ${operation.targetObjectName}`);
      title = `${possessive(actorName)} Incinerate resolved.`;
      detail = `Incinerate destroyed ${destroyed.join(destroyed.length > 1 ? ", " : "")}.`;
    } else if (summary.originalEffectName === "Steal" && summary.operations.length) {
      const transfer = summary.operations.find((operation) => operation.operationType === "transferPokemonOwnership");
      if (transfer) {
        const previousOwnerName = playerName(state, transfer.previousOwnerPlayerId, "the previous owner");
        const newOwnerName = playerName(state, transfer.newOwnerPlayerId, actorName);
        title = `${newOwnerName} stole ${possessive(previousOwnerName)} ${transfer.targetObjectName}.`;
        detail = `${transfer.targetObjectName} moved from ${possessive(previousOwnerName)} ${transfer.previousLocation || "roster"} to ${possessive(newOwnerName)} ${transfer.newLocation || "Active roster"}.`;
      }
    } else if (summary.originalEffectName === "Wicked Blow" && summary.operations.length) {
      const reroll = summary.operations.find((operation) => operation.operationType === "rerollPokemon");
      if (reroll) {
        const ownerName = playerName(state, reroll.targetPlayerId, "the target player");
        const tier = reroll.tierCalculation || {};
        title = `${actorName} used Wicked Blow on ${possessive(ownerName)} ${reroll.targetObjectName}.`;
        detail = `${possessive(ownerName)} exact ${reroll.targetObjectName} roster instance became ${reroll.replacementObjectName}. ${tier.finalEvolutionTier || "Unknown final tier"} moved three ordered Battle Tier steps down to ${tier.replacementTier || "an unknown replacement tier"}.`;
      }
    } else if (summary.originalEffectName === "Arena Trap" && summary.teamMutation) {
      title = `${possessive(actorName)} Arena Trap resolved.`;
      detail = `${target.label} was added to ${possessive(target.ownerName)} Battle Phase team, locked against removal, and protected from Curses.`;
      if (summary.grantedCustomizations.length) {
        detail += ` Because it is at least two Battle Tier steps below the current Natural Battle Tier, it gained ${summary.grantedCustomizations.map((grant) => grant.label || grant.name || String(grant)).join(", ")}.`;
      } else if (summary.compensationStatus === "pendingChoice") {
        detail += ` ${target.ownerName} must choose one AAA-approved Ability or injectable move for the trapped Pokemon.`;
      } else if (summary.compensationStatus === "notRequired") {
        detail += " Its Battle Tier does not qualify for Arena Trap compensation.";
      }
      if (summary.teamMutation.repairRequired) detail += ` ${target.ownerName} must remove one unlocked Pokemon before Team Building can continue.`;
      if (summary.teamMutation.impossible) detail += " Forced members exceed the legal team size, so Team Lock remains unavailable.";
    } else if (summary.applicationScope === "globalSpecies"
      && /curse/i.test(summary.originalEffectName)
      && [FINAL_OUTCOMES.RESOLVED, FINAL_OUTCOMES.PARTIALLY_RESOLVED, FINAL_OUTCOMES.RESOLVED_NO_EFFECT].includes(summary.finalOutcome)) {
      const affectedLabels = summary.affectedRosterInstanceIds
        .map((id) => rosterInstancePresentation(state, id).label)
        .filter(Boolean);
      const consideredLabels = summary.consideredRosterInstanceIds
        .map((id) => rosterInstancePresentation(state, id).label)
        .filter(Boolean);
      const protectedLabels = summary.protectedRosterInstanceIds
        .map((id) => rosterInstancePresentation(state, id).label)
        .filter(Boolean);
      title = affectedLabels.length
        ? `${possessive(actorName)} ${summary.originalEffectName} resolved across ${speciesName}.`
        : `${possessive(actorName)} ${summary.originalEffectName} resolved with no affected ${speciesName}.`;
      detail = `Selected anchor: ${target.label}.`;
      if (consideredLabels.length) detail += ` Considered: ${consideredLabels.join(", ")}.`;
      if (affectedLabels.length) detail += ` Affected: ${affectedLabels.join(", ")}.`;
      if (protectedLabels.length) detail += ` Protected: ${protectedLabels.join(", ")}.`;
      if (summary.consumedSubstituteStatusIds.length) detail += ` ${summary.consumedSubstituteStatusIds.length} Substitute${summary.consumedSubstituteStatusIds.length === 1 ? " was" : "s were"} consumed.`;
    } else if (summary.finalOutcome === FINAL_OUTCOMES.NEGATED) {
      title = `${responseName} negated ${summary.originalEffectName}.`;
      detail = response
        ? `${responseActorName} used ${responseName}, preventing ${possessive(actorName)} ${summary.originalEffectName} from resolving.`
        : `${possessive(actorName)} ${summary.originalEffectName} was negated.`;
      if (/restrict/i.test(summary.originalEffectName)) detail += ` No ${speciesName} Restrict was created.`;
      if (/ban/i.test(summary.originalEffectName)) detail += ` No ${speciesName} Ban was created.`;
      if (consumed.length === 2) detail += " Both Tokens remain consumed.";
      else if (consumed.length) detail += ` ${consumed.map((record) => record.tokenName).join(" and ")} ${consumed.length === 1 ? "remains" : "remain"} consumed.`;
    } else if (summary.finalOutcome === FINAL_OUTCOMES.PARTIALLY_RESOLVED && summary.excludedRosterInstanceIds.length) {
      const protectedTarget = rosterInstancePresentation(state, summary.excludedRosterInstanceIds[0]);
      title = `${possessive(actorName)} ${summary.originalEffectName} partially resolved.`;
      detail = `${possessive(protectedTarget.ownerName)} Substitute was consumed, protecting ${protectedTarget.label}. ${summary.originalEffectName} still resolved against all other ${protectedTarget.speciesName}.`;
    } else if (summary.finalOutcome === FINAL_OUTCOMES.CANCELED_REFUNDED) {
      title = `${summary.originalEffectName} was canceled and refunded.`;
      detail = refunded.length
        ? `${refunded.map((record) => record.tokenName).join(" and ")} returned to ${refunded.length === 1 ? "its owner" : "their owners"}. No gameplay mutation was created.`
        : "The administrative cancellation created no gameplay mutation. No refundable Token record was found.";
    } else if (summary.finalOutcome === FINAL_OUTCOMES.RESOLVED_NO_EFFECT) {
      title = `${possessive(actorName)} ${summary.originalEffectName} resolved with no effect.`;
      detail = "The declaration was legal and remains consumed, but it created no gameplay mutation.";
    } else if (summary.finalOutcome === FINAL_OUTCOMES.BLOCKED) {
      title = `${possessive(actorName)} ${summary.originalEffectName} was blocked.`;
      detail = summary.protectionResult === "blockedByStickyHold"
        ? "Sticky Hold protected the target player's Pokemon from Steal."
        : "Protection prevented this effect from applying to its target.";
    }

    if (summary.continuation && !detail.includes(summary.continuation)) detail += ` ${summary.continuation}`;
    const cards = [];
    cards.push({ label: response ? "Original Actor" : "Actor", value: actorName });
    if (response) cards.push({ label: "Responder", value: responseActorName });
    if (summary.selectedTargetLabel) cards.push({ label: "Target", value: summary.selectedTargetLabel });
    const wickedBlowOperation = summary.originalEffectName === "Wicked Blow"
      ? summary.operations.find((operation) => operation.operationType === "rerollPokemon")
      : null;
    if (wickedBlowOperation) {
      cards.push({ label: "Original", value: wickedBlowOperation.targetObjectName });
      cards.push({ label: "Replacement", value: wickedBlowOperation.replacementObjectName });
      cards.push({ label: "Tier Roll", value: `${wickedBlowOperation.tierCalculation?.finalEvolutionTier || "Unknown"} -> ${wickedBlowOperation.tierCalculation?.replacementTier || "Unknown"}` });
    }
    if (summary.teamMutation) {
      cards.push({ label: "Team Result", value: "Forced And Locked" });
      cards.push({ label: "Protection", value: "Curse Immune" });
      cards.push({
        label: "Compensation",
        value: summary.grantedCustomizations.length
          ? summary.grantedCustomizations.map((grant) => grant.label || grant.name || String(grant)).join(", ")
          : summary.compensationStatus === "pendingChoice" ? "Choice Required" : "Not Required"
      });
    }
    cards.push({ label: "Outcome", value: outcomeLabel(summary.finalOutcome) });
    return { title, detail: detail.trim(), tone: summary.finalOutcome, cards, resultSummary: summary };
  }

  return Object.freeze({
    FINAL_OUTCOMES,
    possessive,
    playerName,
    rosterInstancePresentation,
    normalizeResultSummary,
    buildResultSummary,
    outcomeLabel,
    announcementForResult
  });
});
