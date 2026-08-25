# V1 Purge Stage 8C — Encounter Callgraph Survey

Generated from `7c280537c0b9790ea3e7515b46bc704f4ce4dd16`.

Purpose: identify the exact remaining call sites for the Honey V1 bridge and Live Referee encounter-result channel before production deletion/migration.

This survey does not modify production runtime or token rules.

## Summary

| Group | File | Marker | Count | Lines | Enclosing functions |
|---|---|---|---:|---|---|
| Current Route token runtime | `app.js` | `V2_ROUTE_TOKEN_IDS` | 20 | 42507, 42514, 42515, 42516, 42517, 43857, 43890, 43922, 44091, 44092, 44093, 44145, 44194, 44233, 44295, 44801, 44821, 44839, 44850, 45040 | `getEncounterCapabilitiesForPlayer`, `getMasterBallOpportunityCapabilitiesForPlayer`, `getRouteRepelCapabilitiesForPlayer`, `useV2RouteRerollToken`, `useV2ExtraEncounter`, `applyV2RouteRepel`, `useV2MasterBallOnOpportunity`, `getRouteEncounterRailCapabilitiesForPlayer` |
| Current Route token runtime | `app.js` | `useV2RouteRerollToken` | 2 | 44798, 61736 | `useV2RouteRerollToken`, `bindEvents` |
| Current Route token runtime | `app.js` | `useV2ExtraEncounter` | 2 | 44818, 61754 | `useV2ExtraEncounter`, `bindEvents` |
| Current Route token runtime | `app.js` | `applyV2RouteRepel` | 2 | 44836, 61800 | `applyV2RouteRepel`, `bindEvents` |
| Current Route token runtime | `app.js` | `useV2MasterBallOnOpportunity` | 2 | 44847, 61803 | `useV2MasterBallOnOpportunity`, `bindEvents` |
| Encounter contract migration | `token-effect-contract.js` | `"encounter-token-runtime"` | 4 | 110, 262, 332, 339 |  |
| Encounter contract migration | `token-effect-contract.js` | `"encounterCopy"` | 3 | 380, 770, 818 |  |
| Encounter contract migration | `token-effect-contract.js` | `"encounterGrant"` | 3 | 380, 769, 772 |  |
| Encounter contract migration | `token-effect-contract.js` | `"encounterTransfer"` | 2 | 380, 768 |  |
| Encounter contract migration | `token-effect-contract.js` | `"encounterWheelEdit"` | 2 | 380, 767 |  |
| Encounter contract migration | `token-effect-contract.js` | `"encounterChoose"` | 2 | 381, 771 |  |
| Encounter contract migration | `token-effect-contract.js` | `encounter({ id: "reroll-token"` | 1 | 765 |  |
| Encounter contract migration | `token-effect-contract.js` | `encounter({ id: "extra-encounter-token"` | 1 | 766 |  |
| Encounter contract migration | `token-effect-contract.js` | `encounter({ id: "repel-token"` | 1 | 767 |  |
| Encounter contract migration | `token-effect-contract.js` | `encounter({ id: "quick-ball-token"` | 1 | 768 |  |
| Encounter contract migration | `token-effect-contract.js` | `encounter({ id: "dream-ball-token"` | 1 | 769 |  |
| Encounter contract migration | `token-effect-contract.js` | `encounter({ id: "honey-token"` | 1 | 770 |  |
| Encounter contract migration | `token-effect-contract.js` | `encounter({ id: "master-ball-token"` | 1 | 771 |  |
| Encounter contract migration | `token-effect-contract.js` | `encounter({ id: "beast-ball-token"` | 1 | 772 |  |
| Generic token activation bridge | `app.js` | `TOKEN_TIMING_ENGINE_V1_DEFINITIONS` | 2 | 2970, 3154 | `tokenEngineDefinitionByName` |
| Generic token activation bridge | `app.js` | `resolverId === "extraEncounter"` | 2 | 3299, 3891 |  |
| Generic token activation bridge | `app.js` | `resolveImmediateTokenUse` | 3 | 3889, 4152, 56385 | `resolveImmediateTokenUse`, `applyActivationOverlay` |
| Generic token activation bridge | `app.js` | `applyActivationOverlay` | 2 | 56356, 62335 | `applyActivationOverlay`, `bindEvents` |
| Generic token activation bridge | `app.js` | `["extraEncounter", "safeguard"]` | 1 | 56378 | `applyActivationOverlay` |
| Honey V1 bridge | `app.js` | `honey-end-action` | 3 | 31158, 48901, 48913 | `buildRivalSagaPokemonTierMap`, `ensureHoneyEndOfActionProcedures`, `honeyProcedureForActivity` |
| Honey V1 bridge | `app.js` | `resolveHoneyEndOfActionProcedure` | 2 | 32329, 48948 | `handleLiveTableClick`, `resolveHoneyEndOfActionProcedure` |
| Honey V1 bridge | `app.js` | `augmentHoneyCausalUndoAfterAcquisition` | 2 | 41179, 41273 | `augmentHoneyCausalUndoAfterAcquisition` |
| Honey V1 bridge | `app.js` | `honeyEligibleEncounterResults` | 2 | 48867, 48878 | `honeyEligibleEncounterResults`, `ensureHoneyEndOfActionProcedures` |
| Honey V1 bridge | `app.js` | `ensureHoneyEndOfActionProcedures` | 2 | 48876, 49132 | `ensureHoneyEndOfActionProcedures` |
| Honey V1 bridge | `app.js` | `resolveHoneyEncounterCopy` | 1 | 48962 | `resolveHoneyEndOfActionProcedure` |
| Honey V1 bridge | `app.js` | `honey-encounter-copy` | 1 | 48997 | `resolveHoneyEndOfActionProcedure` |
| Honey V1 bridge | `token-control-effects.js` | `resolveHoneyEncounterCopy` | 2 | 2343, 3585 | `resolveHoneyEncounterCopy` |
| Live Referee encounter channel | `app.js` | `"encounter-reroll"` | 7 | 636, 648, 652, 663, 664, 23159, 41403 | `createPokemonResultTimingWindow` |
| Live Referee encounter channel | `app.js` | `"steal-encounter"` | 6 | 636, 648, 652, 669, 670, 23159 | `createPokemonResultTimingWindow` |
| Live Referee encounter channel | `app.js` | `"encounter-result"` | 9 | 650, 2731, 23152, 25519, 25532, 26165, 27594, 28011, 41036 | `createPokemonResultTimingWindow`, `liveActivityTimingCategory`, `liveTokenPromptDetails`, `getCurrentLivePrompt`, `currentEncounterPendingActivity`, `liveRefereePromptIsEncounterResult` |
| Live Referee encounter channel | `app.js` | `TOKEN_TIMING_CATEGORIES.ENCOUNTER` | 15 | 864, 865, 2722, 2976, 3121, 3143, 3146, 3233, 3439, 4139, 5968, 25519, 28000, 28291, 47530 | `tokenTimingCategoryFromRaw`, `tokenTimingCategoryLabel`, `tokenTimingCategoryOptions`, `liveActivityTimingCategory`, `liveRefereeTokenInventoryGroups`, `liveRefereeTokenUseIntentLabel`, `createAdminTestEvent` |
| Live Referee encounter channel | `app.js` | `TOKEN_USE_TYPES.ENCOUNTER_MODIFIER` | 2 | 866, 2723 |  |
| Live Referee encounter channel | `app.js` | `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` | 12 | 869, 2726, 25519, 25532, 26403, 26414, 27138, 27139, 27594, 28012, 46989, 47526 | `liveActivityTimingCategory`, `liveTokenPromptDetails`, `liveManualEventTypeOptions`, `liveTimingWindowOptions`, `createLiveManualEventFromForm`, `currentEncounterPendingActivity`, `liveRefereePromptIsEncounterResult`, `launchTokenScenarioSandbox`, `createAdminTestEvent` |
| Live Referee encounter channel | `app.js` | `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` | 14 | 2761, 2762, 2763, 2764, 2765, 2766, 2767, 3126, 3198, 3199, 3233, 3247, 3265, 29401 | `normalizeEffectTargetType`, `targetCategoryFromEffectBucket`, `buildRivalSagaPokemonTierMap` |
| Live Referee encounter channel | `app.js` | `EFFECT_TARGET_CATEGORIES.ENCOUNTER_RESULT` | 1 | 3265 | `targetCategoryFromEffectBucket` |
| Live Referee encounter channel | `app.js` | `createPokemonResultTimingWindow` | 2 | 23147, 41165 | `createPokemonResultTimingWindow` |
| Live Referee encounter channel | `app.js` | `liveActivityTimingCategory` | 3 | 25514, 25524, 29583 | `liveActivityTimingCategory`, `liveTokenPromptDetails`, `liveRefereeEventTypeLabel` |
| Live Referee encounter channel | `app.js` | `liveTokenPromptDetails` | 3 | 25523, 26166, 26203 | `liveTokenPromptDetails`, `getCurrentLivePrompt` |
| Live Referee encounter channel | `app.js` | `currentEncounterPendingActivity` | 2 | 27590, 27605 | `currentEncounterPendingActivity`, `recordEncounterTokenUse` |
| Live Referee encounter channel | `app.js` | `liveRefereePromptIsEncounterResult` | 2 | 28008, 28038 | `liveRefereePromptIsEncounterResult`, `liveRefereeTokenCanUseNow` |

## Detailed contexts

### Current Route token runtime — `app.js`

#### `V2_ROUTE_TOKEN_IDS` — line 42507

```text
 42504 |   Object.freeze({ id: "plus-1", label: "+1 tier", weight: 20, offset: 1 }),
 42505 |   Object.freeze({ id: "plus-2", label: "+2 tiers", weight: 5, offset: 2 })
 42506 | ]);
 42507 | const V2_ROUTE_TOKEN_IDS = Object.freeze({
 42508 |   extraEncounter: "extra-encounter-token",
 42509 |   reroll: "reroll-token",
 42510 |   repel: "repel-token",
```

#### `V2_ROUTE_TOKEN_IDS` — line 42514

```text
 42511 |   masterBall: "master-ball-token"
 42512 | });
 42513 | const V2_ROUTE_TOKEN_NAMES = Object.freeze({
 42514 |   [V2_ROUTE_TOKEN_IDS.extraEncounter]: ["extra encounter token", "extra encounter"],
 42515 |   [V2_ROUTE_TOKEN_IDS.reroll]: ["reroll token", "reroll"],
 42516 |   [V2_ROUTE_TOKEN_IDS.repel]: ["repel token", "repel"],
 42517 |   [V2_ROUTE_TOKEN_IDS.masterBall]: ["master ball token", "master ball"]
```

#### `V2_ROUTE_TOKEN_IDS` — line 42515

```text
 42512 | });
 42513 | const V2_ROUTE_TOKEN_NAMES = Object.freeze({
 42514 |   [V2_ROUTE_TOKEN_IDS.extraEncounter]: ["extra encounter token", "extra encounter"],
 42515 |   [V2_ROUTE_TOKEN_IDS.reroll]: ["reroll token", "reroll"],
 42516 |   [V2_ROUTE_TOKEN_IDS.repel]: ["repel token", "repel"],
 42517 |   [V2_ROUTE_TOKEN_IDS.masterBall]: ["master ball token", "master ball"]
 42518 | });
```

#### `V2_ROUTE_TOKEN_IDS` — line 42516

```text
 42513 | const V2_ROUTE_TOKEN_NAMES = Object.freeze({
 42514 |   [V2_ROUTE_TOKEN_IDS.extraEncounter]: ["extra encounter token", "extra encounter"],
 42515 |   [V2_ROUTE_TOKEN_IDS.reroll]: ["reroll token", "reroll"],
 42516 |   [V2_ROUTE_TOKEN_IDS.repel]: ["repel token", "repel"],
 42517 |   [V2_ROUTE_TOKEN_IDS.masterBall]: ["master ball token", "master ball"]
 42518 | });
 42519 |
```

#### `V2_ROUTE_TOKEN_IDS` — line 42517

```text
 42514 |   [V2_ROUTE_TOKEN_IDS.extraEncounter]: ["extra encounter token", "extra encounter"],
 42515 |   [V2_ROUTE_TOKEN_IDS.reroll]: ["reroll token", "reroll"],
 42516 |   [V2_ROUTE_TOKEN_IDS.repel]: ["repel token", "repel"],
 42517 |   [V2_ROUTE_TOKEN_IDS.masterBall]: ["master ball token", "master ball"]
 42518 | });
 42519 |
 42520 | function activeActionPhaseVersion() {
```

#### `V2_ROUTE_TOKEN_IDS` — line 43857 — function `getEncounterCapabilitiesForPlayer` (43851-43872)

