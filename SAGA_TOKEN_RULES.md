> **Authority: CANONICAL SUBSYSTEM RULES**
> This document governs current Token timing and interaction semantics under `RULEBOOK.md`.

# Rival Saga Token Rules

This document is the current human-authored Saga design authority for Token timing and interaction semantics.

Implementation files have separate responsibilities:

- `SAGA_TOKEN_RULES.md` defines approved Saga rules and identifies unresolved design questions.
- `token-effect-contract.js` is the executable Token declaration contract.
- `TOKEN_EFFECT_MATRIX.md` is generated documentation derived from the declaration contract.
- `app.js` contains the current runtime resolvers and state mutations.

Catalog/contract parity does not prove runtime completion. Runtime behavior that contradicts this document is a defect, not an implicit Saga rule change.

## Current Battle Phase Structure

The broader Battle Phase is:

1. Team Building
2. Team Lock
3. Sabotage
4. Team Preview
5. Rival Battle Phase
6. Battle Payout

Scheduled battles occur during the **Rival Battle Phase**. Do not use "Battle Phase" as the name of that specific battle-playing subphase.

Legacy implementation aliases still exist:

| Runtime alias | Current Saga meaning |
|---|---|
| `battlePrep` | A broad implementation window that currently spans Team Building and Team Lock-related preparation. It is not an authoritative Saga timing name. |
| `rivalBattles` | Rival Battle Phase |
| `battleResults` | Legacy result timing. It must be mapped explicitly before use. |
| `battleDataReporting` | Current implementation step associated with reporting and payout work. It is not automatically identical to every End-of-Battle or Battle Payout timing. |

These aliases do not create Saga timing permissions by themselves.

## Start-of-Gym Order

Start of Gym resolves in this order:

1. Expire effects scheduled to end.
2. Resolve mandatory Start-of-Gym effects.
3. Resolve optional Start-of-Gym effects.
4. Open the Gym Start Preparation Control Window.
5. Close that Control window after all players pass consecutively.
6. Begin Action Phase.

The legal timing name for this window is `gymStartPreparationControl`, not `gymStart`. It begins only after Start-of-Gym expiration and trigger processing finish.

Gym Start Preparation uses previous-Gym placement order, or the established initial player order for Gym 1. Priority cycles through that order. A player may declare one legal Control effect or pass; a declaration resolves its full pending event and response chain before priority resumes with the next player. A declaration resets the consecutive-pass chain, and the window closes only when all players pass consecutively without a new declaration.

## Control Timing

Ordinary Control Timing is open whenever no phase-boundary procedure, pending effect, response chain, Action/location operation, or other game operation is currently resolving, unless the current rules explicitly close Control Timing.

- Control Timing cannot be used as a response.
- Known Control contexts include Gym Start Preparation Control, open Action Phase moments, Team Building, Shop Phase, and post-Battle Control after End-of-Battle procedures finish.
- Ordinary Control Timing is closed during Team Lock, Sabotage, Team Preview, Rival Battle Phase, unfinished Battle Payout, and all Start- or End-of-phase procedures. It reopens after Battle Payout reaches its terminal result.
- A phase-specific effect cannot be inserted through ordinary Control Timing.
- Control Timing does not naturally include Sabotage.
- Curse Tokens have an explicit Sabotage Curse window in addition to their normal Control windows. This exception belongs to canonical Curse contracts and does not open Sabotage to ordinary Control effects.
- "Usable during Sabotage" and "causes a Sabotage Revision Window" are separate properties.
- Control legality is a semantic controller state, not merely membership in a broad phase-name list.

**Implementation status:** `ordinaryControlTimingStatus` is the shared semantic gate for idle Action decisions, Team Building, Shopping, and terminal post-Battle Payout Control. It closes for active operations, pending interaction chains, required choices, Team Lock, Sabotage, Team Preview, Rival Battles, and unfinished payout. The server-authoritative provisional Action declaration remains the exact pre-destination race authority. Curse contracts retain the separate `sabotageCurseWindow`; phase-specific permissions never imply ordinary Control Timing. Gym Start Preparation remains its own ordered Control procedure.

