> **Authority: IMPLEMENTATION ARCHITECTURE**
> This document plans resolver implementation. Canonical rules come from `RULEBOOK.md` and its linked modules.

# Rival Saga Effect Resolution Architecture

> `LIVE_REFEREE_GAMEPLAY_CONTROLLER.md` governs ordered response priority, per-prompt resolution, parent pause/resume, and mandatory follow-ups. `SAGA_TOKEN_RULES.md` governs unresolved Token lifecycle questions. Declaration-time consumption and ordinary non-refund are current implementation policy, not final universal Saga law.

This document defines the target model for resolving effects in Rival Saga. Prompt Resolution v1 persists per-prompt resolution state, resumes parent priority after a child resolves, and keeps normal declaration costs consumed. Restrict and Immunity have partial resolver paths, but neither is labeled Verified Complete without an effect-specific end-to-end test. Other effect resolvers remain architecture/planning work unless their sections explicitly include verification evidence.

The Live Referee already has a usable prompt-chain model: a pending event opens a response window, responses can become the current prompt, passes are scoped to that prompt, and transactions can happen without counting as responses. The next layer is effect resolution: what happens when the current prompt or root event is finalized.

The goal is to give tokens, trainer class effects, perks, items, TMs, Pokemon effects, curses, encounter modifiers, transactions, and manual host events the same vocabulary before the app tries to automate them.

## 1. Timing Categories

Timing category describes when an effect can be declared and whether it creates or depends on a pending event.

| Timing Category | Meaning | Pending Event Relationship |
| --- | --- | --- |
| Proactive Activation | A player declares an effect before it has resolved, often to affect another player, Pokemon, roster, token, or table state. | Usually creates a pending event and opens a response window. |
| Response | A player answers a current pending prompt with protection, redirect, negate, cleanse, prevention, or another legal response. | Requires an open pending event. The response may create the next current prompt in the same window. |
| Encounter Modifier | An effect used while an encounter roll/result is pending or before an encounter is finalized. | Usually requires an encounter-result pending window or creates one around the result. |
| Curse / Team Lock | A dangerous condition or battle restriction, often most relevant after teams lock and before/through battle. | Usually creates a pending event, then applies a lingering/manual battle condition if it resolves. |
| Battle Submission | An effect or rule check around submitted teams, chosen Pokemon, legality, or hidden/revealed battle choices. | May create a pending event before battle teams become final. |
| Battle Phase | An effect that modifies battle scheduling, battle state, battle results, or post-battle consequences. | May create a pending event if players can respond before the battle state changes. |
| End Phase / Reward | An effect that triggers after battles, gym results, salary, quests, standings, or rewards. | May be automatic, manual, or audit-only depending on the reward. |
| End of Gym Check / Pre-Gym Resolution | A condition is checked at the end of one Gym, but its actual choice/application happens before the next Gym's Action Phase. | The end-of-gym check may enqueue a start-of-next-gym effect; Pre-Gym resolution then creates pending events and response/payment windows as needed. |
| Passive Trigger | An effect that triggers because a condition becomes true, such as being targeted, losing, winning, releasing, or completing a quest. | May create a pending event when players can respond, otherwise may resolve as an automatic confirmed event. |
| Manual Host Event | A host-created ruling or repair window when no dedicated app button exists yet. | Usually creates a pending event with Manual Required or Audit Only resolution. |

Timing category is separate from phase. For example, a Response can happen during Action Phase, Battle Phase, Team Lock, or an encounter result window. Phase tells where the table is; timing category tells why an effect is legal now.

Current compatibility note: token timing already uses broad categories such as Control, Protection, Encounter, and Curse. Those map into this resolution model but should not be the only categories forever.

Open timing windows should be named separately from phases so class effects are not accidentally Action Phase locked. Current/prepared window names include:

| Timing Window | Meaning |
| --- | --- |
| `actionOpen` | Ordinary open Action Phase control timing. |
| `shopOpen` | Shop Phase open timing for already-owned legal effects. Purchases from the current Shop Phase are not usable until purchases become official unless a rule says otherwise. |
| `teamBuilding` | Private Team Builder prep timing. This is a prep surface, not a separate `currentPhase` value. |
| `battlePrep` | Battle Phase prep before battles begin, especially Team Preparation and Team Submission / Lock before reveal. |
| `sabotage` | Locked-team, pre-Team Preview timing. |
| `teamPreview` | Team Preview or later revealed battle timing. |
| `responseWindow` | A pending prompt is open and response effects may be legal. |
| `manualHost` | Host-created or repair timing. |

