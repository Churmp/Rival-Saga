> **Authority: HISTORICAL / SUPERSEDED**
> Do not use this file to infer current gameplay rules. It is preserved only as implementation and understanding history.

# Codex Rules Understanding Audit

> Updated Live Referee ruling: `LIVE_REFEREE_GAMEPLAY_CONTROLLER.md` is now canonical. Responses use one ordered priority holder at a time, new responses create fresh child cycles, unchanged parents resume their paused cycle, ordinary resolution handles one current prompt at a time, and normal Tokens are consumed on declaration without refund for later negation/cancellation. Statements below describing unordered waiting lists, whole-window Finalize, or automatic cancellation refunds are current implementation observations, not target rules.

This document records Codex's current understanding of Rival Saga rules, timing, Live Referee behavior, and implementation state as of this audit pass. It is intentionally descriptive. It does not create rules, change gameplay, or wire new effects.

Use the labels below carefully:

- Confirmed: supported by current code or existing architecture docs.
- Inferred: likely from the app shape or previous architecture notes, but not fully codified as a rulebook entry.
- Needs Ruling: Steven needs to decide or clarify before this becomes source of truth.

## 1. Current Game Understanding

### High-level structure

Confirmed: Rival Saga is a competitive Pokemon league game managed by a single-page web app with a lightweight local backend. The app tracks players, Pokemon rosters, inventory, tokens, money, Action Phase visits, battles, logs, pending timing windows, transactions, and local game saves.

Confirmed: The outer Site Shell is separate from the Rival Saga game module. It owns local profile/login placeholders, game lobbies, game selection, patch notes, profiles, forums, and admin surfaces. The game module starts after entering a game through the site shell.

Confirmed: A Series is a major progression bucket. Current state stores `state.series`, and series-scoped systems include some Action Phase trackers such as item discount stacks, TM discount stacks, Ranger credits, and related milestones.

Confirmed: A Gym is the current round or league segment inside a Series. Current state stores `state.gym`. Phase records and Action Phase selections are keyed by series and gym.

Inferred: A Gym is the main unit of live play: players spend Action Phase actions, prepare/lock teams, battle, receive results/rewards, then advance toward the next gym.

Needs Ruling: The exact rulebook definition of when a Gym officially begins and ends is not yet written. The app has phase advancement, but rule timing for "start of gym", "end of gym", and "between gyms" needs a source-of-truth definition.

### Current phases

Confirmed: The app currently has three major in-game phase targets: Action Phase, Battle Phase, and Shop Phase. Some docs refer to End Phase or End-of-Gym checks as future timing concepts, but these are not first-class runtime phases yet.

Confirmed: Action Phase is the most ordered phase. Each player has 3 actions per Action Phase. Turn order is locked when the action gym state is created and is derived from placement order. Players take actions in order, then the order loops.

Confirmed: Action Phase locations include Encounter, Department Store, Move Dojo, Breeder, Ranger Base, Graveyard, Game Corner, PC, Pokemon Center, Hidden Grotto, Dragon's Den, Silph Co R&D, and Bulletin Board.

Confirmed: Before Battle Phase, the app supports team building, team locking, schedules, battle records, and validation. Team Lock is treated as an important timing window in architecture, especially for curses, but it is not yet a complete independent phase engine.

Confirmed: Battle Phase represents team lock, match scheduling, battle result entry, battle record saving, and gym result finalization. Battle records are the source of truth for Pokemon performance stats.

Inferred: End Phase represents the after-battle and end-of-gym cleanup area: standings, rewards, salary, momentum, class/perk checks, delayed effects, and queued start-of-next-gym effects.

Needs Ruling: Whether Shop Phase is the actual End Phase, a separate post-gym phase, or only a current app surface needs a rulebook decision.

### Resources and ownership

Confirmed: Pokemon records are stable owned roster records. They track owner, roster status, source, battle stats, buffs, nerfs, facility statuses, logs, and sprites. Global Pokemon/species status is separate from owned Pokemon copies.

Confirmed: Money is tracked on players and audited through a money ledger. Completed money transactions automatically move money and write ledger entries.

Confirmed: Inventory stores tokens, items, TMs, and other shop resources. Token-heavy Live Referee work now reads from inventory.

Confirmed: Perks and trainer classes exist as app concepts, but trainer class effects are mostly not automated. Trainer class names and wheel outcomes exist; class ability data is currently sparse/placeholder.

Inferred: Rewards are meant to become confirmed events, not loose manual edits. The app already treats battle records, purchases, Pokemon additions, and several location results as commit points.

Needs Ruling: The exact salary/reward formulas, class/perk reward hooks, and End Phase reward order are not fully known.

### Website responsibility vs host responsibility

Confirmed: The website currently manages state, logs, money, inventory, rosters, action visits, battle records, pending windows, transactions, and many location flows.

Confirmed: The host still manually handles many rule outcomes. Manual Required effects are official in the timing record once finalized, but the host may still need to apply the actual Pokemon/status/battle cleanup elsewhere.

Confirmed: Advanced Controls / Timing Windows remains a repair and manual ruling surface.

