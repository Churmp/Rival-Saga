# V1 Purge Stage 6B — Production Runtime Summary

Generated from `b53ab06335b623a59f32ecb9a6758b30c8b3f8db`.

Scope is intentionally limited to files that ship or directly define production behavior:

- `app.js`
- `index.html`
- `server.js`
- `styles.css`
- `token-effect-contract.js`

Unique runtime contamination hits: **87**

## Summary

| File | Group | Marker | Lines |
|---|---|---|---|
| `app.js` | Encounter-specific token contract residue | `"extraEncounter"` | 3001, 3307, 3899, 56410 |
| `app.js` | Encounter-specific token contract residue | `resolverId: "extraEncounter"` | 3001 |
| `app.js` | Hidden Grotto residue | `Hidden Grotto` | 1150, 1294, 2194, 38582 |
| `app.js` | Retired Encounter Wheel residue | `Encounter Wheel` | 2229, 2770, 38383, 38392, 38556 |
| `app.js` | Retired Encounter Wheel residue | `encounterWheelDefinition(` | 38380 |
| `app.js` | Retired Encounter Wheel residue | `sourceType === "encounter"` | 23158, 26173, 27603 |
| `app.js` | Retired Encounter Wheel residue | `startEncounterSession(` | 41557 |
| `styles.css` | Encounter CSS/static residue | `.encounter-controls` | 16619 |
| `styles.css` | Encounter CSS/static residue | `.encounter-entry` | 16673, 16682, 16693, 16699, 16700, 16704 |
| `styles.css` | Encounter CSS/static residue | `.encounter-layout` | 16611 |
| `styles.css` | Encounter CSS/static residue | `.encounter-modal` | 16573, 16587, 16588, 16589, 16590, 16591, 16592, 16596, 16597, 16598, 16599, 16603, 16604, 16605 |
| `styles.css` | Encounter CSS/static residue | `.encounter-overlay` | 16558, 16569 |
| `styles.css` | Encounter CSS/static residue | `.encounter-result` | 16742, 16747, 16758, 16765, 16770, 16781, 16787, 16792, 16799 |
| `styles.css` | Encounter CSS/static residue | `.encounter-tab` | 16542, 16568 |
| `styles.css` | Encounter CSS/static residue | `.encounter-toggle` | 16656, 16662 |
| `styles.css` | Encounter CSS/static residue | `.encounter-wheel` | 16618, 16624, 16631 |
| `token-effect-contract.js` | Encounter-specific token contract residue | `"encounterChoose"` | 381, 771 |
| `token-effect-contract.js` | Encounter-specific token contract residue | `"encounterCopy"` | 380, 770, 818 |
| `token-effect-contract.js` | Encounter-specific token contract residue | `"encounterGrant"` | 380, 769, 772 |
| `token-effect-contract.js` | Encounter-specific token contract residue | `"encounterTransfer"` | 380, 768 |
| `token-effect-contract.js` | Encounter-specific token contract residue | `"encounterWheelEdit"` | 380, 767 |
| `token-effect-contract.js` | Encounter-specific token contract residue | `"extraEncounter"` | 380, 766 |
| `token-effect-contract.js` | Encounter-specific token contract residue | `resolverId: "encounterChoose"` | 771 |
| `token-effect-contract.js` | Encounter-specific token contract residue | `resolverId: "encounterCopy"` | 770, 818 |
| `token-effect-contract.js` | Encounter-specific token contract residue | `resolverId: "encounterGrant"` | 769, 772 |
| `token-effect-contract.js` | Encounter-specific token contract residue | `resolverId: "encounterTransfer"` | 768 |
| `token-effect-contract.js` | Encounter-specific token contract residue | `resolverId: "encounterWheelEdit"` | 767 |
| `token-effect-contract.js` | Encounter-specific token contract residue | `resolverId: "extraEncounter"` | 766 |
| `token-effect-contract.js` | Hidden Grotto residue | `Hidden Grotto` | 770 |
| `token-effect-contract.js` | Obsolete encounter QA/test names | `encounter-token-runtime` | 110, 262, 332, 339 |
| `token-effect-contract.js` | Retired Encounter Wheel residue | `Encounter Wheel` | 766 |

## Detailed contexts

### `app.js`

#### Encounter-specific token contract residue — `"extraEncounter"` — line 3001

```text
  2998 |     canRespondTo: [],
  2999 |     visibility: "public",
  3000 |     logType: "tokenUsed",
  3001 |     resolverId: "extraEncounter"
  3002 |   }),
  3003 |   "restrict-token": Object.freeze({
  3004 |     id: "restrict-token",
```

#### Encounter-specific token contract residue — `resolverId: "extraEncounter"` — line 3001

```text
  2998 |     canRespondTo: [],
  2999 |     visibility: "public",
  3000 |     logType: "tokenUsed",
  3001 |     resolverId: "extraEncounter"
  3002 |   }),
  3003 |   "restrict-token": Object.freeze({
  3004 |     id: "restrict-token",
```

#### Encounter-specific token contract residue — `"extraEncounter"` — line 3307

```text
  3304 |   if (key === "reroll-token" || key === "reroll") return EFFECT_RESOLUTION_MODES.AUTOMATIC;
  3305 |   if (["restrict", "immunity", "counterProtection", "substituteAttach"].includes(definition.resolverId)) return EFFECT_RESOLUTION_MODES.AUTOMATIC;
  3306 |   if (definition.resolverId === "safeguard") return EFFECT_RESOLUTION_MODES.AUTOMATIC;
  3307 |   if (definition.resolverId === "extraEncounter") return EFFECT_RESOLUTION_MODES.AUTOMATIC;
  3308 |   return EFFECT_RESOLUTION_MODES.HOST_CONFIRMED;
  3309 | }
  3310 |
```

#### Encounter-specific token contract residue — `"extraEncounter"` — line 3899

```text
  3896 |
  3897 | async function resolveImmediateTokenUse(draft, { context = {} } = {}) {
  3898 |   const metadata = tokenEffectMetadataByName(draft.tokenName);
  3899 |   if (metadata.resolverId === "extraEncounter") {
  3900 |     alert("Extra Encounter is used from the current Route action. Open Routes and use the Token on the Route you want to explore.");
  3901 |     return null;
  3902 |   }
```

