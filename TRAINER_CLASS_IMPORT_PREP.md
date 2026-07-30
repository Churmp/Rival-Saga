> **Authority: IMPLEMENTATION ARCHITECTURE**
> This document is import and implementation planning, not Trainer Class gameplay authority.

# Rival Saga Trainer Class Import Prep

This document captures system prep for trainer classes that are ready for rules import but need app support before they can work functionally. It is architecture and import guidance, not a full class implementation.

## Current App Readiness

Already useful:

- The trainer class wheel already includes `Snowboarder Skier`.
- The timing model already has pending events, response windows, prompt chains, trades, and Manual Required resolution.
- `classEffect` exists as a pending-event type.
- Battle Phase already separates Team Lock, Sabotage, Team Preview, Rival Battle Phase, and Battle Payout; Team Building precedes Team Lock. Older code aliases may still use Team Submission / Lock, Rival Battles, or Battle Data Reporting.
- Locked teams stay private until Team Preview, so blind Sabotage gameplay is already protected.
- The Team Builder already validates owned roster Pokemon, selected battle species, Badge Points, legal moves, held items, and locked snapshots.

Still needed before class effects can be fully imported:

- A real class-effect metadata catalog, separate from token metadata.
- Per-player class state storage.
- Live Referee source group support for Class effects.
- Post-resolution follow-up offers after a pending event resolves.
- Team Builder class modifier selections, such as move-sharing donors.
- Player-attached class counters and passive-freeze records.
- A shared helper to unconfirm a locked team when a battle-relevant class state changes before battle starts.

## Shared Effect Vocabulary

Class effects should use the same effect vocabulary as tokens, trades, and manual events:

```js
{
  sourceType: "class",
  timingCategory: "controlActivation",
  activationPattern: "proactive",
  createsPendingEvent: true,
  requiresPendingEvent: false,
  opensResponseWindow: true,
  transactionsAllowed: true,
  canBeUsedAsResponse: false,
  resolutionMode: "manual" | "hybrid" | "automatic",
  targetType: "player" | "pokemon" | "team" | "resource" | "table" | "manual",
  targetScope: "singlePlayer" | "rosterInstance" | "singleTeam" | "allPlayers" | "manual",
  legalWindows: []
}
```

The current code has been prepared with broader source/target constants and timing-window names for `shopOpen`, `teamBuilding`, and `battlePrep`. Those names do not make existing tokens legal in those windows by themselves. Future class metadata must opt in.

## Control-Style Class Activations

Some class effects are proactive control activations. They are not Action Phase actions unless the rules say so.

Legal open-window examples:

- Action Phase open control windows.
- Shop Phase, using resources owned before the current Shop purchase batch.
- Team Building.
- Battle Prep before battles begin.
- Manual host control windows.

Rules for this bucket:

- They are activations, not responses.
- They cannot be used while another prompt is pending unless their text explicitly allows response use.
- They usually create a pending event.
- Players can respond or trade before the activation resolves.
- If the activation changes battle-relevant class state after a team is locked or confirmed, that player's team must become unconfirmed before battle starts.

Future helper target:

```js
unconfirmBattleTeamForPlayer(playerId, reason)
```

That helper should clear `locked`, clear `lockedSlots`, reset Team Preview reveal state if still pre-preview, log the reason, and force the player to reconfirm. If Team Preview or battles have already started, use a Battle Revision Window or Manual Required repair instead of silently rewriting history.

## Shop Phase Purchase Gate

Players may use already-owned legal effects during Shop Phase.

Items, tokens, or other resources bought during the current Shop Phase should not be usable until purchases become official at the end of that Shop Phase, unless a specific rule overrides this.

Future metadata should distinguish:

```js
ownedBeforeCurrentShop: true
purchasedThisShopPhase: true
usableThisShopPhase: false
```

## Class State Shape

Class state should live outside the player display fields so changing class can cleanly remove class-specific state.

Recommended container:

```js
state.classStateByPlayerId = {
  [playerId]: {
    classId: "snowboarder-skier",
    initializedAt: "",
    currentGymKey: "",
    snowboarderSkier: {
      stance: "snowboarder",
      stanceChosenAt: "",
      downhillTargetByGymKey: {},
      pendingFollowUps: []
    }
  }
};
```

