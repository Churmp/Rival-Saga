# V2 Route Encounter Engine

Status: isolated V2 implementation slice with mounted browser runtime coverage.

Version ID: `action-phase-v2-real-series`

## Version Boundary

The Route Encounter engine is native V2 gameplay. It must not be implemented by rewriting the V1 Encounter Wheel, Hidden Grotto, Fishing/Surf toggles, rod access, or Hyperspace sub-wheel. Those systems remain playable V1 compatibility code in the repository root until an explicit promotion pass replaces them for V2 games.

New V2 gameplay work should live under `versions/next-action-phase/` until the rules, tests, migration behavior, and website integration path are reviewed. Shared systems can remain shared only when the actual mechanics remain common. Tokens are an example: the catalog and exact inventory infrastructure should not be duplicated wholesale, but Route-specific interactions such as same-Route reroll, route suppression, and Master Ball known-resident selection belong at the V2 Route boundary.

## State Contract

The engine persists one authoritative Route state per Series:

```js
{
  schemaVersion: 1,
  actionPhaseVersion: "action-phase-v2-real-series",
  seriesId,
  seed,
  revision,
  counters,
  duplicatePreferencesByPlayerId: {
    playerId: {
      "route-6": {
        residentId: {
          playerId,
          routeId: "route-6",
          residentId,
          speciesId,
          enabled: false,
          updatedAt
        }
      }
    }
  },
  routes: [
    {
      routeId: "route-6",
      routeNumber: 6,
      routeQuality: {
        id: "strong",
        label: "Strong",
        shift: 1,
        baseCurveRoute: 6,
        appliedCurveRoute: 7
      },
      generation: {
        source: "approved-v2-route-distribution",
        populationSize: 27,
        distributionRoute: 7,
        tierDistribution: [{ tierId, weight }]
      },
      residents: [
        {
          residentId,
          routeId,
          permanent: true,
          speciesId,
          displayName,
          battleTier: { id, label, order },
          primaryType,
          types,
          source: { kind, sourceId }
        }
      ],
      publicDiscoveryResidentIds: [],
      privateKnowledgeByPlayerId: {
        playerId: [residentId]
      },
      suppressions: [],
      pendingEncounterOpportunities: [],
      encounterResults: [],
      finalizedAcquisitions: []
    }
  ]
}
```

Routes 1-9 are generated once from a Pokemon catalog at Series start. Each fresh generated Route independently rolls and persists 20 through 30 ordinary permanent residents, plus 2 Premium Residents. Existing persisted Route populations, including older 24-resident Routes, remain authoritative and are not regenerated merely because the default generation rule changed. Residents carry stable resident identity, stable species identity, Battle Tier, Primary Type, full type list, slot kind, encounter weight, and source metadata so later sources such as Legacy can be introduced without replacing the engine.

Route populations are hidden by default. Public discoveries and private player knowledge are separate persisted sets and can be changed by explicit reveal primitives.

Routes 1 and 2 do not receive Route Quality. Routes 3-9 persist hidden `routeQuality` and `generation` metadata so the generated resident population can be audited later without revealing quality to players by default.

Player-specific duplicate preferences live outside the permanent Route population. Missing preference records mean Duplicate ON. Only explicit Duplicate OFF records are persisted, keyed by `playerId -> routeId -> residentId` with the resident's `speciesId` retained for audit/debugging. Creating an OFF record requires that exact player to know the permanent resident through public discovery or private knowledge and to currently own that species in Active/current or Legacy inventory. Re-enabling Duplicate deletes the sparse OFF record.

## Approved Generation Rules

Generation rolls one Battle Tier per ordinary resident from the approved weighted distribution, filters out species already resident on that Route, then runs the route species selector for that tier until the Route's generated ordinary population size is filled. The selector applies Regional Variance weight first and cross-Route repeat suppression second. The route then appends 2 Premium Residents from Ultra Elite, Master, and Master Elite into reserved permanent slots with reduced random encounter weight. Premium Resident selection does not apply Regional Variance. The route persists the resulting residents permanently for the Series. This does not force every individual Route to exactly match the percentage table; it preserves the intended probability curve across generated Series.