Inferred: Long-term, the website should become more rules-aware, but only after source-of-truth rules are stable.

## 2. Current Phase / Timing Model

### Phase/timing landmarks

Confirmed: Site Shell is the outer website layer. It is not a Rival Saga phase.

Confirmed: Game entry happens through the Site Shell and opens the Rival Saga module. The game module uses top-level pages such as Player Hub, Action Phase, Battle Phase, Leaderboard, MVP Race, Pokedex, and Info.

Confirmed: Pre-Gym / Start-of-Gym Resolution is documented architecture only. It is intended for effects checked at the end of one Gym but resolved before the next Gym's Action Phase.

Confirmed: Action Phase currently enforces individual turn order. Normal action confirmations are guarded by current actor checks and by the global pending-event guard.

Confirmed: Team Lock / Battle Prep is represented by teambuilder and battle team lock state. It is also a target timing state for curses and battle-submission effects, but full timing automation is incomplete.

Confirmed: Battle Phase is implemented as battle setup, schedule/status, and battle result recording.

Inferred: End Phase and End-of-Gym checks are currently a mix of gym result finalization, shop/phase advancement, logs, and future architecture notes.

Needs Ruling: The official order of Pre-Gym, Action Phase, Team Lock, Battle Phase, End Phase, Shop, and Between-Gym cleanup is not yet rulebook-stable.

### Timing vocabulary

Confirmed: A timing check is a condition check that determines whether an effect should happen or be queued. Example: Professor checking at End of Gym whether any Pokemon were released.

Confirmed: An activation is a player declaring a token/effect/class/perk/manual event. Control and curse tokens are activations that currently create pending events.

Confirmed: A pending event is an open `state.interactionEvents` record. It represents something that has happened or been declared but is not final yet.

Confirmed: A response window is the pause while a pending event is open. Players may record responses, choose No Response, or make deals if transactions are allowed.

Confirmed: A prompt-chain response is a response that becomes the current prompt inside the same pending event. The root event remains underneath; the current prompt moves to the latest valid response prompt.

Confirmed: A resolution is the act of finalizing, canceling, expiring, or otherwise closing an open pending event. The current implementation resolves the whole pending event, not just one prompt step.

Confirmed: A manual host cleanup step is the work needed after a Manual Required or Hybrid event becomes official. Example: manually applying a Restrict outcome or copying a Pokemon until automation exists.

### Pre-Gym example: Professor No Release Fallback

Confirmed: This is documented architecture/planning only, not implemented trainer class automation.

Intended flow:

1. End of Gym checks whether any Pokemon were released this Gym.
2. If no releases happened, create a queued start-of-next-gym effect.
3. Before the next Gym's Action Phase, Professor chooses one owned Pokemon in a player's party to copy.
4. The targeted player may pay Professor $2,000 to negate.
5. If paid, transfer $2,000 to Professor, mark the copy effect negated, and create no copy.
6. If not paid, Professor receives/copies the selected Pokemon.
7. Copy creation may remain Manual Required until roster-copy automation exists.

Important confirmed architecture point: this targets one owned roster Pokemon, not a species/name-wide Pokemon. It should use `targetType: pokemon` and `targetScope: rosterInstance`.

Needs Ruling: The exact Pre-Gym order among multiple queued effects, whether payment is respondable, and whether other players may respond to the payment/copy prompt need rulebook decisions.

## 3. Pending Events And Prompt Chain

### Root prompts

Confirmed: A root prompt is created when `createInteractionEvent` creates an open interaction event. Root prompt id is `event:${activity.id}`.

Examples that create root prompts:

- Manual event from Advanced Controls or Live Referee.
- Pokemon/encounter result timing window.
- Control token pending event.
- Curse token pending event.
- Team Lock timing window.

Confirmed: Open pending events are sorted by `eventOrder` and the oldest open event is the current pending event.

### Response prompts

Confirmed: `addInteractionResponse` stores response records on an interaction event. A response that is not a pass normally creates a prompt step.

Confirmed: A response prompt id is `response:${response.id}` unless explicitly overridden.

Confirmed: `promptStepId` is the id of the prompt step created by a response. Passes do not create prompt steps.

Confirmed: `respondingToPromptId` records which prompt the response answered. It also appears as `promptId` for compatibility.

Confirmed: The prompt chain is built from the root prompt plus all uncanceled response records that create prompt steps and whose parent prompt exists.

Confirmed: The current prompt is the last prompt step in that chain.

### No Response scope

Confirmed: No Response is stored as a response with `type: "pass"`, `respondingToPromptId` set to the current prompt id, and `createsPrompt: false`.

Confirmed: Waiting players are calculated for the current prompt only. A player who passed the root prompt has not necessarily passed a later response prompt unless they also pass that prompt.

Confirmed: For a response prompt, eligible players are currently all players except the player who created that response prompt. This is a practical alpha rule, not necessarily final game law.

Needs Ruling: Some effects may only be respondable by the target, by rivals, by the whole table, or by no one. Eligibility needs source-of-truth rules.

### Protection responses