Control-style activations can opt into several of these open windows. They are proactive activations, not responses, unless their own rules explicitly say they can be used as a response.

## 2. Pre-Gym Phase / Start-of-Gym Resolution

Rival Saga needs a Pre-Gym Phase for effects that are checked at the end of one Gym but resolve at the start of the next Gym. This phase should run before the next Gym's Action Phase begins, before normal Action Phase turn order or location choices can advance the table.

The intended flow is:

1. End of Gym: evaluate condition checks.
2. If a condition creates a future effect, enqueue a start-of-next-gym effect record.
3. Start next Gym: enter Pre-Gym Resolution before Action Phase.
4. Resolve queued effects in a clear order.
5. Each queued effect may create a Live Referee pending event and response/transaction window.
6. Once all required Pre-Gym effects resolve, Action Phase can begin.

Queued Pre-Gym effects should be explicit state, not hidden log text. A future shape could be:

```js
{
  id: "pregym-effect-...",
  sourceType: "trainerClass",
  sourcePlayerId: "player-1",
  sourceEffectId: "professor-no-release-fallback",
  timingCategory: "endOfGymCheckPreGymResolution",
  checkedSeries: 1,
  checkedGym: 2,
  resolveSeries: 1,
  resolveGym: 3,
  status: "queued",
  targetType: "pokemon",
  targetScope: "rosterInstance",
  createsPendingEvent: true,
  opensResponseWindow: true,
  requiresPreGymPhase: true,
  resolutionMode: "hybrid",
  manualInstructions: "If the payment option is declined, manually create/copy the selected Pokemon until roster-copy automation exists."
}
```

The queued record is the bridge between the prior Gym's condition check and the next Gym's live resolution. It should keep enough source and timing data to explain why the effect exists after a reload.

### Professor: No Release Fallback

Professor is the first known example.

Condition check:

- At End of Gym, check whether any Pokemon were released during that Gym.
- If no releases happened, create a queued start-of-next-gym Professor effect.

Pre-Gym resolution:

- Before Action Phase starts, Professor chooses one Pokemon in a player's party to copy.
- The targeted player may pay Professor $2,000 to negate the copy.
- If payment is made, transfer $2,000 to Professor, mark the copy effect negated, and create no copy.
- If payment is not made, Professor receives/copies the selected Pokemon.
- Copy application can remain Manual Required until roster-copy automation exists.

Important targeting note:

- This targets one owned Pokemon in a player's party.
- It does not target a Pokemon species/name.
- Use `targetType: "pokemon"` and `targetScope: "rosterInstance"`.

Recommended metadata:

```js
{
  id: "professor-no-release-fallback",
  name: "No Release Fallback",
  sourceType: "trainerClass",
  timingCategory: "endOfGymCheckPreGymResolution",
  targetType: "pokemon",
  targetScope: "rosterInstance",
  resolutionMode: "hybrid",
  negationType: "paymentOption",
  negationCost: 2000,
  negationPaidTo: "sourcePlayer",
  createsPendingEvent: true,
  opensResponseWindow: true,
  requiresPreGymPhase: true,
  promptTemplate: "{actor} chose {targetOwner}'s {targetPokemon} for Professor's copy effect.",
  manualInstructions: "If payment is declined, manually create/copy the selected roster Pokemon until roster-copy automation exists."
}
```

The payment option is not a normal player deal. It is a built-in negation choice attached to the pending Professor effect. The money transfer can eventually be Automatic, while the Pokemon copy may remain Manual Required, making the overall resolution Hybrid.

## 3. Source Categories

Source category describes where the effect came from. Source matters for inventory consumption, logs, UI grouping, ownership, undo, and future legality checks.

| Source Category | Meaning |
| --- | --- |
| Token | A purchased, earned, or traded token effect. Usually needs consumption rules. |
| Class | A trainer class ability or class-granted action. Usually owned by a player and may have per-gym limits. |
| Perk | A perk, quest reward, or passive player modifier. May be one-time, passive, or conditional. |
| Item | A usable item from the item shop or player inventory. Usually has inventory and level constraints. |
| TM | A TM or move-teaching resource. Often targets a Pokemon or moveset. |
| Pokemon | An ability, move, roster state, or Pokemon-specific rule effect. |
| Location | An Action Phase location, facility, or gym location reward/effect. |
| Transaction | A deal, trade, promise, or money transfer between players. |
| Manual / Host | A host-created ruling, repair entry, or temporary alpha-only event. |

