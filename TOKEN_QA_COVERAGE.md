> **Authority: IMPLEMENTATION STATUS / QA EVIDENCE**
> This generated report describes and retains test evidence. It does not create gameplay rules or promote any Token by itself.

# Token QA Coverage

- Coverage revision: `2026-07-29-settled-copy-and-curse-runtime-v2`
- Token contract revision: `2026-07-29-production-runtime-surfaces-v2`
- Tracked partial/verified Tokens: **44/44**
- Current partial Tokens: **32**
- Verified-complete Tokens with retained QA evidence: **12**
- Contract definitions: **53**
- Runtime usability: **43 usable**, **9 Guided only**, **0 development only**, **1 blocked**
- Catalog/revision watchlist entries: **7**
- Named scenarios: **144**
- Unique executable Browser tests: **13**
- Source: `scripts/token-qa-coverage-data.js`
- Freshness check: `npm run test:token-coverage`
- Regenerate after intentional inventory edits: `npm run generate:token-coverage`

## Evidence Rules

- `Covered` requires a named executable test with result-level assertions.
- `Partially Covered` means executable assertions exist, but one or more required outcomes are absent.
- `Static Only` means source or contract wiring is inspected; no gameplay result is proven.
- `Manual Only` means a human-observed path exists without automated result assertions.
- `Not Covered` means the required result is not presently exercised.
- `Blocked By Ruling` means a stable expected result cannot be written yet.
- Pure JSON serialization is Unit evidence only. It is not backend reload or Browser refresh evidence.
- Snapshot restoration may support Unit-level state-restoration evidence, but it is not controller undo or visible Browser undo evidence.
- Source ordering is Static Wiring evidence only. It is not controller Integration or Browser smoke evidence.

## Summary

### Scenario Status

| Coverage | Count |
| --- | ---: |
| Covered | 115 |
| Partially Covered | 17 |
| Static Only | 12 |
| Manual Only | 0 |
| Not Covered | 0 |
| Blocked By Ruling | 0 |

### Required Outcome Status

| Coverage | Count |
| --- | ---: |
| Covered | 197 |
| Partially Covered | 16 |
| Static Only | 11 |
| Manual Only | 0 |
| Not Covered | 22 |
| Blocked By Ruling | 0 |

### Test Level

| Level | Count |
| --- | ---: |
| Unit | 66 |
| Integration | 37 |
| Browser | 29 |
| Manual-only | 0 |
| Static Wiring | 12 |

Browser scenarios use visible controls, backend refresh, visible result assertions, and console/error collection. They do not mark a Token verified complete.

## Catalog And Revision Watchlist

These entries are explicit non-coverage records. Catalog presence, contract metadata, and dormant runtime wiring do not prove their gameplay results.

| Token | Runtime status | Runtime usability | Approved/revised behavior | Coverage | Evidence | Current gap |
| --- | --- | --- | --- | --- | --- | --- |
| Lingering Aroma | partial | usable | Replace one exact benefiting Ongoing Effect for its linked remaining lifetime and charge confirmed outside targeting declarations $500 once. | Partially Covered | STR-004 | Selection, linked replacement, declaration cost, duplicate-target protection, and expiration are covered in isolation; production browser withdrawal/negation/undo remains unverified. |
| Cold Wave | partial | usable | Suppress all Ongoing Activated Effects table-wide until Gym end without removing or reviving records. | Partially Covered | STR-003 | Explicit classification and non-mutating suppression are covered; browser presentation and enforcement by every future ongoing-effect consumer remain unverified. |
| Counterspell | verifiedComplete | usable | Restore the user's exact negated Token and place that exact inventory record on a two-Gym phase-anchored cooldown. | Manual Only | TIR-003, TIR-004, and BROWSER-008 cover the implemented lifecycle | Normal five-client simultaneous priority remains manual validation. |
| 7 Tools Of The Bandit | verifiedComplete | usable | Negate one just-activated Protection Token and create one same-Gym temporary copy for the responder. | Manual Only | TIR-001, TIR-002, TCF-019, and BROWSER-008 cover the implemented lifecycle | Normal five-client simultaneous priority remains manual validation. |
| Smokescreen | partial | guidedOnly | Spin every player exactly once; the original player's target remains, while another landed player may replace one chosen target with one legal corresponding target. | Partially Covered | STR-001, STR-002, and TCF-020 | Pure wheel/replacement semantics and production guided wiring are covered; destructive browser refresh, History undo, and five-player execution remain unverified. |
| Follow Me | partial | usable | Redirect one legal corresponding target, then grant one real inventory copy of each later real Token consumed by the recorded player for the rest of the Gym. | Partially Covered | SEB-005, TCF-021, and BROWSER-013 | Redirect, parent-gated relationship activation, canonical inventory copy, persistence, and duplicate prevention are covered; Gym-end expiration and History undo remain unverified. |
| Foresight Curse | textOnly | blocked | Reveal only matching brought-set moves to the Foresight user as private information, never through shared state, Live Referee, or History. | Not Covered | TCF-018, TCF-022, and SEB-008 prove fail-closed activation and recursive shared-payload stripping | Authenticated player-scoped delivery, authorized refresh, private rendering, six-target production resolution, and revocation are not implemented, so gameplay activation remains blocked. |

## Token Inventory

### Restrict

- **Token ID:** `restrict-token`
- **Runtime status:** `partial`
- **Runtime usability:** `usable` - This Token may be declared through its current runtime flow.
- **Resolver:** `automatic` / `restrict`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Normal global Restrict | Covered | TCI-001 | None recorded. |
| Rage-protected exact instance remains legal | Covered | TCI-004 and BROWSER-001 | None recorded. |
| Ordinary matching instances become illegal | Covered | TCI-004 and BROWSER-001 | None recorded. |
| Immunity negation prevents mutation | Covered | TCI-003 | None recorded. |
| Immunity uses a structured negated causal result | Covered | TRS-002 | None recorded. |
| Unban protection blocks Restrict | Covered | TCI-001 | None recorded. |
| Reload | Covered | TCI-004 and BROWSER-001 | None recorded. |
| Undo | Covered | TCI-004 | None recorded. |
| Sandbox discard | Covered | TSB-019 | None recorded. |
| Sandbox commit | Covered | TSB-019 | None recorded. |

#### Named Scenarios

##### RST-001 - Global Restrict honors exact Rage immunity

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-control-token-foundation.js`
- **Test ID:** `TCF-012`
- **Setup:** Gold and Red each own a Garchomp. Gold's exact instance receives Rage Candy Bar.
- **Action:** Resolve species-wide Restrict for Garchomp after computing Rage immunity and Substitute interception.
- **Expected gameplay result:** Gold's Rage-protected instance remains legal while Red's matching instance becomes illegal.
- **Exact assertions:**
  - rageImmuneRosterInstanceIds equals [gold-garchomp].
  - The Restrict resolver returns resolved.
  - battleLegality(gold-garchomp).legal is true.
  - battleLegality(red-garchomp).legal is false.
  - The unused Substitute remains active.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** Does not assert exact Restrict source metadata, duration, inventory consumption, reload, undo, or controller persistence.

##### RST-002 - Instance-scoped Restrict foundation does not become global

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-control-token-foundation.js`
- **Test ID:** `TCF-013`
- **Setup:** Gold and Red each own a Garchomp.
- **Action:** Create a one-Gym submitted-team instance restriction for Gold's exact record.
- **Expected gameplay result:** Only Gold's selected roster instance is illegal.
- **Exact assertions:**
  - The instance restriction returns resolved.
  - battleLegality(gold-garchomp).legal is false.
  - battleLegality(red-garchomp).legal is true.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** This is shared scope infrastructure, not a declaration of the normal Restrict Token.

##### RST-003 - Controller Restrict ordering, exact exemptions, reload, and undo

- **Coverage:** Covered
- **Test level:** Integration
- **Test file:** `scripts/test-token-controller-integration.js`
- **Test ID:** `TCI-004`
- **Setup:** Red's exact Garchomp receives Substitute; a second Red Garchomp and Gold's matching Garchomp remain unprotected.
- **Action:** Declare and resolve Restrict through the controller, persist it to the backend, reload it, and invoke controller undo.
- **Expected gameplay result:** Only the exact substituted instance is exempt; all other matches are illegal; reload and undo preserve exact state.
- **Exact assertions:**
  - The directly affected player receives first response priority.
  - The exact Substitute is consumed and stored in excludedRosterInstanceIds.
  - Other matching instances become illegal.
  - Backend reload preserves the exclusion and consumed attachment.
  - Controller undo removes Restrict, restores Substitute, and restores provisional inventory.
- **Reload tested:** Yes
- **Undo tested:** Yes
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** Full Live Referee multiplayer identity and universal Token lifecycle remain outside this integration scenario.

##### RST-004 - Immunity resolves before Substitute and parent mutation

- **Coverage:** Covered
- **Test level:** Integration
- **Test file:** `scripts/test-token-controller-integration.js`
- **Test ID:** `TCI-003`
- **Setup:** Red's targeted Garchomp has Substitute and Red owns Immunity.
- **Action:** Declare Restrict, confirm Red has response priority, and respond with Immunity.
- **Expected gameplay result:** Immunity negates Restrict before Substitute interception or global mutation.
- **Exact assertions:**
  - The event resolves as negated-by-immunity.
  - No Restrict status or global rule is created.
  - Substitute remains active.
  - Immunity inventory is consumed under the provisional policy.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** Not exercised through the full production Live Referee DOM.

##### RST-RESULT-001 - Structured Immunity negation result

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-token-result-summary.js`
- **Test ID:** `TRS-002`
- **Setup:** Restrict and its responding Immunity have both been confirmed and consumed.
- **Action:** Build the final structured result and compact causal chain.
- **Expected gameplay result:** Immunity is the resolving response, Restrict is negated rather than canceled, no Restrict mutation is created, and both consumptions remain recorded.
- **Exact assertions:**
  - Final outcome is negated and resolvedByEffectId identifies Immunity.
  - Original and responding actors are both retained.
  - The summary says no Restrict was created and both Tokens remain consumed.
  - The compact chain contains the original effect, response, and final result without pass entries.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** Production DOM rendering reads this structure, but this scenario asserts the result module directly.

##### RST-BROWSER-001 - Visible Rage, Restrict, and Unban browser flow

- **Coverage:** Covered
- **Test level:** Browser
- **Test file:** `scripts/test-token-browser.js`
- **Test ID:** `BROWSER-001`
- **Setup:** Open the isolated browser QA screen with Gold and Red owning matching Garchomp.
- **Action:** Click visible Rage Candy Bar and Restrict controls, refresh, use Unban, attempt both protected effects, and refresh again.
- **Expected gameplay result:** The visible legality and status results update after each action and survive refresh without browser errors.
- **Exact assertions:**
  - Gold remains visibly Legal while Red becomes Illegal after Restrict.
  - Restrict count becomes one, then zero after Unban.
  - Unban protection count is one after refresh.
  - Visible Restrict and Extra Ban retries both read Rejected.
  - No uncaught exception, console error, or browser log error is recorded.
- **Reload tested:** Yes
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** Uses the isolated QA screen rather than a full five-player Live Referee session.

##### RST-SANDBOX-001 - Real controller sandbox discard and single authoritative commit

- **Coverage:** Covered
- **Test level:** Integration
- **Test file:** `scripts/test-token-sandbox.js`
- **Test ID:** `TSB-019`
- **Setup:** Seed a real temporary backend at revision one and enter a revision-bound Token Scenario Sandbox.
- **Action:** Resolve Restrict once and discard, then repeat and commit the prepared candidate once.
- **Expected gameplay result:** Discard leaves authoritative state unchanged; commit persists exactly one Restrict mutation with no testing flags.
- **Exact assertions:**
  - Authoritative revision and Token arrays remain unchanged during and after discard.
  - Commit advances the backend exactly one revision.
  - Exactly one Restrict status, consumption, and activation persist.
  - A duplicate session commit is idempotent and creates no duplicate records.
- **Reload tested:** Yes
- **Undo tested:** No
- **Sandbox discard tested:** Yes
- **Sandbox commit tested:** Yes
- **Teambuilder enforcement tested:** No
- **Current gaps:** The universal post-negation consumption ruling remains provisional.

### Arena Trap

- **Token ID:** `arena-trap`
- **Runtime status:** `verifiedComplete`
- **Runtime usability:** `usable` - This Token may be declared through its current runtime flow.
- **Resolver:** `automatic` / `arenaTrap`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Rival Active-roster instance only and currently legal to bring | Covered | TCF-010D, TCI-005, and TCI-005C | None recorded. |
| Badge-supported higher-tier targets remain eligible and preserve their minimum Badge assignment | Covered | TCF-010D | None recorded. |
| Badge-illegal targets fail before mutation or Token consumption | Covered | TCF-010D and TCI-005C | None recorded. |
| Lower-tier target eligibility is independent from compensation | Covered | TCF-010C | None recorded. |
| Immediate draft and Battle Team insertion | Covered | TCF-010 and BROWSER-003 | None recorded. |
| Exact instance required in team | Covered | TCI-005 and BROWSER-003 | None recorded. |
| Same-species replacement does not satisfy it | Covered | TCI-005 and BROWSER-003 | None recorded. |
| Curse targeting blocked | Covered | TCI-005 and BROWSER-003 | None recorded. |
| Same-species other instance not protected | Covered | TCI-005 | None recorded. |
| Expiration at mapped post-battle cleanup | Covered | TCF-010 | None recorded. |
| Full team creates mandatory repair without arbitrary deletion | Covered | TCF-010B | None recorded. |
| Compensation begins at two ordered tier steps below Natural tier and counts Elite tiers | Covered | TCF-010C | None recorded. |
| Target owner chooses one approved Ability or injectable move | Covered | TCF-010E, TCI-005B, and BROWSER-003 | None recorded. |
| Shared injection bans and class-only explicit overrides | Covered | TCF-010F | None recorded. |
| Pending compensation blocks Team Lock | Covered | TCI-005B and BROWSER-003 | None recorded. |
| Exact-instance grant appears in the generated set | Covered | TCF-010E, TCI-005B, and BROWSER-003 | None recorded. |
| Exact-instance result names owner, duplicate slot, and compensation state | Covered | TRS-001 and TRS-001B | None recorded. |
| Reload | Covered | TCF-010E, TCI-005, TCI-005B, and BROWSER-003 | None recorded. |
| Undo | Covered | TCF-010E, TCI-005, and TCI-005B | None recorded. |
| Stale confirmed declaration cancels and refunds before mutation | Covered | TCI-008 | None recorded. |
| Sandbox discard | Covered | TCF-016B and TSB-020 | None recorded. |
| Sandbox commit exactly once | Covered | TCF-016B and TSB-020 | None recorded. |

#### Named Scenarios

##### ART-001 - Exact Arena Trap attachment and Battle Results expiration

- **Coverage:** Partially Covered
- **Test level:** Unit
- **Test file:** `scripts/test-control-token-foundation.js`
- **Test ID:** `TCF-010`
- **Setup:** Gold acts with an owned Garchomp, rival Red's Lucario, and another rival Pokemon available.
- **Action:** Attempt a self target, trap Red's Lucario, query exact statuses, and enter Battle Results cleanup.
- **Expected gameplay result:** Self targeting fails; only Red's Lucario is trapped and that status expires at Battle Results.
- **Exact assertions:**
  - Self target returns noEffect.
  - Rival target returns resolved with rosterInstance scope and mustBeBrought true.
  - pokemonHasArenaTrap is true for red-lucario and false for red-garchomp.
  - Cleanup expires exactly the created status ID.
  - The target is no longer trapped at battle-results.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** Unit resolver evidence only; controller and browser behavior is covered separately.

##### ART-001B - Full team enters mandatory Arena Trap repair

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-control-token-foundation.js`
- **Test ID:** `TCF-010B`
- **Setup:** Red has a full six-member draft and a seventh exact rival Pokemon is targeted by Arena Trap.
- **Action:** Resolve Arena Trap against the unselected seventh Pokemon.
- **Expected gameplay result:** The exact target is inserted as a seventh temporary selection and a one-removal repair is created without deleting an existing member.
- **Exact assertions:**
  - All six previous selections remain in their original order.
  - The trapped exact instance is inserted as the seventh selection.
  - Repair requires removal of one unlocked member and lists the trapped instance as forced.
  - The linked Battle Team also contains seven members until repair.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** Yes
- **Current gaps:** The production repair picker is wired but not driven by this Unit test.

##### ART-002 - Controller declaration, validators, Curse gate, reload, cleanup, and undo

- **Coverage:** Covered
- **Test level:** Integration
- **Test file:** `scripts/test-token-controller-integration.js`
- **Test ID:** `TCI-005`
- **Setup:** Steevee owns three Arena Trap records; rival Red has two same-species Active instances and one Legacy instance.
- **Action:** Attempt illegal targets, trap one exact Active instance, execute both validators and Curse checks, reload, clean up, and undo.
- **Expected gameplay result:** Illegal declarations consume nothing; only the exact trapped record satisfies both team validators and receives Curse protection.
- **Exact assertions:**
  - Own and non-Active targets fail before consumption or activation.
  - Both draft and locked-team validators require the exact ID.
  - Same-species replacement fails.
  - Curse is blocked only on the trapped instance.
  - Backend reload preserves enforcement; cleanup and undo each remove the obligation.
- **Reload tested:** Yes
- **Undo tested:** Yes
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** Yes
- **Current gaps:** A real Battle Results phase click is represented by the mapped cleanup function, not the full Battle Phase UI.

##### ART-002B - Mandatory compensation, exact generated-set grant, reload, and root undo

- **Coverage:** Covered
- **Test level:** Integration
- **Test file:** `scripts/test-token-controller-integration.js`
- **Test ID:** `TCI-005B`
- **Setup:** Red already has one Pokemon in a saved build/team, and the exact Arena Trap target is two ordered Battle Tier steps below the Natural tier.
- **Action:** Resolve Arena Trap, attempt Team Lock, let Red choose Recover for move slot 3, reload, then undo the root Arena activation.
- **Expected gameplay result:** Team Lock remains blocked until Red chooses; Recover belongs only to the trapped instance and its generated set, then reloads and undoes with Arena Trap.
- **Exact assertions:**
  - The compensation record begins pending and Team Lock reports the unresolved choice.
  - Only the target owner may complete the choice.
  - The structured move grant identifies the exact roster instance and source Arena status.
  - The generated set contains Recover in the selected slot.
  - Reload preserves both grant and set; root undo removes the status/grant and restores the complete pre-Arena build and Battle Team.
- **Reload tested:** Yes
- **Undo tested:** Yes
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** Yes
- **Current gaps:** The normal multiplayer Live Referee screen is wired but represented here by controller/result-level evidence and the isolated browser scenario.

##### ART-002C - Badge-illegal target rejection before consumption

- **Coverage:** Covered
- **Test level:** Integration
- **Test file:** `scripts/test-token-controller-integration.js`
- **Test ID:** `TCI-005C`
- **Setup:** Red lacks the Badge capacity required to bring the selected higher-tier Active-roster Pokemon.
- **Action:** Attempt to declare Arena Trap on that exact instance.
- **Expected gameplay result:** The declaration fails closed before creating an activation or consuming Arena Trap.
- **Exact assertions:**
  - The authoritative bring-legality reason names insufficient Badge capacity.
  - Arena Trap inventory is unchanged.
  - No activation record is created.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** This focused test injects the authoritative legality result; production app parity is also statically wired through the shared controller.

##### ART-LIFECYCLE-001 - Stale confirmed target cancels and refunds

- **Coverage:** Covered
- **Test level:** Integration
- **Test file:** `scripts/test-token-controller-integration.js`
- **Test ID:** `TCI-008`
- **Setup:** Declare Arena Trap on a legal rival Active-roster instance, then move that instance to Legacy before resolution.
- **Action:** Resolve the saved pending event and reload the temporary authoritative backend.
- **Expected gameplay result:** Current legality wins: no Arena status is created, the event is canceled, and the exact consumed Token is refunded.
- **Exact assertions:**
  - Resolution returns systemFailure with refunded true.
  - Event status is canceled with canceledRefunded outcome.
  - Inventory returns to its pre-declaration count.
  - No Arena Trap status exists after reload.