#### Encounter-specific token contract residue — `"extraEncounter"` — line 56410

```text
 56407 |       return;
 56408 |     }
 56409 |     const utilityDefinition = activationDraft.utilityDefinitionId ? utilityTokenDefinitions[activationDraft.utilityDefinitionId] : utilityTokenDefinitionByName(effect.name);
 56410 |     if (utilityDefinition && ["extraEncounter", "safeguard"].includes(engineMetadata.resolverId)) {
 56411 |       const targetPlayer = engineMetadata.selfOnly
 56412 |         ? player
 56413 |         : state.players.find((candidate) => candidate.id === els.activationTargetPlayer.value) || player;
```

#### Hidden Grotto residue — `Hidden Grotto` — line 1150

```text
  1147 |     "id": "grotto-regular",
  1148 |     "name": "Grotto Regular",
  1149 |     "tier": "C",
  1150 |     "description": "Hidden Grotto Encounters Cost 750 Less For You.",
  1151 |     "isConsumable": false,
  1152 |     "uses": null
  1153 |   },
```

#### Hidden Grotto residue — `Hidden Grotto` — line 1294

```text
  1291 |     "id": "encounter-pro",
  1292 |     "name": "Encounter Pro",
  1293 |     "tier": "A",
  1294 |     "description": "Once Per Action Phase Get A Free Hidden Grotto Encounter.",
  1295 |     "isConsumable": false,
  1296 |     "uses": null
  1297 |   },
```

#### Hidden Grotto residue — `Hidden Grotto` — line 2194

```text
  2191 |     "id": "grotto-pass",
  2192 |     "name": "Grotto Pass",
  2193 |     "tier": "C",
  2194 |     "description": "Visit The Hidden Grotto Without Using An Action.",
  2195 |     "isConsumable": true,
  2196 |     "uses": 2
  2197 |   },
```

#### Hidden Grotto residue — `Hidden Grotto` — line 38582

```text
 38579 |   medium: [
 38580 |     ["Off My Meds", "Visit The Pokemon Center & Use A Center's Paid Option."],
 38581 |     ["Prize Pokemon", "Win At The Game Corner Or Use A Game Corner Ticket."],
 38582 |     ["Tracking The Beast", "Catch A Pokemon From The Hidden Grotto"],
 38583 |     ["The Dragon's Discount", "Leave A Pokemon In The Dragons Den"],
 38584 |     ["Supply Run", "Spend 9K"],
 38585 |     ["Gravekeeper Complaint", "Release 10K (1000 BST) Worth Of Pokemon"],
```

#### Retired Encounter Wheel residue — `Encounter Wheel` — line 2229

```text
  2226 |       name: "Encounter",
  2227 |       category: "pokemon",
  2228 |       actionCost: 1,
  2229 |       summary: "Roll the Encounter Wheel for the current gym twice.",
  2230 |       effects: [{ type: "roll-wheel", wheel: "encounter", rolls: 2 }]
  2231 |     },
  2232 |     {
```

#### Retired Encounter Wheel residue — `Encounter Wheel` — line 2770

```text
  2767 |   "immunity": { names: ["Immunity", "Emergency Immunity Token"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Immunity", note: "Negates one effect/global effect." },
  2768 |   "revenge": { names: ["Revenge"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Revenge Pending", note: "Post-curse revenge marker." },
  2769 |   "extra-encounter-token": { names: ["Extra Encounter Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Extra Encounter Available", note: "Spend during Action Phase to roll an extra encounter." },
  2770 |   "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, choiceLabel: "Pokemon Name", effectType: "log", note: "Remove one Pokemon per 5 entries from Encounter Wheel. Wheel editor hook pending." },
  2771 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
  2772 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
  2773 |   "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "At End of Action, copies one immutable completed Encounter result into a new acquisition-ready Encounter without rerolling." },
```

#### Retired Encounter Wheel residue — `sourceType === "encounter"` — line 23158

```text
 23155 | function createPokemonResultTimingWindow(session, player) {
 23156 |   if (!session || session.interactionEventId || !player) return null;
 23157 |   const resultName = session.resultDisplayName || session.resultPokemonName || "Pokemon result";
 23158 |   const isEncounter = session.sourceType === "encounter";
 23159 |   const activity = createInteractionEvent({
 23160 |     type: isEncounter ? "encounter-result" : "pokemon-result",
 23161 |     title: `${player.name} rolled ${resultName}`,
```

#### Retired Encounter Wheel residue — `sourceType === "encounter"` — line 26173

```text
 26170 |     const resultOwner = targetState.players.find((player) => player.id === resultOwnerId);
 26171 |     const resultName = resultSession?.resultDisplayName || pendingEvent.payload?.resultName || "";
 26172 |     const sourceLabel = resultSession?.sourceLabel || pendingEvent.payload?.sourceLabel || pendingEvent.sourceType || "Event";
 26173 |     const isEncounterResult = Boolean(resultSession?.sourceType === "encounter" || pendingEvent.type === "encounter-result");
 26174 |     const tokenPrompt = liveTokenPromptDetails(pendingEvent, resultSession, targetState);
 26175 |     const promptDisplay = liveCurrentPromptDetails(pendingEvent, tokenPrompt, currentPromptStep, respondingToPromptStep);
 26176 |     if (resultSession) {
```

#### Retired Encounter Wheel residue — `sourceType === "encounter"` — line 27603

```text
 27600 |   if (!activity || activity.status !== "open") return null;
 27601 |   const session = liveResultSessionForActivity(activity);
 27602 |   if (activity.type === "encounter-result" || activity.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT) return activity;
 27603 |   if (session?.sourceType === "encounter") return activity;
 27604 |   return null;
 27605 | }
 27606 |
```

#### Retired Encounter Wheel residue — `encounterWheelDefinition(` — line 38380

```text
 38377 |   if (location.id === "ranger-base") return [];
 38378 |   if (location.id === "pokemon-center") return [];
 38379 |   if (location.id === "encounter") {
 38380 |     const wheel = encounterWheelDefinition();
 38381 |     return [{
 38382 |       id: "encounter-wheel",
 38383 |       label: "Open Encounter Wheel",
```

#### Retired Encounter Wheel residue — `Encounter Wheel` — line 38383