The real-data adapter lives at `implementation/route-pokemon-catalog.js`. It uses `pokemon-balance-tiers.js` as the authoritative Battle Tier source (`RIVAL_SAGA_BALANCE_TIERS` and `RIVAL_SAGA_BALANCE_TIER_ROWS`) and `pokemon-build-data.js` as the authoritative type/species metadata source (`rivalSagaBuildData.pokemon` and `rivalSagaBuildData.species`). The adapter keeps data normalization separate from V2 Route eligibility:

- normalization resolves stable species identity, display name, Battle Tier, Battle Tier order, Primary Type, full types, regional identity metadata, and source metadata;
- eligibility includes Battle Tiers used by the approved V2 Route curves plus Premium Resident tiers: LC, LC Elite, Safari, Poke, Great, Ultra, Ultra Elite, Master, and Master Elite;
- valid Elite rows outside ordinary or Premium Resident generation, such as Safari Elite, remain excluded rather than silently mixed into another tier.

Regional Variance implementation:

- supported Series regions are Kanto, Johto, Hoenn, Sinnoh, Unova, Kalos, Alola, Galar, and Paldea;
- ordinary residents carry `regionalIdentity` derived from PokeAPI species generation metadata, with Alola/Galar/Paldea regional-form keys mapped to their form region;
- Hisui-form identity is reported as unresolved because Hisui is not one of the approved Series regions in the current rules handoff;
- `implementation/route-regional-variance.js` owns the recovered active weighting config and helper API;
- the weighting model is a two-pool blend for each legal Battle Tier pool after same-Route duplicates are removed: every candidate receives universal-pool weight `0.5`; each featured/current-generation candidate also receives featured-pool bonus `0.5 * (legalCandidateCount / featuredCandidateCount)`;
- this makes the dedicated featured pool equal to approximately 50% of fresh available selection weight while preserving featured-generation Pokemon inside the universal legal pool;
- cross-Route repeat suppression multiplies any previously placed species by `0.25 ** priorPlacementCount`, so one prior placement is x0.25, two prior placements are x0.0625, and there is no hard cross-Route repeat cap;
- generated route `generation` metadata records the Series region, Regional Variance rules id/status, and that Premium Residents are not governed by the modifier;
- the audit simulates each supported Series region and reports featured-region composition, same-tier unbiased baseline, elevation over baseline, by-region composition, unresolved identity records, tier counts, duplicate checks, and structural failures.

Current real-data compatibility:

| Battle Tier | Eligible Entries |
| --- | ---: |
| LC | 339 |
| LC Elite | 135 |
| Safari | 159 |
| Poke | 85 |
| Great | 70 |
| Ultra | 69 |
| Ultra Elite | 51 |
| Master | 32 |
| Master Elite | 12 |

Total eligible entries: 952.

Existing repository aliases resolve `Basculegion-Blue` to `basculegion-female` and `Basculegion-Red` to `basculegion-male`. The adapter reuses those aliases and reports them in alias-resolution output. Current real-data audit reports zero malformed source rows; valid Elite rows outside ordinary or Premium Resident generation remain excluded.

Premium Resident draft implementation:

- each Route has 2 Premium Residents;
- Premium Residents are permanent generated residents with fixed resident IDs and `slotKind: "premium"`;
- eligible Premium tiers are Ultra Elite, Master, and Master Elite;
- later Routes use a draft weighted table with more Master and Master Elite representation;
- Premium Residents currently use a `0.15` encounter-weight multiplier relative to ordinary residents;
- exact Premium tier distributions and encounter-weight multiplier remain balancing inputs, not locked final rules.

Route 1:

| Battle Tier | Weight |
| --- | ---: |
| LC | 75% |
| LC Elite | 20% |
| Safari | 5% |

Route 2:

| Battle Tier | Weight |
| --- | ---: |
| LC | 25% |
| LC Elite | 60% |
| Safari | 15% |

Routes 3-9 use these base curves:

| Curve Route | Safari | Poke | Great | Ultra | Master |
| --- | ---: | ---: | ---: | ---: | ---: |
| Route 3 | 75% | 23% | 2% | 0% | 0% |
| Route 4 | 63% | 29% | 7% | 1% | 0% |
| Route 5 | 42% | 34% | 20% | 3.5% | 0.5% |
| Route 6 | 28% | 34% | 28% | 9% | 1% |
| Route 7 | 16% | 28% | 38% | 15% | 3% |
| Route 8 | 9% | 21% | 39% | 27% | 4% |
| Route 9 | 5% | 15% | 42% | 32% | 6% |