- **Reload tested:** Yes
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** The same controller revalidation helper is used by the production Live Referee route.

##### ART-REGISTRY-001 - Shared customization registry and source-specific overrides

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-control-token-foundation.js`
- **Test ID:** `TCF-010F`
- **Setup:** Evaluate banned and legal Ability/move injections from Token and Trainer Class sources.
- **Action:** Check Wonder Guard, Last Respects, Levitate, and a class-specific Wonder Guard allowlist.
- **Expected gameplay result:** Generic injections obey the shared bans; only an explicit matching Trainer Class allowlist overrides one ban; natural access is unchanged.
- **Exact assertions:**
  - Wonder Guard and Last Respects are rejected for Token injection.
  - Levitate is legal.
  - A matching explicit Trainer Class allowlist permits its named exception only.
  - Natural Ability and move data are not rewritten by the injection registry.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** Future customization sources must opt into this shared registry and provide explicit source metadata.

##### ART-BROWSER-003 - Visible Arena Trap team and Curse enforcement

- **Coverage:** Covered
- **Test level:** Browser
- **Test file:** `scripts/test-token-browser.js`
- **Test ID:** `BROWSER-003`
- **Setup:** Open the isolated browser scenario with two Red Garchomp roster instances.
- **Action:** Click Use Arena Trap on the first instance and refresh after completing the combined scenario.
- **Expected gameplay result:** The visible exact team is blocked until Red chooses Recover, then accepted; same-species replacement remains rejected and Curse remains blocked after refresh.
- **Exact assertions:**
  - Exact team first reads Blocked and compensation reads Choice required.
  - After Red chooses, compensation reads Move: Recover and the generated set reads Recover.
  - Exact team accepted then reads Yes.
  - Same-species replacement reads Rejected.
  - Curse on trapped target reads Blocked.
  - Draft and Battle Team ownership both read Inserted.
  - Exact slot lock reads Locked.
  - All results survive backend refresh without browser errors.
- **Reload tested:** Yes
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** Yes
- **Current gaps:** Battle Results cleanup is covered in Unit and Integration evidence, not this Browser scenario.

##### ART-RESULT-001 - Exact-instance Arena Trap result presentation

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-token-result-summary.js`
- **Test ID:** `TRS-001`
- **Setup:** One owner has duplicate matching Pokemon and Arena Trap resolved on the second Active-roster instance.
- **Action:** Build the final result summary, cards, and announcement.
- **Expected gameplay result:** The result names the exact owner, Pokemon, and duplicate slot without implying species-wide application or exposing an internal ID.
- **Exact assertions:**
  - Target presentation is owner plus Pokemon plus Active-roster slot.
  - Application scope remains rosterInstance.
  - Announcement describes forced team insertion, removal lock, and Curse protection.
  - No raw roster-instance ID appears in player-facing text.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** Yes
- **Current gaps:** The result module is asserted directly; production Live Referee rendering is covered by the app wiring and remains a multiplayer smoke-test target.

##### ART-RESULT-001B - Completed Arena Trap compensation result presentation

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-token-result-summary.js`
- **Test ID:** `TRS-001B`
- **Setup:** The target owner completed Arena Trap compensation with Ability: Levitate.
- **Action:** Build the final result summary and compact announcement.
- **Expected gameplay result:** The result identifies the exact granted customization without describing a generic tier or BST buff.
- **Exact assertions:**
  - The announcement says the target gained Ability: Levitate.
  - The Compensation card shows Ability: Levitate.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** Yes
- **Current gaps:** The move-grant variant is exercised by TCI-005B and BROWSER-003.

##### ART-SANDBOX-001 - Arena Trap team ownership sandbox discard and idempotent commit

- **Coverage:** Covered
- **Test level:** Integration
- **Test file:** `scripts/test-token-sandbox.js`
- **Test ID:** `TSB-020`
- **Setup:** Seed a temporary backend, then resolve Arena Trap inside separate discard and commit sandbox sessions.
- **Action:** Discard the first Arena mutation, commit the second once, and replay the same commit request.
- **Expected gameplay result:** Discard restores the original team exactly; commit persists one exact slot, status, activation, and consumption without duplication.
- **Exact assertions:**
  - Discard restores baseline Teambuilder, Battle Team, status, and consumption state.
  - Commit persists one exact draft slot and one exact Battle Team member.
  - One linked lock status, activation, and consumption persist.
  - Duplicate session commit is idempotent at the same backend revision.
- **Reload tested:** Yes
- **Undo tested:** No
- **Sandbox discard tested:** Yes
- **Sandbox commit tested:** Yes
- **Teambuilder enforcement tested:** Yes
- **Current gaps:** This sandbox scenario covers the forced team mutation; compensation sandbox isolation is covered separately by TCF-016B.

##### ART-SANDBOX-002 - Arena Trap compensation sandbox discard and commit isolation

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-control-token-foundation.js`
- **Test ID:** `TCF-016B`
- **Setup:** Run one move-compensation choice in a discarded sandbox and one Ability choice in a committed sandbox.
- **Action:** Discard the first working clone, then prepare and complete the second commit.
- **Expected gameplay result:** Discard leaves real state untouched; commit candidate contains the exact linked Arena status and Levitate effect grant.
- **Exact assertions:**
  - Discard does not leak a move grant or status into real state.
  - The commit candidate records Levitate on the Arena customization payload.
  - Only the exact trapped Pokemon receives the linked Ability grant.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** Yes
- **Sandbox commit tested:** Yes
- **Teambuilder enforcement tested:** Yes
- **Current gaps:** Backend idempotent commit behavior remains covered by TSB-020.

### Cold Wave

- **Token ID:** `cold-wave`
- **Runtime status:** `partial`
- **Runtime usability:** `usable` - Cold Wave creates a same-Gym suppression record. Runtime effect checks ignore only records explicitly marked isOngoingEffect while preserving their state and expiration.
- **Resolver:** `automatic` / `ongoingEffectSuppression`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Suppress only records explicitly classified as ongoing effects without deleting, mutating, reviving, or rescheduling them | Partially Covered | STR-003 | Controller declaration, backend reload, and undo are covered by TCI-014. Production-browser display and behavior gating for every future ongoing-effect consumer remain unverified. |
| Controller declaration, persistence, and undo | Covered | TCI-014 | None recorded. |
| Production browser lifecycle | Not Covered | None | A destructive production-browser scenario has not been approved for this slice. |
| Refresh and administrative undo | Not Covered | None | The pure resolver snapshot is covered where applicable; the production UI lifecycle still needs focused evidence. |

#### Named Scenarios

##### COLD-WAVE-SETTLED-001 - Suppress only records explicitly classified as ongoing effects without deleting, mutating, reviving, or rescheduling them

- **Coverage:** Partially Covered
- **Test level:** Unit
- **Test file:** `scripts/test-settled-token-rulings.js`
- **Test ID:** `STR-003`
- **Setup:** Create the smallest isolated state required by the settled mechanic contract.
- **Action:** Run the pure resolver or contract-safety boundary.
- **Expected gameplay result:** Explicit ongoing records are suppressed through Gym end; duration-only and ordinary records remain active.
- **Exact assertions:**
  - Only isOngoingEffect records are selected.
  - Source records remain present and unchanged.
  - The suppression record has a Gym-end boundary.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** Controller declaration, backend reload, and undo are covered by TCI-014. Production-browser display and behavior gating for every future ongoing-effect consumer remain unverified.

##### COLD-WAVE-INTEGRATION-001 - Suppress only records explicitly classified as ongoing effects without deleting, mutating, reviving, or rescheduling them through the scenario controller

- **Coverage:** Covered
- **Test level:** Integration
- **Test file:** `scripts/test-token-controller-integration.js`
- **Test ID:** `TCI-014`
- **Setup:** Declare the owned exact Token through the scenario controller and persist the result through a temporary backend.
- **Action:** Resolve, reload, verify the authoritative effect record, and undo the exact activation.
- **Expected gameplay result:** The owned Token declares and resolves once, only explicit ongoing records are suppressed after backend reload, and undo restores the Token without mutating source records.
- **Exact assertions:**
  - Duration-only records remain unsuppressed.
  - The exact source status remains active.
  - Reload preserves suppression.
  - Undo removes suppression and restores the exact Token.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** Controller declaration, backend reload, and undo are covered by TCI-014. Production-browser display and behavior gating for every future ongoing-effect consumer remain unverified.

### Clear Smog

- **Token ID:** `clear-smog`
- **Runtime status:** `partial`
- **Runtime usability:** `usable` - This Token may be declared through its current runtime flow.
- **Resolver:** `automatic` / `clearSmog`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Removes structured Rage stat buffs | Covered | TCI-006 and BROWSER-003 | None recorded. |
| Removes exact-instance move grants | Covered | TCI-006 and BROWSER-003 | None recorded. |
| Removes buff labels | Covered | TCI-006 | None recorded. |
| Does not affect another instance | Covered | TCI-006 | None recorded. |
| Does not damage natural roster data | Covered | TCI-006 | None recorded. |
| Does not delete player-wide class/perk state | Covered | TCI-006 | None recorded. |
| Reload | Covered | TCI-006 and BROWSER-003 | None recorded. |
| Undo | Covered | TCI-006 | None recorded. |

#### Named Scenarios

##### CSM-001 - Selected-instance buffs and grants are cleared in isolation

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-control-token-foundation.js`
- **Test ID:** `TCF-011`
- **Setup:** Gold's Garchomp has a clearable level buff, permanent buff labels, one pending label, and an exact move grant; another record has an unrelated grant.
- **Action:** Resolve Clear Smog on gold-garchomp.
- **Expected gameplay result:** Clearable selected-instance state is removed while pending and unrelated records remain.
- **Exact assertions:**
  - Resolver returns resolved.
  - The selected effectBuff status becomes removed.
  - Selected visible buffs become exactly [TM Move Pending].
  - The selected exact move grant becomes removed and inactive.
  - The unrelated move grant remains active.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** No real Rage source, natural roster fields, player-wide class/perk state, reload, undo, UI, or inventory assertion.

##### CSM-002 - Controller Clear Smog after real Rage

- **Coverage:** Covered
- **Test level:** Integration
- **Test file:** `scripts/test-token-controller-integration.js`
- **Test ID:** `TCI-006`
- **Setup:** Resolve Rage on Gold's Garchomp and add exact, unrelated, class-wide, and perk-wide move grants.
- **Action:** Resolve Clear Smog, persist/reload the result, and invoke controller undo.
- **Expected gameplay result:** Only selected-instance clearable records and labels are removed; natural and player-wide records survive.
- **Exact assertions:**
  - Exact +3 and +252 Rage buff records become removed.
  - The exact move grant is removed while the unrelated grant remains active.
  - Natural level, base stats, ability, moves, owner, roster, origin, class, and perk fields are unchanged.
  - Backend reload preserves removal and undo restores only the removed exact records.
- **Reload tested:** Yes
- **Undo tested:** Yes
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** Final classification of every future class/perk grant still depends on those effect contracts.

##### CSM-BROWSER-003 - Visible Clear Smog selected-instance result

- **Coverage:** Covered
- **Test level:** Browser
- **Test file:** `scripts/test-token-browser.js`
- **Test ID:** `BROWSER-003`
- **Setup:** Use visible controls to apply Rage and an exact move grant to Gold's Garchomp.
- **Action:** Click Use Clear Smog and refresh persisted backend state.
- **Expected gameplay result:** Visible active Rage buffs become zero and the exact move grant reads removed while immunity remains active.
- **Exact assertions:**
  - Rage buff count changes from two to zero.
  - Exact move grant changes from active to removed.
  - Restrict immunity remains Active under the approved current behavior.
  - Results survive refresh without browser errors.
- **Reload tested:** Yes
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** The browser board does not enumerate every preserved natural field; Integration evidence does.

### Rage Candy Bar

- **Token ID:** `rage-candy-bar`
- **Runtime status:** `partial`
- **Runtime usability:** `usable` - This Token may be declared through its current runtime flow.
- **Resolver:** `automatic` / `utilityEffect`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Owned target only | Not Covered | None | The current test uses a legal owner but never attempts an illegal owner. |
| +3 levels | Covered | TCI-006 | None recorded. |
| +252 EV cap | Covered | TCI-006 | None recorded. |
| Restrict immunity | Covered | TCI-004 and BROWSER-001 | None recorded. |
| Shared two-Gym duration | Covered | TCF-014 | None recorded. |
| Reuse adds two Gyms | Covered | TCF-014 | None recorded. |
| Bonuses do not stack | Covered | TCF-014 | None recorded. |
| Full enhancement expires together | Covered | TCF-014 | None recorded. |
| Clear Smog removes stat buffs correctly | Covered | TCI-006 and BROWSER-003 | None recorded. |
| Reload | Covered | TCI-006 and BROWSER-003 | None recorded. |
| Undo | Not Covered | None | None recorded. |

#### Named Scenarios

##### RCB-001 - Shared Rage enhancement extends without stacking

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-control-token-foundation.js`
- **Test ID:** `TCF-014`
- **Setup:** Gold owns one Garchomp at Kanto Gym 1.
- **Action:** Resolve Rage Candy Bar, resolve it again at Gym 2, then advance to its start-of-Gym expiration.
- **Expected gameplay result:** One composite status lasts two Gyms, reuse extends it to four without duplicate buffs, and all benefits expire together.
- **Exact assertions:**
  - Initial durationGyms is 2.
  - Exactly two non-permanent buffs reference the same sourceStatusId.
  - Reuse reports extended and keeps the same status ID.
  - Extended durationGyms is 4 and the buff count remains 2.
  - At Gym 5 Restrict immunity is false, both buffs are expired, and visible buff labels are empty.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** Exact +3 and +252 values, inventory delta, reload, undo, and controller persistence are not asserted.

##### RCB-002 - Rage immunity precedes Substitute interception

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-control-token-foundation.js`
- **Test ID:** `TCF-012`
- **Setup:** Gold's Garchomp has Rage Candy Bar and an active Substitute; Red owns a matching Garchomp.
- **Action:** Declare species-wide Restrict.
- **Expected gameplay result:** Rage immunity exempts Gold before Substitute is considered, preserving the Substitute.
- **Exact assertions:**
  - rageImmuneRosterInstanceIds equals [gold-garchomp].
  - Gold's Substitute status remains active.
  - Gold is legal and Red is illegal after Restrict.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** No Live Referee or persisted inventory assertion.

##### RCB-003 - Real Rage enhancement before Clear Smog

- **Coverage:** Covered
- **Test level:** Integration
- **Test file:** `scripts/test-token-controller-integration.js`
- **Test ID:** `TCI-006`
- **Setup:** Resolve Rage Candy Bar through the controller, then add exact and player-wide move grants.
- **Action:** Resolve Clear Smog, save/reload backend state, and undo Clear Smog.
- **Expected gameplay result:** The exact +3/+252 records are removed and restored precisely without deleting the timed immunity status or unrelated data.
- **Exact assertions:**
  - Rage creates levelBonus 3 and evCapBonus 252 records.
  - Clear Smog removes both exact records and the exact move grant.
  - Restrict immunity remains active under the approved composite-status behavior.
  - Backend reload preserves removal and controller undo restores exact benefits.
- **Reload tested:** Yes
- **Undo tested:** Yes
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** Rage activation itself is not undone in this scenario.

##### RCB-BROWSER-001 - Visible Rage legality and Clear Smog results

- **Coverage:** Covered
- **Test level:** Browser
- **Test file:** `scripts/test-token-browser.js`
- **Test ID:** `BROWSER-003`
- **Setup:** Open the isolated Arena Trap and Clear Smog browser scenario.
- **Action:** Click Rage Candy Bar, then Clear Smog, and refresh backend state.
- **Expected gameplay result:** Two active Rage stat buffs become zero while visible Restrict immunity remains Active.
- **Exact assertions:**
  - The visible Rage buff count is two before Clear Smog.
  - The visible Rage buff count is zero after Clear Smog and refresh.
  - Restrict immunity remains visibly Active.
  - No browser errors are recorded.
- **Reload tested:** Yes
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** No final production HUD duration countdown is asserted.

### Lingering Aroma

- **Token ID:** `lingering-aroma`
- **Runtime status:** `partial`
- **Runtime usability:** `usable` - Lingering Aroma selects an exact benefiting ongoing-effect record, replaces its behavior without extending it, and atomically charges confirmed outside targeting declarations.
- **Resolver:** `automatic` / `ongoingEffectTextReplacement`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Replace one exact benefiting ongoing effect for its remaining lifetime and charge outside confirmed targeting declarations $500 once | Partially Covered | STR-004 | The pure resolver and declaration-cost hooks are covered; a destructive production browser scenario for withdrawal, later negation, refresh, and History undo remains outstanding. |
| Production browser lifecycle | Not Covered | None | A destructive production-browser scenario has not been approved for this slice. |
| Refresh and administrative undo | Not Covered | None | The pure resolver snapshot is covered where applicable; the production UI lifecycle still needs focused evidence. |

#### Named Scenarios

##### LINGERING-AROMA-SETTLED-001 - Replace one exact benefiting ongoing effect for its remaining lifetime and charge outside confirmed targeting declarations $500 once

- **Coverage:** Partially Covered
- **Test level:** Unit
- **Test file:** `scripts/test-settled-token-rulings.js`
- **Test ID:** `STR-004`
- **Setup:** Create the smallest isolated state required by the settled mechanic contract.
- **Action:** Run the pure resolver or contract-safety boundary.
- **Expected gameplay result:** The original effect stops applying without deletion; the replacement inherits its boundary; confirmed outside declarations transfer one $500 cost and duplicate targeting does not charge twice.
- **Exact assertions:**
  - The original record is suppressed rather than removed.
  - The replacement points to the exact original record.
  - The beneficiary receives $500 once per declaration.
  - The replacement expires with the original effect.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** The pure resolver and declaration-cost hooks are covered; a destructive production browser scenario for withdrawal, later negation, refresh, and History undo remains outstanding.

### Wicked Blow

- **Token ID:** `wicked-blow`
- **Runtime status:** `partial`
- **Runtime usability:** `usable` - This Token may be declared through its current runtime flow.
- **Resolver:** `automatic` / `wickedBlow`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Own or rival exact Active Roster target | Covered | TCF-031 and TCI-012 | None recorded. |
| No current Battle Phase team required | Covered | TCF-030, TCI-012, and BROWSER-005 | None recorded. |
| Reserve, Released, Daycare/facility, Temporary, and other non-Active records rejected | Covered | TCI-012 | None recorded. |
| Duplicate species remain exact-ID targets | Covered | TCF-031 and TCI-012 | None recorded. |
| Existing exact-ID team and Teambuilder references remain coherent without creating membership | Covered | TCF-031, TCI-012, and BROWSER-005 | None recorded. |
| Canonical three-ordered-tier reroll and acquisition replacement | Covered | TCF-030, TCI-012, and TRS-009 | None recorded. |
| Production evolution-data hydration before target eligibility | Covered | BROWSER-007 | None recorded. |
| Preview is mutation-free and does not consume | Covered | TCI-012 | None recorded. |
| Stale target cancels and refunds | Covered | TCI-012 | None recorded. |
| Reload, duplicate completion, and undo | Covered | TCI-012 and BROWSER-005 | None recorded. |
| Sandbox discard | Covered | TSB-022 | None recorded. |

#### Named Scenarios

##### WICKED-UNIT-001 - Exact Active Roster replacement and optional reference coherence

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-control-token-foundation.js`
- **Test ID:** `TCF-031`
- **Setup:** Duplicate exact roster records exist; one target has current-team, locked-slot, and Teambuilder references, while another legal Active Roster target has no Battle Team.
- **Action:** Resolve Wicked Blow against each exact target.
- **Expected gameplay result:** Only the selected stable roster record changes; existing exact-ID mirrors update; the no-team case stays without a Battle Team.
- **Exact assertions:**
  - The selected stable ID becomes Barbaracle.
  - The duplicate record is unchanged.
  - Existing exact-ID mirrors update.
  - An empty battleTeams object remains empty.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** Yes
