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
