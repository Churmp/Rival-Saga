Integration target: port the approved V2 Action Phase presentation exactly; do not redesign it.

Canonical UI sources:
- `ui/action-destination-bar-prototype.html` — visual reference for the navigator.
- `ui/action-destination-bar.css` — locked slim 10-column pyramid geometry.
- `ui/action-phase-shell.css` — locked page composition, viewport-filling destination stage, and art treatment.

Live integration requirements:
1. Preserve existing hovered/selected destination state and the existing destination workspace renderer. No new gameplay state.
2. Put the navigator and destination workspace inside the Action Phase screen composition from `action-phase-shell.css` so they are the only two primary regions beneath the global game header.
3. Keep the navigator at the top with only the small 12px shell breathing room; do not recreate a large empty band above it.
4. Align navigator and destination stage to the same `min(97vw, 1880px)` outer width.
5. The destination stage flexes to consume the remaining viewport height. Do not reintroduce a fixed short hero, a large dead area beneath it, or an inner scrollbar.
6. Keep the approved 34px destination slots and exact 10-column pyramid placement. Slot 9 remains geometrically reserved while hidden.
7. Every destination landing supplies its art through `--v2-action-destination-art` and its own focal position through `--v2-action-destination-art-position` when needed.
8. Brighten all destination art presentation-side with `brightness(1.08) saturate(1.04)`. Do not alter the source PNGs.
9. Use the left-only readability gradient from `action-phase-shell.css`; do not darken the entire art plate with a global opaque overlay.
10. Do not enlarge or otherwise redesign hero typography in this pass. Typography consistency is a separate future pass.

If the current live DOM uses different class names, adapt those hooks to this component contract. Do not change the approved geometry to fit the old presentation.