- **Current gaps:** The unresolved mixed-tier branched-family ruling still fails closed.

##### WICKED-INTEGRATION-001 - Active Roster legality, refresh, undo, and stale refund

- **Coverage:** Covered
- **Test level:** Integration
- **Test file:** `scripts/test-token-controller-integration.js`
- **Test ID:** `TCI-012`
- **Setup:** Own and rival Active Roster targets, duplicate species, non-Active records, an optional current team, and an isolated backend are available.
- **Action:** Preview, resolve with and without a team, reload, reject duplicate completion, undo, and make a separate confirmed target stale.
- **Expected gameplay result:** Both owners' Active Roster Pokemon are legal; non-Active records are rejected; exact replacement persists and undoes; stale resolution refunds once.
- **Exact assertions:**
  - Preview changes no state or inventory.
  - Own and rival no-team targets resolve.
  - A Reserve record remains illegal even when stale-linked to a team.
  - Reload and undo preserve exact identity.
  - Stale Active Roster membership refunds.
- **Reload tested:** Yes
- **Undo tested:** Yes
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** Yes
- **Current gaps:** The unresolved mixed-tier branched-family ruling still fails closed.

##### WICKED-RESULT-001 - Exact reroll announcement

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-token-result-summary.js`
- **Test ID:** `TRS-009`
- **Setup:** A stable-ID reroll operation records owner, old species, replacement, and tier calculation.
- **Action:** Build the final causal announcement.
- **Expected gameplay result:** The result names the exact owner, old species, replacement, and ordered tier movement.
- **Exact assertions:**
  - Title names the actor, owner, and original Pokemon.
  - Cards show original, replacement, and tier roll.
  - The exact target ID remains in the operation.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** No additional result gap is known for the covered automatic path.

##### WICKED-BROWSER-007 - Production selector waits for canonical evolution data

- **Coverage:** Covered
- **Test level:** Browser
- **Test file:** `scripts/test-token-browser.js`
- **Test ID:** `BROWSER-007`
- **Setup:** The production page begins without the lazy Pokemon build-data asset loaded and has ordinary plus mixed-tier branched Active Roster targets.
- **Action:** Open Wicked Blow immediately, await the production asset, evaluate targets, and resolve the ordinary target.
- **Expected gameplay result:** A loading state becomes a legal exact-target selector automatically; mixed-tier ambiguity remains blocked; the canonical resolver completes normally.
- **Exact assertions:**
  - No target is disabled merely for pending data.
  - The production asset URL loads.
  - Garchomp becomes selectable without reopening.
  - Eevee remains safely blocked.
  - Resolution preserves the stable ID and creates one operation with no browser errors.
- **Reload tested:** Yes
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** Yes
- **Current gaps:** The unresolved mixed-tier branched-family ruling still fails closed.

##### WICKED-BROWSER-005 - No-team Active Roster replacement survives refresh

- **Coverage:** Covered
- **Test level:** Browser
- **Test file:** `scripts/test-token-browser.js`
- **Test ID:** `BROWSER-005`
- **Setup:** Red's second Garchomp is in the Active Roster and Teambuilder but is not on the current Battle Team.
- **Action:** Use Wicked Blow and refresh the isolated browser scenario.
- **Expected gameplay result:** The exact Active Roster record and existing Teambuilder mirror become Barbaracle without adding Battle Team membership.
- **Exact assertions:**
  - Stable ID remains unchanged.
  - Roster and build show Barbaracle.
  - Battle Team reports Not added before and after refresh.
  - One reroll operation persists with no browser errors.
- **Reload tested:** Yes
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** Yes
- **Current gaps:** The production multiplayer presentation still benefits from manual group testing.

##### WICKED-SANDBOX-022 - Sandbox discard restores the exact Active Roster record

- **Coverage:** Covered
- **Test level:** Integration
- **Test file:** `scripts/test-token-sandbox.js`
- **Test ID:** `TSB-022`
- **Setup:** An Active Roster target with a Teambuilder mirror and no Battle Team is cloned into a sandbox.
- **Action:** Resolve Wicked Blow in the working clone, then discard.
- **Expected gameplay result:** Sandbox state changes only the exact clone; discard restores Garchomp, its set, and the empty Battle Team state.
- **Exact assertions:**
  - Working clone becomes Barbaracle.
  - Authoritative baseline bytes remain unchanged.
  - Discard restores Garchomp and Dragon Claw.
  - No reroll operation remains.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** Yes
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** Yes
- **Current gaps:** Wicked Blow does not yet have its own persisted sandbox commit case; shared commit idempotency infrastructure is covered elsewhere.

### Extra Ban

- **Token ID:** `extra-ban-token`
- **Runtime status:** `partial`
- **Runtime usability:** `usable` - This Token may be declared through its current runtime flow.
- **Resolver:** `automatic` / `extraBan`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Selected roster instance retained as declaration anchor | Covered | TCF-009 | None recorded. |
| Global species scope | Covered | TCF-009 | None recorded. |
| Unban protection blocks it | Covered | TCI-001 | None recorded. |
| Selected Substitute fully negates it | Covered | TCF-007 | None recorded. |
| Other matching Substitutes remain | Covered | TCF-007 | None recorded. |
| Current-phase repeat-Ban protection created | Covered | TCF-006 | None recorded. |
| Reload | Covered | BROWSER-002 | None recorded. |
| Undo | Covered | BROWSER-002 | None recorded. |

#### Named Scenarios

##### XBN-001 - Selected anchor produces a universal species Ban

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-control-token-foundation.js`
- **Test ID:** `TCF-009`
- **Setup:** Gold and Red each own Garchomp; Gold's exact record is selected.
- **Action:** Resolve Extra Ban.
- **Expected gameplay result:** The status retains Gold's selected record and Garchomp species while making all matching records illegal.
- **Exact assertions:**
  - Resolver returns resolved.
  - selectedTargetType is rosterInstance.
  - selectedRosterInstanceId is gold-garchomp.
  - selectedSpeciesId is garchomp.
  - applicationScope is globalSpecies.
  - Both Gold's and Red's Garchomp are illegal.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** No Unban-protection, inventory, controller persistence, or browser assertion.

##### XBN-002 - Selected Substitute negates universal Ban

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-control-token-foundation.js`
- **Test ID:** `TCF-007`
- **Setup:** Two matching Garchomp records each have Substitute.
- **Action:** Ban one selected record, reload and undo, then reverse the selected target.
- **Expected gameplay result:** Only the selected Substitute is consumed and the entire Ban is negated.
- **Exact assertions:**
  - negateEntireEffect is true.
  - Only the selected attachment ID is consumed.
  - The unselected attachment remains active.
  - No active species Ban exists.
  - Reload preserves and undo restores exact attachment state.
  - Reversing selection reverses consumption.
- **Reload tested:** No
- **Undo tested:** Yes
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** Unit serialization is not backend reload evidence; controller and Browser evidence is recorded separately.

##### XBN-003 - Ban interception creates phase-scoped repeat protection

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-control-token-foundation.js`
- **Test ID:** `TCF-006`
- **Setup:** Gold's selected Garchomp has Substitute.
- **Action:** Attempt a selected-anchor global Ban in Action Phase.
- **Expected gameplay result:** The Ban is negated and Garchomp receives protection only for the current phase.
- **Exact assertions:**
  - negateEntireEffect is true.
  - Exactly one Substitute is consumed and one protection status is created.
  - No active Garchomp Ban exists.
  - Ban protection is true in Action and false in Shop.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** Does not attempt a second Extra Ban through the resolver.

##### XBN-BROWSER-002 - Visible selected-anchor interception, refresh, and undo

- **Coverage:** Covered
- **Test level:** Browser
- **Test file:** `scripts/test-token-browser.js`
- **Test ID:** `BROWSER-002`
- **Setup:** Red and Gold each attach Substitute to matching Garchomp through visible controls.
- **Action:** Click Extra Ban targeting Red, refresh, click undo, and refresh again.
- **Expected gameplay result:** Only the selected attachment is consumed, the universal Ban is absent, and undo restores the selected attachment.
- **Exact assertions:**
  - Red's attachment is consumed and Gold's remains active.
  - Active species Ban count is zero.
  - Current-phase protection count is one before undo.
  - Both attachments are active after undo and refresh without browser errors.
- **Reload tested:** Yes
- **Undo tested:** Yes
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** The repeat-Ban attempt itself remains covered by Unit/controller legality rather than a second Browser click.

### Unban

- **Token ID:** `unban-token`
- **Runtime status:** `partial`
- **Runtime usability:** `usable` - This Token may be declared through its current runtime flow.
- **Resolver:** `automatic` / `statusEffect`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Removes Restrict | Covered | TCI-001 and BROWSER-001 | None recorded. |
| Removes Ban | Covered | TCI-002 | None recorded. |
| Creates six-Gym protection | Covered | TCI-001 and BROWSER-001 | None recorded. |
| Blocks new Restrict | Covered | TCI-001 | None recorded. |
| Blocks new Extra Ban | Covered | TCI-001 | None recorded. |
| Mirrored status expires with structured protection | Covered | TCI-001 | None recorded. |
| Reload | Covered | TCI-001 and BROWSER-001 | None recorded. |
| Undo | Covered | TCI-001 | None recorded. |

#### Named Scenarios

##### UNB-001 - Restrict removal, protection, mirror expiration, reload, and undo

- **Coverage:** Covered
- **Test level:** Integration
- **Test file:** `scripts/test-token-controller-integration.js`
- **Test ID:** `TCI-001`
- **Setup:** Resolve a sourced two-Gym Garchomp Restrict, then declare Unban through the controller.
- **Action:** Assert the result, reject protected redeclarations, persist/reload, undo, and advance to the six-Gym expiration.
- **Expected gameplay result:** Unban creates one structured protection and one linked mirror that block both effect families and expire together.
- **Exact assertions:**
  - Restrict is removed and all matching Garchomp become legal.
  - Exactly one six-Gym protection and linked Unbanned mirror exist.
  - Restrict and Extra Ban fail before consumption while unrelated species remain targetable.
  - Backend reload preserves source linkage.
  - Undo restores Restrict and provisional inventory; expiration normalizes the mirror with the same status ID.
- **Reload tested:** Yes
- **Undo tested:** Yes
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** Final universal inventory handling after all negation/cancellation outcomes remains unsettled.

##### UNB-002 - Universal Ban removal uses the same protection contract

- **Coverage:** Covered
- **Test level:** Integration
- **Test file:** `scripts/test-token-controller-integration.js`
- **Test ID:** `TCI-002`
- **Setup:** Resolve Extra Ban on Lucario without Substitute interception.
- **Action:** Declare and resolve Unban for Lucario.
- **Expected gameplay result:** The universal Ban is removed and the same six-Gym species protection is created.
- **Exact assertions:**
  - The Ban status ID is listed in removedStatusIds.
  - All matching Lucario become legal.
  - Exactly one Unban protection remains active.
  - The global mirror status is Unbanned.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** No separate full Live Referee browser path starts from Ban in this scenario.

##### UNB-BROWSER-001 - Visible Unban result and backend refresh

- **Coverage:** Covered
- **Test level:** Browser
- **Test file:** `scripts/test-token-browser.js`
- **Test ID:** `BROWSER-001`
- **Setup:** Use the isolated QA screen to apply Rage and Restrict to matching Garchomp.
- **Action:** Click Use Unban, click Try Protected Effects, and refresh the browser from the persisted backend revision.
- **Expected gameplay result:** Both matching Pokemon are visibly legal and one Unban protection remains after refresh.
- **Exact assertions:**
  - Visible Restrict count changes from one to zero.
  - Visible Unban protection count changes to one.
  - Both legality rows read Legal after refresh.
  - Restrict and Extra Ban retries both read Rejected.
  - No browser errors are recorded.
- **Reload tested:** Yes
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** The isolated screen does not prove a real multiplayer account-to-profile authorization path.

### Incinerate

- **Token ID:** `incinerate`
- **Runtime status:** `verifiedComplete`
- **Runtime usability:** `usable` - This Token may be declared through its current runtime flow.
- **Resolver:** `automatic` / `utilityEffect`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Independent exact Item or TM selection per eligible rival, excluding Master Ball | Covered | TCF-026, TCF-027, TCF-027A, and TCI-009 | None recorded. |
| One exact selected stable-ID record removed per eligible rival | Covered | TCF-026 and TCI-009 | None recorded. |
| Source player's inventory remains untouched | Covered | TCF-026, TCI-009, and BROWSER-004 | None recorded. |
| No match resolves with no effect after confirmed consumption | Covered | TCF-026 and TCI-009 | None recorded. |
| Response negation creates no destruction operation | Covered | TCI-009 | None recorded. |
| Atomic failure and stale data refund | Covered | TCF-027 and shared controller refund tests | None recorded. |
| Pre-destination provisional claim, persisted draft, withdrawal, and exactly-once confirmation | Covered | BROWSER-009 | None recorded. |
| Structured result summary | Covered | TRS-006 | None recorded. |
| Reload and undo | Covered | TCI-009 and BROWSER-004 | None recorded. |
| Sandbox discard and idempotent commit | Covered | TSB-021 | None recorded. |

#### Named Scenarios

##### INC-UNIT-001 - One stable record per rival and atomic invalid-record failure

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-control-token-foundation.js`
- **Test ID:** `TCF-026`
- **Setup:** Two rivals expose different stable Item/TM records, one rival owns duplicate Items, and the source owns another copy.
- **Action:** Select Gold's Leftovers and Red's Recover, then resolve Incinerate.
- **Expected gameplay result:** The two independently selected stable records are destroyed, Red's duplicate Items and the source copy remain, and two structured operations are recorded.
- **Exact assertions:**
  - Two rival IDs are affected.
  - Source inventory is unchanged.
  - Each operation records the exact destroyed inventory ID and consumption link.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** The companion TCF-027 case covers a missing stable ID and zero mutation.

##### INC-INTEGRATION-001 - Response, no-effect, reload, and undo lifecycle

- **Coverage:** Covered
- **Test level:** Integration
- **Test file:** `scripts/test-token-controller-integration.js`
- **Test ID:** `TCI-009`
- **Setup:** Incinerate has independent stable selections, response priority, one no-target rival scenario, and an isolated authoritative backend.
- **Action:** Negate one declaration, resolve another with different per-rival targets, reload, reject duplicate completion, undo, then resolve no-target cases.
- **Expected gameplay result:** Negation creates no operation; exact selections persist; duplicate resolution is inert; undo restores exact resources; opponents without targets are skipped and an entirely empty declaration resolves no effect.
- **Exact assertions:**
  - Immunity preserves both inventories.
  - Reload preserves two operations.
  - Undo restores exact IDs.
  - Empty match records no operation.
- **Reload tested:** Yes
- **Undo tested:** Yes
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** A result-level automated scenario is required.

##### INC-RESULT-001 - Exact destroyed-resource announcement

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-token-result-summary.js`
- **Test ID:** `TRS-006`
- **Setup:** A resolved Incinerate result contains two destruction operations.
- **Action:** Build the compact causal announcement.
- **Expected gameplay result:** The source player and each rival's exact destroyed resource are named.
- **Exact assertions:**
  - Both rival names appear.
  - Both destroyed resource names appear.
  - The operation list survives normalization.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** A result-level automated scenario is required.

##### INC-BROWSER-004 - Visible Incinerate operation survives refresh

- **Coverage:** Covered
- **Test level:** Browser
- **Test file:** `scripts/test-token-browser.js`
- **Test ID:** `BROWSER-004`
- **Setup:** The isolated browser scenario gives each rival and the source Leftovers.
- **Action:** Click Use Incinerate and refresh.
- **Expected gameplay result:** One rival copy each is removed, the source copy remains, and two operations persist.
- **Exact assertions:**
  - Visible inventory counts are exact.
  - Visible operation count is two after refresh.
  - No browser errors occur.
- **Reload tested:** Yes
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** A result-level automated scenario is required.

##### INC-BROWSER-009 - Provisional Action Control declaration survives refresh and withdrawal

- **Coverage:** Covered
- **Test level:** Browser
- **Test file:** `scripts/test-token-browser.js`
- **Test ID:** `BROWSER-009`
- **Setup:** Open production Rival Saga during an Action destination decision with three exact Incinerate records.
- **Action:** Claim Incinerate before choosing targets, collapse and reopen, refresh, persist per-rival choices, withdraw, then claim and confirm again.
- **Expected gameplay result:** The provisional Activity survives presentation changes without consumption; withdrawal restores the same Action; the fresh confirmation consumes exactly once and opens the normal response situation.
- **Exact assertions:**
  - No provisional consumption or mutation occurs.
  - Draft choices survive backend refresh.
  - A fresh post-withdrawal claim is allowed.
  - Confirmation creates one consumption and preserves the interrupted Action.
- **Reload tested:** Yes
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** A result-level automated scenario is required.

##### INC-SANDBOX-021 - Sandbox discard and idempotent commit

- **Coverage:** Covered
- **Test level:** Integration
- **Test file:** `scripts/test-token-sandbox.js`
- **Test ID:** `TSB-021`
- **Setup:** Incinerate and Steal resolve in separate discard and commit sandbox sessions.
- **Action:** Discard once, commit once, then repeat the same commit.
- **Expected gameplay result:** Discard leaves authoritative inventory unchanged; commit applies two destruction operations once.
- **Exact assertions:**
  - Authoritative revision is unchanged after discard.
  - Duplicate commit is idempotent.
  - Final destruction operation count is two.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** Yes
- **Sandbox commit tested:** Yes
- **Teambuilder enforcement tested:** No
- **Current gaps:** A result-level automated scenario is required.

### Steal

- **Token ID:** `steal-token`
- **Runtime status:** `verifiedComplete`
- **Runtime usability:** `usable` - This Token may be declared through its current runtime flow.
- **Resolver:** `automatic` / `utilityEffect`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Exact rival roster-instance target | Covered | TCF-028 and TCI-011 | None recorded. |
| Formal Steal tag and Sticky Hold protection | Covered | TCF-029 and TCI-010 | None recorded. |
| Safeguard does not block Pokemon ownership transfer | Covered | TCF-028 and TCI-011 | None recorded. |
| Substitute consumes and negates the exact transfer | Covered | TCI-010 | None recorded. |
| Ownership and stale current-team references update atomically | Covered | TCF-028 and TCI-011 | None recorded. |
| Stale target cancels and refunds | Covered | TCI-011 | None recorded. |
| Structured result and Sticky Hold summaries | Covered | TRS-007 and TRS-008 | None recorded. |
| Reload and undo | Covered | TCI-011 and BROWSER-004 | None recorded. |
| Sandbox discard and idempotent commit | Covered | TSB-021 | None recorded. |

#### Named Scenarios

