> **Authority: HISTORICAL / SUPERSEDED**
> Do not use this file to infer current gameplay rules. Several statements below are known to be stale.

# Rival Saga Rulebook Alignment Audit

Last pass: Rulebook v0.2 alignment sweep.

## Aligned In Code

- Phase order now includes Start of Gym Phase, Action Phase, Battle Phase, Battle Results Phase, and Shop Phase.
- New games and new Gyms begin at Start of Gym Phase.
- Battle Results Phase is the required phase for finalizing Gym results.
- Battle Phase agenda uses the current order: Team Preparation, Team Submission / Lock, Sabotage, Team Preview, Rival Battles, Battle Data Reporting.
- Pre-reveal curse/timing UI now uses Sabotage wording while preserving the old internal `teamLockWindow` save key for compatibility.
- Action Phase still defaults to 3 actions per player.
- Normal shop purchases are guarded to Shop Phase, with the Department Store providing its own unrestricted Action Phase Item/TM catalog.
- Legacy shop-level and point fields may remain in save migrations, but they no longer restrict products or grant discounts.
- The Department Store replaces both former Action Phase shop locations; its persisted visit supplies the finalized sale, normal-discount, and Clearance rules.
- Hidden Grotto now costs 1500 and uses the correct flow: roll 3 random types, choose 1 type, roll 3 Pokemon from that type, choose 1 Pokemon. Its Pokemon pool is the current Gym's legal Battle Tier baseline or lower.
- Daycare is now the player-facing location name. Breeder remains available as a Trainer Class name.
- Day Care deposit/return now records TM Move Pending for new activity.
- Legacy Ticket and Game Corner Ticket are now the player-facing names. They are key-item-like reward/access resources, not normal effect Tokens.
- The token boundary is documented as: Tokens are effect objects, usually consumed on use; Tickets are key-item-like reward/access resources such as Legacy Tickets and Game Corner Tickets. Badge Points are not Tokens.
- Locked submitted teams count as brought. Battle records mark actual battle participation/performance. Roster Pokemon not brought are benched.
- Momentum decay is calculated during Battle Results payout calculation.
- Momentum money is based on final/total Momentum times $500, per current correction.

## Still Manual Or Partial

- Day Care returns now create a required TM choice validated against the Pokemon's complete TM learnset.
- Start-of-Gym trigger expiration/resolution is represented as a phase but does not yet automate all start-of-Gym effects.
- Victory Road remains flexible/manual where final wheel slice text is not fully implemented.
- Momentum rewards such as Momentum Wheel, Extra Action, and Firesale still need fuller reward-specific automation.
- Full token legality/protection validation is not implemented.
- Full Trainer Class, perk, token, location, and Battle Trick automation is intentionally deferred until exact text is locked.
- Shop purchase privacy is still mostly enforced through profile/private prep access, not a full Shop Phase reveal-summary system.
- Full Series transition behavior still needs final rule text.
