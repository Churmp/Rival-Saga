# V1 Purge Stage 5 Encounter Context

Generated from `9762ee8f969825507153c73689839a9860032a1a` after Hidden Grotto runtime removal.

Purpose: isolate the retired Encounter Wheel and legacy encounter-token runtime from the current Route encounter/token system.

## Compact occurrence index

### app.js

- `encounterTokenRuntime`: 4 occurrence(s) — lines 27, 28, 3916, 3971
- `function resolveImmediateTokenUse(`: 1 occurrence(s) — lines 3907
- `metadata.resolverId === "extraEncounter"`: 3 occurrence(s) — lines 3915, 3970, 4108
- `extraEncounterValidation`: 11 occurrence(s) — lines 3914, 3916, 3921, 3922, 3972, 3976, 3988, 3990, 3993, 4109, 4142
- `encounterWheelDefinitions`: 2 occurrence(s) — lines 6123, 41277
- `function encounterWheelDefinition(`: 1 occurrence(s) — lines 41276
- `function encounterWheelKey(`: 1 occurrence(s) — lines 41272
- `encounterSessions`: 34 occurrence(s) — lines 2552, 3814, 4393, 4393, 4418, 4525, 4525, 4525, 22285, 22286, 34698, 34874, 41281, 41282, 41510, 41576, 41752, 41794, 42002, 42107, 42306, 42328, 42349, 42380, 46475, 46531, 46576, 48075, 50095, 60736, 60738, 60786, 60786, 60806
- `function activeEncounterSession(`: 0 occurrence(s)
- `function renderWheelPanel(`: 1 occurrence(s) — lines 46748
- `function closeWheelPanel(`: 1 occurrence(s) — lines 35789
- `encounterOverlay`: 13 occurrence(s) — lines 18822, 18822, 41367, 46550, 46552, 46553, 46554, 46560, 46604, 46608, 63217, 63218, 63302
- `encounterTab`: 7 occurrence(s) — lines 18821, 18821, 46604, 46605, 46606, 46609, 63207
- `includeFishing`: 8 occurrence(s) — lines 41299, 41299, 41305, 42287, 42294, 42369, 46710, 63247
- `includeSurf`: 8 occurrence(s) — lines 41300, 41300, 41306, 42288, 42295, 42370, 46710, 63248
- `Fishing`: 13 occurrence(s) — lines 6073, 41299, 41299, 41305, 42287, 42287, 42294, 42294, 42369, 46710, 46710, 46713, 63247
- `Surf`: 47 occurrence(s) — lines 6073, 20049, 30659, 30773, 32149, 32172, 32443, 41300, 41300, 41306, 42288, 42288, 42295, 42295, 42370, 46710, 46710, 46713, 49688, 49689, 49692, 49695, 49698, 49701, 49704, 49707, 49710, 49713, 49716, 49719, 49735, 49740, 49740, 49741, 49744, 49746, 49758, 49833, 49834, 49837, 49838, 49839, 52378, 59159, 61631, 61633, 63248
- `Hyperspace`: 18 occurrence(s) — lines 6064, 6070, 6074, 6074, 6112, 6132, 6138, 6144, 6152, 6158, 6164, 6175, 6181, 6187, 41524, 41893, 46694, 46694
- `randomPokemonSessions`: 40 occurrence(s) — lines 2555, 3815, 4394, 4394, 4419, 4526, 4526, 4526, 4571, 22300, 22313, 25746, 26963, 26975, 41488, 41489, 41494, 41634, 41635, 41642, 41682, 41683, 41693, 41959, 42090, 42231, 42257, 42280, 42329, 48074, 50092, 50145, 50184, 50194, 60676, 60739, 60771, 60780, 60780, 60807
- `function useV2ExtraEncounter(`: 1 occurrence(s) — lines 45766
- `function useV2RouteRerollToken(`: 1 occurrence(s) — lines 45746
- `function applyV2RouteRepel(`: 1 occurrence(s) — lines 45784
- `function useV2MasterBallOnOpportunity(`: 1 occurrence(s) — lines 45795

### index.html

- `encounter-token-runtime.js`: 1 occurrence(s) — lines 16
- `encounterTab`: 1 occurrence(s) — lines 1365
- `encounterOverlay`: 2 occurrence(s) — lines 1365, 1366
- `Encounter Wheel`: 3 occurrence(s) — lines 1366, 1370, 1371
- `includeFishing`: 0 occurrence(s)
- `includeSurf`: 0 occurrence(s)

### styles.css

- `.encounter-overlay`: 2 occurrence(s) — lines 16558, 16569
- `.encounter-tab`: 2 occurrence(s) — lines 16542, 16568
- `.encounter-modal`: 14 occurrence(s) — lines 16573, 16587, 16588, 16589, 16590, 16591, 16592, 16596, 16597, 16598, 16599, 16603, 16604, 16605
- `.encounter-wheel`: 3 occurrence(s) — lines 16618, 16624, 16631
- `fishing`: 0 occurrence(s)
- `surf`: 100 occurrence(s) — lines 4, 5, 25, 26, 37, 37, 38, 39, 40, 42, 43, 44, 45, 45, 46, 47, 52, 52, 54, 59, 59, 60, 64, 65, 129, 129, 177, 177, 223, 244, 253, 288, 428, 428, 505, 506, 512, 513, 523, 529, 539, 575, 612, 808, 808, 992, 1116, 1116, 1202, 1202, 1261, 1264, 1298, 1318, 1371, 1371, 1439, 1465, 1495, 2152, 3389, 3389, 3399, 3399, 3440, 3493, 3535, 3555, 3555, 3572, 3631, 3631, 3636, 3636, 3643, 3643, 3664, 3687, 3707, 3759, 3760, 3760, 3837, 3843, 3859, 3869, 3919, 4002, 4003, 4056, 4064, 4080, 4112, 4114, 4125, 4210, 4210, 4371, 4403, 4417

### token-effect-contract.js

- `extra-encounter-token`: 2 occurrence(s) — lines 260, 766
- `reroll-token`: 3 occurrence(s) — lines 87, 330, 765
- `repel-token`: 2 occurrence(s) — lines 92, 767
- `dream-ball-token`: 2 occurrence(s) — lines 92, 769
- `honey-token`: 6 occurrence(s) — lines 88, 337, 451, 770, 817, 1192
- `master-ball-token`: 2 occurrence(s) — lines 92, 771
- `extraEncounter`: 2 occurrence(s) — lines 380, 766
- `Encounter Wheel`: 1 occurrence(s) — lines 766
- `Hidden Grotto`: 1 occurrence(s) — lines 770

### package.json

- `encounter`: 3 occurrence(s) — lines 10, 10, 43
- `action-workspace`: 1 occurrence(s) — lines 40
- `action-balance`: 1 occurrence(s) — lines 39
- `v2-route`: 6 occurrence(s) — lines 18, 41, 41, 42, 42, 43

## app.js candidate declaration index

| Declaration | Line |
|---|---:|
| `encounterTokenRuntime` | 27 |
| `trainerClassWheelDefinition` | 612 |
| `normalizeEncounterEntryId` | 6052 |
| `encounterEntry` | 6059 |
| `makeEncounterWheel` | 6078 |
| `starterWheelDefinitions` | 6096 |
| `hyperspaceWheelDefinitions` | 6108 |
| `encounterWheelDefinitions` | 6123 |
| `wheelDefinitions` | 18479 |
| `setPrivateSurfaceControlsDisabled` | 20049 |
| `currentEncounterPendingActivity` | 27825 |
| `recordEncounterTokenUse` | 27839 |
| `liveRefereePromptIsEncounterResult` | 28243 |
| `liveRefereeCurrentEncounterLine` | 29253 |
| `liveRefereeSurfaceType` | 30659 |
| `wheelDefinitionById` | 35101 |
| `pendingWheelSessions` | 35110 |
| `selectedWheelSession` | 35124 |
| `activeWheelVisit` | 35135 |
| `createWheelSession` | 35152 |
| `createTrainerClassWheelSession` | 35178 |
| `weightedWheelOutcome` | 35215 |
| `wheelOutcomeSegmentDegrees` | 35225 |
| `wheelOutcomeLandingDegrees` | 35236 |
| `wheelOutcomeSegments` | 35246 |
| `wheelSegmentAtPointer` | 35263 |
| `updateWheelLivePointerDisplay` | 35272 |
| `playCommittedTrainerClassWheelAnimation` | 35293 |
| `nextWheelLandingRotation` | 35340 |
| `applyWheelReward` | 35349 |
| `completeTrainerClassWheelSpin` | 35378 |
| `completeWheelSpin` | 35475 |
| `spinActiveWheel` | 35645 |
| `finishWheelSession` | 35725 |
| `closeWheelPanel` | 35789 |
| `wheelSessionHasRemainingSpins` | 36476 |
| `groupedRandomPokemonPool` | 41178 |
| `encounterWheelKey` | 41272 |
| `encounterWheelDefinition` | 41276 |
| `pendingEncounterSessions` | 41280 |
| `selectedEncounterSession` | 41285 |
| `encounterEntriesForSession` | 41296 |
| `weightedEncounterEntry` | 41316 |
| `ENCOUNTER_POINTER_ANGLE_DEGREES` | 41327 |
| `buildEncounterWheelSegments` | 41333 |
| `getEncounterSegmentAtPointer` | 41351 |
| `updateEncounterLivePointerDisplay` | 41367 |
| `animateEncounterLivePointer` | 41392 |
| `resolveEncounterSpecialResult` | 41402 |
| `encounterEntryCenterDegrees` | 41427 |
| `nextEncounterLandingRotation` | 41438 |
| `encounterRollFreeRerollReason` | 41457 |
| `pendingRandomPokemonSessions` | 41487 |
| `rerollRandomPokemonResult` | 41571 |
| `selectedRandomPokemonSession` | 41588 |
| `createRandomPokemonSession` | 41599 |
| `createEncounterPokemonResultSession` | 41652 |
| `hydrateEncounterRollSprite` | 41718 |
| `encounterRollWasObtained` | 41726 |
| `encounterSessionReadyForAutomaticCompletion` | 41730 |
| `completeObtainedEncounterSession` | 41737 |
| `addEncounterRollToRoster` | 41750 |
| `rerollEncounterRoll` | 41793 |
| `confirmRandomPokemonSession` | 41957 |
| `rerollRandomPokemonSession` | 42089 |
| `cancelRandomPokemonSession` | 42256 |
| `updateEncounterActionLog` | 42269 |
| `activeEncounterSessionForPlayer` | 42305 |
| `startEncounterSession` | 42312 |
| `V2_ROUTE_PREMIUM_ENCOUNTER_WEIGHT` | 43400 |
| `V2_EXTRA_ENCOUNTER_PRICE` | 43446 |
| `v2NormalizeRouteEncounterState` | 43859 |
| `v2RouteHasPositiveEncounterWeight` | 44135 |
| `v2CreateRouteEncounterOpportunity` | 44623 |
| `v2DrawRouteOpportunityEncounter` | 44650 |
| `getEncounterCapabilitiesForPlayer` | 44799 |
| `v2PurchaseExtraEncounter` | 45022 |
| `v2UseExtraEncounter` | 45077 |
| `v2DrawRouteActionEncounter` | 45361 |
| `purchaseV2ExtraEncounter` | 45757 |
| `useV2ExtraEncounter` | 45766 |
| `getRouteEncounterRailCapabilitiesForPlayer` | 45976 |
| `renderV2RouteEncounterRail` | 46027 |
| `renderRandomPokemonPanel` | 46411 |
| `completeEncounterRoll` | 46474 |
| `spinEncounterWheel` | 46530 |
| `closeEncounterSession` | 46574 |
| `renderEncounterOverlay` | 46601 |
| `renderWheelPanel` | 46748 |
| `cancelCurrentGymWheelSessionsForPlayers` | 48979 |
| `contrastSurfaceTokens` | 49833 |
| `honeyEligibleEncounterResults` | 50091 |
| `startTrainerClassWheelActivation` | 57257 |
| `reverseWheelSessionsForActionVisit` | 60582 |
| `undoEncounterActionVisit` | 60733 |


## app.js detailed contexts

### encounterTokenRuntime

Occurrences: 4

#### Hit 1 — line 27

```text
     9 | const SITE_SECTION_PATHS = Object.freeze({
    10 |   home: "/",
    11 |   games: "/games",
    12 |   rulebook: "/rulebook",
    13 |   patchNotes: "/patch-notes",
    14 |   profiles: "/profiles",
    15 |   forums: "/forums",
    16 |   admin: "/admin"
    17 | });
    18 | const SITE_SECTION_BY_PATH = new Map(Object.entries(SITE_SECTION_PATHS).map(([section, route]) => [route, section]));
    19 | const gameShellContract = globalThis.rivalSagaGameShellContract;
    20 | if (!gameShellContract) throw new Error("Game Shell contract failed to load.");
    21 | const saveCompactionRuntime = globalThis.rivalSagaSaveCompaction;
    22 | if (!saveCompactionRuntime) throw new Error("Save compaction runtime failed to load.");
    23 | const interactionSituationLifecycle = globalThis.rivalSagaInteractionSituationLifecycle;
    24 | if (!interactionSituationLifecycle) throw new Error("Interaction situation lifecycle failed to load.");
    25 | const provisionalDeclarationRuntime = globalThis.rivalSagaProvisionalDeclarationRuntime;
    26 | if (!provisionalDeclarationRuntime) throw new Error("Provisional declaration runtime failed to load.");
    27 | const encounterTokenRuntime = globalThis.rivalSagaEncounterTokenRuntime;
    28 | if (!encounterTokenRuntime) throw new Error("Encounter Token runtime failed to load.");
    29 | const API_ORIGIN = gameShellContract.resolveApiOrigin(window.location, globalThis.RIVAL_SAGA_CONFIG?.apiOrigin || "");
    30 | const DEVELOPMENT_DIAGNOSTICS = ["127.0.0.1", "localhost", "::1"].includes(window.location.hostname);
    31 | const POKEMON_BUILD_DATA_SCRIPT_SRC = "pokemon-build-data.js?v=7";
    32 | const EMPTY_POKEMON_BUILD_DATA = Object.freeze({
    33 |   pokemon: Object.freeze({}),
    34 |   moves: Object.freeze({}),
    35 |   abilities: Object.freeze({}),
    36 |   species: Object.freeze({}),
    37 |   items: Object.freeze({}),
    38 |   natures: Object.freeze([])
    39 | });
    40 | const TOP_LEVEL_PAGE_IDS = Object.freeze([
    41 |   "playerHub",
    42 |   "actionPhase",
    43 |   "battlePhase",
    44 |   "leaderboard",
    45 |   "mvpRace",
```


#### Hit 2 — line 28

```text
    10 |   home: "/",
    11 |   games: "/games",
    12 |   rulebook: "/rulebook",
    13 |   patchNotes: "/patch-notes",
    14 |   profiles: "/profiles",
    15 |   forums: "/forums",
    16 |   admin: "/admin"
    17 | });
    18 | const SITE_SECTION_BY_PATH = new Map(Object.entries(SITE_SECTION_PATHS).map(([section, route]) => [route, section]));
    19 | const gameShellContract = globalThis.rivalSagaGameShellContract;
    20 | if (!gameShellContract) throw new Error("Game Shell contract failed to load.");
    21 | const saveCompactionRuntime = globalThis.rivalSagaSaveCompaction;
    22 | if (!saveCompactionRuntime) throw new Error("Save compaction runtime failed to load.");
    23 | const interactionSituationLifecycle = globalThis.rivalSagaInteractionSituationLifecycle;
    24 | if (!interactionSituationLifecycle) throw new Error("Interaction situation lifecycle failed to load.");
    25 | const provisionalDeclarationRuntime = globalThis.rivalSagaProvisionalDeclarationRuntime;
    26 | if (!provisionalDeclarationRuntime) throw new Error("Provisional declaration runtime failed to load.");
    27 | const encounterTokenRuntime = globalThis.rivalSagaEncounterTokenRuntime;
    28 | if (!encounterTokenRuntime) throw new Error("Encounter Token runtime failed to load.");
    29 | const API_ORIGIN = gameShellContract.resolveApiOrigin(window.location, globalThis.RIVAL_SAGA_CONFIG?.apiOrigin || "");
    30 | const DEVELOPMENT_DIAGNOSTICS = ["127.0.0.1", "localhost", "::1"].includes(window.location.hostname);
    31 | const POKEMON_BUILD_DATA_SCRIPT_SRC = "pokemon-build-data.js?v=7";
    32 | const EMPTY_POKEMON_BUILD_DATA = Object.freeze({
    33 |   pokemon: Object.freeze({}),
    34 |   moves: Object.freeze({}),
    35 |   abilities: Object.freeze({}),
    36 |   species: Object.freeze({}),
    37 |   items: Object.freeze({}),
    38 |   natures: Object.freeze([])
    39 | });
    40 | const TOP_LEVEL_PAGE_IDS = Object.freeze([
    41 |   "playerHub",
    42 |   "actionPhase",
    43 |   "battlePhase",
    44 |   "leaderboard",
    45 |   "mvpRace",
    46 |   "banlist",
```


#### Hit 3 — line 3916

```text
  3898 |     undoLogId,
  3899 |     undoStatus: "available",
  3900 |     testData: Boolean(state.testingTools?.activeScenario)
  3901 |   };
  3902 |   state.effectAuditRecords ||= [];
  3903 |   state.effectAuditRecords.unshift(record);
  3904 |   return record;
  3905 | }
  3906 | 
  3907 | async function resolveImmediateTokenUse(draft, { context = {} } = {}) {
  3908 |   const metadata = tokenEffectMetadataByName(draft.tokenName);
  3909 |   const timingCheck = tokenUseTimingCheck({ player: draft.actor, tokenName: draft.tokenName, metadata, context });
  3910 |   if (!timingCheck.ok) {
  3911 |     alert(timingCheck.reason);
  3912 |     return null;
  3913 |   }
  3914 |   let extraEncounterValidation = null;
  3915 |   if (metadata.resolverId === "extraEncounter") {
  3916 |     extraEncounterValidation = encounterTokenRuntime.validateExtraEncounter(state, {
  3917 |       playerId: draft.targetPlayerId
  3918 |     }, {
  3919 |       wheelDefinition: encounterWheelDefinition(state.series, state.gym)
  3920 |     });
  3921 |     if (!extraEncounterValidation.ok) {
  3922 |       alert(extraEncounterValidation.reason);
  3923 |       return null;
  3924 |     }
  3925 |   }
  3926 |   if (metadata.id === "substitute") {
  3927 |     const legality = controlTokenDraftLegality(draft, metadata);
  3928 |     if (!legality.ok) {
  3929 |       alert(legality.reason);
  3930 |       return null;
  3931 |     }
  3932 |   }
  3933 |   if (metadata.resolverId === "substituteAttach") {
  3934 |     const targetPokemon = (state.pokemonRecords || []).find((pokemon) => pokemon.id === draft.targetPokemonId);
```


#### Hit 4 — line 3971

```text
  3953 |       source: "token-engine-v1"
  3954 |     })
  3955 |     : { token: null, consumption: null };
  3956 |   if (metadata.consumesOnLegalUse && !consumed?.token) {
  3957 |     alert(`${draft.actor.name} does not have ${draft.tokenName}.`);
  3958 |     return null;
  3959 |   }
  3960 |   const consumedToken = consumed?.token || { id: "", name: draft.tokenName };
  3961 |   const now = new Date().toISOString();
  3962 |   const details = [
  3963 |     `Token: ${consumedToken.name || draft.tokenName}`,
  3964 |     `Timing: ${(timingCheck.windows || []).join(", ") || "manual"}`,
  3965 |     `Pattern: ${metadata.activationPattern || "manual"}`
  3966 |   ];
  3967 |   const statusIds = [];
  3968 |   let encounterSessionId = "";
  3969 |   let result = "resolved";
  3970 |   if (metadata.resolverId === "extraEncounter") {
  3971 |     const grant = encounterTokenRuntime.grantExtraEncounter(state, {
  3972 |       playerId: extraEncounterValidation.player.id,
  3973 |       sourceTokenId: consumedToken.id || "",
  3974 |       sourceActivationId: consumedToken.id || ""
  3975 |     }, {
  3976 |       wheelDefinition: extraEncounterValidation.wheel,
  3977 |       now
  3978 |     });
  3979 |     if (!grant.ok || !grant.session) {
  3980 |       restoreTokenEffectContractUndoData(rollbackSnapshot);
  3981 |       alert(grant.reason || "The extra Encounter session could not be created. The Token was not consumed.");
  3982 |       return null;
  3983 |     }
  3984 |     encounterSessionId = grant.session.id;
  3985 |     state.selectedEncounterSessionId = grant.session.id;
  3986 |     state.encounterModalOpen = true;
  3987 |     result = "extra-encounter-created";
  3988 |     details.push(`${extraEncounterValidation.player.name} gained one Encounter Wheel roll.`);
  3989 |     details.push(grant.created ? "Created a one-roll Encounter session." : "Added one roll to the player's open Encounter session.");
```


### function resolveImmediateTokenUse(

Occurrences: 1

#### Hit 1 — line 3907

```text
  3889 |     responseIds: (activity?.responses || []).map((entry) => entry.id),
  3890 |     passOrder: (activity?.responses || []).filter((entry) => entry.type === "pass").map((entry) => entry.playerId),
  3891 |     resolverMode: metadata.resolutionMode,
  3892 |     resolutionResult: result,
  3893 |     stateMutations: mutations,
  3894 |     persistentStateIds,
  3895 |     parentEffectId: response?.respondingToPromptId || "",
  3896 |     childEffectIds: (activity?.responses || []).map((entry) => entry.id),
  3897 |     hostConfirmation,
  3898 |     undoLogId,
  3899 |     undoStatus: "available",
  3900 |     testData: Boolean(state.testingTools?.activeScenario)
  3901 |   };
  3902 |   state.effectAuditRecords ||= [];
  3903 |   state.effectAuditRecords.unshift(record);
  3904 |   return record;
  3905 | }
  3906 | 
  3907 | async function resolveImmediateTokenUse(draft, { context = {} } = {}) {
  3908 |   const metadata = tokenEffectMetadataByName(draft.tokenName);
  3909 |   const timingCheck = tokenUseTimingCheck({ player: draft.actor, tokenName: draft.tokenName, metadata, context });
  3910 |   if (!timingCheck.ok) {
  3911 |     alert(timingCheck.reason);
  3912 |     return null;
  3913 |   }
  3914 |   let extraEncounterValidation = null;
  3915 |   if (metadata.resolverId === "extraEncounter") {
  3916 |     extraEncounterValidation = encounterTokenRuntime.validateExtraEncounter(state, {
  3917 |       playerId: draft.targetPlayerId
  3918 |     }, {
  3919 |       wheelDefinition: encounterWheelDefinition(state.series, state.gym)
  3920 |     });
  3921 |     if (!extraEncounterValidation.ok) {
  3922 |       alert(extraEncounterValidation.reason);
  3923 |       return null;
  3924 |     }
  3925 |   }
```


### metadata.resolverId === "extraEncounter"

Occurrences: 3

#### Hit 1 — line 3915

```text
  3897 |     hostConfirmation,
  3898 |     undoLogId,
  3899 |     undoStatus: "available",
  3900 |     testData: Boolean(state.testingTools?.activeScenario)
  3901 |   };
  3902 |   state.effectAuditRecords ||= [];
  3903 |   state.effectAuditRecords.unshift(record);
  3904 |   return record;
  3905 | }
  3906 | 
  3907 | async function resolveImmediateTokenUse(draft, { context = {} } = {}) {
  3908 |   const metadata = tokenEffectMetadataByName(draft.tokenName);
  3909 |   const timingCheck = tokenUseTimingCheck({ player: draft.actor, tokenName: draft.tokenName, metadata, context });
  3910 |   if (!timingCheck.ok) {
  3911 |     alert(timingCheck.reason);
  3912 |     return null;
  3913 |   }
  3914 |   let extraEncounterValidation = null;
  3915 |   if (metadata.resolverId === "extraEncounter") {
  3916 |     extraEncounterValidation = encounterTokenRuntime.validateExtraEncounter(state, {
  3917 |       playerId: draft.targetPlayerId
  3918 |     }, {
  3919 |       wheelDefinition: encounterWheelDefinition(state.series, state.gym)
  3920 |     });
  3921 |     if (!extraEncounterValidation.ok) {
  3922 |       alert(extraEncounterValidation.reason);
  3923 |       return null;
  3924 |     }
  3925 |   }
  3926 |   if (metadata.id === "substitute") {
  3927 |     const legality = controlTokenDraftLegality(draft, metadata);
  3928 |     if (!legality.ok) {
  3929 |       alert(legality.reason);
  3930 |       return null;
  3931 |     }
  3932 |   }
  3933 |   if (metadata.resolverId === "substituteAttach") {
```


#### Hit 2 — line 3970

```text
  3952 |       metadata,
  3953 |       source: "token-engine-v1"
  3954 |     })
  3955 |     : { token: null, consumption: null };
  3956 |   if (metadata.consumesOnLegalUse && !consumed?.token) {
  3957 |     alert(`${draft.actor.name} does not have ${draft.tokenName}.`);
  3958 |     return null;
  3959 |   }
  3960 |   const consumedToken = consumed?.token || { id: "", name: draft.tokenName };
  3961 |   const now = new Date().toISOString();
  3962 |   const details = [
  3963 |     `Token: ${consumedToken.name || draft.tokenName}`,
  3964 |     `Timing: ${(timingCheck.windows || []).join(", ") || "manual"}`,
  3965 |     `Pattern: ${metadata.activationPattern || "manual"}`
  3966 |   ];
  3967 |   const statusIds = [];
  3968 |   let encounterSessionId = "";
  3969 |   let result = "resolved";
  3970 |   if (metadata.resolverId === "extraEncounter") {
  3971 |     const grant = encounterTokenRuntime.grantExtraEncounter(state, {
  3972 |       playerId: extraEncounterValidation.player.id,
  3973 |       sourceTokenId: consumedToken.id || "",
  3974 |       sourceActivationId: consumedToken.id || ""
  3975 |     }, {
  3976 |       wheelDefinition: extraEncounterValidation.wheel,
  3977 |       now
  3978 |     });
  3979 |     if (!grant.ok || !grant.session) {
  3980 |       restoreTokenEffectContractUndoData(rollbackSnapshot);
  3981 |       alert(grant.reason || "The extra Encounter session could not be created. The Token was not consumed.");
  3982 |       return null;
  3983 |     }
  3984 |     encounterSessionId = grant.session.id;
  3985 |     state.selectedEncounterSessionId = grant.session.id;
  3986 |     state.encounterModalOpen = true;
  3987 |     result = "extra-encounter-created";
  3988 |     details.push(`${extraEncounterValidation.player.name} gained one Encounter Wheel roll.`);
```


#### Hit 3 — line 4108

```text
  4090 |       activationPattern: metadata.activationPattern,
  4091 |       target: targetLabel,
  4092 |       result,
  4093 |       consumed: Boolean(consumed?.token),
  4094 |       blocked: false,
  4095 |       createdEffectId: statusIds[0] || "",
  4096 |       pendingEventId: "",
  4097 |       timestamp: now
  4098 |     },
  4099 |     undoable: true,
  4100 |     undone: false,
  4101 |     undoData: {
  4102 |       actionType: "undoUtilityTokenActivation",
  4103 |       activationId: activation.id,
  4104 |       ...rollbackSnapshot
  4105 |     }
  4106 |   });
  4107 |   resolutionAudit.undoLogId = resolutionLog?.id || "";
  4108 |   const outcomeTitle = metadata.resolverId === "extraEncounter"
  4109 |       ? `Extra Encounter ready for ${extraEncounterValidation?.player?.name || "the chosen player"}.`
  4110 |     : metadata.resolverId === "safeguard"
  4111 |       ? "Safeguard active."
  4112 |       : metadata.resolverId === "substituteAttach"
  4113 |         ? "Substitute attached."
  4114 |         : `${consumedToken.name || draft.tokenName} resolved.`;
  4115 |   const immediateActivity = {
  4116 |     id: activation.id,
  4117 |     title: consumedToken.name || draft.tokenName,
  4118 |     actorPlayerId: draft.actorPlayerId,
  4119 |     targetPlayerId: draft.targetPlayerId || findPokemonRecord(draft.targetPokemonId)?.trainerId || "",
  4120 |     responses: [],
  4121 |     payload: {
  4122 |       tokenName: consumedToken.name || draft.tokenName,
  4123 |       targetPlayerId: draft.targetPlayerId || findPokemonRecord(draft.targetPokemonId)?.trainerId || "",
  4124 |       targetPokemonId: draft.targetPokemonId || "",
  4125 |       targetPokemonName: draft.targetPokemonName || "",
  4126 |       selectedTargetType: draft.selectedTargetType || metadata.selectedTargetType || draft.targetType || "",
```


### extraEncounterValidation

Occurrences: 11

#### Hit 1 — line 3914

```text
  3896 |     childEffectIds: (activity?.responses || []).map((entry) => entry.id),
  3897 |     hostConfirmation,
  3898 |     undoLogId,
  3899 |     undoStatus: "available",
  3900 |     testData: Boolean(state.testingTools?.activeScenario)
  3901 |   };
  3902 |   state.effectAuditRecords ||= [];
  3903 |   state.effectAuditRecords.unshift(record);
  3904 |   return record;
  3905 | }
  3906 | 
  3907 | async function resolveImmediateTokenUse(draft, { context = {} } = {}) {
  3908 |   const metadata = tokenEffectMetadataByName(draft.tokenName);
  3909 |   const timingCheck = tokenUseTimingCheck({ player: draft.actor, tokenName: draft.tokenName, metadata, context });
  3910 |   if (!timingCheck.ok) {
  3911 |     alert(timingCheck.reason);
  3912 |     return null;
  3913 |   }
  3914 |   let extraEncounterValidation = null;
  3915 |   if (metadata.resolverId === "extraEncounter") {
  3916 |     extraEncounterValidation = encounterTokenRuntime.validateExtraEncounter(state, {
  3917 |       playerId: draft.targetPlayerId
  3918 |     }, {
  3919 |       wheelDefinition: encounterWheelDefinition(state.series, state.gym)
  3920 |     });
  3921 |     if (!extraEncounterValidation.ok) {
  3922 |       alert(extraEncounterValidation.reason);
  3923 |       return null;
  3924 |     }
  3925 |   }
  3926 |   if (metadata.id === "substitute") {
  3927 |     const legality = controlTokenDraftLegality(draft, metadata);
  3928 |     if (!legality.ok) {
  3929 |       alert(legality.reason);
  3930 |       return null;
  3931 |     }
  3932 |   }
```


#### Hit 2 — line 3916

```text
  3898 |     undoLogId,
  3899 |     undoStatus: "available",
  3900 |     testData: Boolean(state.testingTools?.activeScenario)
  3901 |   };
  3902 |   state.effectAuditRecords ||= [];
  3903 |   state.effectAuditRecords.unshift(record);
  3904 |   return record;
  3905 | }
  3906 | 
  3907 | async function resolveImmediateTokenUse(draft, { context = {} } = {}) {
  3908 |   const metadata = tokenEffectMetadataByName(draft.tokenName);
  3909 |   const timingCheck = tokenUseTimingCheck({ player: draft.actor, tokenName: draft.tokenName, metadata, context });
  3910 |   if (!timingCheck.ok) {
  3911 |     alert(timingCheck.reason);
  3912 |     return null;
  3913 |   }
  3914 |   let extraEncounterValidation = null;
  3915 |   if (metadata.resolverId === "extraEncounter") {
  3916 |     extraEncounterValidation = encounterTokenRuntime.validateExtraEncounter(state, {
  3917 |       playerId: draft.targetPlayerId
  3918 |     }, {
  3919 |       wheelDefinition: encounterWheelDefinition(state.series, state.gym)
  3920 |     });
  3921 |     if (!extraEncounterValidation.ok) {
  3922 |       alert(extraEncounterValidation.reason);
  3923 |       return null;
  3924 |     }
  3925 |   }
  3926 |   if (metadata.id === "substitute") {
  3927 |     const legality = controlTokenDraftLegality(draft, metadata);
  3928 |     if (!legality.ok) {
  3929 |       alert(legality.reason);
  3930 |       return null;
  3931 |     }
  3932 |   }
  3933 |   if (metadata.resolverId === "substituteAttach") {
  3934 |     const targetPokemon = (state.pokemonRecords || []).find((pokemon) => pokemon.id === draft.targetPokemonId);
```


#### Hit 3 — line 3921

```text
  3903 |   state.effectAuditRecords.unshift(record);
  3904 |   return record;
  3905 | }
  3906 | 
  3907 | async function resolveImmediateTokenUse(draft, { context = {} } = {}) {
  3908 |   const metadata = tokenEffectMetadataByName(draft.tokenName);
  3909 |   const timingCheck = tokenUseTimingCheck({ player: draft.actor, tokenName: draft.tokenName, metadata, context });
  3910 |   if (!timingCheck.ok) {
  3911 |     alert(timingCheck.reason);
  3912 |     return null;
  3913 |   }
  3914 |   let extraEncounterValidation = null;
  3915 |   if (metadata.resolverId === "extraEncounter") {
  3916 |     extraEncounterValidation = encounterTokenRuntime.validateExtraEncounter(state, {
  3917 |       playerId: draft.targetPlayerId
  3918 |     }, {
  3919 |       wheelDefinition: encounterWheelDefinition(state.series, state.gym)
  3920 |     });
  3921 |     if (!extraEncounterValidation.ok) {
  3922 |       alert(extraEncounterValidation.reason);
  3923 |       return null;
  3924 |     }
  3925 |   }
  3926 |   if (metadata.id === "substitute") {
  3927 |     const legality = controlTokenDraftLegality(draft, metadata);
  3928 |     if (!legality.ok) {
  3929 |       alert(legality.reason);
  3930 |       return null;
  3931 |     }
  3932 |   }
  3933 |   if (metadata.resolverId === "substituteAttach") {
  3934 |     const targetPokemon = (state.pokemonRecords || []).find((pokemon) => pokemon.id === draft.targetPokemonId);
  3935 |     if (!targetPokemon || targetPokemon.trainerId !== draft.actorPlayerId || ["Released", "Removed"].includes(targetPokemon.status)) {
  3936 |       alert("Choose a specific Pokemon owned by the acting player for Substitute.");
  3937 |       return null;
  3938 |     }
  3939 |     const activeSubstitute = (state.lingeringStatuses || []).some((status) => status.status === "active"
```


#### Hit 4 — line 3922

```text
  3904 |   return record;
  3905 | }
  3906 | 
  3907 | async function resolveImmediateTokenUse(draft, { context = {} } = {}) {
  3908 |   const metadata = tokenEffectMetadataByName(draft.tokenName);
  3909 |   const timingCheck = tokenUseTimingCheck({ player: draft.actor, tokenName: draft.tokenName, metadata, context });
  3910 |   if (!timingCheck.ok) {
  3911 |     alert(timingCheck.reason);
  3912 |     return null;
  3913 |   }
  3914 |   let extraEncounterValidation = null;
  3915 |   if (metadata.resolverId === "extraEncounter") {
  3916 |     extraEncounterValidation = encounterTokenRuntime.validateExtraEncounter(state, {
  3917 |       playerId: draft.targetPlayerId
  3918 |     }, {
  3919 |       wheelDefinition: encounterWheelDefinition(state.series, state.gym)
  3920 |     });
  3921 |     if (!extraEncounterValidation.ok) {
  3922 |       alert(extraEncounterValidation.reason);
  3923 |       return null;
  3924 |     }
  3925 |   }
  3926 |   if (metadata.id === "substitute") {
  3927 |     const legality = controlTokenDraftLegality(draft, metadata);
  3928 |     if (!legality.ok) {
  3929 |       alert(legality.reason);
  3930 |       return null;
  3931 |     }
  3932 |   }
  3933 |   if (metadata.resolverId === "substituteAttach") {
  3934 |     const targetPokemon = (state.pokemonRecords || []).find((pokemon) => pokemon.id === draft.targetPokemonId);
  3935 |     if (!targetPokemon || targetPokemon.trainerId !== draft.actorPlayerId || ["Released", "Removed"].includes(targetPokemon.status)) {
  3936 |       alert("Choose a specific Pokemon owned by the acting player for Substitute.");
  3937 |       return null;
  3938 |     }
  3939 |     const activeSubstitute = (state.lingeringStatuses || []).some((status) => status.status === "active"
  3940 |       && status.type === "substitute-attached"
```


#### Hit 5 — line 3972

```text
  3954 |     })
  3955 |     : { token: null, consumption: null };
  3956 |   if (metadata.consumesOnLegalUse && !consumed?.token) {
  3957 |     alert(`${draft.actor.name} does not have ${draft.tokenName}.`);
  3958 |     return null;
  3959 |   }
  3960 |   const consumedToken = consumed?.token || { id: "", name: draft.tokenName };
  3961 |   const now = new Date().toISOString();
  3962 |   const details = [
  3963 |     `Token: ${consumedToken.name || draft.tokenName}`,
  3964 |     `Timing: ${(timingCheck.windows || []).join(", ") || "manual"}`,
  3965 |     `Pattern: ${metadata.activationPattern || "manual"}`
  3966 |   ];
  3967 |   const statusIds = [];
  3968 |   let encounterSessionId = "";
  3969 |   let result = "resolved";
  3970 |   if (metadata.resolverId === "extraEncounter") {
  3971 |     const grant = encounterTokenRuntime.grantExtraEncounter(state, {
  3972 |       playerId: extraEncounterValidation.player.id,
  3973 |       sourceTokenId: consumedToken.id || "",
  3974 |       sourceActivationId: consumedToken.id || ""
  3975 |     }, {
  3976 |       wheelDefinition: extraEncounterValidation.wheel,
  3977 |       now
  3978 |     });
  3979 |     if (!grant.ok || !grant.session) {
  3980 |       restoreTokenEffectContractUndoData(rollbackSnapshot);
  3981 |       alert(grant.reason || "The extra Encounter session could not be created. The Token was not consumed.");
  3982 |       return null;
  3983 |     }
  3984 |     encounterSessionId = grant.session.id;
  3985 |     state.selectedEncounterSessionId = grant.session.id;
  3986 |     state.encounterModalOpen = true;
  3987 |     result = "extra-encounter-created";
  3988 |     details.push(`${extraEncounterValidation.player.name} gained one Encounter Wheel roll.`);
  3989 |     details.push(grant.created ? "Created a one-roll Encounter session." : "Added one roll to the player's open Encounter session.");
  3990 |     createPlayerNotification(extraEncounterValidation.player.id, {
```


#### Hit 6 — line 3976

```text
  3958 |     return null;
  3959 |   }
  3960 |   const consumedToken = consumed?.token || { id: "", name: draft.tokenName };
  3961 |   const now = new Date().toISOString();
  3962 |   const details = [
  3963 |     `Token: ${consumedToken.name || draft.tokenName}`,
  3964 |     `Timing: ${(timingCheck.windows || []).join(", ") || "manual"}`,
  3965 |     `Pattern: ${metadata.activationPattern || "manual"}`
  3966 |   ];
  3967 |   const statusIds = [];
  3968 |   let encounterSessionId = "";
  3969 |   let result = "resolved";
  3970 |   if (metadata.resolverId === "extraEncounter") {
  3971 |     const grant = encounterTokenRuntime.grantExtraEncounter(state, {
  3972 |       playerId: extraEncounterValidation.player.id,
  3973 |       sourceTokenId: consumedToken.id || "",
  3974 |       sourceActivationId: consumedToken.id || ""
  3975 |     }, {
  3976 |       wheelDefinition: extraEncounterValidation.wheel,
  3977 |       now
  3978 |     });
  3979 |     if (!grant.ok || !grant.session) {
  3980 |       restoreTokenEffectContractUndoData(rollbackSnapshot);
  3981 |       alert(grant.reason || "The extra Encounter session could not be created. The Token was not consumed.");
  3982 |       return null;
  3983 |     }
  3984 |     encounterSessionId = grant.session.id;
  3985 |     state.selectedEncounterSessionId = grant.session.id;
  3986 |     state.encounterModalOpen = true;
  3987 |     result = "extra-encounter-created";
  3988 |     details.push(`${extraEncounterValidation.player.name} gained one Encounter Wheel roll.`);
  3989 |     details.push(grant.created ? "Created a one-roll Encounter session." : "Added one roll to the player's open Encounter session.");
  3990 |     createPlayerNotification(extraEncounterValidation.player.id, {
  3991 |       type: "token",
  3992 |       title: "Extra Encounter Ready",
  3993 |       message: `${draft.actor.name} used ${consumedToken.name || draft.tokenName}. ${extraEncounterValidation.player.name} may roll one extra encounter now.`,
  3994 |       sourceType: "token-engine-v1",
```


#### Hit 7 — line 3988

```text
  3970 |   if (metadata.resolverId === "extraEncounter") {
  3971 |     const grant = encounterTokenRuntime.grantExtraEncounter(state, {
  3972 |       playerId: extraEncounterValidation.player.id,
  3973 |       sourceTokenId: consumedToken.id || "",
  3974 |       sourceActivationId: consumedToken.id || ""
  3975 |     }, {
  3976 |       wheelDefinition: extraEncounterValidation.wheel,
  3977 |       now
  3978 |     });
  3979 |     if (!grant.ok || !grant.session) {
  3980 |       restoreTokenEffectContractUndoData(rollbackSnapshot);
  3981 |       alert(grant.reason || "The extra Encounter session could not be created. The Token was not consumed.");
  3982 |       return null;
  3983 |     }
  3984 |     encounterSessionId = grant.session.id;
  3985 |     state.selectedEncounterSessionId = grant.session.id;
  3986 |     state.encounterModalOpen = true;
  3987 |     result = "extra-encounter-created";
  3988 |     details.push(`${extraEncounterValidation.player.name} gained one Encounter Wheel roll.`);
  3989 |     details.push(grant.created ? "Created a one-roll Encounter session." : "Added one roll to the player's open Encounter session.");
  3990 |     createPlayerNotification(extraEncounterValidation.player.id, {
  3991 |       type: "token",
  3992 |       title: "Extra Encounter Ready",
  3993 |       message: `${draft.actor.name} used ${consumedToken.name || draft.tokenName}. ${extraEncounterValidation.player.name} may roll one extra encounter now.`,
  3994 |       sourceType: "token-engine-v1",
  3995 |       sourceId: consumedToken.id || metadata.id,
  3996 |       priority: 1,
  3997 |       requiresAction: false,
  3998 |       payload: {
  3999 |         tokenName: consumedToken.name || draft.tokenName,
  4000 |         resolverId: metadata.resolverId,
  4001 |         encounterSessionId,
  4002 |         extraEncounterGrantId: grant.grant.id
  4003 |       }
  4004 |     });
  4005 |   } else if (metadata.resolverId === "safeguard") {
  4006 |     const expires = statusExpiresAt(1);
```


#### Hit 8 — line 3990

```text
  3972 |       playerId: extraEncounterValidation.player.id,
  3973 |       sourceTokenId: consumedToken.id || "",
  3974 |       sourceActivationId: consumedToken.id || ""
  3975 |     }, {
  3976 |       wheelDefinition: extraEncounterValidation.wheel,
  3977 |       now
  3978 |     });
  3979 |     if (!grant.ok || !grant.session) {
  3980 |       restoreTokenEffectContractUndoData(rollbackSnapshot);
  3981 |       alert(grant.reason || "The extra Encounter session could not be created. The Token was not consumed.");
  3982 |       return null;
  3983 |     }
  3984 |     encounterSessionId = grant.session.id;
  3985 |     state.selectedEncounterSessionId = grant.session.id;
  3986 |     state.encounterModalOpen = true;
  3987 |     result = "extra-encounter-created";
  3988 |     details.push(`${extraEncounterValidation.player.name} gained one Encounter Wheel roll.`);
  3989 |     details.push(grant.created ? "Created a one-roll Encounter session." : "Added one roll to the player's open Encounter session.");
  3990 |     createPlayerNotification(extraEncounterValidation.player.id, {
  3991 |       type: "token",
  3992 |       title: "Extra Encounter Ready",
  3993 |       message: `${draft.actor.name} used ${consumedToken.name || draft.tokenName}. ${extraEncounterValidation.player.name} may roll one extra encounter now.`,
  3994 |       sourceType: "token-engine-v1",
  3995 |       sourceId: consumedToken.id || metadata.id,
  3996 |       priority: 1,
  3997 |       requiresAction: false,
  3998 |       payload: {
  3999 |         tokenName: consumedToken.name || draft.tokenName,
  4000 |         resolverId: metadata.resolverId,
  4001 |         encounterSessionId,
  4002 |         extraEncounterGrantId: grant.grant.id
  4003 |       }
  4004 |     });
  4005 |   } else if (metadata.resolverId === "safeguard") {
  4006 |     const expires = statusExpiresAt(1);
  4007 |     const status = applyLingeringEffect({
  4008 |       type: "safeguard",
```


#### Hit 9 — line 3993

```text
  3975 |     }, {
  3976 |       wheelDefinition: extraEncounterValidation.wheel,
  3977 |       now
  3978 |     });
  3979 |     if (!grant.ok || !grant.session) {
  3980 |       restoreTokenEffectContractUndoData(rollbackSnapshot);
  3981 |       alert(grant.reason || "The extra Encounter session could not be created. The Token was not consumed.");
  3982 |       return null;
  3983 |     }
  3984 |     encounterSessionId = grant.session.id;
  3985 |     state.selectedEncounterSessionId = grant.session.id;
  3986 |     state.encounterModalOpen = true;
  3987 |     result = "extra-encounter-created";
  3988 |     details.push(`${extraEncounterValidation.player.name} gained one Encounter Wheel roll.`);
  3989 |     details.push(grant.created ? "Created a one-roll Encounter session." : "Added one roll to the player's open Encounter session.");
  3990 |     createPlayerNotification(extraEncounterValidation.player.id, {
  3991 |       type: "token",
  3992 |       title: "Extra Encounter Ready",
  3993 |       message: `${draft.actor.name} used ${consumedToken.name || draft.tokenName}. ${extraEncounterValidation.player.name} may roll one extra encounter now.`,
  3994 |       sourceType: "token-engine-v1",
  3995 |       sourceId: consumedToken.id || metadata.id,
  3996 |       priority: 1,
  3997 |       requiresAction: false,
  3998 |       payload: {
  3999 |         tokenName: consumedToken.name || draft.tokenName,
  4000 |         resolverId: metadata.resolverId,
  4001 |         encounterSessionId,
  4002 |         extraEncounterGrantId: grant.grant.id
  4003 |       }
  4004 |     });
  4005 |   } else if (metadata.resolverId === "safeguard") {
  4006 |     const expires = statusExpiresAt(1);
  4007 |     const status = applyLingeringEffect({
  4008 |       type: "safeguard",
  4009 |       name: "Safeguard",
  4010 |       category: TOKEN_TIMING_CATEGORIES.PROTECTION,
  4011 |       isCurse: false,
```


#### Hit 10 — line 4109

```text
  4091 |       target: targetLabel,
  4092 |       result,
  4093 |       consumed: Boolean(consumed?.token),
  4094 |       blocked: false,
  4095 |       createdEffectId: statusIds[0] || "",
  4096 |       pendingEventId: "",
  4097 |       timestamp: now
  4098 |     },
  4099 |     undoable: true,
  4100 |     undone: false,
  4101 |     undoData: {
  4102 |       actionType: "undoUtilityTokenActivation",
  4103 |       activationId: activation.id,
  4104 |       ...rollbackSnapshot
  4105 |     }
  4106 |   });
  4107 |   resolutionAudit.undoLogId = resolutionLog?.id || "";
  4108 |   const outcomeTitle = metadata.resolverId === "extraEncounter"
  4109 |       ? `Extra Encounter ready for ${extraEncounterValidation?.player?.name || "the chosen player"}.`
  4110 |     : metadata.resolverId === "safeguard"
  4111 |       ? "Safeguard active."
  4112 |       : metadata.resolverId === "substituteAttach"
  4113 |         ? "Substitute attached."
  4114 |         : `${consumedToken.name || draft.tokenName} resolved.`;
  4115 |   const immediateActivity = {
  4116 |     id: activation.id,
  4117 |     title: consumedToken.name || draft.tokenName,
  4118 |     actorPlayerId: draft.actorPlayerId,
  4119 |     targetPlayerId: draft.targetPlayerId || findPokemonRecord(draft.targetPokemonId)?.trainerId || "",
  4120 |     responses: [],
  4121 |     payload: {
  4122 |       tokenName: consumedToken.name || draft.tokenName,
  4123 |       targetPlayerId: draft.targetPlayerId || findPokemonRecord(draft.targetPokemonId)?.trainerId || "",
  4124 |       targetPokemonId: draft.targetPokemonId || "",
  4125 |       targetPokemonName: draft.targetPokemonName || "",
  4126 |       selectedTargetType: draft.selectedTargetType || metadata.selectedTargetType || draft.targetType || "",
  4127 |       selectedRosterInstanceId: draft.selectedRosterInstanceId || draft.targetPokemonId || "",
```


#### Hit 11 — line 4142

```text
  4124 |       targetPokemonId: draft.targetPokemonId || "",
  4125 |       targetPokemonName: draft.targetPokemonName || "",
  4126 |       selectedTargetType: draft.selectedTargetType || metadata.selectedTargetType || draft.targetType || "",
  4127 |       selectedRosterInstanceId: draft.selectedRosterInstanceId || draft.targetPokemonId || "",
  4128 |       selectedSpeciesId: draft.selectedSpeciesId || draft.speciesId || "",
  4129 |       applicationScope: draft.applicationScope || metadata.applicationScope || ""
  4130 |     }
  4131 |   };
  4132 |   const immediateSummary = tokenResultSummary?.buildResultSummary?.({
  4133 |     state,
  4134 |     activity: immediateActivity,
  4135 |     finalOutcome: result === "manual-required" ? "resolvedNoEffect" : "resolved",
  4136 |     resultData: {
  4137 |       createdStatusIds: statusIds,
  4138 |       affectedRosterInstanceIds: [draft.targetPokemonId].filter(Boolean),
  4139 |       consumedTokenRecords: consumed?.consumption ? [consumed.consumption] : [],
  4140 |       operations: encounterSessionId ? [{
  4141 |         type: "extraEncounterGrant",
  4142 |         targetPlayerId: extraEncounterValidation?.player?.id || "",
  4143 |         encounterSessionId
  4144 |       }] : []
  4145 |     },
  4146 |     continuation: details.slice(-2).join(" ")
  4147 |   });
  4148 |   const immediatePresentation = immediateSummary && tokenResultSummary?.announcementForResult
  4149 |     ? tokenResultSummary.announcementForResult(immediateSummary, state)
  4150 |     : { title: outcomeTitle, detail: details.slice(-2).join(" "), tone: result === "manual-required" ? "manual" : "resolved" };
  4151 |   queueLiveResolutionAnnouncement({
  4152 |     id: `resolution:${activation.id}`,
  4153 |     ...immediatePresentation,
  4154 |     linkedEventId: "",
  4155 |     resultSummary: immediateSummary
  4156 |   });
  4157 |   syncPlayerPokemonLists();
  4158 |   saveState({ immediate: true });
  4159 |   render();
  4160 |   return activation;
```


### encounterWheelDefinitions

Occurrences: 2

#### Hit 1 — line 6123

```text
  6105 |   }
  6106 | });
  6107 | 
  6108 | const hyperspaceWheelDefinitions = Object.freeze({
  6109 |   "hoenn-hyperspace-hole": {
  6110 |     id: "hoenn-hyperspace-hole",
  6111 |     series: "Hoenn",
  6112 |     name: "Hoenn Hyperspace Hole Wheel",
  6113 |     entries: [
  6114 |       "Rayquaza", "Cresselia", "Uxie", "Mesprit", "Azelf", "Landorus", "Thundurus", "Tornadus",
  6115 |       "Tornadus T", "Landorus T", "Thundurus T", "Dialga", "Palkia", "Giratina", "Groudon",
  6116 |       "Kyogre", "Jirachi", "Deoxys", "Deoxys A", "Deoxys S", "Deoxys D", "Kyurem", "Reshiram",
  6117 |       "Zekrom", "Cobalion", "Terrakion", "Virizion", "Regirock", "Regice", "Registeel",
  6118 |       "Regigigas", "Entei", "Raikou", "Suicune", "Latias", "Latios", "Heatran", "Ho-Oh", "Lugia"
  6119 |     ].map((name) => encounterEntry(name))
  6120 |   }
  6121 | });
  6122 | 
  6123 | const encounterWheelDefinitions = Object.freeze({
  6124 |   "kanto-gym-1": makeEncounterWheel("Kanto", 1, ["Pidgey", "Shinx", "Oddish", "Magikarp SF", "Tentacool SF"]),
  6125 |   "hoenn-gym-1": makeEncounterWheel("Hoenn", 1, [
  6126 |     "Chikorita", "Cyndaquil", "Totodile", "Wurmple", "Zigzagoon", "Poochyena", "Lillipup", "Zorua",
  6127 |     "Sewaddle", "Turtwig", "Chimchar", "Piplup", "Snivy", "Oshawott", "Tepig", "Wingull",
  6128 |     "Wailmer SF", "Carvanha SF", "Chatot", "Shellos", "Tentacool SF", "Magikarp SF", "Lotad",
  6129 |     "Seedot", "Ralts", "Surskit", "Gothita", "Tympole", "Marill", "Corphish SF", "Goldeen SF",
  6130 |     "Taillow", "Pidove", "Shroomish", "Slakoth", "Cottonee", "Paras", "Phantump", "Omanyte",
  6131 |     "Kabuto", "Aerodactyl", "Lileep", "Anorith", "Cranidos", "Shieldon", "Tirtouga", "Archen",
  6132 |     "Tyrunt", "Amaura", "Makuhita", "Whismur", "Nincada", "Skitty", "Hyperspace Hole", "Joltik",
  6133 |     "Eevee", "Abra", "Geodude"
  6134 |   ]),
  6135 |   "hoenn-gym-2": makeEncounterWheel("Hoenn", 2, [
  6136 |     "Tentacool SF", "Wingull SF", "Wailmer SF", "Magikarp SF", "Zubat", "Makuhita", "Geodude",
  6137 |     "Abra", "Timburr", "Axew", "Onix", "Aron", "Sableye", "Mawile", "Nosepass", "Electrike",
  6138 |     "Zigzagoon", "Gulpin", "Plusle", "Minun", "Oddish", "Hyperspace Hole", "Voltorb", "Trubbish",
  6139 |     "Chatot", "Shellos", "Magnemite", "Poochyena"
  6140 |   ]),
  6141 |   "hoenn-gym-3": makeEncounterWheel("Hoenn", 3, [
```


#### Hit 2 — line 41277

```text
 41259 |       displayName: metadata.name || key,
 41260 |       types: metadata.types || [],
 41261 |       dex: metadata.dex || "",
 41262 |       form: metadata.form || ""
 41263 |     }))
 41264 |     : Object.entries(pokemonTypePlaceholderMap).map(([name, types]) => ({ pokemonName: name, displayName: name, types }));
 41265 |   return sourceEntries.filter((entry) => (entry.types || []).some((candidate) => String(candidate).toLowerCase() === target));
 41266 | }
 41267 | 
 41268 | function pendingSilphCoSession(playerId = activePlayer().id) {
 41269 |   return (state.silphCoSessions || []).find((session) => session.playerId === playerId && session.status === "pending-choice") || null;
 41270 | }
 41271 | 
 41272 | function encounterWheelKey(series = state.series, gym = state.gym) {
 41273 |   return `${String(series || "").toLowerCase()}-gym-${Number(gym || 1)}`;
 41274 | }
 41275 | 
 41276 | function encounterWheelDefinition(series = state.series, gym = state.gym) {
 41277 |   return encounterWheelDefinitions[encounterWheelKey(series, gym)] || null;
 41278 | }
 41279 | 
 41280 | function pendingEncounterSessions() {
 41281 |   state.encounterSessions ||= [];
 41282 |   return state.encounterSessions.filter((session) => ["pending", "review"].includes(session.status));
 41283 | }
 41284 | 
 41285 | function selectedEncounterSession() {
 41286 |   const pending = pendingEncounterSessions();
 41287 |   if (!pending.length) return null;
 41288 |   let session = pending.find((entry) => entry.id === state.selectedEncounterSessionId);
 41289 |   if (!session) {
 41290 |     session = pending[0];
 41291 |     state.selectedEncounterSessionId = session.id;
 41292 |   }
 41293 |   return session;
 41294 | }
 41295 | 
```


### function encounterWheelDefinition(

Occurrences: 1

#### Hit 1 — line 41276

```text
 41258 |       pokemonName: key,
 41259 |       displayName: metadata.name || key,
 41260 |       types: metadata.types || [],
 41261 |       dex: metadata.dex || "",
 41262 |       form: metadata.form || ""
 41263 |     }))
 41264 |     : Object.entries(pokemonTypePlaceholderMap).map(([name, types]) => ({ pokemonName: name, displayName: name, types }));
 41265 |   return sourceEntries.filter((entry) => (entry.types || []).some((candidate) => String(candidate).toLowerCase() === target));
 41266 | }
 41267 | 
 41268 | function pendingSilphCoSession(playerId = activePlayer().id) {
 41269 |   return (state.silphCoSessions || []).find((session) => session.playerId === playerId && session.status === "pending-choice") || null;
 41270 | }
 41271 | 
 41272 | function encounterWheelKey(series = state.series, gym = state.gym) {
 41273 |   return `${String(series || "").toLowerCase()}-gym-${Number(gym || 1)}`;
 41274 | }
 41275 | 
 41276 | function encounterWheelDefinition(series = state.series, gym = state.gym) {
 41277 |   return encounterWheelDefinitions[encounterWheelKey(series, gym)] || null;
 41278 | }
 41279 | 
 41280 | function pendingEncounterSessions() {
 41281 |   state.encounterSessions ||= [];
 41282 |   return state.encounterSessions.filter((session) => ["pending", "review"].includes(session.status));
 41283 | }
 41284 | 
 41285 | function selectedEncounterSession() {
 41286 |   const pending = pendingEncounterSessions();
 41287 |   if (!pending.length) return null;
 41288 |   let session = pending.find((entry) => entry.id === state.selectedEncounterSessionId);
 41289 |   if (!session) {
 41290 |     session = pending[0];
 41291 |     state.selectedEncounterSessionId = session.id;
 41292 |   }
 41293 |   return session;
 41294 | }
```


### function encounterWheelKey(

Occurrences: 1

#### Hit 1 — line 41272

```text
 41254 |   const target = String(type || "").toLowerCase();
 41255 |   const generatedMap = rivalSagaPokemonTypeData || {};
 41256 |   const sourceEntries = Object.keys(generatedMap).length
 41257 |     ? Object.entries(generatedMap).map(([key, metadata]) => ({
 41258 |       pokemonName: key,
 41259 |       displayName: metadata.name || key,
 41260 |       types: metadata.types || [],
 41261 |       dex: metadata.dex || "",
 41262 |       form: metadata.form || ""
 41263 |     }))
 41264 |     : Object.entries(pokemonTypePlaceholderMap).map(([name, types]) => ({ pokemonName: name, displayName: name, types }));
 41265 |   return sourceEntries.filter((entry) => (entry.types || []).some((candidate) => String(candidate).toLowerCase() === target));
 41266 | }
 41267 | 
 41268 | function pendingSilphCoSession(playerId = activePlayer().id) {
 41269 |   return (state.silphCoSessions || []).find((session) => session.playerId === playerId && session.status === "pending-choice") || null;
 41270 | }
 41271 | 
 41272 | function encounterWheelKey(series = state.series, gym = state.gym) {
 41273 |   return `${String(series || "").toLowerCase()}-gym-${Number(gym || 1)}`;
 41274 | }
 41275 | 
 41276 | function encounterWheelDefinition(series = state.series, gym = state.gym) {
 41277 |   return encounterWheelDefinitions[encounterWheelKey(series, gym)] || null;
 41278 | }
 41279 | 
 41280 | function pendingEncounterSessions() {
 41281 |   state.encounterSessions ||= [];
 41282 |   return state.encounterSessions.filter((session) => ["pending", "review"].includes(session.status));
 41283 | }
 41284 | 
 41285 | function selectedEncounterSession() {
 41286 |   const pending = pendingEncounterSessions();
 41287 |   if (!pending.length) return null;
 41288 |   let session = pending.find((entry) => entry.id === state.selectedEncounterSessionId);
 41289 |   if (!session) {
 41290 |     session = pending[0];
```


### encounterSessions

Occurrences: 30+

#### Hit 1 — line 2552

```text
  2534 |     chronologyCounter: 0,
  2535 |     perkSystem: {
  2536 |       pendingRolls: [],
  2537 |       highestThresholdAwardedByPlayerId: {},
  2538 |       assignments: [],
  2539 |       aTierSafetyTriggered: false,
  2540 |       aTierSafetyTriggeringPlayerId: "",
  2541 |       aTierSafetyEligiblePlayerIds: [],
  2542 |       aTierSafetyCompletedPlayerIds: [],
  2543 |       adminWarnings: []
  2544 |     },
  2545 |     infoBattleTierRoller: {
  2546 |       tierId: "",
  2547 |       result: null
  2548 |     },
  2549 |     selectedWheelSessionId: "",
  2550 |     wheelDrawerOpen: false,
  2551 |     skipWheelAnimation: false,
  2552 |     encounterSessions: [],
  2553 |     selectedEncounterSessionId: "",
  2554 |     encounterModalOpen: false,
  2555 |     randomPokemonSessions: [],
  2556 |     pokemonFamilyTierCache: {},
  2557 |     pokemonSpriteVariants: {},
  2558 |     tokenArtLibrary: {},
  2559 |     selectedRandomPokemonSessionId: "",
  2560 |     randomPokemonDrawerOpen: false,
  2561 |     routeUiState: createDefaultRouteUiState(),
  2562 |     spriteAliases: {},
  2563 |     pokemonTierOverrides: {},
  2564 |     seriesOrder: [],
  2565 |     seriesChoiceRequired: true,
  2566 |     activityLogFilters: {
  2567 |       search: "",
  2568 |       playerId: "all",
  2569 |       phase: "all",
  2570 |       category: "all",
```


#### Hit 2 — line 3814

```text
  3796 |     details,
  3797 |     createdAt: new Date().toISOString()
  3798 |   };
  3799 |   state.tokenActivations ||= [];
  3800 |   state.tokenActivations.unshift(activation);
  3801 |   return activation;
  3802 | }
  3803 | 
  3804 | function tokenUseRollbackSnapshot() {
  3805 |   return {
  3806 |     previousPlayers: structuredClone(state.players || []),
  3807 |     previousPokemonRecords: structuredClone(state.pokemonRecords || []),
  3808 |     previousPokemonLog: structuredClone(state.pokemonLog || []),
  3809 |     previousLingeringStatuses: structuredClone(state.lingeringStatuses || []),
  3810 |     previousTokenActivations: structuredClone(state.tokenActivations || []),
  3811 |     previousTokenConsumptions: structuredClone(state.tokenConsumptions || []),
  3812 |     previousPlayerNotifications: structuredClone(state.playerNotifications || []),
  3813 |     previousWheelSessions: structuredClone(state.wheelSessions || []),
  3814 |     previousEncounterSessions: structuredClone(state.encounterSessions || []),
  3815 |     previousRandomPokemonSessions: structuredClone(state.randomPokemonSessions || []),
  3816 |     previousSelectedEncounterSessionId: state.selectedEncounterSessionId || "",
  3817 |     previousEncounterModalOpen: Boolean(state.encounterModalOpen),
  3818 |     previousInteractionEvents: structuredClone(state.interactionEvents || []),
  3819 |     previousTransactions: structuredClone(state.transactions || []),
  3820 |     previousGlobalPokemonRules: structuredClone(state.globalPokemonRules || {}),
  3821 |     previousBanlistHistory: structuredClone(state.banlistHistory || []),
  3822 |     previousTeambuilder: structuredClone(state.teambuilder || {}),
  3823 |     previousBattleTeams: structuredClone(state.battleTeams || {}),
  3824 |     previousPerkSystem: structuredClone(state.perkSystem || {}),
  3825 |     previousClassStateByPlayerId: structuredClone(state.classStateByPlayerId || {}),
  3826 |     previousPhaseState: structuredClone(state.phaseState || {}),
  3827 |     previousEffectAuditRecords: structuredClone(state.effectAuditRecords || []),
  3828 |     previousEffectOperations: structuredClone(state.effectOperations || []),
  3829 |     previousDelayedEffects: structuredClone(state.delayedEffects || []),
  3830 |     previousBroughtTeamSnapshots: structuredClone(state.broughtTeamSnapshots || []),
  3831 |     previousCopiedActivations: structuredClone(state.copiedActivations || []),
  3832 |     previousPostPayoutProcedures: structuredClone(state.postPayoutProcedures || []),
```


#### Hit 3 — line 4393

```text
  4375 |     actionType: "undoTokenEffectContractCausal",
  4376 |     causalUndoVersion: 1,
  4377 |     effectId: activity.id,
  4378 |     tokenDefinitionId: metadata.id,
  4379 |     inventoryByPlayer: causalPlayerCollectionDeltas(snapshot.previousPlayers, state.players, "inventory"),
  4380 |     playerBalanceDeltas,
  4381 |     moveGrantsByPlayer: causalPlayerCollectionDeltas(snapshot.previousPlayers, state.players, "moveAccessGrants"),
  4382 |     playerPokemonIdDeltas,
  4383 |     pokemonRecords: causalIdCollectionDelta(snapshot.previousPokemonRecords, state.pokemonRecords),
  4384 |     statuses: causalIdCollectionDelta(snapshot.previousLingeringStatuses, state.lingeringStatuses),
  4385 |     activations: causalIdCollectionDelta(snapshot.previousTokenActivations, state.tokenActivations),
  4386 |     consumptions: causalIdCollectionDelta(snapshot.previousTokenConsumptions, state.tokenConsumptions),
  4387 |     transactions: causalIdCollectionDelta(snapshot.previousTransactions, state.transactions),
  4388 |     notifications: causalIdCollectionDelta(snapshot.previousPlayerNotifications, state.playerNotifications),
  4389 |     effectOperations: causalIdCollectionDelta(snapshot.previousEffectOperations, state.effectOperations),
  4390 |     copiedActivations: causalIdCollectionDelta(snapshot.previousCopiedActivations, state.copiedActivations),
  4391 |     copiedTokenRelationships: causalIdCollectionDelta(snapshot.previousCopiedTokenRelationships, state.copiedTokenRelationships),
  4392 |     wheelSessions: causalIdCollectionDelta(snapshot.previousWheelSessions, state.wheelSessions),
  4393 |     encounterSessions: causalIdCollectionDelta(snapshot.previousEncounterSessions, state.encounterSessions),
  4394 |     randomPokemonSessions: causalIdCollectionDelta(snapshot.previousRandomPokemonSessions, state.randomPokemonSessions),
  4395 |     delayedEffects: causalIdCollectionDelta(snapshot.previousDelayedEffects, state.delayedEffects),
  4396 |     broughtTeamSnapshots: causalIdCollectionDelta(snapshot.previousBroughtTeamSnapshots, state.broughtTeamSnapshots),
  4397 |     postPayoutProcedures: causalIdCollectionDelta(snapshot.previousPostPayoutProcedures, state.postPayoutProcedures),
  4398 |     encounterCopyRecords: causalIdCollectionDelta(snapshot.previousEncounterCopyRecords, state.encounterCopyRecords),
  4399 |     teambuilderFields: causalTopLevelFieldDelta(snapshot.previousTeambuilder || {}, state.teambuilder || {}, ["moveAccessGrantsByPlayerId"]),
  4400 |     battleTeamFields: causalTopLevelFieldDelta(snapshot.previousBattleTeams || {}, state.battleTeams || {}),
  4401 |     pokemonDeltas,
  4402 |     pokemonLog: causalIdCollectionDelta(snapshot.previousPokemonLog || [], state.pokemonLog || []),
  4403 |     teambuilderMoveGrants: causalGrantMapDeltas(snapshot.previousTeambuilder?.moveAccessGrantsByPlayerId, state.teambuilder?.moveAccessGrantsByPlayerId),
  4404 |     perkMoveGrants: causalGrantMapDeltas(snapshot.previousPerkSystem?.moveAccessGrantsByPlayerId, state.perkSystem?.moveAccessGrantsByPlayerId),
  4405 |     classMoveGrants: causalGrantMapDeltas(
  4406 |       Object.fromEntries(Object.entries(snapshot.previousClassStateByPlayerId || {}).map(([id, value]) => [id, value?.moveAccessGrants || []])),
  4407 |       Object.fromEntries(Object.entries(state.classStateByPlayerId || {}).map(([id, value]) => [id, value?.moveAccessGrants || []]))
  4408 |     ),
  4409 |     ruleDeltas,
  4410 |     banlistHistory: causalIdCollectionDelta(snapshot.previousBanlistHistory, state.banlistHistory)
  4411 |   };
```


#### Hit 4 — line 4393

```text
  4375 |     actionType: "undoTokenEffectContractCausal",
  4376 |     causalUndoVersion: 1,
  4377 |     effectId: activity.id,
  4378 |     tokenDefinitionId: metadata.id,
  4379 |     inventoryByPlayer: causalPlayerCollectionDeltas(snapshot.previousPlayers, state.players, "inventory"),
  4380 |     playerBalanceDeltas,
  4381 |     moveGrantsByPlayer: causalPlayerCollectionDeltas(snapshot.previousPlayers, state.players, "moveAccessGrants"),
  4382 |     playerPokemonIdDeltas,
  4383 |     pokemonRecords: causalIdCollectionDelta(snapshot.previousPokemonRecords, state.pokemonRecords),
  4384 |     statuses: causalIdCollectionDelta(snapshot.previousLingeringStatuses, state.lingeringStatuses),
  4385 |     activations: causalIdCollectionDelta(snapshot.previousTokenActivations, state.tokenActivations),
  4386 |     consumptions: causalIdCollectionDelta(snapshot.previousTokenConsumptions, state.tokenConsumptions),
  4387 |     transactions: causalIdCollectionDelta(snapshot.previousTransactions, state.transactions),
  4388 |     notifications: causalIdCollectionDelta(snapshot.previousPlayerNotifications, state.playerNotifications),
  4389 |     effectOperations: causalIdCollectionDelta(snapshot.previousEffectOperations, state.effectOperations),
  4390 |     copiedActivations: causalIdCollectionDelta(snapshot.previousCopiedActivations, state.copiedActivations),
  4391 |     copiedTokenRelationships: causalIdCollectionDelta(snapshot.previousCopiedTokenRelationships, state.copiedTokenRelationships),
  4392 |     wheelSessions: causalIdCollectionDelta(snapshot.previousWheelSessions, state.wheelSessions),
  4393 |     encounterSessions: causalIdCollectionDelta(snapshot.previousEncounterSessions, state.encounterSessions),
  4394 |     randomPokemonSessions: causalIdCollectionDelta(snapshot.previousRandomPokemonSessions, state.randomPokemonSessions),
  4395 |     delayedEffects: causalIdCollectionDelta(snapshot.previousDelayedEffects, state.delayedEffects),
  4396 |     broughtTeamSnapshots: causalIdCollectionDelta(snapshot.previousBroughtTeamSnapshots, state.broughtTeamSnapshots),
  4397 |     postPayoutProcedures: causalIdCollectionDelta(snapshot.previousPostPayoutProcedures, state.postPayoutProcedures),
  4398 |     encounterCopyRecords: causalIdCollectionDelta(snapshot.previousEncounterCopyRecords, state.encounterCopyRecords),
  4399 |     teambuilderFields: causalTopLevelFieldDelta(snapshot.previousTeambuilder || {}, state.teambuilder || {}, ["moveAccessGrantsByPlayerId"]),
  4400 |     battleTeamFields: causalTopLevelFieldDelta(snapshot.previousBattleTeams || {}, state.battleTeams || {}),
  4401 |     pokemonDeltas,
  4402 |     pokemonLog: causalIdCollectionDelta(snapshot.previousPokemonLog || [], state.pokemonLog || []),
  4403 |     teambuilderMoveGrants: causalGrantMapDeltas(snapshot.previousTeambuilder?.moveAccessGrantsByPlayerId, state.teambuilder?.moveAccessGrantsByPlayerId),
  4404 |     perkMoveGrants: causalGrantMapDeltas(snapshot.previousPerkSystem?.moveAccessGrantsByPlayerId, state.perkSystem?.moveAccessGrantsByPlayerId),
  4405 |     classMoveGrants: causalGrantMapDeltas(
  4406 |       Object.fromEntries(Object.entries(snapshot.previousClassStateByPlayerId || {}).map(([id, value]) => [id, value?.moveAccessGrants || []])),
  4407 |       Object.fromEntries(Object.entries(state.classStateByPlayerId || {}).map(([id, value]) => [id, value?.moveAccessGrants || []]))
  4408 |     ),
  4409 |     ruleDeltas,
  4410 |     banlistHistory: causalIdCollectionDelta(snapshot.previousBanlistHistory, state.banlistHistory)
  4411 |   };
```


#### Hit 5 — line 4418

```text
  4400 |     battleTeamFields: causalTopLevelFieldDelta(snapshot.previousBattleTeams || {}, state.battleTeams || {}),
  4401 |     pokemonDeltas,
  4402 |     pokemonLog: causalIdCollectionDelta(snapshot.previousPokemonLog || [], state.pokemonLog || []),
  4403 |     teambuilderMoveGrants: causalGrantMapDeltas(snapshot.previousTeambuilder?.moveAccessGrantsByPlayerId, state.teambuilder?.moveAccessGrantsByPlayerId),
  4404 |     perkMoveGrants: causalGrantMapDeltas(snapshot.previousPerkSystem?.moveAccessGrantsByPlayerId, state.perkSystem?.moveAccessGrantsByPlayerId),
  4405 |     classMoveGrants: causalGrantMapDeltas(
  4406 |       Object.fromEntries(Object.entries(snapshot.previousClassStateByPlayerId || {}).map(([id, value]) => [id, value?.moveAccessGrants || []])),
  4407 |       Object.fromEntries(Object.entries(state.classStateByPlayerId || {}).map(([id, value]) => [id, value?.moveAccessGrants || []]))
  4408 |     ),
  4409 |     ruleDeltas,
  4410 |     banlistHistory: causalIdCollectionDelta(snapshot.previousBanlistHistory, state.banlistHistory)
  4411 |   };
  4412 | }
  4413 | 
  4414 | function mergeCausalTokenUndoData(base = {}, later = {}) {
  4415 |   const merged = structuredClone(base || {});
  4416 |   const collectionKeys = [
  4417 |     "pokemonRecords", "statuses", "activations", "consumptions", "transactions", "notifications",
  4418 |     "effectOperations", "copiedActivations", "copiedTokenRelationships", "wheelSessions", "encounterSessions",
  4419 |     "randomPokemonSessions", "delayedEffects", "broughtTeamSnapshots", "postPayoutProcedures",
  4420 |     "encounterCopyRecords", "pokemonLog", "banlistHistory"
  4421 |   ];
  4422 |   collectionKeys.forEach((key) => {
  4423 |     merged[key] = mergeCausalIdCollectionDelta(merged[key], later[key]);
  4424 |   });
  4425 |   const mergePlayerDeltas = (key) => {
  4426 |     const byPlayer = new Map((merged[key] || []).map((entry) => [entry.playerId, structuredClone(entry)]));
  4427 |     (later[key] || []).forEach((entry) => {
  4428 |       if (!byPlayer.has(entry.playerId)) byPlayer.set(entry.playerId, structuredClone(entry));
  4429 |       else byPlayer.get(entry.playerId).delta = mergeCausalIdCollectionDelta(byPlayer.get(entry.playerId).delta, entry.delta);
  4430 |     });
  4431 |     merged[key] = [...byPlayer.values()];
  4432 |   };
  4433 |   ["inventoryByPlayer", "moveGrantsByPlayer", "teambuilderMoveGrants", "perkMoveGrants", "classMoveGrants"].forEach(mergePlayerDeltas);
  4434 |   const pokemonIdsByPlayer = new Map((merged.playerPokemonIdDeltas || []).map((entry) => [entry.playerId, structuredClone(entry)]));
  4435 |   (later.playerPokemonIdDeltas || []).forEach((entry) => {
  4436 |     if (!pokemonIdsByPlayer.has(entry.playerId)) pokemonIdsByPlayer.set(entry.playerId, structuredClone(entry));
```


#### Hit 6 — line 4525

```text
  4507 |   (undoData.moveGrantsByPlayer || []).forEach(({ playerId, delta }) => {
  4508 |     const player = state.players.find((entry) => entry.id === playerId);
  4509 |     if (player) player.moveAccessGrants = applyCausalIdCollectionUndo(player.moveAccessGrants, delta);
  4510 |   });
  4511 |   (undoData.playerPokemonIdDeltas || []).forEach(({ playerId, delta }) => {
  4512 |     const player = state.players.find((entry) => entry.id === playerId);
  4513 |     if (player) player.pokemonIds = applyCausalScalarSetUndo(player.pokemonIds, delta);
  4514 |   });
  4515 |   state.pokemonRecords = applyCausalIdCollectionUndo(state.pokemonRecords, undoData.pokemonRecords);
  4516 |   state.lingeringStatuses = applyCausalIdCollectionUndo(state.lingeringStatuses, undoData.statuses);
  4517 |   state.tokenActivations = applyCausalIdCollectionUndo(state.tokenActivations, undoData.activations);
  4518 |   state.tokenConsumptions = applyCausalIdCollectionUndo(state.tokenConsumptions, undoData.consumptions);
  4519 |   state.transactions = applyCausalIdCollectionUndo(state.transactions, undoData.transactions);
  4520 |   state.playerNotifications = applyCausalIdCollectionUndo(state.playerNotifications, undoData.notifications);
  4521 |   state.effectOperations = applyCausalIdCollectionUndo(state.effectOperations, undoData.effectOperations);
  4522 |   state.copiedActivations = applyCausalIdCollectionUndo(state.copiedActivations, undoData.copiedActivations);
  4523 |   state.copiedTokenRelationships = applyCausalIdCollectionUndo(state.copiedTokenRelationships, undoData.copiedTokenRelationships);
  4524 |   state.wheelSessions = applyCausalIdCollectionUndo(state.wheelSessions, undoData.wheelSessions);
  4525 |   state.encounterSessions = applyCausalIdCollectionUndo(state.encounterSessions, undoData.encounterSessions);
  4526 |   state.randomPokemonSessions = applyCausalIdCollectionUndo(state.randomPokemonSessions, undoData.randomPokemonSessions);
  4527 |   state.delayedEffects = applyCausalIdCollectionUndo(state.delayedEffects, undoData.delayedEffects);
  4528 |   state.broughtTeamSnapshots = applyCausalIdCollectionUndo(state.broughtTeamSnapshots, undoData.broughtTeamSnapshots);
  4529 |   state.postPayoutProcedures = applyCausalIdCollectionUndo(state.postPayoutProcedures, undoData.postPayoutProcedures);
  4530 |   state.encounterCopyRecords = applyCausalIdCollectionUndo(state.encounterCopyRecords, undoData.encounterCopyRecords);
  4531 |   state.teambuilder ||= {};
  4532 |   applyCausalTopLevelFieldUndo(state.teambuilder, undoData.teambuilderFields);
  4533 |   state.battleTeams ||= {};
  4534 |   applyCausalTopLevelFieldUndo(state.battleTeams, undoData.battleTeamFields);
  4535 |   (undoData.pokemonDeltas || []).forEach((delta) => {
  4536 |     const pokemon = state.pokemonRecords.find((entry) => entry.id === delta.pokemonId);
  4537 |     if (!pokemon) return;
  4538 |     pokemon.effectBuffs = applyCausalIdCollectionUndo(pokemon.effectBuffs, delta.effectBuffs);
  4539 |     pokemon.log = applyCausalIdCollectionUndo(pokemon.log, delta.logs);
  4540 |     const removeLabels = new Set(delta.labelsAdded || []);
  4541 |     const previousLabels = delta.previousLabelOrder || [];
  4542 |     const laterLabels = (pokemon.buffs || []).filter((label) => !removeLabels.has(label) && !previousLabels.includes(label));
  4543 |     pokemon.buffs = [...previousLabels, ...laterLabels];
```


#### Hit 7 — line 4525

```text
  4507 |   (undoData.moveGrantsByPlayer || []).forEach(({ playerId, delta }) => {
  4508 |     const player = state.players.find((entry) => entry.id === playerId);
  4509 |     if (player) player.moveAccessGrants = applyCausalIdCollectionUndo(player.moveAccessGrants, delta);
  4510 |   });
  4511 |   (undoData.playerPokemonIdDeltas || []).forEach(({ playerId, delta }) => {
  4512 |     const player = state.players.find((entry) => entry.id === playerId);
  4513 |     if (player) player.pokemonIds = applyCausalScalarSetUndo(player.pokemonIds, delta);
  4514 |   });
  4515 |   state.pokemonRecords = applyCausalIdCollectionUndo(state.pokemonRecords, undoData.pokemonRecords);
  4516 |   state.lingeringStatuses = applyCausalIdCollectionUndo(state.lingeringStatuses, undoData.statuses);
  4517 |   state.tokenActivations = applyCausalIdCollectionUndo(state.tokenActivations, undoData.activations);
  4518 |   state.tokenConsumptions = applyCausalIdCollectionUndo(state.tokenConsumptions, undoData.consumptions);
  4519 |   state.transactions = applyCausalIdCollectionUndo(state.transactions, undoData.transactions);
  4520 |   state.playerNotifications = applyCausalIdCollectionUndo(state.playerNotifications, undoData.notifications);
  4521 |   state.effectOperations = applyCausalIdCollectionUndo(state.effectOperations, undoData.effectOperations);
  4522 |   state.copiedActivations = applyCausalIdCollectionUndo(state.copiedActivations, undoData.copiedActivations);
  4523 |   state.copiedTokenRelationships = applyCausalIdCollectionUndo(state.copiedTokenRelationships, undoData.copiedTokenRelationships);
  4524 |   state.wheelSessions = applyCausalIdCollectionUndo(state.wheelSessions, undoData.wheelSessions);
  4525 |   state.encounterSessions = applyCausalIdCollectionUndo(state.encounterSessions, undoData.encounterSessions);
  4526 |   state.randomPokemonSessions = applyCausalIdCollectionUndo(state.randomPokemonSessions, undoData.randomPokemonSessions);
  4527 |   state.delayedEffects = applyCausalIdCollectionUndo(state.delayedEffects, undoData.delayedEffects);
  4528 |   state.broughtTeamSnapshots = applyCausalIdCollectionUndo(state.broughtTeamSnapshots, undoData.broughtTeamSnapshots);
  4529 |   state.postPayoutProcedures = applyCausalIdCollectionUndo(state.postPayoutProcedures, undoData.postPayoutProcedures);
  4530 |   state.encounterCopyRecords = applyCausalIdCollectionUndo(state.encounterCopyRecords, undoData.encounterCopyRecords);
  4531 |   state.teambuilder ||= {};
  4532 |   applyCausalTopLevelFieldUndo(state.teambuilder, undoData.teambuilderFields);
  4533 |   state.battleTeams ||= {};
  4534 |   applyCausalTopLevelFieldUndo(state.battleTeams, undoData.battleTeamFields);
  4535 |   (undoData.pokemonDeltas || []).forEach((delta) => {
  4536 |     const pokemon = state.pokemonRecords.find((entry) => entry.id === delta.pokemonId);
  4537 |     if (!pokemon) return;
  4538 |     pokemon.effectBuffs = applyCausalIdCollectionUndo(pokemon.effectBuffs, delta.effectBuffs);
  4539 |     pokemon.log = applyCausalIdCollectionUndo(pokemon.log, delta.logs);
  4540 |     const removeLabels = new Set(delta.labelsAdded || []);
  4541 |     const previousLabels = delta.previousLabelOrder || [];
  4542 |     const laterLabels = (pokemon.buffs || []).filter((label) => !removeLabels.has(label) && !previousLabels.includes(label));
  4543 |     pokemon.buffs = [...previousLabels, ...laterLabels];
```


#### Hit 8 — line 4525

```text
  4507 |   (undoData.moveGrantsByPlayer || []).forEach(({ playerId, delta }) => {
  4508 |     const player = state.players.find((entry) => entry.id === playerId);
  4509 |     if (player) player.moveAccessGrants = applyCausalIdCollectionUndo(player.moveAccessGrants, delta);
  4510 |   });
  4511 |   (undoData.playerPokemonIdDeltas || []).forEach(({ playerId, delta }) => {
  4512 |     const player = state.players.find((entry) => entry.id === playerId);
  4513 |     if (player) player.pokemonIds = applyCausalScalarSetUndo(player.pokemonIds, delta);
  4514 |   });
  4515 |   state.pokemonRecords = applyCausalIdCollectionUndo(state.pokemonRecords, undoData.pokemonRecords);
  4516 |   state.lingeringStatuses = applyCausalIdCollectionUndo(state.lingeringStatuses, undoData.statuses);
  4517 |   state.tokenActivations = applyCausalIdCollectionUndo(state.tokenActivations, undoData.activations);
  4518 |   state.tokenConsumptions = applyCausalIdCollectionUndo(state.tokenConsumptions, undoData.consumptions);
  4519 |   state.transactions = applyCausalIdCollectionUndo(state.transactions, undoData.transactions);
  4520 |   state.playerNotifications = applyCausalIdCollectionUndo(state.playerNotifications, undoData.notifications);
  4521 |   state.effectOperations = applyCausalIdCollectionUndo(state.effectOperations, undoData.effectOperations);
  4522 |   state.copiedActivations = applyCausalIdCollectionUndo(state.copiedActivations, undoData.copiedActivations);
  4523 |   state.copiedTokenRelationships = applyCausalIdCollectionUndo(state.copiedTokenRelationships, undoData.copiedTokenRelationships);
  4524 |   state.wheelSessions = applyCausalIdCollectionUndo(state.wheelSessions, undoData.wheelSessions);
  4525 |   state.encounterSessions = applyCausalIdCollectionUndo(state.encounterSessions, undoData.encounterSessions);
  4526 |   state.randomPokemonSessions = applyCausalIdCollectionUndo(state.randomPokemonSessions, undoData.randomPokemonSessions);
  4527 |   state.delayedEffects = applyCausalIdCollectionUndo(state.delayedEffects, undoData.delayedEffects);
  4528 |   state.broughtTeamSnapshots = applyCausalIdCollectionUndo(state.broughtTeamSnapshots, undoData.broughtTeamSnapshots);
  4529 |   state.postPayoutProcedures = applyCausalIdCollectionUndo(state.postPayoutProcedures, undoData.postPayoutProcedures);
  4530 |   state.encounterCopyRecords = applyCausalIdCollectionUndo(state.encounterCopyRecords, undoData.encounterCopyRecords);
  4531 |   state.teambuilder ||= {};
  4532 |   applyCausalTopLevelFieldUndo(state.teambuilder, undoData.teambuilderFields);
  4533 |   state.battleTeams ||= {};
  4534 |   applyCausalTopLevelFieldUndo(state.battleTeams, undoData.battleTeamFields);
  4535 |   (undoData.pokemonDeltas || []).forEach((delta) => {
  4536 |     const pokemon = state.pokemonRecords.find((entry) => entry.id === delta.pokemonId);
  4537 |     if (!pokemon) return;
  4538 |     pokemon.effectBuffs = applyCausalIdCollectionUndo(pokemon.effectBuffs, delta.effectBuffs);
  4539 |     pokemon.log = applyCausalIdCollectionUndo(pokemon.log, delta.logs);
  4540 |     const removeLabels = new Set(delta.labelsAdded || []);
  4541 |     const previousLabels = delta.previousLabelOrder || [];
  4542 |     const laterLabels = (pokemon.buffs || []).filter((label) => !removeLabels.has(label) && !previousLabels.includes(label));
  4543 |     pokemon.buffs = [...previousLabels, ...laterLabels];
```


#### Hit 9 — line 22285

```text
 22267 |   if (nextState.activeWheelSession?.visitId && !nextState.wheelSessions.some((session) => session.id === nextState.activeWheelSession.visitId)) {
 22268 |     nextState.wheelSessions.push({
 22269 |       id: nextState.activeWheelSession.visitId,
 22270 |       wheelId: nextState.activeWheelSession.wheelId,
 22271 |       playerId: nextState.activeWheelSession.playerId,
 22272 |       sourceActionVisitId: nextState.activeWheelSession.visitId,
 22273 |       series: nextState.activeWheelSession.series,
 22274 |       gym: Number(nextState.activeWheelSession.gym),
 22275 |       phase: "action",
 22276 |       status: "pending",
 22277 |       rolls: [],
 22278 |       createdAt: new Date().toISOString()
 22279 |     });
 22280 |   }
 22281 |   nextState.activeWheelSession = null;
 22282 |   nextState.selectedWheelSessionId ||= "";
 22283 |   nextState.wheelDrawerOpen = Boolean(nextState.wheelDrawerOpen);
 22284 |   nextState.skipWheelAnimation = Boolean(nextState.skipWheelAnimation);
 22285 |   nextState.encounterSessions ||= [];
 22286 |   nextState.encounterSessions.forEach((session) => {
 22287 |     session.status = ["pending", "review", "completed", "undone", "cancelled"].includes(session.status) ? session.status : "pending";
 22288 |     session.rolls ||= [];
 22289 |     session.removedEntryIds ||= [];
 22290 |     session.temporaryEntries ||= [];
 22291 |     session.weightOverrides ||= {};
 22292 |     session.weightEditing = Boolean(session.weightEditing);
 22293 |     session.resultSessionIds ||= [];
 22294 |     session.visualRotation = Number(session.visualRotation || 0);
 22295 |     session.isSpinning = false;
 22296 |     session.pendingEntryId = "";
 22297 |   });
 22298 |   nextState.selectedEncounterSessionId ||= "";
 22299 |   nextState.encounterModalOpen = Boolean(nextState.encounterModalOpen);
 22300 |   nextState.randomPokemonSessions ||= [];
 22301 |   nextState.pokemonFamilyTierCache ||= {};
 22302 |   pokemonFamilyTierCache = nextState.pokemonFamilyTierCache;
 22303 |   nextState.pokemonSpriteVariants ||= {};
```


#### Hit 10 — line 22286

```text
 22268 |     nextState.wheelSessions.push({
 22269 |       id: nextState.activeWheelSession.visitId,
 22270 |       wheelId: nextState.activeWheelSession.wheelId,
 22271 |       playerId: nextState.activeWheelSession.playerId,
 22272 |       sourceActionVisitId: nextState.activeWheelSession.visitId,
 22273 |       series: nextState.activeWheelSession.series,
 22274 |       gym: Number(nextState.activeWheelSession.gym),
 22275 |       phase: "action",
 22276 |       status: "pending",
 22277 |       rolls: [],
 22278 |       createdAt: new Date().toISOString()
 22279 |     });
 22280 |   }
 22281 |   nextState.activeWheelSession = null;
 22282 |   nextState.selectedWheelSessionId ||= "";
 22283 |   nextState.wheelDrawerOpen = Boolean(nextState.wheelDrawerOpen);
 22284 |   nextState.skipWheelAnimation = Boolean(nextState.skipWheelAnimation);
 22285 |   nextState.encounterSessions ||= [];
 22286 |   nextState.encounterSessions.forEach((session) => {
 22287 |     session.status = ["pending", "review", "completed", "undone", "cancelled"].includes(session.status) ? session.status : "pending";
 22288 |     session.rolls ||= [];
 22289 |     session.removedEntryIds ||= [];
 22290 |     session.temporaryEntries ||= [];
 22291 |     session.weightOverrides ||= {};
 22292 |     session.weightEditing = Boolean(session.weightEditing);
 22293 |     session.resultSessionIds ||= [];
 22294 |     session.visualRotation = Number(session.visualRotation || 0);
 22295 |     session.isSpinning = false;
 22296 |     session.pendingEntryId = "";
 22297 |   });
 22298 |   nextState.selectedEncounterSessionId ||= "";
 22299 |   nextState.encounterModalOpen = Boolean(nextState.encounterModalOpen);
 22300 |   nextState.randomPokemonSessions ||= [];
 22301 |   nextState.pokemonFamilyTierCache ||= {};
 22302 |   pokemonFamilyTierCache = nextState.pokemonFamilyTierCache;
 22303 |   nextState.pokemonSpriteVariants ||= {};
 22304 |   nextState.selectedRandomPokemonSessionId ||= "";
```


#### Hit 11 — line 34698

```text
 34680 |       id: operation.id || `action-operation-${operation.visitId}`,
 34681 |       visitId: operation.visitId,
 34682 |       playerId: operation.playerId || "",
 34683 |       actionNumber: Math.max(1, Number(operation.actionNumber || 1)),
 34684 |       locationId: operation.locationId || "",
 34685 |       locationName: operation.locationName || "",
 34686 |       serviceId: operation.serviceId || "",
 34687 |       committed: operation.committed !== false,
 34688 |       committedAt: operation.committedAt || operation.createdAt || new Date().toISOString(),
 34689 |       status: ["resolving", "completed", "cancelled"].includes(operation.status) ? operation.status : "resolving",
 34690 |       linkedFeatureType: operation.linkedFeatureType || "",
 34691 |       linkedFeatureSessionId: operation.linkedFeatureSessionId || "",
 34692 |       linkedPendingSituationId: operation.linkedPendingSituationId || "",
 34693 |       completedAt: operation.completedAt || "",
 34694 |       completionReason: operation.completionReason || ""
 34695 |     }));
 34696 |   gymState.actionOperations.forEach((operation) => {
 34697 |     if (operation.status !== "resolving" || operation.linkedFeatureType !== "encounter") return;
 34698 |     const encounterSession = (state.encounterSessions || []).find((session) => session.id === operation.linkedFeatureSessionId);
 34699 |     if (!encounterSessionReadyForAutomaticCompletion(encounterSession)) return;
 34700 |     const completedAt = encounterSession.completedAt || new Date().toISOString();
 34701 |     encounterSession.status = "completed";
 34702 |     encounterSession.completedAt = completedAt;
 34703 |     operation.status = "completed";
 34704 |     operation.completedAt = completedAt;
 34705 |     operation.completionReason = "encounter-results-obtained";
 34706 |     const visit = gymState.playerVisits?.[operation.playerId]?.find((entry) => entry.id === operation.visitId);
 34707 |     if (visit) visit.actionOperationStatus = "completed";
 34708 |     if (gymState.destinationCommit?.operationId === operation.id) {
 34709 |       gymState.destinationCommit.status = provisionalDeclarationRuntime.DESTINATION_STATES.COMPLETED;
 34710 |       gymState.destinationCommit.completedAt = completedAt;
 34711 |     }
 34712 |     actionPhaseStateRepairQueued = true;
 34713 |   });
 34714 |   if (!gymState.actionOperations.some((operation) => operation.id === gymState.activeActionOperationId && operation.status === "resolving")) {
 34715 |     gymState.activeActionOperationId = gymState.actionOperations.find((operation) => operation.status === "resolving")?.id || "";
 34716 |   }
```


#### Hit 12 — line 34874

```text
 34856 |   if (!visits.some((entry) => entry.id === visit.id)) visits.push(visit);
 34857 |   beginActionOperation(visit);
 34858 |   return visit;
 34859 | }
 34860 | 
 34861 | function linkActionOperation(visitId, { featureType = "", featureSessionId = "", pendingSituationId = "" } = {}) {
 34862 |   const operation = actionOperationForVisit(visitId);
 34863 |   if (!operation) return null;
 34864 |   if (featureType) operation.linkedFeatureType = featureType;
 34865 |   if (featureSessionId) operation.linkedFeatureSessionId = featureSessionId;
 34866 |   if (pendingSituationId) operation.linkedPendingSituationId = pendingSituationId;
 34867 |   return operation;
 34868 | }
 34869 | 
 34870 | function linkedActionOperationSession(operation) {
 34871 |   if (!operation?.linkedFeatureSessionId) return null;
 34872 |   const collections = {
 34873 |     wheel: state.wheelSessions,
 34874 |     encounter: state.encounterSessions,
 34875 |     "silph-co": state.silphCoSessions,
 34876 |     "bulletin-board": state.bulletinBoardSessions,
 34877 |     breeder: null,
 34878 |     "game-corner": state.gameCornerSessions,
 34879 |     "pokemon-center": state.pokemonCenterSessions,
 34880 |     graveyard: state.graveyardSessions,
 34881 |     "department-store": state.departmentStoreVisits,
 34882 |     pc: state.pcSessions
 34883 |   };
 34884 |   return (collections[operation.linkedFeatureType] || []).find((session) => session.id === operation.linkedFeatureSessionId) || null;
 34885 | }
 34886 | 
 34887 | function actionOperationBlockReason(operation) {
 34888 |   if (!operation || operation.status !== "resolving") return "";
 34889 |   const pending = typeof getCurrentPendingEvent === "function" ? getCurrentPendingEvent() : null;
 34890 |   if (pending) return "A linked pending effect or response chain is still open.";
 34891 |   if (operation.linkedPendingSituationId) {
 34892 |     const notification = (state.playerNotifications || []).find((entry) => entry.id === operation.linkedPendingSituationId);
```


#### Hit 13 — line 41281

```text
 41263 |     }))
 41264 |     : Object.entries(pokemonTypePlaceholderMap).map(([name, types]) => ({ pokemonName: name, displayName: name, types }));
 41265 |   return sourceEntries.filter((entry) => (entry.types || []).some((candidate) => String(candidate).toLowerCase() === target));
 41266 | }
 41267 | 
 41268 | function pendingSilphCoSession(playerId = activePlayer().id) {
 41269 |   return (state.silphCoSessions || []).find((session) => session.playerId === playerId && session.status === "pending-choice") || null;
 41270 | }
 41271 | 
 41272 | function encounterWheelKey(series = state.series, gym = state.gym) {
 41273 |   return `${String(series || "").toLowerCase()}-gym-${Number(gym || 1)}`;
 41274 | }
 41275 | 
 41276 | function encounterWheelDefinition(series = state.series, gym = state.gym) {
 41277 |   return encounterWheelDefinitions[encounterWheelKey(series, gym)] || null;
 41278 | }
 41279 | 
 41280 | function pendingEncounterSessions() {
 41281 |   state.encounterSessions ||= [];
 41282 |   return state.encounterSessions.filter((session) => ["pending", "review"].includes(session.status));
 41283 | }
 41284 | 
 41285 | function selectedEncounterSession() {
 41286 |   const pending = pendingEncounterSessions();
 41287 |   if (!pending.length) return null;
 41288 |   let session = pending.find((entry) => entry.id === state.selectedEncounterSessionId);
 41289 |   if (!session) {
 41290 |     session = pending[0];
 41291 |     state.selectedEncounterSessionId = session.id;
 41292 |   }
 41293 |   return session;
 41294 | }
 41295 | 
 41296 | function encounterEntriesForSession(session) {
 41297 |   const definition = encounterWheelDefinition(session?.series, session?.gym);
 41298 |   if (!definition) return [];
 41299 |   const includeFishing = Boolean(session.includeFishing);
```


#### Hit 14 — line 41282

```text
 41264 |     : Object.entries(pokemonTypePlaceholderMap).map(([name, types]) => ({ pokemonName: name, displayName: name, types }));
 41265 |   return sourceEntries.filter((entry) => (entry.types || []).some((candidate) => String(candidate).toLowerCase() === target));
 41266 | }
 41267 | 
 41268 | function pendingSilphCoSession(playerId = activePlayer().id) {
 41269 |   return (state.silphCoSessions || []).find((session) => session.playerId === playerId && session.status === "pending-choice") || null;
 41270 | }
 41271 | 
 41272 | function encounterWheelKey(series = state.series, gym = state.gym) {
 41273 |   return `${String(series || "").toLowerCase()}-gym-${Number(gym || 1)}`;
 41274 | }
 41275 | 
 41276 | function encounterWheelDefinition(series = state.series, gym = state.gym) {
 41277 |   return encounterWheelDefinitions[encounterWheelKey(series, gym)] || null;
 41278 | }
 41279 | 
 41280 | function pendingEncounterSessions() {
 41281 |   state.encounterSessions ||= [];
 41282 |   return state.encounterSessions.filter((session) => ["pending", "review"].includes(session.status));
 41283 | }
 41284 | 
 41285 | function selectedEncounterSession() {
 41286 |   const pending = pendingEncounterSessions();
 41287 |   if (!pending.length) return null;
 41288 |   let session = pending.find((entry) => entry.id === state.selectedEncounterSessionId);
 41289 |   if (!session) {
 41290 |     session = pending[0];
 41291 |     state.selectedEncounterSessionId = session.id;
 41292 |   }
 41293 |   return session;
 41294 | }
 41295 | 
 41296 | function encounterEntriesForSession(session) {
 41297 |   const definition = encounterWheelDefinition(session?.series, session?.gym);
 41298 |   if (!definition) return [];
 41299 |   const includeFishing = Boolean(session.includeFishing);
 41300 |   const includeSurf = Boolean(session.includeSurf);
```


#### Hit 15 — line 41510

```text
 41492 | function pendingRerollTargets() {
 41493 |   const targets = [];
 41494 |   (state.randomPokemonSessions || [])
 41495 |     .filter((session) => session.status === "pending" && session.rerollable !== false && !session.interactionLocked)
 41496 |     .forEach((session) => {
 41497 |       const ownerId = session.resultOwnerPlayerId || session.ownerPlayerId || session.playerId;
 41498 |       const owner = state.players.find((player) => player.id === ownerId);
 41499 |       targets.push({
 41500 |         id: `random-pokemon:${session.id}`,
 41501 |         kind: "random-pokemon",
 41502 |         targetResultId: session.id,
 41503 |         ownerPlayerId: ownerId,
 41504 |         ownerName: owner?.name || "Unknown",
 41505 |         sourceLabel: session.sourceLabel || "Pokemon Result",
 41506 |         resultName: session.resultDisplayName || "Pending result",
 41507 |         meta: `${session.series || state.series} Gym ${session.gym || state.gym}`
 41508 |       });
 41509 |     });
 41510 |   (state.encounterSessions || [])
 41511 |     .filter((session) => ["pending", "review"].includes(session.status))
 41512 |     .forEach((session) => {
 41513 |       const owner = state.players.find((player) => player.id === session.playerId);
 41514 |       (session.rolls || [])
 41515 |         .filter((roll) => !roll.rosterPokemonId)
 41516 |         .forEach((roll) => {
 41517 |           targets.push({
 41518 |             id: `encounter-roll:${session.id}:${roll.id}`,
 41519 |             kind: "encounter-roll",
 41520 |             targetResultId: roll.id,
 41521 |             encounterSessionId: session.id,
 41522 |             ownerPlayerId: session.playerId,
 41523 |             ownerName: owner?.name || "Unknown",
 41524 |             sourceLabel: roll.specialEncounter ? "Encounter / Hyperspace" : "Encounter Wheel",
 41525 |             resultName: roll.resultDisplayName || "Pending encounter",
 41526 |             meta: `${session.series || state.series} Gym ${session.gym || state.gym}`
 41527 |           });
 41528 |         });
```


#### Hit 16 — line 41576

```text
 41558 |   if (!targets.length) {
 41559 |     els.rerollTargetList.innerHTML = `<p class="empty-state compact">No pending reroll targets.</p>`;
 41560 |     return;
 41561 |   }
 41562 |   els.rerollTargetList.innerHTML = targets.map((target) => `
 41563 |     <button class="reroll-target-card" type="button" data-reroll-target="${escapeHtml(target.id)}">
 41564 |       <span>${escapeHtml(target.sourceLabel)}</span>
 41565 |       <strong>${escapeHtml(target.resultName)}</strong>
 41566 |       <em>${escapeHtml(target.ownerName)} - ${escapeHtml(target.meta)}</em>
 41567 |     </button>
 41568 |   `).join("");
 41569 | }
 41570 | 
 41571 | async function rerollRandomPokemonResult({ targetResultId, actorPlayerId, mode = "result" }) {
 41572 |   const actor = state.players.find((player) => player.id === actorPlayerId);
 41573 |   if (!actor) return;
 41574 |   if (String(targetResultId || "").startsWith("encounter-roll:")) {
 41575 |     const [, sessionId, rollId] = targetResultId.split(":");
 41576 |     const session = (state.encounterSessions || []).find((entry) => entry.id === sessionId);
 41577 |     const roll = (session?.rolls || []).find((entry) => entry.id === rollId);
 41578 |     const effectiveMode = mode === "result" && roll?.specialEncounter && session?.playerId && session.playerId !== actor.id
 41579 |       ? "encounter"
 41580 |       : mode;
 41581 |     await rerollEncounterRoll(sessionId, rollId, { actorPlayerId: actor.id, mode: effectiveMode });
 41582 |     return;
 41583 |   }
 41584 |   const randomSessionId = String(targetResultId || "").replace(/^random-pokemon:/, "");
 41585 |   await rerollRandomPokemonSession(randomSessionId, { actorPlayerId: actor.id });
 41586 | }
 41587 | 
 41588 | function selectedRandomPokemonSession() {
 41589 |   const pending = pendingRandomPokemonSessions();
 41590 |   if (!pending.length) return null;
 41591 |   let session = pending.find((entry) => entry.id === state.selectedRandomPokemonSessionId);
 41592 |   if (!session) {
 41593 |     session = pending[0];
 41594 |     state.selectedRandomPokemonSessionId = session.id;
```


#### Hit 17 — line 41752

```text
 41734 |     && rolls.every(encounterRollWasObtained);
 41735 | }
 41736 | 
 41737 | function completeObtainedEncounterSession(session, completionReason = "encounter-results-obtained") {
 41738 |   if (!encounterSessionReadyForAutomaticCompletion(session)) return false;
 41739 |   session.status = "completed";
 41740 |   session.completedAt ||= new Date().toISOString();
 41741 |   (session.actionVisitIds || [session.actionVisitId]).filter(Boolean).forEach((visitId) => {
 41742 |     completeActionOperationForVisit(visitId, completionReason, session.series, session.gym);
 41743 |   });
 41744 |   const next = pendingEncounterSessions().find((entry) => entry.id !== session.id);
 41745 |   state.selectedEncounterSessionId = next?.id || "";
 41746 |   state.encounterModalOpen = Boolean(next);
 41747 |   return true;
 41748 | }
 41749 | 
 41750 | async function addEncounterRollToRoster(sessionId, rollId, { skipPendingGuard = false } = {}) {
 41751 |   if (!skipPendingGuard && !guardPendingEventBeforeAction("Accept Encounter Result", () => addEncounterRollToRoster(sessionId, rollId, { skipPendingGuard: true }))) return;
 41752 |   const session = (state.encounterSessions || []).find((entry) => entry.id === sessionId);
 41753 |   const roll = (session?.rolls || []).find((entry) => entry.id === rollId);
 41754 |   if (!session || !roll || roll.rosterPokemonId) return;
 41755 |   const player = state.players.find((entry) => entry.id === session.playerId) || activePlayer();
 41756 |   await hydrateEncounterRollSprite(roll);
 41757 |   await ensurePokemonBuildDataLoaded({ renderOnLoad: false });
 41758 |   const acquisition = resolvePokemonAcquisitionSpecies(roll.resultDisplayName || roll.resultPokemonName);
 41759 |   const receivedSprite = acquisition.receivedSpecies && teambuilderDataKey(acquisition.receivedSpecies) !== teambuilderDataKey(roll.resultDisplayName || roll.resultPokemonName)
 41760 |     ? await fetchStablePokemonSprite(acquisition.receivedSpecies)
 41761 |     : { spriteUrl: roll.resultSprite || "", spriteKey: roll.chosenSpriteKey || "" };
 41762 |   const pokemon = createPokemonRecord(player, roll.resultDisplayName || roll.resultPokemonName, "Encounter Wheel", {
 41763 |     rosterType: "Active",
 41764 |     receivedSpriteUrl: receivedSprite.spriteUrl || "",
 41765 |     receivedSpriteKey: receivedSprite.spriteKey || "",
 41766 |     sourceTier: getPokemonAcquisitionTier(roll.resultDisplayName || roll.resultPokemonName),
 41767 |     acquisitionTier: getPokemonAcquisitionTier(roll.resultDisplayName || roll.resultPokemonName),
 41768 |     gameCornerMetadata: getPokemonGameCornerMetadata(roll.resultDisplayName || roll.resultPokemonName)
 41769 |   });
 41770 |   roll.rosterPokemonId = pokemon.id;
```


#### Hit 18 — line 41794

```text
 41776 |     entry.childEvents ||= [];
 41777 |     entry.childEvents.push({
 41778 |       type: "encounter-caught",
 41779 |       category: "pokemon",
 41780 |       pokemonName: roll.resultDisplayName,
 41781 |       pokemonId: pokemon.id,
 41782 |       encounterRollId: roll.id,
 41783 |       encounterSessionId: session.id,
 41784 |       actionVisitId: session.actionVisitId,
 41785 |       timestamp: roll.addedAt
 41786 |     });
 41787 |   });
 41788 |   completeObtainedEncounterSession(session);
 41789 |   saveState();
 41790 |   render();
 41791 | }
 41792 | 
 41793 | async function rerollEncounterRoll(sessionId, rollId, options = {}) {
 41794 |   const session = (state.encounterSessions || []).find((entry) => entry.id === sessionId);
 41795 |   const roll = (session?.rolls || []).find((entry) => entry.id === rollId);
 41796 |   if (!session || !roll || roll.rosterPokemonId) return;
 41797 |   const player = state.players.find((entry) => entry.id === session.playerId) || activePlayer();
 41798 |   const actor = state.players.find((entry) => entry.id === (options.actorPlayerId || session.playerId)) || player;
 41799 |   if (!requirePrivatePrepAccess(actor, "reroll token")) return;
 41800 |   const rerollMode = options.mode || "result";
 41801 |   const freeRerollReason = actor.id === player.id ? encounterRollFreeRerollReason(player, roll) : "";
 41802 |   const tokenIndex = freeRerollReason ? -1 : playerRerollTokenIndex(actor);
 41803 |   if (!freeRerollReason && tokenIndex < 0) {
 41804 |     alert(`${actor.name} needs a Reroll Token.`);
 41805 |     return;
 41806 |   }
 41807 |   const exactToken = tokenIndex >= 0 ? actor.inventory[tokenIndex] : null;
 41808 |   const sourceEffectId = options.sourceEffectId || (exactToken ? `reroll:${exactToken.id}:${session.id}:${roll.id}` : "");
 41809 |   const duplicateOperation = rerollOperationForSource(sourceEffectId);
 41810 |   if (duplicateOperation) return duplicateOperation;
 41811 |   const shouldStayInSpecialWheel = rerollMode !== "encounter" && roll.specialEncounter?.wheelId;
 41812 |   const entries = shouldStayInSpecialWheel
```


#### Hit 19 — line 42002

```text
 41984 |     : await fetchStablePokemonSprite(receivedSpecies, teambuilderDataKey(receivedSpecies) === teambuilderDataKey(randomSession.resultDisplayName) ? randomSession.chosenSpriteKey : "");
 41985 |   const spriteUrl = sprite.spriteUrl || "";
 41986 |   randomSession.resultSprite = spriteUrl || randomSession.resultSprite || "";
 41987 |   randomSession.chosenSpriteKey = sprite.spriteKey || randomSession.chosenSpriteKey || "";
 41988 |   const pokemon = createPokemonRecord(player, randomSession.resultDisplayName, randomSession.sourceLabel || "Random Pokemon", {
 41989 |     rosterType: "Active",
 41990 |     receivedSpriteUrl: spriteUrl,
 41991 |     receivedSpriteKey: sprite.spriteKey || "",
 41992 |     sourceTier: randomSession.tierId,
 41993 |     acquisitionTier: randomSession.tierId,
 41994 |     gameCornerMetadata: choice
 41995 |   });
 41996 |   randomSession.status = "confirmed";
 41997 |   randomSession.confirmedAt = new Date().toISOString();
 41998 |   randomSession.rosterPokemonId = pokemon.id;
 41999 |   resolvePokemonResultTimingWindow(randomSession, "resolved");
 42000 |   augmentHoneyCausalUndoAfterAcquisition(randomSession, honeyAcquisitionSnapshot);
 42001 |   if (randomSession.sourceType === "encounter") {
 42002 |     const encounterSession = (state.encounterSessions || []).find((entry) => entry.id === randomSession.encounterSessionId);
 42003 |     if (encounterSession) {
 42004 |       const roll = (encounterSession.rolls || []).find((entry) => entry.id === randomSession.encounterRollId);
 42005 |       if (roll) {
 42006 |         roll.confirmedPokemonId = pokemon.id;
 42007 |         roll.confirmedAt = randomSession.confirmedAt;
 42008 |       }
 42009 |       updateEncounterActionLog(encounterSession, player, (entry) => {
 42010 |         appendLogCategory(entry, "pokemon");
 42011 |         appendUniqueLogValue(entry, "pokemonNames", randomSession.resultDisplayName);
 42012 |         appendGroupedLogDetail(entry, `Caught ${randomSession.resultDisplayName}.`);
 42013 |         entry.childEvents ||= [];
 42014 |         entry.childEvents.push({
 42015 |           type: "encounter-caught",
 42016 |           category: "pokemon",
 42017 |           pokemonId: pokemon.id,
 42018 |           pokemonName: randomSession.resultDisplayName,
 42019 |           randomPokemonSessionId: randomSession.id,
 42020 |           encounterSessionId: encounterSession.id,
```


#### Hit 20 — line 42107

```text
 42089 | async function rerollRandomPokemonSession(sessionId = state.selectedRandomPokemonSessionId, options = {}) {
 42090 |   const randomSession = (state.randomPokemonSessions || []).find((entry) => entry.id === sessionId);
 42091 |   if (!randomSession || randomSession.status !== "pending" || randomSession.rerollable === false || randomSession.interactionLocked) return;
 42092 |   const ownerPlayerId = randomSession.resultOwnerPlayerId || randomSession.ownerPlayerId || randomSession.playerId;
 42093 |   const player = state.players.find((entry) => entry.id === ownerPlayerId);
 42094 |   const actor = state.players.find((entry) => entry.id === (options.actorPlayerId || ownerPlayerId));
 42095 |   if (!player || !actor) return;
 42096 |   if (!requirePrivatePrepAccess(actor, "reroll token")) return;
 42097 |   const tokenIndex = playerRerollTokenIndex(actor);
 42098 |   if (tokenIndex < 0) {
 42099 |     alert(`${actor.name} needs a Reroll Token.`);
 42100 |     return;
 42101 |   }
 42102 |   const exactToken = actor.inventory[tokenIndex];
 42103 |   const sourceEffectId = options.sourceEffectId || `reroll:${exactToken.id}:${randomSession.id}`;
 42104 |   const duplicateOperation = rerollOperationForSource(sourceEffectId);
 42105 |   if (duplicateOperation) return duplicateOperation;
 42106 |   const encounterSession = randomSession.sourceType === "encounter"
 42107 |     ? (state.encounterSessions || []).find((entry) => entry.id === randomSession.encounterSessionId)
 42108 |     : null;
 42109 |   const available = encounterSession ? encounterEntriesForSession(encounterSession) : availablePokemonForGameCornerTier(randomSession.tierId);
 42110 |   if (!available.length) {
 42111 |     alert("No Pokemon are available in this result pool.");
 42112 |     return;
 42113 |   }
 42114 |   const causalBeforeReroll = tokenUseRollbackSnapshot();
 42115 |   const rerollToken = actor.inventory.splice(tokenIndex, 1)[0];
 42116 |   const previousResult = {
 42117 |     resultPokemonName: randomSession.resultPokemonName,
 42118 |     resultDisplayName: randomSession.resultDisplayName,
 42119 |     resultSprite: randomSession.resultSprite,
 42120 |     chosenSpriteKey: randomSession.chosenSpriteKey || "",
 42121 |     resultMetadata: structuredClone(randomSession.resultMetadata || {})
 42122 |   };
 42123 |   const currentKey = normalizePokemonName(randomSession.resultPokemonName || randomSession.resultDisplayName);
 42124 |   const next = randomSample(available.filter((entry) => normalizePokemonName(entry.key || entry.pokemonName || entry.displayName) !== currentKey), 1)[0] || randomSample(available, 1)[0];
 42125 |   const nextName = next.displayName || next.pokemonName || next.key;
```


#### Hit 21 — line 42306

```text
 42288 |     session.includeSurf ? "Surf included" : "",
 42289 |     (session.removedEntryIds || []).length ? `Removed ${(session.removedEntryIds || []).length} option${session.removedEntryIds.length === 1 ? "" : "s"}` : ""
 42290 |   ].filter(Boolean);
 42291 |   entry.summary = lines.join("\n");
 42292 |   entry.details = [
 42293 |     `Active pool: ${encounterEntriesForSession(session).map((entry) => entry.displayName || entry.pokemonName).join(", ") || "None"}`,
 42294 |     `Fishing included: ${session.includeFishing ? "Yes" : "No"}`,
 42295 |     `Surf included: ${session.includeSurf ? "Yes" : "No"}`,
 42296 |     ...(session.removedEntryIds || []).map((id) => `Removed: ${id}`),
 42297 |     ...rolls.map((roll, index) => `Roll ${index + 1}: ${roll.resultDisplayName}`)
 42298 |   ];
 42299 |   entry.quantity = rolls.length;
 42300 |   entry.playerIds = [player.id];
 42301 |   entry.encounterSessionId = session.id;
 42302 |   return entry;
 42303 | }
 42304 | 
 42305 | function activeEncounterSessionForPlayer(playerId, series = state.series, gym = state.gym) {
 42306 |   return (state.encounterSessions || []).find((session) => session.playerId === playerId
 42307 |     && session.series === series
 42308 |     && Number(session.gym) === Number(gym)
 42309 |     && ["pending", "review"].includes(session.status));
 42310 | }
 42311 | 
 42312 | function startEncounterSession({ skipConfirmCheck = false } = {}) {
 42313 |   const player = activePlayer();
 42314 |   const location = actionLocationById("encounter");
 42315 |   const definition = encounterWheelDefinition();
 42316 |   if (!definition) {
 42317 |     alert("No Encounter Wheel is defined for this Series/Gym yet.");
 42318 |     return false;
 42319 |   }
 42320 |   if (!skipConfirmCheck) {
 42321 |     const check = actionLocationCanConfirm(location, player.id, 1);
 42322 |     if (!check.ok) {
 42323 |       alert(check.reason);
 42324 |       return false;
```


#### Hit 22 — line 42328

```text
 42310 | }
 42311 | 
 42312 | function startEncounterSession({ skipConfirmCheck = false } = {}) {
 42313 |   const player = activePlayer();
 42314 |   const location = actionLocationById("encounter");
 42315 |   const definition = encounterWheelDefinition();
 42316 |   if (!definition) {
 42317 |     alert("No Encounter Wheel is defined for this Series/Gym yet.");
 42318 |     return false;
 42319 |   }
 42320 |   if (!skipConfirmCheck) {
 42321 |     const check = actionLocationCanConfirm(location, player.id, 1);
 42322 |     if (!check.ok) {
 42323 |       alert(check.reason);
 42324 |       return false;
 42325 |     }
 42326 |   }
 42327 |   const previousVisits = structuredClone(actionVisitsForPlayer(player.id));
 42328 |   const previousEncounterSessions = structuredClone(state.encounterSessions || []);
 42329 |   const previousRandomPokemonSessions = structuredClone(state.randomPokemonSessions || []);
 42330 |   const previousPokemonRecords = structuredClone(state.pokemonRecords || []);
 42331 |   const previousInventory = structuredClone(player.inventory || []);
 42332 |   const previousInteractionEventIds = (state.interactionEvents || []).map((activity) => activity.id).filter(Boolean);
 42333 |   const previousTransactionIds = (state.transactions || []).map((transaction) => transaction.id).filter(Boolean);
 42334 |   const visit = {
 42335 |     id: `action-visit-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
 42336 |     playerId: player.id,
 42337 |     locationId: "encounter",
 42338 |     locationName: "Encounter",
 42339 |     serviceId: "encounter-wheel",
 42340 |     serviceLabel: "Open Encounter Wheel",
 42341 |     actionCost: 1,
 42342 |     series: state.series,
 42343 |     gym: Number(state.gym),
 42344 |     phase: currentPhase(),
 42345 |     createdAt: new Date().toISOString(),
 42346 |     placeholder: false
```


#### Hit 23 — line 42349

```text
 42331 |   const previousInventory = structuredClone(player.inventory || []);
 42332 |   const previousInteractionEventIds = (state.interactionEvents || []).map((activity) => activity.id).filter(Boolean);
 42333 |   const previousTransactionIds = (state.transactions || []).map((transaction) => transaction.id).filter(Boolean);
 42334 |   const visit = {
 42335 |     id: `action-visit-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
 42336 |     playerId: player.id,
 42337 |     locationId: "encounter",
 42338 |     locationName: "Encounter",
 42339 |     serviceId: "encounter-wheel",
 42340 |     serviceLabel: "Open Encounter Wheel",
 42341 |     actionCost: 1,
 42342 |     series: state.series,
 42343 |     gym: Number(state.gym),
 42344 |     phase: currentPhase(),
 42345 |     createdAt: new Date().toISOString(),
 42346 |     placeholder: false
 42347 |   };
 42348 |   commitActionVisit(visit);
 42349 |   state.encounterSessions ||= [];
 42350 |   let session = activeEncounterSessionForPlayer(player.id);
 42351 |   const reusedSession = Boolean(session);
 42352 |   if (session) {
 42353 |     session.actionVisitIds ||= session.actionVisitId ? [session.actionVisitId] : [];
 42354 |     session.actionVisitIds.push(visit.id);
 42355 |     session.maxRolls = Number(session.maxRolls || 0) + Number(definition.rollsPerAction || 2);
 42356 |     if (session.status === "review") session.status = "pending";
 42357 |     session.updatedAt = new Date().toISOString();
 42358 |   } else {
 42359 |     session = {
 42360 |       id: `encounter-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
 42361 |       playerId: player.id,
 42362 |       series: state.series,
 42363 |       gym: Number(state.gym),
 42364 |       phase: "action",
 42365 |       actionVisitId: visit.id,
 42366 |       actionVisitIds: [visit.id],
 42367 |       wheelId: definition.id,
```


#### Hit 24 — line 42380

```text
 42362 |       series: state.series,
 42363 |       gym: Number(state.gym),
 42364 |       phase: "action",
 42365 |       actionVisitId: visit.id,
 42366 |       actionVisitIds: [visit.id],
 42367 |       wheelId: definition.id,
 42368 |       maxRolls: Number(definition.rollsPerAction || 2),
 42369 |       includeFishing: false,
 42370 |       includeSurf: false,
 42371 |       removedEntryIds: [],
 42372 |       temporaryEntries: [],
 42373 |       weightOverrides: {},
 42374 |       resultSessionIds: [],
 42375 |       rolls: [],
 42376 |       status: "pending",
 42377 |       visualRotation: 0,
 42378 |       createdAt: new Date().toISOString()
 42379 |     };
 42380 |     state.encounterSessions.unshift(session);
 42381 |   }
 42382 |   linkActionOperation(visit.id, { featureType: "encounter", featureSessionId: session.id });
 42383 |   state.selectedEncounterSessionId = session.id;
 42384 |   state.encounterModalOpen = true;
 42385 |   addLogEntry({
 42386 |     action: "phase",
 42387 |     category: "action",
 42388 |     player: player.name,
 42389 |     item: `${player.name} took action at Encounter`,
 42390 |     title: `${player.name} took action at Encounter`,
 42391 |     summary: `Spent 1 Action at Encounter\nRolled ${(session.rolls || []).length}/${session.maxRolls || 2} Encounters`,
 42392 |     details: [reusedSession ? "Added 2 more rolls to existing Encounter session" : "Spent 1 Action at Encounter"],
 42393 |     type: "encounter-action",
 42394 |     categories: ["action", "pokemon"],
 42395 |     tags: ["encounter", "wheel"],
 42396 |     subtypes: ["Encounter"],
 42397 |     playerIds: [player.id],
 42398 |     actionVisitId: visit.id,
```


#### Hit 25 — line 46475

```text
 46457 |           <span>${escapeHtml(player?.name || "Unknown Trainer")} - ${escapeHtml(pokemonBattleTierSummary(session.resultDisplayName || session.resultPokemonName, "Unassigned"))}</span>
 46458 |         </div>
 46459 |         <div class="random-pokemon-art">
 46460 |           ${session.resultSprite ? `<img src="${escapeHtml(session.resultSprite)}" alt="${escapeHtml(session.resultDisplayName || "Pokemon")}">` : `<span>${escapeHtml((session.resultDisplayName || "PK").slice(0, 2).toUpperCase())}</span>`}
 46461 |         </div>
 46462 |       </div>
 46463 |       ${session.tokenName ? `<p class="random-pokemon-token">Token pending: ${escapeHtml(session.tokenName)}</p>` : ""}
 46464 |       ${notes.length ? `<ul class="random-pokemon-notes">${notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}</ul>` : `<p class="random-pokemon-notes empty">No extra cost or requirement notes.</p>`}
 46465 |       <div class="random-pokemon-actions">
 46466 |         <button class="buy-button" type="button" data-confirm-random-pokemon="${escapeHtml(session.id)}">Confirm / Add Pokemon</button>
 46467 |         <button class="ghost-button" type="button" data-cancel-random-pokemon="${escapeHtml(session.id)}">Cancel Result</button>
 46468 |         <button class="ghost-button" type="button" data-reroll-random-pokemon="${escapeHtml(session.id)}"${rerollTokenCount ? "" : " disabled"} title="${rerollTokenCount ? `Spend ${player?.name || "the owner"}'s Reroll Token to replace this pending result.` : `${player?.name || "The owner"} needs a Reroll Token.`}">Owner Reroll${rerollTokenCount ? ` (${rerollTokenCount})` : " Token Required"}</button>
 46469 |       </div>
 46470 |     </article>
 46471 |   `;
 46472 | }
 46473 | 
 46474 | async function completeEncounterRoll(sessionId, entryId) {
 46475 |   const session = (state.encounterSessions || []).find((entry) => entry.id === sessionId);
 46476 |   if (!session || session.status !== "pending") return;
 46477 |   session.isSpinning = false;
 46478 |   session.pendingEntryId = "";
 46479 |   const player = state.players.find((entry) => entry.id === session.playerId) || activePlayer();
 46480 |   const entries = encounterEntriesForSession(session);
 46481 |   const visualResult = entries.find((entry) => entry.id === entryId) || weightedEncounterEntry(entries);
 46482 |   const { result, special } = resolveEncounterSpecialResult(visualResult);
 46483 |   if (!result || (session.rolls || []).length >= Number(session.maxRolls || 2)) return;
 46484 |   const roll = {
 46485 |     id: `encounter-roll-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
 46486 |     encounterSessionId: session.id,
 46487 |     actionVisitId: session.actionVisitIds?.[Math.floor((session.rolls || []).length / Number(encounterWheelDefinition(session.series, session.gym)?.rollsPerAction || 2))] || session.actionVisitId,
 46488 |     playerId: player.id,
 46489 |     series: session.series,
 46490 |     gym: Number(session.gym),
 46491 |     entryId: result.id,
 46492 |     visualEntryId: visualResult?.id || result.id,
 46493 |     resultPokemonName: result.pokemonName || result.displayName,
```


#### Hit 26 — line 46531

```text
 46513 |       result: roll.resultDisplayName,
 46514 |       specialEncounter: special,
 46515 |       encounterRollId: roll.id,
 46516 |       encounterSessionId: session.id,
 46517 |       actionVisitId: session.actionVisitId,
 46518 |       timestamp: roll.timestamp
 46519 |     });
 46520 |     if (special) appendGroupedLogDetail(entry, `${special.triggerName} opened ${special.wheelName}: ${special.resultName}.`);
 46521 |   });
 46522 |   if (session.rolls.length >= Number(session.maxRolls || 2)) {
 46523 |     session.status = "review";
 46524 |     session.completedAt = new Date().toISOString();
 46525 |   }
 46526 |   saveState();
 46527 |   render();
 46528 | }
 46529 | 
 46530 | function spinEncounterWheel(sessionId = state.selectedEncounterSessionId) {
 46531 |   const session = (state.encounterSessions || []).find((entry) => entry.id === sessionId);
 46532 |   if (!session || session.status !== "pending" || session.isSpinning) return;
 46533 |   if ((session.rolls || []).length >= Number(session.maxRolls || 2)) return;
 46534 |   const entries = encounterEntriesForSession(session);
 46535 |   if (!entries.length) {
 46536 |     alert("No valid Pokemon are available on this Encounter Wheel. Banned Pokemon are excluded.");
 46537 |     return;
 46538 |   }
 46539 |   const result = weightedEncounterEntry(entries);
 46540 |   if (!result) return;
 46541 |   session.pendingEntryId = result.id;
 46542 |   const nextRotation = nextEncounterLandingRotation(session, entries, result.id);
 46543 |   session.visualRotation = nextRotation;
 46544 |   if (state.skipWheelAnimation) {
 46545 |     completeEncounterRoll(session.id, result.id);
 46546 |     return;
 46547 |   }
 46548 |   session.isSpinning = true;
 46549 |   saveState();
```


#### Hit 27 — line 46576

```text
 46558 |     wheelDisc.getBoundingClientRect();
 46559 |     wheelDisc.style.setProperty("--wheel-rotation", `${Number(nextRotation || 0)}deg`);
 46560 |     animateEncounterLivePointer(els.encounterOverlay, 5200);
 46561 |   } else {
 46562 |     renderEncounterOverlay();
 46563 |   }
 46564 |   if (latestResult) {
 46565 |     latestResult.innerHTML = "<span>Passing</span><strong>Spinning...</strong>";
 46566 |   }
 46567 |   if (rollButton) {
 46568 |     rollButton.disabled = true;
 46569 |     rollButton.textContent = "Spinning...";
 46570 |   }
 46571 |   window.setTimeout(() => completeEncounterRoll(session.id, result.id), 5200);
 46572 | }
 46573 | 
 46574 | function closeEncounterSession(sessionId = state.selectedEncounterSessionId, { skipPendingGuard = false } = {}) {
 46575 |   if (!skipPendingGuard && !guardPendingEventBeforeAction("Close Encounter Session", () => closeEncounterSession(sessionId, { skipPendingGuard: true }))) return;
 46576 |   const session = (state.encounterSessions || []).find((entry) => entry.id === sessionId);
 46577 |   if (!session) return;
 46578 |   const unaddedRolls = (session.rolls || []).filter((roll) => !encounterRollWasObtained(roll));
 46579 |   if (unaddedRolls.length) {
 46580 |     alert("Add every Encounter result to the party before closing this Encounter session.");
 46581 |     state.encounterModalOpen = true;
 46582 |     state.selectedEncounterSessionId = session.id;
 46583 |     saveState();
 46584 |     renderEncounterOverlay();
 46585 |     return;
 46586 |   }
 46587 |   if (session.status === "pending" && (session.rolls || []).length < Number(session.maxRolls || 2)
 46588 |     && !confirm(`Finish this Encounter session with ${(session.rolls || []).length}/${session.maxRolls || 2} rolls used?`)) return;
 46589 |   session.status = "completed";
 46590 |   session.completedAt ||= new Date().toISOString();
 46591 |   (session.actionVisitIds || [session.actionVisitId]).filter(Boolean).forEach((visitId) => {
 46592 |     completeActionOperationForVisit(visitId, "encounter-session-closed");
 46593 |   });
 46594 |   const next = pendingEncounterSessions().find((entry) => entry.id !== session.id);
```


#### Hit 28 — line 48075

```text
 48057 |     baselineState: baseline
 48058 |   });
 48059 |   const origin = {
 48060 |     sessionId: info.id,
 48061 |     scenarioName: info.scenarioName,
 48062 |     committedAt: new Date().toISOString()
 48063 |   };
 48064 |   [
 48065 |     "log",
 48066 |     "effectAuditRecords",
 48067 |     "effectOperations",
 48068 |     "interactionEvents",
 48069 |     "transactions",
 48070 |     "tokenConsumptions",
 48071 |     "tokenActivations",
 48072 |     "playerNotifications",
 48073 |     "lingeringStatuses",
 48074 |     "randomPokemonSessions",
 48075 |     "encounterSessions",
 48076 |     "wheelSessions"
 48077 |   ].forEach((key) => markSandboxCollectionChanges(candidate, baseline, key, origin));
 48078 |   candidate.chronologyCounter = Number(candidate.chronologyCounter || 0) + 1;
 48079 |   candidate.log ||= [];
 48080 |   candidate.log.unshift({
 48081 |     id: `sandbox-commit-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
 48082 |     action: "admin",
 48083 |     category: "admin",
 48084 |     player: "Admin Tools",
 48085 |     item: `Committed Token Sandbox: ${info.scenarioName}`,
 48086 |     title: "Sandbox scenario committed",
 48087 |     summary: `Session ${info.id} entered real history after revision validation.`,
 48088 |     details: [`Entry revision: ${info.entryRevision}`, `Controlled player: ${info.controlledPlayerName || info.controlledPlayerId || "Unknown"}`],
 48089 |     type: "token-scenario-commit",
 48090 |     tags: ["admin", "testing", "token-scenario", "sandbox-origin", info.id],
 48091 |     sandboxOrigin: { ...origin },
 48092 |     eventOrder: candidate.chronologyCounter,
 48093 |     timestamp: new Date().toISOString()
```


#### Hit 29 — line 50095

```text
 50077 |     ? `Are you sure you want to advance to ${next.series} Gym ${next.gym}?`
 50078 |     : "Are you sure you want to advance to the next gym?";
 50079 | }
 50080 | 
 50081 | function phaseAdvanceBlockedByActionOperation(target = nextPhaseTarget()) {
 50082 |   if (!target || target.phase === "chooseStartSeries") return "";
 50083 |   const operation = currentActionOperation();
 50084 |   if (!operation) return "";
 50085 |   const owner = state.players.find((player) => player.id === operation.playerId);
 50086 |   const trainer = owner?.name || "The active trainer";
 50087 |   const location = operation.locationName || actionLocationById(operation.locationId)?.name || "their current Action";
 50088 |   return `${trainer} is still resolving ${location}. Finish or undo that Action before advancing phases.`;
 50089 | }
 50090 | 
 50091 | function honeyEligibleEncounterResults() {
 50092 |   return (state.randomPokemonSessions || []).filter((session) => {
 50093 |     if (session.sourceType !== "encounter" || session.status !== "confirmed") return false;
 50094 |     if (session.copiedFromRandomPokemonSessionId || session.sourceLabel === "Honey copied Encounter") return false;
 50095 |     const parent = (state.encounterSessions || []).find((entry) => entry.id === session.encounterSessionId);
 50096 |     return String(session.series || parent?.series || state.series) === String(state.series)
 50097 |       && Number(session.gym || parent?.gym || state.gym) === Number(state.gym);
 50098 |   });
 50099 | }
 50100 | 
 50101 | function ensureHoneyEndOfActionProcedures() {
 50102 |   state.endOfActionProcedures ||= [];
 50103 |   const eligible = honeyEligibleEncounterResults();
 50104 |   if (!eligible.length) return [];
 50105 |   const created = [];
 50106 |   state.players.forEach((player) => {
 50107 |     (player.inventory || []).forEach((item) => {
 50108 |       const definition = globalThis.rivalSagaTokenEffectContract?.inventoryDefinitionFor?.(item);
 50109 |       if (definition?.id !== "honey-token") return;
 50110 |       const id = `end-action-honey:${state.series}:${state.gym}:${player.id}:${item.id}`;
 50111 |       let procedure = state.endOfActionProcedures.find((entry) => entry.id === id);
 50112 |       if (procedure && ["resolved", "skipped"].includes(procedure.status)) return;
 50113 |       if (!procedure) {
```


#### Hit 30 — line 60736

```text
 60718 |     if (entry.actionVisitId === undoData.visitId || entry.visitId === undoData.visitId) entry.undone = true;
 60719 |     if (randomPokemonSessionIds.has(entry.randomPokemonSessionId)) entry.undone = true;
 60720 |     if (linkedInteractionIds.has(entry.linkedEventId)) entry.undone = true;
 60721 |     if (entry.type === "interaction-resolution" && linkedInteractionTitles.has(String(entry.summary || "").split("\n")[0])) entry.undone = true;
 60722 |   });
 60723 |   return [...sessionIds];
 60724 | }
 60725 | 
 60726 | function restoreGameCornerTokenInventorySnapshot(undoData, player) {
 60727 |   if (!player || !undoData.previousInventory) return;
 60728 |   const previousGcTokens = structuredClone(undoData.previousInventory || []).filter(isGameCornerToken);
 60729 |   const currentNonGcInventory = (player.inventory || []).filter((item) => !isGameCornerToken(item));
 60730 |   player.inventory = [...previousGcTokens, ...currentNonGcInventory];
 60731 | }
 60732 | 
 60733 | function undoEncounterActionVisit(undoData) {
 60734 |   const player = state.players.find((candidate) => candidate.id === undoData.playerId);
 60735 |   if (player && undoData.previousInventory) player.inventory = structuredClone(undoData.previousInventory);
 60736 |   const session = (state.encounterSessions || []).find((entry) => entry.id === undoData.encounterSessionId);
 60737 |   if (!session) {
 60738 |     if (undoData.previousEncounterSessions) state.encounterSessions = structuredClone(undoData.previousEncounterSessions);
 60739 |     if (undoData.previousRandomPokemonSessions) state.randomPokemonSessions = structuredClone(undoData.previousRandomPokemonSessions);
 60740 |     if (undoData.previousPokemonRecords) state.pokemonRecords = structuredClone(undoData.previousPokemonRecords).map(normalizePokemonRecord);
 60741 |     if (undoData.previousInteractionEvents) {
 60742 |       state.interactionEvents = structuredClone(undoData.previousInteractionEvents);
 60743 |     } else if (Array.isArray(undoData.previousInteractionEventIds)) {
 60744 |       const previousIds = new Set(undoData.previousInteractionEventIds);
 60745 |       state.interactionEvents = (state.interactionEvents || []).filter((activity) => previousIds.has(activity.id));
 60746 |     }
 60747 |     if (undoData.previousTransactions) {
 60748 |       state.transactions = structuredClone(undoData.previousTransactions);
 60749 |     } else if (Array.isArray(undoData.previousTransactionIds)) {
 60750 |       const previousIds = new Set(undoData.previousTransactionIds);
 60751 |       state.transactions = (state.transactions || []).filter((transaction) => previousIds.has(transaction.id));
 60752 |     }
 60753 |     syncLinkedTransactions();
 60754 |     syncPlayerPokemonLists();
```


### function activeEncounterSession(

Occurrences: 0

### function renderWheelPanel(

Occurrences: 1

#### Hit 1 — line 46748

```text
 46730 |           `).join("") || `<p class="empty-state compact">No active entries.</p>`}
 46731 |         </div>
 46732 |         ${removedEntries.length ? `
 46733 |           <h3>Removed</h3>
 46734 |           <div class="encounter-entry-list">
 46735 |             ${removedEntries.map((entry) => `
 46736 |               <article class="encounter-entry">
 46737 |                 <div><strong>${escapeHtml(entry.displayName || entry.pokemonName)}</strong><span>${escapeHtml(entry.category || "land")}</span></div>
 46738 |                 <button class="ghost-button mini-button" type="button" data-encounter-restore="${escapeHtml(entry.id)}"${rolls.length ? " disabled" : ""}>Restore</button>
 46739 |               </article>
 46740 |             `).join("")}
 46741 |           </div>
 46742 |         ` : ""}
 46743 |       </section>
 46744 |     </div>
 46745 |   `;
 46746 | }
 46747 | 
 46748 | function renderWheelPanel() {
 46749 |   const active = activeWheelVisit();
 46750 |   const pending = pendingWheelSessions();
 46751 |   if (!pending.length) state.wheelDrawerOpen = false;
 46752 |   els.wheelTab.classList.toggle("hidden", !pending.length);
 46753 |   els.wheelTab.textContent = pending.length ? `Wheel (${pending.length})` : "Wheel";
 46754 |   els.wheelColumn.classList.toggle("drawer-open", Boolean(pending.length && state.wheelDrawerOpen));
 46755 |   els.wheelPanel.classList.toggle("open", Boolean(pending.length && state.wheelDrawerOpen));
 46756 |   els.wheelTab.setAttribute("aria-expanded", String(Boolean(pending.length && state.wheelDrawerOpen)));
 46757 |   if (!pending.length || !active) {
 46758 |     els.wheelSessionList.innerHTML = pending.length
 46759 |       ? pending.map((entry) => {
 46760 |         const entryWheel = wheelDefinitionById(entry.wheelId);
 46761 |         const entryPlayer = state.players.find((candidate) => candidate.id === entry.playerId);
 46762 |         return `
 46763 |           <button type="button" class="wheel-session-card" data-session-id="${escapeHtml(entry.id)}">
 46764 |             <strong>${escapeHtml(entryWheel?.name || entry.wheelId || "Wheel Session")}</strong>
 46765 |             <span>${escapeHtml(entryPlayer?.name || "Unknown")} - ${escapeHtml(entry.sourceLabel || "Pending")}</span>
 46766 |             <em>Needs refresh</em>
```


### function closeWheelPanel(

Occurrences: 1

#### Hit 1 — line 35789

```text
 35771 |     addLogEntry({
 35772 |       action: "wheel",
 35773 |       category: "other",
 35774 |       player: player.name,
 35775 |       item: `${wheel.name} session completed: ${(session.rolls || []).length}/${session.maxRolls} spins used`,
 35776 |       type: "wheel-session-complete",
 35777 |       quantity: (session.rolls || []).length,
 35778 |       price: 0,
 35779 |       balanceAfter: player.balance,
 35780 |       wheelSessionId: session.id,
 35781 |       wheelId: wheel.id,
 35782 |       playerIds: [player.id]
 35783 |     });
 35784 |   }
 35785 |   saveState();
 35786 |   render();
 35787 | }
 35788 | 
 35789 | function closeWheelPanel() {
 35790 |   state.wheelDrawerOpen = false;
 35791 |   saveState();
 35792 |   renderWheelPanel();
 35793 | }
 35794 | 
 35795 | function actionStatusLabel(playerId) {
 35796 |   return `${actionUsedByPlayer(playerId)}/${actionPhaseRules.actionsPerPlayer}`;
 35797 | }
 35798 | 
 35799 | function actionLocationIcon(location) {
 35800 |   const icons = {
 35801 |     pokemon: "PK",
 35802 |     shop: "$",
 35803 |     utility: "RC",
 35804 |     tokens: "TK",
 35805 |     recovery: "+",
 35806 |     quests: "BB"
 35807 |   };
```


### encounterOverlay

Occurrences: 13

#### Hit 1 — line 18822

```text
 18804 |   wheelColumn: document.querySelector("#wheelColumn"),
 18805 |   wheelTab: document.querySelector("#wheelTab"),
 18806 |   wheelPanel: document.querySelector("#wheelPanel"),
 18807 |   wheelSessionList: document.querySelector("#wheelSessionList"),
 18808 |   wheelSessionDetail: document.querySelector("#wheelSessionDetail"),
 18809 |   wheelName: document.querySelector("#wheelName"),
 18810 |   wheelRollStatus: document.querySelector("#wheelRollStatus"),
 18811 |   wheelDescription: document.querySelector("#wheelDescription"),
 18812 |   wheelMeta: document.querySelector("#wheelMeta"),
 18813 |   wheelVisual: document.querySelector("#wheelVisual"),
 18814 |   wheelOutcomes: document.querySelector("#wheelOutcomes"),
 18815 |   wheelLatestResult: document.querySelector("#wheelLatestResult"),
 18816 |   spinWheel: document.querySelector("#spinWheel"),
 18817 |   finishWheelSession: document.querySelector("#finishWheelSession"),
 18818 |   skipWheelAnimation: document.querySelector("#skipWheelAnimation"),
 18819 |   closeWheelPanel: document.querySelector("#closeWheelPanel"),
 18820 |   wheelHistory: document.querySelector("#wheelHistory"),
 18821 |   encounterTab: document.querySelector("#encounterTab"),
 18822 |   encounterOverlay: document.querySelector("#encounterOverlay"),
 18823 |   closeEncounterOverlay: document.querySelector("#closeEncounterOverlay"),
 18824 |   encounterSessionList: document.querySelector("#encounterSessionList"),
 18825 |   encounterTitle: document.querySelector("#encounterTitle"),
 18826 |   encounterBody: document.querySelector("#encounterBody"),
 18827 |   randomPokemonColumn: document.querySelector("#randomPokemonColumn"),
 18828 |   randomPokemonTab: document.querySelector("#randomPokemonTab"),
 18829 |   randomPokemonPanel: document.querySelector("#randomPokemonPanel"),
 18830 |   closeRandomPokemonPanel: document.querySelector("#closeRandomPokemonPanel"),
 18831 |   randomPokemonSessionList: document.querySelector("#randomPokemonSessionList"),
 18832 |   randomPokemonSessionDetail: document.querySelector("#randomPokemonSessionDetail"),
 18833 |   rerollTargetModal: document.querySelector("#rerollTargetModal"),
 18834 |   closeRerollTargetModal: document.querySelector("#closeRerollTargetModal"),
 18835 |   rerollTargetIntro: document.querySelector("#rerollTargetIntro"),
 18836 |   rerollTargetList: document.querySelector("#rerollTargetList"),
 18837 |   leaderboardView: document.querySelector("#leaderboardView"),
 18838 |   mvpRaceView: document.querySelector("#mvpRaceView"),
 18839 |   battlePhaseView: document.querySelector("#battlePhaseView"),
 18840 |   banlistView: document.querySelector("#banlistView"),
```


#### Hit 2 — line 18822

```text
 18804 |   wheelColumn: document.querySelector("#wheelColumn"),
 18805 |   wheelTab: document.querySelector("#wheelTab"),
 18806 |   wheelPanel: document.querySelector("#wheelPanel"),
 18807 |   wheelSessionList: document.querySelector("#wheelSessionList"),
 18808 |   wheelSessionDetail: document.querySelector("#wheelSessionDetail"),
 18809 |   wheelName: document.querySelector("#wheelName"),
 18810 |   wheelRollStatus: document.querySelector("#wheelRollStatus"),
 18811 |   wheelDescription: document.querySelector("#wheelDescription"),
 18812 |   wheelMeta: document.querySelector("#wheelMeta"),
 18813 |   wheelVisual: document.querySelector("#wheelVisual"),
 18814 |   wheelOutcomes: document.querySelector("#wheelOutcomes"),
 18815 |   wheelLatestResult: document.querySelector("#wheelLatestResult"),
 18816 |   spinWheel: document.querySelector("#spinWheel"),
 18817 |   finishWheelSession: document.querySelector("#finishWheelSession"),
 18818 |   skipWheelAnimation: document.querySelector("#skipWheelAnimation"),
 18819 |   closeWheelPanel: document.querySelector("#closeWheelPanel"),
 18820 |   wheelHistory: document.querySelector("#wheelHistory"),
 18821 |   encounterTab: document.querySelector("#encounterTab"),
 18822 |   encounterOverlay: document.querySelector("#encounterOverlay"),
 18823 |   closeEncounterOverlay: document.querySelector("#closeEncounterOverlay"),
 18824 |   encounterSessionList: document.querySelector("#encounterSessionList"),
 18825 |   encounterTitle: document.querySelector("#encounterTitle"),
 18826 |   encounterBody: document.querySelector("#encounterBody"),
 18827 |   randomPokemonColumn: document.querySelector("#randomPokemonColumn"),
 18828 |   randomPokemonTab: document.querySelector("#randomPokemonTab"),
 18829 |   randomPokemonPanel: document.querySelector("#randomPokemonPanel"),
 18830 |   closeRandomPokemonPanel: document.querySelector("#closeRandomPokemonPanel"),
 18831 |   randomPokemonSessionList: document.querySelector("#randomPokemonSessionList"),
 18832 |   randomPokemonSessionDetail: document.querySelector("#randomPokemonSessionDetail"),
 18833 |   rerollTargetModal: document.querySelector("#rerollTargetModal"),
 18834 |   closeRerollTargetModal: document.querySelector("#closeRerollTargetModal"),
 18835 |   rerollTargetIntro: document.querySelector("#rerollTargetIntro"),
 18836 |   rerollTargetList: document.querySelector("#rerollTargetList"),
 18837 |   leaderboardView: document.querySelector("#leaderboardView"),
 18838 |   mvpRaceView: document.querySelector("#mvpRaceView"),
 18839 |   battlePhaseView: document.querySelector("#battlePhaseView"),
 18840 |   banlistView: document.querySelector("#banlistView"),
```


#### Hit 3 — line 41367

```text
 41349 | }
 41350 | 
 41351 | function getEncounterSegmentAtPointer(rotationAngle, segments) {
 41352 |   if (!segments?.length) return null;
 41353 |   const angleUnderPointer = normalizeAngle(ENCOUNTER_POINTER_ANGLE_DEGREES - rotationAngle);
 41354 |   return segments.find((segment, index) => {
 41355 |     const end = index === segments.length - 1 ? 360.000001 : segment.endAngle;
 41356 |     return angleUnderPointer >= segment.startAngle && angleUnderPointer < end;
 41357 |   }) || segments[segments.length - 1];
 41358 | }
 41359 | 
 41360 | function rotationFromTransform(transform) {
 41361 |   if (!transform || transform === "none") return 0;
 41362 |   const values = transform.match(/matrix\(([^)]+)\)/)?.[1]?.split(",").map((value) => Number(value.trim()));
 41363 |   if (!values || values.length < 2) return 0;
 41364 |   return Math.atan2(values[1], values[0]) * (180 / Math.PI);
 41365 | }
 41366 | 
 41367 | function updateEncounterLivePointerDisplay({ root = els.encounterOverlay, status = "Passing", finalName = "", finalMeta = "" } = {}) {
 41368 |   const display = root?.querySelector("[data-encounter-live-display]");
 41369 |   const wheelDisc = root?.querySelector(".encounter-wheel-visual .wheel-disc");
 41370 |   if (!display) return null;
 41371 |   const segments = JSON.parse(display.dataset.segments || "[]");
 41372 |   let segment = null;
 41373 |   if (finalName) {
 41374 |     segment = segments.find((entry) => entry.entryId === display.dataset.finalEntryId) || null;
 41375 |   } else {
 41376 |     if (!wheelDisc) return null;
 41377 |     segment = getEncounterSegmentAtPointer(rotationFromTransform(getComputedStyle(wheelDisc).transform), segments);
 41378 |   }
 41379 |   const name = finalName || segment?.displayName || "Ready";
 41380 |   const meta = finalMeta || (segment ? `${segment.category || "land"} / W${segment.weight || 1}` : "");
 41381 |   display.innerHTML = `
 41382 |     <span>${escapeHtml(status)}</span>
 41383 |     <strong>${escapeHtml(name)}</strong>
 41384 |     ${meta ? `<em>${escapeHtml(meta)}</em>` : ""}
 41385 |   `;
```


#### Hit 4 — line 46550

```text
 46532 |   if (!session || session.status !== "pending" || session.isSpinning) return;
 46533 |   if ((session.rolls || []).length >= Number(session.maxRolls || 2)) return;
 46534 |   const entries = encounterEntriesForSession(session);
 46535 |   if (!entries.length) {
 46536 |     alert("No valid Pokemon are available on this Encounter Wheel. Banned Pokemon are excluded.");
 46537 |     return;
 46538 |   }
 46539 |   const result = weightedEncounterEntry(entries);
 46540 |   if (!result) return;
 46541 |   session.pendingEntryId = result.id;
 46542 |   const nextRotation = nextEncounterLandingRotation(session, entries, result.id);
 46543 |   session.visualRotation = nextRotation;
 46544 |   if (state.skipWheelAnimation) {
 46545 |     completeEncounterRoll(session.id, result.id);
 46546 |     return;
 46547 |   }
 46548 |   session.isSpinning = true;
 46549 |   saveState();
 46550 |   const wheelVisual = els.encounterOverlay?.querySelector(".encounter-wheel-visual");
 46551 |   const wheelDisc = wheelVisual?.querySelector(".wheel-disc");
 46552 |   const latestResult = els.encounterOverlay?.querySelector(".wheel-latest-result");
 46553 |   const rollButton = els.encounterOverlay?.querySelector(`[data-encounter-roll="${session.id}"]`);
 46554 |   const liveDisplay = els.encounterOverlay?.querySelector("[data-encounter-live-display]");
 46555 |   if (liveDisplay) liveDisplay.dataset.finalEntryId = result.id;
 46556 |   if (wheelVisual && wheelDisc) {
 46557 |     wheelVisual.classList.add("spinning");
 46558 |     wheelDisc.getBoundingClientRect();
 46559 |     wheelDisc.style.setProperty("--wheel-rotation", `${Number(nextRotation || 0)}deg`);
 46560 |     animateEncounterLivePointer(els.encounterOverlay, 5200);
 46561 |   } else {
 46562 |     renderEncounterOverlay();
 46563 |   }
 46564 |   if (latestResult) {
 46565 |     latestResult.innerHTML = "<span>Passing</span><strong>Spinning...</strong>";
 46566 |   }
 46567 |   if (rollButton) {
 46568 |     rollButton.disabled = true;
```


#### Hit 5 — line 46552

```text
 46534 |   const entries = encounterEntriesForSession(session);
 46535 |   if (!entries.length) {
 46536 |     alert("No valid Pokemon are available on this Encounter Wheel. Banned Pokemon are excluded.");
 46537 |     return;
 46538 |   }
 46539 |   const result = weightedEncounterEntry(entries);
 46540 |   if (!result) return;
 46541 |   session.pendingEntryId = result.id;
 46542 |   const nextRotation = nextEncounterLandingRotation(session, entries, result.id);
 46543 |   session.visualRotation = nextRotation;
 46544 |   if (state.skipWheelAnimation) {
 46545 |     completeEncounterRoll(session.id, result.id);
 46546 |     return;
 46547 |   }
 46548 |   session.isSpinning = true;
 46549 |   saveState();
 46550 |   const wheelVisual = els.encounterOverlay?.querySelector(".encounter-wheel-visual");
 46551 |   const wheelDisc = wheelVisual?.querySelector(".wheel-disc");
 46552 |   const latestResult = els.encounterOverlay?.querySelector(".wheel-latest-result");
 46553 |   const rollButton = els.encounterOverlay?.querySelector(`[data-encounter-roll="${session.id}"]`);
 46554 |   const liveDisplay = els.encounterOverlay?.querySelector("[data-encounter-live-display]");
 46555 |   if (liveDisplay) liveDisplay.dataset.finalEntryId = result.id;
 46556 |   if (wheelVisual && wheelDisc) {
 46557 |     wheelVisual.classList.add("spinning");
 46558 |     wheelDisc.getBoundingClientRect();
 46559 |     wheelDisc.style.setProperty("--wheel-rotation", `${Number(nextRotation || 0)}deg`);
 46560 |     animateEncounterLivePointer(els.encounterOverlay, 5200);
 46561 |   } else {
 46562 |     renderEncounterOverlay();
 46563 |   }
 46564 |   if (latestResult) {
 46565 |     latestResult.innerHTML = "<span>Passing</span><strong>Spinning...</strong>";
 46566 |   }
 46567 |   if (rollButton) {
 46568 |     rollButton.disabled = true;
 46569 |     rollButton.textContent = "Spinning...";
 46570 |   }
```


#### Hit 6 — line 46553

```text
 46535 |   if (!entries.length) {
 46536 |     alert("No valid Pokemon are available on this Encounter Wheel. Banned Pokemon are excluded.");
 46537 |     return;
 46538 |   }
 46539 |   const result = weightedEncounterEntry(entries);
 46540 |   if (!result) return;
 46541 |   session.pendingEntryId = result.id;
 46542 |   const nextRotation = nextEncounterLandingRotation(session, entries, result.id);
 46543 |   session.visualRotation = nextRotation;
 46544 |   if (state.skipWheelAnimation) {
 46545 |     completeEncounterRoll(session.id, result.id);
 46546 |     return;
 46547 |   }
 46548 |   session.isSpinning = true;
 46549 |   saveState();
 46550 |   const wheelVisual = els.encounterOverlay?.querySelector(".encounter-wheel-visual");
 46551 |   const wheelDisc = wheelVisual?.querySelector(".wheel-disc");
 46552 |   const latestResult = els.encounterOverlay?.querySelector(".wheel-latest-result");
 46553 |   const rollButton = els.encounterOverlay?.querySelector(`[data-encounter-roll="${session.id}"]`);
 46554 |   const liveDisplay = els.encounterOverlay?.querySelector("[data-encounter-live-display]");
 46555 |   if (liveDisplay) liveDisplay.dataset.finalEntryId = result.id;
 46556 |   if (wheelVisual && wheelDisc) {
 46557 |     wheelVisual.classList.add("spinning");
 46558 |     wheelDisc.getBoundingClientRect();
 46559 |     wheelDisc.style.setProperty("--wheel-rotation", `${Number(nextRotation || 0)}deg`);
 46560 |     animateEncounterLivePointer(els.encounterOverlay, 5200);
 46561 |   } else {
 46562 |     renderEncounterOverlay();
 46563 |   }
 46564 |   if (latestResult) {
 46565 |     latestResult.innerHTML = "<span>Passing</span><strong>Spinning...</strong>";
 46566 |   }
 46567 |   if (rollButton) {
 46568 |     rollButton.disabled = true;
 46569 |     rollButton.textContent = "Spinning...";
 46570 |   }
 46571 |   window.setTimeout(() => completeEncounterRoll(session.id, result.id), 5200);
```


#### Hit 7 — line 46554

```text
 46536 |     alert("No valid Pokemon are available on this Encounter Wheel. Banned Pokemon are excluded.");
 46537 |     return;
 46538 |   }
 46539 |   const result = weightedEncounterEntry(entries);
 46540 |   if (!result) return;
 46541 |   session.pendingEntryId = result.id;
 46542 |   const nextRotation = nextEncounterLandingRotation(session, entries, result.id);
 46543 |   session.visualRotation = nextRotation;
 46544 |   if (state.skipWheelAnimation) {
 46545 |     completeEncounterRoll(session.id, result.id);
 46546 |     return;
 46547 |   }
 46548 |   session.isSpinning = true;
 46549 |   saveState();
 46550 |   const wheelVisual = els.encounterOverlay?.querySelector(".encounter-wheel-visual");
 46551 |   const wheelDisc = wheelVisual?.querySelector(".wheel-disc");
 46552 |   const latestResult = els.encounterOverlay?.querySelector(".wheel-latest-result");
 46553 |   const rollButton = els.encounterOverlay?.querySelector(`[data-encounter-roll="${session.id}"]`);
 46554 |   const liveDisplay = els.encounterOverlay?.querySelector("[data-encounter-live-display]");
 46555 |   if (liveDisplay) liveDisplay.dataset.finalEntryId = result.id;
 46556 |   if (wheelVisual && wheelDisc) {
 46557 |     wheelVisual.classList.add("spinning");
 46558 |     wheelDisc.getBoundingClientRect();
 46559 |     wheelDisc.style.setProperty("--wheel-rotation", `${Number(nextRotation || 0)}deg`);
 46560 |     animateEncounterLivePointer(els.encounterOverlay, 5200);
 46561 |   } else {
 46562 |     renderEncounterOverlay();
 46563 |   }
 46564 |   if (latestResult) {
 46565 |     latestResult.innerHTML = "<span>Passing</span><strong>Spinning...</strong>";
 46566 |   }
 46567 |   if (rollButton) {
 46568 |     rollButton.disabled = true;
 46569 |     rollButton.textContent = "Spinning...";
 46570 |   }
 46571 |   window.setTimeout(() => completeEncounterRoll(session.id, result.id), 5200);
 46572 | }
```


#### Hit 8 — line 46560

```text
 46542 |   const nextRotation = nextEncounterLandingRotation(session, entries, result.id);
 46543 |   session.visualRotation = nextRotation;
 46544 |   if (state.skipWheelAnimation) {
 46545 |     completeEncounterRoll(session.id, result.id);
 46546 |     return;
 46547 |   }
 46548 |   session.isSpinning = true;
 46549 |   saveState();
 46550 |   const wheelVisual = els.encounterOverlay?.querySelector(".encounter-wheel-visual");
 46551 |   const wheelDisc = wheelVisual?.querySelector(".wheel-disc");
 46552 |   const latestResult = els.encounterOverlay?.querySelector(".wheel-latest-result");
 46553 |   const rollButton = els.encounterOverlay?.querySelector(`[data-encounter-roll="${session.id}"]`);
 46554 |   const liveDisplay = els.encounterOverlay?.querySelector("[data-encounter-live-display]");
 46555 |   if (liveDisplay) liveDisplay.dataset.finalEntryId = result.id;
 46556 |   if (wheelVisual && wheelDisc) {
 46557 |     wheelVisual.classList.add("spinning");
 46558 |     wheelDisc.getBoundingClientRect();
 46559 |     wheelDisc.style.setProperty("--wheel-rotation", `${Number(nextRotation || 0)}deg`);
 46560 |     animateEncounterLivePointer(els.encounterOverlay, 5200);
 46561 |   } else {
 46562 |     renderEncounterOverlay();
 46563 |   }
 46564 |   if (latestResult) {
 46565 |     latestResult.innerHTML = "<span>Passing</span><strong>Spinning...</strong>";
 46566 |   }
 46567 |   if (rollButton) {
 46568 |     rollButton.disabled = true;
 46569 |     rollButton.textContent = "Spinning...";
 46570 |   }
 46571 |   window.setTimeout(() => completeEncounterRoll(session.id, result.id), 5200);
 46572 | }
 46573 | 
 46574 | function closeEncounterSession(sessionId = state.selectedEncounterSessionId, { skipPendingGuard = false } = {}) {
 46575 |   if (!skipPendingGuard && !guardPendingEventBeforeAction("Close Encounter Session", () => closeEncounterSession(sessionId, { skipPendingGuard: true }))) return;
 46576 |   const session = (state.encounterSessions || []).find((entry) => entry.id === sessionId);
 46577 |   if (!session) return;
 46578 |   const unaddedRolls = (session.rolls || []).filter((roll) => !encounterRollWasObtained(roll));
```


#### Hit 9 — line 46604

```text
 46586 |   }
 46587 |   if (session.status === "pending" && (session.rolls || []).length < Number(session.maxRolls || 2)
 46588 |     && !confirm(`Finish this Encounter session with ${(session.rolls || []).length}/${session.maxRolls || 2} rolls used?`)) return;
 46589 |   session.status = "completed";
 46590 |   session.completedAt ||= new Date().toISOString();
 46591 |   (session.actionVisitIds || [session.actionVisitId]).filter(Boolean).forEach((visitId) => {
 46592 |     completeActionOperationForVisit(visitId, "encounter-session-closed");
 46593 |   });
 46594 |   const next = pendingEncounterSessions().find((entry) => entry.id !== session.id);
 46595 |   state.selectedEncounterSessionId = next?.id || "";
 46596 |   state.encounterModalOpen = Boolean(next);
 46597 |   saveState();
 46598 |   render();
 46599 | }
 46600 | 
 46601 | function renderEncounterOverlay() {
 46602 |   const pending = pendingEncounterSessions();
 46603 |   if (!pending.length) state.encounterModalOpen = false;
 46604 |   if (!els.encounterTab || !els.encounterOverlay || !els.encounterBody) return;
 46605 |   els.encounterTab.classList.toggle("hidden", !pending.length);
 46606 |   els.encounterTab.textContent = pending.length ? `Encounter (${pending.length})` : "Encounter";
 46607 |   const isOpen = Boolean(pending.length && state.encounterModalOpen);
 46608 |   els.encounterOverlay.classList.toggle("hidden", !isOpen);
 46609 |   els.encounterTab.setAttribute("aria-expanded", String(isOpen));
 46610 |   const session = selectedEncounterSession();
 46611 |   if (!pending.length || !session) {
 46612 |     els.encounterSessionList.innerHTML = "";
 46613 |     els.encounterBody.innerHTML = "";
 46614 |     return;
 46615 |   }
 46616 |   const definition = encounterWheelDefinition(session.series, session.gym);
 46617 |   const player = state.players.find((entry) => entry.id === session.playerId) || activePlayer();
 46618 |   const entries = encounterEntriesForSession(session);
 46619 |   const removedEntries = (definition?.entries || []).filter((entry) => (session.removedEntryIds || []).includes(entry.id));
 46620 |   const max = Number(session.maxRolls || definition?.rollsPerAction || 2);
 46621 |   const rolls = session.rolls || [];
 46622 |   const isSpinning = Boolean(session.isSpinning);
```


#### Hit 10 — line 46608

```text
 46590 |   session.completedAt ||= new Date().toISOString();
 46591 |   (session.actionVisitIds || [session.actionVisitId]).filter(Boolean).forEach((visitId) => {
 46592 |     completeActionOperationForVisit(visitId, "encounter-session-closed");
 46593 |   });
 46594 |   const next = pendingEncounterSessions().find((entry) => entry.id !== session.id);
 46595 |   state.selectedEncounterSessionId = next?.id || "";
 46596 |   state.encounterModalOpen = Boolean(next);
 46597 |   saveState();
 46598 |   render();
 46599 | }
 46600 | 
 46601 | function renderEncounterOverlay() {
 46602 |   const pending = pendingEncounterSessions();
 46603 |   if (!pending.length) state.encounterModalOpen = false;
 46604 |   if (!els.encounterTab || !els.encounterOverlay || !els.encounterBody) return;
 46605 |   els.encounterTab.classList.toggle("hidden", !pending.length);
 46606 |   els.encounterTab.textContent = pending.length ? `Encounter (${pending.length})` : "Encounter";
 46607 |   const isOpen = Boolean(pending.length && state.encounterModalOpen);
 46608 |   els.encounterOverlay.classList.toggle("hidden", !isOpen);
 46609 |   els.encounterTab.setAttribute("aria-expanded", String(isOpen));
 46610 |   const session = selectedEncounterSession();
 46611 |   if (!pending.length || !session) {
 46612 |     els.encounterSessionList.innerHTML = "";
 46613 |     els.encounterBody.innerHTML = "";
 46614 |     return;
 46615 |   }
 46616 |   const definition = encounterWheelDefinition(session.series, session.gym);
 46617 |   const player = state.players.find((entry) => entry.id === session.playerId) || activePlayer();
 46618 |   const entries = encounterEntriesForSession(session);
 46619 |   const removedEntries = (definition?.entries || []).filter((entry) => (session.removedEntryIds || []).includes(entry.id));
 46620 |   const max = Number(session.maxRolls || definition?.rollsPerAction || 2);
 46621 |   const rolls = session.rolls || [];
 46622 |   const isSpinning = Boolean(session.isSpinning);
 46623 |   const weightEditing = Boolean(session.weightEditing);
 46624 |   const rerollTokenCount = (player.inventory || []).filter(isRerollToken).length;
 46625 |   const rollFreeRerollReasons = Object.fromEntries(rolls.map((roll) => [roll.id, encounterRollFreeRerollReason(player, roll)]));
 46626 |   els.encounterTitle.textContent = definition?.name || "Encounter Wheel";
```


#### Hit 11 — line 63217

```text
 63199 |     saveState();
 63200 |     renderWheelPanel();
 63201 |   });
 63202 |   els.randomPokemonTab.addEventListener("click", () => {
 63203 |     state.randomPokemonDrawerOpen = !state.randomPokemonDrawerOpen;
 63204 |     saveState();
 63205 |     renderRandomPokemonPanel();
 63206 |   });
 63207 |   els.encounterTab?.addEventListener("click", () => {
 63208 |     state.encounterModalOpen = !state.encounterModalOpen;
 63209 |     saveState();
 63210 |     renderEncounterOverlay();
 63211 |   });
 63212 |   els.closeEncounterOverlay?.addEventListener("click", () => {
 63213 |     state.encounterModalOpen = false;
 63214 |     saveState();
 63215 |     renderEncounterOverlay();
 63216 |   });
 63217 |   els.encounterOverlay?.addEventListener("click", (event) => {
 63218 |     if (event.target === els.encounterOverlay) {
 63219 |       state.encounterModalOpen = false;
 63220 |       saveState();
 63221 |       renderEncounterOverlay();
 63222 |       return;
 63223 |     }
 63224 |     event.stopPropagation();
 63225 |     const sessionButton = event.target.closest("[data-encounter-session]");
 63226 |     if (sessionButton) {
 63227 |       state.selectedEncounterSessionId = sessionButton.dataset.encounterSession;
 63228 |       saveState();
 63229 |       renderEncounterOverlay();
 63230 |       return;
 63231 |     }
 63232 |     const rollButton = event.target.closest("[data-encounter-roll]");
 63233 |     if (rollButton && !rollButton.disabled) {
 63234 |       spinEncounterWheel(rollButton.dataset.encounterRoll);
 63235 |       return;
```


#### Hit 12 — line 63218

```text
 63200 |     renderWheelPanel();
 63201 |   });
 63202 |   els.randomPokemonTab.addEventListener("click", () => {
 63203 |     state.randomPokemonDrawerOpen = !state.randomPokemonDrawerOpen;
 63204 |     saveState();
 63205 |     renderRandomPokemonPanel();
 63206 |   });
 63207 |   els.encounterTab?.addEventListener("click", () => {
 63208 |     state.encounterModalOpen = !state.encounterModalOpen;
 63209 |     saveState();
 63210 |     renderEncounterOverlay();
 63211 |   });
 63212 |   els.closeEncounterOverlay?.addEventListener("click", () => {
 63213 |     state.encounterModalOpen = false;
 63214 |     saveState();
 63215 |     renderEncounterOverlay();
 63216 |   });
 63217 |   els.encounterOverlay?.addEventListener("click", (event) => {
 63218 |     if (event.target === els.encounterOverlay) {
 63219 |       state.encounterModalOpen = false;
 63220 |       saveState();
 63221 |       renderEncounterOverlay();
 63222 |       return;
 63223 |     }
 63224 |     event.stopPropagation();
 63225 |     const sessionButton = event.target.closest("[data-encounter-session]");
 63226 |     if (sessionButton) {
 63227 |       state.selectedEncounterSessionId = sessionButton.dataset.encounterSession;
 63228 |       saveState();
 63229 |       renderEncounterOverlay();
 63230 |       return;
 63231 |     }
 63232 |     const rollButton = event.target.closest("[data-encounter-roll]");
 63233 |     if (rollButton && !rollButton.disabled) {
 63234 |       spinEncounterWheel(rollButton.dataset.encounterRoll);
 63235 |       return;
 63236 |     }
```


#### Hit 13 — line 63302

```text
 63284 |     if (removeButton) {
 63285 |       const session = selectedEncounterSession();
 63286 |       if (!session || (session.rolls || []).length) return;
 63287 |       session.removedEntryIds ||= [];
 63288 |       if (!session.removedEntryIds.includes(removeButton.dataset.encounterRemove)) session.removedEntryIds.push(removeButton.dataset.encounterRemove);
 63289 |       saveState();
 63290 |       renderEncounterOverlay();
 63291 |       return;
 63292 |     }
 63293 |     const restoreButton = event.target.closest("[data-encounter-restore]");
 63294 |     if (restoreButton) {
 63295 |       const session = selectedEncounterSession();
 63296 |       if (!session || (session.rolls || []).length) return;
 63297 |       session.removedEntryIds = (session.removedEntryIds || []).filter((id) => id !== restoreButton.dataset.encounterRestore);
 63298 |       saveState();
 63299 |       renderEncounterOverlay();
 63300 |     }
 63301 |   });
 63302 |   els.encounterOverlay?.addEventListener("input", (event) => {
 63303 |     const weightInput = event.target.closest("[data-encounter-weight]");
 63304 |     if (!weightInput) return;
 63305 |     const session = selectedEncounterSession();
 63306 |     if (!session || (session.rolls || []).length) return;
 63307 |     session.weightOverrides ||= {};
 63308 |     session.weightOverrides[weightInput.dataset.encounterWeight] = Math.max(0, Number(weightInput.value || 0));
 63309 |     saveState();
 63310 |   });
 63311 |   els.randomPokemonPanel.addEventListener("click", (event) => {
 63312 |     event.stopPropagation();
 63313 |     const sessionButton = event.target.closest("[data-random-pokemon-session]");
 63314 |     if (sessionButton) {
 63315 |       state.selectedRandomPokemonSessionId = sessionButton.dataset.randomPokemonSession;
 63316 |       saveState();
 63317 |       renderRandomPokemonPanel();
 63318 |       return;
 63319 |     }
 63320 |     const confirmButton = event.target.closest("[data-confirm-random-pokemon]");
```


### encounterTab

Occurrences: 7

#### Hit 1 — line 18821

```text
 18803 |   cancelActionVisit: document.querySelector("#cancelActionVisit"),
 18804 |   wheelColumn: document.querySelector("#wheelColumn"),
 18805 |   wheelTab: document.querySelector("#wheelTab"),
 18806 |   wheelPanel: document.querySelector("#wheelPanel"),
 18807 |   wheelSessionList: document.querySelector("#wheelSessionList"),
 18808 |   wheelSessionDetail: document.querySelector("#wheelSessionDetail"),
 18809 |   wheelName: document.querySelector("#wheelName"),
 18810 |   wheelRollStatus: document.querySelector("#wheelRollStatus"),
 18811 |   wheelDescription: document.querySelector("#wheelDescription"),
 18812 |   wheelMeta: document.querySelector("#wheelMeta"),
 18813 |   wheelVisual: document.querySelector("#wheelVisual"),
 18814 |   wheelOutcomes: document.querySelector("#wheelOutcomes"),
 18815 |   wheelLatestResult: document.querySelector("#wheelLatestResult"),
 18816 |   spinWheel: document.querySelector("#spinWheel"),
 18817 |   finishWheelSession: document.querySelector("#finishWheelSession"),
 18818 |   skipWheelAnimation: document.querySelector("#skipWheelAnimation"),
 18819 |   closeWheelPanel: document.querySelector("#closeWheelPanel"),
 18820 |   wheelHistory: document.querySelector("#wheelHistory"),
 18821 |   encounterTab: document.querySelector("#encounterTab"),
 18822 |   encounterOverlay: document.querySelector("#encounterOverlay"),
 18823 |   closeEncounterOverlay: document.querySelector("#closeEncounterOverlay"),
 18824 |   encounterSessionList: document.querySelector("#encounterSessionList"),
 18825 |   encounterTitle: document.querySelector("#encounterTitle"),
 18826 |   encounterBody: document.querySelector("#encounterBody"),
 18827 |   randomPokemonColumn: document.querySelector("#randomPokemonColumn"),
 18828 |   randomPokemonTab: document.querySelector("#randomPokemonTab"),
 18829 |   randomPokemonPanel: document.querySelector("#randomPokemonPanel"),
 18830 |   closeRandomPokemonPanel: document.querySelector("#closeRandomPokemonPanel"),
 18831 |   randomPokemonSessionList: document.querySelector("#randomPokemonSessionList"),
 18832 |   randomPokemonSessionDetail: document.querySelector("#randomPokemonSessionDetail"),
 18833 |   rerollTargetModal: document.querySelector("#rerollTargetModal"),
 18834 |   closeRerollTargetModal: document.querySelector("#closeRerollTargetModal"),
 18835 |   rerollTargetIntro: document.querySelector("#rerollTargetIntro"),
 18836 |   rerollTargetList: document.querySelector("#rerollTargetList"),
 18837 |   leaderboardView: document.querySelector("#leaderboardView"),
 18838 |   mvpRaceView: document.querySelector("#mvpRaceView"),
 18839 |   battlePhaseView: document.querySelector("#battlePhaseView"),
```


#### Hit 2 — line 18821

```text
 18803 |   cancelActionVisit: document.querySelector("#cancelActionVisit"),
 18804 |   wheelColumn: document.querySelector("#wheelColumn"),
 18805 |   wheelTab: document.querySelector("#wheelTab"),
 18806 |   wheelPanel: document.querySelector("#wheelPanel"),
 18807 |   wheelSessionList: document.querySelector("#wheelSessionList"),
 18808 |   wheelSessionDetail: document.querySelector("#wheelSessionDetail"),
 18809 |   wheelName: document.querySelector("#wheelName"),
 18810 |   wheelRollStatus: document.querySelector("#wheelRollStatus"),
 18811 |   wheelDescription: document.querySelector("#wheelDescription"),
 18812 |   wheelMeta: document.querySelector("#wheelMeta"),
 18813 |   wheelVisual: document.querySelector("#wheelVisual"),
 18814 |   wheelOutcomes: document.querySelector("#wheelOutcomes"),
 18815 |   wheelLatestResult: document.querySelector("#wheelLatestResult"),
 18816 |   spinWheel: document.querySelector("#spinWheel"),
 18817 |   finishWheelSession: document.querySelector("#finishWheelSession"),
 18818 |   skipWheelAnimation: document.querySelector("#skipWheelAnimation"),
 18819 |   closeWheelPanel: document.querySelector("#closeWheelPanel"),
 18820 |   wheelHistory: document.querySelector("#wheelHistory"),
 18821 |   encounterTab: document.querySelector("#encounterTab"),
 18822 |   encounterOverlay: document.querySelector("#encounterOverlay"),
 18823 |   closeEncounterOverlay: document.querySelector("#closeEncounterOverlay"),
 18824 |   encounterSessionList: document.querySelector("#encounterSessionList"),
 18825 |   encounterTitle: document.querySelector("#encounterTitle"),
 18826 |   encounterBody: document.querySelector("#encounterBody"),
 18827 |   randomPokemonColumn: document.querySelector("#randomPokemonColumn"),
 18828 |   randomPokemonTab: document.querySelector("#randomPokemonTab"),
 18829 |   randomPokemonPanel: document.querySelector("#randomPokemonPanel"),
 18830 |   closeRandomPokemonPanel: document.querySelector("#closeRandomPokemonPanel"),
 18831 |   randomPokemonSessionList: document.querySelector("#randomPokemonSessionList"),
 18832 |   randomPokemonSessionDetail: document.querySelector("#randomPokemonSessionDetail"),
 18833 |   rerollTargetModal: document.querySelector("#rerollTargetModal"),
 18834 |   closeRerollTargetModal: document.querySelector("#closeRerollTargetModal"),
 18835 |   rerollTargetIntro: document.querySelector("#rerollTargetIntro"),
 18836 |   rerollTargetList: document.querySelector("#rerollTargetList"),
 18837 |   leaderboardView: document.querySelector("#leaderboardView"),
 18838 |   mvpRaceView: document.querySelector("#mvpRaceView"),
 18839 |   battlePhaseView: document.querySelector("#battlePhaseView"),
```


#### Hit 3 — line 46604

```text
 46586 |   }
 46587 |   if (session.status === "pending" && (session.rolls || []).length < Number(session.maxRolls || 2)
 46588 |     && !confirm(`Finish this Encounter session with ${(session.rolls || []).length}/${session.maxRolls || 2} rolls used?`)) return;
 46589 |   session.status = "completed";
 46590 |   session.completedAt ||= new Date().toISOString();
 46591 |   (session.actionVisitIds || [session.actionVisitId]).filter(Boolean).forEach((visitId) => {
 46592 |     completeActionOperationForVisit(visitId, "encounter-session-closed");
 46593 |   });
 46594 |   const next = pendingEncounterSessions().find((entry) => entry.id !== session.id);
 46595 |   state.selectedEncounterSessionId = next?.id || "";
 46596 |   state.encounterModalOpen = Boolean(next);
 46597 |   saveState();
 46598 |   render();
 46599 | }
 46600 | 
 46601 | function renderEncounterOverlay() {
 46602 |   const pending = pendingEncounterSessions();
 46603 |   if (!pending.length) state.encounterModalOpen = false;
 46604 |   if (!els.encounterTab || !els.encounterOverlay || !els.encounterBody) return;
 46605 |   els.encounterTab.classList.toggle("hidden", !pending.length);
 46606 |   els.encounterTab.textContent = pending.length ? `Encounter (${pending.length})` : "Encounter";
 46607 |   const isOpen = Boolean(pending.length && state.encounterModalOpen);
 46608 |   els.encounterOverlay.classList.toggle("hidden", !isOpen);
 46609 |   els.encounterTab.setAttribute("aria-expanded", String(isOpen));
 46610 |   const session = selectedEncounterSession();
 46611 |   if (!pending.length || !session) {
 46612 |     els.encounterSessionList.innerHTML = "";
 46613 |     els.encounterBody.innerHTML = "";
 46614 |     return;
 46615 |   }
 46616 |   const definition = encounterWheelDefinition(session.series, session.gym);
 46617 |   const player = state.players.find((entry) => entry.id === session.playerId) || activePlayer();
 46618 |   const entries = encounterEntriesForSession(session);
 46619 |   const removedEntries = (definition?.entries || []).filter((entry) => (session.removedEntryIds || []).includes(entry.id));
 46620 |   const max = Number(session.maxRolls || definition?.rollsPerAction || 2);
 46621 |   const rolls = session.rolls || [];
 46622 |   const isSpinning = Boolean(session.isSpinning);
```


#### Hit 4 — line 46605

```text
 46587 |   if (session.status === "pending" && (session.rolls || []).length < Number(session.maxRolls || 2)
 46588 |     && !confirm(`Finish this Encounter session with ${(session.rolls || []).length}/${session.maxRolls || 2} rolls used?`)) return;
 46589 |   session.status = "completed";
 46590 |   session.completedAt ||= new Date().toISOString();
 46591 |   (session.actionVisitIds || [session.actionVisitId]).filter(Boolean).forEach((visitId) => {
 46592 |     completeActionOperationForVisit(visitId, "encounter-session-closed");
 46593 |   });
 46594 |   const next = pendingEncounterSessions().find((entry) => entry.id !== session.id);
 46595 |   state.selectedEncounterSessionId = next?.id || "";
 46596 |   state.encounterModalOpen = Boolean(next);
 46597 |   saveState();
 46598 |   render();
 46599 | }
 46600 | 
 46601 | function renderEncounterOverlay() {
 46602 |   const pending = pendingEncounterSessions();
 46603 |   if (!pending.length) state.encounterModalOpen = false;
 46604 |   if (!els.encounterTab || !els.encounterOverlay || !els.encounterBody) return;
 46605 |   els.encounterTab.classList.toggle("hidden", !pending.length);
 46606 |   els.encounterTab.textContent = pending.length ? `Encounter (${pending.length})` : "Encounter";
 46607 |   const isOpen = Boolean(pending.length && state.encounterModalOpen);
 46608 |   els.encounterOverlay.classList.toggle("hidden", !isOpen);
 46609 |   els.encounterTab.setAttribute("aria-expanded", String(isOpen));
 46610 |   const session = selectedEncounterSession();
 46611 |   if (!pending.length || !session) {
 46612 |     els.encounterSessionList.innerHTML = "";
 46613 |     els.encounterBody.innerHTML = "";
 46614 |     return;
 46615 |   }
 46616 |   const definition = encounterWheelDefinition(session.series, session.gym);
 46617 |   const player = state.players.find((entry) => entry.id === session.playerId) || activePlayer();
 46618 |   const entries = encounterEntriesForSession(session);
 46619 |   const removedEntries = (definition?.entries || []).filter((entry) => (session.removedEntryIds || []).includes(entry.id));
 46620 |   const max = Number(session.maxRolls || definition?.rollsPerAction || 2);
 46621 |   const rolls = session.rolls || [];
 46622 |   const isSpinning = Boolean(session.isSpinning);
 46623 |   const weightEditing = Boolean(session.weightEditing);
```


#### Hit 5 — line 46606

```text
 46588 |     && !confirm(`Finish this Encounter session with ${(session.rolls || []).length}/${session.maxRolls || 2} rolls used?`)) return;
 46589 |   session.status = "completed";
 46590 |   session.completedAt ||= new Date().toISOString();
 46591 |   (session.actionVisitIds || [session.actionVisitId]).filter(Boolean).forEach((visitId) => {
 46592 |     completeActionOperationForVisit(visitId, "encounter-session-closed");
 46593 |   });
 46594 |   const next = pendingEncounterSessions().find((entry) => entry.id !== session.id);
 46595 |   state.selectedEncounterSessionId = next?.id || "";
 46596 |   state.encounterModalOpen = Boolean(next);
 46597 |   saveState();
 46598 |   render();
 46599 | }
 46600 | 
 46601 | function renderEncounterOverlay() {
 46602 |   const pending = pendingEncounterSessions();
 46603 |   if (!pending.length) state.encounterModalOpen = false;
 46604 |   if (!els.encounterTab || !els.encounterOverlay || !els.encounterBody) return;
 46605 |   els.encounterTab.classList.toggle("hidden", !pending.length);
 46606 |   els.encounterTab.textContent = pending.length ? `Encounter (${pending.length})` : "Encounter";
 46607 |   const isOpen = Boolean(pending.length && state.encounterModalOpen);
 46608 |   els.encounterOverlay.classList.toggle("hidden", !isOpen);
 46609 |   els.encounterTab.setAttribute("aria-expanded", String(isOpen));
 46610 |   const session = selectedEncounterSession();
 46611 |   if (!pending.length || !session) {
 46612 |     els.encounterSessionList.innerHTML = "";
 46613 |     els.encounterBody.innerHTML = "";
 46614 |     return;
 46615 |   }
 46616 |   const definition = encounterWheelDefinition(session.series, session.gym);
 46617 |   const player = state.players.find((entry) => entry.id === session.playerId) || activePlayer();
 46618 |   const entries = encounterEntriesForSession(session);
 46619 |   const removedEntries = (definition?.entries || []).filter((entry) => (session.removedEntryIds || []).includes(entry.id));
 46620 |   const max = Number(session.maxRolls || definition?.rollsPerAction || 2);
 46621 |   const rolls = session.rolls || [];
 46622 |   const isSpinning = Boolean(session.isSpinning);
 46623 |   const weightEditing = Boolean(session.weightEditing);
 46624 |   const rerollTokenCount = (player.inventory || []).filter(isRerollToken).length;
```


#### Hit 6 — line 46609

```text
 46591 |   (session.actionVisitIds || [session.actionVisitId]).filter(Boolean).forEach((visitId) => {
 46592 |     completeActionOperationForVisit(visitId, "encounter-session-closed");
 46593 |   });
 46594 |   const next = pendingEncounterSessions().find((entry) => entry.id !== session.id);
 46595 |   state.selectedEncounterSessionId = next?.id || "";
 46596 |   state.encounterModalOpen = Boolean(next);
 46597 |   saveState();
 46598 |   render();
 46599 | }
 46600 | 
 46601 | function renderEncounterOverlay() {
 46602 |   const pending = pendingEncounterSessions();
 46603 |   if (!pending.length) state.encounterModalOpen = false;
 46604 |   if (!els.encounterTab || !els.encounterOverlay || !els.encounterBody) return;
 46605 |   els.encounterTab.classList.toggle("hidden", !pending.length);
 46606 |   els.encounterTab.textContent = pending.length ? `Encounter (${pending.length})` : "Encounter";
 46607 |   const isOpen = Boolean(pending.length && state.encounterModalOpen);
 46608 |   els.encounterOverlay.classList.toggle("hidden", !isOpen);
 46609 |   els.encounterTab.setAttribute("aria-expanded", String(isOpen));
 46610 |   const session = selectedEncounterSession();
 46611 |   if (!pending.length || !session) {
 46612 |     els.encounterSessionList.innerHTML = "";
 46613 |     els.encounterBody.innerHTML = "";
 46614 |     return;
 46615 |   }
 46616 |   const definition = encounterWheelDefinition(session.series, session.gym);
 46617 |   const player = state.players.find((entry) => entry.id === session.playerId) || activePlayer();
 46618 |   const entries = encounterEntriesForSession(session);
 46619 |   const removedEntries = (definition?.entries || []).filter((entry) => (session.removedEntryIds || []).includes(entry.id));
 46620 |   const max = Number(session.maxRolls || definition?.rollsPerAction || 2);
 46621 |   const rolls = session.rolls || [];
 46622 |   const isSpinning = Boolean(session.isSpinning);
 46623 |   const weightEditing = Boolean(session.weightEditing);
 46624 |   const rerollTokenCount = (player.inventory || []).filter(isRerollToken).length;
 46625 |   const rollFreeRerollReasons = Object.fromEntries(rolls.map((roll) => [roll.id, encounterRollFreeRerollReason(player, roll)]));
 46626 |   els.encounterTitle.textContent = definition?.name || "Encounter Wheel";
 46627 |   els.encounterSessionList.replaceChildren(...pending.map((entry) => {
```


#### Hit 7 — line 63207

```text
 63189 |     }
 63190 |     const randomCancelButton = event.target.closest("[data-cancel-random-pokemon]");
 63191 |     if (randomCancelButton && els.actionLocationMeta.contains(randomCancelButton)) {
 63192 |       event.preventDefault();
 63193 |       if (!randomCancelButton.disabled) cancelRandomPokemonSession(randomCancelButton.dataset.cancelRandomPokemon);
 63194 |       return;
 63195 |     }
 63196 |   });
 63197 |   els.wheelTab.addEventListener("click", () => {
 63198 |     state.wheelDrawerOpen = !state.wheelDrawerOpen;
 63199 |     saveState();
 63200 |     renderWheelPanel();
 63201 |   });
 63202 |   els.randomPokemonTab.addEventListener("click", () => {
 63203 |     state.randomPokemonDrawerOpen = !state.randomPokemonDrawerOpen;
 63204 |     saveState();
 63205 |     renderRandomPokemonPanel();
 63206 |   });
 63207 |   els.encounterTab?.addEventListener("click", () => {
 63208 |     state.encounterModalOpen = !state.encounterModalOpen;
 63209 |     saveState();
 63210 |     renderEncounterOverlay();
 63211 |   });
 63212 |   els.closeEncounterOverlay?.addEventListener("click", () => {
 63213 |     state.encounterModalOpen = false;
 63214 |     saveState();
 63215 |     renderEncounterOverlay();
 63216 |   });
 63217 |   els.encounterOverlay?.addEventListener("click", (event) => {
 63218 |     if (event.target === els.encounterOverlay) {
 63219 |       state.encounterModalOpen = false;
 63220 |       saveState();
 63221 |       renderEncounterOverlay();
 63222 |       return;
 63223 |     }
 63224 |     event.stopPropagation();
 63225 |     const sessionButton = event.target.closest("[data-encounter-session]");
```


### includeFishing

Occurrences: 8

#### Hit 1 — line 41299

```text
 41281 |   state.encounterSessions ||= [];
 41282 |   return state.encounterSessions.filter((session) => ["pending", "review"].includes(session.status));
 41283 | }
 41284 | 
 41285 | function selectedEncounterSession() {
 41286 |   const pending = pendingEncounterSessions();
 41287 |   if (!pending.length) return null;
 41288 |   let session = pending.find((entry) => entry.id === state.selectedEncounterSessionId);
 41289 |   if (!session) {
 41290 |     session = pending[0];
 41291 |     state.selectedEncounterSessionId = session.id;
 41292 |   }
 41293 |   return session;
 41294 | }
 41295 | 
 41296 | function encounterEntriesForSession(session) {
 41297 |   const definition = encounterWheelDefinition(session?.series, session?.gym);
 41298 |   if (!definition) return [];
 41299 |   const includeFishing = Boolean(session.includeFishing);
 41300 |   const includeSurf = Boolean(session.includeSurf);
 41301 |   const removed = new Set(session.removedEntryIds || []);
 41302 |   const baseEntries = (definition.entries || []).filter((entry) => {
 41303 |     if (removed.has(entry.id)) return false;
 41304 |     const category = String(entry.category || "land").toLowerCase();
 41305 |     if (category === "fishing" && !includeFishing) return false;
 41306 |     if (category === "surf" && !includeSurf) return false;
 41307 |     if (entry.enabledByDefault === false && !["fishing", "surf"].includes(category)) return false;
 41308 |     return currentPokemonRuleStatusByName(entry.pokemonName || entry.displayName) !== "Banned";
 41309 |   });
 41310 |   return [...baseEntries, ...(session.temporaryEntries || [])].map((entry) => ({
 41311 |     ...entry,
 41312 |     weight: Math.max(0, Number(session.weightOverrides?.[entry.id] ?? entry.weight ?? 1))
 41313 |   })).filter((entry) => Number(entry.weight) > 0);
 41314 | }
 41315 | 
 41316 | function weightedEncounterEntry(entries) {
 41317 |   const totalWeight = entries.reduce((total, entry) => total + Number(entry.weight || 1), 0);
```


#### Hit 2 — line 41299

```text
 41281 |   state.encounterSessions ||= [];
 41282 |   return state.encounterSessions.filter((session) => ["pending", "review"].includes(session.status));
 41283 | }
 41284 | 
 41285 | function selectedEncounterSession() {
 41286 |   const pending = pendingEncounterSessions();
 41287 |   if (!pending.length) return null;
 41288 |   let session = pending.find((entry) => entry.id === state.selectedEncounterSessionId);
 41289 |   if (!session) {
 41290 |     session = pending[0];
 41291 |     state.selectedEncounterSessionId = session.id;
 41292 |   }
 41293 |   return session;
 41294 | }
 41295 | 
 41296 | function encounterEntriesForSession(session) {
 41297 |   const definition = encounterWheelDefinition(session?.series, session?.gym);
 41298 |   if (!definition) return [];
 41299 |   const includeFishing = Boolean(session.includeFishing);
 41300 |   const includeSurf = Boolean(session.includeSurf);
 41301 |   const removed = new Set(session.removedEntryIds || []);
 41302 |   const baseEntries = (definition.entries || []).filter((entry) => {
 41303 |     if (removed.has(entry.id)) return false;
 41304 |     const category = String(entry.category || "land").toLowerCase();
 41305 |     if (category === "fishing" && !includeFishing) return false;
 41306 |     if (category === "surf" && !includeSurf) return false;
 41307 |     if (entry.enabledByDefault === false && !["fishing", "surf"].includes(category)) return false;
 41308 |     return currentPokemonRuleStatusByName(entry.pokemonName || entry.displayName) !== "Banned";
 41309 |   });
 41310 |   return [...baseEntries, ...(session.temporaryEntries || [])].map((entry) => ({
 41311 |     ...entry,
 41312 |     weight: Math.max(0, Number(session.weightOverrides?.[entry.id] ?? entry.weight ?? 1))
 41313 |   })).filter((entry) => Number(entry.weight) > 0);
 41314 | }
 41315 | 
 41316 | function weightedEncounterEntry(entries) {
 41317 |   const totalWeight = entries.reduce((total, entry) => total + Number(entry.weight || 1), 0);
```


#### Hit 3 — line 41305

```text
 41287 |   if (!pending.length) return null;
 41288 |   let session = pending.find((entry) => entry.id === state.selectedEncounterSessionId);
 41289 |   if (!session) {
 41290 |     session = pending[0];
 41291 |     state.selectedEncounterSessionId = session.id;
 41292 |   }
 41293 |   return session;
 41294 | }
 41295 | 
 41296 | function encounterEntriesForSession(session) {
 41297 |   const definition = encounterWheelDefinition(session?.series, session?.gym);
 41298 |   if (!definition) return [];
 41299 |   const includeFishing = Boolean(session.includeFishing);
 41300 |   const includeSurf = Boolean(session.includeSurf);
 41301 |   const removed = new Set(session.removedEntryIds || []);
 41302 |   const baseEntries = (definition.entries || []).filter((entry) => {
 41303 |     if (removed.has(entry.id)) return false;
 41304 |     const category = String(entry.category || "land").toLowerCase();
 41305 |     if (category === "fishing" && !includeFishing) return false;
 41306 |     if (category === "surf" && !includeSurf) return false;
 41307 |     if (entry.enabledByDefault === false && !["fishing", "surf"].includes(category)) return false;
 41308 |     return currentPokemonRuleStatusByName(entry.pokemonName || entry.displayName) !== "Banned";
 41309 |   });
 41310 |   return [...baseEntries, ...(session.temporaryEntries || [])].map((entry) => ({
 41311 |     ...entry,
 41312 |     weight: Math.max(0, Number(session.weightOverrides?.[entry.id] ?? entry.weight ?? 1))
 41313 |   })).filter((entry) => Number(entry.weight) > 0);
 41314 | }
 41315 | 
 41316 | function weightedEncounterEntry(entries) {
 41317 |   const totalWeight = entries.reduce((total, entry) => total + Number(entry.weight || 1), 0);
 41318 |   if (!entries.length || totalWeight <= 0) return null;
 41319 |   let roll = Math.random() * totalWeight;
 41320 |   for (const entry of entries) {
 41321 |     roll -= Number(entry.weight || 1);
 41322 |     if (roll <= 0) return entry;
 41323 |   }
```


#### Hit 4 — line 42287

```text
 42269 | function updateEncounterActionLog(session, player, updater = null) {
 42270 |   const entry = (state.log || []).find((logEntry) => logEntry.type === "encounter-action"
 42271 |     && (logEntry.encounterSessionId === session.id || logEntry.actionVisitId === session.actionVisitId));
 42272 |   if (!entry) return null;
 42273 |   entry.details ||= [];
 42274 |   entry.childEvents ||= [];
 42275 |   entry.categories ||= [];
 42276 |   entry.tags ||= [];
 42277 |   if (updater) updater(entry);
 42278 |   const rolls = session.rolls || [];
 42279 |   const caughtNames = rolls.map((roll) => {
 42280 |     const result = (state.randomPokemonSessions || []).find((randomSession) => randomSession.id === roll.randomPokemonSessionId);
 42281 |     return result?.status === "confirmed" ? result.resultDisplayName : "";
 42282 |   }).filter(Boolean);
 42283 |   const lines = [
 42284 |     "Spent 1 Action at Encounter",
 42285 |     `Rolled ${rolls.length}/${session.maxRolls || 2} Encounters`,
 42286 |     caughtNames.length ? `Caught ${caughtNames.join(", ")}` : "",
 42287 |     session.includeFishing ? "Fishing included" : "",
 42288 |     session.includeSurf ? "Surf included" : "",
 42289 |     (session.removedEntryIds || []).length ? `Removed ${(session.removedEntryIds || []).length} option${session.removedEntryIds.length === 1 ? "" : "s"}` : ""
 42290 |   ].filter(Boolean);
 42291 |   entry.summary = lines.join("\n");
 42292 |   entry.details = [
 42293 |     `Active pool: ${encounterEntriesForSession(session).map((entry) => entry.displayName || entry.pokemonName).join(", ") || "None"}`,
 42294 |     `Fishing included: ${session.includeFishing ? "Yes" : "No"}`,
 42295 |     `Surf included: ${session.includeSurf ? "Yes" : "No"}`,
 42296 |     ...(session.removedEntryIds || []).map((id) => `Removed: ${id}`),
 42297 |     ...rolls.map((roll, index) => `Roll ${index + 1}: ${roll.resultDisplayName}`)
 42298 |   ];
 42299 |   entry.quantity = rolls.length;
 42300 |   entry.playerIds = [player.id];
 42301 |   entry.encounterSessionId = session.id;
 42302 |   return entry;
 42303 | }
 42304 | 
 42305 | function activeEncounterSessionForPlayer(playerId, series = state.series, gym = state.gym) {
```


#### Hit 5 — line 42294

```text
 42276 |   entry.tags ||= [];
 42277 |   if (updater) updater(entry);
 42278 |   const rolls = session.rolls || [];
 42279 |   const caughtNames = rolls.map((roll) => {
 42280 |     const result = (state.randomPokemonSessions || []).find((randomSession) => randomSession.id === roll.randomPokemonSessionId);
 42281 |     return result?.status === "confirmed" ? result.resultDisplayName : "";
 42282 |   }).filter(Boolean);
 42283 |   const lines = [
 42284 |     "Spent 1 Action at Encounter",
 42285 |     `Rolled ${rolls.length}/${session.maxRolls || 2} Encounters`,
 42286 |     caughtNames.length ? `Caught ${caughtNames.join(", ")}` : "",
 42287 |     session.includeFishing ? "Fishing included" : "",
 42288 |     session.includeSurf ? "Surf included" : "",
 42289 |     (session.removedEntryIds || []).length ? `Removed ${(session.removedEntryIds || []).length} option${session.removedEntryIds.length === 1 ? "" : "s"}` : ""
 42290 |   ].filter(Boolean);
 42291 |   entry.summary = lines.join("\n");
 42292 |   entry.details = [
 42293 |     `Active pool: ${encounterEntriesForSession(session).map((entry) => entry.displayName || entry.pokemonName).join(", ") || "None"}`,
 42294 |     `Fishing included: ${session.includeFishing ? "Yes" : "No"}`,
 42295 |     `Surf included: ${session.includeSurf ? "Yes" : "No"}`,
 42296 |     ...(session.removedEntryIds || []).map((id) => `Removed: ${id}`),
 42297 |     ...rolls.map((roll, index) => `Roll ${index + 1}: ${roll.resultDisplayName}`)
 42298 |   ];
 42299 |   entry.quantity = rolls.length;
 42300 |   entry.playerIds = [player.id];
 42301 |   entry.encounterSessionId = session.id;
 42302 |   return entry;
 42303 | }
 42304 | 
 42305 | function activeEncounterSessionForPlayer(playerId, series = state.series, gym = state.gym) {
 42306 |   return (state.encounterSessions || []).find((session) => session.playerId === playerId
 42307 |     && session.series === series
 42308 |     && Number(session.gym) === Number(gym)
 42309 |     && ["pending", "review"].includes(session.status));
 42310 | }
 42311 | 
 42312 | function startEncounterSession({ skipConfirmCheck = false } = {}) {
```


#### Hit 6 — line 42369

```text
 42351 |   const reusedSession = Boolean(session);
 42352 |   if (session) {
 42353 |     session.actionVisitIds ||= session.actionVisitId ? [session.actionVisitId] : [];
 42354 |     session.actionVisitIds.push(visit.id);
 42355 |     session.maxRolls = Number(session.maxRolls || 0) + Number(definition.rollsPerAction || 2);
 42356 |     if (session.status === "review") session.status = "pending";
 42357 |     session.updatedAt = new Date().toISOString();
 42358 |   } else {
 42359 |     session = {
 42360 |       id: `encounter-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
 42361 |       playerId: player.id,
 42362 |       series: state.series,
 42363 |       gym: Number(state.gym),
 42364 |       phase: "action",
 42365 |       actionVisitId: visit.id,
 42366 |       actionVisitIds: [visit.id],
 42367 |       wheelId: definition.id,
 42368 |       maxRolls: Number(definition.rollsPerAction || 2),
 42369 |       includeFishing: false,
 42370 |       includeSurf: false,
 42371 |       removedEntryIds: [],
 42372 |       temporaryEntries: [],
 42373 |       weightOverrides: {},
 42374 |       resultSessionIds: [],
 42375 |       rolls: [],
 42376 |       status: "pending",
 42377 |       visualRotation: 0,
 42378 |       createdAt: new Date().toISOString()
 42379 |     };
 42380 |     state.encounterSessions.unshift(session);
 42381 |   }
 42382 |   linkActionOperation(visit.id, { featureType: "encounter", featureSessionId: session.id });
 42383 |   state.selectedEncounterSessionId = session.id;
 42384 |   state.encounterModalOpen = true;
 42385 |   addLogEntry({
 42386 |     action: "phase",
 42387 |     category: "action",
```


#### Hit 7 — line 46710

```text
 46692 |                 ${roll.rosterPokemonId ? `<span class="encounter-result-added">Added</span>` : `
 46693 |                   <button class="buy-button mini-button" type="button" data-encounter-add="${escapeHtml(roll.id)}">Add</button>
 46694 |                   <button class="ghost-button mini-button" type="button" data-encounter-reroll="${escapeHtml(roll.id)}" data-encounter-reroll-mode="result"${rollFreeRerollReasons[roll.id] || rerollTokenCount ? "" : " disabled"} title="${roll.specialEncounter ? `Spend ${player.name}'s Reroll Token to reroll within the Hyperspace sub-wheel.` : rollFreeRerollReasons[roll.id] ? `Free reroll: ${escapeHtml(rollFreeRerollReasons[roll.id])}` : rerollTokenCount ? `Spend ${player.name}'s Reroll Token on this encounter result.` : `${player.name} needs a Reroll Token.`}">${roll.specialEncounter ? "Owner Reroll Hyperspace" : rollFreeRerollReasons[roll.id] ? "Free Reroll" : `Owner Reroll${rerollTokenCount ? ` (${rerollTokenCount})` : ""}`}</button>
 46695 |                   ${roll.specialEncounter ? `<button class="ghost-button mini-button danger-lite" type="button" data-encounter-reroll="${escapeHtml(roll.id)}" data-encounter-reroll-mode="encounter"${rollFreeRerollReasons[roll.id] || rerollTokenCount ? "" : " disabled"} title="${rollFreeRerollReasons[roll.id] ? `Free respin: ${escapeHtml(rollFreeRerollReasons[roll.id])}` : rerollTokenCount ? `Spend ${player.name}'s Reroll Token to respin the original Encounter Wheel result.` : `${player.name} needs a Reroll Token.`}">Owner Respin Encounter</button>` : ""}
 46696 |                 `}
 46697 |               </div>
 46698 |             </article>
 46699 |           `).join("") : `<p class="empty-state compact">Encounter results will appear here.</p>`}
 46700 |         </div>
 46701 |       </section>
 46702 |       <section class="encounter-controls">
 46703 |         <div class="wheel-meta">
 46704 |           <div><span>Trainer</span><strong>${escapeHtml(player.name)}</strong></div>
 46705 |           <div><span>Rolls</span><strong>${rolls.length}/${max}</strong></div>
 46706 |           <div><span>Active Options</span><strong>${entries.length}</strong></div>
 46707 |           <div><span>Rerolls</span><strong>Allowed</strong></div>
 46708 |         </div>
 46709 |         <div class="encounter-toggle-row">
 46710 |           <label><input type="checkbox" data-encounter-toggle="water" ${session.includeFishing || session.includeSurf ? "checked" : ""}> Include Fishing / Surf</label>
 46711 |           <label><input type="checkbox" data-encounter-weight-editing ${weightEditing ? "checked" : ""}${rolls.length ? " disabled" : ""}> Edit Weights</label>
 46712 |         </div>
 46713 |         <p class="gc-rule-note">Fishing and Surf are grouped for now. Later this should come from items/effects.</p>
 46714 |         <h3>Active Wheel Options</h3>
 46715 |         <div class="encounter-entry-list">
 46716 |           ${entries.map((entry) => `
 46717 |             <article class="encounter-entry${entry.id === finalEntryId ? " pointer-active" : ""}" data-encounter-entry-id="${escapeHtml(entry.id)}">
 46718 |               <div>
 46719 |                 <strong>${escapeHtml(entry.displayName || entry.pokemonName)}</strong>
 46720 |                 <span>${escapeHtml(entry.category || "land")}</span>
 46721 |               </div>
 46722 |               ${weightEditing ? `
 46723 |                 <label class="encounter-weight-control">
 46724 |                   Weight
 46725 |                   <input type="number" min="0" step="1" value="${Number(entry.weight || 1)}" data-encounter-weight="${escapeHtml(entry.id)}"${rolls.length ? " disabled" : ""}>
 46726 |                 </label>
 46727 |               ` : `<span class="encounter-weight-badge">W ${Number(entry.weight || 1)}</span>`}
 46728 |               ${entry.removable === false ? "" : `<button class="ghost-button mini-button" type="button" data-encounter-remove="${escapeHtml(entry.id)}"${rolls.length ? " disabled" : ""}>Remove</button>`}
```


#### Hit 8 — line 63247

```text
 63229 |       renderEncounterOverlay();
 63230 |       return;
 63231 |     }
 63232 |     const rollButton = event.target.closest("[data-encounter-roll]");
 63233 |     if (rollButton && !rollButton.disabled) {
 63234 |       spinEncounterWheel(rollButton.dataset.encounterRoll);
 63235 |       return;
 63236 |     }
 63237 |     const doneButton = event.target.closest("[data-encounter-done]");
 63238 |     if (doneButton) {
 63239 |       closeEncounterSession(doneButton.dataset.encounterDone);
 63240 |       return;
 63241 |     }
 63242 |     const toggle = event.target.closest("[data-encounter-toggle]");
 63243 |     if (toggle) {
 63244 |       const session = selectedEncounterSession();
 63245 |       if (!session || (session.rolls || []).length) return;
 63246 |       if (toggle.dataset.encounterToggle === "water") {
 63247 |         session.includeFishing = toggle.checked;
 63248 |         session.includeSurf = toggle.checked;
 63249 |       }
 63250 |       saveState();
 63251 |       renderEncounterOverlay();
 63252 |       return;
 63253 |     }
 63254 |     const weightEditingToggle = event.target.closest("[data-encounter-weight-editing]");
 63255 |     if (weightEditingToggle) {
 63256 |       const session = selectedEncounterSession();
 63257 |       if (!session || (session.rolls || []).length) return;
 63258 |       session.weightEditing = weightEditingToggle.checked;
 63259 |       saveState();
 63260 |       renderEncounterOverlay();
 63261 |       return;
 63262 |     }
 63263 |     const skipAnimationToggle = event.target.closest("[data-encounter-skip-animation]");
 63264 |     if (skipAnimationToggle) {
 63265 |       state.skipWheelAnimation = skipAnimationToggle.checked;
```


### includeSurf

Occurrences: 8

#### Hit 1 — line 41300

```text
 41282 |   return state.encounterSessions.filter((session) => ["pending", "review"].includes(session.status));
 41283 | }
 41284 | 
 41285 | function selectedEncounterSession() {
 41286 |   const pending = pendingEncounterSessions();
 41287 |   if (!pending.length) return null;
 41288 |   let session = pending.find((entry) => entry.id === state.selectedEncounterSessionId);
 41289 |   if (!session) {
 41290 |     session = pending[0];
 41291 |     state.selectedEncounterSessionId = session.id;
 41292 |   }
 41293 |   return session;
 41294 | }
 41295 | 
 41296 | function encounterEntriesForSession(session) {
 41297 |   const definition = encounterWheelDefinition(session?.series, session?.gym);
 41298 |   if (!definition) return [];
 41299 |   const includeFishing = Boolean(session.includeFishing);
 41300 |   const includeSurf = Boolean(session.includeSurf);
 41301 |   const removed = new Set(session.removedEntryIds || []);
 41302 |   const baseEntries = (definition.entries || []).filter((entry) => {
 41303 |     if (removed.has(entry.id)) return false;
 41304 |     const category = String(entry.category || "land").toLowerCase();
 41305 |     if (category === "fishing" && !includeFishing) return false;
 41306 |     if (category === "surf" && !includeSurf) return false;
 41307 |     if (entry.enabledByDefault === false && !["fishing", "surf"].includes(category)) return false;
 41308 |     return currentPokemonRuleStatusByName(entry.pokemonName || entry.displayName) !== "Banned";
 41309 |   });
 41310 |   return [...baseEntries, ...(session.temporaryEntries || [])].map((entry) => ({
 41311 |     ...entry,
 41312 |     weight: Math.max(0, Number(session.weightOverrides?.[entry.id] ?? entry.weight ?? 1))
 41313 |   })).filter((entry) => Number(entry.weight) > 0);
 41314 | }
 41315 | 
 41316 | function weightedEncounterEntry(entries) {
 41317 |   const totalWeight = entries.reduce((total, entry) => total + Number(entry.weight || 1), 0);
 41318 |   if (!entries.length || totalWeight <= 0) return null;
```


#### Hit 2 — line 41300

```text
 41282 |   return state.encounterSessions.filter((session) => ["pending", "review"].includes(session.status));
 41283 | }
 41284 | 
 41285 | function selectedEncounterSession() {
 41286 |   const pending = pendingEncounterSessions();
 41287 |   if (!pending.length) return null;
 41288 |   let session = pending.find((entry) => entry.id === state.selectedEncounterSessionId);
 41289 |   if (!session) {
 41290 |     session = pending[0];
 41291 |     state.selectedEncounterSessionId = session.id;
 41292 |   }
 41293 |   return session;
 41294 | }
 41295 | 
 41296 | function encounterEntriesForSession(session) {
 41297 |   const definition = encounterWheelDefinition(session?.series, session?.gym);
 41298 |   if (!definition) return [];
 41299 |   const includeFishing = Boolean(session.includeFishing);
 41300 |   const includeSurf = Boolean(session.includeSurf);
 41301 |   const removed = new Set(session.removedEntryIds || []);
 41302 |   const baseEntries = (definition.entries || []).filter((entry) => {
 41303 |     if (removed.has(entry.id)) return false;
 41304 |     const category = String(entry.category || "land").toLowerCase();
 41305 |     if (category === "fishing" && !includeFishing) return false;
 41306 |     if (category === "surf" && !includeSurf) return false;
 41307 |     if (entry.enabledByDefault === false && !["fishing", "surf"].includes(category)) return false;
 41308 |     return currentPokemonRuleStatusByName(entry.pokemonName || entry.displayName) !== "Banned";
 41309 |   });
 41310 |   return [...baseEntries, ...(session.temporaryEntries || [])].map((entry) => ({
 41311 |     ...entry,
 41312 |     weight: Math.max(0, Number(session.weightOverrides?.[entry.id] ?? entry.weight ?? 1))
 41313 |   })).filter((entry) => Number(entry.weight) > 0);
 41314 | }
 41315 | 
 41316 | function weightedEncounterEntry(entries) {
 41317 |   const totalWeight = entries.reduce((total, entry) => total + Number(entry.weight || 1), 0);
 41318 |   if (!entries.length || totalWeight <= 0) return null;
```


#### Hit 3 — line 41306

```text
 41288 |   let session = pending.find((entry) => entry.id === state.selectedEncounterSessionId);
 41289 |   if (!session) {
 41290 |     session = pending[0];
 41291 |     state.selectedEncounterSessionId = session.id;
 41292 |   }
 41293 |   return session;
 41294 | }
 41295 | 
 41296 | function encounterEntriesForSession(session) {
 41297 |   const definition = encounterWheelDefinition(session?.series, session?.gym);
 41298 |   if (!definition) return [];
 41299 |   const includeFishing = Boolean(session.includeFishing);
 41300 |   const includeSurf = Boolean(session.includeSurf);
 41301 |   const removed = new Set(session.removedEntryIds || []);
 41302 |   const baseEntries = (definition.entries || []).filter((entry) => {
 41303 |     if (removed.has(entry.id)) return false;
 41304 |     const category = String(entry.category || "land").toLowerCase();
 41305 |     if (category === "fishing" && !includeFishing) return false;
 41306 |     if (category === "surf" && !includeSurf) return false;
 41307 |     if (entry.enabledByDefault === false && !["fishing", "surf"].includes(category)) return false;
 41308 |     return currentPokemonRuleStatusByName(entry.pokemonName || entry.displayName) !== "Banned";
 41309 |   });
 41310 |   return [...baseEntries, ...(session.temporaryEntries || [])].map((entry) => ({
 41311 |     ...entry,
 41312 |     weight: Math.max(0, Number(session.weightOverrides?.[entry.id] ?? entry.weight ?? 1))
 41313 |   })).filter((entry) => Number(entry.weight) > 0);
 41314 | }
 41315 | 
 41316 | function weightedEncounterEntry(entries) {
 41317 |   const totalWeight = entries.reduce((total, entry) => total + Number(entry.weight || 1), 0);
 41318 |   if (!entries.length || totalWeight <= 0) return null;
 41319 |   let roll = Math.random() * totalWeight;
 41320 |   for (const entry of entries) {
 41321 |     roll -= Number(entry.weight || 1);
 41322 |     if (roll <= 0) return entry;
 41323 |   }
 41324 |   return entries[entries.length - 1];
```


#### Hit 4 — line 42288

```text
 42270 |   const entry = (state.log || []).find((logEntry) => logEntry.type === "encounter-action"
 42271 |     && (logEntry.encounterSessionId === session.id || logEntry.actionVisitId === session.actionVisitId));
 42272 |   if (!entry) return null;
 42273 |   entry.details ||= [];
 42274 |   entry.childEvents ||= [];
 42275 |   entry.categories ||= [];
 42276 |   entry.tags ||= [];
 42277 |   if (updater) updater(entry);
 42278 |   const rolls = session.rolls || [];
 42279 |   const caughtNames = rolls.map((roll) => {
 42280 |     const result = (state.randomPokemonSessions || []).find((randomSession) => randomSession.id === roll.randomPokemonSessionId);
 42281 |     return result?.status === "confirmed" ? result.resultDisplayName : "";
 42282 |   }).filter(Boolean);
 42283 |   const lines = [
 42284 |     "Spent 1 Action at Encounter",
 42285 |     `Rolled ${rolls.length}/${session.maxRolls || 2} Encounters`,
 42286 |     caughtNames.length ? `Caught ${caughtNames.join(", ")}` : "",
 42287 |     session.includeFishing ? "Fishing included" : "",
 42288 |     session.includeSurf ? "Surf included" : "",
 42289 |     (session.removedEntryIds || []).length ? `Removed ${(session.removedEntryIds || []).length} option${session.removedEntryIds.length === 1 ? "" : "s"}` : ""
 42290 |   ].filter(Boolean);
 42291 |   entry.summary = lines.join("\n");
 42292 |   entry.details = [
 42293 |     `Active pool: ${encounterEntriesForSession(session).map((entry) => entry.displayName || entry.pokemonName).join(", ") || "None"}`,
 42294 |     `Fishing included: ${session.includeFishing ? "Yes" : "No"}`,
 42295 |     `Surf included: ${session.includeSurf ? "Yes" : "No"}`,
 42296 |     ...(session.removedEntryIds || []).map((id) => `Removed: ${id}`),
 42297 |     ...rolls.map((roll, index) => `Roll ${index + 1}: ${roll.resultDisplayName}`)
 42298 |   ];
 42299 |   entry.quantity = rolls.length;
 42300 |   entry.playerIds = [player.id];
 42301 |   entry.encounterSessionId = session.id;
 42302 |   return entry;
 42303 | }
 42304 | 
 42305 | function activeEncounterSessionForPlayer(playerId, series = state.series, gym = state.gym) {
 42306 |   return (state.encounterSessions || []).find((session) => session.playerId === playerId
```


#### Hit 5 — line 42295

```text
 42277 |   if (updater) updater(entry);
 42278 |   const rolls = session.rolls || [];
 42279 |   const caughtNames = rolls.map((roll) => {
 42280 |     const result = (state.randomPokemonSessions || []).find((randomSession) => randomSession.id === roll.randomPokemonSessionId);
 42281 |     return result?.status === "confirmed" ? result.resultDisplayName : "";
 42282 |   }).filter(Boolean);
 42283 |   const lines = [
 42284 |     "Spent 1 Action at Encounter",
 42285 |     `Rolled ${rolls.length}/${session.maxRolls || 2} Encounters`,
 42286 |     caughtNames.length ? `Caught ${caughtNames.join(", ")}` : "",
 42287 |     session.includeFishing ? "Fishing included" : "",
 42288 |     session.includeSurf ? "Surf included" : "",
 42289 |     (session.removedEntryIds || []).length ? `Removed ${(session.removedEntryIds || []).length} option${session.removedEntryIds.length === 1 ? "" : "s"}` : ""
 42290 |   ].filter(Boolean);
 42291 |   entry.summary = lines.join("\n");
 42292 |   entry.details = [
 42293 |     `Active pool: ${encounterEntriesForSession(session).map((entry) => entry.displayName || entry.pokemonName).join(", ") || "None"}`,
 42294 |     `Fishing included: ${session.includeFishing ? "Yes" : "No"}`,
 42295 |     `Surf included: ${session.includeSurf ? "Yes" : "No"}`,
 42296 |     ...(session.removedEntryIds || []).map((id) => `Removed: ${id}`),
 42297 |     ...rolls.map((roll, index) => `Roll ${index + 1}: ${roll.resultDisplayName}`)
 42298 |   ];
 42299 |   entry.quantity = rolls.length;
 42300 |   entry.playerIds = [player.id];
 42301 |   entry.encounterSessionId = session.id;
 42302 |   return entry;
 42303 | }
 42304 | 
 42305 | function activeEncounterSessionForPlayer(playerId, series = state.series, gym = state.gym) {
 42306 |   return (state.encounterSessions || []).find((session) => session.playerId === playerId
 42307 |     && session.series === series
 42308 |     && Number(session.gym) === Number(gym)
 42309 |     && ["pending", "review"].includes(session.status));
 42310 | }
 42311 | 
 42312 | function startEncounterSession({ skipConfirmCheck = false } = {}) {
 42313 |   const player = activePlayer();
```


#### Hit 6 — line 42370

```text
 42352 |   if (session) {
 42353 |     session.actionVisitIds ||= session.actionVisitId ? [session.actionVisitId] : [];
 42354 |     session.actionVisitIds.push(visit.id);
 42355 |     session.maxRolls = Number(session.maxRolls || 0) + Number(definition.rollsPerAction || 2);
 42356 |     if (session.status === "review") session.status = "pending";
 42357 |     session.updatedAt = new Date().toISOString();
 42358 |   } else {
 42359 |     session = {
 42360 |       id: `encounter-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
 42361 |       playerId: player.id,
 42362 |       series: state.series,
 42363 |       gym: Number(state.gym),
 42364 |       phase: "action",
 42365 |       actionVisitId: visit.id,
 42366 |       actionVisitIds: [visit.id],
 42367 |       wheelId: definition.id,
 42368 |       maxRolls: Number(definition.rollsPerAction || 2),
 42369 |       includeFishing: false,
 42370 |       includeSurf: false,
 42371 |       removedEntryIds: [],
 42372 |       temporaryEntries: [],
 42373 |       weightOverrides: {},
 42374 |       resultSessionIds: [],
 42375 |       rolls: [],
 42376 |       status: "pending",
 42377 |       visualRotation: 0,
 42378 |       createdAt: new Date().toISOString()
 42379 |     };
 42380 |     state.encounterSessions.unshift(session);
 42381 |   }
 42382 |   linkActionOperation(visit.id, { featureType: "encounter", featureSessionId: session.id });
 42383 |   state.selectedEncounterSessionId = session.id;
 42384 |   state.encounterModalOpen = true;
 42385 |   addLogEntry({
 42386 |     action: "phase",
 42387 |     category: "action",
 42388 |     player: player.name,
```


#### Hit 7 — line 46710

```text
 46692 |                 ${roll.rosterPokemonId ? `<span class="encounter-result-added">Added</span>` : `
 46693 |                   <button class="buy-button mini-button" type="button" data-encounter-add="${escapeHtml(roll.id)}">Add</button>
 46694 |                   <button class="ghost-button mini-button" type="button" data-encounter-reroll="${escapeHtml(roll.id)}" data-encounter-reroll-mode="result"${rollFreeRerollReasons[roll.id] || rerollTokenCount ? "" : " disabled"} title="${roll.specialEncounter ? `Spend ${player.name}'s Reroll Token to reroll within the Hyperspace sub-wheel.` : rollFreeRerollReasons[roll.id] ? `Free reroll: ${escapeHtml(rollFreeRerollReasons[roll.id])}` : rerollTokenCount ? `Spend ${player.name}'s Reroll Token on this encounter result.` : `${player.name} needs a Reroll Token.`}">${roll.specialEncounter ? "Owner Reroll Hyperspace" : rollFreeRerollReasons[roll.id] ? "Free Reroll" : `Owner Reroll${rerollTokenCount ? ` (${rerollTokenCount})` : ""}`}</button>
 46695 |                   ${roll.specialEncounter ? `<button class="ghost-button mini-button danger-lite" type="button" data-encounter-reroll="${escapeHtml(roll.id)}" data-encounter-reroll-mode="encounter"${rollFreeRerollReasons[roll.id] || rerollTokenCount ? "" : " disabled"} title="${rollFreeRerollReasons[roll.id] ? `Free respin: ${escapeHtml(rollFreeRerollReasons[roll.id])}` : rerollTokenCount ? `Spend ${player.name}'s Reroll Token to respin the original Encounter Wheel result.` : `${player.name} needs a Reroll Token.`}">Owner Respin Encounter</button>` : ""}
 46696 |                 `}
 46697 |               </div>
 46698 |             </article>
 46699 |           `).join("") : `<p class="empty-state compact">Encounter results will appear here.</p>`}
 46700 |         </div>
 46701 |       </section>
 46702 |       <section class="encounter-controls">
 46703 |         <div class="wheel-meta">
 46704 |           <div><span>Trainer</span><strong>${escapeHtml(player.name)}</strong></div>
 46705 |           <div><span>Rolls</span><strong>${rolls.length}/${max}</strong></div>
 46706 |           <div><span>Active Options</span><strong>${entries.length}</strong></div>
 46707 |           <div><span>Rerolls</span><strong>Allowed</strong></div>
 46708 |         </div>
 46709 |         <div class="encounter-toggle-row">
 46710 |           <label><input type="checkbox" data-encounter-toggle="water" ${session.includeFishing || session.includeSurf ? "checked" : ""}> Include Fishing / Surf</label>
 46711 |           <label><input type="checkbox" data-encounter-weight-editing ${weightEditing ? "checked" : ""}${rolls.length ? " disabled" : ""}> Edit Weights</label>
 46712 |         </div>
 46713 |         <p class="gc-rule-note">Fishing and Surf are grouped for now. Later this should come from items/effects.</p>
 46714 |         <h3>Active Wheel Options</h3>
 46715 |         <div class="encounter-entry-list">
 46716 |           ${entries.map((entry) => `
 46717 |             <article class="encounter-entry${entry.id === finalEntryId ? " pointer-active" : ""}" data-encounter-entry-id="${escapeHtml(entry.id)}">
 46718 |               <div>
 46719 |                 <strong>${escapeHtml(entry.displayName || entry.pokemonName)}</strong>
 46720 |                 <span>${escapeHtml(entry.category || "land")}</span>
 46721 |               </div>
 46722 |               ${weightEditing ? `
 46723 |                 <label class="encounter-weight-control">
 46724 |                   Weight
 46725 |                   <input type="number" min="0" step="1" value="${Number(entry.weight || 1)}" data-encounter-weight="${escapeHtml(entry.id)}"${rolls.length ? " disabled" : ""}>
 46726 |                 </label>
 46727 |               ` : `<span class="encounter-weight-badge">W ${Number(entry.weight || 1)}</span>`}
 46728 |               ${entry.removable === false ? "" : `<button class="ghost-button mini-button" type="button" data-encounter-remove="${escapeHtml(entry.id)}"${rolls.length ? " disabled" : ""}>Remove</button>`}
```


#### Hit 8 — line 63248

```text
 63230 |       return;
 63231 |     }
 63232 |     const rollButton = event.target.closest("[data-encounter-roll]");
 63233 |     if (rollButton && !rollButton.disabled) {
 63234 |       spinEncounterWheel(rollButton.dataset.encounterRoll);
 63235 |       return;
 63236 |     }
 63237 |     const doneButton = event.target.closest("[data-encounter-done]");
 63238 |     if (doneButton) {
 63239 |       closeEncounterSession(doneButton.dataset.encounterDone);
 63240 |       return;
 63241 |     }
 63242 |     const toggle = event.target.closest("[data-encounter-toggle]");
 63243 |     if (toggle) {
 63244 |       const session = selectedEncounterSession();
 63245 |       if (!session || (session.rolls || []).length) return;
 63246 |       if (toggle.dataset.encounterToggle === "water") {
 63247 |         session.includeFishing = toggle.checked;
 63248 |         session.includeSurf = toggle.checked;
 63249 |       }
 63250 |       saveState();
 63251 |       renderEncounterOverlay();
 63252 |       return;
 63253 |     }
 63254 |     const weightEditingToggle = event.target.closest("[data-encounter-weight-editing]");
 63255 |     if (weightEditingToggle) {
 63256 |       const session = selectedEncounterSession();
 63257 |       if (!session || (session.rolls || []).length) return;
 63258 |       session.weightEditing = weightEditingToggle.checked;
 63259 |       saveState();
 63260 |       renderEncounterOverlay();
 63261 |       return;
 63262 |     }
 63263 |     const skipAnimationToggle = event.target.closest("[data-encounter-skip-animation]");
 63264 |     if (skipAnimationToggle) {
 63265 |       state.skipWheelAnimation = skipAnimationToggle.checked;
 63266 |       saveState();
```


### Fishing

Occurrences: 13

#### Hit 1 — line 6073

```text
  6055 |     .replace(/^hyperspace-hole$/i, "hyperspace-hole");
  6056 |   return index ? `${base}-${index + 1}` : base;
  6057 | }
  6058 | 
  6059 | function encounterEntry(name, index = 0) {
  6060 |   const raw = String(name || "").trim();
  6061 |   const isWater = /\s+SF$/i.test(raw);
  6062 |   const displayName = raw.replace(/\s+SF$/i, "").trim();
  6063 |   const id = normalizeEncounterEntryId(displayName, index);
  6064 |   const isHyperspace = normalizePokemonName(displayName) === "hyperspace-hole";
  6065 |   return {
  6066 |     id,
  6067 |     pokemonName: displayName,
  6068 |     displayName,
  6069 |     weight: 1,
  6070 |     category: isWater ? "fishing" : isHyperspace ? "special" : "land",
  6071 |     enabledByDefault: !isWater,
  6072 |     removable: true,
  6073 |     ...(isWater ? { notes: "Fishing / Surf encounter." } : {}),
  6074 |     ...(isHyperspace ? { specialWheelId: "hoenn-hyperspace-hole", notes: "Hoenn-only Hyperspace Hole sub-wheel." } : {})
  6075 |   };
  6076 | }
  6077 | 
  6078 | function makeEncounterWheel(series, gym, names) {
  6079 |   const seen = new Map();
  6080 |   return {
  6081 |     id: `${String(series).toLowerCase()}-gym-${gym}`,
  6082 |     series,
  6083 |     gym,
  6084 |     name: `${series} Gym ${gym} Encounter Wheel`,
  6085 |     rollsPerAction: 2,
  6086 |     rerollable: true,
  6087 |     entries: names.map((name) => {
  6088 |       const key = normalizePokemonName(String(name).replace(/\s+SF$/i, "").trim());
  6089 |       const count = seen.get(key) || 0;
  6090 |       seen.set(key, count + 1);
  6091 |       return encounterEntry(name, count);
```


#### Hit 2 — line 41299

```text
 41281 |   state.encounterSessions ||= [];
 41282 |   return state.encounterSessions.filter((session) => ["pending", "review"].includes(session.status));
 41283 | }
 41284 | 
 41285 | function selectedEncounterSession() {
 41286 |   const pending = pendingEncounterSessions();
 41287 |   if (!pending.length) return null;
 41288 |   let session = pending.find((entry) => entry.id === state.selectedEncounterSessionId);
 41289 |   if (!session) {
 41290 |     session = pending[0];
 41291 |     state.selectedEncounterSessionId = session.id;
 41292 |   }
 41293 |   return session;
 41294 | }
 41295 | 
 41296 | function encounterEntriesForSession(session) {
 41297 |   const definition = encounterWheelDefinition(session?.series, session?.gym);
 41298 |   if (!definition) return [];
 41299 |   const includeFishing = Boolean(session.includeFishing);
 41300 |   const includeSurf = Boolean(session.includeSurf);
 41301 |   const removed = new Set(session.removedEntryIds || []);
 41302 |   const baseEntries = (definition.entries || []).filter((entry) => {
 41303 |     if (removed.has(entry.id)) return false;
 41304 |     const category = String(entry.category || "land").toLowerCase();
 41305 |     if (category === "fishing" && !includeFishing) return false;
 41306 |     if (category === "surf" && !includeSurf) return false;
 41307 |     if (entry.enabledByDefault === false && !["fishing", "surf"].includes(category)) return false;
 41308 |     return currentPokemonRuleStatusByName(entry.pokemonName || entry.displayName) !== "Banned";
 41309 |   });
 41310 |   return [...baseEntries, ...(session.temporaryEntries || [])].map((entry) => ({
 41311 |     ...entry,
 41312 |     weight: Math.max(0, Number(session.weightOverrides?.[entry.id] ?? entry.weight ?? 1))
 41313 |   })).filter((entry) => Number(entry.weight) > 0);
 41314 | }
 41315 | 
 41316 | function weightedEncounterEntry(entries) {
 41317 |   const totalWeight = entries.reduce((total, entry) => total + Number(entry.weight || 1), 0);
```


#### Hit 3 — line 41299

```text
 41281 |   state.encounterSessions ||= [];
 41282 |   return state.encounterSessions.filter((session) => ["pending", "review"].includes(session.status));
 41283 | }
 41284 | 
 41285 | function selectedEncounterSession() {
 41286 |   const pending = pendingEncounterSessions();
 41287 |   if (!pending.length) return null;
 41288 |   let session = pending.find((entry) => entry.id === state.selectedEncounterSessionId);
 41289 |   if (!session) {
 41290 |     session = pending[0];
 41291 |     state.selectedEncounterSessionId = session.id;
 41292 |   }
 41293 |   return session;
 41294 | }
 41295 | 
 41296 | function encounterEntriesForSession(session) {
 41297 |   const definition = encounterWheelDefinition(session?.series, session?.gym);
 41298 |   if (!definition) return [];
 41299 |   const includeFishing = Boolean(session.includeFishing);
 41300 |   const includeSurf = Boolean(session.includeSurf);
 41301 |   const removed = new Set(session.removedEntryIds || []);
 41302 |   const baseEntries = (definition.entries || []).filter((entry) => {
 41303 |     if (removed.has(entry.id)) return false;
 41304 |     const category = String(entry.category || "land").toLowerCase();
 41305 |     if (category === "fishing" && !includeFishing) return false;
 41306 |     if (category === "surf" && !includeSurf) return false;
 41307 |     if (entry.enabledByDefault === false && !["fishing", "surf"].includes(category)) return false;
 41308 |     return currentPokemonRuleStatusByName(entry.pokemonName || entry.displayName) !== "Banned";
 41309 |   });
 41310 |   return [...baseEntries, ...(session.temporaryEntries || [])].map((entry) => ({
 41311 |     ...entry,
 41312 |     weight: Math.max(0, Number(session.weightOverrides?.[entry.id] ?? entry.weight ?? 1))
 41313 |   })).filter((entry) => Number(entry.weight) > 0);
 41314 | }
 41315 | 
 41316 | function weightedEncounterEntry(entries) {
 41317 |   const totalWeight = entries.reduce((total, entry) => total + Number(entry.weight || 1), 0);
```


#### Hit 4 — line 41305

```text
 41287 |   if (!pending.length) return null;
 41288 |   let session = pending.find((entry) => entry.id === state.selectedEncounterSessionId);
 41289 |   if (!session) {
 41290 |     session = pending[0];
 41291 |     state.selectedEncounterSessionId = session.id;
 41292 |   }
 41293 |   return session;
 41294 | }
 41295 | 
 41296 | function encounterEntriesForSession(session) {
 41297 |   const definition = encounterWheelDefinition(session?.series, session?.gym);
 41298 |   if (!definition) return [];
 41299 |   const includeFishing = Boolean(session.includeFishing);
 41300 |   const includeSurf = Boolean(session.includeSurf);
 41301 |   const removed = new Set(session.removedEntryIds || []);
 41302 |   const baseEntries = (definition.entries || []).filter((entry) => {
 41303 |     if (removed.has(entry.id)) return false;
 41304 |     const category = String(entry.category || "land").toLowerCase();
 41305 |     if (category === "fishing" && !includeFishing) return false;
 41306 |     if (category === "surf" && !includeSurf) return false;
 41307 |     if (entry.enabledByDefault === false && !["fishing", "surf"].includes(category)) return false;
 41308 |     return currentPokemonRuleStatusByName(entry.pokemonName || entry.displayName) !== "Banned";
 41309 |   });
 41310 |   return [...baseEntries, ...(session.temporaryEntries || [])].map((entry) => ({
 41311 |     ...entry,
 41312 |     weight: Math.max(0, Number(session.weightOverrides?.[entry.id] ?? entry.weight ?? 1))
 41313 |   })).filter((entry) => Number(entry.weight) > 0);
 41314 | }
 41315 | 
 41316 | function weightedEncounterEntry(entries) {
 41317 |   const totalWeight = entries.reduce((total, entry) => total + Number(entry.weight || 1), 0);
 41318 |   if (!entries.length || totalWeight <= 0) return null;
 41319 |   let roll = Math.random() * totalWeight;
 41320 |   for (const entry of entries) {
 41321 |     roll -= Number(entry.weight || 1);
 41322 |     if (roll <= 0) return entry;
 41323 |   }
```


#### Hit 5 — line 42287

```text
 42269 | function updateEncounterActionLog(session, player, updater = null) {
 42270 |   const entry = (state.log || []).find((logEntry) => logEntry.type === "encounter-action"
 42271 |     && (logEntry.encounterSessionId === session.id || logEntry.actionVisitId === session.actionVisitId));
 42272 |   if (!entry) return null;
 42273 |   entry.details ||= [];
 42274 |   entry.childEvents ||= [];
 42275 |   entry.categories ||= [];
 42276 |   entry.tags ||= [];
 42277 |   if (updater) updater(entry);
 42278 |   const rolls = session.rolls || [];
 42279 |   const caughtNames = rolls.map((roll) => {
 42280 |     const result = (state.randomPokemonSessions || []).find((randomSession) => randomSession.id === roll.randomPokemonSessionId);
 42281 |     return result?.status === "confirmed" ? result.resultDisplayName : "";
 42282 |   }).filter(Boolean);
 42283 |   const lines = [
 42284 |     "Spent 1 Action at Encounter",
 42285 |     `Rolled ${rolls.length}/${session.maxRolls || 2} Encounters`,
 42286 |     caughtNames.length ? `Caught ${caughtNames.join(", ")}` : "",
 42287 |     session.includeFishing ? "Fishing included" : "",
 42288 |     session.includeSurf ? "Surf included" : "",
 42289 |     (session.removedEntryIds || []).length ? `Removed ${(session.removedEntryIds || []).length} option${session.removedEntryIds.length === 1 ? "" : "s"}` : ""
 42290 |   ].filter(Boolean);
 42291 |   entry.summary = lines.join("\n");
 42292 |   entry.details = [
 42293 |     `Active pool: ${encounterEntriesForSession(session).map((entry) => entry.displayName || entry.pokemonName).join(", ") || "None"}`,
 42294 |     `Fishing included: ${session.includeFishing ? "Yes" : "No"}`,
 42295 |     `Surf included: ${session.includeSurf ? "Yes" : "No"}`,
 42296 |     ...(session.removedEntryIds || []).map((id) => `Removed: ${id}`),
 42297 |     ...rolls.map((roll, index) => `Roll ${index + 1}: ${roll.resultDisplayName}`)
 42298 |   ];
 42299 |   entry.quantity = rolls.length;
 42300 |   entry.playerIds = [player.id];
 42301 |   entry.encounterSessionId = session.id;
 42302 |   return entry;
 42303 | }
 42304 | 
 42305 | function activeEncounterSessionForPlayer(playerId, series = state.series, gym = state.gym) {
```


#### Hit 6 — line 42287

```text
 42269 | function updateEncounterActionLog(session, player, updater = null) {
 42270 |   const entry = (state.log || []).find((logEntry) => logEntry.type === "encounter-action"
 42271 |     && (logEntry.encounterSessionId === session.id || logEntry.actionVisitId === session.actionVisitId));
 42272 |   if (!entry) return null;
 42273 |   entry.details ||= [];
 42274 |   entry.childEvents ||= [];
 42275 |   entry.categories ||= [];
 42276 |   entry.tags ||= [];
 42277 |   if (updater) updater(entry);
 42278 |   const rolls = session.rolls || [];
 42279 |   const caughtNames = rolls.map((roll) => {
 42280 |     const result = (state.randomPokemonSessions || []).find((randomSession) => randomSession.id === roll.randomPokemonSessionId);
 42281 |     return result?.status === "confirmed" ? result.resultDisplayName : "";
 42282 |   }).filter(Boolean);
 42283 |   const lines = [
 42284 |     "Spent 1 Action at Encounter",
 42285 |     `Rolled ${rolls.length}/${session.maxRolls || 2} Encounters`,
 42286 |     caughtNames.length ? `Caught ${caughtNames.join(", ")}` : "",
 42287 |     session.includeFishing ? "Fishing included" : "",
 42288 |     session.includeSurf ? "Surf included" : "",
 42289 |     (session.removedEntryIds || []).length ? `Removed ${(session.removedEntryIds || []).length} option${session.removedEntryIds.length === 1 ? "" : "s"}` : ""
 42290 |   ].filter(Boolean);
 42291 |   entry.summary = lines.join("\n");
 42292 |   entry.details = [
 42293 |     `Active pool: ${encounterEntriesForSession(session).map((entry) => entry.displayName || entry.pokemonName).join(", ") || "None"}`,
 42294 |     `Fishing included: ${session.includeFishing ? "Yes" : "No"}`,
 42295 |     `Surf included: ${session.includeSurf ? "Yes" : "No"}`,
 42296 |     ...(session.removedEntryIds || []).map((id) => `Removed: ${id}`),
 42297 |     ...rolls.map((roll, index) => `Roll ${index + 1}: ${roll.resultDisplayName}`)
 42298 |   ];
 42299 |   entry.quantity = rolls.length;
 42300 |   entry.playerIds = [player.id];
 42301 |   entry.encounterSessionId = session.id;
 42302 |   return entry;
 42303 | }
 42304 | 
 42305 | function activeEncounterSessionForPlayer(playerId, series = state.series, gym = state.gym) {
```


#### Hit 7 — line 42294

```text
 42276 |   entry.tags ||= [];
 42277 |   if (updater) updater(entry);
 42278 |   const rolls = session.rolls || [];
 42279 |   const caughtNames = rolls.map((roll) => {
 42280 |     const result = (state.randomPokemonSessions || []).find((randomSession) => randomSession.id === roll.randomPokemonSessionId);
 42281 |     return result?.status === "confirmed" ? result.resultDisplayName : "";
 42282 |   }).filter(Boolean);
 42283 |   const lines = [
 42284 |     "Spent 1 Action at Encounter",
 42285 |     `Rolled ${rolls.length}/${session.maxRolls || 2} Encounters`,
 42286 |     caughtNames.length ? `Caught ${caughtNames.join(", ")}` : "",
 42287 |     session.includeFishing ? "Fishing included" : "",
 42288 |     session.includeSurf ? "Surf included" : "",
 42289 |     (session.removedEntryIds || []).length ? `Removed ${(session.removedEntryIds || []).length} option${session.removedEntryIds.length === 1 ? "" : "s"}` : ""
 42290 |   ].filter(Boolean);
 42291 |   entry.summary = lines.join("\n");
 42292 |   entry.details = [
 42293 |     `Active pool: ${encounterEntriesForSession(session).map((entry) => entry.displayName || entry.pokemonName).join(", ") || "None"}`,
 42294 |     `Fishing included: ${session.includeFishing ? "Yes" : "No"}`,
 42295 |     `Surf included: ${session.includeSurf ? "Yes" : "No"}`,
 42296 |     ...(session.removedEntryIds || []).map((id) => `Removed: ${id}`),
 42297 |     ...rolls.map((roll, index) => `Roll ${index + 1}: ${roll.resultDisplayName}`)
 42298 |   ];
 42299 |   entry.quantity = rolls.length;
 42300 |   entry.playerIds = [player.id];
 42301 |   entry.encounterSessionId = session.id;
 42302 |   return entry;
 42303 | }
 42304 | 
 42305 | function activeEncounterSessionForPlayer(playerId, series = state.series, gym = state.gym) {
 42306 |   return (state.encounterSessions || []).find((session) => session.playerId === playerId
 42307 |     && session.series === series
 42308 |     && Number(session.gym) === Number(gym)
 42309 |     && ["pending", "review"].includes(session.status));
 42310 | }
 42311 | 
 42312 | function startEncounterSession({ skipConfirmCheck = false } = {}) {
```


#### Hit 8 — line 42294

```text
 42276 |   entry.tags ||= [];
 42277 |   if (updater) updater(entry);
 42278 |   const rolls = session.rolls || [];
 42279 |   const caughtNames = rolls.map((roll) => {
 42280 |     const result = (state.randomPokemonSessions || []).find((randomSession) => randomSession.id === roll.randomPokemonSessionId);
 42281 |     return result?.status === "confirmed" ? result.resultDisplayName : "";
 42282 |   }).filter(Boolean);
 42283 |   const lines = [
 42284 |     "Spent 1 Action at Encounter",
 42285 |     `Rolled ${rolls.length}/${session.maxRolls || 2} Encounters`,
 42286 |     caughtNames.length ? `Caught ${caughtNames.join(", ")}` : "",
 42287 |     session.includeFishing ? "Fishing included" : "",
 42288 |     session.includeSurf ? "Surf included" : "",
 42289 |     (session.removedEntryIds || []).length ? `Removed ${(session.removedEntryIds || []).length} option${session.removedEntryIds.length === 1 ? "" : "s"}` : ""
 42290 |   ].filter(Boolean);
 42291 |   entry.summary = lines.join("\n");
 42292 |   entry.details = [
 42293 |     `Active pool: ${encounterEntriesForSession(session).map((entry) => entry.displayName || entry.pokemonName).join(", ") || "None"}`,
 42294 |     `Fishing included: ${session.includeFishing ? "Yes" : "No"}`,
 42295 |     `Surf included: ${session.includeSurf ? "Yes" : "No"}`,
 42296 |     ...(session.removedEntryIds || []).map((id) => `Removed: ${id}`),
 42297 |     ...rolls.map((roll, index) => `Roll ${index + 1}: ${roll.resultDisplayName}`)
 42298 |   ];
 42299 |   entry.quantity = rolls.length;
 42300 |   entry.playerIds = [player.id];
 42301 |   entry.encounterSessionId = session.id;
 42302 |   return entry;
 42303 | }
 42304 | 
 42305 | function activeEncounterSessionForPlayer(playerId, series = state.series, gym = state.gym) {
 42306 |   return (state.encounterSessions || []).find((session) => session.playerId === playerId
 42307 |     && session.series === series
 42308 |     && Number(session.gym) === Number(gym)
 42309 |     && ["pending", "review"].includes(session.status));
 42310 | }
 42311 | 
 42312 | function startEncounterSession({ skipConfirmCheck = false } = {}) {
```


#### Hit 9 — line 42369

```text
 42351 |   const reusedSession = Boolean(session);
 42352 |   if (session) {
 42353 |     session.actionVisitIds ||= session.actionVisitId ? [session.actionVisitId] : [];
 42354 |     session.actionVisitIds.push(visit.id);
 42355 |     session.maxRolls = Number(session.maxRolls || 0) + Number(definition.rollsPerAction || 2);
 42356 |     if (session.status === "review") session.status = "pending";
 42357 |     session.updatedAt = new Date().toISOString();
 42358 |   } else {
 42359 |     session = {
 42360 |       id: `encounter-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
 42361 |       playerId: player.id,
 42362 |       series: state.series,
 42363 |       gym: Number(state.gym),
 42364 |       phase: "action",
 42365 |       actionVisitId: visit.id,
 42366 |       actionVisitIds: [visit.id],
 42367 |       wheelId: definition.id,
 42368 |       maxRolls: Number(definition.rollsPerAction || 2),
 42369 |       includeFishing: false,
 42370 |       includeSurf: false,
 42371 |       removedEntryIds: [],
 42372 |       temporaryEntries: [],
 42373 |       weightOverrides: {},
 42374 |       resultSessionIds: [],
 42375 |       rolls: [],
 42376 |       status: "pending",
 42377 |       visualRotation: 0,
 42378 |       createdAt: new Date().toISOString()
 42379 |     };
 42380 |     state.encounterSessions.unshift(session);
 42381 |   }
 42382 |   linkActionOperation(visit.id, { featureType: "encounter", featureSessionId: session.id });
 42383 |   state.selectedEncounterSessionId = session.id;
 42384 |   state.encounterModalOpen = true;
 42385 |   addLogEntry({
 42386 |     action: "phase",
 42387 |     category: "action",
```


#### Hit 10 — line 46710

```text
 46692 |                 ${roll.rosterPokemonId ? `<span class="encounter-result-added">Added</span>` : `
 46693 |                   <button class="buy-button mini-button" type="button" data-encounter-add="${escapeHtml(roll.id)}">Add</button>
 46694 |                   <button class="ghost-button mini-button" type="button" data-encounter-reroll="${escapeHtml(roll.id)}" data-encounter-reroll-mode="result"${rollFreeRerollReasons[roll.id] || rerollTokenCount ? "" : " disabled"} title="${roll.specialEncounter ? `Spend ${player.name}'s Reroll Token to reroll within the Hyperspace sub-wheel.` : rollFreeRerollReasons[roll.id] ? `Free reroll: ${escapeHtml(rollFreeRerollReasons[roll.id])}` : rerollTokenCount ? `Spend ${player.name}'s Reroll Token on this encounter result.` : `${player.name} needs a Reroll Token.`}">${roll.specialEncounter ? "Owner Reroll Hyperspace" : rollFreeRerollReasons[roll.id] ? "Free Reroll" : `Owner Reroll${rerollTokenCount ? ` (${rerollTokenCount})` : ""}`}</button>
 46695 |                   ${roll.specialEncounter ? `<button class="ghost-button mini-button danger-lite" type="button" data-encounter-reroll="${escapeHtml(roll.id)}" data-encounter-reroll-mode="encounter"${rollFreeRerollReasons[roll.id] || rerollTokenCount ? "" : " disabled"} title="${rollFreeRerollReasons[roll.id] ? `Free respin: ${escapeHtml(rollFreeRerollReasons[roll.id])}` : rerollTokenCount ? `Spend ${player.name}'s Reroll Token to respin the original Encounter Wheel result.` : `${player.name} needs a Reroll Token.`}">Owner Respin Encounter</button>` : ""}
 46696 |                 `}
 46697 |               </div>
 46698 |             </article>
 46699 |           `).join("") : `<p class="empty-state compact">Encounter results will appear here.</p>`}
 46700 |         </div>
 46701 |       </section>
 46702 |       <section class="encounter-controls">
 46703 |         <div class="wheel-meta">
 46704 |           <div><span>Trainer</span><strong>${escapeHtml(player.name)}</strong></div>
 46705 |           <div><span>Rolls</span><strong>${rolls.length}/${max}</strong></div>
 46706 |           <div><span>Active Options</span><strong>${entries.length}</strong></div>
 46707 |           <div><span>Rerolls</span><strong>Allowed</strong></div>
 46708 |         </div>
 46709 |         <div class="encounter-toggle-row">
 46710 |           <label><input type="checkbox" data-encounter-toggle="water" ${session.includeFishing || session.includeSurf ? "checked" : ""}> Include Fishing / Surf</label>
 46711 |           <label><input type="checkbox" data-encounter-weight-editing ${weightEditing ? "checked" : ""}${rolls.length ? " disabled" : ""}> Edit Weights</label>
 46712 |         </div>
 46713 |         <p class="gc-rule-note">Fishing and Surf are grouped for now. Later this should come from items/effects.</p>
 46714 |         <h3>Active Wheel Options</h3>
 46715 |         <div class="encounter-entry-list">
 46716 |           ${entries.map((entry) => `
 46717 |             <article class="encounter-entry${entry.id === finalEntryId ? " pointer-active" : ""}" data-encounter-entry-id="${escapeHtml(entry.id)}">
 46718 |               <div>
 46719 |                 <strong>${escapeHtml(entry.displayName || entry.pokemonName)}</strong>
 46720 |                 <span>${escapeHtml(entry.category || "land")}</span>
 46721 |               </div>
 46722 |               ${weightEditing ? `
 46723 |                 <label class="encounter-weight-control">
 46724 |                   Weight
 46725 |                   <input type="number" min="0" step="1" value="${Number(entry.weight || 1)}" data-encounter-weight="${escapeHtml(entry.id)}"${rolls.length ? " disabled" : ""}>
 46726 |                 </label>
 46727 |               ` : `<span class="encounter-weight-badge">W ${Number(entry.weight || 1)}</span>`}
 46728 |               ${entry.removable === false ? "" : `<button class="ghost-button mini-button" type="button" data-encounter-remove="${escapeHtml(entry.id)}"${rolls.length ? " disabled" : ""}>Remove</button>`}
```


#### Hit 11 — line 46710

```text
 46692 |                 ${roll.rosterPokemonId ? `<span class="encounter-result-added">Added</span>` : `
 46693 |                   <button class="buy-button mini-button" type="button" data-encounter-add="${escapeHtml(roll.id)}">Add</button>
 46694 |                   <button class="ghost-button mini-button" type="button" data-encounter-reroll="${escapeHtml(roll.id)}" data-encounter-reroll-mode="result"${rollFreeRerollReasons[roll.id] || rerollTokenCount ? "" : " disabled"} title="${roll.specialEncounter ? `Spend ${player.name}'s Reroll Token to reroll within the Hyperspace sub-wheel.` : rollFreeRerollReasons[roll.id] ? `Free reroll: ${escapeHtml(rollFreeRerollReasons[roll.id])}` : rerollTokenCount ? `Spend ${player.name}'s Reroll Token on this encounter result.` : `${player.name} needs a Reroll Token.`}">${roll.specialEncounter ? "Owner Reroll Hyperspace" : rollFreeRerollReasons[roll.id] ? "Free Reroll" : `Owner Reroll${rerollTokenCount ? ` (${rerollTokenCount})` : ""}`}</button>
 46695 |                   ${roll.specialEncounter ? `<button class="ghost-button mini-button danger-lite" type="button" data-encounter-reroll="${escapeHtml(roll.id)}" data-encounter-reroll-mode="encounter"${rollFreeRerollReasons[roll.id] || rerollTokenCount ? "" : " disabled"} title="${rollFreeRerollReasons[roll.id] ? `Free respin: ${escapeHtml(rollFreeRerollReasons[roll.id])}` : rerollTokenCount ? `Spend ${player.name}'s Reroll Token to respin the original Encounter Wheel result.` : `${player.name} needs a Reroll Token.`}">Owner Respin Encounter</button>` : ""}
 46696 |                 `}
 46697 |               </div>
 46698 |             </article>
 46699 |           `).join("") : `<p class="empty-state compact">Encounter results will appear here.</p>`}
 46700 |         </div>
 46701 |       </section>
 46702 |       <section class="encounter-controls">
 46703 |         <div class="wheel-meta">
 46704 |           <div><span>Trainer</span><strong>${escapeHtml(player.name)}</strong></div>
 46705 |           <div><span>Rolls</span><strong>${rolls.length}/${max}</strong></div>
 46706 |           <div><span>Active Options</span><strong>${entries.length}</strong></div>
 46707 |           <div><span>Rerolls</span><strong>Allowed</strong></div>
 46708 |         </div>
 46709 |         <div class="encounter-toggle-row">
 46710 |           <label><input type="checkbox" data-encounter-toggle="water" ${session.includeFishing || session.includeSurf ? "checked" : ""}> Include Fishing / Surf</label>
 46711 |           <label><input type="checkbox" data-encounter-weight-editing ${weightEditing ? "checked" : ""}${rolls.length ? " disabled" : ""}> Edit Weights</label>
 46712 |         </div>
 46713 |         <p class="gc-rule-note">Fishing and Surf are grouped for now. Later this should come from items/effects.</p>
 46714 |         <h3>Active Wheel Options</h3>
 46715 |         <div class="encounter-entry-list">
 46716 |           ${entries.map((entry) => `
 46717 |             <article class="encounter-entry${entry.id === finalEntryId ? " pointer-active" : ""}" data-encounter-entry-id="${escapeHtml(entry.id)}">
 46718 |               <div>
 46719 |                 <strong>${escapeHtml(entry.displayName || entry.pokemonName)}</strong>
 46720 |                 <span>${escapeHtml(entry.category || "land")}</span>
 46721 |               </div>
 46722 |               ${weightEditing ? `
 46723 |                 <label class="encounter-weight-control">
 46724 |                   Weight
 46725 |                   <input type="number" min="0" step="1" value="${Number(entry.weight || 1)}" data-encounter-weight="${escapeHtml(entry.id)}"${rolls.length ? " disabled" : ""}>
 46726 |                 </label>
 46727 |               ` : `<span class="encounter-weight-badge">W ${Number(entry.weight || 1)}</span>`}
 46728 |               ${entry.removable === false ? "" : `<button class="ghost-button mini-button" type="button" data-encounter-remove="${escapeHtml(entry.id)}"${rolls.length ? " disabled" : ""}>Remove</button>`}
```


#### Hit 12 — line 46713

```text
 46695 |                   ${roll.specialEncounter ? `<button class="ghost-button mini-button danger-lite" type="button" data-encounter-reroll="${escapeHtml(roll.id)}" data-encounter-reroll-mode="encounter"${rollFreeRerollReasons[roll.id] || rerollTokenCount ? "" : " disabled"} title="${rollFreeRerollReasons[roll.id] ? `Free respin: ${escapeHtml(rollFreeRerollReasons[roll.id])}` : rerollTokenCount ? `Spend ${player.name}'s Reroll Token to respin the original Encounter Wheel result.` : `${player.name} needs a Reroll Token.`}">Owner Respin Encounter</button>` : ""}
 46696 |                 `}
 46697 |               </div>
 46698 |             </article>
 46699 |           `).join("") : `<p class="empty-state compact">Encounter results will appear here.</p>`}
 46700 |         </div>
 46701 |       </section>
 46702 |       <section class="encounter-controls">
 46703 |         <div class="wheel-meta">
 46704 |           <div><span>Trainer</span><strong>${escapeHtml(player.name)}</strong></div>
 46705 |           <div><span>Rolls</span><strong>${rolls.length}/${max}</strong></div>
 46706 |           <div><span>Active Options</span><strong>${entries.length}</strong></div>
 46707 |           <div><span>Rerolls</span><strong>Allowed</strong></div>
 46708 |         </div>
 46709 |         <div class="encounter-toggle-row">
 46710 |           <label><input type="checkbox" data-encounter-toggle="water" ${session.includeFishing || session.includeSurf ? "checked" : ""}> Include Fishing / Surf</label>
 46711 |           <label><input type="checkbox" data-encounter-weight-editing ${weightEditing ? "checked" : ""}${rolls.length ? " disabled" : ""}> Edit Weights</label>
 46712 |         </div>
 46713 |         <p class="gc-rule-note">Fishing and Surf are grouped for now. Later this should come from items/effects.</p>
 46714 |         <h3>Active Wheel Options</h3>
 46715 |         <div class="encounter-entry-list">
 46716 |           ${entries.map((entry) => `
 46717 |             <article class="encounter-entry${entry.id === finalEntryId ? " pointer-active" : ""}" data-encounter-entry-id="${escapeHtml(entry.id)}">
 46718 |               <div>
 46719 |                 <strong>${escapeHtml(entry.displayName || entry.pokemonName)}</strong>
 46720 |                 <span>${escapeHtml(entry.category || "land")}</span>
 46721 |               </div>
 46722 |               ${weightEditing ? `
 46723 |                 <label class="encounter-weight-control">
 46724 |                   Weight
 46725 |                   <input type="number" min="0" step="1" value="${Number(entry.weight || 1)}" data-encounter-weight="${escapeHtml(entry.id)}"${rolls.length ? " disabled" : ""}>
 46726 |                 </label>
 46727 |               ` : `<span class="encounter-weight-badge">W ${Number(entry.weight || 1)}</span>`}
 46728 |               ${entry.removable === false ? "" : `<button class="ghost-button mini-button" type="button" data-encounter-remove="${escapeHtml(entry.id)}"${rolls.length ? " disabled" : ""}>Remove</button>`}
 46729 |             </article>
 46730 |           `).join("") || `<p class="empty-state compact">No active entries.</p>`}
 46731 |         </div>
```


#### Hit 13 — line 63247

```text
 63229 |       renderEncounterOverlay();
 63230 |       return;
 63231 |     }
 63232 |     const rollButton = event.target.closest("[data-encounter-roll]");
 63233 |     if (rollButton && !rollButton.disabled) {
 63234 |       spinEncounterWheel(rollButton.dataset.encounterRoll);
 63235 |       return;
 63236 |     }
 63237 |     const doneButton = event.target.closest("[data-encounter-done]");
 63238 |     if (doneButton) {
 63239 |       closeEncounterSession(doneButton.dataset.encounterDone);
 63240 |       return;
 63241 |     }
 63242 |     const toggle = event.target.closest("[data-encounter-toggle]");
 63243 |     if (toggle) {
 63244 |       const session = selectedEncounterSession();
 63245 |       if (!session || (session.rolls || []).length) return;
 63246 |       if (toggle.dataset.encounterToggle === "water") {
 63247 |         session.includeFishing = toggle.checked;
 63248 |         session.includeSurf = toggle.checked;
 63249 |       }
 63250 |       saveState();
 63251 |       renderEncounterOverlay();
 63252 |       return;
 63253 |     }
 63254 |     const weightEditingToggle = event.target.closest("[data-encounter-weight-editing]");
 63255 |     if (weightEditingToggle) {
 63256 |       const session = selectedEncounterSession();
 63257 |       if (!session || (session.rolls || []).length) return;
 63258 |       session.weightEditing = weightEditingToggle.checked;
 63259 |       saveState();
 63260 |       renderEncounterOverlay();
 63261 |       return;
 63262 |     }
 63263 |     const skipAnimationToggle = event.target.closest("[data-encounter-skip-animation]");
 63264 |     if (skipAnimationToggle) {
 63265 |       state.skipWheelAnimation = skipAnimationToggle.checked;
```


### Surf

Occurrences: 30+

#### Hit 1 — line 6073

```text
  6055 |     .replace(/^hyperspace-hole$/i, "hyperspace-hole");
  6056 |   return index ? `${base}-${index + 1}` : base;
  6057 | }
  6058 | 
  6059 | function encounterEntry(name, index = 0) {
  6060 |   const raw = String(name || "").trim();
  6061 |   const isWater = /\s+SF$/i.test(raw);
  6062 |   const displayName = raw.replace(/\s+SF$/i, "").trim();
  6063 |   const id = normalizeEncounterEntryId(displayName, index);
  6064 |   const isHyperspace = normalizePokemonName(displayName) === "hyperspace-hole";
  6065 |   return {
  6066 |     id,
  6067 |     pokemonName: displayName,
  6068 |     displayName,
  6069 |     weight: 1,
  6070 |     category: isWater ? "fishing" : isHyperspace ? "special" : "land",
  6071 |     enabledByDefault: !isWater,
  6072 |     removable: true,
  6073 |     ...(isWater ? { notes: "Fishing / Surf encounter." } : {}),
  6074 |     ...(isHyperspace ? { specialWheelId: "hoenn-hyperspace-hole", notes: "Hoenn-only Hyperspace Hole sub-wheel." } : {})
  6075 |   };
  6076 | }
  6077 | 
  6078 | function makeEncounterWheel(series, gym, names) {
  6079 |   const seen = new Map();
  6080 |   return {
  6081 |     id: `${String(series).toLowerCase()}-gym-${gym}`,
  6082 |     series,
  6083 |     gym,
  6084 |     name: `${series} Gym ${gym} Encounter Wheel`,
  6085 |     rollsPerAction: 2,
  6086 |     rerollable: true,
  6087 |     entries: names.map((name) => {
  6088 |       const key = normalizePokemonName(String(name).replace(/\s+SF$/i, "").trim());
  6089 |       const count = seen.get(key) || 0;
  6090 |       seen.set(key, count + 1);
  6091 |       return encounterEntry(name, count);
```


#### Hit 2 — line 20049

```text
 20031 |   const surfaceLabel = options.surfaceLabel || access.surfaceLabel || "Private Prep";
 20032 |   return `
 20033 |     <section class="private-prep-lock${options.compact ? " compact" : ""}">
 20034 |       <span class="private-prep-lock-mark" aria-hidden="true">RS</span>
 20035 |       <div>
 20036 |         <p class="eyebrow">Profile Locked</p>
 20037 |         <h3>${escapeHtml(surfaceLabel)} Locked</h3>
 20038 |         <p>${escapeHtml(access.reason || `This ${surfaceLabel.toLowerCase()} is private to the linked trainer profile.`)}</p>
 20039 |         <div class="private-prep-lock-meta">
 20040 |           <span>Trainer: <strong>${escapeHtml(access.playerName)}</strong></span>
 20041 |           <span>Owner: <strong>${escapeHtml(access.ownerLabel)}</strong></span>
 20042 |           <span>Current: <strong>${escapeHtml(access.activeProfileLabel)}</strong></span>
 20043 |         </div>
 20044 |       </div>
 20045 |     </section>
 20046 |   `;
 20047 | }
 20048 | 
 20049 | function setPrivateSurfaceControlsDisabled(root, disabled) {
 20050 |   const rootElement = typeof root === "string" ? document.querySelector(root) : root;
 20051 |   if (!rootElement) return;
 20052 |   rootElement.querySelectorAll("button, input, select, textarea").forEach((control) => {
 20053 |     if (control.closest(".private-prep-lock")) return;
 20054 |     control.disabled = Boolean(disabled);
 20055 |   });
 20056 | }
 20057 | 
 20058 | function syncLobbyMembersToTrainerSlots(members = [], { force = false } = {}) {
 20059 |   if (!Array.isArray(members) || !members.length) return false;
 20060 |   state.players ||= cleanPlayerTemplates.map(createCleanPlayer);
 20061 |   let changed = false;
 20062 |   members.slice(0, state.players.length).forEach((member, index) => {
 20063 |     const player = state.players[index];
 20064 |     if (!player) return;
 20065 |     const displayName = String(member.displayName || `Player ${index + 1}`).trim() || `Player ${index + 1}`;
 20066 |     const genericSlotName = !String(player.name || "").trim() || /^Player\s+\d+$/i.test(String(player.name || ""));
 20067 |     if (member.userId && player.siteUserId !== member.userId) {
```


#### Hit 3 — line 30659

```text
 30641 | function syncLiveRefereeDensityClasses() {
 30642 |   const column = els.liveRefereeColumn;
 30643 |   if (!column || state.liveRefereeCollapsed) {
 30644 |     column?.classList.remove("compact", "minimum", "density-compact");
 30645 |     return;
 30646 |   }
 30647 |   const storedWidth = liveRefereeNumber(state.liveRefereeWidth);
 30648 |   const storedHeight = liveRefereeNumber(state.liveRefereeHeight);
 30649 |   const floating = (state.liveRefereeWindowMode || "floating") === "floating";
 30650 |   const width = floating ? (storedWidth ?? column.offsetWidth ?? LIVE_REFEREE_MAX_WIDTH) : (column.offsetWidth || LIVE_REFEREE_MAX_WIDTH);
 30651 |   const effectiveHeight = floating ? storedHeight : els.liveRefereePanel?.offsetHeight;
 30652 |   const compactHeight = effectiveHeight !== null && effectiveHeight !== undefined && effectiveHeight <= 360;
 30653 |   const minimumHeight = effectiveHeight !== null && effectiveHeight !== undefined && effectiveHeight <= 280;
 30654 |   column.classList.toggle("compact", width <= 620 || compactHeight);
 30655 |   column.classList.toggle("minimum", width <= 480 || minimumHeight);
 30656 |   column.classList.toggle("density-compact", state.liveRefereeDensityPreference === "compact");
 30657 | }
 30658 | 
 30659 | function liveRefereeSurfaceType(prompt, screen = liveRefereeCurrentScreen(), resolutionAnnouncement = null) {
 30660 |   if (resolutionAnnouncement || screen === "resolutionResult") return "resolution";
 30661 |   if (["effects", "tokens", "tokenTarget", "deal", "manualEffect"].includes(screen)) return "collection";
 30662 |   if (["history", "host", "chat"].includes(screen)) return "reading";
 30663 |   if (screen === "play" && (!prompt.currentActorPlayerId || (prompt.pendingEvent && (!prompt.responsesAllowed || prompt.priorityComplete)))) return "waiting";
 30664 |   return "decision";
 30665 | }
 30666 | 
 30667 | function liveRefereeSituationPercent(surfaceType) {
 30668 |   if (state.liveRefereeLayoutPreference === "situation") return 78;
 30669 |   if (state.liveRefereeLayoutPreference === "table") return 52;
 30670 |   if (state.liveRefereeLayoutPreference === "manual") return Math.min(82, Math.max(45, Number(state.liveRefereePaneSplit) || 60));
 30671 |   return { collection: 76, reading: 74, resolution: 68, waiting: 52, decision: 60 }[surfaceType] || 60;
 30672 | }
 30673 | 
 30674 | function applyLiveRefereePresentation(surfaceType = "decision") {
 30675 |   const column = els.liveRefereeColumn;
 30676 |   if (!column) return;
 30677 |   const mode = ["floating", "expanded"].includes(state.liveRefereeWindowMode) ? state.liveRefereeWindowMode : "floating";
```


#### Hit 4 — line 30773

```text
 30755 |   column.style.top = `${y}px`;
 30756 |   column.style.right = "auto";
 30757 |   column.style.transform = "none";
 30758 | }
 30759 | 
 30760 | function resetLiveRefereeLayout() {
 30761 |   state.liveRefereeX = "";
 30762 |   state.liveRefereeY = "";
 30763 |   state.liveRefereeWidth = "";
 30764 |   state.liveRefereeHeight = "";
 30765 |   state.liveRefereeWindowMode = "floating";
 30766 |   state.liveRefereeDockSide = "right";
 30767 |   state.liveRefereePaneSplit = "";
 30768 |   state.liveRefereeLayoutPreference = "auto";
 30769 |   state.liveRefereeDensityPreference = "comfortable";
 30770 |   state.liveRefereeUiScale = 1;
 30771 |   state.liveRefereeMotionPreference = "full";
 30772 |   saveClientUiState({ immediate: true });
 30773 |   applyLiveRefereePresentation(els.liveRefereePanel?.dataset.liveRefereeSurface || "decision");
 30774 |   applyLiveRefereeSize();
 30775 |   applyLiveRefereePosition();
 30776 |   syncLiveRefereeDensityClasses();
 30777 |   const resetValues = { windowMode: "floating", dockSide: "right", layout: "auto", density: "comfortable", scale: "1", motion: "full" };
 30778 |   els.liveRefereePanel?.querySelectorAll("[data-live-referee-preference]").forEach((button) => {
 30779 |     const active = button.dataset.liveRefereeValue === resetValues[button.dataset.liveRefereePreference];
 30780 |     button.classList.toggle("active", active);
 30781 |     button.setAttribute("aria-pressed", String(active));
 30782 |   });
 30783 | }
 30784 | 
 30785 | function refreshLiveRefereeViewportFit({ persist = false } = {}) {
 30786 |   const before = {
 30787 |     x: state.liveRefereeX,
 30788 |     y: state.liveRefereeY,
 30789 |     width: state.liveRefereeWidth,
 30790 |     height: state.liveRefereeHeight
 30791 |   };
```


#### Hit 5 — line 32149

```text
 32131 |   const waitingText = prompt.waitingOnPlayerIds?.length
 32132 |     ? prompt.currentPriorityPlayerId
 32133 |       ? `Waiting for ${livePlayerName(prompt.currentPriorityPlayerId)}`
 32134 |       : livePlayerNames(prompt.waitingOnPlayerIds)
 32135 |     : pending
 32136 |       ? "Ready to finalize"
 32137 |       : prompt.currentActorPlayerId
 32138 |         ? actorName
 32139 |         : "No player waiting";
 32140 |   const passableIds = pending && prompt.responsesAllowed
 32141 |     ? (prompt.waitingOnPlayerIds || []).filter((playerId) => playerCanRespondToActivity(pending, playerId))
 32142 |     : [];
 32143 |   const selectedActingId = liveRefereeResponderId(prompt);
 32144 |   const controlAccess = liveRefereeControlAccess(prompt);
 32145 |   const selectedCanRespond = passableIds.includes(selectedActingId);
 32146 |   const waitingCount = prompt.waitingOnPlayerIds?.length || 0;
 32147 |   const whatHappenedText = pending ? liveRefereeWhatHappenedText(prompt) : prompt.body || liveHostNextStepText(prompt);
 32148 |   const refereeScreen = liveRefereeCurrentScreen();
 32149 |   const surfaceType = liveRefereeSurfaceType(prompt, refereeScreen, resolutionAnnouncement);
 32150 |   const screenContext = {
 32151 |     pending,
 32152 |     selectedActingId,
 32153 |     selectedCanRespond,
 32154 |     whatHappenedText,
 32155 |     actorName,
 32156 |     controlAccess
 32157 |   };
 32158 |   const compactPhaseLabel = liveRefereeCompactPhaseLabel(prompt);
 32159 |   const collapsedProgress = liveRefereeCollapsedProgressText(prompt, resolutionAnnouncement);
 32160 |   const hudViewModel = deriveLiveRefereeHudViewModel(prompt, resolutionAnnouncement);
 32161 |   const animatePrompt = liveRefereeShouldAnimatePrompt(prompt);
 32162 |   els.liveRefereeColumn?.classList.toggle("collapsed", collapsed);
 32163 |   els.liveRefereeColumn?.classList.toggle("expanded", !collapsed);
 32164 |   els.liveRefereeColumn?.classList.toggle("pending", Boolean(pending));
 32165 |   els.liveRefereeColumn?.classList.toggle("ready", Boolean(pending && !waitingCount));
 32166 |   els.liveRefereeColumn?.classList.toggle("effect-screen", refereeScreen !== "play");
 32167 |   els.liveRefereePanel.classList.toggle("collapsed", collapsed);
```


#### Hit 6 — line 32172

```text
 32154 |     whatHappenedText,
 32155 |     actorName,
 32156 |     controlAccess
 32157 |   };
 32158 |   const compactPhaseLabel = liveRefereeCompactPhaseLabel(prompt);
 32159 |   const collapsedProgress = liveRefereeCollapsedProgressText(prompt, resolutionAnnouncement);
 32160 |   const hudViewModel = deriveLiveRefereeHudViewModel(prompt, resolutionAnnouncement);
 32161 |   const animatePrompt = liveRefereeShouldAnimatePrompt(prompt);
 32162 |   els.liveRefereeColumn?.classList.toggle("collapsed", collapsed);
 32163 |   els.liveRefereeColumn?.classList.toggle("expanded", !collapsed);
 32164 |   els.liveRefereeColumn?.classList.toggle("pending", Boolean(pending));
 32165 |   els.liveRefereeColumn?.classList.toggle("ready", Boolean(pending && !waitingCount));
 32166 |   els.liveRefereeColumn?.classList.toggle("effect-screen", refereeScreen !== "play");
 32167 |   els.liveRefereePanel.classList.toggle("collapsed", collapsed);
 32168 |   els.liveRefereePanel.classList.toggle("pending", Boolean(pending));
 32169 |   els.liveRefereePanel.classList.toggle("ready", Boolean(pending && !waitingCount));
 32170 |   els.liveRefereePanel.classList.toggle("effect-screen", refereeScreen !== "play");
 32171 |   els.liveRefereePanel.dataset.liveRefereeScreen = refereeScreen;
 32172 |   els.liveRefereePanel.dataset.liveRefereeSurface = surfaceType;
 32173 |   applyLiveRefereePresentation(surfaceType);
 32174 |   if (collapsed) {
 32175 |     els.liveRefereeColumn.hidden = true;
 32176 |     els.liveRefereePanel.replaceChildren();
 32177 |     applyLiveRefereeSize();
 32178 |     applyLiveRefereePosition();
 32179 |     return;
 32180 |   }
 32181 |   els.liveRefereeColumn.hidden = false;
 32182 |   els.liveRefereePanel.innerHTML = `
 32183 |     <header class="live-referee-header">
 32184 |       <div class="live-referee-title" data-live-referee-drag-handle title="Drag Live Referee">
 32185 |         <p class="eyebrow">Live Referee</p>
 32186 |         <h2>${resolutionAnnouncement ? "Result" : pending ? (prompt.currentPriorityPlayerId ? `${escapeHtml(livePlayerName(prompt.currentPriorityPlayerId))}'s Choice` : "Responses Complete") : "No Pending Event"}</h2>
 32187 |       </div>
 32188 |       <div class="live-referee-header-actions">
 32189 |         <span>${escapeHtml(liveRefereeCompactGymCode())} / ${escapeHtml(compactPhaseLabel)}</span>
 32190 |         <button class="ghost-button live-referee-return-control" type="button" data-live-referee-mode-return>Return</button>
```


#### Hit 7 — line 32443

```text
 32425 |   state.liveRefereeLayoutPreference = "manual";
 32426 |   els.liveRefereeColumn?.style.setProperty("--live-referee-situation-percent", `${state.liveRefereePaneSplit}%`);
 32427 | }
 32428 | 
 32429 | function endLiveRefereePaneResize(event) {
 32430 |   if (!liveRefereeSplitResizeState || (liveRefereeSplitResizeState.pointerId !== undefined && event.pointerId !== liveRefereeSplitResizeState.pointerId)) return;
 32431 |   liveRefereeSplitResizeState = null;
 32432 |   saveClientUiState({ immediate: true });
 32433 | }
 32434 | 
 32435 | function setLiveRefereePreference(group, value) {
 32436 |   if (group === "windowMode" && ["floating", "expanded"].includes(value)) state.liveRefereeWindowMode = value;
 32437 |   if (group === "dockSide" && ["right", "left", "bottom"].includes(value)) state.liveRefereeDockSide = value;
 32438 |   if (group === "layout" && ["auto", "situation", "table"].includes(value)) state.liveRefereeLayoutPreference = value;
 32439 |   if (group === "density" && ["comfortable", "compact"].includes(value)) state.liveRefereeDensityPreference = value;
 32440 |   if (group === "scale" && [0.9, 1, 1.1].includes(Number(value))) state.liveRefereeUiScale = Number(value);
 32441 |   if (group === "motion" && ["full", "reduced"].includes(value)) state.liveRefereeMotionPreference = value;
 32442 |   saveClientUiState();
 32443 |   applyLiveRefereePresentation(els.liveRefereePanel?.dataset.liveRefereeSurface || "decision");
 32444 |   applyLiveRefereeSize();
 32445 |   applyLiveRefereePosition();
 32446 |   syncLiveRefereeDensityClasses();
 32447 |   els.liveRefereePanel?.querySelectorAll(`[data-live-referee-preference="${group}"]`).forEach((button) => {
 32448 |     const active = button.dataset.liveRefereeValue === String(value);
 32449 |     button.classList.toggle("active", active);
 32450 |     button.setAttribute("aria-pressed", String(active));
 32451 |   });
 32452 | }
 32453 | 
 32454 | async function handleLiveTableClick(event) {
 32455 |   if (!liveTableEventTarget(event)) return;
 32456 |   const refereeReset = liveClosestEventTarget(event, "[data-live-referee-reset]");
 32457 |   if (refereeReset) {
 32458 |     event.preventDefault();
 32459 |     resetLiveRefereeLayout();
 32460 |     return;
 32461 |   }
```


#### Hit 8 — line 41300

```text
 41282 |   return state.encounterSessions.filter((session) => ["pending", "review"].includes(session.status));
 41283 | }
 41284 | 
 41285 | function selectedEncounterSession() {
 41286 |   const pending = pendingEncounterSessions();
 41287 |   if (!pending.length) return null;
 41288 |   let session = pending.find((entry) => entry.id === state.selectedEncounterSessionId);
 41289 |   if (!session) {
 41290 |     session = pending[0];
 41291 |     state.selectedEncounterSessionId = session.id;
 41292 |   }
 41293 |   return session;
 41294 | }
 41295 | 
 41296 | function encounterEntriesForSession(session) {
 41297 |   const definition = encounterWheelDefinition(session?.series, session?.gym);
 41298 |   if (!definition) return [];
 41299 |   const includeFishing = Boolean(session.includeFishing);
 41300 |   const includeSurf = Boolean(session.includeSurf);
 41301 |   const removed = new Set(session.removedEntryIds || []);
 41302 |   const baseEntries = (definition.entries || []).filter((entry) => {
 41303 |     if (removed.has(entry.id)) return false;
 41304 |     const category = String(entry.category || "land").toLowerCase();
 41305 |     if (category === "fishing" && !includeFishing) return false;
 41306 |     if (category === "surf" && !includeSurf) return false;
 41307 |     if (entry.enabledByDefault === false && !["fishing", "surf"].includes(category)) return false;
 41308 |     return currentPokemonRuleStatusByName(entry.pokemonName || entry.displayName) !== "Banned";
 41309 |   });
 41310 |   return [...baseEntries, ...(session.temporaryEntries || [])].map((entry) => ({
 41311 |     ...entry,
 41312 |     weight: Math.max(0, Number(session.weightOverrides?.[entry.id] ?? entry.weight ?? 1))
 41313 |   })).filter((entry) => Number(entry.weight) > 0);
 41314 | }
 41315 | 
 41316 | function weightedEncounterEntry(entries) {
 41317 |   const totalWeight = entries.reduce((total, entry) => total + Number(entry.weight || 1), 0);
 41318 |   if (!entries.length || totalWeight <= 0) return null;
```


#### Hit 9 — line 41300

```text
 41282 |   return state.encounterSessions.filter((session) => ["pending", "review"].includes(session.status));
 41283 | }
 41284 | 
 41285 | function selectedEncounterSession() {
 41286 |   const pending = pendingEncounterSessions();
 41287 |   if (!pending.length) return null;
 41288 |   let session = pending.find((entry) => entry.id === state.selectedEncounterSessionId);
 41289 |   if (!session) {
 41290 |     session = pending[0];
 41291 |     state.selectedEncounterSessionId = session.id;
 41292 |   }
 41293 |   return session;
 41294 | }
 41295 | 
 41296 | function encounterEntriesForSession(session) {
 41297 |   const definition = encounterWheelDefinition(session?.series, session?.gym);
 41298 |   if (!definition) return [];
 41299 |   const includeFishing = Boolean(session.includeFishing);
 41300 |   const includeSurf = Boolean(session.includeSurf);
 41301 |   const removed = new Set(session.removedEntryIds || []);
 41302 |   const baseEntries = (definition.entries || []).filter((entry) => {
 41303 |     if (removed.has(entry.id)) return false;
 41304 |     const category = String(entry.category || "land").toLowerCase();
 41305 |     if (category === "fishing" && !includeFishing) return false;
 41306 |     if (category === "surf" && !includeSurf) return false;
 41307 |     if (entry.enabledByDefault === false && !["fishing", "surf"].includes(category)) return false;
 41308 |     return currentPokemonRuleStatusByName(entry.pokemonName || entry.displayName) !== "Banned";
 41309 |   });
 41310 |   return [...baseEntries, ...(session.temporaryEntries || [])].map((entry) => ({
 41311 |     ...entry,
 41312 |     weight: Math.max(0, Number(session.weightOverrides?.[entry.id] ?? entry.weight ?? 1))
 41313 |   })).filter((entry) => Number(entry.weight) > 0);
 41314 | }
 41315 | 
 41316 | function weightedEncounterEntry(entries) {
 41317 |   const totalWeight = entries.reduce((total, entry) => total + Number(entry.weight || 1), 0);
 41318 |   if (!entries.length || totalWeight <= 0) return null;
```


#### Hit 10 — line 41306

```text
 41288 |   let session = pending.find((entry) => entry.id === state.selectedEncounterSessionId);
 41289 |   if (!session) {
 41290 |     session = pending[0];
 41291 |     state.selectedEncounterSessionId = session.id;
 41292 |   }
 41293 |   return session;
 41294 | }
 41295 | 
 41296 | function encounterEntriesForSession(session) {
 41297 |   const definition = encounterWheelDefinition(session?.series, session?.gym);
 41298 |   if (!definition) return [];
 41299 |   const includeFishing = Boolean(session.includeFishing);
 41300 |   const includeSurf = Boolean(session.includeSurf);
 41301 |   const removed = new Set(session.removedEntryIds || []);
 41302 |   const baseEntries = (definition.entries || []).filter((entry) => {
 41303 |     if (removed.has(entry.id)) return false;
 41304 |     const category = String(entry.category || "land").toLowerCase();
 41305 |     if (category === "fishing" && !includeFishing) return false;
 41306 |     if (category === "surf" && !includeSurf) return false;
 41307 |     if (entry.enabledByDefault === false && !["fishing", "surf"].includes(category)) return false;
 41308 |     return currentPokemonRuleStatusByName(entry.pokemonName || entry.displayName) !== "Banned";
 41309 |   });
 41310 |   return [...baseEntries, ...(session.temporaryEntries || [])].map((entry) => ({
 41311 |     ...entry,
 41312 |     weight: Math.max(0, Number(session.weightOverrides?.[entry.id] ?? entry.weight ?? 1))
 41313 |   })).filter((entry) => Number(entry.weight) > 0);
 41314 | }
 41315 | 
 41316 | function weightedEncounterEntry(entries) {
 41317 |   const totalWeight = entries.reduce((total, entry) => total + Number(entry.weight || 1), 0);
 41318 |   if (!entries.length || totalWeight <= 0) return null;
 41319 |   let roll = Math.random() * totalWeight;
 41320 |   for (const entry of entries) {
 41321 |     roll -= Number(entry.weight || 1);
 41322 |     if (roll <= 0) return entry;
 41323 |   }
 41324 |   return entries[entries.length - 1];
```


#### Hit 11 — line 42288

```text
 42270 |   const entry = (state.log || []).find((logEntry) => logEntry.type === "encounter-action"
 42271 |     && (logEntry.encounterSessionId === session.id || logEntry.actionVisitId === session.actionVisitId));
 42272 |   if (!entry) return null;
 42273 |   entry.details ||= [];
 42274 |   entry.childEvents ||= [];
 42275 |   entry.categories ||= [];
 42276 |   entry.tags ||= [];
 42277 |   if (updater) updater(entry);
 42278 |   const rolls = session.rolls || [];
 42279 |   const caughtNames = rolls.map((roll) => {
 42280 |     const result = (state.randomPokemonSessions || []).find((randomSession) => randomSession.id === roll.randomPokemonSessionId);
 42281 |     return result?.status === "confirmed" ? result.resultDisplayName : "";
 42282 |   }).filter(Boolean);
 42283 |   const lines = [
 42284 |     "Spent 1 Action at Encounter",
 42285 |     `Rolled ${rolls.length}/${session.maxRolls || 2} Encounters`,
 42286 |     caughtNames.length ? `Caught ${caughtNames.join(", ")}` : "",
 42287 |     session.includeFishing ? "Fishing included" : "",
 42288 |     session.includeSurf ? "Surf included" : "",
 42289 |     (session.removedEntryIds || []).length ? `Removed ${(session.removedEntryIds || []).length} option${session.removedEntryIds.length === 1 ? "" : "s"}` : ""
 42290 |   ].filter(Boolean);
 42291 |   entry.summary = lines.join("\n");
 42292 |   entry.details = [
 42293 |     `Active pool: ${encounterEntriesForSession(session).map((entry) => entry.displayName || entry.pokemonName).join(", ") || "None"}`,
 42294 |     `Fishing included: ${session.includeFishing ? "Yes" : "No"}`,
 42295 |     `Surf included: ${session.includeSurf ? "Yes" : "No"}`,
 42296 |     ...(session.removedEntryIds || []).map((id) => `Removed: ${id}`),
 42297 |     ...rolls.map((roll, index) => `Roll ${index + 1}: ${roll.resultDisplayName}`)
 42298 |   ];
 42299 |   entry.quantity = rolls.length;
 42300 |   entry.playerIds = [player.id];
 42301 |   entry.encounterSessionId = session.id;
 42302 |   return entry;
 42303 | }
 42304 | 
 42305 | function activeEncounterSessionForPlayer(playerId, series = state.series, gym = state.gym) {
 42306 |   return (state.encounterSessions || []).find((session) => session.playerId === playerId
```


#### Hit 12 — line 42288

```text
 42270 |   const entry = (state.log || []).find((logEntry) => logEntry.type === "encounter-action"
 42271 |     && (logEntry.encounterSessionId === session.id || logEntry.actionVisitId === session.actionVisitId));
 42272 |   if (!entry) return null;
 42273 |   entry.details ||= [];
 42274 |   entry.childEvents ||= [];
 42275 |   entry.categories ||= [];
 42276 |   entry.tags ||= [];
 42277 |   if (updater) updater(entry);
 42278 |   const rolls = session.rolls || [];
 42279 |   const caughtNames = rolls.map((roll) => {
 42280 |     const result = (state.randomPokemonSessions || []).find((randomSession) => randomSession.id === roll.randomPokemonSessionId);
 42281 |     return result?.status === "confirmed" ? result.resultDisplayName : "";
 42282 |   }).filter(Boolean);
 42283 |   const lines = [
 42284 |     "Spent 1 Action at Encounter",
 42285 |     `Rolled ${rolls.length}/${session.maxRolls || 2} Encounters`,
 42286 |     caughtNames.length ? `Caught ${caughtNames.join(", ")}` : "",
 42287 |     session.includeFishing ? "Fishing included" : "",
 42288 |     session.includeSurf ? "Surf included" : "",
 42289 |     (session.removedEntryIds || []).length ? `Removed ${(session.removedEntryIds || []).length} option${session.removedEntryIds.length === 1 ? "" : "s"}` : ""
 42290 |   ].filter(Boolean);
 42291 |   entry.summary = lines.join("\n");
 42292 |   entry.details = [
 42293 |     `Active pool: ${encounterEntriesForSession(session).map((entry) => entry.displayName || entry.pokemonName).join(", ") || "None"}`,
 42294 |     `Fishing included: ${session.includeFishing ? "Yes" : "No"}`,
 42295 |     `Surf included: ${session.includeSurf ? "Yes" : "No"}`,
 42296 |     ...(session.removedEntryIds || []).map((id) => `Removed: ${id}`),
 42297 |     ...rolls.map((roll, index) => `Roll ${index + 1}: ${roll.resultDisplayName}`)
 42298 |   ];
 42299 |   entry.quantity = rolls.length;
 42300 |   entry.playerIds = [player.id];
 42301 |   entry.encounterSessionId = session.id;
 42302 |   return entry;
 42303 | }
 42304 | 
 42305 | function activeEncounterSessionForPlayer(playerId, series = state.series, gym = state.gym) {
 42306 |   return (state.encounterSessions || []).find((session) => session.playerId === playerId
```


#### Hit 13 — line 42295

```text
 42277 |   if (updater) updater(entry);
 42278 |   const rolls = session.rolls || [];
 42279 |   const caughtNames = rolls.map((roll) => {
 42280 |     const result = (state.randomPokemonSessions || []).find((randomSession) => randomSession.id === roll.randomPokemonSessionId);
 42281 |     return result?.status === "confirmed" ? result.resultDisplayName : "";
 42282 |   }).filter(Boolean);
 42283 |   const lines = [
 42284 |     "Spent 1 Action at Encounter",
 42285 |     `Rolled ${rolls.length}/${session.maxRolls || 2} Encounters`,
 42286 |     caughtNames.length ? `Caught ${caughtNames.join(", ")}` : "",
 42287 |     session.includeFishing ? "Fishing included" : "",
 42288 |     session.includeSurf ? "Surf included" : "",
 42289 |     (session.removedEntryIds || []).length ? `Removed ${(session.removedEntryIds || []).length} option${session.removedEntryIds.length === 1 ? "" : "s"}` : ""
 42290 |   ].filter(Boolean);
 42291 |   entry.summary = lines.join("\n");
 42292 |   entry.details = [
 42293 |     `Active pool: ${encounterEntriesForSession(session).map((entry) => entry.displayName || entry.pokemonName).join(", ") || "None"}`,
 42294 |     `Fishing included: ${session.includeFishing ? "Yes" : "No"}`,
 42295 |     `Surf included: ${session.includeSurf ? "Yes" : "No"}`,
 42296 |     ...(session.removedEntryIds || []).map((id) => `Removed: ${id}`),
 42297 |     ...rolls.map((roll, index) => `Roll ${index + 1}: ${roll.resultDisplayName}`)
 42298 |   ];
 42299 |   entry.quantity = rolls.length;
 42300 |   entry.playerIds = [player.id];
 42301 |   entry.encounterSessionId = session.id;
 42302 |   return entry;
 42303 | }
 42304 | 
 42305 | function activeEncounterSessionForPlayer(playerId, series = state.series, gym = state.gym) {
 42306 |   return (state.encounterSessions || []).find((session) => session.playerId === playerId
 42307 |     && session.series === series
 42308 |     && Number(session.gym) === Number(gym)
 42309 |     && ["pending", "review"].includes(session.status));
 42310 | }
 42311 | 
 42312 | function startEncounterSession({ skipConfirmCheck = false } = {}) {
 42313 |   const player = activePlayer();
```


#### Hit 14 — line 42295

```text
 42277 |   if (updater) updater(entry);
 42278 |   const rolls = session.rolls || [];
 42279 |   const caughtNames = rolls.map((roll) => {
 42280 |     const result = (state.randomPokemonSessions || []).find((randomSession) => randomSession.id === roll.randomPokemonSessionId);
 42281 |     return result?.status === "confirmed" ? result.resultDisplayName : "";
 42282 |   }).filter(Boolean);
 42283 |   const lines = [
 42284 |     "Spent 1 Action at Encounter",
 42285 |     `Rolled ${rolls.length}/${session.maxRolls || 2} Encounters`,
 42286 |     caughtNames.length ? `Caught ${caughtNames.join(", ")}` : "",
 42287 |     session.includeFishing ? "Fishing included" : "",
 42288 |     session.includeSurf ? "Surf included" : "",
 42289 |     (session.removedEntryIds || []).length ? `Removed ${(session.removedEntryIds || []).length} option${session.removedEntryIds.length === 1 ? "" : "s"}` : ""
 42290 |   ].filter(Boolean);
 42291 |   entry.summary = lines.join("\n");
 42292 |   entry.details = [
 42293 |     `Active pool: ${encounterEntriesForSession(session).map((entry) => entry.displayName || entry.pokemonName).join(", ") || "None"}`,
 42294 |     `Fishing included: ${session.includeFishing ? "Yes" : "No"}`,
 42295 |     `Surf included: ${session.includeSurf ? "Yes" : "No"}`,
 42296 |     ...(session.removedEntryIds || []).map((id) => `Removed: ${id}`),
 42297 |     ...rolls.map((roll, index) => `Roll ${index + 1}: ${roll.resultDisplayName}`)
 42298 |   ];
 42299 |   entry.quantity = rolls.length;
 42300 |   entry.playerIds = [player.id];
 42301 |   entry.encounterSessionId = session.id;
 42302 |   return entry;
 42303 | }
 42304 | 
 42305 | function activeEncounterSessionForPlayer(playerId, series = state.series, gym = state.gym) {
 42306 |   return (state.encounterSessions || []).find((session) => session.playerId === playerId
 42307 |     && session.series === series
 42308 |     && Number(session.gym) === Number(gym)
 42309 |     && ["pending", "review"].includes(session.status));
 42310 | }
 42311 | 
 42312 | function startEncounterSession({ skipConfirmCheck = false } = {}) {
 42313 |   const player = activePlayer();
```


#### Hit 15 — line 42370

```text
 42352 |   if (session) {
 42353 |     session.actionVisitIds ||= session.actionVisitId ? [session.actionVisitId] : [];
 42354 |     session.actionVisitIds.push(visit.id);
 42355 |     session.maxRolls = Number(session.maxRolls || 0) + Number(definition.rollsPerAction || 2);
 42356 |     if (session.status === "review") session.status = "pending";
 42357 |     session.updatedAt = new Date().toISOString();
 42358 |   } else {
 42359 |     session = {
 42360 |       id: `encounter-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
 42361 |       playerId: player.id,
 42362 |       series: state.series,
 42363 |       gym: Number(state.gym),
 42364 |       phase: "action",
 42365 |       actionVisitId: visit.id,
 42366 |       actionVisitIds: [visit.id],
 42367 |       wheelId: definition.id,
 42368 |       maxRolls: Number(definition.rollsPerAction || 2),
 42369 |       includeFishing: false,
 42370 |       includeSurf: false,
 42371 |       removedEntryIds: [],
 42372 |       temporaryEntries: [],
 42373 |       weightOverrides: {},
 42374 |       resultSessionIds: [],
 42375 |       rolls: [],
 42376 |       status: "pending",
 42377 |       visualRotation: 0,
 42378 |       createdAt: new Date().toISOString()
 42379 |     };
 42380 |     state.encounterSessions.unshift(session);
 42381 |   }
 42382 |   linkActionOperation(visit.id, { featureType: "encounter", featureSessionId: session.id });
 42383 |   state.selectedEncounterSessionId = session.id;
 42384 |   state.encounterModalOpen = true;
 42385 |   addLogEntry({
 42386 |     action: "phase",
 42387 |     category: "action",
 42388 |     player: player.name,
```


#### Hit 16 — line 46710

```text
 46692 |                 ${roll.rosterPokemonId ? `<span class="encounter-result-added">Added</span>` : `
 46693 |                   <button class="buy-button mini-button" type="button" data-encounter-add="${escapeHtml(roll.id)}">Add</button>
 46694 |                   <button class="ghost-button mini-button" type="button" data-encounter-reroll="${escapeHtml(roll.id)}" data-encounter-reroll-mode="result"${rollFreeRerollReasons[roll.id] || rerollTokenCount ? "" : " disabled"} title="${roll.specialEncounter ? `Spend ${player.name}'s Reroll Token to reroll within the Hyperspace sub-wheel.` : rollFreeRerollReasons[roll.id] ? `Free reroll: ${escapeHtml(rollFreeRerollReasons[roll.id])}` : rerollTokenCount ? `Spend ${player.name}'s Reroll Token on this encounter result.` : `${player.name} needs a Reroll Token.`}">${roll.specialEncounter ? "Owner Reroll Hyperspace" : rollFreeRerollReasons[roll.id] ? "Free Reroll" : `Owner Reroll${rerollTokenCount ? ` (${rerollTokenCount})` : ""}`}</button>
 46695 |                   ${roll.specialEncounter ? `<button class="ghost-button mini-button danger-lite" type="button" data-encounter-reroll="${escapeHtml(roll.id)}" data-encounter-reroll-mode="encounter"${rollFreeRerollReasons[roll.id] || rerollTokenCount ? "" : " disabled"} title="${rollFreeRerollReasons[roll.id] ? `Free respin: ${escapeHtml(rollFreeRerollReasons[roll.id])}` : rerollTokenCount ? `Spend ${player.name}'s Reroll Token to respin the original Encounter Wheel result.` : `${player.name} needs a Reroll Token.`}">Owner Respin Encounter</button>` : ""}
 46696 |                 `}
 46697 |               </div>
 46698 |             </article>
 46699 |           `).join("") : `<p class="empty-state compact">Encounter results will appear here.</p>`}
 46700 |         </div>
 46701 |       </section>
 46702 |       <section class="encounter-controls">
 46703 |         <div class="wheel-meta">
 46704 |           <div><span>Trainer</span><strong>${escapeHtml(player.name)}</strong></div>
 46705 |           <div><span>Rolls</span><strong>${rolls.length}/${max}</strong></div>
 46706 |           <div><span>Active Options</span><strong>${entries.length}</strong></div>
 46707 |           <div><span>Rerolls</span><strong>Allowed</strong></div>
 46708 |         </div>
 46709 |         <div class="encounter-toggle-row">
 46710 |           <label><input type="checkbox" data-encounter-toggle="water" ${session.includeFishing || session.includeSurf ? "checked" : ""}> Include Fishing / Surf</label>
 46711 |           <label><input type="checkbox" data-encounter-weight-editing ${weightEditing ? "checked" : ""}${rolls.length ? " disabled" : ""}> Edit Weights</label>
 46712 |         </div>
 46713 |         <p class="gc-rule-note">Fishing and Surf are grouped for now. Later this should come from items/effects.</p>
 46714 |         <h3>Active Wheel Options</h3>
 46715 |         <div class="encounter-entry-list">
 46716 |           ${entries.map((entry) => `
 46717 |             <article class="encounter-entry${entry.id === finalEntryId ? " pointer-active" : ""}" data-encounter-entry-id="${escapeHtml(entry.id)}">
 46718 |               <div>
 46719 |                 <strong>${escapeHtml(entry.displayName || entry.pokemonName)}</strong>
 46720 |                 <span>${escapeHtml(entry.category || "land")}</span>
 46721 |               </div>
 46722 |               ${weightEditing ? `
 46723 |                 <label class="encounter-weight-control">
 46724 |                   Weight
 46725 |                   <input type="number" min="0" step="1" value="${Number(entry.weight || 1)}" data-encounter-weight="${escapeHtml(entry.id)}"${rolls.length ? " disabled" : ""}>
 46726 |                 </label>
 46727 |               ` : `<span class="encounter-weight-badge">W ${Number(entry.weight || 1)}</span>`}
 46728 |               ${entry.removable === false ? "" : `<button class="ghost-button mini-button" type="button" data-encounter-remove="${escapeHtml(entry.id)}"${rolls.length ? " disabled" : ""}>Remove</button>`}
```


#### Hit 17 — line 46710

```text
 46692 |                 ${roll.rosterPokemonId ? `<span class="encounter-result-added">Added</span>` : `
 46693 |                   <button class="buy-button mini-button" type="button" data-encounter-add="${escapeHtml(roll.id)}">Add</button>
 46694 |                   <button class="ghost-button mini-button" type="button" data-encounter-reroll="${escapeHtml(roll.id)}" data-encounter-reroll-mode="result"${rollFreeRerollReasons[roll.id] || rerollTokenCount ? "" : " disabled"} title="${roll.specialEncounter ? `Spend ${player.name}'s Reroll Token to reroll within the Hyperspace sub-wheel.` : rollFreeRerollReasons[roll.id] ? `Free reroll: ${escapeHtml(rollFreeRerollReasons[roll.id])}` : rerollTokenCount ? `Spend ${player.name}'s Reroll Token on this encounter result.` : `${player.name} needs a Reroll Token.`}">${roll.specialEncounter ? "Owner Reroll Hyperspace" : rollFreeRerollReasons[roll.id] ? "Free Reroll" : `Owner Reroll${rerollTokenCount ? ` (${rerollTokenCount})` : ""}`}</button>
 46695 |                   ${roll.specialEncounter ? `<button class="ghost-button mini-button danger-lite" type="button" data-encounter-reroll="${escapeHtml(roll.id)}" data-encounter-reroll-mode="encounter"${rollFreeRerollReasons[roll.id] || rerollTokenCount ? "" : " disabled"} title="${rollFreeRerollReasons[roll.id] ? `Free respin: ${escapeHtml(rollFreeRerollReasons[roll.id])}` : rerollTokenCount ? `Spend ${player.name}'s Reroll Token to respin the original Encounter Wheel result.` : `${player.name} needs a Reroll Token.`}">Owner Respin Encounter</button>` : ""}
 46696 |                 `}
 46697 |               </div>
 46698 |             </article>
 46699 |           `).join("") : `<p class="empty-state compact">Encounter results will appear here.</p>`}
 46700 |         </div>
 46701 |       </section>
 46702 |       <section class="encounter-controls">
 46703 |         <div class="wheel-meta">
 46704 |           <div><span>Trainer</span><strong>${escapeHtml(player.name)}</strong></div>
 46705 |           <div><span>Rolls</span><strong>${rolls.length}/${max}</strong></div>
 46706 |           <div><span>Active Options</span><strong>${entries.length}</strong></div>
 46707 |           <div><span>Rerolls</span><strong>Allowed</strong></div>
 46708 |         </div>
 46709 |         <div class="encounter-toggle-row">
 46710 |           <label><input type="checkbox" data-encounter-toggle="water" ${session.includeFishing || session.includeSurf ? "checked" : ""}> Include Fishing / Surf</label>
 46711 |           <label><input type="checkbox" data-encounter-weight-editing ${weightEditing ? "checked" : ""}${rolls.length ? " disabled" : ""}> Edit Weights</label>
 46712 |         </div>
 46713 |         <p class="gc-rule-note">Fishing and Surf are grouped for now. Later this should come from items/effects.</p>
 46714 |         <h3>Active Wheel Options</h3>
 46715 |         <div class="encounter-entry-list">
 46716 |           ${entries.map((entry) => `
 46717 |             <article class="encounter-entry${entry.id === finalEntryId ? " pointer-active" : ""}" data-encounter-entry-id="${escapeHtml(entry.id)}">
 46718 |               <div>
 46719 |                 <strong>${escapeHtml(entry.displayName || entry.pokemonName)}</strong>
 46720 |                 <span>${escapeHtml(entry.category || "land")}</span>
 46721 |               </div>
 46722 |               ${weightEditing ? `
 46723 |                 <label class="encounter-weight-control">
 46724 |                   Weight
 46725 |                   <input type="number" min="0" step="1" value="${Number(entry.weight || 1)}" data-encounter-weight="${escapeHtml(entry.id)}"${rolls.length ? " disabled" : ""}>
 46726 |                 </label>
 46727 |               ` : `<span class="encounter-weight-badge">W ${Number(entry.weight || 1)}</span>`}
 46728 |               ${entry.removable === false ? "" : `<button class="ghost-button mini-button" type="button" data-encounter-remove="${escapeHtml(entry.id)}"${rolls.length ? " disabled" : ""}>Remove</button>`}
```


#### Hit 18 — line 46713

```text
 46695 |                   ${roll.specialEncounter ? `<button class="ghost-button mini-button danger-lite" type="button" data-encounter-reroll="${escapeHtml(roll.id)}" data-encounter-reroll-mode="encounter"${rollFreeRerollReasons[roll.id] || rerollTokenCount ? "" : " disabled"} title="${rollFreeRerollReasons[roll.id] ? `Free respin: ${escapeHtml(rollFreeRerollReasons[roll.id])}` : rerollTokenCount ? `Spend ${player.name}'s Reroll Token to respin the original Encounter Wheel result.` : `${player.name} needs a Reroll Token.`}">Owner Respin Encounter</button>` : ""}
 46696 |                 `}
 46697 |               </div>
 46698 |             </article>
 46699 |           `).join("") : `<p class="empty-state compact">Encounter results will appear here.</p>`}
 46700 |         </div>
 46701 |       </section>
 46702 |       <section class="encounter-controls">
 46703 |         <div class="wheel-meta">
 46704 |           <div><span>Trainer</span><strong>${escapeHtml(player.name)}</strong></div>
 46705 |           <div><span>Rolls</span><strong>${rolls.length}/${max}</strong></div>
 46706 |           <div><span>Active Options</span><strong>${entries.length}</strong></div>
 46707 |           <div><span>Rerolls</span><strong>Allowed</strong></div>
 46708 |         </div>
 46709 |         <div class="encounter-toggle-row">
 46710 |           <label><input type="checkbox" data-encounter-toggle="water" ${session.includeFishing || session.includeSurf ? "checked" : ""}> Include Fishing / Surf</label>
 46711 |           <label><input type="checkbox" data-encounter-weight-editing ${weightEditing ? "checked" : ""}${rolls.length ? " disabled" : ""}> Edit Weights</label>
 46712 |         </div>
 46713 |         <p class="gc-rule-note">Fishing and Surf are grouped for now. Later this should come from items/effects.</p>
 46714 |         <h3>Active Wheel Options</h3>
 46715 |         <div class="encounter-entry-list">
 46716 |           ${entries.map((entry) => `
 46717 |             <article class="encounter-entry${entry.id === finalEntryId ? " pointer-active" : ""}" data-encounter-entry-id="${escapeHtml(entry.id)}">
 46718 |               <div>
 46719 |                 <strong>${escapeHtml(entry.displayName || entry.pokemonName)}</strong>
 46720 |                 <span>${escapeHtml(entry.category || "land")}</span>
 46721 |               </div>
 46722 |               ${weightEditing ? `
 46723 |                 <label class="encounter-weight-control">
 46724 |                   Weight
 46725 |                   <input type="number" min="0" step="1" value="${Number(entry.weight || 1)}" data-encounter-weight="${escapeHtml(entry.id)}"${rolls.length ? " disabled" : ""}>
 46726 |                 </label>
 46727 |               ` : `<span class="encounter-weight-badge">W ${Number(entry.weight || 1)}</span>`}
 46728 |               ${entry.removable === false ? "" : `<button class="ghost-button mini-button" type="button" data-encounter-remove="${escapeHtml(entry.id)}"${rolls.length ? " disabled" : ""}>Remove</button>`}
 46729 |             </article>
 46730 |           `).join("") || `<p class="empty-state compact">No active entries.</p>`}
 46731 |         </div>
```


#### Hit 19 — line 49688

```text
 49670 |   renderActivityToasts();
 49671 |   renderActivityResponseDrawer();
 49672 |   renderLiveRefereePanel();
 49673 |   renderOpponentDrawer();
 49674 |   renderCart();
 49675 |   renderEncounterOverlay();
 49676 |   renderWheelPanel();
 49677 |   renderRandomPokemonPanel();
 49678 |   renderSiteShell();
 49679 |   syncTokenSandboxBanner();
 49680 |   if (actionPhaseStateRepairQueued && !backendSync.applyingRemote && !tokenScenarioSandboxActive()) {
 49681 |     actionPhaseStateRepairQueued = false;
 49682 |     saveState({ immediate: true, immediateBackend: true });
 49683 |   }
 49684 | }
 49685 | 
 49686 | function applyShopTheme(root, colors, contrast) {
 49687 |   const onBrand = colors.onBrand || "#ffffff";
 49688 |   const lightSurface = relativeLuminance(colors.surface) >= 0.62;
 49689 |   const shopPageBg = lightSurface
 49690 |     ? `linear-gradient(180deg, color-mix(in srgb, ${colors.surface} 88%, ${colors.brand} 12%), color-mix(in srgb, ${colors.surface} 94%, ${colors.bg} 6%))`
 49691 |     : `linear-gradient(180deg, color-mix(in srgb, ${colors.bg} 86%, ${colors.brand} 14%), ${colors.bg})`;
 49692 |   const shopPanelBg = lightSurface
 49693 |     ? `color-mix(in srgb, ${colors.surface} 88%, ${colors.brand} 12%)`
 49694 |     : `color-mix(in srgb, ${colors.surface} 88%, ${colors.brand} 12%)`;
 49695 |   const shopPanelBgStrong = lightSurface
 49696 |     ? `color-mix(in srgb, ${colors.surface} 82%, ${colors.brand} 18%)`
 49697 |     : `color-mix(in srgb, ${colors.surface2} 82%, ${colors.brand} 18%)`;
 49698 |   const shopSectionHeaderBg = lightSurface
 49699 |     ? `color-mix(in srgb, ${colors.surface} 86%, ${colors.brand} 14%)`
 49700 |     : `color-mix(in srgb, ${colors.surface2} 86%, ${colors.brand} 14%)`;
 49701 |   const shopCardBg = lightSurface
 49702 |     ? `color-mix(in srgb, ${colors.surface} 95%, ${colors.brand} 5%)`
 49703 |     : colors.surface;
 49704 |   const shopCardBgAccent = lightSurface
 49705 |     ? `color-mix(in srgb, ${colors.surface} 90%, ${colors.brand} 10%)`
 49706 |     : `color-mix(in srgb, ${colors.surface} 86%, ${colors.brand} 14%)`;
```


#### Hit 20 — line 49689

```text
 49671 |   renderActivityResponseDrawer();
 49672 |   renderLiveRefereePanel();
 49673 |   renderOpponentDrawer();
 49674 |   renderCart();
 49675 |   renderEncounterOverlay();
 49676 |   renderWheelPanel();
 49677 |   renderRandomPokemonPanel();
 49678 |   renderSiteShell();
 49679 |   syncTokenSandboxBanner();
 49680 |   if (actionPhaseStateRepairQueued && !backendSync.applyingRemote && !tokenScenarioSandboxActive()) {
 49681 |     actionPhaseStateRepairQueued = false;
 49682 |     saveState({ immediate: true, immediateBackend: true });
 49683 |   }
 49684 | }
 49685 | 
 49686 | function applyShopTheme(root, colors, contrast) {
 49687 |   const onBrand = colors.onBrand || "#ffffff";
 49688 |   const lightSurface = relativeLuminance(colors.surface) >= 0.62;
 49689 |   const shopPageBg = lightSurface
 49690 |     ? `linear-gradient(180deg, color-mix(in srgb, ${colors.surface} 88%, ${colors.brand} 12%), color-mix(in srgb, ${colors.surface} 94%, ${colors.bg} 6%))`
 49691 |     : `linear-gradient(180deg, color-mix(in srgb, ${colors.bg} 86%, ${colors.brand} 14%), ${colors.bg})`;
 49692 |   const shopPanelBg = lightSurface
 49693 |     ? `color-mix(in srgb, ${colors.surface} 88%, ${colors.brand} 12%)`
 49694 |     : `color-mix(in srgb, ${colors.surface} 88%, ${colors.brand} 12%)`;
 49695 |   const shopPanelBgStrong = lightSurface
 49696 |     ? `color-mix(in srgb, ${colors.surface} 82%, ${colors.brand} 18%)`
 49697 |     : `color-mix(in srgb, ${colors.surface2} 82%, ${colors.brand} 18%)`;
 49698 |   const shopSectionHeaderBg = lightSurface
 49699 |     ? `color-mix(in srgb, ${colors.surface} 86%, ${colors.brand} 14%)`
 49700 |     : `color-mix(in srgb, ${colors.surface2} 86%, ${colors.brand} 14%)`;
 49701 |   const shopCardBg = lightSurface
 49702 |     ? `color-mix(in srgb, ${colors.surface} 95%, ${colors.brand} 5%)`
 49703 |     : colors.surface;
 49704 |   const shopCardBgAccent = lightSurface
 49705 |     ? `color-mix(in srgb, ${colors.surface} 90%, ${colors.brand} 10%)`
 49706 |     : `color-mix(in srgb, ${colors.surface} 86%, ${colors.brand} 14%)`;
 49707 |   const shopInputBg = lightSurface
```


#### Hit 21 — line 49692

```text
 49674 |   renderCart();
 49675 |   renderEncounterOverlay();
 49676 |   renderWheelPanel();
 49677 |   renderRandomPokemonPanel();
 49678 |   renderSiteShell();
 49679 |   syncTokenSandboxBanner();
 49680 |   if (actionPhaseStateRepairQueued && !backendSync.applyingRemote && !tokenScenarioSandboxActive()) {
 49681 |     actionPhaseStateRepairQueued = false;
 49682 |     saveState({ immediate: true, immediateBackend: true });
 49683 |   }
 49684 | }
 49685 | 
 49686 | function applyShopTheme(root, colors, contrast) {
 49687 |   const onBrand = colors.onBrand || "#ffffff";
 49688 |   const lightSurface = relativeLuminance(colors.surface) >= 0.62;
 49689 |   const shopPageBg = lightSurface
 49690 |     ? `linear-gradient(180deg, color-mix(in srgb, ${colors.surface} 88%, ${colors.brand} 12%), color-mix(in srgb, ${colors.surface} 94%, ${colors.bg} 6%))`
 49691 |     : `linear-gradient(180deg, color-mix(in srgb, ${colors.bg} 86%, ${colors.brand} 14%), ${colors.bg})`;
 49692 |   const shopPanelBg = lightSurface
 49693 |     ? `color-mix(in srgb, ${colors.surface} 88%, ${colors.brand} 12%)`
 49694 |     : `color-mix(in srgb, ${colors.surface} 88%, ${colors.brand} 12%)`;
 49695 |   const shopPanelBgStrong = lightSurface
 49696 |     ? `color-mix(in srgb, ${colors.surface} 82%, ${colors.brand} 18%)`
 49697 |     : `color-mix(in srgb, ${colors.surface2} 82%, ${colors.brand} 18%)`;
 49698 |   const shopSectionHeaderBg = lightSurface
 49699 |     ? `color-mix(in srgb, ${colors.surface} 86%, ${colors.brand} 14%)`
 49700 |     : `color-mix(in srgb, ${colors.surface2} 86%, ${colors.brand} 14%)`;
 49701 |   const shopCardBg = lightSurface
 49702 |     ? `color-mix(in srgb, ${colors.surface} 95%, ${colors.brand} 5%)`
 49703 |     : colors.surface;
 49704 |   const shopCardBgAccent = lightSurface
 49705 |     ? `color-mix(in srgb, ${colors.surface} 90%, ${colors.brand} 10%)`
 49706 |     : `color-mix(in srgb, ${colors.surface} 86%, ${colors.brand} 14%)`;
 49707 |   const shopInputBg = lightSurface
 49708 |     ? `color-mix(in srgb, ${colors.surface} 92%, ${colors.brand} 8%)`
 49709 |     : `color-mix(in srgb, ${colors.surface} 86%, ${colors.bg} 14%)`;
 49710 |   const shopBorder = lightSurface
```


#### Hit 22 — line 49695

```text
 49677 |   renderRandomPokemonPanel();
 49678 |   renderSiteShell();
 49679 |   syncTokenSandboxBanner();
 49680 |   if (actionPhaseStateRepairQueued && !backendSync.applyingRemote && !tokenScenarioSandboxActive()) {
 49681 |     actionPhaseStateRepairQueued = false;
 49682 |     saveState({ immediate: true, immediateBackend: true });
 49683 |   }
 49684 | }
 49685 | 
 49686 | function applyShopTheme(root, colors, contrast) {
 49687 |   const onBrand = colors.onBrand || "#ffffff";
 49688 |   const lightSurface = relativeLuminance(colors.surface) >= 0.62;
 49689 |   const shopPageBg = lightSurface
 49690 |     ? `linear-gradient(180deg, color-mix(in srgb, ${colors.surface} 88%, ${colors.brand} 12%), color-mix(in srgb, ${colors.surface} 94%, ${colors.bg} 6%))`
 49691 |     : `linear-gradient(180deg, color-mix(in srgb, ${colors.bg} 86%, ${colors.brand} 14%), ${colors.bg})`;
 49692 |   const shopPanelBg = lightSurface
 49693 |     ? `color-mix(in srgb, ${colors.surface} 88%, ${colors.brand} 12%)`
 49694 |     : `color-mix(in srgb, ${colors.surface} 88%, ${colors.brand} 12%)`;
 49695 |   const shopPanelBgStrong = lightSurface
 49696 |     ? `color-mix(in srgb, ${colors.surface} 82%, ${colors.brand} 18%)`
 49697 |     : `color-mix(in srgb, ${colors.surface2} 82%, ${colors.brand} 18%)`;
 49698 |   const shopSectionHeaderBg = lightSurface
 49699 |     ? `color-mix(in srgb, ${colors.surface} 86%, ${colors.brand} 14%)`
 49700 |     : `color-mix(in srgb, ${colors.surface2} 86%, ${colors.brand} 14%)`;
 49701 |   const shopCardBg = lightSurface
 49702 |     ? `color-mix(in srgb, ${colors.surface} 95%, ${colors.brand} 5%)`
 49703 |     : colors.surface;
 49704 |   const shopCardBgAccent = lightSurface
 49705 |     ? `color-mix(in srgb, ${colors.surface} 90%, ${colors.brand} 10%)`
 49706 |     : `color-mix(in srgb, ${colors.surface} 86%, ${colors.brand} 14%)`;
 49707 |   const shopInputBg = lightSurface
 49708 |     ? `color-mix(in srgb, ${colors.surface} 92%, ${colors.brand} 8%)`
 49709 |     : `color-mix(in srgb, ${colors.surface} 86%, ${colors.bg} 14%)`;
 49710 |   const shopBorder = lightSurface
 49711 |     ? `color-mix(in srgb, ${colors.line} 62%, ${colors.brand} 38%)`
 49712 |     : `color-mix(in srgb, ${colors.line} 82%, transparent)`;
 49713 |   const shopSecondary = lightSurface
```


#### Hit 23 — line 49698

```text
 49680 |   if (actionPhaseStateRepairQueued && !backendSync.applyingRemote && !tokenScenarioSandboxActive()) {
 49681 |     actionPhaseStateRepairQueued = false;
 49682 |     saveState({ immediate: true, immediateBackend: true });
 49683 |   }
 49684 | }
 49685 | 
 49686 | function applyShopTheme(root, colors, contrast) {
 49687 |   const onBrand = colors.onBrand || "#ffffff";
 49688 |   const lightSurface = relativeLuminance(colors.surface) >= 0.62;
 49689 |   const shopPageBg = lightSurface
 49690 |     ? `linear-gradient(180deg, color-mix(in srgb, ${colors.surface} 88%, ${colors.brand} 12%), color-mix(in srgb, ${colors.surface} 94%, ${colors.bg} 6%))`
 49691 |     : `linear-gradient(180deg, color-mix(in srgb, ${colors.bg} 86%, ${colors.brand} 14%), ${colors.bg})`;
 49692 |   const shopPanelBg = lightSurface
 49693 |     ? `color-mix(in srgb, ${colors.surface} 88%, ${colors.brand} 12%)`
 49694 |     : `color-mix(in srgb, ${colors.surface} 88%, ${colors.brand} 12%)`;
 49695 |   const shopPanelBgStrong = lightSurface
 49696 |     ? `color-mix(in srgb, ${colors.surface} 82%, ${colors.brand} 18%)`
 49697 |     : `color-mix(in srgb, ${colors.surface2} 82%, ${colors.brand} 18%)`;
 49698 |   const shopSectionHeaderBg = lightSurface
 49699 |     ? `color-mix(in srgb, ${colors.surface} 86%, ${colors.brand} 14%)`
 49700 |     : `color-mix(in srgb, ${colors.surface2} 86%, ${colors.brand} 14%)`;
 49701 |   const shopCardBg = lightSurface
 49702 |     ? `color-mix(in srgb, ${colors.surface} 95%, ${colors.brand} 5%)`
 49703 |     : colors.surface;
 49704 |   const shopCardBgAccent = lightSurface
 49705 |     ? `color-mix(in srgb, ${colors.surface} 90%, ${colors.brand} 10%)`
 49706 |     : `color-mix(in srgb, ${colors.surface} 86%, ${colors.brand} 14%)`;
 49707 |   const shopInputBg = lightSurface
 49708 |     ? `color-mix(in srgb, ${colors.surface} 92%, ${colors.brand} 8%)`
 49709 |     : `color-mix(in srgb, ${colors.surface} 86%, ${colors.bg} 14%)`;
 49710 |   const shopBorder = lightSurface
 49711 |     ? `color-mix(in srgb, ${colors.line} 62%, ${colors.brand} 38%)`
 49712 |     : `color-mix(in srgb, ${colors.line} 82%, transparent)`;
 49713 |   const shopSecondary = lightSurface
 49714 |     ? `color-mix(in srgb, ${colors.surface} 90%, ${colors.brand} 10%)`
 49715 |     : contrast.surface;
 49716 |   const shopSecondaryBorder = lightSurface
```


#### Hit 24 — line 49701

```text
 49683 |   }
 49684 | }
 49685 | 
 49686 | function applyShopTheme(root, colors, contrast) {
 49687 |   const onBrand = colors.onBrand || "#ffffff";
 49688 |   const lightSurface = relativeLuminance(colors.surface) >= 0.62;
 49689 |   const shopPageBg = lightSurface
 49690 |     ? `linear-gradient(180deg, color-mix(in srgb, ${colors.surface} 88%, ${colors.brand} 12%), color-mix(in srgb, ${colors.surface} 94%, ${colors.bg} 6%))`
 49691 |     : `linear-gradient(180deg, color-mix(in srgb, ${colors.bg} 86%, ${colors.brand} 14%), ${colors.bg})`;
 49692 |   const shopPanelBg = lightSurface
 49693 |     ? `color-mix(in srgb, ${colors.surface} 88%, ${colors.brand} 12%)`
 49694 |     : `color-mix(in srgb, ${colors.surface} 88%, ${colors.brand} 12%)`;
 49695 |   const shopPanelBgStrong = lightSurface
 49696 |     ? `color-mix(in srgb, ${colors.surface} 82%, ${colors.brand} 18%)`
 49697 |     : `color-mix(in srgb, ${colors.surface2} 82%, ${colors.brand} 18%)`;
 49698 |   const shopSectionHeaderBg = lightSurface
 49699 |     ? `color-mix(in srgb, ${colors.surface} 86%, ${colors.brand} 14%)`
 49700 |     : `color-mix(in srgb, ${colors.surface2} 86%, ${colors.brand} 14%)`;
 49701 |   const shopCardBg = lightSurface
 49702 |     ? `color-mix(in srgb, ${colors.surface} 95%, ${colors.brand} 5%)`
 49703 |     : colors.surface;
 49704 |   const shopCardBgAccent = lightSurface
 49705 |     ? `color-mix(in srgb, ${colors.surface} 90%, ${colors.brand} 10%)`
 49706 |     : `color-mix(in srgb, ${colors.surface} 86%, ${colors.brand} 14%)`;
 49707 |   const shopInputBg = lightSurface
 49708 |     ? `color-mix(in srgb, ${colors.surface} 92%, ${colors.brand} 8%)`
 49709 |     : `color-mix(in srgb, ${colors.surface} 86%, ${colors.bg} 14%)`;
 49710 |   const shopBorder = lightSurface
 49711 |     ? `color-mix(in srgb, ${colors.line} 62%, ${colors.brand} 38%)`
 49712 |     : `color-mix(in srgb, ${colors.line} 82%, transparent)`;
 49713 |   const shopSecondary = lightSurface
 49714 |     ? `color-mix(in srgb, ${colors.surface} 90%, ${colors.brand} 10%)`
 49715 |     : contrast.surface;
 49716 |   const shopSecondaryBorder = lightSurface
 49717 |     ? `color-mix(in srgb, ${colors.line} 72%, ${colors.brand} 28%)`
 49718 |     : contrast.line;
 49719 |   const shopTooltipBg = lightSurface
```


#### Hit 25 — line 49704

```text
 49686 | function applyShopTheme(root, colors, contrast) {
 49687 |   const onBrand = colors.onBrand || "#ffffff";
 49688 |   const lightSurface = relativeLuminance(colors.surface) >= 0.62;
 49689 |   const shopPageBg = lightSurface
 49690 |     ? `linear-gradient(180deg, color-mix(in srgb, ${colors.surface} 88%, ${colors.brand} 12%), color-mix(in srgb, ${colors.surface} 94%, ${colors.bg} 6%))`
 49691 |     : `linear-gradient(180deg, color-mix(in srgb, ${colors.bg} 86%, ${colors.brand} 14%), ${colors.bg})`;
 49692 |   const shopPanelBg = lightSurface
 49693 |     ? `color-mix(in srgb, ${colors.surface} 88%, ${colors.brand} 12%)`
 49694 |     : `color-mix(in srgb, ${colors.surface} 88%, ${colors.brand} 12%)`;
 49695 |   const shopPanelBgStrong = lightSurface
 49696 |     ? `color-mix(in srgb, ${colors.surface} 82%, ${colors.brand} 18%)`
 49697 |     : `color-mix(in srgb, ${colors.surface2} 82%, ${colors.brand} 18%)`;
 49698 |   const shopSectionHeaderBg = lightSurface
 49699 |     ? `color-mix(in srgb, ${colors.surface} 86%, ${colors.brand} 14%)`
 49700 |     : `color-mix(in srgb, ${colors.surface2} 86%, ${colors.brand} 14%)`;
 49701 |   const shopCardBg = lightSurface
 49702 |     ? `color-mix(in srgb, ${colors.surface} 95%, ${colors.brand} 5%)`
 49703 |     : colors.surface;
 49704 |   const shopCardBgAccent = lightSurface
 49705 |     ? `color-mix(in srgb, ${colors.surface} 90%, ${colors.brand} 10%)`
 49706 |     : `color-mix(in srgb, ${colors.surface} 86%, ${colors.brand} 14%)`;
 49707 |   const shopInputBg = lightSurface
 49708 |     ? `color-mix(in srgb, ${colors.surface} 92%, ${colors.brand} 8%)`
 49709 |     : `color-mix(in srgb, ${colors.surface} 86%, ${colors.bg} 14%)`;
 49710 |   const shopBorder = lightSurface
 49711 |     ? `color-mix(in srgb, ${colors.line} 62%, ${colors.brand} 38%)`
 49712 |     : `color-mix(in srgb, ${colors.line} 82%, transparent)`;
 49713 |   const shopSecondary = lightSurface
 49714 |     ? `color-mix(in srgb, ${colors.surface} 90%, ${colors.brand} 10%)`
 49715 |     : contrast.surface;
 49716 |   const shopSecondaryBorder = lightSurface
 49717 |     ? `color-mix(in srgb, ${colors.line} 72%, ${colors.brand} 28%)`
 49718 |     : contrast.line;
 49719 |   const shopTooltipBg = lightSurface
 49720 |     ? `color-mix(in srgb, ${colors.ink} 92%, ${colors.brand} 8%)`
 49721 |     : `color-mix(in srgb, ${colors.surface2} 88%, ${colors.brand} 12%)`;
 49722 |   root.style.setProperty("--shop-page-bg", colors.shopPageBg || shopPageBg);
```


#### Hit 26 — line 49707

```text
 49689 |   const shopPageBg = lightSurface
 49690 |     ? `linear-gradient(180deg, color-mix(in srgb, ${colors.surface} 88%, ${colors.brand} 12%), color-mix(in srgb, ${colors.surface} 94%, ${colors.bg} 6%))`
 49691 |     : `linear-gradient(180deg, color-mix(in srgb, ${colors.bg} 86%, ${colors.brand} 14%), ${colors.bg})`;
 49692 |   const shopPanelBg = lightSurface
 49693 |     ? `color-mix(in srgb, ${colors.surface} 88%, ${colors.brand} 12%)`
 49694 |     : `color-mix(in srgb, ${colors.surface} 88%, ${colors.brand} 12%)`;
 49695 |   const shopPanelBgStrong = lightSurface
 49696 |     ? `color-mix(in srgb, ${colors.surface} 82%, ${colors.brand} 18%)`
 49697 |     : `color-mix(in srgb, ${colors.surface2} 82%, ${colors.brand} 18%)`;
 49698 |   const shopSectionHeaderBg = lightSurface
 49699 |     ? `color-mix(in srgb, ${colors.surface} 86%, ${colors.brand} 14%)`
 49700 |     : `color-mix(in srgb, ${colors.surface2} 86%, ${colors.brand} 14%)`;
 49701 |   const shopCardBg = lightSurface
 49702 |     ? `color-mix(in srgb, ${colors.surface} 95%, ${colors.brand} 5%)`
 49703 |     : colors.surface;
 49704 |   const shopCardBgAccent = lightSurface
 49705 |     ? `color-mix(in srgb, ${colors.surface} 90%, ${colors.brand} 10%)`
 49706 |     : `color-mix(in srgb, ${colors.surface} 86%, ${colors.brand} 14%)`;
 49707 |   const shopInputBg = lightSurface
 49708 |     ? `color-mix(in srgb, ${colors.surface} 92%, ${colors.brand} 8%)`
 49709 |     : `color-mix(in srgb, ${colors.surface} 86%, ${colors.bg} 14%)`;
 49710 |   const shopBorder = lightSurface
 49711 |     ? `color-mix(in srgb, ${colors.line} 62%, ${colors.brand} 38%)`
 49712 |     : `color-mix(in srgb, ${colors.line} 82%, transparent)`;
 49713 |   const shopSecondary = lightSurface
 49714 |     ? `color-mix(in srgb, ${colors.surface} 90%, ${colors.brand} 10%)`
 49715 |     : contrast.surface;
 49716 |   const shopSecondaryBorder = lightSurface
 49717 |     ? `color-mix(in srgb, ${colors.line} 72%, ${colors.brand} 28%)`
 49718 |     : contrast.line;
 49719 |   const shopTooltipBg = lightSurface
 49720 |     ? `color-mix(in srgb, ${colors.ink} 92%, ${colors.brand} 8%)`
 49721 |     : `color-mix(in srgb, ${colors.surface2} 88%, ${colors.brand} 12%)`;
 49722 |   root.style.setProperty("--shop-page-bg", colors.shopPageBg || shopPageBg);
 49723 |   root.style.setProperty("--shop-panel-bg", colors.shopPanelBg || shopPanelBg);
 49724 |   root.style.setProperty("--shop-panel-bg-strong", colors.shopPanelBgStrong || shopPanelBgStrong);
 49725 |   root.style.setProperty("--shop-section-header-bg", colors.shopSectionHeaderBg || shopSectionHeaderBg);
```


#### Hit 27 — line 49710

```text
 49692 |   const shopPanelBg = lightSurface
 49693 |     ? `color-mix(in srgb, ${colors.surface} 88%, ${colors.brand} 12%)`
 49694 |     : `color-mix(in srgb, ${colors.surface} 88%, ${colors.brand} 12%)`;
 49695 |   const shopPanelBgStrong = lightSurface
 49696 |     ? `color-mix(in srgb, ${colors.surface} 82%, ${colors.brand} 18%)`
 49697 |     : `color-mix(in srgb, ${colors.surface2} 82%, ${colors.brand} 18%)`;
 49698 |   const shopSectionHeaderBg = lightSurface
 49699 |     ? `color-mix(in srgb, ${colors.surface} 86%, ${colors.brand} 14%)`
 49700 |     : `color-mix(in srgb, ${colors.surface2} 86%, ${colors.brand} 14%)`;
 49701 |   const shopCardBg = lightSurface
 49702 |     ? `color-mix(in srgb, ${colors.surface} 95%, ${colors.brand} 5%)`
 49703 |     : colors.surface;
 49704 |   const shopCardBgAccent = lightSurface
 49705 |     ? `color-mix(in srgb, ${colors.surface} 90%, ${colors.brand} 10%)`
 49706 |     : `color-mix(in srgb, ${colors.surface} 86%, ${colors.brand} 14%)`;
 49707 |   const shopInputBg = lightSurface
 49708 |     ? `color-mix(in srgb, ${colors.surface} 92%, ${colors.brand} 8%)`
 49709 |     : `color-mix(in srgb, ${colors.surface} 86%, ${colors.bg} 14%)`;
 49710 |   const shopBorder = lightSurface
 49711 |     ? `color-mix(in srgb, ${colors.line} 62%, ${colors.brand} 38%)`
 49712 |     : `color-mix(in srgb, ${colors.line} 82%, transparent)`;
 49713 |   const shopSecondary = lightSurface
 49714 |     ? `color-mix(in srgb, ${colors.surface} 90%, ${colors.brand} 10%)`
 49715 |     : contrast.surface;
 49716 |   const shopSecondaryBorder = lightSurface
 49717 |     ? `color-mix(in srgb, ${colors.line} 72%, ${colors.brand} 28%)`
 49718 |     : contrast.line;
 49719 |   const shopTooltipBg = lightSurface
 49720 |     ? `color-mix(in srgb, ${colors.ink} 92%, ${colors.brand} 8%)`
 49721 |     : `color-mix(in srgb, ${colors.surface2} 88%, ${colors.brand} 12%)`;
 49722 |   root.style.setProperty("--shop-page-bg", colors.shopPageBg || shopPageBg);
 49723 |   root.style.setProperty("--shop-panel-bg", colors.shopPanelBg || shopPanelBg);
 49724 |   root.style.setProperty("--shop-panel-bg-strong", colors.shopPanelBgStrong || shopPanelBgStrong);
 49725 |   root.style.setProperty("--shop-section-header-bg", colors.shopSectionHeaderBg || shopSectionHeaderBg);
 49726 |   root.style.setProperty("--shop-card-bg", colors.shopCardBg || shopCardBg);
 49727 |   root.style.setProperty("--shop-card-bg-accent", colors.shopCardBgAccent || shopCardBgAccent);
 49728 |   root.style.setProperty("--shop-input-bg", colors.shopInputBg || shopInputBg);
```


#### Hit 28 — line 49713

```text
 49695 |   const shopPanelBgStrong = lightSurface
 49696 |     ? `color-mix(in srgb, ${colors.surface} 82%, ${colors.brand} 18%)`
 49697 |     : `color-mix(in srgb, ${colors.surface2} 82%, ${colors.brand} 18%)`;
 49698 |   const shopSectionHeaderBg = lightSurface
 49699 |     ? `color-mix(in srgb, ${colors.surface} 86%, ${colors.brand} 14%)`
 49700 |     : `color-mix(in srgb, ${colors.surface2} 86%, ${colors.brand} 14%)`;
 49701 |   const shopCardBg = lightSurface
 49702 |     ? `color-mix(in srgb, ${colors.surface} 95%, ${colors.brand} 5%)`
 49703 |     : colors.surface;
 49704 |   const shopCardBgAccent = lightSurface
 49705 |     ? `color-mix(in srgb, ${colors.surface} 90%, ${colors.brand} 10%)`
 49706 |     : `color-mix(in srgb, ${colors.surface} 86%, ${colors.brand} 14%)`;
 49707 |   const shopInputBg = lightSurface
 49708 |     ? `color-mix(in srgb, ${colors.surface} 92%, ${colors.brand} 8%)`
 49709 |     : `color-mix(in srgb, ${colors.surface} 86%, ${colors.bg} 14%)`;
 49710 |   const shopBorder = lightSurface
 49711 |     ? `color-mix(in srgb, ${colors.line} 62%, ${colors.brand} 38%)`
 49712 |     : `color-mix(in srgb, ${colors.line} 82%, transparent)`;
 49713 |   const shopSecondary = lightSurface
 49714 |     ? `color-mix(in srgb, ${colors.surface} 90%, ${colors.brand} 10%)`
 49715 |     : contrast.surface;
 49716 |   const shopSecondaryBorder = lightSurface
 49717 |     ? `color-mix(in srgb, ${colors.line} 72%, ${colors.brand} 28%)`
 49718 |     : contrast.line;
 49719 |   const shopTooltipBg = lightSurface
 49720 |     ? `color-mix(in srgb, ${colors.ink} 92%, ${colors.brand} 8%)`
 49721 |     : `color-mix(in srgb, ${colors.surface2} 88%, ${colors.brand} 12%)`;
 49722 |   root.style.setProperty("--shop-page-bg", colors.shopPageBg || shopPageBg);
 49723 |   root.style.setProperty("--shop-panel-bg", colors.shopPanelBg || shopPanelBg);
 49724 |   root.style.setProperty("--shop-panel-bg-strong", colors.shopPanelBgStrong || shopPanelBgStrong);
 49725 |   root.style.setProperty("--shop-section-header-bg", colors.shopSectionHeaderBg || shopSectionHeaderBg);
 49726 |   root.style.setProperty("--shop-card-bg", colors.shopCardBg || shopCardBg);
 49727 |   root.style.setProperty("--shop-card-bg-accent", colors.shopCardBgAccent || shopCardBgAccent);
 49728 |   root.style.setProperty("--shop-input-bg", colors.shopInputBg || shopInputBg);
 49729 |   root.style.setProperty("--shop-border", colors.shopBorder || shopBorder);
 49730 |   root.style.setProperty("--shop-border-hover", colors.shopBorderHover || `color-mix(in srgb, ${colors.brand} 62%, ${colors.line})`);
 49731 |   root.style.setProperty("--shop-primary", colors.shopPrimary || colors.brand);
```


#### Hit 29 — line 49716

```text
 49698 |   const shopSectionHeaderBg = lightSurface
 49699 |     ? `color-mix(in srgb, ${colors.surface} 86%, ${colors.brand} 14%)`
 49700 |     : `color-mix(in srgb, ${colors.surface2} 86%, ${colors.brand} 14%)`;
 49701 |   const shopCardBg = lightSurface
 49702 |     ? `color-mix(in srgb, ${colors.surface} 95%, ${colors.brand} 5%)`
 49703 |     : colors.surface;
 49704 |   const shopCardBgAccent = lightSurface
 49705 |     ? `color-mix(in srgb, ${colors.surface} 90%, ${colors.brand} 10%)`
 49706 |     : `color-mix(in srgb, ${colors.surface} 86%, ${colors.brand} 14%)`;
 49707 |   const shopInputBg = lightSurface
 49708 |     ? `color-mix(in srgb, ${colors.surface} 92%, ${colors.brand} 8%)`
 49709 |     : `color-mix(in srgb, ${colors.surface} 86%, ${colors.bg} 14%)`;
 49710 |   const shopBorder = lightSurface
 49711 |     ? `color-mix(in srgb, ${colors.line} 62%, ${colors.brand} 38%)`
 49712 |     : `color-mix(in srgb, ${colors.line} 82%, transparent)`;
 49713 |   const shopSecondary = lightSurface
 49714 |     ? `color-mix(in srgb, ${colors.surface} 90%, ${colors.brand} 10%)`
 49715 |     : contrast.surface;
 49716 |   const shopSecondaryBorder = lightSurface
 49717 |     ? `color-mix(in srgb, ${colors.line} 72%, ${colors.brand} 28%)`
 49718 |     : contrast.line;
 49719 |   const shopTooltipBg = lightSurface
 49720 |     ? `color-mix(in srgb, ${colors.ink} 92%, ${colors.brand} 8%)`
 49721 |     : `color-mix(in srgb, ${colors.surface2} 88%, ${colors.brand} 12%)`;
 49722 |   root.style.setProperty("--shop-page-bg", colors.shopPageBg || shopPageBg);
 49723 |   root.style.setProperty("--shop-panel-bg", colors.shopPanelBg || shopPanelBg);
 49724 |   root.style.setProperty("--shop-panel-bg-strong", colors.shopPanelBgStrong || shopPanelBgStrong);
 49725 |   root.style.setProperty("--shop-section-header-bg", colors.shopSectionHeaderBg || shopSectionHeaderBg);
 49726 |   root.style.setProperty("--shop-card-bg", colors.shopCardBg || shopCardBg);
 49727 |   root.style.setProperty("--shop-card-bg-accent", colors.shopCardBgAccent || shopCardBgAccent);
 49728 |   root.style.setProperty("--shop-input-bg", colors.shopInputBg || shopInputBg);
 49729 |   root.style.setProperty("--shop-border", colors.shopBorder || shopBorder);
 49730 |   root.style.setProperty("--shop-border-hover", colors.shopBorderHover || `color-mix(in srgb, ${colors.brand} 62%, ${colors.line})`);
 49731 |   root.style.setProperty("--shop-primary", colors.shopPrimary || colors.brand);
 49732 |   root.style.setProperty("--shop-primary-ink", colors.shopPrimaryInk || onBrand);
 49733 |   root.style.setProperty("--shop-secondary", colors.shopSecondary || shopSecondary);
 49734 |   root.style.setProperty("--shop-secondary-border", colors.shopSecondaryBorder || shopSecondaryBorder);
```


#### Hit 30 — line 49719

```text
 49701 |   const shopCardBg = lightSurface
 49702 |     ? `color-mix(in srgb, ${colors.surface} 95%, ${colors.brand} 5%)`
 49703 |     : colors.surface;
 49704 |   const shopCardBgAccent = lightSurface
 49705 |     ? `color-mix(in srgb, ${colors.surface} 90%, ${colors.brand} 10%)`
 49706 |     : `color-mix(in srgb, ${colors.surface} 86%, ${colors.brand} 14%)`;
 49707 |   const shopInputBg = lightSurface
 49708 |     ? `color-mix(in srgb, ${colors.surface} 92%, ${colors.brand} 8%)`
 49709 |     : `color-mix(in srgb, ${colors.surface} 86%, ${colors.bg} 14%)`;
 49710 |   const shopBorder = lightSurface
 49711 |     ? `color-mix(in srgb, ${colors.line} 62%, ${colors.brand} 38%)`
 49712 |     : `color-mix(in srgb, ${colors.line} 82%, transparent)`;
 49713 |   const shopSecondary = lightSurface
 49714 |     ? `color-mix(in srgb, ${colors.surface} 90%, ${colors.brand} 10%)`
 49715 |     : contrast.surface;
 49716 |   const shopSecondaryBorder = lightSurface
 49717 |     ? `color-mix(in srgb, ${colors.line} 72%, ${colors.brand} 28%)`
 49718 |     : contrast.line;
 49719 |   const shopTooltipBg = lightSurface
 49720 |     ? `color-mix(in srgb, ${colors.ink} 92%, ${colors.brand} 8%)`
 49721 |     : `color-mix(in srgb, ${colors.surface2} 88%, ${colors.brand} 12%)`;
 49722 |   root.style.setProperty("--shop-page-bg", colors.shopPageBg || shopPageBg);
 49723 |   root.style.setProperty("--shop-panel-bg", colors.shopPanelBg || shopPanelBg);
 49724 |   root.style.setProperty("--shop-panel-bg-strong", colors.shopPanelBgStrong || shopPanelBgStrong);
 49725 |   root.style.setProperty("--shop-section-header-bg", colors.shopSectionHeaderBg || shopSectionHeaderBg);
 49726 |   root.style.setProperty("--shop-card-bg", colors.shopCardBg || shopCardBg);
 49727 |   root.style.setProperty("--shop-card-bg-accent", colors.shopCardBgAccent || shopCardBgAccent);
 49728 |   root.style.setProperty("--shop-input-bg", colors.shopInputBg || shopInputBg);
 49729 |   root.style.setProperty("--shop-border", colors.shopBorder || shopBorder);
 49730 |   root.style.setProperty("--shop-border-hover", colors.shopBorderHover || `color-mix(in srgb, ${colors.brand} 62%, ${colors.line})`);
 49731 |   root.style.setProperty("--shop-primary", colors.shopPrimary || colors.brand);
 49732 |   root.style.setProperty("--shop-primary-ink", colors.shopPrimaryInk || onBrand);
 49733 |   root.style.setProperty("--shop-secondary", colors.shopSecondary || shopSecondary);
 49734 |   root.style.setProperty("--shop-secondary-border", colors.shopSecondaryBorder || shopSecondaryBorder);
 49735 |   root.style.setProperty("--shop-secondary-ink", colors.shopSecondaryInk || (lightSurface ? colors.ink : contrast.ink));
 49736 |   root.style.setProperty("--shop-text", colors.shopText || colors.ink);
 49737 |   root.style.setProperty("--shop-muted", colors.shopMuted || colors.muted);
```


### Hyperspace

Occurrences: 18

#### Hit 1 — line 6064

```text
  6046 |   pokeball: { id: "poke", label: "Poke", tokenName: "Poke GC Ticket", rank: 3 },
  6047 |   greatball: { id: "great", label: "Great", tokenName: "Great GC Ticket", rank: 4 },
  6048 |   ultraball: { id: "ultra", label: "Ultra", tokenName: "Ultra GC Ticket", rank: 5 },
  6049 |   masterball: { id: "master", label: "Master", tokenName: "Master GC Ticket", rank: 6 }
  6050 | });
  6051 | 
  6052 | function normalizeEncounterEntryId(name, index = 0) {
  6053 |   const base = normalizePokemonName(name)
  6054 |     .replace(/-sf$/i, "")
  6055 |     .replace(/^hyperspace-hole$/i, "hyperspace-hole");
  6056 |   return index ? `${base}-${index + 1}` : base;
  6057 | }
  6058 | 
  6059 | function encounterEntry(name, index = 0) {
  6060 |   const raw = String(name || "").trim();
  6061 |   const isWater = /\s+SF$/i.test(raw);
  6062 |   const displayName = raw.replace(/\s+SF$/i, "").trim();
  6063 |   const id = normalizeEncounterEntryId(displayName, index);
  6064 |   const isHyperspace = normalizePokemonName(displayName) === "hyperspace-hole";
  6065 |   return {
  6066 |     id,
  6067 |     pokemonName: displayName,
  6068 |     displayName,
  6069 |     weight: 1,
  6070 |     category: isWater ? "fishing" : isHyperspace ? "special" : "land",
  6071 |     enabledByDefault: !isWater,
  6072 |     removable: true,
  6073 |     ...(isWater ? { notes: "Fishing / Surf encounter." } : {}),
  6074 |     ...(isHyperspace ? { specialWheelId: "hoenn-hyperspace-hole", notes: "Hoenn-only Hyperspace Hole sub-wheel." } : {})
  6075 |   };
  6076 | }
  6077 | 
  6078 | function makeEncounterWheel(series, gym, names) {
  6079 |   const seen = new Map();
  6080 |   return {
  6081 |     id: `${String(series).toLowerCase()}-gym-${gym}`,
  6082 |     series,
```


#### Hit 2 — line 6070

```text
  6052 | function normalizeEncounterEntryId(name, index = 0) {
  6053 |   const base = normalizePokemonName(name)
  6054 |     .replace(/-sf$/i, "")
  6055 |     .replace(/^hyperspace-hole$/i, "hyperspace-hole");
  6056 |   return index ? `${base}-${index + 1}` : base;
  6057 | }
  6058 | 
  6059 | function encounterEntry(name, index = 0) {
  6060 |   const raw = String(name || "").trim();
  6061 |   const isWater = /\s+SF$/i.test(raw);
  6062 |   const displayName = raw.replace(/\s+SF$/i, "").trim();
  6063 |   const id = normalizeEncounterEntryId(displayName, index);
  6064 |   const isHyperspace = normalizePokemonName(displayName) === "hyperspace-hole";
  6065 |   return {
  6066 |     id,
  6067 |     pokemonName: displayName,
  6068 |     displayName,
  6069 |     weight: 1,
  6070 |     category: isWater ? "fishing" : isHyperspace ? "special" : "land",
  6071 |     enabledByDefault: !isWater,
  6072 |     removable: true,
  6073 |     ...(isWater ? { notes: "Fishing / Surf encounter." } : {}),
  6074 |     ...(isHyperspace ? { specialWheelId: "hoenn-hyperspace-hole", notes: "Hoenn-only Hyperspace Hole sub-wheel." } : {})
  6075 |   };
  6076 | }
  6077 | 
  6078 | function makeEncounterWheel(series, gym, names) {
  6079 |   const seen = new Map();
  6080 |   return {
  6081 |     id: `${String(series).toLowerCase()}-gym-${gym}`,
  6082 |     series,
  6083 |     gym,
  6084 |     name: `${series} Gym ${gym} Encounter Wheel`,
  6085 |     rollsPerAction: 2,
  6086 |     rerollable: true,
  6087 |     entries: names.map((name) => {
  6088 |       const key = normalizePokemonName(String(name).replace(/\s+SF$/i, "").trim());
```


#### Hit 3 — line 6074

```text
  6056 |   return index ? `${base}-${index + 1}` : base;
  6057 | }
  6058 | 
  6059 | function encounterEntry(name, index = 0) {
  6060 |   const raw = String(name || "").trim();
  6061 |   const isWater = /\s+SF$/i.test(raw);
  6062 |   const displayName = raw.replace(/\s+SF$/i, "").trim();
  6063 |   const id = normalizeEncounterEntryId(displayName, index);
  6064 |   const isHyperspace = normalizePokemonName(displayName) === "hyperspace-hole";
  6065 |   return {
  6066 |     id,
  6067 |     pokemonName: displayName,
  6068 |     displayName,
  6069 |     weight: 1,
  6070 |     category: isWater ? "fishing" : isHyperspace ? "special" : "land",
  6071 |     enabledByDefault: !isWater,
  6072 |     removable: true,
  6073 |     ...(isWater ? { notes: "Fishing / Surf encounter." } : {}),
  6074 |     ...(isHyperspace ? { specialWheelId: "hoenn-hyperspace-hole", notes: "Hoenn-only Hyperspace Hole sub-wheel." } : {})
  6075 |   };
  6076 | }
  6077 | 
  6078 | function makeEncounterWheel(series, gym, names) {
  6079 |   const seen = new Map();
  6080 |   return {
  6081 |     id: `${String(series).toLowerCase()}-gym-${gym}`,
  6082 |     series,
  6083 |     gym,
  6084 |     name: `${series} Gym ${gym} Encounter Wheel`,
  6085 |     rollsPerAction: 2,
  6086 |     rerollable: true,
  6087 |     entries: names.map((name) => {
  6088 |       const key = normalizePokemonName(String(name).replace(/\s+SF$/i, "").trim());
  6089 |       const count = seen.get(key) || 0;
  6090 |       seen.set(key, count + 1);
  6091 |       return encounterEntry(name, count);
  6092 |     })
```


#### Hit 4 — line 6074

```text
  6056 |   return index ? `${base}-${index + 1}` : base;
  6057 | }
  6058 | 
  6059 | function encounterEntry(name, index = 0) {
  6060 |   const raw = String(name || "").trim();
  6061 |   const isWater = /\s+SF$/i.test(raw);
  6062 |   const displayName = raw.replace(/\s+SF$/i, "").trim();
  6063 |   const id = normalizeEncounterEntryId(displayName, index);
  6064 |   const isHyperspace = normalizePokemonName(displayName) === "hyperspace-hole";
  6065 |   return {
  6066 |     id,
  6067 |     pokemonName: displayName,
  6068 |     displayName,
  6069 |     weight: 1,
  6070 |     category: isWater ? "fishing" : isHyperspace ? "special" : "land",
  6071 |     enabledByDefault: !isWater,
  6072 |     removable: true,
  6073 |     ...(isWater ? { notes: "Fishing / Surf encounter." } : {}),
  6074 |     ...(isHyperspace ? { specialWheelId: "hoenn-hyperspace-hole", notes: "Hoenn-only Hyperspace Hole sub-wheel." } : {})
  6075 |   };
  6076 | }
  6077 | 
  6078 | function makeEncounterWheel(series, gym, names) {
  6079 |   const seen = new Map();
  6080 |   return {
  6081 |     id: `${String(series).toLowerCase()}-gym-${gym}`,
  6082 |     series,
  6083 |     gym,
  6084 |     name: `${series} Gym ${gym} Encounter Wheel`,
  6085 |     rollsPerAction: 2,
  6086 |     rerollable: true,
  6087 |     entries: names.map((name) => {
  6088 |       const key = normalizePokemonName(String(name).replace(/\s+SF$/i, "").trim());
  6089 |       const count = seen.get(key) || 0;
  6090 |       seen.set(key, count + 1);
  6091 |       return encounterEntry(name, count);
  6092 |     })
```


#### Hit 5 — line 6112

```text
  6094 | }
  6095 | 
  6096 | const starterWheelDefinitions = Object.freeze({
  6097 |   "hoenn-gym-1": {
  6098 |     id: "hoenn-starter-wheel",
  6099 |     series: "Hoenn",
  6100 |     gym: 1,
  6101 |     name: "Hoenn Starter Wheel",
  6102 |     timing: "Start of Gym 1 Phase",
  6103 |     trigger: "natural-event",
  6104 |     entries: ["Treecko", "Mudkip", "Torchic"].map((name) => encounterEntry(name))
  6105 |   }
  6106 | });
  6107 | 
  6108 | const hyperspaceWheelDefinitions = Object.freeze({
  6109 |   "hoenn-hyperspace-hole": {
  6110 |     id: "hoenn-hyperspace-hole",
  6111 |     series: "Hoenn",
  6112 |     name: "Hoenn Hyperspace Hole Wheel",
  6113 |     entries: [
  6114 |       "Rayquaza", "Cresselia", "Uxie", "Mesprit", "Azelf", "Landorus", "Thundurus", "Tornadus",
  6115 |       "Tornadus T", "Landorus T", "Thundurus T", "Dialga", "Palkia", "Giratina", "Groudon",
  6116 |       "Kyogre", "Jirachi", "Deoxys", "Deoxys A", "Deoxys S", "Deoxys D", "Kyurem", "Reshiram",
  6117 |       "Zekrom", "Cobalion", "Terrakion", "Virizion", "Regirock", "Regice", "Registeel",
  6118 |       "Regigigas", "Entei", "Raikou", "Suicune", "Latias", "Latios", "Heatran", "Ho-Oh", "Lugia"
  6119 |     ].map((name) => encounterEntry(name))
  6120 |   }
  6121 | });
  6122 | 
  6123 | const encounterWheelDefinitions = Object.freeze({
  6124 |   "kanto-gym-1": makeEncounterWheel("Kanto", 1, ["Pidgey", "Shinx", "Oddish", "Magikarp SF", "Tentacool SF"]),
  6125 |   "hoenn-gym-1": makeEncounterWheel("Hoenn", 1, [
  6126 |     "Chikorita", "Cyndaquil", "Totodile", "Wurmple", "Zigzagoon", "Poochyena", "Lillipup", "Zorua",
  6127 |     "Sewaddle", "Turtwig", "Chimchar", "Piplup", "Snivy", "Oshawott", "Tepig", "Wingull",
  6128 |     "Wailmer SF", "Carvanha SF", "Chatot", "Shellos", "Tentacool SF", "Magikarp SF", "Lotad",
  6129 |     "Seedot", "Ralts", "Surskit", "Gothita", "Tympole", "Marill", "Corphish SF", "Goldeen SF",
  6130 |     "Taillow", "Pidove", "Shroomish", "Slakoth", "Cottonee", "Paras", "Phantump", "Omanyte",
```


#### Hit 6 — line 6132

```text
  6114 |       "Rayquaza", "Cresselia", "Uxie", "Mesprit", "Azelf", "Landorus", "Thundurus", "Tornadus",
  6115 |       "Tornadus T", "Landorus T", "Thundurus T", "Dialga", "Palkia", "Giratina", "Groudon",
  6116 |       "Kyogre", "Jirachi", "Deoxys", "Deoxys A", "Deoxys S", "Deoxys D", "Kyurem", "Reshiram",
  6117 |       "Zekrom", "Cobalion", "Terrakion", "Virizion", "Regirock", "Regice", "Registeel",
  6118 |       "Regigigas", "Entei", "Raikou", "Suicune", "Latias", "Latios", "Heatran", "Ho-Oh", "Lugia"
  6119 |     ].map((name) => encounterEntry(name))
  6120 |   }
  6121 | });
  6122 | 
  6123 | const encounterWheelDefinitions = Object.freeze({
  6124 |   "kanto-gym-1": makeEncounterWheel("Kanto", 1, ["Pidgey", "Shinx", "Oddish", "Magikarp SF", "Tentacool SF"]),
  6125 |   "hoenn-gym-1": makeEncounterWheel("Hoenn", 1, [
  6126 |     "Chikorita", "Cyndaquil", "Totodile", "Wurmple", "Zigzagoon", "Poochyena", "Lillipup", "Zorua",
  6127 |     "Sewaddle", "Turtwig", "Chimchar", "Piplup", "Snivy", "Oshawott", "Tepig", "Wingull",
  6128 |     "Wailmer SF", "Carvanha SF", "Chatot", "Shellos", "Tentacool SF", "Magikarp SF", "Lotad",
  6129 |     "Seedot", "Ralts", "Surskit", "Gothita", "Tympole", "Marill", "Corphish SF", "Goldeen SF",
  6130 |     "Taillow", "Pidove", "Shroomish", "Slakoth", "Cottonee", "Paras", "Phantump", "Omanyte",
  6131 |     "Kabuto", "Aerodactyl", "Lileep", "Anorith", "Cranidos", "Shieldon", "Tirtouga", "Archen",
  6132 |     "Tyrunt", "Amaura", "Makuhita", "Whismur", "Nincada", "Skitty", "Hyperspace Hole", "Joltik",
  6133 |     "Eevee", "Abra", "Geodude"
  6134 |   ]),
  6135 |   "hoenn-gym-2": makeEncounterWheel("Hoenn", 2, [
  6136 |     "Tentacool SF", "Wingull SF", "Wailmer SF", "Magikarp SF", "Zubat", "Makuhita", "Geodude",
  6137 |     "Abra", "Timburr", "Axew", "Onix", "Aron", "Sableye", "Mawile", "Nosepass", "Electrike",
  6138 |     "Zigzagoon", "Gulpin", "Plusle", "Minun", "Oddish", "Hyperspace Hole", "Voltorb", "Trubbish",
  6139 |     "Chatot", "Shellos", "Magnemite", "Poochyena"
  6140 |   ]),
  6141 |   "hoenn-gym-3": makeEncounterWheel("Hoenn", 3, [
  6142 |     "Zigzagoon", "Roselia", "Marill", "Volbeat", "Illumise", "Oddish", "Surskit", "Rattata",
  6143 |     "Deerling", "Tympole SF", "Corphish SF", "Magikarp SF", "Goldeen SF", "Poochyena", "Seedot",
  6144 |     "Numel", "Machop", "Ponyta", "Throh", "Sawk", "Tyrogue", "Hyperspace Hole"
  6145 |   ]),
  6146 |   "hoenn-gym-4": makeEncounterWheel("Hoenn", 4, [
  6147 |     "Spinda", "Sandshrew", "Skarmory", "Scraggy", "Klefki", "Bouffalant", "Slugma", "Numel",
  6148 |     "Koffing", "Torkoal", "Grimer", "Roggenrola", "Diglett", "Tyrogue", "Swablu", "Lombre",
  6149 |     "Nuzleaf", "Zangoose", "Seviper", "Surskit", "Skorupi", "Misdreavus", "Tympole", "Swablu",
  6150 |     "Azumarill SF", "Barboach SF", "Magikarp SF", "Goldeen SF", "Geodude", "Zubat", "Lunatone",
```


#### Hit 7 — line 6138

```text
  6120 |   }
  6121 | });
  6122 | 
  6123 | const encounterWheelDefinitions = Object.freeze({
  6124 |   "kanto-gym-1": makeEncounterWheel("Kanto", 1, ["Pidgey", "Shinx", "Oddish", "Magikarp SF", "Tentacool SF"]),
  6125 |   "hoenn-gym-1": makeEncounterWheel("Hoenn", 1, [
  6126 |     "Chikorita", "Cyndaquil", "Totodile", "Wurmple", "Zigzagoon", "Poochyena", "Lillipup", "Zorua",
  6127 |     "Sewaddle", "Turtwig", "Chimchar", "Piplup", "Snivy", "Oshawott", "Tepig", "Wingull",
  6128 |     "Wailmer SF", "Carvanha SF", "Chatot", "Shellos", "Tentacool SF", "Magikarp SF", "Lotad",
  6129 |     "Seedot", "Ralts", "Surskit", "Gothita", "Tympole", "Marill", "Corphish SF", "Goldeen SF",
  6130 |     "Taillow", "Pidove", "Shroomish", "Slakoth", "Cottonee", "Paras", "Phantump", "Omanyte",
  6131 |     "Kabuto", "Aerodactyl", "Lileep", "Anorith", "Cranidos", "Shieldon", "Tirtouga", "Archen",
  6132 |     "Tyrunt", "Amaura", "Makuhita", "Whismur", "Nincada", "Skitty", "Hyperspace Hole", "Joltik",
  6133 |     "Eevee", "Abra", "Geodude"
  6134 |   ]),
  6135 |   "hoenn-gym-2": makeEncounterWheel("Hoenn", 2, [
  6136 |     "Tentacool SF", "Wingull SF", "Wailmer SF", "Magikarp SF", "Zubat", "Makuhita", "Geodude",
  6137 |     "Abra", "Timburr", "Axew", "Onix", "Aron", "Sableye", "Mawile", "Nosepass", "Electrike",
  6138 |     "Zigzagoon", "Gulpin", "Plusle", "Minun", "Oddish", "Hyperspace Hole", "Voltorb", "Trubbish",
  6139 |     "Chatot", "Shellos", "Magnemite", "Poochyena"
  6140 |   ]),
  6141 |   "hoenn-gym-3": makeEncounterWheel("Hoenn", 3, [
  6142 |     "Zigzagoon", "Roselia", "Marill", "Volbeat", "Illumise", "Oddish", "Surskit", "Rattata",
  6143 |     "Deerling", "Tympole SF", "Corphish SF", "Magikarp SF", "Goldeen SF", "Poochyena", "Seedot",
  6144 |     "Numel", "Machop", "Ponyta", "Throh", "Sawk", "Tyrogue", "Hyperspace Hole"
  6145 |   ]),
  6146 |   "hoenn-gym-4": makeEncounterWheel("Hoenn", 4, [
  6147 |     "Spinda", "Sandshrew", "Skarmory", "Scraggy", "Klefki", "Bouffalant", "Slugma", "Numel",
  6148 |     "Koffing", "Torkoal", "Grimer", "Roggenrola", "Diglett", "Tyrogue", "Swablu", "Lombre",
  6149 |     "Nuzleaf", "Zangoose", "Seviper", "Surskit", "Skorupi", "Misdreavus", "Tympole", "Swablu",
  6150 |     "Azumarill SF", "Barboach SF", "Magikarp SF", "Goldeen SF", "Geodude", "Zubat", "Lunatone",
  6151 |     "Solrock", "Deino", "Druddigon", "Clefairy", "Bagon", "Taillow", "Jigglypuff", "Wingull",
  6152 |     "Pidove", "Wailmer", "Tentacool", "Spoink", "Mankey", "Ponyta", "Wynaut", "Hyperspace Hole"
  6153 |   ]),
  6154 |   "hoenn-gym-5": makeEncounterWheel("Hoenn", 5, [
  6155 |     "Sandshrew", "Trapinch", "Cacnea", "Baltoy", "Sandile", "Dwebble", "Gible", "Marill",
  6156 |     "Surskit", "Barboach SF", "Magikarp SF", "Goldeen SF", "Geodude", "Frillish SF", "Skrelp SF",
```


#### Hit 8 — line 6144

```text
  6126 |     "Chikorita", "Cyndaquil", "Totodile", "Wurmple", "Zigzagoon", "Poochyena", "Lillipup", "Zorua",
  6127 |     "Sewaddle", "Turtwig", "Chimchar", "Piplup", "Snivy", "Oshawott", "Tepig", "Wingull",
  6128 |     "Wailmer SF", "Carvanha SF", "Chatot", "Shellos", "Tentacool SF", "Magikarp SF", "Lotad",
  6129 |     "Seedot", "Ralts", "Surskit", "Gothita", "Tympole", "Marill", "Corphish SF", "Goldeen SF",
  6130 |     "Taillow", "Pidove", "Shroomish", "Slakoth", "Cottonee", "Paras", "Phantump", "Omanyte",
  6131 |     "Kabuto", "Aerodactyl", "Lileep", "Anorith", "Cranidos", "Shieldon", "Tirtouga", "Archen",
  6132 |     "Tyrunt", "Amaura", "Makuhita", "Whismur", "Nincada", "Skitty", "Hyperspace Hole", "Joltik",
  6133 |     "Eevee", "Abra", "Geodude"
  6134 |   ]),
  6135 |   "hoenn-gym-2": makeEncounterWheel("Hoenn", 2, [
  6136 |     "Tentacool SF", "Wingull SF", "Wailmer SF", "Magikarp SF", "Zubat", "Makuhita", "Geodude",
  6137 |     "Abra", "Timburr", "Axew", "Onix", "Aron", "Sableye", "Mawile", "Nosepass", "Electrike",
  6138 |     "Zigzagoon", "Gulpin", "Plusle", "Minun", "Oddish", "Hyperspace Hole", "Voltorb", "Trubbish",
  6139 |     "Chatot", "Shellos", "Magnemite", "Poochyena"
  6140 |   ]),
  6141 |   "hoenn-gym-3": makeEncounterWheel("Hoenn", 3, [
  6142 |     "Zigzagoon", "Roselia", "Marill", "Volbeat", "Illumise", "Oddish", "Surskit", "Rattata",
  6143 |     "Deerling", "Tympole SF", "Corphish SF", "Magikarp SF", "Goldeen SF", "Poochyena", "Seedot",
  6144 |     "Numel", "Machop", "Ponyta", "Throh", "Sawk", "Tyrogue", "Hyperspace Hole"
  6145 |   ]),
  6146 |   "hoenn-gym-4": makeEncounterWheel("Hoenn", 4, [
  6147 |     "Spinda", "Sandshrew", "Skarmory", "Scraggy", "Klefki", "Bouffalant", "Slugma", "Numel",
  6148 |     "Koffing", "Torkoal", "Grimer", "Roggenrola", "Diglett", "Tyrogue", "Swablu", "Lombre",
  6149 |     "Nuzleaf", "Zangoose", "Seviper", "Surskit", "Skorupi", "Misdreavus", "Tympole", "Swablu",
  6150 |     "Azumarill SF", "Barboach SF", "Magikarp SF", "Goldeen SF", "Geodude", "Zubat", "Lunatone",
  6151 |     "Solrock", "Deino", "Druddigon", "Clefairy", "Bagon", "Taillow", "Jigglypuff", "Wingull",
  6152 |     "Pidove", "Wailmer", "Tentacool", "Spoink", "Mankey", "Ponyta", "Wynaut", "Hyperspace Hole"
  6153 |   ]),
  6154 |   "hoenn-gym-5": makeEncounterWheel("Hoenn", 5, [
  6155 |     "Sandshrew", "Trapinch", "Cacnea", "Baltoy", "Sandile", "Dwebble", "Gible", "Marill",
  6156 |     "Surskit", "Barboach SF", "Magikarp SF", "Goldeen SF", "Geodude", "Frillish SF", "Skrelp SF",
  6157 |     "Clauncher SF", "Krabby SF", "Tentacool SF", "Wingull SF", "Wailmer SF", "Clamperl SF",
  6158 |     "Lanturn SF", "Relicanth SF", "Spiritomb", "Hyperspace Hole"
  6159 |   ]),
  6160 |   "hoenn-gym-6": makeEncounterWheel("Hoenn", 6, [
  6161 |     "Linoone", "Manectric", "Pelipper", "Kecleon", "Raticate", "Luxio", "Aipom", "Tentacool SF",
  6162 |     "Sharpedo SF", "Magikarp SF", "Goldeen SF", "Gloom", "Tropius", "Feebas SF", "Castform",
```


#### Hit 9 — line 6152

```text
  6134 |   ]),
  6135 |   "hoenn-gym-2": makeEncounterWheel("Hoenn", 2, [
  6136 |     "Tentacool SF", "Wingull SF", "Wailmer SF", "Magikarp SF", "Zubat", "Makuhita", "Geodude",
  6137 |     "Abra", "Timburr", "Axew", "Onix", "Aron", "Sableye", "Mawile", "Nosepass", "Electrike",
  6138 |     "Zigzagoon", "Gulpin", "Plusle", "Minun", "Oddish", "Hyperspace Hole", "Voltorb", "Trubbish",
  6139 |     "Chatot", "Shellos", "Magnemite", "Poochyena"
  6140 |   ]),
  6141 |   "hoenn-gym-3": makeEncounterWheel("Hoenn", 3, [
  6142 |     "Zigzagoon", "Roselia", "Marill", "Volbeat", "Illumise", "Oddish", "Surskit", "Rattata",
  6143 |     "Deerling", "Tympole SF", "Corphish SF", "Magikarp SF", "Goldeen SF", "Poochyena", "Seedot",
  6144 |     "Numel", "Machop", "Ponyta", "Throh", "Sawk", "Tyrogue", "Hyperspace Hole"
  6145 |   ]),
  6146 |   "hoenn-gym-4": makeEncounterWheel("Hoenn", 4, [
  6147 |     "Spinda", "Sandshrew", "Skarmory", "Scraggy", "Klefki", "Bouffalant", "Slugma", "Numel",
  6148 |     "Koffing", "Torkoal", "Grimer", "Roggenrola", "Diglett", "Tyrogue", "Swablu", "Lombre",
  6149 |     "Nuzleaf", "Zangoose", "Seviper", "Surskit", "Skorupi", "Misdreavus", "Tympole", "Swablu",
  6150 |     "Azumarill SF", "Barboach SF", "Magikarp SF", "Goldeen SF", "Geodude", "Zubat", "Lunatone",
  6151 |     "Solrock", "Deino", "Druddigon", "Clefairy", "Bagon", "Taillow", "Jigglypuff", "Wingull",
  6152 |     "Pidove", "Wailmer", "Tentacool", "Spoink", "Mankey", "Ponyta", "Wynaut", "Hyperspace Hole"
  6153 |   ]),
  6154 |   "hoenn-gym-5": makeEncounterWheel("Hoenn", 5, [
  6155 |     "Sandshrew", "Trapinch", "Cacnea", "Baltoy", "Sandile", "Dwebble", "Gible", "Marill",
  6156 |     "Surskit", "Barboach SF", "Magikarp SF", "Goldeen SF", "Geodude", "Frillish SF", "Skrelp SF",
  6157 |     "Clauncher SF", "Krabby SF", "Tentacool SF", "Wingull SF", "Wailmer SF", "Clamperl SF",
  6158 |     "Lanturn SF", "Relicanth SF", "Spiritomb", "Hyperspace Hole"
  6159 |   ]),
  6160 |   "hoenn-gym-6": makeEncounterWheel("Hoenn", 6, [
  6161 |     "Linoone", "Manectric", "Pelipper", "Kecleon", "Raticate", "Luxio", "Aipom", "Tentacool SF",
  6162 |     "Sharpedo SF", "Magikarp SF", "Goldeen SF", "Gloom", "Tropius", "Feebas SF", "Castform",
  6163 |     "Skitty", "Plusle", "Shuppet", "Duskull", "Marill SF", "Surskit SF", "Corphish SF",
  6164 |     "Mightyena", "Wailmer SF", "Hyperspace Hole"
  6165 |   ]),
  6166 |   "hoenn-gym-7": makeEncounterWheel("Hoenn", 7, [
  6167 |     "Oddish", "Marill", "Kecleon", "Linoone", "Tropius", "Absol", "Surskit", "Barboach SF",
  6168 |     "Magikarp SF", "Tentacool SF", "Goldeen SF", "Mightyena", "Seedot", "Golbat", "Shuppet",
  6169 |     "Pelipper", "Elgyem", "Hypno", "Aipom", "Duskull", "Wailmer SF", "Doduo", "Psyduck",
  6170 |     "Rhyhorn", "Kakuna", "Pidgeotto", "Buneary", "Heracross", "Donphan", "Pinsir", "Xatu",
```


#### Hit 10 — line 6158

```text
  6140 |   ]),
  6141 |   "hoenn-gym-3": makeEncounterWheel("Hoenn", 3, [
  6142 |     "Zigzagoon", "Roselia", "Marill", "Volbeat", "Illumise", "Oddish", "Surskit", "Rattata",
  6143 |     "Deerling", "Tympole SF", "Corphish SF", "Magikarp SF", "Goldeen SF", "Poochyena", "Seedot",
  6144 |     "Numel", "Machop", "Ponyta", "Throh", "Sawk", "Tyrogue", "Hyperspace Hole"
  6145 |   ]),
  6146 |   "hoenn-gym-4": makeEncounterWheel("Hoenn", 4, [
  6147 |     "Spinda", "Sandshrew", "Skarmory", "Scraggy", "Klefki", "Bouffalant", "Slugma", "Numel",
  6148 |     "Koffing", "Torkoal", "Grimer", "Roggenrola", "Diglett", "Tyrogue", "Swablu", "Lombre",
  6149 |     "Nuzleaf", "Zangoose", "Seviper", "Surskit", "Skorupi", "Misdreavus", "Tympole", "Swablu",
  6150 |     "Azumarill SF", "Barboach SF", "Magikarp SF", "Goldeen SF", "Geodude", "Zubat", "Lunatone",
  6151 |     "Solrock", "Deino", "Druddigon", "Clefairy", "Bagon", "Taillow", "Jigglypuff", "Wingull",
  6152 |     "Pidove", "Wailmer", "Tentacool", "Spoink", "Mankey", "Ponyta", "Wynaut", "Hyperspace Hole"
  6153 |   ]),
  6154 |   "hoenn-gym-5": makeEncounterWheel("Hoenn", 5, [
  6155 |     "Sandshrew", "Trapinch", "Cacnea", "Baltoy", "Sandile", "Dwebble", "Gible", "Marill",
  6156 |     "Surskit", "Barboach SF", "Magikarp SF", "Goldeen SF", "Geodude", "Frillish SF", "Skrelp SF",
  6157 |     "Clauncher SF", "Krabby SF", "Tentacool SF", "Wingull SF", "Wailmer SF", "Clamperl SF",
  6158 |     "Lanturn SF", "Relicanth SF", "Spiritomb", "Hyperspace Hole"
  6159 |   ]),
  6160 |   "hoenn-gym-6": makeEncounterWheel("Hoenn", 6, [
  6161 |     "Linoone", "Manectric", "Pelipper", "Kecleon", "Raticate", "Luxio", "Aipom", "Tentacool SF",
  6162 |     "Sharpedo SF", "Magikarp SF", "Goldeen SF", "Gloom", "Tropius", "Feebas SF", "Castform",
  6163 |     "Skitty", "Plusle", "Shuppet", "Duskull", "Marill SF", "Surskit SF", "Corphish SF",
  6164 |     "Mightyena", "Wailmer SF", "Hyperspace Hole"
  6165 |   ]),
  6166 |   "hoenn-gym-7": makeEncounterWheel("Hoenn", 7, [
  6167 |     "Oddish", "Marill", "Kecleon", "Linoone", "Tropius", "Absol", "Surskit", "Barboach SF",
  6168 |     "Magikarp SF", "Tentacool SF", "Goldeen SF", "Mightyena", "Seedot", "Golbat", "Shuppet",
  6169 |     "Pelipper", "Elgyem", "Hypno", "Aipom", "Duskull", "Wailmer SF", "Doduo", "Psyduck",
  6170 |     "Rhyhorn", "Kakuna", "Pidgeotto", "Buneary", "Heracross", "Donphan", "Pinsir", "Xatu",
  6171 |     "Wobbuffet", "Pikachu", "Girafarig", "Teddiursa", "Hoothoot", "Pineco", "Houndour",
  6172 |     "Miltank", "Ledyba", "Sunkern", "Shuckle", "Geodude", "Mareep", "Gligar", "Snubbull",
  6173 |     "Stantler", "Spinarak", "Quagsire SF", "Octillery SF", "Frillish SF", "Finneon SF",
  6174 |     "Alomomola SF", "Sharpedo SF", "Meditite", "Vulpix", "Bronzor", "Growlithe", "Chimecho",
  6175 |     "Staryu", "Electrode", "Torkoal", "Hyperspace Hole", "Lanturn SF", "Clamperl SF",
  6176 |     "Relicanth SF", "Beldum", "Seel", "Spheal", "Snorunt", "Cubchoo", "Delibird"
```


#### Hit 11 — line 6164

```text
  6146 |   "hoenn-gym-4": makeEncounterWheel("Hoenn", 4, [
  6147 |     "Spinda", "Sandshrew", "Skarmory", "Scraggy", "Klefki", "Bouffalant", "Slugma", "Numel",
  6148 |     "Koffing", "Torkoal", "Grimer", "Roggenrola", "Diglett", "Tyrogue", "Swablu", "Lombre",
  6149 |     "Nuzleaf", "Zangoose", "Seviper", "Surskit", "Skorupi", "Misdreavus", "Tympole", "Swablu",
  6150 |     "Azumarill SF", "Barboach SF", "Magikarp SF", "Goldeen SF", "Geodude", "Zubat", "Lunatone",
  6151 |     "Solrock", "Deino", "Druddigon", "Clefairy", "Bagon", "Taillow", "Jigglypuff", "Wingull",
  6152 |     "Pidove", "Wailmer", "Tentacool", "Spoink", "Mankey", "Ponyta", "Wynaut", "Hyperspace Hole"
  6153 |   ]),
  6154 |   "hoenn-gym-5": makeEncounterWheel("Hoenn", 5, [
  6155 |     "Sandshrew", "Trapinch", "Cacnea", "Baltoy", "Sandile", "Dwebble", "Gible", "Marill",
  6156 |     "Surskit", "Barboach SF", "Magikarp SF", "Goldeen SF", "Geodude", "Frillish SF", "Skrelp SF",
  6157 |     "Clauncher SF", "Krabby SF", "Tentacool SF", "Wingull SF", "Wailmer SF", "Clamperl SF",
  6158 |     "Lanturn SF", "Relicanth SF", "Spiritomb", "Hyperspace Hole"
  6159 |   ]),
  6160 |   "hoenn-gym-6": makeEncounterWheel("Hoenn", 6, [
  6161 |     "Linoone", "Manectric", "Pelipper", "Kecleon", "Raticate", "Luxio", "Aipom", "Tentacool SF",
  6162 |     "Sharpedo SF", "Magikarp SF", "Goldeen SF", "Gloom", "Tropius", "Feebas SF", "Castform",
  6163 |     "Skitty", "Plusle", "Shuppet", "Duskull", "Marill SF", "Surskit SF", "Corphish SF",
  6164 |     "Mightyena", "Wailmer SF", "Hyperspace Hole"
  6165 |   ]),
  6166 |   "hoenn-gym-7": makeEncounterWheel("Hoenn", 7, [
  6167 |     "Oddish", "Marill", "Kecleon", "Linoone", "Tropius", "Absol", "Surskit", "Barboach SF",
  6168 |     "Magikarp SF", "Tentacool SF", "Goldeen SF", "Mightyena", "Seedot", "Golbat", "Shuppet",
  6169 |     "Pelipper", "Elgyem", "Hypno", "Aipom", "Duskull", "Wailmer SF", "Doduo", "Psyduck",
  6170 |     "Rhyhorn", "Kakuna", "Pidgeotto", "Buneary", "Heracross", "Donphan", "Pinsir", "Xatu",
  6171 |     "Wobbuffet", "Pikachu", "Girafarig", "Teddiursa", "Hoothoot", "Pineco", "Houndour",
  6172 |     "Miltank", "Ledyba", "Sunkern", "Shuckle", "Geodude", "Mareep", "Gligar", "Snubbull",
  6173 |     "Stantler", "Spinarak", "Quagsire SF", "Octillery SF", "Frillish SF", "Finneon SF",
  6174 |     "Alomomola SF", "Sharpedo SF", "Meditite", "Vulpix", "Bronzor", "Growlithe", "Chimecho",
  6175 |     "Staryu", "Electrode", "Torkoal", "Hyperspace Hole", "Lanturn SF", "Clamperl SF",
  6176 |     "Relicanth SF", "Beldum", "Seel", "Spheal", "Snorunt", "Cubchoo", "Delibird"
  6177 |   ]),
  6178 |   "hoenn-gym-8": makeEncounterWheel("Hoenn", 8, [
  6179 |     "Frillish SF", "Finneon SF", "Alomomola SF", "Tentacool SF", "Pelipper SF", "Wailmer SF",
  6180 |     "Magikarp SF", "Chinchou SF", "Clamperl SF", "Relicanth SF", "Sharpedo SF", "Luvdisc SF",
  6181 |     "Corsola SF", "Golbat", "Graveler", "Hyperspace Hole", "Horsea SF", "Claydol", "Ariados",
  6182 |     "Sableye", "Mawile", "Swablu", "Banette", "Dusclops"
```


#### Hit 12 — line 6175

```text
  6157 |     "Clauncher SF", "Krabby SF", "Tentacool SF", "Wingull SF", "Wailmer SF", "Clamperl SF",
  6158 |     "Lanturn SF", "Relicanth SF", "Spiritomb", "Hyperspace Hole"
  6159 |   ]),
  6160 |   "hoenn-gym-6": makeEncounterWheel("Hoenn", 6, [
  6161 |     "Linoone", "Manectric", "Pelipper", "Kecleon", "Raticate", "Luxio", "Aipom", "Tentacool SF",
  6162 |     "Sharpedo SF", "Magikarp SF", "Goldeen SF", "Gloom", "Tropius", "Feebas SF", "Castform",
  6163 |     "Skitty", "Plusle", "Shuppet", "Duskull", "Marill SF", "Surskit SF", "Corphish SF",
  6164 |     "Mightyena", "Wailmer SF", "Hyperspace Hole"
  6165 |   ]),
  6166 |   "hoenn-gym-7": makeEncounterWheel("Hoenn", 7, [
  6167 |     "Oddish", "Marill", "Kecleon", "Linoone", "Tropius", "Absol", "Surskit", "Barboach SF",
  6168 |     "Magikarp SF", "Tentacool SF", "Goldeen SF", "Mightyena", "Seedot", "Golbat", "Shuppet",
  6169 |     "Pelipper", "Elgyem", "Hypno", "Aipom", "Duskull", "Wailmer SF", "Doduo", "Psyduck",
  6170 |     "Rhyhorn", "Kakuna", "Pidgeotto", "Buneary", "Heracross", "Donphan", "Pinsir", "Xatu",
  6171 |     "Wobbuffet", "Pikachu", "Girafarig", "Teddiursa", "Hoothoot", "Pineco", "Houndour",
  6172 |     "Miltank", "Ledyba", "Sunkern", "Shuckle", "Geodude", "Mareep", "Gligar", "Snubbull",
  6173 |     "Stantler", "Spinarak", "Quagsire SF", "Octillery SF", "Frillish SF", "Finneon SF",
  6174 |     "Alomomola SF", "Sharpedo SF", "Meditite", "Vulpix", "Bronzor", "Growlithe", "Chimecho",
  6175 |     "Staryu", "Electrode", "Torkoal", "Hyperspace Hole", "Lanturn SF", "Clamperl SF",
  6176 |     "Relicanth SF", "Beldum", "Seel", "Spheal", "Snorunt", "Cubchoo", "Delibird"
  6177 |   ]),
  6178 |   "hoenn-gym-8": makeEncounterWheel("Hoenn", 8, [
  6179 |     "Frillish SF", "Finneon SF", "Alomomola SF", "Tentacool SF", "Pelipper SF", "Wailmer SF",
  6180 |     "Magikarp SF", "Chinchou SF", "Clamperl SF", "Relicanth SF", "Sharpedo SF", "Luvdisc SF",
  6181 |     "Corsola SF", "Golbat", "Graveler", "Hyperspace Hole", "Horsea SF", "Claydol", "Ariados",
  6182 |     "Sableye", "Mawile", "Swablu", "Banette", "Dusclops"
  6183 |   ]),
  6184 |   "hoenn-gym-9": makeEncounterWheel("Hoenn", 9, [
  6185 |     "Tentacool SF", "Pelipper SF", "Luvdisc SF", "Wailmer SF", "Corsola SF", "Magikarp SF",
  6186 |     "Golbat SF", "Lairon", "Hariyama", "Loudred", "Sableye", "Mawile", "Medicham", "Barboach SF",
  6187 |     "Goldeen SF", "Mantine SF", "Remoraid SF", "Hyperspace Hole", "Tangela", "Glameow",
  6188 |     "Sunkern", "Minccino", "Venomoth", "Zebstrika", "Xatu", "Maractus", "Graveler", "Binacle",
  6189 |     "Persian", "Audino", "Munna", "Ditto", "Darmanitan", "Larvesta", "Porygon", "Forretress",
  6190 |     "Stantler", "Donphan", "Kricketune", "Rufflet", "Vullaby", "Vulpix", "Girafarig", "Magby",
  6191 |     "Elekid", "Crustle", "Happiny", "Klink", "Tynamo", "Boldore", "Excadrill", "Onix",
  6192 |     "Cofagrigus", "Slowpoke", "Unown", "Petilil", "Cherrim"
  6193 |   ])
```


#### Hit 13 — line 6181

```text
  6163 |     "Skitty", "Plusle", "Shuppet", "Duskull", "Marill SF", "Surskit SF", "Corphish SF",
  6164 |     "Mightyena", "Wailmer SF", "Hyperspace Hole"
  6165 |   ]),
  6166 |   "hoenn-gym-7": makeEncounterWheel("Hoenn", 7, [
  6167 |     "Oddish", "Marill", "Kecleon", "Linoone", "Tropius", "Absol", "Surskit", "Barboach SF",
  6168 |     "Magikarp SF", "Tentacool SF", "Goldeen SF", "Mightyena", "Seedot", "Golbat", "Shuppet",
  6169 |     "Pelipper", "Elgyem", "Hypno", "Aipom", "Duskull", "Wailmer SF", "Doduo", "Psyduck",
  6170 |     "Rhyhorn", "Kakuna", "Pidgeotto", "Buneary", "Heracross", "Donphan", "Pinsir", "Xatu",
  6171 |     "Wobbuffet", "Pikachu", "Girafarig", "Teddiursa", "Hoothoot", "Pineco", "Houndour",
  6172 |     "Miltank", "Ledyba", "Sunkern", "Shuckle", "Geodude", "Mareep", "Gligar", "Snubbull",
  6173 |     "Stantler", "Spinarak", "Quagsire SF", "Octillery SF", "Frillish SF", "Finneon SF",
  6174 |     "Alomomola SF", "Sharpedo SF", "Meditite", "Vulpix", "Bronzor", "Growlithe", "Chimecho",
  6175 |     "Staryu", "Electrode", "Torkoal", "Hyperspace Hole", "Lanturn SF", "Clamperl SF",
  6176 |     "Relicanth SF", "Beldum", "Seel", "Spheal", "Snorunt", "Cubchoo", "Delibird"
  6177 |   ]),
  6178 |   "hoenn-gym-8": makeEncounterWheel("Hoenn", 8, [
  6179 |     "Frillish SF", "Finneon SF", "Alomomola SF", "Tentacool SF", "Pelipper SF", "Wailmer SF",
  6180 |     "Magikarp SF", "Chinchou SF", "Clamperl SF", "Relicanth SF", "Sharpedo SF", "Luvdisc SF",
  6181 |     "Corsola SF", "Golbat", "Graveler", "Hyperspace Hole", "Horsea SF", "Claydol", "Ariados",
  6182 |     "Sableye", "Mawile", "Swablu", "Banette", "Dusclops"
  6183 |   ]),
  6184 |   "hoenn-gym-9": makeEncounterWheel("Hoenn", 9, [
  6185 |     "Tentacool SF", "Pelipper SF", "Luvdisc SF", "Wailmer SF", "Corsola SF", "Magikarp SF",
  6186 |     "Golbat SF", "Lairon", "Hariyama", "Loudred", "Sableye", "Mawile", "Medicham", "Barboach SF",
  6187 |     "Goldeen SF", "Mantine SF", "Remoraid SF", "Hyperspace Hole", "Tangela", "Glameow",
  6188 |     "Sunkern", "Minccino", "Venomoth", "Zebstrika", "Xatu", "Maractus", "Graveler", "Binacle",
  6189 |     "Persian", "Audino", "Munna", "Ditto", "Darmanitan", "Larvesta", "Porygon", "Forretress",
  6190 |     "Stantler", "Donphan", "Kricketune", "Rufflet", "Vullaby", "Vulpix", "Girafarig", "Magby",
  6191 |     "Elekid", "Crustle", "Happiny", "Klink", "Tynamo", "Boldore", "Excadrill", "Onix",
  6192 |     "Cofagrigus", "Slowpoke", "Unown", "Petilil", "Cherrim"
  6193 |   ])
  6194 | });
  6195 | 
  6196 | const silphCoMovePool = Object.freeze((window.rivalSagaSilphCoMovePool || [
  6197 |   "Thunderbolt",
  6198 |   "Ice Beam",
  6199 |   "Flamethrower",
```


#### Hit 14 — line 6187

```text
  6169 |     "Pelipper", "Elgyem", "Hypno", "Aipom", "Duskull", "Wailmer SF", "Doduo", "Psyduck",
  6170 |     "Rhyhorn", "Kakuna", "Pidgeotto", "Buneary", "Heracross", "Donphan", "Pinsir", "Xatu",
  6171 |     "Wobbuffet", "Pikachu", "Girafarig", "Teddiursa", "Hoothoot", "Pineco", "Houndour",
  6172 |     "Miltank", "Ledyba", "Sunkern", "Shuckle", "Geodude", "Mareep", "Gligar", "Snubbull",
  6173 |     "Stantler", "Spinarak", "Quagsire SF", "Octillery SF", "Frillish SF", "Finneon SF",
  6174 |     "Alomomola SF", "Sharpedo SF", "Meditite", "Vulpix", "Bronzor", "Growlithe", "Chimecho",
  6175 |     "Staryu", "Electrode", "Torkoal", "Hyperspace Hole", "Lanturn SF", "Clamperl SF",
  6176 |     "Relicanth SF", "Beldum", "Seel", "Spheal", "Snorunt", "Cubchoo", "Delibird"
  6177 |   ]),
  6178 |   "hoenn-gym-8": makeEncounterWheel("Hoenn", 8, [
  6179 |     "Frillish SF", "Finneon SF", "Alomomola SF", "Tentacool SF", "Pelipper SF", "Wailmer SF",
  6180 |     "Magikarp SF", "Chinchou SF", "Clamperl SF", "Relicanth SF", "Sharpedo SF", "Luvdisc SF",
  6181 |     "Corsola SF", "Golbat", "Graveler", "Hyperspace Hole", "Horsea SF", "Claydol", "Ariados",
  6182 |     "Sableye", "Mawile", "Swablu", "Banette", "Dusclops"
  6183 |   ]),
  6184 |   "hoenn-gym-9": makeEncounterWheel("Hoenn", 9, [
  6185 |     "Tentacool SF", "Pelipper SF", "Luvdisc SF", "Wailmer SF", "Corsola SF", "Magikarp SF",
  6186 |     "Golbat SF", "Lairon", "Hariyama", "Loudred", "Sableye", "Mawile", "Medicham", "Barboach SF",
  6187 |     "Goldeen SF", "Mantine SF", "Remoraid SF", "Hyperspace Hole", "Tangela", "Glameow",
  6188 |     "Sunkern", "Minccino", "Venomoth", "Zebstrika", "Xatu", "Maractus", "Graveler", "Binacle",
  6189 |     "Persian", "Audino", "Munna", "Ditto", "Darmanitan", "Larvesta", "Porygon", "Forretress",
  6190 |     "Stantler", "Donphan", "Kricketune", "Rufflet", "Vullaby", "Vulpix", "Girafarig", "Magby",
  6191 |     "Elekid", "Crustle", "Happiny", "Klink", "Tynamo", "Boldore", "Excadrill", "Onix",
  6192 |     "Cofagrigus", "Slowpoke", "Unown", "Petilil", "Cherrim"
  6193 |   ])
  6194 | });
  6195 | 
  6196 | const silphCoMovePool = Object.freeze((window.rivalSagaSilphCoMovePool || [
  6197 |   "Thunderbolt",
  6198 |   "Ice Beam",
  6199 |   "Flamethrower",
  6200 |   "Earthquake",
  6201 |   "Calm Mind",
  6202 |   "Swords Dance",
  6203 |   "Recover",
  6204 |   "Knock Off",
  6205 |   "U-turn",
```


#### Hit 15 — line 41524

```text
 41506 |         resultName: session.resultDisplayName || "Pending result",
 41507 |         meta: `${session.series || state.series} Gym ${session.gym || state.gym}`
 41508 |       });
 41509 |     });
 41510 |   (state.encounterSessions || [])
 41511 |     .filter((session) => ["pending", "review"].includes(session.status))
 41512 |     .forEach((session) => {
 41513 |       const owner = state.players.find((player) => player.id === session.playerId);
 41514 |       (session.rolls || [])
 41515 |         .filter((roll) => !roll.rosterPokemonId)
 41516 |         .forEach((roll) => {
 41517 |           targets.push({
 41518 |             id: `encounter-roll:${session.id}:${roll.id}`,
 41519 |             kind: "encounter-roll",
 41520 |             targetResultId: roll.id,
 41521 |             encounterSessionId: session.id,
 41522 |             ownerPlayerId: session.playerId,
 41523 |             ownerName: owner?.name || "Unknown",
 41524 |             sourceLabel: roll.specialEncounter ? "Encounter / Hyperspace" : "Encounter Wheel",
 41525 |             resultName: roll.resultDisplayName || "Pending encounter",
 41526 |             meta: `${session.series || state.series} Gym ${session.gym || state.gym}`
 41527 |           });
 41528 |         });
 41529 |     });
 41530 |   return targets;
 41531 | }
 41532 | 
 41533 | function closeRerollTargetModal() {
 41534 |   state.rerollTargetActorPlayerId = "";
 41535 |   els.rerollTargetModal?.classList.add("hidden");
 41536 | }
 41537 | 
 41538 | function openRerollTargetModal(actorPlayerId) {
 41539 |   const actor = state.players.find((player) => player.id === actorPlayerId);
 41540 |   if (!actor) return;
 41541 |   if (!requirePrivatePrepAccess(actor, "reroll token")) return;
 41542 |   if (playerRerollTokenIndex(actor) < 0) {
```


#### Hit 16 — line 41893

```text
 41875 |       operationType: "rerollEncounterResult", sourceEffectId, sourceTokenId: rerollToken.id,
 41876 |       targetResultId: roll.id, targetSessionId: session.id, resultKind: "encounter-roll",
 41877 |       previousResultRevisionId: previousRevisionId, replacementResultRevisionId: roll.resultRevisionId,
 41878 |       status: "completed", createdAt: new Date().toISOString()
 41879 |     };
 41880 |     state.effectOperations ||= [];
 41881 |     state.effectOperations.push(operation);
 41882 |     recordRerollTokenHistory({ snapshot: causalBeforeReroll, actor, token: rerollToken, sourceEffectId,
 41883 |       targetResultId: roll.id, targetPlayerId: player.id, previousName: previousResult.resultDisplayName,
 41884 |       nextName, resultKind: "encounter-roll" });
 41885 |   }
 41886 |   updateEncounterActionLog(session, player, (entry) => {
 41887 |     appendLogCategory(entry, "items");
 41888 |     appendLogCategory(entry, "pokemon");
 41889 |     appendUniqueLogValue(entry, "tags", "encounter-reroll");
 41890 |     if (rerollToken?.name) appendUniqueLogValue(entry, "tokenNames", rerollToken.name);
 41891 |     appendUniqueLogValue(entry, "playerIds", actor.id);
 41892 |     appendUniqueLogValue(entry, "pokemonNames", nextName);
 41893 |     const modeLabel = rerollMode === "encounter" ? "Encounter respin" : shouldStayInSpecialWheel ? "Hyperspace reroll" : "Encounter reroll";
 41894 |     appendGroupedLogDetail(entry, freeRerollReason
 41895 |       ? `${modeLabel} (${freeRerollReason}): ${previousResult.resultDisplayName} -> ${nextName}.`
 41896 |       : `${actor.name} used Reroll Token on ${player.name}'s ${modeLabel}: ${previousResult.resultDisplayName} -> ${nextName}.`);
 41897 |     entry.childEvents ||= [];
 41898 |     entry.childEvents.push({
 41899 |       type: "encounter-reroll",
 41900 |       category: "items",
 41901 |       tokenId: rerollToken?.id || "",
 41902 |       tokenName: rerollToken?.name || "",
 41903 |       actorPlayerId: actor.id,
 41904 |       targetPlayerId: player.id,
 41905 |       targetResultId: roll.id,
 41906 |       free: Boolean(freeRerollReason),
 41907 |       freeReason: freeRerollReason,
 41908 |       mode: rerollMode,
 41909 |       previousPokemon: previousResult.resultDisplayName,
 41910 |       newPokemon: nextName,
 41911 |       encounterRollId: roll.id,
```


#### Hit 17 — line 46694

```text
 46676 |           <button class="ghost-button" type="button" data-encounter-done="${escapeHtml(session.id)}">Done</button>
 46677 |         </div>
 46678 |         <label class="wheel-skip-toggle encounter-skip-toggle">
 46679 |           <input type="checkbox" data-encounter-skip-animation ${state.skipWheelAnimation ? "checked" : ""}>
 46680 |           Skip Animation
 46681 |         </label>
 46682 |         <h3>Results</h3>
 46683 |         <div class="encounter-result-list">
 46684 |           ${rolls.length ? rolls.map((roll, index) => `
 46685 |             <article class="encounter-result-card">
 46686 |               <div class="encounter-result-art">${roll.resultSprite ? `<img src="${escapeHtml(roll.resultSprite)}" alt="${escapeHtml(roll.resultDisplayName)}">` : `<span>${escapeHtml((roll.resultDisplayName || "?").slice(0, 1))}</span>`}</div>
 46687 |               <div>
 46688 |                 <strong>#${index + 1}: ${escapeHtml(roll.resultDisplayName)}</strong>
 46689 |                 <span>${roll.specialEncounter ? `${escapeHtml(roll.specialEncounter.triggerName)} -> ${escapeHtml(roll.specialEncounter.wheelName)}` : escapeHtml(roll.category || "land")} - ${escapeHtml(pokemonBattleTierSummary(roll.resultDisplayName || roll.resultPokemonName, "Unassigned"))}${roll.rerollHistory?.length ? ` - ${roll.rerollHistory.length} reroll${roll.rerollHistory.length === 1 ? "" : "s"}` : ""}</span>
 46690 |               </div>
 46691 |               <div class="encounter-result-actions">
 46692 |                 ${roll.rosterPokemonId ? `<span class="encounter-result-added">Added</span>` : `
 46693 |                   <button class="buy-button mini-button" type="button" data-encounter-add="${escapeHtml(roll.id)}">Add</button>
 46694 |                   <button class="ghost-button mini-button" type="button" data-encounter-reroll="${escapeHtml(roll.id)}" data-encounter-reroll-mode="result"${rollFreeRerollReasons[roll.id] || rerollTokenCount ? "" : " disabled"} title="${roll.specialEncounter ? `Spend ${player.name}'s Reroll Token to reroll within the Hyperspace sub-wheel.` : rollFreeRerollReasons[roll.id] ? `Free reroll: ${escapeHtml(rollFreeRerollReasons[roll.id])}` : rerollTokenCount ? `Spend ${player.name}'s Reroll Token on this encounter result.` : `${player.name} needs a Reroll Token.`}">${roll.specialEncounter ? "Owner Reroll Hyperspace" : rollFreeRerollReasons[roll.id] ? "Free Reroll" : `Owner Reroll${rerollTokenCount ? ` (${rerollTokenCount})` : ""}`}</button>
 46695 |                   ${roll.specialEncounter ? `<button class="ghost-button mini-button danger-lite" type="button" data-encounter-reroll="${escapeHtml(roll.id)}" data-encounter-reroll-mode="encounter"${rollFreeRerollReasons[roll.id] || rerollTokenCount ? "" : " disabled"} title="${rollFreeRerollReasons[roll.id] ? `Free respin: ${escapeHtml(rollFreeRerollReasons[roll.id])}` : rerollTokenCount ? `Spend ${player.name}'s Reroll Token to respin the original Encounter Wheel result.` : `${player.name} needs a Reroll Token.`}">Owner Respin Encounter</button>` : ""}
 46696 |                 `}
 46697 |               </div>
 46698 |             </article>
 46699 |           `).join("") : `<p class="empty-state compact">Encounter results will appear here.</p>`}
 46700 |         </div>
 46701 |       </section>
 46702 |       <section class="encounter-controls">
 46703 |         <div class="wheel-meta">
 46704 |           <div><span>Trainer</span><strong>${escapeHtml(player.name)}</strong></div>
 46705 |           <div><span>Rolls</span><strong>${rolls.length}/${max}</strong></div>
 46706 |           <div><span>Active Options</span><strong>${entries.length}</strong></div>
 46707 |           <div><span>Rerolls</span><strong>Allowed</strong></div>
 46708 |         </div>
 46709 |         <div class="encounter-toggle-row">
 46710 |           <label><input type="checkbox" data-encounter-toggle="water" ${session.includeFishing || session.includeSurf ? "checked" : ""}> Include Fishing / Surf</label>
 46711 |           <label><input type="checkbox" data-encounter-weight-editing ${weightEditing ? "checked" : ""}${rolls.length ? " disabled" : ""}> Edit Weights</label>
 46712 |         </div>
```


#### Hit 18 — line 46694

```text
 46676 |           <button class="ghost-button" type="button" data-encounter-done="${escapeHtml(session.id)}">Done</button>
 46677 |         </div>
 46678 |         <label class="wheel-skip-toggle encounter-skip-toggle">
 46679 |           <input type="checkbox" data-encounter-skip-animation ${state.skipWheelAnimation ? "checked" : ""}>
 46680 |           Skip Animation
 46681 |         </label>
 46682 |         <h3>Results</h3>
 46683 |         <div class="encounter-result-list">
 46684 |           ${rolls.length ? rolls.map((roll, index) => `
 46685 |             <article class="encounter-result-card">
 46686 |               <div class="encounter-result-art">${roll.resultSprite ? `<img src="${escapeHtml(roll.resultSprite)}" alt="${escapeHtml(roll.resultDisplayName)}">` : `<span>${escapeHtml((roll.resultDisplayName || "?").slice(0, 1))}</span>`}</div>
 46687 |               <div>
 46688 |                 <strong>#${index + 1}: ${escapeHtml(roll.resultDisplayName)}</strong>
 46689 |                 <span>${roll.specialEncounter ? `${escapeHtml(roll.specialEncounter.triggerName)} -> ${escapeHtml(roll.specialEncounter.wheelName)}` : escapeHtml(roll.category || "land")} - ${escapeHtml(pokemonBattleTierSummary(roll.resultDisplayName || roll.resultPokemonName, "Unassigned"))}${roll.rerollHistory?.length ? ` - ${roll.rerollHistory.length} reroll${roll.rerollHistory.length === 1 ? "" : "s"}` : ""}</span>
 46690 |               </div>
 46691 |               <div class="encounter-result-actions">
 46692 |                 ${roll.rosterPokemonId ? `<span class="encounter-result-added">Added</span>` : `
 46693 |                   <button class="buy-button mini-button" type="button" data-encounter-add="${escapeHtml(roll.id)}">Add</button>
 46694 |                   <button class="ghost-button mini-button" type="button" data-encounter-reroll="${escapeHtml(roll.id)}" data-encounter-reroll-mode="result"${rollFreeRerollReasons[roll.id] || rerollTokenCount ? "" : " disabled"} title="${roll.specialEncounter ? `Spend ${player.name}'s Reroll Token to reroll within the Hyperspace sub-wheel.` : rollFreeRerollReasons[roll.id] ? `Free reroll: ${escapeHtml(rollFreeRerollReasons[roll.id])}` : rerollTokenCount ? `Spend ${player.name}'s Reroll Token on this encounter result.` : `${player.name} needs a Reroll Token.`}">${roll.specialEncounter ? "Owner Reroll Hyperspace" : rollFreeRerollReasons[roll.id] ? "Free Reroll" : `Owner Reroll${rerollTokenCount ? ` (${rerollTokenCount})` : ""}`}</button>
 46695 |                   ${roll.specialEncounter ? `<button class="ghost-button mini-button danger-lite" type="button" data-encounter-reroll="${escapeHtml(roll.id)}" data-encounter-reroll-mode="encounter"${rollFreeRerollReasons[roll.id] || rerollTokenCount ? "" : " disabled"} title="${rollFreeRerollReasons[roll.id] ? `Free respin: ${escapeHtml(rollFreeRerollReasons[roll.id])}` : rerollTokenCount ? `Spend ${player.name}'s Reroll Token to respin the original Encounter Wheel result.` : `${player.name} needs a Reroll Token.`}">Owner Respin Encounter</button>` : ""}
 46696 |                 `}
 46697 |               </div>
 46698 |             </article>
 46699 |           `).join("") : `<p class="empty-state compact">Encounter results will appear here.</p>`}
 46700 |         </div>
 46701 |       </section>
 46702 |       <section class="encounter-controls">
 46703 |         <div class="wheel-meta">
 46704 |           <div><span>Trainer</span><strong>${escapeHtml(player.name)}</strong></div>
 46705 |           <div><span>Rolls</span><strong>${rolls.length}/${max}</strong></div>
 46706 |           <div><span>Active Options</span><strong>${entries.length}</strong></div>
 46707 |           <div><span>Rerolls</span><strong>Allowed</strong></div>
 46708 |         </div>
 46709 |         <div class="encounter-toggle-row">
 46710 |           <label><input type="checkbox" data-encounter-toggle="water" ${session.includeFishing || session.includeSurf ? "checked" : ""}> Include Fishing / Surf</label>
 46711 |           <label><input type="checkbox" data-encounter-weight-editing ${weightEditing ? "checked" : ""}${rolls.length ? " disabled" : ""}> Edit Weights</label>
 46712 |         </div>
```


### randomPokemonSessions

Occurrences: 30+

#### Hit 1 — line 2555

```text
  2537 |       highestThresholdAwardedByPlayerId: {},
  2538 |       assignments: [],
  2539 |       aTierSafetyTriggered: false,
  2540 |       aTierSafetyTriggeringPlayerId: "",
  2541 |       aTierSafetyEligiblePlayerIds: [],
  2542 |       aTierSafetyCompletedPlayerIds: [],
  2543 |       adminWarnings: []
  2544 |     },
  2545 |     infoBattleTierRoller: {
  2546 |       tierId: "",
  2547 |       result: null
  2548 |     },
  2549 |     selectedWheelSessionId: "",
  2550 |     wheelDrawerOpen: false,
  2551 |     skipWheelAnimation: false,
  2552 |     encounterSessions: [],
  2553 |     selectedEncounterSessionId: "",
  2554 |     encounterModalOpen: false,
  2555 |     randomPokemonSessions: [],
  2556 |     pokemonFamilyTierCache: {},
  2557 |     pokemonSpriteVariants: {},
  2558 |     tokenArtLibrary: {},
  2559 |     selectedRandomPokemonSessionId: "",
  2560 |     randomPokemonDrawerOpen: false,
  2561 |     routeUiState: createDefaultRouteUiState(),
  2562 |     spriteAliases: {},
  2563 |     pokemonTierOverrides: {},
  2564 |     seriesOrder: [],
  2565 |     seriesChoiceRequired: true,
  2566 |     activityLogFilters: {
  2567 |       search: "",
  2568 |       playerId: "all",
  2569 |       phase: "all",
  2570 |       category: "all",
  2571 |       series: "all",
  2572 |       gym: "all",
  2573 |       undo: "all",
```


#### Hit 2 — line 3815

```text
  3797 |     createdAt: new Date().toISOString()
  3798 |   };
  3799 |   state.tokenActivations ||= [];
  3800 |   state.tokenActivations.unshift(activation);
  3801 |   return activation;
  3802 | }
  3803 | 
  3804 | function tokenUseRollbackSnapshot() {
  3805 |   return {
  3806 |     previousPlayers: structuredClone(state.players || []),
  3807 |     previousPokemonRecords: structuredClone(state.pokemonRecords || []),
  3808 |     previousPokemonLog: structuredClone(state.pokemonLog || []),
  3809 |     previousLingeringStatuses: structuredClone(state.lingeringStatuses || []),
  3810 |     previousTokenActivations: structuredClone(state.tokenActivations || []),
  3811 |     previousTokenConsumptions: structuredClone(state.tokenConsumptions || []),
  3812 |     previousPlayerNotifications: structuredClone(state.playerNotifications || []),
  3813 |     previousWheelSessions: structuredClone(state.wheelSessions || []),
  3814 |     previousEncounterSessions: structuredClone(state.encounterSessions || []),
  3815 |     previousRandomPokemonSessions: structuredClone(state.randomPokemonSessions || []),
  3816 |     previousSelectedEncounterSessionId: state.selectedEncounterSessionId || "",
  3817 |     previousEncounterModalOpen: Boolean(state.encounterModalOpen),
  3818 |     previousInteractionEvents: structuredClone(state.interactionEvents || []),
  3819 |     previousTransactions: structuredClone(state.transactions || []),
  3820 |     previousGlobalPokemonRules: structuredClone(state.globalPokemonRules || {}),
  3821 |     previousBanlistHistory: structuredClone(state.banlistHistory || []),
  3822 |     previousTeambuilder: structuredClone(state.teambuilder || {}),
  3823 |     previousBattleTeams: structuredClone(state.battleTeams || {}),
  3824 |     previousPerkSystem: structuredClone(state.perkSystem || {}),
  3825 |     previousClassStateByPlayerId: structuredClone(state.classStateByPlayerId || {}),
  3826 |     previousPhaseState: structuredClone(state.phaseState || {}),
  3827 |     previousEffectAuditRecords: structuredClone(state.effectAuditRecords || []),
  3828 |     previousEffectOperations: structuredClone(state.effectOperations || []),
  3829 |     previousDelayedEffects: structuredClone(state.delayedEffects || []),
  3830 |     previousBroughtTeamSnapshots: structuredClone(state.broughtTeamSnapshots || []),
  3831 |     previousCopiedActivations: structuredClone(state.copiedActivations || []),
  3832 |     previousPostPayoutProcedures: structuredClone(state.postPayoutProcedures || []),
  3833 |     previousEndOfActionProcedures: structuredClone(state.endOfActionProcedures || []),
```


#### Hit 3 — line 4394

```text
  4376 |     causalUndoVersion: 1,
  4377 |     effectId: activity.id,
  4378 |     tokenDefinitionId: metadata.id,
  4379 |     inventoryByPlayer: causalPlayerCollectionDeltas(snapshot.previousPlayers, state.players, "inventory"),
  4380 |     playerBalanceDeltas,
  4381 |     moveGrantsByPlayer: causalPlayerCollectionDeltas(snapshot.previousPlayers, state.players, "moveAccessGrants"),
  4382 |     playerPokemonIdDeltas,
  4383 |     pokemonRecords: causalIdCollectionDelta(snapshot.previousPokemonRecords, state.pokemonRecords),
  4384 |     statuses: causalIdCollectionDelta(snapshot.previousLingeringStatuses, state.lingeringStatuses),
  4385 |     activations: causalIdCollectionDelta(snapshot.previousTokenActivations, state.tokenActivations),
  4386 |     consumptions: causalIdCollectionDelta(snapshot.previousTokenConsumptions, state.tokenConsumptions),
  4387 |     transactions: causalIdCollectionDelta(snapshot.previousTransactions, state.transactions),
  4388 |     notifications: causalIdCollectionDelta(snapshot.previousPlayerNotifications, state.playerNotifications),
  4389 |     effectOperations: causalIdCollectionDelta(snapshot.previousEffectOperations, state.effectOperations),
  4390 |     copiedActivations: causalIdCollectionDelta(snapshot.previousCopiedActivations, state.copiedActivations),
  4391 |     copiedTokenRelationships: causalIdCollectionDelta(snapshot.previousCopiedTokenRelationships, state.copiedTokenRelationships),
  4392 |     wheelSessions: causalIdCollectionDelta(snapshot.previousWheelSessions, state.wheelSessions),
  4393 |     encounterSessions: causalIdCollectionDelta(snapshot.previousEncounterSessions, state.encounterSessions),
  4394 |     randomPokemonSessions: causalIdCollectionDelta(snapshot.previousRandomPokemonSessions, state.randomPokemonSessions),
  4395 |     delayedEffects: causalIdCollectionDelta(snapshot.previousDelayedEffects, state.delayedEffects),
  4396 |     broughtTeamSnapshots: causalIdCollectionDelta(snapshot.previousBroughtTeamSnapshots, state.broughtTeamSnapshots),
  4397 |     postPayoutProcedures: causalIdCollectionDelta(snapshot.previousPostPayoutProcedures, state.postPayoutProcedures),
  4398 |     encounterCopyRecords: causalIdCollectionDelta(snapshot.previousEncounterCopyRecords, state.encounterCopyRecords),
  4399 |     teambuilderFields: causalTopLevelFieldDelta(snapshot.previousTeambuilder || {}, state.teambuilder || {}, ["moveAccessGrantsByPlayerId"]),
  4400 |     battleTeamFields: causalTopLevelFieldDelta(snapshot.previousBattleTeams || {}, state.battleTeams || {}),
  4401 |     pokemonDeltas,
  4402 |     pokemonLog: causalIdCollectionDelta(snapshot.previousPokemonLog || [], state.pokemonLog || []),
  4403 |     teambuilderMoveGrants: causalGrantMapDeltas(snapshot.previousTeambuilder?.moveAccessGrantsByPlayerId, state.teambuilder?.moveAccessGrantsByPlayerId),
  4404 |     perkMoveGrants: causalGrantMapDeltas(snapshot.previousPerkSystem?.moveAccessGrantsByPlayerId, state.perkSystem?.moveAccessGrantsByPlayerId),
  4405 |     classMoveGrants: causalGrantMapDeltas(
  4406 |       Object.fromEntries(Object.entries(snapshot.previousClassStateByPlayerId || {}).map(([id, value]) => [id, value?.moveAccessGrants || []])),
  4407 |       Object.fromEntries(Object.entries(state.classStateByPlayerId || {}).map(([id, value]) => [id, value?.moveAccessGrants || []]))
  4408 |     ),
  4409 |     ruleDeltas,
  4410 |     banlistHistory: causalIdCollectionDelta(snapshot.previousBanlistHistory, state.banlistHistory)
  4411 |   };
  4412 | }
```


#### Hit 4 — line 4394

```text
  4376 |     causalUndoVersion: 1,
  4377 |     effectId: activity.id,
  4378 |     tokenDefinitionId: metadata.id,
  4379 |     inventoryByPlayer: causalPlayerCollectionDeltas(snapshot.previousPlayers, state.players, "inventory"),
  4380 |     playerBalanceDeltas,
  4381 |     moveGrantsByPlayer: causalPlayerCollectionDeltas(snapshot.previousPlayers, state.players, "moveAccessGrants"),
  4382 |     playerPokemonIdDeltas,
  4383 |     pokemonRecords: causalIdCollectionDelta(snapshot.previousPokemonRecords, state.pokemonRecords),
  4384 |     statuses: causalIdCollectionDelta(snapshot.previousLingeringStatuses, state.lingeringStatuses),
  4385 |     activations: causalIdCollectionDelta(snapshot.previousTokenActivations, state.tokenActivations),
  4386 |     consumptions: causalIdCollectionDelta(snapshot.previousTokenConsumptions, state.tokenConsumptions),
  4387 |     transactions: causalIdCollectionDelta(snapshot.previousTransactions, state.transactions),
  4388 |     notifications: causalIdCollectionDelta(snapshot.previousPlayerNotifications, state.playerNotifications),
  4389 |     effectOperations: causalIdCollectionDelta(snapshot.previousEffectOperations, state.effectOperations),
  4390 |     copiedActivations: causalIdCollectionDelta(snapshot.previousCopiedActivations, state.copiedActivations),
  4391 |     copiedTokenRelationships: causalIdCollectionDelta(snapshot.previousCopiedTokenRelationships, state.copiedTokenRelationships),
  4392 |     wheelSessions: causalIdCollectionDelta(snapshot.previousWheelSessions, state.wheelSessions),
  4393 |     encounterSessions: causalIdCollectionDelta(snapshot.previousEncounterSessions, state.encounterSessions),
  4394 |     randomPokemonSessions: causalIdCollectionDelta(snapshot.previousRandomPokemonSessions, state.randomPokemonSessions),
  4395 |     delayedEffects: causalIdCollectionDelta(snapshot.previousDelayedEffects, state.delayedEffects),
  4396 |     broughtTeamSnapshots: causalIdCollectionDelta(snapshot.previousBroughtTeamSnapshots, state.broughtTeamSnapshots),
  4397 |     postPayoutProcedures: causalIdCollectionDelta(snapshot.previousPostPayoutProcedures, state.postPayoutProcedures),
  4398 |     encounterCopyRecords: causalIdCollectionDelta(snapshot.previousEncounterCopyRecords, state.encounterCopyRecords),
  4399 |     teambuilderFields: causalTopLevelFieldDelta(snapshot.previousTeambuilder || {}, state.teambuilder || {}, ["moveAccessGrantsByPlayerId"]),
  4400 |     battleTeamFields: causalTopLevelFieldDelta(snapshot.previousBattleTeams || {}, state.battleTeams || {}),
  4401 |     pokemonDeltas,
  4402 |     pokemonLog: causalIdCollectionDelta(snapshot.previousPokemonLog || [], state.pokemonLog || []),
  4403 |     teambuilderMoveGrants: causalGrantMapDeltas(snapshot.previousTeambuilder?.moveAccessGrantsByPlayerId, state.teambuilder?.moveAccessGrantsByPlayerId),
  4404 |     perkMoveGrants: causalGrantMapDeltas(snapshot.previousPerkSystem?.moveAccessGrantsByPlayerId, state.perkSystem?.moveAccessGrantsByPlayerId),
  4405 |     classMoveGrants: causalGrantMapDeltas(
  4406 |       Object.fromEntries(Object.entries(snapshot.previousClassStateByPlayerId || {}).map(([id, value]) => [id, value?.moveAccessGrants || []])),
  4407 |       Object.fromEntries(Object.entries(state.classStateByPlayerId || {}).map(([id, value]) => [id, value?.moveAccessGrants || []]))
  4408 |     ),
  4409 |     ruleDeltas,
  4410 |     banlistHistory: causalIdCollectionDelta(snapshot.previousBanlistHistory, state.banlistHistory)
  4411 |   };
  4412 | }
```


#### Hit 5 — line 4419

```text
  4401 |     pokemonDeltas,
  4402 |     pokemonLog: causalIdCollectionDelta(snapshot.previousPokemonLog || [], state.pokemonLog || []),
  4403 |     teambuilderMoveGrants: causalGrantMapDeltas(snapshot.previousTeambuilder?.moveAccessGrantsByPlayerId, state.teambuilder?.moveAccessGrantsByPlayerId),
  4404 |     perkMoveGrants: causalGrantMapDeltas(snapshot.previousPerkSystem?.moveAccessGrantsByPlayerId, state.perkSystem?.moveAccessGrantsByPlayerId),
  4405 |     classMoveGrants: causalGrantMapDeltas(
  4406 |       Object.fromEntries(Object.entries(snapshot.previousClassStateByPlayerId || {}).map(([id, value]) => [id, value?.moveAccessGrants || []])),
  4407 |       Object.fromEntries(Object.entries(state.classStateByPlayerId || {}).map(([id, value]) => [id, value?.moveAccessGrants || []]))
  4408 |     ),
  4409 |     ruleDeltas,
  4410 |     banlistHistory: causalIdCollectionDelta(snapshot.previousBanlistHistory, state.banlistHistory)
  4411 |   };
  4412 | }
  4413 | 
  4414 | function mergeCausalTokenUndoData(base = {}, later = {}) {
  4415 |   const merged = structuredClone(base || {});
  4416 |   const collectionKeys = [
  4417 |     "pokemonRecords", "statuses", "activations", "consumptions", "transactions", "notifications",
  4418 |     "effectOperations", "copiedActivations", "copiedTokenRelationships", "wheelSessions", "encounterSessions",
  4419 |     "randomPokemonSessions", "delayedEffects", "broughtTeamSnapshots", "postPayoutProcedures",
  4420 |     "encounterCopyRecords", "pokemonLog", "banlistHistory"
  4421 |   ];
  4422 |   collectionKeys.forEach((key) => {
  4423 |     merged[key] = mergeCausalIdCollectionDelta(merged[key], later[key]);
  4424 |   });
  4425 |   const mergePlayerDeltas = (key) => {
  4426 |     const byPlayer = new Map((merged[key] || []).map((entry) => [entry.playerId, structuredClone(entry)]));
  4427 |     (later[key] || []).forEach((entry) => {
  4428 |       if (!byPlayer.has(entry.playerId)) byPlayer.set(entry.playerId, structuredClone(entry));
  4429 |       else byPlayer.get(entry.playerId).delta = mergeCausalIdCollectionDelta(byPlayer.get(entry.playerId).delta, entry.delta);
  4430 |     });
  4431 |     merged[key] = [...byPlayer.values()];
  4432 |   };
  4433 |   ["inventoryByPlayer", "moveGrantsByPlayer", "teambuilderMoveGrants", "perkMoveGrants", "classMoveGrants"].forEach(mergePlayerDeltas);
  4434 |   const pokemonIdsByPlayer = new Map((merged.playerPokemonIdDeltas || []).map((entry) => [entry.playerId, structuredClone(entry)]));
  4435 |   (later.playerPokemonIdDeltas || []).forEach((entry) => {
  4436 |     if (!pokemonIdsByPlayer.has(entry.playerId)) pokemonIdsByPlayer.set(entry.playerId, structuredClone(entry));
  4437 |     else pokemonIdsByPlayer.get(entry.playerId).delta = mergeCausalScalarSetDelta(pokemonIdsByPlayer.get(entry.playerId).delta, entry.delta);
```


#### Hit 6 — line 4526

```text
  4508 |     const player = state.players.find((entry) => entry.id === playerId);
  4509 |     if (player) player.moveAccessGrants = applyCausalIdCollectionUndo(player.moveAccessGrants, delta);
  4510 |   });
  4511 |   (undoData.playerPokemonIdDeltas || []).forEach(({ playerId, delta }) => {
  4512 |     const player = state.players.find((entry) => entry.id === playerId);
  4513 |     if (player) player.pokemonIds = applyCausalScalarSetUndo(player.pokemonIds, delta);
  4514 |   });
  4515 |   state.pokemonRecords = applyCausalIdCollectionUndo(state.pokemonRecords, undoData.pokemonRecords);
  4516 |   state.lingeringStatuses = applyCausalIdCollectionUndo(state.lingeringStatuses, undoData.statuses);
  4517 |   state.tokenActivations = applyCausalIdCollectionUndo(state.tokenActivations, undoData.activations);
  4518 |   state.tokenConsumptions = applyCausalIdCollectionUndo(state.tokenConsumptions, undoData.consumptions);
  4519 |   state.transactions = applyCausalIdCollectionUndo(state.transactions, undoData.transactions);
  4520 |   state.playerNotifications = applyCausalIdCollectionUndo(state.playerNotifications, undoData.notifications);
  4521 |   state.effectOperations = applyCausalIdCollectionUndo(state.effectOperations, undoData.effectOperations);
  4522 |   state.copiedActivations = applyCausalIdCollectionUndo(state.copiedActivations, undoData.copiedActivations);
  4523 |   state.copiedTokenRelationships = applyCausalIdCollectionUndo(state.copiedTokenRelationships, undoData.copiedTokenRelationships);
  4524 |   state.wheelSessions = applyCausalIdCollectionUndo(state.wheelSessions, undoData.wheelSessions);
  4525 |   state.encounterSessions = applyCausalIdCollectionUndo(state.encounterSessions, undoData.encounterSessions);
  4526 |   state.randomPokemonSessions = applyCausalIdCollectionUndo(state.randomPokemonSessions, undoData.randomPokemonSessions);
  4527 |   state.delayedEffects = applyCausalIdCollectionUndo(state.delayedEffects, undoData.delayedEffects);
  4528 |   state.broughtTeamSnapshots = applyCausalIdCollectionUndo(state.broughtTeamSnapshots, undoData.broughtTeamSnapshots);
  4529 |   state.postPayoutProcedures = applyCausalIdCollectionUndo(state.postPayoutProcedures, undoData.postPayoutProcedures);
  4530 |   state.encounterCopyRecords = applyCausalIdCollectionUndo(state.encounterCopyRecords, undoData.encounterCopyRecords);
  4531 |   state.teambuilder ||= {};
  4532 |   applyCausalTopLevelFieldUndo(state.teambuilder, undoData.teambuilderFields);
  4533 |   state.battleTeams ||= {};
  4534 |   applyCausalTopLevelFieldUndo(state.battleTeams, undoData.battleTeamFields);
  4535 |   (undoData.pokemonDeltas || []).forEach((delta) => {
  4536 |     const pokemon = state.pokemonRecords.find((entry) => entry.id === delta.pokemonId);
  4537 |     if (!pokemon) return;
  4538 |     pokemon.effectBuffs = applyCausalIdCollectionUndo(pokemon.effectBuffs, delta.effectBuffs);
  4539 |     pokemon.log = applyCausalIdCollectionUndo(pokemon.log, delta.logs);
  4540 |     const removeLabels = new Set(delta.labelsAdded || []);
  4541 |     const previousLabels = delta.previousLabelOrder || [];
  4542 |     const laterLabels = (pokemon.buffs || []).filter((label) => !removeLabels.has(label) && !previousLabels.includes(label));
  4543 |     pokemon.buffs = [...previousLabels, ...laterLabels];
  4544 |   });
```


#### Hit 7 — line 4526

```text
  4508 |     const player = state.players.find((entry) => entry.id === playerId);
  4509 |     if (player) player.moveAccessGrants = applyCausalIdCollectionUndo(player.moveAccessGrants, delta);
  4510 |   });
  4511 |   (undoData.playerPokemonIdDeltas || []).forEach(({ playerId, delta }) => {
  4512 |     const player = state.players.find((entry) => entry.id === playerId);
  4513 |     if (player) player.pokemonIds = applyCausalScalarSetUndo(player.pokemonIds, delta);
  4514 |   });
  4515 |   state.pokemonRecords = applyCausalIdCollectionUndo(state.pokemonRecords, undoData.pokemonRecords);
  4516 |   state.lingeringStatuses = applyCausalIdCollectionUndo(state.lingeringStatuses, undoData.statuses);
  4517 |   state.tokenActivations = applyCausalIdCollectionUndo(state.tokenActivations, undoData.activations);
  4518 |   state.tokenConsumptions = applyCausalIdCollectionUndo(state.tokenConsumptions, undoData.consumptions);
  4519 |   state.transactions = applyCausalIdCollectionUndo(state.transactions, undoData.transactions);
  4520 |   state.playerNotifications = applyCausalIdCollectionUndo(state.playerNotifications, undoData.notifications);
  4521 |   state.effectOperations = applyCausalIdCollectionUndo(state.effectOperations, undoData.effectOperations);
  4522 |   state.copiedActivations = applyCausalIdCollectionUndo(state.copiedActivations, undoData.copiedActivations);
  4523 |   state.copiedTokenRelationships = applyCausalIdCollectionUndo(state.copiedTokenRelationships, undoData.copiedTokenRelationships);
  4524 |   state.wheelSessions = applyCausalIdCollectionUndo(state.wheelSessions, undoData.wheelSessions);
  4525 |   state.encounterSessions = applyCausalIdCollectionUndo(state.encounterSessions, undoData.encounterSessions);
  4526 |   state.randomPokemonSessions = applyCausalIdCollectionUndo(state.randomPokemonSessions, undoData.randomPokemonSessions);
  4527 |   state.delayedEffects = applyCausalIdCollectionUndo(state.delayedEffects, undoData.delayedEffects);
  4528 |   state.broughtTeamSnapshots = applyCausalIdCollectionUndo(state.broughtTeamSnapshots, undoData.broughtTeamSnapshots);
  4529 |   state.postPayoutProcedures = applyCausalIdCollectionUndo(state.postPayoutProcedures, undoData.postPayoutProcedures);
  4530 |   state.encounterCopyRecords = applyCausalIdCollectionUndo(state.encounterCopyRecords, undoData.encounterCopyRecords);
  4531 |   state.teambuilder ||= {};
  4532 |   applyCausalTopLevelFieldUndo(state.teambuilder, undoData.teambuilderFields);
  4533 |   state.battleTeams ||= {};
  4534 |   applyCausalTopLevelFieldUndo(state.battleTeams, undoData.battleTeamFields);
  4535 |   (undoData.pokemonDeltas || []).forEach((delta) => {
  4536 |     const pokemon = state.pokemonRecords.find((entry) => entry.id === delta.pokemonId);
  4537 |     if (!pokemon) return;
  4538 |     pokemon.effectBuffs = applyCausalIdCollectionUndo(pokemon.effectBuffs, delta.effectBuffs);
  4539 |     pokemon.log = applyCausalIdCollectionUndo(pokemon.log, delta.logs);
  4540 |     const removeLabels = new Set(delta.labelsAdded || []);
  4541 |     const previousLabels = delta.previousLabelOrder || [];
  4542 |     const laterLabels = (pokemon.buffs || []).filter((label) => !removeLabels.has(label) && !previousLabels.includes(label));
  4543 |     pokemon.buffs = [...previousLabels, ...laterLabels];
  4544 |   });
```


#### Hit 8 — line 4526

```text
  4508 |     const player = state.players.find((entry) => entry.id === playerId);
  4509 |     if (player) player.moveAccessGrants = applyCausalIdCollectionUndo(player.moveAccessGrants, delta);
  4510 |   });
  4511 |   (undoData.playerPokemonIdDeltas || []).forEach(({ playerId, delta }) => {
  4512 |     const player = state.players.find((entry) => entry.id === playerId);
  4513 |     if (player) player.pokemonIds = applyCausalScalarSetUndo(player.pokemonIds, delta);
  4514 |   });
  4515 |   state.pokemonRecords = applyCausalIdCollectionUndo(state.pokemonRecords, undoData.pokemonRecords);
  4516 |   state.lingeringStatuses = applyCausalIdCollectionUndo(state.lingeringStatuses, undoData.statuses);
  4517 |   state.tokenActivations = applyCausalIdCollectionUndo(state.tokenActivations, undoData.activations);
  4518 |   state.tokenConsumptions = applyCausalIdCollectionUndo(state.tokenConsumptions, undoData.consumptions);
  4519 |   state.transactions = applyCausalIdCollectionUndo(state.transactions, undoData.transactions);
  4520 |   state.playerNotifications = applyCausalIdCollectionUndo(state.playerNotifications, undoData.notifications);
  4521 |   state.effectOperations = applyCausalIdCollectionUndo(state.effectOperations, undoData.effectOperations);
  4522 |   state.copiedActivations = applyCausalIdCollectionUndo(state.copiedActivations, undoData.copiedActivations);
  4523 |   state.copiedTokenRelationships = applyCausalIdCollectionUndo(state.copiedTokenRelationships, undoData.copiedTokenRelationships);
  4524 |   state.wheelSessions = applyCausalIdCollectionUndo(state.wheelSessions, undoData.wheelSessions);
  4525 |   state.encounterSessions = applyCausalIdCollectionUndo(state.encounterSessions, undoData.encounterSessions);
  4526 |   state.randomPokemonSessions = applyCausalIdCollectionUndo(state.randomPokemonSessions, undoData.randomPokemonSessions);
  4527 |   state.delayedEffects = applyCausalIdCollectionUndo(state.delayedEffects, undoData.delayedEffects);
  4528 |   state.broughtTeamSnapshots = applyCausalIdCollectionUndo(state.broughtTeamSnapshots, undoData.broughtTeamSnapshots);
  4529 |   state.postPayoutProcedures = applyCausalIdCollectionUndo(state.postPayoutProcedures, undoData.postPayoutProcedures);
  4530 |   state.encounterCopyRecords = applyCausalIdCollectionUndo(state.encounterCopyRecords, undoData.encounterCopyRecords);
  4531 |   state.teambuilder ||= {};
  4532 |   applyCausalTopLevelFieldUndo(state.teambuilder, undoData.teambuilderFields);
  4533 |   state.battleTeams ||= {};
  4534 |   applyCausalTopLevelFieldUndo(state.battleTeams, undoData.battleTeamFields);
  4535 |   (undoData.pokemonDeltas || []).forEach((delta) => {
  4536 |     const pokemon = state.pokemonRecords.find((entry) => entry.id === delta.pokemonId);
  4537 |     if (!pokemon) return;
  4538 |     pokemon.effectBuffs = applyCausalIdCollectionUndo(pokemon.effectBuffs, delta.effectBuffs);
  4539 |     pokemon.log = applyCausalIdCollectionUndo(pokemon.log, delta.logs);
  4540 |     const removeLabels = new Set(delta.labelsAdded || []);
  4541 |     const previousLabels = delta.previousLabelOrder || [];
  4542 |     const laterLabels = (pokemon.buffs || []).filter((label) => !removeLabels.has(label) && !previousLabels.includes(label));
  4543 |     pokemon.buffs = [...previousLabels, ...laterLabels];
  4544 |   });
```


#### Hit 9 — line 4571

```text
  4553 |   restoreGrantMap(state.perkSystem.moveAccessGrantsByPlayerId, undoData.perkMoveGrants);
  4554 |   state.classStateByPlayerId ||= {};
  4555 |   (undoData.classMoveGrants || []).forEach(({ playerId, delta }) => {
  4556 |     state.classStateByPlayerId[playerId] ||= {};
  4557 |     state.classStateByPlayerId[playerId].moveAccessGrants = applyCausalIdCollectionUndo(state.classStateByPlayerId[playerId].moveAccessGrants, delta);
  4558 |   });
  4559 |   (undoData.ruleDeltas || []).forEach((delta) => {
  4560 |     if (delta.existed) state.globalPokemonRules[delta.key] = structuredClone(delta.previous);
  4561 |     else delete state.globalPokemonRules[delta.key];
  4562 |   });
  4563 |   state.banlistHistory = applyCausalIdCollectionUndo(state.banlistHistory, undoData.banlistHistory);
  4564 |   if (undoData.tokenDefinitionId === "honey-token" && undoData.procedureId) {
  4565 |     const procedure = (state.endOfActionProcedures || []).find((entry) => entry.id === undoData.procedureId);
  4566 |     if (procedure) {
  4567 |       procedure.status = "undone";
  4568 |       procedure.undoneAt = new Date().toISOString();
  4569 |     }
  4570 |   }
  4571 |   if (state.selectedRandomPokemonSessionId && !(state.randomPokemonSessions || []).some((entry) => entry.id === state.selectedRandomPokemonSessionId)) {
  4572 |     state.selectedRandomPokemonSessionId = "";
  4573 |     state.randomPokemonDrawerOpen = false;
  4574 |   }
  4575 |   syncLinkedTransactions();
  4576 |   syncPlayerPokemonLists();
  4577 | }
  4578 | 
  4579 | function recordTokenContractResolution(activity, metadata, {
  4580 |   result = "resolved",
  4581 |   details = [],
  4582 |   mutations = [],
  4583 |   persistentStateIds = [],
  4584 |   hostConfirmation = ""
  4585 | } = {}) {
  4586 |   const canonicalResult = result === "noEffect" ? "resolvedNoEffect"
  4587 |     : result === "canceled" ? "canceledRefunded"
  4588 |       : result;
  4589 |   const draft = tokenDraftFromActivity(activity, hostConfirmation);
```


#### Hit 10 — line 22300

```text
 22282 |   nextState.selectedWheelSessionId ||= "";
 22283 |   nextState.wheelDrawerOpen = Boolean(nextState.wheelDrawerOpen);
 22284 |   nextState.skipWheelAnimation = Boolean(nextState.skipWheelAnimation);
 22285 |   nextState.encounterSessions ||= [];
 22286 |   nextState.encounterSessions.forEach((session) => {
 22287 |     session.status = ["pending", "review", "completed", "undone", "cancelled"].includes(session.status) ? session.status : "pending";
 22288 |     session.rolls ||= [];
 22289 |     session.removedEntryIds ||= [];
 22290 |     session.temporaryEntries ||= [];
 22291 |     session.weightOverrides ||= {};
 22292 |     session.weightEditing = Boolean(session.weightEditing);
 22293 |     session.resultSessionIds ||= [];
 22294 |     session.visualRotation = Number(session.visualRotation || 0);
 22295 |     session.isSpinning = false;
 22296 |     session.pendingEntryId = "";
 22297 |   });
 22298 |   nextState.selectedEncounterSessionId ||= "";
 22299 |   nextState.encounterModalOpen = Boolean(nextState.encounterModalOpen);
 22300 |   nextState.randomPokemonSessions ||= [];
 22301 |   nextState.pokemonFamilyTierCache ||= {};
 22302 |   pokemonFamilyTierCache = nextState.pokemonFamilyTierCache;
 22303 |   nextState.pokemonSpriteVariants ||= {};
 22304 |   nextState.selectedRandomPokemonSessionId ||= "";
 22305 |   nextState.randomPokemonDrawerOpen = Boolean(nextState.randomPokemonDrawerOpen);
 22306 |   nextState.spriteAliases ||= {};
 22307 |   nextState.breederDeposits ||= [];
 22308 |   nextState.dragonsDenSessions.forEach((session) => {
 22309 |     session.status = ["active", "completed", "undone"].includes(session.status) ? session.status : "active";
 22310 |     session.cost = Number(session.cost || 0);
 22311 |     session.battlePhaseStayLength = Number(session.battlePhaseStayLength || 0);
 22312 |   });
 22313 |   nextState.randomPokemonSessions.forEach((session) => {
 22314 |     session.status = ["pending", "confirmed", "rerolled", "undone", "cancelled"].includes(session.status) ? session.status : "pending";
 22315 |     session.rerollCount = Number(session.rerollCount || 0);
 22316 |     session.ownerPlayerId ||= session.playerId;
 22317 |     session.resultOwnerPlayerId ||= session.ownerPlayerId || session.playerId;
 22318 |     session.playerId ||= session.ownerPlayerId || session.resultOwnerPlayerId || "";
```


#### Hit 11 — line 22313

```text
 22295 |     session.isSpinning = false;
 22296 |     session.pendingEntryId = "";
 22297 |   });
 22298 |   nextState.selectedEncounterSessionId ||= "";
 22299 |   nextState.encounterModalOpen = Boolean(nextState.encounterModalOpen);
 22300 |   nextState.randomPokemonSessions ||= [];
 22301 |   nextState.pokemonFamilyTierCache ||= {};
 22302 |   pokemonFamilyTierCache = nextState.pokemonFamilyTierCache;
 22303 |   nextState.pokemonSpriteVariants ||= {};
 22304 |   nextState.selectedRandomPokemonSessionId ||= "";
 22305 |   nextState.randomPokemonDrawerOpen = Boolean(nextState.randomPokemonDrawerOpen);
 22306 |   nextState.spriteAliases ||= {};
 22307 |   nextState.breederDeposits ||= [];
 22308 |   nextState.dragonsDenSessions.forEach((session) => {
 22309 |     session.status = ["active", "completed", "undone"].includes(session.status) ? session.status : "active";
 22310 |     session.cost = Number(session.cost || 0);
 22311 |     session.battlePhaseStayLength = Number(session.battlePhaseStayLength || 0);
 22312 |   });
 22313 |   nextState.randomPokemonSessions.forEach((session) => {
 22314 |     session.status = ["pending", "confirmed", "rerolled", "undone", "cancelled"].includes(session.status) ? session.status : "pending";
 22315 |     session.rerollCount = Number(session.rerollCount || 0);
 22316 |     session.ownerPlayerId ||= session.playerId;
 22317 |     session.resultOwnerPlayerId ||= session.ownerPlayerId || session.playerId;
 22318 |     session.playerId ||= session.ownerPlayerId || session.resultOwnerPlayerId || "";
 22319 |     session.rerollable = session.rerollable !== false;
 22320 |     session.interactionLocked = Boolean(session.interactionLocked);
 22321 |     session.rerollHistory ||= [];
 22322 |   });
 22323 |   nextState.wheelSessions.forEach((session) => {
 22324 |     if (session.wheelId === "trainer-class-wheel") session.wheelId = "trainerClassWheel";
 22325 |     session.status = ["pending", "review", "completed", "cancelled", "undone"].includes(session.status) ? session.status : "pending";
 22326 |     session.rolls ||= [];
 22327 |     session.maxRolls = Number(session.maxRolls || wheelDefinitionById(session.wheelId)?.maxRollsPerVisit || 1);
 22328 |     if (session.wheelId === "trainerClassWheel") {
 22329 |       session.sourceType = "token";
 22330 |       session.sourceLabel ||= session.tokenName || "Trainer Class Token";
 22331 |       session.targetPlayerId ||= session.playerId;
```


#### Hit 12 — line 25746

```text
 25728 |     .filter((event) => interactionSituationLifecycle.isBlocking(event))
 25729 |     .sort((a, b) => Number(a.eventOrder || 0) - Number(b.eventOrder || 0)
 25730 |       || new Date(a.createdAt || 0) - new Date(b.createdAt || 0))[0] || null;
 25731 | }
 25732 | 
 25733 | function canShowLiveResponseControls(targetState = state) {
 25734 |   return Boolean(getCurrentPendingEvent(targetState));
 25735 | }
 25736 | 
 25737 | function canShowLiveTransactionControls(targetState = state) {
 25738 |   return Boolean(getCurrentPendingEvent(targetState));
 25739 | }
 25740 | 
 25741 | function liveResultSessionForActivity(activity, targetState = state) {
 25742 |   if (!activity) return null;
 25743 |   const sessionId = activity.payload?.randomPokemonSessionId
 25744 |     || (/pokemon-result|encounter-result/.test(activity.type || "") ? activity.sourceId : "");
 25745 |   if (!sessionId) return null;
 25746 |   return (targetState.randomPokemonSessions || []).find((session) => session.id === sessionId && session.status === "pending") || null;
 25747 | }
 25748 | 
 25749 | function liveActivityTimingCategory(activity) {
 25750 |   if (!activity) return "";
 25751 |   if (activity.payload?.tokenTimingCategory) return tokenTimingCategoryFromRaw(activity.payload.tokenTimingCategory);
 25752 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.CONTROL_TOKEN) return TOKEN_TIMING_CATEGORIES.CONTROL;
 25753 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.CURSE_TOKEN) return TOKEN_TIMING_CATEGORIES.CURSE;
 25754 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT || activity.type === "encounter-result") return TOKEN_TIMING_CATEGORIES.ENCOUNTER;
 25755 |   return "";
 25756 | }
 25757 | 
 25758 | function liveTokenPromptDetails(activity, resultSession = null, targetState = state) {
 25759 |   const category = liveActivityTimingCategory(activity);
 25760 |   const actor = targetState.players.find((player) => player.id === activity?.actorPlayerId);
 25761 |   const target = targetState.players.find((player) => player.id === activity?.targetPlayerId);
 25762 |   const tokenName = activity?.payload?.tokenName || activity?.sourceId || "Token";
 25763 |   const targetText = activity?.payload?.targetText || activity?.payload?.targetPlayerName || target?.name || "the target";
 25764 |   const teamLockText = activity?.payload?.teamLock
```


#### Hit 13 — line 26963

```text
 26945 |     item: `${passer.name} chose no response to ${promptText}.`,
 26946 |     title: "No response recorded",
 26947 |     summary: [`Window: ${activity.title}`, `Prompt: ${promptText}`, "No response"],
 26948 |     type: "interaction-pass",
 26949 |     categories: ["system", "interaction"],
 26950 |     tags: ["timing-window", "pass"],
 26951 |     playerIds: [passer.id, activity.actorPlayerId, activity.targetPlayerId].filter(Boolean),
 26952 |     linkedEventId: activity.id,
 26953 |     responseId: savedResponse?.id || "",
 26954 |     eventOrder: savedResponse?.eventOrder
 26955 |   });
 26956 |   advanceAutomaticInteractionPrompts(activity);
 26957 |   resetLiveRefereeScreenState();
 26958 |   saveState({ immediate: true });
 26959 |   render();
 26960 | }
 26961 | 
 26962 | async function handleLiveTableAcceptResult(sessionId, activityId = "") {
 26963 |   const session = (state.randomPokemonSessions || []).find((entry) => entry.id === sessionId && entry.status === "pending");
 26964 |   if (!session) {
 26965 |     alert("No pending Pokemon result is available to accept.");
 26966 |     return;
 26967 |   }
 26968 |   const activity = activityId ? liveActivityById(activityId) : liveActivityById(session.interactionEventId);
 26969 |   if (activity && !liveCanFinalizeActivity(activity)) return;
 26970 |   resetLiveRefereeScreenState();
 26971 |   await confirmRandomPokemonSession(session.id, { skipPendingGuard: true });
 26972 | }
 26973 | 
 26974 | async function handleLiveTableRerollResult(sessionId) {
 26975 |   const session = (state.randomPokemonSessions || []).find((entry) => entry.id === sessionId && entry.status === "pending");
 26976 |   if (!session) {
 26977 |     alert("No pending Pokemon result is available to reroll.");
 26978 |     return;
 26979 |   }
 26980 |   await rerollRandomPokemonSession(session.id, { actorPlayerId: activePlayer().id });
 26981 |   saveState({ immediate: true });
```


#### Hit 14 — line 26975

```text
 26957 |   resetLiveRefereeScreenState();
 26958 |   saveState({ immediate: true });
 26959 |   render();
 26960 | }
 26961 | 
 26962 | async function handleLiveTableAcceptResult(sessionId, activityId = "") {
 26963 |   const session = (state.randomPokemonSessions || []).find((entry) => entry.id === sessionId && entry.status === "pending");
 26964 |   if (!session) {
 26965 |     alert("No pending Pokemon result is available to accept.");
 26966 |     return;
 26967 |   }
 26968 |   const activity = activityId ? liveActivityById(activityId) : liveActivityById(session.interactionEventId);
 26969 |   if (activity && !liveCanFinalizeActivity(activity)) return;
 26970 |   resetLiveRefereeScreenState();
 26971 |   await confirmRandomPokemonSession(session.id, { skipPendingGuard: true });
 26972 | }
 26973 | 
 26974 | async function handleLiveTableRerollResult(sessionId) {
 26975 |   const session = (state.randomPokemonSessions || []).find((entry) => entry.id === sessionId && entry.status === "pending");
 26976 |   if (!session) {
 26977 |     alert("No pending Pokemon result is available to reroll.");
 26978 |     return;
 26979 |   }
 26980 |   await rerollRandomPokemonSession(session.id, { actorPlayerId: activePlayer().id });
 26981 |   saveState({ immediate: true });
 26982 |   render();
 26983 | }
 26984 | 
 26985 | async function handleLiveTableResolve(activityId, { resolutionText = "" } = {}) {
 26986 |   const activity = liveActivityById(activityId);
 26987 |   if (!activity) {
 26988 |     openLiveTimingControls();
 26989 |     return;
 26990 |   }
 26991 |   if (provisionalDeclarationRuntime.isProvisionalActivity(activity)) {
 26992 |     alert("Complete or withdraw this declaration before resolving an effect.");
 26993 |     return;
```


#### Hit 15 — line 41488

```text
 41470 |   if (!snapshot || !actor || !token) return null;
 41471 |   const metadata = tokenEffectMetadataByName(token.name || "Reroll");
 41472 |   const activity = { id: sourceEffectId, actorPlayerId: actor.id, targetPlayerId, payload: { tokenName: "Reroll", targetText: previousName } };
 41473 |   const causalUndo = buildCausalTokenEffectUndo(snapshot, activity, { id: "reroll-token", name: "Reroll" });
 41474 |   const summary = `${actor.name} superseded ${previousName || "the previous result"} with ${nextName || "a replacement result"}.`;
 41475 |   return addLogEntry({
 41476 |     action: "token", category: "pokemon", player: actor.name,
 41477 |     item: summary, title: "Reroll replaced an encounter result", summary,
 41478 |     type: "encounter-reroll-token", categories: ["tokens", "pokemon", "encounter"],
 41479 |     tags: ["reroll-token", "encounter-result", resultKind || "result"],
 41480 |     playerIds: [actor.id, targetPlayerId].filter(Boolean), pokemonNames: [previousName, nextName].filter(Boolean),
 41481 |     tokenNames: [metadata.name || "Reroll"], linkedEventId: sourceEffectId,
 41482 |     targetResultId, previousResultName: previousName, replacementResultName: nextName,
 41483 |     undoable: true, undone: false, undoData: causalUndo
 41484 |   });
 41485 | }
 41486 | 
 41487 | function pendingRandomPokemonSessions() {
 41488 |   state.randomPokemonSessions ||= [];
 41489 |   return state.randomPokemonSessions.filter((session) => session.status === "pending");
 41490 | }
 41491 | 
 41492 | function pendingRerollTargets() {
 41493 |   const targets = [];
 41494 |   (state.randomPokemonSessions || [])
 41495 |     .filter((session) => session.status === "pending" && session.rerollable !== false && !session.interactionLocked)
 41496 |     .forEach((session) => {
 41497 |       const ownerId = session.resultOwnerPlayerId || session.ownerPlayerId || session.playerId;
 41498 |       const owner = state.players.find((player) => player.id === ownerId);
 41499 |       targets.push({
 41500 |         id: `random-pokemon:${session.id}`,
 41501 |         kind: "random-pokemon",
 41502 |         targetResultId: session.id,
 41503 |         ownerPlayerId: ownerId,
 41504 |         ownerName: owner?.name || "Unknown",
 41505 |         sourceLabel: session.sourceLabel || "Pokemon Result",
 41506 |         resultName: session.resultDisplayName || "Pending result",
```


#### Hit 16 — line 41489

```text
 41471 |   const metadata = tokenEffectMetadataByName(token.name || "Reroll");
 41472 |   const activity = { id: sourceEffectId, actorPlayerId: actor.id, targetPlayerId, payload: { tokenName: "Reroll", targetText: previousName } };
 41473 |   const causalUndo = buildCausalTokenEffectUndo(snapshot, activity, { id: "reroll-token", name: "Reroll" });
 41474 |   const summary = `${actor.name} superseded ${previousName || "the previous result"} with ${nextName || "a replacement result"}.`;
 41475 |   return addLogEntry({
 41476 |     action: "token", category: "pokemon", player: actor.name,
 41477 |     item: summary, title: "Reroll replaced an encounter result", summary,
 41478 |     type: "encounter-reroll-token", categories: ["tokens", "pokemon", "encounter"],
 41479 |     tags: ["reroll-token", "encounter-result", resultKind || "result"],
 41480 |     playerIds: [actor.id, targetPlayerId].filter(Boolean), pokemonNames: [previousName, nextName].filter(Boolean),
 41481 |     tokenNames: [metadata.name || "Reroll"], linkedEventId: sourceEffectId,
 41482 |     targetResultId, previousResultName: previousName, replacementResultName: nextName,
 41483 |     undoable: true, undone: false, undoData: causalUndo
 41484 |   });
 41485 | }
 41486 | 
 41487 | function pendingRandomPokemonSessions() {
 41488 |   state.randomPokemonSessions ||= [];
 41489 |   return state.randomPokemonSessions.filter((session) => session.status === "pending");
 41490 | }
 41491 | 
 41492 | function pendingRerollTargets() {
 41493 |   const targets = [];
 41494 |   (state.randomPokemonSessions || [])
 41495 |     .filter((session) => session.status === "pending" && session.rerollable !== false && !session.interactionLocked)
 41496 |     .forEach((session) => {
 41497 |       const ownerId = session.resultOwnerPlayerId || session.ownerPlayerId || session.playerId;
 41498 |       const owner = state.players.find((player) => player.id === ownerId);
 41499 |       targets.push({
 41500 |         id: `random-pokemon:${session.id}`,
 41501 |         kind: "random-pokemon",
 41502 |         targetResultId: session.id,
 41503 |         ownerPlayerId: ownerId,
 41504 |         ownerName: owner?.name || "Unknown",
 41505 |         sourceLabel: session.sourceLabel || "Pokemon Result",
 41506 |         resultName: session.resultDisplayName || "Pending result",
 41507 |         meta: `${session.series || state.series} Gym ${session.gym || state.gym}`
```


#### Hit 17 — line 41494

```text
 41476 |     action: "token", category: "pokemon", player: actor.name,
 41477 |     item: summary, title: "Reroll replaced an encounter result", summary,
 41478 |     type: "encounter-reroll-token", categories: ["tokens", "pokemon", "encounter"],
 41479 |     tags: ["reroll-token", "encounter-result", resultKind || "result"],
 41480 |     playerIds: [actor.id, targetPlayerId].filter(Boolean), pokemonNames: [previousName, nextName].filter(Boolean),
 41481 |     tokenNames: [metadata.name || "Reroll"], linkedEventId: sourceEffectId,
 41482 |     targetResultId, previousResultName: previousName, replacementResultName: nextName,
 41483 |     undoable: true, undone: false, undoData: causalUndo
 41484 |   });
 41485 | }
 41486 | 
 41487 | function pendingRandomPokemonSessions() {
 41488 |   state.randomPokemonSessions ||= [];
 41489 |   return state.randomPokemonSessions.filter((session) => session.status === "pending");
 41490 | }
 41491 | 
 41492 | function pendingRerollTargets() {
 41493 |   const targets = [];
 41494 |   (state.randomPokemonSessions || [])
 41495 |     .filter((session) => session.status === "pending" && session.rerollable !== false && !session.interactionLocked)
 41496 |     .forEach((session) => {
 41497 |       const ownerId = session.resultOwnerPlayerId || session.ownerPlayerId || session.playerId;
 41498 |       const owner = state.players.find((player) => player.id === ownerId);
 41499 |       targets.push({
 41500 |         id: `random-pokemon:${session.id}`,
 41501 |         kind: "random-pokemon",
 41502 |         targetResultId: session.id,
 41503 |         ownerPlayerId: ownerId,
 41504 |         ownerName: owner?.name || "Unknown",
 41505 |         sourceLabel: session.sourceLabel || "Pokemon Result",
 41506 |         resultName: session.resultDisplayName || "Pending result",
 41507 |         meta: `${session.series || state.series} Gym ${session.gym || state.gym}`
 41508 |       });
 41509 |     });
 41510 |   (state.encounterSessions || [])
 41511 |     .filter((session) => ["pending", "review"].includes(session.status))
 41512 |     .forEach((session) => {
```


#### Hit 18 — line 41634

```text
 41616 |     locationSessionId: gameCornerSessionId,
 41617 |     gameCornerSessionId,
 41618 |     actionVisitId,
 41619 |     tokenId: token?.id || "",
 41620 |     tokenName: token?.name || "",
 41621 |     tierId: normalizeGameCornerTierId(tier),
 41622 |     status: "pending",
 41623 |     resultPokemonName: result.key,
 41624 |     resultDisplayName: result.displayName,
 41625 |     resultSprite: "",
 41626 |     chosenSpriteKey: "",
 41627 |     resultMetadata: structuredClone(result),
 41628 |     rerollable: true,
 41629 |     interactionLocked: false,
 41630 |     rerollCount: 0,
 41631 |     createdAt: new Date().toISOString(),
 41632 |     confirmedAt: null
 41633 |   };
 41634 |   state.randomPokemonSessions ||= [];
 41635 |   state.randomPokemonSessions.unshift(session);
 41636 |   state.selectedRandomPokemonSessionId = session.id;
 41637 |   state.randomPokemonDrawerOpen = true;
 41638 |   createPokemonResultTimingWindow(session, player);
 41639 |   saveState();
 41640 |   render();
 41641 |   const sprite = await fetchStablePokemonSprite(result.displayName, session.chosenSpriteKey);
 41642 |   const latest = (state.randomPokemonSessions || []).find((entry) => entry.id === session.id);
 41643 |   if (latest && latest.status === "pending") {
 41644 |     latest.chosenSpriteKey = sprite.spriteKey || "";
 41645 |     latest.resultSprite = sprite.spriteUrl || "";
 41646 |     saveState();
 41647 |     renderRandomPokemonPanel();
 41648 |   }
 41649 |   return session;
 41650 | }
 41651 | 
 41652 | async function createEncounterPokemonResultSession({ player, encounterSession, roll, result }) {
```


#### Hit 19 — line 41635

```text
 41617 |     gameCornerSessionId,
 41618 |     actionVisitId,
 41619 |     tokenId: token?.id || "",
 41620 |     tokenName: token?.name || "",
 41621 |     tierId: normalizeGameCornerTierId(tier),
 41622 |     status: "pending",
 41623 |     resultPokemonName: result.key,
 41624 |     resultDisplayName: result.displayName,
 41625 |     resultSprite: "",
 41626 |     chosenSpriteKey: "",
 41627 |     resultMetadata: structuredClone(result),
 41628 |     rerollable: true,
 41629 |     interactionLocked: false,
 41630 |     rerollCount: 0,
 41631 |     createdAt: new Date().toISOString(),
 41632 |     confirmedAt: null
 41633 |   };
 41634 |   state.randomPokemonSessions ||= [];
 41635 |   state.randomPokemonSessions.unshift(session);
 41636 |   state.selectedRandomPokemonSessionId = session.id;
 41637 |   state.randomPokemonDrawerOpen = true;
 41638 |   createPokemonResultTimingWindow(session, player);
 41639 |   saveState();
 41640 |   render();
 41641 |   const sprite = await fetchStablePokemonSprite(result.displayName, session.chosenSpriteKey);
 41642 |   const latest = (state.randomPokemonSessions || []).find((entry) => entry.id === session.id);
 41643 |   if (latest && latest.status === "pending") {
 41644 |     latest.chosenSpriteKey = sprite.spriteKey || "";
 41645 |     latest.resultSprite = sprite.spriteUrl || "";
 41646 |     saveState();
 41647 |     renderRandomPokemonPanel();
 41648 |   }
 41649 |   return session;
 41650 | }
 41651 | 
 41652 | async function createEncounterPokemonResultSession({ player, encounterSession, roll, result }) {
 41653 |   const session = {
```


#### Hit 20 — line 41642

```text
 41624 |     resultDisplayName: result.displayName,
 41625 |     resultSprite: "",
 41626 |     chosenSpriteKey: "",
 41627 |     resultMetadata: structuredClone(result),
 41628 |     rerollable: true,
 41629 |     interactionLocked: false,
 41630 |     rerollCount: 0,
 41631 |     createdAt: new Date().toISOString(),
 41632 |     confirmedAt: null
 41633 |   };
 41634 |   state.randomPokemonSessions ||= [];
 41635 |   state.randomPokemonSessions.unshift(session);
 41636 |   state.selectedRandomPokemonSessionId = session.id;
 41637 |   state.randomPokemonDrawerOpen = true;
 41638 |   createPokemonResultTimingWindow(session, player);
 41639 |   saveState();
 41640 |   render();
 41641 |   const sprite = await fetchStablePokemonSprite(result.displayName, session.chosenSpriteKey);
 41642 |   const latest = (state.randomPokemonSessions || []).find((entry) => entry.id === session.id);
 41643 |   if (latest && latest.status === "pending") {
 41644 |     latest.chosenSpriteKey = sprite.spriteKey || "";
 41645 |     latest.resultSprite = sprite.spriteUrl || "";
 41646 |     saveState();
 41647 |     renderRandomPokemonPanel();
 41648 |   }
 41649 |   return session;
 41650 | }
 41651 | 
 41652 | async function createEncounterPokemonResultSession({ player, encounterSession, roll, result }) {
 41653 |   const session = {
 41654 |     id: `random-pokemon-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
 41655 |     sourceType: "encounter",
 41656 |     sourceLabel: "Encounter Wheel",
 41657 |     playerId: player.id,
 41658 |     ownerPlayerId: player.id,
 41659 |     resultOwnerPlayerId: player.id,
 41660 |     series: encounterSession.series,
```


#### Hit 21 — line 41682

```text
 41664 |     actionVisitId: encounterSession.actionVisitId,
 41665 |     encounterRollId: roll.id,
 41666 |     wheelId: encounterSession.wheelId,
 41667 |     tokenId: "",
 41668 |     tokenName: "",
 41669 |     tierId: getPokemonAcquisitionTier(result.displayName || result.pokemonName || "") || "",
 41670 |     status: "pending",
 41671 |     resultPokemonName: result.pokemonName || result.displayName,
 41672 |     resultDisplayName: result.displayName || result.pokemonName,
 41673 |     resultSprite: "",
 41674 |     chosenSpriteKey: "",
 41675 |     resultMetadata: structuredClone(result),
 41676 |     rerollable: true,
 41677 |     interactionLocked: false,
 41678 |     rerollCount: 0,
 41679 |     createdAt: new Date().toISOString(),
 41680 |     confirmedAt: null
 41681 |   };
 41682 |   state.randomPokemonSessions ||= [];
 41683 |   state.randomPokemonSessions.unshift(session);
 41684 |   encounterSession.resultSessionIds ||= [];
 41685 |   encounterSession.resultSessionIds.push(session.id);
 41686 |   roll.randomPokemonSessionId = session.id;
 41687 |   state.selectedRandomPokemonSessionId = session.id;
 41688 |   state.randomPokemonDrawerOpen = true;
 41689 |   createPokemonResultTimingWindow(session, player);
 41690 |   saveState();
 41691 |   render();
 41692 |   const sprite = await fetchStablePokemonSprite(session.resultDisplayName, session.chosenSpriteKey);
 41693 |   const latest = (state.randomPokemonSessions || []).find((entry) => entry.id === session.id);
 41694 |   if (latest && latest.status === "pending") {
 41695 |     latest.chosenSpriteKey = sprite.spriteKey || "";
 41696 |     latest.resultSprite = sprite.spriteUrl || "";
 41697 |     saveState();
 41698 |     renderRandomPokemonPanel();
 41699 |   }
 41700 |   return session;
```


#### Hit 22 — line 41683

```text
 41665 |     encounterRollId: roll.id,
 41666 |     wheelId: encounterSession.wheelId,
 41667 |     tokenId: "",
 41668 |     tokenName: "",
 41669 |     tierId: getPokemonAcquisitionTier(result.displayName || result.pokemonName || "") || "",
 41670 |     status: "pending",
 41671 |     resultPokemonName: result.pokemonName || result.displayName,
 41672 |     resultDisplayName: result.displayName || result.pokemonName,
 41673 |     resultSprite: "",
 41674 |     chosenSpriteKey: "",
 41675 |     resultMetadata: structuredClone(result),
 41676 |     rerollable: true,
 41677 |     interactionLocked: false,
 41678 |     rerollCount: 0,
 41679 |     createdAt: new Date().toISOString(),
 41680 |     confirmedAt: null
 41681 |   };
 41682 |   state.randomPokemonSessions ||= [];
 41683 |   state.randomPokemonSessions.unshift(session);
 41684 |   encounterSession.resultSessionIds ||= [];
 41685 |   encounterSession.resultSessionIds.push(session.id);
 41686 |   roll.randomPokemonSessionId = session.id;
 41687 |   state.selectedRandomPokemonSessionId = session.id;
 41688 |   state.randomPokemonDrawerOpen = true;
 41689 |   createPokemonResultTimingWindow(session, player);
 41690 |   saveState();
 41691 |   render();
 41692 |   const sprite = await fetchStablePokemonSprite(session.resultDisplayName, session.chosenSpriteKey);
 41693 |   const latest = (state.randomPokemonSessions || []).find((entry) => entry.id === session.id);
 41694 |   if (latest && latest.status === "pending") {
 41695 |     latest.chosenSpriteKey = sprite.spriteKey || "";
 41696 |     latest.resultSprite = sprite.spriteUrl || "";
 41697 |     saveState();
 41698 |     renderRandomPokemonPanel();
 41699 |   }
 41700 |   return session;
 41701 | }
```


#### Hit 23 — line 41693

```text
 41675 |     resultMetadata: structuredClone(result),
 41676 |     rerollable: true,
 41677 |     interactionLocked: false,
 41678 |     rerollCount: 0,
 41679 |     createdAt: new Date().toISOString(),
 41680 |     confirmedAt: null
 41681 |   };
 41682 |   state.randomPokemonSessions ||= [];
 41683 |   state.randomPokemonSessions.unshift(session);
 41684 |   encounterSession.resultSessionIds ||= [];
 41685 |   encounterSession.resultSessionIds.push(session.id);
 41686 |   roll.randomPokemonSessionId = session.id;
 41687 |   state.selectedRandomPokemonSessionId = session.id;
 41688 |   state.randomPokemonDrawerOpen = true;
 41689 |   createPokemonResultTimingWindow(session, player);
 41690 |   saveState();
 41691 |   render();
 41692 |   const sprite = await fetchStablePokemonSprite(session.resultDisplayName, session.chosenSpriteKey);
 41693 |   const latest = (state.randomPokemonSessions || []).find((entry) => entry.id === session.id);
 41694 |   if (latest && latest.status === "pending") {
 41695 |     latest.chosenSpriteKey = sprite.spriteKey || "";
 41696 |     latest.resultSprite = sprite.spriteUrl || "";
 41697 |     saveState();
 41698 |     renderRandomPokemonPanel();
 41699 |   }
 41700 |   return session;
 41701 | }
 41702 | 
 41703 | function augmentHoneyCausalUndoAfterAcquisition(randomSession, causalBeforeAcquisition) {
 41704 |   if (!randomSession?.copiedFromRandomPokemonSessionId || !causalBeforeAcquisition) return;
 41705 |   const historyLog = (state.log || []).find((entry) => !entry.undone
 41706 |     && entry.undoData?.tokenDefinitionId === "honey-token"
 41707 |     && entry.copiedRandomPokemonSessionId === randomSession.id);
 41708 |   if (!historyLog?.undoData) return;
 41709 |   const later = buildCausalTokenEffectUndo(causalBeforeAcquisition, {
 41710 |     id: historyLog.linkedEventId || historyLog.undoData.effectId || "",
 41711 |     payload: { tokenName: "Honey" }
```


#### Hit 24 — line 41959

```text
 41941 |     });
 41942 |     alert(`You do not own a ${getPokemonTierLabel(tierId) || tier} GC Ticket.`);
 41943 |     return;
 41944 |   }
 41945 |   const token = player.inventory[tokenIndex];
 41946 |   createRandomPokemonSession({
 41947 |     sourceType: "game-corner-token",
 41948 |     sourceLabel: "Game Corner Ticket",
 41949 |     player,
 41950 |     tier,
 41951 |     actionVisitId: session.actionVisitId,
 41952 |     gameCornerSessionId: session.id,
 41953 |     token
 41954 |   });
 41955 | }
 41956 | 
 41957 | async function confirmRandomPokemonSession(sessionId = state.selectedRandomPokemonSessionId, { skipPendingGuard = false } = {}) {
 41958 |   if (!skipPendingGuard && !guardPendingEventBeforeAction("Confirm Pokemon Result", () => confirmRandomPokemonSession(sessionId, { skipPendingGuard: true }))) return;
 41959 |   const randomSession = (state.randomPokemonSessions || []).find((entry) => entry.id === sessionId);
 41960 |   if (!randomSession || randomSession.status !== "pending") return;
 41961 |   const honeyAcquisitionSnapshot = randomSession.copiedFromRandomPokemonSessionId ? tokenUseRollbackSnapshot() : null;
 41962 |   const player = state.players.find((entry) => entry.id === (randomSession.resultOwnerPlayerId || randomSession.ownerPlayerId || randomSession.playerId));
 41963 |   if (!player) return;
 41964 |   if (!requirePrivatePrepAccess(player, "random Pokemon result")) return;
 41965 |   const tokenIndex = randomSession.tokenId ? (player.inventory || []).findIndex((item) => item.id === randomSession.tokenId) : -1;
 41966 |   if (randomSession.sourceType === "game-corner-token" && tokenIndex < 0) {
 41967 |     alert("That Game Corner Ticket is no longer available.");
 41968 |     return;
 41969 |   }
 41970 |   if (!confirm(`Add ${randomSession.resultDisplayName} to ${player.name}'s Active roster?`)) return;
 41971 |   const token = tokenIndex >= 0 ? player.inventory[tokenIndex] : null;
 41972 |   if (tokenIndex >= 0) {
 41973 |     player.inventory.splice(tokenIndex, 1);
 41974 |   }
 41975 |   const session = (state.gameCornerSessions || []).find((entry) => entry.id === randomSession.gameCornerSessionId);
 41976 |   const visit = gameCornerSessionVisit(session);
 41977 |   const choice = randomSession.resultMetadata || {};
```


#### Hit 25 — line 42090

```text
 42072 |       gameCornerTier: randomSession.tierId,
 42073 |       unlockId: unlock.id,
 42074 |       pokemonId: pokemon.id,
 42075 |       randomPokemonSessionId: randomSession.id,
 42076 |       pokemonName: randomSession.resultDisplayName,
 42077 |       rolledPokemon: randomSession.resultDisplayName,
 42078 |       actionVisitId: unlock.actionVisitId,
 42079 |       timestamp: unlock.createdAt
 42080 |     });
 42081 |   });
 42082 |   const next = pendingRandomPokemonSessions().find((entry) => entry.id !== randomSession.id);
 42083 |   state.selectedRandomPokemonSessionId = next?.id || "";
 42084 |   state.randomPokemonDrawerOpen = Boolean(next);
 42085 |   saveState();
 42086 |   render();
 42087 | }
 42088 | 
 42089 | async function rerollRandomPokemonSession(sessionId = state.selectedRandomPokemonSessionId, options = {}) {
 42090 |   const randomSession = (state.randomPokemonSessions || []).find((entry) => entry.id === sessionId);
 42091 |   if (!randomSession || randomSession.status !== "pending" || randomSession.rerollable === false || randomSession.interactionLocked) return;
 42092 |   const ownerPlayerId = randomSession.resultOwnerPlayerId || randomSession.ownerPlayerId || randomSession.playerId;
 42093 |   const player = state.players.find((entry) => entry.id === ownerPlayerId);
 42094 |   const actor = state.players.find((entry) => entry.id === (options.actorPlayerId || ownerPlayerId));
 42095 |   if (!player || !actor) return;
 42096 |   if (!requirePrivatePrepAccess(actor, "reroll token")) return;
 42097 |   const tokenIndex = playerRerollTokenIndex(actor);
 42098 |   if (tokenIndex < 0) {
 42099 |     alert(`${actor.name} needs a Reroll Token.`);
 42100 |     return;
 42101 |   }
 42102 |   const exactToken = actor.inventory[tokenIndex];
 42103 |   const sourceEffectId = options.sourceEffectId || `reroll:${exactToken.id}:${randomSession.id}`;
 42104 |   const duplicateOperation = rerollOperationForSource(sourceEffectId);
 42105 |   if (duplicateOperation) return duplicateOperation;
 42106 |   const encounterSession = randomSession.sourceType === "encounter"
 42107 |     ? (state.encounterSessions || []).find((entry) => entry.id === randomSession.encounterSessionId)
 42108 |     : null;
```


#### Hit 26 — line 42231

```text
 42213 |         type: "encounter-reroll",
 42214 |         category: "items",
 42215 |         tokenId: rerollToken.id,
 42216 |         tokenName: rerollToken.name,
 42217 |         actorPlayerId: actor.id,
 42218 |         targetPlayerId: player.id,
 42219 |         targetResultId: randomSession.id,
 42220 |         previousPokemon: previousResult.resultDisplayName,
 42221 |         newPokemon: nextName,
 42222 |         randomPokemonSessionId: randomSession.id,
 42223 |         encounterSessionId: encounterSession.id,
 42224 |         timestamp: new Date().toISOString()
 42225 |       });
 42226 |     });
 42227 |   }
 42228 |   saveState();
 42229 |   renderRandomPokemonPanel();
 42230 |   const sprite = await fetchStablePokemonSprite(nextName, randomSession.chosenSpriteKey);
 42231 |   const latest = (state.randomPokemonSessions || []).find((entry) => entry.id === randomSession.id);
 42232 |   if (latest && latest.status === "pending") {
 42233 |     latest.chosenSpriteKey = sprite.spriteKey || "";
 42234 |     latest.resultSprite = sprite.spriteUrl || "";
 42235 |     state.selectedRandomPokemonSessionId = latest.id;
 42236 |     state.randomPokemonDrawerOpen = true;
 42237 |     saveState();
 42238 |     renderRandomPokemonPanel();
 42239 |   }
 42240 |   const operation = {
 42241 |     id: `effect-operation-${rerollRecord.id}`,
 42242 |     operationType: "rerollEncounterResult", sourceEffectId, sourceTokenId: rerollToken.id,
 42243 |     targetResultId: randomSession.id, resultKind: encounterSession ? "encounter-result" : "wheel-result",
 42244 |     previousResultRevisionId: previousRevisionId, replacementResultRevisionId: randomSession.resultRevisionId,
 42245 |     status: "completed", createdAt: new Date().toISOString()
 42246 |   };
 42247 |   state.effectOperations ||= [];
 42248 |   state.effectOperations.push(operation);
 42249 |   recordRerollTokenHistory({ snapshot: causalBeforeReroll, actor, token: rerollToken, sourceEffectId,
```


#### Hit 27 — line 42257

```text
 42239 |   }
 42240 |   const operation = {
 42241 |     id: `effect-operation-${rerollRecord.id}`,
 42242 |     operationType: "rerollEncounterResult", sourceEffectId, sourceTokenId: rerollToken.id,
 42243 |     targetResultId: randomSession.id, resultKind: encounterSession ? "encounter-result" : "wheel-result",
 42244 |     previousResultRevisionId: previousRevisionId, replacementResultRevisionId: randomSession.resultRevisionId,
 42245 |     status: "completed", createdAt: new Date().toISOString()
 42246 |   };
 42247 |   state.effectOperations ||= [];
 42248 |   state.effectOperations.push(operation);
 42249 |   recordRerollTokenHistory({ snapshot: causalBeforeReroll, actor, token: rerollToken, sourceEffectId,
 42250 |     targetResultId: randomSession.id, targetPlayerId: player.id, previousName: previousResult.resultDisplayName,
 42251 |     nextName, resultKind: operation.resultKind });
 42252 |   saveState();
 42253 |   return operation;
 42254 | }
 42255 | 
 42256 | function cancelRandomPokemonSession(sessionId = state.selectedRandomPokemonSessionId) {
 42257 |   const randomSession = (state.randomPokemonSessions || []).find((entry) => entry.id === sessionId);
 42258 |   if (!randomSession || randomSession.status !== "pending") return;
 42259 |   randomSession.status = "cancelled";
 42260 |   randomSession.cancelledAt = new Date().toISOString();
 42261 |   resolvePokemonResultTimingWindow(randomSession, "canceled");
 42262 |   const next = pendingRandomPokemonSessions().find((entry) => entry.id !== randomSession.id);
 42263 |   state.selectedRandomPokemonSessionId = next?.id || "";
 42264 |   state.randomPokemonDrawerOpen = Boolean(next);
 42265 |   saveState();
 42266 |   render();
 42267 | }
 42268 | 
 42269 | function updateEncounterActionLog(session, player, updater = null) {
 42270 |   const entry = (state.log || []).find((logEntry) => logEntry.type === "encounter-action"
 42271 |     && (logEntry.encounterSessionId === session.id || logEntry.actionVisitId === session.actionVisitId));
 42272 |   if (!entry) return null;
 42273 |   entry.details ||= [];
 42274 |   entry.childEvents ||= [];
 42275 |   entry.categories ||= [];
```


#### Hit 28 — line 42280

```text
 42262 |   const next = pendingRandomPokemonSessions().find((entry) => entry.id !== randomSession.id);
 42263 |   state.selectedRandomPokemonSessionId = next?.id || "";
 42264 |   state.randomPokemonDrawerOpen = Boolean(next);
 42265 |   saveState();
 42266 |   render();
 42267 | }
 42268 | 
 42269 | function updateEncounterActionLog(session, player, updater = null) {
 42270 |   const entry = (state.log || []).find((logEntry) => logEntry.type === "encounter-action"
 42271 |     && (logEntry.encounterSessionId === session.id || logEntry.actionVisitId === session.actionVisitId));
 42272 |   if (!entry) return null;
 42273 |   entry.details ||= [];
 42274 |   entry.childEvents ||= [];
 42275 |   entry.categories ||= [];
 42276 |   entry.tags ||= [];
 42277 |   if (updater) updater(entry);
 42278 |   const rolls = session.rolls || [];
 42279 |   const caughtNames = rolls.map((roll) => {
 42280 |     const result = (state.randomPokemonSessions || []).find((randomSession) => randomSession.id === roll.randomPokemonSessionId);
 42281 |     return result?.status === "confirmed" ? result.resultDisplayName : "";
 42282 |   }).filter(Boolean);
 42283 |   const lines = [
 42284 |     "Spent 1 Action at Encounter",
 42285 |     `Rolled ${rolls.length}/${session.maxRolls || 2} Encounters`,
 42286 |     caughtNames.length ? `Caught ${caughtNames.join(", ")}` : "",
 42287 |     session.includeFishing ? "Fishing included" : "",
 42288 |     session.includeSurf ? "Surf included" : "",
 42289 |     (session.removedEntryIds || []).length ? `Removed ${(session.removedEntryIds || []).length} option${session.removedEntryIds.length === 1 ? "" : "s"}` : ""
 42290 |   ].filter(Boolean);
 42291 |   entry.summary = lines.join("\n");
 42292 |   entry.details = [
 42293 |     `Active pool: ${encounterEntriesForSession(session).map((entry) => entry.displayName || entry.pokemonName).join(", ") || "None"}`,
 42294 |     `Fishing included: ${session.includeFishing ? "Yes" : "No"}`,
 42295 |     `Surf included: ${session.includeSurf ? "Yes" : "No"}`,
 42296 |     ...(session.removedEntryIds || []).map((id) => `Removed: ${id}`),
 42297 |     ...rolls.map((roll, index) => `Roll ${index + 1}: ${roll.resultDisplayName}`)
 42298 |   ];
```


#### Hit 29 — line 42329

```text
 42311 | 
 42312 | function startEncounterSession({ skipConfirmCheck = false } = {}) {
 42313 |   const player = activePlayer();
 42314 |   const location = actionLocationById("encounter");
 42315 |   const definition = encounterWheelDefinition();
 42316 |   if (!definition) {
 42317 |     alert("No Encounter Wheel is defined for this Series/Gym yet.");
 42318 |     return false;
 42319 |   }
 42320 |   if (!skipConfirmCheck) {
 42321 |     const check = actionLocationCanConfirm(location, player.id, 1);
 42322 |     if (!check.ok) {
 42323 |       alert(check.reason);
 42324 |       return false;
 42325 |     }
 42326 |   }
 42327 |   const previousVisits = structuredClone(actionVisitsForPlayer(player.id));
 42328 |   const previousEncounterSessions = structuredClone(state.encounterSessions || []);
 42329 |   const previousRandomPokemonSessions = structuredClone(state.randomPokemonSessions || []);
 42330 |   const previousPokemonRecords = structuredClone(state.pokemonRecords || []);
 42331 |   const previousInventory = structuredClone(player.inventory || []);
 42332 |   const previousInteractionEventIds = (state.interactionEvents || []).map((activity) => activity.id).filter(Boolean);
 42333 |   const previousTransactionIds = (state.transactions || []).map((transaction) => transaction.id).filter(Boolean);
 42334 |   const visit = {
 42335 |     id: `action-visit-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
 42336 |     playerId: player.id,
 42337 |     locationId: "encounter",
 42338 |     locationName: "Encounter",
 42339 |     serviceId: "encounter-wheel",
 42340 |     serviceLabel: "Open Encounter Wheel",
 42341 |     actionCost: 1,
 42342 |     series: state.series,
 42343 |     gym: Number(state.gym),
 42344 |     phase: currentPhase(),
 42345 |     createdAt: new Date().toISOString(),
 42346 |     placeholder: false
 42347 |   };
```


#### Hit 30 — line 48074

```text
 48056 |     workingState,
 48057 |     baselineState: baseline
 48058 |   });
 48059 |   const origin = {
 48060 |     sessionId: info.id,
 48061 |     scenarioName: info.scenarioName,
 48062 |     committedAt: new Date().toISOString()
 48063 |   };
 48064 |   [
 48065 |     "log",
 48066 |     "effectAuditRecords",
 48067 |     "effectOperations",
 48068 |     "interactionEvents",
 48069 |     "transactions",
 48070 |     "tokenConsumptions",
 48071 |     "tokenActivations",
 48072 |     "playerNotifications",
 48073 |     "lingeringStatuses",
 48074 |     "randomPokemonSessions",
 48075 |     "encounterSessions",
 48076 |     "wheelSessions"
 48077 |   ].forEach((key) => markSandboxCollectionChanges(candidate, baseline, key, origin));
 48078 |   candidate.chronologyCounter = Number(candidate.chronologyCounter || 0) + 1;
 48079 |   candidate.log ||= [];
 48080 |   candidate.log.unshift({
 48081 |     id: `sandbox-commit-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
 48082 |     action: "admin",
 48083 |     category: "admin",
 48084 |     player: "Admin Tools",
 48085 |     item: `Committed Token Sandbox: ${info.scenarioName}`,
 48086 |     title: "Sandbox scenario committed",
 48087 |     summary: `Session ${info.id} entered real history after revision validation.`,
 48088 |     details: [`Entry revision: ${info.entryRevision}`, `Controlled player: ${info.controlledPlayerName || info.controlledPlayerId || "Unknown"}`],
 48089 |     type: "token-scenario-commit",
 48090 |     tags: ["admin", "testing", "token-scenario", "sandbox-origin", info.id],
 48091 |     sandboxOrigin: { ...origin },
 48092 |     eventOrder: candidate.chronologyCounter,
```


### function useV2ExtraEncounter(

Occurrences: 1

#### Hit 1 — line 45766

```text
 45748 |     const player = activePlayer();
 45749 |     const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.reroll)[0]?.id || "";
 45750 |     const result = v2UseRerollTokenOnAction(actionId, tokenId, { actingPlayerId: player.id });
 45751 |     v2PersistRenderAndPublishRouteActivity({ stage: "rerolled", actorPlayerId: player.id, seriesId: state.series, routeNumber: result.routeNumber });
 45752 |   } catch (error) {
 45753 |     alert(error.message || "Unable to use V2 Reroll Token.");
 45754 |   }
 45755 | }
 45756 | 
 45757 | function purchaseV2ExtraEncounter() {
 45758 |   try {
 45759 |     v2PurchaseExtraEncounter(activePlayer().id);
 45760 |     v2PersistAndRender();
 45761 |   } catch (error) {
 45762 |     alert(error.message || "Unable to purchase Extra Encounter.");
 45763 |   }
 45764 | }
 45765 | 
 45766 | function useV2ExtraEncounter(routeNumber, tokenInventoryId = "") {
 45767 |   try {
 45768 |     const player = activePlayer();
 45769 |     const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.extraEncounter)[0]?.id || "";
 45770 |     const operation = v2UseExtraEncounter(player.id, routeNumber, tokenId);
 45771 |     const workspace = v2RouteWorkspaceState(state.series);
 45772 |     workspace.screen = "result";
 45773 |     workspace.selectedActionId = "extra-encounter";
 45774 |     workspace.selectedRouteNumber = Number(routeNumber);
 45775 |     workspace.activeActionId = operation.operationId;
 45776 |     state.routeUiState = normalizeRouteUiState(state.routeUiState);
 45777 |     state.routeUiState.activeRouteActionIdBySeriesId[state.series] = operation.operationId;
 45778 |     v2PersistRenderAndPublishRouteActivity({ stage: "encountered", actorPlayerId: player.id, seriesId: state.series, routeNumber });
 45779 |   } catch (error) {
 45780 |     alert(error.message || "Unable to use Extra Encounter.");
 45781 |   }
 45782 | }
 45783 | 
 45784 | function applyV2RouteRepel(routeNumber, battleTierId, tokenInventoryId = "") {
```


### function useV2RouteRerollToken(

Occurrences: 1

#### Hit 1 — line 45746

```text
 45728 |     workspace.screen = "result";
 45729 |     workspace.activeActionId = action?.actionId || operation?.operationId || "";
 45730 |     workspace.activeOpportunityId = "";
 45731 |     v2PersistRenderAndPublishRouteActivity({ stage: "encountered", actorPlayerId: player.id, seriesId, routeNumber: result.routeNumber });
 45732 |   } catch (error) {
 45733 |     alert(error.message || "Unable to draw V2 Route encounter.");
 45734 |   }
 45735 | }
 45736 | 
 45737 | function rerollV2RouteAction(actionId) {
 45738 |   try {
 45739 |     const result = v2RerollRouteActionResult(actionId, { actingPlayerId: activePlayer().id });
 45740 |     v2PersistRenderAndPublishRouteActivity({ stage: "rerolled", actorPlayerId: activePlayer().id, seriesId: state.series, routeNumber: result.routeNumber });
 45741 |   } catch (error) {
 45742 |     alert(error.message || "Unable to reroll V2 Route encounter.");
 45743 |   }
 45744 | }
 45745 | 
 45746 | function useV2RouteRerollToken(actionId, tokenInventoryId = "") {
 45747 |   try {
 45748 |     const player = activePlayer();
 45749 |     const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.reroll)[0]?.id || "";
 45750 |     const result = v2UseRerollTokenOnAction(actionId, tokenId, { actingPlayerId: player.id });
 45751 |     v2PersistRenderAndPublishRouteActivity({ stage: "rerolled", actorPlayerId: player.id, seriesId: state.series, routeNumber: result.routeNumber });
 45752 |   } catch (error) {
 45753 |     alert(error.message || "Unable to use V2 Reroll Token.");
 45754 |   }
 45755 | }
 45756 | 
 45757 | function purchaseV2ExtraEncounter() {
 45758 |   try {
 45759 |     v2PurchaseExtraEncounter(activePlayer().id);
 45760 |     v2PersistAndRender();
 45761 |   } catch (error) {
 45762 |     alert(error.message || "Unable to purchase Extra Encounter.");
 45763 |   }
 45764 | }
```


### function applyV2RouteRepel(

Occurrences: 1

#### Hit 1 — line 45784

```text
 45766 | function useV2ExtraEncounter(routeNumber, tokenInventoryId = "") {
 45767 |   try {
 45768 |     const player = activePlayer();
 45769 |     const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.extraEncounter)[0]?.id || "";
 45770 |     const operation = v2UseExtraEncounter(player.id, routeNumber, tokenId);
 45771 |     const workspace = v2RouteWorkspaceState(state.series);
 45772 |     workspace.screen = "result";
 45773 |     workspace.selectedActionId = "extra-encounter";
 45774 |     workspace.selectedRouteNumber = Number(routeNumber);
 45775 |     workspace.activeActionId = operation.operationId;
 45776 |     state.routeUiState = normalizeRouteUiState(state.routeUiState);
 45777 |     state.routeUiState.activeRouteActionIdBySeriesId[state.series] = operation.operationId;
 45778 |     v2PersistRenderAndPublishRouteActivity({ stage: "encountered", actorPlayerId: player.id, seriesId: state.series, routeNumber });
 45779 |   } catch (error) {
 45780 |     alert(error.message || "Unable to use Extra Encounter.");
 45781 |   }
 45782 | }
 45783 | 
 45784 | function applyV2RouteRepel(routeNumber, battleTierId, tokenInventoryId = "") {
 45785 |   try {
 45786 |     const player = activePlayer();
 45787 |     const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.repel)[0]?.id || "";
 45788 |     v2ApplyRepelToRoute(player.id, routeNumber, battleTierId, tokenId);
 45789 |     v2PersistAndRender();
 45790 |   } catch (error) {
 45791 |     alert(error.message || "Unable to apply V2 Repel.");
 45792 |   }
 45793 | }
 45794 | 
 45795 | function useV2MasterBallOnOpportunity(opportunityId, residentId, tokenInventoryId = "") {
 45796 |   try {
 45797 |     const player = activePlayer();
 45798 |     const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.masterBall)[0]?.id || "";
 45799 |     const operation = v2UseMasterBallOnOpportunity(player.id, opportunityId, residentId, tokenId);
 45800 |     const workspace = v2RouteWorkspaceState(state.series);
 45801 |     workspace.screen = "result";
 45802 |     workspace.selectedActionId = "encounter";
```


### function useV2MasterBallOnOpportunity(

Occurrences: 1

#### Hit 1 — line 45795

```text
 45777 |     state.routeUiState.activeRouteActionIdBySeriesId[state.series] = operation.operationId;
 45778 |     v2PersistRenderAndPublishRouteActivity({ stage: "encountered", actorPlayerId: player.id, seriesId: state.series, routeNumber });
 45779 |   } catch (error) {
 45780 |     alert(error.message || "Unable to use Extra Encounter.");
 45781 |   }
 45782 | }
 45783 | 
 45784 | function applyV2RouteRepel(routeNumber, battleTierId, tokenInventoryId = "") {
 45785 |   try {
 45786 |     const player = activePlayer();
 45787 |     const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.repel)[0]?.id || "";
 45788 |     v2ApplyRepelToRoute(player.id, routeNumber, battleTierId, tokenId);
 45789 |     v2PersistAndRender();
 45790 |   } catch (error) {
 45791 |     alert(error.message || "Unable to apply V2 Repel.");
 45792 |   }
 45793 | }
 45794 | 
 45795 | function useV2MasterBallOnOpportunity(opportunityId, residentId, tokenInventoryId = "") {
 45796 |   try {
 45797 |     const player = activePlayer();
 45798 |     const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.masterBall)[0]?.id || "";
 45799 |     const operation = v2UseMasterBallOnOpportunity(player.id, opportunityId, residentId, tokenId);
 45800 |     const workspace = v2RouteWorkspaceState(state.series);
 45801 |     workspace.screen = "result";
 45802 |     workspace.selectedActionId = "encounter";
 45803 |     workspace.selectedRouteNumber = operation.routeNumber;
 45804 |     workspace.activeActionId = operation.operationId;
 45805 |     workspace.activeOpportunityId = "";
 45806 |     state.routeUiState = normalizeRouteUiState(state.routeUiState);
 45807 |     state.routeUiState.activeRouteActionIdBySeriesId[state.series] = operation.operationId;
 45808 |     v2PersistRenderAndPublishRouteActivity({ stage: "encountered", actorPlayerId: player.id, seriesId: state.series, routeNumber: operation.routeNumber });
 45809 |   } catch (error) {
 45810 |     alert(error.message || "Unable to use V2 Master Ball.");
 45811 |   }
 45812 | }
 45813 | 
```



## index.html detailed contexts

### encounter-token-runtime.js

Occurrences: 1

#### Hit 1 — line 16

```text
     1 | <!doctype html>
     2 | <html lang="en">
     3 |   <head>
     4 |     <meta charset="utf-8">
     5 |     <meta name="viewport" content="width=device-width, initial-scale=1">
     6 |     <title>Rival Saga</title>
     7 |     <link rel="icon" href="data:,">
     8 |   <link rel="stylesheet" href="styles.css?v=353">
     9 |     <script defer src="game-shell-contract.js?v=1"></script>
    10 |     <script defer src="save-compaction.js?v=1"></script>
    11 |     <script defer src="move-classification-data.js?v=5"></script>
    12 |     <script defer src="shop-choice-data.js?v=3"></script>
    13 |     <script defer src="shop-data.js?v=12"></script>
    14 |     <script defer src="interaction-situation-lifecycle.js?v=2"></script>
    15 |     <script defer src="provisional-declaration-runtime.js?v=2"></script>
    16 |     <script defer src="encounter-token-runtime.js?v=1"></script>
    17 |     <script defer src="token-effect-contract.js?v=8"></script>
    18 |     <script defer src="token-control-effects.js?v=4"></script>
    19 |     <script defer src="token-control-controller.js?v=2"></script>
    20 |     <script defer src="token-result-summary.js?v=1"></script>
    21 |     <script defer src="token-inventory-runtime.js?v=1"></script>
    22 |     <script defer src="token-sandbox-session.js?v=1"></script>
    23 |     <script defer src="item-reference-data.js?v=3"></script>
    24 |     <script defer src="shop-sprite-data.js?v=4"></script>
    25 |     <script defer src="shop-browse-data.js?v=5"></script>
    26 |     <script defer src="pokemon-balance-tiers.js?v=188"></script>
    27 |     <script defer src="silph-data.js?v=3"></script>
    28 |     <script defer src="action-phase-balance.js?v=1"></script>
    29 |     <script defer src="app.js?v=458"></script>
    30 |   </head>
    31 |   <body>
    32 |     <section id="gameHydrationScreen" class="game-hydration-screen hidden" role="status" aria-live="polite" aria-busy="true">
    33 |       <div class="game-hydration-orbit" aria-hidden="true">
    34 |         <span class="game-hydration-core">RS</span>
```


### encounterTab

Occurrences: 1

#### Hit 1 — line 1365

```text
  1347 |         </section>
  1348 |       </aside>
  1349 | 
  1350 |       <aside id="randomPokemonColumn" class="random-pokemon-column">
  1351 |         <button id="randomPokemonTab" class="random-pokemon-tab hidden" type="button" aria-controls="randomPokemonPanel" aria-expanded="false">Pokemon Result</button>
  1352 |         <section id="randomPokemonPanel" class="random-pokemon-panel">
  1353 |           <div class="panel-header">
  1354 |             <div>
  1355 |               <p class="eyebrow">Random Pokemon</p>
  1356 |               <h2>Pokemon Result</h2>
  1357 |             </div>
  1358 |             <button id="closeRandomPokemonPanel" class="ghost-button" type="button">Close</button>
  1359 |           </div>
  1360 |           <div id="randomPokemonSessionList" class="wheel-session-list"></div>
  1361 |           <div id="randomPokemonSessionDetail" class="random-pokemon-detail"></div>
  1362 |         </section>
  1363 |       </aside>
  1364 | 
  1365 |       <button id="encounterTab" class="encounter-tab hidden" type="button" aria-controls="encounterOverlay" aria-expanded="false">Encounter</button>
  1366 |       <section id="encounterOverlay" class="encounter-overlay hidden" aria-label="Encounter Wheel">
  1367 |         <div class="encounter-modal">
  1368 |           <div class="panel-header">
  1369 |             <div>
  1370 |               <p class="eyebrow">Encounter Wheel</p>
  1371 |               <h2 id="encounterTitle">Encounter Wheel</h2>
  1372 |             </div>
  1373 |             <button id="closeEncounterOverlay" class="ghost-button" type="button">Close</button>
  1374 |           </div>
  1375 |           <div id="encounterSessionList" class="wheel-session-list"></div>
  1376 |           <div id="encounterBody"></div>
  1377 |         </div>
  1378 |       </section>
  1379 |     </main>
  1380 | 
  1381 |     <template id="shopCardTemplate">
  1382 |       <article class="shop-card">
  1383 |         <div>
```


### encounterOverlay

Occurrences: 2

#### Hit 1 — line 1365

```text
  1347 |         </section>
  1348 |       </aside>
  1349 | 
  1350 |       <aside id="randomPokemonColumn" class="random-pokemon-column">
  1351 |         <button id="randomPokemonTab" class="random-pokemon-tab hidden" type="button" aria-controls="randomPokemonPanel" aria-expanded="false">Pokemon Result</button>
  1352 |         <section id="randomPokemonPanel" class="random-pokemon-panel">
  1353 |           <div class="panel-header">
  1354 |             <div>
  1355 |               <p class="eyebrow">Random Pokemon</p>
  1356 |               <h2>Pokemon Result</h2>
  1357 |             </div>
  1358 |             <button id="closeRandomPokemonPanel" class="ghost-button" type="button">Close</button>
  1359 |           </div>
  1360 |           <div id="randomPokemonSessionList" class="wheel-session-list"></div>
  1361 |           <div id="randomPokemonSessionDetail" class="random-pokemon-detail"></div>
  1362 |         </section>
  1363 |       </aside>
  1364 | 
  1365 |       <button id="encounterTab" class="encounter-tab hidden" type="button" aria-controls="encounterOverlay" aria-expanded="false">Encounter</button>
  1366 |       <section id="encounterOverlay" class="encounter-overlay hidden" aria-label="Encounter Wheel">
  1367 |         <div class="encounter-modal">
  1368 |           <div class="panel-header">
  1369 |             <div>
  1370 |               <p class="eyebrow">Encounter Wheel</p>
  1371 |               <h2 id="encounterTitle">Encounter Wheel</h2>
  1372 |             </div>
  1373 |             <button id="closeEncounterOverlay" class="ghost-button" type="button">Close</button>
  1374 |           </div>
  1375 |           <div id="encounterSessionList" class="wheel-session-list"></div>
  1376 |           <div id="encounterBody"></div>
  1377 |         </div>
  1378 |       </section>
  1379 |     </main>
  1380 | 
  1381 |     <template id="shopCardTemplate">
  1382 |       <article class="shop-card">
  1383 |         <div>
```


#### Hit 2 — line 1366

```text
  1348 |       </aside>
  1349 | 
  1350 |       <aside id="randomPokemonColumn" class="random-pokemon-column">
  1351 |         <button id="randomPokemonTab" class="random-pokemon-tab hidden" type="button" aria-controls="randomPokemonPanel" aria-expanded="false">Pokemon Result</button>
  1352 |         <section id="randomPokemonPanel" class="random-pokemon-panel">
  1353 |           <div class="panel-header">
  1354 |             <div>
  1355 |               <p class="eyebrow">Random Pokemon</p>
  1356 |               <h2>Pokemon Result</h2>
  1357 |             </div>
  1358 |             <button id="closeRandomPokemonPanel" class="ghost-button" type="button">Close</button>
  1359 |           </div>
  1360 |           <div id="randomPokemonSessionList" class="wheel-session-list"></div>
  1361 |           <div id="randomPokemonSessionDetail" class="random-pokemon-detail"></div>
  1362 |         </section>
  1363 |       </aside>
  1364 | 
  1365 |       <button id="encounterTab" class="encounter-tab hidden" type="button" aria-controls="encounterOverlay" aria-expanded="false">Encounter</button>
  1366 |       <section id="encounterOverlay" class="encounter-overlay hidden" aria-label="Encounter Wheel">
  1367 |         <div class="encounter-modal">
  1368 |           <div class="panel-header">
  1369 |             <div>
  1370 |               <p class="eyebrow">Encounter Wheel</p>
  1371 |               <h2 id="encounterTitle">Encounter Wheel</h2>
  1372 |             </div>
  1373 |             <button id="closeEncounterOverlay" class="ghost-button" type="button">Close</button>
  1374 |           </div>
  1375 |           <div id="encounterSessionList" class="wheel-session-list"></div>
  1376 |           <div id="encounterBody"></div>
  1377 |         </div>
  1378 |       </section>
  1379 |     </main>
  1380 | 
  1381 |     <template id="shopCardTemplate">
  1382 |       <article class="shop-card">
  1383 |         <div>
  1384 |           <p class="tier-label"></p>
```


### Encounter Wheel

Occurrences: 3

#### Hit 1 — line 1366

```text
  1348 |       </aside>
  1349 | 
  1350 |       <aside id="randomPokemonColumn" class="random-pokemon-column">
  1351 |         <button id="randomPokemonTab" class="random-pokemon-tab hidden" type="button" aria-controls="randomPokemonPanel" aria-expanded="false">Pokemon Result</button>
  1352 |         <section id="randomPokemonPanel" class="random-pokemon-panel">
  1353 |           <div class="panel-header">
  1354 |             <div>
  1355 |               <p class="eyebrow">Random Pokemon</p>
  1356 |               <h2>Pokemon Result</h2>
  1357 |             </div>
  1358 |             <button id="closeRandomPokemonPanel" class="ghost-button" type="button">Close</button>
  1359 |           </div>
  1360 |           <div id="randomPokemonSessionList" class="wheel-session-list"></div>
  1361 |           <div id="randomPokemonSessionDetail" class="random-pokemon-detail"></div>
  1362 |         </section>
  1363 |       </aside>
  1364 | 
  1365 |       <button id="encounterTab" class="encounter-tab hidden" type="button" aria-controls="encounterOverlay" aria-expanded="false">Encounter</button>
  1366 |       <section id="encounterOverlay" class="encounter-overlay hidden" aria-label="Encounter Wheel">
  1367 |         <div class="encounter-modal">
  1368 |           <div class="panel-header">
  1369 |             <div>
  1370 |               <p class="eyebrow">Encounter Wheel</p>
  1371 |               <h2 id="encounterTitle">Encounter Wheel</h2>
  1372 |             </div>
  1373 |             <button id="closeEncounterOverlay" class="ghost-button" type="button">Close</button>
  1374 |           </div>
  1375 |           <div id="encounterSessionList" class="wheel-session-list"></div>
  1376 |           <div id="encounterBody"></div>
  1377 |         </div>
  1378 |       </section>
  1379 |     </main>
  1380 | 
  1381 |     <template id="shopCardTemplate">
  1382 |       <article class="shop-card">
  1383 |         <div>
  1384 |           <p class="tier-label"></p>
```


#### Hit 2 — line 1370

```text
  1352 |         <section id="randomPokemonPanel" class="random-pokemon-panel">
  1353 |           <div class="panel-header">
  1354 |             <div>
  1355 |               <p class="eyebrow">Random Pokemon</p>
  1356 |               <h2>Pokemon Result</h2>
  1357 |             </div>
  1358 |             <button id="closeRandomPokemonPanel" class="ghost-button" type="button">Close</button>
  1359 |           </div>
  1360 |           <div id="randomPokemonSessionList" class="wheel-session-list"></div>
  1361 |           <div id="randomPokemonSessionDetail" class="random-pokemon-detail"></div>
  1362 |         </section>
  1363 |       </aside>
  1364 | 
  1365 |       <button id="encounterTab" class="encounter-tab hidden" type="button" aria-controls="encounterOverlay" aria-expanded="false">Encounter</button>
  1366 |       <section id="encounterOverlay" class="encounter-overlay hidden" aria-label="Encounter Wheel">
  1367 |         <div class="encounter-modal">
  1368 |           <div class="panel-header">
  1369 |             <div>
  1370 |               <p class="eyebrow">Encounter Wheel</p>
  1371 |               <h2 id="encounterTitle">Encounter Wheel</h2>
  1372 |             </div>
  1373 |             <button id="closeEncounterOverlay" class="ghost-button" type="button">Close</button>
  1374 |           </div>
  1375 |           <div id="encounterSessionList" class="wheel-session-list"></div>
  1376 |           <div id="encounterBody"></div>
  1377 |         </div>
  1378 |       </section>
  1379 |     </main>
  1380 | 
  1381 |     <template id="shopCardTemplate">
  1382 |       <article class="shop-card">
  1383 |         <div>
  1384 |           <p class="tier-label"></p>
  1385 |           <h3></h3>
  1386 |           <p class="description"></p>
  1387 |         </div>
  1388 |         <div class="card-footer">
```


#### Hit 3 — line 1371

```text
  1353 |           <div class="panel-header">
  1354 |             <div>
  1355 |               <p class="eyebrow">Random Pokemon</p>
  1356 |               <h2>Pokemon Result</h2>
  1357 |             </div>
  1358 |             <button id="closeRandomPokemonPanel" class="ghost-button" type="button">Close</button>
  1359 |           </div>
  1360 |           <div id="randomPokemonSessionList" class="wheel-session-list"></div>
  1361 |           <div id="randomPokemonSessionDetail" class="random-pokemon-detail"></div>
  1362 |         </section>
  1363 |       </aside>
  1364 | 
  1365 |       <button id="encounterTab" class="encounter-tab hidden" type="button" aria-controls="encounterOverlay" aria-expanded="false">Encounter</button>
  1366 |       <section id="encounterOverlay" class="encounter-overlay hidden" aria-label="Encounter Wheel">
  1367 |         <div class="encounter-modal">
  1368 |           <div class="panel-header">
  1369 |             <div>
  1370 |               <p class="eyebrow">Encounter Wheel</p>
  1371 |               <h2 id="encounterTitle">Encounter Wheel</h2>
  1372 |             </div>
  1373 |             <button id="closeEncounterOverlay" class="ghost-button" type="button">Close</button>
  1374 |           </div>
  1375 |           <div id="encounterSessionList" class="wheel-session-list"></div>
  1376 |           <div id="encounterBody"></div>
  1377 |         </div>
  1378 |       </section>
  1379 |     </main>
  1380 | 
  1381 |     <template id="shopCardTemplate">
  1382 |       <article class="shop-card">
  1383 |         <div>
  1384 |           <p class="tier-label"></p>
  1385 |           <h3></h3>
  1386 |           <p class="description"></p>
  1387 |         </div>
  1388 |         <div class="card-footer">
  1389 |           <strong class="price"></strong>
```


### includeFishing

Occurrences: 0

### includeSurf

Occurrences: 0


## styles.css detailed contexts

### .encounter-overlay

Occurrences: 2

#### Hit 1 — line 16558

```text
 16540 | }
 16541 | 
 16542 | .encounter-tab {
 16543 |   position: fixed;
 16544 |   right: 0;
 16545 |   bottom: 220px;
 16546 |   z-index: 46;
 16547 |   min-height: 44px;
 16548 |   border: 1px solid var(--line);
 16549 |   border-right: 0;
 16550 |   border-radius: 8px 0 0 8px;
 16551 |   background: var(--surface);
 16552 |   color: var(--ink);
 16553 |   box-shadow: var(--shadow);
 16554 |   padding: 0 12px;
 16555 |   font-weight: 900;
 16556 | }
 16557 | 
 16558 | .encounter-overlay {
 16559 |   position: fixed;
 16560 |   inset: 0;
 16561 |   z-index: 75;
 16562 |   display: grid;
 16563 |   place-items: center;
 16564 |   background: rgba(0, 0, 0, 0.38);
 16565 |   padding: 18px;
 16566 | }
 16567 | 
 16568 | .encounter-tab.hidden,
 16569 | .encounter-overlay.hidden {
 16570 |   display: none;
 16571 | }
 16572 | 
 16573 | .encounter-modal {
 16574 |   display: grid;
 16575 |   gap: 14px;
 16576 |   width: min(1120px, calc(100vw - 36px));
```


#### Hit 2 — line 16569

```text
 16551 |   background: var(--surface);
 16552 |   color: var(--ink);
 16553 |   box-shadow: var(--shadow);
 16554 |   padding: 0 12px;
 16555 |   font-weight: 900;
 16556 | }
 16557 | 
 16558 | .encounter-overlay {
 16559 |   position: fixed;
 16560 |   inset: 0;
 16561 |   z-index: 75;
 16562 |   display: grid;
 16563 |   place-items: center;
 16564 |   background: rgba(0, 0, 0, 0.38);
 16565 |   padding: 18px;
 16566 | }
 16567 | 
 16568 | .encounter-tab.hidden,
 16569 | .encounter-overlay.hidden {
 16570 |   display: none;
 16571 | }
 16572 | 
 16573 | .encounter-modal {
 16574 |   display: grid;
 16575 |   gap: 14px;
 16576 |   width: min(1120px, calc(100vw - 36px));
 16577 |   max-height: calc(100vh - 36px);
 16578 |   overflow: auto;
 16579 |   border: 1px solid color-mix(in srgb, var(--brand) 46%, #ffffff);
 16580 |   border-radius: 8px;
 16581 |   background: color-mix(in srgb, #071827 86%, var(--surface));
 16582 |   color: #f8fbff;
 16583 |   box-shadow: 0 24px 70px rgba(0, 0, 0, 0.32);
 16584 |   padding: 16px;
 16585 | }
 16586 | 
 16587 | .encounter-modal .eyebrow,
```


### .encounter-tab

Occurrences: 2

#### Hit 1 — line 16542

```text
 16524 |   font-weight: 950;
 16525 | }
 16526 | 
 16527 | .random-pokemon-notes {
 16528 |   margin: 0;
 16529 |   padding-left: 18px;
 16530 | }
 16531 | 
 16532 | .random-pokemon-notes.empty {
 16533 |   padding-left: 0;
 16534 | }
 16535 | 
 16536 | .random-pokemon-actions {
 16537 |   display: flex;
 16538 |   flex-wrap: wrap;
 16539 |   gap: 8px;
 16540 | }
 16541 | 
 16542 | .encounter-tab {
 16543 |   position: fixed;
 16544 |   right: 0;
 16545 |   bottom: 220px;
 16546 |   z-index: 46;
 16547 |   min-height: 44px;
 16548 |   border: 1px solid var(--line);
 16549 |   border-right: 0;
 16550 |   border-radius: 8px 0 0 8px;
 16551 |   background: var(--surface);
 16552 |   color: var(--ink);
 16553 |   box-shadow: var(--shadow);
 16554 |   padding: 0 12px;
 16555 |   font-weight: 900;
 16556 | }
 16557 | 
 16558 | .encounter-overlay {
 16559 |   position: fixed;
 16560 |   inset: 0;
```


#### Hit 2 — line 16568

```text
 16550 |   border-radius: 8px 0 0 8px;
 16551 |   background: var(--surface);
 16552 |   color: var(--ink);
 16553 |   box-shadow: var(--shadow);
 16554 |   padding: 0 12px;
 16555 |   font-weight: 900;
 16556 | }
 16557 | 
 16558 | .encounter-overlay {
 16559 |   position: fixed;
 16560 |   inset: 0;
 16561 |   z-index: 75;
 16562 |   display: grid;
 16563 |   place-items: center;
 16564 |   background: rgba(0, 0, 0, 0.38);
 16565 |   padding: 18px;
 16566 | }
 16567 | 
 16568 | .encounter-tab.hidden,
 16569 | .encounter-overlay.hidden {
 16570 |   display: none;
 16571 | }
 16572 | 
 16573 | .encounter-modal {
 16574 |   display: grid;
 16575 |   gap: 14px;
 16576 |   width: min(1120px, calc(100vw - 36px));
 16577 |   max-height: calc(100vh - 36px);
 16578 |   overflow: auto;
 16579 |   border: 1px solid color-mix(in srgb, var(--brand) 46%, #ffffff);
 16580 |   border-radius: 8px;
 16581 |   background: color-mix(in srgb, #071827 86%, var(--surface));
 16582 |   color: #f8fbff;
 16583 |   box-shadow: 0 24px 70px rgba(0, 0, 0, 0.32);
 16584 |   padding: 16px;
 16585 | }
 16586 | 
```


### .encounter-modal

Occurrences: 14

#### Hit 1 — line 16573

```text
 16555 |   font-weight: 900;
 16556 | }
 16557 | 
 16558 | .encounter-overlay {
 16559 |   position: fixed;
 16560 |   inset: 0;
 16561 |   z-index: 75;
 16562 |   display: grid;
 16563 |   place-items: center;
 16564 |   background: rgba(0, 0, 0, 0.38);
 16565 |   padding: 18px;
 16566 | }
 16567 | 
 16568 | .encounter-tab.hidden,
 16569 | .encounter-overlay.hidden {
 16570 |   display: none;
 16571 | }
 16572 | 
 16573 | .encounter-modal {
 16574 |   display: grid;
 16575 |   gap: 14px;
 16576 |   width: min(1120px, calc(100vw - 36px));
 16577 |   max-height: calc(100vh - 36px);
 16578 |   overflow: auto;
 16579 |   border: 1px solid color-mix(in srgb, var(--brand) 46%, #ffffff);
 16580 |   border-radius: 8px;
 16581 |   background: color-mix(in srgb, #071827 86%, var(--surface));
 16582 |   color: #f8fbff;
 16583 |   box-shadow: 0 24px 70px rgba(0, 0, 0, 0.32);
 16584 |   padding: 16px;
 16585 | }
 16586 | 
 16587 | .encounter-modal .eyebrow,
 16588 | .encounter-modal h2,
 16589 | .encounter-modal h3,
 16590 | .encounter-modal strong,
 16591 | .encounter-modal label,
```


#### Hit 2 — line 16587

```text
 16569 | .encounter-overlay.hidden {
 16570 |   display: none;
 16571 | }
 16572 | 
 16573 | .encounter-modal {
 16574 |   display: grid;
 16575 |   gap: 14px;
 16576 |   width: min(1120px, calc(100vw - 36px));
 16577 |   max-height: calc(100vh - 36px);
 16578 |   overflow: auto;
 16579 |   border: 1px solid color-mix(in srgb, var(--brand) 46%, #ffffff);
 16580 |   border-radius: 8px;
 16581 |   background: color-mix(in srgb, #071827 86%, var(--surface));
 16582 |   color: #f8fbff;
 16583 |   box-shadow: 0 24px 70px rgba(0, 0, 0, 0.32);
 16584 |   padding: 16px;
 16585 | }
 16586 | 
 16587 | .encounter-modal .eyebrow,
 16588 | .encounter-modal h2,
 16589 | .encounter-modal h3,
 16590 | .encounter-modal strong,
 16591 | .encounter-modal label,
 16592 | .encounter-modal .wheel-latest-result {
 16593 |   color: #f8fbff;
 16594 | }
 16595 | 
 16596 | .encounter-modal span,
 16597 | .encounter-modal .gc-rule-note,
 16598 | .encounter-modal .empty-state,
 16599 | .encounter-modal .wheel-meta span {
 16600 |   color: #cfe4f7;
 16601 | }
 16602 | 
 16603 | .encounter-modal .wheel-meta > div,
 16604 | .encounter-modal .wheel-latest-result,
 16605 | .encounter-modal .empty-state.compact {
```


#### Hit 3 — line 16588

```text
 16570 |   display: none;
 16571 | }
 16572 | 
 16573 | .encounter-modal {
 16574 |   display: grid;
 16575 |   gap: 14px;
 16576 |   width: min(1120px, calc(100vw - 36px));
 16577 |   max-height: calc(100vh - 36px);
 16578 |   overflow: auto;
 16579 |   border: 1px solid color-mix(in srgb, var(--brand) 46%, #ffffff);
 16580 |   border-radius: 8px;
 16581 |   background: color-mix(in srgb, #071827 86%, var(--surface));
 16582 |   color: #f8fbff;
 16583 |   box-shadow: 0 24px 70px rgba(0, 0, 0, 0.32);
 16584 |   padding: 16px;
 16585 | }
 16586 | 
 16587 | .encounter-modal .eyebrow,
 16588 | .encounter-modal h2,
 16589 | .encounter-modal h3,
 16590 | .encounter-modal strong,
 16591 | .encounter-modal label,
 16592 | .encounter-modal .wheel-latest-result {
 16593 |   color: #f8fbff;
 16594 | }
 16595 | 
 16596 | .encounter-modal span,
 16597 | .encounter-modal .gc-rule-note,
 16598 | .encounter-modal .empty-state,
 16599 | .encounter-modal .wheel-meta span {
 16600 |   color: #cfe4f7;
 16601 | }
 16602 | 
 16603 | .encounter-modal .wheel-meta > div,
 16604 | .encounter-modal .wheel-latest-result,
 16605 | .encounter-modal .empty-state.compact {
 16606 |   border-color: rgba(207, 228, 247, 0.3);
```


#### Hit 4 — line 16589

```text
 16571 | }
 16572 | 
 16573 | .encounter-modal {
 16574 |   display: grid;
 16575 |   gap: 14px;
 16576 |   width: min(1120px, calc(100vw - 36px));
 16577 |   max-height: calc(100vh - 36px);
 16578 |   overflow: auto;
 16579 |   border: 1px solid color-mix(in srgb, var(--brand) 46%, #ffffff);
 16580 |   border-radius: 8px;
 16581 |   background: color-mix(in srgb, #071827 86%, var(--surface));
 16582 |   color: #f8fbff;
 16583 |   box-shadow: 0 24px 70px rgba(0, 0, 0, 0.32);
 16584 |   padding: 16px;
 16585 | }
 16586 | 
 16587 | .encounter-modal .eyebrow,
 16588 | .encounter-modal h2,
 16589 | .encounter-modal h3,
 16590 | .encounter-modal strong,
 16591 | .encounter-modal label,
 16592 | .encounter-modal .wheel-latest-result {
 16593 |   color: #f8fbff;
 16594 | }
 16595 | 
 16596 | .encounter-modal span,
 16597 | .encounter-modal .gc-rule-note,
 16598 | .encounter-modal .empty-state,
 16599 | .encounter-modal .wheel-meta span {
 16600 |   color: #cfe4f7;
 16601 | }
 16602 | 
 16603 | .encounter-modal .wheel-meta > div,
 16604 | .encounter-modal .wheel-latest-result,
 16605 | .encounter-modal .empty-state.compact {
 16606 |   border-color: rgba(207, 228, 247, 0.3);
 16607 |   background: rgba(255, 255, 255, 0.08);
```


#### Hit 5 — line 16590

```text
 16572 | 
 16573 | .encounter-modal {
 16574 |   display: grid;
 16575 |   gap: 14px;
 16576 |   width: min(1120px, calc(100vw - 36px));
 16577 |   max-height: calc(100vh - 36px);
 16578 |   overflow: auto;
 16579 |   border: 1px solid color-mix(in srgb, var(--brand) 46%, #ffffff);
 16580 |   border-radius: 8px;
 16581 |   background: color-mix(in srgb, #071827 86%, var(--surface));
 16582 |   color: #f8fbff;
 16583 |   box-shadow: 0 24px 70px rgba(0, 0, 0, 0.32);
 16584 |   padding: 16px;
 16585 | }
 16586 | 
 16587 | .encounter-modal .eyebrow,
 16588 | .encounter-modal h2,
 16589 | .encounter-modal h3,
 16590 | .encounter-modal strong,
 16591 | .encounter-modal label,
 16592 | .encounter-modal .wheel-latest-result {
 16593 |   color: #f8fbff;
 16594 | }
 16595 | 
 16596 | .encounter-modal span,
 16597 | .encounter-modal .gc-rule-note,
 16598 | .encounter-modal .empty-state,
 16599 | .encounter-modal .wheel-meta span {
 16600 |   color: #cfe4f7;
 16601 | }
 16602 | 
 16603 | .encounter-modal .wheel-meta > div,
 16604 | .encounter-modal .wheel-latest-result,
 16605 | .encounter-modal .empty-state.compact {
 16606 |   border-color: rgba(207, 228, 247, 0.3);
 16607 |   background: rgba(255, 255, 255, 0.08);
 16608 |   color: #f8fbff;
```


#### Hit 6 — line 16591

```text
 16573 | .encounter-modal {
 16574 |   display: grid;
 16575 |   gap: 14px;
 16576 |   width: min(1120px, calc(100vw - 36px));
 16577 |   max-height: calc(100vh - 36px);
 16578 |   overflow: auto;
 16579 |   border: 1px solid color-mix(in srgb, var(--brand) 46%, #ffffff);
 16580 |   border-radius: 8px;
 16581 |   background: color-mix(in srgb, #071827 86%, var(--surface));
 16582 |   color: #f8fbff;
 16583 |   box-shadow: 0 24px 70px rgba(0, 0, 0, 0.32);
 16584 |   padding: 16px;
 16585 | }
 16586 | 
 16587 | .encounter-modal .eyebrow,
 16588 | .encounter-modal h2,
 16589 | .encounter-modal h3,
 16590 | .encounter-modal strong,
 16591 | .encounter-modal label,
 16592 | .encounter-modal .wheel-latest-result {
 16593 |   color: #f8fbff;
 16594 | }
 16595 | 
 16596 | .encounter-modal span,
 16597 | .encounter-modal .gc-rule-note,
 16598 | .encounter-modal .empty-state,
 16599 | .encounter-modal .wheel-meta span {
 16600 |   color: #cfe4f7;
 16601 | }
 16602 | 
 16603 | .encounter-modal .wheel-meta > div,
 16604 | .encounter-modal .wheel-latest-result,
 16605 | .encounter-modal .empty-state.compact {
 16606 |   border-color: rgba(207, 228, 247, 0.3);
 16607 |   background: rgba(255, 255, 255, 0.08);
 16608 |   color: #f8fbff;
 16609 | }
```


#### Hit 7 — line 16592

```text
 16574 |   display: grid;
 16575 |   gap: 14px;
 16576 |   width: min(1120px, calc(100vw - 36px));
 16577 |   max-height: calc(100vh - 36px);
 16578 |   overflow: auto;
 16579 |   border: 1px solid color-mix(in srgb, var(--brand) 46%, #ffffff);
 16580 |   border-radius: 8px;
 16581 |   background: color-mix(in srgb, #071827 86%, var(--surface));
 16582 |   color: #f8fbff;
 16583 |   box-shadow: 0 24px 70px rgba(0, 0, 0, 0.32);
 16584 |   padding: 16px;
 16585 | }
 16586 | 
 16587 | .encounter-modal .eyebrow,
 16588 | .encounter-modal h2,
 16589 | .encounter-modal h3,
 16590 | .encounter-modal strong,
 16591 | .encounter-modal label,
 16592 | .encounter-modal .wheel-latest-result {
 16593 |   color: #f8fbff;
 16594 | }
 16595 | 
 16596 | .encounter-modal span,
 16597 | .encounter-modal .gc-rule-note,
 16598 | .encounter-modal .empty-state,
 16599 | .encounter-modal .wheel-meta span {
 16600 |   color: #cfe4f7;
 16601 | }
 16602 | 
 16603 | .encounter-modal .wheel-meta > div,
 16604 | .encounter-modal .wheel-latest-result,
 16605 | .encounter-modal .empty-state.compact {
 16606 |   border-color: rgba(207, 228, 247, 0.3);
 16607 |   background: rgba(255, 255, 255, 0.08);
 16608 |   color: #f8fbff;
 16609 | }
 16610 | 
```


#### Hit 8 — line 16596

```text
 16578 |   overflow: auto;
 16579 |   border: 1px solid color-mix(in srgb, var(--brand) 46%, #ffffff);
 16580 |   border-radius: 8px;
 16581 |   background: color-mix(in srgb, #071827 86%, var(--surface));
 16582 |   color: #f8fbff;
 16583 |   box-shadow: 0 24px 70px rgba(0, 0, 0, 0.32);
 16584 |   padding: 16px;
 16585 | }
 16586 | 
 16587 | .encounter-modal .eyebrow,
 16588 | .encounter-modal h2,
 16589 | .encounter-modal h3,
 16590 | .encounter-modal strong,
 16591 | .encounter-modal label,
 16592 | .encounter-modal .wheel-latest-result {
 16593 |   color: #f8fbff;
 16594 | }
 16595 | 
 16596 | .encounter-modal span,
 16597 | .encounter-modal .gc-rule-note,
 16598 | .encounter-modal .empty-state,
 16599 | .encounter-modal .wheel-meta span {
 16600 |   color: #cfe4f7;
 16601 | }
 16602 | 
 16603 | .encounter-modal .wheel-meta > div,
 16604 | .encounter-modal .wheel-latest-result,
 16605 | .encounter-modal .empty-state.compact {
 16606 |   border-color: rgba(207, 228, 247, 0.3);
 16607 |   background: rgba(255, 255, 255, 0.08);
 16608 |   color: #f8fbff;
 16609 | }
 16610 | 
 16611 | .encounter-layout {
 16612 |   display: grid;
 16613 |   grid-template-columns: minmax(280px, 420px) minmax(0, 1fr);
 16614 |   gap: 16px;
```


#### Hit 9 — line 16597

```text
 16579 |   border: 1px solid color-mix(in srgb, var(--brand) 46%, #ffffff);
 16580 |   border-radius: 8px;
 16581 |   background: color-mix(in srgb, #071827 86%, var(--surface));
 16582 |   color: #f8fbff;
 16583 |   box-shadow: 0 24px 70px rgba(0, 0, 0, 0.32);
 16584 |   padding: 16px;
 16585 | }
 16586 | 
 16587 | .encounter-modal .eyebrow,
 16588 | .encounter-modal h2,
 16589 | .encounter-modal h3,
 16590 | .encounter-modal strong,
 16591 | .encounter-modal label,
 16592 | .encounter-modal .wheel-latest-result {
 16593 |   color: #f8fbff;
 16594 | }
 16595 | 
 16596 | .encounter-modal span,
 16597 | .encounter-modal .gc-rule-note,
 16598 | .encounter-modal .empty-state,
 16599 | .encounter-modal .wheel-meta span {
 16600 |   color: #cfe4f7;
 16601 | }
 16602 | 
 16603 | .encounter-modal .wheel-meta > div,
 16604 | .encounter-modal .wheel-latest-result,
 16605 | .encounter-modal .empty-state.compact {
 16606 |   border-color: rgba(207, 228, 247, 0.3);
 16607 |   background: rgba(255, 255, 255, 0.08);
 16608 |   color: #f8fbff;
 16609 | }
 16610 | 
 16611 | .encounter-layout {
 16612 |   display: grid;
 16613 |   grid-template-columns: minmax(280px, 420px) minmax(0, 1fr);
 16614 |   gap: 16px;
 16615 |   align-items: start;
```


#### Hit 10 — line 16598

```text
 16580 |   border-radius: 8px;
 16581 |   background: color-mix(in srgb, #071827 86%, var(--surface));
 16582 |   color: #f8fbff;
 16583 |   box-shadow: 0 24px 70px rgba(0, 0, 0, 0.32);
 16584 |   padding: 16px;
 16585 | }
 16586 | 
 16587 | .encounter-modal .eyebrow,
 16588 | .encounter-modal h2,
 16589 | .encounter-modal h3,
 16590 | .encounter-modal strong,
 16591 | .encounter-modal label,
 16592 | .encounter-modal .wheel-latest-result {
 16593 |   color: #f8fbff;
 16594 | }
 16595 | 
 16596 | .encounter-modal span,
 16597 | .encounter-modal .gc-rule-note,
 16598 | .encounter-modal .empty-state,
 16599 | .encounter-modal .wheel-meta span {
 16600 |   color: #cfe4f7;
 16601 | }
 16602 | 
 16603 | .encounter-modal .wheel-meta > div,
 16604 | .encounter-modal .wheel-latest-result,
 16605 | .encounter-modal .empty-state.compact {
 16606 |   border-color: rgba(207, 228, 247, 0.3);
 16607 |   background: rgba(255, 255, 255, 0.08);
 16608 |   color: #f8fbff;
 16609 | }
 16610 | 
 16611 | .encounter-layout {
 16612 |   display: grid;
 16613 |   grid-template-columns: minmax(280px, 420px) minmax(0, 1fr);
 16614 |   gap: 16px;
 16615 |   align-items: start;
 16616 | }
```


#### Hit 11 — line 16599

```text
 16581 |   background: color-mix(in srgb, #071827 86%, var(--surface));
 16582 |   color: #f8fbff;
 16583 |   box-shadow: 0 24px 70px rgba(0, 0, 0, 0.32);
 16584 |   padding: 16px;
 16585 | }
 16586 | 
 16587 | .encounter-modal .eyebrow,
 16588 | .encounter-modal h2,
 16589 | .encounter-modal h3,
 16590 | .encounter-modal strong,
 16591 | .encounter-modal label,
 16592 | .encounter-modal .wheel-latest-result {
 16593 |   color: #f8fbff;
 16594 | }
 16595 | 
 16596 | .encounter-modal span,
 16597 | .encounter-modal .gc-rule-note,
 16598 | .encounter-modal .empty-state,
 16599 | .encounter-modal .wheel-meta span {
 16600 |   color: #cfe4f7;
 16601 | }
 16602 | 
 16603 | .encounter-modal .wheel-meta > div,
 16604 | .encounter-modal .wheel-latest-result,
 16605 | .encounter-modal .empty-state.compact {
 16606 |   border-color: rgba(207, 228, 247, 0.3);
 16607 |   background: rgba(255, 255, 255, 0.08);
 16608 |   color: #f8fbff;
 16609 | }
 16610 | 
 16611 | .encounter-layout {
 16612 |   display: grid;
 16613 |   grid-template-columns: minmax(280px, 420px) minmax(0, 1fr);
 16614 |   gap: 16px;
 16615 |   align-items: start;
 16616 | }
 16617 | 
```


#### Hit 12 — line 16603

```text
 16585 | }
 16586 | 
 16587 | .encounter-modal .eyebrow,
 16588 | .encounter-modal h2,
 16589 | .encounter-modal h3,
 16590 | .encounter-modal strong,
 16591 | .encounter-modal label,
 16592 | .encounter-modal .wheel-latest-result {
 16593 |   color: #f8fbff;
 16594 | }
 16595 | 
 16596 | .encounter-modal span,
 16597 | .encounter-modal .gc-rule-note,
 16598 | .encounter-modal .empty-state,
 16599 | .encounter-modal .wheel-meta span {
 16600 |   color: #cfe4f7;
 16601 | }
 16602 | 
 16603 | .encounter-modal .wheel-meta > div,
 16604 | .encounter-modal .wheel-latest-result,
 16605 | .encounter-modal .empty-state.compact {
 16606 |   border-color: rgba(207, 228, 247, 0.3);
 16607 |   background: rgba(255, 255, 255, 0.08);
 16608 |   color: #f8fbff;
 16609 | }
 16610 | 
 16611 | .encounter-layout {
 16612 |   display: grid;
 16613 |   grid-template-columns: minmax(280px, 420px) minmax(0, 1fr);
 16614 |   gap: 16px;
 16615 |   align-items: start;
 16616 | }
 16617 | 
 16618 | .encounter-wheel-section,
 16619 | .encounter-controls {
 16620 |   display: grid;
 16621 |   gap: 12px;
```


#### Hit 13 — line 16604

```text
 16586 | 
 16587 | .encounter-modal .eyebrow,
 16588 | .encounter-modal h2,
 16589 | .encounter-modal h3,
 16590 | .encounter-modal strong,
 16591 | .encounter-modal label,
 16592 | .encounter-modal .wheel-latest-result {
 16593 |   color: #f8fbff;
 16594 | }
 16595 | 
 16596 | .encounter-modal span,
 16597 | .encounter-modal .gc-rule-note,
 16598 | .encounter-modal .empty-state,
 16599 | .encounter-modal .wheel-meta span {
 16600 |   color: #cfe4f7;
 16601 | }
 16602 | 
 16603 | .encounter-modal .wheel-meta > div,
 16604 | .encounter-modal .wheel-latest-result,
 16605 | .encounter-modal .empty-state.compact {
 16606 |   border-color: rgba(207, 228, 247, 0.3);
 16607 |   background: rgba(255, 255, 255, 0.08);
 16608 |   color: #f8fbff;
 16609 | }
 16610 | 
 16611 | .encounter-layout {
 16612 |   display: grid;
 16613 |   grid-template-columns: minmax(280px, 420px) minmax(0, 1fr);
 16614 |   gap: 16px;
 16615 |   align-items: start;
 16616 | }
 16617 | 
 16618 | .encounter-wheel-section,
 16619 | .encounter-controls {
 16620 |   display: grid;
 16621 |   gap: 12px;
 16622 | }
```


#### Hit 14 — line 16605

```text
 16587 | .encounter-modal .eyebrow,
 16588 | .encounter-modal h2,
 16589 | .encounter-modal h3,
 16590 | .encounter-modal strong,
 16591 | .encounter-modal label,
 16592 | .encounter-modal .wheel-latest-result {
 16593 |   color: #f8fbff;
 16594 | }
 16595 | 
 16596 | .encounter-modal span,
 16597 | .encounter-modal .gc-rule-note,
 16598 | .encounter-modal .empty-state,
 16599 | .encounter-modal .wheel-meta span {
 16600 |   color: #cfe4f7;
 16601 | }
 16602 | 
 16603 | .encounter-modal .wheel-meta > div,
 16604 | .encounter-modal .wheel-latest-result,
 16605 | .encounter-modal .empty-state.compact {
 16606 |   border-color: rgba(207, 228, 247, 0.3);
 16607 |   background: rgba(255, 255, 255, 0.08);
 16608 |   color: #f8fbff;
 16609 | }
 16610 | 
 16611 | .encounter-layout {
 16612 |   display: grid;
 16613 |   grid-template-columns: minmax(280px, 420px) minmax(0, 1fr);
 16614 |   gap: 16px;
 16615 |   align-items: start;
 16616 | }
 16617 | 
 16618 | .encounter-wheel-section,
 16619 | .encounter-controls {
 16620 |   display: grid;
 16621 |   gap: 12px;
 16622 | }
 16623 | 
```


### .encounter-wheel

Occurrences: 3

#### Hit 1 — line 16618

```text
 16600 |   color: #cfe4f7;
 16601 | }
 16602 | 
 16603 | .encounter-modal .wheel-meta > div,
 16604 | .encounter-modal .wheel-latest-result,
 16605 | .encounter-modal .empty-state.compact {
 16606 |   border-color: rgba(207, 228, 247, 0.3);
 16607 |   background: rgba(255, 255, 255, 0.08);
 16608 |   color: #f8fbff;
 16609 | }
 16610 | 
 16611 | .encounter-layout {
 16612 |   display: grid;
 16613 |   grid-template-columns: minmax(280px, 420px) minmax(0, 1fr);
 16614 |   gap: 16px;
 16615 |   align-items: start;
 16616 | }
 16617 | 
 16618 | .encounter-wheel-section,
 16619 | .encounter-controls {
 16620 |   display: grid;
 16621 |   gap: 12px;
 16622 | }
 16623 | 
 16624 | .encounter-wheel-visual {
 16625 |   width: min(390px, 70vw);
 16626 |   height: min(390px, 70vw);
 16627 |   aspect-ratio: 1 / 1;
 16628 |   justify-self: center;
 16629 | }
 16630 | 
 16631 | .encounter-wheel-face span {
 16632 |   display: none;
 16633 | }
 16634 | 
 16635 | .encounter-live-result {
 16636 |   display: grid;
```


#### Hit 2 — line 16624

```text
 16606 |   border-color: rgba(207, 228, 247, 0.3);
 16607 |   background: rgba(255, 255, 255, 0.08);
 16608 |   color: #f8fbff;
 16609 | }
 16610 | 
 16611 | .encounter-layout {
 16612 |   display: grid;
 16613 |   grid-template-columns: minmax(280px, 420px) minmax(0, 1fr);
 16614 |   gap: 16px;
 16615 |   align-items: start;
 16616 | }
 16617 | 
 16618 | .encounter-wheel-section,
 16619 | .encounter-controls {
 16620 |   display: grid;
 16621 |   gap: 12px;
 16622 | }
 16623 | 
 16624 | .encounter-wheel-visual {
 16625 |   width: min(390px, 70vw);
 16626 |   height: min(390px, 70vw);
 16627 |   aspect-ratio: 1 / 1;
 16628 |   justify-self: center;
 16629 | }
 16630 | 
 16631 | .encounter-wheel-face span {
 16632 |   display: none;
 16633 | }
 16634 | 
 16635 | .encounter-live-result {
 16636 |   display: grid;
 16637 |   gap: 2px;
 16638 |   text-align: center;
 16639 | }
 16640 | 
 16641 | .encounter-live-result span,
 16642 | .encounter-live-result em {
```


#### Hit 3 — line 16631

```text
 16613 |   grid-template-columns: minmax(280px, 420px) minmax(0, 1fr);
 16614 |   gap: 16px;
 16615 |   align-items: start;
 16616 | }
 16617 | 
 16618 | .encounter-wheel-section,
 16619 | .encounter-controls {
 16620 |   display: grid;
 16621 |   gap: 12px;
 16622 | }
 16623 | 
 16624 | .encounter-wheel-visual {
 16625 |   width: min(390px, 70vw);
 16626 |   height: min(390px, 70vw);
 16627 |   aspect-ratio: 1 / 1;
 16628 |   justify-self: center;
 16629 | }
 16630 | 
 16631 | .encounter-wheel-face span {
 16632 |   display: none;
 16633 | }
 16634 | 
 16635 | .encounter-live-result {
 16636 |   display: grid;
 16637 |   gap: 2px;
 16638 |   text-align: center;
 16639 | }
 16640 | 
 16641 | .encounter-live-result span,
 16642 | .encounter-live-result em {
 16643 |   color: #cfe4f7;
 16644 |   font-size: 12px;
 16645 |   font-style: normal;
 16646 |   font-weight: 900;
 16647 |   letter-spacing: 0;
 16648 | }
 16649 | 
```


### fishing

Occurrences: 0

### surf

Occurrences: 30+

#### Hit 1 — line 4

```text
     1 | :root {
     2 |   color-scheme: light;
     3 |   --bg: #f1f4f3;
     4 |   --surface: #fbfcfb;
     5 |   --surface-2: #e8eeee;
     6 |   --ink: #1c2321;
     7 |   --muted: #66706b;
     8 |   --line: #cdd8d5;
     9 |   --brand: #0f766e;
    10 |   --brand-dark: #115e59;
    11 |   --accent-2: #a15c10;
    12 |   --on-brand: #ffffff;
    13 |   --on-accent-2: #ffffff;
    14 |   --gold: #a15c10;
    15 |   --success: #138a4b;
    16 |   --warning: #b26b00;
    17 |   --info: #2878a8;
    18 |   --danger: #a23d3d;
    19 |   --result-bg: #17372c;
    20 |   --result-ink: #f1fff8;
    21 |   --result-border: #54d49a;
    22 |   --shadow-soft: 0 10px 28px rgba(28, 35, 33, 0.12);
```


#### Hit 2 — line 5

```text
     1 | :root {
     2 |   color-scheme: light;
     3 |   --bg: #f1f4f3;
     4 |   --surface: #fbfcfb;
     5 |   --surface-2: #e8eeee;
     6 |   --ink: #1c2321;
     7 |   --muted: #66706b;
     8 |   --line: #cdd8d5;
     9 |   --brand: #0f766e;
    10 |   --brand-dark: #115e59;
    11 |   --accent-2: #a15c10;
    12 |   --on-brand: #ffffff;
    13 |   --on-accent-2: #ffffff;
    14 |   --gold: #a15c10;
    15 |   --success: #138a4b;
    16 |   --warning: #b26b00;
    17 |   --info: #2878a8;
    18 |   --danger: #a23d3d;
    19 |   --result-bg: #17372c;
    20 |   --result-ink: #f1fff8;
    21 |   --result-border: #54d49a;
    22 |   --shadow-soft: 0 10px 28px rgba(28, 35, 33, 0.12);
    23 |   --shadow-strong: 0 18px 46px rgba(28, 35, 33, 0.2);
```


#### Hit 3 — line 25

```text
     7 |   --muted: #66706b;
     8 |   --line: #cdd8d5;
     9 |   --brand: #0f766e;
    10 |   --brand-dark: #115e59;
    11 |   --accent-2: #a15c10;
    12 |   --on-brand: #ffffff;
    13 |   --on-accent-2: #ffffff;
    14 |   --gold: #a15c10;
    15 |   --success: #138a4b;
    16 |   --warning: #b26b00;
    17 |   --info: #2878a8;
    18 |   --danger: #a23d3d;
    19 |   --result-bg: #17372c;
    20 |   --result-ink: #f1fff8;
    21 |   --result-border: #54d49a;
    22 |   --shadow-soft: 0 10px 28px rgba(28, 35, 33, 0.12);
    23 |   --shadow-strong: 0 18px 46px rgba(28, 35, 33, 0.2);
    24 |   --edge-highlight: rgba(255, 255, 255, 0.72);
    25 |   --header-bg: var(--surface);
    26 |   --header-sub-bg: var(--surface-2);
    27 |   --header-ink: var(--ink);
    28 |   --header-muted: var(--muted);
    29 |   --header-line: var(--line);
    30 |   --header-accent: var(--brand);
    31 |   --header-chip-bg: var(--header-sub-bg);
    32 |   --header-chip-ink: var(--header-ink);
    33 |   --header-chip-line: var(--header-line);
    34 |   --header-control-bg: var(--header-bg);
    35 |   --header-control-ink: var(--header-ink);
    36 |   --header-control-line: var(--header-line);
    37 |   --contrast-surface: var(--surface-2);
    38 |   --contrast-surface-ink: var(--ink);
    39 |   --contrast-surface-muted: var(--muted);
    40 |   --contrast-surface-line: var(--line);
    41 |   --shop-page-bg: color-mix(in srgb, var(--bg) 84%, var(--brand) 16%);
    42 |   --shop-panel-bg: color-mix(in srgb, var(--surface) 88%, var(--brand) 12%);
    43 |   --shop-panel-bg-strong: color-mix(in srgb, var(--surface) 82%, var(--brand) 18%);
```


#### Hit 4 — line 26

```text
     8 |   --line: #cdd8d5;
     9 |   --brand: #0f766e;
    10 |   --brand-dark: #115e59;
    11 |   --accent-2: #a15c10;
    12 |   --on-brand: #ffffff;
    13 |   --on-accent-2: #ffffff;
    14 |   --gold: #a15c10;
    15 |   --success: #138a4b;
    16 |   --warning: #b26b00;
    17 |   --info: #2878a8;
    18 |   --danger: #a23d3d;
    19 |   --result-bg: #17372c;
    20 |   --result-ink: #f1fff8;
    21 |   --result-border: #54d49a;
    22 |   --shadow-soft: 0 10px 28px rgba(28, 35, 33, 0.12);
    23 |   --shadow-strong: 0 18px 46px rgba(28, 35, 33, 0.2);
    24 |   --edge-highlight: rgba(255, 255, 255, 0.72);
    25 |   --header-bg: var(--surface);
    26 |   --header-sub-bg: var(--surface-2);
    27 |   --header-ink: var(--ink);
    28 |   --header-muted: var(--muted);
    29 |   --header-line: var(--line);
    30 |   --header-accent: var(--brand);
    31 |   --header-chip-bg: var(--header-sub-bg);
    32 |   --header-chip-ink: var(--header-ink);
    33 |   --header-chip-line: var(--header-line);
    34 |   --header-control-bg: var(--header-bg);
    35 |   --header-control-ink: var(--header-ink);
    36 |   --header-control-line: var(--header-line);
    37 |   --contrast-surface: var(--surface-2);
    38 |   --contrast-surface-ink: var(--ink);
    39 |   --contrast-surface-muted: var(--muted);
    40 |   --contrast-surface-line: var(--line);
    41 |   --shop-page-bg: color-mix(in srgb, var(--bg) 84%, var(--brand) 16%);
    42 |   --shop-panel-bg: color-mix(in srgb, var(--surface) 88%, var(--brand) 12%);
    43 |   --shop-panel-bg-strong: color-mix(in srgb, var(--surface) 82%, var(--brand) 18%);
    44 |   --shop-section-header-bg: color-mix(in srgb, var(--surface) 84%, var(--brand) 16%);
```


#### Hit 5 — line 37

```text
    19 |   --result-bg: #17372c;
    20 |   --result-ink: #f1fff8;
    21 |   --result-border: #54d49a;
    22 |   --shadow-soft: 0 10px 28px rgba(28, 35, 33, 0.12);
    23 |   --shadow-strong: 0 18px 46px rgba(28, 35, 33, 0.2);
    24 |   --edge-highlight: rgba(255, 255, 255, 0.72);
    25 |   --header-bg: var(--surface);
    26 |   --header-sub-bg: var(--surface-2);
    27 |   --header-ink: var(--ink);
    28 |   --header-muted: var(--muted);
    29 |   --header-line: var(--line);
    30 |   --header-accent: var(--brand);
    31 |   --header-chip-bg: var(--header-sub-bg);
    32 |   --header-chip-ink: var(--header-ink);
    33 |   --header-chip-line: var(--header-line);
    34 |   --header-control-bg: var(--header-bg);
    35 |   --header-control-ink: var(--header-ink);
    36 |   --header-control-line: var(--header-line);
    37 |   --contrast-surface: var(--surface-2);
    38 |   --contrast-surface-ink: var(--ink);
    39 |   --contrast-surface-muted: var(--muted);
    40 |   --contrast-surface-line: var(--line);
    41 |   --shop-page-bg: color-mix(in srgb, var(--bg) 84%, var(--brand) 16%);
    42 |   --shop-panel-bg: color-mix(in srgb, var(--surface) 88%, var(--brand) 12%);
    43 |   --shop-panel-bg-strong: color-mix(in srgb, var(--surface) 82%, var(--brand) 18%);
    44 |   --shop-section-header-bg: color-mix(in srgb, var(--surface) 84%, var(--brand) 16%);
    45 |   --shop-card-bg: color-mix(in srgb, var(--surface) 92%, var(--contrast-surface) 8%);
    46 |   --shop-card-bg-accent: color-mix(in srgb, var(--surface) 86%, var(--brand) 14%);
    47 |   --shop-input-bg: color-mix(in srgb, var(--surface) 92%, var(--brand) 8%);
    48 |   --shop-border: color-mix(in srgb, var(--line) 82%, transparent);
    49 |   --shop-border-hover: color-mix(in srgb, var(--brand) 70%, var(--line));
    50 |   --shop-primary: var(--brand);
    51 |   --shop-primary-ink: var(--on-brand);
    52 |   --shop-secondary: color-mix(in srgb, var(--contrast-surface) 88%, var(--surface));
    53 |   --shop-secondary-border: var(--shop-border);
    54 |   --shop-secondary-ink: var(--contrast-surface-ink);
    55 |   --shop-text: var(--ink);
```


#### Hit 6 — line 37

```text
    19 |   --result-bg: #17372c;
    20 |   --result-ink: #f1fff8;
    21 |   --result-border: #54d49a;
    22 |   --shadow-soft: 0 10px 28px rgba(28, 35, 33, 0.12);
    23 |   --shadow-strong: 0 18px 46px rgba(28, 35, 33, 0.2);
    24 |   --edge-highlight: rgba(255, 255, 255, 0.72);
    25 |   --header-bg: var(--surface);
    26 |   --header-sub-bg: var(--surface-2);
    27 |   --header-ink: var(--ink);
    28 |   --header-muted: var(--muted);
    29 |   --header-line: var(--line);
    30 |   --header-accent: var(--brand);
    31 |   --header-chip-bg: var(--header-sub-bg);
    32 |   --header-chip-ink: var(--header-ink);
    33 |   --header-chip-line: var(--header-line);
    34 |   --header-control-bg: var(--header-bg);
    35 |   --header-control-ink: var(--header-ink);
    36 |   --header-control-line: var(--header-line);
    37 |   --contrast-surface: var(--surface-2);
    38 |   --contrast-surface-ink: var(--ink);
    39 |   --contrast-surface-muted: var(--muted);
    40 |   --contrast-surface-line: var(--line);
    41 |   --shop-page-bg: color-mix(in srgb, var(--bg) 84%, var(--brand) 16%);
    42 |   --shop-panel-bg: color-mix(in srgb, var(--surface) 88%, var(--brand) 12%);
    43 |   --shop-panel-bg-strong: color-mix(in srgb, var(--surface) 82%, var(--brand) 18%);
    44 |   --shop-section-header-bg: color-mix(in srgb, var(--surface) 84%, var(--brand) 16%);
    45 |   --shop-card-bg: color-mix(in srgb, var(--surface) 92%, var(--contrast-surface) 8%);
    46 |   --shop-card-bg-accent: color-mix(in srgb, var(--surface) 86%, var(--brand) 14%);
    47 |   --shop-input-bg: color-mix(in srgb, var(--surface) 92%, var(--brand) 8%);
    48 |   --shop-border: color-mix(in srgb, var(--line) 82%, transparent);
    49 |   --shop-border-hover: color-mix(in srgb, var(--brand) 70%, var(--line));
    50 |   --shop-primary: var(--brand);
    51 |   --shop-primary-ink: var(--on-brand);
    52 |   --shop-secondary: color-mix(in srgb, var(--contrast-surface) 88%, var(--surface));
    53 |   --shop-secondary-border: var(--shop-border);
    54 |   --shop-secondary-ink: var(--contrast-surface-ink);
    55 |   --shop-text: var(--ink);
```


#### Hit 7 — line 38

```text
    20 |   --result-ink: #f1fff8;
    21 |   --result-border: #54d49a;
    22 |   --shadow-soft: 0 10px 28px rgba(28, 35, 33, 0.12);
    23 |   --shadow-strong: 0 18px 46px rgba(28, 35, 33, 0.2);
    24 |   --edge-highlight: rgba(255, 255, 255, 0.72);
    25 |   --header-bg: var(--surface);
    26 |   --header-sub-bg: var(--surface-2);
    27 |   --header-ink: var(--ink);
    28 |   --header-muted: var(--muted);
    29 |   --header-line: var(--line);
    30 |   --header-accent: var(--brand);
    31 |   --header-chip-bg: var(--header-sub-bg);
    32 |   --header-chip-ink: var(--header-ink);
    33 |   --header-chip-line: var(--header-line);
    34 |   --header-control-bg: var(--header-bg);
    35 |   --header-control-ink: var(--header-ink);
    36 |   --header-control-line: var(--header-line);
    37 |   --contrast-surface: var(--surface-2);
    38 |   --contrast-surface-ink: var(--ink);
    39 |   --contrast-surface-muted: var(--muted);
    40 |   --contrast-surface-line: var(--line);
    41 |   --shop-page-bg: color-mix(in srgb, var(--bg) 84%, var(--brand) 16%);
    42 |   --shop-panel-bg: color-mix(in srgb, var(--surface) 88%, var(--brand) 12%);
    43 |   --shop-panel-bg-strong: color-mix(in srgb, var(--surface) 82%, var(--brand) 18%);
    44 |   --shop-section-header-bg: color-mix(in srgb, var(--surface) 84%, var(--brand) 16%);
    45 |   --shop-card-bg: color-mix(in srgb, var(--surface) 92%, var(--contrast-surface) 8%);
    46 |   --shop-card-bg-accent: color-mix(in srgb, var(--surface) 86%, var(--brand) 14%);
    47 |   --shop-input-bg: color-mix(in srgb, var(--surface) 92%, var(--brand) 8%);
    48 |   --shop-border: color-mix(in srgb, var(--line) 82%, transparent);
    49 |   --shop-border-hover: color-mix(in srgb, var(--brand) 70%, var(--line));
    50 |   --shop-primary: var(--brand);
    51 |   --shop-primary-ink: var(--on-brand);
    52 |   --shop-secondary: color-mix(in srgb, var(--contrast-surface) 88%, var(--surface));
    53 |   --shop-secondary-border: var(--shop-border);
    54 |   --shop-secondary-ink: var(--contrast-surface-ink);
    55 |   --shop-text: var(--ink);
    56 |   --shop-muted: var(--muted);
```


#### Hit 8 — line 39

```text
    21 |   --result-border: #54d49a;
    22 |   --shadow-soft: 0 10px 28px rgba(28, 35, 33, 0.12);
    23 |   --shadow-strong: 0 18px 46px rgba(28, 35, 33, 0.2);
    24 |   --edge-highlight: rgba(255, 255, 255, 0.72);
    25 |   --header-bg: var(--surface);
    26 |   --header-sub-bg: var(--surface-2);
    27 |   --header-ink: var(--ink);
    28 |   --header-muted: var(--muted);
    29 |   --header-line: var(--line);
    30 |   --header-accent: var(--brand);
    31 |   --header-chip-bg: var(--header-sub-bg);
    32 |   --header-chip-ink: var(--header-ink);
    33 |   --header-chip-line: var(--header-line);
    34 |   --header-control-bg: var(--header-bg);
    35 |   --header-control-ink: var(--header-ink);
    36 |   --header-control-line: var(--header-line);
    37 |   --contrast-surface: var(--surface-2);
    38 |   --contrast-surface-ink: var(--ink);
    39 |   --contrast-surface-muted: var(--muted);
    40 |   --contrast-surface-line: var(--line);
    41 |   --shop-page-bg: color-mix(in srgb, var(--bg) 84%, var(--brand) 16%);
    42 |   --shop-panel-bg: color-mix(in srgb, var(--surface) 88%, var(--brand) 12%);
    43 |   --shop-panel-bg-strong: color-mix(in srgb, var(--surface) 82%, var(--brand) 18%);
    44 |   --shop-section-header-bg: color-mix(in srgb, var(--surface) 84%, var(--brand) 16%);
    45 |   --shop-card-bg: color-mix(in srgb, var(--surface) 92%, var(--contrast-surface) 8%);
    46 |   --shop-card-bg-accent: color-mix(in srgb, var(--surface) 86%, var(--brand) 14%);
    47 |   --shop-input-bg: color-mix(in srgb, var(--surface) 92%, var(--brand) 8%);
    48 |   --shop-border: color-mix(in srgb, var(--line) 82%, transparent);
    49 |   --shop-border-hover: color-mix(in srgb, var(--brand) 70%, var(--line));
    50 |   --shop-primary: var(--brand);
    51 |   --shop-primary-ink: var(--on-brand);
    52 |   --shop-secondary: color-mix(in srgb, var(--contrast-surface) 88%, var(--surface));
    53 |   --shop-secondary-border: var(--shop-border);
    54 |   --shop-secondary-ink: var(--contrast-surface-ink);
    55 |   --shop-text: var(--ink);
    56 |   --shop-muted: var(--muted);
    57 |   --shop-token-ring: color-mix(in srgb, var(--brand) 65%, var(--line));
```


#### Hit 9 — line 40

```text
    22 |   --shadow-soft: 0 10px 28px rgba(28, 35, 33, 0.12);
    23 |   --shadow-strong: 0 18px 46px rgba(28, 35, 33, 0.2);
    24 |   --edge-highlight: rgba(255, 255, 255, 0.72);
    25 |   --header-bg: var(--surface);
    26 |   --header-sub-bg: var(--surface-2);
    27 |   --header-ink: var(--ink);
    28 |   --header-muted: var(--muted);
    29 |   --header-line: var(--line);
    30 |   --header-accent: var(--brand);
    31 |   --header-chip-bg: var(--header-sub-bg);
    32 |   --header-chip-ink: var(--header-ink);
    33 |   --header-chip-line: var(--header-line);
    34 |   --header-control-bg: var(--header-bg);
    35 |   --header-control-ink: var(--header-ink);
    36 |   --header-control-line: var(--header-line);
    37 |   --contrast-surface: var(--surface-2);
    38 |   --contrast-surface-ink: var(--ink);
    39 |   --contrast-surface-muted: var(--muted);
    40 |   --contrast-surface-line: var(--line);
    41 |   --shop-page-bg: color-mix(in srgb, var(--bg) 84%, var(--brand) 16%);
    42 |   --shop-panel-bg: color-mix(in srgb, var(--surface) 88%, var(--brand) 12%);
    43 |   --shop-panel-bg-strong: color-mix(in srgb, var(--surface) 82%, var(--brand) 18%);
    44 |   --shop-section-header-bg: color-mix(in srgb, var(--surface) 84%, var(--brand) 16%);
    45 |   --shop-card-bg: color-mix(in srgb, var(--surface) 92%, var(--contrast-surface) 8%);
    46 |   --shop-card-bg-accent: color-mix(in srgb, var(--surface) 86%, var(--brand) 14%);
    47 |   --shop-input-bg: color-mix(in srgb, var(--surface) 92%, var(--brand) 8%);
    48 |   --shop-border: color-mix(in srgb, var(--line) 82%, transparent);
    49 |   --shop-border-hover: color-mix(in srgb, var(--brand) 70%, var(--line));
    50 |   --shop-primary: var(--brand);
    51 |   --shop-primary-ink: var(--on-brand);
    52 |   --shop-secondary: color-mix(in srgb, var(--contrast-surface) 88%, var(--surface));
    53 |   --shop-secondary-border: var(--shop-border);
    54 |   --shop-secondary-ink: var(--contrast-surface-ink);
    55 |   --shop-text: var(--ink);
    56 |   --shop-muted: var(--muted);
    57 |   --shop-token-ring: color-mix(in srgb, var(--brand) 65%, var(--line));
    58 |   --shop-token-ring-muted: color-mix(in srgb, var(--line) 64%, var(--brand) 36%);
```


#### Hit 10 — line 42

```text
    24 |   --edge-highlight: rgba(255, 255, 255, 0.72);
    25 |   --header-bg: var(--surface);
    26 |   --header-sub-bg: var(--surface-2);
    27 |   --header-ink: var(--ink);
    28 |   --header-muted: var(--muted);
    29 |   --header-line: var(--line);
    30 |   --header-accent: var(--brand);
    31 |   --header-chip-bg: var(--header-sub-bg);
    32 |   --header-chip-ink: var(--header-ink);
    33 |   --header-chip-line: var(--header-line);
    34 |   --header-control-bg: var(--header-bg);
    35 |   --header-control-ink: var(--header-ink);
    36 |   --header-control-line: var(--header-line);
    37 |   --contrast-surface: var(--surface-2);
    38 |   --contrast-surface-ink: var(--ink);
    39 |   --contrast-surface-muted: var(--muted);
    40 |   --contrast-surface-line: var(--line);
    41 |   --shop-page-bg: color-mix(in srgb, var(--bg) 84%, var(--brand) 16%);
    42 |   --shop-panel-bg: color-mix(in srgb, var(--surface) 88%, var(--brand) 12%);
    43 |   --shop-panel-bg-strong: color-mix(in srgb, var(--surface) 82%, var(--brand) 18%);
    44 |   --shop-section-header-bg: color-mix(in srgb, var(--surface) 84%, var(--brand) 16%);
    45 |   --shop-card-bg: color-mix(in srgb, var(--surface) 92%, var(--contrast-surface) 8%);
    46 |   --shop-card-bg-accent: color-mix(in srgb, var(--surface) 86%, var(--brand) 14%);
    47 |   --shop-input-bg: color-mix(in srgb, var(--surface) 92%, var(--brand) 8%);
    48 |   --shop-border: color-mix(in srgb, var(--line) 82%, transparent);
    49 |   --shop-border-hover: color-mix(in srgb, var(--brand) 70%, var(--line));
    50 |   --shop-primary: var(--brand);
    51 |   --shop-primary-ink: var(--on-brand);
    52 |   --shop-secondary: color-mix(in srgb, var(--contrast-surface) 88%, var(--surface));
    53 |   --shop-secondary-border: var(--shop-border);
    54 |   --shop-secondary-ink: var(--contrast-surface-ink);
    55 |   --shop-text: var(--ink);
    56 |   --shop-muted: var(--muted);
    57 |   --shop-token-ring: color-mix(in srgb, var(--brand) 65%, var(--line));
    58 |   --shop-token-ring-muted: color-mix(in srgb, var(--line) 64%, var(--brand) 36%);
    59 |   --shop-token-surface: color-mix(in srgb, var(--surface) 88%, var(--brand) 12%);
    60 |   --shop-token-price-bg: color-mix(in srgb, var(--surface) 82%, var(--brand) 18%);
```


#### Hit 11 — line 43

```text
    25 |   --header-bg: var(--surface);
    26 |   --header-sub-bg: var(--surface-2);
    27 |   --header-ink: var(--ink);
    28 |   --header-muted: var(--muted);
    29 |   --header-line: var(--line);
    30 |   --header-accent: var(--brand);
    31 |   --header-chip-bg: var(--header-sub-bg);
    32 |   --header-chip-ink: var(--header-ink);
    33 |   --header-chip-line: var(--header-line);
    34 |   --header-control-bg: var(--header-bg);
    35 |   --header-control-ink: var(--header-ink);
    36 |   --header-control-line: var(--header-line);
    37 |   --contrast-surface: var(--surface-2);
    38 |   --contrast-surface-ink: var(--ink);
    39 |   --contrast-surface-muted: var(--muted);
    40 |   --contrast-surface-line: var(--line);
    41 |   --shop-page-bg: color-mix(in srgb, var(--bg) 84%, var(--brand) 16%);
    42 |   --shop-panel-bg: color-mix(in srgb, var(--surface) 88%, var(--brand) 12%);
    43 |   --shop-panel-bg-strong: color-mix(in srgb, var(--surface) 82%, var(--brand) 18%);
    44 |   --shop-section-header-bg: color-mix(in srgb, var(--surface) 84%, var(--brand) 16%);
    45 |   --shop-card-bg: color-mix(in srgb, var(--surface) 92%, var(--contrast-surface) 8%);
    46 |   --shop-card-bg-accent: color-mix(in srgb, var(--surface) 86%, var(--brand) 14%);
    47 |   --shop-input-bg: color-mix(in srgb, var(--surface) 92%, var(--brand) 8%);
    48 |   --shop-border: color-mix(in srgb, var(--line) 82%, transparent);
    49 |   --shop-border-hover: color-mix(in srgb, var(--brand) 70%, var(--line));
    50 |   --shop-primary: var(--brand);
    51 |   --shop-primary-ink: var(--on-brand);
    52 |   --shop-secondary: color-mix(in srgb, var(--contrast-surface) 88%, var(--surface));
    53 |   --shop-secondary-border: var(--shop-border);
    54 |   --shop-secondary-ink: var(--contrast-surface-ink);
    55 |   --shop-text: var(--ink);
    56 |   --shop-muted: var(--muted);
    57 |   --shop-token-ring: color-mix(in srgb, var(--brand) 65%, var(--line));
    58 |   --shop-token-ring-muted: color-mix(in srgb, var(--line) 64%, var(--brand) 36%);
    59 |   --shop-token-surface: color-mix(in srgb, var(--surface) 88%, var(--brand) 12%);
    60 |   --shop-token-price-bg: color-mix(in srgb, var(--surface) 82%, var(--brand) 18%);
    61 |   --shop-token-action-bg: var(--shop-primary);
```


#### Hit 12 — line 44

```text
    26 |   --header-sub-bg: var(--surface-2);
    27 |   --header-ink: var(--ink);
    28 |   --header-muted: var(--muted);
    29 |   --header-line: var(--line);
    30 |   --header-accent: var(--brand);
    31 |   --header-chip-bg: var(--header-sub-bg);
    32 |   --header-chip-ink: var(--header-ink);
    33 |   --header-chip-line: var(--header-line);
    34 |   --header-control-bg: var(--header-bg);
    35 |   --header-control-ink: var(--header-ink);
    36 |   --header-control-line: var(--header-line);
    37 |   --contrast-surface: var(--surface-2);
    38 |   --contrast-surface-ink: var(--ink);
    39 |   --contrast-surface-muted: var(--muted);
    40 |   --contrast-surface-line: var(--line);
    41 |   --shop-page-bg: color-mix(in srgb, var(--bg) 84%, var(--brand) 16%);
    42 |   --shop-panel-bg: color-mix(in srgb, var(--surface) 88%, var(--brand) 12%);
    43 |   --shop-panel-bg-strong: color-mix(in srgb, var(--surface) 82%, var(--brand) 18%);
    44 |   --shop-section-header-bg: color-mix(in srgb, var(--surface) 84%, var(--brand) 16%);
    45 |   --shop-card-bg: color-mix(in srgb, var(--surface) 92%, var(--contrast-surface) 8%);
    46 |   --shop-card-bg-accent: color-mix(in srgb, var(--surface) 86%, var(--brand) 14%);
    47 |   --shop-input-bg: color-mix(in srgb, var(--surface) 92%, var(--brand) 8%);
    48 |   --shop-border: color-mix(in srgb, var(--line) 82%, transparent);
    49 |   --shop-border-hover: color-mix(in srgb, var(--brand) 70%, var(--line));
    50 |   --shop-primary: var(--brand);
    51 |   --shop-primary-ink: var(--on-brand);
    52 |   --shop-secondary: color-mix(in srgb, var(--contrast-surface) 88%, var(--surface));
    53 |   --shop-secondary-border: var(--shop-border);
    54 |   --shop-secondary-ink: var(--contrast-surface-ink);
    55 |   --shop-text: var(--ink);
    56 |   --shop-muted: var(--muted);
    57 |   --shop-token-ring: color-mix(in srgb, var(--brand) 65%, var(--line));
    58 |   --shop-token-ring-muted: color-mix(in srgb, var(--line) 64%, var(--brand) 36%);
    59 |   --shop-token-surface: color-mix(in srgb, var(--surface) 88%, var(--brand) 12%);
    60 |   --shop-token-price-bg: color-mix(in srgb, var(--surface) 82%, var(--brand) 18%);
    61 |   --shop-token-action-bg: var(--shop-primary);
    62 |   --shop-token-action-border: color-mix(in srgb, var(--brand) 70%, var(--line));
```


#### Hit 13 — line 45

```text
    27 |   --header-ink: var(--ink);
    28 |   --header-muted: var(--muted);
    29 |   --header-line: var(--line);
    30 |   --header-accent: var(--brand);
    31 |   --header-chip-bg: var(--header-sub-bg);
    32 |   --header-chip-ink: var(--header-ink);
    33 |   --header-chip-line: var(--header-line);
    34 |   --header-control-bg: var(--header-bg);
    35 |   --header-control-ink: var(--header-ink);
    36 |   --header-control-line: var(--header-line);
    37 |   --contrast-surface: var(--surface-2);
    38 |   --contrast-surface-ink: var(--ink);
    39 |   --contrast-surface-muted: var(--muted);
    40 |   --contrast-surface-line: var(--line);
    41 |   --shop-page-bg: color-mix(in srgb, var(--bg) 84%, var(--brand) 16%);
    42 |   --shop-panel-bg: color-mix(in srgb, var(--surface) 88%, var(--brand) 12%);
    43 |   --shop-panel-bg-strong: color-mix(in srgb, var(--surface) 82%, var(--brand) 18%);
    44 |   --shop-section-header-bg: color-mix(in srgb, var(--surface) 84%, var(--brand) 16%);
    45 |   --shop-card-bg: color-mix(in srgb, var(--surface) 92%, var(--contrast-surface) 8%);
    46 |   --shop-card-bg-accent: color-mix(in srgb, var(--surface) 86%, var(--brand) 14%);
    47 |   --shop-input-bg: color-mix(in srgb, var(--surface) 92%, var(--brand) 8%);
    48 |   --shop-border: color-mix(in srgb, var(--line) 82%, transparent);
    49 |   --shop-border-hover: color-mix(in srgb, var(--brand) 70%, var(--line));
    50 |   --shop-primary: var(--brand);
    51 |   --shop-primary-ink: var(--on-brand);
    52 |   --shop-secondary: color-mix(in srgb, var(--contrast-surface) 88%, var(--surface));
    53 |   --shop-secondary-border: var(--shop-border);
    54 |   --shop-secondary-ink: var(--contrast-surface-ink);
    55 |   --shop-text: var(--ink);
    56 |   --shop-muted: var(--muted);
    57 |   --shop-token-ring: color-mix(in srgb, var(--brand) 65%, var(--line));
    58 |   --shop-token-ring-muted: color-mix(in srgb, var(--line) 64%, var(--brand) 36%);
    59 |   --shop-token-surface: color-mix(in srgb, var(--surface) 88%, var(--brand) 12%);
    60 |   --shop-token-price-bg: color-mix(in srgb, var(--surface) 82%, var(--brand) 18%);
    61 |   --shop-token-action-bg: var(--shop-primary);
    62 |   --shop-token-action-border: color-mix(in srgb, var(--brand) 70%, var(--line));
    63 |   --shop-token-glow: color-mix(in srgb, var(--brand) 24%, transparent);
```


#### Hit 14 — line 45

```text
    27 |   --header-ink: var(--ink);
    28 |   --header-muted: var(--muted);
    29 |   --header-line: var(--line);
    30 |   --header-accent: var(--brand);
    31 |   --header-chip-bg: var(--header-sub-bg);
    32 |   --header-chip-ink: var(--header-ink);
    33 |   --header-chip-line: var(--header-line);
    34 |   --header-control-bg: var(--header-bg);
    35 |   --header-control-ink: var(--header-ink);
    36 |   --header-control-line: var(--header-line);
    37 |   --contrast-surface: var(--surface-2);
    38 |   --contrast-surface-ink: var(--ink);
    39 |   --contrast-surface-muted: var(--muted);
    40 |   --contrast-surface-line: var(--line);
    41 |   --shop-page-bg: color-mix(in srgb, var(--bg) 84%, var(--brand) 16%);
    42 |   --shop-panel-bg: color-mix(in srgb, var(--surface) 88%, var(--brand) 12%);
    43 |   --shop-panel-bg-strong: color-mix(in srgb, var(--surface) 82%, var(--brand) 18%);
    44 |   --shop-section-header-bg: color-mix(in srgb, var(--surface) 84%, var(--brand) 16%);
    45 |   --shop-card-bg: color-mix(in srgb, var(--surface) 92%, var(--contrast-surface) 8%);
    46 |   --shop-card-bg-accent: color-mix(in srgb, var(--surface) 86%, var(--brand) 14%);
    47 |   --shop-input-bg: color-mix(in srgb, var(--surface) 92%, var(--brand) 8%);
    48 |   --shop-border: color-mix(in srgb, var(--line) 82%, transparent);
    49 |   --shop-border-hover: color-mix(in srgb, var(--brand) 70%, var(--line));
    50 |   --shop-primary: var(--brand);
    51 |   --shop-primary-ink: var(--on-brand);
    52 |   --shop-secondary: color-mix(in srgb, var(--contrast-surface) 88%, var(--surface));
    53 |   --shop-secondary-border: var(--shop-border);
    54 |   --shop-secondary-ink: var(--contrast-surface-ink);
    55 |   --shop-text: var(--ink);
    56 |   --shop-muted: var(--muted);
    57 |   --shop-token-ring: color-mix(in srgb, var(--brand) 65%, var(--line));
    58 |   --shop-token-ring-muted: color-mix(in srgb, var(--line) 64%, var(--brand) 36%);
    59 |   --shop-token-surface: color-mix(in srgb, var(--surface) 88%, var(--brand) 12%);
    60 |   --shop-token-price-bg: color-mix(in srgb, var(--surface) 82%, var(--brand) 18%);
    61 |   --shop-token-action-bg: var(--shop-primary);
    62 |   --shop-token-action-border: color-mix(in srgb, var(--brand) 70%, var(--line));
    63 |   --shop-token-glow: color-mix(in srgb, var(--brand) 24%, transparent);
```


#### Hit 15 — line 46

```text
    28 |   --header-muted: var(--muted);
    29 |   --header-line: var(--line);
    30 |   --header-accent: var(--brand);
    31 |   --header-chip-bg: var(--header-sub-bg);
    32 |   --header-chip-ink: var(--header-ink);
    33 |   --header-chip-line: var(--header-line);
    34 |   --header-control-bg: var(--header-bg);
    35 |   --header-control-ink: var(--header-ink);
    36 |   --header-control-line: var(--header-line);
    37 |   --contrast-surface: var(--surface-2);
    38 |   --contrast-surface-ink: var(--ink);
    39 |   --contrast-surface-muted: var(--muted);
    40 |   --contrast-surface-line: var(--line);
    41 |   --shop-page-bg: color-mix(in srgb, var(--bg) 84%, var(--brand) 16%);
    42 |   --shop-panel-bg: color-mix(in srgb, var(--surface) 88%, var(--brand) 12%);
    43 |   --shop-panel-bg-strong: color-mix(in srgb, var(--surface) 82%, var(--brand) 18%);
    44 |   --shop-section-header-bg: color-mix(in srgb, var(--surface) 84%, var(--brand) 16%);
    45 |   --shop-card-bg: color-mix(in srgb, var(--surface) 92%, var(--contrast-surface) 8%);
    46 |   --shop-card-bg-accent: color-mix(in srgb, var(--surface) 86%, var(--brand) 14%);
    47 |   --shop-input-bg: color-mix(in srgb, var(--surface) 92%, var(--brand) 8%);
    48 |   --shop-border: color-mix(in srgb, var(--line) 82%, transparent);
    49 |   --shop-border-hover: color-mix(in srgb, var(--brand) 70%, var(--line));
    50 |   --shop-primary: var(--brand);
    51 |   --shop-primary-ink: var(--on-brand);
    52 |   --shop-secondary: color-mix(in srgb, var(--contrast-surface) 88%, var(--surface));
    53 |   --shop-secondary-border: var(--shop-border);
    54 |   --shop-secondary-ink: var(--contrast-surface-ink);
    55 |   --shop-text: var(--ink);
    56 |   --shop-muted: var(--muted);
    57 |   --shop-token-ring: color-mix(in srgb, var(--brand) 65%, var(--line));
    58 |   --shop-token-ring-muted: color-mix(in srgb, var(--line) 64%, var(--brand) 36%);
    59 |   --shop-token-surface: color-mix(in srgb, var(--surface) 88%, var(--brand) 12%);
    60 |   --shop-token-price-bg: color-mix(in srgb, var(--surface) 82%, var(--brand) 18%);
    61 |   --shop-token-action-bg: var(--shop-primary);
    62 |   --shop-token-action-border: color-mix(in srgb, var(--brand) 70%, var(--line));
    63 |   --shop-token-glow: color-mix(in srgb, var(--brand) 24%, transparent);
    64 |   --shop-tooltip-bg: var(--contrast-surface);
```


#### Hit 16 — line 47

```text
    29 |   --header-line: var(--line);
    30 |   --header-accent: var(--brand);
    31 |   --header-chip-bg: var(--header-sub-bg);
    32 |   --header-chip-ink: var(--header-ink);
    33 |   --header-chip-line: var(--header-line);
    34 |   --header-control-bg: var(--header-bg);
    35 |   --header-control-ink: var(--header-ink);
    36 |   --header-control-line: var(--header-line);
    37 |   --contrast-surface: var(--surface-2);
    38 |   --contrast-surface-ink: var(--ink);
    39 |   --contrast-surface-muted: var(--muted);
    40 |   --contrast-surface-line: var(--line);
    41 |   --shop-page-bg: color-mix(in srgb, var(--bg) 84%, var(--brand) 16%);
    42 |   --shop-panel-bg: color-mix(in srgb, var(--surface) 88%, var(--brand) 12%);
    43 |   --shop-panel-bg-strong: color-mix(in srgb, var(--surface) 82%, var(--brand) 18%);
    44 |   --shop-section-header-bg: color-mix(in srgb, var(--surface) 84%, var(--brand) 16%);
    45 |   --shop-card-bg: color-mix(in srgb, var(--surface) 92%, var(--contrast-surface) 8%);
    46 |   --shop-card-bg-accent: color-mix(in srgb, var(--surface) 86%, var(--brand) 14%);
    47 |   --shop-input-bg: color-mix(in srgb, var(--surface) 92%, var(--brand) 8%);
    48 |   --shop-border: color-mix(in srgb, var(--line) 82%, transparent);
    49 |   --shop-border-hover: color-mix(in srgb, var(--brand) 70%, var(--line));
    50 |   --shop-primary: var(--brand);
    51 |   --shop-primary-ink: var(--on-brand);
    52 |   --shop-secondary: color-mix(in srgb, var(--contrast-surface) 88%, var(--surface));
    53 |   --shop-secondary-border: var(--shop-border);
    54 |   --shop-secondary-ink: var(--contrast-surface-ink);
    55 |   --shop-text: var(--ink);
    56 |   --shop-muted: var(--muted);
    57 |   --shop-token-ring: color-mix(in srgb, var(--brand) 65%, var(--line));
    58 |   --shop-token-ring-muted: color-mix(in srgb, var(--line) 64%, var(--brand) 36%);
    59 |   --shop-token-surface: color-mix(in srgb, var(--surface) 88%, var(--brand) 12%);
    60 |   --shop-token-price-bg: color-mix(in srgb, var(--surface) 82%, var(--brand) 18%);
    61 |   --shop-token-action-bg: var(--shop-primary);
    62 |   --shop-token-action-border: color-mix(in srgb, var(--brand) 70%, var(--line));
    63 |   --shop-token-glow: color-mix(in srgb, var(--brand) 24%, transparent);
    64 |   --shop-tooltip-bg: var(--contrast-surface);
    65 |   --shop-tooltip-text: var(--contrast-surface-ink);
```


#### Hit 17 — line 52

```text
    34 |   --header-control-bg: var(--header-bg);
    35 |   --header-control-ink: var(--header-ink);
    36 |   --header-control-line: var(--header-line);
    37 |   --contrast-surface: var(--surface-2);
    38 |   --contrast-surface-ink: var(--ink);
    39 |   --contrast-surface-muted: var(--muted);
    40 |   --contrast-surface-line: var(--line);
    41 |   --shop-page-bg: color-mix(in srgb, var(--bg) 84%, var(--brand) 16%);
    42 |   --shop-panel-bg: color-mix(in srgb, var(--surface) 88%, var(--brand) 12%);
    43 |   --shop-panel-bg-strong: color-mix(in srgb, var(--surface) 82%, var(--brand) 18%);
    44 |   --shop-section-header-bg: color-mix(in srgb, var(--surface) 84%, var(--brand) 16%);
    45 |   --shop-card-bg: color-mix(in srgb, var(--surface) 92%, var(--contrast-surface) 8%);
    46 |   --shop-card-bg-accent: color-mix(in srgb, var(--surface) 86%, var(--brand) 14%);
    47 |   --shop-input-bg: color-mix(in srgb, var(--surface) 92%, var(--brand) 8%);
    48 |   --shop-border: color-mix(in srgb, var(--line) 82%, transparent);
    49 |   --shop-border-hover: color-mix(in srgb, var(--brand) 70%, var(--line));
    50 |   --shop-primary: var(--brand);
    51 |   --shop-primary-ink: var(--on-brand);
    52 |   --shop-secondary: color-mix(in srgb, var(--contrast-surface) 88%, var(--surface));
    53 |   --shop-secondary-border: var(--shop-border);
    54 |   --shop-secondary-ink: var(--contrast-surface-ink);
    55 |   --shop-text: var(--ink);
    56 |   --shop-muted: var(--muted);
    57 |   --shop-token-ring: color-mix(in srgb, var(--brand) 65%, var(--line));
    58 |   --shop-token-ring-muted: color-mix(in srgb, var(--line) 64%, var(--brand) 36%);
    59 |   --shop-token-surface: color-mix(in srgb, var(--surface) 88%, var(--brand) 12%);
    60 |   --shop-token-price-bg: color-mix(in srgb, var(--surface) 82%, var(--brand) 18%);
    61 |   --shop-token-action-bg: var(--shop-primary);
    62 |   --shop-token-action-border: color-mix(in srgb, var(--brand) 70%, var(--line));
    63 |   --shop-token-glow: color-mix(in srgb, var(--brand) 24%, transparent);
    64 |   --shop-tooltip-bg: var(--contrast-surface);
    65 |   --shop-tooltip-text: var(--contrast-surface-ink);
    66 |   --shop-control-accent: var(--danger);
    67 |   --shop-curse-accent: var(--brand-dark);
    68 |   --shop-encounter-accent: var(--gold);
    69 |   --shop-protection-accent: var(--brand);
    70 |   --shop-game-corner-accent: var(--gold);
```


#### Hit 18 — line 52

```text
    34 |   --header-control-bg: var(--header-bg);
    35 |   --header-control-ink: var(--header-ink);
    36 |   --header-control-line: var(--header-line);
    37 |   --contrast-surface: var(--surface-2);
    38 |   --contrast-surface-ink: var(--ink);
    39 |   --contrast-surface-muted: var(--muted);
    40 |   --contrast-surface-line: var(--line);
    41 |   --shop-page-bg: color-mix(in srgb, var(--bg) 84%, var(--brand) 16%);
    42 |   --shop-panel-bg: color-mix(in srgb, var(--surface) 88%, var(--brand) 12%);
    43 |   --shop-panel-bg-strong: color-mix(in srgb, var(--surface) 82%, var(--brand) 18%);
    44 |   --shop-section-header-bg: color-mix(in srgb, var(--surface) 84%, var(--brand) 16%);
    45 |   --shop-card-bg: color-mix(in srgb, var(--surface) 92%, var(--contrast-surface) 8%);
    46 |   --shop-card-bg-accent: color-mix(in srgb, var(--surface) 86%, var(--brand) 14%);
    47 |   --shop-input-bg: color-mix(in srgb, var(--surface) 92%, var(--brand) 8%);
    48 |   --shop-border: color-mix(in srgb, var(--line) 82%, transparent);
    49 |   --shop-border-hover: color-mix(in srgb, var(--brand) 70%, var(--line));
    50 |   --shop-primary: var(--brand);
    51 |   --shop-primary-ink: var(--on-brand);
    52 |   --shop-secondary: color-mix(in srgb, var(--contrast-surface) 88%, var(--surface));
    53 |   --shop-secondary-border: var(--shop-border);
    54 |   --shop-secondary-ink: var(--contrast-surface-ink);
    55 |   --shop-text: var(--ink);
    56 |   --shop-muted: var(--muted);
    57 |   --shop-token-ring: color-mix(in srgb, var(--brand) 65%, var(--line));
    58 |   --shop-token-ring-muted: color-mix(in srgb, var(--line) 64%, var(--brand) 36%);
    59 |   --shop-token-surface: color-mix(in srgb, var(--surface) 88%, var(--brand) 12%);
    60 |   --shop-token-price-bg: color-mix(in srgb, var(--surface) 82%, var(--brand) 18%);
    61 |   --shop-token-action-bg: var(--shop-primary);
    62 |   --shop-token-action-border: color-mix(in srgb, var(--brand) 70%, var(--line));
    63 |   --shop-token-glow: color-mix(in srgb, var(--brand) 24%, transparent);
    64 |   --shop-tooltip-bg: var(--contrast-surface);
    65 |   --shop-tooltip-text: var(--contrast-surface-ink);
    66 |   --shop-control-accent: var(--danger);
    67 |   --shop-curse-accent: var(--brand-dark);
    68 |   --shop-encounter-accent: var(--gold);
    69 |   --shop-protection-accent: var(--brand);
    70 |   --shop-game-corner-accent: var(--gold);
```


#### Hit 19 — line 54

```text
    36 |   --header-control-line: var(--header-line);
    37 |   --contrast-surface: var(--surface-2);
    38 |   --contrast-surface-ink: var(--ink);
    39 |   --contrast-surface-muted: var(--muted);
    40 |   --contrast-surface-line: var(--line);
    41 |   --shop-page-bg: color-mix(in srgb, var(--bg) 84%, var(--brand) 16%);
    42 |   --shop-panel-bg: color-mix(in srgb, var(--surface) 88%, var(--brand) 12%);
    43 |   --shop-panel-bg-strong: color-mix(in srgb, var(--surface) 82%, var(--brand) 18%);
    44 |   --shop-section-header-bg: color-mix(in srgb, var(--surface) 84%, var(--brand) 16%);
    45 |   --shop-card-bg: color-mix(in srgb, var(--surface) 92%, var(--contrast-surface) 8%);
    46 |   --shop-card-bg-accent: color-mix(in srgb, var(--surface) 86%, var(--brand) 14%);
    47 |   --shop-input-bg: color-mix(in srgb, var(--surface) 92%, var(--brand) 8%);
    48 |   --shop-border: color-mix(in srgb, var(--line) 82%, transparent);
    49 |   --shop-border-hover: color-mix(in srgb, var(--brand) 70%, var(--line));
    50 |   --shop-primary: var(--brand);
    51 |   --shop-primary-ink: var(--on-brand);
    52 |   --shop-secondary: color-mix(in srgb, var(--contrast-surface) 88%, var(--surface));
    53 |   --shop-secondary-border: var(--shop-border);
    54 |   --shop-secondary-ink: var(--contrast-surface-ink);
    55 |   --shop-text: var(--ink);
    56 |   --shop-muted: var(--muted);
    57 |   --shop-token-ring: color-mix(in srgb, var(--brand) 65%, var(--line));
    58 |   --shop-token-ring-muted: color-mix(in srgb, var(--line) 64%, var(--brand) 36%);
    59 |   --shop-token-surface: color-mix(in srgb, var(--surface) 88%, var(--brand) 12%);
    60 |   --shop-token-price-bg: color-mix(in srgb, var(--surface) 82%, var(--brand) 18%);
    61 |   --shop-token-action-bg: var(--shop-primary);
    62 |   --shop-token-action-border: color-mix(in srgb, var(--brand) 70%, var(--line));
    63 |   --shop-token-glow: color-mix(in srgb, var(--brand) 24%, transparent);
    64 |   --shop-tooltip-bg: var(--contrast-surface);
    65 |   --shop-tooltip-text: var(--contrast-surface-ink);
    66 |   --shop-control-accent: var(--danger);
    67 |   --shop-curse-accent: var(--brand-dark);
    68 |   --shop-encounter-accent: var(--gold);
    69 |   --shop-protection-accent: var(--brand);
    70 |   --shop-game-corner-accent: var(--gold);
    71 |   --shadow: 0 12px 35px rgba(28, 35, 33, 0.08);
    72 |   --global-shell-bar-height: 58px;
```


#### Hit 20 — line 59

```text
    41 |   --shop-page-bg: color-mix(in srgb, var(--bg) 84%, var(--brand) 16%);
    42 |   --shop-panel-bg: color-mix(in srgb, var(--surface) 88%, var(--brand) 12%);
    43 |   --shop-panel-bg-strong: color-mix(in srgb, var(--surface) 82%, var(--brand) 18%);
    44 |   --shop-section-header-bg: color-mix(in srgb, var(--surface) 84%, var(--brand) 16%);
    45 |   --shop-card-bg: color-mix(in srgb, var(--surface) 92%, var(--contrast-surface) 8%);
    46 |   --shop-card-bg-accent: color-mix(in srgb, var(--surface) 86%, var(--brand) 14%);
    47 |   --shop-input-bg: color-mix(in srgb, var(--surface) 92%, var(--brand) 8%);
    48 |   --shop-border: color-mix(in srgb, var(--line) 82%, transparent);
    49 |   --shop-border-hover: color-mix(in srgb, var(--brand) 70%, var(--line));
    50 |   --shop-primary: var(--brand);
    51 |   --shop-primary-ink: var(--on-brand);
    52 |   --shop-secondary: color-mix(in srgb, var(--contrast-surface) 88%, var(--surface));
    53 |   --shop-secondary-border: var(--shop-border);
    54 |   --shop-secondary-ink: var(--contrast-surface-ink);
    55 |   --shop-text: var(--ink);
    56 |   --shop-muted: var(--muted);
    57 |   --shop-token-ring: color-mix(in srgb, var(--brand) 65%, var(--line));
    58 |   --shop-token-ring-muted: color-mix(in srgb, var(--line) 64%, var(--brand) 36%);
    59 |   --shop-token-surface: color-mix(in srgb, var(--surface) 88%, var(--brand) 12%);
    60 |   --shop-token-price-bg: color-mix(in srgb, var(--surface) 82%, var(--brand) 18%);
    61 |   --shop-token-action-bg: var(--shop-primary);
    62 |   --shop-token-action-border: color-mix(in srgb, var(--brand) 70%, var(--line));
    63 |   --shop-token-glow: color-mix(in srgb, var(--brand) 24%, transparent);
    64 |   --shop-tooltip-bg: var(--contrast-surface);
    65 |   --shop-tooltip-text: var(--contrast-surface-ink);
    66 |   --shop-control-accent: var(--danger);
    67 |   --shop-curse-accent: var(--brand-dark);
    68 |   --shop-encounter-accent: var(--gold);
    69 |   --shop-protection-accent: var(--brand);
    70 |   --shop-game-corner-accent: var(--gold);
    71 |   --shadow: 0 12px 35px rgba(28, 35, 33, 0.08);
    72 |   --global-shell-bar-height: 58px;
    73 |   --game-nav-height: 46px;
    74 |   --global-shell-height: var(--global-shell-bar-height);
    75 |   --shell-radius: 12px;
    76 |   --game-shell-deep: #16080d;
    77 |   --game-shell-mid: #3a0d1d;
```


#### Hit 21 — line 59

```text
    41 |   --shop-page-bg: color-mix(in srgb, var(--bg) 84%, var(--brand) 16%);
    42 |   --shop-panel-bg: color-mix(in srgb, var(--surface) 88%, var(--brand) 12%);
    43 |   --shop-panel-bg-strong: color-mix(in srgb, var(--surface) 82%, var(--brand) 18%);
    44 |   --shop-section-header-bg: color-mix(in srgb, var(--surface) 84%, var(--brand) 16%);
    45 |   --shop-card-bg: color-mix(in srgb, var(--surface) 92%, var(--contrast-surface) 8%);
    46 |   --shop-card-bg-accent: color-mix(in srgb, var(--surface) 86%, var(--brand) 14%);
    47 |   --shop-input-bg: color-mix(in srgb, var(--surface) 92%, var(--brand) 8%);
    48 |   --shop-border: color-mix(in srgb, var(--line) 82%, transparent);
    49 |   --shop-border-hover: color-mix(in srgb, var(--brand) 70%, var(--line));
    50 |   --shop-primary: var(--brand);
    51 |   --shop-primary-ink: var(--on-brand);
    52 |   --shop-secondary: color-mix(in srgb, var(--contrast-surface) 88%, var(--surface));
    53 |   --shop-secondary-border: var(--shop-border);
    54 |   --shop-secondary-ink: var(--contrast-surface-ink);
    55 |   --shop-text: var(--ink);
    56 |   --shop-muted: var(--muted);
    57 |   --shop-token-ring: color-mix(in srgb, var(--brand) 65%, var(--line));
    58 |   --shop-token-ring-muted: color-mix(in srgb, var(--line) 64%, var(--brand) 36%);
    59 |   --shop-token-surface: color-mix(in srgb, var(--surface) 88%, var(--brand) 12%);
    60 |   --shop-token-price-bg: color-mix(in srgb, var(--surface) 82%, var(--brand) 18%);
    61 |   --shop-token-action-bg: var(--shop-primary);
    62 |   --shop-token-action-border: color-mix(in srgb, var(--brand) 70%, var(--line));
    63 |   --shop-token-glow: color-mix(in srgb, var(--brand) 24%, transparent);
    64 |   --shop-tooltip-bg: var(--contrast-surface);
    65 |   --shop-tooltip-text: var(--contrast-surface-ink);
    66 |   --shop-control-accent: var(--danger);
    67 |   --shop-curse-accent: var(--brand-dark);
    68 |   --shop-encounter-accent: var(--gold);
    69 |   --shop-protection-accent: var(--brand);
    70 |   --shop-game-corner-accent: var(--gold);
    71 |   --shadow: 0 12px 35px rgba(28, 35, 33, 0.08);
    72 |   --global-shell-bar-height: 58px;
    73 |   --game-nav-height: 46px;
    74 |   --global-shell-height: var(--global-shell-bar-height);
    75 |   --shell-radius: 12px;
    76 |   --game-shell-deep: #16080d;
    77 |   --game-shell-mid: #3a0d1d;
```


#### Hit 22 — line 60

```text
    42 |   --shop-panel-bg: color-mix(in srgb, var(--surface) 88%, var(--brand) 12%);
    43 |   --shop-panel-bg-strong: color-mix(in srgb, var(--surface) 82%, var(--brand) 18%);
    44 |   --shop-section-header-bg: color-mix(in srgb, var(--surface) 84%, var(--brand) 16%);
    45 |   --shop-card-bg: color-mix(in srgb, var(--surface) 92%, var(--contrast-surface) 8%);
    46 |   --shop-card-bg-accent: color-mix(in srgb, var(--surface) 86%, var(--brand) 14%);
    47 |   --shop-input-bg: color-mix(in srgb, var(--surface) 92%, var(--brand) 8%);
    48 |   --shop-border: color-mix(in srgb, var(--line) 82%, transparent);
    49 |   --shop-border-hover: color-mix(in srgb, var(--brand) 70%, var(--line));
    50 |   --shop-primary: var(--brand);
    51 |   --shop-primary-ink: var(--on-brand);
    52 |   --shop-secondary: color-mix(in srgb, var(--contrast-surface) 88%, var(--surface));
    53 |   --shop-secondary-border: var(--shop-border);
    54 |   --shop-secondary-ink: var(--contrast-surface-ink);
    55 |   --shop-text: var(--ink);
    56 |   --shop-muted: var(--muted);
    57 |   --shop-token-ring: color-mix(in srgb, var(--brand) 65%, var(--line));
    58 |   --shop-token-ring-muted: color-mix(in srgb, var(--line) 64%, var(--brand) 36%);
    59 |   --shop-token-surface: color-mix(in srgb, var(--surface) 88%, var(--brand) 12%);
    60 |   --shop-token-price-bg: color-mix(in srgb, var(--surface) 82%, var(--brand) 18%);
    61 |   --shop-token-action-bg: var(--shop-primary);
    62 |   --shop-token-action-border: color-mix(in srgb, var(--brand) 70%, var(--line));
    63 |   --shop-token-glow: color-mix(in srgb, var(--brand) 24%, transparent);
    64 |   --shop-tooltip-bg: var(--contrast-surface);
    65 |   --shop-tooltip-text: var(--contrast-surface-ink);
    66 |   --shop-control-accent: var(--danger);
    67 |   --shop-curse-accent: var(--brand-dark);
    68 |   --shop-encounter-accent: var(--gold);
    69 |   --shop-protection-accent: var(--brand);
    70 |   --shop-game-corner-accent: var(--gold);
    71 |   --shadow: 0 12px 35px rgba(28, 35, 33, 0.08);
    72 |   --global-shell-bar-height: 58px;
    73 |   --game-nav-height: 46px;
    74 |   --global-shell-height: var(--global-shell-bar-height);
    75 |   --shell-radius: 12px;
    76 |   --game-shell-deep: #16080d;
    77 |   --game-shell-mid: #3a0d1d;
    78 |   --game-shell-edge: #7a1735;
```


#### Hit 23 — line 64

```text
    46 |   --shop-card-bg-accent: color-mix(in srgb, var(--surface) 86%, var(--brand) 14%);
    47 |   --shop-input-bg: color-mix(in srgb, var(--surface) 92%, var(--brand) 8%);
    48 |   --shop-border: color-mix(in srgb, var(--line) 82%, transparent);
    49 |   --shop-border-hover: color-mix(in srgb, var(--brand) 70%, var(--line));
    50 |   --shop-primary: var(--brand);
    51 |   --shop-primary-ink: var(--on-brand);
    52 |   --shop-secondary: color-mix(in srgb, var(--contrast-surface) 88%, var(--surface));
    53 |   --shop-secondary-border: var(--shop-border);
    54 |   --shop-secondary-ink: var(--contrast-surface-ink);
    55 |   --shop-text: var(--ink);
    56 |   --shop-muted: var(--muted);
    57 |   --shop-token-ring: color-mix(in srgb, var(--brand) 65%, var(--line));
    58 |   --shop-token-ring-muted: color-mix(in srgb, var(--line) 64%, var(--brand) 36%);
    59 |   --shop-token-surface: color-mix(in srgb, var(--surface) 88%, var(--brand) 12%);
    60 |   --shop-token-price-bg: color-mix(in srgb, var(--surface) 82%, var(--brand) 18%);
    61 |   --shop-token-action-bg: var(--shop-primary);
    62 |   --shop-token-action-border: color-mix(in srgb, var(--brand) 70%, var(--line));
    63 |   --shop-token-glow: color-mix(in srgb, var(--brand) 24%, transparent);
    64 |   --shop-tooltip-bg: var(--contrast-surface);
    65 |   --shop-tooltip-text: var(--contrast-surface-ink);
    66 |   --shop-control-accent: var(--danger);
    67 |   --shop-curse-accent: var(--brand-dark);
    68 |   --shop-encounter-accent: var(--gold);
    69 |   --shop-protection-accent: var(--brand);
    70 |   --shop-game-corner-accent: var(--gold);
    71 |   --shadow: 0 12px 35px rgba(28, 35, 33, 0.08);
    72 |   --global-shell-bar-height: 58px;
    73 |   --game-nav-height: 46px;
    74 |   --global-shell-height: var(--global-shell-bar-height);
    75 |   --shell-radius: 12px;
    76 |   --game-shell-deep: #16080d;
    77 |   --game-shell-mid: #3a0d1d;
    78 |   --game-shell-edge: #7a1735;
    79 |   --game-shell-accent: #ff3f75;
    80 |   --game-shell-ink: #fff7fa;
    81 |   --game-shell-muted: #d9a8b8;
    82 |   --game-header-height: 68px;
```


#### Hit 24 — line 65

```text
    47 |   --shop-input-bg: color-mix(in srgb, var(--surface) 92%, var(--brand) 8%);
    48 |   --shop-border: color-mix(in srgb, var(--line) 82%, transparent);
    49 |   --shop-border-hover: color-mix(in srgb, var(--brand) 70%, var(--line));
    50 |   --shop-primary: var(--brand);
    51 |   --shop-primary-ink: var(--on-brand);
    52 |   --shop-secondary: color-mix(in srgb, var(--contrast-surface) 88%, var(--surface));
    53 |   --shop-secondary-border: var(--shop-border);
    54 |   --shop-secondary-ink: var(--contrast-surface-ink);
    55 |   --shop-text: var(--ink);
    56 |   --shop-muted: var(--muted);
    57 |   --shop-token-ring: color-mix(in srgb, var(--brand) 65%, var(--line));
    58 |   --shop-token-ring-muted: color-mix(in srgb, var(--line) 64%, var(--brand) 36%);
    59 |   --shop-token-surface: color-mix(in srgb, var(--surface) 88%, var(--brand) 12%);
    60 |   --shop-token-price-bg: color-mix(in srgb, var(--surface) 82%, var(--brand) 18%);
    61 |   --shop-token-action-bg: var(--shop-primary);
    62 |   --shop-token-action-border: color-mix(in srgb, var(--brand) 70%, var(--line));
    63 |   --shop-token-glow: color-mix(in srgb, var(--brand) 24%, transparent);
    64 |   --shop-tooltip-bg: var(--contrast-surface);
    65 |   --shop-tooltip-text: var(--contrast-surface-ink);
    66 |   --shop-control-accent: var(--danger);
    67 |   --shop-curse-accent: var(--brand-dark);
    68 |   --shop-encounter-accent: var(--gold);
    69 |   --shop-protection-accent: var(--brand);
    70 |   --shop-game-corner-accent: var(--gold);
    71 |   --shadow: 0 12px 35px rgba(28, 35, 33, 0.08);
    72 |   --global-shell-bar-height: 58px;
    73 |   --game-nav-height: 46px;
    74 |   --global-shell-height: var(--global-shell-bar-height);
    75 |   --shell-radius: 12px;
    76 |   --game-shell-deep: #16080d;
    77 |   --game-shell-mid: #3a0d1d;
    78 |   --game-shell-edge: #7a1735;
    79 |   --game-shell-accent: #ff3f75;
    80 |   --game-shell-ink: #fff7fa;
    81 |   --game-shell-muted: #d9a8b8;
    82 |   --game-header-height: 68px;
    83 | }
```


#### Hit 25 — line 129

```text
   111 | .live-referee-context-strip:empty {
   112 |   display: none;
   113 | }
   114 | 
   115 | .live-referee-context-header {
   116 |   display: grid;
   117 |   grid-template-columns: minmax(160px, 1fr) minmax(190px, 1.2fr) minmax(86px, 0.55fr);
   118 |   gap: 8px;
   119 |   align-items: stretch;
   120 | }
   121 | 
   122 | .live-referee-context-location,
   123 | .live-referee-context-actor,
   124 | .live-referee-context-progress {
   125 |   min-width: 0;
   126 |   border: 1px solid color-mix(in srgb, var(--line) 74%, var(--brand) 26%);
   127 |   border-radius: 12px;
   128 |   background:
   129 |     linear-gradient(145deg, color-mix(in srgb, var(--surface) 86%, var(--brand) 14%), color-mix(in srgb, var(--surface-2) 92%, var(--bg) 8%));
   130 |   box-shadow: inset 0 1px 0 var(--edge-highlight);
   131 |   padding: 9px 11px;
   132 | }
   133 | 
   134 | .live-referee-context-location {
   135 |   display: grid;
   136 |   grid-template-columns: auto 1fr;
   137 |   align-content: center;
   138 |   column-gap: 7px;
   139 | }
   140 | 
   141 | .live-referee-context-location span,
   142 | .live-referee-context-location em,
   143 | .live-referee-context-actor small,
   144 | .live-referee-context-progress small {
   145 |   overflow: hidden;
   146 |   color: var(--muted);
   147 |   font-size: 0.66rem;
```


#### Hit 26 — line 129

```text
   111 | .live-referee-context-strip:empty {
   112 |   display: none;
   113 | }
   114 | 
   115 | .live-referee-context-header {
   116 |   display: grid;
   117 |   grid-template-columns: minmax(160px, 1fr) minmax(190px, 1.2fr) minmax(86px, 0.55fr);
   118 |   gap: 8px;
   119 |   align-items: stretch;
   120 | }
   121 | 
   122 | .live-referee-context-location,
   123 | .live-referee-context-actor,
   124 | .live-referee-context-progress {
   125 |   min-width: 0;
   126 |   border: 1px solid color-mix(in srgb, var(--line) 74%, var(--brand) 26%);
   127 |   border-radius: 12px;
   128 |   background:
   129 |     linear-gradient(145deg, color-mix(in srgb, var(--surface) 86%, var(--brand) 14%), color-mix(in srgb, var(--surface-2) 92%, var(--bg) 8%));
   130 |   box-shadow: inset 0 1px 0 var(--edge-highlight);
   131 |   padding: 9px 11px;
   132 | }
   133 | 
   134 | .live-referee-context-location {
   135 |   display: grid;
   136 |   grid-template-columns: auto 1fr;
   137 |   align-content: center;
   138 |   column-gap: 7px;
   139 | }
   140 | 
   141 | .live-referee-context-location span,
   142 | .live-referee-context-location em,
   143 | .live-referee-context-actor small,
   144 | .live-referee-context-progress small {
   145 |   overflow: hidden;
   146 |   color: var(--muted);
   147 |   font-size: 0.66rem;
```


#### Hit 27 — line 177

```text
   159 |   font-weight: 950;
   160 | }
   161 | 
   162 | .live-referee-context-location em {
   163 |   grid-column: 1 / -1;
   164 |   margin-top: 2px;
   165 | }
   166 | 
   167 | .live-referee-context-actor {
   168 |   display: flex;
   169 |   align-items: center;
   170 |   gap: 9px;
   171 | }
   172 | 
   173 | .live-referee-context-actor.active {
   174 |   border-color: color-mix(in srgb, var(--gold) 58%, var(--brand) 42%);
   175 |   background:
   176 |     radial-gradient(circle at 16% 20%, color-mix(in srgb, var(--gold) 18%, transparent), transparent 4.5rem),
   177 |     linear-gradient(145deg, color-mix(in srgb, var(--surface) 82%, var(--gold) 10%), color-mix(in srgb, var(--surface-2) 88%, var(--brand) 12%));
   178 | }
   179 | 
   180 | .live-referee-context-actor > span:last-child {
   181 |   display: grid;
   182 |   min-width: 0;
   183 | }
   184 | 
   185 | .live-referee-context-actor strong {
   186 |   overflow: hidden;
   187 |   color: var(--ink);
   188 |   font-size: 0.94rem;
   189 |   font-weight: 950;
   190 |   text-overflow: ellipsis;
   191 |   white-space: nowrap;
   192 | }
   193 | 
   194 | .live-referee-context-beacon {
   195 |   color: var(--brand);
```


#### Hit 28 — line 177

```text
   159 |   font-weight: 950;
   160 | }
   161 | 
   162 | .live-referee-context-location em {
   163 |   grid-column: 1 / -1;
   164 |   margin-top: 2px;
   165 | }
   166 | 
   167 | .live-referee-context-actor {
   168 |   display: flex;
   169 |   align-items: center;
   170 |   gap: 9px;
   171 | }
   172 | 
   173 | .live-referee-context-actor.active {
   174 |   border-color: color-mix(in srgb, var(--gold) 58%, var(--brand) 42%);
   175 |   background:
   176 |     radial-gradient(circle at 16% 20%, color-mix(in srgb, var(--gold) 18%, transparent), transparent 4.5rem),
   177 |     linear-gradient(145deg, color-mix(in srgb, var(--surface) 82%, var(--gold) 10%), color-mix(in srgb, var(--surface-2) 88%, var(--brand) 12%));
   178 | }
   179 | 
   180 | .live-referee-context-actor > span:last-child {
   181 |   display: grid;
   182 |   min-width: 0;
   183 | }
   184 | 
   185 | .live-referee-context-actor strong {
   186 |   overflow: hidden;
   187 |   color: var(--ink);
   188 |   font-size: 0.94rem;
   189 |   font-weight: 950;
   190 |   text-overflow: ellipsis;
   191 |   white-space: nowrap;
   192 | }
   193 | 
   194 | .live-referee-context-beacon {
   195 |   color: var(--brand);
```


#### Hit 29 — line 223

```text
   205 | .live-referee-context-progress strong {
   206 |   color: var(--ink);
   207 |   font-size: 1.05rem;
   208 |   font-weight: 950;
   209 | }
   210 | 
   211 | .live-referee-context-chips {
   212 |   display: flex;
   213 |   gap: 6px;
   214 |   min-width: 0;
   215 |   overflow: hidden;
   216 | }
   217 | 
   218 | .live-referee-context-chips span {
   219 |   flex: 0 1 auto;
   220 |   overflow: hidden;
   221 |   border: 1px solid color-mix(in srgb, var(--brand) 32%, var(--line));
   222 |   border-radius: 999px;
   223 |   background: color-mix(in srgb, var(--surface) 84%, var(--brand) 16%);
   224 |   color: var(--ink);
   225 |   padding: 4px 8px;
   226 |   font-size: 0.66rem;
   227 |   font-weight: 900;
   228 |   text-overflow: ellipsis;
   229 |   white-space: nowrap;
   230 | }
   231 | 
   232 | .live-referee-prompt-trail {
   233 |   display: flex;
   234 |   align-items: center;
   235 |   gap: 5px;
   236 |   min-width: 0;
   237 |   overflow: hidden;
   238 |   color: var(--muted);
   239 | }
   240 | 
   241 | .live-referee-prompt-trail span {
```


#### Hit 30 — line 244

```text
   226 |   font-size: 0.66rem;
   227 |   font-weight: 900;
   228 |   text-overflow: ellipsis;
   229 |   white-space: nowrap;
   230 | }
   231 | 
   232 | .live-referee-prompt-trail {
   233 |   display: flex;
   234 |   align-items: center;
   235 |   gap: 5px;
   236 |   min-width: 0;
   237 |   overflow: hidden;
   238 |   color: var(--muted);
   239 | }
   240 | 
   241 | .live-referee-prompt-trail span {
   242 |   overflow: hidden;
   243 |   border-radius: 6px;
   244 |   background: color-mix(in srgb, var(--surface) 86%, var(--bg) 14%);
   245 |   padding: 3px 7px;
   246 |   font-size: 0.68rem;
   247 |   font-weight: 900;
   248 |   text-overflow: ellipsis;
   249 |   white-space: nowrap;
   250 | }
   251 | 
   252 | .live-referee-prompt-trail span.current {
   253 |   background: color-mix(in srgb, var(--brand) 80%, var(--surface));
   254 |   color: var(--on-brand);
   255 | }
   256 | 
   257 | .live-referee-prompt-trail span.resolved {
   258 |   color: var(--success);
   259 | }
   260 | 
   261 | .live-referee-prompt-trail span.canceled {
   262 |   color: var(--danger);
```



## token-effect-contract.js detailed contexts

### extra-encounter-token

Occurrences: 2

#### Hit 1 — line 260

```text
   242 |       evidence: "Exact consumed Protection identity, Safeguard Copy protection, atomic parent negation plus temporary copy creation, same-Gym availability, End-of-Gym expiration, stale fail-closed refund, refresh persistence, undo restoration, and duplicate-completion prevention are covered by focused runtime and production-browser tests.",
   243 |       verifiedAt: "2026-07-26",
   244 |       contractDefinitionRevision
   245 |     }),
   246 |     "counterspell": Object.freeze({
   247 |       status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
   248 |       tests: Object.freeze(["token-response-parent-chain", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "token-inventory-runtime"]),
   249 |       evidence: "Own-token negation qualification, exact consumed inventory restoration, explicit consumption exception, two-Gym phase-anchored cooldown, refresh persistence, phase-undo restoration, stale fail-closed refund, and duplicate prevention are covered by focused runtime and production-browser tests.",
   250 |       verifiedAt: "2026-07-26",
   251 |       contractDefinitionRevision
   252 |     }),
   253 |     "immunity": Object.freeze({
   254 |       status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
   255 |       tests: Object.freeze(["token-response-parent-chain", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair"]),
   256 |       evidence: "Exact current-prompt response priority, confirmation-time consumption, atomic parent negation, causal result summaries, refresh persistence, duplicate-resolution prevention, undo restoration, and sandbox isolation are covered by the Control, response-chain, production-browser, and sandbox suites.",
   257 |       verifiedAt: "2026-07-29",
   258 |       contractDefinitionRevision
   259 |     }),
   260 |     "extra-encounter-token": Object.freeze({
   261 |       status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
   262 |       tests: Object.freeze(["token-declaration-timing", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "encounter-token-runtime"]),
   263 |       evidence: "Action-only declaration, exact chosen-player validation, one authoritative Encounter roll grant, open-session extension, standalone session creation, stable grant identity, duplicate prevention, refresh persistence, normal Encounter completion, and snapshot undo are covered by focused runtime and integration tests.",
   264 |       verifiedAt: "2026-07-29",
   265 |       contractDefinitionRevision
   266 |     }),
   267 |     "follow-me": Object.freeze({
   268 |       status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
   269 |       tests: Object.freeze(["token-response-parent-chain", "token-reload-persistence", "token-undo-repair", "token-inventory-runtime", "follow-me-e2e"]),
   270 |       evidence: "BROWSER-013 and SEB-005 cover legal corresponding-target redirection, parent-gated activation, exact real-consumption inventory copies, duplicate prevention, backend refresh, Gym-end relationship expiration, and newest-first History undo.",
   271 |       verifiedAt: "2026-08-03",
   272 |       contractDefinitionRevision
   273 |     }),
   274 |     "ditto-token": Object.freeze({
   275 |       status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
   276 |       tests: Object.freeze(["token-declaration-timing", "token-reload-persistence", "token-undo-repair", "token-inventory-runtime", "ditto-inventory-e2e"]),
   277 |       evidence: "BROWSER-015 and SEB-006 cover the production non-Ditto picker, exact source-record transformation, canonical identity and provenance, no immediate activation, duplicate-safe operation identity, backend refresh, and History undo.",
   278 |       verifiedAt: "2026-08-03",
```


#### Hit 2 — line 766

```text
   748 |     control({ id: "unban-token", name: "Unban", aliases: ["Unban Token"], rulesText: "Unban a Pokemon. It cannot be banned again for 6 gyms", targetType: "pokemon", targetScope: "species", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "6 Gyms", expirationPoint: unresolvedMultiGymExpiration, automaticMutations: ["Remove active Ban or Restrict", "Create Unban protection", "Update global Pokemon legality"] }),
   749 |     control({ id: "incinerate", name: "Incinerate", rulesText: "Choose one Item or TM from every other player except Masterball items and remove it from their bag", targetType: "resource", targetScope: "allMatchingResources", selectedTargetType: "resource", applicationScope: "allPlayers", affectedEntityType: "resource", targetControllerRelation: "everyOtherPlayer", excludeActor: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "utilityEffect", requiredChoices: ["One exact legal Item or TM record from each other player who has one"], effectTags: ["Destroy"], automaticMutations: ["Validate one stable-ID non-Master-Ball Item or TM selection for each eligible opposing player", "Skip opposing players who have no legal target", "Atomically destroy every exact selected inventory record", "Record each destruction as a stable-ID effect operation"], mechanicContract: { resourceCategories: ["Item", "TM"], independentSelectionPerOtherPlayer: true, differentSelectionsAllowed: true, oneSelectedRecordPerEligibleOpponent: true, playersWithoutLegalTargetsAreSkipped: true, excludesSourcePlayer: true, excludesMasterBallItems: true, stableInventoryIdsRequired: true, emptyMatchResolvesNoEffect: true, atomicMutationRequired: true } }),
   750 |     control({ id: "steal-token", name: "Steal", rulesText: "Steal a Pokemon from another player", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "rosterInstance", affectedEntityType: "pokemon", targetControllerRelation: "differentController", otherPlayerOnly: true, excludeActor: true, differentControllerRequired: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "utilityEffect", effectTags: ["Steal"], automaticMutations: ["Transfer the exact selected Pokemon record to the acting player's Active roster", "Remove stale current-team references owned by the previous player", "Record the transfer as a stable-ID ownership operation"], mechanicContract: { exactRosterInstanceRequired: true, transfersToActingPlayerActiveRoster: true, formalStealTagRequired: true, stickyHoldBlocksAllPokemonSteal: true, safeguardDoesNotProtectPokemon: true, substituteMayProtectSelectedInstance: true, stablePokemonIdRequired: true, atomicMutationRequired: true } }),
   751 | 
   752 |     protection({ id: "safeguard", name: "Safeguard", rulesText: "Your Money And Tokens Cannot Be Stolen, Destroyed, Or Copied. You Are Unaffected By Follow Me And Embargo.", isResponse: false, usesControlTiming: true, controlWindowRequired: true, legalControlContexts: ordinaryControlContexts, activationPattern: "proactive", activationType: "Declaration", requiresPendingEvent: false, targetType: "player", targetScope: "singlePlayer", targetControllerRelation: "self", selfOnly: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "safeguard", createsPendingEvent: true, opensResponseWindow: true, canBeRespondedTo: true, persistence: "lingeringEffect", duration: "Until Gym end", expirationPoint: "At the approved End-of-Gym expiration checkpoint.", protectionScope: ["moneySteal", "moneyDestroy", "moneyCopy", "tokenSteal", "tokenDestroy", "tokenCopy", "followMe", "embargo"], automaticMutations: ["Create exact-player Safeguard protection", "Block only canonical Safeguard operation categories"], mechanicContract: { exactPlayerScopeRequired: true, categoryMatrixRequired: true, protectedCategories: ["moneySteal", "moneyDestroy", "moneyCopy", "tokenSteal", "tokenDestroy", "tokenCopy", "followMe", "embargo"], explicitNonProtectedCategories: ["itemSteal", "itemDestroy", "tmSteal", "tmDestroy", "pokemonSteal", "forcedPayment", "counterspellRestoration"] } }),
   753 |     protection({ id: "teleport", name: "Teleport", rulesText: "Delay an effect until the start of the next matching phase during the next gym", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "delayParent", canRespondTo: ["delayableEffect"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Teleport is production-usable for exact declared Token events handled by the Control controller. Unsupported or nested response effects are hidden and fail before consumption.", requiredChoices: [], parentInteraction: "Close the parent as delayed and preserve one authoritative delayed-effect record. At the next Gym's matching phase, revalidate without retargeting and resolve using the actual resolution phase anchor.", persistence: "delayedEffectRecord", duration: "Until the start of the next matching phase during the next Gym", expirationPoint: "Terminal after resolution, gameplay-illegal no-effect, or system-failure cancellation and refund.", mechanicContract: { nextGymSamePhaseRequired: true, declarationPhaseAnchorPreserved: true, resolutionDurationAnchorsToActualResolutionPhase: true, revalidateAtReturn: true, gameplayIllegalityResult: "resolvedNoEffect", gameplayIllegalityConsumesTeleportAndParent: true, gameplayIllegalityRetargets: false, gameplayIllegalityRefunds: false, systemCorruptUnsupportedResult: "canceledRefunded", duplicateResolutionForbidden: true, refreshPersistenceRequired: true, supportedProductionParents: "exact declared Token events handled by the Control controller", unsupportedParentsFailBeforeConsumption: true } }),
   754 |     protection({ id: "substitute", name: "Substitute", rulesText: "Choose a Pokemon to protect from one effect. If it would be banned, it is not banned and cannot be banned again during this phase", isResponse: false, legalPhases: ["action", "teamBuilding"], timingWindows: ["action", "teamBuilding"], activationPattern: "proactive", requiresPendingEvent: false, targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "pokemon", applicationScope: "rosterInstance", affectedEntityType: "pokemon", targetControllerRelation: "self", selfOnly: true, magicianLegalAlternateTargetExplanation: "Magician may change the target only to another Pokemon owned by the Substitute user.", resolverMode: resolverModes.AUTOMATIC, resolverId: "substituteAttach", createsPendingEvent: false, opensResponseWindow: false, persistence: "lingeringEffect", duration: "Until used or Gym end", expirationPoint: "When its one-use protection is spent or at the approved End-of-Gym expiration checkpoint, whichever occurs first.", automaticMutations: ["Attach one-use Substitute protection to the selected roster instance", "Intercept after responses and before parent mutation", "Normally exempt only that roster instance", "Negate an entire species-wide Ban and create current-phase Ban protection"] }),
   755 |     protection({ id: "follow-me", name: "Follow Me", rulesText: "When Another Player Or Another Player's Pokemon Is Targeted By An Effect, Change The Target To You Or One Of Your Legal Pokemon Instead. The New Target Must Be A Legal Target For The Original Effect. After This Effect Resolves, For The Rest Of This Gym, Copy Each Token Used By The Player Whose Effect You Redirected. Follow Me Cannot Redirect Global Effects Or Effects That Do Not Target A Player Or Pokemon", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "redirectParentToSelf", copyActivationMode: copyActivationModes.FOLLOW_ME, canRespondTo: ["singlePlayerTarget", "rosterInstanceTarget"], parentInteraction: "Replace one corresponding target with the Follow Me user or one of that user's legal Pokemon, preserve unaffected targets, then after the redirected parent resolves create the Gym-long Copy relationship.", persistence: "lingeringEffect", duration: "Through the current Gym after the redirected parent resolves", expirationPoint: "End of Gym", effectTags: ["Redirect", "Copy"], runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Follow Me is unavailable because its Gym-long Copy relationship is not implemented and the mandatory/optional plus relative-resolution order of each later copied activation is not settled. No target is redirected and the Token is not consumed.", automaticMutations: ["Replace one corresponding parent target", "Preserve source, cost, text, target type, target count, and unaffected targets", "Record the redirected effect's source player", "Create a Gym-long ongoing Copy relationship after parent resolution"], mechanicContract: { initialRedirectOperation: "replaceOneCorrespondingTarget", requiresLegalCorrespondingTarget: true, excludesGlobalAndTargetlessEffects: true, preserveSourceCostTextTargetTypeTargetCountAndUnaffectedTargets: true, ongoingEffectBeginsAfterRedirectedParentResolves: true, ongoingEffectDuration: "currentGym", copyEachLaterTokenUsedByRecordedPlayer: true, copiedActivationChoiceRequirement: "needsRuling", copiedActivationRelativeOrder: "needsRuling", copySemanticsStatus: "settled" } }),
   756 |     protection({ id: "parting-shot", name: "Parting Shot", rulesText: "During Team Preview, switch a previewed Pokemon for another party Pokemon. Cursed-swap retaliation is tracked manually", isResponse: false, legalPhases: ["teamPreview"], timingWindows: ["teamPreview"], activationPattern: "phaseSpecific", activationType: "Team Preview declaration", requiresPendingEvent: false, createsPendingEvent: true, opensResponseWindow: true, targetType: "team", targetScope: "singleTeam", resolverMode: resolverModes.GUIDED, resolverId: "teamPreviewSwap", requiredChoices: ["Pokemon out", "Pokemon in"], guidedTask: { instruction: "Choose the revealed Pokemon leaving and the legal party Pokemon replacing it.", responsible: "Affected player", resultLabel: "Completed Swap", placeholder: "Abra out; Grovyle in", confirmationLabel: "Apply Team Swap" } }),
   757 |     protection({ id: "embargo", name: "Embargo", rulesText: "Target player can only use one more Token this gym. You cannot use another Token after this resolves", targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "playerStatus", persistence: "lingeringEffect", duration: "Until Gym end", expirationPoint: "At the approved End-of-Gym expiration checkpoint.", automaticMutations: ["Limit target to one more Token", "Prevent the acting player from using another Token this Gym"] }),
   758 |     protection({ id: "after-you", name: "After You", rulesText: "After a player declares an effect, copy and use it", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "copyParentEffect", copyActivationMode: copyActivationModes.AFTER_YOU, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "After You is unavailable because its fresh target/choice and explicit-cost controller is not implemented, and the copyable effect-source classes plus relative chain order are not settled.", requiredChoices: ["Copied effect target and choices"], guidedTask: { instruction: "Copy the parent effect, then enter fresh legal targets, choices, and any explicit costs required by that effect.", responsible: "Responding player", resultLabel: "Copied Effect Result", placeholder: "Describe target, choices, costs, and result", confirmationLabel: "Resolve Copied Effect" }, mechanicContract: { copyableSourceTypes: "needsRuling", copiedActivationRelativeOrder: "needsRuling" } }),
   759 |     protection({ id: "smokescreen", name: "Smokescreen", rulesText: "When You Or Your Pokemon Are Targetted For An Effect, Spin A Wheel With All Players. The Result Is The New Target Of That Effect. If Pokemon Are Targetted When This Is Used, Choose A Legal Target From That Player Landed On. Your Original Target Remains The Same", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "smokescreenRedirect", canRespondTo: ["singlePlayerTarget", "rosterInstanceTarget"], requiredChoices: ["Wheel result player", "One legal corresponding Pokemon when the parent targets Pokemon and the result changes player"], guidedTask: { instruction: "Spin once with every player represented exactly once. Keep the original target when its player wins or when another winning player has no legal corresponding target; otherwise choose one legal corresponding target owned by that player.", responsible: "Targeted player", resultLabel: "Redirect Result", placeholder: "Gold - Lucario", confirmationLabel: "Confirm Smokescreen" }, parentInteraction: "Replace the original selected target only when the wheel lands on another player with a legal corresponding target. Preserve the source, costs, text, target category, target count, and every unaffected target.", effectTags: ["Redirect"], runtimeUsability: runtimeUsabilityStatuses.GUIDED_ONLY, runtimeUsabilityReason: "Smokescreen uses the guided wheel and corresponding-target confirmation flow; it cannot fall back to additive or arbitrary target behavior.", mechanicContract: { targetOperation: "replaceOneCorrespondingTarget", wheelIncludesEveryPlayerExactlyOnce: true, originalPlayerResultKeepsTarget: true, playerParentUsesLandedPlayer: true, pokemonParentChoosesLegalPokemonOwnedByLandedPlayer: true, preserveSourceCostTextTargetCategoryTargetCountAndOtherTargets: true, noLegalCorrespondingTargetHandling: "keepOriginalTarget", redirectReplacement: true, recursiveWheel: false } }),
   760 |     protection({ id: "counterspell", name: "Counterspell", rulesText: "When One Of Your Tokens Is Negated, Use This Token. The Negated Token Is Not Consumed. That Token Cannot Be Used Again Until 2 Gyms Have Passed", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "restoreNegatedTokenWithCooldown", canRespondTo: ["negatedOwnTokenActivation"], requiredChoices: ["The user's exact negated Token inventory record"], persistence: "exactTokenCooldown", duration: "2 Gyms from the declaration phase anchor", expirationPoint: "At the same phase boundary two Gyms after Counterspell resolves", effectTags: ["Restore", "Cooldown"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Counterspell restores the exact negated owned Token on its persisted two-Gym phase-anchored cooldown.", automaticMutations: ["Restore the exact consumed Token inventory record", "Apply a two-Gym cooldown anchored to the declaration phase", "Keep the original activation negated"], mechanicContract: { requiresOwnedActivatedTokenNegated: true, originalTokenRemainsNegated: true, originalTokenDoesNotResolve: true, restoreExactTokenInventoryRecord: true, cooldownGyms: 2, cooldownScope: "exactRestoredToken", visibleWhileUnusable: true, normalUseReturnsAfterCooldown: true, explicitConsumptionException: true, preserveDeclarationNegationResponseRestorationCooldownRelationship: true, counterspellUsesUniversalLifecycle: true } }),
   761 |     protection({ id: "seven-tools", name: "7 Tools Of The Bandit", aliases: ["7 Tools", "Seven Tools"], rulesText: "When A Player Activates A Protection Token, Use This Token Immediately After. Negate That Protection Token, Then Copy It. The Copied Token Must Be Used During This Gym Or It Is Lost", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "counterProtection", copyActivationMode: copyActivationModes.TEMPORARY_INVENTORY, canRespondTo: ["protectionTokenActivation"], specialPriority: "Immediately after the targeted Protection Token activation", persistence: "temporaryCopiedToken", duration: "Until used or End of Gym", expirationPoint: "End of the current Gym if unused", effectTags: ["Negate", "Copy"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "7 Tools atomically negates the exact Protection response and creates its same-Gym temporary copy.", parentInteraction: "Negate the targeted Protection Token, keep it negated, then create one temporary copy for the 7 Tools user.", automaticMutations: ["Negate the targeted Protection Token", "Create one temporary copy for the 7 Tools user", "Retain copied Token timing, targeting, and effect rules", "Expire the temporary copy unused at End of Gym"], mechanicContract: { respondsOnlyToProtectionTokenActivation: true, negateTargetProtection: true, temporaryCopyCount: 1, copyOwner: "sevenToolsUser", preserveCopiedDefinitionTimingTargetsAndRules: true, permanentInventory: false, expiresAtEndOfCurrentGym: true, recordSourceDefinitionActivationOwnerCreationGymAndExpiration: true, safeguardCopyProtectionMustBeChecked: true, copyModelIsTokenSpecific: true, atomicResolutionRequired: true } }),
   762 |     protection({ id: "immunity", name: "Immunity", aliases: ["Emergency Immunity Token"], rulesText: "Negate any effect or global effect. Does not stop Series Restricts or bans", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "immunity", canRespondTo: ["targetedEffect", "globalEffect"], protectionScope: ["targetedEffect", "globalEffect"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Immunity atomically negates its exact current parent prompt and is covered across reload, undo, results, and sandbox isolation.", automaticMutations: ["Negate the parent prompt"] }),
   763 |     protection({ id: "revenge", name: "Revenge", rulesText: "After a Battle Phase where an opponent cursed a Pokemon you brought, release 2 Pokemon from their brought team and destroy the held item", isResponse: false, legalPhases: [], timingWindows: ["endOfBattlePhaseProcedure"], phaseBoundaryProcedure: "endOfBattlePhaseProcedure", explicitPhaseTiming: "postPayoutBeforeControl", activationPattern: "phaseBoundaryOptionalTrigger", activationType: "Post-payout optional offer", requiresPendingEvent: false, createsPendingEvent: true, opensResponseWindow: false, targetType: "team", targetScope: "singleTeam", targetControllerRelation: "otherPlayer", otherPlayerOnly: true, excludeActor: true, differentControllerRequired: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "revengeRelease", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Revenge is offered after payout from exact current-Gym Curse anchors and the immutable brought-team snapshot. It consumes only after the affected player confirms two exact Pokemon and an optional eligible held Item.", requiredChoices: ["Exactly two exact Pokemon from the offender's immutable brought team", "At most one eligible held item from those two"], guidedTask: { instruction: "Choose exactly two exact roster instances from the offending player's immutable brought-team snapshot, then optionally choose one eligible exactly referenced held item from those two.", responsible: "Affected player", resultLabel: "Revenge Choices", placeholder: "Two exact roster IDs and optional exact held item ID", confirmationLabel: "Apply Revenge" }, mechanicContract: { postPayoutBeforeControl: true, immutableBroughtSnapshotRequired: true, exactReleaseCount: 2, qualifyingCurseMustTargetExactBroughtInstance: true, heldItemSelectionMaximum: 1, heldItemMustBelongToSelectedReleasedPokemon: true, exactHeldInventoryReferenceRequired: true, masterBallTierProtected: true, sameNameInventoryGuessingForbidden: true, atomicResolutionRequired: true, idempotentResolutionRequired: true, adminUndoRequired: true, optionalOfferCanBeDeclinedWithoutConsumption: true, productionChoiceScreenRequired: true } }),
   764 | 
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 | 
   774 |     control({ id: "move-deleter", name: "Move Deleter", aliases: ["Move Deleter Curse"], rulesText: "Ban one move from being brought for 1 week. Cannot be used after team submission", targetType: "resource", targetScope: "singleResource", selectedTargetType: "move", applicationScope: "tableWide", affectedEntityType: "move", targetScopeStatus: "settled", targetControllerRelation: "notApplicable", minTargets: 1, maxTargets: 1, targetCollectionType: "canonicalMove", resolverMode: resolverModes.AUTOMATIC, resolverId: "moveBan", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Move Deleter records one canonical global move restriction for the next Gym and the Teambuilder and validator enforce it.", requiredChoices: ["One canonical move"], persistence: "lingeringEffect", duration: "Next Gym", expirationPoint: "End of the next Gym", automaticMutations: ["Create a global move restriction keyed by canonical move identity", "Disable the move in Teambuilder and team validation during the next Gym", "Expire the restriction when that Gym ends"] }),
   775 |     curse({ id: "toxic-curse", name: "Toxic Curse", rulesText: "Force a Pokemon to carry a Toxic Orb for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Toxic Orb status with exact protected-instance exclusions"] }),
   776 |     curse({ id: "iron-ball-curse", name: "Iron Ball Curse", rulesText: "Force a Pokemon to carry an Iron Ball for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Iron Ball status with exact protected-instance exclusions"] }),
   777 |     curse({ id: "flame-curse", name: "Flame Curse", rulesText: "Force a Pokemon to carry a Flame Orb for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", targetControllerRelation: "anyPlayer", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Flame Orb status with exact protected-instance exclusions"] }),
   778 |     curse({ id: "silencing-curse", name: "Silencing Curse", rulesText: "Restrict a Pokemon to 2 move slots for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide max-two-moves status with exact protected-instance exclusions", "Require explicit per-instance two-move repair where needed"] }),
   779 |     curse({ id: "knock-off-curse", name: "Knock Off Curse", rulesText: "Choose a Pokemon and an Item or TM move. If it is on the Pokemon, remove it from inventory. Masterball items are protected", targetType: "pokemon", targetScope: "rosterInstance", targetControllerRelation: "needsRuling", resolverMode: resolverModes.GUIDED, resolverId: "knockOff", runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Knock Off Curse is unavailable until the legal target-controller relationship is settled and exact Item/TM removal is implemented. The Token is not consumed.", requiredChoices: ["Item or TM name"], guidedTask: { instruction: "Name the Item or TM move to check on the selected Pokemon.", responsible: "Acting player", resultLabel: "Item or TM", placeholder: "Leftovers", confirmationLabel: "Resolve Knock Off" } }),
   780 |     curse({ id: "haze-curse", name: "Haze Curse", rulesText: "Select 2 Pokemon. Their buffs are negated for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "needsRuling", minTargets: 2, maxTargets: 2, targetCollectionType: "validatedRosterInstances", resolverMode: resolverModes.GUIDED, resolverId: "multiStatusEffect", runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Haze Curse is unavailable until the legal controllers for its two species anchors and its two-Gym expiration boundary are settled. The Token is not consumed.", requiredChoices: ["Exactly two Pokemon species anchors"], guidedTask: { instruction: "Choose exactly two Active Roster Pokemon as species anchors. Which controllers are legal remains Needs Ruling.", responsible: "Acting player", resultLabel: "Selected Species", placeholder: "Controller - Pokemon; Controller - Pokemon", confirmationLabel: "Apply Haze" }, persistence: "lingeringEffect", duration: "2 Gyms", expirationPoint: unresolvedMultiGymExpiration }),
   781 |     curse({ id: "imprison-curse", name: "Imprison Curse", rulesText: "Selected Pokemon cannot have EVs or IVs and must use a neutral nature for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide non-destructive no-EVs, no-IVs, neutral-Nature override with exact protected-instance exclusions"] }),
   782 |     curse({ id: "devolve-token", name: "Devolve", aliases: ["Devolve Token"], rulesText: "Selected Pokemon is devolved for 1 gym. During team submission, the target may adjust its set before preview", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "1 Gym", expirationPoint: unresolvedMultiGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Create species-wide Devolved status with exact protected-instance exclusions", "Permit Team Submission set revision"], runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Devolve is unavailable until branch/form selection, temporary species state, set revision, and exact restoration rules are canonical and implemented." }),
   783 |     curse({ id: "purge-curse", name: "Purge Curse", rulesText: "All Pokemon brought to this Battle Phase are released after battle completes. This Token ignores other effects", targetType: "player", targetScope: "singlePlayer", selectedTargetType: "player", applicationScope: "submittedTeamInstances", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "purgeAfterBattle", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Purge records an absolute target-player marker, then atomically releases that player's immutable brought-team snapshot after Gym payout.", opensResponseWindow: false, persistence: "lingeringEffect", duration: "Until the post-payout checkpoint of the current Battle Phase", expirationPoint: "Immediately after Gym payout and before ordinary Control Timing reopens.", automaticMutations: ["Create an absolute Purge marker without an ordinary response window", "Capture the immutable exact brought-team snapshot", "After payout release every exact brought roster instance atomically", "Ignore Substitute, Curse Immunity, redirection, negation, and other gameplay prevention"], mechanicContract: { postPayoutBeforeControl: true, immutableBroughtSnapshotRequired: true, absoluteGameplayEffect: true, canBeRespondedTo: false, canBeNegated: false, canBeRedirected: false, canBeProtected: false, ignoresSubstitute: true, ignoresCurseImmunity: true, atomicResolutionRequired: true, idempotentResolutionRequired: true, adminUndoRequired: true, systemFailureRollbackAndRefundRequired: true } }),
   784 |     curse({ id: "foresight-curse", name: "Foresight Curse", rulesText: "Choose 6 Pokemon. If Any Of Those Pokemon Are Brought To This Battle Phase, Their Sets Become Revealed To You. This Is Not A Nerf/Debuff", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "needsRuling", minTargets: 6, maxTargets: 6, targetCollectionType: "validatedRosterInstances", resolverMode: resolverModes.GUIDED, resolverId: "multiStatusEffect", requiredChoices: ["Exactly six Pokemon species anchors"], guidedTask: { instruction: "Choose exactly six Active Roster Pokemon as species anchors. If matching species are brought, reveal their sets only to the Foresight Curse user. Which controllers are legal remains Needs Ruling.", responsible: "Acting player", resultLabel: "Privately Marked Species", placeholder: "List the six selected Pokemon", confirmationLabel: "Apply Private Foresight" }, persistence: "privateInformationMarker", duration: "Current Battle Phase", expirationPoint: "At the end of the current Battle Phase after its private reveal obligation is complete.", visibility: "sourcePlayerOnly", effectClassification: "privateInformationMarkerNotDebuff", removableBy: [], runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Foresight Curse is unavailable because player-scoped private set delivery is not implemented. No selections or set data are placed in shared game state and the Token is not consumed.", mechanicContract: { selectionCount: 6, selectionUsesRosterInstanceAnchors: true, applicationScope: "globalSpecies", revealOnlyToSourcePlayer: true, authorizedViewer: "sourcePlayer", unauthorizedViewers: "everyOtherPlayer", hostAccessPolicy: "separateAdministrativeAuthorization", clientSideHidingSufficient: false, sharedStatePayloadMayContainSetData: false, automaticRevealEnabled: false, publicReveal: false, privateVisibilityData: true, nerfOrDebuff: false, removableByClearSmog: false, removableByGenericNerfRemoval: false, ownedPokemonRestriction: false, unauthorizedViewsMustNotReceiveOrRenderSetData: true } }),
```


### reroll-token

Occurrences: 3

#### Hit 1 — line 87

```text
    69 |       [copyActivationModes.FOLLOW_ME]: { ...common, sourceWindow: "laterTokensUsedByRecordedPlayer", lifetime: "currentGymRelationship" },
    70 |       [copyActivationModes.DITTO]: { ...common, sourceWindow: "oneChosenLegalTokenDefinition", lifetime: "oneActivation", excludesTickets: true },
    71 |       [copyActivationModes.CLASS_EFFECT]: { ...common, sourceWindow: "classEffectGrant", lifetime: "grantDefined" },
    72 |       [copyActivationModes.TEMPORARY_INVENTORY]: {
    73 |         ...common,
    74 |         createsInventoryRecord: true,
    75 |         sourceWindow: "exactNegatedProtectionToken",
    76 |         lifetime: "temporaryInventoryRecord",
    77 |         copiedActivationsCannotBeCopied: true
    78 |       }
    79 |     };
    80 |     return Object.freeze(policies[mode] || { ...common, sourceWindow: "unknown", lifetime: "unknown" });
    81 |   }
    82 | 
    83 |   const runtimeStatusGroups = Object.freeze({
    84 |     partial: [
    85 |       "restrict-token", "arena-trap", "clear-smog", "rage-candy-bar", "extra-ban-token", "unban-token", "steal-token",
    86 |       "incinerate", "wicked-blow", "cold-wave", "move-deleter", "smokescreen", "after-you", "ditto-token", "purge-curse", "teleport", "revenge",
    87 |       "safeguard", "substitute", "seven-tools", "counterspell", "follow-me", "embargo", "reroll-token",
    88 |       "devolve-token", "honey-token", "knock-off-curse", "haze-curse", "lingering-aroma"
    89 |     ],
    90 |     textOnly: [
    91 |       "class-change", "rebrand", "parting-shot",
    92 |       "repel-token", "quick-ball-token", "dream-ball-token", "master-ball-token", "beast-ball-token", "foresight-curse"
    93 |     ],
    94 |     blockedByRuling: []
    95 |   });
    96 | 
    97 |   const runtimeStatusById = Object.freeze(Object.fromEntries(Object.entries(runtimeStatusGroups)
    98 |     .flatMap(([status, ids]) => ids.map((id) => [id, status]))));
    99 | 
   100 |   const contractDefinitionRevision = "2026-08-04-lifecycle-completion-slice-v3";
   101 |   const registeredRuntimeVerificationTests = Object.freeze([
   102 |     "token-declaration-timing",
   103 |     "token-response-parent-chain",
   104 |     "token-multi-target-validation",
   105 |     "token-reload-persistence",
```


#### Hit 2 — line 330

```text
   312 |       evidence: "Explicit ongoing-only suppression, suppression-aware status and Follow Me consumption, duration-only exclusion, Gym-end behavior, production refresh, rendered suppressed state, causal History undo, and idempotent sandbox isolation are covered by TLS-001, TCI-014, BROWSER-025, and TSB-027.",
   313 |       verifiedAt: "2026-08-04",
   314 |       contractDefinitionRevision
   315 |     }),
   316 |     "wicked-blow": Object.freeze({
   317 |       status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
   318 |       tests: Object.freeze(["token-declaration-timing", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "lifecycle-completion-slice-e2e"]),
   319 |       evidence: "Own/rival exact Active-roster targeting, non-Active and stale rejection, stable identity, acquisition and Evolution Lock checks, exact team-reference coherence without new membership, set cleanup, refresh, causal History undo, unresolved mixed-tier branch fail-closed behavior, and sandbox isolation are covered by TLS-002, TCI-012, BROWSER-026, and TSB-022/027.",
   320 |       verifiedAt: "2026-08-04",
   321 |       contractDefinitionRevision
   322 |     }),
   323 |     "teleport": Object.freeze({
   324 |       status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
   325 |       tests: Object.freeze(["token-response-parent-chain", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "lifecycle-completion-slice-e2e"]),
   326 |       evidence: "Exact root-Control delay, matching-phase return, no-retarget revalidation, gameplay no-effect and system-failure split, duplicate-terminal prevention, refresh, merged causal History restoration of both exact Tokens, and sandbox isolation are covered by TLS-003, STR-009/011, BROWSER-011/027, and TSB-027.",
   327 |       verifiedAt: "2026-08-04",
   328 |       contractDefinitionRevision
   329 |     }),
   330 |     "reroll-token": Object.freeze({
   331 |       status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
   332 |       tests: Object.freeze(["encounter-token-runtime", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "lifecycle-completion-slice-e2e"]),
   333 |       evidence: "Exact unresolved Encounter and wheel result identity, canonical replacement, superseded original revision, stale rejection, duplicate operation identity, multiple-copy inventory safety, normal acquisition continuation, production refresh, causal History undo, and sandbox isolation are covered by TLS-004, BROWSER-028, and TSB-027.",
   334 |       verifiedAt: "2026-08-04",
   335 |       contractDefinitionRevision
   336 |     }),
   337 |     "honey-token": Object.freeze({
   338 |       status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
   339 |       tests: Object.freeze(["encounter-token-runtime", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "lifecycle-completion-slice-e2e"]),
   340 |       evidence: "Exact finalized Encounter selection, fresh nonrecursive copy identity, canonical species/form/tier/level and intrinsic payload, normal acquisition handoff, duplicate and stale safety, production refresh, causal History undo through acquired roster creation, and sandbox isolation are covered by TLS-005, SEB-004, BROWSER-029, and TSB-027.",
   341 |       verifiedAt: "2026-08-04",
   342 |       contractDefinitionRevision
   343 |     }),
   344 |     "purge-curse": Object.freeze({
   345 |       status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
   346 |       tests: Object.freeze(["token-declaration-timing", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "lifecycle-completion-slice-e2e"]),
   347 |       evidence: "Non-respondable declaration, immutable exact brought-team snapshot, post-payout blocking and atomic release, exact-ID same-species isolation, later-change preservation, duplicate prevention, production refresh, causal History undo, and sandbox isolation are covered by TLS-006, STR-007/010, BROWSER-030, and TSB-027.",
   348 |       verifiedAt: "2026-08-04",
```


#### Hit 3 — line 765

```text
   747 |     control({ id: "extra-ban-token", name: "Extra Ban", aliases: ["Extra Ban Token", "Ban Token"], rulesText: "Ban any Pokemon from play", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", selectedTargetRecordFields: ["selectedRosterInstanceId", "selectedSpeciesId"], applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", substituteInterceptionPolicy: "negateEntireEffect", substituteChecksSelectedTargetOnly: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "extraBan", persistence: "lingeringEffect", duration: "Indefinite", expirationPoint: "Removed by Unban or a rules reset", automaticMutations: ["Retain the selected Active-roster instance declaration anchor", "Check Substitute only on that selected instance", "Create species-wide Ban status if not intercepted", "Update global Pokemon legality"], mechanicContract: { activeRosterRequired: true, exactSelectedAnchorRequired: true, selectedAnchorSubstituteOnly: true, causalHistoryUndoRequired: true } }),
   748 |     control({ id: "unban-token", name: "Unban", aliases: ["Unban Token"], rulesText: "Unban a Pokemon. It cannot be banned again for 6 gyms", targetType: "pokemon", targetScope: "species", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "6 Gyms", expirationPoint: unresolvedMultiGymExpiration, automaticMutations: ["Remove active Ban or Restrict", "Create Unban protection", "Update global Pokemon legality"] }),
   749 |     control({ id: "incinerate", name: "Incinerate", rulesText: "Choose one Item or TM from every other player except Masterball items and remove it from their bag", targetType: "resource", targetScope: "allMatchingResources", selectedTargetType: "resource", applicationScope: "allPlayers", affectedEntityType: "resource", targetControllerRelation: "everyOtherPlayer", excludeActor: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "utilityEffect", requiredChoices: ["One exact legal Item or TM record from each other player who has one"], effectTags: ["Destroy"], automaticMutations: ["Validate one stable-ID non-Master-Ball Item or TM selection for each eligible opposing player", "Skip opposing players who have no legal target", "Atomically destroy every exact selected inventory record", "Record each destruction as a stable-ID effect operation"], mechanicContract: { resourceCategories: ["Item", "TM"], independentSelectionPerOtherPlayer: true, differentSelectionsAllowed: true, oneSelectedRecordPerEligibleOpponent: true, playersWithoutLegalTargetsAreSkipped: true, excludesSourcePlayer: true, excludesMasterBallItems: true, stableInventoryIdsRequired: true, emptyMatchResolvesNoEffect: true, atomicMutationRequired: true } }),
   750 |     control({ id: "steal-token", name: "Steal", rulesText: "Steal a Pokemon from another player", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "rosterInstance", affectedEntityType: "pokemon", targetControllerRelation: "differentController", otherPlayerOnly: true, excludeActor: true, differentControllerRequired: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "utilityEffect", effectTags: ["Steal"], automaticMutations: ["Transfer the exact selected Pokemon record to the acting player's Active roster", "Remove stale current-team references owned by the previous player", "Record the transfer as a stable-ID ownership operation"], mechanicContract: { exactRosterInstanceRequired: true, transfersToActingPlayerActiveRoster: true, formalStealTagRequired: true, stickyHoldBlocksAllPokemonSteal: true, safeguardDoesNotProtectPokemon: true, substituteMayProtectSelectedInstance: true, stablePokemonIdRequired: true, atomicMutationRequired: true } }),
   751 | 
   752 |     protection({ id: "safeguard", name: "Safeguard", rulesText: "Your Money And Tokens Cannot Be Stolen, Destroyed, Or Copied. You Are Unaffected By Follow Me And Embargo.", isResponse: false, usesControlTiming: true, controlWindowRequired: true, legalControlContexts: ordinaryControlContexts, activationPattern: "proactive", activationType: "Declaration", requiresPendingEvent: false, targetType: "player", targetScope: "singlePlayer", targetControllerRelation: "self", selfOnly: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "safeguard", createsPendingEvent: true, opensResponseWindow: true, canBeRespondedTo: true, persistence: "lingeringEffect", duration: "Until Gym end", expirationPoint: "At the approved End-of-Gym expiration checkpoint.", protectionScope: ["moneySteal", "moneyDestroy", "moneyCopy", "tokenSteal", "tokenDestroy", "tokenCopy", "followMe", "embargo"], automaticMutations: ["Create exact-player Safeguard protection", "Block only canonical Safeguard operation categories"], mechanicContract: { exactPlayerScopeRequired: true, categoryMatrixRequired: true, protectedCategories: ["moneySteal", "moneyDestroy", "moneyCopy", "tokenSteal", "tokenDestroy", "tokenCopy", "followMe", "embargo"], explicitNonProtectedCategories: ["itemSteal", "itemDestroy", "tmSteal", "tmDestroy", "pokemonSteal", "forcedPayment", "counterspellRestoration"] } }),
   753 |     protection({ id: "teleport", name: "Teleport", rulesText: "Delay an effect until the start of the next matching phase during the next gym", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "delayParent", canRespondTo: ["delayableEffect"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Teleport is production-usable for exact declared Token events handled by the Control controller. Unsupported or nested response effects are hidden and fail before consumption.", requiredChoices: [], parentInteraction: "Close the parent as delayed and preserve one authoritative delayed-effect record. At the next Gym's matching phase, revalidate without retargeting and resolve using the actual resolution phase anchor.", persistence: "delayedEffectRecord", duration: "Until the start of the next matching phase during the next Gym", expirationPoint: "Terminal after resolution, gameplay-illegal no-effect, or system-failure cancellation and refund.", mechanicContract: { nextGymSamePhaseRequired: true, declarationPhaseAnchorPreserved: true, resolutionDurationAnchorsToActualResolutionPhase: true, revalidateAtReturn: true, gameplayIllegalityResult: "resolvedNoEffect", gameplayIllegalityConsumesTeleportAndParent: true, gameplayIllegalityRetargets: false, gameplayIllegalityRefunds: false, systemCorruptUnsupportedResult: "canceledRefunded", duplicateResolutionForbidden: true, refreshPersistenceRequired: true, supportedProductionParents: "exact declared Token events handled by the Control controller", unsupportedParentsFailBeforeConsumption: true } }),
   754 |     protection({ id: "substitute", name: "Substitute", rulesText: "Choose a Pokemon to protect from one effect. If it would be banned, it is not banned and cannot be banned again during this phase", isResponse: false, legalPhases: ["action", "teamBuilding"], timingWindows: ["action", "teamBuilding"], activationPattern: "proactive", requiresPendingEvent: false, targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "pokemon", applicationScope: "rosterInstance", affectedEntityType: "pokemon", targetControllerRelation: "self", selfOnly: true, magicianLegalAlternateTargetExplanation: "Magician may change the target only to another Pokemon owned by the Substitute user.", resolverMode: resolverModes.AUTOMATIC, resolverId: "substituteAttach", createsPendingEvent: false, opensResponseWindow: false, persistence: "lingeringEffect", duration: "Until used or Gym end", expirationPoint: "When its one-use protection is spent or at the approved End-of-Gym expiration checkpoint, whichever occurs first.", automaticMutations: ["Attach one-use Substitute protection to the selected roster instance", "Intercept after responses and before parent mutation", "Normally exempt only that roster instance", "Negate an entire species-wide Ban and create current-phase Ban protection"] }),
   755 |     protection({ id: "follow-me", name: "Follow Me", rulesText: "When Another Player Or Another Player's Pokemon Is Targeted By An Effect, Change The Target To You Or One Of Your Legal Pokemon Instead. The New Target Must Be A Legal Target For The Original Effect. After This Effect Resolves, For The Rest Of This Gym, Copy Each Token Used By The Player Whose Effect You Redirected. Follow Me Cannot Redirect Global Effects Or Effects That Do Not Target A Player Or Pokemon", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "redirectParentToSelf", copyActivationMode: copyActivationModes.FOLLOW_ME, canRespondTo: ["singlePlayerTarget", "rosterInstanceTarget"], parentInteraction: "Replace one corresponding target with the Follow Me user or one of that user's legal Pokemon, preserve unaffected targets, then after the redirected parent resolves create the Gym-long Copy relationship.", persistence: "lingeringEffect", duration: "Through the current Gym after the redirected parent resolves", expirationPoint: "End of Gym", effectTags: ["Redirect", "Copy"], runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Follow Me is unavailable because its Gym-long Copy relationship is not implemented and the mandatory/optional plus relative-resolution order of each later copied activation is not settled. No target is redirected and the Token is not consumed.", automaticMutations: ["Replace one corresponding parent target", "Preserve source, cost, text, target type, target count, and unaffected targets", "Record the redirected effect's source player", "Create a Gym-long ongoing Copy relationship after parent resolution"], mechanicContract: { initialRedirectOperation: "replaceOneCorrespondingTarget", requiresLegalCorrespondingTarget: true, excludesGlobalAndTargetlessEffects: true, preserveSourceCostTextTargetTypeTargetCountAndUnaffectedTargets: true, ongoingEffectBeginsAfterRedirectedParentResolves: true, ongoingEffectDuration: "currentGym", copyEachLaterTokenUsedByRecordedPlayer: true, copiedActivationChoiceRequirement: "needsRuling", copiedActivationRelativeOrder: "needsRuling", copySemanticsStatus: "settled" } }),
   756 |     protection({ id: "parting-shot", name: "Parting Shot", rulesText: "During Team Preview, switch a previewed Pokemon for another party Pokemon. Cursed-swap retaliation is tracked manually", isResponse: false, legalPhases: ["teamPreview"], timingWindows: ["teamPreview"], activationPattern: "phaseSpecific", activationType: "Team Preview declaration", requiresPendingEvent: false, createsPendingEvent: true, opensResponseWindow: true, targetType: "team", targetScope: "singleTeam", resolverMode: resolverModes.GUIDED, resolverId: "teamPreviewSwap", requiredChoices: ["Pokemon out", "Pokemon in"], guidedTask: { instruction: "Choose the revealed Pokemon leaving and the legal party Pokemon replacing it.", responsible: "Affected player", resultLabel: "Completed Swap", placeholder: "Abra out; Grovyle in", confirmationLabel: "Apply Team Swap" } }),
   757 |     protection({ id: "embargo", name: "Embargo", rulesText: "Target player can only use one more Token this gym. You cannot use another Token after this resolves", targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "playerStatus", persistence: "lingeringEffect", duration: "Until Gym end", expirationPoint: "At the approved End-of-Gym expiration checkpoint.", automaticMutations: ["Limit target to one more Token", "Prevent the acting player from using another Token this Gym"] }),
   758 |     protection({ id: "after-you", name: "After You", rulesText: "After a player declares an effect, copy and use it", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "copyParentEffect", copyActivationMode: copyActivationModes.AFTER_YOU, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "After You is unavailable because its fresh target/choice and explicit-cost controller is not implemented, and the copyable effect-source classes plus relative chain order are not settled.", requiredChoices: ["Copied effect target and choices"], guidedTask: { instruction: "Copy the parent effect, then enter fresh legal targets, choices, and any explicit costs required by that effect.", responsible: "Responding player", resultLabel: "Copied Effect Result", placeholder: "Describe target, choices, costs, and result", confirmationLabel: "Resolve Copied Effect" }, mechanicContract: { copyableSourceTypes: "needsRuling", copiedActivationRelativeOrder: "needsRuling" } }),
   759 |     protection({ id: "smokescreen", name: "Smokescreen", rulesText: "When You Or Your Pokemon Are Targetted For An Effect, Spin A Wheel With All Players. The Result Is The New Target Of That Effect. If Pokemon Are Targetted When This Is Used, Choose A Legal Target From That Player Landed On. Your Original Target Remains The Same", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "smokescreenRedirect", canRespondTo: ["singlePlayerTarget", "rosterInstanceTarget"], requiredChoices: ["Wheel result player", "One legal corresponding Pokemon when the parent targets Pokemon and the result changes player"], guidedTask: { instruction: "Spin once with every player represented exactly once. Keep the original target when its player wins or when another winning player has no legal corresponding target; otherwise choose one legal corresponding target owned by that player.", responsible: "Targeted player", resultLabel: "Redirect Result", placeholder: "Gold - Lucario", confirmationLabel: "Confirm Smokescreen" }, parentInteraction: "Replace the original selected target only when the wheel lands on another player with a legal corresponding target. Preserve the source, costs, text, target category, target count, and every unaffected target.", effectTags: ["Redirect"], runtimeUsability: runtimeUsabilityStatuses.GUIDED_ONLY, runtimeUsabilityReason: "Smokescreen uses the guided wheel and corresponding-target confirmation flow; it cannot fall back to additive or arbitrary target behavior.", mechanicContract: { targetOperation: "replaceOneCorrespondingTarget", wheelIncludesEveryPlayerExactlyOnce: true, originalPlayerResultKeepsTarget: true, playerParentUsesLandedPlayer: true, pokemonParentChoosesLegalPokemonOwnedByLandedPlayer: true, preserveSourceCostTextTargetCategoryTargetCountAndOtherTargets: true, noLegalCorrespondingTargetHandling: "keepOriginalTarget", redirectReplacement: true, recursiveWheel: false } }),
   760 |     protection({ id: "counterspell", name: "Counterspell", rulesText: "When One Of Your Tokens Is Negated, Use This Token. The Negated Token Is Not Consumed. That Token Cannot Be Used Again Until 2 Gyms Have Passed", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "restoreNegatedTokenWithCooldown", canRespondTo: ["negatedOwnTokenActivation"], requiredChoices: ["The user's exact negated Token inventory record"], persistence: "exactTokenCooldown", duration: "2 Gyms from the declaration phase anchor", expirationPoint: "At the same phase boundary two Gyms after Counterspell resolves", effectTags: ["Restore", "Cooldown"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Counterspell restores the exact negated owned Token on its persisted two-Gym phase-anchored cooldown.", automaticMutations: ["Restore the exact consumed Token inventory record", "Apply a two-Gym cooldown anchored to the declaration phase", "Keep the original activation negated"], mechanicContract: { requiresOwnedActivatedTokenNegated: true, originalTokenRemainsNegated: true, originalTokenDoesNotResolve: true, restoreExactTokenInventoryRecord: true, cooldownGyms: 2, cooldownScope: "exactRestoredToken", visibleWhileUnusable: true, normalUseReturnsAfterCooldown: true, explicitConsumptionException: true, preserveDeclarationNegationResponseRestorationCooldownRelationship: true, counterspellUsesUniversalLifecycle: true } }),
   761 |     protection({ id: "seven-tools", name: "7 Tools Of The Bandit", aliases: ["7 Tools", "Seven Tools"], rulesText: "When A Player Activates A Protection Token, Use This Token Immediately After. Negate That Protection Token, Then Copy It. The Copied Token Must Be Used During This Gym Or It Is Lost", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "counterProtection", copyActivationMode: copyActivationModes.TEMPORARY_INVENTORY, canRespondTo: ["protectionTokenActivation"], specialPriority: "Immediately after the targeted Protection Token activation", persistence: "temporaryCopiedToken", duration: "Until used or End of Gym", expirationPoint: "End of the current Gym if unused", effectTags: ["Negate", "Copy"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "7 Tools atomically negates the exact Protection response and creates its same-Gym temporary copy.", parentInteraction: "Negate the targeted Protection Token, keep it negated, then create one temporary copy for the 7 Tools user.", automaticMutations: ["Negate the targeted Protection Token", "Create one temporary copy for the 7 Tools user", "Retain copied Token timing, targeting, and effect rules", "Expire the temporary copy unused at End of Gym"], mechanicContract: { respondsOnlyToProtectionTokenActivation: true, negateTargetProtection: true, temporaryCopyCount: 1, copyOwner: "sevenToolsUser", preserveCopiedDefinitionTimingTargetsAndRules: true, permanentInventory: false, expiresAtEndOfCurrentGym: true, recordSourceDefinitionActivationOwnerCreationGymAndExpiration: true, safeguardCopyProtectionMustBeChecked: true, copyModelIsTokenSpecific: true, atomicResolutionRequired: true } }),
   762 |     protection({ id: "immunity", name: "Immunity", aliases: ["Emergency Immunity Token"], rulesText: "Negate any effect or global effect. Does not stop Series Restricts or bans", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "immunity", canRespondTo: ["targetedEffect", "globalEffect"], protectionScope: ["targetedEffect", "globalEffect"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Immunity atomically negates its exact current parent prompt and is covered across reload, undo, results, and sandbox isolation.", automaticMutations: ["Negate the parent prompt"] }),
   763 |     protection({ id: "revenge", name: "Revenge", rulesText: "After a Battle Phase where an opponent cursed a Pokemon you brought, release 2 Pokemon from their brought team and destroy the held item", isResponse: false, legalPhases: [], timingWindows: ["endOfBattlePhaseProcedure"], phaseBoundaryProcedure: "endOfBattlePhaseProcedure", explicitPhaseTiming: "postPayoutBeforeControl", activationPattern: "phaseBoundaryOptionalTrigger", activationType: "Post-payout optional offer", requiresPendingEvent: false, createsPendingEvent: true, opensResponseWindow: false, targetType: "team", targetScope: "singleTeam", targetControllerRelation: "otherPlayer", otherPlayerOnly: true, excludeActor: true, differentControllerRequired: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "revengeRelease", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Revenge is offered after payout from exact current-Gym Curse anchors and the immutable brought-team snapshot. It consumes only after the affected player confirms two exact Pokemon and an optional eligible held Item.", requiredChoices: ["Exactly two exact Pokemon from the offender's immutable brought team", "At most one eligible held item from those two"], guidedTask: { instruction: "Choose exactly two exact roster instances from the offending player's immutable brought-team snapshot, then optionally choose one eligible exactly referenced held item from those two.", responsible: "Affected player", resultLabel: "Revenge Choices", placeholder: "Two exact roster IDs and optional exact held item ID", confirmationLabel: "Apply Revenge" }, mechanicContract: { postPayoutBeforeControl: true, immutableBroughtSnapshotRequired: true, exactReleaseCount: 2, qualifyingCurseMustTargetExactBroughtInstance: true, heldItemSelectionMaximum: 1, heldItemMustBelongToSelectedReleasedPokemon: true, exactHeldInventoryReferenceRequired: true, masterBallTierProtected: true, sameNameInventoryGuessingForbidden: true, atomicResolutionRequired: true, idempotentResolutionRequired: true, adminUndoRequired: true, optionalOfferCanBeDeclinedWithoutConsumption: true, productionChoiceScreenRequired: true } }),
   764 | 
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 | 
   774 |     control({ id: "move-deleter", name: "Move Deleter", aliases: ["Move Deleter Curse"], rulesText: "Ban one move from being brought for 1 week. Cannot be used after team submission", targetType: "resource", targetScope: "singleResource", selectedTargetType: "move", applicationScope: "tableWide", affectedEntityType: "move", targetScopeStatus: "settled", targetControllerRelation: "notApplicable", minTargets: 1, maxTargets: 1, targetCollectionType: "canonicalMove", resolverMode: resolverModes.AUTOMATIC, resolverId: "moveBan", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Move Deleter records one canonical global move restriction for the next Gym and the Teambuilder and validator enforce it.", requiredChoices: ["One canonical move"], persistence: "lingeringEffect", duration: "Next Gym", expirationPoint: "End of the next Gym", automaticMutations: ["Create a global move restriction keyed by canonical move identity", "Disable the move in Teambuilder and team validation during the next Gym", "Expire the restriction when that Gym ends"] }),
   775 |     curse({ id: "toxic-curse", name: "Toxic Curse", rulesText: "Force a Pokemon to carry a Toxic Orb for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Toxic Orb status with exact protected-instance exclusions"] }),
   776 |     curse({ id: "iron-ball-curse", name: "Iron Ball Curse", rulesText: "Force a Pokemon to carry an Iron Ball for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Iron Ball status with exact protected-instance exclusions"] }),
   777 |     curse({ id: "flame-curse", name: "Flame Curse", rulesText: "Force a Pokemon to carry a Flame Orb for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", targetControllerRelation: "anyPlayer", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Flame Orb status with exact protected-instance exclusions"] }),
   778 |     curse({ id: "silencing-curse", name: "Silencing Curse", rulesText: "Restrict a Pokemon to 2 move slots for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide max-two-moves status with exact protected-instance exclusions", "Require explicit per-instance two-move repair where needed"] }),
   779 |     curse({ id: "knock-off-curse", name: "Knock Off Curse", rulesText: "Choose a Pokemon and an Item or TM move. If it is on the Pokemon, remove it from inventory. Masterball items are protected", targetType: "pokemon", targetScope: "rosterInstance", targetControllerRelation: "needsRuling", resolverMode: resolverModes.GUIDED, resolverId: "knockOff", runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Knock Off Curse is unavailable until the legal target-controller relationship is settled and exact Item/TM removal is implemented. The Token is not consumed.", requiredChoices: ["Item or TM name"], guidedTask: { instruction: "Name the Item or TM move to check on the selected Pokemon.", responsible: "Acting player", resultLabel: "Item or TM", placeholder: "Leftovers", confirmationLabel: "Resolve Knock Off" } }),
   780 |     curse({ id: "haze-curse", name: "Haze Curse", rulesText: "Select 2 Pokemon. Their buffs are negated for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "needsRuling", minTargets: 2, maxTargets: 2, targetCollectionType: "validatedRosterInstances", resolverMode: resolverModes.GUIDED, resolverId: "multiStatusEffect", runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Haze Curse is unavailable until the legal controllers for its two species anchors and its two-Gym expiration boundary are settled. The Token is not consumed.", requiredChoices: ["Exactly two Pokemon species anchors"], guidedTask: { instruction: "Choose exactly two Active Roster Pokemon as species anchors. Which controllers are legal remains Needs Ruling.", responsible: "Acting player", resultLabel: "Selected Species", placeholder: "Controller - Pokemon; Controller - Pokemon", confirmationLabel: "Apply Haze" }, persistence: "lingeringEffect", duration: "2 Gyms", expirationPoint: unresolvedMultiGymExpiration }),
   781 |     curse({ id: "imprison-curse", name: "Imprison Curse", rulesText: "Selected Pokemon cannot have EVs or IVs and must use a neutral nature for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide non-destructive no-EVs, no-IVs, neutral-Nature override with exact protected-instance exclusions"] }),
   782 |     curse({ id: "devolve-token", name: "Devolve", aliases: ["Devolve Token"], rulesText: "Selected Pokemon is devolved for 1 gym. During team submission, the target may adjust its set before preview", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "1 Gym", expirationPoint: unresolvedMultiGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Create species-wide Devolved status with exact protected-instance exclusions", "Permit Team Submission set revision"], runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Devolve is unavailable until branch/form selection, temporary species state, set revision, and exact restoration rules are canonical and implemented." }),
   783 |     curse({ id: "purge-curse", name: "Purge Curse", rulesText: "All Pokemon brought to this Battle Phase are released after battle completes. This Token ignores other effects", targetType: "player", targetScope: "singlePlayer", selectedTargetType: "player", applicationScope: "submittedTeamInstances", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "purgeAfterBattle", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Purge records an absolute target-player marker, then atomically releases that player's immutable brought-team snapshot after Gym payout.", opensResponseWindow: false, persistence: "lingeringEffect", duration: "Until the post-payout checkpoint of the current Battle Phase", expirationPoint: "Immediately after Gym payout and before ordinary Control Timing reopens.", automaticMutations: ["Create an absolute Purge marker without an ordinary response window", "Capture the immutable exact brought-team snapshot", "After payout release every exact brought roster instance atomically", "Ignore Substitute, Curse Immunity, redirection, negation, and other gameplay prevention"], mechanicContract: { postPayoutBeforeControl: true, immutableBroughtSnapshotRequired: true, absoluteGameplayEffect: true, canBeRespondedTo: false, canBeNegated: false, canBeRedirected: false, canBeProtected: false, ignoresSubstitute: true, ignoresCurseImmunity: true, atomicResolutionRequired: true, idempotentResolutionRequired: true, adminUndoRequired: true, systemFailureRollbackAndRefundRequired: true } }),
```


### repel-token

Occurrences: 2

#### Hit 1 — line 92

```text
    74 |         createsInventoryRecord: true,
    75 |         sourceWindow: "exactNegatedProtectionToken",
    76 |         lifetime: "temporaryInventoryRecord",
    77 |         copiedActivationsCannotBeCopied: true
    78 |       }
    79 |     };
    80 |     return Object.freeze(policies[mode] || { ...common, sourceWindow: "unknown", lifetime: "unknown" });
    81 |   }
    82 | 
    83 |   const runtimeStatusGroups = Object.freeze({
    84 |     partial: [
    85 |       "restrict-token", "arena-trap", "clear-smog", "rage-candy-bar", "extra-ban-token", "unban-token", "steal-token",
    86 |       "incinerate", "wicked-blow", "cold-wave", "move-deleter", "smokescreen", "after-you", "ditto-token", "purge-curse", "teleport", "revenge",
    87 |       "safeguard", "substitute", "seven-tools", "counterspell", "follow-me", "embargo", "reroll-token",
    88 |       "devolve-token", "honey-token", "knock-off-curse", "haze-curse", "lingering-aroma"
    89 |     ],
    90 |     textOnly: [
    91 |       "class-change", "rebrand", "parting-shot",
    92 |       "repel-token", "quick-ball-token", "dream-ball-token", "master-ball-token", "beast-ball-token", "foresight-curse"
    93 |     ],
    94 |     blockedByRuling: []
    95 |   });
    96 | 
    97 |   const runtimeStatusById = Object.freeze(Object.fromEntries(Object.entries(runtimeStatusGroups)
    98 |     .flatMap(([status, ids]) => ids.map((id) => [id, status]))));
    99 | 
   100 |   const contractDefinitionRevision = "2026-08-04-lifecycle-completion-slice-v3";
   101 |   const registeredRuntimeVerificationTests = Object.freeze([
   102 |     "token-declaration-timing",
   103 |     "token-response-parent-chain",
   104 |     "token-multi-target-validation",
   105 |     "token-reload-persistence",
   106 |     "token-sandbox-isolation",
   107 |     "token-undo-repair",
   108 |     "token-inventory-runtime",
   109 |     "standard-curse-species-lifecycle",
   110 |     "encounter-token-runtime",
```


#### Hit 2 — line 767

```text
   749 |     control({ id: "incinerate", name: "Incinerate", rulesText: "Choose one Item or TM from every other player except Masterball items and remove it from their bag", targetType: "resource", targetScope: "allMatchingResources", selectedTargetType: "resource", applicationScope: "allPlayers", affectedEntityType: "resource", targetControllerRelation: "everyOtherPlayer", excludeActor: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "utilityEffect", requiredChoices: ["One exact legal Item or TM record from each other player who has one"], effectTags: ["Destroy"], automaticMutations: ["Validate one stable-ID non-Master-Ball Item or TM selection for each eligible opposing player", "Skip opposing players who have no legal target", "Atomically destroy every exact selected inventory record", "Record each destruction as a stable-ID effect operation"], mechanicContract: { resourceCategories: ["Item", "TM"], independentSelectionPerOtherPlayer: true, differentSelectionsAllowed: true, oneSelectedRecordPerEligibleOpponent: true, playersWithoutLegalTargetsAreSkipped: true, excludesSourcePlayer: true, excludesMasterBallItems: true, stableInventoryIdsRequired: true, emptyMatchResolvesNoEffect: true, atomicMutationRequired: true } }),
   750 |     control({ id: "steal-token", name: "Steal", rulesText: "Steal a Pokemon from another player", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "rosterInstance", affectedEntityType: "pokemon", targetControllerRelation: "differentController", otherPlayerOnly: true, excludeActor: true, differentControllerRequired: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "utilityEffect", effectTags: ["Steal"], automaticMutations: ["Transfer the exact selected Pokemon record to the acting player's Active roster", "Remove stale current-team references owned by the previous player", "Record the transfer as a stable-ID ownership operation"], mechanicContract: { exactRosterInstanceRequired: true, transfersToActingPlayerActiveRoster: true, formalStealTagRequired: true, stickyHoldBlocksAllPokemonSteal: true, safeguardDoesNotProtectPokemon: true, substituteMayProtectSelectedInstance: true, stablePokemonIdRequired: true, atomicMutationRequired: true } }),
   751 | 
   752 |     protection({ id: "safeguard", name: "Safeguard", rulesText: "Your Money And Tokens Cannot Be Stolen, Destroyed, Or Copied. You Are Unaffected By Follow Me And Embargo.", isResponse: false, usesControlTiming: true, controlWindowRequired: true, legalControlContexts: ordinaryControlContexts, activationPattern: "proactive", activationType: "Declaration", requiresPendingEvent: false, targetType: "player", targetScope: "singlePlayer", targetControllerRelation: "self", selfOnly: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "safeguard", createsPendingEvent: true, opensResponseWindow: true, canBeRespondedTo: true, persistence: "lingeringEffect", duration: "Until Gym end", expirationPoint: "At the approved End-of-Gym expiration checkpoint.", protectionScope: ["moneySteal", "moneyDestroy", "moneyCopy", "tokenSteal", "tokenDestroy", "tokenCopy", "followMe", "embargo"], automaticMutations: ["Create exact-player Safeguard protection", "Block only canonical Safeguard operation categories"], mechanicContract: { exactPlayerScopeRequired: true, categoryMatrixRequired: true, protectedCategories: ["moneySteal", "moneyDestroy", "moneyCopy", "tokenSteal", "tokenDestroy", "tokenCopy", "followMe", "embargo"], explicitNonProtectedCategories: ["itemSteal", "itemDestroy", "tmSteal", "tmDestroy", "pokemonSteal", "forcedPayment", "counterspellRestoration"] } }),
   753 |     protection({ id: "teleport", name: "Teleport", rulesText: "Delay an effect until the start of the next matching phase during the next gym", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "delayParent", canRespondTo: ["delayableEffect"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Teleport is production-usable for exact declared Token events handled by the Control controller. Unsupported or nested response effects are hidden and fail before consumption.", requiredChoices: [], parentInteraction: "Close the parent as delayed and preserve one authoritative delayed-effect record. At the next Gym's matching phase, revalidate without retargeting and resolve using the actual resolution phase anchor.", persistence: "delayedEffectRecord", duration: "Until the start of the next matching phase during the next Gym", expirationPoint: "Terminal after resolution, gameplay-illegal no-effect, or system-failure cancellation and refund.", mechanicContract: { nextGymSamePhaseRequired: true, declarationPhaseAnchorPreserved: true, resolutionDurationAnchorsToActualResolutionPhase: true, revalidateAtReturn: true, gameplayIllegalityResult: "resolvedNoEffect", gameplayIllegalityConsumesTeleportAndParent: true, gameplayIllegalityRetargets: false, gameplayIllegalityRefunds: false, systemCorruptUnsupportedResult: "canceledRefunded", duplicateResolutionForbidden: true, refreshPersistenceRequired: true, supportedProductionParents: "exact declared Token events handled by the Control controller", unsupportedParentsFailBeforeConsumption: true } }),
   754 |     protection({ id: "substitute", name: "Substitute", rulesText: "Choose a Pokemon to protect from one effect. If it would be banned, it is not banned and cannot be banned again during this phase", isResponse: false, legalPhases: ["action", "teamBuilding"], timingWindows: ["action", "teamBuilding"], activationPattern: "proactive", requiresPendingEvent: false, targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "pokemon", applicationScope: "rosterInstance", affectedEntityType: "pokemon", targetControllerRelation: "self", selfOnly: true, magicianLegalAlternateTargetExplanation: "Magician may change the target only to another Pokemon owned by the Substitute user.", resolverMode: resolverModes.AUTOMATIC, resolverId: "substituteAttach", createsPendingEvent: false, opensResponseWindow: false, persistence: "lingeringEffect", duration: "Until used or Gym end", expirationPoint: "When its one-use protection is spent or at the approved End-of-Gym expiration checkpoint, whichever occurs first.", automaticMutations: ["Attach one-use Substitute protection to the selected roster instance", "Intercept after responses and before parent mutation", "Normally exempt only that roster instance", "Negate an entire species-wide Ban and create current-phase Ban protection"] }),
   755 |     protection({ id: "follow-me", name: "Follow Me", rulesText: "When Another Player Or Another Player's Pokemon Is Targeted By An Effect, Change The Target To You Or One Of Your Legal Pokemon Instead. The New Target Must Be A Legal Target For The Original Effect. After This Effect Resolves, For The Rest Of This Gym, Copy Each Token Used By The Player Whose Effect You Redirected. Follow Me Cannot Redirect Global Effects Or Effects That Do Not Target A Player Or Pokemon", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "redirectParentToSelf", copyActivationMode: copyActivationModes.FOLLOW_ME, canRespondTo: ["singlePlayerTarget", "rosterInstanceTarget"], parentInteraction: "Replace one corresponding target with the Follow Me user or one of that user's legal Pokemon, preserve unaffected targets, then after the redirected parent resolves create the Gym-long Copy relationship.", persistence: "lingeringEffect", duration: "Through the current Gym after the redirected parent resolves", expirationPoint: "End of Gym", effectTags: ["Redirect", "Copy"], runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Follow Me is unavailable because its Gym-long Copy relationship is not implemented and the mandatory/optional plus relative-resolution order of each later copied activation is not settled. No target is redirected and the Token is not consumed.", automaticMutations: ["Replace one corresponding parent target", "Preserve source, cost, text, target type, target count, and unaffected targets", "Record the redirected effect's source player", "Create a Gym-long ongoing Copy relationship after parent resolution"], mechanicContract: { initialRedirectOperation: "replaceOneCorrespondingTarget", requiresLegalCorrespondingTarget: true, excludesGlobalAndTargetlessEffects: true, preserveSourceCostTextTargetTypeTargetCountAndUnaffectedTargets: true, ongoingEffectBeginsAfterRedirectedParentResolves: true, ongoingEffectDuration: "currentGym", copyEachLaterTokenUsedByRecordedPlayer: true, copiedActivationChoiceRequirement: "needsRuling", copiedActivationRelativeOrder: "needsRuling", copySemanticsStatus: "settled" } }),
   756 |     protection({ id: "parting-shot", name: "Parting Shot", rulesText: "During Team Preview, switch a previewed Pokemon for another party Pokemon. Cursed-swap retaliation is tracked manually", isResponse: false, legalPhases: ["teamPreview"], timingWindows: ["teamPreview"], activationPattern: "phaseSpecific", activationType: "Team Preview declaration", requiresPendingEvent: false, createsPendingEvent: true, opensResponseWindow: true, targetType: "team", targetScope: "singleTeam", resolverMode: resolverModes.GUIDED, resolverId: "teamPreviewSwap", requiredChoices: ["Pokemon out", "Pokemon in"], guidedTask: { instruction: "Choose the revealed Pokemon leaving and the legal party Pokemon replacing it.", responsible: "Affected player", resultLabel: "Completed Swap", placeholder: "Abra out; Grovyle in", confirmationLabel: "Apply Team Swap" } }),
   757 |     protection({ id: "embargo", name: "Embargo", rulesText: "Target player can only use one more Token this gym. You cannot use another Token after this resolves", targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "playerStatus", persistence: "lingeringEffect", duration: "Until Gym end", expirationPoint: "At the approved End-of-Gym expiration checkpoint.", automaticMutations: ["Limit target to one more Token", "Prevent the acting player from using another Token this Gym"] }),
   758 |     protection({ id: "after-you", name: "After You", rulesText: "After a player declares an effect, copy and use it", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "copyParentEffect", copyActivationMode: copyActivationModes.AFTER_YOU, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "After You is unavailable because its fresh target/choice and explicit-cost controller is not implemented, and the copyable effect-source classes plus relative chain order are not settled.", requiredChoices: ["Copied effect target and choices"], guidedTask: { instruction: "Copy the parent effect, then enter fresh legal targets, choices, and any explicit costs required by that effect.", responsible: "Responding player", resultLabel: "Copied Effect Result", placeholder: "Describe target, choices, costs, and result", confirmationLabel: "Resolve Copied Effect" }, mechanicContract: { copyableSourceTypes: "needsRuling", copiedActivationRelativeOrder: "needsRuling" } }),
   759 |     protection({ id: "smokescreen", name: "Smokescreen", rulesText: "When You Or Your Pokemon Are Targetted For An Effect, Spin A Wheel With All Players. The Result Is The New Target Of That Effect. If Pokemon Are Targetted When This Is Used, Choose A Legal Target From That Player Landed On. Your Original Target Remains The Same", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "smokescreenRedirect", canRespondTo: ["singlePlayerTarget", "rosterInstanceTarget"], requiredChoices: ["Wheel result player", "One legal corresponding Pokemon when the parent targets Pokemon and the result changes player"], guidedTask: { instruction: "Spin once with every player represented exactly once. Keep the original target when its player wins or when another winning player has no legal corresponding target; otherwise choose one legal corresponding target owned by that player.", responsible: "Targeted player", resultLabel: "Redirect Result", placeholder: "Gold - Lucario", confirmationLabel: "Confirm Smokescreen" }, parentInteraction: "Replace the original selected target only when the wheel lands on another player with a legal corresponding target. Preserve the source, costs, text, target category, target count, and every unaffected target.", effectTags: ["Redirect"], runtimeUsability: runtimeUsabilityStatuses.GUIDED_ONLY, runtimeUsabilityReason: "Smokescreen uses the guided wheel and corresponding-target confirmation flow; it cannot fall back to additive or arbitrary target behavior.", mechanicContract: { targetOperation: "replaceOneCorrespondingTarget", wheelIncludesEveryPlayerExactlyOnce: true, originalPlayerResultKeepsTarget: true, playerParentUsesLandedPlayer: true, pokemonParentChoosesLegalPokemonOwnedByLandedPlayer: true, preserveSourceCostTextTargetCategoryTargetCountAndOtherTargets: true, noLegalCorrespondingTargetHandling: "keepOriginalTarget", redirectReplacement: true, recursiveWheel: false } }),
   760 |     protection({ id: "counterspell", name: "Counterspell", rulesText: "When One Of Your Tokens Is Negated, Use This Token. The Negated Token Is Not Consumed. That Token Cannot Be Used Again Until 2 Gyms Have Passed", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "restoreNegatedTokenWithCooldown", canRespondTo: ["negatedOwnTokenActivation"], requiredChoices: ["The user's exact negated Token inventory record"], persistence: "exactTokenCooldown", duration: "2 Gyms from the declaration phase anchor", expirationPoint: "At the same phase boundary two Gyms after Counterspell resolves", effectTags: ["Restore", "Cooldown"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Counterspell restores the exact negated owned Token on its persisted two-Gym phase-anchored cooldown.", automaticMutations: ["Restore the exact consumed Token inventory record", "Apply a two-Gym cooldown anchored to the declaration phase", "Keep the original activation negated"], mechanicContract: { requiresOwnedActivatedTokenNegated: true, originalTokenRemainsNegated: true, originalTokenDoesNotResolve: true, restoreExactTokenInventoryRecord: true, cooldownGyms: 2, cooldownScope: "exactRestoredToken", visibleWhileUnusable: true, normalUseReturnsAfterCooldown: true, explicitConsumptionException: true, preserveDeclarationNegationResponseRestorationCooldownRelationship: true, counterspellUsesUniversalLifecycle: true } }),
   761 |     protection({ id: "seven-tools", name: "7 Tools Of The Bandit", aliases: ["7 Tools", "Seven Tools"], rulesText: "When A Player Activates A Protection Token, Use This Token Immediately After. Negate That Protection Token, Then Copy It. The Copied Token Must Be Used During This Gym Or It Is Lost", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "counterProtection", copyActivationMode: copyActivationModes.TEMPORARY_INVENTORY, canRespondTo: ["protectionTokenActivation"], specialPriority: "Immediately after the targeted Protection Token activation", persistence: "temporaryCopiedToken", duration: "Until used or End of Gym", expirationPoint: "End of the current Gym if unused", effectTags: ["Negate", "Copy"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "7 Tools atomically negates the exact Protection response and creates its same-Gym temporary copy.", parentInteraction: "Negate the targeted Protection Token, keep it negated, then create one temporary copy for the 7 Tools user.", automaticMutations: ["Negate the targeted Protection Token", "Create one temporary copy for the 7 Tools user", "Retain copied Token timing, targeting, and effect rules", "Expire the temporary copy unused at End of Gym"], mechanicContract: { respondsOnlyToProtectionTokenActivation: true, negateTargetProtection: true, temporaryCopyCount: 1, copyOwner: "sevenToolsUser", preserveCopiedDefinitionTimingTargetsAndRules: true, permanentInventory: false, expiresAtEndOfCurrentGym: true, recordSourceDefinitionActivationOwnerCreationGymAndExpiration: true, safeguardCopyProtectionMustBeChecked: true, copyModelIsTokenSpecific: true, atomicResolutionRequired: true } }),
   762 |     protection({ id: "immunity", name: "Immunity", aliases: ["Emergency Immunity Token"], rulesText: "Negate any effect or global effect. Does not stop Series Restricts or bans", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "immunity", canRespondTo: ["targetedEffect", "globalEffect"], protectionScope: ["targetedEffect", "globalEffect"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Immunity atomically negates its exact current parent prompt and is covered across reload, undo, results, and sandbox isolation.", automaticMutations: ["Negate the parent prompt"] }),
   763 |     protection({ id: "revenge", name: "Revenge", rulesText: "After a Battle Phase where an opponent cursed a Pokemon you brought, release 2 Pokemon from their brought team and destroy the held item", isResponse: false, legalPhases: [], timingWindows: ["endOfBattlePhaseProcedure"], phaseBoundaryProcedure: "endOfBattlePhaseProcedure", explicitPhaseTiming: "postPayoutBeforeControl", activationPattern: "phaseBoundaryOptionalTrigger", activationType: "Post-payout optional offer", requiresPendingEvent: false, createsPendingEvent: true, opensResponseWindow: false, targetType: "team", targetScope: "singleTeam", targetControllerRelation: "otherPlayer", otherPlayerOnly: true, excludeActor: true, differentControllerRequired: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "revengeRelease", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Revenge is offered after payout from exact current-Gym Curse anchors and the immutable brought-team snapshot. It consumes only after the affected player confirms two exact Pokemon and an optional eligible held Item.", requiredChoices: ["Exactly two exact Pokemon from the offender's immutable brought team", "At most one eligible held item from those two"], guidedTask: { instruction: "Choose exactly two exact roster instances from the offending player's immutable brought-team snapshot, then optionally choose one eligible exactly referenced held item from those two.", responsible: "Affected player", resultLabel: "Revenge Choices", placeholder: "Two exact roster IDs and optional exact held item ID", confirmationLabel: "Apply Revenge" }, mechanicContract: { postPayoutBeforeControl: true, immutableBroughtSnapshotRequired: true, exactReleaseCount: 2, qualifyingCurseMustTargetExactBroughtInstance: true, heldItemSelectionMaximum: 1, heldItemMustBelongToSelectedReleasedPokemon: true, exactHeldInventoryReferenceRequired: true, masterBallTierProtected: true, sameNameInventoryGuessingForbidden: true, atomicResolutionRequired: true, idempotentResolutionRequired: true, adminUndoRequired: true, optionalOfferCanBeDeclinedWithoutConsumption: true, productionChoiceScreenRequired: true } }),
   764 | 
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 | 
   774 |     control({ id: "move-deleter", name: "Move Deleter", aliases: ["Move Deleter Curse"], rulesText: "Ban one move from being brought for 1 week. Cannot be used after team submission", targetType: "resource", targetScope: "singleResource", selectedTargetType: "move", applicationScope: "tableWide", affectedEntityType: "move", targetScopeStatus: "settled", targetControllerRelation: "notApplicable", minTargets: 1, maxTargets: 1, targetCollectionType: "canonicalMove", resolverMode: resolverModes.AUTOMATIC, resolverId: "moveBan", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Move Deleter records one canonical global move restriction for the next Gym and the Teambuilder and validator enforce it.", requiredChoices: ["One canonical move"], persistence: "lingeringEffect", duration: "Next Gym", expirationPoint: "End of the next Gym", automaticMutations: ["Create a global move restriction keyed by canonical move identity", "Disable the move in Teambuilder and team validation during the next Gym", "Expire the restriction when that Gym ends"] }),
   775 |     curse({ id: "toxic-curse", name: "Toxic Curse", rulesText: "Force a Pokemon to carry a Toxic Orb for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Toxic Orb status with exact protected-instance exclusions"] }),
   776 |     curse({ id: "iron-ball-curse", name: "Iron Ball Curse", rulesText: "Force a Pokemon to carry an Iron Ball for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Iron Ball status with exact protected-instance exclusions"] }),
   777 |     curse({ id: "flame-curse", name: "Flame Curse", rulesText: "Force a Pokemon to carry a Flame Orb for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", targetControllerRelation: "anyPlayer", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Flame Orb status with exact protected-instance exclusions"] }),
   778 |     curse({ id: "silencing-curse", name: "Silencing Curse", rulesText: "Restrict a Pokemon to 2 move slots for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide max-two-moves status with exact protected-instance exclusions", "Require explicit per-instance two-move repair where needed"] }),
   779 |     curse({ id: "knock-off-curse", name: "Knock Off Curse", rulesText: "Choose a Pokemon and an Item or TM move. If it is on the Pokemon, remove it from inventory. Masterball items are protected", targetType: "pokemon", targetScope: "rosterInstance", targetControllerRelation: "needsRuling", resolverMode: resolverModes.GUIDED, resolverId: "knockOff", runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Knock Off Curse is unavailable until the legal target-controller relationship is settled and exact Item/TM removal is implemented. The Token is not consumed.", requiredChoices: ["Item or TM name"], guidedTask: { instruction: "Name the Item or TM move to check on the selected Pokemon.", responsible: "Acting player", resultLabel: "Item or TM", placeholder: "Leftovers", confirmationLabel: "Resolve Knock Off" } }),
   780 |     curse({ id: "haze-curse", name: "Haze Curse", rulesText: "Select 2 Pokemon. Their buffs are negated for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "needsRuling", minTargets: 2, maxTargets: 2, targetCollectionType: "validatedRosterInstances", resolverMode: resolverModes.GUIDED, resolverId: "multiStatusEffect", runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Haze Curse is unavailable until the legal controllers for its two species anchors and its two-Gym expiration boundary are settled. The Token is not consumed.", requiredChoices: ["Exactly two Pokemon species anchors"], guidedTask: { instruction: "Choose exactly two Active Roster Pokemon as species anchors. Which controllers are legal remains Needs Ruling.", responsible: "Acting player", resultLabel: "Selected Species", placeholder: "Controller - Pokemon; Controller - Pokemon", confirmationLabel: "Apply Haze" }, persistence: "lingeringEffect", duration: "2 Gyms", expirationPoint: unresolvedMultiGymExpiration }),
   781 |     curse({ id: "imprison-curse", name: "Imprison Curse", rulesText: "Selected Pokemon cannot have EVs or IVs and must use a neutral nature for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide non-destructive no-EVs, no-IVs, neutral-Nature override with exact protected-instance exclusions"] }),
   782 |     curse({ id: "devolve-token", name: "Devolve", aliases: ["Devolve Token"], rulesText: "Selected Pokemon is devolved for 1 gym. During team submission, the target may adjust its set before preview", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "1 Gym", expirationPoint: unresolvedMultiGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Create species-wide Devolved status with exact protected-instance exclusions", "Permit Team Submission set revision"], runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Devolve is unavailable until branch/form selection, temporary species state, set revision, and exact restoration rules are canonical and implemented." }),
   783 |     curse({ id: "purge-curse", name: "Purge Curse", rulesText: "All Pokemon brought to this Battle Phase are released after battle completes. This Token ignores other effects", targetType: "player", targetScope: "singlePlayer", selectedTargetType: "player", applicationScope: "submittedTeamInstances", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "purgeAfterBattle", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Purge records an absolute target-player marker, then atomically releases that player's immutable brought-team snapshot after Gym payout.", opensResponseWindow: false, persistence: "lingeringEffect", duration: "Until the post-payout checkpoint of the current Battle Phase", expirationPoint: "Immediately after Gym payout and before ordinary Control Timing reopens.", automaticMutations: ["Create an absolute Purge marker without an ordinary response window", "Capture the immutable exact brought-team snapshot", "After payout release every exact brought roster instance atomically", "Ignore Substitute, Curse Immunity, redirection, negation, and other gameplay prevention"], mechanicContract: { postPayoutBeforeControl: true, immutableBroughtSnapshotRequired: true, absoluteGameplayEffect: true, canBeRespondedTo: false, canBeNegated: false, canBeRedirected: false, canBeProtected: false, ignoresSubstitute: true, ignoresCurseImmunity: true, atomicResolutionRequired: true, idempotentResolutionRequired: true, adminUndoRequired: true, systemFailureRollbackAndRefundRequired: true } }),
   784 |     curse({ id: "foresight-curse", name: "Foresight Curse", rulesText: "Choose 6 Pokemon. If Any Of Those Pokemon Are Brought To This Battle Phase, Their Sets Become Revealed To You. This Is Not A Nerf/Debuff", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "needsRuling", minTargets: 6, maxTargets: 6, targetCollectionType: "validatedRosterInstances", resolverMode: resolverModes.GUIDED, resolverId: "multiStatusEffect", requiredChoices: ["Exactly six Pokemon species anchors"], guidedTask: { instruction: "Choose exactly six Active Roster Pokemon as species anchors. If matching species are brought, reveal their sets only to the Foresight Curse user. Which controllers are legal remains Needs Ruling.", responsible: "Acting player", resultLabel: "Privately Marked Species", placeholder: "List the six selected Pokemon", confirmationLabel: "Apply Private Foresight" }, persistence: "privateInformationMarker", duration: "Current Battle Phase", expirationPoint: "At the end of the current Battle Phase after its private reveal obligation is complete.", visibility: "sourcePlayerOnly", effectClassification: "privateInformationMarkerNotDebuff", removableBy: [], runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Foresight Curse is unavailable because player-scoped private set delivery is not implemented. No selections or set data are placed in shared game state and the Token is not consumed.", mechanicContract: { selectionCount: 6, selectionUsesRosterInstanceAnchors: true, applicationScope: "globalSpecies", revealOnlyToSourcePlayer: true, authorizedViewer: "sourcePlayer", unauthorizedViewers: "everyOtherPlayer", hostAccessPolicy: "separateAdministrativeAuthorization", clientSideHidingSufficient: false, sharedStatePayloadMayContainSetData: false, automaticRevealEnabled: false, publicReveal: false, privateVisibilityData: true, nerfOrDebuff: false, removableByClearSmog: false, removableByGenericNerfRemoval: false, ownedPokemonRestriction: false, unauthorizedViewsMustNotReceiveOrRenderSetData: true } }),
   785 | 
```


### dream-ball-token

Occurrences: 2

#### Hit 1 — line 92

```text
    74 |         createsInventoryRecord: true,
    75 |         sourceWindow: "exactNegatedProtectionToken",
    76 |         lifetime: "temporaryInventoryRecord",
    77 |         copiedActivationsCannotBeCopied: true
    78 |       }
    79 |     };
    80 |     return Object.freeze(policies[mode] || { ...common, sourceWindow: "unknown", lifetime: "unknown" });
    81 |   }
    82 | 
    83 |   const runtimeStatusGroups = Object.freeze({
    84 |     partial: [
    85 |       "restrict-token", "arena-trap", "clear-smog", "rage-candy-bar", "extra-ban-token", "unban-token", "steal-token",
    86 |       "incinerate", "wicked-blow", "cold-wave", "move-deleter", "smokescreen", "after-you", "ditto-token", "purge-curse", "teleport", "revenge",
    87 |       "safeguard", "substitute", "seven-tools", "counterspell", "follow-me", "embargo", "reroll-token",
    88 |       "devolve-token", "honey-token", "knock-off-curse", "haze-curse", "lingering-aroma"
    89 |     ],
    90 |     textOnly: [
    91 |       "class-change", "rebrand", "parting-shot",
    92 |       "repel-token", "quick-ball-token", "dream-ball-token", "master-ball-token", "beast-ball-token", "foresight-curse"
    93 |     ],
    94 |     blockedByRuling: []
    95 |   });
    96 | 
    97 |   const runtimeStatusById = Object.freeze(Object.fromEntries(Object.entries(runtimeStatusGroups)
    98 |     .flatMap(([status, ids]) => ids.map((id) => [id, status]))));
    99 | 
   100 |   const contractDefinitionRevision = "2026-08-04-lifecycle-completion-slice-v3";
   101 |   const registeredRuntimeVerificationTests = Object.freeze([
   102 |     "token-declaration-timing",
   103 |     "token-response-parent-chain",
   104 |     "token-multi-target-validation",
   105 |     "token-reload-persistence",
   106 |     "token-sandbox-isolation",
   107 |     "token-undo-repair",
   108 |     "token-inventory-runtime",
   109 |     "standard-curse-species-lifecycle",
   110 |     "encounter-token-runtime",
```


#### Hit 2 — line 769

```text
   751 | 
   752 |     protection({ id: "safeguard", name: "Safeguard", rulesText: "Your Money And Tokens Cannot Be Stolen, Destroyed, Or Copied. You Are Unaffected By Follow Me And Embargo.", isResponse: false, usesControlTiming: true, controlWindowRequired: true, legalControlContexts: ordinaryControlContexts, activationPattern: "proactive", activationType: "Declaration", requiresPendingEvent: false, targetType: "player", targetScope: "singlePlayer", targetControllerRelation: "self", selfOnly: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "safeguard", createsPendingEvent: true, opensResponseWindow: true, canBeRespondedTo: true, persistence: "lingeringEffect", duration: "Until Gym end", expirationPoint: "At the approved End-of-Gym expiration checkpoint.", protectionScope: ["moneySteal", "moneyDestroy", "moneyCopy", "tokenSteal", "tokenDestroy", "tokenCopy", "followMe", "embargo"], automaticMutations: ["Create exact-player Safeguard protection", "Block only canonical Safeguard operation categories"], mechanicContract: { exactPlayerScopeRequired: true, categoryMatrixRequired: true, protectedCategories: ["moneySteal", "moneyDestroy", "moneyCopy", "tokenSteal", "tokenDestroy", "tokenCopy", "followMe", "embargo"], explicitNonProtectedCategories: ["itemSteal", "itemDestroy", "tmSteal", "tmDestroy", "pokemonSteal", "forcedPayment", "counterspellRestoration"] } }),
   753 |     protection({ id: "teleport", name: "Teleport", rulesText: "Delay an effect until the start of the next matching phase during the next gym", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "delayParent", canRespondTo: ["delayableEffect"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Teleport is production-usable for exact declared Token events handled by the Control controller. Unsupported or nested response effects are hidden and fail before consumption.", requiredChoices: [], parentInteraction: "Close the parent as delayed and preserve one authoritative delayed-effect record. At the next Gym's matching phase, revalidate without retargeting and resolve using the actual resolution phase anchor.", persistence: "delayedEffectRecord", duration: "Until the start of the next matching phase during the next Gym", expirationPoint: "Terminal after resolution, gameplay-illegal no-effect, or system-failure cancellation and refund.", mechanicContract: { nextGymSamePhaseRequired: true, declarationPhaseAnchorPreserved: true, resolutionDurationAnchorsToActualResolutionPhase: true, revalidateAtReturn: true, gameplayIllegalityResult: "resolvedNoEffect", gameplayIllegalityConsumesTeleportAndParent: true, gameplayIllegalityRetargets: false, gameplayIllegalityRefunds: false, systemCorruptUnsupportedResult: "canceledRefunded", duplicateResolutionForbidden: true, refreshPersistenceRequired: true, supportedProductionParents: "exact declared Token events handled by the Control controller", unsupportedParentsFailBeforeConsumption: true } }),
   754 |     protection({ id: "substitute", name: "Substitute", rulesText: "Choose a Pokemon to protect from one effect. If it would be banned, it is not banned and cannot be banned again during this phase", isResponse: false, legalPhases: ["action", "teamBuilding"], timingWindows: ["action", "teamBuilding"], activationPattern: "proactive", requiresPendingEvent: false, targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "pokemon", applicationScope: "rosterInstance", affectedEntityType: "pokemon", targetControllerRelation: "self", selfOnly: true, magicianLegalAlternateTargetExplanation: "Magician may change the target only to another Pokemon owned by the Substitute user.", resolverMode: resolverModes.AUTOMATIC, resolverId: "substituteAttach", createsPendingEvent: false, opensResponseWindow: false, persistence: "lingeringEffect", duration: "Until used or Gym end", expirationPoint: "When its one-use protection is spent or at the approved End-of-Gym expiration checkpoint, whichever occurs first.", automaticMutations: ["Attach one-use Substitute protection to the selected roster instance", "Intercept after responses and before parent mutation", "Normally exempt only that roster instance", "Negate an entire species-wide Ban and create current-phase Ban protection"] }),
   755 |     protection({ id: "follow-me", name: "Follow Me", rulesText: "When Another Player Or Another Player's Pokemon Is Targeted By An Effect, Change The Target To You Or One Of Your Legal Pokemon Instead. The New Target Must Be A Legal Target For The Original Effect. After This Effect Resolves, For The Rest Of This Gym, Copy Each Token Used By The Player Whose Effect You Redirected. Follow Me Cannot Redirect Global Effects Or Effects That Do Not Target A Player Or Pokemon", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "redirectParentToSelf", copyActivationMode: copyActivationModes.FOLLOW_ME, canRespondTo: ["singlePlayerTarget", "rosterInstanceTarget"], parentInteraction: "Replace one corresponding target with the Follow Me user or one of that user's legal Pokemon, preserve unaffected targets, then after the redirected parent resolves create the Gym-long Copy relationship.", persistence: "lingeringEffect", duration: "Through the current Gym after the redirected parent resolves", expirationPoint: "End of Gym", effectTags: ["Redirect", "Copy"], runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Follow Me is unavailable because its Gym-long Copy relationship is not implemented and the mandatory/optional plus relative-resolution order of each later copied activation is not settled. No target is redirected and the Token is not consumed.", automaticMutations: ["Replace one corresponding parent target", "Preserve source, cost, text, target type, target count, and unaffected targets", "Record the redirected effect's source player", "Create a Gym-long ongoing Copy relationship after parent resolution"], mechanicContract: { initialRedirectOperation: "replaceOneCorrespondingTarget", requiresLegalCorrespondingTarget: true, excludesGlobalAndTargetlessEffects: true, preserveSourceCostTextTargetTypeTargetCountAndUnaffectedTargets: true, ongoingEffectBeginsAfterRedirectedParentResolves: true, ongoingEffectDuration: "currentGym", copyEachLaterTokenUsedByRecordedPlayer: true, copiedActivationChoiceRequirement: "needsRuling", copiedActivationRelativeOrder: "needsRuling", copySemanticsStatus: "settled" } }),
   756 |     protection({ id: "parting-shot", name: "Parting Shot", rulesText: "During Team Preview, switch a previewed Pokemon for another party Pokemon. Cursed-swap retaliation is tracked manually", isResponse: false, legalPhases: ["teamPreview"], timingWindows: ["teamPreview"], activationPattern: "phaseSpecific", activationType: "Team Preview declaration", requiresPendingEvent: false, createsPendingEvent: true, opensResponseWindow: true, targetType: "team", targetScope: "singleTeam", resolverMode: resolverModes.GUIDED, resolverId: "teamPreviewSwap", requiredChoices: ["Pokemon out", "Pokemon in"], guidedTask: { instruction: "Choose the revealed Pokemon leaving and the legal party Pokemon replacing it.", responsible: "Affected player", resultLabel: "Completed Swap", placeholder: "Abra out; Grovyle in", confirmationLabel: "Apply Team Swap" } }),
   757 |     protection({ id: "embargo", name: "Embargo", rulesText: "Target player can only use one more Token this gym. You cannot use another Token after this resolves", targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "playerStatus", persistence: "lingeringEffect", duration: "Until Gym end", expirationPoint: "At the approved End-of-Gym expiration checkpoint.", automaticMutations: ["Limit target to one more Token", "Prevent the acting player from using another Token this Gym"] }),
   758 |     protection({ id: "after-you", name: "After You", rulesText: "After a player declares an effect, copy and use it", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "copyParentEffect", copyActivationMode: copyActivationModes.AFTER_YOU, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "After You is unavailable because its fresh target/choice and explicit-cost controller is not implemented, and the copyable effect-source classes plus relative chain order are not settled.", requiredChoices: ["Copied effect target and choices"], guidedTask: { instruction: "Copy the parent effect, then enter fresh legal targets, choices, and any explicit costs required by that effect.", responsible: "Responding player", resultLabel: "Copied Effect Result", placeholder: "Describe target, choices, costs, and result", confirmationLabel: "Resolve Copied Effect" }, mechanicContract: { copyableSourceTypes: "needsRuling", copiedActivationRelativeOrder: "needsRuling" } }),
   759 |     protection({ id: "smokescreen", name: "Smokescreen", rulesText: "When You Or Your Pokemon Are Targetted For An Effect, Spin A Wheel With All Players. The Result Is The New Target Of That Effect. If Pokemon Are Targetted When This Is Used, Choose A Legal Target From That Player Landed On. Your Original Target Remains The Same", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "smokescreenRedirect", canRespondTo: ["singlePlayerTarget", "rosterInstanceTarget"], requiredChoices: ["Wheel result player", "One legal corresponding Pokemon when the parent targets Pokemon and the result changes player"], guidedTask: { instruction: "Spin once with every player represented exactly once. Keep the original target when its player wins or when another winning player has no legal corresponding target; otherwise choose one legal corresponding target owned by that player.", responsible: "Targeted player", resultLabel: "Redirect Result", placeholder: "Gold - Lucario", confirmationLabel: "Confirm Smokescreen" }, parentInteraction: "Replace the original selected target only when the wheel lands on another player with a legal corresponding target. Preserve the source, costs, text, target category, target count, and every unaffected target.", effectTags: ["Redirect"], runtimeUsability: runtimeUsabilityStatuses.GUIDED_ONLY, runtimeUsabilityReason: "Smokescreen uses the guided wheel and corresponding-target confirmation flow; it cannot fall back to additive or arbitrary target behavior.", mechanicContract: { targetOperation: "replaceOneCorrespondingTarget", wheelIncludesEveryPlayerExactlyOnce: true, originalPlayerResultKeepsTarget: true, playerParentUsesLandedPlayer: true, pokemonParentChoosesLegalPokemonOwnedByLandedPlayer: true, preserveSourceCostTextTargetCategoryTargetCountAndOtherTargets: true, noLegalCorrespondingTargetHandling: "keepOriginalTarget", redirectReplacement: true, recursiveWheel: false } }),
   760 |     protection({ id: "counterspell", name: "Counterspell", rulesText: "When One Of Your Tokens Is Negated, Use This Token. The Negated Token Is Not Consumed. That Token Cannot Be Used Again Until 2 Gyms Have Passed", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "restoreNegatedTokenWithCooldown", canRespondTo: ["negatedOwnTokenActivation"], requiredChoices: ["The user's exact negated Token inventory record"], persistence: "exactTokenCooldown", duration: "2 Gyms from the declaration phase anchor", expirationPoint: "At the same phase boundary two Gyms after Counterspell resolves", effectTags: ["Restore", "Cooldown"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Counterspell restores the exact negated owned Token on its persisted two-Gym phase-anchored cooldown.", automaticMutations: ["Restore the exact consumed Token inventory record", "Apply a two-Gym cooldown anchored to the declaration phase", "Keep the original activation negated"], mechanicContract: { requiresOwnedActivatedTokenNegated: true, originalTokenRemainsNegated: true, originalTokenDoesNotResolve: true, restoreExactTokenInventoryRecord: true, cooldownGyms: 2, cooldownScope: "exactRestoredToken", visibleWhileUnusable: true, normalUseReturnsAfterCooldown: true, explicitConsumptionException: true, preserveDeclarationNegationResponseRestorationCooldownRelationship: true, counterspellUsesUniversalLifecycle: true } }),
   761 |     protection({ id: "seven-tools", name: "7 Tools Of The Bandit", aliases: ["7 Tools", "Seven Tools"], rulesText: "When A Player Activates A Protection Token, Use This Token Immediately After. Negate That Protection Token, Then Copy It. The Copied Token Must Be Used During This Gym Or It Is Lost", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "counterProtection", copyActivationMode: copyActivationModes.TEMPORARY_INVENTORY, canRespondTo: ["protectionTokenActivation"], specialPriority: "Immediately after the targeted Protection Token activation", persistence: "temporaryCopiedToken", duration: "Until used or End of Gym", expirationPoint: "End of the current Gym if unused", effectTags: ["Negate", "Copy"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "7 Tools atomically negates the exact Protection response and creates its same-Gym temporary copy.", parentInteraction: "Negate the targeted Protection Token, keep it negated, then create one temporary copy for the 7 Tools user.", automaticMutations: ["Negate the targeted Protection Token", "Create one temporary copy for the 7 Tools user", "Retain copied Token timing, targeting, and effect rules", "Expire the temporary copy unused at End of Gym"], mechanicContract: { respondsOnlyToProtectionTokenActivation: true, negateTargetProtection: true, temporaryCopyCount: 1, copyOwner: "sevenToolsUser", preserveCopiedDefinitionTimingTargetsAndRules: true, permanentInventory: false, expiresAtEndOfCurrentGym: true, recordSourceDefinitionActivationOwnerCreationGymAndExpiration: true, safeguardCopyProtectionMustBeChecked: true, copyModelIsTokenSpecific: true, atomicResolutionRequired: true } }),
   762 |     protection({ id: "immunity", name: "Immunity", aliases: ["Emergency Immunity Token"], rulesText: "Negate any effect or global effect. Does not stop Series Restricts or bans", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "immunity", canRespondTo: ["targetedEffect", "globalEffect"], protectionScope: ["targetedEffect", "globalEffect"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Immunity atomically negates its exact current parent prompt and is covered across reload, undo, results, and sandbox isolation.", automaticMutations: ["Negate the parent prompt"] }),
   763 |     protection({ id: "revenge", name: "Revenge", rulesText: "After a Battle Phase where an opponent cursed a Pokemon you brought, release 2 Pokemon from their brought team and destroy the held item", isResponse: false, legalPhases: [], timingWindows: ["endOfBattlePhaseProcedure"], phaseBoundaryProcedure: "endOfBattlePhaseProcedure", explicitPhaseTiming: "postPayoutBeforeControl", activationPattern: "phaseBoundaryOptionalTrigger", activationType: "Post-payout optional offer", requiresPendingEvent: false, createsPendingEvent: true, opensResponseWindow: false, targetType: "team", targetScope: "singleTeam", targetControllerRelation: "otherPlayer", otherPlayerOnly: true, excludeActor: true, differentControllerRequired: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "revengeRelease", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Revenge is offered after payout from exact current-Gym Curse anchors and the immutable brought-team snapshot. It consumes only after the affected player confirms two exact Pokemon and an optional eligible held Item.", requiredChoices: ["Exactly two exact Pokemon from the offender's immutable brought team", "At most one eligible held item from those two"], guidedTask: { instruction: "Choose exactly two exact roster instances from the offending player's immutable brought-team snapshot, then optionally choose one eligible exactly referenced held item from those two.", responsible: "Affected player", resultLabel: "Revenge Choices", placeholder: "Two exact roster IDs and optional exact held item ID", confirmationLabel: "Apply Revenge" }, mechanicContract: { postPayoutBeforeControl: true, immutableBroughtSnapshotRequired: true, exactReleaseCount: 2, qualifyingCurseMustTargetExactBroughtInstance: true, heldItemSelectionMaximum: 1, heldItemMustBelongToSelectedReleasedPokemon: true, exactHeldInventoryReferenceRequired: true, masterBallTierProtected: true, sameNameInventoryGuessingForbidden: true, atomicResolutionRequired: true, idempotentResolutionRequired: true, adminUndoRequired: true, optionalOfferCanBeDeclinedWithoutConsumption: true, productionChoiceScreenRequired: true } }),
   764 | 
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 | 
   774 |     control({ id: "move-deleter", name: "Move Deleter", aliases: ["Move Deleter Curse"], rulesText: "Ban one move from being brought for 1 week. Cannot be used after team submission", targetType: "resource", targetScope: "singleResource", selectedTargetType: "move", applicationScope: "tableWide", affectedEntityType: "move", targetScopeStatus: "settled", targetControllerRelation: "notApplicable", minTargets: 1, maxTargets: 1, targetCollectionType: "canonicalMove", resolverMode: resolverModes.AUTOMATIC, resolverId: "moveBan", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Move Deleter records one canonical global move restriction for the next Gym and the Teambuilder and validator enforce it.", requiredChoices: ["One canonical move"], persistence: "lingeringEffect", duration: "Next Gym", expirationPoint: "End of the next Gym", automaticMutations: ["Create a global move restriction keyed by canonical move identity", "Disable the move in Teambuilder and team validation during the next Gym", "Expire the restriction when that Gym ends"] }),
   775 |     curse({ id: "toxic-curse", name: "Toxic Curse", rulesText: "Force a Pokemon to carry a Toxic Orb for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Toxic Orb status with exact protected-instance exclusions"] }),
   776 |     curse({ id: "iron-ball-curse", name: "Iron Ball Curse", rulesText: "Force a Pokemon to carry an Iron Ball for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Iron Ball status with exact protected-instance exclusions"] }),
   777 |     curse({ id: "flame-curse", name: "Flame Curse", rulesText: "Force a Pokemon to carry a Flame Orb for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", targetControllerRelation: "anyPlayer", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Flame Orb status with exact protected-instance exclusions"] }),
   778 |     curse({ id: "silencing-curse", name: "Silencing Curse", rulesText: "Restrict a Pokemon to 2 move slots for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide max-two-moves status with exact protected-instance exclusions", "Require explicit per-instance two-move repair where needed"] }),
   779 |     curse({ id: "knock-off-curse", name: "Knock Off Curse", rulesText: "Choose a Pokemon and an Item or TM move. If it is on the Pokemon, remove it from inventory. Masterball items are protected", targetType: "pokemon", targetScope: "rosterInstance", targetControllerRelation: "needsRuling", resolverMode: resolverModes.GUIDED, resolverId: "knockOff", runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Knock Off Curse is unavailable until the legal target-controller relationship is settled and exact Item/TM removal is implemented. The Token is not consumed.", requiredChoices: ["Item or TM name"], guidedTask: { instruction: "Name the Item or TM move to check on the selected Pokemon.", responsible: "Acting player", resultLabel: "Item or TM", placeholder: "Leftovers", confirmationLabel: "Resolve Knock Off" } }),
   780 |     curse({ id: "haze-curse", name: "Haze Curse", rulesText: "Select 2 Pokemon. Their buffs are negated for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "needsRuling", minTargets: 2, maxTargets: 2, targetCollectionType: "validatedRosterInstances", resolverMode: resolverModes.GUIDED, resolverId: "multiStatusEffect", runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Haze Curse is unavailable until the legal controllers for its two species anchors and its two-Gym expiration boundary are settled. The Token is not consumed.", requiredChoices: ["Exactly two Pokemon species anchors"], guidedTask: { instruction: "Choose exactly two Active Roster Pokemon as species anchors. Which controllers are legal remains Needs Ruling.", responsible: "Acting player", resultLabel: "Selected Species", placeholder: "Controller - Pokemon; Controller - Pokemon", confirmationLabel: "Apply Haze" }, persistence: "lingeringEffect", duration: "2 Gyms", expirationPoint: unresolvedMultiGymExpiration }),
   781 |     curse({ id: "imprison-curse", name: "Imprison Curse", rulesText: "Selected Pokemon cannot have EVs or IVs and must use a neutral nature for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide non-destructive no-EVs, no-IVs, neutral-Nature override with exact protected-instance exclusions"] }),
   782 |     curse({ id: "devolve-token", name: "Devolve", aliases: ["Devolve Token"], rulesText: "Selected Pokemon is devolved for 1 gym. During team submission, the target may adjust its set before preview", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "1 Gym", expirationPoint: unresolvedMultiGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Create species-wide Devolved status with exact protected-instance exclusions", "Permit Team Submission set revision"], runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Devolve is unavailable until branch/form selection, temporary species state, set revision, and exact restoration rules are canonical and implemented." }),
   783 |     curse({ id: "purge-curse", name: "Purge Curse", rulesText: "All Pokemon brought to this Battle Phase are released after battle completes. This Token ignores other effects", targetType: "player", targetScope: "singlePlayer", selectedTargetType: "player", applicationScope: "submittedTeamInstances", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "purgeAfterBattle", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Purge records an absolute target-player marker, then atomically releases that player's immutable brought-team snapshot after Gym payout.", opensResponseWindow: false, persistence: "lingeringEffect", duration: "Until the post-payout checkpoint of the current Battle Phase", expirationPoint: "Immediately after Gym payout and before ordinary Control Timing reopens.", automaticMutations: ["Create an absolute Purge marker without an ordinary response window", "Capture the immutable exact brought-team snapshot", "After payout release every exact brought roster instance atomically", "Ignore Substitute, Curse Immunity, redirection, negation, and other gameplay prevention"], mechanicContract: { postPayoutBeforeControl: true, immutableBroughtSnapshotRequired: true, absoluteGameplayEffect: true, canBeRespondedTo: false, canBeNegated: false, canBeRedirected: false, canBeProtected: false, ignoresSubstitute: true, ignoresCurseImmunity: true, atomicResolutionRequired: true, idempotentResolutionRequired: true, adminUndoRequired: true, systemFailureRollbackAndRefundRequired: true } }),
   784 |     curse({ id: "foresight-curse", name: "Foresight Curse", rulesText: "Choose 6 Pokemon. If Any Of Those Pokemon Are Brought To This Battle Phase, Their Sets Become Revealed To You. This Is Not A Nerf/Debuff", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "needsRuling", minTargets: 6, maxTargets: 6, targetCollectionType: "validatedRosterInstances", resolverMode: resolverModes.GUIDED, resolverId: "multiStatusEffect", requiredChoices: ["Exactly six Pokemon species anchors"], guidedTask: { instruction: "Choose exactly six Active Roster Pokemon as species anchors. If matching species are brought, reveal their sets only to the Foresight Curse user. Which controllers are legal remains Needs Ruling.", responsible: "Acting player", resultLabel: "Privately Marked Species", placeholder: "List the six selected Pokemon", confirmationLabel: "Apply Private Foresight" }, persistence: "privateInformationMarker", duration: "Current Battle Phase", expirationPoint: "At the end of the current Battle Phase after its private reveal obligation is complete.", visibility: "sourcePlayerOnly", effectClassification: "privateInformationMarkerNotDebuff", removableBy: [], runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Foresight Curse is unavailable because player-scoped private set delivery is not implemented. No selections or set data are placed in shared game state and the Token is not consumed.", mechanicContract: { selectionCount: 6, selectionUsesRosterInstanceAnchors: true, applicationScope: "globalSpecies", revealOnlyToSourcePlayer: true, authorizedViewer: "sourcePlayer", unauthorizedViewers: "everyOtherPlayer", hostAccessPolicy: "separateAdministrativeAuthorization", clientSideHidingSufficient: false, sharedStatePayloadMayContainSetData: false, automaticRevealEnabled: false, publicReveal: false, privateVisibilityData: true, nerfOrDebuff: false, removableByClearSmog: false, removableByGenericNerfRemoval: false, ownedPokemonRestriction: false, unauthorizedViewsMustNotReceiveOrRenderSetData: true } }),
   785 | 
   786 |     control({ id: "ditto-token", name: "Ditto", rulesText: "Transforms into any Token except Game Corner Tickets", targetType: "resource", targetScope: "singleResource", resolverMode: resolverModes.GUIDED, resolverId: "copyToken", copyActivationMode: copyActivationModes.DITTO, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Ditto is unavailable because its legal Token picker and fresh declaration controller are not implemented, and the handling of phase-boundary-only, response-only, and delayed Tokens outside their native windows is not settled.", requiredChoices: ["Token to copy", "Fresh targets and choices", "Explicit copied-effect costs"], guidedTask: { instruction: "Choose one legal normal Token definition, then create one copied activation with fresh targets, choices, and explicit costs. Do not add that Token to inventory.", responsible: "Acting player", resultLabel: "Copied Activation", placeholder: "Restrict", confirmationLabel: "Use Ditto Activation" }, mechanicContract: { selectedDefinitionMustBeCurrentlyTimingLegal: "needsRuling", phaseBoundaryResponseAndDelayedTokenHandling: "needsRuling" } })
   787 |   ];
```


### honey-token

Occurrences: 6

#### Hit 1 — line 88

```text
    70 |       [copyActivationModes.DITTO]: { ...common, sourceWindow: "oneChosenLegalTokenDefinition", lifetime: "oneActivation", excludesTickets: true },
    71 |       [copyActivationModes.CLASS_EFFECT]: { ...common, sourceWindow: "classEffectGrant", lifetime: "grantDefined" },
    72 |       [copyActivationModes.TEMPORARY_INVENTORY]: {
    73 |         ...common,
    74 |         createsInventoryRecord: true,
    75 |         sourceWindow: "exactNegatedProtectionToken",
    76 |         lifetime: "temporaryInventoryRecord",
    77 |         copiedActivationsCannotBeCopied: true
    78 |       }
    79 |     };
    80 |     return Object.freeze(policies[mode] || { ...common, sourceWindow: "unknown", lifetime: "unknown" });
    81 |   }
    82 | 
    83 |   const runtimeStatusGroups = Object.freeze({
    84 |     partial: [
    85 |       "restrict-token", "arena-trap", "clear-smog", "rage-candy-bar", "extra-ban-token", "unban-token", "steal-token",
    86 |       "incinerate", "wicked-blow", "cold-wave", "move-deleter", "smokescreen", "after-you", "ditto-token", "purge-curse", "teleport", "revenge",
    87 |       "safeguard", "substitute", "seven-tools", "counterspell", "follow-me", "embargo", "reroll-token",
    88 |       "devolve-token", "honey-token", "knock-off-curse", "haze-curse", "lingering-aroma"
    89 |     ],
    90 |     textOnly: [
    91 |       "class-change", "rebrand", "parting-shot",
    92 |       "repel-token", "quick-ball-token", "dream-ball-token", "master-ball-token", "beast-ball-token", "foresight-curse"
    93 |     ],
    94 |     blockedByRuling: []
    95 |   });
    96 | 
    97 |   const runtimeStatusById = Object.freeze(Object.fromEntries(Object.entries(runtimeStatusGroups)
    98 |     .flatMap(([status, ids]) => ids.map((id) => [id, status]))));
    99 | 
   100 |   const contractDefinitionRevision = "2026-08-04-lifecycle-completion-slice-v3";
   101 |   const registeredRuntimeVerificationTests = Object.freeze([
   102 |     "token-declaration-timing",
   103 |     "token-response-parent-chain",
   104 |     "token-multi-target-validation",
   105 |     "token-reload-persistence",
   106 |     "token-sandbox-isolation",
```


#### Hit 2 — line 337

```text
   319 |       evidence: "Own/rival exact Active-roster targeting, non-Active and stale rejection, stable identity, acquisition and Evolution Lock checks, exact team-reference coherence without new membership, set cleanup, refresh, causal History undo, unresolved mixed-tier branch fail-closed behavior, and sandbox isolation are covered by TLS-002, TCI-012, BROWSER-026, and TSB-022/027.",
   320 |       verifiedAt: "2026-08-04",
   321 |       contractDefinitionRevision
   322 |     }),
   323 |     "teleport": Object.freeze({
   324 |       status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
   325 |       tests: Object.freeze(["token-response-parent-chain", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "lifecycle-completion-slice-e2e"]),
   326 |       evidence: "Exact root-Control delay, matching-phase return, no-retarget revalidation, gameplay no-effect and system-failure split, duplicate-terminal prevention, refresh, merged causal History restoration of both exact Tokens, and sandbox isolation are covered by TLS-003, STR-009/011, BROWSER-011/027, and TSB-027.",
   327 |       verifiedAt: "2026-08-04",
   328 |       contractDefinitionRevision
   329 |     }),
   330 |     "reroll-token": Object.freeze({
   331 |       status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
   332 |       tests: Object.freeze(["encounter-token-runtime", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "lifecycle-completion-slice-e2e"]),
   333 |       evidence: "Exact unresolved Encounter and wheel result identity, canonical replacement, superseded original revision, stale rejection, duplicate operation identity, multiple-copy inventory safety, normal acquisition continuation, production refresh, causal History undo, and sandbox isolation are covered by TLS-004, BROWSER-028, and TSB-027.",
   334 |       verifiedAt: "2026-08-04",
   335 |       contractDefinitionRevision
   336 |     }),
   337 |     "honey-token": Object.freeze({
   338 |       status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
   339 |       tests: Object.freeze(["encounter-token-runtime", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "lifecycle-completion-slice-e2e"]),
   340 |       evidence: "Exact finalized Encounter selection, fresh nonrecursive copy identity, canonical species/form/tier/level and intrinsic payload, normal acquisition handoff, duplicate and stale safety, production refresh, causal History undo through acquired roster creation, and sandbox isolation are covered by TLS-005, SEB-004, BROWSER-029, and TSB-027.",
   341 |       verifiedAt: "2026-08-04",
   342 |       contractDefinitionRevision
   343 |     }),
   344 |     "purge-curse": Object.freeze({
   345 |       status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
   346 |       tests: Object.freeze(["token-declaration-timing", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "lifecycle-completion-slice-e2e"]),
   347 |       evidence: "Non-respondable declaration, immutable exact brought-team snapshot, post-payout blocking and atomic release, exact-ID same-species isolation, later-change preservation, duplicate prevention, production refresh, causal History undo, and sandbox isolation are covered by TLS-006, STR-007/010, BROWSER-030, and TSB-027.",
   348 |       verifiedAt: "2026-08-04",
   349 |       contractDefinitionRevision
   350 |     })
   351 |   });
   352 | 
   353 |   const legalTimingValues = Object.freeze([
   354 |     "gymStartPreparationControl", "action", "actionOpen", "teamBuilding", "shop", "shopOpen", "postBattleControl", "responseWindow",
   355 |     "encounterBeforeRoll", "encounterResult", "wheelWindow", "sabotage", "teamPreview", "battlePayout",
```


#### Hit 3 — line 451

```text
   433 |   function redirectPolicyReason(config, mechanism, status) {
   434 |     if (status === "allowed" && mechanism === "magician") {
   435 |       const relationshipNote = ["haze-curse", "foresight-curse"].includes(config.id)
   436 |         ? " The replacement must obey the approved controller relationship once that relationship is ruled."
   437 |         : "";
   438 |       return `One chosen target may change when a different legal corresponding target exists.${relationshipNote}`;
   439 |     }
   440 |     if (status === "allowed" && mechanism === "followMe") {
   441 |       return "The Follow Me user may become the player target only when that user satisfies the original target restrictions.";
   442 |     }
   443 |     if (status === "allowed" && mechanism === "smokescreen") {
   444 |       return "Spin once across every player. The original player result keeps the target; another player result replaces it with one legal corresponding target, or leaves it unchanged when none exists.";
   445 |     }
   446 |     if (config.id === "class-change" || config.id === "safeguard") return "The effect is self-only and has no legal alternate target.";
   447 |     if (config.id === "purge-curse") return "Purge explicitly ignores other gameplay effects and cannot be redirected.";
   448 |     if (config.id === "incinerate") return "Each opposing player contributes an independently selected resource; player/Pokemon target redirection does not apply.";
   449 |     if (config.targetType === "table" || config.targetScope === "tableWide") return "Global and table-wide effects do not have a redirectable chosen target.";
   450 |     if (config.targetType === "currentPrompt" || config.targetScope === "currentPrompt" || config.isResponse) return "Current-prompt responses are not independently redirected as targets.";
   451 |     if (config.id === "honey-token") return "The encounter record is a boundary-offer selection, not a chosen gameplay target for redirection.";
   452 |     if (config.family === "Encounter") return "This encounter modifier does not expose a legal alternate gameplay target for this mechanism.";
   453 |     if (mechanism === "followMe") return "The Follow Me user cannot become a legal corresponding target under this effect's current target contract.";
   454 |     if (mechanism === "smokescreen") return "A random player result cannot replace the selected target with a legal corresponding target under this effect's current target contract.";
   455 |     return "The effect has no different legal corresponding target for this mechanism.";
   456 |   }
   457 | 
   458 |   function redirectMechanismPolicy(config, mechanism, status) {
   459 |     const mayRedirect = status !== "notAllowed";
   460 |     const shared = {
   461 |       status,
   462 |       reason: redirectPolicyReason(config, mechanism, status),
   463 |       changesSelectedTargetCount: mayRedirect ? 1 : 0,
   464 |       preservesTargetType: true,
   465 |       preservesTargetControllerRelation: true,
   466 |       preservesTargetCount: true,
   467 |       preservesCosts: true,
   468 |       preservesSourcePlayer: true,
   469 |       preservesEffectText: true,
```


#### Hit 4 — line 770

```text
   752 |     protection({ id: "safeguard", name: "Safeguard", rulesText: "Your Money And Tokens Cannot Be Stolen, Destroyed, Or Copied. You Are Unaffected By Follow Me And Embargo.", isResponse: false, usesControlTiming: true, controlWindowRequired: true, legalControlContexts: ordinaryControlContexts, activationPattern: "proactive", activationType: "Declaration", requiresPendingEvent: false, targetType: "player", targetScope: "singlePlayer", targetControllerRelation: "self", selfOnly: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "safeguard", createsPendingEvent: true, opensResponseWindow: true, canBeRespondedTo: true, persistence: "lingeringEffect", duration: "Until Gym end", expirationPoint: "At the approved End-of-Gym expiration checkpoint.", protectionScope: ["moneySteal", "moneyDestroy", "moneyCopy", "tokenSteal", "tokenDestroy", "tokenCopy", "followMe", "embargo"], automaticMutations: ["Create exact-player Safeguard protection", "Block only canonical Safeguard operation categories"], mechanicContract: { exactPlayerScopeRequired: true, categoryMatrixRequired: true, protectedCategories: ["moneySteal", "moneyDestroy", "moneyCopy", "tokenSteal", "tokenDestroy", "tokenCopy", "followMe", "embargo"], explicitNonProtectedCategories: ["itemSteal", "itemDestroy", "tmSteal", "tmDestroy", "pokemonSteal", "forcedPayment", "counterspellRestoration"] } }),
   753 |     protection({ id: "teleport", name: "Teleport", rulesText: "Delay an effect until the start of the next matching phase during the next gym", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "delayParent", canRespondTo: ["delayableEffect"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Teleport is production-usable for exact declared Token events handled by the Control controller. Unsupported or nested response effects are hidden and fail before consumption.", requiredChoices: [], parentInteraction: "Close the parent as delayed and preserve one authoritative delayed-effect record. At the next Gym's matching phase, revalidate without retargeting and resolve using the actual resolution phase anchor.", persistence: "delayedEffectRecord", duration: "Until the start of the next matching phase during the next Gym", expirationPoint: "Terminal after resolution, gameplay-illegal no-effect, or system-failure cancellation and refund.", mechanicContract: { nextGymSamePhaseRequired: true, declarationPhaseAnchorPreserved: true, resolutionDurationAnchorsToActualResolutionPhase: true, revalidateAtReturn: true, gameplayIllegalityResult: "resolvedNoEffect", gameplayIllegalityConsumesTeleportAndParent: true, gameplayIllegalityRetargets: false, gameplayIllegalityRefunds: false, systemCorruptUnsupportedResult: "canceledRefunded", duplicateResolutionForbidden: true, refreshPersistenceRequired: true, supportedProductionParents: "exact declared Token events handled by the Control controller", unsupportedParentsFailBeforeConsumption: true } }),
   754 |     protection({ id: "substitute", name: "Substitute", rulesText: "Choose a Pokemon to protect from one effect. If it would be banned, it is not banned and cannot be banned again during this phase", isResponse: false, legalPhases: ["action", "teamBuilding"], timingWindows: ["action", "teamBuilding"], activationPattern: "proactive", requiresPendingEvent: false, targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "pokemon", applicationScope: "rosterInstance", affectedEntityType: "pokemon", targetControllerRelation: "self", selfOnly: true, magicianLegalAlternateTargetExplanation: "Magician may change the target only to another Pokemon owned by the Substitute user.", resolverMode: resolverModes.AUTOMATIC, resolverId: "substituteAttach", createsPendingEvent: false, opensResponseWindow: false, persistence: "lingeringEffect", duration: "Until used or Gym end", expirationPoint: "When its one-use protection is spent or at the approved End-of-Gym expiration checkpoint, whichever occurs first.", automaticMutations: ["Attach one-use Substitute protection to the selected roster instance", "Intercept after responses and before parent mutation", "Normally exempt only that roster instance", "Negate an entire species-wide Ban and create current-phase Ban protection"] }),
   755 |     protection({ id: "follow-me", name: "Follow Me", rulesText: "When Another Player Or Another Player's Pokemon Is Targeted By An Effect, Change The Target To You Or One Of Your Legal Pokemon Instead. The New Target Must Be A Legal Target For The Original Effect. After This Effect Resolves, For The Rest Of This Gym, Copy Each Token Used By The Player Whose Effect You Redirected. Follow Me Cannot Redirect Global Effects Or Effects That Do Not Target A Player Or Pokemon", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "redirectParentToSelf", copyActivationMode: copyActivationModes.FOLLOW_ME, canRespondTo: ["singlePlayerTarget", "rosterInstanceTarget"], parentInteraction: "Replace one corresponding target with the Follow Me user or one of that user's legal Pokemon, preserve unaffected targets, then after the redirected parent resolves create the Gym-long Copy relationship.", persistence: "lingeringEffect", duration: "Through the current Gym after the redirected parent resolves", expirationPoint: "End of Gym", effectTags: ["Redirect", "Copy"], runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Follow Me is unavailable because its Gym-long Copy relationship is not implemented and the mandatory/optional plus relative-resolution order of each later copied activation is not settled. No target is redirected and the Token is not consumed.", automaticMutations: ["Replace one corresponding parent target", "Preserve source, cost, text, target type, target count, and unaffected targets", "Record the redirected effect's source player", "Create a Gym-long ongoing Copy relationship after parent resolution"], mechanicContract: { initialRedirectOperation: "replaceOneCorrespondingTarget", requiresLegalCorrespondingTarget: true, excludesGlobalAndTargetlessEffects: true, preserveSourceCostTextTargetTypeTargetCountAndUnaffectedTargets: true, ongoingEffectBeginsAfterRedirectedParentResolves: true, ongoingEffectDuration: "currentGym", copyEachLaterTokenUsedByRecordedPlayer: true, copiedActivationChoiceRequirement: "needsRuling", copiedActivationRelativeOrder: "needsRuling", copySemanticsStatus: "settled" } }),
   756 |     protection({ id: "parting-shot", name: "Parting Shot", rulesText: "During Team Preview, switch a previewed Pokemon for another party Pokemon. Cursed-swap retaliation is tracked manually", isResponse: false, legalPhases: ["teamPreview"], timingWindows: ["teamPreview"], activationPattern: "phaseSpecific", activationType: "Team Preview declaration", requiresPendingEvent: false, createsPendingEvent: true, opensResponseWindow: true, targetType: "team", targetScope: "singleTeam", resolverMode: resolverModes.GUIDED, resolverId: "teamPreviewSwap", requiredChoices: ["Pokemon out", "Pokemon in"], guidedTask: { instruction: "Choose the revealed Pokemon leaving and the legal party Pokemon replacing it.", responsible: "Affected player", resultLabel: "Completed Swap", placeholder: "Abra out; Grovyle in", confirmationLabel: "Apply Team Swap" } }),
   757 |     protection({ id: "embargo", name: "Embargo", rulesText: "Target player can only use one more Token this gym. You cannot use another Token after this resolves", targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "playerStatus", persistence: "lingeringEffect", duration: "Until Gym end", expirationPoint: "At the approved End-of-Gym expiration checkpoint.", automaticMutations: ["Limit target to one more Token", "Prevent the acting player from using another Token this Gym"] }),
   758 |     protection({ id: "after-you", name: "After You", rulesText: "After a player declares an effect, copy and use it", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "copyParentEffect", copyActivationMode: copyActivationModes.AFTER_YOU, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "After You is unavailable because its fresh target/choice and explicit-cost controller is not implemented, and the copyable effect-source classes plus relative chain order are not settled.", requiredChoices: ["Copied effect target and choices"], guidedTask: { instruction: "Copy the parent effect, then enter fresh legal targets, choices, and any explicit costs required by that effect.", responsible: "Responding player", resultLabel: "Copied Effect Result", placeholder: "Describe target, choices, costs, and result", confirmationLabel: "Resolve Copied Effect" }, mechanicContract: { copyableSourceTypes: "needsRuling", copiedActivationRelativeOrder: "needsRuling" } }),
   759 |     protection({ id: "smokescreen", name: "Smokescreen", rulesText: "When You Or Your Pokemon Are Targetted For An Effect, Spin A Wheel With All Players. The Result Is The New Target Of That Effect. If Pokemon Are Targetted When This Is Used, Choose A Legal Target From That Player Landed On. Your Original Target Remains The Same", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "smokescreenRedirect", canRespondTo: ["singlePlayerTarget", "rosterInstanceTarget"], requiredChoices: ["Wheel result player", "One legal corresponding Pokemon when the parent targets Pokemon and the result changes player"], guidedTask: { instruction: "Spin once with every player represented exactly once. Keep the original target when its player wins or when another winning player has no legal corresponding target; otherwise choose one legal corresponding target owned by that player.", responsible: "Targeted player", resultLabel: "Redirect Result", placeholder: "Gold - Lucario", confirmationLabel: "Confirm Smokescreen" }, parentInteraction: "Replace the original selected target only when the wheel lands on another player with a legal corresponding target. Preserve the source, costs, text, target category, target count, and every unaffected target.", effectTags: ["Redirect"], runtimeUsability: runtimeUsabilityStatuses.GUIDED_ONLY, runtimeUsabilityReason: "Smokescreen uses the guided wheel and corresponding-target confirmation flow; it cannot fall back to additive or arbitrary target behavior.", mechanicContract: { targetOperation: "replaceOneCorrespondingTarget", wheelIncludesEveryPlayerExactlyOnce: true, originalPlayerResultKeepsTarget: true, playerParentUsesLandedPlayer: true, pokemonParentChoosesLegalPokemonOwnedByLandedPlayer: true, preserveSourceCostTextTargetCategoryTargetCountAndOtherTargets: true, noLegalCorrespondingTargetHandling: "keepOriginalTarget", redirectReplacement: true, recursiveWheel: false } }),
   760 |     protection({ id: "counterspell", name: "Counterspell", rulesText: "When One Of Your Tokens Is Negated, Use This Token. The Negated Token Is Not Consumed. That Token Cannot Be Used Again Until 2 Gyms Have Passed", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "restoreNegatedTokenWithCooldown", canRespondTo: ["negatedOwnTokenActivation"], requiredChoices: ["The user's exact negated Token inventory record"], persistence: "exactTokenCooldown", duration: "2 Gyms from the declaration phase anchor", expirationPoint: "At the same phase boundary two Gyms after Counterspell resolves", effectTags: ["Restore", "Cooldown"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Counterspell restores the exact negated owned Token on its persisted two-Gym phase-anchored cooldown.", automaticMutations: ["Restore the exact consumed Token inventory record", "Apply a two-Gym cooldown anchored to the declaration phase", "Keep the original activation negated"], mechanicContract: { requiresOwnedActivatedTokenNegated: true, originalTokenRemainsNegated: true, originalTokenDoesNotResolve: true, restoreExactTokenInventoryRecord: true, cooldownGyms: 2, cooldownScope: "exactRestoredToken", visibleWhileUnusable: true, normalUseReturnsAfterCooldown: true, explicitConsumptionException: true, preserveDeclarationNegationResponseRestorationCooldownRelationship: true, counterspellUsesUniversalLifecycle: true } }),
   761 |     protection({ id: "seven-tools", name: "7 Tools Of The Bandit", aliases: ["7 Tools", "Seven Tools"], rulesText: "When A Player Activates A Protection Token, Use This Token Immediately After. Negate That Protection Token, Then Copy It. The Copied Token Must Be Used During This Gym Or It Is Lost", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "counterProtection", copyActivationMode: copyActivationModes.TEMPORARY_INVENTORY, canRespondTo: ["protectionTokenActivation"], specialPriority: "Immediately after the targeted Protection Token activation", persistence: "temporaryCopiedToken", duration: "Until used or End of Gym", expirationPoint: "End of the current Gym if unused", effectTags: ["Negate", "Copy"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "7 Tools atomically negates the exact Protection response and creates its same-Gym temporary copy.", parentInteraction: "Negate the targeted Protection Token, keep it negated, then create one temporary copy for the 7 Tools user.", automaticMutations: ["Negate the targeted Protection Token", "Create one temporary copy for the 7 Tools user", "Retain copied Token timing, targeting, and effect rules", "Expire the temporary copy unused at End of Gym"], mechanicContract: { respondsOnlyToProtectionTokenActivation: true, negateTargetProtection: true, temporaryCopyCount: 1, copyOwner: "sevenToolsUser", preserveCopiedDefinitionTimingTargetsAndRules: true, permanentInventory: false, expiresAtEndOfCurrentGym: true, recordSourceDefinitionActivationOwnerCreationGymAndExpiration: true, safeguardCopyProtectionMustBeChecked: true, copyModelIsTokenSpecific: true, atomicResolutionRequired: true } }),
   762 |     protection({ id: "immunity", name: "Immunity", aliases: ["Emergency Immunity Token"], rulesText: "Negate any effect or global effect. Does not stop Series Restricts or bans", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "immunity", canRespondTo: ["targetedEffect", "globalEffect"], protectionScope: ["targetedEffect", "globalEffect"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Immunity atomically negates its exact current parent prompt and is covered across reload, undo, results, and sandbox isolation.", automaticMutations: ["Negate the parent prompt"] }),
   763 |     protection({ id: "revenge", name: "Revenge", rulesText: "After a Battle Phase where an opponent cursed a Pokemon you brought, release 2 Pokemon from their brought team and destroy the held item", isResponse: false, legalPhases: [], timingWindows: ["endOfBattlePhaseProcedure"], phaseBoundaryProcedure: "endOfBattlePhaseProcedure", explicitPhaseTiming: "postPayoutBeforeControl", activationPattern: "phaseBoundaryOptionalTrigger", activationType: "Post-payout optional offer", requiresPendingEvent: false, createsPendingEvent: true, opensResponseWindow: false, targetType: "team", targetScope: "singleTeam", targetControllerRelation: "otherPlayer", otherPlayerOnly: true, excludeActor: true, differentControllerRequired: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "revengeRelease", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Revenge is offered after payout from exact current-Gym Curse anchors and the immutable brought-team snapshot. It consumes only after the affected player confirms two exact Pokemon and an optional eligible held Item.", requiredChoices: ["Exactly two exact Pokemon from the offender's immutable brought team", "At most one eligible held item from those two"], guidedTask: { instruction: "Choose exactly two exact roster instances from the offending player's immutable brought-team snapshot, then optionally choose one eligible exactly referenced held item from those two.", responsible: "Affected player", resultLabel: "Revenge Choices", placeholder: "Two exact roster IDs and optional exact held item ID", confirmationLabel: "Apply Revenge" }, mechanicContract: { postPayoutBeforeControl: true, immutableBroughtSnapshotRequired: true, exactReleaseCount: 2, qualifyingCurseMustTargetExactBroughtInstance: true, heldItemSelectionMaximum: 1, heldItemMustBelongToSelectedReleasedPokemon: true, exactHeldInventoryReferenceRequired: true, masterBallTierProtected: true, sameNameInventoryGuessingForbidden: true, atomicResolutionRequired: true, idempotentResolutionRequired: true, adminUndoRequired: true, optionalOfferCanBeDeclinedWithoutConsumption: true, productionChoiceScreenRequired: true } }),
   764 | 
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 | 
   774 |     control({ id: "move-deleter", name: "Move Deleter", aliases: ["Move Deleter Curse"], rulesText: "Ban one move from being brought for 1 week. Cannot be used after team submission", targetType: "resource", targetScope: "singleResource", selectedTargetType: "move", applicationScope: "tableWide", affectedEntityType: "move", targetScopeStatus: "settled", targetControllerRelation: "notApplicable", minTargets: 1, maxTargets: 1, targetCollectionType: "canonicalMove", resolverMode: resolverModes.AUTOMATIC, resolverId: "moveBan", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Move Deleter records one canonical global move restriction for the next Gym and the Teambuilder and validator enforce it.", requiredChoices: ["One canonical move"], persistence: "lingeringEffect", duration: "Next Gym", expirationPoint: "End of the next Gym", automaticMutations: ["Create a global move restriction keyed by canonical move identity", "Disable the move in Teambuilder and team validation during the next Gym", "Expire the restriction when that Gym ends"] }),
   775 |     curse({ id: "toxic-curse", name: "Toxic Curse", rulesText: "Force a Pokemon to carry a Toxic Orb for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Toxic Orb status with exact protected-instance exclusions"] }),
   776 |     curse({ id: "iron-ball-curse", name: "Iron Ball Curse", rulesText: "Force a Pokemon to carry an Iron Ball for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Iron Ball status with exact protected-instance exclusions"] }),
   777 |     curse({ id: "flame-curse", name: "Flame Curse", rulesText: "Force a Pokemon to carry a Flame Orb for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", targetControllerRelation: "anyPlayer", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Flame Orb status with exact protected-instance exclusions"] }),
   778 |     curse({ id: "silencing-curse", name: "Silencing Curse", rulesText: "Restrict a Pokemon to 2 move slots for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide max-two-moves status with exact protected-instance exclusions", "Require explicit per-instance two-move repair where needed"] }),
   779 |     curse({ id: "knock-off-curse", name: "Knock Off Curse", rulesText: "Choose a Pokemon and an Item or TM move. If it is on the Pokemon, remove it from inventory. Masterball items are protected", targetType: "pokemon", targetScope: "rosterInstance", targetControllerRelation: "needsRuling", resolverMode: resolverModes.GUIDED, resolverId: "knockOff", runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Knock Off Curse is unavailable until the legal target-controller relationship is settled and exact Item/TM removal is implemented. The Token is not consumed.", requiredChoices: ["Item or TM name"], guidedTask: { instruction: "Name the Item or TM move to check on the selected Pokemon.", responsible: "Acting player", resultLabel: "Item or TM", placeholder: "Leftovers", confirmationLabel: "Resolve Knock Off" } }),
   780 |     curse({ id: "haze-curse", name: "Haze Curse", rulesText: "Select 2 Pokemon. Their buffs are negated for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "needsRuling", minTargets: 2, maxTargets: 2, targetCollectionType: "validatedRosterInstances", resolverMode: resolverModes.GUIDED, resolverId: "multiStatusEffect", runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Haze Curse is unavailable until the legal controllers for its two species anchors and its two-Gym expiration boundary are settled. The Token is not consumed.", requiredChoices: ["Exactly two Pokemon species anchors"], guidedTask: { instruction: "Choose exactly two Active Roster Pokemon as species anchors. Which controllers are legal remains Needs Ruling.", responsible: "Acting player", resultLabel: "Selected Species", placeholder: "Controller - Pokemon; Controller - Pokemon", confirmationLabel: "Apply Haze" }, persistence: "lingeringEffect", duration: "2 Gyms", expirationPoint: unresolvedMultiGymExpiration }),
   781 |     curse({ id: "imprison-curse", name: "Imprison Curse", rulesText: "Selected Pokemon cannot have EVs or IVs and must use a neutral nature for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide non-destructive no-EVs, no-IVs, neutral-Nature override with exact protected-instance exclusions"] }),
   782 |     curse({ id: "devolve-token", name: "Devolve", aliases: ["Devolve Token"], rulesText: "Selected Pokemon is devolved for 1 gym. During team submission, the target may adjust its set before preview", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "1 Gym", expirationPoint: unresolvedMultiGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Create species-wide Devolved status with exact protected-instance exclusions", "Permit Team Submission set revision"], runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Devolve is unavailable until branch/form selection, temporary species state, set revision, and exact restoration rules are canonical and implemented." }),
   783 |     curse({ id: "purge-curse", name: "Purge Curse", rulesText: "All Pokemon brought to this Battle Phase are released after battle completes. This Token ignores other effects", targetType: "player", targetScope: "singlePlayer", selectedTargetType: "player", applicationScope: "submittedTeamInstances", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "purgeAfterBattle", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Purge records an absolute target-player marker, then atomically releases that player's immutable brought-team snapshot after Gym payout.", opensResponseWindow: false, persistence: "lingeringEffect", duration: "Until the post-payout checkpoint of the current Battle Phase", expirationPoint: "Immediately after Gym payout and before ordinary Control Timing reopens.", automaticMutations: ["Create an absolute Purge marker without an ordinary response window", "Capture the immutable exact brought-team snapshot", "After payout release every exact brought roster instance atomically", "Ignore Substitute, Curse Immunity, redirection, negation, and other gameplay prevention"], mechanicContract: { postPayoutBeforeControl: true, immutableBroughtSnapshotRequired: true, absoluteGameplayEffect: true, canBeRespondedTo: false, canBeNegated: false, canBeRedirected: false, canBeProtected: false, ignoresSubstitute: true, ignoresCurseImmunity: true, atomicResolutionRequired: true, idempotentResolutionRequired: true, adminUndoRequired: true, systemFailureRollbackAndRefundRequired: true } }),
   784 |     curse({ id: "foresight-curse", name: "Foresight Curse", rulesText: "Choose 6 Pokemon. If Any Of Those Pokemon Are Brought To This Battle Phase, Their Sets Become Revealed To You. This Is Not A Nerf/Debuff", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "needsRuling", minTargets: 6, maxTargets: 6, targetCollectionType: "validatedRosterInstances", resolverMode: resolverModes.GUIDED, resolverId: "multiStatusEffect", requiredChoices: ["Exactly six Pokemon species anchors"], guidedTask: { instruction: "Choose exactly six Active Roster Pokemon as species anchors. If matching species are brought, reveal their sets only to the Foresight Curse user. Which controllers are legal remains Needs Ruling.", responsible: "Acting player", resultLabel: "Privately Marked Species", placeholder: "List the six selected Pokemon", confirmationLabel: "Apply Private Foresight" }, persistence: "privateInformationMarker", duration: "Current Battle Phase", expirationPoint: "At the end of the current Battle Phase after its private reveal obligation is complete.", visibility: "sourcePlayerOnly", effectClassification: "privateInformationMarkerNotDebuff", removableBy: [], runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Foresight Curse is unavailable because player-scoped private set delivery is not implemented. No selections or set data are placed in shared game state and the Token is not consumed.", mechanicContract: { selectionCount: 6, selectionUsesRosterInstanceAnchors: true, applicationScope: "globalSpecies", revealOnlyToSourcePlayer: true, authorizedViewer: "sourcePlayer", unauthorizedViewers: "everyOtherPlayer", hostAccessPolicy: "separateAdministrativeAuthorization", clientSideHidingSufficient: false, sharedStatePayloadMayContainSetData: false, automaticRevealEnabled: false, publicReveal: false, privateVisibilityData: true, nerfOrDebuff: false, removableByClearSmog: false, removableByGenericNerfRemoval: false, ownedPokemonRestriction: false, unauthorizedViewsMustNotReceiveOrRenderSetData: true } }),
   785 | 
   786 |     control({ id: "ditto-token", name: "Ditto", rulesText: "Transforms into any Token except Game Corner Tickets", targetType: "resource", targetScope: "singleResource", resolverMode: resolverModes.GUIDED, resolverId: "copyToken", copyActivationMode: copyActivationModes.DITTO, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Ditto is unavailable because its legal Token picker and fresh declaration controller are not implemented, and the handling of phase-boundary-only, response-only, and delayed Tokens outside their native windows is not settled.", requiredChoices: ["Token to copy", "Fresh targets and choices", "Explicit copied-effect costs"], guidedTask: { instruction: "Choose one legal normal Token definition, then create one copied activation with fresh targets, choices, and explicit costs. Do not add that Token to inventory.", responsible: "Acting player", resultLabel: "Copied Activation", placeholder: "Restrict", confirmationLabel: "Use Ditto Activation" }, mechanicContract: { selectedDefinitionMustBeCurrentlyTimingLegal: "needsRuling", phaseBoundaryResponseAndDelayedTokenHandling: "needsRuling" } })
   787 |   ];
   788 | 
```


#### Hit 5 — line 817

```text
   799 |       runtimeUsability: runtimeUsabilityStatuses.USABLE,
   800 |       runtimeUsabilityReason: "Knock Off uses one exact Active-roster anchor and destroys its exact held Item or exact TM inventory grant, opening mandatory set revision when final TM access is lost.",
   801 |       mechanicContract: { exactRosterInstanceRequired: true, activeRosterRequired: true, exactInventoryRecordRequired: true, heldItemOrCurrentSetTmMoveOnly: true, masterBallTierProtected: true, finalTmCopyLossRevokesAccess: true, naturalOrOtherMoveSourcesRemainLegal: true, mandatoryTeamRevisionAfterSabotage: true, preserveTeamMembershipAndUnrelatedSetChoices: true, atomicMutationRequired: true }
   802 |     },
   803 |     "haze-curse": {
   804 |       targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "hazeCurse",
   805 |       runtimeUsability: runtimeUsabilityStatuses.USABLE,
   806 |       runtimeUsabilityReason: "Haze selects two exact Active-roster anchors with different species and suppresses structured buffs across each species with per-instance protection.",
   807 |       expirationPoint: phaseAnchoredTwoGymExpiration,
   808 |       mechanicContract: { exactSelectionCount: 2, differentSpeciesRequired: true, applicationScope: "globalSpecies", structuredBuffsSuppressedNotDeleted: true, perInstanceProtection: true, phaseAnchoredDurationGyms: 2 }
   809 |     },
   810 |     "devolve-token": {
   811 |       targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "devolveCurse",
   812 |       runtimeUsability: runtimeUsabilityStatuses.USABLE,
   813 |       runtimeUsabilityReason: "Devolve validates one unambiguous safe direct pre-evolution, applies a temporary species overlay to unprotected matching Active instances, and restores exact records at expiration.",
   814 |       expirationPoint: "At the same phase boundary one Gym later.",
   815 |       mechanicContract: { selectedAnchorScope: "rosterInstance", applicationScope: "globalSpecies", directPreEvolutionOnly: true, ambiguousOrUnsafeParentFailsBeforeConsumption: true, stableRosterIdentityRequired: true, temporarySpeciesOverlayRequired: true, mandatoryTeamRevisionWhenBuildIllegal: true, preserveTeamMembership: true, exactExpirationRestoration: true, perInstanceProtection: true }
   816 |     },
   817 |     "honey-token": {
   818 |       resolverMode: resolverModes.AUTOMATIC, resolverId: "encounterCopy", copiedPayloadStatus: "settled",
   819 |       runtimeUsability: runtimeUsabilityStatuses.USABLE,
   820 |       runtimeUsabilityReason: "Honey copies one immutable completed Encounter result at the End-of-Action checkpoint into a new acquisition-ready Encounter record without rerolling or copying ownership and transient history.",
   821 |       opensResponseWindow: false,
   822 |       mechanicContract: { immutableCompletedEncounterRequired: true, currentActionPhaseOnly: true, exactSelectionWhenMultiple: true, copiedSpeciesFormTierLevelAndIntrinsicProperties: true, newEncounterAndRosterIdentitiesRequired: true, doNotCopyOwnershipStatusHeldItemsRerollHistoryConsumedModifiersBonusesOrReferences: true, duplicateCopyForbidden: true }
   823 |     },
   824 |     "ditto-token": {
   825 |       targetType: "resource", targetScope: "singleResource", resolverMode: resolverModes.AUTOMATIC, resolverId: "copyTokenInventory",
   826 |       runtimeUsability: runtimeUsabilityStatuses.USABLE,
   827 |       runtimeUsabilityReason: "Ditto transforms its exact owned inventory record into one canonical inventory copy chosen from the searchable activatable Token catalog; it does not activate the copy immediately.",
   828 |       requiredChoices: ["One canonical activatable Token definition"],
   829 |       mechanicContract: { exactOwnedDittoInventoryRecordRequired: true, createsCanonicalInventoryCopy: true, immediateActivation: false, excludesDitto: true, stableIdentityAndProvenanceRequired: true }
   830 |     },
   831 |     "follow-me": {
   832 |       runtimeUsability: runtimeUsabilityStatuses.USABLE,
   833 |       runtimeUsabilityReason: "Follow Me redirects one legal corresponding player or Pokemon target, then creates an idempotent Gym-long relationship that copies later real inventory Token consumption into inventory.",
   834 |       mechanicContract: { initialRedirectOperation: "replaceOneCorrespondingTarget", requiresLegalCorrespondingTarget: true, excludesGlobalAndTargetlessEffects: true, preserveSourceCostTextTargetTypeTargetCountAndUnaffectedTargets: true, ongoingEffectBeginsAfterRedirectedParentResolves: true, ongoingEffectDuration: "currentGym", copyEachLaterTokenUsedByRecordedPlayer: true, copiesOnlyRealInventoryConsumption: true, copiedTokenAddedToInventory: true, copiedTokenNotImmediatelyActivated: true, copiedActivationsDoNotRecurse: true, copySemanticsStatus: "settled" }
   835 |     },
```


#### Hit 6 — line 1192

```text
  1174 |           || immunity.supported !== true || immunity.negatesOriginal !== true
  1175 |           || sevenTools.supported !== false) {
  1176 |           errors.push(`${definition.id}: incomplete explicit Protection interaction matrix`);
  1177 |         }
  1178 |       }
  1179 |       if (definition.id === "foresight-curse") {
  1180 |         const mechanic = definition.mechanicContract;
  1181 |         if (definition.visibility !== "sourcePlayerOnly" || definition.effectClassification !== "privateInformationMarkerNotDebuff"
  1182 |           || mechanic.selectionCount !== 6 || mechanic.revealOnlyToSourcePlayer !== true || mechanic.publicReveal !== false
  1183 |           || mechanic.nerfOrDebuff !== false || mechanic.removableByClearSmog !== false
  1184 |           || mechanic.removableByGenericNerfRemoval !== false || mechanic.ownedPokemonRestriction !== false
  1185 |           || mechanic.unauthorizedViewsMustNotReceiveOrRenderSetData !== true
  1186 |           || mechanic.authorizedViewer !== "sourcePlayer" || mechanic.unauthorizedViewers !== "everyOtherPlayer"
  1187 |           || mechanic.clientSideHidingSufficient !== false || mechanic.sharedStatePayloadMayContainSetData !== false
  1188 |           || definition.runtimeUsability !== runtimeUsabilityStatuses.BLOCKED) {
  1189 |           errors.push(`${definition.id}: incomplete private non-debuff reveal contract`);
  1190 |         }
  1191 |       }
  1192 |       if (definition.id === "honey-token") {
  1193 |         if (definition.legalPhases.includes("encounterResult") || definition.timingWindows.includes("encounterResult") || definition.isResponse || definition.requiresPendingEvent) {
  1194 |           errors.push(`${definition.id}: Honey cannot publish encounterResult response timing`);
  1195 |         }
  1196 |         if (definition.phaseBoundaryProcedure !== "endOfActionPhaseProcedure" || definition.explicitPhaseTiming !== "endOfActionPhase"
  1197 |           || definition.activationPattern !== "phaseBoundaryOptionalTrigger" || definition.eligibleRecordType !== "encounter"
  1198 |           || definition.eligibleRecordWindow !== "currentActionPhase" || definition.selectionCount !== 1
  1199 |           || definition.copiedPayloadStatus !== "settled" || !definition.createsPendingEvent || definition.opensResponseWindow
  1200 |           || definition.runtimeImplementationStatus !== runtimeImplementationStatuses.VERIFIED_COMPLETE
  1201 |           || definition.runtimeUsability !== runtimeUsabilityStatuses.USABLE) {
  1202 |           errors.push(`${definition.id}: incomplete End-of-Action boundary-offer metadata`);
  1203 |         }
  1204 |       }
  1205 |       if (definition.id === "purge-curse" && /targeted player's Battle Phase/i.test(definition.hostTask?.instruction || "")) {
  1206 |         errors.push(`${definition.id}: host task uses the obsolete targeted player's Battle Phase wording`);
  1207 |       }
  1208 |       if (definition.runtimeImplementationStatus === runtimeImplementationStatuses.VERIFIED_COMPLETE) {
  1209 |         const verification = runtimeVerificationById[definition.id];
  1210 |         if (!verification) errors.push(`${definition.id}: verifiedComplete lacks a verification-registry entry`);
```


### master-ball-token

Occurrences: 2

#### Hit 1 — line 92

```text
    74 |         createsInventoryRecord: true,
    75 |         sourceWindow: "exactNegatedProtectionToken",
    76 |         lifetime: "temporaryInventoryRecord",
    77 |         copiedActivationsCannotBeCopied: true
    78 |       }
    79 |     };
    80 |     return Object.freeze(policies[mode] || { ...common, sourceWindow: "unknown", lifetime: "unknown" });
    81 |   }
    82 | 
    83 |   const runtimeStatusGroups = Object.freeze({
    84 |     partial: [
    85 |       "restrict-token", "arena-trap", "clear-smog", "rage-candy-bar", "extra-ban-token", "unban-token", "steal-token",
    86 |       "incinerate", "wicked-blow", "cold-wave", "move-deleter", "smokescreen", "after-you", "ditto-token", "purge-curse", "teleport", "revenge",
    87 |       "safeguard", "substitute", "seven-tools", "counterspell", "follow-me", "embargo", "reroll-token",
    88 |       "devolve-token", "honey-token", "knock-off-curse", "haze-curse", "lingering-aroma"
    89 |     ],
    90 |     textOnly: [
    91 |       "class-change", "rebrand", "parting-shot",
    92 |       "repel-token", "quick-ball-token", "dream-ball-token", "master-ball-token", "beast-ball-token", "foresight-curse"
    93 |     ],
    94 |     blockedByRuling: []
    95 |   });
    96 | 
    97 |   const runtimeStatusById = Object.freeze(Object.fromEntries(Object.entries(runtimeStatusGroups)
    98 |     .flatMap(([status, ids]) => ids.map((id) => [id, status]))));
    99 | 
   100 |   const contractDefinitionRevision = "2026-08-04-lifecycle-completion-slice-v3";
   101 |   const registeredRuntimeVerificationTests = Object.freeze([
   102 |     "token-declaration-timing",
   103 |     "token-response-parent-chain",
   104 |     "token-multi-target-validation",
   105 |     "token-reload-persistence",
   106 |     "token-sandbox-isolation",
   107 |     "token-undo-repair",
   108 |     "token-inventory-runtime",
   109 |     "standard-curse-species-lifecycle",
   110 |     "encounter-token-runtime",
```


#### Hit 2 — line 771

```text
   753 |     protection({ id: "teleport", name: "Teleport", rulesText: "Delay an effect until the start of the next matching phase during the next gym", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "delayParent", canRespondTo: ["delayableEffect"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Teleport is production-usable for exact declared Token events handled by the Control controller. Unsupported or nested response effects are hidden and fail before consumption.", requiredChoices: [], parentInteraction: "Close the parent as delayed and preserve one authoritative delayed-effect record. At the next Gym's matching phase, revalidate without retargeting and resolve using the actual resolution phase anchor.", persistence: "delayedEffectRecord", duration: "Until the start of the next matching phase during the next Gym", expirationPoint: "Terminal after resolution, gameplay-illegal no-effect, or system-failure cancellation and refund.", mechanicContract: { nextGymSamePhaseRequired: true, declarationPhaseAnchorPreserved: true, resolutionDurationAnchorsToActualResolutionPhase: true, revalidateAtReturn: true, gameplayIllegalityResult: "resolvedNoEffect", gameplayIllegalityConsumesTeleportAndParent: true, gameplayIllegalityRetargets: false, gameplayIllegalityRefunds: false, systemCorruptUnsupportedResult: "canceledRefunded", duplicateResolutionForbidden: true, refreshPersistenceRequired: true, supportedProductionParents: "exact declared Token events handled by the Control controller", unsupportedParentsFailBeforeConsumption: true } }),
   754 |     protection({ id: "substitute", name: "Substitute", rulesText: "Choose a Pokemon to protect from one effect. If it would be banned, it is not banned and cannot be banned again during this phase", isResponse: false, legalPhases: ["action", "teamBuilding"], timingWindows: ["action", "teamBuilding"], activationPattern: "proactive", requiresPendingEvent: false, targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "pokemon", applicationScope: "rosterInstance", affectedEntityType: "pokemon", targetControllerRelation: "self", selfOnly: true, magicianLegalAlternateTargetExplanation: "Magician may change the target only to another Pokemon owned by the Substitute user.", resolverMode: resolverModes.AUTOMATIC, resolverId: "substituteAttach", createsPendingEvent: false, opensResponseWindow: false, persistence: "lingeringEffect", duration: "Until used or Gym end", expirationPoint: "When its one-use protection is spent or at the approved End-of-Gym expiration checkpoint, whichever occurs first.", automaticMutations: ["Attach one-use Substitute protection to the selected roster instance", "Intercept after responses and before parent mutation", "Normally exempt only that roster instance", "Negate an entire species-wide Ban and create current-phase Ban protection"] }),
   755 |     protection({ id: "follow-me", name: "Follow Me", rulesText: "When Another Player Or Another Player's Pokemon Is Targeted By An Effect, Change The Target To You Or One Of Your Legal Pokemon Instead. The New Target Must Be A Legal Target For The Original Effect. After This Effect Resolves, For The Rest Of This Gym, Copy Each Token Used By The Player Whose Effect You Redirected. Follow Me Cannot Redirect Global Effects Or Effects That Do Not Target A Player Or Pokemon", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "redirectParentToSelf", copyActivationMode: copyActivationModes.FOLLOW_ME, canRespondTo: ["singlePlayerTarget", "rosterInstanceTarget"], parentInteraction: "Replace one corresponding target with the Follow Me user or one of that user's legal Pokemon, preserve unaffected targets, then after the redirected parent resolves create the Gym-long Copy relationship.", persistence: "lingeringEffect", duration: "Through the current Gym after the redirected parent resolves", expirationPoint: "End of Gym", effectTags: ["Redirect", "Copy"], runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Follow Me is unavailable because its Gym-long Copy relationship is not implemented and the mandatory/optional plus relative-resolution order of each later copied activation is not settled. No target is redirected and the Token is not consumed.", automaticMutations: ["Replace one corresponding parent target", "Preserve source, cost, text, target type, target count, and unaffected targets", "Record the redirected effect's source player", "Create a Gym-long ongoing Copy relationship after parent resolution"], mechanicContract: { initialRedirectOperation: "replaceOneCorrespondingTarget", requiresLegalCorrespondingTarget: true, excludesGlobalAndTargetlessEffects: true, preserveSourceCostTextTargetTypeTargetCountAndUnaffectedTargets: true, ongoingEffectBeginsAfterRedirectedParentResolves: true, ongoingEffectDuration: "currentGym", copyEachLaterTokenUsedByRecordedPlayer: true, copiedActivationChoiceRequirement: "needsRuling", copiedActivationRelativeOrder: "needsRuling", copySemanticsStatus: "settled" } }),
   756 |     protection({ id: "parting-shot", name: "Parting Shot", rulesText: "During Team Preview, switch a previewed Pokemon for another party Pokemon. Cursed-swap retaliation is tracked manually", isResponse: false, legalPhases: ["teamPreview"], timingWindows: ["teamPreview"], activationPattern: "phaseSpecific", activationType: "Team Preview declaration", requiresPendingEvent: false, createsPendingEvent: true, opensResponseWindow: true, targetType: "team", targetScope: "singleTeam", resolverMode: resolverModes.GUIDED, resolverId: "teamPreviewSwap", requiredChoices: ["Pokemon out", "Pokemon in"], guidedTask: { instruction: "Choose the revealed Pokemon leaving and the legal party Pokemon replacing it.", responsible: "Affected player", resultLabel: "Completed Swap", placeholder: "Abra out; Grovyle in", confirmationLabel: "Apply Team Swap" } }),
   757 |     protection({ id: "embargo", name: "Embargo", rulesText: "Target player can only use one more Token this gym. You cannot use another Token after this resolves", targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "playerStatus", persistence: "lingeringEffect", duration: "Until Gym end", expirationPoint: "At the approved End-of-Gym expiration checkpoint.", automaticMutations: ["Limit target to one more Token", "Prevent the acting player from using another Token this Gym"] }),
   758 |     protection({ id: "after-you", name: "After You", rulesText: "After a player declares an effect, copy and use it", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "copyParentEffect", copyActivationMode: copyActivationModes.AFTER_YOU, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "After You is unavailable because its fresh target/choice and explicit-cost controller is not implemented, and the copyable effect-source classes plus relative chain order are not settled.", requiredChoices: ["Copied effect target and choices"], guidedTask: { instruction: "Copy the parent effect, then enter fresh legal targets, choices, and any explicit costs required by that effect.", responsible: "Responding player", resultLabel: "Copied Effect Result", placeholder: "Describe target, choices, costs, and result", confirmationLabel: "Resolve Copied Effect" }, mechanicContract: { copyableSourceTypes: "needsRuling", copiedActivationRelativeOrder: "needsRuling" } }),
   759 |     protection({ id: "smokescreen", name: "Smokescreen", rulesText: "When You Or Your Pokemon Are Targetted For An Effect, Spin A Wheel With All Players. The Result Is The New Target Of That Effect. If Pokemon Are Targetted When This Is Used, Choose A Legal Target From That Player Landed On. Your Original Target Remains The Same", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "smokescreenRedirect", canRespondTo: ["singlePlayerTarget", "rosterInstanceTarget"], requiredChoices: ["Wheel result player", "One legal corresponding Pokemon when the parent targets Pokemon and the result changes player"], guidedTask: { instruction: "Spin once with every player represented exactly once. Keep the original target when its player wins or when another winning player has no legal corresponding target; otherwise choose one legal corresponding target owned by that player.", responsible: "Targeted player", resultLabel: "Redirect Result", placeholder: "Gold - Lucario", confirmationLabel: "Confirm Smokescreen" }, parentInteraction: "Replace the original selected target only when the wheel lands on another player with a legal corresponding target. Preserve the source, costs, text, target category, target count, and every unaffected target.", effectTags: ["Redirect"], runtimeUsability: runtimeUsabilityStatuses.GUIDED_ONLY, runtimeUsabilityReason: "Smokescreen uses the guided wheel and corresponding-target confirmation flow; it cannot fall back to additive or arbitrary target behavior.", mechanicContract: { targetOperation: "replaceOneCorrespondingTarget", wheelIncludesEveryPlayerExactlyOnce: true, originalPlayerResultKeepsTarget: true, playerParentUsesLandedPlayer: true, pokemonParentChoosesLegalPokemonOwnedByLandedPlayer: true, preserveSourceCostTextTargetCategoryTargetCountAndOtherTargets: true, noLegalCorrespondingTargetHandling: "keepOriginalTarget", redirectReplacement: true, recursiveWheel: false } }),
   760 |     protection({ id: "counterspell", name: "Counterspell", rulesText: "When One Of Your Tokens Is Negated, Use This Token. The Negated Token Is Not Consumed. That Token Cannot Be Used Again Until 2 Gyms Have Passed", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "restoreNegatedTokenWithCooldown", canRespondTo: ["negatedOwnTokenActivation"], requiredChoices: ["The user's exact negated Token inventory record"], persistence: "exactTokenCooldown", duration: "2 Gyms from the declaration phase anchor", expirationPoint: "At the same phase boundary two Gyms after Counterspell resolves", effectTags: ["Restore", "Cooldown"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Counterspell restores the exact negated owned Token on its persisted two-Gym phase-anchored cooldown.", automaticMutations: ["Restore the exact consumed Token inventory record", "Apply a two-Gym cooldown anchored to the declaration phase", "Keep the original activation negated"], mechanicContract: { requiresOwnedActivatedTokenNegated: true, originalTokenRemainsNegated: true, originalTokenDoesNotResolve: true, restoreExactTokenInventoryRecord: true, cooldownGyms: 2, cooldownScope: "exactRestoredToken", visibleWhileUnusable: true, normalUseReturnsAfterCooldown: true, explicitConsumptionException: true, preserveDeclarationNegationResponseRestorationCooldownRelationship: true, counterspellUsesUniversalLifecycle: true } }),
   761 |     protection({ id: "seven-tools", name: "7 Tools Of The Bandit", aliases: ["7 Tools", "Seven Tools"], rulesText: "When A Player Activates A Protection Token, Use This Token Immediately After. Negate That Protection Token, Then Copy It. The Copied Token Must Be Used During This Gym Or It Is Lost", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "counterProtection", copyActivationMode: copyActivationModes.TEMPORARY_INVENTORY, canRespondTo: ["protectionTokenActivation"], specialPriority: "Immediately after the targeted Protection Token activation", persistence: "temporaryCopiedToken", duration: "Until used or End of Gym", expirationPoint: "End of the current Gym if unused", effectTags: ["Negate", "Copy"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "7 Tools atomically negates the exact Protection response and creates its same-Gym temporary copy.", parentInteraction: "Negate the targeted Protection Token, keep it negated, then create one temporary copy for the 7 Tools user.", automaticMutations: ["Negate the targeted Protection Token", "Create one temporary copy for the 7 Tools user", "Retain copied Token timing, targeting, and effect rules", "Expire the temporary copy unused at End of Gym"], mechanicContract: { respondsOnlyToProtectionTokenActivation: true, negateTargetProtection: true, temporaryCopyCount: 1, copyOwner: "sevenToolsUser", preserveCopiedDefinitionTimingTargetsAndRules: true, permanentInventory: false, expiresAtEndOfCurrentGym: true, recordSourceDefinitionActivationOwnerCreationGymAndExpiration: true, safeguardCopyProtectionMustBeChecked: true, copyModelIsTokenSpecific: true, atomicResolutionRequired: true } }),
   762 |     protection({ id: "immunity", name: "Immunity", aliases: ["Emergency Immunity Token"], rulesText: "Negate any effect or global effect. Does not stop Series Restricts or bans", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "immunity", canRespondTo: ["targetedEffect", "globalEffect"], protectionScope: ["targetedEffect", "globalEffect"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Immunity atomically negates its exact current parent prompt and is covered across reload, undo, results, and sandbox isolation.", automaticMutations: ["Negate the parent prompt"] }),
   763 |     protection({ id: "revenge", name: "Revenge", rulesText: "After a Battle Phase where an opponent cursed a Pokemon you brought, release 2 Pokemon from their brought team and destroy the held item", isResponse: false, legalPhases: [], timingWindows: ["endOfBattlePhaseProcedure"], phaseBoundaryProcedure: "endOfBattlePhaseProcedure", explicitPhaseTiming: "postPayoutBeforeControl", activationPattern: "phaseBoundaryOptionalTrigger", activationType: "Post-payout optional offer", requiresPendingEvent: false, createsPendingEvent: true, opensResponseWindow: false, targetType: "team", targetScope: "singleTeam", targetControllerRelation: "otherPlayer", otherPlayerOnly: true, excludeActor: true, differentControllerRequired: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "revengeRelease", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Revenge is offered after payout from exact current-Gym Curse anchors and the immutable brought-team snapshot. It consumes only after the affected player confirms two exact Pokemon and an optional eligible held Item.", requiredChoices: ["Exactly two exact Pokemon from the offender's immutable brought team", "At most one eligible held item from those two"], guidedTask: { instruction: "Choose exactly two exact roster instances from the offending player's immutable brought-team snapshot, then optionally choose one eligible exactly referenced held item from those two.", responsible: "Affected player", resultLabel: "Revenge Choices", placeholder: "Two exact roster IDs and optional exact held item ID", confirmationLabel: "Apply Revenge" }, mechanicContract: { postPayoutBeforeControl: true, immutableBroughtSnapshotRequired: true, exactReleaseCount: 2, qualifyingCurseMustTargetExactBroughtInstance: true, heldItemSelectionMaximum: 1, heldItemMustBelongToSelectedReleasedPokemon: true, exactHeldInventoryReferenceRequired: true, masterBallTierProtected: true, sameNameInventoryGuessingForbidden: true, atomicResolutionRequired: true, idempotentResolutionRequired: true, adminUndoRequired: true, optionalOfferCanBeDeclinedWithoutConsumption: true, productionChoiceScreenRequired: true } }),
   764 | 
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 | 
   774 |     control({ id: "move-deleter", name: "Move Deleter", aliases: ["Move Deleter Curse"], rulesText: "Ban one move from being brought for 1 week. Cannot be used after team submission", targetType: "resource", targetScope: "singleResource", selectedTargetType: "move", applicationScope: "tableWide", affectedEntityType: "move", targetScopeStatus: "settled", targetControllerRelation: "notApplicable", minTargets: 1, maxTargets: 1, targetCollectionType: "canonicalMove", resolverMode: resolverModes.AUTOMATIC, resolverId: "moveBan", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Move Deleter records one canonical global move restriction for the next Gym and the Teambuilder and validator enforce it.", requiredChoices: ["One canonical move"], persistence: "lingeringEffect", duration: "Next Gym", expirationPoint: "End of the next Gym", automaticMutations: ["Create a global move restriction keyed by canonical move identity", "Disable the move in Teambuilder and team validation during the next Gym", "Expire the restriction when that Gym ends"] }),
   775 |     curse({ id: "toxic-curse", name: "Toxic Curse", rulesText: "Force a Pokemon to carry a Toxic Orb for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Toxic Orb status with exact protected-instance exclusions"] }),
   776 |     curse({ id: "iron-ball-curse", name: "Iron Ball Curse", rulesText: "Force a Pokemon to carry an Iron Ball for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Iron Ball status with exact protected-instance exclusions"] }),
   777 |     curse({ id: "flame-curse", name: "Flame Curse", rulesText: "Force a Pokemon to carry a Flame Orb for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", targetControllerRelation: "anyPlayer", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Flame Orb status with exact protected-instance exclusions"] }),
   778 |     curse({ id: "silencing-curse", name: "Silencing Curse", rulesText: "Restrict a Pokemon to 2 move slots for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide max-two-moves status with exact protected-instance exclusions", "Require explicit per-instance two-move repair where needed"] }),
   779 |     curse({ id: "knock-off-curse", name: "Knock Off Curse", rulesText: "Choose a Pokemon and an Item or TM move. If it is on the Pokemon, remove it from inventory. Masterball items are protected", targetType: "pokemon", targetScope: "rosterInstance", targetControllerRelation: "needsRuling", resolverMode: resolverModes.GUIDED, resolverId: "knockOff", runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Knock Off Curse is unavailable until the legal target-controller relationship is settled and exact Item/TM removal is implemented. The Token is not consumed.", requiredChoices: ["Item or TM name"], guidedTask: { instruction: "Name the Item or TM move to check on the selected Pokemon.", responsible: "Acting player", resultLabel: "Item or TM", placeholder: "Leftovers", confirmationLabel: "Resolve Knock Off" } }),
   780 |     curse({ id: "haze-curse", name: "Haze Curse", rulesText: "Select 2 Pokemon. Their buffs are negated for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "needsRuling", minTargets: 2, maxTargets: 2, targetCollectionType: "validatedRosterInstances", resolverMode: resolverModes.GUIDED, resolverId: "multiStatusEffect", runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Haze Curse is unavailable until the legal controllers for its two species anchors and its two-Gym expiration boundary are settled. The Token is not consumed.", requiredChoices: ["Exactly two Pokemon species anchors"], guidedTask: { instruction: "Choose exactly two Active Roster Pokemon as species anchors. Which controllers are legal remains Needs Ruling.", responsible: "Acting player", resultLabel: "Selected Species", placeholder: "Controller - Pokemon; Controller - Pokemon", confirmationLabel: "Apply Haze" }, persistence: "lingeringEffect", duration: "2 Gyms", expirationPoint: unresolvedMultiGymExpiration }),
   781 |     curse({ id: "imprison-curse", name: "Imprison Curse", rulesText: "Selected Pokemon cannot have EVs or IVs and must use a neutral nature for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide non-destructive no-EVs, no-IVs, neutral-Nature override with exact protected-instance exclusions"] }),
   782 |     curse({ id: "devolve-token", name: "Devolve", aliases: ["Devolve Token"], rulesText: "Selected Pokemon is devolved for 1 gym. During team submission, the target may adjust its set before preview", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "1 Gym", expirationPoint: unresolvedMultiGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Create species-wide Devolved status with exact protected-instance exclusions", "Permit Team Submission set revision"], runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Devolve is unavailable until branch/form selection, temporary species state, set revision, and exact restoration rules are canonical and implemented." }),
   783 |     curse({ id: "purge-curse", name: "Purge Curse", rulesText: "All Pokemon brought to this Battle Phase are released after battle completes. This Token ignores other effects", targetType: "player", targetScope: "singlePlayer", selectedTargetType: "player", applicationScope: "submittedTeamInstances", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "purgeAfterBattle", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Purge records an absolute target-player marker, then atomically releases that player's immutable brought-team snapshot after Gym payout.", opensResponseWindow: false, persistence: "lingeringEffect", duration: "Until the post-payout checkpoint of the current Battle Phase", expirationPoint: "Immediately after Gym payout and before ordinary Control Timing reopens.", automaticMutations: ["Create an absolute Purge marker without an ordinary response window", "Capture the immutable exact brought-team snapshot", "After payout release every exact brought roster instance atomically", "Ignore Substitute, Curse Immunity, redirection, negation, and other gameplay prevention"], mechanicContract: { postPayoutBeforeControl: true, immutableBroughtSnapshotRequired: true, absoluteGameplayEffect: true, canBeRespondedTo: false, canBeNegated: false, canBeRedirected: false, canBeProtected: false, ignoresSubstitute: true, ignoresCurseImmunity: true, atomicResolutionRequired: true, idempotentResolutionRequired: true, adminUndoRequired: true, systemFailureRollbackAndRefundRequired: true } }),
   784 |     curse({ id: "foresight-curse", name: "Foresight Curse", rulesText: "Choose 6 Pokemon. If Any Of Those Pokemon Are Brought To This Battle Phase, Their Sets Become Revealed To You. This Is Not A Nerf/Debuff", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "needsRuling", minTargets: 6, maxTargets: 6, targetCollectionType: "validatedRosterInstances", resolverMode: resolverModes.GUIDED, resolverId: "multiStatusEffect", requiredChoices: ["Exactly six Pokemon species anchors"], guidedTask: { instruction: "Choose exactly six Active Roster Pokemon as species anchors. If matching species are brought, reveal their sets only to the Foresight Curse user. Which controllers are legal remains Needs Ruling.", responsible: "Acting player", resultLabel: "Privately Marked Species", placeholder: "List the six selected Pokemon", confirmationLabel: "Apply Private Foresight" }, persistence: "privateInformationMarker", duration: "Current Battle Phase", expirationPoint: "At the end of the current Battle Phase after its private reveal obligation is complete.", visibility: "sourcePlayerOnly", effectClassification: "privateInformationMarkerNotDebuff", removableBy: [], runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Foresight Curse is unavailable because player-scoped private set delivery is not implemented. No selections or set data are placed in shared game state and the Token is not consumed.", mechanicContract: { selectionCount: 6, selectionUsesRosterInstanceAnchors: true, applicationScope: "globalSpecies", revealOnlyToSourcePlayer: true, authorizedViewer: "sourcePlayer", unauthorizedViewers: "everyOtherPlayer", hostAccessPolicy: "separateAdministrativeAuthorization", clientSideHidingSufficient: false, sharedStatePayloadMayContainSetData: false, automaticRevealEnabled: false, publicReveal: false, privateVisibilityData: true, nerfOrDebuff: false, removableByClearSmog: false, removableByGenericNerfRemoval: false, ownedPokemonRestriction: false, unauthorizedViewsMustNotReceiveOrRenderSetData: true } }),
   785 | 
   786 |     control({ id: "ditto-token", name: "Ditto", rulesText: "Transforms into any Token except Game Corner Tickets", targetType: "resource", targetScope: "singleResource", resolverMode: resolverModes.GUIDED, resolverId: "copyToken", copyActivationMode: copyActivationModes.DITTO, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Ditto is unavailable because its legal Token picker and fresh declaration controller are not implemented, and the handling of phase-boundary-only, response-only, and delayed Tokens outside their native windows is not settled.", requiredChoices: ["Token to copy", "Fresh targets and choices", "Explicit copied-effect costs"], guidedTask: { instruction: "Choose one legal normal Token definition, then create one copied activation with fresh targets, choices, and explicit costs. Do not add that Token to inventory.", responsible: "Acting player", resultLabel: "Copied Activation", placeholder: "Restrict", confirmationLabel: "Use Ditto Activation" }, mechanicContract: { selectedDefinitionMustBeCurrentlyTimingLegal: "needsRuling", phaseBoundaryResponseAndDelayedTokenHandling: "needsRuling" } })
   787 |   ];
   788 | 
   789 |   const settledRuleOverrides = Object.freeze({
```


### extraEncounter

Occurrences: 2

#### Hit 1 — line 380

```text
   362 |     "gymStartPreparationControl", "actionOpenControl", "teamBuilding", "shop", "postBattleControl"
   363 |   ]);
   364 |   const curseControlContexts = Object.freeze([...ordinaryControlContexts, "sabotageCurseWindow"]);
   365 |   const legacyControlTimingWindows = Object.freeze(["actionOpen", "teamBuilding", "shopOpen"]);
   366 |   const curseTimingWindows = Object.freeze([...legacyControlTimingWindows, "sabotage"]);
   367 |   const phaseBoundaryProcedureValues = Object.freeze(["endOfActionPhaseProcedure", "endOfBattlePhaseProcedure"]);
   368 |   const timingStatusValues = Object.freeze(["settled", "needsRuling"]);
   369 |   const targetTypes = Object.freeze(["none", "currentPrompt", "pokemon", "player", "team", "encounterResult", "resource", "table", "manual"]);
   370 |   const selectedTargetTypes = Object.freeze([...targetTypes, "rosterInstance", "species", "move"]);
   371 |   const targetScopes = Object.freeze(["none", "currentPrompt", "species", "rosterInstance", "singlePlayer", "allPlayers", "singleTeam", "allTeams", "singleResource", "allMatchingResources", "tableWide", "manual"]);
   372 |   const applicationScopes = Object.freeze(["rosterInstance", "selectedRosterInstances", "submittedTeamInstances", "playerRosterInstances", "globalSpecies", "singlePlayer", "allPlayers", "tableWide", "manual"]);
   373 |   const targetControllerRelations = Object.freeze([
   374 |     "notApplicable", "anyPlayer", "self", "otherPlayer", "rival", "everyOtherPlayer", "sameController", "differentController", "needsRuling"
   375 |   ]);
   376 |   const redirectPolicyStatuses = Object.freeze(["allowed", "notAllowed", "needsRuling"]);
   377 |   const registeredResolverIds = Object.freeze([
   378 |     "hostConfirmed", "trainerClassWheel", "restrict", "utilityEffect", "wickedBlow", "statusEffect", "safeguard", "delayParent",
   379 |     "substituteAttach", "redirectParentToSelf", "teamPreviewSwap", "playerStatus", "copyParentEffect", "randomRedirect", "immunity",
   380 |     "revengeRelease", "reroll", "extraEncounter", "encounterWheelEdit", "encounterTransfer", "encounterGrant", "encounterCopy",
   381 |     "encounterChoose", "moveBan", "knockOff", "multiStatusEffect", "purgeAfterBattle", "copyToken",
   382 |     "arenaTrap", "clearSmog", "extraBan", "counterProtection", "ongoingEffectTextReplacement", "ongoingEffectSuppression",
   383 |     "hazeCurse", "devolveCurse", "copyTokenInventory",
   384 |     "restoreNegatedTokenWithCooldown", "smokescreenRedirect"
   385 |   ]);
   386 | 
   387 |   const finalResults = Object.freeze({
   388 |     REJECTED: "rejected",
   389 |     WITHDRAWN: "withdrawn",
   390 |     RESOLVED: "resolved",
   391 |     NEGATED: "negated",
   392 |     BLOCKED: "blocked",
   393 |     PARTIALLY_RESOLVED: "partiallyResolved",
   394 |     RESOLVED_NO_EFFECT: "resolvedNoEffect",
   395 |     CANCELED_REFUNDED: "canceledRefunded",
   396 |     CANCELED: "canceledRefunded",
   397 |     NO_EFFECT: "resolvedNoEffect",
   398 |     DELAYED: "delayed",
```


#### Hit 2 — line 766

```text
   748 |     control({ id: "unban-token", name: "Unban", aliases: ["Unban Token"], rulesText: "Unban a Pokemon. It cannot be banned again for 6 gyms", targetType: "pokemon", targetScope: "species", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "6 Gyms", expirationPoint: unresolvedMultiGymExpiration, automaticMutations: ["Remove active Ban or Restrict", "Create Unban protection", "Update global Pokemon legality"] }),
   749 |     control({ id: "incinerate", name: "Incinerate", rulesText: "Choose one Item or TM from every other player except Masterball items and remove it from their bag", targetType: "resource", targetScope: "allMatchingResources", selectedTargetType: "resource", applicationScope: "allPlayers", affectedEntityType: "resource", targetControllerRelation: "everyOtherPlayer", excludeActor: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "utilityEffect", requiredChoices: ["One exact legal Item or TM record from each other player who has one"], effectTags: ["Destroy"], automaticMutations: ["Validate one stable-ID non-Master-Ball Item or TM selection for each eligible opposing player", "Skip opposing players who have no legal target", "Atomically destroy every exact selected inventory record", "Record each destruction as a stable-ID effect operation"], mechanicContract: { resourceCategories: ["Item", "TM"], independentSelectionPerOtherPlayer: true, differentSelectionsAllowed: true, oneSelectedRecordPerEligibleOpponent: true, playersWithoutLegalTargetsAreSkipped: true, excludesSourcePlayer: true, excludesMasterBallItems: true, stableInventoryIdsRequired: true, emptyMatchResolvesNoEffect: true, atomicMutationRequired: true } }),
   750 |     control({ id: "steal-token", name: "Steal", rulesText: "Steal a Pokemon from another player", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "rosterInstance", affectedEntityType: "pokemon", targetControllerRelation: "differentController", otherPlayerOnly: true, excludeActor: true, differentControllerRequired: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "utilityEffect", effectTags: ["Steal"], automaticMutations: ["Transfer the exact selected Pokemon record to the acting player's Active roster", "Remove stale current-team references owned by the previous player", "Record the transfer as a stable-ID ownership operation"], mechanicContract: { exactRosterInstanceRequired: true, transfersToActingPlayerActiveRoster: true, formalStealTagRequired: true, stickyHoldBlocksAllPokemonSteal: true, safeguardDoesNotProtectPokemon: true, substituteMayProtectSelectedInstance: true, stablePokemonIdRequired: true, atomicMutationRequired: true } }),
   751 | 
   752 |     protection({ id: "safeguard", name: "Safeguard", rulesText: "Your Money And Tokens Cannot Be Stolen, Destroyed, Or Copied. You Are Unaffected By Follow Me And Embargo.", isResponse: false, usesControlTiming: true, controlWindowRequired: true, legalControlContexts: ordinaryControlContexts, activationPattern: "proactive", activationType: "Declaration", requiresPendingEvent: false, targetType: "player", targetScope: "singlePlayer", targetControllerRelation: "self", selfOnly: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "safeguard", createsPendingEvent: true, opensResponseWindow: true, canBeRespondedTo: true, persistence: "lingeringEffect", duration: "Until Gym end", expirationPoint: "At the approved End-of-Gym expiration checkpoint.", protectionScope: ["moneySteal", "moneyDestroy", "moneyCopy", "tokenSteal", "tokenDestroy", "tokenCopy", "followMe", "embargo"], automaticMutations: ["Create exact-player Safeguard protection", "Block only canonical Safeguard operation categories"], mechanicContract: { exactPlayerScopeRequired: true, categoryMatrixRequired: true, protectedCategories: ["moneySteal", "moneyDestroy", "moneyCopy", "tokenSteal", "tokenDestroy", "tokenCopy", "followMe", "embargo"], explicitNonProtectedCategories: ["itemSteal", "itemDestroy", "tmSteal", "tmDestroy", "pokemonSteal", "forcedPayment", "counterspellRestoration"] } }),
   753 |     protection({ id: "teleport", name: "Teleport", rulesText: "Delay an effect until the start of the next matching phase during the next gym", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "delayParent", canRespondTo: ["delayableEffect"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Teleport is production-usable for exact declared Token events handled by the Control controller. Unsupported or nested response effects are hidden and fail before consumption.", requiredChoices: [], parentInteraction: "Close the parent as delayed and preserve one authoritative delayed-effect record. At the next Gym's matching phase, revalidate without retargeting and resolve using the actual resolution phase anchor.", persistence: "delayedEffectRecord", duration: "Until the start of the next matching phase during the next Gym", expirationPoint: "Terminal after resolution, gameplay-illegal no-effect, or system-failure cancellation and refund.", mechanicContract: { nextGymSamePhaseRequired: true, declarationPhaseAnchorPreserved: true, resolutionDurationAnchorsToActualResolutionPhase: true, revalidateAtReturn: true, gameplayIllegalityResult: "resolvedNoEffect", gameplayIllegalityConsumesTeleportAndParent: true, gameplayIllegalityRetargets: false, gameplayIllegalityRefunds: false, systemCorruptUnsupportedResult: "canceledRefunded", duplicateResolutionForbidden: true, refreshPersistenceRequired: true, supportedProductionParents: "exact declared Token events handled by the Control controller", unsupportedParentsFailBeforeConsumption: true } }),
   754 |     protection({ id: "substitute", name: "Substitute", rulesText: "Choose a Pokemon to protect from one effect. If it would be banned, it is not banned and cannot be banned again during this phase", isResponse: false, legalPhases: ["action", "teamBuilding"], timingWindows: ["action", "teamBuilding"], activationPattern: "proactive", requiresPendingEvent: false, targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "pokemon", applicationScope: "rosterInstance", affectedEntityType: "pokemon", targetControllerRelation: "self", selfOnly: true, magicianLegalAlternateTargetExplanation: "Magician may change the target only to another Pokemon owned by the Substitute user.", resolverMode: resolverModes.AUTOMATIC, resolverId: "substituteAttach", createsPendingEvent: false, opensResponseWindow: false, persistence: "lingeringEffect", duration: "Until used or Gym end", expirationPoint: "When its one-use protection is spent or at the approved End-of-Gym expiration checkpoint, whichever occurs first.", automaticMutations: ["Attach one-use Substitute protection to the selected roster instance", "Intercept after responses and before parent mutation", "Normally exempt only that roster instance", "Negate an entire species-wide Ban and create current-phase Ban protection"] }),
   755 |     protection({ id: "follow-me", name: "Follow Me", rulesText: "When Another Player Or Another Player's Pokemon Is Targeted By An Effect, Change The Target To You Or One Of Your Legal Pokemon Instead. The New Target Must Be A Legal Target For The Original Effect. After This Effect Resolves, For The Rest Of This Gym, Copy Each Token Used By The Player Whose Effect You Redirected. Follow Me Cannot Redirect Global Effects Or Effects That Do Not Target A Player Or Pokemon", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "redirectParentToSelf", copyActivationMode: copyActivationModes.FOLLOW_ME, canRespondTo: ["singlePlayerTarget", "rosterInstanceTarget"], parentInteraction: "Replace one corresponding target with the Follow Me user or one of that user's legal Pokemon, preserve unaffected targets, then after the redirected parent resolves create the Gym-long Copy relationship.", persistence: "lingeringEffect", duration: "Through the current Gym after the redirected parent resolves", expirationPoint: "End of Gym", effectTags: ["Redirect", "Copy"], runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Follow Me is unavailable because its Gym-long Copy relationship is not implemented and the mandatory/optional plus relative-resolution order of each later copied activation is not settled. No target is redirected and the Token is not consumed.", automaticMutations: ["Replace one corresponding parent target", "Preserve source, cost, text, target type, target count, and unaffected targets", "Record the redirected effect's source player", "Create a Gym-long ongoing Copy relationship after parent resolution"], mechanicContract: { initialRedirectOperation: "replaceOneCorrespondingTarget", requiresLegalCorrespondingTarget: true, excludesGlobalAndTargetlessEffects: true, preserveSourceCostTextTargetTypeTargetCountAndUnaffectedTargets: true, ongoingEffectBeginsAfterRedirectedParentResolves: true, ongoingEffectDuration: "currentGym", copyEachLaterTokenUsedByRecordedPlayer: true, copiedActivationChoiceRequirement: "needsRuling", copiedActivationRelativeOrder: "needsRuling", copySemanticsStatus: "settled" } }),
   756 |     protection({ id: "parting-shot", name: "Parting Shot", rulesText: "During Team Preview, switch a previewed Pokemon for another party Pokemon. Cursed-swap retaliation is tracked manually", isResponse: false, legalPhases: ["teamPreview"], timingWindows: ["teamPreview"], activationPattern: "phaseSpecific", activationType: "Team Preview declaration", requiresPendingEvent: false, createsPendingEvent: true, opensResponseWindow: true, targetType: "team", targetScope: "singleTeam", resolverMode: resolverModes.GUIDED, resolverId: "teamPreviewSwap", requiredChoices: ["Pokemon out", "Pokemon in"], guidedTask: { instruction: "Choose the revealed Pokemon leaving and the legal party Pokemon replacing it.", responsible: "Affected player", resultLabel: "Completed Swap", placeholder: "Abra out; Grovyle in", confirmationLabel: "Apply Team Swap" } }),
   757 |     protection({ id: "embargo", name: "Embargo", rulesText: "Target player can only use one more Token this gym. You cannot use another Token after this resolves", targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "playerStatus", persistence: "lingeringEffect", duration: "Until Gym end", expirationPoint: "At the approved End-of-Gym expiration checkpoint.", automaticMutations: ["Limit target to one more Token", "Prevent the acting player from using another Token this Gym"] }),
   758 |     protection({ id: "after-you", name: "After You", rulesText: "After a player declares an effect, copy and use it", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "copyParentEffect", copyActivationMode: copyActivationModes.AFTER_YOU, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "After You is unavailable because its fresh target/choice and explicit-cost controller is not implemented, and the copyable effect-source classes plus relative chain order are not settled.", requiredChoices: ["Copied effect target and choices"], guidedTask: { instruction: "Copy the parent effect, then enter fresh legal targets, choices, and any explicit costs required by that effect.", responsible: "Responding player", resultLabel: "Copied Effect Result", placeholder: "Describe target, choices, costs, and result", confirmationLabel: "Resolve Copied Effect" }, mechanicContract: { copyableSourceTypes: "needsRuling", copiedActivationRelativeOrder: "needsRuling" } }),
   759 |     protection({ id: "smokescreen", name: "Smokescreen", rulesText: "When You Or Your Pokemon Are Targetted For An Effect, Spin A Wheel With All Players. The Result Is The New Target Of That Effect. If Pokemon Are Targetted When This Is Used, Choose A Legal Target From That Player Landed On. Your Original Target Remains The Same", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "smokescreenRedirect", canRespondTo: ["singlePlayerTarget", "rosterInstanceTarget"], requiredChoices: ["Wheel result player", "One legal corresponding Pokemon when the parent targets Pokemon and the result changes player"], guidedTask: { instruction: "Spin once with every player represented exactly once. Keep the original target when its player wins or when another winning player has no legal corresponding target; otherwise choose one legal corresponding target owned by that player.", responsible: "Targeted player", resultLabel: "Redirect Result", placeholder: "Gold - Lucario", confirmationLabel: "Confirm Smokescreen" }, parentInteraction: "Replace the original selected target only when the wheel lands on another player with a legal corresponding target. Preserve the source, costs, text, target category, target count, and every unaffected target.", effectTags: ["Redirect"], runtimeUsability: runtimeUsabilityStatuses.GUIDED_ONLY, runtimeUsabilityReason: "Smokescreen uses the guided wheel and corresponding-target confirmation flow; it cannot fall back to additive or arbitrary target behavior.", mechanicContract: { targetOperation: "replaceOneCorrespondingTarget", wheelIncludesEveryPlayerExactlyOnce: true, originalPlayerResultKeepsTarget: true, playerParentUsesLandedPlayer: true, pokemonParentChoosesLegalPokemonOwnedByLandedPlayer: true, preserveSourceCostTextTargetCategoryTargetCountAndOtherTargets: true, noLegalCorrespondingTargetHandling: "keepOriginalTarget", redirectReplacement: true, recursiveWheel: false } }),
   760 |     protection({ id: "counterspell", name: "Counterspell", rulesText: "When One Of Your Tokens Is Negated, Use This Token. The Negated Token Is Not Consumed. That Token Cannot Be Used Again Until 2 Gyms Have Passed", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "restoreNegatedTokenWithCooldown", canRespondTo: ["negatedOwnTokenActivation"], requiredChoices: ["The user's exact negated Token inventory record"], persistence: "exactTokenCooldown", duration: "2 Gyms from the declaration phase anchor", expirationPoint: "At the same phase boundary two Gyms after Counterspell resolves", effectTags: ["Restore", "Cooldown"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Counterspell restores the exact negated owned Token on its persisted two-Gym phase-anchored cooldown.", automaticMutations: ["Restore the exact consumed Token inventory record", "Apply a two-Gym cooldown anchored to the declaration phase", "Keep the original activation negated"], mechanicContract: { requiresOwnedActivatedTokenNegated: true, originalTokenRemainsNegated: true, originalTokenDoesNotResolve: true, restoreExactTokenInventoryRecord: true, cooldownGyms: 2, cooldownScope: "exactRestoredToken", visibleWhileUnusable: true, normalUseReturnsAfterCooldown: true, explicitConsumptionException: true, preserveDeclarationNegationResponseRestorationCooldownRelationship: true, counterspellUsesUniversalLifecycle: true } }),
   761 |     protection({ id: "seven-tools", name: "7 Tools Of The Bandit", aliases: ["7 Tools", "Seven Tools"], rulesText: "When A Player Activates A Protection Token, Use This Token Immediately After. Negate That Protection Token, Then Copy It. The Copied Token Must Be Used During This Gym Or It Is Lost", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "counterProtection", copyActivationMode: copyActivationModes.TEMPORARY_INVENTORY, canRespondTo: ["protectionTokenActivation"], specialPriority: "Immediately after the targeted Protection Token activation", persistence: "temporaryCopiedToken", duration: "Until used or End of Gym", expirationPoint: "End of the current Gym if unused", effectTags: ["Negate", "Copy"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "7 Tools atomically negates the exact Protection response and creates its same-Gym temporary copy.", parentInteraction: "Negate the targeted Protection Token, keep it negated, then create one temporary copy for the 7 Tools user.", automaticMutations: ["Negate the targeted Protection Token", "Create one temporary copy for the 7 Tools user", "Retain copied Token timing, targeting, and effect rules", "Expire the temporary copy unused at End of Gym"], mechanicContract: { respondsOnlyToProtectionTokenActivation: true, negateTargetProtection: true, temporaryCopyCount: 1, copyOwner: "sevenToolsUser", preserveCopiedDefinitionTimingTargetsAndRules: true, permanentInventory: false, expiresAtEndOfCurrentGym: true, recordSourceDefinitionActivationOwnerCreationGymAndExpiration: true, safeguardCopyProtectionMustBeChecked: true, copyModelIsTokenSpecific: true, atomicResolutionRequired: true } }),
   762 |     protection({ id: "immunity", name: "Immunity", aliases: ["Emergency Immunity Token"], rulesText: "Negate any effect or global effect. Does not stop Series Restricts or bans", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "immunity", canRespondTo: ["targetedEffect", "globalEffect"], protectionScope: ["targetedEffect", "globalEffect"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Immunity atomically negates its exact current parent prompt and is covered across reload, undo, results, and sandbox isolation.", automaticMutations: ["Negate the parent prompt"] }),
   763 |     protection({ id: "revenge", name: "Revenge", rulesText: "After a Battle Phase where an opponent cursed a Pokemon you brought, release 2 Pokemon from their brought team and destroy the held item", isResponse: false, legalPhases: [], timingWindows: ["endOfBattlePhaseProcedure"], phaseBoundaryProcedure: "endOfBattlePhaseProcedure", explicitPhaseTiming: "postPayoutBeforeControl", activationPattern: "phaseBoundaryOptionalTrigger", activationType: "Post-payout optional offer", requiresPendingEvent: false, createsPendingEvent: true, opensResponseWindow: false, targetType: "team", targetScope: "singleTeam", targetControllerRelation: "otherPlayer", otherPlayerOnly: true, excludeActor: true, differentControllerRequired: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "revengeRelease", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Revenge is offered after payout from exact current-Gym Curse anchors and the immutable brought-team snapshot. It consumes only after the affected player confirms two exact Pokemon and an optional eligible held Item.", requiredChoices: ["Exactly two exact Pokemon from the offender's immutable brought team", "At most one eligible held item from those two"], guidedTask: { instruction: "Choose exactly two exact roster instances from the offending player's immutable brought-team snapshot, then optionally choose one eligible exactly referenced held item from those two.", responsible: "Affected player", resultLabel: "Revenge Choices", placeholder: "Two exact roster IDs and optional exact held item ID", confirmationLabel: "Apply Revenge" }, mechanicContract: { postPayoutBeforeControl: true, immutableBroughtSnapshotRequired: true, exactReleaseCount: 2, qualifyingCurseMustTargetExactBroughtInstance: true, heldItemSelectionMaximum: 1, heldItemMustBelongToSelectedReleasedPokemon: true, exactHeldInventoryReferenceRequired: true, masterBallTierProtected: true, sameNameInventoryGuessingForbidden: true, atomicResolutionRequired: true, idempotentResolutionRequired: true, adminUndoRequired: true, optionalOfferCanBeDeclinedWithoutConsumption: true, productionChoiceScreenRequired: true } }),
   764 | 
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 | 
   774 |     control({ id: "move-deleter", name: "Move Deleter", aliases: ["Move Deleter Curse"], rulesText: "Ban one move from being brought for 1 week. Cannot be used after team submission", targetType: "resource", targetScope: "singleResource", selectedTargetType: "move", applicationScope: "tableWide", affectedEntityType: "move", targetScopeStatus: "settled", targetControllerRelation: "notApplicable", minTargets: 1, maxTargets: 1, targetCollectionType: "canonicalMove", resolverMode: resolverModes.AUTOMATIC, resolverId: "moveBan", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Move Deleter records one canonical global move restriction for the next Gym and the Teambuilder and validator enforce it.", requiredChoices: ["One canonical move"], persistence: "lingeringEffect", duration: "Next Gym", expirationPoint: "End of the next Gym", automaticMutations: ["Create a global move restriction keyed by canonical move identity", "Disable the move in Teambuilder and team validation during the next Gym", "Expire the restriction when that Gym ends"] }),
   775 |     curse({ id: "toxic-curse", name: "Toxic Curse", rulesText: "Force a Pokemon to carry a Toxic Orb for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Toxic Orb status with exact protected-instance exclusions"] }),
   776 |     curse({ id: "iron-ball-curse", name: "Iron Ball Curse", rulesText: "Force a Pokemon to carry an Iron Ball for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Iron Ball status with exact protected-instance exclusions"] }),
   777 |     curse({ id: "flame-curse", name: "Flame Curse", rulesText: "Force a Pokemon to carry a Flame Orb for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", targetControllerRelation: "anyPlayer", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Flame Orb status with exact protected-instance exclusions"] }),
   778 |     curse({ id: "silencing-curse", name: "Silencing Curse", rulesText: "Restrict a Pokemon to 2 move slots for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide max-two-moves status with exact protected-instance exclusions", "Require explicit per-instance two-move repair where needed"] }),
   779 |     curse({ id: "knock-off-curse", name: "Knock Off Curse", rulesText: "Choose a Pokemon and an Item or TM move. If it is on the Pokemon, remove it from inventory. Masterball items are protected", targetType: "pokemon", targetScope: "rosterInstance", targetControllerRelation: "needsRuling", resolverMode: resolverModes.GUIDED, resolverId: "knockOff", runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Knock Off Curse is unavailable until the legal target-controller relationship is settled and exact Item/TM removal is implemented. The Token is not consumed.", requiredChoices: ["Item or TM name"], guidedTask: { instruction: "Name the Item or TM move to check on the selected Pokemon.", responsible: "Acting player", resultLabel: "Item or TM", placeholder: "Leftovers", confirmationLabel: "Resolve Knock Off" } }),
   780 |     curse({ id: "haze-curse", name: "Haze Curse", rulesText: "Select 2 Pokemon. Their buffs are negated for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "needsRuling", minTargets: 2, maxTargets: 2, targetCollectionType: "validatedRosterInstances", resolverMode: resolverModes.GUIDED, resolverId: "multiStatusEffect", runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Haze Curse is unavailable until the legal controllers for its two species anchors and its two-Gym expiration boundary are settled. The Token is not consumed.", requiredChoices: ["Exactly two Pokemon species anchors"], guidedTask: { instruction: "Choose exactly two Active Roster Pokemon as species anchors. Which controllers are legal remains Needs Ruling.", responsible: "Acting player", resultLabel: "Selected Species", placeholder: "Controller - Pokemon; Controller - Pokemon", confirmationLabel: "Apply Haze" }, persistence: "lingeringEffect", duration: "2 Gyms", expirationPoint: unresolvedMultiGymExpiration }),
   781 |     curse({ id: "imprison-curse", name: "Imprison Curse", rulesText: "Selected Pokemon cannot have EVs or IVs and must use a neutral nature for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide non-destructive no-EVs, no-IVs, neutral-Nature override with exact protected-instance exclusions"] }),
   782 |     curse({ id: "devolve-token", name: "Devolve", aliases: ["Devolve Token"], rulesText: "Selected Pokemon is devolved for 1 gym. During team submission, the target may adjust its set before preview", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "1 Gym", expirationPoint: unresolvedMultiGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Create species-wide Devolved status with exact protected-instance exclusions", "Permit Team Submission set revision"], runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Devolve is unavailable until branch/form selection, temporary species state, set revision, and exact restoration rules are canonical and implemented." }),
   783 |     curse({ id: "purge-curse", name: "Purge Curse", rulesText: "All Pokemon brought to this Battle Phase are released after battle completes. This Token ignores other effects", targetType: "player", targetScope: "singlePlayer", selectedTargetType: "player", applicationScope: "submittedTeamInstances", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "purgeAfterBattle", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Purge records an absolute target-player marker, then atomically releases that player's immutable brought-team snapshot after Gym payout.", opensResponseWindow: false, persistence: "lingeringEffect", duration: "Until the post-payout checkpoint of the current Battle Phase", expirationPoint: "Immediately after Gym payout and before ordinary Control Timing reopens.", automaticMutations: ["Create an absolute Purge marker without an ordinary response window", "Capture the immutable exact brought-team snapshot", "After payout release every exact brought roster instance atomically", "Ignore Substitute, Curse Immunity, redirection, negation, and other gameplay prevention"], mechanicContract: { postPayoutBeforeControl: true, immutableBroughtSnapshotRequired: true, absoluteGameplayEffect: true, canBeRespondedTo: false, canBeNegated: false, canBeRedirected: false, canBeProtected: false, ignoresSubstitute: true, ignoresCurseImmunity: true, atomicResolutionRequired: true, idempotentResolutionRequired: true, adminUndoRequired: true, systemFailureRollbackAndRefundRequired: true } }),
   784 |     curse({ id: "foresight-curse", name: "Foresight Curse", rulesText: "Choose 6 Pokemon. If Any Of Those Pokemon Are Brought To This Battle Phase, Their Sets Become Revealed To You. This Is Not A Nerf/Debuff", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "needsRuling", minTargets: 6, maxTargets: 6, targetCollectionType: "validatedRosterInstances", resolverMode: resolverModes.GUIDED, resolverId: "multiStatusEffect", requiredChoices: ["Exactly six Pokemon species anchors"], guidedTask: { instruction: "Choose exactly six Active Roster Pokemon as species anchors. If matching species are brought, reveal their sets only to the Foresight Curse user. Which controllers are legal remains Needs Ruling.", responsible: "Acting player", resultLabel: "Privately Marked Species", placeholder: "List the six selected Pokemon", confirmationLabel: "Apply Private Foresight" }, persistence: "privateInformationMarker", duration: "Current Battle Phase", expirationPoint: "At the end of the current Battle Phase after its private reveal obligation is complete.", visibility: "sourcePlayerOnly", effectClassification: "privateInformationMarkerNotDebuff", removableBy: [], runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Foresight Curse is unavailable because player-scoped private set delivery is not implemented. No selections or set data are placed in shared game state and the Token is not consumed.", mechanicContract: { selectionCount: 6, selectionUsesRosterInstanceAnchors: true, applicationScope: "globalSpecies", revealOnlyToSourcePlayer: true, authorizedViewer: "sourcePlayer", unauthorizedViewers: "everyOtherPlayer", hostAccessPolicy: "separateAdministrativeAuthorization", clientSideHidingSufficient: false, sharedStatePayloadMayContainSetData: false, automaticRevealEnabled: false, publicReveal: false, privateVisibilityData: true, nerfOrDebuff: false, removableByClearSmog: false, removableByGenericNerfRemoval: false, ownedPokemonRestriction: false, unauthorizedViewsMustNotReceiveOrRenderSetData: true } }),
```


### Encounter Wheel

Occurrences: 1

#### Hit 1 — line 766

```text
   748 |     control({ id: "unban-token", name: "Unban", aliases: ["Unban Token"], rulesText: "Unban a Pokemon. It cannot be banned again for 6 gyms", targetType: "pokemon", targetScope: "species", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "6 Gyms", expirationPoint: unresolvedMultiGymExpiration, automaticMutations: ["Remove active Ban or Restrict", "Create Unban protection", "Update global Pokemon legality"] }),
   749 |     control({ id: "incinerate", name: "Incinerate", rulesText: "Choose one Item or TM from every other player except Masterball items and remove it from their bag", targetType: "resource", targetScope: "allMatchingResources", selectedTargetType: "resource", applicationScope: "allPlayers", affectedEntityType: "resource", targetControllerRelation: "everyOtherPlayer", excludeActor: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "utilityEffect", requiredChoices: ["One exact legal Item or TM record from each other player who has one"], effectTags: ["Destroy"], automaticMutations: ["Validate one stable-ID non-Master-Ball Item or TM selection for each eligible opposing player", "Skip opposing players who have no legal target", "Atomically destroy every exact selected inventory record", "Record each destruction as a stable-ID effect operation"], mechanicContract: { resourceCategories: ["Item", "TM"], independentSelectionPerOtherPlayer: true, differentSelectionsAllowed: true, oneSelectedRecordPerEligibleOpponent: true, playersWithoutLegalTargetsAreSkipped: true, excludesSourcePlayer: true, excludesMasterBallItems: true, stableInventoryIdsRequired: true, emptyMatchResolvesNoEffect: true, atomicMutationRequired: true } }),
   750 |     control({ id: "steal-token", name: "Steal", rulesText: "Steal a Pokemon from another player", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "rosterInstance", affectedEntityType: "pokemon", targetControllerRelation: "differentController", otherPlayerOnly: true, excludeActor: true, differentControllerRequired: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "utilityEffect", effectTags: ["Steal"], automaticMutations: ["Transfer the exact selected Pokemon record to the acting player's Active roster", "Remove stale current-team references owned by the previous player", "Record the transfer as a stable-ID ownership operation"], mechanicContract: { exactRosterInstanceRequired: true, transfersToActingPlayerActiveRoster: true, formalStealTagRequired: true, stickyHoldBlocksAllPokemonSteal: true, safeguardDoesNotProtectPokemon: true, substituteMayProtectSelectedInstance: true, stablePokemonIdRequired: true, atomicMutationRequired: true } }),
   751 | 
   752 |     protection({ id: "safeguard", name: "Safeguard", rulesText: "Your Money And Tokens Cannot Be Stolen, Destroyed, Or Copied. You Are Unaffected By Follow Me And Embargo.", isResponse: false, usesControlTiming: true, controlWindowRequired: true, legalControlContexts: ordinaryControlContexts, activationPattern: "proactive", activationType: "Declaration", requiresPendingEvent: false, targetType: "player", targetScope: "singlePlayer", targetControllerRelation: "self", selfOnly: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "safeguard", createsPendingEvent: true, opensResponseWindow: true, canBeRespondedTo: true, persistence: "lingeringEffect", duration: "Until Gym end", expirationPoint: "At the approved End-of-Gym expiration checkpoint.", protectionScope: ["moneySteal", "moneyDestroy", "moneyCopy", "tokenSteal", "tokenDestroy", "tokenCopy", "followMe", "embargo"], automaticMutations: ["Create exact-player Safeguard protection", "Block only canonical Safeguard operation categories"], mechanicContract: { exactPlayerScopeRequired: true, categoryMatrixRequired: true, protectedCategories: ["moneySteal", "moneyDestroy", "moneyCopy", "tokenSteal", "tokenDestroy", "tokenCopy", "followMe", "embargo"], explicitNonProtectedCategories: ["itemSteal", "itemDestroy", "tmSteal", "tmDestroy", "pokemonSteal", "forcedPayment", "counterspellRestoration"] } }),
   753 |     protection({ id: "teleport", name: "Teleport", rulesText: "Delay an effect until the start of the next matching phase during the next gym", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "delayParent", canRespondTo: ["delayableEffect"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Teleport is production-usable for exact declared Token events handled by the Control controller. Unsupported or nested response effects are hidden and fail before consumption.", requiredChoices: [], parentInteraction: "Close the parent as delayed and preserve one authoritative delayed-effect record. At the next Gym's matching phase, revalidate without retargeting and resolve using the actual resolution phase anchor.", persistence: "delayedEffectRecord", duration: "Until the start of the next matching phase during the next Gym", expirationPoint: "Terminal after resolution, gameplay-illegal no-effect, or system-failure cancellation and refund.", mechanicContract: { nextGymSamePhaseRequired: true, declarationPhaseAnchorPreserved: true, resolutionDurationAnchorsToActualResolutionPhase: true, revalidateAtReturn: true, gameplayIllegalityResult: "resolvedNoEffect", gameplayIllegalityConsumesTeleportAndParent: true, gameplayIllegalityRetargets: false, gameplayIllegalityRefunds: false, systemCorruptUnsupportedResult: "canceledRefunded", duplicateResolutionForbidden: true, refreshPersistenceRequired: true, supportedProductionParents: "exact declared Token events handled by the Control controller", unsupportedParentsFailBeforeConsumption: true } }),
   754 |     protection({ id: "substitute", name: "Substitute", rulesText: "Choose a Pokemon to protect from one effect. If it would be banned, it is not banned and cannot be banned again during this phase", isResponse: false, legalPhases: ["action", "teamBuilding"], timingWindows: ["action", "teamBuilding"], activationPattern: "proactive", requiresPendingEvent: false, targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "pokemon", applicationScope: "rosterInstance", affectedEntityType: "pokemon", targetControllerRelation: "self", selfOnly: true, magicianLegalAlternateTargetExplanation: "Magician may change the target only to another Pokemon owned by the Substitute user.", resolverMode: resolverModes.AUTOMATIC, resolverId: "substituteAttach", createsPendingEvent: false, opensResponseWindow: false, persistence: "lingeringEffect", duration: "Until used or Gym end", expirationPoint: "When its one-use protection is spent or at the approved End-of-Gym expiration checkpoint, whichever occurs first.", automaticMutations: ["Attach one-use Substitute protection to the selected roster instance", "Intercept after responses and before parent mutation", "Normally exempt only that roster instance", "Negate an entire species-wide Ban and create current-phase Ban protection"] }),
   755 |     protection({ id: "follow-me", name: "Follow Me", rulesText: "When Another Player Or Another Player's Pokemon Is Targeted By An Effect, Change The Target To You Or One Of Your Legal Pokemon Instead. The New Target Must Be A Legal Target For The Original Effect. After This Effect Resolves, For The Rest Of This Gym, Copy Each Token Used By The Player Whose Effect You Redirected. Follow Me Cannot Redirect Global Effects Or Effects That Do Not Target A Player Or Pokemon", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "redirectParentToSelf", copyActivationMode: copyActivationModes.FOLLOW_ME, canRespondTo: ["singlePlayerTarget", "rosterInstanceTarget"], parentInteraction: "Replace one corresponding target with the Follow Me user or one of that user's legal Pokemon, preserve unaffected targets, then after the redirected parent resolves create the Gym-long Copy relationship.", persistence: "lingeringEffect", duration: "Through the current Gym after the redirected parent resolves", expirationPoint: "End of Gym", effectTags: ["Redirect", "Copy"], runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Follow Me is unavailable because its Gym-long Copy relationship is not implemented and the mandatory/optional plus relative-resolution order of each later copied activation is not settled. No target is redirected and the Token is not consumed.", automaticMutations: ["Replace one corresponding parent target", "Preserve source, cost, text, target type, target count, and unaffected targets", "Record the redirected effect's source player", "Create a Gym-long ongoing Copy relationship after parent resolution"], mechanicContract: { initialRedirectOperation: "replaceOneCorrespondingTarget", requiresLegalCorrespondingTarget: true, excludesGlobalAndTargetlessEffects: true, preserveSourceCostTextTargetTypeTargetCountAndUnaffectedTargets: true, ongoingEffectBeginsAfterRedirectedParentResolves: true, ongoingEffectDuration: "currentGym", copyEachLaterTokenUsedByRecordedPlayer: true, copiedActivationChoiceRequirement: "needsRuling", copiedActivationRelativeOrder: "needsRuling", copySemanticsStatus: "settled" } }),
   756 |     protection({ id: "parting-shot", name: "Parting Shot", rulesText: "During Team Preview, switch a previewed Pokemon for another party Pokemon. Cursed-swap retaliation is tracked manually", isResponse: false, legalPhases: ["teamPreview"], timingWindows: ["teamPreview"], activationPattern: "phaseSpecific", activationType: "Team Preview declaration", requiresPendingEvent: false, createsPendingEvent: true, opensResponseWindow: true, targetType: "team", targetScope: "singleTeam", resolverMode: resolverModes.GUIDED, resolverId: "teamPreviewSwap", requiredChoices: ["Pokemon out", "Pokemon in"], guidedTask: { instruction: "Choose the revealed Pokemon leaving and the legal party Pokemon replacing it.", responsible: "Affected player", resultLabel: "Completed Swap", placeholder: "Abra out; Grovyle in", confirmationLabel: "Apply Team Swap" } }),
   757 |     protection({ id: "embargo", name: "Embargo", rulesText: "Target player can only use one more Token this gym. You cannot use another Token after this resolves", targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "playerStatus", persistence: "lingeringEffect", duration: "Until Gym end", expirationPoint: "At the approved End-of-Gym expiration checkpoint.", automaticMutations: ["Limit target to one more Token", "Prevent the acting player from using another Token this Gym"] }),
   758 |     protection({ id: "after-you", name: "After You", rulesText: "After a player declares an effect, copy and use it", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "copyParentEffect", copyActivationMode: copyActivationModes.AFTER_YOU, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "After You is unavailable because its fresh target/choice and explicit-cost controller is not implemented, and the copyable effect-source classes plus relative chain order are not settled.", requiredChoices: ["Copied effect target and choices"], guidedTask: { instruction: "Copy the parent effect, then enter fresh legal targets, choices, and any explicit costs required by that effect.", responsible: "Responding player", resultLabel: "Copied Effect Result", placeholder: "Describe target, choices, costs, and result", confirmationLabel: "Resolve Copied Effect" }, mechanicContract: { copyableSourceTypes: "needsRuling", copiedActivationRelativeOrder: "needsRuling" } }),
   759 |     protection({ id: "smokescreen", name: "Smokescreen", rulesText: "When You Or Your Pokemon Are Targetted For An Effect, Spin A Wheel With All Players. The Result Is The New Target Of That Effect. If Pokemon Are Targetted When This Is Used, Choose A Legal Target From That Player Landed On. Your Original Target Remains The Same", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "smokescreenRedirect", canRespondTo: ["singlePlayerTarget", "rosterInstanceTarget"], requiredChoices: ["Wheel result player", "One legal corresponding Pokemon when the parent targets Pokemon and the result changes player"], guidedTask: { instruction: "Spin once with every player represented exactly once. Keep the original target when its player wins or when another winning player has no legal corresponding target; otherwise choose one legal corresponding target owned by that player.", responsible: "Targeted player", resultLabel: "Redirect Result", placeholder: "Gold - Lucario", confirmationLabel: "Confirm Smokescreen" }, parentInteraction: "Replace the original selected target only when the wheel lands on another player with a legal corresponding target. Preserve the source, costs, text, target category, target count, and every unaffected target.", effectTags: ["Redirect"], runtimeUsability: runtimeUsabilityStatuses.GUIDED_ONLY, runtimeUsabilityReason: "Smokescreen uses the guided wheel and corresponding-target confirmation flow; it cannot fall back to additive or arbitrary target behavior.", mechanicContract: { targetOperation: "replaceOneCorrespondingTarget", wheelIncludesEveryPlayerExactlyOnce: true, originalPlayerResultKeepsTarget: true, playerParentUsesLandedPlayer: true, pokemonParentChoosesLegalPokemonOwnedByLandedPlayer: true, preserveSourceCostTextTargetCategoryTargetCountAndOtherTargets: true, noLegalCorrespondingTargetHandling: "keepOriginalTarget", redirectReplacement: true, recursiveWheel: false } }),
   760 |     protection({ id: "counterspell", name: "Counterspell", rulesText: "When One Of Your Tokens Is Negated, Use This Token. The Negated Token Is Not Consumed. That Token Cannot Be Used Again Until 2 Gyms Have Passed", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "restoreNegatedTokenWithCooldown", canRespondTo: ["negatedOwnTokenActivation"], requiredChoices: ["The user's exact negated Token inventory record"], persistence: "exactTokenCooldown", duration: "2 Gyms from the declaration phase anchor", expirationPoint: "At the same phase boundary two Gyms after Counterspell resolves", effectTags: ["Restore", "Cooldown"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Counterspell restores the exact negated owned Token on its persisted two-Gym phase-anchored cooldown.", automaticMutations: ["Restore the exact consumed Token inventory record", "Apply a two-Gym cooldown anchored to the declaration phase", "Keep the original activation negated"], mechanicContract: { requiresOwnedActivatedTokenNegated: true, originalTokenRemainsNegated: true, originalTokenDoesNotResolve: true, restoreExactTokenInventoryRecord: true, cooldownGyms: 2, cooldownScope: "exactRestoredToken", visibleWhileUnusable: true, normalUseReturnsAfterCooldown: true, explicitConsumptionException: true, preserveDeclarationNegationResponseRestorationCooldownRelationship: true, counterspellUsesUniversalLifecycle: true } }),
   761 |     protection({ id: "seven-tools", name: "7 Tools Of The Bandit", aliases: ["7 Tools", "Seven Tools"], rulesText: "When A Player Activates A Protection Token, Use This Token Immediately After. Negate That Protection Token, Then Copy It. The Copied Token Must Be Used During This Gym Or It Is Lost", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "counterProtection", copyActivationMode: copyActivationModes.TEMPORARY_INVENTORY, canRespondTo: ["protectionTokenActivation"], specialPriority: "Immediately after the targeted Protection Token activation", persistence: "temporaryCopiedToken", duration: "Until used or End of Gym", expirationPoint: "End of the current Gym if unused", effectTags: ["Negate", "Copy"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "7 Tools atomically negates the exact Protection response and creates its same-Gym temporary copy.", parentInteraction: "Negate the targeted Protection Token, keep it negated, then create one temporary copy for the 7 Tools user.", automaticMutations: ["Negate the targeted Protection Token", "Create one temporary copy for the 7 Tools user", "Retain copied Token timing, targeting, and effect rules", "Expire the temporary copy unused at End of Gym"], mechanicContract: { respondsOnlyToProtectionTokenActivation: true, negateTargetProtection: true, temporaryCopyCount: 1, copyOwner: "sevenToolsUser", preserveCopiedDefinitionTimingTargetsAndRules: true, permanentInventory: false, expiresAtEndOfCurrentGym: true, recordSourceDefinitionActivationOwnerCreationGymAndExpiration: true, safeguardCopyProtectionMustBeChecked: true, copyModelIsTokenSpecific: true, atomicResolutionRequired: true } }),
   762 |     protection({ id: "immunity", name: "Immunity", aliases: ["Emergency Immunity Token"], rulesText: "Negate any effect or global effect. Does not stop Series Restricts or bans", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "immunity", canRespondTo: ["targetedEffect", "globalEffect"], protectionScope: ["targetedEffect", "globalEffect"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Immunity atomically negates its exact current parent prompt and is covered across reload, undo, results, and sandbox isolation.", automaticMutations: ["Negate the parent prompt"] }),
   763 |     protection({ id: "revenge", name: "Revenge", rulesText: "After a Battle Phase where an opponent cursed a Pokemon you brought, release 2 Pokemon from their brought team and destroy the held item", isResponse: false, legalPhases: [], timingWindows: ["endOfBattlePhaseProcedure"], phaseBoundaryProcedure: "endOfBattlePhaseProcedure", explicitPhaseTiming: "postPayoutBeforeControl", activationPattern: "phaseBoundaryOptionalTrigger", activationType: "Post-payout optional offer", requiresPendingEvent: false, createsPendingEvent: true, opensResponseWindow: false, targetType: "team", targetScope: "singleTeam", targetControllerRelation: "otherPlayer", otherPlayerOnly: true, excludeActor: true, differentControllerRequired: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "revengeRelease", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Revenge is offered after payout from exact current-Gym Curse anchors and the immutable brought-team snapshot. It consumes only after the affected player confirms two exact Pokemon and an optional eligible held Item.", requiredChoices: ["Exactly two exact Pokemon from the offender's immutable brought team", "At most one eligible held item from those two"], guidedTask: { instruction: "Choose exactly two exact roster instances from the offending player's immutable brought-team snapshot, then optionally choose one eligible exactly referenced held item from those two.", responsible: "Affected player", resultLabel: "Revenge Choices", placeholder: "Two exact roster IDs and optional exact held item ID", confirmationLabel: "Apply Revenge" }, mechanicContract: { postPayoutBeforeControl: true, immutableBroughtSnapshotRequired: true, exactReleaseCount: 2, qualifyingCurseMustTargetExactBroughtInstance: true, heldItemSelectionMaximum: 1, heldItemMustBelongToSelectedReleasedPokemon: true, exactHeldInventoryReferenceRequired: true, masterBallTierProtected: true, sameNameInventoryGuessingForbidden: true, atomicResolutionRequired: true, idempotentResolutionRequired: true, adminUndoRequired: true, optionalOfferCanBeDeclinedWithoutConsumption: true, productionChoiceScreenRequired: true } }),
   764 | 
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 | 
   774 |     control({ id: "move-deleter", name: "Move Deleter", aliases: ["Move Deleter Curse"], rulesText: "Ban one move from being brought for 1 week. Cannot be used after team submission", targetType: "resource", targetScope: "singleResource", selectedTargetType: "move", applicationScope: "tableWide", affectedEntityType: "move", targetScopeStatus: "settled", targetControllerRelation: "notApplicable", minTargets: 1, maxTargets: 1, targetCollectionType: "canonicalMove", resolverMode: resolverModes.AUTOMATIC, resolverId: "moveBan", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Move Deleter records one canonical global move restriction for the next Gym and the Teambuilder and validator enforce it.", requiredChoices: ["One canonical move"], persistence: "lingeringEffect", duration: "Next Gym", expirationPoint: "End of the next Gym", automaticMutations: ["Create a global move restriction keyed by canonical move identity", "Disable the move in Teambuilder and team validation during the next Gym", "Expire the restriction when that Gym ends"] }),
   775 |     curse({ id: "toxic-curse", name: "Toxic Curse", rulesText: "Force a Pokemon to carry a Toxic Orb for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Toxic Orb status with exact protected-instance exclusions"] }),
   776 |     curse({ id: "iron-ball-curse", name: "Iron Ball Curse", rulesText: "Force a Pokemon to carry an Iron Ball for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Iron Ball status with exact protected-instance exclusions"] }),
   777 |     curse({ id: "flame-curse", name: "Flame Curse", rulesText: "Force a Pokemon to carry a Flame Orb for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", targetControllerRelation: "anyPlayer", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Flame Orb status with exact protected-instance exclusions"] }),
   778 |     curse({ id: "silencing-curse", name: "Silencing Curse", rulesText: "Restrict a Pokemon to 2 move slots for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide max-two-moves status with exact protected-instance exclusions", "Require explicit per-instance two-move repair where needed"] }),
   779 |     curse({ id: "knock-off-curse", name: "Knock Off Curse", rulesText: "Choose a Pokemon and an Item or TM move. If it is on the Pokemon, remove it from inventory. Masterball items are protected", targetType: "pokemon", targetScope: "rosterInstance", targetControllerRelation: "needsRuling", resolverMode: resolverModes.GUIDED, resolverId: "knockOff", runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Knock Off Curse is unavailable until the legal target-controller relationship is settled and exact Item/TM removal is implemented. The Token is not consumed.", requiredChoices: ["Item or TM name"], guidedTask: { instruction: "Name the Item or TM move to check on the selected Pokemon.", responsible: "Acting player", resultLabel: "Item or TM", placeholder: "Leftovers", confirmationLabel: "Resolve Knock Off" } }),
   780 |     curse({ id: "haze-curse", name: "Haze Curse", rulesText: "Select 2 Pokemon. Their buffs are negated for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "needsRuling", minTargets: 2, maxTargets: 2, targetCollectionType: "validatedRosterInstances", resolverMode: resolverModes.GUIDED, resolverId: "multiStatusEffect", runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Haze Curse is unavailable until the legal controllers for its two species anchors and its two-Gym expiration boundary are settled. The Token is not consumed.", requiredChoices: ["Exactly two Pokemon species anchors"], guidedTask: { instruction: "Choose exactly two Active Roster Pokemon as species anchors. Which controllers are legal remains Needs Ruling.", responsible: "Acting player", resultLabel: "Selected Species", placeholder: "Controller - Pokemon; Controller - Pokemon", confirmationLabel: "Apply Haze" }, persistence: "lingeringEffect", duration: "2 Gyms", expirationPoint: unresolvedMultiGymExpiration }),
   781 |     curse({ id: "imprison-curse", name: "Imprison Curse", rulesText: "Selected Pokemon cannot have EVs or IVs and must use a neutral nature for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide non-destructive no-EVs, no-IVs, neutral-Nature override with exact protected-instance exclusions"] }),
   782 |     curse({ id: "devolve-token", name: "Devolve", aliases: ["Devolve Token"], rulesText: "Selected Pokemon is devolved for 1 gym. During team submission, the target may adjust its set before preview", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "1 Gym", expirationPoint: unresolvedMultiGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Create species-wide Devolved status with exact protected-instance exclusions", "Permit Team Submission set revision"], runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Devolve is unavailable until branch/form selection, temporary species state, set revision, and exact restoration rules are canonical and implemented." }),
   783 |     curse({ id: "purge-curse", name: "Purge Curse", rulesText: "All Pokemon brought to this Battle Phase are released after battle completes. This Token ignores other effects", targetType: "player", targetScope: "singlePlayer", selectedTargetType: "player", applicationScope: "submittedTeamInstances", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "purgeAfterBattle", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Purge records an absolute target-player marker, then atomically releases that player's immutable brought-team snapshot after Gym payout.", opensResponseWindow: false, persistence: "lingeringEffect", duration: "Until the post-payout checkpoint of the current Battle Phase", expirationPoint: "Immediately after Gym payout and before ordinary Control Timing reopens.", automaticMutations: ["Create an absolute Purge marker without an ordinary response window", "Capture the immutable exact brought-team snapshot", "After payout release every exact brought roster instance atomically", "Ignore Substitute, Curse Immunity, redirection, negation, and other gameplay prevention"], mechanicContract: { postPayoutBeforeControl: true, immutableBroughtSnapshotRequired: true, absoluteGameplayEffect: true, canBeRespondedTo: false, canBeNegated: false, canBeRedirected: false, canBeProtected: false, ignoresSubstitute: true, ignoresCurseImmunity: true, atomicResolutionRequired: true, idempotentResolutionRequired: true, adminUndoRequired: true, systemFailureRollbackAndRefundRequired: true } }),
   784 |     curse({ id: "foresight-curse", name: "Foresight Curse", rulesText: "Choose 6 Pokemon. If Any Of Those Pokemon Are Brought To This Battle Phase, Their Sets Become Revealed To You. This Is Not A Nerf/Debuff", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "needsRuling", minTargets: 6, maxTargets: 6, targetCollectionType: "validatedRosterInstances", resolverMode: resolverModes.GUIDED, resolverId: "multiStatusEffect", requiredChoices: ["Exactly six Pokemon species anchors"], guidedTask: { instruction: "Choose exactly six Active Roster Pokemon as species anchors. If matching species are brought, reveal their sets only to the Foresight Curse user. Which controllers are legal remains Needs Ruling.", responsible: "Acting player", resultLabel: "Privately Marked Species", placeholder: "List the six selected Pokemon", confirmationLabel: "Apply Private Foresight" }, persistence: "privateInformationMarker", duration: "Current Battle Phase", expirationPoint: "At the end of the current Battle Phase after its private reveal obligation is complete.", visibility: "sourcePlayerOnly", effectClassification: "privateInformationMarkerNotDebuff", removableBy: [], runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Foresight Curse is unavailable because player-scoped private set delivery is not implemented. No selections or set data are placed in shared game state and the Token is not consumed.", mechanicContract: { selectionCount: 6, selectionUsesRosterInstanceAnchors: true, applicationScope: "globalSpecies", revealOnlyToSourcePlayer: true, authorizedViewer: "sourcePlayer", unauthorizedViewers: "everyOtherPlayer", hostAccessPolicy: "separateAdministrativeAuthorization", clientSideHidingSufficient: false, sharedStatePayloadMayContainSetData: false, automaticRevealEnabled: false, publicReveal: false, privateVisibilityData: true, nerfOrDebuff: false, removableByClearSmog: false, removableByGenericNerfRemoval: false, ownedPokemonRestriction: false, unauthorizedViewsMustNotReceiveOrRenderSetData: true } }),
```


### Hidden Grotto

Occurrences: 1

#### Hit 1 — line 770

```text
   752 |     protection({ id: "safeguard", name: "Safeguard", rulesText: "Your Money And Tokens Cannot Be Stolen, Destroyed, Or Copied. You Are Unaffected By Follow Me And Embargo.", isResponse: false, usesControlTiming: true, controlWindowRequired: true, legalControlContexts: ordinaryControlContexts, activationPattern: "proactive", activationType: "Declaration", requiresPendingEvent: false, targetType: "player", targetScope: "singlePlayer", targetControllerRelation: "self", selfOnly: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "safeguard", createsPendingEvent: true, opensResponseWindow: true, canBeRespondedTo: true, persistence: "lingeringEffect", duration: "Until Gym end", expirationPoint: "At the approved End-of-Gym expiration checkpoint.", protectionScope: ["moneySteal", "moneyDestroy", "moneyCopy", "tokenSteal", "tokenDestroy", "tokenCopy", "followMe", "embargo"], automaticMutations: ["Create exact-player Safeguard protection", "Block only canonical Safeguard operation categories"], mechanicContract: { exactPlayerScopeRequired: true, categoryMatrixRequired: true, protectedCategories: ["moneySteal", "moneyDestroy", "moneyCopy", "tokenSteal", "tokenDestroy", "tokenCopy", "followMe", "embargo"], explicitNonProtectedCategories: ["itemSteal", "itemDestroy", "tmSteal", "tmDestroy", "pokemonSteal", "forcedPayment", "counterspellRestoration"] } }),
   753 |     protection({ id: "teleport", name: "Teleport", rulesText: "Delay an effect until the start of the next matching phase during the next gym", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "delayParent", canRespondTo: ["delayableEffect"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Teleport is production-usable for exact declared Token events handled by the Control controller. Unsupported or nested response effects are hidden and fail before consumption.", requiredChoices: [], parentInteraction: "Close the parent as delayed and preserve one authoritative delayed-effect record. At the next Gym's matching phase, revalidate without retargeting and resolve using the actual resolution phase anchor.", persistence: "delayedEffectRecord", duration: "Until the start of the next matching phase during the next Gym", expirationPoint: "Terminal after resolution, gameplay-illegal no-effect, or system-failure cancellation and refund.", mechanicContract: { nextGymSamePhaseRequired: true, declarationPhaseAnchorPreserved: true, resolutionDurationAnchorsToActualResolutionPhase: true, revalidateAtReturn: true, gameplayIllegalityResult: "resolvedNoEffect", gameplayIllegalityConsumesTeleportAndParent: true, gameplayIllegalityRetargets: false, gameplayIllegalityRefunds: false, systemCorruptUnsupportedResult: "canceledRefunded", duplicateResolutionForbidden: true, refreshPersistenceRequired: true, supportedProductionParents: "exact declared Token events handled by the Control controller", unsupportedParentsFailBeforeConsumption: true } }),
   754 |     protection({ id: "substitute", name: "Substitute", rulesText: "Choose a Pokemon to protect from one effect. If it would be banned, it is not banned and cannot be banned again during this phase", isResponse: false, legalPhases: ["action", "teamBuilding"], timingWindows: ["action", "teamBuilding"], activationPattern: "proactive", requiresPendingEvent: false, targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "pokemon", applicationScope: "rosterInstance", affectedEntityType: "pokemon", targetControllerRelation: "self", selfOnly: true, magicianLegalAlternateTargetExplanation: "Magician may change the target only to another Pokemon owned by the Substitute user.", resolverMode: resolverModes.AUTOMATIC, resolverId: "substituteAttach", createsPendingEvent: false, opensResponseWindow: false, persistence: "lingeringEffect", duration: "Until used or Gym end", expirationPoint: "When its one-use protection is spent or at the approved End-of-Gym expiration checkpoint, whichever occurs first.", automaticMutations: ["Attach one-use Substitute protection to the selected roster instance", "Intercept after responses and before parent mutation", "Normally exempt only that roster instance", "Negate an entire species-wide Ban and create current-phase Ban protection"] }),
   755 |     protection({ id: "follow-me", name: "Follow Me", rulesText: "When Another Player Or Another Player's Pokemon Is Targeted By An Effect, Change The Target To You Or One Of Your Legal Pokemon Instead. The New Target Must Be A Legal Target For The Original Effect. After This Effect Resolves, For The Rest Of This Gym, Copy Each Token Used By The Player Whose Effect You Redirected. Follow Me Cannot Redirect Global Effects Or Effects That Do Not Target A Player Or Pokemon", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "redirectParentToSelf", copyActivationMode: copyActivationModes.FOLLOW_ME, canRespondTo: ["singlePlayerTarget", "rosterInstanceTarget"], parentInteraction: "Replace one corresponding target with the Follow Me user or one of that user's legal Pokemon, preserve unaffected targets, then after the redirected parent resolves create the Gym-long Copy relationship.", persistence: "lingeringEffect", duration: "Through the current Gym after the redirected parent resolves", expirationPoint: "End of Gym", effectTags: ["Redirect", "Copy"], runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Follow Me is unavailable because its Gym-long Copy relationship is not implemented and the mandatory/optional plus relative-resolution order of each later copied activation is not settled. No target is redirected and the Token is not consumed.", automaticMutations: ["Replace one corresponding parent target", "Preserve source, cost, text, target type, target count, and unaffected targets", "Record the redirected effect's source player", "Create a Gym-long ongoing Copy relationship after parent resolution"], mechanicContract: { initialRedirectOperation: "replaceOneCorrespondingTarget", requiresLegalCorrespondingTarget: true, excludesGlobalAndTargetlessEffects: true, preserveSourceCostTextTargetTypeTargetCountAndUnaffectedTargets: true, ongoingEffectBeginsAfterRedirectedParentResolves: true, ongoingEffectDuration: "currentGym", copyEachLaterTokenUsedByRecordedPlayer: true, copiedActivationChoiceRequirement: "needsRuling", copiedActivationRelativeOrder: "needsRuling", copySemanticsStatus: "settled" } }),
   756 |     protection({ id: "parting-shot", name: "Parting Shot", rulesText: "During Team Preview, switch a previewed Pokemon for another party Pokemon. Cursed-swap retaliation is tracked manually", isResponse: false, legalPhases: ["teamPreview"], timingWindows: ["teamPreview"], activationPattern: "phaseSpecific", activationType: "Team Preview declaration", requiresPendingEvent: false, createsPendingEvent: true, opensResponseWindow: true, targetType: "team", targetScope: "singleTeam", resolverMode: resolverModes.GUIDED, resolverId: "teamPreviewSwap", requiredChoices: ["Pokemon out", "Pokemon in"], guidedTask: { instruction: "Choose the revealed Pokemon leaving and the legal party Pokemon replacing it.", responsible: "Affected player", resultLabel: "Completed Swap", placeholder: "Abra out; Grovyle in", confirmationLabel: "Apply Team Swap" } }),
   757 |     protection({ id: "embargo", name: "Embargo", rulesText: "Target player can only use one more Token this gym. You cannot use another Token after this resolves", targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "playerStatus", persistence: "lingeringEffect", duration: "Until Gym end", expirationPoint: "At the approved End-of-Gym expiration checkpoint.", automaticMutations: ["Limit target to one more Token", "Prevent the acting player from using another Token this Gym"] }),
   758 |     protection({ id: "after-you", name: "After You", rulesText: "After a player declares an effect, copy and use it", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "copyParentEffect", copyActivationMode: copyActivationModes.AFTER_YOU, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "After You is unavailable because its fresh target/choice and explicit-cost controller is not implemented, and the copyable effect-source classes plus relative chain order are not settled.", requiredChoices: ["Copied effect target and choices"], guidedTask: { instruction: "Copy the parent effect, then enter fresh legal targets, choices, and any explicit costs required by that effect.", responsible: "Responding player", resultLabel: "Copied Effect Result", placeholder: "Describe target, choices, costs, and result", confirmationLabel: "Resolve Copied Effect" }, mechanicContract: { copyableSourceTypes: "needsRuling", copiedActivationRelativeOrder: "needsRuling" } }),
   759 |     protection({ id: "smokescreen", name: "Smokescreen", rulesText: "When You Or Your Pokemon Are Targetted For An Effect, Spin A Wheel With All Players. The Result Is The New Target Of That Effect. If Pokemon Are Targetted When This Is Used, Choose A Legal Target From That Player Landed On. Your Original Target Remains The Same", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "smokescreenRedirect", canRespondTo: ["singlePlayerTarget", "rosterInstanceTarget"], requiredChoices: ["Wheel result player", "One legal corresponding Pokemon when the parent targets Pokemon and the result changes player"], guidedTask: { instruction: "Spin once with every player represented exactly once. Keep the original target when its player wins or when another winning player has no legal corresponding target; otherwise choose one legal corresponding target owned by that player.", responsible: "Targeted player", resultLabel: "Redirect Result", placeholder: "Gold - Lucario", confirmationLabel: "Confirm Smokescreen" }, parentInteraction: "Replace the original selected target only when the wheel lands on another player with a legal corresponding target. Preserve the source, costs, text, target category, target count, and every unaffected target.", effectTags: ["Redirect"], runtimeUsability: runtimeUsabilityStatuses.GUIDED_ONLY, runtimeUsabilityReason: "Smokescreen uses the guided wheel and corresponding-target confirmation flow; it cannot fall back to additive or arbitrary target behavior.", mechanicContract: { targetOperation: "replaceOneCorrespondingTarget", wheelIncludesEveryPlayerExactlyOnce: true, originalPlayerResultKeepsTarget: true, playerParentUsesLandedPlayer: true, pokemonParentChoosesLegalPokemonOwnedByLandedPlayer: true, preserveSourceCostTextTargetCategoryTargetCountAndOtherTargets: true, noLegalCorrespondingTargetHandling: "keepOriginalTarget", redirectReplacement: true, recursiveWheel: false } }),
   760 |     protection({ id: "counterspell", name: "Counterspell", rulesText: "When One Of Your Tokens Is Negated, Use This Token. The Negated Token Is Not Consumed. That Token Cannot Be Used Again Until 2 Gyms Have Passed", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "restoreNegatedTokenWithCooldown", canRespondTo: ["negatedOwnTokenActivation"], requiredChoices: ["The user's exact negated Token inventory record"], persistence: "exactTokenCooldown", duration: "2 Gyms from the declaration phase anchor", expirationPoint: "At the same phase boundary two Gyms after Counterspell resolves", effectTags: ["Restore", "Cooldown"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Counterspell restores the exact negated owned Token on its persisted two-Gym phase-anchored cooldown.", automaticMutations: ["Restore the exact consumed Token inventory record", "Apply a two-Gym cooldown anchored to the declaration phase", "Keep the original activation negated"], mechanicContract: { requiresOwnedActivatedTokenNegated: true, originalTokenRemainsNegated: true, originalTokenDoesNotResolve: true, restoreExactTokenInventoryRecord: true, cooldownGyms: 2, cooldownScope: "exactRestoredToken", visibleWhileUnusable: true, normalUseReturnsAfterCooldown: true, explicitConsumptionException: true, preserveDeclarationNegationResponseRestorationCooldownRelationship: true, counterspellUsesUniversalLifecycle: true } }),
   761 |     protection({ id: "seven-tools", name: "7 Tools Of The Bandit", aliases: ["7 Tools", "Seven Tools"], rulesText: "When A Player Activates A Protection Token, Use This Token Immediately After. Negate That Protection Token, Then Copy It. The Copied Token Must Be Used During This Gym Or It Is Lost", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "counterProtection", copyActivationMode: copyActivationModes.TEMPORARY_INVENTORY, canRespondTo: ["protectionTokenActivation"], specialPriority: "Immediately after the targeted Protection Token activation", persistence: "temporaryCopiedToken", duration: "Until used or End of Gym", expirationPoint: "End of the current Gym if unused", effectTags: ["Negate", "Copy"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "7 Tools atomically negates the exact Protection response and creates its same-Gym temporary copy.", parentInteraction: "Negate the targeted Protection Token, keep it negated, then create one temporary copy for the 7 Tools user.", automaticMutations: ["Negate the targeted Protection Token", "Create one temporary copy for the 7 Tools user", "Retain copied Token timing, targeting, and effect rules", "Expire the temporary copy unused at End of Gym"], mechanicContract: { respondsOnlyToProtectionTokenActivation: true, negateTargetProtection: true, temporaryCopyCount: 1, copyOwner: "sevenToolsUser", preserveCopiedDefinitionTimingTargetsAndRules: true, permanentInventory: false, expiresAtEndOfCurrentGym: true, recordSourceDefinitionActivationOwnerCreationGymAndExpiration: true, safeguardCopyProtectionMustBeChecked: true, copyModelIsTokenSpecific: true, atomicResolutionRequired: true } }),
   762 |     protection({ id: "immunity", name: "Immunity", aliases: ["Emergency Immunity Token"], rulesText: "Negate any effect or global effect. Does not stop Series Restricts or bans", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "immunity", canRespondTo: ["targetedEffect", "globalEffect"], protectionScope: ["targetedEffect", "globalEffect"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Immunity atomically negates its exact current parent prompt and is covered across reload, undo, results, and sandbox isolation.", automaticMutations: ["Negate the parent prompt"] }),
   763 |     protection({ id: "revenge", name: "Revenge", rulesText: "After a Battle Phase where an opponent cursed a Pokemon you brought, release 2 Pokemon from their brought team and destroy the held item", isResponse: false, legalPhases: [], timingWindows: ["endOfBattlePhaseProcedure"], phaseBoundaryProcedure: "endOfBattlePhaseProcedure", explicitPhaseTiming: "postPayoutBeforeControl", activationPattern: "phaseBoundaryOptionalTrigger", activationType: "Post-payout optional offer", requiresPendingEvent: false, createsPendingEvent: true, opensResponseWindow: false, targetType: "team", targetScope: "singleTeam", targetControllerRelation: "otherPlayer", otherPlayerOnly: true, excludeActor: true, differentControllerRequired: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "revengeRelease", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Revenge is offered after payout from exact current-Gym Curse anchors and the immutable brought-team snapshot. It consumes only after the affected player confirms two exact Pokemon and an optional eligible held Item.", requiredChoices: ["Exactly two exact Pokemon from the offender's immutable brought team", "At most one eligible held item from those two"], guidedTask: { instruction: "Choose exactly two exact roster instances from the offending player's immutable brought-team snapshot, then optionally choose one eligible exactly referenced held item from those two.", responsible: "Affected player", resultLabel: "Revenge Choices", placeholder: "Two exact roster IDs and optional exact held item ID", confirmationLabel: "Apply Revenge" }, mechanicContract: { postPayoutBeforeControl: true, immutableBroughtSnapshotRequired: true, exactReleaseCount: 2, qualifyingCurseMustTargetExactBroughtInstance: true, heldItemSelectionMaximum: 1, heldItemMustBelongToSelectedReleasedPokemon: true, exactHeldInventoryReferenceRequired: true, masterBallTierProtected: true, sameNameInventoryGuessingForbidden: true, atomicResolutionRequired: true, idempotentResolutionRequired: true, adminUndoRequired: true, optionalOfferCanBeDeclinedWithoutConsumption: true, productionChoiceScreenRequired: true } }),
   764 | 
   765 |     encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll any wheel result", legalPhases: ["encounterResult", "wheelWindow"], timingWindows: ["encounterResult", "wheelWindow"], isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "reroll", createsPendingEvent: false, opensResponseWindow: false, canRespondTo: ["wheelResult"], automaticMutations: ["Select one exact unresolved result revision", "Mark the original revision superseded", "Generate one canonical replacement linked to the original", "Resume the normal acquisition path"], mechanicContract: { exactUnresolvedResultRequired: true, encounterAndWheelResultsSupported: true, historicalAcquiredDeclinedTransferredOrSupersededResultsIllegal: true, consumeOnceAtConfirmation: true, canonicalReplacementGeneratorRequired: true, originalRevisionStatus: "superseded", supersededResultCannotBeAcquired: true, causalRevisionLinkRequired: true, stableOperationIdentityRequired: true, duplicateCompletionForbidden: true, normalAcquisitionFlowResumes: true, staleConfirmationResult: "resolvedNoEffect", causalHistoryUndoRequired: true } }),
   766 |     encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Use in Action Phase to roll an extra encounter", legalPhases: ["action"], targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "extraEncounter", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Extra Encounter grants exactly one stable authoritative Encounter roll to the chosen player through the normal Encounter session lifecycle.", requiredChoices: ["Target player"], automaticMutations: ["Create or extend one authoritative Encounter session for the chosen player", "Grant exactly one additional Encounter Wheel roll", "Open the normal Encounter review flow"], mechanicContract: { actionPhaseOnly: true, exactChosenPlayerRequired: true, actionCostRequired: false, rollsGranted: 1, reusesOpenEncounterSession: true, createsStandaloneSessionWhenNeeded: true, stableGrantIdentityRequired: true, duplicateGrantForbidden: true } }),
   767 |     encounter({ id: "repel-token", name: "Repel", rulesText: "Remove one Pokemon for every 5 entries on an encounter wheel", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterWheelEdit", requiredChoices: ["Pokemon entries removed"], guidedTask: { instruction: "Before the roll, remove one wheel entry for every five entries.", responsible: "Acting player", resultLabel: "Removed Entries", placeholder: "Pokemon names removed", confirmationLabel: "Apply Repel" } }),
   768 |     encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Release an encounter and steal another player's encounter", legalPhases: phaseSets.encounterResult, timingWindows: phaseSets.encounterResult, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterTransfer", requiredChoices: ["Encounter released", "Encounter stolen"], guidedTask: { instruction: "Release the user's encounter and choose another pending encounter to transfer.", responsible: "Acting player", resultLabel: "Transferred Encounter", placeholder: "Gold's Abra -> Steevee", confirmationLabel: "Apply Encounter Transfer" } }),
   769 |     encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Before an encounter wheel, name almost any ability. The encounter has access to that ability", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Ability name"], guidedTask: { instruction: "Name the legal ability before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Ability", placeholder: "Levitate", confirmationLabel: "Grant Ability" } }),
   770 |     encounter({ id: "honey-token", name: "Honey", rulesText: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter", legalPhases: [], timingWindows: ["endOfActionPhaseProcedure"], phaseBoundaryProcedure: "endOfActionPhaseProcedure", explicitPhaseTiming: "endOfActionPhase", timingStatus: "settled", candidateTiming: "endOfActionPhase", isResponse: false, requiresPendingEvent: false, activationPattern: "phaseBoundaryOptionalTrigger", activationType: "End-of-Action optional offer", createsPendingEvent: true, opensResponseWindow: true, targetType: "encounterResult", targetScope: "manual", minTargets: 1, maxTargets: 1, targetCollectionType: "eligibleRecordSelection", targetValidation: "The selected completed encounter must remain an eligible record from the current Action Phase.", resolverMode: resolverModes.GUIDED, resolverId: "encounterCopy", eligibleRecordType: "encounter", eligibleRecordWindow: "currentActionPhase", selectionCount: 1, copiedPayloadStatus: "needsRuling", requiredChoices: ["Eligible completed encounter or Skip"], guidedTask: { instruction: "Choose one eligible completed encounter from this Action Phase or Skip. The copied payload remains subject to the approved ruling.", responsible: "Eligible player", resultLabel: "Selected Encounter", placeholder: "Gold - Abra - Hidden Grotto", confirmationLabel: "Choose Encounter" } }),
   771 |     encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Choose your encounter. Other players cannot change it", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterChoose", requiredChoices: ["Chosen encounter Pokemon"], guidedTask: { instruction: "Choose a legal encounter and lock it against further changes.", responsible: "Acting player", resultLabel: "Chosen Encounter", placeholder: "Pokemon name", confirmationLabel: "Lock Encounter" } }),
   772 |     encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Before an encounter wheel, name any move. The encounter has access to that move", legalPhases: phaseSets.encounterBefore, timingWindows: phaseSets.encounterBefore, isResponse: true, targetType: "encounterResult", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "encounterGrant", requiredChoices: ["Move name"], guidedTask: { instruction: "Name the move before rolling the encounter.", responsible: "Acting player", resultLabel: "Granted Move", placeholder: "Fake Out", confirmationLabel: "Grant Move" } }),
   773 | 
   774 |     control({ id: "move-deleter", name: "Move Deleter", aliases: ["Move Deleter Curse"], rulesText: "Ban one move from being brought for 1 week. Cannot be used after team submission", targetType: "resource", targetScope: "singleResource", selectedTargetType: "move", applicationScope: "tableWide", affectedEntityType: "move", targetScopeStatus: "settled", targetControllerRelation: "notApplicable", minTargets: 1, maxTargets: 1, targetCollectionType: "canonicalMove", resolverMode: resolverModes.AUTOMATIC, resolverId: "moveBan", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Move Deleter records one canonical global move restriction for the next Gym and the Teambuilder and validator enforce it.", requiredChoices: ["One canonical move"], persistence: "lingeringEffect", duration: "Next Gym", expirationPoint: "End of the next Gym", automaticMutations: ["Create a global move restriction keyed by canonical move identity", "Disable the move in Teambuilder and team validation during the next Gym", "Expire the restriction when that Gym ends"] }),
   775 |     curse({ id: "toxic-curse", name: "Toxic Curse", rulesText: "Force a Pokemon to carry a Toxic Orb for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Toxic Orb status with exact protected-instance exclusions"] }),
   776 |     curse({ id: "iron-ball-curse", name: "Iron Ball Curse", rulesText: "Force a Pokemon to carry an Iron Ball for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Iron Ball status with exact protected-instance exclusions"] }),
   777 |     curse({ id: "flame-curse", name: "Flame Curse", rulesText: "Force a Pokemon to carry a Flame Orb for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", targetControllerRelation: "anyPlayer", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Flame Orb status with exact protected-instance exclusions"] }),
   778 |     curse({ id: "silencing-curse", name: "Silencing Curse", rulesText: "Restrict a Pokemon to 2 move slots for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide max-two-moves status with exact protected-instance exclusions", "Require explicit per-instance two-move repair where needed"] }),
   779 |     curse({ id: "knock-off-curse", name: "Knock Off Curse", rulesText: "Choose a Pokemon and an Item or TM move. If it is on the Pokemon, remove it from inventory. Masterball items are protected", targetType: "pokemon", targetScope: "rosterInstance", targetControllerRelation: "needsRuling", resolverMode: resolverModes.GUIDED, resolverId: "knockOff", runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Knock Off Curse is unavailable until the legal target-controller relationship is settled and exact Item/TM removal is implemented. The Token is not consumed.", requiredChoices: ["Item or TM name"], guidedTask: { instruction: "Name the Item or TM move to check on the selected Pokemon.", responsible: "Acting player", resultLabel: "Item or TM", placeholder: "Leftovers", confirmationLabel: "Resolve Knock Off" } }),
   780 |     curse({ id: "haze-curse", name: "Haze Curse", rulesText: "Select 2 Pokemon. Their buffs are negated for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "needsRuling", minTargets: 2, maxTargets: 2, targetCollectionType: "validatedRosterInstances", resolverMode: resolverModes.GUIDED, resolverId: "multiStatusEffect", runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Haze Curse is unavailable until the legal controllers for its two species anchors and its two-Gym expiration boundary are settled. The Token is not consumed.", requiredChoices: ["Exactly two Pokemon species anchors"], guidedTask: { instruction: "Choose exactly two Active Roster Pokemon as species anchors. Which controllers are legal remains Needs Ruling.", responsible: "Acting player", resultLabel: "Selected Species", placeholder: "Controller - Pokemon; Controller - Pokemon", confirmationLabel: "Apply Haze" }, persistence: "lingeringEffect", duration: "2 Gyms", expirationPoint: unresolvedMultiGymExpiration }),
   781 |     curse({ id: "imprison-curse", name: "Imprison Curse", rulesText: "Selected Pokemon cannot have EVs or IVs and must use a neutral nature for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide non-destructive no-EVs, no-IVs, neutral-Nature override with exact protected-instance exclusions"] }),
   782 |     curse({ id: "devolve-token", name: "Devolve", aliases: ["Devolve Token"], rulesText: "Selected Pokemon is devolved for 1 gym. During team submission, the target may adjust its set before preview", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "1 Gym", expirationPoint: unresolvedMultiGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Create species-wide Devolved status with exact protected-instance exclusions", "Permit Team Submission set revision"], runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Devolve is unavailable until branch/form selection, temporary species state, set revision, and exact restoration rules are canonical and implemented." }),
   783 |     curse({ id: "purge-curse", name: "Purge Curse", rulesText: "All Pokemon brought to this Battle Phase are released after battle completes. This Token ignores other effects", targetType: "player", targetScope: "singlePlayer", selectedTargetType: "player", applicationScope: "submittedTeamInstances", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "purgeAfterBattle", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Purge records an absolute target-player marker, then atomically releases that player's immutable brought-team snapshot after Gym payout.", opensResponseWindow: false, persistence: "lingeringEffect", duration: "Until the post-payout checkpoint of the current Battle Phase", expirationPoint: "Immediately after Gym payout and before ordinary Control Timing reopens.", automaticMutations: ["Create an absolute Purge marker without an ordinary response window", "Capture the immutable exact brought-team snapshot", "After payout release every exact brought roster instance atomically", "Ignore Substitute, Curse Immunity, redirection, negation, and other gameplay prevention"], mechanicContract: { postPayoutBeforeControl: true, immutableBroughtSnapshotRequired: true, absoluteGameplayEffect: true, canBeRespondedTo: false, canBeNegated: false, canBeRedirected: false, canBeProtected: false, ignoresSubstitute: true, ignoresCurseImmunity: true, atomicResolutionRequired: true, idempotentResolutionRequired: true, adminUndoRequired: true, systemFailureRollbackAndRefundRequired: true } }),
   784 |     curse({ id: "foresight-curse", name: "Foresight Curse", rulesText: "Choose 6 Pokemon. If Any Of Those Pokemon Are Brought To This Battle Phase, Their Sets Become Revealed To You. This Is Not A Nerf/Debuff", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "needsRuling", minTargets: 6, maxTargets: 6, targetCollectionType: "validatedRosterInstances", resolverMode: resolverModes.GUIDED, resolverId: "multiStatusEffect", requiredChoices: ["Exactly six Pokemon species anchors"], guidedTask: { instruction: "Choose exactly six Active Roster Pokemon as species anchors. If matching species are brought, reveal their sets only to the Foresight Curse user. Which controllers are legal remains Needs Ruling.", responsible: "Acting player", resultLabel: "Privately Marked Species", placeholder: "List the six selected Pokemon", confirmationLabel: "Apply Private Foresight" }, persistence: "privateInformationMarker", duration: "Current Battle Phase", expirationPoint: "At the end of the current Battle Phase after its private reveal obligation is complete.", visibility: "sourcePlayerOnly", effectClassification: "privateInformationMarkerNotDebuff", removableBy: [], runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Foresight Curse is unavailable because player-scoped private set delivery is not implemented. No selections or set data are placed in shared game state and the Token is not consumed.", mechanicContract: { selectionCount: 6, selectionUsesRosterInstanceAnchors: true, applicationScope: "globalSpecies", revealOnlyToSourcePlayer: true, authorizedViewer: "sourcePlayer", unauthorizedViewers: "everyOtherPlayer", hostAccessPolicy: "separateAdministrativeAuthorization", clientSideHidingSufficient: false, sharedStatePayloadMayContainSetData: false, automaticRevealEnabled: false, publicReveal: false, privateVisibilityData: true, nerfOrDebuff: false, removableByClearSmog: false, removableByGenericNerfRemoval: false, ownedPokemonRestriction: false, unauthorizedViewsMustNotReceiveOrRenderSetData: true } }),
   785 | 
   786 |     control({ id: "ditto-token", name: "Ditto", rulesText: "Transforms into any Token except Game Corner Tickets", targetType: "resource", targetScope: "singleResource", resolverMode: resolverModes.GUIDED, resolverId: "copyToken", copyActivationMode: copyActivationModes.DITTO, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Ditto is unavailable because its legal Token picker and fresh declaration controller are not implemented, and the handling of phase-boundary-only, response-only, and delayed Tokens outside their native windows is not settled.", requiredChoices: ["Token to copy", "Fresh targets and choices", "Explicit copied-effect costs"], guidedTask: { instruction: "Choose one legal normal Token definition, then create one copied activation with fresh targets, choices, and explicit costs. Do not add that Token to inventory.", responsible: "Acting player", resultLabel: "Copied Activation", placeholder: "Restrict", confirmationLabel: "Use Ditto Activation" }, mechanicContract: { selectedDefinitionMustBeCurrentlyTimingLegal: "needsRuling", phaseBoundaryResponseAndDelayedTokenHandling: "needsRuling" } })
   787 |   ];
   788 | 
```



## package.json detailed contexts

### encounter

Occurrences: 3

#### Hit 1 — line 10

```text
     1 | {
     2 |   "name": "rival-saga",
     3 |   "version": "0.1.0",
     4 |   "private": true,
     5 |   "description": "Rival Saga live client prototype with a lightweight local backend.",
     6 |   "scripts": {
     7 |     "start": "node server.js",
     8 |     "dev": "node server.js",
     9 |     "simulate:series": "node scripts/simulate-series.js",
    10 |     "import:encounters:hoenn": "node scripts/import-pokeapi-hoenn-encounters.js",
    11 |     "import:build-data": "node scripts/import-pokeapi-build-data.js pokemon-build-data.js pokemon-build-data.js",
    12 |     "generate:move-classification": "node scripts/generate-move-classification-data.js",
    13 |     "audit:build-data": "node scripts/audit-build-learnsets.js",
    14 |     "audit:tm-shop": "node scripts/audit-tm-shop-coverage.js",
    15 |     "audit:item-shop-sprites": "node scripts/audit-item-shop-sprites.js --check",
    16 |     "audit:item-shop-z-catalog": "node scripts/audit-item-shop-z-catalog.js --check",
    17 |     "audit:docs": "node scripts/check-doc-links.js",
    18 |     "audit:v2-routes": "node versions/next-action-phase/audit-route-generation.js",
    19 |     "generate:token-matrix": "node scripts/generate-token-effect-matrix.js",
    20 |     "generate:token-coverage": "node scripts/generate-token-qa-coverage.js",
    21 |     "generate:token-handoff": "node scripts/generate-token-final-handoff.js",
    22 |     "audit:token-contract": "node scripts/generate-token-effect-matrix.js --check",
    23 |     "test:control-tokens": "node --test scripts/test-control-token-foundation.js",
    24 |     "test:token-controller": "node --test scripts/test-token-controller-integration.js",
    25 |     "test:token-completion-slice": "node --test scripts/test-token-completion-slice.js",
    26 |     "test:token-lifecycle-slice": "node --test scripts/test-token-lifecycle-slice.js",
    27 |     "test:token-sandbox": "node --test scripts/test-token-sandbox.js",
    28 |     "test:token-browser": "node --test scripts/test-token-browser.js",
```


#### Hit 2 — line 10

```text
     1 | {
     2 |   "name": "rival-saga",
     3 |   "version": "0.1.0",
     4 |   "private": true,
     5 |   "description": "Rival Saga live client prototype with a lightweight local backend.",
     6 |   "scripts": {
     7 |     "start": "node server.js",
     8 |     "dev": "node server.js",
     9 |     "simulate:series": "node scripts/simulate-series.js",
    10 |     "import:encounters:hoenn": "node scripts/import-pokeapi-hoenn-encounters.js",
    11 |     "import:build-data": "node scripts/import-pokeapi-build-data.js pokemon-build-data.js pokemon-build-data.js",
    12 |     "generate:move-classification": "node scripts/generate-move-classification-data.js",
    13 |     "audit:build-data": "node scripts/audit-build-learnsets.js",
    14 |     "audit:tm-shop": "node scripts/audit-tm-shop-coverage.js",
    15 |     "audit:item-shop-sprites": "node scripts/audit-item-shop-sprites.js --check",
    16 |     "audit:item-shop-z-catalog": "node scripts/audit-item-shop-z-catalog.js --check",
    17 |     "audit:docs": "node scripts/check-doc-links.js",
    18 |     "audit:v2-routes": "node versions/next-action-phase/audit-route-generation.js",
    19 |     "generate:token-matrix": "node scripts/generate-token-effect-matrix.js",
    20 |     "generate:token-coverage": "node scripts/generate-token-qa-coverage.js",
    21 |     "generate:token-handoff": "node scripts/generate-token-final-handoff.js",
    22 |     "audit:token-contract": "node scripts/generate-token-effect-matrix.js --check",
    23 |     "test:control-tokens": "node --test scripts/test-control-token-foundation.js",
    24 |     "test:token-controller": "node --test scripts/test-token-controller-integration.js",
    25 |     "test:token-completion-slice": "node --test scripts/test-token-completion-slice.js",
    26 |     "test:token-lifecycle-slice": "node --test scripts/test-token-lifecycle-slice.js",
    27 |     "test:token-sandbox": "node --test scripts/test-token-sandbox.js",
    28 |     "test:token-browser": "node --test scripts/test-token-browser.js",
```


#### Hit 3 — line 43

```text
    25 |     "test:token-completion-slice": "node --test scripts/test-token-completion-slice.js",
    26 |     "test:token-lifecycle-slice": "node --test scripts/test-token-lifecycle-slice.js",
    27 |     "test:token-sandbox": "node --test scripts/test-token-sandbox.js",
    28 |     "test:token-browser": "node --test scripts/test-token-browser.js",
    29 |     "test:item-shop-browser": "node --test scripts/test-item-shop-sprite-browser.js",
    30 |     "test:item-shop-sprite-browser": "node --test scripts/test-item-shop-sprite-browser.js",
    31 |     "test:game-shell": "node --test scripts/test-game-shell-loading.js",
    32 |     "test:persistence": "node --test scripts/test-backend-persistence.js",
    33 |     "test:save-compaction": "node --test scripts/test-save-compaction.js",
    34 |     "test:global-shell": "node --test scripts/test-global-shell-foundation.js",
    35 |     "test:gameplay-ribbon": "node --test scripts/test-gameplay-ribbon-league-menu.js",
    36 |     "test:battle-phase": "node --test scripts/test-battle-phase-authority.js",
    37 |     "test:sabotage-flow": "node --test scripts/test-sabotage-effect-flow.js",
    38 |     "test:action-operations": "node --test scripts/test-action-operation-contract.js",
    39 |     "test:action-balance": "node --test scripts/test-action-phase-balance.js",
    40 |     "test:action-workspace": "node --test scripts/test-action-phase-workspace.js",
    41 |     "test:v2-route-browser": "node --test scripts/test-v2-route-browser-mount.js",
    42 |     "test:v2-route-runtime": "node --test scripts/test-v2-route-runtime-sequences.js",
    43 |     "test:v2-routes": "node --test versions/next-action-phase/tests/test-route-encounter-engine.js",
    44 |     "test:provisional-declarations": "node --test scripts/test-provisional-declaration-runtime.js scripts/test-provisional-declaration-server.js",
    45 |     "test:live-referee-context": "node --test scripts/test-live-referee-controlled-context.js",
    46 |     "test:live-referee-lifecycle": "node --test scripts/test-live-referee-lifecycle.js",
    47 |     "test:live-referee-regressions": "node --test scripts/test-live-referee-token-regressions.js",
    48 |     "test:token-inventory-runtime": "node --test scripts/test-token-inventory-runtime.js",
    49 |     "test:token-results": "node --test scripts/test-token-result-summary.js",
    50 |     "test:standard-curses": "node --test scripts/test-standard-curse-tokens.js",
    51 |     "test:settled-token-rulings": "node --test scripts/test-settled-token-rulings.js",
    52 |     "test:token-coverage": "node scripts/run-token-qa-coverage.js"
    53 |   },
    54 |   "engines": {
    55 |     "node": ">=18"
    56 |   },
    57 |   "devDependencies": {
    58 |     "pokemon-showdown": "^0.11.10"
    59 |   }
    60 | }
    61 | 
```


### action-workspace

Occurrences: 1

#### Hit 1 — line 40

```text
    22 |     "audit:token-contract": "node scripts/generate-token-effect-matrix.js --check",
    23 |     "test:control-tokens": "node --test scripts/test-control-token-foundation.js",
    24 |     "test:token-controller": "node --test scripts/test-token-controller-integration.js",
    25 |     "test:token-completion-slice": "node --test scripts/test-token-completion-slice.js",
    26 |     "test:token-lifecycle-slice": "node --test scripts/test-token-lifecycle-slice.js",
    27 |     "test:token-sandbox": "node --test scripts/test-token-sandbox.js",
    28 |     "test:token-browser": "node --test scripts/test-token-browser.js",
    29 |     "test:item-shop-browser": "node --test scripts/test-item-shop-sprite-browser.js",
    30 |     "test:item-shop-sprite-browser": "node --test scripts/test-item-shop-sprite-browser.js",
    31 |     "test:game-shell": "node --test scripts/test-game-shell-loading.js",
    32 |     "test:persistence": "node --test scripts/test-backend-persistence.js",
    33 |     "test:save-compaction": "node --test scripts/test-save-compaction.js",
    34 |     "test:global-shell": "node --test scripts/test-global-shell-foundation.js",
    35 |     "test:gameplay-ribbon": "node --test scripts/test-gameplay-ribbon-league-menu.js",
    36 |     "test:battle-phase": "node --test scripts/test-battle-phase-authority.js",
    37 |     "test:sabotage-flow": "node --test scripts/test-sabotage-effect-flow.js",
    38 |     "test:action-operations": "node --test scripts/test-action-operation-contract.js",
    39 |     "test:action-balance": "node --test scripts/test-action-phase-balance.js",
    40 |     "test:action-workspace": "node --test scripts/test-action-phase-workspace.js",
    41 |     "test:v2-route-browser": "node --test scripts/test-v2-route-browser-mount.js",
    42 |     "test:v2-route-runtime": "node --test scripts/test-v2-route-runtime-sequences.js",
    43 |     "test:v2-routes": "node --test versions/next-action-phase/tests/test-route-encounter-engine.js",
    44 |     "test:provisional-declarations": "node --test scripts/test-provisional-declaration-runtime.js scripts/test-provisional-declaration-server.js",
    45 |     "test:live-referee-context": "node --test scripts/test-live-referee-controlled-context.js",
    46 |     "test:live-referee-lifecycle": "node --test scripts/test-live-referee-lifecycle.js",
    47 |     "test:live-referee-regressions": "node --test scripts/test-live-referee-token-regressions.js",
    48 |     "test:token-inventory-runtime": "node --test scripts/test-token-inventory-runtime.js",
    49 |     "test:token-results": "node --test scripts/test-token-result-summary.js",
    50 |     "test:standard-curses": "node --test scripts/test-standard-curse-tokens.js",
    51 |     "test:settled-token-rulings": "node --test scripts/test-settled-token-rulings.js",
    52 |     "test:token-coverage": "node scripts/run-token-qa-coverage.js"
    53 |   },
    54 |   "engines": {
    55 |     "node": ">=18"
    56 |   },
    57 |   "devDependencies": {
    58 |     "pokemon-showdown": "^0.11.10"
```


### action-balance

Occurrences: 1

#### Hit 1 — line 39

```text
    21 |     "generate:token-handoff": "node scripts/generate-token-final-handoff.js",
    22 |     "audit:token-contract": "node scripts/generate-token-effect-matrix.js --check",
    23 |     "test:control-tokens": "node --test scripts/test-control-token-foundation.js",
    24 |     "test:token-controller": "node --test scripts/test-token-controller-integration.js",
    25 |     "test:token-completion-slice": "node --test scripts/test-token-completion-slice.js",
    26 |     "test:token-lifecycle-slice": "node --test scripts/test-token-lifecycle-slice.js",
    27 |     "test:token-sandbox": "node --test scripts/test-token-sandbox.js",
    28 |     "test:token-browser": "node --test scripts/test-token-browser.js",
    29 |     "test:item-shop-browser": "node --test scripts/test-item-shop-sprite-browser.js",
    30 |     "test:item-shop-sprite-browser": "node --test scripts/test-item-shop-sprite-browser.js",
    31 |     "test:game-shell": "node --test scripts/test-game-shell-loading.js",
    32 |     "test:persistence": "node --test scripts/test-backend-persistence.js",
    33 |     "test:save-compaction": "node --test scripts/test-save-compaction.js",
    34 |     "test:global-shell": "node --test scripts/test-global-shell-foundation.js",
    35 |     "test:gameplay-ribbon": "node --test scripts/test-gameplay-ribbon-league-menu.js",
    36 |     "test:battle-phase": "node --test scripts/test-battle-phase-authority.js",
    37 |     "test:sabotage-flow": "node --test scripts/test-sabotage-effect-flow.js",
    38 |     "test:action-operations": "node --test scripts/test-action-operation-contract.js",
    39 |     "test:action-balance": "node --test scripts/test-action-phase-balance.js",
    40 |     "test:action-workspace": "node --test scripts/test-action-phase-workspace.js",
    41 |     "test:v2-route-browser": "node --test scripts/test-v2-route-browser-mount.js",
    42 |     "test:v2-route-runtime": "node --test scripts/test-v2-route-runtime-sequences.js",
    43 |     "test:v2-routes": "node --test versions/next-action-phase/tests/test-route-encounter-engine.js",
    44 |     "test:provisional-declarations": "node --test scripts/test-provisional-declaration-runtime.js scripts/test-provisional-declaration-server.js",
    45 |     "test:live-referee-context": "node --test scripts/test-live-referee-controlled-context.js",
    46 |     "test:live-referee-lifecycle": "node --test scripts/test-live-referee-lifecycle.js",
    47 |     "test:live-referee-regressions": "node --test scripts/test-live-referee-token-regressions.js",
    48 |     "test:token-inventory-runtime": "node --test scripts/test-token-inventory-runtime.js",
    49 |     "test:token-results": "node --test scripts/test-token-result-summary.js",
    50 |     "test:standard-curses": "node --test scripts/test-standard-curse-tokens.js",
    51 |     "test:settled-token-rulings": "node --test scripts/test-settled-token-rulings.js",
    52 |     "test:token-coverage": "node scripts/run-token-qa-coverage.js"
    53 |   },
    54 |   "engines": {
    55 |     "node": ">=18"
    56 |   },
    57 |   "devDependencies": {
```


### v2-route

Occurrences: 6

#### Hit 1 — line 18

```text
     1 | {
     2 |   "name": "rival-saga",
     3 |   "version": "0.1.0",
     4 |   "private": true,
     5 |   "description": "Rival Saga live client prototype with a lightweight local backend.",
     6 |   "scripts": {
     7 |     "start": "node server.js",
     8 |     "dev": "node server.js",
     9 |     "simulate:series": "node scripts/simulate-series.js",
    10 |     "import:encounters:hoenn": "node scripts/import-pokeapi-hoenn-encounters.js",
    11 |     "import:build-data": "node scripts/import-pokeapi-build-data.js pokemon-build-data.js pokemon-build-data.js",
    12 |     "generate:move-classification": "node scripts/generate-move-classification-data.js",
    13 |     "audit:build-data": "node scripts/audit-build-learnsets.js",
    14 |     "audit:tm-shop": "node scripts/audit-tm-shop-coverage.js",
    15 |     "audit:item-shop-sprites": "node scripts/audit-item-shop-sprites.js --check",
    16 |     "audit:item-shop-z-catalog": "node scripts/audit-item-shop-z-catalog.js --check",
    17 |     "audit:docs": "node scripts/check-doc-links.js",
    18 |     "audit:v2-routes": "node versions/next-action-phase/audit-route-generation.js",
    19 |     "generate:token-matrix": "node scripts/generate-token-effect-matrix.js",
    20 |     "generate:token-coverage": "node scripts/generate-token-qa-coverage.js",
    21 |     "generate:token-handoff": "node scripts/generate-token-final-handoff.js",
    22 |     "audit:token-contract": "node scripts/generate-token-effect-matrix.js --check",
    23 |     "test:control-tokens": "node --test scripts/test-control-token-foundation.js",
    24 |     "test:token-controller": "node --test scripts/test-token-controller-integration.js",
    25 |     "test:token-completion-slice": "node --test scripts/test-token-completion-slice.js",
    26 |     "test:token-lifecycle-slice": "node --test scripts/test-token-lifecycle-slice.js",
    27 |     "test:token-sandbox": "node --test scripts/test-token-sandbox.js",
    28 |     "test:token-browser": "node --test scripts/test-token-browser.js",
    29 |     "test:item-shop-browser": "node --test scripts/test-item-shop-sprite-browser.js",
    30 |     "test:item-shop-sprite-browser": "node --test scripts/test-item-shop-sprite-browser.js",
    31 |     "test:game-shell": "node --test scripts/test-game-shell-loading.js",
    32 |     "test:persistence": "node --test scripts/test-backend-persistence.js",
    33 |     "test:save-compaction": "node --test scripts/test-save-compaction.js",
    34 |     "test:global-shell": "node --test scripts/test-global-shell-foundation.js",
    35 |     "test:gameplay-ribbon": "node --test scripts/test-gameplay-ribbon-league-menu.js",
    36 |     "test:battle-phase": "node --test scripts/test-battle-phase-authority.js",
```


#### Hit 2 — line 41

```text
    23 |     "test:control-tokens": "node --test scripts/test-control-token-foundation.js",
    24 |     "test:token-controller": "node --test scripts/test-token-controller-integration.js",
    25 |     "test:token-completion-slice": "node --test scripts/test-token-completion-slice.js",
    26 |     "test:token-lifecycle-slice": "node --test scripts/test-token-lifecycle-slice.js",
    27 |     "test:token-sandbox": "node --test scripts/test-token-sandbox.js",
    28 |     "test:token-browser": "node --test scripts/test-token-browser.js",
    29 |     "test:item-shop-browser": "node --test scripts/test-item-shop-sprite-browser.js",
    30 |     "test:item-shop-sprite-browser": "node --test scripts/test-item-shop-sprite-browser.js",
    31 |     "test:game-shell": "node --test scripts/test-game-shell-loading.js",
    32 |     "test:persistence": "node --test scripts/test-backend-persistence.js",
    33 |     "test:save-compaction": "node --test scripts/test-save-compaction.js",
    34 |     "test:global-shell": "node --test scripts/test-global-shell-foundation.js",
    35 |     "test:gameplay-ribbon": "node --test scripts/test-gameplay-ribbon-league-menu.js",
    36 |     "test:battle-phase": "node --test scripts/test-battle-phase-authority.js",
    37 |     "test:sabotage-flow": "node --test scripts/test-sabotage-effect-flow.js",
    38 |     "test:action-operations": "node --test scripts/test-action-operation-contract.js",
    39 |     "test:action-balance": "node --test scripts/test-action-phase-balance.js",
    40 |     "test:action-workspace": "node --test scripts/test-action-phase-workspace.js",
    41 |     "test:v2-route-browser": "node --test scripts/test-v2-route-browser-mount.js",
    42 |     "test:v2-route-runtime": "node --test scripts/test-v2-route-runtime-sequences.js",
    43 |     "test:v2-routes": "node --test versions/next-action-phase/tests/test-route-encounter-engine.js",
    44 |     "test:provisional-declarations": "node --test scripts/test-provisional-declaration-runtime.js scripts/test-provisional-declaration-server.js",
    45 |     "test:live-referee-context": "node --test scripts/test-live-referee-controlled-context.js",
    46 |     "test:live-referee-lifecycle": "node --test scripts/test-live-referee-lifecycle.js",
    47 |     "test:live-referee-regressions": "node --test scripts/test-live-referee-token-regressions.js",
    48 |     "test:token-inventory-runtime": "node --test scripts/test-token-inventory-runtime.js",
    49 |     "test:token-results": "node --test scripts/test-token-result-summary.js",
    50 |     "test:standard-curses": "node --test scripts/test-standard-curse-tokens.js",
    51 |     "test:settled-token-rulings": "node --test scripts/test-settled-token-rulings.js",
    52 |     "test:token-coverage": "node scripts/run-token-qa-coverage.js"
    53 |   },
    54 |   "engines": {
    55 |     "node": ">=18"
    56 |   },
    57 |   "devDependencies": {
    58 |     "pokemon-showdown": "^0.11.10"
    59 |   }
```


#### Hit 3 — line 41

```text
    23 |     "test:control-tokens": "node --test scripts/test-control-token-foundation.js",
    24 |     "test:token-controller": "node --test scripts/test-token-controller-integration.js",
    25 |     "test:token-completion-slice": "node --test scripts/test-token-completion-slice.js",
    26 |     "test:token-lifecycle-slice": "node --test scripts/test-token-lifecycle-slice.js",
    27 |     "test:token-sandbox": "node --test scripts/test-token-sandbox.js",
    28 |     "test:token-browser": "node --test scripts/test-token-browser.js",
    29 |     "test:item-shop-browser": "node --test scripts/test-item-shop-sprite-browser.js",
    30 |     "test:item-shop-sprite-browser": "node --test scripts/test-item-shop-sprite-browser.js",
    31 |     "test:game-shell": "node --test scripts/test-game-shell-loading.js",
    32 |     "test:persistence": "node --test scripts/test-backend-persistence.js",
    33 |     "test:save-compaction": "node --test scripts/test-save-compaction.js",
    34 |     "test:global-shell": "node --test scripts/test-global-shell-foundation.js",
    35 |     "test:gameplay-ribbon": "node --test scripts/test-gameplay-ribbon-league-menu.js",
    36 |     "test:battle-phase": "node --test scripts/test-battle-phase-authority.js",
    37 |     "test:sabotage-flow": "node --test scripts/test-sabotage-effect-flow.js",
    38 |     "test:action-operations": "node --test scripts/test-action-operation-contract.js",
    39 |     "test:action-balance": "node --test scripts/test-action-phase-balance.js",
    40 |     "test:action-workspace": "node --test scripts/test-action-phase-workspace.js",
    41 |     "test:v2-route-browser": "node --test scripts/test-v2-route-browser-mount.js",
    42 |     "test:v2-route-runtime": "node --test scripts/test-v2-route-runtime-sequences.js",
    43 |     "test:v2-routes": "node --test versions/next-action-phase/tests/test-route-encounter-engine.js",
    44 |     "test:provisional-declarations": "node --test scripts/test-provisional-declaration-runtime.js scripts/test-provisional-declaration-server.js",
    45 |     "test:live-referee-context": "node --test scripts/test-live-referee-controlled-context.js",
    46 |     "test:live-referee-lifecycle": "node --test scripts/test-live-referee-lifecycle.js",
    47 |     "test:live-referee-regressions": "node --test scripts/test-live-referee-token-regressions.js",
    48 |     "test:token-inventory-runtime": "node --test scripts/test-token-inventory-runtime.js",
    49 |     "test:token-results": "node --test scripts/test-token-result-summary.js",
    50 |     "test:standard-curses": "node --test scripts/test-standard-curse-tokens.js",
    51 |     "test:settled-token-rulings": "node --test scripts/test-settled-token-rulings.js",
    52 |     "test:token-coverage": "node scripts/run-token-qa-coverage.js"
    53 |   },
    54 |   "engines": {
    55 |     "node": ">=18"
    56 |   },
    57 |   "devDependencies": {
    58 |     "pokemon-showdown": "^0.11.10"
    59 |   }
```


#### Hit 4 — line 42

```text
    24 |     "test:token-controller": "node --test scripts/test-token-controller-integration.js",
    25 |     "test:token-completion-slice": "node --test scripts/test-token-completion-slice.js",
    26 |     "test:token-lifecycle-slice": "node --test scripts/test-token-lifecycle-slice.js",
    27 |     "test:token-sandbox": "node --test scripts/test-token-sandbox.js",
    28 |     "test:token-browser": "node --test scripts/test-token-browser.js",
    29 |     "test:item-shop-browser": "node --test scripts/test-item-shop-sprite-browser.js",
    30 |     "test:item-shop-sprite-browser": "node --test scripts/test-item-shop-sprite-browser.js",
    31 |     "test:game-shell": "node --test scripts/test-game-shell-loading.js",
    32 |     "test:persistence": "node --test scripts/test-backend-persistence.js",
    33 |     "test:save-compaction": "node --test scripts/test-save-compaction.js",
    34 |     "test:global-shell": "node --test scripts/test-global-shell-foundation.js",
    35 |     "test:gameplay-ribbon": "node --test scripts/test-gameplay-ribbon-league-menu.js",
    36 |     "test:battle-phase": "node --test scripts/test-battle-phase-authority.js",
    37 |     "test:sabotage-flow": "node --test scripts/test-sabotage-effect-flow.js",
    38 |     "test:action-operations": "node --test scripts/test-action-operation-contract.js",
    39 |     "test:action-balance": "node --test scripts/test-action-phase-balance.js",
    40 |     "test:action-workspace": "node --test scripts/test-action-phase-workspace.js",
    41 |     "test:v2-route-browser": "node --test scripts/test-v2-route-browser-mount.js",
    42 |     "test:v2-route-runtime": "node --test scripts/test-v2-route-runtime-sequences.js",
    43 |     "test:v2-routes": "node --test versions/next-action-phase/tests/test-route-encounter-engine.js",
    44 |     "test:provisional-declarations": "node --test scripts/test-provisional-declaration-runtime.js scripts/test-provisional-declaration-server.js",
    45 |     "test:live-referee-context": "node --test scripts/test-live-referee-controlled-context.js",
    46 |     "test:live-referee-lifecycle": "node --test scripts/test-live-referee-lifecycle.js",
    47 |     "test:live-referee-regressions": "node --test scripts/test-live-referee-token-regressions.js",
    48 |     "test:token-inventory-runtime": "node --test scripts/test-token-inventory-runtime.js",
    49 |     "test:token-results": "node --test scripts/test-token-result-summary.js",
    50 |     "test:standard-curses": "node --test scripts/test-standard-curse-tokens.js",
    51 |     "test:settled-token-rulings": "node --test scripts/test-settled-token-rulings.js",
    52 |     "test:token-coverage": "node scripts/run-token-qa-coverage.js"
    53 |   },
    54 |   "engines": {
    55 |     "node": ">=18"
    56 |   },
    57 |   "devDependencies": {
    58 |     "pokemon-showdown": "^0.11.10"
    59 |   }
    60 | }
```


#### Hit 5 — line 42

```text
    24 |     "test:token-controller": "node --test scripts/test-token-controller-integration.js",
    25 |     "test:token-completion-slice": "node --test scripts/test-token-completion-slice.js",
    26 |     "test:token-lifecycle-slice": "node --test scripts/test-token-lifecycle-slice.js",
    27 |     "test:token-sandbox": "node --test scripts/test-token-sandbox.js",
    28 |     "test:token-browser": "node --test scripts/test-token-browser.js",
    29 |     "test:item-shop-browser": "node --test scripts/test-item-shop-sprite-browser.js",
    30 |     "test:item-shop-sprite-browser": "node --test scripts/test-item-shop-sprite-browser.js",
    31 |     "test:game-shell": "node --test scripts/test-game-shell-loading.js",
    32 |     "test:persistence": "node --test scripts/test-backend-persistence.js",
    33 |     "test:save-compaction": "node --test scripts/test-save-compaction.js",
    34 |     "test:global-shell": "node --test scripts/test-global-shell-foundation.js",
    35 |     "test:gameplay-ribbon": "node --test scripts/test-gameplay-ribbon-league-menu.js",
    36 |     "test:battle-phase": "node --test scripts/test-battle-phase-authority.js",
    37 |     "test:sabotage-flow": "node --test scripts/test-sabotage-effect-flow.js",
    38 |     "test:action-operations": "node --test scripts/test-action-operation-contract.js",
    39 |     "test:action-balance": "node --test scripts/test-action-phase-balance.js",
    40 |     "test:action-workspace": "node --test scripts/test-action-phase-workspace.js",
    41 |     "test:v2-route-browser": "node --test scripts/test-v2-route-browser-mount.js",
    42 |     "test:v2-route-runtime": "node --test scripts/test-v2-route-runtime-sequences.js",
    43 |     "test:v2-routes": "node --test versions/next-action-phase/tests/test-route-encounter-engine.js",
    44 |     "test:provisional-declarations": "node --test scripts/test-provisional-declaration-runtime.js scripts/test-provisional-declaration-server.js",
    45 |     "test:live-referee-context": "node --test scripts/test-live-referee-controlled-context.js",
    46 |     "test:live-referee-lifecycle": "node --test scripts/test-live-referee-lifecycle.js",
    47 |     "test:live-referee-regressions": "node --test scripts/test-live-referee-token-regressions.js",
    48 |     "test:token-inventory-runtime": "node --test scripts/test-token-inventory-runtime.js",
    49 |     "test:token-results": "node --test scripts/test-token-result-summary.js",
    50 |     "test:standard-curses": "node --test scripts/test-standard-curse-tokens.js",
    51 |     "test:settled-token-rulings": "node --test scripts/test-settled-token-rulings.js",
    52 |     "test:token-coverage": "node scripts/run-token-qa-coverage.js"
    53 |   },
    54 |   "engines": {
    55 |     "node": ">=18"
    56 |   },
    57 |   "devDependencies": {
    58 |     "pokemon-showdown": "^0.11.10"
    59 |   }
    60 | }
```


#### Hit 6 — line 43

```text
    25 |     "test:token-completion-slice": "node --test scripts/test-token-completion-slice.js",
    26 |     "test:token-lifecycle-slice": "node --test scripts/test-token-lifecycle-slice.js",
    27 |     "test:token-sandbox": "node --test scripts/test-token-sandbox.js",
    28 |     "test:token-browser": "node --test scripts/test-token-browser.js",
    29 |     "test:item-shop-browser": "node --test scripts/test-item-shop-sprite-browser.js",
    30 |     "test:item-shop-sprite-browser": "node --test scripts/test-item-shop-sprite-browser.js",
    31 |     "test:game-shell": "node --test scripts/test-game-shell-loading.js",
    32 |     "test:persistence": "node --test scripts/test-backend-persistence.js",
    33 |     "test:save-compaction": "node --test scripts/test-save-compaction.js",
    34 |     "test:global-shell": "node --test scripts/test-global-shell-foundation.js",
    35 |     "test:gameplay-ribbon": "node --test scripts/test-gameplay-ribbon-league-menu.js",
    36 |     "test:battle-phase": "node --test scripts/test-battle-phase-authority.js",
    37 |     "test:sabotage-flow": "node --test scripts/test-sabotage-effect-flow.js",
    38 |     "test:action-operations": "node --test scripts/test-action-operation-contract.js",
    39 |     "test:action-balance": "node --test scripts/test-action-phase-balance.js",
    40 |     "test:action-workspace": "node --test scripts/test-action-phase-workspace.js",
    41 |     "test:v2-route-browser": "node --test scripts/test-v2-route-browser-mount.js",
    42 |     "test:v2-route-runtime": "node --test scripts/test-v2-route-runtime-sequences.js",
    43 |     "test:v2-routes": "node --test versions/next-action-phase/tests/test-route-encounter-engine.js",
    44 |     "test:provisional-declarations": "node --test scripts/test-provisional-declaration-runtime.js scripts/test-provisional-declaration-server.js",
    45 |     "test:live-referee-context": "node --test scripts/test-live-referee-controlled-context.js",
    46 |     "test:live-referee-lifecycle": "node --test scripts/test-live-referee-lifecycle.js",
    47 |     "test:live-referee-regressions": "node --test scripts/test-live-referee-token-regressions.js",
    48 |     "test:token-inventory-runtime": "node --test scripts/test-token-inventory-runtime.js",
    49 |     "test:token-results": "node --test scripts/test-token-result-summary.js",
    50 |     "test:standard-curses": "node --test scripts/test-standard-curse-tokens.js",
    51 |     "test:settled-token-rulings": "node --test scripts/test-settled-token-rulings.js",
    52 |     "test:token-coverage": "node scripts/run-token-qa-coverage.js"
    53 |   },
    54 |   "engines": {
    55 |     "node": ">=18"
    56 |   },
    57 |   "devDependencies": {
    58 |     "pokemon-showdown": "^0.11.10"
    59 |   }
    60 | }
    61 | 
```



## encounter-token-runtime.js full source

```javascript
(function initEncounterTokenRuntime(root, factory) {
  const runtime = factory();
  if (typeof module === "object" && module.exports) module.exports = runtime;
  if (root) root.rivalSagaEncounterTokenRuntime = runtime;
})(typeof globalThis !== "undefined" ? globalThis : this, function createEncounterTokenRuntime() {
  "use strict";

  function phaseFor(state = {}) {
    const series = String(state.series || "");
    const gym = Number(state.gym || 1);
    return String(state.phaseState?.[`${series}:G${gym}`]?.currentPhase
      || state.phaseState?.[`${series}-G${gym}`]?.currentPhase
      || state.currentPhase
      || "");
  }

  function activeSessionForPlayer(state = {}, playerId = "") {
    return (state.encounterSessions || []).find((session) => session.playerId === playerId
      && session.series === state.series
      && Number(session.gym) === Number(state.gym)
      && ["pending", "review"].includes(session.status)) || null;
  }

  function validateExtraEncounter(state = {}, input = {}, options = {}) {
    const playerId = String(input.playerId || "");
    const player = (state.players || []).find((entry) => entry.id === playerId) || null;
    const wheel = options.wheelDefinition || null;
    if (phaseFor(state) !== "action") return { ok: false, reason: "Extra Encounter is only legal during Action Phase." };
    if (!player) return { ok: false, reason: "The selected player no longer exists." };
    if (!wheel?.id || !Array.isArray(wheel.entries) || !wheel.entries.length) {
      return { ok: false, reason: "No Encounter Wheel is available for the current Series and Gym." };
    }
    return { ok: true, player, wheel };
  }

  function grantExtraEncounter(state = {}, input = {}, options = {}) {
    const validation = validateExtraEncounter(state, input, options);
    if (!validation.ok) return validation;
    const now = String(options.now || new Date().toISOString());
    const sourceTokenId = String(input.sourceTokenId || "");
    const sourceActivationId = String(input.sourceActivationId || sourceTokenId || "");
    const existingGrant = (state.encounterSessions || []).flatMap((session) => session.extraEncounterGrants || [])
      .find((grant) => (sourceActivationId && grant.sourceActivationId === sourceActivationId)
        || (sourceTokenId && grant.sourceTokenId === sourceTokenId));
    if (existingGrant) {
      const session = (state.encounterSessions || []).find((entry) => entry.id === existingGrant.encounterSessionId) || null;
      return { ok: true, duplicate: true, created: false, session, grant: existingGrant };
    }

    state.encounterSessions ||= [];
    let session = activeSessionForPlayer(state, validation.player.id);
    const created = !session;
    if (!session) {
      const sessionId = String(options.sessionId || `extra-encounter-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`);
      session = {
        id: sessionId,
        playerId: validation.player.id,
        series: state.series,
        gym: Number(state.gym || 1),
        phase: "action",
        actionVisitId: "",
        actionVisitIds: [],
        wheelId: validation.wheel.id,
        maxRolls: 0,
        includeFishing: false,
        includeSurf: false,
        removedEntryIds: [],
        temporaryEntries: [],
        weightOverrides: {},
        resultSessionIds: [],
        rolls: [],
        status: "pending",
        visualRotation: 0,
        sourceType: "extra-encounter-token",
        createdAt: now
      };
      state.encounterSessions.unshift(session);
    }

    session.maxRolls = Math.max(Number(session.maxRolls || 0), (session.rolls || []).length) + 1;
    session.status = "pending";
    session.updatedAt = now;
    session.extraEncounterGrants ||= [];
    const grant = {
      id: String(options.grantId || `extra-encounter-grant-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`),
      encounterSessionId: session.id,
      playerId: validation.player.id,
      sourceTokenId,
      sourceActivationId,
      rollsGranted: 1,
      createdAt: now
    };
    session.extraEncounterGrants.push(grant);
    return { ok: true, duplicate: false, created, session, grant };
  }

  return Object.freeze({
    phaseFor,
    activeSessionForPlayer,
    validateExtraEncounter,
    grantExtraEncounter
  });
});

```