Source category should be visible in logs and advanced details, but the normal Live Referee UI should usually say the player-facing thing first: "Gold used Immunity" is clearer than "sourceType: token."

## 4. Target Categories

Target category describes what kind of object the effect applies to. It determines which resolver can safely apply the effect.

| Target Category | Examples | Resolver Implication |
| --- | --- | --- |
| Player | A trainer, owner, or account-linked player slot. | Can update money, notifications, status, class counters, or player flags. |
| Pokemon | A single Pokemon record. | Needs roster lookup and may touch moves, ability, level, buffs, nerfs, active/released state, or availability. |
| Team | A submitted battle team. | Needs Battle Phase/team-lock resolver and should respect hidden/revealed status. |
| Party / Roster | Active roster, legacy roster, released list, breeder/dragon facility state. | Needs roster resolver and undo coverage. |
| Encounter Result | A pending random Pokemon/result session. | Needs encounter-session resolver and should not apply after finalization unless explicitly allowed. |
| Token | A token in inventory or a token effect currently pending. | Needs inventory resolver and prompt-chain awareness. |
| Item | A player-owned item or shop item. | Needs inventory/shop resolver. |
| TM | A TM in inventory or shop. | Needs inventory/moveset resolver. |
| Money | Pokedollars or ledger value. | Can usually use money ledger resolver. |
| Class | Trainer class assignment, class ability, or class counter. | Needs class resolver and per-gym/per-series limits. |
| Field | Table-wide condition, gym condition, battle-field modifier, or encounter-wheel state. | Needs field/phase resolver. |
| Battle Result | Battle record, winner, KOs, deaths, differential, salary, or gym outcome. | Needs Battle Phase resolver and confirmed battle event data. |
| Whole Table | Global events, reveal windows, standings, table-wide curses, or all-player effects. | Needs table resolver and clear eligible-player rules. |

An effect can have more than one target category if it is Hybrid. For example, "consume a token automatically, then manually apply a Pokemon effect" targets both Token and Pokemon.

## 5. Resolution Categories

Resolution category describes how much of the effect the app can apply when the event resolves.

| Resolution Mode | Meaning | Example |
| --- | --- | --- |
| Automatic | The app can safely apply the effect to game state. | Completed money transaction updates balances and ledger entries. |
| Manual Required | The pending event resolves, but the host must manually apply the outcome elsewhere. | Move Deleter right now; the app records the window but does not edit moves automatically. |
| Audit Only | The app records the event/deal but does not change gameplay state. | A promised trade, service owed, or non-money transaction note. |
| Hybrid | Some parts apply automatically and other parts remain manual or audit-only. | Token is consumed automatically, but its Pokemon/moveset effect is manual. |

### Automatic

Automatic should only be used when the app has enough information to apply the effect safely and undo/reload behavior is understood. Money transfers are the current best example because they already have ledger support.

Automatic effects should usually:

- validate target existence,
- apply state mutation,
- write log/ledger entries,
- store undo data when practical,
- sync backend state,
- make reload behavior deterministic.

### Manual Required

Manual Required means the event is official once finalized, but a host must still perform the actual game-state cleanup elsewhere. This should be the default for many alpha token effects.

Manual Required effects should:

- clearly tell the host what remains to be done,
- log the pending event and finalization,
- avoid pretending that the game state already changed,
- keep enough prompt-chain history for audit.

### Audit Only

Audit Only means the app records what players agreed to or declared, but no game-state mutation happens. Non-money transaction contents are currently audit-only.

Audit Only effects should:

- be searchable in logs,
- preserve prompt/window association,
- avoid automatic inventory transfer,
- not mark a rules effect as applied.

### Hybrid

Hybrid is for mixed cases. A common future example is "consume the token now, but require the host to manually edit the Pokemon." Another is "apply the money part of a deal automatically, but leave the promised Pokemon audit-only."

Hybrid effects must identify which parts are automatic and which parts are manual/audit-only.

## 6. Resource Consumption Modes

Consumption mode describes when a resource is spent and whether cancellation can restore it.