##### STEAL-UNIT-001 - Exact ownership transfer and team-reference cleanup

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-control-token-foundation.js`
- **Test ID:** `TCF-028`
- **Setup:** Red's exact Lucario appears in a current Battle Team and active Teambuilder build.
- **Action:** Resolve a formally tagged Steal from Steevee.
- **Expected gameplay result:** Only Lucario changes owner; Red's current team references are removed; Safeguard does not block the Pokemon transfer.
- **Exact assertions:**
  - Trainer ID becomes Steevee.
  - Battle Team and Teambuilder references are removed.
  - The operation retains the previous-owner snapshot.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** A result-level automated scenario is required.

##### STEAL-INTEGRATION-001 - Sticky Hold and Substitute protection

- **Coverage:** Covered
- **Test level:** Integration
- **Test file:** `scripts/test-token-controller-integration.js`
- **Test ID:** `TCI-010`
- **Setup:** One declaration targets a Sticky Hold owner; another targets a Pokemon with Substitute.
- **Action:** Attempt both declarations and resolve the confirmed Substitute case.
- **Expected gameplay result:** Sticky Hold rejects before consumption; Substitute is consumed and negates the transfer after confirmation.
- **Exact assertions:**
  - Sticky declaration creates no consumption.
  - Substitute becomes consumed.
  - Pokemon ownership remains unchanged.
  - Steal remains consumed after negation.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** A result-level automated scenario is required.

##### STEAL-INTEGRATION-002 - Transfer reload, undo, and stale-target refund

- **Coverage:** Covered
- **Test level:** Integration
- **Test file:** `scripts/test-token-controller-integration.js`
- **Test ID:** `TCI-011`
- **Setup:** Red's Lucario is selected in current team surfaces and Steevee owns multiple Steal Tokens.
- **Action:** Resolve Steal, reload, undo, then make a separate target stale before resolution.
- **Expected gameplay result:** Transfer and cleanup persist; undo restores exact prior ownership and references; stale resolution refunds.
- **Exact assertions:**
  - Reload owner is Steevee.
  - Undo owner is Red with original team references.
  - Stale event is canceled and Token count restored.
- **Reload tested:** Yes
- **Undo tested:** Yes
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** Yes
- **Current gaps:** A result-level automated scenario is required.

##### STEAL-RESULT-001 - Exact ownership and protection announcements

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-token-result-summary.js`
- **Test ID:** `TRS-007`
- **Setup:** A transfer operation records previous and new owners.
- **Action:** Build the resolved announcement.
- **Expected gameplay result:** The actor, previous owner, exact Pokemon, and locations are named.
- **Exact assertions:**
  - Title names Steevee, Gold, and Lucario.
  - Detail names both roster locations.
  - TRS-008 separately names Sticky Hold when blocked.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** A result-level automated scenario is required.

##### STEAL-BROWSER-004 - Visible exact transfer survives refresh

- **Coverage:** Covered
- **Test level:** Browser
- **Test file:** `scripts/test-token-browser.js`
- **Test ID:** `BROWSER-004`
- **Setup:** Red's Lucario appears in both current team surfaces.
- **Action:** Click Use Steal and refresh.
- **Expected gameplay result:** Steevee remains the visible owner and Red's stale references remain removed.
- **Exact assertions:**
  - Visible owner is Steevee.
  - Both reference checks read removed.
  - One transfer operation persists.
  - No browser errors occur.
- **Reload tested:** Yes
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** Yes
- **Current gaps:** A result-level automated scenario is required.

##### STEAL-SANDBOX-021 - Sandbox discard and idempotent commit

- **Coverage:** Covered
- **Test level:** Integration
- **Test file:** `scripts/test-token-sandbox.js`
- **Test ID:** `TSB-021`
- **Setup:** The exact transfer runs in discard and commit sessions.
- **Action:** Discard, commit, and retry the same commit.
- **Expected gameplay result:** Discard preserves Red ownership; commit transfers once; duplicate commit does not duplicate operations.
- **Exact assertions:**
  - Authoritative owner remains Red after discard.
  - Final owner is Steevee.
  - Exactly one transfer operation exists.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** Yes
- **Sandbox commit tested:** Yes
- **Teambuilder enforcement tested:** No
- **Current gaps:** A result-level automated scenario is required.

### Safeguard

- **Token ID:** `safeguard`
- **Runtime status:** `partial`
- **Runtime usability:** `usable` - This Token may be declared through its current runtime flow.
- **Resolver:** `automatic` / `safeguard`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Declared gameplay result | Static Only | Contract and runtime wiring only | No executable result-level Token scenario exists. |

#### Named Scenarios

##### SAFEGUARD-STATIC - Current runtime path inventory

- **Coverage:** Static Only
- **Test level:** Static Wiring
- **Test file:** `None`
- **Test ID:** `None`
- **Setup:** Load the Token contract and inspect the registered runtime path.
- **Action:** Confirm that the Token has a catalog definition and a resolver/wiring declaration.
- **Expected gameplay result:** The report records the path without claiming that its gameplay result works.
- **Exact assertions:**
  - No gameplay-state assertion exists for this Token.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** No test proves any protected theft/destruction/copy outcome is blocked.

### Teleport

- **Token ID:** `teleport`
- **Runtime status:** `partial`
- **Runtime usability:** `usable` - Teleport is production-usable for exact declared Token events handled by the Control controller. Unsupported or nested response effects are hidden and fail before consumption.
- **Resolver:** `automatic` / `delayParent`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Revalidate a delayed parent effect at its original phase on return and distinguish gameplay illegality from system failure | Partially Covered | STR-009 | STR-011 covers the lifecycle statically and BROWSER-011 covers confirmation, backend refresh, one deterministic matching-phase return, terminal resolution, and duplicate prevention. Production support intentionally excludes nested response effects and non-Control-controller parents. |
| Production browser lifecycle | Covered | BROWSER-011 | STR-011 covers the lifecycle statically and BROWSER-011 covers confirmation, backend refresh, one deterministic matching-phase return, terminal resolution, and duplicate prevention. Production support intentionally excludes nested response effects and non-Control-controller parents. |
| Refresh and administrative undo | Partially Covered | BROWSER-011 | The production browser scenario covers backend refresh; effect-specific administrative undo remains a separate evidence gap. |

#### Named Scenarios

##### TELEPORT-SETTLED-001 - Revalidate a delayed parent effect at its original phase on return and distinguish gameplay illegality from system failure

- **Coverage:** Partially Covered
- **Test level:** Unit
- **Test file:** `scripts/test-settled-token-rulings.js`
- **Test ID:** `STR-009`
- **Setup:** Create the smallest isolated state required by the settled mechanic contract.
- **Action:** Run the pure resolver or contract-safety boundary.
- **Expected gameplay result:** Gameplay illegality resolves with no effect and no refund; corrupt/unsupported continuation cancels with refund; successful return uses the actual resolution anchor.
- **Exact assertions:**
  - Declaration phase anchor is preserved.
  - Gameplay-illegal return consumes both effects.
  - System failure requests refund.
  - Actual resolution anchor is passed to the parent resolver.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** STR-011 covers the lifecycle statically and BROWSER-011 covers confirmation, backend refresh, one deterministic matching-phase return, terminal resolution, and duplicate prevention. Production support intentionally excludes nested response effects and non-Control-controller parents.

##### TELEPORT-BROWSER-001 - Revalidate a delayed parent effect at its original phase on return and distinguish gameplay illegality from system failure in the production browser runtime

- **Coverage:** Covered
- **Test level:** Browser
- **Test file:** `scripts/test-token-browser.js`
- **Test ID:** `BROWSER-011`
- **Setup:** Load the production app against an isolated temporary authoritative backend.
- **Action:** Complete the production flow, persist it, refresh, and inspect its terminal behavior.
- **Expected gameplay result:** Teleport survives refresh as one delayed record, opens exactly one return event at the next matching phase, resolves once, and never reopens after another refresh.
- **Exact assertions:**
  - Both confirmed Tokens are consumed once.
  - The delayed record has one stable ID.
  - The return event is deterministic.
  - Duplicate scheduling opens zero events.
  - Terminal events remain terminal after refresh.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** STR-011 covers the lifecycle statically and BROWSER-011 covers confirmation, backend refresh, one deterministic matching-phase return, terminal resolution, and duplicate prevention. Production support intentionally excludes nested response effects and non-Control-controller parents.

### Substitute

- **Token ID:** `substitute`
- **Runtime status:** `partial`
- **Runtime usability:** `usable` - This Token may be declared through its current runtime flow.
- **Resolver:** `automatic` / `substituteAttach`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Owned target only | Covered | TCF-002 | None recorded. |
| Duplicate placement rejected without consumption | Covered | TCI-007 | None recorded. |
| Instance-target interception | Covered | TCF-003 | None recorded. |
| Multi-instance exemption | Covered | TCF-004 | None recorded. |
| Universal Restrict exact-instance exemption | Covered | TCI-004 | None recorded. |
| Exact-instance Flame Curse interception | Covered | TCF-005 and SCL-004 | None recorded. |
| Selected-target Extra Ban full negation | Covered | TCF-007 | None recorded. |
| Only selected Substitute consumed | Covered | TCF-007 | None recorded. |
| Rage immunity checked before Substitute | Covered | TCF-012 | None recorded. |
| Species-wide exemption result explains exact protection and remaining scope | Covered | TRS-004 | None recorded. |
| Negated parent does not consume Substitute | Covered | TCI-003 | None recorded. |
| Reload | Covered | TCI-004 and BROWSER-002 | None recorded. |
| Undo | Covered | TCI-004 and BROWSER-002 | None recorded. |
| Sandbox discard | Covered | TCF-016 | None recorded. |
| Sandbox commit | Partially Covered | TCF-016 | A commit candidate is asserted; a persisted server commit and reload are not. |

#### Named Scenarios

##### SUB-001 - Placement ownership and duplicate attachment guard

- **Coverage:** Partially Covered
- **Test level:** Unit
- **Test file:** `scripts/test-control-token-foundation.js`
- **Test ID:** `TCF-002`
- **Setup:** Gold owns Garchomp; a mismatched owner and then Gold attempt Substitute placement.
- **Action:** Attempt wrong-owner placement, legal placement, and duplicate placement.
- **Expected gameplay result:** Only one exact-instance Substitute attachment exists.
- **Exact assertions:**
  - Wrong-owner placement returns noEffect and creates zero statuses.
  - Legal placement returns resolved with rosterInstance scope and [gold-garchomp] affected.
  - Duplicate placement returns noEffect and leaves exactly one active attachment.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** Token inventory difference is not asserted, so duplicate rejection without consumption is not fully proven.

##### SUB-002 - Exact-instance interception

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-control-token-foundation.js`
- **Test ID:** `TCF-003`
- **Setup:** Gold's exact Garchomp instance has Substitute.
- **Action:** Apply a one-instance Iron Ball-style curse to that record.
- **Expected gameplay result:** Substitute is consumed, only that record is excluded, and the parent is not universally negated.
- **Exact assertions:**
  - Interception result is intercepted.
  - negateEntireEffect is false.
  - excludedRosterInstanceIds equals [gold-garchomp].
  - The attachment status becomes consumed.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** No parent status application or Token inventory assertion.

##### SUB-003 - Multi-instance effect preserves unprotected targets

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-control-token-foundation.js`
- **Test ID:** `TCF-004`
- **Setup:** A two-instance effect targets protected gold-garchomp and unprotected red-lucario.
- **Action:** Run Substitute interception.
- **Expected gameplay result:** The protected record is excluded while the other selected record remains affected.
- **Exact assertions:**
  - affectedRosterInstanceIds retains both exact IDs.
  - excludedRosterInstanceIds contains only gold-garchomp.
  - negateEntireEffect is false.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** No controller persistence or reload assertion.

##### SUB-004 - One-instance interception consumes only the matching Substitute

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-control-token-foundation.js`
- **Test ID:** `TCF-005`
- **Setup:** Gold's exact Garchomp has Substitute and a separate matching Garchomp exists elsewhere.
- **Action:** Run the low-level one-instance interception path against Gold's record.
- **Expected gameplay result:** Gold's Substitute is consumed and only Gold's record is excluded by this low-level interception payload.
- **Exact assertions:**
  - The selected attachment becomes consumed.
  - The interception retains only gold-garchomp as its exact affected ID.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** This is a low-level interception case. SCL-004 covers independent exclusions during species-wide standard Curse resolution.

##### SUB-005 - Selected-anchor Extra Ban consumes only one Substitute

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-control-token-foundation.js`
- **Test ID:** `TCF-007`
- **Setup:** Gold and Red each have a Garchomp with Substitute.
- **Action:** Select Gold's Garchomp as the universal Ban anchor, reload and undo, then repeat with Red selected.
- **Expected gameplay result:** The selected attachment alone is consumed, the Ban is fully negated, the other attachment survives, and reversing the anchor reverses consumption.
- **Exact assertions:**
  - negateEntireEffect is true.
  - consumedStatusIds contains only the selected attachment ID.
  - No active Garchomp Ban exists.
  - JSON reload preserves the unselected active attachment.
  - Snapshot restore returns both attachments to active.
  - Reversed selection consumes only Red's attachment.
- **Reload tested:** No
- **Undo tested:** Yes
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** The serialization assertion is Unit evidence, not backend reload; Token inventory is not asserted.

##### SUB-006 - Exact interception serialization and snapshot undo

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-control-token-foundation.js`
- **Test ID:** `TCF-015`
- **Setup:** Red's exact Garchomp has Substitute before a low-level exact-instance interception.
- **Action:** Intercept the effect, serialize state, then restore the pre-interception snapshot.
- **Expected gameplay result:** Reload keeps the exact consumed attachment and undo restores Substitute.
- **Exact assertions:**
  - Reloaded Substitute remains consumed for red-garchomp.
  - Undo restores the Substitute attachment to active.
- **Reload tested:** No
- **Undo tested:** Yes
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** Uses pure JSON reload and snapshot restore, not backend/browser refresh and Advanced Repair UI.

##### SUB-007 - Sandbox discard and commit-candidate isolation

- **Coverage:** Partially Covered
- **Test level:** Integration
- **Test file:** `scripts/test-control-token-foundation.js`
- **Test ID:** `TCF-016`
- **Setup:** Enter an isolated Token sandbox from a real state with no statuses.
- **Action:** Place Substitute in working state, discard, re-enter, place it again, and prepare a commit candidate.
- **Expected gameplay result:** Discard leaves real state untouched and the candidate contains one attachment.
- **Exact assertions:**
  - Real lingeringStatuses remains empty during sandbox work.
  - After discard the real Pokemon has no Rage effect buffs.
  - The commit candidate contains exactly one Substitute attachment.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** Yes
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** No actual server commit, persisted reload, or exact inventory-consumption assertion.

##### SUB-008 - Controller ordering is source-inspected only

- **Coverage:** Static Only
- **Test level:** Static Wiring
- **Test file:** `scripts/test-control-token-foundation.js`
- **Test ID:** `TCF-017`
- **Setup:** Read app.js as text.
- **Action:** Compare the source positions of response negation, Substitute interception, and parent mutation.
- **Expected gameplay result:** The source is ordered negation, interception, then mutation.
- **Exact assertions:**
  - The three source offsets are ordered and expected state/undo identifiers exist.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** This is not a Live Referee integration or browser test and proves no runtime outcome.

##### SUB-009 - Controller inventory and duplicate placement

- **Coverage:** Covered
- **Test level:** Integration
- **Test file:** `scripts/test-token-controller-integration.js`
- **Test ID:** `TCI-007`
- **Setup:** Gold owns two Substitute inventory records and one eligible Garchomp.
- **Action:** Place Substitute once, then attempt duplicate placement with the second exact inventory record.
- **Expected gameplay result:** Exactly one Token, activation, consumption, and attachment exist after the duplicate fails closed.
- **Exact assertions:**
  - First placement removes exactly one Substitute inventory record.
  - Exactly one activation and consumption are created.
  - Duplicate placement fails before inventory or activation changes.
  - The recorded policy is provisional consume on legal declaration.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** Final universal consumption/refund policy remains unresolved.

##### SUB-010 - Controller Restrict interception reload and undo

- **Coverage:** Covered
- **Test level:** Integration
- **Test file:** `scripts/test-token-controller-integration.js`
- **Test ID:** `TCI-004`
- **Setup:** Attach Substitute to one of several matching Garchomp records.
- **Action:** Resolve universal Restrict, reload backend state, and invoke controller undo.
- **Expected gameplay result:** Only the exact protected instance is exempt and its attachment is restored by undo.
- **Exact assertions:**
  - Only the exact Substitute is consumed.
  - Other matching Pokemon remain Restricted.
  - Backend reload preserves exact exclusion and consumed status.
  - Controller undo removes Restrict and restores Substitute and inventory.
- **Reload tested:** Yes
- **Undo tested:** Yes
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** Yes
- **Current gaps:** No production Advanced Repair click path is asserted.

##### SUB-BROWSER-002 - Visible selected-target Extra Ban interception and undo

- **Coverage:** Covered
- **Test level:** Browser
- **Test file:** `scripts/test-token-browser.js`
- **Test ID:** `BROWSER-002`
- **Setup:** Attach Substitute to Red's and Gold's matching Garchomp through visible browser controls.
- **Action:** Click Extra Ban targeting Red, refresh, click visible undo, and refresh again.
- **Expected gameplay result:** Only Red's selected Substitute is consumed, no Ban is created, Gold's remains active, and undo restores Red's.
- **Exact assertions:**
  - Red reads consumed while Gold reads active after Extra Ban and refresh.
  - Active Ban count is zero and phase protection count is one.
  - Both attachments read active after visible undo and refresh.
  - No browser errors are recorded.
- **Reload tested:** Yes
- **Undo tested:** Yes
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** The browser QA board is isolated from normal multiplayer identity.

##### SUB-RESULT-001 - Exact-instance exemption result wording

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-token-result-summary.js`
- **Test ID:** `TRS-004`
- **Setup:** A species-wide Restrict is intercepted by Substitute on one exact owned Pokemon.
- **Action:** Build the final structured result and announcement.
- **Expected gameplay result:** The protected owner and instance are named while the remaining matching species scope is explicitly preserved.
- **Exact assertions:**
  - The exact protected roster instance appears in excludedRosterInstanceIds.
  - The summary names the owner's protected Pokemon.
  - The summary states that Restrict still resolved against all other matching Pokemon.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** The result module is asserted directly rather than through a five-player production HUD session.

### Follow Me

- **Token ID:** `follow-me`
- **Runtime status:** `partial`
- **Runtime usability:** `usable` - Follow Me redirects one legal corresponding player or Pokemon target, then creates an idempotent Gym-long relationship that copies later real inventory Token consumption into inventory.
- **Resolver:** `automatic` / `redirectParentToSelf`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Redirect one corresponding target and create an idempotent Gym-long real inventory-copy relationship | Partially Covered | SEB-005 | Gym-end expiration and History undo for the relationship still need an effect-specific browser scenario; Drizzle's trigger conditions remain separate. |
| Production browser lifecycle | Covered | BROWSER-013 | Gym-end expiration and History undo for the relationship still need an effect-specific browser scenario; Drizzle's trigger conditions remain separate. |
| Refresh and duplicate completion | Covered | BROWSER-013 | Gym-end expiration and History undo for the relationship still need an effect-specific browser scenario; Drizzle's trigger conditions remain separate. |

#### Named Scenarios

##### FOLLOW-ME-BATCH-001 - Redirect one corresponding target and create an idempotent Gym-long real inventory-copy relationship

- **Coverage:** Partially Covered
- **Test level:** Unit
- **Test file:** `scripts/test-settled-effect-batch.js`
- **Test ID:** `SEB-005`
- **Setup:** Create the smallest isolated state needed for the settled exact-record mechanic.
- **Action:** Run the canonical resolver and inspect exact identities, mutations, and fail-closed boundaries.
- **Expected gameplay result:** The relationship waits for the redirected parent to resolve, then copies each later real consumed Token exactly once without reacting to virtual activations.
- **Exact assertions:**
  - Parent resolution activates the relationship.
  - Canonical Token identity and source provenance are preserved.
  - Duplicate completion grants no duplicate.
  - Virtual copies do not trigger it.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** Gym-end expiration and History undo for the relationship still need an effect-specific browser scenario; Drizzle's trigger conditions remain separate.

##### FOLLOW-ME-BROWSER-001 - Redirect one corresponding target and create an idempotent Gym-long real inventory-copy relationship through the production Live Referee

- **Coverage:** Covered
- **Test level:** Browser
- **Test file:** `scripts/test-token-browser.js`
- **Test ID:** `BROWSER-013`
- **Setup:** Load the production app against an isolated temporary authoritative backend.
- **Action:** Resolve the interaction, persist it, refresh, and inspect exact inventory and chain state.
- **Expected gameplay result:** The production response redirects one exact Active Roster target; parent resolution activates the relationship; one later real Restrict consumption grants one persistent copy across refresh.
- **Exact assertions:**
  - The relationship is pending before parent resolution and active after it.
  - The redirected exact Pokemon changes ownership through the parent Steal.
  - The copied Token is inventory, not an immediate activation.
  - Refresh and duplicate processing preserve exactly one copy.
- **Reload tested:** Yes
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** Gym-end expiration and History undo for the relationship still need an effect-specific browser scenario; Drizzle's trigger conditions remain separate.

