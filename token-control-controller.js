(function initRivalSagaTokenControlController(root, factory) {
  const effects = root?.rivalSagaControlTokenEffects
    || (typeof require === "function" ? require("./token-control-effects.js") : null);
  const contract = root?.rivalSagaTokenEffectContract
    || (typeof require === "function" ? require("./token-effect-contract.js") : null);
  const api = factory(effects, contract);
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.rivalSagaTokenControlController = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function createTokenControlController(effects, contract) {
  "use strict";

  if (!effects || !contract) throw new Error("Token Control controller dependencies are unavailable.");

  const STANDARD_CURSE_TOKEN_IDS = Object.freeze([
    "toxic-curse",
    "iron-ball-curse",
    "flame-curse",
    "silencing-curse",
    "imprison-curse"
  ]);

  const CONTROL_TOKEN_IDS = Object.freeze([
    "restrict-token",
    "unban-token",
    "arena-trap",
    "clear-smog",
    "rage-candy-bar",
    "extra-ban-token",
    "move-deleter",
    "cold-wave",
    "lingering-aroma",
    "purge-curse",
    "incinerate",
    "steal-token",
    "wicked-blow",
    "substitute",
    "knock-off-curse",
    "haze-curse",
    "devolve-token",
    "ditto-token",
    ...STANDARD_CURSE_TOKEN_IDS
  ]);

  function clone(value) {
    if (typeof structuredClone === "function") return structuredClone(value);
    return JSON.parse(JSON.stringify(value));
  }

  function slug(value = "") {
    return String(value || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }

  function unique(values = []) {
    return [...new Set((values || []).map((value) => String(value || "").trim()).filter(Boolean))];
  }

  function ensureState(state) {
    state.players ||= [];
    state.pokemonRecords ||= [];
    state.lingeringStatuses ||= [];
    state.globalPokemonRules ||= {};
    state.banlistHistory ||= [];
    state.interactionEvents ||= [];
    state.tokenActivations ||= [];
    state.tokenConsumptions ||= [];
    state.effectAuditRecords ||= [];
    state.effectOperations ||= [];
    state.delayedEffects ||= [];
    state.broughtTeamSnapshots ||= [];
    state.copiedActivations ||= [];
    state.copiedTokenRelationships ||= [];
    state.privateEffectRecords ||= [];
    state.encounterCopyRecords ||= [];
    state.postPayoutProcedures ||= [];
    return state;
  }

  function controllerOptions(state, overrides = {}) {
    return {
      state,
      series: overrides.series || state.series,
      gym: Number(overrides.gym || state.gym || 1),
      phase: overrides.phase || state.phase || "action",
      seriesOrder: overrides.seriesOrder || ["Kanto", "Johto", "Hoenn"],
      now: overrides.now || new Date().toISOString(),
      makeId: overrides.makeId || ((prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
      keyForSpecies: overrides.keyForSpecies || effects.defaultSpeciesKey,
      statusExpiresAt: overrides.statusExpiresAt || null,
      battleTeamKey: overrides.battleTeamKey || null,
      teamSizeForPlayer: overrides.teamSizeForPlayer || null,
      battleTierForPokemon: overrides.battleTierForPokemon || null,
      naturalBattleTier: overrides.naturalBattleTier || null,
      tierIndexForName: overrides.tierIndexForName || null,
      requiredBadgePointsForPokemon: overrides.requiredBadgePointsForPokemon || null,
      bringLegalityForPokemon: overrides.bringLegalityForPokemon || null,
      abilityExists: overrides.abilityExists || null,
      moveExists: overrides.moveExists || null,
      moveDeleterTimingCheck: overrides.moveDeleterTimingCheck || null,
      purgeTimingCheck: overrides.purgeTimingCheck || null,
      resourceDefinitionForName: overrides.resourceDefinitionForName || null,
      wickedBlowReplacementPlan: overrides.wickedBlowReplacementPlan || null,
      preEvolutionFor: overrides.preEvolutionFor || null,
      teamBuildSlotForPokemon: overrides.teamBuildSlotForPokemon || null,
      lockedTeamSlotsForPlayer: overrides.lockedTeamSlotsForPlayer || null,
      definitionFor: overrides.definitionFor || definitionFor
    };
  }

  function futureGymPosition(series, gym, durationGyms, seriesOrder = []) {
    let seriesIndex = Math.max(0, seriesOrder.indexOf(series));
    let nextGym = Number(gym || 1) + Number(durationGyms || 0);
    while (nextGym > 9 && seriesIndex < seriesOrder.length - 1) {
      nextGym -= 9;
      seriesIndex += 1;
    }
    return { expiresAtSeries: seriesOrder[seriesIndex] || series, expiresAtGym: nextGym };
  }

  function definitionFor(value) {
    return contract.definitionFor(value) || contract.definitions?.[slug(value)] || null;
  }

  function availablePokemon(state, id) {
    return (state.pokemonRecords || []).find((pokemon) => pokemon.id === id
      && !["Released", "Removed"].includes(pokemon.status));
  }

  function playerFor(state, id) {
    return (state.players || []).find((player) => player.id === id);
  }

  function inventoryTokenIndex(player, definition, tokenInventoryId = "") {
    const aliases = new Set([
      definition?.id,
      definition?.name,
      ...(definition?.aliases || [])
    ].map(slug).filter(Boolean));
    return (player?.inventory || []).findIndex((item) => {
      if (tokenInventoryId && item.id === tokenInventoryId) return true;
      return aliases.has(slug(item.name || item.id));
    });
  }

  function hasActiveSubstitute(state, pokemonId, options) {
    return effects.activeStatuses(state, options, (status) => (
      status.type === effects.CONTROL_STATUS_TYPES.SUBSTITUTE
      && status.targetPokemonId === pokemonId
    )).length > 0;
  }

  function legacyRuleStatus(state, speciesName, options = {}) {
    const key = (options.keyForSpecies || effects.defaultSpeciesKey)(speciesName);
    const rule = state.globalPokemonRules?.[key];
    return rule?.status || "Normal";
  }

  function validateCurseTarget(state, targetPokemonId, options = {}) {
    const pokemon = availablePokemon(state, targetPokemonId);
    if (!pokemon) return { ok: false, reason: "Choose an available roster Pokemon." };
    if (effects.pokemonHasArenaTrap(state, pokemon, controllerOptions(state, options))) {
      return { ok: false, reason: `${pokemon.name} is Arena Trapped and cannot be cursed.` };
    }
    return { ok: true, reason: "" };
  }

  function validateDeclaration(state, input = {}, options = {}) {
    ensureState(state);
    const definition = definitionFor(input.tokenId || input.tokenName);
    if (!definition || !CONTROL_TOKEN_IDS.includes(definition.id)) return { ok: false, reason: "This controller does not handle that Token." };
    const runtime = contract.activationUsabilityFor(definition);
    if (!runtime.ok) return { ok: false, reason: runtime.reason };
    const actor = playerFor(state, input.actorPlayerId);
    if (!actor) return { ok: false, reason: "Choose an acting player." };
    if (!input.isVirtualActivation && inventoryTokenIndex(actor, definition, input.tokenInventoryId) < 0) {
      return { ok: false, reason: `${actor.name || "The acting player"} does not own ${definition.name}.` };
    }
    const effectOptions = controllerOptions(state, options);
    const pokemon = availablePokemon(state, input.targetPokemonId);
    const targetPlayer = playerFor(state, input.targetPlayerId);
    const speciesName = String(input.speciesName || input.targetPokemonName || pokemon?.name || "").trim();
    const resourceName = String(input.resourceName || input.choice || input.notes || input.targetText || "").trim();
    if (["restrict-token", "unban-token"].includes(definition.id) && !speciesName) {
      return { ok: false, reason: `Choose a Pokemon species before using ${definition.name}.` };
    }
    if (definition.id === "purge-curse" && !targetPlayer) {
      return { ok: false, reason: "Choose one current player for Purge." };
    }
    if (definition.id === "purge-curse" && typeof effectOptions.purgeTimingCheck === "function") {
      const timing = effectOptions.purgeTimingCheck();
      if (!timing?.ok) return { ok: false, reason: timing?.reason || "Purge is no longer legal for this Battle Phase." };
    }
    if (definition.id === "move-deleter") {
      if (typeof effectOptions.moveDeleterTimingCheck === "function") {
        const timing = effectOptions.moveDeleterTimingCheck();
        if (!timing?.ok) return { ok: false, reason: timing?.reason || "Move Deleter cannot be used after team submission." };
      }
      if (!resourceName) return { ok: false, reason: "Choose one canonical move for Move Deleter." };
      if (typeof effectOptions.moveExists === "function" && !effectOptions.moveExists(resourceName)) {
        return { ok: false, reason: `${resourceName} is not in the canonical move list.` };
      }
    }
    if (definition.id === "lingering-aroma") {
      const targetEffect = effects.activeExplicitOngoingEffects(state, effectOptions)
        .find((status) => status.id === resourceName);
      if (!targetEffect) return { ok: false, reason: "Choose one active effect explicitly classified as an ongoing effect." };
    }
    if (["restrict-token", "extra-ban-token"].includes(definition.id)
      && speciesName
      && effects.speciesHasUnbanProtection(state, speciesName, effectOptions)) {
      return { ok: false, reason: `${speciesName} is protected from Ban and Restrict by Unban.` };
    }
    if (definition.id === "restrict-token" && (effects.activeSpeciesStatuses(state, speciesName, "restrict", effectOptions).length
      || legacyRuleStatus(state, speciesName, effectOptions) === "Restricted")) {
      return { ok: false, reason: `${speciesName} is already Restricted.` };
    }
    if (definition.id === "unban-token") {
      const active = effects.activeSpeciesStatuses(state, speciesName, ["ban", "restrict"], effectOptions);
      if (!active.length && !["Banned", "Restricted"].includes(legacyRuleStatus(state, speciesName, effectOptions))) {
        return { ok: false, reason: `${speciesName} has no active Ban or Restrict to remove.` };
      }
    }
    if (definition.id === "extra-ban-token") {
      if (!pokemon) return { ok: false, reason: "Choose a specific roster Pokemon as Extra Ban's declaration target." };
      if (effects.speciesHasBanPhaseProtection(state, speciesName, effectOptions)) {
        return { ok: false, reason: `${speciesName} cannot be banned again during this phase because Substitute protected it.` };
      }
    }
    if (["arena-trap", "clear-smog", "rage-candy-bar", "wicked-blow", "substitute", "knock-off-curse", "devolve-token", ...STANDARD_CURSE_TOKEN_IDS].includes(definition.id) && !pokemon) {
      return { ok: false, reason: `Choose a specific roster Pokemon for ${definition.name}.` };
    }
    if (definition.id === "steal-token" && !pokemon) {
      return { ok: false, reason: "Choose a specific roster Pokemon to Steal." };
    }
    if (definition.id === "arena-trap") {
      if (pokemon.trainerId === actor.id) return { ok: false, reason: "Arena Trap must target a rival player's Pokemon." };
      if (pokemon.rosterType && pokemon.rosterType !== "Active") {
        return { ok: false, reason: "Arena Trap must target a Pokemon in a rival player's Active roster." };
      }
      if (typeof effectOptions.bringLegalityForPokemon === "function") {
        const bringLegality = effectOptions.bringLegalityForPokemon(pokemon, actor.id);
        if (!bringLegality?.ok) return { ok: false, reason: bringLegality?.reason || `${pokemon.name} cannot currently be brought legally.` };
      }
    }
    if (["rage-candy-bar", "substitute"].includes(definition.id) && pokemon.trainerId !== actor.id) {
      return { ok: false, reason: `${definition.name} can only target a Pokemon owned by its user.` };
    }
    if (definition.id === "steal-token") {
      if (pokemon.trainerId === actor.id) return { ok: false, reason: "Steal must target another player's Pokemon." };
      if (effects.playerHasStickyHold(state, pokemon.trainerId)) {
        const owner = playerFor(state, pokemon.trainerId);
        return { ok: false, reason: `${owner?.name || "The target player"} is protected from Steal by Sticky Hold.` };
      }
    }
    if (definition.id === "wicked-blow") {
      if (input.targetPlayerId && pokemon.trainerId !== input.targetPlayerId) {
        return { ok: false, reason: "The selected Wicked Blow target does not belong to the recorded player." };
      }
      const plan = effects.wickedBlowResolutionPlan(state, pokemon, effectOptions, true);
      if (!plan.ok) return { ok: false, reason: plan.reason };
    }
    let resourceDefinition = null;
    let resourceSelections = [];
    if (STANDARD_CURSE_TOKEN_IDS.includes(definition.id)) {
      const curseTarget = effects.standardCurseTarget(state, pokemon, effectOptions);
      if (!curseTarget.ok) return { ok: false, reason: curseTarget.reason };
    }
    if (definition.id === "lingering-aroma") {
      const effect = effects.activeExplicitOngoingEffects(state).find((status) => status.id === resourceName);
      if (!effect || !effects.ongoingEffectBenefitsPlayer(effect, actor.id)) {
        return { ok: false, reason: "Choose one exact active ongoing effect attached to or benefiting this player." };
      }
    }
    if (definition.id === "haze-curse") {
      const ids = unique(input.targetPokemonIds || input.selectedRosterInstanceIds || []);
      const preview = effects.resolveHazeCurse(clone(state), { sourceEffectId: "validation", targetPokemonIds: ids }, effectOptions);
      if (preview.result === "systemFailure") return { ok: false, reason: preview.reason };
    }
    if (definition.id === "devolve-token") {
      const preview = effects.resolveDevolveCurse(clone(state), { sourceEffectId: "validation", targetPokemonId: pokemon?.id || "" }, effectOptions);
      if (preview.result === "systemFailure") return { ok: false, reason: preview.reason };
    }
    if (definition.id === "knock-off-curse") {
      const buildSlot = effectOptions.teamBuildSlotForPokemon?.(pokemon.trainerId, pokemon.id) || input.buildSlot || null;
      const preview = effects.resolveKnockOffCurse(clone(state), {
        sourceEffectId: "validation", targetPokemonId: pokemon?.id || "", choiceKind: input.choiceKind,
        inventoryRecordId: input.inventoryRecordId, moveName: input.moveName, buildSlot,
        lockedTeamSlots: effectOptions.lockedTeamSlotsForPlayer?.(pokemon.trainerId) || []
      }, effectOptions);
      if (preview.result === "systemFailure") return { ok: false, reason: preview.reason };
    }
    if (definition.id === "ditto-token") {
      resourceDefinition = definitionFor(input.resourceDefinitionId || resourceName);
      if (!resourceDefinition || resourceDefinition.id === "ditto-token" || contract.activationUsabilityFor(resourceDefinition).ok !== true) {
        return { ok: false, reason: "Choose one canonical activatable non-Ditto Token." };
      }
    }
    if (definition.id === "incinerate") {
      const validation = effects.validateIncinerateSelections(state, actor.id, input.resourceSelections);
      if (!validation.ok) return { ok: false, reason: validation.reason };
      resourceSelections = validation.selections;
    }
    if (definition.id === "substitute" && hasActiveSubstitute(state, pokemon.id, effectOptions)) {
      return { ok: false, reason: `${pokemon.name} already has a Substitute.` };
    }
    return { ok: true, reason: "", definition, actor, pokemon, speciesName, resourceName, resourceDefinition, resourceSelections };
  }

  function validateResolutionState(state, activity, options = {}) {
    ensureState(state);
    const definition = definitionFor(activity?.payload?.tokenId || activity?.payload?.tokenName);
    const actor = playerFor(state, activity?.actorPlayerId);
    const effectOptions = controllerOptions(state, options);
    if (!definition || !CONTROL_TOKEN_IDS.includes(definition.id)) return { ok: false, reason: "This controller does not handle that Token.", refund: true };
    if (!actor) return { ok: false, reason: "The acting player is no longer available.", refund: true };
    const pokemon = availablePokemon(state, activity?.payload?.targetPokemonId);
    if (definition.id === "arena-trap") {
      if (!pokemon) return { ok: false, reason: "The selected Arena Trap target is no longer available.", refund: true };
      if (pokemon.trainerId === actor.id) return { ok: false, reason: "The selected Arena Trap target is no longer a rival Pokemon.", refund: true };
      if (pokemon.rosterType && pokemon.rosterType !== "Active") {
        return { ok: false, reason: "The selected Arena Trap target is no longer in the rival's Active roster.", refund: true };
      }
      if (typeof effectOptions.bringLegalityForPokemon === "function") {
        const bringLegality = effectOptions.bringLegalityForPokemon(pokemon, actor.id);
        if (!bringLegality?.ok) return { ok: false, reason: bringLegality?.reason || `${pokemon.name} can no longer be brought legally.`, refund: true };
      }
    }
    if (definition.id === "steal-token") {
      if (!pokemon) return { ok: false, reason: "The selected Steal target is no longer available.", refund: true };
      if (pokemon.trainerId === actor.id) return { ok: false, reason: "The selected Pokemon is no longer owned by another player.", refund: true };
      if (effects.playerHasStickyHold(state, pokemon.trainerId)) {
        const owner = playerFor(state, pokemon.trainerId);
        return {
          ok: false,
          reason: `${owner?.name || "The target player"} is protected from Steal by Sticky Hold.`,
          refund: false,
          protectionResult: "blockedByStickyHold"
        };
      }
    }
    if (STANDARD_CURSE_TOKEN_IDS.includes(definition.id)) {
      const activeTarget = effects.wickedBlowActiveRosterTarget(state, pokemon, effectOptions);
      if (!activeTarget.ok) return { ok: false, reason: activeTarget.reason, refund: true };
    }
    if (definition.id === "haze-curse") {
      const preview = effects.resolveHazeCurse(clone(state), { sourceEffectId: `${activity.id}:validation`, targetPokemonIds: activity.payload?.selectedRosterInstanceIds || [] }, effectOptions);
      if (preview.result === "systemFailure") return { ok: false, reason: preview.reason, refund: true };
    }
    if (definition.id === "devolve-token") {
      const preview = effects.resolveDevolveCurse(clone(state), { sourceEffectId: `${activity.id}:validation`, targetPokemonId: pokemon?.id || "" }, effectOptions);
      if (preview.result === "systemFailure") return { ok: false, reason: preview.reason, refund: true };
    }
    if (definition.id === "knock-off-curse") {
      const buildSlot = effectOptions.teamBuildSlotForPokemon?.(pokemon?.trainerId, pokemon?.id) || activity.payload?.buildSlot || null;
      const preview = effects.resolveKnockOffCurse(clone(state), {
        sourceEffectId: `${activity.id}:validation`, targetPokemonId: pokemon?.id || "", choiceKind: activity.payload?.choiceKind,
        inventoryRecordId: activity.payload?.inventoryRecordId, moveName: activity.payload?.moveName, buildSlot,
        lockedTeamSlots: effectOptions.lockedTeamSlotsForPlayer?.(pokemon?.trainerId) || []
      }, effectOptions);
      if (preview.result === "systemFailure") return { ok: false, reason: preview.reason, refund: true };
    }
    if (definition.id === "incinerate") {
      const validation = effects.validateIncinerateSelections(state, actor.id, activity?.payload?.resourceSelections);
      if (!validation.ok) return { ok: false, reason: validation.reason, refund: true };
    }
    if (definition.id === "move-deleter") {
      if (typeof effectOptions.moveDeleterTimingCheck === "function") {
        const timing = effectOptions.moveDeleterTimingCheck();
        if (!timing?.ok) return { ok: false, reason: timing?.reason || "Move Deleter cannot be used after team submission.", refund: true };
      }
      const moveName = String(activity?.payload?.resourceName || "").trim();
      if (!moveName || (typeof effectOptions.moveExists === "function" && !effectOptions.moveExists(moveName))) {
        return { ok: false, reason: "The selected Move Deleter move is no longer canonical.", refund: true };
      }
    }
    if (definition.id === "lingering-aroma") {
      const targetEffectId = String(activity?.payload?.resourceName || "").trim();
      if (!effects.activeExplicitOngoingEffects(state, effectOptions).some((status) => status.id === targetEffectId)) {
        return { ok: false, reason: "The selected ongoing effect is no longer active or eligible.", refund: true };
      }
    }
    if (definition.id === "purge-curse" && typeof effectOptions.purgeTimingCheck === "function") {
      const timing = effectOptions.purgeTimingCheck();
      if (!timing?.ok) return { ok: false, reason: timing?.reason || "Purge is no longer legal for this Battle Phase.", refund: true };
    }
    if (definition.id === "wicked-blow") {
      if (!pokemon) return { ok: false, reason: "The selected Wicked Blow target is no longer available.", refund: true };
      if (activity.targetPlayerId && pokemon.trainerId !== activity.targetPlayerId) {
        return { ok: false, reason: "The selected Wicked Blow target changed owners before resolution.", refund: true };
      }
      const plan = effects.wickedBlowResolutionPlan(state, pokemon, effectOptions, true);
      if (!plan.ok) return { ok: false, reason: plan.reason, refund: true };
    }
    return { ok: true, reason: "", definition, actor, pokemon };
  }

  function recordRuleChange(state, speciesName, action, source = {}, options = {}) {
    const effectOptions = controllerOptions(state, options);
    const key = effectOptions.keyForSpecies(speciesName);
    const previous = state.globalPokemonRules[key] || { name: speciesName, status: "Normal", banCount: 0, restrictCount: 0 };
    const normalizedAction = action === "Banned" && previous.banCount ? "Re-banned"
      : action === "Restricted" && previous.restrictCount ? "Re-restricted"
        : action;
    const status = ["Banned", "Re-banned"].includes(normalizedAction) ? "Banned"
      : ["Restricted", "Re-restricted"].includes(normalizedAction) ? "Restricted"
        : normalizedAction === "Unbanned" ? "Unbanned" : "Normal";
    const rule = {
      ...previous,
      name: previous.name || speciesName,
      status,
      banCount: Number(previous.banCount || 0) + (["Banned", "Re-banned"].includes(normalizedAction) ? 1 : 0),
      restrictCount: Number(previous.restrictCount || 0) + (["Restricted", "Re-restricted"].includes(normalizedAction) ? 1 : 0),
      lastAction: normalizedAction,
      lastSeries: effectOptions.series,
      lastGym: effectOptions.gym,
      lastTimestamp: effectOptions.now,
      durationGyms: source.durationGyms || null,
      expiresAtSeries: source.expiresAtSeries || "",
      expiresAtGym: source.expiresAtGym || null,
      sourceType: "token",
      sourceTokenId: source.sourceTokenId || "",
      sourceTokenName: source.sourceTokenName || "",
      sourceStatusId: source.sourceStatusId || ""
    };
    const entry = {
      id: effectOptions.makeId("banlist"),
      pokemonName: speciesName,
      pokemonNameKey: key,
      action: normalizedAction,
      series: effectOptions.series,
      gym: effectOptions.gym,
      timestamp: effectOptions.now,
      sourceType: "token",
      sourceTokenId: source.sourceTokenId || "",
      sourceTokenName: source.sourceTokenName || "",
      sourceStatusId: source.sourceStatusId || ""
    };
    state.globalPokemonRules[key] = rule;
    state.banlistHistory.unshift(entry);
    return { rule, entry };
  }

  function resolveFoundationActivity(state, activity, options = {}) {
    ensureState(state);
    const definition = definitionFor(activity?.payload?.tokenId || activity?.payload?.tokenName);
    if (!definition || !CONTROL_TOKEN_IDS.includes(definition.id) || definition.id === "substitute") return null;
    const effectOptions = controllerOptions(state, options);
    const pokemon = availablePokemon(state, activity.payload?.targetPokemonId);
    const speciesName = String(activity.payload?.speciesName || activity.payload?.targetPokemonName || pokemon?.name || "").trim();
    const source = {
      sourceTokenId: activity.payload?.consumedTokenId || "",
      sourceTokenName: definition.name,
      actorPlayerId: activity.actorPlayerId,
      actorPlayerName: playerFor(state, activity.actorPlayerId)?.name || "",
      sourceEffectId: activity.id,
      sourceActivationId: (state.tokenActivations || []).find((activation) => activation.eventId === activity.id)?.id || ""
    };
    const expiration = (durationGyms) => effectOptions.statusExpiresAt?.(durationGyms)
      || futureGymPosition(effectOptions.series, effectOptions.gym, durationGyms, effectOptions.seriesOrder);
    let resolution;
    let ruleChange = null;
    if (definition.id === "restrict-token") {
      const expires = expiration(2);
      resolution = effects.resolveRestrict(state, {
        ...source,
        speciesName,
        ...expires,
        targetPlayerId: activity.targetPlayerId || "",
        selectedRosterInstanceIds: activity.payload?.selectedRosterInstanceIds || [],
        affectedRosterInstanceIds: activity.payload?.affectedRosterInstanceIds || [],
        excludedRosterInstanceIds: activity.payload?.excludedRosterInstanceIds || [],
        hasLegacyRestriction: legacyRuleStatus(state, speciesName, effectOptions) === "Restricted"
      }, effectOptions);
      if (resolution.result === "resolved") ruleChange = { speciesName, action: "Restricted", status: resolution.status, durationGyms: 2 };
    } else if (definition.id === "unban-token") {
      const expires = expiration(6);
      resolution = effects.resolveUnban(state, {
        ...source,
        speciesName,
        ...expires,
        eventId: activity.id,
        hasLegacyRestriction: ["Banned", "Restricted"].includes(legacyRuleStatus(state, speciesName, effectOptions))
      }, effectOptions);
      if (resolution.result === "resolved") ruleChange = { speciesName, action: "Unbanned", status: resolution.status, durationGyms: 6 };
    } else if (definition.id === "extra-ban-token") {
      resolution = effects.resolveExtraBan(state, {
        ...source,
        targetPokemonId: pokemon?.id || "",
        selectedRosterInstanceId: activity.payload?.selectedRosterInstanceId || pokemon?.id || "",
        selectedRosterInstanceIds: activity.payload?.selectedRosterInstanceIds || [pokemon?.id].filter(Boolean),
        affectedRosterInstanceIds: activity.payload?.affectedRosterInstanceIds || [],
        excludedRosterInstanceIds: activity.payload?.excludedRosterInstanceIds || [],
        hasLegacyBan: legacyRuleStatus(state, speciesName, effectOptions) === "Banned"
      }, effectOptions);
      if (resolution.result === "resolved") ruleChange = { speciesName, action: "Banned", status: resolution.status };
    } else if (definition.id === "move-deleter") {
      resolution = effects.resolveMoveDeleter(state, {
        ...source,
        moveName: activity.payload?.resourceName || "",
        consumptionRecordId: activity.payload?.consumptionRecordId || ""
      }, effectOptions);
    } else if (definition.id === "cold-wave") {
      resolution = effects.resolveColdWave(state, {
        ...source,
        consumptionRecordId: activity.payload?.consumptionRecordId || ""
      }, effectOptions);
    } else if (definition.id === "lingering-aroma") {
      resolution = effects.resolveLingeringAroma(state, {
        ...source,
        targetEffectId: activity.payload?.resourceName || "",
        beneficiaryPlayerId: activity.actorPlayerId,
        consumptionRecordId: activity.payload?.consumptionRecordId || ""
      }, effectOptions);
    } else if (definition.id === "purge-curse") {
      resolution = effects.resolvePurgeMarker(state, {
        ...source,
        targetPlayerId: activity.targetPlayerId || activity.payload?.targetPlayerId || "",
        consumptionRecordId: activity.payload?.consumptionRecordId || ""
      }, effectOptions);
    } else if (definition.id === "arena-trap") {
      resolution = effects.resolveArenaTrap(state, { ...source, targetPokemonId: pokemon?.id || "" }, effectOptions);
    } else if (definition.id === "clear-smog") {
      resolution = effects.resolveClearSmog(state, { ...source, targetPokemonId: pokemon?.id || "" }, effectOptions);
    } else if (definition.id === "rage-candy-bar") {
      const expires = expiration(2);
      resolution = effects.resolveRageCandyBar(state, {
        ...source,
        ...expires,
        targetPokemonId: pokemon?.id || "",
        requiredOwnerPlayerId: activity.actorPlayerId
      }, effectOptions);
    } else if (definition.id === "incinerate") {
      resolution = effects.resolveIncinerate(state, {
        ...source,
        resourceSelections: activity.payload?.resourceSelections || [],
        consumptionRecordId: activity.payload?.consumptionRecordId || ""
      }, effectOptions);
    } else if (definition.id === "steal-token") {
      resolution = effects.resolveStealPokemon(state, {
        ...source,
        targetPokemonId: pokemon?.id || "",
        effectTags: definition.effectTags || [],
        consumptionRecordId: activity.payload?.consumptionRecordId || ""
      }, effectOptions);
    } else if (definition.id === "wicked-blow") {
      resolution = effects.resolveWickedBlow(state, {
        ...source,
        targetPokemonId: pokemon?.id || "",
        targetOwnerPlayerId: activity.targetPlayerId || pokemon?.trainerId || "",
        consumptionRecordId: activity.payload?.consumptionRecordId || ""
      }, effectOptions);
    } else if (definition.id === "haze-curse") {
      resolution = effects.resolveHazeCurse(state, {
        ...source,
        targetPokemonIds: activity.payload?.selectedRosterInstanceIds || [],
        consumptionRecordId: activity.payload?.consumptionRecordId || ""
      }, effectOptions);
    } else if (definition.id === "devolve-token") {
      resolution = effects.resolveDevolveCurse(state, {
        ...source,
        targetPokemonId: pokemon?.id || "",
        consumptionRecordId: activity.payload?.consumptionRecordId || ""
      }, effectOptions);
    } else if (definition.id === "knock-off-curse") {
      const ownerId = pokemon?.trainerId || activity.targetPlayerId || "";
      resolution = effects.resolveKnockOffCurse(state, {
        ...source,
        targetPokemonId: pokemon?.id || "",
        choiceKind: activity.payload?.choiceKind,
        inventoryRecordId: activity.payload?.inventoryRecordId,
        moveName: activity.payload?.moveName,
        buildSlot: effectOptions.teamBuildSlotForPokemon?.(ownerId, pokemon?.id) || activity.payload?.buildSlot || null,
        lockedTeamSlots: effectOptions.lockedTeamSlotsForPlayer?.(ownerId) || [],
        consumptionRecordId: activity.payload?.consumptionRecordId || ""
      }, effectOptions);
    } else if (STANDARD_CURSE_TOKEN_IDS.includes(definition.id)) {
      const expires = expiration(2);
      resolution = effects.resolveStandardCurse(state, {
        ...source,
        tokenId: definition.id,
        targetPokemonId: pokemon?.id || "",
        durationGyms: 2,
        expiresAtSeries: expires.expiresAtSeries,
        expiresAtGym: expires.expiresAtGym,
        expiresAtPhase: effectOptions.phase,
        consideredRosterInstanceIds: activity.payload?.consideredRosterInstanceIds || [],
        affectedRosterInstanceIds: activity.payload?.affectedRosterInstanceIds || [],
        excludedRosterInstanceIds: activity.payload?.excludedRosterInstanceIds || [],
        consumptionRecordId: activity.payload?.consumptionRecordId || ""
      }, effectOptions);
    }
    if (ruleChange) {
      const mirror = recordRuleChange(state, ruleChange.speciesName, ruleChange.action, {
        sourceTokenId: source.sourceTokenId,
        sourceTokenName: source.sourceTokenName,
        sourceStatusId: ruleChange.status.id,
        durationGyms: ruleChange.durationGyms || null,
        expiresAtSeries: ruleChange.status.expiresAtSeries,
        expiresAtGym: ruleChange.status.expiresAtGym
      }, effectOptions);
      ruleChange = { ...ruleChange, ...mirror };
    }
    return { definition, resolution, ruleChange };
  }

  function missingArenaTrapPokemon(state, playerId, selectedPokemonIds = [], options = {}) {
    const selected = new Set(selectedPokemonIds.filter(Boolean));
    const effectOptions = controllerOptions(state, options);
    return (state.pokemonRecords || []).filter((pokemon) => (
      pokemon.trainerId === playerId
      && !["Released", "Removed"].includes(pokemon.status)
      && effects.pokemonHasArenaTrap(state, pokemon, effectOptions)
      && !selected.has(pokemon.id)
    ));
  }

  function validateDraftArenaTrapRequirements(state, playerId, selectedPokemonIds = [], options = {}) {
    const effectOptions = controllerOptions(state, options);
    const missing = missingArenaTrapPokemon(state, playerId, selectedPokemonIds, options);
    const requirements = effects.forcedTeamRequirements(state, playerId, effectOptions);
    const teamSize = Math.max(1, Number(effectOptions.teamSizeForPlayer?.(playerId) || 6));
    const selectedCount = unique(selectedPokemonIds).length;
    const errors = missing.map((pokemon) => `${pokemon.name} is Arena Trapped and must be brought this Battle Phase.`);
    const pendingCustomizations = effects.pendingArenaTrapCustomizations(state, playerId, effectOptions);
    pendingCustomizations.forEach((status) => {
      errors.push(`${status.targetPokemonName || "Arena Trapped Pokemon"} still needs its Arena Trap Ability or move choice.`);
    });
    if (requirements.rosterInstanceIds.length > teamSize) {
      errors.push(`${requirements.rosterInstanceIds.length} forced team members exceed the legal team size of ${teamSize}. Team Lock is unavailable.`);
    }
    if (selectedCount > teamSize) errors.push(`Remove ${selectedCount - teamSize} unlocked Pokemon before Team Building can continue.`);
    return {
      valid: !errors.length,
      missingPokemonIds: missing.map((pokemon) => pokemon.id),
      forcedPokemonIds: requirements.rosterInstanceIds,
      impossible: requirements.rosterInstanceIds.length > teamSize,
      repairRequired: selectedCount > teamSize,
      pendingCustomizationStatusIds: pendingCustomizations.map((status) => status.id),
      errors
    };
  }

  function validateLockedTeamArenaTrapRequirements(state, playerId, selectedPokemonIds = [], options = {}) {
    const effectOptions = controllerOptions(state, options);
    const missing = missingArenaTrapPokemon(state, playerId, selectedPokemonIds, options);
    const requirements = effects.forcedTeamRequirements(state, playerId, effectOptions);
    const teamSize = Math.max(1, Number(effectOptions.teamSizeForPlayer?.(playerId) || 6));
    const selectedCount = unique(selectedPokemonIds).length;
    const errors = missing.map((pokemon) => `${pokemon.name} is Arena Trapped and must be included in this Battle Team.`);
    const pendingCustomizations = effects.pendingArenaTrapCustomizations(state, playerId, effectOptions);
    pendingCustomizations.forEach((status) => {
      errors.push(`${status.targetPokemonName || "Arena Trapped Pokemon"} still needs its Arena Trap Ability or move choice before Team Lock.`);
    });
    if (requirements.rosterInstanceIds.length > teamSize) {
      errors.push(`${requirements.rosterInstanceIds.length} forced team members exceed the legal team size of ${teamSize}. Team Lock is unavailable.`);
    }
    if (selectedCount > teamSize) errors.push(`This team has ${selectedCount} Pokemon. Remove ${selectedCount - teamSize} unlocked Pokemon before locking.`);
    return {
      valid: !errors.length,
      missingPokemonIds: missing.map((pokemon) => pokemon.id),
      forcedPokemonIds: requirements.rosterInstanceIds,
      impossible: requirements.rosterInstanceIds.length > teamSize,
      repairRequired: selectedCount > teamSize,
      pendingCustomizationStatusIds: pendingCustomizations.map((status) => status.id),
      errors
    };
  }

  function createScenarioController(initialState, config = {}) {
    let state = ensureState(initialState);
    let sequence = 0;
    const idPrefix = String(config.idPrefix || `scenario-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`);
    const fixedNow = config.now || (() => `2026-07-24T12:00:${String(sequence).padStart(2, "0")}.000Z`);
    const makeId = (prefix) => `${prefix}-${idPrefix}-${++sequence}`;
    const options = (overrides = {}) => controllerOptions(state, {
      ...config,
      ...overrides,
      now: typeof fixedNow === "function" ? fixedNow() : fixedNow,
      makeId
    });

    function consume(actor, definition, tokenInventoryId, eventId) {
      const index = inventoryTokenIndex(actor, definition, tokenInventoryId);
      if (index < 0) return null;
      const [token] = actor.inventory.splice(index, 1);
      const consumption = {
        id: makeId("consumption"),
        tokenId: token.id,
        tokenName: definition.name,
        playerId: actor.id,
        eventId,
        linkedEventId: eventId,
        policy: "provisional-consume-on-legal-declaration",
        status: "consumed",
        refundStatus: "not-refunded",
        inventoryItem: clone(token),
        createdAt: options().now
      };
      state.tokenConsumptions.push(consumption);
      effects.copyConsumedTokenForRelationships(state, consumption, {
        ...options(),
        definitionFor
      });
      return { token, consumption };
    }

    function addActivation(definition, actor, consumed, eventId, before, input, status = "pending") {
      const activation = {
        id: makeId("activation"),
        tokenDefinitionId: definition.id,
        tokenId: consumed.token.id,
        tokenName: definition.name,
        actorPlayerId: actor.id,
        eventId,
        status,
        targetPokemonId: input.targetPokemonId || "",
        speciesName: input.speciesName || input.targetPokemonName || "",
        resourceName: input.resourceName || input.choice || input.notes || input.targetText || "",
        resourceSelections: clone(input.resourceSelections || []),
        undoSnapshot: before,
        createdAt: options().now
      };
      state.tokenActivations.push(activation);
      return activation;
    }

    function declare(input = {}) {
      const legality = validateDeclaration(state, input, options());
      if (!legality.ok) return { ok: false, reason: legality.reason, consumed: false };
      const before = clone(state);
      const eventId = makeId("interaction");
      const consumed = consume(legality.actor, legality.definition, input.tokenInventoryId, eventId);
      if (!consumed) return { ok: false, reason: "Token inventory changed before declaration.", consumed: false };
      if (legality.definition.id === "ditto-token") {
        const copied = effects.createCanonicalTokenInventoryCopy(state, {
          ownerPlayerId: legality.actor.id,
          definition: legality.resourceDefinition,
          sourceEffectId: eventId,
          sourceInventoryRecordId: consumed.token.id,
          sourcePlayerId: legality.actor.id,
          copySourceType: "ditto"
        }, { ...options(), definitionFor });
        if (copied.result !== "resolved") {
          state = ensureState(before);
          return { ok: false, reason: copied.reason, consumed: false };
        }
        const activation = addActivation(legality.definition, legality.actor, consumed, eventId, before, input, "resolved");
        activation.result = "resolved";
        activation.createdInventoryRecordId = copied.record?.id || "";
        return { ok: true, consumed: true, immediate: true, activation, resolution: copied };
      }
      if (legality.definition.id === "substitute") {
        const placement = effects.resolveSubstitutePlacement(state, {
          sourceTokenId: consumed.token.id,
          sourceTokenName: legality.definition.name,
          actorPlayerId: legality.actor.id,
          actorPlayerName: legality.actor.name,
          targetPokemonId: legality.pokemon.id,
          requiredOwnerPlayerId: legality.actor.id,
          sourceEffectId: eventId
        }, options());
        if (placement.result !== "resolved") {
          state = ensureState(before);
          return { ok: false, reason: placement.reason, consumed: false };
        }
        const activation = addActivation(legality.definition, legality.actor, consumed, eventId, before, input, "resolved");
        activation.result = placement.result;
        activation.persistentStateIds = placement.statusIds;
        return { ok: true, consumed: true, immediate: true, activation, resolution: placement };
      }
      const targetPlayerId = input.targetPlayerId || legality.pokemon?.trainerId || "";
      const eligible = unique([targetPlayerId, ...(state.players || []).map((player) => player.id)])
        .filter((id) => id && id !== legality.actor.id);
      const event = {
        id: eventId,
        sourceType: "token-use",
        status: "open",
        actorPlayerId: legality.actor.id,
        targetPlayerId,
        eligiblePlayerIds: eligible,
        priorityPlayerIds: eligible,
        currentPriorityPlayerId: eligible[0] || "",
        responses: [],
        payload: {
          tokenId: legality.definition.id,
          tokenName: legality.definition.name,
          consumedTokenId: consumed.token.id,
          targetPokemonId: legality.pokemon?.id || input.targetPokemonId || "",
          targetPokemonName: legality.pokemon?.name || input.targetPokemonName || legality.speciesName,
          targetOwnerPlayerId: legality.pokemon?.trainerId || input.targetPlayerId || "",
          speciesName: legality.speciesName,
          selectedRosterInstanceId: legality.pokemon?.id || input.selectedRosterInstanceId || "",
          selectedRosterInstanceIds: unique([
            ...(input.targetPokemonIds || input.selectedRosterInstanceIds || []),
            legality.pokemon?.id || input.selectedRosterInstanceId
          ]),
          applicationScope: legality.definition.applicationScope,
          resourceName: legality.resourceName || "",
          resourceDefinition: legality.resourceDefinition ? clone(legality.resourceDefinition) : null,
          resourceSelections: clone(legality.resourceSelections || []),
          resourceDefinitionId: legality.resourceDefinition?.id || input.resourceDefinitionId || "",
          choiceKind: input.choiceKind || "",
          inventoryRecordId: input.inventoryRecordId || "",
          moveName: input.moveName || "",
          buildSlot: clone(input.buildSlot || null),
          consumptionRecordId: consumed.consumption.id,
          declarationUndoSnapshot: before
        }
      };
      state.interactionEvents.push(event);
      const activation = addActivation(legality.definition, legality.actor, consumed, eventId, before, input);
      return { ok: true, consumed: true, event, activation };
    }

    function refundEventConsumption(event, reason) {
      const consumption = state.tokenConsumptions.find((entry) => (
        (entry.eventId || entry.linkedEventId) === event.id
        && entry.status !== "refunded"
      ));
      const actor = playerFor(state, consumption?.playerId || event.actorPlayerId);
      if (!consumption || !actor || !consumption.inventoryItem) return false;
      actor.inventory ||= [];
      if (!actor.inventory.some((item) => item.id === consumption.inventoryItem.id)) {
        actor.inventory.unshift(clone(consumption.inventoryItem));
      }
      consumption.status = "refunded";
      consumption.refundStatus = "refunded";
      consumption.refundReason = reason;
      consumption.refundedAt = options().now;
      return true;
    }

    function respondImmunity(eventId, input = {}) {
      const event = state.interactionEvents.find((entry) => entry.id === eventId && entry.status === "open");
      if (!event) return { ok: false, reason: "No open event." };
      const player = playerFor(state, input.playerId);
      const definition = definitionFor("immunity");
      if (!player || event.currentPriorityPlayerId !== player.id) return { ok: false, reason: "That player does not have response priority." };
      const consumed = consume(player, definition, input.tokenInventoryId, event.id);
      if (!consumed) return { ok: false, reason: `${player.name} does not own Immunity.` };
      const response = { id: makeId("response"), type: "token", tokenName: "Immunity", playerId: player.id, outcome: "negates-parent", createdAt: options().now };
      event.responses.push(response);
      event.status = "resolved";
      event.resolution = "negated-by-immunity";
      const activation = state.tokenActivations.find((entry) => entry.eventId === event.id);
      if (activation) {
        activation.status = "resolved";
        activation.result = "negated";
        activation.responseId = response.id;
      }
      return { ok: true, response, event, activation };
    }

    function resolve(eventId) {
      const event = state.interactionEvents.find((entry) => entry.id === eventId && entry.status === "open");
      if (!event) return { ok: false, reason: "No open event." };
      const definition = definitionFor(event.payload.tokenId);
      const effectOptions = options();
      const revalidation = validateResolutionState(state, event, effectOptions);
      if (!revalidation.ok) {
        const activation = state.tokenActivations.find((entry) => entry.eventId === event.id);
        if (revalidation.refund) {
          const refunded = refundEventConsumption(event, revalidation.reason);
          event.status = "canceled";
          event.resolution = "canceledRefunded";
          if (activation) {
            activation.status = "canceled";
            activation.result = "canceledRefunded";
            activation.refunded = refunded;
          }
          return {
            ok: true,
            event,
            activation,
            resolution: {
              result: "systemFailure",
              refundRequired: true,
              refunded,
              reason: revalidation.reason,
              operations: []
            }
          };
        }
        event.status = "resolved";
        event.resolution = "blocked";
        if (activation) {
          activation.status = "resolved";
          activation.result = "blocked";
          activation.protectionResult = revalidation.protectionResult || "";
        }
        return {
          ok: true,
          event,
          activation,
          resolution: {
            result: "blocked",
            refundRequired: false,
            reason: revalidation.reason,
            protectionResult: revalidation.protectionResult || "",
            operations: []
          }
        };
      }
      if (definition.id === "restrict-token") {
        const interception = effects.interceptEffectWithSubstitute(state, {
          effectType: "restrict",
          applicationScope: "globalSpecies",
          speciesName: event.payload.speciesName,
          sourceEffectId: event.id,
          sourcePlayerId: event.actorPlayerId
        }, effectOptions);
        event.payload.affectedRosterInstanceIds = interception.affectedRosterInstanceIds;
        event.payload.excludedRosterInstanceIds = interception.excludedRosterInstanceIds;
        event.substituteInterception = interception;
      } else if (definition.id === "extra-ban-token") {
        const interception = effects.interceptEffectWithSubstitute(state, {
          effectType: "ban",
          applicationScope: "globalSpecies",
          speciesName: event.payload.speciesName,
          selectedRosterInstanceId: event.payload.selectedRosterInstanceId,
          selectedRosterInstanceIds: event.payload.selectedRosterInstanceIds,
          substituteInterceptionPolicy: "negateEntireEffect",
          substituteChecksSelectedTargetOnly: true,
          sourceEffectId: event.id,
          sourcePlayerId: event.actorPlayerId
        }, effectOptions);
        event.substituteInterception = interception;
        if (interception.negateEntireEffect) {
          event.status = "resolved";
          event.resolution = "negated-by-substitute";
          const activation = state.tokenActivations.find((entry) => entry.eventId === event.id);
          if (activation) {
            activation.status = "resolved";
            activation.result = "negated-by-substitute";
            activation.persistentStateIds = interception.createdStatusIds;
          }
          return { ok: true, event, activation, interception, resolution: { result: "negated" } };
        }
      } else if (definition.id === "steal-token") {
        const interception = effects.interceptEffectWithSubstitute(state, {
          effectType: "steal",
          applicationScope: "rosterInstance",
          selectedRosterInstanceId: event.payload.selectedRosterInstanceId,
          selectedRosterInstanceIds: event.payload.selectedRosterInstanceIds,
          affectedRosterInstanceIds: event.payload.selectedRosterInstanceIds,
          sourceEffectId: event.id,
          sourcePlayerId: event.actorPlayerId
        }, effectOptions);
        event.substituteInterception = interception;
        if (interception.result === "intercepted") {
          event.status = "resolved";
          event.resolution = "negated-by-substitute";
          const activation = state.tokenActivations.find((entry) => entry.eventId === event.id);
          if (activation) {
            activation.status = "resolved";
            activation.result = "negated";
            activation.persistentStateIds = interception.consumedStatusIds;
          }
          return {
            ok: true,
            event,
            activation,
            interception,
            resolution: {
              result: "negated",
              reason: interception.reason,
              operations: [],
              consumedStatusIds: interception.consumedStatusIds
            }
          };
        }
      } else if (STANDARD_CURSE_TOKEN_IDS.includes(definition.id)) {
        const interception = effects.interceptEffectWithSubstitute(state, {
          effectType: definition.id,
          isCurse: true,
          applicationScope: "globalSpecies",
          speciesName: event.payload.speciesName || event.payload.targetPokemonName,
          selectedRosterInstanceId: event.payload.selectedRosterInstanceId,
          selectedRosterInstanceIds: event.payload.selectedRosterInstanceIds,
          sourceEffectId: event.id,
          sourcePlayerId: event.actorPlayerId
        }, effectOptions);
        event.payload.consideredRosterInstanceIds = interception.affectedRosterInstanceIds;
        event.payload.affectedRosterInstanceIds = interception.affectedRosterInstanceIds
          .filter((id) => !interception.excludedRosterInstanceIds.includes(id));
        event.payload.excludedRosterInstanceIds = interception.excludedRosterInstanceIds;
        event.substituteInterception = interception;
      }
      const foundation = resolveFoundationActivity(state, event, effectOptions);
      if (foundation?.resolution?.refundRequired) {
        const refunded = refundEventConsumption(event, foundation.resolution.reason || "Controller could not complete the effect.");
        event.status = "canceled";
        event.resolution = "canceledRefunded";
        const activation = state.tokenActivations.find((entry) => entry.eventId === event.id);
        if (activation) {
          activation.status = "canceled";
          activation.result = "canceledRefunded";
          activation.refunded = refunded;
        }
        return { ok: true, event, activation, ...foundation, resolution: { ...foundation.resolution, refunded } };
      }
      event.status = "resolved";
      event.resolution = foundation?.resolution?.result || "noEffect";
      const activation = state.tokenActivations.find((entry) => entry.eventId === event.id);
      if (activation) {
        activation.status = "resolved";
        activation.result = event.resolution;
        activation.persistentStateIds = foundation?.resolution?.statusIds || [];
      }
      return { ok: true, event, activation, ...foundation };
    }

    function undo(activationId) {
      const activation = state.tokenActivations.find((entry) => entry.id === activationId);
      if (!activation?.undoSnapshot) return { ok: false, reason: "No undo snapshot is available." };
      const restored = clone(activation.undoSnapshot);
      state = ensureState(restored);
      state.tokenUndoHistory ||= [];
      state.tokenUndoHistory.push({ activationId, undoneAt: options().now });
      return { ok: true, state };
    }

    function expireStartOfGym(overrides = {}) {
      const effectOptions = options({ phase: "start", ...overrides });
      const expired = effects.expireAtStartOfGym(state, effectOptions);
      const statusById = new Map((state.lingeringStatuses || []).map((status) => [status.id, status]));
      Object.values(state.globalPokemonRules || {}).forEach((rule) => {
        const linked = statusById.get(rule.sourceStatusId);
        if (linked && linked.status !== "active" && ["Restricted", "Unbanned"].includes(rule.status)) {
          rule.status = "Normal";
          rule.lastAction = linked.type === "unban-protection" ? "Unban Protection Expired" : "Restriction Expired";
          rule.expiredWithStatusId = linked.id;
        }
      });
      return expired;
    }

    function expireAtPhase(overrides = {}) {
      return effects.expireAtPhaseBoundary(state, options(overrides));
    }

    function replaceState(nextState) {
      state = ensureState(nextState);
      return state;
    }

    return Object.freeze({
      getState: () => state,
      replaceState,
      declare,
      respondImmunity,
      resolve,
      undo,
      expireStartOfGym,
      expireAtPhase,
      validateCurseTarget: (pokemonId) => validateCurseTarget(state, pokemonId, options()),
      validateDraftTeam: (playerId, ids) => validateDraftArenaTrapRequirements(state, playerId, ids, options()),
      validateLockedTeam: (playerId, ids) => validateLockedTeamArenaTrapRequirements(state, playerId, ids, options()),
      battleLegality: (pokemonId) => {
        const pokemon = availablePokemon(state, pokemonId);
        return pokemon ? effects.battleLegality(state, pokemon, pokemon.name, options()) : { legal: false, reason: "Pokemon not found." };
      },
      expireArenaTraps: () => effects.expireArenaTrapsAtBattleEnd(state, options({ phase: "battle-results" }))
    });
  }

  return Object.freeze({
    CONTROL_TOKEN_IDS,
    STANDARD_CURSE_TOKEN_IDS,
    controllerOptions,
    futureGymPosition,
    validateDeclaration,
    validateCurseTarget,
    recordRuleChange,
    resolveFoundationActivity,
    validateResolutionState,
    missingArenaTrapPokemon,
    validateDraftArenaTrapRequirements,
    validateLockedTeamArenaTrapRequirements,
    createScenarioController
  });
});