| Consumption Mode | Meaning | Example |
| --- | --- | --- |
| Consume On Use | Resource is spent as soon as the effect is declared. | A simple instant item where declaration is the commit point. |
| Consume On Resolve | Resource is spent when the pending event is finalized. | A token that can be responded to/canceled before resolving. |
| Consume On Successful Resolve | Resource is spent only if the effect actually applies. | A protection token that is refunded if the target is invalid or the response is canceled. |
| Do Not Consume | The effect is reusable, passive, or only records information. | A passive trigger or free class permission. |
| Manual Consumption | Host must remove/restore the resource manually. | Alpha manual host event or effect not yet wired to inventory. |
| Refund If Canceled | Resource may be consumed early but should be restored if the prompt is canceled or repaired. | Future automatic token consumption during prompt-chain repair. |

Prompt-chain repair matters here. A response may be recorded by mistake, then canceled from Live Referee or repaired in Advanced Controls. If automatic token consumption is added later, each effect must define whether canceling the response refunds the token, leaves it spent, or requires host repair.

**CURRENT IMPLEMENTATION POLICY - FINAL LIFECYCLE NEEDS RULING**

The application currently behaves as follows for normal Tokens:

- Proactive Tokens: Consume On Use when declaration is confirmed.
- Protection responses: Consume On Use when the response is declared.
- Later negation, cancellation, blocking, or ineffectiveness currently does not automatically refund the Token. These outcomes remain distinct and their final treatment needs an explicit ruling.
- An erroneous host/test declaration may be restored only through an explicit audited Advanced / Repair action.
- Manual host events: Manual Consumption.
- Audit-only deals/promises: Do Not Consume unless money is included.
- Completed money transactions: Automatic money ledger application, no token/item/Pokemon transfer by default.

## 7. Exception Flags

Exception flags describe weird rules explicitly instead of forcing every effect into a normal bucket. They should be rare, searchable, and visible in advanced details.

Recommended exception flags:

| Flag | Meaning |
| --- | --- |
| `customResolution` | Uses a bespoke resolver instead of the normal target resolver. |
| `uniqueTiming` | Has special legal timing outside normal buckets. |
| `cannotBeUsedAsResponse` | Can be declared in open windows, but cannot answer an already pending prompt. |
| `cannotBeRespondedTo` | Does not open a normal response window. |
| `ignoresProtection` | Protection-style responses do not stop it. |
| `manualOnly` | Must remain Manual Required even if similar effects become automatic. |
| `requiresHostChoice` | Host must choose mode, target, order, or outcome at resolution. |
| `opensNestedPrompt` | Creates another prompt/window as part of resolution. |
| `createsPostResolutionFollowUp` | Resolving or skipping this effect offers another effect prompt afterward. |
| `doesNotConsumeOnUse` | Overrides the default source consumption behavior. |
| `consumeOnlyOnResolve` | Explicitly waits until finalization before spending the resource. |
| `hiddenUntilReveal` | Choice/effect is hidden until a reveal step. |
| `appliesOnlyIfTargetBrought` | Applies only if a Pokemon/team is brought to battle. |
| `unconfirmsLockedTeamOnBattleRelevantChange` | If used after that player has locked/confirmed a Battle Phase team and before battles start, the team must be unconfirmed. |
| `usesTeamBuilderDonorSelection` | Uses private Team Builder donor choices that are finalized and validated at Team Lock. |
| `teamLockOnly` | Legal only during Team Lock or locked-team windows. |
| `requiresPreGymPhase` | Queued at one Gym boundary and resolved before the next Gym's Action Phase. |
| `paymentOption` | The target may negate the effect by paying a fixed cost to the specified player. |

Exception flags should not become a dumping ground. If many effects need the same exception, that probably means a real timing or resolution category is missing.

## 8. Recommended Effect Schema

Effect metadata should be lightweight. It should describe timing and resolution, not contain every implementation detail.

Suggested shape:

```js
{
  id: "restrict",
  name: "Restrict",
  sourceType: "token",
  timingCategory: "proactiveActivation",
  targetCategory: "pokemon",
  resolutionMode: "manualRequired",
  consumptionMode: "consumeOnResolve",
  createsPendingEvent: true,
  requiresPendingEvent: false,
  opensResponseWindow: true,
  transactionsAllowed: true,
  applicationHandler: "",
  exceptionFlags: [],
  promptTemplate: "{actor} used {effect} on {target}.",
  manualInstructions: "Finalize the event, then manually apply the Restrict outcome to the target Pokemon."
}
```