```text
 38380 |     const wheel = encounterWheelDefinition();
 38381 |     return [{
 38382 |       id: "encounter-wheel",
 38383 |       label: "Open Encounter Wheel",
 38384 |       buttonLabel: "Spend 1 Action",
 38385 |       description: wheel
 38386 |         ? `Spend 1 Action to roll ${wheel.name} twice. Encounter results can be confirmed as Pokemon Results.`
```

#### Retired Encounter Wheel residue — `Encounter Wheel` — line 38392

```text
 38389 |       maxUsesPerAction: wheel?.rollsPerAction || 2,
 38390 |       allowsMultipleUses: false,
 38391 |       disabled: !wheel,
 38392 |       disabledReason: wheel ? "" : "No Encounter Wheel is defined for this Series/Gym.",
 38393 |       implementationStatus: "Implemented MVP"
 38394 |     }];
 38395 |   }
```

#### Retired Encounter Wheel residue — `Encounter Wheel` — line 38556

```text
 38553 |
 38554 | const bulletinQuestBank = Object.freeze({
 38555 |   easy: [
 38556 |     ["Pokemon Hunt", "Spin The Encounter Wheel Twice"],
 38557 |     ["Find An Item", "Visit The Department Store & Buy An Item"],
 38558 |     ["Ranger Check-In", "Visit The Ranger Base"],
 38559 |     ["Help Me", "Discard A Pokemon At The Cemetry"],
```

#### Retired Encounter Wheel residue — `startEncounterSession(` — line 41557

```text
 41554 |       return;
 41555 |     }
 41556 |     if (location?.id === "encounter") {
 41557 |       if (!startEncounterSession({ skipConfirmCheck: true })) {
 41558 |         throw new Error("The Encounter location could not start.");
 41559 |       }
 41560 |       await persistStartedActionDestination();
```

### `styles.css`

#### Encounter CSS/static residue — `.encounter-tab` — line 16542

```text
 16539 |   gap: 8px;
 16540 | }
 16541 |
 16542 | .encounter-tab {
 16543 |   position: fixed;
 16544 |   right: 0;
 16545 |   bottom: 220px;
```

#### Encounter CSS/static residue — `.encounter-overlay` — line 16558

```text
 16555 |   font-weight: 900;
 16556 | }
 16557 |
 16558 | .encounter-overlay {
 16559 |   position: fixed;
 16560 |   inset: 0;
 16561 |   z-index: 75;
```

#### Encounter CSS/static residue — `.encounter-tab` — line 16568

```text
 16565 |   padding: 18px;
 16566 | }
 16567 |
 16568 | .encounter-tab.hidden,
 16569 | .encounter-overlay.hidden {
 16570 |   display: none;
 16571 | }
```

#### Encounter CSS/static residue — `.encounter-overlay` — line 16569

```text
 16566 | }
 16567 |
 16568 | .encounter-tab.hidden,
 16569 | .encounter-overlay.hidden {
 16570 |   display: none;
 16571 | }
 16572 |
```

#### Encounter CSS/static residue — `.encounter-modal` — line 16573

```text
 16570 |   display: none;
 16571 | }
 16572 |
 16573 | .encounter-modal {
 16574 |   display: grid;
 16575 |   gap: 14px;
 16576 |   width: min(1120px, calc(100vw - 36px));
```

#### Encounter CSS/static residue — `.encounter-modal` — line 16587

```text
 16584 |   padding: 16px;
 16585 | }
 16586 |
 16587 | .encounter-modal .eyebrow,
 16588 | .encounter-modal h2,
 16589 | .encounter-modal h3,
 16590 | .encounter-modal strong,
```

#### Encounter CSS/static residue — `.encounter-modal` — line 16588

```text
 16585 | }
 16586 |
 16587 | .encounter-modal .eyebrow,
 16588 | .encounter-modal h2,
 16589 | .encounter-modal h3,
 16590 | .encounter-modal strong,
 16591 | .encounter-modal label,
```

#### Encounter CSS/static residue — `.encounter-modal` — line 16589

```text
 16586 |
 16587 | .encounter-modal .eyebrow,
 16588 | .encounter-modal h2,
 16589 | .encounter-modal h3,
 16590 | .encounter-modal strong,
 16591 | .encounter-modal label,
 16592 | .encounter-modal .wheel-latest-result {
```

#### Encounter CSS/static residue — `.encounter-modal` — line 16590

```text
 16587 | .encounter-modal .eyebrow,
 16588 | .encounter-modal h2,
 16589 | .encounter-modal h3,
 16590 | .encounter-modal strong,
 16591 | .encounter-modal label,
 16592 | .encounter-modal .wheel-latest-result {
 16593 |   color: #f8fbff;
```

#### Encounter CSS/static residue — `.encounter-modal` — line 16591

```text
 16588 | .encounter-modal h2,
 16589 | .encounter-modal h3,
 16590 | .encounter-modal strong,
 16591 | .encounter-modal label,
 16592 | .encounter-modal .wheel-latest-result {
 16593 |   color: #f8fbff;
 16594 | }
```

#### Encounter CSS/static residue — `.encounter-modal` — line 16592

```text
 16589 | .encounter-modal h3,
 16590 | .encounter-modal strong,
 16591 | .encounter-modal label,
 16592 | .encounter-modal .wheel-latest-result {
 16593 |   color: #f8fbff;
 16594 | }
 16595 |
```

#### Encounter CSS/static residue — `.encounter-modal` — line 16596

```text
 16593 |   color: #f8fbff;
 16594 | }
 16595 |
 16596 | .encounter-modal span,
 16597 | .encounter-modal .gc-rule-note,
 16598 | .encounter-modal .empty-state,
 16599 | .encounter-modal .wheel-meta span {
```

#### Encounter CSS/static residue — `.encounter-modal` — line 16597

```text
 16594 | }
 16595 |
 16596 | .encounter-modal span,
 16597 | .encounter-modal .gc-rule-note,
 16598 | .encounter-modal .empty-state,
 16599 | .encounter-modal .wheel-meta span {
 16600 |   color: #cfe4f7;
```

#### Encounter CSS/static residue — `.encounter-modal` — line 16598

```text
 16595 |
 16596 | .encounter-modal span,
 16597 | .encounter-modal .gc-rule-note,
 16598 | .encounter-modal .empty-state,
 16599 | .encounter-modal .wheel-meta span {
 16600 |   color: #cfe4f7;
 16601 | }
```