```text
 43854 |   const { route } = v2FindResult(routeState, result?.resultId);
 43855 |   const unresolved = Boolean(result && result.status === "unresolved");
 43856 |   const routeView = route ? getRouteViewForPlayer(routeState, route.routeNumber, playerId) : null;
 43857 |   const rerollTokens = v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.reroll);
 43858 |   const duplicate = unresolved && v2ResultIsDuplicateForPlayer(result, playerId);
 43859 |   return {
 43860 |     canAcquire: unresolved,
```

#### `V2_ROUTE_TOKEN_IDS` — line 43890 — function `getMasterBallOpportunityCapabilitiesForPlayer` (43887-43917)

```text
 43887 | function getMasterBallOpportunityCapabilitiesForPlayer(routeState, opportunityId, playerId) {
 43888 |   const player = state.players.find((entry) => entry.id === playerId);
 43889 |   const { route, opportunity } = v2FindOpportunity(routeState, opportunityId);
 43890 |   const tokens = v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.masterBall);
 43891 |   const view = route ? getRouteViewForPlayer(routeState, route.routeNumber, playerId) : null;
 43892 |   const eligibleResidents = view?.masterBallEligibleResidents || [];
 43893 |   const canUseMasterBall = Boolean(
```

#### `V2_ROUTE_TOKEN_IDS` — line 43922 — function `getRouteRepelCapabilitiesForPlayer` (43919-43974)

```text
 43919 | function getRouteRepelCapabilitiesForPlayer(routeState, routeNumber, playerId) {
 43920 |   const route = v2FindRoute(routeState, routeNumber);
 43921 |   const player = state.players.find((entry) => entry.id === playerId);
 43922 |   const repelTokens = v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.repel);
 43923 |   const activeSuppressed = new Set((route?.suppressions || [])
 43924 |     .filter((entry) => entry.status !== "expired" && entry.status !== "removed")
 43925 |     .flatMap((entry) => entry.residentIds || []));
```

#### `V2_ROUTE_TOKEN_IDS` — line 44091

```text
 44088 |   });
 44089 |   const item = {
 44090 |     purchaseId,
 44091 |     id: createInventoryEntryId(V2_ROUTE_TOKEN_IDS.extraEncounter),
 44092 |     catalogId: V2_ROUTE_TOKEN_IDS.extraEncounter,
 44093 |     canonicalId: V2_ROUTE_TOKEN_IDS.extraEncounter,
 44094 |     name: "Extra Encounter Token",
```

#### `V2_ROUTE_TOKEN_IDS` — line 44092

```text
 44089 |   const item = {
 44090 |     purchaseId,
 44091 |     id: createInventoryEntryId(V2_ROUTE_TOKEN_IDS.extraEncounter),
 44092 |     catalogId: V2_ROUTE_TOKEN_IDS.extraEncounter,
 44093 |     canonicalId: V2_ROUTE_TOKEN_IDS.extraEncounter,
 44094 |     name: "Extra Encounter Token",
 44095 |     type: "TOKEN",
```

#### `V2_ROUTE_TOKEN_IDS` — line 44093

```text
 44090 |     purchaseId,
 44091 |     id: createInventoryEntryId(V2_ROUTE_TOKEN_IDS.extraEncounter),
 44092 |     catalogId: V2_ROUTE_TOKEN_IDS.extraEncounter,
 44093 |     canonicalId: V2_ROUTE_TOKEN_IDS.extraEncounter,
 44094 |     name: "Extra Encounter Token",
 44095 |     type: "TOKEN",
 44096 |     tokenType: "encounter",
```

#### `V2_ROUTE_TOKEN_IDS` — line 44145

```text
 44142 |   if (!eligibleResidents.length || !v2RouteHasPositiveEncounterWeight(eligibleResidents)) {
 44143 |     throw new Error(`No eligible residents remain on Route ${route.routeNumber} for ${player.name}.`);
 44144 |   }
 44145 |   const token = v2ConsumeExactRouteToken(player, V2_ROUTE_TOKEN_IDS.extraEncounter, tokenInventoryId);
 44146 |   const operationId = v2NextEffectOperationId(state.series, "v2-extra-encounter");
 44147 |   const { opportunity } = v2CreateRouteEncounterOpportunity({
 44148 |     playerId,
```

#### `V2_ROUTE_TOKEN_IDS` — line 44194

```text
 44191 |   if (existingRequest?.resultId && result?.resultId === existingRequest.resultId) return result;
 44192 |   const existingTokenOperation = v2FindRouteEffectOperationByToken(state.series, "reroll-token", tokenInventoryId, player.id);
 44193 |   if (existingTokenOperation?.resultId === result?.resultId) return result;
 44194 |   const token = v2ConsumeExactRouteToken(player, V2_ROUTE_TOKEN_IDS.reroll, tokenInventoryId);
 44195 |   const rerolled = v2RerollRouteResult(result, player.id, { kind: "reroll-token", reason: "reroll-token", tokenInventoryId: token.id }, { token });
 44196 |   const operationId = v2NextEffectOperationId(state.series, "v2-reroll-token");
 44197 |   const operation = {
```

#### `V2_ROUTE_TOKEN_IDS` — line 44233

```text
 44230 |   if (existingRequest?.suppressionId) return (route.suppressions || []).find((entry) => entry.suppressionId === existingRequest.suppressionId) || null;
 44231 |   const existingTokenOperation = v2FindRouteEffectOperationByToken(state.series, "repel-token", tokenInventoryId, playerId);
 44232 |   if (existingTokenOperation?.suppressionId) return (route.suppressions || []).find((entry) => entry.suppressionId === existingTokenOperation.suppressionId) || null;
 44233 |   const token = v2ConsumeExactRouteToken(player, V2_ROUTE_TOKEN_IDS.repel, tokenInventoryId);
 44234 |   const rng = v2CreateRng(`${routeState.seed}:${route.routeId}:repel:${normalizedTier}:${routeState.revision}`);
 44235 |   const pool = [...candidates];
 44236 |   const selected = [];
```

#### `V2_ROUTE_TOKEN_IDS` — line 44295

```text
 44292 |   if (!resident || !(view.masterBallEligibleResidents || []).some((entry) => entry.residentId === residentId)) {
 44293 |     throw new Error("Master Ball can only select a resident revealed to that player on that Route.");
 44294 |   }
 44295 |   const token = v2ConsumeExactRouteToken(player, V2_ROUTE_TOKEN_IDS.masterBall, tokenInventoryId);
 44296 |   const resultId = v2NextCounterId(routeState, "result", "route-result");
 44297 |   const result = {
 44298 |     resultId,
```

#### `useV2RouteRerollToken` — line 44798 — function `useV2RouteRerollToken` (44798-44807)

```text
 44795 |   }
 44796 | }
 44797 |
 44798 | function useV2RouteRerollToken(actionId, tokenInventoryId = "") {
 44799 |   try {
 44800 |     const player = activePlayer();
 44801 |     const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.reroll)[0]?.id || "";
```

#### `V2_ROUTE_TOKEN_IDS` — line 44801 — function `useV2RouteRerollToken` (44798-44807)

```text
 44798 | function useV2RouteRerollToken(actionId, tokenInventoryId = "") {
 44799 |   try {
 44800 |     const player = activePlayer();
 44801 |     const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.reroll)[0]?.id || "";
 44802 |     const result = v2UseRerollTokenOnAction(actionId, tokenId, { actingPlayerId: player.id });
 44803 |     v2PersistRenderAndPublishRouteActivity({ stage: "rerolled", actorPlayerId: player.id, seriesId: state.series, routeNumber: result.routeNumber });
 44804 |   } catch (error) {
```

#### `useV2ExtraEncounter` — line 44818 — function `useV2ExtraEncounter` (44818-44834)

```text
 44815 |   }
 44816 | }
 44817 |
 44818 | function useV2ExtraEncounter(routeNumber, tokenInventoryId = "") {
 44819 |   try {
 44820 |     const player = activePlayer();
 44821 |     const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.extraEncounter)[0]?.id || "";
```

#### `V2_ROUTE_TOKEN_IDS` — line 44821 — function `useV2ExtraEncounter` (44818-44834)

```text
 44818 | function useV2ExtraEncounter(routeNumber, tokenInventoryId = "") {
 44819 |   try {
 44820 |     const player = activePlayer();
 44821 |     const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.extraEncounter)[0]?.id || "";
 44822 |     const operation = v2UseExtraEncounter(player.id, routeNumber, tokenId);
 44823 |     const workspace = v2RouteWorkspaceState(state.series);
 44824 |     workspace.screen = "result";
```

#### `applyV2RouteRepel` — line 44836 — function `applyV2RouteRepel` (44836-44845)

```text
 44833 |   }
 44834 | }
 44835 |
 44836 | function applyV2RouteRepel(routeNumber, battleTierId, tokenInventoryId = "") {
 44837 |   try {
 44838 |     const player = activePlayer();
 44839 |     const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.repel)[0]?.id || "";
```

#### `V2_ROUTE_TOKEN_IDS` — line 44839 — function `applyV2RouteRepel` (44836-44845)

```text
 44836 | function applyV2RouteRepel(routeNumber, battleTierId, tokenInventoryId = "") {
 44837 |   try {
 44838 |     const player = activePlayer();
 44839 |     const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.repel)[0]?.id || "";
 44840 |     v2ApplyRepelToRoute(player.id, routeNumber, battleTierId, tokenId);
 44841 |     v2PersistAndRender();
 44842 |   } catch (error) {
```

#### `useV2MasterBallOnOpportunity` — line 44847 — function `useV2MasterBallOnOpportunity` (44847-44864)

```text
 44844 |   }
 44845 | }
 44846 |
 44847 | function useV2MasterBallOnOpportunity(opportunityId, residentId, tokenInventoryId = "") {
 44848 |   try {
 44849 |     const player = activePlayer();
 44850 |     const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.masterBall)[0]?.id || "";
```

#### `V2_ROUTE_TOKEN_IDS` — line 44850 — function `useV2MasterBallOnOpportunity` (44847-44864)

```text
 44847 | function useV2MasterBallOnOpportunity(opportunityId, residentId, tokenInventoryId = "") {
 44848 |   try {
 44849 |     const player = activePlayer();
 44850 |     const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.masterBall)[0]?.id || "";
 44851 |     const operation = v2UseMasterBallOnOpportunity(player.id, opportunityId, residentId, tokenId);
 44852 |     const workspace = v2RouteWorkspaceState(state.series);
 44853 |     workspace.screen = "result";
```

#### `V2_ROUTE_TOKEN_IDS` — line 45040 — function `getRouteEncounterRailCapabilitiesForPlayer` (45028-45077)

```text
 45037 |   }
 45038 |   const workspace = v2RouteWorkspaceState(routeState.seriesId || state.series);
 45039 |   const pendingOpportunity = v2RoutePendingOpportunityForPlayer(routeState, route.routeNumber, playerId, workspace.activeOpportunityId);
 45040 |   const extraTokens = v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.extraEncounter);
 45041 |   const extraEligible = v2EligibleResidents(route, [], { routeState, playerId });
 45042 |   const progressionLegal = route.routeNumber <= v2CurrentProgressionRoute();
 45043 |   const extraCanUse = progressionLegal
```

#### `useV2RouteRerollToken` — line 61736 — function `bindEvents` (60119-62355)

```text
 61733 |     const routeRerollTokenButton = event.target.closest("[data-v2-route-reroll-token]");
 61734 |     if (routeRerollTokenButton && els.actionLocationBoard.contains(routeRerollTokenButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 61735 |       event.preventDefault();
 61736 |       useV2RouteRerollToken(routeRerollTokenButton.dataset.v2RouteRerollToken, routeRerollTokenButton.dataset.v2TokenId || "");
 61737 |       return;
 61738 |     }
 61739 |     const opportunityDrawButton = event.target.closest("[data-v2-opportunity-draw]");
```

#### `useV2ExtraEncounter` — line 61754 — function `bindEvents` (60119-62355)

```text
 61751 |     const railExtraUseButton = event.target.closest("[data-v2-rail-extra-use]");
 61752 |     if (railExtraUseButton && els.actionLocationBoard.contains(railExtraUseButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 61753 |       event.preventDefault();
 61754 |       if (!railExtraUseButton.disabled) useV2ExtraEncounter(Number(railExtraUseButton.dataset.v2RailExtraUse || 0), railExtraUseButton.dataset.v2TokenId || "");
 61755 |       return;
 61756 |     }
 61757 |     const railInjectionButton = event.target.closest("[data-v2-rail-injection-apply]");
```

#### `applyV2RouteRepel` — line 61800 — function `bindEvents` (60119-62355)

```text
 61797 |       const action = routeEffectApply.dataset.v2RouteEffectApply || "";
 61798 |       if (action === "repel") {
 61799 |         const tier = card?.querySelector('[data-v2-route-effect-field="repelTier"]')?.value || "";
 61800 |         applyV2RouteRepel(Number(routeEffectApply.dataset.v2RouteNumber || 0), tier, routeEffectApply.dataset.v2TokenId || "");
 61801 |       } else if (action === "master-ball") {
 61802 |         const residentId = card?.querySelector('[data-v2-route-effect-field="masterResident"]')?.value || "";
 61803 |         if (residentId) useV2MasterBallOnOpportunity(routeEffectApply.dataset.v2OpportunityId || "", residentId, routeEffectApply.dataset.v2TokenId || "");
```

