> **Authority: CANONICAL SUBSYSTEM RULES**
> Canonical only for Live Referee navigation, response priority, prompt chains, and response-controller behavior. Token-specific lifecycle rulings remain governed by `SAGA_TOKEN_RULES.md`.

# Rival Saga Live Referee Gameplay Controller

## Status And Authority

This document is the canonical target model for Live Referee gameplay, response priority, pending-effect resolution, and player-facing effect use.

Where older architecture documents describe unordered responders, whole-window finalization, or Live Referee as a prompt panel/effect drawer, this document takes precedence. `SAGA_TOKEN_RULES.md` takes precedence for unresolved Token-consumption outcomes.

The current app does not implement every rule in this document yet. Advanced / Repair Controls must remain available while the gameplay controller is migrated.

## Purpose

Live Referee is Rival Saga's active gameplay controller. It keeps the table synchronized around:

1. What is happening right now?
2. Whose decision is it?
3. What can that player legally do?

Player Hub answers "What do I have?" Live Referee answers "What can I do now?"

The normal player-facing screen exposes one current situation and a small set of choices. Event queues, timing metadata, response tables, resolution records, and stack repair belong to internal state, History, Details, or Advanced / Repair Controls.

## Core Invariants

- There is one player-facing current situation.
- When input is required, one player owns response priority at a time.
- The game timeline cannot advance through an unresolved situation.
- Responses are ordered, not first-come-first-served.
- Response windows only exist when an effect definition provides meaningful response timing.
- A response creates a new current pending effect and pauses its parent.
- Every pending effect owns its own priority cycle and response state.
- Resolving a child resumes the unchanged parent's existing cycle; it does not restart it.
- Ordinary play resolves one current pending effect at a time.
- **Current implementation policy:** normal Tokens are consumed once when a completed declaration is finally confirmed, before resolution. Merely selecting an effect to provisionally claim open Action Control Timing does not consume it.
- **Final lifecycle needs ruling:** current code does not ordinarily refund later negation, cancellation, blocking, or ineffectiveness, but those outcomes are not yet one approved universal Saga rule.
- Trade does not respond, pass, consume priority, or change the current situation.
- Automatic effects resolve without a generic Finalize button.
- Manual effects expose the specific remaining task, not a generic Finalize button.
- Mandatory follow-ups run before resuming a parent or normal Play.
- Phase-boundary procedures run automatically and close ordinary Control Timing until their required work is complete.

## Phase-Boundary Procedures And Control Windows

Live Referee distinguishes a `phaseBoundaryProcedure` from a `controlWindow`.

A phase-boundary procedure is scheduled Start- or End-of-phase work. The Referee automatically detects it, names the effect or trigger, identifies the player who must act, presents only legal decisions (including Skip for optional effects), and explains that ordinary Control Timing will reopen after the procedure completes. It then continues the game without asking the host to enter or pass a synthetic phase.

A Control window exists only when no phase-boundary procedure, pending effect, response chain, Action/location operation, or other game operation is resolving and the current rules do not explicitly close Control Timing. Known open contexts include Gym Start Preparation Control, open Action Phase moments, Team Building, Shop Phase, and post-Battle Control after End-of-Battle procedures complete.

### Gym Start Preparation

After expirations and mandatory/optional Start-of-Gym effects resolve, Live Referee opens `gymStartPreparationControl` using previous-Gym placement order. Gym 1 uses the established initial player order.

1. First place may declare one legal Control effect or pass.
2. A declaration resolves its complete pending event and response chain.
3. Priority resumes with the next player and cycles after the final player.
4. Any declaration resets the consecutive-pass chain.
5. The window closes only after every player passes consecutively without a new declaration.

Players are not removed after acting; they may receive another opportunity on a later cycle. A declared Control effect uses normal ordered response priority for Protection and other legal responses.

### End-Of-Action Offers