#### Encounter CSS/static residue — `.encounter-modal` — line 16599

```text
 16596 | .encounter-modal span,
 16597 | .encounter-modal .gc-rule-note,
 16598 | .encounter-modal .empty-state,
 16599 | .encounter-modal .wheel-meta span {
 16600 |   color: #cfe4f7;
 16601 | }
 16602 |
```

#### Encounter CSS/static residue — `.encounter-modal` — line 16603

```text
 16600 |   color: #cfe4f7;
 16601 | }
 16602 |
 16603 | .encounter-modal .wheel-meta > div,
 16604 | .encounter-modal .wheel-latest-result,
 16605 | .encounter-modal .empty-state.compact {
 16606 |   border-color: rgba(207, 228, 247, 0.3);
```

#### Encounter CSS/static residue — `.encounter-modal` — line 16604

```text
 16601 | }
 16602 |
 16603 | .encounter-modal .wheel-meta > div,
 16604 | .encounter-modal .wheel-latest-result,
 16605 | .encounter-modal .empty-state.compact {
 16606 |   border-color: rgba(207, 228, 247, 0.3);
 16607 |   background: rgba(255, 255, 255, 0.08);
```

#### Encounter CSS/static residue — `.encounter-modal` — line 16605

```text
 16602 |
 16603 | .encounter-modal .wheel-meta > div,
 16604 | .encounter-modal .wheel-latest-result,
 16605 | .encounter-modal .empty-state.compact {
 16606 |   border-color: rgba(207, 228, 247, 0.3);
 16607 |   background: rgba(255, 255, 255, 0.08);
 16608 |   color: #f8fbff;
```

#### Encounter CSS/static residue — `.encounter-layout` — line 16611

```text
 16608 |   color: #f8fbff;
 16609 | }
 16610 |
 16611 | .encounter-layout {
 16612 |   display: grid;
 16613 |   grid-template-columns: minmax(280px, 420px) minmax(0, 1fr);
 16614 |   gap: 16px;
```

#### Encounter CSS/static residue — `.encounter-wheel` — line 16618

```text
 16615 |   align-items: start;
 16616 | }
 16617 |
 16618 | .encounter-wheel-section,
 16619 | .encounter-controls {
 16620 |   display: grid;
 16621 |   gap: 12px;
```

#### Encounter CSS/static residue — `.encounter-controls` — line 16619

```text
 16616 | }
 16617 |
 16618 | .encounter-wheel-section,
 16619 | .encounter-controls {
 16620 |   display: grid;
 16621 |   gap: 12px;
 16622 | }
```

#### Encounter CSS/static residue — `.encounter-wheel` — line 16624

```text
 16621 |   gap: 12px;
 16622 | }
 16623 |
 16624 | .encounter-wheel-visual {
 16625 |   width: min(390px, 70vw);
 16626 |   height: min(390px, 70vw);
 16627 |   aspect-ratio: 1 / 1;
```

#### Encounter CSS/static residue — `.encounter-wheel` — line 16631

```text
 16628 |   justify-self: center;
 16629 | }
 16630 |
 16631 | .encounter-wheel-face span {
 16632 |   display: none;
 16633 | }
 16634 |
```

#### Encounter CSS/static residue — `.encounter-toggle` — line 16656

```text
 16653 |   line-height: 1.15;
 16654 | }
 16655 |
 16656 | .encounter-toggle-row {
 16657 |   display: flex;
 16658 |   flex-wrap: wrap;
 16659 |   gap: 10px;
```

#### Encounter CSS/static residue — `.encounter-toggle` — line 16662

```text
 16659 |   gap: 10px;
 16660 | }
 16661 |
 16662 | .encounter-toggle-row label {
 16663 |   display: inline-flex;
 16664 |   align-items: center;
 16665 |   gap: 6px;
```

#### Encounter CSS/static residue — `.encounter-entry` — line 16673

```text
 16670 |   font-weight: 800;
 16671 | }
 16672 |
 16673 | .encounter-entry-list {
 16674 |   display: grid;
 16675 |   grid-template-columns: repeat(2, minmax(0, 1fr));
 16676 |   gap: 8px;
```

#### Encounter CSS/static residue — `.encounter-entry` — line 16682

```text
 16679 |   padding-right: 4px;
 16680 | }
 16681 |
 16682 | .encounter-entry {
 16683 |   display: grid;
 16684 |   grid-template-columns: minmax(0, 1fr) auto auto;
 16685 |   gap: 8px;
```

#### Encounter CSS/static residue — `.encounter-entry` — line 16693

```text
 16690 |   padding: 8px;
 16691 | }
 16692 |
 16693 | .encounter-entry.pointer-active {
 16694 |   border-color: #f8fbff;
 16695 |   background: rgba(45, 184, 215, 0.26);
 16696 |   box-shadow: 0 0 0 1px rgba(45, 184, 215, 0.65), 0 0 14px rgba(45, 184, 215, 0.28);
```

#### Encounter CSS/static residue — `.encounter-entry` — line 16699

```text
 16696 |   box-shadow: 0 0 0 1px rgba(45, 184, 215, 0.65), 0 0 14px rgba(45, 184, 215, 0.28);
 16697 | }
 16698 |
 16699 | .encounter-entry strong,
 16700 | .encounter-entry span {
 16701 |   display: block;
 16702 | }
```

#### Encounter CSS/static residue — `.encounter-entry` — line 16700

```text
 16697 | }
 16698 |
 16699 | .encounter-entry strong,
 16700 | .encounter-entry span {
 16701 |   display: block;
 16702 | }
 16703 |
```

#### Encounter CSS/static residue — `.encounter-entry` — line 16704

```text
 16701 |   display: block;
 16702 | }
 16703 |
 16704 | .encounter-entry span {
 16705 |   color: #cfe4f7;
 16706 |   font-size: 12px;
 16707 |   font-weight: 800;
```

#### Encounter CSS/static residue — `.encounter-result` — line 16742

```text
 16739 |   font-weight: 900;
 16740 | }
 16741 |
 16742 | .encounter-result-list {
 16743 |   display: grid;
 16744 |   gap: 8px;
 16745 | }
```

#### Encounter CSS/static residue — `.encounter-result` — line 16747

