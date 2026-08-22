"use strict";

const routeEngine = require("./route-encounter-engine.js");
const routeLifecycle = require("./route-series-lifecycle.js");
const routePokemonAcquisition = require("./route-pokemon-acquisition.js");

const ROUTE_ACTION_SCHEMA_VERSION = 1;
const ROUTE_ACTION_TYPE = "route-exploration";

function cloneJson(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value));
}

function text(value, fallback = "") {
  const normalized = String(value ?? "").trim();
  return normalized || fallback;
}

function pad3(value) {
  return String(value).padStart(3, "0");
}

function normalizeArray(value) {
  return Array.isArray(value) ? value : [];
}

function counterFromId(id) {
  const match = String(id || "").match(/-(\d+)$/);
  return match ? Number(match[1]) : 0;
}

function routeIdFor(routeNumber) {
  return `route-${Number(routeNumber)}`;
}

function ensureV2ActionPhase(gameState, seriesId) {
  gameState.v2 ||= {};
  gameState.v2.actionPhaseBySeriesId ||= {};
  const existing = gameState.v2.actionPhaseBySeriesId[seriesId] || {};
  const actions = normalizeArray(existing.actions);
  const spends = normalizeArray(existing.spends);
  const counters = {
    action: Math.max(Number(existing.counters?.action || 0), ...actions.map((action) => counterFromId(action.actionId)), 0),
    spend: Math.max(Number(existing.counters?.spend || 0), ...spends.map((spend) => counterFromId(spend.spendId)), 0)
  };
  const normalized = {
    schemaVersion: ROUTE_ACTION_SCHEMA_VERSION,
    actionPhaseVersion: routeEngine.ACTION_PHASE_VERSION_V2,
    seriesId,
    counters,
    playerActionLedger: existing.playerActionLedger && typeof existing.playerActionLedger === "object"
      ? existing.playerActionLedger
      : {},
    actions,
    spends
  };
  gameState.v2.actionPhaseBySeriesId[seriesId] = normalized;
  return normalized;
}

function nextActionCounterId(actionPhase, key, prefix) {
  actionPhase.counters ||= {};
  actionPhase.counters[key] = Number(actionPhase.counters[key] || 0) + 1;
  return `${prefix}-${pad3(actionPhase.counters[key])}`;
}

function playerById(state, playerId) {
  return normalizeArray(state.players).find((player) => player.id === playerId) || null;
}

function routeOwnedPokemonForPlayer(state, playerId) {
  return normalizeArray(state.pokemonRecords).filter((pokemon) => (
    pokemon.trainerId === playerId
    && !["Released", "Removed"].includes(pokemon.status)
    && !["Released", "Removed"].includes(pokemon.rosterType)
  ));
}

function actionLedgerFor(actionPhase, playerId) {
  actionPhase.playerActionLedger ||= {};
  actionPhase.playerActionLedger[playerId] ||= { available: 0, spentActionIds: [] };
  const ledger = actionPhase.playerActionLedger[playerId];
  ledger.available = Number(ledger.available || 0);
  ledger.spentActionIds = normalizeArray(ledger.spentActionIds);
  return ledger;
}

function setV2PlayerActionBudget(gameState, options = {}) {
  const next = cloneJson(gameState);
  const seriesId = text(options.seriesId, "series-v2");
  const playerId = text(options.playerId);
  if (!playerById(next, playerId)) throw new Error(`Player not found: ${playerId || "(empty)"}.`);
  const actionPhase = ensureV2ActionPhase(next, seriesId);
  const ledger = actionLedgerFor(actionPhase, playerId);
  ledger.available = Number(options.available || 0);
  return { state: next, actionPhase, ledger };
}

function draftRouteAction(options = {}) {
  return {
    actionId: text(options.actionId),
    type: ROUTE_ACTION_TYPE,
    status: "drafted",
    playerId: text(options.playerId),
    seriesId: text(options.seriesId, "series-v2"),
    routeNumber: Number(options.routeNumber),
    routeId: routeIdFor(options.routeNumber)
  };
}

