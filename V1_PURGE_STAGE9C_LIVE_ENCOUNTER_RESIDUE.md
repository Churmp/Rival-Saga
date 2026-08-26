# V1 Purge Stage 9C — Final Live Encounter Runtime Residue

Generated from `730b2610dd07f8bb8e34f7a108e41fb2de8953f0`.

Post-contract survey of production runtime/static files only.

## Summary

| Group | File | Marker | Count | Lines |
|---|---|---|---:|---|
| Live Encounter channel | `app.js` | `"encounter-reroll"` | 7 | 636, 648, 652, 663, 664, 23159, 41372 |
| Live Encounter channel | `app.js` | `"steal-encounter"` | 6 | 636, 648, 652, 669, 670, 23159 |
| Live Encounter channel | `app.js` | `"encounter-result"` | 9 | 650, 2731, 23152, 25519, 25532, 26165, 27594, 28011, 41021 |
| Live Encounter channel | `app.js` | `TOKEN_TIMING_CATEGORIES.ENCOUNTER` | 15 | 864, 865, 2722, 2976, 3121, 3143, 3146, 3233, 3439, 4139, 5968, 25519, 28000, 28291, 47499 |
| Live Encounter channel | `app.js` | `TOKEN_USE_TYPES.ENCOUNTER_MODIFIER` | 2 | 866, 2723 |
| Live Encounter channel | `app.js` | `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` | 12 | 869, 2726, 25519, 25532, 26403, 26414, 27138, 27139, 27594, 28012, 46958, 47495 |
| Live Encounter channel | `app.js` | `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_TOKEN` | 1 | 871 |
| Live Encounter channel | `app.js` | `encounterCopyRecords` | 9 | 2521, 3818, 4329, 4351, 4460, 21903, 48904, 59358, 59644 |
| Live Encounter channel | `app.js` | `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` | 14 | 2761, 2762, 2763, 2764, 2765, 2766, 2767, 3126, 3198, 3199, 3233, 3247, 3265, 29401 |
| Live Encounter channel | `app.js` | `EFFECT_TARGET_CATEGORIES.ENCOUNTER_RESULT` | 1 | 3265 |
| Live Encounter channel | `app.js` | `encounterBeforeRoll` | 2 | 3492, 3525 |
| Live Encounter channel | `app.js` | `context.encounterResult` | 1 | 3526 |
| Live Encounter channel | `app.js` | `previousEncounterCopyRecords` | 3 | 3818, 4329, 59358 |
| Live Encounter channel | `app.js` | `encounterSessionId` | 3 | 4019, 23168, 59499 |
| Live Encounter channel | `app.js` | `recordEncounterTokenUse` | 2 | 4140, 27604 |
| Live Encounter channel | `app.js` | `sourceType === "encounter"` | 3 | 23150, 26165, 27595 |
| Live Encounter channel | `app.js` | `isEncounterResult` | 2 | 26165, 26171 |
| Live Encounter channel | `app.js` | `currentEncounterPendingActivity` | 2 | 27590, 27605 |
| Live Encounter channel | `app.js` | `liveRefereePromptIsEncounterResult` | 2 | 28008, 28038 |
| Live Encounter channel | `server.js` | `encounterCopyRecords` | 1 | 1307 |
| Live Encounter channel | `server.js` | `previousEncounterCopyRecords` | 1 | 1307 |
| Old generic Encounter token metadata | `app.js` | `Hidden Grotto` | 4 | 1150, 1294, 2194, 38542 |
| Old generic Encounter token metadata | `app.js` | `Encounter Wheel` | 2 | 2762, 38516 |
| Old generic Encounter token metadata | `app.js` | `TOKEN_TIMING_ENGINE_V1_DEFINITIONS` | 2 | 2970, 3154 |
| Old generic Encounter token metadata | `app.js` | `resolverId: "extraEncounter"` | 1 | 2993 |
| Old generic Encounter token metadata | `app.js` | `resolverId: "reroll"` | 1 | 3137 |
| Preserve current/shared | `app.js` | `randomPokemonSessions` | 24 | 2540, 3799, 4325, 4350, 4456, 4501, 22065, 22078, 25511, 26728, 26740, 41030, 41031, 41036, 41146, 41147, 41154, 41203, 41303, 41416, 41442, 46821, 59273, 59339 |
| Preserve current/shared | `app.js` | `function createPokemonResultTimingWindow(` | 1 | 23147 |
| Preserve current/shared | `app.js` | `function confirmRandomPokemonSession(` | 1 | 41201 |
| Preserve current/shared | `app.js` | `function rerollRandomPokemonSession(` | 1 | 41302 |
| Preserve current/shared | `app.js` | `const V2_ROUTE_TOKEN_IDS` | 1 | 42476 |
| Preserve current/shared | `app.js` | `encounterResults` | 7 | 42864, 42890, 42914, 42986, 43702, 43787, 44285 |
| Preserve current/shared | `app.js` | `route.encounterResults` | 6 | 42890, 42914, 42986, 43702, 43787, 44285 |
| Preserve current/shared | `app.js` | `function useV2RouteRerollToken(` | 1 | 44767 |
| Preserve current/shared | `app.js` | `function useV2ExtraEncounter(` | 1 | 44787 |
| Preserve current/shared | `app.js` | `function applyV2RouteRepel(` | 1 | 44805 |
| Preserve current/shared | `app.js` | `function useV2MasterBallOnOpportunity(` | 1 | 44816 |
| Preserve current/shared | `server.js` | `randomPokemonSessions` | 1 | 1293 |

## Contexts

### Live Encounter channel — `app.js`

#### `"encounter-reroll"` — line 636

```text
   634 |   encounterResult: {
   635 |     label: "Encounter Result",
   636 |     responseTypes: ["encounter-reroll", "steal-encounter"]
   637 |   },
   638 |   "class-activation": {
```

#### `"steal-encounter"` — line 636

```text
   634 |   encounterResult: {
   635 |     label: "Encounter Result",
   636 |     responseTypes: ["encounter-reroll", "steal-encounter"]
   637 |   },
   638 |   "class-activation": {
```

#### `"encounter-reroll"` — line 648

```text
   646 |   "pokemon-result": {
   647 |     label: "Pokemon Result",
   648 |     responseTypes: ["encounter-reroll", "steal-encounter"]
   649 |   },
   650 |   "encounter-result": {
```

#### `"steal-encounter"` — line 648

```text
   646 |   "pokemon-result": {
   647 |     label: "Pokemon Result",
   648 |     responseTypes: ["encounter-reroll", "steal-encounter"]
   649 |   },
   650 |   "encounter-result": {
```

#### `"encounter-result"` — line 650

```text
   648 |     responseTypes: ["encounter-reroll", "steal-encounter"]
   649 |   },
   650 |   "encounter-result": {
   651 |     label: "Encounter Result",
   652 |     responseTypes: ["encounter-reroll", "steal-encounter"]
```

#### `"encounter-reroll"` — line 652

```text
   650 |   "encounter-result": {
   651 |     label: "Encounter Result",
   652 |     responseTypes: ["encounter-reroll", "steal-encounter"]
   653 |   }
   654 | });
```

#### `"steal-encounter"` — line 652

```text
   650 |   "encounter-result": {
   651 |     label: "Encounter Result",
   652 |     responseTypes: ["encounter-reroll", "steal-encounter"]
   653 |   }
   654 | });
```

#### `"encounter-reroll"` — line 663

```text
   661 |     description: "Cancel a token, perk, or class effect targeting you."
   662 |   },
   663 |   "encounter-reroll": {
   664 |     id: "encounter-reroll",
   665 |     label: "Reroll Encounter",
```

#### `"encounter-reroll"` — line 664

```text
   662 |   },
   663 |   "encounter-reroll": {
   664 |     id: "encounter-reroll",
   665 |     label: "Reroll Encounter",
   666 |     tokenNames: ["Reroll Token"],
```

#### `"steal-encounter"` — line 669

```text
   667 |     description: "Future hook: force a Pokemon result to be rerolled."
   668 |   },
   669 |   "steal-encounter": {
   670 |     id: "steal-encounter",
   671 |     label: "Steal Encounter",
```

#### `"steal-encounter"` — line 670

