> **Authority: HISTORICAL / SUPERSEDED**
> Do not use this file to infer current gameplay rules. The Live Table direction was superseded by the Live Referee gameplay controller.

# Rival Saga Live Table Architecture

This is a planning pass only. It documents how to add a future Live Table screen without rewriting the existing Rival Saga app, removing current tabs, removing the Timing Windows drawer, or converting Action Phase into batch mode.

The intended split is:

- Game Manager: the existing app surfaces for setup, ownership, review, edits, logs, shopping, battle records, and long-term state.
- Live Table: a new prompted live-game surface that answers "what is happening right now?"

Live Table should sit above the current phase, timing, response, transaction, log, and ledger systems. It should make those systems understandable before it replaces any of their behavior.

## Core Direction

Rival Saga should not become only a prompt app. The current app should remain the management and audit workspace. Live Table should become the live table-facing surface during an active gym.

The first implementation should be read-first:

1. Read current phase and timing state.
2. Derive a current prompt.
3. Display who is acting or who is being waited on.
4. Surface existing pending events, responses, transactions, and log entries.
5. Link to or call existing controls.

Only later should Live Table own more resolution logic.

## 1. Existing App Surfaces

### Site Shell

The Site Shell is outside the Rival Saga game module. It includes Home, My Games, Rulebook, Patch Notes, Profiles, Forums, and Admin. This belongs outside Live Table.

Live Table may eventually be one way to enter a game instance, but it should not replace the Site Shell.

### Player Hub

Player Hub belongs primarily to Game Manager.

It is the long-term trainer workspace for:

- Player sheet.
- Roster.
- Inventory.
- Shop.
- Tokens.
- Teambuilder.
- Intel and opponent review.
- Trainer-owned prep.

Live Table should surface small pieces from Player Hub only when the current prompt needs them, such as "Gold may respond with Immunity" or "Steevee has submitted a choice." Players should not need to browse Player Hub to discover the current live step.

### Action Phase

Action Phase is currently both a game surface and a live-control surface. It includes:

- Current phase context.
- Action turn rail.
- Selected trainer controls.
- Player status grid.
- Location board.
- Location detail panel.
- Location-specific action controls.
- Encounter/random Pokemon flows.

In the long term, Action Phase can remain a Game Manager/action control page, while Live Table becomes the simplified current-step view. Live Table should deep-link to Action Phase controls or call existing handlers rather than duplicating every location UI at first.

### Battle Phase

Battle Phase belongs mostly to Game Manager, with selected live moments surfaced in Live Table.

Battle Phase currently handles:

- Team lock-in.
- Battle schedule.
- Battle result entry.
- Battle records.
- Gym result finalization.

Live Table can later prompt:

- "Players are locking teams."
- "This battle needs a result."
- "Gym results are ready to finalize."
- "A post-battle response window is open."

The Battle Phase page should remain the detailed record and audit surface.

### Leaderboard and MVP Race

Leaderboard and MVP Race are Game Manager review surfaces. Live Table can reference standings when they drive order or rewards, but it should not replace the detailed views.

Important live uses:

- Placement order for Individual Turn Order.
- Possible future batch resolution order.
- End-of-gym standings and reward prompts.

### Shop, inventory, and token systems

Shop and inventory management belong to Game Manager and Player Hub. Live Table should only expose these systems when timing makes them relevant.

Examples:

- A player can use a legal response token.
- A player acquired money through a completed transaction.
- A player is making a deal during a pending event.
- A player needs to confirm a live-use effect.

Live Table should not become a full shop browser in the first pass.

### Timing Windows drawer

The Timing Windows drawer is the current advanced control panel for:

- Manual pending events.
- Open response windows.
- Manual responses.
- Transactions.
- Pass/resolution controls.

It should remain available to host/admin users. Live Table should become the player-friendly surface for common timing windows, while the drawer remains the troubleshooting and manual-ruling tool.

### Activity Log

The Activity Log is the permanent audit surface. It records chronological events and undoable entries where supported.

Live Table should show a recent live feed derived from Activity Log and timing/transaction records, but the full Activity Log drawer should remain the full history/audit view.

### Money Ledger

