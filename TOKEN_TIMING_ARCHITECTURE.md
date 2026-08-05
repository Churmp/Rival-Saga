> **Authority: HISTORICAL / SUPERSEDED**
> Do not use this file to infer current gameplay rules. Current Token rules are in `SAGA_TOKEN_RULES.md`.

# Rival Saga Token Timing Architecture

> Canonical timing correction: `LIVE_REFEREE_GAMEPLAY_CONTROLLER.md` now governs ordered response priority, declaration-time Token consumption, per-prompt resolution, and parent pause/resume. This document remains the Token metadata/category plan where it does not conflict with that controller model.

This document defines how Rival Saga tokens should relate to timing windows, pending events, responses, transactions, and the Live Referee. It is an architecture target, not a full behavior implementation.

## Goals

- Group tokens by timing behavior instead of only shop flavor.
- Give Live Referee enough future structure to explain what is pending, who caused it, who may respond, and what can happen before resolution.
- Preserve chronology: a token or transaction cannot rewind a resolved event unless a rule specifically allows it.
- Keep response legality incremental. Do not create a full spell-speed or counter-trap system yet.

## Current Timing Model

`state.interactionEvents` is the current root pending-event store. Chronology still chooses the oldest open root event first, but the player-facing current situation is the top unresolved prompt within that root. Each prompt owns an ordered priority cycle. Responses create child prompts; resolving a child resumes or cancels its paused parent.

Transactions may happen inside a pending window, but transactions do not count as responses. A player may receive a token through a transaction and use it immediately only if that token is legal in the current timing window.

Normal Tokens are consumed once when declaration is confirmed. Negation or cancellation does not normally refund that declaration cost. Effect state mutation remains a separate resolution step.

## Timing Categories

Rival Saga tokens should use these major timing categories:

| Category | Role | Typical Use |
| --- | --- | --- |
| `control` | Proactive threat or disruption | Creates a pending event, opens responses, resolves when finalized |
| `protection` | Response token | Requires a pending event, records a response, protects/negates/redirects/prevents if legal |
| `encounter` | Encounter modifier | Used before an encounter result is finalized |
| `curse` | Lingering battle condition | Creates a pending event, often strongest during Team Lock |

Existing shop categories may continue to exist for display and pricing. Timing category is a rules/timing field.

The current code scaffolds these names in `app.js` as `TOKEN_TIMING_CATEGORIES`, `TOKEN_USE_TYPES`, `TOKEN_PENDING_EVENT_TYPES`, and `TOKEN_TIMING_DEFAULTS`. `TOKEN_TIMING_LEGACY_OVERRIDES` records known compatibility mismatches such as `move-deleter-curse` mapping to Control timing.

## Control Tokens

Control Tokens are proactive activations. They usually are not used "in response" to another event. A player declares the token, the token creates a pending event, and other eligible players may respond before it resolves.

Control Tokens should generally:

- Be activations.
- Create a pending event.
- Open a response window.
- Allow transactions before resolution.
- Allow Protection Tokens or other legal protection effects to respond.
- Resolve only when the host finalizes the pending event.

Examples include Arena Trap, Restrict, Clear Smog, Extra Ban, Imprison, Haze, and Move Deleter when those effects are being used as direct disruption.

### Move Deleter Category Change

Move Deleter should be treated as a Control Token, not a Curse.

Reason: Move Deleter directly disrupts a Pokemon's moveset. It does not behave like a lingering battle curse such as Flame Orb Curse or Silencing Curse.

Current implementation note: the app still stores Move Deleter in `statusTokenDefinitions` as `move-deleter-curse` so existing teambuilder/status behavior keeps working. A later implementation pass should migrate its timing metadata and player-facing naming without breaking existing saves.

## Protection Tokens

Protection Tokens are response tokens. They answer a pending threatening event.

Protection Tokens should generally:

- Require a pending event.
- Be used during a response window.
- Not create a broad new timing window unless a specific rule says they do.
- Protect, negate, cleanse, redirect, or prevent the pending event.
- Be logged as responses.
- Mark the responding player as Responded.

Examples include Immunity, Protection, Cleanse Tag, Substitute, and future effects that block, cleanse, prevent, redirect, or negate.

No general counter-speed system should exist yet. Exceptions should live in token text:

- "This effect cannot be responded to."
- "Protection effects cannot be used in response to this."
- "This ignores protection."

## Encounter Tokens

Encounter Tokens modify encounter rolls or results. They are generally used during Action Phase or during a pending encounter result window.

Encounter Tokens should generally:

- Be legal before an encounter result is finalized.
- Modify, reroll, replace, upgrade, duplicate, or otherwise affect encounter results.
- Use a pending event type like `encounterResult`.
- Allow transactions before the result is finalized.
- Not be usable after the encounter result fully resolves unless a token explicitly allows it.

Examples include Reroll Token, Extra Encounter, Repel, Quick Ball, Dream Ball, Beast Ball, Safari Zone/Game Corner encounter tokens when timing fits, and other encounter wheel/result modifiers.

Classic timing example:

1. A player rolls a bad encounter.
2. The encounter result becomes pending.
3. Players may transact.
4. The player buys a Reroll Token.
5. The player uses Reroll Token during the encounter window.
6. The new result appears.
7. The host finalizes the encounter.

## Curse Tokens

Curses are activations that apply dangerous battle restrictions or lingering battle conditions.

Curses should generally:

- Be activations.
- Create a pending event.
- Open a response window.
- Allow transactions before resolution.
- Allow Protection, Cleanse, or Immunity responses if legal.
- Apply if the curse resolves and the target is valid.
- Carry through Battle Phase according to duration/effect text.

Curses differ from Control Tokens. Control Tokens usually manipulate game state now. Curses usually apply a lingering battle condition if the target is brought or valid.

Examples include Flame Orb Curse, Toxic Curse, Iron Ball Curse, Silencing Curse, Knock Off Curse, Devolve, Purge, and Foresight.

Haze and Imprison need final rules review. If they are immediate disruption, they should move to Control timing. If they remain lingering battle restrictions, they can stay Curse timing.

## Team Lock Window

The Team Lock Window occurs after Team Preparation/team submission is locked, but before Team Preview begins.

This is the strongest curse timing because:

- Teams are locked.
- Players cannot dodge by changing their submitted team.
- Team Preview has not started.
- If the cursed target is brought to Battle Phase, the curse applies immediately and carries through battles according to its rules.

Live Referee should eventually show this as a distinct timing state. Example:

`This is happening during Team Lock. Submitted teams are locked before Team Preview.`

## Recommended Pending Event Types

Use current code naming where needed, but these are the target concepts:

| Target Type | Current/Planned Mapping |
| --- | --- |
| `encounterResult` | Current `encounter-result` or `pokemon-result` interaction event |
| `controlToken` | Future split from current `token-activation` |
| `protectionResponse` | Current response record on an interaction event |
| `curseToken` | Future split from current `token-activation` |
| `classEffect` | Current class/perk activation response rule area |
| `manualEvent` | Current manual timing window |
| `transactionOnly` | Transaction record with no event-changing response |
| `battleSubmission` | Future battle/team submission lock event |
| `teamLockWindow` | Future phase/timing window marker |

## Recommended Token Fields

Token definitions should eventually expose timing fields so Live Referee can create the correct prompt without guessing from display category.

Control example:

```js
{
  id: "move-deleter",
  name: "Move Deleter",
  timingCategory: "control",
  useType: "activation",
  createsPendingEvent: true,
  requiresPendingEvent: false,
  opensResponseWindow: true,
  transactionsAllowed: true,
  defaultTimingWindow: "any",
  preferredTimingWindow: "teamLock",
  responseRole: "threat",
  livePromptType: "controlToken"
}
```

Protection example:

```js
{
  id: "immunity",
  name: "Immunity",
  timingCategory: "protection",
  useType: "response",
  createsPendingEvent: false,
  requiresPendingEvent: true,
  opensResponseWindow: false,
  transactionsAllowed: true,
  responseRole: "protection",
  livePromptType: "protectionResponse"
}
```

Encounter example:

```js
{
  id: "reroll-token",
  name: "Reroll Token",
  timingCategory: "encounter",
  useType: "encounterModifier",
  createsPendingEvent: false,
  requiresPendingEvent: true,
  requiredPendingType: "encounterResult",
  responseRole: "encounterModifier",
  livePromptType: "encounterToken"
}
```

Curse example:

```js
{
  id: "flame-orb-curse",
  name: "Flame Orb Curse",
  timingCategory: "curse",
  useType: "activation",
  createsPendingEvent: true,
  requiresPendingEvent: false,
  opensResponseWindow: true,
  transactionsAllowed: true,
  preferredTimingWindow: "teamLock",
  responseRole: "threat",
  livePromptType: "curseToken"
}
```

## Live Referee Prompt Examples

Encounter Result:

- Title: `Encounter Result Pending`
- Body: `[Player] rolled [Result]. Encounter modifiers, rerolls, responses, and deals may happen before this result is finalized.`

Control Token:

- Title: `Control Token Pending`
- Body: `[Player] used [Token] targeting [Target]. Protection responses and deals may happen before this resolves.`

Protection Response:

- Title: `Protection Response Recorded`
- Body: `[Player] responded with [Token/Effect]. This response is recorded inside the current pending window.`

Curse Token:

- Title: `Curse Pending`
- Body: `[Player] used [Curse] targeting [Target]. If this curse resolves and the target is valid for Battle Phase, the curse applies according to its effect.`

Team Lock addition:

- Body addition: `This is happening during Team Lock. Submitted teams are locked before Team Preview.`

## Known Exceptions And Future Edge Cases

- Transactions can provide a legal resource mid-window, but cannot rewind a resolved event.
- Protection responses should mark the responding player as Responded.
- Some effects may explicitly ignore protection or disallow responses.
- Some protection effects may redirect or delay instead of canceling.
- Some encounter tokens are pre-roll modifiers, while others are result-window modifiers.
- Game Corner and insurance tokens may need special timing categories or subcategories later.
- Future Gym Modifiers require their own timing architecture before implementation; they are not Token effects.
- Team Lock needs a first-class phase/timing marker before curse automation becomes reliable.
- Existing save data may refer to old token ids such as `move-deleter-curse`; migration must preserve old inventory and status records.

## Recommended Implementation Order

1. Add timing metadata to token definitions without changing behavior.
2. Migrate Move Deleter display/timing metadata to Control while preserving old `move-deleter-curse` save compatibility.
3. Split token activation prompt types into `controlToken` and `curseToken`.
4. Teach Live Referee to choose prompt copy from `livePromptType`.
5. Wire protection tokens as response actions that consume inventory and mark Responded.
6. Wire encounter tokens into `encounterResult` windows, including transaction-then-use flow.
7. Add Team Lock Window as a first-class timing state before deep curse automation.
8. Add exception text/flags only where specific token rules require them.