Confirmed: Protection tokens require an open pending event. Live Referee protection records consume a token, create an interaction response, mark the responder as responded for the current prompt, and create a new prompt step.

Confirmed: Effect application for most protection is Manual Required. The prompt updates to something like "Gold used Immunity..." and the table may respond to that response.

### Deals

Confirmed: Deals/transactions do not count as responses. They do not create prompt steps and do not move the current prompt forward.

Confirmed: Deals store `promptId` and `promptText`, so they can be audited against the prompt during which they happened.

### Cancel Current Response

Current implementation: Cancel Current Response only works if the current prompt step is a response. It marks that response canceled, sets `createsPrompt` false, records cancel metadata, refunds linked token consumption records when possible, logs the cancellation, and returns the current prompt to the previous chain step. Canonical correction: normal cancellation must not refund declaration-time Token consumption. Explicit restoration belongs to audited Advanced / Repair Controls for erroneous declarations.

Confirmed: It cannot cancel the root event. Root cancellation uses Cancel Event or Advanced Controls.

### Cancel Event

Current implementation: Cancel Event resolves the whole pending event as canceled and may attempt to refund linked Tokens. Canonical correction: a legitimately declared Token remains consumed when its effect is canceled or negated unless a specific effect rule says otherwise.

### Finalize Event

Confirmed: Finalize Event currently closes the whole pending event/window. It does not pop only the top prompt, resolve that prompt, then continue stack-style.

Confirmed: If a linked Pokemon result session exists, finalizing accepts the result through the existing result-confirm path. Otherwise `resolveInteractionActivity` marks the event resolved.

Confirmed: If eligible players are still waiting on the current prompt, Live Referee warns before finalizing.

Confirmed target: ordinary gameplay resolves only the latest current prompt, checks its result and mandatory follow-ups, then resumes or cancels the paused parent. Whole-window finalization remains only a current implementation limitation and possible Advanced / Repair operation.

## 4. Live Referee Design Understanding

Confirmed design correction: Live Referee is not merely a prompt panel anymore. It is the gameplay screen for live play.

Confirmed: Every Play screen should show only two things:

- Situation.
- Choices.

Confirmed: The Situation area should show what is happening in player-facing language. The Choices area should show the available next actions.

Confirmed: Normal Play view should not show:

- a separate instruction/prompt line,
- explanations of what each button does,
- internal metadata,
- stacked forms,
- vertical-scroll solutions for common flows.

Confirmed: Every click in Play view should transition to a new screen or submenu. A choice such as Make Deal, Use Protection, or Use Other Response should open a focused next screen rather than stacking another form under the current screen.

Confirmed: The main normal flow lives in Live Referee. Advanced Controls remain available, but they are not supposed to be the normal response path.

Confirmed: The current Live Referee has:

- Pending event summary.
- Current prompt and compact prompt chain.
- Waiting summary.
- Selected/acting player based on current trainer/profile context.
- Buttons for No Response, Use Protection / available effect flow, Make Deal, and Use Other Response.
- Cancel Event, Advanced Controls, and Finalize Event.
- Details/debug sections containing prompt ids, player status, token uses, transactions, and response history.

Important current-state caveat: the implementation still has inline forms, helper text, prompt/debug vocabulary, and scroll-prone layouts in some paths. Those are current implementation artifacts, not the corrected target design for Play view.

Confirmed: The Live Referee is also planned to become the future effect drawer. The effect drawer should answer "what can this player use right now?" Tokens are the first implementation target; class, perks, items, Pokemon, locations, and manual host effects come later.

Confirmed updated UI principles:

- Treat Live Referee as the live gameplay screen.
- Make each screen a Situation plus Choices.
- Avoid internal metadata in Play view.
- Avoid separate instructional prompt copy.
- Avoid explaining buttons in visible Play view.
- Avoid database-form feel.
- Avoid stacked forms.
- Avoid vertical scrolling as the answer to normal flows.
- Change screens/submenus based on the chosen action.
- Keep Details and Advanced Controls for debug/repair.
- Direct the course of the game.

Implemented now:

- Floating Live Referee overlay with resizing/collapse.
- Prompt-chain display.
- Normal No Response, protection response, other response, and deal forms.
- Token effect screens for selected token target buckets.
- Pending event guard for major timeline mutations.
- Advanced Controls drawer remains.

Planned/incomplete:

- Conversion from prompt-panel/inline-form UI into Situation + Choices Play screens.
- Full effect drawer for class/perk/item/Pokemon effects.
- Full legality filtering.
- Full automatic effect application.
- No-scroll screen transitions for common flows.
- Stack-style prompt resolution.

## 5. Effect Resolution Architecture Understanding

Confirmed: The effect architecture vocabulary is documented in `EFFECT_RESOLUTION_ARCHITECTURE.md` and partly implemented in token metadata helpers.

### Metadata fields

Confirmed/partly implemented:

- `timingCategory`: when the effect can be used, such as control, protection, encounter, curse, or future phase-specific categories.
- `sourceType`: where the effect comes from. Current code implements token and manual source constants; docs plan class, perk, item, TM, Pokemon, location, transaction, and host sources.
- `targetType`: what kind of thing is targeted.
- `targetScope`: how broadly that target applies.
- `resolutionMode`: whether the app can apply it automatically, manually, as audit-only, or hybrid.
- `consumptionMode`: when a token/resource is spent or refunded.
- `createsPendingEvent`: whether effect use creates an interaction event.
- `requiresPendingEvent`: whether use requires an existing open prompt.
- `opensResponseWindow`: whether the effect opens responses.
- `transactionsAllowed`: whether deals can be recorded.
- `manualInstructions`: documented but not fully standardized in token records.

Planned/documented more than implemented:

- `exceptionFlags`.
- Rich `manualInstructions`.
- Class/perk/item/Pokemon/source-specific resolvers.
- Full per-effect application handlers.

### Resolution modes

Confirmed: Automatic means the app safely applies state changes. Current examples include completed money transactions and Reroll Token using the existing safe reroll path.

Confirmed: Manual Required means the pending event can become official, but the host must apply the actual outcome elsewhere.

Confirmed: Audit Only means the app records the declaration/deal but does not mutate game state.

Confirmed: Hybrid means part automatic and part manual/audit-only.

Current implementation status:

- Most token effects default to Manual Required.
- Reroll Token is treated as Automatic where the encounter/reroll session supports it.
- Money transactions are Automatic.
- Non-money transaction contents are Audit Only.
- Professor payment/copy would be Hybrid later, but is not implemented.

### Consumption modes

Documented modes:

- Consume On Use.
- Consume On Resolve.
- Consume On Successful Resolve.
- Do Not Consume.
- Manual Consumption.
- Refund If Canceled.

Current code constants:

- `consumeOnUse`.
- `consumeOnResolve`.
- `manualConsumption`.
- `refundIfCanceled`.

Confirmed: Current token metadata defaults wired token categories to Refund If Canceled, while manual/unknown effects can be Manual Consumption. Actual token use currently consumes inventory immediately and records a token consumption record. Canceling a linked response or event attempts to refund it.

Needs Ruling: Which effects should consume on declaration, on final resolution, or only on successful resolution needs per-effect rulebook decisions.

## 6. Targeting Rules

Confirmed: Target Type and Target Scope are separate and important.

Target Type = what kind of thing is targeted.

Target Scope = how broadly the target applies.

### Target types

Current/planned target types:

- `none`: no target.
- `currentPrompt`: the current pending prompt.
- `pokemon`: a Pokemon target.
- `player`: a player target.
- `team`: a team target.
- `encounterResult`: a pending encounter or Pokemon result.
- `resource`: a token, item, TM, money, or other resource.
- `table`: table-wide target.
- `manual`: unresolved/manual target.

### Target scopes

Current/planned target scopes:

- `none`: no scope.
- `currentPrompt`: current prompt only.
- `species`: Pokemon species/name-wide.
- `rosterInstance`: one owned Pokemon record.
- `singlePlayer`: one player.
- `allPlayers`: every player.
- `singleTeam`: one team.
- `allTeams`: every team.
- `singleResource`: one resource.
- `allMatchingResources`: all resources matching criteria.
- `tableWide`: whole table.
- `manual`: host-defined target.

### Examples

Restrict:

- Confirmed target metadata direction: `targetType: pokemon`, `targetScope: species`.
- It targets a Pokemon species/name.
- It should affect all Pokemon with that species/name.
- It should not use a player's roster Pokemon selector as the primary targeting model.

Wicked Blow Token:

- Confirmed target metadata direction: `targetType: pokemon`, `targetScope: rosterInstance`.
- It targets one owned Pokemon on a player's roster/team.
- It affects only that individual Pokemon, not every Pokemon with that species/name.

Immunity / Protection:

- Confirmed current metadata direction: `targetType: currentPrompt`, `targetScope: currentPrompt`.
- They respond to the current pending prompt.

Reroll:

- Confirmed current behavior: Reroll Token is an encounter modifier and uses a pending encounter/result window if available.
- It should use `targetType: encounterResult`, with scope equivalent to current encounter/current prompt.

Player-targeting effects:

- Should use `targetType: player`, `targetScope: singlePlayer`.

All-player/table effects:

- Should use `targetType: player` or `table`, and `targetScope: allPlayers` or `tableWide`.

Current limitation: Code has target metadata helpers and some target-specific effect screens, but not every token/effect has been reviewed. Some target scope inference still comes from older `targetMode` fields, so it may be wrong for edge cases.

Needs Ruling: Move Deleter target scope is still uncertain. If it deletes a move from a named species globally, it should be species. If it deletes a move from one owned Pokemon, it should be rosterInstance. If neither is settled, it should stay manual.

## 7. Token System Understanding

### Where token metadata lives

Confirmed: Token timing constants and helpers live in `app.js`. Token/shop data also comes from `shop-data.js`, manual token options, utility token definitions, status token definitions, field token definitions, and active token catalog helpers.

Confirmed: Architecture docs define target behavior in `TOKEN_TIMING_ARCHITECTURE.md` and `EFFECT_RESOLUTION_ARCHITECTURE.md`.

