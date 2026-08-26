# Rival Saga V1 Purge — Final Whole-Repo Audit

Generated from `1e735bfe646a8d483ae4705b51cbe0f9f9204165`.

Excluded from contamination scoring: generated V1_PURGE reports, purge-stage scripts, the autopilot command file, and the autopilot workflow itself.

The Rules-review text group is intentionally informational: old terminology inside still-unreviewed Perk/Bulletin rules is not automatically executable V1 contamination.

## Summary

| Group | Category | File | Marker | Count | Lines |
|---|---|---|---|---:|---|
| Current Route preservation | docs | `IMPLEMENTATION_STATUS.md` | `routeEncounterBySeriesId` | 1 | 12 |
| Current Route preservation | docs | `LIVE_TABLE_ARCHITECTURE.md` | `randomPokemonSessions` | 1 | 205 |
| Current Route preservation | docs | `TOKEN_TIMING_ARCHITECTURE.md` | `pokemon-result` | 1 | 149 |
| Current Route preservation | other | `interaction-situation-lifecycle.js` | `randomPokemonSessions` | 1 | 232 |
| Current Route preservation | production/runtime | `app.js` | `pokemon-result` | 13 | 642, 2700, 3425, 23073, 23125, 25428, 25455, 26088, 40895, 41648, 41649, 45346, 45347 |
| Current Route preservation | production/runtime | `app.js` | `pokemon-reroll` | 9 | 644, 655, 656, 23080, 40894, 41230, 41246, 41266, 41272 |
| Current Route preservation | production/runtime | `app.js` | `randomPokemonSessions` | 24 | 2510, 3731, 4251, 4275, 4381, 4425, 21987, 22000, 25430, 26643, 26655, 40904, 40905, 40910, 41020, 41021, 41028, 41077, 41177, 41290, 41316, 46695, 59135, 59201 |
| Current Route preservation | production/runtime | `app.js` | `routeEncounterBySeriesId` | 7 | 22101, 42796, 42798, 42800, 42803, 42804, 42805 |
| Current Route preservation | production/runtime | `app.js` | `useV2RouteRerollToken` | 2 | 44641, 61416 |
| Current Route preservation | production/runtime | `app.js` | `useV2ExtraEncounter` | 2 | 44661, 61434 |
| Current Route preservation | production/runtime | `app.js` | `applyV2RouteRepel` | 2 | 44679, 61480 |
| Current Route preservation | production/runtime | `app.js` | `useV2MasterBallOnOpportunity` | 2 | 44690, 61483 |
| Current Route preservation | production/runtime | `server.js` | `randomPokemonSessions` | 1 | 1293 |
| Current Route preservation | production/runtime | `styles.css` | `pokemon-result` | 15 | 4866, 16059, 16443, 16456, 16457, 16460, 16467, 16474, 16481, 16494, 16498, 16499, 16500, 16542, 16556 |
| Current Route preservation | production/runtime | `token-effect-contract.js` | `useV2ExtraEncounter` | 1 | 740 |
| Current Route preservation | production/runtime | `token-effect-contract.js` | `applyV2RouteRepel` | 1 | 741 |
| Current Route preservation | production/runtime | `token-effect-contract.js` | `useV2MasterBallOnOpportunity` | 1 | 745 |
| Current Route preservation | tests | `scripts/test-settled-effect-batch.js` | `randomPokemonSessions` | 3 | 56, 169, 195 |
| Current Route preservation | tests | `scripts/test-token-browser.js` | `randomPokemonSessions` | 11 | 2572, 2581, 2603, 2621, 2638, 2641, 2645, 2657, 2668, 2670, 2671 |
| Current Route preservation | tests | `scripts/test-token-lifecycle-slice.js` | `randomPokemonSessions` | 4 | 94, 107, 120, 130 |
| Current Route preservation | tests | `scripts/test-v2-route-browser-mount.js` | `routeEncounterBySeriesId` | 2 | 78, 80 |
| Current Route preservation | tests | `scripts/test-v2-route-runtime-sequences.js` | `routeEncounterBySeriesId` | 2 | 400, 405 |
| Current Route preservation | tests | `versions/next-action-phase/tests/test-route-encounter-engine.js` | `routeEncounterBySeriesId` | 4 | 90, 885, 1228, 1296 |
| Current Route preservation | versions | `versions/next-action-phase/ACTION_PHASE_V2_PLAN.md` | `routeEncounterBySeriesId` | 1 | 87 |
| Current Route preservation | versions | `versions/next-action-phase/ENCOUNTER_HIDDEN_GROTTO_MIGRATION_AUDIT.md` | `randomPokemonSessions` | 3 | 34, 68, 79 |
| Current Route preservation | versions | `versions/next-action-phase/implementation/route-action-resolver.js` | `routeEncounterBySeriesId` | 6 | 112, 119, 120, 121, 347, 348 |
| Current Route preservation | versions | `versions/next-action-phase/implementation/route-series-lifecycle.js` | `routeEncounterBySeriesId` | 2 | 127, 128 |
| Current Route preservation | versions | `versions/next-action-phase/README.md` | `routeEncounterBySeriesId` | 1 | 36 |
| Current Route preservation | versions | `versions/next-action-phase/ROUTE_ENCOUNTER_ENGINE.md` | `routeEncounterBySeriesId` | 1 | 210 |
| Obsolete Encounter QA/tooling | docs | `TOKEN_QA_COVERAGE.md` | `test-encounter-token-runtime.js` | 1 | 2776 |
| Obsolete Encounter QA/tooling | scripts/tooling | `scripts/token-qa-coverage-data.js` | `test-encounter-token-runtime.js` | 1 | 1391 |
| Obsolete Encounter QA/tooling | versions | `versions/next-action-phase/ENCOUNTER_HIDDEN_GROTTO_MIGRATION_AUDIT.md` | `Encounter runtime` | 1 | 61 |
| Retired Action/version runtime | docs | `ARCHITECTURE.md` | `action-phase-v1` | 1 | 80 |
| Retired Action/version runtime | docs | `IMPLEMENTATION_STATUS.md` | `action-phase-v1` | 1 | 8 |
| Retired Action/version runtime | other | `game-shell-contract.js` | `ACTION_PHASE_VERSION_V1` | 3 | 10, 53, 55 |
| Retired Action/version runtime | other | `game-shell-contract.js` | `action-phase-v1` | 1 | 10 |
| Retired Action/version runtime | scripts/tooling | `scripts/fixtures/game-shell-fixtures.js` | `action-phase-v1` | 2 | 22, 37 |
| Retired Action/version runtime | scripts/tooling | `scripts/v1-purge-inspect.js` | `ACTION_PHASE_VERSION_V1` | 3 | 93, 99, 117 |
| Retired Action/version runtime | tests | `scripts/test-game-shell-loading.js` | `action-phase-v1` | 4 | 61, 72, 99, 117 |
| Retired Action/version runtime | tests | `scripts/test-v2-route-browser-mount.js` | `ACTION_PHASE_VERSION_V1` | 1 | 52 |
| Retired Action/version runtime | tests | `scripts/test-v2-route-browser-mount.js` | `action-phase-v1` | 1 | 54 |
| Retired Action/version runtime | tests | `scripts/test-v2-route-runtime-sequences.js` | `action-phase-v1` | 1 | 175 |
| Retired Action/version runtime | versions | `versions/next-action-phase/ENCOUNTER_HIDDEN_GROTTO_MIGRATION_AUDIT.md` | `current-action-phase` | 1 | 9 |
| Retired Encounter event/taxonomy | other | `token-control-controller.js` | `encounterCopyRecords` | 1 | 73 |
| Retired Encounter event/taxonomy | tests | `scripts/test-settled-effect-batch.js` | `encounterCopyRecords` | 1 | 55 |
| Retired Encounter event/taxonomy | tests | `scripts/test-settled-effect-batch.js` | `encounterSessionId` | 1 | 172 |
| Retired Encounter event/taxonomy | tests | `scripts/test-token-browser.js` | `encounterSessionId` | 1 | 2572 |
| Retired Encounter event/taxonomy | tests | `scripts/test-token-browser.js` | `"encounter-reroll"` | 1 | 2588 |
| Retired Encounter Wheel runtime | docs | `LIVE_TABLE_ARCHITECTURE.md` | `encounterSessions` | 1 | 205 |
| Retired Encounter Wheel runtime | docs | `TOKEN_EFFECT_MATRIX.md` | `encounter-token-runtime` | 3 | 584, 604, 684 |
| Retired Encounter Wheel runtime | docs | `TOKEN_QA_COVERAGE.md` | `encounter-token-runtime` | 1 | 2776 |
| Retired Encounter Wheel runtime | docs | `TOKEN_QA_COVERAGE.md` | `encounter-token-runtime.js` | 1 | 2776 |
| Retired Encounter Wheel runtime | other | `token-sandbox-session.js` | `encounterModalOpen` | 1 | 41 |
| Retired Encounter Wheel runtime | other | `token-sandbox-session.js` | `selectedEncounterSessionId` | 1 | 42 |
| Retired Encounter Wheel runtime | scripts/tooling | `scripts/import-pokeapi-hoenn-encounters.js` | `encounterWheelDefinitions` | 2 | 347, 348 |
| Retired Encounter Wheel runtime | scripts/tooling | `scripts/token-qa-coverage-data.js` | `encounter-token-runtime` | 1 | 1391 |
| Retired Encounter Wheel runtime | scripts/tooling | `scripts/token-qa-coverage-data.js` | `encounter-token-runtime.js` | 1 | 1391 |
| Retired Encounter Wheel runtime | scripts/tooling | `scripts/v1-purge-inspect.js` | `encounter-token-runtime` | 1 | 130 |
| Retired Encounter Wheel runtime | scripts/tooling | `scripts/v1-purge-inspect.js` | `encounter-token-runtime.js` | 1 | 130 |
| Retired Encounter Wheel runtime | tests | `scripts/test-backend-persistence.js` | `locationId: "encounter"` | 6 | 128, 135, 141, 184, 489, 496 |
| Retired Encounter Wheel runtime | tests | `scripts/test-backend-persistence.js` | `serviceId: "encounter-wheel"` | 6 | 129, 135, 142, 185, 490, 496 |
| Retired Encounter Wheel runtime | tests | `scripts/test-backend-persistence.js` | `encounterSessions` | 5 | 148, 443, 469, 502, 522 |
| Retired Encounter Wheel runtime | tests | `scripts/test-provisional-declaration-runtime.js` | `locationId: "encounter"` | 2 | 126, 146 |
| Retired Encounter Wheel runtime | tests | `scripts/test-provisional-declaration-server.js` | `locationId: "encounter"` | 2 | 241, 255 |
| Retired Encounter Wheel runtime | tests | `scripts/test-settled-effect-batch.js` | `sourceType: "encounter"` | 1 | 170 |
| Retired Encounter Wheel runtime | tests | `scripts/test-token-browser.js` | `encounterSessions` | 6 | 976, 998, 1028, 1030, 1051, 2571 |
| Retired Encounter Wheel runtime | tests | `scripts/test-token-browser.js` | `selectedEncounterSessionId` | 3 | 998, 1013, 1054 |
| Retired Encounter Wheel runtime | tests | `scripts/test-token-browser.js` | `encounterModalOpen` | 2 | 1014, 1055 |
| Retired Encounter Wheel runtime | tests | `scripts/test-token-browser.js` | `sourceType: "encounter"` | 3 | 2572, 2622, 2623 |
| Retired Encounter Wheel runtime | tests | `scripts/test-token-lifecycle-slice.js` | `sourceType: "encounter"` | 2 | 94, 120 |
| Retired Encounter Wheel runtime | versions | `versions/next-action-phase/ENCOUNTER_HIDDEN_GROTTO_MIGRATION_AUDIT.md` | `encounterWheelDefinitions` | 1 | 32 |
| Retired Encounter Wheel runtime | versions | `versions/next-action-phase/ENCOUNTER_HIDDEN_GROTTO_MIGRATION_AUDIT.md` | `encounterSessions` | 2 | 33, 79 |
| Retired Encounter Wheel runtime | versions | `versions/next-action-phase/ENCOUNTER_HIDDEN_GROTTO_MIGRATION_AUDIT.md` | `encounter-token-runtime` | 1 | 49 |
| Retired Encounter Wheel runtime | versions | `versions/next-action-phase/ENCOUNTER_HIDDEN_GROTTO_MIGRATION_AUDIT.md` | `encounter-token-runtime.js` | 1 | 49 |
| Retired Hidden Grotto runtime | scripts/tooling | `scripts/v1-purge-inspect.js` | `hiddenGrottoSessions` | 1 | 105 |
| Retired Hidden Grotto runtime | scripts/tooling | `scripts/v1-purge-inspect.js` | `startHiddenGrottoSession` | 1 | 106 |
| Retired Hidden Grotto runtime | tests | `scripts/test-action-operation-contract.js` | `hidden-grotto` | 1 | 18 |
| Retired Hidden Grotto runtime | tests | `scripts/test-action-operation-contract.js` | `startHiddenGrottoSession` | 1 | 84 |
| Retired Hidden Grotto runtime | tests | `scripts/test-action-phase-balance.js` | `startHiddenGrottoSession` | 1 | 81 |
| Retired Hidden Grotto runtime | versions | `versions/next-action-phase/ENCOUNTER_HIDDEN_GROTTO_MIGRATION_AUDIT.md` | `hiddenGrottoSessions` | 2 | 44, 79 |
| Rules-review text only | docs | `ARCHITECTURE.md` | `Encounter Wheel` | 3 | 82, 535, 542 |
| Rules-review text only | docs | `ARCHITECTURE.md` | `Hidden Grotto` | 2 | 82, 543 |
| Rules-review text only | docs | `CODEX_RULES_UNDERSTANDING_AUDIT.md` | `Hidden Grotto` | 1 | 38 |
| Rules-review text only | docs | `docs/ROUTE_ENCOUNTER_RULES_SHARE.md` | `Encounter Wheel` | 3 | 5, 158, 237 |
| Rules-review text only | docs | `IMPLEMENTATION_STATUS.md` | `Hidden Grotto` | 1 | 66 |
| Rules-review text only | docs | `LIVE_TABLE_ARCHITECTURE.md` | `Hidden Grotto` | 1 | 248 |
| Rules-review text only | docs | `RULEBOOK_ALIGNMENT_AUDIT.md` | `Hidden Grotto` | 1 | 19 |
| Rules-review text only | docs | `TOKEN_EFFECT_MATRIX.md` | `Encounter Wheel` | 1 | 601 |
| Rules-review text only | production/runtime | `app.js` | `Hidden Grotto` | 4 | 1121, 1265, 2165, 38416 |
| Rules-review text only | production/runtime | `app.js` | `Encounter Wheel` | 1 | 38390 |
| Rules-review text only | scripts/tooling | `scripts/import-pokeapi-hoenn-encounters.js` | `Encounter Wheel` | 1 | 346 |
| Rules-review text only | scripts/tooling | `scripts/v1-purge-inspect.js` | `Encounter Wheel` | 2 | 126, 142 |
| Rules-review text only | scripts/tooling | `scripts/v1-purge-inspect.js` | `Hidden Grotto` | 2 | 129, 141 |
| Rules-review text only | tests | `scripts/test-action-operation-contract.js` | `Hidden Grotto` | 1 | 83 |
| Rules-review text only | tests | `scripts/test-token-browser.js` | `Encounter Wheel` | 3 | 2572, 2622, 2623 |
| Rules-review text only | tests | `scripts/test-token-lifecycle-slice.js` | `Encounter Wheel` | 1 | 120 |
| Rules-review text only | tests | `scripts/test-v2-route-browser-mount.js` | `Encounter Wheel` | 2 | 68, 72 |
| Rules-review text only | versions | `versions/next-action-phase/ACTION_PHASE_V2_PLAN.md` | `Encounter Wheel` | 1 | 91 |
| Rules-review text only | versions | `versions/next-action-phase/ACTION_PHASE_V2_PLAN.md` | `Hidden Grotto` | 1 | 91 |
| Rules-review text only | versions | `versions/next-action-phase/ENCOUNTER_HIDDEN_GROTTO_MIGRATION_AUDIT.md` | `Hidden Grotto` | 10 | 1, 14, 24, 42, 43, 44, 45, 59, 75, 76 |
| Rules-review text only | versions | `versions/next-action-phase/ENCOUNTER_HIDDEN_GROTTO_MIGRATION_AUDIT.md` | `Encounter Wheel` | 9 | 8, 14, 24, 31, 39, 50, 58, 59, 76 |
| Rules-review text only | versions | `versions/next-action-phase/README.md` | `Encounter Wheel` | 1 | 26 |
| Rules-review text only | versions | `versions/next-action-phase/README.md` | `Hidden Grotto` | 1 | 26 |
| Rules-review text only | versions | `versions/next-action-phase/ROUTE_ENCOUNTER_ENGINE.md` | `Encounter Wheel` | 1 | 9 |
| Rules-review text only | versions | `versions/next-action-phase/ROUTE_ENCOUNTER_ENGINE.md` | `Hidden Grotto` | 1 | 9 |

## Detailed contexts

### Current Route preservation — docs — `IMPLEMENTATION_STATUS.md`

#### `routeEncounterBySeriesId` — line 12

```text
    10 | V1 is now documented as maintenance/freeze-oriented, while V2 is the active gameplay-development target. The isolated V2 Route Encounter engine lives under `versions/next-action-phase/` and the browser mount now adapts its current Route Action, opportunity, result, and acquisition contract into persisted `state.v2` buckets. Fresh generated Routes 1-9 each independently roll and persist hidden 20-30 ordinary resident populations from the approved weighted Route distributions, plus 2 hidden permanent Premium Residents from Ultra Elite, Master, and Master Elite tiers. Existing persisted Route populations, including older 24-resident Routes, remain authoritative and are not regenerated. The route system persists hidden Route Quality for Routes 3-9, creates exactly one opportunity per normal Route Action, draws and publicly discovers permanent residents with reduced encounter weight for Premium Residents, preserves same-result reroll revisions on the same Route, checks personal duplicate ownership, maintains per-player private reveals, applies exact Battle Tier suppressions for Repel, mounts source-agnostic Route Effect records for private/table reveal and temporary injection operations, adds exactly four temporary Primary-Type encounter options to one pending opportunity using weighted tier rolls capped at Master, enforces Extra Encounter progression limits, constrains Master Ball to public/private known permanent residents, and finalizes acquisition records. Player-specific Duplicate ON/OFF preferences now persist only sparse OFF records by `playerId -> routeId -> residentId`; OFF can be set only for permanent residents known and owned by that player, filters only that player's standard random draw and random reroll pool, leaves explicit mechanics such as Master Ball/reveal/Repel unaffected, and does not mutate resident populations, Premium slot metadata, public discoveries, or another player's encounter pool. Extra Encounter's mounted browser contract purchases the approved $2,500 freely purchasable/storable Token as an exact inventory record, preflights the acting player's authoritative encounter pool before consumption, then consumes that exact record for one additional Route opportunity without spending a V2 Action.
    11 |
    12 | The V2 Route engine now adapts real Rival Saga Pokemon data using `pokemon-balance-tiers.js` for approved Battle Tiers and `pokemon-build-data.js` for type/species/regional metadata. The current eligible Route catalog contains 952 entries: LC 339, LC Elite 135, Safari 159, Poke 85, Great 70, Ultra 69, Ultra Elite 51, Master 32, and Master Elite 12. Valid Elite tiers outside ordinary or Premium Resident generation are reported as excluded. Existing repository aliases resolve `Basculegion-Blue` to `basculegion-female` and `Basculegion-Red` to `basculegion-male`; the real-data audit now reports zero malformed source rows and 26 alias resolutions. Regional Variance is active for Kanto, Johto, Hoenn, Sinnoh, Unova, Kalos, Alola, Galar, and Paldea Series generation. For each legal Battle Tier pool after same-Route duplicates are removed, every candidate receives universal-pool weight `0.5`, and each featured/current-generation candidate also receives featured-pool bonus `0.5 * (legalCandidateCount / featuredCandidateCount)`. Cross-Route repeat suppression multiplies subsequent placements by `0.25 ** priorPlacementCount`. Premium Residents do not apply Regional Variance for now, and Hisui-form regional identities remain explicitly unresolved rather than treated as a tenth Series region. Isolated Series initialization stores Route state at `state.v2.routeEncounterBySeriesId[seriesId]`, preserves existing state on repeated initialization, and normalizes JSON-safe reload state without rerolling resident populations or Route Quality. `npm.cmd run audit:v2-routes` runs the developer real-data generation audit and verifies regional elevation over unbiased same-tier baselines.
    13 |
    14 | Route Exploration is now the first implemented isolated V2 Action type. `route-exploration` validates player, Series Route state, chosen Route, available V2 Action budget, and stable Action ID; commits exactly one reversible Action spend; creates exactly one normal Route opportunity; resolves one Route result; finalizes one acquisition; creates one normal owned Pokemon record in `state.pokemonRecords`; links it to the owner's `pokemonIds`; and settles only after acquisition exists. The persisted causal chain is Action ID -> Spend ID -> Opportunity ID -> Result ID -> Acquisition ID -> Pokemon record ID. Duplicate Action commits, duplicate encounter draws, and duplicate acquisition requests return existing records without duplicating spends/opportunities/Pokemon. Reload tests cover committed-before-roll, unresolved result, rerolled result, acquired-but-unsettled, and fully settled states. Undo is not implemented, but the exact IDs needed for a later causal reversal are now recorded.
```

### Current Route preservation — docs — `LIVE_TABLE_ARCHITECTURE.md`

#### `randomPokemonSessions` — line 205

```text
   203 | - `state.log`.
   204 | - `state.moneyLedger`.
   205 | - Session objects such as `encounterSessions` and `randomPokemonSessions`.
   206 |
   207 | This avoids making Live Table a second source of truth.
```

### Current Route preservation — docs — `TOKEN_TIMING_ARCHITECTURE.md`

#### `pokemon-result` — line 149

```text
   147 | | Target Type | Current/Planned Mapping |
   148 | | --- | --- |
   149 | | `encounterResult` | Current `encounter-result` or `pokemon-result` interaction event |
   150 | | `controlToken` | Future split from current `token-activation` |
   151 | | `protectionResponse` | Current response record on an interaction event |
```

### Current Route preservation — other — `interaction-situation-lifecycle.js`

#### `randomPokemonSessions` — line 232

```text
   230 |       ["tokenActivations", "previousTokenActivations"],
   231 |       ["playerNotifications", "previousPlayerNotifications"],
   232 |       ["randomPokemonSessions", "previousRandomPokemonSessions"],
   233 |       ["globalPokemonRules", "previousGlobalPokemonRules"],
   234 |       ["banlistHistory", "previousBanlistHistory"],
```

### Current Route preservation — production/runtime — `app.js`

#### `pokemon-result` — line 642

```text
   640 |     responseTypes: ["immunity"]
   641 |   },
   642 |   "pokemon-result": {
   643 |     label: "Pokemon Result",
   644 |     responseTypes: ["pokemon-reroll"]
```

#### `pokemon-reroll` — line 644

```text
   642 |   "pokemon-result": {
   643 |     label: "Pokemon Result",
   644 |     responseTypes: ["pokemon-reroll"]
   645 |   }
   646 | });
```

#### `pokemon-reroll` — line 655

```text
   653 |     description: "Cancel a token, perk, or class effect targeting you."
   654 |   },
   655 |   "pokemon-reroll": {
   656 |     id: "pokemon-reroll",
   657 |     label: "Reroll Pokemon Result",
```

#### `pokemon-reroll` — line 656

```text
   654 |   },
   655 |   "pokemon-reroll": {
   656 |     id: "pokemon-reroll",
   657 |     label: "Reroll Pokemon Result",
   658 |     tokenNames: ["Reroll Token"],
```

#### `randomPokemonSessions` — line 2510