```text
   668 |   },
   669 |   "steal-encounter": {
   670 |     id: "steal-encounter",
   671 |     label: "Steal Encounter",
   672 |     tokenNames: ["Quick Ball Token", "Steal"],
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 864

```text
   862 |     livePromptType: TOKEN_PENDING_EVENT_TYPES.PROTECTION_RESPONSE
   863 |   }),
   864 |   [TOKEN_TIMING_CATEGORIES.ENCOUNTER]: Object.freeze({
   865 |     timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,
   866 |     useType: TOKEN_USE_TYPES.ENCOUNTER_MODIFIER,
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 865

```text
   863 |   }),
   864 |   [TOKEN_TIMING_CATEGORIES.ENCOUNTER]: Object.freeze({
   865 |     timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,
   866 |     useType: TOKEN_USE_TYPES.ENCOUNTER_MODIFIER,
   867 |     createsPendingEvent: false,
```

#### `TOKEN_USE_TYPES.ENCOUNTER_MODIFIER` — line 866

```text
   864 |   [TOKEN_TIMING_CATEGORIES.ENCOUNTER]: Object.freeze({
   865 |     timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,
   866 |     useType: TOKEN_USE_TYPES.ENCOUNTER_MODIFIER,
   867 |     createsPendingEvent: false,
   868 |     requiresPendingEvent: true,
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 869

```text
   867 |     createsPendingEvent: false,
   868 |     requiresPendingEvent: true,
   869 |     requiredPendingType: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT,
   870 |     responseRole: "encounterModifier",
   871 |     livePromptType: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_TOKEN
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_TOKEN` — line 871

```text
   869 |     requiredPendingType: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT,
   870 |     responseRole: "encounterModifier",
   871 |     livePromptType: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_TOKEN
   872 |   }),
   873 |   [TOKEN_TIMING_CATEGORIES.CURSE]: Object.freeze({
```

#### `encounterCopyRecords` — line 2521

```text
  2519 |     copiedTokenRelationships: [],
  2520 |     privateEffectRecords: [],
  2521 |     encounterCopyRecords: [],
  2522 |     chronologyCounter: 0,
  2523 |     perkSystem: {
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 2722

```text
  2720 |     name: "Reroll Token",
  2721 |     sourceType: "token",
  2722 |     timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,
  2723 |     useType: TOKEN_USE_TYPES.ENCOUNTER_MODIFIER,
  2724 |     createsPendingEvent: false,
```

#### `TOKEN_USE_TYPES.ENCOUNTER_MODIFIER` — line 2723

```text
  2721 |     sourceType: "token",
  2722 |     timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,
  2723 |     useType: TOKEN_USE_TYPES.ENCOUNTER_MODIFIER,
  2724 |     createsPendingEvent: false,
  2725 |     requiresPendingEvent: true,
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 2726

```text
  2724 |     createsPendingEvent: false,
  2725 |     requiresPendingEvent: true,
  2726 |     requiredPendingType: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT,
  2727 |     responseRole: "encounterModifier",
  2728 |     livePromptType: "encounterToken",
```

#### `"encounter-result"` — line 2731

```text
  2729 |     timing: "pending-result",
  2730 |     targetType: "pending-random-result",
  2731 |     validTargets: ["random-pokemon-result", "encounter-result", "quest-roll"],
  2732 |     excludedSources: ["game-corner-gamble-wheel"],
  2733 |     effect: "reroll"
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 2761

```text
  2759 |   "immunity": { names: ["Immunity", "Emergency Immunity Token"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Immunity", note: "Negates one effect/global effect." },
  2760 |   "revenge": { names: ["Revenge"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Revenge Pending", note: "Post-curse revenge marker." },
  2761 |   "extra-encounter-token": { names: ["Extra Encounter Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Extra Encounter Available", note: "Spend during Action Phase to roll an extra encounter." },
  2762 |   "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, choiceLabel: "Pokemon Name", effectType: "log", note: "Remove one Pokemon per 5 entries from Encounter Wheel. Wheel editor hook pending." },
  2763 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 2762

```text
  2760 |   "revenge": { names: ["Revenge"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Revenge Pending", note: "Post-curse revenge marker." },
  2761 |   "extra-encounter-token": { names: ["Extra Encounter Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Extra Encounter Available", note: "Spend during Action Phase to roll an extra encounter." },
  2762 |   "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, choiceLabel: "Pokemon Name", effectType: "log", note: "Remove one Pokemon per 5 entries from Encounter Wheel. Wheel editor hook pending." },
  2763 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
  2764 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 2763

```text
  2761 |   "extra-encounter-token": { names: ["Extra Encounter Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Extra Encounter Available", note: "Spend during Action Phase to roll an extra encounter." },
  2762 |   "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, choiceLabel: "Pokemon Name", effectType: "log", note: "Remove one Pokemon per 5 entries from Encounter Wheel. Wheel editor hook pending." },
  2763 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
  2764 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
  2765 |   "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "At End of Action, copies one immutable completed Encounter result into a new acquisition-ready Encounter without rerolling." },
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 2764

```text
  2762 |   "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, choiceLabel: "Pokemon Name", effectType: "log", note: "Remove one Pokemon per 5 entries from Encounter Wheel. Wheel editor hook pending." },
  2763 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
  2764 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
  2765 |   "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "At End of Action, copies one immutable completed Encounter result into a new acquisition-ready Encounter without rerolling." },
  2766 |   "master-ball-token": { names: ["Master Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Master Ball Pending", note: "Choose encounter; cannot be changed by other players." },
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 2765

```text
  2763 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
  2764 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
  2765 |   "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "At End of Action, copies one immutable completed Encounter result into a new acquisition-ready Encounter without rerolling." },
  2766 |   "master-ball-token": { names: ["Master Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Master Ball Pending", note: "Choose encounter; cannot be changed by other players." },
  2767 |   "beast-ball-token": { names: ["Beast Ball"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Beast Ball Pending", note: "Encounter move choice marker." }
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 2766

```text
  2764 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
  2765 |   "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "At End of Action, copies one immutable completed Encounter result into a new acquisition-ready Encounter without rerolling." },
  2766 |   "master-ball-token": { names: ["Master Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Master Ball Pending", note: "Choose encounter; cannot be changed by other players." },
  2767 |   "beast-ball-token": { names: ["Beast Ball"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Beast Ball Pending", note: "Encounter move choice marker." }
  2768 | });
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 2767

```text
  2765 |   "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "At End of Action, copies one immutable completed Encounter result into a new acquisition-ready Encounter without rerolling." },
  2766 |   "master-ball-token": { names: ["Master Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Master Ball Pending", note: "Choose encounter; cannot be changed by other players." },
  2767 |   "beast-ball-token": { names: ["Beast Ball"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Beast Ball Pending", note: "Encounter move choice marker." }
  2768 | });
  2769 |
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 2976

```text
  2974 |     objectType: TOKEN_OBJECT_TYPES.TOKEN,
  2975 |     family: ["encounter"],
  2976 |     timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,
  2977 |     timingWindows: [TOKEN_TIMING_WINDOWS.ACTION_OPEN, TOKEN_TIMING_WINDOWS.MANUAL_HOST],
  2978 |     activationPattern: TOKEN_ACTIVATION_PATTERNS.PROACTIVE,
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 3121

```text
  3119 |     objectType: TOKEN_OBJECT_TYPES.TOKEN,
  3120 |     family: ["reroll"],
  3121 |     timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,
  3122 |     timingWindows: [TOKEN_TIMING_WINDOWS.WHEEL_WINDOW, TOKEN_TIMING_WINDOWS.MANUAL_HOST],
  3123 |     activationPattern: TOKEN_ACTIVATION_PATTERNS.RESPONSE,
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 3126

```text
  3124 |     persistence: TOKEN_PERSISTENCE_BUCKETS.INSTANT,
  3125 |     resolutionPayloads: [TOKEN_RESOLUTION_PAYLOADS.WHEEL, TOKEN_RESOLUTION_PAYLOADS.REPLACEMENT],
  3126 |     targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT,
  3127 |     targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT,
  3128 |     duration: "instant",
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 3143

```text
  3141 | function tokenTimingCategoryFromRaw(value = "") {
  3142 |   const key = String(value || "").toLowerCase().trim();
  3143 |   if (key === "reroll") return TOKEN_TIMING_CATEGORIES.ENCOUNTER;
  3144 |   if (Object.values(TOKEN_TIMING_CATEGORIES).includes(key)) return key;
  3145 |   if (key === "curses") return TOKEN_TIMING_CATEGORIES.CURSE;
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 3146

```text
  3144 |   if (Object.values(TOKEN_TIMING_CATEGORIES).includes(key)) return key;
  3145 |   if (key === "curses") return TOKEN_TIMING_CATEGORIES.CURSE;
  3146 |   if (key === "encounters") return TOKEN_TIMING_CATEGORIES.ENCOUNTER;
  3147 |   if (key === "manual" || key === "other") return TOKEN_TIMING_CATEGORIES.MANUAL;
  3148 |   return "";
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 3198

```text
  3196 |   if (values.includes(raw)) return raw;
  3197 |   if (key === "current-prompt") return EFFECT_TARGET_TYPES.CURRENT_PROMPT;
  3198 |   if (key === "pending-random-result" || key === "pending-result") return EFFECT_TARGET_TYPES.ENCOUNTER_RESULT;
  3199 |   if (/encounter|random/.test(key)) return EFFECT_TARGET_TYPES.ENCOUNTER_RESULT;
  3200 |   if (/pokemon/.test(key)) return EFFECT_TARGET_TYPES.POKEMON;
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 3199

```text
  3197 |   if (key === "current-prompt") return EFFECT_TARGET_TYPES.CURRENT_PROMPT;
  3198 |   if (key === "pending-random-result" || key === "pending-result") return EFFECT_TARGET_TYPES.ENCOUNTER_RESULT;
  3199 |   if (/encounter|random/.test(key)) return EFFECT_TARGET_TYPES.ENCOUNTER_RESULT;
  3200 |   if (/pokemon/.test(key)) return EFFECT_TARGET_TYPES.POKEMON;
  3201 |   if (/player/.test(key)) return EFFECT_TARGET_TYPES.PLAYER;
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 3233

```text
  3231 |   if (explicit) return explicit;
  3232 |   if (category === TOKEN_TIMING_CATEGORIES.PROTECTION) return EFFECT_TARGET_TYPES.CURRENT_PROMPT;
  3233 |   if (category === TOKEN_TIMING_CATEGORIES.ENCOUNTER) return EFFECT_TARGET_TYPES.ENCOUNTER_RESULT;
  3234 |   const mode = String(definition.targetMode || "").toLowerCase();
  3235 |   if (/pokemon/.test(mode) || mode === "banned-pokemon") return EFFECT_TARGET_TYPES.POKEMON;
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 3233

```text
  3231 |   if (explicit) return explicit;
  3232 |   if (category === TOKEN_TIMING_CATEGORIES.PROTECTION) return EFFECT_TARGET_TYPES.CURRENT_PROMPT;
  3233 |   if (category === TOKEN_TIMING_CATEGORIES.ENCOUNTER) return EFFECT_TARGET_TYPES.ENCOUNTER_RESULT;
  3234 |   const mode = String(definition.targetMode || "").toLowerCase();
  3235 |   if (/pokemon/.test(mode) || mode === "banned-pokemon") return EFFECT_TARGET_TYPES.POKEMON;
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 3247

```text
  3245 |   if (explicit) return explicit;
  3246 |   if (targetType === EFFECT_TARGET_TYPES.CURRENT_PROMPT) return EFFECT_TARGET_SCOPES.CURRENT_PROMPT;
  3247 |   if (targetType === EFFECT_TARGET_TYPES.ENCOUNTER_RESULT) return EFFECT_TARGET_SCOPES.CURRENT_PROMPT;
  3248 |   if (targetType === EFFECT_TARGET_TYPES.PLAYER) return EFFECT_TARGET_SCOPES.SINGLE_PLAYER;
  3249 |   if (targetType === EFFECT_TARGET_TYPES.TABLE) return EFFECT_TARGET_SCOPES.TABLE_WIDE;
```

#### `EFFECT_TARGET_CATEGORIES.ENCOUNTER_RESULT` — line 3265

```text
  3263 | function targetCategoryFromEffectBucket(targetType = "", targetScope = "") {
  3264 |   if (targetType === EFFECT_TARGET_TYPES.POKEMON) return EFFECT_TARGET_CATEGORIES.POKEMON;
  3265 |   if (targetType === EFFECT_TARGET_TYPES.ENCOUNTER_RESULT) return EFFECT_TARGET_CATEGORIES.ENCOUNTER_RESULT;
  3266 |   if (targetType === EFFECT_TARGET_TYPES.PLAYER) return EFFECT_TARGET_CATEGORIES.PLAYER;
  3267 |   if (targetType === EFFECT_TARGET_TYPES.RESOURCE) return EFFECT_TARGET_CATEGORIES.TOKEN;
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 3265

```text
  3263 | function targetCategoryFromEffectBucket(targetType = "", targetScope = "") {
  3264 |   if (targetType === EFFECT_TARGET_TYPES.POKEMON) return EFFECT_TARGET_CATEGORIES.POKEMON;
  3265 |   if (targetType === EFFECT_TARGET_TYPES.ENCOUNTER_RESULT) return EFFECT_TARGET_CATEGORIES.ENCOUNTER_RESULT;
  3266 |   if (targetType === EFFECT_TARGET_TYPES.PLAYER) return EFFECT_TARGET_CATEGORIES.PLAYER;
  3267 |   if (targetType === EFFECT_TARGET_TYPES.RESOURCE) return EFFECT_TARGET_CATEGORIES.TOKEN;
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 3439

```text
  3437 |     [TOKEN_TIMING_CATEGORIES.CONTROL]: "Control Token",
  3438 |     [TOKEN_TIMING_CATEGORIES.PROTECTION]: "Protection Token",
  3439 |     [TOKEN_TIMING_CATEGORIES.ENCOUNTER]: "Encounter Token",
  3440 |     [TOKEN_TIMING_CATEGORIES.CURSE]: "Curse Token",
  3441 |     [TOKEN_TIMING_CATEGORIES.MANUAL]: "Manual Token"
```

#### `encounterBeforeRoll` — line 3492

```text
  3490 |       windows.add(TOKEN_TIMING_WINDOWS.WHEEL_WINDOW);
  3491 |     } else if (pendingEvent.payload?.encounterStage === "beforeRoll" || /encounter-before|wheel-before/i.test(pendingKind)) {
  3492 |       windows.add("encounterBeforeRoll");
  3493 |     } else if (/wheel/i.test(pendingKind)) {
  3494 |       windows.add(TOKEN_TIMING_WINDOWS.WHEEL_WINDOW);
```

#### `encounterBeforeRoll` — line 3525

```text
  3523 |   if (context.teamBuilding) windows.add(TOKEN_TIMING_WINDOWS.TEAM_BUILDING);
  3524 |   if (context.battlePrep) windows.add(TOKEN_TIMING_WINDOWS.BATTLE_PREP);
  3525 |   if (context.encounterBeforeRoll) windows.add("encounterBeforeRoll");
  3526 |   if (context.encounterResult) windows.add("encounterResult");
  3527 |   return [...windows];
```

#### `context.encounterResult` — line 3526

```text
  3524 |   if (context.battlePrep) windows.add(TOKEN_TIMING_WINDOWS.BATTLE_PREP);
  3525 |   if (context.encounterBeforeRoll) windows.add("encounterBeforeRoll");
  3526 |   if (context.encounterResult) windows.add("encounterResult");
  3527 |   return [...windows];
  3528 | }
```

#### `encounterCopyRecords` — line 3818

```text
  3816 |     previousCopiedTokenRelationships: structuredClone(state.copiedTokenRelationships || []),
  3817 |     previousPrivateEffectRecords: structuredClone(state.privateEffectRecords || []),
  3818 |     previousEncounterCopyRecords: structuredClone(state.encounterCopyRecords || [])
  3819 |   };
  3820 | }
```

#### `previousEncounterCopyRecords` — line 3818

```text
  3816 |     previousCopiedTokenRelationships: structuredClone(state.copiedTokenRelationships || []),
  3817 |     previousPrivateEffectRecords: structuredClone(state.privateEffectRecords || []),
  3818 |     previousEncounterCopyRecords: structuredClone(state.encounterCopyRecords || [])
  3819 |   };
  3820 | }
```

#### `encounterSessionId` — line 4019

```text
  4017 |     tokenId: consumedToken.id || "",
  4018 |     tokenActivationId: activation.id,
  4019 |     encounterSessionId,
  4020 |     effectAuditId: resolutionAudit.id,
  4021 |     tokenConsumptionIds: consumed?.consumption ? [consumed.consumption.id] : [],
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 4139

```text
  4137 |   }
  4138 |   if (pendingEvent) {
  4139 |     if (metadata.timingWindows.includes(TOKEN_TIMING_WINDOWS.WHEEL_WINDOW) || metadata.timingCategory === TOKEN_TIMING_CATEGORIES.ENCOUNTER) {
  4140 |       return recordEncounterTokenUse(draft);
  4141 |     }
```

#### `recordEncounterTokenUse` — line 4140

```text
  4138 |   if (pendingEvent) {
  4139 |     if (metadata.timingWindows.includes(TOKEN_TIMING_WINDOWS.WHEEL_WINDOW) || metadata.timingCategory === TOKEN_TIMING_CATEGORIES.ENCOUNTER) {
  4140 |       return recordEncounterTokenUse(draft);
  4141 |     }
  4142 |     if (metadata.activationPattern === TOKEN_ACTIVATION_PATTERNS.RESPONSE || metadata.timingCategory === TOKEN_TIMING_CATEGORIES.PROTECTION) {
```

#### `encounterCopyRecords` — line 4329

```text
  4327 |     broughtTeamSnapshots: causalIdCollectionDelta(snapshot.previousBroughtTeamSnapshots, state.broughtTeamSnapshots),
  4328 |     postPayoutProcedures: causalIdCollectionDelta(snapshot.previousPostPayoutProcedures, state.postPayoutProcedures),
  4329 |     encounterCopyRecords: causalIdCollectionDelta(snapshot.previousEncounterCopyRecords, state.encounterCopyRecords),
  4330 |     teambuilderFields: causalTopLevelFieldDelta(snapshot.previousTeambuilder || {}, state.teambuilder || {}, ["moveAccessGrantsByPlayerId"]),
  4331 |     battleTeamFields: causalTopLevelFieldDelta(snapshot.previousBattleTeams || {}, state.battleTeams || {}),
```

#### `previousEncounterCopyRecords` — line 4329

```text
  4327 |     broughtTeamSnapshots: causalIdCollectionDelta(snapshot.previousBroughtTeamSnapshots, state.broughtTeamSnapshots),
  4328 |     postPayoutProcedures: causalIdCollectionDelta(snapshot.previousPostPayoutProcedures, state.postPayoutProcedures),
  4329 |     encounterCopyRecords: causalIdCollectionDelta(snapshot.previousEncounterCopyRecords, state.encounterCopyRecords),
  4330 |     teambuilderFields: causalTopLevelFieldDelta(snapshot.previousTeambuilder || {}, state.teambuilder || {}, ["moveAccessGrantsByPlayerId"]),
  4331 |     battleTeamFields: causalTopLevelFieldDelta(snapshot.previousBattleTeams || {}, state.battleTeams || {}),
```

#### `encounterCopyRecords` — line 4351

```text
  4349 |     "effectOperations", "copiedActivations", "copiedTokenRelationships", "wheelSessions",
  4350 |     "randomPokemonSessions", "delayedEffects", "broughtTeamSnapshots", "postPayoutProcedures",
  4351 |     "encounterCopyRecords", "pokemonLog", "banlistHistory"
  4352 |   ];
  4353 |   collectionKeys.forEach((key) => {
```

#### `encounterCopyRecords` — line 4460

```text
  4458 |   state.broughtTeamSnapshots = applyCausalIdCollectionUndo(state.broughtTeamSnapshots, undoData.broughtTeamSnapshots);
  4459 |   state.postPayoutProcedures = applyCausalIdCollectionUndo(state.postPayoutProcedures, undoData.postPayoutProcedures);
  4460 |   state.encounterCopyRecords = applyCausalIdCollectionUndo(state.encounterCopyRecords, undoData.encounterCopyRecords);
  4461 |   state.teambuilder ||= {};
  4462 |   applyCausalTopLevelFieldUndo(state.teambuilder, undoData.teambuilderFields);
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 5968

```text
  5966 |     [TOKEN_TIMING_CATEGORIES.CONTROL, "Control Token"],
  5967 |     [TOKEN_TIMING_CATEGORIES.PROTECTION, "Protection Token"],
  5968 |     [TOKEN_TIMING_CATEGORIES.ENCOUNTER, "Encounter Token"],
  5969 |     [TOKEN_TIMING_CATEGORIES.CURSE, "Curse Token"],
  5970 |   ].map(([value, label]) => `<option value="${escapeHtml(value)}" ${value === selected ? "selected" : ""}>${escapeHtml(label)}</option>`).join("");
```

#### `encounterCopyRecords` — line 21903

```text
 21901 |   nextState.copiedTokenRelationships = Array.isArray(nextState.copiedTokenRelationships) ? nextState.copiedTokenRelationships : [];
 21902 |   nextState.privateEffectRecords = Array.isArray(nextState.privateEffectRecords) ? nextState.privateEffectRecords : [];
 21903 |   nextState.encounterCopyRecords = Array.isArray(nextState.encounterCopyRecords) ? nextState.encounterCopyRecords : [];
 21904 |   syncLinkedTransactions(nextState);
 21905 |   normalizeChronologyState(nextState);
```

#### `sourceType === "encounter"` — line 23150

```text
 23148 |   if (!session || session.interactionEventId || !player) return null;
 23149 |   const resultName = session.resultDisplayName || session.resultPokemonName || "Pokemon result";
 23150 |   const isEncounter = session.sourceType === "encounter";
 23151 |   const activity = createInteractionEvent({
 23152 |     type: isEncounter ? "encounter-result" : "pokemon-result",
```

#### `"encounter-result"` — line 23152

```text
 23150 |   const isEncounter = session.sourceType === "encounter";
 23151 |   const activity = createInteractionEvent({
 23152 |     type: isEncounter ? "encounter-result" : "pokemon-result",
 23153 |     title: `${player.name} rolled ${resultName}`,
 23154 |     message: `${session.sourceLabel || "Pokemon result"} is pending before it resolves.`,
```

#### `"encounter-reroll"` — line 23159

```text
 23157 |     sourceType: session.sourceType || "random-pokemon",
 23158 |     sourceId: session.id,
 23159 |     responseTypes: ["encounter-reroll", "steal-encounter"],
 23160 |     eligiblePlayerIds: state.players.map((entry) => entry.id),
 23161 |     series: session.series || state.series,
```

#### `"steal-encounter"` — line 23159

```text
 23157 |     sourceType: session.sourceType || "random-pokemon",
 23158 |     sourceId: session.id,
 23159 |     responseTypes: ["encounter-reroll", "steal-encounter"],
 23160 |     eligiblePlayerIds: state.players.map((entry) => entry.id),
 23161 |     series: session.series || state.series,
```

#### `encounterSessionId` — line 23168

```text
 23166 |       gameCornerSessionId: session.gameCornerSessionId || "",
 23167 |       actionVisitId: session.actionVisitId || "",
 23168 |       encounterSessionId: session.encounterSessionId || "",
 23169 |       encounterRollId: session.encounterRollId || "",
 23170 |       resultName,
```

#### `"encounter-result"` — line 25519

```text
 25517 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.CONTROL_TOKEN) return TOKEN_TIMING_CATEGORIES.CONTROL;
 25518 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.CURSE_TOKEN) return TOKEN_TIMING_CATEGORIES.CURSE;
 25519 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT || activity.type === "encounter-result") return TOKEN_TIMING_CATEGORIES.ENCOUNTER;
 25520 |   return "";
 25521 | }
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 25519

```text
 25517 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.CONTROL_TOKEN) return TOKEN_TIMING_CATEGORIES.CONTROL;
 25518 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.CURSE_TOKEN) return TOKEN_TIMING_CATEGORIES.CURSE;
 25519 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT || activity.type === "encounter-result") return TOKEN_TIMING_CATEGORIES.ENCOUNTER;
 25520 |   return "";
 25521 | }
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 25519

```text
 25517 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.CONTROL_TOKEN) return TOKEN_TIMING_CATEGORIES.CONTROL;
 25518 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.CURSE_TOKEN) return TOKEN_TIMING_CATEGORIES.CURSE;
 25519 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT || activity.type === "encounter-result") return TOKEN_TIMING_CATEGORIES.ENCOUNTER;
 25520 |   return "";
 25521 | }
```

#### `"encounter-result"` — line 25532

```text
 25530 |     ? " This is happening during Sabotage. Submitted teams are locked before Team Preview."
 25531 |     : "";
 25532 |   if (resultSession || activity?.type === "encounter-result" || activity?.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT) {
 25533 |     const resultOwnerId = resultSession?.resultOwnerPlayerId || resultSession?.ownerPlayerId || resultSession?.playerId || activity?.actorPlayerId || "";
 25534 |     const resultOwner = targetState.players.find((player) => player.id === resultOwnerId);
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 25532

```text
 25530 |     ? " This is happening during Sabotage. Submitted teams are locked before Team Preview."
 25531 |     : "";
 25532 |   if (resultSession || activity?.type === "encounter-result" || activity?.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT) {
 25533 |     const resultOwnerId = resultSession?.resultOwnerPlayerId || resultSession?.ownerPlayerId || resultSession?.playerId || activity?.actorPlayerId || "";
 25534 |     const resultOwner = targetState.players.find((player) => player.id === resultOwnerId);
```

#### `"encounter-result"` — line 26165

```text
 26163 |     const resultName = resultSession?.resultDisplayName || pendingEvent.payload?.resultName || "";
 26164 |     const sourceLabel = resultSession?.sourceLabel || pendingEvent.payload?.sourceLabel || pendingEvent.sourceType || "Event";
 26165 |     const isEncounterResult = Boolean(resultSession?.sourceType === "encounter" || pendingEvent.type === "encounter-result");
 26166 |     const tokenPrompt = liveTokenPromptDetails(pendingEvent, resultSession, targetState);
 26167 |     const promptDisplay = liveCurrentPromptDetails(pendingEvent, tokenPrompt, currentPromptStep, respondingToPromptStep);
```

#### `isEncounterResult` — line 26165

```text
 26163 |     const resultName = resultSession?.resultDisplayName || pendingEvent.payload?.resultName || "";
 26164 |     const sourceLabel = resultSession?.sourceLabel || pendingEvent.payload?.sourceLabel || pendingEvent.sourceType || "Event";
 26165 |     const isEncounterResult = Boolean(resultSession?.sourceType === "encounter" || pendingEvent.type === "encounter-result");
 26166 |     const tokenPrompt = liveTokenPromptDetails(pendingEvent, resultSession, targetState);
 26167 |     const promptDisplay = liveCurrentPromptDetails(pendingEvent, tokenPrompt, currentPromptStep, respondingToPromptStep);
```

#### `sourceType === "encounter"` — line 26165

```text
 26163 |     const resultName = resultSession?.resultDisplayName || pendingEvent.payload?.resultName || "";
 26164 |     const sourceLabel = resultSession?.sourceLabel || pendingEvent.payload?.sourceLabel || pendingEvent.sourceType || "Event";
 26165 |     const isEncounterResult = Boolean(resultSession?.sourceType === "encounter" || pendingEvent.type === "encounter-result");
 26166 |     const tokenPrompt = liveTokenPromptDetails(pendingEvent, resultSession, targetState);
 26167 |     const promptDisplay = liveCurrentPromptDetails(pendingEvent, tokenPrompt, currentPromptStep, respondingToPromptStep);
```

#### `isEncounterResult` — line 26171

```text
 26169 |       return {
 26170 |         id: `live-${pendingEvent.id}`,
 26171 |         type: tokenPrompt?.type || (isEncounterResult ? "encounter-result-pending" : "pokemon-result-pending"),
 26172 |         statusLabel: promptDisplay.statusLabel || "Waiting to Resolve",
 26173 |         title: promptDisplay.title || (resultName ? `${resultOwner?.name || "A player"} rolled ${resultName}` : pendingEvent.title || "Pokemon result pending"),
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 26403

```text
 26401 |     [TOKEN_PENDING_EVENT_TYPES.CONTROL_TOKEN, "Control Token"],
 26402 |     [TOKEN_PENDING_EVENT_TYPES.CURSE_TOKEN, "Curse"],
 26403 |     [TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT, "Encounter"],
 26404 |     [TOKEN_PENDING_EVENT_TYPES.PROTECTION_RESPONSE, "Protection / Response Note"],
 26405 |     ["item-effect", "Item"],
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 26414

```text
 26412 |   const options = [
 26413 |     ["normal", "Normal"],
 26414 |     [TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT, "Encounter Result"],
 26415 |     [TOKEN_PENDING_EVENT_TYPES.TEAM_LOCK_WINDOW, "Sabotage"],
 26416 |     ["team-preview", "Team Preview"],
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 27138

```text
 27136 |   const finalEventType = timingWindow === TOKEN_PENDING_EVENT_TYPES.TEAM_LOCK_WINDOW
 27137 |     ? TOKEN_PENDING_EVENT_TYPES.TEAM_LOCK_WINDOW
 27138 |     : timingWindow === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT
 27139 |       ? TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT
 27140 |       : eventType;
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 27139

```text
 27137 |     ? TOKEN_PENDING_EVENT_TYPES.TEAM_LOCK_WINDOW
 27138 |     : timingWindow === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT
 27139 |       ? TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT
 27140 |       : eventType;
 27141 |   const activity = createInteractionEvent({
```

#### `currentEncounterPendingActivity` — line 27590

```text
 27588 | }
 27589 |
 27590 | function currentEncounterPendingActivity() {
 27591 |   const activity = getCurrentPendingEvent();
 27592 |   if (!activity || activity.status !== "open") return null;
```

#### `"encounter-result"` — line 27594

```text
 27592 |   if (!activity || activity.status !== "open") return null;
 27593 |   const session = liveResultSessionForActivity(activity);
 27594 |   if (activity.type === "encounter-result" || activity.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT) return activity;
 27595 |   if (session?.sourceType === "encounter") return activity;
 27596 |   return null;
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 27594

```text
 27592 |   if (!activity || activity.status !== "open") return null;
 27593 |   const session = liveResultSessionForActivity(activity);
 27594 |   if (activity.type === "encounter-result" || activity.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT) return activity;
 27595 |   if (session?.sourceType === "encounter") return activity;
 27596 |   return null;
```

#### `sourceType === "encounter"` — line 27595

```text
 27593 |   const session = liveResultSessionForActivity(activity);
 27594 |   if (activity.type === "encounter-result" || activity.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT) return activity;
 27595 |   if (session?.sourceType === "encounter") return activity;
 27596 |   return null;
 27597 | }
```

#### `recordEncounterTokenUse` — line 27604

```text
 27602 | }
 27603 |
 27604 | async function recordEncounterTokenUse(draft) {
 27605 |   const activity = currentEncounterPendingActivity();
 27606 |   if (!activity) {
```

#### `currentEncounterPendingActivity` — line 27605

```text
 27603 |
 27604 | async function recordEncounterTokenUse(draft) {
 27605 |   const activity = currentEncounterPendingActivity();
 27606 |   if (!activity) {
 27607 |     alert("Encounter Tokens are used during an encounter result window before the result is finalized.");
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 28000

```text
 27998 |     [TOKEN_TIMING_CATEGORIES.CONTROL]: 1,
 27999 |     [TOKEN_TIMING_CATEGORIES.PROTECTION]: 2,
 28000 |     [TOKEN_TIMING_CATEGORIES.ENCOUNTER]: 3,
 28001 |     [TOKEN_TIMING_CATEGORIES.CURSE]: 4,
 28002 |     [TOKEN_TIMING_CATEGORIES.MANUAL]: 9
```

#### `liveRefereePromptIsEncounterResult` — line 28008

```text
 28006 | }
 28007 |
 28008 | function liveRefereePromptIsEncounterResult(prompt) {
 28009 |   const activity = prompt?.pendingEvent;
 28010 |   return Boolean(prompt?.resultSession
```

#### `"encounter-result"` — line 28011

```text
 28009 |   const activity = prompt?.pendingEvent;
 28010 |   return Boolean(prompt?.resultSession
 28011 |     || activity?.type === "encounter-result"
 28012 |     || activity?.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT
 28013 |     || liveResultSessionForActivity(activity));
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 28012

```text
 28010 |   return Boolean(prompt?.resultSession
 28011 |     || activity?.type === "encounter-result"
 28012 |     || activity?.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT
 28013 |     || liveResultSessionForActivity(activity));
 28014 | }
```

#### `liveRefereePromptIsEncounterResult` — line 28038

```text
 28036 |   if (group.metadata?.resolverId === "delayParent"
 28037 |     && !teleportDelayableParentPlan(prompt?.pendingEvent, step).ok) return false;
 28038 |   if (group.metadata?.timingWindows?.includes(TOKEN_TIMING_WINDOWS.WHEEL_WINDOW)) return liveRefereePromptIsEncounterResult(prompt);
 28039 |   return true;
 28040 | }
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 28291

```text
 28289 |   const category = group?.metadata?.timingCategory || "";
 28290 |   if (prompt?.pendingEvent && category === TOKEN_TIMING_CATEGORIES.PROTECTION) return "Respond";
 28291 |   if (prompt?.pendingEvent && category === TOKEN_TIMING_CATEGORIES.ENCOUNTER) return "Modify";
 28292 |   return "Open Window";
 28293 | }
```

#### `EFFECT_TARGET_TYPES.ENCOUNTER_RESULT` — line 29401

```text
 29399 |     });
 29400 |   }
 29401 |   if (targetType === EFFECT_TARGET_TYPES.ENCOUNTER_RESULT) {
 29402 |     const encounterLine = liveRefereeCurrentEncounterLine(prompt);
 29403 |     return liveRefereeEffectTargetScreenMarkup({
```

#### `"encounter-result"` — line 41021

```text
 41019 |     item: summary, title: "Reroll replaced an encounter result", summary,
 41020 |     type: "encounter-reroll-token", categories: ["tokens", "pokemon", "encounter"],
 41021 |     tags: ["reroll-token", "encounter-result", resultKind || "result"],
 41022 |     playerIds: [actor.id, targetPlayerId].filter(Boolean), pokemonNames: [previousName, nextName].filter(Boolean),
 41023 |     tokenNames: [metadata.name || "Reroll"], linkedEventId: sourceEffectId,
```

#### `"encounter-reroll"` — line 41372

```text
 41370 |     linkedResponseId: savedRerollResponse?.id || "",
 41371 |     promptId: savedRerollResponse?.respondingToPromptId || "",
 41372 |     source: "encounter-reroll"
 41373 |   });
 41374 |   randomSession.rerollCount = Number(randomSession.rerollCount || 0) + 1;
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 46958

```text
 46956 |     activity = createTokenScenarioEvent({ actor, target, title: `${actor.name}'s encounter is about to begin.`, message: "Choose before-roll Encounter effects now.", type: "encounter-before-roll", targeted: false, payload: { encounterStage: "beforeRoll" } });
 46957 |   } else if (kind === "encounterResult") {
 46958 |     activity = createTokenScenarioEvent({ actor, target, title: `${actor.name} rolled Abra.`, message: `${actor.name} rolled Abra. The result is pending.`, type: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT, targeted: false, payload: { encounterStage: "result", resultName: "Abra" } });
 46959 |   } else if (kind === "wheelManual") {
 46960 |     const guided = (contract?.list || []).find((definition) => definition.resolverMode === EFFECT_RESOLUTION_MODES.GUIDED) || tokenDefinition;
```

#### `TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT` — line 47495

```text
 47493 |   const presets = {
 47494 |     encounter: {
 47495 |       type: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT,
 47496 |       title: `${actor.name} test encounter result`,
 47497 |       message: `${actor.name} rolled a test encounter result. Encounter tokens and trades may happen before finalizing.`,
```

#### `TOKEN_TIMING_CATEGORIES.ENCOUNTER` — line 47499

```text
 47497 |       message: `${actor.name} rolled a test encounter result. Encounter tokens and trades may happen before finalizing.`,
 47498 |       sourceType: "admin-test-encounter",
 47499 |       payload: { tokenTimingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER, effectApplication: "audit" }
 47500 |     },
 47501 |     control: {
```

#### `encounterCopyRecords` — line 48904

```text
 48902 |     copiedTokenRelationships: structuredClone(state.copiedTokenRelationships || []),
 48903 |     privateEffectRecords: structuredClone(state.privateEffectRecords || []),
 48904 |     encounterCopyRecords: structuredClone(state.encounterCopyRecords || []),
 48905 |     effectOperations: structuredClone(state.effectOperations || [])
 48906 |   };
```

#### `encounterCopyRecords` — line 59358

```text
 59356 |   if (undoData.previousCopiedTokenRelationships) state.copiedTokenRelationships = structuredClone(undoData.previousCopiedTokenRelationships);
 59357 |   if (undoData.previousPrivateEffectRecords) state.privateEffectRecords = structuredClone(undoData.previousPrivateEffectRecords);
 59358 |   if (undoData.previousEncounterCopyRecords) state.encounterCopyRecords = structuredClone(undoData.previousEncounterCopyRecords);
 59359 |   syncLinkedTransactions();
 59360 |   syncPlayerPokemonLists();
```

#### `previousEncounterCopyRecords` — line 59358

```text
 59356 |   if (undoData.previousCopiedTokenRelationships) state.copiedTokenRelationships = structuredClone(undoData.previousCopiedTokenRelationships);
 59357 |   if (undoData.previousPrivateEffectRecords) state.privateEffectRecords = structuredClone(undoData.previousPrivateEffectRecords);
 59358 |   if (undoData.previousEncounterCopyRecords) state.encounterCopyRecords = structuredClone(undoData.previousEncounterCopyRecords);
 59359 |   syncLinkedTransactions();
 59360 |   syncPlayerPokemonLists();
```

#### `encounterSessionId` — line 59499

```text
 59497 |         if (undoneGameCornerSessionIds.includes(logEntry.gameCornerSessionId)) logEntry.undone = true;
 59498 |       });
 59499 |     } else if (undoData.locationId === "encounter" || undoData.encounterSessionId) {
 59500 |       undoEncounterActionVisit(undoData);
 59501 |     } else {
```

#### `encounterCopyRecords` — line 59644

```text
 59642 |     if (previous.copiedTokenRelationships) state.copiedTokenRelationships = structuredClone(previous.copiedTokenRelationships);
 59643 |     if (previous.privateEffectRecords) state.privateEffectRecords = structuredClone(previous.privateEffectRecords);
 59644 |     if (previous.encounterCopyRecords) state.encounterCopyRecords = structuredClone(previous.encounterCopyRecords);
 59645 |     if (previous.effectOperations) state.effectOperations = structuredClone(previous.effectOperations);
 59646 |     ensureGymPhaseState(state.series, state.gym);
```

### Live Encounter channel — `server.js`

#### `encounterCopyRecords` — line 1307

```text
  1305 |     previousCopiedTokenRelationships: cloneJson(state.copiedTokenRelationships || []),
  1306 |     previousPrivateEffectRecords: cloneJson(state.privateEffectRecords || []),
  1307 |     previousEncounterCopyRecords: cloneJson(state.encounterCopyRecords || [])
  1308 |   };
  1309 | }
```

#### `previousEncounterCopyRecords` — line 1307

```text
  1305 |     previousCopiedTokenRelationships: cloneJson(state.copiedTokenRelationships || []),
  1306 |     previousPrivateEffectRecords: cloneJson(state.privateEffectRecords || []),
  1307 |     previousEncounterCopyRecords: cloneJson(state.encounterCopyRecords || [])
  1308 |   };
  1309 | }
```

### Old generic Encounter token metadata — `app.js`

#### `Hidden Grotto` — line 1150

```text
  1148 |     "name": "Grotto Regular",
  1149 |     "tier": "C",
  1150 |     "description": "Hidden Grotto Encounters Cost 750 Less For You.",
  1151 |     "isConsumable": false,
  1152 |     "uses": null
```

#### `Hidden Grotto` — line 1294

```text
  1292 |     "name": "Encounter Pro",
  1293 |     "tier": "A",
  1294 |     "description": "Once Per Action Phase Get A Free Hidden Grotto Encounter.",
  1295 |     "isConsumable": false,
  1296 |     "uses": null
```

#### `Hidden Grotto` — line 2194

```text
  2192 |     "name": "Grotto Pass",
  2193 |     "tier": "C",
  2194 |     "description": "Visit The Hidden Grotto Without Using An Action.",
  2195 |     "isConsumable": true,
  2196 |     "uses": 2
```

#### `Encounter Wheel` — line 2762

```text
  2760 |   "revenge": { names: ["Revenge"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Revenge Pending", note: "Post-curse revenge marker." },
  2761 |   "extra-encounter-token": { names: ["Extra Encounter Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Extra Encounter Available", note: "Spend during Action Phase to roll an extra encounter." },
  2762 |   "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, choiceLabel: "Pokemon Name", effectType: "log", note: "Remove one Pokemon per 5 entries from Encounter Wheel. Wheel editor hook pending." },
  2763 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
  2764 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
```

#### `TOKEN_TIMING_ENGINE_V1_DEFINITIONS` — line 2970

```text
  2968 | });
  2969 |
  2970 | const TOKEN_TIMING_ENGINE_V1_DEFINITIONS = Object.freeze({
  2971 |   "extra-encounter-token": Object.freeze({
  2972 |     id: "extra-encounter-token",
```

#### `resolverId: "extraEncounter"` — line 2993

```text
  2991 |     visibility: "public",
  2992 |     logType: "tokenUsed",
  2993 |     resolverId: "extraEncounter"
  2994 |   }),
  2995 |   "restrict-token": Object.freeze({
```

#### `resolverId: "reroll"` — line 3137

```text
  3135 |     visibility: "public",
  3136 |     logType: "tokenUsed",
  3137 |     resolverId: "reroll"
  3138 |   })
  3139 | });
```

#### `TOKEN_TIMING_ENGINE_V1_DEFINITIONS` — line 3154

```text
  3152 |   const key = slugify(tokenName);
  3153 |   if (!key) return null;
  3154 |   const entry = Object.entries(TOKEN_TIMING_ENGINE_V1_DEFINITIONS)
  3155 |     .find(([id, definition]) => slugify(id) === key || (definition.names || []).some((name) => slugify(name) === key));
  3156 |   return entry ? { ...entry[1], id: entry[1].id || entry[0], source: "engine-v1" } : null;
```

#### `Encounter Wheel` — line 38516

```text
 38514 | const bulletinQuestBank = Object.freeze({
 38515 |   easy: [
 38516 |     ["Pokemon Hunt", "Spin The Encounter Wheel Twice"],
 38517 |     ["Find An Item", "Visit The Department Store & Buy An Item"],
 38518 |     ["Ranger Check-In", "Visit The Ranger Base"],
```

#### `Hidden Grotto` — line 38542

```text
 38540 |     ["Off My Meds", "Visit The Pokemon Center & Use A Center's Paid Option."],
 38541 |     ["Prize Pokemon", "Win At The Game Corner Or Use A Game Corner Ticket."],
 38542 |     ["Tracking The Beast", "Catch A Pokemon From The Hidden Grotto"],
 38543 |     ["The Dragon's Discount", "Leave A Pokemon In The Dragons Den"],
 38544 |     ["Supply Run", "Spend 9K"],
```

### Preserve current/shared — `app.js`

#### `randomPokemonSessions` — line 2540

```text
  2538 |     wheelDrawerOpen: false,
  2539 |     skipWheelAnimation: false,
  2540 |     randomPokemonSessions: [],
  2541 |     pokemonFamilyTierCache: {},
  2542 |     pokemonSpriteVariants: {},
```

#### `randomPokemonSessions` — line 3799

```text
  3797 |     previousPlayerNotifications: structuredClone(state.playerNotifications || []),
  3798 |     previousWheelSessions: structuredClone(state.wheelSessions || []),
  3799 |     previousRandomPokemonSessions: structuredClone(state.randomPokemonSessions || []),
  3800 |     previousInteractionEvents: structuredClone(state.interactionEvents || []),
  3801 |     previousTransactions: structuredClone(state.transactions || []),
```

#### `randomPokemonSessions` — line 4325

```text
  4323 |     copiedTokenRelationships: causalIdCollectionDelta(snapshot.previousCopiedTokenRelationships, state.copiedTokenRelationships),
  4324 |     wheelSessions: causalIdCollectionDelta(snapshot.previousWheelSessions, state.wheelSessions),
  4325 |     randomPokemonSessions: causalIdCollectionDelta(snapshot.previousRandomPokemonSessions, state.randomPokemonSessions),
  4326 |     delayedEffects: causalIdCollectionDelta(snapshot.previousDelayedEffects, state.delayedEffects),
  4327 |     broughtTeamSnapshots: causalIdCollectionDelta(snapshot.previousBroughtTeamSnapshots, state.broughtTeamSnapshots),
```

#### `randomPokemonSessions` — line 4350

```text
  4348 |     "pokemonRecords", "statuses", "activations", "consumptions", "transactions", "notifications",
  4349 |     "effectOperations", "copiedActivations", "copiedTokenRelationships", "wheelSessions",
  4350 |     "randomPokemonSessions", "delayedEffects", "broughtTeamSnapshots", "postPayoutProcedures",
  4351 |     "encounterCopyRecords", "pokemonLog", "banlistHistory"
  4352 |   ];
```

#### `randomPokemonSessions` — line 4456

```text
  4454 |   state.copiedTokenRelationships = applyCausalIdCollectionUndo(state.copiedTokenRelationships, undoData.copiedTokenRelationships);
  4455 |   state.wheelSessions = applyCausalIdCollectionUndo(state.wheelSessions, undoData.wheelSessions);
  4456 |   state.randomPokemonSessions = applyCausalIdCollectionUndo(state.randomPokemonSessions, undoData.randomPokemonSessions);
  4457 |   state.delayedEffects = applyCausalIdCollectionUndo(state.delayedEffects, undoData.delayedEffects);
  4458 |   state.broughtTeamSnapshots = applyCausalIdCollectionUndo(state.broughtTeamSnapshots, undoData.broughtTeamSnapshots);
```

#### `randomPokemonSessions` — line 4501

```text
  4499 |     }
  4500 |   }
  4501 |   if (state.selectedRandomPokemonSessionId && !(state.randomPokemonSessions || []).some((entry) => entry.id === state.selectedRandomPokemonSessionId)) {
  4502 |     state.selectedRandomPokemonSessionId = "";
  4503 |     state.randomPokemonDrawerOpen = false;
```

#### `randomPokemonSessions` — line 22065

```text
 22063 |   nextState.wheelDrawerOpen = Boolean(nextState.wheelDrawerOpen);
 22064 |   nextState.skipWheelAnimation = Boolean(nextState.skipWheelAnimation);
 22065 |   nextState.randomPokemonSessions ||= [];
 22066 |   nextState.pokemonFamilyTierCache ||= {};
 22067 |   pokemonFamilyTierCache = nextState.pokemonFamilyTierCache;
```

#### `randomPokemonSessions` — line 22078

```text
 22076 |     session.battlePhaseStayLength = Number(session.battlePhaseStayLength || 0);
 22077 |   });
 22078 |   nextState.randomPokemonSessions.forEach((session) => {
 22079 |     session.status = ["pending", "confirmed", "rerolled", "undone", "cancelled"].includes(session.status) ? session.status : "pending";
 22080 |     session.rerollCount = Number(session.rerollCount || 0);
```

#### `function createPokemonResultTimingWindow(` — line 23147

```text
 23145 | }
 23146 |
 23147 | function createPokemonResultTimingWindow(session, player) {
 23148 |   if (!session || session.interactionEventId || !player) return null;
 23149 |   const resultName = session.resultDisplayName || session.resultPokemonName || "Pokemon result";
```

#### `randomPokemonSessions` — line 25511

```text
 25509 |     || (/pokemon-result|encounter-result/.test(activity.type || "") ? activity.sourceId : "");
 25510 |   if (!sessionId) return null;
 25511 |   return (targetState.randomPokemonSessions || []).find((session) => session.id === sessionId && session.status === "pending") || null;
 25512 | }
 25513 |
```

#### `randomPokemonSessions` — line 26728

```text
 26726 |
 26727 | async function handleLiveTableAcceptResult(sessionId, activityId = "") {
 26728 |   const session = (state.randomPokemonSessions || []).find((entry) => entry.id === sessionId && entry.status === "pending");
 26729 |   if (!session) {
 26730 |     alert("No pending Pokemon result is available to accept.");
```

#### `randomPokemonSessions` — line 26740

```text
 26738 |
 26739 | async function handleLiveTableRerollResult(sessionId) {
 26740 |   const session = (state.randomPokemonSessions || []).find((entry) => entry.id === sessionId && entry.status === "pending");
 26741 |   if (!session) {
 26742 |     alert("No pending Pokemon result is available to reroll.");
```

#### `randomPokemonSessions` — line 41030

```text
 41028 |
 41029 | function pendingRandomPokemonSessions() {
 41030 |   state.randomPokemonSessions ||= [];
 41031 |   return state.randomPokemonSessions.filter((session) => session.status === "pending");
 41032 | }
```

#### `randomPokemonSessions` — line 41031

```text
 41029 | function pendingRandomPokemonSessions() {
 41030 |   state.randomPokemonSessions ||= [];
 41031 |   return state.randomPokemonSessions.filter((session) => session.status === "pending");
 41032 | }
 41033 |
```

#### `randomPokemonSessions` — line 41036

```text
 41034 | function pendingRerollTargets() {
 41035 |   const targets = [];
 41036 |   (state.randomPokemonSessions || [])
 41037 |     .filter((session) => session.status === "pending" && session.rerollable !== false && !session.interactionLocked)
 41038 |     .forEach((session) => {
```

#### `randomPokemonSessions` — line 41146

```text
 41144 |     confirmedAt: null
 41145 |   };
 41146 |   state.randomPokemonSessions ||= [];
 41147 |   state.randomPokemonSessions.unshift(session);
 41148 |   state.selectedRandomPokemonSessionId = session.id;
```

#### `randomPokemonSessions` — line 41147

```text
 41145 |   };
 41146 |   state.randomPokemonSessions ||= [];
 41147 |   state.randomPokemonSessions.unshift(session);
 41148 |   state.selectedRandomPokemonSessionId = session.id;
 41149 |   state.randomPokemonDrawerOpen = true;
```

#### `randomPokemonSessions` — line 41154

```text
 41152 |   render();
 41153 |   const sprite = await fetchStablePokemonSprite(result.displayName, session.chosenSpriteKey);
 41154 |   const latest = (state.randomPokemonSessions || []).find((entry) => entry.id === session.id);
 41155 |   if (latest && latest.status === "pending") {
 41156 |     latest.chosenSpriteKey = sprite.spriteKey || "";
```

#### `function confirmRandomPokemonSession(` — line 41201

```text
 41199 | }
 41200 |
 41201 | async function confirmRandomPokemonSession(sessionId = state.selectedRandomPokemonSessionId, { skipPendingGuard = false } = {}) {
 41202 |   if (!skipPendingGuard && !guardPendingEventBeforeAction("Confirm Pokemon Result", () => confirmRandomPokemonSession(sessionId, { skipPendingGuard: true }))) return;
 41203 |   const randomSession = (state.randomPokemonSessions || []).find((entry) => entry.id === sessionId);
```

#### `randomPokemonSessions` — line 41203

```text
 41201 | async function confirmRandomPokemonSession(sessionId = state.selectedRandomPokemonSessionId, { skipPendingGuard = false } = {}) {
 41202 |   if (!skipPendingGuard && !guardPendingEventBeforeAction("Confirm Pokemon Result", () => confirmRandomPokemonSession(sessionId, { skipPendingGuard: true }))) return;
 41203 |   const randomSession = (state.randomPokemonSessions || []).find((entry) => entry.id === sessionId);
 41204 |   if (!randomSession || randomSession.status !== "pending") return;
 41205 |   const player = state.players.find((entry) => entry.id === (randomSession.resultOwnerPlayerId || randomSession.ownerPlayerId || randomSession.playerId));
```

#### `function rerollRandomPokemonSession(` — line 41302

```text
 41300 | }
 41301 |
 41302 | async function rerollRandomPokemonSession(sessionId = state.selectedRandomPokemonSessionId, options = {}) {
 41303 |   const randomSession = (state.randomPokemonSessions || []).find((entry) => entry.id === sessionId);
 41304 |   if (!randomSession || randomSession.status !== "pending" || randomSession.rerollable === false || randomSession.interactionLocked) return;
```

#### `randomPokemonSessions` — line 41303

```text
 41301 |
 41302 | async function rerollRandomPokemonSession(sessionId = state.selectedRandomPokemonSessionId, options = {}) {
 41303 |   const randomSession = (state.randomPokemonSessions || []).find((entry) => entry.id === sessionId);
 41304 |   if (!randomSession || randomSession.status !== "pending" || randomSession.rerollable === false || randomSession.interactionLocked) return;
 41305 |   const ownerPlayerId = randomSession.resultOwnerPlayerId || randomSession.ownerPlayerId || randomSession.playerId;
```

#### `randomPokemonSessions` — line 41416

```text
 41414 |   renderRandomPokemonPanel();
 41415 |   const sprite = await fetchStablePokemonSprite(nextName, randomSession.chosenSpriteKey);
 41416 |   const latest = (state.randomPokemonSessions || []).find((entry) => entry.id === randomSession.id);
 41417 |   if (latest && latest.status === "pending") {
 41418 |     latest.chosenSpriteKey = sprite.spriteKey || "";
```

#### `randomPokemonSessions` — line 41442

```text
 41440 |
 41441 | function cancelRandomPokemonSession(sessionId = state.selectedRandomPokemonSessionId) {
 41442 |   const randomSession = (state.randomPokemonSessions || []).find((entry) => entry.id === sessionId);
 41443 |   if (!randomSession || randomSession.status !== "pending") return;
 41444 |   randomSession.status = "cancelled";
```

#### `const V2_ROUTE_TOKEN_IDS` — line 42476

```text
 42474 |   Object.freeze({ id: "plus-2", label: "+2 tiers", weight: 5, offset: 2 })
 42475 | ]);
 42476 | const V2_ROUTE_TOKEN_IDS = Object.freeze({
 42477 |   extraEncounter: "extra-encounter-token",
 42478 |   reroll: "reroll-token",
```

#### `encounterResults` — line 42864

```text
 42862 |       suppressions: [],
 42863 |       pendingEncounterOpportunities: [],
 42864 |       encounterResults: [],
 42865 |       finalizedAcquisitions: []
 42866 |     });
```

#### `encounterResults` — line 42890

```text
 42888 |   next.counters ||= {};
 42889 |   next.counters.opportunity = Math.max(Number(next.counters.opportunity || 0), ...(next.routes || []).flatMap((route) => (route.pendingEncounterOpportunities || []).map((entry) => v2CounterFromId(entry.opportunityId))), 0);
 42890 |   next.counters.result = Math.max(Number(next.counters.result || 0), ...(next.routes || []).flatMap((route) => (route.encounterResults || []).map((entry) => v2CounterFromId(entry.resultId))), 0);
 42891 |   next.counters.acquisition = Math.max(Number(next.counters.acquisition || 0), ...(next.routes || []).flatMap((route) => (route.finalizedAcquisitions || []).map((entry) => v2CounterFromId(entry.acquisitionId))), 0);
 42892 |   next.counters.suppression = Number(next.counters.suppression || 0);
```

#### `route.encounterResults` — line 42890

```text
 42888 |   next.counters ||= {};
 42889 |   next.counters.opportunity = Math.max(Number(next.counters.opportunity || 0), ...(next.routes || []).flatMap((route) => (route.pendingEncounterOpportunities || []).map((entry) => v2CounterFromId(entry.opportunityId))), 0);
 42890 |   next.counters.result = Math.max(Number(next.counters.result || 0), ...(next.routes || []).flatMap((route) => (route.encounterResults || []).map((entry) => v2CounterFromId(entry.resultId))), 0);
 42891 |   next.counters.acquisition = Math.max(Number(next.counters.acquisition || 0), ...(next.routes || []).flatMap((route) => (route.finalizedAcquisitions || []).map((entry) => v2CounterFromId(entry.acquisitionId))), 0);
 42892 |   next.counters.suppression = Number(next.counters.suppression || 0);
```

#### `encounterResults` — line 42914

```text
 42912 |       opportunity.temporaryResidents = Array.isArray(opportunity.temporaryResidents) ? opportunity.temporaryResidents : [];
 42913 |     });
 42914 |     route.encounterResults = Array.isArray(route.encounterResults) ? route.encounterResults : [];
 42915 |     route.finalizedAcquisitions = Array.isArray(route.finalizedAcquisitions) ? route.finalizedAcquisitions : [];
 42916 |   });
```

#### `route.encounterResults` — line 42914

```text
 42912 |       opportunity.temporaryResidents = Array.isArray(opportunity.temporaryResidents) ? opportunity.temporaryResidents : [];
 42913 |     });
 42914 |     route.encounterResults = Array.isArray(route.encounterResults) ? route.encounterResults : [];
 42915 |     route.finalizedAcquisitions = Array.isArray(route.finalizedAcquisitions) ? route.finalizedAcquisitions : [];
 42916 |   });
```

#### `encounterResults` — line 42986

```text
 42984 | function v2FindResult(routeState, resultId) {
 42985 |   for (const route of routeState.routes || []) {
 42986 |     const result = (route.encounterResults || []).find((entry) => entry.resultId === resultId);
 42987 |     if (result) return { route, result };
 42988 |   }
```

#### `route.encounterResults` — line 42986

```text
 42984 | function v2FindResult(routeState, resultId) {
 42985 |   for (const route of routeState.routes || []) {
 42986 |     const result = (route.encounterResults || []).find((entry) => entry.resultId === resultId);
 42987 |     if (result) return { route, result };
 42988 |   }
```

#### `encounterResults` — line 43702

```text
 43700 |   opportunity.status = "consumed";
 43701 |   opportunity.consumedByResultId = resultId;
 43702 |   route.encounterResults.push(result);
 43703 |   v2MarkOpportunityTemporaryEffects(opportunity.opportunityId, "consumed", resultId);
 43704 |   v2BumpRouteRevision(routeState);
```

#### `route.encounterResults` — line 43702

```text
 43700 |   opportunity.status = "consumed";
 43701 |   opportunity.consumedByResultId = resultId;
 43702 |   route.encounterResults.push(result);
 43703 |   v2MarkOpportunityTemporaryEffects(opportunity.opportunityId, "consumed", resultId);
 43704 |   v2BumpRouteRevision(routeState);
```

#### `encounterResults` — line 43787

```text
 43785 |     privateDiscoveries,
 43786 |     knownResidents: [...publicView.publicDiscoveries, ...privateDiscoveries],
 43787 |     unresolvedEncounter: (route.encounterResults || []).find((result) => result.playerId === playerId && result.status === "unresolved") || null,
 43788 |     pendingOpportunities: getPendingRouteOpportunitiesForPlayer(routeState, playerId).filter((opportunity) => opportunity.routeNumber === route.routeNumber),
 43789 |     activeVisibleEffects: getVisibleRouteEffectsForPlayer(routeState, route.routeNumber, playerId),
```

#### `route.encounterResults` — line 43787

```text
 43785 |     privateDiscoveries,
 43786 |     knownResidents: [...publicView.publicDiscoveries, ...privateDiscoveries],
 43787 |     unresolvedEncounter: (route.encounterResults || []).find((result) => result.playerId === playerId && result.status === "unresolved") || null,
 43788 |     pendingOpportunities: getPendingRouteOpportunitiesForPlayer(routeState, playerId).filter((opportunity) => opportunity.routeNumber === route.routeNumber),
 43789 |     activeVisibleEffects: getVisibleRouteEffectsForPlayer(routeState, route.routeNumber, playerId),
```

#### `encounterResults` — line 44285

```text
 44283 |   opportunity.status = "consumed";
 44284 |   opportunity.consumedByResultId = resultId;
 44285 |   route.encounterResults.push(result);
 44286 |   const sourceAction = opportunity.source?.actionId ? v2FindAction(v2EnsureActionPhase(state.series), opportunity.source.actionId) : null;
 44287 |   if (sourceAction) {
```

#### `route.encounterResults` — line 44285

```text
 44283 |   opportunity.status = "consumed";
 44284 |   opportunity.consumedByResultId = resultId;
 44285 |   route.encounterResults.push(result);
 44286 |   const sourceAction = opportunity.source?.actionId ? v2FindAction(v2EnsureActionPhase(state.series), opportunity.source.actionId) : null;
 44287 |   if (sourceAction) {
```

#### `function useV2RouteRerollToken(` — line 44767

```text
 44765 | }
 44766 |
 44767 | function useV2RouteRerollToken(actionId, tokenInventoryId = "") {
 44768 |   try {
 44769 |     const player = activePlayer();
```

#### `function useV2ExtraEncounter(` — line 44787

```text
 44785 | }
 44786 |
 44787 | function useV2ExtraEncounter(routeNumber, tokenInventoryId = "") {
 44788 |   try {
 44789 |     const player = activePlayer();
```

#### `function applyV2RouteRepel(` — line 44805

```text
 44803 | }
 44804 |
 44805 | function applyV2RouteRepel(routeNumber, battleTierId, tokenInventoryId = "") {
 44806 |   try {
 44807 |     const player = activePlayer();
```

#### `function useV2MasterBallOnOpportunity(` — line 44816

```text
 44814 | }
 44815 |
 44816 | function useV2MasterBallOnOpportunity(opportunityId, residentId, tokenInventoryId = "") {
 44817 |   try {
 44818 |     const player = activePlayer();
```

#### `randomPokemonSessions` — line 46821

```text
 46819 |     "playerNotifications",
 46820 |     "lingeringStatuses",
 46821 |     "randomPokemonSessions",
 46822 |     "wheelSessions"
 46823 |   ].forEach((key) => markSandboxCollectionChanges(candidate, baseline, key, origin));
```

#### `randomPokemonSessions` — line 59273

```text
 59271 |       }
 59272 |     });
 59273 |   (state.randomPokemonSessions || [])
 59274 |     .filter((session) => sessionIds.has(session.gameCornerSessionId) || session.actionVisitId === undoData.visitId)
 59275 |     .forEach((session) => {
```

#### `randomPokemonSessions` — line 59339

```text
 59337 |   if (undoData.previousPlayerNotifications) state.playerNotifications = structuredClone(undoData.previousPlayerNotifications);
 59338 |   if (undoData.previousWheelSessions) state.wheelSessions = structuredClone(undoData.previousWheelSessions);
 59339 |   if (undoData.previousRandomPokemonSessions) state.randomPokemonSessions = structuredClone(undoData.previousRandomPokemonSessions);
 59340 |   if (undoData.previousInteractionEvents) state.interactionEvents = structuredClone(undoData.previousInteractionEvents).map((activity) => normalizeInteractionActivity(activity, state));
 59341 |   if (undoData.previousTransactions) state.transactions = structuredClone(undoData.previousTransactions);
```

### Preserve current/shared — `server.js`

#### `randomPokemonSessions` — line 1293

```text
  1291 |     previousTokenConsumptions: cloneJson(state.tokenConsumptions || []),
  1292 |     previousPlayerNotifications: cloneJson(state.playerNotifications || []),
  1293 |     previousRandomPokemonSessions: cloneJson(state.randomPokemonSessions || []),
  1294 |     previousInteractionEvents: cloneJson((state.interactionEvents || []).filter((entry) => entry.id !== excludedActivityId)),
  1295 |     previousTransactions: cloneJson(state.transactions || []),
```
