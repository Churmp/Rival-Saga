# V1 Purge Stage 9E — Final Production Residue Survey

Generated from `9a25c328429862ff9e083f419365cb0667c980d4`.

Production/static files only. Historical reports, purge scripts, and archaeology docs are intentionally excluded.

## Summary

| Group | File | Marker | Count | Lines |
|---|---|---|---:|---|
| Current Route token infrastructure | `app.js` | `V2_ROUTE_TOKEN_IDS` | 20 | 42436, 42443, 42444, 42445, 42446, 43786, 43819, 43851, 44020, 44021, 44022, 44074, 44123, 44162, 44224, 44730, 44750, 44768, 44779, 44969 |
| Current Route token infrastructure | `app.js` | `useV2RouteRerollToken` | 2 | 44727, 61502 |
| Current Route token infrastructure | `app.js` | `useV2ExtraEncounter` | 2 | 44747, 61520 |
| Current Route token infrastructure | `app.js` | `applyV2RouteRepel` | 2 | 44765, 61566 |
| Current Route token infrastructure | `app.js` | `useV2MasterBallOnOpportunity` | 2 | 44776, 61569 |
| Current Route token infrastructure | `token-effect-contract.js` | `useV2ExtraEncounter` | 1 | 740 |
| Current Route token infrastructure | `token-effect-contract.js` | `applyV2RouteRepel` | 1 | 741 |
| Current Route token infrastructure | `token-effect-contract.js` | `useV2MasterBallOnOpportunity` | 1 | 745 |
| Encounter timing/target taxonomy | `app.js` | `ENCOUNTER: "encounter"` | 1 | 672 |
| Encounter timing/target taxonomy | `app.js` | `ENCOUNTER_RESULT: "encounterResult"` | 3 | 695, 713, 823 |
| Encounter timing/target taxonomy | `app.js` | `ENCOUNTER_MODIFIER: "encounterModifier"` | 1 | 766 |
| Encounter timing/target taxonomy | `app.js` | `ENCOUNTER_TOKEN: "encounterToken"` | 1 | 827 |
| Encounter timing/target taxonomy | `app.js` | `TOKEN_TIMING_CATEGORIES.ENCOUNTER` | 13 | 856, 857, 2713, 2967, 3112, 3134, 3137, 3224, 3430, 4124, 5951, 27960, 28251 |
| Encounter timing/target taxonomy | `app.js` | `TOKEN_USE_TYPES.ENCOUNTER_MODIFIER` | 2 | 858, 2714 |
| Encounter timing/target taxonomy | `app.js` | `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` | 3 | 861, 2717, 27972 |
| Encounter timing/target taxonomy | `app.js` | `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_TOKEN` | 1 | 863 |
| Encounter timing/target taxonomy | `app.js` | `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` | 14 | 2752, 2753, 2754, 2755, 2756, 2757, 2758, 3117, 3189, 3190, 3224, 3238, 3256, 29361 |
| Encounter timing/target taxonomy | `app.js` | `EFFECT_TARGET_CATEGORIES.ENCOUNTER_RESULT` | 1 | 3256 |
| Hidden Grotto text/config (rules-review deferred) | `app.js` | `Hidden Grotto` | 4 | 1142, 1286, 2186, 38502 |
| Old Encounter token wording | `app.js` | `Reroll any wheel result` | 1 | 2680 |
| Old Encounter token wording | `app.js` | `Encounter Token` | 8 | 2681, 2752, 2964, 3430, 5951, 23568, 27581, 44023 |
| Old Encounter token wording | `app.js` | `roll an extra encounter` | 2 | 2681, 2752 |
| Old Encounter token wording | `app.js` | `encounter wheel` | 3 | 2682, 2684, 2687 |
| Old Encounter token wording | `app.js` | `steal another player's encounter` | 1 | 2683 |
| Old Encounter token wording | `app.js` | `Before an encounter wheel` | 2 | 2684, 2687 |
| Old Encounter token wording | `app.js` | `copy that encounter` | 1 | 2685 |
| Old Encounter token wording | `app.js` | `Choose your encounter` | 1 | 2686 |
| Old Encounter token wording | `app.js` | `Encounter Wheel` | 2 | 2753, 38476 |
| Old Encounter token wording | `app.js` | `Encounter Tokens` | 1 | 27581 |
| Old Encounter token wording | `token-effect-contract.js` | `Encounter Token` | 1 | 740 |
| Retired Encounter runtime identity | `app.js` | `"encounter-result"` | 3 | 2722, 27971, 40981 |
| Retired Encounter runtime identity | `app.js` | `Encounter Wheel` | 2 | 2753, 38476 |
| Retired Encounter runtime identity | `app.js` | `encounterSessionId` | 1 | 4004 |
| Retired Encounter runtime identity | `app.js` | `encounterCopyRecords` | 1 | 4335 |
| Retired Encounter runtime identity | `token-control-effects.js` | `encounterCopyRecords` | 2 | 969, 990 |
| Shared/current result infrastructure | `app.js` | `"pokemon-result"` | 4 | 642, 23133, 23185, 25488 |
| Shared/current result infrastructure | `app.js` | `randomPokemonSessions` | 24 | 2531, 3785, 4310, 4334, 4440, 4484, 22047, 22060, 25490, 26703, 26715, 40990, 40991, 40996, 41106, 41107, 41114, 41163, 41263, 41376, 41402, 46781, 59221, 59287 |
| Shared/current result infrastructure | `app.js` | `liveResultSessionForActivity` | 9 | 3477, 4124, 25485, 26134, 26745, 27566, 27584, 27973, 28979 |
| Shared/current result infrastructure | `app.js` | `recordPokemonResultTokenUse` | 2 | 4125, 27574 |
| Shared/current result infrastructure | `app.js` | `createPokemonResultTimingWindow` | 2 | 23129, 41110 |
| Shared/current result infrastructure | `app.js` | `rerollRandomPokemonSession` | 6 | 26720, 27589, 41057, 41262, 61644, 61685 |
| Shared/current result infrastructure | `server.js` | `randomPokemonSessions` | 1 | 1293 |

## Detailed contexts

### Current Route token infrastructure — `app.js`

#### `V2_ROUTE_TOKEN_IDS` — line 42436

```text
 42434 |   Object.freeze({ id: "plus-2", label: "+2 tiers", weight: 5, offset: 2 })
 42435 | ]);
 42436 | const V2_ROUTE_TOKEN_IDS = Object.freeze({
 42437 |   extraEncounter: "extra-encounter-token",
 42438 |   reroll: "reroll-token",
```

#### `V2_ROUTE_TOKEN_IDS` — line 42443

```text
 42441 | });
 42442 | const V2_ROUTE_TOKEN_NAMES = Object.freeze({
 42443 |   [V2_ROUTE_TOKEN_IDS.extraEncounter]: ["extra encounter token", "extra encounter"],
 42444 |   [V2_ROUTE_TOKEN_IDS.reroll]: ["reroll token", "reroll"],
 42445 |   [V2_ROUTE_TOKEN_IDS.repel]: ["repel token", "repel"],
```

#### `V2_ROUTE_TOKEN_IDS` — line 42444

```text
 42442 | const V2_ROUTE_TOKEN_NAMES = Object.freeze({
 42443 |   [V2_ROUTE_TOKEN_IDS.extraEncounter]: ["extra encounter token", "extra encounter"],
 42444 |   [V2_ROUTE_TOKEN_IDS.reroll]: ["reroll token", "reroll"],
 42445 |   [V2_ROUTE_TOKEN_IDS.repel]: ["repel token", "repel"],
 42446 |   [V2_ROUTE_TOKEN_IDS.masterBall]: ["master ball token", "master ball"]
```

#### `V2_ROUTE_TOKEN_IDS` — line 42445

```text
 42443 |   [V2_ROUTE_TOKEN_IDS.extraEncounter]: ["extra encounter token", "extra encounter"],
 42444 |   [V2_ROUTE_TOKEN_IDS.reroll]: ["reroll token", "reroll"],
 42445 |   [V2_ROUTE_TOKEN_IDS.repel]: ["repel token", "repel"],
 42446 |   [V2_ROUTE_TOKEN_IDS.masterBall]: ["master ball token", "master ball"]
 42447 | });
```

#### `V2_ROUTE_TOKEN_IDS` — line 42446

```text
 42444 |   [V2_ROUTE_TOKEN_IDS.reroll]: ["reroll token", "reroll"],
 42445 |   [V2_ROUTE_TOKEN_IDS.repel]: ["repel token", "repel"],
 42446 |   [V2_ROUTE_TOKEN_IDS.masterBall]: ["master ball token", "master ball"]
 42447 | });
 42448 |
```

#### `V2_ROUTE_TOKEN_IDS` — line 43786

```text
 43784 |   const unresolved = Boolean(result && result.status === "unresolved");
 43785 |   const routeView = route ? getRouteViewForPlayer(routeState, route.routeNumber, playerId) : null;
 43786 |   const rerollTokens = v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.reroll);
 43787 |   const duplicate = unresolved && v2ResultIsDuplicateForPlayer(result, playerId);
 43788 |   return {
```

#### `V2_ROUTE_TOKEN_IDS` — line 43819

```text
 43817 |   const player = state.players.find((entry) => entry.id === playerId);
 43818 |   const { route, opportunity } = v2FindOpportunity(routeState, opportunityId);
 43819 |   const tokens = v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.masterBall);
 43820 |   const view = route ? getRouteViewForPlayer(routeState, route.routeNumber, playerId) : null;
 43821 |   const eligibleResidents = view?.masterBallEligibleResidents || [];
```

#### `V2_ROUTE_TOKEN_IDS` — line 43851

```text
 43849 |   const route = v2FindRoute(routeState, routeNumber);
 43850 |   const player = state.players.find((entry) => entry.id === playerId);
 43851 |   const repelTokens = v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.repel);
 43852 |   const activeSuppressed = new Set((route?.suppressions || [])
 43853 |     .filter((entry) => entry.status !== "expired" && entry.status !== "removed")
```

#### `V2_ROUTE_TOKEN_IDS` — line 44020

```text
 44018 |   const item = {
 44019 |     purchaseId,
 44020 |     id: createInventoryEntryId(V2_ROUTE_TOKEN_IDS.extraEncounter),
 44021 |     catalogId: V2_ROUTE_TOKEN_IDS.extraEncounter,
 44022 |     canonicalId: V2_ROUTE_TOKEN_IDS.extraEncounter,
```

#### `V2_ROUTE_TOKEN_IDS` — line 44021