```text
  2508 |     wheelDrawerOpen: false,
  2509 |     skipWheelAnimation: false,
  2510 |     randomPokemonSessions: [],
  2511 |     pokemonFamilyTierCache: {},
  2512 |     pokemonSpriteVariants: {},
```

#### `pokemon-result` — line 2700

```text
  2698 |     timing: "contextual-result",
  2699 |     targetType: "manual",
  2700 |     validTargets: ["random-pokemon-result", "pokemon-result", "quest-roll"],
  2701 |     excludedSources: ["game-corner-gamble-wheel"],
  2702 |     effect: "reroll"
```

#### `pokemon-result` — line 3425

```text
  3423 |     const resultSession = liveResultSessionForActivity?.(pendingEvent);
  3424 |     const pendingKind = `${pendingEvent.type || ""} ${pendingEvent.sourceType || ""}`;
  3425 |     if (resultSession || /pokemon-result/i.test(pendingKind)) {
  3426 |       windows.add(TOKEN_TIMING_WINDOWS.WHEEL_WINDOW);
  3427 |     } else if (/wheel/i.test(pendingKind)) {
```

#### `randomPokemonSessions` — line 3731

```text
  3729 |     previousPlayerNotifications: structuredClone(state.playerNotifications || []),
  3730 |     previousWheelSessions: structuredClone(state.wheelSessions || []),
  3731 |     previousRandomPokemonSessions: structuredClone(state.randomPokemonSessions || []),
  3732 |     previousInteractionEvents: structuredClone(state.interactionEvents || []),
  3733 |     previousTransactions: structuredClone(state.transactions || []),
```

#### `randomPokemonSessions` — line 4251

```text
  4249 |     copiedTokenRelationships: causalIdCollectionDelta(snapshot.previousCopiedTokenRelationships, state.copiedTokenRelationships),
  4250 |     wheelSessions: causalIdCollectionDelta(snapshot.previousWheelSessions, state.wheelSessions),
  4251 |     randomPokemonSessions: causalIdCollectionDelta(snapshot.previousRandomPokemonSessions, state.randomPokemonSessions),
  4252 |     delayedEffects: causalIdCollectionDelta(snapshot.previousDelayedEffects, state.delayedEffects),
  4253 |     broughtTeamSnapshots: causalIdCollectionDelta(snapshot.previousBroughtTeamSnapshots, state.broughtTeamSnapshots),
```

#### `randomPokemonSessions` — line 4275

```text
  4273 |     "pokemonRecords", "statuses", "activations", "consumptions", "transactions", "notifications",
  4274 |     "effectOperations", "copiedActivations", "copiedTokenRelationships", "wheelSessions",
  4275 |     "randomPokemonSessions", "delayedEffects", "broughtTeamSnapshots", "postPayoutProcedures",
  4276 |     "pokemonLog", "banlistHistory"
  4277 |   ];
```

#### `randomPokemonSessions` — line 4381

```text
  4379 |   state.copiedTokenRelationships = applyCausalIdCollectionUndo(state.copiedTokenRelationships, undoData.copiedTokenRelationships);
  4380 |   state.wheelSessions = applyCausalIdCollectionUndo(state.wheelSessions, undoData.wheelSessions);
  4381 |   state.randomPokemonSessions = applyCausalIdCollectionUndo(state.randomPokemonSessions, undoData.randomPokemonSessions);
  4382 |   state.delayedEffects = applyCausalIdCollectionUndo(state.delayedEffects, undoData.delayedEffects);
  4383 |   state.broughtTeamSnapshots = applyCausalIdCollectionUndo(state.broughtTeamSnapshots, undoData.broughtTeamSnapshots);
```

#### `randomPokemonSessions` — line 4425

```text
  4423 |     }
  4424 |   }
  4425 |   if (state.selectedRandomPokemonSessionId && !(state.randomPokemonSessions || []).some((entry) => entry.id === state.selectedRandomPokemonSessionId)) {
  4426 |     state.selectedRandomPokemonSessionId = "";
  4427 |     state.randomPokemonDrawerOpen = false;
```

#### `randomPokemonSessions` — line 21987

```text
 21985 |   nextState.wheelDrawerOpen = Boolean(nextState.wheelDrawerOpen);
 21986 |   nextState.skipWheelAnimation = Boolean(nextState.skipWheelAnimation);
 21987 |   nextState.randomPokemonSessions ||= [];
 21988 |   nextState.pokemonFamilyTierCache ||= {};
 21989 |   pokemonFamilyTierCache = nextState.pokemonFamilyTierCache;
```

#### `randomPokemonSessions` — line 22000

```text
 21998 |     session.battlePhaseStayLength = Number(session.battlePhaseStayLength || 0);
 21999 |   });
 22000 |   nextState.randomPokemonSessions.forEach((session) => {
 22001 |     session.status = ["pending", "confirmed", "rerolled", "undone", "cancelled"].includes(session.status) ? session.status : "pending";
 22002 |     session.rerollCount = Number(session.rerollCount || 0);
```

#### `routeEncounterBySeriesId` — line 22101

```text
 22099 |   nextState.v2 ||= {};
 22100 |   if (!nextState.v2 || typeof nextState.v2 !== "object" || Array.isArray(nextState.v2)) nextState.v2 = {};
 22101 |   nextState.v2.routeEncounterBySeriesId ||= {};
 22102 |   nextState.v2.actionPhaseBySeriesId ||= {};
 22103 |   nextState.v2.routeEffectOperationsBySeriesId ||= {};
```

#### `pokemon-result` — line 23073

```text
 23071 |   const resultName = session.resultDisplayName || session.resultPokemonName || "Pokemon result";
 23072 |   const activity = createInteractionEvent({
 23073 |     type: "pokemon-result",
 23074 |     title: `${player.name} rolled ${resultName}`,
 23075 |     message: `${session.sourceLabel || "Pokemon result"} is pending before it resolves.`,
```

#### `pokemon-reroll` — line 23080

```text
 23078 |     sourceType: session.sourceType || "random-pokemon",
 23079 |     sourceId: session.id,
 23080 |     responseTypes: ["pokemon-reroll"],
 23081 |     eligiblePlayerIds: state.players.map((entry) => entry.id),
 23082 |     series: session.series || state.series,
```

#### `pokemon-result` — line 23125

```text
 23123 |   if (/class/i.test(activity.sourceType || "")) return "class-activation";
 23124 |   if (/perk/i.test(activity.sourceType || "")) return "perk-activation";
 23125 |   if (/pokemon-result|random-pokemon|encounter/i.test(`${activity.type || ""} ${activity.sourceType || ""}`)) return "pokemon-result";
 23126 |   return "";
 23127 | }
```

#### `pokemon-result` — line 25428

```text
 25426 |   if (!activity) return null;
 25427 |   const sessionId = activity.payload?.randomPokemonSessionId
 25428 |     || (activity.type === "pokemon-result" ? activity.sourceId : "");
 25429 |   if (!sessionId) return null;
 25430 |   return (targetState.randomPokemonSessions || []).find((session) => session.id === sessionId && session.status === "pending") || null;
```

#### `randomPokemonSessions` — line 25430

```text
 25428 |     || (activity.type === "pokemon-result" ? activity.sourceId : "");
 25429 |   if (!sessionId) return null;
 25430 |   return (targetState.randomPokemonSessions || []).find((session) => session.id === sessionId && session.status === "pending") || null;
 25431 | }
 25432 |
```

#### `pokemon-result` — line 25455

```text
 25453 |     const resultName = resultSession?.resultDisplayName || activity?.payload?.resultName || "a Pokemon result";
 25454 |     return {
 25455 |       type: "pokemon-result-pending",
 25456 |       statusLabel: "Waiting to Resolve",
 25457 |       title: "Pokemon Result Pending",
```

#### `pokemon-result` — line 26088

```text
 26086 |       return {
 26087 |         id: `live-${pendingEvent.id}`,
 26088 |         type: tokenPrompt?.type || "pokemon-result-pending",
 26089 |         statusLabel: promptDisplay.statusLabel || "Waiting to Resolve",
 26090 |         title: promptDisplay.title || (resultName ? `${resultOwner?.name || "A player"} rolled ${resultName}` : pendingEvent.title || "Pokemon result pending"),
```

#### `randomPokemonSessions` — line 26643

```text
 26641 |
 26642 | async function handleLiveTableAcceptResult(sessionId, activityId = "") {
 26643 |   const session = (state.randomPokemonSessions || []).find((entry) => entry.id === sessionId && entry.status === "pending");
 26644 |   if (!session) {
 26645 |     alert("No pending Pokemon result is available to accept.");
```

#### `randomPokemonSessions` — line 26655

```text
 26653 |
 26654 | async function handleLiveTableRerollResult(sessionId) {
 26655 |   const session = (state.randomPokemonSessions || []).find((entry) => entry.id === sessionId && entry.status === "pending");
 26656 |   if (!session) {
 26657 |     alert("No pending Pokemon result is available to reroll.");
```

#### `pokemon-reroll` — line 40894

```text
 40892 |     action: "token", category: "pokemon", player: actor.name,
 40893 |     item: summary, title: "Reroll replaced a Pokemon result", summary,
 40894 |     type: "pokemon-reroll-token", categories: ["tokens", "pokemon"],
 40895 |     tags: ["reroll-token", "pokemon-result", resultKind || "result"],
 40896 |     playerIds: [actor.id, targetPlayerId].filter(Boolean), pokemonNames: [previousName, nextName].filter(Boolean),
```

#### `pokemon-result` — line 40895

```text
 40893 |     item: summary, title: "Reroll replaced a Pokemon result", summary,
 40894 |     type: "pokemon-reroll-token", categories: ["tokens", "pokemon"],
 40895 |     tags: ["reroll-token", "pokemon-result", resultKind || "result"],
 40896 |     playerIds: [actor.id, targetPlayerId].filter(Boolean), pokemonNames: [previousName, nextName].filter(Boolean),
 40897 |     tokenNames: [metadata.name || "Reroll"], linkedEventId: sourceEffectId,
```

#### `randomPokemonSessions` — line 40904

```text
 40902 |
 40903 | function pendingRandomPokemonSessions() {
 40904 |   state.randomPokemonSessions ||= [];
 40905 |   return state.randomPokemonSessions.filter((session) => session.status === "pending");
 40906 | }
```

#### `randomPokemonSessions` — line 40905

```text
 40903 | function pendingRandomPokemonSessions() {
 40904 |   state.randomPokemonSessions ||= [];
 40905 |   return state.randomPokemonSessions.filter((session) => session.status === "pending");
 40906 | }
 40907 |
```

#### `randomPokemonSessions` — line 40910

```text
 40908 | function pendingRerollTargets() {
 40909 |   const targets = [];
 40910 |   (state.randomPokemonSessions || [])
 40911 |     .filter((session) => session.status === "pending" && session.rerollable !== false && !session.interactionLocked)
 40912 |     .forEach((session) => {
```

#### `randomPokemonSessions` — line 41020

```text
 41018 |     confirmedAt: null
 41019 |   };
 41020 |   state.randomPokemonSessions ||= [];
 41021 |   state.randomPokemonSessions.unshift(session);
 41022 |   state.selectedRandomPokemonSessionId = session.id;
```

#### `randomPokemonSessions` — line 41021

```text
 41019 |   };
 41020 |   state.randomPokemonSessions ||= [];
 41021 |   state.randomPokemonSessions.unshift(session);
 41022 |   state.selectedRandomPokemonSessionId = session.id;
 41023 |   state.randomPokemonDrawerOpen = true;
```

#### `randomPokemonSessions` — line 41028

```text
 41026 |   render();
 41027 |   const sprite = await fetchStablePokemonSprite(result.displayName, session.chosenSpriteKey);
 41028 |   const latest = (state.randomPokemonSessions || []).find((entry) => entry.id === session.id);
 41029 |   if (latest && latest.status === "pending") {
 41030 |     latest.chosenSpriteKey = sprite.spriteKey || "";
```

#### `randomPokemonSessions` — line 41077

```text
 41075 | async function confirmRandomPokemonSession(sessionId = state.selectedRandomPokemonSessionId, { skipPendingGuard = false } = {}) {
 41076 |   if (!skipPendingGuard && !guardPendingEventBeforeAction("Confirm Pokemon Result", () => confirmRandomPokemonSession(sessionId, { skipPendingGuard: true }))) return;
 41077 |   const randomSession = (state.randomPokemonSessions || []).find((entry) => entry.id === sessionId);
 41078 |   if (!randomSession || randomSession.status !== "pending") return;
 41079 |   const player = state.players.find((entry) => entry.id === (randomSession.resultOwnerPlayerId || randomSession.ownerPlayerId || randomSession.playerId));
```

#### `randomPokemonSessions` — line 41177

```text
 41175 |
 41176 | async function rerollRandomPokemonSession(sessionId = state.selectedRandomPokemonSessionId, options = {}) {
 41177 |   const randomSession = (state.randomPokemonSessions || []).find((entry) => entry.id === sessionId);
 41178 |   if (!randomSession || randomSession.status !== "pending" || randomSession.rerollable === false || randomSession.interactionLocked) return;
 41179 |   const ownerPlayerId = randomSession.resultOwnerPlayerId || randomSession.ownerPlayerId || randomSession.playerId;
```

#### `pokemon-reroll` — line 41230

```text
 41228 |   if (randomSession.interactionEventId) {
 41229 |     const updatedActivity = addInteractionResponse(randomSession.interactionEventId, {
 41230 |       type: "pokemon-reroll",
 41231 |       playerId: actor.id,
 41232 |       tokenId: rerollToken.id,
```

#### `pokemon-reroll` — line 41246

```text
 41244 |     linkedResponseId: savedRerollResponse?.id || "",
 41245 |     promptId: savedRerollResponse?.respondingToPromptId || "",
 41246 |     source: "pokemon-reroll"
 41247 |   });
 41248 |   randomSession.rerollCount = Number(randomSession.rerollCount || 0) + 1;
```

#### `pokemon-reroll` — line 41266

```text
 41264 |         appendLogCategory(entry, "items");
 41265 |         appendLogCategory(entry, "pokemon");
 41266 |         appendUniqueLogValue(entry, "tags", "random-pokemon-reroll");
 41267 |         appendUniqueLogValue(entry, "tokenNames", rerollToken.name);
 41268 |         appendUniqueLogValue(entry, "playerIds", actor.id);
```

#### `pokemon-reroll` — line 41272

```text
 41270 |         entry.childEvents ||= [];
 41271 |         entry.childEvents.push({
 41272 |           type: "random-pokemon-reroll",
 41273 |           category: "items",
 41274 |           tokenId: rerollToken.id,
```

#### `randomPokemonSessions` — line 41290

```text
 41288 |   renderRandomPokemonPanel();
 41289 |   const sprite = await fetchStablePokemonSprite(nextName, randomSession.chosenSpriteKey);
 41290 |   const latest = (state.randomPokemonSessions || []).find((entry) => entry.id === randomSession.id);
 41291 |   if (latest && latest.status === "pending") {
 41292 |     latest.chosenSpriteKey = sprite.spriteKey || "";
```

#### `randomPokemonSessions` — line 41316

```text
 41314 |
 41315 | function cancelRandomPokemonSession(sessionId = state.selectedRandomPokemonSessionId) {
 41316 |   const randomSession = (state.randomPokemonSessions || []).find((entry) => entry.id === sessionId);
 41317 |   if (!randomSession || randomSession.status !== "pending") return;
 41318 |   randomSession.status = "cancelled";
```

#### `pokemon-result` — line 41648

```text
 41646 |           const rerollTokenCount = (player.inventory || []).filter(isRerollToken).length;
 41647 |           return `
 41648 |             <article class="random-pokemon-result-card gc-ticket-result-card">
 41649 |               <div class="random-pokemon-result-header">
 41650 |                 <div>
```

#### `pokemon-result` — line 41649

```text
 41647 |           return `
 41648 |             <article class="random-pokemon-result-card gc-ticket-result-card">
 41649 |               <div class="random-pokemon-result-header">
 41650 |                 <div>
 41651 |                   <p class="eyebrow">${escapeHtml(entry.tokenName || entry.sourceLabel || "Game Corner Ticket")}</p>
```

#### `routeEncounterBySeriesId` — line 42796

```text
 42794 | function v2EnsureRouteSeriesState(seriesId = state.series) {
 42795 |   state.v2 ||= {};
 42796 |   state.v2.routeEncounterBySeriesId ||= {};
 42797 |   const normalizedSeriesId = v2Text(seriesId, "series-v2");
 42798 |   if (!state.v2.routeEncounterBySeriesId[normalizedSeriesId]) {
```

#### `routeEncounterBySeriesId` — line 42798

```text
 42796 |   state.v2.routeEncounterBySeriesId ||= {};
 42797 |   const normalizedSeriesId = v2Text(seriesId, "series-v2");
 42798 |   if (!state.v2.routeEncounterBySeriesId[normalizedSeriesId]) {
 42799 |     const seed = `${currentBackendGameId() || "local"}:${normalizedSeriesId}:route-encounters`;
 42800 |     state.v2.routeEncounterBySeriesId[normalizedSeriesId] = v2CreateRouteSeriesState(normalizedSeriesId, seed);
```

#### `routeEncounterBySeriesId` — line 42800

```text
 42798 |   if (!state.v2.routeEncounterBySeriesId[normalizedSeriesId]) {
 42799 |     const seed = `${currentBackendGameId() || "local"}:${normalizedSeriesId}:route-encounters`;
 42800 |     state.v2.routeEncounterBySeriesId[normalizedSeriesId] = v2CreateRouteSeriesState(normalizedSeriesId, seed);
 42801 |     state.v2.activeRouteEncounterSeriesId = normalizedSeriesId;
 42802 |   }
```

#### `routeEncounterBySeriesId` — line 42803

```text
 42801 |     state.v2.activeRouteEncounterSeriesId = normalizedSeriesId;
 42802 |   }
 42803 |   state.v2.routeEncounterBySeriesId[normalizedSeriesId] = v2NormalizeRouteEncounterState(state.v2.routeEncounterBySeriesId[normalizedSeriesId], normalizedSeriesId);
 42804 |   v2RepairRouteEffectOperationsFromRouteState(normalizedSeriesId, state.v2.routeEncounterBySeriesId[normalizedSeriesId]);
 42805 |   return state.v2.routeEncounterBySeriesId[normalizedSeriesId];
```

#### `routeEncounterBySeriesId` — line 42804

```text
 42802 |   }
 42803 |   state.v2.routeEncounterBySeriesId[normalizedSeriesId] = v2NormalizeRouteEncounterState(state.v2.routeEncounterBySeriesId[normalizedSeriesId], normalizedSeriesId);
 42804 |   v2RepairRouteEffectOperationsFromRouteState(normalizedSeriesId, state.v2.routeEncounterBySeriesId[normalizedSeriesId]);
 42805 |   return state.v2.routeEncounterBySeriesId[normalizedSeriesId];
 42806 | }
```

#### `routeEncounterBySeriesId` — line 42805

```text
 42803 |   state.v2.routeEncounterBySeriesId[normalizedSeriesId] = v2NormalizeRouteEncounterState(state.v2.routeEncounterBySeriesId[normalizedSeriesId], normalizedSeriesId);
 42804 |   v2RepairRouteEffectOperationsFromRouteState(normalizedSeriesId, state.v2.routeEncounterBySeriesId[normalizedSeriesId]);
 42805 |   return state.v2.routeEncounterBySeriesId[normalizedSeriesId];
 42806 | }
 42807 |
```

#### `useV2RouteRerollToken` — line 44641

```text
 44639 | }
 44640 |
 44641 | function useV2RouteRerollToken(actionId, tokenInventoryId = "") {
 44642 |   try {
 44643 |     const player = activePlayer();
```

#### `useV2ExtraEncounter` — line 44661

```text
 44659 | }
 44660 |
 44661 | function useV2ExtraEncounter(routeNumber, tokenInventoryId = "") {
 44662 |   try {
 44663 |     const player = activePlayer();
```

#### `applyV2RouteRepel` — line 44679

```text
 44677 | }
 44678 |
 44679 | function applyV2RouteRepel(routeNumber, battleTierId, tokenInventoryId = "") {
 44680 |   try {
 44681 |     const player = activePlayer();
```

#### `useV2MasterBallOnOpportunity` — line 44690

```text
 44688 | }
 44689 |
 44690 | function useV2MasterBallOnOpportunity(opportunityId, residentId, tokenInventoryId = "") {
 44691 |   try {
 44692 |     const player = activePlayer();
```

#### `pokemon-result` — line 45346

```text
 45344 |   ].filter(Boolean);
 45345 |   els.randomPokemonSessionDetail.innerHTML = `
 45346 |     <article class="random-pokemon-result-card${isRevealing ? " revealing" : ""}">
 45347 |       <div class="random-pokemon-result-header">
 45348 |         <div>
```

#### `pokemon-result` — line 45347

```text
 45345 |   els.randomPokemonSessionDetail.innerHTML = `
 45346 |     <article class="random-pokemon-result-card${isRevealing ? " revealing" : ""}">
 45347 |       <div class="random-pokemon-result-header">
 45348 |         <div>
 45349 |           <p class="eyebrow">${escapeHtml(session.sourceLabel || "Random Pokemon")}</p>
```

#### `randomPokemonSessions` — line 46695

```text
 46693 |     "playerNotifications",
 46694 |     "lingeringStatuses",
 46695 |     "randomPokemonSessions",
 46696 |     "wheelSessions"
 46697 |   ].forEach((key) => markSandboxCollectionChanges(candidate, baseline, key, origin));
```

#### `randomPokemonSessions` — line 59135

```text
 59133 |       }
 59134 |     });
 59135 |   (state.randomPokemonSessions || [])
 59136 |     .filter((session) => sessionIds.has(session.gameCornerSessionId) || session.actionVisitId === undoData.visitId)
 59137 |     .forEach((session) => {
```

#### `randomPokemonSessions` — line 59201

```text
 59199 |   if (undoData.previousPlayerNotifications) state.playerNotifications = structuredClone(undoData.previousPlayerNotifications);
 59200 |   if (undoData.previousWheelSessions) state.wheelSessions = structuredClone(undoData.previousWheelSessions);
 59201 |   if (undoData.previousRandomPokemonSessions) state.randomPokemonSessions = structuredClone(undoData.previousRandomPokemonSessions);
 59202 |   if (undoData.previousInteractionEvents) state.interactionEvents = structuredClone(undoData.previousInteractionEvents).map((activity) => normalizeInteractionActivity(activity, state));
 59203 |   if (undoData.previousTransactions) state.transactions = structuredClone(undoData.previousTransactions);
```

#### `useV2RouteRerollToken` — line 61416

```text
 61414 |     if (routeRerollTokenButton && els.actionLocationBoard.contains(routeRerollTokenButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 61415 |       event.preventDefault();
 61416 |       useV2RouteRerollToken(routeRerollTokenButton.dataset.v2RouteRerollToken, routeRerollTokenButton.dataset.v2TokenId || "");
 61417 |       return;
 61418 |     }
```

#### `useV2ExtraEncounter` — line 61434

```text
 61432 |     if (railExtraUseButton && els.actionLocationBoard.contains(railExtraUseButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 61433 |       event.preventDefault();
 61434 |       if (!railExtraUseButton.disabled) useV2ExtraEncounter(Number(railExtraUseButton.dataset.v2RailExtraUse || 0), railExtraUseButton.dataset.v2TokenId || "");
 61435 |       return;
 61436 |     }
```

#### `applyV2RouteRepel` — line 61480

```text
 61478 |       if (action === "repel") {
 61479 |         const tier = card?.querySelector('[data-v2-route-effect-field="repelTier"]')?.value || "";
 61480 |         applyV2RouteRepel(Number(routeEffectApply.dataset.v2RouteNumber || 0), tier, routeEffectApply.dataset.v2TokenId || "");
 61481 |       } else if (action === "master-ball") {
 61482 |         const residentId = card?.querySelector('[data-v2-route-effect-field="masterResident"]')?.value || "";
```

