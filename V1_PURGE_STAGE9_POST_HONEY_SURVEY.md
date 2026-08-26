# V1 Purge Stage 9 — Post-Honey Production Survey

Generated from `6cf91a0a23ffb812963895e9de56a0bdf1ef20d9`.

Fresh survey after Stage 8E. It covers production runtime, token contracts/control effects, and executable QA wiring only.

## Summary

| Group | File | Marker | Count | Lines |
|---|---|---|---:|---|
| Current Route token runtime | `app.js` | `V2_ROUTE_TOKEN_IDS` | 20 | 42476, 42483, 42484, 42485, 42486, 43826, 43859, 43891, 44060, 44061, 44062, 44114, 44163, 44202, 44264, 44770, 44790, 44808, 44819, 45009 |
| Current Route token runtime | `app.js` | `useV2RouteRerollToken` | 2 | 44767, 61558 |
| Current Route token runtime | `app.js` | `useV2ExtraEncounter` | 2 | 44787, 61576 |
| Current Route token runtime | `app.js` | `applyV2RouteRepel` | 2 | 44805, 61622 |
| Current Route token runtime | `app.js` | `useV2MasterBallOnOpportunity` | 2 | 44816, 61625 |
| Encounter contract/resolver residue | `app.js` | `encounterResult` | 16 | 634, 703, 721, 831, 3489, 3526, 42864, 42890, 42914, 42986, 43702, 43787, 44285, 46595, 46916, 46957 |
| Encounter contract/resolver residue | `app.js` | `Hidden Grotto` | 4 | 1150, 1294, 2194, 38542 |
| Encounter contract/resolver residue | `app.js` | `resolverId: "extraEncounter"` | 1 | 2993 |
| Encounter contract/resolver residue | `app.js` | `resolverId: "reroll"` | 1 | 3137 |
| Encounter contract/resolver residue | `app.js` | `encounterBeforeRoll` | 2 | 3492, 3525 |
| Encounter contract/resolver residue | `index.html` | `encounterResult` | 1 | 1719 |
| Encounter contract/resolver residue | `token-effect-contract.js` | `encounterBeforeRoll` | 2 | 355, 407 |
| Encounter contract/resolver residue | `token-effect-contract.js` | `encounterResult` | 12 | 355, 369, 408, 765, 767, 768, 769, 770, 771, 772, 1193, 1194 |
| Encounter contract/resolver residue | `token-effect-contract.js` | `"encounterCopy"` | 3 | 380, 770, 818 |
| Encounter contract/resolver residue | `token-effect-contract.js` | `"encounterGrant"` | 3 | 380, 769, 772 |
| Encounter contract/resolver residue | `token-effect-contract.js` | `"encounterTransfer"` | 2 | 380, 768 |
| Encounter contract/resolver residue | `token-effect-contract.js` | `"encounterWheelEdit"` | 2 | 380, 767 |
| Encounter contract/resolver residue | `token-effect-contract.js` | `"encounterChoose"` | 2 | 381, 771 |
| Encounter contract/resolver residue | `token-effect-contract.js` | `resolverId: "reroll"` | 1 | 765 |
| Encounter contract/resolver residue | `token-effect-contract.js` | `resolverId: "extraEncounter"` | 1 | 766 |
| Encounter contract/resolver residue | `token-effect-contract.js` | `resolverId: "encounterWheelEdit"` | 1 | 767 |
| Encounter contract/resolver residue | `token-effect-contract.js` | `resolverId: "encounterTransfer"` | 1 | 768 |
| Encounter contract/resolver residue | `token-effect-contract.js` | `resolverId: "encounterGrant"` | 2 | 769, 772 |
| Encounter contract/resolver residue | `token-effect-contract.js` | `currentActionPhase` | 3 | 770, 822, 1198 |
| Encounter contract/resolver residue | `token-effect-contract.js` | `Hidden Grotto` | 1 | 770 |
| Encounter contract/resolver residue | `token-effect-contract.js` | `resolverId: "encounterCopy"` | 2 | 770, 818 |
| Encounter contract/resolver residue | `token-effect-contract.js` | `resolverId: "encounterChoose"` | 1 | 771 |
| Honey retired bridge | `scripts/test-token-sandbox.js` | `copiedFromRandomPokemonSessionId` | 1 | 1128 |
| Honey retired bridge | `token-control-effects.js` | `copiedFromRandomPokemonSessionId` | 2 | 2347, 2374 |
| Honey retired bridge | `token-control-effects.js` | `Honey copied Encounter` | 2 | 2347, 2368 |
| Legacy Encounter Live Referee channel | `app.js` | `"encounter-reroll"` | 7 | 636, 648, 652, 663, 664, 23159, 41372 |
| Legacy Encounter Live Referee channel | `app.js` | `"steal-encounter"` | 6 | 636, 648, 652, 669, 670, 23159 |
| Legacy Encounter Live Referee channel | `app.js` | `"encounter-result"` | 9 | 650, 2731, 23152, 25519, 25532, 26165, 27594, 28011, 41021 |
| Legacy Encounter Live Referee channel | `app.js` | `TOKEN_TIMING_CATEGORIES.ENCOUNTER` | 15 | 864, 865, 2722, 2976, 3121, 3143, 3146, 3233, 3439, 4139, 5968, 25519, 28000, 28291, 47499 |
| Legacy Encounter Live Referee channel | `app.js` | `TOKEN_USE_TYPES.ENCOUNTER_MODIFIER` | 2 | 866, 2723 |
| Legacy Encounter Live Referee channel | `app.js` | `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` | 12 | 869, 2726, 25519, 25532, 26403, 26414, 27138, 27139, 27594, 28012, 46958, 47495 |
| Legacy Encounter Live Referee channel | `app.js` | `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_TOKEN` | 1 | 871 |
| Legacy Encounter Live Referee channel | `app.js` | `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` | 14 | 2761, 2762, 2763, 2764, 2765, 2766, 2767, 3126, 3198, 3199, 3233, 3247, 3265, 29401 |
| Legacy Encounter Live Referee channel | `app.js` | `EFFECT_TARGET_CATEGORIES.ENCOUNTER_RESULT` | 1 | 3265 |
| Legacy Encounter Live Referee channel | `app.js` | `recordEncounterTokenUse` | 2 | 4140, 27604 |
| Legacy Encounter Live Referee channel | `app.js` | `createPokemonResultTimingWindow` | 2 | 23147, 41150 |
| Legacy Encounter Live Referee channel | `app.js` | `currentEncounterPendingActivity` | 2 | 27590, 27605 |
| Legacy Encounter Live Referee channel | `app.js` | `liveRefereePromptIsEncounterResult` | 2 | 28008, 28038 |
| Retired Action/Encounter runtime | `app.js` | `Encounter Wheel` | 2 | 2762, 38516 |
| Retired Action/Encounter runtime | `app.js` | `sourceType === "encounter"` | 3 | 23150, 26165, 27595 |
| Retired Action/Encounter runtime | `scripts/test-token-sandbox.js` | `Encounter Wheel` | 1 | 1076 |
| Retired Action/Encounter runtime | `scripts/test-token-sandbox.js` | `sourceType: "encounter"` | 2 | 1076, 1077 |
| Retired Action/Encounter runtime | `token-control-effects.js` | `sourceType === "encounter"` | 1 | 2344 |
| Retired Action/Encounter runtime | `token-control-effects.js` | `sourceType: "encounter"` | 1 | 2368 |
| Retired Action/Encounter runtime | `token-effect-contract.js` | `encounter-token-runtime` | 4 | 110, 262, 332, 339 |
| Retired Action/Encounter runtime | `token-effect-contract.js` | `Encounter Wheel` | 1 | 766 |
| V1-named current infrastructure | `app.js` | `TOKEN_TIMING_ENGINE_V1_DEFINITIONS` | 2 | 2970, 3154 |

## Detailed contexts

### Current Route token runtime — `app.js`

#### `V2_ROUTE_TOKEN_IDS` — line 42476

```text
 42474 |   Object.freeze({ id: "plus-2", label: "+2 tiers", weight: 5, offset: 2 })
 42475 | ]);
 42476 | const V2_ROUTE_TOKEN_IDS = Object.freeze({
 42477 |   extraEncounter: "extra-encounter-token",
 42478 |   reroll: "reroll-token",
```

#### `V2_ROUTE_TOKEN_IDS` — line 42483

```text
 42481 | });
 42482 | const V2_ROUTE_TOKEN_NAMES = Object.freeze({
 42483 |   [V2_ROUTE_TOKEN_IDS.extraEncounter]: ["extra encounter token", "extra encounter"],
 42484 |   [V2_ROUTE_TOKEN_IDS.reroll]: ["reroll token", "reroll"],
 42485 |   [V2_ROUTE_TOKEN_IDS.repel]: ["repel token", "repel"],
```

#### `V2_ROUTE_TOKEN_IDS` — line 42484

```text
 42482 | const V2_ROUTE_TOKEN_NAMES = Object.freeze({
 42483 |   [V2_ROUTE_TOKEN_IDS.extraEncounter]: ["extra encounter token", "extra encounter"],
 42484 |   [V2_ROUTE_TOKEN_IDS.reroll]: ["reroll token", "reroll"],
 42485 |   [V2_ROUTE_TOKEN_IDS.repel]: ["repel token", "repel"],
 42486 |   [V2_ROUTE_TOKEN_IDS.masterBall]: ["master ball token", "master ball"]
```

#### `V2_ROUTE_TOKEN_IDS` — line 42485

```text
 42483 |   [V2_ROUTE_TOKEN_IDS.extraEncounter]: ["extra encounter token", "extra encounter"],
 42484 |   [V2_ROUTE_TOKEN_IDS.reroll]: ["reroll token", "reroll"],
 42485 |   [V2_ROUTE_TOKEN_IDS.repel]: ["repel token", "repel"],
 42486 |   [V2_ROUTE_TOKEN_IDS.masterBall]: ["master ball token", "master ball"]
 42487 | });
```

#### `V2_ROUTE_TOKEN_IDS` — line 42486

```text
 42484 |   [V2_ROUTE_TOKEN_IDS.reroll]: ["reroll token", "reroll"],
 42485 |   [V2_ROUTE_TOKEN_IDS.repel]: ["repel token", "repel"],
 42486 |   [V2_ROUTE_TOKEN_IDS.masterBall]: ["master ball token", "master ball"]
 42487 | });
 42488 |
```

#### `V2_ROUTE_TOKEN_IDS` — line 43826

```text
 43824 |   const unresolved = Boolean(result && result.status === "unresolved");
 43825 |   const routeView = route ? getRouteViewForPlayer(routeState, route.routeNumber, playerId) : null;
 43826 |   const rerollTokens = v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.reroll);
 43827 |   const duplicate = unresolved && v2ResultIsDuplicateForPlayer(result, playerId);
 43828 |   return {
```

#### `V2_ROUTE_TOKEN_IDS` — line 43859

```text
 43857 |   const player = state.players.find((entry) => entry.id === playerId);
 43858 |   const { route, opportunity } = v2FindOpportunity(routeState, opportunityId);
 43859 |   const tokens = v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.masterBall);
 43860 |   const view = route ? getRouteViewForPlayer(routeState, route.routeNumber, playerId) : null;
 43861 |   const eligibleResidents = view?.masterBallEligibleResidents || [];
```

#### `V2_ROUTE_TOKEN_IDS` — line 43891

```text
 43889 |   const route = v2FindRoute(routeState, routeNumber);
 43890 |   const player = state.players.find((entry) => entry.id === playerId);
 43891 |   const repelTokens = v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.repel);
 43892 |   const activeSuppressed = new Set((route?.suppressions || [])
 43893 |     .filter((entry) => entry.status !== "expired" && entry.status !== "removed")
```