`endOfActionPhaseProcedure` runs before Team Building. For Honey, the Referee gathers eligible completed encounter records and displays Pokemon, original player, encounter source, and relevant modifications. The eligible player chooses one encounter or Skip. Honey's selected copy may open a normal pending event and response window. The Referee continues automatically after all End-of-Action offers finish. The exact copied payload remains Needs Ruling.

### End-Of-Battle Offers

The exact `endOfBattlePhaseProcedure` order is Battle Payout, automatic procedure opening, mandatory End-of-Battle effects, ordered optional offers, then ordinary Control Timing reopening. Rocket Grunt Temporary Steal Tokens are offered only inside this procedure while the player still holds Rocket Grunt. This is not ordinary post-Battle-Payout Control Timing.

Conceptually, the Referee consumes ordered offer records containing a boundary, source, offered player, mandatory/optional status, choices, priority order, and completion status. The future queue must support structured menus, Skip, nested response windows, and automatic continuation; this pass documents that contract without implementing the queue.

## Player-Facing Screens

Every normal screen follows Situation + Choices. Completed forms do not remain stacked beneath the current screen.

Typical Play situations:

- `Action Phase - Steevee is taking an Action.`
- `Steevee used Restrict on Gold's Grovyle.`
- `Gold used Immunity in response to Restrict.`
- `Waiting for Gold.`
- `Spin the Legacy Wheel for Gold.`

Typical choices:

- Current action: `Visit Location`, `Use Effect`, `Trade`.
- Current response priority: `Respond`, `Pass`, `Trade`.
- Waiting player: no gameplay decision controls.
- Manual resolution: a specific action such as `Record Result`.
- Navigation: visible `Back` and `Cancel` actions appropriate to the current submenu.

Effects, Tokens, Classes, Perks, Items, Pokemon, Trade, History, and Host are choices or submenus. They are never the default opening screen.

## Effect Declaration

The standard path is:

`Current Situation -> Use Effect -> Source -> Effect -> Required Choices -> Target -> Confirm`

Known information should shorten the path. Each click replaces the current content.

Confirmation must summarize the declaration in player-facing terms. Under the current implementation policy, declaration is the commit point for a normal Token's costs:

During an open pre-destination Action window, the quick path is shorter:

`Control Timing Open -> Declare Effect -> Exact Owned Effect -> Provisional Claim -> Required Choices -> Confirm`

The provisional claim immediately pauses the Action destination and persists the declarer, exact inventory record, interrupted Action, and draft selections. It does not consume, mutate, or open response priority. The declarer sees the target/choice screen after collapse or refresh; the interrupted actor and other players see who is declaring what. `Withdraw Declaration` returns to the same Action decision, while final confirmation transitions the existing situation into the normal confirmed activation and response chain.

1. Validate ownership and declaration timing.
2. Validate required choices and target shape.
3. Consume the Token exactly once.
4. Record the declaration and consumption idempotency key.
5. If no response timing exists, proceed directly to resolution.
6. If response timing exists, create the pending situation and initialize priority.

Declaration cost and effect resolution are separate in the current implementation. Whether every distinct negation, cancellation, rejection, block, or no-effect result leaves consumption unchanged still needs a complete Token-lifecycle ruling.

An erroneous host/test declaration may be repaired with an explicit restore operation in Advanced / Repair Controls. That is repair, not normal cancellation behavior.

## Ordered Response Priority

Priority uses previous Gym standings order unless an effect explicitly overrides it.

### Targeted Effect

For an effect targeting a player, owned Pokemon, or that player's possessions:

1. The targeted player receives first priority.
2. Continue through previous Gym standings order from that player.
3. Skip players who are not eligible for this prompt.

### Non-Targeted Effect

For an effect with no single targeted player:

1. Begin with the next eligible player after the effect user in previous Gym standings order.
2. Continue through that order.

The effect user does not receive a special immediate interrupt when their effect is challenged. They may respond when normal priority reaches them.