The money ledger belongs to Game Manager. Live Table should show transaction money movement attached to the current event, but detailed balance history should stay in the ledger modal.

### Admin and manual repair areas

Admin/debug/manual repair controls belong to Game Manager or host-only Live Table controls. They should not be player-facing by default.

Live Table host controls may need:

- Force resolve.
- Cancel event.
- Correct waiting players.
- Manual pending event.
- Manual override.
- Reopen last event only if a rule allows it.

These should be visibly host/admin tools.

## 2. Live Table State Model

The minimum future state should be small and mostly derived at first. Avoid storing duplicate copies of existing timing events or logs.

Recommended top-level shape:

```js
state.liveTable = {
  enabled: false,
  viewMode: "host",
  gameflowMode: "individual",
  currentPromptId: "",
  currentPendingEventId: "",
  currentBatchId: "",
  lastResolvedEventId: "",
  hostControlsAvailable: true,
  outOfSyncReason: ""
};
```

Recommended derived read model:

```js
{
  liveModeEnabled: true,
  viewMode: "host",
  gameflowMode: "individual",
  currentPhase: "action",
  currentStep: "action-turn",
  currentPromptText: "Gold is choosing an Action Phase location.",
  currentActorPlayerId: "player-1",
  requiredPlayerIds: ["player-1"],
  waitingOnPlayerIds: ["player-1"],
  passedPlayerIds: [],
  respondedPlayerIds: [],
  currentPendingEventId: "",
  currentBatchId: "",
  batchMode: false,
  transactionsAllowed: false,
  responsesAllowed: false,
  availableActions: ["chooseAction", "manualPendingEvent"],
  hostControlsAvailable: true,
  lastResolvedEventId: ""
}
```

Important architecture point: `state.liveTable` should store durable preferences and explicit prompt IDs only when needed. The visible Live Table model should usually be derived from:

- `state.currentPhase`.
- `state.phaseState`.
- `state.actionPhaseState`.
- `state.interactionEvents`.
- `state.transactions`.
- `state.log`.
- `state.moneyLedger`.
- Session objects such as `encounterSessions` and `randomPokemonSessions`.

This avoids making Live Table a second source of truth.

## 3. Prompt Model

A prompt is the live-facing representation of a current game step. It may link to an existing timing window, feature session, batch, log entry, or phase state.

Recommended first-pass shape:

```js
{
  id: "action-turn-player-1-round-1",
  type: "action-turn",
  phase: "action",
  title: "Gold's Action",
  body: "Gold chooses and confirms one Action Phase location.",
  seriesNumber: "Kanto",
  gymNumber: 1,
  gameflowMode: "individual",
  activePlayerIds: ["player-1"],
  requiredPlayerIds: ["player-1"],
  waitingOnPlayerIds: ["player-1"],
  passedPlayerIds: [],
  respondedPlayerIds: [],
  availableActions: ["chooseAction", "manualPendingEvent"],
  responsesAllowed: false,
  transactionsAllowed: false,
  linkedPendingEventId: "",
  linkedSessionId: "",
  batchId: "",
  canAdvance: false,
  nextPromptHint: "Open a response window if the action creates a pending event."
}
```

For a pending encounter result:

```js
{
  id: "pending-encounter-result-abc",
  type: "pending-result",
  phase: "action",
  title: "Hidden Grotto Encounter Pending",
  body: "Gold rolled Horsea. Players may respond, transact, or pass before the result is finalized.",
  gameflowMode: "individual",
  activePlayerIds: ["player-1"],
  requiredPlayerIds: [],
  waitingOnPlayerIds: ["player-1", "player-2", "player-3"],
  passedPlayerIds: ["player-2"],
  respondedPlayerIds: [],
  availableActions: ["useResponse", "makeTransaction", "pass", "finalizeEvent"],
  responsesAllowed: true,
  transactionsAllowed: true,
  linkedPendingEventId: "interaction-123",
  linkedSessionId: "random-session-456",
  batchId: "",
  canAdvance: true
}
```

For a future batch reveal:

```js
{
  id: "action-round-1-reveal",
  type: "action-batch-reveal",
  phase: "action",
  title: "Action Round 1 Reveal",
  body: "All Action 1 choices are revealed. The table may respond or make transactions before the batch resolves.",
  gameflowMode: "batch",
  activePlayerIds: ["player-1", "player-2", "player-3"],
  requiredPlayerIds: ["player-1", "player-2", "player-3"],
  waitingOnPlayerIds: [],
  availableActions: ["useResponse", "makeTransaction", "pass", "resolveNextBatchEvent", "resolveBatch"],
  responsesAllowed: true,
  transactionsAllowed: true,
  linkedPendingEventId: "interaction-batch-123",
  batchId: "batch-1",
  canAdvance: true
}
```

The prompt should not own all gameplay state. It should point to the systems that already own state.

## 4. Live Table Layout

Live Table should feel like a live game control surface, not another dense admin tab. It should be direct, high-contrast, and readable from across the table.

### Header

Shows:

- Current series.
- Current gym.
- Current phase.
- Current step.
- Gameflow mode.
- Live status, such as "Pending Event" or "Waiting on Gold."

### Main prompt card

Shows:

- What is happening now.
- Who is acting.
- What is pending.
- Whether responses are open.
- Whether transactions are open.
- Big primary buttons.

Example buttons:

- Accept Result.
- Use Response.
- Make Deal / Trade.
- Pass.
- Finalize Event.
- Manual Override.

The first version can call existing timing drawer functions or open the existing drawer with the right event focused.

### Player status row

Each player should have one clear status:

- Acting.
- Choosing.
- Waiting.
- Passed.
- Responded.
- Submitted.
- Revealed.
- Done.
- Not involved.

Individual mode can highlight one actor. Batch mode can show all players with submitted/hidden/revealed status.

### Available actions panel

Shows context buttons:

- Use Response.
- Make Deal / Trade.
- Pass.
- Finalize Event.
- Manual Pending Event.
- Manual Override.

Buttons should appear only when legal or relevant. Alpha versions may still allow manual host override, but player-facing labels should be clear about what is table-judged.

### Live event feed

Shows recent chronological events:

- Rolls.
- Pending windows.
- Responses.
- Transactions.
- Passes.
- Resolutions.
- Battle records.
- Phase changes.

The feed should use `eventOrder` where available, then timestamp as fallback.

### Host/admin controls

Host view should include:

- Force resolve.
- Cancel event.
- Correct waiting players.
- Manual pending event.
- Manual response.
- Manual transaction.
- Reopen last event if allowed by a rule.
- Sync prompt to current state.

These should not be the visual focus for player/table display.

## 5. Player View vs Host View

Live Table should eventually support different views, but the first implementation should be Host/Admin Live Table.

### Host/Admin View

Implement first.

Host/Admin View can:

- See all prompt details.
- Open and resolve timing windows.
- Record manual responses.
- Record transactions.
- Use manual overrides.
- See warnings and out-of-sync state.
- Advance or correct the live flow.

This is safest because the current app is already host/admin oriented.

### Player View

Implement later.

Player View should show what the active profile can do right now:

- Respond.
- Make transaction.
- Pass.
- View relevant available resources.
- Confirm a choice.
- See public prompt information.

Player View must respect profile-locked prep and hidden choice rules.

### Table/Spectator View

Optional later.

Table/Spectator View should show:

- Current event.
- Player statuses.
- Recent feed.
- Public reveal information.

It should hide host controls, private choices, hidden drafts, and private prep.

## 6. Dual Flow Mode Compatibility

Live Table must not hard-code only one phase-flow style. Rival Saga should be able to support both Individual Turn Order and Batch Order after testing.

Recommended future setting:

```js
state.liveTable = {
  gameflowMode: "individual"
};
```

Possible values:

- `individual`: strict current-player chronology.
- `batch`: simultaneous choice collection with ordered or defined batch resolution.

This setting does not need to be functional yet. The key requirement is that Live Table prompt/state names should not assume there is always exactly one active player or exactly one pending action.

### Mode 1: Individual Turn Order

This is the current stricter model.

Example Action Phase flow:

1. First place takes an action.
2. A response/transaction window opens if the action creates a pending event.
3. The action resolves.
4. Second place takes an action.
5. A response/transaction window opens if needed.
6. The action resolves.
7. Continue through third, fourth, fifth, then back to first.