#### `V2_ROUTE_TOKEN_IDS` — line 44060

```text
 44058 |   const item = {
 44059 |     purchaseId,
 44060 |     id: createInventoryEntryId(V2_ROUTE_TOKEN_IDS.extraEncounter),
 44061 |     catalogId: V2_ROUTE_TOKEN_IDS.extraEncounter,
 44062 |     canonicalId: V2_ROUTE_TOKEN_IDS.extraEncounter,
```

#### `V2_ROUTE_TOKEN_IDS` — line 44061

```text
 44059 |     purchaseId,
 44060 |     id: createInventoryEntryId(V2_ROUTE_TOKEN_IDS.extraEncounter),
 44061 |     catalogId: V2_ROUTE_TOKEN_IDS.extraEncounter,
 44062 |     canonicalId: V2_ROUTE_TOKEN_IDS.extraEncounter,
 44063 |     name: "Extra Encounter Token",
```

#### `V2_ROUTE_TOKEN_IDS` — line 44062

```text
 44060 |     id: createInventoryEntryId(V2_ROUTE_TOKEN_IDS.extraEncounter),
 44061 |     catalogId: V2_ROUTE_TOKEN_IDS.extraEncounter,
 44062 |     canonicalId: V2_ROUTE_TOKEN_IDS.extraEncounter,
 44063 |     name: "Extra Encounter Token",
 44064 |     type: "TOKEN",
```

#### `V2_ROUTE_TOKEN_IDS` — line 44114

```text
 44112 |     throw new Error(`No eligible residents remain on Route ${route.routeNumber} for ${player.name}.`);
 44113 |   }
 44114 |   const token = v2ConsumeExactRouteToken(player, V2_ROUTE_TOKEN_IDS.extraEncounter, tokenInventoryId);
 44115 |   const operationId = v2NextEffectOperationId(state.series, "v2-extra-encounter");
 44116 |   const { opportunity } = v2CreateRouteEncounterOpportunity({
```

#### `V2_ROUTE_TOKEN_IDS` — line 44163

```text
 44161 |   const existingTokenOperation = v2FindRouteEffectOperationByToken(state.series, "reroll-token", tokenInventoryId, player.id);
 44162 |   if (existingTokenOperation?.resultId === result?.resultId) return result;
 44163 |   const token = v2ConsumeExactRouteToken(player, V2_ROUTE_TOKEN_IDS.reroll, tokenInventoryId);
 44164 |   const rerolled = v2RerollRouteResult(result, player.id, { kind: "reroll-token", reason: "reroll-token", tokenInventoryId: token.id }, { token });
 44165 |   const operationId = v2NextEffectOperationId(state.series, "v2-reroll-token");
```

#### `V2_ROUTE_TOKEN_IDS` — line 44202

```text
 44200 |   const existingTokenOperation = v2FindRouteEffectOperationByToken(state.series, "repel-token", tokenInventoryId, playerId);
 44201 |   if (existingTokenOperation?.suppressionId) return (route.suppressions || []).find((entry) => entry.suppressionId === existingTokenOperation.suppressionId) || null;
 44202 |   const token = v2ConsumeExactRouteToken(player, V2_ROUTE_TOKEN_IDS.repel, tokenInventoryId);
 44203 |   const rng = v2CreateRng(`${routeState.seed}:${route.routeId}:repel:${normalizedTier}:${routeState.revision}`);
 44204 |   const pool = [...candidates];
```

#### `V2_ROUTE_TOKEN_IDS` — line 44264

```text
 44262 |     throw new Error("Master Ball can only select a resident revealed to that player on that Route.");
 44263 |   }
 44264 |   const token = v2ConsumeExactRouteToken(player, V2_ROUTE_TOKEN_IDS.masterBall, tokenInventoryId);
 44265 |   const resultId = v2NextCounterId(routeState, "result", "route-result");
 44266 |   const result = {
```

#### `useV2RouteRerollToken` — line 44767

```text
 44765 | }
 44766 |
 44767 | function useV2RouteRerollToken(actionId, tokenInventoryId = "") {
 44768 |   try {
 44769 |     const player = activePlayer();
```

#### `V2_ROUTE_TOKEN_IDS` — line 44770

```text
 44768 |   try {
 44769 |     const player = activePlayer();
 44770 |     const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.reroll)[0]?.id || "";
 44771 |     const result = v2UseRerollTokenOnAction(actionId, tokenId, { actingPlayerId: player.id });
 44772 |     v2PersistRenderAndPublishRouteActivity({ stage: "rerolled", actorPlayerId: player.id, seriesId: state.series, routeNumber: result.routeNumber });
```

#### `useV2ExtraEncounter` — line 44787

```text
 44785 | }
 44786 |
 44787 | function useV2ExtraEncounter(routeNumber, tokenInventoryId = "") {
 44788 |   try {
 44789 |     const player = activePlayer();
```

#### `V2_ROUTE_TOKEN_IDS` — line 44790

```text
 44788 |   try {
 44789 |     const player = activePlayer();
 44790 |     const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.extraEncounter)[0]?.id || "";
 44791 |     const operation = v2UseExtraEncounter(player.id, routeNumber, tokenId);
 44792 |     const workspace = v2RouteWorkspaceState(state.series);
```

#### `applyV2RouteRepel` — line 44805

```text
 44803 | }
 44804 |
 44805 | function applyV2RouteRepel(routeNumber, battleTierId, tokenInventoryId = "") {
 44806 |   try {
 44807 |     const player = activePlayer();
```

#### `V2_ROUTE_TOKEN_IDS` — line 44808

```text
 44806 |   try {
 44807 |     const player = activePlayer();
 44808 |     const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.repel)[0]?.id || "";
 44809 |     v2ApplyRepelToRoute(player.id, routeNumber, battleTierId, tokenId);
 44810 |     v2PersistAndRender();
```

#### `useV2MasterBallOnOpportunity` — line 44816

```text
 44814 | }
 44815 |
 44816 | function useV2MasterBallOnOpportunity(opportunityId, residentId, tokenInventoryId = "") {
 44817 |   try {
 44818 |     const player = activePlayer();
```

#### `V2_ROUTE_TOKEN_IDS` — line 44819

```text
 44817 |   try {
 44818 |     const player = activePlayer();
 44819 |     const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.masterBall)[0]?.id || "";
 44820 |     const operation = v2UseMasterBallOnOpportunity(player.id, opportunityId, residentId, tokenId);
 44821 |     const workspace = v2RouteWorkspaceState(state.series);
```

#### `V2_ROUTE_TOKEN_IDS` — line 45009

```text
 45007 |   const workspace = v2RouteWorkspaceState(routeState.seriesId || state.series);
 45008 |   const pendingOpportunity = v2RoutePendingOpportunityForPlayer(routeState, route.routeNumber, playerId, workspace.activeOpportunityId);
 45009 |   const extraTokens = v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.extraEncounter);
 45010 |   const extraEligible = v2EligibleResidents(route, [], { routeState, playerId });
 45011 |   const progressionLegal = route.routeNumber <= v2CurrentProgressionRoute();
```

#### `useV2RouteRerollToken` — line 61558

```text
 61556 |     if (routeRerollTokenButton && els.actionLocationBoard.contains(routeRerollTokenButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 61557 |       event.preventDefault();
 61558 |       useV2RouteRerollToken(routeRerollTokenButton.dataset.v2RouteRerollToken, routeRerollTokenButton.dataset.v2TokenId || "");
 61559 |       return;
 61560 |     }
```

#### `useV2ExtraEncounter` — line 61576

```text
 61574 |     if (railExtraUseButton && els.actionLocationBoard.contains(railExtraUseButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 61575 |       event.preventDefault();
 61576 |       if (!railExtraUseButton.disabled) useV2ExtraEncounter(Number(railExtraUseButton.dataset.v2RailExtraUse || 0), railExtraUseButton.dataset.v2TokenId || "");
 61577 |       return;
 61578 |     }
```

#### `applyV2RouteRepel` — line 61622

```text
 61620 |       if (action === "repel") {
 61621 |         const tier = card?.querySelector('[data-v2-route-effect-field="repelTier"]')?.value || "";
 61622 |         applyV2RouteRepel(Number(routeEffectApply.dataset.v2RouteNumber || 0), tier, routeEffectApply.dataset.v2TokenId || "");
 61623 |       } else if (action === "master-ball") {
 61624 |         const residentId = card?.querySelector('[data-v2-route-effect-field="masterResident"]')?.value || "";
```

#### `useV2MasterBallOnOpportunity` — line 61625

```text
 61623 |       } else if (action === "master-ball") {
 61624 |         const residentId = card?.querySelector('[data-v2-route-effect-field="masterResident"]')?.value || "";
 61625 |         if (residentId) useV2MasterBallOnOpportunity(routeEffectApply.dataset.v2OpportunityId || "", residentId, routeEffectApply.dataset.v2TokenId || "");
 61626 |       }
 61627 |       return;
```

### Encounter contract/resolver residue — `app.js`

#### `encounterResult` — line 634

```text
   632 |     responseTypes: ["immunity"]
   633 |   },
   634 |   encounterResult: {
   635 |     label: "Encounter Result",
   636 |     responseTypes: ["encounter-reroll", "steal-encounter"]
```

#### `encounterResult` — line 703

```text
   701 |   TEAM: "team",
   702 |   PARTY_ROSTER: "partyRoster",
   703 |   ENCOUNTER_RESULT: "encounterResult",
   704 |   TOKEN: "token",
   705 |   ITEM: "item",
```

#### `encounterResult` — line 721

```text
   719 |   PLAYER: "player",
   720 |   TEAM: "team",
   721 |   ENCOUNTER_RESULT: "encounterResult",
   722 |   RESOURCE: "resource",
   723 |   TABLE: "table",
```

#### `encounterResult` — line 831

```text
   829 |
   830 | const TOKEN_PENDING_EVENT_TYPES = Object.freeze({
   831 |   ENCOUNTER_RESULT: "encounterResult",
   832 |   CONTROL_TOKEN: "controlToken",
   833 |   PROTECTION_RESPONSE: "protectionResponse",
```

#### `Hidden Grotto` — line 1150

```text
  1148 |     "name": "Grotto Regular",
  1149 |     "tier": "C",
  1150 |     "description": "Hidden Grotto Encounters Cost 750 Less For You.",
  1151 |     "isConsumable": false,
  1152 |     "uses": null
```

#### `Hidden Grotto` — line 1294

```text
  1292 |     "name": "Encounter Pro",
  1293 |     "tier": "A",
  1294 |     "description": "Once Per Action Phase Get A Free Hidden Grotto Encounter.",
  1295 |     "isConsumable": false,
  1296 |     "uses": null
```

#### `Hidden Grotto` — line 2194

```text
  2192 |     "name": "Grotto Pass",
  2193 |     "tier": "C",
  2194 |     "description": "Visit The Hidden Grotto Without Using An Action.",
  2195 |     "isConsumable": true,
  2196 |     "uses": 2
```

#### `resolverId: "extraEncounter"` — line 2993

```text
  2991 |     visibility: "public",
  2992 |     logType: "tokenUsed",
  2993 |     resolverId: "extraEncounter"
  2994 |   }),
  2995 |   "restrict-token": Object.freeze({
```

#### `resolverId: "reroll"` — line 3137

```text
  3135 |     visibility: "public",
  3136 |     logType: "tokenUsed",
  3137 |     resolverId: "reroll"
  3138 |   })
  3139 | });
```

#### `encounterResult` — line 3489