```text
 16744 |   gap: 8px;
 16745 | }
 16746 |
 16747 | .encounter-result-card {
 16748 |   display: grid;
 16749 |   grid-template-columns: 48px minmax(0, 1fr) auto;
 16750 |   align-items: center;
```

#### Encounter CSS/static residue — `.encounter-result` — line 16758

```text
 16755 |   padding: 8px;
 16756 | }
 16757 |
 16758 | .encounter-result-actions {
 16759 |   display: flex;
 16760 |   flex-wrap: wrap;
 16761 |   justify-content: flex-end;
```

#### Encounter CSS/static residue — `.encounter-result` — line 16765

```text
 16762 |   gap: 6px;
 16763 | }
 16764 |
 16765 | .encounter-result-actions .danger-lite {
 16766 |   border-color: rgba(255, 138, 101, 0.65);
 16767 |   color: #ffd8ca;
 16768 | }
```

#### Encounter CSS/static residue — `.encounter-result` — line 16770

```text
 16767 |   color: #ffd8ca;
 16768 | }
 16769 |
 16770 | .encounter-result-art {
 16771 |   display: grid;
 16772 |   place-items: center;
 16773 |   width: 48px;
```

#### Encounter CSS/static residue — `.encounter-result` — line 16781

```text
 16778 |   overflow: hidden;
 16779 | }
 16780 |
 16781 | .encounter-result-art img {
 16782 |   width: 42px;
 16783 |   height: 42px;
 16784 |   object-fit: contain;
```

#### Encounter CSS/static residue — `.encounter-result` — line 16787

```text
 16784 |   object-fit: contain;
 16785 | }
 16786 |
 16787 | .encounter-result-art span {
 16788 |   color: #f8fbff;
 16789 |   font-weight: 950;
 16790 | }
```

#### Encounter CSS/static residue — `.encounter-result` — line 16792

```text
 16789 |   font-weight: 950;
 16790 | }
 16791 |
 16792 | .encounter-result-actions {
 16793 |   display: flex;
 16794 |   flex-wrap: wrap;
 16795 |   justify-content: flex-end;
```

#### Encounter CSS/static residue — `.encounter-result` — line 16799

```text
 16796 |   gap: 6px;
 16797 | }
 16798 |
 16799 | .encounter-result-added {
 16800 |   border: 1px solid rgba(207, 228, 247, 0.35);
 16801 |   border-radius: 999px;
 16802 |   background: rgba(124, 198, 254, 0.18);
```

### `token-effect-contract.js`

#### Encounter-specific token contract residue — `"encounterCopy"` — line 380

```text
   377 |   const registeredResolverIds = Object.freeze([
   378 |     "hostConfirmed", "trainerClassWheel", "restrict", "utilityEffect", "wickedBlow", "statusEffect", "safeguard", "delayParent",
   379 |     "substituteAttach", "redirectParentToSelf", "teamPreviewSwap", "playerStatus", "copyParentEffect", "randomRedirect", "immunity",
   380 |     "revengeRelease", "reroll", "extraEncounter", "encounterWheelEdit", "encounterTransfer", "encounterGrant", "encounterCopy",
   381 |     "encounterChoose", "moveBan", "knockOff", "multiStatusEffect", "purgeAfterBattle", "copyToken",
   382 |     "arenaTrap", "clearSmog", "extraBan", "counterProtection", "ongoingEffectTextReplacement", "ongoingEffectSuppression",
   383 |     "hazeCurse", "devolveCurse", "copyTokenInventory",
```

#### Encounter-specific token contract residue — `"encounterGrant"` — line 380

```text
   377 |   const registeredResolverIds = Object.freeze([
   378 |     "hostConfirmed", "trainerClassWheel", "restrict", "utilityEffect", "wickedBlow", "statusEffect", "safeguard", "delayParent",
   379 |     "substituteAttach", "redirectParentToSelf", "teamPreviewSwap", "playerStatus", "copyParentEffect", "randomRedirect", "immunity",
   380 |     "revengeRelease", "reroll", "extraEncounter", "encounterWheelEdit", "encounterTransfer", "encounterGrant", "encounterCopy",
   381 |     "encounterChoose", "moveBan", "knockOff", "multiStatusEffect", "purgeAfterBattle", "copyToken",
   382 |     "arenaTrap", "clearSmog", "extraBan", "counterProtection", "ongoingEffectTextReplacement", "ongoingEffectSuppression",
   383 |     "hazeCurse", "devolveCurse", "copyTokenInventory",
```

#### Encounter-specific token contract residue — `"encounterTransfer"` — line 380

```text
   377 |   const registeredResolverIds = Object.freeze([
   378 |     "hostConfirmed", "trainerClassWheel", "restrict", "utilityEffect", "wickedBlow", "statusEffect", "safeguard", "delayParent",
   379 |     "substituteAttach", "redirectParentToSelf", "teamPreviewSwap", "playerStatus", "copyParentEffect", "randomRedirect", "immunity",
   380 |     "revengeRelease", "reroll", "extraEncounter", "encounterWheelEdit", "encounterTransfer", "encounterGrant", "encounterCopy",
   381 |     "encounterChoose", "moveBan", "knockOff", "multiStatusEffect", "purgeAfterBattle", "copyToken",
   382 |     "arenaTrap", "clearSmog", "extraBan", "counterProtection", "ongoingEffectTextReplacement", "ongoingEffectSuppression",
   383 |     "hazeCurse", "devolveCurse", "copyTokenInventory",
```

#### Encounter-specific token contract residue — `"encounterWheelEdit"` — line 380

```text
   377 |   const registeredResolverIds = Object.freeze([
   378 |     "hostConfirmed", "trainerClassWheel", "restrict", "utilityEffect", "wickedBlow", "statusEffect", "safeguard", "delayParent",
   379 |     "substituteAttach", "redirectParentToSelf", "teamPreviewSwap", "playerStatus", "copyParentEffect", "randomRedirect", "immunity",
   380 |     "revengeRelease", "reroll", "extraEncounter", "encounterWheelEdit", "encounterTransfer", "encounterGrant", "encounterCopy",
   381 |     "encounterChoose", "moveBan", "knockOff", "multiStatusEffect", "purgeAfterBattle", "copyToken",
   382 |     "arenaTrap", "clearSmog", "extraBan", "counterProtection", "ongoingEffectTextReplacement", "ongoingEffectSuppression",
   383 |     "hazeCurse", "devolveCurse", "copyTokenInventory",
```