Benefits:

- Clear strict order.
- Easier to know exactly what happened first.
- More tactical punishment/reward for placement order.
- Less ambiguity when effects care about timing.

Downsides:

- Slower.
- More response windows.
- More mental load.
- First-place players reveal plans earlier.
- New players may wait more.

Live Table display for this mode should show:

- Current actor.
- Current pending event.
- Who can respond.
- Who has passed.
- Resolve current event.
- Advance to next player.

### Mode 2: Batch Order

This is an experimental future model. Do not implement it during the first Live Table pass.

Example Action Phase flow:

1. All players secretly choose Action 1.
2. All Action 1 choices are revealed.
3. A shared response/transaction window opens.
4. The action batch resolves in a defined resolution order.
5. All players choose Action 2.

Benefits:

- Faster live gameplay.
- Easier for new players to follow.
- Fewer tiny timing windows.
- Better table-wide interaction.
- Players respond to the revealed batch instead of isolated micro-events.

Downsides:

- Changes balance.
- Higher-placement players are no longer forced to reveal first.
- Some effects need a batch resolution tiebreaker.
- Multiple pending events may exist at once.

Live Table display for this mode should show:

- Current batch.
- Which players have submitted choices.
- Which choices are hidden or revealed.
- Shared response/transaction window.
- Batch resolution order.
- Resolve next event in batch.
- Resolve full batch.

### Batch resolution order

Do not decide this in code during the architecture pass. Future batch mode must be able to support a defined resolution order.

Possible options to document for later testing:

1. Highest placement resolves first.
2. Lowest placement resolves first.
3. Host chooses resolution order.
4. Phase-specific resolution order.
5. Random order.
6. Simultaneous results unless conflict occurs, then use placement order.

Prompt and batch state should therefore include fields such as:

- `resolutionOrderMode`.
- `resolutionOrderPlayerIds`.
- `currentResolutionIndex`.
- `resolvedChoiceIds`.
- `conflictResolutionRule`.

### Compatibility rule

Batch mode should batch choice collection, not erase chronology. Even in batch mode, Live Table should still create ordered records for:

- Choice submission.
- Choice reveal.
- Shared response/transaction window.
- Individual effect resolution inside the batch.
- Transactions.
- Responses.
- Final batch resolution.

## 7. Response and Transaction UX

Live Table should make responses and transactions obvious.

### Responses

Show "Use Response" only when a response window is open.

First-pass behavior can support:

- Manual response text.
- Pass.
- Host-entered response.
- Links to known feature flows such as Immunity or reroll where they already exist.

Later behavior should filter available responses by timing tags:

- Encounter result.
- Curse target.
- Team preview.
- Battle start.
- Battle result.
- Shop/purchase.
- Manual table ruling.

### Transactions

Show "Make Deal / Trade" during most pending events. The prompt should clearly explain:

- The transaction does not resolve the pending event by itself.
- The game returns to the same pending event after the transaction.
- Completed money transactions move money immediately.
- Pokemon/items/TMs/tokens are audit-only until automatic inventory transfer exists.
- A resource gained through a transaction still needs legal timing to be used.

Suggested transaction presets:

- Money only.
- Sell token.
- Trade Pokemon.
- Trade item/TM.
- Service.
- Promise.
- Ransom/payment.

Each transaction should show status:

- Completed.
- Promised.
- Canceled.

The first implementation can call the same transaction recording logic used by the Timing Windows drawer.

## 8. Integration With Existing Timing Drawer

Recommendation:

- Keep the Timing Windows drawer as an advanced/manual control panel.
- Make Live Table the main player-facing surface for common pending events.
- Let host/admin users open the drawer from Live Table.
- Over time, move common response and transaction actions into Live Table.
- Do not remove the drawer until Live Table handles the majority of real timing use cases.

Live Table should display timing windows in clearer words:

- "This event is pending."
- "Responses are open."
- "Transactions are allowed."
- "Players may pass."
- "The host can finalize when the table is done."

The drawer can continue to show the raw, detailed version.

## 9. Integration Risks

### Duplicate state