```text
  3487 |     const pendingKind = `${pendingEvent.type || ""} ${pendingEvent.sourceType || ""}`;
  3488 |     if (resultSession || /encounter-result|pokemon-result/i.test(pendingKind)) {
  3489 |       windows.add("encounterResult");
  3490 |       windows.add(TOKEN_TIMING_WINDOWS.WHEEL_WINDOW);
  3491 |     } else if (pendingEvent.payload?.encounterStage === "beforeRoll" || /encounter-before|wheel-before/i.test(pendingKind)) {
```

#### `encounterBeforeRoll` — line 3492

```text
  3490 |       windows.add(TOKEN_TIMING_WINDOWS.WHEEL_WINDOW);
  3491 |     } else if (pendingEvent.payload?.encounterStage === "beforeRoll" || /encounter-before|wheel-before/i.test(pendingKind)) {
  3492 |       windows.add("encounterBeforeRoll");
  3493 |     } else if (/wheel/i.test(pendingKind)) {
  3494 |       windows.add(TOKEN_TIMING_WINDOWS.WHEEL_WINDOW);
```

#### `encounterBeforeRoll` — line 3525

```text
  3523 |   if (context.teamBuilding) windows.add(TOKEN_TIMING_WINDOWS.TEAM_BUILDING);
  3524 |   if (context.battlePrep) windows.add(TOKEN_TIMING_WINDOWS.BATTLE_PREP);
  3525 |   if (context.encounterBeforeRoll) windows.add("encounterBeforeRoll");
  3526 |   if (context.encounterResult) windows.add("encounterResult");
  3527 |   return [...windows];
```

#### `encounterResult` — line 3526

```text
  3524 |   if (context.battlePrep) windows.add(TOKEN_TIMING_WINDOWS.BATTLE_PREP);
  3525 |   if (context.encounterBeforeRoll) windows.add("encounterBeforeRoll");
  3526 |   if (context.encounterResult) windows.add("encounterResult");
  3527 |   return [...windows];
  3528 | }
```

#### `Hidden Grotto` — line 38542

```text
 38540 |     ["Off My Meds", "Visit The Pokemon Center & Use A Center's Paid Option."],
 38541 |     ["Prize Pokemon", "Win At The Game Corner Or Use A Game Corner Ticket."],
 38542 |     ["Tracking The Beast", "Catch A Pokemon From The Hidden Grotto"],
 38543 |     ["The Dragon's Discount", "Leave A Pokemon In The Dragons Den"],
 38544 |     ["Supply Run", "Spend 9K"],
```

#### `encounterResult` — line 42864

```text
 42862 |       suppressions: [],
 42863 |       pendingEncounterOpportunities: [],
 42864 |       encounterResults: [],
 42865 |       finalizedAcquisitions: []
 42866 |     });
```

#### `encounterResult` — line 42890

```text
 42888 |   next.counters ||= {};
 42889 |   next.counters.opportunity = Math.max(Number(next.counters.opportunity || 0), ...(next.routes || []).flatMap((route) => (route.pendingEncounterOpportunities || []).map((entry) => v2CounterFromId(entry.opportunityId))), 0);
 42890 |   next.counters.result = Math.max(Number(next.counters.result || 0), ...(next.routes || []).flatMap((route) => (route.encounterResults || []).map((entry) => v2CounterFromId(entry.resultId))), 0);
 42891 |   next.counters.acquisition = Math.max(Number(next.counters.acquisition || 0), ...(next.routes || []).flatMap((route) => (route.finalizedAcquisitions || []).map((entry) => v2CounterFromId(entry.acquisitionId))), 0);
 42892 |   next.counters.suppression = Number(next.counters.suppression || 0);
```

#### `encounterResult` — line 42914

```text
 42912 |       opportunity.temporaryResidents = Array.isArray(opportunity.temporaryResidents) ? opportunity.temporaryResidents : [];
 42913 |     });
 42914 |     route.encounterResults = Array.isArray(route.encounterResults) ? route.encounterResults : [];
 42915 |     route.finalizedAcquisitions = Array.isArray(route.finalizedAcquisitions) ? route.finalizedAcquisitions : [];
 42916 |   });
```

#### `encounterResult` — line 42986

```text
 42984 | function v2FindResult(routeState, resultId) {
 42985 |   for (const route of routeState.routes || []) {
 42986 |     const result = (route.encounterResults || []).find((entry) => entry.resultId === resultId);
 42987 |     if (result) return { route, result };
 42988 |   }
```

#### `encounterResult` — line 43702

```text
 43700 |   opportunity.status = "consumed";
 43701 |   opportunity.consumedByResultId = resultId;
 43702 |   route.encounterResults.push(result);
 43703 |   v2MarkOpportunityTemporaryEffects(opportunity.opportunityId, "consumed", resultId);
 43704 |   v2BumpRouteRevision(routeState);
```

#### `encounterResult` — line 43787

```text
 43785 |     privateDiscoveries,
 43786 |     knownResidents: [...publicView.publicDiscoveries, ...privateDiscoveries],
 43787 |     unresolvedEncounter: (route.encounterResults || []).find((result) => result.playerId === playerId && result.status === "unresolved") || null,
 43788 |     pendingOpportunities: getPendingRouteOpportunitiesForPlayer(routeState, playerId).filter((opportunity) => opportunity.routeNumber === route.routeNumber),
 43789 |     activeVisibleEffects: getVisibleRouteEffectsForPlayer(routeState, route.routeNumber, playerId),
```

#### `encounterResult` — line 44285

```text
 44283 |   opportunity.status = "consumed";
 44284 |   opportunity.consumedByResultId = resultId;
 44285 |   route.encounterResults.push(result);
 44286 |   const sourceAction = opportunity.source?.actionId ? v2FindAction(v2EnsureActionPhase(state.series), opportunity.source.actionId) : null;
 44287 |   if (sourceAction) {
```

#### `encounterResult` — line 46595

```text
 46593 |   rivalBattle: "Rival Battle Phase",
 46594 |   encounterBefore: "Encounter Before Result",
 46595 |   encounterResult: "Encounter Result Pending",
 46596 |   wheelManual: "Wheel / Guided Result Pending",
 46597 |   fieldActive: "Field Already Active",
```

#### `encounterResult` — line 46916

```text
 46914 |   addTokenScenarioPersistentEffect(els.adminTokenScenarioPersistent?.value || "none", actor, target);
 46915 |
 46916 |   if (["actionActor", "normalControl", "targetedResponse", "nonTargetedResponse", "nestedResponse", "encounterBefore", "encounterResult", "wheelManual", "fieldActive", "lingeringActive", "expiring", "invalidTarget", "insufficientMoney", "severalResponses"].includes(kind)) {
 46917 |     setTokenScenarioPhase("action");
 46918 |   }
```

#### `encounterResult` — line 46957

```text
 46955 |   } else if (kind === "encounterBefore") {
 46956 |     activity = createTokenScenarioEvent({ actor, target, title: `${actor.name}'s encounter is about to begin.`, message: "Choose before-roll Encounter effects now.", type: "encounter-before-roll", targeted: false, payload: { encounterStage: "beforeRoll" } });
 46957 |   } else if (kind === "encounterResult") {
 46958 |     activity = createTokenScenarioEvent({ actor, target, title: `${actor.name} rolled Abra.`, message: `${actor.name} rolled Abra. The result is pending.`, type: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT, targeted: false, payload: { encounterStage: "result", resultName: "Abra" } });
 46959 |   } else if (kind === "wheelManual") {
```

### Encounter contract/resolver residue — `index.html`

#### `encounterResult` — line 1719

```text
  1717 |                   <option value="rivalBattle">Rival Battle Phase</option>
  1718 |                   <option value="encounterBefore">Encounter Before Result</option>
  1719 |                   <option value="encounterResult">Encounter Result Pending</option>
  1720 |                   <option value="wheelManual">Wheel / Guided Result Pending</option>
  1721 |                   <option value="fieldActive">Field Already Active</option>
```

### Encounter contract/resolver residue — `token-effect-contract.js`

#### `encounterBeforeRoll` — line 355

```text
   353 |   const legalTimingValues = Object.freeze([
   354 |     "gymStartPreparationControl", "action", "actionOpen", "teamBuilding", "shop", "shopOpen", "postBattleControl", "responseWindow",
   355 |     "encounterBeforeRoll", "encounterResult", "wheelWindow", "sabotage", "teamPreview", "battlePayout",
   356 |     "endOfActionPhaseProcedure", "endOfBattlePhaseProcedure"
   357 |   ]);
```

#### `encounterResult` — line 355

```text
   353 |   const legalTimingValues = Object.freeze([
   354 |     "gymStartPreparationControl", "action", "actionOpen", "teamBuilding", "shop", "shopOpen", "postBattleControl", "responseWindow",
   355 |     "encounterBeforeRoll", "encounterResult", "wheelWindow", "sabotage", "teamPreview", "battlePayout",
   356 |     "endOfActionPhaseProcedure", "endOfBattlePhaseProcedure"
   357 |   ]);
```

#### `encounterResult` — line 369

```text
   367 |   const phaseBoundaryProcedureValues = Object.freeze(["endOfActionPhaseProcedure", "endOfBattlePhaseProcedure"]);
   368 |   const timingStatusValues = Object.freeze(["settled", "needsRuling"]);
   369 |   const targetTypes = Object.freeze(["none", "currentPrompt", "pokemon", "player", "team", "encounterResult", "resource", "table", "manual"]);
   370 |   const selectedTargetTypes = Object.freeze([...targetTypes, "rosterInstance", "species", "move"]);
   371 |   const targetScopes = Object.freeze(["none", "currentPrompt", "species", "rosterInstance", "singlePlayer", "allPlayers", "singleTeam", "allTeams", "singleResource", "allMatchingResources", "tableWide", "manual"]);
```

#### `"encounterCopy"` — line 380

```text
   378 |     "hostConfirmed", "trainerClassWheel", "restrict", "utilityEffect", "wickedBlow", "statusEffect", "safeguard", "delayParent",
   379 |     "substituteAttach", "redirectParentToSelf", "teamPreviewSwap", "playerStatus", "copyParentEffect", "randomRedirect", "immunity",
   380 |     "revengeRelease", "reroll", "extraEncounter", "encounterWheelEdit", "encounterTransfer", "encounterGrant", "encounterCopy",
   381 |     "encounterChoose", "moveBan", "knockOff", "multiStatusEffect", "purgeAfterBattle", "copyToken",
   382 |     "arenaTrap", "clearSmog", "extraBan", "counterProtection", "ongoingEffectTextReplacement", "ongoingEffectSuppression",
```

#### `"encounterGrant"` — line 380

```text
   378 |     "hostConfirmed", "trainerClassWheel", "restrict", "utilityEffect", "wickedBlow", "statusEffect", "safeguard", "delayParent",
   379 |     "substituteAttach", "redirectParentToSelf", "teamPreviewSwap", "playerStatus", "copyParentEffect", "randomRedirect", "immunity",
   380 |     "revengeRelease", "reroll", "extraEncounter", "encounterWheelEdit", "encounterTransfer", "encounterGrant", "encounterCopy",
   381 |     "encounterChoose", "moveBan", "knockOff", "multiStatusEffect", "purgeAfterBattle", "copyToken",
   382 |     "arenaTrap", "clearSmog", "extraBan", "counterProtection", "ongoingEffectTextReplacement", "ongoingEffectSuppression",
```

#### `"encounterTransfer"` — line 380

```text
   378 |     "hostConfirmed", "trainerClassWheel", "restrict", "utilityEffect", "wickedBlow", "statusEffect", "safeguard", "delayParent",
   379 |     "substituteAttach", "redirectParentToSelf", "teamPreviewSwap", "playerStatus", "copyParentEffect", "randomRedirect", "immunity",
   380 |     "revengeRelease", "reroll", "extraEncounter", "encounterWheelEdit", "encounterTransfer", "encounterGrant", "encounterCopy",
   381 |     "encounterChoose", "moveBan", "knockOff", "multiStatusEffect", "purgeAfterBattle", "copyToken",
   382 |     "arenaTrap", "clearSmog", "extraBan", "counterProtection", "ongoingEffectTextReplacement", "ongoingEffectSuppression",
```

#### `"encounterWheelEdit"` — line 380

```text
   378 |     "hostConfirmed", "trainerClassWheel", "restrict", "utilityEffect", "wickedBlow", "statusEffect", "safeguard", "delayParent",
   379 |     "substituteAttach", "redirectParentToSelf", "teamPreviewSwap", "playerStatus", "copyParentEffect", "randomRedirect", "immunity",
   380 |     "revengeRelease", "reroll", "extraEncounter", "encounterWheelEdit", "encounterTransfer", "encounterGrant", "encounterCopy",
   381 |     "encounterChoose", "moveBan", "knockOff", "multiStatusEffect", "purgeAfterBattle", "copyToken",
   382 |     "arenaTrap", "clearSmog", "extraBan", "counterProtection", "ongoingEffectTextReplacement", "ongoingEffectSuppression",
```

#### `"encounterChoose"` — line 381

```text
   379 |     "substituteAttach", "redirectParentToSelf", "teamPreviewSwap", "playerStatus", "copyParentEffect", "randomRedirect", "immunity",
   380 |     "revengeRelease", "reroll", "extraEncounter", "encounterWheelEdit", "encounterTransfer", "encounterGrant", "encounterCopy",
   381 |     "encounterChoose", "moveBan", "knockOff", "multiStatusEffect", "purgeAfterBattle", "copyToken",
   382 |     "arenaTrap", "clearSmog", "extraBan", "counterProtection", "ongoingEffectTextReplacement", "ongoingEffectSuppression",
   383 |     "hazeCurse", "devolveCurse", "copyTokenInventory",
```

#### `encounterBeforeRoll` — line 407

```text
   405 |   const phaseSets = Object.freeze({
   406 |     response: ["responseWindow"],
   407 |     encounterBefore: ["encounterBeforeRoll"],
   408 |     encounterResult: ["encounterResult"]
   409 |   });
```

#### `encounterResult` — line 408

```text
   406 |     response: ["responseWindow"],
   407 |     encounterBefore: ["encounterBeforeRoll"],
   408 |     encounterResult: ["encounterResult"]
   409 |   });
   410 |
