> **Authority: MIGRATION PLAN**
> This document planned the rulebook migration. It is not the rulebook and does not create gameplay rules.

# Rulebook Source Of Truth Plan

This plan describes how Rival Saga should move from scattered architecture notes and code-inferred behavior to a real rulebook that future Codex prompts can treat as authoritative.

This document does not change gameplay.

## Goal

Create a rulebook layer that clearly separates:

- real game rules,
- current implementation behavior,
- planned architecture,
- temporary alpha/manual handling,
- unresolved designer rulings.

Future Codex prompts should be able to say:

```text
Use RULEBOOK.md as source of truth. Do not infer rules from code if the rulebook disagrees.
```

## Source Priority

Recommended future priority order:

1. `RULEBOOK.md` and linked rulebook modules.
2. Steven's explicit latest instruction in the current task.
3. Architecture docs, only when the rulebook is silent.
4. Current code behavior, only to understand implementation state.
5. Prior conversation memory, only as weak context and never as a rule override.

## Proposed File Set

### RULEBOOK.md

Purpose: canonical entry point.

Should contain:

- source-of-truth statement,
- glossary,
- current game structure summary,
- canonical phase order,
- links to each rule module,
- list of unresolved rulings.

Should not contain:

- implementation details,
- CSS/UI instructions,
- temporary code caveats except a short "implementation status" link.

### TIMING_AND_PHASES.md

Purpose: define the official game timeline.

Should contain:

- Series definition,
- Gym definition,
- Gym begin/end points,
- Pre-Gym Resolution,
- Action Phase,
- Team Lock / Battle Prep,
- Battle Phase,
- End Phase,
- Shop or between-gym step,
- delayed effect checks,
- phase advancement requirements.

First rulings needed:

- Is Shop Phase a real phase?
- Is End Phase separate from Shop Phase?
- What must be cleared before Action Phase begins?

### PROMPT_AND_RESPONSE_RULES.md

Purpose: define how pending events, response windows, prompt chains, passes, and finalization work.

Should contain:

- root prompts,
- response prompts,
- responder eligibility,
- No Response/pass rules,
- transaction timing,
- finalization behavior,
- cancel/undo rules,
- stack-style resolution decision.

First rulings needed:

- Do all eligible players answer every prompt?
- Are some effects target-only?
- Does Finalize Event close the whole window or only the current prompt?

### EFFECT_RESOLUTION.md

Purpose: define common effect metadata and resolution behavior.

Should contain:

- timingCategory,
- sourceType,
- targetType,
- targetScope,
- resolutionMode,
- consumptionMode,
- exceptionFlags,
- automatic vs manual requirements,
- undo requirements before automation.

First rulings needed:

- Which resolution modes are allowed for alpha?
- What proof/undo coverage is required before an effect can be Automatic?

### TARGETING_RULES.md

Purpose: prevent species/instance/player/resource confusion.

Should contain:

- target type definitions,
- target scope definitions,
- species-wide vs owned-copy examples,
- selector requirements,
- token-by-token target decisions.

First rulings needed:

- Move Deleter target scope.
- Which effects target species/name-wide Pokemon.
- Which effects target one owned roster Pokemon.

### TOKEN_RULES.md

Purpose: canonical token timing and effect catalog.

Should contain:

- Control tokens,
- Protection tokens,
- Encounter tokens,
- Curse tokens,
- Field/weird tokens,
- per-token target metadata,
- per-token consumption mode,
- per-token response legality,
- per-token automation status.

First rulings needed:

- Which tokens can be responded to?
- Which tokens ignore protection?
- Which tokens consume on use vs resolve vs success?
- Which token effects should be automated first?

### TRANSACTION_RULES.md

Purpose: define deals/trades/payment timing.

Should contain:

- when deals are allowed,
- what deals can include,
- automatic money movement,
- audit-only resources,
- transaction-then-use timing,
- rewind restrictions,
- difference between deals and built-in payment-negation effects.

First rulings needed:

- Which payments are built-in negations?
- Can promises ever affect legal timing before fulfilled?

### TRAINER_CLASS_RULES.md

Purpose: canonical class ability rules.

Should contain:

- passive abilities,
- activations,
- response windows,
- Pre-Gym hooks,
- payment-negation hooks,
- per-gym/per-series limits,
- manual/automatic status.

First rulings needed:

- Professor No Release Fallback exact timing/order.
- Which other classes create delayed effects.

### PERK_RULES.md

Purpose: canonical perk rules.

Should contain:

- passive vs activated perks,
- trigger windows,
- response legality,
- target metadata,
- automation/manual status,
- one-time or recurring limits.

First rulings needed:

- Which perks should appear in Live Referee.
- Which perks can create pending events.

### LIVE_REFEREE_RULES.md

Purpose: define the Live Referee as the gameplay screen for live play, not as a prompt panel or database form.

Should contain:

- Play screen rules,
- Situation + Choices structure,
- screen/submenu transition rules,
- main gameplay screen responsibilities,
- effect drawer responsibilities,
- what a Choice is,
- what is not allowed in Play view,
- what belongs in Details,
- what belongs in Advanced Controls,
- testing/demo behavior,
- player context rules,
- host override rules.

Play view should not show:

- a separate instruction/prompt line,
- explanations of what each button does,
- internal metadata,
- stacked forms,
- vertical scrolling as the normal flow solution.

First rulings needed:

- Should Live Referee always be visible?
- Should it replace notifications or coordinate with them?
- What are the core Play screens?
- What Situation text belongs on each screen?
- What Choices appear on each screen?
- What should never appear in Play view?
- Which current inline forms should become separate submenus first?

### IMPLEMENTATION_NOTES.md

Purpose: describe current code status without making code the rulebook.

Should contain:

- current implemented behavior,
- known manual cleanup,
- migration notes,
- known risks,
- file ownership map,
- testing guidance.

Should not contain:

- new rules,
- unresolved rulings presented as facts.

## Migration Process

### Step 1: Answer Top Questions

Use `CODEX_RULES_UNDERSTANDING_AUDIT.md` as the question source. Start with:

1. Gym begin/end.
2. Phase order.
3. Responder eligibility.
4. Finalization semantics.
5. Target scopes.
6. Token consumption/refund.
7. First automatic effects.
8. Trainer class delayed effects.
9. Built-in payment negation.
10. Live Referee Situation + Choices screen boundaries.

### Step 2: Draft Minimal Rulebook v1

Create only the most necessary source docs first:

- `RULEBOOK.md`
- `TIMING_AND_PHASES.md`
- `PROMPT_AND_RESPONSE_RULES.md`
- `TARGETING_RULES.md`
- `TOKEN_RULES.md`
- `TRANSACTION_RULES.md`

Keep class/perk docs as stubs until those rules are stable.

### Step 3: Mark Implementation Status

For every rule section, mark one of:

- Implemented.
- Partially Implemented.
- Manual Required.
- Planned.
- Needs Ruling.

This keeps Codex from assuming a documented future rule already works in the app.

### Step 4: Add Token Metadata Table

Build a token-by-token table with:

- token id/name,
- timingCategory,
- sourceType,
- targetType,
- targetScope,
- resolutionMode,
- consumptionMode,
- createsPendingEvent,
- requiresPendingEvent,
- opensResponseWindow,
- transactionsAllowed,
- exceptionFlags,
- manualInstructions,
- implementation status.

Do this before adding more automatic token behavior.

### Step 5: Align Code To Rulebook Gradually

Once a rule is authoritative:

1. Update metadata.
2. Update UI copy if needed.
3. Add validation only for settled rules.
4. Add automation only for safe effects.
5. Preserve manual repair paths.

## What Codex Should Not Do

- Do not infer new rules from old code when the rulebook exists.
- Do not silently convert architecture notes into implemented rules.
- Do not automate effects whose target/consumption/resolution is still Needs Ruling.
- Do not remove Advanced Controls while Manual Required effects exist.
- Do not treat Live Referee as a prompt panel.
- Do not solve Play screens with stacked forms or vertical scrolling.
- Do not explain button behavior in Play view.
- Do not treat non-money transactions as automatic transfers until rules and inventory flows exist.
- Do not implement Batch Mode until Steven explicitly chooses it.

## Recommended Next Documentation Step

Start with `TIMING_AND_PHASES.md`, `PROMPT_AND_RESPONSE_RULES.md`, and `LIVE_REFEREE_RULES.md`. The first two decide the table's chronology; `LIVE_REFEREE_RULES.md` prevents future UI work from drifting back into prompt-panel, stacked-form, or scroll-heavy play.
