> **Authority: HISTORICAL / SUPERSEDED**
> Do not use this file to infer current gameplay rules. It is preserved only as implementation archaeology.

# Rival Saga Gameflow Archeology

This is an archaeology pass for moving Rival Saga toward a prompted, ordered gameflow engine while preserving the current timing, transaction, response, and action systems. It is intentionally descriptive and planning-oriented. It does not propose removing the existing timing drawer, action rail, or pending result windows.

## Summary

Rival Saga already has many of the primitives needed for a stronger gameflow engine:

- A series/gym/phase model.
- Locked Action Phase turn order derived from placements.
- A global chronology counter used by logs, timing windows, responses, and transactions.
- Pending timing windows for manual events and some Pokemon result sessions.
- Response and transaction records linked to timing windows.
- Feature-specific session objects for encounters, random Pokemon results, Game Corner, team locking, battles, and gym results.

The missing layer is not raw state. The missing layer is an explicit "current prompt" or "current game step" model that tells the table what is happening now, who must act, who may respond, what event is pending, and what can legally happen next.

The safest next direction is to add a prompt controller above the existing systems first. It should guide existing flows before it owns resolution. That keeps the current manual tools available while making chronology visible and enforceable.

Follow-up architecture for the dual-screen split lives in `LIVE_TABLE_ARCHITECTURE.md`. That document treats the current app as the long-term Game Manager and plans a new Live Table screen for live prompted play. It also records the requirement that future gameflow architecture must be able to support both Individual Turn Order and Batch Order.

## 1. Current Gameflow Structure

### Core state landmarks

Most gameplay state lives in `app.js` under the global `state` object. The initial shape is created by `createCleanInitialState`, then normalized by `normalizeState`.

Important top-level gameplay fields include:

- `series`: series configuration and progression.
- `gym`: current gym number and gym-level state.
- `currentPhase`: active phase target, usually `action`, `battle`, or `shop`.
- `phaseState`: per-series and per-gym phase records.
- `actionPhaseState`: current Action Phase visits and turn order.
- `gymResults`: finalized gym standings and rewards.
- `battleRecords`: saved Battle Phase results.
- `moneyLedger`: money audit trail.
- `interactionEvents`: timing windows and pending/resolved/canceled events.
- `transactions`: global transaction audit records.
- `chronologyCounter`: monotonically increasing order value for game events.
- Feature sessions such as encounter sessions, random Pokemon sessions, breeder state, Game Corner sessions, and other action-specific objects.

### Series and gym progression

The app treats the saga as a sequence of series and gyms. `ensureGymPhaseState` creates or retrieves the current phase record for a series/gym pair. `currentPhase` points at the current series, gym, and phase. `nextPhaseTarget` advances from Action Phase to Battle Phase to Shop Phase, then into the next gym or series as appropriate.

This means the app already has a natural location for a future gameflow cursor:

- Current series.
- Current gym.
- Current phase.
- Current step inside that phase.
- Current pending event, if any.
- Current required actor or active player set.

### Phase structure

The major phase flow is:

1. Action Phase.
2. Battle Phase.
3. Shop Phase.
4. Next gym or series.

The app currently treats phases as views and state buckets more than as a strict event engine. Advancing phase updates state and renders the appropriate surface, but most detailed gameplay inside a phase is still handled by feature-specific UI functions and manual controls.

### Action Phase

Action Phase is the most developed ordered phase.

`ensureActionPhaseGymState` creates an action phase record and locks `turnOrderPlayerIds`. `placementTurnOrderPlayerIds` derives this order from standings, primarily by placement, then Saga Points, then fallback index. `actionTurnInfo` determines the current active player from the number of completed action units. `actionLocationCanConfirm` blocks most confirmations unless the player is active, the phase is Action Phase, and the location rules allow the action.

Current Action Phase behavior is strict-turn:

- First place acts.
- Then second place.
- Then third, fourth, fifth, and so on.
- After the final player acts, the order loops back to first place for the next action unit.
- Players with completed action budgets are skipped.

The action rail renders this order and the current actor. The selected player panel and location board let the table perform that player's action.

