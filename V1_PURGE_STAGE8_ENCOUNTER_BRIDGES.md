# V1 Purge Stage 8A — Encounter Bridge Boundary Survey

Generated from `cc3fadd6f9b36ccc21bc88526c2224da9b0c084e`.

Purpose: separate dead wheel-era Encounter runtime bridges from token concepts that must be migrated onto the current V2 Route encounter system.

This stage is read-only with respect to production runtime. It does not change token rules.

## Marker summary

| File | Group | Marker | Count | Lines | Enclosing functions |
|---|---|---|---:|---|---|
| `app.js` | Current V2 Route token runtime | `function applyV2RouteRepel(` | 1 | 44836 | `applyV2RouteRepel` |
| `app.js` | Current V2 Route token runtime | `function useV2ExtraEncounter(` | 1 | 44818 | `useV2ExtraEncounter` |
| `app.js` | Current V2 Route token runtime | `function useV2MasterBallOnOpportunity(` | 1 | 44847 | `useV2MasterBallOnOpportunity` |
| `app.js` | Current V2 Route token runtime | `function useV2RouteRerollToken(` | 1 | 44798 | `useV2RouteRerollToken` |
| `app.js` | Current V2 Route token runtime | `V2_ROUTE_TOKEN_IDS` | 20 | 42507, 42514, 42515, 42516, 42517, 43857, 43890, 43922, 44091, 44092, 44093, 44145, 44194, 44233, 44295, 44801, 44821, 44839, 44850, 45040 | `getEncounterCapabilitiesForPlayer`, `getMasterBallOpportunityCapabilitiesForPlayer`, `getRouteRepelCapabilitiesForPlayer`, `useV2RouteRerollToken`, `useV2ExtraEncounter`, `applyV2RouteRepel`, `useV2MasterBallOnOpportunity`, `getRouteEncounterRailCapabilitiesForPlayer` |
| `app.js` | Encounter token names | `"Beast Ball"` | 2 | 2696, 2767 |  |
| `app.js` | Encounter token names | `"Dream Ball Token"` | 2 | 2693, 2764 |  |
| `app.js` | Encounter token names | `"Extra Encounter Token"` | 4 | 2690, 2761, 2973, 44094 |  |
| `app.js` | Encounter token names | `"Honey"` | 9 | 2694, 2765, 41187, 41188, 48903, 48986, 48987, 48991, 48998 | `augmentHoneyCausalUndoAfterAcquisition`, `ensureHoneyEndOfActionProcedures`, `resolveHoneyEndOfActionProcedure` |
| `app.js` | Encounter token names | `"Master Ball Token"` | 2 | 2695, 2766 |  |
| `app.js` | Encounter token names | `"Quick Ball Token"` | 3 | 672, 2692, 2763 |  |
| `app.js` | Encounter token names | `"Repel"` | 3 | 2691, 2762, 44033 |  |
| `app.js` | Encounter token names | `"Reroll"` | 9 | 1468, 2689, 3118, 29409, 41028, 41029, 41030, 41038, 45681 | `buildRivalSagaPokemonTierMap`, `renderWheelPanel` |
| `app.js` | Encounter-family contract model | `"wheelWindow"` | 1 | 790 |  |
| `app.js` | Old encounter resolver IDs | `"extraEncounter"` | 4 | 2993, 3299, 3891, 56378 | `applyActivationOverlay` |
| `app.js` | Old encounter result/event bridge | `"encounter-result"` | 9 | 650, 2731, 23152, 25519, 25532, 26165, 27594, 28011, 41036 | `createPokemonResultTimingWindow`, `liveActivityTimingCategory`, `liveTokenPromptDetails`, `getCurrentLivePrompt`, `currentEncounterPendingActivity`, `liveRefereePromptIsEncounterResult` |
| `app.js` | Old encounter result/event bridge | `"encounterBeforeRoll"` | 2 | 3492, 3525 |  |
| `app.js` | Old encounter result/event bridge | `"encounterResult"` | 7 | 703, 721, 831, 3489, 3526, 46947, 46988 | `launchTokenScenarioSandbox` |
| `app.js` | Old encounter result/event bridge | `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` | 14 | 2761, 2762, 2763, 2764, 2765, 2766, 2767, 3126, 3198, 3199, 3233, 3247, 3265, 29401 | `normalizeEffectTargetType`, `targetCategoryFromEffectBucket`, `buildRivalSagaPokemonTierMap` |
| `app.js` | Old encounter result/event bridge | `sourceType === "encounter"` | 3 | 23150, 26165, 27595 | `createPokemonResultTimingWindow`, `getCurrentLivePrompt`, `currentEncounterPendingActivity` |
| `app.js` | Old encounter result/event bridge | `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` | 12 | 869, 2726, 25519, 25532, 26403, 26414, 27138, 27139, 27594, 28012, 46989, 47526 | `liveActivityTimingCategory`, `liveTokenPromptDetails`, `liveManualEventTypeOptions`, `liveTimingWindowOptions`, `createLiveManualEventFromForm`, `currentEncounterPendingActivity`, `liveRefereePromptIsEncounterResult`, `launchTokenScenarioSandbox`, `createAdminTestEvent` |
| `scripts/run-token-qa-coverage.js` | Old encounter verification/tooling | `encounter-token-runtime.js` | 1 | 11 |  |
| `scripts/run-token-qa-coverage.js` | Old encounter verification/tooling | `test-encounter-token-runtime.js` | 1 | 11 |  |
| `scripts/test-encounter-token-runtime.js` | Old encounter verification/tooling | `encounter-token-runtime.js` | 1 | 6 |  |
| `scripts/test-token-sandbox.js` | Encounter token names | `"Reroll"` | 1 | 1110 |  |
| `scripts/test-token-sandbox.js` | Old encounter result/event bridge | `sourceType: "encounter"` | 2 | 1113, 1114 |  |
| `scripts/test-token-sandbox.js` | Old encounter verification/tooling | `encounter-token-runtime.js` | 1 | 17 |  |
| `scripts/token-qa-coverage-data.js` | Old encounter verification/tooling | `encounter-token-runtime.js` | 1 | 1391 |  |
| `scripts/token-qa-coverage-data.js` | Old encounter verification/tooling | `test-encounter-token-runtime.js` | 1 | 1391 |  |
| `token-effect-contract.js` | Encounter token names | `"Beast Ball"` | 1 | 772 |  |
| `token-effect-contract.js` | Encounter token names | `"Dream Ball Token"` | 1 | 769 |  |
| `token-effect-contract.js` | Encounter token names | `"Extra Encounter Token"` | 1 | 766 |  |
| `token-effect-contract.js` | Encounter token names | `"Honey"` | 1 | 770 |  |
| `token-effect-contract.js` | Encounter token names | `"Master Ball Token"` | 1 | 771 |  |
| `token-effect-contract.js` | Encounter token names | `"Quick Ball Token"` | 1 | 768 |  |
| `token-effect-contract.js` | Encounter token names | `"Repel"` | 1 | 767 |  |
| `token-effect-contract.js` | Encounter token names | `"Reroll"` | 2 | 745, 765 |  |
| `token-effect-contract.js` | Encounter-family contract model | `"wheelWindow"` | 2 | 355, 765 |  |
| `token-effect-contract.js` | Encounter-family contract model | `encounter({` | 8 | 765, 766, 767, 768, 769, 770, 771, 772 |  |
| `token-effect-contract.js` | Encounter-family contract model | `family === "Encounter"` | 1 | 452 | `redirectPolicyReason` |
| `token-effect-contract.js` | Encounter-family contract model | `family: "Encounter"` | 1 | 735 |  |
| `token-effect-contract.js` | Old encounter resolver IDs | `"encounterChoose"` | 2 | 381, 771 |  |
| `token-effect-contract.js` | Old encounter resolver IDs | `"encounterCopy"` | 3 | 380, 770, 818 |  |
| `token-effect-contract.js` | Old encounter resolver IDs | `"encounterGrant"` | 3 | 380, 769, 772 |  |
| `token-effect-contract.js` | Old encounter resolver IDs | `"encounterTransfer"` | 2 | 380, 768 |  |
| `token-effect-contract.js` | Old encounter resolver IDs | `"encounterWheelEdit"` | 2 | 380, 767 |  |
| `token-effect-contract.js` | Old encounter resolver IDs | `"extraEncounter"` | 2 | 380, 766 |  |
| `token-effect-contract.js` | Old encounter result/event bridge | `"encounterBeforeRoll"` | 2 | 355, 407 |  |
| `token-effect-contract.js` | Old encounter result/event bridge | `"encounterResult"` | 11 | 355, 369, 408, 765, 767, 768, 769, 770, 771, 772, 1193 |  |
| `token-effect-contract.js` | Old encounter verification/tooling | `"encounter-token-runtime"` | 4 | 110, 262, 332, 339 |  |

## Current V2 Route token handlers

### `useV2RouteRerollToken` — lines 44798-44807 — refs 2

```js
function useV2RouteRerollToken(actionId, tokenInventoryId = "") {
  try {
    const player = activePlayer();
    const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.reroll)[0]?.id || "";
    const result = v2UseRerollTokenOnAction(actionId, tokenId, { actingPlayerId: player.id });
    v2PersistRenderAndPublishRouteActivity({ stage: "rerolled", actorPlayerId: player.id, seriesId: state.series, routeNumber: result.routeNumber });
  } catch (error) {
    alert(error.message || "Unable to use V2 Reroll Token.");
  }
}
```

### `useV2ExtraEncounter` — lines 44818-44834 — refs 2

```js
function useV2ExtraEncounter(routeNumber, tokenInventoryId = "") {
  try {
    const player = activePlayer();
    const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.extraEncounter)[0]?.id || "";
    const operation = v2UseExtraEncounter(player.id, routeNumber, tokenId);
    const workspace = v2RouteWorkspaceState(state.series);
    workspace.screen = "result";
    workspace.selectedActionId = "extra-encounter";
    workspace.selectedRouteNumber = Number(routeNumber);
    workspace.activeActionId = operation.operationId;
    state.routeUiState = normalizeRouteUiState(state.routeUiState);
    state.routeUiState.activeRouteActionIdBySeriesId[state.series] = operation.operationId;
    v2PersistRenderAndPublishRouteActivity({ stage: "encountered", actorPlayerId: player.id, seriesId: state.series, routeNumber });
  } catch (error) {
    alert(error.message || "Unable to use Extra Encounter.");
  }
}
```

### `applyV2RouteRepel` — lines 44836-44845 — refs 2

```js
function applyV2RouteRepel(routeNumber, battleTierId, tokenInventoryId = "") {
  try {
    const player = activePlayer();
    const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.repel)[0]?.id || "";
    v2ApplyRepelToRoute(player.id, routeNumber, battleTierId, tokenId);
    v2PersistAndRender();
  } catch (error) {
    alert(error.message || "Unable to apply V2 Repel.");
  }
}
```

### `useV2MasterBallOnOpportunity` — lines 44847-44864 — refs 2

```js
function useV2MasterBallOnOpportunity(opportunityId, residentId, tokenInventoryId = "") {
  try {
    const player = activePlayer();
    const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.masterBall)[0]?.id || "";
    const operation = v2UseMasterBallOnOpportunity(player.id, opportunityId, residentId, tokenId);
    const workspace = v2RouteWorkspaceState(state.series);
    workspace.screen = "result";
    workspace.selectedActionId = "encounter";
    workspace.selectedRouteNumber = operation.routeNumber;
    workspace.activeActionId = operation.operationId;
    workspace.activeOpportunityId = "";
    state.routeUiState = normalizeRouteUiState(state.routeUiState);
    state.routeUiState.activeRouteActionIdBySeriesId[state.series] = operation.operationId;
    v2PersistRenderAndPublishRouteActivity({ stage: "encountered", actorPlayerId: player.id, seriesId: state.series, routeNumber: operation.routeNumber });
  } catch (error) {
    alert(error.message || "Unable to use V2 Master Ball.");
  }
}
```


## app.js functions containing old Encounter bridge markers

### `normalizeEffectTargetType` — lines 3192-3208

```js
function normalizeEffectTargetType(value = "") {
  const raw = String(value || "").trim();
  const key = raw.toLowerCase();
  const values = Object.values(EFFECT_TARGET_TYPES);
  if (values.includes(raw)) return raw;
  if (key === "current-prompt") return EFFECT_TARGET_TYPES.CURRENT_PROMPT;
  if (key === "pending-random-result" || key === "pending-result") return EFFECT_TARGET_TYPES.ENCOUNTER_RESULT;
  if (/encounter|random/.test(key)) return EFFECT_TARGET_TYPES.ENCOUNTER_RESULT;
  if (/pokemon/.test(key)) return EFFECT_TARGET_TYPES.POKEMON;
  if (/player/.test(key)) return EFFECT_TARGET_TYPES.PLAYER;
  if (/team/.test(key)) return EFFECT_TARGET_TYPES.TEAM;
  if (/resource|item|token|money|tm/.test(key)) return EFFECT_TARGET_TYPES.RESOURCE;
  if (/table|field|global/.test(key)) return EFFECT_TARGET_TYPES.TABLE;
  if (key === "none") return EFFECT_TARGET_TYPES.NONE;
  if (key === "manual") return EFFECT_TARGET_TYPES.MANUAL;
  return "";
}
```

### `targetCategoryFromEffectBucket` — lines 3263-3272

```js
function targetCategoryFromEffectBucket(targetType = "", targetScope = "") {
  if (targetType === EFFECT_TARGET_TYPES.POKEMON) return EFFECT_TARGET_CATEGORIES.POKEMON;
  if (targetType === EFFECT_TARGET_TYPES.ENCOUNTER_RESULT) return EFFECT_TARGET_CATEGORIES.ENCOUNTER_RESULT;
  if (targetType === EFFECT_TARGET_TYPES.PLAYER) return EFFECT_TARGET_CATEGORIES.PLAYER;
  if (targetType === EFFECT_TARGET_TYPES.RESOURCE) return EFFECT_TARGET_CATEGORIES.TOKEN;
  if (targetType === EFFECT_TARGET_TYPES.TABLE || targetType === EFFECT_TARGET_TYPES.TEAM) return EFFECT_TARGET_CATEGORIES.WHOLE_TABLE;
  if (targetType === EFFECT_TARGET_TYPES.CURRENT_PROMPT) return EFFECT_TARGET_CATEGORIES.MANUAL;
  if (targetScope === EFFECT_TARGET_SCOPES.TABLE_WIDE) return EFFECT_TARGET_CATEGORIES.WHOLE_TABLE;
  return EFFECT_TARGET_CATEGORIES.MANUAL;
}
```

### `buildRivalSagaPokemonTierMap` — lines 16725-40003

```js
function buildRivalSagaPokemonTierMap() {
  const entries = {};
  Object.entries(rawRivalSagaPokemonTierList).forEach(([tierId, rawList]) => {
    const prepared = rawList
      .replace(/([A-Za-z0-9.'%-]+)\s+\(([^)]+)\)(?:\[([^\]]+)\])?/g, (_, name, note, bracketNote) => `${name}{note:${[note, bracketNote].filter(Boolean).join(" / ")}}`)
      .replace(/\{[^}]+\}/g, (block) => block.replace(/\s+/g, "_"))
      .replace(/\s+/g, " ")
      .trim();
    prepared.split(" ").filter(Boolean).forEach((token) => {
      const metadata = parseTierEntryToken(token, tierId);
      const key = normalizePokemonName(metadata.displayName) || metadata.displayName.toLowerCase().replace(/\s+/g, "-");
      if (!key) return;
      entries[key] = { ...(entries[key] || {}), ...metadata };
    });
  });
  return Object.freeze(entries);
}

const rivalSagaPokemonTierMap = buildRivalSagaPokemonTierMap();

const gameCornerTokenDefinitions = Object.freeze([
  {
    id: "safari-gc-ticket",
    name: "Safari Ticket",
    tokenType: "game-corner",
    type: "TICKET",
    gameCornerTier: "Safari",
    gameCornerTierId: "safari",
    description: "Ticket used to unlock a Safari Battle Tier Pokémon reward at the Game Corner."
  },
  {
    id: "poke-gc-ticket",
    name: "Poké Ticket",
    tokenType: "game-corner",
    type: "TICKET",
    gameCornerTier: "Poké",
    gameCornerTierId: "poke",
    description: "Ticket used to unlock a Poké or Poké Elite Battle Tier Pokémon reward at the Game Corner."
  },
  {
    id: "great-gc-ticket",
    name: "Great Ticket",
    tokenType: "game-corner",
    type: "TICKET",
    gameCornerTier: "Great",
    gameCornerTierId: "great",
    description: "Ticket used to unlock a Great or Great Elite Battle Tier Pokémon reward at the Game Corner."
  },
  {
    id: "ultra-gc-ticket",
    name: "Ultra Ticket",
    tokenType: "game-corner",
    type: "TICKET",
    gameCornerTier: "Ultra",
    gameCornerTierId: "ultra",
    description: "Ticket used to unlock an Ultra or Ultra Elite Battle Tier Pokémon reward at the Game Corner."
  },
  {
    id: "master-gc-ticket",
    name: "Master Ticket",
    tokenType: "game-corner",
    type: "TICKET",
    gameCornerTier: "Master",
    gameCornerTierId: "master",
    description: "Ticket used to unlock a Master or Master Elite Battle Tier Pokémon reward at the Game Corner."
  }
]);
const gameCornerTokenDefinitionByTierId = new Map(gameCornerTokenDefinitions
  .map((definition) => [definition.gameCornerTierId, definition]));

const spriteAliasMap = Object.freeze({
  "basculegion": "basculegion-male",
  "basculegion-red": "basculegion-male",
  "basculegion-blue": "basculegion-female",
  "basculin-redblue": "basculin",
  "basculin-bluered": "basculin",
  "basculin-white-stripe": "basculin",
  "basculin-white-striped": "basculin",
  "brute-bonnet": "brute-bonnet",
  "calyrex-ice": "calyrex-ice-rider",
  "calyrex-icerider": "calyrex-ice-rider",
  "calyrex-shadow": "calyrex-shadow-rider",
  "calyrex-shadowrider": "calyrex-shadow-rider",
  "darmanitan-galar": "darmanitan-galar-standard",
  "darmanitan-galarian-form": "darmanitan-galar-standard",
  "darmanitan-galar-zen": "darmanitan-galar-standard",
  "farfetchd-g": "farfetchd-galar",
  "ponyta-g": "ponyta-galar",
  "geodude-a": "geodude-alola",
  "voltorb-h": "voltorb-hisui",
  "stunfisk-g": "stunfisk-galar",
  "sandshrew-a": "sandshrew-alola",
  "rattata-a": "rattata-alola",
  "meowth-a": "meowth-alola",
  "meowth-g": "meowth-galar",
  "qwilfish-h": "qwilfish-hisui",
  "yamask-g": "yamask-galar",
  "wooper-p": "wooper-paldea",
  "diglett-a": "diglett-alola",
  "grimer-a": "grimer-alola",
// ... 23079 lines omitted ...
    undoData: {
      actionType: "undoBreederDeposit",
      visitId: visit.id,
      playerId: player.id,
      pokemonId: pokemon.id,
      breederDepositId: deposit.id,
      previousVisits: structuredClone(visit.breederUndoSnapshot.previousVisits || []),
      previousBalance: Number(visit.breederUndoSnapshot.previousBalance ?? player.balance ?? 0),
      previousMoneyLedger: structuredClone(visit.breederUndoSnapshot.previousMoneyLedger || []),
      previousPlayerNotifications: structuredClone(visit.breederUndoSnapshot.previousPlayerNotifications || []),
      previousBreederDeposits: structuredClone(visit.breederUndoSnapshot.previousBreederDeposits || []),
      previousPokemonRecords: structuredClone(visit.breederUndoSnapshot.previousPokemonRecords || []),
      series: state.series,
      gym: Number(state.gym)
    }
  });
  saveState();
  render();
}

function pickupPokemonFromBreeder(depositId) {
  const player = activePlayer();
  const deposit = activeBreederDeposits(player.id).find((entry) => entry.id === depositId);
  if (!deposit) return;
  if (!breederPickupEligible(deposit)) {
    alert(`${deposit.pokemonName} is available after this gym.`);
    return;
  }
  const visitResult = ensureBreederVisit(player, "Pickup Pokemon");
  if (!visitResult) return;
  const { visit, isNewVisit } = visitResult;
  const pokemon = (state.pokemonRecords || []).find((record) => record.id === deposit.pokemonId && record.trainerId === player.id);
  deposit.status = "picked-up";
  deposit.pickedUpAt = new Date().toISOString();
  deposit.pickupActionVisitId = visit.id;
  visit.pickedUpPokemonIds ||= [];
  visit.pickedUpPokemonIds.push(deposit.pokemonId);
  const levelBuff = breederLevelBuffLabel(deposit);
  if (pokemon) {
    pokemon.breederStatus = null;
    pokemon.buffs = [...new Set([...(pokemon.buffs || []).filter((buff) => !/^\+\d+\s+Levels$/i.test(String(buff)) && buff !== "TM Move Pending"), levelBuff, "TM Move Pending"])];
    // TODO: Validate the chosen Daycare TM Move against this Pokemon's learnable
    // TM list when the TM learnset validator is wired into notifications.
    createPlayerNotification({
      playerId: player.id,
      type: "daycare-tm-move",
      title: "Choose TM Move",
      message: `${pokemon.name} returned from Daycare. Choose its TM Move.`,
      sourceType: "daycare",
      sourceId: deposit.id,
      pokemonId: pokemon.id,
      priority: 2,
      payload: { pokemonName: pokemon.name, choiceType: "tm-move", actionVisitId: visit.id, breederDepositId: deposit.id }
    });
    addPokemonLog(pokemon, "Picked up from Daycare", `${levelBuff} permanent; TM Move pending`);
  }
  addLogEntry({
    action: "phase",
    category: "action",
    player: player.name,
    item: `${player.name} picked up ${deposit.pokemonName} from Daycare`,
    title: `${player.name} used Daycare`,
    summary: `${isNewVisit ? "Spent 1 Action at Daycare" : "Used current Daycare visit"}\nPicked up ${deposit.pokemonName} from Daycare\nRewards permanent: ${levelBuff}\nPending Decision: Choose TM Move`,
    details: [
      isNewVisit ? "Spent 1 Action at Daycare" : "Used current Daycare visit",
      `Picked up ${deposit.pokemonName} from Daycare`,
      `Rewards permanent: ${levelBuff}`,
      "Pending Decision: Choose TM Move"
    ],
    type: "breeder-pickup",
    categories: ["action", "pokemon"],
    tags: ["daycare"],
    playerIds: [player.id],
    pokemonIds: [deposit.pokemonId],
    pokemonNames: [deposit.pokemonName],
    actionVisitId: visit.id,
    visitId: visit.id,
    breederDepositId: deposit.id,
    undoable: true,
    undone: false,
    undoData: {
      actionType: "undoBreederDeposit",
      visitId: visit.id,
      playerId: player.id,
      pokemonId: deposit.pokemonId,
      breederDepositId: deposit.id,
      previousVisits: structuredClone(visit.breederUndoSnapshot.previousVisits || []),
      previousBalance: Number(visit.breederUndoSnapshot.previousBalance ?? player.balance ?? 0),
      previousMoneyLedger: structuredClone(visit.breederUndoSnapshot.previousMoneyLedger || []),
      previousPlayerNotifications: structuredClone(visit.breederUndoSnapshot.previousPlayerNotifications || []),
      previousBreederDeposits: structuredClone(visit.breederUndoSnapshot.previousBreederDeposits || []),
      previousPokemonRecords: structuredClone(visit.breederUndoSnapshot.previousPokemonRecords || []),
      series: state.series,
      gym: Number(state.gym)
    }
  });
  syncPlayerPokemonLists();
  saveState();
  render();
}
```

### `createPokemonResultTimingWindow` — lines 23147-23176

```js
function createPokemonResultTimingWindow(session, player) {
  if (!session || session.interactionEventId || !player) return null;
  const resultName = session.resultDisplayName || session.resultPokemonName || "Pokemon result";
  const isEncounter = session.sourceType === "encounter";
  const activity = createInteractionEvent({
    type: isEncounter ? "encounter-result" : "pokemon-result",
    title: `${player.name} rolled ${resultName}`,
    message: `${session.sourceLabel || "Pokemon result"} is pending before it resolves.`,
    actorPlayerId: player.id,
    targetPlayerId: player.id,
    sourceType: session.sourceType || "random-pokemon",
    sourceId: session.id,
    responseTypes: ["encounter-reroll", "steal-encounter"],
    eligiblePlayerIds: state.players.map((entry) => entry.id),
    series: session.series || state.series,
    gym: Number(session.gym || state.gym),
    phase: session.phase || currentPhase(),
    payload: {
      randomPokemonSessionId: session.id,
      gameCornerSessionId: session.gameCornerSessionId || "",
      actionVisitId: session.actionVisitId || "",
      encounterSessionId: session.encounterSessionId || "",
      encounterRollId: session.encounterRollId || "",
      resultName,
      sourceLabel: session.sourceLabel || ""
    }
  });
  session.interactionEventId = activity.id;
  return activity;
}
```

### `liveActivityTimingCategory` — lines 25514-25521

```js
function liveActivityTimingCategory(activity) {
  if (!activity) return "";
  if (activity.payload?.tokenTimingCategory) return tokenTimingCategoryFromRaw(activity.payload.tokenTimingCategory);
  if (activity.type === TOKEN_PENDING_EVENT_TYPES.CONTROL_TOKEN) return TOKEN_TIMING_CATEGORIES.CONTROL;
  if (activity.type === TOKEN_PENDING_EVENT_TYPES.CURSE_TOKEN) return TOKEN_TIMING_CATEGORIES.CURSE;
  if (activity.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT || activity.type === "encounter-result") return TOKEN_TIMING_CATEGORIES.ENCOUNTER;
  return "";
}
```

### `liveTokenPromptDetails` — lines 25523-25581

```js
function liveTokenPromptDetails(activity, resultSession = null, targetState = state) {
  const category = liveActivityTimingCategory(activity);
  const actor = targetState.players.find((player) => player.id === activity?.actorPlayerId);
  const target = targetState.players.find((player) => player.id === activity?.targetPlayerId);
  const tokenName = activity?.payload?.tokenName || activity?.sourceId || "Token";
  const targetText = activity?.payload?.targetText || activity?.payload?.targetPlayerName || target?.name || "the target";
  const teamLockText = activity?.payload?.teamLock
    ? " This is happening during Sabotage. Submitted teams are locked before Team Preview."
    : "";
  if (resultSession || activity?.type === "encounter-result" || activity?.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT) {
    const resultOwnerId = resultSession?.resultOwnerPlayerId || resultSession?.ownerPlayerId || resultSession?.playerId || activity?.actorPlayerId || "";
    const resultOwner = targetState.players.find((player) => player.id === resultOwnerId);
    const resultName = resultSession?.resultDisplayName || activity?.payload?.resultName || "an encounter";
    return {
      type: "encounter-result-pending",
      statusLabel: "Waiting to Resolve",
      title: "Encounter Result Pending",
      body: `${resultOwner?.name || actor?.name || "A player"} rolled ${resultName}. Encounter modifiers, rerolls, responses, and trades may happen before this result is finalized.`,
      helperText: "Use Encounter Tokens during this window, trade, record No Response, then finalize the result."
    };
  }
  if (category === TOKEN_TIMING_CATEGORIES.CONTROL) {
    return {
      type: "control-token-pending",
      statusLabel: "Control Token Pending",
      title: "Control Token Pending",
      body: `${actor?.name || "A player"} used ${tokenName} targeting ${targetText}. Protection responses and trades may happen before this resolves.`,
      helperText: "Record protection responses, trades, or No Response. Finalize only when the table is ready to resolve the token."
    };
  }
  if (category === TOKEN_TIMING_CATEGORIES.CURSE) {
    return {
      type: "curse-token-pending",
      statusLabel: "Curse Pending",
      title: "Curse Pending",
      body: `${actor?.name || "A player"} used ${tokenName} targeting ${targetText}. Protection or cleanse effects may happen before this resolves.${teamLockText}`,
      helperText: `If this curse resolves and the target is valid for Battle Phase, the curse applies according to its effect.${teamLockText}`
    };
  }
  if (activity?.type === TOKEN_PENDING_EVENT_TYPES.TEAM_LOCK_WINDOW) {
    return {
      type: "sabotage-pending",
      statusLabel: "Sabotage",
      title: activity.title || "Sabotage Window",
      body: activity.message || "Sabotage is open. Submitted teams are locked before Team Preview.",
      helperText: "Use this window for final pre-preview responses, trades, or No Response before teams are considered locked."
    };
  }
  if (activity?.type === TOKEN_PENDING_EVENT_TYPES.MANUAL_EVENT || activity?.type === "manual-event") {
    return {
      type: "manual-event-pending",
      statusLabel: "Manual Event",
      title: activity.title || "Manual Event Pending",
      body: activity.message || "This manual event is pending before it resolves.",
      helperText: "Use this table window to record responses, trades, or No Response before finalizing."
    };
  }
  return null;
}
```

### `getCurrentLivePrompt` — lines 26151-26293