#### `useV2MasterBallOnOpportunity` — line 61803 — function `bindEvents` (60119-62355)

```text
 61800 |         applyV2RouteRepel(Number(routeEffectApply.dataset.v2RouteNumber || 0), tier, routeEffectApply.dataset.v2TokenId || "");
 61801 |       } else if (action === "master-ball") {
 61802 |         const residentId = card?.querySelector('[data-v2-route-effect-field="masterResident"]')?.value || "";
 61803 |         if (residentId) useV2MasterBallOnOpportunity(routeEffectApply.dataset.v2OpportunityId || "", residentId, routeEffectApply.dataset.v2TokenId || "");
 61804 |       }
 61805 |       return;
 61806 |     }
```

### Encounter contract migration — `token-effect-contract.js`

#### `"encounter-token-runtime"` — line 110

```text
   107 |     "token-undo-repair",
   108 |     "token-inventory-runtime",
   109 |     "standard-curse-species-lifecycle",
   110 |     "encounter-token-runtime",
   111 |     "follow-me-e2e",
   112 |     "ditto-inventory-e2e",
   113 |     "lingering-aroma-e2e",
```

#### `"encounter-token-runtime"` — line 262

```text
   259 |     }),
   260 |     "extra-encounter-token": Object.freeze({
   261 |       status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
   262 |       tests: Object.freeze(["token-declaration-timing", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "encounter-token-runtime"]),
   263 |       evidence: "Action-only declaration, exact chosen-player validation, one authoritative Encounter roll grant, open-session extension, standalone session creation, stable grant identity, duplicate prevention, refresh persistence, normal Encounter completion, and snapshot undo are covered by focused runtime and integration tests.",
   264 |       verifiedAt: "2026-07-29",
   265 |       contractDefinitionRevision
```

#### `"encounter-token-runtime"` — line 332

```text
   329 |     }),
   330 |     "reroll-token": Object.freeze({
   331 |       status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
   332 |       tests: Object.freeze(["encounter-token-runtime", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "lifecycle-completion-slice-e2e"]),
   333 |       evidence: "Exact unresolved Encounter and wheel result identity, canonical replacement, superseded original revision, stale rejection, duplicate operation identity, multiple-copy inventory safety, normal acquisition continuation, production refresh, causal History undo, and sandbox isolation are covered by TLS-004, BROWSER-028, and TSB-027.",
   334 |       verifiedAt: "2026-08-04",
   335 |       contractDefinitionRevision
```

#### `"encounter-token-runtime"` — line 339

```text
   336 |     }),
   337 |     "honey-token": Object.freeze({
   338 |       status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
   339 |       tests: Object.freeze(["encounter-token-runtime", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "lifecycle-completion-slice-e2e"]),
   340 |       evidence: "Exact finalized Encounter selection, fresh nonrecursive copy identity, canonical species/form/tier/level and intrinsic payload, normal acquisition handoff, duplicate and stale safety, production refresh, causal History undo through acquired roster creation, and sandbox isolation are covered by TLS-005, SEB-004, BROWSER-029, and TSB-027.",
   341 |       verifiedAt: "2026-08-04",
   342 |       contractDefinitionRevision
```

#### `"encounterCopy"` — line 380

```text
   377 |   const registeredResolverIds = Object.freeze([
   378 |     "hostConfirmed", "trainerClassWheel", "restrict", "utilityEffect", "wickedBlow", "statusEffect", "safeguard", "delayParent",
   379 |     "substituteAttach", "redirectParentToSelf", "teamPreviewSwap", "playerStatus", "copyParentEffect", "randomRedirect", "immunity",
   380 |     "revengeRelease", "reroll", "extraEncounter", "encounterWheelEdit", "encounterTransfer", "encounterGrant", "encounterCopy",
   381 |     "encounterChoose", "moveBan", "knockOff", "multiStatusEffect", "purgeAfterBattle", "copyToken",
   382 |     "arenaTrap", "clearSmog", "extraBan", "counterProtection", "ongoingEffectTextReplacement", "ongoingEffectSuppression",
   383 |     "hazeCurse", "devolveCurse", "copyTokenInventory",
```

#### `"encounterGrant"` — line 380

```text
   377 |   const registeredResolverIds = Object.freeze([
   378 |     "hostConfirmed", "trainerClassWheel", "restrict", "utilityEffect", "wickedBlow", "statusEffect", "safeguard", "delayParent",
   379 |     "substituteAttach", "redirectParentToSelf", "teamPreviewSwap", "playerStatus", "copyParentEffect", "randomRedirect", "immunity",
   380 |     "revengeRelease", "reroll", "extraEncounter", "encounterWheelEdit", "encounterTransfer", "encounterGrant", "encounterCopy",
   381 |     "encounterChoose", "moveBan", "knockOff", "multiStatusEffect", "purgeAfterBattle", "copyToken",
   382 |     "arenaTrap", "clearSmog", "extraBan", "counterProtection", "ongoingEffectTextReplacement", "ongoingEffectSuppression",
   383 |     "hazeCurse", "devolveCurse", "copyTokenInventory",
```

#### `"encounterTransfer"` — line 380

```text
   377 |   const registeredResolverIds = Object.freeze([
   378 |     "hostConfirmed", "trainerClassWheel", "restrict", "utilityEffect", "wickedBlow", "statusEffect", "safeguard", "delayParent",
   379 |     "substituteAttach", "redirectParentToSelf", "teamPreviewSwap", "playerStatus", "copyParentEffect", "randomRedirect", "immunity",
   380 |     "revengeRelease", "reroll", "extraEncounter", "encounterWheelEdit", "encounterTransfer", "encounterGrant", "encounterCopy",
   381 |     "encounterChoose", "moveBan", "knockOff", "multiStatusEffect", "purgeAfterBattle", "copyToken",
   382 |     "arenaTrap", "clearSmog", "extraBan", "counterProtection", "ongoingEffectTextReplacement", "ongoingEffectSuppression",
   383 |     "hazeCurse", "devolveCurse", "copyTokenInventory",
```

#### `"encounterWheelEdit"` — line 380

```text
   377 |   const registeredResolverIds = Object.freeze([
   378 |     "hostConfirmed", "trainerClassWheel", "restrict", "utilityEffect", "wickedBlow", "statusEffect", "safeguard", "delayParent",
   379 |     "substituteAttach", "redirectParentToSelf", "teamPreviewSwap", "playerStatus", "copyParentEffect", "randomRedirect", "immunity",
   380 |     "revengeRelease", "reroll", "extraEncounter", "encounterWheelEdit", "encounterTransfer", "encounterGrant", "encounterCopy",
   381 |     "encounterChoose", "moveBan", "knockOff", "multiStatusEffect", "purgeAfterBattle", "copyToken",
   382 |     "arenaTrap", "clearSmog", "extraBan", "counterProtection", "ongoingEffectTextReplacement", "ongoingEffectSuppression",
   383 |     "hazeCurse", "devolveCurse", "copyTokenInventory",
```

#### `"encounterChoose"` — line 381

```text
   378 |     "hostConfirmed", "trainerClassWheel", "restrict", "utilityEffect", "wickedBlow", "statusEffect", "safeguard", "delayParent",
   379 |     "substituteAttach", "redirectParentToSelf", "teamPreviewSwap", "playerStatus", "copyParentEffect", "randomRedirect", "immunity",
   380 |     "revengeRelease", "reroll", "extraEncounter", "encounterWheelEdit", "encounterTransfer", "encounterGrant", "encounterCopy",
   381 |     "encounterChoose", "moveBan", "knockOff", "multiStatusEffect", "purgeAfterBattle", "copyToken",
   382 |     "arenaTrap", "clearSmog", "extraBan", "counterProtection", "ongoingEffectTextReplacement", "ongoingEffectSuppression",
   383 |     "hazeCurse", "devolveCurse", "copyTokenInventory",
   384 |     "restoreNegatedTokenWithCooldown", "smokescreenRedirect"
```

#### `encounter({ id: "reroll-token"` — line 765

```text
   762 |     protection({ id: "immunity", name: "Immunity", aliases: ["Emergency Immunity Token"], rulesText: "Negate any effect or global effect. Does not stop Series Restricts or bans", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "immunity", canRespondTo: ["targetedEffect", "globalEffect"], protectionScope: ["targetedEffect", "globalEffect"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Immunity atomically negates its exact current parent prompt and is covered across reload, undo, results, and sandbox isolation.", automaticMutations: ["Negate the parent prompt"] }),
   763 |     protection({ id: "revenge", name: "Revenge", rulesText: "After a Battle Phase where an opponent cursed a Pokemon you brought, release 2 Pokemon from their brought team and destroy the held item", isResponse: false, legalPhases: [], timingWindows: ["endOfBattlePhaseProcedure"], phaseBoundaryProcedure: "endOfBattlePhaseProcedure", explicitPhaseTiming: "postPayoutBeforeControl", activationPattern: "phaseBoundaryOptionalTrigger", activationType: "Post-payout optional offer", requiresPendingEvent: false, createsPendingEvent: true, opensResponseWindow: false, targetType: "team", targetScope: "singleTeam", targetControllerRelation: "otherPlayer", otherPlayerOnly: true, excludeActor: true, differentControllerRequired: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "revengeRelease", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Revenge is offered after payout from exact current-Gym Curse anchors and the immutable brought-team snapshot. It consumes only after the affected player confirms two exact Pokemon and an optional eligible held Item.", requiredChoices: ["Exactly two exact Pokemon from the offender's immutable brought team", "At most one eligible held item from those two"], guidedTask: { instruction: "Choose exactly two exact roster instances from the offending player's immutable brought-team snapshot, then optionally choose one eligible exactly referenced held item from those two.", responsible: "Affected player", resultLabel: "Revenge Choices", placeholder: "Two exact roster IDs and optional exact held item ID", confirmationLabel: "Apply Revenge" }, mechanicContract: { postPayoutBeforeControl: true, immutableBroughtSnapshotRequired: true, exactReleaseCount: 2, qualifyingCurseMustTargetExactBroughtInstance: true, heldItemSelectionMaximum: 1, heldItemMustBelongToSelectedReleasedPokemon: true, exactHeldInventoryReferenceRequired: true, masterBallTierProtected: true, sameNameInventoryGuessingForbidden: true, atomicResolutionRequired: true, idempotentResolutionRequired: true, adminUndoRequired: true, optionalOfferCanBeDeclinedWithoutConsumption: true, productionChoiceScreenRequired: true } }),
   764 |
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
```

#### `encounter({ id: "extra-encounter-token"` — line 766

```text
   763 |     protection({ id: "revenge", name: "Revenge", rulesText: "After a Battle Phase where an opponent cursed a Pokemon you brought, release 2 Pokemon from their brought team and destroy the held item", isResponse: false, legalPhases: [], timingWindows: ["endOfBattlePhaseProcedure"], phaseBoundaryProcedure: "endOfBattlePhaseProcedure", explicitPhaseTiming: "postPayoutBeforeControl", activationPattern: "phaseBoundaryOptionalTrigger", activationType: "Post-payout optional offer", requiresPendingEvent: false, createsPendingEvent: true, opensResponseWindow: false, targetType: "team", targetScope: "singleTeam", targetControllerRelation: "otherPlayer", otherPlayerOnly: true, excludeActor: true, differentControllerRequired: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "revengeRelease", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Revenge is offered after payout from exact current-Gym Curse anchors and the immutable brought-team snapshot. It consumes only after the affected player confirms two exact Pokemon and an optional eligible held Item.", requiredChoices: ["Exactly two exact Pokemon from the offender's immutable brought team", "At most one eligible held item from those two"], guidedTask: { instruction: "Choose exactly two exact roster instances from the offending player's immutable brought-team snapshot, then optionally choose one eligible exactly referenced held item from those two.", responsible: "Affected player", resultLabel: "Revenge Choices", placeholder: "Two exact roster IDs and optional exact held item ID", confirmationLabel: "Apply Revenge" }, mechanicContract: { postPayoutBeforeControl: true, immutableBroughtSnapshotRequired: true, exactReleaseCount: 2, qualifyingCurseMustTargetExactBroughtInstance: true, heldItemSelectionMaximum: 1, heldItemMustBelongToSelectedReleasedPokemon: true, exactHeldInventoryReferenceRequired: true, masterBallTierProtected: true, sameNameInventoryGuessingForbidden: true, atomicResolutionRequired: true, idempotentResolutionRequired: true, adminUndoRequired: true, optionalOfferCanBeDeclinedWithoutConsumption: true, productionChoiceScreenRequired: true } }),
   764 |
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
```

#### `"encounterWheelEdit"` — line 767

```text
   764 |
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
```

