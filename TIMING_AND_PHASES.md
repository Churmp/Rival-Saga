> **Authority: CANONICAL RULES**
> This document governs the currently approved phase names and broad timing boundaries.

# Rival Saga Timing And Phases

## Timing State Model

The gameplay controller distinguishes two timing states:

- A **phase-boundary procedure** resolves scheduled work at the start or end of a phase. Ordinary Control Timing is closed while that procedure is active.
- A **Control window** is an open game state in which no phase-boundary procedure, pending effect, response chain, Action/location operation, or other game operation is resolving. Proactive Control effects may be declared unless a rule explicitly closes Control Timing.

Phase-boundary procedures are not extra manual phases. Live Referee detects them, explains the current situation, presents only required choices, and continues automatically when their mandatory triggers and optional offers are complete.

## Start Of Gym

Start of Gym resolves in this order:

1. Expire effects scheduled to end.
2. Resolve mandatory Start-of-Gym effects.
3. Resolve optional Start-of-Gym effects.
4. Open the **Gym Start Preparation Control Window**.
5. Close that Control window after all players pass consecutively.
6. Begin Action Phase.

The legal timing name is `gymStartPreparationControl`, not the broad value `gymStart`. Ordinary Control effects cannot interrupt expiration or Start-of-Gym trigger processing.

### Gym Start Preparation Priority

Gym Start Preparation uses previous-Gym placement order. Gym 1 uses the established initial player order.

1. First place receives the first opportunity.
2. That player may declare one legal Control effect or pass.
3. A declaration resolves its complete pending event and response chain.
4. Control priority resumes with the next player in placement order.
5. After the final player, priority cycles to the first player.
6. The window closes only after every player passes consecutively without a new Control declaration.

Declaring an effect resets the consecutive-pass chain. It does not remove that player from later cycles. Protection and other legal responses use normal response-chain priority after a Control effect is declared.

## Battle Phase

The broader Battle Phase is:

1. Team Building
2. Team Lock
3. Sabotage
4. Team Preview
5. Rival Battle Phase
6. Battle Payout

Scheduled battles occur during **Rival Battle Phase**. Do not use "Battle Phase" as the name of only the battle-playing subphase.

The current application may expose a separate Battle Results surface. That is implementation structure and does not replace the canonical **Battle Payout** term.

## End Of Action Phase Procedure

`endOfActionPhaseProcedure` opens automatically after Action Phase operations finish and before Team Building begins. Mandatory End-of-Action effects resolve first, followed by ordered optional offers such as Honey. Ordinary Control Timing remains closed until the procedure completes.

## End Of Battle Phase Procedure

`endOfBattlePhaseProcedure` has this exact order:

1. Battle Payout resolves.
2. The End-of-Battle Phase procedure opens automatically.
3. Mandatory End-of-Battle effects resolve.
4. Optional End-of-Battle effects are offered to eligible players in the established applicable player order.
5. After all required effects and decisions finish, ordinary Control Timing reopens.

This procedure is not ordinary post-Battle-Payout Control Timing and is not a separate phase the host must manually enter or pass.

## Implementation Aliases

These legacy values may remain in code until a dedicated migration:

| Implementation value | Canonical interpretation |
|---|---|
| `teamPreparation` | Team Building |
| `teamSubmissionLock` | Team Lock |
| `battlePrep` | Legacy umbrella for pre-battle preparation; map explicitly |
| `rivalBattles` | Rival Battle Phase |
| `battleResults` | Legacy result surface; map explicitly to the applicable result/payout operation |
| `battleDataReporting` | Legacy battle reporting surface within the broader Battle Phase |

Aliases do not create rules or legal timing.

## Control Timing

- Ordinary Control Timing is open whenever no phase-boundary procedure, pending effect, response chain, Action/location operation, or other game operation is currently resolving, unless the current rules explicitly close Control Timing.
- Control Timing is the default for an effect that does not specify another activation timing.
- Control Timing cannot be used as a response.
- Known open contexts include Gym Start Preparation Control, open moments during Action Phase, Team Building, Shop Phase, and the post-Battle Control period after End-of-Battle procedures complete.
- Control Timing closes while another operation resolves.
- It is explicitly closed during Team Lock, Sabotage, Team Preview, Rival Battle Phase, Battle Payout, and Start- or End-of-phase procedures.
- Control legality must be determined from the current controller state, not solely from a copied list of broad phase names.
- An effect's activation timing and a revision window caused by its resolution are separate concepts.
- Administrative host override is not an ordinary legal timing.

### Action Control Boundary

An Action turn begins with the current player deciding where to go, and ordinary Control Timing remains open during that decision. The Action/location operation begins for Control-locking purposes when the server accepts the destination commitment, not merely when the player's turn begins. From that commit through the terminal end of the full location operation, ordinary Control Timing is closed.

A named exact effect may provisionally claim the open pre-destination window before all targets are chosen. That claim pauses destination commitment but is not yet a consumed activation or response-chain layer. Confirmation consumes and activates it; withdrawal restores the same Action decision without spending or mutation.

## Phase-Boundary Offer Queue

Live Referee will eventually consume an ordered queue for mandatory and optional boundary effects. A conceptual record is:

```js
{
  id: "",
  boundary: "endOfActionPhase",
  sourceType: "token",
  sourceId: "honey-token",
  offeredToPlayerId: "",
  status: "pending",
  mandatory: false,
  availableChoices: [],
  priorityOrder: [],
  createdAt: ""
}
```

The queue must support mandatory triggers, optional triggers, ordered player offers, structured menus, Skip decisions, nested response windows, and automatic continuation. It is an architecture target, not a runtime implementation completed by this documentation pass.

## Needs Ruling

The exact outer sequencing relationship among Shopping, End of Gym, Battle Payout completion, and the next Gym has not been fully approved in one canonical lifecycle. Existing phase surfaces are implementation evidence only until that sequence is ruled.