### Token categories

Confirmed: Control tokens are proactive threats/disruptions. They create pending events, open response windows, allow transactions, and resolve when finalized. Examples include Restrict, Arena Trap, Clear Smog, Extra Ban, Unban, Move Deleter, Haze/Imprison after timing migration, and other direct disruption tokens.

Confirmed: Curse tokens are dangerous conditions or lingering battle restrictions. They create pending events and often matter most during Team Lock. Examples include Flame, Toxic, Iron Ball, Silencing, Knock Off, Devolve, Purge, and Foresight.

Confirmed: Protection tokens are responses to current prompts. They require an open pending event, consume inventory when recorded, and create a new response prompt.

Confirmed: Encounter tokens are used during encounter/result windows. Reroll Token uses the existing safe reroll path. Other encounter tokens may record responses/manual required outcomes until their exact resolvers exist.

### Consumption and refunds

Confirmed: Token uses consume inventory through `consumeTokenForEffect`, then create a `tokenConsumptions` audit record with linked event/response ids.

Current implementation: Cancel Current Response refunds Token consumptions linked to that response. Canonical correction: this becomes an explicit repair-only restore; normal effect cancellation or negation does not refund a declared Token.

Confirmed: Cancel Event refunds token consumptions linked directly to that event.

Confirmed: If a player cannot be found during refund, the record is marked manual-refund-needed.

Confirmed: Finalize Event does not refund. It closes the pending event. Consumed tokens stay consumed.

### Automatic vs manual tokens

Confirmed: Reroll Token is currently the clearest Automatic token because it uses the existing reroll session path.

Confirmed: Most other token effects are Manual Required after timing is recorded.

Confirmed: Completed money movement from transactions is automatic, but it is not a token effect.

Unclear/not fully categorized:

- Exact categories for every old token id and legacy status id.
- Field tokens in the four-category model.
- Insurance/Game Corner timing exceptions.
- Haze/Imprison final timing details.
- Move Deleter final target scope.

Known weak spots:

- Generic effect forms still exist in some paths.
- Target selectors are still incomplete for all target types/scopes.
- Some effect screens/forms can reintroduce scroll pressure.
- Full response legality validation is not implemented.
- Most effects do not automatically apply their gameplay outcome yet.
- Class/perk integration is mostly architecture, not runtime.

## 8. Transactions / Deals Understanding

Confirmed: Deals can happen during pending events if transactions are allowed.

Confirmed: Deals do not count as responses, do not mark a player Responded, and do not advance the current prompt chain.

Confirmed: Money transfers in completed transactions are automatic. They update both players' balances and write ledger entries.

Confirmed: Non-money deal contents such as Pokemon, items, TMs, tokens, services, and promises are audit/manual text today.

Confirmed: Deals store prompt context using `promptId` and `promptText`.

Confirmed: Transactions are different from effects. A transaction can give a player a resource, but the resource still needs legal timing to be used.

Confirmed: Professor No Release Fallback payment is not a normal deal. It is a built-in payment-negation option attached to that effect. It should be represented as effect metadata and resolution behavior, not as a generic Make Deal transaction.

Needs Ruling: Whether any other payment windows should be built-in negations rather than transactions needs a rulebook list.

## 9. Demo / Testing Mode Understanding

Confirmed: Free Testing Mode / Demo Controls lives under `state.testingTools.freeMode` and `ignoreTurnOrder`. When enabled, profile links are ignored for testing control and turn-order enforcement can be bypassed where testing override is checked.

Confirmed: The currently selected trainer/profile is who should respond in Live Referee testing. The design intentionally avoids adding ugly player dropdown clutter to the normal Live Referee.

Confirmed: Max All Players For Testing gives all players high money, high momentum/badge points, token-heavy inventories, a curated item set, a curated TM set, and a Pokemon roster mix.

Confirmed: Item/TM flooding was reduced to curated sets because full item/TM flooding made Player Hub harder to read, slowed testing, and hid Live Referee timing work.

Confirmed: Token quantities remain high because tokens are the primary resource for timing/response testing. Current max setup gives multiple copies of all relevant tokens.

Confirmed: Testing Pokemon rosters include Active, Legacy, and Released Pokemon to support roster/facility/history testing.

Unclear: Whether multiple named demo presets should exist later, such as Live Referee Timing Demo, Roster/Facility Demo, Shop Inventory Demo, and Full Data Stress Demo.

## 10. Current Implementation Map

### app.js

Controls most client-side gameplay, rendering, state normalization, timing windows, Live Referee, token use, transactions, money ledger, action phase, battle phase, player hub, shop, Pokemon rosters, testing tools, and backend sync hooks.

Timing/effect pieces currently live here:

- `state.interactionEvents`.
- `createInteractionEvent`.
- `addInteractionResponse`.
- prompt chain helpers.
- Live Referee render and actions.
- pending-event guard.
- token timing metadata and consumption/refund.
- transaction creation and money application.
- Action Phase turn order/confirmation.
- Battle result/gym result finalization.