#### `encounter({ id: "repel-token"` — line 767

```text
   764 |
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
```

#### `"encounterTransfer"` — line 768

```text
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
```

#### `encounter({ id: "quick-ball-token"` — line 768

```text
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
```

#### `"encounterGrant"` — line 769

```text
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
```

#### `encounter({ id: "dream-ball-token"` — line 769

```text
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
```

#### `"encounterCopy"` — line 770

```text
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 |
```

#### `encounter({ id: "honey-token"` — line 770

```text
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 |
```

#### `"encounterChoose"` — line 771

```text
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 |
   774 |     control({ id: "move-deleter", name: "Move Deleter", aliases: ["Move Deleter Curse"], rulesText: "Ban one move from being brought for 1 week. Cannot be used after team submission", targetType: "resource", targetScope: "singleResource", selectedTargetType: "move", applicationScope: "tableWide", affectedEntityType: "move", targetScopeStatus: "settled", targetControllerRelation: "notApplicable", minTargets: 1, maxTargets: 1, targetCollectionType: "canonicalMove", resolverMode: resolverModes.AUTOMATIC, resolverId: "moveBan", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Move Deleter records one canonical global move restriction for the next Gym and the Teambuilder and validator enforce it.", requiredChoices: ["One canonical move"], persistence: "lingeringEffect", duration: "Next Gym", expirationPoint: "End of the next Gym", automaticMutations: ["Create a global move restriction keyed by canonical move identity", "Disable the move in Teambuilder and team validation during the next Gym", "Expire the restriction when that Gym ends"] }),
```

#### `encounter({ id: "master-ball-token"` — line 771

```text
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 |
   774 |     control({ id: "move-deleter", name: "Move Deleter", aliases: ["Move Deleter Curse"], rulesText: "Ban one move from being brought for 1 week. Cannot be used after team submission", targetType: "resource", targetScope: "singleResource", selectedTargetType: "move", applicationScope: "tableWide", affectedEntityType: "move", targetScopeStatus: "settled", targetControllerRelation: "notApplicable", minTargets: 1, maxTargets: 1, targetCollectionType: "canonicalMove", resolverMode: resolverModes.AUTOMATIC, resolverId: "moveBan", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Move Deleter records one canonical global move restriction for the next Gym and the Teambuilder and validator enforce it.", requiredChoices: ["One canonical move"], persistence: "lingeringEffect", duration: "Next Gym", expirationPoint: "End of the next Gym", automaticMutations: ["Create a global move restriction keyed by canonical move identity", "Disable the move in Teambuilder and team validation during the next Gym", "Expire the restriction when that Gym ends"] }),
```

#### `"encounterGrant"` — line 772

```text
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 |
   774 |     control({ id: "move-deleter", name: "Move Deleter", aliases: ["Move Deleter Curse"], rulesText: "Ban one move from being brought for 1 week. Cannot be used after team submission", targetType: "resource", targetScope: "singleResource", selectedTargetType: "move", applicationScope: "tableWide", affectedEntityType: "move", targetScopeStatus: "settled", targetControllerRelation: "notApplicable", minTargets: 1, maxTargets: 1, targetCollectionType: "canonicalMove", resolverMode: resolverModes.AUTOMATIC, resolverId: "moveBan", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Move Deleter records one canonical global move restriction for the next Gym and the Teambuilder and validator enforce it.", requiredChoices: ["One canonical move"], persistence: "lingeringEffect", duration: "Next Gym", expirationPoint: "End of the next Gym", automaticMutations: ["Create a global move restriction keyed by canonical move identity", "Disable the move in Teambuilder and team validation during the next Gym", "Expire the restriction when that Gym ends"] }),
   775 |     curse({ id: "toxic-curse", name: "Toxic Curse", rulesText: "Force a Pokemon to carry a Toxic Orb for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Toxic Orb status with exact protected-instance exclusions"] }),
```

#### `encounter({ id: "beast-ball-token"` — line 772

```text
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 |
   774 |     control({ id: "move-deleter", name: "Move Deleter", aliases: ["Move Deleter Curse"], rulesText: "Ban one move from being brought for 1 week. Cannot be used after team submission", targetType: "resource", targetScope: "singleResource", selectedTargetType: "move", applicationScope: "tableWide", affectedEntityType: "move", targetScopeStatus: "settled", targetControllerRelation: "notApplicable", minTargets: 1, maxTargets: 1, targetCollectionType: "canonicalMove", resolverMode: resolverModes.AUTOMATIC, resolverId: "moveBan", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Move Deleter records one canonical global move restriction for the next Gym and the Teambuilder and validator enforce it.", requiredChoices: ["One canonical move"], persistence: "lingeringEffect", duration: "Next Gym", expirationPoint: "End of the next Gym", automaticMutations: ["Create a global move restriction keyed by canonical move identity", "Disable the move in Teambuilder and team validation during the next Gym", "Expire the restriction when that Gym ends"] }),
   775 |     curse({ id: "toxic-curse", name: "Toxic Curse", rulesText: "Force a Pokemon to carry a Toxic Orb for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Toxic Orb status with exact protected-instance exclusions"] }),
```

#### `"encounterCopy"` — line 818

```text
   815 |       mechanicContract: { selectedAnchorScope: "rosterInstance", applicationScope: "globalSpecies", directPreEvolutionOnly: true, ambiguousOrUnsafeParentFailsBeforeConsumption: true, stableRosterIdentityRequired: true, temporarySpeciesOverlayRequired: true, mandatoryTeamRevisionWhenBuildIllegal: true, preserveTeamMembership: true, exactExpirationRestoration: true, perInstanceProtection: true }
   816 |     },
   817 |     "honey-token": {
   818 |       resolverMode: resolverModes.AUTOMATIC, resolverId: "encounterCopy", copiedPayloadStatus: "settled",
   819 |       runtimeUsability: runtimeUsabilityStatuses.USABLE,
   820 |       runtimeUsabilityReason: "Honey copies one immutable completed Encounter result at the End-of-Action checkpoint into a new acquisition-ready Encounter record without rerolling or copying ownership and transient history.",
   821 |       opensResponseWindow: false,
```

### Generic token activation bridge — `app.js`

#### `TOKEN_TIMING_ENGINE_V1_DEFINITIONS` — line 2970

```text
  2967 |   }
  2968 | });
  2969 |
  2970 | const TOKEN_TIMING_ENGINE_V1_DEFINITIONS = Object.freeze({
  2971 |   "extra-encounter-token": Object.freeze({
  2972 |     id: "extra-encounter-token",
  2973 |     names: ["Extra Encounter Token", "Extra Encounter"],
```

#### `TOKEN_TIMING_ENGINE_V1_DEFINITIONS` — line 3154 — function `tokenEngineDefinitionByName` (3151-3157)

```text
  3151 | function tokenEngineDefinitionByName(tokenName = "") {
  3152 |   const key = slugify(tokenName);
  3153 |   if (!key) return null;
  3154 |   const entry = Object.entries(TOKEN_TIMING_ENGINE_V1_DEFINITIONS)
  3155 |     .find(([id, definition]) => slugify(id) === key || (definition.names || []).some((name) => slugify(name) === key));
  3156 |   return entry ? { ...entry[1], id: entry[1].id || entry[0], source: "engine-v1" } : null;
  3157 | }
```

#### `resolverId === "extraEncounter"` — line 3299

```text
  3296 |   if (key === "reroll-token" || key === "reroll") return EFFECT_RESOLUTION_MODES.AUTOMATIC;
  3297 |   if (["restrict", "immunity", "counterProtection", "substituteAttach"].includes(definition.resolverId)) return EFFECT_RESOLUTION_MODES.AUTOMATIC;
  3298 |   if (definition.resolverId === "safeguard") return EFFECT_RESOLUTION_MODES.AUTOMATIC;
  3299 |   if (definition.resolverId === "extraEncounter") return EFFECT_RESOLUTION_MODES.AUTOMATIC;
  3300 |   return EFFECT_RESOLUTION_MODES.HOST_CONFIRMED;
  3301 | }
  3302 |
```

#### `resolveImmediateTokenUse` — line 3889 — function `resolveImmediateTokenUse` (3889-3889)

```text
  3886 |   return record;
  3887 | }
  3888 |
  3889 | async function resolveImmediateTokenUse(draft, { context = {} } = {}) {
  3890 |   const metadata = tokenEffectMetadataByName(draft.tokenName);
  3891 |   if (metadata.resolverId === "extraEncounter") {
  3892 |     alert("Extra Encounter is used from the current Route action. Open Routes and use the Token on the Route you want to explore.");
```

#### `resolverId === "extraEncounter"` — line 3891

```text
  3888 |
  3889 | async function resolveImmediateTokenUse(draft, { context = {} } = {}) {
  3890 |   const metadata = tokenEffectMetadataByName(draft.tokenName);
  3891 |   if (metadata.resolverId === "extraEncounter") {
  3892 |     alert("Extra Encounter is used from the current Route action. Open Routes and use the Token on the Route you want to explore.");
  3893 |     return null;
  3894 |   }
```

#### `resolveImmediateTokenUse` — line 4152

```text
  4149 |   if (metadata.canOpenPendingEvent || metadata.createsPendingEvent || [TOKEN_TIMING_CATEGORIES.CONTROL, TOKEN_TIMING_CATEGORIES.CURSE].includes(metadata.timingCategory)) {
  4150 |     return createTokenPendingEventFromUse(draft);
  4151 |   }
  4152 |   return resolveImmediateTokenUse(draft, { context });
  4153 | }
  4154 |
  4155 | function tokenDraftFromActivity(activity, resolutionText = "") {
```

#### `applyActivationOverlay` — line 56356 — function `applyActivationOverlay` (56356-56435)

```text
 56353 |   render();
 56354 | }
 56355 |
 56356 | async function applyActivationOverlay() {
 56357 |   // Effect Activated should remain a confirmed overlay flow: gather actor,
 56358 |   // effect, target, choices, and duration here before applying future rules.
 56359 |   if (!activationDraft) return;
```

#### `["extraEncounter", "safeguard"]` — line 56378 — function `applyActivationOverlay` (56356-56435)

```text
 56375 |       return;
 56376 |     }
 56377 |     const utilityDefinition = activationDraft.utilityDefinitionId ? utilityTokenDefinitions[activationDraft.utilityDefinitionId] : utilityTokenDefinitionByName(effect.name);
 56378 |     if (utilityDefinition && ["extraEncounter", "safeguard"].includes(engineMetadata.resolverId)) {
 56379 |       const targetPlayer = engineMetadata.selfOnly
 56380 |         ? player
 56381 |         : state.players.find((candidate) => candidate.id === els.activationTargetPlayer.value) || player;
```

#### `resolveImmediateTokenUse` — line 56385 — function `applyActivationOverlay` (56356-56435)

```text
 56382 |       closeActivationOverlay();
 56383 |       els.actionName.value = "";
 56384 |       els.actionNotes.value = "";
 56385 |       await resolveImmediateTokenUse({
 56386 |         actor: player,
 56387 |         target: targetPlayer,
 56388 |         actorPlayerId: player.id,
```

#### `applyActivationOverlay` — line 62335 — function `bindEvents` (60119-62355)

```text
 62332 |   });
 62333 |   els.applyActivation.addEventListener("click", async (event) => {
 62334 |     event.stopPropagation();
 62335 |     await applyActivationOverlay();
 62336 |   });
 62337 |   els.cancelActivation.addEventListener("click", (event) => {
 62338 |     event.stopPropagation();
```

### Honey V1 bridge — `app.js`

#### `honey-end-action` — line 31158 — function `buildRivalSagaPokemonTierMap` (16725-40003)

```text
 31155 |   if (pending?.sourceType === "revenge-post-payout") {
 31156 |     return liveRefereeRevengeProcedureScreenMarkup(prompt, pending);
 31157 |   }
 31158 |   if (pending?.sourceType === "honey-end-action") {
 31159 |     return liveRefereeHoneyProcedureScreenMarkup(prompt, pending);
 31160 |   }
 31161 |   const provisional = currentProvisionalDeclaration();
```

#### `resolveHoneyEndOfActionProcedure` — line 32329 — function `handleLiveTableClick` (32219-32630)

```text
 32326 |   const honeyChoice = liveClosestEventTarget(event, "[data-honey-result-choice]");
 32327 |   if (honeyChoice) {
 32328 |     event.preventDefault();
 32329 |     resolveHoneyEndOfActionProcedure(honeyChoice.dataset.activityId || "", honeyChoice.dataset.honeyResultChoice || "");
 32330 |     return;
 32331 |   }
 32332 |   const smokescreenSpin = liveClosestEventTarget(event, "[data-smokescreen-spin]");
```

#### `augmentHoneyCausalUndoAfterAcquisition` — line 41179 — function `augmentHoneyCausalUndoAfterAcquisition` (41179-41192)