Future Effect Priority rules may provide an explicit priority override. First-come-first-served is never the fallback.

## Per-Prompt Priority State

Each pending effect needs independent state conceptually equivalent to:

```js
{
  id: "situation-id",
  parentSituationId: "parent-id-or-empty",
  rootEventId: "interaction-event-id",
  status: "declared | responding | resolving | manual | resolved | canceled",
  actorPlayerId: "player-id",
  targetPlayerId: "player-id-or-empty",
  responseEligible: true,
  eligiblePlayerIds: [],
  priorityOrderPlayerIds: [],
  priorityIndex: 0,
  currentPriorityPlayerId: "player-id-or-empty",
  passedPlayerIds: [],
  responseIds: [],
  pausedByChildSituationId: "child-id-or-empty",
  resolutionMode: "automatic | manual | hybrid | auditOnly",
  declarationConsumptionId: "consumption-id-or-empty",
  resolutionId: "resolution-id-or-empty",
  mandatoryFollowUpIds: []
}
```

Exact property names may follow current code conventions. The required behavior is more important than the names.

`eligiblePlayerIds` describes who can legally participate. `priorityOrderPlayerIds` describes the order in which those players are offered the decision. `currentPriorityPlayerId` is the only ordinary player allowed to choose Respond or Pass.

## Pass

Pass always applies to the current pending effect.

On Pass:

1. Record the current priority player's pass against the current situation.
2. Advance to the next eligible player in this situation's priority order.
3. If no eligible player remains, close this situation's response cycle and begin resolution.

The player-facing button says `Pass`. The Referee already knows which situation is current.

## Response

On a legal response:

1. Declare and pay the response's costs.
2. Record that the current priority position acted against the parent.
3. Pause the parent with its cursor positioned after that responder.
4. Create the response as a child pending situation.
5. Calculate a fresh eligible set and priority order for the child.
6. Make the child the current situation.

A pass or response against one situation never counts against a newly created child situation.

The original actor may respond to an effect used against their effect when the child's normal priority reaches them and they have a legal response.

## Parent Pause And Resume

When the latest child resolves:

1. Inspect the child's result.
2. Run mandatory follow-ups created by that resolution.
3. If the child canceled or negated its parent, cancel the parent without applying its resolution.
4. Otherwise return to the parent.
5. Resume the parent's saved priority cursor after the response position that created the child.

Returning to an unchanged parent does not clear passes, replay earlier priority positions, or create a fresh response cycle. A parent only gets a new timing point if an effect materially revises it and its rules explicitly create one.

The normal UI may show a compact trail such as `Restrict -> Immunity`, but players do not manage or select stack entries.

## Redirect Resolution Contract

Live Referee must evaluate redirection by mechanism rather than through one generic redirect flag:

- **Magician** replaces exactly one chosen gameplay target with a different target legal under the original effect contract. Multi-target effects retain every other selected target.
- **Follow Me** replaces one corresponding target with its user or one of that user's legal Pokemon, preserves unaffected targets, and after parent resolution should create the approved Gym-long Copy relationship. That Copy relationship is not implemented, so Live Referee must block activation before consumption or redirect.
- **Smokescreen** preserves every original target and adds one legal corresponding target through the wheel result. It is not an ordinary redirect. The added directly affected player must receive response priority before parent resolution. Until that additive flow exists, Live Referee must block activation and never fall back to target replacement.

No replacement redirect may alter target type, controller restrictions, target count, costs, source player, or effect text. Smokescreen is the explicit added-target model: original targets remain, total affected target count increases by one, and source/cost/text remain unchanged. After a replacement or addition, the parent prompt must be revalidated and direct-target response priority rebuilt for newly directly affected players.

Runtime usability is independent from implementation status. Token selection, legacy activation controls, declaration creation, response recording, automatic prompt advancement, manual finalization, and reload continuation must all fail closed when an effect is `developmentOnly` or `blocked`. A blocked prompt cannot be marked resolved, cancel its parent, or consume inventory. Existing blocked prompts remain open for cancellation or Advanced Repair.