This fits the old sequential model very well. A batch model would need a draft layer because the current confirmation path commits the active player's action immediately.

### Encounter and random Pokemon results

Encounter and random Pokemon flows already resemble promptable events.

`createRandomPokemonSession` and encounter result session creation produce pending or reviewable sessions. They also create linked timing windows through `createPokemonResultTimingWindow`. Confirming or canceling the result resolves or cancels the linked timing window.

This is close to the desired transaction timing rule:

- A result is rolled.
- The result is pending.
- A response/transaction window exists.
- Players can record responses or transactions.
- The result is confirmed, rerolled, or canceled.

The main gap is that this is implemented per-feature, not through a common prompt engine.

### Battle Phase

Battle Phase is record-oriented rather than prompt-oriented.

The Battle Phase UI supports:

- Team locking.
- Match schedule/status.
- Battle result entry.
- Saving battle records.
- Results preview.
- Gym result finalization.

`saveBattleRecord` is the commit point for Battle Phase results. It validates battle inputs, stores records, updates team and schedule status, logs the saved result, and refreshes the UI. `finalizeGymResults` computes standings, payouts, Saga Points, momentum, badges, money ledger entries, and the gym completion log.

This is a good candidate for prompts later, but it currently has fewer response windows than Action Phase results.

### Victory Road and rewards

Victory Road appears as a planned or partially described reward layer rather than a fully automated promptable phase. Reward concepts exist in architecture notes and data, but the main app does not yet treat Victory Road as a first-class ordered prompt sequence.

A future prompt engine should model rewards as explicit pending choices:

- Reward offer created.
- Eligible player prompted.
- Transaction/response window if the reward rules allow it.
- Reward accepted, declined, transferred, or resolved.
- Ledger and log entries written at the moment of resolution.

### Activity logs and ledgers

`addLogEntry` records activity log entries with a chronology order. The log is rendered in the Activity Log drawer and can show event numbers. Some logs include undo metadata.

`addMoneyLedgerEntry` records balance changes with before/after values, contextual source fields, and optional transaction or linked event IDs. `applyPlayerMoneyChange` updates the player balance and writes the ledger entry.

The log and ledger are already useful audit trails. A prompt engine should continue to use them, but the prompt event should become the source of truth for what was pending and when it resolved.

### Timing windows, responses, and pending events

Timing windows are stored in `state.interactionEvents`. They can be manual windows from the Timing drawer or automatic windows created by result sessions.

Each event can have:

- An ID.
- Status.
- Event order.
- Series/gym/phase context.
- Actor and target players.
- Eligible response players.
- Source type and source ID.
- Payload.
- Responses.
- Linked transactions.

This is the existing foundation for the prompt engine's "pending event" concept.

### Transactions

Transactions are stored globally in `state.transactions` and also linked into timing windows through `activity.transactions`. They support money transfers and audit text for Pokemon, items, TMs, tokens, services, and promises.

Transactions currently work best as a table-audit layer rather than a full inventory transfer system. Completed money movement is real. Most non-money resources are recorded as text or references.

### Where the systems live

Primary implementation locations:

- `app.js`: client gameplay state, rendering, phase logic, action logic, timing windows, responses, transactions, ledgers, battle records, and logs.
- `index.html`: static app shell, action rail target, timing drawer, activity log drawer, battle UI, ledger modal, and other modal/drawer targets.
- `server.js`: local backend, game persistence, activity API routes, and broadcast sync.
- `ARCHITECTURE.md`: high-level design notes.
- `data/`: local runtime saves.

## 2. Current Timing System

### Event creation

Timing windows are created by `createInteractionEvent`. Result-specific windows are created through `createPokemonResultTimingWindow`.

Manual windows can be opened from the Timing Windows drawer. Automatic windows are currently created for at least some random Pokemon and encounter result sessions.

Common event fields include:

- `id`.
- `status`.
- `eventOrder`.
- `createdAt`.
- `resolvedAt`.
- `seriesNumber`.
- `gymNumber`.
- `phase`.
- `actorPlayerId`.
- `targetPlayerId`.
- `eligiblePlayerIds`.
- `sourceType`.
- `sourceId`.
- `title`.
- `description`.
- `payload`.
- `responses`.
- `transactions`.

