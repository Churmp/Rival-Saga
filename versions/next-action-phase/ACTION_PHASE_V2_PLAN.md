# Action Phase V2 Plan

Status: Draft sandbox. Not mounted in the website.

Version ID: `action-phase-v2-real-series`

## Problem

The current Action Phase uses individual turn order with three actions per player and location-based confirmed visits. A large redesign is planned, and token/class/perk implementation should not continue to encode assumptions that may be replaced.

## Design Questions

- Is Action Phase still turn-based, or does it become batch/queued/simultaneous?
- Does every player still receive the same number of actions?
- Can a player commit multiple actions before resolution?
- What can interrupt, modify, refund, cancel, or redirect an action?
- What is public immediately, and what can remain hidden until resolution?
- Which windows are open for proactive Control effects, reactions, classes, and perks?
- What happens when a player times out, passes, or cannot take a legal action?

## Lifecycle Contract Draft

The future implementation should separate action intent, commitment, resolution, and cleanup.

```text
draftAction -> validateAction -> commitAction -> openResponseWindow -> resolveAction -> settleAction
```

Recommended state concepts:

- `actionPhase.version`: identifies current Action Phase rules.
- `actionPhase.mode`: current model, such as `individualTurnOrder` or `batchOrder`.
- `actionPhase.round`: current action round or batch number.
- `actionPhase.actorIds`: players currently allowed or required to act.
- `actionPhase.pendingActions`: committed but unresolved action intents.
- `actionPhase.operation`: the currently resolving location/action operation.
- `actionPhase.spends`: authoritative spend/refund records.
- `actionPhase.history`: compact action lifecycle history for reload, undo, and audit.

## Token/Class/Perk Hook Points

Future effects should avoid depending on UI button handlers directly. Prefer explicit hook points:

- `canDraftAction`
- `onActionDrafted`
- `canCommitAction`
- `onActionCommitted`
- `canRespondToAction`
- `onActionResponseWindowOpened`
- `beforeActionResolution`
- `afterActionResolution`
- `onActionSettled`
- `onActionRefunded`
- `onActionCancelled`

## Current Compatibility Constraints

Until promotion, the live app continues to enforce the current model:

- three actions per player,
- individual turn order,
- confirmed location visits,
- active-player guard,
- resolving-operation guard,
- End-of-Action procedure before Team Building.

## First Implementation Slice

Build an isolated resolver in this folder before touching `app.js`:

1. Create a normalized Action Phase V2 state shape.
2. Add pure helpers for validation, commitment, spending, refund, and settlement.
3. Add fixtures for a simple action, blocked action, refunded action, and multi-player contested/batch action.
4. Add Node tests for the pure helpers.
5. Compare the V2 lifecycle against current token/class/perk timing requirements.

## Route Encounter Slice

V2 Encounter development starts with the native Route engine in `ROUTE_ENCOUNTER_ENGINE.md` and `implementation/route-encounter-engine.js`.

The Route engine owns Series-start Route generation, approved weighted resident distributions, hidden Route Quality for Routes 3-9, hidden resident populations, public discoveries, per-player private reveals, Route encounter opportunities, same-Route reroll revision history, personal duplicate checks, Repel-style Battle Tier suppression, temporary Primary-Type injection, Extra Encounter progression restriction, Master Ball known-resident eligibility, and finalized acquisition handoff records.

Route action rule: 1 Action = 1 Route encounter. All Routes 1-9 are open to normal Route Actions from the beginning of the Series.

Extra Encounter rule: costs $2,500, is freely purchasable immediately, can be stored for later, grants 1 additional Route encounter, lets the player choose the Route when used, and cannot target a Route above the player's current Gym/Route progression. The isolated engine stores source/token identity hooks but does not create a separate V2 Token inventory.

Real data and persistence slice: `implementation/route-pokemon-catalog.js` adapts authoritative Battle Tier rows from `pokemon-balance-tiers.js` and type/species metadata from `pokemon-build-data.js`. `implementation/route-series-lifecycle.js` initializes `state.v2.routeEncounterBySeriesId[seriesId]` once per Series and normalizes JSON-safe reload state without rerolling populations. `npm.cmd run audit:v2-routes` runs the developer generation report against the real catalog.

Route Action integration slice: `implementation/route-action-resolver.js` implements `route-exploration` as the first isolated V2 Action type. It validates player/Series/Route/action availability, records one reversible Action spend, creates one Route encounter opportunity, resolves one Route result, finalizes one canonical owned Pokemon through `implementation/route-pokemon-acquisition.js`, and settles only after acquisition. The persisted causal chain is Action ID -> Spend ID -> Opportunity ID -> Result ID -> Acquisition ID -> Pokemon record ID.

This slice intentionally does not mount Route encounters into the live website yet. V1 Encounter Wheel, Hidden Grotto, Fishing/Surf, rods, and Hyperspace stay in the root app for V1 compatibility until an explicit promotion pass.

## Promotion Checklist

- Rule draft approved.
- Isolated tests pass.
- Save migration is documented.
- Backend persistence behavior is specified.
- Undo/logging behavior is specified.
- Browser integration plan is reviewed.
- `ARCHITECTURE.md`, `TIMING_AND_PHASES.md`, and `IMPLEMENTATION_STATUS.md` are updated during promotion.