#### `useV2MasterBallOnOpportunity` — line 61483

```text
 61481 |       } else if (action === "master-ball") {
 61482 |         const residentId = card?.querySelector('[data-v2-route-effect-field="masterResident"]')?.value || "";
 61483 |         if (residentId) useV2MasterBallOnOpportunity(routeEffectApply.dataset.v2OpportunityId || "", residentId, routeEffectApply.dataset.v2TokenId || "");
 61484 |       }
 61485 |       return;
```

### Current Route preservation — production/runtime — `server.js`

#### `randomPokemonSessions` — line 1293

```text
  1291 |     previousTokenConsumptions: cloneJson(state.tokenConsumptions || []),
  1292 |     previousPlayerNotifications: cloneJson(state.playerNotifications || []),
  1293 |     previousRandomPokemonSessions: cloneJson(state.randomPokemonSessions || []),
  1294 |     previousInteractionEvents: cloneJson((state.interactionEvents || []).filter((entry) => entry.id !== excludedActivityId)),
  1295 |     previousTransactions: cloneJson(state.transactions || []),
```

### Current Route preservation — production/runtime — `styles.css`

#### `pokemon-result` — line 4866

```text
  4864 | }
  4865 |
  4866 | .pokemon-result-inline {
  4867 |   display: flex;
  4868 |   align-items: center;
```

#### `pokemon-result` — line 16059

```text
 16057 | }
 16058 |
 16059 | .gc-ticket-result-card .random-pokemon-result-header h3 {
 16060 |   font-size: 20px;
 16061 | }
```

#### `pokemon-result` — line 16443

```text
 16441 | }
 16442 |
 16443 | .random-pokemon-result-card {
 16444 |   display: grid;
 16445 |   gap: 14px;
```

#### `pokemon-result` — line 16456

```text
 16454 | }
 16455 |
 16456 | .random-pokemon-result-card.revealing {
 16457 |   animation: pokemon-result-pop 720ms cubic-bezier(0.18, 0.89, 0.25, 1.2);
 16458 | }
```

#### `pokemon-result` — line 16457

```text
 16455 |
 16456 | .random-pokemon-result-card.revealing {
 16457 |   animation: pokemon-result-pop 720ms cubic-bezier(0.18, 0.89, 0.25, 1.2);
 16458 | }
 16459 |
```

#### `pokemon-result` — line 16460

```text
 16458 | }
 16459 |
 16460 | .random-pokemon-result-header {
 16461 |   display: flex;
 16462 |   justify-content: space-between;
```

#### `pokemon-result` — line 16467

```text
 16465 | }
 16466 |
 16467 | .random-pokemon-result-header h3 {
 16468 |   margin: 2px 0 4px;
 16469 |   font-size: 26px;
```

#### `pokemon-result` — line 16474

```text
 16472 | }
 16473 |
 16474 | .random-pokemon-result-header span,
 16475 | .random-pokemon-token,
 16476 | .random-pokemon-notes {
```

#### `pokemon-result` — line 16481

```text
 16479 | }
 16480 |
 16481 | .random-pokemon-result-card .eyebrow {
 16482 |   color: rgba(247, 201, 72, 0.92);
 16483 | }
```

#### `pokemon-result` — line 16494

```text
 16492 | }
 16493 |
 16494 | .random-pokemon-result-card:not(.revealing) .random-pokemon-reveal-text {
 16495 |   display: none;
 16496 | }
```

#### `pokemon-result` — line 16498

```text
 16496 | }
 16497 |
 16498 | .random-pokemon-result-card.revealing .random-pokemon-result-header h3,
 16499 | .random-pokemon-result-card.revealing .random-pokemon-art {
 16500 |   animation: pokemon-result-reveal 720ms ease both;
```

#### `pokemon-result` — line 16499

```text
 16497 |
 16498 | .random-pokemon-result-card.revealing .random-pokemon-result-header h3,
 16499 | .random-pokemon-result-card.revealing .random-pokemon-art {
 16500 |   animation: pokemon-result-reveal 720ms ease both;
 16501 | }
```

#### `pokemon-result` — line 16500

```text
 16498 | .random-pokemon-result-card.revealing .random-pokemon-result-header h3,
 16499 | .random-pokemon-result-card.revealing .random-pokemon-art {
 16500 |   animation: pokemon-result-reveal 720ms ease both;
 16501 | }
 16502 |
```

#### `pokemon-result` — line 16542

```text
 16540 | }
 16541 |
 16542 | @keyframes pokemon-result-pop {
 16543 |   0% {
 16544 |     opacity: 0;
```

#### `pokemon-result` — line 16556

```text
 16554 | }
 16555 |
 16556 | @keyframes pokemon-result-reveal {
 16557 |   0% {
 16558 |     opacity: 0;
```

### Current Route preservation — production/runtime — `token-effect-contract.js`

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

### Current Route preservation — tests — `scripts/test-settled-effect-batch.js`

#### `randomPokemonSessions` — line 56

```text
    54 |     privateEffectRecords: [],
    55 |     encounterCopyRecords: [],
    56 |     randomPokemonSessions: [],
    57 |     teambuilder: {},
    58 |     battleTeams: {}
```

#### `randomPokemonSessions` — line 169

```text
   167 | test("[SEB-004] Honey creates an acquisition-ready identity without copying owner or transient result state", () => {
   168 |   const state = stateFixture();
   169 |   state.randomPokemonSessions.push({
   170 |     id: "encounter-result-1", sourceType: "encounter", status: "confirmed", series: "Hoenn", gym: 3,
   171 |     ownerPlayerId: "red", playerId: "red", resultOwnerPlayerId: "red", rosterPokemonId: "red-existing",
```

#### `randomPokemonSessions` — line 195

```text
   193 |   }, options());
   194 |   assert.equal(duplicate.duplicateResolution, true);
   195 |   assert.equal(state.randomPokemonSessions.length, 2);
   196 | });
   197 |
```

### Current Route preservation — tests — `scripts/test-token-browser.js`

#### `randomPokemonSessions` — line 2572