### Pending and open windows

Open timing windows are shown in the Timing Windows drawer. `openInteractionActivities` sorts them by `eventOrder`, which gives the app a basic pending-event order.

The event's status controls whether players can still add responses or transactions. Current statuses include `open`, `resolved`, `expired`, `canceled`, and `undone`.

### Responses

Responses are added by `addInteractionResponse`. A response records:

- The responding player.
- Response type.
- Note/details.
- Event order.
- Timestamp.
- Optional source fields.

The UI currently supports manual response recording and at least one automated response path for Immunity. Some other response-like actions, such as reroll or steal, are visible as planned/disabled buttons or handled through feature-specific flows.

Important distinction: a response is not always an automatic rules effect. A manual response record can document table intent, while the actual state mutation might still need to happen through another legal effect path.

### Transactions inside timing windows

Transactions can be recorded while an event is open. `recordTransactionFromDrawer` links the transaction to the open activity, optionally applies money movement, writes ledger entries, and logs the transaction.

This already matches the desired rule shape:

- A pending event exists.
- Players may propose transactions.
- The transaction resolves.
- The game returns to the same pending event.
- The acquired resource must still be used through a legal effect.

The legality check for the acquired resource is not yet centralized. That would belong in a prompt/timing capability layer.

### Event resolution

`resolveInteractionActivity` changes event status:

- Normal resolution becomes `resolved`.
- Passing can become `expired`.
- Canceling becomes `canceled`.

Resolution logs an entry and refreshes/saves state. For linked result sessions, confirm/cancel paths also call timing window resolution helpers.

### Chronology

`nextEventOrder` increments `state.chronologyCounter`. Logs, responses, transactions, and timing windows use this shared order.

This is one of the strongest existing pieces. It can support a future gameflow engine where every prompt, response, transaction, reveal, and resolution has an ordered position.

### Automatic vs manual windows

Automatic windows currently exist for some Pokemon result sessions. Manual windows are created through the Timing drawer. Many gameplay changes still happen without creating timing windows.

The app is therefore mixed:

- Some results have real pending windows.
- Some actions commit immediately and only write a log.
- Some table events can be represented manually if players create a timing window.

A prompt engine should start by creating prompts for high-value commit points, not by trying to wrap every existing mutation at once.

### Resolved and canceled behavior

Resolved/canceled timing windows remain in state as audit records. The drawer can show history through the same activity structures. There is no universal rollback of a resolved event. Some feature-specific undo exists through log entry undo snapshots, but timing windows and transactions are not a complete reversible event-sourcing model.

That is consistent with the transaction timing rule: once the event has moved forward, transactions should not rewind it unless a rule explicitly allows that.

## 3. Current Transaction System

### Record shape

Transactions are normalized by `normalizeTransactionRecord`. They are stored globally and linked to timing windows.

Important fields include:

- `id`.
- `linkedEventId`.
- `fromPlayerId`.
- `toPlayerId`.
- `moneyAmount`.
- `pokemonText`.
- `itemText`.
- `tmText`.
- `tokenText`.
- `serviceText`.
- `promiseText`.
- `status`.
- `ledgerEntryIds`.
- `eventOrder`.
- `createdAt`.
- Context fields such as series, gym, and phase.

Supported statuses are:

- `completed`.
- `promised`.
- `canceled`.

### Completed transactions

Completed money transactions are stateful. The sender and receiver balances are changed through `applyPlayerMoneyChange`, and ledger entries are created for both sides.

Completed non-money resources are currently audit records unless another feature-specific function changes ownership/inventory.

### Promised transactions

Promised transactions record intent without applying money movement. They are useful for services, future consideration, or deals that resolve later.

The system does not yet provide a full lifecycle for collecting on a promise, converting a promise to completed, or enforcing promised resources.

### Canceled transactions

Canceled transactions can be recorded for audit purposes. There is no general rollback engine tied to transaction cancellation. If money was already moved, cancellation would need an explicit reversing transaction or manual correction.

### Money transfers and ledger

Money movement is the most complete transaction path. The ledger captures:

- Player.
- Amount.
- Direction.
- Balance before and after.
- Source type and label.
- Series/gym/phase.
- Transaction ID.
- Linked timing event ID.
- Timestamp.

This gives money transactions a reliable audit trail.

### Linked IDs

Transactions can link to timing windows through `linkedEventId`. Timing windows can also keep local transaction entries. This makes it possible to reconstruct "what deals happened during this pending event."

There is some duplication between the global transaction store and event-linked transaction lists. A prompt engine should decide whether the global transaction record or the prompt event is the canonical source, then derive the other view from it.

### Audit-only fields

Fields such as Pokemon, item, TM, token, service, and promise text are mostly descriptive. They do not automatically move Pokemon between rosters or items between inventories.

This is important for the proposed transaction rule:

- Buying a Reroll Token can be recorded as a transaction.
- The token still needs to exist in a real inventory or be applied through a legal manual/effect path.
- The prompt engine should not assume audit text equals usable state.

### Auto vs manual transactions

Transactions are currently entered manually from the Timing drawer. Money movement can be automated once the transaction is recorded, but the app does not automatically propose or validate deals.

Future prompt support should keep transactions as a table-controlled layer:

- Prompt opens.
- Players can propose a transaction.
- Table confirms completed/promised/canceled status.
- Money moves only on completed money transactions.
- Other resources either move through dedicated inventory functions or remain audit notes.

## 4. Current UI

### Timing Windows drawer

The Timing Windows drawer is the current home for pending events, responses, and transactions.

It supports:

- Creating manual pending windows.
- Viewing open windows.
- Viewing response history.
- Viewing transaction history.
- Recording responses.
- Recording transactions.
- Passing, resolving, or canceling events.

Confusing areas:

- It is a powerful tool, but it is separated from the main action being performed.
- Players may not know when they are expected to open it.
- Manual windows and automatic windows live together without a strong visual distinction.
- Response legality is mostly table-managed.
- Non-money transaction resources look official but are often audit-only.

### Action rail

The action rail shows the Action Phase turn order and current actor. It is the clearest current expression of chronological order.

It is designed for sequential turns. In a batch flow, it would need to show batch slots or reveal order rather than only the current active player.

### Action UI

The Action Phase view includes:

- Selected trainer controls.
- Player status grid.
- Action rail.
- Location board.
- Detail panel.
- Location-specific action controls.

This UI is feature-rich, but each location can have its own commit path. Some actions produce sessions and pending windows. Others mutate state and log immediately.

For a prompt engine, the Action UI should become a source of choices, while the prompt controller decides when those choices are revealed and committed.

### Encounter and random UI

Encounter and random Pokemon UI already have the most prompt-like behavior. Results can enter pending/review states, open timing windows, then be confirmed, rerolled, or canceled.

Confusing areas:

- The pending result can exist in both a feature session and a timing window.
- Rerolls and responses may be split between feature-specific controls and the Timing drawer.
- A transaction can be recorded during the window, but using the acquired item/token is not centrally validated.

### Activity Log

The Activity Log drawer records chronological actions, phase changes, battle records, transactions, and other events. It can filter entries and display event order.

It is strong as an audit surface. It is not a turn controller.

### Player Hub

Player Hub surfaces player-owned state such as rosters, shop/inventory, teambuilder, and action-related views. It is useful for ownership and preparation flows.

For prompt flow, Player Hub can provide context, but the prompt controller should avoid requiring users to hunt through Player Hub to know what is currently required.

### Battle Phase

Battle Phase has a structured page for:

- Team lock state.
- Match schedule.
- Battle result entry.
- Battle record history.
- Gym result finalization.

It is currently more like a control panel than a step-by-step judge. A future prompt engine could make it more ordered:

- Prompt players to lock teams.
- Prompt active match result entry.
- Open timing windows for legal pre-battle or post-battle effects.
- Prompt gym result finalization.

### Modals and drawers

The app already uses many modal/drawer patterns:

- Timing Windows drawer.
- Activity Log drawer.
- Money Ledger modal.
- Add Token modal.
- Reroll target modal.
- Opponent drawer.
- Cart drawer.
- Activation overlay.
- Phase confirmation modal.

