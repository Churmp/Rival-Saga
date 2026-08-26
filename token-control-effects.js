(function initRivalSagaControlTokenEffects(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.rivalSagaControlTokenEffects = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function createRivalSagaControlTokenEffects() {
  "use strict";

  const CONTROL_STATUS_TYPES = Object.freeze({
    BAN: "ban",
    RESTRICT: "restrict",
    INSTANCE_RESTRICT: "instance-restrict",
    UNBAN_PROTECTION: "unban-protection",
    BAN_PHASE_PROTECTION: "ban-phase-protection",
    SUBSTITUTE: "substitute-attached",
    ARENA_TRAP: "arena-trap",
    RAGE_ENHANCEMENT: "rage-candy-enhancement",
    RESTRICT_IMMUNITY: "buff-restrict-immune",
    MOVE_RESTRICTION: "global-move-restriction",
    COLD_WAVE_SUPPRESSION: "cold-wave-suppression",
    ONGOING_TEXT_REPLACEMENT: "ongoing-effect-text-replacement",
    HAZE_CURSE: "curse-haze",
    DEVOLVE_CURSE: "curse-devolve",
    FORESIGHT_MARKER: "private-foresight-marker",
    FOLLOW_ME_COPY: "follow-me-copy-relationship",
    PURGE_MARKER: "curse-purge",
    SAFEGUARD: "safeguard"
  });

  const SAFEGUARD_OPERATION_CATEGORIES = Object.freeze({
    MONEY_STEAL: "moneySteal",
    MONEY_DESTROY: "moneyDestroy",
    MONEY_COPY: "moneyCopy",
    TOKEN_STEAL: "tokenSteal",
    TOKEN_DESTROY: "tokenDestroy",
    TOKEN_COPY: "tokenCopy",
    FOLLOW_ME: "followMe",
    EMBARGO: "embargo"
  });

  const SAFEGUARD_PROTECTED_CATEGORIES = Object.freeze(Object.values(SAFEGUARD_OPERATION_CATEGORIES));

  const STANDARD_CURSE_TYPES = Object.freeze({
    "toxic-curse": Object.freeze({ statusType: "curse-toxic-orb", statusName: "Curse: Toxic Orb", payload: Object.freeze({ forcedItem: "Toxic Orb" }) }),
    "iron-ball-curse": Object.freeze({ statusType: "curse-iron-ball", statusName: "Curse: Iron Ball", payload: Object.freeze({ forcedItem: "Iron Ball" }) }),
    "flame-curse": Object.freeze({ statusType: "curse-flame-orb", statusName: "Curse: Flame Orb", payload: Object.freeze({ forcedItem: "Flame Orb" }) }),
    "silencing-curse": Object.freeze({ statusType: "curse-silencing", statusName: "Curse: Max 2 Moves", payload: Object.freeze({ maxMoves: 2 }) }),
    "imprison-curse": Object.freeze({ statusType: "curse-imprison", statusName: "Curse: Imprisoned", payload: Object.freeze({ noEvs: true, noIvs: true, neutralNature: true }) })
  });

  const PHASE_ANCHOR_ORDER = Object.freeze(["start", "action", "battle", "battle-results", "shop"]);

  const APPLICATION_SCOPES = Object.freeze({
    ROSTER_INSTANCE: "rosterInstance",
    SELECTED_ROSTER_INSTANCES: "selectedRosterInstances",
    SUBMITTED_TEAM_INSTANCES: "submittedTeamInstances",
    PLAYER_ROSTER_INSTANCES: "playerRosterInstances",
    GLOBAL_SPECIES: "globalSpecies",
    SINGLE_PLAYER: "singlePlayer",
    ALL_PLAYERS: "allPlayers",
    TABLE_WIDE: "tableWide"
  });

  const CUSTOMIZATION_KINDS = Object.freeze({
    ABILITY: "ability",
    MOVE: "move"
  });

  const EFFECT_OPERATION_TYPES = Object.freeze({
    DESTROY_INVENTORY_RESOURCE: "destroyInventoryResource",
    TRANSFER_POKEMON_OWNERSHIP: "transferPokemonOwnership",
    REROLL_POKEMON: "rerollPokemon"
  });

  const GENERIC_CUSTOMIZATION_BANS = Object.freeze({
    ability: Object.freeze([
      "Wonder Guard",
      "Moody",
      "Huge Power",
      "Pure Power",
      "Contrary",
      "Shadow Tag",
      "Arena Trap",
      "Hadron Engine",
      "Orichalcum Pulse",
      "Simple",
      "Water Bubble"
    ]),
    move: Object.freeze([
      "Last Respects",
      "Double Iron Bash"
    ])
  });

  function defaultSpeciesKey(value = "") {
    const source = String(value || "").trim().toLowerCase()
      .replace(/♀/g, "-f")
      .replace(/♂/g, "-m")
      .replace(/[’']/g, "");
    const key = source
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const collapsed = key.replace(/-/g, "");
    return ({
      mrmime: "mr-mime",
      mimejr: "mime-jr",
      farfetchd: "farfetchd",
      sirfetchd: "sirfetchd",
      typenull: "type-null",
      porygonz: "porygon-z",
      hooh: "ho-oh",
      flabebe: "flabebe"
    })[collapsed] || key;
  }

  function clone(value) {
    if (typeof structuredClone === "function") return structuredClone(value);
    return JSON.parse(JSON.stringify(value));
  }

  function uniqueIds(values = []) {
    return [...new Set((values || []).map((value) => String(value || "").trim()).filter(Boolean))];
  }

  function customizationKey(value = "") {
    return String(value || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }

  function inventoryResourceName(resource = {}) {
    return String(resource.moveName || resource.name || "").trim();
  }

  function inventoryResourceCategory(resource = {}) {
    const type = String(resource.type || resource.category || "").trim().toUpperCase();
    return type === "TM" ? "TM" : type === "ITEM" ? "Item" : "";
  }

  function isMasterBallResource(resource = {}) {
    if (!resource || !inventoryResourceCategory(resource)) return false;
    return [
      resource.name,
      resource.moveName,
      resource.tier,
      resource.category,
      resource.subcategory,
      resource.shopCategory
    ].some((value) => ["master-ball", "masterball"].includes(customizationKey(value)));
  }

  function activePerkIdentity(value = {}) {
    if (typeof value === "string") return customizationKey(value);
    return customizationKey(value.perkId || value.id || value.perkName || value.name);
  }

  function playerHasActivePerk(state, playerId, perkId) {
    const expected = customizationKey(perkId);
    const player = (state.players || []).find((entry) => entry.id === playerId);
    if ((player?.perks || []).some((perk) => activePerkIdentity(perk) === expected)) return true;
    return (state.perkSystem?.assignments || []).some((assignment) => (
      assignment.playerId === playerId
      && String(assignment.status || "active").toLowerCase() === "active"
      && activePerkIdentity(assignment) === expected
    ));
  }

  function playerHasStickyHold(state, playerId) {
    return playerHasActivePerk(state, playerId, "sticky-hold");
  }

  function operationRecord(input = {}, options = {}) {
    const now = options.now || new Date().toISOString();
    const makeId = options.makeId || ((prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
    return {
      id: input.id || makeId("effect-operation"),
      operationType: input.operationType,
      status: input.status || "resolved",
      sourceEffectId: input.sourceEffectId || "",
      sourceActivationId: input.sourceActivationId || "",
      sourceTokenId: input.sourceTokenId || "",
      sourceTokenName: input.sourceTokenName || "",
      sourcePlayerId: input.sourcePlayerId || input.actorPlayerId || "",
      targetPlayerId: input.targetPlayerId || "",
      targetObjectId: input.targetObjectId || "",
      targetObjectName: input.targetObjectName || "",
      objectCategory: input.objectCategory || "",
      previousOwnerPlayerId: input.previousOwnerPlayerId || "",
      newOwnerPlayerId: input.newOwnerPlayerId || "",
      previousLocation: input.previousLocation || "",
      newLocation: input.newLocation || "",
      protectionResult: input.protectionResult || "notProtected",
      consumptionRecordId: input.consumptionRecordId || "",
      targetSnapshot: clone(input.targetSnapshot || null),
      undoData: clone(input.undoData || null),
      createdAt: now
    };
  }

  function incinerateEligibleResources(player) {
    return (player?.inventory || []).filter((resource) => (
      Boolean(String(resource?.id || "").trim())
      && Boolean(inventoryResourceCategory(resource))
      && resource.inventoryCategoryContainer !== true
      && !isMasterBallResource(resource)
    ));
  }

  function validateIncinerateSelections(state, actorPlayerId, resourceSelections = []) {
    const actor = (state.players || []).find((player) => player.id === actorPlayerId);
    if (!actor) return { ok: false, reason: "The Incinerate user is no longer available.", plans: [] };
    const rivals = (state.players || []).filter((player) => player.id !== actor.id);
    const selections = Array.isArray(resourceSelections) ? resourceSelections : [];
    const selectedByPlayerId = new Map();
    for (const selection of selections) {
      const playerId = String(selection?.playerId || selection?.targetPlayerId || "").trim();
      const resourceId = String(selection?.resourceId || selection?.targetObjectId || "").trim();
      if (!playerId || !resourceId) return { ok: false, reason: "Every Incinerate target needs a player ID and stable resource ID.", plans: [] };
      if (playerId === actor.id) return { ok: false, reason: "Incinerate cannot target its user's own sheet.", plans: [] };
      if (selectedByPlayerId.has(playerId)) return { ok: false, reason: "Incinerate can select only one record from each opposing player.", plans: [] };
      selectedByPlayerId.set(playerId, resourceId);
    }
    const plans = [];
    const skippedPlayerIds = [];
    for (const player of rivals) {
      const eligible = incinerateEligibleResources(player);
      const selectedResourceId = selectedByPlayerId.get(player.id) || "";
      if (!eligible.length) {
        if (selectedResourceId) return { ok: false, reason: `${player.name || "A rival"} has no legal Incinerate targets.`, plans: [] };
        skippedPlayerIds.push(player.id);
        continue;
      }
      if (!selectedResourceId) {
        return { ok: false, reason: `Choose one Item or TM from ${player.name || "each rival"}.`, plans: [] };
      }
      const index = (player.inventory || []).findIndex((resource) => resource.id === selectedResourceId);
      const resource = index >= 0 ? player.inventory[index] : null;
      if (!resource || !eligible.some((candidate) => candidate.id === selectedResourceId)) {
        return { ok: false, reason: `${player.name || "A rival"}'s selected Incinerate target is no longer legal or available.`, plans: [] };
      }
      plans.push({ player, index, resource: clone(resource) });
      selectedByPlayerId.delete(player.id);
    }
    if (selectedByPlayerId.size) return { ok: false, reason: "Incinerate includes a target for an unknown opposing player.", plans: [] };
    return {
      ok: true,
      reason: "",
      actor,
      plans,
      skippedPlayerIds,
      selections: plans.map((plan) => ({
        playerId: plan.player.id,
        resourceId: plan.resource.id,
        resourceName: inventoryResourceName(plan.resource),
        resourceCategory: inventoryResourceCategory(plan.resource)
      }))
    };
  }

  function resolveIncinerate(state, input = {}, options = {}) {
    const validation = validateIncinerateSelections(state, input.actorPlayerId, input.resourceSelections);
    if (!validation.ok) return { result: "systemFailure", refundRequired: true, reason: validation.reason, operations: [] };
    const { actor, plans, skippedPlayerIds, selections } = validation;
    if (!plans.length) {
      return {
        result: "noEffect",
        reason: "No opposing player had a legal Item or TM target.",
        resourceSelections: [],
        operations: [],
        destroyedResourceIds: [],
        affectedPlayerIds: [],
        skippedPlayerIds
      };
    }
    const operationStart = (state.effectOperations || []).length;
    state.effectOperations ||= [];
    const removedByPlayerId = new Map();
    try {
      for (const plan of plans) {
        const currentIndex = (plan.player.inventory || []).findIndex((resource) => resource.id === plan.resource.id);
        if (currentIndex < 0
          || !inventoryResourceCategory(plan.player.inventory[currentIndex])
          || isMasterBallResource(plan.player.inventory[currentIndex])) {
          throw new Error(`${plan.player.name || "A rival"}'s selected resource changed before Incinerate resolved.`);
        }
      }
      const operations = plans.map((plan) => {
        const [removed] = plan.player.inventory.splice(
          plan.player.inventory.findIndex((resource) => resource.id === plan.resource.id),
          1
        );
        removedByPlayerId.set(plan.player.id, clone(removed));
        const operation = operationRecord({
          operationType: EFFECT_OPERATION_TYPES.DESTROY_INVENTORY_RESOURCE,
          sourceEffectId: input.sourceEffectId,
          sourceActivationId: input.sourceActivationId,
          sourceTokenId: input.sourceTokenId,
          sourceTokenName: input.sourceTokenName || "Incinerate",
          sourcePlayerId: actor.id,
          targetPlayerId: plan.player.id,
          targetObjectId: removed.id,
          targetObjectName: inventoryResourceName(removed),
          objectCategory: inventoryResourceCategory(removed),
          previousOwnerPlayerId: plan.player.id,
          previousLocation: "inventory",
          newLocation: "destroyed",
          consumptionRecordId: input.consumptionRecordId,
          targetSnapshot: removed,
          undoData: {
            restoreOwnerPlayerId: plan.player.id,
            restoreLocation: "inventory",
            inventoryIndex: plan.index
          }
        }, options);
        state.effectOperations.push(operation);
        return operation;
      });
      return {
        result: "resolved",
        reason: `Incinerate destroyed ${operations.length} selected record${operations.length === 1 ? "" : "s"} from ${operations.length} opposing player${operations.length === 1 ? "" : "s"}.`,
        resourceSelections: selections,
        operations,
        destroyedResourceIds: operations.map((operation) => operation.targetObjectId),
        affectedPlayerIds: operations.map((operation) => operation.targetPlayerId),
        skippedPlayerIds
      };
    } catch (error) {
      plans.forEach((plan) => {
        const current = (plan.player.inventory || []).some((resource) => resource.id === plan.resource.id);
        if (!current && removedByPlayerId.has(plan.player.id)) {
          plan.player.inventory.splice(Math.min(plan.index, plan.player.inventory.length), 0, clone(removedByPlayerId.get(plan.player.id)));
        }
      });
      state.effectOperations.splice(operationStart);
      return { result: "systemFailure", refundRequired: true, reason: error.message, operations: [] };
    }
  }

  function wickedBlowActiveRosterTarget(state, pokemon, options = {}) {
    if (!pokemon?.id || !pokemon.trainerId) return { ok: false, reason: "Choose an exact owned Pokemon." };
    const owner = (state.players || []).find((player) => player.id === pokemon.trainerId);
    if (!owner) return { ok: false, reason: "The selected Wicked Blow target has no valid owner." };
    const rosterType = String(pokemon.rosterType || "Active").trim().toLowerCase();
    const status = String(pokemon.status || "Active").trim().toLowerCase();
    const inFacility = Boolean(pokemon.breederStatus?.status || pokemon.dragonDenStatus?.status);
    const temporary = pokemon.temporary === true
      || pokemon.isTemporary === true
      || pokemon.temporaryActive === true
      || Boolean(pokemon.temporaryGrantId || pokemon.temporarySourceId);
    if (rosterType !== "active" || ["released", "removed", "reserve", "daycare", "temporary"].includes(status) || inFacility || temporary) {
      return { ok: false, reason: `${pokemon.name || "That Pokemon"} is not an eligible Active Roster Pokemon.` };
    }
    const key = battleTeamKey(state, options);
    const team = state.battleTeams?.[key]?.[pokemon.trainerId];
    const indexes = (team?.selected || [])
      .map((pokemonId, index) => pokemonId === pokemon.id ? index : -1)
      .filter((index) => index >= 0);
    return { ok: true, reason: "", key, team: team || null, indexes, owner, ownerPlayerId: pokemon.trainerId };
  }

  function pokemonHasCurseImmunity(state, pokemon, options = {}) {
    if (!pokemon?.id) return false;
    return activeStatuses(state, options, (status) => (
      status.payload?.curseImmune === true && statusAffectsPokemon(status, pokemon, options)
    )).length > 0;
  }

  function standardCurseTarget(state, pokemon, options = {}) {
    return wickedBlowActiveRosterTarget(state, pokemon, options);
  }

  function standardCurseDefinition(tokenId = "") {
    return STANDARD_CURSE_TYPES[defaultSpeciesKey(tokenId)] || null;
  }

  function standardCurseSetRepair(state, status, pokemon, options = {}) {
    if (!status?.payload?.maxMoves || !pokemon?.id) return null;
    const ownerBuilds = state.teambuilder?.buildsByPlayerId?.[pokemon.trainerId] || [];
    const affected = ownerBuilds.flatMap((build) => (build.slots || [])
      .map((slot, slotIndex) => ({ build, slot, slotIndex }))
      .filter(({ slot }) => slot.pokemonRecordId === pokemon.id
        && (slot.moves || []).filter(Boolean).length > Number(status.payload.maxMoves)));
    if (!affected.length) return null;
    state.teambuilder ||= {};
    state.teambuilder.setRepairByStatusId ||= {};
    const existing = state.teambuilder.setRepairByStatusId[status.id] || {};
    const existingAffected = Array.isArray(existing.affectedBuilds) ? existing.affectedBuilds : [];
    const nextAffected = affected.map(({ build, slot, slotIndex }) => ({
      buildId: build.id,
      slotIndex,
      playerId: pokemon.trainerId,
      rosterInstanceId: pokemon.id,
      moveNames: (slot.moves || []).filter(Boolean),
      status: "required",
      chosenMoveNames: []
    }));
    const mergedAffected = [...existingAffected];
    nextAffected.forEach((entry) => {
      const index = mergedAffected.findIndex((candidate) => candidate.buildId === entry.buildId
        && Number(candidate.slotIndex) === Number(entry.slotIndex)
        && candidate.rosterInstanceId === entry.rosterInstanceId);
      if (index >= 0) mergedAffected[index] = { ...mergedAffected[index], ...entry };
      else mergedAffected.push(entry);
    });
    const repair = {
      id: existing.id || options.makeId?.("set-repair") || `set-repair-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      status: "required",
      repairType: "silencingMoveChoice",
      sourceStatusId: status.id,
      sourceTokenId: status.sourceTokenId || "",
      sourceTokenName: status.sourceTokenName || "Silencing Curse",
      playerId: pokemon.trainerId,
      rosterInstanceId: pokemon.id,
      maxMoves: Number(status.payload.maxMoves),
      affectedBuilds: mergedAffected,
      requiredAction: `Choose no more than ${Number(status.payload.maxMoves)} moves for each affected ${pokemon.name}.`,
      createdAt: existing.createdAt || options.now || new Date().toISOString(),
      updatedAt: options.now || new Date().toISOString()
    };
    state.teambuilder.setRepairByStatusId[status.id] = repair;
    status.payload.requiredChoice = "silencingMoveChoice";
    status.payload.repairStatus = "required";
    status.payload.repairId = repair.id;
    return repair;
  }

  function completeSilencingSetRepair(state, input = {}, options = {}) {
    const status = (state.lingeringStatuses || []).find((entry) => entry.id === input.sourceStatusId && entry.status === "active");
    const repair = state.teambuilder?.setRepairByStatusId?.[input.sourceStatusId];
    if (!status || status.payload?.requiredChoice !== "silencingMoveChoice" || !repair || repair.status !== "required") {
      return { ok: false, reason: "This Silencing Curse repair is no longer active." };
    }
    const matching = (repair.affectedBuilds || []).filter((entry) => entry.buildId === input.buildId
      && (!input.rosterInstanceId || entry.rosterInstanceId === input.rosterInstanceId)
      && (input.slotIndex === undefined || Number(entry.slotIndex) === Number(input.slotIndex)));
    if (matching.length !== 1) {
      return { ok: false, reason: matching.length ? "Choose the exact Silencing Curse set to repair." : "This saved set is no longer part of the Silencing Curse repair." };
    }
    const affected = matching[0];
    const build = (state.teambuilder?.buildsByPlayerId?.[affected.playerId || repair.playerId] || []).find((entry) => entry.id === input.buildId);
    const slot = build?.slots?.[affected?.slotIndex];
    if (!affected || !slot || slot.pokemonRecordId !== (affected.rosterInstanceId || repair.rosterInstanceId)) {
      return { ok: false, reason: "The saved set changed before the Silencing choice was confirmed." };
    }
    const currentMoves = (slot.moves || []).map((move) => String(move || "").trim()).filter(Boolean);
    const currentByKey = new Map(currentMoves.map((move) => [defaultSpeciesKey(move), move]));
    const chosenKeys = uniqueIds(input.moveNames || []).map(defaultSpeciesKey).filter(Boolean);
    const maxMoves = Number(repair.maxMoves || status.payload.maxMoves || 2);
    if (chosenKeys.length !== Math.min(maxMoves, currentMoves.length)) {
      return { ok: false, reason: `Choose exactly ${Math.min(maxMoves, currentMoves.length)} moves to keep.` };
    }
    if (chosenKeys.some((key) => !currentByKey.has(key))) {
      return { ok: false, reason: "Every selected move must still belong to this saved set." };
    }
    const chosenMoveNames = chosenKeys.map((key) => currentByKey.get(key));
    slot.moves = Array.from({ length: 4 }, (_, index) => chosenMoveNames[index] || "");
    build.updatedAt = options.now || new Date().toISOString();
    affected.status = "completed";
    affected.chosenMoveNames = chosenMoveNames;
    affected.completedAt = options.now || new Date().toISOString();
    if ((repair.affectedBuilds || []).every((entry) => entry.status === "completed")) {
      repair.status = "completed";
      repair.completedAt = options.now || new Date().toISOString();
      status.payload.repairStatus = "completed";
      status.payload.chosenMoveNamesByBuildId = Object.fromEntries(repair.affectedBuilds.map((entry) => [
        `${entry.buildId}:${entry.slotIndex}:${entry.rosterInstanceId}`,
        entry.chosenMoveNames
      ]));
    }
    repair.updatedAt = options.now || new Date().toISOString();
    return { ok: true, repair, affected, status, build, slot, chosenMoveNames };
  }

  function standardCurseSetRules(statuses = []) {
    const active = (statuses || []).filter((status) => status?.status === "active");
    const payloads = active.map((status) => status.payload || {});
    const maxMoves = payloads.reduce((lowest, payload) => {
      const value = Number(payload.maxMoves || 0);
      return value > 0 ? Math.min(lowest, value) : lowest;
    }, 4);
    return {
      forcedItem: payloads.find((payload) => payload.forcedItem)?.forcedItem || "",
      maxMoves: Math.max(0, Math.min(4, maxMoves)),
      noEvs: payloads.some((payload) => payload.noEvs),
      noIvs: payloads.some((payload) => payload.noIvs),
      neutralNature: payloads.some((payload) => payload.neutralNature)
    };
  }

  function applyStandardCurseSetOverrides(slot = {}, rules = {}) {
    const moves = Array.isArray(slot.moves) ? slot.moves.map((move) => String(move || "")) : [];
    const maxMoves = Number.isFinite(Number(rules.maxMoves)) ? Math.max(0, Math.min(4, Number(rules.maxMoves))) : 4;
    const selectedMoves = moves.filter(Boolean);
    const zeroStats = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
    return {
      ...clone(slot),
      item: String(rules.forcedItem || slot.item || ""),
      moves: Array.from({ length: 4 }, (_, index) => index < maxMoves ? selectedMoves[index] || "" : ""),
      nature: rules.neutralNature ? "" : String(slot.nature || ""),
      evs: rules.noEvs ? { ...zeroStats } : clone(slot.evs || {}),
      ivs: rules.noIvs ? { ...zeroStats } : clone(slot.ivs || {}),
      curseRepairRequired: selectedMoves.length > maxMoves,
      configuredMoveNames: selectedMoves
    };
  }

  function wickedBlowResolutionPlan(state, pokemon, options = {}, preview = false) {
    const target = wickedBlowActiveRosterTarget(state, pokemon, options);
    if (!target.ok) return target;
    if (typeof options.wickedBlowReplacementPlan !== "function") {
      return { ok: false, reason: "Wicked Blow's canonical replacement pool is unavailable." };
    }
    const plan = options.wickedBlowReplacementPlan(state, pokemon, { ...target, preview });
    if (!plan?.ok) return { ok: false, reason: plan?.reason || "Wicked Blow could not construct a legal replacement pool." };
    if (!preview && (!plan.pokemonPatch || !String(plan.replacementSpecies || plan.pokemonPatch.name || "").trim())) {
      return { ok: false, reason: "Wicked Blow did not produce a stable replacement Pokemon record." };
    }
    return { ...plan, ...target, ok: true, reason: "" };
  }

  function applyWickedBlowTeamMirrors(state, pokemon, plan) {
    const teamSpecies = String(plan.teamSpecies || plan.replacementSpecies || plan.pokemonPatch?.name || "").trim();
    (plan.indexes || []).forEach((index) => {
      if (!plan.team) return;
      plan.team.selectedBattleSpecies ||= [];
      plan.team.selectedBattleSpecies[index] = teamSpecies;
      if (Number.isFinite(Number(plan.assignedBadgePoints))) {
        plan.team.badgeBoosts ||= [];
        plan.team.badgeBoosts[index] = Math.max(0, Number(plan.assignedBadgePoints));
      }
      plan.team.lockedSlots?.forEach((slot) => {
        if (slot?.pokemonRecordId !== pokemon.id) return;
        slot.pokemonName = teamSpecies;
        slot.committedSpeciesAtLock = teamSpecies;
        slot.selectedBattleSpecies = teamSpecies;
        if (Number.isFinite(Number(plan.assignedBadgePoints))) {
          slot.assignedBadgePoints = Math.max(0, Number(plan.assignedBadgePoints));
        }
        slot.pendingEvolution = { wouldEvolve: false, fromSpecies: teamSpecies, toSpecies: teamSpecies };
        slot.evolutionCommittedAt = "";
      });
    });
    const builds = state.teambuilder?.buildsByPlayerId?.[pokemon.trainerId] || [];
    builds.forEach((build) => {
      if (build.series && build.series !== (plan.series || state.series)) return;
      if (build.gym && Number(build.gym) !== Number(plan.gym || state.gym || 1)) return;
      (build.slots || []).forEach((slot, index) => {
        if (slot?.pokemonRecordId !== pokemon.id) return;
        const patch = typeof plan.teambuilderSlotPatch === "function"
          ? plan.teambuilderSlotPatch(slot, index, build)
          : plan.teambuilderSlotPatch;
        Object.assign(slot, clone(patch || { selectedBattleSpecies: teamSpecies, selectedBattleForm: teamSpecies }));
      });
    });
  }

  function resolveWickedBlow(state, input = {}, options = {}) {
    const actor = (state.players || []).find((player) => player.id === input.actorPlayerId);
    const pokemon = availablePokemonRecords(state).find((record) => record.id === input.targetPokemonId);
    if (!actor) return { result: "systemFailure", refundRequired: true, reason: "The Wicked Blow user is no longer available.", operations: [] };
    if (!pokemon) return { result: "systemFailure", refundRequired: true, reason: "The selected Wicked Blow target is no longer available.", operations: [] };
    if (input.targetOwnerPlayerId && pokemon.trainerId !== input.targetOwnerPlayerId) {
      return { result: "systemFailure", refundRequired: true, reason: "The selected Wicked Blow target changed owners before resolution.", operations: [] };
    }
    const plan = wickedBlowResolutionPlan(state, pokemon, options, false);
    if (!plan.ok) return { result: "systemFailure", refundRequired: true, reason: plan.reason, operations: [] };
    const saved = snapshot(state);
    const previousPokemon = clone(pokemon);
    try {
      const stableIdentity = {
        id: pokemon.id,
        trainerId: pokemon.trainerId,
        ownerId: pokemon.ownerId || pokemon.trainerId,
        status: pokemon.status,
        rosterType: pokemon.rosterType
      };
      Object.assign(pokemon, clone(plan.pokemonPatch), stableIdentity);
      applyWickedBlowTeamMirrors(state, pokemon, plan);
      if (Array.isArray(plan.playerNotifications) && plan.playerNotifications.length) {
        state.playerNotifications ||= [];
        state.playerNotifications.unshift(...clone(plan.playerNotifications));
      }
      state.effectOperations ||= [];
      const operation = operationRecord({
        operationType: EFFECT_OPERATION_TYPES.REROLL_POKEMON,
        sourceEffectId: input.sourceEffectId,
        sourceActivationId: input.sourceActivationId,
        sourceTokenId: input.sourceTokenId,
        sourceTokenName: input.sourceTokenName || "Wicked Blow",
        sourcePlayerId: actor.id,
        targetPlayerId: pokemon.trainerId,
        targetObjectId: pokemon.id,
        targetObjectName: previousPokemon.name || previousPokemon.currentSpecies || "Pokemon",
        objectCategory: "Pokemon",
        previousOwnerPlayerId: pokemon.trainerId,
        newOwnerPlayerId: pokemon.trainerId,
        previousLocation: "activeRoster",
        newLocation: "activeRoster",
        consumptionRecordId: input.consumptionRecordId,
        targetSnapshot: previousPokemon,
        undoData: {
          replacementPokemon: clone(pokemon),
          tierCalculation: clone(plan.tierCalculation || {})
        }
      }, options);
      operation.replacementObjectName = pokemon.name || pokemon.currentSpecies || plan.replacementSpecies;
      operation.tierCalculation = clone(plan.tierCalculation || {});
      state.effectOperations.push(operation);
      return {
        result: "resolved",
        reason: `${actor.name || "The acting player"} rerolled ${previousPokemon.name || "the target"} into ${operation.replacementObjectName} with Wicked Blow.`,
        pokemon,
        previousPokemon,
        replacementPokemon: clone(pokemon),
        targetOwnerPlayerId: pokemon.trainerId,
        tierCalculation: clone(plan.tierCalculation || {}),
        poolSize: Number(plan.poolSize || 0),
        notificationIds: (plan.playerNotifications || []).map((notification) => notification.id).filter(Boolean),
        operations: [operation],
        affectedPlayerIds: [...new Set([actor.id, pokemon.trainerId])],
        replacedPokemonId: pokemon.id
      };
    } catch (error) {
      restore(state, saved);
      return { result: "systemFailure", refundRequired: true, reason: error.message, operations: [] };
    }
  }

  function removePokemonFromCurrentTeamSurfaces(state, pokemonId, ownerPlayerId, options = {}) {
    const removedReferences = [];
    const key = battleTeamKey(state, options);
    const team = state.battleTeams?.[key]?.[ownerPlayerId];
    if (team && Array.isArray(team.selected)) {
      for (let index = team.selected.length - 1; index >= 0; index -= 1) {
        if (team.selected[index] !== pokemonId) continue;
        removedReferences.push({ surface: "battleTeam", key, playerId: ownerPlayerId, index, badgePoints: Number(team.badgeBoosts?.[index] || 0) });
        team.selected.splice(index, 1);
        if (Array.isArray(team.badgeBoosts)) team.badgeBoosts.splice(index, 1);
      }
    }
    const activeBuildId = state.teambuilder?.activeBuildByPlayerId?.[ownerPlayerId] || "";
    (state.teambuilder?.buildsByPlayerId?.[ownerPlayerId] || []).forEach((build) => {
      const currentBuild = build.id === activeBuildId
        || (!activeBuildId && (!build.series || build.series === (options.series || state.series))
          && (!build.gym || Number(build.gym) === Number(options.gym || state.gym || 1)));
      if (!currentBuild) return;
      (build.slots || []).forEach((slot, index) => {
        if (slot?.pokemonRecordId !== pokemonId) return;
        removedReferences.push({ surface: "teambuilder", buildId: build.id, playerId: ownerPlayerId, index, slot: clone(slot) });
        build.slots[index] = { slotIndex: Number(slot.slotIndex ?? index) };
      });
    });
    return removedReferences;
  }

  function resolveStealPokemon(state, input = {}, options = {}) {
    const actor = (state.players || []).find((player) => player.id === input.actorPlayerId);
    const pokemon = availablePokemonRecords(state).find((record) => record.id === input.targetPokemonId);
    if (!actor) return { result: "systemFailure", refundRequired: true, reason: "The Steal user is no longer available.", operations: [] };
    if (!pokemon) return { result: "systemFailure", refundRequired: true, reason: "The selected Pokemon is no longer available.", operations: [] };
    const previousOwner = (state.players || []).find((player) => player.id === pokemon.trainerId);
    if (!previousOwner) return { result: "systemFailure", refundRequired: true, reason: "The selected Pokemon has no valid owner.", operations: [] };
    if (previousOwner.id === actor.id) return { result: "systemFailure", refundRequired: true, reason: "Steal cannot transfer the user's own Pokemon.", operations: [] };
    if (!(input.effectTags || []).map(customizationKey).includes("steal")) {
      return { result: "systemFailure", refundRequired: true, reason: "The ownership transfer is missing the formal Steal effect tag.", operations: [] };
    }
    if (playerHasStickyHold(state, previousOwner.id)) {
      return {
        result: "blocked",
        refundRequired: false,
        reason: `${previousOwner.name || "The target player"} is protected from Steal by Sticky Hold.`,
        protectionResult: "blockedByStickyHold",
        pokemon,
        previousOwner,
        operations: []
      };
    }
    const previousLocation = {
      status: pokemon.status || "",
      rosterType: pokemon.rosterType || "",
      ownerPlayerId: previousOwner.id
    };
    const previousPokemon = clone(pokemon);
    const previousTeambuilder = clone(state.teambuilder || {});
    const previousBattleTeams = clone(state.battleTeams || {});
    state.effectOperations ||= [];
    const operationStart = state.effectOperations.length;
    try {
      const removedTeamReferences = removePokemonFromCurrentTeamSurfaces(state, pokemon.id, previousOwner.id, options);
      pokemon.trainerId = actor.id;
      pokemon.status = "Active";
      pokemon.rosterType = "Active";
      const operation = operationRecord({
        operationType: EFFECT_OPERATION_TYPES.TRANSFER_POKEMON_OWNERSHIP,
        sourceEffectId: input.sourceEffectId,
        sourceActivationId: input.sourceActivationId,
        sourceTokenId: input.sourceTokenId,
        sourceTokenName: input.sourceTokenName || "Steal",
        sourcePlayerId: actor.id,
        targetPlayerId: previousOwner.id,
        targetObjectId: pokemon.id,
        targetObjectName: pokemon.name || pokemon.currentSpecies || "Pokemon",
        objectCategory: "Pokemon",
        previousOwnerPlayerId: previousOwner.id,
        newOwnerPlayerId: actor.id,
        previousLocation: previousLocation.rosterType || previousLocation.status || "Active",
        newLocation: "Active",
        protectionResult: "notProtected",
        consumptionRecordId: input.consumptionRecordId,
        targetSnapshot: previousPokemon,
        undoData: {
          restoreOwnerPlayerId: previousOwner.id,
          restoreStatus: previousLocation.status,
          restoreRosterType: previousLocation.rosterType,
          removedTeamReferences
        }
      }, options);
      state.effectOperations.push(operation);
      return {
        result: "resolved",
        reason: `${actor.name || "The acting player"} stole ${previousOwner.name || "another player"}'s ${pokemon.name || "Pokemon"}.`,
        pokemon,
        previousOwner,
        newOwner: actor,
        operations: [operation],
        transferredPokemonId: pokemon.id,
        affectedPlayerIds: [previousOwner.id, actor.id]
      };
    } catch (error) {
      Object.keys(pokemon).forEach((key) => delete pokemon[key]);
      Object.assign(pokemon, previousPokemon);
      state.teambuilder = previousTeambuilder;
      state.battleTeams = previousBattleTeams;
      state.effectOperations.splice(operationStart);
      return { result: "systemFailure", refundRequired: true, reason: error.message, operations: [] };
    }
  }

  function customizationLegality(input = {}) {
    const kind = String(input.kind || "").trim().toLowerCase();
    const name = String(input.name || "").trim();
    if (!Object.values(CUSTOMIZATION_KINDS).includes(kind)) {
      return { ok: false, reason: "Choose an Ability or move customization." };
    }
    if (!name) return { ok: false, reason: `Choose a ${kind === CUSTOMIZATION_KINDS.ABILITY ? "AAA-approved Ability" : "move"}.` };
    const banned = new Set((GENERIC_CUSTOMIZATION_BANS[kind] || []).map(customizationKey));
    if (!banned.has(customizationKey(name))) return { ok: true, reason: "" };
    const sourceType = String(input.sourceType || "").trim().toLowerCase();
    const explicitAllowlist = [
      ...(Array.isArray(input.explicitAllowlist) ? input.explicitAllowlist : []),
      ...(kind === CUSTOMIZATION_KINDS.ABILITY && Array.isArray(input.explicitAbilityAllowlist) ? input.explicitAbilityAllowlist : []),
      ...(kind === CUSTOMIZATION_KINDS.MOVE && Array.isArray(input.explicitMoveAllowlist) ? input.explicitMoveAllowlist : [])
    ].map(customizationKey);
    if (sourceType === "class" && explicitAllowlist.includes(customizationKey(name))) {
      return { ok: true, reason: "", sourceSpecificOverride: true };
    }
    return {
      ok: false,
      reason: `${name} is banned from generic ${kind === CUSTOMIZATION_KINDS.ABILITY ? "Ability" : "move"} injection.`
    };
  }

  function canonicalApplicationScope(value = "") {
    const raw = String(value || "").trim();
    if (Object.values(APPLICATION_SCOPES).includes(raw)) return raw;
    if (raw === "species") return APPLICATION_SCOPES.GLOBAL_SPECIES;
    if (raw === "singleTeam") return APPLICATION_SCOPES.SUBMITTED_TEAM_INSTANCES;
    if (raw === "allPlayers") return APPLICATION_SCOPES.ALL_PLAYERS;
    if (raw === "tableWide") return APPLICATION_SCOPES.TABLE_WIDE;
    return raw === "rosterInstance" ? APPLICATION_SCOPES.ROSTER_INSTANCE : raw;
  }

  function canonicalScopeRecord(input = {}) {
    const selectedRosterInstanceIds = uniqueIds([
      input.selectedRosterInstanceId,
      ...(Array.isArray(input.selectedRosterInstanceIds) ? input.selectedRosterInstanceIds : []),
      input.targetPokemonId
    ]);
    const affectedRosterInstanceIds = uniqueIds(input.affectedRosterInstanceIds || selectedRosterInstanceIds);
    const selectedRosterInstanceId = String(input.selectedRosterInstanceId || selectedRosterInstanceIds[0] || "");
    const selectedSpeciesId = input.selectedSpeciesId
      || input.speciesId
      || input.targetPokemonNameKey
      || defaultSpeciesKey(input.speciesName || input.targetPokemonName || "");
    return {
      selectedTargetType: input.selectedTargetType || input.targetType || (selectedRosterInstanceIds.length ? "pokemon" : "manual"),
      applicationScope: canonicalApplicationScope(input.applicationScope || input.targetScope || (selectedRosterInstanceIds.length ? APPLICATION_SCOPES.ROSTER_INSTANCE : "")),
      affectedEntityType: input.affectedEntityType || (selectedRosterInstanceIds.length ? "pokemon" : input.selectedTargetType || input.targetType || "manual"),
      selectedRosterInstanceId,
      selectedSpeciesId,
      speciesId: selectedSpeciesId,
      selectedRosterInstanceIds,
      affectedRosterInstanceIds,
      excludedRosterInstanceIds: uniqueIds(input.excludedRosterInstanceIds),
      sourceEffectId: input.sourceEffectId || input.eventId || "",
      sourcePlayerId: input.sourcePlayerId || input.actorPlayerId || ""
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

  function remainingGyms(status, context = {}) {
    if (!status?.durationGyms) return null;
    const elapsed = gymDistance(
      status.series,
      status.gym,
      context.series,
      context.gym,
      context.seriesOrder || []
    );
    return Math.max(0, Number(status.durationGyms) - elapsed);
  }

  function phaseAnchoredExpirationReached(status, context = {}) {
    if (!status?.durationGyms || !status?.expiresAtPhase) return false;
    const elapsed = gymDistance(
      status.series,
      status.gym,
      context.series,
      context.gym,
      context.seriesOrder || []
    );
    const duration = Number(status.durationGyms || 0);
    if (elapsed > duration) return true;
    if (elapsed < duration) return false;
    const anchorIndex = PHASE_ANCHOR_ORDER.indexOf(status.expiresAtPhase);
    const currentIndex = PHASE_ANCHOR_ORDER.indexOf(context.phase || "");
    if (anchorIndex < 0 || currentIndex < 0) return status.expiresAtPhase === context.phase;
    return currentIndex >= anchorIndex;
  }

  function statusIsActive(status, context = {}) {
    if (!status || status.status !== "active") return false;
    if (status.payload?.phaseScope && !phaseStatusMatches(status, context)) return false;
    if (status.expiresAtPhase) return !phaseAnchoredExpirationReached(status, context);
    const remaining = remainingGyms(status, context);
    return remaining === null || remaining > 0;
  }

  function sameGymPosition(left = {}, right = {}) {
    return String(left.series || "") === String(right.series || "")
      && Number(left.gym || 0) === Number(right.gym || 0);
  }

  function statusSuppressedByColdWave(state, status, context = {}) {
    if (!status?.isOngoingEffect || status.type === CONTROL_STATUS_TYPES.COLD_WAVE_SUPPRESSION) return false;
    return (state.lingeringStatuses || []).some((candidate) => (
      candidate.type === CONTROL_STATUS_TYPES.COLD_WAVE_SUPPRESSION
      && statusIsActive(candidate, context)
      && sameGymPosition(candidate, context)
    ));
  }

  function ongoingRecordSuppressedByColdWave(state, record, context = {}) {
    if (!record?.isOngoingEffect) return false;
    return (state.lingeringStatuses || []).some((candidate) => (
      candidate.type === CONTROL_STATUS_TYPES.COLD_WAVE_SUPPRESSION
      && statusIsActive(candidate, context)
      && sameGymPosition(candidate, context)
      && sameGymPosition(record, context)
    ));
  }

  function activeStatuses(state, context = {}, predicate = () => true) {
    return (state.lingeringStatuses || []).filter((status) => (
      statusIsActive(status, context)
      && !statusSuppressedByColdWave(state, status, context)
      && predicate(status)
    ));
  }

  function statusSpeciesKey(status, keyForSpecies = defaultSpeciesKey) {
    return status?.speciesId || status?.targetPokemonNameKey || keyForSpecies(status?.targetPokemonName || "");
  }

  function activeSpeciesStatuses(state, speciesName, types, options = {}) {
    const keyForSpecies = options.keyForSpecies || defaultSpeciesKey;
    const speciesKey = keyForSpecies(speciesName);
    const allowedTypes = new Set(Array.isArray(types) ? types : [types]);
    return activeStatuses(state, options, (status) => (
      allowedTypes.has(status.type)
      && statusSpeciesKey(status, keyForSpecies) === speciesKey
    ));
  }

  function phaseStatusMatches(status, options = {}) {
    const scope = status?.payload?.phaseScope || {};
    return (!scope.series || scope.series === options.series)
      && (!scope.gym || Number(scope.gym) === Number(options.gym))
      && (!scope.phase || scope.phase === options.phase);
  }

  function speciesHasUnbanProtection(state, speciesName, options = {}) {
    return activeSpeciesStatuses(state, speciesName, CONTROL_STATUS_TYPES.UNBAN_PROTECTION, options).length > 0;
  }

  function speciesHasBanPhaseProtection(state, speciesName, options = {}) {
    return activeSpeciesStatuses(state, speciesName, CONTROL_STATUS_TYPES.BAN_PHASE_PROTECTION, options)
      .some((status) => phaseStatusMatches(status, options));
  }

  function pokemonHasRestrictImmunity(state, pokemon, options = {}) {
    if (!pokemon?.id) return false;
    return activeStatuses(state, options, (status) => (
      [CONTROL_STATUS_TYPES.RESTRICT_IMMUNITY, CONTROL_STATUS_TYPES.RAGE_ENHANCEMENT].includes(status.type)
      && status.targetPokemonId === pokemon.id
      && status.payload?.restrictImmune === true
    )).length > 0;
  }

  function pokemonHasArenaTrap(state, pokemon, options = {}) {
    if (!pokemon?.id) return false;
    return activeStatuses(state, options, (status) => (
      status.type === CONTROL_STATUS_TYPES.ARENA_TRAP
      && statusAffectsPokemon(status, pokemon, options)
      && status.payload?.mustBeBrought === true
    )).length > 0;
  }

  function statusAffectsPokemon(status, pokemon, options = {}) {
    if (!statusIsActive(status, options) || statusSuppressedByColdWave(options.state || {}, status, options) || !pokemon?.id) return false;
    const scope = canonicalScopeRecord(status);
    if (scope.excludedRosterInstanceIds.includes(pokemon.id)) return false;
    if (scope.applicationScope === APPLICATION_SCOPES.GLOBAL_SPECIES) {
      const keyForSpecies = options.keyForSpecies || defaultSpeciesKey;
      return statusSpeciesKey(status, keyForSpecies) === keyForSpecies(pokemon.name || pokemon.currentSpecies || "");
    }
    if ([
      APPLICATION_SCOPES.ROSTER_INSTANCE,
      APPLICATION_SCOPES.SELECTED_ROSTER_INSTANCES,
      APPLICATION_SCOPES.SUBMITTED_TEAM_INSTANCES,
      APPLICATION_SCOPES.PLAYER_ROSTER_INSTANCES
    ].includes(scope.applicationScope)) {
      return scope.affectedRosterInstanceIds.includes(pokemon.id)
        || (!scope.affectedRosterInstanceIds.length && status.targetPokemonId === pokemon.id);
    }
    if (!scope.applicationScope && status.targetPokemonName) {
      const keyForSpecies = options.keyForSpecies || defaultSpeciesKey;
      return statusSpeciesKey(status, keyForSpecies) === keyForSpecies(pokemon.name || pokemon.currentSpecies || "");
    }
    return status.targetPokemonId === pokemon.id;
  }

  function snapshot(state) {
    return clone({
      players: state.players || [],
      pokemonRecords: state.pokemonRecords || [],
      lingeringStatuses: state.lingeringStatuses || [],
      globalPokemonRules: state.globalPokemonRules || {},
      banlistHistory: state.banlistHistory || [],
      effectOperations: state.effectOperations || [],
      teambuilder: state.teambuilder || {},
      battleTeams: state.battleTeams || {},
      perkSystem: state.perkSystem || {},
      classStateByPlayerId: state.classStateByPlayerId || {},
      playerNotifications: state.playerNotifications || [],
      delayedEffects: state.delayedEffects || [],
      broughtTeamSnapshots: state.broughtTeamSnapshots || [],
      copiedActivations: state.copiedActivations || [],
      copiedTokenRelationships: state.copiedTokenRelationships || [],
      privateEffectRecords: state.privateEffectRecords || [],
    });
  }

  function restore(state, saved = {}) {
    state.players = clone(saved.players || []);
    state.pokemonRecords = clone(saved.pokemonRecords || []);
    state.lingeringStatuses = clone(saved.lingeringStatuses || []);
    state.globalPokemonRules = clone(saved.globalPokemonRules || {});
    state.banlistHistory = clone(saved.banlistHistory || []);
    state.effectOperations = clone(saved.effectOperations || []);
    state.teambuilder = clone(saved.teambuilder || {});
    state.battleTeams = clone(saved.battleTeams || {});
    state.perkSystem = clone(saved.perkSystem || {});
    state.classStateByPlayerId = clone(saved.classStateByPlayerId || {});
    state.playerNotifications = clone(saved.playerNotifications || []);
    state.delayedEffects = clone(saved.delayedEffects || []);
    state.broughtTeamSnapshots = clone(saved.broughtTeamSnapshots || []);
    state.copiedActivations = clone(saved.copiedActivations || []);
    state.copiedTokenRelationships = clone(saved.copiedTokenRelationships || []);
    state.privateEffectRecords = clone(saved.privateEffectRecords || []);
    return state;
  }

  function createStatus(state, input, options = {}) {
    const keyForSpecies = options.keyForSpecies || defaultSpeciesKey;
    const now = options.now || new Date().toISOString();
    const makeId = options.makeId || ((prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
    const scope = canonicalScopeRecord(input);
    const status = {
      id: input.id || makeId("status"),
      type: input.type,
      name: input.name || input.type,
      category: input.category || "Control",
      isCurse: Boolean(input.isCurse),
      isOngoingEffect: input.isOngoingEffect === true,
      status: "active",
      sourceType: input.sourceType || "token",
      sourceTokenId: input.sourceTokenId || "",
      sourceTokenName: input.sourceTokenName || "",
      actorPlayerId: input.actorPlayerId || "",
      actorPlayerName: input.actorPlayerName || "",
      targetPlayerId: input.targetPlayerId || "",
      targetPlayerName: input.targetPlayerName || "",
      targetPokemonId: input.targetPokemonId || "",
      targetPokemonName: input.targetPokemonName || "",
      targetPokemonNameKey: input.targetPokemonNameKey || keyForSpecies(input.targetPokemonName || ""),
      ...scope,
      series: options.series || state.series,
      gym: Number(options.gym || state.gym || 1),
      phase: options.phase || "",
      duration: input.duration || "",
      durationGyms: input.durationGyms || null,
      expiresAtSeries: input.expiresAtSeries || "",
      expiresAtGym: input.expiresAtGym || null,
      expiresAtPhase: input.expiresAtPhase || "",
      substituteInterceptionPolicy: input.substituteInterceptionPolicy || "",
      substituteChecksSelectedTargetOnly: Boolean(input.substituteChecksSelectedTargetOnly),
      payload: clone(input.payload || {}),
      note: input.note || "",
      createdAt: now
    };
    state.lingeringStatuses ||= [];
    state.lingeringStatuses.push(status);
    return status;
  }

  function gymPositionAfter(series, gym, amount = 1, seriesOrder = []) {
    let seriesIndex = Math.max(0, seriesOrder.indexOf(series));
    let nextGym = Number(gym || 1) + Number(amount || 0);
    while (nextGym > 9 && seriesIndex < seriesOrder.length - 1) {
      nextGym -= 9;
      seriesIndex += 1;
    }
    return { series: seriesOrder[seriesIndex] || series, gym: nextGym };
  }

  function activeMoveRestrictions(state, options = {}) {
    return (state.lingeringStatuses || []).filter((status) => (
      status.status === "active"
      && status.type === CONTROL_STATUS_TYPES.MOVE_RESTRICTION
      && sameGymPosition({
        series: status.payload?.activeSeries,
        gym: status.payload?.activeGym
      }, options)
    ));
  }

  function moveRestrictionForName(state, moveName, options = {}) {
    const moveId = customizationKey(moveName);
    return activeMoveRestrictions(state, options).find((status) => status.payload?.moveId === moveId) || null;
  }

  function resolveMoveDeleter(state, input = {}, options = {}) {
    const moveName = String(input.moveName || input.resourceName || input.choice || "").trim();
    const moveId = customizationKey(input.moveId || moveName);
    if (!moveName || !moveId) return { result: "systemFailure", refundRequired: true, reason: "Choose one canonical move for Move Deleter.", statusIds: [] };
    if (typeof options.moveExists === "function" && !options.moveExists(moveName)) {
      return { result: "systemFailure", refundRequired: true, reason: `${moveName} is not in the canonical move list.`, statusIds: [] };
    }
    const duplicate = (state.lingeringStatuses || []).find((status) => (
      status.sourceEffectId === input.sourceEffectId
      && status.type === CONTROL_STATUS_TYPES.MOVE_RESTRICTION
    ));
    if (duplicate) return { result: "resolved", reason: `${moveName} was already scheduled by this activation.`, statusIds: [duplicate.id], status: duplicate, duplicateResolution: true };
    const activeAt = gymPositionAfter(options.series || state.series, Number(options.gym || state.gym || 1), 1, options.seriesOrder || []);
    const expiresAfter = gymPositionAfter(activeAt.series, activeAt.gym, 1, options.seriesOrder || []);
    const status = createStatus(state, {
      ...input,
      type: CONTROL_STATUS_TYPES.MOVE_RESTRICTION,
      name: `Move Deleter: ${moveName}`,
      category: "Control",
      selectedTargetType: "move",
      applicationScope: APPLICATION_SCOPES.TABLE_WIDE,
      affectedEntityType: "move",
      duration: "Next Gym",
      payload: {
        moveId,
        moveName,
        activeSeries: activeAt.series,
        activeGym: activeAt.gym,
        expiresAfterSeries: expiresAfter.series,
        expiresAfterGym: expiresAfter.gym,
        globalMoveRestriction: true
      },
      note: `${moveName} cannot be selected, validated, exported, or generated during ${activeAt.series} Gym ${activeAt.gym}.`
    }, options);
    return {
      result: "resolved",
      reason: `${moveName} is scheduled to be unavailable during ${activeAt.series} Gym ${activeAt.gym}.`,
      statusIds: [status.id],
      status,
      moveId,
      moveName,
      activeAt,
      expiresAfter,
      resultData: { createdStatusIds: [status.id], moveId, moveName, activeAt, expiresAfter }
    };
  }

  function expireMoveRestrictionsAtGymEnd(state, options = {}) {
    const now = options.now || new Date().toISOString();
    const expired = activeMoveRestrictions(state, options);
    expired.forEach((status) => {
      status.status = "expired";
      status.expiredAt = now;
      status.expirationReason = "The Move Deleter Gym ended";
    });
    return expired;
  }

  function resolveColdWave(state, input = {}, options = {}) {
    const duplicate = (state.lingeringStatuses || []).find((status) => (
      status.sourceEffectId === input.sourceEffectId
      && status.type === CONTROL_STATUS_TYPES.COLD_WAVE_SUPPRESSION
    ));
    if (duplicate) return { result: "resolved", reason: "Cold Wave was already applied by this activation.", statusIds: [duplicate.id], status: duplicate, duplicateResolution: true };
    const ongoingStatusIds = (state.lingeringStatuses || []).filter((status) => (
      status.status === "active"
      && status.isOngoingEffect === true
      && status.type !== CONTROL_STATUS_TYPES.COLD_WAVE_SUPPRESSION
    )).map((status) => status.id);
    const ongoingRelationshipIds = (state.copiedTokenRelationships || []).filter((record) => (
      record.status === "active"
      && record.isOngoingEffect === true
      && sameGymPosition(record, options)
    )).map((record) => record.id);
    const ongoingEffectIds = uniqueIds([...ongoingStatusIds, ...ongoingRelationshipIds]);
    const status = createStatus(state, {
      ...input,
      type: CONTROL_STATUS_TYPES.COLD_WAVE_SUPPRESSION,
      name: "Cold Wave",
      category: "Control",
      selectedTargetType: "table",
      applicationScope: APPLICATION_SCOPES.TABLE_WIDE,
      affectedEntityType: "ongoingEffect",
      duration: "Until End of Gym",
      payload: {
        suppressesAllExplicitOngoingEffects: true,
        observedOngoingEffectIds: ongoingEffectIds,
        suppressionSeries: options.series || state.series,
        suppressionGym: Number(options.gym || state.gym || 1)
      },
      note: "Explicit ongoing effects are suppressed without being removed, negated, cleansed, or expired."
    }, options);
    return {
      result: "resolved",
      reason: `Cold Wave suppressed ${ongoingEffectIds.length} active ongoing effect${ongoingEffectIds.length === 1 ? "" : "s"} until End of Gym.`,
      statusIds: [status.id],
      status,
      suppressedEffectIds: ongoingEffectIds,
      resultData: { createdStatusIds: [status.id], suppressedEffectIds: ongoingEffectIds }
    };
  }

  function expireColdWaveAtGymEnd(state, options = {}) {
    const now = options.now || new Date().toISOString();
    const expired = (state.lingeringStatuses || []).filter((status) => (
      status.status === "active"
      && status.type === CONTROL_STATUS_TYPES.COLD_WAVE_SUPPRESSION
      && sameGymPosition(status, options)
    ));
    expired.forEach((status) => {
      status.status = "expired";
      status.expiredAt = now;
      status.expirationReason = "Cold Wave ended with the Gym";
    });
    return expired;
  }

  function activeExplicitOngoingEffects(state, options = {}) {
    return (state.lingeringStatuses || []).filter((status) => (
      status.status === "active"
      && status.isOngoingEffect === true
      && status.type !== CONTROL_STATUS_TYPES.COLD_WAVE_SUPPRESSION
      && status.type !== CONTROL_STATUS_TYPES.ONGOING_TEXT_REPLACEMENT
      && (!options.excludeSuppressed || !statusSuppressedByColdWave(state, status, options))
    ));
  }

  function ongoingEffectBenefitsPlayer(effect = {}, playerId = "") {
    if (!effect || !playerId) return false;
    return [
      effect.targetPlayerId,
      effect.beneficiaryPlayerId,
      effect.ownerPlayerId,
      effect.payload?.targetPlayerId,
      effect.payload?.beneficiaryPlayerId,
      ...(effect.affectedPlayerIds || []),
      ...(effect.payload?.affectedPlayerIds || [])
    ].filter(Boolean).includes(playerId);
  }

  function lingeringAromaTargetingCosts(state, declaringPlayerId = "", targetPlayerIds = [], options = {}) {
    const uniqueTargets = uniqueIds(targetPlayerIds);
    return activeStatuses(state, options, (status) => (
      status.type === CONTROL_STATUS_TYPES.ONGOING_TEXT_REPLACEMENT
      && uniqueTargets.includes(status.targetPlayerId)
      && status.targetPlayerId !== declaringPlayerId
      && status.payload?.declarationCostAmount === 500
    )).map((status) => ({
      statusId: status.id,
      payerPlayerId: declaringPlayerId,
      recipientPlayerId: status.targetPlayerId,
      amount: 500,
      reason: "Lingering Aroma targeting declaration cost"
    })).filter((cost, index, list) => list.findIndex((entry) => entry.recipientPlayerId === cost.recipientPlayerId) === index);
  }

  function applyLingeringAromaTargetingCosts(state, input = {}, options = {}) {
    const costs = lingeringAromaTargetingCosts(state, input.declaringPlayerId, input.targetPlayerIds, options);
    if (!costs.length) return { result: "resolved", costs: [], reason: "No Lingering Aroma declaration cost applied." };
    const payer = (state.players || []).find((player) => player.id === input.declaringPlayerId);
    const total = costs.reduce((sum, cost) => sum + cost.amount, 0);
    if (!payer || Number(payer.balance || 0) < total) {
      return { result: "blocked", costs, reason: `${payer?.name || "The declaring player"} cannot pay the ${total} Lingering Aroma declaration cost.` };
    }
    state.effectOperations ||= [];
    const duplicate = state.effectOperations.find((entry) => entry.operationType === "lingeringAromaDeclarationCost" && entry.sourceEffectId === input.sourceEffectId);
    if (duplicate) return { result: "resolved", costs: clone(duplicate.costs || []), operation: duplicate, duplicateResolution: true };
    const saved = snapshot(state);
    try {
      costs.forEach((cost) => {
        const recipient = (state.players || []).find((player) => player.id === cost.recipientPlayerId);
        if (!recipient) throw new Error("A Lingering Aroma payment recipient is unavailable.");
        payer.balance = Number(payer.balance || 0) - cost.amount;
        recipient.balance = Number(recipient.balance || 0) + cost.amount;
      });
      const makeId = options.makeId || ((prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
      const operation = {
        id: makeId("effect-operation"),
        operationType: "lingeringAromaDeclarationCost",
        sourceEffectId: input.sourceEffectId || "",
        status: "completed",
        costs: clone(costs),
        undoData: saved,
        createdAt: options.now || new Date().toISOString()
      };
      state.effectOperations.push(operation);
      return { result: "resolved", costs, operation, reason: `${payer.name || "The declaring player"} paid ${total} before declaring the effect.` };
    } catch (error) {
      restore(state, saved);
      return { result: "systemFailure", refundRequired: false, costs: [], reason: error?.message || "The targeting cost could not be paid atomically." };
    }
  }

  function resolveLingeringAroma(state, input = {}, options = {}) {
    const targetEffectId = String(input.targetEffectId || input.resourceName || "").trim();
    const targetEffect = (state.lingeringStatuses || []).find((status) => status.id === targetEffectId) || null;
    if (!targetEffect || targetEffect.status !== "active" || targetEffect.isOngoingEffect !== true) {
      return { result: "systemFailure", refundRequired: true, reason: "Choose one active effect explicitly classified as an ongoing effect.", statusIds: [] };
    }
    const beneficiaryPlayerId = String(input.beneficiaryPlayerId || input.actorPlayerId || "");
    if (!ongoingEffectBenefitsPlayer(targetEffect, beneficiaryPlayerId)) {
      return { result: "systemFailure", refundRequired: true, reason: "Lingering Aroma can replace only an ongoing effect attached to or benefiting its user.", statusIds: [] };
    }
    const duplicate = (state.lingeringStatuses || []).find((status) => (
      status.sourceEffectId === input.sourceEffectId
      && status.type === CONTROL_STATUS_TYPES.ONGOING_TEXT_REPLACEMENT
    ));
    if (duplicate) return { result: "resolved", reason: "Lingering Aroma was already linked by this activation.", statusIds: [duplicate.id], status: duplicate, duplicateResolution: true };
    const status = createStatus(state, {
      ...input,
      type: CONTROL_STATUS_TYPES.ONGOING_TEXT_REPLACEMENT,
      name: "Lingering Aroma",
      category: "Control",
      selectedTargetType: "resource",
      applicationScope: "manual",
      affectedEntityType: "ongoingEffect",
      isOngoingEffect: true,
      targetPlayerId: beneficiaryPlayerId,
      targetPlayerName: (state.players || []).find((player) => player.id === beneficiaryPlayerId)?.name || "",
      duration: "Until the selected ongoing effect ends",
      durationGyms: targetEffect.durationGyms,
      expiresAtSeries: targetEffect.expiresAtSeries,
      expiresAtGym: targetEffect.expiresAtGym,
      expiresAtPhase: targetEffect.expiresAtPhase,
      payload: {
        targetOngoingEffectId: targetEffect.id,
        replacementText: "Players must pay me $500 to declare an effect that targets me.",
        declarationCostAmount: 500,
        declarationCostRecipientPlayerId: beneficiaryPlayerId,
        replacesOriginalBehavior: true,
        sourceOwnerPlayerId: targetEffect.actorPlayerId || targetEffect.sourcePlayerId || ""
      },
      note: "The selected effect stops applying. This replacement uses its remaining lifetime without extending it."
    }, options);
    targetEffect.status = "replaced";
    targetEffect.replacedAt = options.now || new Date().toISOString();
    targetEffect.replacedByStatusId = status.id;
    targetEffect.replacementPreservesExpiration = true;
    return {
      result: "resolved",
      reason: `Lingering Aroma replaced ${targetEffect.name || "the selected ongoing effect"}'s active text until that effect ends.`,
      statusIds: [status.id],
      status,
      targetEffect,
      resultData: { createdStatusIds: [status.id], replacedStatusIds: [targetEffect.id], targetOngoingEffectId: targetEffect.id, beneficiaryPlayerId, replacementText: status.payload.replacementText }
    };
  }

  function expireLingeringAromaRelationships(state, options = {}) {
    const now = options.now || new Date().toISOString();
    const byId = new Map((state.lingeringStatuses || []).map((status) => [status.id, status]));
    (state.lingeringStatuses || []).filter((status) => (
      status.type === CONTROL_STATUS_TYPES.ONGOING_TEXT_REPLACEMENT && status.status !== "active"
    )).forEach((status) => {
      const target = byId.get(status.payload?.targetOngoingEffectId);
      if (target?.status === "replaced" && target.replacedByStatusId === status.id) {
        target.status = "expired";
        target.expiredAt = status.expiredAt || now;
        target.expirationReason = "Replaced by Lingering Aroma for its remaining lifetime";
      }
    });
    const expired = (state.lingeringStatuses || []).filter((status) => {
      if (status.status !== "active" || status.type !== CONTROL_STATUS_TYPES.ONGOING_TEXT_REPLACEMENT) return false;
      const target = byId.get(status.payload?.targetOngoingEffectId);
      return !target || !["active", "replaced"].includes(target.status);
    });
    expired.forEach((status) => {
      status.status = "expired";
      status.expiredAt = now;
      status.expirationReason = "The selected ongoing effect ended";
      const target = byId.get(status.payload?.targetOngoingEffectId);
      if (target?.status === "replaced" && target.replacedByStatusId === status.id) {
        target.status = "expired";
        target.expiredAt = now;
        target.expirationReason = "Replaced by Lingering Aroma for its remaining lifetime";
      }
    });
    return expired;
  }

  function smokescreenWheelPlayers(state) {
    return (state.players || [])
      .filter((player) => player && player.id)
      .map((player) => ({ id: player.id, name: player.name || "Player" }));
  }

  function smokescreenParentTarget(state, parentSource = {}) {
    const targetType = String(parentSource.targetType || "").trim();
    if (targetType === "pokemon" || parentSource.targetPokemonId) {
      const pokemon = (state.pokemonRecords || []).find((record) => record.id === parentSource.targetPokemonId) || null;
      return pokemon ? {
        targetType: "pokemon",
        targetId: pokemon.id,
        targetPlayerId: pokemon.trainerId || parentSource.targetPlayerId || "",
        targetName: pokemon.name || pokemon.currentSpecies || parentSource.targetPokemonName || "Pokemon"
      } : null;
    }
    if (targetType === "player" || parentSource.targetPlayerId) {
      const player = (state.players || []).find((entry) => entry.id === parentSource.targetPlayerId) || null;
      return player ? {
        targetType: "player",
        targetId: player.id,
        targetPlayerId: player.id,
        targetName: player.name || parentSource.targetPlayerName || "Player"
      } : null;
    }
    return null;
  }

  function smokescreenCorrespondingTargets(state, input = {}, options = {}) {
    const parentTarget = smokescreenParentTarget(state, input.parentSource || {});
    const landedPlayerId = String(input.wheelResultPlayerId || "").trim();
    if (!parentTarget || !landedPlayerId) return [];
    const landedPlayer = (state.players || []).find((player) => player.id === landedPlayerId);
    if (!landedPlayer) return [];
    const isLegalPlayer = options.isLegalPlayer || (() => true);
    const isLegalPokemon = options.isLegalPokemon || (() => true);
    if (parentTarget.targetType === "player") {
      return isLegalPlayer(landedPlayer, parentTarget, input.parentSource || {})
        ? [{ id: landedPlayer.id, name: landedPlayer.name || "Player", playerId: landedPlayer.id, targetType: "player" }]
        : [];
    }
    return availablePokemonRecords(state)
      .filter((pokemon) => pokemon.trainerId === landedPlayer.id)
      .filter((pokemon) => String(pokemon.rosterType || "Active").trim().toLowerCase() === "active")
      .filter((pokemon) => isLegalPokemon(pokemon, parentTarget, input.parentSource || {}))
      .map((pokemon) => ({
        id: pokemon.id,
        name: pokemon.name || pokemon.currentSpecies || "Pokemon",
        playerId: landedPlayer.id,
        playerName: landedPlayer.name || "Player",
        targetType: "pokemon"
      }));
  }

  function resolveSmokescreenRedirect(state, input = {}, options = {}) {
    const wheelPlayers = smokescreenWheelPlayers(state);
    const parentTarget = smokescreenParentTarget(state, input.parentSource || {});
    const wheelResultPlayerId = String(input.wheelResultPlayerId || "").trim();
    if (!parentTarget) return { result: "systemFailure", refundRequired: true, reason: "Smokescreen could not identify the exact original Player or Pokemon target." };
    if (!wheelPlayers.some((player) => player.id === wheelResultPlayerId)) {
      return { result: "awaitingRequiredChoice", reason: "Spin the Smokescreen wheel once before resolving." };
    }
    if (wheelResultPlayerId === parentTarget.targetPlayerId) {
      return {
        result: "resolvedNoEffect",
        reason: "The wheel landed on the original target's player, so the original target remains.",
        wheelResultPlayerId,
        originalTargetPlayerId: parentTarget.targetPlayerId,
        keptOriginalTarget: true,
        targetPatch: null
      };
    }
    const candidates = smokescreenCorrespondingTargets(state, { ...input, parentSource: input.parentSource }, options);
    if (!candidates.length) {
      return {
        result: "resolvedNoEffect",
        reason: "The wheel result has no legal corresponding target, so the original target remains.",
        wheelResultPlayerId,
        originalTargetPlayerId: parentTarget.targetPlayerId,
        noLegalCorrespondingTarget: true,
        keptOriginalTarget: true,
        targetPatch: null
      };
    }
    const replacementTargetId = String(input.replacementTargetId || "").trim();
    const replacement = candidates.find((candidate) => candidate.id === replacementTargetId) || null;
    if (!replacement) {
      return {
        result: "awaitingRequiredChoice",
        reason: `Choose one legal corresponding ${parentTarget.targetType === "pokemon" ? "Pokemon" : "player"} from the wheel result.`,
        wheelResultPlayerId,
        originalTargetPlayerId: parentTarget.targetPlayerId,
        candidates
      };
    }
    const targetPatch = replacement.targetType === "player"
      ? {
        targetType: "player",
        targetScope: "singlePlayer",
        targetPlayerId: replacement.id,
        targetPlayerName: replacement.name,
        targetPokemonId: "",
        targetPokemonName: "",
        targetText: replacement.name
      }
      : {
        targetType: "pokemon",
        targetScope: "rosterInstance",
        targetPlayerId: replacement.playerId,
        targetPlayerName: replacement.playerName,
        targetPokemonId: replacement.id,
        targetPokemonName: replacement.name,
        targetText: `${replacement.playerName} - ${replacement.name}`
      };
    return {
      result: "redirected",
      reason: `${parentTarget.targetName} was redirected to ${replacement.name}.`,
      wheelResultPlayerId,
      originalTargetPlayerId: parentTarget.targetPlayerId,
      replacementTargetId: replacement.id,
      replacement,
      replacedOriginalTarget: true,
      targetPatch,
      candidates
    };
  }

  function createImmutableBroughtSnapshot(state, input = {}, options = {}) {
    const existing = (state.broughtTeamSnapshots || []).find((entry) => entry.id === input.id);
    if (existing) return existing;
    const now = options.now || new Date().toISOString();
    const makeId = options.makeId || ((prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
    const broughtByPlayer = input.broughtByPlayer || {};
    const players = Object.entries(broughtByPlayer).map(([playerId, entries]) => ({
      playerId,
      pokemon: (entries || []).map((entry) => {
        const source = typeof entry === "string" ? { rosterInstanceId: entry } : entry || {};
        const pokemon = (state.pokemonRecords || []).find((record) => record.id === source.rosterInstanceId);
        return {
          rosterInstanceId: String(source.rosterInstanceId || ""),
          speciesName: String(source.speciesName || pokemon?.name || pokemon?.currentSpecies || ""),
          heldItemName: String(source.heldItemName || ""),
          heldInventoryItemId: String(source.heldInventoryItemId || ""),
          battleRecordIds: uniqueIds(source.battleRecordIds || [])
        };
      }).filter((entry) => entry.rosterInstanceId)
    }));
    const record = {
      id: input.id || makeId("brought-snapshot"),
      series: input.series || options.series || state.series,
      gym: Number(input.gym || options.gym || state.gym || 1),
      source: input.source || "postPayout",
      immutable: true,
      players,
      createdAt: now
    };
    state.broughtTeamSnapshots ||= [];
    state.broughtTeamSnapshots.push(record);
    return record;
  }

  function broughtSnapshotPlayer(snapshotRecord, playerId) {
    return snapshotRecord?.players?.find((entry) => entry.playerId === playerId) || null;
  }

  function releaseExactRosterInstance(state, rosterInstanceId, releaseContext = {}) {
    const pokemon = (state.pokemonRecords || []).find((record) => record.id === rosterInstanceId);
    if (!pokemon) throw new Error(`Roster instance ${rosterInstanceId} no longer exists.`);
    pokemon.status = "Released";
    pokemon.rosterType = "Released";
    pokemon.releasedAt = releaseContext.releasedAt || new Date().toISOString();
    pokemon.releasedByEffectId = releaseContext.sourceEffectId || "";
    pokemon.releaseReason = releaseContext.reason || "Token effect";
    (state.players || []).forEach((player) => {
      if (Array.isArray(player.pokemonIds)) player.pokemonIds = player.pokemonIds.filter((id) => id !== pokemon.id);
    });
    return pokemon;
  }

  function resolvePurgeMarker(state, input = {}, options = {}) {
    const targetPlayer = (state.players || []).find((player) => player.id === input.targetPlayerId);
    if (!targetPlayer) return { result: "systemFailure", refundRequired: true, reason: "Choose one current player for Purge.", statusIds: [] };
    const duplicate = (state.lingeringStatuses || []).find((status) => status.sourceEffectId === input.sourceEffectId && status.type === CONTROL_STATUS_TYPES.PURGE_MARKER);
    if (duplicate) return { result: "resolved", reason: "Purge was already marked by this activation.", statusIds: [duplicate.id], status: duplicate, duplicateResolution: true };
    const status = createStatus(state, {
      ...input,
      type: CONTROL_STATUS_TYPES.PURGE_MARKER,
      name: "Purge Curse",
      category: "Curse",
      isCurse: true,
      targetPlayerId: targetPlayer.id,
      targetPlayerName: targetPlayer.name || "Player",
      selectedTargetType: "player",
      applicationScope: APPLICATION_SCOPES.SUBMITTED_TEAM_INSTANCES,
      affectedEntityType: "pokemon",
      duration: "Until post-payout resolution",
      payload: {
        absolutePostPayoutRemoval: true,
        ignoresGameplayPrevention: true,
        declarationSeries: options.series || state.series,
        declarationGym: Number(options.gym || state.gym || 1)
      }
    }, options);
    return { result: "resolved", reason: `${targetPlayer.name || "The player"}'s immutable brought team will be Purged after payout.`, statusIds: [status.id], status };
  }

  function resolvePostPayoutPurge(state, input = {}, options = {}) {
    const marker = (state.lingeringStatuses || []).find((status) => status.id === input.markerStatusId && status.type === CONTROL_STATUS_TYPES.PURGE_MARKER);
    const broughtSnapshot = (state.broughtTeamSnapshots || []).find((entry) => entry.id === input.broughtSnapshotId);
    const duplicate = marker && (state.effectOperations || []).find((operation) => operation.operationType === "purgePostPayout" && operation.sourceEffectId === marker.sourceEffectId);
    if (duplicate) return { result: duplicate.result || "resolved", reason: "Purge was already resolved for this activation.", operation: duplicate, duplicateResolution: true };
    if (!marker || marker.status !== "active") return { result: "systemFailure", refundRequired: true, reason: "The active Purge marker is unavailable." };
    if (!broughtSnapshot?.immutable) return { result: "systemFailure", refundRequired: true, reason: "The immutable post-payout brought snapshot is unavailable." };
    const saved = snapshot(state);
    const targetEntries = broughtSnapshotPlayer(broughtSnapshot, marker.targetPlayerId)?.pokemon || [];
    try {
      const released = targetEntries.map((entry) => releaseExactRosterInstance(state, entry.rosterInstanceId, {
        sourceEffectId: marker.sourceEffectId,
        reason: "Purge Curse post-payout resolution",
        releasedAt: options.now
      }));
      marker.status = "resolved";
      marker.resolvedAt = options.now || new Date().toISOString();
      marker.payload.broughtSnapshotId = broughtSnapshot.id;
      marker.payload.releasedRosterInstanceIds = released.map((pokemon) => pokemon.id);
      const operation = operationRecord({
        operationType: "purgePostPayout",
        sourceEffectId: marker.sourceEffectId,
        sourceTokenId: marker.sourceTokenId,
        sourceTokenName: marker.sourceTokenName,
        sourcePlayerId: marker.actorPlayerId,
        targetPlayerId: marker.targetPlayerId,
        targetSnapshot: { broughtSnapshotId: broughtSnapshot.id, rosterInstanceIds: targetEntries.map((entry) => entry.rosterInstanceId) },
        undoData: saved
      }, options);
      operation.result = released.length ? "resolved" : "resolvedNoEffect";
      operation.releasedRosterInstanceIds = released.map((pokemon) => pokemon.id);
      state.effectOperations ||= [];
      state.effectOperations.push(operation);
      return {
        result: operation.result,
        reason: released.length ? `Purge released ${released.length} exact brought Pokemon after payout.` : "Purge resolved with no brought Pokemon to release.",
        releasedPokemon: released,
        operation,
        resultData: { broughtSnapshotId: broughtSnapshot.id, releasedRosterInstanceIds: operation.releasedRosterInstanceIds, ignoredGameplayPrevention: true }
      };
    } catch (error) {
      restore(state, saved);
      return { result: "systemFailure", refundRequired: true, reason: error?.message || "Purge could not complete atomically." };
    }
  }

  function resolveRevengePostPayout(state, input = {}, options = {}) {
    const broughtSnapshot = (state.broughtTeamSnapshots || []).find((entry) => entry.id === input.broughtSnapshotId);
    if (!broughtSnapshot?.immutable) return { result: "systemFailure", refundRequired: true, reason: "The immutable post-payout brought snapshot is unavailable." };
    const sourcePlayerId = String(input.sourcePlayerId || "");
    const offenderPlayerId = String(input.offenderPlayerId || "");
    const qualifyingCurses = (input.qualifyingCurseRecords || []).filter((record) => (
      record.sourcePlayerId === offenderPlayerId
      && record.targetPlayerId === sourcePlayerId
      && record.targetRosterInstanceId
      && broughtSnapshotPlayer(broughtSnapshot, sourcePlayerId)?.pokemon.some((entry) => entry.rosterInstanceId === record.targetRosterInstanceId)
    ));
    if (!sourcePlayerId || !offenderPlayerId || !qualifyingCurses.length) {
      return { result: "systemFailure", refundRequired: true, reason: "Revenge requires an opponent who cursed one of the user's exact brought Pokemon during this Battle Phase." };
    }
    const selectedIds = uniqueIds(input.selectedRosterInstanceIds || []);
    const offenderBrought = broughtSnapshotPlayer(broughtSnapshot, offenderPlayerId)?.pokemon || [];
    if (selectedIds.length !== 2 || selectedIds.some((id) => !offenderBrought.some((entry) => entry.rosterInstanceId === id))) {
      return { result: "systemFailure", refundRequired: true, reason: "Choose exactly two exact Pokemon from the offender's immutable brought-team snapshot." };
    }
    const duplicate = (state.effectOperations || []).find((operation) => operation.operationType === "revengePostPayout" && operation.sourceEffectId === input.sourceEffectId);
    if (duplicate) return { result: duplicate.result || "resolved", reason: "Revenge was already resolved for this activation.", operation: duplicate, duplicateResolution: true };
    const heldSelection = input.heldItemSelection || null;
    let heldResource = null;
    if (heldSelection) {
      const selectedEntry = offenderBrought.find((entry) => entry.rosterInstanceId === heldSelection.rosterInstanceId && selectedIds.includes(entry.rosterInstanceId));
      if (!selectedEntry || !selectedEntry.heldInventoryItemId || selectedEntry.heldInventoryItemId !== heldSelection.inventoryItemId) {
        return { result: "systemFailure", refundRequired: true, reason: "Revenge can destroy a held item only through its exact immutable inventory reference." };
      }
      const offender = (state.players || []).find((player) => player.id === offenderPlayerId);
      heldResource = (offender?.inventory || []).find((item) => item.id === heldSelection.inventoryItemId) || null;
      if (!heldResource || isMasterBallResource(heldResource)) {
        return { result: "systemFailure", refundRequired: true, reason: heldResource ? "Master Ball tier held items are protected from Revenge." : "The exact held item no longer exists." };
      }
    }
    const saved = snapshot(state);
    try {
      const released = selectedIds.map((id) => releaseExactRosterInstance(state, id, {
        sourceEffectId: input.sourceEffectId,
        reason: "Revenge post-payout resolution",
        releasedAt: options.now
      }));
      if (heldResource) {
        const offender = (state.players || []).find((player) => player.id === offenderPlayerId);
        offender.inventory = (offender.inventory || []).filter((item) => item.id !== heldResource.id);
      }
      const operation = operationRecord({
        operationType: "revengePostPayout",
        sourceEffectId: input.sourceEffectId,
        sourceTokenId: input.sourceTokenId,
        sourceTokenName: input.sourceTokenName || "Revenge",
        sourcePlayerId,
        targetPlayerId: offenderPlayerId,
        targetSnapshot: { broughtSnapshotId: broughtSnapshot.id, selectedRosterInstanceIds: selectedIds, qualifyingCurseIds: qualifyingCurses.map((record) => record.id) },
        undoData: saved
      }, options);
      operation.result = "resolved";
      operation.releasedRosterInstanceIds = released.map((pokemon) => pokemon.id);
      operation.destroyedHeldInventoryItemId = heldResource?.id || "";
      state.effectOperations ||= [];
      state.effectOperations.push(operation);
      return {
        result: "resolved",
        reason: `Revenge released ${released.map((pokemon) => pokemon.name).join(" and ")}${heldResource ? ` and destroyed ${heldResource.name}` : ""}.`,
        releasedPokemon: released,
        destroyedHeldItem: heldResource,
        operation,
        resultData: { broughtSnapshotId: broughtSnapshot.id, releasedRosterInstanceIds: operation.releasedRosterInstanceIds, destroyedHeldInventoryItemId: operation.destroyedHeldInventoryItemId }
      };
    } catch (error) {
      restore(state, saved);
      return { result: "systemFailure", refundRequired: true, reason: error?.message || "Revenge could not complete atomically." };
    }
  }

  function undoAtomicEffectOperation(state, operationId) {
    const operation = (state.effectOperations || []).find((entry) => entry.id === operationId);
    if (!operation?.undoData || operation.undoneAt) return false;
    const preservedOperation = clone(operation);
    restore(state, operation.undoData);
    state.effectOperations ||= [];
    preservedOperation.undoneAt = new Date().toISOString();
    state.effectOperations.push(preservedOperation);
    return true;
  }

  function createCanonicalTokenInventoryCopy(state, input = {}, options = {}) {
    const owner = (state.players || []).find((player) => player.id === input.ownerPlayerId);
    const definition = input.definition || (typeof options.definitionFor === "function" ? options.definitionFor(input.definitionId || input.definitionName) : null);
    if (!owner || !definition?.id || !definition?.name) {
      return { result: "systemFailure", refundRequired: true, reason: "A copied Token requires an exact owner and canonical Token definition." };
    }
    if (definition.id === "ditto-token" && input.copySourceType === "ditto") {
      return { result: "blocked", refundRequired: true, reason: "Ditto cannot transform into Ditto." };
    }
    state.effectOperations ||= [];
    const duplicate = state.effectOperations.find((entry) => entry.operationType === "createCanonicalTokenInventoryCopy" && entry.sourceEffectId === input.sourceEffectId);
    if (duplicate) {
      const record = (owner.inventory || []).find((item) => item.id === duplicate.createdInventoryRecordId) || null;
      return { result: "resolved", record, operation: duplicate, duplicateResolution: true };
    }
    const saved = snapshot(state);
    const makeId = options.makeId || ((prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
    const record = {
      id: makeId("token-copy"),
      name: definition.name,
      type: "TOKEN",
      tokenType: definition.family === "Curse" ? "curse" : definition.family === "Protection" ? "protection" : "control",
      canonicalDefinitionId: definition.id,
      copied: true,
      copyProvenance: {
        sourceEffectId: input.sourceEffectId || "",
        sourceActivationId: input.sourceActivationId || "",
        sourceInventoryRecordId: input.sourceInventoryRecordId || "",
        sourcePlayerId: input.sourcePlayerId || "",
        copySourceType: input.copySourceType || ""
      },
      createdAt: options.now || new Date().toISOString()
    };
    if (input.expiresAtSeries || input.expiresAtGym) {
      record.temporary = true;
      record.expiresAtSeries = input.expiresAtSeries || options.series || state.series;
      record.expiresAtGym = Number(input.expiresAtGym || options.gym || state.gym || 1);
      record.expiresAtPhase = input.expiresAtPhase || "end";
    }
    owner.inventory ||= [];
    owner.inventory.push(record);
    const operation = {
      id: makeId("effect-operation"),
      operationType: "createCanonicalTokenInventoryCopy",
      sourceEffectId: input.sourceEffectId || "",
      sourceActivationId: input.sourceActivationId || "",
      ownerPlayerId: owner.id,
      createdInventoryRecordId: record.id,
      definitionId: definition.id,
      status: "completed",
      undoData: saved,
      createdAt: record.createdAt
    };
    state.effectOperations.push(operation);
    return { result: "resolved", reason: `${owner.name || "The player"} received one ${definition.name} Token copy.`, record, operation };
  }

  function createTokenCopyRelationship(state, input = {}, options = {}) {
    const sourcePlayer = (state.players || []).find((player) => player.id === input.sourcePlayerId);
    const beneficiary = (state.players || []).find((player) => player.id === input.beneficiaryPlayerId);
    if (!sourcePlayer || !beneficiary || !input.sourceEffectId) {
      return { result: "systemFailure", refundRequired: true, reason: "A Token-copy relationship needs its source effect, source player, and beneficiary." };
    }
    const relationshipType = input.relationshipType || "followMe";
    state.copiedTokenRelationships ||= [];
    const duplicate = state.copiedTokenRelationships.find((record) => (
      record.sourceEffectId === input.sourceEffectId && record.relationshipType === relationshipType
    ));
    if (duplicate) return { result: "resolved", record: duplicate, duplicateResolution: true };
    const makeId = options.makeId || ((prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
    const record = {
      id: makeId("copy-relationship"),
      relationshipType,
      isOngoingEffect: relationshipType === "followMe",
      status: input.activateAfterEffectId ? "pendingParentResolution" : "active",
      sourceEffectId: input.sourceEffectId,
      activateAfterEffectId: input.activateAfterEffectId || "",
      sourcePlayerId: sourcePlayer.id,
      beneficiaryPlayerId: beneficiary.id,
      series: options.series || state.series,
      gym: Number(options.gym || state.gym || 1),
      expiresAt: "endOfGym",
      copiedConsumptionIds: [],
      createdAt: options.now || new Date().toISOString()
    };
    state.copiedTokenRelationships.push(record);
    return {
      result: "resolved",
      reason: `${beneficiary.name} will copy each real Token consumed by ${sourcePlayer.name} for the rest of this Gym.`,
      record
    };
  }

  function createFollowMeCopyRelationship(state, input = {}, options = {}) {
    return createTokenCopyRelationship(state, { ...input, relationshipType: "followMe" }, options);
  }

  function settleTokenCopyRelationshipsForEffect(state, effectId = "", terminalOutcome = "resolved", options = {}) {
    const now = options.now || new Date().toISOString();
    const canceled = ["canceled", "canceledRefunded", "failedRecoveryRequired"].includes(terminalOutcome);
    const records = (state.copiedTokenRelationships || []).filter((record) => (
      record.status === "pendingParentResolution" && record.activateAfterEffectId === effectId
    ));
    records.forEach((record) => {
      const sourceStillResolved = typeof options.canActivateRelationship === "function"
        ? options.canActivateRelationship(record) !== false
        : true;
      record.status = canceled || !sourceStillResolved ? "canceled" : "active";
      if (record.status === "canceled") record.canceledAt = now;
      else record.activatedAt = now;
      record.parentTerminalOutcome = terminalOutcome;
    });
    return records;
  }

  function expireTokenCopyRelationships(state, options = {}) {
    const now = options.now || new Date().toISOString();
    const currentSeries = String(options.series || state.series || "");
    const currentGym = Number(options.gym || state.gym || 0);
    const endOfGym = options.phase === "end" || options.phase === "endOfGym";
    return (state.copiedTokenRelationships || []).filter((record) => {
      if (!["active", "pendingParentResolution"].includes(record.status)) return false;
      const sameGym = String(record.series || "") === currentSeries && Number(record.gym || 0) === currentGym;
      if (sameGym && !endOfGym) return false;
      record.status = "expired";
      record.expiredAt = now;
      return true;
    });
  }

  function copyConsumedTokenForRelationships(state, consumption = {}, options = {}) {
    if (!consumption.id || consumption.copyProvenance || consumption.isVirtualActivation || !consumption.inventoryItem) return [];
    const definitionCandidates = [
      consumption.tokenDefinitionId,
      consumption.inventoryItem?.canonicalDefinitionId,
      consumption.inventoryItem?.canonicalId,
      consumption.tokenName,
      consumption.tokenId
    ].map((value) => String(value || "").trim()).filter(Boolean);
    const definition = typeof options.definitionFor === "function"
      ? definitionCandidates.map((value) => options.definitionFor(value)).find(Boolean) || null
      : options.definition;
    if (!definition?.id) return [];
    if (typeof options.isTokenCopyProtected === "function" && options.isTokenCopyProtected(consumption.playerId, consumption)) return [];
    return (state.copiedTokenRelationships || []).filter((record) => (
      record.status === "active"
      && !ongoingRecordSuppressedByColdWave(state, record, options)
      && record.sourcePlayerId === consumption.playerId
      && String(record.series || "") === String(options.series || state.series || "")
      && Number(record.gym || 0) === Number(options.gym || state.gym || 0)
      && !record.copiedConsumptionIds.includes(consumption.id)
    )).map((record) => {
      const result = createCanonicalTokenInventoryCopy(state, {
        ownerPlayerId: record.beneficiaryPlayerId,
        definition,
        sourceEffectId: `${record.id}:${consumption.id}`,
        sourceActivationId: consumption.linkedEventId || consumption.linkedResponseId || "",
        sourceInventoryRecordId: consumption.tokenId || "",
        sourcePlayerId: consumption.playerId,
        copySourceType: record.relationshipType
      }, options);
      if (result.result === "resolved") record.copiedConsumptionIds.push(consumption.id);
      return { relationship: record, ...result };
    });
  }

  function scheduleTeleportDelayedEffect(state, input = {}, options = {}) {
    state.delayedEffects ||= [];
    const duplicate = state.delayedEffects.find((record) => record.sourceResponseId === input.sourceResponseId && record.sourceResponseId);
    if (duplicate) return { result: "delayed", record: duplicate, duplicateResolution: true };
    if (!input.parentEffect || !input.sourceResponseId) return { result: "systemFailure", refundRequired: true, reason: "Teleport needs the exact parent effect and response identity." };
    const due = gymPositionAfter(options.series || state.series, Number(options.gym || state.gym || 1), 1, options.seriesOrder || []);
    const makeId = options.makeId || ((prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
    const record = {
      id: input.id || makeId("delayed-effect"),
      type: "teleport",
      status: "pending",
      sourceResponseId: input.sourceResponseId,
      sourcePlayerId: input.sourcePlayerId || "",
      parentEffect: clone(input.parentEffect),
      declarationPhaseAnchor: {
        series: options.series || state.series,
        gym: Number(options.gym || state.gym || 1),
        phase: options.phase || input.phase || ""
      },
      dueAt: { series: due.series, gym: due.gym, phase: options.phase || input.phase || "" },
      teleportConsumptionRecordId: input.teleportConsumptionRecordId || "",
      parentConsumptionRecordIds: uniqueIds(input.parentConsumptionRecordIds || []),
      tokenConsumed: true,
      mutationStarted: false,
      mutationCompleted: false,
      createdAt: options.now || new Date().toISOString()
    };
    state.delayedEffects.push(record);
    return { result: "delayed", reason: `The effect is delayed until ${record.dueAt.series} Gym ${record.dueAt.gym} ${record.dueAt.phase}.`, record };
  }

  function createCopiedActivation(state, input = {}, options = {}) {
    const sourceActivation = input.sourceActivation || null;
    const policy = input.copyPolicy || null;
    if (!sourceActivation?.id || !policy?.provenanceRequired) {
      return { result: "systemFailure", refundRequired: true, reason: "A copied activation requires an exact source activation and canonical copy policy." };
    }
    if (sourceActivation.isCopiedActivation || sourceActivation.copyProvenance?.sourceActivationId) {
      return { result: "blocked", refundRequired: false, reason: "Copied activations cannot be copied recursively." };
    }
    if (policy.createsInventoryRecord) {
      return { result: "systemFailure", refundRequired: true, reason: "Temporary inventory copies must use the exact Token inventory runtime, not copied-activation creation." };
    }
    const explicitCosts = Array.isArray(input.explicitCosts) ? input.explicitCosts : [];
    const waivedCostIds = new Set(input.waivedCostIds || []);
    const unpaid = explicitCosts.filter((cost) => !waivedCostIds.has(cost.id) && cost.paid !== true);
    if (policy.copiedUserPaysExplicitCostsUnlessWaived && unpaid.length) {
      return { result: "awaitingRequiredChoice", reason: "Pay or explicitly waive every copied effect cost before resolving.", unpaidCosts: clone(unpaid) };
    }
    if (policy.requiresFreshTargetsAndChoicesUnlessStated && input.reuseSourceChoices === true && !input.sourceAllowsChoiceReuse) {
      return { result: "blocked", refundRequired: false, reason: "This copied activation requires fresh targets and choices." };
    }
    state.copiedActivations ||= [];
    const duplicate = state.copiedActivations.find((record) => record.sourceCopyEffectId === input.sourceCopyEffectId && record.sourceCopyEffectId);
    if (duplicate) return { result: "resolved", record: duplicate, duplicateResolution: true };
    const makeId = options.makeId || ((prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
    const record = {
      id: input.id || makeId("copied-activation"),
      status: "declared",
      isCopiedActivation: true,
      copyMode: input.copyMode || "",
      sourceCopyEffectId: input.sourceCopyEffectId || "",
      sourceDefinitionId: input.sourceDefinitionId || sourceActivation.definitionId || sourceActivation.tokenId || "",
      copiedUserPlayerId: input.copiedUserPlayerId || "",
      targets: clone(input.targets || []),
      choices: clone(input.choices || {}),
      explicitCosts: clone(explicitCosts),
      inventoryRecordCreated: false,
      copiedInventoryConsumed: false,
      copyProvenance: {
        sourceActivationId: sourceActivation.id,
        sourcePlayerId: sourceActivation.actorPlayerId || sourceActivation.playerId || "",
        copiedByEffectId: input.sourceCopyEffectId || "",
        copiedByPlayerId: input.copiedUserPlayerId || ""
      },
      createdAt: options.now || new Date().toISOString()
    };
    state.copiedActivations.push(record);
    return { result: "resolved", reason: "Created one non-inventory copied activation with fresh declaration data.", record };
  }

  function resolveTeleportDelayedEffect(state, delayedEffectId, options = {}) {
    const record = (state.delayedEffects || []).find((entry) => entry.id === delayedEffectId);
    if (!record) return { result: "systemFailure", refundRequired: true, reason: "The delayed Teleport record is unavailable." };
    if (["resolved", "resolvedNoEffect", "canceledRefunded"].includes(record.status)) return { result: record.status, record, duplicateResolution: true };
    if (!sameGymPosition(record.dueAt, options) || String(record.dueAt.phase || "") !== String(options.phase || "")) {
      return { result: "awaitingRequiredChoice", reason: "The next matching phase has not started.", record };
    }
    const validation = typeof options.revalidateEffect === "function"
      ? options.revalidateEffect(clone(record.parentEffect), { declarationPhaseAnchor: clone(record.declarationPhaseAnchor), dueAt: clone(record.dueAt) })
      : { ok: false, classification: "unsupported", reason: "No delayed-effect revalidator is available." };
    if (!validation?.ok) {
      const gameplayIllegal = validation?.classification === "gameplay";
      record.status = gameplayIllegal ? "resolvedNoEffect" : "canceledRefunded";
      record.resolvedAt = options.now || new Date().toISOString();
      record.resolutionReason = validation?.reason || (gameplayIllegal ? "The delayed effect is no longer legal." : "The delayed effect cannot be continued safely.");
      record.refundRequired = !gameplayIllegal;
      return { result: record.status, reason: record.resolutionReason, refundRequired: record.refundRequired, record };
    }
    record.mutationStarted = true;
    const resolution = typeof options.resolveEffect === "function"
      ? options.resolveEffect(clone(record.parentEffect), { resolutionPhaseAnchor: clone(record.dueAt), declarationPhaseAnchor: clone(record.declarationPhaseAnchor) })
      : { result: "systemFailure", reason: "No delayed-effect resolver is available." };
    if (!resolution || resolution.result === "systemFailure") {
      record.status = "canceledRefunded";
      record.refundRequired = true;
      record.resolvedAt = options.now || new Date().toISOString();
      record.resolutionReason = resolution?.reason || "The delayed effect failed during resolution.";
      return { result: record.status, reason: record.resolutionReason, refundRequired: true, record };
    }
    record.status = resolution.result === "resolvedNoEffect" ? "resolvedNoEffect" : "resolved";
    record.mutationCompleted = true;
    record.resolvedAt = options.now || new Date().toISOString();
    record.resolutionPhaseAnchor = clone(record.dueAt);
    record.resultData = clone(resolution.resultData || null);
    return { result: record.status, reason: resolution.reason || "The delayed effect resolved.", record, resolution };
  }

  function resolveStandardCurse(state, input = {}, options = {}) {
    const definition = standardCurseDefinition(input.tokenId || input.sourceTokenId || input.sourceTokenName);
    if (!definition) return { result: "systemFailure", refundRequired: true, reason: "The standard Curse definition is unavailable.", statusIds: [] };
    const pokemon = (state.pokemonRecords || []).find((record) => record.id === input.targetPokemonId);
    const target = standardCurseTarget(state, pokemon, options);
    if (!target.ok) return { result: "systemFailure", refundRequired: true, reason: target.reason, statusIds: [] };
    const speciesName = String(pokemon.name || pokemon.currentSpecies || "").trim();
    const speciesKey = (options.keyForSpecies || defaultSpeciesKey)(speciesName);
    const consideredPokemon = availablePokemonRecords(state).filter((record) => (
      (options.keyForSpecies || defaultSpeciesKey)(record.name || record.currentSpecies || "") === speciesKey
      && String(record.rosterType || "Active").trim().toLowerCase() === "active"
    ));
    const consideredRosterInstanceIds = consideredPokemon.map((record) => record.id);
    const protectedRosterInstanceIds = uniqueIds(input.excludedRosterInstanceIds || [])
      .filter((id) => consideredRosterInstanceIds.includes(id));
    const affectedPokemon = consideredPokemon.filter((record) => !protectedRosterInstanceIds.includes(record.id));
    const affectedRosterInstanceIds = affectedPokemon.map((record) => record.id);
    const existingForEvent = (state.lingeringStatuses || []).find((status) => (
      status.sourceEffectId === input.sourceEffectId
      && status.type === definition.statusType
    ));
    if (existingForEvent) {
      return {
        result: "resolved",
        reason: `${input.sourceTokenName || definition.statusName} was already resolved for ${speciesName}.`,
        statusIds: [existingForEvent.id],
        status: existingForEvent,
        pokemon,
        affectedPokemon,
        consideredPokemon,
        duplicateResolution: true
      };
    }
    const forcedItem = definition.payload.forcedItem || "";
    const conflictingPokemon = forcedItem ? affectedPokemon.find((record) => activeStatuses(state, options, (status) => (
      statusAffectsPokemon(status, record, options)
      && status.payload?.forcedItem
      && status.payload.forcedItem !== forcedItem
    )).length > 0) : null;
    if (forcedItem && conflictingPokemon) {
      return {
        result: "systemFailure",
        refundRequired: true,
        reason: `${conflictingPokemon.name} already has a conflicting forced Item effect. Resolve that status before applying ${input.sourceTokenName || definition.statusName}.`,
        statusIds: []
      };
    }
    const durationGyms = Number(input.durationGyms || 2);
    const anchorPhase = String(input.expiresAtPhase || options.phase || "action");
    const expires = input.expiresAtSeries && input.expiresAtGym
      ? { expiresAtSeries: input.expiresAtSeries, expiresAtGym: input.expiresAtGym }
      : (() => {
        const startIndex = Math.max(0, (options.seriesOrder || []).indexOf(options.series || state.series));
        let seriesIndex = startIndex;
        let gym = Number(options.gym || state.gym || 1) + durationGyms;
        while (gym > 9 && seriesIndex < (options.seriesOrder || []).length - 1) {
          gym -= 9;
          seriesIndex += 1;
        }
        return { expiresAtSeries: options.seriesOrder?.[seriesIndex] || options.series || state.series, expiresAtGym: gym };
      })();
    if (!affectedPokemon.length) {
      return {
        result: "noEffect",
        reason: `Every active ${speciesName} was protected from ${input.sourceTokenName || definition.statusName}. The Curse was consumed without creating a status.`,
        statusIds: [],
        pokemon,
        affectedPokemon: [],
        consideredPokemon,
        protectedRosterInstanceIds,
        resultData: {
          speciesName,
          consideredRosterInstanceIds,
          affectedRosterInstanceIds: [],
          excludedRosterInstanceIds: protectedRosterInstanceIds,
          fullyProtected: true,
          partiallyResolved: false
        }
      };
    }
    const status = createStatus(state, {
      ...input,
      type: definition.statusType,
      name: definition.statusName,
      category: "Curse",
      isCurse: true,
      targetPlayerId: pokemon.trainerId,
      targetPlayerName: target.owner?.name || "",
      targetPokemonId: "",
      targetPokemonName: speciesName,
      selectedTargetType: "rosterInstance",
      applicationScope: APPLICATION_SCOPES.GLOBAL_SPECIES,
      affectedEntityType: "pokemon",
      selectedRosterInstanceId: pokemon.id,
      selectedRosterInstanceIds: [pokemon.id],
      affectedRosterInstanceIds,
      excludedRosterInstanceIds: protectedRosterInstanceIds,
      duration: `${durationGyms} phase-anchored Gyms`,
      durationGyms,
      expiresAtSeries: expires.expiresAtSeries,
      expiresAtGym: expires.expiresAtGym,
      expiresAtPhase: anchorPhase,
      payload: {
        ...clone(definition.payload),
        phaseAnchored: true,
        activationPhase: options.phase || "action",
        expiresAtPhase: anchorPhase,
        selectedRosterInstanceId: pokemon.id,
        selectedRosterInstanceIds: [pokemon.id],
        consideredRosterInstanceIds,
        affectedRosterInstanceIds,
        excludedRosterInstanceIds: protectedRosterInstanceIds,
        sourceEffectId: input.sourceEffectId || "",
        sourcePlayerId: input.actorPlayerId || ""
      },
      note: input.note || definition.statusName
    }, options);
    const repairs = affectedPokemon.map((record) => standardCurseSetRepair(state, status, record, options)).filter(Boolean);
    const repair = repairs[0] || null;
    const effectLabel = forcedItem
      ? `must hold ${forcedItem}`
      : definition.payload.maxMoves
        ? `may use no more than ${definition.payload.maxMoves} moves`
        : "must use zero EVs, zero IVs, and a neutral Nature";
    return {
      result: "resolved",
      reason: `${affectedPokemon.length} active ${speciesName}${affectedPokemon.length === 1 ? "" : " records"} ${effectLabel} until ${expires.expiresAtSeries} Gym ${expires.expiresAtGym} ${anchorPhase}.${protectedRosterInstanceIds.length ? ` ${protectedRosterInstanceIds.length} exact instance${protectedRosterInstanceIds.length === 1 ? " was" : "s were"} protected.` : ""}`,
      statusIds: [status.id],
      status,
      pokemon,
      affectedPokemon,
      consideredPokemon,
      protectedRosterInstanceIds,
      repair,
      repairs,
      resultData: {
        createdStatusIds: [status.id],
        speciesName,
        consideredRosterInstanceIds,
        affectedRosterInstanceIds,
        excludedRosterInstanceIds: protectedRosterInstanceIds,
        repairRequired: repairs.length > 0,
        repairId: repair?.id || "",
        partiallyResolved: protectedRosterInstanceIds.length > 0,
        fullyProtected: false
      }
    };
  }

  function speciesCurseResolutionContext(state, targetPokemonId, effectType, sourceEffectId, options = {}) {
    const pokemon = availablePokemonRecords(state).find((record) => record.id === targetPokemonId);
    const target = standardCurseTarget(state, pokemon, options);
    if (!target.ok) return { ok: false, reason: target.reason };
    const speciesName = String(pokemon.name || pokemon.currentSpecies || "").trim();
    const speciesKey = (options.keyForSpecies || defaultSpeciesKey)(speciesName);
    const consideredPokemon = availablePokemonRecords(state).filter((record) => (
      String(record.rosterType || "Active").toLowerCase() === "active"
      && (options.keyForSpecies || defaultSpeciesKey)(record.name || record.currentSpecies || "") === speciesKey
    ));
    const interception = interceptEffectWithSubstitute(state, {
      effectType,
      isCurse: true,
      applicationScope: APPLICATION_SCOPES.GLOBAL_SPECIES,
      speciesName,
      selectedRosterInstanceId: pokemon.id,
      sourceEffectId
    }, options);
    const excludedIds = uniqueIds(interception.excludedRosterInstanceIds || []);
    return {
      ok: true,
      pokemon,
      owner: target.owner,
      speciesName,
      speciesKey,
      consideredPokemon,
      affectedPokemon: consideredPokemon.filter((record) => !excludedIds.includes(record.id)),
      excludedRosterInstanceIds: excludedIds,
      interception
    };
  }

  function resolveHazeCurse(state, input = {}, options = {}) {
    const targetIds = uniqueIds(input.targetPokemonIds || input.selectedRosterInstanceIds || []);
    if (targetIds.length !== 2) return { result: "systemFailure", refundRequired: true, reason: "Haze Curse requires exactly two different Pokemon names." };
    const anchors = targetIds.map((id) => availablePokemonRecords(state).find((record) => record.id === id));
    if (anchors.some((record) => !record)) return { result: "systemFailure", refundRequired: true, reason: "A selected Haze Curse anchor is no longer in an Active Roster." };
    const keys = anchors.map((record) => (options.keyForSpecies || defaultSpeciesKey)(record.name || record.currentSpecies));
    if (new Set(keys).size !== 2) return { result: "systemFailure", refundRequired: true, reason: "Choose two different Pokemon names for Haze Curse." };
    const duplicate = (state.lingeringStatuses || []).filter((status) => status.sourceEffectId === input.sourceEffectId && status.type === CONTROL_STATUS_TYPES.HAZE_CURSE);
    if (duplicate.length) return { result: "resolved", statuses: duplicate, statusIds: duplicate.map((status) => status.id), duplicateResolution: true };
    const saved = snapshot(state);
    try {
      const contexts = targetIds.map((id) => speciesCurseResolutionContext(state, id, CONTROL_STATUS_TYPES.HAZE_CURSE, input.sourceEffectId, options));
      const invalid = contexts.find((context) => !context.ok);
      if (invalid) throw new Error(invalid.reason);
      const statuses = contexts.filter((context) => context.affectedPokemon.length).map((context) => createStatus(state, {
        ...input,
        type: CONTROL_STATUS_TYPES.HAZE_CURSE,
        name: "Haze Curse",
        category: "Curse",
        isCurse: true,
        targetPokemonId: "",
        targetPokemonName: context.speciesName,
        targetPokemonNameKey: context.speciesKey,
        selectedRosterInstanceId: context.pokemon.id,
        selectedRosterInstanceIds: [context.pokemon.id],
        affectedRosterInstanceIds: context.affectedPokemon.map((record) => record.id),
        excludedRosterInstanceIds: context.excludedRosterInstanceIds,
        applicationScope: APPLICATION_SCOPES.GLOBAL_SPECIES,
        duration: "2 phase-anchored Gyms",
        durationGyms: 2,
        expiresAtPhase: input.expiresAtPhase || options.phase || "action",
        payload: { negateBuffs: true, selectedSpeciesId: context.speciesKey },
        note: "Structured buffs are suppressed, not deleted, for this status's active lifetime."
      }, options));
      state.effectOperations ||= [];
      const makeId = options.makeId || ((prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
      const operation = {
        id: makeId("effect-operation"), operationType: "resolveHazeCurse", sourceEffectId: input.sourceEffectId || "",
        status: "completed", statusIds: statuses.map((status) => status.id), undoData: saved, createdAt: options.now || new Date().toISOString()
      };
      state.effectOperations.push(operation);
      const affected = contexts.flatMap((context) => context.affectedPokemon.map((record) => record.id));
      const protectedIds = contexts.flatMap((context) => context.excludedRosterInstanceIds);
      return {
        result: statuses.length ? "resolved" : "noEffect",
        reason: `Haze Curse considered ${contexts.reduce((sum, context) => sum + context.consideredPokemon.length, 0)} Pokemon; ${affected.length} affected and ${protectedIds.length} protected.`,
        statuses, statusIds: statuses.map((status) => status.id), operation,
        resultData: { selectedRosterInstanceIds: targetIds, selectedSpeciesIds: keys, affectedRosterInstanceIds: affected, excludedRosterInstanceIds: protectedIds, consumedStatusIds: contexts.flatMap((context) => context.interception.consumedStatusIds || []) }
      };
    } catch (error) {
      restore(state, saved);
      return { result: "systemFailure", refundRequired: true, reason: error?.message || "Haze Curse could not resolve atomically." };
    }
  }

  function resolveDevolveCurse(state, input = {}, options = {}) {
    const context = speciesCurseResolutionContext(state, input.targetPokemonId, CONTROL_STATUS_TYPES.DEVOLVE_CURSE, input.sourceEffectId, options);
    if (!context.ok) return { result: "systemFailure", refundRequired: true, reason: context.reason };
    const parentResult = typeof options.preEvolutionFor === "function" ? options.preEvolutionFor(context.speciesName, context.pokemon) : null;
    if (!parentResult?.ok || !parentResult.speciesName) {
      return { result: "systemFailure", refundRequired: true, reason: parentResult?.reason || `${context.speciesName} does not have one unambiguous safe direct pre-evolution.` };
    }
    const existing = (state.lingeringStatuses || []).find((status) => status.sourceEffectId === input.sourceEffectId && status.type === CONTROL_STATUS_TYPES.DEVOLVE_CURSE);
    if (existing) return { result: "resolved", status: existing, statusIds: [existing.id], duplicateResolution: true };
    if (!context.affectedPokemon.length) return { result: "noEffect", reason: `Every active ${context.speciesName} was protected from Devolve.`, statusIds: [] };
    const saved = snapshot(state);
    try {
      const snapshots = context.affectedPokemon.map((record) => ({
        rosterInstanceId: record.id,
        originalSpeciesName: record.currentSpecies || record.name,
        originalName: record.name,
        originalTemporarySpeciesOverlay: clone(record.temporarySpeciesOverlay || null)
      }));
      const status = createStatus(state, {
        ...input,
        type: CONTROL_STATUS_TYPES.DEVOLVE_CURSE,
        name: "Devolve",
        category: "Curse",
        isCurse: true,
        targetPokemonId: "",
        targetPokemonName: context.speciesName,
        targetPokemonNameKey: context.speciesKey,
        selectedRosterInstanceId: context.pokemon.id,
        selectedRosterInstanceIds: [context.pokemon.id],
        affectedRosterInstanceIds: context.affectedPokemon.map((record) => record.id),
        excludedRosterInstanceIds: context.excludedRosterInstanceIds,
        applicationScope: APPLICATION_SCOPES.GLOBAL_SPECIES,
        duration: "1 phase-anchored Gym",
        durationGyms: 1,
        expiresAtPhase: input.expiresAtPhase || options.phase || "action",
        payload: { devolved: true, devolvedSpeciesName: parentResult.speciesName, restorationSnapshots: snapshots },
        note: `Matching instances temporarily use ${parentResult.speciesName}; their exact roster identities remain unchanged.`
      }, options);
      context.affectedPokemon.forEach((record) => {
        record.temporarySpeciesOverlay = {
          status: "active", sourceStatusId: status.id, speciesName: parentResult.speciesName,
          originalSpeciesName: record.currentSpecies || record.name, createdAt: options.now || new Date().toISOString()
        };
      });
      state.effectOperations ||= [];
      const makeId = options.makeId || ((prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
      const operation = { id: makeId("effect-operation"), operationType: "resolveDevolveCurse", sourceEffectId: input.sourceEffectId || "", status: "completed", statusIds: [status.id], undoData: saved, createdAt: options.now || new Date().toISOString() };
      state.effectOperations.push(operation);
      return { result: "resolved", reason: `${context.affectedPokemon.length} ${context.speciesName} roster instance${context.affectedPokemon.length === 1 ? "" : "s"} temporarily devolved to ${parentResult.speciesName}.`, status, statusIds: [status.id], operation, resultData: { affectedRosterInstanceIds: status.affectedRosterInstanceIds, excludedRosterInstanceIds: status.excludedRosterInstanceIds, devolvedSpeciesName: parentResult.speciesName, consumedStatusIds: context.interception.consumedStatusIds || [] } };
    } catch (error) {
      restore(state, saved);
      return { result: "systemFailure", refundRequired: true, reason: error?.message || "Devolve could not resolve atomically." };
    }
  }

  function restoreExpiredDevolveOverlays(state) {
    const restored = [];
    (state.lingeringStatuses || []).filter((status) => status.type === CONTROL_STATUS_TYPES.DEVOLVE_CURSE && status.status !== "active").forEach((status) => {
      (status.payload?.restorationSnapshots || []).forEach((saved) => {
        const pokemon = (state.pokemonRecords || []).find((record) => record.id === saved.rosterInstanceId);
        if (!pokemon || pokemon.temporarySpeciesOverlay?.sourceStatusId !== status.id) return;
        pokemon.temporarySpeciesOverlay = clone(saved.originalTemporarySpeciesOverlay || null);
        restored.push(pokemon.id);
      });
    });
    return uniqueIds(restored);
  }

  function resolveForesightCurse(state, input = {}, options = {}) {
    const targetIds = uniqueIds(input.targetPokemonIds || input.selectedRosterInstanceIds || []);
    if (targetIds.length !== 6) return { result: "systemFailure", refundRequired: true, reason: "Foresight Curse requires exactly six Pokemon species anchors." };
    const pokemon = targetIds.map((id) => availablePokemonRecords(state).find((record) => record.id === id));
    if (pokemon.some((record) => !record)) return { result: "systemFailure", refundRequired: true, reason: "A Foresight species anchor is no longer in an Active Roster." };
    const species = uniqueIds(pokemon.map((record) => (options.keyForSpecies || defaultSpeciesKey)(record.name || record.currentSpecies)));
    if (species.length !== 6) return { result: "systemFailure", refundRequired: true, reason: "Foresight Curse requires six different Pokemon names." };
    state.privateEffectRecords ||= [];
    const duplicate = state.privateEffectRecords.find((record) => record.sourceEffectId === input.sourceEffectId && record.type === CONTROL_STATUS_TYPES.FORESIGHT_MARKER);
    if (duplicate) return { result: "resolved", record: duplicate, duplicateResolution: true };
    const makeId = options.makeId || ((prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
    const record = {
      id: makeId("private-effect"), type: CONTROL_STATUS_TYPES.FORESIGHT_MARKER, status: "active",
      sourceEffectId: input.sourceEffectId || "", sourcePlayerId: input.actorPlayerId || "",
      authorizedPlayerId: input.actorPlayerId || "", selectedRosterInstanceIds: targetIds,
      selectedSpeciesIds: species, series: options.series || state.series, gym: Number(options.gym || state.gym || 1),
      expiresAt: "battleResults", privatePayload: { matchingMoveSets: [] }, createdAt: options.now || new Date().toISOString()
    };
    state.privateEffectRecords.push(record);
    return { result: "resolved", reason: "Six species were privately marked for Foresight. No moves were added to shared gameplay state.", record, resultData: { selectedRosterInstanceIds: targetIds, selectedSpeciesIds: species, privateRecordId: record.id } };
  }

  function resolveKnockOffCurse(state, input = {}, options = {}) {
    const pokemon = availablePokemonRecords(state).find((record) => record.id === input.targetPokemonId);
    const target = standardCurseTarget(state, pokemon, options);
    if (!target.ok) return { result: "systemFailure", refundRequired: true, reason: target.reason };
    const owner = target.owner;
    const inventoryId = String(input.inventoryRecordId || "");
    const inventoryIndex = (owner.inventory || []).findIndex((record) => record.id === inventoryId);
    const resource = inventoryIndex >= 0 ? owner.inventory[inventoryIndex] : null;
    if (!resource) return { result: "systemFailure", refundRequired: true, reason: "The exact selected inventory record no longer exists." };
    const buildSlot = input.buildSlot || null;
    const choiceKind = String(input.choiceKind || "").toLowerCase();
    if (choiceKind === "item") {
      const heldId = String(pokemon.heldItemInventoryId || buildSlot?.itemInventoryItemId || "");
      if (heldId !== resource.id || inventoryResourceCategory(resource) !== "Item" || isMasterBallResource(resource)) {
        return { result: "systemFailure", refundRequired: true, reason: "Choose the exact eligible held Item record. Master Ball-tier Items are protected." };
      }
    } else if (choiceKind === "tm") {
      const moveName = String(input.moveName || "");
      const provenance = (buildSlot?.moveProvenance || []).find((entry) => defaultSpeciesKey(entry.moveName) === defaultSpeciesKey(moveName));
      if (inventoryResourceCategory(resource) !== "TM" || defaultSpeciesKey(inventoryResourceName(resource)) !== defaultSpeciesKey(moveName)
        || (provenance?.inventoryRecordId && provenance.inventoryRecordId !== resource.id) || provenance?.source !== "tm") {
        return { result: "systemFailure", refundRequired: true, reason: "Choose an exact TM inventory record that grants the selected current-set move." };
      }
    } else return { result: "systemFailure", refundRequired: true, reason: "Choose either the held Item or a TM-derived current-set move." };
    state.effectOperations ||= [];
    const duplicate = state.effectOperations.find((entry) => entry.operationType === "resolveKnockOffCurse" && entry.sourceEffectId === input.sourceEffectId);
    if (duplicate) return { result: "resolved", operation: duplicate, duplicateResolution: true, resultData: clone(duplicate.resultData || {}) };
    const saved = snapshot(state);
    try {
      owner.inventory.splice(inventoryIndex, 1);
      if (choiceKind === "item") {
        pokemon.heldItemInventoryId = "";
        pokemon.heldItem = "";
        if (buildSlot) { buildSlot.itemInventoryItemId = ""; buildSlot.item = ""; }
      }
      const remainingCopies = choiceKind === "tm" ? (owner.inventory || []).filter((record) => inventoryResourceCategory(record) === "TM" && defaultSpeciesKey(inventoryResourceName(record)) === defaultSpeciesKey(input.moveName)).length : 0;
      const impactedLockedSlots = choiceKind === "tm" && remainingCopies === 0 ? (input.lockedTeamSlots || []).filter((slot) => (
        (slot.moveProvenance || slot.setSnapshot?.moveProvenance || []).some((entry) => (
          defaultSpeciesKey(entry.moveName) === defaultSpeciesKey(input.moveName) && entry.source === "tm"
        ))
      )).map((slot) => ({ pokemonRecordId: slot.pokemonRecordId, lockedSlotId: slot.lockedSlotId || "", moveName: input.moveName })) : [];
      const makeId = options.makeId || ((prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
      const resultData = { targetPokemonId: pokemon.id, destroyedInventoryRecordId: resource.id, destroyedResourceName: inventoryResourceName(resource), choiceKind, moveName: input.moveName || "", remainingTmCopies: remainingCopies, impactedLockedSlots };
      const operation = { id: makeId("effect-operation"), operationType: "resolveKnockOffCurse", sourceEffectId: input.sourceEffectId || "", status: "completed", resultData, undoData: saved, createdAt: options.now || new Date().toISOString() };
      state.effectOperations.push(operation);
      return { result: "resolved", reason: `${inventoryResourceName(resource)} was removed from ${owner.name || "the owner"}'s exact inventory.`, operation, resultData };
    } catch (error) {
      restore(state, saved);
      return { result: "systemFailure", refundRequired: true, reason: error?.message || "Knock Off Curse could not resolve atomically." };
    }
  }



  function availablePokemonRecords(state) {
    return (state.pokemonRecords || []).filter((pokemon) => !["Released", "Removed"].includes(pokemon.status));
  }

  function battleTeamKey(state, options = {}) {
    if (typeof options.battleTeamKey === "function") return options.battleTeamKey(state, options);
    return `${options.series || state.series}:G${Number(options.gym || state.gym || 1)}`;
  }

  function forcedTeamStatuses(state, playerId = "", options = {}) {
    return activeStatuses(state, options, (status) => {
      if (status.applicationScope !== APPLICATION_SCOPES.ROSTER_INSTANCE) return false;
      if (!status.payload?.forcedTeamMember && status.payload?.mustBeBrought !== true) return false;
      return !playerId || status.targetPlayerId === playerId;
    });
  }

  function forcedTeamStatusForPokemon(state, pokemonId, options = {}) {
    return forcedTeamStatuses(state, "", options).find((status) => (
      status.targetPokemonId === pokemonId
      || canonicalScopeRecord(status).affectedRosterInstanceIds.includes(pokemonId)
    )) || null;
  }

  function forcedTeamRequirements(state, playerId, options = {}) {
    const statuses = forcedTeamStatuses(state, playerId, options);
    const rosterInstanceIds = uniqueIds(statuses.flatMap((status) => (
      canonicalScopeRecord(status).affectedRosterInstanceIds.length
        ? canonicalScopeRecord(status).affectedRosterInstanceIds
        : [status.targetPokemonId]
    )));
    return { statuses, rosterInstanceIds };
  }

  function pendingArenaTrapCustomizations(state, playerId = "", options = {}) {
    return activeStatuses(state, options, (status) => (
      status.type === CONTROL_STATUS_TYPES.ARENA_TRAP
      && status.payload?.customization?.required === true
      && status.payload?.customization?.status === "pending"
      && (!playerId || status.payload.customization.choiceOwnerPlayerId === playerId)
    ));
  }

  function activeBuildForPlayer(state, playerId, options = {}) {
    state.teambuilder ||= {};
    state.teambuilder.activeBuildByPlayerId ||= {};
    state.teambuilder.buildsByPlayerId ||= {};
    state.teambuilder.buildsByPlayerId[playerId] ||= [];
    const builds = state.teambuilder.buildsByPlayerId[playerId];
    let build = builds.find((entry) => entry.id === state.teambuilder.activeBuildByPlayerId[playerId])
      || builds.find((entry) => entry.series === (options.series || state.series)
        && Number(entry.gym || 0) === Number(options.gym || state.gym || 1))
      || builds[0]
      || null;
    if (!build) {
      build = {
        id: options.makeId?.("team-build") || `team-build-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        playerId,
        name: `${options.series || state.series} Gym ${Number(options.gym || state.gym || 1)} Team`,
        series: options.series || state.series,
        gym: Number(options.gym || state.gym || 1),
        format: "singles",
        slotCount: Number(options.teamSizeForPlayer?.(playerId) || 6),
        slots: [],
        createdAt: options.now || new Date().toISOString(),
        updatedAt: options.now || new Date().toISOString()
      };
      build.slots = Array.from({ length: build.slotCount }, (_, slotIndex) => ({ pokemonRecordId: "", slotIndex }));
      builds.push(build);
    }
    build.slots ||= [];
    build.slotCount = Math.max(Number(build.slotCount || 0), build.slots.length, Number(options.teamSizeForPlayer?.(playerId) || 6));
    state.teambuilder.activeBuildByPlayerId[playerId] = build.id;
    return build;
  }

  function forcedTeamRepairState(state, playerId, options = {}) {
    return state.teambuilder?.teamRepairByPlayerId?.[playerId] || null;
  }

  function refreshForcedTeamRepairState(state, playerId, options = {}) {
    state.teambuilder ||= {};
    state.teambuilder.teamRepairByPlayerId ||= {};
    const build = activeBuildForPlayer(state, playerId, options);
    const teamSize = Math.max(1, Number(options.teamSizeForPlayer?.(playerId) || 6));
    const selectedIds = uniqueIds((build.slots || []).map((slot) => slot?.pokemonRecordId));
    const requirements = forcedTeamRequirements(state, playerId, options);
    const impossible = requirements.rosterInstanceIds.length > teamSize;
    const requiresRemoval = selectedIds.length > teamSize;
    if (!impossible && !requiresRemoval) {
      delete state.teambuilder.teamRepairByPlayerId[playerId];
      return null;
    }
    const existing = state.teambuilder.teamRepairByPlayerId[playerId] || {};
    const repair = {
      id: existing.id || options.makeId?.("team-repair") || `team-repair-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      status: impossible ? "impossible" : "required",
      playerId,
      sourceStatusIds: requirements.statuses.map((status) => status.id),
      forcedRosterInstanceIds: requirements.rosterInstanceIds,
      selectedRosterInstanceIds: selectedIds,
      legalTeamSize: teamSize,
      requiredRemovalCount: Math.max(0, selectedIds.length - teamSize),
      reason: impossible
        ? `${requirements.rosterInstanceIds.length} forced team members exceed the legal team size of ${teamSize}.`
        : `Remove ${selectedIds.length - teamSize} unlocked Pokemon before Team Building can continue.`,
      createdAt: existing.createdAt || options.now || new Date().toISOString(),
      updatedAt: options.now || new Date().toISOString()
    };
    state.teambuilder.teamRepairByPlayerId[playerId] = repair;
    return repair;
  }

  function applyForcedTeamMutation(state, status, pokemon, options = {}) {
    const playerId = pokemon.trainerId;
    const teamSize = Math.max(1, Number(options.teamSizeForPlayer?.(playerId) || 6));
    const build = activeBuildForPlayer(state, playerId, options);
    const previousBuildSlotIndex = build.slots.findIndex((slot) => slot?.pokemonRecordId === pokemon.id);
    const minimumBadgePoints = Math.max(0, Number(options.requiredBadgePointsForPokemon?.(pokemon) || 0));
    let buildSlotIndex = previousBuildSlotIndex;
    if (buildSlotIndex < 0) {
      buildSlotIndex = build.slots.findIndex((slot) => !slot?.pokemonRecordId);
      if (buildSlotIndex < 0) {
        buildSlotIndex = build.slots.length;
        build.slots.push({ pokemonRecordId: "", slotIndex: buildSlotIndex });
      }
      build.slots[buildSlotIndex] = {
        ...(build.slots[buildSlotIndex] || {}),
        pokemonRecordId: pokemon.id,
        selectedBattleSpecies: pokemon.currentSpecies || pokemon.name || "",
        selectedBattleForm: pokemon.currentSpecies || pokemon.name || "",
        assignedBadgePoints: minimumBadgePoints,
        slotIndex: buildSlotIndex
      };
      build.slotCount = Math.max(Number(build.slotCount || 0), build.slots.length);
    }
    build.slots[buildSlotIndex].assignedBadgePoints = Math.max(
      minimumBadgePoints,
      Number(build.slots[buildSlotIndex].assignedBadgePoints || 0)
    );
    build.updatedAt = options.now || new Date().toISOString();

    const key = battleTeamKey(state, options);
    state.battleTeams ||= {};
    state.battleTeams[key] ||= {};
    const team = state.battleTeams[key][playerId] ||= { selected: [], locked: false };
    team.selected ||= [];
    team.selectedBattleSpecies ||= [];
    team.badgeBoosts ||= [];
    const previousTeamIndex = team.selected.indexOf(pokemon.id);
    let teamSlotIndex = previousTeamIndex;
    if (teamSlotIndex < 0) {
      teamSlotIndex = team.selected.findIndex((id) => !id);
      if (teamSlotIndex < 0) teamSlotIndex = team.selected.length;
      team.selected[teamSlotIndex] = pokemon.id;
      team.selectedBattleSpecies[teamSlotIndex] = pokemon.currentSpecies || pokemon.name || "";
    }
    team.badgeBoosts[teamSlotIndex] = Math.max(minimumBadgePoints, Number(team.badgeBoosts[teamSlotIndex] || 0));
    team.forcedMemberStatusIds = uniqueIds([...(team.forcedMemberStatusIds || []), status.id]);
    if (previousTeamIndex < 0) {
      team.locked = false;
      team.lockedSlots = [];
    }
    team.sourceBuildId = build.id;
    team.sourceBuildName = build.name || "";

    const repair = refreshForcedTeamRepairState(state, playerId, options);
    return {
      id: options.makeId?.("forced-team-mutation") || `forced-team-mutation-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      sourceType: status.type === CONTROL_STATUS_TYPES.ARENA_TRAP ? "arenaTrap" : status.sourceType || "effect",
      sourceStatusId: status.id,
      targetPlayerId: playerId,
      rosterInstanceId: pokemon.id,
      buildId: build.id,
      buildSlotIndex,
      battleTeamKey: key,
      battleTeamSlotIndex: teamSlotIndex,
      insertedIntoBuild: previousBuildSlotIndex < 0,
      insertedIntoBattleTeam: previousTeamIndex < 0,
      forcedTeamMember: true,
      teamSlotLock: true,
      curseProtection: true,
      minimumBadgePoints,
      teamSize,
      repairStateId: repair?.id || "",
      repairRequired: repair?.status === "required",
      impossible: repair?.status === "impossible"
    };
  }

  function speciesRosterInstanceIds(state, speciesName, options = {}) {
    const keyForSpecies = options.keyForSpecies || defaultSpeciesKey;
    const speciesKey = keyForSpecies(speciesName);
    return availablePokemonRecords(state)
      .filter((pokemon) => keyForSpecies(pokemon.name || pokemon.currentSpecies || "") === speciesKey)
      .map((pokemon) => pokemon.id);
  }

  function resolveRestrict(state, input = {}, options = {}) {
    const speciesName = String(input.speciesName || "").trim();
    if (!speciesName) return { result: "noEffect", reason: "No Pokemon species was selected.", statusIds: [] };
    if (speciesHasUnbanProtection(state, speciesName, options)) {
      return { result: "noEffect", reason: `${speciesName} is protected from Ban and Restrict.`, statusIds: [] };
    }
    if (activeSpeciesStatuses(state, speciesName, CONTROL_STATUS_TYPES.RESTRICT, options).length || input.hasLegacyRestriction) {
      return { result: "noEffect", reason: `${speciesName} is already Restricted.`, statusIds: [] };
    }
    const affectedRosterInstanceIds = speciesRosterInstanceIds(state, speciesName, options);
    const status = createStatus(state, {
      ...input,
      type: CONTROL_STATUS_TYPES.RESTRICT,
      name: "Restricted",
      targetPokemonName: speciesName,
      selectedTargetType: "pokemon",
      applicationScope: APPLICATION_SCOPES.GLOBAL_SPECIES,
      affectedEntityType: "pokemon",
      speciesId: (options.keyForSpecies || defaultSpeciesKey)(speciesName),
      affectedRosterInstanceIds,
      duration: "6 Gyms",
      durationGyms: 6,
      payload: { preventsBattleTeamSubmission: true, ...(input.payload || {}) },
      note: "Cannot be brought for 6 gyms"
    }, options);
    return { result: "resolved", reason: `${speciesName} is Restricted for 6 Gyms.`, statusIds: [status.id], status };
  }

  function createInstanceRestriction(state, input = {}, options = {}) {
    const selectedIds = uniqueIds(input.selectedRosterInstanceIds || input.targetPokemonIds || [input.targetPokemonId]);
    const validIds = selectedIds.filter((id) => availablePokemonRecords(state).some((pokemon) => pokemon.id === id));
    if (!validIds.length) return { result: "noEffect", reason: "No valid roster instances were selected.", statusIds: [] };
    const status = createStatus(state, {
      ...input,
      type: CONTROL_STATUS_TYPES.INSTANCE_RESTRICT,
      name: input.name || "Instance Restricted",
      selectedTargetType: "pokemon",
      applicationScope: input.applicationScope || APPLICATION_SCOPES.SELECTED_ROSTER_INSTANCES,
      affectedEntityType: "pokemon",
      selectedRosterInstanceIds: validIds,
      affectedRosterInstanceIds: validIds,
      payload: { preventsBattleTeamSubmission: true, instanceSpecific: true, ...(input.payload || {}) }
    }, options);
    return { result: "resolved", reason: `${validIds.length} roster instance${validIds.length === 1 ? " is" : "s are"} Restricted.`, statusIds: [status.id], status };
  }

  function resolveUnban(state, input = {}, options = {}) {
    const speciesName = String(input.speciesName || "").trim();
    if (!speciesName) return { result: "noEffect", reason: "No Pokemon species was selected.", statusIds: [], removedStatusIds: [] };
    const now = options.now || new Date().toISOString();
    const candidates = activeSpeciesStatuses(state, speciesName, [CONTROL_STATUS_TYPES.BAN, CONTROL_STATUS_TYPES.RESTRICT], options);
    const selectedStatusId = String(input.selectedStatusId || "").trim();
    if (selectedStatusId && !candidates.some((status) => status.id === selectedStatusId)) {
      return { result: "noEffect", reason: "The selected Ban or Restrict is no longer active.", statusIds: [], removedStatusIds: [], staleTarget: true };
    }
    if (!selectedStatusId && candidates.length > 1) {
      return { result: "noEffect", reason: "Choose the exact Ban or Restrict record to remove.", statusIds: [], removedStatusIds: [], exactChoiceRequired: true };
    }
    const removed = selectedStatusId
      ? candidates.filter((status) => status.id === selectedStatusId)
      : candidates.slice(0, 1);
    if (!removed.length && !input.hasLegacyRestriction) {
      return { result: "noEffect", reason: `${speciesName} has no active Ban or Restrict to remove.`, statusIds: [], removedStatusIds: [] };
    }
    removed.forEach((status) => {
      status.status = "removed";
      status.removedAt = now;
      status.removedByEventId = input.eventId || "";
      status.removedByTokenId = input.sourceTokenId || "";
    });
    activeSpeciesStatuses(state, speciesName, CONTROL_STATUS_TYPES.UNBAN_PROTECTION, options).forEach((status) => {
      status.status = "replaced";
      status.replacedAt = now;
    });
    const protection = createStatus(state, {
      ...input,
      type: CONTROL_STATUS_TYPES.UNBAN_PROTECTION,
      name: "Unban Protected",
      targetPokemonName: speciesName,
      selectedTargetType: "pokemon",
      applicationScope: APPLICATION_SCOPES.GLOBAL_SPECIES,
      affectedEntityType: "pokemon",
      speciesId: (options.keyForSpecies || defaultSpeciesKey)(speciesName),
      duration: "6 Gyms",
      durationGyms: 6,
      payload: { blocksBan: true, blocksRestrict: true },
      note: "Ban and Restrict protection for 6 gyms"
    }, options);
    return {
      result: "resolved",
      reason: `${speciesName}'s Ban or Restrict was removed. It is protected for 6 Gyms.`,
      statusIds: [protection.id],
      removedStatusIds: removed.map((status) => status.id),
      status: protection
    };
  }

  function resolveExtraBan(state, input = {}, options = {}) {
    const selectedIds = uniqueIds([
      input.selectedRosterInstanceId,
      ...(Array.isArray(input.selectedRosterInstanceIds) ? input.selectedRosterInstanceIds : []),
      input.targetPokemonId
    ]);
    const pokemon = availablePokemonRecords(state).find((record) => selectedIds.includes(record.id));
    if (!pokemon) return { result: "noEffect", reason: "Choose a specific roster Pokemon as Extra Ban's declaration target.", statusIds: [] };
    if (pokemon.rosterType !== "Active") return { result: "noEffect", reason: "Extra Ban must target an exact Pokemon on an Active roster.", statusIds: [] };
    const speciesName = String(pokemon.name || pokemon.currentSpecies || "").trim();
    const speciesId = (options.keyForSpecies || defaultSpeciesKey)(speciesName);
    if (!speciesName) return { result: "noEffect", reason: "The selected roster Pokemon has no species identity.", statusIds: [] };
    if (speciesHasUnbanProtection(state, speciesName, options)) {
      return { result: "noEffect", reason: `${speciesName} is protected from Ban and Restrict.`, statusIds: [] };
    }
    if (speciesHasBanPhaseProtection(state, speciesName, options)) {
      return { result: "noEffect", reason: `${speciesName} cannot be banned again during this phase.`, statusIds: [] };
    }
    if (activeSpeciesStatuses(state, speciesName, CONTROL_STATUS_TYPES.BAN, options).length || input.hasLegacyBan) {
      return { result: "noEffect", reason: `${speciesName} is already Banned.`, statusIds: [] };
    }
    const affectedRosterInstanceIds = speciesRosterInstanceIds(state, speciesName, options);
    const status = createStatus(state, {
      ...input,
      type: CONTROL_STATUS_TYPES.BAN,
      name: "Banned",
      targetPlayerId: pokemon.trainerId,
      targetPokemonId: pokemon.id,
      targetPokemonName: speciesName,
      selectedTargetType: "rosterInstance",
      selectedRosterInstanceId: pokemon.id,
      selectedSpeciesId: speciesId,
      applicationScope: APPLICATION_SCOPES.GLOBAL_SPECIES,
      affectedEntityType: "pokemon",
      speciesId,
      selectedRosterInstanceIds: [pokemon.id],
      affectedRosterInstanceIds,
      substituteInterceptionPolicy: "negateEntireEffect",
      substituteChecksSelectedTargetOnly: true,
      duration: "Indefinite",
      payload: {
        preventsBattleTeamSubmission: true,
        selectedRosterInstanceId: pokemon.id,
        selectedSpeciesId: speciesId,
        substituteInterceptionPolicy: "negateEntireEffect",
        substituteChecksSelectedTargetOnly: true,
        ...(input.payload || {})
      },
      note: "Banned from play"
    }, options);
    return {
      result: "resolved",
      reason: `${speciesName} was Banned from play.`,
      statusIds: [status.id],
      status,
      pokemon
    };
  }

  function resolveArenaTrap(state, input = {}, options = {}) {
    const pokemon = availablePokemonRecords(state).find((record) => record.id === input.targetPokemonId);
    if (!pokemon) return { result: "noEffect", reason: "Choose a specific rival roster Pokemon for Arena Trap.", statusIds: [] };
    if (input.actorPlayerId && pokemon.trainerId === input.actorPlayerId) {
      return { result: "noEffect", reason: "Arena Trap must target a rival player's Pokemon.", statusIds: [] };
    }
    if (pokemon.rosterType && pokemon.rosterType !== "Active") {
      return { result: "noEffect", reason: "Arena Trap must target a Pokemon in a rival player's Active roster.", statusIds: [] };
    }
    const bringLegality = typeof options.bringLegalityForPokemon === "function"
      ? options.bringLegalityForPokemon(pokemon, input.actorPlayerId || "")
      : { ok: true, reason: "" };
    if (!bringLegality?.ok) {
      return { result: "noEffect", reason: bringLegality?.reason || `${pokemon.name} cannot currently be brought legally.`, statusIds: [] };
    }
    const existing = activeStatuses(state, options, (status) => (
      status.type === CONTROL_STATUS_TYPES.ARENA_TRAP && status.targetPokemonId === pokemon.id
    ));
    if (existing.length) return { result: "noEffect", reason: `${pokemon.name} is already Arena Trapped.`, statusIds: [] };
    const pokemonTier = String(options.battleTierForPokemon?.(pokemon) || pokemon.sagaTier || pokemon.battleTier || "");
    const naturalTier = String(options.naturalBattleTier?.(state, options) || "");
    const pokemonTierIndex = Number(options.tierIndexForName?.(pokemonTier));
    const naturalTierIndex = Number(options.tierIndexForName?.(naturalTier));
    const tierStepsBelow = Number.isInteger(pokemonTierIndex) && pokemonTierIndex >= 0
      && Number.isInteger(naturalTierIndex) && naturalTierIndex >= 0
      ? Math.max(0, naturalTierIndex - pokemonTierIndex)
      : 0;
    const compensationRequired = tierStepsBelow >= 2;
    const customization = {
      required: compensationRequired,
      status: compensationRequired ? "pending" : "notRequired",
      choiceOwnerPlayerId: pokemon.trainerId,
      sourceStatusId: "",
      naturalBattleTier: naturalTier,
      pokemonBattleTier: pokemonTier,
      tierStepsBelow,
      thresholdSteps: 2,
      kind: "",
      name: "",
      grantId: ""
    };
    const status = createStatus(state, {
      ...input,
      type: CONTROL_STATUS_TYPES.ARENA_TRAP,
      name: "Arena Trapped",
      targetPlayerId: pokemon.trainerId,
      targetPokemonId: pokemon.id,
      targetPokemonName: pokemon.name,
      selectedTargetType: "rosterInstance",
      selectedRosterInstanceId: pokemon.id,
      applicationScope: APPLICATION_SCOPES.ROSTER_INSTANCE,
      affectedEntityType: "pokemon",
      selectedRosterInstanceIds: [pokemon.id],
      affectedRosterInstanceIds: [pokemon.id],
      duration: "Current Battle Phase",
      expiresAtPhase: "battle-results",
      payload: {
        mustBeBrought: true,
        forcedTeamMember: true,
        teamSlotLock: true,
        curseImmune: true,
        sourceType: "arenaTrap",
        battleTierAtResolution: pokemonTier,
        naturalBattleTierAtResolution: naturalTier,
        compensationStatus: compensationRequired ? "pendingChoice" : "notRequired",
        customization,
        grantedCustomizations: [],
        clearableByClearSmog: true,
        durationBoundary: "battle-results",
        expiresAtPhase: "battle-results",
        ...(input.payload || {})
      },
      note: "Must be brought this Battle Phase and cannot be cursed while Arena Trap is active."
    }, options);
    const teamMutation = applyForcedTeamMutation(state, status, pokemon, options);
    status.payload.sourceStatusId = status.id;
    status.payload.rosterInstanceId = pokemon.id;
    status.payload.customization.sourceStatusId = status.id;
    status.payload.forcedTeamMutation = teamMutation;
    const owner = (state.players || []).find((player) => player.id === pokemon.trainerId);
    const repairText = teamMutation.repairRequired
      ? ` ${owner?.name || "The target player"} must remove one unlocked Pokemon before Team Building can continue.`
      : teamMutation.impossible
        ? " Forced members exceed the legal team size; Team Lock is blocked until the conflict is repaired."
        : "";
    const compensationText = compensationRequired
      ? ` ${owner?.name || "The target player"} must choose one AAA-approved Ability or injectable move for ${pokemon.name}.`
      : "";
    return {
      result: "resolved",
      reason: `${owner?.name ? `${owner.name}'s ` : ""}${pokemon.name} was added to the Battle Phase team, locked against removal, and protected from Curses.${repairText}${compensationText}`,
      statusIds: [status.id],
      status,
      pokemon,
      teamMutation,
      compensationRequired,
      compensationStatus: status.payload.compensationStatus,
      customization: status.payload.customization,
      grantedCustomizations: status.payload.grantedCustomizations
    };
  }

  function applyArenaTrapCustomization(state, input = {}, options = {}) {
    const status = (state.lingeringStatuses || []).find((entry) => entry.id === input.statusId);
    if (!status || status.type !== CONTROL_STATUS_TYPES.ARENA_TRAP || !statusIsActive(status, options)) {
      return { result: "noEffect", reason: "That Arena Trap customization is no longer active." };
    }
    const customization = status.payload?.customization;
    if (!customization?.required || customization.status !== "pending") {
      return { result: "noEffect", reason: customization?.status === "completed" ? "That Arena Trap customization is already complete." : "This Arena Trap does not require compensation." };
    }
    const pokemon = availablePokemonRecords(state).find((record) => record.id === status.targetPokemonId);
    if (!pokemon) return { result: "noEffect", reason: "The trapped roster Pokemon is no longer available." };
    const actorPlayerId = String(input.actorPlayerId || "");
    if (!actorPlayerId || actorPlayerId !== customization.choiceOwnerPlayerId || actorPlayerId !== pokemon.trainerId) {
      return { result: "noEffect", reason: "Only the trapped Pokemon's owner may choose its Arena Trap customization." };
    }
    const kind = String(input.kind || "").trim().toLowerCase();
    const name = String(input.name || "").trim();
    const legality = customizationLegality({ kind, name, sourceType: "token", sourceId: "arena-trap" });
    if (!legality.ok) return { result: "noEffect", reason: legality.reason };
    if (kind === CUSTOMIZATION_KINDS.ABILITY && typeof options.abilityExists === "function" && !options.abilityExists(name)) {
      return { result: "noEffect", reason: `${name} is not in the current Ability catalog.` };
    }
    if (kind === CUSTOMIZATION_KINDS.MOVE && typeof options.moveExists === "function" && !options.moveExists(name)) {
      return { result: "noEffect", reason: `${name} is not in the current move catalog.` };
    }
    const now = options.now || new Date().toISOString();
    const makeId = options.makeId || ((prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
    const grantId = makeId("arena-trap-customization");
    const build = activeBuildForPlayer(state, pokemon.trainerId, options);
    const slotIndex = build.slots.findIndex((slot) => slot?.pokemonRecordId === pokemon.id);
    const slot = slotIndex >= 0 ? build.slots[slotIndex] : null;
    const grant = {
      id: grantId,
      kind,
      name,
      label: `${kind === CUSTOMIZATION_KINDS.ABILITY ? "Ability" : "Move"}: ${name}`,
      playerId: pokemon.trainerId,
      pokemonRecordId: pokemon.id,
      sourceType: "token",
      sourceName: "Arena Trap",
      sourceDefinitionId: "arena-trap",
      sourceStatusId: status.id,
      duration: "Current Battle Phase",
      status: "active",
      active: true,
      createdAt: now
    };
    if (kind === CUSTOMIZATION_KINDS.ABILITY) {
      pokemon.effectBuffs ||= [];
      pokemon.effectBuffs.push({
        ...grant,
        type: "abilityGrant",
        abilityName: name,
        clearable: true,
        permanent: false
      });
      if (slot) slot.ability = name;
    } else {
      const owner = (state.players || []).find((player) => player.id === pokemon.trainerId);
      if (!owner) return { result: "noEffect", reason: "The trapped Pokemon's owner could not be found." };
      owner.moveAccessGrants ||= [];
      owner.moveAccessGrants.push({
        ...grant,
        mode: "specific-moves",
        moveName: name,
        moveNames: [name]
      });
      if (slot) {
        slot.moves = Array.from({ length: 4 }, (_, index) => String(slot.moves?.[index] || ""));
        const requestedIndex = Number(input.moveSlotIndex);
        const openIndex = slot.moves.findIndex((move) => !move);
        const moveSlotIndex = Number.isInteger(requestedIndex) && requestedIndex >= 0 && requestedIndex < 4
          ? requestedIndex
          : openIndex >= 0 ? openIndex : 0;
        slot.moves[moveSlotIndex] = name;
        grant.moveSlotIndex = moveSlotIndex;
      }
    }
    build.updatedAt = now;
    customization.status = "completed";
    customization.completedAt = now;
    customization.kind = kind;
    customization.name = name;
    customization.grantId = grantId;
    status.payload.compensationStatus = "completed";
    status.payload.grantedCustomizations = [grant];
    return {
      result: "resolved",
      reason: `${pokemon.name} gained ${grant.label} from Arena Trap compensation.`,
      status,
      pokemon,
      customization,
      grant,
      buildId: build.id,
      buildSlotIndex: slotIndex
    };
  }

  function moveGrantTargetsRosterInstance(grant = {}, pokemonId = "") {
    const ids = uniqueIds([
      grant.pokemonRecordId,
      grant.pokemonId,
      ...(Array.isArray(grant.pokemonRecordIds) ? grant.pokemonRecordIds : []),
      ...(Array.isArray(grant.pokemonIds) ? grant.pokemonIds : [])
    ]);
    return ids.includes(String(pokemonId || ""));
  }

  function clearExactMoveAccessGrants(state, pokemon, input = {}, options = {}) {
    const now = options.now || new Date().toISOString();
    const ownerId = pokemon.trainerId;
    const collections = [];
    const owner = (state.players || []).find((player) => player.id === ownerId);
    if (owner?.moveAccessGrants) collections.push(owner.moveAccessGrants);
    if (state.teambuilder?.moveAccessGrantsByPlayerId?.[ownerId]) collections.push(state.teambuilder.moveAccessGrantsByPlayerId[ownerId]);
    if (state.perkSystem?.moveAccessGrantsByPlayerId?.[ownerId]) collections.push(state.perkSystem.moveAccessGrantsByPlayerId[ownerId]);
    if (state.classStateByPlayerId?.[ownerId]?.moveAccessGrants) collections.push(state.classStateByPlayerId[ownerId].moveAccessGrants);
    const removedIds = [];
    collections.forEach((grants) => (grants || []).forEach((grant) => {
      if (!moveGrantTargetsRosterInstance(grant, pokemon.id)) return;
      if (grant.active === false || ["removed", "expired", "replaced", "consumed"].includes(String(grant.status || "").toLowerCase())) return;
      grant.active = false;
      grant.status = "removed";
      grant.removedAt = now;
      grant.removedByEffectId = input.sourceEffectId || input.eventId || "";
      grant.removalReason = "Clear Smog";
      removedIds.push(grant.id || `${ownerId}:${pokemon.id}:move-grant`);
    }));
    return uniqueIds(removedIds);
  }

  function resolveClearSmog(state, input = {}, options = {}) {
    const pokemon = availablePokemonRecords(state).find((record) => record.id === input.targetPokemonId);
    if (!pokemon) return { result: "noEffect", reason: "Choose a specific roster Pokemon for Clear Smog.", statusIds: [] };
    const now = options.now || new Date().toISOString();
    const removedEffectBuffs = (pokemon.effectBuffs || []).filter((buff) => buff.clearable !== false
      && !["removed", "expired", "replaced", "consumed"].includes(String(buff.status || "").toLowerCase()));
    removedEffectBuffs.forEach((buff) => {
      buff.status = "removed";
      buff.removedAt = now;
      buff.removedByEffectId = input.sourceEffectId || input.eventId || "";
      const sourceStatus = (state.lingeringStatuses || []).find((status) => status.id === buff.sourceStatusId);
      if (sourceStatus?.type === CONTROL_STATUS_TYPES.ARENA_TRAP) {
        sourceStatus.payload ||= {};
        sourceStatus.payload.clearedBuffIds = uniqueIds([...(sourceStatus.payload.clearedBuffIds || []), buff.id]);
        sourceStatus.payload.tierBuffClearedByClearSmog = true;
        sourceStatus.payload.tierBuffClearedAt = now;
      }
    });
    const removedBuffLabelSet = new Set(removedEffectBuffs.map((buff) => String(buff.label || "").trim()).filter(Boolean));
    const removedBuffLabels = (pokemon.buffs || []).filter((label) => removedBuffLabelSet.has(String(label || "").trim()));
    pokemon.buffs = (pokemon.buffs || []).filter((label) => !removedBuffLabelSet.has(String(label || "").trim()));
    const removedMoveGrantIds = clearExactMoveAccessGrants(state, pokemon, input, options);
    const removedCount = removedEffectBuffs.length + removedBuffLabels.length + removedMoveGrantIds.length;
    return {
      result: removedCount ? "resolved" : "noEffect",
      reason: removedCount
        ? `Clear Smog removed ${removedCount} buff or access record${removedCount === 1 ? "" : "s"} from ${pokemon.name}.`
        : `${pokemon.name} had no clearable buffs.`,
      statusIds: [],
      removedEffectBuffIds: removedEffectBuffs.map((buff) => buff.id).filter(Boolean),
      removedBuffLabels,
      removedMoveGrantIds,
      pokemon
    };
  }

  function expireArenaTrapsAtBattleEnd(state, options = {}) {
    const now = options.now || new Date().toISOString();
    const expired = activeStatuses(state, options, (status) => status.type === CONTROL_STATUS_TYPES.ARENA_TRAP);
    const cleanupRecords = [];
    expired.forEach((status) => {
      status.status = "expired";
      status.expiredAt = now;
      status.expiredAtPhase = "battle-results";
      status.expirationReason = "Current Battle Phase completed";
      const removedBuffIds = [];
      (state.pokemonRecords || []).forEach((pokemon) => {
        (pokemon.effectBuffs || []).forEach((buff) => {
          if (buff.sourceStatusId !== status.id || ["removed", "expired"].includes(String(buff.status || "").toLowerCase())) return;
          buff.status = "expired";
          buff.expiredAt = now;
          buff.expirationReason = "Linked Arena Trap expired";
          if (buff.id) removedBuffIds.push(buff.id);
        });
      });
      (state.players || []).forEach((player) => {
        (player.moveAccessGrants || []).forEach((grant) => {
          if (grant.sourceStatusId !== status.id || grant.active === false) return;
          grant.active = false;
          grant.status = "expired";
          grant.expiredAt = now;
          grant.expirationReason = "Linked Arena Trap expired";
          if (grant.id) removedBuffIds.push(grant.id);
        });
      });
      const key = status.payload?.forcedTeamMutation?.battleTeamKey || battleTeamKey(state, options);
      const team = state.battleTeams?.[key]?.[status.targetPlayerId];
      if (team) team.forcedMemberStatusIds = (team.forcedMemberStatusIds || []).filter((id) => id !== status.id);
      cleanupRecords.push({
        sourceStatusId: status.id,
        targetPlayerId: status.targetPlayerId,
        rosterInstanceId: status.targetPokemonId,
        removedTeamSlotLock: true,
        removedCurseProtection: true,
        removedBuffIds,
        retainedHistoricalTeamSelection: true
      });
    });
    (state.pokemonRecords || []).forEach((pokemon) => {
      pokemon.nerfs = (pokemon.nerfs || []).filter((nerf) => !/arena trapped/i.test(String(nerf)));
    });
    uniqueIds(expired.map((status) => status.targetPlayerId)).forEach((playerId) => {
      if (state.teambuilder?.teamRepairByPlayerId) delete state.teambuilder.teamRepairByPlayerId[playerId];
    });
    expired.cleanupRecords = cleanupRecords;
    return expired;
  }

  function resolveSubstitutePlacement(state, input = {}, options = {}) {
    const pokemon = availablePokemonRecords(state).find((record) => record.id === input.targetPokemonId);
    if (!pokemon) return { result: "noEffect", reason: "Choose a specific owned Pokemon for Substitute.", statusIds: [] };
    if (input.requiredOwnerPlayerId && pokemon.trainerId !== input.requiredOwnerPlayerId) {
      return { result: "noEffect", reason: "Substitute can only be attached to a Pokemon owned by its user.", statusIds: [] };
    }
    const existing = activeStatuses(state, options, (status) => (
      status.type === CONTROL_STATUS_TYPES.SUBSTITUTE && status.targetPokemonId === pokemon.id
    ));
    if (existing.length) return { result: "noEffect", reason: `${pokemon.name} already has a Substitute.`, statusIds: [] };
    const status = createStatus(state, {
      ...input,
      type: CONTROL_STATUS_TYPES.SUBSTITUTE,
      name: "Substitute Attached",
      category: "Protection",
      targetPlayerId: pokemon.trainerId,
      targetPokemonId: pokemon.id,
      targetPokemonName: pokemon.name,
      selectedTargetType: "pokemon",
      applicationScope: APPLICATION_SCOPES.ROSTER_INSTANCE,
      affectedEntityType: "pokemon",
      selectedRosterInstanceIds: [pokemon.id],
      affectedRosterInstanceIds: [pokemon.id],
      duration: input.duration || "Until used or Gym end",
      durationGyms: input.durationGyms || 1,
      payload: { blocksNextAffectingEffect: true, attachedToken: true, ...(input.payload || {}) },
      note: "Protects this roster instance from the next effect that would affect it."
    }, options);
    return { result: "resolved", reason: `Substitute attached to ${pokemon.name}.`, statusIds: [status.id], status, pokemon };
  }

  function createBanPhaseProtection(state, input = {}, options = {}) {
    const speciesName = String(input.speciesName || input.targetPokemonName || "").trim();
    const existing = activeSpeciesStatuses(state, speciesName, CONTROL_STATUS_TYPES.BAN_PHASE_PROTECTION, options)
      .find((status) => phaseStatusMatches(status, options));
    if (existing) return existing;
    return createStatus(state, {
      ...input,
      type: CONTROL_STATUS_TYPES.BAN_PHASE_PROTECTION,
      name: "Ban Protected This Phase",
      targetPokemonName: speciesName,
      selectedTargetType: "pokemon",
      applicationScope: APPLICATION_SCOPES.GLOBAL_SPECIES,
      affectedEntityType: "pokemon",
      speciesId: (options.keyForSpecies || defaultSpeciesKey)(speciesName),
      duration: "Current Phase",
      payload: {
        blocksBan: true,
        phaseScope: { series: options.series, gym: Number(options.gym), phase: options.phase },
        causedBySubstitute: true
      },
      note: "Substitute prevented this species from being banned again during the current phase."
    }, options);
  }

  function effectAffectedRosterInstanceIds(state, effect = {}, options = {}) {
    const scope = canonicalScopeRecord(effect);
    if (scope.applicationScope === APPLICATION_SCOPES.GLOBAL_SPECIES) {
      return speciesRosterInstanceIds(state, effect.speciesName || effect.targetPokemonName || scope.speciesId, options);
    }
    if (scope.applicationScope === APPLICATION_SCOPES.PLAYER_ROSTER_INSTANCES) {
      return availablePokemonRecords(state)
        .filter((pokemon) => pokemon.trainerId === effect.targetPlayerId)
        .map((pokemon) => pokemon.id);
    }
    return uniqueIds(scope.affectedRosterInstanceIds.length ? scope.affectedRosterInstanceIds : scope.selectedRosterInstanceIds);
  }

  function interceptEffectWithSubstitute(state, effect = {}, options = {}) {
    const now = options.now || new Date().toISOString();
    const effectType = String(effect.effectType || effect.type || "").toLowerCase();
    const scope = canonicalScopeRecord(effect);
    const affectedRosterInstanceIds = effectAffectedRosterInstanceIds(state, effect, options);
    const existingExclusions = uniqueIds(effect.excludedRosterInstanceIds);
    const rageImmuneIds = effectType === CONTROL_STATUS_TYPES.RESTRICT
      ? affectedRosterInstanceIds.filter((id) => {
        const pokemon = availablePokemonRecords(state).find((record) => record.id === id);
        return pokemonHasRestrictImmunity(state, pokemon, options);
      })
      : [];
    const curseImmuneIds = (effect.isCurse === true || effectType.includes("curse"))
      ? affectedRosterInstanceIds.filter((id) => {
        const pokemon = availablePokemonRecords(state).find((record) => record.id === id);
        return pokemonHasCurseImmunity(state, pokemon, options);
      })
      : [];
    const protectedBeforeSubstituteIds = uniqueIds([...existingExclusions, ...rageImmuneIds, ...curseImmuneIds]);
    const candidateRosterInstanceIds = effectType === CONTROL_STATUS_TYPES.BAN
      ? (effect.substituteChecksSelectedTargetOnly === true && scope.selectedRosterInstanceId
        ? [scope.selectedRosterInstanceId].filter((id) => affectedRosterInstanceIds.includes(id))
        : [])
      : affectedRosterInstanceIds;
    const substituteCandidates = candidateRosterInstanceIds
      .filter((id) => !protectedBeforeSubstituteIds.includes(id))
      .map((id) => activeStatuses(state, options, (status) => (
        status.type === CONTROL_STATUS_TYPES.SUBSTITUTE
        && status.targetPokemonId === id
        && status.payload?.blocksNextAffectingEffect === true
      ))[0])
      .filter(Boolean);

    const consumed = effectType === CONTROL_STATUS_TYPES.BAN
      ? substituteCandidates.slice(0, 1)
      : substituteCandidates;
    consumed.forEach((status) => {
      status.status = "consumed";
      status.consumedAt = now;
      status.consumedByEventId = effect.sourceEffectId || effect.eventId || "";
      status.consumedByEffectType = effectType;
    });

    if (effectType === CONTROL_STATUS_TYPES.BAN && consumed.length === 1) {
      const speciesName = effect.speciesName || effect.targetPokemonName || consumed[0].targetPokemonName;
      const protection = createBanPhaseProtection(state, {
        speciesName,
        sourceEffectId: effect.sourceEffectId || effect.eventId || "",
        sourcePlayerId: effect.sourcePlayerId || effect.actorPlayerId || "",
        sourceTokenId: consumed[0].sourceTokenId || "Substitute",
        sourceTokenName: "Substitute"
      }, options);
      return {
        result: "intercepted",
        reason: `${consumed[0].targetPokemonName || speciesName}'s Substitute negated the entire Ban.`,
        negateEntireEffect: true,
        affectedRosterInstanceIds,
        excludedRosterInstanceIds: existingExclusions,
        consumedStatusIds: [consumed[0].id],
        createdStatusIds: [protection.id],
        protectionStatus: protection
      };
    }

    const substitutedIds = consumed.map((status) => status.targetPokemonId);
    const excludedRosterInstanceIds = uniqueIds([...protectedBeforeSubstituteIds, ...substitutedIds]);
    return {
      result: consumed.length || rageImmuneIds.length || curseImmuneIds.length ? "intercepted" : "notIntercepted",
      reason: consumed.length
        ? `${consumed.map((status) => status.targetPokemonName || "A Pokemon").join(", ")}'s Substitute prevented that roster instance from being affected.`
        : rageImmuneIds.length ? "Rage Candy Bar immunity applied before Substitute."
          : curseImmuneIds.length ? "Exact-instance Curse Immunity applied before Substitute."
            : "No Substitute interception was needed.",
      negateEntireEffect: false,
      affectedRosterInstanceIds,
      excludedRosterInstanceIds,
      rageImmuneRosterInstanceIds: rageImmuneIds,
      curseImmuneRosterInstanceIds: curseImmuneIds,
      consumedStatusIds: consumed.map((status) => status.id),
      createdStatusIds: []
    };
  }

  function resolveRageCandyBar(state, input = {}, options = {}) {
    const pokemon = availablePokemonRecords(state).find((record) => record.id === input.targetPokemonId);
    if (!pokemon) return { result: "noEffect", reason: "The selected owned Pokemon is no longer available.", statusIds: [], buffIds: [] };
    if (input.requiredOwnerPlayerId && pokemon.trainerId !== input.requiredOwnerPlayerId) {
      return { result: "noEffect", reason: "Rage Candy Bar can only affect a Pokemon owned by its user.", statusIds: [], buffIds: [] };
    }
    const now = options.now || new Date().toISOString();
    const makeId = options.makeId || ((prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
    let enhancement = activeStatuses(state, options, (status) => (
      status.type === CONTROL_STATUS_TYPES.RAGE_ENHANCEMENT && status.targetPokemonId === pokemon.id
    ))[0];
    const extended = Boolean(enhancement);
    if (enhancement) {
      enhancement.durationGyms = Number(enhancement.durationGyms || 0) + 2;
      enhancement.duration = `${enhancement.durationGyms} Gyms from original activation`;
      enhancement.extendedAt ||= [];
      enhancement.extendedAt.push(now);
      enhancement.extensionCount = Number(enhancement.extensionCount || 0) + 1;
    } else {
      activeStatuses(state, options, (status) => (
        status.type === CONTROL_STATUS_TYPES.RESTRICT_IMMUNITY && status.targetPokemonId === pokemon.id
      )).forEach((status) => {
        status.status = "replaced";
        status.replacedAt = now;
        status.replacedBy = CONTROL_STATUS_TYPES.RAGE_ENHANCEMENT;
      });
      enhancement = createStatus(state, {
        ...input,
        type: CONTROL_STATUS_TYPES.RAGE_ENHANCEMENT,
        name: "Rage Candy Bar",
        targetPlayerId: pokemon.trainerId,
        targetPokemonId: pokemon.id,
        targetPokemonName: pokemon.name,
        selectedTargetType: "pokemon",
        applicationScope: APPLICATION_SCOPES.ROSTER_INSTANCE,
        affectedEntityType: "pokemon",
        selectedRosterInstanceIds: [pokemon.id],
        affectedRosterInstanceIds: [pokemon.id],
        duration: "2 Gyms",
        durationGyms: 2,
        payload: { restrictImmune: true, levelBonus: 3, evCapBonus: 252, compositeEnhancement: true },
        note: "+3 Levels, EV Cap +252, and Restrict immunity share this duration."
      }, options);
    }

    pokemon.effectBuffs ||= [];
    const grants = [
      { type: "levelBonus", amount: 3, label: "+3 Levels" },
      { type: "evCapBonus", amount: 252, label: "EV Cap +252" }
    ].map((grant) => {
      let buff = pokemon.effectBuffs.find((entry) => entry.sourceDefinitionId === "rage-candy-bar" && entry.type === grant.type);
      if (!buff) {
        buff = { id: makeId("pokemon-buff"), ...grant };
        pokemon.effectBuffs.push(buff);
      }
      Object.assign(buff, grant, {
        status: "active",
        permanent: false,
        clearable: true,
        sourceType: "token",
        sourceDefinitionId: "rage-candy-bar",
        sourceStatusId: enhancement.id,
        sourceTokenId: input.sourceTokenId || buff.sourceTokenId || "",
        sourceTokenName: input.sourceTokenName || "Rage Candy Bar",
        actorPlayerId: input.actorPlayerId || buff.actorPlayerId || "",
        createdAt: buff.createdAt || now
      });
      return buff;
    });
    pokemon.buffs = [...new Set([...(pokemon.buffs || []), "+3 Levels", "EV Cap +252"] )];
    return {
      result: "resolved",
      reason: extended
        ? `${pokemon.name}'s Rage Candy Bar enhancement was extended by 2 Gyms without stacking its bonuses.`
        : `${pokemon.name} gained +3 Levels, EV Cap +252, and Restrict immunity for 2 Gyms.`,
      statusIds: [enhancement.id],
      buffIds: grants.map((grant) => grant.id),
      status: enhancement,
      pokemon,
      extended
    };
  }

  function safeguardProtectsOperation(category = "") {
    return SAFEGUARD_PROTECTED_CATEGORIES.includes(String(category || "").trim());
  }

  function activeSafeguardForPlayer(state, playerId, options = {}) {
    return activeStatuses(state, options, (status) => (
      status.type === CONTROL_STATUS_TYPES.SAFEGUARD
      && status.targetPlayerId === playerId
    ))[0] || null;
  }

  function playerHasActiveSafeguard(state, playerId, category = "", options = {}) {
    if (!safeguardProtectsOperation(category)) return false;
    const status = activeSafeguardForPlayer(state, playerId, options);
    const scope = status?.payload?.protectionScope || [];
    return Boolean(status && scope.includes(category));
  }

  function resolveSafeguard(state, input = {}, options = {}) {
    const player = (state.players || []).find((entry) => entry.id === input.targetPlayerId);
    if (!player) return { result: "noEffect", reason: "Choose one current player for Safeguard.", statusIds: [] };
    const existing = activeSafeguardForPlayer(state, player.id, options);
    if (existing) return { result: "noEffect", reason: `${player.name || "That player"} already has Safeguard.`, statusIds: [] };
    const status = createStatus(state, {
      ...input,
      type: CONTROL_STATUS_TYPES.SAFEGUARD,
      name: "Safeguard",
      category: "Protection",
      targetPlayerId: player.id,
      targetPlayerName: player.name || "",
      selectedTargetType: "player",
      applicationScope: APPLICATION_SCOPES.SINGLE_PLAYER,
      affectedEntityType: "player",
      duration: "Until Gym end",
      durationGyms: 1,
      payload: {
        protectionScope: [...SAFEGUARD_PROTECTED_CATEGORIES],
        exactActorAndTargetScoping: true,
        ...(input.payload || {})
      },
      note: "Protects only money and Token steal, destroy, and copy operations, plus Follow Me and Embargo."
    }, options);
    return {
      result: "resolved",
      reason: `${player.name || "The player"} is protected by Safeguard until Gym end.`,
      statusIds: [status.id],
      status,
      player,
      protectionScope: [...SAFEGUARD_PROTECTED_CATEGORIES]
    };
  }

  function cleanupExpiredRageEnhancements(state) {
    const inactiveStatusIds = new Set((state.lingeringStatuses || [])
      .filter((status) => status.type === CONTROL_STATUS_TYPES.RAGE_ENHANCEMENT && status.status !== "active")
      .map((status) => status.id));
    (state.pokemonRecords || []).forEach((pokemon) => {
      const expiredBuffs = (pokemon.effectBuffs || []).filter((buff) => inactiveStatusIds.has(buff.sourceStatusId) && buff.status === "active");
      expiredBuffs.forEach((buff) => {
        buff.status = "expired";
        buff.expiredWithStatusId = buff.sourceStatusId;
      });
      const activeLabels = new Set((pokemon.effectBuffs || []).filter((buff) => buff.status === "active").map((buff) => buff.label));
      if (expiredBuffs.length) {
        const expiredLabels = new Set(expiredBuffs.map((buff) => buff.label));
        pokemon.buffs = (pokemon.buffs || []).filter((label) => !expiredLabels.has(label) || activeLabels.has(label));
      }
    });
  }

  function expireAtStartOfGym(state, options = {}) {
    const now = options.now || new Date().toISOString();
    const expired = [];
    (state.lingeringStatuses || []).filter((status) => status.status === "active").forEach((status) => {
      if (status.expiresAtPhase && status.expiresAtPhase !== "start") return;
      if (!status.durationGyms || remainingGyms(status, options) > 0) return;
      status.status = "expired";
      status.expiredAt = now;
      status.expiredAtPhase = "start";
      status.expirationReason = "Start-of-Gym duration expiration";
      expired.push(status);
    });
    cleanupExpiredRageEnhancements(state);
    restoreExpiredDevolveOverlays(state);
    expireLingeringAromaRelationships(state, options);
    expireTokenCopyRelationships(state, options);
    return expired;
  }

  function expireAtPhaseBoundary(state, options = {}) {
    const now = options.now || new Date().toISOString();
    const expired = [];
    (state.lingeringStatuses || []).filter((status) => status.status === "active" && status.expiresAtPhase).forEach((status) => {
      if (!phaseAnchoredExpirationReached(status, options)) return;
      status.status = "expired";
      status.expiredAt = now;
      status.expiredAtPhase = options.phase || status.expiresAtPhase;
      status.expirationReason = "Phase-anchored Gym duration expiration";
      expired.push(status);
      const repair = state.teambuilder?.setRepairByStatusId?.[status.id];
      if (repair && repair.status === "required") {
        repair.status = "expired";
        repair.expiredAt = now;
      }
    });
    cleanupExpiredRageEnhancements(state);
    restoreExpiredDevolveOverlays(state);
    expireLingeringAromaRelationships(state, options);
    expireTokenCopyRelationships(state, options);
    return expired;
  }

  function battleLegality(state, pokemon, speciesName, options = {}) {
    const banStatuses = activeSpeciesStatuses(state, speciesName, CONTROL_STATUS_TYPES.BAN, options)
      .filter((status) => statusAffectsPokemon(status, pokemon, options));
    const restrictStatuses = activeSpeciesStatuses(state, speciesName, CONTROL_STATUS_TYPES.RESTRICT, options)
      .filter((status) => statusAffectsPokemon(status, pokemon, options));
    const instanceRestrictions = activeStatuses(state, options, (status) => (
      status.type === CONTROL_STATUS_TYPES.INSTANCE_RESTRICT && statusAffectsPokemon(status, pokemon, options)
    ));
    const banned = banStatuses.length > 0;
    const restricted = restrictStatuses.length > 0 || instanceRestrictions.length > 0;
    const restrictImmune = pokemonHasRestrictImmunity(state, pokemon, options);
    return {
      legal: !banned && (!restricted || restrictImmune),
      banned,
      restricted,
      restrictImmune,
      globalBanStatusIds: banStatuses.map((status) => status.id),
      globalRestrictStatusIds: restrictStatuses.map((status) => status.id),
      instanceRestrictStatusIds: instanceRestrictions.map((status) => status.id),
      reason: banned ? "Pokemon is currently banned."
        : restricted && !restrictImmune ? "Pokemon is currently restricted."
          : restricted && restrictImmune ? "This roster instance is immune to Restrict."
            : ""
    };
  }

  return Object.freeze({
    CONTROL_STATUS_TYPES,
    SAFEGUARD_OPERATION_CATEGORIES,
    SAFEGUARD_PROTECTED_CATEGORIES,
    STANDARD_CURSE_TYPES,
    APPLICATION_SCOPES,
    CUSTOMIZATION_KINDS,
    EFFECT_OPERATION_TYPES,
    GENERIC_CUSTOMIZATION_BANS,
    customizationLegality,
    inventoryResourceName,
    inventoryResourceCategory,
    isMasterBallResource,
    playerHasActivePerk,
    playerHasStickyHold,
    defaultSpeciesKey,
    canonicalApplicationScope,
    canonicalScopeRecord,
    gymDistance,
    remainingGyms,
    phaseAnchoredExpirationReached,
    statusIsActive,
    statusSuppressedByColdWave,
    ongoingRecordSuppressedByColdWave,
    statusAffectsPokemon,
    activeStatuses,
    activeSpeciesStatuses,
    speciesHasUnbanProtection,
    speciesHasBanPhaseProtection,
    pokemonHasRestrictImmunity,
    pokemonHasArenaTrap,
    pokemonHasCurseImmunity,
    standardCurseTarget,
    standardCurseDefinition,
    standardCurseSetRules,
    applyStandardCurseSetOverrides,
    completeSilencingSetRepair,
    forcedTeamStatuses,
    forcedTeamStatusForPokemon,
    forcedTeamRequirements,
    pendingArenaTrapCustomizations,
    forcedTeamRepairState,
    refreshForcedTeamRepairState,
    applyForcedTeamMutation,
    snapshot,
    restore,
    createStatus,
    activeMoveRestrictions,
    moveRestrictionForName,
    resolveMoveDeleter,
    expireMoveRestrictionsAtGymEnd,
    resolveColdWave,
    expireColdWaveAtGymEnd,
    activeExplicitOngoingEffects,
    ongoingEffectBenefitsPlayer,
    lingeringAromaTargetingCosts,
    applyLingeringAromaTargetingCosts,
    resolveLingeringAroma,
    expireLingeringAromaRelationships,
    smokescreenWheelPlayers,
    smokescreenParentTarget,
    smokescreenCorrespondingTargets,
    resolveSmokescreenRedirect,
    createImmutableBroughtSnapshot,
    broughtSnapshotPlayer,
    resolvePurgeMarker,
    resolvePostPayoutPurge,
    resolveRevengePostPayout,
    undoAtomicEffectOperation,
    createCanonicalTokenInventoryCopy,
    createTokenCopyRelationship,
    createFollowMeCopyRelationship,
    settleTokenCopyRelationshipsForEffect,
    expireTokenCopyRelationships,
    copyConsumedTokenForRelationships,
    scheduleTeleportDelayedEffect,
    resolveTeleportDelayedEffect,
    createCopiedActivation,
    resolveStandardCurse,
    resolveHazeCurse,
    resolveDevolveCurse,
    restoreExpiredDevolveOverlays,
    resolveForesightCurse,
    resolveKnockOffCurse,
    resolveRestrict,
    createInstanceRestriction,
    resolveUnban,
    resolveExtraBan,
    resolveArenaTrap,
    applyArenaTrapCustomization,
    resolveClearSmog,
    incinerateEligibleResources,
    validateIncinerateSelections,
    resolveIncinerate,
    wickedBlowActiveRosterTarget,
    wickedBlowResolutionPlan,
    resolveWickedBlow,
    resolveStealPokemon,
    expireArenaTrapsAtBattleEnd,
    resolveSubstitutePlacement,
    interceptEffectWithSubstitute,
    resolveRageCandyBar,
    safeguardProtectsOperation,
    activeSafeguardForPlayer,
    playerHasActiveSafeguard,
    resolveSafeguard,
    cleanupExpiredRageEnhancements,
    expireAtStartOfGym,
    expireAtPhaseBoundary,
    battleLegality
  });
});