#### Encounter-specific token contract residue — `"extraEncounter"` — line 380

```text
   377 |   const registeredResolverIds = Object.freeze([
   378 |     "hostConfirmed", "trainerClassWheel", "restrict", "utilityEffect", "wickedBlow", "statusEffect", "safeguard", "delayParent",
   379 |     "substituteAttach", "redirectParentToSelf", "teamPreviewSwap", "playerStatus", "copyParentEffect", "randomRedirect", "immunity",
   380 |     "revengeRelease", "reroll", "extraEncounter", "encounterWheelEdit", "encounterTransfer", "encounterGrant", "encounterCopy",
   381 |     "encounterChoose", "moveBan", "knockOff", "multiStatusEffect", "purgeAfterBattle", "copyToken",
   382 |     "arenaTrap", "clearSmog", "extraBan", "counterProtection", "ongoingEffectTextReplacement", "ongoingEffectSuppression",
   383 |     "hazeCurse", "devolveCurse", "copyTokenInventory",
```

#### Encounter-specific token contract residue — `"encounterChoose"` — line 381

```text
   378 |     "hostConfirmed", "trainerClassWheel", "restrict", "utilityEffect", "wickedBlow", "statusEffect", "safeguard", "delayParent",
   379 |     "substituteAttach", "redirectParentToSelf", "teamPreviewSwap", "playerStatus", "copyParentEffect", "randomRedirect", "immunity",
   380 |     "revengeRelease", "reroll", "extraEncounter", "encounterWheelEdit", "encounterTransfer", "encounterGrant", "encounterCopy",
   381 |     "encounterChoose", "moveBan", "knockOff", "multiStatusEffect", "purgeAfterBattle", "copyToken",
   382 |     "arenaTrap", "clearSmog", "extraBan", "counterProtection", "ongoingEffectTextReplacement", "ongoingEffectSuppression",
   383 |     "hazeCurse", "devolveCurse", "copyTokenInventory",
   384 |     "restoreNegatedTokenWithCooldown", "smokescreenRedirect"
```

#### Encounter-specific token contract residue — `"extraEncounter"` — line 766

```text
   763 |     protection({ id: "revenge", name: "Revenge", rulesText: "After a Battle Phase where an opponent cursed a Pokemon you brought, release 2 Pokemon from their brought team and destroy the held item", isResponse: false, legalPhases: [], timingWindows: ["endOfBattlePhaseProcedure"], phaseBoundaryProcedure: "endOfBattlePhaseProcedure", explicitPhaseTiming: "postPayoutBeforeControl", activationPattern: "phaseBoundaryOptionalTrigger", activationType: "Post-payout optional offer", requiresPendingEvent: false, createsPendingEvent: true, opensResponseWindow: false, targetType: "team", targetScope: "singleTeam", targetControllerRelation: "otherPlayer", otherPlayerOnly: true, excludeActor: true, differentControllerRequired: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "revengeRelease", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Revenge is offered after payout from exact current-Gym Curse anchors and the immutable brought-team snapshot. It consumes only after the affected player confirms two exact Pokemon and an optional eligible held Item.", requiredChoices: ["Exactly two exact Pokemon from the offender's immutable brought team", "At most one eligible held item from those two"], guidedTask: { instruction: "Choose exactly two exact roster instances from the offending player's immutable brought-team snapshot, then optionally choose one eligible exactly referenced held item from those two.", responsible: "Affected player", resultLabel: "Revenge Choices", placeholder: "Two exact roster IDs and optional exact held item ID", confirmationLabel: "Apply Revenge" }, mechanicContract: { postPayoutBeforeControl: true, immutableBroughtSnapshotRequired: true, exactReleaseCount: 2, qualifyingCurseMustTargetExactBroughtInstance: true, heldItemSelectionMaximum: 1, heldItemMustBelongToSelectedReleasedPokemon: true, exactHeldInventoryReferenceRequired: true, masterBallTierProtected: true, sameNameInventoryGuessingForbidden: true, atomicResolutionRequired: true, idempotentResolutionRequired: true, adminUndoRequired: true, optionalOfferCanBeDeclinedWithoutConsumption: true, productionChoiceScreenRequired: true } }),
   764 |
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
```

#### Encounter-specific token contract residue — `resolverId: "extraEncounter"` — line 766

```text
   763 |     protection({ id: "revenge", name: "Revenge", rulesText: "After a Battle Phase where an opponent cursed a Pokemon you brought, release 2 Pokemon from their brought team and destroy the held item", isResponse: false, legalPhases: [], timingWindows: ["endOfBattlePhaseProcedure"], phaseBoundaryProcedure: "endOfBattlePhaseProcedure", explicitPhaseTiming: "postPayoutBeforeControl", activationPattern: "phaseBoundaryOptionalTrigger", activationType: "Post-payout optional offer", requiresPendingEvent: false, createsPendingEvent: true, opensResponseWindow: false, targetType: "team", targetScope: "singleTeam", targetControllerRelation: "otherPlayer", otherPlayerOnly: true, excludeActor: true, differentControllerRequired: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "revengeRelease", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Revenge is offered after payout from exact current-Gym Curse anchors and the immutable brought-team snapshot. It consumes only after the affected player confirms two exact Pokemon and an optional eligible held Item.", requiredChoices: ["Exactly two exact Pokemon from the offender's immutable brought team", "At most one eligible held item from those two"], guidedTask: { instruction: "Choose exactly two exact roster instances from the offending player's immutable brought-team snapshot, then optionally choose one eligible exactly referenced held item from those two.", responsible: "Affected player", resultLabel: "Revenge Choices", placeholder: "Two exact roster IDs and optional exact held item ID", confirmationLabel: "Apply Revenge" }, mechanicContract: { postPayoutBeforeControl: true, immutableBroughtSnapshotRequired: true, exactReleaseCount: 2, qualifyingCurseMustTargetExactBroughtInstance: true, heldItemSelectionMaximum: 1, heldItemMustBelongToSelectedReleasedPokemon: true, exactHeldInventoryReferenceRequired: true, masterBallTierProtected: true, sameNameInventoryGuessingForbidden: true, atomicResolutionRequired: true, idempotentResolutionRequired: true, adminUndoRequired: true, optionalOfferCanBeDeclinedWithoutConsumption: true, productionChoiceScreenRequired: true } }),
   764 |
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
```