### Embargo

- **Token ID:** `embargo`
- **Runtime status:** `partial`
- **Runtime usability:** `usable` - This Token may be declared through its current runtime flow.
- **Resolver:** `automatic` / `playerStatus`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Declared gameplay result | Static Only | Contract and runtime wiring only | No executable result-level Token scenario exists. |

#### Named Scenarios

##### EMBARGO-STATIC - Current runtime path inventory

- **Coverage:** Static Only
- **Test level:** Static Wiring
- **Test file:** `None`
- **Test ID:** `None`
- **Setup:** Load the Token contract and inspect the registered runtime path.
- **Action:** Confirm that the Token has a catalog definition and a resolver/wiring declaration.
- **Expected gameplay result:** The report records the path without claiming that its gameplay result works.
- **Exact assertions:**
  - No gameplay-state assertion exists for this Token.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** No test creates, persists, enforces, or expires the player status.

### After You

- **Token ID:** `after-you`
- **Runtime status:** `partial`
- **Runtime usability:** `usable` - After You supports automatic Control parents with fresh legal choices plus the explicit Safeguard and Immunity interactions; every other Protection interaction fails closed individually before consumption.
- **Resolver:** `automatic` / `copyParentEffect`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Create one non-inventory virtual activation above the copied Token with fresh legal choices and explicit interaction rules | Partially Covered | SEB-007 | Custom-choice Control Tokens and the unsupported Protection matrix entries remain individually unavailable pending their exact interaction rules or controllers. |
| Production browser lifecycle | Covered | BROWSER-013 | Custom-choice Control Tokens and the unsupported Protection matrix entries remain individually unavailable pending their exact interaction rules or controllers. |
| Refresh and duplicate completion | Covered | BROWSER-013 | Custom-choice Control Tokens and the unsupported Protection matrix entries remain individually unavailable pending their exact interaction rules or controllers. |

#### Named Scenarios

##### AFTER-YOU-BATCH-001 - Create one non-inventory virtual activation above the copied Token with fresh legal choices and explicit interaction rules

- **Coverage:** Partially Covered
- **Test level:** Unit
- **Test file:** `scripts/test-settled-effect-batch.js`
- **Test ID:** `SEB-007`
- **Setup:** Create the smallest isolated state needed for the settled exact-record mechanic.
- **Action:** Run the canonical resolver and inspect exact identities, mutations, and fail-closed boundaries.
- **Expected gameplay result:** The contract publishes supported Safeguard and Immunity behavior, individually blocks every unresolved Protection case, and prevents recursion.
- **Exact assertions:**
  - Immunity targets and negates the original Immunity.
  - Safeguard protects the After You user.
  - Unsupported Protection entries remain individually fail-closed.
  - After You cannot copy itself.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** Custom-choice Control Tokens and the unsupported Protection matrix entries remain individually unavailable pending their exact interaction rules or controllers.

##### AFTER-YOU-BROWSER-001 - Create one non-inventory virtual activation above the copied Token with fresh legal choices and explicit interaction rules through the production Live Referee

- **Coverage:** Covered
- **Test level:** Browser
- **Test file:** `scripts/test-token-browser.js`
- **Test ID:** `BROWSER-013`
- **Setup:** Load the production app against an isolated temporary authoritative backend.
- **Action:** Resolve the interaction, persist it, refresh, and inspect exact inventory and chain state.
- **Expected gameplay result:** Copied Immunity resolves before and negates original Immunity; a copied ordinary Restrict resolves against a fresh species before the original Restrict resumes; refresh creates no duplicate activation.
- **Exact assertions:**
  - Both special and ordinary copied activations are non-inventory.
  - Fresh Control targeting is independent.
  - Original chain resumes only after the copy terminates.
  - After You is consumed exactly once.
- **Reload tested:** Yes
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** Custom-choice Control Tokens and the unsupported Protection matrix entries remain individually unavailable pending their exact interaction rules or controllers.

### Smokescreen

- **Token ID:** `smokescreen`
- **Runtime status:** `partial`
- **Runtime usability:** `guidedOnly` - Smokescreen uses the guided wheel and corresponding-target confirmation flow; it cannot fall back to additive or arbitrary target behavior.
- **Resolver:** `guided` / `smokescreenRedirect`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Spin every player exactly once and replace one corresponding target only when the landed player has a legal choice | Partially Covered | STR-001 | The Guided production surface is statically wired, but destructive browser refresh, History undo, and five-player execution remain unverified. |
| Production browser lifecycle | Not Covered | None | A destructive production-browser scenario has not been approved for this slice. |
| Refresh and administrative undo | Not Covered | None | The pure resolver snapshot is covered where applicable; the production UI lifecycle still needs focused evidence. |

#### Named Scenarios

##### SMOKESCREEN-SETTLED-001 - Spin every player exactly once and replace one corresponding target only when the landed player has a legal choice

- **Coverage:** Partially Covered
- **Test level:** Unit
- **Test file:** `scripts/test-settled-token-rulings.js`
- **Test ID:** `STR-001`
- **Setup:** Create the smallest isolated state required by the settled mechanic contract.
- **Action:** Run the pure resolver or contract-safety boundary.
- **Expected gameplay result:** The original player and no-legal-target outcomes keep the original target; another legal player allows exactly one replacement and never adds a target.
- **Exact assertions:**
  - Every player appears once on the wheel.
  - No reroll occurs.
  - Target category is preserved.
  - Original target count is preserved.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** The Guided production surface is statically wired, but destructive browser refresh, History undo, and five-player execution remain unverified.

### Counterspell

- **Token ID:** `counterspell`
- **Runtime status:** `verifiedComplete`
- **Runtime usability:** `usable` - Counterspell restores the exact negated owned Token on its persisted two-Gym phase-anchored cooldown.
- **Resolver:** `automatic` / `restoreNegatedTokenWithCooldown`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Only the user's exact Token that the current response would negate is eligible | Covered | BROWSER-008 | None recorded. |
| Restore the exact consumed inventory ID without resolving the original activation | Covered | BROWSER-008 | None recorded. |
| Two-Gym phase-anchored cooldown remains visible but unusable | Covered | TIR-003 | None recorded. |
| Cooldown completion is one-time and reload safe | Covered | TIR-004 | None recorded. |
| Refresh, duplicate prevention, and History undo | Covered | BROWSER-008 | None recorded. |

#### Named Scenarios

##### COUNTERSPELL-INVENTORY - Exact Token restoration and phase-anchored cooldown

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-token-inventory-runtime.js`
- **Test ID:** `TIR-003`
- **Setup:** Create one exact consumed Token inventory record at Kanto Gym 2 Action Phase.
- **Action:** Restore it through the Counterspell inventory runtime and inspect availability through Gym 4.
- **Expected gameplay result:** The same stable ID remains unavailable until Gym 4 Action Phase, then becomes usable.
- **Exact assertions:**
  - Stable ID is unchanged.
  - Gym 3 remains unavailable.
  - Gym 4 Start remains unavailable.
  - Gym 4 Action is available.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** Five-client simultaneous priority remains manual QA.

##### COUNTERSPELL-BROWSER - Production response chain, refresh, duplicate prevention, and undo

- **Coverage:** Covered
- **Test level:** Browser
- **Test file:** `scripts/test-token-browser.js`
- **Test ID:** `BROWSER-008`
- **Setup:** Open production Rival Saga against a temporary backend with Restrict, Immunity, and Counterspell.
- **Action:** Resolve Restrict -> Immunity -> Counterspell, refresh, inspect the exact cooldown record, then undo the terminal event.
- **Expected gameplay result:** One exact Restrict record returns on cooldown; refresh creates no duplicate; undo restores all three original Tokens.
- **Exact assertions:**
  - Counterspell qualifies only for the source player's Token.
  - Exact inventory count remains one.
  - Cooldown survives refresh.
  - Undo removes the cooldown and restores declaration inventory.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** No destructive authoritative save is used.

### 7 Tools Of The Bandit

- **Token ID:** `seven-tools`
- **Runtime status:** `verifiedComplete`
- **Runtime usability:** `usable` - 7 Tools atomically negates the exact Protection response and creates its same-Gym temporary copy.
- **Resolver:** `automatic` / `counterProtection`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Answer only the exact newest Protection response | Covered | BROWSER-008 | None recorded. |
| Negation and copy are atomic | Covered | BROWSER-008 | None recorded. |
| Temporary copied Token inventory preserves canonical identity | Covered | TIR-001 | None recorded. |
| Copied Token availability and Gym-end expiration | Covered | TIR-002 | None recorded. |
| Safeguard Copy protection before consumption | Covered | BROWSER-008 | None recorded. |
| Refresh, duplicate prevention, and History undo | Covered | BROWSER-008 | None recorded. |

#### Named Scenarios

##### SEVEN-TOOLS-INVENTORY - Temporary copied inventory identity and expiration

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-token-inventory-runtime.js`
- **Test ID:** `TIR-001`
- **Setup:** Create a temporary copy from one exact consumed Immunity record.
- **Action:** Inspect source/copy identity and availability in the creation Gym and next Gym.
- **Expected gameplay result:** The source is unchanged; the copy has a new ID, preserves the canonical definition, and expires outside the creation Gym.
- **Exact assertions:**
  - Source identity is retained in runtime metadata.
  - Canonical Immunity definition is retained.
  - Creation Gym is usable.
  - Next Gym is unavailable.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** No five-client simultaneous priority is exercised.

##### SEVEN-TOOLS-BROWSER - Production atomic chain, Safeguard, refresh, and undo

- **Coverage:** Covered
- **Test level:** Browser
- **Test file:** `scripts/test-token-browser.js`
- **Test ID:** `BROWSER-008`
- **Setup:** Open production Rival Saga against a temporary backend with Restrict, Immunity, 7 Tools, and a temporary Safeguard check.
- **Action:** Verify Safeguard blocks Copy, then resolve Restrict -> Immunity -> 7 Tools after removing the test protection; refresh and undo the terminal event.
- **Expected gameplay result:** Immunity is negated only when one temporary Immunity copy is delivered; refresh does not duplicate it; undo restores all original inventory.
- **Exact assertions:**
  - Safeguard blocks before 7 Tools consumption.
  - Protection negation and copy both occur.
  - Temporary copy survives refresh.
  - Undo restores Restrict, Immunity, and 7 Tools and removes the copy.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** No five-client simultaneous priority is exercised.

### Immunity

- **Token ID:** `immunity`
- **Runtime status:** `verifiedComplete`
- **Runtime usability:** `usable` - Immunity atomically negates its exact current parent prompt and is covered across reload, undo, results, and sandbox isolation.
- **Resolver:** `automatic` / `immunity`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Directly affected player receives response priority | Covered | TCI-003 | None recorded. |
| Exact owned Immunity is consumed only on confirmed response | Covered | TCI-003 | None recorded. |
| Parent effect is atomically negated before Substitute or mutation | Covered | TCI-003 | None recorded. |
| Causal result summary names both effects and consumptions | Covered | TRS-002 | None recorded. |
| Backend reload and root undo restore exact inventory | Covered | TCI-003 | None recorded. |
| Production response-chain refresh and undo | Covered | BROWSER-008 | None recorded. |
| Sandbox isolation and discard | Covered | TSB-025 | None recorded. |

#### Named Scenarios

##### IMMUNITY-INTEGRATION-001 - Exact response priority, atomic negation, reload, and undo

- **Coverage:** Covered
- **Test level:** Integration
- **Test file:** `scripts/test-token-controller-integration.js`
- **Test ID:** `TCI-003`
- **Setup:** Restrict targets Red's exact Garchomp while that Pokemon has an active Substitute and Red owns one exact Immunity record.
- **Action:** Red answers the current Restrict prompt with Immunity, persists the result, reloads it, then undoes the root declaration.
- **Expected gameplay result:** Immunity negates Restrict before Substitute, survives reload as a terminal result, and root undo restores both exact Token inventories.
- **Exact assertions:**
  - Red receives response priority.
  - No Restrict status or global rule is created.
  - Substitute remains active.
  - Reload retains the negated outcome.
  - Undo restores Immunity and Restrict.
- **Reload tested:** Yes
- **Undo tested:** Yes
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** A result-level automated scenario is required.

##### IMMUNITY-RESULT-001 - Complete causal result announcement

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-token-result-summary.js`
- **Test ID:** `TRS-002`
- **Setup:** A Restrict root and its exact Immunity response are both represented by consumption records.
- **Action:** Build the terminal result summary and announcement.
- **Expected gameplay result:** The announcement states that Immunity negated Restrict and retains both exact consumptions.
- **Exact assertions:**
  - Final outcome is negated.
  - Both Token consumption IDs remain causal.
  - The result title names Immunity and Restrict.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** Visual styling is covered by the shared Live Referee result presentation rather than this pure summary test.

##### IMMUNITY-SANDBOX-001 - Negation stays isolated in the sandbox clone

- **Coverage:** Covered
- **Test level:** Integration
- **Test file:** `scripts/test-token-sandbox.js`
- **Test ID:** `TSB-025`
- **Setup:** A sandbox clone contains exact Restrict and Immunity records while the authoritative baseline remains untouched.
- **Action:** Resolve Restrict into Immunity, prepare a commit candidate, then discard.
- **Expected gameplay result:** The clone and candidate retain the negated event and two consumptions; discard restores both original Tokens and no consumptions.
- **Exact assertions:**
  - Baseline bytes never change.
  - Candidate contains both consumptions.
  - Discard restores both exact inventory IDs.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** Yes
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** A result-level automated scenario is required.

### Revenge

- **Token ID:** `revenge`
- **Runtime status:** `partial`
- **Runtime usability:** `usable` - Revenge is offered after payout from exact current-Gym Curse anchors and the immutable brought-team snapshot. It consumes only after the affected player confirms two exact Pokemon and an optional eligible held Item.
- **Resolver:** `automatic` / `revengeRelease`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Release exactly two offender brought-snapshot Pokemon and optionally destroy at most one exactly referenced eligible held item | Partially Covered | STR-008 | STR-012 covers production wiring and BROWSER-012 covers the required-choice screen, backend refresh, exact two-Pokemon resolution, consumption, terminal event closure, and History undo. A complete real payout-to-offer phase-through remains manual evidence. |
| Production browser lifecycle | Covered | BROWSER-012 | STR-012 covers production wiring and BROWSER-012 covers the required-choice screen, backend refresh, exact two-Pokemon resolution, consumption, terminal event closure, and History undo. A complete real payout-to-offer phase-through remains manual evidence. |
| Refresh and administrative undo | Covered | BROWSER-012 | The production browser scenario covers backend refresh and History undo. |

#### Named Scenarios

##### REVENGE-SETTLED-001 - Release exactly two offender brought-snapshot Pokemon and optionally destroy at most one exactly referenced eligible held item

- **Coverage:** Partially Covered
- **Test level:** Unit
- **Test file:** `scripts/test-settled-token-rulings.js`
- **Test ID:** `STR-008`
- **Setup:** Create the smallest isolated state required by the settled mechanic contract.
- **Action:** Run the pure resolver or contract-safety boundary.
- **Expected gameplay result:** Exactly two selected snapshot records are released; Master Ball and same-name inventory guessing are rejected.
- **Exact assertions:**
  - Release count is exactly two.
  - Only an exact held inventory reference may be destroyed.
  - Master Ball is protected.
  - Operation is atomic.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** STR-012 covers production wiring and BROWSER-012 covers the required-choice screen, backend refresh, exact two-Pokemon resolution, consumption, terminal event closure, and History undo. A complete real payout-to-offer phase-through remains manual evidence.

##### REVENGE-BROWSER-001 - Release exactly two offender brought-snapshot Pokemon and optionally destroy at most one exactly referenced eligible held item in the production browser runtime

- **Coverage:** Covered
- **Test level:** Browser
- **Test file:** `scripts/test-token-browser.js`
- **Test ID:** `BROWSER-012`
- **Setup:** Load the production app against an isolated temporary authoritative backend.
- **Action:** Complete the production flow, persist it, refresh, and inspect its terminal behavior.
- **Expected gameplay result:** The required-choice screen survives refresh, consumes Revenge only on valid confirmation, releases the exact two snapshot records, closes terminally, and History undo restores the exact pre-choice state.
- **Exact assertions:**
  - The offer consumes nothing before confirmation.
  - Two exact roster IDs are released.
  - The event closes once.
  - Refresh preserves the terminal result.
  - History undo restores both Pokemon, the Token, and the awaiting procedure.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** STR-012 covers production wiring and BROWSER-012 covers the required-choice screen, backend refresh, exact two-Pokemon resolution, consumption, terminal event closure, and History undo. A complete real payout-to-offer phase-through remains manual evidence.

### Reroll

- **Token ID:** `reroll-token`
- **Runtime status:** `partial`
- **Runtime usability:** `usable` - This Token may be declared through its current runtime flow.
- **Resolver:** `automatic` / `reroll`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Declared gameplay result | Static Only | Contract and runtime wiring only | No executable result-level Token scenario exists. |

#### Named Scenarios

##### REROLL-TOKEN-STATIC - Current runtime path inventory

- **Coverage:** Static Only
- **Test level:** Static Wiring
- **Test file:** `None`
- **Test ID:** `None`
- **Setup:** Load the Token contract and inspect the registered runtime path.
- **Action:** Confirm that the Token has a catalog definition and a resolver/wiring declaration.
- **Expected gameplay result:** The report records the path without claiming that its gameplay result works.
- **Exact assertions:**
  - No gameplay-state assertion exists for this Token.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** No test drives an encounter result through reroll, persistence, and undo.

### Extra Encounter Token

- **Token ID:** `extra-encounter-token`
- **Runtime status:** `verifiedComplete`
- **Runtime usability:** `usable` - Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.
- **Resolver:** `automatic` / `extraEncounter`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Action Phase and exact chosen-player validation before mutation | Covered | ETR-001 | None recorded. |
| One-roll standalone authoritative Encounter session | Covered | ETR-002 | None recorded. |
| Exactly one roll added to an existing open session | Covered | ETR-003 | None recorded. |
| Stable grant identity and duplicate-completion prevention | Covered | ETR-004 and ETR-005 | None recorded. |
| Production consumption, refresh, normal Encounter overlay, and History undo | Covered | BROWSER-010 | None recorded. |
| Sandbox isolation and discard | Covered | TSB-024 | None recorded. |

#### Named Scenarios

##### EXTRA-ENCOUNTER-RUNTIME-001 - Create or extend exactly one authoritative Encounter roll

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-encounter-token-runtime.js`
- **Test ID:** `ETR-003`
- **Setup:** Gold has an open two-roll Encounter session and is selected as the exact Extra Encounter target.
- **Action:** Grant Extra Encounter through the shared Encounter Token runtime.
- **Expected gameplay result:** The same session becomes pending with a maximum of exactly three rolls.
- **Exact assertions:**
  - No parallel session is created.
  - The chosen player's session identity is retained.
  - Exactly one roll is added.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** Standalone creation and illegal timing are covered by ETR-001 and ETR-002.

##### EXTRA-ENCOUNTER-BROWSER-001 - Production consume, refresh, overlay continuation, and undo

- **Coverage:** Covered
- **Test level:** Browser
- **Test file:** `scripts/test-token-browser.js`
- **Test ID:** `BROWSER-010`
- **Setup:** Steevee owns one exact Extra Encounter Token and selects Gold during Action Phase in an isolated production game.
- **Action:** Resolve the real app flow, persist and refresh the one-roll session, then use the History undo record.
- **Expected gameplay result:** Gold's normal Encounter overlay remains pending after refresh; undo removes that exact session and restores Steevee's exact Token.
- **Exact assertions:**
  - Session target is Gold.
  - Maximum rolls equals one.
  - Grant identity survives refresh.
  - Undo restores the Token and clears selected/open Encounter UI state.
- **Reload tested:** Yes
- **Undo tested:** Yes
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** A result-level automated scenario is required.

##### EXTRA-ENCOUNTER-SANDBOX-001 - Encounter grant stays isolated in the sandbox clone