### Action Destination Boundary And Provisional Declarations

During an ordinary Action turn, Control Timing remains open while the Action player chooses a destination. The turn beginning does not close it. The destination's authoritative confirmation closes Control Timing immediately, and it stays closed until the complete location operation reaches a terminal state.

Selecting one exact owned legal effect may provisionally claim this open window before its targets and other choices are complete. A provisional claim identifies the effect and declaring player but consumes nothing, mutates nothing, and opens no response chain. The declaring player then completes the effect-specific choices. Final confirmation revalidates the timing, exact inventory record, and all choices before consuming once and opening normal responses and resolution.

Withdrawing an unconfirmed declaration consumes and mutates nothing. It returns play to the same Action player, Action number, and destination decision. A host release has the same state result only as recovery for an abandoned or invalid unconfirmed declaration; it is not gameplay counterplay.

## Phase-Boundary Procedures

Start- and End-of-phase procedures are automatic controller work, not ordinary Control windows or manual phases. Ordinary Control Timing is closed while one is active. Live Referee must surface the current trigger, acting player, legal choices, and Skip for an optional offer, then continue automatically when the procedure is complete.

`endOfActionPhaseProcedure` resolves mandatory End-of-Action effects and then ordered optional offers before Team Building begins.

`endOfBattlePhaseProcedure` resolves in this exact order:

1. Battle Payout resolves.
2. The End-of-Battle Phase procedure opens automatically.
3. Mandatory End-of-Battle effects resolve.
4. Optional End-of-Battle effects are offered in the established applicable player order.
5. Ordinary Control Timing reopens after every required effect and decision finishes.

## Response Timing

Only effects explicitly permitted to respond may enter a response chain.

- A normal Control Timing effect cannot be used inside a response chain.
- For a targeted effect, the targeted player receives first response priority.
- Remaining priority follows previous-Gym standings order.
- For a non-targeted effect, priority begins with the next eligible player after the acting player under the established ordering.
- Nested response chains must maintain deterministic priority.
- Redirecting a target may require response priority to be recalculated for the new target.
- Response compatibility declarations such as `canRespondTo` must eventually be mechanically enforced, not retained as unused metadata.

## Redirect Policies

Redirectability is mechanism-specific. Magician, Follow Me, and Smokescreen do not share one universal eligibility flag.

Approved Magician wording:

> Once Per Gym, Respond To A Targeted Effect And Change One Chosen Target To Another Legal Corresponding Target. Global All-Player Effects Are Excluded.

Magician may change exactly one chosen gameplay target when a different legal corresponding target exists. The replacement must preserve the original effect's target type, controller restrictions, target count, costs, source player, effect text, and every other selected target. For a multi-target effect, only one selected target changes.

Global/table-wide effects, targetless effects, current-prompt responses, encounter modifiers without a chosen gameplay target, Incinerate, Class Change, Move Deleter, Purge Curse, and Safeguard do not permit Magician. Haze and Foresight permit one selected Pokemon to change, but the replacement remains governed by their unresolved controller relationship. Purge is absolute and cannot be redirected. Ditto transforms its exact inventory record rather than creating a redirected activation.

Follow Me replaces one corresponding target with its user or one of that user's legal Pokemon. It preserves the original effect's source, cost, text, target type, target count, and unaffected targets. Global and targetless effects are ineligible. After the redirected effect resolves, Follow Me creates an Ongoing Effect through the current Gym that records the redirected effect's player. When that player later consumes a real Token, the Follow Me user gains one canonical inventory copy; virtual activations do not trigger the relationship. The relationship expires at Gym end, while copies already earned remain ordinary inventory.

Smokescreen uses replacement redirection. Spin a wheel containing every player exactly once. If the wheel lands on the original targeted player, the original target remains. If it lands on another player who has a legal corresponding target, the Smokescreen user chooses one of those targets and replaces the original target. If that player has no legal corresponding target, the original target remains. Do not reroll. Smokescreen is consumed even when the original target remains. Player targets must remain Player targets and Pokemon targets must remain Pokemon targets.