#### Encounter-specific token contract residue — `"encounterWheelEdit"` — line 767

```text
   764 |
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
```

#### Encounter-specific token contract residue — `resolverId: "encounterWheelEdit"` — line 767

```text
   764 |
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
```

#### Encounter-specific token contract residue — `"encounterTransfer"` — line 768

```text
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
```

#### Encounter-specific token contract residue — `resolverId: "encounterTransfer"` — line 768

```text
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
```

#### Encounter-specific token contract residue — `"encounterGrant"` — line 769

```text
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
```

#### Encounter-specific token contract residue — `resolverId: "encounterGrant"` — line 769

```text
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
```

#### Encounter-specific token contract residue — `"encounterCopy"` — line 770

```text
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 |
```

#### Encounter-specific token contract residue — `resolverId: "encounterCopy"` — line 770

```text
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 |
```

#### Encounter-specific token contract residue — `"encounterChoose"` — line 771

```text
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 |
   774 |     control({ id: "move-deleter", name: "Move Deleter", aliases: ["Move Deleter Curse"], rulesText: "Ban one move from being brought for 1 week. Cannot be used after team submission", targetType: "resource", targetScope: "singleResource", selectedTargetType: "move", applicationScope: "tableWide", affectedEntityType: "move", targetScopeStatus: "settled", targetControllerRelation: "notApplicable", minTargets: 1, maxTargets: 1, targetCollectionType: "canonicalMove", resolverMode: resolverModes.AUTOMATIC, resolverId: "moveBan", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Move Deleter records one canonical global move restriction for the next Gym and the Teambuilder and validator enforce it.", requiredChoices: ["One canonical move"], persistence: "lingeringEffect", duration: "Next Gym", expirationPoint: "End of the next Gym", automaticMutations: ["Create a global move restriction keyed by canonical move identity", "Disable the move in Teambuilder and team validation during the next Gym", "Expire the restriction when that Gym ends"] }),
```

#### Encounter-specific token contract residue — `resolverId: "encounterChoose"` — line 771

```text
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 |
   774 |     control({ id: "move-deleter", name: "Move Deleter", aliases: ["Move Deleter Curse"], rulesText: "Ban one move from being brought for 1 week. Cannot be used after team submission", targetType: "resource", targetScope: "singleResource", selectedTargetType: "move", applicationScope: "tableWide", affectedEntityType: "move", targetScopeStatus: "settled", targetControllerRelation: "notApplicable", minTargets: 1, maxTargets: 1, targetCollectionType: "canonicalMove", resolverMode: resolverModes.AUTOMATIC, resolverId: "moveBan", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Move Deleter records one canonical global move restriction for the next Gym and the Teambuilder and validator enforce it.", requiredChoices: ["One canonical move"], persistence: "lingeringEffect", duration: "Next Gym", expirationPoint: "End of the next Gym", automaticMutations: ["Create a global move restriction keyed by canonical move identity", "Disable the move in Teambuilder and team validation during the next Gym", "Expire the restriction when that Gym ends"] }),
```

#### Encounter-specific token contract residue — `"encounterGrant"` — line 772

```text
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 |
   774 |     control({ id: "move-deleter", name: "Move Deleter", aliases: ["Move Deleter Curse"], rulesText: "Ban one move from being brought for 1 week. Cannot be used after team submission", targetType: "resource", targetScope: "singleResource", selectedTargetType: "move", applicationScope: "tableWide", affectedEntityType: "move", targetScopeStatus: "settled", targetControllerRelation: "notApplicable", minTargets: 1, maxTargets: 1, targetCollectionType: "canonicalMove", resolverMode: resolverModes.AUTOMATIC, resolverId: "moveBan", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Move Deleter records one canonical global move restriction for the next Gym and the Teambuilder and validator enforce it.", requiredChoices: ["One canonical move"], persistence: "lingeringEffect", duration: "Next Gym", expirationPoint: "End of the next Gym", automaticMutations: ["Create a global move restriction keyed by canonical move identity", "Disable the move in Teambuilder and team validation during the next Gym", "Expire the restriction when that Gym ends"] }),
   775 |     curse({ id: "toxic-curse", name: "Toxic Curse", rulesText: "Force a Pokemon to carry a Toxic Orb for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Toxic Orb status with exact protected-instance exclusions"] }),
```

#### Encounter-specific token contract residue — `resolverId: "encounterGrant"` — line 772

```text
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 |
   774 |     control({ id: "move-deleter", name: "Move Deleter", aliases: ["Move Deleter Curse"], rulesText: "Ban one move from being brought for 1 week. Cannot be used after team submission", targetType: "resource", targetScope: "singleResource", selectedTargetType: "move", applicationScope: "tableWide", affectedEntityType: "move", targetScopeStatus: "settled", targetControllerRelation: "notApplicable", minTargets: 1, maxTargets: 1, targetCollectionType: "canonicalMove", resolverMode: resolverModes.AUTOMATIC, resolverId: "moveBan", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Move Deleter records one canonical global move restriction for the next Gym and the Teambuilder and validator enforce it.", requiredChoices: ["One canonical move"], persistence: "lingeringEffect", duration: "Next Gym", expirationPoint: "End of the next Gym", automaticMutations: ["Create a global move restriction keyed by canonical move identity", "Disable the move in Teambuilder and team validation during the next Gym", "Expire the restriction when that Gym ends"] }),
   775 |     curse({ id: "toxic-curse", name: "Toxic Curse", rulesText: "Force a Pokemon to carry a Toxic Orb for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Toxic Orb status with exact protected-instance exclusions"] }),
```

#### Encounter-specific token contract residue — `"encounterCopy"` — line 818

```text
   815 |       mechanicContract: { selectedAnchorScope: "rosterInstance", applicationScope: "globalSpecies", directPreEvolutionOnly: true, ambiguousOrUnsafeParentFailsBeforeConsumption: true, stableRosterIdentityRequired: true, temporarySpeciesOverlayRequired: true, mandatoryTeamRevisionWhenBuildIllegal: true, preserveTeamMembership: true, exactExpirationRestoration: true, perInstanceProtection: true }
   816 |     },
   817 |     "honey-token": {
   818 |       resolverMode: resolverModes.AUTOMATIC, resolverId: "encounterCopy", copiedPayloadStatus: "settled",
   819 |       runtimeUsability: runtimeUsabilityStatuses.USABLE,
   820 |       runtimeUsabilityReason: "Honey copies one immutable completed Encounter result at the End-of-Action checkpoint into a new acquisition-ready Encounter record without rerolling or copying ownership and transient history.",
   821 |       opensResponseWindow: false,
```