Should probably move later:

- Token metadata and resolvers into a token/effects module.
- Live Referee prompt derivation into a dedicated gameflow module.
- Targeting helpers into effect-targeting rules.
- Large static rules/data into generated or ruleset files.

### server.js

Controls local backend serving, game save storage, user/profile records, game/lobby routes, token art assets, API routes, and backend sync/broadcast support.

Timing/effect state is persisted through game snapshots and some activity API routes, but rule resolution is mainly client-side today.

### styles.css

Controls global styling and component styling, including Live Referee overlay, drawers, tabs, player hub, action phase, battle phase, cards, and modals.

No rule ownership should live here, but UI clarity heavily affects timing usability.

### index.html

Defines the static app shell and DOM anchors for the Site Shell, game module, drawers, modals, Live Referee, admin tools, action phase, battle phase, and other surfaces.

No rule ownership should live here. It should remain structure and targets for `app.js`.

### ARCHITECTURE.md

High-level architecture and source-of-truth direction. Includes confirmed event philosophy, Site Shell, Live Table/Live Referee direction, event commit points, Action Phase, Battle Phase, shop, token automation status, teambuilder, Pokemon index/form policy, Game Corner tiers, and balance tier separation.

### GAMEFLOW_ARCHEOLOGY.md

Describes existing gameflow primitives, phase structure, chronology, timing windows, transactions, and the missing prompt/gameflow layer. Useful for understanding what is already present before deeper engine work.

### LIVE_TABLE_ARCHITECTURE.md

Plans the future/legacy Live Table model and documents dual flow compatibility: Individual Turn Order now, Batch Order later. Still useful conceptually even though the current UI direction moved to the floating Live Referee.

### TOKEN_TIMING_ARCHITECTURE.md

Defines token timing categories and recommended metadata: Control, Protection, Encounter, Curse, pending event relationships, examples, exceptions, and implementation order.

### EFFECT_RESOLUTION_ARCHITECTURE.md

Defines the target effect-resolution vocabulary: timing categories, Pre-Gym queued effects, source categories, target categories, resolution modes, consumption modes, exception flags, and schema recommendations.

### LIVE_REFEREE_EFFECT_DRAWER_ARCHITECTURE.md

Plans Live Referee as both table caller and future effect drawer. Defines available effect grouping, timing filters, player context, effect click behavior, unavailable effects, sorting, and implementation order.

### pokemon-balance-tiers.js

Generated balance tier data. It should remain data, not timing rules.

### pokemon-build-data.js

Generated local Pokemon/move/ability/species data for teambuilder/Pokedex. It should not become a live network dependency or a timing source.

### shop-data.js

Shop data for items/TMs/tokens. It currently contributes token/inventory resources but is not a complete effect-resolution rulebook.

### silph-data.js

Silph Co data for moves/abilities/development surfaces. Not the central timing source.

### data/

Local backend saves, users, game records, simulations, token art, and generated/imported artifacts. Treat game saves as runtime data, not source fixtures.

## 11. Current Gaps / Risks

- The official rulebook does not exist yet, so code and architecture docs are acting as partial source-of-truth.
- End Phase, Shop Phase, End-of-Gym, and Pre-Gym boundaries are not rulebook-stable.
- Prompt chain display exists, but finalization closes the whole event rather than resolving one prompt at a time.
- Eligible responder rules are broad and alpha-level.
- Many effects are Manual Required, so host cleanup remains essential.
- TargetType/targetScope metadata needs review for every token and future class/perk effect.
- Some target scope inference still depends on old target modes.
- Move Deleter needs a final targeting ruling.
- Field tokens and weird tokens do not fit perfectly into the four token buckets yet.
- Token consumption currently happens when recorded, with refunds on cancel. Some rules may require consumption only on resolution or success.
- Full legality validation is not implemented.
- Class/perk abilities are not ready for automation.
- Pre-Gym queued effect state does not exist yet.
- Batch mode is documented but not implemented.
- Transactions can imply non-money resources changed, but those are audit-only today.
- UI can still become form-heavy in complex effect flows.
- Live Referee code and docs still contain prompt-panel and inline-form artifacts. The corrected target is Situation + Choices Play screens.
- Vertical scrolling must not become the normal solution for Play flows.
- Each Play action needs a screen/submenu transition model rather than stacked forms.
- Code is concentrated in `app.js`, increasing risk as effect systems grow.

## 12. Questions Steven Needs To Answer Before Rulebook v1

### Game Structure

- What exactly defines a Gym?
- When does a Gym officially begin?
- When does a Gym officially end?
- What steps happen between Gyms?
- Is Shop Phase a phase, an End Phase surface, or a current app convenience?
- What must be resolved before Action Phase begins?
- Which systems reset per Gym, per Series, or never?

### Timing

- What effects happen at Pre-Gym?
- What effects happen before Team Lock?
- What effects happen during Team Lock?
- What effects happen before Battle Preview?
- What effects happen after battles but before End Phase?
- What effects check at End Phase but resolve later?
- If multiple delayed effects are queued, what order resolves them?
- Can players transact during Pre-Gym payment/response windows?