This is useful. A prompt engine does not need a new visual language immediately. It likely needs one persistent prompt panel or rail that can coordinate these existing surfaces.

## 5. Prompt-Based Gameflow Opportunities

### Add a gameflow cursor

Introduce a persistent `gameflow` or `promptState` object that describes the current ordered step without replacing existing systems.

Example responsibilities:

- Current series/gym/phase.
- Current step ID and type.
- Active player or active player set.
- Waiting player IDs.
- Pending event ID.
- Response window state.
- Allowed actions.
- Allowed transaction status.
- Batch draft status, if relevant.
- Reveal/resolution order.
- Last resolved event ID.

### Make "what happens now" explicit

The app currently asks users to infer the next required action from the visible phase UI. A prompt layer could always answer:

- Who is acting?
- What are they choosing?
- Is the choice private or public?
- Is there a pending event?
- Who may respond?
- May transactions happen now?
- What buttons resolve the current step?
- What happens after this step?

### Treat timing windows as prompt substeps

Timing windows should remain the canonical response/transaction pause. A prompt engine can wrap them:

1. Create pending event.
2. Open response/transaction window.
3. Collect passes, responses, and transactions.
4. Resolve legal responses.
5. Resolve or cancel the pending event.
6. Advance the prompt cursor.

### Use prompts before changing resolution ownership

The lowest-risk first version can be guidance-only:

- Show current actor.
- Show expected action.
- Link to the relevant existing UI.
- Create timing windows for obvious pending results.
- Advance only when the existing action confirms.

Later versions can own more resolution logic.

### Make transaction timing visible

The prompt panel should make transactions feel normal rather than hidden:

- "Transaction window open" when an event is pending.
- Show completed/promised/canceled deals attached to the event.
- Explain that the event is still pending after a transaction.
- Allow legal effects from acquired resources only if the current window permits them.

### Improve chronology without deleting manual control

Manual timing windows should stay available for edge cases, house rulings, and effects not yet automated. The prompt layer should mark whether a window is:

- Prompt-created.
- Feature-created.
- Manual.
- Imported/legacy.

## 6. Prompt Engine Requirements

A prompt/gameflow event should be able to represent at least the following fields.

### Identity and context

- `id`.
- `type`.
- `title`.
- `description`.
- `seriesNumber`.
- `gymNumber`.
- `phase`.
- `sourceType`.
- `sourceId`.
- `createdAt`.
- `eventOrder`.

### Acting players

- `activePlayerId`.
- `activePlayerIds`.
- `eligiblePlayerIds`.
- `waitingPlayerIds`.
- `targetPlayerId`.
- `targetPlayerIds`.
- `priorityPlayerIds`.

### Visibility

- `visibility`: public, private, table, admin.
- `choiceVisibility`: public, hidden-until-reveal, private-to-player.
- `revealMode`: immediate, batch, ordered, manual.

### Status

- `status`: queued, active, awaiting-response, resolving, resolved, canceled, skipped.
- `startedAt`.
- `resolvedAt`.
- `canceledAt`.
- `resolutionReason`.

### Legal actions

- `allowedActions`.
- `allowedResponses`.
- `allowedTransactions`.
- `allowedResourceUses`.
- `blockedActions`.
- `requiresPassFromPlayerIds`.
- `autoPassPlayerIds`.

### Pending event links

- `linkedInteractionEventId`.
- `linkedTransactionIds`.
- `linkedResponseIds`.
- `linkedLogEntryIds`.
- `linkedLedgerEntryIds`.
- `linkedSessionId`.

### Choice data

- `choiceSchema`.
- `draftChoices`.
- `submittedChoices`.
- `revealedChoices`.
- `choiceOrder`.
- `resolutionOrder`.

### Resolution

- `result`.
- `statePatchSummary`.
- `undoSnapshotId` or `undoPayload`.
- `nextPromptId`.
- `nextPromptRule`.

### Audit

- `createdBy`.
- `resolvedBy`.
- `notes`.
- `warnings`.
- `legacySource`.

## 7. Batch Flow Requirements and Strict-Turn Assumptions

### Dual flow mode requirement

