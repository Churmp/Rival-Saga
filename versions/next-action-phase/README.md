# Next Action Phase Version

Version ID: `action-phase-v2-real-series`

This folder tracks the V2 Action Phase design, contracts, and isolated helper/runtime slices.

V2 is now the current/default ruleset for newly created Rival Saga games and lobbies. The mounted website path lives in the repository root; this folder remains useful for focused V2 contracts, fixtures, audits, and isolated engine tests.

## Goals

- Advance the current V2 Action Phase before implementing more token/class/perk effects against the archived V1 model.
- Define stable lifecycle contracts that future systems can target.
- Build or adjust isolated modules and fixtures here before wiring reviewed behavior into the live app.

## Suggested Folder Use

- `ACTION_PHASE_V2_PLAN.md`: draft rules and implementation contract.
- `ROUTE_ENCOUNTER_ENGINE.md`: V2 Route encounter state contract and isolated engine notes.
- `contracts/`: lifecycle contracts, type-shaped examples, and compatibility notes.
- `fixtures/`: small save-state examples for migration and behavior tests.
- `implementation/`: isolated helpers or prototypes for the V2 model.
- `tests/`: Node tests for the isolated V2 model.

## Active V2 Gameplay Target

New gameplay development should now advance V2 exclusively. V1 remains playable and compatibility-oriented, but V1 models should not force V2 mechanics to reuse Encounter Wheel, Hidden Grotto, Fishing/Surf, rod, or Hyperspace structures. Shared infrastructure can still be reused where the rule is genuinely shared; version-specific mechanics should live at the V2 system boundary.

The current Route Encounter slice has approved weighted generation rules in `ROUTE_ENCOUNTER_ENGINE.md`. Normal Route Actions grant exactly 1 Route encounter and can choose any Route from the beginning of the Series. Extra Encounter costs $2,500, is freely purchasable/storable, grants exactly 1 additional Route encounter, and cannot be used above current Gym/Route progression.

The Route slice now has a real-data adapter, Series initialization helper, JSON-safe reload normalizer, and developer audit command:

```powershell
npm.cmd run audit:v2-routes
```

Route state is stored under `state.v2.routeEncounterBySeriesId[seriesId]` by the isolated lifecycle helper and is preserved on repeated initialization.

Route Exploration is implemented as a V2 Action type in `implementation/route-action-resolver.js` and mounted in the live Route Action Phase workspace. It spends exactly 1 V2 Action, creates exactly 1 Route encounter opportunity, can resolve/finalize/settle through pure state helpers, and creates normal owned Pokemon records through the Route acquisition adapter.

## Integration Rule

New V2 behavior should still be deliberate:

1. Update and approve the rule draft.
2. Add isolated tests for the new action lifecycle.
3. Define compatibility behavior for existing saves.
4. Wire reviewed behavior into the live app.
5. Update `ARCHITECTURE.md` and `IMPLEMENTATION_STATUS.md` with verified runtime truth.