After any successful replacement, rebuild direct-target response priority for the newly affected player. Eligibility under one mechanism does not imply eligibility under another.

## Revision Windows

Activation timing and revision windows caused by resolution are separate concepts.

### Sabotage Revision Window

Use this window when an effect changes the legality of a submitted Pokemon's set while that Pokemon remains on the submitted team.

Examples include:

- Forced held items
- Silencing
- Imprison
- Move restrictions
- Ability restrictions
- Other legal-set changes

### Team Preview Revision Window

Use this window when post-lock team membership changes.

When a change requires both windows, resolve:

1. Team Preview Revision Window
2. Sabotage Revision Window

## Sneak Peek

Approved Perk text:

> You May Use Curses During Team Preview.

Sneak Peek grants a special Team Preview timing permission for Curses. It does not permanently add Team Preview timing to every Curse.

**Missing implementation:** the current engine does not contain this permission-grant system.

## Token Consumption Baseline

Tokens are single-use consumables unless an exact Token contract defines a different inventory lifecycle.

The exact consumption behavior for these outcomes is not yet fully approved:

- Withdrawal before declaration
- Illegal declaration
- Negation
- Protection block
- No legal effect at resolution
- Host rejection
- Administrative cancellation
- Guided UI closure

One generic "canceled" result must not be presented as a settled rule for all of these outcomes. The current consumption implementation remains provisional until the lifecycle distinctions are approved.

## Mechanical Effect Tags

The future Token contract needs formal mechanical tags. Tags must not be inferred solely from display text.

Known required tags include:

- Steal
- Destroy
- Copy
- Negate
- Suppress
- Add Target
- Replace Text
- Cooldown
- Restrict
- Immunity
- Delay
- Redirect
- Curse
- Global
- Protection

## Selected Target And Application Scope

An effect declaration records what the player selected separately from everything the resolved effect affects.

The selected target may be one roster instance, one Pokemon species, one player, one submitted team, or a validated collection. The application scope may be one roster instance, selected roster instances, submitted-team instances, one player's roster, one species globally, one or all players, or the whole table.

Persistent effect records must preserve exact affected and excluded roster-instance IDs where needed. A species-wide effect can therefore remain active while one exact owned copy is exempt. Universal Restrict and Ban effects use a global species scope. Future effects such as New Tricks may use exact submitted-team roster instances without affecting another copy of the same species. New Tricks itself is not implemented by this rule entry.

Standard Pokemon-name Curses use one exact Active Roster instance as their declaration anchor, then apply to every matching Active Roster instance owned by every player. Arena Trap Curse immunity and Substitute are checked independently for each matching instance. Protected instances remain exact exclusions while the broader species effect continues. If every matching instance is protected, the Curse resolves with no affected Pokemon. Knock Off remains exact-instance targeting and Purge targets one player rather than a Pokemon species.

## Sticky Hold

Sticky Hold grants blanket immunity to all **Steal** effects involving:

- Pokemon
- Money
- Items
- TMs
- Tokens

Sticky Hold must check a formal Steal tag. It must not rely on Token names or the word "steal" in display text.

**Current implementation:** the verified Pokemon-targeting Steal Token checks the formal Steal tag and rejects a publicly protected target before confirmation or consumption. Future Steal operations involving money, Items, TMs, or Tokens must reuse this protection boundary when those operations are implemented.

## Safeguard

Current approved wording:

> Your Money And Tokens Cannot Be Stolen, Destroyed, Or Copied. You Are Unaffected By Follow Me And Embargo.

Safeguard creates one exact-player status through the normal proactive response lifecycle. Its executable protected-category matrix is limited to money steal/destroy/copy, Token steal/destroy/copy, Follow Me, and Embargo. It does not protect Item or TM theft/destruction, Pokemon transfer, forced declaration payments, or Counterspell restoration. Protection is checked against the target player before irreversible mutation. The status persists through refresh, expires at the approved Gym boundary, and supports causal History undo.

## Copy

