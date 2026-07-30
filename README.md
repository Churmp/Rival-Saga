# Rival Saga

Rival Saga is a local-first multiplayer league controller for running a competitive Pokemon tabletop campaign. The single-page client covers player sheets, rosters, shopping, encounters, Teambuilder legality, phase progression, Live Referee response windows, trades, and host testing tools. A lightweight Node server persists game snapshots and broadcasts shared-state revisions to connected clients.

## Run Locally

Use Node 18 or newer.

```powershell
npm.cmd run dev
```

Open `http://127.0.0.1:4173`. Runtime saves live under `data/games/` and should not be treated as source fixtures.

## Source Of Truth

- [Rulebook](RULEBOOK.md) is the entry point for canonical gameplay rules and source priority.
- [Timing and Phases](TIMING_AND_PHASES.md) defines approved phase names and broad timing boundaries.
- [Saga Token Rules](SAGA_TOKEN_RULES.md) governs Token timing and interaction semantics.
- [Live Referee Gameplay Controller](LIVE_REFEREE_GAMEPLAY_CONTROLLER.md) governs controller navigation, response priority, and prompt-chain behavior.
- [Implementation Status](IMPLEMENTATION_STATUS.md) reports verified behavior, gaps, and deferred work.
- [Architecture](ARCHITECTURE.md) records implementation structure; it does not create gameplay rules.

Historical audits and superseded architecture files remain in the repository for context. Their authority banners identify them as history rather than current rules.

## Validation

```powershell
& 'C:\Program Files\nodejs\node.exe' --check app.js
& 'C:\Program Files\nodejs\node.exe' --check server.js
npm.cmd run audit:docs
npm.cmd run audit:token-contract
npm.cmd run test:token-sandbox
```

`audit:token-contract` checks declaration parity and generated-matrix freshness. `test:token-sandbox` covers the isolated Token Scenario commit/discard infrastructure. These checks do not prove that every Token or gameplay rule is fully automated.

## Backend Model

The backend serves the app, stores one JSON snapshot per game, exposes `/api` routes, and broadcasts revisions through Server-Sent Events. Most gameplay still uses whole-state synchronization. Token Scenario Sandbox commit adds optimistic revision checks and idempotent session recovery, but it is not a general transactional gameplay API.