function routeStateFor(next, seriesId) {
  const routeState = next.v2?.routeEncounterBySeriesId?.[seriesId];
  if (!routeState) throw new Error(`V2 Route state does not exist for Series ${seriesId}.`);
  return routeLifecycle.normalizeV2RouteEncounterState(routeState);
}

function storeRouteState(next, seriesId, routeState) {
  next.v2 ||= {};
  next.v2.routeEncounterBySeriesId ||= {};
  next.v2.routeEncounterBySeriesId[seriesId] = routeLifecycle.normalizeV2RouteEncounterState(routeState);
  return next.v2.routeEncounterBySeriesId[seriesId];
}

function findRouteAction(actionPhase, actionId) {
  return normalizeArray(actionPhase.actions).find((action) => action.actionId === actionId) || null;
}

function validateRouteAction(gameState, draft = {}) {
  const errors = [];
  const seriesId = text(draft.seriesId, gameState.v2?.activeRouteEncounterSeriesId || "series-v2");
  const playerId = text(draft.playerId);
  const routeNumber = Number(draft.routeNumber);
  const actionPhase = ensureV2ActionPhase(gameState, seriesId);
  const existing = draft.actionId ? findRouteAction(actionPhase, draft.actionId) : null;
  const player = playerById(gameState, playerId);
  if (!player) errors.push(`Player not found: ${playerId || "(empty)"}.`);
  let routeState = null;
  try {
    routeState = routeStateFor(gameState, seriesId);
  } catch (error) {
    errors.push(error.message);
  }
  if (!Number.isInteger(routeNumber) || !routeState?.routes?.some((route) => route.routeNumber === routeNumber)) {
    errors.push(`Route ${draft.routeNumber ?? "(empty)"} does not exist for Series ${seriesId}.`);
  }
  const ledger = actionLedgerFor(actionPhase, playerId);
  if (!existing && ledger.available - ledger.spentActionIds.length <= 0) {
    errors.push(`${player?.name || playerId || "Player"} has no V2 Actions available.`);
  }
  return {
    ok: errors.length === 0,
    errors,
    duplicate: Boolean(existing),
    existingAction: existing,
    seriesId,
    playerId,
    routeNumber
  };
}

function commitRouteAction(gameState, options = {}) {
  const next = cloneJson(gameState);
  const draft = draftRouteAction(options);
  const seriesId = draft.seriesId;
  const playerId = draft.playerId;
  const routeNumber = draft.routeNumber;
  const actionPhase = ensureV2ActionPhase(next, seriesId);
  const requestedActionId = draft.actionId;
  const existing = requestedActionId ? findRouteAction(actionPhase, requestedActionId) : null;
  if (existing) return { state: next, action: existing, spend: actionPhase.spends.find((spend) => spend.spendId === existing.spendId) || null, duplicate: true };
  const validation = validateRouteAction(next, draft);
  if (!validation.ok) throw new Error(validation.errors.join(" "));
  const routeState = routeStateFor(next, seriesId);
  const ledger = actionLedgerFor(actionPhase, playerId);

  const actionId = requestedActionId || nextActionCounterId(actionPhase, "action", "v2-route-action");
  const spendId = nextActionCounterId(actionPhase, "spend", "v2-action-spend");
  const opportunityResult = routeEngine.createRouteEncounterOpportunity(routeState, {
    playerId,
    routeNumber,
    kind: "normal-route-action",
    source: {
      kind: "v2-route-action",
      actionId,
      spendId,
      actionType: ROUTE_ACTION_TYPE
    }
  });
  storeRouteState(next, seriesId, opportunityResult.state);
  const spend = {
    spendId,
    actionId,
    playerId,
    seriesId,
    amount: 1,
    resource: "action",
    status: "spent",
    reversible: true,
    source: { kind: "v2-route-action", routeNumber, routeId: routeIdFor(routeNumber) }
  };
  const action = {
    actionId,
    type: ROUTE_ACTION_TYPE,
    status: "committed",
    settlementStatus: "pending-encounter",
    playerId,
    seriesId,
    routeId: routeIdFor(routeNumber),
    routeNumber,
    spendId,
    opportunityId: opportunityResult.opportunity.opportunityId,
    resultId: "",
    acquisitionId: "",
    pokemonRecordId: "",
    causalChain: {
      actionId,
      spendId,
      opportunityId: opportunityResult.opportunity.opportunityId,
      resultId: "",
      acquisitionId: "",
      pokemonRecordId: ""
    }
  };
  ledger.spentActionIds.push(actionId);
  actionPhase.spends.push(spend);
  actionPhase.actions.push(action);
  return { state: next, action, spend, opportunity: opportunityResult.opportunity, duplicate: false };
}