Ordinary Copy effects create a new activation, not a copied inventory item. The copied activation records its source and Copy mode, makes fresh targets and choices unless its effect explicitly says otherwise, pays explicit activation costs unless waived, and cannot itself be copied. Copy does not consume the original Token or a nonexistent copied inventory record.

After You, Follow Me, Ditto, and Trainer Class Copy effects each use their own trigger and lifetime; their effect-specific contracts must not be collapsed into one generic Copy rule. After You creates a non-inventory copied activation for its supported interactions. Follow Me grants a canonical inventory copy after a qualifying later consumption. Ditto transforms its exact owned record into the chosen canonical activatable non-Ditto Token without activating it.

7 Tools Of The Bandit is the explicit exception. Immediately after a Protection Token activates, it negates that Protection Token and creates one temporary inventory copy for the 7 Tools user. The copy follows the copied Token's normal timing, targeting, and effect rules and expires unused at End of Gym. Exact temporary copied inventory, Gym-end expiration, and Safeguard Copy protection are implemented for this Token-specific model.

## Ongoing Effect Catalog Additions

### Lingering Aroma

> When A Player Has An Ongoing Effect In Play, Use This Token. Replace That Effect's Text With 'Players Who Target Me Gain 500' Until That Effect Ends.

Lingering Aroma may target only a record explicitly marked `isOngoingEffect`. Duration alone does not qualify a record. It keeps the original effect record, source, owner, duration, expiration, identity, and original text, then records a linked active-text replacement that ends with the original effect. Passive effects, ordinary statuses, protections, and permanent rules are not eligible unless their own contract explicitly classifies them as ongoing.

### Cold Wave

> When Activated, Suppress All Ongoing Activated Effects Until The End Of This Gym. Suppressed Effects Have No Effect Until This Gym Ends, Then Return To Normal.

Cold Wave suppresses every record explicitly marked `isOngoingEffect` through Gym end. Suppression is table-wide but is not removal, negation, expiration, replacement, cancellation, revival, or rescheduling. Suppressed records remain present with their relationships and duration clocks. Surviving effects resume at Gym end; effects that naturally expire while suppressed remain expired. Duration alone does not make an effect ongoing.

## Protection Catalog Additions

### Counterspell

> When One Of Your Tokens Is Negated, Use This Token. The Negated Token Is Not Consumed. That Token Cannot Be Used Again Until 2 Gyms Have Passed.

Counterspell only responds to a Token owned and activated by its user that has been negated. The original activation remains negated and does not resolve. Restore that exact Token inventory record, keep it visible but unusable until the matching phase two Gyms later, and preserve the declaration/negation/response/restoration relationship. This is a specific consumption exception, not the universal negation rule. Exact inventory cooldown behavior is implemented for Counterspell only.

### 7 Tools Of The Bandit

> When A Player Activates A Protection Token, Use This Token Immediately After. Negate That Protection Token, Then Copy It. The Copied Token Must Be Used During This Gym Or It Is Lost.

Negation and temporary copy creation are atomic. The copied Token retains the exact source definition, uses normal timing/targeting rules, remains available through its creation Gym, and expires unused when the next Gym begins. Safeguard prevents the copy before 7 Tools is consumed. Creation, use, display, expiration, reload, and undo use the shared exact-inventory lifecycle; failure cancels and refunds 7 Tools without negating the Protection Token.

## Foresight Curse Privacy

Foresight Curse selects exactly six Pokemon. A selected Pokemon brought to that Battle Phase reveals its set only to the Foresight Curse user. This is private visibility data, not a Nerf/Debuff, and Clear Smog or generic Nerf removal cannot remove it. The authorized viewer is the source player; every other player is unauthorized, while host access requires a separate administrative authorization policy. Client-side hiding is not authorization. Player-scoped delivery is not implemented, so activation is blocked and shared backend payloads strip structured Foresight set fields rather than delivering them to any player.

## Runtime Usability

Implementation progress and gameplay usability are separate fields. `partial`, `textOnly`, `blockedByRuling`, and `verifiedComplete` describe implementation evidence. `usable`, `guidedOnly`, `developmentOnly`, and `blocked` govern whether gameplay controls may begin a declaration.