Risk: Live Table could duplicate `interactionEvents`, transactions, logs, or phase state.

Mitigation: derive the visible Live Table model from existing sources. Store only durable preferences and explicit prompt IDs.

### Event resolution mutating too early

Risk: some actions currently mutate state before or without a timing window.

Mitigation: start by displaying existing pending windows and Pokemon result sessions. Do not wrap every action at once.

### Strict turn order assumptions

Risk: current Action Phase helpers assume one active player and immediate confirmation.

Mitigation: preserve Individual Turn Order as default. Add batch drafts later as a separate state path, not by changing confirmed visits directly.

### Log duplication

Risk: Live Table prompts, timing windows, and existing feature handlers could all log the same event.

Mitigation: prompts should link to existing log entries when possible. Do not add prompt logs for derived display-only prompts.

### Transaction/inventory desync

Risk: transaction text may imply Pokemon/item/token ownership changed when only money moved automatically.

Mitigation: label non-money transaction resources as audit-only until specific transfer flows exist.

### Hidden/manual responses

Risk: manual responses recorded in the Timing drawer may not appear in Live Table.

Mitigation: Live Table should read responses directly from linked interaction events.

### Multiple pending events in batch mode

Risk: batch mode can create multiple pending actions at once, while current UI assumes one pending action or one current actor.

Mitigation: batch prompts need `batchId`, `resolutionOrderPlayerIds`, and per-choice linked pending event IDs.

### Save/load migration

Risk: adding persistent Live Table state can break older saves or create stale prompt pointers.

Mitigation: normalize `state.liveTable` with safe defaults and derive prompts when IDs are missing.

### Render-function logic

Risk: too much gameflow logic could be embedded directly inside Live Table rendering.

Mitigation: create a pure read helper such as `deriveLiveTablePrompt(state)` before rendering.

### Manual controls bypassing prompts

Risk: host/admin tools can change state without updating the Live Table cursor.

Mitigation: show an out-of-sync warning and provide a host-only "sync prompt to current state" action.

## 10. Recommended Implementation Plan

### Step 1: Add this architecture document

This document is the first step. It records the intended split before implementation starts.

### Step 2: Add a Live Table tab or screen that only reads state

Add a new top-level game screen named Live Table. It should render current phase, current prompt, open timing windows, and recent live feed without changing behavior.

### Step 3: Add a current prompt card

Derive the prompt from existing state:

- Open timing event.
- Pending encounter/random Pokemon session.
- Current Action Phase actor.
- Battle team lock status.
- Battle result entry status.
- Phase advancement availability.

### Step 4: Add player status row

Use existing response/pass state for timing windows. Use existing Action Phase turn state for current actor. Use future fields only when needed.

### Step 5: Add live event feed

Read from Activity Log and interaction events. Sort by `eventOrder` where available.

### Step 6: Add buttons that call existing controls

Host-only buttons can open the Timing drawer, record pass, record manual response, record transaction, resolve event, or navigate to the relevant Game Manager page.

Avoid new resolution logic at this stage.

### Step 7: Add player-friendly labels

Translate timing system language into table language:

- Pending result.
- Response window.
- Transaction window.
- Pass.
- Finalize.
- Audit-only trade note.

### Step 8: Add transaction presets later

Presets should still write normal transaction records. They should not create a separate transaction model.

### Step 9: Add dual flow mode setting later

Add a future Gameflow Mode setting:

- Individual Turn Order.
- Batch Order.

Individual remains default. Batch stays behind a setting or feature flag until tested.

### Step 10: Migrate common phase flows into prompt definitions

Only after the read-first Live Table is stable, move high-value flows into prompt definitions:

- Pending Pokemon results.
- Manual timing windows.
- Action turn confirmation.
- Battle team lock.
- Battle result save.
- Gym result finalization.

## Safest First Implementation Step

The safest first implementation step is a read-only Live Table screen with:

- Header showing series/gym/phase.
- Main prompt card derived from current open timing event or Action Phase turn.
- Player status row.
- Recent live feed.
- Host button to open the existing Timing Windows drawer.

This gives Rival Saga a live table-facing screen without changing chronology, transactions, Action Phase enforcement, or save data behavior.