When a player loses or changes class, class-owned state should be cleaned:

- Remove source-owned Frost Counters.
- Remove unresolved post-stance follow-ups.
- Remove class-specific Team Builder donor selections.
- Remove Frozen passive effects created by this class if the rules tie their duration to the source class.

## Player-Attached Counters

Frost Counters are attached to the affected player, but they must remember the source Snowboarder / Skier player.

Recommended shape:

```js
state.classCountersByPlayerId = {
  [affectedPlayerId]: {
    frost: {
      [sourcePlayerId]: {
        count: 0,
        max: 3,
        sourceClassId: "snowboarder-skier",
        updatedAt: "",
        coldFrontAppliedGymKeys: []
      }
    }
  }
};
```

Important rules:

- A player can have up to 3 Frost Counters from the same source player.
- Cold Front can apply to each affected player only once per Gym from that source.
- Powder Trail applies at End of Battle Phase to players defeated by the source this Gym.
- Counters from a source are removed if that source loses Snowboarder / Skier.

## Frozen Passives

Permafrost targets one non-structural Trainer Class passive controlled by a player.

Recommended shape:

```js
state.frozenClassPassives = [{
  id: "",
  sourcePlayerId: "",
  targetPlayerId: "",
  targetClassId: "",
  passiveId: "",
  passiveName: "",
  status: "active",
  createdAt: "",
  expiresWhen: "targetChangesClass",
  sourceEffectId: "permafrost"
}];
```

The class import needs a way to mark passives as structural or non-structural. Structural class identity, typing packages, and required setup should not be eligible Permafrost targets unless a rule explicitly says so.

## Team Builder Move-Sharing Modifiers

Shared Technique and Birdkeeper-style effects should use one shared Team Builder modifier system.

Recommended shape:

```js
state.teambuilder.classSelectionsByPlayerId = {
  [playerId]: {
    "snowboarder-skier": {
      sharedTechnique: {
        donorPokemonRecordIds: [],
        finalizedAtTeamLock: false,
        lockedTeamId: "",
        lastValidatedAt: ""
      }
    }
  }
};
```

General donor-selection rules:

- Donor choices are private Team Builder selections.
- Donors can be changed before Team Lock.
- At Team Lock, validate donors and team together.
- Donors must be active roster Pokemon owned by the player.
- Donors cannot be included on the locked battle team.
- Donor moves are only legal for eligible recipients during that Battle Phase.

For Snowboarder / Skier:

- Exactly 2 donor Pokemon are required.
- Donors must be Ice-type Pokemon.
- Only Ice-type battle-team Pokemon may use donor moves.
- The donor move must be known by one selected donor.
- The move source label should be `Shared Technique`.

Future helper target:

```js
teamBuilderMoveModifiersForPlayer(playerId, build)
```

`legalMoveOptionsForPokemon(pokemon, player, context)` and `validateTeamBuildDraft(build, playerId)` should use the same modifier helper so the UI and final lock validation cannot disagree.

## Snowboarder / Skier Import Notes

### Stance State

The player chooses a starting stance when gaining the class:

- `snowboarder`
- `skier`

This choice should be stored in class state, not in the class name string.

### Stance Swap

Suggested metadata:

```js
{
  id: "snowboarder-skier-stance-swap",
  name: "Stance Swap",
  sourceType: "class",
  timingCategory: "controlActivation",
  activationPattern: "proactive",
  legalWindows: ["actionOpen", "shopOpen", "teamBuilding", "battlePrep", "manualHost"],
  canBeUsedAsResponse: false,
  createsPendingEvent: true,
  requiresPendingEvent: false,
  opensResponseWindow: true,
  transactionsAllowed: true,
  targetType: "player",
  targetScope: "singlePlayer",
  targetMode: "self",
  resolutionMode: "hybrid",
  promptTemplate: "{actor} is switching to {stance} Stance."
}
```

Resolution flow:

1. Player declares Stance Swap and chooses the other stance.
2. A response window opens.
3. If it resolves, switch stance.
4. If the team was locked/confirmed before battle starts, unconfirm that player's team.
5. Offer the stance-specific trigger with first priority to the source player.
6. After that trigger resolves or is skipped, offer Permafrost with first priority to the source player.

### Cold Tax

