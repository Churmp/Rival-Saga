# Repository Guidelines

## Project Structure & Module Organization

Rival Saga is a single-page web app with a lightweight local Node backend.

- `index.html` defines the app shell and static markup.
- `app.js` contains most client-side gameplay, UI rendering, state migration, and backend sync logic.
- `server.js` serves the site, stores local game data, and exposes `/api` routes.
- `styles.css` contains global theme and component styling.
- `shop-data.js`, `pokemon-balance-tiers.js`, and `silph-data.js` are data modules loaded by the browser.
- `assets/` stores static images and UI assets.
- `data/` stores local backend saves such as `data/games/`; treat these as local runtime data, not source fixtures.
- `RULEBOOK.md` is the canonical gameplay-rules entry point; follow its source-priority order.
- `IMPLEMENTATION_STATUS.md` records verified behavior and known gaps without creating rules.
- `ARCHITECTURE.md` documents implementation direction and should be updated when systems change meaningfully.

## Build, Test, and Development Commands

Use Node 18+.

```powershell
npm.cmd run dev
```

Starts the local backend at `http://127.0.0.1:4173`.

```powershell
& 'C:\Program Files\nodejs\node.exe' --check app.js
& 'C:\Program Files\nodejs\node.exe' --check server.js
```

Runs JavaScript syntax checks. Use these before finishing changes that touch JS.

```powershell
npm.cmd run audit:docs
npm.cmd run audit:token-contract
npm.cmd run test:token-sandbox
```

The documentation audit checks local links and required authority banners. The Token contract audit checks catalog parity, declaration consistency, and generated-matrix freshness. The sandbox suite covers isolated scenario commit/discard infrastructure. These are focused automated checks, not proof of complete gameplay correctness. There is no build step.

## Coding Style & Naming Conventions

Use plain JavaScript, HTML, and CSS. Follow existing patterns before adding new abstractions.

- Use two-space indentation in JS object/HTML/CSS blocks where practical.
- Prefer descriptive helper names such as `renderSiteShell`, `normalizeState`, and `createCleanInitialState`.
- Keep UI state local where possible; shared gameplay state belongs in `state` and backend game snapshots.
- Do not hardcode theme colors in components; prefer existing CSS variables.
- When editing files manually, use small targeted patches.

## Visual Design Rules

Rival Saga should feel like a polished competitive Pokemon league control center, not a default admin dashboard.

- Favor layered, premium game-dashboard composition: depth, gradients, glow, iconography, texture, and occasional asymmetry.
- Give every major section clear hierarchy: title, key value, secondary info, and action.
- Vary emphasis: mix compact cards, wide panels, featured elements, and composed empty space.
- Use rounded corners, shadows, hover states, and theme-safe design tokens for spacing, radius, color, type, and elevation.
- Avoid flat gray rectangles, uniform card grids, border-only separation, large dead areas, and Bootstrap/SaaS-looking layouts.
- Before coding UI, briefly describe the intended visual composition.
- After coding UI, review against the avoid list and revise if it still feels blocky or generic.

## Testing Guidelines

No formal test framework is configured. Validate changes by:

- running `node --check` on changed JS files,
- running the relevant focused audits and Node test scripts,
- starting the backend with `npm.cmd run dev`,
- testing in the browser at `http://127.0.0.1:4173`,
- checking the browser console for errors.

For gameplay changes, verify undo, logging, ledger/state persistence, and backend reload behavior when relevant.

Contract declarations, resolver names, and passing infrastructure tests are not enough to label an effect complete. Record runtime truth in `IMPLEMENTATION_STATUS.md` and require an effect-specific end-to-end test before using `verifiedComplete`.

## Commit & Pull Request Guidelines

No project-specific commit convention is documented. Use concise imperative commit messages, for example:

- `Fix lobby game card pagination`
- `Add site admin lobby delete action`

Pull requests should include a short summary, changed systems, validation performed, screenshots for UI changes, and any known data migration or backend restart notes.

## Agent-Specific Instructions

Do not overwrite user/runtime data in `data/` unless the task explicitly involves backend save cleanup. Keep scope tight: avoid unrelated rewrites of Battle Phase, Shop, themes, or game rules while fixing focused bugs.
