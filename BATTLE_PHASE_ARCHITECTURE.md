> **Authority: IMPLEMENTATION ARCHITECTURE**
> This document records Battle Phase implementation structure. It does not create gameplay rules.

# Battle Phase Architecture

## Authority Inventory

The Teambuilder is the only team editor. Its draft owns exact roster-instance selection, forms, Badge Points, Item, Ability, moves, Tera Type, nature, EVs, IVs, forced members, legality, and revision work.

`state.battleTeams[gymId][playerId]` is the canonical submitted-team record. A lock stores:

- `gymId` and `playerId`
- `revisionNumber` and `lockedAt`
- ordered `lockedSlots`
- exact `pokemonRecordId`
- assigned Badge Points and effective tier cap
- selected Battle Species and pending evolution data
- a frozen set snapshot

The Battle Phase page consumes this snapshot. It does not expose independent team, form, or Badge editors. Its Teambuilder actions only navigate to the authoritative editor.

Existing Battle Phase ownership remains unchanged for the generated schedule, battle reports, KO/fainted reporting, records, standings preview, payouts, revision windows, and logs.

## Viewer Knowledge

`getBattleTeamView` is the presentation boundary. It converts a locked snapshot into sanitized slot data for one viewer. Reveal levels are `HIDDEN`, `SPECIES`, `PUBLIC_SUMMARY`, and `FULL_SET`.

Durable grants live in `state.battleRevealGrants`. Grants identify the Gym, owner, exact roster instance, viewer scope, reveal level, source, phase, and expiration boundary. Supported scopes are one player, selected players, all opponents, public, and host.

Team Preview creates public `PUBLIC_SUMMARY` grants. Owners and authorized host views receive `FULL_SET`. Hidden slots return only position and reveal level; species, sprite, set, and exact roster identity are omitted from rendered slot data.

Replacing a hidden slot does not erase grants for other exact instances. A replacement receives visibility according to current grants and phase policy, so stale sprites cannot survive an exact-instance change.

## Presentation

The page contains:

1. A six-step Battle Phase rail.
2. Read-only trainer summaries and sanitized horizontal team strips.
3. The existing Sabotage/Team Preview revision surface.
4. The matchup recording stage with viewer-safe team strips.
5. Existing schedule, results, records, payout, and history surfaces.

Mystery slots contain no species-shaped silhouette. Revealed slots reuse the shared sprite and type components. Clicking a revealed slot opens a read-only inspector restricted to the same evaluated reveal level.

## Security Boundary

The renderer no longer places hidden slot details in Battle Phase markup. Full transport-level secrecy still requires a future player-scoped backend payload/API boundary because the legacy single-page client currently loads the broader authoritative game snapshot for other systems. Effects that reveal private full sets must remain blocked until that server authorization boundary exists.

## Regression Coverage

`npm.cmd run test:battle-phase` checks editor ownership, exact snapshots, fail-closed hidden projections, durable Team Preview grants, retained Battle Phase features, and responsive presentation wiring.

## Blocking Revision Operations

Sabotage set changes use `battlePhase.revisionOperations` as a parent procedure and retain `revisionWindows` as exact child tasks. A parent remains `WAITING_FOR_REVISIONS` while any child is pending. Each child carries its source effect, affected roster-instance IDs, required changes, allowed scope, and baseline snapshot revision.

The affected player opens Teambuilder directly on the required Pokemon. Full-team legality is checked at reconfirmation, while scope validation prevents unrelated membership, Badge, or set edits. Confirmation refreshes the authoritative locked slot and increments the team revision. Team Preview, proactive Sabotage effects, and phase advancement stay blocked until the parent resolves.

`npm.cmd run test:sabotage-flow` checks the contract permission boundary, canonical availability helper, resolved-Curse hook, parent/child blocking, scope validation, full-team reconfirmation, and cleanup reconciliation wiring.