```text
 44019 |     purchaseId,
 44020 |     id: createInventoryEntryId(V2_ROUTE_TOKEN_IDS.extraEncounter),
 44021 |     catalogId: V2_ROUTE_TOKEN_IDS.extraEncounter,
 44022 |     canonicalId: V2_ROUTE_TOKEN_IDS.extraEncounter,
 44023 |     name: "Extra Encounter Token",
```

#### `V2_ROUTE_TOKEN_IDS` — line 44022

```text
 44020 |     id: createInventoryEntryId(V2_ROUTE_TOKEN_IDS.extraEncounter),
 44021 |     catalogId: V2_ROUTE_TOKEN_IDS.extraEncounter,
 44022 |     canonicalId: V2_ROUTE_TOKEN_IDS.extraEncounter,
 44023 |     name: "Extra Encounter Token",
 44024 |     type: "TOKEN",
```

#### `V2_ROUTE_TOKEN_IDS` — line 44074

```text
 44072 |     throw new Error(`No eligible residents remain on Route ${route.routeNumber} for ${player.name}.`);
 44073 |   }
 44074 |   const token = v2ConsumeExactRouteToken(player, V2_ROUTE_TOKEN_IDS.extraEncounter, tokenInventoryId);
 44075 |   const operationId = v2NextEffectOperationId(state.series, "v2-extra-encounter");
 44076 |   const { opportunity } = v2CreateRouteEncounterOpportunity({
```

#### `V2_ROUTE_TOKEN_IDS` — line 44123

```text
 44121 |   const existingTokenOperation = v2FindRouteEffectOperationByToken(state.series, "reroll-token", tokenInventoryId, player.id);
 44122 |   if (existingTokenOperation?.resultId === result?.resultId) return result;
 44123 |   const token = v2ConsumeExactRouteToken(player, V2_ROUTE_TOKEN_IDS.reroll, tokenInventoryId);
 44124 |   const rerolled = v2RerollRouteResult(result, player.id, { kind: "reroll-token", reason: "reroll-token", tokenInventoryId: token.id }, { token });
 44125 |   const operationId = v2NextEffectOperationId(state.series, "v2-reroll-token");
```

#### `V2_ROUTE_TOKEN_IDS` — line 44162

```text
 44160 |   const existingTokenOperation = v2FindRouteEffectOperationByToken(state.series, "repel-token", tokenInventoryId, playerId);
 44161 |   if (existingTokenOperation?.suppressionId) return (route.suppressions || []).find((entry) => entry.suppressionId === existingTokenOperation.suppressionId) || null;
 44162 |   const token = v2ConsumeExactRouteToken(player, V2_ROUTE_TOKEN_IDS.repel, tokenInventoryId);
 44163 |   const rng = v2CreateRng(`${routeState.seed}:${route.routeId}:repel:${normalizedTier}:${routeState.revision}`);
 44164 |   const pool = [...candidates];
```

#### `V2_ROUTE_TOKEN_IDS` — line 44224

```text
 44222 |     throw new Error("Master Ball can only select a resident revealed to that player on that Route.");
 44223 |   }
 44224 |   const token = v2ConsumeExactRouteToken(player, V2_ROUTE_TOKEN_IDS.masterBall, tokenInventoryId);
 44225 |   const resultId = v2NextCounterId(routeState, "result", "route-result");
 44226 |   const result = {
```

#### `useV2RouteRerollToken` — line 44727

```text
 44725 | }
 44726 |
 44727 | function useV2RouteRerollToken(actionId, tokenInventoryId = "") {
 44728 |   try {
 44729 |     const player = activePlayer();
```

#### `V2_ROUTE_TOKEN_IDS` — line 44730

```text
 44728 |   try {
 44729 |     const player = activePlayer();
 44730 |     const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.reroll)[0]?.id || "";
 44731 |     const result = v2UseRerollTokenOnAction(actionId, tokenId, { actingPlayerId: player.id });
 44732 |     v2PersistRenderAndPublishRouteActivity({ stage: "rerolled", actorPlayerId: player.id, seriesId: state.series, routeNumber: result.routeNumber });
```

#### `useV2ExtraEncounter` — line 44747

```text
 44745 | }
 44746 |
 44747 | function useV2ExtraEncounter(routeNumber, tokenInventoryId = "") {
 44748 |   try {
 44749 |     const player = activePlayer();
```

#### `V2_ROUTE_TOKEN_IDS` — line 44750

```text
 44748 |   try {
 44749 |     const player = activePlayer();
 44750 |     const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.extraEncounter)[0]?.id || "";
 44751 |     const operation = v2UseExtraEncounter(player.id, routeNumber, tokenId);
 44752 |     const workspace = v2RouteWorkspaceState(state.series);
```

#### `applyV2RouteRepel` — line 44765

```text
 44763 | }
 44764 |
 44765 | function applyV2RouteRepel(routeNumber, battleTierId, tokenInventoryId = "") {
 44766 |   try {
 44767 |     const player = activePlayer();
```

#### `V2_ROUTE_TOKEN_IDS` — line 44768

```text
 44766 |   try {
 44767 |     const player = activePlayer();
 44768 |     const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.repel)[0]?.id || "";
 44769 |     v2ApplyRepelToRoute(player.id, routeNumber, battleTierId, tokenId);
 44770 |     v2PersistAndRender();
```

#### `useV2MasterBallOnOpportunity` — line 44776

```text
 44774 | }
 44775 |
 44776 | function useV2MasterBallOnOpportunity(opportunityId, residentId, tokenInventoryId = "") {
 44777 |   try {
 44778 |     const player = activePlayer();
```

#### `V2_ROUTE_TOKEN_IDS` — line 44779

```text
 44777 |   try {
 44778 |     const player = activePlayer();
 44779 |     const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.masterBall)[0]?.id || "";
 44780 |     const operation = v2UseMasterBallOnOpportunity(player.id, opportunityId, residentId, tokenId);
 44781 |     const workspace = v2RouteWorkspaceState(state.series);
```

#### `V2_ROUTE_TOKEN_IDS` — line 44969

```text
 44967 |   const workspace = v2RouteWorkspaceState(routeState.seriesId || state.series);
 44968 |   const pendingOpportunity = v2RoutePendingOpportunityForPlayer(routeState, route.routeNumber, playerId, workspace.activeOpportunityId);
 44969 |   const extraTokens = v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.extraEncounter);
 44970 |   const extraEligible = v2EligibleResidents(route, [], { routeState, playerId });
 44971 |   const progressionLegal = route.routeNumber <= v2CurrentProgressionRoute();
```

#### `useV2RouteRerollToken` — line 61502

```text
 61500 |     if (routeRerollTokenButton && els.actionLocationBoard.contains(routeRerollTokenButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 61501 |       event.preventDefault();
 61502 |       useV2RouteRerollToken(routeRerollTokenButton.dataset.v2RouteRerollToken, routeRerollTokenButton.dataset.v2TokenId || "");
 61503 |       return;
 61504 |     }
```

#### `useV2ExtraEncounter` — line 61520

```text
 61518 |     if (railExtraUseButton && els.actionLocationBoard.contains(railExtraUseButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 61519 |       event.preventDefault();
 61520 |       if (!railExtraUseButton.disabled) useV2ExtraEncounter(Number(railExtraUseButton.dataset.v2RailExtraUse || 0), railExtraUseButton.dataset.v2TokenId || "");
 61521 |       return;
 61522 |     }
```

#### `applyV2RouteRepel` — line 61566

```text
 61564 |       if (action === "repel") {
 61565 |         const tier = card?.querySelector('[data-v2-route-effect-field="repelTier"]')?.value || "";
 61566 |         applyV2RouteRepel(Number(routeEffectApply.dataset.v2RouteNumber || 0), tier, routeEffectApply.dataset.v2TokenId || "");
 61567 |       } else if (action === "master-ball") {
 61568 |         const residentId = card?.querySelector('[data-v2-route-effect-field="masterResident"]')?.value || "";
```

#### `useV2MasterBallOnOpportunity` — line 61569

```text
 61567 |       } else if (action === "master-ball") {
 61568 |         const residentId = card?.querySelector('[data-v2-route-effect-field="masterResident"]')?.value || "";
 61569 |         if (residentId) useV2MasterBallOnOpportunity(routeEffectApply.dataset.v2OpportunityId || "", residentId, routeEffectApply.dataset.v2TokenId || "");
 61570 |       }
 61571 |       return;
```

### Current Route token infrastructure — `token-effect-contract.js`

#### `useV2ExtraEncounter` — line 740

```text
   738 |
   739 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll an eligible unresolved Pokemon result.", legalPhases: [], timingWindows: [], isResponse: false, requiresPendingEvent: false, createsPendingEvent: false, opensResponseWindow: false, targetType: "manual", targetScope: "manual", resolverMode: resolverModes.HOST_CONFIRMED, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Reroll is resolved by the current contextual result UI (including Route and shared Random Pokemon results); generic Live Referee Encounter activation is intentionally blocked.", requiredChoices: [] }),
   740 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Gain one additional encounter opportunity on a currently legal Route.", legalPhases: [], timingWindows: [], isResponse: false, requiresPendingEvent: false, createsPendingEvent: false, opensResponseWindow: false, targetType: "manual", targetScope: "manual", resolverMode: resolverModes.HOST_CONFIRMED, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Extra Encounter is resolved only inside the current Route action through useV2ExtraEncounter; generic Token/Live Referee activation is intentionally blocked.", requiredChoices: [] }),
   741 |     encounter({ id: "repel-token", name: "Repel", rulesText: "On a Route, suppress five eligible residents of a chosen Battle Tier.", legalPhases: [], timingWindows: [], isResponse: false, requiresPendingEvent: false, createsPendingEvent: false, opensResponseWindow: false, targetType: "manual", targetScope: "manual", resolverMode: resolverModes.HOST_CONFIRMED, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Repel is resolved only inside the current Route action through applyV2RouteRepel; generic Token/Live Referee activation is intentionally blocked.", requiredChoices: [] }),
   742 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Exchange your encounter for another player's encounter.", legalPhases: [], timingWindows: [], isResponse: false, requiresPendingEvent: false, createsPendingEvent: false, opensResponseWindow: false, targetType: "manual", targetScope: "manual", resolverMode: resolverModes.HOST_CONFIRMED, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Quick Ball is retained as a Saga Token concept but is blocked until its current Route-era transfer rules are reviewed; the retired wheel-era transfer path no longer exists.", requiredChoices: [] }),
```

#### `applyV2RouteRepel` — line 741