Gameplay activation and prompt resolution fail closed for `developmentOnly` and `blocked` effects. A blocked attempt must not consume its Token, create a pending event, mutate a parent target, negate another effect, or close an existing prompt as successfully resolved. `guidedOnly` permits only the declared Guided flow; it does not prove the underlying mechanic complete.

## Rocket Grunt Temporary Steal Tokens

- They mechanically count as Steal Tokens.
- They use ordinary Steal rules and counterplay.
- Rocket Grunt gains 2 when obtaining the class.
- Rocket Grunt gains 1 when winning a Gym.
- Temporary Steal Tokens may be used only At End of Battle Phase, immediately after Battle Payout resolves and before ordinary Control Timing reopens, while the player still holds Rocket Grunt.
- When multiple players have eligible End-of-Battle optional effects, their offers resolve deterministically in the established applicable player order.
- Live Referee opens and completes these offers automatically; the host does not manually create a separate timing window.
- All unused Temporary Steal Tokens expire when Rocket Grunt is lost.
- They do not require a separate incompatible Steal effect type.

**Missing contract support:** source-linked temporary inventory, class-ownership requirements, End-of-Battle offer records, and expiration when a class is lost.

## Honey

Approved broad timing:

> At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter.

Honey is an optional `endOfActionPhaseProcedure` trigger, not an `encounterResult` response. Live Referee gathers exact finalized Encounter-result records, shows each eligible result, and lets the eligible player choose one or Skip before Team Building. The procedure is non-respondable.

Honey creates one acquisition-ready copy with a fresh stable result identity. It preserves the finalized species, form, Battle Tier, level, and intrinsic rolled properties only. It does not copy ownership, acquired or terminal state, the original session identity, transfer state, reroll History, consumed modifiers, bonuses, Items, UI state, or stale references. The copy enters the normal acquisition flow and cannot recursively become a Honey source.

## Teleport And Delay

Teleport stores the parent effect and its original declaration-phase anchor, then returns it at the matching phase. On return, revalidate the effect and every exact target.

- Gameplay illegality or a stale gameplay target produces no effect. Teleport and the delayed effect remain consumed; there is no retarget or refund.
- Corrupt state, an unsupported resolver, or another system failure cancels safely and requires refund.
- A successful return resolves with the actual return phase as its duration/resolution anchor.
- Delay is not free-text postponement and cannot recreate a closed one-time timing that has no legal matching return.

The delayed-effect record, production phase-return scheduler, deterministic Live Referee continuation, revalidation classification, idempotency, and refund/no-effect split are implemented for exact root Token events handled by the Control controller. Nested response effects and effects without a safe Control-controller return path remain unavailable before consumption.

## Move Deleter

Move Deleter uses ordinary Control Timing and selects one exact canonical move. That move is globally unavailable during the next Gym. Teambuilder selection, import/export, validation, and generated sets must reject the move while the restriction is active. The restriction expires after that next Gym and does not affect the declaration Gym.

## Restrict, Extra Ban, And Unban

Restrict selects one canonical Pokemon species and creates a six-Gym global species restriction. Canonical normalization covers display casing, punctuation, symbols, and registered form aliases. Every authoritative team-legality surface enforces it, except that an active Rage Candy Bar grants immunity only to its exact roster instance. Restrict expires once at the start-of-Gym duration checkpoint.

Extra Ban selects one exact Active-roster anchor and creates an indefinite global species Ban. Substitute is checked only on that selected anchor. A valid Substitute there negates the entire Ban and creates current-phase repeat-Ban protection; a Substitute on another matching instance is neither inspected nor consumed.

Unban selects one exact active Ban or Restrict record, removes only that record, and creates six-Gym Ban/Restrict protection for the canonical species. Ambiguous or stale status choices fail before consumption. Undo restores the selected record with its original expiration metadata and does not change unrelated restriction schedules.

## Clear Smog

Clear Smog permanently removes clearable structured buffs, approved temporary Ability grants, and exact-instance move-access grants from one exact Active-roster Pokemon. Removal is provenance-based. It does not infer removals from visible set differences, alter native moves or Abilities, revive expired records, suppress effects for later restoration, or erase unrelated labels and build fields.