Routes 3-9 also roll hidden Route Quality:

| Quality | Weight | Shift |
| --- | ---: | ---: |
| Poor | 5% | -2 |
| Weak | 20% | -1 |
| Normal | 50% | 0 |
| Strong | 20% | +1 |
| Loaded | 5% | +2 |

Quality shifts along the approved Route 3-9 base curves and clamps at the ends. For example, Route 6 with Weak quality uses the Route 5 curve, and Route 8 with Loaded quality uses the Route 9 curve.

Exact duplicate species are not allowed inside one Route. Species may repeat across different Routes, but repeated species are downweighted during later Route generation by `0.25 ** priorPlacementCount` rather than globally banned.

## Functional Loop

The isolated engine supports this route loop:

1. Generate Routes 1-9 once for a Series.
2. Create exactly one pending Route encounter opportunity for a player and chosen Route.
3. Draw from that Route's eligible resident population.
4. Publicly discover a permanent resident when naturally drawn.
5. Store one unresolved result with stable `resultId` and revision history.
6. Reroll the same result on the same Route by adding a new revision.
7. Finalize the current revision into an acquisition record that preserves route, resident, species, and Battle Tier identity.

1 Action equals 1 Route encounter. Ordinary Route opportunities can target any Route from the beginning of the Series, including future Routes.

Extra Encounter costs $2,500, is freely purchasable immediately, can be stored for later, and grants 1 additional Route encounter when used. `grantExtraEncounterOpportunity` uses the same one-opportunity shape, preserves token/source identity fields for later shared Token integration, and rejects Routes above current Gym/Route progression. The mounted runtime preflights the same player-scoped random encounter pool used by the eventual draw before consuming the exact stored Token, so Duplicate OFF or Repel exhaustion cannot eat inventory without producing a result.

Duplicate OFF filtering applies only to the acting player's standard random Route encounter pool and random reroll pool. It removes the exact permanent resident slot for that player while leaving the Route resident, public discovery record, Premium slot metadata, encounter weights, and every other player's pools unchanged. Premium Residents can be toggled once known and owned; their own weight is not modified, but their relative random odds naturally rise when other eligible residents are filtered out. Temporary injected residents are not permanent Route residents and do not use persistent duplicate preferences.

Explicit known-resident mechanics do not consult Duplicate OFF. Master Ball selection, reveal effects, Repel suppression, and other targeted resident effects continue to use their own capability checks. Master Ball can select an OFF resident only if that resident is public or privately known to the acting player and the pending opportunity belongs to that player.

## Series Initialization And Persistence

The isolated lifecycle helper lives at `implementation/route-series-lifecycle.js`.

`initializeV2Series(gameState, options)`:

1. builds the real V2 Route Pokemon catalog;
2. validates every eligible entry before generation;
3. generates Route state once from the Series seed;
4. stores it at `state.v2.routeEncounterBySeriesId[seriesId]`;
5. returns the existing normalized Route state on later calls for the same Series instead of regenerating.

The persisted Route state is JSON-safe. `normalizeV2RouteEncounterState` preserves existing generated populations, Route Quality, generation metadata, discoveries, private knowledge, duplicate preferences, suppressions, opportunities, result revisions, finalized acquisitions, and counters. Missing counters can be derived upward from stable IDs, so future operations continue safely after reload. Older saves without `duplicatePreferencesByPlayerId` normalize to an empty object, which is equivalent to every discovered owned resident remaining Duplicate ON.

## Route Action Integration

The isolated Route Action resolver lives at `implementation/route-action-resolver.js`. It implements the first V2 Action type, `route-exploration`, against the lifecycle shape:

```text
draftAction -> validateAction -> commitAction -> resolveAction -> settleAction
```

Current implemented state-level flow:

1. `commitRouteAction` validates player, Series Route state, chosen Route, available V2 Action budget, and idempotent `actionId`.
2. It records exactly one reversible Action spend in `state.v2.actionPhaseBySeriesId[seriesId].spends`.
3. It creates exactly one normal Route encounter opportunity through the Route engine.
4. `drawRouteActionEncounter` resolves the opportunity into one Route result while preserving public discovery and result revision behavior.
5. `finalizeRouteActionAcquisition` finalizes the Route result and creates one normal owned Pokemon record in `state.pokemonRecords`.
6. `settleRouteAction` marks the Action settled only after acquisition exists.

