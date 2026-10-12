# Saga trainer-frame theme kit — integration proposal

**Status:** ready for Codex to integrate and visually review; no live gameplay files changed by this branch.

This branch introduces four transparent SVG frame motifs in `assets/trainer-frames/`, plus `ui/trainer-card-theme.css` and `ui/trainer-card-theme.mjs`. Use the existing full-width Lumiose page background and current preference storage. These are vector **interpretations** of the approved concept artwork, not pixel-for-pixel exported paints from the four-way comparison image. A complete local ZIP with the high-resolution art direction reference and a standalone demo is available in the ChatGPT conversation.

## Approved design

- **Water — Tidal Elegance**
- **Sun — Solar Dawn** (small lateral suns, not large side ornaments)
- **Moon — Celestial Moonlit**
- **Nature — Art Nouveau**

Keep four **frame styles** separate from the broader website **accent-color spread**. Where possible inherit current site variables for glass tint, text, and focus state.

## Player data layout — do not rearrange

| Position | Label |
|---|---|
| Upper left row 1 | **Balance** |
| Upper left row 2 | **Momentum** |
| Upper left row 3 | **Badges** |
| Upper right row 1 | **Series Record** |
| Upper right row 2 | **Overall Record** |
| Upper right row 3 | **Saga Points** |

All six stats must be **equal-weight, equally tall rows**. Keep player name centered over the portrait. Keep player title and active Trainer Class around the portrait rather than hiding them or removing them.

## Lower band

- **Perks (~38% width)**: 6 *small* hover/focus/clickable icons; rarity always 1 Crystal / 2 Gold / 3 Silver. They need **not** be giant or boxed as two rows.
- **Ongoing effects (~62% width)**: dynamic compact icons, hover or focus to read buff/nerf descriptions, no giant empty panel.
- Do not show extra large, opaque internal blocks. Lower band should be almost as translucent as upper stat area.

## Integration boundaries

1. **Do not replace the existing player state / save system.** `ui/trainer-card-theme.mjs` is a DOM example; read existing code and transplant just the markup/style ideas.
2. Preserve existing preference structure. Add theme choices in Menu → Preferences; do not create parallel localStorage.
3. Keep official region background behavior: full image width at natural aspect ratio, fade at natural image bottom.
4. SVGs must remain image-only overlays and cannot contain labels, sample statistics, placeholder portraits, or perk icons. Actual data must live in DOM.
5. Keep the overlay compact/high on the page. Desktop view should favor scenery; mobile reflows gracefully and can simplify heavy ornamentation.
6. **Public sheets must respect the current public/private view projection**. Do not leak owner-only resources/effects.
7. Check that six stats do not overlap the central avatar with both short and long trainer names.
8. Include keyboard focus and accessible names for effect/perk interactions, verify save/reload and all 4 modes.

## Suggested Codex task

Integrate the four new transparent frame assets and CSS into the current Trainer Card while preserving its existing data sources and saved settings. Use the declared 3-left / portrait / 3-right stat order and compact 38/62 perk/effect band. Do not modify roster functionality. Compare the result visually against the approved reference image attached in conversation; adjust ornament scale if necessary before calling it finished.

## Validation

Standalone SVG assets are valid XML and transparent by design. JS syntax for the local implementation was checked. **No production browser or end-to-end game test has been run for this branch.** Codex should test in the real app before merging.