```js
function getCurrentLivePrompt(targetState = state) {
  const pendingEvent = getCurrentPendingEvent(targetState);
  const phase = currentPhase();
  const flowMode = liveGameflowMode();
  if (pendingEvent) {
    const resultSession = liveResultSessionForActivity(pendingEvent, targetState);
    const promptChain = interactionPromptChain(pendingEvent);
    const currentPromptStep = currentInteractionPromptStep(pendingEvent);
    const respondingToPromptStep = parentInteractionPromptStep(pendingEvent, currentPromptStep);
    const playerIds = livePromptPlayerIds(pendingEvent, currentPromptStep, targetState);
    const resultOwnerId = resultSession?.resultOwnerPlayerId || resultSession?.ownerPlayerId || resultSession?.playerId || "";
    const resultOwner = targetState.players.find((player) => player.id === resultOwnerId);
    const resultName = resultSession?.resultDisplayName || pendingEvent.payload?.resultName || "";
    const sourceLabel = resultSession?.sourceLabel || pendingEvent.payload?.sourceLabel || pendingEvent.sourceType || "Event";
    const isEncounterResult = Boolean(resultSession?.sourceType === "encounter" || pendingEvent.type === "encounter-result");
    const tokenPrompt = liveTokenPromptDetails(pendingEvent, resultSession, targetState);
    const promptDisplay = liveCurrentPromptDetails(pendingEvent, tokenPrompt, currentPromptStep, respondingToPromptStep);
    if (resultSession) {
      return {
        id: `live-${pendingEvent.id}`,
        type: tokenPrompt?.type || (isEncounterResult ? "encounter-result-pending" : "pokemon-result-pending"),
        statusLabel: promptDisplay.statusLabel || "Waiting to Resolve",
        title: promptDisplay.title || (resultName ? `${resultOwner?.name || "A player"} rolled ${resultName}` : pendingEvent.title || "Pokemon result pending"),
        body: promptDisplay.body || `${resultName || "This Pokemon result"} from ${sourceLabel} is waiting to resolve.`,
        helperText: promptDisplay.helperText || "Before accepting it, players may use a legal response, trade, or choose No Response.",
        phase: pendingEvent.phase || phase,
        gameflowMode: flowMode,
        currentActorPlayerId: currentPromptStep.actorPlayerId || resultOwnerId || pendingEvent.actorPlayerId || pendingEvent.targetPlayerId || "",
        activePlayerIds: [currentPromptStep.actorPlayerId || resultOwnerId || pendingEvent.actorPlayerId].filter(Boolean),
        requiredPlayerIds: playerIds.eligiblePlayerIds,
        waitingOnPlayerIds: playerIds.waitingOnPlayerIds,
        passedPlayerIds: playerIds.passedPlayerIds,
        respondedPlayerIds: playerIds.respondedPlayerIds,
        currentPriorityPlayerId: playerIds.currentPriorityPlayerId,
        priorityOrderPlayerIds: playerIds.priorityOrderPlayerIds,
        priorityComplete: playerIds.priorityComplete,
        currentPromptId: playerIds.currentPromptId,
        currentPendingEventId: pendingEvent.id,
        currentBatchId: "",
        responsesAllowed: activityResponsesAllowed(pendingEvent),
        transactionsAllowed: activityTransactionsAllowed(pendingEvent),
        canAdvance: true,
        availableActions: ["acceptResult", "reroll", "useResponse", "makeTransaction", "pass", "finalizeEvent"],
        pendingEvent,
        currentPromptStep,
        respondingToPromptStep,
        promptChain,
        resultSession,
        resultName,
        sourceLabel
      };
    }
    const promptDetails = tokenPrompt || liveTokenPromptDetails(pendingEvent, null, targetState);
    const standardPromptDisplay = liveCurrentPromptDetails(pendingEvent, promptDetails, currentPromptStep, respondingToPromptStep);
    return {
      id: `live-${pendingEvent.id}`,
      type: promptDetails?.type || "pending-event",
      statusLabel: standardPromptDisplay.statusLabel || "Waiting to Resolve",
      title: standardPromptDisplay.title || pendingEvent.title || "Pending event",
      body: standardPromptDisplay.body || pendingEvent.message || "This event is pending before it resolves.",
      helperText: standardPromptDisplay.helperText || "Pause here until eligible players respond, trade, or choose No Response.",
      phase: pendingEvent.phase || phase,
      gameflowMode: flowMode,
      currentActorPlayerId: currentPromptStep.actorPlayerId || pendingEvent.actorPlayerId || pendingEvent.targetPlayerId || "",
      activePlayerIds: [currentPromptStep.actorPlayerId || pendingEvent.actorPlayerId].filter(Boolean),
      requiredPlayerIds: playerIds.eligiblePlayerIds,
      waitingOnPlayerIds: playerIds.waitingOnPlayerIds,
      passedPlayerIds: playerIds.passedPlayerIds,
      respondedPlayerIds: playerIds.respondedPlayerIds,
      currentPriorityPlayerId: playerIds.currentPriorityPlayerId,
      priorityOrderPlayerIds: playerIds.priorityOrderPlayerIds,
      priorityComplete: playerIds.priorityComplete,
      currentPromptId: playerIds.currentPromptId,
      currentPendingEventId: pendingEvent.id,
      currentBatchId: "",
      responsesAllowed: activityResponsesAllowed(pendingEvent),
      transactionsAllowed: activityTransactionsAllowed(pendingEvent),
      canAdvance: true,
      availableActions: ["useResponse", "makeTransaction", "pass", "finalizeEvent"],
      pendingEvent,
      currentPromptStep,
      respondingToPromptStep,
      promptChain
    };
  }

  if (phase === "action") {
    const turn = actionTurnInfo();
    const currentActor = targetState.players.find((player) => player.id === turn.currentPlayerId);
    return {
      id: turn.currentPlayerId ? `live-action-${turn.currentPlayerId}` : "live-action-complete",
      type: "action-turn",
      statusLabel: turn.resolving ? "Action Resolving" : "No Pending Event",
      title: turn.allComplete ? "Action Phase Complete" : turn.resolving
        ? `${currentActor?.name || "Current player"} is resolving their Action`
        : `Waiting on ${currentActor?.name || "current player"}`,
      body: turn.allComplete
        ? "All Action Phase actions are spent. Advance when the table is ready."
        : turn.resolving
          ? `Action ${turn.operation?.actionNumber || actionUsedByPlayer(turn.currentPlayerId)} at ${turn.operation?.locationName || "the selected location"} is committed and still resolving.`
          : `Waiting on ${currentActor?.name || "the current player"} to choose Action ${Math.min(actionPhaseRules.actionsPerPlayer, actionUsedByPlayer(turn.currentPlayerId) + 1)}.`,
      helperText: "Nothing is pending yet. When an action creates something respondable, create a manual event or use the advanced controls.",
      phase,
      gameflowMode: flowMode,
      currentActorPlayerId: turn.currentPlayerId || "",
      activePlayerIds: [turn.currentPlayerId].filter(Boolean),
      requiredPlayerIds: [turn.currentPlayerId].filter(Boolean),
      waitingOnPlayerIds: [turn.currentPlayerId].filter(Boolean),
      passedPlayerIds: [],
      respondedPlayerIds: [],
      currentPendingEventId: "",
      currentBatchId: "",
      responsesAllowed: false,
      transactionsAllowed: false,
      canAdvance: turn.allComplete,
      availableActions: ["goToActionPhase", "manualPendingEvent", "openTimingControls"],
      turn
    };
  }

  return {
    id: `live-${phase}`,
    type: "phase-control",
    statusLabel: "No Pending Event",
    title: `${phaseLabels[phase] || "Current phase"} is active`,
    body: "Continue the current phase, or open a manual event if something needs responses before resolving.",
    helperText: "Create a manual event when the table needs to pause before something resolves.",
    phase,
    gameflowMode: flowMode,
    currentActorPlayerId: "",
    activePlayerIds: [],
    requiredPlayerIds: [],
    waitingOnPlayerIds: [],
    passedPlayerIds: [],
    respondedPlayerIds: [],
    currentPendingEventId: "",
    currentBatchId: "",
    responsesAllowed: false,
    transactionsAllowed: false,
    canAdvance: true,
    availableActions: ["openTimingControls", "manualPendingEvent", "advancePhase"]
  };
}
```

### `liveManualEventTypeOptions` — lines 26397-26409

```js
function liveManualEventTypeOptions(selected = "manual-event") {
  const options = [
    ["manual-event", "Manual"],
    ["class-effect", "Class Effect"],
    [TOKEN_PENDING_EVENT_TYPES.CONTROL_TOKEN, "Control Token"],
    [TOKEN_PENDING_EVENT_TYPES.CURSE_TOKEN, "Curse"],
    [TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT, "Encounter"],
    [TOKEN_PENDING_EVENT_TYPES.PROTECTION_RESPONSE, "Protection / Response Note"],
    ["item-effect", "Item"],
    ["other", "Other"]
  ];
  return options.map(([value, label]) => `<option value="${escapeHtml(value)}" ${value === selected ? "selected" : ""}>${escapeHtml(label)}</option>`).join("");
}
```

### `liveTimingWindowOptions` — lines 26411-26421

```js
function liveTimingWindowOptions(selected = "normal") {
  const options = [
    ["normal", "Normal"],
    [TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT, "Encounter Result"],
    [TOKEN_PENDING_EVENT_TYPES.TEAM_LOCK_WINDOW, "Sabotage"],
    ["team-preview", "Team Preview"],
    ["battle-phase", "Battle Phase"],
    ["other", "Other"]
  ];
  return options.map(([value, label]) => `<option value="${escapeHtml(value)}" ${value === selected ? "selected" : ""}>${escapeHtml(label)}</option>`).join("");
}
```

### `createLiveManualEventFromForm` — lines 27117-27181

```js
function createLiveManualEventFromForm(form) {
  const actorPlayerId = liveReadFormField(form, '[data-live-manual-field="actorPlayerId"]') || activePlayer().id;
  const actor = state.players.find((player) => player.id === actorPlayerId) || activePlayer();
  const eventType = liveReadFormField(form, '[data-live-manual-field="eventType"]') || "manual-event";
  const timingWindow = liveReadFormField(form, '[data-live-manual-field="timingWindow"]') || "normal";
  const source = liveReadFormField(form, '[data-live-manual-field="source"]') || "manual";
  const targetPlayerId = liveReadFormField(form, '[data-live-manual-field="targetPlayerId"]');
  const target = state.players.find((player) => player.id === targetPlayerId);
  const title = liveReadFormField(form, '[data-live-manual-field="title"]').trim();
  const message = liveReadFormField(form, '[data-live-manual-field="message"]').trim();
  const targetText = liveReadFormField(form, '[data-live-manual-field="targetText"]').trim();
  const responseType = liveReadFormField(form, '[data-live-manual-field="responseType"]');
  const effectApplication = liveReadFormField(form, '[data-live-manual-field="effectApplication"]') || "manual";
  const responsesAllowed = liveReadFormField(form, '[data-live-manual-field="responsesAllowed"]', { checkbox: true });
  const transactionsAllowed = liveReadFormField(form, '[data-live-manual-field="transactionsAllowed"]', { checkbox: true });
  if (!title) {
    alert("Name the pending event before creating it.");
    return null;
  }
  const finalEventType = timingWindow === TOKEN_PENDING_EVENT_TYPES.TEAM_LOCK_WINDOW
    ? TOKEN_PENDING_EVENT_TYPES.TEAM_LOCK_WINDOW
    : timingWindow === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT
      ? TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT
      : eventType;
  const activity = createInteractionEvent({
    type: finalEventType,
    title,
    message: message || `${title} is pending.`,
    actorPlayerId: actor.id,
    targetPlayerId: target?.id || "",
    sourceType: source,
    responseTypes: responseType ? [responseType] : [],
    eligiblePlayerIds: responsesAllowed ? state.players.map((player) => player.id) : [],
    payload: {
      liveTable: true,
      responsesAllowed,
      transactionsAllowed,
      eventType,
      timingWindow,
      effectApplication,
      source,
      targetText,
      targetPlayerName: target?.name || "",
      teamLock: timingWindow === TOKEN_PENDING_EVENT_TYPES.TEAM_LOCK_WINDOW
    }
  });
  addLogEntry({
    action: "interaction",
    category: "system",
    player: actor.name,
    item: `Live Table opened pending event: ${title}`,
    title: "Manual event opened",
    summary: [`Pending event: ${title}`, message || "Manual response window", targetText ? `Target: ${targetText}` : ""].filter(Boolean),
    type: "interaction-created",
    categories: ["system", "interaction"],
    tags: ["live-table", "timing-window", source, finalEventType, timingWindow, effectApplication],
    playerIds: state.players.map((player) => player.id),
    linkedEventId: activity.id,
    eventOrder: activity.eventOrder
  });
  state.liveTable = normalizeLiveTableState({ ...(state.liveTable || {}), currentPendingEventId: activity.id });
  saveState({ immediate: true });
  render();
  return activity;
}
```

### `currentEncounterPendingActivity` — lines 27590-27597

```js
function currentEncounterPendingActivity() {
  const activity = getCurrentPendingEvent();
  if (!activity || activity.status !== "open") return null;
  const session = liveResultSessionForActivity(activity);
  if (activity.type === "encounter-result" || activity.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT) return activity;
  if (session?.sourceType === "encounter") return activity;
  return null;
}
```

### `liveRefereePromptIsEncounterResult` — lines 28008-28014

```js
function liveRefereePromptIsEncounterResult(prompt) {
  const activity = prompt?.pendingEvent;
  return Boolean(prompt?.resultSession
    || activity?.type === "encounter-result"
    || activity?.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT
    || liveResultSessionForActivity(activity));
}
```

### `launchTokenScenarioSandbox` — lines 46879-47013

```js
async function launchTokenScenarioSandbox() {
  if (tokenScenarioSandboxActive()) {
    alert("Discard or commit the active test sandbox before launching another scenario.");
    return;
  }
  const kind = els.adminTokenScenarioKind?.value || "normalControl";
  const contract = globalThis.rivalSagaTokenEffectContract;
  const requestedTokenId = els.adminTokenScenarioToken?.value || "restrict-token";
  const tokenDefinition = contract?.definitionFor?.(requestedTokenId)
    || contract?.definitionFor?.("restrict-token")
    || contract?.list?.[0]
    || null;
  if (!tokenDefinition) {
    const message = "Token definitions are unavailable. Reload the site before launching a Token scenario.";
    if (els.adminTokenScenarioStatus) els.adminTokenScenarioStatus.textContent = message;
    alert(message);
    return;
  }
  if (els.adminLaunchTokenScenario) els.adminLaunchTokenScenario.disabled = true;
  if (els.adminTokenScenarioStatus) els.adminTokenScenarioStatus.textContent = "Preparing an isolated sandbox and verifying the real-state revision...";
  const entry = await prepareTokenScenarioSandboxEntry();
  state = entry.state;
  const preActor = tokenScenarioPlayer(els.adminTokenScenarioActor?.value);
  const preTarget = tokenScenarioPlayer(els.adminTokenScenarioTarget?.value, state.players.find((player) => player.id !== preActor.id) || preActor);
  const preControlled = tokenScenarioControlledPlayer(kind, preActor, preTarget);
  tokenScenarioClientUiBaseline = clientLocalStateSnapshot(state);
  const sandboxEntry = tokenScenarioSandbox.enter({
    realState: state,
    revision: entry.revision,
    revisionVerified: entry.revisionVerified,
    persistenceQuiescent: entry.persistenceQuiescent,
    scenarioName: TOKEN_SCENARIO_LABELS[kind] || kind,
    controlledPlayerId: preControlled.id,
    controlledPlayerName: preControlled.name
  });
  state = normalizeState(sandboxEntry.workingState);
  tokenScenarioSandbox.setWorkingState(state);
  const suppressedInteractionEventIds = (state.interactionEvents || [])
    .filter((event) => event.status === "open")
    .map((event) => event.id)
    .filter(Boolean);
  state.liveTable = normalizeLiveTableState({ ...(state.liveTable || {}), currentPendingEventId: "", resolutionAnnouncements: [] });
  const actor = tokenScenarioPlayer(els.adminTokenScenarioActor?.value);
  const target = tokenScenarioPlayer(els.adminTokenScenarioTarget?.value, state.players.find((player) => player.id !== actor.id) || actor);
  const controlledPlayer = tokenScenarioControlledPlayer(kind, actor, target);
  state.activePlayerId = actor.id;
  setTestingToolsState({
    freeMode: true,
    controlledPlayerId: controlledPlayer.id,
    activeScenario: {
      id: `token-scenario-${Date.now()}`,
      sandboxSessionId: tokenScenarioSandbox.info()?.id || "",
      kind,
      label: TOKEN_SCENARIO_LABELS[kind] || kind,
      tokenId: tokenDefinition?.id || "",
      suppressedInteractionEventIds,
      testData: true,
      launchedAt: new Date().toISOString()
    }
  });
  const possessions = els.adminTokenScenarioPossessions?.value || "selected";
  if (possessions !== "none") grantTokenScenarioInventory(actor, tokenDefinition ? [tokenDefinition] : []);
  if (possessions === "responses" || possessions === "all" || kind === "severalResponses") {
    const responseDefinitions = (contract?.list || []).filter((definition) => definition.family === "Protection" || definition.id === "reroll-token");
    state.players.forEach((player) => grantTokenScenarioInventory(player, possessions === "all" ? contract.list : responseDefinitions));
  }
  addTokenScenarioPersistentEffect(els.adminTokenScenarioPersistent?.value || "none", actor, target);

  if (["actionActor", "normalControl", "targetedResponse", "nonTargetedResponse", "nestedResponse", "encounterBefore", "encounterResult", "wheelManual", "fieldActive", "lingeringActive", "expiring", "invalidTarget", "insufficientMoney", "severalResponses"].includes(kind)) {
    setTokenScenarioPhase("action");
  }
  if (kind === "teamBuilding") setTokenScenarioPhase("battle", "teamPreparation");
  if (kind === "teamLock") setTokenScenarioPhase("battle", "teamSubmissionLock");
  if (kind === "sabotage") setTokenScenarioPhase("battle", "sabotage");
  if (kind === "teamPreview") setTokenScenarioPhase("battle", "teamPreview");
  if (kind === "rivalBattle") setTokenScenarioPhase("battle", "rivalBattles");
  if (kind === "insufficientMoney") actor.balance = 0;
  if (kind === "fieldActive") addTokenScenarioPersistentEffect("field", actor, target);
  if (kind === "lingeringActive") addTokenScenarioPersistentEffect("safeguard", actor, target);
  if (kind === "expiring") {
    const statusId = addTokenScenarioPersistentEffect("restrict", actor, target);
    const status = (state.lingeringStatuses || []).find((entry) => entry.id === statusId);
    if (status) {
      status.expiresAtSeries = state.series;
      status.expiresAtGym = Number(state.gym);
      status.note = "Expires at the next matching expiration check.";
    }
  }

  let activity = null;
  if (kind === "targetedResponse" || kind === "severalResponses") {
    activity = createTokenScenarioEvent({ actor, target, title: `${actor.name} targeted ${target.name}.`, message: `${actor.name} used a test effect on ${target.name}.`, targeted: true });
  } else if (kind === "nonTargetedResponse") {
    activity = createTokenScenarioEvent({ actor, target, title: `${actor.name} changed the table.`, message: `${actor.name} used a non-targeted table effect.`, targeted: false });
  } else if (kind === "nestedResponse") {
    activity = createTokenScenarioEvent({ actor, target, tokenDefinition, title: `${actor.name} used ${tokenDefinition.name}.`, message: `${actor.name} used ${tokenDefinition.name} on ${target.name}.`, type: TOKEN_PENDING_EVENT_TYPES.CONTROL_TOKEN, sourceType: "scenario-test", targeted: true });
    const responder = target;
    addInteractionResponse(activity.id, {
      type: "immunity",
      playerId: responder.id,
      respondingToPromptId: interactionRootPromptId(activity),
      source: "token",
      status: "recorded",
      tokenName: "Immunity",
      tokenId: "scenario-immunity",
      note: `${responder.name} used Immunity in the scenario.`
    });
  } else if (kind === "encounterBefore") {
    activity = createTokenScenarioEvent({ actor, target, title: `${actor.name}'s encounter is about to begin.`, message: "Choose before-roll Encounter effects now.", type: "encounter-before-roll", targeted: false, payload: { encounterStage: "beforeRoll" } });
  } else if (kind === "encounterResult") {
    activity = createTokenScenarioEvent({ actor, target, title: `${actor.name} rolled Abra.`, message: `${actor.name} rolled Abra. The result is pending.`, type: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT, targeted: false, payload: { encounterStage: "result", resultName: "Abra" } });
  } else if (kind === "wheelManual") {
    const guided = (contract?.list || []).find((definition) => definition.resolverMode === EFFECT_RESOLUTION_MODES.GUIDED) || tokenDefinition;
    activity = createTokenScenarioEvent({ actor, target, tokenDefinition: guided, title: `${actor.name} used ${guided.name}.`, message: `${guided.name} is waiting for its guided result.`, type: TOKEN_PENDING_EVENT_TYPES.CONTROL_TOKEN, sourceType: "token-use", targeted: guided.targetScope !== "tableWide" });
  } else if (kind === "invalidTarget") {
    activity = createTokenScenarioEvent({ actor, target, tokenDefinition, title: `${actor.name} used ${tokenDefinition.name} with a missing target.`, message: "This scenario tests resolution revalidation.", type: TOKEN_PENDING_EVENT_TYPES.CONTROL_TOKEN, sourceType: "token-use", targeted: false });
    activity.payload.targetPokemonId = "missing-scenario-target";
    activity.payload.targetPokemonName = "";
    activity.payload.targetText = "";
  }

  resetLiveRefereeScreenState();
  state.liveRefereeCollapsed = false;
  state.liveRefereeWindowMode = "floating";
  render();
  openAdminTools();
  syncAdminRepairControls();
  syncTokenSandboxBanner();
  if (els.adminTokenScenarioStatus) {
    const info = tokenScenarioSandbox.info();
    els.adminTokenScenarioStatus.textContent = info.revisionVerified
      ? `Sandbox active at real revision ${info.entryRevision}. Changes are isolated until commit.`
      : "Sandbox active. The backend revision could not be verified, so commit is disabled; discard remains safe.";
  }
}
```

### `createAdminTestEvent` — lines 47508-47588

```js
function createAdminTestEvent(kind = "") {
  const actor = activePlayer();
  const target = state.players.find((player) => player.id !== actor.id) || actor;
  const common = {
    actorPlayerId: actor.id,
    targetPlayerId: target.id,
    eligiblePlayerIds: state.players.map((player) => player.id),
    responseTypes: ["immunity"],
    payload: {
      liveTable: true,
      responsesAllowed: true,
      transactionsAllowed: true,
      effectApplication: "manual",
      targetPlayerName: target.name
    }
  };
  const presets = {
    encounter: {
      type: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT,
      title: `${actor.name} test encounter result`,
      message: `${actor.name} rolled a test encounter result. Encounter tokens and trades may happen before finalizing.`,
      sourceType: "admin-test-encounter",
      payload: { tokenTimingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER, effectApplication: "audit" }
    },
    control: {
      type: TOKEN_PENDING_EVENT_TYPES.CONTROL_TOKEN,
      title: "Move Deleter Pending",
      message: `${actor.name} used Move Deleter targeting ${target.name}. Protection responses and trades may happen before this resolves.`,
      sourceType: "admin-test-control-token",
      payload: { tokenName: "Move Deleter", tokenTimingCategory: TOKEN_TIMING_CATEGORIES.CONTROL }
    },
    curse: {
      type: TOKEN_PENDING_EVENT_TYPES.CURSE_TOKEN,
      title: "Flame Curse Pending",
      message: `${actor.name} used Flame Curse targeting ${target.name}. Protection or cleanse effects may happen before this resolves.`,
      sourceType: "admin-test-curse-token",
      payload: { tokenName: "Flame Curse", tokenTimingCategory: TOKEN_TIMING_CATEGORIES.CURSE }
    },
    "team-lock-curse": {
      type: TOKEN_PENDING_EVENT_TYPES.CURSE_TOKEN,
      title: "Sabotage Curse Pending",
      message: `${actor.name} used Flame Curse during Sabotage targeting ${target.name}. Submitted teams are locked before Team Preview.`,
      sourceType: "admin-test-team-lock-curse",
      payload: { tokenName: "Flame Curse", tokenTimingCategory: TOKEN_TIMING_CATEGORIES.CURSE, teamLock: true, timingWindow: TOKEN_PENDING_EVENT_TYPES.TEAM_LOCK_WINDOW }
    },
    "class-effect": {
      type: "class-effect",
      title: "Manual Class Effect Pending",
      message: `${actor.name} triggered a test class effect. Resolve responses, trades, or No Response before applying it manually.`,
      sourceType: "admin-test-class-effect",
      payload: { effectApplication: "manual" }
    }
  };
  const preset = presets[kind];
  if (!preset) return;
  const activity = createInteractionEvent({
    ...common,
    ...preset,
    payload: {
      ...common.payload,
      ...(preset.payload || {})
    }
  });
  state.activityResponseDrawerOpen = true;
  state.liveTable = normalizeLiveTableState({ ...(state.liveTable || {}), currentPendingEventId: activity.id });
  addLogEntry({
    action: "admin",
    category: "admin",
    player: "Admin Tools",
    item: `Created test pending event: ${activity.title}`,
    type: "admin-test-event",
    linkedEventId: activity.id,
    playerIds: [actor.id, target.id],
    tags: ["admin", "testing", "timing-window", kind],
    eventOrder: activity.eventOrder
  });
  saveState();
  render();
  syncAdminRepairControls();
  if (els.adminTestEventStatus) els.adminTestEventStatus.textContent = `Created ${activity.title}. Use Live Referee to respond/finalize, or open Advanced Controls for repair.`;
}
```

### `applyActivationOverlay` — lines 56356-56435

```js
async function applyActivationOverlay() {
  // Effect Activated should remain a confirmed overlay flow: gather actor,
  // effect, target, choices, and duration here before applying future rules.
  if (!activationDraft) return;
  try {
    const player = state.players.find((candidate) => candidate.id === activationDraft.playerId);
    if (!player) return;
    if (!requirePrivatePrepAccess(player, "effect activation")) return;
    const effect = structuredClone(activationDraft.effect);
    const engineMetadata = tokenEffectMetadataByName(effect.name);
    const usability = tokenRuntimeUsabilityCheck(engineMetadata);
    const tokenActivation = effect.type === "token" || activationDraft.statusDefinitionId || activationDraft.utilityDefinitionId;
    if (tokenActivation && !usability.ok) {
      alert(usability.reason);
      return;
    }
    const statusDefinition = activationDraft.statusDefinitionId ? statusTokenDefinitions[activationDraft.statusDefinitionId] : statusTokenDefinitionByName(effect.name);
    if (statusDefinition) {
      applyStatusTokenActivation(player, effect, statusDefinition);
      return;
    }
    const utilityDefinition = activationDraft.utilityDefinitionId ? utilityTokenDefinitions[activationDraft.utilityDefinitionId] : utilityTokenDefinitionByName(effect.name);
    if (utilityDefinition && ["extraEncounter", "safeguard"].includes(engineMetadata.resolverId)) {
      const targetPlayer = engineMetadata.selfOnly
        ? player
        : state.players.find((candidate) => candidate.id === els.activationTargetPlayer.value) || player;
      closeActivationOverlay();
      els.actionName.value = "";
      els.actionNotes.value = "";
      await resolveImmediateTokenUse({
        actor: player,
        target: targetPlayer,
        actorPlayerId: player.id,
        targetPlayerId: targetPlayer?.id || "",
        targetPlayerName: targetPlayer?.name || "",
        tokenName: effect.name,
        category: engineMetadata.timingCategory,
        targetType: engineMetadata.targetType,
        targetScope: engineMetadata.targetScope,
        targetText: els.activationTargetName.value.trim(),
        notes: els.activationChoices.value.trim()
      }, { context: { manualHost: true } });
      return;
    }
    if (utilityDefinition) {
      applyUtilityTokenActivation(player, effect, utilityDefinition);
      return;
    }
    const target = state.players.find((candidate) => candidate.id === els.activationTargetPlayer.value);
    const targetType = els.activationTargetType.value;
    const targetName = els.activationTargetName.value.trim();
    const choices = els.activationChoices.value.trim();
    const duration = els.activationDuration.value.trim();
    const targetDetails = targetType === "none"
      ? "No target"
      : `${targetTypeLabel(targetType)}${target ? ` -> ${target.name}` : ""}${targetName ? ` (${targetName})` : ""}`;
    const consumed = effect.type === "token" ? removeThing(player, "token", effect.name, false) : false;
    const result = effect.type === "token"
      ? consumed ? "token consumed" : "token not found; activation logged"
      : `${effect.type} activation logged`;
    addLogEntry({
      action: "activate",
      category: effect.type === "token" ? "tokens" : effect.type === "item" ? "items" : "perks",
      player: player.name,
      item: `Activated ${effect.name}; Target ${targetDetails}${choices ? `; Choices: ${choices}` : ""}${duration ? `; Duration: ${duration}` : ""} [${result}]${activationDraft.notes ? ` (${activationDraft.notes})` : ""}`,
      type: effect.type,
      quantity: 1,
      price: 0,
      balanceAfter: player.balance
    });
    closeActivationOverlay();
    els.actionName.value = "";
    els.actionNotes.value = "";
    saveState();
    render();
  } finally {
    activationSubmitting = false;
    if (els.applyActivation) els.applyActivation.disabled = false;
  }
}
```


## Encounter-family token definitions

### line 765

```js
    encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
```

### line 766

```js
    encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
```

### line 767

```js
    encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