```text
   739 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll an eligible unresolved Pokemon result.", legalPhases: [], timingWindows: [], isResponse: false, requiresPendingEvent: false, createsPendingEvent: false, opensResponseWindow: false, targetType: "manual", targetScope: "manual", resolverMode: resolverModes.HOST_CONFIRMED, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Reroll is resolved by the current contextual result UI (including Route and shared Random Pokemon results); generic Live Referee Encounter activation is intentionally blocked.", requiredChoices: [] }),
   740 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Gain one additional encounter opportunity on a currently legal Route.", legalPhases: [], timingWindows: [], isResponse: false, requiresPendingEvent: false, createsPendingEvent: false, opensResponseWindow: false, targetType: "manual", targetScope: "manual", resolverMode: resolverModes.HOST_CONFIRMED, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Extra Encounter is resolved only inside the current Route action through useV2ExtraEncounter; generic Token/Live Referee activation is intentionally blocked.", requiredChoices: [] }),
   741 |     encounter({ id: "repel-token", name: "Repel", rulesText: "On a Route, suppress five eligible residents of a chosen Battle Tier.", legalPhases: [], timingWindows: [], isResponse: false, requiresPendingEvent: false, createsPendingEvent: false, opensResponseWindow: false, targetType: "manual", targetScope: "manual", resolverMode: resolverModes.HOST_CONFIRMED, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Repel is resolved only inside the current Route action through applyV2RouteRepel; generic Token/Live Referee activation is intentionally blocked.", requiredChoices: [] }),
   742 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Exchange your encounter for another player's encounter.", legalPhases: [], timingWindows: [], isResponse: false, requiresPendingEvent: false, createsPendingEvent: false, opensResponseWindow: false, targetType: "manual", targetScope: "manual", resolverMode: resolverModes.HOST_CONFIRMED, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Quick Ball is retained as a Saga Token concept but is blocked until its current Route-era transfer rules are reviewed; the retired wheel-era transfer path no longer exists.", requiredChoices: [] }),
   743 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Grant an encountered Pokemon access to a chosen legal ability.", legalPhases: [], timingWindows: [], isResponse: false, requiresPendingEvent: false, createsPendingEvent: false, opensResponseWindow: false, targetType: "manual", targetScope: "manual", resolverMode: resolverModes.HOST_CONFIRMED, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Dream Ball is retained as a Saga Token concept but is blocked until its Route-era grant timing and persistence are reviewed; the retired before-wheel path no longer exists.", requiredChoices: [] }),
```

#### `useV2MasterBallOnOpportunity` — line 745

```text
   743 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Grant an encountered Pokemon access to a chosen legal ability.", legalPhases: [], timingWindows: [], isResponse: false, requiresPendingEvent: false, createsPendingEvent: false, opensResponseWindow: false, targetType: "manual", targetScope: "manual", resolverMode: resolverModes.HOST_CONFIRMED, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Dream Ball is retained as a Saga Token concept but is blocked until its Route-era grant timing and persistence are reviewed; the retired before-wheel path no longer exists.", requiredChoices: [] }),
   744 |     encounter({ id: "honey-token", name: "Honey", rulesText: "Copy an eligible encounter.", legalPhases: [], timingWindows: [], isResponse: false, requiresPendingEvent: false, createsPendingEvent: false, opensResponseWindow: false, targetType: "manual", targetScope: "manual", resolverMode: resolverModes.HOST_CONFIRMED, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Honey is retained as a Saga Token concept but is blocked until its Route-era copy rules are reviewed; the retired end-of-Action Encounter-copy runtime no longer exists.", requiredChoices: [] }),
   745 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Use a pending Route opportunity to choose a known eligible resident.", legalPhases: [], timingWindows: [], isResponse: false, requiresPendingEvent: false, createsPendingEvent: false, opensResponseWindow: false, targetType: "manual", targetScope: "manual", resolverMode: resolverModes.HOST_CONFIRMED, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Master Ball is resolved only inside the current Route action through useV2MasterBallOnOpportunity; generic Token/Live Referee activation is intentionally blocked.", requiredChoices: [] }),
   746 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Grant an encountered Pokemon access to a chosen legal move.", legalPhases: [], timingWindows: [], isResponse: false, requiresPendingEvent: false, createsPendingEvent: false, opensResponseWindow: false, targetType: "manual", targetScope: "manual", resolverMode: resolverModes.HOST_CONFIRMED, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Beast Ball is retained as a Saga Token concept but is blocked until its Route-era grant timing and persistence are reviewed; the retired before-wheel path no longer exists.", requiredChoices: [] }),
   747 |
```

### Encounter timing/target taxonomy — `app.js`

#### `ENCOUNTER: "encounter"` — line 672

```text
   670 |   CONTROL: "control",
   671 |   PROTECTION: "protection",
   672 |   ENCOUNTER: "encounter",
   673 |   CURSE: "curse",
   674 |   MANUAL: "manual"
```

#### `ENCOUNTER_RESULT: "encounterResult"` — line 695

```text
   693 |   TEAM: "team",
   694 |   PARTY_ROSTER: "partyRoster",
   695 |   ENCOUNTER_RESULT: "encounterResult",
   696 |   TOKEN: "token",
   697 |   ITEM: "item",
```

#### `ENCOUNTER_RESULT: "encounterResult"` — line 713

```text
   711 |   PLAYER: "player",
   712 |   TEAM: "team",
   713 |   ENCOUNTER_RESULT: "encounterResult",
   714 |   RESOURCE: "resource",
   715 |   TABLE: "table",
```

#### `ENCOUNTER_MODIFIER: "encounterModifier"` — line 766

```text
   764 |   ACTIVATION: "activation",
   765 |   RESPONSE: "response",
   766 |   ENCOUNTER_MODIFIER: "encounterModifier"
   767 | });
   768 |
```

#### `ENCOUNTER_RESULT: "encounterResult"` — line 823

```text
   821 |
   822 | const TOKEN_PENDING_EVENT_TYPES = Object.freeze({
   823 |   ENCOUNTER_RESULT: "encounterResult",
   824 |   CONTROL_TOKEN: "controlToken",
   825 |   PROTECTION_RESPONSE: "protectionResponse",
```

#### `ENCOUNTER_TOKEN: "encounterToken"` — line 827

