# Current Action Phase Version

Version ID: `action-phase-v1-current-series`

This folder tracks the archived V1 Action Phase model without forking the app source. It is maintenance-only and remains supported for explicitly persisted legacy saves.

## Source

The live implementation stays in the repository root:

- `app.js`
- `server.js`
- `index.html`
- `styles.css`
- `action-phase-balance.js`
- `scripts/test-action-phase-balance.js`
- `scripts/test-action-operation-contract.js`
- `RULEBOOK.md`
- `TIMING_AND_PHASES.md`
- `ARCHITECTURE.md`
- `IMPLEMENTATION_STATUS.md`

## Compatibility Promise

This version remains playable for compatibility. Existing V1 saves must keep loading as V1 and must not be converted to V2 merely by loading.

Maintenance assumptions to preserve for V1 compatibility:

- Individual turn order is enforced.
- Each player has three Action Phase actions.
- Location visits are confirmed events.
- Out-of-turn location confirmation is blocked unless Demo Mode or an explicit controlled context allows it.
- Action/location operations close ordinary Control timing while they are resolving.
- End-of-Action procedure runs after Action Phase operations finish and before Team Building begins.

## Maintenance Boundary

New feature development targets `action-phase-v2-real-series` exclusively. V1 work should stay limited to compatibility, save loading, and narrowly requested fixes.