function drawRouteActionEncounter(gameState, options = {}) {
  const next = cloneJson(gameState);
  const seriesId = text(options.seriesId, next.v2?.activeRouteEncounterSeriesId || "series-v2");
  const actionPhase = ensureV2ActionPhase(next, seriesId);
  const action = findRouteAction(actionPhase, options.actionId);
  if (!action) throw new Error(`Route Action not found: ${options.actionId || "(empty)"}.`);
  if (action.resultId) return { state: next, action, result: findRouteResult(routeStateFor(next, seriesId), action.resultId), duplicate: true };
  const routeState = routeStateFor(next, seriesId);
  const drawn = routeEngine.drawRouteEncounter(routeState, {
    opportunityId: action.opportunityId,
    ownedPokemon: routeOwnedPokemonForPlayer(next, action.playerId),
    residentId: options.residentId,
    seed: options.seed
  });
  storeRouteState(next, seriesId, drawn.state);
  action.resultId = drawn.result.resultId;
  action.status = "encounter-rolled";
  action.settlementStatus = "pending-acquisition";
  action.causalChain.resultId = drawn.result.resultId;
  return { state: next, action, result: drawn.result, duplicate: false };
}

function findRouteResult(routeState, resultId) {
  for (const route of routeState.routes || []) {
    const result = (route.encounterResults || []).find((entry) => entry.resultId === resultId);
    if (result) return result;
  }
  return null;
}

function finalizeRouteActionAcquisition(gameState, options = {}) {
  let next = cloneJson(gameState);
  const seriesId = text(options.seriesId, next.v2?.activeRouteEncounterSeriesId || "series-v2");
  const actionPhase = ensureV2ActionPhase(next, seriesId);
  const action = findRouteAction(actionPhase, options.actionId);
  if (!action) throw new Error(`Route Action not found: ${options.actionId || "(empty)"}.`);
  if (!action.resultId) throw new Error("Route Action cannot acquire before its encounter result exists.");
  if (action.pokemonRecordId && action.acquisitionId) return { state: next, action, pokemon: (next.pokemonRecords || []).find((entry) => entry.id === action.pokemonRecordId) || null, duplicate: true };

  let routeState = routeStateFor(next, seriesId);
  const finalized = routeEngine.finalizeRouteEncounterAcquisition(routeState, {
    resultId: action.resultId,
    rosterPokemonId: action.pokemonRecordId
  });
  routeState = storeRouteState(next, seriesId, finalized.state);
  const result = findRouteResult(routeState, action.resultId);
  const acquired = routePokemonAcquisition.createCanonicalRoutePokemonRecord(next, {
    playerId: action.playerId,
    seriesId,
    routeNumber: action.routeNumber,
    result,
    acquisitionId: finalized.acquisition.acquisitionId,
    now: options.now
  });
  next = acquired.state;
  const refreshedActionPhase = ensureV2ActionPhase(next, seriesId);
  const refreshedAction = findRouteAction(refreshedActionPhase, action.actionId);
  const refreshedRouteState = routeStateFor(next, seriesId);
  const routeAcquisition = findRouteAcquisition(refreshedRouteState, finalized.acquisition.acquisitionId);
  if (routeAcquisition) routeAcquisition.rosterPokemonId = acquired.pokemon.id;
  storeRouteState(next, seriesId, refreshedRouteState);
  refreshedAction.acquisitionId = finalized.acquisition.acquisitionId;
  refreshedAction.pokemonRecordId = acquired.pokemon.id;
  refreshedAction.status = "acquired";
  refreshedAction.settlementStatus = "pending-settlement";
  refreshedAction.causalChain.acquisitionId = finalized.acquisition.acquisitionId;
  refreshedAction.causalChain.pokemonRecordId = acquired.pokemon.id;
  return { state: next, action: refreshedAction, pokemon: acquired.pokemon, acquisition: routeAcquisition || finalized.acquisition, duplicate: !acquired.created };
}