```text
 41176 |   return session;
 41177 | }
 41178 |
 41179 | function augmentHoneyCausalUndoAfterAcquisition(randomSession, causalBeforeAcquisition) {
 41180 |   if (!randomSession?.copiedFromRandomPokemonSessionId || !causalBeforeAcquisition) return;
 41181 |   const historyLog = (state.log || []).find((entry) => !entry.undone
 41182 |     && entry.undoData?.tokenDefinitionId === "honey-token"
```

#### `augmentHoneyCausalUndoAfterAcquisition` — line 41273

```text
 41270 |   randomSession.confirmedAt = new Date().toISOString();
 41271 |   randomSession.rosterPokemonId = pokemon.id;
 41272 |   resolvePokemonResultTimingWindow(randomSession, "resolved");
 41273 |   augmentHoneyCausalUndoAfterAcquisition(randomSession, honeyAcquisitionSnapshot);
 41274 |   if (randomSession.sourceType !== "game-corner-token" || !session || !token) {
 41275 |     saveState();
 41276 |     render();
```

#### `honeyEligibleEncounterResults` — line 48867 — function `honeyEligibleEncounterResults` (48867-48874)

```text
 48864 |   return `${trainer} is still resolving ${location}. Finish or undo that Action before advancing phases.`;
 48865 | }
 48866 |
 48867 | function honeyEligibleEncounterResults() {
 48868 |   return (state.randomPokemonSessions || []).filter((session) => {
 48869 |     if (session.sourceType !== "encounter" || session.status !== "confirmed") return false;
 48870 |     if (session.copiedFromRandomPokemonSessionId || session.sourceLabel === "Honey copied Encounter") return false;
```

#### `ensureHoneyEndOfActionProcedures` — line 48876 — function `ensureHoneyEndOfActionProcedures` (48876-48910)

```text
 48873 |   });
 48874 | }
 48875 |
 48876 | function ensureHoneyEndOfActionProcedures() {
 48877 |   state.endOfActionProcedures ||= [];
 48878 |   const eligible = honeyEligibleEncounterResults();
 48879 |   if (!eligible.length) return [];
```

#### `honeyEligibleEncounterResults` — line 48878 — function `ensureHoneyEndOfActionProcedures` (48876-48910)

```text
 48875 |
 48876 | function ensureHoneyEndOfActionProcedures() {
 48877 |   state.endOfActionProcedures ||= [];
 48878 |   const eligible = honeyEligibleEncounterResults();
 48879 |   if (!eligible.length) return [];
 48880 |   const created = [];
 48881 |   state.players.forEach((player) => {
```

#### `honey-end-action` — line 48901 — function `ensureHoneyEndOfActionProcedures` (48876-48910)

```text
 48898 |         activity = createInteractionEvent({
 48899 |           type: "phase-boundary-procedure", title: `${player.name} may use Honey.`,
 48900 |           message: `${player.name} may copy one completed Encounter from this Action Phase.`,
 48901 |           actorPlayerId: player.id, targetPlayerId: player.id, sourceType: "honey-end-action",
 48902 |           sourceId: id, responseTypes: [], eligiblePlayerIds: [],
 48903 |           payload: { procedureId: id, tokenName: "Honey", requiresRequiredChoice: true, requiredChoicePlayerId: player.id, responsesAllowed: false, transactionsAllowed: false }
 48904 |         });
```

#### `honey-end-action` — line 48913 — function `honeyProcedureForActivity` (48912-48916)

```text
 48910 | }
 48911 |
 48912 | function honeyProcedureForActivity(activity) {
 48913 |   return activity?.sourceType === "honey-end-action"
 48914 |     ? (state.endOfActionProcedures || []).find((entry) => entry.id === activity.payload?.procedureId)
 48915 |     : null;
 48916 | }
```

#### `resolveHoneyEndOfActionProcedure` — line 48948 — function `resolveHoneyEndOfActionProcedure` (48948-49010)

```text
 48945 |   return true;
 48946 | }
 48947 |
 48948 | function resolveHoneyEndOfActionProcedure(activityId, sourceRandomPokemonSessionId) {
 48949 |   const activity = liveActivityById(activityId);
 48950 |   const procedure = honeyProcedureForActivity(activity);
 48951 |   const player = state.players.find((entry) => entry.id === procedure?.sourcePlayerId);
```

#### `resolveHoneyEncounterCopy` — line 48962 — function `resolveHoneyEndOfActionProcedure` (48948-49010)

```text
 48959 |   const savedRandom = structuredClone(state.randomPokemonSessions || []);
 48960 |   const savedCopies = structuredClone(state.encounterCopyRecords || []);
 48961 |   const token = player.inventory.splice(tokenIndex, 1)[0];
 48962 |   const result = controlTokenEffects.resolveHoneyEncounterCopy(state, {
 48963 |     sourceEffectId: activity.id,
 48964 |     ownerPlayerId: player.id,
 48965 |     sourceRandomPokemonSessionId
```

#### `honey-encounter-copy` — line 48997 — function `resolveHoneyEndOfActionProcedure` (48948-49010)

```text
 48994 |   addLogEntry({
 48995 |     action: "token", category: "pokemon", player: player.name,
 48996 |     item: result.reason, title: `${player.name} used Honey`, summary: result.reason,
 48997 |     type: "honey-encounter-copy", categories: ["tokens", "pokemon", "encounter"],
 48998 |     tags: ["honey", "encounter-copy", "end-of-action"], playerIds: [player.id], tokenNames: ["Honey"],
 48999 |     linkedEventId: activity.id,
 49000 |     tokenConsumptionId: consumption?.id || "",
```

#### `ensureHoneyEndOfActionProcedures` — line 49132

```text
 49129 |   const now = new Date().toISOString();
 49130 |   const previousPhase = phaseState.currentPhase;
 49131 |   if (!target.flowOnly && previousPhase === "action" && target.phase === "battle") {
 49132 |     const honeyProcedures = ensureHoneyEndOfActionProcedures();
 49133 |     if (honeyProcedures.length) {
 49134 |       render();
 49135 |       await saveState({ immediate: true, immediateBackend: true });
```

### Honey V1 bridge — `token-control-effects.js`

#### `resolveHoneyEncounterCopy` — line 2343 — function `resolveHoneyEncounterCopy` (2343-2343)

```text
  2340 |     }
  2341 |   }
  2342 |
  2343 |   function resolveHoneyEncounterCopy(state, input = {}, options = {}) {
  2344 |     const source = (state.randomPokemonSessions || []).find((record) => record.id === input.sourceRandomPokemonSessionId && record.sourceType === "encounter" && record.status === "confirmed");
  2345 |     const owner = (state.players || []).find((player) => player.id === input.ownerPlayerId);
  2346 |     if (!source || !owner) return { result: "systemFailure", refundRequired: true, reason: "Choose one completed eligible Encounter result from this Action Phase." };
```

#### `resolveHoneyEncounterCopy` — line 3585

```text
  3582 |     restoreExpiredDevolveOverlays,
  3583 |     resolveForesightCurse,
  3584 |     resolveKnockOffCurse,
  3585 |     resolveHoneyEncounterCopy,
  3586 |     resolveRerollResultRecord,
  3587 |     resolveRestrict,
  3588 |     createInstanceRestriction,
```

### Live Referee encounter channel — `app.js`

#### `"encounter-reroll"` — line 636

```text
   633 |   },
   634 |   encounterResult: {
   635 |     label: "Encounter Result",
   636 |     responseTypes: ["encounter-reroll", "steal-encounter"]
   637 |   },
   638 |   "class-activation": {
   639 |     label: "Class Activation",
```

#### `"steal-encounter"` — line 636

```text
   633 |   },
   634 |   encounterResult: {
   635 |     label: "Encounter Result",
   636 |     responseTypes: ["encounter-reroll", "steal-encounter"]
   637 |   },
   638 |   "class-activation": {
   639 |     label: "Class Activation",
```

#### `"encounter-reroll"` — line 648

```text
   645 |   },
   646 |   "pokemon-result": {
   647 |     label: "Pokemon Result",
   648 |     responseTypes: ["encounter-reroll", "steal-encounter"]
   649 |   },
   650 |   "encounter-result": {
   651 |     label: "Encounter Result",
```

#### `"steal-encounter"` — line 648

```text
   645 |   },
   646 |   "pokemon-result": {
   647 |     label: "Pokemon Result",
   648 |     responseTypes: ["encounter-reroll", "steal-encounter"]
   649 |   },
   650 |   "encounter-result": {
   651 |     label: "Encounter Result",
```

#### `"encounter-result"` — line 650

```text
   647 |     label: "Pokemon Result",
   648 |     responseTypes: ["encounter-reroll", "steal-encounter"]
   649 |   },
   650 |   "encounter-result": {
   651 |     label: "Encounter Result",
   652 |     responseTypes: ["encounter-reroll", "steal-encounter"]
   653 |   }
```

#### `"encounter-reroll"` — line 652

```text
   649 |   },
   650 |   "encounter-result": {
   651 |     label: "Encounter Result",
   652 |     responseTypes: ["encounter-reroll", "steal-encounter"]
   653 |   }
   654 | });
   655 |
```

#### `"steal-encounter"` — line 652

```text
   649 |   },
   650 |   "encounter-result": {
   651 |     label: "Encounter Result",
   652 |     responseTypes: ["encounter-reroll", "steal-encounter"]
   653 |   }
   654 | });
   655 |
```

#### `"encounter-reroll"` — line 663

```text
   660 |     tokenNames: ["Immunity", "Emergency Immunity Token"],
   661 |     description: "Cancel a token, perk, or class effect targeting you."
   662 |   },
   663 |   "encounter-reroll": {
   664 |     id: "encounter-reroll",
   665 |     label: "Reroll Encounter",
   666 |     tokenNames: ["Reroll Token"],
```

#### `"encounter-reroll"` — line 664

```text
   661 |     description: "Cancel a token, perk, or class effect targeting you."
   662 |   },
   663 |   "encounter-reroll": {
   664 |     id: "encounter-reroll",
   665 |     label: "Reroll Encounter",
   666 |     tokenNames: ["Reroll Token"],
   667 |     description: "Future hook: force a Pokemon result to be rerolled."
```

#### `"steal-encounter"` — line 669

```text
   666 |     tokenNames: ["Reroll Token"],
   667 |     description: "Future hook: force a Pokemon result to be rerolled."
   668 |   },
   669 |   "steal-encounter": {
   670 |     id: "steal-encounter",
   671 |     label: "Steal Encounter",
   672 |     tokenNames: ["Quick Ball Token", "Steal"],
```

#### `"steal-encounter"` — line 670

```text
   667 |     description: "Future hook: force a Pokemon result to be rerolled."
   668 |   },
   669 |   "steal-encounter": {
   670 |     id: "steal-encounter",
   671 |     label: "Steal Encounter",
   672 |     tokenNames: ["Quick Ball Token", "Steal"],
   673 |     description: "Future hook: take a Pokemon result before it is claimed."
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 864

```text
   861 |     responseRole: "protection",
   862 |     livePromptType: TOKEN_PENDING_EVENT_TYPES.PROTECTION_RESPONSE
   863 |   }),
   864 |   [TOKEN_TIMING_CATEGORIES.ENCOUNTER]: Object.freeze({
   865 |     timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,
   866 |     useType: TOKEN_USE_TYPES.ENCOUNTER_MODIFIER,
   867 |     createsPendingEvent: false,
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 865

```text
   862 |     livePromptType: TOKEN_PENDING_EVENT_TYPES.PROTECTION_RESPONSE
   863 |   }),
   864 |   [TOKEN_TIMING_CATEGORIES.ENCOUNTER]: Object.freeze({
   865 |     timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,
   866 |     useType: TOKEN_USE_TYPES.ENCOUNTER_MODIFIER,
   867 |     createsPendingEvent: false,
   868 |     requiresPendingEvent: true,
```

#### `TOKEN_USE_TYPES.ENCOUNTER_MODIFIER` — line 866

```text
   863 |   }),
   864 |   [TOKEN_TIMING_CATEGORIES.ENCOUNTER]: Object.freeze({
   865 |     timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,
   866 |     useType: TOKEN_USE_TYPES.ENCOUNTER_MODIFIER,
   867 |     createsPendingEvent: false,
   868 |     requiresPendingEvent: true,
   869 |     requiredPendingType: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT,
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 869

```text
   866 |     useType: TOKEN_USE_TYPES.ENCOUNTER_MODIFIER,
   867 |     createsPendingEvent: false,
   868 |     requiresPendingEvent: true,
   869 |     requiredPendingType: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT,
   870 |     responseRole: "encounterModifier",
   871 |     livePromptType: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_TOKEN
   872 |   }),
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 2722

```text
  2719 |     id: "reroll-token",
  2720 |     name: "Reroll Token",
  2721 |     sourceType: "token",
  2722 |     timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,
  2723 |     useType: TOKEN_USE_TYPES.ENCOUNTER_MODIFIER,
  2724 |     createsPendingEvent: false,
  2725 |     requiresPendingEvent: true,
```