```text
  2570 |   );
  2571 |   productionState.encounterSessions = [{ id: "browser-028-encounter", status: "review", playerId: "gold", series: "Kanto", gym: 1, rolls: [], removedEntryIds: [] }];
  2572 |   productionState.randomPokemonSessions = [{ id: "browser-028-result", sourceType: "encounter", sourceLabel: "Encounter Wheel", status: "pending", rerollable: true, interactionLocked: false, playerId: "gold", ownerPlayerId: "gold", resultOwnerPlayerId: "gold", encounterSessionId: "browser-028-encounter", series: "Kanto", gym: 1, tierId: "C", resultPokemonName: "abra", resultDisplayName: "Abra", resultMetadata: { key: "abra", displayName: "Abra" }, rerollHistory: [], resultHistory: [] }];
  2573 |   const gameId = await navigateProduction(productionState, "BROWSER-028-REROLL");
  2574 |   const rerolled = await evaluate(`(async () => {
```

#### `randomPokemonSessions` — line 2581

```text
  2579 |     const picker = els.rerollTargetList?.innerHTML || "";
  2580 |     const operation = await rerollRandomPokemonSession("browser-028-result", { actorPlayerId: "gold", sourceEffectId: "browser-028-reroll-operation" });
  2581 |     const result = state.randomPokemonSessions.find((entry) => entry.id === "browser-028-result");
  2582 |     const beforeRetry = JSON.stringify({ result: result.resultDisplayName, inventory: state.players.find((player) => player.id === "gold").inventory, operations: state.effectOperations });
  2583 |     await rerollRandomPokemonSession("browser-028-result", { actorPlayerId: "gold", sourceEffectId: "browser-028-reroll-operation" });
```

#### `randomPokemonSessions` — line 2603

```text
  2601 |   await reloadProduction("browser-028-reroll");
  2602 |   const undone = await evaluate(`(() => {
  2603 |     const result = state.randomPokemonSessions.find((entry) => entry.id === "browser-028-result");
  2604 |     result.userLaterNote = "keep-result-note";
  2605 |     const history = state.log.find((entry) => !entry.undone && entry.undoData?.tokenDefinitionId === "reroll-token");
```

#### `randomPokemonSessions` — line 2621

```text
  2619 |   const productionState = controlStateFixture("browser-029-honey");
  2620 |   productionState.players.find((player) => player.id === "gold").inventory.push({ id: "gold-honey-browser-1", canonicalId: "honey-token", name: "Honey", type: "TOKEN" });
  2621 |   productionState.randomPokemonSessions = [
  2622 |     { id: "browser-029-source-a", sourceType: "encounter", sourceLabel: "Encounter Wheel", status: "confirmed", series: "Kanto", gym: 1, ownerPlayerId: "red", resultOwnerPlayerId: "red", resultDisplayName: "Garchomp", tierId: "S", tier: "S", level: 54, resultMetadata: { speciesId: "garchomp", speciesName: "Garchomp", form: "Standard", intrinsicRolledProperties: { shiny: true } } },
  2623 |     { id: "browser-029-source-b", sourceType: "encounter", sourceLabel: "Encounter Wheel", status: "confirmed", series: "Kanto", gym: 1, ownerPlayerId: "steevee", resultOwnerPlayerId: "steevee", resultDisplayName: "Lucario", tierId: "A", tier: "A", level: 52, resultMetadata: { speciesId: "lucario", speciesName: "Lucario", form: "Standard" } }
```

#### `randomPokemonSessions` — line 2638

```text
  2636 |   const copied = await evaluate(`(() => {
  2637 |     backendSync.enabled = false;
  2638 |     const sourceBefore = structuredClone(state.randomPokemonSessions.find((entry) => entry.id === "browser-029-source-a"));
  2639 |     const ok = resolveHoneyEndOfActionProcedure(${JSON.stringify(offered.activityId)}, "browser-029-source-a");
  2640 |     const procedure = state.endOfActionProcedures.find((entry) => entry.id === ${JSON.stringify(offered.procedureId)});
```

#### `randomPokemonSessions` — line 2641

```text
  2639 |     const ok = resolveHoneyEndOfActionProcedure(${JSON.stringify(offered.activityId)}, "browser-029-source-a");
  2640 |     const procedure = state.endOfActionProcedures.find((entry) => entry.id === ${JSON.stringify(offered.procedureId)});
  2641 |     const copy = state.randomPokemonSessions.find((entry) => entry.id === procedure.copiedRandomPokemonSessionId);
  2642 |     return {
  2643 |       ok, copyId: copy?.id || "", fresh: copy?.id !== sourceBefore.id, species: copy?.resultDisplayName,
```

#### `randomPokemonSessions` — line 2645

```text
  2643 |       ok, copyId: copy?.id || "", fresh: copy?.id !== sourceBefore.id, species: copy?.resultDisplayName,
  2644 |       form: copy?.resultMetadata?.form, tier: copy?.tierId, level: copy?.level, pending: copy?.status,
  2645 |       selected: state.selectedRandomPokemonSessionId === copy?.id, sourceUnchanged: JSON.stringify(sourceBefore) === JSON.stringify(state.randomPokemonSessions.find((entry) => entry.id === sourceBefore.id)),
  2646 |       tokenCount: state.players.find((player) => player.id === "gold").inventory.filter((item) => item.id === "gold-honey-browser-1").length
  2647 |     };
```

#### `randomPokemonSessions` — line 2657

```text
  2655 |     fetchStablePokemonSprite = async (name, existingSpriteKey = "") => ({ spriteKey: existingSpriteKey || getPokemonSpriteLookupKey(name), spriteUrl: "" });
  2656 |     await confirmRandomPokemonSession(${JSON.stringify(copied.copyId)}, { skipPendingGuard: true });
  2657 |     const copy = state.randomPokemonSessions.find((entry) => entry.id === ${JSON.stringify(copied.copyId)});
  2658 |     return { status: copy.status, pokemonId: copy.rosterPokemonId || "", rosterExists: Boolean(findPokemonRecord(copy.rosterPokemonId)) };
  2659 |   })()`, 30000);
```

#### `randomPokemonSessions` — line 2668

```text
  2666 |     undoLogEntry(history.id);
  2667 |     return {
  2668 |       copy: state.randomPokemonSessions.some((entry) => entry.id === ${JSON.stringify(copied.copyId)}),
  2669 |       acquired: Boolean(findPokemonRecord(${JSON.stringify(acquired.pokemonId)})),
  2670 |       sourceA: state.randomPokemonSessions.find((entry) => entry.id === "browser-029-source-a")?.status,
```

#### `randomPokemonSessions` — line 2670

```text
  2668 |       copy: state.randomPokemonSessions.some((entry) => entry.id === ${JSON.stringify(copied.copyId)}),
  2669 |       acquired: Boolean(findPokemonRecord(${JSON.stringify(acquired.pokemonId)})),
  2670 |       sourceA: state.randomPokemonSessions.find((entry) => entry.id === "browser-029-source-a")?.status,
  2671 |       sourceB: state.randomPokemonSessions.find((entry) => entry.id === "browser-029-source-b")?.status,
  2672 |       token: state.players.find((player) => player.id === "gold").inventory.some((item) => item.id === "gold-honey-browser-1"),
```

#### `randomPokemonSessions` — line 2671

```text
  2669 |       acquired: Boolean(findPokemonRecord(${JSON.stringify(acquired.pokemonId)})),
  2670 |       sourceA: state.randomPokemonSessions.find((entry) => entry.id === "browser-029-source-a")?.status,
  2671 |       sourceB: state.randomPokemonSessions.find((entry) => entry.id === "browser-029-source-b")?.status,
  2672 |       token: state.players.find((player) => player.id === "gold").inventory.some((item) => item.id === "gold-honey-browser-1"),
  2673 |       procedure: state.endOfActionProcedures.find((entry) => entry.id === ${JSON.stringify(offered.procedureId)})?.status,
```

### Current Route preservation — tests — `scripts/test-token-lifecycle-slice.js`

#### `randomPokemonSessions` — line 94

```text
    92 | test("[TLS-004] Reroll supersedes one exact unresolved result once and preserves a causal original revision", () => {
    93 |   const state = controlStateFixture("lifecycle-reroll");
    94 |   state.randomPokemonSessions = [{ id: "result-1", sourceType: "encounter", status: "pending", rerollable: true, playerId: "gold", ownerPlayerId: "gold", resultOwnerPlayerId: "gold", resultDisplayName: "Abra", resultPokemonName: "abra", resultMetadata: { key: "abra" } }];
    95 |   state.players.find((player) => player.id === "gold").inventory.push({ id: "gold-reroll-1", name: "Reroll", canonicalId: "reroll-token", type: "TOKEN" });
    96 |   const input = { sourceEffectId: "reroll-operation-1", actorPlayerId: "gold", tokenInventoryRecordId: "gold-reroll-1", targetResultId: "result-1", replacementResult: { key: "ralts", displayName: "Ralts" } };
```

#### `randomPokemonSessions` — line 107

```text
   105 |
   106 |   const wheelState = controlStateFixture("lifecycle-reroll-wheel");
   107 |   wheelState.randomPokemonSessions = [{ id: "wheel-result-1", sourceType: "game-corner", status: "pending", rerollable: true, playerId: "gold", ownerPlayerId: "gold", resultOwnerPlayerId: "gold", resultDisplayName: "Eevee", resultPokemonName: "eevee" }];
   108 |   wheelState.players.find((player) => player.id === "gold").inventory.push({ id: "gold-wheel-reroll-1", name: "Reroll", canonicalId: "reroll-token", type: "TOKEN" });
   109 |   const wheelResult = effects.resolveRerollResultRecord(wheelState, {
```

#### `randomPokemonSessions` — line 120

```text
   118 | test("[TLS-005] Honey copies only settled intrinsic encounter identity and rejects recursive or stale sources", () => {
   119 |   const state = controlStateFixture("lifecycle-honey");
   120 |   state.randomPokemonSessions = [{ id: "source-encounter", sourceType: "encounter", sourceLabel: "Encounter Wheel", status: "confirmed", series: "Kanto", gym: 1, resultDisplayName: "Rotom-Wash", tierId: "B", level: 54, resultMetadata: { speciesId: "rotom", speciesName: "Rotom", form: "Wash", intrinsicRolledProperties: { shiny: true } }, ownerPlayerId: "red", rosterPokemonId: "red-old", acquiredAt: "old" }];
   121 |   const result = effects.resolveHoneyEncounterCopy(state, { sourceEffectId: "honey-1", ownerPlayerId: "gold", sourceRandomPokemonSessionId: "source-encounter" }, options(state));
   122 |   assert.equal(result.result, "resolved");
```

#### `randomPokemonSessions` — line 130

```text
   128 |   result.randomSession.status = "confirmed";
   129 |   assert.equal(effects.resolveHoneyEncounterCopy(state, { sourceEffectId: "honey-recursive", ownerPlayerId: "gold", sourceRandomPokemonSessionId: result.randomSession.id }, options(state)).result, "systemFailure");
   130 |   state.randomPokemonSessions[0].status = "pending";
   131 |   assert.equal(effects.resolveHoneyEncounterCopy(state, { sourceEffectId: "honey-stale", ownerPlayerId: "gold", sourceRandomPokemonSessionId: "source-encounter" }, options(state)).result, "systemFailure");
   132 | });
```

### Current Route preservation — tests — `scripts/test-v2-route-browser-mount.js`

#### `routeEncounterBySeriesId` — line 78

```text
    76 |   assert.match(indexHtml, /app\.js\?v=\d+/, "browser should fetch the mounted V2 app script");
    77 |   assert.match(appJs, /if \(payload\.actionPhaseVersion\)/, "remote game version should align loaded state");
    78 |   assert.match(appJs, /nextState\.v2\.routeEncounterBySeriesId \|\|= \{\}/);
    79 |   assert.match(appJs, /nextState\.v2\.actionPhaseBySeriesId \|\|= \{\}/);
    80 |   assert.match(appJs, /state\.v2\.routeEncounterBySeriesId\[normalizedSeriesId\]/);
```

#### `routeEncounterBySeriesId` — line 80

```text
    78 |   assert.match(appJs, /nextState\.v2\.routeEncounterBySeriesId \|\|= \{\}/);
    79 |   assert.match(appJs, /nextState\.v2\.actionPhaseBySeriesId \|\|= \{\}/);
    80 |   assert.match(appJs, /state\.v2\.routeEncounterBySeriesId\[normalizedSeriesId\]/);
    81 |   assert.match(appJs, /state\.v2\.actionPhaseBySeriesId\[normalizedSeriesId\]/);
    82 |   assert.match(appJs, /routeUiState: createDefaultRouteUiState\(\)/);
```

### Current Route preservation — tests — `scripts/test-v2-route-runtime-sequences.js`

#### `routeEncounterBySeriesId` — line 400

```text
   398 |   const remoteState = structuredClone(authoritative.state);
   399 |   remoteState.v2 ||= {};
   400 |   remoteState.v2.routeEncounterBySeriesId ||= {};
   401 |   const remoteRouteState = structuredClone(localBefore.routeState);
   402 |   const routeOne = remoteRouteState.routes.find((route) => route.routeNumber === 1);
```

#### `routeEncounterBySeriesId` — line 405

```text
   403 |   routeOne.publicDiscoveryResidentIds = [localBefore.revealResidentId];
   404 |   remoteRouteState.revision = Number(remoteRouteState.revision || 0) + 1;
   405 |   remoteState.v2.routeEncounterBySeriesId[localBefore.series] = remoteRouteState;
   406 |   remoteState.v2.routeWorkspaceBySeriesId = {
   407 |     [localBefore.series]: {
```

### Current Route preservation — tests — `versions/next-action-phase/tests/test-route-encounter-engine.js`

#### `routeEncounterBySeriesId` — line 90

```text
    88 |
    89 | function v2RouteState(state, seriesId = "series-action-test") {
    90 |   return state.v2.routeEncounterBySeriesId[seriesId];
    91 | }
    92 |
```

#### `routeEncounterBySeriesId` — line 885

```text
   883 |   assert.equal(second.created, false);
   884 |   assert.equal(JSON.stringify(second.routeState), routeStateSnapshot);
   885 |   assert.deepEqual(second.state.v2.routeEncounterBySeriesId["series-real-init"], first.routeState);
   886 | });
   887 |
```

#### `routeEncounterBySeriesId` — line 1228

```text
  1226 |   }).state;
  1227 |   const mutated = structuredClone(drawn.state);
  1228 |   mutated.v2.routeEncounterBySeriesId["series-action-test"] = rerolledRouteState;
  1229 |   const reloaded = routeActions.serializeAndReloadV2ActionGameState(mutated);
  1230 |   const result = v2RouteState(reloaded).routes.find((entry) => entry.routeNumber === 8).encounterResults[0];
```

#### `routeEncounterBySeriesId` — line 1296

```text
  1294 |   });
  1295 |   const mutated = structuredClone(state);
  1296 |   mutated.v2.routeEncounterBySeriesId["series-action-test"] = extra.state;
  1297 |
  1298 |   assert.equal(v2ActionPhase(mutated).spends.length, 0);
```

### Current Route preservation — versions — `versions/next-action-phase/ACTION_PHASE_V2_PLAN.md`

#### `routeEncounterBySeriesId` — line 87

```text
    85 | Extra Encounter rule: costs $2,500, is freely purchasable immediately, can be stored for later, grants 1 additional Route encounter, lets the player choose the Route when used, and cannot target a Route above the player's current Gym/Route progression. The isolated engine stores source/token identity hooks but does not create a separate V2 Token inventory.
    86 |
    87 | Real data and persistence slice: `implementation/route-pokemon-catalog.js` adapts authoritative Battle Tier rows from `pokemon-balance-tiers.js` and type/species metadata from `pokemon-build-data.js`. `implementation/route-series-lifecycle.js` initializes `state.v2.routeEncounterBySeriesId[seriesId]` once per Series and normalizes JSON-safe reload state without rerolling populations. `npm.cmd run audit:v2-routes` runs the developer generation report against the real catalog.
    88 |
    89 | Route Action integration slice: `implementation/route-action-resolver.js` implements `route-exploration` as the first isolated V2 Action type. It validates player/Series/Route/action availability, records one reversible Action spend, creates one Route encounter opportunity, resolves one Route result, finalizes one canonical owned Pokemon through `implementation/route-pokemon-acquisition.js`, and settles only after acquisition. The persisted causal chain is Action ID -> Spend ID -> Opportunity ID -> Result ID -> Acquisition ID -> Pokemon record ID.
```

### Current Route preservation — versions — `versions/next-action-phase/ENCOUNTER_HIDDEN_GROTTO_MIGRATION_AUDIT.md`

#### `randomPokemonSessions` — line 34

```text
    32 | | Encounter wheel definitions | `encounterWheelDefinitions` are hard-coded in `app.js` by series/gym; entries have weight/category/default flags. Hoenn includes `Hyperspace Hole`. | Encounter roll pool, import cross-check script, docs, UI labels. | V2 REMOVE / CONVERT. | Move Route encounter data to V2 route modules; keep V1 definitions intact; add data parity tests for route residents instead of fixed wheels. |
    33 | | Encounter session state | `state.encounterSessions` stores player, series/gym, wheel id, max rolls, fishing/surf toggles, removed/temporary entries, weights, rolls, status, visual rotation, extra grants. | Save normalization, overlay, action operations, undo, Extra Encounter, Reroll, Honey, token snapshots. | V2 CONVERT. | Define `routeEncounterSessions` or versioned encounter session schema with route id, revealed residents, resident pool suppressions, selected/revealed Pokemon, and private/public visibility. |
    34 | | Random Pokemon result state | `state.randomPokemonSessions` stores pending or confirmed Pokemon result records from Encounter, Game Corner, Honey, and other sources. Encounter rolls can create child random sessions. | Result drawer, timing windows, Reroll, Honey, Game Corner tickets, causal undo. | V2 CONVERT. | Decide whether Route results reuse `randomPokemonSessions` or get a route-specific result record; preserve exact unresolved-result identity and acquisition handoff. |
    35 | | Encounter rolling UI | `index.html` includes `encounterOverlay`; `renderEncounterOverlay` draws a wheel, session tabs, active entries, result cards, weight editor, include Fishing/Surf toggle, Add/Reroll/Done controls. | Browser runtime, CSS, event delegation, tests, screenshots. | V2 REMOVE / CONVERT. | Build Route UI around revealed residents and route actions, not a spinning wheel; keep V1 overlay available until V1 retirement. |
    36 | | Wheel editing fields | V1 sessions allow `removedEntryIds`, `temporaryEntries`, `weightOverrides`, and `weightEditing`. | Repel guided intent, manual table adjustments, overlay rendering, undo details. | V2 CONVERT. | Replace wheel-entry edits with Route-era modifiers, e.g. Battle Tier suppression and temporary Primary-Type injection. |
```

#### `randomPokemonSessions` — line 68

```text
    66 | 1. Add a V2 Route encounter contract in `versions/next-action-phase/` before editing root code. `ROUTE_ENCOUNTER_ENGINE.md` and `implementation/route-encounter-engine.js` now define the first isolated contract.
    67 | 2. Define Route state shape: route id, resident pool, revealed residents per player, private knowledge, suppressions, temporary injections, pending encounter opportunities, and finalized acquisition records. The isolated engine uses exact resident IDs, stable species IDs, Battle Tier records, Primary Type metadata, source metadata, public discovery IDs, per-player private knowledge IDs, suppressions, opportunities, revisioned results, and acquisition records.
    68 | 3. Decide whether Route encounter results reuse `randomPokemonSessions` or use a new route result collection.
    69 | 4. Convert Reroll to exact same-Route reroll with stable revision links and causal undo.
    70 | 5. Convert Extra Encounter to one additional Route encounter opportunity for an exact chosen player.
```

#### `randomPokemonSessions` — line 79

```text
    77 | 12. Replace Hoenn wheel importer/cross-checks with Route resident import/generation tooling.
    78 | 13. Add isolated V2 tests for Route session creation, reveal privacy, reroll, extra encounter, repel suppression, master-ball selection, persistence, reload, and undo.
    79 | 14. Add migration tests proving existing V1 saves with `encounterSessions`, `randomPokemonSessions`, `hiddenGrottoSessions`, rods, and legacy perks remain playable under V1.
    80 | 15. Promote V2 to root only after `ARCHITECTURE.md`, `TIMING_AND_PHASES.md`, `IMPLEMENTATION_STATUS.md`, token matrices, and browser evidence are updated.
    81 |
```

### Current Route preservation — versions — `versions/next-action-phase/implementation/route-action-resolver.js`

#### `routeEncounterBySeriesId` — line 112

```text
   110 |
   111 | function routeStateFor(next, seriesId) {
   112 |   const routeState = next.v2?.routeEncounterBySeriesId?.[seriesId];
   113 |   if (!routeState) throw new Error(`V2 Route state does not exist for Series ${seriesId}.`);
   114 |   return routeLifecycle.normalizeV2RouteEncounterState(routeState);
```

#### `routeEncounterBySeriesId` — line 119

```text
   117 | function storeRouteState(next, seriesId, routeState) {
   118 |   next.v2 ||= {};
   119 |   next.v2.routeEncounterBySeriesId ||= {};
   120 |   next.v2.routeEncounterBySeriesId[seriesId] = routeLifecycle.normalizeV2RouteEncounterState(routeState);
   121 |   return next.v2.routeEncounterBySeriesId[seriesId];
```

#### `routeEncounterBySeriesId` — line 120

```text
   118 |   next.v2 ||= {};
   119 |   next.v2.routeEncounterBySeriesId ||= {};
   120 |   next.v2.routeEncounterBySeriesId[seriesId] = routeLifecycle.normalizeV2RouteEncounterState(routeState);
   121 |   return next.v2.routeEncounterBySeriesId[seriesId];
   122 | }
```

#### `routeEncounterBySeriesId` — line 121

```text
   119 |   next.v2.routeEncounterBySeriesId ||= {};
   120 |   next.v2.routeEncounterBySeriesId[seriesId] = routeLifecycle.normalizeV2RouteEncounterState(routeState);
   121 |   return next.v2.routeEncounterBySeriesId[seriesId];
   122 | }
   123 |
```

#### `routeEncounterBySeriesId` — line 347

```text
   345 |   const next = cloneJson(gameState);
   346 |   next.v2 ||= {};
   347 |   Object.keys(next.v2.routeEncounterBySeriesId || {}).forEach((seriesId) => {
   348 |     next.v2.routeEncounterBySeriesId[seriesId] = routeLifecycle.normalizeV2RouteEncounterState(next.v2.routeEncounterBySeriesId[seriesId]);
   349 |   });
```

#### `routeEncounterBySeriesId` — line 348

```text
   346 |   next.v2 ||= {};
   347 |   Object.keys(next.v2.routeEncounterBySeriesId || {}).forEach((seriesId) => {
   348 |     next.v2.routeEncounterBySeriesId[seriesId] = routeLifecycle.normalizeV2RouteEncounterState(next.v2.routeEncounterBySeriesId[seriesId]);
   349 |   });
   350 |   Object.keys(next.v2.actionPhaseBySeriesId || {}).forEach((seriesId) => {
```

### Current Route preservation — versions — `versions/next-action-phase/implementation/route-series-lifecycle.js`

#### `routeEncounterBySeriesId` — line 127

```text
   125 | function ensureV2RouteStateBucket(state) {
   126 |   state.v2 ||= {};
   127 |   state.v2.routeEncounterBySeriesId ||= {};
   128 |   return state.v2.routeEncounterBySeriesId;
   129 | }
```

#### `routeEncounterBySeriesId` — line 128

```text
   126 |   state.v2 ||= {};
   127 |   state.v2.routeEncounterBySeriesId ||= {};
   128 |   return state.v2.routeEncounterBySeriesId;
   129 | }
   130 |
```

### Current Route preservation — versions — `versions/next-action-phase/README.md`

#### `routeEncounterBySeriesId` — line 36

```text
    34 | ```
    35 |
    36 | Route state is stored under `state.v2.routeEncounterBySeriesId[seriesId]` by the isolated lifecycle helper and is preserved on repeated initialization.
    37 |
    38 | Route Exploration is implemented as a V2 Action type in `implementation/route-action-resolver.js` and mounted in the live Route Action Phase workspace. It spends exactly 1 V2 Action, creates exactly 1 Route encounter opportunity, can resolve/finalize/settle through pure state helpers, and creates normal owned Pokemon records through the Route acquisition adapter.
```

### Current Route preservation — versions — `versions/next-action-phase/ROUTE_ENCOUNTER_ENGINE.md`

#### `routeEncounterBySeriesId` — line 210

```text
   208 | 2. validates every eligible entry before generation;
   209 | 3. generates Route state once from the Series seed;
   210 | 4. stores it at `state.v2.routeEncounterBySeriesId[seriesId]`;
   211 | 5. returns the existing normalized Route state on later calls for the same Series instead of regenerating.
   212 |
```

### Obsolete Encounter QA/tooling — docs — `TOKEN_QA_COVERAGE.md`

#### `test-encounter-token-runtime.js` — line 2776

```text
  2774 | - **Coverage:** Covered
  2775 | - **Test level:** Unit
  2776 | - **Test file:** `scripts/test-encounter-token-runtime.js`
  2777 | - **Test ID:** `ETR-003`
  2778 | - **Setup:** Gold has an open two-roll Encounter session and is selected as the exact Extra Encounter target.
```

### Obsolete Encounter QA/tooling — scripts/tooling — `scripts/token-qa-coverage-data.js`

#### `test-encounter-token-runtime.js` — line 1391

```text
  1389 |       coverage: "Covered",
  1390 |       level: "Unit",
  1391 |       testFile: "scripts/test-encounter-token-runtime.js",
  1392 |       testId: "ETR-003",
  1393 |       setup: "Gold has an open two-roll Encounter session and is selected as the exact Extra Encounter target.",
```

### Obsolete Encounter QA/tooling — versions — `versions/next-action-phase/ENCOUNTER_HIDDEN_GROTTO_MIGRATION_AUDIT.md`

#### `Encounter runtime` — line 61

```text
    59 | | Bulletin Board quests | Quest bank references "Spin The Encounter Wheel Twice", "Catch A Pokemon From The Hidden Grotto", and "New Power: obtain a Pokemon this Gym". | Bulletin Board UI/session data and action completion. | V2 CONVERT / REMOVE. | Rewrite V2 quests around Route exploration and remove Hidden Grotto quest unless Grotto is deliberately preserved. |
    60 | | Import tooling | `scripts/import-pokeapi-hoenn-encounters.js` imports Hoenn encounter data and cross-checks against hard-coded wheels. | `npm run import:encounters:hoenn`, data generation, docs. | V2 CONVERT. | Replace or fork importer to build Route resident data and route reports rather than wheel buckets. |
    61 | | Tests | Existing tests assert V1 action operation hooks, Extra Encounter runtime, token sandbox, token browser flows, Reroll/Honey lifecycle, and docs generated from token contracts. | CI/local validation, generated docs. | V2 CONVERT. | Add isolated V2 route tests before root promotion; keep V1 tests passing until retirement. |
    62 | | Server persistence | `server.js` stores whole game snapshots; most encounter behavior is client-side. Backend accepts normalized state and activity routes. | Save/load, SSE, activity response nesting, provisional action routes. | SHARED / UNAFFECTED with migration risk. | Version route-era state in snapshots and reject/migrate ambiguous mixed V1/V2 encounter records safely. |
    63 |
```

### Retired Action/version runtime — docs — `ARCHITECTURE.md`

#### `action-phase-v1` — line 80

```text
    78 | Token art image bytes are asset data, not gameplay state. Uploaded token art should be persisted through the backend token-art asset route and referenced from game/ruleset snapshots by URL plus display settings. Save snapshots should not duplicate token art in both `ruleset.contentLibraries.tokenArt` and top-level `tokenArtLibrary`; the runtime can mirror that data in memory after load when older UI helpers need it.
    79 |
    80 | Action Phase behavior is now a pinned ruleset contract. `action-phase-v2-real-series` is the current/default Rival Saga ruleset for newly created games and lobbies. V2 is the exclusive target for new feature development. `action-phase-v1-current-series` is archived/maintenance-only: preserve playability, explicitly persisted V1 saves, and narrowly requested V1 fixes, but do not refactor or extend V1 for new gameplay. Existing V1 saves remain supported for compatibility and must not be converted to V2 merely by loading.
    81 |
    82 | V1 compatibility must not force V2 gameplay to use V1 models. In particular, V2 Encounter work should not rewrite or inherit the root Encounter Wheel, Hidden Grotto, Fishing/Surf toggles, rod access, or Hyperspace sub-wheel. V2 Route ordinary populations, Premium Resident slots, discoveries, private knowledge, suppressions, temporary injections, and same-Route rerolls belong to the V2 Route system boundary. Shared infrastructure remains shared only where the actual rule remains common; do not duplicate the entire Token system, but isolate version-specific Token interactions against the V2 system they affect. Broad V1 file/folder migration is not a prerequisite for V2 development.
```

### Retired Action/version runtime — docs — `IMPLEMENTATION_STATUS.md`

#### `action-phase-v1` — line 8

```text
     6 | ## Action Phase Balance Update
     7 |
     8 | Games now carry an explicit Action Phase version through `ruleset.actionPhaseVersion`. `action-phase-v2-real-series` is the current/default Rival Saga ruleset for newly created games and lobbies, and it mounts the V2 Route Action Phase workspace instead of the V1 location board. `action-phase-v1-current-series` is archived/maintenance-only: explicitly persisted V1 saves remain supported for compatibility and must keep loading as V1 without being converted to V2. New feature development targets V2 exclusively.
     9 |
    10 | V1 is now documented as maintenance/freeze-oriented, while V2 is the active gameplay-development target. The isolated V2 Route Encounter engine lives under `versions/next-action-phase/` and the browser mount now adapts its current Route Action, opportunity, result, and acquisition contract into persisted `state.v2` buckets. Fresh generated Routes 1-9 each independently roll and persist hidden 20-30 ordinary resident populations from the approved weighted Route distributions, plus 2 hidden permanent Premium Residents from Ultra Elite, Master, and Master Elite tiers. Existing persisted Route populations, including older 24-resident Routes, remain authoritative and are not regenerated. The route system persists hidden Route Quality for Routes 3-9, creates exactly one opportunity per normal Route Action, draws and publicly discovers permanent residents with reduced encounter weight for Premium Residents, preserves same-result reroll revisions on the same Route, checks personal duplicate ownership, maintains per-player private reveals, applies exact Battle Tier suppressions for Repel, mounts source-agnostic Route Effect records for private/table reveal and temporary injection operations, adds exactly four temporary Primary-Type encounter options to one pending opportunity using weighted tier rolls capped at Master, enforces Extra Encounter progression limits, constrains Master Ball to public/private known permanent residents, and finalizes acquisition records. Player-specific Duplicate ON/OFF preferences now persist only sparse OFF records by `playerId -> routeId -> residentId`; OFF can be set only for permanent residents known and owned by that player, filters only that player's standard random draw and random reroll pool, leaves explicit mechanics such as Master Ball/reveal/Repel unaffected, and does not mutate resident populations, Premium slot metadata, public discoveries, or another player's encounter pool. Extra Encounter's mounted browser contract purchases the approved $2,500 freely purchasable/storable Token as an exact inventory record, preflights the acting player's authoritative encounter pool before consumption, then consumes that exact record for one additional Route opportunity without spending a V2 Action.
```

### Retired Action/version runtime — other — `game-shell-contract.js`

#### `ACTION_PHASE_VERSION_V1` — line 10

```text
     8 |   const SUPPORTED_GAME_SCHEMA_VERSION = 1;
     9 |   const ISOLATED_GAME_ID_PATTERN = /^(?:browser-smoke|codex-)/i;
    10 |   const ACTION_PHASE_VERSION_V1 = "action-phase-v1-current-series";
    11 |   const ACTION_PHASE_VERSION_V2 = "action-phase-v2-real-series";
    12 |   const DEFAULT_ACTION_PHASE_VERSION = ACTION_PHASE_VERSION_V2;
```

#### `action-phase-v1` — line 10

```text
     8 |   const SUPPORTED_GAME_SCHEMA_VERSION = 1;
     9 |   const ISOLATED_GAME_ID_PATTERN = /^(?:browser-smoke|codex-)/i;
    10 |   const ACTION_PHASE_VERSION_V1 = "action-phase-v1-current-series";
    11 |   const ACTION_PHASE_VERSION_V2 = "action-phase-v2-real-series";
    12 |   const DEFAULT_ACTION_PHASE_VERSION = ACTION_PHASE_VERSION_V2;
```

#### `ACTION_PHASE_VERSION_V1` — line 53

```text
    51 |       || state.ruleset?.actionPhaseVersion
    52 |       || state.actionPhaseVersion;
    53 |     if (candidate === ACTION_PHASE_VERSION_V1) return ACTION_PHASE_VERSION_V1;
    54 |     if (candidate === ACTION_PHASE_VERSION_V2) return ACTION_PHASE_VERSION_V2;
    55 |     return isObject(record.state) ? ACTION_PHASE_VERSION_V1 : DEFAULT_ACTION_PHASE_VERSION;
```

#### `ACTION_PHASE_VERSION_V1` — line 55

```text
    53 |     if (candidate === ACTION_PHASE_VERSION_V1) return ACTION_PHASE_VERSION_V1;
    54 |     if (candidate === ACTION_PHASE_VERSION_V2) return ACTION_PHASE_VERSION_V2;
    55 |     return isObject(record.state) ? ACTION_PHASE_VERSION_V1 : DEFAULT_ACTION_PHASE_VERSION;
    56 |   }
    57 |
```

### Retired Action/version runtime — scripts/tooling — `scripts/fixtures/game-shell-fixtures.js`

#### `action-phase-v1` — line 22

```text
    20 |     updatedAt: "2026-07-24T12:00:00.000Z",
    21 |     version: 42,
    22 |     actionPhaseVersion: "action-phase-v1-current-series",
    23 |     maxPlayers: 5,
    24 |     members: [{ userId: "steven", role: "owner" }],
```

#### `action-phase-v1` — line 37

```text
    35 |     id: "legacy-supported",
    36 |     name: "Legacy Supported",
    37 |     actionPhaseVersion: "action-phase-v1-current-series",
    38 |     updatedAt: "2026-07-23T10:00:00.000Z",
    39 |     state: { series: "Johto", gym: 3, players: [{ id: "legacy-trainer", name: "Legacy" }] }
```

### Retired Action/version runtime — scripts/tooling — `scripts/v1-purge-inspect.js`

#### `ACTION_PHASE_VERSION_V1` — line 93

```text
    91 |   sections.push("## app.js — version contract and dispatch\n");
    92 |   sections.push(contextsFor("app.js", [
    93 |     "ACTION_PHASE_VERSION_V1",
    94 |     "ACTION_PHASE_VERSION_V2",
    95 |     "function normalizeActionPhaseVersion",
```

#### `ACTION_PHASE_VERSION_V1` — line 99

```text
    97 |     "supportedActionPhaseVersions",
    98 |     "function renderActionPhase()",
    99 |     "activeActionPhaseVersion() === ACTION_PHASE_VERSION_V1",
   100 |     "activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2",
   101 |   ], 18));
```

#### `ACTION_PHASE_VERSION_V1` — line 117

```text
   115 |   sections.push("\n## server.js — persisted version contract\n");
   116 |   sections.push(contextsFor("server.js", [
   117 |     "ACTION_PHASE_VERSION_V1",
   118 |     "ACTION_PHASE_VERSION_V2",
   119 |     "function normalizeActionPhaseVersion",
```

### Retired Action/version runtime — tests — `scripts/test-game-shell-loading.js`

#### `action-phase-v1` — line 61

```text
    59 |   assert.equal(progressed.phase, "battle");
    60 |   assert.equal(progressed.playerCount, 2);
    61 |   assert.equal(progressed.actionPhaseVersion, "action-phase-v1-current-series");
    62 |   assert.equal(contract.normalizeGameSummary(fixtures.modernTokenReferee).summary.actionPhaseVersion, "action-phase-v2-real-series");
    63 | });
```

#### `action-phase-v1` — line 72

```text
    70 |     name: "Pre-version Save",
    71 |     state: { series: "Kanto", gym: 2, currentPhase: "action", players: [] }
    72 |   }).summary.actionPhaseVersion, "action-phase-v1-current-series");
    73 | });
    74 |
```

#### `action-phase-v1` — line 99

```text
    97 |   assert.equal(progressed.phase, fixtures.currentProgressed.state.currentPhase);
    98 |   assert.equal(progressed.playerCount, fixtures.currentProgressed.state.players.length);
    99 |   assert.equal(progressed.actionPhaseVersion, "action-phase-v1-current-series");
   100 |   const modern = payload.games.find((game) => game.id === "modern-token-referee");
   101 |   assert.equal(modern.actionPhaseVersion, "action-phase-v2-real-series");
```

#### `action-phase-v1` — line 117

```text
   115 |   const payload = await fetch(`${origin}/api/games/legacy-supported/state`).then((response) => response.json());
   116 |   assert.equal(payload.gameId, "legacy-supported");
   117 |   assert.equal(payload.actionPhaseVersion, "action-phase-v1-current-series");
   118 |   assert.equal(payload.state.series, "Johto");
   119 |   assert.equal(digest(file), before);
```

### Retired Action/version runtime — tests — `scripts/test-v2-route-browser-mount.js`

#### `ACTION_PHASE_VERSION_V1` — line 52

```text
    50 |   assert.match(appJs, /const DEFAULT_ACTION_PHASE_VERSION = ACTION_PHASE_VERSION_V2/);
    51 |   assert.match(appJs, /const ACTION_PHASE_VERSION_V2 = "action-phase-v2-real-series"/);
    52 |   assert.match(appJs, /supportedActionPhaseVersions: \[ACTION_PHASE_VERSION_V1, ACTION_PHASE_VERSION_V2\]/);
    53 |   assert.match(createBody, /DEFAULT_ACTION_PHASE_VERSION/);
    54 |   assert.doesNotMatch(createCard, /action-phase-v1-current-series|Action Phase Version|V1/i);
```

#### `action-phase-v1` — line 54

```text
    52 |   assert.match(appJs, /supportedActionPhaseVersions: \[ACTION_PHASE_VERSION_V1, ACTION_PHASE_VERSION_V2\]/);
    53 |   assert.match(createBody, /DEFAULT_ACTION_PHASE_VERSION/);
    54 |   assert.doesNotMatch(createCard, /action-phase-v1-current-series|Action Phase Version|V1/i);
    55 | });
    56 |