### Prompt / Response Rules

- Who can respond to which effects?
- Do all players get a chance to respond to every prompt?
- Are some effects only respondable by the target?
- Are some effects only respondable by rivals or non-actors?
- Are some effects unrespondable?
- When everyone passes, should the top prompt resolve or should the whole event finalize?
- Should stack-style resolution eventually exist?
- If stack-style resolution exists, does each resolved response reopen the previous prompt for new responses?
- Can a proactive Control token ever be used as a response, or only Protection/Encounter-style effects?

### Targeting

- Which effects target species/name-wide Pokemon?
- Which effects target one owned Pokemon instance?
- Which effects target players?
- Which effects target all players?
- Which effects target teams?
- Which effects target resources?
- Which effects target the whole table?
- What is Move Deleter's final target scope?
- Does Restrict always target species/name-wide Pokemon?
- Which target scopes care about current battle team vs full active roster?

### Resources

- When is a token consumed?
- Should all token uses refund on cancel?
- Should a token be consumed when played, when resolved, or only if successful?
- Which resources transfer automatically?
- Which resources are audit-only?
- Can promised resources be used before delivery?
- Can a traded token be used immediately in the same response window if legal?
- What money/payment effects are built-in negations instead of normal deals?

### Tokens

- Which tokens are Control?
- Which tokens are Protection?
- Which tokens are Encounter?
- Which tokens are Curse?
- Which tokens are Field or another category?
- Which tokens are weird exceptions?
- Which token effects should become automatic first?
- Which tokens must stay Manual Required?
- Which tokens ignore protection or cannot be responded to?
- Which tokens are legal only during Team Lock?

### Trainer Classes

- Are trainer classes currently implemented rules or still being refactored?
- Which class abilities are passive?
- Which class abilities are activations?
- Which create pending events?
- Which allow responses?
- Which have payment-negation windows?
- Which resolve at Pre-Gym?
- Which have per-gym or per-series use limits?
- Which class abilities are Manual Required forever?

### Perks

- Are perks passive, activated, or both?
- Can perks create pending events?
- Can perks be responded to?
- Which perks are manual-only?
- Which perks modify rewards, battles, team lock, or encounters?
- Which perks should appear in the Live Referee effect drawer?

### Live Referee

- Should it always be visible by default?
- Should it eventually replace notifications or only coordinate with them?
- Should all usable effects be launched from it?
- What screens should it have?
- What should each Play screen use as its Situation text?
- What counts as a Choice versus Advanced/repair action?
- What should never appear in Play view?
- What belongs only in Details or Advanced Controls?
- Which existing inline forms should become separate screens first?
- What screen/submenu should each current button transition into?
- Should the host have a table/spectator mode separate from player mode?
- How much repair power should be visible during normal play?

### Automation

- Which effects should the app eventually apply automatically?
- Which should remain Manual Required forever?
- Which should be Hybrid?
- What should the host be able to repair manually?
- What undo coverage is required before an effect can be Automatic?
- Should automatic application wait until full rulebook stability?

## 13. Proposed Rulebook Structure

Recommended future source-of-truth docs:

- `RULEBOOK.md`: top-level canonical index, glossary, source-of-truth statement, and links to rule modules.
- `TIMING_AND_PHASES.md`: Series, Gym, phase order, Pre-Gym, Action Phase, Team Lock, Battle Phase, End Phase, Shop/Between-Gym, and delayed checks.
- `PROMPT_AND_RESPONSE_RULES.md`: pending events, prompt chains, response windows, passes, finalization, stack/whole-window policy, responder eligibility, unrespondable effects.
- `EFFECT_RESOLUTION.md`: timing categories, source types, resolution modes, consumption modes, exception flags, Manual Required vs Automatic standards.
- `TARGETING_RULES.md`: targetType, targetScope, species vs roster instance, player/team/resource/table targeting, selector rules.
- `TOKEN_RULES.md`: token categories, timing legality, token-by-token metadata, consumption/refund rules, automation status.
- `TRAINER_CLASS_RULES.md`: class abilities, passive/activation split, timing, limits, payment windows, Pre-Gym hooks.
- `PERK_RULES.md`: perk types, timing, response rules, automation and manual statuses.
- `TRANSACTION_RULES.md`: legal transaction windows, automatic money, audit-only resources, promises, built-in payment negation distinction.
- `LIVE_REFEREE_RULES.md`: Live Referee as the gameplay screen, Situation + Choices screen rules, screen/submenu transitions, what belongs in Details/Advanced Controls, player context, testing context.
- `IMPLEMENTATION_NOTES.md`: code mapping, migration warnings, manual cleanup, current limitations, and non-rule implementation status.

Goal wording for future prompts:

```text
Use RULEBOOK.md as source of truth. Do not infer rules from code if the rulebook disagrees.
```

## 14. Implementation Roadmap

### Phase 1: Stabilize token targeting and effect screens

Goal: Make token use screens choose targets from both targetType and targetScope.

Likely files: `app.js`, `styles.css`, possibly token metadata docs.