```text
   825 |   PROTECTION_RESPONSE: "protectionResponse",
   826 |   CURSE_TOKEN: "curseToken",
   827 |   ENCOUNTER_TOKEN: "encounterToken",
   828 |   CLASS_EFFECT: "classEffect",
   829 |   MANUAL_EVENT: "manualEvent",
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 856

```text
   854 |     livePromptType: TOKEN_PENDING_EVENT_TYPES.PROTECTION_RESPONSE
   855 |   }),
   856 |   [TOKEN_TIMING_CATEGORIES.ENCOUNTER]: Object.freeze({
   857 |     timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,
   858 |     useType: TOKEN_USE_TYPES.ENCOUNTER_MODIFIER,
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 857

```text
   855 |   }),
   856 |   [TOKEN_TIMING_CATEGORIES.ENCOUNTER]: Object.freeze({
   857 |     timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,
   858 |     useType: TOKEN_USE_TYPES.ENCOUNTER_MODIFIER,
   859 |     createsPendingEvent: false,
```

#### `TOKEN_USE_TYPES.ENCOUNTER_MODIFIER` — line 858

```text
   856 |   [TOKEN_TIMING_CATEGORIES.ENCOUNTER]: Object.freeze({
   857 |     timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,
   858 |     useType: TOKEN_USE_TYPES.ENCOUNTER_MODIFIER,
   859 |     createsPendingEvent: false,
   860 |     requiresPendingEvent: true,
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 861

```text
   859 |     createsPendingEvent: false,
   860 |     requiresPendingEvent: true,
   861 |     requiredPendingType: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT,
   862 |     responseRole: "encounterModifier",
   863 |     livePromptType: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_TOKEN
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_TOKEN` — line 863

```text
   861 |     requiredPendingType: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT,
   862 |     responseRole: "encounterModifier",
   863 |     livePromptType: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_TOKEN
   864 |   }),
   865 |   [TOKEN_TIMING_CATEGORIES.CURSE]: Object.freeze({
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 2713

```text
  2711 |     name: "Reroll Token",
  2712 |     sourceType: "token",
  2713 |     timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,
  2714 |     useType: TOKEN_USE_TYPES.ENCOUNTER_MODIFIER,
  2715 |     createsPendingEvent: false,
```

#### `TOKEN_USE_TYPES.ENCOUNTER_MODIFIER` — line 2714

```text
  2712 |     sourceType: "token",
  2713 |     timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,
  2714 |     useType: TOKEN_USE_TYPES.ENCOUNTER_MODIFIER,
  2715 |     createsPendingEvent: false,
  2716 |     requiresPendingEvent: true,
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 2717

```text
  2715 |     createsPendingEvent: false,
  2716 |     requiresPendingEvent: true,
  2717 |     requiredPendingType: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT,
  2718 |     responseRole: "encounterModifier",
  2719 |     livePromptType: "encounterToken",
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 2752

```text
  2750 |   "immunity": { names: ["Immunity", "Emergency Immunity Token"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Immunity", note: "Negates one effect/global effect." },
  2751 |   "revenge": { names: ["Revenge"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Revenge Pending", note: "Post-curse revenge marker." },
  2752 |   "extra-encounter-token": { names: ["Extra Encounter Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Extra Encounter Available", note: "Spend during Action Phase to roll an extra encounter." },
  2753 |   "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, choiceLabel: "Pokemon Name", effectType: "log", note: "Remove one Pokemon per 5 entries from Encounter Wheel. Wheel editor hook pending." },
  2754 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 2753

```text
  2751 |   "revenge": { names: ["Revenge"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Revenge Pending", note: "Post-curse revenge marker." },
  2752 |   "extra-encounter-token": { names: ["Extra Encounter Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Extra Encounter Available", note: "Spend during Action Phase to roll an extra encounter." },
  2753 |   "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, choiceLabel: "Pokemon Name", effectType: "log", note: "Remove one Pokemon per 5 entries from Encounter Wheel. Wheel editor hook pending." },
  2754 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
  2755 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 2754

```text
  2752 |   "extra-encounter-token": { names: ["Extra Encounter Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Extra Encounter Available", note: "Spend during Action Phase to roll an extra encounter." },
  2753 |   "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, choiceLabel: "Pokemon Name", effectType: "log", note: "Remove one Pokemon per 5 entries from Encounter Wheel. Wheel editor hook pending." },
  2754 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
  2755 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
  2756 |   "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "At End of Action, copies one immutable completed Encounter result into a new acquisition-ready Encounter without rerolling." },
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 2755

```text
  2753 |   "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, choiceLabel: "Pokemon Name", effectType: "log", note: "Remove one Pokemon per 5 entries from Encounter Wheel. Wheel editor hook pending." },
  2754 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
  2755 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
  2756 |   "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "At End of Action, copies one immutable completed Encounter result into a new acquisition-ready Encounter without rerolling." },
  2757 |   "master-ball-token": { names: ["Master Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Master Ball Pending", note: "Choose encounter; cannot be changed by other players." },
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 2756

```text
  2754 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
  2755 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
  2756 |   "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "At End of Action, copies one immutable completed Encounter result into a new acquisition-ready Encounter without rerolling." },
  2757 |   "master-ball-token": { names: ["Master Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Master Ball Pending", note: "Choose encounter; cannot be changed by other players." },
  2758 |   "beast-ball-token": { names: ["Beast Ball"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Beast Ball Pending", note: "Encounter move choice marker." }
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 2757

```text
  2755 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
  2756 |   "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "At End of Action, copies one immutable completed Encounter result into a new acquisition-ready Encounter without rerolling." },
  2757 |   "master-ball-token": { names: ["Master Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Master Ball Pending", note: "Choose encounter; cannot be changed by other players." },
  2758 |   "beast-ball-token": { names: ["Beast Ball"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Beast Ball Pending", note: "Encounter move choice marker." }
  2759 | });
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 2758

```text
  2756 |   "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "At End of Action, copies one immutable completed Encounter result into a new acquisition-ready Encounter without rerolling." },
  2757 |   "master-ball-token": { names: ["Master Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Master Ball Pending", note: "Choose encounter; cannot be changed by other players." },
  2758 |   "beast-ball-token": { names: ["Beast Ball"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Beast Ball Pending", note: "Encounter move choice marker." }
  2759 | });
  2760 |
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 2967

```text
  2965 |     objectType: TOKEN_OBJECT_TYPES.TOKEN,
  2966 |     family: ["encounter"],
  2967 |     timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,
  2968 |     timingWindows: [TOKEN_TIMING_WINDOWS.ACTION_OPEN, TOKEN_TIMING_WINDOWS.MANUAL_HOST],
  2969 |     activationPattern: TOKEN_ACTIVATION_PATTERNS.PROACTIVE,
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 3112

```text
  3110 |     objectType: TOKEN_OBJECT_TYPES.TOKEN,
  3111 |     family: ["reroll"],
  3112 |     timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,
  3113 |     timingWindows: [TOKEN_TIMING_WINDOWS.WHEEL_WINDOW, TOKEN_TIMING_WINDOWS.MANUAL_HOST],
  3114 |     activationPattern: TOKEN_ACTIVATION_PATTERNS.RESPONSE,
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 3117

```text
  3115 |     persistence: TOKEN_PERSISTENCE_BUCKETS.INSTANT,
  3116 |     resolutionPayloads: [TOKEN_RESOLUTION_PAYLOADS.WHEEL, TOKEN_RESOLUTION_PAYLOADS.REPLACEMENT],
  3117 |     targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT,
  3118 |     targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT,
  3119 |     duration: "instant",
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 3134

```text
  3132 | function tokenTimingCategoryFromRaw(value = "") {
  3133 |   const key = String(value || "").toLowerCase().trim();
  3134 |   if (key === "reroll") return TOKEN_TIMING_CATEGORIES.ENCOUNTER;
  3135 |   if (Object.values(TOKEN_TIMING_CATEGORIES).includes(key)) return key;
  3136 |   if (key === "curses") return TOKEN_TIMING_CATEGORIES.CURSE;
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 3137

```text
  3135 |   if (Object.values(TOKEN_TIMING_CATEGORIES).includes(key)) return key;
  3136 |   if (key === "curses") return TOKEN_TIMING_CATEGORIES.CURSE;
  3137 |   if (key === "encounters") return TOKEN_TIMING_CATEGORIES.ENCOUNTER;
  3138 |   if (key === "manual" || key === "other") return TOKEN_TIMING_CATEGORIES.MANUAL;
  3139 |   return "";
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 3189

```text
  3187 |   if (values.includes(raw)) return raw;
  3188 |   if (key === "current-prompt") return EFFECT_TARGET_TYPES.CURRENT_PROMPT;
  3189 |   if (key === "pending-random-result" || key === "pending-result") return EFFECT_TARGET_TYPES.ENCOUNTER_RESULT;
  3190 |   if (/encounter|random/.test(key)) return EFFECT_TARGET_TYPES.ENCOUNTER_RESULT;
  3191 |   if (/pokemon/.test(key)) return EFFECT_TARGET_TYPES.POKEMON;
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 3190

```text
  3188 |   if (key === "current-prompt") return EFFECT_TARGET_TYPES.CURRENT_PROMPT;
  3189 |   if (key === "pending-random-result" || key === "pending-result") return EFFECT_TARGET_TYPES.ENCOUNTER_RESULT;
  3190 |   if (/encounter|random/.test(key)) return EFFECT_TARGET_TYPES.ENCOUNTER_RESULT;
  3191 |   if (/pokemon/.test(key)) return EFFECT_TARGET_TYPES.POKEMON;
  3192 |   if (/player/.test(key)) return EFFECT_TARGET_TYPES.PLAYER;
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 3224

```text
  3222 |   if (explicit) return explicit;
  3223 |   if (category === TOKEN_TIMING_CATEGORIES.PROTECTION) return EFFECT_TARGET_TYPES.CURRENT_PROMPT;
  3224 |   if (category === TOKEN_TIMING_CATEGORIES.ENCOUNTER) return EFFECT_TARGET_TYPES.ENCOUNTER_RESULT;
  3225 |   const mode = String(definition.targetMode || "").toLowerCase();
  3226 |   if (/pokemon/.test(mode) || mode === "banned-pokemon") return EFFECT_TARGET_TYPES.POKEMON;
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 3224

```text
  3222 |   if (explicit) return explicit;
  3223 |   if (category === TOKEN_TIMING_CATEGORIES.PROTECTION) return EFFECT_TARGET_TYPES.CURRENT_PROMPT;
  3224 |   if (category === TOKEN_TIMING_CATEGORIES.ENCOUNTER) return EFFECT_TARGET_TYPES.ENCOUNTER_RESULT;
  3225 |   const mode = String(definition.targetMode || "").toLowerCase();
  3226 |   if (/pokemon/.test(mode) || mode === "banned-pokemon") return EFFECT_TARGET_TYPES.POKEMON;
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 3238

```text
  3236 |   if (explicit) return explicit;
  3237 |   if (targetType === EFFECT_TARGET_TYPES.CURRENT_PROMPT) return EFFECT_TARGET_SCOPES.CURRENT_PROMPT;
  3238 |   if (targetType === EFFECT_TARGET_TYPES.ENCOUNTER_RESULT) return EFFECT_TARGET_SCOPES.CURRENT_PROMPT;
  3239 |   if (targetType === EFFECT_TARGET_TYPES.PLAYER) return EFFECT_TARGET_SCOPES.SINGLE_PLAYER;
  3240 |   if (targetType === EFFECT_TARGET_TYPES.TABLE) return EFFECT_TARGET_SCOPES.TABLE_WIDE;
```

#### `EFFECT_TARGET_CATEGORIES.ENCOUNTER_RESULT` — line 3256

```text
  3254 | function targetCategoryFromEffectBucket(targetType = "", targetScope = "") {
  3255 |   if (targetType === EFFECT_TARGET_TYPES.POKEMON) return EFFECT_TARGET_CATEGORIES.POKEMON;
  3256 |   if (targetType === EFFECT_TARGET_TYPES.ENCOUNTER_RESULT) return EFFECT_TARGET_CATEGORIES.ENCOUNTER_RESULT;
  3257 |   if (targetType === EFFECT_TARGET_TYPES.PLAYER) return EFFECT_TARGET_CATEGORIES.PLAYER;
  3258 |   if (targetType === EFFECT_TARGET_TYPES.RESOURCE) return EFFECT_TARGET_CATEGORIES.TOKEN;
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 3256

```text
  3254 | function targetCategoryFromEffectBucket(targetType = "", targetScope = "") {
  3255 |   if (targetType === EFFECT_TARGET_TYPES.POKEMON) return EFFECT_TARGET_CATEGORIES.POKEMON;
  3256 |   if (targetType === EFFECT_TARGET_TYPES.ENCOUNTER_RESULT) return EFFECT_TARGET_CATEGORIES.ENCOUNTER_RESULT;
  3257 |   if (targetType === EFFECT_TARGET_TYPES.PLAYER) return EFFECT_TARGET_CATEGORIES.PLAYER;
  3258 |   if (targetType === EFFECT_TARGET_TYPES.RESOURCE) return EFFECT_TARGET_CATEGORIES.TOKEN;
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 3430

```text
  3428 |     [TOKEN_TIMING_CATEGORIES.CONTROL]: "Control Token",
  3429 |     [TOKEN_TIMING_CATEGORIES.PROTECTION]: "Protection Token",
  3430 |     [TOKEN_TIMING_CATEGORIES.ENCOUNTER]: "Encounter Token",
  3431 |     [TOKEN_TIMING_CATEGORIES.CURSE]: "Curse Token",
  3432 |     [TOKEN_TIMING_CATEGORIES.MANUAL]: "Manual Token"
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 4124

```text
  4122 |   }
  4123 |   if (pendingEvent) {
  4124 |     if ((metadata.timingWindows.includes(TOKEN_TIMING_WINDOWS.WHEEL_WINDOW) || metadata.timingCategory === TOKEN_TIMING_CATEGORIES.ENCOUNTER) && liveResultSessionForActivity(pendingEvent)) {
  4125 |       return recordPokemonResultTokenUse(draft);
  4126 |     }
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 5951

```text
  5949 |     [TOKEN_TIMING_CATEGORIES.CONTROL, "Control Token"],
  5950 |     [TOKEN_TIMING_CATEGORIES.PROTECTION, "Protection Token"],
  5951 |     [TOKEN_TIMING_CATEGORIES.ENCOUNTER, "Encounter Token"],
  5952 |     [TOKEN_TIMING_CATEGORIES.CURSE, "Curse Token"],
  5953 |   ].map(([value, label]) => `<option value="${escapeHtml(value)}" ${value === selected ? "selected" : ""}>${escapeHtml(label)}</option>`).join("");
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 27960

```text
 27958 |     [TOKEN_TIMING_CATEGORIES.CONTROL]: 1,
 27959 |     [TOKEN_TIMING_CATEGORIES.PROTECTION]: 2,
 27960 |     [TOKEN_TIMING_CATEGORIES.ENCOUNTER]: 3,
 27961 |     [TOKEN_TIMING_CATEGORIES.CURSE]: 4,
 27962 |     [TOKEN_TIMING_CATEGORIES.MANUAL]: 9
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 27972

```text
 27970 |   return Boolean(prompt?.resultSession
 27971 |     || activity?.type === "encounter-result"
 27972 |     || activity?.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT
 27973 |     || liveResultSessionForActivity(activity));
 27974 | }
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 28251

```text
 28249 |   const category = group?.metadata?.timingCategory || "";
 28250 |   if (prompt?.pendingEvent && category === TOKEN_TIMING_CATEGORIES.PROTECTION) return "Respond";
 28251 |   if (prompt?.pendingEvent && category === TOKEN_TIMING_CATEGORIES.ENCOUNTER) return "Modify";
 28252 |   return "Open Window";
 28253 | }
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 29361

```text
 29359 |     });
 29360 |   }
 29361 |   if (targetType === EFFECT_TARGET_TYPES.ENCOUNTER_RESULT) {
 29362 |     const encounterLine = liveRefereeCurrentEncounterLine(prompt);
 29363 |     return liveRefereeEffectTargetScreenMarkup({
```

### Hidden Grotto text/config (rules-review deferred) — `app.js`

#### `Hidden Grotto` — line 1142

```text
  1140 |     "name": "Grotto Regular",
  1141 |     "tier": "C",
  1142 |     "description": "Hidden Grotto Encounters Cost 750 Less For You.",
  1143 |     "isConsumable": false,
  1144 |     "uses": null
```

#### `Hidden Grotto` — line 1286

```text
  1284 |     "name": "Encounter Pro",
  1285 |     "tier": "A",
  1286 |     "description": "Once Per Action Phase Get A Free Hidden Grotto Encounter.",
  1287 |     "isConsumable": false,
  1288 |     "uses": null
```

#### `Hidden Grotto` — line 2186

```text
  2184 |     "name": "Grotto Pass",
  2185 |     "tier": "C",
  2186 |     "description": "Visit The Hidden Grotto Without Using An Action.",
  2187 |     "isConsumable": true,
  2188 |     "uses": 2
```

#### `Hidden Grotto` — line 38502

```text
 38500 |     ["Off My Meds", "Visit The Pokemon Center & Use A Center's Paid Option."],
 38501 |     ["Prize Pokemon", "Win At The Game Corner Or Use A Game Corner Ticket."],
 38502 |     ["Tracking The Beast", "Catch A Pokemon From The Hidden Grotto"],
 38503 |     ["The Dragon's Discount", "Leave A Pokemon In The Dragons Den"],
 38504 |     ["Supply Run", "Spend 9K"],
```

### Old Encounter token wording — `app.js`

#### `Reroll any wheel result` — line 2680

```text
  2678 |     { id: "immunity", name: "Immunity", tokenType: "protection", tier: "Protection", category: "Protection", price: 9000, description: "Negate any effect or global effect. Does not stop series restricts or bans." },
  2679 |     { id: "revenge", name: "Revenge", tokenType: "protection", tier: "Protection", category: "Protection", price: 10000, description: "After a Battle Phase where an opponent cursed a Pokemon you brought, release 2 Pokemon from their brought team and destroy the held item." },
  2680 |     { id: "reroll-token", name: "Reroll", tokenType: "reroll", tier: "Encounter", category: "Encounter", price: 1000, description: "Reroll any wheel result." },
  2681 |     { id: "extra-encounter-token", name: "Extra Encounter Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 3500, description: "Use in Action Phase to roll an extra encounter." },
  2682 |     { id: "repel-token", name: "Repel", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 3500, description: "Remove one Pokemon for every 5 entries on an encounter wheel." },
```

#### `Encounter Token` — line 2681

```text
  2679 |     { id: "revenge", name: "Revenge", tokenType: "protection", tier: "Protection", category: "Protection", price: 10000, description: "After a Battle Phase where an opponent cursed a Pokemon you brought, release 2 Pokemon from their brought team and destroy the held item." },
  2680 |     { id: "reroll-token", name: "Reroll", tokenType: "reroll", tier: "Encounter", category: "Encounter", price: 1000, description: "Reroll any wheel result." },
  2681 |     { id: "extra-encounter-token", name: "Extra Encounter Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 3500, description: "Use in Action Phase to roll an extra encounter." },
  2682 |     { id: "repel-token", name: "Repel", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 3500, description: "Remove one Pokemon for every 5 entries on an encounter wheel." },
  2683 |     { id: "quick-ball-token", name: "Quick Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 12500, description: "Release an encounter and steal another player's encounter." },
```

#### `roll an extra encounter` — line 2681

```text
  2679 |     { id: "revenge", name: "Revenge", tokenType: "protection", tier: "Protection", category: "Protection", price: 10000, description: "After a Battle Phase where an opponent cursed a Pokemon you brought, release 2 Pokemon from their brought team and destroy the held item." },
  2680 |     { id: "reroll-token", name: "Reroll", tokenType: "reroll", tier: "Encounter", category: "Encounter", price: 1000, description: "Reroll any wheel result." },
  2681 |     { id: "extra-encounter-token", name: "Extra Encounter Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 3500, description: "Use in Action Phase to roll an extra encounter." },
  2682 |     { id: "repel-token", name: "Repel", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 3500, description: "Remove one Pokemon for every 5 entries on an encounter wheel." },
  2683 |     { id: "quick-ball-token", name: "Quick Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 12500, description: "Release an encounter and steal another player's encounter." },
```

#### `encounter wheel` — line 2682

```text
  2680 |     { id: "reroll-token", name: "Reroll", tokenType: "reroll", tier: "Encounter", category: "Encounter", price: 1000, description: "Reroll any wheel result." },
  2681 |     { id: "extra-encounter-token", name: "Extra Encounter Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 3500, description: "Use in Action Phase to roll an extra encounter." },
  2682 |     { id: "repel-token", name: "Repel", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 3500, description: "Remove one Pokemon for every 5 entries on an encounter wheel." },
  2683 |     { id: "quick-ball-token", name: "Quick Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 12500, description: "Release an encounter and steal another player's encounter." },
  2684 |     { id: "dream-ball-token", name: "Dream Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 8000, description: "Before an encounter wheel, name almost any ability. The encounter has access to that ability." },
```

#### `steal another player's encounter` — line 2683

```text
  2681 |     { id: "extra-encounter-token", name: "Extra Encounter Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 3500, description: "Use in Action Phase to roll an extra encounter." },
  2682 |     { id: "repel-token", name: "Repel", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 3500, description: "Remove one Pokemon for every 5 entries on an encounter wheel." },
  2683 |     { id: "quick-ball-token", name: "Quick Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 12500, description: "Release an encounter and steal another player's encounter." },
  2684 |     { id: "dream-ball-token", name: "Dream Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 8000, description: "Before an encounter wheel, name almost any ability. The encounter has access to that ability." },
  2685 |     { id: "honey-token", name: "Honey", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 7000, description: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter." },
```

#### `Before an encounter wheel` — line 2684

```text
  2682 |     { id: "repel-token", name: "Repel", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 3500, description: "Remove one Pokemon for every 5 entries on an encounter wheel." },
  2683 |     { id: "quick-ball-token", name: "Quick Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 12500, description: "Release an encounter and steal another player's encounter." },
  2684 |     { id: "dream-ball-token", name: "Dream Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 8000, description: "Before an encounter wheel, name almost any ability. The encounter has access to that ability." },
  2685 |     { id: "honey-token", name: "Honey", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 7000, description: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter." },
  2686 |     { id: "master-ball-token", name: "Master Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 12500, description: "Choose your encounter. Other players cannot change it." },
```

#### `encounter wheel` — line 2684

```text
  2682 |     { id: "repel-token", name: "Repel", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 3500, description: "Remove one Pokemon for every 5 entries on an encounter wheel." },
  2683 |     { id: "quick-ball-token", name: "Quick Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 12500, description: "Release an encounter and steal another player's encounter." },
  2684 |     { id: "dream-ball-token", name: "Dream Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 8000, description: "Before an encounter wheel, name almost any ability. The encounter has access to that ability." },
  2685 |     { id: "honey-token", name: "Honey", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 7000, description: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter." },
  2686 |     { id: "master-ball-token", name: "Master Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 12500, description: "Choose your encounter. Other players cannot change it." },
```

#### `copy that encounter` — line 2685

```text
  2683 |     { id: "quick-ball-token", name: "Quick Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 12500, description: "Release an encounter and steal another player's encounter." },
  2684 |     { id: "dream-ball-token", name: "Dream Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 8000, description: "Before an encounter wheel, name almost any ability. The encounter has access to that ability." },
  2685 |     { id: "honey-token", name: "Honey", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 7000, description: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter." },
  2686 |     { id: "master-ball-token", name: "Master Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 12500, description: "Choose your encounter. Other players cannot change it." },
  2687 |     { id: "beast-ball-token", name: "Beast Ball", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 8000, description: "Before an encounter wheel, name any move. The encounter has access to that move." },
```

#### `Choose your encounter` — line 2686

```text
  2684 |     { id: "dream-ball-token", name: "Dream Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 8000, description: "Before an encounter wheel, name almost any ability. The encounter has access to that ability." },
  2685 |     { id: "honey-token", name: "Honey", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 7000, description: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter." },
  2686 |     { id: "master-ball-token", name: "Master Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 12500, description: "Choose your encounter. Other players cannot change it." },
  2687 |     { id: "beast-ball-token", name: "Beast Ball", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 8000, description: "Before an encounter wheel, name any move. The encounter has access to that move." },
  2688 |     { id: "move-deleter", legacyIds: ["move-deleter-curse"], name: "Move Deleter", tokenType: "control", tier: "Control", category: "Control", price: 1500, description: "Ban one move from being brought for 1 week. Cannot be used after team submission." },
```

#### `Before an encounter wheel` — line 2687

```text
  2685 |     { id: "honey-token", name: "Honey", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 7000, description: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter." },
  2686 |     { id: "master-ball-token", name: "Master Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 12500, description: "Choose your encounter. Other players cannot change it." },
  2687 |     { id: "beast-ball-token", name: "Beast Ball", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 8000, description: "Before an encounter wheel, name any move. The encounter has access to that move." },
  2688 |     { id: "move-deleter", legacyIds: ["move-deleter-curse"], name: "Move Deleter", tokenType: "control", tier: "Control", category: "Control", price: 1500, description: "Ban one move from being brought for 1 week. Cannot be used after team submission." },
  2689 |     { id: "toxic-curse", name: "Toxic Curse", tokenType: "curse", tier: "Curses", category: "Curses", price: 3000, description: "Force a Pokemon to carry a Toxic Orb for 2 gyms." },
```

#### `encounter wheel` — line 2687

```text
  2685 |     { id: "honey-token", name: "Honey", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 7000, description: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter." },
  2686 |     { id: "master-ball-token", name: "Master Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 12500, description: "Choose your encounter. Other players cannot change it." },
  2687 |     { id: "beast-ball-token", name: "Beast Ball", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 8000, description: "Before an encounter wheel, name any move. The encounter has access to that move." },
  2688 |     { id: "move-deleter", legacyIds: ["move-deleter-curse"], name: "Move Deleter", tokenType: "control", tier: "Control", category: "Control", price: 1500, description: "Ban one move from being brought for 1 week. Cannot be used after team submission." },
  2689 |     { id: "toxic-curse", name: "Toxic Curse", tokenType: "curse", tier: "Curses", category: "Curses", price: 3000, description: "Force a Pokemon to carry a Toxic Orb for 2 gyms." },
```

#### `Encounter Token` — line 2752

```text
  2750 |   "immunity": { names: ["Immunity", "Emergency Immunity Token"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Immunity", note: "Negates one effect/global effect." },
  2751 |   "revenge": { names: ["Revenge"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Revenge Pending", note: "Post-curse revenge marker." },
  2752 |   "extra-encounter-token": { names: ["Extra Encounter Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Extra Encounter Available", note: "Spend during Action Phase to roll an extra encounter." },
  2753 |   "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, choiceLabel: "Pokemon Name", effectType: "log", note: "Remove one Pokemon per 5 entries from Encounter Wheel. Wheel editor hook pending." },
  2754 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
```

#### `roll an extra encounter` — line 2752

```text
  2750 |   "immunity": { names: ["Immunity", "Emergency Immunity Token"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Immunity", note: "Negates one effect/global effect." },
  2751 |   "revenge": { names: ["Revenge"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Revenge Pending", note: "Post-curse revenge marker." },
  2752 |   "extra-encounter-token": { names: ["Extra Encounter Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Extra Encounter Available", note: "Spend during Action Phase to roll an extra encounter." },
  2753 |   "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, choiceLabel: "Pokemon Name", effectType: "log", note: "Remove one Pokemon per 5 entries from Encounter Wheel. Wheel editor hook pending." },
  2754 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
```

#### `Encounter Wheel` — line 2753

```text
  2751 |   "revenge": { names: ["Revenge"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Revenge Pending", note: "Post-curse revenge marker." },
  2752 |   "extra-encounter-token": { names: ["Extra Encounter Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Extra Encounter Available", note: "Spend during Action Phase to roll an extra encounter." },
  2753 |   "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, choiceLabel: "Pokemon Name", effectType: "log", note: "Remove one Pokemon per 5 entries from Encounter Wheel. Wheel editor hook pending." },
  2754 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
  2755 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
```

#### `Encounter Token` — line 2964

```text
  2962 |   "extra-encounter-token": Object.freeze({
  2963 |     id: "extra-encounter-token",
  2964 |     names: ["Extra Encounter Token", "Extra Encounter"],
  2965 |     objectType: TOKEN_OBJECT_TYPES.TOKEN,
  2966 |     family: ["encounter"],
```

#### `Encounter Token` — line 3430

```text
  3428 |     [TOKEN_TIMING_CATEGORIES.CONTROL]: "Control Token",
  3429 |     [TOKEN_TIMING_CATEGORIES.PROTECTION]: "Protection Token",
  3430 |     [TOKEN_TIMING_CATEGORIES.ENCOUNTER]: "Encounter Token",
  3431 |     [TOKEN_TIMING_CATEGORIES.CURSE]: "Curse Token",
  3432 |     [TOKEN_TIMING_CATEGORIES.MANUAL]: "Manual Token"
```

#### `Encounter Token` — line 5951

```text
  5949 |     [TOKEN_TIMING_CATEGORIES.CONTROL, "Control Token"],
  5950 |     [TOKEN_TIMING_CATEGORIES.PROTECTION, "Protection Token"],
  5951 |     [TOKEN_TIMING_CATEGORIES.ENCOUNTER, "Encounter Token"],
  5952 |     [TOKEN_TIMING_CATEGORIES.CURSE, "Curse Token"],
  5953 |   ].map(([value, label]) => `<option value="${escapeHtml(value)}" ${value === selected ? "selected" : ""}>${escapeHtml(label)}</option>`).join("");
```

#### `Encounter Token` — line 23568

```text
 23566 |         <article><strong>Control Token</strong><p>A proactive disruptive token such as Move Deleter, Restrict, Haze, Clear Smog, Arena Trap, or Imprison.</p></article>
 23567 |         <article><strong>Protection Token</strong><p>A response used during a Pending Event to protect, block, cleanse, prevent, or answer a threat.</p></article>
 23568 |         <article><strong>Encounter Token</strong><p>A token used during an encounter result window before the encounter is finalized.</p></article>
 23569 |         <article><strong>Curse Token</strong><p>A dangerous pending curse event. Curses are strongest during Sabotage, after teams are locked and before Team Preview.</p></article>
 23570 |       </div>
```

#### `Encounter Token` — line 27581

```text
 27579 |   }
 27580 |   if (!tokenNameIsReroll(draft.tokenName)) {
 27581 |     alert(String(draft.tokenName || "This Token") + " is not supported from the generic Pokemon result window. Route Encounter Tokens are used from Routes.");
 27582 |     return null;
 27583 |   }
```

#### `Encounter Tokens` — line 27581

```text
 27579 |   }
 27580 |   if (!tokenNameIsReroll(draft.tokenName)) {
 27581 |     alert(String(draft.tokenName || "This Token") + " is not supported from the generic Pokemon result window. Route Encounter Tokens are used from Routes.");
 27582 |     return null;
 27583 |   }
```

#### `Encounter Wheel` — line 38476

```text
 38474 | const bulletinQuestBank = Object.freeze({
 38475 |   easy: [
 38476 |     ["Pokemon Hunt", "Spin The Encounter Wheel Twice"],
 38477 |     ["Find An Item", "Visit The Department Store & Buy An Item"],
 38478 |     ["Ranger Check-In", "Visit The Ranger Base"],
```

#### `Encounter Token` — line 44023

```text
 44021 |     catalogId: V2_ROUTE_TOKEN_IDS.extraEncounter,
 44022 |     canonicalId: V2_ROUTE_TOKEN_IDS.extraEncounter,
 44023 |     name: "Extra Encounter Token",
 44024 |     type: "TOKEN",
 44025 |     tokenType: "encounter",
```

### Old Encounter token wording — `token-effect-contract.js`

#### `Encounter Token` — line 740

```text
   738 |
   739 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll an eligible unresolved Pokemon result.", legalPhases: [], timingWindows: [], isResponse: false, requiresPendingEvent: false, createsPendingEvent: false, opensResponseWindow: false, targetType: "manual", targetScope: "manual", resolverMode: resolverModes.HOST_CONFIRMED, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Reroll is resolved by the current contextual result UI (including Route and shared Random Pokemon results); generic Live Referee Encounter activation is intentionally blocked.", requiredChoices: [] }),
   740 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Gain one additional encounter opportunity on a currently legal Route.", legalPhases: [], timingWindows: [], isResponse: false, requiresPendingEvent: false, createsPendingEvent: false, opensResponseWindow: false, targetType: "manual", targetScope: "manual", resolverMode: resolverModes.HOST_CONFIRMED, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Extra Encounter is resolved only inside the current Route action through useV2ExtraEncounter; generic Token/Live Referee activation is intentionally blocked.", requiredChoices: [] }),
   741 |     encounter({ id: "repel-token", name: "Repel", rulesText: "On a Route, suppress five eligible residents of a chosen Battle Tier.", legalPhases: [], timingWindows: [], isResponse: false, requiresPendingEvent: false, createsPendingEvent: false, opensResponseWindow: false, targetType: "manual", targetScope: "manual", resolverMode: resolverModes.HOST_CONFIRMED, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Repel is resolved only inside the current Route action through applyV2RouteRepel; generic Token/Live Referee activation is intentionally blocked.", requiredChoices: [] }),
   742 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Exchange your encounter for another player's encounter.", legalPhases: [], timingWindows: [], isResponse: false, requiresPendingEvent: false, createsPendingEvent: false, opensResponseWindow: false, targetType: "manual", targetScope: "manual", resolverMode: resolverModes.HOST_CONFIRMED, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Quick Ball is retained as a Saga Token concept but is blocked until its current Route-era transfer rules are reviewed; the retired wheel-era transfer path no longer exists.", requiredChoices: [] }),
```

### Retired Encounter runtime identity — `app.js`

#### `"encounter-result"` — line 2722

```text
  2720 |     timing: "pending-result",
  2721 |     targetType: "pending-random-result",
  2722 |     validTargets: ["random-pokemon-result", "encounter-result", "quest-roll"],
  2723 |     excludedSources: ["game-corner-gamble-wheel"],
  2724 |     effect: "reroll"
```

#### `Encounter Wheel` — line 2753

```text
  2751 |   "revenge": { names: ["Revenge"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Revenge Pending", note: "Post-curse revenge marker." },
  2752 |   "extra-encounter-token": { names: ["Extra Encounter Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Extra Encounter Available", note: "Spend during Action Phase to roll an extra encounter." },
  2753 |   "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, choiceLabel: "Pokemon Name", effectType: "log", note: "Remove one Pokemon per 5 entries from Encounter Wheel. Wheel editor hook pending." },
  2754 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
  2755 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
```

#### `encounterSessionId` — line 4004

```text
  4002 |     tokenId: consumedToken.id || "",
  4003 |     tokenActivationId: activation.id,
  4004 |     encounterSessionId,
  4005 |     effectAuditId: resolutionAudit.id,
  4006 |     tokenConsumptionIds: consumed?.consumption ? [consumed.consumption.id] : [],
```

#### `encounterCopyRecords` — line 4335

```text
  4333 |     "effectOperations", "copiedActivations", "copiedTokenRelationships", "wheelSessions",
  4334 |     "randomPokemonSessions", "delayedEffects", "broughtTeamSnapshots", "postPayoutProcedures",
  4335 |     "encounterCopyRecords", "pokemonLog", "banlistHistory"
  4336 |   ];
  4337 |   collectionKeys.forEach((key) => {
```

#### `"encounter-result"` — line 27971

```text
 27969 |   const activity = prompt?.pendingEvent;
 27970 |   return Boolean(prompt?.resultSession
 27971 |     || activity?.type === "encounter-result"
 27972 |     || activity?.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT
 27973 |     || liveResultSessionForActivity(activity));
```

#### `Encounter Wheel` — line 38476

```text
 38474 | const bulletinQuestBank = Object.freeze({
 38475 |   easy: [
 38476 |     ["Pokemon Hunt", "Spin The Encounter Wheel Twice"],
 38477 |     ["Find An Item", "Visit The Department Store & Buy An Item"],
 38478 |     ["Ranger Check-In", "Visit The Ranger Base"],
```

#### `"encounter-result"` — line 40981

```text
 40979 |     item: summary, title: "Reroll replaced an encounter result", summary,
 40980 |     type: "encounter-reroll-token", categories: ["tokens", "pokemon", "encounter"],
 40981 |     tags: ["reroll-token", "encounter-result", resultKind || "result"],
 40982 |     playerIds: [actor.id, targetPlayerId].filter(Boolean), pokemonNames: [previousName, nextName].filter(Boolean),
 40983 |     tokenNames: [metadata.name || "Reroll"], linkedEventId: sourceEffectId,
```

### Retired Encounter runtime identity — `token-control-effects.js`

#### `encounterCopyRecords` — line 969

```text
   967 |       copiedTokenRelationships: state.copiedTokenRelationships || [],
   968 |       privateEffectRecords: state.privateEffectRecords || [],
   969 |       encounterCopyRecords: state.encounterCopyRecords || []
   970 |     });
   971 |   }
```

#### `encounterCopyRecords` — line 990

```text
   988 |     state.copiedTokenRelationships = clone(saved.copiedTokenRelationships || []);
   989 |     state.privateEffectRecords = clone(saved.privateEffectRecords || []);
   990 |     state.encounterCopyRecords = clone(saved.encounterCopyRecords || []);
   991 |     return state;
   992 |   }
```

### Shared/current result infrastructure — `app.js`

#### `"pokemon-result"` — line 642

```text
   640 |     responseTypes: ["immunity"]
   641 |   },
   642 |   "pokemon-result": {
   643 |     label: "Pokemon Result",
   644 |     responseTypes: ["encounter-reroll", "steal-encounter"]
```

#### `randomPokemonSessions` — line 2531

```text
  2529 |     wheelDrawerOpen: false,
  2530 |     skipWheelAnimation: false,
  2531 |     randomPokemonSessions: [],
  2532 |     pokemonFamilyTierCache: {},
  2533 |     pokemonSpriteVariants: {},
```

#### `liveResultSessionForActivity` — line 3477

```text
  3475 |   if (pendingEvent) {
  3476 |     windows.add(TOKEN_TIMING_WINDOWS.RESPONSE_WINDOW);
  3477 |     const resultSession = liveResultSessionForActivity?.(pendingEvent);
  3478 |     const pendingKind = `${pendingEvent.type || ""} ${pendingEvent.sourceType || ""}`;
  3479 |     if (resultSession || /pokemon-result/i.test(pendingKind)) {
```

#### `randomPokemonSessions` — line 3785

```text
  3783 |     previousPlayerNotifications: structuredClone(state.playerNotifications || []),
  3784 |     previousWheelSessions: structuredClone(state.wheelSessions || []),
  3785 |     previousRandomPokemonSessions: structuredClone(state.randomPokemonSessions || []),
  3786 |     previousInteractionEvents: structuredClone(state.interactionEvents || []),
  3787 |     previousTransactions: structuredClone(state.transactions || []),
```

#### `liveResultSessionForActivity` — line 4124

```text
  4122 |   }
  4123 |   if (pendingEvent) {
  4124 |     if ((metadata.timingWindows.includes(TOKEN_TIMING_WINDOWS.WHEEL_WINDOW) || metadata.timingCategory === TOKEN_TIMING_CATEGORIES.ENCOUNTER) && liveResultSessionForActivity(pendingEvent)) {
  4125 |       return recordPokemonResultTokenUse(draft);
  4126 |     }
```

#### `recordPokemonResultTokenUse` — line 4125

```text
  4123 |   if (pendingEvent) {
  4124 |     if ((metadata.timingWindows.includes(TOKEN_TIMING_WINDOWS.WHEEL_WINDOW) || metadata.timingCategory === TOKEN_TIMING_CATEGORIES.ENCOUNTER) && liveResultSessionForActivity(pendingEvent)) {
  4125 |       return recordPokemonResultTokenUse(draft);
  4126 |     }
  4127 |     if (metadata.activationPattern === TOKEN_ACTIVATION_PATTERNS.RESPONSE || metadata.timingCategory === TOKEN_TIMING_CATEGORIES.PROTECTION) {
```

#### `randomPokemonSessions` — line 4310

```text
  4308 |     copiedTokenRelationships: causalIdCollectionDelta(snapshot.previousCopiedTokenRelationships, state.copiedTokenRelationships),
  4309 |     wheelSessions: causalIdCollectionDelta(snapshot.previousWheelSessions, state.wheelSessions),
  4310 |     randomPokemonSessions: causalIdCollectionDelta(snapshot.previousRandomPokemonSessions, state.randomPokemonSessions),
  4311 |     delayedEffects: causalIdCollectionDelta(snapshot.previousDelayedEffects, state.delayedEffects),
  4312 |     broughtTeamSnapshots: causalIdCollectionDelta(snapshot.previousBroughtTeamSnapshots, state.broughtTeamSnapshots),
```

#### `randomPokemonSessions` — line 4334

```text
  4332 |     "pokemonRecords", "statuses", "activations", "consumptions", "transactions", "notifications",
  4333 |     "effectOperations", "copiedActivations", "copiedTokenRelationships", "wheelSessions",
  4334 |     "randomPokemonSessions", "delayedEffects", "broughtTeamSnapshots", "postPayoutProcedures",
  4335 |     "encounterCopyRecords", "pokemonLog", "banlistHistory"
  4336 |   ];
```

#### `randomPokemonSessions` — line 4440

```text
  4438 |   state.copiedTokenRelationships = applyCausalIdCollectionUndo(state.copiedTokenRelationships, undoData.copiedTokenRelationships);
  4439 |   state.wheelSessions = applyCausalIdCollectionUndo(state.wheelSessions, undoData.wheelSessions);
  4440 |   state.randomPokemonSessions = applyCausalIdCollectionUndo(state.randomPokemonSessions, undoData.randomPokemonSessions);
  4441 |   state.delayedEffects = applyCausalIdCollectionUndo(state.delayedEffects, undoData.delayedEffects);
  4442 |   state.broughtTeamSnapshots = applyCausalIdCollectionUndo(state.broughtTeamSnapshots, undoData.broughtTeamSnapshots);
```

#### `randomPokemonSessions` — line 4484

```text
  4482 |     }
  4483 |   }
  4484 |   if (state.selectedRandomPokemonSessionId && !(state.randomPokemonSessions || []).some((entry) => entry.id === state.selectedRandomPokemonSessionId)) {
  4485 |     state.selectedRandomPokemonSessionId = "";
  4486 |     state.randomPokemonDrawerOpen = false;
```

#### `randomPokemonSessions` — line 22047

```text
 22045 |   nextState.wheelDrawerOpen = Boolean(nextState.wheelDrawerOpen);
 22046 |   nextState.skipWheelAnimation = Boolean(nextState.skipWheelAnimation);
 22047 |   nextState.randomPokemonSessions ||= [];
 22048 |   nextState.pokemonFamilyTierCache ||= {};
 22049 |   pokemonFamilyTierCache = nextState.pokemonFamilyTierCache;
```

#### `randomPokemonSessions` — line 22060

```text
 22058 |     session.battlePhaseStayLength = Number(session.battlePhaseStayLength || 0);
 22059 |   });
 22060 |   nextState.randomPokemonSessions.forEach((session) => {
 22061 |     session.status = ["pending", "confirmed", "rerolled", "undone", "cancelled"].includes(session.status) ? session.status : "pending";
 22062 |     session.rerollCount = Number(session.rerollCount || 0);
```

#### `createPokemonResultTimingWindow` — line 23129

```text
 23127 | }
 23128 |
 23129 | function createPokemonResultTimingWindow(session, player) {
 23130 |   if (!session || session.interactionEventId || !player) return null;
 23131 |   const resultName = session.resultDisplayName || session.resultPokemonName || "Pokemon result";
```

#### `"pokemon-result"` — line 23133

```text
 23131 |   const resultName = session.resultDisplayName || session.resultPokemonName || "Pokemon result";
 23132 |   const activity = createInteractionEvent({
 23133 |     type: "pokemon-result",
 23134 |     title: `${player.name} rolled ${resultName}`,
 23135 |     message: `${session.sourceLabel || "Pokemon result"} is pending before it resolves.`,
```

#### `"pokemon-result"` — line 23185

```text
 23183 |   if (/class/i.test(activity.sourceType || "")) return "class-activation";
 23184 |   if (/perk/i.test(activity.sourceType || "")) return "perk-activation";
 23185 |   if (/pokemon-result|random-pokemon|encounter/i.test(`${activity.type || ""} ${activity.sourceType || ""}`)) return "pokemon-result";
 23186 |   return "";
 23187 | }
```

#### `liveResultSessionForActivity` — line 25485

```text
 25483 | }
 25484 |
 25485 | function liveResultSessionForActivity(activity, targetState = state) {
 25486 |   if (!activity) return null;
 25487 |   const sessionId = activity.payload?.randomPokemonSessionId
```

#### `"pokemon-result"` — line 25488

```text
 25486 |   if (!activity) return null;
 25487 |   const sessionId = activity.payload?.randomPokemonSessionId
 25488 |     || (activity.type === "pokemon-result" ? activity.sourceId : "");
 25489 |   if (!sessionId) return null;
 25490 |   return (targetState.randomPokemonSessions || []).find((session) => session.id === sessionId && session.status === "pending") || null;
```

#### `randomPokemonSessions` — line 25490

```text
 25488 |     || (activity.type === "pokemon-result" ? activity.sourceId : "");
 25489 |   if (!sessionId) return null;
 25490 |   return (targetState.randomPokemonSessions || []).find((session) => session.id === sessionId && session.status === "pending") || null;
 25491 | }
 25492 |
```

#### `liveResultSessionForActivity` — line 26134

```text
 26132 |   const flowMode = liveGameflowMode();
 26133 |   if (pendingEvent) {
 26134 |     const resultSession = liveResultSessionForActivity(pendingEvent, targetState);
 26135 |     const promptChain = interactionPromptChain(pendingEvent);
 26136 |     const currentPromptStep = currentInteractionPromptStep(pendingEvent);
```

#### `randomPokemonSessions` — line 26703

```text
 26701 |
 26702 | async function handleLiveTableAcceptResult(sessionId, activityId = "") {
 26703 |   const session = (state.randomPokemonSessions || []).find((entry) => entry.id === sessionId && entry.status === "pending");
 26704 |   if (!session) {
 26705 |     alert("No pending Pokemon result is available to accept.");
```

#### `randomPokemonSessions` — line 26715

```text
 26713 |
 26714 | async function handleLiveTableRerollResult(sessionId) {
 26715 |   const session = (state.randomPokemonSessions || []).find((entry) => entry.id === sessionId && entry.status === "pending");
 26716 |   if (!session) {
 26717 |     alert("No pending Pokemon result is available to reroll.");
```

#### `rerollRandomPokemonSession` — line 26720

```text
 26718 |     return;
 26719 |   }
 26720 |   await rerollRandomPokemonSession(session.id, { actorPlayerId: activePlayer().id });
 26721 |   saveState({ immediate: true });
 26722 |   render();
```

#### `liveResultSessionForActivity` — line 26745

```text
 26743 |     return;
 26744 |   }
 26745 |   const resultSession = liveResultSessionForActivity(activity);
 26746 |   if (resultSession) {
 26747 |     await handleLiveTableAcceptResult(resultSession.id, activity.id);
```

#### `liveResultSessionForActivity` — line 27566

```text
 27564 |   const activity = getCurrentPendingEvent();
 27565 |   if (!activity || activity.status !== "open") return null;
 27566 |   return liveResultSessionForActivity(activity) ? activity : null;
 27567 | }
 27568 |
```

#### `recordPokemonResultTokenUse` — line 27574

```text
 27572 | }
 27573 |
 27574 | async function recordPokemonResultTokenUse(draft) {
 27575 |   const activity = currentPokemonResultPendingActivity();
 27576 |   if (!activity) {
```

#### `liveResultSessionForActivity` — line 27584

```text
 27582 |     return null;
 27583 |   }
 27584 |   const session = liveResultSessionForActivity(activity);
 27585 |   if (!session) {
 27586 |     alert("The pending Pokemon result is no longer available.");
```

#### `rerollRandomPokemonSession` — line 27589

```text
 27587 |     return null;
 27588 |   }
 27589 |   await rerollRandomPokemonSession(session.id, { actorPlayerId: draft.actorPlayerId });
 27590 |   return activity;
 27591 | }
```

#### `liveResultSessionForActivity` — line 27973

```text
 27971 |     || activity?.type === "encounter-result"
 27972 |     || activity?.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT
 27973 |     || liveResultSessionForActivity(activity));
 27974 | }
 27975 |
```

#### `liveResultSessionForActivity` — line 28979

```text
 28977 |
 28978 | function liveRefereeCurrentEncounterLine(prompt) {
 28979 |   const session = prompt.resultSession || liveResultSessionForActivity(prompt.pendingEvent);
 28980 |   if (!session) return "";
 28981 |   const ownerId = session.resultOwnerPlayerId || session.ownerPlayerId || session.playerId || "";
```

#### `randomPokemonSessions` — line 40990

```text
 40988 |
 40989 | function pendingRandomPokemonSessions() {
 40990 |   state.randomPokemonSessions ||= [];
 40991 |   return state.randomPokemonSessions.filter((session) => session.status === "pending");
 40992 | }
```

#### `randomPokemonSessions` — line 40991

```text
 40989 | function pendingRandomPokemonSessions() {
 40990 |   state.randomPokemonSessions ||= [];
 40991 |   return state.randomPokemonSessions.filter((session) => session.status === "pending");
 40992 | }
 40993 |
```

#### `randomPokemonSessions` — line 40996

```text
 40994 | function pendingRerollTargets() {
 40995 |   const targets = [];
 40996 |   (state.randomPokemonSessions || [])
 40997 |     .filter((session) => session.status === "pending" && session.rerollable !== false && !session.interactionLocked)
 40998 |     .forEach((session) => {
```

#### `rerollRandomPokemonSession` — line 41057

```text
 41055 |   if (!actor) return;
 41056 |   const randomSessionId = String(targetResultId || "").replace(/^random-pokemon:/, "");
 41057 |   await rerollRandomPokemonSession(randomSessionId, { actorPlayerId: actor.id });
 41058 | }
 41059 |
```

#### `randomPokemonSessions` — line 41106

```text
 41104 |     confirmedAt: null
 41105 |   };
 41106 |   state.randomPokemonSessions ||= [];
 41107 |   state.randomPokemonSessions.unshift(session);
 41108 |   state.selectedRandomPokemonSessionId = session.id;
```

#### `randomPokemonSessions` — line 41107

```text
 41105 |   };
 41106 |   state.randomPokemonSessions ||= [];
 41107 |   state.randomPokemonSessions.unshift(session);
 41108 |   state.selectedRandomPokemonSessionId = session.id;
 41109 |   state.randomPokemonDrawerOpen = true;
```

#### `createPokemonResultTimingWindow` — line 41110

```text
 41108 |   state.selectedRandomPokemonSessionId = session.id;
 41109 |   state.randomPokemonDrawerOpen = true;
 41110 |   createPokemonResultTimingWindow(session, player);
 41111 |   saveState();
 41112 |   render();
```

#### `randomPokemonSessions` — line 41114

```text
 41112 |   render();
 41113 |   const sprite = await fetchStablePokemonSprite(result.displayName, session.chosenSpriteKey);
 41114 |   const latest = (state.randomPokemonSessions || []).find((entry) => entry.id === session.id);
 41115 |   if (latest && latest.status === "pending") {
 41116 |     latest.chosenSpriteKey = sprite.spriteKey || "";
```

#### `randomPokemonSessions` — line 41163

```text
 41161 | async function confirmRandomPokemonSession(sessionId = state.selectedRandomPokemonSessionId, { skipPendingGuard = false } = {}) {
 41162 |   if (!skipPendingGuard && !guardPendingEventBeforeAction("Confirm Pokemon Result", () => confirmRandomPokemonSession(sessionId, { skipPendingGuard: true }))) return;
 41163 |   const randomSession = (state.randomPokemonSessions || []).find((entry) => entry.id === sessionId);
 41164 |   if (!randomSession || randomSession.status !== "pending") return;
 41165 |   const player = state.players.find((entry) => entry.id === (randomSession.resultOwnerPlayerId || randomSession.ownerPlayerId || randomSession.playerId));
```

#### `rerollRandomPokemonSession` — line 41262

```text
 41260 | }
 41261 |
 41262 | async function rerollRandomPokemonSession(sessionId = state.selectedRandomPokemonSessionId, options = {}) {
 41263 |   const randomSession = (state.randomPokemonSessions || []).find((entry) => entry.id === sessionId);
 41264 |   if (!randomSession || randomSession.status !== "pending" || randomSession.rerollable === false || randomSession.interactionLocked) return;
```

#### `randomPokemonSessions` — line 41263

```text
 41261 |
 41262 | async function rerollRandomPokemonSession(sessionId = state.selectedRandomPokemonSessionId, options = {}) {
 41263 |   const randomSession = (state.randomPokemonSessions || []).find((entry) => entry.id === sessionId);
 41264 |   if (!randomSession || randomSession.status !== "pending" || randomSession.rerollable === false || randomSession.interactionLocked) return;
 41265 |   const ownerPlayerId = randomSession.resultOwnerPlayerId || randomSession.ownerPlayerId || randomSession.playerId;
```

#### `randomPokemonSessions` — line 41376

```text
 41374 |   renderRandomPokemonPanel();
 41375 |   const sprite = await fetchStablePokemonSprite(nextName, randomSession.chosenSpriteKey);
 41376 |   const latest = (state.randomPokemonSessions || []).find((entry) => entry.id === randomSession.id);
 41377 |   if (latest && latest.status === "pending") {
 41378 |     latest.chosenSpriteKey = sprite.spriteKey || "";
```

#### `randomPokemonSessions` — line 41402

```text
 41400 |
 41401 | function cancelRandomPokemonSession(sessionId = state.selectedRandomPokemonSessionId) {
 41402 |   const randomSession = (state.randomPokemonSessions || []).find((entry) => entry.id === sessionId);
 41403 |   if (!randomSession || randomSession.status !== "pending") return;
 41404 |   randomSession.status = "cancelled";
```

#### `randomPokemonSessions` — line 46781

```text
 46779 |     "playerNotifications",
 46780 |     "lingeringStatuses",
 46781 |     "randomPokemonSessions",
 46782 |     "wheelSessions"
 46783 |   ].forEach((key) => markSandboxCollectionChanges(candidate, baseline, key, origin));
```

#### `randomPokemonSessions` — line 59221

```text
 59219 |       }
 59220 |     });
 59221 |   (state.randomPokemonSessions || [])
 59222 |     .filter((session) => sessionIds.has(session.gameCornerSessionId) || session.actionVisitId === undoData.visitId)
 59223 |     .forEach((session) => {
```

#### `randomPokemonSessions` — line 59287

```text
 59285 |   if (undoData.previousPlayerNotifications) state.playerNotifications = structuredClone(undoData.previousPlayerNotifications);
 59286 |   if (undoData.previousWheelSessions) state.wheelSessions = structuredClone(undoData.previousWheelSessions);
 59287 |   if (undoData.previousRandomPokemonSessions) state.randomPokemonSessions = structuredClone(undoData.previousRandomPokemonSessions);
 59288 |   if (undoData.previousInteractionEvents) state.interactionEvents = structuredClone(undoData.previousInteractionEvents).map((activity) => normalizeInteractionActivity(activity, state));
 59289 |   if (undoData.previousTransactions) state.transactions = structuredClone(undoData.previousTransactions);
```

#### `rerollRandomPokemonSession` — line 61644

```text
 61642 |     if (randomRerollButton && els.actionLocationMeta.contains(randomRerollButton)) {
 61643 |       event.preventDefault();
 61644 |       if (!randomRerollButton.disabled) rerollRandomPokemonSession(randomRerollButton.dataset.rerollRandomPokemon);
 61645 |       return;
 61646 |     }
```

#### `rerollRandomPokemonSession` — line 61685

```text
 61683 |     const rerollButton = event.target.closest("[data-reroll-random-pokemon]");
 61684 |     if (rerollButton) {
 61685 |       rerollRandomPokemonSession(rerollButton.dataset.rerollRandomPokemon);
 61686 |     }
 61687 |   });
```

### Shared/current result infrastructure — `server.js`

#### `randomPokemonSessions` — line 1293

```text
  1291 |     previousTokenConsumptions: cloneJson(state.tokenConsumptions || []),
  1292 |     previousPlayerNotifications: cloneJson(state.playerNotifications || []),
  1293 |     previousRandomPokemonSessions: cloneJson(state.randomPokemonSessions || []),
  1294 |     previousInteractionEvents: cloneJson((state.interactionEvents || []).filter((entry) => entry.id !== excludedActivityId)),
  1295 |     previousTransactions: cloneJson(state.transactions || []),
```