After switching into Snowboarder Stance, the player may trigger Cold Tax.

Suggested metadata:

```js
{
  id: "snowboarder-skier-cold-tax",
  name: "Cold Tax",
  sourceType: "class",
  timingCategory: "postStanceSwapTrigger",
  activationPattern: "conditionalOptionalTrigger",
  createsPendingEvent: true,
  opensResponseWindow: true,
  targetType: "player",
  targetScope: "allPlayers",
  resolutionMode: "automatic",
  moneyPerCounter: 250,
  counterType: "frost"
}
```

The money transfer is safe to automate once counter state exists because money ledger support already exists.

### Downhill Target

After switching into Skier Stance, the player may choose one player with at least 1 Frost Counter from them.

Suggested metadata:

```js
{
  id: "snowboarder-skier-downhill-target",
  name: "Downhill Target",
  sourceType: "class",
  timingCategory: "postStanceSwapTrigger",
  activationPattern: "conditionalOptionalTrigger",
  createsPendingEvent: true,
  opensResponseWindow: true,
  targetType: "player",
  targetScope: "singlePlayer",
  resolutionMode: "manual",
  maxLevelBonus: 3
}
```

The selected target should be stored by Gym. When the source battles that target this Gym, the source team gets +1 level per Frost Counter from the source on that target, max +3, for that battle only.

### Permafrost

After the stance-specific trigger resolves or is skipped, the player may trigger Permafrost.

Suggested metadata:

```js
{
  id: "snowboarder-skier-permafrost",
  name: "Permafrost",
  sourceType: "class",
  timingCategory: "postStanceSwapTrigger",
  activationPattern: "conditionalOptionalTrigger",
  createsPendingEvent: true,
  opensResponseWindow: true,
  targetType: "resource",
  targetScope: "singleResource",
  resolutionMode: "manual",
  cost: { counterType: "frost", amount: 3 },
  expiresWhen: "targetChangesClass"
}
```

Permafrost needs the future Trainer Class passive registry so the UI can list only non-structural passives.

## Post-Resolution Follow-Up Offers

Stance Swap should not directly resolve Cold Tax, Downhill Target, or Permafrost.

Recommended alpha model:

```js
interactionEvent.followUpOffers = [{
  id: "",
  sourceEffectId: "snowboarder-skier-stance-swap",
  offeredToPlayerId: "",
  effectId: "snowboarder-skier-cold-tax",
  priority: 1,
  status: "offered"
}];
```

When the host finalizes Stance Swap, the Live Referee can return to Play and show a new situation such as:

```text
Gold switched to Snowboarder Stance.
```

Choices:

- Use Cold Tax
- Skip
- Host

After Cold Tax resolves or is skipped, offer Permafrost the same way.

## Import Order Recommendation

1. Add a class-effect metadata catalog and normalizer.
2. Add class state containers and cleanup on class change.
3. Add Live Referee Class source menu using Manual Required by default.
4. Add Stance Swap as the first functional class activation.
5. Add post-resolution follow-up offers.
6. Add Frost Counters and Cold Front/Powder Trail application.
7. Add Cold Tax money automation.
8. Add Downhill Target battle modifier as Manual Required first.
9. Add Frozen passive registry and Permafrost.
10. Add Shared Technique donor selections and move-source integration.

## Functional Readiness Summary

Importable now as Manual Required:

- Stance Swap declaration.
- Cold Tax declaration.
- Downhill Target declaration.
- Permafrost declaration.
- Shared Technique as a manual Team Builder note.

Needs system work before functional import:

- Automatic stance switching.
- Team unconfirmation after class-state changes.
- Frost Counter tracking.
- Cold Front and Powder Trail triggers.
- Cold Tax payout automation.
- Downhill Target battle-level modifier.
- Permafrost passive-freeze targeting.
- Shared Technique donor UI, move option injection, and Team Lock validation.

Needs more class/rules explanation before automation:

- Which Snowboarder / Skier passives are structural and cannot be frozen.
- Whether Shared Technique donor eligibility uses current committed species, selected battle species, or either when forms/evolutions change typing.
- Whether Downhill Target can affect all battles against the target this Gym or only the next battle.
- What happens if Frost Counters change after Downhill Target is selected but before the battle starts.
