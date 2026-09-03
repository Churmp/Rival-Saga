> **Authority: CANONICAL RULES**
> This is the repository entry point for current Rival Saga gameplay rules.

# Rival Saga Rulebook

## Source Priority

When sources disagree, use this order:

1. Steven's explicit latest instruction in the current task.
2. This rulebook and the canonical modules linked below.
3. Human-authored specialized rule documents explicitly linked by this rulebook.
4. Architecture documents for implementation planning only.
5. Current code as implementation evidence only.
6. Historical audits and archaeology documents as history only.

Runtime behavior that contradicts a canonical rule is a defect, not an implicit rule change. Unresolved questions must remain labeled **Needs Ruling** instead of being answered from legacy code.

## Canonical Modules

- [Timing and Phases](TIMING_AND_PHASES.md): Start-of-Gym order, Battle Phase structure, Control Timing, and implementation aliases.
- [Saga Token Rules](SAGA_TOKEN_RULES.md): Token timing, response semantics, lifecycle questions, and known Token-system defects.
- [Live Referee Gameplay Controller](LIVE_REFEREE_GAMEPLAY_CONTROLLER.md): canonical only for Live Referee navigation, ordered response priority, prompt chains, and response-controller behavior. Its Token-consumption language describes current implementation policy where the Token lifecycle still needs a ruling.

## Implementation Reporting

- [Implementation Status](IMPLEMENTATION_STATUS.md) reports what the application currently does and what has actually been tested. It does not create gameplay rules.
- [Architecture](ARCHITECTURE.md) plans implementation and records code structure. It is not a gameplay authority.
- [Token Effect Matrix](TOKEN_EFFECT_MATRIX.md) is generated from the executable declaration contract. Contract coverage and intended resolver mode do not prove runtime completion.

## Current Boundaries

The rulebook is modular and still growing. Do not infer missing rules from historical audits, display copy, resolver names, or current UI limitations. The broader Token lifecycle, outer Gym sequencing around Shopping and End of Gym, and several effect-specific mechanics remain explicitly unresolved.

Field Tokens are canceled and are not part of Rival Saga. They must not appear in catalogs, inventories, Action destinations, activation flows, or active gameplay state.

Gym Modifiers are a future, separate system. A Gym Modifier may occur randomly and change a setting for that Gym. Its selection rules, modifier catalog, timing, duration, stacking, visibility, and persistence are not yet defined; it must not inherit Field Token behavior.

## Action Phase Locations

- Game Corner Tickets cost $2,000 / $3,000 / $5,000 / $7,000 / $9,000 for Safari / Poké / Great / Ultra / Master. Elite Battle Tiers use their parent Ticket. The Slot Machine costs $2,000 and has exact result weights 20% nothing, 30% Safari, 25% Poké, 15% Great, 7% Ultra, and 3% Master.
- Department Store costs 1 Action and is limited to one visit per Gym. Legacy shop point currencies and product-level gates are retired, and this location replaces both former Action shop destinations. The visit uses the full Item and TM catalogs: sell up to one non-Clearance product for 75%, make normal purchases at 25% off with $3,000 total normal savings, and buy up to one of three persisted Clearance rolls at 50% off with $3,000 maximum savings. Clearance is final sale.
- Pokémon Breeder / Day Care costs $1,500 per Pokémon and accepts up to two in one Action. They are unavailable for the rest of the Gym and return automatically at the next Gym Start with +3 Levels and one TM they can learn when available.

Move-source taxonomy is universal: moves are either level-up moves or TMs. Every non-level-up learn source is treated as TM data; there is no third gameplay move category.
- Natural Move filtering happens before TM Shop browse organization. Rare TM-style move access that belongs to no more than five compatible evolution lines is promoted into those Pokemon's Natural movepools and removed from the global TM Shop.
- TM Shop browse folders are Damage, Setup, Disruption, Field, and Support. Shelf prominence is per-folder, and a TM may appear in multiple folders when that reflects a real shopping intent.
- TM Shop shelves are Staples, Main, Niche, and Junk Drawer. All uses the highest prominence among a move's folder placements and defaults to All -> Staples. Shelf placement is storefront organization only; it does not change move legality, price, or purchasability, and Junk Drawer TMs remain purchasable.
- Graveyard releases any number of eligible Pokémon in one confirmed Action. Safari / Poké / Great / Ultra / Master Destroy Values are $1,500 / $2,500 / $3,500 / $5,000 / $7,500. Roll the Curse Wheel once per complete $6,000; discard the remainder.
- Silph Co. R&D accepts up to three Pokémon. Safari / Poké / Great / Ultra / Master costs are $1,000 / $2,000 / $3,000 / $4,000 / $5,000 per Pokémon. Each independently rolls two Abilities and four Moves and chooses exactly one.
- Dragon's Den accepts exactly one eligible Pokémon for one Gym. Safari / Poké / Great / Ultra / Master costs are $1,000 / $1,500 / $2,500 / $4,000 / $6,000. On return, choose any legal move or one AAA-approved Ability.