function findRouteAcquisition(routeState, acquisitionId) {
  for (const route of routeState.routes || []) {
    const acquisition = (route.finalizedAcquisitions || []).find((entry) => entry.acquisitionId === acquisitionId);
    if (acquisition) return acquisition;
  }
  return null;
}

function settleRouteAction(gameState, options = {}) {
  const next = cloneJson(gameState);
  const seriesId = text(options.seriesId, next.v2?.activeRouteEncounterSeriesId || "series-v2");
  const actionPhase = ensureV2ActionPhase(next, seriesId);
  const action = findRouteAction(actionPhase, options.actionId);
  if (!action) throw new Error(`Route Action not found: ${options.actionId || "(empty)"}.`);
  if (!action.pokemonRecordId || !action.acquisitionId) throw new Error("Route Action cannot settle before Pokemon acquisition is complete.");
  action.status = "settled";
  action.settlementStatus = "settled";
  return { state: next, action };
}

function completeRouteAction(gameState, options = {}) {
  let current = gameState;
  const committed = commitRouteAction(current, options);
  current = committed.state;
  const drawn = drawRouteActionEncounter(current, {
    seriesId: options.seriesId,
    actionId: committed.action.actionId,
    residentId: options.residentId,
    seed: options.seed
  });
  current = drawn.state;
  const acquired = finalizeRouteActionAcquisition(current, {
    seriesId: options.seriesId,
    actionId: committed.action.actionId,
    now: options.now
  });
  current = acquired.state;
  const settled = settleRouteAction(current, {
    seriesId: options.seriesId,
    actionId: committed.action.actionId
  });
  return { state: settled.state, action: settled.action, spend: committed.spend, result: drawn.result, pokemon: acquired.pokemon, acquisition: acquired.acquisition };
}

function serializeAndReloadV2ActionGameState(gameState) {
  const next = cloneJson(gameState);
  next.v2 ||= {};
  Object.keys(next.v2.routeEncounterBySeriesId || {}).forEach((seriesId) => {
    next.v2.routeEncounterBySeriesId[seriesId] = routeLifecycle.normalizeV2RouteEncounterState(next.v2.routeEncounterBySeriesId[seriesId]);
  });
  Object.keys(next.v2.actionPhaseBySeriesId || {}).forEach((seriesId) => {
    ensureV2ActionPhase(next, seriesId);
  });
  next.pokemonRecords = normalizeArray(next.pokemonRecords);
  next.players = normalizeArray(next.players).map((player) => ({
    ...player,
    pokemonIds: normalizeArray(player.pokemonIds)
  }));
  return next;
}

module.exports = {
  ROUTE_ACTION_SCHEMA_VERSION,
  ROUTE_ACTION_TYPE,
  ensureV2ActionPhase,
  setV2PlayerActionBudget,
  draftRouteAction,
  validateRouteAction,
  commitRouteAction,
  drawRouteActionEncounter,
  finalizeRouteActionAcquisition,
  settleRouteAction,
  completeRouteAction,
  serializeAndReloadV2ActionGameState
};