The V2 Action state is stored at:

```js
state.v2.actionPhaseBySeriesId[seriesId] = {
  schemaVersion: 1,
  actionPhaseVersion: "action-phase-v2-real-series",
  seriesId,
  counters: { action, spend },
  playerActionLedger: {
    playerId: { available, spentActionIds }
  },
  actions: [
    {
      actionId,
      type: "route-exploration",
      status,
      settlementStatus,
      playerId,
      seriesId,
      routeId,
      routeNumber,
      spendId,
      opportunityId,
      resultId,
      acquisitionId,
      pokemonRecordId,
      causalChain: { actionId, spendId, opportunityId, resultId, acquisitionId, pokemonRecordId }
    }
  ],
  spends: [
    {
      spendId,
      actionId,
      playerId,
      seriesId,
      amount: 1,
      resource: "action",
      status: "spent",
      reversible: true
    }
  ]
}
```

The canonical Pokemon acquisition adapter lives at `implementation/route-pokemon-acquisition.js`. It writes normal owned Pokemon records to `state.pokemonRecords`, links the record into the existing player's `pokemonIds`, and stores Route metadata on the Pokemon record: source `Route Encounter`, Series, Route ID/number, opportunity ID, result ID, resident ID, species ID, acquisition Battle Tier, final result revision, acquisition ID, and owner.

Settlement and acquisition are idempotent. Replaying the same committed Action ID does not create a second spend or opportunity. Replaying acquisition for the same Route result returns the existing Pokemon record by stable acquisition identity rather than creating another Pokemon. JSON-safe reload normalization preserves committed Actions, opportunities, unresolved results, reroll revisions, acquired-but-unsettled Actions, settled Actions, spends, Pokemon records, and causal IDs.

Undo is not implemented yet, but Route Action records are Undo-ready: the Action stores the exact spend, opportunity, result, finalized acquisition, and Pokemon record IDs needed for a later causal reversal.

Extra Encounter remains separate from Action spending. Extra Encounter may create the same core Route opportunity shape, but its opportunity source is `extra-encounter-token` and it does not add a V2 Action spend record.

Developer audit command:

```powershell
npm.cmd run audit:v2-routes
```

Useful options:

```powershell
npm.cmd run audit:v2-routes -- --series=100 --seed=my-audit-seed
```

The audit reports Route Quality, effective curves, resident counts, tier counts, same-Route duplicate species, cross-Route species repeats, malformed/excluded catalog rows, alias resolutions, Regional Variance realized native percentages, unbiased same-tier baselines, and structural generation failures across deterministic seeded Series.

## Native Route Primitives

The engine exposes primitives for:

- `revealResidentToPlayer`: private knowledge for one player.
- `revealResidentToTable`: public table discovery.
- `applyRouteRepel`: suppress exactly 5 unsuppressed permanent residents of one Battle Tier from a Route.
- `selectTemporaryInjectionResidents` and `addTemporaryResidentsToOpportunity`: add 4 temporary Primary-Type options to the current opportunity without making them permanent residents.
- `getMasterBallEligibleResidents` and `createMasterBallRouteResult`: select only residents already public or privately revealed to the acting player.
- `isPersonalDuplicateEncounterResult`: check duplicate protection against only the acting player's collection.
- `routeDuplicatePreference`, `setRouteDuplicatePreference`, and `getRouteDuplicatePreferenceControls`: expose player-scoped Duplicate ON/OFF controls without leaking hidden residents or mutating Route populations.

Suppression is represented as exact resident IDs rather than wheel-entry edits. Temporary injections are encounter options, not Route residents, and do not create public Route discovery records when drawn.

Mounted Repel capabilities derive their tier list from actual permanent Route residents rather than a hard-coded base-tier list. Each tier capability reports tier ID/label, current resident count, unsuppressed eligible count, legality, and blocking reason. Elite tiers such as LC Elite, Ultra Elite, Master, and Master Elite are available when the Route has at least 5 unsuppressed permanent residents in that exact tier; otherwise they remain visible to the capability layer as unavailable rather than changing the rule to "up to 5."

## Deferred Decisions

The engine does not implement the full Class system, Legacy budget, Honey/Quick Ball/Dream Ball/Beast Ball redesign, Route UI, backend save migration, or V1-to-V2 promotion. Those should build on this state contract instead of importing V1 wheel semantics.
