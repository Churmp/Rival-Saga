# Rival Saga — Route Encounter System

## Overview

Encounter Wheels are replaced by **Routes**.

At the beginning of each Series, Routes 1–9 generate their own hidden Pokémon ecosystems. These ecosystems remain fixed for the entire Series.

A Route contains roughly **20–30 permanent Pokémon residents**, generally weighted toward about 25. The exact Pokémon on each Route are different every Series.

## Route Progression

Routes still become stronger as their number increases.

- **Route 1:** 75% LC / 20% LC Elite / 5% Safari
- **Route 2:** 25% LC / 60% LC Elite / 15% Safari
- **Route 3:** 75% Safari / 23% Poké / 2% Great
- **Route 4:** 63% Safari / 29% Poké / 7% Great / 1% Ultra
- **Route 5:** 42% Safari / 34% Poké / 20% Great / 3.5% Ultra / 0.5% Master
- **Route 6:** 28% Safari / 34% Poké / 28% Great / 9% Ultra / 1% Master
- **Route 7:** 16% Safari / 28% Poké / 38% Great / 15% Ultra / 3% Master
- **Route 8:** 9% Safari / 21% Poké / 39% Great / 27% Ultra / 4% Master
- **Route 9:** 5% Safari / 15% Poké / 42% Great / 32% Ultra / 6% Master

These percentages are used when generating each permanent Route ecosystem. Individual Pokémon slots are rolled independently, so the game does not force exact tier counts.

## Hidden Route Quality

Routes 3–9 secretly roll a quality level when the Series begins:

- **Poor — 5%**: approximately 2 Routes weaker
- **Weak — 20%**: approximately 1 Route weaker
- **Normal — 50%**
- **Strong — 20%**: approximately 1 Route stronger
- **Loaded — 5%**: approximately 2 Routes stronger

The system uses the real Route tier distributions rather than creating imaginary stronger/weaker tables.

Route 3 can never generate weaker than the normal Route 3 distribution. Route 9 can never generate stronger than the normal Route 9 distribution.

Players are not shown a Route's Quality.

## Regional Identity

Every Series still has a featured generation.

That generation's native pool is defined by that generation's **regional Pokédex**.

The generator strongly prefers Pokémon from that Pokédex, with roughly a **50% native-generation preference**. This is **not** a quota or ceiling.

The remaining selections come from the universal eligible Pokémon pool, and those random selections can also happen to select native Pokémon.

This means a Unova Series should feel heavily Unova-based, while a smaller regional Pokédex like Kalos naturally mixes in more outside Pokémon. Two Series using the same generation can still have dramatically different ecosystems.

There is no requirement to include every Pokémon from the featured generation.

## Forms and Special Pokémon

Any form that has its own Battle Tier is treated as a separate encounterable Pokémon.

Examples include **Landorus-Therian** and **Ogerpon-Hearthflame**.

Megas are **not** Route Pokémon. Mega Pokémon are not directly acquired in Rival Saga; Mega Stones are acquired instead.

Legendary and Mythical Pokémon do not receive special Route-generation rules. Their Battle Tier determines where they are eligible to appear just like any other Pokémon.

## Repeated Pokémon

The exact same species cannot occupy multiple permanent slots on the same Route.

The same species may appear on different Routes. Evolutionary-family overlap and branched evolutions are allowed.

After a Pokémon has already been placed somewhere in the Series, its future generation weight is reduced to **25% of its previous weight**.

This does not ban repeats. It simply makes excessive repetition increasingly unlikely while preserving random generation.

## Discovery

Every permanent resident begins hidden.

Players can see the Route's total population but not the identities of undiscovered Pokémon.

Example: **Route 5 — 0/26 Discovered**

Whenever a permanent Route resident appears as an encounter option, that Pokémon becomes publicly discovered on that Route.

Example later in the Series: **Route 5 — 11/26 Discovered**

All players can see those 11 residents. The other 15 remain hidden.

A Pokémon remains discovered even if it is rerolled, another player takes it, the encounter is canceled, or the player chooses a different encounter option. Once the Pokémon has been seen, the information exists.

## All Routes Are Open

Routes 1–9 are available beginning at Gym 1.

Players may explore future Routes early. The difference is encounter efficiency:

- **Current or previous Route:** 1 Action = **2 encounter options**
- **Future Route:** 1 Action = **1 encounter option**

Example during Gym 4:

- Routes 1–4 generate 2 options.
- Routes 5–9 generate 1 option.

This allows players to scout future ecosystems while making current Routes more efficient.

## Encounter Options vs. Acquisitions

Encounter quantity and Pokémon acquisition quantity are separate.

A normal Route visit allows the player to acquire **at most 1 Pokémon**.

**Current/previous Route:** Reveal 2 encounter options, then choose up to 1 to acquire.

**Future Route:** Reveal 1 encounter option, then choose whether to acquire it.

