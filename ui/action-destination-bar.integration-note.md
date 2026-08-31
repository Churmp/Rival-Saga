# V2 Action Phase Presentation Integration Contract

This is a presentation integration only. Do not redesign the approved Action Phase UI and do not alter gameplay behavior.

## Canonical sources
- `ui/action-destination-bar-prototype.html` — visual reference for the navigator.
- `ui/action-destination-bar.css` — locked slim 10-column pyramid geometry.
- `ui/action-phase-shell.css` — locked page composition, viewport-filling destination stage, and art treatment.

If these files are not present in the local working tree, DO NOT ignore this contract. Run `git fetch origin` and read them directly with `git show origin/main:<path>` (for example `git show origin/main:ui/action-phase-shell.css`). Do not reset or overwrite unrelated local work just to read the files.

## Non-negotiable preservation rule
The destination art that already exists in the live V2 landing screens must survive this integration unchanged. Do not replace it with the old generic Action Phase background, decorative stripes, gradients, or CSS-drawn scenery. Do not remove the current image assignment while replacing DOM wrappers.

Before editing the live renderer, locate the exact existing per-destination art wiring in the current working tree / pre-task HEAD. Use `git diff`, `git show HEAD:app.js`, and the current CSS/asset references to identify how Routes, Battle Frontier, Department Store, Game Corner, Graveyard, Ranger Base, Pokemon Center, and Bulletin Board currently receive their approved environmental plates. Preserve those exact image paths and focal-position behavior.

If the shell uses `--v2-action-destination-art`, explicitly populate that variable from the SAME existing destination-art source. If the live renderer already has a dedicated full-bleed art element/background, it is acceptable to keep that implementation and apply the shell brightness/position treatment to that exact layer instead. The important requirement is that the approved image remains visible and fills the stage.

## Required live structure
1. The actual Action Phase page root must receive `.v2-action-phase-screen` (or the canonical rules must be ported exactly to the actual root selector).
2. The approved navigator and the actual destination stage must be the two primary visual regions beneath the global game header.
3. The actual destination workspace/art container must receive `.v2-action-destination-stage` (or exact equivalent rules), not a detached wrapper that does not control the visible landing.
4. Navigator and stage use the same `min(97vw, 1880px)` outer width.
5. The stage consumes all remaining viewport height. No fixed short hero, large dead band below it, or inner stage scrollbar.
6. There should be only the small 12px shell breathing room below the global header and about 8px between navigator and stage.
7. Preserve the approved 34px destination slots and exact 10-column pyramid placement. Slot 9 remains geometrically reserved while hidden.

## Art treatment
- Preserve the existing approved art assets and current per-destination focal positions.
- Full-stage art uses `cover`.
- Apply presentation-side `brightness(1.08) saturate(1.04)`; do not modify source PNGs.
- Use the left-only readability gradient from `ui/action-phase-shell.css` so the scenery remains bright on center/right.
- Do not globally dim the entire plate.
- Do not bake UI text into the image.

## CSS ordering
The canonical UI CSS must load AFTER the legacy/global `styles.css` so the approved shell owns the final presentation. If an existing legacy selector still wins through higher specificity or `!important`, add a narrowly scoped override under `.v2-action-phase-screen`; do not change the approved geometry to accommodate stale CSS.

## Behavior preservation
- Preserve selected destination state.
- Preserve hover-to-preview and mouseleave restore behavior.
- Preserve click-to-lock behavior.
- Preserve the existing destination workspace renderer and all gameplay/action commit logic.
- No new gameplay state.
- Do not touch Route encounter logic.
- Do not rewrite server/gameplay code for a visual fix unless a static-file path genuinely requires it.

## Acceptance criteria before declaring success
At the normal desktop review resolution, the screenshot must visibly prove ALL of the following:
- A generated environmental destination image is visible, not the old generic Action Phase stripes/background.
- The image fills nearly the entire remaining screen beneath the navigator.
- The navigator and hero share the same wide outer alignment.
- The art is slightly brighter than before.
- Left-side title/copy remains readable while center/right scenery is not heavily darkened.
- No large unused band exists beneath the hero.
- Hovering destinations swaps the full landing without geometry jitter.
- Existing gameplay controls still work.

If any approved destination image disappears, the integration is failed even if tests pass. Restore the image wiring before continuing.