```

### Retired Action/version runtime — tests — `scripts/test-v2-route-runtime-sequences.js`

#### `action-phase-v1` — line 175

```text
   173 |   state.ruleset = {
   174 |     actionPhaseVersion: "action-phase-v2-real-series",
   175 |     supportedActionPhaseVersions: ["action-phase-v1-current-series", "action-phase-v2-real-series"]
   176 |   };
   177 |   state.players.forEach((player) => {
```

### Retired Action/version runtime — versions — `versions/next-action-phase/ENCOUNTER_HIDDEN_GROTTO_MIGRATION_AUDIT.md`

#### `current-action-phase` — line 9

```text
     7 | - V1 was the repository-root website and backend when this audit was written. It is now archived/maintenance-only for explicitly persisted legacy saves.
     8 | - V2 is now mounted as the current/default ruleset for newly created games and lobbies. The notes below preserve the migration reasoning that kept Route work separate from V1 Encounter Wheel behavior.
     9 | - `versions/current-action-phase/README.md` documents V1 compatibility constraints without forking the source.
    10 | - The working tree currently has shared root modules and a dirty git state. Any root edit to encounter, token, action, persistence, or UI code can affect V1 immediately.
    11 |
```

### Retired Encounter event/taxonomy — other — `token-control-controller.js`

#### `encounterCopyRecords` — line 73

```text
    71 |     state.copiedTokenRelationships ||= [];
    72 |     state.privateEffectRecords ||= [];
    73 |     state.encounterCopyRecords ||= [];
    74 |     state.postPayoutProcedures ||= [];
    75 |     return state;
```

### Retired Encounter event/taxonomy — tests — `scripts/test-settled-effect-batch.js`

#### `encounterCopyRecords` — line 55

```text
    53 |     copiedTokenRelationships: [],
    54 |     privateEffectRecords: [],
    55 |     encounterCopyRecords: [],
    56 |     randomPokemonSessions: [],
    57 |     teambuilder: {},
```

#### `encounterSessionId` — line 172

```text
   170 |     id: "encounter-result-1", sourceType: "encounter", status: "confirmed", series: "Hoenn", gym: 3,
   171 |     ownerPlayerId: "red", playerId: "red", resultOwnerPlayerId: "red", rosterPokemonId: "red-existing",
   172 |     encounterSessionId: "encounter-1", resultDisplayName: "Glaceon", tierId: "great-elite", level: 88,
   173 |     rerollHistory: ["Eevee"], modifiers: ["boost"], tokenId: "reroll-1", heldItemId: "item-x",
   174 |     resultMetadata: { form: "standard", ownerPlayerId: "red", note: "private bonus", intrinsicRolledProperties: { shiny: true } }
```

### Retired Encounter event/taxonomy — tests — `scripts/test-token-browser.js`

#### `encounterSessionId` — line 2572

```text
  2570 |   );
  2571 |   productionState.encounterSessions = [{ id: "browser-028-encounter", status: "review", playerId: "gold", series: "Kanto", gym: 1, rolls: [], removedEntryIds: [] }];
  2572 |   productionState.randomPokemonSessions = [{ id: "browser-028-result", sourceType: "encounter", sourceLabel: "Encounter Wheel", status: "pending", rerollable: true, interactionLocked: false, playerId: "gold", ownerPlayerId: "gold", resultOwnerPlayerId: "gold", encounterSessionId: "browser-028-encounter", series: "Kanto", gym: 1, tierId: "C", resultPokemonName: "abra", resultDisplayName: "Abra", resultMetadata: { key: "abra", displayName: "Abra" }, rerollHistory: [], resultHistory: [] }];
  2573 |   const gameId = await navigateProduction(productionState, "BROWSER-028-REROLL");
  2574 |   const rerolled = await evaluate(`(async () => {
```

#### `"encounter-reroll"` — line 2588

```text
  2586 |       oldStatus: result.resultHistory[0]?.status || "", supersedes: Boolean(result.supersedesResultRevisionId),
  2587 |       inventory: state.players.find((player) => player.id === "gold").inventory.filter((item) => item.canonicalId === "reroll-token").length,
  2588 |       consumption: state.tokenConsumptions.filter((entry) => entry.source === "encounter-reroll").length,
  2589 |       operationId: operation?.id || "", retryStable: beforeRetry === JSON.stringify({ result: result.resultDisplayName, inventory: state.players.find((player) => player.id === "gold").inventory, operations: state.effectOperations })
  2590 |     };
```

### Retired Encounter Wheel runtime — docs — `LIVE_TABLE_ARCHITECTURE.md`

#### `encounterSessions` — line 205

```text
   203 | - `state.log`.
   204 | - `state.moneyLedger`.
   205 | - Session objects such as `encounterSessions` and `randomPokemonSessions`.
   206 |
   207 | This avoids making Live Table a second source of truth.
```

### Retired Encounter Wheel runtime — docs — `TOKEN_EFFECT_MATRIX.md`

#### `encounter-token-runtime` — line 584

```text
   582 | - **Persistence:** instant; Immediate; duration: Instant; expires: After resolution; replacement: None; stacking: Does not stack unless the rules text says otherwise.
   583 | - **Boundary record selection:** type: none; window: none; count: 0; copied payload: notApplicable.
   584 | - **Runtime status:** **verifiedComplete**. Runtime usability: **usable** - This Token may be declared through its current runtime flow. Evidence: Exact unresolved Encounter and wheel result identity, canonical replacement, superseded original revision, stale rejection, duplicate operation identity, multiple-copy inventory safety, normal acquisition continuation, production refresh, causal History undo, and sandbox isolation are covered by TLS-004, BROWSER-028, and TSB-027. Last verified test: encounter-token-runtime, token-reload-persistence, token-sandbox-isolation, token-undo-repair, lifecycle-completion-slice-e2e. Contract revision: 2026-08-04-lifecycle-completion-slice-v3.
   585 | - **Completion records:** outcome: {token} {result}.; audit: declaration, consumption, responses, passes, selectedTarget, selectedRosterInstanceId, selectedSpeciesId, applicationScope, affectedEntities, excludedEntities, resolverMode, result, mutations, relationships, undo; undo: players, pokemonRecords, lingeringStatuses, tokenActivations, interactionEvents.
   586 | - **Required tests:** Legal declaration timing, Illegal declaration timing, Outcome, Reload persistence, Newest-first undo/repair, Requires legal parent prompt, Response compatibility, Priority ownership, Parent pause/resume, No independent target unless rules require one
```

#### `encounter-token-runtime` — line 604

```text
   602 | - **Persistence:** instant; Immediate; duration: Instant; expires: After resolution; replacement: None; stacking: Does not stack unless the rules text says otherwise.
   603 | - **Boundary record selection:** type: none; window: none; count: 0; copied payload: notApplicable.
   604 | - **Runtime status:** **verifiedComplete**. Runtime usability: **usable** - Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle. Evidence: Action-only declaration, exact chosen-player validation, one authoritative Encounter roll grant, open-session extension, standalone session creation, stable grant identity, duplicate prevention, refresh persistence, normal Encounter completion, and snapshot undo are covered by focused runtime and integration tests. Last verified test: token-declaration-timing, token-reload-persistence, token-sandbox-isolation, token-undo-repair, encounter-token-runtime. Contract revision: 2026-08-04-lifecycle-completion-slice-v3.
   605 | - **Completion records:** outcome: {token} {result}.; audit: declaration, consumption, responses, passes, selectedTarget, selectedRosterInstanceId, selectedSpeciesId, applicationScope, affectedEntities, excludedEntities, resolverMode, result, mutations, relationships, undo; undo: players, pokemonRecords, lingeringStatuses, tokenActivations, interactionEvents.
   606 | - **Required tests:** Legal declaration timing, Illegal declaration timing, Outcome, Reload persistence, Newest-first undo/repair, Declaration consumed at most once, Pending event and response-chain behavior
```

#### `encounter-token-runtime` — line 684

```text
   682 | - **Persistence:** instant; Immediate; duration: Instant; expires: After resolution; replacement: None; stacking: Does not stack unless the rules text says otherwise.
   683 | - **Boundary record selection:** type: encounter; window: currentActionPhase; count: 1; copied payload: settled.
   684 | - **Runtime status:** **verifiedComplete**. Runtime usability: **usable** - Honey copies one immutable completed Encounter result at the End-of-Action checkpoint into a new acquisition-ready Encounter record without rerolling or copying ownership and transient history. Evidence: Exact finalized Encounter selection, fresh nonrecursive copy identity, canonical species/form/tier/level and intrinsic payload, normal acquisition handoff, duplicate and stale safety, production refresh, causal History undo through acquired roster creation, and sandbox isolation are covered by TLS-005, SEB-004, BROWSER-029, and TSB-027. Last verified test: encounter-token-runtime, token-reload-persistence, token-sandbox-isolation, token-undo-repair, lifecycle-completion-slice-e2e. Contract revision: 2026-08-04-lifecycle-completion-slice-v3.
   685 | - **Completion records:** outcome: {token} {result}.; audit: declaration, consumption, responses, passes, selectedTarget, selectedRosterInstanceId, selectedSpeciesId, applicationScope, affectedEntities, excludedEntities, resolverMode, result, mutations, relationships, undo; undo: players, pokemonRecords, lingeringStatuses, tokenActivations, interactionEvents.
   686 | - **Required tests:** Legal declaration timing, Illegal declaration timing, Outcome, Reload persistence, Newest-first undo/repair, Declaration consumed at most once, Pending event and response-chain behavior
```

### Retired Encounter Wheel runtime — docs — `TOKEN_QA_COVERAGE.md`

#### `encounter-token-runtime` — line 2776

```text
  2774 | - **Coverage:** Covered
  2775 | - **Test level:** Unit
  2776 | - **Test file:** `scripts/test-encounter-token-runtime.js`
  2777 | - **Test ID:** `ETR-003`
  2778 | - **Setup:** Gold has an open two-roll Encounter session and is selected as the exact Extra Encounter target.
```

#### `encounter-token-runtime.js` — line 2776

```text
  2774 | - **Coverage:** Covered
  2775 | - **Test level:** Unit
  2776 | - **Test file:** `scripts/test-encounter-token-runtime.js`
  2777 | - **Test ID:** `ETR-003`
  2778 | - **Setup:** Gold has an open two-roll Encounter session and is selected as the exact Extra Encounter target.
```

### Retired Encounter Wheel runtime — other — `token-sandbox-session.js`

#### `encounterModalOpen` — line 41

```text
    39 |     "selectedWheelSessionId",
    40 |     "skipWheelAnimation",
    41 |     "encounterModalOpen",
    42 |     "selectedEncounterSessionId",
    43 |     "randomPokemonDrawerOpen",
```

#### `selectedEncounterSessionId` — line 42

```text
    40 |     "skipWheelAnimation",
    41 |     "encounterModalOpen",
    42 |     "selectedEncounterSessionId",
    43 |     "randomPokemonDrawerOpen",
    44 |     "selectedRandomPokemonSessionId",
```

### Retired Encounter Wheel runtime — scripts/tooling — `scripts/import-pokeapi-hoenn-encounters.js`

#### `encounterWheelDefinitions` — line 347

```text
   345 |     "function encounterEntry(name, index = 0) { const raw = String(name || '').trim(); const isWater = /\\s+SF$/i.test(raw); const displayName = raw.replace(/\\s+SF$/i, '').trim(); const id = normalizeEncounterEntryId(displayName, index); const isHyperspace = normalizePokemonName(displayName) === 'hyperspace-hole'; return { id, pokemonName: displayName, displayName, weight: 1, category: isWater ? 'fishing' : isHyperspace ? 'special' : 'land', enabledByDefault: !isWater, removable: true }; }",
   346 |     "function makeEncounterWheel(series, gym, names) { const seen = new Map(); return { id: `${String(series).toLowerCase()}-gym-${gym}`, series, gym, name: `${series} Gym ${gym} Encounter Wheel`, rollsPerAction: 2, rerollable: true, entries: names.map((name) => { const key = normalizePokemonName(String(name).replace(/\\s+SF$/i, '').trim()); const count = seen.get(key) || 0; seen.set(key, count + 1); return encounterEntry(name, count); }) }; }",
   347 |     extractObjectFreezeStatement(appSource, "encounterWheelDefinitions"),
   348 |     "globalThis.__wheels = encounterWheelDefinitions;"
   349 |   ].join("\n");
```

#### `encounterWheelDefinitions` — line 348

```text
   346 |     "function makeEncounterWheel(series, gym, names) { const seen = new Map(); return { id: `${String(series).toLowerCase()}-gym-${gym}`, series, gym, name: `${series} Gym ${gym} Encounter Wheel`, rollsPerAction: 2, rerollable: true, entries: names.map((name) => { const key = normalizePokemonName(String(name).replace(/\\s+SF$/i, '').trim()); const count = seen.get(key) || 0; seen.set(key, count + 1); return encounterEntry(name, count); }) }; }",
   347 |     extractObjectFreezeStatement(appSource, "encounterWheelDefinitions"),
   348 |     "globalThis.__wheels = encounterWheelDefinitions;"
   349 |   ].join("\n");
   350 |   const sandbox = {};
```

### Retired Encounter Wheel runtime — scripts/tooling — `scripts/token-qa-coverage-data.js`

#### `encounter-token-runtime` — line 1391

```text
  1389 |       coverage: "Covered",
  1390 |       level: "Unit",
  1391 |       testFile: "scripts/test-encounter-token-runtime.js",
  1392 |       testId: "ETR-003",
  1393 |       setup: "Gold has an open two-roll Encounter session and is selected as the exact Extra Encounter target.",
```

#### `encounter-token-runtime.js` — line 1391

```text
  1389 |       coverage: "Covered",
  1390 |       level: "Unit",
  1391 |       testFile: "scripts/test-encounter-token-runtime.js",
  1392 |       testId: "ETR-003",
  1393 |       setup: "Gold has an open two-roll Encounter session and is selected as the exact Extra Encounter target.",
```

### Retired Encounter Wheel runtime — scripts/tooling — `scripts/v1-purge-inspect.js`

#### `encounter-token-runtime` — line 130

```text
   128 |     "encounterTab",
   129 |     "Hidden Grotto",
   130 |     "encounter-token-runtime.js",
   131 |   ], 12));
   132 |
```

#### `encounter-token-runtime.js` — line 130

```text
   128 |     "encounterTab",
   129 |     "Hidden Grotto",
   130 |     "encounter-token-runtime.js",
   131 |   ], 12));
   132 |
```

### Retired Encounter Wheel runtime — tests — `scripts/test-backend-persistence.js`

#### `locationId: "encounter"` — line 128

```text
   126 |         series: "Hoenn", gym: 8, selectedLocationId: "encounter",
   127 |         playerVisits: { "player-1": [{
   128 |           id: "encounter-visit-1", playerId: "player-1", locationId: "encounter",
   129 |           locationName: "Encounter", serviceId: "encounter-wheel", actionCost: 1,
   130 |           series: "Hoenn", gym: 8, phase: "action", actionOperationId: "encounter-operation-1",
```

#### `serviceId: "encounter-wheel"` — line 129

```text
   127 |         playerVisits: { "player-1": [{
   128 |           id: "encounter-visit-1", playerId: "player-1", locationId: "encounter",
   129 |           locationName: "Encounter", serviceId: "encounter-wheel", actionCost: 1,
   130 |           series: "Hoenn", gym: 8, phase: "action", actionOperationId: "encounter-operation-1",
   131 |           actionOperationStatus: "resolving"
```

#### `locationId: "encounter"` — line 135

```text
   133 |         actionOperations: [{
   134 |           id: "encounter-operation-1", visitId: "encounter-visit-1", playerId: "player-1",
   135 |           actionNumber: 1, locationId: "encounter", serviceId: "encounter-wheel",
   136 |           status: "resolving", linkedFeatureType: "encounter", linkedFeatureSessionId: "encounter-session-1"
   137 |         }],
```

#### `serviceId: "encounter-wheel"` — line 135

```text
   133 |         actionOperations: [{
   134 |           id: "encounter-operation-1", visitId: "encounter-visit-1", playerId: "player-1",
   135 |           actionNumber: 1, locationId: "encounter", serviceId: "encounter-wheel",
   136 |           status: "resolving", linkedFeatureType: "encounter", linkedFeatureSessionId: "encounter-session-1"
   137 |         }],
```

#### `locationId: "encounter"` — line 141

```text
   139 |         destinationCommit: {
   140 |           id: "encounter-destination-1", requestId: "encounter-destination-1", status: "resolving",
   141 |           playerId: "player-1", actionNumber: 1, locationId: "encounter",
   142 |           serviceId: "encounter-wheel", operationId: "encounter-operation-1"
   143 |         }
```

#### `serviceId: "encounter-wheel"` — line 142

```text
   140 |           id: "encounter-destination-1", requestId: "encounter-destination-1", status: "resolving",
   141 |           playerId: "player-1", actionNumber: 1, locationId: "encounter",
   142 |           serviceId: "encounter-wheel", operationId: "encounter-operation-1"
   143 |         }
   144 |       }
```

#### `encounterSessions` — line 148

```text
   146 |     seriesTrackers: {}
   147 |   },
   148 |   encounterSessions: [{
   149 |     id: "encounter-session-1", playerId: "player-1", series: "Hoenn", gym: 8,
   150 |     actionVisitId: "encounter-visit-1", status: "review", rolls: [{ rosterPokemonId: "poke-1" }],
```

#### `locationId: "encounter"` — line 184

```text
   182 |         destinationCommit: {
   183 |           id: "encounter-destination-starting", requestId: "encounter-destination-starting", status: "accepted",
   184 |           playerId: "player-1", actionNumber: 1, locationId: "encounter",
   185 |           serviceId: "encounter-wheel", operationId: "", acceptedAt: "2026-01-01T00:00:00.000Z"
   186 |         }
```

#### `serviceId: "encounter-wheel"` — line 185

```text
   183 |           id: "encounter-destination-starting", requestId: "encounter-destination-starting", status: "accepted",
   184 |           playerId: "player-1", actionNumber: 1, locationId: "encounter",
   185 |           serviceId: "encounter-wheel", operationId: "", acceptedAt: "2026-01-01T00:00:00.000Z"
   186 |         }
   187 |       }
```

#### `encounterSessions` — line 443

```text
   441 |   gymState.destinationCommit.completedAt = "2026-01-01T00:05:00.000Z";
   442 |   gymState.playerVisits["player-1"][0].actionOperationStatus = "completed";
   443 |   advancedState.encounterSessions[0].status = "completed";
   444 |   advancedState.series = "Hoenn";
   445 |   advancedState.gym = 9;
```

#### `encounterSessions` — line 469

```text
   467 |   gymState.activeActionOperationId = "";
   468 |   gymState.destinationCommit = null;
   469 |   undoneState.encounterSessions = [];
   470 |
   471 |   const response = await fetch(`${origin}/api/games/${outgoingUndoGameId}/state`, {
```

#### `locationId: "encounter"` — line 489

```text
   487 |   const gymState = startedState.actionPhaseState.selections["Hoenn-G8"];
   488 |   gymState.playerVisits["player-1"] = [{
   489 |     id: "encounter-visit-starting", playerId: "player-1", locationId: "encounter",
   490 |     locationName: "Encounter", serviceId: "encounter-wheel", actionCost: 1,
   491 |     series: "Hoenn", gym: 8, phase: "action", actionOperationId: "encounter-operation-starting",
```

#### `serviceId: "encounter-wheel"` — line 490

```text
   488 |   gymState.playerVisits["player-1"] = [{
   489 |     id: "encounter-visit-starting", playerId: "player-1", locationId: "encounter",
   490 |     locationName: "Encounter", serviceId: "encounter-wheel", actionCost: 1,
   491 |     series: "Hoenn", gym: 8, phase: "action", actionOperationId: "encounter-operation-starting",
   492 |     actionOperationStatus: "resolving"
```

#### `locationId: "encounter"` — line 496

```text
   494 |   gymState.actionOperations = [{
   495 |     id: "encounter-operation-starting", visitId: "encounter-visit-starting", playerId: "player-1",
   496 |     actionNumber: 1, locationId: "encounter", serviceId: "encounter-wheel",
   497 |     status: "resolving", linkedFeatureType: "encounter", linkedFeatureSessionId: "encounter-session-starting"
   498 |   }];
```

#### `serviceId: "encounter-wheel"` — line 496

```text
   494 |   gymState.actionOperations = [{
   495 |     id: "encounter-operation-starting", visitId: "encounter-visit-starting", playerId: "player-1",
   496 |     actionNumber: 1, locationId: "encounter", serviceId: "encounter-wheel",
   497 |     status: "resolving", linkedFeatureType: "encounter", linkedFeatureSessionId: "encounter-session-starting"
   498 |   }];
```

#### `encounterSessions` — line 502

```text
   500 |   gymState.destinationCommit.status = "resolving";
   501 |   gymState.destinationCommit.operationId = "encounter-operation-starting";
   502 |   startedState.encounterSessions = [{
   503 |     id: "encounter-session-starting", playerId: "player-1", series: "Hoenn", gym: 8,
   504 |     actionVisitId: "encounter-visit-starting", actionVisitIds: ["encounter-visit-starting"],
```

#### `encounterSessions` — line 522

```text
   520 |   assert.equal(storedGymState.destinationCommit.operationId, "encounter-operation-starting");
   521 |   assert.equal(storedGymState.actionOperations[0].status, "resolving");
   522 |   assert.equal(stored.state.encounterSessions[0].id, "encounter-session-starting");
   523 | });
   524 |
```

### Retired Encounter Wheel runtime — tests — `scripts/test-provisional-declaration-runtime.js`

#### `locationId: "encounter"` — line 126

```text
   124 |     playerId: "austin",
   125 |     actionNumber: 1,
   126 |     locationId: "encounter",
   127 |     serviceId: "encounter-roll"
   128 |   }, undefined, { actionsPerPlayer: 3, isBlocking: lifecycle.isBlocking });
```

#### `locationId: "encounter"` — line 146

```text
   144 |   gymState.destinationCommit = {
   145 |     id: "destination-1", status: runtime.DESTINATION_STATES.RESOLVING,
   146 |     playerId: "austin", actionNumber: 1, locationId: "encounter", serviceId: "encounter-roll", operationId: "operation-1"
   147 |   };
   148 |   gymState.actionOperations.push({ id: "operation-1", playerId: "austin", actionNumber: 1, status: "resolving" });
```

### Retired Encounter Wheel runtime — tests — `scripts/test-provisional-declaration-server.js`

#### `locationId: "encounter"` — line 241

```text
   239 |     body: {
   240 |       clientId: "destination-client", expectedVersion: 1, requestId: "destination-loser", commitId: "destination-loser",
   241 |       playerId: "austin", actionNumber: 1, locationId: "encounter", serviceId: "encounter-roll"
   242 |     }
   243 |   });
```

#### `locationId: "encounter"` — line 255

```text
   253 |     body: {
   254 |       clientId: "destination-client", expectedVersion: 1, requestId: "destination-winner", commitId: "destination-winner",
   255 |       playerId: "austin", actionNumber: 1, locationId: "encounter", serviceId: "encounter-roll"
   256 |     }
   257 |   });
```

### Retired Encounter Wheel runtime — tests — `scripts/test-settled-effect-batch.js`

#### `sourceType: "encounter"` — line 170

```text
   168 |   const state = stateFixture();
   169 |   state.randomPokemonSessions.push({
   170 |     id: "encounter-result-1", sourceType: "encounter", status: "confirmed", series: "Hoenn", gym: 3,
   171 |     ownerPlayerId: "red", playerId: "red", resultOwnerPlayerId: "red", rosterPokemonId: "red-existing",
   172 |     encounterSessionId: "encounter-1", resultDisplayName: "Glaceon", tierId: "great-elite", level: 88,
```

### Retired Encounter Wheel runtime — tests — `scripts/test-token-browser.js`

#### `encounterSessions` — line 976

```text
   974 |   productionState.currentPhase = "action";
   975 |   productionState.phaseState = { "Kanto:G1": { currentPhase: "action", flowState: "action" } };
   976 |   productionState.encounterSessions = [];
   977 |   productionState.players.find((player) => player.id === "steevee").inventory.push({
   978 |     id: "steevee-extra-encounter-1",
```

#### `encounterSessions` — line 998

```text
   996 |     });
   997 |     if (!activation) throw new Error("Extra Encounter did not resolve.");
   998 |     const session = state.encounterSessions.find((entry) => entry.id === state.selectedEncounterSessionId);
   999 |     if (backendSync.saveTimer) {
  1000 |       clearTimeout(backendSync.saveTimer);
```

#### `selectedEncounterSessionId` — line 998

```text
   996 |     });
   997 |     if (!activation) throw new Error("Extra Encounter did not resolve.");
   998 |     const session = state.encounterSessions.find((entry) => entry.id === state.selectedEncounterSessionId);
   999 |     if (backendSync.saveTimer) {
  1000 |       clearTimeout(backendSync.saveTimer);
```

#### `selectedEncounterSessionId` — line 1013

```text
  1011 |       grantCount: session?.extraEncounterGrants?.length || 0,
  1012 |       tokenCount: actor.inventory.filter((item) => item.id === "steevee-extra-encounter-1").length,
  1013 |       selectedSessionId: state.selectedEncounterSessionId,
  1014 |       modalOpen: state.encounterModalOpen,
  1015 |       logId: log?.id || ""
```

#### `encounterModalOpen` — line 1014

```text
  1012 |       tokenCount: actor.inventory.filter((item) => item.id === "steevee-extra-encounter-1").length,
  1013 |       selectedSessionId: state.selectedEncounterSessionId,
  1014 |       modalOpen: state.encounterModalOpen,
  1015 |       logId: log?.id || ""
  1016 |     };
```

#### `encounterSessions` — line 1028

```text
  1026 |   await reloadProduction("browser-010-extra-encounter");
  1027 |   const reloaded = await evaluate(`(() => {
  1028 |     const session = state.encounterSessions.find((entry) => entry.id === ${JSON.stringify(resolved.sessionId)});
  1029 |     return {
  1030 |       sessionCount: state.encounterSessions.length,
```

#### `encounterSessions` — line 1030

```text
  1028 |     const session = state.encounterSessions.find((entry) => entry.id === ${JSON.stringify(resolved.sessionId)});
  1029 |     return {
  1030 |       sessionCount: state.encounterSessions.length,
  1031 |       playerId: session?.playerId || "",
  1032 |       maxRolls: Number(session?.maxRolls || 0),
```

#### `encounterSessions` — line 1051

```text
  1049 |     undoLogEntry(log.id);
  1050 |     return {
  1051 |       sessionCount: state.encounterSessions.length,
  1052 |       tokenCount: state.players.find((player) => player.id === "steevee").inventory
  1053 |         .filter((item) => item.id === "steevee-extra-encounter-1").length,
```

#### `selectedEncounterSessionId` — line 1054

```text
  1052 |       tokenCount: state.players.find((player) => player.id === "steevee").inventory
  1053 |         .filter((item) => item.id === "steevee-extra-encounter-1").length,
  1054 |       selectedSessionId: state.selectedEncounterSessionId,
  1055 |       modalOpen: state.encounterModalOpen,
  1056 |       undone: Boolean(state.log.find((entry) => entry.id === log.id)?.undone)
```

#### `encounterModalOpen` — line 1055

```text
  1053 |         .filter((item) => item.id === "steevee-extra-encounter-1").length,
  1054 |       selectedSessionId: state.selectedEncounterSessionId,
  1055 |       modalOpen: state.encounterModalOpen,
  1056 |       undone: Boolean(state.log.find((entry) => entry.id === log.id)?.undone)
  1057 |     };
```

#### `encounterSessions` — line 2571

```text
  2569 |     { id: "gold-reroll-browser-2", canonicalId: "reroll-token", name: "Reroll", type: "TOKEN" }
  2570 |   );
  2571 |   productionState.encounterSessions = [{ id: "browser-028-encounter", status: "review", playerId: "gold", series: "Kanto", gym: 1, rolls: [], removedEntryIds: [] }];
  2572 |   productionState.randomPokemonSessions = [{ id: "browser-028-result", sourceType: "encounter", sourceLabel: "Encounter Wheel", status: "pending", rerollable: true, interactionLocked: false, playerId: "gold", ownerPlayerId: "gold", resultOwnerPlayerId: "gold", encounterSessionId: "browser-028-encounter", series: "Kanto", gym: 1, tierId: "C", resultPokemonName: "abra", resultDisplayName: "Abra", resultMetadata: { key: "abra", displayName: "Abra" }, rerollHistory: [], resultHistory: [] }];
  2573 |   const gameId = await navigateProduction(productionState, "BROWSER-028-REROLL");
```

#### `sourceType: "encounter"` — line 2572

```text
  2570 |   );
  2571 |   productionState.encounterSessions = [{ id: "browser-028-encounter", status: "review", playerId: "gold", series: "Kanto", gym: 1, rolls: [], removedEntryIds: [] }];
  2572 |   productionState.randomPokemonSessions = [{ id: "browser-028-result", sourceType: "encounter", sourceLabel: "Encounter Wheel", status: "pending", rerollable: true, interactionLocked: false, playerId: "gold", ownerPlayerId: "gold", resultOwnerPlayerId: "gold", encounterSessionId: "browser-028-encounter", series: "Kanto", gym: 1, tierId: "C", resultPokemonName: "abra", resultDisplayName: "Abra", resultMetadata: { key: "abra", displayName: "Abra" }, rerollHistory: [], resultHistory: [] }];
  2573 |   const gameId = await navigateProduction(productionState, "BROWSER-028-REROLL");
  2574 |   const rerolled = await evaluate(`(async () => {
```

#### `sourceType: "encounter"` — line 2622

```text
  2620 |   productionState.players.find((player) => player.id === "gold").inventory.push({ id: "gold-honey-browser-1", canonicalId: "honey-token", name: "Honey", type: "TOKEN" });
  2621 |   productionState.randomPokemonSessions = [
  2622 |     { id: "browser-029-source-a", sourceType: "encounter", sourceLabel: "Encounter Wheel", status: "confirmed", series: "Kanto", gym: 1, ownerPlayerId: "red", resultOwnerPlayerId: "red", resultDisplayName: "Garchomp", tierId: "S", tier: "S", level: 54, resultMetadata: { speciesId: "garchomp", speciesName: "Garchomp", form: "Standard", intrinsicRolledProperties: { shiny: true } } },
  2623 |     { id: "browser-029-source-b", sourceType: "encounter", sourceLabel: "Encounter Wheel", status: "confirmed", series: "Kanto", gym: 1, ownerPlayerId: "steevee", resultOwnerPlayerId: "steevee", resultDisplayName: "Lucario", tierId: "A", tier: "A", level: 52, resultMetadata: { speciesId: "lucario", speciesName: "Lucario", form: "Standard" } }
  2624 |   ];
```

#### `sourceType: "encounter"` — line 2623

```text
  2621 |   productionState.randomPokemonSessions = [
  2622 |     { id: "browser-029-source-a", sourceType: "encounter", sourceLabel: "Encounter Wheel", status: "confirmed", series: "Kanto", gym: 1, ownerPlayerId: "red", resultOwnerPlayerId: "red", resultDisplayName: "Garchomp", tierId: "S", tier: "S", level: 54, resultMetadata: { speciesId: "garchomp", speciesName: "Garchomp", form: "Standard", intrinsicRolledProperties: { shiny: true } } },
  2623 |     { id: "browser-029-source-b", sourceType: "encounter", sourceLabel: "Encounter Wheel", status: "confirmed", series: "Kanto", gym: 1, ownerPlayerId: "steevee", resultOwnerPlayerId: "steevee", resultDisplayName: "Lucario", tierId: "A", tier: "A", level: 52, resultMetadata: { speciesId: "lucario", speciesName: "Lucario", form: "Standard" } }
  2624 |   ];
  2625 |   const gameId = await navigateProduction(productionState, "BROWSER-029-HONEY");
```

### Retired Encounter Wheel runtime — tests — `scripts/test-token-lifecycle-slice.js`

#### `sourceType: "encounter"` — line 94

```text
    92 | test("[TLS-004] Reroll supersedes one exact unresolved result once and preserves a causal original revision", () => {
    93 |   const state = controlStateFixture("lifecycle-reroll");
    94 |   state.randomPokemonSessions = [{ id: "result-1", sourceType: "encounter", status: "pending", rerollable: true, playerId: "gold", ownerPlayerId: "gold", resultOwnerPlayerId: "gold", resultDisplayName: "Abra", resultPokemonName: "abra", resultMetadata: { key: "abra" } }];
    95 |   state.players.find((player) => player.id === "gold").inventory.push({ id: "gold-reroll-1", name: "Reroll", canonicalId: "reroll-token", type: "TOKEN" });
    96 |   const input = { sourceEffectId: "reroll-operation-1", actorPlayerId: "gold", tokenInventoryRecordId: "gold-reroll-1", targetResultId: "result-1", replacementResult: { key: "ralts", displayName: "Ralts" } };
```

#### `sourceType: "encounter"` — line 120

```text
   118 | test("[TLS-005] Honey copies only settled intrinsic encounter identity and rejects recursive or stale sources", () => {
   119 |   const state = controlStateFixture("lifecycle-honey");
   120 |   state.randomPokemonSessions = [{ id: "source-encounter", sourceType: "encounter", sourceLabel: "Encounter Wheel", status: "confirmed", series: "Kanto", gym: 1, resultDisplayName: "Rotom-Wash", tierId: "B", level: 54, resultMetadata: { speciesId: "rotom", speciesName: "Rotom", form: "Wash", intrinsicRolledProperties: { shiny: true } }, ownerPlayerId: "red", rosterPokemonId: "red-old", acquiredAt: "old" }];
   121 |   const result = effects.resolveHoneyEncounterCopy(state, { sourceEffectId: "honey-1", ownerPlayerId: "gold", sourceRandomPokemonSessionId: "source-encounter" }, options(state));
   122 |   assert.equal(result.result, "resolved");
```

### Retired Encounter Wheel runtime — versions — `versions/next-action-phase/ENCOUNTER_HIDDEN_GROTTO_MIGRATION_AUDIT.md`

#### `encounterWheelDefinitions` — line 32

```text
    30 | | Version boundary | V1 root behavior was active when this audit was written; V2 is now the default mounted ruleset and V1 is archived for compatibility. | `versions/README.md`, root app modules, current saves. | SHARED / UNAFFECTED as architecture, but a migration risk. | Keep Route behavior versioned under V2 and preserve explicit V1 save compatibility. |
    31 | | Encounter location | `actionLocationServices` exposes Encounter as "Open Encounter Wheel"; one action rolls the current gym wheel twice. | Action destination picker, provisional destination reservation, Live Referee operation lifecycle. | V2 CONVERT. | Replace location service with Route exploration service; define action cost, route selection/visibility, actor permissions, and completion conditions. |
    32 | | Encounter wheel definitions | `encounterWheelDefinitions` are hard-coded in `app.js` by series/gym; entries have weight/category/default flags. Hoenn includes `Hyperspace Hole`. | Encounter roll pool, import cross-check script, docs, UI labels. | V2 REMOVE / CONVERT. | Move Route encounter data to V2 route modules; keep V1 definitions intact; add data parity tests for route residents instead of fixed wheels. |
    33 | | Encounter session state | `state.encounterSessions` stores player, series/gym, wheel id, max rolls, fishing/surf toggles, removed/temporary entries, weights, rolls, status, visual rotation, extra grants. | Save normalization, overlay, action operations, undo, Extra Encounter, Reroll, Honey, token snapshots. | V2 CONVERT. | Define `routeEncounterSessions` or versioned encounter session schema with route id, revealed residents, resident pool suppressions, selected/revealed Pokemon, and private/public visibility. |
    34 | | Random Pokemon result state | `state.randomPokemonSessions` stores pending or confirmed Pokemon result records from Encounter, Game Corner, Honey, and other sources. Encounter rolls can create child random sessions. | Result drawer, timing windows, Reroll, Honey, Game Corner tickets, causal undo. | V2 CONVERT. | Decide whether Route results reuse `randomPokemonSessions` or get a route-specific result record; preserve exact unresolved-result identity and acquisition handoff. |
```

#### `encounterSessions` — line 33

```text
    31 | | Encounter location | `actionLocationServices` exposes Encounter as "Open Encounter Wheel"; one action rolls the current gym wheel twice. | Action destination picker, provisional destination reservation, Live Referee operation lifecycle. | V2 CONVERT. | Replace location service with Route exploration service; define action cost, route selection/visibility, actor permissions, and completion conditions. |
    32 | | Encounter wheel definitions | `encounterWheelDefinitions` are hard-coded in `app.js` by series/gym; entries have weight/category/default flags. Hoenn includes `Hyperspace Hole`. | Encounter roll pool, import cross-check script, docs, UI labels. | V2 REMOVE / CONVERT. | Move Route encounter data to V2 route modules; keep V1 definitions intact; add data parity tests for route residents instead of fixed wheels. |
    33 | | Encounter session state | `state.encounterSessions` stores player, series/gym, wheel id, max rolls, fishing/surf toggles, removed/temporary entries, weights, rolls, status, visual rotation, extra grants. | Save normalization, overlay, action operations, undo, Extra Encounter, Reroll, Honey, token snapshots. | V2 CONVERT. | Define `routeEncounterSessions` or versioned encounter session schema with route id, revealed residents, resident pool suppressions, selected/revealed Pokemon, and private/public visibility. |
    34 | | Random Pokemon result state | `state.randomPokemonSessions` stores pending or confirmed Pokemon result records from Encounter, Game Corner, Honey, and other sources. Encounter rolls can create child random sessions. | Result drawer, timing windows, Reroll, Honey, Game Corner tickets, causal undo. | V2 CONVERT. | Decide whether Route results reuse `randomPokemonSessions` or get a route-specific result record; preserve exact unresolved-result identity and acquisition handoff. |
    35 | | Encounter rolling UI | `index.html` includes `encounterOverlay`; `renderEncounterOverlay` draws a wheel, session tabs, active entries, result cards, weight editor, include Fishing/Surf toggle, Add/Reroll/Done controls. | Browser runtime, CSS, event delegation, tests, screenshots. | V2 REMOVE / CONVERT. | Build Route UI around revealed residents and route actions, not a spinning wheel; keep V1 overlay available until V1 retirement. |
```

#### `encounter-token-runtime` — line 49

```text
    47 | | Encounter token catalog | Encounter tokens include Reroll, Extra Encounter, Repel, Quick Ball, Dream Ball, Honey, Master Ball, Beast Ball. | Shop, Live Referee, token art, token matrix/handoff/coverage, controller routing. | V2 MIXED. | Audit each token contract against Route rules and regenerate token docs after V2 definitions change. |
    48 | | Reroll Token | V1 rerolls exact unresolved Encounter rolls, Encounter result sessions, and supported wheel results; consumes exact token unless free due to banned/owned-family result; records superseded revisions and causal undo. | Encounter overlay, random-result drawer, Live Referee selector, token-control effects, tests. | V2 CONVERT. | Reroll must become same-Route reroll against an exact unresolved Route result; define whether revealed/known residents constrain replacement. |
    49 | | Extra Encounter Token | V1 Action-only token targets one player and creates or extends an authoritative Encounter session by exactly one roll with stable grant identity. | `encounter-token-runtime.js`, immediate token use, notifications, browser/unit/sandbox tests. | V2 CONVERT. | Create or extend one Route encounter opportunity for a chosen player; preserve stable grant identity, exact target, persistence, undo, and duplicate prevention. |
    50 | | Repel | V1 contract says remove one Pokemon per 5 entries on an Encounter Wheel; currently guided/text-only rather than automatic gameplay mutation. | Token contract, matrix, handoff, guided Live Referee audit, potential wheel editing fields. | V2 CONVERT. | Implement Route Repel as suppress 5 Route residents of a chosen Battle Tier; define private/public visibility and exact resident identity. |
    51 | | Master Ball Token | V1 contract says choose your encounter before the wheel; currently guided/text-only. | Token contract, token shop/art/matrix, Live Referee guided result. | V2 CONVERT. | Let player select one Pokemon revealed to that player on the Route; define reveal eligibility, locking, and whether rivals can respond. |
```

#### `encounter-token-runtime.js` — line 49

```text
    47 | | Encounter token catalog | Encounter tokens include Reroll, Extra Encounter, Repel, Quick Ball, Dream Ball, Honey, Master Ball, Beast Ball. | Shop, Live Referee, token art, token matrix/handoff/coverage, controller routing. | V2 MIXED. | Audit each token contract against Route rules and regenerate token docs after V2 definitions change. |
    48 | | Reroll Token | V1 rerolls exact unresolved Encounter rolls, Encounter result sessions, and supported wheel results; consumes exact token unless free due to banned/owned-family result; records superseded revisions and causal undo. | Encounter overlay, random-result drawer, Live Referee selector, token-control effects, tests. | V2 CONVERT. | Reroll must become same-Route reroll against an exact unresolved Route result; define whether revealed/known residents constrain replacement. |
    49 | | Extra Encounter Token | V1 Action-only token targets one player and creates or extends an authoritative Encounter session by exactly one roll with stable grant identity. | `encounter-token-runtime.js`, immediate token use, notifications, browser/unit/sandbox tests. | V2 CONVERT. | Create or extend one Route encounter opportunity for a chosen player; preserve stable grant identity, exact target, persistence, undo, and duplicate prevention. |
    50 | | Repel | V1 contract says remove one Pokemon per 5 entries on an Encounter Wheel; currently guided/text-only rather than automatic gameplay mutation. | Token contract, matrix, handoff, guided Live Referee audit, potential wheel editing fields. | V2 CONVERT. | Implement Route Repel as suppress 5 Route residents of a chosen Battle Tier; define private/public visibility and exact resident identity. |
    51 | | Master Ball Token | V1 contract says choose your encounter before the wheel; currently guided/text-only. | Token contract, token shop/art/matrix, Live Referee guided result. | V2 CONVERT. | Let player select one Pokemon revealed to that player on the Route; define reveal eligibility, locking, and whether rivals can respond. |
```

#### `encounterSessions` — line 79

```text
    77 | 12. Replace Hoenn wheel importer/cross-checks with Route resident import/generation tooling.
    78 | 13. Add isolated V2 tests for Route session creation, reveal privacy, reroll, extra encounter, repel suppression, master-ball selection, persistence, reload, and undo.
    79 | 14. Add migration tests proving existing V1 saves with `encounterSessions`, `randomPokemonSessions`, `hiddenGrottoSessions`, rods, and legacy perks remain playable under V1.
    80 | 15. Promote V2 to root only after `ARCHITECTURE.md`, `TIMING_AND_PHASES.md`, `IMPLEMENTATION_STATUS.md`, token matrices, and browser evidence are updated.
    81 |
```

### Retired Hidden Grotto runtime — scripts/tooling — `scripts/v1-purge-inspect.js`

#### `hiddenGrottoSessions` — line 105

```text
   103 |   sections.push("\n## app.js — retired encounter domains\n");
   104 |   sections.push(contextsFor("app.js", [
   105 |     "hiddenGrottoSessions",
   106 |     "function startHiddenGrottoSession",
   107 |     "encounterWheelDefinition",
```

#### `startHiddenGrottoSession` — line 106

```text
   104 |   sections.push(contextsFor("app.js", [
   105 |     "hiddenGrottoSessions",
   106 |     "function startHiddenGrottoSession",
   107 |     "encounterWheelDefinition",
   108 |     "encounterTokenRuntime",
```

### Retired Hidden Grotto runtime — tests — `scripts/test-action-operation-contract.js`

#### `hidden-grotto` — line 18

```text
    16 | test("required completion hooks and bounded picker layout are wired", () => {
    17 |   for (const hook of [
    18 |     "silph-co-choice-complete", "hidden-grotto-choice-complete", "bulletin-quests-confirmed",
    19 |     "encounter-session-closed", "wheel-session-closed", "dragons-den-placement-complete"
    20 |   ]) assert.match(appSource, new RegExp(hook));
```

#### `startHiddenGrottoSession` — line 84

```text
    82 |
    83 | test("Hidden Grotto supports direct type choice starts", () => {
    84 |   assert.match(appSource, /async function startHiddenGrottoSession\(\{ chosenType = "" \} = \{\}\)/);
    85 |   assert.match(appSource, /data-grotto-start-type/);
    86 |   assert.match(appSource, /Direct Type Choice/);
```

### Retired Hidden Grotto runtime — tests — `scripts/test-action-phase-balance.js`

#### `startHiddenGrottoSession` — line 81

```text
    79 |   assert.match(appSource, /if \(entry\.finalSale \|\| entry\.clearance\) return false;/);
    80 |   assert.match(appSource, /pokemonIds: ids, developments, cost: totalCost/);
    81 |   const finalizedSilphRenderer = appSource.slice(appSource.lastIndexOf("function renderSilphCoDetails"), appSource.indexOf("async function startHiddenGrottoSession"));
    82 |   assert.doesNotMatch(finalizedSilphRenderer, /randomUniqueSample|data-silph-reroll/);
    83 | });
```

### Retired Hidden Grotto runtime — versions — `versions/next-action-phase/ENCOUNTER_HIDDEN_GROTTO_MIGRATION_AUDIT.md`

#### `hiddenGrottoSessions` — line 44

```text
    42 | | Hidden Grotto location | Hidden Grotto costs 1 Action and money, rolls 3 types, player chooses 1, then rolls 3 Pokemon of that type and chooses 1. | Action picker, location UI, money ledger, Pokemon acquisition, action operation completion. | V2 REMOVE. | Do not include Hidden Grotto as a Route system dependency unless a later balance review recreates it as a Route event. |
    43 | | Hidden Grotto pool | Pool is built from Pokemon index entries up to two Battle Tier steps above the natural gym tier; bans, encounter eligibility, low-tier NFE filtering, type filtering, and roll-group dedupe apply. | Pokemon build data, balance tiers, ban status, type list, UI pool counts. | V2 REMOVE / LATER REVIEW. | Route resident generation should not inherit this pool rule accidentally; decide separately whether any Grotto-style type choice survives as route discovery. |
    44 | | Hidden Grotto session state | `state.hiddenGrottoSessions` stores rolled types, rolled Pokemon, chosen type/Pokemon, target tier, cost, ledger id, roster id, status. | Save normalization, active session lookup, render flow, undo. | V2 REMOVE. | Existing saves keep this field for V1. V2 migration should either ignore it or archive legacy sessions read-only. |
    45 | | Hidden Grotto perks | `Grotto Regular` discounts Hidden Grotto; `Encounter Pro` grants a free Hidden Grotto encounter. | Perk definitions, perk displays, possible manual rulings. | V2 REMOVE / LATER REVIEW. | Flag for Perk balance review; do not auto-convert to Route perks without approved rules. |
    46 | | Encounter-related perks | `Beast In A Dream` applies Beast Ball or Dream Ball after an Encounter roll; the `Reroll` perk grants three free reroll-token uses per gym by text. | Perk definitions, manual/table rulings, token surfaces. | V2 CONVERT / LATER REVIEW. | Convert only if Route-era Beast/Dream/Reroll semantics are approved; otherwise mark unavailable in V2 balance pass. |
```

#### `hiddenGrottoSessions` — line 79

```text
    77 | 12. Replace Hoenn wheel importer/cross-checks with Route resident import/generation tooling.
    78 | 13. Add isolated V2 tests for Route session creation, reveal privacy, reroll, extra encounter, repel suppression, master-ball selection, persistence, reload, and undo.
    79 | 14. Add migration tests proving existing V1 saves with `encounterSessions`, `randomPokemonSessions`, `hiddenGrottoSessions`, rods, and legacy perks remain playable under V1.
    80 | 15. Promote V2 to root only after `ARCHITECTURE.md`, `TIMING_AND_PHASES.md`, `IMPLEMENTATION_STATUS.md`, token matrices, and browser evidence are updated.
    81 |
```

### Rules-review text only — docs — `ARCHITECTURE.md`

#### `Encounter Wheel` — line 82

```text
    80 | Action Phase behavior is now a pinned ruleset contract. `action-phase-v2-real-series` is the current/default Rival Saga ruleset for newly created games and lobbies. V2 is the exclusive target for new feature development. `action-phase-v1-current-series` is archived/maintenance-only: preserve playability, explicitly persisted V1 saves, and narrowly requested V1 fixes, but do not refactor or extend V1 for new gameplay. Existing V1 saves remain supported for compatibility and must not be converted to V2 merely by loading.
    81 |
    82 | V1 compatibility must not force V2 gameplay to use V1 models. In particular, V2 Encounter work should not rewrite or inherit the root Encounter Wheel, Hidden Grotto, Fishing/Surf toggles, rod access, or Hyperspace sub-wheel. V2 Route ordinary populations, Premium Resident slots, discoveries, private knowledge, suppressions, temporary injections, and same-Route rerolls belong to the V2 Route system boundary. Shared infrastructure remains shared only where the actual rule remains common; do not duplicate the entire Token system, but isolate version-specific Token interactions against the V2 system they affect. Broad V1 file/folder migration is not a prerequisite for V2 development.
    83 |
    84 | Future V2 Route modifiers should call the Route Effect API instead of directly mutating resident arrays, public discovery lists, player-private knowledge, suppressions, or opportunity temporary residents. Route Effect records persist source metadata, affected route/player/opportunity IDs, hidden affected resident IDs, status, count, and creation revision; player-facing selectors project only safe summaries plus public and viewer-private knowledge. The Route layer remains source-agnostic: Trainer Classes, Perks, Tokens, Gym modifiers, and Action rewards may request private/table reveals or temporary Primary-Type injection later, but the Route engine must not import or infer Class-specific rules.
```

#### `Hidden Grotto` — line 82

```text
    80 | Action Phase behavior is now a pinned ruleset contract. `action-phase-v2-real-series` is the current/default Rival Saga ruleset for newly created games and lobbies. V2 is the exclusive target for new feature development. `action-phase-v1-current-series` is archived/maintenance-only: preserve playability, explicitly persisted V1 saves, and narrowly requested V1 fixes, but do not refactor or extend V1 for new gameplay. Existing V1 saves remain supported for compatibility and must not be converted to V2 merely by loading.
    81 |
    82 | V1 compatibility must not force V2 gameplay to use V1 models. In particular, V2 Encounter work should not rewrite or inherit the root Encounter Wheel, Hidden Grotto, Fishing/Surf toggles, rod access, or Hyperspace sub-wheel. V2 Route ordinary populations, Premium Resident slots, discoveries, private knowledge, suppressions, temporary injections, and same-Route rerolls belong to the V2 Route system boundary. Shared infrastructure remains shared only where the actual rule remains common; do not duplicate the entire Token system, but isolate version-specific Token interactions against the V2 system they affect. Broad V1 file/folder migration is not a prerequisite for V2 development.
    83 |
    84 | Future V2 Route modifiers should call the Route Effect API instead of directly mutating resident arrays, public discovery lists, player-private knowledge, suppressions, or opportunity temporary residents. Route Effect records persist source metadata, affected route/player/opportunity IDs, hidden affected resident IDs, status, count, and creation revision; player-facing selectors project only safe summaries plus public and viewer-private knowledge. The Route layer remains source-agnostic: Trainer Classes, Perks, Tokens, Gym modifiers, and Action rewards may request private/table reveals or temporary Primary-Type injection later, but the Route engine must not import or infer Class-specific rules.
```

#### `Encounter Wheel` — line 535

```text
   533 | Current location rule foundations:
   534 |
   535 | - Encounter: roll the Encounter Wheel for the current gym twice.
   536 | - Department Store: one persisted visit per Gym over the unrestricted Item and TM catalogs, with one 75% sale, capped normal savings, and three stable Clearance rolls. Move Dojo and Item/TM Points are removed.
   537 | - Day Care: deposit up to two Pokémon for $1,500 each. They remain visible but unavailable and return automatically next Gym with +3 Levels and a TM choice.
```

#### `Encounter Wheel` — line 542

```text
   540 | - Game Corner: buy/use consolidated Battle Tier Tickets or play the $2,000 Slot Machine with the finalized 20/30/25/15/7/3 table.
   541 | - PC: Legacy Tickets can only be used here. Supports Legacy releases and 1/2/3-ticket Legacy effects.
   542 | - Pokemon Center: cleanse and protect the Encounter Wheel for the gym, restore recent released Pokemon for tier-scaled costs, or buy an Emergency Immunity Token for 5000 that expires at gym end.
   543 | - Hidden Grotto: pay 1500, roll 3 random types, choose one, then roll 3 Pokemon from the chosen type and choose one. The Pokemon roll pool includes Battle Tiers up to two tier steps above the current Gym's natural Battle Tier, clamped at Master Elite. Pokemon in LC or LC Elite that can still evolve are excluded, but fully evolved or single-stage Pokemon in those low tiers remain eligible.
   544 | - Dragon's Den: leave exactly one Pokémon for one Gym at consolidated-tier cost, then choose a legal move or AAA-approved Ability.
```

#### `Hidden Grotto` — line 543

```text
   541 | - PC: Legacy Tickets can only be used here. Supports Legacy releases and 1/2/3-ticket Legacy effects.
   542 | - Pokemon Center: cleanse and protect the Encounter Wheel for the gym, restore recent released Pokemon for tier-scaled costs, or buy an Emergency Immunity Token for 5000 that expires at gym end.
   543 | - Hidden Grotto: pay 1500, roll 3 random types, choose one, then roll 3 Pokemon from the chosen type and choose one. The Pokemon roll pool includes Battle Tiers up to two tier steps above the current Gym's natural Battle Tier, clamped at Master Elite. Pokemon in LC or LC Elite that can still evolve are excluded, but fully evolved or single-stage Pokemon in those low tiers remain eligible.
   544 | - Dragon's Den: leave exactly one Pokémon for one Gym at consolidated-tier cost, then choose a legal move or AAA-approved Ability.
   545 | - Silph Co. R&D: develop up to three Pokémon at consolidated-tier costs; each persists two Ability and four Move options until one is selected.
```

### Rules-review text only — docs — `CODEX_RULES_UNDERSTANDING_AUDIT.md`

#### `Hidden Grotto` — line 38

```text
    36 | Confirmed: Action Phase is the most ordered phase. Each player has 3 actions per Action Phase. Turn order is locked when the action gym state is created and is derived from placement order. Players take actions in order, then the order loops.
    37 |
    38 | Confirmed: Action Phase locations include Encounter, Department Store, Move Dojo, Breeder, Ranger Base, Graveyard, Game Corner, PC, Pokemon Center, Hidden Grotto, Dragon's Den, Silph Co R&D, and Bulletin Board.
    39 |
    40 | Confirmed: Before Battle Phase, the app supports team building, team locking, schedules, battle records, and validation. Team Lock is treated as an important timing window in architecture, especially for curses, but it is not yet a complete independent phase engine.
```

### Rules-review text only — docs — `docs/ROUTE_ENCOUNTER_RULES_SHARE.md`

#### `Encounter Wheel` — line 5

```text
     3 | ## Overview
     4 |
     5 | Encounter Wheels are replaced by **Routes**.
     6 |
     7 | At the beginning of each Series, Routes 1–9 generate their own hidden Pokémon ecosystems. These ecosystems remain fixed for the entire Series.
```

#### `Encounter Wheel` — line 158

```text
   156 | ## Route Effects
   157 |
   158 | Effects that previously manipulated Encounter Wheels now use a shared Route-effect system.
   159 |
   160 | ### 1. Injection
```

#### `Encounter Wheel` — line 237

```text
   235 | The old Type Package concept is replaced by **Route Injection**.
   236 |
   237 | Instead of receiving a separate package of Encounter Wheel Pokémon, effects can temporarily add eligible Pokémon matching a type/tier requirement to the selected Route encounter.
   238 |
   239 | This allows Classes, Perks, Tokens, rewards, and other mechanics to manipulate encounters without creating separate encounter systems.
```

### Rules-review text only — docs — `IMPLEMENTATION_STATUS.md`

#### `Hidden Grotto` — line 66

```text
    64 | The HUD now supports floating, right/left/bottom docked, expanded, full-table, and collapsed presentations using device-local preferences. Floating bounds reach 96% of the practical viewport; automatic surface-aware allocation, Situation/Table focus, and a persisted pointer/keyboard divider replace the rigid split. Collection and reading screens retain bounded content scrolling with reserved command bars, and compact pentagon mode keeps all five stable seats plus actor, priority, controlled, waiting, confirmation, and alert states. Appearance controls expose density, 90/100/110% scale, and reduced motion without rerendering the surrounding Game Manager or resetting form drafts. Existing single-player target options are mirrored onto the matching pentagon nodes and route back through the existing select/change path; the form remains the fallback and no target legality is added. Lightweight announcements are derived only from existing Action-complete, Team-lock, revision, priority-complete, and effect-result records.
    65 |
    66 | Action visits now create a persisted, idempotent Action operation. Visit confirmation spends the Action once, while the operation keeps the same player and Action number current until its linked location session and chronology blockers finish. Hidden Grotto, Encounter, Silph Co, Bulletin Board, wheel services, Dragon's Den, Ranger Base, Daycare, Game Corner, Pokemon Center, Graveyard, Department Store, and PC are wired to the shared contract. Multi-service locations require the visible Finish Action control, which now uses a compact authoritative completion route rather than a full-state upload. Fully obtained Encounter sessions complete automatically and old fully obtained review sessions repair on load. Generic immediate services complete through the shared path. Interaction resolution retries a completion that was waiting on a linked response chain.
    67 |
    68 | Action destination startup now recognizes the exact backend reservation that immediately precedes a local location starter. Shared visit starters and Game Corner continue only their matching accepted reservation, while Encounter uses an explicit post-reservation path and reports startup failure so the existing rollback can release the commit. Action Phase also exposes a visible Demo Mode toggle and direct trainer selection through the turn rail. New or geometry-free clients default Live Referee to docked mode, with bottom docking on narrow screens. Isolated production-browser scenarios verified Encounter acquisition repair, Department Store start/finish, Game Corner Slot Machine spin/review/finish, and legacy Game Corner Ticket detection plus a Safari result through its five-player response window while the save stayed `Saved`.
```

### Rules-review text only — docs — `LIVE_TABLE_ARCHITECTURE.md`

#### `Hidden Grotto` — line 248

```text
   246 |   type: "pending-result",
   247 |   phase: "action",
   248 |   title: "Hidden Grotto Encounter Pending",
   249 |   body: "Gold rolled Horsea. Players may respond, transact, or pass before the result is finalized.",
   250 |   gameflowMode: "individual",
```

### Rules-review text only — docs — `RULEBOOK_ALIGNMENT_AUDIT.md`

#### `Hidden Grotto` — line 19

```text
    17 | - Legacy shop-level and point fields may remain in save migrations, but they no longer restrict products or grant discounts.
    18 | - The Department Store replaces both former Action Phase shop locations; its persisted visit supplies the finalized sale, normal-discount, and Clearance rules.
    19 | - Hidden Grotto now costs 1500 and uses the correct flow: roll 3 random types, choose 1 type, roll 3 Pokemon from that type, choose 1 Pokemon. Its Pokemon pool is the current Gym's legal Battle Tier baseline or lower.
    20 | - Daycare is now the player-facing location name. Breeder remains available as a Trainer Class name.
    21 | - Day Care deposit/return now records TM Move Pending for new activity.
```

### Rules-review text only — docs — `TOKEN_EFFECT_MATRIX.md`

#### `Encounter Wheel` — line 601

```text
   599 | - **Smokescreen replacement-wheel policy:** **notAllowed**. This encounter modifier does not expose a legal alternate gameplay target for this mechanism. Operation: replaceOneCorrespondingTarget; original-player result keeps target: yes; no legal corresponding target: keepOriginalTarget.
   600 | - **Declaration:** Consume 1 Token; mode: consumeOnUse; consume at Declaration confirmation; legal use: consume; misses: consume; blocked: consume; other costs: None; announcement: {actor} used {token}{targetClause}.
   601 | - **Resolution intent:** **automatic** via `extraEncounter`. Create or extend one authoritative Encounter session for the chosen player, Grant exactly one additional Encounter Wheel roll, Open the normal Encounter review flow Success: The declaration remains legal when its prompt resolves. Failure/no effect: The effect is negated, canceled, or its target is no longer legal. Parent: Close this effect after its response chain resolves.
   602 | - **Persistence:** instant; Immediate; duration: Instant; expires: After resolution; replacement: None; stacking: Does not stack unless the rules text says otherwise.
   603 | - **Boundary record selection:** type: none; window: none; count: 0; copied payload: notApplicable.
```

### Rules-review text only — production/runtime — `app.js`

#### `Hidden Grotto` — line 1121

```text
  1119 |     "name": "Grotto Regular",
  1120 |     "tier": "C",
  1121 |     "description": "Hidden Grotto Encounters Cost 750 Less For You.",
  1122 |     "isConsumable": false,
  1123 |     "uses": null
```

#### `Hidden Grotto` — line 1265

```text
  1263 |     "name": "Encounter Pro",
  1264 |     "tier": "A",
  1265 |     "description": "Once Per Action Phase Get A Free Hidden Grotto Encounter.",
  1266 |     "isConsumable": false,
  1267 |     "uses": null
```

#### `Hidden Grotto` — line 2165

```text
  2163 |     "name": "Grotto Pass",
  2164 |     "tier": "C",
  2165 |     "description": "Visit The Hidden Grotto Without Using An Action.",
  2166 |     "isConsumable": true,
  2167 |     "uses": 2
```

#### `Encounter Wheel` — line 38390

```text
 38388 | const bulletinQuestBank = Object.freeze({
 38389 |   easy: [
 38390 |     ["Pokemon Hunt", "Spin The Encounter Wheel Twice"],
 38391 |     ["Find An Item", "Visit The Department Store & Buy An Item"],
 38392 |     ["Ranger Check-In", "Visit The Ranger Base"],
```

#### `Hidden Grotto` — line 38416

```text
 38414 |     ["Off My Meds", "Visit The Pokemon Center & Use A Center's Paid Option."],
 38415 |     ["Prize Pokemon", "Win At The Game Corner Or Use A Game Corner Ticket."],
 38416 |     ["Tracking The Beast", "Catch A Pokemon From The Hidden Grotto"],
 38417 |     ["The Dragon's Discount", "Leave A Pokemon In The Dragons Den"],
 38418 |     ["Supply Run", "Spend 9K"],
```

### Rules-review text only — scripts/tooling — `scripts/import-pokeapi-hoenn-encounters.js`

#### `Encounter Wheel` — line 346

```text
   344 |     "function normalizeEncounterEntryId(name, index = 0) { const base = normalizePokemonName(name).replace(/-sf$/i, '').replace(/^hyperspace-hole$/i, 'hyperspace-hole'); return index ? `${base}-${index + 1}` : base; }",
   345 |     "function encounterEntry(name, index = 0) { const raw = String(name || '').trim(); const isWater = /\\s+SF$/i.test(raw); const displayName = raw.replace(/\\s+SF$/i, '').trim(); const id = normalizeEncounterEntryId(displayName, index); const isHyperspace = normalizePokemonName(displayName) === 'hyperspace-hole'; return { id, pokemonName: displayName, displayName, weight: 1, category: isWater ? 'fishing' : isHyperspace ? 'special' : 'land', enabledByDefault: !isWater, removable: true }; }",
   346 |     "function makeEncounterWheel(series, gym, names) { const seen = new Map(); return { id: `${String(series).toLowerCase()}-gym-${gym}`, series, gym, name: `${series} Gym ${gym} Encounter Wheel`, rollsPerAction: 2, rerollable: true, entries: names.map((name) => { const key = normalizePokemonName(String(name).replace(/\\s+SF$/i, '').trim()); const count = seen.get(key) || 0; seen.set(key, count + 1); return encounterEntry(name, count); }) }; }",
   347 |     extractObjectFreezeStatement(appSource, "encounterWheelDefinitions"),
   348 |     "globalThis.__wheels = encounterWheelDefinitions;"
```

### Rules-review text only — scripts/tooling — `scripts/v1-purge-inspect.js`

#### `Encounter Wheel` — line 126

```text
   124 |   sections.push("\n## index.html — retired encounter UI\n");
   125 |   sections.push(contextsFor("index.html", [
   126 |     "Encounter Wheel",
   127 |     "encounterOverlay",
   128 |     "encounterTab",
```

#### `Hidden Grotto` — line 129

```text
   127 |     "encounterOverlay",
   128 |     "encounterTab",
   129 |     "Hidden Grotto",
   130 |     "encounter-token-runtime.js",
   131 |   ], 12));
```

#### `Hidden Grotto` — line 141

```text
   139 |     "honey-token",
   140 |     "master-ball-token",
   141 |     "Hidden Grotto",
   142 |     "Encounter Wheel",
   143 |   ], 10));
```

#### `Encounter Wheel` — line 142

```text
   140 |     "master-ball-token",
   141 |     "Hidden Grotto",
   142 |     "Encounter Wheel",
   143 |   ], 10));
   144 |
```

### Rules-review text only — tests — `scripts/test-action-operation-contract.js`

#### `Hidden Grotto` — line 83

```text
    81 | });
    82 |
    83 | test("Hidden Grotto supports direct type choice starts", () => {
    84 |   assert.match(appSource, /async function startHiddenGrottoSession\(\{ chosenType = "" \} = \{\}\)/);
    85 |   assert.match(appSource, /data-grotto-start-type/);
```

### Rules-review text only — tests — `scripts/test-token-browser.js`

#### `Encounter Wheel` — line 2572

```text
  2570 |   );
  2571 |   productionState.encounterSessions = [{ id: "browser-028-encounter", status: "review", playerId: "gold", series: "Kanto", gym: 1, rolls: [], removedEntryIds: [] }];
  2572 |   productionState.randomPokemonSessions = [{ id: "browser-028-result", sourceType: "encounter", sourceLabel: "Encounter Wheel", status: "pending", rerollable: true, interactionLocked: false, playerId: "gold", ownerPlayerId: "gold", resultOwnerPlayerId: "gold", encounterSessionId: "browser-028-encounter", series: "Kanto", gym: 1, tierId: "C", resultPokemonName: "abra", resultDisplayName: "Abra", resultMetadata: { key: "abra", displayName: "Abra" }, rerollHistory: [], resultHistory: [] }];
  2573 |   const gameId = await navigateProduction(productionState, "BROWSER-028-REROLL");
  2574 |   const rerolled = await evaluate(`(async () => {
```

#### `Encounter Wheel` — line 2622

```text
  2620 |   productionState.players.find((player) => player.id === "gold").inventory.push({ id: "gold-honey-browser-1", canonicalId: "honey-token", name: "Honey", type: "TOKEN" });
  2621 |   productionState.randomPokemonSessions = [
  2622 |     { id: "browser-029-source-a", sourceType: "encounter", sourceLabel: "Encounter Wheel", status: "confirmed", series: "Kanto", gym: 1, ownerPlayerId: "red", resultOwnerPlayerId: "red", resultDisplayName: "Garchomp", tierId: "S", tier: "S", level: 54, resultMetadata: { speciesId: "garchomp", speciesName: "Garchomp", form: "Standard", intrinsicRolledProperties: { shiny: true } } },
  2623 |     { id: "browser-029-source-b", sourceType: "encounter", sourceLabel: "Encounter Wheel", status: "confirmed", series: "Kanto", gym: 1, ownerPlayerId: "steevee", resultOwnerPlayerId: "steevee", resultDisplayName: "Lucario", tierId: "A", tier: "A", level: 52, resultMetadata: { speciesId: "lucario", speciesName: "Lucario", form: "Standard" } }
  2624 |   ];
```

#### `Encounter Wheel` — line 2623

```text
  2621 |   productionState.randomPokemonSessions = [
  2622 |     { id: "browser-029-source-a", sourceType: "encounter", sourceLabel: "Encounter Wheel", status: "confirmed", series: "Kanto", gym: 1, ownerPlayerId: "red", resultOwnerPlayerId: "red", resultDisplayName: "Garchomp", tierId: "S", tier: "S", level: 54, resultMetadata: { speciesId: "garchomp", speciesName: "Garchomp", form: "Standard", intrinsicRolledProperties: { shiny: true } } },
  2623 |     { id: "browser-029-source-b", sourceType: "encounter", sourceLabel: "Encounter Wheel", status: "confirmed", series: "Kanto", gym: 1, ownerPlayerId: "steevee", resultOwnerPlayerId: "steevee", resultDisplayName: "Lucario", tierId: "A", tier: "A", level: 52, resultMetadata: { speciesId: "lucario", speciesName: "Lucario", form: "Standard" } }
  2624 |   ];
  2625 |   const gameId = await navigateProduction(productionState, "BROWSER-029-HONEY");
```

### Rules-review text only — tests — `scripts/test-token-lifecycle-slice.js`

#### `Encounter Wheel` — line 120

```text
   118 | test("[TLS-005] Honey copies only settled intrinsic encounter identity and rejects recursive or stale sources", () => {
   119 |   const state = controlStateFixture("lifecycle-honey");
   120 |   state.randomPokemonSessions = [{ id: "source-encounter", sourceType: "encounter", sourceLabel: "Encounter Wheel", status: "confirmed", series: "Kanto", gym: 1, resultDisplayName: "Rotom-Wash", tierId: "B", level: 54, resultMetadata: { speciesId: "rotom", speciesName: "Rotom", form: "Wash", intrinsicRolledProperties: { shiny: true } }, ownerPlayerId: "red", rosterPokemonId: "red-old", acquiredAt: "old" }];
   121 |   const result = effects.resolveHoneyEncounterCopy(state, { sourceEffectId: "honey-1", ownerPlayerId: "gold", sourceRandomPokemonSessionId: "source-encounter" }, options(state));
   122 |   assert.equal(result.result, "resolved");
```

### Rules-review text only — tests — `scripts/test-v2-route-browser-mount.js`

#### `Encounter Wheel` — line 68

```text
    66 | });
    67 |
    68 | test("loading V2 renders Route Action without invoking V1 Encounter Wheel behavior", () => {
    69 |   const body = functionBody("renderV2RouteActionPhase");
    70 |   assert.match(body, /v2EnsureRouteSeriesState/);
```

#### `Encounter Wheel` — line 72

```text
    70 |   assert.match(body, /v2EnsureRouteSeriesState/);
    71 |   assert.match(body, /renderV2RouteLanding|renderV2RouteBrowser|renderV2RouteResultPanel/);
    72 |   assert.doesNotMatch(body, /Encounter Wheel|encounterWheelDefinition|createWheelSession|openEncounter|startEncounter/i);
    73 | });
    74 |
```

### Rules-review text only — versions — `versions/next-action-phase/ACTION_PHASE_V2_PLAN.md`

#### `Encounter Wheel` — line 91

```text
    89 | Route Action integration slice: `implementation/route-action-resolver.js` implements `route-exploration` as the first isolated V2 Action type. It validates player/Series/Route/action availability, records one reversible Action spend, creates one Route encounter opportunity, resolves one Route result, finalizes one canonical owned Pokemon through `implementation/route-pokemon-acquisition.js`, and settles only after acquisition. The persisted causal chain is Action ID -> Spend ID -> Opportunity ID -> Result ID -> Acquisition ID -> Pokemon record ID.
    90 |
    91 | This slice intentionally does not mount Route encounters into the live website yet. V1 Encounter Wheel, Hidden Grotto, Fishing/Surf, rods, and Hyperspace stay in the root app for V1 compatibility until an explicit promotion pass.
    92 |
    93 | ## Promotion Checklist
```

#### `Hidden Grotto` — line 91

```text
    89 | Route Action integration slice: `implementation/route-action-resolver.js` implements `route-exploration` as the first isolated V2 Action type. It validates player/Series/Route/action availability, records one reversible Action spend, creates one Route encounter opportunity, resolves one Route result, finalizes one canonical owned Pokemon through `implementation/route-pokemon-acquisition.js`, and settles only after acquisition. The persisted causal chain is Action ID -> Spend ID -> Opportunity ID -> Result ID -> Acquisition ID -> Pokemon record ID.
    90 |
    91 | This slice intentionally does not mount Route encounters into the live website yet. V1 Encounter Wheel, Hidden Grotto, Fishing/Surf, rods, and Hyperspace stay in the root app for V1 compatibility until an explicit promotion pass.
    92 |
    93 | ## Promotion Checklist
```

### Rules-review text only — versions — `versions/next-action-phase/ENCOUNTER_HIDDEN_GROTTO_MIGRATION_AUDIT.md`

#### `Hidden Grotto` — line 1

```text
     1 | # Encounter and Hidden Grotto Migration Audit
     2 |
     3 | Status: Historical V2 planning audit from before V2 promotion. Use current architecture/status docs for runtime truth.
```

#### `Encounter Wheel` — line 8

```text
     6 |
     7 | - V1 was the repository-root website and backend when this audit was written. It is now archived/maintenance-only for explicitly persisted legacy saves.
     8 | - V2 is now mounted as the current/default ruleset for newly created games and lobbies. The notes below preserve the migration reasoning that kept Route work separate from V1 Encounter Wheel behavior.
     9 | - `versions/current-action-phase/README.md` documents V1 compatibility constraints without forking the source.
    10 | - The working tree currently has shared root modules and a dirty git state. Any root edit to encounter, token, action, persistence, or UI code can affect V1 immediately.
```

#### `Encounter Wheel` — line 14

```text
    12 | ## Migration Risk Summary
    13 |
    14 | The legacy Encounter Wheel and Hidden Grotto systems are not isolated data files. They are intertwined with:
    15 |
    16 | - Action Phase visit spending and action-operation completion.
```

#### `Hidden Grotto` — line 14

```text
    12 | ## Migration Risk Summary
    13 |
    14 | The legacy Encounter Wheel and Hidden Grotto systems are not isolated data files. They are intertwined with:
    15 |
    16 | - Action Phase visit spending and action-operation completion.
```

#### `Encounter Wheel` — line 24

```text
    22 | - Docs, generated token matrices, browser tests, contract tests, and import scripts.
    23 |
    24 | V2 should therefore introduce Route-era encounter state in the V2 sandbox first, then promote behind an explicit version contract. Do not delete or rewrite V1 Encounter Wheel, Hidden Grotto, rods, or legacy token flows as incidental cleanup.
    25 |
    26 | ## Dependency Map
```

#### `Hidden Grotto` — line 24

```text
    22 | - Docs, generated token matrices, browser tests, contract tests, and import scripts.
    23 |
    24 | V2 should therefore introduce Route-era encounter state in the V2 sandbox first, then promote behind an explicit version contract. Do not delete or rewrite V1 Encounter Wheel, Hidden Grotto, rods, or legacy token flows as incidental cleanup.
    25 |
    26 | ## Dependency Map
```

#### `Encounter Wheel` — line 31

```text
    29 | | --- | --- | --- | --- | --- |
    30 | | Version boundary | V1 root behavior was active when this audit was written; V2 is now the default mounted ruleset and V1 is archived for compatibility. | `versions/README.md`, root app modules, current saves. | SHARED / UNAFFECTED as architecture, but a migration risk. | Keep Route behavior versioned under V2 and preserve explicit V1 save compatibility. |
    31 | | Encounter location | `actionLocationServices` exposes Encounter as "Open Encounter Wheel"; one action rolls the current gym wheel twice. | Action destination picker, provisional destination reservation, Live Referee operation lifecycle. | V2 CONVERT. | Replace location service with Route exploration service; define action cost, route selection/visibility, actor permissions, and completion conditions. |
    32 | | Encounter wheel definitions | `encounterWheelDefinitions` are hard-coded in `app.js` by series/gym; entries have weight/category/default flags. Hoenn includes `Hyperspace Hole`. | Encounter roll pool, import cross-check script, docs, UI labels. | V2 REMOVE / CONVERT. | Move Route encounter data to V2 route modules; keep V1 definitions intact; add data parity tests for route residents instead of fixed wheels. |
    33 | | Encounter session state | `state.encounterSessions` stores player, series/gym, wheel id, max rolls, fishing/surf toggles, removed/temporary entries, weights, rolls, status, visual rotation, extra grants. | Save normalization, overlay, action operations, undo, Extra Encounter, Reroll, Honey, token snapshots. | V2 CONVERT. | Define `routeEncounterSessions` or versioned encounter session schema with route id, revealed residents, resident pool suppressions, selected/revealed Pokemon, and private/public visibility. |
```

#### `Encounter Wheel` — line 39

```text
    37 | | Fishing / Surf / rods | Old Rod, Great Rod, and Super Rod are utility shop products; Encounter sessions have grouped `includeFishing` / `includeSurf` toggles. UI notes say this should later come from items/effects. | Utility shop, item import script, Encounter pool filtering, sprites aliases. | V2 REMOVE. | Remove rod/Tackle Box access from V2 route design; if water route residents exist, model them as route residents or route tags, not owned rod toggles. |
    38 | | Hyperspace sub-wheel | Encounter entry `Hyperspace Hole` resolves into `hyperspaceWheelDefinitions`; rerolls can either stay inside the sub-wheel or respin the original encounter. | Hoenn wheel data, roll result metadata, Reroll UI, action log. | V2 REDESIGN / LATER REVIEW. | Decide whether Hyperspace becomes a Route event, rare resident, route modifier, or removed legacy mechanic. Do not carry the sub-wheel by default. |
    39 | | Encounter acquisition | Encounter roll "Add" creates an Active Pokemon record with source `Encounter Wheel`, source/acquisition tier, sprite, branch lock metadata, and Pokemon log. | Roster, Teambuilder, Pokemon log, MVP/League views, undo. | V2 CONVERT. | Route acquisition must still call the canonical Pokemon acquisition path but with source `Route Encounter` and route metadata. |
    40 | | Encounter close/completion | Closing requires all unadded rolls to be added, then completes every linked action visit with `encounter-session-closed`. | Action operation lifecycle, Live Referee blockers, tests. | V2 CONVERT. | Define Route encounter terminal states and required choices; add completion hooks for action-operation release and backend reload. |
    41 | | Encounter undo | `undoEncounterActionVisit` removes only the rolls tied to the undone visit, child random sessions, interactions, transactions, roster records, and possibly the whole encounter session. | History undo, token undo snapshots, action visit repair. | V2 CONVERT. | Build route-aware undo that can reverse a route action without damaging V1 session records or unrelated Route reveals. |
```

#### `Hidden Grotto` — line 42

```text
    40 | | Encounter close/completion | Closing requires all unadded rolls to be added, then completes every linked action visit with `encounter-session-closed`. | Action operation lifecycle, Live Referee blockers, tests. | V2 CONVERT. | Define Route encounter terminal states and required choices; add completion hooks for action-operation release and backend reload. |
    41 | | Encounter undo | `undoEncounterActionVisit` removes only the rolls tied to the undone visit, child random sessions, interactions, transactions, roster records, and possibly the whole encounter session. | History undo, token undo snapshots, action visit repair. | V2 CONVERT. | Build route-aware undo that can reverse a route action without damaging V1 session records or unrelated Route reveals. |
    42 | | Hidden Grotto location | Hidden Grotto costs 1 Action and money, rolls 3 types, player chooses 1, then rolls 3 Pokemon of that type and chooses 1. | Action picker, location UI, money ledger, Pokemon acquisition, action operation completion. | V2 REMOVE. | Do not include Hidden Grotto as a Route system dependency unless a later balance review recreates it as a Route event. |
    43 | | Hidden Grotto pool | Pool is built from Pokemon index entries up to two Battle Tier steps above the natural gym tier; bans, encounter eligibility, low-tier NFE filtering, type filtering, and roll-group dedupe apply. | Pokemon build data, balance tiers, ban status, type list, UI pool counts. | V2 REMOVE / LATER REVIEW. | Route resident generation should not inherit this pool rule accidentally; decide separately whether any Grotto-style type choice survives as route discovery. |
    44 | | Hidden Grotto session state | `state.hiddenGrottoSessions` stores rolled types, rolled Pokemon, chosen type/Pokemon, target tier, cost, ledger id, roster id, status. | Save normalization, active session lookup, render flow, undo. | V2 REMOVE. | Existing saves keep this field for V1. V2 migration should either ignore it or archive legacy sessions read-only. |
```

#### `Hidden Grotto` — line 43

```text
    41 | | Encounter undo | `undoEncounterActionVisit` removes only the rolls tied to the undone visit, child random sessions, interactions, transactions, roster records, and possibly the whole encounter session. | History undo, token undo snapshots, action visit repair. | V2 CONVERT. | Build route-aware undo that can reverse a route action without damaging V1 session records or unrelated Route reveals. |
    42 | | Hidden Grotto location | Hidden Grotto costs 1 Action and money, rolls 3 types, player chooses 1, then rolls 3 Pokemon of that type and chooses 1. | Action picker, location UI, money ledger, Pokemon acquisition, action operation completion. | V2 REMOVE. | Do not include Hidden Grotto as a Route system dependency unless a later balance review recreates it as a Route event. |
    43 | | Hidden Grotto pool | Pool is built from Pokemon index entries up to two Battle Tier steps above the natural gym tier; bans, encounter eligibility, low-tier NFE filtering, type filtering, and roll-group dedupe apply. | Pokemon build data, balance tiers, ban status, type list, UI pool counts. | V2 REMOVE / LATER REVIEW. | Route resident generation should not inherit this pool rule accidentally; decide separately whether any Grotto-style type choice survives as route discovery. |
    44 | | Hidden Grotto session state | `state.hiddenGrottoSessions` stores rolled types, rolled Pokemon, chosen type/Pokemon, target tier, cost, ledger id, roster id, status. | Save normalization, active session lookup, render flow, undo. | V2 REMOVE. | Existing saves keep this field for V1. V2 migration should either ignore it or archive legacy sessions read-only. |
    45 | | Hidden Grotto perks | `Grotto Regular` discounts Hidden Grotto; `Encounter Pro` grants a free Hidden Grotto encounter. | Perk definitions, perk displays, possible manual rulings. | V2 REMOVE / LATER REVIEW. | Flag for Perk balance review; do not auto-convert to Route perks without approved rules. |
```

#### `Hidden Grotto` — line 44

```text
    42 | | Hidden Grotto location | Hidden Grotto costs 1 Action and money, rolls 3 types, player chooses 1, then rolls 3 Pokemon of that type and chooses 1. | Action picker, location UI, money ledger, Pokemon acquisition, action operation completion. | V2 REMOVE. | Do not include Hidden Grotto as a Route system dependency unless a later balance review recreates it as a Route event. |
    43 | | Hidden Grotto pool | Pool is built from Pokemon index entries up to two Battle Tier steps above the natural gym tier; bans, encounter eligibility, low-tier NFE filtering, type filtering, and roll-group dedupe apply. | Pokemon build data, balance tiers, ban status, type list, UI pool counts. | V2 REMOVE / LATER REVIEW. | Route resident generation should not inherit this pool rule accidentally; decide separately whether any Grotto-style type choice survives as route discovery. |
    44 | | Hidden Grotto session state | `state.hiddenGrottoSessions` stores rolled types, rolled Pokemon, chosen type/Pokemon, target tier, cost, ledger id, roster id, status. | Save normalization, active session lookup, render flow, undo. | V2 REMOVE. | Existing saves keep this field for V1. V2 migration should either ignore it or archive legacy sessions read-only. |
    45 | | Hidden Grotto perks | `Grotto Regular` discounts Hidden Grotto; `Encounter Pro` grants a free Hidden Grotto encounter. | Perk definitions, perk displays, possible manual rulings. | V2 REMOVE / LATER REVIEW. | Flag for Perk balance review; do not auto-convert to Route perks without approved rules. |
    46 | | Encounter-related perks | `Beast In A Dream` applies Beast Ball or Dream Ball after an Encounter roll; the `Reroll` perk grants three free reroll-token uses per gym by text. | Perk definitions, manual/table rulings, token surfaces. | V2 CONVERT / LATER REVIEW. | Convert only if Route-era Beast/Dream/Reroll semantics are approved; otherwise mark unavailable in V2 balance pass. |
```

#### `Hidden Grotto` — line 45

```text
    43 | | Hidden Grotto pool | Pool is built from Pokemon index entries up to two Battle Tier steps above the natural gym tier; bans, encounter eligibility, low-tier NFE filtering, type filtering, and roll-group dedupe apply. | Pokemon build data, balance tiers, ban status, type list, UI pool counts. | V2 REMOVE / LATER REVIEW. | Route resident generation should not inherit this pool rule accidentally; decide separately whether any Grotto-style type choice survives as route discovery. |
    44 | | Hidden Grotto session state | `state.hiddenGrottoSessions` stores rolled types, rolled Pokemon, chosen type/Pokemon, target tier, cost, ledger id, roster id, status. | Save normalization, active session lookup, render flow, undo. | V2 REMOVE. | Existing saves keep this field for V1. V2 migration should either ignore it or archive legacy sessions read-only. |
    45 | | Hidden Grotto perks | `Grotto Regular` discounts Hidden Grotto; `Encounter Pro` grants a free Hidden Grotto encounter. | Perk definitions, perk displays, possible manual rulings. | V2 REMOVE / LATER REVIEW. | Flag for Perk balance review; do not auto-convert to Route perks without approved rules. |
    46 | | Encounter-related perks | `Beast In A Dream` applies Beast Ball or Dream Ball after an Encounter roll; the `Reroll` perk grants three free reroll-token uses per gym by text. | Perk definitions, manual/table rulings, token surfaces. | V2 CONVERT / LATER REVIEW. | Convert only if Route-era Beast/Dream/Reroll semantics are approved; otherwise mark unavailable in V2 balance pass. |
    47 | | Encounter token catalog | Encounter tokens include Reroll, Extra Encounter, Repel, Quick Ball, Dream Ball, Honey, Master Ball, Beast Ball. | Shop, Live Referee, token art, token matrix/handoff/coverage, controller routing. | V2 MIXED. | Audit each token contract against Route rules and regenerate token docs after V2 definitions change. |
```

#### `Encounter Wheel` — line 50

```text
    48 | | Reroll Token | V1 rerolls exact unresolved Encounter rolls, Encounter result sessions, and supported wheel results; consumes exact token unless free due to banned/owned-family result; records superseded revisions and causal undo. | Encounter overlay, random-result drawer, Live Referee selector, token-control effects, tests. | V2 CONVERT. | Reroll must become same-Route reroll against an exact unresolved Route result; define whether revealed/known residents constrain replacement. |
    49 | | Extra Encounter Token | V1 Action-only token targets one player and creates or extends an authoritative Encounter session by exactly one roll with stable grant identity. | `encounter-token-runtime.js`, immediate token use, notifications, browser/unit/sandbox tests. | V2 CONVERT. | Create or extend one Route encounter opportunity for a chosen player; preserve stable grant identity, exact target, persistence, undo, and duplicate prevention. |
    50 | | Repel | V1 contract says remove one Pokemon per 5 entries on an Encounter Wheel; currently guided/text-only rather than automatic gameplay mutation. | Token contract, matrix, handoff, guided Live Referee audit, potential wheel editing fields. | V2 CONVERT. | Implement Route Repel as suppress 5 Route residents of a chosen Battle Tier; define private/public visibility and exact resident identity. |
    51 | | Master Ball Token | V1 contract says choose your encounter before the wheel; currently guided/text-only. | Token contract, token shop/art/matrix, Live Referee guided result. | V2 CONVERT. | Let player select one Pokemon revealed to that player on the Route; define reveal eligibility, locking, and whether rivals can respond. |
    52 | | Honey | V1 End-of-Action verified flow copies one exact finalized Encounter result into a fresh nonrecursive acquisition-ready result without rerolling or copying ownership/transient history. | End-of-Action procedure, `resolveHoneyEncounterCopy`, result drawer, causal undo, tests/docs. | V2 CONVERT. | Decide whether Honey copies finalized Route encounters only; include route id, revealed/private metadata, and fresh acquisition identity. |
```

#### `Encounter Wheel` — line 58

```text
    56 | | Collector Wheel | Exact `Collector Wheel` implementation was not found. `Collector` exists as a Trainer Class wheel result only. | Trainer Class Wheel only. | V2 REMOVE / LATER REVIEW. | Confirm whether Collector Wheel lives outside this repo or in old save data. Do not create Route behavior from the class name alone. |
    57 | | Ranger Base Repel reward | Ranger Base milestone grants `Repel Token`. | Ranger Base reward definitions and inventory. | V2 CONVERT. | If Repel remains Route-era, update reward text and generated token docs; otherwise replace reward during V2 balance review. |
    58 | | Pokemon Center encounter wording | Architecture docs say Pokemon Center can cleanse/protect the Encounter Wheel; current UI mainly implements curse/restrict restoration and emergency immunity. | Docs and possible table expectations. | V2 REDESIGN / LATER REVIEW. | Clarify whether any Route protection/cleanse service exists; update docs when V2 rules are approved. |
    59 | | Bulletin Board quests | Quest bank references "Spin The Encounter Wheel Twice", "Catch A Pokemon From The Hidden Grotto", and "New Power: obtain a Pokemon this Gym". | Bulletin Board UI/session data and action completion. | V2 CONVERT / REMOVE. | Rewrite V2 quests around Route exploration and remove Hidden Grotto quest unless Grotto is deliberately preserved. |
    60 | | Import tooling | `scripts/import-pokeapi-hoenn-encounters.js` imports Hoenn encounter data and cross-checks against hard-coded wheels. | `npm run import:encounters:hoenn`, data generation, docs. | V2 CONVERT. | Replace or fork importer to build Route resident data and route reports rather than wheel buckets. |
```

#### `Encounter Wheel` — line 59

```text
    57 | | Ranger Base Repel reward | Ranger Base milestone grants `Repel Token`. | Ranger Base reward definitions and inventory. | V2 CONVERT. | If Repel remains Route-era, update reward text and generated token docs; otherwise replace reward during V2 balance review. |
    58 | | Pokemon Center encounter wording | Architecture docs say Pokemon Center can cleanse/protect the Encounter Wheel; current UI mainly implements curse/restrict restoration and emergency immunity. | Docs and possible table expectations. | V2 REDESIGN / LATER REVIEW. | Clarify whether any Route protection/cleanse service exists; update docs when V2 rules are approved. |
    59 | | Bulletin Board quests | Quest bank references "Spin The Encounter Wheel Twice", "Catch A Pokemon From The Hidden Grotto", and "New Power: obtain a Pokemon this Gym". | Bulletin Board UI/session data and action completion. | V2 CONVERT / REMOVE. | Rewrite V2 quests around Route exploration and remove Hidden Grotto quest unless Grotto is deliberately preserved. |
    60 | | Import tooling | `scripts/import-pokeapi-hoenn-encounters.js` imports Hoenn encounter data and cross-checks against hard-coded wheels. | `npm run import:encounters:hoenn`, data generation, docs. | V2 CONVERT. | Replace or fork importer to build Route resident data and route reports rather than wheel buckets. |
    61 | | Tests | Existing tests assert V1 action operation hooks, Extra Encounter runtime, token sandbox, token browser flows, Reroll/Honey lifecycle, and docs generated from token contracts. | CI/local validation, generated docs. | V2 CONVERT. | Add isolated V2 route tests before root promotion; keep V1 tests passing until retirement. |
```

#### `Hidden Grotto` — line 59

```text
    57 | | Ranger Base Repel reward | Ranger Base milestone grants `Repel Token`. | Ranger Base reward definitions and inventory. | V2 CONVERT. | If Repel remains Route-era, update reward text and generated token docs; otherwise replace reward during V2 balance review. |
    58 | | Pokemon Center encounter wording | Architecture docs say Pokemon Center can cleanse/protect the Encounter Wheel; current UI mainly implements curse/restrict restoration and emergency immunity. | Docs and possible table expectations. | V2 REDESIGN / LATER REVIEW. | Clarify whether any Route protection/cleanse service exists; update docs when V2 rules are approved. |
    59 | | Bulletin Board quests | Quest bank references "Spin The Encounter Wheel Twice", "Catch A Pokemon From The Hidden Grotto", and "New Power: obtain a Pokemon this Gym". | Bulletin Board UI/session data and action completion. | V2 CONVERT / REMOVE. | Rewrite V2 quests around Route exploration and remove Hidden Grotto quest unless Grotto is deliberately preserved. |
    60 | | Import tooling | `scripts/import-pokeapi-hoenn-encounters.js` imports Hoenn encounter data and cross-checks against hard-coded wheels. | `npm run import:encounters:hoenn`, data generation, docs. | V2 CONVERT. | Replace or fork importer to build Route resident data and route reports rather than wheel buckets. |
    61 | | Tests | Existing tests assert V1 action operation hooks, Extra Encounter runtime, token sandbox, token browser flows, Reroll/Honey lifecycle, and docs generated from token contracts. | CI/local validation, generated docs. | V2 CONVERT. | Add isolated V2 route tests before root promotion; keep V1 tests passing until retirement. |
```

#### `Hidden Grotto` — line 75

```text
    73 | 8. Convert or defer Honey, Quick Ball, Dream Ball, Beast Ball, and `Beast In A Dream` based on approved Route timing.
    74 | 9. Remove rods/Tackle Box and Fishing/Surf wheel toggles from V2; represent water or fishing concepts as Route residents/tags only if approved.
    75 | 10. Remove Hidden Grotto and Hidden Grotto perks from V2 unless a later balance review explicitly redesigns them.
    76 | 11. Replace Encounter Wheel and Hidden Grotto Bulletin Board quests with Route-era quests.
    77 | 12. Replace Hoenn wheel importer/cross-checks with Route resident import/generation tooling.
```

#### `Encounter Wheel` — line 76

```text
    74 | 9. Remove rods/Tackle Box and Fishing/Surf wheel toggles from V2; represent water or fishing concepts as Route residents/tags only if approved.
    75 | 10. Remove Hidden Grotto and Hidden Grotto perks from V2 unless a later balance review explicitly redesigns them.
    76 | 11. Replace Encounter Wheel and Hidden Grotto Bulletin Board quests with Route-era quests.
    77 | 12. Replace Hoenn wheel importer/cross-checks with Route resident import/generation tooling.
    78 | 13. Add isolated V2 tests for Route session creation, reveal privacy, reroll, extra encounter, repel suppression, master-ball selection, persistence, reload, and undo.
```

#### `Hidden Grotto` — line 76

```text
    74 | 9. Remove rods/Tackle Box and Fishing/Surf wheel toggles from V2; represent water or fishing concepts as Route residents/tags only if approved.
    75 | 10. Remove Hidden Grotto and Hidden Grotto perks from V2 unless a later balance review explicitly redesigns them.
    76 | 11. Replace Encounter Wheel and Hidden Grotto Bulletin Board quests with Route-era quests.
    77 | 12. Replace Hoenn wheel importer/cross-checks with Route resident import/generation tooling.
    78 | 13. Add isolated V2 tests for Route session creation, reveal privacy, reroll, extra encounter, repel suppression, master-ball selection, persistence, reload, and undo.
```

### Rules-review text only — versions — `versions/next-action-phase/README.md`

#### `Encounter Wheel` — line 26

```text
    24 | ## Active V2 Gameplay Target
    25 |
    26 | New gameplay development should now advance V2 exclusively. V1 remains playable and compatibility-oriented, but V1 models should not force V2 mechanics to reuse Encounter Wheel, Hidden Grotto, Fishing/Surf, rod, or Hyperspace structures. Shared infrastructure can still be reused where the rule is genuinely shared; version-specific mechanics should live at the V2 system boundary.
    27 |
    28 | The current Route Encounter slice has approved weighted generation rules in `ROUTE_ENCOUNTER_ENGINE.md`. Normal Route Actions grant exactly 1 Route encounter and can choose any Route from the beginning of the Series. Extra Encounter costs $2,500, is freely purchasable/storable, grants exactly 1 additional Route encounter, and cannot be used above current Gym/Route progression.
```

#### `Hidden Grotto` — line 26

```text
    24 | ## Active V2 Gameplay Target
    25 |
    26 | New gameplay development should now advance V2 exclusively. V1 remains playable and compatibility-oriented, but V1 models should not force V2 mechanics to reuse Encounter Wheel, Hidden Grotto, Fishing/Surf, rod, or Hyperspace structures. Shared infrastructure can still be reused where the rule is genuinely shared; version-specific mechanics should live at the V2 system boundary.
    27 |
    28 | The current Route Encounter slice has approved weighted generation rules in `ROUTE_ENCOUNTER_ENGINE.md`. Normal Route Actions grant exactly 1 Route encounter and can choose any Route from the beginning of the Series. Extra Encounter costs $2,500, is freely purchasable/storable, grants exactly 1 additional Route encounter, and cannot be used above current Gym/Route progression.
```

### Rules-review text only — versions — `versions/next-action-phase/ROUTE_ENCOUNTER_ENGINE.md`

#### `Encounter Wheel` — line 9

```text
     7 | ## Version Boundary
     8 |
     9 | The Route Encounter engine is native V2 gameplay. It must not be implemented by rewriting the V1 Encounter Wheel, Hidden Grotto, Fishing/Surf toggles, rod access, or Hyperspace sub-wheel. Those systems remain playable V1 compatibility code in the repository root until an explicit promotion pass replaces them for V2 games.
    10 |
    11 | New V2 gameplay work should live under `versions/next-action-phase/` until the rules, tests, migration behavior, and website integration path are reviewed. Shared systems can remain shared only when the actual mechanics remain common. Tokens are an example: the catalog and exact inventory infrastructure should not be duplicated wholesale, but Route-specific interactions such as same-Route reroll, route suppression, and Master Ball known-resident selection belong at the V2 Route boundary.
```

#### `Hidden Grotto` — line 9

```text
     7 | ## Version Boundary
     8 |
     9 | The Route Encounter engine is native V2 gameplay. It must not be implemented by rewriting the V1 Encounter Wheel, Hidden Grotto, Fishing/Surf toggles, rod access, or Hyperspace sub-wheel. Those systems remain playable V1 compatibility code in the repository root until an explicit promotion pass replaces them for V2 games.
    10 |
    11 | New V2 gameplay work should live under `versions/next-action-phase/` until the rules, tests, migration behavior, and website integration path are reviewed. Shared systems can remain shared only when the actual mechanics remain common. Tokens are an example: the catalog and exact inventory infrastructure should not be duplicated wholesale, but Route-specific interactions such as same-Route reroll, route suppression, and Master Ball known-resident selection belong at the V2 Route boundary.
```