Future prompt/gameflow state should acknowledge a `gameflowMode` or equivalent setting. The known modes are:

- Individual Turn Order: the current strict model where one player acts, a response/transaction window can open, the event resolves, then the next player acts.
- Batch Order: a future experimental model where players submit choices for a round, choices reveal together, a shared response/transaction window can open, then the batch resolves in a defined order.

Do not convert the current Action Phase into batch mode until that mode has been tested. The architecture should simply avoid assuming every prompt has exactly one active player or exactly one pending action.

### Current strict-turn assumptions

Action Phase currently assumes one active player at a time. Confirmation paths use the active player and commit the action directly.

Strict-turn assumptions appear in:

- Locked `turnOrderPlayerIds`.
- `actionTurnInfo`.
- `actionLocationCanConfirm`.
- Player visit counts.
- Current actor rendering in the action rail.
- Immediate action confirmation handlers.
- Feature-specific sessions that are created at confirmation time.

### Batch flow shape

The proposed batch rhythm could look like:

1. Start Action Round 1.
2. Prompt all eligible players to choose one action.
3. Store choices as drafts.
4. Lock choices when submitted.
5. Reveal choices.
6. Resolve choices in placement order.
7. For each revealed choice, open a response/transaction window if the action creates a pending event.
8. Resolve the action.
9. Move to the next revealed choice.
10. Start Action Round 2.

This preserves chronology during resolution while allowing simultaneous choice collection.

### Batch fields needed

Batch action state would need:

- `batchId`.
- `actionRound`.
- `eligiblePlayerIds`.
- `draftChoices`.
- `submittedPlayerIds`.
- `lockedChoices`.
- `revealedAt`.
- `resolutionOrderPlayerIds`.
- `currentResolutionIndex`.
- `resolvedChoiceIds`.
- `skippedChoiceIds`.
- `responseWindowByChoiceId`.

### Hidden choice requirements

If players choose simultaneously, choices may need to be hidden until reveal. The current app does not have a general hidden-choice model.

Needed behavior:

- Player submits privately.
- Other players see submitted/locked status, not choice details.
- Admin/table can reveal when all required choices are submitted.
- Revealed choices become public log/prompt records.
- Resolution still follows placement order.

### Compatibility with strict chronology

Batching should only batch selection, not resolution. The exact chronology still matters for:

- Response windows.
- Transactions.
- Encounter/reroll timing.
- Target changes.
- Resource use.
- State mutations.
- Logs and ledger entries.

In other words, "everyone chooses at once" should not mean "everything resolves at once."

### Features that should remain strict-turn/manual first

Some events should stay strict until the prompt engine is mature:

- Mid-resolution choices.
- Team preview and battle team lock timing.
- Any action with hidden information that can affect later choices.
- Any effect that targets another player's pending event.
- Any effect that changes turn order or eligibility.
- Manual judge/table rulings.

## 8. Existing Risks

### Timing windows are bolted beside feature sessions

Some pending results are represented both as feature sessions and timing windows. If they drift apart, the UI may show an event as pending while the feature session is already confirmed or canceled.

Recommendation: future prompt records should link both objects and define which status is canonical.

### Some state mutates before the response window

Many actions commit immediately and then log. A prompt engine cannot safely add response windows after the fact if the event should have been pending before mutation.

Recommendation: start with result sessions and other obvious pending events before wrapping every action.

### Transaction resources are not fully stateful

Money transfers are real, but Pokemon/item/TM/token/service/promise fields are mostly audit text. This can make a transaction look more mechanically binding than it is.

Recommendation: label audit-only resource fields clearly in the prompt UI and only allow immediate use through actual inventory/effect functions.

### Global and linked transaction duplication

Transactions live in global `state.transactions` and inside linked activities. Server activity records also exist beside client interaction events.

Recommendation: choose a canonical transaction source before building deeper automation.

### Undo is partial

The activity log supports some undoable entries, but undo is feature-specific. Timing windows, transactions, and prompt events are not a complete event-sourcing system.

Recommendation: treat prompt records as audit and guidance first. Add undo support only for specific committed action types.

### Response legality is decentralized

Manual responses can record intent, but the app does not yet centrally validate whether a response is legal for the current event.

