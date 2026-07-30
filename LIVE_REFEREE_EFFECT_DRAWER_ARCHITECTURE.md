> **Authority: HISTORICAL / SUPERSEDED**
> Do not use this file to infer current gameplay rules. It is preserved as superseded UI architecture.

# Rival Saga Live Referee Effect Drawer Architecture

> Controller boundary: `LIVE_REFEREE_GAMEPLAY_CONTROLLER.md` is the canonical Live Referee gameplay and timing model. The effect drawer described here is a Situation + Choices submenu used to answer "What can I do now?" It is not an always-open panel and does not control response priority or resolution.

This document plans the future Live Referee effect drawer. It is architecture only: no behavior is implemented here, no rules are changed, and no effect is automatically wired by this document.

The Live Referee should eventually answer two live-table questions:

1. What is happening right now?
2. What can this player use right now?

The existing Player Hub, player sheets, inventory views, class sheets, rosters, and management tabs should remain the full review and prep surfaces. The Live Referee effect drawer is only the quick activation layer for live play.

## Design Goal

Live Referee should become both:

- Table caller: shows what happened, who is waiting, what prompt is current, and what the host should resolve.
- Effect drawer: shows the selected player the most relevant effects they can use in the current timing window.

The effect drawer should not replace player sheets. It should reduce live-table digging during response windows, encounter windows, and phase-specific effect moments.

The main Live Referee prompt should stay clean. The effect drawer should be secondary and collapsible, not a wall of every possible effect.

## Visual Composition

The future drawer should feel like a compact command tray inside the Live Referee:

- A small `Available Effects` header near the response buttons.
- Source groups as compact bands or tabs: Tokens, Class, Perks, Items, Pokemon, Manual.
- Most relevant effects shown first.
- Unavailable effects hidden by default.
- A small `Show unavailable` toggle for debugging or host review.
- Search/filter only after the effect list becomes large enough to need it.

Normal expanded Live Referee priority should remain:

1. What happened.
2. Waiting on.
3. Player Acting Now.
4. Response buttons.
5. Available Effects.
6. Finalize / Advanced Controls.

At small overlay sizes, Available Effects should collapse before the core prompt and response buttons.

## Available Effects Panel

Future panel title:

```text
Available Effects
```

Grouped by source:

- Tokens
- Class
- Perks
- Items
- Pokemon
- Manual

Each effect card/button should show:

- Name
- Source
- Timing type
- Short effect summary
- Whether it creates a pending event or responds to the current prompt
- Resolution mode: Automatic, Manual Required, Audit Only, or Hybrid
- Quantity or remaining uses if resource-based

Recommended compact card shape:

```text
Immunity
Token - Response - Qty 2
Responds to current prompt. Manual Required.
```

Recommended card fields:

```js
{
  id: "immunity",
  name: "Immunity",
  sourceType: "token",
  timingCategory: "response",
  summary: "Protects against a pending effect if legal.",
  promptBehavior: "respondsToCurrentPrompt",
  resolutionMode: "manualRequired",
  quantity: 2,
  enabled: true,
  disabledReason: ""
}
```

This should reuse the effect metadata model from `EFFECT_RESOLUTION_ARCHITECTURE.md`.

## Source Groups

### Tokens

Tokens should be the first implementation target because they already drive most Live Referee timing work.

Token groups should use timing buckets:

- Control
- Protection
- Encounter
- Curse

Token cards should show quantity and whether they create a pending event or answer the current prompt.

### Class

Class effects should appear only when the selected player's trainer class has a relevant live effect.

Class cards may need:

- once per gym counters,
- once per series counters,
- passive trigger status,
- target requirements,
- manual instructions.

Class effects should come after token drawer behavior is stable.

### Perks

Perks may be passive, triggered, or one-time effects. The drawer should show only perks relevant to the current prompt/phase unless `Show unavailable` is active.

Perk effects often need Manual Required or Hybrid resolution until their exact resolver is known.

### Items

Items should not flood the drawer. Show only live-usable items for the current phase/window.

Examples:

- battle-phase usable item,
- action-phase location item,
- response item if rules allow it,
- manual item activation.

### Pokemon

Pokemon effects are likely complex because they may come from moves, abilities, brought team status, roster state, or special development outcomes.

Pokemon effects should be added late, after tokens, perks, and class effects are stable.

### Manual

Manual should contain host-only or repair-style shortcuts:

- Manual response.
- Manual pending event.
- Manual note/ruling.
- Open Advanced Controls.

Manual should not be presented as a normal player power unless the host is in a testing/repair context.

## Timing Filters

The drawer should derive available effects from the current Live Referee prompt, phase, pending event type, selected player, and effect metadata.

### If No Pending Event Exists

Show:

- proactive activations,
- action/phase-legal effects,
- class/perk/location effects available now,
- manual host event shortcut if host/testing controls are available.

Hide:

- response-only protection effects,
- encounter-result modifiers unless an encounter result is pending,
- team-lock-only effects outside Team Lock,
- battle-only effects outside Battle Phase.

Example:

```text
Restrict - Token - Creates pending event
Move Deleter - Token - Creates pending event
Class Effect - Manual Required
```

### If Pre-Gym Resolution Is Active

Show:

- queued start-of-gym effects for the current Gym,
- class/perk/location effects that must resolve before Action Phase,
- target/negation choices required by those queued effects,
- manual host cleanup shortcuts when an effect is Hybrid or Manual Required.

Hide:

- ordinary Action Phase location actions,
- proactive Action Phase effects that should wait until Pre-Gym resolution is complete,
- unrelated battle-only or encounter-only effects.

Example:

```text
Professor - No Release Fallback
Choose one owned Pokemon in a player's party.
Target may pay Professor $2,000 to negate.
```

Pre-Gym effects may create Live Referee pending events. The Live Referee should keep the normal prompt flow: what happened, who can respond or pay, what happens if the prompt is finalized, and whether final application is Automatic, Hybrid, or Manual Required.

### If A Pending Control Or Curse Event Exists

Show:

- protection/response effects,
- redirect/cleanse/prevent/negate effects if legal,
- deals,
- manual response,
- Advanced Controls shortcut.

Hide:

- proactive activations unless the rules explicitly allow responding with them,
- unrelated encounter modifiers,
- battle-only effects.

Example:

```text
Immunity - Token - Responds to current prompt
Protection - Token - Responds to current prompt
Cleanse Tag - Token - Responds to current prompt
Manual Response - Manual
```

### If A Pending Encounter Result Exists

Show:

- Reroll,
- Repel,
- encounter replacement/upgrade tokens,
- encounter-related class/perk effects,
- deals,
- manual response or manual result note.

Hide:

- generic control tokens that do not affect encounter results,
- battle-only effects,
- team-lock-only curses.

Encounter modifiers must not be usable after the encounter result is finalized unless a rule explicitly allows it.

### If Team Lock Is Active

Show:

- team-lock effects,
- curses legal during Team Lock,
- team submission/reveal effects,
- protection responses when a curse or team-lock prompt is pending,
- manual host ruling if needed.

Hide:

- ordinary Action Phase proactive effects unless still legal,
- encounter-only effects,
- post-battle reward effects.

Team Lock is where exception flags such as `teamLockOnly`, `hiddenUntilReveal`, and `appliesOnlyIfTargetBrought` become important.

### If Battle Phase Is Active

Show only battle-phase legal effects.

Examples may include:

- battle submission effects,
- battle result modifiers,
- brought-team dependent effects,
- battle-only class/perk effects,
- manual battle ruling.

Battle Phase effects should be conservative until the Battle Phase resolver understands team submissions, brought Pokemon, battle results, deaths, KOs, and reward consequences.

## Player Context

The drawer must be based on the acting/controlled player, not a noisy player selector inside Live Referee.

### Normal Mode

Effects shown should belong to the current logged-in or selected trainer profile.

The Live Referee should display:

```text
Player Acting Now: Gold
```

Then the drawer shows Gold's effects.

If profile controls are enforced and the current profile does not control that player, the drawer should show a small locked state rather than a player dropdown.

### Free Testing Mode

In Free Testing Mode, effects shown should belong to the controlled player chosen in League Manager / Testing Setup.

Do not add ugly player dropdowns to Live Referee.

The test flow should be:

1. Pick controlled trainer in the normal trainer/profile switcher or League Manager testing setup.
2. Live Referee updates `Player Acting Now`.
3. Available Effects updates to that player's effects.

This matches the current testing direction: whoever profile/trainer is selected is who should be responding.

## Effect Click Behavior

Clicking an available effect should route to one of a few standard behaviors.

### 1. Create Pending Event

Used for:

- Control Token,
- Curse,
- proactive class effect,
- proactive perk effect,
- manual host event.

Expected flow:

1. Click effect.
2. If needed, choose target/note.
3. Create pending event.
4. Live Referee shows the new prompt.
5. Eligible players may respond or make deals.

Example:

```text
Steevee used Restrict on Abra.
```

### 2. Record Response To Current Prompt

Used for:

- Immunity,
- Protection,
- Cleanse-style effects,
- redirect/prevent/negate effects,
- manual response.

Expected flow:

1. Click effect during an open pending prompt.
2. Record response against the current prompt id.
3. Response becomes the new current prompt if it creates a prompt step.
4. Waiting/pass state resets for that response prompt.

Example:

```text
Gold used Immunity in response to Restrict.
```

### 3. Modify Current Encounter Result

Used for:

- Reroll Token,
- Repel,
- encounter replacement,
- encounter upgrade,
- encounter duplication or selection effects.

Expected flow:

1. Click effect during an encounter-result pending window.
2. Open a short confirmation or form if needed.
3. Apply only if the encounter resolver safely supports it.
4. Otherwise record as Manual Required.

Encounter effects are a natural early target after protection/control tokens because the pending-result window already exists.

### 4. Open Short Form

Used when the effect needs a target, note, amount, or host choice.

Short forms should stay inside Live Referee when possible:

- target player,
- target Pokemon/resource,
- short note,
- protection type,
- deal amount/status,
- optional manual instruction.

The form should be specific to the effect. Avoid dumping Advanced Controls into the normal flow.

### 5. Open Advanced Controls

Used for:

- complex/manual-only effects,
- repair flows,
- unsupported effects,
- host-only rulings,
- effects with missing metadata.

Advanced Controls remain the escape hatch. The normal drawer should not become the giant timing drawer.

## Unavailable Effects

Unavailable effects should be hidden by default.

If `Show unavailable` is enabled, unavailable cards should show a short reason:

- Not legal during this phase.
- Requires a pending event.
- Requires an encounter result.
- Requires Team Lock.
- No quantity remaining.
- Target required.
- Manual only.
- Already used this gym.
- Current player does not control this effect.

The drawer should not become a full legality engine at first. Early reasons can be broad and metadata-driven.

## Sorting And Relevance

Recommended sort order:

1. Effects that can be used right now.
2. Effects that respond to the current prompt.
3. Effects that modify the current pending result.
4. Effects that create a pending event.
5. Manual shortcuts.
6. Unavailable effects, only if toggled on.

Within each group:

- source group order: Tokens, Class, Perks, Items, Pokemon, Manual,
- higher relevance first,
- quantity-owned before zero quantity,
- shorter/manual-required effects before complex advanced-only effects.

## Existing Tabs Stay Useful

Player Hub and sheets remain the full management surface for:

- inventory review,
- Pokemon roster management,
- shop/cart,
- class/perk review,
- detailed Pokemon state,
- battle prep,
- long-form repairs.

Live Referee only needs quick activation access while the table is actively resolving prompts.

The drawer should deep-link to Player Hub or Advanced Controls when deeper context is needed rather than duplicating every sheet.

## Implementation Order

Recommended staged implementation:

1. Tokens only.
2. Protection, Encounter, Control, and Curse token buttons.
3. Then perks.
4. Then class effects.
5. Then items and Pokemon effects.
6. Then richer legality filters.

### First Implementation Slice

The safest first code pass should be:

1. Build an effect availability reader for the selected/controlled player.
2. Use token metadata only.
3. Render an `Available Effects` section in Live Referee behind a compact toggle.
4. Show only currently relevant token effects.
5. Route buttons to existing behavior:
   - Protection token -> existing Live Referee protection response form/recording.
   - Encounter token -> existing encounter/manual token flow if safe, otherwise Manual Required.
   - Control/Curse token -> create pending event using existing token timing scaffolding.
   - Unsupported token -> open Advanced Controls.
6. Keep effect application Manual Required unless it is already safely automatic.

This first slice should improve table speed without pretending that full legality and automatic resolution are complete.

## Data Dependencies

The drawer should eventually read from:

- effect metadata from `EFFECT_RESOLUTION_ARCHITECTURE.md`,
- token timing metadata,
- player inventory,
- trainer class abilities,
- perk list,
- item/TM ownership,
- Pokemon roster state,
- current phase,
- queued Pre-Gym effects,
- current pending event,
- current prompt step,
- selected/controlled player,
- testing/free-mode state.

It should not invent separate effect ownership state. The drawer is a read and activation layer over existing systems.

## Do Not Do Yet

- Do not wire all effects.
- Do not auto-apply every token.
- Do not add full legality validation.
- Do not remove Player Hub, inventory, class sheets, Pokemon sheets, or existing tabs.
- Do not add player dropdown clutter inside Live Referee.
- Do not make unavailable effects visible by default.
- Do not turn Advanced Controls into the normal player flow.

## Open Questions

- Should proactive effects be visible during a pending response window if the rules allow nested prompts, or should they stay hidden until a specific exception says so?
- Which encounter tokens are safe to automate first?
- Should class/perk passive triggers appear as suggestions, automatic prompts, or host-confirmed prompts?
- Should unavailable reasons be purely metadata-driven at first, or should they read resource counts and per-gym usage immediately?
- Should the drawer show effect history such as "used this gym" on the card, or only in Details?

These questions should be answered one implementation slice at a time.