#### Encounter-specific token contract residue — `resolverId: "encounterCopy"` — line 818

```text
   815 |       mechanicContract: { selectedAnchorScope: "rosterInstance", applicationScope: "globalSpecies", directPreEvolutionOnly: true, ambiguousOrUnsafeParentFailsBeforeConsumption: true, stableRosterIdentityRequired: true, temporarySpeciesOverlayRequired: true, mandatoryTeamRevisionWhenBuildIllegal: true, preserveTeamMembership: true, exactExpirationRestoration: true, perInstanceProtection: true }
   816 |     },
   817 |     "honey-token": {
   818 |       resolverMode: resolverModes.AUTOMATIC, resolverId: "encounterCopy", copiedPayloadStatus: "settled",
   819 |       runtimeUsability: runtimeUsabilityStatuses.USABLE,
   820 |       runtimeUsabilityReason: "Honey copies one immutable completed Encounter result at the End-of-Action checkpoint into a new acquisition-ready Encounter record without rerolling or copying ownership and transient history.",
   821 |       opensResponseWindow: false,
```

#### Hidden Grotto residue — `Hidden Grotto` — line 770

```text
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 |
```

#### Obsolete encounter QA/test names — `encounter-token-runtime` — line 110

```text
   107 |     "token-undo-repair",
   108 |     "token-inventory-runtime",
   109 |     "standard-curse-species-lifecycle",
   110 |     "encounter-token-runtime",
   111 |     "follow-me-e2e",
   112 |     "ditto-inventory-e2e",
   113 |     "lingering-aroma-e2e",
```

#### Obsolete encounter QA/test names — `encounter-token-runtime` — line 262

```text
   259 |     }),
   260 |     "extra-encounter-token": Object.freeze({
   261 |       status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
   262 |       tests: Object.freeze(["token-declaration-timing", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "encounter-token-runtime"]),
   263 |       evidence: "Action-only declaration, exact chosen-player validation, one authoritative Encounter roll grant, open-session extension, standalone session creation, stable grant identity, duplicate prevention, refresh persistence, normal Encounter completion, and snapshot undo are covered by focused runtime and integration tests.",
   264 |       verifiedAt: "2026-07-29",
   265 |       contractDefinitionRevision
```

#### Obsolete encounter QA/test names — `encounter-token-runtime` — line 332

```text
   329 |     }),
   330 |     "reroll-token": Object.freeze({
   331 |       status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
   332 |       tests: Object.freeze(["encounter-token-runtime", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "lifecycle-completion-slice-e2e"]),
   333 |       evidence: "Exact unresolved Encounter and wheel result identity, canonical replacement, superseded original revision, stale rejection, duplicate operation identity, multiple-copy inventory safety, normal acquisition continuation, production refresh, causal History undo, and sandbox isolation are covered by TLS-004, BROWSER-028, and TSB-027.",
   334 |       verifiedAt: "2026-08-04",
   335 |       contractDefinitionRevision
```

#### Obsolete encounter QA/test names — `encounter-token-runtime` — line 339

```text
   336 |     }),
   337 |     "honey-token": Object.freeze({
   338 |       status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
   339 |       tests: Object.freeze(["encounter-token-runtime", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "lifecycle-completion-slice-e2e"]),
   340 |       evidence: "Exact finalized Encounter selection, fresh nonrecursive copy identity, canonical species/form/tier/level and intrinsic payload, normal acquisition handoff, duplicate and stale safety, production refresh, causal History undo through acquired roster creation, and sandbox isolation are covered by TLS-005, SEB-004, BROWSER-029, and TSB-027.",
   341 |       verifiedAt: "2026-08-04",
   342 |       contractDefinitionRevision
```

#### Retired Encounter Wheel residue — `Encounter Wheel` — line 766

```text
   763 |     protection({ id: "revenge", name: "Revenge", rulesText: "After a Battle Phase where an opponent cursed a Pokemon you brought, release 2 Pokemon from their brought team and destroy the held item", isResponse: false, legalPhases: [], timingWindows: ["endOfBattlePhaseProcedure"], phaseBoundaryProcedure: "endOfBattlePhaseProcedure", explicitPhaseTiming: "postPayoutBeforeControl", activationPattern: "phaseBoundaryOptionalTrigger", activationType: "Post-payout optional offer", requiresPendingEvent: false, createsPendingEvent: true, opensResponseWindow: false, targetType: "team", targetScope: "singleTeam", targetControllerRelation: "otherPlayer", otherPlayerOnly: true, excludeActor: true, differentControllerRequired: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "revengeRelease", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Revenge is offered after payout from exact current-Gym Curse anchors and the immutable brought-team snapshot. It consumes only after the affected player confirms two exact Pokemon and an optional eligible held Item.", requiredChoices: ["Exactly two exact Pokemon from the offender's immutable brought team", "At most one eligible held item from those two"], guidedTask: { instruction: "Choose exactly two exact roster instances from the offending player's immutable brought-team snapshot, then optionally choose one eligible exactly referenced held item from those two.", responsible: "Affected player", resultLabel: "Revenge Choices", placeholder: "Two exact roster IDs and optional exact held item ID", confirmationLabel: "Apply Revenge" }, mechanicContract: { postPayoutBeforeControl: true, immutableBroughtSnapshotRequired: true, exactReleaseCount: 2, qualifyingCurseMustTargetExactBroughtInstance: true, heldItemSelectionMaximum: 1, heldItemMustBelongToSelectedReleasedPokemon: true, exactHeldInventoryReferenceRequired: true, masterBallTierProtected: true, sameNameInventoryGuessingForbidden: true, atomicResolutionRequired: true, idempotentResolutionRequired: true, adminUndoRequired: true, optionalOfferCanBeDeclinedWithoutConsumption: true, productionChoiceScreenRequired: true } }),
   764 |
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
```