```

#### `encounterResult` — line 765

```text
   763 |     protection({ id: "revenge", name: "Revenge", rulesText: "After a Battle Phase where an opponent cursed a Pokemon you brought, release 2 Pokemon from their brought team and destroy the held item", isResponse: false, legalPhases: [], timingWindows: ["endOfBattlePhaseProcedure"], phaseBoundaryProcedure: "endOfBattlePhaseProcedure", explicitPhaseTiming: "postPayoutBeforeControl", activationPattern: "phaseBoundaryOptionalTrigger", activationType: "Post-payout optional offer", requiresPendingEvent: false, createsPendingEvent: true, opensResponseWindow: false, targetType: "team", targetScope: "singleTeam", targetControllerRelation: "otherPlayer", otherPlayerOnly: true, excludeActor: true, differentControllerRequired: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "revengeRelease", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Revenge is offered after payout from exact current-Gym Curse anchors and the immutable brought-team snapshot. It consumes only after the affected player confirms two exact Pokemon and an optional eligible held Item.", requiredChoices: ["Exactly two exact Pokemon from the offender's immutable brought team", "At most one eligible held item from those two"], guidedTask: { instruction: "Choose exactly two exact roster instances from the offending player's immutable brought-team snapshot, then optionally choose one eligible exactly referenced held item from those two.", responsible: "Affected player", resultLabel: "Revenge Choices", placeholder: "Two exact roster IDs and optional exact held item ID", confirmationLabel: "Apply Revenge" }, mechanicContract: { postPayoutBeforeControl: true, immutableBroughtSnapshotRequired: true, exactReleaseCount: 2, qualifyingCurseMustTargetExactBroughtInstance: true, heldItemSelectionMaximum: 1, heldItemMustBelongToSelectedReleasedPokemon: true, exactHeldInventoryReferenceRequired: true, masterBallTierProtected: true, sameNameInventoryGuessingForbidden: true, atomicResolutionRequired: true, idempotentResolutionRequired: true, adminUndoRequired: true, optionalOfferCanBeDeclinedWithoutConsumption: true, productionChoiceScreenRequired: true } }),
   764 |
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
```

#### `resolverId: "reroll"` — line 765

```text
   763 |     protection({ id: "revenge", name: "Revenge", rulesText: "After a Battle Phase where an opponent cursed a Pokemon you brought, release 2 Pokemon from their brought team and destroy the held item", isResponse: false, legalPhases: [], timingWindows: ["endOfBattlePhaseProcedure"], phaseBoundaryProcedure: "endOfBattlePhaseProcedure", explicitPhaseTiming: "postPayoutBeforeControl", activationPattern: "phaseBoundaryOptionalTrigger", activationType: "Post-payout optional offer", requiresPendingEvent: false, createsPendingEvent: true, opensResponseWindow: false, targetType: "team", targetScope: "singleTeam", targetControllerRelation: "otherPlayer", otherPlayerOnly: true, excludeActor: true, differentControllerRequired: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "revengeRelease", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Revenge is offered after payout from exact current-Gym Curse anchors and the immutable brought-team snapshot. It consumes only after the affected player confirms two exact Pokemon and an optional eligible held Item.", requiredChoices: ["Exactly two exact Pokemon from the offender's immutable brought team", "At most one eligible held item from those two"], guidedTask: { instruction: "Choose exactly two exact roster instances from the offending player's immutable brought-team snapshot, then optionally choose one eligible exactly referenced held item from those two.", responsible: "Affected player", resultLabel: "Revenge Choices", placeholder: "Two exact roster IDs and optional exact held item ID", confirmationLabel: "Apply Revenge" }, mechanicContract: { postPayoutBeforeControl: true, immutableBroughtSnapshotRequired: true, exactReleaseCount: 2, qualifyingCurseMustTargetExactBroughtInstance: true, heldItemSelectionMaximum: 1, heldItemMustBelongToSelectedReleasedPokemon: true, exactHeldInventoryReferenceRequired: true, masterBallTierProtected: true, sameNameInventoryGuessingForbidden: true, atomicResolutionRequired: true, idempotentResolutionRequired: true, adminUndoRequired: true, optionalOfferCanBeDeclinedWithoutConsumption: true, productionChoiceScreenRequired: true } }),
   764 |
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
```

#### `resolverId: "extraEncounter"` — line 766

```text
   764 |
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
```

#### `"encounterWheelEdit"` — line 767

```text
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
```

#### `encounterResult` — line 767

```text
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
```

#### `resolverId: "encounterWheelEdit"` — line 767

```text
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
```

#### `"encounterTransfer"` — line 768

```text
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
```

#### `encounterResult` — line 768

```text
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
```

#### `resolverId: "encounterTransfer"` — line 768

```text
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
```

#### `"encounterGrant"` — line 769

```text
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
```

#### `encounterResult` — line 769

```text
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
```

#### `resolverId: "encounterGrant"` — line 769

```text
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
```

#### `"encounterCopy"` — line 770

```text
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
```

#### `currentActionPhase` — line 770

```text
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
```

#### `encounterResult` — line 770

```text
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
```

#### `Hidden Grotto` — line 770

```text
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
```

#### `resolverId: "encounterCopy"` — line 770

```text
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
```

#### `"encounterChoose"` — line 771

```text
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 |
```

#### `encounterResult` — line 771

```text
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 |
```

#### `resolverId: "encounterChoose"` — line 771

```text
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 |
```

#### `"encounterGrant"` — line 772

```text
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 |
   774 |     control({ id: "move-deleter", name: "Move Deleter", aliases: ["Move Deleter Curse"], rulesText: "Ban one move from being brought for 1 week. Cannot be used after team submission", targetType: "resource", targetScope: "singleResource", selectedTargetType: "move", applicationScope: "tableWide", affectedEntityType: "move", targetScopeStatus: "settled", targetControllerRelation: "notApplicable", minTargets: 1, maxTargets: 1, targetCollectionType: "canonicalMove", resolverMode: resolverModes.AUTOMATIC, resolverId: "moveBan", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Move Deleter records one canonical global move restriction for the next Gym and the Teambuilder and validator enforce it.", requiredChoices: ["One canonical move"], persistence: "lingeringEffect", duration: "Next Gym", expirationPoint: "End of the next Gym", automaticMutations: ["Create a global move restriction keyed by canonical move identity", "Disable the move in Teambuilder and team validation during the next Gym", "Expire the restriction when that Gym ends"] }),
```

#### `encounterResult` — line 772

```text
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 |
   774 |     control({ id: "move-deleter", name: "Move Deleter", aliases: ["Move Deleter Curse"], rulesText: "Ban one move from being brought for 1 week. Cannot be used after team submission", targetType: "resource", targetScope: "singleResource", selectedTargetType: "move", applicationScope: "tableWide", affectedEntityType: "move", targetScopeStatus: "settled", targetControllerRelation: "notApplicable", minTargets: 1, maxTargets: 1, targetCollectionType: "canonicalMove", resolverMode: resolverModes.AUTOMATIC, resolverId: "moveBan", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Move Deleter records one canonical global move restriction for the next Gym and the Teambuilder and validator enforce it.", requiredChoices: ["One canonical move"], persistence: "lingeringEffect", duration: "Next Gym", expirationPoint: "End of the next Gym", automaticMutations: ["Create a global move restriction keyed by canonical move identity", "Disable the move in Teambuilder and team validation during the next Gym", "Expire the restriction when that Gym ends"] }),
```

#### `resolverId: "encounterGrant"` — line 772

```text
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 |
   774 |     control({ id: "move-deleter", name: "Move Deleter", aliases: ["Move Deleter Curse"], rulesText: "Ban one move from being brought for 1 week. Cannot be used after team submission", targetType: "resource", targetScope: "singleResource", selectedTargetType: "move", applicationScope: "tableWide", affectedEntityType: "move", targetScopeStatus: "settled", targetControllerRelation: "notApplicable", minTargets: 1, maxTargets: 1, targetCollectionType: "canonicalMove", resolverMode: resolverModes.AUTOMATIC, resolverId: "moveBan", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Move Deleter records one canonical global move restriction for the next Gym and the Teambuilder and validator enforce it.", requiredChoices: ["One canonical move"], persistence: "lingeringEffect", duration: "Next Gym", expirationPoint: "End of the next Gym", automaticMutations: ["Create a global move restriction keyed by canonical move identity", "Disable the move in Teambuilder and team validation during the next Gym", "Expire the restriction when that Gym ends"] }),
```

#### `"encounterCopy"` — line 818

```text
   816 |     },
   817 |     "honey-token": {
   818 |       resolverMode: resolverModes.AUTOMATIC, resolverId: "encounterCopy", copiedPayloadStatus: "settled",
   819 |       runtimeUsability: runtimeUsabilityStatuses.USABLE,
   820 |       runtimeUsabilityReason: "Honey copies one immutable completed Encounter result at the End-of-Action checkpoint into a new acquisition-ready Encounter record without rerolling or copying ownership and transient history.",
```

#### `resolverId: "encounterCopy"` — line 818

```text
   816 |     },
   817 |     "honey-token": {
   818 |       resolverMode: resolverModes.AUTOMATIC, resolverId: "encounterCopy", copiedPayloadStatus: "settled",
   819 |       runtimeUsability: runtimeUsabilityStatuses.USABLE,
   820 |       runtimeUsabilityReason: "Honey copies one immutable completed Encounter result at the End-of-Action checkpoint into a new acquisition-ready Encounter record without rerolling or copying ownership and transient history.",
```

#### `currentActionPhase` — line 822

```text
   820 |       runtimeUsabilityReason: "Honey copies one immutable completed Encounter result at the End-of-Action checkpoint into a new acquisition-ready Encounter record without rerolling or copying ownership and transient history.",
   821 |       opensResponseWindow: false,
   822 |       mechanicContract: { immutableCompletedEncounterRequired: true, currentActionPhaseOnly: true, exactSelectionWhenMultiple: true, copiedSpeciesFormTierLevelAndIntrinsicProperties: true, newEncounterAndRosterIdentitiesRequired: true, doNotCopyOwnershipStatusHeldItemsRerollHistoryConsumedModifiersBonusesOrReferences: true, duplicateCopyForbidden: true }
   823 |     },
   824 |     "ditto-token": {
```

#### `encounterResult` — line 1193

```text
  1191 |       }
  1192 |       if (definition.id === "honey-token") {
  1193 |         if (definition.legalPhases.includes("encounterResult") || definition.timingWindows.includes("encounterResult") || definition.isResponse || definition.requiresPendingEvent) {
  1194 |           errors.push(`${definition.id}: Honey cannot publish encounterResult response timing`);
  1195 |         }
```

#### `encounterResult` — line 1194

```text
  1192 |       if (definition.id === "honey-token") {
  1193 |         if (definition.legalPhases.includes("encounterResult") || definition.timingWindows.includes("encounterResult") || definition.isResponse || definition.requiresPendingEvent) {
  1194 |           errors.push(`${definition.id}: Honey cannot publish encounterResult response timing`);
  1195 |         }
  1196 |         if (definition.phaseBoundaryProcedure !== "endOfActionPhaseProcedure" || definition.explicitPhaseTiming !== "endOfActionPhase"
```

#### `currentActionPhase` — line 1198

```text
  1196 |         if (definition.phaseBoundaryProcedure !== "endOfActionPhaseProcedure" || definition.explicitPhaseTiming !== "endOfActionPhase"
  1197 |           || definition.activationPattern !== "phaseBoundaryOptionalTrigger" || definition.eligibleRecordType !== "encounter"
  1198 |           || definition.eligibleRecordWindow !== "currentActionPhase" || definition.selectionCount !== 1
  1199 |           || definition.copiedPayloadStatus !== "settled" || !definition.createsPendingEvent || definition.opensResponseWindow
  1200 |           || definition.runtimeImplementationStatus !== runtimeImplementationStatuses.VERIFIED_COMPLETE
```

### Honey retired bridge — `scripts/test-token-sandbox.js`

#### `copiedFromRandomPokemonSessionId` — line 1128

```text
  1126 |   assert.equal(candidate.pokemonRecords.find((pokemon) => pokemon.id === "red-garchomp-2").name, "Barbaracle");
  1127 |   assert.equal(candidate.delayedEffects.some((entry) => entry.id === "sandbox-teleport-delay"), true);
  1128 |   assert.equal(candidate.randomPokemonSessions.some((entry) => entry.copiedFromRandomPokemonSessionId === "sandbox-honey-source"), true);
  1129 |   assert.equal(candidate.randomPokemonSessions.find((entry) => entry.id === "sandbox-reroll-result").resultDisplayName, "Ralts");
  1130 |   assert.equal(candidate.pokemonRecords.find((pokemon) => pokemon.id === "red-garchomp").status, "Released");
```

### Honey retired bridge — `token-control-effects.js`

#### `copiedFromRandomPokemonSessionId` — line 2347

```text
  2345 |     const owner = (state.players || []).find((player) => player.id === input.ownerPlayerId);
  2346 |     if (!source || !owner) return { result: "systemFailure", refundRequired: true, reason: "Choose one completed eligible Encounter result from this Action Phase." };
  2347 |     if (source.copiedFromRandomPokemonSessionId || source.sourceLabel === "Honey copied Encounter") {
  2348 |       return { result: "systemFailure", refundRequired: true, reason: "Honey cannot recursively copy a Honey-created Encounter result." };
  2349 |     }
```

#### `Honey copied Encounter` — line 2347

```text
  2345 |     const owner = (state.players || []).find((player) => player.id === input.ownerPlayerId);
  2346 |     if (!source || !owner) return { result: "systemFailure", refundRequired: true, reason: "Choose one completed eligible Encounter result from this Action Phase." };
  2347 |     if (source.copiedFromRandomPokemonSessionId || source.sourceLabel === "Honey copied Encounter") {
  2348 |       return { result: "systemFailure", refundRequired: true, reason: "Honey cannot recursively copy a Honey-created Encounter result." };
  2349 |     }
```

#### `Honey copied Encounter` — line 2368

```text
  2366 |       };
  2367 |       const copiedSession = {
  2368 |         id: makeId("random-pokemon"), sourceType: "encounter", sourceLabel: "Honey copied Encounter",
  2369 |         ownerPlayerId: owner.id, playerId: owner.id, resultOwnerPlayerId: owner.id,
  2370 |         status: "pending", rerollable: false, resultDisplayName: source.resultDisplayName,
```

#### `copiedFromRandomPokemonSessionId` — line 2374

```text
  2372 |         tierId: source.tierId || "", tier: source.tier || "", level: source.level,
  2373 |         resultMetadata: copiedResultMetadata, intrinsicRolledProperties,
  2374 |         copiedFromEncounterSessionId: source.encounterSessionId || "", copiedFromRandomPokemonSessionId: source.id,
  2375 |         series: options.series || state.series, gym: Number(options.gym || state.gym || 1), createdAt: options.now || new Date().toISOString()
  2376 |       };
```

### Legacy Encounter Live Referee channel — `app.js`

#### `"encounter-reroll"` — line 636

```text
   634 |   encounterResult: {
   635 |     label: "Encounter Result",
   636 |     responseTypes: ["encounter-reroll", "steal-encounter"]
   637 |   },
   638 |   "class-activation": {
```

#### `"steal-encounter"` — line 636

```text
   634 |   encounterResult: {
   635 |     label: "Encounter Result",
   636 |     responseTypes: ["encounter-reroll", "steal-encounter"]
   637 |   },
   638 |   "class-activation": {
```

#### `"encounter-reroll"` — line 648

```text
   646 |   "pokemon-result": {
   647 |     label: "Pokemon Result",
   648 |     responseTypes: ["encounter-reroll", "steal-encounter"]
   649 |   },
   650 |   "encounter-result": {
```

#### `"steal-encounter"` — line 648

```text
   646 |   "pokemon-result": {
   647 |     label: "Pokemon Result",
   648 |     responseTypes: ["encounter-reroll", "steal-encounter"]
   649 |   },
   650 |   "encounter-result": {
```

#### `"encounter-result"` — line 650

```text
   648 |     responseTypes: ["encounter-reroll", "steal-encounter"]
   649 |   },
   650 |   "encounter-result": {
   651 |     label: "Encounter Result",
   652 |     responseTypes: ["encounter-reroll", "steal-encounter"]
```

#### `"encounter-reroll"` — line 652

```text
   650 |   "encounter-result": {
   651 |     label: "Encounter Result",
   652 |     responseTypes: ["encounter-reroll", "steal-encounter"]
   653 |   }
   654 | });
```

#### `"steal-encounter"` — line 652

```text
   650 |   "encounter-result": {
   651 |     label: "Encounter Result",
   652 |     responseTypes: ["encounter-reroll", "steal-encounter"]
   653 |   }
   654 | });
```

#### `"encounter-reroll"` — line 663

```text
   661 |     description: "Cancel a token, perk, or class effect targeting you."
   662 |   },
   663 |   "encounter-reroll": {
   664 |     id: "encounter-reroll",
   665 |     label: "Reroll Encounter",
```

#### `"encounter-reroll"` — line 664

```text
   662 |   },
   663 |   "encounter-reroll": {
   664 |     id: "encounter-reroll",
   665 |     label: "Reroll Encounter",
   666 |     tokenNames: ["Reroll Token"],
```

#### `"steal-encounter"` — line 669

```text
   667 |     description: "Future hook: force a Pokemon result to be rerolled."
   668 |   },
   669 |   "steal-encounter": {
   670 |     id: "steal-encounter",
   671 |     label: "Steal Encounter",
```

#### `"steal-encounter"` — line 670

```text
   668 |   },
   669 |   "steal-encounter": {
   670 |     id: "steal-encounter",
   671 |     label: "Steal Encounter",
   672 |     tokenNames: ["Quick Ball Token", "Steal"],
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 864

```text
   862 |     livePromptType: TOKEN_PENDING_EVENT_TYPES.PROTECTION_RESPONSE
   863 |   }),
   864 |   [TOKEN_TIMING_CATEGORIES.ENCOUNTER]: Object.freeze({
   865 |     timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,
   866 |     useType: TOKEN_USE_TYPES.ENCOUNTER_MODIFIER,
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 865

```text
   863 |   }),
   864 |   [TOKEN_TIMING_CATEGORIES.ENCOUNTER]: Object.freeze({
   865 |     timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,
   866 |     useType: TOKEN_USE_TYPES.ENCOUNTER_MODIFIER,
   867 |     createsPendingEvent: false,
```

#### `TOKEN_USE_TYPES.ENCOUNTER_MODIFIER` — line 866

```text
   864 |   [TOKEN_TIMING_CATEGORIES.ENCOUNTER]: Object.freeze({
   865 |     timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,
   866 |     useType: TOKEN_USE_TYPES.ENCOUNTER_MODIFIER,
   867 |     createsPendingEvent: false,
   868 |     requiresPendingEvent: true,
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 869

```text
   867 |     createsPendingEvent: false,
   868 |     requiresPendingEvent: true,
   869 |     requiredPendingType: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT,
   870 |     responseRole: "encounterModifier",
   871 |     livePromptType: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_TOKEN
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_TOKEN` — line 871

```text
   869 |     requiredPendingType: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT,
   870 |     responseRole: "encounterModifier",
   871 |     livePromptType: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_TOKEN
   872 |   }),
   873 |   [TOKEN_TIMING_CATEGORIES.CURSE]: Object.freeze({
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 2722

```text
  2720 |     name: "Reroll Token",
  2721 |     sourceType: "token",
  2722 |     timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,
  2723 |     useType: TOKEN_USE_TYPES.ENCOUNTER_MODIFIER,
  2724 |     createsPendingEvent: false,
```

#### `TOKEN_USE_TYPES.ENCOUNTER_MODIFIER` — line 2723

```text
  2721 |     sourceType: "token",
  2722 |     timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,
  2723 |     useType: TOKEN_USE_TYPES.ENCOUNTER_MODIFIER,
  2724 |     createsPendingEvent: false,
  2725 |     requiresPendingEvent: true,
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 2726

```text
  2724 |     createsPendingEvent: false,
  2725 |     requiresPendingEvent: true,
  2726 |     requiredPendingType: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT,
  2727 |     responseRole: "encounterModifier",
  2728 |     livePromptType: "encounterToken",
```

#### `"encounter-result"` — line 2731

```text
  2729 |     timing: "pending-result",
  2730 |     targetType: "pending-random-result",
  2731 |     validTargets: ["random-pokemon-result", "encounter-result", "quest-roll"],
  2732 |     excludedSources: ["game-corner-gamble-wheel"],
  2733 |     effect: "reroll"
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 2761

```text
  2759 |   "immunity": { names: ["Immunity", "Emergency Immunity Token"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Immunity", note: "Negates one effect/global effect." },
  2760 |   "revenge": { names: ["Revenge"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Revenge Pending", note: "Post-curse revenge marker." },
  2761 |   "extra-encounter-token": { names: ["Extra Encounter Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Extra Encounter Available", note: "Spend during Action Phase to roll an extra encounter." },
  2762 |   "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, choiceLabel: "Pokemon Name", effectType: "log", note: "Remove one Pokemon per 5 entries from Encounter Wheel. Wheel editor hook pending." },
  2763 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 2762

```text
  2760 |   "revenge": { names: ["Revenge"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Revenge Pending", note: "Post-curse revenge marker." },
  2761 |   "extra-encounter-token": { names: ["Extra Encounter Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Extra Encounter Available", note: "Spend during Action Phase to roll an extra encounter." },
  2762 |   "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, choiceLabel: "Pokemon Name", effectType: "log", note: "Remove one Pokemon per 5 entries from Encounter Wheel. Wheel editor hook pending." },
  2763 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
  2764 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 2763

```text
  2761 |   "extra-encounter-token": { names: ["Extra Encounter Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Extra Encounter Available", note: "Spend during Action Phase to roll an extra encounter." },
  2762 |   "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, choiceLabel: "Pokemon Name", effectType: "log", note: "Remove one Pokemon per 5 entries from Encounter Wheel. Wheel editor hook pending." },
  2763 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
  2764 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
  2765 |   "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "At End of Action, copies one immutable completed Encounter result into a new acquisition-ready Encounter without rerolling." },
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 2764

```text
  2762 |   "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, choiceLabel: "Pokemon Name", effectType: "log", note: "Remove one Pokemon per 5 entries from Encounter Wheel. Wheel editor hook pending." },
  2763 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
  2764 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
  2765 |   "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "At End of Action, copies one immutable completed Encounter result into a new acquisition-ready Encounter without rerolling." },
  2766 |   "master-ball-token": { names: ["Master Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Master Ball Pending", note: "Choose encounter; cannot be changed by other players." },
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 2765

```text
  2763 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
  2764 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
  2765 |   "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "At End of Action, copies one immutable completed Encounter result into a new acquisition-ready Encounter without rerolling." },
  2766 |   "master-ball-token": { names: ["Master Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Master Ball Pending", note: "Choose encounter; cannot be changed by other players." },
  2767 |   "beast-ball-token": { names: ["Beast Ball"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Beast Ball Pending", note: "Encounter move choice marker." }
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 2766

```text
  2764 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
  2765 |   "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "At End of Action, copies one immutable completed Encounter result into a new acquisition-ready Encounter without rerolling." },
  2766 |   "master-ball-token": { names: ["Master Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Master Ball Pending", note: "Choose encounter; cannot be changed by other players." },
  2767 |   "beast-ball-token": { names: ["Beast Ball"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Beast Ball Pending", note: "Encounter move choice marker." }
  2768 | });
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 2767

```text
  2765 |   "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "At End of Action, copies one immutable completed Encounter result into a new acquisition-ready Encounter without rerolling." },
  2766 |   "master-ball-token": { names: ["Master Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Master Ball Pending", note: "Choose encounter; cannot be changed by other players." },
  2767 |   "beast-ball-token": { names: ["Beast Ball"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Beast Ball Pending", note: "Encounter move choice marker." }
  2768 | });
  2769 |
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 2976

```text
  2974 |     objectType: TOKEN_OBJECT_TYPES.TOKEN,
  2975 |     family: ["encounter"],
  2976 |     timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,
  2977 |     timingWindows: [TOKEN_TIMING_WINDOWS.ACTION_OPEN, TOKEN_TIMING_WINDOWS.MANUAL_HOST],
  2978 |     activationPattern: TOKEN_ACTIVATION_PATTERNS.PROACTIVE,
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 3121

```text
  3119 |     objectType: TOKEN_OBJECT_TYPES.TOKEN,
  3120 |     family: ["reroll"],
  3121 |     timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,
  3122 |     timingWindows: [TOKEN_TIMING_WINDOWS.WHEEL_WINDOW, TOKEN_TIMING_WINDOWS.MANUAL_HOST],
  3123 |     activationPattern: TOKEN_ACTIVATION_PATTERNS.RESPONSE,
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 3126

```text
  3124 |     persistence: TOKEN_PERSISTENCE_BUCKETS.INSTANT,
  3125 |     resolutionPayloads: [TOKEN_RESOLUTION_PAYLOADS.WHEEL, TOKEN_RESOLUTION_PAYLOADS.REPLACEMENT],
  3126 |     targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT,
  3127 |     targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT,
  3128 |     duration: "instant",
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 3143

```text
  3141 | function tokenTimingCategoryFromRaw(value = "") {
  3142 |   const key = String(value || "").toLowerCase().trim();
  3143 |   if (key === "reroll") return TOKEN_TIMING_CATEGORIES.ENCOUNTER;
  3144 |   if (Object.values(TOKEN_TIMING_CATEGORIES).includes(key)) return key;
  3145 |   if (key === "curses") return TOKEN_TIMING_CATEGORIES.CURSE;
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 3146

```text
  3144 |   if (Object.values(TOKEN_TIMING_CATEGORIES).includes(key)) return key;
  3145 |   if (key === "curses") return TOKEN_TIMING_CATEGORIES.CURSE;
  3146 |   if (key === "encounters") return TOKEN_TIMING_CATEGORIES.ENCOUNTER;
  3147 |   if (key === "manual" || key === "other") return TOKEN_TIMING_CATEGORIES.MANUAL;
  3148 |   return "";
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 3198

```text
  3196 |   if (values.includes(raw)) return raw;
  3197 |   if (key === "current-prompt") return EFFECT_TARGET_TYPES.CURRENT_PROMPT;
  3198 |   if (key === "pending-random-result" || key === "pending-result") return EFFECT_TARGET_TYPES.ENCOUNTER_RESULT;
  3199 |   if (/encounter|random/.test(key)) return EFFECT_TARGET_TYPES.ENCOUNTER_RESULT;
  3200 |   if (/pokemon/.test(key)) return EFFECT_TARGET_TYPES.POKEMON;
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 3199

```text
  3197 |   if (key === "current-prompt") return EFFECT_TARGET_TYPES.CURRENT_PROMPT;
  3198 |   if (key === "pending-random-result" || key === "pending-result") return EFFECT_TARGET_TYPES.ENCOUNTER_RESULT;
  3199 |   if (/encounter|random/.test(key)) return EFFECT_TARGET_TYPES.ENCOUNTER_RESULT;
  3200 |   if (/pokemon/.test(key)) return EFFECT_TARGET_TYPES.POKEMON;
  3201 |   if (/player/.test(key)) return EFFECT_TARGET_TYPES.PLAYER;
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 3233

```text
  3231 |   if (explicit) return explicit;
  3232 |   if (category === TOKEN_TIMING_CATEGORIES.PROTECTION) return EFFECT_TARGET_TYPES.CURRENT_PROMPT;
  3233 |   if (category === TOKEN_TIMING_CATEGORIES.ENCOUNTER) return EFFECT_TARGET_TYPES.ENCOUNTER_RESULT;
  3234 |   const mode = String(definition.targetMode || "").toLowerCase();
  3235 |   if (/pokemon/.test(mode) || mode === "banned-pokemon") return EFFECT_TARGET_TYPES.POKEMON;
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 3233

```text
  3231 |   if (explicit) return explicit;
  3232 |   if (category === TOKEN_TIMING_CATEGORIES.PROTECTION) return EFFECT_TARGET_TYPES.CURRENT_PROMPT;
  3233 |   if (category === TOKEN_TIMING_CATEGORIES.ENCOUNTER) return EFFECT_TARGET_TYPES.ENCOUNTER_RESULT;
  3234 |   const mode = String(definition.targetMode || "").toLowerCase();
  3235 |   if (/pokemon/.test(mode) || mode === "banned-pokemon") return EFFECT_TARGET_TYPES.POKEMON;
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 3247

```text
  3245 |   if (explicit) return explicit;
  3246 |   if (targetType === EFFECT_TARGET_TYPES.CURRENT_PROMPT) return EFFECT_TARGET_SCOPES.CURRENT_PROMPT;
  3247 |   if (targetType === EFFECT_TARGET_TYPES.ENCOUNTER_RESULT) return EFFECT_TARGET_SCOPES.CURRENT_PROMPT;
  3248 |   if (targetType === EFFECT_TARGET_TYPES.PLAYER) return EFFECT_TARGET_SCOPES.SINGLE_PLAYER;
  3249 |   if (targetType === EFFECT_TARGET_TYPES.TABLE) return EFFECT_TARGET_SCOPES.TABLE_WIDE;
```

#### `EFFECT_TARGET_CATEGORIES.ENCOUNTER_RESULT` — line 3265

```text
  3263 | function targetCategoryFromEffectBucket(targetType = "", targetScope = "") {
  3264 |   if (targetType === EFFECT_TARGET_TYPES.POKEMON) return EFFECT_TARGET_CATEGORIES.POKEMON;
  3265 |   if (targetType === EFFECT_TARGET_TYPES.ENCOUNTER_RESULT) return EFFECT_TARGET_CATEGORIES.ENCOUNTER_RESULT;
  3266 |   if (targetType === EFFECT_TARGET_TYPES.PLAYER) return EFFECT_TARGET_CATEGORIES.PLAYER;
  3267 |   if (targetType === EFFECT_TARGET_TYPES.RESOURCE) return EFFECT_TARGET_CATEGORIES.TOKEN;
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 3265

```text
  3263 | function targetCategoryFromEffectBucket(targetType = "", targetScope = "") {
  3264 |   if (targetType === EFFECT_TARGET_TYPES.POKEMON) return EFFECT_TARGET_CATEGORIES.POKEMON;
  3265 |   if (targetType === EFFECT_TARGET_TYPES.ENCOUNTER_RESULT) return EFFECT_TARGET_CATEGORIES.ENCOUNTER_RESULT;
  3266 |   if (targetType === EFFECT_TARGET_TYPES.PLAYER) return EFFECT_TARGET_CATEGORIES.PLAYER;
  3267 |   if (targetType === EFFECT_TARGET_TYPES.RESOURCE) return EFFECT_TARGET_CATEGORIES.TOKEN;
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 3439

```text
  3437 |     [TOKEN_TIMING_CATEGORIES.CONTROL]: "Control Token",
  3438 |     [TOKEN_TIMING_CATEGORIES.PROTECTION]: "Protection Token",
  3439 |     [TOKEN_TIMING_CATEGORIES.ENCOUNTER]: "Encounter Token",
  3440 |     [TOKEN_TIMING_CATEGORIES.CURSE]: "Curse Token",
  3441 |     [TOKEN_TIMING_CATEGORIES.MANUAL]: "Manual Token"
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 4139

```text
  4137 |   }
  4138 |   if (pendingEvent) {
  4139 |     if (metadata.timingWindows.includes(TOKEN_TIMING_WINDOWS.WHEEL_WINDOW) || metadata.timingCategory === TOKEN_TIMING_CATEGORIES.ENCOUNTER) {
  4140 |       return recordEncounterTokenUse(draft);
  4141 |     }
```

#### `recordEncounterTokenUse` — line 4140

```text
  4138 |   if (pendingEvent) {
  4139 |     if (metadata.timingWindows.includes(TOKEN_TIMING_WINDOWS.WHEEL_WINDOW) || metadata.timingCategory === TOKEN_TIMING_CATEGORIES.ENCOUNTER) {
  4140 |       return recordEncounterTokenUse(draft);
  4141 |     }
  4142 |     if (metadata.activationPattern === TOKEN_ACTIVATION_PATTERNS.RESPONSE || metadata.timingCategory === TOKEN_TIMING_CATEGORIES.PROTECTION) {
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 5968

```text
  5966 |     [TOKEN_TIMING_CATEGORIES.CONTROL, "Control Token"],
  5967 |     [TOKEN_TIMING_CATEGORIES.PROTECTION, "Protection Token"],
  5968 |     [TOKEN_TIMING_CATEGORIES.ENCOUNTER, "Encounter Token"],
  5969 |     [TOKEN_TIMING_CATEGORIES.CURSE, "Curse Token"],
  5970 |   ].map(([value, label]) => `<option value="${escapeHtml(value)}" ${value === selected ? "selected" : ""}>${escapeHtml(label)}</option>`).join("");
```

#### `createPokemonResultTimingWindow` — line 23147

```text
 23145 | }
 23146 |
 23147 | function createPokemonResultTimingWindow(session, player) {
 23148 |   if (!session || session.interactionEventId || !player) return null;
 23149 |   const resultName = session.resultDisplayName || session.resultPokemonName || "Pokemon result";
```

#### `"encounter-result"` — line 23152

```text
 23150 |   const isEncounter = session.sourceType === "encounter";
 23151 |   const activity = createInteractionEvent({
 23152 |     type: isEncounter ? "encounter-result" : "pokemon-result",
 23153 |     title: `${player.name} rolled ${resultName}`,
 23154 |     message: `${session.sourceLabel || "Pokemon result"} is pending before it resolves.`,
```

#### `"encounter-reroll"` — line 23159

```text
 23157 |     sourceType: session.sourceType || "random-pokemon",
 23158 |     sourceId: session.id,
 23159 |     responseTypes: ["encounter-reroll", "steal-encounter"],
 23160 |     eligiblePlayerIds: state.players.map((entry) => entry.id),
 23161 |     series: session.series || state.series,
```

#### `"steal-encounter"` — line 23159

```text
 23157 |     sourceType: session.sourceType || "random-pokemon",
 23158 |     sourceId: session.id,
 23159 |     responseTypes: ["encounter-reroll", "steal-encounter"],
 23160 |     eligiblePlayerIds: state.players.map((entry) => entry.id),
 23161 |     series: session.series || state.series,
```

#### `"encounter-result"` — line 25519

```text
 25517 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.CONTROL_TOKEN) return TOKEN_TIMING_CATEGORIES.CONTROL;
 25518 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.CURSE_TOKEN) return TOKEN_TIMING_CATEGORIES.CURSE;
 25519 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT || activity.type === "encounter-result") return TOKEN_TIMING_CATEGORIES.ENCOUNTER;
 25520 |   return "";
 25521 | }
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 25519

```text
 25517 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.CONTROL_TOKEN) return TOKEN_TIMING_CATEGORIES.CONTROL;
 25518 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.CURSE_TOKEN) return TOKEN_TIMING_CATEGORIES.CURSE;
 25519 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT || activity.type === "encounter-result") return TOKEN_TIMING_CATEGORIES.ENCOUNTER;
 25520 |   return "";
 25521 | }
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 25519

```text
 25517 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.CONTROL_TOKEN) return TOKEN_TIMING_CATEGORIES.CONTROL;
 25518 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.CURSE_TOKEN) return TOKEN_TIMING_CATEGORIES.CURSE;
 25519 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT || activity.type === "encounter-result") return TOKEN_TIMING_CATEGORIES.ENCOUNTER;
 25520 |   return "";
 25521 | }
```

#### `"encounter-result"` — line 25532

```text
 25530 |     ? " This is happening during Sabotage. Submitted teams are locked before Team Preview."
 25531 |     : "";
 25532 |   if (resultSession || activity?.type === "encounter-result" || activity?.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT) {
 25533 |     const resultOwnerId = resultSession?.resultOwnerPlayerId || resultSession?.ownerPlayerId || resultSession?.playerId || activity?.actorPlayerId || "";
 25534 |     const resultOwner = targetState.players.find((player) => player.id === resultOwnerId);
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 25532

```text
 25530 |     ? " This is happening during Sabotage. Submitted teams are locked before Team Preview."
 25531 |     : "";
 25532 |   if (resultSession || activity?.type === "encounter-result" || activity?.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT) {
 25533 |     const resultOwnerId = resultSession?.resultOwnerPlayerId || resultSession?.ownerPlayerId || resultSession?.playerId || activity?.actorPlayerId || "";
 25534 |     const resultOwner = targetState.players.find((player) => player.id === resultOwnerId);
```

#### `"encounter-result"` — line 26165

```text
 26163 |     const resultName = resultSession?.resultDisplayName || pendingEvent.payload?.resultName || "";
 26164 |     const sourceLabel = resultSession?.sourceLabel || pendingEvent.payload?.sourceLabel || pendingEvent.sourceType || "Event";
 26165 |     const isEncounterResult = Boolean(resultSession?.sourceType === "encounter" || pendingEvent.type === "encounter-result");
 26166 |     const tokenPrompt = liveTokenPromptDetails(pendingEvent, resultSession, targetState);
 26167 |     const promptDisplay = liveCurrentPromptDetails(pendingEvent, tokenPrompt, currentPromptStep, respondingToPromptStep);
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 26403

```text
 26401 |     [TOKEN_PENDING_EVENT_TYPES.CONTROL_TOKEN, "Control Token"],
 26402 |     [TOKEN_PENDING_EVENT_TYPES.CURSE_TOKEN, "Curse"],
 26403 |     [TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT, "Encounter"],
 26404 |     [TOKEN_PENDING_EVENT_TYPES.PROTECTION_RESPONSE, "Protection / Response Note"],
 26405 |     ["item-effect", "Item"],
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 26414

```text
 26412 |   const options = [
 26413 |     ["normal", "Normal"],
 26414 |     [TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT, "Encounter Result"],
 26415 |     [TOKEN_PENDING_EVENT_TYPES.TEAM_LOCK_WINDOW, "Sabotage"],
 26416 |     ["team-preview", "Team Preview"],
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 27138

```text
 27136 |   const finalEventType = timingWindow === TOKEN_PENDING_EVENT_TYPES.TEAM_LOCK_WINDOW
 27137 |     ? TOKEN_PENDING_EVENT_TYPES.TEAM_LOCK_WINDOW
 27138 |     : timingWindow === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT
 27139 |       ? TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT
 27140 |       : eventType;
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 27139

```text
 27137 |     ? TOKEN_PENDING_EVENT_TYPES.TEAM_LOCK_WINDOW
 27138 |     : timingWindow === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT
 27139 |       ? TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT
 27140 |       : eventType;
 27141 |   const activity = createInteractionEvent({
```

#### `currentEncounterPendingActivity` — line 27590

```text
 27588 | }
 27589 |
 27590 | function currentEncounterPendingActivity() {
 27591 |   const activity = getCurrentPendingEvent();
 27592 |   if (!activity || activity.status !== "open") return null;
```

#### `"encounter-result"` — line 27594

```text
 27592 |   if (!activity || activity.status !== "open") return null;
 27593 |   const session = liveResultSessionForActivity(activity);
 27594 |   if (activity.type === "encounter-result" || activity.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT) return activity;
 27595 |   if (session?.sourceType === "encounter") return activity;
 27596 |   return null;
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 27594

```text
 27592 |   if (!activity || activity.status !== "open") return null;
 27593 |   const session = liveResultSessionForActivity(activity);
 27594 |   if (activity.type === "encounter-result" || activity.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT) return activity;
 27595 |   if (session?.sourceType === "encounter") return activity;
 27596 |   return null;
```

#### `recordEncounterTokenUse` — line 27604

```text
 27602 | }
 27603 |
 27604 | async function recordEncounterTokenUse(draft) {
 27605 |   const activity = currentEncounterPendingActivity();
 27606 |   if (!activity) {
```

#### `currentEncounterPendingActivity` — line 27605

```text
 27603 |
 27604 | async function recordEncounterTokenUse(draft) {
 27605 |   const activity = currentEncounterPendingActivity();
 27606 |   if (!activity) {
 27607 |     alert("Encounter Tokens are used during an encounter result window before the result is finalized.");
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 28000

```text
 27998 |     [TOKEN_TIMING_CATEGORIES.CONTROL]: 1,
 27999 |     [TOKEN_TIMING_CATEGORIES.PROTECTION]: 2,
 28000 |     [TOKEN_TIMING_CATEGORIES.ENCOUNTER]: 3,
 28001 |     [TOKEN_TIMING_CATEGORIES.CURSE]: 4,
 28002 |     [TOKEN_TIMING_CATEGORIES.MANUAL]: 9
```

#### `liveRefereePromptIsEncounterResult` — line 28008

```text
 28006 | }
 28007 |
 28008 | function liveRefereePromptIsEncounterResult(prompt) {
 28009 |   const activity = prompt?.pendingEvent;
 28010 |   return Boolean(prompt?.resultSession
```

#### `"encounter-result"` — line 28011

```text
 28009 |   const activity = prompt?.pendingEvent;
 28010 |   return Boolean(prompt?.resultSession
 28011 |     || activity?.type === "encounter-result"
 28012 |     || activity?.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT
 28013 |     || liveResultSessionForActivity(activity));
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 28012

```text
 28010 |   return Boolean(prompt?.resultSession
 28011 |     || activity?.type === "encounter-result"
 28012 |     || activity?.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT
 28013 |     || liveResultSessionForActivity(activity));
 28014 | }
```

#### `liveRefereePromptIsEncounterResult` — line 28038

```text
 28036 |   if (group.metadata?.resolverId === "delayParent"
 28037 |     && !teleportDelayableParentPlan(prompt?.pendingEvent, step).ok) return false;
 28038 |   if (group.metadata?.timingWindows?.includes(TOKEN_TIMING_WINDOWS.WHEEL_WINDOW)) return liveRefereePromptIsEncounterResult(prompt);
 28039 |   return true;
 28040 | }
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 28291

```text
 28289 |   const category = group?.metadata?.timingCategory || "";
 28290 |   if (prompt?.pendingEvent && category === TOKEN_TIMING_CATEGORIES.PROTECTION) return "Respond";
 28291 |   if (prompt?.pendingEvent && category === TOKEN_TIMING_CATEGORIES.ENCOUNTER) return "Modify";
 28292 |   return "Open Window";
 28293 | }
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 29401

```text
 29399 |     });
 29400 |   }
 29401 |   if (targetType === EFFECT_TARGET_TYPES.ENCOUNTER_RESULT) {
 29402 |     const encounterLine = liveRefereeCurrentEncounterLine(prompt);
 29403 |     return liveRefereeEffectTargetScreenMarkup({
```

#### `"encounter-result"` — line 41021

```text
 41019 |     item: summary, title: "Reroll replaced an encounter result", summary,
 41020 |     type: "encounter-reroll-token", categories: ["tokens", "pokemon", "encounter"],
 41021 |     tags: ["reroll-token", "encounter-result", resultKind || "result"],
 41022 |     playerIds: [actor.id, targetPlayerId].filter(Boolean), pokemonNames: [previousName, nextName].filter(Boolean),
 41023 |     tokenNames: [metadata.name || "Reroll"], linkedEventId: sourceEffectId,
```

#### `createPokemonResultTimingWindow` — line 41150

```text
 41148 |   state.selectedRandomPokemonSessionId = session.id;
 41149 |   state.randomPokemonDrawerOpen = true;
 41150 |   createPokemonResultTimingWindow(session, player);
 41151 |   saveState();
 41152 |   render();
```

#### `"encounter-reroll"` — line 41372

```text
 41370 |     linkedResponseId: savedRerollResponse?.id || "",
 41371 |     promptId: savedRerollResponse?.respondingToPromptId || "",
 41372 |     source: "encounter-reroll"
 41373 |   });
 41374 |   randomSession.rerollCount = Number(randomSession.rerollCount || 0) + 1;
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 46958

```text
 46956 |     activity = createTokenScenarioEvent({ actor, target, title: `${actor.name}'s encounter is about to begin.`, message: "Choose before-roll Encounter effects now.", type: "encounter-before-roll", targeted: false, payload: { encounterStage: "beforeRoll" } });
 46957 |   } else if (kind === "encounterResult") {
 46958 |     activity = createTokenScenarioEvent({ actor, target, title: `${actor.name} rolled Abra.`, message: `${actor.name} rolled Abra. The result is pending.`, type: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT, targeted: false, payload: { encounterStage: "result", resultName: "Abra" } });
 46959 |   } else if (kind === "wheelManual") {
 46960 |     const guided = (contract?.list || []).find((definition) => definition.resolverMode === EFFECT_RESOLUTION_MODES.GUIDED) || tokenDefinition;
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 47495

```text
 47493 |   const presets = {
 47494 |     encounter: {
 47495 |       type: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT,
 47496 |       title: `${actor.name} test encounter result`,
 47497 |       message: `${actor.name} rolled a test encounter result. Encounter tokens and trades may happen before finalizing.`,
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 47499

```text
 47497 |       message: `${actor.name} rolled a test encounter result. Encounter tokens and trades may happen before finalizing.`,
 47498 |       sourceType: "admin-test-encounter",
 47499 |       payload: { tokenTimingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER, effectApplication: "audit" }
 47500 |     },
 47501 |     control: {
```

### Retired Action/Encounter runtime — `app.js`

#### `Encounter Wheel` — line 2762

```text
  2760 |   "revenge": { names: ["Revenge"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Revenge Pending", note: "Post-curse revenge marker." },
  2761 |   "extra-encounter-token": { names: ["Extra Encounter Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Extra Encounter Available", note: "Spend during Action Phase to roll an extra encounter." },
  2762 |   "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, choiceLabel: "Pokemon Name", effectType: "log", note: "Remove one Pokemon per 5 entries from Encounter Wheel. Wheel editor hook pending." },
  2763 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
  2764 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
```

#### `sourceType === "encounter"` — line 23150

```text
 23148 |   if (!session || session.interactionEventId || !player) return null;
 23149 |   const resultName = session.resultDisplayName || session.resultPokemonName || "Pokemon result";
 23150 |   const isEncounter = session.sourceType === "encounter";
 23151 |   const activity = createInteractionEvent({
 23152 |     type: isEncounter ? "encounter-result" : "pokemon-result",
```

#### `sourceType === "encounter"` — line 26165

```text
 26163 |     const resultName = resultSession?.resultDisplayName || pendingEvent.payload?.resultName || "";
 26164 |     const sourceLabel = resultSession?.sourceLabel || pendingEvent.payload?.sourceLabel || pendingEvent.sourceType || "Event";
 26165 |     const isEncounterResult = Boolean(resultSession?.sourceType === "encounter" || pendingEvent.type === "encounter-result");
 26166 |     const tokenPrompt = liveTokenPromptDetails(pendingEvent, resultSession, targetState);
 26167 |     const promptDisplay = liveCurrentPromptDetails(pendingEvent, tokenPrompt, currentPromptStep, respondingToPromptStep);
```

#### `sourceType === "encounter"` — line 27595

```text
 27593 |   const session = liveResultSessionForActivity(activity);
 27594 |   if (activity.type === "encounter-result" || activity.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT) return activity;
 27595 |   if (session?.sourceType === "encounter") return activity;
 27596 |   return null;
 27597 | }
```

#### `Encounter Wheel` — line 38516

```text
 38514 | const bulletinQuestBank = Object.freeze({
 38515 |   easy: [
 38516 |     ["Pokemon Hunt", "Spin The Encounter Wheel Twice"],
 38517 |     ["Find An Item", "Visit The Department Store & Buy An Item"],
 38518 |     ["Ranger Check-In", "Visit The Ranger Base"],
```

### Retired Action/Encounter runtime — `scripts/test-token-sandbox.js`

#### `Encounter Wheel` — line 1076

```text
  1074 |   baseline.lingeringStatuses.push({ id: "sandbox-explicit-ongoing", type: "class-aura", status: "active", isOngoingEffect: true, series: "Kanto", gym: 1 });
  1075 |   baseline.randomPokemonSessions = [
  1076 |     { id: "sandbox-honey-source", sourceType: "encounter", sourceLabel: "Encounter Wheel", status: "confirmed", series: "Kanto", gym: 1, resultDisplayName: "Rotom-Wash", tierId: "B", level: 51, resultMetadata: { speciesId: "rotom", speciesName: "Rotom", form: "Wash" } },
  1077 |     { id: "sandbox-reroll-result", sourceType: "encounter", status: "pending", rerollable: true, playerId: "gold", ownerPlayerId: "gold", resultOwnerPlayerId: "gold", resultPokemonName: "abra", resultDisplayName: "Abra", resultMetadata: { key: "abra", displayName: "Abra" } }
  1078 |   ];
```

#### `sourceType: "encounter"` — line 1076

```text
  1074 |   baseline.lingeringStatuses.push({ id: "sandbox-explicit-ongoing", type: "class-aura", status: "active", isOngoingEffect: true, series: "Kanto", gym: 1 });
  1075 |   baseline.randomPokemonSessions = [
  1076 |     { id: "sandbox-honey-source", sourceType: "encounter", sourceLabel: "Encounter Wheel", status: "confirmed", series: "Kanto", gym: 1, resultDisplayName: "Rotom-Wash", tierId: "B", level: 51, resultMetadata: { speciesId: "rotom", speciesName: "Rotom", form: "Wash" } },
  1077 |     { id: "sandbox-reroll-result", sourceType: "encounter", status: "pending", rerollable: true, playerId: "gold", ownerPlayerId: "gold", resultOwnerPlayerId: "gold", resultPokemonName: "abra", resultDisplayName: "Abra", resultMetadata: { key: "abra", displayName: "Abra" } }
  1078 |   ];
```

#### `sourceType: "encounter"` — line 1077

```text
  1075 |   baseline.randomPokemonSessions = [
  1076 |     { id: "sandbox-honey-source", sourceType: "encounter", sourceLabel: "Encounter Wheel", status: "confirmed", series: "Kanto", gym: 1, resultDisplayName: "Rotom-Wash", tierId: "B", level: 51, resultMetadata: { speciesId: "rotom", speciesName: "Rotom", form: "Wash" } },
  1077 |     { id: "sandbox-reroll-result", sourceType: "encounter", status: "pending", rerollable: true, playerId: "gold", ownerPlayerId: "gold", resultOwnerPlayerId: "gold", resultPokemonName: "abra", resultDisplayName: "Abra", resultMetadata: { key: "abra", displayName: "Abra" } }
  1078 |   ];
  1079 |   const baselineBytes = JSON.stringify(baseline);
```

### Retired Action/Encounter runtime — `token-control-effects.js`

#### `sourceType === "encounter"` — line 2344

```text
  2342 |
  2343 |   function resolveHoneyEncounterCopy(state, input = {}, options = {}) {
  2344 |     const source = (state.randomPokemonSessions || []).find((record) => record.id === input.sourceRandomPokemonSessionId && record.sourceType === "encounter" && record.status === "confirmed");
  2345 |     const owner = (state.players || []).find((player) => player.id === input.ownerPlayerId);
  2346 |     if (!source || !owner) return { result: "systemFailure", refundRequired: true, reason: "Choose one completed eligible Encounter result from this Action Phase." };
```

#### `sourceType: "encounter"` — line 2368

```text
  2366 |       };
  2367 |       const copiedSession = {
  2368 |         id: makeId("random-pokemon"), sourceType: "encounter", sourceLabel: "Honey copied Encounter",
  2369 |         ownerPlayerId: owner.id, playerId: owner.id, resultOwnerPlayerId: owner.id,
  2370 |         status: "pending", rerollable: false, resultDisplayName: source.resultDisplayName,
```

### Retired Action/Encounter runtime — `token-effect-contract.js`

#### `encounter-token-runtime` — line 110

```text
   108 |     "token-inventory-runtime",
   109 |     "standard-curse-species-lifecycle",
   110 |     "encounter-token-runtime",
   111 |     "follow-me-e2e",
   112 |     "ditto-inventory-e2e",
```

#### `encounter-token-runtime` — line 262

```text
   260 |     "extra-encounter-token": Object.freeze({
   261 |       status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
   262 |       tests: Object.freeze(["token-declaration-timing", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "encounter-token-runtime"]),
   263 |       evidence: "Action-only declaration, exact chosen-player validation, one authoritative Encounter roll grant, open-session extension, standalone session creation, stable grant identity, duplicate prevention, refresh persistence, normal Encounter completion, and snapshot undo are covered by focused runtime and integration tests.",
   264 |       verifiedAt: "2026-07-29",
```

#### `encounter-token-runtime` — line 332

```text
   330 |     "reroll-token": Object.freeze({
   331 |       status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
   332 |       tests: Object.freeze(["encounter-token-runtime", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "lifecycle-completion-slice-e2e"]),
   333 |       evidence: "Exact unresolved Encounter and wheel result identity, canonical replacement, superseded original revision, stale rejection, duplicate operation identity, multiple-copy inventory safety, normal acquisition continuation, production refresh, causal History undo, and sandbox isolation are covered by TLS-004, BROWSER-028, and TSB-027.",
   334 |       verifiedAt: "2026-08-04",
```

#### `encounter-token-runtime` — line 339

```text
   337 |     "honey-token": Object.freeze({
   338 |       status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
   339 |       tests: Object.freeze(["encounter-token-runtime", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "lifecycle-completion-slice-e2e"]),
   340 |       evidence: "Exact finalized Encounter selection, fresh nonrecursive copy identity, canonical species/form/tier/level and intrinsic payload, normal acquisition handoff, duplicate and stale safety, production refresh, causal History undo through acquired roster creation, and sandbox isolation are covered by TLS-005, SEB-004, BROWSER-029, and TSB-027.",
   341 |       verifiedAt: "2026-08-04",
```

#### `Encounter Wheel` — line 766

```text
   764 |
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
```

### V1-named current infrastructure — `app.js`

#### `TOKEN_TIMING_ENGINE_V1_DEFINITIONS` — line 2970

```text
  2968 | });
  2969 |
  2970 | const TOKEN_TIMING_ENGINE_V1_DEFINITIONS = Object.freeze({
  2971 |   "extra-encounter-token": Object.freeze({
  2972 |     id: "extra-encounter-token",
```

#### `TOKEN_TIMING_ENGINE_V1_DEFINITIONS` — line 3154

```text
  3152 |   const key = slugify(tokenName);
  3153 |   if (!key) return null;
  3154 |   const entry = Object.entries(TOKEN_TIMING_ENGINE_V1_DEFINITIONS)
  3155 |     .find(([id, definition]) => slugify(id) === key || (definition.names || []).some((name) => slugify(name) === key));
  3156 |   return entry ? { ...entry[1], id: entry[1].id || entry[0], source: "engine-v1" } : null;
```