- **Coverage:** Covered
- **Test level:** Integration
- **Test file:** `scripts/test-token-sandbox.js`
- **Test ID:** `TSB-024`
- **Setup:** An empty authoritative Encounter-session baseline is cloned into a Token sandbox.
- **Action:** Grant one exact Extra Encounter session, prepare a commit candidate, then discard.
- **Expected gameplay result:** Only the clone and candidate contain the stable grant; discard returns to zero sessions.
- **Exact assertions:**
  - Baseline bytes never change.
  - Candidate contains the exact grant ID.
  - Discard removes the session.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** Yes
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** A result-level automated scenario is required.

### Honey

- **Token ID:** `honey-token`
- **Runtime status:** `partial`
- **Runtime usability:** `usable` - Honey copies one immutable completed Encounter result at the End-of-Action checkpoint into a new acquisition-ready Encounter record without rerolling or copying ownership and transient history.
- **Resolver:** `automatic` / `encounterCopy`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Copy one immutable completed Encounter result into a fresh acquisition-ready result without rerolling | Partially Covered | SEB-004 | The production exact-result selector, acquisition handoff, browser refresh, and History undo still need effect-specific browser evidence. |
| Production browser lifecycle | Not Covered | None | No effect-specific production browser scenario exists yet. |
| Refresh and duplicate completion | Not Covered | None | Pure resolver identity and undo are covered where noted; production refresh remains unverified. |

#### Named Scenarios

##### HONEY-TOKEN-BATCH-001 - Copy one immutable completed Encounter result into a fresh acquisition-ready result without rerolling

- **Coverage:** Partially Covered
- **Test level:** Unit
- **Test file:** `scripts/test-settled-effect-batch.js`
- **Test ID:** `SEB-004`
- **Setup:** Create the smallest isolated state needed for the settled exact-record mechanic.
- **Action:** Run the canonical resolver and inspect exact identities, mutations, and fail-closed boundaries.
- **Expected gameplay result:** Species, form, finalized tier/level, and intrinsic rolled properties are copied under fresh identities; owner, roster, reroll, modifier, Item, and operation state are absent.
- **Exact assertions:**
  - Encounter identity is new.
  - Recipient ownership is new.
  - Intrinsic rolled properties are preserved.
  - Transient and prior-owner fields are not copied.
  - Duplicate resolution is inert.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** The production exact-result selector, acquisition handoff, browser refresh, and History undo still need effect-specific browser evidence.

### Move Deleter

- **Token ID:** `move-deleter`
- **Runtime status:** `partial`
- **Runtime usability:** `usable` - Move Deleter records one canonical global move restriction for the next Gym and the Teambuilder and validator enforce it.
- **Resolver:** `automatic` / `moveBan`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Globally disable one exact canonical move for the next Gym | Partially Covered | STR-005 | TCI-013 covers controller declaration, backend reload, and exact undo; STR-010 covers Teambuilder wiring. Full import/export/browser rejection still needs destructive evidence. |
| Controller declaration, persistence, and undo | Covered | TCI-013 | None recorded. |
| Production browser lifecycle | Not Covered | None | A destructive production-browser scenario has not been approved for this slice. |
| Refresh and administrative undo | Not Covered | None | The pure resolver snapshot is covered where applicable; the production UI lifecycle still needs focused evidence. |

#### Named Scenarios

##### MOVE-DELETER-SETTLED-001 - Globally disable one exact canonical move for the next Gym

- **Coverage:** Partially Covered
- **Test level:** Unit
- **Test file:** `scripts/test-settled-token-rulings.js`
- **Test ID:** `STR-005`
- **Setup:** Create the smallest isolated state required by the settled mechanic contract.
- **Action:** Run the pure resolver or contract-safety boundary.
- **Expected gameplay result:** The exact move is unavailable only during the next Gym and expires at its boundary.
- **Exact assertions:**
  - Canonical move key is stable.
  - Every player is covered.
  - The current and later Gyms are not incorrectly affected.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** TCI-013 covers controller declaration, backend reload, and exact undo; STR-010 covers Teambuilder wiring. Full import/export/browser rejection still needs destructive evidence.

##### MOVE-DELETER-INTEGRATION-001 - Globally disable one exact canonical move for the next Gym through the scenario controller

- **Coverage:** Covered
- **Test level:** Integration
- **Test file:** `scripts/test-token-controller-integration.js`
- **Test ID:** `TCI-013`
- **Setup:** Declare the owned exact Token through the scenario controller and persist the result through a temporary backend.
- **Action:** Resolve, reload, verify the authoritative effect record, and undo the exact activation.
- **Expected gameplay result:** The canonical move restriction is absent in the declaration Gym, active in the next Gym after backend reload, and removed by exact activation undo with the Token restored.
- **Exact assertions:**
  - Canonical casing is stable.
  - The restriction persists through reload.
  - Undo removes the status.
  - Undo restores the exact Token.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** TCI-013 covers controller declaration, backend reload, and exact undo; STR-010 covers Teambuilder wiring. Full import/export/browser rejection still needs destructive evidence.

### Toxic Curse

- **Token ID:** `toxic-curse`
- **Runtime status:** `verifiedComplete`
- **Runtime usability:** `usable` - This Token may be declared through its current runtime flow.
- **Resolver:** `automatic` / `statusEffect`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Exact Active Roster declaration anchor owned by any player | Covered | SCL-001 and SCL-002 | None recorded. |
| Species-wide application to every matching Active Roster instance | Covered | SCL-003 through SCL-006 | None recorded. |
| Non-Active and stale targets fail safely before mutation | Covered | SCL-002 and SCL-008 | None recorded. |
| Toxic Orb is forced on every unprotected matching Active Roster instance | Covered | SCL-003 | None recorded. |
| Arena Trap Curse immunity and Substitute exclude exact matches independently | Covered | SCL-004 | None recorded. |
| Canonical owned-token picker exposes the Curse during its Sabotage window | Covered | BROWSER-007 | None recorded. |
| Causal result preserves the selected anchor plus affected and protected exact instances | Covered | SCL-003 through SCL-006 | None recorded. |
| Two-Gym phase-anchored expiration | Covered | SCL-007 and BROWSER-006 | None recorded. |
| Duplicate completion and undo | Covered | SCL-008 | None recorded. |
| Backend reload and visible browser refresh | Covered | SCL-009 and BROWSER-006 | None recorded. |
| Sandbox isolation and discard | Covered | TSB-023 | None recorded. |

#### Named Scenarios

##### TOXIC-CURSE-TARGET-001 - Exact Active Roster anchor and pre-consumption rejection

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-standard-curse-tokens.js`
- **Test ID:** `SCL-002`
- **Setup:** The source has own and rival Active Roster Pokemon plus a Legacy record and duplicate species with stable IDs.
- **Action:** Declare a standard Curse against legal own/rival records and reject the non-Active record.
- **Expected gameplay result:** Only exact Active Roster instances may anchor the declaration and rejection does not consume a Token.
- **Exact assertions:**
  - Selected target type is rosterInstance.
  - Application scope is globalSpecies.
  - Controller relation is anyPlayer.
  - The Legacy target is rejected before consumption.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** A result-level automated scenario is required.

##### TOXIC-CURSE-EFFECT-001 - Toxic Orb is forced on every unprotected matching Active Roster instance

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-standard-curse-tokens.js`
- **Test ID:** `SCL-003`
- **Setup:** Duplicate matching Active Roster Pokemon across players have configured Teambuilder sets.
- **Action:** Resolve toxic-curse and calculate the effective build.
- **Expected gameplay result:** Every unprotected matching instance has Toxic Orb as its effective item while configured items remain unchanged.
- **Exact assertions:**
  - All unprotected matching duplicates are affected.
  - Configured items remain saved.
  - Effective item is Toxic Orb.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** Yes
- **Current gaps:** A result-level automated scenario is required.

##### TOXIC-CURSE-PROTECTION-001 - Arena immunity and Substitute protect matching exact instances independently

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-standard-curse-tokens.js`
- **Test ID:** `SCL-004`
- **Setup:** Matching Active Roster Pokemon include one Arena Trapped instance, one Substitute instance, and one unprotected instance.
- **Action:** Declare a standard species-wide Curse from one legal exact anchor.
- **Expected gameplay result:** Each protected instance is excluded independently while the unprotected matching instance is affected.
- **Exact assertions:**
  - Arena immunity is preserved.
  - Only the matching Substitute becomes consumed.
  - Protected exact IDs are excluded.
  - The unprotected matching ID remains affected.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** A result-level automated scenario is required.

##### TOXIC-CURSE-DURATION-001 - Two-Gym phase-anchored expiration

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-standard-curse-tokens.js`
- **Test ID:** `SCL-007`
- **Setup:** A standard Curse resolves during Kanto Gym 1 Action Phase.
- **Action:** Advance first to Gym 3 Start and then Gym 3 Action Phase.
- **Expected gameplay result:** The Curse remains active before its matching phase and expires exactly at the matching phase boundary.
- **Exact assertions:**
  - Gym 3 Start does not expire the status.
  - Gym 3 Action expires exactly that status.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** A result-level automated scenario is required.

##### TOXIC-CURSE-RECOVERY-001 - Stale-target refund, duplicate completion, and undo

- **Coverage:** Covered
- **Test level:** Integration
- **Test file:** `scripts/test-standard-curse-tokens.js`
- **Test ID:** `SCL-008`
- **Setup:** Separate declarations become stale, complete twice, and resolve before undo.
- **Action:** Attempt each completion and restore the declaration snapshot.
- **Expected gameplay result:** Stale failure refunds once, duplicate completion is inert, and undo restores the exact pre-declaration state.
- **Exact assertions:**
  - Stale failure refunds exactly once.
  - Second completion is rejected.
  - Undo removes the exact status and restores inventory.
- **Reload tested:** No
- **Undo tested:** Yes
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** A result-level automated scenario is required.

##### TOXIC-CURSE-BROWSER-007 - Canonical Sabotage picker authority

- **Coverage:** Covered
- **Test level:** Browser
- **Test file:** `scripts/test-token-browser.js`
- **Test ID:** `BROWSER-007`
- **Setup:** The production Live Referee inventory contains real Curse records alongside category, Field-placeholder, blocked, development-only, and illegal-timing records.
- **Action:** Open the Token picker during the explicit Sabotage Curse window.
- **Expected gameplay result:** Only canonical owned usable Curses appear, with quantities counted from exact inventory records.
- **Exact assertions:**
  - The Curse appears under a non-selectable category heading.
  - Protection Token and legacy Electric/Grassy Field placeholders are absent.
  - Blocked, development-only, and illegal-timing records are absent.
  - An empty legal inventory renders the clean empty state.
- **Reload tested:** Yes
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** A result-level automated scenario is required.

##### TOXIC-CURSE-BROWSER-006 - Visible standard Curse enforcement survives refresh and expires cleanly

- **Coverage:** Covered
- **Test level:** Browser
- **Test file:** `scripts/test-token-browser.js`
- **Test ID:** `BROWSER-006`
- **Setup:** The isolated Chromium scenario gives Steevee all five standard Curses and configured exact roster-instance sets.
- **Action:** Resolve all five Curses through visible controls, complete Silencing repair, refresh, expire at the phase anchor, and refresh again.
- **Expected gameplay result:** All five effective restrictions persist without erasing configured data, then all five expire and restore the configured view.
- **Exact assertions:**
  - Five active statuses survive refresh.
  - Forced item and Imprison overlays are visible.
  - Silencing repair remains completed.
  - Zero active statuses remain after expiration and refresh.
- **Reload tested:** Yes
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** Yes
- **Current gaps:** A result-level automated scenario is required.

##### TOXIC-CURSE-SANDBOX-023 - Standard Curse stays isolated in the Token sandbox

- **Coverage:** Covered
- **Test level:** Integration
- **Test file:** `scripts/test-token-sandbox.js`
- **Test ID:** `TSB-023`
- **Setup:** A configured exact roster instance and Flame Curse Token are cloned into a sandbox session.
- **Action:** Resolve the Curse, prepare a commit candidate, then discard to the authoritative baseline.
- **Expected gameplay result:** The working state and candidate contain one exact status and consumption while discard restores zero statuses and the configured item.
- **Exact assertions:**
  - The real baseline remains byte-identical during resolution.
  - The commit candidate retains the exact Curse.
  - Discard removes the status and consumption.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** Yes
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** Yes
- **Current gaps:** General idempotent server commit behavior remains covered by shared TSB-019 through TSB-021 infrastructure.

### Iron Ball Curse

- **Token ID:** `iron-ball-curse`
- **Runtime status:** `verifiedComplete`
- **Runtime usability:** `usable` - This Token may be declared through its current runtime flow.
- **Resolver:** `automatic` / `statusEffect`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Exact Active Roster declaration anchor owned by any player | Covered | SCL-001 and SCL-002 | None recorded. |
| Species-wide application to every matching Active Roster instance | Covered | SCL-003 through SCL-006 | None recorded. |
| Non-Active and stale targets fail safely before mutation | Covered | SCL-002 and SCL-008 | None recorded. |
| Iron Ball is forced on every unprotected matching Active Roster instance | Covered | SCL-003 | None recorded. |
| Arena Trap Curse immunity and Substitute exclude exact matches independently | Covered | SCL-004 | None recorded. |
| Canonical owned-token picker exposes the Curse during its Sabotage window | Covered | BROWSER-007 | None recorded. |
| Causal result preserves the selected anchor plus affected and protected exact instances | Covered | SCL-003 through SCL-006 | None recorded. |
| Two-Gym phase-anchored expiration | Covered | SCL-007 and BROWSER-006 | None recorded. |
| Duplicate completion and undo | Covered | SCL-008 | None recorded. |
| Backend reload and visible browser refresh | Covered | SCL-009 and BROWSER-006 | None recorded. |
| Sandbox isolation and discard | Covered | TSB-023 | None recorded. |

#### Named Scenarios

##### IRON-BALL-CURSE-TARGET-001 - Exact Active Roster anchor and pre-consumption rejection

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-standard-curse-tokens.js`
- **Test ID:** `SCL-002`
- **Setup:** The source has own and rival Active Roster Pokemon plus a Legacy record and duplicate species with stable IDs.
- **Action:** Declare a standard Curse against legal own/rival records and reject the non-Active record.
- **Expected gameplay result:** Only exact Active Roster instances may anchor the declaration and rejection does not consume a Token.
- **Exact assertions:**
  - Selected target type is rosterInstance.
  - Application scope is globalSpecies.
  - Controller relation is anyPlayer.
  - The Legacy target is rejected before consumption.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** A result-level automated scenario is required.

##### IRON-BALL-CURSE-EFFECT-001 - Iron Ball is forced on every unprotected matching Active Roster instance

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-standard-curse-tokens.js`
- **Test ID:** `SCL-003`
- **Setup:** Duplicate matching Active Roster Pokemon across players have configured Teambuilder sets.
- **Action:** Resolve iron-ball-curse and calculate the effective build.
- **Expected gameplay result:** Every unprotected matching instance has Iron Ball as its effective item while configured items remain unchanged.
- **Exact assertions:**
  - All unprotected matching duplicates are affected.
  - Configured items remain saved.
  - Effective item is Iron Ball.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** Yes
- **Current gaps:** A result-level automated scenario is required.

##### IRON-BALL-CURSE-PROTECTION-001 - Arena immunity and Substitute protect matching exact instances independently

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-standard-curse-tokens.js`
- **Test ID:** `SCL-004`
- **Setup:** Matching Active Roster Pokemon include one Arena Trapped instance, one Substitute instance, and one unprotected instance.
- **Action:** Declare a standard species-wide Curse from one legal exact anchor.
- **Expected gameplay result:** Each protected instance is excluded independently while the unprotected matching instance is affected.
- **Exact assertions:**
  - Arena immunity is preserved.
  - Only the matching Substitute becomes consumed.
  - Protected exact IDs are excluded.
  - The unprotected matching ID remains affected.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** A result-level automated scenario is required.

##### IRON-BALL-CURSE-DURATION-001 - Two-Gym phase-anchored expiration

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-standard-curse-tokens.js`
- **Test ID:** `SCL-007`
- **Setup:** A standard Curse resolves during Kanto Gym 1 Action Phase.
- **Action:** Advance first to Gym 3 Start and then Gym 3 Action Phase.
- **Expected gameplay result:** The Curse remains active before its matching phase and expires exactly at the matching phase boundary.
- **Exact assertions:**
  - Gym 3 Start does not expire the status.
  - Gym 3 Action expires exactly that status.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** A result-level automated scenario is required.

##### IRON-BALL-CURSE-RECOVERY-001 - Stale-target refund, duplicate completion, and undo

- **Coverage:** Covered
- **Test level:** Integration
- **Test file:** `scripts/test-standard-curse-tokens.js`
- **Test ID:** `SCL-008`
- **Setup:** Separate declarations become stale, complete twice, and resolve before undo.
- **Action:** Attempt each completion and restore the declaration snapshot.
- **Expected gameplay result:** Stale failure refunds once, duplicate completion is inert, and undo restores the exact pre-declaration state.
- **Exact assertions:**
  - Stale failure refunds exactly once.
  - Second completion is rejected.
  - Undo removes the exact status and restores inventory.
- **Reload tested:** No
- **Undo tested:** Yes
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** A result-level automated scenario is required.

##### IRON-BALL-CURSE-BROWSER-007 - Canonical Sabotage picker authority

- **Coverage:** Covered
- **Test level:** Browser
- **Test file:** `scripts/test-token-browser.js`
- **Test ID:** `BROWSER-007`
- **Setup:** The production Live Referee inventory contains real Curse records alongside category, Field-placeholder, blocked, development-only, and illegal-timing records.
- **Action:** Open the Token picker during the explicit Sabotage Curse window.
- **Expected gameplay result:** Only canonical owned usable Curses appear, with quantities counted from exact inventory records.
- **Exact assertions:**
  - The Curse appears under a non-selectable category heading.
  - Protection Token and legacy Electric/Grassy Field placeholders are absent.
  - Blocked, development-only, and illegal-timing records are absent.
  - An empty legal inventory renders the clean empty state.
- **Reload tested:** Yes
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** A result-level automated scenario is required.

##### IRON-BALL-CURSE-BROWSER-006 - Visible standard Curse enforcement survives refresh and expires cleanly

- **Coverage:** Covered
- **Test level:** Browser
- **Test file:** `scripts/test-token-browser.js`
- **Test ID:** `BROWSER-006`
- **Setup:** The isolated Chromium scenario gives Steevee all five standard Curses and configured exact roster-instance sets.
- **Action:** Resolve all five Curses through visible controls, complete Silencing repair, refresh, expire at the phase anchor, and refresh again.
- **Expected gameplay result:** All five effective restrictions persist without erasing configured data, then all five expire and restore the configured view.
- **Exact assertions:**
  - Five active statuses survive refresh.
  - Forced item and Imprison overlays are visible.
  - Silencing repair remains completed.
  - Zero active statuses remain after expiration and refresh.
- **Reload tested:** Yes
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** Yes
- **Current gaps:** A result-level automated scenario is required.

##### IRON-BALL-CURSE-SANDBOX-023 - Standard Curse stays isolated in the Token sandbox

- **Coverage:** Covered
- **Test level:** Integration
- **Test file:** `scripts/test-token-sandbox.js`
- **Test ID:** `TSB-023`
- **Setup:** A configured exact roster instance and Flame Curse Token are cloned into a sandbox session.
- **Action:** Resolve the Curse, prepare a commit candidate, then discard to the authoritative baseline.
- **Expected gameplay result:** The working state and candidate contain one exact status and consumption while discard restores zero statuses and the configured item.
- **Exact assertions:**
  - The real baseline remains byte-identical during resolution.
  - The commit candidate retains the exact Curse.
  - Discard removes the status and consumption.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** Yes
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** Yes
- **Current gaps:** General idempotent server commit behavior remains covered by shared TSB-019 through TSB-021 infrastructure.

### Flame Curse