Recommendation: create a small legality map for prompt windows, starting with known resources such as reroll and immunity timing.

### Batch action choice requires new hidden-choice state

The current Action Phase stores confirmed visits. It does not store hidden drafts for all players.

Recommendation: add batch drafts separately from confirmed visits so existing Action Phase behavior remains intact.

### Large functions mix validation, mutation, logging, and rendering

Functions such as action confirmation, random result confirmation, battle record save, and gym result finalization often validate, mutate, log, save, and render in one path.

Recommendation: prompt integration should wrap these functions first. Split them only when the prompt engine needs to control a specific resolution step.

### Manual tools can bypass gameflow

The Timing drawer and many admin controls can create or resolve state outside a future prompt cursor.

Recommendation: keep this power, but mark prompt out-of-sync conditions and offer a "sync prompt to current state" admin action.

## 9. Recommended Next Pass

### Step 1: Add a prompt read model

Create a derived read model that answers "what should happen now" from existing state. Do not mutate behavior yet.

Examples:

- Current phase prompt.
- Current Action Phase actor prompt.
- Open timing window prompt.
- Pending Pokemon result prompt.
- Battle team lock prompt.
- Battle result entry prompt.

### Step 2: Render a persistent prompt panel

Add a compact panel or rail near the main phase UI:

- Current step.
- Active player(s).
- Pending event.
- Allowed responses.
- Transaction window status.
- Primary action button that deep-links to the existing UI.

This should make the game feel ordered without replacing the underlying controls.

### Step 3: Formalize transaction timing text in UI

Add short timing labels to open windows:

- "Transactions allowed while this event is pending."
- "After a transaction, this event remains pending."
- "Resources gained here still need legal timing to be used."

Also distinguish money-moving transactions from audit-only resource notes.

### Step 4: Create a prompt event schema

Add a normalized prompt/gameflow event shape, but start with only the fields needed for current UI:

- ID/context/status.
- Active player(s).
- Pending event link.
- Allowed response/transaction metadata.
- Event order.
- Resolution order.

### Step 5: Wrap Pokemon result sessions

Pokemon result sessions are the best first owned prompt flow because they already have pending windows.

Target behavior:

- Roll result.
- Create prompt.
- Create linked timing window.
- Allow responses/transactions.
- Confirm/reroll/cancel through existing paths.
- Resolve prompt when the result window resolves.

### Step 6: Add Action Phase batch drafts behind a feature flag

Keep strict-turn Action Phase as the default. Add batch selection as a separate mode:

- Store draft choices separately.
- Reveal choices together.
- Resolve choices in placement order using existing action confirmation code where possible.
- Open timing windows per resolved action.

### Step 7: Centralize response legality incrementally

Start with a small map:

- Encounter result: reroll allowed if the player owns or legally receives a reroll effect.
- Curse/negative effect: immunity or cleanse allowed if the effect supports that timing.
- Manual window: table-judged response allowed.

Avoid trying to encode every class rule at once.

### Step 8: Reconcile transaction sources

Decide whether prompt/timing events own linked transaction IDs or whether `state.transactions` owns all records with derived links.

Recommended direction:

- `state.transactions` remains canonical.
- Timing/prompt events store transaction IDs.
- UI resolves IDs to transaction records.

### Step 9: Document event lifecycle

Before implementing deeper automation, write the lifecycle in `ARCHITECTURE.md`:

1. Prompt queued.
2. Prompt active.
3. Pending event created.
4. Response/transaction window open.
5. Responses/transactions recorded.
6. Event resolved/canceled.
7. Prompt resolved.
8. Next prompt selected.

## Proposed Mental Model

The cleanest mental model is:

- Prompt: tells the table what is happening now.
- Pending event: the thing that has not resolved yet.
- Response window: legal pause before the pending event resolves.
- Transaction: a deal that may happen during the pause, but does not itself change the pending event.
- Effect use: a legal response/action that may change, cancel, reroll, or protect against the pending event.
- Resolution: the moment state, logs, and ledgers become final for that event.

This matches the desired transaction rule and keeps Rival Saga chronological without forcing every feature into a new engine immediately.