```

### line 768

```js
    encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
```

### line 769

```js
    encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
```

### line 770

```js
    encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
```

### line 771

```js
    encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
```

### line 772

```js
    encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
```


## Detailed marker contexts

### `app.js`

#### Old encounter result/event bridge — `"encounter-result"` — line 650

```text
   646 |   "pokemon-result": {
   647 |     label: "Pokemon Result",
   648 |     responseTypes: ["encounter-reroll", "steal-encounter"]
   649 |   },
   650 |   "encounter-result": {
   651 |     label: "Encounter Result",
   652 |     responseTypes: ["encounter-reroll", "steal-encounter"]
   653 |   }
   654 | });
```

#### Encounter token names — `"Quick Ball Token"` — line 672

```text
   668 |   },
   669 |   "steal-encounter": {
   670 |     id: "steal-encounter",
   671 |     label: "Steal Encounter",
   672 |     tokenNames: ["Quick Ball Token", "Steal"],
   673 |     description: "Future hook: take a Pokemon result before it is claimed."
   674 |   }
   675 | });
   676 |
```

#### Old encounter result/event bridge — `"encounterResult"` — line 703

```text
   699 |   PLAYER: "player",
   700 |   POKEMON: "pokemon",
   701 |   TEAM: "team",
   702 |   PARTY_ROSTER: "partyRoster",
   703 |   ENCOUNTER_RESULT: "encounterResult",
   704 |   TOKEN: "token",
   705 |   ITEM: "item",
   706 |   TM: "tm",
   707 |   MONEY: "money",
```

#### Old encounter result/event bridge — `"encounterResult"` — line 721

```text
   717 |   CURRENT_PROMPT: "currentPrompt",
   718 |   POKEMON: "pokemon",
   719 |   PLAYER: "player",
   720 |   TEAM: "team",
   721 |   ENCOUNTER_RESULT: "encounterResult",
   722 |   RESOURCE: "resource",
   723 |   TABLE: "table",
   724 |   MANUAL: "manual"
   725 | });
```

#### Encounter-family contract model — `"wheelWindow"` — line 790

```text
   786 |   SHOP_OPEN: "shopOpen",
   787 |   TEAM_BUILDING: "teamBuilding",
   788 |   BATTLE_PREP: "battlePrep",
   789 |   RESPONSE_WINDOW: "responseWindow",
   790 |   WHEEL_WINDOW: "wheelWindow",
   791 |   TEAM_PREVIEW: "teamPreview",
   792 |   SABOTAGE: "sabotage",
   793 |   BATTLE_RESULTS: "battleResults",
   794 |   MANUAL_HOST: "manualHost"