- **Token ID:** `flame-curse`
- **Runtime status:** `verifiedComplete`
- **Runtime usability:** `usable` - This Token may be declared through its current runtime flow.
- **Resolver:** `automatic` / `statusEffect`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Exact Active Roster declaration anchor owned by any player | Covered | SCL-001 and SCL-002 | None recorded. |
| Species-wide application to every matching Active Roster instance | Covered | SCL-003 through SCL-006 | None recorded. |
| Non-Active and stale targets fail safely before mutation | Covered | SCL-002 and SCL-008 | None recorded. |
| Flame Orb is forced on every unprotected matching Active Roster instance | Covered | SCL-003 | None recorded. |
| Arena Trap Curse immunity and Substitute exclude exact matches independently | Covered | SCL-004 | None recorded. |
| Canonical owned-token picker exposes the Curse during its Sabotage window | Covered | BROWSER-007 | None recorded. |
| Causal result preserves the selected anchor plus affected and protected exact instances | Covered | SCL-003 through SCL-006 | None recorded. |
| Two-Gym phase-anchored expiration | Covered | SCL-007 and BROWSER-006 | None recorded. |
| Duplicate completion and undo | Covered | SCL-008 | None recorded. |
| Backend reload and visible browser refresh | Covered | SCL-009 and BROWSER-006 | None recorded. |
| Sandbox isolation and discard | Covered | TSB-023 | None recorded. |

#### Named Scenarios

##### FLAME-CURSE-TARGET-001 - Exact Active Roster anchor and pre-consumption rejection

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-standard-curse-tokens.js`
- **Test ID:** `SCL-002`
- **Setup:** The source has own and rival Active Roster Pokemon plus a Legacy record and duplicate species with stable IDs.
- **Action:** Declare a standard Curse against legal own/rival records and reject the non-Active record.
- **Expected gameplay result:** Only exact Active Roster instances may anchor the declaration and rejection does not consume a Token.
- **Exact assertions:**
  - Selected target type is rosterInstance.
  - Application scope is globalSpecies.
  - Controller relation is anyPlayer.
  - The Legacy target is rejected before consumption.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** A result-level automated scenario is required.

##### FLAME-CURSE-EFFECT-001 - Flame Orb is forced on every unprotected matching Active Roster instance

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-standard-curse-tokens.js`
- **Test ID:** `SCL-003`
- **Setup:** Duplicate matching Active Roster Pokemon across players have configured Teambuilder sets.
- **Action:** Resolve flame-curse and calculate the effective build.
- **Expected gameplay result:** Every unprotected matching instance has Flame Orb as its effective item while configured items remain unchanged.
- **Exact assertions:**
  - All unprotected matching duplicates are affected.
  - Configured items remain saved.
  - Effective item is Flame Orb.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** Yes
- **Current gaps:** A result-level automated scenario is required.

##### FLAME-CURSE-PROTECTION-001 - Arena immunity and Substitute protect matching exact instances independently

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-standard-curse-tokens.js`
- **Test ID:** `SCL-004`
- **Setup:** Matching Active Roster Pokemon include one Arena Trapped instance, one Substitute instance, and one unprotected instance.
- **Action:** Declare a standard species-wide Curse from one legal exact anchor.
- **Expected gameplay result:** Each protected instance is excluded independently while the unprotected matching instance is affected.
- **Exact assertions:**
  - Arena immunity is preserved.
  - Only the matching Substitute becomes consumed.
  - Protected exact IDs are excluded.
  - The unprotected matching ID remains affected.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** A result-level automated scenario is required.

##### FLAME-CURSE-DURATION-001 - Two-Gym phase-anchored expiration

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-standard-curse-tokens.js`
- **Test ID:** `SCL-007`
- **Setup:** A standard Curse resolves during Kanto Gym 1 Action Phase.
- **Action:** Advance first to Gym 3 Start and then Gym 3 Action Phase.
- **Expected gameplay result:** The Curse remains active before its matching phase and expires exactly at the matching phase boundary.
- **Exact assertions:**
  - Gym 3 Start does not expire the status.
  - Gym 3 Action expires exactly that status.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** A result-level automated scenario is required.

##### FLAME-CURSE-RECOVERY-001 - Stale-target refund, duplicate completion, and undo

- **Coverage:** Covered
- **Test level:** Integration
- **Test file:** `scripts/test-standard-curse-tokens.js`
- **Test ID:** `SCL-008`
- **Setup:** Separate declarations become stale, complete twice, and resolve before undo.
- **Action:** Attempt each completion and restore the declaration snapshot.
- **Expected gameplay result:** Stale failure refunds once, duplicate completion is inert, and undo restores the exact pre-declaration state.
- **Exact assertions:**
  - Stale failure refunds exactly once.
  - Second completion is rejected.
  - Undo removes the exact status and restores inventory.
- **Reload tested:** No
- **Undo tested:** Yes
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** A result-level automated scenario is required.

##### FLAME-CURSE-BROWSER-007 - Canonical Sabotage picker authority

- **Coverage:** Covered
- **Test level:** Browser
- **Test file:** `scripts/test-token-browser.js`
- **Test ID:** `BROWSER-007`
- **Setup:** The production Live Referee inventory contains real Curse records alongside category, Field-placeholder, blocked, development-only, and illegal-timing records.
- **Action:** Open the Token picker during the explicit Sabotage Curse window.
- **Expected gameplay result:** Only canonical owned usable Curses appear, with quantities counted from exact inventory records.
- **Exact assertions:**
  - The Curse appears under a non-selectable category heading.
  - Protection Token and legacy Electric/Grassy Field placeholders are absent.
  - Blocked, development-only, and illegal-timing records are absent.
  - An empty legal inventory renders the clean empty state.
- **Reload tested:** Yes
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** A result-level automated scenario is required.

##### FLAME-CURSE-BROWSER-006 - Visible standard Curse enforcement survives refresh and expires cleanly

- **Coverage:** Covered
- **Test level:** Browser
- **Test file:** `scripts/test-token-browser.js`
- **Test ID:** `BROWSER-006`
- **Setup:** The isolated Chromium scenario gives Steevee all five standard Curses and configured exact roster-instance sets.
- **Action:** Resolve all five Curses through visible controls, complete Silencing repair, refresh, expire at the phase anchor, and refresh again.
- **Expected gameplay result:** All five effective restrictions persist without erasing configured data, then all five expire and restore the configured view.
- **Exact assertions:**
  - Five active statuses survive refresh.
  - Forced item and Imprison overlays are visible.
  - Silencing repair remains completed.
  - Zero active statuses remain after expiration and refresh.
- **Reload tested:** Yes
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** Yes
- **Current gaps:** A result-level automated scenario is required.

##### FLAME-CURSE-SANDBOX-023 - Standard Curse stays isolated in the Token sandbox

- **Coverage:** Covered
- **Test level:** Integration
- **Test file:** `scripts/test-token-sandbox.js`
- **Test ID:** `TSB-023`
- **Setup:** A configured exact roster instance and Flame Curse Token are cloned into a sandbox session.
- **Action:** Resolve the Curse, prepare a commit candidate, then discard to the authoritative baseline.
- **Expected gameplay result:** The working state and candidate contain one exact status and consumption while discard restores zero statuses and the configured item.
- **Exact assertions:**
  - The real baseline remains byte-identical during resolution.
  - The commit candidate retains the exact Curse.
  - Discard removes the status and consumption.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** Yes
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** Yes
- **Current gaps:** General idempotent server commit behavior remains covered by shared TSB-019 through TSB-021 infrastructure.

### Silencing Curse

- **Token ID:** `silencing-curse`
- **Runtime status:** `verifiedComplete`
- **Runtime usability:** `usable` - This Token may be declared through its current runtime flow.
- **Resolver:** `automatic` / `statusEffect`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Exact Active Roster declaration anchor owned by any player | Covered | SCL-001 and SCL-002 | None recorded. |
| Species-wide application to every matching Active Roster instance | Covered | SCL-003 through SCL-006 | None recorded. |
| Non-Active and stale targets fail safely before mutation | Covered | SCL-002 and SCL-008 | None recorded. |
| Maximum two-move set with explicit required choice | Covered | SCL-005 | None recorded. |
| Arena Trap Curse immunity and Substitute exclude exact matches independently | Covered | SCL-004 | None recorded. |
| Canonical owned-token picker exposes the Curse during its Sabotage window | Covered | BROWSER-007 | None recorded. |
| Causal result preserves the selected anchor plus affected and protected exact instances | Covered | SCL-003 through SCL-006 | None recorded. |
| Two-Gym phase-anchored expiration | Covered | SCL-007 and BROWSER-006 | None recorded. |
| Duplicate completion and undo | Covered | SCL-008 | None recorded. |
| Backend reload and visible browser refresh | Covered | SCL-009 and BROWSER-006 | None recorded. |
| Sandbox isolation and discard | Covered | TSB-023 | None recorded. |

#### Named Scenarios

##### SILENCING-CURSE-TARGET-001 - Exact Active Roster anchor and pre-consumption rejection

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-standard-curse-tokens.js`
- **Test ID:** `SCL-002`
- **Setup:** The source has own and rival Active Roster Pokemon plus a Legacy record and duplicate species with stable IDs.
- **Action:** Declare a standard Curse against legal own/rival records and reject the non-Active record.
- **Expected gameplay result:** Only exact Active Roster instances may anchor the declaration and rejection does not consume a Token.
- **Exact assertions:**
  - Selected target type is rosterInstance.
  - Application scope is globalSpecies.
  - Controller relation is anyPlayer.
  - The Legacy target is rejected before consumption.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** A result-level automated scenario is required.

##### SILENCING-CURSE-EFFECT-001 - Maximum two-move set with explicit required choice

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-standard-curse-tokens.js`
- **Test ID:** `SCL-005`
- **Setup:** Duplicate matching Active Roster Pokemon across players have configured Teambuilder sets.
- **Action:** Resolve silencing-curse and calculate the effective build.
- **Expected gameplay result:** A four-move configured set is not truncated until its owner explicitly chooses the two retained moves.
- **Exact assertions:**
  - Repair starts required.
  - All four configured moves remain before choice.
  - Exactly the selected two moves remain after repair.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** Yes
- **Current gaps:** A result-level automated scenario is required.

##### SILENCING-CURSE-PROTECTION-001 - Arena immunity and Substitute protect matching exact instances independently

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-standard-curse-tokens.js`
- **Test ID:** `SCL-004`
- **Setup:** Matching Active Roster Pokemon include one Arena Trapped instance, one Substitute instance, and one unprotected instance.
- **Action:** Declare a standard species-wide Curse from one legal exact anchor.
- **Expected gameplay result:** Each protected instance is excluded independently while the unprotected matching instance is affected.
- **Exact assertions:**
  - Arena immunity is preserved.
  - Only the matching Substitute becomes consumed.
  - Protected exact IDs are excluded.
  - The unprotected matching ID remains affected.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** A result-level automated scenario is required.

##### SILENCING-CURSE-DURATION-001 - Two-Gym phase-anchored expiration

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-standard-curse-tokens.js`
- **Test ID:** `SCL-007`
- **Setup:** A standard Curse resolves during Kanto Gym 1 Action Phase.
- **Action:** Advance first to Gym 3 Start and then Gym 3 Action Phase.
- **Expected gameplay result:** The Curse remains active before its matching phase and expires exactly at the matching phase boundary.
- **Exact assertions:**
  - Gym 3 Start does not expire the status.
  - Gym 3 Action expires exactly that status.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** A result-level automated scenario is required.

##### SILENCING-CURSE-RECOVERY-001 - Stale-target refund, duplicate completion, and undo

- **Coverage:** Covered
- **Test level:** Integration
- **Test file:** `scripts/test-standard-curse-tokens.js`
- **Test ID:** `SCL-008`
- **Setup:** Separate declarations become stale, complete twice, and resolve before undo.
- **Action:** Attempt each completion and restore the declaration snapshot.
- **Expected gameplay result:** Stale failure refunds once, duplicate completion is inert, and undo restores the exact pre-declaration state.
- **Exact assertions:**
  - Stale failure refunds exactly once.
  - Second completion is rejected.
  - Undo removes the exact status and restores inventory.
- **Reload tested:** No
- **Undo tested:** Yes
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** A result-level automated scenario is required.

##### SILENCING-CURSE-BROWSER-007 - Canonical Sabotage picker authority

- **Coverage:** Covered
- **Test level:** Browser
- **Test file:** `scripts/test-token-browser.js`
- **Test ID:** `BROWSER-007`
- **Setup:** The production Live Referee inventory contains real Curse records alongside category, Field-placeholder, blocked, development-only, and illegal-timing records.
- **Action:** Open the Token picker during the explicit Sabotage Curse window.
- **Expected gameplay result:** Only canonical owned usable Curses appear, with quantities counted from exact inventory records.
- **Exact assertions:**
  - The Curse appears under a non-selectable category heading.
  - Protection Token and legacy Electric/Grassy Field placeholders are absent.
  - Blocked, development-only, and illegal-timing records are absent.
  - An empty legal inventory renders the clean empty state.
- **Reload tested:** Yes
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** A result-level automated scenario is required.

##### SILENCING-CURSE-BROWSER-006 - Visible standard Curse enforcement survives refresh and expires cleanly

- **Coverage:** Covered
- **Test level:** Browser
- **Test file:** `scripts/test-token-browser.js`
- **Test ID:** `BROWSER-006`
- **Setup:** The isolated Chromium scenario gives Steevee all five standard Curses and configured exact roster-instance sets.
- **Action:** Resolve all five Curses through visible controls, complete Silencing repair, refresh, expire at the phase anchor, and refresh again.
- **Expected gameplay result:** All five effective restrictions persist without erasing configured data, then all five expire and restore the configured view.
- **Exact assertions:**
  - Five active statuses survive refresh.
  - Forced item and Imprison overlays are visible.
  - Silencing repair remains completed.
  - Zero active statuses remain after expiration and refresh.
- **Reload tested:** Yes
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** Yes
- **Current gaps:** A result-level automated scenario is required.

##### SILENCING-CURSE-SANDBOX-023 - Standard Curse stays isolated in the Token sandbox

- **Coverage:** Covered
- **Test level:** Integration
- **Test file:** `scripts/test-token-sandbox.js`
- **Test ID:** `TSB-023`
- **Setup:** A configured exact roster instance and Flame Curse Token are cloned into a sandbox session.
- **Action:** Resolve the Curse, prepare a commit candidate, then discard to the authoritative baseline.
- **Expected gameplay result:** The working state and candidate contain one exact status and consumption while discard restores zero statuses and the configured item.
- **Exact assertions:**
  - The real baseline remains byte-identical during resolution.
  - The commit candidate retains the exact Curse.
  - Discard removes the status and consumption.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** Yes
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** Yes
- **Current gaps:** General idempotent server commit behavior remains covered by shared TSB-019 through TSB-021 infrastructure.

### Knock Off Curse

- **Token ID:** `knock-off-curse`
- **Runtime status:** `partial`
- **Runtime usability:** `usable` - Knock Off uses one exact Active-roster anchor and destroys its exact held Item or exact TM inventory grant, opening mandatory set revision when final TM access is lost.
- **Resolver:** `automatic` / `knockOff`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Destroy one exact held Item or TM inventory grant from one exact Active Roster Pokemon | Partially Covered | SEB-003 | The mandatory Team Revision blocker is wired through production state, but full Sabotage browser confirmation, refresh, and undo evidence remains outstanding. |
| Production browser lifecycle | Not Covered | None | No effect-specific production browser scenario exists yet. |
| Refresh and duplicate completion | Not Covered | None | Pure resolver identity and undo are covered where noted; production refresh remains unverified. |

#### Named Scenarios

##### KNOCK-OFF-CURSE-BATCH-001 - Destroy one exact held Item or TM inventory grant from one exact Active Roster Pokemon

- **Coverage:** Partially Covered
- **Test level:** Unit
- **Test file:** `scripts/test-settled-effect-batch.js`
- **Test ID:** `SEB-003`
- **Setup:** Create the smallest isolated state needed for the settled exact-record mechanic.
- **Action:** Run the canonical resolver and inspect exact identities, mutations, and fail-closed boundaries.
- **Expected gameplay result:** Master Ball is excluded; duplicate TM ownership preserves access; loss of the final exact TM copy identifies locked slots requiring manual revision without deleting their move.
- **Exact assertions:**
  - Stable Item/TM IDs drive destruction.
  - Master Ball fails before mutation.
  - Duplicate TM access remains legal.
  - Final TM loss records exact impacted slots and leaves the move for required revision.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** The mandatory Team Revision blocker is wired through production state, but full Sabotage browser confirmation, refresh, and undo evidence remains outstanding.

### Haze Curse

- **Token ID:** `haze-curse`
- **Runtime status:** `partial`
- **Runtime usability:** `usable` - Haze selects two exact Active-roster anchors with different species and suppresses structured buffs across each species with per-instance protection.
- **Resolver:** `automatic` / `hazeCurse`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Select two different species anchors and suppress structured buffs species-wide with exact-instance protection | Partially Covered | SEB-001 | Two-Gym browser expiration, generated-set enforcement, refresh, and History undo need effect-specific production evidence. |
| Production browser lifecycle | Not Covered | None | No effect-specific production browser scenario exists yet. |
| Refresh and duplicate completion | Not Covered | None | Pure resolver identity and undo are covered where noted; production refresh remains unverified. |

#### Named Scenarios

##### HAZE-CURSE-BATCH-001 - Select two different species anchors and suppress structured buffs species-wide with exact-instance protection

- **Coverage:** Partially Covered
- **Test level:** Unit
- **Test file:** `scripts/test-settled-effect-batch.js`
- **Test ID:** `SEB-001`
- **Setup:** Create the smallest isolated state needed for the settled exact-record mechanic.
- **Action:** Run the canonical resolver and inspect exact identities, mutations, and fail-closed boundaries.
- **Expected gameplay result:** Duplicate species fail; both distinct names affect all unprotected matching Active instances; Substitute protects only its exact instance; saved buff records remain intact.
- **Exact assertions:**
  - Two different species are mandatory.
  - Duplicate species rows are disabled and chosen icons/names are shown.
  - Affected and protected exact IDs are distinct.
  - Buff data is not deleted.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** Two-Gym browser expiration, generated-set enforcement, refresh, and History undo need effect-specific production evidence.

### Imprison Curse

- **Token ID:** `imprison-curse`
- **Runtime status:** `verifiedComplete`
- **Runtime usability:** `usable` - This Token may be declared through its current runtime flow.
- **Resolver:** `automatic` / `statusEffect`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Exact Active Roster declaration anchor owned by any player | Covered | SCL-001 and SCL-002 | None recorded. |
| Species-wide application to every matching Active Roster instance | Covered | SCL-003 through SCL-006 | None recorded. |
| Non-Active and stale targets fail safely before mutation | Covered | SCL-002 and SCL-008 | None recorded. |
| Temporary neutral-Nature and zero EV/IV effective override | Covered | SCL-006 | None recorded. |
| Arena Trap Curse immunity and Substitute exclude exact matches independently | Covered | SCL-004 | None recorded. |
| Canonical owned-token picker exposes the Curse during its Sabotage window | Covered | BROWSER-007 | None recorded. |
| Causal result preserves the selected anchor plus affected and protected exact instances | Covered | SCL-003 through SCL-006 | None recorded. |
| Two-Gym phase-anchored expiration | Covered | SCL-007 and BROWSER-006 | None recorded. |
| Duplicate completion and undo | Covered | SCL-008 | None recorded. |
| Backend reload and visible browser refresh | Covered | SCL-009 and BROWSER-006 | None recorded. |
| Sandbox isolation and discard | Covered | TSB-023 | None recorded. |

#### Named Scenarios