## Revenge

Revenge is offered after payout and before ordinary Control Timing. Eligibility reads the immutable brought-team snapshot from the completed Battle Phase. The Revenge user chooses exactly two exact Pokemon from the qualifying offender's snapshot to release, then may destroy at most one eligible exactly referenced held Item from those two. Master Ball is protected. Never guess an inventory record by matching an Item name. The production post-payout procedure persists its required choice through refresh, consumes only on valid confirmation, resolves atomically, and supports exact History undo. Declining consumes nothing.

## Rage Candy Bar

Rage Candy Bar:

- Targets one Pokemon roster instance owned by the Token's user.
- Increases the chosen Pokemon's level by 3.
- Increases its EV cap by 252.
- Makes it immune to Restricts for 2 Gyms.

These are one composite timed enhancement. The level bonus, EV-cap bonus, and Restrict immunity share the same duration and expire together.

Using Rage Candy Bar again on the same roster instance extends the shared duration by 2 Gyms. It does not stack another +3 Levels or +252 EV cap.

Restrict still creates a species-wide restriction. A Rage Candy Bar-protected roster instance of that species remains legal to bring while its temporary immunity is active.

When Restrict would affect an instance with both Rage Candy immunity and Substitute, check Rage Candy immunity first. The immune instance is exempt and its Substitute is not consumed.

The universal convention for whether the current Gym counts toward a multi-Gym duration is not yet approved.

## Substitute

Substitute attaches to one specific owned roster instance and protects it from the next effect that would affect it.

After the response chain resolves but before the parent effect mutates state:

- Consume the attached Substitute.
- Exempt that exact roster instance from the incoming effect.
- Continue the broader effect against every other legal target.
- Preserve the exact exemption for the full duration of a species-wide lingering effect.

Ban is the exception. Extra Ban selects one roster instance as its declaration anchor, then applies to that Pokemon's species globally if it resolves. Substitute checks only the selected roster instance. If that selected instance has Substitute, consume only its Substitute, negate the entire Ban, do not create the global Ban, and protect that species from another Ban during the current phase. Substitute attachments on every other matching roster instance remain untouched.

A future species-wide Ban that has no selected roster-instance anchor does not automatically inspect or consume every matching Substitute. That effect requires its own explicit interception rule.

The exact ordinary Token-consumption outcome when Substitute blocks an effect and the approved multi-Gym counting convention remain provisional.

## Roid Rage

Roid Rage uses normal Control Timing. Once every 2 Gyms, it directly uses a Rage Candy Bar Token on a Pokemon. It does not merely equip an Item or create a generic buff.

## Purge Curse

Purge targets one player. It records that player's immutable brought-team snapshot and releases every exact Pokemon in that snapshot after Gym payout and before ordinary Control Timing reopens.

Purge is absolute: it cannot be responded to, negated, redirected, or protected against and ignores Substitute, Curse Immunity, and other gameplay prevention. Resolution is atomic and idempotent. A system failure restores the exact pre-resolution state and refunds once; ordinary gameplay cannot use that recovery path as counterplay.

## Current Completion Status

- All 45 catalog Token IDs have declaration-contract coverage.
- The generated Token matrix matches the declarative contract.
- Response-priority infrastructure is partially functional.
- Many Automatic and Guided Token resolvers do not perform their complete Saga effects.
- Thirty Tokens are verified complete. Cold Wave, Wicked Blow, Teleport, Reroll, Honey, and Purge Curse are the current lifecycle-completion slice.
- Protection remains category-specific. Sticky Hold covers formal Steal effects; Safeguard covers only its eight approved operation categories.
- The declarative contract and Live Referee share the corrected ordinary Control Timing model for pre-Gym preparation, Action decisions, Team Building, Shopping, and completed Battle Payout. Active procedures and unresolved choices remain closed.
- Teleport is `verifiedComplete` for exact root Control-controller Token events; unsupported nested or non-Token parents still fail closed before consumption. Many Guided Tokens remain incomplete.
- The Token system is under active implementation and is not functionally complete.