Field notes:

- `id`: stable rules/content key.
- `name`: player-facing label.
- `sourceType`: Token, Class, Perk, Item, TM, Pokemon, Location, Transaction, or Manual / Host.
- `timingCategory`: when it may be declared.
- `targetCategory`: what resolver family can apply it.
- `resolutionMode`: Automatic, Manual Required, Audit Only, or Hybrid.
- `consumptionMode`: when a resource is spent.
- `createsPendingEvent`: whether declaration opens a pending event.
- `requiresPendingEvent`: whether the effect can only be used inside an open prompt.
- `opensResponseWindow`: whether eligible players can respond before it resolves.
- `transactionsAllowed`: whether deals can be recorded in that window.
- `applicationHandler`: optional future resolver key, not necessarily a direct function reference.
- `exceptionFlags`: explicit odd behavior.
- `promptTemplate`: concise Live Referee sentence template.
- `manualInstructions`: host-facing cleanup text for Manual Required or Hybrid effects.

Names can be adjusted to match codebase style later. The important part is that each effect has stable metadata for timing, source, target, resolution, consumption, and exceptions.

## 9. Manual Host Events

Manual Event means the host creates a pending event or ruling window when the app does not have a dedicated button yet, or when the host needs to repair or document a bug/ruling.

Manual events should usually default to:

- `createsPendingEvent: true`
- `sourceType: "manualHost"`
- `resolutionMode: "manualRequired"` or `resolutionMode: "auditOnly"`
- `consumptionMode: "manualConsumption"`
- `opensResponseWindow: true`
- `transactionsAllowed: true`

Manual events should not imply automatic state change. They are a table-audit and chronology tool first.

Recommended manual event UI copy:

- What happened: short player-facing sentence.
- Responding to: only shown when it is a response prompt.
- Effect application: Manual Required or Audit Only.
- Manual instructions: what the host must clean up after finalizing.

## 10. Demo / Test Mode Recommendation

Max All Players For Testing should make live testing easier without flooding every player sheet.

Recommended demo maxing:

- Max money.
- Give high quantities of all tokens.
- Give useful random Pokemon rosters.
- Include active, released, and history Pokemon so roster flows can be tested.
- Do not flood every player sheet with every item and every TM by default.
- Use a smaller curated item/TM test set unless full item/TM testing is explicitly needed.

Reason: full item/TM flooding makes the Player Hub harder to read, slows testing, and hides the thing being tested. Tokens are more relevant to Live Referee timing and response windows, so token-heavy demo mode is more useful than all-inventory demo mode.

Possible future demo modes:

- Live Referee Timing Demo: money, tokens, a few Pokemon, no item/TM flood.
- Roster/Facility Demo: Pokemon-heavy with active/released/history/facility states.
- Shop Inventory Demo: curated items/TMs plus money.
- Full Data Stress Demo: everything, only when testing performance or inventory overflow.

## 11. Implementation Order

Recommended staged implementation:

1. Add metadata categories/constants.
2. Add resolutionMode display to Live Referee.
3. Add consumptionMode display/logging.
4. Wire tokens first.
5. Add Live Referee Available Effects drawer later.
6. Add class/perk effects after the token model is stable.
7. Add exceptions one by one.

Suggested next pass:

Define harmless metadata constants and normalization helpers for timing, source, target, resolution, consumption, and exception flags. Do not apply effects automatically yet. The first code pass should make effect metadata inspectable in Details and logs without changing gameplay outcomes.

After that:

- Map current token definitions to metadata.
- Keep most token effects Manual Required.
- Make only existing safe behavior Automatic, such as completed money transactions.
- Add Hybrid only where the automatic part is already safe.
- Add cancellation/refund behavior before automatic token consumption becomes common.

## Current Alpha Defaults

Until the resolver layer is built, the safest defaults are:

- Unknown token effect: Manual Required.
- Unknown class/perk/item/TM/Pokemon effect: Manual Required.
- Non-money transaction content: Audit Only.
- Completed money transaction: Automatic.
- Manual host event: Manual Required or Audit Only.
- Protection response recorded through Live Referee: creates a prompt-chain response, but effect application remains Manual Required unless a specific resolver is already safe.

This keeps chronology strong without pretending the app has solved every rules edge case.