##### IMPRISON-CURSE-TARGET-001 - Exact Active Roster anchor and pre-consumption rejection

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-standard-curse-tokens.js`
- **Test ID:** `SCL-002`
- **Setup:** The source has own and rival Active Roster Pokemon plus a Legacy record and duplicate species with stable IDs.
- **Action:** Declare a standard Curse against legal own/rival records and reject the non-Active record.
- **Expected gameplay result:** Only exact Active Roster instances may anchor the declaration and rejection does not consume a Token.
- **Exact assertions:**
  - Selected target type is rosterInstance.
  - Application scope is globalSpecies.
  - Controller relation is anyPlayer.
  - The Legacy target is rejected before consumption.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** A result-level automated scenario is required.

##### IMPRISON-CURSE-EFFECT-001 - Temporary neutral-Nature and zero EV/IV effective override

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-standard-curse-tokens.js`
- **Test ID:** `SCL-006`
- **Setup:** Duplicate matching Active Roster Pokemon across players have configured Teambuilder sets.
- **Action:** Resolve imprison-curse and calculate the effective build.
- **Expected gameplay result:** The effective set has neutral Nature and zero EVs/IVs while the configured spread remains intact.
- **Exact assertions:**
  - Effective Nature is neutral.
  - Effective EVs and IVs are zero.
  - Configured slot is byte-for-byte unchanged.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** Yes
- **Current gaps:** A result-level automated scenario is required.

##### IMPRISON-CURSE-PROTECTION-001 - Arena immunity and Substitute protect matching exact instances independently

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-standard-curse-tokens.js`
- **Test ID:** `SCL-004`
- **Setup:** Matching Active Roster Pokemon include one Arena Trapped instance, one Substitute instance, and one unprotected instance.
- **Action:** Declare a standard species-wide Curse from one legal exact anchor.
- **Expected gameplay result:** Each protected instance is excluded independently while the unprotected matching instance is affected.
- **Exact assertions:**
  - Arena immunity is preserved.
  - Only the matching Substitute becomes consumed.
  - Protected exact IDs are excluded.
  - The unprotected matching ID remains affected.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** A result-level automated scenario is required.

##### IMPRISON-CURSE-DURATION-001 - Two-Gym phase-anchored expiration

- **Coverage:** Covered
- **Test level:** Unit
- **Test file:** `scripts/test-standard-curse-tokens.js`
- **Test ID:** `SCL-007`
- **Setup:** A standard Curse resolves during Kanto Gym 1 Action Phase.
- **Action:** Advance first to Gym 3 Start and then Gym 3 Action Phase.
- **Expected gameplay result:** The Curse remains active before its matching phase and expires exactly at the matching phase boundary.
- **Exact assertions:**
  - Gym 3 Start does not expire the status.
  - Gym 3 Action expires exactly that status.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** A result-level automated scenario is required.

##### IMPRISON-CURSE-RECOVERY-001 - Stale-target refund, duplicate completion, and undo

- **Coverage:** Covered
- **Test level:** Integration
- **Test file:** `scripts/test-standard-curse-tokens.js`
- **Test ID:** `SCL-008`
- **Setup:** Separate declarations become stale, complete twice, and resolve before undo.
- **Action:** Attempt each completion and restore the declaration snapshot.
- **Expected gameplay result:** Stale failure refunds once, duplicate completion is inert, and undo restores the exact pre-declaration state.
- **Exact assertions:**
  - Stale failure refunds exactly once.
  - Second completion is rejected.
  - Undo removes the exact status and restores inventory.
- **Reload tested:** No
- **Undo tested:** Yes
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** A result-level automated scenario is required.

##### IMPRISON-CURSE-BROWSER-007 - Canonical Sabotage picker authority

- **Coverage:** Covered
- **Test level:** Browser
- **Test file:** `scripts/test-token-browser.js`
- **Test ID:** `BROWSER-007`
- **Setup:** The production Live Referee inventory contains real Curse records alongside category, Field-placeholder, blocked, development-only, and illegal-timing records.
- **Action:** Open the Token picker during the explicit Sabotage Curse window.
- **Expected gameplay result:** Only canonical owned usable Curses appear, with quantities counted from exact inventory records.
- **Exact assertions:**
  - The Curse appears under a non-selectable category heading.
  - Protection Token and legacy Electric/Grassy Field placeholders are absent.
  - Blocked, development-only, and illegal-timing records are absent.
  - An empty legal inventory renders the clean empty state.
- **Reload tested:** Yes
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** A result-level automated scenario is required.

##### IMPRISON-CURSE-BROWSER-006 - Visible standard Curse enforcement survives refresh and expires cleanly

- **Coverage:** Covered
- **Test level:** Browser
- **Test file:** `scripts/test-token-browser.js`
- **Test ID:** `BROWSER-006`
- **Setup:** The isolated Chromium scenario gives Steevee all five standard Curses and configured exact roster-instance sets.
- **Action:** Resolve all five Curses through visible controls, complete Silencing repair, refresh, expire at the phase anchor, and refresh again.
- **Expected gameplay result:** All five effective restrictions persist without erasing configured data, then all five expire and restore the configured view.
- **Exact assertions:**
  - Five active statuses survive refresh.
  - Forced item and Imprison overlays are visible.
  - Silencing repair remains completed.
  - Zero active statuses remain after expiration and refresh.
- **Reload tested:** Yes
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** Yes
- **Current gaps:** A result-level automated scenario is required.

##### IMPRISON-CURSE-SANDBOX-023 - Standard Curse stays isolated in the Token sandbox

- **Coverage:** Covered
- **Test level:** Integration
- **Test file:** `scripts/test-token-sandbox.js`
- **Test ID:** `TSB-023`
- **Setup:** A configured exact roster instance and Flame Curse Token are cloned into a sandbox session.
- **Action:** Resolve the Curse, prepare a commit candidate, then discard to the authoritative baseline.
- **Expected gameplay result:** The working state and candidate contain one exact status and consumption while discard restores zero statuses and the configured item.
- **Exact assertions:**
  - The real baseline remains byte-identical during resolution.
  - The commit candidate retains the exact Curse.
  - Discard removes the status and consumption.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** Yes
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** Yes
- **Current gaps:** General idempotent server commit behavior remains covered by shared TSB-019 through TSB-021 infrastructure.

### Devolve

- **Token ID:** `devolve-token`
- **Runtime status:** `partial`
- **Runtime usability:** `usable` - Devolve validates one unambiguous safe direct pre-evolution, applies a temporary species overlay to unprotected matching Active instances, and restores exact records at expiration.
- **Resolver:** `automatic` / `devolveCurse`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Apply one safe direct pre-evolution as a temporary species/build overlay to every unprotected matching Active instance | Partially Covered | SEB-002 | Required Team Revision behavior for newly illegal sets and production refresh/undo/expiration need effect-specific browser evidence. |
| Production browser lifecycle | Not Covered | None | No effect-specific production browser scenario exists yet. |
| Refresh and duplicate completion | Not Covered | None | Pure resolver identity and undo are covered where noted; production refresh remains unverified. |

#### Named Scenarios

##### DEVOLVE-TOKEN-BATCH-001 - Apply one safe direct pre-evolution as a temporary species/build overlay to every unprotected matching Active instance

- **Coverage:** Partially Covered
- **Test level:** Unit
- **Test file:** `scripts/test-settled-effect-batch.js`
- **Test ID:** `SEB-002`
- **Setup:** Create the smallest isolated state needed for the settled exact-record mechanic.
- **Action:** Run the canonical resolver and inspect exact identities, mutations, and fail-closed boundaries.
- **Expected gameplay result:** Ambiguous or missing parent data fails before mutation; valid species-wide overlays preserve roster IDs and exact expiration removes the temporary overlays.
- **Exact assertions:**
  - Unsafe parent data fails closed.
  - Every matching Active instance is handled independently.
  - Roster identities never change.
  - Expiration restores the original configured species.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** Required Team Revision behavior for newly illegal sets and production refresh/undo/expiration need effect-specific browser evidence.

### Purge Curse

- **Token ID:** `purge-curse`
- **Runtime status:** `partial`
- **Runtime usability:** `usable` - Purge records an absolute target-player marker, then atomically releases that player's immutable brought-team snapshot after Gym payout.
- **Resolver:** `automatic` / `purgeAfterBattle`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Absolutely release every exact Pokemon in the target player's immutable brought snapshot after payout | Partially Covered | STR-007 | Production post-payout wiring and non-respondable declaration are statically asserted by STR-010; browser refresh, rollback/refund, and host undo are not yet exercised end to end. |
| Production browser lifecycle | Not Covered | None | A destructive production-browser scenario has not been approved for this slice. |
| Refresh and administrative undo | Not Covered | None | The pure resolver snapshot is covered where applicable; the production UI lifecycle still needs focused evidence. |

#### Named Scenarios

##### PURGE-CURSE-SETTLED-001 - Absolutely release every exact Pokemon in the target player's immutable brought snapshot after payout

- **Coverage:** Partially Covered
- **Test level:** Unit
- **Test file:** `scripts/test-settled-token-rulings.js`
- **Test ID:** `STR-007`
- **Setup:** Create the smallest isolated state required by the settled mechanic contract.
- **Action:** Run the pure resolver or contract-safety boundary.
- **Expected gameplay result:** Every snapshotted exact record is released once; gameplay protection is ignored; duplicate completion is inert and snapshot undo restores state.
- **Exact assertions:**
  - Resolution is atomic.
  - All immutable snapshot IDs are released.
  - Duplicate operation ID does not replay.
  - Undo restores the exact pre-resolution snapshot.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** Production post-payout wiring and non-respondable declaration are statically asserted by STR-010; browser refresh, rollback/refund, and host undo are not yet exercised end to end.

### Payday

- **Token ID:** `payday-field`
- **Runtime status:** `partial`
- **Runtime usability:** `usable` - This Token may be declared through its current runtime flow.
- **Resolver:** `automatic` / `fieldState`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Declared gameplay result | Static Only | Contract and runtime wiring only | No executable result-level Token scenario exists. |

#### Named Scenarios

##### PAYDAY-FIELD-STATIC - Current runtime path inventory

- **Coverage:** Static Only
- **Test level:** Static Wiring
- **Test file:** `None`
- **Test ID:** `None`
- **Setup:** Load the Token contract and inspect the registered runtime path.
- **Action:** Confirm that the Token has a catalog definition and a resolver/wiring declaration.
- **Expected gameplay result:** The report records the path without claiming that its gameplay result works.
- **Exact assertions:**
  - No gameplay-state assertion exists for this Token.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** No field replacement, money effect, persistence, or expiration result is asserted.

### Drizzle

- **Token ID:** `drizzle-field`
- **Runtime status:** `partial`
- **Runtime usability:** `usable` - This Token may be declared through its current runtime flow.
- **Resolver:** `automatic` / `fieldState`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Declared gameplay result | Static Only | Contract and runtime wiring only | No executable result-level Token scenario exists. |

#### Named Scenarios

##### DRIZZLE-FIELD-STATIC - Current runtime path inventory

- **Coverage:** Static Only
- **Test level:** Static Wiring
- **Test file:** `None`
- **Test ID:** `None`
- **Setup:** Load the Token contract and inspect the registered runtime path.
- **Action:** Confirm that the Token has a catalog definition and a resolver/wiring declaration.
- **Expected gameplay result:** The report records the path without claiming that its gameplay result works.
- **Exact assertions:**
  - No gameplay-state assertion exists for this Token.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** No field replacement or ongoing weather result is asserted.

### Drought

- **Token ID:** `drought-field`
- **Runtime status:** `partial`
- **Runtime usability:** `usable` - This Token may be declared through its current runtime flow.
- **Resolver:** `automatic` / `fieldState`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Declared gameplay result | Static Only | Contract and runtime wiring only | No executable result-level Token scenario exists. |

#### Named Scenarios

##### DROUGHT-FIELD-STATIC - Current runtime path inventory

- **Coverage:** Static Only
- **Test level:** Static Wiring
- **Test file:** `None`
- **Test ID:** `None`
- **Setup:** Load the Token contract and inspect the registered runtime path.
- **Action:** Confirm that the Token has a catalog definition and a resolver/wiring declaration.
- **Expected gameplay result:** The report records the path without claiming that its gameplay result works.
- **Exact assertions:**
  - No gameplay-state assertion exists for this Token.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** No field replacement or ongoing weather result is asserted.

### Taunt

- **Token ID:** `taunt-field`
- **Runtime status:** `partial`
- **Runtime usability:** `usable` - This Token may be declared through its current runtime flow.
- **Resolver:** `automatic` / `fieldState`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Declared gameplay result | Static Only | Contract and runtime wiring only | No executable result-level Token scenario exists. |

#### Named Scenarios

##### TAUNT-FIELD-STATIC - Current runtime path inventory

- **Coverage:** Static Only
- **Test level:** Static Wiring
- **Test file:** `None`
- **Test ID:** `None`
- **Setup:** Load the Token contract and inspect the registered runtime path.
- **Action:** Confirm that the Token has a catalog definition and a resolver/wiring declaration.
- **Expected gameplay result:** The report records the path without claiming that its gameplay result works.
- **Exact assertions:**
  - No gameplay-state assertion exists for this Token.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** No field replacement or declared lockout result is asserted.

### Snow Warning

- **Token ID:** `snow-warning-field`
- **Runtime status:** `partial`
- **Runtime usability:** `usable` - This Token may be declared through its current runtime flow.
- **Resolver:** `automatic` / `fieldState`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Declared gameplay result | Static Only | Contract and runtime wiring only | No executable result-level Token scenario exists. |

#### Named Scenarios

##### SNOW-WARNING-FIELD-STATIC - Current runtime path inventory

- **Coverage:** Static Only
- **Test level:** Static Wiring
- **Test file:** `None`
- **Test ID:** `None`
- **Setup:** Load the Token contract and inspect the registered runtime path.
- **Action:** Confirm that the Token has a catalog definition and a resolver/wiring declaration.
- **Expected gameplay result:** The report records the path without claiming that its gameplay result works.
- **Exact assertions:**
  - No gameplay-state assertion exists for this Token.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** No field replacement or ongoing weather result is asserted.

### Sand Stream

- **Token ID:** `sand-stream-field`
- **Runtime status:** `partial`
- **Runtime usability:** `usable` - This Token may be declared through its current runtime flow.
- **Resolver:** `automatic` / `fieldState`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Declared gameplay result | Static Only | Contract and runtime wiring only | No executable result-level Token scenario exists. |

#### Named Scenarios

##### SAND-STREAM-FIELD-STATIC - Current runtime path inventory

- **Coverage:** Static Only
- **Test level:** Static Wiring
- **Test file:** `None`
- **Test ID:** `None`
- **Setup:** Load the Token contract and inspect the registered runtime path.
- **Action:** Confirm that the Token has a catalog definition and a resolver/wiring declaration.
- **Expected gameplay result:** The report records the path without claiming that its gameplay result works.
- **Exact assertions:**
  - No gameplay-state assertion exists for this Token.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** No field replacement or ongoing weather result is asserted.

### Infestation

- **Token ID:** `infestation-field`
- **Runtime status:** `partial`
- **Runtime usability:** `usable` - This Token may be declared through its current runtime flow.
- **Resolver:** `automatic` / `fieldState`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Declared gameplay result | Static Only | Contract and runtime wiring only | No executable result-level Token scenario exists. |

#### Named Scenarios

##### INFESTATION-FIELD-STATIC - Current runtime path inventory

- **Coverage:** Static Only
- **Test level:** Static Wiring
- **Test file:** `None`
- **Test ID:** `None`
- **Setup:** Load the Token contract and inspect the registered runtime path.
- **Action:** Confirm that the Token has a catalog definition and a resolver/wiring declaration.
- **Expected gameplay result:** The report records the path without claiming that its gameplay result works.
- **Exact assertions:**
  - No gameplay-state assertion exists for this Token.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** No field replacement or ongoing effect result is asserted.

### Surging Strikes

- **Token ID:** `surging-strikes-field`
- **Runtime status:** `partial`
- **Runtime usability:** `usable` - This Token may be declared through its current runtime flow.
- **Resolver:** `automatic` / `fieldState`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Declared gameplay result | Static Only | Contract and runtime wiring only | No executable result-level Token scenario exists. |

#### Named Scenarios

##### SURGING-STRIKES-FIELD-STATIC - Current runtime path inventory

- **Coverage:** Static Only
- **Test level:** Static Wiring
- **Test file:** `None`
- **Test ID:** `None`
- **Setup:** Load the Token contract and inspect the registered runtime path.
- **Action:** Confirm that the Token has a catalog definition and a resolver/wiring declaration.
- **Expected gameplay result:** The report records the path without claiming that its gameplay result works.
- **Exact assertions:**
  - No gameplay-state assertion exists for this Token.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** No field replacement or ongoing effect result is asserted.

### Ditto

- **Token ID:** `ditto-token`
- **Runtime status:** `partial`
- **Runtime usability:** `usable` - Ditto transforms its exact owned inventory record into one canonical inventory copy chosen from the searchable activatable Token catalog; it does not activate the copy immediately.
- **Resolver:** `automatic` / `copyTokenInventory`

#### Required Outcome Coverage

| Required outcome | Coverage | Evidence | Current gap |
| --- | --- | --- | --- |
| Transform one exact Ditto inventory record into one canonical chosen Token inventory record without activating it | Partially Covered | SEB-006 | The production picker is wired, but browser refresh, exact source-record transformation presentation, and History undo need effect-specific evidence. |
| Production browser lifecycle | Not Covered | None | No effect-specific production browser scenario exists yet. |
| Refresh and duplicate completion | Not Covered | None | Pure resolver identity and undo are covered where noted; production refresh remains unverified. |

#### Named Scenarios

##### DITTO-TOKEN-BATCH-001 - Transform one exact Ditto inventory record into one canonical chosen Token inventory record without activating it

- **Coverage:** Partially Covered
- **Test level:** Unit
- **Test file:** `scripts/test-settled-effect-batch.js`
- **Test ID:** `SEB-006`
- **Setup:** Create the smallest isolated state needed for the settled exact-record mechanic.
- **Action:** Run the canonical resolver and inspect exact identities, mutations, and fail-closed boundaries.
- **Expected gameplay result:** The replacement has canonical identity and Ditto provenance, creates no activation, does not duplicate on replay, and snapshot undo removes it.
- **Exact assertions:**
  - The exact source operation is idempotent.
  - The selected canonical definition is preserved.
  - No copied activation is created.
  - Undo restores the pre-copy inventory snapshot.
- **Reload tested:** No
- **Undo tested:** No
- **Sandbox discard tested:** No
- **Sandbox commit tested:** No
- **Teambuilder enforcement tested:** No
- **Current gaps:** The production picker is wired, but browser refresh, exact source-record transformation presentation, and History undo need effect-specific evidence.

## Missing Automated Coverage Before The Next Token Batch

- **Cold Wave:** Production browser lifecycle; Refresh and administrative undo.
- **Rage Candy Bar:** Owned target only; Undo.
- **Lingering Aroma:** Production browser lifecycle; Refresh and administrative undo.
- **Safeguard:** Declared gameplay result.
- **Embargo:** Declared gameplay result.
- **Smokescreen:** Production browser lifecycle; Refresh and administrative undo.
- **Reroll:** Declared gameplay result.
- **Honey:** Production browser lifecycle; Refresh and duplicate completion.
- **Move Deleter:** Production browser lifecycle; Refresh and administrative undo.
- **Knock Off Curse:** Production browser lifecycle; Refresh and duplicate completion.
- **Haze Curse:** Production browser lifecycle; Refresh and duplicate completion.
- **Devolve:** Production browser lifecycle; Refresh and duplicate completion.
- **Purge Curse:** Production browser lifecycle; Refresh and administrative undo.
- **Payday:** Declared gameplay result.
- **Drizzle:** Declared gameplay result.
- **Drought:** Declared gameplay result.
- **Taunt:** Declared gameplay result.
- **Snow Warning:** Declared gameplay result.
- **Sand Stream:** Declared gameplay result.
- **Infestation:** Declared gameplay result.
- **Surging Strikes:** Declared gameplay result.
- **Ditto:** Production browser lifecycle; Refresh and duplicate completion.

## Minimal Manual Browser Smoke

1. In the full Live Referee with normal multiplayer identity, declare one current-slice Token and verify the prompted response owner, visible resolution announcement, and inventory/log result.
2. At real Gym boundaries, verify the approved final Token-consumption and multi-Gym expiration rulings once those universal lifecycle decisions are settled.