Main risks: wrong target scope can accidentally make species-wide effects instance-only or the reverse.

Do not do yet: Do not automate all token effects.

### Phase 2: Finish token resource accounting

Goal: Decide and implement per-token consumption/refund modes.

Likely files: `app.js`, `TOKEN_RULES.md`, `EFFECT_RESOLUTION.md`.

Main risks: consuming too early, refunding when rules say not to, or duplicating refunded inventory ids.

Do not do yet: Do not add broad automatic resolution until consumption is stable.

### Phase 3: Convert Live Referee to Situation + Choices Play screens

Goal: Make normal live play screen-based. Each screen should show only Situation and Choices, with clicks transitioning to focused submenus/screens instead of stacking forms.

Likely files: `app.js`, `styles.css`.

Main risks: preserving old prompt-panel assumptions, hiding important choices, or making too many tiny screens without clear back/cancel behavior.

Do not do yet: Do not solve this by adding more vertical scrolling or turning Live Referee into full Player Hub.

### Phase 4: Add targetType/targetScope review for all tokens

Goal: Produce a token-by-token metadata table and mark unresolved scopes.

Likely files: `TOKEN_RULES.md`, possibly `app.js` metadata.

Main risks: old token ids and legacy save compatibility.

Do not do yet: Do not migrate save ids until mappings are reviewed.

### Phase 5: Add automatic resolution for safest effects

Goal: Automate only effects with clear targets, clear undo needs, and stable rules.

Likely files: `app.js`, future effect resolver modules.

Main risks: applying state before the table intended finalization, or incomplete undo.

Do not do yet: Do not automate ambiguous class/perk effects.

### Phase 6: Add Pre-Gym queued effect support

Goal: Add explicit queued start-of-gym effect records and a Pre-Gym prompt surface.

Likely files: `app.js`, `TIMING_AND_PHASES.md`, `EFFECT_RESOLUTION.md`.

Main risks: phase advancement skipping unresolved queued effects.

Do not do yet: Do not implement every trainer class.

### Phase 7: Add class/perk support after rulebook is stable

Goal: Add class/perk effects through the same metadata and Live Referee model.

Likely files: `app.js`, class/perk rules docs, future data modules.

Main risks: passive triggers and once-per-gym limits can create hidden state bugs.

Do not do yet: Do not infer class rules from names or loose notes.

### Phase 8: Add full stack-style resolution only if needed

Goal: Decide whether response prompts resolve one at a time or whole-window finalization is enough.

Likely files: `app.js`, `PROMPT_AND_RESPONSE_RULES.md`.

Main risks: stack-style resolution changes timing balance and makes UI/undo more complex.

Do not do yet: Do not implement stack behavior until Steven explicitly chooses it.

### Phase 9: Add richer host repair tools

Goal: Let host repair prompt chains, token refunds, transactions, target metadata, and manual cleanup safely.

Likely files: `app.js`, `styles.css`, implementation notes.

Main risks: repair tools accidentally becoming normal player flow.

Do not do yet: Do not hide audit history when repairing.

## 15. Final Understanding Summary

Current understanding: Rival Saga is moving from a tracker into a rules-aware, screen-driven live gameplay system. The current app already has chronology, pending events, response records, transactions, money ledger, action order, and a Live Referee overlay. Live Referee is the Play screen, not a prompt panel. Each Play screen shows Situation and Choices. The canonical controller uses ordered response priority, fresh child cycles, paused-parent resume, declaration-time Token consumption, one-prompt resolution, and mandatory follow-up checks. The implementation still uses whole-window finalization and mostly Manual Required application, so those are migration gaps rather than undecided rules.

Biggest uncertainties:

- Official phase order and Gym boundaries.
- Per-effect responder eligibility exceptions beyond the confirmed default priority algorithm.
- Per-token target scopes and resolver details.
- Trainer class and perk timing.
- Which effects should ever be Automatic.

Most important questions for Steven:

1. When does a Gym officially begin and end?
2. What is the official phase order, including Pre-Gym and End Phase?
3. Which effects override the normal targeted/non-targeted response eligibility and priority rules?
4. Which current effects require named manual-resolution tasks instead of automatic resolution?
5. Which effects target species-wide Pokemon vs owned Pokemon instances?
6. Which exceptional effect rules explicitly restore a consumed Token, if any?
7. Which token effects should be automatic first?
8. Which trainer class effects create pending events or Pre-Gym queued effects?
9. Which payments are built-in negations instead of normal deals?
10. What are the exact Situation + Choices screens for Live Referee play, and what belongs only in Details/Advanced Controls?

Recommended next implementation step: add per-prompt ordered priority state and migrate Pass/Response to a resumable priority cursor, then add one-prompt resolution before expanding automatic Token resolvers.

Recommended next documentation step: create `LIVE_REFEREE_RULES.md` alongside `RULEBOOK.md`, `TIMING_AND_PHASES.md`, `PROMPT_AND_RESPONSE_RULES.md`, `TARGETING_RULES.md`, and `TOKEN_RULES.md` so the Play-screen model becomes source of truth before more UI work.