This means using all 3 Actions on Routes normally produces a maximum of **3 acquired Pokémon during that Gym**, rather than 6.

Multiple encounter options primarily provide more discovery, more information, more choice, and better opportunities for Route-modifying effects. They do not automatically create additional roster additions.

## Duplicate Protection

Duplicate protection is personal.

If an encounter option is a Pokémon the player already owns, that option may be rerolled for free from the same Route.

If the replacement is also personally owned, duplicate protection continues. Other players owning the Pokémon does not matter.

Every permanent Route resident shown during these rerolls is still discovered.

## Rerolls

A normal Reroll replaces one encounter option with another result from the same Route.

The original result remains discovered. Rerolls never move the player to another Route.

## Extra Encounters

"Extra Encounter" no longer automatically means another Pokémon acquisition.

Unless an effect specifically says otherwise:

**EXTRA ENCOUNTER = +1 ENCOUNTER OPTION**

Example:

- Normal Route visit: 2 options → choose 1
- With Extra Encounter: 3 options → choose 1

The additional option comes from the same Route.

This makes Extra Encounter useful for discovery and encounter quality without flooding player rosters.

## Route Effects

Effects that previously manipulated Encounter Wheels now use a shared Route-effect system.

### 1. Injection

Temporarily adds themed Pokémon to the encounter pool.

Example: **Add 3 eligible Fire-type Pokémon to this Route encounter.**

Injected Pokémon are temporary candidates. They do **not** permanently become Route residents and do **not** increase the Route's permanent population or discovery denominator.

### 2. Lure

Makes a type, tier, or theme more likely to appear.

Example: **Water-type Pokémon are 3× as likely to appear during this Route visit.**

Lures do not reveal which hidden residents match the condition.

### 3. Suppression

Temporarily prevents certain Route residents from being encountered.

**Repel example:** Before exploring a Route, choose a Battle Tier. Up to **5 random permanent residents** of that tier are temporarily suppressed for the visit. They cannot appear as encounter options.

Suppressed Pokémon are not revealed, and the player is not told exactly which residents were suppressed.

### 4. Selection

Allows a player to convert known Route information into a guaranteed encounter.

Selection normally works only with already-discovered permanent residents.

**Master Ball example:** Choose any already-discovered Pokémon on the selected Route as the Pokémon acquired during the visit.

This still uses the visit's normal single acquisition. Master Ball does **not** reveal the Route.

### 5. Scouting

Reveals Route residents without allowing them to be acquired.

Example: **Reveal 3 random undiscovered residents from this Route.**

Scouting increases information without increasing roster size.

### 6. Bonus Options

Adds another encounter option to the current Route visit.

Example: **Extra Encounter** changes 2 options into 3 options, while the player still normally acquires only 1 Pokémon.

### 7. Bonus Acquisition

Explicitly allows an additional Pokémon to be acquired.

This is substantially stronger than Extra Encounter and should be comparatively rare. An effect must specifically say that it grants an additional acquisition.

### 8. Free Route Visit

Allows another Route visit without spending a normal Action.

Because a free visit can create another full acquisition opportunity, these effects are also considered premium and should be relatively uncommon.

## Temporary Route Pokémon

Temporary injected Pokémon are separate from permanent Route residents.

They:

- do not increase Route population
- do not occupy permanent resident slots
- do not count toward X/Y Discovered
- disappear when their effect expires

If one appears as an encounter option, players can see that it is a temporary visitor rather than one of the Route's permanent hidden residents.

## Type Packages

The old Type Package concept is replaced by **Route Injection**.

Instead of receiving a separate package of Encounter Wheel Pokémon, effects can temporarily add eligible Pokémon matching a type/tier requirement to the selected Route encounter.

This allows Classes, Perks, Tokens, rewards, and other mechanics to manipulate encounters without creating separate encounter systems.

## Examples of Converted Effects

- **Reroll:** Replace one encounter option with another result from the same Route.
- **Extra Encounter:** Add 1 additional option from the same Route. Acquisition limit remains unchanged.
- **Repel:** Choose a Battle Tier. Suppress up to 5 random permanent residents of that tier during the visit.
- **Master Ball:** Choose any already-discovered permanent resident on that Route as the acquisition.
- **Dragon Calling:** Temporarily inject eligible Dragon/Flying Pokémon into the encounter pool.
- **Type-based effects:** Can inject themed Pokémon or increase their encounter weight rather than creating an entirely separate wheel.

## Design Goal

Each Series creates a hidden Pokémon world.

Players gradually learn what Pokémon exist, which Routes are unusually strong, where desirable Pokémon live, whether scouting future Routes is worthwhile, and which previously discovered Routes are worth revisiting.

At the same time, encounter manipulation can be common and flavorful without constantly increasing the number of Pokémon entering player rosters.

**Routes provide the permanent world. Classes, Perks, Tokens, Modifiers, and rewards temporarily bend how players explore it.**