The current runtime does not execute this policy yet. Until a dedicated redirect resolver is implemented and verified, the legacy generic redirect gate remains disabled.

## Resolution

### Automatic

When an automatic effect's priority cycle closes:

1. Mark the situation resolving.
2. Revalidate any conditions that must still be true at resolution.
3. Apply the state mutation exactly once using a resolution idempotency key.
4. Create the appropriate log and ledger entries exactly once.
5. Mark the situation resolved.
6. Check mandatory follow-ups.
7. Resume or cancel the parent, or return to Play.

There is no generic Finalize step in ordinary automatic play.

### Manual

When a manual effect reaches resolution, set a specific manual task as the current situation. For example:

`Legacy Ticket resolving - Spin the Legacy Wheel for Gold.`

The only completion control should name the task, such as `Record Result`. Completing that task records its result, completes resolution, checks follow-ups, and continues chronology.

### Hybrid

Hybrid effects divide their resolver into explicit automatic and manual steps. The Referee advances through those steps rather than exposing a generic finalization control.

### Repair

Advanced / Repair Controls may force-resolve, cancel, restore a mistakenly consumed resource, remove an erroneous response, or repair a priority cursor. These controls must be explicit, audited, and visually separated from normal play.

## Mandatory Follow-Ups

After every individual resolution, check mandatory Class, Perk, Token, location, and system triggers before resuming the parent or normal Play.

A follow-up becomes the current situation when input or response timing is required. A mandatory automatic follow-up with no meaningful response timing may resolve immediately. Follow-ups must never be hidden only in log text.

## Legal Effect Surfacing

The Respond screen should derive choices from:

- Controlled player.
- Current phase and phase substep.
- Current pending situation.
- Effect timing category and timing windows.
- Target type and target scope.
- Ownership, quantity, and declaration costs.
- Active and lingering effects.
- Class, Perk, Item, Pokemon, and manual permissions.
- Explicit priority overrides or exclusions.

The ordinary list prioritizes effects that are legal now. Unavailable effects may exist in a secondary inspection view, but they must not appear as equal choices beside legal responses.

Live Referee must use the controlled player from the normal profile/testing context. It should not add a player dropdown to ordinary gameplay.

## Trade Invariant

Trade may be opened anywhere trading is legal, including during a pending response decision.

Before opening Trade, preserve:

- Current situation id.
- Current priority player id.
- Current screen return path.

Completing or canceling Trade returns to the exact same situation and priority. Trade does not add a pass, add a response, advance priority, or resolve an effect.

Supported ownership transfer may include money, Pokemon, Items, TMs, Tokens, and recorded promises according to the Trade system's own validation.

## Chronology Guard

Normal timeline mutations must ask the gameplay controller whether the current situation is complete. This includes Action completion/advance, phase changes, encounter acceptance, Team Lock progression, Battle substeps, battle reporting, and major rewards.

Navigation, inspection, Trade, legal response declaration, Pass, manual-task completion, and Advanced / Repair access remain available as appropriate.

The guard should depend on controller state, not scattered text checks or the presence of a particular overlay screen.

## Current Implementation Gap Map

Priority Engine v1 is now implemented for the current alpha interaction model:

- Each root/response prompt persists a frozen `promptPriority` record.
- Previous Gym placement order seeds response priority, with defensive fallbacks for Gym 1 and older saves.
- Targeted prompts begin with the target; non-targeted prompts begin after the actor.
- Only the current priority player can use ordinary Respond or Pass controls.
- Pass advances automatically, while a response creates a fresh child priority cycle and leaves the parent cursor saved after the responder.
- Free Testing Mode automatically controls the current priority player so one tester can run the whole table.
- Trade leaves the prompt and priority record unchanged.
- Each prompt now persists independent open/resolved/canceled resolution state.
- Resolving a child resumes its parent at the saved cursor; a resolved Immunity cancels only its direct parent.
- Countering Immunity returns to the grandparent prompt instead of incorrectly canceling the whole root event.
- Restrict and Immunity are the first automatic prompt resolvers.
- Current implementation keeps declared Tokens consumed after ordinary cancellation/negation; final Token lifecycle semantics still need a ruling. Explicit Advanced Repair may restore mistaken use as a separate audited operation.
- Each resolved prompt now queues one persistent result announcement before the Referee resumes the parent or normal Play screen.
- Automatic resolvers can provide concrete outcome copy, while manual effects use a compact `Record Result` task so the host can announce what actually changed.
- A result announcement exposes only the outcome and `Continue` / `History`; acknowledging it does not alter the saved priority cursor underneath.

Whole-event Finalize remains a compatibility/repair control for automatic host overrides. Unknown response and root effects use the named `Record Result` task until their individual resolver is implemented.

Useful current pieces to retain:

- Persistent floating/resizable Live Referee shell.
- Situation + Choices screen renderer and submenu navigation.
- Current controlled-player context and Free Testing Mode integration.
- Token inventory grouping, effect source menu, target buckets, and confirmation screens.
- Root interaction events, response records, current prompt derivation, and compact chain display.
- Pass records scoped to a prompt.
- Trade records linked to the current prompt.
- Global pending-event guards.
- History, logs, and Advanced / Repair Controls.

Remaining behavior that must change:

- Response eligibility must come from effect timing data; not every event should ask every player.
- Automatic resolution must expand beyond Restrict and Immunity.
- Manual effects still need effect-specific task screens beyond the generic short result capture.
- Current declaration-time Token consumption must remain idempotent while final lifecycle distinctions await ruling.
- Trade must be available from normal Play where legal, not only inside pending windows.
- Waiting players must see a waiting screen rather than responder controls.
- Mandatory follow-up scheduling must run between child resolution and parent resume.
- Legal effect filtering must become precise enough that irrelevant Tokens are not equal choices.

## Recommended Implementation Order

1. Add normalized per-prompt priority state and a previous-Gym standings order helper.
2. Derive the single current priority player for targeted and non-targeted prompts.
3. Change Pass to advance the current prompt cursor automatically.
4. Change response declaration to pause the parent cursor and initialize a fresh child cycle.
5. Add one-prompt resolution with parent resume/cancel behavior.
6. Replace ordinary generic Finalize with automatic resolution and named manual tasks.
7. Keep current declaration consumption idempotent, then implement the final lifecycle ruling without collapsing distinct outcomes into generic cancellation.
8. Preserve Trade situation/priority and expose Trade from eligible normal Play states.
9. Add mandatory follow-up scheduling.
10. Audit every Token's response eligibility, target metadata, resolution mode, and resolver.
11. Expand the same metadata contract to Classes, Perks, Items, Pokemon, and locations.

Each stage should migrate old saves defensively and keep Advanced / Repair Controls usable.

## Required Validation Scenarios

- Targeted effect gives the target first priority.
- Non-targeted effect begins after its user in standings order.
- Pass advances exactly one eligible priority position.
- Ineligible players are skipped without being asked.
- Response consumes its Token on declaration and creates a fresh child cycle.
- A player who passed on the parent may act on the child.
- Parent cursor resumes after the responder when a child resolves without canceling it.
- Under current implementation policy, a negating child cancels the parent without automatically refunding either declared Token; final lifecycle behavior needs ruling.
- Automatic effect applies and logs exactly once.
- Manual effect pauses on a named task and resumes after the result is recorded.
- Trade completes and returns to the same situation and priority.
- Mandatory follow-up runs before parent resume.
- Timeline controls remain blocked until all current situations complete.
- Reload preserves current situation, priority cursor, consumption, and resolution state.
- Advanced repair is audited and does not duplicate logs, consumption, or state mutation.