#### `TOKEN_USE_TYPES.ENCOUNTER_MODIFIER` — line 2723

```text
  2720 |     name: "Reroll Token",
  2721 |     sourceType: "token",
  2722 |     timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,
  2723 |     useType: TOKEN_USE_TYPES.ENCOUNTER_MODIFIER,
  2724 |     createsPendingEvent: false,
  2725 |     requiresPendingEvent: true,
  2726 |     requiredPendingType: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT,
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 2726

```text
  2723 |     useType: TOKEN_USE_TYPES.ENCOUNTER_MODIFIER,
  2724 |     createsPendingEvent: false,
  2725 |     requiresPendingEvent: true,
  2726 |     requiredPendingType: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT,
  2727 |     responseRole: "encounterModifier",
  2728 |     livePromptType: "encounterToken",
  2729 |     timing: "pending-result",
```

#### `"encounter-result"` — line 2731

```text
  2728 |     livePromptType: "encounterToken",
  2729 |     timing: "pending-result",
  2730 |     targetType: "pending-random-result",
  2731 |     validTargets: ["random-pokemon-result", "encounter-result", "quest-roll"],
  2732 |     excludedSources: ["game-corner-gamble-wheel"],
  2733 |     effect: "reroll"
  2734 |   }
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 2761

```text
  2758 |   "smokescreen": { names: ["Smokescreen"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "log", note: "Spins every player once and replaces the original target only when another player has a legal corresponding target." },
  2759 |   "immunity": { names: ["Immunity", "Emergency Immunity Token"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Immunity", note: "Negates one effect/global effect." },
  2760 |   "revenge": { names: ["Revenge"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Revenge Pending", note: "Post-curse revenge marker." },
  2761 |   "extra-encounter-token": { names: ["Extra Encounter Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Extra Encounter Available", note: "Spend during Action Phase to roll an extra encounter." },
  2762 |   "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, choiceLabel: "Pokemon Name", effectType: "log", note: "Remove one Pokemon per 5 entries from Encounter Wheel. Wheel editor hook pending." },
  2763 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
  2764 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 2762

```text
  2759 |   "immunity": { names: ["Immunity", "Emergency Immunity Token"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Immunity", note: "Negates one effect/global effect." },
  2760 |   "revenge": { names: ["Revenge"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Revenge Pending", note: "Post-curse revenge marker." },
  2761 |   "extra-encounter-token": { names: ["Extra Encounter Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Extra Encounter Available", note: "Spend during Action Phase to roll an extra encounter." },
  2762 |   "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, choiceLabel: "Pokemon Name", effectType: "log", note: "Remove one Pokemon per 5 entries from Encounter Wheel. Wheel editor hook pending." },
  2763 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
  2764 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
  2765 |   "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "At End of Action, copies one immutable completed Encounter result into a new acquisition-ready Encounter without rerolling." },
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 2763

```text
  2760 |   "revenge": { names: ["Revenge"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Revenge Pending", note: "Post-curse revenge marker." },
  2761 |   "extra-encounter-token": { names: ["Extra Encounter Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Extra Encounter Available", note: "Spend during Action Phase to roll an extra encounter." },
  2762 |   "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, choiceLabel: "Pokemon Name", effectType: "log", note: "Remove one Pokemon per 5 entries from Encounter Wheel. Wheel editor hook pending." },
  2763 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
  2764 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
  2765 |   "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "At End of Action, copies one immutable completed Encounter result into a new acquisition-ready Encounter without rerolling." },
  2766 |   "master-ball-token": { names: ["Master Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Master Ball Pending", note: "Choose encounter; cannot be changed by other players." },
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 2764

```text
  2761 |   "extra-encounter-token": { names: ["Extra Encounter Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Extra Encounter Available", note: "Spend during Action Phase to roll an extra encounter." },
  2762 |   "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, choiceLabel: "Pokemon Name", effectType: "log", note: "Remove one Pokemon per 5 entries from Encounter Wheel. Wheel editor hook pending." },
  2763 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
  2764 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
  2765 |   "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "At End of Action, copies one immutable completed Encounter result into a new acquisition-ready Encounter without rerolling." },
  2766 |   "master-ball-token": { names: ["Master Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Master Ball Pending", note: "Choose encounter; cannot be changed by other players." },
  2767 |   "beast-ball-token": { names: ["Beast Ball"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Beast Ball Pending", note: "Encounter move choice marker." }
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 2765

```text
  2762 |   "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, choiceLabel: "Pokemon Name", effectType: "log", note: "Remove one Pokemon per 5 entries from Encounter Wheel. Wheel editor hook pending." },
  2763 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
  2764 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
  2765 |   "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "At End of Action, copies one immutable completed Encounter result into a new acquisition-ready Encounter without rerolling." },
  2766 |   "master-ball-token": { names: ["Master Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Master Ball Pending", note: "Choose encounter; cannot be changed by other players." },
  2767 |   "beast-ball-token": { names: ["Beast Ball"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Beast Ball Pending", note: "Encounter move choice marker." }
  2768 | });
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 2766

```text
  2763 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
  2764 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
  2765 |   "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "At End of Action, copies one immutable completed Encounter result into a new acquisition-ready Encounter without rerolling." },
  2766 |   "master-ball-token": { names: ["Master Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Master Ball Pending", note: "Choose encounter; cannot be changed by other players." },
  2767 |   "beast-ball-token": { names: ["Beast Ball"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Beast Ball Pending", note: "Encounter move choice marker." }
  2768 | });
  2769 |
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 2767

```text
  2764 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
  2765 |   "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "At End of Action, copies one immutable completed Encounter result into a new acquisition-ready Encounter without rerolling." },
  2766 |   "master-ball-token": { names: ["Master Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Master Ball Pending", note: "Choose encounter; cannot be changed by other players." },
  2767 |   "beast-ball-token": { names: ["Beast Ball"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Beast Ball Pending", note: "Encounter move choice marker." }
  2768 | });
  2769 |
  2770 | const statusTokenDefinitions = Object.freeze({
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 2976

```text
  2973 |     names: ["Extra Encounter Token", "Extra Encounter"],
  2974 |     objectType: TOKEN_OBJECT_TYPES.TOKEN,
  2975 |     family: ["encounter"],
  2976 |     timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,
  2977 |     timingWindows: [TOKEN_TIMING_WINDOWS.ACTION_OPEN, TOKEN_TIMING_WINDOWS.MANUAL_HOST],
  2978 |     activationPattern: TOKEN_ACTIVATION_PATTERNS.PROACTIVE,
  2979 |     persistence: TOKEN_PERSISTENCE_BUCKETS.INSTANT,
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 3121

```text
  3118 |     names: ["Reroll Token", "Reroll"],
  3119 |     objectType: TOKEN_OBJECT_TYPES.TOKEN,
  3120 |     family: ["reroll"],
  3121 |     timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,
  3122 |     timingWindows: [TOKEN_TIMING_WINDOWS.WHEEL_WINDOW, TOKEN_TIMING_WINDOWS.MANUAL_HOST],
  3123 |     activationPattern: TOKEN_ACTIVATION_PATTERNS.RESPONSE,
  3124 |     persistence: TOKEN_PERSISTENCE_BUCKETS.INSTANT,
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 3126

```text
  3123 |     activationPattern: TOKEN_ACTIVATION_PATTERNS.RESPONSE,
  3124 |     persistence: TOKEN_PERSISTENCE_BUCKETS.INSTANT,
  3125 |     resolutionPayloads: [TOKEN_RESOLUTION_PAYLOADS.WHEEL, TOKEN_RESOLUTION_PAYLOADS.REPLACEMENT],
  3126 |     targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT,
  3127 |     targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT,
  3128 |     duration: "instant",
  3129 |     consumesOnLegalUse: true,
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 3143 — function `tokenTimingCategoryFromRaw` (3141-3149)

```text
  3140 |
  3141 | function tokenTimingCategoryFromRaw(value = "") {
  3142 |   const key = String(value || "").toLowerCase().trim();
  3143 |   if (key === "reroll") return TOKEN_TIMING_CATEGORIES.ENCOUNTER;
  3144 |   if (Object.values(TOKEN_TIMING_CATEGORIES).includes(key)) return key;
  3145 |   if (key === "curses") return TOKEN_TIMING_CATEGORIES.CURSE;
  3146 |   if (key === "encounters") return TOKEN_TIMING_CATEGORIES.ENCOUNTER;
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 3146 — function `tokenTimingCategoryFromRaw` (3141-3149)

```text
  3143 |   if (key === "reroll") return TOKEN_TIMING_CATEGORIES.ENCOUNTER;
  3144 |   if (Object.values(TOKEN_TIMING_CATEGORIES).includes(key)) return key;
  3145 |   if (key === "curses") return TOKEN_TIMING_CATEGORIES.CURSE;
  3146 |   if (key === "encounters") return TOKEN_TIMING_CATEGORIES.ENCOUNTER;
  3147 |   if (key === "manual" || key === "other") return TOKEN_TIMING_CATEGORIES.MANUAL;
  3148 |   return "";
  3149 | }
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 3198 — function `normalizeEffectTargetType` (3192-3208)

```text
  3195 |   const values = Object.values(EFFECT_TARGET_TYPES);
  3196 |   if (values.includes(raw)) return raw;
  3197 |   if (key === "current-prompt") return EFFECT_TARGET_TYPES.CURRENT_PROMPT;
  3198 |   if (key === "pending-random-result" || key === "pending-result") return EFFECT_TARGET_TYPES.ENCOUNTER_RESULT;
  3199 |   if (/encounter|random/.test(key)) return EFFECT_TARGET_TYPES.ENCOUNTER_RESULT;
  3200 |   if (/pokemon/.test(key)) return EFFECT_TARGET_TYPES.POKEMON;
  3201 |   if (/player/.test(key)) return EFFECT_TARGET_TYPES.PLAYER;
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 3199 — function `normalizeEffectTargetType` (3192-3208)

```text
  3196 |   if (values.includes(raw)) return raw;
  3197 |   if (key === "current-prompt") return EFFECT_TARGET_TYPES.CURRENT_PROMPT;
  3198 |   if (key === "pending-random-result" || key === "pending-result") return EFFECT_TARGET_TYPES.ENCOUNTER_RESULT;
  3199 |   if (/encounter|random/.test(key)) return EFFECT_TARGET_TYPES.ENCOUNTER_RESULT;
  3200 |   if (/pokemon/.test(key)) return EFFECT_TARGET_TYPES.POKEMON;
  3201 |   if (/player/.test(key)) return EFFECT_TARGET_TYPES.PLAYER;
  3202 |   if (/team/.test(key)) return EFFECT_TARGET_TYPES.TEAM;
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 3233

```text
  3230 |   const explicit = normalizeEffectTargetType(definition.targetType);
  3231 |   if (explicit) return explicit;
  3232 |   if (category === TOKEN_TIMING_CATEGORIES.PROTECTION) return EFFECT_TARGET_TYPES.CURRENT_PROMPT;
  3233 |   if (category === TOKEN_TIMING_CATEGORIES.ENCOUNTER) return EFFECT_TARGET_TYPES.ENCOUNTER_RESULT;
  3234 |   const mode = String(definition.targetMode || "").toLowerCase();
  3235 |   if (/pokemon/.test(mode) || mode === "banned-pokemon") return EFFECT_TARGET_TYPES.POKEMON;
  3236 |   if (/player/.test(mode)) return EFFECT_TARGET_TYPES.PLAYER;
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 3233

```text
  3230 |   const explicit = normalizeEffectTargetType(definition.targetType);
  3231 |   if (explicit) return explicit;
  3232 |   if (category === TOKEN_TIMING_CATEGORIES.PROTECTION) return EFFECT_TARGET_TYPES.CURRENT_PROMPT;
  3233 |   if (category === TOKEN_TIMING_CATEGORIES.ENCOUNTER) return EFFECT_TARGET_TYPES.ENCOUNTER_RESULT;
  3234 |   const mode = String(definition.targetMode || "").toLowerCase();
  3235 |   if (/pokemon/.test(mode) || mode === "banned-pokemon") return EFFECT_TARGET_TYPES.POKEMON;
  3236 |   if (/player/.test(mode)) return EFFECT_TARGET_TYPES.PLAYER;
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 3247

```text
  3244 |   const explicit = normalizeEffectTargetScope(definition.targetScope);
  3245 |   if (explicit) return explicit;
  3246 |   if (targetType === EFFECT_TARGET_TYPES.CURRENT_PROMPT) return EFFECT_TARGET_SCOPES.CURRENT_PROMPT;
  3247 |   if (targetType === EFFECT_TARGET_TYPES.ENCOUNTER_RESULT) return EFFECT_TARGET_SCOPES.CURRENT_PROMPT;
  3248 |   if (targetType === EFFECT_TARGET_TYPES.PLAYER) return EFFECT_TARGET_SCOPES.SINGLE_PLAYER;
  3249 |   if (targetType === EFFECT_TARGET_TYPES.TABLE) return EFFECT_TARGET_SCOPES.TABLE_WIDE;
  3250 |   if (targetType === EFFECT_TARGET_TYPES.RESOURCE) return definition.targetMode === "none"
```

#### `EFFECT_TARGET_CATEGORIES.ENCOUNTER_RESULT` — line 3265 — function `targetCategoryFromEffectBucket` (3263-3272)

```text
  3262 |
  3263 | function targetCategoryFromEffectBucket(targetType = "", targetScope = "") {
  3264 |   if (targetType === EFFECT_TARGET_TYPES.POKEMON) return EFFECT_TARGET_CATEGORIES.POKEMON;
  3265 |   if (targetType === EFFECT_TARGET_TYPES.ENCOUNTER_RESULT) return EFFECT_TARGET_CATEGORIES.ENCOUNTER_RESULT;
  3266 |   if (targetType === EFFECT_TARGET_TYPES.PLAYER) return EFFECT_TARGET_CATEGORIES.PLAYER;
  3267 |   if (targetType === EFFECT_TARGET_TYPES.RESOURCE) return EFFECT_TARGET_CATEGORIES.TOKEN;
  3268 |   if (targetType === EFFECT_TARGET_TYPES.TABLE || targetType === EFFECT_TARGET_TYPES.TEAM) return EFFECT_TARGET_CATEGORIES.WHOLE_TABLE;
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 3265 — function `targetCategoryFromEffectBucket` (3263-3272)

```text
  3262 |
  3263 | function targetCategoryFromEffectBucket(targetType = "", targetScope = "") {
  3264 |   if (targetType === EFFECT_TARGET_TYPES.POKEMON) return EFFECT_TARGET_CATEGORIES.POKEMON;
  3265 |   if (targetType === EFFECT_TARGET_TYPES.ENCOUNTER_RESULT) return EFFECT_TARGET_CATEGORIES.ENCOUNTER_RESULT;
  3266 |   if (targetType === EFFECT_TARGET_TYPES.PLAYER) return EFFECT_TARGET_CATEGORIES.PLAYER;
  3267 |   if (targetType === EFFECT_TARGET_TYPES.RESOURCE) return EFFECT_TARGET_CATEGORIES.TOKEN;
  3268 |   if (targetType === EFFECT_TARGET_TYPES.TABLE || targetType === EFFECT_TARGET_TYPES.TEAM) return EFFECT_TARGET_CATEGORIES.WHOLE_TABLE;
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 3439 — function `tokenTimingCategoryLabel` (3435-3443)

```text
  3436 |   return {
  3437 |     [TOKEN_TIMING_CATEGORIES.CONTROL]: "Control Token",
  3438 |     [TOKEN_TIMING_CATEGORIES.PROTECTION]: "Protection Token",
  3439 |     [TOKEN_TIMING_CATEGORIES.ENCOUNTER]: "Encounter Token",
  3440 |     [TOKEN_TIMING_CATEGORIES.CURSE]: "Curse Token",
  3441 |     [TOKEN_TIMING_CATEGORIES.MANUAL]: "Manual Token"
  3442 |   }[category] || "Token";
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 4139

```text
  4136 |     return null;
  4137 |   }
  4138 |   if (pendingEvent) {
  4139 |     if (metadata.timingWindows.includes(TOKEN_TIMING_WINDOWS.WHEEL_WINDOW) || metadata.timingCategory === TOKEN_TIMING_CATEGORIES.ENCOUNTER) {
  4140 |       return recordEncounterTokenUse(draft);
  4141 |     }
  4142 |     if (metadata.activationPattern === TOKEN_ACTIVATION_PATTERNS.RESPONSE || metadata.timingCategory === TOKEN_TIMING_CATEGORIES.PROTECTION) {
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 5968 — function `tokenTimingCategoryOptions` (5964-5971)

```text
  5965 |   return [
  5966 |     [TOKEN_TIMING_CATEGORIES.CONTROL, "Control Token"],
  5967 |     [TOKEN_TIMING_CATEGORIES.PROTECTION, "Protection Token"],
  5968 |     [TOKEN_TIMING_CATEGORIES.ENCOUNTER, "Encounter Token"],
  5969 |     [TOKEN_TIMING_CATEGORIES.CURSE, "Curse Token"],
  5970 |   ].map(([value, label]) => `<option value="${escapeHtml(value)}" ${value === selected ? "selected" : ""}>${escapeHtml(label)}</option>`).join("");
  5971 | }
```

#### `createPokemonResultTimingWindow` — line 23147 — function `createPokemonResultTimingWindow` (23147-23176)

```text
 23144 |   return event;
 23145 | }
 23146 |
 23147 | function createPokemonResultTimingWindow(session, player) {
 23148 |   if (!session || session.interactionEventId || !player) return null;
 23149 |   const resultName = session.resultDisplayName || session.resultPokemonName || "Pokemon result";
 23150 |   const isEncounter = session.sourceType === "encounter";
```

#### `"encounter-result"` — line 23152 — function `createPokemonResultTimingWindow` (23147-23176)

```text
 23149 |   const resultName = session.resultDisplayName || session.resultPokemonName || "Pokemon result";
 23150 |   const isEncounter = session.sourceType === "encounter";
 23151 |   const activity = createInteractionEvent({
 23152 |     type: isEncounter ? "encounter-result" : "pokemon-result",
 23153 |     title: `${player.name} rolled ${resultName}`,
 23154 |     message: `${session.sourceLabel || "Pokemon result"} is pending before it resolves.`,
 23155 |     actorPlayerId: player.id,
```

#### `"encounter-reroll"` — line 23159 — function `createPokemonResultTimingWindow` (23147-23176)

```text
 23156 |     targetPlayerId: player.id,
 23157 |     sourceType: session.sourceType || "random-pokemon",
 23158 |     sourceId: session.id,
 23159 |     responseTypes: ["encounter-reroll", "steal-encounter"],
 23160 |     eligiblePlayerIds: state.players.map((entry) => entry.id),
 23161 |     series: session.series || state.series,
 23162 |     gym: Number(session.gym || state.gym),
```

#### `"steal-encounter"` — line 23159 — function `createPokemonResultTimingWindow` (23147-23176)

```text
 23156 |     targetPlayerId: player.id,
 23157 |     sourceType: session.sourceType || "random-pokemon",
 23158 |     sourceId: session.id,
 23159 |     responseTypes: ["encounter-reroll", "steal-encounter"],
 23160 |     eligiblePlayerIds: state.players.map((entry) => entry.id),
 23161 |     series: session.series || state.series,
 23162 |     gym: Number(session.gym || state.gym),
```

#### `liveActivityTimingCategory` — line 25514 — function `liveActivityTimingCategory` (25514-25521)

```text
 25511 |   return (targetState.randomPokemonSessions || []).find((session) => session.id === sessionId && session.status === "pending") || null;
 25512 | }
 25513 |
 25514 | function liveActivityTimingCategory(activity) {
 25515 |   if (!activity) return "";
 25516 |   if (activity.payload?.tokenTimingCategory) return tokenTimingCategoryFromRaw(activity.payload.tokenTimingCategory);
 25517 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.CONTROL_TOKEN) return TOKEN_TIMING_CATEGORIES.CONTROL;
```

#### `"encounter-result"` — line 25519 — function `liveActivityTimingCategory` (25514-25521)

```text
 25516 |   if (activity.payload?.tokenTimingCategory) return tokenTimingCategoryFromRaw(activity.payload.tokenTimingCategory);
 25517 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.CONTROL_TOKEN) return TOKEN_TIMING_CATEGORIES.CONTROL;
 25518 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.CURSE_TOKEN) return TOKEN_TIMING_CATEGORIES.CURSE;
 25519 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT || activity.type === "encounter-result") return TOKEN_TIMING_CATEGORIES.ENCOUNTER;
 25520 |   return "";
 25521 | }
 25522 |
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 25519 — function `liveActivityTimingCategory` (25514-25521)

```text
 25516 |   if (activity.payload?.tokenTimingCategory) return tokenTimingCategoryFromRaw(activity.payload.tokenTimingCategory);
 25517 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.CONTROL_TOKEN) return TOKEN_TIMING_CATEGORIES.CONTROL;
 25518 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.CURSE_TOKEN) return TOKEN_TIMING_CATEGORIES.CURSE;
 25519 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT || activity.type === "encounter-result") return TOKEN_TIMING_CATEGORIES.ENCOUNTER;
 25520 |   return "";
 25521 | }
 25522 |
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 25519 — function `liveActivityTimingCategory` (25514-25521)

```text
 25516 |   if (activity.payload?.tokenTimingCategory) return tokenTimingCategoryFromRaw(activity.payload.tokenTimingCategory);
 25517 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.CONTROL_TOKEN) return TOKEN_TIMING_CATEGORIES.CONTROL;
 25518 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.CURSE_TOKEN) return TOKEN_TIMING_CATEGORIES.CURSE;
 25519 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT || activity.type === "encounter-result") return TOKEN_TIMING_CATEGORIES.ENCOUNTER;
 25520 |   return "";
 25521 | }
 25522 |
```

#### `liveTokenPromptDetails` — line 25523 — function `liveTokenPromptDetails` (25523-25581)

```text
 25520 |   return "";
 25521 | }
 25522 |
 25523 | function liveTokenPromptDetails(activity, resultSession = null, targetState = state) {
 25524 |   const category = liveActivityTimingCategory(activity);
 25525 |   const actor = targetState.players.find((player) => player.id === activity?.actorPlayerId);
 25526 |   const target = targetState.players.find((player) => player.id === activity?.targetPlayerId);
```

#### `liveActivityTimingCategory` — line 25524 — function `liveTokenPromptDetails` (25523-25581)

```text
 25521 | }
 25522 |
 25523 | function liveTokenPromptDetails(activity, resultSession = null, targetState = state) {
 25524 |   const category = liveActivityTimingCategory(activity);
 25525 |   const actor = targetState.players.find((player) => player.id === activity?.actorPlayerId);
 25526 |   const target = targetState.players.find((player) => player.id === activity?.targetPlayerId);
 25527 |   const tokenName = activity?.payload?.tokenName || activity?.sourceId || "Token";
```

#### `"encounter-result"` — line 25532 — function `liveTokenPromptDetails` (25523-25581)

```text
 25529 |   const teamLockText = activity?.payload?.teamLock
 25530 |     ? " This is happening during Sabotage. Submitted teams are locked before Team Preview."
 25531 |     : "";
 25532 |   if (resultSession || activity?.type === "encounter-result" || activity?.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT) {
 25533 |     const resultOwnerId = resultSession?.resultOwnerPlayerId || resultSession?.ownerPlayerId || resultSession?.playerId || activity?.actorPlayerId || "";
 25534 |     const resultOwner = targetState.players.find((player) => player.id === resultOwnerId);
 25535 |     const resultName = resultSession?.resultDisplayName || activity?.payload?.resultName || "an encounter";
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 25532 — function `liveTokenPromptDetails` (25523-25581)

```text
 25529 |   const teamLockText = activity?.payload?.teamLock
 25530 |     ? " This is happening during Sabotage. Submitted teams are locked before Team Preview."
 25531 |     : "";
 25532 |   if (resultSession || activity?.type === "encounter-result" || activity?.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT) {
 25533 |     const resultOwnerId = resultSession?.resultOwnerPlayerId || resultSession?.ownerPlayerId || resultSession?.playerId || activity?.actorPlayerId || "";
 25534 |     const resultOwner = targetState.players.find((player) => player.id === resultOwnerId);
 25535 |     const resultName = resultSession?.resultDisplayName || activity?.payload?.resultName || "an encounter";
```

#### `"encounter-result"` — line 26165 — function `getCurrentLivePrompt` (26151-26293)

```text
 26162 |     const resultOwner = targetState.players.find((player) => player.id === resultOwnerId);
 26163 |     const resultName = resultSession?.resultDisplayName || pendingEvent.payload?.resultName || "";
 26164 |     const sourceLabel = resultSession?.sourceLabel || pendingEvent.payload?.sourceLabel || pendingEvent.sourceType || "Event";
 26165 |     const isEncounterResult = Boolean(resultSession?.sourceType === "encounter" || pendingEvent.type === "encounter-result");
 26166 |     const tokenPrompt = liveTokenPromptDetails(pendingEvent, resultSession, targetState);
 26167 |     const promptDisplay = liveCurrentPromptDetails(pendingEvent, tokenPrompt, currentPromptStep, respondingToPromptStep);
 26168 |     if (resultSession) {
```

#### `liveTokenPromptDetails` — line 26166 — function `getCurrentLivePrompt` (26151-26293)

```text
 26163 |     const resultName = resultSession?.resultDisplayName || pendingEvent.payload?.resultName || "";
 26164 |     const sourceLabel = resultSession?.sourceLabel || pendingEvent.payload?.sourceLabel || pendingEvent.sourceType || "Event";
 26165 |     const isEncounterResult = Boolean(resultSession?.sourceType === "encounter" || pendingEvent.type === "encounter-result");
 26166 |     const tokenPrompt = liveTokenPromptDetails(pendingEvent, resultSession, targetState);
 26167 |     const promptDisplay = liveCurrentPromptDetails(pendingEvent, tokenPrompt, currentPromptStep, respondingToPromptStep);
 26168 |     if (resultSession) {
 26169 |       return {
```

#### `liveTokenPromptDetails` — line 26203 — function `getCurrentLivePrompt` (26151-26293)

```text
 26200 |         sourceLabel
 26201 |       };
 26202 |     }
 26203 |     const promptDetails = tokenPrompt || liveTokenPromptDetails(pendingEvent, null, targetState);
 26204 |     const standardPromptDisplay = liveCurrentPromptDetails(pendingEvent, promptDetails, currentPromptStep, respondingToPromptStep);
 26205 |     return {
 26206 |       id: `live-${pendingEvent.id}`,
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 26403 — function `liveManualEventTypeOptions` (26397-26409)

```text
 26400 |     ["class-effect", "Class Effect"],
 26401 |     [TOKEN_PENDING_EVENT_TYPES.CONTROL_TOKEN, "Control Token"],
 26402 |     [TOKEN_PENDING_EVENT_TYPES.CURSE_TOKEN, "Curse"],
 26403 |     [TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT, "Encounter"],
 26404 |     [TOKEN_PENDING_EVENT_TYPES.PROTECTION_RESPONSE, "Protection / Response Note"],
 26405 |     ["item-effect", "Item"],
 26406 |     ["other", "Other"]
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 26414 — function `liveTimingWindowOptions` (26411-26421)

```text
 26411 | function liveTimingWindowOptions(selected = "normal") {
 26412 |   const options = [
 26413 |     ["normal", "Normal"],
 26414 |     [TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT, "Encounter Result"],
 26415 |     [TOKEN_PENDING_EVENT_TYPES.TEAM_LOCK_WINDOW, "Sabotage"],
 26416 |     ["team-preview", "Team Preview"],
 26417 |     ["battle-phase", "Battle Phase"],
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 27138 — function `createLiveManualEventFromForm` (27117-27181)

```text
 27135 |   }
 27136 |   const finalEventType = timingWindow === TOKEN_PENDING_EVENT_TYPES.TEAM_LOCK_WINDOW
 27137 |     ? TOKEN_PENDING_EVENT_TYPES.TEAM_LOCK_WINDOW
 27138 |     : timingWindow === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT
 27139 |       ? TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT
 27140 |       : eventType;
 27141 |   const activity = createInteractionEvent({
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 27139 — function `createLiveManualEventFromForm` (27117-27181)

```text
 27136 |   const finalEventType = timingWindow === TOKEN_PENDING_EVENT_TYPES.TEAM_LOCK_WINDOW
 27137 |     ? TOKEN_PENDING_EVENT_TYPES.TEAM_LOCK_WINDOW
 27138 |     : timingWindow === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT
 27139 |       ? TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT
 27140 |       : eventType;
 27141 |   const activity = createInteractionEvent({
 27142 |     type: finalEventType,
```

#### `currentEncounterPendingActivity` — line 27590 — function `currentEncounterPendingActivity` (27590-27597)

```text
 27587 |   return savedResponse;
 27588 | }
 27589 |
 27590 | function currentEncounterPendingActivity() {
 27591 |   const activity = getCurrentPendingEvent();
 27592 |   if (!activity || activity.status !== "open") return null;
 27593 |   const session = liveResultSessionForActivity(activity);
```

#### `"encounter-result"` — line 27594 — function `currentEncounterPendingActivity` (27590-27597)

```text
 27591 |   const activity = getCurrentPendingEvent();
 27592 |   if (!activity || activity.status !== "open") return null;
 27593 |   const session = liveResultSessionForActivity(activity);
 27594 |   if (activity.type === "encounter-result" || activity.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT) return activity;
 27595 |   if (session?.sourceType === "encounter") return activity;
 27596 |   return null;
 27597 | }
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 27594 — function `currentEncounterPendingActivity` (27590-27597)

```text
 27591 |   const activity = getCurrentPendingEvent();
 27592 |   if (!activity || activity.status !== "open") return null;
 27593 |   const session = liveResultSessionForActivity(activity);
 27594 |   if (activity.type === "encounter-result" || activity.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT) return activity;
 27595 |   if (session?.sourceType === "encounter") return activity;
 27596 |   return null;
 27597 | }
```

#### `currentEncounterPendingActivity` — line 27605 — function `recordEncounterTokenUse` (27604-27631)

```text
 27602 | }
 27603 |
 27604 | async function recordEncounterTokenUse(draft) {
 27605 |   const activity = currentEncounterPendingActivity();
 27606 |   if (!activity) {
 27607 |     alert("Encounter Tokens are used during an encounter result window before the result is finalized.");
 27608 |     return null;
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 28000 — function `liveRefereeTokenInventoryGroups` (27964-28006)

```text
 27997 |   const categoryOrder = {
 27998 |     [TOKEN_TIMING_CATEGORIES.CONTROL]: 1,
 27999 |     [TOKEN_TIMING_CATEGORIES.PROTECTION]: 2,
 28000 |     [TOKEN_TIMING_CATEGORIES.ENCOUNTER]: 3,
 28001 |     [TOKEN_TIMING_CATEGORIES.CURSE]: 4,
 28002 |     [TOKEN_TIMING_CATEGORIES.MANUAL]: 9
 28003 |   };
```

#### `liveRefereePromptIsEncounterResult` — line 28008 — function `liveRefereePromptIsEncounterResult` (28008-28014)

```text
 28005 |     || a.name.localeCompare(b.name));
 28006 | }
 28007 |
 28008 | function liveRefereePromptIsEncounterResult(prompt) {
 28009 |   const activity = prompt?.pendingEvent;
 28010 |   return Boolean(prompt?.resultSession
 28011 |     || activity?.type === "encounter-result"
```

#### `"encounter-result"` — line 28011 — function `liveRefereePromptIsEncounterResult` (28008-28014)

```text
 28008 | function liveRefereePromptIsEncounterResult(prompt) {
 28009 |   const activity = prompt?.pendingEvent;
 28010 |   return Boolean(prompt?.resultSession
 28011 |     || activity?.type === "encounter-result"
 28012 |     || activity?.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT
 28013 |     || liveResultSessionForActivity(activity));
 28014 | }
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 28012 — function `liveRefereePromptIsEncounterResult` (28008-28014)

```text
 28009 |   const activity = prompt?.pendingEvent;
 28010 |   return Boolean(prompt?.resultSession
 28011 |     || activity?.type === "encounter-result"
 28012 |     || activity?.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT
 28013 |     || liveResultSessionForActivity(activity));
 28014 | }
 28015 |
```

#### `liveRefereePromptIsEncounterResult` — line 28038 — function `liveRefereeTokenCanUseNow` (28016-28040)

```text
 28035 |   }
 28036 |   if (group.metadata?.resolverId === "delayParent"
 28037 |     && !teleportDelayableParentPlan(prompt?.pendingEvent, step).ok) return false;
 28038 |   if (group.metadata?.timingWindows?.includes(TOKEN_TIMING_WINDOWS.WHEEL_WINDOW)) return liveRefereePromptIsEncounterResult(prompt);
 28039 |   return true;
 28040 | }
 28041 |
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 28291 — function `liveRefereeTokenUseIntentLabel` (28288-28293)

```text
 28288 | function liveRefereeTokenUseIntentLabel(group, prompt) {
 28289 |   const category = group?.metadata?.timingCategory || "";
 28290 |   if (prompt?.pendingEvent && category === TOKEN_TIMING_CATEGORIES.PROTECTION) return "Respond";
 28291 |   if (prompt?.pendingEvent && category === TOKEN_TIMING_CATEGORIES.ENCOUNTER) return "Modify";
 28292 |   return "Open Window";
 28293 | }
 28294 |
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 29401 — function `buildRivalSagaPokemonTierMap` (16725-40003)

```text
 29398 |       className: "current-prompt"
 29399 |     });
 29400 |   }
 29401 |   if (targetType === EFFECT_TARGET_TYPES.ENCOUNTER_RESULT) {
 29402 |     const encounterLine = liveRefereeCurrentEncounterLine(prompt);
 29403 |     return liveRefereeEffectTargetScreenMarkup({
 29404 |       prompt,
```

#### `liveActivityTimingCategory` — line 29583 — function `liveRefereeEventTypeLabel` (29582-29586)

```text
 29580 | }
 29581 |
 29582 | function liveRefereeEventTypeLabel(activity, fallback = "Event") {
 29583 |   const category = liveActivityTimingCategory(activity);
 29584 |   if (category) return tokenTimingCategoryLabel(category);
 29585 |   return liveRefereeTitleCase(activity?.payload?.eventType || activity?.sourceType || activity?.type || fallback || "Event") || "Event";
 29586 | }
```

#### `"encounter-result"` — line 41036

```text
 41033 |     action: "token", category: "pokemon", player: actor.name,
 41034 |     item: summary, title: "Reroll replaced an encounter result", summary,
 41035 |     type: "encounter-reroll-token", categories: ["tokens", "pokemon", "encounter"],
 41036 |     tags: ["reroll-token", "encounter-result", resultKind || "result"],
 41037 |     playerIds: [actor.id, targetPlayerId].filter(Boolean), pokemonNames: [previousName, nextName].filter(Boolean),
 41038 |     tokenNames: [metadata.name || "Reroll"], linkedEventId: sourceEffectId,
 41039 |     targetResultId, previousResultName: previousName, replacementResultName: nextName,
```

#### `createPokemonResultTimingWindow` — line 41165

```text
 41162 |   state.randomPokemonSessions.unshift(session);
 41163 |   state.selectedRandomPokemonSessionId = session.id;
 41164 |   state.randomPokemonDrawerOpen = true;
 41165 |   createPokemonResultTimingWindow(session, player);
 41166 |   saveState();
 41167 |   render();
 41168 |   const sprite = await fetchStablePokemonSprite(result.displayName, session.chosenSpriteKey);
```

#### `"encounter-reroll"` — line 41403

```text
 41400 |     linkedEventId: randomSession.interactionEventId || "",
 41401 |     linkedResponseId: savedRerollResponse?.id || "",
 41402 |     promptId: savedRerollResponse?.respondingToPromptId || "",
 41403 |     source: "encounter-reroll"
 41404 |   });
 41405 |   randomSession.rerollCount = Number(randomSession.rerollCount || 0) + 1;
 41406 |   randomSession.resultPokemonName = next.key || next.pokemonName || next.displayName;
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 46989 — function `launchTokenScenarioSandbox` (46879-47013)

```text
 46986 |   } else if (kind === "encounterBefore") {
 46987 |     activity = createTokenScenarioEvent({ actor, target, title: `${actor.name}'s encounter is about to begin.`, message: "Choose before-roll Encounter effects now.", type: "encounter-before-roll", targeted: false, payload: { encounterStage: "beforeRoll" } });
 46988 |   } else if (kind === "encounterResult") {
 46989 |     activity = createTokenScenarioEvent({ actor, target, title: `${actor.name} rolled Abra.`, message: `${actor.name} rolled Abra. The result is pending.`, type: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT, targeted: false, payload: { encounterStage: "result", resultName: "Abra" } });
 46990 |   } else if (kind === "wheelManual") {
 46991 |     const guided = (contract?.list || []).find((definition) => definition.resolverMode === EFFECT_RESOLUTION_MODES.GUIDED) || tokenDefinition;
 46992 |     activity = createTokenScenarioEvent({ actor, target, tokenDefinition: guided, title: `${actor.name} used ${guided.name}.`, message: `${guided.name} is waiting for its guided result.`, type: TOKEN_PENDING_EVENT_TYPES.CONTROL_TOKEN, sourceType: "token-use", targeted: guided.targetScope !== "tableWide" });
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 47526 — function `createAdminTestEvent` (47508-47588)

```text
 47523 |   };
 47524 |   const presets = {
 47525 |     encounter: {
 47526 |       type: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT,
 47527 |       title: `${actor.name} test encounter result`,
 47528 |       message: `${actor.name} rolled a test encounter result. Encounter tokens and trades may happen before finalizing.`,
 47529 |       sourceType: "admin-test-encounter",
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 47530 — function `createAdminTestEvent` (47508-47588)

```text
 47527 |       title: `${actor.name} test encounter result`,
 47528 |       message: `${actor.name} rolled a test encounter result. Encounter tokens and trades may happen before finalizing.`,
 47529 |       sourceType: "admin-test-encounter",
 47530 |       payload: { tokenTimingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER, effectApplication: "audit" }
 47531 |     },
 47532 |     control: {
 47533 |       type: TOKEN_PENDING_EVENT_TYPES.CONTROL_TOKEN,
```