```

#### Old encounter result/event bridge — `"encounterResult"` — line 831

```text
   827 |   BATTLE_TRICK: "battleTrick"
   828 | });
   829 |
   830 | const TOKEN_PENDING_EVENT_TYPES = Object.freeze({
   831 |   ENCOUNTER_RESULT: "encounterResult",
   832 |   CONTROL_TOKEN: "controlToken",
   833 |   PROTECTION_RESPONSE: "protectionResponse",
   834 |   CURSE_TOKEN: "curseToken",
   835 |   ENCOUNTER_TOKEN: "encounterToken",
```

#### Old encounter result/event bridge — `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 869

```text
   865 |     timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,
   866 |     useType: TOKEN_USE_TYPES.ENCOUNTER_MODIFIER,
   867 |     createsPendingEvent: false,
   868 |     requiresPendingEvent: true,
   869 |     requiredPendingType: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT,
   870 |     responseRole: "encounterModifier",
   871 |     livePromptType: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_TOKEN
   872 |   }),
   873 |   [TOKEN_TIMING_CATEGORIES.CURSE]: Object.freeze({
```

#### Encounter token names — `"Reroll"` — line 1468

```text
  1464 |     "uses": null
  1465 |   },
  1466 |   {
  1467 |     "id": "reroll",
  1468 |     "name": "Reroll",
  1469 |     "tier": "B",
  1470 |     "description": "Every Gym You May Use Three Reroll Tokens Without Owning A Reroll Token.",
  1471 |     "isConsumable": false,
  1472 |     "uses": null
```

#### Encounter token names — `"Reroll"` — line 2689

```text
  2685 |     { id: "smokescreen", name: "Smokescreen", tokenType: "protection", tier: "Protection", category: "Protection", price: 6000, description: "When You Or Your Pokemon Are Targetted For An Effect, Spin A Wheel With All Players. The Result Is The New Target Of That Effect. If Pokemon Are Targetted When This Is Used, Choose A Legal Target From That Player Landed On. Your Original Target Remains The Same." },
  2686 |     { id: "seven-tools", name: "7 Tools Of The Bandit", tokenType: "protection", tier: "Protection", category: "Protection", price: 9000, description: "When A Player Activates A Protection Token, Use This Token Immediately After. Negate That Protection Token, Then Copy It. The Copied Token Must Be Used During This Gym Or It Is Lost." },
  2687 |     { id: "immunity", name: "Immunity", tokenType: "protection", tier: "Protection", category: "Protection", price: 9000, description: "Negate any effect or global effect. Does not stop series restricts or bans." },
  2688 |     { id: "revenge", name: "Revenge", tokenType: "protection", tier: "Protection", category: "Protection", price: 10000, description: "After a Battle Phase where an opponent cursed a Pokemon you brought, release 2 Pokemon from their brought team and destroy the held item." },
  2689 |     { id: "reroll-token", name: "Reroll", tokenType: "reroll", tier: "Encounter", category: "Encounter", price: 1000, description: "Reroll any wheel result." },
  2690 |     { id: "extra-encounter-token", name: "Extra Encounter Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 3500, description: "Use in Action Phase to roll an extra encounter." },
  2691 |     { id: "repel-token", name: "Repel", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 3500, description: "Remove one Pokemon for every 5 entries on an encounter wheel." },
  2692 |     { id: "quick-ball-token", name: "Quick Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 12500, description: "Release an encounter and steal another player's encounter." },
  2693 |     { id: "dream-ball-token", name: "Dream Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 8000, description: "Before an encounter wheel, name almost any ability. The encounter has access to that ability." },
```

#### Encounter token names — `"Extra Encounter Token"` — line 2690

```text
  2686 |     { id: "seven-tools", name: "7 Tools Of The Bandit", tokenType: "protection", tier: "Protection", category: "Protection", price: 9000, description: "When A Player Activates A Protection Token, Use This Token Immediately After. Negate That Protection Token, Then Copy It. The Copied Token Must Be Used During This Gym Or It Is Lost." },
  2687 |     { id: "immunity", name: "Immunity", tokenType: "protection", tier: "Protection", category: "Protection", price: 9000, description: "Negate any effect or global effect. Does not stop series restricts or bans." },
  2688 |     { id: "revenge", name: "Revenge", tokenType: "protection", tier: "Protection", category: "Protection", price: 10000, description: "After a Battle Phase where an opponent cursed a Pokemon you brought, release 2 Pokemon from their brought team and destroy the held item." },
  2689 |     { id: "reroll-token", name: "Reroll", tokenType: "reroll", tier: "Encounter", category: "Encounter", price: 1000, description: "Reroll any wheel result." },
  2690 |     { id: "extra-encounter-token", name: "Extra Encounter Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 3500, description: "Use in Action Phase to roll an extra encounter." },
  2691 |     { id: "repel-token", name: "Repel", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 3500, description: "Remove one Pokemon for every 5 entries on an encounter wheel." },
  2692 |     { id: "quick-ball-token", name: "Quick Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 12500, description: "Release an encounter and steal another player's encounter." },
  2693 |     { id: "dream-ball-token", name: "Dream Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 8000, description: "Before an encounter wheel, name almost any ability. The encounter has access to that ability." },
  2694 |     { id: "honey-token", name: "Honey", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 7000, description: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter." },
```

#### Encounter token names — `"Repel"` — line 2691

```text
  2687 |     { id: "immunity", name: "Immunity", tokenType: "protection", tier: "Protection", category: "Protection", price: 9000, description: "Negate any effect or global effect. Does not stop series restricts or bans." },
  2688 |     { id: "revenge", name: "Revenge", tokenType: "protection", tier: "Protection", category: "Protection", price: 10000, description: "After a Battle Phase where an opponent cursed a Pokemon you brought, release 2 Pokemon from their brought team and destroy the held item." },
  2689 |     { id: "reroll-token", name: "Reroll", tokenType: "reroll", tier: "Encounter", category: "Encounter", price: 1000, description: "Reroll any wheel result." },
  2690 |     { id: "extra-encounter-token", name: "Extra Encounter Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 3500, description: "Use in Action Phase to roll an extra encounter." },
  2691 |     { id: "repel-token", name: "Repel", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 3500, description: "Remove one Pokemon for every 5 entries on an encounter wheel." },
  2692 |     { id: "quick-ball-token", name: "Quick Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 12500, description: "Release an encounter and steal another player's encounter." },
  2693 |     { id: "dream-ball-token", name: "Dream Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 8000, description: "Before an encounter wheel, name almost any ability. The encounter has access to that ability." },
  2694 |     { id: "honey-token", name: "Honey", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 7000, description: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter." },
  2695 |     { id: "master-ball-token", name: "Master Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 12500, description: "Choose your encounter. Other players cannot change it." },
```

#### Encounter token names — `"Quick Ball Token"` — line 2692

```text
  2688 |     { id: "revenge", name: "Revenge", tokenType: "protection", tier: "Protection", category: "Protection", price: 10000, description: "After a Battle Phase where an opponent cursed a Pokemon you brought, release 2 Pokemon from their brought team and destroy the held item." },
  2689 |     { id: "reroll-token", name: "Reroll", tokenType: "reroll", tier: "Encounter", category: "Encounter", price: 1000, description: "Reroll any wheel result." },
  2690 |     { id: "extra-encounter-token", name: "Extra Encounter Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 3500, description: "Use in Action Phase to roll an extra encounter." },
  2691 |     { id: "repel-token", name: "Repel", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 3500, description: "Remove one Pokemon for every 5 entries on an encounter wheel." },
  2692 |     { id: "quick-ball-token", name: "Quick Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 12500, description: "Release an encounter and steal another player's encounter." },
  2693 |     { id: "dream-ball-token", name: "Dream Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 8000, description: "Before an encounter wheel, name almost any ability. The encounter has access to that ability." },
  2694 |     { id: "honey-token", name: "Honey", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 7000, description: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter." },
  2695 |     { id: "master-ball-token", name: "Master Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 12500, description: "Choose your encounter. Other players cannot change it." },
  2696 |     { id: "beast-ball-token", name: "Beast Ball", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 8000, description: "Before an encounter wheel, name any move. The encounter has access to that move." },
```

#### Encounter token names — `"Dream Ball Token"` — line 2693

```text
  2689 |     { id: "reroll-token", name: "Reroll", tokenType: "reroll", tier: "Encounter", category: "Encounter", price: 1000, description: "Reroll any wheel result." },
  2690 |     { id: "extra-encounter-token", name: "Extra Encounter Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 3500, description: "Use in Action Phase to roll an extra encounter." },
  2691 |     { id: "repel-token", name: "Repel", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 3500, description: "Remove one Pokemon for every 5 entries on an encounter wheel." },
  2692 |     { id: "quick-ball-token", name: "Quick Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 12500, description: "Release an encounter and steal another player's encounter." },
  2693 |     { id: "dream-ball-token", name: "Dream Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 8000, description: "Before an encounter wheel, name almost any ability. The encounter has access to that ability." },
  2694 |     { id: "honey-token", name: "Honey", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 7000, description: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter." },
  2695 |     { id: "master-ball-token", name: "Master Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 12500, description: "Choose your encounter. Other players cannot change it." },
  2696 |     { id: "beast-ball-token", name: "Beast Ball", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 8000, description: "Before an encounter wheel, name any move. The encounter has access to that move." },
  2697 |     { id: "move-deleter", legacyIds: ["move-deleter-curse"], name: "Move Deleter", tokenType: "control", tier: "Control", category: "Control", price: 1500, description: "Ban one move from being brought for 1 week. Cannot be used after team submission." },
```

#### Encounter token names — `"Honey"` — line 2694

```text
  2690 |     { id: "extra-encounter-token", name: "Extra Encounter Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 3500, description: "Use in Action Phase to roll an extra encounter." },
  2691 |     { id: "repel-token", name: "Repel", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 3500, description: "Remove one Pokemon for every 5 entries on an encounter wheel." },
  2692 |     { id: "quick-ball-token", name: "Quick Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 12500, description: "Release an encounter and steal another player's encounter." },
  2693 |     { id: "dream-ball-token", name: "Dream Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 8000, description: "Before an encounter wheel, name almost any ability. The encounter has access to that ability." },
  2694 |     { id: "honey-token", name: "Honey", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 7000, description: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter." },
  2695 |     { id: "master-ball-token", name: "Master Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 12500, description: "Choose your encounter. Other players cannot change it." },
  2696 |     { id: "beast-ball-token", name: "Beast Ball", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 8000, description: "Before an encounter wheel, name any move. The encounter has access to that move." },
  2697 |     { id: "move-deleter", legacyIds: ["move-deleter-curse"], name: "Move Deleter", tokenType: "control", tier: "Control", category: "Control", price: 1500, description: "Ban one move from being brought for 1 week. Cannot be used after team submission." },
  2698 |     { id: "toxic-curse", name: "Toxic Curse", tokenType: "curse", tier: "Curses", category: "Curses", price: 3000, description: "Force a Pokemon to carry a Toxic Orb for 2 gyms." },
```

#### Encounter token names — `"Master Ball Token"` — line 2695

```text
  2691 |     { id: "repel-token", name: "Repel", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 3500, description: "Remove one Pokemon for every 5 entries on an encounter wheel." },
  2692 |     { id: "quick-ball-token", name: "Quick Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 12500, description: "Release an encounter and steal another player's encounter." },
  2693 |     { id: "dream-ball-token", name: "Dream Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 8000, description: "Before an encounter wheel, name almost any ability. The encounter has access to that ability." },
  2694 |     { id: "honey-token", name: "Honey", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 7000, description: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter." },
  2695 |     { id: "master-ball-token", name: "Master Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 12500, description: "Choose your encounter. Other players cannot change it." },
  2696 |     { id: "beast-ball-token", name: "Beast Ball", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 8000, description: "Before an encounter wheel, name any move. The encounter has access to that move." },
  2697 |     { id: "move-deleter", legacyIds: ["move-deleter-curse"], name: "Move Deleter", tokenType: "control", tier: "Control", category: "Control", price: 1500, description: "Ban one move from being brought for 1 week. Cannot be used after team submission." },
  2698 |     { id: "toxic-curse", name: "Toxic Curse", tokenType: "curse", tier: "Curses", category: "Curses", price: 3000, description: "Force a Pokemon to carry a Toxic Orb for 2 gyms." },
  2699 |     { id: "iron-ball-curse", name: "Iron Ball Curse", tokenType: "curse", tier: "Curses", category: "Curses", price: 3000, description: "Force a Pokemon to carry an Iron Ball for 2 gyms." },
```

#### Encounter token names — `"Beast Ball"` — line 2696

```text
  2692 |     { id: "quick-ball-token", name: "Quick Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 12500, description: "Release an encounter and steal another player's encounter." },
  2693 |     { id: "dream-ball-token", name: "Dream Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 8000, description: "Before an encounter wheel, name almost any ability. The encounter has access to that ability." },
  2694 |     { id: "honey-token", name: "Honey", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 7000, description: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter." },
  2695 |     { id: "master-ball-token", name: "Master Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 12500, description: "Choose your encounter. Other players cannot change it." },
  2696 |     { id: "beast-ball-token", name: "Beast Ball", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 8000, description: "Before an encounter wheel, name any move. The encounter has access to that move." },
  2697 |     { id: "move-deleter", legacyIds: ["move-deleter-curse"], name: "Move Deleter", tokenType: "control", tier: "Control", category: "Control", price: 1500, description: "Ban one move from being brought for 1 week. Cannot be used after team submission." },
  2698 |     { id: "toxic-curse", name: "Toxic Curse", tokenType: "curse", tier: "Curses", category: "Curses", price: 3000, description: "Force a Pokemon to carry a Toxic Orb for 2 gyms." },
  2699 |     { id: "iron-ball-curse", name: "Iron Ball Curse", tokenType: "curse", tier: "Curses", category: "Curses", price: 3000, description: "Force a Pokemon to carry an Iron Ball for 2 gyms." },
  2700 |     { id: "flame-curse", name: "Flame Curse", tokenType: "curse", tier: "Curses", category: "Curses", price: 3000, description: "Force a Pokemon to carry a Flame Orb for 2 gyms." },
```

#### Old encounter result/event bridge — `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 2726

```text
  2722 |     timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,
  2723 |     useType: TOKEN_USE_TYPES.ENCOUNTER_MODIFIER,
  2724 |     createsPendingEvent: false,
  2725 |     requiresPendingEvent: true,
  2726 |     requiredPendingType: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT,
  2727 |     responseRole: "encounterModifier",
  2728 |     livePromptType: "encounterToken",
  2729 |     timing: "pending-result",
  2730 |     targetType: "pending-random-result",
```

#### Old encounter result/event bridge — `"encounter-result"` — line 2731

```text
  2727 |     responseRole: "encounterModifier",
  2728 |     livePromptType: "encounterToken",
  2729 |     timing: "pending-result",
  2730 |     targetType: "pending-random-result",
  2731 |     validTargets: ["random-pokemon-result", "encounter-result", "quest-roll"],
  2732 |     excludedSources: ["game-corner-gamble-wheel"],
  2733 |     effect: "reroll"
  2734 |   }
  2735 | });
```

#### Old encounter result/event bridge — `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 2761

```text
  2757 |   "after-you": { names: ["After You"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "After You Pending", note: "Creates a fresh virtual copy of the current supported Token activation before the original resolves." },
  2758 |   "smokescreen": { names: ["Smokescreen"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "log", note: "Spins every player once and replaces the original target only when another player has a legal corresponding target." },
  2759 |   "immunity": { names: ["Immunity", "Emergency Immunity Token"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Immunity", note: "Negates one effect/global effect." },
  2760 |   "revenge": { names: ["Revenge"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Revenge Pending", note: "Post-curse revenge marker." },
  2761 |   "extra-encounter-token": { names: ["Extra Encounter Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Extra Encounter Available", note: "Spend during Action Phase to roll an extra encounter." },
  2762 |   "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, choiceLabel: "Pokemon Name", effectType: "log", note: "Remove one Pokemon per 5 entries from Encounter Wheel. Wheel editor hook pending." },
  2763 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
  2764 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
  2765 |   "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "At End of Action, copies one immutable completed Encounter result into a new acquisition-ready Encounter without rerolling." },
```

#### Encounter token names — `"Extra Encounter Token"` — line 2761

```text
  2757 |   "after-you": { names: ["After You"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "After You Pending", note: "Creates a fresh virtual copy of the current supported Token activation before the original resolves." },
  2758 |   "smokescreen": { names: ["Smokescreen"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "log", note: "Spins every player once and replaces the original target only when another player has a legal corresponding target." },
  2759 |   "immunity": { names: ["Immunity", "Emergency Immunity Token"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Immunity", note: "Negates one effect/global effect." },
  2760 |   "revenge": { names: ["Revenge"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Revenge Pending", note: "Post-curse revenge marker." },
  2761 |   "extra-encounter-token": { names: ["Extra Encounter Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Extra Encounter Available", note: "Spend during Action Phase to roll an extra encounter." },
  2762 |   "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, choiceLabel: "Pokemon Name", effectType: "log", note: "Remove one Pokemon per 5 entries from Encounter Wheel. Wheel editor hook pending." },
  2763 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
  2764 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
  2765 |   "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "At End of Action, copies one immutable completed Encounter result into a new acquisition-ready Encounter without rerolling." },
```

#### Old encounter result/event bridge — `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 2762

```text
  2758 |   "smokescreen": { names: ["Smokescreen"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "log", note: "Spins every player once and replaces the original target only when another player has a legal corresponding target." },
  2759 |   "immunity": { names: ["Immunity", "Emergency Immunity Token"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Immunity", note: "Negates one effect/global effect." },
  2760 |   "revenge": { names: ["Revenge"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Revenge Pending", note: "Post-curse revenge marker." },
  2761 |   "extra-encounter-token": { names: ["Extra Encounter Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Extra Encounter Available", note: "Spend during Action Phase to roll an extra encounter." },
  2762 |   "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, choiceLabel: "Pokemon Name", effectType: "log", note: "Remove one Pokemon per 5 entries from Encounter Wheel. Wheel editor hook pending." },
  2763 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
  2764 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
  2765 |   "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "At End of Action, copies one immutable completed Encounter result into a new acquisition-ready Encounter without rerolling." },
  2766 |   "master-ball-token": { names: ["Master Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Master Ball Pending", note: "Choose encounter; cannot be changed by other players." },
```

#### Encounter token names — `"Repel"` — line 2762

```text
  2758 |   "smokescreen": { names: ["Smokescreen"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "log", note: "Spins every player once and replaces the original target only when another player has a legal corresponding target." },
  2759 |   "immunity": { names: ["Immunity", "Emergency Immunity Token"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Immunity", note: "Negates one effect/global effect." },
  2760 |   "revenge": { names: ["Revenge"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Revenge Pending", note: "Post-curse revenge marker." },
  2761 |   "extra-encounter-token": { names: ["Extra Encounter Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Extra Encounter Available", note: "Spend during Action Phase to roll an extra encounter." },
  2762 |   "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, choiceLabel: "Pokemon Name", effectType: "log", note: "Remove one Pokemon per 5 entries from Encounter Wheel. Wheel editor hook pending." },
  2763 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
  2764 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
  2765 |   "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "At End of Action, copies one immutable completed Encounter result into a new acquisition-ready Encounter without rerolling." },
  2766 |   "master-ball-token": { names: ["Master Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Master Ball Pending", note: "Choose encounter; cannot be changed by other players." },
```

#### Old encounter result/event bridge — `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 2763

```text
  2759 |   "immunity": { names: ["Immunity", "Emergency Immunity Token"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Immunity", note: "Negates one effect/global effect." },
  2760 |   "revenge": { names: ["Revenge"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Revenge Pending", note: "Post-curse revenge marker." },
  2761 |   "extra-encounter-token": { names: ["Extra Encounter Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Extra Encounter Available", note: "Spend during Action Phase to roll an extra encounter." },
  2762 |   "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, choiceLabel: "Pokemon Name", effectType: "log", note: "Remove one Pokemon per 5 entries from Encounter Wheel. Wheel editor hook pending." },
  2763 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
  2764 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
  2765 |   "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "At End of Action, copies one immutable completed Encounter result into a new acquisition-ready Encounter without rerolling." },
  2766 |   "master-ball-token": { names: ["Master Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Master Ball Pending", note: "Choose encounter; cannot be changed by other players." },
  2767 |   "beast-ball-token": { names: ["Beast Ball"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Beast Ball Pending", note: "Encounter move choice marker." }
```

#### Encounter token names — `"Quick Ball Token"` — line 2763

```text
  2759 |   "immunity": { names: ["Immunity", "Emergency Immunity Token"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Immunity", note: "Negates one effect/global effect." },
  2760 |   "revenge": { names: ["Revenge"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Revenge Pending", note: "Post-curse revenge marker." },
  2761 |   "extra-encounter-token": { names: ["Extra Encounter Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Extra Encounter Available", note: "Spend during Action Phase to roll an extra encounter." },
  2762 |   "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, choiceLabel: "Pokemon Name", effectType: "log", note: "Remove one Pokemon per 5 entries from Encounter Wheel. Wheel editor hook pending." },
  2763 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
  2764 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
  2765 |   "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "At End of Action, copies one immutable completed Encounter result into a new acquisition-ready Encounter without rerolling." },
  2766 |   "master-ball-token": { names: ["Master Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Master Ball Pending", note: "Choose encounter; cannot be changed by other players." },
  2767 |   "beast-ball-token": { names: ["Beast Ball"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Beast Ball Pending", note: "Encounter move choice marker." }
```

#### Old encounter result/event bridge — `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 2764

```text
  2760 |   "revenge": { names: ["Revenge"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Revenge Pending", note: "Post-curse revenge marker." },
  2761 |   "extra-encounter-token": { names: ["Extra Encounter Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Extra Encounter Available", note: "Spend during Action Phase to roll an extra encounter." },
  2762 |   "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, choiceLabel: "Pokemon Name", effectType: "log", note: "Remove one Pokemon per 5 entries from Encounter Wheel. Wheel editor hook pending." },
  2763 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
  2764 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
  2765 |   "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "At End of Action, copies one immutable completed Encounter result into a new acquisition-ready Encounter without rerolling." },
  2766 |   "master-ball-token": { names: ["Master Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Master Ball Pending", note: "Choose encounter; cannot be changed by other players." },
  2767 |   "beast-ball-token": { names: ["Beast Ball"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Beast Ball Pending", note: "Encounter move choice marker." }
  2768 | });
```

#### Encounter token names — `"Dream Ball Token"` — line 2764

```text
  2760 |   "revenge": { names: ["Revenge"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Revenge Pending", note: "Post-curse revenge marker." },
  2761 |   "extra-encounter-token": { names: ["Extra Encounter Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Extra Encounter Available", note: "Spend during Action Phase to roll an extra encounter." },
  2762 |   "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, choiceLabel: "Pokemon Name", effectType: "log", note: "Remove one Pokemon per 5 entries from Encounter Wheel. Wheel editor hook pending." },
  2763 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
  2764 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
  2765 |   "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "At End of Action, copies one immutable completed Encounter result into a new acquisition-ready Encounter without rerolling." },
  2766 |   "master-ball-token": { names: ["Master Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Master Ball Pending", note: "Choose encounter; cannot be changed by other players." },
  2767 |   "beast-ball-token": { names: ["Beast Ball"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Beast Ball Pending", note: "Encounter move choice marker." }
  2768 | });
```

#### Old encounter result/event bridge — `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 2765

```text
  2761 |   "extra-encounter-token": { names: ["Extra Encounter Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Extra Encounter Available", note: "Spend during Action Phase to roll an extra encounter." },
  2762 |   "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, choiceLabel: "Pokemon Name", effectType: "log", note: "Remove one Pokemon per 5 entries from Encounter Wheel. Wheel editor hook pending." },
  2763 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
  2764 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
  2765 |   "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "At End of Action, copies one immutable completed Encounter result into a new acquisition-ready Encounter without rerolling." },
  2766 |   "master-ball-token": { names: ["Master Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Master Ball Pending", note: "Choose encounter; cannot be changed by other players." },
  2767 |   "beast-ball-token": { names: ["Beast Ball"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Beast Ball Pending", note: "Encounter move choice marker." }
  2768 | });
  2769 |
```

#### Encounter token names — `"Honey"` — line 2765

```text
  2761 |   "extra-encounter-token": { names: ["Extra Encounter Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Extra Encounter Available", note: "Spend during Action Phase to roll an extra encounter." },
  2762 |   "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, choiceLabel: "Pokemon Name", effectType: "log", note: "Remove one Pokemon per 5 entries from Encounter Wheel. Wheel editor hook pending." },
  2763 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
  2764 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
  2765 |   "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "At End of Action, copies one immutable completed Encounter result into a new acquisition-ready Encounter without rerolling." },
  2766 |   "master-ball-token": { names: ["Master Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Master Ball Pending", note: "Choose encounter; cannot be changed by other players." },
  2767 |   "beast-ball-token": { names: ["Beast Ball"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Beast Ball Pending", note: "Encounter move choice marker." }
  2768 | });
  2769 |
```

#### Old encounter result/event bridge — `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 2766

```text
  2762 |   "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, choiceLabel: "Pokemon Name", effectType: "log", note: "Remove one Pokemon per 5 entries from Encounter Wheel. Wheel editor hook pending." },
  2763 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
  2764 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
  2765 |   "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "At End of Action, copies one immutable completed Encounter result into a new acquisition-ready Encounter without rerolling." },
  2766 |   "master-ball-token": { names: ["Master Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Master Ball Pending", note: "Choose encounter; cannot be changed by other players." },
  2767 |   "beast-ball-token": { names: ["Beast Ball"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Beast Ball Pending", note: "Encounter move choice marker." }
  2768 | });
  2769 |
  2770 | const statusTokenDefinitions = Object.freeze({
```

#### Encounter token names — `"Master Ball Token"` — line 2766

```text
  2762 |   "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, choiceLabel: "Pokemon Name", effectType: "log", note: "Remove one Pokemon per 5 entries from Encounter Wheel. Wheel editor hook pending." },
  2763 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
  2764 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
  2765 |   "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "At End of Action, copies one immutable completed Encounter result into a new acquisition-ready Encounter without rerolling." },
  2766 |   "master-ball-token": { names: ["Master Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Master Ball Pending", note: "Choose encounter; cannot be changed by other players." },
  2767 |   "beast-ball-token": { names: ["Beast Ball"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Beast Ball Pending", note: "Encounter move choice marker." }
  2768 | });
  2769 |
  2770 | const statusTokenDefinitions = Object.freeze({
```

#### Old encounter result/event bridge — `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 2767

```text
  2763 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
  2764 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
  2765 |   "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "At End of Action, copies one immutable completed Encounter result into a new acquisition-ready Encounter without rerolling." },
  2766 |   "master-ball-token": { names: ["Master Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Master Ball Pending", note: "Choose encounter; cannot be changed by other players." },
  2767 |   "beast-ball-token": { names: ["Beast Ball"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Beast Ball Pending", note: "Encounter move choice marker." }
  2768 | });
  2769 |
  2770 | const statusTokenDefinitions = Object.freeze({
  2771 |   "restrict-token": {
```

#### Encounter token names — `"Beast Ball"` — line 2767

```text
  2763 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
  2764 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
  2765 |   "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "At End of Action, copies one immutable completed Encounter result into a new acquisition-ready Encounter without rerolling." },
  2766 |   "master-ball-token": { names: ["Master Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Master Ball Pending", note: "Choose encounter; cannot be changed by other players." },
  2767 |   "beast-ball-token": { names: ["Beast Ball"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Beast Ball Pending", note: "Encounter move choice marker." }
  2768 | });
  2769 |
  2770 | const statusTokenDefinitions = Object.freeze({
  2771 |   "restrict-token": {
```

#### Encounter token names — `"Extra Encounter Token"` — line 2973

```text
  2969 |
  2970 | const TOKEN_TIMING_ENGINE_V1_DEFINITIONS = Object.freeze({
  2971 |   "extra-encounter-token": Object.freeze({
  2972 |     id: "extra-encounter-token",
  2973 |     names: ["Extra Encounter Token", "Extra Encounter"],
  2974 |     objectType: TOKEN_OBJECT_TYPES.TOKEN,
  2975 |     family: ["encounter"],
  2976 |     timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,
  2977 |     timingWindows: [TOKEN_TIMING_WINDOWS.ACTION_OPEN, TOKEN_TIMING_WINDOWS.MANUAL_HOST],
```

#### Old encounter resolver IDs — `"extraEncounter"` — line 2993

```text
  2989 |     canBeRespondedTo: false,
  2990 |     canRespondTo: [],
  2991 |     visibility: "public",
  2992 |     logType: "tokenUsed",
  2993 |     resolverId: "extraEncounter"
  2994 |   }),
  2995 |   "restrict-token": Object.freeze({
  2996 |     id: "restrict-token",
  2997 |     names: ["Restrict Token", "Restrict"],
```

#### Encounter token names — `"Reroll"` — line 3118

```text
  3114 |     resolverId: "counterProtection"
  3115 |   }),
  3116 |   "reroll-token": Object.freeze({
  3117 |     id: "reroll-token",
  3118 |     names: ["Reroll Token", "Reroll"],
  3119 |     objectType: TOKEN_OBJECT_TYPES.TOKEN,
  3120 |     family: ["reroll"],
  3121 |     timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,
  3122 |     timingWindows: [TOKEN_TIMING_WINDOWS.WHEEL_WINDOW, TOKEN_TIMING_WINDOWS.MANUAL_HOST],
```

#### Old encounter result/event bridge — `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 3126

```text
  3122 |     timingWindows: [TOKEN_TIMING_WINDOWS.WHEEL_WINDOW, TOKEN_TIMING_WINDOWS.MANUAL_HOST],
  3123 |     activationPattern: TOKEN_ACTIVATION_PATTERNS.RESPONSE,
  3124 |     persistence: TOKEN_PERSISTENCE_BUCKETS.INSTANT,
  3125 |     resolutionPayloads: [TOKEN_RESOLUTION_PAYLOADS.WHEEL, TOKEN_RESOLUTION_PAYLOADS.REPLACEMENT],
  3126 |     targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT,
  3127 |     targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT,
  3128 |     duration: "instant",
  3129 |     consumesOnLegalUse: true,
  3130 |     consumeIfMisses: true,
```

#### Old encounter result/event bridge — `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 3198 — function `normalizeEffectTargetType` (3192-3208)

```text
  3194 |   const key = raw.toLowerCase();
  3195 |   const values = Object.values(EFFECT_TARGET_TYPES);
  3196 |   if (values.includes(raw)) return raw;
  3197 |   if (key === "current-prompt") return EFFECT_TARGET_TYPES.CURRENT_PROMPT;
  3198 |   if (key === "pending-random-result" || key === "pending-result") return EFFECT_TARGET_TYPES.ENCOUNTER_RESULT;
  3199 |   if (/encounter|random/.test(key)) return EFFECT_TARGET_TYPES.ENCOUNTER_RESULT;
  3200 |   if (/pokemon/.test(key)) return EFFECT_TARGET_TYPES.POKEMON;
  3201 |   if (/player/.test(key)) return EFFECT_TARGET_TYPES.PLAYER;
  3202 |   if (/team/.test(key)) return EFFECT_TARGET_TYPES.TEAM;
```

#### Old encounter result/event bridge — `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 3199 — function `normalizeEffectTargetType` (3192-3208)

```text
  3195 |   const values = Object.values(EFFECT_TARGET_TYPES);
  3196 |   if (values.includes(raw)) return raw;
  3197 |   if (key === "current-prompt") return EFFECT_TARGET_TYPES.CURRENT_PROMPT;
  3198 |   if (key === "pending-random-result" || key === "pending-result") return EFFECT_TARGET_TYPES.ENCOUNTER_RESULT;
  3199 |   if (/encounter|random/.test(key)) return EFFECT_TARGET_TYPES.ENCOUNTER_RESULT;
  3200 |   if (/pokemon/.test(key)) return EFFECT_TARGET_TYPES.POKEMON;
  3201 |   if (/player/.test(key)) return EFFECT_TARGET_TYPES.PLAYER;
  3202 |   if (/team/.test(key)) return EFFECT_TARGET_TYPES.TEAM;
  3203 |   if (/resource|item|token|money|tm/.test(key)) return EFFECT_TARGET_TYPES.RESOURCE;
```

#### Old encounter result/event bridge — `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 3233

```text
  3229 | function effectTargetTypeFromDefinition(definition = {}, category = "") {
  3230 |   const explicit = normalizeEffectTargetType(definition.targetType);
  3231 |   if (explicit) return explicit;
  3232 |   if (category === TOKEN_TIMING_CATEGORIES.PROTECTION) return EFFECT_TARGET_TYPES.CURRENT_PROMPT;
  3233 |   if (category === TOKEN_TIMING_CATEGORIES.ENCOUNTER) return EFFECT_TARGET_TYPES.ENCOUNTER_RESULT;
  3234 |   const mode = String(definition.targetMode || "").toLowerCase();
  3235 |   if (/pokemon/.test(mode) || mode === "banned-pokemon") return EFFECT_TARGET_TYPES.POKEMON;
  3236 |   if (/player/.test(mode)) return EFFECT_TARGET_TYPES.PLAYER;
  3237 |   if (/field/.test(mode) || definition.effectType === "field") return EFFECT_TARGET_TYPES.TABLE;
```

#### Old encounter result/event bridge — `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 3247

```text
  3243 | function effectTargetScopeFromDefinition(definition = {}, targetType = "", category = "") {
  3244 |   const explicit = normalizeEffectTargetScope(definition.targetScope);
  3245 |   if (explicit) return explicit;
  3246 |   if (targetType === EFFECT_TARGET_TYPES.CURRENT_PROMPT) return EFFECT_TARGET_SCOPES.CURRENT_PROMPT;
  3247 |   if (targetType === EFFECT_TARGET_TYPES.ENCOUNTER_RESULT) return EFFECT_TARGET_SCOPES.CURRENT_PROMPT;
  3248 |   if (targetType === EFFECT_TARGET_TYPES.PLAYER) return EFFECT_TARGET_SCOPES.SINGLE_PLAYER;
  3249 |   if (targetType === EFFECT_TARGET_TYPES.TABLE) return EFFECT_TARGET_SCOPES.TABLE_WIDE;
  3250 |   if (targetType === EFFECT_TARGET_TYPES.RESOURCE) return definition.targetMode === "none"
  3251 |     ? EFFECT_TARGET_SCOPES.ALL_MATCHING_RESOURCES
```

#### Old encounter result/event bridge — `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 3265 — function `targetCategoryFromEffectBucket` (3263-3272)

```text
  3261 | }
  3262 |
  3263 | function targetCategoryFromEffectBucket(targetType = "", targetScope = "") {
  3264 |   if (targetType === EFFECT_TARGET_TYPES.POKEMON) return EFFECT_TARGET_CATEGORIES.POKEMON;
  3265 |   if (targetType === EFFECT_TARGET_TYPES.ENCOUNTER_RESULT) return EFFECT_TARGET_CATEGORIES.ENCOUNTER_RESULT;
  3266 |   if (targetType === EFFECT_TARGET_TYPES.PLAYER) return EFFECT_TARGET_CATEGORIES.PLAYER;
  3267 |   if (targetType === EFFECT_TARGET_TYPES.RESOURCE) return EFFECT_TARGET_CATEGORIES.TOKEN;
  3268 |   if (targetType === EFFECT_TARGET_TYPES.TABLE || targetType === EFFECT_TARGET_TYPES.TEAM) return EFFECT_TARGET_CATEGORIES.WHOLE_TABLE;
  3269 |   if (targetType === EFFECT_TARGET_TYPES.CURRENT_PROMPT) return EFFECT_TARGET_CATEGORIES.MANUAL;
```

#### Old encounter resolver IDs — `"extraEncounter"` — line 3299

```text
  3295 |   const key = slugify(definition.name || definition.id || definition.names?.[0] || "");
  3296 |   if (key === "reroll-token" || key === "reroll") return EFFECT_RESOLUTION_MODES.AUTOMATIC;
  3297 |   if (["restrict", "immunity", "counterProtection", "substituteAttach"].includes(definition.resolverId)) return EFFECT_RESOLUTION_MODES.AUTOMATIC;
  3298 |   if (definition.resolverId === "safeguard") return EFFECT_RESOLUTION_MODES.AUTOMATIC;
  3299 |   if (definition.resolverId === "extraEncounter") return EFFECT_RESOLUTION_MODES.AUTOMATIC;
  3300 |   return EFFECT_RESOLUTION_MODES.HOST_CONFIRMED;
  3301 | }
  3302 |
  3303 | function tokenConsumptionModeForDefinition(definition = {}) {
```

#### Old encounter result/event bridge — `"encounterResult"` — line 3489

```text
  3485 |     windows.add(TOKEN_TIMING_WINDOWS.RESPONSE_WINDOW);
  3486 |     const resultSession = liveResultSessionForActivity?.(pendingEvent);
  3487 |     const pendingKind = `${pendingEvent.type || ""} ${pendingEvent.sourceType || ""}`;
  3488 |     if (resultSession || /encounter-result|pokemon-result/i.test(pendingKind)) {
  3489 |       windows.add("encounterResult");
  3490 |       windows.add(TOKEN_TIMING_WINDOWS.WHEEL_WINDOW);
  3491 |     } else if (pendingEvent.payload?.encounterStage === "beforeRoll" || /encounter-before|wheel-before/i.test(pendingKind)) {
  3492 |       windows.add("encounterBeforeRoll");
  3493 |     } else if (/wheel/i.test(pendingKind)) {
```

#### Old encounter result/event bridge — `"encounterBeforeRoll"` — line 3492

```text
  3488 |     if (resultSession || /encounter-result|pokemon-result/i.test(pendingKind)) {
  3489 |       windows.add("encounterResult");
  3490 |       windows.add(TOKEN_TIMING_WINDOWS.WHEEL_WINDOW);
  3491 |     } else if (pendingEvent.payload?.encounterStage === "beforeRoll" || /encounter-before|wheel-before/i.test(pendingKind)) {
  3492 |       windows.add("encounterBeforeRoll");
  3493 |     } else if (/wheel/i.test(pendingKind)) {
  3494 |       windows.add(TOKEN_TIMING_WINDOWS.WHEEL_WINDOW);
  3495 |     }
  3496 |   } else {
```

#### Old encounter result/event bridge — `"encounterBeforeRoll"` — line 3525

```text
  3521 |     }
  3522 |   }
  3523 |   if (context.teamBuilding) windows.add(TOKEN_TIMING_WINDOWS.TEAM_BUILDING);
  3524 |   if (context.battlePrep) windows.add(TOKEN_TIMING_WINDOWS.BATTLE_PREP);
  3525 |   if (context.encounterBeforeRoll) windows.add("encounterBeforeRoll");
  3526 |   if (context.encounterResult) windows.add("encounterResult");
  3527 |   return [...windows];
  3528 | }
  3529 |
```

#### Old encounter result/event bridge — `"encounterResult"` — line 3526

```text
  3522 |   }
  3523 |   if (context.teamBuilding) windows.add(TOKEN_TIMING_WINDOWS.TEAM_BUILDING);
  3524 |   if (context.battlePrep) windows.add(TOKEN_TIMING_WINDOWS.BATTLE_PREP);
  3525 |   if (context.encounterBeforeRoll) windows.add("encounterBeforeRoll");
  3526 |   if (context.encounterResult) windows.add("encounterResult");
  3527 |   return [...windows];
  3528 | }
  3529 |
  3530 | function tokenUseTimingCheck({ player, tokenName, metadata = tokenEffectMetadataByName(tokenName), context = {} } = {}) {
```

#### Old encounter resolver IDs — `"extraEncounter"` — line 3891

```text
  3887 | }
  3888 |
  3889 | async function resolveImmediateTokenUse(draft, { context = {} } = {}) {
  3890 |   const metadata = tokenEffectMetadataByName(draft.tokenName);
  3891 |   if (metadata.resolverId === "extraEncounter") {
  3892 |     alert("Extra Encounter is used from the current Route action. Open Routes and use the Token on the Route you want to explore.");
  3893 |     return null;
  3894 |   }
  3895 |   const timingCheck = tokenUseTimingCheck({ player: draft.actor, tokenName: draft.tokenName, metadata, context });
```

#### Old encounter result/event bridge — `sourceType === "encounter"` — line 23150 — function `createPokemonResultTimingWindow` (23147-23176)

```text
 23146 |
 23147 | function createPokemonResultTimingWindow(session, player) {
 23148 |   if (!session || session.interactionEventId || !player) return null;
 23149 |   const resultName = session.resultDisplayName || session.resultPokemonName || "Pokemon result";
 23150 |   const isEncounter = session.sourceType === "encounter";
 23151 |   const activity = createInteractionEvent({
 23152 |     type: isEncounter ? "encounter-result" : "pokemon-result",
 23153 |     title: `${player.name} rolled ${resultName}`,
 23154 |     message: `${session.sourceLabel || "Pokemon result"} is pending before it resolves.`,
```

#### Old encounter result/event bridge — `"encounter-result"` — line 23152 — function `createPokemonResultTimingWindow` (23147-23176)

```text
 23148 |   if (!session || session.interactionEventId || !player) return null;
 23149 |   const resultName = session.resultDisplayName || session.resultPokemonName || "Pokemon result";
 23150 |   const isEncounter = session.sourceType === "encounter";
 23151 |   const activity = createInteractionEvent({
 23152 |     type: isEncounter ? "encounter-result" : "pokemon-result",
 23153 |     title: `${player.name} rolled ${resultName}`,
 23154 |     message: `${session.sourceLabel || "Pokemon result"} is pending before it resolves.`,
 23155 |     actorPlayerId: player.id,
 23156 |     targetPlayerId: player.id,
```

#### Old encounter result/event bridge — `"encounter-result"` — line 25519 — function `liveActivityTimingCategory` (25514-25521)

```text
 25515 |   if (!activity) return "";
 25516 |   if (activity.payload?.tokenTimingCategory) return tokenTimingCategoryFromRaw(activity.payload.tokenTimingCategory);
 25517 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.CONTROL_TOKEN) return TOKEN_TIMING_CATEGORIES.CONTROL;
 25518 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.CURSE_TOKEN) return TOKEN_TIMING_CATEGORIES.CURSE;
 25519 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT || activity.type === "encounter-result") return TOKEN_TIMING_CATEGORIES.ENCOUNTER;
 25520 |   return "";
 25521 | }
 25522 |
 25523 | function liveTokenPromptDetails(activity, resultSession = null, targetState = state) {
```

#### Old encounter result/event bridge — `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 25519 — function `liveActivityTimingCategory` (25514-25521)

```text
 25515 |   if (!activity) return "";
 25516 |   if (activity.payload?.tokenTimingCategory) return tokenTimingCategoryFromRaw(activity.payload.tokenTimingCategory);
 25517 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.CONTROL_TOKEN) return TOKEN_TIMING_CATEGORIES.CONTROL;
 25518 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.CURSE_TOKEN) return TOKEN_TIMING_CATEGORIES.CURSE;
 25519 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT || activity.type === "encounter-result") return TOKEN_TIMING_CATEGORIES.ENCOUNTER;
 25520 |   return "";
 25521 | }
 25522 |
 25523 | function liveTokenPromptDetails(activity, resultSession = null, targetState = state) {
```

#### Old encounter result/event bridge — `"encounter-result"` — line 25532 — function `liveTokenPromptDetails` (25523-25581)

```text
 25528 |   const targetText = activity?.payload?.targetText || activity?.payload?.targetPlayerName || target?.name || "the target";
 25529 |   const teamLockText = activity?.payload?.teamLock
 25530 |     ? " This is happening during Sabotage. Submitted teams are locked before Team Preview."
 25531 |     : "";
 25532 |   if (resultSession || activity?.type === "encounter-result" || activity?.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT) {
 25533 |     const resultOwnerId = resultSession?.resultOwnerPlayerId || resultSession?.ownerPlayerId || resultSession?.playerId || activity?.actorPlayerId || "";
 25534 |     const resultOwner = targetState.players.find((player) => player.id === resultOwnerId);
 25535 |     const resultName = resultSession?.resultDisplayName || activity?.payload?.resultName || "an encounter";
 25536 |     return {
```

#### Old encounter result/event bridge — `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 25532 — function `liveTokenPromptDetails` (25523-25581)

```text
 25528 |   const targetText = activity?.payload?.targetText || activity?.payload?.targetPlayerName || target?.name || "the target";
 25529 |   const teamLockText = activity?.payload?.teamLock
 25530 |     ? " This is happening during Sabotage. Submitted teams are locked before Team Preview."
 25531 |     : "";
 25532 |   if (resultSession || activity?.type === "encounter-result" || activity?.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT) {
 25533 |     const resultOwnerId = resultSession?.resultOwnerPlayerId || resultSession?.ownerPlayerId || resultSession?.playerId || activity?.actorPlayerId || "";
 25534 |     const resultOwner = targetState.players.find((player) => player.id === resultOwnerId);
 25535 |     const resultName = resultSession?.resultDisplayName || activity?.payload?.resultName || "an encounter";
 25536 |     return {
```

#### Old encounter result/event bridge — `sourceType === "encounter"` — line 26165 — function `getCurrentLivePrompt` (26151-26293)

```text
 26161 |     const resultOwnerId = resultSession?.resultOwnerPlayerId || resultSession?.ownerPlayerId || resultSession?.playerId || "";
 26162 |     const resultOwner = targetState.players.find((player) => player.id === resultOwnerId);
 26163 |     const resultName = resultSession?.resultDisplayName || pendingEvent.payload?.resultName || "";
 26164 |     const sourceLabel = resultSession?.sourceLabel || pendingEvent.payload?.sourceLabel || pendingEvent.sourceType || "Event";
 26165 |     const isEncounterResult = Boolean(resultSession?.sourceType === "encounter" || pendingEvent.type === "encounter-result");
 26166 |     const tokenPrompt = liveTokenPromptDetails(pendingEvent, resultSession, targetState);
 26167 |     const promptDisplay = liveCurrentPromptDetails(pendingEvent, tokenPrompt, currentPromptStep, respondingToPromptStep);
 26168 |     if (resultSession) {
 26169 |       return {
```

#### Old encounter result/event bridge — `"encounter-result"` — line 26165 — function `getCurrentLivePrompt` (26151-26293)

```text
 26161 |     const resultOwnerId = resultSession?.resultOwnerPlayerId || resultSession?.ownerPlayerId || resultSession?.playerId || "";
 26162 |     const resultOwner = targetState.players.find((player) => player.id === resultOwnerId);
 26163 |     const resultName = resultSession?.resultDisplayName || pendingEvent.payload?.resultName || "";
 26164 |     const sourceLabel = resultSession?.sourceLabel || pendingEvent.payload?.sourceLabel || pendingEvent.sourceType || "Event";
 26165 |     const isEncounterResult = Boolean(resultSession?.sourceType === "encounter" || pendingEvent.type === "encounter-result");
 26166 |     const tokenPrompt = liveTokenPromptDetails(pendingEvent, resultSession, targetState);
 26167 |     const promptDisplay = liveCurrentPromptDetails(pendingEvent, tokenPrompt, currentPromptStep, respondingToPromptStep);
 26168 |     if (resultSession) {
 26169 |       return {
```

#### Old encounter result/event bridge — `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 26403 — function `liveManualEventTypeOptions` (26397-26409)

```text
 26399 |     ["manual-event", "Manual"],
 26400 |     ["class-effect", "Class Effect"],
 26401 |     [TOKEN_PENDING_EVENT_TYPES.CONTROL_TOKEN, "Control Token"],
 26402 |     [TOKEN_PENDING_EVENT_TYPES.CURSE_TOKEN, "Curse"],
 26403 |     [TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT, "Encounter"],
 26404 |     [TOKEN_PENDING_EVENT_TYPES.PROTECTION_RESPONSE, "Protection / Response Note"],
 26405 |     ["item-effect", "Item"],
 26406 |     ["other", "Other"]
 26407 |   ];
```

#### Old encounter result/event bridge — `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 26414 — function `liveTimingWindowOptions` (26411-26421)

```text
 26410 |
 26411 | function liveTimingWindowOptions(selected = "normal") {
 26412 |   const options = [
 26413 |     ["normal", "Normal"],
 26414 |     [TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT, "Encounter Result"],
 26415 |     [TOKEN_PENDING_EVENT_TYPES.TEAM_LOCK_WINDOW, "Sabotage"],
 26416 |     ["team-preview", "Team Preview"],
 26417 |     ["battle-phase", "Battle Phase"],
 26418 |     ["other", "Other"]
```

#### Old encounter result/event bridge — `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 27138 — function `createLiveManualEventFromForm` (27117-27181)

```text
 27134 |     return null;
 27135 |   }
 27136 |   const finalEventType = timingWindow === TOKEN_PENDING_EVENT_TYPES.TEAM_LOCK_WINDOW
 27137 |     ? TOKEN_PENDING_EVENT_TYPES.TEAM_LOCK_WINDOW
 27138 |     : timingWindow === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT
 27139 |       ? TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT
 27140 |       : eventType;
 27141 |   const activity = createInteractionEvent({
 27142 |     type: finalEventType,
```

#### Old encounter result/event bridge — `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 27139 — function `createLiveManualEventFromForm` (27117-27181)

```text
 27135 |   }
 27136 |   const finalEventType = timingWindow === TOKEN_PENDING_EVENT_TYPES.TEAM_LOCK_WINDOW
 27137 |     ? TOKEN_PENDING_EVENT_TYPES.TEAM_LOCK_WINDOW
 27138 |     : timingWindow === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT
 27139 |       ? TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT
 27140 |       : eventType;
 27141 |   const activity = createInteractionEvent({
 27142 |     type: finalEventType,
 27143 |     title,
```

#### Old encounter result/event bridge — `"encounter-result"` — line 27594 — function `currentEncounterPendingActivity` (27590-27597)

```text
 27590 | function currentEncounterPendingActivity() {
 27591 |   const activity = getCurrentPendingEvent();
 27592 |   if (!activity || activity.status !== "open") return null;
 27593 |   const session = liveResultSessionForActivity(activity);
 27594 |   if (activity.type === "encounter-result" || activity.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT) return activity;
 27595 |   if (session?.sourceType === "encounter") return activity;
 27596 |   return null;
 27597 | }
 27598 |
```

#### Old encounter result/event bridge — `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 27594 — function `currentEncounterPendingActivity` (27590-27597)

```text
 27590 | function currentEncounterPendingActivity() {
 27591 |   const activity = getCurrentPendingEvent();
 27592 |   if (!activity || activity.status !== "open") return null;
 27593 |   const session = liveResultSessionForActivity(activity);
 27594 |   if (activity.type === "encounter-result" || activity.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT) return activity;
 27595 |   if (session?.sourceType === "encounter") return activity;
 27596 |   return null;
 27597 | }
 27598 |
```

#### Old encounter result/event bridge — `sourceType === "encounter"` — line 27595 — function `currentEncounterPendingActivity` (27590-27597)

```text
 27591 |   const activity = getCurrentPendingEvent();
 27592 |   if (!activity || activity.status !== "open") return null;
 27593 |   const session = liveResultSessionForActivity(activity);
 27594 |   if (activity.type === "encounter-result" || activity.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT) return activity;
 27595 |   if (session?.sourceType === "encounter") return activity;
 27596 |   return null;
 27597 | }
 27598 |
 27599 | function tokenNameIsReroll(tokenName) {
```

#### Old encounter result/event bridge — `"encounter-result"` — line 28011 — function `liveRefereePromptIsEncounterResult` (28008-28014)

```text
 28007 |
 28008 | function liveRefereePromptIsEncounterResult(prompt) {
 28009 |   const activity = prompt?.pendingEvent;
 28010 |   return Boolean(prompt?.resultSession
 28011 |     || activity?.type === "encounter-result"
 28012 |     || activity?.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT
 28013 |     || liveResultSessionForActivity(activity));
 28014 | }
 28015 |
```

#### Old encounter result/event bridge — `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 28012 — function `liveRefereePromptIsEncounterResult` (28008-28014)

```text
 28008 | function liveRefereePromptIsEncounterResult(prompt) {
 28009 |   const activity = prompt?.pendingEvent;
 28010 |   return Boolean(prompt?.resultSession
 28011 |     || activity?.type === "encounter-result"
 28012 |     || activity?.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT
 28013 |     || liveResultSessionForActivity(activity));
 28014 | }
 28015 |
 28016 | function liveRefereeTokenCanUseNow(group, prompt, player) {
```

#### Old encounter result/event bridge — `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 29401 — function `buildRivalSagaPokemonTierMap` (16725-40003)

```text
 29397 |       submitDisabled: !prompt.pendingEvent,
 29398 |       className: "current-prompt"
 29399 |     });
 29400 |   }
 29401 |   if (targetType === EFFECT_TARGET_TYPES.ENCOUNTER_RESULT) {
 29402 |     const encounterLine = liveRefereeCurrentEncounterLine(prompt);
 29403 |     return liveRefereeEffectTargetScreenMarkup({
 29404 |       prompt,
 29405 |       tokenName,
```

#### Encounter token names — `"Reroll"` — line 29409 — function `buildRivalSagaPokemonTierMap` (16725-40003)

```text
 29405 |       tokenName,
 29406 |       metadata,
 29407 |       situation: encounterLine ? (slugify(tokenName).includes("reroll") ? "Reroll this encounter?" : `Use ${tokenName} on this encounter?`) : "No encounter result is waiting.",
 29408 |       fields: encounterLine ? `<p class="live-referee-target-summary">${escapeHtml(encounterLine)}</p>` : "",
 29409 |       submitLabel: slugify(tokenName).includes("reroll") ? "Reroll" : `Use ${tokenName}`,
 29410 |       submitDisabled: !encounterLine,
 29411 |       className: "encounter-target"
 29412 |     });
 29413 |   }
```

#### Encounter token names — `"Reroll"` — line 41028

```text
 41024 | }
 41025 |
 41026 | function recordRerollTokenHistory({ snapshot, actor, token, sourceEffectId, targetResultId, targetPlayerId, previousName, nextName, resultKind }) {
 41027 |   if (!snapshot || !actor || !token) return null;
 41028 |   const metadata = tokenEffectMetadataByName(token.name || "Reroll");
 41029 |   const activity = { id: sourceEffectId, actorPlayerId: actor.id, targetPlayerId, payload: { tokenName: "Reroll", targetText: previousName } };
 41030 |   const causalUndo = buildCausalTokenEffectUndo(snapshot, activity, { id: "reroll-token", name: "Reroll" });
 41031 |   const summary = `${actor.name} superseded ${previousName || "the previous result"} with ${nextName || "a replacement result"}.`;
 41032 |   return addLogEntry({
```

#### Encounter token names — `"Reroll"` — line 41029

```text
 41025 |
 41026 | function recordRerollTokenHistory({ snapshot, actor, token, sourceEffectId, targetResultId, targetPlayerId, previousName, nextName, resultKind }) {
 41027 |   if (!snapshot || !actor || !token) return null;
 41028 |   const metadata = tokenEffectMetadataByName(token.name || "Reroll");
 41029 |   const activity = { id: sourceEffectId, actorPlayerId: actor.id, targetPlayerId, payload: { tokenName: "Reroll", targetText: previousName } };
 41030 |   const causalUndo = buildCausalTokenEffectUndo(snapshot, activity, { id: "reroll-token", name: "Reroll" });
 41031 |   const summary = `${actor.name} superseded ${previousName || "the previous result"} with ${nextName || "a replacement result"}.`;
 41032 |   return addLogEntry({
 41033 |     action: "token", category: "pokemon", player: actor.name,
```

#### Encounter token names — `"Reroll"` — line 41030

```text
 41026 | function recordRerollTokenHistory({ snapshot, actor, token, sourceEffectId, targetResultId, targetPlayerId, previousName, nextName, resultKind }) {
 41027 |   if (!snapshot || !actor || !token) return null;
 41028 |   const metadata = tokenEffectMetadataByName(token.name || "Reroll");
 41029 |   const activity = { id: sourceEffectId, actorPlayerId: actor.id, targetPlayerId, payload: { tokenName: "Reroll", targetText: previousName } };
 41030 |   const causalUndo = buildCausalTokenEffectUndo(snapshot, activity, { id: "reroll-token", name: "Reroll" });
 41031 |   const summary = `${actor.name} superseded ${previousName || "the previous result"} with ${nextName || "a replacement result"}.`;
 41032 |   return addLogEntry({
 41033 |     action: "token", category: "pokemon", player: actor.name,
 41034 |     item: summary, title: "Reroll replaced an encounter result", summary,
```

#### Old encounter result/event bridge — `"encounter-result"` — line 41036

```text
 41032 |   return addLogEntry({
 41033 |     action: "token", category: "pokemon", player: actor.name,
 41034 |     item: summary, title: "Reroll replaced an encounter result", summary,
 41035 |     type: "encounter-reroll-token", categories: ["tokens", "pokemon", "encounter"],
 41036 |     tags: ["reroll-token", "encounter-result", resultKind || "result"],
 41037 |     playerIds: [actor.id, targetPlayerId].filter(Boolean), pokemonNames: [previousName, nextName].filter(Boolean),
 41038 |     tokenNames: [metadata.name || "Reroll"], linkedEventId: sourceEffectId,
 41039 |     targetResultId, previousResultName: previousName, replacementResultName: nextName,
 41040 |     undoable: true, undone: false, undoData: causalUndo
```

#### Encounter token names — `"Reroll"` — line 41038

```text
 41034 |     item: summary, title: "Reroll replaced an encounter result", summary,
 41035 |     type: "encounter-reroll-token", categories: ["tokens", "pokemon", "encounter"],
 41036 |     tags: ["reroll-token", "encounter-result", resultKind || "result"],
 41037 |     playerIds: [actor.id, targetPlayerId].filter(Boolean), pokemonNames: [previousName, nextName].filter(Boolean),
 41038 |     tokenNames: [metadata.name || "Reroll"], linkedEventId: sourceEffectId,
 41039 |     targetResultId, previousResultName: previousName, replacementResultName: nextName,
 41040 |     undoable: true, undone: false, undoData: causalUndo
 41041 |   });
 41042 | }
```

#### Encounter token names — `"Honey"` — line 41187 — function `augmentHoneyCausalUndoAfterAcquisition` (41179-41192)

```text
 41183 |     && entry.copiedRandomPokemonSessionId === randomSession.id);
 41184 |   if (!historyLog?.undoData) return;
 41185 |   const later = buildCausalTokenEffectUndo(causalBeforeAcquisition, {
 41186 |     id: historyLog.linkedEventId || historyLog.undoData.effectId || "",
 41187 |     payload: { tokenName: "Honey" }
 41188 |   }, { id: "honey-token", name: "Honey" });
 41189 |   historyLog.undoData = mergeCausalTokenUndoData(historyLog.undoData, later);
 41190 |   historyLog.honeyAcquisitionCompleted = true;
 41191 |   historyLog.acquiredPokemonId = randomSession.rosterPokemonId || "";
```

#### Encounter token names — `"Honey"` — line 41188 — function `augmentHoneyCausalUndoAfterAcquisition` (41179-41192)

```text
 41184 |   if (!historyLog?.undoData) return;
 41185 |   const later = buildCausalTokenEffectUndo(causalBeforeAcquisition, {
 41186 |     id: historyLog.linkedEventId || historyLog.undoData.effectId || "",
 41187 |     payload: { tokenName: "Honey" }
 41188 |   }, { id: "honey-token", name: "Honey" });
 41189 |   historyLog.undoData = mergeCausalTokenUndoData(historyLog.undoData, later);
 41190 |   historyLog.honeyAcquisitionCompleted = true;
 41191 |   historyLog.acquiredPokemonId = randomSession.rosterPokemonId || "";
 41192 | }
```

#### Current V2 Route token runtime — `V2_ROUTE_TOKEN_IDS` — line 42507

```text
 42503 |   Object.freeze({ id: "base-or-lower", label: "Route natural tier or lower", weight: 75, offset: 0, baseOrLower: true }),
 42504 |   Object.freeze({ id: "plus-1", label: "+1 tier", weight: 20, offset: 1 }),
 42505 |   Object.freeze({ id: "plus-2", label: "+2 tiers", weight: 5, offset: 2 })
 42506 | ]);
 42507 | const V2_ROUTE_TOKEN_IDS = Object.freeze({
 42508 |   extraEncounter: "extra-encounter-token",
 42509 |   reroll: "reroll-token",
 42510 |   repel: "repel-token",
 42511 |   masterBall: "master-ball-token"
```

#### Current V2 Route token runtime — `V2_ROUTE_TOKEN_IDS` — line 42514

```text
 42510 |   repel: "repel-token",
 42511 |   masterBall: "master-ball-token"
 42512 | });
 42513 | const V2_ROUTE_TOKEN_NAMES = Object.freeze({
 42514 |   [V2_ROUTE_TOKEN_IDS.extraEncounter]: ["extra encounter token", "extra encounter"],
 42515 |   [V2_ROUTE_TOKEN_IDS.reroll]: ["reroll token", "reroll"],
 42516 |   [V2_ROUTE_TOKEN_IDS.repel]: ["repel token", "repel"],
 42517 |   [V2_ROUTE_TOKEN_IDS.masterBall]: ["master ball token", "master ball"]
 42518 | });
```

#### Current V2 Route token runtime — `V2_ROUTE_TOKEN_IDS` — line 42515

```text
 42511 |   masterBall: "master-ball-token"
 42512 | });
 42513 | const V2_ROUTE_TOKEN_NAMES = Object.freeze({
 42514 |   [V2_ROUTE_TOKEN_IDS.extraEncounter]: ["extra encounter token", "extra encounter"],
 42515 |   [V2_ROUTE_TOKEN_IDS.reroll]: ["reroll token", "reroll"],
 42516 |   [V2_ROUTE_TOKEN_IDS.repel]: ["repel token", "repel"],
 42517 |   [V2_ROUTE_TOKEN_IDS.masterBall]: ["master ball token", "master ball"]
 42518 | });
 42519 |
```

#### Current V2 Route token runtime — `V2_ROUTE_TOKEN_IDS` — line 42516

```text
 42512 | });
 42513 | const V2_ROUTE_TOKEN_NAMES = Object.freeze({
 42514 |   [V2_ROUTE_TOKEN_IDS.extraEncounter]: ["extra encounter token", "extra encounter"],
 42515 |   [V2_ROUTE_TOKEN_IDS.reroll]: ["reroll token", "reroll"],
 42516 |   [V2_ROUTE_TOKEN_IDS.repel]: ["repel token", "repel"],
 42517 |   [V2_ROUTE_TOKEN_IDS.masterBall]: ["master ball token", "master ball"]
 42518 | });
 42519 |
 42520 | function activeActionPhaseVersion() {
```

#### Current V2 Route token runtime — `V2_ROUTE_TOKEN_IDS` — line 42517

```text
 42513 | const V2_ROUTE_TOKEN_NAMES = Object.freeze({
 42514 |   [V2_ROUTE_TOKEN_IDS.extraEncounter]: ["extra encounter token", "extra encounter"],
 42515 |   [V2_ROUTE_TOKEN_IDS.reroll]: ["reroll token", "reroll"],
 42516 |   [V2_ROUTE_TOKEN_IDS.repel]: ["repel token", "repel"],
 42517 |   [V2_ROUTE_TOKEN_IDS.masterBall]: ["master ball token", "master ball"]
 42518 | });
 42519 |
 42520 | function activeActionPhaseVersion() {
 42521 |   return normalizeActionPhaseVersion(state.ruleset?.actionPhaseVersion || state.actionPhaseVersion || DEFAULT_ACTION_PHASE_VERSION);
```

#### Current V2 Route token runtime — `V2_ROUTE_TOKEN_IDS` — line 43857 — function `getEncounterCapabilitiesForPlayer` (43851-43872)

```text
 43853 |   const routeState = v2EnsureRouteSeriesState(state.series);
 43854 |   const { route } = v2FindResult(routeState, result?.resultId);
 43855 |   const unresolved = Boolean(result && result.status === "unresolved");
 43856 |   const routeView = route ? getRouteViewForPlayer(routeState, route.routeNumber, playerId) : null;
 43857 |   const rerollTokens = v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.reroll);
 43858 |   const duplicate = unresolved && v2ResultIsDuplicateForPlayer(result, playerId);
 43859 |   return {
 43860 |     canAcquire: unresolved,
 43861 |     canPersonalDuplicateReroll: duplicate,
```

#### Current V2 Route token runtime — `V2_ROUTE_TOKEN_IDS` — line 43890 — function `getMasterBallOpportunityCapabilitiesForPlayer` (43887-43917)

```text
 43886 |
 43887 | function getMasterBallOpportunityCapabilitiesForPlayer(routeState, opportunityId, playerId) {
 43888 |   const player = state.players.find((entry) => entry.id === playerId);
 43889 |   const { route, opportunity } = v2FindOpportunity(routeState, opportunityId);
 43890 |   const tokens = v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.masterBall);
 43891 |   const view = route ? getRouteViewForPlayer(routeState, route.routeNumber, playerId) : null;
 43892 |   const eligibleResidents = view?.masterBallEligibleResidents || [];
 43893 |   const canUseMasterBall = Boolean(
 43894 |     player
```

#### Current V2 Route token runtime — `V2_ROUTE_TOKEN_IDS` — line 43922 — function `getRouteRepelCapabilitiesForPlayer` (43919-43974)

```text
 43918 |
 43919 | function getRouteRepelCapabilitiesForPlayer(routeState, routeNumber, playerId) {
 43920 |   const route = v2FindRoute(routeState, routeNumber);
 43921 |   const player = state.players.find((entry) => entry.id === playerId);
 43922 |   const repelTokens = v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.repel);
 43923 |   const activeSuppressed = new Set((route?.suppressions || [])
 43924 |     .filter((entry) => entry.status !== "expired" && entry.status !== "removed")
 43925 |     .flatMap((entry) => entry.residentIds || []));
 43926 |   const tiers = new Map();
```

#### Encounter token names — `"Repel"` — line 44033

```text
 44029 |   const legalRepelTiers = repelCapabilities.tiers.filter((tier) => tier.canApplyRepel);
 44030 |   if (repelCapabilities.repelTokenInventoryIds.length && legalRepelTiers.length) {
 44031 |     capabilities.push({
 44032 |       id: "repel",
 44033 |       label: "Repel",
 44034 |       description: "Suppress exactly 5 residents of one tier.",
 44035 |       marker: "R",
 44036 |       countLabel: `x${repelCapabilities.repelTokenInventoryIds.length}`,
 44037 |       sourceLabel: "Inventory",
```

#### Current V2 Route token runtime — `V2_ROUTE_TOKEN_IDS` — line 44091

```text
 44087 |     breakdown: { purchaseId, price: V2_EXTRA_ENCOUNTER_PRICE }
 44088 |   });
 44089 |   const item = {
 44090 |     purchaseId,
 44091 |     id: createInventoryEntryId(V2_ROUTE_TOKEN_IDS.extraEncounter),
 44092 |     catalogId: V2_ROUTE_TOKEN_IDS.extraEncounter,
 44093 |     canonicalId: V2_ROUTE_TOKEN_IDS.extraEncounter,
 44094 |     name: "Extra Encounter Token",
 44095 |     type: "TOKEN",
```

#### Current V2 Route token runtime — `V2_ROUTE_TOKEN_IDS` — line 44092

```text
 44088 |   });
 44089 |   const item = {
 44090 |     purchaseId,
 44091 |     id: createInventoryEntryId(V2_ROUTE_TOKEN_IDS.extraEncounter),
 44092 |     catalogId: V2_ROUTE_TOKEN_IDS.extraEncounter,
 44093 |     canonicalId: V2_ROUTE_TOKEN_IDS.extraEncounter,
 44094 |     name: "Extra Encounter Token",
 44095 |     type: "TOKEN",
 44096 |     tokenType: "encounter",
```

#### Current V2 Route token runtime — `V2_ROUTE_TOKEN_IDS` — line 44093

```text
 44089 |   const item = {
 44090 |     purchaseId,
 44091 |     id: createInventoryEntryId(V2_ROUTE_TOKEN_IDS.extraEncounter),
 44092 |     catalogId: V2_ROUTE_TOKEN_IDS.extraEncounter,
 44093 |     canonicalId: V2_ROUTE_TOKEN_IDS.extraEncounter,
 44094 |     name: "Extra Encounter Token",
 44095 |     type: "TOKEN",
 44096 |     tokenType: "encounter",
 44097 |     tier: "Encounter",
```

#### Encounter token names — `"Extra Encounter Token"` — line 44094

```text
 44090 |     purchaseId,
 44091 |     id: createInventoryEntryId(V2_ROUTE_TOKEN_IDS.extraEncounter),
 44092 |     catalogId: V2_ROUTE_TOKEN_IDS.extraEncounter,
 44093 |     canonicalId: V2_ROUTE_TOKEN_IDS.extraEncounter,
 44094 |     name: "Extra Encounter Token",
 44095 |     type: "TOKEN",
 44096 |     tokenType: "encounter",
 44097 |     tier: "Encounter",
 44098 |     price: V2_EXTRA_ENCOUNTER_PRICE,
```

#### Current V2 Route token runtime — `V2_ROUTE_TOKEN_IDS` — line 44145

```text
 44141 |   const eligibleResidents = v2EligibleResidents(route, [], { routeState, playerId });
 44142 |   if (!eligibleResidents.length || !v2RouteHasPositiveEncounterWeight(eligibleResidents)) {
 44143 |     throw new Error(`No eligible residents remain on Route ${route.routeNumber} for ${player.name}.`);
 44144 |   }
 44145 |   const token = v2ConsumeExactRouteToken(player, V2_ROUTE_TOKEN_IDS.extraEncounter, tokenInventoryId);
 44146 |   const operationId = v2NextEffectOperationId(state.series, "v2-extra-encounter");
 44147 |   const { opportunity } = v2CreateRouteEncounterOpportunity({
 44148 |     playerId,
 44149 |     routeNumber,
```

#### Current V2 Route token runtime — `V2_ROUTE_TOKEN_IDS` — line 44194

```text
 44190 |   const existingRequest = key ? state.v2?.routeOperationRequests?.[key] : null;
 44191 |   if (existingRequest?.resultId && result?.resultId === existingRequest.resultId) return result;
 44192 |   const existingTokenOperation = v2FindRouteEffectOperationByToken(state.series, "reroll-token", tokenInventoryId, player.id);
 44193 |   if (existingTokenOperation?.resultId === result?.resultId) return result;
 44194 |   const token = v2ConsumeExactRouteToken(player, V2_ROUTE_TOKEN_IDS.reroll, tokenInventoryId);
 44195 |   const rerolled = v2RerollRouteResult(result, player.id, { kind: "reroll-token", reason: "reroll-token", tokenInventoryId: token.id }, { token });
 44196 |   const operationId = v2NextEffectOperationId(state.series, "v2-reroll-token");
 44197 |   const operation = {
 44198 |     operationId,
```

#### Current V2 Route token runtime — `V2_ROUTE_TOKEN_IDS` — line 44233

```text
 44229 |   const existingRequest = key ? state.v2?.routeOperationRequests?.[key] : null;
 44230 |   if (existingRequest?.suppressionId) return (route.suppressions || []).find((entry) => entry.suppressionId === existingRequest.suppressionId) || null;
 44231 |   const existingTokenOperation = v2FindRouteEffectOperationByToken(state.series, "repel-token", tokenInventoryId, playerId);
 44232 |   if (existingTokenOperation?.suppressionId) return (route.suppressions || []).find((entry) => entry.suppressionId === existingTokenOperation.suppressionId) || null;
 44233 |   const token = v2ConsumeExactRouteToken(player, V2_ROUTE_TOKEN_IDS.repel, tokenInventoryId);
 44234 |   const rng = v2CreateRng(`${routeState.seed}:${route.routeId}:repel:${normalizedTier}:${routeState.revision}`);
 44235 |   const pool = [...candidates];
 44236 |   const selected = [];
 44237 |   while (selected.length < V2_REPEL_SUPPRESSION_COUNT) {
```

#### Current V2 Route token runtime — `V2_ROUTE_TOKEN_IDS` — line 44295

```text
 44291 |   const resident = (route.residents || []).find((entry) => entry.residentId === residentId);
 44292 |   if (!resident || !(view.masterBallEligibleResidents || []).some((entry) => entry.residentId === residentId)) {
 44293 |     throw new Error("Master Ball can only select a resident revealed to that player on that Route.");
 44294 |   }
 44295 |   const token = v2ConsumeExactRouteToken(player, V2_ROUTE_TOKEN_IDS.masterBall, tokenInventoryId);
 44296 |   const resultId = v2NextCounterId(routeState, "result", "route-result");
 44297 |   const result = {
 44298 |     resultId,
 44299 |     status: "unresolved",
```

#### Current V2 Route token runtime — `function useV2RouteRerollToken(` — line 44798 — function `useV2RouteRerollToken` (44798-44807)

```text
 44794 |     alert(error.message || "Unable to reroll V2 Route encounter.");
 44795 |   }
 44796 | }
 44797 |
 44798 | function useV2RouteRerollToken(actionId, tokenInventoryId = "") {
 44799 |   try {
 44800 |     const player = activePlayer();
 44801 |     const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.reroll)[0]?.id || "";
 44802 |     const result = v2UseRerollTokenOnAction(actionId, tokenId, { actingPlayerId: player.id });
```

#### Current V2 Route token runtime — `V2_ROUTE_TOKEN_IDS` — line 44801 — function `useV2RouteRerollToken` (44798-44807)

```text
 44797 |
 44798 | function useV2RouteRerollToken(actionId, tokenInventoryId = "") {
 44799 |   try {
 44800 |     const player = activePlayer();
 44801 |     const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.reroll)[0]?.id || "";
 44802 |     const result = v2UseRerollTokenOnAction(actionId, tokenId, { actingPlayerId: player.id });
 44803 |     v2PersistRenderAndPublishRouteActivity({ stage: "rerolled", actorPlayerId: player.id, seriesId: state.series, routeNumber: result.routeNumber });
 44804 |   } catch (error) {
 44805 |     alert(error.message || "Unable to use V2 Reroll Token.");
```

#### Current V2 Route token runtime — `function useV2ExtraEncounter(` — line 44818 — function `useV2ExtraEncounter` (44818-44834)

```text
 44814 |     alert(error.message || "Unable to purchase Extra Encounter.");
 44815 |   }
 44816 | }
 44817 |
 44818 | function useV2ExtraEncounter(routeNumber, tokenInventoryId = "") {
 44819 |   try {
 44820 |     const player = activePlayer();
 44821 |     const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.extraEncounter)[0]?.id || "";
 44822 |     const operation = v2UseExtraEncounter(player.id, routeNumber, tokenId);
```

#### Current V2 Route token runtime — `V2_ROUTE_TOKEN_IDS` — line 44821 — function `useV2ExtraEncounter` (44818-44834)

```text
 44817 |
 44818 | function useV2ExtraEncounter(routeNumber, tokenInventoryId = "") {
 44819 |   try {
 44820 |     const player = activePlayer();
 44821 |     const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.extraEncounter)[0]?.id || "";
 44822 |     const operation = v2UseExtraEncounter(player.id, routeNumber, tokenId);
 44823 |     const workspace = v2RouteWorkspaceState(state.series);
 44824 |     workspace.screen = "result";
 44825 |     workspace.selectedActionId = "extra-encounter";
```

#### Current V2 Route token runtime — `function applyV2RouteRepel(` — line 44836 — function `applyV2RouteRepel` (44836-44845)

```text
 44832 |     alert(error.message || "Unable to use Extra Encounter.");
 44833 |   }
 44834 | }
 44835 |
 44836 | function applyV2RouteRepel(routeNumber, battleTierId, tokenInventoryId = "") {
 44837 |   try {
 44838 |     const player = activePlayer();
 44839 |     const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.repel)[0]?.id || "";
 44840 |     v2ApplyRepelToRoute(player.id, routeNumber, battleTierId, tokenId);
```

#### Current V2 Route token runtime — `V2_ROUTE_TOKEN_IDS` — line 44839 — function `applyV2RouteRepel` (44836-44845)

```text
 44835 |
 44836 | function applyV2RouteRepel(routeNumber, battleTierId, tokenInventoryId = "") {
 44837 |   try {
 44838 |     const player = activePlayer();
 44839 |     const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.repel)[0]?.id || "";
 44840 |     v2ApplyRepelToRoute(player.id, routeNumber, battleTierId, tokenId);
 44841 |     v2PersistAndRender();
 44842 |   } catch (error) {
 44843 |     alert(error.message || "Unable to apply V2 Repel.");
```

#### Current V2 Route token runtime — `function useV2MasterBallOnOpportunity(` — line 44847 — function `useV2MasterBallOnOpportunity` (44847-44864)

```text
 44843 |     alert(error.message || "Unable to apply V2 Repel.");
 44844 |   }
 44845 | }
 44846 |
 44847 | function useV2MasterBallOnOpportunity(opportunityId, residentId, tokenInventoryId = "") {
 44848 |   try {
 44849 |     const player = activePlayer();
 44850 |     const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.masterBall)[0]?.id || "";
 44851 |     const operation = v2UseMasterBallOnOpportunity(player.id, opportunityId, residentId, tokenId);
```

#### Current V2 Route token runtime — `V2_ROUTE_TOKEN_IDS` — line 44850 — function `useV2MasterBallOnOpportunity` (44847-44864)

```text
 44846 |
 44847 | function useV2MasterBallOnOpportunity(opportunityId, residentId, tokenInventoryId = "") {
 44848 |   try {
 44849 |     const player = activePlayer();
 44850 |     const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.masterBall)[0]?.id || "";
 44851 |     const operation = v2UseMasterBallOnOpportunity(player.id, opportunityId, residentId, tokenId);
 44852 |     const workspace = v2RouteWorkspaceState(state.series);
 44853 |     workspace.screen = "result";
 44854 |     workspace.selectedActionId = "encounter";
```

#### Current V2 Route token runtime — `V2_ROUTE_TOKEN_IDS` — line 45040 — function `getRouteEncounterRailCapabilitiesForPlayer` (45028-45077)

```text
 45036 |     };
 45037 |   }
 45038 |   const workspace = v2RouteWorkspaceState(routeState.seriesId || state.series);
 45039 |   const pendingOpportunity = v2RoutePendingOpportunityForPlayer(routeState, route.routeNumber, playerId, workspace.activeOpportunityId);
 45040 |   const extraTokens = v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.extraEncounter);
 45041 |   const extraEligible = v2EligibleResidents(route, [], { routeState, playerId });
 45042 |   const progressionLegal = route.routeNumber <= v2CurrentProgressionRoute();
 45043 |   const extraCanUse = progressionLegal
 45044 |     && !pendingOpportunity
```

#### Encounter token names — `"Reroll"` — line 45681 — function `renderWheelPanel` (45526-45683)

```text
 45677 |   els.finishWheelSession.textContent = isReviewing ? "Done / Close Session" : "Finish Session";
 45678 |   els.finishWheelSession.disabled = wheel.id === "trainerClassWheel" && !rolls.length && !isReviewing;
 45679 |   els.skipWheelAnimation.checked = Boolean(state.skipWheelAnimation);
 45680 |   els.wheelHistory.innerHTML = rolls.length
 45681 |     ? rolls.map((roll, index) => `<div><strong>#${index + 1}: ${escapeHtml(roll.outcomeLabel)}</strong>${isTrainerClassWheel ? `<span>${roll.reroll ? "Reroll" : "Initial roll"}</span>` : `<span>${roll.cost ? formatMoney(roll.cost) : ""}${roll.reward ? ` - ${escapeHtml(roll.reward.name)}` : ""}</span>`}</div>`).join("")
 45682 |     : `<p class="empty-state compact">Spin results for this visit will appear here.</p>`;
 45683 | }
 45684 |
 45685 | function renderPhaseControl() {
```

#### Old encounter result/event bridge — `"encounterResult"` — line 46947 — function `launchTokenScenarioSandbox` (46879-47013)

```text
 46943 |     state.players.forEach((player) => grantTokenScenarioInventory(player, possessions === "all" ? contract.list : responseDefinitions));
 46944 |   }
 46945 |   addTokenScenarioPersistentEffect(els.adminTokenScenarioPersistent?.value || "none", actor, target);
 46946 |
 46947 |   if (["actionActor", "normalControl", "targetedResponse", "nonTargetedResponse", "nestedResponse", "encounterBefore", "encounterResult", "wheelManual", "fieldActive", "lingeringActive", "expiring", "invalidTarget", "insufficientMoney", "severalResponses"].includes(kind)) {
 46948 |     setTokenScenarioPhase("action");
 46949 |   }
 46950 |   if (kind === "teamBuilding") setTokenScenarioPhase("battle", "teamPreparation");
 46951 |   if (kind === "teamLock") setTokenScenarioPhase("battle", "teamSubmissionLock");
```

#### Old encounter result/event bridge — `"encounterResult"` — line 46988 — function `launchTokenScenarioSandbox` (46879-47013)

```text
 46984 |       note: `${responder.name} used Immunity in the scenario.`
 46985 |     });
 46986 |   } else if (kind === "encounterBefore") {
 46987 |     activity = createTokenScenarioEvent({ actor, target, title: `${actor.name}'s encounter is about to begin.`, message: "Choose before-roll Encounter effects now.", type: "encounter-before-roll", targeted: false, payload: { encounterStage: "beforeRoll" } });
 46988 |   } else if (kind === "encounterResult") {
 46989 |     activity = createTokenScenarioEvent({ actor, target, title: `${actor.name} rolled Abra.`, message: `${actor.name} rolled Abra. The result is pending.`, type: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT, targeted: false, payload: { encounterStage: "result", resultName: "Abra" } });
 46990 |   } else if (kind === "wheelManual") {
 46991 |     const guided = (contract?.list || []).find((definition) => definition.resolverMode === EFFECT_RESOLUTION_MODES.GUIDED) || tokenDefinition;
 46992 |     activity = createTokenScenarioEvent({ actor, target, tokenDefinition: guided, title: `${actor.name} used ${guided.name}.`, message: `${guided.name} is waiting for its guided result.`, type: TOKEN_PENDING_EVENT_TYPES.CONTROL_TOKEN, sourceType: "token-use", targeted: guided.targetScope !== "tableWide" });
```

#### Old encounter result/event bridge — `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 46989 — function `launchTokenScenarioSandbox` (46879-47013)

```text
 46985 |     });
 46986 |   } else if (kind === "encounterBefore") {
 46987 |     activity = createTokenScenarioEvent({ actor, target, title: `${actor.name}'s encounter is about to begin.`, message: "Choose before-roll Encounter effects now.", type: "encounter-before-roll", targeted: false, payload: { encounterStage: "beforeRoll" } });
 46988 |   } else if (kind === "encounterResult") {
 46989 |     activity = createTokenScenarioEvent({ actor, target, title: `${actor.name} rolled Abra.`, message: `${actor.name} rolled Abra. The result is pending.`, type: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT, targeted: false, payload: { encounterStage: "result", resultName: "Abra" } });
 46990 |   } else if (kind === "wheelManual") {
 46991 |     const guided = (contract?.list || []).find((definition) => definition.resolverMode === EFFECT_RESOLUTION_MODES.GUIDED) || tokenDefinition;
 46992 |     activity = createTokenScenarioEvent({ actor, target, tokenDefinition: guided, title: `${actor.name} used ${guided.name}.`, message: `${guided.name} is waiting for its guided result.`, type: TOKEN_PENDING_EVENT_TYPES.CONTROL_TOKEN, sourceType: "token-use", targeted: guided.targetScope !== "tableWide" });
 46993 |   } else if (kind === "invalidTarget") {
```

#### Old encounter result/event bridge — `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 47526 — function `createAdminTestEvent` (47508-47588)

```text
 47522 |     }
 47523 |   };
 47524 |   const presets = {
 47525 |     encounter: {
 47526 |       type: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT,
 47527 |       title: `${actor.name} test encounter result`,
 47528 |       message: `${actor.name} rolled a test encounter result. Encounter tokens and trades may happen before finalizing.`,
 47529 |       sourceType: "admin-test-encounter",
 47530 |       payload: { tokenTimingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER, effectApplication: "audit" }
```

#### Encounter token names — `"Honey"` — line 48903 — function `ensureHoneyEndOfActionProcedures` (48876-48910)

```text
 48899 |           type: "phase-boundary-procedure", title: `${player.name} may use Honey.`,
 48900 |           message: `${player.name} may copy one completed Encounter from this Action Phase.`,
 48901 |           actorPlayerId: player.id, targetPlayerId: player.id, sourceType: "honey-end-action",
 48902 |           sourceId: id, responseTypes: [], eligiblePlayerIds: [],
 48903 |           payload: { procedureId: id, tokenName: "Honey", requiresRequiredChoice: true, requiredChoicePlayerId: player.id, responsesAllowed: false, transactionsAllowed: false }
 48904 |         });
 48905 |       }
 48906 |       created.push({ procedure, activity });
 48907 |     });
```

#### Encounter token names — `"Honey"` — line 48986 — function `resolveHoneyEndOfActionProcedure` (48948-49010)

```text
 48982 |   state.randomPokemonDrawerOpen = Boolean(result.randomSession);
 48983 |   const consumption = addTokenConsumptionRecord({
 48984 |     player,
 48985 |     token,
 48986 |     tokenName: "Honey",
 48987 |     metadata: tokenEffectMetadataByName("Honey"),
 48988 |     linkedEventId: activity.id,
 48989 |     source: "honey-end-of-action"
 48990 |   });
```

#### Encounter token names — `"Honey"` — line 48987 — function `resolveHoneyEndOfActionProcedure` (48948-49010)

```text
 48983 |   const consumption = addTokenConsumptionRecord({
 48984 |     player,
 48985 |     token,
 48986 |     tokenName: "Honey",
 48987 |     metadata: tokenEffectMetadataByName("Honey"),
 48988 |     linkedEventId: activity.id,
 48989 |     source: "honey-end-of-action"
 48990 |   });
 48991 |   const causalUndo = buildCausalTokenEffectUndo(causalBeforeHoney, activity, { id: "honey-token", name: "Honey" });
```

#### Encounter token names — `"Honey"` — line 48991 — function `resolveHoneyEndOfActionProcedure` (48948-49010)

```text
 48987 |     metadata: tokenEffectMetadataByName("Honey"),
 48988 |     linkedEventId: activity.id,
 48989 |     source: "honey-end-of-action"
 48990 |   });
 48991 |   const causalUndo = buildCausalTokenEffectUndo(causalBeforeHoney, activity, { id: "honey-token", name: "Honey" });
 48992 |   causalUndo.procedureId = procedure.id;
 48993 |   causalUndo.copiedRandomPokemonSessionId = result.randomSession?.id || "";
 48994 |   addLogEntry({
 48995 |     action: "token", category: "pokemon", player: player.name,
```

#### Encounter token names — `"Honey"` — line 48998 — function `resolveHoneyEndOfActionProcedure` (48948-49010)

```text
 48994 |   addLogEntry({
 48995 |     action: "token", category: "pokemon", player: player.name,
 48996 |     item: result.reason, title: `${player.name} used Honey`, summary: result.reason,
 48997 |     type: "honey-encounter-copy", categories: ["tokens", "pokemon", "encounter"],
 48998 |     tags: ["honey", "encounter-copy", "end-of-action"], playerIds: [player.id], tokenNames: ["Honey"],
 48999 |     linkedEventId: activity.id,
 49000 |     tokenConsumptionId: consumption?.id || "",
 49001 |     encounterCopyRecordId: result.record?.id || "",
 49002 |     copiedRandomPokemonSessionId: result.randomSession?.id || "",
```

#### Old encounter resolver IDs — `"extraEncounter"` — line 56378 — function `applyActivationOverlay` (56356-56435)

```text
 56374 |       applyStatusTokenActivation(player, effect, statusDefinition);
 56375 |       return;
 56376 |     }
 56377 |     const utilityDefinition = activationDraft.utilityDefinitionId ? utilityTokenDefinitions[activationDraft.utilityDefinitionId] : utilityTokenDefinitionByName(effect.name);
 56378 |     if (utilityDefinition && ["extraEncounter", "safeguard"].includes(engineMetadata.resolverId)) {
 56379 |       const targetPlayer = engineMetadata.selfOnly
 56380 |         ? player
 56381 |         : state.players.find((candidate) => candidate.id === els.activationTargetPlayer.value) || player;
 56382 |       closeActivationOverlay();
```

### `scripts/run-token-qa-coverage.js`

#### Old encounter verification/tooling — `test-encounter-token-runtime.js` — line 11

```text
     7 |   "scripts/test-control-token-foundation.js",
     8 |   "scripts/test-token-controller-integration.js",
     9 |   "scripts/test-token-completion-slice.js",
    10 |   "scripts/test-token-lifecycle-slice.js",
    11 |   "scripts/test-encounter-token-runtime.js",
    12 |   "scripts/test-token-result-summary.js",
    13 |   "scripts/test-standard-curse-tokens.js",
    14 |   "scripts/test-settled-token-rulings.js",
    15 |   "scripts/test-settled-effect-batch.js",
```

#### Old encounter verification/tooling — `encounter-token-runtime.js` — line 11

```text
     7 |   "scripts/test-control-token-foundation.js",
     8 |   "scripts/test-token-controller-integration.js",
     9 |   "scripts/test-token-completion-slice.js",
    10 |   "scripts/test-token-lifecycle-slice.js",
    11 |   "scripts/test-encounter-token-runtime.js",
    12 |   "scripts/test-token-result-summary.js",
    13 |   "scripts/test-standard-curse-tokens.js",
    14 |   "scripts/test-settled-token-rulings.js",
    15 |   "scripts/test-settled-effect-batch.js",
```

### `scripts/test-encounter-token-runtime.js`

#### Old encounter verification/tooling — `encounter-token-runtime.js` — line 6

```text
     2 |
     3 | const assert = require("node:assert/strict");
     4 | const test = require("node:test");
     5 |
     6 | const runtime = require("../encounter-token-runtime.js");
     7 |
     8 | function fixture() {
     9 |   return {
    10 |     series: "Kanto",
```

### `scripts/test-token-sandbox.js`

#### Old encounter verification/tooling — `encounter-token-runtime.js` — line 17

```text
    13 |   synchronizeConnectedRevision
    14 | } = require("../token-sandbox-session.js");
    15 | const { createScenarioController } = require("../token-control-controller.js");
    16 | const controlTokenEffects = require("../token-control-effects.js");
    17 | const encounterTokenRuntime = require("../encounter-token-runtime.js");
    18 | const { controlStateFixture } = require("./token-controller-test-fixture.js");
    19 |
    20 | function stateFixture(marker = "real") {
    21 |   return {
```

#### Encounter token names — `"Reroll"` — line 1110

```text
  1106 |   steevee.inventory.push(
  1107 |     { id: "sandbox-cold-token", canonicalId: "cold-wave", name: "Cold Wave", type: "TOKEN" },
  1108 |     { id: "sandbox-purge-token", canonicalId: "purge-curse", name: "Purge Curse", type: "TOKEN" }
  1109 |   );
  1110 |   gold.inventory.push({ id: "sandbox-reroll-token", canonicalId: "reroll-token", name: "Reroll", type: "TOKEN" });
  1111 |   baseline.lingeringStatuses.push({ id: "sandbox-explicit-ongoing", type: "class-aura", status: "active", isOngoingEffect: true, series: "Kanto", gym: 1 });
  1112 |   baseline.randomPokemonSessions = [
  1113 |     { id: "sandbox-honey-source", sourceType: "encounter", sourceLabel: "Encounter Wheel", status: "confirmed", series: "Kanto", gym: 1, resultDisplayName: "Rotom-Wash", tierId: "B", level: 51, resultMetadata: { speciesId: "rotom", speciesName: "Rotom", form: "Wash" } },
  1114 |     { id: "sandbox-reroll-result", sourceType: "encounter", status: "pending", rerollable: true, playerId: "gold", ownerPlayerId: "gold", resultOwnerPlayerId: "gold", resultPokemonName: "abra", resultDisplayName: "Abra", resultMetadata: { key: "abra", displayName: "Abra" } }
```

#### Old encounter result/event bridge — `sourceType: "encounter"` — line 1113

```text
  1109 |   );
  1110 |   gold.inventory.push({ id: "sandbox-reroll-token", canonicalId: "reroll-token", name: "Reroll", type: "TOKEN" });
  1111 |   baseline.lingeringStatuses.push({ id: "sandbox-explicit-ongoing", type: "class-aura", status: "active", isOngoingEffect: true, series: "Kanto", gym: 1 });
  1112 |   baseline.randomPokemonSessions = [
  1113 |     { id: "sandbox-honey-source", sourceType: "encounter", sourceLabel: "Encounter Wheel", status: "confirmed", series: "Kanto", gym: 1, resultDisplayName: "Rotom-Wash", tierId: "B", level: 51, resultMetadata: { speciesId: "rotom", speciesName: "Rotom", form: "Wash" } },
  1114 |     { id: "sandbox-reroll-result", sourceType: "encounter", status: "pending", rerollable: true, playerId: "gold", ownerPlayerId: "gold", resultOwnerPlayerId: "gold", resultPokemonName: "abra", resultDisplayName: "Abra", resultMetadata: { key: "abra", displayName: "Abra" } }
  1115 |   ];
  1116 |   const baselineBytes = JSON.stringify(baseline);
  1117 |   const manager = createSessionManager({ createSessionId: () => "sandbox-lifecycle-slice" });
```

#### Old encounter result/event bridge — `sourceType: "encounter"` — line 1114

```text
  1110 |   gold.inventory.push({ id: "sandbox-reroll-token", canonicalId: "reroll-token", name: "Reroll", type: "TOKEN" });
  1111 |   baseline.lingeringStatuses.push({ id: "sandbox-explicit-ongoing", type: "class-aura", status: "active", isOngoingEffect: true, series: "Kanto", gym: 1 });
  1112 |   baseline.randomPokemonSessions = [
  1113 |     { id: "sandbox-honey-source", sourceType: "encounter", sourceLabel: "Encounter Wheel", status: "confirmed", series: "Kanto", gym: 1, resultDisplayName: "Rotom-Wash", tierId: "B", level: 51, resultMetadata: { speciesId: "rotom", speciesName: "Rotom", form: "Wash" } },
  1114 |     { id: "sandbox-reroll-result", sourceType: "encounter", status: "pending", rerollable: true, playerId: "gold", ownerPlayerId: "gold", resultOwnerPlayerId: "gold", resultPokemonName: "abra", resultDisplayName: "Abra", resultMetadata: { key: "abra", displayName: "Abra" } }
  1115 |   ];
  1116 |   const baselineBytes = JSON.stringify(baseline);
  1117 |   const manager = createSessionManager({ createSessionId: () => "sandbox-lifecycle-slice" });
  1118 |   const entered = manager.enter({ realState: baseline, revision: 12, revisionVerified: true, persistenceQuiescent: true, scenarioName: "Token lifecycle slice" });
```

### `scripts/token-qa-coverage-data.js`

#### Old encounter verification/tooling — `test-encounter-token-runtime.js` — line 1391

```text
  1387 |       id: "EXTRA-ENCOUNTER-RUNTIME-001",
  1388 |       name: "Create or extend exactly one authoritative Encounter roll",
  1389 |       coverage: "Covered",
  1390 |       level: "Unit",
  1391 |       testFile: "scripts/test-encounter-token-runtime.js",
  1392 |       testId: "ETR-003",
  1393 |       setup: "Gold has an open two-roll Encounter session and is selected as the exact Extra Encounter target.",
  1394 |       action: "Grant Extra Encounter through the shared Encounter Token runtime.",
  1395 |       expected: "The same session becomes pending with a maximum of exactly three rolls.",
```

#### Old encounter verification/tooling — `encounter-token-runtime.js` — line 1391

```text
  1387 |       id: "EXTRA-ENCOUNTER-RUNTIME-001",
  1388 |       name: "Create or extend exactly one authoritative Encounter roll",
  1389 |       coverage: "Covered",
  1390 |       level: "Unit",
  1391 |       testFile: "scripts/test-encounter-token-runtime.js",
  1392 |       testId: "ETR-003",
  1393 |       setup: "Gold has an open two-roll Encounter session and is selected as the exact Extra Encounter target.",
  1394 |       action: "Grant Extra Encounter through the shared Encounter Token runtime.",
  1395 |       expected: "The same session becomes pending with a maximum of exactly three rolls.",
```

### `token-effect-contract.js`

#### Old encounter verification/tooling — `"encounter-token-runtime"` — line 110

```text
   106 |     "token-sandbox-isolation",
   107 |     "token-undo-repair",
   108 |     "token-inventory-runtime",
   109 |     "standard-curse-species-lifecycle",
   110 |     "encounter-token-runtime",
   111 |     "follow-me-e2e",
   112 |     "ditto-inventory-e2e",
   113 |     "lingering-aroma-e2e",
   114 |     "move-deleter-e2e",
```

#### Old encounter verification/tooling — `"encounter-token-runtime"` — line 262

```text
   258 |       contractDefinitionRevision
   259 |     }),
   260 |     "extra-encounter-token": Object.freeze({
   261 |       status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
   262 |       tests: Object.freeze(["token-declaration-timing", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "encounter-token-runtime"]),
   263 |       evidence: "Action-only declaration, exact chosen-player validation, one authoritative Encounter roll grant, open-session extension, standalone session creation, stable grant identity, duplicate prevention, refresh persistence, normal Encounter completion, and snapshot undo are covered by focused runtime and integration tests.",
   264 |       verifiedAt: "2026-07-29",
   265 |       contractDefinitionRevision
   266 |     }),
```

#### Old encounter verification/tooling — `"encounter-token-runtime"` — line 332

```text
   328 |       contractDefinitionRevision
   329 |     }),
   330 |     "reroll-token": Object.freeze({
   331 |       status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
   332 |       tests: Object.freeze(["encounter-token-runtime", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "lifecycle-completion-slice-e2e"]),
   333 |       evidence: "Exact unresolved Encounter and wheel result identity, canonical replacement, superseded original revision, stale rejection, duplicate operation identity, multiple-copy inventory safety, normal acquisition continuation, production refresh, causal History undo, and sandbox isolation are covered by TLS-004, BROWSER-028, and TSB-027.",
   334 |       verifiedAt: "2026-08-04",
   335 |       contractDefinitionRevision
   336 |     }),
```

#### Old encounter verification/tooling — `"encounter-token-runtime"` — line 339

```text
   335 |       contractDefinitionRevision
   336 |     }),
   337 |     "honey-token": Object.freeze({
   338 |       status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
   339 |       tests: Object.freeze(["encounter-token-runtime", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "lifecycle-completion-slice-e2e"]),
   340 |       evidence: "Exact finalized Encounter selection, fresh nonrecursive copy identity, canonical species/form/tier/level and intrinsic payload, normal acquisition handoff, duplicate and stale safety, production refresh, causal History undo through acquired roster creation, and sandbox isolation are covered by TLS-005, SEB-004, BROWSER-029, and TSB-027.",
   341 |       verifiedAt: "2026-08-04",
   342 |       contractDefinitionRevision
   343 |     }),
```

#### Old encounter result/event bridge — `"encounterResult"` — line 355

```text
   351 |   });
   352 |
   353 |   const legalTimingValues = Object.freeze([
   354 |     "gymStartPreparationControl", "action", "actionOpen", "teamBuilding", "shop", "shopOpen", "postBattleControl", "responseWindow",
   355 |     "encounterBeforeRoll", "encounterResult", "wheelWindow", "sabotage", "teamPreview", "battlePayout",
   356 |     "endOfActionPhaseProcedure", "endOfBattlePhaseProcedure"
   357 |   ]);
   358 |   const legalControlContextValues = Object.freeze([
   359 |     "gymStartPreparationControl", "actionOpenControl", "teamBuilding", "shop", "postBattleControl", "sabotageCurseWindow"
```

#### Old encounter result/event bridge — `"encounterBeforeRoll"` — line 355

```text
   351 |   });
   352 |
   353 |   const legalTimingValues = Object.freeze([
   354 |     "gymStartPreparationControl", "action", "actionOpen", "teamBuilding", "shop", "shopOpen", "postBattleControl", "responseWindow",
   355 |     "encounterBeforeRoll", "encounterResult", "wheelWindow", "sabotage", "teamPreview", "battlePayout",
   356 |     "endOfActionPhaseProcedure", "endOfBattlePhaseProcedure"
   357 |   ]);
   358 |   const legalControlContextValues = Object.freeze([
   359 |     "gymStartPreparationControl", "actionOpenControl", "teamBuilding", "shop", "postBattleControl", "sabotageCurseWindow"
```

#### Encounter-family contract model — `"wheelWindow"` — line 355

```text
   351 |   });
   352 |
   353 |   const legalTimingValues = Object.freeze([
   354 |     "gymStartPreparationControl", "action", "actionOpen", "teamBuilding", "shop", "shopOpen", "postBattleControl", "responseWindow",
   355 |     "encounterBeforeRoll", "encounterResult", "wheelWindow", "sabotage", "teamPreview", "battlePayout",
   356 |     "endOfActionPhaseProcedure", "endOfBattlePhaseProcedure"
   357 |   ]);
   358 |   const legalControlContextValues = Object.freeze([
   359 |     "gymStartPreparationControl", "actionOpenControl", "teamBuilding", "shop", "postBattleControl", "sabotageCurseWindow"
```

#### Old encounter result/event bridge — `"encounterResult"` — line 369

```text
   365 |   const legacyControlTimingWindows = Object.freeze(["actionOpen", "teamBuilding", "shopOpen"]);
   366 |   const curseTimingWindows = Object.freeze([...legacyControlTimingWindows, "sabotage"]);
   367 |   const phaseBoundaryProcedureValues = Object.freeze(["endOfActionPhaseProcedure", "endOfBattlePhaseProcedure"]);
   368 |   const timingStatusValues = Object.freeze(["settled", "needsRuling"]);
   369 |   const targetTypes = Object.freeze(["none", "currentPrompt", "pokemon", "player", "team", "encounterResult", "resource", "table", "manual"]);
   370 |   const selectedTargetTypes = Object.freeze([...targetTypes, "rosterInstance", "species", "move"]);
   371 |   const targetScopes = Object.freeze(["none", "currentPrompt", "species", "rosterInstance", "singlePlayer", "allPlayers", "singleTeam", "allTeams", "singleResource", "allMatchingResources", "tableWide", "manual"]);
   372 |   const applicationScopes = Object.freeze(["rosterInstance", "selectedRosterInstances", "submittedTeamInstances", "playerRosterInstances", "globalSpecies", "singlePlayer", "allPlayers", "tableWide", "manual"]);
   373 |   const targetControllerRelations = Object.freeze([
```

#### Old encounter resolver IDs — `"extraEncounter"` — line 380

```text
   376 |   const redirectPolicyStatuses = Object.freeze(["allowed", "notAllowed", "needsRuling"]);
   377 |   const registeredResolverIds = Object.freeze([
   378 |     "hostConfirmed", "trainerClassWheel", "restrict", "utilityEffect", "wickedBlow", "statusEffect", "safeguard", "delayParent",
   379 |     "substituteAttach", "redirectParentToSelf", "teamPreviewSwap", "playerStatus", "copyParentEffect", "randomRedirect", "immunity",
   380 |     "revengeRelease", "reroll", "extraEncounter", "encounterWheelEdit", "encounterTransfer", "encounterGrant", "encounterCopy",
   381 |     "encounterChoose", "moveBan", "knockOff", "multiStatusEffect", "purgeAfterBattle", "copyToken",
   382 |     "arenaTrap", "clearSmog", "extraBan", "counterProtection", "ongoingEffectTextReplacement", "ongoingEffectSuppression",
   383 |     "hazeCurse", "devolveCurse", "copyTokenInventory",
   384 |     "restoreNegatedTokenWithCooldown", "smokescreenRedirect"
```

#### Old encounter resolver IDs — `"encounterWheelEdit"` — line 380

```text
   376 |   const redirectPolicyStatuses = Object.freeze(["allowed", "notAllowed", "needsRuling"]);
   377 |   const registeredResolverIds = Object.freeze([
   378 |     "hostConfirmed", "trainerClassWheel", "restrict", "utilityEffect", "wickedBlow", "statusEffect", "safeguard", "delayParent",
   379 |     "substituteAttach", "redirectParentToSelf", "teamPreviewSwap", "playerStatus", "copyParentEffect", "randomRedirect", "immunity",
   380 |     "revengeRelease", "reroll", "extraEncounter", "encounterWheelEdit", "encounterTransfer", "encounterGrant", "encounterCopy",
   381 |     "encounterChoose", "moveBan", "knockOff", "multiStatusEffect", "purgeAfterBattle", "copyToken",
   382 |     "arenaTrap", "clearSmog", "extraBan", "counterProtection", "ongoingEffectTextReplacement", "ongoingEffectSuppression",
   383 |     "hazeCurse", "devolveCurse", "copyTokenInventory",
   384 |     "restoreNegatedTokenWithCooldown", "smokescreenRedirect"
```

#### Old encounter resolver IDs — `"encounterTransfer"` — line 380

```text
   376 |   const redirectPolicyStatuses = Object.freeze(["allowed", "notAllowed", "needsRuling"]);
   377 |   const registeredResolverIds = Object.freeze([
   378 |     "hostConfirmed", "trainerClassWheel", "restrict", "utilityEffect", "wickedBlow", "statusEffect", "safeguard", "delayParent",
   379 |     "substituteAttach", "redirectParentToSelf", "teamPreviewSwap", "playerStatus", "copyParentEffect", "randomRedirect", "immunity",
   380 |     "revengeRelease", "reroll", "extraEncounter", "encounterWheelEdit", "encounterTransfer", "encounterGrant", "encounterCopy",
   381 |     "encounterChoose", "moveBan", "knockOff", "multiStatusEffect", "purgeAfterBattle", "copyToken",
   382 |     "arenaTrap", "clearSmog", "extraBan", "counterProtection", "ongoingEffectTextReplacement", "ongoingEffectSuppression",
   383 |     "hazeCurse", "devolveCurse", "copyTokenInventory",
   384 |     "restoreNegatedTokenWithCooldown", "smokescreenRedirect"
```

#### Old encounter resolver IDs — `"encounterGrant"` — line 380

```text
   376 |   const redirectPolicyStatuses = Object.freeze(["allowed", "notAllowed", "needsRuling"]);
   377 |   const registeredResolverIds = Object.freeze([
   378 |     "hostConfirmed", "trainerClassWheel", "restrict", "utilityEffect", "wickedBlow", "statusEffect", "safeguard", "delayParent",
   379 |     "substituteAttach", "redirectParentToSelf", "teamPreviewSwap", "playerStatus", "copyParentEffect", "randomRedirect", "immunity",
   380 |     "revengeRelease", "reroll", "extraEncounter", "encounterWheelEdit", "encounterTransfer", "encounterGrant", "encounterCopy",
   381 |     "encounterChoose", "moveBan", "knockOff", "multiStatusEffect", "purgeAfterBattle", "copyToken",
   382 |     "arenaTrap", "clearSmog", "extraBan", "counterProtection", "ongoingEffectTextReplacement", "ongoingEffectSuppression",
   383 |     "hazeCurse", "devolveCurse", "copyTokenInventory",
   384 |     "restoreNegatedTokenWithCooldown", "smokescreenRedirect"
```

#### Old encounter resolver IDs — `"encounterCopy"` — line 380

```text
   376 |   const redirectPolicyStatuses = Object.freeze(["allowed", "notAllowed", "needsRuling"]);
   377 |   const registeredResolverIds = Object.freeze([
   378 |     "hostConfirmed", "trainerClassWheel", "restrict", "utilityEffect", "wickedBlow", "statusEffect", "safeguard", "delayParent",
   379 |     "substituteAttach", "redirectParentToSelf", "teamPreviewSwap", "playerStatus", "copyParentEffect", "randomRedirect", "immunity",
   380 |     "revengeRelease", "reroll", "extraEncounter", "encounterWheelEdit", "encounterTransfer", "encounterGrant", "encounterCopy",
   381 |     "encounterChoose", "moveBan", "knockOff", "multiStatusEffect", "purgeAfterBattle", "copyToken",
   382 |     "arenaTrap", "clearSmog", "extraBan", "counterProtection", "ongoingEffectTextReplacement", "ongoingEffectSuppression",
   383 |     "hazeCurse", "devolveCurse", "copyTokenInventory",
   384 |     "restoreNegatedTokenWithCooldown", "smokescreenRedirect"
```

#### Old encounter resolver IDs — `"encounterChoose"` — line 381

```text
   377 |   const registeredResolverIds = Object.freeze([
   378 |     "hostConfirmed", "trainerClassWheel", "restrict", "utilityEffect", "wickedBlow", "statusEffect", "safeguard", "delayParent",
   379 |     "substituteAttach", "redirectParentToSelf", "teamPreviewSwap", "playerStatus", "copyParentEffect", "randomRedirect", "immunity",
   380 |     "revengeRelease", "reroll", "extraEncounter", "encounterWheelEdit", "encounterTransfer", "encounterGrant", "encounterCopy",
   381 |     "encounterChoose", "moveBan", "knockOff", "multiStatusEffect", "purgeAfterBattle", "copyToken",
   382 |     "arenaTrap", "clearSmog", "extraBan", "counterProtection", "ongoingEffectTextReplacement", "ongoingEffectSuppression",
   383 |     "hazeCurse", "devolveCurse", "copyTokenInventory",
   384 |     "restoreNegatedTokenWithCooldown", "smokescreenRedirect"
   385 |   ]);
```

#### Old encounter result/event bridge — `"encounterBeforeRoll"` — line 407

```text
   403 |   });
   404 |
   405 |   const phaseSets = Object.freeze({
   406 |     response: ["responseWindow"],
   407 |     encounterBefore: ["encounterBeforeRoll"],
   408 |     encounterResult: ["encounterResult"]
   409 |   });
   410 |
   411 |   const unresolvedMultiGymExpiration = "Needs Ruling: exact duration counter; expires during the Start-of-Gym expiration step after its approved duration.";
```

#### Old encounter result/event bridge — `"encounterResult"` — line 408

```text
   404 |
   405 |   const phaseSets = Object.freeze({
   406 |     response: ["responseWindow"],
   407 |     encounterBefore: ["encounterBeforeRoll"],
   408 |     encounterResult: ["encounterResult"]
   409 |   });
   410 |
   411 |   const unresolvedMultiGymExpiration = "Needs Ruling: exact duration counter; expires during the Start-of-Gym expiration step after its approved duration.";
   412 |   const phaseAnchoredTwoGymExpiration = "At the matching phase boundary two Gyms after activation.";
```

#### Encounter-family contract model — `family === "Encounter"` — line 452 — function `redirectPolicyReason` (433-456)

```text
   448 |     if (config.id === "incinerate") return "Each opposing player contributes an independently selected resource; player/Pokemon target redirection does not apply.";
   449 |     if (config.targetType === "table" || config.targetScope === "tableWide") return "Global and table-wide effects do not have a redirectable chosen target.";
   450 |     if (config.targetType === "currentPrompt" || config.targetScope === "currentPrompt" || config.isResponse) return "Current-prompt responses are not independently redirected as targets.";
   451 |     if (config.id === "honey-token") return "The encounter record is a boundary-offer selection, not a chosen gameplay target for redirection.";
   452 |     if (config.family === "Encounter") return "This encounter modifier does not expose a legal alternate gameplay target for this mechanism.";
   453 |     if (mechanism === "followMe") return "The Follow Me user cannot become a legal corresponding target under this effect's current target contract.";
   454 |     if (mechanism === "smokescreen") return "A random player result cannot replace the selected target with a legal corresponding target under this effect's current target contract.";
   455 |     return "The effect has no different legal corresponding target for this mechanism.";
   456 |   }
```

#### Encounter-family contract model — `family: "Encounter"` — line 735

```text
   731 |     timingPermissions: { sabotageCurseWindow: true },
   732 |     ...config
   733 |   });
   734 |   const protection = (config) => defineToken({ family: "Protection", timingCategory: "protection", legalPhases: phaseSets.response, isResponse: true, ...config });
   735 |   const encounter = (config) => defineToken({ family: "Encounter", timingCategory: "encounter", ...config });
   736 |
   737 |   const definitions = [
   738 |     control({ id: "class-change", name: "Class Change", rulesText: "Roll the Trainer Class Wheel for yourself and take the new class", targetType: "player", targetScope: "singlePlayer", targetControllerRelation: "self", selfOnly: true, resolverMode: resolverModes.GUIDED, resolverId: "trainerClassWheel", requiredChoices: ["Wheel result"], guidedTask: { instruction: "Spin the Trainer Class Wheel for the acting player.", responsible: "Acting player", resultLabel: "New Trainer Class", placeholder: "Record the class rolled", confirmationLabel: "Apply Class Result" } }),
   739 |     control({ id: "restrict-token", name: "Restrict", aliases: ["Restrict Token"], rulesText: "Prevent a Pokemon from being brought for 6 gyms", targetType: "pokemon", targetScope: "species", selectedTargetType: "pokemon", applicationScope: "globalSpecies", affectedEntityType: "pokemon", resolverMode: resolverModes.AUTOMATIC, resolverId: "restrict", persistence: "lingeringEffect", duration: "6 Gyms", expirationPoint: "At the approved start-of-Gym expiration checkpoint after 6 Gyms.", automaticMutations: ["Create species-wide Restrict status", "Preserve exact roster-instance Rage exemptions", "Update all authoritative Pokemon legality surfaces", "Schedule one expiration"], outcomeTemplate: "{target} is Restricted for 6 Gyms.", mechanicContract: { speciesWideRestriction: true, durationGyms: 6, rageCandyImmunityExactInstanceOnly: true, authoritativeTeamLegalityRequired: true, canonicalSpeciesNormalizationRequired: true, causalHistoryUndoRequired: true } }),
```

#### Encounter token names — `"Reroll"` — line 745

```text
   741 |     control({ id: "cold-wave", name: "Cold Wave", rulesText: "When Activated, Suppress All Ongoing Activated Effects Until The End Of This Gym. Suppressed Effects Have No Effect Until This Gym Ends, Then Return To Normal", targetType: "table", targetScope: "tableWide", applicationScope: "tableWide", affectedEntityType: "ongoingEffect", resolverMode: resolverModes.AUTOMATIC, resolverId: "ongoingEffectSuppression", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Cold Wave creates a same-Gym suppression record. Runtime effect checks ignore only records explicitly marked isOngoingEffect while preserving their state and expiration.", requiredChoices: [], persistence: "lingeringEffect", duration: "Until the end of this Gym", expirationPoint: "End of Gym after naturally expired effects remain expired.", effectTags: ["Suppress"], mechanicContract: { applicationScope: "tableWide", eligibleClassificationField: "isOngoingEffect", eligibleClassificationValue: true, operation: "suppressBehaviorWithoutRemovingRecord", preservesOwnerSourceDurationExpirationIdentity: true, restoreSurvivingEffectsAtGymEnd: true, reviveNaturallyExpiredEffects: false } }),
   742 |     control({ id: "clear-smog", name: "Clear Smog", rulesText: "Remove permanent buffs from a chosen Pokemon, including levels, illegal abilities, and illegal moves", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "clearSmog", automaticMutations: ["Remove clearable structured buffs from the selected Pokemon", "Remove only labels proven to represent those removed buffs", "Revoke exact-instance move-access grants"], mechanicContract: { activeRosterRequired: true, provenanceRequired: true, destructiveSetDifferenceForbidden: true, causalHistoryUndoRequired: true } }),
   743 |     control({ id: "rage-candy-bar", name: "Rage Candy Bar", rulesText: "Give one of your Pokemon +3 levels, +252 EV cap, and Restrict immunity for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", targetControllerRelation: "self", selfOnly: true, magicianLegalAlternateTargetExplanation: "Magician may change the target only to a different Pokemon owned by the same acting player.", resolverMode: resolverModes.AUTOMATIC, resolverId: "utilityEffect", persistence: "lingeringEffect", duration: "2 Gyms; another use extends the shared duration by 2 Gyms", expirationPoint: unresolvedMultiGymExpiration, replacementRules: "Another Rage Candy Bar on the same roster instance extends the one composite enhancement by 2 Gyms.", stackingRules: "The +3 Levels and +252 EV-cap bonuses do not stack.", automaticMutations: ["Create or extend one timed Rage Candy enhancement", "Grant +3 Levels", "Grant EV Cap +252", "Grant Restrict immunity", "Remove all remaining components when the shared duration expires"] }),
   744 |     control({ id: "lingering-aroma", name: "Lingering Aroma", rulesText: "When A Player Has An Ongoing Effect In Play, Use This Token. Replace That Effect's Text With 'Players Who Target Me Gain 500' Until That Effect Ends", targetType: "resource", targetScope: "singleResource", targetScopeStatus: "settled", targetControllerRelation: "anyPlayer", targetCollectionType: "activeOngoingEffectRecord", targetValidation: "The selected active record must explicitly have isOngoingEffect set to true.", resolverMode: resolverModes.AUTOMATIC, resolverId: "ongoingEffectTextReplacement", runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Lingering Aroma is blocked before consumption until the rules identify who 'me' means and which player pays and receives the $500 when the replacement trigger occurs.", requiredChoices: ["One active record explicitly classified as an ongoing effect"], persistence: "linkedEffectTextReplacement", duration: "For the remainder of the selected effect", expirationPoint: "Automatically when the selected original effect ends.", effectTags: ["Replace Text"], mechanicContract: { eligibilityStatus: "settled", eligibleClassificationField: "isOngoingEffect", eligibleClassificationValue: true, replacementText: "Players Who Target Me Gain 500", replacementTriggerStatus: "needsRuling", meIdentityStatus: "needsRuling", payerStatus: "needsRuling", recipientStatus: "needsRuling", removeOriginalEffect: false, preserveOriginalText: true, preserveSourceOwnerDurationExpirationIdentity: true, relationshipPersistsForDisplayReloadUndo: true, expiresWithOriginalEffect: true, durationAloneDoesNotImplyEligibility: true } }),
   745 |     control({ id: "wicked-blow", name: "Wicked Blow", rulesText: "Choose A Pokemon On A Player's Team. Reroll It For A Random Pokemon 3 Battle Tiers Below Its Final Evolution Tier.", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "rosterInstance", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "wickedBlow", effectTags: ["Reroll"], automaticMutations: ["Validate one exact Pokemon in any player's Active Roster", "Determine the target's final-evolution Battle Tier", "Roll from the exact Battle Tier three ordered tier steps below", "Replace the Pokemon while preserving its stable roster-instance identity", "Reset species-specific Teambuilder fields through the canonical slot replacement path", "Update any current team, locked-team, and Teambuilder references to that exact instance atomically"], mechanicContract: { exactRosterInstanceRequired: true, activeRosterRequired: true, currentBattlePhaseTeamRequired: false, sourcePlayerMayTargetOwnPokemon: true, sourcePlayerMayTargetAnotherPlayersPokemon: true, orderedBattleTierStepsBelow: 3, eliteTiersCountAsSteps: true, finalEvolutionTierRequired: true, stablePokemonIdRequired: true, acquisitionRulesApplyToReplacement: true, speciesSpecificTeamBuildFieldsReset: true, exactInstanceStatusesRemainAttached: true, existingTeamReferencesRemainCoherent: true, doesNotCreateTeamMembership: true, atomicMutationRequired: true } }),
   746 |     control({ id: "rebrand", name: "Rebrand", aliases: ["Rebrand Token"], rulesText: "Force a rival to roll the Trainer Class Wheel and change class. Trainer Class abilities cannot respond", targetType: "player", targetScope: "singlePlayer", targetControllerRelation: "otherPlayer", otherPlayerOnly: true, excludeActor: true, resolverMode: resolverModes.GUIDED, resolverId: "trainerClassWheel", requiredChoices: ["Target player", "Wheel result"], guidedTask: { instruction: "Spin the Trainer Class Wheel for the targeted player.", responsible: "Target player", resultLabel: "New Trainer Class", placeholder: "Record the class rolled", confirmationLabel: "Apply Class Result" } }),
   747 |     control({ id: "extra-ban-token", name: "Extra Ban", aliases: ["Extra Ban Token", "Ban Token"], rulesText: "Ban any Pokemon from play", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", selectedTargetRecordFields: ["selectedRosterInstanceId", "selectedSpeciesId"], applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", substituteInterceptionPolicy: "negateEntireEffect", substituteChecksSelectedTargetOnly: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "extraBan", persistence: "lingeringEffect", duration: "Indefinite", expirationPoint: "Removed by Unban or a rules reset", automaticMutations: ["Retain the selected Active-roster instance declaration anchor", "Check Substitute only on that selected instance", "Create species-wide Ban status if not intercepted", "Update global Pokemon legality"], mechanicContract: { activeRosterRequired: true, exactSelectedAnchorRequired: true, selectedAnchorSubstituteOnly: true, causalHistoryUndoRequired: true } }),
   748 |     control({ id: "unban-token", name: "Unban", aliases: ["Unban Token"], rulesText: "Unban a Pokemon. It cannot be banned again for 6 gyms", targetType: "pokemon", targetScope: "species", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "6 Gyms", expirationPoint: unresolvedMultiGymExpiration, automaticMutations: ["Remove active Ban or Restrict", "Create Unban protection", "Update global Pokemon legality"] }),
   749 |     control({ id: "incinerate", name: "Incinerate", rulesText: "Choose one Item or TM from every other player except Masterball items and remove it from their bag", targetType: "resource", targetScope: "allMatchingResources", selectedTargetType: "resource", applicationScope: "allPlayers", affectedEntityType: "resource", targetControllerRelation: "everyOtherPlayer", excludeActor: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "utilityEffect", requiredChoices: ["One exact legal Item or TM record from each other player who has one"], effectTags: ["Destroy"], automaticMutations: ["Validate one stable-ID non-Master-Ball Item or TM selection for each eligible opposing player", "Skip opposing players who have no legal target", "Atomically destroy every exact selected inventory record", "Record each destruction as a stable-ID effect operation"], mechanicContract: { resourceCategories: ["Item", "TM"], independentSelectionPerOtherPlayer: true, differentSelectionsAllowed: true, oneSelectedRecordPerEligibleOpponent: true, playersWithoutLegalTargetsAreSkipped: true, excludesSourcePlayer: true, excludesMasterBallItems: true, stableInventoryIdsRequired: true, emptyMatchResolvesNoEffect: true, atomicMutationRequired: true } }),
```

#### Old encounter result/event bridge — `"encounterResult"` — line 765

```text
   761 |     protection({ id: "seven-tools", name: "7 Tools Of The Bandit", aliases: ["7 Tools", "Seven Tools"], rulesText: "When A Player Activates A Protection Token, Use This Token Immediately After. Negate That Protection Token, Then Copy It. The Copied Token Must Be Used During This Gym Or It Is Lost", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "counterProtection", copyActivationMode: copyActivationModes.TEMPORARY_INVENTORY, canRespondTo: ["protectionTokenActivation"], specialPriority: "Immediately after the targeted Protection Token activation", persistence: "temporaryCopiedToken", duration: "Until used or End of Gym", expirationPoint: "End of the current Gym if unused", effectTags: ["Negate", "Copy"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "7 Tools atomically negates the exact Protection response and creates its same-Gym temporary copy.", parentInteraction: "Negate the targeted Protection Token, keep it negated, then create one temporary copy for the 7 Tools user.", automaticMutations: ["Negate the targeted Protection Token", "Create one temporary copy for the 7 Tools user", "Retain copied Token timing, targeting, and effect rules", "Expire the temporary copy unused at End of Gym"], mechanicContract: { respondsOnlyToProtectionTokenActivation: true, negateTargetProtection: true, temporaryCopyCount: 1, copyOwner: "sevenToolsUser", preserveCopiedDefinitionTimingTargetsAndRules: true, permanentInventory: false, expiresAtEndOfCurrentGym: true, recordSourceDefinitionActivationOwnerCreationGymAndExpiration: true, safeguardCopyProtectionMustBeChecked: true, copyModelIsTokenSpecific: true, atomicResolutionRequired: true } }),
   762 |     protection({ id: "immunity", name: "Immunity", aliases: ["Emergency Immunity Token"], rulesText: "Negate any effect or global effect. Does not stop Series Restricts or bans", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "immunity", canRespondTo: ["targetedEffect", "globalEffect"], protectionScope: ["targetedEffect", "globalEffect"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Immunity atomically negates its exact current parent prompt and is covered across reload, undo, results, and sandbox isolation.", automaticMutations: ["Negate the parent prompt"] }),
   763 |     protection({ id: "revenge", name: "Revenge", rulesText: "After a Battle Phase where an opponent cursed a Pokemon you brought, release 2 Pokemon from their brought team and destroy the held item", isResponse: false, legalPhases: [], timingWindows: ["endOfBattlePhaseProcedure"], phaseBoundaryProcedure: "endOfBattlePhaseProcedure", explicitPhaseTiming: "postPayoutBeforeControl", activationPattern: "phaseBoundaryOptionalTrigger", activationType: "Post-payout optional offer", requiresPendingEvent: false, createsPendingEvent: true, opensResponseWindow: false, targetType: "team", targetScope: "singleTeam", targetControllerRelation: "otherPlayer", otherPlayerOnly: true, excludeActor: true, differentControllerRequired: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "revengeRelease", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Revenge is offered after payout from exact current-Gym Curse anchors and the immutable brought-team snapshot. It consumes only after the affected player confirms two exact Pokemon and an optional eligible held Item.", requiredChoices: ["Exactly two exact Pokemon from the offender's immutable brought team", "At most one eligible held item from those two"], guidedTask: { instruction: "Choose exactly two exact roster instances from the offending player's immutable brought-team snapshot, then optionally choose one eligible exactly referenced held item from those two.", responsible: "Affected player", resultLabel: "Revenge Choices", placeholder: "Two exact roster IDs and optional exact held item ID", confirmationLabel: "Apply Revenge" }, mechanicContract: { postPayoutBeforeControl: true, immutableBroughtSnapshotRequired: true, exactReleaseCount: 2, qualifyingCurseMustTargetExactBroughtInstance: true, heldItemSelectionMaximum: 1, heldItemMustBelongToSelectedReleasedPokemon: true, exactHeldInventoryReferenceRequired: true, masterBallTierProtected: true, sameNameInventoryGuessingForbidden: true, atomicResolutionRequired: true, idempotentResolutionRequired: true, adminUndoRequired: true, optionalOfferCanBeDeclinedWithoutConsumption: true, productionChoiceScreenRequired: true } }),
   764 |
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
```

#### Encounter-family contract model — `encounter({` — line 765

```text
   761 |     protection({ id: "seven-tools", name: "7 Tools Of The Bandit", aliases: ["7 Tools", "Seven Tools"], rulesText: "When A Player Activates A Protection Token, Use This Token Immediately After. Negate That Protection Token, Then Copy It. The Copied Token Must Be Used During This Gym Or It Is Lost", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "counterProtection", copyActivationMode: copyActivationModes.TEMPORARY_INVENTORY, canRespondTo: ["protectionTokenActivation"], specialPriority: "Immediately after the targeted Protection Token activation", persistence: "temporaryCopiedToken", duration: "Until used or End of Gym", expirationPoint: "End of the current Gym if unused", effectTags: ["Negate", "Copy"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "7 Tools atomically negates the exact Protection response and creates its same-Gym temporary copy.", parentInteraction: "Negate the targeted Protection Token, keep it negated, then create one temporary copy for the 7 Tools user.", automaticMutations: ["Negate the targeted Protection Token", "Create one temporary copy for the 7 Tools user", "Retain copied Token timing, targeting, and effect rules", "Expire the temporary copy unused at End of Gym"], mechanicContract: { respondsOnlyToProtectionTokenActivation: true, negateTargetProtection: true, temporaryCopyCount: 1, copyOwner: "sevenToolsUser", preserveCopiedDefinitionTimingTargetsAndRules: true, permanentInventory: false, expiresAtEndOfCurrentGym: true, recordSourceDefinitionActivationOwnerCreationGymAndExpiration: true, safeguardCopyProtectionMustBeChecked: true, copyModelIsTokenSpecific: true, atomicResolutionRequired: true } }),
   762 |     protection({ id: "immunity", name: "Immunity", aliases: ["Emergency Immunity Token"], rulesText: "Negate any effect or global effect. Does not stop Series Restricts or bans", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "immunity", canRespondTo: ["targetedEffect", "globalEffect"], protectionScope: ["targetedEffect", "globalEffect"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Immunity atomically negates its exact current parent prompt and is covered across reload, undo, results, and sandbox isolation.", automaticMutations: ["Negate the parent prompt"] }),
   763 |     protection({ id: "revenge", name: "Revenge", rulesText: "After a Battle Phase where an opponent cursed a Pokemon you brought, release 2 Pokemon from their brought team and destroy the held item", isResponse: false, legalPhases: [], timingWindows: ["endOfBattlePhaseProcedure"], phaseBoundaryProcedure: "endOfBattlePhaseProcedure", explicitPhaseTiming: "postPayoutBeforeControl", activationPattern: "phaseBoundaryOptionalTrigger", activationType: "Post-payout optional offer", requiresPendingEvent: false, createsPendingEvent: true, opensResponseWindow: false, targetType: "team", targetScope: "singleTeam", targetControllerRelation: "otherPlayer", otherPlayerOnly: true, excludeActor: true, differentControllerRequired: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "revengeRelease", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Revenge is offered after payout from exact current-Gym Curse anchors and the immutable brought-team snapshot. It consumes only after the affected player confirms two exact Pokemon and an optional eligible held Item.", requiredChoices: ["Exactly two exact Pokemon from the offender's immutable brought team", "At most one eligible held item from those two"], guidedTask: { instruction: "Choose exactly two exact roster instances from the offending player's immutable brought-team snapshot, then optionally choose one eligible exactly referenced held item from those two.", responsible: "Affected player", resultLabel: "Revenge Choices", placeholder: "Two exact roster IDs and optional exact held item ID", confirmationLabel: "Apply Revenge" }, mechanicContract: { postPayoutBeforeControl: true, immutableBroughtSnapshotRequired: true, exactReleaseCount: 2, qualifyingCurseMustTargetExactBroughtInstance: true, heldItemSelectionMaximum: 1, heldItemMustBelongToSelectedReleasedPokemon: true, exactHeldInventoryReferenceRequired: true, masterBallTierProtected: true, sameNameInventoryGuessingForbidden: true, atomicResolutionRequired: true, idempotentResolutionRequired: true, adminUndoRequired: true, optionalOfferCanBeDeclinedWithoutConsumption: true, productionChoiceScreenRequired: true } }),
   764 |
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
```

#### Encounter-family contract model — `"wheelWindow"` — line 765

```text
   761 |     protection({ id: "seven-tools", name: "7 Tools Of The Bandit", aliases: ["7 Tools", "Seven Tools"], rulesText: "When A Player Activates A Protection Token, Use This Token Immediately After. Negate That Protection Token, Then Copy It. The Copied Token Must Be Used During This Gym Or It Is Lost", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "counterProtection", copyActivationMode: copyActivationModes.TEMPORARY_INVENTORY, canRespondTo: ["protectionTokenActivation"], specialPriority: "Immediately after the targeted Protection Token activation", persistence: "temporaryCopiedToken", duration: "Until used or End of Gym", expirationPoint: "End of the current Gym if unused", effectTags: ["Negate", "Copy"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "7 Tools atomically negates the exact Protection response and creates its same-Gym temporary copy.", parentInteraction: "Negate the targeted Protection Token, keep it negated, then create one temporary copy for the 7 Tools user.", automaticMutations: ["Negate the targeted Protection Token", "Create one temporary copy for the 7 Tools user", "Retain copied Token timing, targeting, and effect rules", "Expire the temporary copy unused at End of Gym"], mechanicContract: { respondsOnlyToProtectionTokenActivation: true, negateTargetProtection: true, temporaryCopyCount: 1, copyOwner: "sevenToolsUser", preserveCopiedDefinitionTimingTargetsAndRules: true, permanentInventory: false, expiresAtEndOfCurrentGym: true, recordSourceDefinitionActivationOwnerCreationGymAndExpiration: true, safeguardCopyProtectionMustBeChecked: true, copyModelIsTokenSpecific: true, atomicResolutionRequired: true } }),
   762 |     protection({ id: "immunity", name: "Immunity", aliases: ["Emergency Immunity Token"], rulesText: "Negate any effect or global effect. Does not stop Series Restricts or bans", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "immunity", canRespondTo: ["targetedEffect", "globalEffect"], protectionScope: ["targetedEffect", "globalEffect"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Immunity atomically negates its exact current parent prompt and is covered across reload, undo, results, and sandbox isolation.", automaticMutations: ["Negate the parent prompt"] }),
   763 |     protection({ id: "revenge", name: "Revenge", rulesText: "After a Battle Phase where an opponent cursed a Pokemon you brought, release 2 Pokemon from their brought team and destroy the held item", isResponse: false, legalPhases: [], timingWindows: ["endOfBattlePhaseProcedure"], phaseBoundaryProcedure: "endOfBattlePhaseProcedure", explicitPhaseTiming: "postPayoutBeforeControl", activationPattern: "phaseBoundaryOptionalTrigger", activationType: "Post-payout optional offer", requiresPendingEvent: false, createsPendingEvent: true, opensResponseWindow: false, targetType: "team", targetScope: "singleTeam", targetControllerRelation: "otherPlayer", otherPlayerOnly: true, excludeActor: true, differentControllerRequired: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "revengeRelease", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Revenge is offered after payout from exact current-Gym Curse anchors and the immutable brought-team snapshot. It consumes only after the affected player confirms two exact Pokemon and an optional eligible held Item.", requiredChoices: ["Exactly two exact Pokemon from the offender's immutable brought team", "At most one eligible held item from those two"], guidedTask: { instruction: "Choose exactly two exact roster instances from the offending player's immutable brought-team snapshot, then optionally choose one eligible exactly referenced held item from those two.", responsible: "Affected player", resultLabel: "Revenge Choices", placeholder: "Two exact roster IDs and optional exact held item ID", confirmationLabel: "Apply Revenge" }, mechanicContract: { postPayoutBeforeControl: true, immutableBroughtSnapshotRequired: true, exactReleaseCount: 2, qualifyingCurseMustTargetExactBroughtInstance: true, heldItemSelectionMaximum: 1, heldItemMustBelongToSelectedReleasedPokemon: true, exactHeldInventoryReferenceRequired: true, masterBallTierProtected: true, sameNameInventoryGuessingForbidden: true, atomicResolutionRequired: true, idempotentResolutionRequired: true, adminUndoRequired: true, optionalOfferCanBeDeclinedWithoutConsumption: true, productionChoiceScreenRequired: true } }),
   764 |
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
```

#### Encounter token names — `"Reroll"` — line 765

```text
   761 |     protection({ id: "seven-tools", name: "7 Tools Of The Bandit", aliases: ["7 Tools", "Seven Tools"], rulesText: "When A Player Activates A Protection Token, Use This Token Immediately After. Negate That Protection Token, Then Copy It. The Copied Token Must Be Used During This Gym Or It Is Lost", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "counterProtection", copyActivationMode: copyActivationModes.TEMPORARY_INVENTORY, canRespondTo: ["protectionTokenActivation"], specialPriority: "Immediately after the targeted Protection Token activation", persistence: "temporaryCopiedToken", duration: "Until used or End of Gym", expirationPoint: "End of the current Gym if unused", effectTags: ["Negate", "Copy"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "7 Tools atomically negates the exact Protection response and creates its same-Gym temporary copy.", parentInteraction: "Negate the targeted Protection Token, keep it negated, then create one temporary copy for the 7 Tools user.", automaticMutations: ["Negate the targeted Protection Token", "Create one temporary copy for the 7 Tools user", "Retain copied Token timing, targeting, and effect rules", "Expire the temporary copy unused at End of Gym"], mechanicContract: { respondsOnlyToProtectionTokenActivation: true, negateTargetProtection: true, temporaryCopyCount: 1, copyOwner: "sevenToolsUser", preserveCopiedDefinitionTimingTargetsAndRules: true, permanentInventory: false, expiresAtEndOfCurrentGym: true, recordSourceDefinitionActivationOwnerCreationGymAndExpiration: true, safeguardCopyProtectionMustBeChecked: true, copyModelIsTokenSpecific: true, atomicResolutionRequired: true } }),
   762 |     protection({ id: "immunity", name: "Immunity", aliases: ["Emergency Immunity Token"], rulesText: "Negate any effect or global effect. Does not stop Series Restricts or bans", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "immunity", canRespondTo: ["targetedEffect", "globalEffect"], protectionScope: ["targetedEffect", "globalEffect"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Immunity atomically negates its exact current parent prompt and is covered across reload, undo, results, and sandbox isolation.", automaticMutations: ["Negate the parent prompt"] }),
   763 |     protection({ id: "revenge", name: "Revenge", rulesText: "After a Battle Phase where an opponent cursed a Pokemon you brought, release 2 Pokemon from their brought team and destroy the held item", isResponse: false, legalPhases: [], timingWindows: ["endOfBattlePhaseProcedure"], phaseBoundaryProcedure: "endOfBattlePhaseProcedure", explicitPhaseTiming: "postPayoutBeforeControl", activationPattern: "phaseBoundaryOptionalTrigger", activationType: "Post-payout optional offer", requiresPendingEvent: false, createsPendingEvent: true, opensResponseWindow: false, targetType: "team", targetScope: "singleTeam", targetControllerRelation: "otherPlayer", otherPlayerOnly: true, excludeActor: true, differentControllerRequired: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "revengeRelease", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Revenge is offered after payout from exact current-Gym Curse anchors and the immutable brought-team snapshot. It consumes only after the affected player confirms two exact Pokemon and an optional eligible held Item.", requiredChoices: ["Exactly two exact Pokemon from the offender's immutable brought team", "At most one eligible held item from those two"], guidedTask: { instruction: "Choose exactly two exact roster instances from the offending player's immutable brought-team snapshot, then optionally choose one eligible exactly referenced held item from those two.", responsible: "Affected player", resultLabel: "Revenge Choices", placeholder: "Two exact roster IDs and optional exact held item ID", confirmationLabel: "Apply Revenge" }, mechanicContract: { postPayoutBeforeControl: true, immutableBroughtSnapshotRequired: true, exactReleaseCount: 2, qualifyingCurseMustTargetExactBroughtInstance: true, heldItemSelectionMaximum: 1, heldItemMustBelongToSelectedReleasedPokemon: true, exactHeldInventoryReferenceRequired: true, masterBallTierProtected: true, sameNameInventoryGuessingForbidden: true, atomicResolutionRequired: true, idempotentResolutionRequired: true, adminUndoRequired: true, optionalOfferCanBeDeclinedWithoutConsumption: true, productionChoiceScreenRequired: true } }),
   764 |
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
```

#### Old encounter resolver IDs — `"extraEncounter"` — line 766

```text
   762 |     protection({ id: "immunity", name: "Immunity", aliases: ["Emergency Immunity Token"], rulesText: "Negate any effect or global effect. Does not stop Series Restricts or bans", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "immunity", canRespondTo: ["targetedEffect", "globalEffect"], protectionScope: ["targetedEffect", "globalEffect"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Immunity atomically negates its exact current parent prompt and is covered across reload, undo, results, and sandbox isolation.", automaticMutations: ["Negate the parent prompt"] }),
   763 |     protection({ id: "revenge", name: "Revenge", rulesText: "After a Battle Phase where an opponent cursed a Pokemon you brought, release 2 Pokemon from their brought team and destroy the held item", isResponse: false, legalPhases: [], timingWindows: ["endOfBattlePhaseProcedure"], phaseBoundaryProcedure: "endOfBattlePhaseProcedure", explicitPhaseTiming: "postPayoutBeforeControl", activationPattern: "phaseBoundaryOptionalTrigger", activationType: "Post-payout optional offer", requiresPendingEvent: false, createsPendingEvent: true, opensResponseWindow: false, targetType: "team", targetScope: "singleTeam", targetControllerRelation: "otherPlayer", otherPlayerOnly: true, excludeActor: true, differentControllerRequired: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "revengeRelease", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Revenge is offered after payout from exact current-Gym Curse anchors and the immutable brought-team snapshot. It consumes only after the affected player confirms two exact Pokemon and an optional eligible held Item.", requiredChoices: ["Exactly two exact Pokemon from the offender's immutable brought team", "At most one eligible held item from those two"], guidedTask: { instruction: "Choose exactly two exact roster instances from the offending player's immutable brought-team snapshot, then optionally choose one eligible exactly referenced held item from those two.", responsible: "Affected player", resultLabel: "Revenge Choices", placeholder: "Two exact roster IDs and optional exact held item ID", confirmationLabel: "Apply Revenge" }, mechanicContract: { postPayoutBeforeControl: true, immutableBroughtSnapshotRequired: true, exactReleaseCount: 2, qualifyingCurseMustTargetExactBroughtInstance: true, heldItemSelectionMaximum: 1, heldItemMustBelongToSelectedReleasedPokemon: true, exactHeldInventoryReferenceRequired: true, masterBallTierProtected: true, sameNameInventoryGuessingForbidden: true, atomicResolutionRequired: true, idempotentResolutionRequired: true, adminUndoRequired: true, optionalOfferCanBeDeclinedWithoutConsumption: true, productionChoiceScreenRequired: true } }),
   764 |
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
```

#### Encounter-family contract model — `encounter({` — line 766

```text
   762 |     protection({ id: "immunity", name: "Immunity", aliases: ["Emergency Immunity Token"], rulesText: "Negate any effect or global effect. Does not stop Series Restricts or bans", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "immunity", canRespondTo: ["targetedEffect", "globalEffect"], protectionScope: ["targetedEffect", "globalEffect"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Immunity atomically negates its exact current parent prompt and is covered across reload, undo, results, and sandbox isolation.", automaticMutations: ["Negate the parent prompt"] }),
   763 |     protection({ id: "revenge", name: "Revenge", rulesText: "After a Battle Phase where an opponent cursed a Pokemon you brought, release 2 Pokemon from their brought team and destroy the held item", isResponse: false, legalPhases: [], timingWindows: ["endOfBattlePhaseProcedure"], phaseBoundaryProcedure: "endOfBattlePhaseProcedure", explicitPhaseTiming: "postPayoutBeforeControl", activationPattern: "phaseBoundaryOptionalTrigger", activationType: "Post-payout optional offer", requiresPendingEvent: false, createsPendingEvent: true, opensResponseWindow: false, targetType: "team", targetScope: "singleTeam", targetControllerRelation: "otherPlayer", otherPlayerOnly: true, excludeActor: true, differentControllerRequired: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "revengeRelease", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Revenge is offered after payout from exact current-Gym Curse anchors and the immutable brought-team snapshot. It consumes only after the affected player confirms two exact Pokemon and an optional eligible held Item.", requiredChoices: ["Exactly two exact Pokemon from the offender's immutable brought team", "At most one eligible held item from those two"], guidedTask: { instruction: "Choose exactly two exact roster instances from the offending player's immutable brought-team snapshot, then optionally choose one eligible exactly referenced held item from those two.", responsible: "Affected player", resultLabel: "Revenge Choices", placeholder: "Two exact roster IDs and optional exact held item ID", confirmationLabel: "Apply Revenge" }, mechanicContract: { postPayoutBeforeControl: true, immutableBroughtSnapshotRequired: true, exactReleaseCount: 2, qualifyingCurseMustTargetExactBroughtInstance: true, heldItemSelectionMaximum: 1, heldItemMustBelongToSelectedReleasedPokemon: true, exactHeldInventoryReferenceRequired: true, masterBallTierProtected: true, sameNameInventoryGuessingForbidden: true, atomicResolutionRequired: true, idempotentResolutionRequired: true, adminUndoRequired: true, optionalOfferCanBeDeclinedWithoutConsumption: true, productionChoiceScreenRequired: true } }),
   764 |
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
```

#### Encounter token names — `"Extra Encounter Token"` — line 766

```text
   762 |     protection({ id: "immunity", name: "Immunity", aliases: ["Emergency Immunity Token"], rulesText: "Negate any effect or global effect. Does not stop Series Restricts or bans", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "immunity", canRespondTo: ["targetedEffect", "globalEffect"], protectionScope: ["targetedEffect", "globalEffect"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Immunity atomically negates its exact current parent prompt and is covered across reload, undo, results, and sandbox isolation.", automaticMutations: ["Negate the parent prompt"] }),
   763 |     protection({ id: "revenge", name: "Revenge", rulesText: "After a Battle Phase where an opponent cursed a Pokemon you brought, release 2 Pokemon from their brought team and destroy the held item", isResponse: false, legalPhases: [], timingWindows: ["endOfBattlePhaseProcedure"], phaseBoundaryProcedure: "endOfBattlePhaseProcedure", explicitPhaseTiming: "postPayoutBeforeControl", activationPattern: "phaseBoundaryOptionalTrigger", activationType: "Post-payout optional offer", requiresPendingEvent: false, createsPendingEvent: true, opensResponseWindow: false, targetType: "team", targetScope: "singleTeam", targetControllerRelation: "otherPlayer", otherPlayerOnly: true, excludeActor: true, differentControllerRequired: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "revengeRelease", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Revenge is offered after payout from exact current-Gym Curse anchors and the immutable brought-team snapshot. It consumes only after the affected player confirms two exact Pokemon and an optional eligible held Item.", requiredChoices: ["Exactly two exact Pokemon from the offender's immutable brought team", "At most one eligible held item from those two"], guidedTask: { instruction: "Choose exactly two exact roster instances from the offending player's immutable brought-team snapshot, then optionally choose one eligible exactly referenced held item from those two.", responsible: "Affected player", resultLabel: "Revenge Choices", placeholder: "Two exact roster IDs and optional exact held item ID", confirmationLabel: "Apply Revenge" }, mechanicContract: { postPayoutBeforeControl: true, immutableBroughtSnapshotRequired: true, exactReleaseCount: 2, qualifyingCurseMustTargetExactBroughtInstance: true, heldItemSelectionMaximum: 1, heldItemMustBelongToSelectedReleasedPokemon: true, exactHeldInventoryReferenceRequired: true, masterBallTierProtected: true, sameNameInventoryGuessingForbidden: true, atomicResolutionRequired: true, idempotentResolutionRequired: true, adminUndoRequired: true, optionalOfferCanBeDeclinedWithoutConsumption: true, productionChoiceScreenRequired: true } }),
   764 |
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
```

#### Old encounter result/event bridge — `"encounterResult"` — line 767

```text
   763 |     protection({ id: "revenge", name: "Revenge", rulesText: "After a Battle Phase where an opponent cursed a Pokemon you brought, release 2 Pokemon from their brought team and destroy the held item", isResponse: false, legalPhases: [], timingWindows: ["endOfBattlePhaseProcedure"], phaseBoundaryProcedure: "endOfBattlePhaseProcedure", explicitPhaseTiming: "postPayoutBeforeControl", activationPattern: "phaseBoundaryOptionalTrigger", activationType: "Post-payout optional offer", requiresPendingEvent: false, createsPendingEvent: true, opensResponseWindow: false, targetType: "team", targetScope: "singleTeam", targetControllerRelation: "otherPlayer", otherPlayerOnly: true, excludeActor: true, differentControllerRequired: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "revengeRelease", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Revenge is offered after payout from exact current-Gym Curse anchors and the immutable brought-team snapshot. It consumes only after the affected player confirms two exact Pokemon and an optional eligible held Item.", requiredChoices: ["Exactly two exact Pokemon from the offender's immutable brought team", "At most one eligible held item from those two"], guidedTask: { instruction: "Choose exactly two exact roster instances from the offending player's immutable brought-team snapshot, then optionally choose one eligible exactly referenced held item from those two.", responsible: "Affected player", resultLabel: "Revenge Choices", placeholder: "Two exact roster IDs and optional exact held item ID", confirmationLabel: "Apply Revenge" }, mechanicContract: { postPayoutBeforeControl: true, immutableBroughtSnapshotRequired: true, exactReleaseCount: 2, qualifyingCurseMustTargetExactBroughtInstance: true, heldItemSelectionMaximum: 1, heldItemMustBelongToSelectedReleasedPokemon: true, exactHeldInventoryReferenceRequired: true, masterBallTierProtected: true, sameNameInventoryGuessingForbidden: true, atomicResolutionRequired: true, idempotentResolutionRequired: true, adminUndoRequired: true, optionalOfferCanBeDeclinedWithoutConsumption: true, productionChoiceScreenRequired: true } }),
   764 |
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
```

#### Old encounter resolver IDs — `"encounterWheelEdit"` — line 767

```text
   763 |     protection({ id: "revenge", name: "Revenge", rulesText: "After a Battle Phase where an opponent cursed a Pokemon you brought, release 2 Pokemon from their brought team and destroy the held item", isResponse: false, legalPhases: [], timingWindows: ["endOfBattlePhaseProcedure"], phaseBoundaryProcedure: "endOfBattlePhaseProcedure", explicitPhaseTiming: "postPayoutBeforeControl", activationPattern: "phaseBoundaryOptionalTrigger", activationType: "Post-payout optional offer", requiresPendingEvent: false, createsPendingEvent: true, opensResponseWindow: false, targetType: "team", targetScope: "singleTeam", targetControllerRelation: "otherPlayer", otherPlayerOnly: true, excludeActor: true, differentControllerRequired: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "revengeRelease", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Revenge is offered after payout from exact current-Gym Curse anchors and the immutable brought-team snapshot. It consumes only after the affected player confirms two exact Pokemon and an optional eligible held Item.", requiredChoices: ["Exactly two exact Pokemon from the offender's immutable brought team", "At most one eligible held item from those two"], guidedTask: { instruction: "Choose exactly two exact roster instances from the offending player's immutable brought-team snapshot, then optionally choose one eligible exactly referenced held item from those two.", responsible: "Affected player", resultLabel: "Revenge Choices", placeholder: "Two exact roster IDs and optional exact held item ID", confirmationLabel: "Apply Revenge" }, mechanicContract: { postPayoutBeforeControl: true, immutableBroughtSnapshotRequired: true, exactReleaseCount: 2, qualifyingCurseMustTargetExactBroughtInstance: true, heldItemSelectionMaximum: 1, heldItemMustBelongToSelectedReleasedPokemon: true, exactHeldInventoryReferenceRequired: true, masterBallTierProtected: true, sameNameInventoryGuessingForbidden: true, atomicResolutionRequired: true, idempotentResolutionRequired: true, adminUndoRequired: true, optionalOfferCanBeDeclinedWithoutConsumption: true, productionChoiceScreenRequired: true } }),
   764 |
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
```

#### Encounter-family contract model — `encounter({` — line 767

```text
   763 |     protection({ id: "revenge", name: "Revenge", rulesText: "After a Battle Phase where an opponent cursed a Pokemon you brought, release 2 Pokemon from their brought team and destroy the held item", isResponse: false, legalPhases: [], timingWindows: ["endOfBattlePhaseProcedure"], phaseBoundaryProcedure: "endOfBattlePhaseProcedure", explicitPhaseTiming: "postPayoutBeforeControl", activationPattern: "phaseBoundaryOptionalTrigger", activationType: "Post-payout optional offer", requiresPendingEvent: false, createsPendingEvent: true, opensResponseWindow: false, targetType: "team", targetScope: "singleTeam", targetControllerRelation: "otherPlayer", otherPlayerOnly: true, excludeActor: true, differentControllerRequired: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "revengeRelease", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Revenge is offered after payout from exact current-Gym Curse anchors and the immutable brought-team snapshot. It consumes only after the affected player confirms two exact Pokemon and an optional eligible held Item.", requiredChoices: ["Exactly two exact Pokemon from the offender's immutable brought team", "At most one eligible held item from those two"], guidedTask: { instruction: "Choose exactly two exact roster instances from the offending player's immutable brought-team snapshot, then optionally choose one eligible exactly referenced held item from those two.", responsible: "Affected player", resultLabel: "Revenge Choices", placeholder: "Two exact roster IDs and optional exact held item ID", confirmationLabel: "Apply Revenge" }, mechanicContract: { postPayoutBeforeControl: true, immutableBroughtSnapshotRequired: true, exactReleaseCount: 2, qualifyingCurseMustTargetExactBroughtInstance: true, heldItemSelectionMaximum: 1, heldItemMustBelongToSelectedReleasedPokemon: true, exactHeldInventoryReferenceRequired: true, masterBallTierProtected: true, sameNameInventoryGuessingForbidden: true, atomicResolutionRequired: true, idempotentResolutionRequired: true, adminUndoRequired: true, optionalOfferCanBeDeclinedWithoutConsumption: true, productionChoiceScreenRequired: true } }),
   764 |
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
```

#### Encounter token names — `"Repel"` — line 767

```text
   763 |     protection({ id: "revenge", name: "Revenge", rulesText: "After a Battle Phase where an opponent cursed a Pokemon you brought, release 2 Pokemon from their brought team and destroy the held item", isResponse: false, legalPhases: [], timingWindows: ["endOfBattlePhaseProcedure"], phaseBoundaryProcedure: "endOfBattlePhaseProcedure", explicitPhaseTiming: "postPayoutBeforeControl", activationPattern: "phaseBoundaryOptionalTrigger", activationType: "Post-payout optional offer", requiresPendingEvent: false, createsPendingEvent: true, opensResponseWindow: false, targetType: "team", targetScope: "singleTeam", targetControllerRelation: "otherPlayer", otherPlayerOnly: true, excludeActor: true, differentControllerRequired: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "revengeRelease", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Revenge is offered after payout from exact current-Gym Curse anchors and the immutable brought-team snapshot. It consumes only after the affected player confirms two exact Pokemon and an optional eligible held Item.", requiredChoices: ["Exactly two exact Pokemon from the offender's immutable brought team", "At most one eligible held item from those two"], guidedTask: { instruction: "Choose exactly two exact roster instances from the offending player's immutable brought-team snapshot, then optionally choose one eligible exactly referenced held item from those two.", responsible: "Affected player", resultLabel: "Revenge Choices", placeholder: "Two exact roster IDs and optional exact held item ID", confirmationLabel: "Apply Revenge" }, mechanicContract: { postPayoutBeforeControl: true, immutableBroughtSnapshotRequired: true, exactReleaseCount: 2, qualifyingCurseMustTargetExactBroughtInstance: true, heldItemSelectionMaximum: 1, heldItemMustBelongToSelectedReleasedPokemon: true, exactHeldInventoryReferenceRequired: true, masterBallTierProtected: true, sameNameInventoryGuessingForbidden: true, atomicResolutionRequired: true, idempotentResolutionRequired: true, adminUndoRequired: true, optionalOfferCanBeDeclinedWithoutConsumption: true, productionChoiceScreenRequired: true } }),
   764 |
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
```

#### Old encounter result/event bridge — `"encounterResult"` — line 768

```text
   764 |
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
```

#### Old encounter resolver IDs — `"encounterTransfer"` — line 768

```text
   764 |
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
```

#### Encounter-family contract model — `encounter({` — line 768

```text
   764 |
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
```

#### Encounter token names — `"Quick Ball Token"` — line 768

```text
   764 |
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
```

#### Old encounter result/event bridge — `"encounterResult"` — line 769

```text
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 |
```

#### Old encounter resolver IDs — `"encounterGrant"` — line 769

```text
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 |
```

#### Encounter-family contract model — `encounter({` — line 769

```text
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 |
```

#### Encounter token names — `"Dream Ball Token"` — line 769

```text
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 |
```

#### Old encounter result/event bridge — `"encounterResult"` — line 770

```text
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 |
   774 |     control({ id: "move-deleter", name: "Move Deleter", aliases: ["Move Deleter Curse"], rulesText: "Ban one move from being brought for 1 week. Cannot be used after team submission", targetType: "resource", targetScope: "singleResource", selectedTargetType: "move", applicationScope: "tableWide", affectedEntityType: "move", targetScopeStatus: "settled", targetControllerRelation: "notApplicable", minTargets: 1, maxTargets: 1, targetCollectionType: "canonicalMove", resolverMode: resolverModes.AUTOMATIC, resolverId: "moveBan", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Move Deleter records one canonical global move restriction for the next Gym and the Teambuilder and validator enforce it.", requiredChoices: ["One canonical move"], persistence: "lingeringEffect", duration: "Next Gym", expirationPoint: "End of the next Gym", automaticMutations: ["Create a global move restriction keyed by canonical move identity", "Disable the move in Teambuilder and team validation during the next Gym", "Expire the restriction when that Gym ends"] }),
```

#### Old encounter resolver IDs — `"encounterCopy"` — line 770

```text
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 |
   774 |     control({ id: "move-deleter", name: "Move Deleter", aliases: ["Move Deleter Curse"], rulesText: "Ban one move from being brought for 1 week. Cannot be used after team submission", targetType: "resource", targetScope: "singleResource", selectedTargetType: "move", applicationScope: "tableWide", affectedEntityType: "move", targetScopeStatus: "settled", targetControllerRelation: "notApplicable", minTargets: 1, maxTargets: 1, targetCollectionType: "canonicalMove", resolverMode: resolverModes.AUTOMATIC, resolverId: "moveBan", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Move Deleter records one canonical global move restriction for the next Gym and the Teambuilder and validator enforce it.", requiredChoices: ["One canonical move"], persistence: "lingeringEffect", duration: "Next Gym", expirationPoint: "End of the next Gym", automaticMutations: ["Create a global move restriction keyed by canonical move identity", "Disable the move in Teambuilder and team validation during the next Gym", "Expire the restriction when that Gym ends"] }),
```

#### Encounter-family contract model — `encounter({` — line 770

```text
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 |
   774 |     control({ id: "move-deleter", name: "Move Deleter", aliases: ["Move Deleter Curse"], rulesText: "Ban one move from being brought for 1 week. Cannot be used after team submission", targetType: "resource", targetScope: "singleResource", selectedTargetType: "move", applicationScope: "tableWide", affectedEntityType: "move", targetScopeStatus: "settled", targetControllerRelation: "notApplicable", minTargets: 1, maxTargets: 1, targetCollectionType: "canonicalMove", resolverMode: resolverModes.AUTOMATIC, resolverId: "moveBan", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Move Deleter records one canonical global move restriction for the next Gym and the Teambuilder and validator enforce it.", requiredChoices: ["One canonical move"], persistence: "lingeringEffect", duration: "Next Gym", expirationPoint: "End of the next Gym", automaticMutations: ["Create a global move restriction keyed by canonical move identity", "Disable the move in Teambuilder and team validation during the next Gym", "Expire the restriction when that Gym ends"] }),
```

#### Encounter token names — `"Honey"` — line 770

```text
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 |
   774 |     control({ id: "move-deleter", name: "Move Deleter", aliases: ["Move Deleter Curse"], rulesText: "Ban one move from being brought for 1 week. Cannot be used after team submission", targetType: "resource", targetScope: "singleResource", selectedTargetType: "move", applicationScope: "tableWide", affectedEntityType: "move", targetScopeStatus: "settled", targetControllerRelation: "notApplicable", minTargets: 1, maxTargets: 1, targetCollectionType: "canonicalMove", resolverMode: resolverModes.AUTOMATIC, resolverId: "moveBan", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Move Deleter records one canonical global move restriction for the next Gym and the Teambuilder and validator enforce it.", requiredChoices: ["One canonical move"], persistence: "lingeringEffect", duration: "Next Gym", expirationPoint: "End of the next Gym", automaticMutations: ["Create a global move restriction keyed by canonical move identity", "Disable the move in Teambuilder and team validation during the next Gym", "Expire the restriction when that Gym ends"] }),
```

#### Old encounter result/event bridge — `"encounterResult"` — line 771

```text
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 |
   774 |     control({ id: "move-deleter", name: "Move Deleter", aliases: ["Move Deleter Curse"], rulesText: "Ban one move from being brought for 1 week. Cannot be used after team submission", targetType: "resource", targetScope: "singleResource", selectedTargetType: "move", applicationScope: "tableWide", affectedEntityType: "move", targetScopeStatus: "settled", targetControllerRelation: "notApplicable", minTargets: 1, maxTargets: 1, targetCollectionType: "canonicalMove", resolverMode: resolverModes.AUTOMATIC, resolverId: "moveBan", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Move Deleter records one canonical global move restriction for the next Gym and the Teambuilder and validator enforce it.", requiredChoices: ["One canonical move"], persistence: "lingeringEffect", duration: "Next Gym", expirationPoint: "End of the next Gym", automaticMutations: ["Create a global move restriction keyed by canonical move identity", "Disable the move in Teambuilder and team validation during the next Gym", "Expire the restriction when that Gym ends"] }),
   775 |     curse({ id: "toxic-curse", name: "Toxic Curse", rulesText: "Force a Pokemon to carry a Toxic Orb for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Toxic Orb status with exact protected-instance exclusions"] }),
```

#### Old encounter resolver IDs — `"encounterChoose"` — line 771

```text
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 |
   774 |     control({ id: "move-deleter", name: "Move Deleter", aliases: ["Move Deleter Curse"], rulesText: "Ban one move from being brought for 1 week. Cannot be used after team submission", targetType: "resource", targetScope: "singleResource", selectedTargetType: "move", applicationScope: "tableWide", affectedEntityType: "move", targetScopeStatus: "settled", targetControllerRelation: "notApplicable", minTargets: 1, maxTargets: 1, targetCollectionType: "canonicalMove", resolverMode: resolverModes.AUTOMATIC, resolverId: "moveBan", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Move Deleter records one canonical global move restriction for the next Gym and the Teambuilder and validator enforce it.", requiredChoices: ["One canonical move"], persistence: "lingeringEffect", duration: "Next Gym", expirationPoint: "End of the next Gym", automaticMutations: ["Create a global move restriction keyed by canonical move identity", "Disable the move in Teambuilder and team validation during the next Gym", "Expire the restriction when that Gym ends"] }),
   775 |     curse({ id: "toxic-curse", name: "Toxic Curse", rulesText: "Force a Pokemon to carry a Toxic Orb for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Toxic Orb status with exact protected-instance exclusions"] }),
```

#### Encounter-family contract model — `encounter({` — line 771

```text
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 |
   774 |     control({ id: "move-deleter", name: "Move Deleter", aliases: ["Move Deleter Curse"], rulesText: "Ban one move from being brought for 1 week. Cannot be used after team submission", targetType: "resource", targetScope: "singleResource", selectedTargetType: "move", applicationScope: "tableWide", affectedEntityType: "move", targetScopeStatus: "settled", targetControllerRelation: "notApplicable", minTargets: 1, maxTargets: 1, targetCollectionType: "canonicalMove", resolverMode: resolverModes.AUTOMATIC, resolverId: "moveBan", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Move Deleter records one canonical global move restriction for the next Gym and the Teambuilder and validator enforce it.", requiredChoices: ["One canonical move"], persistence: "lingeringEffect", duration: "Next Gym", expirationPoint: "End of the next Gym", automaticMutations: ["Create a global move restriction keyed by canonical move identity", "Disable the move in Teambuilder and team validation during the next Gym", "Expire the restriction when that Gym ends"] }),
   775 |     curse({ id: "toxic-curse", name: "Toxic Curse", rulesText: "Force a Pokemon to carry a Toxic Orb for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Toxic Orb status with exact protected-instance exclusions"] }),
```

#### Encounter token names — `"Master Ball Token"` — line 771

```text
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 |
   774 |     control({ id: "move-deleter", name: "Move Deleter", aliases: ["Move Deleter Curse"], rulesText: "Ban one move from being brought for 1 week. Cannot be used after team submission", targetType: "resource", targetScope: "singleResource", selectedTargetType: "move", applicationScope: "tableWide", affectedEntityType: "move", targetScopeStatus: "settled", targetControllerRelation: "notApplicable", minTargets: 1, maxTargets: 1, targetCollectionType: "canonicalMove", resolverMode: resolverModes.AUTOMATIC, resolverId: "moveBan", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Move Deleter records one canonical global move restriction for the next Gym and the Teambuilder and validator enforce it.", requiredChoices: ["One canonical move"], persistence: "lingeringEffect", duration: "Next Gym", expirationPoint: "End of the next Gym", automaticMutations: ["Create a global move restriction keyed by canonical move identity", "Disable the move in Teambuilder and team validation during the next Gym", "Expire the restriction when that Gym ends"] }),
   775 |     curse({ id: "toxic-curse", name: "Toxic Curse", rulesText: "Force a Pokemon to carry a Toxic Orb for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Toxic Orb status with exact protected-instance exclusions"] }),
```

#### Old encounter result/event bridge — `"encounterResult"` — line 772

```text
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 |
   774 |     control({ id: "move-deleter", name: "Move Deleter", aliases: ["Move Deleter Curse"], rulesText: "Ban one move from being brought for 1 week. Cannot be used after team submission", targetType: "resource", targetScope: "singleResource", selectedTargetType: "move", applicationScope: "tableWide", affectedEntityType: "move", targetScopeStatus: "settled", targetControllerRelation: "notApplicable", minTargets: 1, maxTargets: 1, targetCollectionType: "canonicalMove", resolverMode: resolverModes.AUTOMATIC, resolverId: "moveBan", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Move Deleter records one canonical global move restriction for the next Gym and the Teambuilder and validator enforce it.", requiredChoices: ["One canonical move"], persistence: "lingeringEffect", duration: "Next Gym", expirationPoint: "End of the next Gym", automaticMutations: ["Create a global move restriction keyed by canonical move identity", "Disable the move in Teambuilder and team validation during the next Gym", "Expire the restriction when that Gym ends"] }),
   775 |     curse({ id: "toxic-curse", name: "Toxic Curse", rulesText: "Force a Pokemon to carry a Toxic Orb for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Toxic Orb status with exact protected-instance exclusions"] }),
   776 |     curse({ id: "iron-ball-curse", name: "Iron Ball Curse", rulesText: "Force a Pokemon to carry an Iron Ball for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Iron Ball status with exact protected-instance exclusions"] }),
```

#### Old encounter resolver IDs — `"encounterGrant"` — line 772

```text
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 |
   774 |     control({ id: "move-deleter", name: "Move Deleter", aliases: ["Move Deleter Curse"], rulesText: "Ban one move from being brought for 1 week. Cannot be used after team submission", targetType: "resource", targetScope: "singleResource", selectedTargetType: "move", applicationScope: "tableWide", affectedEntityType: "move", targetScopeStatus: "settled", targetControllerRelation: "notApplicable", minTargets: 1, maxTargets: 1, targetCollectionType: "canonicalMove", resolverMode: resolverModes.AUTOMATIC, resolverId: "moveBan", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Move Deleter records one canonical global move restriction for the next Gym and the Teambuilder and validator enforce it.", requiredChoices: ["One canonical move"], persistence: "lingeringEffect", duration: "Next Gym", expirationPoint: "End of the next Gym", automaticMutations: ["Create a global move restriction keyed by canonical move identity", "Disable the move in Teambuilder and team validation during the next Gym", "Expire the restriction when that Gym ends"] }),
   775 |     curse({ id: "toxic-curse", name: "Toxic Curse", rulesText: "Force a Pokemon to carry a Toxic Orb for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Toxic Orb status with exact protected-instance exclusions"] }),
   776 |     curse({ id: "iron-ball-curse", name: "Iron Ball Curse", rulesText: "Force a Pokemon to carry an Iron Ball for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Iron Ball status with exact protected-instance exclusions"] }),
```

#### Encounter-family contract model — `encounter({` — line 772

```text
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 |
   774 |     control({ id: "move-deleter", name: "Move Deleter", aliases: ["Move Deleter Curse"], rulesText: "Ban one move from being brought for 1 week. Cannot be used after team submission", targetType: "resource", targetScope: "singleResource", selectedTargetType: "move", applicationScope: "tableWide", affectedEntityType: "move", targetScopeStatus: "settled", targetControllerRelation: "notApplicable", minTargets: 1, maxTargets: 1, targetCollectionType: "canonicalMove", resolverMode: resolverModes.AUTOMATIC, resolverId: "moveBan", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Move Deleter records one canonical global move restriction for the next Gym and the Teambuilder and validator enforce it.", requiredChoices: ["One canonical move"], persistence: "lingeringEffect", duration: "Next Gym", expirationPoint: "End of the next Gym", automaticMutations: ["Create a global move restriction keyed by canonical move identity", "Disable the move in Teambuilder and team validation during the next Gym", "Expire the restriction when that Gym ends"] }),
   775 |     curse({ id: "toxic-curse", name: "Toxic Curse", rulesText: "Force a Pokemon to carry a Toxic Orb for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Toxic Orb status with exact protected-instance exclusions"] }),
   776 |     curse({ id: "iron-ball-curse", name: "Iron Ball Curse", rulesText: "Force a Pokemon to carry an Iron Ball for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Iron Ball status with exact protected-instance exclusions"] }),
```

#### Encounter token names — `"Beast Ball"` — line 772

```text
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 |
   774 |     control({ id: "move-deleter", name: "Move Deleter", aliases: ["Move Deleter Curse"], rulesText: "Ban one move from being brought for 1 week. Cannot be used after team submission", targetType: "resource", targetScope: "singleResource", selectedTargetType: "move", applicationScope: "tableWide", affectedEntityType: "move", targetScopeStatus: "settled", targetControllerRelation: "notApplicable", minTargets: 1, maxTargets: 1, targetCollectionType: "canonicalMove", resolverMode: resolverModes.AUTOMATIC, resolverId: "moveBan", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Move Deleter records one canonical global move restriction for the next Gym and the Teambuilder and validator enforce it.", requiredChoices: ["One canonical move"], persistence: "lingeringEffect", duration: "Next Gym", expirationPoint: "End of the next Gym", automaticMutations: ["Create a global move restriction keyed by canonical move identity", "Disable the move in Teambuilder and team validation during the next Gym", "Expire the restriction when that Gym ends"] }),
   775 |     curse({ id: "toxic-curse", name: "Toxic Curse", rulesText: "Force a Pokemon to carry a Toxic Orb for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Toxic Orb status with exact protected-instance exclusions"] }),
   776 |     curse({ id: "iron-ball-curse", name: "Iron Ball Curse", rulesText: "Force a Pokemon to carry an Iron Ball for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Iron Ball status with exact protected-instance exclusions"] }),
```

#### Old encounter resolver IDs — `"encounterCopy"` — line 818

```text
   814 |       expirationPoint: "At the same phase boundary one Gym later.",
   815 |       mechanicContract: { selectedAnchorScope: "rosterInstance", applicationScope: "globalSpecies", directPreEvolutionOnly: true, ambiguousOrUnsafeParentFailsBeforeConsumption: true, stableRosterIdentityRequired: true, temporarySpeciesOverlayRequired: true, mandatoryTeamRevisionWhenBuildIllegal: true, preserveTeamMembership: true, exactExpirationRestoration: true, perInstanceProtection: true }
   816 |     },
   817 |     "honey-token": {
   818 |       resolverMode: resolverModes.AUTOMATIC, resolverId: "encounterCopy", copiedPayloadStatus: "settled",
   819 |       runtimeUsability: runtimeUsabilityStatuses.USABLE,
   820 |       runtimeUsabilityReason: "Honey copies one immutable completed Encounter result at the End-of-Action checkpoint into a new acquisition-ready Encounter record without rerolling or copying ownership and transient history.",
   821 |       opensResponseWindow: false,
   822 |       mechanicContract: { immutableCompletedEncounterRequired: true, currentActionPhaseOnly: true, exactSelectionWhenMultiple: true, copiedSpeciesFormTierLevelAndIntrinsicProperties: true, newEncounterAndRosterIdentitiesRequired: true, doNotCopyOwnershipStatusHeldItemsRerollHistoryConsumedModifiersBonusesOrReferences: true, duplicateCopyForbidden: true }
```

#### Old encounter result/event bridge — `"encounterResult"` — line 1193

```text
  1189 |           errors.push(`${definition.id}: incomplete private non-debuff reveal contract`);
  1190 |         }
  1191 |       }
  1192 |       if (definition.id === "honey-token") {
  1193 |         if (definition.legalPhases.includes("encounterResult") || definition.timingWindows.includes("encounterResult") || definition.isResponse || definition.requiresPendingEvent) {
  1194 |           errors.push(`${definition.id}: Honey cannot publish encounterResult response timing`);
  1195 |         }
  1196 |         if (definition.phaseBoundaryProcedure !== "endOfActionPhaseProcedure" || definition.explicitPhaseTiming !== "endOfActionPhase"
  1197 |           || definition.activationPattern !== "phaseBoundaryOptionalTrigger" || definition.eligibleRecordType !== "encounter"
```


## Stale tooling inventory

- `scripts/run-token-qa-coverage.js` — present, 41 lines
- `scripts/test-encounter-token-runtime.js` — present, 114 lines
- `scripts/test-token-sandbox.js` — present, 1175 lines
- `scripts/token-qa-coverage-data.js` — present, 2253 lines

## Decision boundary for Stage 8B

1. Dead wheel-era runtime bridge: remove.
2. Shared generic Pokemon-result / Live Referee infrastructure: preserve, removing only Encounter-specific branches.
3. Current Route token: migrate contract/runtime metadata to the existing V2 Route handler.
4. Encounter token concept without current Route implementation: preserve the concept, but do not claim deleted V1 runtime verification.
5. Historical QA/tooling tied only to deleted Encounter runtime: defer until production runtime is clean.
