# V1 Purge Stage 3 Context

Generated from `c81eafa459acc22bf9e074e2fad94d79edfd3010` after the current-only renderer purge.

Purpose: map remaining retired Encounter Wheel / Hidden Grotto runtime and distinguish it from current Route encounter/token code.

## app.js — remaining reference contexts

### encounterTokenRuntime

Occurrences: 4

#### Hit 1 — line 27

```text
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
```


#### Hit 2 — line 28

```text
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
```


#### Hit 3 — line 3927

```text
  3915 |   return record;
  3916 | }
  3917 | 
  3918 | async function resolveImmediateTokenUse(draft, { context = {} } = {}) {
  3919 |   const metadata = tokenEffectMetadataByName(draft.tokenName);
  3920 |   const timingCheck = tokenUseTimingCheck({ player: draft.actor, tokenName: draft.tokenName, metadata, context });
  3921 |   if (!timingCheck.ok) {
  3922 |     alert(timingCheck.reason);
  3923 |     return null;
  3924 |   }
  3925 |   let extraEncounterValidation = null;
  3926 |   if (metadata.resolverId === "extraEncounter") {
  3927 |     extraEncounterValidation = encounterTokenRuntime.validateExtraEncounter(state, {
  3928 |       playerId: draft.targetPlayerId
  3929 |     }, {
  3930 |       wheelDefinition: encounterWheelDefinition(state.series, state.gym)
  3931 |     });
  3932 |     if (!extraEncounterValidation.ok) {
  3933 |       alert(extraEncounterValidation.reason);
  3934 |       return null;
  3935 |     }
  3936 |   }
  3937 |   if (metadata.id === "substitute") {
  3938 |     const legality = controlTokenDraftLegality(draft, metadata);
  3939 |     if (!legality.ok) {
```


#### Hit 4 — line 3982

```text
  3970 |   }
  3971 |   const consumedToken = consumed?.token || { id: "", name: draft.tokenName };
  3972 |   const now = new Date().toISOString();
  3973 |   const details = [
  3974 |     `Token: ${consumedToken.name || draft.tokenName}`,
  3975 |     `Timing: ${(timingCheck.windows || []).join(", ") || "manual"}`,
  3976 |     `Pattern: ${metadata.activationPattern || "manual"}`
  3977 |   ];
  3978 |   const statusIds = [];
  3979 |   let encounterSessionId = "";
  3980 |   let result = "resolved";
  3981 |   if (metadata.resolverId === "extraEncounter") {
  3982 |     const grant = encounterTokenRuntime.grantExtraEncounter(state, {
  3983 |       playerId: extraEncounterValidation.player.id,
  3984 |       sourceTokenId: consumedToken.id || "",
  3985 |       sourceActivationId: consumedToken.id || ""
  3986 |     }, {
  3987 |       wheelDefinition: extraEncounterValidation.wheel,
  3988 |       now
  3989 |     });
  3990 |     if (!grant.ok || !grant.session) {
  3991 |       restoreTokenEffectContractUndoData(rollbackSnapshot);
  3992 |       alert(grant.reason || "The extra Encounter session could not be created. The Token was not consumed.");
  3993 |       return null;
  3994 |     }
```


### metadata.resolverId === "extraEncounter"

Occurrences: 3

#### Hit 1 — line 3926

```text
  3914 |   state.effectAuditRecords.unshift(record);
  3915 |   return record;
  3916 | }
  3917 | 
  3918 | async function resolveImmediateTokenUse(draft, { context = {} } = {}) {
  3919 |   const metadata = tokenEffectMetadataByName(draft.tokenName);
  3920 |   const timingCheck = tokenUseTimingCheck({ player: draft.actor, tokenName: draft.tokenName, metadata, context });
  3921 |   if (!timingCheck.ok) {
  3922 |     alert(timingCheck.reason);
  3923 |     return null;
  3924 |   }
  3925 |   let extraEncounterValidation = null;
  3926 |   if (metadata.resolverId === "extraEncounter") {
  3927 |     extraEncounterValidation = encounterTokenRuntime.validateExtraEncounter(state, {
  3928 |       playerId: draft.targetPlayerId
  3929 |     }, {
  3930 |       wheelDefinition: encounterWheelDefinition(state.series, state.gym)
  3931 |     });
  3932 |     if (!extraEncounterValidation.ok) {
  3933 |       alert(extraEncounterValidation.reason);
  3934 |       return null;
  3935 |     }
  3936 |   }
  3937 |   if (metadata.id === "substitute") {
  3938 |     const legality = controlTokenDraftLegality(draft, metadata);
```


#### Hit 2 — line 3981

```text
  3969 |     return null;
  3970 |   }
  3971 |   const consumedToken = consumed?.token || { id: "", name: draft.tokenName };
  3972 |   const now = new Date().toISOString();
  3973 |   const details = [
  3974 |     `Token: ${consumedToken.name || draft.tokenName}`,
  3975 |     `Timing: ${(timingCheck.windows || []).join(", ") || "manual"}`,
  3976 |     `Pattern: ${metadata.activationPattern || "manual"}`
  3977 |   ];
  3978 |   const statusIds = [];
  3979 |   let encounterSessionId = "";
  3980 |   let result = "resolved";
  3981 |   if (metadata.resolverId === "extraEncounter") {
  3982 |     const grant = encounterTokenRuntime.grantExtraEncounter(state, {
  3983 |       playerId: extraEncounterValidation.player.id,
  3984 |       sourceTokenId: consumedToken.id || "",
  3985 |       sourceActivationId: consumedToken.id || ""
  3986 |     }, {
  3987 |       wheelDefinition: extraEncounterValidation.wheel,
  3988 |       now
  3989 |     });
  3990 |     if (!grant.ok || !grant.session) {
  3991 |       restoreTokenEffectContractUndoData(rollbackSnapshot);
  3992 |       alert(grant.reason || "The extra Encounter session could not be created. The Token was not consumed.");
  3993 |       return null;
```


#### Hit 3 — line 4119

```text
  4107 |       pendingEventId: "",
  4108 |       timestamp: now
  4109 |     },
  4110 |     undoable: true,
  4111 |     undone: false,
  4112 |     undoData: {
  4113 |       actionType: "undoUtilityTokenActivation",
  4114 |       activationId: activation.id,
  4115 |       ...rollbackSnapshot
  4116 |     }
  4117 |   });
  4118 |   resolutionAudit.undoLogId = resolutionLog?.id || "";
  4119 |   const outcomeTitle = metadata.resolverId === "extraEncounter"
  4120 |       ? `Extra Encounter ready for ${extraEncounterValidation?.player?.name || "the chosen player"}.`
  4121 |     : metadata.resolverId === "safeguard"
  4122 |       ? "Safeguard active."
  4123 |       : metadata.resolverId === "substituteAttach"
  4124 |         ? "Substitute attached."
  4125 |         : `${consumedToken.name || draft.tokenName} resolved.`;
  4126 |   const immediateActivity = {
  4127 |     id: activation.id,
  4128 |     title: consumedToken.name || draft.tokenName,
  4129 |     actorPlayerId: draft.actorPlayerId,
  4130 |     targetPlayerId: draft.targetPlayerId || findPokemonRecord(draft.targetPokemonId)?.trainerId || "",
  4131 |     responses: [],
```


### V2_ROUTE_TOKEN_IDS

Occurrences: 20

#### Hit 1 — line 43924

```text
 43912 |   Object.freeze({ id: "loaded", label: "Loaded", weight: 5, shift: 2 })
 43913 | ]);
 43914 | const V2_ROUTE_ACTION_TYPE = "route-exploration";
 43915 | const V2_EXTRA_ENCOUNTER_PRICE = 2500;
 43916 | const V2_REPEL_SUPPRESSION_COUNT = 5;
 43917 | const V2_TYPE_INJECTION_COUNT = 4;
 43918 | const V2_TYPE_INJECTION_MAX_TIER_ID = "master";
 43919 | const V2_TYPE_INJECTION_TIER_ROLLS = Object.freeze([
 43920 |   Object.freeze({ id: "base-or-lower", label: "Route natural tier or lower", weight: 75, offset: 0, baseOrLower: true }),
 43921 |   Object.freeze({ id: "plus-1", label: "+1 tier", weight: 20, offset: 1 }),
 43922 |   Object.freeze({ id: "plus-2", label: "+2 tiers", weight: 5, offset: 2 })
 43923 | ]);
 43924 | const V2_ROUTE_TOKEN_IDS = Object.freeze({
 43925 |   extraEncounter: "extra-encounter-token",
 43926 |   reroll: "reroll-token",
 43927 |   repel: "repel-token",
 43928 |   masterBall: "master-ball-token"
 43929 | });
 43930 | const V2_ROUTE_TOKEN_NAMES = Object.freeze({
 43931 |   [V2_ROUTE_TOKEN_IDS.extraEncounter]: ["extra encounter token", "extra encounter"],
 43932 |   [V2_ROUTE_TOKEN_IDS.reroll]: ["reroll token", "reroll"],
 43933 |   [V2_ROUTE_TOKEN_IDS.repel]: ["repel token", "repel"],
 43934 |   [V2_ROUTE_TOKEN_IDS.masterBall]: ["master ball token", "master ball"]
 43935 | });
 43936 | 
```


#### Hit 2 — line 43931

```text
 43919 | const V2_TYPE_INJECTION_TIER_ROLLS = Object.freeze([
 43920 |   Object.freeze({ id: "base-or-lower", label: "Route natural tier or lower", weight: 75, offset: 0, baseOrLower: true }),
 43921 |   Object.freeze({ id: "plus-1", label: "+1 tier", weight: 20, offset: 1 }),
 43922 |   Object.freeze({ id: "plus-2", label: "+2 tiers", weight: 5, offset: 2 })
 43923 | ]);
 43924 | const V2_ROUTE_TOKEN_IDS = Object.freeze({
 43925 |   extraEncounter: "extra-encounter-token",
 43926 |   reroll: "reroll-token",
 43927 |   repel: "repel-token",
 43928 |   masterBall: "master-ball-token"
 43929 | });
 43930 | const V2_ROUTE_TOKEN_NAMES = Object.freeze({
 43931 |   [V2_ROUTE_TOKEN_IDS.extraEncounter]: ["extra encounter token", "extra encounter"],
 43932 |   [V2_ROUTE_TOKEN_IDS.reroll]: ["reroll token", "reroll"],
 43933 |   [V2_ROUTE_TOKEN_IDS.repel]: ["repel token", "repel"],
 43934 |   [V2_ROUTE_TOKEN_IDS.masterBall]: ["master ball token", "master ball"]
 43935 | });
 43936 | 
 43937 | function activeActionPhaseVersion() {
 43938 |   return normalizeActionPhaseVersion(state.ruleset?.actionPhaseVersion || state.actionPhaseVersion || DEFAULT_ACTION_PHASE_VERSION);
 43939 | }
 43940 | 
 43941 | function v2Text(value, fallback = "") {
 43942 |   const normalized = String(value ?? "").trim();
 43943 |   return normalized || fallback;
```


#### Hit 3 — line 43932

```text
 43920 |   Object.freeze({ id: "base-or-lower", label: "Route natural tier or lower", weight: 75, offset: 0, baseOrLower: true }),
 43921 |   Object.freeze({ id: "plus-1", label: "+1 tier", weight: 20, offset: 1 }),
 43922 |   Object.freeze({ id: "plus-2", label: "+2 tiers", weight: 5, offset: 2 })
 43923 | ]);
 43924 | const V2_ROUTE_TOKEN_IDS = Object.freeze({
 43925 |   extraEncounter: "extra-encounter-token",
 43926 |   reroll: "reroll-token",
 43927 |   repel: "repel-token",
 43928 |   masterBall: "master-ball-token"
 43929 | });
 43930 | const V2_ROUTE_TOKEN_NAMES = Object.freeze({
 43931 |   [V2_ROUTE_TOKEN_IDS.extraEncounter]: ["extra encounter token", "extra encounter"],
 43932 |   [V2_ROUTE_TOKEN_IDS.reroll]: ["reroll token", "reroll"],
 43933 |   [V2_ROUTE_TOKEN_IDS.repel]: ["repel token", "repel"],
 43934 |   [V2_ROUTE_TOKEN_IDS.masterBall]: ["master ball token", "master ball"]
 43935 | });
 43936 | 
 43937 | function activeActionPhaseVersion() {
 43938 |   return normalizeActionPhaseVersion(state.ruleset?.actionPhaseVersion || state.actionPhaseVersion || DEFAULT_ACTION_PHASE_VERSION);
 43939 | }
 43940 | 
 43941 | function v2Text(value, fallback = "") {
 43942 |   const normalized = String(value ?? "").trim();
 43943 |   return normalized || fallback;
 43944 | }
```


#### Hit 4 — line 43933

```text
 43921 |   Object.freeze({ id: "plus-1", label: "+1 tier", weight: 20, offset: 1 }),
 43922 |   Object.freeze({ id: "plus-2", label: "+2 tiers", weight: 5, offset: 2 })
 43923 | ]);
 43924 | const V2_ROUTE_TOKEN_IDS = Object.freeze({
 43925 |   extraEncounter: "extra-encounter-token",
 43926 |   reroll: "reroll-token",
 43927 |   repel: "repel-token",
 43928 |   masterBall: "master-ball-token"
 43929 | });
 43930 | const V2_ROUTE_TOKEN_NAMES = Object.freeze({
 43931 |   [V2_ROUTE_TOKEN_IDS.extraEncounter]: ["extra encounter token", "extra encounter"],
 43932 |   [V2_ROUTE_TOKEN_IDS.reroll]: ["reroll token", "reroll"],
 43933 |   [V2_ROUTE_TOKEN_IDS.repel]: ["repel token", "repel"],
 43934 |   [V2_ROUTE_TOKEN_IDS.masterBall]: ["master ball token", "master ball"]
 43935 | });
 43936 | 
 43937 | function activeActionPhaseVersion() {
 43938 |   return normalizeActionPhaseVersion(state.ruleset?.actionPhaseVersion || state.actionPhaseVersion || DEFAULT_ACTION_PHASE_VERSION);
 43939 | }
 43940 | 
 43941 | function v2Text(value, fallback = "") {
 43942 |   const normalized = String(value ?? "").trim();
 43943 |   return normalized || fallback;
 43944 | }
 43945 | 
```


#### Hit 5 — line 43934

```text
 43922 |   Object.freeze({ id: "plus-2", label: "+2 tiers", weight: 5, offset: 2 })
 43923 | ]);
 43924 | const V2_ROUTE_TOKEN_IDS = Object.freeze({
 43925 |   extraEncounter: "extra-encounter-token",
 43926 |   reroll: "reroll-token",
 43927 |   repel: "repel-token",
 43928 |   masterBall: "master-ball-token"
 43929 | });
 43930 | const V2_ROUTE_TOKEN_NAMES = Object.freeze({
 43931 |   [V2_ROUTE_TOKEN_IDS.extraEncounter]: ["extra encounter token", "extra encounter"],
 43932 |   [V2_ROUTE_TOKEN_IDS.reroll]: ["reroll token", "reroll"],
 43933 |   [V2_ROUTE_TOKEN_IDS.repel]: ["repel token", "repel"],
 43934 |   [V2_ROUTE_TOKEN_IDS.masterBall]: ["master ball token", "master ball"]
 43935 | });
 43936 | 
 43937 | function activeActionPhaseVersion() {
 43938 |   return normalizeActionPhaseVersion(state.ruleset?.actionPhaseVersion || state.actionPhaseVersion || DEFAULT_ACTION_PHASE_VERSION);
 43939 | }
 43940 | 
 43941 | function v2Text(value, fallback = "") {
 43942 |   const normalized = String(value ?? "").trim();
 43943 |   return normalized || fallback;
 43944 | }
 43945 | 
 43946 | function v2Slugify(value) {
```


#### Hit 6 — line 45274

```text
 45262 |         duplicateEnabled: preference.enabled,
 45263 |         defaulted: preference.defaulted
 45264 |       };
 45265 |     });
 45266 | }
 45267 | 
 45268 | function getEncounterCapabilitiesForPlayer(result, playerId) {
 45269 |   const player = state.players.find((entry) => entry.id === playerId);
 45270 |   const routeState = v2EnsureRouteSeriesState(state.series);
 45271 |   const { route } = v2FindResult(routeState, result?.resultId);
 45272 |   const unresolved = Boolean(result && result.status === "unresolved");
 45273 |   const routeView = route ? getRouteViewForPlayer(routeState, route.routeNumber, playerId) : null;
 45274 |   const rerollTokens = v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.reroll);
 45275 |   const duplicate = unresolved && v2ResultIsDuplicateForPlayer(result, playerId);
 45276 |   return {
 45277 |     canAcquire: unresolved,
 45278 |     canPersonalDuplicateReroll: duplicate,
 45279 |     personalDuplicateRerollReason: duplicate ? "" : "Encounter is not a duplicate for this player.",
 45280 |     canUseRerollToken: unresolved && rerollTokens.length > 0,
 45281 |     rerollTokenInventoryIds: rerollTokens.map((token) => token.id),
 45282 |     rerollTokenBlockReason: !unresolved ? "Encounter is already resolved." : rerollTokens.length ? "" : "No Reroll Token available.",
 45283 |     canUseMasterBall: false,
 45284 |     masterBallEligibleResidents: routeView?.masterBallEligibleResidents || [],
 45285 |     routeNumber: Number(result?.routeNumber || route?.routeNumber || 0),
 45286 |     currentRevision: v2CurrentResultRevision(result),
```


#### Hit 7 — line 45307

```text
 45295 |       opportunityId: opportunity.opportunityId,
 45296 |       routeId: route.routeId,
 45297 |       routeNumber: route.routeNumber,
 45298 |       kind: opportunity.kind || "",
 45299 |       sourceKind: opportunity.source?.kind || "",
 45300 |       createdRevision: Number(opportunity.createdRevision || 0)
 45301 |     })));
 45302 | }
 45303 | 
 45304 | function getMasterBallOpportunityCapabilitiesForPlayer(routeState, opportunityId, playerId) {
 45305 |   const player = state.players.find((entry) => entry.id === playerId);
 45306 |   const { route, opportunity } = v2FindOpportunity(routeState, opportunityId);
 45307 |   const tokens = v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.masterBall);
 45308 |   const view = route ? getRouteViewForPlayer(routeState, route.routeNumber, playerId) : null;
 45309 |   const eligibleResidents = view?.masterBallEligibleResidents || [];
 45310 |   const canUseMasterBall = Boolean(
 45311 |     player
 45312 |     && route
 45313 |     && opportunity
 45314 |     && opportunity.status === "pending"
 45315 |     && opportunity.playerId === playerId
 45316 |     && tokens.length
 45317 |     && eligibleResidents.length
 45318 |   );
 45319 |   return {
```


#### Hit 8 — line 45339

```text
 45327 |         : !route || !opportunity ? "Pending opportunity not found."
 45328 |           : opportunity.status !== "pending" ? "Opportunity is already resolved."
 45329 |             : opportunity.playerId !== playerId ? "Opportunity belongs to another player."
 45330 |               : !tokens.length ? "No Master Ball Token available."
 45331 |                 : "No known Route residents are eligible."
 45332 |     )
 45333 |   };
 45334 | }
 45335 | 
 45336 | function getRouteRepelCapabilitiesForPlayer(routeState, routeNumber, playerId) {
 45337 |   const route = v2FindRoute(routeState, routeNumber);
 45338 |   const player = state.players.find((entry) => entry.id === playerId);
 45339 |   const repelTokens = v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.repel);
 45340 |   const activeSuppressed = new Set((route?.suppressions || [])
 45341 |     .filter((entry) => entry.status !== "expired" && entry.status !== "removed")
 45342 |     .flatMap((entry) => entry.residentIds || []));
 45343 |   const tiers = new Map();
 45344 |   (route?.residents || [])
 45345 |     .filter((resident) => resident.permanent !== false)
 45346 |     .forEach((resident) => {
 45347 |       const tierId = normalizeBalanceTierId(resident.battleTier?.id);
 45348 |       if (!tierId) return;
 45349 |       if (!tiers.has(tierId)) {
 45350 |         tiers.set(tierId, {
 45351 |           tierId,
```


#### Hit 9 — line 45508

```text
 45496 |   if (existingRequest?.inventoryRecordId) return player.inventory?.find((item) => item.id === existingRequest.inventoryRecordId) || null;
 45497 |   if (Number(player.balance || 0) < V2_EXTRA_ENCOUNTER_PRICE) throw new Error("Insufficient funds for Extra Encounter.");
 45498 |   const purchaseId = `v2-extra-encounter-purchase-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
 45499 |   const moneyChange = applyPlayerMoneyChange(player, -V2_EXTRA_ENCOUNTER_PRICE, {
 45500 |     direction: "spend",
 45501 |     sourceType: "v2-extra-encounter-purchase",
 45502 |     sourceLabel: "Extra Encounter",
 45503 |     note: "V2 Route Extra Encounter purchase",
 45504 |     breakdown: { purchaseId, price: V2_EXTRA_ENCOUNTER_PRICE }
 45505 |   });
 45506 |   const item = {
 45507 |     purchaseId,
 45508 |     id: createInventoryEntryId(V2_ROUTE_TOKEN_IDS.extraEncounter),
 45509 |     catalogId: V2_ROUTE_TOKEN_IDS.extraEncounter,
 45510 |     canonicalId: V2_ROUTE_TOKEN_IDS.extraEncounter,
 45511 |     name: "Extra Encounter Token",
 45512 |     type: "TOKEN",
 45513 |     tokenType: "encounter",
 45514 |     tier: "Encounter",
 45515 |     price: V2_EXTRA_ENCOUNTER_PRICE,
 45516 |     description: "Use in V2 Route Action Phase for one stored extra Route encounter.",
 45517 |     purchasedAt: new Date().toISOString(),
 45518 |     v2RouteMetadata: { kind: "extra-encounter", purchaseId, moneyLedgerEntryId: moneyChange.ledgerEntry?.id || "" }
 45519 |   };
 45520 |   player.inventory ||= [];
```


#### Hit 10 — line 45509

```text
 45497 |   if (Number(player.balance || 0) < V2_EXTRA_ENCOUNTER_PRICE) throw new Error("Insufficient funds for Extra Encounter.");
 45498 |   const purchaseId = `v2-extra-encounter-purchase-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
 45499 |   const moneyChange = applyPlayerMoneyChange(player, -V2_EXTRA_ENCOUNTER_PRICE, {
 45500 |     direction: "spend",
 45501 |     sourceType: "v2-extra-encounter-purchase",
 45502 |     sourceLabel: "Extra Encounter",
 45503 |     note: "V2 Route Extra Encounter purchase",
 45504 |     breakdown: { purchaseId, price: V2_EXTRA_ENCOUNTER_PRICE }
 45505 |   });
 45506 |   const item = {
 45507 |     purchaseId,
 45508 |     id: createInventoryEntryId(V2_ROUTE_TOKEN_IDS.extraEncounter),
 45509 |     catalogId: V2_ROUTE_TOKEN_IDS.extraEncounter,
 45510 |     canonicalId: V2_ROUTE_TOKEN_IDS.extraEncounter,
 45511 |     name: "Extra Encounter Token",
 45512 |     type: "TOKEN",
 45513 |     tokenType: "encounter",
 45514 |     tier: "Encounter",
 45515 |     price: V2_EXTRA_ENCOUNTER_PRICE,
 45516 |     description: "Use in V2 Route Action Phase for one stored extra Route encounter.",
 45517 |     purchasedAt: new Date().toISOString(),
 45518 |     v2RouteMetadata: { kind: "extra-encounter", purchaseId, moneyLedgerEntryId: moneyChange.ledgerEntry?.id || "" }
 45519 |   };
 45520 |   player.inventory ||= [];
 45521 |   player.inventory.unshift(item);
```


#### Hit 11 — line 45510

```text
 45498 |   const purchaseId = `v2-extra-encounter-purchase-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
 45499 |   const moneyChange = applyPlayerMoneyChange(player, -V2_EXTRA_ENCOUNTER_PRICE, {
 45500 |     direction: "spend",
 45501 |     sourceType: "v2-extra-encounter-purchase",
 45502 |     sourceLabel: "Extra Encounter",
 45503 |     note: "V2 Route Extra Encounter purchase",
 45504 |     breakdown: { purchaseId, price: V2_EXTRA_ENCOUNTER_PRICE }
 45505 |   });
 45506 |   const item = {
 45507 |     purchaseId,
 45508 |     id: createInventoryEntryId(V2_ROUTE_TOKEN_IDS.extraEncounter),
 45509 |     catalogId: V2_ROUTE_TOKEN_IDS.extraEncounter,
 45510 |     canonicalId: V2_ROUTE_TOKEN_IDS.extraEncounter,
 45511 |     name: "Extra Encounter Token",
 45512 |     type: "TOKEN",
 45513 |     tokenType: "encounter",
 45514 |     tier: "Encounter",
 45515 |     price: V2_EXTRA_ENCOUNTER_PRICE,
 45516 |     description: "Use in V2 Route Action Phase for one stored extra Route encounter.",
 45517 |     purchasedAt: new Date().toISOString(),
 45518 |     v2RouteMetadata: { kind: "extra-encounter", purchaseId, moneyLedgerEntryId: moneyChange.ledgerEntry?.id || "" }
 45519 |   };
 45520 |   player.inventory ||= [];
 45521 |   player.inventory.unshift(item);
 45522 |   const record = {
```


#### Hit 12 — line 45562

```text
 45550 |   const route = v2FindRoute(routeState, routeNumber);
 45551 |   if (!route) throw new Error(`Route ${routeNumber} does not exist.`);
 45552 |   if (Number(routeNumber) > v2CurrentProgressionRoute()) throw new Error("Extra Encounter cannot target a Route above current progression.");
 45553 |   const key = v2Text(options.idempotencyKey);
 45554 |   const existingRequest = key ? state.v2?.routeOperationRequests?.[key] : null;
 45555 |   if (existingRequest?.operationId) return v2FindRouteEffectOperation(state.series, existingRequest.operationId);
 45556 |   const existingTokenOperation = v2FindRouteEffectOperationByToken(state.series, "extra-encounter-token", tokenInventoryId, playerId);
 45557 |   if (existingTokenOperation) return existingTokenOperation;
 45558 |   const eligibleResidents = v2EligibleResidents(route, [], { routeState, playerId });
 45559 |   if (!eligibleResidents.length || !v2RouteHasPositiveEncounterWeight(eligibleResidents)) {
 45560 |     throw new Error(`No eligible residents remain on Route ${route.routeNumber} for ${player.name}.`);
 45561 |   }
 45562 |   const token = v2ConsumeExactRouteToken(player, V2_ROUTE_TOKEN_IDS.extraEncounter, tokenInventoryId);
 45563 |   const operationId = v2NextEffectOperationId(state.series, "v2-extra-encounter");
 45564 |   const { opportunity } = v2CreateRouteEncounterOpportunity({
 45565 |     playerId,
 45566 |     routeNumber,
 45567 |     kind: "extra-encounter-token",
 45568 |     currentProgressionRoute: v2CurrentProgressionRoute(),
 45569 |     source: { kind: "extra-encounter-token", operationId, tokenInventoryId: token.id, purchasePrice: V2_EXTRA_ENCOUNTER_PRICE }
 45570 |   });
 45571 |   const operation = {
 45572 |     operationId,
 45573 |     actionId: operationId,
 45574 |     type: "extra-encounter-token",
```


#### Hit 13 — line 45611

```text
 45599 | function v2UseRerollTokenOnAction(actionId, tokenInventoryId, options = {}) {
 45600 |   const actionPhase = v2EnsureActionPhase(state.series);
 45601 |   const record = v2FindRouteActionOrOperation(actionPhase, state.series, actionId);
 45602 |   if (!record?.resultId) throw new Error("Choose an unresolved V2 Route result before using Reroll.");
 45603 |   v2AssertRouteActor(record, options.actingPlayerId, "V2 Route Reroll");
 45604 |   const player = state.players.find((entry) => entry.id === record.playerId) || activePlayer();
 45605 |   const result = v2FindResult(v2EnsureRouteSeriesState(state.series), record.resultId).result;
 45606 |   const key = v2Text(options.idempotencyKey);
 45607 |   const existingRequest = key ? state.v2?.routeOperationRequests?.[key] : null;
 45608 |   if (existingRequest?.resultId && result?.resultId === existingRequest.resultId) return result;
 45609 |   const existingTokenOperation = v2FindRouteEffectOperationByToken(state.series, "reroll-token", tokenInventoryId, player.id);
 45610 |   if (existingTokenOperation?.resultId === result?.resultId) return result;
 45611 |   const token = v2ConsumeExactRouteToken(player, V2_ROUTE_TOKEN_IDS.reroll, tokenInventoryId);
 45612 |   const rerolled = v2RerollRouteResult(result, player.id, { kind: "reroll-token", reason: "reroll-token", tokenInventoryId: token.id }, { token });
 45613 |   const operationId = v2NextEffectOperationId(state.series, "v2-reroll-token");
 45614 |   const operation = {
 45615 |     operationId,
 45616 |     type: "reroll-token",
 45617 |     status: "resolved",
 45618 |     playerId: player.id,
 45619 |     seriesId: state.series,
 45620 |     routeNumber: record.routeNumber,
 45621 |     resultId: result.resultId,
 45622 |     tokenInventoryId: token.id,
 45623 |     consumedToken: structuredClone(token),
```


#### Hit 14 — line 45650

```text
 45638 |   const alreadySuppressed = new Set((route.suppressions || [])
 45639 |     .filter((entry) => entry.status !== "expired" && entry.status !== "removed")
 45640 |     .flatMap((entry) => entry.residentIds || []));
 45641 |   const candidates = (route.residents || []).filter((resident) => resident.battleTier?.id === normalizedTier && !alreadySuppressed.has(resident.residentId));
 45642 |   if (candidates.length < V2_REPEL_SUPPRESSION_COUNT) {
 45643 |     throw new Error(`Route ${routeNumber} has only ${candidates.length} unsuppressed ${formatPokemonBalanceTierLabel(normalizedTier)} residents; Repel requires exactly ${V2_REPEL_SUPPRESSION_COUNT}.`);
 45644 |   }
 45645 |   const key = v2Text(options.idempotencyKey);
 45646 |   const existingRequest = key ? state.v2?.routeOperationRequests?.[key] : null;
 45647 |   if (existingRequest?.suppressionId) return (route.suppressions || []).find((entry) => entry.suppressionId === existingRequest.suppressionId) || null;
 45648 |   const existingTokenOperation = v2FindRouteEffectOperationByToken(state.series, "repel-token", tokenInventoryId, playerId);
 45649 |   if (existingTokenOperation?.suppressionId) return (route.suppressions || []).find((entry) => entry.suppressionId === existingTokenOperation.suppressionId) || null;
 45650 |   const token = v2ConsumeExactRouteToken(player, V2_ROUTE_TOKEN_IDS.repel, tokenInventoryId);
 45651 |   const rng = v2CreateRng(`${routeState.seed}:${route.routeId}:repel:${normalizedTier}:${routeState.revision}`);
 45652 |   const pool = [...candidates];
 45653 |   const selected = [];
 45654 |   while (selected.length < V2_REPEL_SUPPRESSION_COUNT) {
 45655 |     const resident = v2Choice(pool, rng);
 45656 |     selected.push(resident);
 45657 |     pool.splice(pool.indexOf(resident), 1);
 45658 |   }
 45659 |   const suppression = {
 45660 |     suppressionId: v2NextCounterId(routeState, "suppression", "route-suppression"),
 45661 |     routeId: route.routeId,
 45662 |     battleTierId: normalizedTier,
```


#### Hit 15 — line 45712

```text
 45700 |   if (opportunity.playerId !== playerId) throw new Error("Master Ball can only resolve this player's pending opportunity.");
 45701 |   const key = v2Text(options.idempotencyKey);
 45702 |   const existingRequest = key ? state.v2?.routeOperationRequests?.[key] : null;
 45703 |   if (existingRequest?.operationId) return v2FindRouteEffectOperation(state.series, existingRequest.operationId);
 45704 |   const existingTokenOperation = v2FindRouteEffectOperationByToken(state.series, "master-ball-token", tokenInventoryId, playerId);
 45705 |   if (existingTokenOperation?.opportunityId === opportunityId) return existingTokenOperation;
 45706 |   if (opportunity.status !== "pending") throw new Error("Master Ball opportunity is not pending.");
 45707 |   const view = getRouteViewForPlayer(routeState, route.routeNumber, playerId);
 45708 |   const resident = (route.residents || []).find((entry) => entry.residentId === residentId);
 45709 |   if (!resident || !(view.masterBallEligibleResidents || []).some((entry) => entry.residentId === residentId)) {
 45710 |     throw new Error("Master Ball can only select a resident revealed to that player on that Route.");
 45711 |   }
 45712 |   const token = v2ConsumeExactRouteToken(player, V2_ROUTE_TOKEN_IDS.masterBall, tokenInventoryId);
 45713 |   const resultId = v2NextCounterId(routeState, "result", "route-result");
 45714 |   const result = {
 45715 |     resultId,
 45716 |     status: "unresolved",
 45717 |     playerId,
 45718 |     routeId: route.routeId,
 45719 |     routeNumber: route.routeNumber,
 45720 |     opportunityId,
 45721 |     currentRevision: 1,
 45722 |     revisions: [v2ResultRevisionFromResident(resident, 1, "master-ball-selection", { kind: "master-ball-token", tokenInventoryId: token.id })],
 45723 |     publicDiscoveryEvents: [],
 45724 |     finalizedAcquisitionId: "",
```


#### Hit 16 — line 46218

```text
 46206 | function rerollV2RouteAction(actionId) {
 46207 |   try {
 46208 |     const result = v2RerollRouteActionResult(actionId, { actingPlayerId: activePlayer().id });
 46209 |     v2PersistRenderAndPublishRouteActivity({ stage: "rerolled", actorPlayerId: activePlayer().id, seriesId: state.series, routeNumber: result.routeNumber });
 46210 |   } catch (error) {
 46211 |     alert(error.message || "Unable to reroll V2 Route encounter.");
 46212 |   }
 46213 | }
 46214 | 
 46215 | function useV2RouteRerollToken(actionId, tokenInventoryId = "") {
 46216 |   try {
 46217 |     const player = activePlayer();
 46218 |     const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.reroll)[0]?.id || "";
 46219 |     const result = v2UseRerollTokenOnAction(actionId, tokenId, { actingPlayerId: player.id });
 46220 |     v2PersistRenderAndPublishRouteActivity({ stage: "rerolled", actorPlayerId: player.id, seriesId: state.series, routeNumber: result.routeNumber });
 46221 |   } catch (error) {
 46222 |     alert(error.message || "Unable to use V2 Reroll Token.");
 46223 |   }
 46224 | }
 46225 | 
 46226 | function purchaseV2ExtraEncounter() {
 46227 |   try {
 46228 |     v2PurchaseExtraEncounter(activePlayer().id);
 46229 |     v2PersistAndRender();
 46230 |   } catch (error) {
```


#### Hit 17 — line 46238

```text
 46226 | function purchaseV2ExtraEncounter() {
 46227 |   try {
 46228 |     v2PurchaseExtraEncounter(activePlayer().id);
 46229 |     v2PersistAndRender();
 46230 |   } catch (error) {
 46231 |     alert(error.message || "Unable to purchase Extra Encounter.");
 46232 |   }
 46233 | }
 46234 | 
 46235 | function useV2ExtraEncounter(routeNumber, tokenInventoryId = "") {
 46236 |   try {
 46237 |     const player = activePlayer();
 46238 |     const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.extraEncounter)[0]?.id || "";
 46239 |     const operation = v2UseExtraEncounter(player.id, routeNumber, tokenId);
 46240 |     const workspace = v2RouteWorkspaceState(state.series);
 46241 |     workspace.screen = "result";
 46242 |     workspace.selectedActionId = "extra-encounter";
 46243 |     workspace.selectedRouteNumber = Number(routeNumber);
 46244 |     workspace.activeActionId = operation.operationId;
 46245 |     state.routeUiState = normalizeRouteUiState(state.routeUiState);
 46246 |     state.routeUiState.activeRouteActionIdBySeriesId[state.series] = operation.operationId;
 46247 |     v2PersistRenderAndPublishRouteActivity({ stage: "encountered", actorPlayerId: player.id, seriesId: state.series, routeNumber });
 46248 |   } catch (error) {
 46249 |     alert(error.message || "Unable to use Extra Encounter.");
 46250 |   }
```


#### Hit 18 — line 46256

```text
 46244 |     workspace.activeActionId = operation.operationId;
 46245 |     state.routeUiState = normalizeRouteUiState(state.routeUiState);
 46246 |     state.routeUiState.activeRouteActionIdBySeriesId[state.series] = operation.operationId;
 46247 |     v2PersistRenderAndPublishRouteActivity({ stage: "encountered", actorPlayerId: player.id, seriesId: state.series, routeNumber });
 46248 |   } catch (error) {
 46249 |     alert(error.message || "Unable to use Extra Encounter.");
 46250 |   }
 46251 | }
 46252 | 
 46253 | function applyV2RouteRepel(routeNumber, battleTierId, tokenInventoryId = "") {
 46254 |   try {
 46255 |     const player = activePlayer();
 46256 |     const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.repel)[0]?.id || "";
 46257 |     v2ApplyRepelToRoute(player.id, routeNumber, battleTierId, tokenId);
 46258 |     v2PersistAndRender();
 46259 |   } catch (error) {
 46260 |     alert(error.message || "Unable to apply V2 Repel.");
 46261 |   }
 46262 | }
 46263 | 
 46264 | function useV2MasterBallOnOpportunity(opportunityId, residentId, tokenInventoryId = "") {
 46265 |   try {
 46266 |     const player = activePlayer();
 46267 |     const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.masterBall)[0]?.id || "";
 46268 |     const operation = v2UseMasterBallOnOpportunity(player.id, opportunityId, residentId, tokenId);
```


#### Hit 19 — line 46267

```text
 46255 |     const player = activePlayer();
 46256 |     const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.repel)[0]?.id || "";
 46257 |     v2ApplyRepelToRoute(player.id, routeNumber, battleTierId, tokenId);
 46258 |     v2PersistAndRender();
 46259 |   } catch (error) {
 46260 |     alert(error.message || "Unable to apply V2 Repel.");
 46261 |   }
 46262 | }
 46263 | 
 46264 | function useV2MasterBallOnOpportunity(opportunityId, residentId, tokenInventoryId = "") {
 46265 |   try {
 46266 |     const player = activePlayer();
 46267 |     const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.masterBall)[0]?.id || "";
 46268 |     const operation = v2UseMasterBallOnOpportunity(player.id, opportunityId, residentId, tokenId);
 46269 |     const workspace = v2RouteWorkspaceState(state.series);
 46270 |     workspace.screen = "result";
 46271 |     workspace.selectedActionId = "encounter";
 46272 |     workspace.selectedRouteNumber = operation.routeNumber;
 46273 |     workspace.activeActionId = operation.operationId;
 46274 |     workspace.activeOpportunityId = "";
 46275 |     state.routeUiState = normalizeRouteUiState(state.routeUiState);
 46276 |     state.routeUiState.activeRouteActionIdBySeriesId[state.series] = operation.operationId;
 46277 |     v2PersistRenderAndPublishRouteActivity({ stage: "encountered", actorPlayerId: player.id, seriesId: state.series, routeNumber: operation.routeNumber });
 46278 |   } catch (error) {
 46279 |     alert(error.message || "Unable to use V2 Master Ball.");
```


#### Hit 20 — line 46457

```text
 46445 | function getRouteEncounterRailCapabilitiesForPlayer(routeState, routeNumber, playerId) {
 46446 |   const route = v2FindRoute(routeState, routeNumber);
 46447 |   const player = state.players.find((entry) => entry.id === playerId);
 46448 |   if (!route || !player) {
 46449 |     return {
 46450 |       extra: { storedCount: 0, canBuy: false, canUse: false, tokenId: "", blockReason: "Route or player not found." },
 46451 |       typeInjection: { canInject: false, options: [], opportunityId: "" },
 46452 |       effects: []
 46453 |     };
 46454 |   }
 46455 |   const workspace = v2RouteWorkspaceState(routeState.seriesId || state.series);
 46456 |   const pendingOpportunity = v2RoutePendingOpportunityForPlayer(routeState, route.routeNumber, playerId, workspace.activeOpportunityId);
 46457 |   const extraTokens = v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.extraEncounter);
 46458 |   const extraEligible = v2EligibleResidents(route, [], { routeState, playerId });
 46459 |   const progressionLegal = route.routeNumber <= v2CurrentProgressionRoute();
 46460 |   const extraCanUse = progressionLegal
 46461 |     && !pendingOpportunity
 46462 |     && extraTokens.length
 46463 |     && extraEligible.length
 46464 |     && v2RouteHasPositiveEncounterWeight(extraEligible);
 46465 |   const injectionOptions = v2TemporaryInjectionOptionsForOpportunity(routeState, pendingOpportunity, playerId);
 46466 |   const injectionFallbackOptions = injectionOptions.length ? injectionOptions : v2PrimaryTypeInjectionRailOptions();
 46467 |   return {
 46468 |     extra: {
 46469 |       storedCount: extraTokens.length,
```


### extra-encounter-token

Occurrences: 14

#### Hit 1 — line 2716

```text
  2704 |     { id: "teleport", name: "Teleport", tokenType: "protection", tier: "Protection", category: "Protection", price: 3500, description: "Delay an effect until the start of the next matching phase during the next gym." },
  2705 |     { id: "substitute", name: "Substitute", tokenType: "protection", tier: "Protection", category: "Protection", price: 6500, description: "Choose a Pokemon to protect from one effect. If it would be banned, it is not banned and cannot be banned again during this phase." },
  2706 |     { id: "follow-me", name: "Follow Me", tokenType: "protection", tier: "Protection", category: "Protection", price: 5000, description: "When Another Player Or Another Player's Pokemon Is Targeted By An Effect, Change The Target To You Or One Of Your Legal Pokemon Instead. The New Target Must Be A Legal Target For The Original Effect. After This Effect Resolves, For The Rest Of This Gym, Copy Each Token Used By The Player Whose Effect You Redirected. Follow Me Cannot Redirect Global Effects Or Effects That Do Not Target A Player Or Pokemon." },
  2707 |     { id: "parting-shot", name: "Parting Shot", tokenType: "protection", tier: "Protection", category: "Protection", price: 4000, description: "During Team Preview, switch a previewed Pokemon for another party Pokemon. Cursed-swap retaliation is tracked manually." },
  2708 |     { id: "embargo", name: "Embargo", tokenType: "protection", tier: "Protection", category: "Protection", price: 7000, description: "Target player can only use one more token this gym. You cannot use another token after this resolves." },
  2709 |     { id: "counterspell", name: "Counterspell", tokenType: "protection", tier: "Protection", category: "Protection", price: 7000, description: "When One Of Your Tokens Is Negated, Use This Token. The Negated Token Is Not Consumed. That Token Cannot Be Used Again Until 2 Gyms Have Passed." },
  2710 |     { id: "after-you", name: "After You", tokenType: "protection", tier: "Protection", category: "Protection", price: 7000, description: "After a player declares an effect, copy and use it." },
  2711 |     { id: "smokescreen", name: "Smokescreen", tokenType: "protection", tier: "Protection", category: "Protection", price: 6000, description: "When You Or Your Pokemon Are Targetted For An Effect, Spin A Wheel With All Players. The Result Is The New Target Of That Effect. If Pokemon Are Targetted When This Is Used, Choose A Legal Target From That Player Landed On. Your Original Target Remains The Same." },
  2712 |     { id: "seven-tools", name: "7 Tools Of The Bandit", tokenType: "protection", tier: "Protection", category: "Protection", price: 9000, description: "When A Player Activates A Protection Token, Use This Token Immediately After. Negate That Protection Token, Then Copy It. The Copied Token Must Be Used During This Gym Or It Is Lost." },
  2713 |     { id: "immunity", name: "Immunity", tokenType: "protection", tier: "Protection", category: "Protection", price: 9000, description: "Negate any effect or global effect. Does not stop series restricts or bans." },
  2714 |     { id: "revenge", name: "Revenge", tokenType: "protection", tier: "Protection", category: "Protection", price: 10000, description: "After a Battle Phase where an opponent cursed a Pokemon you brought, release 2 Pokemon from their brought team and destroy the held item." },
  2715 |     { id: "reroll-token", name: "Reroll", tokenType: "reroll", tier: "Encounter", category: "Encounter", price: 1000, description: "Reroll any wheel result." },
  2716 |     { id: "extra-encounter-token", name: "Extra Encounter Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 3500, description: "Use in Action Phase to roll an extra encounter." },
  2717 |     { id: "repel-token", name: "Repel", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 3500, description: "Remove one Pokemon for every 5 entries on an encounter wheel." },
  2718 |     { id: "quick-ball-token", name: "Quick Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 12500, description: "Release an encounter and steal another player's encounter." },
  2719 |     { id: "dream-ball-token", name: "Dream Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 8000, description: "Before an encounter wheel, name almost any ability. The encounter has access to that ability." },
  2720 |     { id: "honey-token", name: "Honey", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 7000, description: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter." },
  2721 |     { id: "master-ball-token", name: "Master Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 12500, description: "Choose your encounter. Other players cannot change it." },
  2722 |     { id: "beast-ball-token", name: "Beast Ball", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 8000, description: "Before an encounter wheel, name any move. The encounter has access to that move." },
  2723 |     { id: "move-deleter", legacyIds: ["move-deleter-curse"], name: "Move Deleter", tokenType: "control", tier: "Control", category: "Control", price: 1500, description: "Ban one move from being brought for 1 week. Cannot be used after team submission." },
  2724 |     { id: "toxic-curse", name: "Toxic Curse", tokenType: "curse", tier: "Curses", category: "Curses", price: 3000, description: "Force a Pokemon to carry a Toxic Orb for 2 gyms." },
  2725 |     { id: "iron-ball-curse", name: "Iron Ball Curse", tokenType: "curse", tier: "Curses", category: "Curses", price: 3000, description: "Force a Pokemon to carry an Iron Ball for 2 gyms." },
  2726 |     { id: "flame-curse", name: "Flame Curse", tokenType: "curse", tier: "Curses", category: "Curses", price: 3000, description: "Force a Pokemon to carry a Flame Orb for 2 gyms." },
  2727 |     { id: "silencing-curse", name: "Silencing Curse", tokenType: "curse", tier: "Curses", category: "Curses", price: 4000, description: "Restrict a Pokemon to 2 move slots for 2 gyms." },
  2728 |     { id: "knock-off-curse", name: "Knock Off Curse", tokenType: "curse", tier: "Curses", category: "Curses", price: 4000, description: "Choose a Pokemon and an Item or TM move. If it is on the Pokemon, remove it from inventory. Masterball items are protected." },
```


#### Hit 2 — line 2787

```text
  2775 |   "safeguard": { names: ["Safeguard"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.PLAYER, targetScope: EFFECT_TARGET_SCOPES.SINGLE_PLAYER, selfOnly: true, effectType: "player-buff", buff: "Safeguard", note: "Money and Tokens protected from steal, destroy, and copy; Follow Me and Embargo do not affect the player." },
  2776 |   "teleport": { names: ["Teleport"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Teleport Pending", note: "Delays one effect until matching phase next gym." },
  2777 |   "substitute": { names: ["Substitute"], category: "protection", targetMode: "single-pokemon", targetType: EFFECT_TARGET_TYPES.POKEMON, targetScope: EFFECT_TARGET_SCOPES.ROSTER_INSTANCE, applicationScope: EFFECT_APPLICATION_SCOPES.ROSTER_INSTANCE, effectType: "add-buffs", buffs: ["Substitute Protection"], note: "Protects one owned roster instance from the next effect that would affect it." },
  2778 |   "seven-tools": { names: ["7 Tools Of The Bandit", "7 Tools", "Seven Tools"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "counter-response", note: "Negates the exact Protection response and creates one same-Gym temporary copy atomically." },
  2779 |   "counterspell": { names: ["Counterspell"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "counter-response", note: "Restores the user's exact negated Token on a two-Gym phase-anchored cooldown." },
  2780 |   "follow-me": { names: ["Follow Me"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Follow Me Pending", note: "Redirects one legal corresponding target, then copies later real Token consumption into inventory for this Gym." },
  2781 |   "parting-shot": { names: ["Parting Shot"], category: "protection", targetMode: "single-pokemon", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "add-buffs", buffs: ["Parting Shot Swap Pending"], note: "Team Preview swap marker." },
  2782 |   "embargo": { names: ["Embargo"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-nerf", nerf: "Embargo", note: "Only one more token this gym." },
  2783 |   "after-you": { names: ["After You"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "After You Pending", note: "Creates a fresh virtual copy of the current supported Token activation before the original resolves." },
  2784 |   "smokescreen": { names: ["Smokescreen"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "log", note: "Spins every player once and replaces the original target only when another player has a legal corresponding target." },
  2785 |   "immunity": { names: ["Immunity", "Emergency Immunity Token"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Immunity", note: "Negates one effect/global effect." },
  2786 |   "revenge": { names: ["Revenge"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Revenge Pending", note: "Post-curse revenge marker." },
  2787 |   "extra-encounter-token": { names: ["Extra Encounter Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Extra Encounter Available", note: "Spend during Action Phase to roll an extra encounter." },
  2788 |   "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, choiceLabel: "Pokemon Name", effectType: "log", note: "Remove one Pokemon per 5 entries from Encounter Wheel. Wheel editor hook pending." },
  2789 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
  2790 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
  2791 |   "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "At End of Action, copies one immutable completed Encounter result into a new acquisition-ready Encounter without rerolling." },
  2792 |   "master-ball-token": { names: ["Master Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Master Ball Pending", note: "Choose encounter; cannot be changed by other players." },
  2793 |   "beast-ball-token": { names: ["Beast Ball"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Beast Ball Pending", note: "Encounter move choice marker." }
  2794 | });
  2795 | 
  2796 | const statusTokenDefinitions = Object.freeze({
  2797 |   "restrict-token": {
  2798 |     names: ["Restrict Token", "Restrict"],
  2799 |     category: "control",
```


#### Hit 3 — line 2997

```text
  2985 |     durationGyms: 1,
  2986 |     targetMode: "multi-pokemon",
  2987 |     targetCount: 6,
  2988 |     targetType: EFFECT_TARGET_TYPES.POKEMON,
  2989 |     targetScope: EFFECT_TARGET_SCOPES.ROSTER_INSTANCE,
  2990 |     note: "Set revealed only to the Foresight Curse user if brought this Battle Phase",
  2991 |     payload: { revealSetIfBrought: true, visibility: "sourcePlayerOnly", privateInformation: true, notDebuff: true },
  2992 |     notDebuff: true
  2993 |   }
  2994 | });
  2995 | 
  2996 | const TOKEN_TIMING_ENGINE_V1_DEFINITIONS = Object.freeze({
  2997 |   "extra-encounter-token": Object.freeze({
  2998 |     id: "extra-encounter-token",
  2999 |     names: ["Extra Encounter Token", "Extra Encounter"],
  3000 |     objectType: TOKEN_OBJECT_TYPES.TOKEN,
  3001 |     family: ["encounter"],
  3002 |     timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,
  3003 |     timingWindows: [TOKEN_TIMING_WINDOWS.ACTION_OPEN, TOKEN_TIMING_WINDOWS.MANUAL_HOST],
  3004 |     activationPattern: TOKEN_ACTIVATION_PATTERNS.PROACTIVE,
  3005 |     persistence: TOKEN_PERSISTENCE_BUCKETS.INSTANT,
  3006 |     resolutionPayloads: [TOKEN_RESOLUTION_PAYLOADS.WHEEL, TOKEN_RESOLUTION_PAYLOADS.ROSTER_CHANGE],
  3007 |     targetType: EFFECT_TARGET_TYPES.PLAYER,
  3008 |     targetScope: EFFECT_TARGET_SCOPES.SINGLE_PLAYER,
  3009 |     selfOnly: true,
```


#### Hit 4 — line 2998

```text
  2986 |     targetMode: "multi-pokemon",
  2987 |     targetCount: 6,
  2988 |     targetType: EFFECT_TARGET_TYPES.POKEMON,
  2989 |     targetScope: EFFECT_TARGET_SCOPES.ROSTER_INSTANCE,
  2990 |     note: "Set revealed only to the Foresight Curse user if brought this Battle Phase",
  2991 |     payload: { revealSetIfBrought: true, visibility: "sourcePlayerOnly", privateInformation: true, notDebuff: true },
  2992 |     notDebuff: true
  2993 |   }
  2994 | });
  2995 | 
  2996 | const TOKEN_TIMING_ENGINE_V1_DEFINITIONS = Object.freeze({
  2997 |   "extra-encounter-token": Object.freeze({
  2998 |     id: "extra-encounter-token",
  2999 |     names: ["Extra Encounter Token", "Extra Encounter"],
  3000 |     objectType: TOKEN_OBJECT_TYPES.TOKEN,
  3001 |     family: ["encounter"],
  3002 |     timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,
  3003 |     timingWindows: [TOKEN_TIMING_WINDOWS.ACTION_OPEN, TOKEN_TIMING_WINDOWS.MANUAL_HOST],
  3004 |     activationPattern: TOKEN_ACTIVATION_PATTERNS.PROACTIVE,
  3005 |     persistence: TOKEN_PERSISTENCE_BUCKETS.INSTANT,
  3006 |     resolutionPayloads: [TOKEN_RESOLUTION_PAYLOADS.WHEEL, TOKEN_RESOLUTION_PAYLOADS.ROSTER_CHANGE],
  3007 |     targetType: EFFECT_TARGET_TYPES.PLAYER,
  3008 |     targetScope: EFFECT_TARGET_SCOPES.SINGLE_PLAYER,
  3009 |     selfOnly: true,
  3010 |     duration: "instant",
```


#### Hit 5 — line 22648

```text
 22636 |   "cleanse-tag": "assets/tokens/cleanse-tag.png",
 22637 |   "clear-smog": "assets/tokens/clear-smog.png",
 22638 |   "common-candy": "assets/tokens/common-candy.png",
 22639 |   "devolve": "assets/tokens/devolve-token.png",
 22640 |   "devolve-token": "assets/tokens/devolve-token.png",
 22641 |   "ditto": "assets/tokens/ditto-token.png",
 22642 |   "ditto-token": "assets/tokens/ditto-token.png",
 22643 |   "dream-ball": "assets/tokens/dream-ball-token.png",
 22644 |   "dream-ball-token": "assets/tokens/dream-ball-token.png",
 22645 |   "embargo": "assets/tokens/embargo.png",
 22646 |   "extra-ban": "assets/tokens/extra-ban-token.png",
 22647 |   "extra-ban-token": "assets/tokens/extra-ban-token.png",
 22648 |   "extra-encounter": "assets/tokens/extra-encounter-token.png",
 22649 |   "extra-encounter-token": "assets/tokens/extra-encounter-token.png",
 22650 |   "flame-curse": "assets/tokens/flame-curse.png",
 22651 |   "follow-me": "assets/tokens/follow-me.png",
 22652 |   "foresight": "assets/tokens/foresight-curse.png",
 22653 |   "foresight-curse": "assets/tokens/foresight-curse.png",
 22654 |   "greatball": "assets/tokens/roll-greatball-wheel.png",
 22655 |   "greatball-gamecorner": "assets/tokens/roll-greatball-wheel.png",
 22656 |   "greatball-gc-token": "assets/tokens/roll-greatball-wheel.png",
 22657 |   "great-gc-ticket": "assets/tokens/roll-greatball-wheel.png",
 22658 |   "haze": "assets/tokens/haze-curse.png",
 22659 |   "haze-curse": "assets/tokens/haze-curse.png",
 22660 |   "honey": "assets/tokens/honey-token.png",
```


#### Hit 6 — line 22649

```text
 22637 |   "clear-smog": "assets/tokens/clear-smog.png",
 22638 |   "common-candy": "assets/tokens/common-candy.png",
 22639 |   "devolve": "assets/tokens/devolve-token.png",
 22640 |   "devolve-token": "assets/tokens/devolve-token.png",
 22641 |   "ditto": "assets/tokens/ditto-token.png",
 22642 |   "ditto-token": "assets/tokens/ditto-token.png",
 22643 |   "dream-ball": "assets/tokens/dream-ball-token.png",
 22644 |   "dream-ball-token": "assets/tokens/dream-ball-token.png",
 22645 |   "embargo": "assets/tokens/embargo.png",
 22646 |   "extra-ban": "assets/tokens/extra-ban-token.png",
 22647 |   "extra-ban-token": "assets/tokens/extra-ban-token.png",
 22648 |   "extra-encounter": "assets/tokens/extra-encounter-token.png",
 22649 |   "extra-encounter-token": "assets/tokens/extra-encounter-token.png",
 22650 |   "flame-curse": "assets/tokens/flame-curse.png",
 22651 |   "follow-me": "assets/tokens/follow-me.png",
 22652 |   "foresight": "assets/tokens/foresight-curse.png",
 22653 |   "foresight-curse": "assets/tokens/foresight-curse.png",
 22654 |   "greatball": "assets/tokens/roll-greatball-wheel.png",
 22655 |   "greatball-gamecorner": "assets/tokens/roll-greatball-wheel.png",
 22656 |   "greatball-gc-token": "assets/tokens/roll-greatball-wheel.png",
 22657 |   "great-gc-ticket": "assets/tokens/roll-greatball-wheel.png",
 22658 |   "haze": "assets/tokens/haze-curse.png",
 22659 |   "haze-curse": "assets/tokens/haze-curse.png",
 22660 |   "honey": "assets/tokens/honey-token.png",
 22661 |   "honey-token": "assets/tokens/honey-token.png",
```


#### Hit 7 — line 22649

```text
 22637 |   "clear-smog": "assets/tokens/clear-smog.png",
 22638 |   "common-candy": "assets/tokens/common-candy.png",
 22639 |   "devolve": "assets/tokens/devolve-token.png",
 22640 |   "devolve-token": "assets/tokens/devolve-token.png",
 22641 |   "ditto": "assets/tokens/ditto-token.png",
 22642 |   "ditto-token": "assets/tokens/ditto-token.png",
 22643 |   "dream-ball": "assets/tokens/dream-ball-token.png",
 22644 |   "dream-ball-token": "assets/tokens/dream-ball-token.png",
 22645 |   "embargo": "assets/tokens/embargo.png",
 22646 |   "extra-ban": "assets/tokens/extra-ban-token.png",
 22647 |   "extra-ban-token": "assets/tokens/extra-ban-token.png",
 22648 |   "extra-encounter": "assets/tokens/extra-encounter-token.png",
 22649 |   "extra-encounter-token": "assets/tokens/extra-encounter-token.png",
 22650 |   "flame-curse": "assets/tokens/flame-curse.png",
 22651 |   "follow-me": "assets/tokens/follow-me.png",
 22652 |   "foresight": "assets/tokens/foresight-curse.png",
 22653 |   "foresight-curse": "assets/tokens/foresight-curse.png",
 22654 |   "greatball": "assets/tokens/roll-greatball-wheel.png",
 22655 |   "greatball-gamecorner": "assets/tokens/roll-greatball-wheel.png",
 22656 |   "greatball-gc-token": "assets/tokens/roll-greatball-wheel.png",
 22657 |   "great-gc-ticket": "assets/tokens/roll-greatball-wheel.png",
 22658 |   "haze": "assets/tokens/haze-curse.png",
 22659 |   "haze-curse": "assets/tokens/haze-curse.png",
 22660 |   "honey": "assets/tokens/honey-token.png",
 22661 |   "honey-token": "assets/tokens/honey-token.png",
```


#### Hit 8 — line 43925

```text
 43913 | ]);
 43914 | const V2_ROUTE_ACTION_TYPE = "route-exploration";
 43915 | const V2_EXTRA_ENCOUNTER_PRICE = 2500;
 43916 | const V2_REPEL_SUPPRESSION_COUNT = 5;
 43917 | const V2_TYPE_INJECTION_COUNT = 4;
 43918 | const V2_TYPE_INJECTION_MAX_TIER_ID = "master";
 43919 | const V2_TYPE_INJECTION_TIER_ROLLS = Object.freeze([
 43920 |   Object.freeze({ id: "base-or-lower", label: "Route natural tier or lower", weight: 75, offset: 0, baseOrLower: true }),
 43921 |   Object.freeze({ id: "plus-1", label: "+1 tier", weight: 20, offset: 1 }),
 43922 |   Object.freeze({ id: "plus-2", label: "+2 tiers", weight: 5, offset: 2 })
 43923 | ]);
 43924 | const V2_ROUTE_TOKEN_IDS = Object.freeze({
 43925 |   extraEncounter: "extra-encounter-token",
 43926 |   reroll: "reroll-token",
 43927 |   repel: "repel-token",
 43928 |   masterBall: "master-ball-token"
 43929 | });
 43930 | const V2_ROUTE_TOKEN_NAMES = Object.freeze({
 43931 |   [V2_ROUTE_TOKEN_IDS.extraEncounter]: ["extra encounter token", "extra encounter"],
 43932 |   [V2_ROUTE_TOKEN_IDS.reroll]: ["reroll token", "reroll"],
 43933 |   [V2_ROUTE_TOKEN_IDS.repel]: ["repel token", "repel"],
 43934 |   [V2_ROUTE_TOKEN_IDS.masterBall]: ["master ball token", "master ball"]
 43935 | });
 43936 | 
 43937 | function activeActionPhaseVersion() {
```


#### Hit 9 — line 45096

```text
 45084 | function v2FindOpportunity(routeState, opportunityId) {
 45085 |   for (const route of routeState.routes || []) {
 45086 |     const opportunity = (route.pendingEncounterOpportunities || []).find((entry) => entry.opportunityId === opportunityId);
 45087 |     if (opportunity) return { route, opportunity };
 45088 |   }
 45089 |   return { route: null, opportunity: null };
 45090 | }
 45091 | 
 45092 | function v2CreateRouteEncounterOpportunity({ playerId, routeNumber, kind = "normal-route-action", source = {}, currentProgressionRoute = null } = {}) {
 45093 |   const routeState = v2EnsureRouteSeriesState(state.series);
 45094 |   const route = v2FindRoute(routeState, routeNumber);
 45095 |   if (!route) throw new Error(`Route ${routeNumber} does not exist.`);
 45096 |   if (kind === "extra-encounter-token" && Number(currentProgressionRoute || 0) < route.routeNumber) {
 45097 |     throw new Error("Extra Encounter cannot target a Route above current progression.");
 45098 |   }
 45099 |   const opportunityId = v2NextCounterId(routeState, "opportunity", "route-opportunity");
 45100 |   const opportunity = {
 45101 |     opportunityId,
 45102 |     status: "pending",
 45103 |     playerId: v2Text(playerId),
 45104 |     routeId: route.routeId,
 45105 |     routeNumber: route.routeNumber,
 45106 |     kind,
 45107 |     source: { ...source },
 45108 |     encounterCount: 1,
```


#### Hit 10 — line 45556

```text
 45544 | }
 45545 | 
 45546 | function v2UseExtraEncounter(playerId, routeNumber, tokenInventoryId, options = {}) {
 45547 |   const player = state.players.find((entry) => entry.id === playerId);
 45548 |   if (!player) throw new Error("Player not found for Extra Encounter use.");
 45549 |   const routeState = v2EnsureRouteSeriesState(state.series);
 45550 |   const route = v2FindRoute(routeState, routeNumber);
 45551 |   if (!route) throw new Error(`Route ${routeNumber} does not exist.`);
 45552 |   if (Number(routeNumber) > v2CurrentProgressionRoute()) throw new Error("Extra Encounter cannot target a Route above current progression.");
 45553 |   const key = v2Text(options.idempotencyKey);
 45554 |   const existingRequest = key ? state.v2?.routeOperationRequests?.[key] : null;
 45555 |   if (existingRequest?.operationId) return v2FindRouteEffectOperation(state.series, existingRequest.operationId);
 45556 |   const existingTokenOperation = v2FindRouteEffectOperationByToken(state.series, "extra-encounter-token", tokenInventoryId, playerId);
 45557 |   if (existingTokenOperation) return existingTokenOperation;
 45558 |   const eligibleResidents = v2EligibleResidents(route, [], { routeState, playerId });
 45559 |   if (!eligibleResidents.length || !v2RouteHasPositiveEncounterWeight(eligibleResidents)) {
 45560 |     throw new Error(`No eligible residents remain on Route ${route.routeNumber} for ${player.name}.`);
 45561 |   }
 45562 |   const token = v2ConsumeExactRouteToken(player, V2_ROUTE_TOKEN_IDS.extraEncounter, tokenInventoryId);
 45563 |   const operationId = v2NextEffectOperationId(state.series, "v2-extra-encounter");
 45564 |   const { opportunity } = v2CreateRouteEncounterOpportunity({
 45565 |     playerId,
 45566 |     routeNumber,
 45567 |     kind: "extra-encounter-token",
 45568 |     currentProgressionRoute: v2CurrentProgressionRoute(),
```


#### Hit 11 — line 45567

```text
 45555 |   if (existingRequest?.operationId) return v2FindRouteEffectOperation(state.series, existingRequest.operationId);
 45556 |   const existingTokenOperation = v2FindRouteEffectOperationByToken(state.series, "extra-encounter-token", tokenInventoryId, playerId);
 45557 |   if (existingTokenOperation) return existingTokenOperation;
 45558 |   const eligibleResidents = v2EligibleResidents(route, [], { routeState, playerId });
 45559 |   if (!eligibleResidents.length || !v2RouteHasPositiveEncounterWeight(eligibleResidents)) {
 45560 |     throw new Error(`No eligible residents remain on Route ${route.routeNumber} for ${player.name}.`);
 45561 |   }
 45562 |   const token = v2ConsumeExactRouteToken(player, V2_ROUTE_TOKEN_IDS.extraEncounter, tokenInventoryId);
 45563 |   const operationId = v2NextEffectOperationId(state.series, "v2-extra-encounter");
 45564 |   const { opportunity } = v2CreateRouteEncounterOpportunity({
 45565 |     playerId,
 45566 |     routeNumber,
 45567 |     kind: "extra-encounter-token",
 45568 |     currentProgressionRoute: v2CurrentProgressionRoute(),
 45569 |     source: { kind: "extra-encounter-token", operationId, tokenInventoryId: token.id, purchasePrice: V2_EXTRA_ENCOUNTER_PRICE }
 45570 |   });
 45571 |   const operation = {
 45572 |     operationId,
 45573 |     actionId: operationId,
 45574 |     type: "extra-encounter-token",
 45575 |     status: "committed",
 45576 |     settlementStatus: "pending-encounter",
 45577 |     playerId,
 45578 |     seriesId: state.series,
 45579 |     routeId: opportunity.routeId,
```


#### Hit 12 — line 45569

```text
 45557 |   if (existingTokenOperation) return existingTokenOperation;
 45558 |   const eligibleResidents = v2EligibleResidents(route, [], { routeState, playerId });
 45559 |   if (!eligibleResidents.length || !v2RouteHasPositiveEncounterWeight(eligibleResidents)) {
 45560 |     throw new Error(`No eligible residents remain on Route ${route.routeNumber} for ${player.name}.`);
 45561 |   }
 45562 |   const token = v2ConsumeExactRouteToken(player, V2_ROUTE_TOKEN_IDS.extraEncounter, tokenInventoryId);
 45563 |   const operationId = v2NextEffectOperationId(state.series, "v2-extra-encounter");
 45564 |   const { opportunity } = v2CreateRouteEncounterOpportunity({
 45565 |     playerId,
 45566 |     routeNumber,
 45567 |     kind: "extra-encounter-token",
 45568 |     currentProgressionRoute: v2CurrentProgressionRoute(),
 45569 |     source: { kind: "extra-encounter-token", operationId, tokenInventoryId: token.id, purchasePrice: V2_EXTRA_ENCOUNTER_PRICE }
 45570 |   });
 45571 |   const operation = {
 45572 |     operationId,
 45573 |     actionId: operationId,
 45574 |     type: "extra-encounter-token",
 45575 |     status: "committed",
 45576 |     settlementStatus: "pending-encounter",
 45577 |     playerId,
 45578 |     seriesId: state.series,
 45579 |     routeId: opportunity.routeId,
 45580 |     routeNumber: opportunity.routeNumber,
 45581 |     opportunityId: opportunity.opportunityId,
```


#### Hit 13 — line 45574

```text
 45562 |   const token = v2ConsumeExactRouteToken(player, V2_ROUTE_TOKEN_IDS.extraEncounter, tokenInventoryId);
 45563 |   const operationId = v2NextEffectOperationId(state.series, "v2-extra-encounter");
 45564 |   const { opportunity } = v2CreateRouteEncounterOpportunity({
 45565 |     playerId,
 45566 |     routeNumber,
 45567 |     kind: "extra-encounter-token",
 45568 |     currentProgressionRoute: v2CurrentProgressionRoute(),
 45569 |     source: { kind: "extra-encounter-token", operationId, tokenInventoryId: token.id, purchasePrice: V2_EXTRA_ENCOUNTER_PRICE }
 45570 |   });
 45571 |   const operation = {
 45572 |     operationId,
 45573 |     actionId: operationId,
 45574 |     type: "extra-encounter-token",
 45575 |     status: "committed",
 45576 |     settlementStatus: "pending-encounter",
 45577 |     playerId,
 45578 |     seriesId: state.series,
 45579 |     routeId: opportunity.routeId,
 45580 |     routeNumber: opportunity.routeNumber,
 45581 |     opportunityId: opportunity.opportunityId,
 45582 |     resultId: "",
 45583 |     acquisitionId: "",
 45584 |     pokemonRecordId: "",
 45585 |     tokenInventoryId: token.id,
 45586 |     consumedToken: structuredClone(token),
```


#### Hit 14 — line 45589

```text
 45577 |     playerId,
 45578 |     seriesId: state.series,
 45579 |     routeId: opportunity.routeId,
 45580 |     routeNumber: opportunity.routeNumber,
 45581 |     opportunityId: opportunity.opportunityId,
 45582 |     resultId: "",
 45583 |     acquisitionId: "",
 45584 |     pokemonRecordId: "",
 45585 |     tokenInventoryId: token.id,
 45586 |     consumedToken: structuredClone(token),
 45587 |     causalChain: { operationId, tokenInventoryId: token.id, opportunityId: opportunity.opportunityId, resultId: "", acquisitionId: "", pokemonRecordId: "" }
 45588 |   };
 45589 |   const result = v2DrawRouteOpportunityEncounter(opportunity.opportunityId, { reason: "extra-encounter-token" });
 45590 |   operation.status = "encounter-rolled";
 45591 |   operation.settlementStatus = "pending-acquisition";
 45592 |   operation.resultId = result.resultId;
 45593 |   operation.causalChain.resultId = result.resultId;
 45594 |   v2RouteEffectOperations(state.series).push(operation);
 45595 |   if (key) state.v2.routeOperationRequests[key] = { kind: "extra-encounter-use", operationId, tokenInventoryId: token.id, resultId: result.resultId };
 45596 |   return operation;
 45597 | }
 45598 | 
 45599 | function v2UseRerollTokenOnAction(actionId, tokenInventoryId, options = {}) {
 45600 |   const actionPhase = v2EnsureActionPhase(state.series);
 45601 |   const record = v2FindRouteActionOrOperation(actionPhase, state.series, actionId);
```


### encounterWheelDefinition

Occurrences: 11

#### Hit 1 — line 3930

```text
  3918 | async function resolveImmediateTokenUse(draft, { context = {} } = {}) {
  3919 |   const metadata = tokenEffectMetadataByName(draft.tokenName);
  3920 |   const timingCheck = tokenUseTimingCheck({ player: draft.actor, tokenName: draft.tokenName, metadata, context });
  3921 |   if (!timingCheck.ok) {
  3922 |     alert(timingCheck.reason);
  3923 |     return null;
  3924 |   }
  3925 |   let extraEncounterValidation = null;
  3926 |   if (metadata.resolverId === "extraEncounter") {
  3927 |     extraEncounterValidation = encounterTokenRuntime.validateExtraEncounter(state, {
  3928 |       playerId: draft.targetPlayerId
  3929 |     }, {
  3930 |       wheelDefinition: encounterWheelDefinition(state.series, state.gym)
  3931 |     });
  3932 |     if (!extraEncounterValidation.ok) {
  3933 |       alert(extraEncounterValidation.reason);
  3934 |       return null;
  3935 |     }
  3936 |   }
  3937 |   if (metadata.id === "substitute") {
  3938 |     const legality = controlTokenDraftLegality(draft, metadata);
  3939 |     if (!legality.ok) {
  3940 |       alert(legality.reason);
  3941 |       return null;
  3942 |     }
```


#### Hit 2 — line 6134

```text
  6122 |     series: "Hoenn",
  6123 |     name: "Hoenn Hyperspace Hole Wheel",
  6124 |     entries: [
  6125 |       "Rayquaza", "Cresselia", "Uxie", "Mesprit", "Azelf", "Landorus", "Thundurus", "Tornadus",
  6126 |       "Tornadus T", "Landorus T", "Thundurus T", "Dialga", "Palkia", "Giratina", "Groudon",
  6127 |       "Kyogre", "Jirachi", "Deoxys", "Deoxys A", "Deoxys S", "Deoxys D", "Kyurem", "Reshiram",
  6128 |       "Zekrom", "Cobalion", "Terrakion", "Virizion", "Regirock", "Regice", "Registeel",
  6129 |       "Regigigas", "Entei", "Raikou", "Suicune", "Latias", "Latios", "Heatran", "Ho-Oh", "Lugia"
  6130 |     ].map((name) => encounterEntry(name))
  6131 |   }
  6132 | });
  6133 | 
  6134 | const encounterWheelDefinitions = Object.freeze({
  6135 |   "kanto-gym-1": makeEncounterWheel("Kanto", 1, ["Pidgey", "Shinx", "Oddish", "Magikarp SF", "Tentacool SF"]),
  6136 |   "hoenn-gym-1": makeEncounterWheel("Hoenn", 1, [
  6137 |     "Chikorita", "Cyndaquil", "Totodile", "Wurmple", "Zigzagoon", "Poochyena", "Lillipup", "Zorua",
  6138 |     "Sewaddle", "Turtwig", "Chimchar", "Piplup", "Snivy", "Oshawott", "Tepig", "Wingull",
  6139 |     "Wailmer SF", "Carvanha SF", "Chatot", "Shellos", "Tentacool SF", "Magikarp SF", "Lotad",
  6140 |     "Seedot", "Ralts", "Surskit", "Gothita", "Tympole", "Marill", "Corphish SF", "Goldeen SF",
  6141 |     "Taillow", "Pidove", "Shroomish", "Slakoth", "Cottonee", "Paras", "Phantump", "Omanyte",
  6142 |     "Kabuto", "Aerodactyl", "Lileep", "Anorith", "Cranidos", "Shieldon", "Tirtouga", "Archen",
  6143 |     "Tyrunt", "Amaura", "Makuhita", "Whismur", "Nincada", "Skitty", "Hyperspace Hole", "Joltik",
  6144 |     "Eevee", "Abra", "Geodude"
  6145 |   ]),
  6146 |   "hoenn-gym-2": makeEncounterWheel("Hoenn", 2, [
```


#### Hit 3 — line 38651

```text
 38639 |   return state.graveyardSessions.find((session) => session.playerId === playerId
 38640 |     && session.series === state.series
 38641 |     && Number(session.gym) === Number(state.gym)
 38642 |     && session.status === "active") || null;
 38643 | }
 38644 | 
 38645 | function actionLocationServices(location, player = activePlayer(), tracker = ensureActionSeriesTracker(state.series, player.id)) {
 38646 |   if (!location) return [];
 38647 |   if (location.id === "pokemon-breeder") return [];
 38648 |   if (location.id === "ranger-base") return [];
 38649 |   if (location.id === "pokemon-center") return [];
 38650 |   if (location.id === "encounter") {
 38651 |     const wheel = encounterWheelDefinition();
 38652 |     return [{
 38653 |       id: "encounter-wheel",
 38654 |       label: "Open Encounter Wheel",
 38655 |       buttonLabel: "Spend 1 Action",
 38656 |       description: wheel
 38657 |         ? `Spend 1 Action to roll ${wheel.name} twice. Encounter results can be confirmed as Pokemon Results.`
 38658 |         : "No encounter wheel is defined for the current gym yet.",
 38659 |       actionCost: 1,
 38660 |       maxUsesPerAction: wheel?.rollsPerAction || 2,
 38661 |       allowsMultipleUses: false,
 38662 |       disabled: !wheel,
 38663 |       disabledReason: wheel ? "" : "No Encounter Wheel is defined for this Series/Gym.",
```


#### Hit 4 — line 41745

```text
 41733 | function pendingSilphCoSession(playerId = activePlayer().id) {
 41734 |   return (state.silphCoSessions || []).find((session) => session.playerId === playerId && session.status === "pending-choice") || null;
 41735 | }
 41736 | 
 41737 | function activeHiddenGrottoSession(playerId = activePlayer().id) {
 41738 |   return (state.hiddenGrottoSessions || []).find((session) => session.playerId === playerId && ["type-choice", "pokemon-choice"].includes(session.status)) || null;
 41739 | }
 41740 | 
 41741 | function encounterWheelKey(series = state.series, gym = state.gym) {
 41742 |   return `${String(series || "").toLowerCase()}-gym-${Number(gym || 1)}`;
 41743 | }
 41744 | 
 41745 | function encounterWheelDefinition(series = state.series, gym = state.gym) {
 41746 |   return encounterWheelDefinitions[encounterWheelKey(series, gym)] || null;
 41747 | }
 41748 | 
 41749 | function pendingEncounterSessions() {
 41750 |   state.encounterSessions ||= [];
 41751 |   return state.encounterSessions.filter((session) => ["pending", "review"].includes(session.status));
 41752 | }
 41753 | 
 41754 | function selectedEncounterSession() {
 41755 |   const pending = pendingEncounterSessions();
 41756 |   if (!pending.length) return null;
 41757 |   let session = pending.find((entry) => entry.id === state.selectedEncounterSessionId);
```


#### Hit 5 — line 41746

```text
 41734 |   return (state.silphCoSessions || []).find((session) => session.playerId === playerId && session.status === "pending-choice") || null;
 41735 | }
 41736 | 
 41737 | function activeHiddenGrottoSession(playerId = activePlayer().id) {
 41738 |   return (state.hiddenGrottoSessions || []).find((session) => session.playerId === playerId && ["type-choice", "pokemon-choice"].includes(session.status)) || null;
 41739 | }
 41740 | 
 41741 | function encounterWheelKey(series = state.series, gym = state.gym) {
 41742 |   return `${String(series || "").toLowerCase()}-gym-${Number(gym || 1)}`;
 41743 | }
 41744 | 
 41745 | function encounterWheelDefinition(series = state.series, gym = state.gym) {
 41746 |   return encounterWheelDefinitions[encounterWheelKey(series, gym)] || null;
 41747 | }
 41748 | 
 41749 | function pendingEncounterSessions() {
 41750 |   state.encounterSessions ||= [];
 41751 |   return state.encounterSessions.filter((session) => ["pending", "review"].includes(session.status));
 41752 | }
 41753 | 
 41754 | function selectedEncounterSession() {
 41755 |   const pending = pendingEncounterSessions();
 41756 |   if (!pending.length) return null;
 41757 |   let session = pending.find((entry) => entry.id === state.selectedEncounterSessionId);
 41758 |   if (!session) {
```


#### Hit 6 — line 41766

```text
 41754 | function selectedEncounterSession() {
 41755 |   const pending = pendingEncounterSessions();
 41756 |   if (!pending.length) return null;
 41757 |   let session = pending.find((entry) => entry.id === state.selectedEncounterSessionId);
 41758 |   if (!session) {
 41759 |     session = pending[0];
 41760 |     state.selectedEncounterSessionId = session.id;
 41761 |   }
 41762 |   return session;
 41763 | }
 41764 | 
 41765 | function encounterEntriesForSession(session) {
 41766 |   const definition = encounterWheelDefinition(session?.series, session?.gym);
 41767 |   if (!definition) return [];
 41768 |   const includeFishing = Boolean(session.includeFishing);
 41769 |   const includeSurf = Boolean(session.includeSurf);
 41770 |   const removed = new Set(session.removedEntryIds || []);
 41771 |   const baseEntries = (definition.entries || []).filter((entry) => {
 41772 |     if (removed.has(entry.id)) return false;
 41773 |     const category = String(entry.category || "land").toLowerCase();
 41774 |     if (category === "fishing" && !includeFishing) return false;
 41775 |     if (category === "surf" && !includeSurf) return false;
 41776 |     if (entry.enabledByDefault === false && !["fishing", "surf"].includes(category)) return false;
 41777 |     return currentPokemonRuleStatusByName(entry.pokemonName || entry.displayName) !== "Banned";
 41778 |   });
```


#### Hit 7 — line 42784

```text
 42772 | }
 42773 | 
 42774 | function activeEncounterSessionForPlayer(playerId, series = state.series, gym = state.gym) {
 42775 |   return (state.encounterSessions || []).find((session) => session.playerId === playerId
 42776 |     && session.series === series
 42777 |     && Number(session.gym) === Number(gym)
 42778 |     && ["pending", "review"].includes(session.status));
 42779 | }
 42780 | 
 42781 | function startEncounterSession({ skipConfirmCheck = false } = {}) {
 42782 |   const player = activePlayer();
 42783 |   const location = actionLocationById("encounter");
 42784 |   const definition = encounterWheelDefinition();
 42785 |   if (!definition) {
 42786 |     alert("No Encounter Wheel is defined for this Series/Gym yet.");
 42787 |     return false;
 42788 |   }
 42789 |   if (!skipConfirmCheck) {
 42790 |     const check = actionLocationCanConfirm(location, player.id, 1);
 42791 |     if (!check.ok) {
 42792 |       alert(check.reason);
 42793 |       return false;
 42794 |     }
 42795 |   }
 42796 |   const previousVisits = structuredClone(actionVisitsForPlayer(player.id));
```


#### Hit 8 — line 46956

```text
 46944 |   const session = (state.encounterSessions || []).find((entry) => entry.id === sessionId);
 46945 |   if (!session || session.status !== "pending") return;
 46946 |   session.isSpinning = false;
 46947 |   session.pendingEntryId = "";
 46948 |   const player = state.players.find((entry) => entry.id === session.playerId) || activePlayer();
 46949 |   const entries = encounterEntriesForSession(session);
 46950 |   const visualResult = entries.find((entry) => entry.id === entryId) || weightedEncounterEntry(entries);
 46951 |   const { result, special } = resolveEncounterSpecialResult(visualResult);
 46952 |   if (!result || (session.rolls || []).length >= Number(session.maxRolls || 2)) return;
 46953 |   const roll = {
 46954 |     id: `encounter-roll-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
 46955 |     encounterSessionId: session.id,
 46956 |     actionVisitId: session.actionVisitIds?.[Math.floor((session.rolls || []).length / Number(encounterWheelDefinition(session.series, session.gym)?.rollsPerAction || 2))] || session.actionVisitId,
 46957 |     playerId: player.id,
 46958 |     series: session.series,
 46959 |     gym: Number(session.gym),
 46960 |     entryId: result.id,
 46961 |     visualEntryId: visualResult?.id || result.id,
 46962 |     resultPokemonName: result.pokemonName || result.displayName,
 46963 |     resultDisplayName: result.displayName || result.pokemonName,
 46964 |     resultSprite: "",
 46965 |     chosenSpriteKey: "",
 46966 |     category: result.category || "land",
 46967 |     weight: Number(result.weight || 1),
 46968 |     specialEncounter: special,
```


#### Hit 9 — line 47085

```text
 47073 |   if (!els.encounterTab || !els.encounterOverlay || !els.encounterBody) return;
 47074 |   els.encounterTab.classList.toggle("hidden", !pending.length);
 47075 |   els.encounterTab.textContent = pending.length ? `Encounter (${pending.length})` : "Encounter";
 47076 |   const isOpen = Boolean(pending.length && state.encounterModalOpen);
 47077 |   els.encounterOverlay.classList.toggle("hidden", !isOpen);
 47078 |   els.encounterTab.setAttribute("aria-expanded", String(isOpen));
 47079 |   const session = selectedEncounterSession();
 47080 |   if (!pending.length || !session) {
 47081 |     els.encounterSessionList.innerHTML = "";
 47082 |     els.encounterBody.innerHTML = "";
 47083 |     return;
 47084 |   }
 47085 |   const definition = encounterWheelDefinition(session.series, session.gym);
 47086 |   const player = state.players.find((entry) => entry.id === session.playerId) || activePlayer();
 47087 |   const entries = encounterEntriesForSession(session);
 47088 |   const removedEntries = (definition?.entries || []).filter((entry) => (session.removedEntryIds || []).includes(entry.id));
 47089 |   const max = Number(session.maxRolls || definition?.rollsPerAction || 2);
 47090 |   const rolls = session.rolls || [];
 47091 |   const isSpinning = Boolean(session.isSpinning);
 47092 |   const weightEditing = Boolean(session.weightEditing);
 47093 |   const rerollTokenCount = (player.inventory || []).filter(isRerollToken).length;
 47094 |   const rollFreeRerollReasons = Object.fromEntries(rolls.map((roll) => [roll.id, encounterRollFreeRerollReason(player, roll)]));
 47095 |   els.encounterTitle.textContent = definition?.name || "Encounter Wheel";
 47096 |   els.encounterSessionList.replaceChildren(...pending.map((entry) => {
 47097 |     const entryPlayer = state.players.find((candidate) => candidate.id === entry.playerId);
```


#### Hit 10 — line 47103

```text
 47091 |   const isSpinning = Boolean(session.isSpinning);
 47092 |   const weightEditing = Boolean(session.weightEditing);
 47093 |   const rerollTokenCount = (player.inventory || []).filter(isRerollToken).length;
 47094 |   const rollFreeRerollReasons = Object.fromEntries(rolls.map((roll) => [roll.id, encounterRollFreeRerollReason(player, roll)]));
 47095 |   els.encounterTitle.textContent = definition?.name || "Encounter Wheel";
 47096 |   els.encounterSessionList.replaceChildren(...pending.map((entry) => {
 47097 |     const entryPlayer = state.players.find((candidate) => candidate.id === entry.playerId);
 47098 |     const button = document.createElement("button");
 47099 |     button.type = "button";
 47100 |     button.className = `wheel-session-card${entry.id === session.id ? " active" : ""}`;
 47101 |     button.dataset.encounterSession = entry.id;
 47102 |     button.innerHTML = `
 47103 |       <strong>${escapeHtml(encounterWheelDefinition(entry.series, entry.gym)?.name || "Encounter Wheel")}</strong>
 47104 |       <span>${escapeHtml(entryPlayer?.name || "Unknown")} - ${entry.series} G${entry.gym}</span>
 47105 |       <em>${(entry.rolls || []).length}/${entry.maxRolls || 2} rolls</em>
 47106 |     `;
 47107 |     return button;
 47108 |   }));
 47109 |   const totalWeight = entries.reduce((total, entry) => total + Number(entry.weight || 1), 0) || 1;
 47110 |   const colors = ["#7cc6fe", "#98d973", "#f7c948", "#ff8a65", "#c6a4ff", "#80cbc4", "#f06292", "#ffd166"];
 47111 |   let cursor = 0;
 47112 |   const segments = buildEncounterWheelSegments(entries);
 47113 |   const finalRoll = rolls[rolls.length - 1];
 47114 |   const finalEntryId = finalRoll?.visualEntryId || finalRoll?.entryId || "";
 47115 |   const finalMeta = finalRoll
```


#### Hit 11 — line 61226

```text
 61214 |       state.interactionEvents = (state.interactionEvents || []).filter((activity) => previousIds.has(activity.id));
 61215 |     }
 61216 |     if (undoData.previousTransactions) {
 61217 |       state.transactions = structuredClone(undoData.previousTransactions);
 61218 |     } else if (Array.isArray(undoData.previousTransactionIds)) {
 61219 |       const previousIds = new Set(undoData.previousTransactionIds);
 61220 |       state.transactions = (state.transactions || []).filter((transaction) => previousIds.has(transaction.id));
 61221 |     }
 61222 |     syncLinkedTransactions();
 61223 |     syncPlayerPokemonLists();
 61224 |     return;
 61225 |   }
 61226 |   const definition = encounterWheelDefinition(session.series, session.gym);
 61227 |   const rollsPerAction = Number(definition?.rollsPerAction || 2);
 61228 |   const visitIds = session.actionVisitIds || (session.actionVisitId ? [session.actionVisitId] : []);
 61229 |   const visitIndex = Math.max(0, visitIds.indexOf(undoData.visitId));
 61230 |   let rollsToRemove = (session.rolls || []).filter((roll) => roll.actionVisitId === undoData.visitId);
 61231 |   if (!rollsToRemove.length || rollsToRemove.length > rollsPerAction) {
 61232 |     rollsToRemove = (session.rolls || []).slice(visitIndex * rollsPerAction, visitIndex * rollsPerAction + rollsPerAction);
 61233 |   }
 61234 |   const rollIds = new Set(rollsToRemove.map((roll) => roll.id));
 61235 |   const randomSessionIds = new Set(rollsToRemove.map((roll) => roll.randomPokemonSessionId).filter(Boolean));
 61236 |   const interactionIdsToRemove = new Set((state.interactionEvents || [])
 61237 |     .filter((activity) => randomSessionIds.has(activity.sourceId) || randomSessionIds.has(activity.payload?.randomPokemonSessionId))
 61238 |     .map((activity) => activity.id));
```


### encounterSessions

Occurrences: 34

#### Hit 1 — line 2562

```text
  2550 |       aTierSafetyTriggeringPlayerId: "",
  2551 |       aTierSafetyEligiblePlayerIds: [],
  2552 |       aTierSafetyCompletedPlayerIds: [],
  2553 |       adminWarnings: []
  2554 |     },
  2555 |     infoBattleTierRoller: {
  2556 |       tierId: "",
  2557 |       result: null
  2558 |     },
  2559 |     selectedWheelSessionId: "",
  2560 |     wheelDrawerOpen: false,
  2561 |     skipWheelAnimation: false,
  2562 |     encounterSessions: [],
  2563 |     selectedEncounterSessionId: "",
  2564 |     encounterModalOpen: false,
  2565 |     randomPokemonSessions: [],
  2566 |     pokemonFamilyTierCache: {},
  2567 |     pokemonSpriteVariants: {},
  2568 |     tokenArtLibrary: {},
  2569 |     selectedRandomPokemonSessionId: "",
  2570 |     randomPokemonDrawerOpen: false,
  2571 |     routeUiState: createDefaultRouteUiState(),
  2572 |     spriteAliases: {},
  2573 |     pokemonTierOverrides: {},
  2574 |     seriesOrder: [],
```


#### Hit 2 — line 3825

```text
  3813 | }
  3814 | 
  3815 | function tokenUseRollbackSnapshot() {
  3816 |   return {
  3817 |     previousPlayers: structuredClone(state.players || []),
  3818 |     previousPokemonRecords: structuredClone(state.pokemonRecords || []),
  3819 |     previousPokemonLog: structuredClone(state.pokemonLog || []),
  3820 |     previousLingeringStatuses: structuredClone(state.lingeringStatuses || []),
  3821 |     previousTokenActivations: structuredClone(state.tokenActivations || []),
  3822 |     previousTokenConsumptions: structuredClone(state.tokenConsumptions || []),
  3823 |     previousPlayerNotifications: structuredClone(state.playerNotifications || []),
  3824 |     previousWheelSessions: structuredClone(state.wheelSessions || []),
  3825 |     previousEncounterSessions: structuredClone(state.encounterSessions || []),
  3826 |     previousRandomPokemonSessions: structuredClone(state.randomPokemonSessions || []),
  3827 |     previousSelectedEncounterSessionId: state.selectedEncounterSessionId || "",
  3828 |     previousEncounterModalOpen: Boolean(state.encounterModalOpen),
  3829 |     previousInteractionEvents: structuredClone(state.interactionEvents || []),
  3830 |     previousTransactions: structuredClone(state.transactions || []),
  3831 |     previousGlobalPokemonRules: structuredClone(state.globalPokemonRules || {}),
  3832 |     previousBanlistHistory: structuredClone(state.banlistHistory || []),
  3833 |     previousTeambuilder: structuredClone(state.teambuilder || {}),
  3834 |     previousBattleTeams: structuredClone(state.battleTeams || {}),
  3835 |     previousPerkSystem: structuredClone(state.perkSystem || {}),
  3836 |     previousClassStateByPlayerId: structuredClone(state.classStateByPlayerId || {}),
  3837 |     previousPhaseState: structuredClone(state.phaseState || {}),
```


#### Hit 3 — line 4404

```text
  4392 |     moveGrantsByPlayer: causalPlayerCollectionDeltas(snapshot.previousPlayers, state.players, "moveAccessGrants"),
  4393 |     playerPokemonIdDeltas,
  4394 |     pokemonRecords: causalIdCollectionDelta(snapshot.previousPokemonRecords, state.pokemonRecords),
  4395 |     statuses: causalIdCollectionDelta(snapshot.previousLingeringStatuses, state.lingeringStatuses),
  4396 |     activations: causalIdCollectionDelta(snapshot.previousTokenActivations, state.tokenActivations),
  4397 |     consumptions: causalIdCollectionDelta(snapshot.previousTokenConsumptions, state.tokenConsumptions),
  4398 |     transactions: causalIdCollectionDelta(snapshot.previousTransactions, state.transactions),
  4399 |     notifications: causalIdCollectionDelta(snapshot.previousPlayerNotifications, state.playerNotifications),
  4400 |     effectOperations: causalIdCollectionDelta(snapshot.previousEffectOperations, state.effectOperations),
  4401 |     copiedActivations: causalIdCollectionDelta(snapshot.previousCopiedActivations, state.copiedActivations),
  4402 |     copiedTokenRelationships: causalIdCollectionDelta(snapshot.previousCopiedTokenRelationships, state.copiedTokenRelationships),
  4403 |     wheelSessions: causalIdCollectionDelta(snapshot.previousWheelSessions, state.wheelSessions),
  4404 |     encounterSessions: causalIdCollectionDelta(snapshot.previousEncounterSessions, state.encounterSessions),
  4405 |     randomPokemonSessions: causalIdCollectionDelta(snapshot.previousRandomPokemonSessions, state.randomPokemonSessions),
  4406 |     delayedEffects: causalIdCollectionDelta(snapshot.previousDelayedEffects, state.delayedEffects),
  4407 |     broughtTeamSnapshots: causalIdCollectionDelta(snapshot.previousBroughtTeamSnapshots, state.broughtTeamSnapshots),
  4408 |     postPayoutProcedures: causalIdCollectionDelta(snapshot.previousPostPayoutProcedures, state.postPayoutProcedures),
  4409 |     encounterCopyRecords: causalIdCollectionDelta(snapshot.previousEncounterCopyRecords, state.encounterCopyRecords),
  4410 |     teambuilderFields: causalTopLevelFieldDelta(snapshot.previousTeambuilder || {}, state.teambuilder || {}, ["moveAccessGrantsByPlayerId"]),
  4411 |     battleTeamFields: causalTopLevelFieldDelta(snapshot.previousBattleTeams || {}, state.battleTeams || {}),
  4412 |     pokemonDeltas,
  4413 |     pokemonLog: causalIdCollectionDelta(snapshot.previousPokemonLog || [], state.pokemonLog || []),
  4414 |     teambuilderMoveGrants: causalGrantMapDeltas(snapshot.previousTeambuilder?.moveAccessGrantsByPlayerId, state.teambuilder?.moveAccessGrantsByPlayerId),
  4415 |     perkMoveGrants: causalGrantMapDeltas(snapshot.previousPerkSystem?.moveAccessGrantsByPlayerId, state.perkSystem?.moveAccessGrantsByPlayerId),
  4416 |     classMoveGrants: causalGrantMapDeltas(
```


#### Hit 4 — line 4404

```text
  4392 |     moveGrantsByPlayer: causalPlayerCollectionDeltas(snapshot.previousPlayers, state.players, "moveAccessGrants"),
  4393 |     playerPokemonIdDeltas,
  4394 |     pokemonRecords: causalIdCollectionDelta(snapshot.previousPokemonRecords, state.pokemonRecords),
  4395 |     statuses: causalIdCollectionDelta(snapshot.previousLingeringStatuses, state.lingeringStatuses),
  4396 |     activations: causalIdCollectionDelta(snapshot.previousTokenActivations, state.tokenActivations),
  4397 |     consumptions: causalIdCollectionDelta(snapshot.previousTokenConsumptions, state.tokenConsumptions),
  4398 |     transactions: causalIdCollectionDelta(snapshot.previousTransactions, state.transactions),
  4399 |     notifications: causalIdCollectionDelta(snapshot.previousPlayerNotifications, state.playerNotifications),
  4400 |     effectOperations: causalIdCollectionDelta(snapshot.previousEffectOperations, state.effectOperations),
  4401 |     copiedActivations: causalIdCollectionDelta(snapshot.previousCopiedActivations, state.copiedActivations),
  4402 |     copiedTokenRelationships: causalIdCollectionDelta(snapshot.previousCopiedTokenRelationships, state.copiedTokenRelationships),
  4403 |     wheelSessions: causalIdCollectionDelta(snapshot.previousWheelSessions, state.wheelSessions),
  4404 |     encounterSessions: causalIdCollectionDelta(snapshot.previousEncounterSessions, state.encounterSessions),
  4405 |     randomPokemonSessions: causalIdCollectionDelta(snapshot.previousRandomPokemonSessions, state.randomPokemonSessions),
  4406 |     delayedEffects: causalIdCollectionDelta(snapshot.previousDelayedEffects, state.delayedEffects),
  4407 |     broughtTeamSnapshots: causalIdCollectionDelta(snapshot.previousBroughtTeamSnapshots, state.broughtTeamSnapshots),
  4408 |     postPayoutProcedures: causalIdCollectionDelta(snapshot.previousPostPayoutProcedures, state.postPayoutProcedures),
  4409 |     encounterCopyRecords: causalIdCollectionDelta(snapshot.previousEncounterCopyRecords, state.encounterCopyRecords),
  4410 |     teambuilderFields: causalTopLevelFieldDelta(snapshot.previousTeambuilder || {}, state.teambuilder || {}, ["moveAccessGrantsByPlayerId"]),
  4411 |     battleTeamFields: causalTopLevelFieldDelta(snapshot.previousBattleTeams || {}, state.battleTeams || {}),
  4412 |     pokemonDeltas,
  4413 |     pokemonLog: causalIdCollectionDelta(snapshot.previousPokemonLog || [], state.pokemonLog || []),
  4414 |     teambuilderMoveGrants: causalGrantMapDeltas(snapshot.previousTeambuilder?.moveAccessGrantsByPlayerId, state.teambuilder?.moveAccessGrantsByPlayerId),
  4415 |     perkMoveGrants: causalGrantMapDeltas(snapshot.previousPerkSystem?.moveAccessGrantsByPlayerId, state.perkSystem?.moveAccessGrantsByPlayerId),
  4416 |     classMoveGrants: causalGrantMapDeltas(
```


#### Hit 5 — line 4429

```text
  4417 |       Object.fromEntries(Object.entries(snapshot.previousClassStateByPlayerId || {}).map(([id, value]) => [id, value?.moveAccessGrants || []])),
  4418 |       Object.fromEntries(Object.entries(state.classStateByPlayerId || {}).map(([id, value]) => [id, value?.moveAccessGrants || []]))
  4419 |     ),
  4420 |     ruleDeltas,
  4421 |     banlistHistory: causalIdCollectionDelta(snapshot.previousBanlistHistory, state.banlistHistory)
  4422 |   };
  4423 | }
  4424 | 
  4425 | function mergeCausalTokenUndoData(base = {}, later = {}) {
  4426 |   const merged = structuredClone(base || {});
  4427 |   const collectionKeys = [
  4428 |     "pokemonRecords", "statuses", "activations", "consumptions", "transactions", "notifications",
  4429 |     "effectOperations", "copiedActivations", "copiedTokenRelationships", "wheelSessions", "encounterSessions",
  4430 |     "randomPokemonSessions", "delayedEffects", "broughtTeamSnapshots", "postPayoutProcedures",
  4431 |     "encounterCopyRecords", "pokemonLog", "banlistHistory"
  4432 |   ];
  4433 |   collectionKeys.forEach((key) => {
  4434 |     merged[key] = mergeCausalIdCollectionDelta(merged[key], later[key]);
  4435 |   });
  4436 |   const mergePlayerDeltas = (key) => {
  4437 |     const byPlayer = new Map((merged[key] || []).map((entry) => [entry.playerId, structuredClone(entry)]));
  4438 |     (later[key] || []).forEach((entry) => {
  4439 |       if (!byPlayer.has(entry.playerId)) byPlayer.set(entry.playerId, structuredClone(entry));
  4440 |       else byPlayer.get(entry.playerId).delta = mergeCausalIdCollectionDelta(byPlayer.get(entry.playerId).delta, entry.delta);
  4441 |     });
```


#### Hit 6 — line 4536

```text
  4524 |     if (player) player.pokemonIds = applyCausalScalarSetUndo(player.pokemonIds, delta);
  4525 |   });
  4526 |   state.pokemonRecords = applyCausalIdCollectionUndo(state.pokemonRecords, undoData.pokemonRecords);
  4527 |   state.lingeringStatuses = applyCausalIdCollectionUndo(state.lingeringStatuses, undoData.statuses);
  4528 |   state.tokenActivations = applyCausalIdCollectionUndo(state.tokenActivations, undoData.activations);
  4529 |   state.tokenConsumptions = applyCausalIdCollectionUndo(state.tokenConsumptions, undoData.consumptions);
  4530 |   state.transactions = applyCausalIdCollectionUndo(state.transactions, undoData.transactions);
  4531 |   state.playerNotifications = applyCausalIdCollectionUndo(state.playerNotifications, undoData.notifications);
  4532 |   state.effectOperations = applyCausalIdCollectionUndo(state.effectOperations, undoData.effectOperations);
  4533 |   state.copiedActivations = applyCausalIdCollectionUndo(state.copiedActivations, undoData.copiedActivations);
  4534 |   state.copiedTokenRelationships = applyCausalIdCollectionUndo(state.copiedTokenRelationships, undoData.copiedTokenRelationships);
  4535 |   state.wheelSessions = applyCausalIdCollectionUndo(state.wheelSessions, undoData.wheelSessions);
  4536 |   state.encounterSessions = applyCausalIdCollectionUndo(state.encounterSessions, undoData.encounterSessions);
  4537 |   state.randomPokemonSessions = applyCausalIdCollectionUndo(state.randomPokemonSessions, undoData.randomPokemonSessions);
  4538 |   state.delayedEffects = applyCausalIdCollectionUndo(state.delayedEffects, undoData.delayedEffects);
  4539 |   state.broughtTeamSnapshots = applyCausalIdCollectionUndo(state.broughtTeamSnapshots, undoData.broughtTeamSnapshots);
  4540 |   state.postPayoutProcedures = applyCausalIdCollectionUndo(state.postPayoutProcedures, undoData.postPayoutProcedures);
  4541 |   state.encounterCopyRecords = applyCausalIdCollectionUndo(state.encounterCopyRecords, undoData.encounterCopyRecords);
  4542 |   state.teambuilder ||= {};
  4543 |   applyCausalTopLevelFieldUndo(state.teambuilder, undoData.teambuilderFields);
  4544 |   state.battleTeams ||= {};
  4545 |   applyCausalTopLevelFieldUndo(state.battleTeams, undoData.battleTeamFields);
  4546 |   (undoData.pokemonDeltas || []).forEach((delta) => {
  4547 |     const pokemon = state.pokemonRecords.find((entry) => entry.id === delta.pokemonId);
  4548 |     if (!pokemon) return;
```


#### Hit 7 — line 4536

```text
  4524 |     if (player) player.pokemonIds = applyCausalScalarSetUndo(player.pokemonIds, delta);
  4525 |   });
  4526 |   state.pokemonRecords = applyCausalIdCollectionUndo(state.pokemonRecords, undoData.pokemonRecords);
  4527 |   state.lingeringStatuses = applyCausalIdCollectionUndo(state.lingeringStatuses, undoData.statuses);
  4528 |   state.tokenActivations = applyCausalIdCollectionUndo(state.tokenActivations, undoData.activations);
  4529 |   state.tokenConsumptions = applyCausalIdCollectionUndo(state.tokenConsumptions, undoData.consumptions);
  4530 |   state.transactions = applyCausalIdCollectionUndo(state.transactions, undoData.transactions);
  4531 |   state.playerNotifications = applyCausalIdCollectionUndo(state.playerNotifications, undoData.notifications);
  4532 |   state.effectOperations = applyCausalIdCollectionUndo(state.effectOperations, undoData.effectOperations);
  4533 |   state.copiedActivations = applyCausalIdCollectionUndo(state.copiedActivations, undoData.copiedActivations);
  4534 |   state.copiedTokenRelationships = applyCausalIdCollectionUndo(state.copiedTokenRelationships, undoData.copiedTokenRelationships);
  4535 |   state.wheelSessions = applyCausalIdCollectionUndo(state.wheelSessions, undoData.wheelSessions);
  4536 |   state.encounterSessions = applyCausalIdCollectionUndo(state.encounterSessions, undoData.encounterSessions);
  4537 |   state.randomPokemonSessions = applyCausalIdCollectionUndo(state.randomPokemonSessions, undoData.randomPokemonSessions);
  4538 |   state.delayedEffects = applyCausalIdCollectionUndo(state.delayedEffects, undoData.delayedEffects);
  4539 |   state.broughtTeamSnapshots = applyCausalIdCollectionUndo(state.broughtTeamSnapshots, undoData.broughtTeamSnapshots);
  4540 |   state.postPayoutProcedures = applyCausalIdCollectionUndo(state.postPayoutProcedures, undoData.postPayoutProcedures);
  4541 |   state.encounterCopyRecords = applyCausalIdCollectionUndo(state.encounterCopyRecords, undoData.encounterCopyRecords);
  4542 |   state.teambuilder ||= {};
  4543 |   applyCausalTopLevelFieldUndo(state.teambuilder, undoData.teambuilderFields);
  4544 |   state.battleTeams ||= {};
  4545 |   applyCausalTopLevelFieldUndo(state.battleTeams, undoData.battleTeamFields);
  4546 |   (undoData.pokemonDeltas || []).forEach((delta) => {
  4547 |     const pokemon = state.pokemonRecords.find((entry) => entry.id === delta.pokemonId);
  4548 |     if (!pokemon) return;
```


#### Hit 8 — line 4536

```text
  4524 |     if (player) player.pokemonIds = applyCausalScalarSetUndo(player.pokemonIds, delta);
  4525 |   });
  4526 |   state.pokemonRecords = applyCausalIdCollectionUndo(state.pokemonRecords, undoData.pokemonRecords);
  4527 |   state.lingeringStatuses = applyCausalIdCollectionUndo(state.lingeringStatuses, undoData.statuses);
  4528 |   state.tokenActivations = applyCausalIdCollectionUndo(state.tokenActivations, undoData.activations);
  4529 |   state.tokenConsumptions = applyCausalIdCollectionUndo(state.tokenConsumptions, undoData.consumptions);
  4530 |   state.transactions = applyCausalIdCollectionUndo(state.transactions, undoData.transactions);
  4531 |   state.playerNotifications = applyCausalIdCollectionUndo(state.playerNotifications, undoData.notifications);
  4532 |   state.effectOperations = applyCausalIdCollectionUndo(state.effectOperations, undoData.effectOperations);
  4533 |   state.copiedActivations = applyCausalIdCollectionUndo(state.copiedActivations, undoData.copiedActivations);
  4534 |   state.copiedTokenRelationships = applyCausalIdCollectionUndo(state.copiedTokenRelationships, undoData.copiedTokenRelationships);
  4535 |   state.wheelSessions = applyCausalIdCollectionUndo(state.wheelSessions, undoData.wheelSessions);
  4536 |   state.encounterSessions = applyCausalIdCollectionUndo(state.encounterSessions, undoData.encounterSessions);
  4537 |   state.randomPokemonSessions = applyCausalIdCollectionUndo(state.randomPokemonSessions, undoData.randomPokemonSessions);
  4538 |   state.delayedEffects = applyCausalIdCollectionUndo(state.delayedEffects, undoData.delayedEffects);
  4539 |   state.broughtTeamSnapshots = applyCausalIdCollectionUndo(state.broughtTeamSnapshots, undoData.broughtTeamSnapshots);
  4540 |   state.postPayoutProcedures = applyCausalIdCollectionUndo(state.postPayoutProcedures, undoData.postPayoutProcedures);
  4541 |   state.encounterCopyRecords = applyCausalIdCollectionUndo(state.encounterCopyRecords, undoData.encounterCopyRecords);
  4542 |   state.teambuilder ||= {};
  4543 |   applyCausalTopLevelFieldUndo(state.teambuilder, undoData.teambuilderFields);
  4544 |   state.battleTeams ||= {};
  4545 |   applyCausalTopLevelFieldUndo(state.battleTeams, undoData.battleTeamFields);
  4546 |   (undoData.pokemonDeltas || []).forEach((delta) => {
  4547 |     const pokemon = state.pokemonRecords.find((entry) => entry.id === delta.pokemonId);
  4548 |     if (!pokemon) return;
```


#### Hit 9 — line 22309

```text
 22297 |       series: nextState.activeWheelSession.series,
 22298 |       gym: Number(nextState.activeWheelSession.gym),
 22299 |       phase: "action",
 22300 |       status: "pending",
 22301 |       rolls: [],
 22302 |       createdAt: new Date().toISOString()
 22303 |     });
 22304 |   }
 22305 |   nextState.activeWheelSession = null;
 22306 |   nextState.selectedWheelSessionId ||= "";
 22307 |   nextState.wheelDrawerOpen = Boolean(nextState.wheelDrawerOpen);
 22308 |   nextState.skipWheelAnimation = Boolean(nextState.skipWheelAnimation);
 22309 |   nextState.encounterSessions ||= [];
 22310 |   nextState.encounterSessions.forEach((session) => {
 22311 |     session.status = ["pending", "review", "completed", "undone", "cancelled"].includes(session.status) ? session.status : "pending";
 22312 |     session.rolls ||= [];
 22313 |     session.removedEntryIds ||= [];
 22314 |     session.temporaryEntries ||= [];
 22315 |     session.weightOverrides ||= {};
 22316 |     session.weightEditing = Boolean(session.weightEditing);
 22317 |     session.resultSessionIds ||= [];
 22318 |     session.visualRotation = Number(session.visualRotation || 0);
 22319 |     session.isSpinning = false;
 22320 |     session.pendingEntryId = "";
 22321 |   });
```


#### Hit 10 — line 22310

```text
 22298 |       gym: Number(nextState.activeWheelSession.gym),
 22299 |       phase: "action",
 22300 |       status: "pending",
 22301 |       rolls: [],
 22302 |       createdAt: new Date().toISOString()
 22303 |     });
 22304 |   }
 22305 |   nextState.activeWheelSession = null;
 22306 |   nextState.selectedWheelSessionId ||= "";
 22307 |   nextState.wheelDrawerOpen = Boolean(nextState.wheelDrawerOpen);
 22308 |   nextState.skipWheelAnimation = Boolean(nextState.skipWheelAnimation);
 22309 |   nextState.encounterSessions ||= [];
 22310 |   nextState.encounterSessions.forEach((session) => {
 22311 |     session.status = ["pending", "review", "completed", "undone", "cancelled"].includes(session.status) ? session.status : "pending";
 22312 |     session.rolls ||= [];
 22313 |     session.removedEntryIds ||= [];
 22314 |     session.temporaryEntries ||= [];
 22315 |     session.weightOverrides ||= {};
 22316 |     session.weightEditing = Boolean(session.weightEditing);
 22317 |     session.resultSessionIds ||= [];
 22318 |     session.visualRotation = Number(session.visualRotation || 0);
 22319 |     session.isSpinning = false;
 22320 |     session.pendingEntryId = "";
 22321 |   });
 22322 |   nextState.selectedEncounterSessionId ||= "";
```


#### Hit 11 — line 34722

```text
 34710 |       serviceId: operation.serviceId || "",
 34711 |       committed: operation.committed !== false,
 34712 |       committedAt: operation.committedAt || operation.createdAt || new Date().toISOString(),
 34713 |       status: ["resolving", "completed", "cancelled"].includes(operation.status) ? operation.status : "resolving",
 34714 |       linkedFeatureType: operation.linkedFeatureType || "",
 34715 |       linkedFeatureSessionId: operation.linkedFeatureSessionId || "",
 34716 |       linkedPendingSituationId: operation.linkedPendingSituationId || "",
 34717 |       completedAt: operation.completedAt || "",
 34718 |       completionReason: operation.completionReason || ""
 34719 |     }));
 34720 |   gymState.actionOperations.forEach((operation) => {
 34721 |     if (operation.status !== "resolving" || operation.linkedFeatureType !== "encounter") return;
 34722 |     const encounterSession = (state.encounterSessions || []).find((session) => session.id === operation.linkedFeatureSessionId);
 34723 |     if (!encounterSessionReadyForAutomaticCompletion(encounterSession)) return;
 34724 |     const completedAt = encounterSession.completedAt || new Date().toISOString();
 34725 |     encounterSession.status = "completed";
 34726 |     encounterSession.completedAt = completedAt;
 34727 |     operation.status = "completed";
 34728 |     operation.completedAt = completedAt;
 34729 |     operation.completionReason = "encounter-results-obtained";
 34730 |     const visit = gymState.playerVisits?.[operation.playerId]?.find((entry) => entry.id === operation.visitId);
 34731 |     if (visit) visit.actionOperationStatus = "completed";
 34732 |     if (gymState.destinationCommit?.operationId === operation.id) {
 34733 |       gymState.destinationCommit.status = provisionalDeclarationRuntime.DESTINATION_STATES.COMPLETED;
 34734 |       gymState.destinationCommit.completedAt = completedAt;
```


#### Hit 12 — line 34898

```text
 34886 |   const operation = actionOperationForVisit(visitId);
 34887 |   if (!operation) return null;
 34888 |   if (featureType) operation.linkedFeatureType = featureType;
 34889 |   if (featureSessionId) operation.linkedFeatureSessionId = featureSessionId;
 34890 |   if (pendingSituationId) operation.linkedPendingSituationId = pendingSituationId;
 34891 |   return operation;
 34892 | }
 34893 | 
 34894 | function linkedActionOperationSession(operation) {
 34895 |   if (!operation?.linkedFeatureSessionId) return null;
 34896 |   const collections = {
 34897 |     wheel: state.wheelSessions,
 34898 |     encounter: state.encounterSessions,
 34899 |     "hidden-grotto": state.hiddenGrottoSessions,
 34900 |     "silph-co": state.silphCoSessions,
 34901 |     "bulletin-board": state.bulletinBoardSessions,
 34902 |     breeder: null,
 34903 |     "game-corner": state.gameCornerSessions,
 34904 |     "pokemon-center": state.pokemonCenterSessions,
 34905 |     graveyard: state.graveyardSessions,
 34906 |     "department-store": state.departmentStoreVisits,
 34907 |     pc: state.pcSessions
 34908 |   };
 34909 |   return (collections[operation.linkedFeatureType] || []).find((session) => session.id === operation.linkedFeatureSessionId) || null;
 34910 | }
```


#### Hit 13 — line 41750

```text
 41738 |   return (state.hiddenGrottoSessions || []).find((session) => session.playerId === playerId && ["type-choice", "pokemon-choice"].includes(session.status)) || null;
 41739 | }
 41740 | 
 41741 | function encounterWheelKey(series = state.series, gym = state.gym) {
 41742 |   return `${String(series || "").toLowerCase()}-gym-${Number(gym || 1)}`;
 41743 | }
 41744 | 
 41745 | function encounterWheelDefinition(series = state.series, gym = state.gym) {
 41746 |   return encounterWheelDefinitions[encounterWheelKey(series, gym)] || null;
 41747 | }
 41748 | 
 41749 | function pendingEncounterSessions() {
 41750 |   state.encounterSessions ||= [];
 41751 |   return state.encounterSessions.filter((session) => ["pending", "review"].includes(session.status));
 41752 | }
 41753 | 
 41754 | function selectedEncounterSession() {
 41755 |   const pending = pendingEncounterSessions();
 41756 |   if (!pending.length) return null;
 41757 |   let session = pending.find((entry) => entry.id === state.selectedEncounterSessionId);
 41758 |   if (!session) {
 41759 |     session = pending[0];
 41760 |     state.selectedEncounterSessionId = session.id;
 41761 |   }
 41762 |   return session;
```


#### Hit 14 — line 41751

```text
 41739 | }
 41740 | 
 41741 | function encounterWheelKey(series = state.series, gym = state.gym) {
 41742 |   return `${String(series || "").toLowerCase()}-gym-${Number(gym || 1)}`;
 41743 | }
 41744 | 
 41745 | function encounterWheelDefinition(series = state.series, gym = state.gym) {
 41746 |   return encounterWheelDefinitions[encounterWheelKey(series, gym)] || null;
 41747 | }
 41748 | 
 41749 | function pendingEncounterSessions() {
 41750 |   state.encounterSessions ||= [];
 41751 |   return state.encounterSessions.filter((session) => ["pending", "review"].includes(session.status));
 41752 | }
 41753 | 
 41754 | function selectedEncounterSession() {
 41755 |   const pending = pendingEncounterSessions();
 41756 |   if (!pending.length) return null;
 41757 |   let session = pending.find((entry) => entry.id === state.selectedEncounterSessionId);
 41758 |   if (!session) {
 41759 |     session = pending[0];
 41760 |     state.selectedEncounterSessionId = session.id;
 41761 |   }
 41762 |   return session;
 41763 | }
```


#### Hit 15 — line 41979

```text
 41967 |       const owner = state.players.find((player) => player.id === ownerId);
 41968 |       targets.push({
 41969 |         id: `random-pokemon:${session.id}`,
 41970 |         kind: "random-pokemon",
 41971 |         targetResultId: session.id,
 41972 |         ownerPlayerId: ownerId,
 41973 |         ownerName: owner?.name || "Unknown",
 41974 |         sourceLabel: session.sourceLabel || "Pokemon Result",
 41975 |         resultName: session.resultDisplayName || "Pending result",
 41976 |         meta: `${session.series || state.series} Gym ${session.gym || state.gym}`
 41977 |       });
 41978 |     });
 41979 |   (state.encounterSessions || [])
 41980 |     .filter((session) => ["pending", "review"].includes(session.status))
 41981 |     .forEach((session) => {
 41982 |       const owner = state.players.find((player) => player.id === session.playerId);
 41983 |       (session.rolls || [])
 41984 |         .filter((roll) => !roll.rosterPokemonId)
 41985 |         .forEach((roll) => {
 41986 |           targets.push({
 41987 |             id: `encounter-roll:${session.id}:${roll.id}`,
 41988 |             kind: "encounter-roll",
 41989 |             targetResultId: roll.id,
 41990 |             encounterSessionId: session.id,
 41991 |             ownerPlayerId: session.playerId,
```


#### Hit 16 — line 42045

```text
 42033 |       <span>${escapeHtml(target.sourceLabel)}</span>
 42034 |       <strong>${escapeHtml(target.resultName)}</strong>
 42035 |       <em>${escapeHtml(target.ownerName)} - ${escapeHtml(target.meta)}</em>
 42036 |     </button>
 42037 |   `).join("");
 42038 | }
 42039 | 
 42040 | async function rerollRandomPokemonResult({ targetResultId, actorPlayerId, mode = "result" }) {
 42041 |   const actor = state.players.find((player) => player.id === actorPlayerId);
 42042 |   if (!actor) return;
 42043 |   if (String(targetResultId || "").startsWith("encounter-roll:")) {
 42044 |     const [, sessionId, rollId] = targetResultId.split(":");
 42045 |     const session = (state.encounterSessions || []).find((entry) => entry.id === sessionId);
 42046 |     const roll = (session?.rolls || []).find((entry) => entry.id === rollId);
 42047 |     const effectiveMode = mode === "result" && roll?.specialEncounter && session?.playerId && session.playerId !== actor.id
 42048 |       ? "encounter"
 42049 |       : mode;
 42050 |     await rerollEncounterRoll(sessionId, rollId, { actorPlayerId: actor.id, mode: effectiveMode });
 42051 |     return;
 42052 |   }
 42053 |   const randomSessionId = String(targetResultId || "").replace(/^random-pokemon:/, "");
 42054 |   await rerollRandomPokemonSession(randomSessionId, { actorPlayerId: actor.id });
 42055 | }
 42056 | 
 42057 | function selectedRandomPokemonSession() {
```


#### Hit 17 — line 42221

```text
 42209 |   session.completedAt ||= new Date().toISOString();
 42210 |   (session.actionVisitIds || [session.actionVisitId]).filter(Boolean).forEach((visitId) => {
 42211 |     completeActionOperationForVisit(visitId, completionReason, session.series, session.gym);
 42212 |   });
 42213 |   const next = pendingEncounterSessions().find((entry) => entry.id !== session.id);
 42214 |   state.selectedEncounterSessionId = next?.id || "";
 42215 |   state.encounterModalOpen = Boolean(next);
 42216 |   return true;
 42217 | }
 42218 | 
 42219 | async function addEncounterRollToRoster(sessionId, rollId, { skipPendingGuard = false } = {}) {
 42220 |   if (!skipPendingGuard && !guardPendingEventBeforeAction("Accept Encounter Result", () => addEncounterRollToRoster(sessionId, rollId, { skipPendingGuard: true }))) return;
 42221 |   const session = (state.encounterSessions || []).find((entry) => entry.id === sessionId);
 42222 |   const roll = (session?.rolls || []).find((entry) => entry.id === rollId);
 42223 |   if (!session || !roll || roll.rosterPokemonId) return;
 42224 |   const player = state.players.find((entry) => entry.id === session.playerId) || activePlayer();
 42225 |   await hydrateEncounterRollSprite(roll);
 42226 |   await ensurePokemonBuildDataLoaded({ renderOnLoad: false });
 42227 |   const acquisition = resolvePokemonAcquisitionSpecies(roll.resultDisplayName || roll.resultPokemonName);
 42228 |   const receivedSprite = acquisition.receivedSpecies && teambuilderDataKey(acquisition.receivedSpecies) !== teambuilderDataKey(roll.resultDisplayName || roll.resultPokemonName)
 42229 |     ? await fetchStablePokemonSprite(acquisition.receivedSpecies)
 42230 |     : { spriteUrl: roll.resultSprite || "", spriteKey: roll.chosenSpriteKey || "" };
 42231 |   const pokemon = createPokemonRecord(player, roll.resultDisplayName || roll.resultPokemonName, "Encounter Wheel", {
 42232 |     rosterType: "Active",
 42233 |     receivedSpriteUrl: receivedSprite.spriteUrl || "",
```


#### Hit 18 — line 42263

```text
 42251 |       encounterRollId: roll.id,
 42252 |       encounterSessionId: session.id,
 42253 |       actionVisitId: session.actionVisitId,
 42254 |       timestamp: roll.addedAt
 42255 |     });
 42256 |   });
 42257 |   completeObtainedEncounterSession(session);
 42258 |   saveState();
 42259 |   render();
 42260 | }
 42261 | 
 42262 | async function rerollEncounterRoll(sessionId, rollId, options = {}) {
 42263 |   const session = (state.encounterSessions || []).find((entry) => entry.id === sessionId);
 42264 |   const roll = (session?.rolls || []).find((entry) => entry.id === rollId);
 42265 |   if (!session || !roll || roll.rosterPokemonId) return;
 42266 |   const player = state.players.find((entry) => entry.id === session.playerId) || activePlayer();
 42267 |   const actor = state.players.find((entry) => entry.id === (options.actorPlayerId || session.playerId)) || player;
 42268 |   if (!requirePrivatePrepAccess(actor, "reroll token")) return;
 42269 |   const rerollMode = options.mode || "result";
 42270 |   const freeRerollReason = actor.id === player.id ? encounterRollFreeRerollReason(player, roll) : "";
 42271 |   const tokenIndex = freeRerollReason ? -1 : playerRerollTokenIndex(actor);
 42272 |   if (!freeRerollReason && tokenIndex < 0) {
 42273 |     alert(`${actor.name} needs a Reroll Token.`);
 42274 |     return;
 42275 |   }
```


#### Hit 19 — line 42471

```text
 42459 |     receivedSpriteUrl: spriteUrl,
 42460 |     receivedSpriteKey: sprite.spriteKey || "",
 42461 |     sourceTier: randomSession.tierId,
 42462 |     acquisitionTier: randomSession.tierId,
 42463 |     gameCornerMetadata: choice
 42464 |   });
 42465 |   randomSession.status = "confirmed";
 42466 |   randomSession.confirmedAt = new Date().toISOString();
 42467 |   randomSession.rosterPokemonId = pokemon.id;
 42468 |   resolvePokemonResultTimingWindow(randomSession, "resolved");
 42469 |   augmentHoneyCausalUndoAfterAcquisition(randomSession, honeyAcquisitionSnapshot);
 42470 |   if (randomSession.sourceType === "encounter") {
 42471 |     const encounterSession = (state.encounterSessions || []).find((entry) => entry.id === randomSession.encounterSessionId);
 42472 |     if (encounterSession) {
 42473 |       const roll = (encounterSession.rolls || []).find((entry) => entry.id === randomSession.encounterRollId);
 42474 |       if (roll) {
 42475 |         roll.confirmedPokemonId = pokemon.id;
 42476 |         roll.confirmedAt = randomSession.confirmedAt;
 42477 |       }
 42478 |       updateEncounterActionLog(encounterSession, player, (entry) => {
 42479 |         appendLogCategory(entry, "pokemon");
 42480 |         appendUniqueLogValue(entry, "pokemonNames", randomSession.resultDisplayName);
 42481 |         appendGroupedLogDetail(entry, `Caught ${randomSession.resultDisplayName}.`);
 42482 |         entry.childEvents ||= [];
 42483 |         entry.childEvents.push({
```


#### Hit 20 — line 42576

```text
 42564 |   if (!player || !actor) return;
 42565 |   if (!requirePrivatePrepAccess(actor, "reroll token")) return;
 42566 |   const tokenIndex = playerRerollTokenIndex(actor);
 42567 |   if (tokenIndex < 0) {
 42568 |     alert(`${actor.name} needs a Reroll Token.`);
 42569 |     return;
 42570 |   }
 42571 |   const exactToken = actor.inventory[tokenIndex];
 42572 |   const sourceEffectId = options.sourceEffectId || `reroll:${exactToken.id}:${randomSession.id}`;
 42573 |   const duplicateOperation = rerollOperationForSource(sourceEffectId);
 42574 |   if (duplicateOperation) return duplicateOperation;
 42575 |   const encounterSession = randomSession.sourceType === "encounter"
 42576 |     ? (state.encounterSessions || []).find((entry) => entry.id === randomSession.encounterSessionId)
 42577 |     : null;
 42578 |   const available = encounterSession ? encounterEntriesForSession(encounterSession) : availablePokemonForGameCornerTier(randomSession.tierId);
 42579 |   if (!available.length) {
 42580 |     alert("No Pokemon are available in this result pool.");
 42581 |     return;
 42582 |   }
 42583 |   const causalBeforeReroll = tokenUseRollbackSnapshot();
 42584 |   const rerollToken = actor.inventory.splice(tokenIndex, 1)[0];
 42585 |   const previousResult = {
 42586 |     resultPokemonName: randomSession.resultPokemonName,
 42587 |     resultDisplayName: randomSession.resultDisplayName,
 42588 |     resultSprite: randomSession.resultSprite,
```


#### Hit 21 — line 42775

```text
 42763 |     `Fishing included: ${session.includeFishing ? "Yes" : "No"}`,
 42764 |     `Surf included: ${session.includeSurf ? "Yes" : "No"}`,
 42765 |     ...(session.removedEntryIds || []).map((id) => `Removed: ${id}`),
 42766 |     ...rolls.map((roll, index) => `Roll ${index + 1}: ${roll.resultDisplayName}`)
 42767 |   ];
 42768 |   entry.quantity = rolls.length;
 42769 |   entry.playerIds = [player.id];
 42770 |   entry.encounterSessionId = session.id;
 42771 |   return entry;
 42772 | }
 42773 | 
 42774 | function activeEncounterSessionForPlayer(playerId, series = state.series, gym = state.gym) {
 42775 |   return (state.encounterSessions || []).find((session) => session.playerId === playerId
 42776 |     && session.series === series
 42777 |     && Number(session.gym) === Number(gym)
 42778 |     && ["pending", "review"].includes(session.status));
 42779 | }
 42780 | 
 42781 | function startEncounterSession({ skipConfirmCheck = false } = {}) {
 42782 |   const player = activePlayer();
 42783 |   const location = actionLocationById("encounter");
 42784 |   const definition = encounterWheelDefinition();
 42785 |   if (!definition) {
 42786 |     alert("No Encounter Wheel is defined for this Series/Gym yet.");
 42787 |     return false;
```


#### Hit 22 — line 42797

```text
 42785 |   if (!definition) {
 42786 |     alert("No Encounter Wheel is defined for this Series/Gym yet.");
 42787 |     return false;
 42788 |   }
 42789 |   if (!skipConfirmCheck) {
 42790 |     const check = actionLocationCanConfirm(location, player.id, 1);
 42791 |     if (!check.ok) {
 42792 |       alert(check.reason);
 42793 |       return false;
 42794 |     }
 42795 |   }
 42796 |   const previousVisits = structuredClone(actionVisitsForPlayer(player.id));
 42797 |   const previousEncounterSessions = structuredClone(state.encounterSessions || []);
 42798 |   const previousRandomPokemonSessions = structuredClone(state.randomPokemonSessions || []);
 42799 |   const previousPokemonRecords = structuredClone(state.pokemonRecords || []);
 42800 |   const previousInventory = structuredClone(player.inventory || []);
 42801 |   const previousInteractionEventIds = (state.interactionEvents || []).map((activity) => activity.id).filter(Boolean);
 42802 |   const previousTransactionIds = (state.transactions || []).map((transaction) => transaction.id).filter(Boolean);
 42803 |   const visit = {
 42804 |     id: `action-visit-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
 42805 |     playerId: player.id,
 42806 |     locationId: "encounter",
 42807 |     locationName: "Encounter",
 42808 |     serviceId: "encounter-wheel",
 42809 |     serviceLabel: "Open Encounter Wheel",
```


#### Hit 23 — line 42818

```text
 42806 |     locationId: "encounter",
 42807 |     locationName: "Encounter",
 42808 |     serviceId: "encounter-wheel",
 42809 |     serviceLabel: "Open Encounter Wheel",
 42810 |     actionCost: 1,
 42811 |     series: state.series,
 42812 |     gym: Number(state.gym),
 42813 |     phase: currentPhase(),
 42814 |     createdAt: new Date().toISOString(),
 42815 |     placeholder: false
 42816 |   };
 42817 |   commitActionVisit(visit);
 42818 |   state.encounterSessions ||= [];
 42819 |   let session = activeEncounterSessionForPlayer(player.id);
 42820 |   const reusedSession = Boolean(session);
 42821 |   if (session) {
 42822 |     session.actionVisitIds ||= session.actionVisitId ? [session.actionVisitId] : [];
 42823 |     session.actionVisitIds.push(visit.id);
 42824 |     session.maxRolls = Number(session.maxRolls || 0) + Number(definition.rollsPerAction || 2);
 42825 |     if (session.status === "review") session.status = "pending";
 42826 |     session.updatedAt = new Date().toISOString();
 42827 |   } else {
 42828 |     session = {
 42829 |       id: `encounter-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
 42830 |       playerId: player.id,
```


#### Hit 24 — line 42849

```text
 42837 |       maxRolls: Number(definition.rollsPerAction || 2),
 42838 |       includeFishing: false,
 42839 |       includeSurf: false,
 42840 |       removedEntryIds: [],
 42841 |       temporaryEntries: [],
 42842 |       weightOverrides: {},
 42843 |       resultSessionIds: [],
 42844 |       rolls: [],
 42845 |       status: "pending",
 42846 |       visualRotation: 0,
 42847 |       createdAt: new Date().toISOString()
 42848 |     };
 42849 |     state.encounterSessions.unshift(session);
 42850 |   }
 42851 |   linkActionOperation(visit.id, { featureType: "encounter", featureSessionId: session.id });
 42852 |   state.selectedEncounterSessionId = session.id;
 42853 |   state.encounterModalOpen = true;
 42854 |   addLogEntry({
 42855 |     action: "phase",
 42856 |     category: "action",
 42857 |     player: player.name,
 42858 |     item: `${player.name} took action at Encounter`,
 42859 |     title: `${player.name} took action at Encounter`,
 42860 |     summary: `Spent 1 Action at Encounter\nRolled ${(session.rolls || []).length}/${session.maxRolls || 2} Encounters`,
 42861 |     details: [reusedSession ? "Added 2 more rolls to existing Encounter session" : "Spent 1 Action at Encounter"],
```


#### Hit 25 — line 46944

```text
 46932 |       ${session.tokenName ? `<p class="random-pokemon-token">Token pending: ${escapeHtml(session.tokenName)}</p>` : ""}
 46933 |       ${notes.length ? `<ul class="random-pokemon-notes">${notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}</ul>` : `<p class="random-pokemon-notes empty">No extra cost or requirement notes.</p>`}
 46934 |       <div class="random-pokemon-actions">
 46935 |         <button class="buy-button" type="button" data-confirm-random-pokemon="${escapeHtml(session.id)}">Confirm / Add Pokemon</button>
 46936 |         <button class="ghost-button" type="button" data-cancel-random-pokemon="${escapeHtml(session.id)}">Cancel Result</button>
 46937 |         <button class="ghost-button" type="button" data-reroll-random-pokemon="${escapeHtml(session.id)}"${rerollTokenCount ? "" : " disabled"} title="${rerollTokenCount ? `Spend ${player?.name || "the owner"}'s Reroll Token to replace this pending result.` : `${player?.name || "The owner"} needs a Reroll Token.`}">Owner Reroll${rerollTokenCount ? ` (${rerollTokenCount})` : " Token Required"}</button>
 46938 |       </div>
 46939 |     </article>
 46940 |   `;
 46941 | }
 46942 | 
 46943 | async function completeEncounterRoll(sessionId, entryId) {
 46944 |   const session = (state.encounterSessions || []).find((entry) => entry.id === sessionId);
 46945 |   if (!session || session.status !== "pending") return;
 46946 |   session.isSpinning = false;
 46947 |   session.pendingEntryId = "";
 46948 |   const player = state.players.find((entry) => entry.id === session.playerId) || activePlayer();
 46949 |   const entries = encounterEntriesForSession(session);
 46950 |   const visualResult = entries.find((entry) => entry.id === entryId) || weightedEncounterEntry(entries);
 46951 |   const { result, special } = resolveEncounterSpecialResult(visualResult);
 46952 |   if (!result || (session.rolls || []).length >= Number(session.maxRolls || 2)) return;
 46953 |   const roll = {
 46954 |     id: `encounter-roll-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
 46955 |     encounterSessionId: session.id,
 46956 |     actionVisitId: session.actionVisitIds?.[Math.floor((session.rolls || []).length / Number(encounterWheelDefinition(session.series, session.gym)?.rollsPerAction || 2))] || session.actionVisitId,
```


#### Hit 26 — line 47000

```text
 46988 |     });
 46989 |     if (special) appendGroupedLogDetail(entry, `${special.triggerName} opened ${special.wheelName}: ${special.resultName}.`);
 46990 |   });
 46991 |   if (session.rolls.length >= Number(session.maxRolls || 2)) {
 46992 |     session.status = "review";
 46993 |     session.completedAt = new Date().toISOString();
 46994 |   }
 46995 |   saveState();
 46996 |   render();
 46997 | }
 46998 | 
 46999 | function spinEncounterWheel(sessionId = state.selectedEncounterSessionId) {
 47000 |   const session = (state.encounterSessions || []).find((entry) => entry.id === sessionId);
 47001 |   if (!session || session.status !== "pending" || session.isSpinning) return;
 47002 |   if ((session.rolls || []).length >= Number(session.maxRolls || 2)) return;
 47003 |   const entries = encounterEntriesForSession(session);
 47004 |   if (!entries.length) {
 47005 |     alert("No valid Pokemon are available on this Encounter Wheel. Banned Pokemon are excluded.");
 47006 |     return;
 47007 |   }
 47008 |   const result = weightedEncounterEntry(entries);
 47009 |   if (!result) return;
 47010 |   session.pendingEntryId = result.id;
 47011 |   const nextRotation = nextEncounterLandingRotation(session, entries, result.id);
 47012 |   session.visualRotation = nextRotation;
```


#### Hit 27 — line 47045

```text
 47033 |   if (latestResult) {
 47034 |     latestResult.innerHTML = "<span>Passing</span><strong>Spinning...</strong>";
 47035 |   }
 47036 |   if (rollButton) {
 47037 |     rollButton.disabled = true;
 47038 |     rollButton.textContent = "Spinning...";
 47039 |   }
 47040 |   window.setTimeout(() => completeEncounterRoll(session.id, result.id), 5200);
 47041 | }
 47042 | 
 47043 | function closeEncounterSession(sessionId = state.selectedEncounterSessionId, { skipPendingGuard = false } = {}) {
 47044 |   if (!skipPendingGuard && !guardPendingEventBeforeAction("Close Encounter Session", () => closeEncounterSession(sessionId, { skipPendingGuard: true }))) return;
 47045 |   const session = (state.encounterSessions || []).find((entry) => entry.id === sessionId);
 47046 |   if (!session) return;
 47047 |   const unaddedRolls = (session.rolls || []).filter((roll) => !encounterRollWasObtained(roll));
 47048 |   if (unaddedRolls.length) {
 47049 |     alert("Add every Encounter result to the party before closing this Encounter session.");
 47050 |     state.encounterModalOpen = true;
 47051 |     state.selectedEncounterSessionId = session.id;
 47052 |     saveState();
 47053 |     renderEncounterOverlay();
 47054 |     return;
 47055 |   }
 47056 |   if (session.status === "pending" && (session.rolls || []).length < Number(session.maxRolls || 2)
 47057 |     && !confirm(`Finish this Encounter session with ${(session.rolls || []).length}/${session.maxRolls || 2} rolls used?`)) return;
```


#### Hit 28 — line 48544

```text
 48532 |   };
 48533 |   [
 48534 |     "log",
 48535 |     "effectAuditRecords",
 48536 |     "effectOperations",
 48537 |     "interactionEvents",
 48538 |     "transactions",
 48539 |     "tokenConsumptions",
 48540 |     "tokenActivations",
 48541 |     "playerNotifications",
 48542 |     "lingeringStatuses",
 48543 |     "randomPokemonSessions",
 48544 |     "encounterSessions",
 48545 |     "wheelSessions"
 48546 |   ].forEach((key) => markSandboxCollectionChanges(candidate, baseline, key, origin));
 48547 |   candidate.chronologyCounter = Number(candidate.chronologyCounter || 0) + 1;
 48548 |   candidate.log ||= [];
 48549 |   candidate.log.unshift({
 48550 |     id: `sandbox-commit-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
 48551 |     action: "admin",
 48552 |     category: "admin",
 48553 |     player: "Admin Tools",
 48554 |     item: `Committed Token Sandbox: ${info.scenarioName}`,
 48555 |     title: "Sandbox scenario committed",
 48556 |     summary: `Session ${info.id} entered real history after revision validation.`,
```


#### Hit 29 — line 50564

```text
 50552 |   const operation = currentActionOperation();
 50553 |   if (!operation) return "";
 50554 |   const owner = state.players.find((player) => player.id === operation.playerId);
 50555 |   const trainer = owner?.name || "The active trainer";
 50556 |   const location = operation.locationName || actionLocationById(operation.locationId)?.name || "their current Action";
 50557 |   return `${trainer} is still resolving ${location}. Finish or undo that Action before advancing phases.`;
 50558 | }
 50559 | 
 50560 | function honeyEligibleEncounterResults() {
 50561 |   return (state.randomPokemonSessions || []).filter((session) => {
 50562 |     if (session.sourceType !== "encounter" || session.status !== "confirmed") return false;
 50563 |     if (session.copiedFromRandomPokemonSessionId || session.sourceLabel === "Honey copied Encounter") return false;
 50564 |     const parent = (state.encounterSessions || []).find((entry) => entry.id === session.encounterSessionId);
 50565 |     return String(session.series || parent?.series || state.series) === String(state.series)
 50566 |       && Number(session.gym || parent?.gym || state.gym) === Number(state.gym);
 50567 |   });
 50568 | }
 50569 | 
 50570 | function ensureHoneyEndOfActionProcedures() {
 50571 |   state.endOfActionProcedures ||= [];
 50572 |   const eligible = honeyEligibleEncounterResults();
 50573 |   if (!eligible.length) return [];
 50574 |   const created = [];
 50575 |   state.players.forEach((player) => {
 50576 |     (player.inventory || []).forEach((item) => {
```


#### Hit 30 — line 61205

```text
 61193 | }
 61194 | 
 61195 | function restoreGameCornerTokenInventorySnapshot(undoData, player) {
 61196 |   if (!player || !undoData.previousInventory) return;
 61197 |   const previousGcTokens = structuredClone(undoData.previousInventory || []).filter(isGameCornerToken);
 61198 |   const currentNonGcInventory = (player.inventory || []).filter((item) => !isGameCornerToken(item));
 61199 |   player.inventory = [...previousGcTokens, ...currentNonGcInventory];
 61200 | }
 61201 | 
 61202 | function undoEncounterActionVisit(undoData) {
 61203 |   const player = state.players.find((candidate) => candidate.id === undoData.playerId);
 61204 |   if (player && undoData.previousInventory) player.inventory = structuredClone(undoData.previousInventory);
 61205 |   const session = (state.encounterSessions || []).find((entry) => entry.id === undoData.encounterSessionId);
 61206 |   if (!session) {
 61207 |     if (undoData.previousEncounterSessions) state.encounterSessions = structuredClone(undoData.previousEncounterSessions);
 61208 |     if (undoData.previousRandomPokemonSessions) state.randomPokemonSessions = structuredClone(undoData.previousRandomPokemonSessions);
 61209 |     if (undoData.previousPokemonRecords) state.pokemonRecords = structuredClone(undoData.previousPokemonRecords).map(normalizePokemonRecord);
 61210 |     if (undoData.previousInteractionEvents) {
 61211 |       state.interactionEvents = structuredClone(undoData.previousInteractionEvents);
 61212 |     } else if (Array.isArray(undoData.previousInteractionEventIds)) {
 61213 |       const previousIds = new Set(undoData.previousInteractionEventIds);
 61214 |       state.interactionEvents = (state.interactionEvents || []).filter((activity) => previousIds.has(activity.id));
 61215 |     }
 61216 |     if (undoData.previousTransactions) {
 61217 |       state.transactions = structuredClone(undoData.previousTransactions);
```


#### Hit 31 — line 61207

```text
 61195 | function restoreGameCornerTokenInventorySnapshot(undoData, player) {
 61196 |   if (!player || !undoData.previousInventory) return;
 61197 |   const previousGcTokens = structuredClone(undoData.previousInventory || []).filter(isGameCornerToken);
 61198 |   const currentNonGcInventory = (player.inventory || []).filter((item) => !isGameCornerToken(item));
 61199 |   player.inventory = [...previousGcTokens, ...currentNonGcInventory];
 61200 | }
 61201 | 
 61202 | function undoEncounterActionVisit(undoData) {
 61203 |   const player = state.players.find((candidate) => candidate.id === undoData.playerId);
 61204 |   if (player && undoData.previousInventory) player.inventory = structuredClone(undoData.previousInventory);
 61205 |   const session = (state.encounterSessions || []).find((entry) => entry.id === undoData.encounterSessionId);
 61206 |   if (!session) {
 61207 |     if (undoData.previousEncounterSessions) state.encounterSessions = structuredClone(undoData.previousEncounterSessions);
 61208 |     if (undoData.previousRandomPokemonSessions) state.randomPokemonSessions = structuredClone(undoData.previousRandomPokemonSessions);
 61209 |     if (undoData.previousPokemonRecords) state.pokemonRecords = structuredClone(undoData.previousPokemonRecords).map(normalizePokemonRecord);
 61210 |     if (undoData.previousInteractionEvents) {
 61211 |       state.interactionEvents = structuredClone(undoData.previousInteractionEvents);
 61212 |     } else if (Array.isArray(undoData.previousInteractionEventIds)) {
 61213 |       const previousIds = new Set(undoData.previousInteractionEventIds);
 61214 |       state.interactionEvents = (state.interactionEvents || []).filter((activity) => previousIds.has(activity.id));
 61215 |     }
 61216 |     if (undoData.previousTransactions) {
 61217 |       state.transactions = structuredClone(undoData.previousTransactions);
 61218 |     } else if (Array.isArray(undoData.previousTransactionIds)) {
 61219 |       const previousIds = new Set(undoData.previousTransactionIds);
```


#### Hit 32 — line 61255

```text
 61243 |   session.rolls = (session.rolls || []).filter((roll) => !rollIds.has(roll.id));
 61244 |   session.resultSessionIds = (session.resultSessionIds || []).filter((id) => !randomSessionIds.has(id));
 61245 |   session.actionVisitIds = visitIds.filter((id) => id !== undoData.visitId);
 61246 |   session.maxRolls = Math.max(0, Number(session.maxRolls || rollsPerAction) - rollsPerAction);
 61247 |   session.status = session.rolls.length >= Number(session.maxRolls || 0) ? "review" : "pending";
 61248 |   session.updatedAt = new Date().toISOString();
 61249 |   state.randomPokemonSessions = (state.randomPokemonSessions || []).filter((randomSession) => !randomSessionIds.has(randomSession.id));
 61250 |   state.interactionEvents = (state.interactionEvents || []).filter((activity) => !interactionIdsToRemove.has(activity.id));
 61251 |   state.transactions = (state.transactions || []).filter((transaction) => !interactionIdsToRemove.has(transaction.linkedEventId));
 61252 |   syncLinkedTransactions();
 61253 |   state.pokemonRecords = (state.pokemonRecords || []).filter((pokemon) => !pokemonIdsToRemove.has(pokemon.id));
 61254 |   if (!session.actionVisitIds.length && !(session.rolls || []).length) {
 61255 |     state.encounterSessions = (state.encounterSessions || []).filter((entry) => entry.id !== session.id);
 61256 |   } else if (player) {
 61257 |     updateEncounterActionLog(session, player);
 61258 |   }
 61259 |   if (state.selectedEncounterSessionId === undoData.encounterSessionId && !pendingEncounterSessions().some((entry) => entry.id === state.selectedEncounterSessionId)) {
 61260 |     state.selectedEncounterSessionId = "";
 61261 |     state.encounterModalOpen = false;
 61262 |   }
 61263 |   syncPlayerPokemonLists();
 61264 | }
 61265 | 
 61266 | function restoreTokenEffectContractUndoData(undoData) {
 61267 |   if (undoData.previousPlayers) state.players = structuredClone(undoData.previousPlayers);
```


#### Hit 33 — line 61255

```text
 61243 |   session.rolls = (session.rolls || []).filter((roll) => !rollIds.has(roll.id));
 61244 |   session.resultSessionIds = (session.resultSessionIds || []).filter((id) => !randomSessionIds.has(id));
 61245 |   session.actionVisitIds = visitIds.filter((id) => id !== undoData.visitId);
 61246 |   session.maxRolls = Math.max(0, Number(session.maxRolls || rollsPerAction) - rollsPerAction);
 61247 |   session.status = session.rolls.length >= Number(session.maxRolls || 0) ? "review" : "pending";
 61248 |   session.updatedAt = new Date().toISOString();
 61249 |   state.randomPokemonSessions = (state.randomPokemonSessions || []).filter((randomSession) => !randomSessionIds.has(randomSession.id));
 61250 |   state.interactionEvents = (state.interactionEvents || []).filter((activity) => !interactionIdsToRemove.has(activity.id));
 61251 |   state.transactions = (state.transactions || []).filter((transaction) => !interactionIdsToRemove.has(transaction.linkedEventId));
 61252 |   syncLinkedTransactions();
 61253 |   state.pokemonRecords = (state.pokemonRecords || []).filter((pokemon) => !pokemonIdsToRemove.has(pokemon.id));
 61254 |   if (!session.actionVisitIds.length && !(session.rolls || []).length) {
 61255 |     state.encounterSessions = (state.encounterSessions || []).filter((entry) => entry.id !== session.id);
 61256 |   } else if (player) {
 61257 |     updateEncounterActionLog(session, player);
 61258 |   }
 61259 |   if (state.selectedEncounterSessionId === undoData.encounterSessionId && !pendingEncounterSessions().some((entry) => entry.id === state.selectedEncounterSessionId)) {
 61260 |     state.selectedEncounterSessionId = "";
 61261 |     state.encounterModalOpen = false;
 61262 |   }
 61263 |   syncPlayerPokemonLists();
 61264 | }
 61265 | 
 61266 | function restoreTokenEffectContractUndoData(undoData) {
 61267 |   if (undoData.previousPlayers) state.players = structuredClone(undoData.previousPlayers);
```


#### Hit 34 — line 61275

```text
 61263 |   syncPlayerPokemonLists();
 61264 | }
 61265 | 
 61266 | function restoreTokenEffectContractUndoData(undoData) {
 61267 |   if (undoData.previousPlayers) state.players = structuredClone(undoData.previousPlayers);
 61268 |   if (undoData.previousPokemonRecords) state.pokemonRecords = structuredClone(undoData.previousPokemonRecords).map(normalizePokemonRecord);
 61269 |   if (undoData.previousPokemonLog) state.pokemonLog = structuredClone(undoData.previousPokemonLog);
 61270 |   if (undoData.previousLingeringStatuses) state.lingeringStatuses = structuredClone(undoData.previousLingeringStatuses);
 61271 |   if (undoData.previousTokenActivations) state.tokenActivations = structuredClone(undoData.previousTokenActivations);
 61272 |   if (undoData.previousTokenConsumptions) state.tokenConsumptions = structuredClone(undoData.previousTokenConsumptions);
 61273 |   if (undoData.previousPlayerNotifications) state.playerNotifications = structuredClone(undoData.previousPlayerNotifications);
 61274 |   if (undoData.previousWheelSessions) state.wheelSessions = structuredClone(undoData.previousWheelSessions);
 61275 |   if (undoData.previousEncounterSessions) state.encounterSessions = structuredClone(undoData.previousEncounterSessions);
 61276 |   if (undoData.previousRandomPokemonSessions) state.randomPokemonSessions = structuredClone(undoData.previousRandomPokemonSessions);
 61277 |   if (Object.prototype.hasOwnProperty.call(undoData, "previousSelectedEncounterSessionId")) {
 61278 |     state.selectedEncounterSessionId = undoData.previousSelectedEncounterSessionId || "";
 61279 |   }
 61280 |   if (Object.prototype.hasOwnProperty.call(undoData, "previousEncounterModalOpen")) {
 61281 |     state.encounterModalOpen = Boolean(undoData.previousEncounterModalOpen);
 61282 |   }
 61283 |   if (undoData.previousInteractionEvents) state.interactionEvents = structuredClone(undoData.previousInteractionEvents).map((activity) => normalizeInteractionActivity(activity, state));
 61284 |   if (undoData.previousTransactions) state.transactions = structuredClone(undoData.previousTransactions);
 61285 |   if (undoData.previousGlobalPokemonRules) state.globalPokemonRules = structuredClone(undoData.previousGlobalPokemonRules);
 61286 |   if (undoData.previousBanlistHistory) state.banlistHistory = structuredClone(undoData.previousBanlistHistory);
 61287 |   if (undoData.previousTeambuilder) state.teambuilder = structuredClone(undoData.previousTeambuilder);
```


### renderWheelPanel

Occurrences: 8

#### Hit 1 — line 35817

```text
 35805 |       wheelSessionId: session.id,
 35806 |       wheelId: wheel.id,
 35807 |       playerIds: [player.id]
 35808 |     });
 35809 |   }
 35810 |   saveState();
 35811 |   render();
 35812 | }
 35813 | 
 35814 | function closeWheelPanel() {
 35815 |   state.wheelDrawerOpen = false;
 35816 |   saveState();
 35817 |   renderWheelPanel();
 35818 | }
 35819 | 
 35820 | function actionStatusLabel(playerId) {
 35821 |   return `${actionUsedByPlayer(playerId)}/${actionPhaseRules.actionsPerPlayer}`;
 35822 | }
 35823 | 
 35824 | function actionLocationIcon(location) {
 35825 |   const icons = {
 35826 |     pokemon: "PK",
 35827 |     shop: "$",
 35828 |     utility: "RC",
 35829 |     tokens: "TK",
```


#### Hit 2 — line 47217

```text
 47205 |               <article class="encounter-entry">
 47206 |                 <div><strong>${escapeHtml(entry.displayName || entry.pokemonName)}</strong><span>${escapeHtml(entry.category || "land")}</span></div>
 47207 |                 <button class="ghost-button mini-button" type="button" data-encounter-restore="${escapeHtml(entry.id)}"${rolls.length ? " disabled" : ""}>Restore</button>
 47208 |               </article>
 47209 |             `).join("")}
 47210 |           </div>
 47211 |         ` : ""}
 47212 |       </section>
 47213 |     </div>
 47214 |   `;
 47215 | }
 47216 | 
 47217 | function renderWheelPanel() {
 47218 |   const active = activeWheelVisit();
 47219 |   const pending = pendingWheelSessions();
 47220 |   if (!pending.length) state.wheelDrawerOpen = false;
 47221 |   els.wheelTab.classList.toggle("hidden", !pending.length);
 47222 |   els.wheelTab.textContent = pending.length ? `Wheel (${pending.length})` : "Wheel";
 47223 |   els.wheelColumn.classList.toggle("drawer-open", Boolean(pending.length && state.wheelDrawerOpen));
 47224 |   els.wheelPanel.classList.toggle("open", Boolean(pending.length && state.wheelDrawerOpen));
 47225 |   els.wheelTab.setAttribute("aria-expanded", String(Boolean(pending.length && state.wheelDrawerOpen)));
 47226 |   if (!pending.length || !active) {
 47227 |     els.wheelSessionList.innerHTML = pending.length
 47228 |       ? pending.map((entry) => {
 47229 |         const entryWheel = wheelDefinitionById(entry.wheelId);
```


#### Hit 3 — line 47246

```text
 47234 |             <span>${escapeHtml(entryPlayer?.name || "Unknown")} - ${escapeHtml(entry.sourceLabel || "Pending")}</span>
 47235 |             <em>Needs refresh</em>
 47236 |           </button>
 47237 |         `;
 47238 |       }).join("")
 47239 |       : "";
 47240 |     els.wheelSessionDetail.classList.add("hidden");
 47241 |     if (pending.length) {
 47242 |       els.wheelSessionList.querySelectorAll("[data-session-id]").forEach((button) => {
 47243 |         button.addEventListener("click", () => {
 47244 |           state.selectedWheelSessionId = button.dataset.sessionId;
 47245 |           saveState();
 47246 |           renderWheelPanel();
 47247 |         });
 47248 |       });
 47249 |     }
 47250 |     return;
 47251 |   }
 47252 |   const { wheel, session, player } = active;
 47253 |   const rolls = session.rolls || [];
 47254 |   const cost = Number(wheel.cost?.amount || 0);
 47255 |   const max = Number(session.maxRolls || wheel.maxRollsPerVisit || Infinity);
 47256 |   const remaining = Number.isFinite(max) ? Math.max(0, max - rolls.length) : Infinity;
 47257 |   const canAfford = wheel.cost?.type !== "money" || Number(player.balance || 0) >= cost;
 47258 |   const isReviewing = session.status === "review";
```


#### Hit 4 — line 47283

```text
 47271 |     const button = document.createElement("button");
 47272 |     button.type = "button";
 47273 |     button.className = `wheel-session-card${entry.id === session.id ? " active" : ""}${entry.status === "review" ? " review" : ""}`;
 47274 |     button.dataset.sessionId = entry.id;
 47275 |     button.innerHTML = `
 47276 |       <strong>${escapeHtml(entryWheel?.name || "Wheel Session")}</strong>
 47277 |       <span>${escapeHtml(entryPlayer?.name || "Unknown")} - ${escapeHtml(entry.sourceLabel || "Action")} - ${entry.series} G${entry.gym}</span>
 47278 |       <em>${entry.status === "review" ? "Review results" : `${(entry.rolls || []).length}/${entry.maxRolls || entryWheel?.maxRollsPerVisit || "--"} spins`}</em>
 47279 |     `;
 47280 |     button.addEventListener("click", () => {
 47281 |       state.selectedWheelSessionId = entry.id;
 47282 |       saveState();
 47283 |       renderWheelPanel();
 47284 |     });
 47285 |     return button;
 47286 |   }));
 47287 |   els.wheelName.textContent = wheel.name;
 47288 |   els.wheelDescription.textContent = wheel.description;
 47289 |   els.wheelRollStatus.textContent = isReviewing ? "Results ready" : isSlotMachine ? `${rolls.length} spins completed` : Number.isFinite(max) ? `${rolls.length}/${max} rolls used` : `${rolls.length} rolls`;
 47290 |   els.wheelMeta.innerHTML = `
 47291 |     <div><span>Trainer</span><strong>${escapeHtml(player.name)}</strong></div>
 47292 |     ${session.targetPlayerId ? `<div><span>Target</span><strong>${escapeHtml(state.players.find((candidate) => candidate.id === session.targetPlayerId)?.name || player.name)}</strong></div>` : ""}
 47293 |     <div><span>Cost</span><strong>${cost ? formatMoney(cost) : "Free"}</strong></div>
 47294 |     <div><span>Rerollable</span><strong>${wheel.rerollable ? "Yes" : "No"}</strong></div>
 47295 |     <div><span>Balance</span><strong>${formatMoney(player.balance || 0)}</strong></div>
```


#### Hit 5 — line 50145

```text
 50133 |   }
 50134 |   renderPerkTestRoller();
 50135 |   if (state.activityLogCollapsed === false) {
 50136 |     renderActivityFilters();
 50137 |     renderLog();
 50138 |   }
 50139 |   renderActivityToasts();
 50140 |   renderActivityResponseDrawer();
 50141 |   renderLiveRefereePanel();
 50142 |   renderOpponentDrawer();
 50143 |   renderCart();
 50144 |   renderEncounterOverlay();
 50145 |   renderWheelPanel();
 50146 |   renderRandomPokemonPanel();
 50147 |   renderSiteShell();
 50148 |   syncTokenSandboxBanner();
 50149 |   if (actionPhaseStateRepairQueued && !backendSync.applyingRemote && !tokenScenarioSandboxActive()) {
 50150 |     actionPhaseStateRepairQueued = false;
 50151 |     saveState({ immediate: true, immediateBackend: true });
 50152 |   }
 50153 | }
 50154 | 
 50155 | function applyShopTheme(root, colors, contrast) {
 50156 |   const onBrand = colors.onBrand || "#ffffff";
 50157 |   const lightSurface = relativeLuminance(colors.surface) >= 0.62;
```


#### Hit 6 — line 63190

```text
 63178 |       currentCart().open = false;
 63179 |       saveState();
 63180 |       render();
 63181 |     }
 63182 |     if (state.opponentDrawer?.open && !event.target.closest("#opponentDrawer")) {
 63183 |       state.opponentDrawer.open = false;
 63184 |       saveState();
 63185 |       render();
 63186 |     }
 63187 |     if (state.wheelDrawerOpen && !event.target.closest("#wheelPanel") && !event.target.closest("#wheelTab")) {
 63188 |       state.wheelDrawerOpen = false;
 63189 |       saveState();
 63190 |       renderWheelPanel();
 63191 |     }
 63192 |     if (state.randomPokemonDrawerOpen && !event.target.closest("#randomPokemonPanel") && !event.target.closest("#randomPokemonTab")) {
 63193 |       state.randomPokemonDrawerOpen = false;
 63194 |       saveState();
 63195 |       renderRandomPokemonPanel();
 63196 |     }
 63197 |     if (!event.target.closest(".pokemon-action-menu")
 63198 |       && !event.target.closest(".pokemon-row")
 63199 |       && !event.target.closest(".actionable-pill")
 63200 |       && !event.target.closest(".actionable-row")) closePokemonActionMenu();
 63201 |   });
 63202 |   document.addEventListener("keydown", (event) => {
```


#### Hit 7 — line 63262

```text
 63250 |         currentCart().open = false;
 63251 |         saveState();
 63252 |         render();
 63253 |       }
 63254 |       if (state.opponentDrawer?.open) {
 63255 |         state.opponentDrawer.open = false;
 63256 |         saveState();
 63257 |         render();
 63258 |       }
 63259 |       if (state.wheelDrawerOpen) {
 63260 |         state.wheelDrawerOpen = false;
 63261 |         saveState();
 63262 |         renderWheelPanel();
 63263 |       }
 63264 |       if (state.randomPokemonDrawerOpen) {
 63265 |         state.randomPokemonDrawerOpen = false;
 63266 |         saveState();
 63267 |         renderRandomPokemonPanel();
 63268 |       }
 63269 |       if (state.encounterModalOpen) {
 63270 |         state.encounterModalOpen = false;
 63271 |         saveState();
 63272 |         renderEncounterOverlay();
 63273 |       }
 63274 |       els.phaseAgendaPanel.classList.add("hidden");
```


#### Hit 8 — line 63681

```text
 63669 |       return;
 63670 |     }
 63671 |     const randomCancelButton = event.target.closest("[data-cancel-random-pokemon]");
 63672 |     if (randomCancelButton && els.actionLocationMeta.contains(randomCancelButton)) {
 63673 |       event.preventDefault();
 63674 |       if (!randomCancelButton.disabled) cancelRandomPokemonSession(randomCancelButton.dataset.cancelRandomPokemon);
 63675 |       return;
 63676 |     }
 63677 |   });
 63678 |   els.wheelTab.addEventListener("click", () => {
 63679 |     state.wheelDrawerOpen = !state.wheelDrawerOpen;
 63680 |     saveState();
 63681 |     renderWheelPanel();
 63682 |   });
 63683 |   els.randomPokemonTab.addEventListener("click", () => {
 63684 |     state.randomPokemonDrawerOpen = !state.randomPokemonDrawerOpen;
 63685 |     saveState();
 63686 |     renderRandomPokemonPanel();
 63687 |   });
 63688 |   els.encounterTab?.addEventListener("click", () => {
 63689 |     state.encounterModalOpen = !state.encounterModalOpen;
 63690 |     saveState();
 63691 |     renderEncounterOverlay();
 63692 |   });
 63693 |   els.closeEncounterOverlay?.addEventListener("click", () => {
```


### encounterOverlay

Occurrences: 13

#### Hit 1 — line 18840

```text
 18828 |   wheelRollStatus: document.querySelector("#wheelRollStatus"),
 18829 |   wheelDescription: document.querySelector("#wheelDescription"),
 18830 |   wheelMeta: document.querySelector("#wheelMeta"),
 18831 |   wheelVisual: document.querySelector("#wheelVisual"),
 18832 |   wheelOutcomes: document.querySelector("#wheelOutcomes"),
 18833 |   wheelLatestResult: document.querySelector("#wheelLatestResult"),
 18834 |   spinWheel: document.querySelector("#spinWheel"),
 18835 |   finishWheelSession: document.querySelector("#finishWheelSession"),
 18836 |   skipWheelAnimation: document.querySelector("#skipWheelAnimation"),
 18837 |   closeWheelPanel: document.querySelector("#closeWheelPanel"),
 18838 |   wheelHistory: document.querySelector("#wheelHistory"),
 18839 |   encounterTab: document.querySelector("#encounterTab"),
 18840 |   encounterOverlay: document.querySelector("#encounterOverlay"),
 18841 |   closeEncounterOverlay: document.querySelector("#closeEncounterOverlay"),
 18842 |   encounterSessionList: document.querySelector("#encounterSessionList"),
 18843 |   encounterTitle: document.querySelector("#encounterTitle"),
 18844 |   encounterBody: document.querySelector("#encounterBody"),
 18845 |   randomPokemonColumn: document.querySelector("#randomPokemonColumn"),
 18846 |   randomPokemonTab: document.querySelector("#randomPokemonTab"),
 18847 |   randomPokemonPanel: document.querySelector("#randomPokemonPanel"),
 18848 |   closeRandomPokemonPanel: document.querySelector("#closeRandomPokemonPanel"),
 18849 |   randomPokemonSessionList: document.querySelector("#randomPokemonSessionList"),
 18850 |   randomPokemonSessionDetail: document.querySelector("#randomPokemonSessionDetail"),
 18851 |   rerollTargetModal: document.querySelector("#rerollTargetModal"),
 18852 |   closeRerollTargetModal: document.querySelector("#closeRerollTargetModal"),
```


#### Hit 2 — line 18840

```text
 18828 |   wheelRollStatus: document.querySelector("#wheelRollStatus"),
 18829 |   wheelDescription: document.querySelector("#wheelDescription"),
 18830 |   wheelMeta: document.querySelector("#wheelMeta"),
 18831 |   wheelVisual: document.querySelector("#wheelVisual"),
 18832 |   wheelOutcomes: document.querySelector("#wheelOutcomes"),
 18833 |   wheelLatestResult: document.querySelector("#wheelLatestResult"),
 18834 |   spinWheel: document.querySelector("#spinWheel"),
 18835 |   finishWheelSession: document.querySelector("#finishWheelSession"),
 18836 |   skipWheelAnimation: document.querySelector("#skipWheelAnimation"),
 18837 |   closeWheelPanel: document.querySelector("#closeWheelPanel"),
 18838 |   wheelHistory: document.querySelector("#wheelHistory"),
 18839 |   encounterTab: document.querySelector("#encounterTab"),
 18840 |   encounterOverlay: document.querySelector("#encounterOverlay"),
 18841 |   closeEncounterOverlay: document.querySelector("#closeEncounterOverlay"),
 18842 |   encounterSessionList: document.querySelector("#encounterSessionList"),
 18843 |   encounterTitle: document.querySelector("#encounterTitle"),
 18844 |   encounterBody: document.querySelector("#encounterBody"),
 18845 |   randomPokemonColumn: document.querySelector("#randomPokemonColumn"),
 18846 |   randomPokemonTab: document.querySelector("#randomPokemonTab"),
 18847 |   randomPokemonPanel: document.querySelector("#randomPokemonPanel"),
 18848 |   closeRandomPokemonPanel: document.querySelector("#closeRandomPokemonPanel"),
 18849 |   randomPokemonSessionList: document.querySelector("#randomPokemonSessionList"),
 18850 |   randomPokemonSessionDetail: document.querySelector("#randomPokemonSessionDetail"),
 18851 |   rerollTargetModal: document.querySelector("#rerollTargetModal"),
 18852 |   closeRerollTargetModal: document.querySelector("#closeRerollTargetModal"),
```


#### Hit 3 — line 41836

```text
 41824 |     const end = index === segments.length - 1 ? 360.000001 : segment.endAngle;
 41825 |     return angleUnderPointer >= segment.startAngle && angleUnderPointer < end;
 41826 |   }) || segments[segments.length - 1];
 41827 | }
 41828 | 
 41829 | function rotationFromTransform(transform) {
 41830 |   if (!transform || transform === "none") return 0;
 41831 |   const values = transform.match(/matrix\(([^)]+)\)/)?.[1]?.split(",").map((value) => Number(value.trim()));
 41832 |   if (!values || values.length < 2) return 0;
 41833 |   return Math.atan2(values[1], values[0]) * (180 / Math.PI);
 41834 | }
 41835 | 
 41836 | function updateEncounterLivePointerDisplay({ root = els.encounterOverlay, status = "Passing", finalName = "", finalMeta = "" } = {}) {
 41837 |   const display = root?.querySelector("[data-encounter-live-display]");
 41838 |   const wheelDisc = root?.querySelector(".encounter-wheel-visual .wheel-disc");
 41839 |   if (!display) return null;
 41840 |   const segments = JSON.parse(display.dataset.segments || "[]");
 41841 |   let segment = null;
 41842 |   if (finalName) {
 41843 |     segment = segments.find((entry) => entry.entryId === display.dataset.finalEntryId) || null;
 41844 |   } else {
 41845 |     if (!wheelDisc) return null;
 41846 |     segment = getEncounterSegmentAtPointer(rotationFromTransform(getComputedStyle(wheelDisc).transform), segments);
 41847 |   }
 41848 |   const name = finalName || segment?.displayName || "Ready";
```


#### Hit 4 — line 47019

```text
 47007 |   }
 47008 |   const result = weightedEncounterEntry(entries);
 47009 |   if (!result) return;
 47010 |   session.pendingEntryId = result.id;
 47011 |   const nextRotation = nextEncounterLandingRotation(session, entries, result.id);
 47012 |   session.visualRotation = nextRotation;
 47013 |   if (state.skipWheelAnimation) {
 47014 |     completeEncounterRoll(session.id, result.id);
 47015 |     return;
 47016 |   }
 47017 |   session.isSpinning = true;
 47018 |   saveState();
 47019 |   const wheelVisual = els.encounterOverlay?.querySelector(".encounter-wheel-visual");
 47020 |   const wheelDisc = wheelVisual?.querySelector(".wheel-disc");
 47021 |   const latestResult = els.encounterOverlay?.querySelector(".wheel-latest-result");
 47022 |   const rollButton = els.encounterOverlay?.querySelector(`[data-encounter-roll="${session.id}"]`);
 47023 |   const liveDisplay = els.encounterOverlay?.querySelector("[data-encounter-live-display]");
 47024 |   if (liveDisplay) liveDisplay.dataset.finalEntryId = result.id;
 47025 |   if (wheelVisual && wheelDisc) {
 47026 |     wheelVisual.classList.add("spinning");
 47027 |     wheelDisc.getBoundingClientRect();
 47028 |     wheelDisc.style.setProperty("--wheel-rotation", `${Number(nextRotation || 0)}deg`);
 47029 |     animateEncounterLivePointer(els.encounterOverlay, 5200);
 47030 |   } else {
 47031 |     renderEncounterOverlay();
```


#### Hit 5 — line 47021

```text
 47009 |   if (!result) return;
 47010 |   session.pendingEntryId = result.id;
 47011 |   const nextRotation = nextEncounterLandingRotation(session, entries, result.id);
 47012 |   session.visualRotation = nextRotation;
 47013 |   if (state.skipWheelAnimation) {
 47014 |     completeEncounterRoll(session.id, result.id);
 47015 |     return;
 47016 |   }
 47017 |   session.isSpinning = true;
 47018 |   saveState();
 47019 |   const wheelVisual = els.encounterOverlay?.querySelector(".encounter-wheel-visual");
 47020 |   const wheelDisc = wheelVisual?.querySelector(".wheel-disc");
 47021 |   const latestResult = els.encounterOverlay?.querySelector(".wheel-latest-result");
 47022 |   const rollButton = els.encounterOverlay?.querySelector(`[data-encounter-roll="${session.id}"]`);
 47023 |   const liveDisplay = els.encounterOverlay?.querySelector("[data-encounter-live-display]");
 47024 |   if (liveDisplay) liveDisplay.dataset.finalEntryId = result.id;
 47025 |   if (wheelVisual && wheelDisc) {
 47026 |     wheelVisual.classList.add("spinning");
 47027 |     wheelDisc.getBoundingClientRect();
 47028 |     wheelDisc.style.setProperty("--wheel-rotation", `${Number(nextRotation || 0)}deg`);
 47029 |     animateEncounterLivePointer(els.encounterOverlay, 5200);
 47030 |   } else {
 47031 |     renderEncounterOverlay();
 47032 |   }
 47033 |   if (latestResult) {
```


#### Hit 6 — line 47022

```text
 47010 |   session.pendingEntryId = result.id;
 47011 |   const nextRotation = nextEncounterLandingRotation(session, entries, result.id);
 47012 |   session.visualRotation = nextRotation;
 47013 |   if (state.skipWheelAnimation) {
 47014 |     completeEncounterRoll(session.id, result.id);
 47015 |     return;
 47016 |   }
 47017 |   session.isSpinning = true;
 47018 |   saveState();
 47019 |   const wheelVisual = els.encounterOverlay?.querySelector(".encounter-wheel-visual");
 47020 |   const wheelDisc = wheelVisual?.querySelector(".wheel-disc");
 47021 |   const latestResult = els.encounterOverlay?.querySelector(".wheel-latest-result");
 47022 |   const rollButton = els.encounterOverlay?.querySelector(`[data-encounter-roll="${session.id}"]`);
 47023 |   const liveDisplay = els.encounterOverlay?.querySelector("[data-encounter-live-display]");
 47024 |   if (liveDisplay) liveDisplay.dataset.finalEntryId = result.id;
 47025 |   if (wheelVisual && wheelDisc) {
 47026 |     wheelVisual.classList.add("spinning");
 47027 |     wheelDisc.getBoundingClientRect();
 47028 |     wheelDisc.style.setProperty("--wheel-rotation", `${Number(nextRotation || 0)}deg`);
 47029 |     animateEncounterLivePointer(els.encounterOverlay, 5200);
 47030 |   } else {
 47031 |     renderEncounterOverlay();
 47032 |   }
 47033 |   if (latestResult) {
 47034 |     latestResult.innerHTML = "<span>Passing</span><strong>Spinning...</strong>";
```


#### Hit 7 — line 47023

```text
 47011 |   const nextRotation = nextEncounterLandingRotation(session, entries, result.id);
 47012 |   session.visualRotation = nextRotation;
 47013 |   if (state.skipWheelAnimation) {
 47014 |     completeEncounterRoll(session.id, result.id);
 47015 |     return;
 47016 |   }
 47017 |   session.isSpinning = true;
 47018 |   saveState();
 47019 |   const wheelVisual = els.encounterOverlay?.querySelector(".encounter-wheel-visual");
 47020 |   const wheelDisc = wheelVisual?.querySelector(".wheel-disc");
 47021 |   const latestResult = els.encounterOverlay?.querySelector(".wheel-latest-result");
 47022 |   const rollButton = els.encounterOverlay?.querySelector(`[data-encounter-roll="${session.id}"]`);
 47023 |   const liveDisplay = els.encounterOverlay?.querySelector("[data-encounter-live-display]");
 47024 |   if (liveDisplay) liveDisplay.dataset.finalEntryId = result.id;
 47025 |   if (wheelVisual && wheelDisc) {
 47026 |     wheelVisual.classList.add("spinning");
 47027 |     wheelDisc.getBoundingClientRect();
 47028 |     wheelDisc.style.setProperty("--wheel-rotation", `${Number(nextRotation || 0)}deg`);
 47029 |     animateEncounterLivePointer(els.encounterOverlay, 5200);
 47030 |   } else {
 47031 |     renderEncounterOverlay();
 47032 |   }
 47033 |   if (latestResult) {
 47034 |     latestResult.innerHTML = "<span>Passing</span><strong>Spinning...</strong>";
 47035 |   }
```


#### Hit 8 — line 47029

```text
 47017 |   session.isSpinning = true;
 47018 |   saveState();
 47019 |   const wheelVisual = els.encounterOverlay?.querySelector(".encounter-wheel-visual");
 47020 |   const wheelDisc = wheelVisual?.querySelector(".wheel-disc");
 47021 |   const latestResult = els.encounterOverlay?.querySelector(".wheel-latest-result");
 47022 |   const rollButton = els.encounterOverlay?.querySelector(`[data-encounter-roll="${session.id}"]`);
 47023 |   const liveDisplay = els.encounterOverlay?.querySelector("[data-encounter-live-display]");
 47024 |   if (liveDisplay) liveDisplay.dataset.finalEntryId = result.id;
 47025 |   if (wheelVisual && wheelDisc) {
 47026 |     wheelVisual.classList.add("spinning");
 47027 |     wheelDisc.getBoundingClientRect();
 47028 |     wheelDisc.style.setProperty("--wheel-rotation", `${Number(nextRotation || 0)}deg`);
 47029 |     animateEncounterLivePointer(els.encounterOverlay, 5200);
 47030 |   } else {
 47031 |     renderEncounterOverlay();
 47032 |   }
 47033 |   if (latestResult) {
 47034 |     latestResult.innerHTML = "<span>Passing</span><strong>Spinning...</strong>";
 47035 |   }
 47036 |   if (rollButton) {
 47037 |     rollButton.disabled = true;
 47038 |     rollButton.textContent = "Spinning...";
 47039 |   }
 47040 |   window.setTimeout(() => completeEncounterRoll(session.id, result.id), 5200);
 47041 | }
```


#### Hit 9 — line 47073

```text
 47061 |     completeActionOperationForVisit(visitId, "encounter-session-closed");
 47062 |   });
 47063 |   const next = pendingEncounterSessions().find((entry) => entry.id !== session.id);
 47064 |   state.selectedEncounterSessionId = next?.id || "";
 47065 |   state.encounterModalOpen = Boolean(next);
 47066 |   saveState();
 47067 |   render();
 47068 | }
 47069 | 
 47070 | function renderEncounterOverlay() {
 47071 |   const pending = pendingEncounterSessions();
 47072 |   if (!pending.length) state.encounterModalOpen = false;
 47073 |   if (!els.encounterTab || !els.encounterOverlay || !els.encounterBody) return;
 47074 |   els.encounterTab.classList.toggle("hidden", !pending.length);
 47075 |   els.encounterTab.textContent = pending.length ? `Encounter (${pending.length})` : "Encounter";
 47076 |   const isOpen = Boolean(pending.length && state.encounterModalOpen);
 47077 |   els.encounterOverlay.classList.toggle("hidden", !isOpen);
 47078 |   els.encounterTab.setAttribute("aria-expanded", String(isOpen));
 47079 |   const session = selectedEncounterSession();
 47080 |   if (!pending.length || !session) {
 47081 |     els.encounterSessionList.innerHTML = "";
 47082 |     els.encounterBody.innerHTML = "";
 47083 |     return;
 47084 |   }
 47085 |   const definition = encounterWheelDefinition(session.series, session.gym);
```


#### Hit 10 — line 47077

```text
 47065 |   state.encounterModalOpen = Boolean(next);
 47066 |   saveState();
 47067 |   render();
 47068 | }
 47069 | 
 47070 | function renderEncounterOverlay() {
 47071 |   const pending = pendingEncounterSessions();
 47072 |   if (!pending.length) state.encounterModalOpen = false;
 47073 |   if (!els.encounterTab || !els.encounterOverlay || !els.encounterBody) return;
 47074 |   els.encounterTab.classList.toggle("hidden", !pending.length);
 47075 |   els.encounterTab.textContent = pending.length ? `Encounter (${pending.length})` : "Encounter";
 47076 |   const isOpen = Boolean(pending.length && state.encounterModalOpen);
 47077 |   els.encounterOverlay.classList.toggle("hidden", !isOpen);
 47078 |   els.encounterTab.setAttribute("aria-expanded", String(isOpen));
 47079 |   const session = selectedEncounterSession();
 47080 |   if (!pending.length || !session) {
 47081 |     els.encounterSessionList.innerHTML = "";
 47082 |     els.encounterBody.innerHTML = "";
 47083 |     return;
 47084 |   }
 47085 |   const definition = encounterWheelDefinition(session.series, session.gym);
 47086 |   const player = state.players.find((entry) => entry.id === session.playerId) || activePlayer();
 47087 |   const entries = encounterEntriesForSession(session);
 47088 |   const removedEntries = (definition?.entries || []).filter((entry) => (session.removedEntryIds || []).includes(entry.id));
 47089 |   const max = Number(session.maxRolls || definition?.rollsPerAction || 2);
```


#### Hit 11 — line 63698

```text
 63686 |     renderRandomPokemonPanel();
 63687 |   });
 63688 |   els.encounterTab?.addEventListener("click", () => {
 63689 |     state.encounterModalOpen = !state.encounterModalOpen;
 63690 |     saveState();
 63691 |     renderEncounterOverlay();
 63692 |   });
 63693 |   els.closeEncounterOverlay?.addEventListener("click", () => {
 63694 |     state.encounterModalOpen = false;
 63695 |     saveState();
 63696 |     renderEncounterOverlay();
 63697 |   });
 63698 |   els.encounterOverlay?.addEventListener("click", (event) => {
 63699 |     if (event.target === els.encounterOverlay) {
 63700 |       state.encounterModalOpen = false;
 63701 |       saveState();
 63702 |       renderEncounterOverlay();
 63703 |       return;
 63704 |     }
 63705 |     event.stopPropagation();
 63706 |     const sessionButton = event.target.closest("[data-encounter-session]");
 63707 |     if (sessionButton) {
 63708 |       state.selectedEncounterSessionId = sessionButton.dataset.encounterSession;
 63709 |       saveState();
 63710 |       renderEncounterOverlay();
```


#### Hit 12 — line 63699

```text
 63687 |   });
 63688 |   els.encounterTab?.addEventListener("click", () => {
 63689 |     state.encounterModalOpen = !state.encounterModalOpen;
 63690 |     saveState();
 63691 |     renderEncounterOverlay();
 63692 |   });
 63693 |   els.closeEncounterOverlay?.addEventListener("click", () => {
 63694 |     state.encounterModalOpen = false;
 63695 |     saveState();
 63696 |     renderEncounterOverlay();
 63697 |   });
 63698 |   els.encounterOverlay?.addEventListener("click", (event) => {
 63699 |     if (event.target === els.encounterOverlay) {
 63700 |       state.encounterModalOpen = false;
 63701 |       saveState();
 63702 |       renderEncounterOverlay();
 63703 |       return;
 63704 |     }
 63705 |     event.stopPropagation();
 63706 |     const sessionButton = event.target.closest("[data-encounter-session]");
 63707 |     if (sessionButton) {
 63708 |       state.selectedEncounterSessionId = sessionButton.dataset.encounterSession;
 63709 |       saveState();
 63710 |       renderEncounterOverlay();
 63711 |       return;
```


#### Hit 13 — line 63783

```text
 63771 |       renderEncounterOverlay();
 63772 |       return;
 63773 |     }
 63774 |     const restoreButton = event.target.closest("[data-encounter-restore]");
 63775 |     if (restoreButton) {
 63776 |       const session = selectedEncounterSession();
 63777 |       if (!session || (session.rolls || []).length) return;
 63778 |       session.removedEntryIds = (session.removedEntryIds || []).filter((id) => id !== restoreButton.dataset.encounterRestore);
 63779 |       saveState();
 63780 |       renderEncounterOverlay();
 63781 |     }
 63782 |   });
 63783 |   els.encounterOverlay?.addEventListener("input", (event) => {
 63784 |     const weightInput = event.target.closest("[data-encounter-weight]");
 63785 |     if (!weightInput) return;
 63786 |     const session = selectedEncounterSession();
 63787 |     if (!session || (session.rolls || []).length) return;
 63788 |     session.weightOverrides ||= {};
 63789 |     session.weightOverrides[weightInput.dataset.encounterWeight] = Math.max(0, Number(weightInput.value || 0));
 63790 |     saveState();
 63791 |   });
 63792 |   els.randomPokemonPanel.addEventListener("click", (event) => {
 63793 |     event.stopPropagation();
 63794 |     const sessionButton = event.target.closest("[data-random-pokemon-session]");
 63795 |     if (sessionButton) {
```


### hiddenGrottoSessions

Occurrences: 10

#### Hit 1 — line 2612

```text
  2600 |     battleTeams: {},
  2601 |     battleRevealGrants: [],
  2602 |     phaseState: {},
  2603 |     currentPhase: "start",
  2604 |     shopLevelTimingVersion: SHOP_LEVEL_TIMING_VERSION,
  2605 |     actionPhaseState: { selections: {}, seriesTrackers: {} },
  2606 |     gymResults: [],
  2607 |     seriesChampions: {},
  2608 |     gameCornerSessions: [],
  2609 |     gameCornerUnlocks: [],
  2610 |     breederDeposits: [],
  2611 |     dragonsDenSessions: [],
  2612 |     hiddenGrottoSessions: [],
  2613 |     silphCoSessions: [],
  2614 |     bulletinBoardSessions: [],
  2615 |     graveyardSessions: [],
  2616 |     departmentStoreVisits: [],
  2617 |     graveyardTokenOwnerFilter: "",
  2618 |     pcSessions: [],
  2619 |     rangerBaseSessions: [],
  2620 |     pokemonCenterSessions: [],
  2621 |     lingeringStatuses: [],
  2622 |     tokenActivations: [],
  2623 |     tokenConsumptions: [],
  2624 |     moneyLedger: [],
```


#### Hit 2 — line 22209

```text
 22197 |   nextState.liveRefereeDensityPreference = nextState.liveRefereeDensityPreference === "compact" ? "compact" : "comfortable";
 22198 |   nextState.liveRefereeUiScale = [0.9, 1, 1.1].includes(Number(nextState.liveRefereeUiScale)) ? Number(nextState.liveRefereeUiScale) : 1;
 22199 |   nextState.liveRefereeMotionPreference = nextState.liveRefereeMotionPreference === "reduced" ? "reduced" : "full";
 22200 |   nextState.activityToasts ||= [];
 22201 |   nextState.liveTable = normalizeLiveTableState(nextState.liveTable || {});
 22202 |   const toastCutoff = Date.now() - 30000;
 22203 |   nextState.activityToasts = nextState.activityToasts
 22204 |     .filter((toast) => new Date(toast.createdAt || 0).getTime() >= toastCutoff)
 22205 |     .slice(0, 5);
 22206 |   nextState.gameCornerSessions ||= [];
 22207 |   nextState.gameCornerUnlocks ||= [];
 22208 |   nextState.dragonsDenSessions ||= [];
 22209 |   nextState.hiddenGrottoSessions ||= [];
 22210 |   nextState.hiddenGrottoSessions.forEach((session) => {
 22211 |     session.status = ["type-choice", "pokemon-choice", "completed", "undone"].includes(session.status) ? session.status : "type-choice";
 22212 |     session.rolledTypes ||= [];
 22213 |     session.rolledPokemon ||= [];
 22214 |   });
 22215 |   nextState.silphCoSessions ||= [];
 22216 |   nextState.silphCoSessions.forEach((session) => {
 22217 |     session.status = ["pending-choice", "completed", "undone"].includes(session.status) ? session.status : "pending-choice";
 22218 |     session.rolledMoves ||= [];
 22219 |     session.rolledAbilities ||= [];
 22220 |     session.rerollHistory ||= [];
 22221 |   });
```


#### Hit 3 — line 22210

```text
 22198 |   nextState.liveRefereeUiScale = [0.9, 1, 1.1].includes(Number(nextState.liveRefereeUiScale)) ? Number(nextState.liveRefereeUiScale) : 1;
 22199 |   nextState.liveRefereeMotionPreference = nextState.liveRefereeMotionPreference === "reduced" ? "reduced" : "full";
 22200 |   nextState.activityToasts ||= [];
 22201 |   nextState.liveTable = normalizeLiveTableState(nextState.liveTable || {});
 22202 |   const toastCutoff = Date.now() - 30000;
 22203 |   nextState.activityToasts = nextState.activityToasts
 22204 |     .filter((toast) => new Date(toast.createdAt || 0).getTime() >= toastCutoff)
 22205 |     .slice(0, 5);
 22206 |   nextState.gameCornerSessions ||= [];
 22207 |   nextState.gameCornerUnlocks ||= [];
 22208 |   nextState.dragonsDenSessions ||= [];
 22209 |   nextState.hiddenGrottoSessions ||= [];
 22210 |   nextState.hiddenGrottoSessions.forEach((session) => {
 22211 |     session.status = ["type-choice", "pokemon-choice", "completed", "undone"].includes(session.status) ? session.status : "type-choice";
 22212 |     session.rolledTypes ||= [];
 22213 |     session.rolledPokemon ||= [];
 22214 |   });
 22215 |   nextState.silphCoSessions ||= [];
 22216 |   nextState.silphCoSessions.forEach((session) => {
 22217 |     session.status = ["pending-choice", "completed", "undone"].includes(session.status) ? session.status : "pending-choice";
 22218 |     session.rolledMoves ||= [];
 22219 |     session.rolledAbilities ||= [];
 22220 |     session.rerollHistory ||= [];
 22221 |   });
 22222 |   nextState.bulletinBoardSessions ||= [];
```


#### Hit 4 — line 34899

```text
 34887 |   if (!operation) return null;
 34888 |   if (featureType) operation.linkedFeatureType = featureType;
 34889 |   if (featureSessionId) operation.linkedFeatureSessionId = featureSessionId;
 34890 |   if (pendingSituationId) operation.linkedPendingSituationId = pendingSituationId;
 34891 |   return operation;
 34892 | }
 34893 | 
 34894 | function linkedActionOperationSession(operation) {
 34895 |   if (!operation?.linkedFeatureSessionId) return null;
 34896 |   const collections = {
 34897 |     wheel: state.wheelSessions,
 34898 |     encounter: state.encounterSessions,
 34899 |     "hidden-grotto": state.hiddenGrottoSessions,
 34900 |     "silph-co": state.silphCoSessions,
 34901 |     "bulletin-board": state.bulletinBoardSessions,
 34902 |     breeder: null,
 34903 |     "game-corner": state.gameCornerSessions,
 34904 |     "pokemon-center": state.pokemonCenterSessions,
 34905 |     graveyard: state.graveyardSessions,
 34906 |     "department-store": state.departmentStoreVisits,
 34907 |     pc: state.pcSessions
 34908 |   };
 34909 |   return (collections[operation.linkedFeatureType] || []).find((session) => session.id === operation.linkedFeatureSessionId) || null;
 34910 | }
 34911 | 
```


#### Hit 5 — line 39461

```text
 39449 |     `;
 39450 |   }
 39451 |   const pool = getHiddenGrottoPool(state.gym);
 39452 |   const availableTypes = hiddenGrottoAvailableTypes(state.gym);
 39453 |   const typeChoiceCards = hiddenGrottoTypes.map((type) => {
 39454 |     const eligible = getHiddenGrottoPool(state.gym, type);
 39455 |     return `
 39456 |       <button class="ghost-button grotto-type-direct-button" type="button" data-grotto-start-type="${escapeHtml(type)}"${eligible.length ? "" : " disabled"}>
 39457 |         ${escapeHtml(type)} <span>${eligible.length}</span>
 39458 |       </button>
 39459 |     `;
 39460 |   }).join("");
 39461 |   const recentSession = (state.hiddenGrottoSessions || []).find((entry) => entry.playerId === player.id
 39462 |     && entry.series === state.series
 39463 |     && Number(entry.gym) === Number(state.gym)
 39464 |     && entry.status === "completed"
 39465 |     && !entry.undone);
 39466 |   const recentPokemon = recentSession?.rosterPokemonId ? findPokemonRecord(recentSession.rosterPokemonId) : null;
 39467 |   return `
 39468 |     <div><span>Balance</span><strong>${formatMoney(player.balance || 0)}</strong></div>
 39469 |     <div><span>Cost</span><strong>${formatMoney(cost)}</strong></div>
 39470 |     <div><span>Current Gym Battle Tier</span><strong>${escapeHtml(formatPokemonBalanceTierLabel(naturalTier))}</strong></div>
 39471 |     <div><span>Hidden Grotto Tier Cap</span><strong>${escapeHtml(formatPokemonBalanceTierLabel(grottoTierCap))}</strong></div>
 39472 |     <div><span>Available Pokemon in Pool</span><strong>${pool.length}</strong></div>
 39473 |     <div><span>Available Types</span><strong>${availableTypes.length}</strong></div>
```


#### Hit 6 — line 40195

```text
 40183 |     alert(`No eligible ${directType} Pokemon are available for this Hidden Grotto tier pool after low-tier evolution filtering.`);
 40184 |     return;
 40185 |   }
 40186 |   const check = actionLocationCanConfirm(location, player.id, 1);
 40187 |   if (!check.ok) {
 40188 |     alert(check.reason);
 40189 |     return;
 40190 |   }
 40191 |   const previousVisits = structuredClone(actionVisitsForPlayer(player.id));
 40192 |   const previousBalance = Number(player.balance || 0);
 40193 |   const previousMoneyLedger = structuredClone(state.moneyLedger || []);
 40194 |   const previousPokemonRecords = structuredClone(state.pokemonRecords || []);
 40195 |   const previousHiddenGrottoSessions = structuredClone(state.hiddenGrottoSessions || []);
 40196 |   const visit = {
 40197 |     id: `action-visit-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
 40198 |     playerId: player.id,
 40199 |     locationId: "hidden-grotto",
 40200 |     locationName: "Hidden Grotto",
 40201 |     serviceId: "hidden-grotto-start",
 40202 |     serviceLabel: "Explore Hidden Grotto",
 40203 |     actionCost: 1,
 40204 |     series: state.series,
 40205 |     gym: Number(state.gym),
 40206 |     phase: currentPhase(),
 40207 |     createdAt: new Date().toISOString(),
```


#### Hit 7 — line 40245

```text
 40233 |     naturalTier,
 40234 |     targetTier,
 40235 |     tierStepBonus: HIDDEN_GROTTO_TIER_STEP_BONUS,
 40236 |     poolCount: pool.length,
 40237 |     rolledTypes,
 40238 |     chosenType: directType || null,
 40239 |     rolledPokemon: directType ? directTypeChoices : [],
 40240 |     chosenPokemon: null,
 40241 |     rosterPokemonId: "",
 40242 |     status: directType ? "pokemon-choice" : "type-choice",
 40243 |     createdAt: new Date().toISOString()
 40244 |   };
 40245 |   state.hiddenGrottoSessions ||= [];
 40246 |   state.hiddenGrottoSessions.unshift(session);
 40247 |   linkActionOperation(visit.id, { featureType: "hidden-grotto", featureSessionId: session.id });
 40248 |   addLogEntry({
 40249 |     action: "phase",
 40250 |     category: "action",
 40251 |     player: player.name,
 40252 |     item: `${player.name} explored Hidden Grotto`,
 40253 |     title: `${player.name} explored Hidden Grotto`,
 40254 |     summary: directType
 40255 |       ? `Spent 1 Action at Hidden Grotto\nSpent ${formatMoney(cost)}\nGrotto Tier Cap: ${formatPokemonBalanceTierLabel(targetTier)}\nChose ${directType}\nChoose 1 Pokemon`
 40256 |       : `Spent 1 Action at Hidden Grotto\nSpent ${formatMoney(cost)}\nGrotto Tier Cap: ${formatPokemonBalanceTierLabel(targetTier)}\nChoose a type`,
 40257 |     details: [
```


#### Hit 8 — line 40246

```text
 40234 |     targetTier,
 40235 |     tierStepBonus: HIDDEN_GROTTO_TIER_STEP_BONUS,
 40236 |     poolCount: pool.length,
 40237 |     rolledTypes,
 40238 |     chosenType: directType || null,
 40239 |     rolledPokemon: directType ? directTypeChoices : [],
 40240 |     chosenPokemon: null,
 40241 |     rosterPokemonId: "",
 40242 |     status: directType ? "pokemon-choice" : "type-choice",
 40243 |     createdAt: new Date().toISOString()
 40244 |   };
 40245 |   state.hiddenGrottoSessions ||= [];
 40246 |   state.hiddenGrottoSessions.unshift(session);
 40247 |   linkActionOperation(visit.id, { featureType: "hidden-grotto", featureSessionId: session.id });
 40248 |   addLogEntry({
 40249 |     action: "phase",
 40250 |     category: "action",
 40251 |     player: player.name,
 40252 |     item: `${player.name} explored Hidden Grotto`,
 40253 |     title: `${player.name} explored Hidden Grotto`,
 40254 |     summary: directType
 40255 |       ? `Spent 1 Action at Hidden Grotto\nSpent ${formatMoney(cost)}\nGrotto Tier Cap: ${formatPokemonBalanceTierLabel(targetTier)}\nChose ${directType}\nChoose 1 Pokemon`
 40256 |       : `Spent 1 Action at Hidden Grotto\nSpent ${formatMoney(cost)}\nGrotto Tier Cap: ${formatPokemonBalanceTierLabel(targetTier)}\nChoose a type`,
 40257 |     details: [
 40258 |       `Current Gym Battle Tier: ${formatPokemonBalanceTierLabel(naturalTier)}`,
```


#### Hit 9 — line 41738

```text
 41726 |     }));
 41727 | }
 41728 | 
 41729 | function hiddenGrottoAvailableTypes(gymNumber = state.gym) {
 41730 |   return hiddenGrottoTypes.filter((type) => getHiddenGrottoPool(gymNumber, type).length > 0);
 41731 | }
 41732 | 
 41733 | function pendingSilphCoSession(playerId = activePlayer().id) {
 41734 |   return (state.silphCoSessions || []).find((session) => session.playerId === playerId && session.status === "pending-choice") || null;
 41735 | }
 41736 | 
 41737 | function activeHiddenGrottoSession(playerId = activePlayer().id) {
 41738 |   return (state.hiddenGrottoSessions || []).find((session) => session.playerId === playerId && ["type-choice", "pokemon-choice"].includes(session.status)) || null;
 41739 | }
 41740 | 
 41741 | function encounterWheelKey(series = state.series, gym = state.gym) {
 41742 |   return `${String(series || "").toLowerCase()}-gym-${Number(gym || 1)}`;
 41743 | }
 41744 | 
 41745 | function encounterWheelDefinition(series = state.series, gym = state.gym) {
 41746 |   return encounterWheelDefinitions[encounterWheelKey(series, gym)] || null;
 41747 | }
 41748 | 
 41749 | function pendingEncounterSessions() {
 41750 |   state.encounterSessions ||= [];
```


#### Hit 10 — line 61424

```text
 61412 |     if (player && undoData.previousMoveAccessGrants) player.moveAccessGrants = structuredClone(undoData.previousMoveAccessGrants);
 61413 |     syncPlayerPokemonLists();
 61414 |   } else if (undoData.actionType === "undoHiddenGrottoAction") {
 61415 |     const key = actionPhaseKey(undoData.series, undoData.gym);
 61416 |     state.actionPhaseState ||= { selections: {}, seriesTrackers: {} };
 61417 |     state.actionPhaseState.selections ||= {};
 61418 |     state.actionPhaseState.selections[key] ||= { series: undoData.series, gym: undoData.gym, playerVisits: {} };
 61419 |     state.actionPhaseState.selections[key].playerVisits[undoData.playerId] = structuredClone(undoData.previousVisits || []);
 61420 |     const player = state.players.find((candidate) => candidate.id === undoData.playerId);
 61421 |     if (player) player.balance = Number(undoData.previousBalance ?? player.balance ?? 0);
 61422 |     if (undoData.previousMoneyLedger) state.moneyLedger = structuredClone(undoData.previousMoneyLedger);
 61423 |     if (undoData.previousPokemonRecords) state.pokemonRecords = structuredClone(undoData.previousPokemonRecords).map(normalizePokemonRecord);
 61424 |     if (undoData.previousHiddenGrottoSessions) state.hiddenGrottoSessions = structuredClone(undoData.previousHiddenGrottoSessions);
 61425 |     syncPlayerPokemonLists();
 61426 |   } else if (undoData.actionType === "undoEncounterAction") {
 61427 |     const key = actionPhaseKey(undoData.series, undoData.gym);
 61428 |     state.actionPhaseState ||= { selections: {}, seriesTrackers: {} };
 61429 |     state.actionPhaseState.selections ||= {};
 61430 |     state.actionPhaseState.selections[key] ||= { series: undoData.series, gym: undoData.gym, playerVisits: {} };
 61431 |     state.actionPhaseState.selections[key].playerVisits[undoData.playerId] = (state.actionPhaseState.selections[key].playerVisits[undoData.playerId] || [])
 61432 |       .filter((visit) => visit.id !== undoData.visitId);
 61433 |     undoEncounterActionVisit(undoData);
 61434 |   } else if (undoData.actionType === "undoActionVisit") {
 61435 |     const key = actionPhaseKey(undoData.series, undoData.gym);
 61436 |     state.actionPhaseState ||= { selections: {}, seriesTrackers: {} };
```


### hidden-grotto

Occurrences: 14

#### Hit 1 — line 2333

```text
  2321 |       name: "Pokemon Center",
  2322 |       category: "recovery",
  2323 |       actionCost: 1,
  2324 |       summary: "Remove Curse/Restrict effects, restore recent releases, or buy emergency immunity.",
  2325 |       effects: [
  2326 |         { type: "remove-curse", cost: 0, oncePerAction: true },
  2327 |         { type: "restrict-treatment", cost: 2000, oncePerAction: true },
  2328 |       { type: "restore-released-pokemon", releasesEligible: ["last-gym", "current-gym"], costsByGameCornerTier: { safari: 1000, poke: 2000, great: 3000, ultra: 4000, master: 5000 }, oncePerAction: true },
  2329 |         { type: "buy-token", token: "Emergency Immunity Token", cost: 4000, expires: "end-of-gym", oncePerAction: true }
  2330 |       ]
  2331 |     },
  2332 |     {
  2333 |       id: "hidden-grotto",
  2334 |       name: "Hidden Grotto",
  2335 |       category: "pokemon",
  2336 |       actionCost: 1,
  2337 |       cost: 1500,
  2338 |       summary: "Roll 3 types, choose one, then roll 3 Pokemon of that type from up to 2 Battle Tiers above the current Gym tier and choose one. LC/LC Elite Pokemon that can still evolve are excluded.",
  2339 |       effects: [{ type: "typed-tier-random-pokemon", typeRolls: 3, pokemonRolls: 3, usesNaturalTierCap: true, tierStepsAboveNaturalCap: HIDDEN_GROTTO_TIER_STEP_BONUS }]
  2340 |     },
  2341 |     {
  2342 |       id: "dragons-den",
  2343 |       name: "Dragon's Den",
  2344 |       category: "pokemon",
  2345 |       actionCost: 1,
```


#### Hit 2 — line 34899

```text
 34887 |   if (!operation) return null;
 34888 |   if (featureType) operation.linkedFeatureType = featureType;
 34889 |   if (featureSessionId) operation.linkedFeatureSessionId = featureSessionId;
 34890 |   if (pendingSituationId) operation.linkedPendingSituationId = pendingSituationId;
 34891 |   return operation;
 34892 | }
 34893 | 
 34894 | function linkedActionOperationSession(operation) {
 34895 |   if (!operation?.linkedFeatureSessionId) return null;
 34896 |   const collections = {
 34897 |     wheel: state.wheelSessions,
 34898 |     encounter: state.encounterSessions,
 34899 |     "hidden-grotto": state.hiddenGrottoSessions,
 34900 |     "silph-co": state.silphCoSessions,
 34901 |     "bulletin-board": state.bulletinBoardSessions,
 34902 |     breeder: null,
 34903 |     "game-corner": state.gameCornerSessions,
 34904 |     "pokemon-center": state.pokemonCenterSessions,
 34905 |     graveyard: state.graveyardSessions,
 34906 |     "department-store": state.departmentStoreVisits,
 34907 |     pc: state.pcSessions
 34908 |   };
 34909 |   return (collections[operation.linkedFeatureType] || []).find((session) => session.id === operation.linkedFeatureSessionId) || null;
 34910 | }
 34911 | 
```


#### Hit 3 — line 40156

```text
 40144 |     ].map((option) => `<article class="location-service-card"><div><strong>${escapeHtml(option.value)}</strong><p>${option.type === "ability" ? "Ability" : "Move"}</p></div><button class="buy-button mini-button" data-silph-select="${escapeHtml(development.pokemonId)}:${escapeHtml(option.type)}:${escapeHtml(option.value)}" ${development.status === "completed" ? "disabled" : ""}>Select</button></article>`).join("")}</div></section>`).join("")}`;
 40145 |   const eligible = silphEligiblePokemon(player.id);
 40146 |   return `
 40147 |     <div><span>Balance</span><strong>${formatMoney(player.balance || 0)}</strong></div>
 40148 |     <p class="gc-rule-note">Choose up to three eligible Pokémon. Costs use consolidated Battle Tier: Safari $1,000; Poké $2,000; Great $3,000; Ultra $4,000; Master $5,000.</p>
 40149 |     <label>Pokémon (Ctrl/Cmd-click for multiple)<select id="silphPokemonSelect" multiple size="${Math.min(8, Math.max(3, eligible.length))}">${eligible.map((pokemon) => { const tier = pokemonConsolidatedBattleTier(pokemon); const cost = globalThis.rivalSagaActionPhaseBalance.SILPH_COSTS[tier] || 0; return `<option value="${escapeHtml(pokemon.id)}">${escapeHtml(pokemon.name)} - ${escapeHtml(globalThis.rivalSagaActionPhaseBalance.tierLabel(tier) || "Tier required")} - ${cost ? formatMoney(cost) : "Unavailable"}</option>`; }).join("")}</select></label>
 40150 |     <div class="breeder-select-panel" data-silph-preview><span>Select one to three Pokémon.</span></div>
 40151 |     <button class="buy-button" type="button" data-silph-start ${eligible.length ? "" : "disabled"}>Start Silph Co. R&D</button>`;
 40152 | }
 40153 | 
 40154 | async function startHiddenGrottoSession({ chosenType = "" } = {}) {
 40155 |   const player = activePlayer();
 40156 |   const location = actionLocationById("hidden-grotto");
 40157 |   const cost = Number(location?.cost || 1500);
 40158 |   if (Number(player.balance || 0) < cost) {
 40159 |     alert(`Hidden Grotto costs ${formatMoney(cost)}. You do not have enough money.`);
 40160 |     return;
 40161 |   }
 40162 |   await ensurePokemonBuildDataLoaded({ renderOnLoad: false });
 40163 |   const naturalTier = getNaturalGymTier(state.gym);
 40164 |   const targetTier = getHiddenGrottoTierCap(state.gym);
 40165 |   const pool = getHiddenGrottoPool(state.gym);
 40166 |   const availableTypes = hiddenGrottoAvailableTypes(state.gym);
 40167 |   if (!pool.length || !availableTypes.length) {
 40168 |     alert(`No eligible Pokemon are currently available for Hidden Grotto at ${formatPokemonBalanceTierLabel(targetTier)} or lower.`);
```


#### Hit 4 — line 40199

```text
 40187 |   if (!check.ok) {
 40188 |     alert(check.reason);
 40189 |     return;
 40190 |   }
 40191 |   const previousVisits = structuredClone(actionVisitsForPlayer(player.id));
 40192 |   const previousBalance = Number(player.balance || 0);
 40193 |   const previousMoneyLedger = structuredClone(state.moneyLedger || []);
 40194 |   const previousPokemonRecords = structuredClone(state.pokemonRecords || []);
 40195 |   const previousHiddenGrottoSessions = structuredClone(state.hiddenGrottoSessions || []);
 40196 |   const visit = {
 40197 |     id: `action-visit-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
 40198 |     playerId: player.id,
 40199 |     locationId: "hidden-grotto",
 40200 |     locationName: "Hidden Grotto",
 40201 |     serviceId: "hidden-grotto-start",
 40202 |     serviceLabel: "Explore Hidden Grotto",
 40203 |     actionCost: 1,
 40204 |     series: state.series,
 40205 |     gym: Number(state.gym),
 40206 |     phase: currentPhase(),
 40207 |     createdAt: new Date().toISOString(),
 40208 |     placeholder: false
 40209 |   };
 40210 |   commitActionVisit(visit);
 40211 |   player.balance = previousBalance - cost;
```


#### Hit 5 — line 40201

```text
 40189 |     return;
 40190 |   }
 40191 |   const previousVisits = structuredClone(actionVisitsForPlayer(player.id));
 40192 |   const previousBalance = Number(player.balance || 0);
 40193 |   const previousMoneyLedger = structuredClone(state.moneyLedger || []);
 40194 |   const previousPokemonRecords = structuredClone(state.pokemonRecords || []);
 40195 |   const previousHiddenGrottoSessions = structuredClone(state.hiddenGrottoSessions || []);
 40196 |   const visit = {
 40197 |     id: `action-visit-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
 40198 |     playerId: player.id,
 40199 |     locationId: "hidden-grotto",
 40200 |     locationName: "Hidden Grotto",
 40201 |     serviceId: "hidden-grotto-start",
 40202 |     serviceLabel: "Explore Hidden Grotto",
 40203 |     actionCost: 1,
 40204 |     series: state.series,
 40205 |     gym: Number(state.gym),
 40206 |     phase: currentPhase(),
 40207 |     createdAt: new Date().toISOString(),
 40208 |     placeholder: false
 40209 |   };
 40210 |   commitActionVisit(visit);
 40211 |   player.balance = previousBalance - cost;
 40212 |   const ledgerEntry = addMoneyLedgerEntry(player, {
 40213 |     amount: -cost,
```


#### Hit 6 — line 40215

```text
 40203 |     actionCost: 1,
 40204 |     series: state.series,
 40205 |     gym: Number(state.gym),
 40206 |     phase: currentPhase(),
 40207 |     createdAt: new Date().toISOString(),
 40208 |     placeholder: false
 40209 |   };
 40210 |   commitActionVisit(visit);
 40211 |   player.balance = previousBalance - cost;
 40212 |   const ledgerEntry = addMoneyLedgerEntry(player, {
 40213 |     amount: -cost,
 40214 |     direction: "spend",
 40215 |     sourceType: "hidden-grotto",
 40216 |     sourceLabel: "Hidden Grotto",
 40217 |     note: "Hidden Grotto exploration",
 40218 |     balanceBefore: previousBalance,
 40219 |     balanceAfter: player.balance,
 40220 |     actionVisitId: visit.id,
 40221 |     sourceVisitId: visit.id
 40222 |   });
 40223 |   const rolledTypes = directType ? [directType] : randomUniqueSample(availableTypes, Math.min(3, availableTypes.length));
 40224 |   const session = {
 40225 |     id: `grotto-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
 40226 |     playerId: player.id,
 40227 |     series: state.series,
```


#### Hit 7 — line 40230

```text
 40218 |     balanceBefore: previousBalance,
 40219 |     balanceAfter: player.balance,
 40220 |     actionVisitId: visit.id,
 40221 |     sourceVisitId: visit.id
 40222 |   });
 40223 |   const rolledTypes = directType ? [directType] : randomUniqueSample(availableTypes, Math.min(3, availableTypes.length));
 40224 |   const session = {
 40225 |     id: `grotto-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
 40226 |     playerId: player.id,
 40227 |     series: state.series,
 40228 |     gym: Number(state.gym),
 40229 |     actionVisitId: visit.id,
 40230 |     locationId: "hidden-grotto",
 40231 |     cost,
 40232 |     ledgerEntryId: ledgerEntry.id,
 40233 |     naturalTier,
 40234 |     targetTier,
 40235 |     tierStepBonus: HIDDEN_GROTTO_TIER_STEP_BONUS,
 40236 |     poolCount: pool.length,
 40237 |     rolledTypes,
 40238 |     chosenType: directType || null,
 40239 |     rolledPokemon: directType ? directTypeChoices : [],
 40240 |     chosenPokemon: null,
 40241 |     rosterPokemonId: "",
 40242 |     status: directType ? "pokemon-choice" : "type-choice",
```


#### Hit 8 — line 40247

```text
 40235 |     tierStepBonus: HIDDEN_GROTTO_TIER_STEP_BONUS,
 40236 |     poolCount: pool.length,
 40237 |     rolledTypes,
 40238 |     chosenType: directType || null,
 40239 |     rolledPokemon: directType ? directTypeChoices : [],
 40240 |     chosenPokemon: null,
 40241 |     rosterPokemonId: "",
 40242 |     status: directType ? "pokemon-choice" : "type-choice",
 40243 |     createdAt: new Date().toISOString()
 40244 |   };
 40245 |   state.hiddenGrottoSessions ||= [];
 40246 |   state.hiddenGrottoSessions.unshift(session);
 40247 |   linkActionOperation(visit.id, { featureType: "hidden-grotto", featureSessionId: session.id });
 40248 |   addLogEntry({
 40249 |     action: "phase",
 40250 |     category: "action",
 40251 |     player: player.name,
 40252 |     item: `${player.name} explored Hidden Grotto`,
 40253 |     title: `${player.name} explored Hidden Grotto`,
 40254 |     summary: directType
 40255 |       ? `Spent 1 Action at Hidden Grotto\nSpent ${formatMoney(cost)}\nGrotto Tier Cap: ${formatPokemonBalanceTierLabel(targetTier)}\nChose ${directType}\nChoose 1 Pokemon`
 40256 |       : `Spent 1 Action at Hidden Grotto\nSpent ${formatMoney(cost)}\nGrotto Tier Cap: ${formatPokemonBalanceTierLabel(targetTier)}\nChoose a type`,
 40257 |     details: [
 40258 |       `Current Gym Battle Tier: ${formatPokemonBalanceTierLabel(naturalTier)}`,
 40259 |       `Hidden Grotto Tier Cap: ${formatPokemonBalanceTierLabel(targetTier)}`,
```


#### Hit 9 — line 40265

```text
 40253 |     title: `${player.name} explored Hidden Grotto`,
 40254 |     summary: directType
 40255 |       ? `Spent 1 Action at Hidden Grotto\nSpent ${formatMoney(cost)}\nGrotto Tier Cap: ${formatPokemonBalanceTierLabel(targetTier)}\nChose ${directType}\nChoose 1 Pokemon`
 40256 |       : `Spent 1 Action at Hidden Grotto\nSpent ${formatMoney(cost)}\nGrotto Tier Cap: ${formatPokemonBalanceTierLabel(targetTier)}\nChoose a type`,
 40257 |     details: [
 40258 |       `Current Gym Battle Tier: ${formatPokemonBalanceTierLabel(naturalTier)}`,
 40259 |       `Hidden Grotto Tier Cap: ${formatPokemonBalanceTierLabel(targetTier)}`,
 40260 |       `Available Pokemon in Pool: ${pool.length}`,
 40261 |       directType ? `Direct Type Choice: ${directType}` : `Rolled Types: ${rolledTypes.join(", ")}`,
 40262 |       directType ? `Eligible ${directType} Pool: ${directTypeOptions.length}` : "",
 40263 |       directType ? `Pokemon Choices: ${directTypeChoices.map((choice) => choice.displayName || choice.pokemonName).join(", ")}` : ""
 40264 |     ].filter(Boolean),
 40265 |     type: "hidden-grotto-action",
 40266 |     categories: ["action", "money", "pokemon"],
 40267 |     tags: ["hidden-grotto", "money"],
 40268 |     playerIds: [player.id],
 40269 |     moneyChanges: [{ amount: -cost, direction: "spend", ledgerEntryId: ledgerEntry.id, sourceType: "hidden-grotto" }],
 40270 |     actionVisitId: visit.id,
 40271 |     visitId: visit.id,
 40272 |     hiddenGrottoSessionId: session.id,
 40273 |     ledgerEntryIds: [ledgerEntry.id],
 40274 |     undoable: true,
 40275 |     undone: false,
 40276 |     undoData: {
 40277 |       actionType: "undoHiddenGrottoAction",
```


#### Hit 10 — line 40267

```text
 40255 |       ? `Spent 1 Action at Hidden Grotto\nSpent ${formatMoney(cost)}\nGrotto Tier Cap: ${formatPokemonBalanceTierLabel(targetTier)}\nChose ${directType}\nChoose 1 Pokemon`
 40256 |       : `Spent 1 Action at Hidden Grotto\nSpent ${formatMoney(cost)}\nGrotto Tier Cap: ${formatPokemonBalanceTierLabel(targetTier)}\nChoose a type`,
 40257 |     details: [
 40258 |       `Current Gym Battle Tier: ${formatPokemonBalanceTierLabel(naturalTier)}`,
 40259 |       `Hidden Grotto Tier Cap: ${formatPokemonBalanceTierLabel(targetTier)}`,
 40260 |       `Available Pokemon in Pool: ${pool.length}`,
 40261 |       directType ? `Direct Type Choice: ${directType}` : `Rolled Types: ${rolledTypes.join(", ")}`,
 40262 |       directType ? `Eligible ${directType} Pool: ${directTypeOptions.length}` : "",
 40263 |       directType ? `Pokemon Choices: ${directTypeChoices.map((choice) => choice.displayName || choice.pokemonName).join(", ")}` : ""
 40264 |     ].filter(Boolean),
 40265 |     type: "hidden-grotto-action",
 40266 |     categories: ["action", "money", "pokemon"],
 40267 |     tags: ["hidden-grotto", "money"],
 40268 |     playerIds: [player.id],
 40269 |     moneyChanges: [{ amount: -cost, direction: "spend", ledgerEntryId: ledgerEntry.id, sourceType: "hidden-grotto" }],
 40270 |     actionVisitId: visit.id,
 40271 |     visitId: visit.id,
 40272 |     hiddenGrottoSessionId: session.id,
 40273 |     ledgerEntryIds: [ledgerEntry.id],
 40274 |     undoable: true,
 40275 |     undone: false,
 40276 |     undoData: {
 40277 |       actionType: "undoHiddenGrottoAction",
 40278 |       visitId: visit.id,
 40279 |       playerId: player.id,
```


#### Hit 11 — line 40269

```text
 40257 |     details: [
 40258 |       `Current Gym Battle Tier: ${formatPokemonBalanceTierLabel(naturalTier)}`,
 40259 |       `Hidden Grotto Tier Cap: ${formatPokemonBalanceTierLabel(targetTier)}`,
 40260 |       `Available Pokemon in Pool: ${pool.length}`,
 40261 |       directType ? `Direct Type Choice: ${directType}` : `Rolled Types: ${rolledTypes.join(", ")}`,
 40262 |       directType ? `Eligible ${directType} Pool: ${directTypeOptions.length}` : "",
 40263 |       directType ? `Pokemon Choices: ${directTypeChoices.map((choice) => choice.displayName || choice.pokemonName).join(", ")}` : ""
 40264 |     ].filter(Boolean),
 40265 |     type: "hidden-grotto-action",
 40266 |     categories: ["action", "money", "pokemon"],
 40267 |     tags: ["hidden-grotto", "money"],
 40268 |     playerIds: [player.id],
 40269 |     moneyChanges: [{ amount: -cost, direction: "spend", ledgerEntryId: ledgerEntry.id, sourceType: "hidden-grotto" }],
 40270 |     actionVisitId: visit.id,
 40271 |     visitId: visit.id,
 40272 |     hiddenGrottoSessionId: session.id,
 40273 |     ledgerEntryIds: [ledgerEntry.id],
 40274 |     undoable: true,
 40275 |     undone: false,
 40276 |     undoData: {
 40277 |       actionType: "undoHiddenGrottoAction",
 40278 |       visitId: visit.id,
 40279 |       playerId: player.id,
 40280 |       hiddenGrottoSessionId: session.id,
 40281 |       series: state.series,
```


#### Hit 12 — line 40321

```text
 40309 |   session.tierStepBonus = HIDDEN_GROTTO_TIER_STEP_BONUS;
 40310 |   const entry = (state.log || []).find((logEntry) => logEntry.hiddenGrottoSessionId === session.id);
 40311 |   if (entry) {
 40312 |     entry.summary = `Spent 1 Action at Hidden Grotto\nSpent ${formatMoney(session.cost)}\nGrotto Tier Cap: ${formatPokemonBalanceTierLabel(session.targetTier)}\nChose ${type}\nChoose 1 Pokemon`;
 40313 |     entry.details = [
 40314 |       `Current Gym Battle Tier: ${formatPokemonBalanceTierLabel(session.naturalTier)}`,
 40315 |       `Hidden Grotto Tier Cap: ${formatPokemonBalanceTierLabel(session.targetTier)}`,
 40316 |       `Rolled Types: ${session.rolledTypes.join(", ")}`,
 40317 |       `Chosen Type: ${type}`,
 40318 |       `Eligible ${type} Pool: ${options.length}`,
 40319 |       `Pokemon Choices: ${choices.map((choice) => choice.displayName || choice.pokemonName).join(", ")}`
 40320 |     ];
 40321 |     appendUniqueLogValue(entry, "tags", "hidden-grotto-pokemon-choice");
 40322 |   }
 40323 |   saveState();
 40324 |   render();
 40325 | }
 40326 | 
 40327 | async function chooseHiddenGrottoPokemon(name) {
 40328 |   const player = activePlayer();
 40329 |   const session = activeHiddenGrottoSession(player.id);
 40330 |   if (!session || session.status !== "pokemon-choice") return;
 40331 |   const choice = (session.rolledPokemon || []).find((pokemon) => pokemon.displayName === name || pokemon.pokemonName === name);
 40332 |   if (!choice) return;
 40333 |   await ensurePokemonBuildDataLoaded({ renderOnLoad: false });
```


#### Hit 13 — line 40362

```text
 40350 |     entry.summary = `Spent 1 Action at Hidden Grotto\nSpent ${formatMoney(session.cost)}\nChose ${session.chosenType} Type\nCaught ${session.chosenPokemon}`;
 40351 |     entry.details = [
 40352 |       `Current Gym Battle Tier: ${formatPokemonBalanceTierLabel(session.naturalTier || getNaturalGymTier(session.gym))}`,
 40353 |       `Hidden Grotto Tier Cap: ${formatPokemonBalanceTierLabel(session.targetTier || getHiddenGrottoTierCap(session.gym))}`,
 40354 |       `Rolled Types: ${session.rolledTypes.join(", ")}`,
 40355 |       `Chosen Type: ${session.chosenType}`,
 40356 |       `Pokemon Choices: ${(session.rolledPokemon || []).map((pokemon) => pokemon.displayName).join(", ")}`,
 40357 |       `Chosen Pokemon: ${session.chosenPokemon}`,
 40358 |       `Battle Tier: ${pokemonBattleTierSummary(session.chosenPokemon, "Unassigned").replace(/^Battle:\s*/, "")}`,
 40359 |       `Types: ${(choice.types || []).join(" / ") || "Unknown"}`
 40360 |     ];
 40361 |     appendUniqueLogValue(entry, "pokemonNames", session.chosenPokemon);
 40362 |     appendUniqueLogValue(entry, "tags", "hidden-grotto-result");
 40363 |   }
 40364 |   completeActionOperationForVisit(session.actionVisitId, "hidden-grotto-choice-complete");
 40365 |   saveState();
 40366 |   render();
 40367 | }
 40368 | 
 40369 | function renderBulletinBoardDetails(location, player) {
 40370 |   const session = currentBulletinSession(player.id);
 40371 |   const canTake = !session;
 40372 |   const rerollTokenCount = (player.inventory || []).filter(isRerollToken).length;
 40373 |   const questCounts = session?.quests?.reduce((counts, quest) => {
 40374 |     counts[bulletinQuestStatusLabel(quest).toLowerCase()] = (counts[bulletinQuestStatusLabel(quest).toLowerCase()] || 0) + 1;
```


#### Hit 14 — line 40364

```text
 40352 |       `Current Gym Battle Tier: ${formatPokemonBalanceTierLabel(session.naturalTier || getNaturalGymTier(session.gym))}`,
 40353 |       `Hidden Grotto Tier Cap: ${formatPokemonBalanceTierLabel(session.targetTier || getHiddenGrottoTierCap(session.gym))}`,
 40354 |       `Rolled Types: ${session.rolledTypes.join(", ")}`,
 40355 |       `Chosen Type: ${session.chosenType}`,
 40356 |       `Pokemon Choices: ${(session.rolledPokemon || []).map((pokemon) => pokemon.displayName).join(", ")}`,
 40357 |       `Chosen Pokemon: ${session.chosenPokemon}`,
 40358 |       `Battle Tier: ${pokemonBattleTierSummary(session.chosenPokemon, "Unassigned").replace(/^Battle:\s*/, "")}`,
 40359 |       `Types: ${(choice.types || []).join(" / ") || "Unknown"}`
 40360 |     ];
 40361 |     appendUniqueLogValue(entry, "pokemonNames", session.chosenPokemon);
 40362 |     appendUniqueLogValue(entry, "tags", "hidden-grotto-result");
 40363 |   }
 40364 |   completeActionOperationForVisit(session.actionVisitId, "hidden-grotto-choice-complete");
 40365 |   saveState();
 40366 |   render();
 40367 | }
 40368 | 
 40369 | function renderBulletinBoardDetails(location, player) {
 40370 |   const session = currentBulletinSession(player.id);
 40371 |   const canTake = !session;
 40372 |   const rerollTokenCount = (player.inventory || []).filter(isRerollToken).length;
 40373 |   const questCounts = session?.quests?.reduce((counts, quest) => {
 40374 |     counts[bulletinQuestStatusLabel(quest).toLowerCase()] = (counts[bulletinQuestStatusLabel(quest).toLowerCase()] || 0) + 1;
 40375 |     return counts;
 40376 |   }, {}) || {};
```


### Hidden Grotto

Occurrences: 31

#### Hit 1 — line 1155

```text
  1143 |   {
  1144 |     "id": "tera-specialist",
  1145 |     "name": "Tera Specialist",
  1146 |     "tier": "B",
  1147 |     "description": "You May Assign One Tera Type To One Pokemon On Your Battle Phase Team Without Owning That Tera Type.",
  1148 |     "isConsumable": false,
  1149 |     "uses": null
  1150 |   },
  1151 |   {
  1152 |     "id": "grotto-regular",
  1153 |     "name": "Grotto Regular",
  1154 |     "tier": "C",
  1155 |     "description": "Hidden Grotto Encounters Cost 750 Less For You.",
  1156 |     "isConsumable": false,
  1157 |     "uses": null
  1158 |   },
  1159 |   {
  1160 |     "id": "extra-action",
  1161 |     "name": "Extra Action",
  1162 |     "tier": "A",
  1163 |     "description": "During The Action Phase, You May Take One Extra Action.",
  1164 |     "isConsumable": false,
  1165 |     "uses": null
  1166 |   },
  1167 |   {
```


#### Hit 2 — line 1299

```text
  1287 |   {
  1288 |     "id": "close-game",
  1289 |     "name": "Close Game",
  1290 |     "tier": "C",
  1291 |     "description": "Once Per Gym, If You Lose A Battle By 1 Pokemon, Gain 1500.",
  1292 |     "isConsumable": false,
  1293 |     "uses": null
  1294 |   },
  1295 |   {
  1296 |     "id": "encounter-pro",
  1297 |     "name": "Encounter Pro",
  1298 |     "tier": "A",
  1299 |     "description": "Once Per Action Phase Get A Free Hidden Grotto Encounter.",
  1300 |     "isConsumable": false,
  1301 |     "uses": null
  1302 |   },
  1303 |   {
  1304 |     "id": "iron-barbs",
  1305 |     "name": "Iron Barbs",
  1306 |     "tier": "B",
  1307 |     "description": "When A Player Uses An Effect That Effects You, You May Make Them Lose 1000.",
  1308 |     "isConsumable": false,
  1309 |     "uses": null
  1310 |   },
  1311 |   {
```


#### Hit 3 — line 2199

```text
  2187 |   {
  2188 |     "id": "r-d-trial",
  2189 |     "name": "R&D Trial",
  2190 |     "tier": "C",
  2191 |     "description": "Visit Silph Co R&D Without Using An Action.",
  2192 |     "isConsumable": true,
  2193 |     "uses": 2
  2194 |   },
  2195 |   {
  2196 |     "id": "grotto-pass",
  2197 |     "name": "Grotto Pass",
  2198 |     "tier": "C",
  2199 |     "description": "Visit The Hidden Grotto Without Using An Action.",
  2200 |     "isConsumable": true,
  2201 |     "uses": 2
  2202 |   },
  2203 |   {
  2204 |     "id": "team-medic",
  2205 |     "name": "Team Medic",
  2206 |     "tier": "C",
  2207 |     "description": "Visit The Pokemon Center Without Using An Action.",
  2208 |     "isConsumable": true,
  2209 |     "uses": 3
  2210 |   }
  2211 | ]);
```


#### Hit 4 — line 2334

```text
  2322 |       category: "recovery",
  2323 |       actionCost: 1,
  2324 |       summary: "Remove Curse/Restrict effects, restore recent releases, or buy emergency immunity.",
  2325 |       effects: [
  2326 |         { type: "remove-curse", cost: 0, oncePerAction: true },
  2327 |         { type: "restrict-treatment", cost: 2000, oncePerAction: true },
  2328 |       { type: "restore-released-pokemon", releasesEligible: ["last-gym", "current-gym"], costsByGameCornerTier: { safari: 1000, poke: 2000, great: 3000, ultra: 4000, master: 5000 }, oncePerAction: true },
  2329 |         { type: "buy-token", token: "Emergency Immunity Token", cost: 4000, expires: "end-of-gym", oncePerAction: true }
  2330 |       ]
  2331 |     },
  2332 |     {
  2333 |       id: "hidden-grotto",
  2334 |       name: "Hidden Grotto",
  2335 |       category: "pokemon",
  2336 |       actionCost: 1,
  2337 |       cost: 1500,
  2338 |       summary: "Roll 3 types, choose one, then roll 3 Pokemon of that type from up to 2 Battle Tiers above the current Gym tier and choose one. LC/LC Elite Pokemon that can still evolve are excluded.",
  2339 |       effects: [{ type: "typed-tier-random-pokemon", typeRolls: 3, pokemonRolls: 3, usesNaturalTierCap: true, tierStepsAboveNaturalCap: HIDDEN_GROTTO_TIER_STEP_BONUS }]
  2340 |     },
  2341 |     {
  2342 |       id: "dragons-den",
  2343 |       name: "Dragon's Den",
  2344 |       category: "pokemon",
  2345 |       actionCost: 1,
  2346 |       summary: "Leave exactly one Pokémon for one Gym, then choose any legal move or an AAA-approved Ability.",
```


#### Hit 5 — line 38853

```text
 38841 |     ["Close A Trade", "Make A Trade With Another Player"],
 38842 |     ["Artist", "Draw A Pokemon In Your Party In MS Paint In 30 Seconds"],
 38843 |     ["Scout Report", "Correctly Guess A Pokemon A Player Will Bring Before Team Preview (1 Guess)"],
 38844 |     ["Ragebait", "Make A Player Mad. Money Is Not Awarded Until The Crowd Says Your Ragebait Is Sufficient."],
 38845 |     ["Who's That Pokemon", "Guess 5 Random Pokemon In 30 Seconds (https://gearoid.me/pokemon/) (Ultra Mode)"],
 38846 |     ["First Come First Served", "Don't Use Any Reroll Tokens"],
 38847 |     ["Its Time To Play The Game", "Immediately Use An Effect Now"],
 38848 |     ["New Power", "Bring A Pokemon To Battle You Obtained This Gym"]
 38849 |   ],
 38850 |   medium: [
 38851 |     ["Off My Meds", "Visit The Pokemon Center & Use A Center's Paid Option."],
 38852 |     ["Prize Pokemon", "Win At The Game Corner Or Use A Game Corner Ticket."],
 38853 |     ["Tracking The Beast", "Catch A Pokemon From The Hidden Grotto"],
 38854 |     ["The Dragon's Discount", "Leave A Pokemon In The Dragons Den"],
 38855 |     ["Supply Run", "Spend 9K"],
 38856 |     ["Gravekeeper Complaint", "Release 10K (1000 BST) Worth Of Pokemon"],
 38857 |     ["Change The Weather?", "Use Any Weather Token"],
 38858 |     ["Bounty Hunter", "Declare A Player At Team Preview Then Beat Them In The Battle Phase"],
 38859 |     ["Perfect Prep", "Bring No Repeating Types To Battle Phase"],
 38860 |     ["Contender", "Win 2 Rival Battles"],
 38861 |     ["Aim For The Crown", "Beat The Highest Ranking Player Last Gym (Besides Yourself)"],
 38862 |     ["Dual Wield", "Bring 2 Pokemon With The Same Type"],
 38863 |     ["Overtime", "Activate 5 Different Effects"],
 38864 |     ["Illegal Play", "Give A Pokemon An Illegal Move Or Ability"],
 38865 |     ["Go For Gold", "Obtain A Saga Point From The Battle Phase"],
```


#### Hit 6 — line 39411

```text
 39399 | 
 39400 | function renderHiddenGrottoDetails(location, player) {
 39401 |   if (!pokemonBuildDataReady()) ensurePokemonBuildDataLoaded();
 39402 |   const cost = Number(location?.cost || 1500);
 39403 |   const naturalTier = getNaturalGymTier(state.gym);
 39404 |   const grottoTierCap = getHiddenGrottoTierCap(state.gym);
 39405 |   const session = activeHiddenGrottoSession(player.id);
 39406 |   const sessionTierCap = getHiddenGrottoTierCap(session?.gym || state.gym);
 39407 |   if (session?.status === "type-choice") {
 39408 |     return `
 39409 |       <div><span>Balance</span><strong>${formatMoney(player.balance || 0)}</strong></div>
 39410 |       <div><span>Cost Paid</span><strong>${formatMoney(session.cost || cost)}</strong></div>
 39411 |       <div><span>Hidden Grotto Tier Cap</span><strong>${escapeHtml(formatPokemonBalanceTierLabel(sessionTierCap))}</strong></div>
 39412 |       <p class="gc-rule-note">Choose one rolled type. Hidden Grotto then rolls 3 Pokemon of that type from up to 2 Battle Tier steps above this Gym's normal tier. LC/LC Elite Pokemon that can still evolve are excluded.</p>
 39413 |       <section class="location-services">
 39414 |         ${session.rolledTypes.map((type) => {
 39415 |           const eligible = getHiddenGrottoPool(session.gym || state.gym, type);
 39416 |           return `
 39417 |             <article class="location-service-card">
 39418 |               <div>
 39419 |                 <strong>${escapeHtml(type)}</strong>
 39420 |                 <p>${eligible.length ? `${eligible.length} eligible Pokemon` : "No eligible Pokemon"}</p>
 39421 |               </div>
 39422 |               <button class="buy-button" type="button" data-grotto-type="${escapeHtml(type)}"${eligible.length ? "" : " disabled"}>Choose ${escapeHtml(type)}</button>
 39423 |             </article>
```


#### Hit 7 — line 39412

```text
 39400 | function renderHiddenGrottoDetails(location, player) {
 39401 |   if (!pokemonBuildDataReady()) ensurePokemonBuildDataLoaded();
 39402 |   const cost = Number(location?.cost || 1500);
 39403 |   const naturalTier = getNaturalGymTier(state.gym);
 39404 |   const grottoTierCap = getHiddenGrottoTierCap(state.gym);
 39405 |   const session = activeHiddenGrottoSession(player.id);
 39406 |   const sessionTierCap = getHiddenGrottoTierCap(session?.gym || state.gym);
 39407 |   if (session?.status === "type-choice") {
 39408 |     return `
 39409 |       <div><span>Balance</span><strong>${formatMoney(player.balance || 0)}</strong></div>
 39410 |       <div><span>Cost Paid</span><strong>${formatMoney(session.cost || cost)}</strong></div>
 39411 |       <div><span>Hidden Grotto Tier Cap</span><strong>${escapeHtml(formatPokemonBalanceTierLabel(sessionTierCap))}</strong></div>
 39412 |       <p class="gc-rule-note">Choose one rolled type. Hidden Grotto then rolls 3 Pokemon of that type from up to 2 Battle Tier steps above this Gym's normal tier. LC/LC Elite Pokemon that can still evolve are excluded.</p>
 39413 |       <section class="location-services">
 39414 |         ${session.rolledTypes.map((type) => {
 39415 |           const eligible = getHiddenGrottoPool(session.gym || state.gym, type);
 39416 |           return `
 39417 |             <article class="location-service-card">
 39418 |               <div>
 39419 |                 <strong>${escapeHtml(type)}</strong>
 39420 |                 <p>${eligible.length ? `${eligible.length} eligible Pokemon` : "No eligible Pokemon"}</p>
 39421 |               </div>
 39422 |               <button class="buy-button" type="button" data-grotto-type="${escapeHtml(type)}"${eligible.length ? "" : " disabled"}>Choose ${escapeHtml(type)}</button>
 39423 |             </article>
 39424 |           `;
```


#### Hit 8 — line 39433

```text
 39421 |               </div>
 39422 |               <button class="buy-button" type="button" data-grotto-type="${escapeHtml(type)}"${eligible.length ? "" : " disabled"}>Choose ${escapeHtml(type)}</button>
 39423 |             </article>
 39424 |           `;
 39425 |         }).join("")}
 39426 |       </section>
 39427 |     `;
 39428 |   }
 39429 |   if (session?.status === "pokemon-choice") {
 39430 |     return `
 39431 |       <div><span>Cost Paid</span><strong>${formatMoney(session.cost || cost)}</strong></div>
 39432 |       <div><span>Chosen Type</span><strong>${escapeHtml(session.chosenType || "Unknown")}</strong></div>
 39433 |       <div><span>Hidden Grotto Tier Cap</span><strong>${escapeHtml(formatPokemonBalanceTierLabel(sessionTierCap))}</strong></div>
 39434 |       <p class="gc-rule-note">Choose 1 of the 3 rolled Pokemon. The pool includes tiers up to 2 Battle Tier steps above this Gym's normal tier and excludes LC/LC Elite Pokemon that can still evolve.</p>
 39435 |       <section class="location-services">
 39436 |         ${(session.rolledPokemon || []).map((choice) => {
 39437 |           const name = choice.displayName || choice.pokemonName || "Unknown";
 39438 |           return `
 39439 |             <article class="location-service-card">
 39440 |               <div>
 39441 |                 <strong>${escapeHtml(name)}</strong>
 39442 |                 <p>${escapeHtml((choice.types || []).join(" / ") || "Unknown Type")} - ${escapeHtml(formatPokemonBalanceTierLabel(choice.tier || "Unassigned"))}</p>
 39443 |               </div>
 39444 |               <button class="buy-button" type="button" data-grotto-pokemon="${escapeHtml(name)}">Choose ${escapeHtml(name)}</button>
 39445 |             </article>
```


#### Hit 9 — line 39471

```text
 39459 |     `;
 39460 |   }).join("");
 39461 |   const recentSession = (state.hiddenGrottoSessions || []).find((entry) => entry.playerId === player.id
 39462 |     && entry.series === state.series
 39463 |     && Number(entry.gym) === Number(state.gym)
 39464 |     && entry.status === "completed"
 39465 |     && !entry.undone);
 39466 |   const recentPokemon = recentSession?.rosterPokemonId ? findPokemonRecord(recentSession.rosterPokemonId) : null;
 39467 |   return `
 39468 |     <div><span>Balance</span><strong>${formatMoney(player.balance || 0)}</strong></div>
 39469 |     <div><span>Cost</span><strong>${formatMoney(cost)}</strong></div>
 39470 |     <div><span>Current Gym Battle Tier</span><strong>${escapeHtml(formatPokemonBalanceTierLabel(naturalTier))}</strong></div>
 39471 |     <div><span>Hidden Grotto Tier Cap</span><strong>${escapeHtml(formatPokemonBalanceTierLabel(grottoTierCap))}</strong></div>
 39472 |     <div><span>Available Pokemon in Pool</span><strong>${pool.length}</strong></div>
 39473 |     <div><span>Available Types</span><strong>${availableTypes.length}</strong></div>
 39474 |     <p class="gc-rule-note">Spend 1 Action and ${formatMoney(cost)} to roll 3 types, choose one, then roll 3 Pokemon of that type and choose one. The pool reaches 2 Battle Tier steps above this Gym's normal tier. LC/LC Elite Pokemon that can still evolve remain excluded.</p>
 39475 |     ${recentSession ? `
 39476 |       <article class="location-service-card">
 39477 |         <div class="pokemon-result-inline">
 39478 |           <div class="pokemon-avatar${pokemonSpriteClassSuffix(recentPokemon)}">
 39479 |             ${recentPokemon ? renderPokemonSpriteContent(recentPokemon) : `<span>${escapeHtml((recentSession.chosenPokemon || "?").slice(0, 1))}</span>`}
 39480 |           </div>
 39481 |           <div>
 39482 |             <strong>Latest Find: ${escapeHtml(recentSession.chosenPokemon || "Unknown")}</strong>
 39483 |             <p>${escapeHtml(recentSession.chosenType || "Unknown Type")} - ${escapeHtml(pokemonBattleTierSummary(recentSession.chosenPokemon || "", "Unassigned"))}</p>
```


#### Hit 10 — line 39488

```text
 39476 |       <article class="location-service-card">
 39477 |         <div class="pokemon-result-inline">
 39478 |           <div class="pokemon-avatar${pokemonSpriteClassSuffix(recentPokemon)}">
 39479 |             ${recentPokemon ? renderPokemonSpriteContent(recentPokemon) : `<span>${escapeHtml((recentSession.chosenPokemon || "?").slice(0, 1))}</span>`}
 39480 |           </div>
 39481 |           <div>
 39482 |             <strong>Latest Find: ${escapeHtml(recentSession.chosenPokemon || "Unknown")}</strong>
 39483 |             <p>${escapeHtml(recentSession.chosenType || "Unknown Type")} - ${escapeHtml(pokemonBattleTierSummary(recentSession.chosenPokemon || "", "Unassigned"))}</p>
 39484 |           </div>
 39485 |         </div>
 39486 |       </article>
 39487 |     ` : ""}
 39488 |     <button class="buy-button" type="button" data-grotto-start="true"${availableTypes.length ? "" : " disabled"}>Explore Hidden Grotto</button>
 39489 |     <section class="gc-token-use-panel grotto-type-direct-panel">
 39490 |       <h3>Choose Type</h3>
 39491 |       <p>Use this when a trainer class or effect lets you pick the Hidden Grotto type directly.</p>
 39492 |       <div class="grotto-type-direct-grid">${typeChoiceCards}</div>
 39493 |     </section>
 39494 |   `;
 39495 | }
 39496 | 
 39497 | function renderRangerBaseDetails(location, player, tracker) {
 39498 |   const visits = Number(tracker.rangerVisits || 0);
 39499 |   const credits = Number(tracker.rangerCredits || 0);
 39500 |   const nextEffect = rangerEffectForVisit(visits + 1);
```


#### Hit 11 — line 39491

```text
 39479 |             ${recentPokemon ? renderPokemonSpriteContent(recentPokemon) : `<span>${escapeHtml((recentSession.chosenPokemon || "?").slice(0, 1))}</span>`}
 39480 |           </div>
 39481 |           <div>
 39482 |             <strong>Latest Find: ${escapeHtml(recentSession.chosenPokemon || "Unknown")}</strong>
 39483 |             <p>${escapeHtml(recentSession.chosenType || "Unknown Type")} - ${escapeHtml(pokemonBattleTierSummary(recentSession.chosenPokemon || "", "Unassigned"))}</p>
 39484 |           </div>
 39485 |         </div>
 39486 |       </article>
 39487 |     ` : ""}
 39488 |     <button class="buy-button" type="button" data-grotto-start="true"${availableTypes.length ? "" : " disabled"}>Explore Hidden Grotto</button>
 39489 |     <section class="gc-token-use-panel grotto-type-direct-panel">
 39490 |       <h3>Choose Type</h3>
 39491 |       <p>Use this when a trainer class or effect lets you pick the Hidden Grotto type directly.</p>
 39492 |       <div class="grotto-type-direct-grid">${typeChoiceCards}</div>
 39493 |     </section>
 39494 |   `;
 39495 | }
 39496 | 
 39497 | function renderRangerBaseDetails(location, player, tracker) {
 39498 |   const visits = Number(tracker.rangerVisits || 0);
 39499 |   const credits = Number(tracker.rangerCredits || 0);
 39500 |   const nextEffect = rangerEffectForVisit(visits + 1);
 39501 |   const nextMilestone = nextRangerMilestone(tracker);
 39502 |   return `
 39503 |     <div><span>Series</span><strong>${escapeHtml(state.series)}</strong></div>
```


#### Hit 12 — line 40159

```text
 40147 |     <div><span>Balance</span><strong>${formatMoney(player.balance || 0)}</strong></div>
 40148 |     <p class="gc-rule-note">Choose up to three eligible Pokémon. Costs use consolidated Battle Tier: Safari $1,000; Poké $2,000; Great $3,000; Ultra $4,000; Master $5,000.</p>
 40149 |     <label>Pokémon (Ctrl/Cmd-click for multiple)<select id="silphPokemonSelect" multiple size="${Math.min(8, Math.max(3, eligible.length))}">${eligible.map((pokemon) => { const tier = pokemonConsolidatedBattleTier(pokemon); const cost = globalThis.rivalSagaActionPhaseBalance.SILPH_COSTS[tier] || 0; return `<option value="${escapeHtml(pokemon.id)}">${escapeHtml(pokemon.name)} - ${escapeHtml(globalThis.rivalSagaActionPhaseBalance.tierLabel(tier) || "Tier required")} - ${cost ? formatMoney(cost) : "Unavailable"}</option>`; }).join("")}</select></label>
 40150 |     <div class="breeder-select-panel" data-silph-preview><span>Select one to three Pokémon.</span></div>
 40151 |     <button class="buy-button" type="button" data-silph-start ${eligible.length ? "" : "disabled"}>Start Silph Co. R&D</button>`;
 40152 | }
 40153 | 
 40154 | async function startHiddenGrottoSession({ chosenType = "" } = {}) {
 40155 |   const player = activePlayer();
 40156 |   const location = actionLocationById("hidden-grotto");
 40157 |   const cost = Number(location?.cost || 1500);
 40158 |   if (Number(player.balance || 0) < cost) {
 40159 |     alert(`Hidden Grotto costs ${formatMoney(cost)}. You do not have enough money.`);
 40160 |     return;
 40161 |   }
 40162 |   await ensurePokemonBuildDataLoaded({ renderOnLoad: false });
 40163 |   const naturalTier = getNaturalGymTier(state.gym);
 40164 |   const targetTier = getHiddenGrottoTierCap(state.gym);
 40165 |   const pool = getHiddenGrottoPool(state.gym);
 40166 |   const availableTypes = hiddenGrottoAvailableTypes(state.gym);
 40167 |   if (!pool.length || !availableTypes.length) {
 40168 |     alert(`No eligible Pokemon are currently available for Hidden Grotto at ${formatPokemonBalanceTierLabel(targetTier)} or lower.`);
 40169 |     return;
 40170 |   }
 40171 |   const directType = hiddenGrottoTypes.find((type) => normalizePokemonName(type) === normalizePokemonName(chosenType)) || "";
```


#### Hit 13 — line 40168

```text
 40156 |   const location = actionLocationById("hidden-grotto");
 40157 |   const cost = Number(location?.cost || 1500);
 40158 |   if (Number(player.balance || 0) < cost) {
 40159 |     alert(`Hidden Grotto costs ${formatMoney(cost)}. You do not have enough money.`);
 40160 |     return;
 40161 |   }
 40162 |   await ensurePokemonBuildDataLoaded({ renderOnLoad: false });
 40163 |   const naturalTier = getNaturalGymTier(state.gym);
 40164 |   const targetTier = getHiddenGrottoTierCap(state.gym);
 40165 |   const pool = getHiddenGrottoPool(state.gym);
 40166 |   const availableTypes = hiddenGrottoAvailableTypes(state.gym);
 40167 |   if (!pool.length || !availableTypes.length) {
 40168 |     alert(`No eligible Pokemon are currently available for Hidden Grotto at ${formatPokemonBalanceTierLabel(targetTier)} or lower.`);
 40169 |     return;
 40170 |   }
 40171 |   const directType = hiddenGrottoTypes.find((type) => normalizePokemonName(type) === normalizePokemonName(chosenType)) || "";
 40172 |   if (chosenType && !directType) {
 40173 |     alert("Choose a valid Hidden Grotto type.");
 40174 |     return;
 40175 |   }
 40176 |   if (directType && !availableTypes.includes(directType)) {
 40177 |     alert(`No eligible ${directType} Pokemon are currently available for this Hidden Grotto tier pool.`);
 40178 |     return;
 40179 |   }
 40180 |   const directTypeOptions = directType ? getHiddenGrottoPool(state.gym, directType) : [];
```


#### Hit 14 — line 40173

```text
 40161 |   }
 40162 |   await ensurePokemonBuildDataLoaded({ renderOnLoad: false });
 40163 |   const naturalTier = getNaturalGymTier(state.gym);
 40164 |   const targetTier = getHiddenGrottoTierCap(state.gym);
 40165 |   const pool = getHiddenGrottoPool(state.gym);
 40166 |   const availableTypes = hiddenGrottoAvailableTypes(state.gym);
 40167 |   if (!pool.length || !availableTypes.length) {
 40168 |     alert(`No eligible Pokemon are currently available for Hidden Grotto at ${formatPokemonBalanceTierLabel(targetTier)} or lower.`);
 40169 |     return;
 40170 |   }
 40171 |   const directType = hiddenGrottoTypes.find((type) => normalizePokemonName(type) === normalizePokemonName(chosenType)) || "";
 40172 |   if (chosenType && !directType) {
 40173 |     alert("Choose a valid Hidden Grotto type.");
 40174 |     return;
 40175 |   }
 40176 |   if (directType && !availableTypes.includes(directType)) {
 40177 |     alert(`No eligible ${directType} Pokemon are currently available for this Hidden Grotto tier pool.`);
 40178 |     return;
 40179 |   }
 40180 |   const directTypeOptions = directType ? getHiddenGrottoPool(state.gym, directType) : [];
 40181 |   const directTypeChoices = directType ? randomUniqueSample(directTypeOptions, Math.min(3, directTypeOptions.length)) : [];
 40182 |   if (directType && !directTypeChoices.length) {
 40183 |     alert(`No eligible ${directType} Pokemon are available for this Hidden Grotto tier pool after low-tier evolution filtering.`);
 40184 |     return;
 40185 |   }
```


#### Hit 15 — line 40177

```text
 40165 |   const pool = getHiddenGrottoPool(state.gym);
 40166 |   const availableTypes = hiddenGrottoAvailableTypes(state.gym);
 40167 |   if (!pool.length || !availableTypes.length) {
 40168 |     alert(`No eligible Pokemon are currently available for Hidden Grotto at ${formatPokemonBalanceTierLabel(targetTier)} or lower.`);
 40169 |     return;
 40170 |   }
 40171 |   const directType = hiddenGrottoTypes.find((type) => normalizePokemonName(type) === normalizePokemonName(chosenType)) || "";
 40172 |   if (chosenType && !directType) {
 40173 |     alert("Choose a valid Hidden Grotto type.");
 40174 |     return;
 40175 |   }
 40176 |   if (directType && !availableTypes.includes(directType)) {
 40177 |     alert(`No eligible ${directType} Pokemon are currently available for this Hidden Grotto tier pool.`);
 40178 |     return;
 40179 |   }
 40180 |   const directTypeOptions = directType ? getHiddenGrottoPool(state.gym, directType) : [];
 40181 |   const directTypeChoices = directType ? randomUniqueSample(directTypeOptions, Math.min(3, directTypeOptions.length)) : [];
 40182 |   if (directType && !directTypeChoices.length) {
 40183 |     alert(`No eligible ${directType} Pokemon are available for this Hidden Grotto tier pool after low-tier evolution filtering.`);
 40184 |     return;
 40185 |   }
 40186 |   const check = actionLocationCanConfirm(location, player.id, 1);
 40187 |   if (!check.ok) {
 40188 |     alert(check.reason);
 40189 |     return;
```


#### Hit 16 — line 40183

```text
 40171 |   const directType = hiddenGrottoTypes.find((type) => normalizePokemonName(type) === normalizePokemonName(chosenType)) || "";
 40172 |   if (chosenType && !directType) {
 40173 |     alert("Choose a valid Hidden Grotto type.");
 40174 |     return;
 40175 |   }
 40176 |   if (directType && !availableTypes.includes(directType)) {
 40177 |     alert(`No eligible ${directType} Pokemon are currently available for this Hidden Grotto tier pool.`);
 40178 |     return;
 40179 |   }
 40180 |   const directTypeOptions = directType ? getHiddenGrottoPool(state.gym, directType) : [];
 40181 |   const directTypeChoices = directType ? randomUniqueSample(directTypeOptions, Math.min(3, directTypeOptions.length)) : [];
 40182 |   if (directType && !directTypeChoices.length) {
 40183 |     alert(`No eligible ${directType} Pokemon are available for this Hidden Grotto tier pool after low-tier evolution filtering.`);
 40184 |     return;
 40185 |   }
 40186 |   const check = actionLocationCanConfirm(location, player.id, 1);
 40187 |   if (!check.ok) {
 40188 |     alert(check.reason);
 40189 |     return;
 40190 |   }
 40191 |   const previousVisits = structuredClone(actionVisitsForPlayer(player.id));
 40192 |   const previousBalance = Number(player.balance || 0);
 40193 |   const previousMoneyLedger = structuredClone(state.moneyLedger || []);
 40194 |   const previousPokemonRecords = structuredClone(state.pokemonRecords || []);
 40195 |   const previousHiddenGrottoSessions = structuredClone(state.hiddenGrottoSessions || []);
```


#### Hit 17 — line 40200

```text
 40188 |     alert(check.reason);
 40189 |     return;
 40190 |   }
 40191 |   const previousVisits = structuredClone(actionVisitsForPlayer(player.id));
 40192 |   const previousBalance = Number(player.balance || 0);
 40193 |   const previousMoneyLedger = structuredClone(state.moneyLedger || []);
 40194 |   const previousPokemonRecords = structuredClone(state.pokemonRecords || []);
 40195 |   const previousHiddenGrottoSessions = structuredClone(state.hiddenGrottoSessions || []);
 40196 |   const visit = {
 40197 |     id: `action-visit-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
 40198 |     playerId: player.id,
 40199 |     locationId: "hidden-grotto",
 40200 |     locationName: "Hidden Grotto",
 40201 |     serviceId: "hidden-grotto-start",
 40202 |     serviceLabel: "Explore Hidden Grotto",
 40203 |     actionCost: 1,
 40204 |     series: state.series,
 40205 |     gym: Number(state.gym),
 40206 |     phase: currentPhase(),
 40207 |     createdAt: new Date().toISOString(),
 40208 |     placeholder: false
 40209 |   };
 40210 |   commitActionVisit(visit);
 40211 |   player.balance = previousBalance - cost;
 40212 |   const ledgerEntry = addMoneyLedgerEntry(player, {
```


#### Hit 18 — line 40202

```text
 40190 |   }
 40191 |   const previousVisits = structuredClone(actionVisitsForPlayer(player.id));
 40192 |   const previousBalance = Number(player.balance || 0);
 40193 |   const previousMoneyLedger = structuredClone(state.moneyLedger || []);
 40194 |   const previousPokemonRecords = structuredClone(state.pokemonRecords || []);
 40195 |   const previousHiddenGrottoSessions = structuredClone(state.hiddenGrottoSessions || []);
 40196 |   const visit = {
 40197 |     id: `action-visit-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
 40198 |     playerId: player.id,
 40199 |     locationId: "hidden-grotto",
 40200 |     locationName: "Hidden Grotto",
 40201 |     serviceId: "hidden-grotto-start",
 40202 |     serviceLabel: "Explore Hidden Grotto",
 40203 |     actionCost: 1,
 40204 |     series: state.series,
 40205 |     gym: Number(state.gym),
 40206 |     phase: currentPhase(),
 40207 |     createdAt: new Date().toISOString(),
 40208 |     placeholder: false
 40209 |   };
 40210 |   commitActionVisit(visit);
 40211 |   player.balance = previousBalance - cost;
 40212 |   const ledgerEntry = addMoneyLedgerEntry(player, {
 40213 |     amount: -cost,
 40214 |     direction: "spend",
```


#### Hit 19 — line 40216

```text
 40204 |     series: state.series,
 40205 |     gym: Number(state.gym),
 40206 |     phase: currentPhase(),
 40207 |     createdAt: new Date().toISOString(),
 40208 |     placeholder: false
 40209 |   };
 40210 |   commitActionVisit(visit);
 40211 |   player.balance = previousBalance - cost;
 40212 |   const ledgerEntry = addMoneyLedgerEntry(player, {
 40213 |     amount: -cost,
 40214 |     direction: "spend",
 40215 |     sourceType: "hidden-grotto",
 40216 |     sourceLabel: "Hidden Grotto",
 40217 |     note: "Hidden Grotto exploration",
 40218 |     balanceBefore: previousBalance,
 40219 |     balanceAfter: player.balance,
 40220 |     actionVisitId: visit.id,
 40221 |     sourceVisitId: visit.id
 40222 |   });
 40223 |   const rolledTypes = directType ? [directType] : randomUniqueSample(availableTypes, Math.min(3, availableTypes.length));
 40224 |   const session = {
 40225 |     id: `grotto-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
 40226 |     playerId: player.id,
 40227 |     series: state.series,
 40228 |     gym: Number(state.gym),
```


#### Hit 20 — line 40217

```text
 40205 |     gym: Number(state.gym),
 40206 |     phase: currentPhase(),
 40207 |     createdAt: new Date().toISOString(),
 40208 |     placeholder: false
 40209 |   };
 40210 |   commitActionVisit(visit);
 40211 |   player.balance = previousBalance - cost;
 40212 |   const ledgerEntry = addMoneyLedgerEntry(player, {
 40213 |     amount: -cost,
 40214 |     direction: "spend",
 40215 |     sourceType: "hidden-grotto",
 40216 |     sourceLabel: "Hidden Grotto",
 40217 |     note: "Hidden Grotto exploration",
 40218 |     balanceBefore: previousBalance,
 40219 |     balanceAfter: player.balance,
 40220 |     actionVisitId: visit.id,
 40221 |     sourceVisitId: visit.id
 40222 |   });
 40223 |   const rolledTypes = directType ? [directType] : randomUniqueSample(availableTypes, Math.min(3, availableTypes.length));
 40224 |   const session = {
 40225 |     id: `grotto-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
 40226 |     playerId: player.id,
 40227 |     series: state.series,
 40228 |     gym: Number(state.gym),
 40229 |     actionVisitId: visit.id,
```


#### Hit 21 — line 40252

```text
 40240 |     chosenPokemon: null,
 40241 |     rosterPokemonId: "",
 40242 |     status: directType ? "pokemon-choice" : "type-choice",
 40243 |     createdAt: new Date().toISOString()
 40244 |   };
 40245 |   state.hiddenGrottoSessions ||= [];
 40246 |   state.hiddenGrottoSessions.unshift(session);
 40247 |   linkActionOperation(visit.id, { featureType: "hidden-grotto", featureSessionId: session.id });
 40248 |   addLogEntry({
 40249 |     action: "phase",
 40250 |     category: "action",
 40251 |     player: player.name,
 40252 |     item: `${player.name} explored Hidden Grotto`,
 40253 |     title: `${player.name} explored Hidden Grotto`,
 40254 |     summary: directType
 40255 |       ? `Spent 1 Action at Hidden Grotto\nSpent ${formatMoney(cost)}\nGrotto Tier Cap: ${formatPokemonBalanceTierLabel(targetTier)}\nChose ${directType}\nChoose 1 Pokemon`
 40256 |       : `Spent 1 Action at Hidden Grotto\nSpent ${formatMoney(cost)}\nGrotto Tier Cap: ${formatPokemonBalanceTierLabel(targetTier)}\nChoose a type`,
 40257 |     details: [
 40258 |       `Current Gym Battle Tier: ${formatPokemonBalanceTierLabel(naturalTier)}`,
 40259 |       `Hidden Grotto Tier Cap: ${formatPokemonBalanceTierLabel(targetTier)}`,
 40260 |       `Available Pokemon in Pool: ${pool.length}`,
 40261 |       directType ? `Direct Type Choice: ${directType}` : `Rolled Types: ${rolledTypes.join(", ")}`,
 40262 |       directType ? `Eligible ${directType} Pool: ${directTypeOptions.length}` : "",
 40263 |       directType ? `Pokemon Choices: ${directTypeChoices.map((choice) => choice.displayName || choice.pokemonName).join(", ")}` : ""
 40264 |     ].filter(Boolean),
```


#### Hit 22 — line 40253

```text
 40241 |     rosterPokemonId: "",
 40242 |     status: directType ? "pokemon-choice" : "type-choice",
 40243 |     createdAt: new Date().toISOString()
 40244 |   };
 40245 |   state.hiddenGrottoSessions ||= [];
 40246 |   state.hiddenGrottoSessions.unshift(session);
 40247 |   linkActionOperation(visit.id, { featureType: "hidden-grotto", featureSessionId: session.id });
 40248 |   addLogEntry({
 40249 |     action: "phase",
 40250 |     category: "action",
 40251 |     player: player.name,
 40252 |     item: `${player.name} explored Hidden Grotto`,
 40253 |     title: `${player.name} explored Hidden Grotto`,
 40254 |     summary: directType
 40255 |       ? `Spent 1 Action at Hidden Grotto\nSpent ${formatMoney(cost)}\nGrotto Tier Cap: ${formatPokemonBalanceTierLabel(targetTier)}\nChose ${directType}\nChoose 1 Pokemon`
 40256 |       : `Spent 1 Action at Hidden Grotto\nSpent ${formatMoney(cost)}\nGrotto Tier Cap: ${formatPokemonBalanceTierLabel(targetTier)}\nChoose a type`,
 40257 |     details: [
 40258 |       `Current Gym Battle Tier: ${formatPokemonBalanceTierLabel(naturalTier)}`,
 40259 |       `Hidden Grotto Tier Cap: ${formatPokemonBalanceTierLabel(targetTier)}`,
 40260 |       `Available Pokemon in Pool: ${pool.length}`,
 40261 |       directType ? `Direct Type Choice: ${directType}` : `Rolled Types: ${rolledTypes.join(", ")}`,
 40262 |       directType ? `Eligible ${directType} Pool: ${directTypeOptions.length}` : "",
 40263 |       directType ? `Pokemon Choices: ${directTypeChoices.map((choice) => choice.displayName || choice.pokemonName).join(", ")}` : ""
 40264 |     ].filter(Boolean),
 40265 |     type: "hidden-grotto-action",
```


#### Hit 23 — line 40255

```text
 40243 |     createdAt: new Date().toISOString()
 40244 |   };
 40245 |   state.hiddenGrottoSessions ||= [];
 40246 |   state.hiddenGrottoSessions.unshift(session);
 40247 |   linkActionOperation(visit.id, { featureType: "hidden-grotto", featureSessionId: session.id });
 40248 |   addLogEntry({
 40249 |     action: "phase",
 40250 |     category: "action",
 40251 |     player: player.name,
 40252 |     item: `${player.name} explored Hidden Grotto`,
 40253 |     title: `${player.name} explored Hidden Grotto`,
 40254 |     summary: directType
 40255 |       ? `Spent 1 Action at Hidden Grotto\nSpent ${formatMoney(cost)}\nGrotto Tier Cap: ${formatPokemonBalanceTierLabel(targetTier)}\nChose ${directType}\nChoose 1 Pokemon`
 40256 |       : `Spent 1 Action at Hidden Grotto\nSpent ${formatMoney(cost)}\nGrotto Tier Cap: ${formatPokemonBalanceTierLabel(targetTier)}\nChoose a type`,
 40257 |     details: [
 40258 |       `Current Gym Battle Tier: ${formatPokemonBalanceTierLabel(naturalTier)}`,
 40259 |       `Hidden Grotto Tier Cap: ${formatPokemonBalanceTierLabel(targetTier)}`,
 40260 |       `Available Pokemon in Pool: ${pool.length}`,
 40261 |       directType ? `Direct Type Choice: ${directType}` : `Rolled Types: ${rolledTypes.join(", ")}`,
 40262 |       directType ? `Eligible ${directType} Pool: ${directTypeOptions.length}` : "",
 40263 |       directType ? `Pokemon Choices: ${directTypeChoices.map((choice) => choice.displayName || choice.pokemonName).join(", ")}` : ""
 40264 |     ].filter(Boolean),
 40265 |     type: "hidden-grotto-action",
 40266 |     categories: ["action", "money", "pokemon"],
 40267 |     tags: ["hidden-grotto", "money"],
```


#### Hit 24 — line 40256

```text
 40244 |   };
 40245 |   state.hiddenGrottoSessions ||= [];
 40246 |   state.hiddenGrottoSessions.unshift(session);
 40247 |   linkActionOperation(visit.id, { featureType: "hidden-grotto", featureSessionId: session.id });
 40248 |   addLogEntry({
 40249 |     action: "phase",
 40250 |     category: "action",
 40251 |     player: player.name,
 40252 |     item: `${player.name} explored Hidden Grotto`,
 40253 |     title: `${player.name} explored Hidden Grotto`,
 40254 |     summary: directType
 40255 |       ? `Spent 1 Action at Hidden Grotto\nSpent ${formatMoney(cost)}\nGrotto Tier Cap: ${formatPokemonBalanceTierLabel(targetTier)}\nChose ${directType}\nChoose 1 Pokemon`
 40256 |       : `Spent 1 Action at Hidden Grotto\nSpent ${formatMoney(cost)}\nGrotto Tier Cap: ${formatPokemonBalanceTierLabel(targetTier)}\nChoose a type`,
 40257 |     details: [
 40258 |       `Current Gym Battle Tier: ${formatPokemonBalanceTierLabel(naturalTier)}`,
 40259 |       `Hidden Grotto Tier Cap: ${formatPokemonBalanceTierLabel(targetTier)}`,
 40260 |       `Available Pokemon in Pool: ${pool.length}`,
 40261 |       directType ? `Direct Type Choice: ${directType}` : `Rolled Types: ${rolledTypes.join(", ")}`,
 40262 |       directType ? `Eligible ${directType} Pool: ${directTypeOptions.length}` : "",
 40263 |       directType ? `Pokemon Choices: ${directTypeChoices.map((choice) => choice.displayName || choice.pokemonName).join(", ")}` : ""
 40264 |     ].filter(Boolean),
 40265 |     type: "hidden-grotto-action",
 40266 |     categories: ["action", "money", "pokemon"],
 40267 |     tags: ["hidden-grotto", "money"],
 40268 |     playerIds: [player.id],
```


#### Hit 25 — line 40259

```text
 40247 |   linkActionOperation(visit.id, { featureType: "hidden-grotto", featureSessionId: session.id });
 40248 |   addLogEntry({
 40249 |     action: "phase",
 40250 |     category: "action",
 40251 |     player: player.name,
 40252 |     item: `${player.name} explored Hidden Grotto`,
 40253 |     title: `${player.name} explored Hidden Grotto`,
 40254 |     summary: directType
 40255 |       ? `Spent 1 Action at Hidden Grotto\nSpent ${formatMoney(cost)}\nGrotto Tier Cap: ${formatPokemonBalanceTierLabel(targetTier)}\nChose ${directType}\nChoose 1 Pokemon`
 40256 |       : `Spent 1 Action at Hidden Grotto\nSpent ${formatMoney(cost)}\nGrotto Tier Cap: ${formatPokemonBalanceTierLabel(targetTier)}\nChoose a type`,
 40257 |     details: [
 40258 |       `Current Gym Battle Tier: ${formatPokemonBalanceTierLabel(naturalTier)}`,
 40259 |       `Hidden Grotto Tier Cap: ${formatPokemonBalanceTierLabel(targetTier)}`,
 40260 |       `Available Pokemon in Pool: ${pool.length}`,
 40261 |       directType ? `Direct Type Choice: ${directType}` : `Rolled Types: ${rolledTypes.join(", ")}`,
 40262 |       directType ? `Eligible ${directType} Pool: ${directTypeOptions.length}` : "",
 40263 |       directType ? `Pokemon Choices: ${directTypeChoices.map((choice) => choice.displayName || choice.pokemonName).join(", ")}` : ""
 40264 |     ].filter(Boolean),
 40265 |     type: "hidden-grotto-action",
 40266 |     categories: ["action", "money", "pokemon"],
 40267 |     tags: ["hidden-grotto", "money"],
 40268 |     playerIds: [player.id],
 40269 |     moneyChanges: [{ amount: -cost, direction: "spend", ledgerEntryId: ledgerEntry.id, sourceType: "hidden-grotto" }],
 40270 |     actionVisitId: visit.id,
 40271 |     visitId: visit.id,
```


#### Hit 26 — line 40301

```text
 40289 |   });
 40290 |   saveState();
 40291 |   render();
 40292 | }
 40293 | 
 40294 | async function chooseHiddenGrottoType(type) {
 40295 |   const session = activeHiddenGrottoSession(activePlayer().id);
 40296 |   if (!session || session.status !== "type-choice" || !session.rolledTypes.includes(type)) return;
 40297 |   await ensurePokemonBuildDataLoaded({ renderOnLoad: false });
 40298 |   const options = getHiddenGrottoPool(session.gym || state.gym, type);
 40299 |   const choices = randomUniqueSample(options, Math.min(3, options.length));
 40300 |   if (!choices.length) {
 40301 |     alert(`No eligible ${type} Pokemon are available for this Hidden Grotto tier pool after low-tier evolution filtering. Choose another rolled type.`);
 40302 |     return;
 40303 |   }
 40304 |   session.chosenType = type;
 40305 |   session.rolledPokemon = choices;
 40306 |   session.status = "pokemon-choice";
 40307 |   session.naturalTier = getNaturalGymTier(session.gym || state.gym);
 40308 |   session.targetTier = getHiddenGrottoTierCap(session.gym || state.gym);
 40309 |   session.tierStepBonus = HIDDEN_GROTTO_TIER_STEP_BONUS;
 40310 |   const entry = (state.log || []).find((logEntry) => logEntry.hiddenGrottoSessionId === session.id);
 40311 |   if (entry) {
 40312 |     entry.summary = `Spent 1 Action at Hidden Grotto\nSpent ${formatMoney(session.cost)}\nGrotto Tier Cap: ${formatPokemonBalanceTierLabel(session.targetTier)}\nChose ${type}\nChoose 1 Pokemon`;
 40313 |     entry.details = [
```


#### Hit 27 — line 40312

```text
 40300 |   if (!choices.length) {
 40301 |     alert(`No eligible ${type} Pokemon are available for this Hidden Grotto tier pool after low-tier evolution filtering. Choose another rolled type.`);
 40302 |     return;
 40303 |   }
 40304 |   session.chosenType = type;
 40305 |   session.rolledPokemon = choices;
 40306 |   session.status = "pokemon-choice";
 40307 |   session.naturalTier = getNaturalGymTier(session.gym || state.gym);
 40308 |   session.targetTier = getHiddenGrottoTierCap(session.gym || state.gym);
 40309 |   session.tierStepBonus = HIDDEN_GROTTO_TIER_STEP_BONUS;
 40310 |   const entry = (state.log || []).find((logEntry) => logEntry.hiddenGrottoSessionId === session.id);
 40311 |   if (entry) {
 40312 |     entry.summary = `Spent 1 Action at Hidden Grotto\nSpent ${formatMoney(session.cost)}\nGrotto Tier Cap: ${formatPokemonBalanceTierLabel(session.targetTier)}\nChose ${type}\nChoose 1 Pokemon`;
 40313 |     entry.details = [
 40314 |       `Current Gym Battle Tier: ${formatPokemonBalanceTierLabel(session.naturalTier)}`,
 40315 |       `Hidden Grotto Tier Cap: ${formatPokemonBalanceTierLabel(session.targetTier)}`,
 40316 |       `Rolled Types: ${session.rolledTypes.join(", ")}`,
 40317 |       `Chosen Type: ${type}`,
 40318 |       `Eligible ${type} Pool: ${options.length}`,
 40319 |       `Pokemon Choices: ${choices.map((choice) => choice.displayName || choice.pokemonName).join(", ")}`
 40320 |     ];
 40321 |     appendUniqueLogValue(entry, "tags", "hidden-grotto-pokemon-choice");
 40322 |   }
 40323 |   saveState();
 40324 |   render();
```


#### Hit 28 — line 40315

```text
 40303 |   }
 40304 |   session.chosenType = type;
 40305 |   session.rolledPokemon = choices;
 40306 |   session.status = "pokemon-choice";
 40307 |   session.naturalTier = getNaturalGymTier(session.gym || state.gym);
 40308 |   session.targetTier = getHiddenGrottoTierCap(session.gym || state.gym);
 40309 |   session.tierStepBonus = HIDDEN_GROTTO_TIER_STEP_BONUS;
 40310 |   const entry = (state.log || []).find((logEntry) => logEntry.hiddenGrottoSessionId === session.id);
 40311 |   if (entry) {
 40312 |     entry.summary = `Spent 1 Action at Hidden Grotto\nSpent ${formatMoney(session.cost)}\nGrotto Tier Cap: ${formatPokemonBalanceTierLabel(session.targetTier)}\nChose ${type}\nChoose 1 Pokemon`;
 40313 |     entry.details = [
 40314 |       `Current Gym Battle Tier: ${formatPokemonBalanceTierLabel(session.naturalTier)}`,
 40315 |       `Hidden Grotto Tier Cap: ${formatPokemonBalanceTierLabel(session.targetTier)}`,
 40316 |       `Rolled Types: ${session.rolledTypes.join(", ")}`,
 40317 |       `Chosen Type: ${type}`,
 40318 |       `Eligible ${type} Pool: ${options.length}`,
 40319 |       `Pokemon Choices: ${choices.map((choice) => choice.displayName || choice.pokemonName).join(", ")}`
 40320 |     ];
 40321 |     appendUniqueLogValue(entry, "tags", "hidden-grotto-pokemon-choice");
 40322 |   }
 40323 |   saveState();
 40324 |   render();
 40325 | }
 40326 | 
 40327 | async function chooseHiddenGrottoPokemon(name) {
```


#### Hit 29 — line 40336

```text
 40324 |   render();
 40325 | }
 40326 | 
 40327 | async function chooseHiddenGrottoPokemon(name) {
 40328 |   const player = activePlayer();
 40329 |   const session = activeHiddenGrottoSession(player.id);
 40330 |   if (!session || session.status !== "pokemon-choice") return;
 40331 |   const choice = (session.rolledPokemon || []).find((pokemon) => pokemon.displayName === name || pokemon.pokemonName === name);
 40332 |   if (!choice) return;
 40333 |   await ensurePokemonBuildDataLoaded({ renderOnLoad: false });
 40334 |   const acquisition = resolvePokemonAcquisitionSpecies(choice.displayName || choice.pokemonName);
 40335 |   const sprite = await fetchStablePokemonSprite(acquisition.receivedSpecies || choice.displayName || choice.pokemonName);
 40336 |   const pokemon = createPokemonRecord(player, choice.displayName || choice.pokemonName, "Hidden Grotto", {
 40337 |     rosterType: "Active",
 40338 |     receivedSpriteUrl: sprite.spriteUrl || "",
 40339 |     receivedSpriteKey: sprite.spriteKey || "",
 40340 |     sourceTier: getPokemonAcquisitionTier(choice.displayName || choice.pokemonName),
 40341 |     acquisitionTier: getPokemonAcquisitionTier(choice.displayName || choice.pokemonName),
 40342 |     gameCornerMetadata: getPokemonGameCornerMetadata(choice.displayName || choice.pokemonName)
 40343 |   });
 40344 |   session.chosenPokemon = choice.displayName || choice.pokemonName;
 40345 |   session.rosterPokemonId = pokemon.id;
 40346 |   session.status = "completed";
 40347 |   session.completedAt = new Date().toISOString();
 40348 |   const entry = (state.log || []).find((logEntry) => logEntry.hiddenGrottoSessionId === session.id);
```


#### Hit 30 — line 40350

```text
 40338 |     receivedSpriteUrl: sprite.spriteUrl || "",
 40339 |     receivedSpriteKey: sprite.spriteKey || "",
 40340 |     sourceTier: getPokemonAcquisitionTier(choice.displayName || choice.pokemonName),
 40341 |     acquisitionTier: getPokemonAcquisitionTier(choice.displayName || choice.pokemonName),
 40342 |     gameCornerMetadata: getPokemonGameCornerMetadata(choice.displayName || choice.pokemonName)
 40343 |   });
 40344 |   session.chosenPokemon = choice.displayName || choice.pokemonName;
 40345 |   session.rosterPokemonId = pokemon.id;
 40346 |   session.status = "completed";
 40347 |   session.completedAt = new Date().toISOString();
 40348 |   const entry = (state.log || []).find((logEntry) => logEntry.hiddenGrottoSessionId === session.id);
 40349 |   if (entry) {
 40350 |     entry.summary = `Spent 1 Action at Hidden Grotto\nSpent ${formatMoney(session.cost)}\nChose ${session.chosenType} Type\nCaught ${session.chosenPokemon}`;
 40351 |     entry.details = [
 40352 |       `Current Gym Battle Tier: ${formatPokemonBalanceTierLabel(session.naturalTier || getNaturalGymTier(session.gym))}`,
 40353 |       `Hidden Grotto Tier Cap: ${formatPokemonBalanceTierLabel(session.targetTier || getHiddenGrottoTierCap(session.gym))}`,
 40354 |       `Rolled Types: ${session.rolledTypes.join(", ")}`,
 40355 |       `Chosen Type: ${session.chosenType}`,
 40356 |       `Pokemon Choices: ${(session.rolledPokemon || []).map((pokemon) => pokemon.displayName).join(", ")}`,
 40357 |       `Chosen Pokemon: ${session.chosenPokemon}`,
 40358 |       `Battle Tier: ${pokemonBattleTierSummary(session.chosenPokemon, "Unassigned").replace(/^Battle:\s*/, "")}`,
 40359 |       `Types: ${(choice.types || []).join(" / ") || "Unknown"}`
 40360 |     ];
 40361 |     appendUniqueLogValue(entry, "pokemonNames", session.chosenPokemon);
 40362 |     appendUniqueLogValue(entry, "tags", "hidden-grotto-result");
```


#### Hit 31 — line 40353

```text
 40341 |     acquisitionTier: getPokemonAcquisitionTier(choice.displayName || choice.pokemonName),
 40342 |     gameCornerMetadata: getPokemonGameCornerMetadata(choice.displayName || choice.pokemonName)
 40343 |   });
 40344 |   session.chosenPokemon = choice.displayName || choice.pokemonName;
 40345 |   session.rosterPokemonId = pokemon.id;
 40346 |   session.status = "completed";
 40347 |   session.completedAt = new Date().toISOString();
 40348 |   const entry = (state.log || []).find((logEntry) => logEntry.hiddenGrottoSessionId === session.id);
 40349 |   if (entry) {
 40350 |     entry.summary = `Spent 1 Action at Hidden Grotto\nSpent ${formatMoney(session.cost)}\nChose ${session.chosenType} Type\nCaught ${session.chosenPokemon}`;
 40351 |     entry.details = [
 40352 |       `Current Gym Battle Tier: ${formatPokemonBalanceTierLabel(session.naturalTier || getNaturalGymTier(session.gym))}`,
 40353 |       `Hidden Grotto Tier Cap: ${formatPokemonBalanceTierLabel(session.targetTier || getHiddenGrottoTierCap(session.gym))}`,
 40354 |       `Rolled Types: ${session.rolledTypes.join(", ")}`,
 40355 |       `Chosen Type: ${session.chosenType}`,
 40356 |       `Pokemon Choices: ${(session.rolledPokemon || []).map((pokemon) => pokemon.displayName).join(", ")}`,
 40357 |       `Chosen Pokemon: ${session.chosenPokemon}`,
 40358 |       `Battle Tier: ${pokemonBattleTierSummary(session.chosenPokemon, "Unassigned").replace(/^Battle:\s*/, "")}`,
 40359 |       `Types: ${(choice.types || []).join(" / ") || "Unknown"}`
 40360 |     ];
 40361 |     appendUniqueLogValue(entry, "pokemonNames", session.chosenPokemon);
 40362 |     appendUniqueLogValue(entry, "tags", "hidden-grotto-result");
 40363 |   }
 40364 |   completeActionOperationForVisit(session.actionVisitId, "hidden-grotto-choice-complete");
 40365 |   saveState();
```


### startHiddenGrottoSession

Occurrences: 1

#### Hit 1 — line 40154

```text
 40142 |       ...(development.rolledAbilities || []).map((value) => ({ type: "ability", value })),
 40143 |       ...(development.rolledMoves || []).map((value) => ({ type: "move", value }))
 40144 |     ].map((option) => `<article class="location-service-card"><div><strong>${escapeHtml(option.value)}</strong><p>${option.type === "ability" ? "Ability" : "Move"}</p></div><button class="buy-button mini-button" data-silph-select="${escapeHtml(development.pokemonId)}:${escapeHtml(option.type)}:${escapeHtml(option.value)}" ${development.status === "completed" ? "disabled" : ""}>Select</button></article>`).join("")}</div></section>`).join("")}`;
 40145 |   const eligible = silphEligiblePokemon(player.id);
 40146 |   return `
 40147 |     <div><span>Balance</span><strong>${formatMoney(player.balance || 0)}</strong></div>
 40148 |     <p class="gc-rule-note">Choose up to three eligible Pokémon. Costs use consolidated Battle Tier: Safari $1,000; Poké $2,000; Great $3,000; Ultra $4,000; Master $5,000.</p>
 40149 |     <label>Pokémon (Ctrl/Cmd-click for multiple)<select id="silphPokemonSelect" multiple size="${Math.min(8, Math.max(3, eligible.length))}">${eligible.map((pokemon) => { const tier = pokemonConsolidatedBattleTier(pokemon); const cost = globalThis.rivalSagaActionPhaseBalance.SILPH_COSTS[tier] || 0; return `<option value="${escapeHtml(pokemon.id)}">${escapeHtml(pokemon.name)} - ${escapeHtml(globalThis.rivalSagaActionPhaseBalance.tierLabel(tier) || "Tier required")} - ${cost ? formatMoney(cost) : "Unavailable"}</option>`; }).join("")}</select></label>
 40150 |     <div class="breeder-select-panel" data-silph-preview><span>Select one to three Pokémon.</span></div>
 40151 |     <button class="buy-button" type="button" data-silph-start ${eligible.length ? "" : "disabled"}>Start Silph Co. R&D</button>`;
 40152 | }
 40153 | 
 40154 | async function startHiddenGrottoSession({ chosenType = "" } = {}) {
 40155 |   const player = activePlayer();
 40156 |   const location = actionLocationById("hidden-grotto");
 40157 |   const cost = Number(location?.cost || 1500);
 40158 |   if (Number(player.balance || 0) < cost) {
 40159 |     alert(`Hidden Grotto costs ${formatMoney(cost)}. You do not have enough money.`);
 40160 |     return;
 40161 |   }
 40162 |   await ensurePokemonBuildDataLoaded({ renderOnLoad: false });
 40163 |   const naturalTier = getNaturalGymTier(state.gym);
 40164 |   const targetTier = getHiddenGrottoTierCap(state.gym);
 40165 |   const pool = getHiddenGrottoPool(state.gym);
 40166 |   const availableTypes = hiddenGrottoAvailableTypes(state.gym);
```


### renderHiddenGrottoDetails

Occurrences: 1

#### Hit 1 — line 39400

```text
 39388 |           </select>
 39389 |         </label>
 39390 |         <div class="breeder-select-panel" data-silph-preview="true">
 39391 |           <div><span>Battle Tier</span><strong>${escapeHtml(getPokemonTierLabel(tier) || "Unresolved")}</strong></div>
 39392 |           <div><span>Cost</span><strong>${cost ? formatMoney(cost) : "Tier required"}</strong></div>
 39393 |         </div>
 39394 |         <button class="buy-button" type="button" data-silph-start="true"${selected && cost && Number(player.balance || 0) >= cost ? "" : " disabled"}>Start Silph Co R&D</button>
 39395 |       `}
 39396 |     </section>
 39397 |   `;
 39398 | }
 39399 | 
 39400 | function renderHiddenGrottoDetails(location, player) {
 39401 |   if (!pokemonBuildDataReady()) ensurePokemonBuildDataLoaded();
 39402 |   const cost = Number(location?.cost || 1500);
 39403 |   const naturalTier = getNaturalGymTier(state.gym);
 39404 |   const grottoTierCap = getHiddenGrottoTierCap(state.gym);
 39405 |   const session = activeHiddenGrottoSession(player.id);
 39406 |   const sessionTierCap = getHiddenGrottoTierCap(session?.gym || state.gym);
 39407 |   if (session?.status === "type-choice") {
 39408 |     return `
 39409 |       <div><span>Balance</span><strong>${formatMoney(player.balance || 0)}</strong></div>
 39410 |       <div><span>Cost Paid</span><strong>${formatMoney(session.cost || cost)}</strong></div>
 39411 |       <div><span>Hidden Grotto Tier Cap</span><strong>${escapeHtml(formatPokemonBalanceTierLabel(sessionTierCap))}</strong></div>
 39412 |       <p class="gc-rule-note">Choose one rolled type. Hidden Grotto then rolls 3 Pokemon of that type from up to 2 Battle Tier steps above this Gym's normal tier. LC/LC Elite Pokemon that can still evolve are excluded.</p>
```


### includeFishing

Occurrences: 8

#### Hit 1 — line 41768

```text
 41756 |   if (!pending.length) return null;
 41757 |   let session = pending.find((entry) => entry.id === state.selectedEncounterSessionId);
 41758 |   if (!session) {
 41759 |     session = pending[0];
 41760 |     state.selectedEncounterSessionId = session.id;
 41761 |   }
 41762 |   return session;
 41763 | }
 41764 | 
 41765 | function encounterEntriesForSession(session) {
 41766 |   const definition = encounterWheelDefinition(session?.series, session?.gym);
 41767 |   if (!definition) return [];
 41768 |   const includeFishing = Boolean(session.includeFishing);
 41769 |   const includeSurf = Boolean(session.includeSurf);
 41770 |   const removed = new Set(session.removedEntryIds || []);
 41771 |   const baseEntries = (definition.entries || []).filter((entry) => {
 41772 |     if (removed.has(entry.id)) return false;
 41773 |     const category = String(entry.category || "land").toLowerCase();
 41774 |     if (category === "fishing" && !includeFishing) return false;
 41775 |     if (category === "surf" && !includeSurf) return false;
 41776 |     if (entry.enabledByDefault === false && !["fishing", "surf"].includes(category)) return false;
 41777 |     return currentPokemonRuleStatusByName(entry.pokemonName || entry.displayName) !== "Banned";
 41778 |   });
 41779 |   return [...baseEntries, ...(session.temporaryEntries || [])].map((entry) => ({
 41780 |     ...entry,
```


#### Hit 2 — line 41768

```text
 41756 |   if (!pending.length) return null;
 41757 |   let session = pending.find((entry) => entry.id === state.selectedEncounterSessionId);
 41758 |   if (!session) {
 41759 |     session = pending[0];
 41760 |     state.selectedEncounterSessionId = session.id;
 41761 |   }
 41762 |   return session;
 41763 | }
 41764 | 
 41765 | function encounterEntriesForSession(session) {
 41766 |   const definition = encounterWheelDefinition(session?.series, session?.gym);
 41767 |   if (!definition) return [];
 41768 |   const includeFishing = Boolean(session.includeFishing);
 41769 |   const includeSurf = Boolean(session.includeSurf);
 41770 |   const removed = new Set(session.removedEntryIds || []);
 41771 |   const baseEntries = (definition.entries || []).filter((entry) => {
 41772 |     if (removed.has(entry.id)) return false;
 41773 |     const category = String(entry.category || "land").toLowerCase();
 41774 |     if (category === "fishing" && !includeFishing) return false;
 41775 |     if (category === "surf" && !includeSurf) return false;
 41776 |     if (entry.enabledByDefault === false && !["fishing", "surf"].includes(category)) return false;
 41777 |     return currentPokemonRuleStatusByName(entry.pokemonName || entry.displayName) !== "Banned";
 41778 |   });
 41779 |   return [...baseEntries, ...(session.temporaryEntries || [])].map((entry) => ({
 41780 |     ...entry,
```


#### Hit 3 — line 41774

```text
 41762 |   return session;
 41763 | }
 41764 | 
 41765 | function encounterEntriesForSession(session) {
 41766 |   const definition = encounterWheelDefinition(session?.series, session?.gym);
 41767 |   if (!definition) return [];
 41768 |   const includeFishing = Boolean(session.includeFishing);
 41769 |   const includeSurf = Boolean(session.includeSurf);
 41770 |   const removed = new Set(session.removedEntryIds || []);
 41771 |   const baseEntries = (definition.entries || []).filter((entry) => {
 41772 |     if (removed.has(entry.id)) return false;
 41773 |     const category = String(entry.category || "land").toLowerCase();
 41774 |     if (category === "fishing" && !includeFishing) return false;
 41775 |     if (category === "surf" && !includeSurf) return false;
 41776 |     if (entry.enabledByDefault === false && !["fishing", "surf"].includes(category)) return false;
 41777 |     return currentPokemonRuleStatusByName(entry.pokemonName || entry.displayName) !== "Banned";
 41778 |   });
 41779 |   return [...baseEntries, ...(session.temporaryEntries || [])].map((entry) => ({
 41780 |     ...entry,
 41781 |     weight: Math.max(0, Number(session.weightOverrides?.[entry.id] ?? entry.weight ?? 1))
 41782 |   })).filter((entry) => Number(entry.weight) > 0);
 41783 | }
 41784 | 
 41785 | function weightedEncounterEntry(entries) {
 41786 |   const totalWeight = entries.reduce((total, entry) => total + Number(entry.weight || 1), 0);
```


#### Hit 4 — line 42756

```text
 42744 |   entry.categories ||= [];
 42745 |   entry.tags ||= [];
 42746 |   if (updater) updater(entry);
 42747 |   const rolls = session.rolls || [];
 42748 |   const caughtNames = rolls.map((roll) => {
 42749 |     const result = (state.randomPokemonSessions || []).find((randomSession) => randomSession.id === roll.randomPokemonSessionId);
 42750 |     return result?.status === "confirmed" ? result.resultDisplayName : "";
 42751 |   }).filter(Boolean);
 42752 |   const lines = [
 42753 |     "Spent 1 Action at Encounter",
 42754 |     `Rolled ${rolls.length}/${session.maxRolls || 2} Encounters`,
 42755 |     caughtNames.length ? `Caught ${caughtNames.join(", ")}` : "",
 42756 |     session.includeFishing ? "Fishing included" : "",
 42757 |     session.includeSurf ? "Surf included" : "",
 42758 |     (session.removedEntryIds || []).length ? `Removed ${(session.removedEntryIds || []).length} option${session.removedEntryIds.length === 1 ? "" : "s"}` : ""
 42759 |   ].filter(Boolean);
 42760 |   entry.summary = lines.join("\n");
 42761 |   entry.details = [
 42762 |     `Active pool: ${encounterEntriesForSession(session).map((entry) => entry.displayName || entry.pokemonName).join(", ") || "None"}`,
 42763 |     `Fishing included: ${session.includeFishing ? "Yes" : "No"}`,
 42764 |     `Surf included: ${session.includeSurf ? "Yes" : "No"}`,
 42765 |     ...(session.removedEntryIds || []).map((id) => `Removed: ${id}`),
 42766 |     ...rolls.map((roll, index) => `Roll ${index + 1}: ${roll.resultDisplayName}`)
 42767 |   ];
 42768 |   entry.quantity = rolls.length;
```


#### Hit 5 — line 42763

```text
 42751 |   }).filter(Boolean);
 42752 |   const lines = [
 42753 |     "Spent 1 Action at Encounter",
 42754 |     `Rolled ${rolls.length}/${session.maxRolls || 2} Encounters`,
 42755 |     caughtNames.length ? `Caught ${caughtNames.join(", ")}` : "",
 42756 |     session.includeFishing ? "Fishing included" : "",
 42757 |     session.includeSurf ? "Surf included" : "",
 42758 |     (session.removedEntryIds || []).length ? `Removed ${(session.removedEntryIds || []).length} option${session.removedEntryIds.length === 1 ? "" : "s"}` : ""
 42759 |   ].filter(Boolean);
 42760 |   entry.summary = lines.join("\n");
 42761 |   entry.details = [
 42762 |     `Active pool: ${encounterEntriesForSession(session).map((entry) => entry.displayName || entry.pokemonName).join(", ") || "None"}`,
 42763 |     `Fishing included: ${session.includeFishing ? "Yes" : "No"}`,
 42764 |     `Surf included: ${session.includeSurf ? "Yes" : "No"}`,
 42765 |     ...(session.removedEntryIds || []).map((id) => `Removed: ${id}`),
 42766 |     ...rolls.map((roll, index) => `Roll ${index + 1}: ${roll.resultDisplayName}`)
 42767 |   ];
 42768 |   entry.quantity = rolls.length;
 42769 |   entry.playerIds = [player.id];
 42770 |   entry.encounterSessionId = session.id;
 42771 |   return entry;
 42772 | }
 42773 | 
 42774 | function activeEncounterSessionForPlayer(playerId, series = state.series, gym = state.gym) {
 42775 |   return (state.encounterSessions || []).find((session) => session.playerId === playerId
```


#### Hit 6 — line 42838

```text
 42826 |     session.updatedAt = new Date().toISOString();
 42827 |   } else {
 42828 |     session = {
 42829 |       id: `encounter-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
 42830 |       playerId: player.id,
 42831 |       series: state.series,
 42832 |       gym: Number(state.gym),
 42833 |       phase: "action",
 42834 |       actionVisitId: visit.id,
 42835 |       actionVisitIds: [visit.id],
 42836 |       wheelId: definition.id,
 42837 |       maxRolls: Number(definition.rollsPerAction || 2),
 42838 |       includeFishing: false,
 42839 |       includeSurf: false,
 42840 |       removedEntryIds: [],
 42841 |       temporaryEntries: [],
 42842 |       weightOverrides: {},
 42843 |       resultSessionIds: [],
 42844 |       rolls: [],
 42845 |       status: "pending",
 42846 |       visualRotation: 0,
 42847 |       createdAt: new Date().toISOString()
 42848 |     };
 42849 |     state.encounterSessions.unshift(session);
 42850 |   }
```


#### Hit 7 — line 47179

```text
 47167 |             </article>
 47168 |           `).join("") : `<p class="empty-state compact">Encounter results will appear here.</p>`}
 47169 |         </div>
 47170 |       </section>
 47171 |       <section class="encounter-controls">
 47172 |         <div class="wheel-meta">
 47173 |           <div><span>Trainer</span><strong>${escapeHtml(player.name)}</strong></div>
 47174 |           <div><span>Rolls</span><strong>${rolls.length}/${max}</strong></div>
 47175 |           <div><span>Active Options</span><strong>${entries.length}</strong></div>
 47176 |           <div><span>Rerolls</span><strong>Allowed</strong></div>
 47177 |         </div>
 47178 |         <div class="encounter-toggle-row">
 47179 |           <label><input type="checkbox" data-encounter-toggle="water" ${session.includeFishing || session.includeSurf ? "checked" : ""}> Include Fishing / Surf</label>
 47180 |           <label><input type="checkbox" data-encounter-weight-editing ${weightEditing ? "checked" : ""}${rolls.length ? " disabled" : ""}> Edit Weights</label>
 47181 |         </div>
 47182 |         <p class="gc-rule-note">Fishing and Surf are grouped for now. Later this should come from items/effects.</p>
 47183 |         <h3>Active Wheel Options</h3>
 47184 |         <div class="encounter-entry-list">
 47185 |           ${entries.map((entry) => `
 47186 |             <article class="encounter-entry${entry.id === finalEntryId ? " pointer-active" : ""}" data-encounter-entry-id="${escapeHtml(entry.id)}">
 47187 |               <div>
 47188 |                 <strong>${escapeHtml(entry.displayName || entry.pokemonName)}</strong>
 47189 |                 <span>${escapeHtml(entry.category || "land")}</span>
 47190 |               </div>
 47191 |               ${weightEditing ? `
```


#### Hit 8 — line 63728

```text
 63716 |       return;
 63717 |     }
 63718 |     const doneButton = event.target.closest("[data-encounter-done]");
 63719 |     if (doneButton) {
 63720 |       closeEncounterSession(doneButton.dataset.encounterDone);
 63721 |       return;
 63722 |     }
 63723 |     const toggle = event.target.closest("[data-encounter-toggle]");
 63724 |     if (toggle) {
 63725 |       const session = selectedEncounterSession();
 63726 |       if (!session || (session.rolls || []).length) return;
 63727 |       if (toggle.dataset.encounterToggle === "water") {
 63728 |         session.includeFishing = toggle.checked;
 63729 |         session.includeSurf = toggle.checked;
 63730 |       }
 63731 |       saveState();
 63732 |       renderEncounterOverlay();
 63733 |       return;
 63734 |     }
 63735 |     const weightEditingToggle = event.target.closest("[data-encounter-weight-editing]");
 63736 |     if (weightEditingToggle) {
 63737 |       const session = selectedEncounterSession();
 63738 |       if (!session || (session.rolls || []).length) return;
 63739 |       session.weightEditing = weightEditingToggle.checked;
 63740 |       saveState();
```


### includeSurf

Occurrences: 8

#### Hit 1 — line 41769

```text
 41757 |   let session = pending.find((entry) => entry.id === state.selectedEncounterSessionId);
 41758 |   if (!session) {
 41759 |     session = pending[0];
 41760 |     state.selectedEncounterSessionId = session.id;
 41761 |   }
 41762 |   return session;
 41763 | }
 41764 | 
 41765 | function encounterEntriesForSession(session) {
 41766 |   const definition = encounterWheelDefinition(session?.series, session?.gym);
 41767 |   if (!definition) return [];
 41768 |   const includeFishing = Boolean(session.includeFishing);
 41769 |   const includeSurf = Boolean(session.includeSurf);
 41770 |   const removed = new Set(session.removedEntryIds || []);
 41771 |   const baseEntries = (definition.entries || []).filter((entry) => {
 41772 |     if (removed.has(entry.id)) return false;
 41773 |     const category = String(entry.category || "land").toLowerCase();
 41774 |     if (category === "fishing" && !includeFishing) return false;
 41775 |     if (category === "surf" && !includeSurf) return false;
 41776 |     if (entry.enabledByDefault === false && !["fishing", "surf"].includes(category)) return false;
 41777 |     return currentPokemonRuleStatusByName(entry.pokemonName || entry.displayName) !== "Banned";
 41778 |   });
 41779 |   return [...baseEntries, ...(session.temporaryEntries || [])].map((entry) => ({
 41780 |     ...entry,
 41781 |     weight: Math.max(0, Number(session.weightOverrides?.[entry.id] ?? entry.weight ?? 1))
```


#### Hit 2 — line 41769

```text
 41757 |   let session = pending.find((entry) => entry.id === state.selectedEncounterSessionId);
 41758 |   if (!session) {
 41759 |     session = pending[0];
 41760 |     state.selectedEncounterSessionId = session.id;
 41761 |   }
 41762 |   return session;
 41763 | }
 41764 | 
 41765 | function encounterEntriesForSession(session) {
 41766 |   const definition = encounterWheelDefinition(session?.series, session?.gym);
 41767 |   if (!definition) return [];
 41768 |   const includeFishing = Boolean(session.includeFishing);
 41769 |   const includeSurf = Boolean(session.includeSurf);
 41770 |   const removed = new Set(session.removedEntryIds || []);
 41771 |   const baseEntries = (definition.entries || []).filter((entry) => {
 41772 |     if (removed.has(entry.id)) return false;
 41773 |     const category = String(entry.category || "land").toLowerCase();
 41774 |     if (category === "fishing" && !includeFishing) return false;
 41775 |     if (category === "surf" && !includeSurf) return false;
 41776 |     if (entry.enabledByDefault === false && !["fishing", "surf"].includes(category)) return false;
 41777 |     return currentPokemonRuleStatusByName(entry.pokemonName || entry.displayName) !== "Banned";
 41778 |   });
 41779 |   return [...baseEntries, ...(session.temporaryEntries || [])].map((entry) => ({
 41780 |     ...entry,
 41781 |     weight: Math.max(0, Number(session.weightOverrides?.[entry.id] ?? entry.weight ?? 1))
```


#### Hit 3 — line 41775

```text
 41763 | }
 41764 | 
 41765 | function encounterEntriesForSession(session) {
 41766 |   const definition = encounterWheelDefinition(session?.series, session?.gym);
 41767 |   if (!definition) return [];
 41768 |   const includeFishing = Boolean(session.includeFishing);
 41769 |   const includeSurf = Boolean(session.includeSurf);
 41770 |   const removed = new Set(session.removedEntryIds || []);
 41771 |   const baseEntries = (definition.entries || []).filter((entry) => {
 41772 |     if (removed.has(entry.id)) return false;
 41773 |     const category = String(entry.category || "land").toLowerCase();
 41774 |     if (category === "fishing" && !includeFishing) return false;
 41775 |     if (category === "surf" && !includeSurf) return false;
 41776 |     if (entry.enabledByDefault === false && !["fishing", "surf"].includes(category)) return false;
 41777 |     return currentPokemonRuleStatusByName(entry.pokemonName || entry.displayName) !== "Banned";
 41778 |   });
 41779 |   return [...baseEntries, ...(session.temporaryEntries || [])].map((entry) => ({
 41780 |     ...entry,
 41781 |     weight: Math.max(0, Number(session.weightOverrides?.[entry.id] ?? entry.weight ?? 1))
 41782 |   })).filter((entry) => Number(entry.weight) > 0);
 41783 | }
 41784 | 
 41785 | function weightedEncounterEntry(entries) {
 41786 |   const totalWeight = entries.reduce((total, entry) => total + Number(entry.weight || 1), 0);
 41787 |   if (!entries.length || totalWeight <= 0) return null;
```


#### Hit 4 — line 42757

```text
 42745 |   entry.tags ||= [];
 42746 |   if (updater) updater(entry);
 42747 |   const rolls = session.rolls || [];
 42748 |   const caughtNames = rolls.map((roll) => {
 42749 |     const result = (state.randomPokemonSessions || []).find((randomSession) => randomSession.id === roll.randomPokemonSessionId);
 42750 |     return result?.status === "confirmed" ? result.resultDisplayName : "";
 42751 |   }).filter(Boolean);
 42752 |   const lines = [
 42753 |     "Spent 1 Action at Encounter",
 42754 |     `Rolled ${rolls.length}/${session.maxRolls || 2} Encounters`,
 42755 |     caughtNames.length ? `Caught ${caughtNames.join(", ")}` : "",
 42756 |     session.includeFishing ? "Fishing included" : "",
 42757 |     session.includeSurf ? "Surf included" : "",
 42758 |     (session.removedEntryIds || []).length ? `Removed ${(session.removedEntryIds || []).length} option${session.removedEntryIds.length === 1 ? "" : "s"}` : ""
 42759 |   ].filter(Boolean);
 42760 |   entry.summary = lines.join("\n");
 42761 |   entry.details = [
 42762 |     `Active pool: ${encounterEntriesForSession(session).map((entry) => entry.displayName || entry.pokemonName).join(", ") || "None"}`,
 42763 |     `Fishing included: ${session.includeFishing ? "Yes" : "No"}`,
 42764 |     `Surf included: ${session.includeSurf ? "Yes" : "No"}`,
 42765 |     ...(session.removedEntryIds || []).map((id) => `Removed: ${id}`),
 42766 |     ...rolls.map((roll, index) => `Roll ${index + 1}: ${roll.resultDisplayName}`)
 42767 |   ];
 42768 |   entry.quantity = rolls.length;
 42769 |   entry.playerIds = [player.id];
```


#### Hit 5 — line 42764

```text
 42752 |   const lines = [
 42753 |     "Spent 1 Action at Encounter",
 42754 |     `Rolled ${rolls.length}/${session.maxRolls || 2} Encounters`,
 42755 |     caughtNames.length ? `Caught ${caughtNames.join(", ")}` : "",
 42756 |     session.includeFishing ? "Fishing included" : "",
 42757 |     session.includeSurf ? "Surf included" : "",
 42758 |     (session.removedEntryIds || []).length ? `Removed ${(session.removedEntryIds || []).length} option${session.removedEntryIds.length === 1 ? "" : "s"}` : ""
 42759 |   ].filter(Boolean);
 42760 |   entry.summary = lines.join("\n");
 42761 |   entry.details = [
 42762 |     `Active pool: ${encounterEntriesForSession(session).map((entry) => entry.displayName || entry.pokemonName).join(", ") || "None"}`,
 42763 |     `Fishing included: ${session.includeFishing ? "Yes" : "No"}`,
 42764 |     `Surf included: ${session.includeSurf ? "Yes" : "No"}`,
 42765 |     ...(session.removedEntryIds || []).map((id) => `Removed: ${id}`),
 42766 |     ...rolls.map((roll, index) => `Roll ${index + 1}: ${roll.resultDisplayName}`)
 42767 |   ];
 42768 |   entry.quantity = rolls.length;
 42769 |   entry.playerIds = [player.id];
 42770 |   entry.encounterSessionId = session.id;
 42771 |   return entry;
 42772 | }
 42773 | 
 42774 | function activeEncounterSessionForPlayer(playerId, series = state.series, gym = state.gym) {
 42775 |   return (state.encounterSessions || []).find((session) => session.playerId === playerId
 42776 |     && session.series === series
```


#### Hit 6 — line 42839

```text
 42827 |   } else {
 42828 |     session = {
 42829 |       id: `encounter-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
 42830 |       playerId: player.id,
 42831 |       series: state.series,
 42832 |       gym: Number(state.gym),
 42833 |       phase: "action",
 42834 |       actionVisitId: visit.id,
 42835 |       actionVisitIds: [visit.id],
 42836 |       wheelId: definition.id,
 42837 |       maxRolls: Number(definition.rollsPerAction || 2),
 42838 |       includeFishing: false,
 42839 |       includeSurf: false,
 42840 |       removedEntryIds: [],
 42841 |       temporaryEntries: [],
 42842 |       weightOverrides: {},
 42843 |       resultSessionIds: [],
 42844 |       rolls: [],
 42845 |       status: "pending",
 42846 |       visualRotation: 0,
 42847 |       createdAt: new Date().toISOString()
 42848 |     };
 42849 |     state.encounterSessions.unshift(session);
 42850 |   }
 42851 |   linkActionOperation(visit.id, { featureType: "encounter", featureSessionId: session.id });
```


#### Hit 7 — line 47179

```text
 47167 |             </article>
 47168 |           `).join("") : `<p class="empty-state compact">Encounter results will appear here.</p>`}
 47169 |         </div>
 47170 |       </section>
 47171 |       <section class="encounter-controls">
 47172 |         <div class="wheel-meta">
 47173 |           <div><span>Trainer</span><strong>${escapeHtml(player.name)}</strong></div>
 47174 |           <div><span>Rolls</span><strong>${rolls.length}/${max}</strong></div>
 47175 |           <div><span>Active Options</span><strong>${entries.length}</strong></div>
 47176 |           <div><span>Rerolls</span><strong>Allowed</strong></div>
 47177 |         </div>
 47178 |         <div class="encounter-toggle-row">
 47179 |           <label><input type="checkbox" data-encounter-toggle="water" ${session.includeFishing || session.includeSurf ? "checked" : ""}> Include Fishing / Surf</label>
 47180 |           <label><input type="checkbox" data-encounter-weight-editing ${weightEditing ? "checked" : ""}${rolls.length ? " disabled" : ""}> Edit Weights</label>
 47181 |         </div>
 47182 |         <p class="gc-rule-note">Fishing and Surf are grouped for now. Later this should come from items/effects.</p>
 47183 |         <h3>Active Wheel Options</h3>
 47184 |         <div class="encounter-entry-list">
 47185 |           ${entries.map((entry) => `
 47186 |             <article class="encounter-entry${entry.id === finalEntryId ? " pointer-active" : ""}" data-encounter-entry-id="${escapeHtml(entry.id)}">
 47187 |               <div>
 47188 |                 <strong>${escapeHtml(entry.displayName || entry.pokemonName)}</strong>
 47189 |                 <span>${escapeHtml(entry.category || "land")}</span>
 47190 |               </div>
 47191 |               ${weightEditing ? `
```


#### Hit 8 — line 63729

```text
 63717 |     }
 63718 |     const doneButton = event.target.closest("[data-encounter-done]");
 63719 |     if (doneButton) {
 63720 |       closeEncounterSession(doneButton.dataset.encounterDone);
 63721 |       return;
 63722 |     }
 63723 |     const toggle = event.target.closest("[data-encounter-toggle]");
 63724 |     if (toggle) {
 63725 |       const session = selectedEncounterSession();
 63726 |       if (!session || (session.rolls || []).length) return;
 63727 |       if (toggle.dataset.encounterToggle === "water") {
 63728 |         session.includeFishing = toggle.checked;
 63729 |         session.includeSurf = toggle.checked;
 63730 |       }
 63731 |       saveState();
 63732 |       renderEncounterOverlay();
 63733 |       return;
 63734 |     }
 63735 |     const weightEditingToggle = event.target.closest("[data-encounter-weight-editing]");
 63736 |     if (weightEditingToggle) {
 63737 |       const session = selectedEncounterSession();
 63738 |       if (!session || (session.rolls || []).length) return;
 63739 |       session.weightEditing = weightEditingToggle.checked;
 63740 |       saveState();
 63741 |       renderEncounterOverlay();
```


### Hyperspace

Occurrences: 18

#### Hit 1 — line 6075

```text
  6063 | function normalizeEncounterEntryId(name, index = 0) {
  6064 |   const base = normalizePokemonName(name)
  6065 |     .replace(/-sf$/i, "")
  6066 |     .replace(/^hyperspace-hole$/i, "hyperspace-hole");
  6067 |   return index ? `${base}-${index + 1}` : base;
  6068 | }
  6069 | 
  6070 | function encounterEntry(name, index = 0) {
  6071 |   const raw = String(name || "").trim();
  6072 |   const isWater = /\s+SF$/i.test(raw);
  6073 |   const displayName = raw.replace(/\s+SF$/i, "").trim();
  6074 |   const id = normalizeEncounterEntryId(displayName, index);
  6075 |   const isHyperspace = normalizePokemonName(displayName) === "hyperspace-hole";
  6076 |   return {
  6077 |     id,
  6078 |     pokemonName: displayName,
  6079 |     displayName,
  6080 |     weight: 1,
  6081 |     category: isWater ? "fishing" : isHyperspace ? "special" : "land",
  6082 |     enabledByDefault: !isWater,
  6083 |     removable: true,
  6084 |     ...(isWater ? { notes: "Fishing / Surf encounter." } : {}),
  6085 |     ...(isHyperspace ? { specialWheelId: "hoenn-hyperspace-hole", notes: "Hoenn-only Hyperspace Hole sub-wheel." } : {})
  6086 |   };
  6087 | }
```


#### Hit 2 — line 6081

```text
  6069 | 
  6070 | function encounterEntry(name, index = 0) {
  6071 |   const raw = String(name || "").trim();
  6072 |   const isWater = /\s+SF$/i.test(raw);
  6073 |   const displayName = raw.replace(/\s+SF$/i, "").trim();
  6074 |   const id = normalizeEncounterEntryId(displayName, index);
  6075 |   const isHyperspace = normalizePokemonName(displayName) === "hyperspace-hole";
  6076 |   return {
  6077 |     id,
  6078 |     pokemonName: displayName,
  6079 |     displayName,
  6080 |     weight: 1,
  6081 |     category: isWater ? "fishing" : isHyperspace ? "special" : "land",
  6082 |     enabledByDefault: !isWater,
  6083 |     removable: true,
  6084 |     ...(isWater ? { notes: "Fishing / Surf encounter." } : {}),
  6085 |     ...(isHyperspace ? { specialWheelId: "hoenn-hyperspace-hole", notes: "Hoenn-only Hyperspace Hole sub-wheel." } : {})
  6086 |   };
  6087 | }
  6088 | 
  6089 | function makeEncounterWheel(series, gym, names) {
  6090 |   const seen = new Map();
  6091 |   return {
  6092 |     id: `${String(series).toLowerCase()}-gym-${gym}`,
  6093 |     series,
```


#### Hit 3 — line 6085

```text
  6073 |   const displayName = raw.replace(/\s+SF$/i, "").trim();
  6074 |   const id = normalizeEncounterEntryId(displayName, index);
  6075 |   const isHyperspace = normalizePokemonName(displayName) === "hyperspace-hole";
  6076 |   return {
  6077 |     id,
  6078 |     pokemonName: displayName,
  6079 |     displayName,
  6080 |     weight: 1,
  6081 |     category: isWater ? "fishing" : isHyperspace ? "special" : "land",
  6082 |     enabledByDefault: !isWater,
  6083 |     removable: true,
  6084 |     ...(isWater ? { notes: "Fishing / Surf encounter." } : {}),
  6085 |     ...(isHyperspace ? { specialWheelId: "hoenn-hyperspace-hole", notes: "Hoenn-only Hyperspace Hole sub-wheel." } : {})
  6086 |   };
  6087 | }
  6088 | 
  6089 | function makeEncounterWheel(series, gym, names) {
  6090 |   const seen = new Map();
  6091 |   return {
  6092 |     id: `${String(series).toLowerCase()}-gym-${gym}`,
  6093 |     series,
  6094 |     gym,
  6095 |     name: `${series} Gym ${gym} Encounter Wheel`,
  6096 |     rollsPerAction: 2,
  6097 |     rerollable: true,
```


#### Hit 4 — line 6085

```text
  6073 |   const displayName = raw.replace(/\s+SF$/i, "").trim();
  6074 |   const id = normalizeEncounterEntryId(displayName, index);
  6075 |   const isHyperspace = normalizePokemonName(displayName) === "hyperspace-hole";
  6076 |   return {
  6077 |     id,
  6078 |     pokemonName: displayName,
  6079 |     displayName,
  6080 |     weight: 1,
  6081 |     category: isWater ? "fishing" : isHyperspace ? "special" : "land",
  6082 |     enabledByDefault: !isWater,
  6083 |     removable: true,
  6084 |     ...(isWater ? { notes: "Fishing / Surf encounter." } : {}),
  6085 |     ...(isHyperspace ? { specialWheelId: "hoenn-hyperspace-hole", notes: "Hoenn-only Hyperspace Hole sub-wheel." } : {})
  6086 |   };
  6087 | }
  6088 | 
  6089 | function makeEncounterWheel(series, gym, names) {
  6090 |   const seen = new Map();
  6091 |   return {
  6092 |     id: `${String(series).toLowerCase()}-gym-${gym}`,
  6093 |     series,
  6094 |     gym,
  6095 |     name: `${series} Gym ${gym} Encounter Wheel`,
  6096 |     rollsPerAction: 2,
  6097 |     rerollable: true,
```


#### Hit 5 — line 6123

```text
  6111 |     gym: 1,
  6112 |     name: "Hoenn Starter Wheel",
  6113 |     timing: "Start of Gym 1 Phase",
  6114 |     trigger: "natural-event",
  6115 |     entries: ["Treecko", "Mudkip", "Torchic"].map((name) => encounterEntry(name))
  6116 |   }
  6117 | });
  6118 | 
  6119 | const hyperspaceWheelDefinitions = Object.freeze({
  6120 |   "hoenn-hyperspace-hole": {
  6121 |     id: "hoenn-hyperspace-hole",
  6122 |     series: "Hoenn",
  6123 |     name: "Hoenn Hyperspace Hole Wheel",
  6124 |     entries: [
  6125 |       "Rayquaza", "Cresselia", "Uxie", "Mesprit", "Azelf", "Landorus", "Thundurus", "Tornadus",
  6126 |       "Tornadus T", "Landorus T", "Thundurus T", "Dialga", "Palkia", "Giratina", "Groudon",
  6127 |       "Kyogre", "Jirachi", "Deoxys", "Deoxys A", "Deoxys S", "Deoxys D", "Kyurem", "Reshiram",
  6128 |       "Zekrom", "Cobalion", "Terrakion", "Virizion", "Regirock", "Regice", "Registeel",
  6129 |       "Regigigas", "Entei", "Raikou", "Suicune", "Latias", "Latios", "Heatran", "Ho-Oh", "Lugia"
  6130 |     ].map((name) => encounterEntry(name))
  6131 |   }
  6132 | });
  6133 | 
  6134 | const encounterWheelDefinitions = Object.freeze({
  6135 |   "kanto-gym-1": makeEncounterWheel("Kanto", 1, ["Pidgey", "Shinx", "Oddish", "Magikarp SF", "Tentacool SF"]),
```


#### Hit 6 — line 6143

```text
  6131 |   }
  6132 | });
  6133 | 
  6134 | const encounterWheelDefinitions = Object.freeze({
  6135 |   "kanto-gym-1": makeEncounterWheel("Kanto", 1, ["Pidgey", "Shinx", "Oddish", "Magikarp SF", "Tentacool SF"]),
  6136 |   "hoenn-gym-1": makeEncounterWheel("Hoenn", 1, [
  6137 |     "Chikorita", "Cyndaquil", "Totodile", "Wurmple", "Zigzagoon", "Poochyena", "Lillipup", "Zorua",
  6138 |     "Sewaddle", "Turtwig", "Chimchar", "Piplup", "Snivy", "Oshawott", "Tepig", "Wingull",
  6139 |     "Wailmer SF", "Carvanha SF", "Chatot", "Shellos", "Tentacool SF", "Magikarp SF", "Lotad",
  6140 |     "Seedot", "Ralts", "Surskit", "Gothita", "Tympole", "Marill", "Corphish SF", "Goldeen SF",
  6141 |     "Taillow", "Pidove", "Shroomish", "Slakoth", "Cottonee", "Paras", "Phantump", "Omanyte",
  6142 |     "Kabuto", "Aerodactyl", "Lileep", "Anorith", "Cranidos", "Shieldon", "Tirtouga", "Archen",
  6143 |     "Tyrunt", "Amaura", "Makuhita", "Whismur", "Nincada", "Skitty", "Hyperspace Hole", "Joltik",
  6144 |     "Eevee", "Abra", "Geodude"
  6145 |   ]),
  6146 |   "hoenn-gym-2": makeEncounterWheel("Hoenn", 2, [
  6147 |     "Tentacool SF", "Wingull SF", "Wailmer SF", "Magikarp SF", "Zubat", "Makuhita", "Geodude",
  6148 |     "Abra", "Timburr", "Axew", "Onix", "Aron", "Sableye", "Mawile", "Nosepass", "Electrike",
  6149 |     "Zigzagoon", "Gulpin", "Plusle", "Minun", "Oddish", "Hyperspace Hole", "Voltorb", "Trubbish",
  6150 |     "Chatot", "Shellos", "Magnemite", "Poochyena"
  6151 |   ]),
  6152 |   "hoenn-gym-3": makeEncounterWheel("Hoenn", 3, [
  6153 |     "Zigzagoon", "Roselia", "Marill", "Volbeat", "Illumise", "Oddish", "Surskit", "Rattata",
  6154 |     "Deerling", "Tympole SF", "Corphish SF", "Magikarp SF", "Goldeen SF", "Poochyena", "Seedot",
  6155 |     "Numel", "Machop", "Ponyta", "Throh", "Sawk", "Tyrogue", "Hyperspace Hole"
```


#### Hit 7 — line 6149

```text
  6137 |     "Chikorita", "Cyndaquil", "Totodile", "Wurmple", "Zigzagoon", "Poochyena", "Lillipup", "Zorua",
  6138 |     "Sewaddle", "Turtwig", "Chimchar", "Piplup", "Snivy", "Oshawott", "Tepig", "Wingull",
  6139 |     "Wailmer SF", "Carvanha SF", "Chatot", "Shellos", "Tentacool SF", "Magikarp SF", "Lotad",
  6140 |     "Seedot", "Ralts", "Surskit", "Gothita", "Tympole", "Marill", "Corphish SF", "Goldeen SF",
  6141 |     "Taillow", "Pidove", "Shroomish", "Slakoth", "Cottonee", "Paras", "Phantump", "Omanyte",
  6142 |     "Kabuto", "Aerodactyl", "Lileep", "Anorith", "Cranidos", "Shieldon", "Tirtouga", "Archen",
  6143 |     "Tyrunt", "Amaura", "Makuhita", "Whismur", "Nincada", "Skitty", "Hyperspace Hole", "Joltik",
  6144 |     "Eevee", "Abra", "Geodude"
  6145 |   ]),
  6146 |   "hoenn-gym-2": makeEncounterWheel("Hoenn", 2, [
  6147 |     "Tentacool SF", "Wingull SF", "Wailmer SF", "Magikarp SF", "Zubat", "Makuhita", "Geodude",
  6148 |     "Abra", "Timburr", "Axew", "Onix", "Aron", "Sableye", "Mawile", "Nosepass", "Electrike",
  6149 |     "Zigzagoon", "Gulpin", "Plusle", "Minun", "Oddish", "Hyperspace Hole", "Voltorb", "Trubbish",
  6150 |     "Chatot", "Shellos", "Magnemite", "Poochyena"
  6151 |   ]),
  6152 |   "hoenn-gym-3": makeEncounterWheel("Hoenn", 3, [
  6153 |     "Zigzagoon", "Roselia", "Marill", "Volbeat", "Illumise", "Oddish", "Surskit", "Rattata",
  6154 |     "Deerling", "Tympole SF", "Corphish SF", "Magikarp SF", "Goldeen SF", "Poochyena", "Seedot",
  6155 |     "Numel", "Machop", "Ponyta", "Throh", "Sawk", "Tyrogue", "Hyperspace Hole"
  6156 |   ]),
  6157 |   "hoenn-gym-4": makeEncounterWheel("Hoenn", 4, [
  6158 |     "Spinda", "Sandshrew", "Skarmory", "Scraggy", "Klefki", "Bouffalant", "Slugma", "Numel",
  6159 |     "Koffing", "Torkoal", "Grimer", "Roggenrola", "Diglett", "Tyrogue", "Swablu", "Lombre",
  6160 |     "Nuzleaf", "Zangoose", "Seviper", "Surskit", "Skorupi", "Misdreavus", "Tympole", "Swablu",
  6161 |     "Azumarill SF", "Barboach SF", "Magikarp SF", "Goldeen SF", "Geodude", "Zubat", "Lunatone",
```


#### Hit 8 — line 6155

```text
  6143 |     "Tyrunt", "Amaura", "Makuhita", "Whismur", "Nincada", "Skitty", "Hyperspace Hole", "Joltik",
  6144 |     "Eevee", "Abra", "Geodude"
  6145 |   ]),
  6146 |   "hoenn-gym-2": makeEncounterWheel("Hoenn", 2, [
  6147 |     "Tentacool SF", "Wingull SF", "Wailmer SF", "Magikarp SF", "Zubat", "Makuhita", "Geodude",
  6148 |     "Abra", "Timburr", "Axew", "Onix", "Aron", "Sableye", "Mawile", "Nosepass", "Electrike",
  6149 |     "Zigzagoon", "Gulpin", "Plusle", "Minun", "Oddish", "Hyperspace Hole", "Voltorb", "Trubbish",
  6150 |     "Chatot", "Shellos", "Magnemite", "Poochyena"
  6151 |   ]),
  6152 |   "hoenn-gym-3": makeEncounterWheel("Hoenn", 3, [
  6153 |     "Zigzagoon", "Roselia", "Marill", "Volbeat", "Illumise", "Oddish", "Surskit", "Rattata",
  6154 |     "Deerling", "Tympole SF", "Corphish SF", "Magikarp SF", "Goldeen SF", "Poochyena", "Seedot",
  6155 |     "Numel", "Machop", "Ponyta", "Throh", "Sawk", "Tyrogue", "Hyperspace Hole"
  6156 |   ]),
  6157 |   "hoenn-gym-4": makeEncounterWheel("Hoenn", 4, [
  6158 |     "Spinda", "Sandshrew", "Skarmory", "Scraggy", "Klefki", "Bouffalant", "Slugma", "Numel",
  6159 |     "Koffing", "Torkoal", "Grimer", "Roggenrola", "Diglett", "Tyrogue", "Swablu", "Lombre",
  6160 |     "Nuzleaf", "Zangoose", "Seviper", "Surskit", "Skorupi", "Misdreavus", "Tympole", "Swablu",
  6161 |     "Azumarill SF", "Barboach SF", "Magikarp SF", "Goldeen SF", "Geodude", "Zubat", "Lunatone",
  6162 |     "Solrock", "Deino", "Druddigon", "Clefairy", "Bagon", "Taillow", "Jigglypuff", "Wingull",
  6163 |     "Pidove", "Wailmer", "Tentacool", "Spoink", "Mankey", "Ponyta", "Wynaut", "Hyperspace Hole"
  6164 |   ]),
  6165 |   "hoenn-gym-5": makeEncounterWheel("Hoenn", 5, [
  6166 |     "Sandshrew", "Trapinch", "Cacnea", "Baltoy", "Sandile", "Dwebble", "Gible", "Marill",
  6167 |     "Surskit", "Barboach SF", "Magikarp SF", "Goldeen SF", "Geodude", "Frillish SF", "Skrelp SF",
```


#### Hit 9 — line 6163

```text
  6151 |   ]),
  6152 |   "hoenn-gym-3": makeEncounterWheel("Hoenn", 3, [
  6153 |     "Zigzagoon", "Roselia", "Marill", "Volbeat", "Illumise", "Oddish", "Surskit", "Rattata",
  6154 |     "Deerling", "Tympole SF", "Corphish SF", "Magikarp SF", "Goldeen SF", "Poochyena", "Seedot",
  6155 |     "Numel", "Machop", "Ponyta", "Throh", "Sawk", "Tyrogue", "Hyperspace Hole"
  6156 |   ]),
  6157 |   "hoenn-gym-4": makeEncounterWheel("Hoenn", 4, [
  6158 |     "Spinda", "Sandshrew", "Skarmory", "Scraggy", "Klefki", "Bouffalant", "Slugma", "Numel",
  6159 |     "Koffing", "Torkoal", "Grimer", "Roggenrola", "Diglett", "Tyrogue", "Swablu", "Lombre",
  6160 |     "Nuzleaf", "Zangoose", "Seviper", "Surskit", "Skorupi", "Misdreavus", "Tympole", "Swablu",
  6161 |     "Azumarill SF", "Barboach SF", "Magikarp SF", "Goldeen SF", "Geodude", "Zubat", "Lunatone",
  6162 |     "Solrock", "Deino", "Druddigon", "Clefairy", "Bagon", "Taillow", "Jigglypuff", "Wingull",
  6163 |     "Pidove", "Wailmer", "Tentacool", "Spoink", "Mankey", "Ponyta", "Wynaut", "Hyperspace Hole"
  6164 |   ]),
  6165 |   "hoenn-gym-5": makeEncounterWheel("Hoenn", 5, [
  6166 |     "Sandshrew", "Trapinch", "Cacnea", "Baltoy", "Sandile", "Dwebble", "Gible", "Marill",
  6167 |     "Surskit", "Barboach SF", "Magikarp SF", "Goldeen SF", "Geodude", "Frillish SF", "Skrelp SF",
  6168 |     "Clauncher SF", "Krabby SF", "Tentacool SF", "Wingull SF", "Wailmer SF", "Clamperl SF",
  6169 |     "Lanturn SF", "Relicanth SF", "Spiritomb", "Hyperspace Hole"
  6170 |   ]),
  6171 |   "hoenn-gym-6": makeEncounterWheel("Hoenn", 6, [
  6172 |     "Linoone", "Manectric", "Pelipper", "Kecleon", "Raticate", "Luxio", "Aipom", "Tentacool SF",
  6173 |     "Sharpedo SF", "Magikarp SF", "Goldeen SF", "Gloom", "Tropius", "Feebas SF", "Castform",
  6174 |     "Skitty", "Plusle", "Shuppet", "Duskull", "Marill SF", "Surskit SF", "Corphish SF",
  6175 |     "Mightyena", "Wailmer SF", "Hyperspace Hole"
```


#### Hit 10 — line 6169

```text
  6157 |   "hoenn-gym-4": makeEncounterWheel("Hoenn", 4, [
  6158 |     "Spinda", "Sandshrew", "Skarmory", "Scraggy", "Klefki", "Bouffalant", "Slugma", "Numel",
  6159 |     "Koffing", "Torkoal", "Grimer", "Roggenrola", "Diglett", "Tyrogue", "Swablu", "Lombre",
  6160 |     "Nuzleaf", "Zangoose", "Seviper", "Surskit", "Skorupi", "Misdreavus", "Tympole", "Swablu",
  6161 |     "Azumarill SF", "Barboach SF", "Magikarp SF", "Goldeen SF", "Geodude", "Zubat", "Lunatone",
  6162 |     "Solrock", "Deino", "Druddigon", "Clefairy", "Bagon", "Taillow", "Jigglypuff", "Wingull",
  6163 |     "Pidove", "Wailmer", "Tentacool", "Spoink", "Mankey", "Ponyta", "Wynaut", "Hyperspace Hole"
  6164 |   ]),
  6165 |   "hoenn-gym-5": makeEncounterWheel("Hoenn", 5, [
  6166 |     "Sandshrew", "Trapinch", "Cacnea", "Baltoy", "Sandile", "Dwebble", "Gible", "Marill",
  6167 |     "Surskit", "Barboach SF", "Magikarp SF", "Goldeen SF", "Geodude", "Frillish SF", "Skrelp SF",
  6168 |     "Clauncher SF", "Krabby SF", "Tentacool SF", "Wingull SF", "Wailmer SF", "Clamperl SF",
  6169 |     "Lanturn SF", "Relicanth SF", "Spiritomb", "Hyperspace Hole"
  6170 |   ]),
  6171 |   "hoenn-gym-6": makeEncounterWheel("Hoenn", 6, [
  6172 |     "Linoone", "Manectric", "Pelipper", "Kecleon", "Raticate", "Luxio", "Aipom", "Tentacool SF",
  6173 |     "Sharpedo SF", "Magikarp SF", "Goldeen SF", "Gloom", "Tropius", "Feebas SF", "Castform",
  6174 |     "Skitty", "Plusle", "Shuppet", "Duskull", "Marill SF", "Surskit SF", "Corphish SF",
  6175 |     "Mightyena", "Wailmer SF", "Hyperspace Hole"
  6176 |   ]),
  6177 |   "hoenn-gym-7": makeEncounterWheel("Hoenn", 7, [
  6178 |     "Oddish", "Marill", "Kecleon", "Linoone", "Tropius", "Absol", "Surskit", "Barboach SF",
  6179 |     "Magikarp SF", "Tentacool SF", "Goldeen SF", "Mightyena", "Seedot", "Golbat", "Shuppet",
  6180 |     "Pelipper", "Elgyem", "Hypno", "Aipom", "Duskull", "Wailmer SF", "Doduo", "Psyduck",
  6181 |     "Rhyhorn", "Kakuna", "Pidgeotto", "Buneary", "Heracross", "Donphan", "Pinsir", "Xatu",
```


#### Hit 11 — line 6175

```text
  6163 |     "Pidove", "Wailmer", "Tentacool", "Spoink", "Mankey", "Ponyta", "Wynaut", "Hyperspace Hole"
  6164 |   ]),
  6165 |   "hoenn-gym-5": makeEncounterWheel("Hoenn", 5, [
  6166 |     "Sandshrew", "Trapinch", "Cacnea", "Baltoy", "Sandile", "Dwebble", "Gible", "Marill",
  6167 |     "Surskit", "Barboach SF", "Magikarp SF", "Goldeen SF", "Geodude", "Frillish SF", "Skrelp SF",
  6168 |     "Clauncher SF", "Krabby SF", "Tentacool SF", "Wingull SF", "Wailmer SF", "Clamperl SF",
  6169 |     "Lanturn SF", "Relicanth SF", "Spiritomb", "Hyperspace Hole"
  6170 |   ]),
  6171 |   "hoenn-gym-6": makeEncounterWheel("Hoenn", 6, [
  6172 |     "Linoone", "Manectric", "Pelipper", "Kecleon", "Raticate", "Luxio", "Aipom", "Tentacool SF",
  6173 |     "Sharpedo SF", "Magikarp SF", "Goldeen SF", "Gloom", "Tropius", "Feebas SF", "Castform",
  6174 |     "Skitty", "Plusle", "Shuppet", "Duskull", "Marill SF", "Surskit SF", "Corphish SF",
  6175 |     "Mightyena", "Wailmer SF", "Hyperspace Hole"
  6176 |   ]),
  6177 |   "hoenn-gym-7": makeEncounterWheel("Hoenn", 7, [
  6178 |     "Oddish", "Marill", "Kecleon", "Linoone", "Tropius", "Absol", "Surskit", "Barboach SF",
  6179 |     "Magikarp SF", "Tentacool SF", "Goldeen SF", "Mightyena", "Seedot", "Golbat", "Shuppet",
  6180 |     "Pelipper", "Elgyem", "Hypno", "Aipom", "Duskull", "Wailmer SF", "Doduo", "Psyduck",
  6181 |     "Rhyhorn", "Kakuna", "Pidgeotto", "Buneary", "Heracross", "Donphan", "Pinsir", "Xatu",
  6182 |     "Wobbuffet", "Pikachu", "Girafarig", "Teddiursa", "Hoothoot", "Pineco", "Houndour",
  6183 |     "Miltank", "Ledyba", "Sunkern", "Shuckle", "Geodude", "Mareep", "Gligar", "Snubbull",
  6184 |     "Stantler", "Spinarak", "Quagsire SF", "Octillery SF", "Frillish SF", "Finneon SF",
  6185 |     "Alomomola SF", "Sharpedo SF", "Meditite", "Vulpix", "Bronzor", "Growlithe", "Chimecho",
  6186 |     "Staryu", "Electrode", "Torkoal", "Hyperspace Hole", "Lanturn SF", "Clamperl SF",
  6187 |     "Relicanth SF", "Beldum", "Seel", "Spheal", "Snorunt", "Cubchoo", "Delibird"
```


#### Hit 12 — line 6186

```text
  6174 |     "Skitty", "Plusle", "Shuppet", "Duskull", "Marill SF", "Surskit SF", "Corphish SF",
  6175 |     "Mightyena", "Wailmer SF", "Hyperspace Hole"
  6176 |   ]),
  6177 |   "hoenn-gym-7": makeEncounterWheel("Hoenn", 7, [
  6178 |     "Oddish", "Marill", "Kecleon", "Linoone", "Tropius", "Absol", "Surskit", "Barboach SF",
  6179 |     "Magikarp SF", "Tentacool SF", "Goldeen SF", "Mightyena", "Seedot", "Golbat", "Shuppet",
  6180 |     "Pelipper", "Elgyem", "Hypno", "Aipom", "Duskull", "Wailmer SF", "Doduo", "Psyduck",
  6181 |     "Rhyhorn", "Kakuna", "Pidgeotto", "Buneary", "Heracross", "Donphan", "Pinsir", "Xatu",
  6182 |     "Wobbuffet", "Pikachu", "Girafarig", "Teddiursa", "Hoothoot", "Pineco", "Houndour",
  6183 |     "Miltank", "Ledyba", "Sunkern", "Shuckle", "Geodude", "Mareep", "Gligar", "Snubbull",
  6184 |     "Stantler", "Spinarak", "Quagsire SF", "Octillery SF", "Frillish SF", "Finneon SF",
  6185 |     "Alomomola SF", "Sharpedo SF", "Meditite", "Vulpix", "Bronzor", "Growlithe", "Chimecho",
  6186 |     "Staryu", "Electrode", "Torkoal", "Hyperspace Hole", "Lanturn SF", "Clamperl SF",
  6187 |     "Relicanth SF", "Beldum", "Seel", "Spheal", "Snorunt", "Cubchoo", "Delibird"
  6188 |   ]),
  6189 |   "hoenn-gym-8": makeEncounterWheel("Hoenn", 8, [
  6190 |     "Frillish SF", "Finneon SF", "Alomomola SF", "Tentacool SF", "Pelipper SF", "Wailmer SF",
  6191 |     "Magikarp SF", "Chinchou SF", "Clamperl SF", "Relicanth SF", "Sharpedo SF", "Luvdisc SF",
  6192 |     "Corsola SF", "Golbat", "Graveler", "Hyperspace Hole", "Horsea SF", "Claydol", "Ariados",
  6193 |     "Sableye", "Mawile", "Swablu", "Banette", "Dusclops"
  6194 |   ]),
  6195 |   "hoenn-gym-9": makeEncounterWheel("Hoenn", 9, [
  6196 |     "Tentacool SF", "Pelipper SF", "Luvdisc SF", "Wailmer SF", "Corsola SF", "Magikarp SF",
  6197 |     "Golbat SF", "Lairon", "Hariyama", "Loudred", "Sableye", "Mawile", "Medicham", "Barboach SF",
  6198 |     "Goldeen SF", "Mantine SF", "Remoraid SF", "Hyperspace Hole", "Tangela", "Glameow",
```


#### Hit 13 — line 6192

```text
  6180 |     "Pelipper", "Elgyem", "Hypno", "Aipom", "Duskull", "Wailmer SF", "Doduo", "Psyduck",
  6181 |     "Rhyhorn", "Kakuna", "Pidgeotto", "Buneary", "Heracross", "Donphan", "Pinsir", "Xatu",
  6182 |     "Wobbuffet", "Pikachu", "Girafarig", "Teddiursa", "Hoothoot", "Pineco", "Houndour",
  6183 |     "Miltank", "Ledyba", "Sunkern", "Shuckle", "Geodude", "Mareep", "Gligar", "Snubbull",
  6184 |     "Stantler", "Spinarak", "Quagsire SF", "Octillery SF", "Frillish SF", "Finneon SF",
  6185 |     "Alomomola SF", "Sharpedo SF", "Meditite", "Vulpix", "Bronzor", "Growlithe", "Chimecho",
  6186 |     "Staryu", "Electrode", "Torkoal", "Hyperspace Hole", "Lanturn SF", "Clamperl SF",
  6187 |     "Relicanth SF", "Beldum", "Seel", "Spheal", "Snorunt", "Cubchoo", "Delibird"
  6188 |   ]),
  6189 |   "hoenn-gym-8": makeEncounterWheel("Hoenn", 8, [
  6190 |     "Frillish SF", "Finneon SF", "Alomomola SF", "Tentacool SF", "Pelipper SF", "Wailmer SF",
  6191 |     "Magikarp SF", "Chinchou SF", "Clamperl SF", "Relicanth SF", "Sharpedo SF", "Luvdisc SF",
  6192 |     "Corsola SF", "Golbat", "Graveler", "Hyperspace Hole", "Horsea SF", "Claydol", "Ariados",
  6193 |     "Sableye", "Mawile", "Swablu", "Banette", "Dusclops"
  6194 |   ]),
  6195 |   "hoenn-gym-9": makeEncounterWheel("Hoenn", 9, [
  6196 |     "Tentacool SF", "Pelipper SF", "Luvdisc SF", "Wailmer SF", "Corsola SF", "Magikarp SF",
  6197 |     "Golbat SF", "Lairon", "Hariyama", "Loudred", "Sableye", "Mawile", "Medicham", "Barboach SF",
  6198 |     "Goldeen SF", "Mantine SF", "Remoraid SF", "Hyperspace Hole", "Tangela", "Glameow",
  6199 |     "Sunkern", "Minccino", "Venomoth", "Zebstrika", "Xatu", "Maractus", "Graveler", "Binacle",
  6200 |     "Persian", "Audino", "Munna", "Ditto", "Darmanitan", "Larvesta", "Porygon", "Forretress",
  6201 |     "Stantler", "Donphan", "Kricketune", "Rufflet", "Vullaby", "Vulpix", "Girafarig", "Magby",
  6202 |     "Elekid", "Crustle", "Happiny", "Klink", "Tynamo", "Boldore", "Excadrill", "Onix",
  6203 |     "Cofagrigus", "Slowpoke", "Unown", "Petilil", "Cherrim"
  6204 |   ])
```


#### Hit 14 — line 6198

```text
  6186 |     "Staryu", "Electrode", "Torkoal", "Hyperspace Hole", "Lanturn SF", "Clamperl SF",
  6187 |     "Relicanth SF", "Beldum", "Seel", "Spheal", "Snorunt", "Cubchoo", "Delibird"
  6188 |   ]),
  6189 |   "hoenn-gym-8": makeEncounterWheel("Hoenn", 8, [
  6190 |     "Frillish SF", "Finneon SF", "Alomomola SF", "Tentacool SF", "Pelipper SF", "Wailmer SF",
  6191 |     "Magikarp SF", "Chinchou SF", "Clamperl SF", "Relicanth SF", "Sharpedo SF", "Luvdisc SF",
  6192 |     "Corsola SF", "Golbat", "Graveler", "Hyperspace Hole", "Horsea SF", "Claydol", "Ariados",
  6193 |     "Sableye", "Mawile", "Swablu", "Banette", "Dusclops"
  6194 |   ]),
  6195 |   "hoenn-gym-9": makeEncounterWheel("Hoenn", 9, [
  6196 |     "Tentacool SF", "Pelipper SF", "Luvdisc SF", "Wailmer SF", "Corsola SF", "Magikarp SF",
  6197 |     "Golbat SF", "Lairon", "Hariyama", "Loudred", "Sableye", "Mawile", "Medicham", "Barboach SF",
  6198 |     "Goldeen SF", "Mantine SF", "Remoraid SF", "Hyperspace Hole", "Tangela", "Glameow",
  6199 |     "Sunkern", "Minccino", "Venomoth", "Zebstrika", "Xatu", "Maractus", "Graveler", "Binacle",
  6200 |     "Persian", "Audino", "Munna", "Ditto", "Darmanitan", "Larvesta", "Porygon", "Forretress",
  6201 |     "Stantler", "Donphan", "Kricketune", "Rufflet", "Vullaby", "Vulpix", "Girafarig", "Magby",
  6202 |     "Elekid", "Crustle", "Happiny", "Klink", "Tynamo", "Boldore", "Excadrill", "Onix",
  6203 |     "Cofagrigus", "Slowpoke", "Unown", "Petilil", "Cherrim"
  6204 |   ])
  6205 | });
  6206 | 
  6207 | const silphCoMovePool = Object.freeze((window.rivalSagaSilphCoMovePool || [
  6208 |   "Thunderbolt",
  6209 |   "Ice Beam",
  6210 |   "Flamethrower",
```


#### Hit 15 — line 41993

```text
 41981 |     .forEach((session) => {
 41982 |       const owner = state.players.find((player) => player.id === session.playerId);
 41983 |       (session.rolls || [])
 41984 |         .filter((roll) => !roll.rosterPokemonId)
 41985 |         .forEach((roll) => {
 41986 |           targets.push({
 41987 |             id: `encounter-roll:${session.id}:${roll.id}`,
 41988 |             kind: "encounter-roll",
 41989 |             targetResultId: roll.id,
 41990 |             encounterSessionId: session.id,
 41991 |             ownerPlayerId: session.playerId,
 41992 |             ownerName: owner?.name || "Unknown",
 41993 |             sourceLabel: roll.specialEncounter ? "Encounter / Hyperspace" : "Encounter Wheel",
 41994 |             resultName: roll.resultDisplayName || "Pending encounter",
 41995 |             meta: `${session.series || state.series} Gym ${session.gym || state.gym}`
 41996 |           });
 41997 |         });
 41998 |     });
 41999 |   return targets;
 42000 | }
 42001 | 
 42002 | function closeRerollTargetModal() {
 42003 |   state.rerollTargetActorPlayerId = "";
 42004 |   els.rerollTargetModal?.classList.add("hidden");
 42005 | }
```


#### Hit 16 — line 42362

```text
 42350 |     state.effectOperations.push(operation);
 42351 |     recordRerollTokenHistory({ snapshot: causalBeforeReroll, actor, token: rerollToken, sourceEffectId,
 42352 |       targetResultId: roll.id, targetPlayerId: player.id, previousName: previousResult.resultDisplayName,
 42353 |       nextName, resultKind: "encounter-roll" });
 42354 |   }
 42355 |   updateEncounterActionLog(session, player, (entry) => {
 42356 |     appendLogCategory(entry, "items");
 42357 |     appendLogCategory(entry, "pokemon");
 42358 |     appendUniqueLogValue(entry, "tags", "encounter-reroll");
 42359 |     if (rerollToken?.name) appendUniqueLogValue(entry, "tokenNames", rerollToken.name);
 42360 |     appendUniqueLogValue(entry, "playerIds", actor.id);
 42361 |     appendUniqueLogValue(entry, "pokemonNames", nextName);
 42362 |     const modeLabel = rerollMode === "encounter" ? "Encounter respin" : shouldStayInSpecialWheel ? "Hyperspace reroll" : "Encounter reroll";
 42363 |     appendGroupedLogDetail(entry, freeRerollReason
 42364 |       ? `${modeLabel} (${freeRerollReason}): ${previousResult.resultDisplayName} -> ${nextName}.`
 42365 |       : `${actor.name} used Reroll Token on ${player.name}'s ${modeLabel}: ${previousResult.resultDisplayName} -> ${nextName}.`);
 42366 |     entry.childEvents ||= [];
 42367 |     entry.childEvents.push({
 42368 |       type: "encounter-reroll",
 42369 |       category: "items",
 42370 |       tokenId: rerollToken?.id || "",
 42371 |       tokenName: rerollToken?.name || "",
 42372 |       actorPlayerId: actor.id,
 42373 |       targetPlayerId: player.id,
 42374 |       targetResultId: roll.id,
```


#### Hit 17 — line 47163

```text
 47151 |         <h3>Results</h3>
 47152 |         <div class="encounter-result-list">
 47153 |           ${rolls.length ? rolls.map((roll, index) => `
 47154 |             <article class="encounter-result-card">
 47155 |               <div class="encounter-result-art">${roll.resultSprite ? `<img src="${escapeHtml(roll.resultSprite)}" alt="${escapeHtml(roll.resultDisplayName)}">` : `<span>${escapeHtml((roll.resultDisplayName || "?").slice(0, 1))}</span>`}</div>
 47156 |               <div>
 47157 |                 <strong>#${index + 1}: ${escapeHtml(roll.resultDisplayName)}</strong>
 47158 |                 <span>${roll.specialEncounter ? `${escapeHtml(roll.specialEncounter.triggerName)} -> ${escapeHtml(roll.specialEncounter.wheelName)}` : escapeHtml(roll.category || "land")} - ${escapeHtml(pokemonBattleTierSummary(roll.resultDisplayName || roll.resultPokemonName, "Unassigned"))}${roll.rerollHistory?.length ? ` - ${roll.rerollHistory.length} reroll${roll.rerollHistory.length === 1 ? "" : "s"}` : ""}</span>
 47159 |               </div>
 47160 |               <div class="encounter-result-actions">
 47161 |                 ${roll.rosterPokemonId ? `<span class="encounter-result-added">Added</span>` : `
 47162 |                   <button class="buy-button mini-button" type="button" data-encounter-add="${escapeHtml(roll.id)}">Add</button>
 47163 |                   <button class="ghost-button mini-button" type="button" data-encounter-reroll="${escapeHtml(roll.id)}" data-encounter-reroll-mode="result"${rollFreeRerollReasons[roll.id] || rerollTokenCount ? "" : " disabled"} title="${roll.specialEncounter ? `Spend ${player.name}'s Reroll Token to reroll within the Hyperspace sub-wheel.` : rollFreeRerollReasons[roll.id] ? `Free reroll: ${escapeHtml(rollFreeRerollReasons[roll.id])}` : rerollTokenCount ? `Spend ${player.name}'s Reroll Token on this encounter result.` : `${player.name} needs a Reroll Token.`}">${roll.specialEncounter ? "Owner Reroll Hyperspace" : rollFreeRerollReasons[roll.id] ? "Free Reroll" : `Owner Reroll${rerollTokenCount ? ` (${rerollTokenCount})` : ""}`}</button>
 47164 |                   ${roll.specialEncounter ? `<button class="ghost-button mini-button danger-lite" type="button" data-encounter-reroll="${escapeHtml(roll.id)}" data-encounter-reroll-mode="encounter"${rollFreeRerollReasons[roll.id] || rerollTokenCount ? "" : " disabled"} title="${rollFreeRerollReasons[roll.id] ? `Free respin: ${escapeHtml(rollFreeRerollReasons[roll.id])}` : rerollTokenCount ? `Spend ${player.name}'s Reroll Token to respin the original Encounter Wheel result.` : `${player.name} needs a Reroll Token.`}">Owner Respin Encounter</button>` : ""}
 47165 |                 `}
 47166 |               </div>
 47167 |             </article>
 47168 |           `).join("") : `<p class="empty-state compact">Encounter results will appear here.</p>`}
 47169 |         </div>
 47170 |       </section>
 47171 |       <section class="encounter-controls">
 47172 |         <div class="wheel-meta">
 47173 |           <div><span>Trainer</span><strong>${escapeHtml(player.name)}</strong></div>
 47174 |           <div><span>Rolls</span><strong>${rolls.length}/${max}</strong></div>
 47175 |           <div><span>Active Options</span><strong>${entries.length}</strong></div>
```


#### Hit 18 — line 47163

```text
 47151 |         <h3>Results</h3>
 47152 |         <div class="encounter-result-list">
 47153 |           ${rolls.length ? rolls.map((roll, index) => `
 47154 |             <article class="encounter-result-card">
 47155 |               <div class="encounter-result-art">${roll.resultSprite ? `<img src="${escapeHtml(roll.resultSprite)}" alt="${escapeHtml(roll.resultDisplayName)}">` : `<span>${escapeHtml((roll.resultDisplayName || "?").slice(0, 1))}</span>`}</div>
 47156 |               <div>
 47157 |                 <strong>#${index + 1}: ${escapeHtml(roll.resultDisplayName)}</strong>
 47158 |                 <span>${roll.specialEncounter ? `${escapeHtml(roll.specialEncounter.triggerName)} -> ${escapeHtml(roll.specialEncounter.wheelName)}` : escapeHtml(roll.category || "land")} - ${escapeHtml(pokemonBattleTierSummary(roll.resultDisplayName || roll.resultPokemonName, "Unassigned"))}${roll.rerollHistory?.length ? ` - ${roll.rerollHistory.length} reroll${roll.rerollHistory.length === 1 ? "" : "s"}` : ""}</span>
 47159 |               </div>
 47160 |               <div class="encounter-result-actions">
 47161 |                 ${roll.rosterPokemonId ? `<span class="encounter-result-added">Added</span>` : `
 47162 |                   <button class="buy-button mini-button" type="button" data-encounter-add="${escapeHtml(roll.id)}">Add</button>
 47163 |                   <button class="ghost-button mini-button" type="button" data-encounter-reroll="${escapeHtml(roll.id)}" data-encounter-reroll-mode="result"${rollFreeRerollReasons[roll.id] || rerollTokenCount ? "" : " disabled"} title="${roll.specialEncounter ? `Spend ${player.name}'s Reroll Token to reroll within the Hyperspace sub-wheel.` : rollFreeRerollReasons[roll.id] ? `Free reroll: ${escapeHtml(rollFreeRerollReasons[roll.id])}` : rerollTokenCount ? `Spend ${player.name}'s Reroll Token on this encounter result.` : `${player.name} needs a Reroll Token.`}">${roll.specialEncounter ? "Owner Reroll Hyperspace" : rollFreeRerollReasons[roll.id] ? "Free Reroll" : `Owner Reroll${rerollTokenCount ? ` (${rerollTokenCount})` : ""}`}</button>
 47164 |                   ${roll.specialEncounter ? `<button class="ghost-button mini-button danger-lite" type="button" data-encounter-reroll="${escapeHtml(roll.id)}" data-encounter-reroll-mode="encounter"${rollFreeRerollReasons[roll.id] || rerollTokenCount ? "" : " disabled"} title="${rollFreeRerollReasons[roll.id] ? `Free respin: ${escapeHtml(rollFreeRerollReasons[roll.id])}` : rerollTokenCount ? `Spend ${player.name}'s Reroll Token to respin the original Encounter Wheel result.` : `${player.name} needs a Reroll Token.`}">Owner Respin Encounter</button>` : ""}
 47165 |                 `}
 47166 |               </div>
 47167 |             </article>
 47168 |           `).join("") : `<p class="empty-state compact">Encounter results will appear here.</p>`}
 47169 |         </div>
 47170 |       </section>
 47171 |       <section class="encounter-controls">
 47172 |         <div class="wheel-meta">
 47173 |           <div><span>Trainer</span><strong>${escapeHtml(player.name)}</strong></div>
 47174 |           <div><span>Rolls</span><strong>${rolls.length}/${max}</strong></div>
 47175 |           <div><span>Active Options</span><strong>${entries.length}</strong></div>
```


### randomPokemonSessions

Occurrences: 40+

#### Hit 1 — line 2565

```text
  2553 |       adminWarnings: []
  2554 |     },
  2555 |     infoBattleTierRoller: {
  2556 |       tierId: "",
  2557 |       result: null
  2558 |     },
  2559 |     selectedWheelSessionId: "",
  2560 |     wheelDrawerOpen: false,
  2561 |     skipWheelAnimation: false,
  2562 |     encounterSessions: [],
  2563 |     selectedEncounterSessionId: "",
  2564 |     encounterModalOpen: false,
  2565 |     randomPokemonSessions: [],
  2566 |     pokemonFamilyTierCache: {},
  2567 |     pokemonSpriteVariants: {},
  2568 |     tokenArtLibrary: {},
  2569 |     selectedRandomPokemonSessionId: "",
  2570 |     randomPokemonDrawerOpen: false,
  2571 |     routeUiState: createDefaultRouteUiState(),
  2572 |     spriteAliases: {},
  2573 |     pokemonTierOverrides: {},
  2574 |     seriesOrder: [],
  2575 |     seriesChoiceRequired: true,
  2576 |     activityLogFilters: {
  2577 |       search: "",
```


#### Hit 2 — line 3826

```text
  3814 | 
  3815 | function tokenUseRollbackSnapshot() {
  3816 |   return {
  3817 |     previousPlayers: structuredClone(state.players || []),
  3818 |     previousPokemonRecords: structuredClone(state.pokemonRecords || []),
  3819 |     previousPokemonLog: structuredClone(state.pokemonLog || []),
  3820 |     previousLingeringStatuses: structuredClone(state.lingeringStatuses || []),
  3821 |     previousTokenActivations: structuredClone(state.tokenActivations || []),
  3822 |     previousTokenConsumptions: structuredClone(state.tokenConsumptions || []),
  3823 |     previousPlayerNotifications: structuredClone(state.playerNotifications || []),
  3824 |     previousWheelSessions: structuredClone(state.wheelSessions || []),
  3825 |     previousEncounterSessions: structuredClone(state.encounterSessions || []),
  3826 |     previousRandomPokemonSessions: structuredClone(state.randomPokemonSessions || []),
  3827 |     previousSelectedEncounterSessionId: state.selectedEncounterSessionId || "",
  3828 |     previousEncounterModalOpen: Boolean(state.encounterModalOpen),
  3829 |     previousInteractionEvents: structuredClone(state.interactionEvents || []),
  3830 |     previousTransactions: structuredClone(state.transactions || []),
  3831 |     previousGlobalPokemonRules: structuredClone(state.globalPokemonRules || {}),
  3832 |     previousBanlistHistory: structuredClone(state.banlistHistory || []),
  3833 |     previousTeambuilder: structuredClone(state.teambuilder || {}),
  3834 |     previousBattleTeams: structuredClone(state.battleTeams || {}),
  3835 |     previousPerkSystem: structuredClone(state.perkSystem || {}),
  3836 |     previousClassStateByPlayerId: structuredClone(state.classStateByPlayerId || {}),
  3837 |     previousPhaseState: structuredClone(state.phaseState || {}),
  3838 |     previousEffectAuditRecords: structuredClone(state.effectAuditRecords || []),
```


#### Hit 3 — line 4405

```text
  4393 |     playerPokemonIdDeltas,
  4394 |     pokemonRecords: causalIdCollectionDelta(snapshot.previousPokemonRecords, state.pokemonRecords),
  4395 |     statuses: causalIdCollectionDelta(snapshot.previousLingeringStatuses, state.lingeringStatuses),
  4396 |     activations: causalIdCollectionDelta(snapshot.previousTokenActivations, state.tokenActivations),
  4397 |     consumptions: causalIdCollectionDelta(snapshot.previousTokenConsumptions, state.tokenConsumptions),
  4398 |     transactions: causalIdCollectionDelta(snapshot.previousTransactions, state.transactions),
  4399 |     notifications: causalIdCollectionDelta(snapshot.previousPlayerNotifications, state.playerNotifications),
  4400 |     effectOperations: causalIdCollectionDelta(snapshot.previousEffectOperations, state.effectOperations),
  4401 |     copiedActivations: causalIdCollectionDelta(snapshot.previousCopiedActivations, state.copiedActivations),
  4402 |     copiedTokenRelationships: causalIdCollectionDelta(snapshot.previousCopiedTokenRelationships, state.copiedTokenRelationships),
  4403 |     wheelSessions: causalIdCollectionDelta(snapshot.previousWheelSessions, state.wheelSessions),
  4404 |     encounterSessions: causalIdCollectionDelta(snapshot.previousEncounterSessions, state.encounterSessions),
  4405 |     randomPokemonSessions: causalIdCollectionDelta(snapshot.previousRandomPokemonSessions, state.randomPokemonSessions),
  4406 |     delayedEffects: causalIdCollectionDelta(snapshot.previousDelayedEffects, state.delayedEffects),
  4407 |     broughtTeamSnapshots: causalIdCollectionDelta(snapshot.previousBroughtTeamSnapshots, state.broughtTeamSnapshots),
  4408 |     postPayoutProcedures: causalIdCollectionDelta(snapshot.previousPostPayoutProcedures, state.postPayoutProcedures),
  4409 |     encounterCopyRecords: causalIdCollectionDelta(snapshot.previousEncounterCopyRecords, state.encounterCopyRecords),
  4410 |     teambuilderFields: causalTopLevelFieldDelta(snapshot.previousTeambuilder || {}, state.teambuilder || {}, ["moveAccessGrantsByPlayerId"]),
  4411 |     battleTeamFields: causalTopLevelFieldDelta(snapshot.previousBattleTeams || {}, state.battleTeams || {}),
  4412 |     pokemonDeltas,
  4413 |     pokemonLog: causalIdCollectionDelta(snapshot.previousPokemonLog || [], state.pokemonLog || []),
  4414 |     teambuilderMoveGrants: causalGrantMapDeltas(snapshot.previousTeambuilder?.moveAccessGrantsByPlayerId, state.teambuilder?.moveAccessGrantsByPlayerId),
  4415 |     perkMoveGrants: causalGrantMapDeltas(snapshot.previousPerkSystem?.moveAccessGrantsByPlayerId, state.perkSystem?.moveAccessGrantsByPlayerId),
  4416 |     classMoveGrants: causalGrantMapDeltas(
  4417 |       Object.fromEntries(Object.entries(snapshot.previousClassStateByPlayerId || {}).map(([id, value]) => [id, value?.moveAccessGrants || []])),
```


#### Hit 4 — line 4405

```text
  4393 |     playerPokemonIdDeltas,
  4394 |     pokemonRecords: causalIdCollectionDelta(snapshot.previousPokemonRecords, state.pokemonRecords),
  4395 |     statuses: causalIdCollectionDelta(snapshot.previousLingeringStatuses, state.lingeringStatuses),
  4396 |     activations: causalIdCollectionDelta(snapshot.previousTokenActivations, state.tokenActivations),
  4397 |     consumptions: causalIdCollectionDelta(snapshot.previousTokenConsumptions, state.tokenConsumptions),
  4398 |     transactions: causalIdCollectionDelta(snapshot.previousTransactions, state.transactions),
  4399 |     notifications: causalIdCollectionDelta(snapshot.previousPlayerNotifications, state.playerNotifications),
  4400 |     effectOperations: causalIdCollectionDelta(snapshot.previousEffectOperations, state.effectOperations),
  4401 |     copiedActivations: causalIdCollectionDelta(snapshot.previousCopiedActivations, state.copiedActivations),
  4402 |     copiedTokenRelationships: causalIdCollectionDelta(snapshot.previousCopiedTokenRelationships, state.copiedTokenRelationships),
  4403 |     wheelSessions: causalIdCollectionDelta(snapshot.previousWheelSessions, state.wheelSessions),
  4404 |     encounterSessions: causalIdCollectionDelta(snapshot.previousEncounterSessions, state.encounterSessions),
  4405 |     randomPokemonSessions: causalIdCollectionDelta(snapshot.previousRandomPokemonSessions, state.randomPokemonSessions),
  4406 |     delayedEffects: causalIdCollectionDelta(snapshot.previousDelayedEffects, state.delayedEffects),
  4407 |     broughtTeamSnapshots: causalIdCollectionDelta(snapshot.previousBroughtTeamSnapshots, state.broughtTeamSnapshots),
  4408 |     postPayoutProcedures: causalIdCollectionDelta(snapshot.previousPostPayoutProcedures, state.postPayoutProcedures),
  4409 |     encounterCopyRecords: causalIdCollectionDelta(snapshot.previousEncounterCopyRecords, state.encounterCopyRecords),
  4410 |     teambuilderFields: causalTopLevelFieldDelta(snapshot.previousTeambuilder || {}, state.teambuilder || {}, ["moveAccessGrantsByPlayerId"]),
  4411 |     battleTeamFields: causalTopLevelFieldDelta(snapshot.previousBattleTeams || {}, state.battleTeams || {}),
  4412 |     pokemonDeltas,
  4413 |     pokemonLog: causalIdCollectionDelta(snapshot.previousPokemonLog || [], state.pokemonLog || []),
  4414 |     teambuilderMoveGrants: causalGrantMapDeltas(snapshot.previousTeambuilder?.moveAccessGrantsByPlayerId, state.teambuilder?.moveAccessGrantsByPlayerId),
  4415 |     perkMoveGrants: causalGrantMapDeltas(snapshot.previousPerkSystem?.moveAccessGrantsByPlayerId, state.perkSystem?.moveAccessGrantsByPlayerId),
  4416 |     classMoveGrants: causalGrantMapDeltas(
  4417 |       Object.fromEntries(Object.entries(snapshot.previousClassStateByPlayerId || {}).map(([id, value]) => [id, value?.moveAccessGrants || []])),
```


#### Hit 5 — line 4430

```text
  4418 |       Object.fromEntries(Object.entries(state.classStateByPlayerId || {}).map(([id, value]) => [id, value?.moveAccessGrants || []]))
  4419 |     ),
  4420 |     ruleDeltas,
  4421 |     banlistHistory: causalIdCollectionDelta(snapshot.previousBanlistHistory, state.banlistHistory)
  4422 |   };
  4423 | }
  4424 | 
  4425 | function mergeCausalTokenUndoData(base = {}, later = {}) {
  4426 |   const merged = structuredClone(base || {});
  4427 |   const collectionKeys = [
  4428 |     "pokemonRecords", "statuses", "activations", "consumptions", "transactions", "notifications",
  4429 |     "effectOperations", "copiedActivations", "copiedTokenRelationships", "wheelSessions", "encounterSessions",
  4430 |     "randomPokemonSessions", "delayedEffects", "broughtTeamSnapshots", "postPayoutProcedures",
  4431 |     "encounterCopyRecords", "pokemonLog", "banlistHistory"
  4432 |   ];
  4433 |   collectionKeys.forEach((key) => {
  4434 |     merged[key] = mergeCausalIdCollectionDelta(merged[key], later[key]);
  4435 |   });
  4436 |   const mergePlayerDeltas = (key) => {
  4437 |     const byPlayer = new Map((merged[key] || []).map((entry) => [entry.playerId, structuredClone(entry)]));
  4438 |     (later[key] || []).forEach((entry) => {
  4439 |       if (!byPlayer.has(entry.playerId)) byPlayer.set(entry.playerId, structuredClone(entry));
  4440 |       else byPlayer.get(entry.playerId).delta = mergeCausalIdCollectionDelta(byPlayer.get(entry.playerId).delta, entry.delta);
  4441 |     });
  4442 |     merged[key] = [...byPlayer.values()];
```


#### Hit 6 — line 4537

```text
  4525 |   });
  4526 |   state.pokemonRecords = applyCausalIdCollectionUndo(state.pokemonRecords, undoData.pokemonRecords);
  4527 |   state.lingeringStatuses = applyCausalIdCollectionUndo(state.lingeringStatuses, undoData.statuses);
  4528 |   state.tokenActivations = applyCausalIdCollectionUndo(state.tokenActivations, undoData.activations);
  4529 |   state.tokenConsumptions = applyCausalIdCollectionUndo(state.tokenConsumptions, undoData.consumptions);
  4530 |   state.transactions = applyCausalIdCollectionUndo(state.transactions, undoData.transactions);
  4531 |   state.playerNotifications = applyCausalIdCollectionUndo(state.playerNotifications, undoData.notifications);
  4532 |   state.effectOperations = applyCausalIdCollectionUndo(state.effectOperations, undoData.effectOperations);
  4533 |   state.copiedActivations = applyCausalIdCollectionUndo(state.copiedActivations, undoData.copiedActivations);
  4534 |   state.copiedTokenRelationships = applyCausalIdCollectionUndo(state.copiedTokenRelationships, undoData.copiedTokenRelationships);
  4535 |   state.wheelSessions = applyCausalIdCollectionUndo(state.wheelSessions, undoData.wheelSessions);
  4536 |   state.encounterSessions = applyCausalIdCollectionUndo(state.encounterSessions, undoData.encounterSessions);
  4537 |   state.randomPokemonSessions = applyCausalIdCollectionUndo(state.randomPokemonSessions, undoData.randomPokemonSessions);
  4538 |   state.delayedEffects = applyCausalIdCollectionUndo(state.delayedEffects, undoData.delayedEffects);
  4539 |   state.broughtTeamSnapshots = applyCausalIdCollectionUndo(state.broughtTeamSnapshots, undoData.broughtTeamSnapshots);
  4540 |   state.postPayoutProcedures = applyCausalIdCollectionUndo(state.postPayoutProcedures, undoData.postPayoutProcedures);
  4541 |   state.encounterCopyRecords = applyCausalIdCollectionUndo(state.encounterCopyRecords, undoData.encounterCopyRecords);
  4542 |   state.teambuilder ||= {};
  4543 |   applyCausalTopLevelFieldUndo(state.teambuilder, undoData.teambuilderFields);
  4544 |   state.battleTeams ||= {};
  4545 |   applyCausalTopLevelFieldUndo(state.battleTeams, undoData.battleTeamFields);
  4546 |   (undoData.pokemonDeltas || []).forEach((delta) => {
  4547 |     const pokemon = state.pokemonRecords.find((entry) => entry.id === delta.pokemonId);
  4548 |     if (!pokemon) return;
  4549 |     pokemon.effectBuffs = applyCausalIdCollectionUndo(pokemon.effectBuffs, delta.effectBuffs);
```


#### Hit 7 — line 4537

```text
  4525 |   });
  4526 |   state.pokemonRecords = applyCausalIdCollectionUndo(state.pokemonRecords, undoData.pokemonRecords);
  4527 |   state.lingeringStatuses = applyCausalIdCollectionUndo(state.lingeringStatuses, undoData.statuses);
  4528 |   state.tokenActivations = applyCausalIdCollectionUndo(state.tokenActivations, undoData.activations);
  4529 |   state.tokenConsumptions = applyCausalIdCollectionUndo(state.tokenConsumptions, undoData.consumptions);
  4530 |   state.transactions = applyCausalIdCollectionUndo(state.transactions, undoData.transactions);
  4531 |   state.playerNotifications = applyCausalIdCollectionUndo(state.playerNotifications, undoData.notifications);
  4532 |   state.effectOperations = applyCausalIdCollectionUndo(state.effectOperations, undoData.effectOperations);
  4533 |   state.copiedActivations = applyCausalIdCollectionUndo(state.copiedActivations, undoData.copiedActivations);
  4534 |   state.copiedTokenRelationships = applyCausalIdCollectionUndo(state.copiedTokenRelationships, undoData.copiedTokenRelationships);
  4535 |   state.wheelSessions = applyCausalIdCollectionUndo(state.wheelSessions, undoData.wheelSessions);
  4536 |   state.encounterSessions = applyCausalIdCollectionUndo(state.encounterSessions, undoData.encounterSessions);
  4537 |   state.randomPokemonSessions = applyCausalIdCollectionUndo(state.randomPokemonSessions, undoData.randomPokemonSessions);
  4538 |   state.delayedEffects = applyCausalIdCollectionUndo(state.delayedEffects, undoData.delayedEffects);
  4539 |   state.broughtTeamSnapshots = applyCausalIdCollectionUndo(state.broughtTeamSnapshots, undoData.broughtTeamSnapshots);
  4540 |   state.postPayoutProcedures = applyCausalIdCollectionUndo(state.postPayoutProcedures, undoData.postPayoutProcedures);
  4541 |   state.encounterCopyRecords = applyCausalIdCollectionUndo(state.encounterCopyRecords, undoData.encounterCopyRecords);
  4542 |   state.teambuilder ||= {};
  4543 |   applyCausalTopLevelFieldUndo(state.teambuilder, undoData.teambuilderFields);
  4544 |   state.battleTeams ||= {};
  4545 |   applyCausalTopLevelFieldUndo(state.battleTeams, undoData.battleTeamFields);
  4546 |   (undoData.pokemonDeltas || []).forEach((delta) => {
  4547 |     const pokemon = state.pokemonRecords.find((entry) => entry.id === delta.pokemonId);
  4548 |     if (!pokemon) return;
  4549 |     pokemon.effectBuffs = applyCausalIdCollectionUndo(pokemon.effectBuffs, delta.effectBuffs);
```


#### Hit 8 — line 4537

```text
  4525 |   });
  4526 |   state.pokemonRecords = applyCausalIdCollectionUndo(state.pokemonRecords, undoData.pokemonRecords);
  4527 |   state.lingeringStatuses = applyCausalIdCollectionUndo(state.lingeringStatuses, undoData.statuses);
  4528 |   state.tokenActivations = applyCausalIdCollectionUndo(state.tokenActivations, undoData.activations);
  4529 |   state.tokenConsumptions = applyCausalIdCollectionUndo(state.tokenConsumptions, undoData.consumptions);
  4530 |   state.transactions = applyCausalIdCollectionUndo(state.transactions, undoData.transactions);
  4531 |   state.playerNotifications = applyCausalIdCollectionUndo(state.playerNotifications, undoData.notifications);
  4532 |   state.effectOperations = applyCausalIdCollectionUndo(state.effectOperations, undoData.effectOperations);
  4533 |   state.copiedActivations = applyCausalIdCollectionUndo(state.copiedActivations, undoData.copiedActivations);
  4534 |   state.copiedTokenRelationships = applyCausalIdCollectionUndo(state.copiedTokenRelationships, undoData.copiedTokenRelationships);
  4535 |   state.wheelSessions = applyCausalIdCollectionUndo(state.wheelSessions, undoData.wheelSessions);
  4536 |   state.encounterSessions = applyCausalIdCollectionUndo(state.encounterSessions, undoData.encounterSessions);
  4537 |   state.randomPokemonSessions = applyCausalIdCollectionUndo(state.randomPokemonSessions, undoData.randomPokemonSessions);
  4538 |   state.delayedEffects = applyCausalIdCollectionUndo(state.delayedEffects, undoData.delayedEffects);
  4539 |   state.broughtTeamSnapshots = applyCausalIdCollectionUndo(state.broughtTeamSnapshots, undoData.broughtTeamSnapshots);
  4540 |   state.postPayoutProcedures = applyCausalIdCollectionUndo(state.postPayoutProcedures, undoData.postPayoutProcedures);
  4541 |   state.encounterCopyRecords = applyCausalIdCollectionUndo(state.encounterCopyRecords, undoData.encounterCopyRecords);
  4542 |   state.teambuilder ||= {};
  4543 |   applyCausalTopLevelFieldUndo(state.teambuilder, undoData.teambuilderFields);
  4544 |   state.battleTeams ||= {};
  4545 |   applyCausalTopLevelFieldUndo(state.battleTeams, undoData.battleTeamFields);
  4546 |   (undoData.pokemonDeltas || []).forEach((delta) => {
  4547 |     const pokemon = state.pokemonRecords.find((entry) => entry.id === delta.pokemonId);
  4548 |     if (!pokemon) return;
  4549 |     pokemon.effectBuffs = applyCausalIdCollectionUndo(pokemon.effectBuffs, delta.effectBuffs);
```


#### Hit 9 — line 4582

```text
  4570 |   (undoData.ruleDeltas || []).forEach((delta) => {
  4571 |     if (delta.existed) state.globalPokemonRules[delta.key] = structuredClone(delta.previous);
  4572 |     else delete state.globalPokemonRules[delta.key];
  4573 |   });
  4574 |   state.banlistHistory = applyCausalIdCollectionUndo(state.banlistHistory, undoData.banlistHistory);
  4575 |   if (undoData.tokenDefinitionId === "honey-token" && undoData.procedureId) {
  4576 |     const procedure = (state.endOfActionProcedures || []).find((entry) => entry.id === undoData.procedureId);
  4577 |     if (procedure) {
  4578 |       procedure.status = "undone";
  4579 |       procedure.undoneAt = new Date().toISOString();
  4580 |     }
  4581 |   }
  4582 |   if (state.selectedRandomPokemonSessionId && !(state.randomPokemonSessions || []).some((entry) => entry.id === state.selectedRandomPokemonSessionId)) {
  4583 |     state.selectedRandomPokemonSessionId = "";
  4584 |     state.randomPokemonDrawerOpen = false;
  4585 |   }
  4586 |   syncLinkedTransactions();
  4587 |   syncPlayerPokemonLists();
  4588 | }
  4589 | 
  4590 | function recordTokenContractResolution(activity, metadata, {
  4591 |   result = "resolved",
  4592 |   details = [],
  4593 |   mutations = [],
  4594 |   persistentStateIds = [],
```


#### Hit 10 — line 22324

```text
 22312 |     session.rolls ||= [];
 22313 |     session.removedEntryIds ||= [];
 22314 |     session.temporaryEntries ||= [];
 22315 |     session.weightOverrides ||= {};
 22316 |     session.weightEditing = Boolean(session.weightEditing);
 22317 |     session.resultSessionIds ||= [];
 22318 |     session.visualRotation = Number(session.visualRotation || 0);
 22319 |     session.isSpinning = false;
 22320 |     session.pendingEntryId = "";
 22321 |   });
 22322 |   nextState.selectedEncounterSessionId ||= "";
 22323 |   nextState.encounterModalOpen = Boolean(nextState.encounterModalOpen);
 22324 |   nextState.randomPokemonSessions ||= [];
 22325 |   nextState.pokemonFamilyTierCache ||= {};
 22326 |   pokemonFamilyTierCache = nextState.pokemonFamilyTierCache;
 22327 |   nextState.pokemonSpriteVariants ||= {};
 22328 |   nextState.selectedRandomPokemonSessionId ||= "";
 22329 |   nextState.randomPokemonDrawerOpen = Boolean(nextState.randomPokemonDrawerOpen);
 22330 |   nextState.spriteAliases ||= {};
 22331 |   nextState.breederDeposits ||= [];
 22332 |   nextState.dragonsDenSessions.forEach((session) => {
 22333 |     session.status = ["active", "completed", "undone"].includes(session.status) ? session.status : "active";
 22334 |     session.cost = Number(session.cost || 0);
 22335 |     session.battlePhaseStayLength = Number(session.battlePhaseStayLength || 0);
 22336 |   });
```


#### Hit 11 — line 22337

```text
 22325 |   nextState.pokemonFamilyTierCache ||= {};
 22326 |   pokemonFamilyTierCache = nextState.pokemonFamilyTierCache;
 22327 |   nextState.pokemonSpriteVariants ||= {};
 22328 |   nextState.selectedRandomPokemonSessionId ||= "";
 22329 |   nextState.randomPokemonDrawerOpen = Boolean(nextState.randomPokemonDrawerOpen);
 22330 |   nextState.spriteAliases ||= {};
 22331 |   nextState.breederDeposits ||= [];
 22332 |   nextState.dragonsDenSessions.forEach((session) => {
 22333 |     session.status = ["active", "completed", "undone"].includes(session.status) ? session.status : "active";
 22334 |     session.cost = Number(session.cost || 0);
 22335 |     session.battlePhaseStayLength = Number(session.battlePhaseStayLength || 0);
 22336 |   });
 22337 |   nextState.randomPokemonSessions.forEach((session) => {
 22338 |     session.status = ["pending", "confirmed", "rerolled", "undone", "cancelled"].includes(session.status) ? session.status : "pending";
 22339 |     session.rerollCount = Number(session.rerollCount || 0);
 22340 |     session.ownerPlayerId ||= session.playerId;
 22341 |     session.resultOwnerPlayerId ||= session.ownerPlayerId || session.playerId;
 22342 |     session.playerId ||= session.ownerPlayerId || session.resultOwnerPlayerId || "";
 22343 |     session.rerollable = session.rerollable !== false;
 22344 |     session.interactionLocked = Boolean(session.interactionLocked);
 22345 |     session.rerollHistory ||= [];
 22346 |   });
 22347 |   nextState.wheelSessions.forEach((session) => {
 22348 |     if (session.wheelId === "trainer-class-wheel") session.wheelId = "trainerClassWheel";
 22349 |     session.status = ["pending", "review", "completed", "cancelled", "undone"].includes(session.status) ? session.status : "pending";
```


#### Hit 12 — line 25770

```text
 25758 |   return Boolean(getCurrentPendingEvent(targetState));
 25759 | }
 25760 | 
 25761 | function canShowLiveTransactionControls(targetState = state) {
 25762 |   return Boolean(getCurrentPendingEvent(targetState));
 25763 | }
 25764 | 
 25765 | function liveResultSessionForActivity(activity, targetState = state) {
 25766 |   if (!activity) return null;
 25767 |   const sessionId = activity.payload?.randomPokemonSessionId
 25768 |     || (/pokemon-result|encounter-result/.test(activity.type || "") ? activity.sourceId : "");
 25769 |   if (!sessionId) return null;
 25770 |   return (targetState.randomPokemonSessions || []).find((session) => session.id === sessionId && session.status === "pending") || null;
 25771 | }
 25772 | 
 25773 | function liveActivityTimingCategory(activity) {
 25774 |   if (!activity) return "";
 25775 |   if (activity.payload?.tokenTimingCategory) return tokenTimingCategoryFromRaw(activity.payload.tokenTimingCategory);
 25776 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.CONTROL_TOKEN) return TOKEN_TIMING_CATEGORIES.CONTROL;
 25777 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.CURSE_TOKEN) return TOKEN_TIMING_CATEGORIES.CURSE;
 25778 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT || activity.type === "encounter-result") return TOKEN_TIMING_CATEGORIES.ENCOUNTER;
 25779 |   return "";
 25780 | }
 25781 | 
 25782 | function liveTokenPromptDetails(activity, resultSession = null, targetState = state) {
```


#### Hit 13 — line 26987

```text
 26975 |     playerIds: [passer.id, activity.actorPlayerId, activity.targetPlayerId].filter(Boolean),
 26976 |     linkedEventId: activity.id,
 26977 |     responseId: savedResponse?.id || "",
 26978 |     eventOrder: savedResponse?.eventOrder
 26979 |   });
 26980 |   advanceAutomaticInteractionPrompts(activity);
 26981 |   resetLiveRefereeScreenState();
 26982 |   saveState({ immediate: true });
 26983 |   render();
 26984 | }
 26985 | 
 26986 | async function handleLiveTableAcceptResult(sessionId, activityId = "") {
 26987 |   const session = (state.randomPokemonSessions || []).find((entry) => entry.id === sessionId && entry.status === "pending");
 26988 |   if (!session) {
 26989 |     alert("No pending Pokemon result is available to accept.");
 26990 |     return;
 26991 |   }
 26992 |   const activity = activityId ? liveActivityById(activityId) : liveActivityById(session.interactionEventId);
 26993 |   if (activity && !liveCanFinalizeActivity(activity)) return;
 26994 |   resetLiveRefereeScreenState();
 26995 |   await confirmRandomPokemonSession(session.id, { skipPendingGuard: true });
 26996 | }
 26997 | 
 26998 | async function handleLiveTableRerollResult(sessionId) {
 26999 |   const session = (state.randomPokemonSessions || []).find((entry) => entry.id === sessionId && entry.status === "pending");
```


#### Hit 14 — line 26999

```text
 26987 |   const session = (state.randomPokemonSessions || []).find((entry) => entry.id === sessionId && entry.status === "pending");
 26988 |   if (!session) {
 26989 |     alert("No pending Pokemon result is available to accept.");
 26990 |     return;
 26991 |   }
 26992 |   const activity = activityId ? liveActivityById(activityId) : liveActivityById(session.interactionEventId);
 26993 |   if (activity && !liveCanFinalizeActivity(activity)) return;
 26994 |   resetLiveRefereeScreenState();
 26995 |   await confirmRandomPokemonSession(session.id, { skipPendingGuard: true });
 26996 | }
 26997 | 
 26998 | async function handleLiveTableRerollResult(sessionId) {
 26999 |   const session = (state.randomPokemonSessions || []).find((entry) => entry.id === sessionId && entry.status === "pending");
 27000 |   if (!session) {
 27001 |     alert("No pending Pokemon result is available to reroll.");
 27002 |     return;
 27003 |   }
 27004 |   await rerollRandomPokemonSession(session.id, { actorPlayerId: activePlayer().id });
 27005 |   saveState({ immediate: true });
 27006 |   render();
 27007 | }
 27008 | 
 27009 | async function handleLiveTableResolve(activityId, { resolutionText = "" } = {}) {
 27010 |   const activity = liveActivityById(activityId);
 27011 |   if (!activity) {
```


#### Hit 15 — line 41957

```text
 41945 |     action: "token", category: "pokemon", player: actor.name,
 41946 |     item: summary, title: "Reroll replaced an encounter result", summary,
 41947 |     type: "encounter-reroll-token", categories: ["tokens", "pokemon", "encounter"],
 41948 |     tags: ["reroll-token", "encounter-result", resultKind || "result"],
 41949 |     playerIds: [actor.id, targetPlayerId].filter(Boolean), pokemonNames: [previousName, nextName].filter(Boolean),
 41950 |     tokenNames: [metadata.name || "Reroll"], linkedEventId: sourceEffectId,
 41951 |     targetResultId, previousResultName: previousName, replacementResultName: nextName,
 41952 |     undoable: true, undone: false, undoData: causalUndo
 41953 |   });
 41954 | }
 41955 | 
 41956 | function pendingRandomPokemonSessions() {
 41957 |   state.randomPokemonSessions ||= [];
 41958 |   return state.randomPokemonSessions.filter((session) => session.status === "pending");
 41959 | }
 41960 | 
 41961 | function pendingRerollTargets() {
 41962 |   const targets = [];
 41963 |   (state.randomPokemonSessions || [])
 41964 |     .filter((session) => session.status === "pending" && session.rerollable !== false && !session.interactionLocked)
 41965 |     .forEach((session) => {
 41966 |       const ownerId = session.resultOwnerPlayerId || session.ownerPlayerId || session.playerId;
 41967 |       const owner = state.players.find((player) => player.id === ownerId);
 41968 |       targets.push({
 41969 |         id: `random-pokemon:${session.id}`,
```


#### Hit 16 — line 41958

```text
 41946 |     item: summary, title: "Reroll replaced an encounter result", summary,
 41947 |     type: "encounter-reroll-token", categories: ["tokens", "pokemon", "encounter"],
 41948 |     tags: ["reroll-token", "encounter-result", resultKind || "result"],
 41949 |     playerIds: [actor.id, targetPlayerId].filter(Boolean), pokemonNames: [previousName, nextName].filter(Boolean),
 41950 |     tokenNames: [metadata.name || "Reroll"], linkedEventId: sourceEffectId,
 41951 |     targetResultId, previousResultName: previousName, replacementResultName: nextName,
 41952 |     undoable: true, undone: false, undoData: causalUndo
 41953 |   });
 41954 | }
 41955 | 
 41956 | function pendingRandomPokemonSessions() {
 41957 |   state.randomPokemonSessions ||= [];
 41958 |   return state.randomPokemonSessions.filter((session) => session.status === "pending");
 41959 | }
 41960 | 
 41961 | function pendingRerollTargets() {
 41962 |   const targets = [];
 41963 |   (state.randomPokemonSessions || [])
 41964 |     .filter((session) => session.status === "pending" && session.rerollable !== false && !session.interactionLocked)
 41965 |     .forEach((session) => {
 41966 |       const ownerId = session.resultOwnerPlayerId || session.ownerPlayerId || session.playerId;
 41967 |       const owner = state.players.find((player) => player.id === ownerId);
 41968 |       targets.push({
 41969 |         id: `random-pokemon:${session.id}`,
 41970 |         kind: "random-pokemon",
```


#### Hit 17 — line 41963

```text
 41951 |     targetResultId, previousResultName: previousName, replacementResultName: nextName,
 41952 |     undoable: true, undone: false, undoData: causalUndo
 41953 |   });
 41954 | }
 41955 | 
 41956 | function pendingRandomPokemonSessions() {
 41957 |   state.randomPokemonSessions ||= [];
 41958 |   return state.randomPokemonSessions.filter((session) => session.status === "pending");
 41959 | }
 41960 | 
 41961 | function pendingRerollTargets() {
 41962 |   const targets = [];
 41963 |   (state.randomPokemonSessions || [])
 41964 |     .filter((session) => session.status === "pending" && session.rerollable !== false && !session.interactionLocked)
 41965 |     .forEach((session) => {
 41966 |       const ownerId = session.resultOwnerPlayerId || session.ownerPlayerId || session.playerId;
 41967 |       const owner = state.players.find((player) => player.id === ownerId);
 41968 |       targets.push({
 41969 |         id: `random-pokemon:${session.id}`,
 41970 |         kind: "random-pokemon",
 41971 |         targetResultId: session.id,
 41972 |         ownerPlayerId: ownerId,
 41973 |         ownerName: owner?.name || "Unknown",
 41974 |         sourceLabel: session.sourceLabel || "Pokemon Result",
 41975 |         resultName: session.resultDisplayName || "Pending result",
```


#### Hit 18 — line 42103

```text
 42091 |     status: "pending",
 42092 |     resultPokemonName: result.key,
 42093 |     resultDisplayName: result.displayName,
 42094 |     resultSprite: "",
 42095 |     chosenSpriteKey: "",
 42096 |     resultMetadata: structuredClone(result),
 42097 |     rerollable: true,
 42098 |     interactionLocked: false,
 42099 |     rerollCount: 0,
 42100 |     createdAt: new Date().toISOString(),
 42101 |     confirmedAt: null
 42102 |   };
 42103 |   state.randomPokemonSessions ||= [];
 42104 |   state.randomPokemonSessions.unshift(session);
 42105 |   state.selectedRandomPokemonSessionId = session.id;
 42106 |   state.randomPokemonDrawerOpen = true;
 42107 |   createPokemonResultTimingWindow(session, player);
 42108 |   saveState();
 42109 |   render();
 42110 |   const sprite = await fetchStablePokemonSprite(result.displayName, session.chosenSpriteKey);
 42111 |   const latest = (state.randomPokemonSessions || []).find((entry) => entry.id === session.id);
 42112 |   if (latest && latest.status === "pending") {
 42113 |     latest.chosenSpriteKey = sprite.spriteKey || "";
 42114 |     latest.resultSprite = sprite.spriteUrl || "";
 42115 |     saveState();
```


#### Hit 19 — line 42104

```text
 42092 |     resultPokemonName: result.key,
 42093 |     resultDisplayName: result.displayName,
 42094 |     resultSprite: "",
 42095 |     chosenSpriteKey: "",
 42096 |     resultMetadata: structuredClone(result),
 42097 |     rerollable: true,
 42098 |     interactionLocked: false,
 42099 |     rerollCount: 0,
 42100 |     createdAt: new Date().toISOString(),
 42101 |     confirmedAt: null
 42102 |   };
 42103 |   state.randomPokemonSessions ||= [];
 42104 |   state.randomPokemonSessions.unshift(session);
 42105 |   state.selectedRandomPokemonSessionId = session.id;
 42106 |   state.randomPokemonDrawerOpen = true;
 42107 |   createPokemonResultTimingWindow(session, player);
 42108 |   saveState();
 42109 |   render();
 42110 |   const sprite = await fetchStablePokemonSprite(result.displayName, session.chosenSpriteKey);
 42111 |   const latest = (state.randomPokemonSessions || []).find((entry) => entry.id === session.id);
 42112 |   if (latest && latest.status === "pending") {
 42113 |     latest.chosenSpriteKey = sprite.spriteKey || "";
 42114 |     latest.resultSprite = sprite.spriteUrl || "";
 42115 |     saveState();
 42116 |     renderRandomPokemonPanel();
```


#### Hit 20 — line 42111

```text
 42099 |     rerollCount: 0,
 42100 |     createdAt: new Date().toISOString(),
 42101 |     confirmedAt: null
 42102 |   };
 42103 |   state.randomPokemonSessions ||= [];
 42104 |   state.randomPokemonSessions.unshift(session);
 42105 |   state.selectedRandomPokemonSessionId = session.id;
 42106 |   state.randomPokemonDrawerOpen = true;
 42107 |   createPokemonResultTimingWindow(session, player);
 42108 |   saveState();
 42109 |   render();
 42110 |   const sprite = await fetchStablePokemonSprite(result.displayName, session.chosenSpriteKey);
 42111 |   const latest = (state.randomPokemonSessions || []).find((entry) => entry.id === session.id);
 42112 |   if (latest && latest.status === "pending") {
 42113 |     latest.chosenSpriteKey = sprite.spriteKey || "";
 42114 |     latest.resultSprite = sprite.spriteUrl || "";
 42115 |     saveState();
 42116 |     renderRandomPokemonPanel();
 42117 |   }
 42118 |   return session;
 42119 | }
 42120 | 
 42121 | async function createEncounterPokemonResultSession({ player, encounterSession, roll, result }) {
 42122 |   const session = {
 42123 |     id: `random-pokemon-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
```


#### Hit 21 — line 42151

```text
 42139 |     status: "pending",
 42140 |     resultPokemonName: result.pokemonName || result.displayName,
 42141 |     resultDisplayName: result.displayName || result.pokemonName,
 42142 |     resultSprite: "",
 42143 |     chosenSpriteKey: "",
 42144 |     resultMetadata: structuredClone(result),
 42145 |     rerollable: true,
 42146 |     interactionLocked: false,
 42147 |     rerollCount: 0,
 42148 |     createdAt: new Date().toISOString(),
 42149 |     confirmedAt: null
 42150 |   };
 42151 |   state.randomPokemonSessions ||= [];
 42152 |   state.randomPokemonSessions.unshift(session);
 42153 |   encounterSession.resultSessionIds ||= [];
 42154 |   encounterSession.resultSessionIds.push(session.id);
 42155 |   roll.randomPokemonSessionId = session.id;
 42156 |   state.selectedRandomPokemonSessionId = session.id;
 42157 |   state.randomPokemonDrawerOpen = true;
 42158 |   createPokemonResultTimingWindow(session, player);
 42159 |   saveState();
 42160 |   render();
 42161 |   const sprite = await fetchStablePokemonSprite(session.resultDisplayName, session.chosenSpriteKey);
 42162 |   const latest = (state.randomPokemonSessions || []).find((entry) => entry.id === session.id);
 42163 |   if (latest && latest.status === "pending") {
```


#### Hit 22 — line 42152

```text
 42140 |     resultPokemonName: result.pokemonName || result.displayName,
 42141 |     resultDisplayName: result.displayName || result.pokemonName,
 42142 |     resultSprite: "",
 42143 |     chosenSpriteKey: "",
 42144 |     resultMetadata: structuredClone(result),
 42145 |     rerollable: true,
 42146 |     interactionLocked: false,
 42147 |     rerollCount: 0,
 42148 |     createdAt: new Date().toISOString(),
 42149 |     confirmedAt: null
 42150 |   };
 42151 |   state.randomPokemonSessions ||= [];
 42152 |   state.randomPokemonSessions.unshift(session);
 42153 |   encounterSession.resultSessionIds ||= [];
 42154 |   encounterSession.resultSessionIds.push(session.id);
 42155 |   roll.randomPokemonSessionId = session.id;
 42156 |   state.selectedRandomPokemonSessionId = session.id;
 42157 |   state.randomPokemonDrawerOpen = true;
 42158 |   createPokemonResultTimingWindow(session, player);
 42159 |   saveState();
 42160 |   render();
 42161 |   const sprite = await fetchStablePokemonSprite(session.resultDisplayName, session.chosenSpriteKey);
 42162 |   const latest = (state.randomPokemonSessions || []).find((entry) => entry.id === session.id);
 42163 |   if (latest && latest.status === "pending") {
 42164 |     latest.chosenSpriteKey = sprite.spriteKey || "";
```


#### Hit 23 — line 42162

```text
 42150 |   };
 42151 |   state.randomPokemonSessions ||= [];
 42152 |   state.randomPokemonSessions.unshift(session);
 42153 |   encounterSession.resultSessionIds ||= [];
 42154 |   encounterSession.resultSessionIds.push(session.id);
 42155 |   roll.randomPokemonSessionId = session.id;
 42156 |   state.selectedRandomPokemonSessionId = session.id;
 42157 |   state.randomPokemonDrawerOpen = true;
 42158 |   createPokemonResultTimingWindow(session, player);
 42159 |   saveState();
 42160 |   render();
 42161 |   const sprite = await fetchStablePokemonSprite(session.resultDisplayName, session.chosenSpriteKey);
 42162 |   const latest = (state.randomPokemonSessions || []).find((entry) => entry.id === session.id);
 42163 |   if (latest && latest.status === "pending") {
 42164 |     latest.chosenSpriteKey = sprite.spriteKey || "";
 42165 |     latest.resultSprite = sprite.spriteUrl || "";
 42166 |     saveState();
 42167 |     renderRandomPokemonPanel();
 42168 |   }
 42169 |   return session;
 42170 | }
 42171 | 
 42172 | function augmentHoneyCausalUndoAfterAcquisition(randomSession, causalBeforeAcquisition) {
 42173 |   if (!randomSession?.copiedFromRandomPokemonSessionId || !causalBeforeAcquisition) return;
 42174 |   const historyLog = (state.log || []).find((entry) => !entry.undone
```


#### Hit 24 — line 42428

```text
 42416 |     sourceType: "game-corner-token",
 42417 |     sourceLabel: "Game Corner Ticket",
 42418 |     player,
 42419 |     tier,
 42420 |     actionVisitId: session.actionVisitId,
 42421 |     gameCornerSessionId: session.id,
 42422 |     token
 42423 |   });
 42424 | }
 42425 | 
 42426 | async function confirmRandomPokemonSession(sessionId = state.selectedRandomPokemonSessionId, { skipPendingGuard = false } = {}) {
 42427 |   if (!skipPendingGuard && !guardPendingEventBeforeAction("Confirm Pokemon Result", () => confirmRandomPokemonSession(sessionId, { skipPendingGuard: true }))) return;
 42428 |   const randomSession = (state.randomPokemonSessions || []).find((entry) => entry.id === sessionId);
 42429 |   if (!randomSession || randomSession.status !== "pending") return;
 42430 |   const honeyAcquisitionSnapshot = randomSession.copiedFromRandomPokemonSessionId ? tokenUseRollbackSnapshot() : null;
 42431 |   const player = state.players.find((entry) => entry.id === (randomSession.resultOwnerPlayerId || randomSession.ownerPlayerId || randomSession.playerId));
 42432 |   if (!player) return;
 42433 |   if (!requirePrivatePrepAccess(player, "random Pokemon result")) return;
 42434 |   const tokenIndex = randomSession.tokenId ? (player.inventory || []).findIndex((item) => item.id === randomSession.tokenId) : -1;
 42435 |   if (randomSession.sourceType === "game-corner-token" && tokenIndex < 0) {
 42436 |     alert("That Game Corner Ticket is no longer available.");
 42437 |     return;
 42438 |   }
 42439 |   if (!confirm(`Add ${randomSession.resultDisplayName} to ${player.name}'s Active roster?`)) return;
 42440 |   const token = tokenIndex >= 0 ? player.inventory[tokenIndex] : null;
```


#### Hit 25 — line 42559

```text
 42547 |       actionVisitId: unlock.actionVisitId,
 42548 |       timestamp: unlock.createdAt
 42549 |     });
 42550 |   });
 42551 |   const next = pendingRandomPokemonSessions().find((entry) => entry.id !== randomSession.id);
 42552 |   state.selectedRandomPokemonSessionId = next?.id || "";
 42553 |   state.randomPokemonDrawerOpen = Boolean(next);
 42554 |   saveState();
 42555 |   render();
 42556 | }
 42557 | 
 42558 | async function rerollRandomPokemonSession(sessionId = state.selectedRandomPokemonSessionId, options = {}) {
 42559 |   const randomSession = (state.randomPokemonSessions || []).find((entry) => entry.id === sessionId);
 42560 |   if (!randomSession || randomSession.status !== "pending" || randomSession.rerollable === false || randomSession.interactionLocked) return;
 42561 |   const ownerPlayerId = randomSession.resultOwnerPlayerId || randomSession.ownerPlayerId || randomSession.playerId;
 42562 |   const player = state.players.find((entry) => entry.id === ownerPlayerId);
 42563 |   const actor = state.players.find((entry) => entry.id === (options.actorPlayerId || ownerPlayerId));
 42564 |   if (!player || !actor) return;
 42565 |   if (!requirePrivatePrepAccess(actor, "reroll token")) return;
 42566 |   const tokenIndex = playerRerollTokenIndex(actor);
 42567 |   if (tokenIndex < 0) {
 42568 |     alert(`${actor.name} needs a Reroll Token.`);
 42569 |     return;
 42570 |   }
 42571 |   const exactToken = actor.inventory[tokenIndex];
```


#### Hit 26 — line 42700

```text
 42688 |         targetResultId: randomSession.id,
 42689 |         previousPokemon: previousResult.resultDisplayName,
 42690 |         newPokemon: nextName,
 42691 |         randomPokemonSessionId: randomSession.id,
 42692 |         encounterSessionId: encounterSession.id,
 42693 |         timestamp: new Date().toISOString()
 42694 |       });
 42695 |     });
 42696 |   }
 42697 |   saveState();
 42698 |   renderRandomPokemonPanel();
 42699 |   const sprite = await fetchStablePokemonSprite(nextName, randomSession.chosenSpriteKey);
 42700 |   const latest = (state.randomPokemonSessions || []).find((entry) => entry.id === randomSession.id);
 42701 |   if (latest && latest.status === "pending") {
 42702 |     latest.chosenSpriteKey = sprite.spriteKey || "";
 42703 |     latest.resultSprite = sprite.spriteUrl || "";
 42704 |     state.selectedRandomPokemonSessionId = latest.id;
 42705 |     state.randomPokemonDrawerOpen = true;
 42706 |     saveState();
 42707 |     renderRandomPokemonPanel();
 42708 |   }
 42709 |   const operation = {
 42710 |     id: `effect-operation-${rerollRecord.id}`,
 42711 |     operationType: "rerollEncounterResult", sourceEffectId, sourceTokenId: rerollToken.id,
 42712 |     targetResultId: randomSession.id, resultKind: encounterSession ? "encounter-result" : "wheel-result",
```


#### Hit 27 — line 42726

```text
 42714 |     status: "completed", createdAt: new Date().toISOString()
 42715 |   };
 42716 |   state.effectOperations ||= [];
 42717 |   state.effectOperations.push(operation);
 42718 |   recordRerollTokenHistory({ snapshot: causalBeforeReroll, actor, token: rerollToken, sourceEffectId,
 42719 |     targetResultId: randomSession.id, targetPlayerId: player.id, previousName: previousResult.resultDisplayName,
 42720 |     nextName, resultKind: operation.resultKind });
 42721 |   saveState();
 42722 |   return operation;
 42723 | }
 42724 | 
 42725 | function cancelRandomPokemonSession(sessionId = state.selectedRandomPokemonSessionId) {
 42726 |   const randomSession = (state.randomPokemonSessions || []).find((entry) => entry.id === sessionId);
 42727 |   if (!randomSession || randomSession.status !== "pending") return;
 42728 |   randomSession.status = "cancelled";
 42729 |   randomSession.cancelledAt = new Date().toISOString();
 42730 |   resolvePokemonResultTimingWindow(randomSession, "canceled");
 42731 |   const next = pendingRandomPokemonSessions().find((entry) => entry.id !== randomSession.id);
 42732 |   state.selectedRandomPokemonSessionId = next?.id || "";
 42733 |   state.randomPokemonDrawerOpen = Boolean(next);
 42734 |   saveState();
 42735 |   render();
 42736 | }
 42737 | 
 42738 | function updateEncounterActionLog(session, player, updater = null) {
```


#### Hit 28 — line 42749

```text
 42737 | 
 42738 | function updateEncounterActionLog(session, player, updater = null) {
 42739 |   const entry = (state.log || []).find((logEntry) => logEntry.type === "encounter-action"
 42740 |     && (logEntry.encounterSessionId === session.id || logEntry.actionVisitId === session.actionVisitId));
 42741 |   if (!entry) return null;
 42742 |   entry.details ||= [];
 42743 |   entry.childEvents ||= [];
 42744 |   entry.categories ||= [];
 42745 |   entry.tags ||= [];
 42746 |   if (updater) updater(entry);
 42747 |   const rolls = session.rolls || [];
 42748 |   const caughtNames = rolls.map((roll) => {
 42749 |     const result = (state.randomPokemonSessions || []).find((randomSession) => randomSession.id === roll.randomPokemonSessionId);
 42750 |     return result?.status === "confirmed" ? result.resultDisplayName : "";
 42751 |   }).filter(Boolean);
 42752 |   const lines = [
 42753 |     "Spent 1 Action at Encounter",
 42754 |     `Rolled ${rolls.length}/${session.maxRolls || 2} Encounters`,
 42755 |     caughtNames.length ? `Caught ${caughtNames.join(", ")}` : "",
 42756 |     session.includeFishing ? "Fishing included" : "",
 42757 |     session.includeSurf ? "Surf included" : "",
 42758 |     (session.removedEntryIds || []).length ? `Removed ${(session.removedEntryIds || []).length} option${session.removedEntryIds.length === 1 ? "" : "s"}` : ""
 42759 |   ].filter(Boolean);
 42760 |   entry.summary = lines.join("\n");
 42761 |   entry.details = [
```


#### Hit 29 — line 42798

```text
 42786 |     alert("No Encounter Wheel is defined for this Series/Gym yet.");
 42787 |     return false;
 42788 |   }
 42789 |   if (!skipConfirmCheck) {
 42790 |     const check = actionLocationCanConfirm(location, player.id, 1);
 42791 |     if (!check.ok) {
 42792 |       alert(check.reason);
 42793 |       return false;
 42794 |     }
 42795 |   }
 42796 |   const previousVisits = structuredClone(actionVisitsForPlayer(player.id));
 42797 |   const previousEncounterSessions = structuredClone(state.encounterSessions || []);
 42798 |   const previousRandomPokemonSessions = structuredClone(state.randomPokemonSessions || []);
 42799 |   const previousPokemonRecords = structuredClone(state.pokemonRecords || []);
 42800 |   const previousInventory = structuredClone(player.inventory || []);
 42801 |   const previousInteractionEventIds = (state.interactionEvents || []).map((activity) => activity.id).filter(Boolean);
 42802 |   const previousTransactionIds = (state.transactions || []).map((transaction) => transaction.id).filter(Boolean);
 42803 |   const visit = {
 42804 |     id: `action-visit-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
 42805 |     playerId: player.id,
 42806 |     locationId: "encounter",
 42807 |     locationName: "Encounter",
 42808 |     serviceId: "encounter-wheel",
 42809 |     serviceLabel: "Open Encounter Wheel",
 42810 |     actionCost: 1,
```


#### Hit 30 — line 48543

```text
 48531 |     committedAt: new Date().toISOString()
 48532 |   };
 48533 |   [
 48534 |     "log",
 48535 |     "effectAuditRecords",
 48536 |     "effectOperations",
 48537 |     "interactionEvents",
 48538 |     "transactions",
 48539 |     "tokenConsumptions",
 48540 |     "tokenActivations",
 48541 |     "playerNotifications",
 48542 |     "lingeringStatuses",
 48543 |     "randomPokemonSessions",
 48544 |     "encounterSessions",
 48545 |     "wheelSessions"
 48546 |   ].forEach((key) => markSandboxCollectionChanges(candidate, baseline, key, origin));
 48547 |   candidate.chronologyCounter = Number(candidate.chronologyCounter || 0) + 1;
 48548 |   candidate.log ||= [];
 48549 |   candidate.log.unshift({
 48550 |     id: `sandbox-commit-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
 48551 |     action: "admin",
 48552 |     category: "admin",
 48553 |     player: "Admin Tools",
 48554 |     item: `Committed Token Sandbox: ${info.scenarioName}`,
 48555 |     title: "Sandbox scenario committed",
```


#### Hit 31 — line 50561

```text
 50549 | 
 50550 | function phaseAdvanceBlockedByActionOperation(target = nextPhaseTarget()) {
 50551 |   if (!target || target.phase === "chooseStartSeries") return "";
 50552 |   const operation = currentActionOperation();
 50553 |   if (!operation) return "";
 50554 |   const owner = state.players.find((player) => player.id === operation.playerId);
 50555 |   const trainer = owner?.name || "The active trainer";
 50556 |   const location = operation.locationName || actionLocationById(operation.locationId)?.name || "their current Action";
 50557 |   return `${trainer} is still resolving ${location}. Finish or undo that Action before advancing phases.`;
 50558 | }
 50559 | 
 50560 | function honeyEligibleEncounterResults() {
 50561 |   return (state.randomPokemonSessions || []).filter((session) => {
 50562 |     if (session.sourceType !== "encounter" || session.status !== "confirmed") return false;
 50563 |     if (session.copiedFromRandomPokemonSessionId || session.sourceLabel === "Honey copied Encounter") return false;
 50564 |     const parent = (state.encounterSessions || []).find((entry) => entry.id === session.encounterSessionId);
 50565 |     return String(session.series || parent?.series || state.series) === String(state.series)
 50566 |       && Number(session.gym || parent?.gym || state.gym) === Number(state.gym);
 50567 |   });
 50568 | }
 50569 | 
 50570 | function ensureHoneyEndOfActionProcedures() {
 50571 |   state.endOfActionProcedures ||= [];
 50572 |   const eligible = honeyEligibleEncounterResults();
 50573 |   if (!eligible.length) return [];
```


#### Hit 32 — line 50614

```text
 50602 |   });
 50603 |   return created;
 50604 | }
 50605 | 
 50606 | function honeyProcedureForActivity(activity) {
 50607 |   return activity?.sourceType === "honey-end-action"
 50608 |     ? (state.endOfActionProcedures || []).find((entry) => entry.id === activity.payload?.procedureId)
 50609 |     : null;
 50610 | }
 50611 | 
 50612 | function liveRefereeHoneyProcedureScreenMarkup(prompt, activity) {
 50613 |   const procedure = honeyProcedureForActivity(activity);
 50614 |   const choices = (procedure?.eligibleRandomPokemonSessionIds || []).map((id) => (state.randomPokemonSessions || []).find((entry) => entry.id === id)).filter((entry) => entry?.status === "confirmed");
 50615 |   return liveRefereeGameScreenMarkup({
 50616 |     className: "live-referee-honey-screen",
 50617 |     situation: "Which completed encounter will Honey copy?",
 50618 |     body: liveRefereePickerScrollMarkup(choices.map((session) => liveRefereeChoiceButtonMarkup({
 50619 |       label: `${livePlayerName(session.resultOwnerPlayerId || session.ownerPlayerId || session.playerId, "Player")} - ${session.resultDisplayName}`,
 50620 |       attrs: `data-honey-result-choice="${escapeHtml(session.id)}" data-activity-id="${escapeHtml(activity.id)}"`,
 50621 |       variant: "ghost"
 50622 |     })).join("") || `<p class="empty-state compact">No eligible completed encounter remains.</p>`, "Completed encounters"),
 50623 |     choices: liveRefereeNavActionsMarkup([
 50624 |       liveRefereeChoiceButtonMarkup({ label: "Skip Honey", attrs: `data-honey-procedure-skip="${escapeHtml(activity.id)}"` })
 50625 |     ])
 50626 |   });
```


#### Hit 33 — line 50653

```text
 50641 | 
 50642 | function resolveHoneyEndOfActionProcedure(activityId, sourceRandomPokemonSessionId) {
 50643 |   const activity = liveActivityById(activityId);
 50644 |   const procedure = honeyProcedureForActivity(activity);
 50645 |   const player = state.players.find((entry) => entry.id === procedure?.sourcePlayerId);
 50646 |   const tokenIndex = (player?.inventory || []).findIndex((item) => item.id === procedure?.tokenInventoryRecordId);
 50647 |   if (!procedure || !player || tokenIndex < 0 || !procedure.eligibleRandomPokemonSessionIds.includes(sourceRandomPokemonSessionId)) {
 50648 |     alert("Honey's exact Token or Encounter selection is no longer available.");
 50649 |     return false;
 50650 |   }
 50651 |   const causalBeforeHoney = tokenUseRollbackSnapshot();
 50652 |   const savedPlayers = structuredClone(state.players);
 50653 |   const savedRandom = structuredClone(state.randomPokemonSessions || []);
 50654 |   const savedCopies = structuredClone(state.encounterCopyRecords || []);
 50655 |   const token = player.inventory.splice(tokenIndex, 1)[0];
 50656 |   const result = controlTokenEffects.resolveHoneyEncounterCopy(state, {
 50657 |     sourceEffectId: activity.id,
 50658 |     ownerPlayerId: player.id,
 50659 |     sourceRandomPokemonSessionId
 50660 |   }, controlTokenEffectOptions());
 50661 |   if (result.result !== "resolved") {
 50662 |     state.players = savedPlayers;
 50663 |     state.randomPokemonSessions = savedRandom;
 50664 |     state.encounterCopyRecords = savedCopies;
 50665 |     alert(result.reason);
```


#### Hit 34 — line 50663

```text
 50651 |   const causalBeforeHoney = tokenUseRollbackSnapshot();
 50652 |   const savedPlayers = structuredClone(state.players);
 50653 |   const savedRandom = structuredClone(state.randomPokemonSessions || []);
 50654 |   const savedCopies = structuredClone(state.encounterCopyRecords || []);
 50655 |   const token = player.inventory.splice(tokenIndex, 1)[0];
 50656 |   const result = controlTokenEffects.resolveHoneyEncounterCopy(state, {
 50657 |     sourceEffectId: activity.id,
 50658 |     ownerPlayerId: player.id,
 50659 |     sourceRandomPokemonSessionId
 50660 |   }, controlTokenEffectOptions());
 50661 |   if (result.result !== "resolved") {
 50662 |     state.players = savedPlayers;
 50663 |     state.randomPokemonSessions = savedRandom;
 50664 |     state.encounterCopyRecords = savedCopies;
 50665 |     alert(result.reason);
 50666 |     return false;
 50667 |   }
 50668 |   procedure.status = "resolved";
 50669 |   procedure.selectedRandomPokemonSessionId = sourceRandomPokemonSessionId;
 50670 |   procedure.copiedRandomPokemonSessionId = result.randomSession?.id || "";
 50671 |   procedure.consumedTokenId = token.id;
 50672 |   procedure.resolvedAt = new Date().toISOString();
 50673 |   activity.status = "resolved";
 50674 |   activity.resolution = "honey-encounter-copied";
 50675 |   state.selectedRandomPokemonSessionId = result.randomSession?.id || "";
```


#### Hit 35 — line 61145

```text
 61133 |   const randomPokemonSessionIds = new Set();
 61134 |   (state.gameCornerUnlocks || [])
 61135 |     .filter((unlock) => sessionIds.has(unlock.gameCornerSessionId) || unlock.actionVisitId === undoData.visitId)
 61136 |     .forEach((unlock) => {
 61137 |       if (unlock.pokemonId) pokemonIdsToRemove.add(unlock.pokemonId);
 61138 |       if (unlock.randomPokemonSessionId) randomPokemonSessionIds.add(unlock.randomPokemonSessionId);
 61139 |       const session = (state.gameCornerSessions || []).find((entry) => entry.id === unlock.gameCornerSessionId);
 61140 |       const used = (session?.gcTokensUsed || []).find((entry) => entry.unlockId === unlock.id);
 61141 |       if (used?.token && !earnedRewardIds.has(used.token.id) && !(player.inventory || []).some((item) => item.id === used.token.id)) {
 61142 |         restoredTokens.push(used.token);
 61143 |       }
 61144 |     });
 61145 |   (state.randomPokemonSessions || [])
 61146 |     .filter((session) => sessionIds.has(session.gameCornerSessionId) || session.actionVisitId === undoData.visitId)
 61147 |     .forEach((session) => {
 61148 |       session.status = "undone";
 61149 |       session.undoneAt = new Date().toISOString();
 61150 |       randomPokemonSessionIds.add(session.id);
 61151 |       if (session.rosterPokemonId) pokemonIdsToRemove.add(session.rosterPokemonId);
 61152 |       (session.rerollHistory || []).forEach((reroll) => {
 61153 |         if (reroll.token && !(player.inventory || []).some((item) => item.id === reroll.token.id)) {
 61154 |           restoredTokens.push(reroll.token);
 61155 |         }
 61156 |       });
 61157 |     });
```


#### Hit 36 — line 61208

```text
 61196 |   if (!player || !undoData.previousInventory) return;
 61197 |   const previousGcTokens = structuredClone(undoData.previousInventory || []).filter(isGameCornerToken);
 61198 |   const currentNonGcInventory = (player.inventory || []).filter((item) => !isGameCornerToken(item));
 61199 |   player.inventory = [...previousGcTokens, ...currentNonGcInventory];
 61200 | }
 61201 | 
 61202 | function undoEncounterActionVisit(undoData) {
 61203 |   const player = state.players.find((candidate) => candidate.id === undoData.playerId);
 61204 |   if (player && undoData.previousInventory) player.inventory = structuredClone(undoData.previousInventory);
 61205 |   const session = (state.encounterSessions || []).find((entry) => entry.id === undoData.encounterSessionId);
 61206 |   if (!session) {
 61207 |     if (undoData.previousEncounterSessions) state.encounterSessions = structuredClone(undoData.previousEncounterSessions);
 61208 |     if (undoData.previousRandomPokemonSessions) state.randomPokemonSessions = structuredClone(undoData.previousRandomPokemonSessions);
 61209 |     if (undoData.previousPokemonRecords) state.pokemonRecords = structuredClone(undoData.previousPokemonRecords).map(normalizePokemonRecord);
 61210 |     if (undoData.previousInteractionEvents) {
 61211 |       state.interactionEvents = structuredClone(undoData.previousInteractionEvents);
 61212 |     } else if (Array.isArray(undoData.previousInteractionEventIds)) {
 61213 |       const previousIds = new Set(undoData.previousInteractionEventIds);
 61214 |       state.interactionEvents = (state.interactionEvents || []).filter((activity) => previousIds.has(activity.id));
 61215 |     }
 61216 |     if (undoData.previousTransactions) {
 61217 |       state.transactions = structuredClone(undoData.previousTransactions);
 61218 |     } else if (Array.isArray(undoData.previousTransactionIds)) {
 61219 |       const previousIds = new Set(undoData.previousTransactionIds);
 61220 |       state.transactions = (state.transactions || []).filter((transaction) => previousIds.has(transaction.id));
```


#### Hit 37 — line 61240

```text
 61228 |   const visitIds = session.actionVisitIds || (session.actionVisitId ? [session.actionVisitId] : []);
 61229 |   const visitIndex = Math.max(0, visitIds.indexOf(undoData.visitId));
 61230 |   let rollsToRemove = (session.rolls || []).filter((roll) => roll.actionVisitId === undoData.visitId);
 61231 |   if (!rollsToRemove.length || rollsToRemove.length > rollsPerAction) {
 61232 |     rollsToRemove = (session.rolls || []).slice(visitIndex * rollsPerAction, visitIndex * rollsPerAction + rollsPerAction);
 61233 |   }
 61234 |   const rollIds = new Set(rollsToRemove.map((roll) => roll.id));
 61235 |   const randomSessionIds = new Set(rollsToRemove.map((roll) => roll.randomPokemonSessionId).filter(Boolean));
 61236 |   const interactionIdsToRemove = new Set((state.interactionEvents || [])
 61237 |     .filter((activity) => randomSessionIds.has(activity.sourceId) || randomSessionIds.has(activity.payload?.randomPokemonSessionId))
 61238 |     .map((activity) => activity.id));
 61239 |   const pokemonIdsToRemove = new Set(rollsToRemove.map((roll) => roll.rosterPokemonId).filter(Boolean));
 61240 |   (state.randomPokemonSessions || []).forEach((randomSession) => {
 61241 |     if (randomSessionIds.has(randomSession.id) && randomSession.rosterPokemonId) pokemonIdsToRemove.add(randomSession.rosterPokemonId);
 61242 |   });
 61243 |   session.rolls = (session.rolls || []).filter((roll) => !rollIds.has(roll.id));
 61244 |   session.resultSessionIds = (session.resultSessionIds || []).filter((id) => !randomSessionIds.has(id));
 61245 |   session.actionVisitIds = visitIds.filter((id) => id !== undoData.visitId);
 61246 |   session.maxRolls = Math.max(0, Number(session.maxRolls || rollsPerAction) - rollsPerAction);
 61247 |   session.status = session.rolls.length >= Number(session.maxRolls || 0) ? "review" : "pending";
 61248 |   session.updatedAt = new Date().toISOString();
 61249 |   state.randomPokemonSessions = (state.randomPokemonSessions || []).filter((randomSession) => !randomSessionIds.has(randomSession.id));
 61250 |   state.interactionEvents = (state.interactionEvents || []).filter((activity) => !interactionIdsToRemove.has(activity.id));
 61251 |   state.transactions = (state.transactions || []).filter((transaction) => !interactionIdsToRemove.has(transaction.linkedEventId));
 61252 |   syncLinkedTransactions();
```


#### Hit 38 — line 61249

```text
 61237 |     .filter((activity) => randomSessionIds.has(activity.sourceId) || randomSessionIds.has(activity.payload?.randomPokemonSessionId))
 61238 |     .map((activity) => activity.id));
 61239 |   const pokemonIdsToRemove = new Set(rollsToRemove.map((roll) => roll.rosterPokemonId).filter(Boolean));
 61240 |   (state.randomPokemonSessions || []).forEach((randomSession) => {
 61241 |     if (randomSessionIds.has(randomSession.id) && randomSession.rosterPokemonId) pokemonIdsToRemove.add(randomSession.rosterPokemonId);
 61242 |   });
 61243 |   session.rolls = (session.rolls || []).filter((roll) => !rollIds.has(roll.id));
 61244 |   session.resultSessionIds = (session.resultSessionIds || []).filter((id) => !randomSessionIds.has(id));
 61245 |   session.actionVisitIds = visitIds.filter((id) => id !== undoData.visitId);
 61246 |   session.maxRolls = Math.max(0, Number(session.maxRolls || rollsPerAction) - rollsPerAction);
 61247 |   session.status = session.rolls.length >= Number(session.maxRolls || 0) ? "review" : "pending";
 61248 |   session.updatedAt = new Date().toISOString();
 61249 |   state.randomPokemonSessions = (state.randomPokemonSessions || []).filter((randomSession) => !randomSessionIds.has(randomSession.id));
 61250 |   state.interactionEvents = (state.interactionEvents || []).filter((activity) => !interactionIdsToRemove.has(activity.id));
 61251 |   state.transactions = (state.transactions || []).filter((transaction) => !interactionIdsToRemove.has(transaction.linkedEventId));
 61252 |   syncLinkedTransactions();
 61253 |   state.pokemonRecords = (state.pokemonRecords || []).filter((pokemon) => !pokemonIdsToRemove.has(pokemon.id));
 61254 |   if (!session.actionVisitIds.length && !(session.rolls || []).length) {
 61255 |     state.encounterSessions = (state.encounterSessions || []).filter((entry) => entry.id !== session.id);
 61256 |   } else if (player) {
 61257 |     updateEncounterActionLog(session, player);
 61258 |   }
 61259 |   if (state.selectedEncounterSessionId === undoData.encounterSessionId && !pendingEncounterSessions().some((entry) => entry.id === state.selectedEncounterSessionId)) {
 61260 |     state.selectedEncounterSessionId = "";
 61261 |     state.encounterModalOpen = false;
```


#### Hit 39 — line 61249

```text
 61237 |     .filter((activity) => randomSessionIds.has(activity.sourceId) || randomSessionIds.has(activity.payload?.randomPokemonSessionId))
 61238 |     .map((activity) => activity.id));
 61239 |   const pokemonIdsToRemove = new Set(rollsToRemove.map((roll) => roll.rosterPokemonId).filter(Boolean));
 61240 |   (state.randomPokemonSessions || []).forEach((randomSession) => {
 61241 |     if (randomSessionIds.has(randomSession.id) && randomSession.rosterPokemonId) pokemonIdsToRemove.add(randomSession.rosterPokemonId);
 61242 |   });
 61243 |   session.rolls = (session.rolls || []).filter((roll) => !rollIds.has(roll.id));
 61244 |   session.resultSessionIds = (session.resultSessionIds || []).filter((id) => !randomSessionIds.has(id));
 61245 |   session.actionVisitIds = visitIds.filter((id) => id !== undoData.visitId);
 61246 |   session.maxRolls = Math.max(0, Number(session.maxRolls || rollsPerAction) - rollsPerAction);
 61247 |   session.status = session.rolls.length >= Number(session.maxRolls || 0) ? "review" : "pending";
 61248 |   session.updatedAt = new Date().toISOString();
 61249 |   state.randomPokemonSessions = (state.randomPokemonSessions || []).filter((randomSession) => !randomSessionIds.has(randomSession.id));
 61250 |   state.interactionEvents = (state.interactionEvents || []).filter((activity) => !interactionIdsToRemove.has(activity.id));
 61251 |   state.transactions = (state.transactions || []).filter((transaction) => !interactionIdsToRemove.has(transaction.linkedEventId));
 61252 |   syncLinkedTransactions();
 61253 |   state.pokemonRecords = (state.pokemonRecords || []).filter((pokemon) => !pokemonIdsToRemove.has(pokemon.id));
 61254 |   if (!session.actionVisitIds.length && !(session.rolls || []).length) {
 61255 |     state.encounterSessions = (state.encounterSessions || []).filter((entry) => entry.id !== session.id);
 61256 |   } else if (player) {
 61257 |     updateEncounterActionLog(session, player);
 61258 |   }
 61259 |   if (state.selectedEncounterSessionId === undoData.encounterSessionId && !pendingEncounterSessions().some((entry) => entry.id === state.selectedEncounterSessionId)) {
 61260 |     state.selectedEncounterSessionId = "";
 61261 |     state.encounterModalOpen = false;
```


#### Hit 40 — line 61276

```text
 61264 | }
 61265 | 
 61266 | function restoreTokenEffectContractUndoData(undoData) {
 61267 |   if (undoData.previousPlayers) state.players = structuredClone(undoData.previousPlayers);
 61268 |   if (undoData.previousPokemonRecords) state.pokemonRecords = structuredClone(undoData.previousPokemonRecords).map(normalizePokemonRecord);
 61269 |   if (undoData.previousPokemonLog) state.pokemonLog = structuredClone(undoData.previousPokemonLog);
 61270 |   if (undoData.previousLingeringStatuses) state.lingeringStatuses = structuredClone(undoData.previousLingeringStatuses);
 61271 |   if (undoData.previousTokenActivations) state.tokenActivations = structuredClone(undoData.previousTokenActivations);
 61272 |   if (undoData.previousTokenConsumptions) state.tokenConsumptions = structuredClone(undoData.previousTokenConsumptions);
 61273 |   if (undoData.previousPlayerNotifications) state.playerNotifications = structuredClone(undoData.previousPlayerNotifications);
 61274 |   if (undoData.previousWheelSessions) state.wheelSessions = structuredClone(undoData.previousWheelSessions);
 61275 |   if (undoData.previousEncounterSessions) state.encounterSessions = structuredClone(undoData.previousEncounterSessions);
 61276 |   if (undoData.previousRandomPokemonSessions) state.randomPokemonSessions = structuredClone(undoData.previousRandomPokemonSessions);
 61277 |   if (Object.prototype.hasOwnProperty.call(undoData, "previousSelectedEncounterSessionId")) {
 61278 |     state.selectedEncounterSessionId = undoData.previousSelectedEncounterSessionId || "";
 61279 |   }
 61280 |   if (Object.prototype.hasOwnProperty.call(undoData, "previousEncounterModalOpen")) {
 61281 |     state.encounterModalOpen = Boolean(undoData.previousEncounterModalOpen);
 61282 |   }
 61283 |   if (undoData.previousInteractionEvents) state.interactionEvents = structuredClone(undoData.previousInteractionEvents).map((activity) => normalizeInteractionActivity(activity, state));
 61284 |   if (undoData.previousTransactions) state.transactions = structuredClone(undoData.previousTransactions);
 61285 |   if (undoData.previousGlobalPokemonRules) state.globalPokemonRules = structuredClone(undoData.previousGlobalPokemonRules);
 61286 |   if (undoData.previousBanlistHistory) state.banlistHistory = structuredClone(undoData.previousBanlistHistory);
 61287 |   if (undoData.previousTeambuilder) state.teambuilder = structuredClone(undoData.previousTeambuilder);
 61288 |   if (undoData.previousBattleTeams) state.battleTeams = structuredClone(undoData.previousBattleTeams);
```


### activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2

Occurrences: 16

#### Hit 1 — line 43050

```text
 43038 |       render();
 43039 |     } catch (rollbackError) {
 43040 |       console.error("Action Phase rollback render failed", rollbackError);
 43041 |       render();
 43042 |     }
 43043 |     alert(`${error?.message || service.label || location.name} No action was spent.`);
 43044 |   } finally {
 43045 |     actionServiceInProgress = false;
 43046 |   }
 43047 | }
 43048 | 
 43049 | function clearSelectedActionLocation() {
 43050 |   if (activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 43051 |     const workspace = v2RouteWorkspaceState();
 43052 |     if (workspace.screen === "route-detail") {
 43053 |       if (workspace.activeOpportunityId) {
 43054 |         return;
 43055 |       }
 43056 |       workspace.screen = "route-list";
 43057 |       workspace.selectedRouteNumber = 0;
 43058 |     } else if (workspace.screen === "route-list" || workspace.screen === "legacy" || workspace.screen === "result") {
 43059 |       const actionPhase = v2EnsureActionPhase(state.series);
 43060 |       const action = workspace.activeActionId ? v2FindAction(actionPhase, workspace.activeActionId) : null;
 43061 |       if (workspace.screen === "result" && action && action.settlementStatus !== "settled") {
 43062 |         return;
```


#### Hit 2 — line 63488

```text
 63476 |     if (!switchActivePlayer(playerId, { testingOverride: true })) return;
 63477 |     setTestingToolsState({ controlledPlayerId: playerId });
 63478 |     saveState({ immediate: true });
 63479 |     render();
 63480 |   });
 63481 |   els.actionLocationBoard.addEventListener("pointerdown", (event) => {
 63482 |     const handle = event.target.closest("[data-v2-route-effects-drag-handle]");
 63483 |     if (!handle || !els.actionLocationBoard.contains(handle) || activeActionPhaseVersion() !== ACTION_PHASE_VERSION_V2) return;
 63484 |     startV2RouteEffectsDrag(event);
 63485 |   });
 63486 |   els.actionLocationBoard.addEventListener("click", (event) => {
 63487 |     const routeEnterButton = event.target.closest("[data-v2-route-enter]");
 63488 |     if (routeEnterButton && els.actionLocationBoard.contains(routeEnterButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63489 |       event.preventDefault();
 63490 |       const workspace = v2RouteWorkspaceState();
 63491 |       workspace.screen = "route-list";
 63492 |       workspace.selectedActionId = "encounter";
 63493 |       workspace.selectedRouteNumber = workspace.selectedRouteNumber || 1;
 63494 |       saveState();
 63495 |       render();
 63496 |       focusV2RouteBrowserRoute(workspace.selectedRouteNumber);
 63497 |       return;
 63498 |     }
 63499 |     const routeContinueButton = event.target.closest("[data-v2-route-continue]");
 63500 |     if (routeContinueButton && els.actionLocationBoard.contains(routeContinueButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
```


#### Hit 3 — line 63500

```text
 63488 |     if (routeEnterButton && els.actionLocationBoard.contains(routeEnterButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63489 |       event.preventDefault();
 63490 |       const workspace = v2RouteWorkspaceState();
 63491 |       workspace.screen = "route-list";
 63492 |       workspace.selectedActionId = "encounter";
 63493 |       workspace.selectedRouteNumber = workspace.selectedRouteNumber || 1;
 63494 |       saveState();
 63495 |       render();
 63496 |       focusV2RouteBrowserRoute(workspace.selectedRouteNumber);
 63497 |       return;
 63498 |     }
 63499 |     const routeContinueButton = event.target.closest("[data-v2-route-continue]");
 63500 |     if (routeContinueButton && els.actionLocationBoard.contains(routeContinueButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63501 |       event.preventDefault();
 63502 |       const workspace = v2RouteWorkspaceState();
 63503 |       workspace.screen = "root";
 63504 |       workspace.selectedActionId = "";
 63505 |       workspace.selectedRouteNumber = 0;
 63506 |       workspace.activeActionId = "";
 63507 |       saveState();
 63508 |       render();
 63509 |       return;
 63510 |     }
 63511 |     const routeConfirmButton = event.target.closest("[data-v2-route-confirm]");
 63512 |     if (routeConfirmButton && els.actionLocationBoard.contains(routeConfirmButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
```


#### Hit 4 — line 63512

```text
 63500 |     if (routeContinueButton && els.actionLocationBoard.contains(routeContinueButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63501 |       event.preventDefault();
 63502 |       const workspace = v2RouteWorkspaceState();
 63503 |       workspace.screen = "root";
 63504 |       workspace.selectedActionId = "";
 63505 |       workspace.selectedRouteNumber = 0;
 63506 |       workspace.activeActionId = "";
 63507 |       saveState();
 63508 |       render();
 63509 |       return;
 63510 |     }
 63511 |     const routeConfirmButton = event.target.closest("[data-v2-route-confirm]");
 63512 |     if (routeConfirmButton && els.actionLocationBoard.contains(routeConfirmButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63513 |       event.preventDefault();
 63514 |       if (!routeConfirmButton.disabled) takeV2RouteAction(Number(routeConfirmButton.dataset.v2RouteConfirm || 0));
 63515 |       return;
 63516 |     }
 63517 |     const routeRerollButton = event.target.closest("[data-v2-route-reroll]");
 63518 |     if (routeRerollButton && els.actionLocationBoard.contains(routeRerollButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63519 |       event.preventDefault();
 63520 |       rerollV2RouteAction(routeRerollButton.dataset.v2RouteReroll);
 63521 |       return;
 63522 |     }
 63523 |     const routeRerollTokenButton = event.target.closest("[data-v2-route-reroll-token]");
 63524 |     if (routeRerollTokenButton && els.actionLocationBoard.contains(routeRerollTokenButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
```


#### Hit 5 — line 63518

```text
 63506 |       workspace.activeActionId = "";
 63507 |       saveState();
 63508 |       render();
 63509 |       return;
 63510 |     }
 63511 |     const routeConfirmButton = event.target.closest("[data-v2-route-confirm]");
 63512 |     if (routeConfirmButton && els.actionLocationBoard.contains(routeConfirmButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63513 |       event.preventDefault();
 63514 |       if (!routeConfirmButton.disabled) takeV2RouteAction(Number(routeConfirmButton.dataset.v2RouteConfirm || 0));
 63515 |       return;
 63516 |     }
 63517 |     const routeRerollButton = event.target.closest("[data-v2-route-reroll]");
 63518 |     if (routeRerollButton && els.actionLocationBoard.contains(routeRerollButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63519 |       event.preventDefault();
 63520 |       rerollV2RouteAction(routeRerollButton.dataset.v2RouteReroll);
 63521 |       return;
 63522 |     }
 63523 |     const routeRerollTokenButton = event.target.closest("[data-v2-route-reroll-token]");
 63524 |     if (routeRerollTokenButton && els.actionLocationBoard.contains(routeRerollTokenButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63525 |       event.preventDefault();
 63526 |       useV2RouteRerollToken(routeRerollTokenButton.dataset.v2RouteRerollToken, routeRerollTokenButton.dataset.v2TokenId || "");
 63527 |       return;
 63528 |     }
 63529 |     const opportunityDrawButton = event.target.closest("[data-v2-opportunity-draw]");
 63530 |     if (opportunityDrawButton && els.actionLocationBoard.contains(opportunityDrawButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
```


#### Hit 6 — line 63524

```text
 63512 |     if (routeConfirmButton && els.actionLocationBoard.contains(routeConfirmButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63513 |       event.preventDefault();
 63514 |       if (!routeConfirmButton.disabled) takeV2RouteAction(Number(routeConfirmButton.dataset.v2RouteConfirm || 0));
 63515 |       return;
 63516 |     }
 63517 |     const routeRerollButton = event.target.closest("[data-v2-route-reroll]");
 63518 |     if (routeRerollButton && els.actionLocationBoard.contains(routeRerollButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63519 |       event.preventDefault();
 63520 |       rerollV2RouteAction(routeRerollButton.dataset.v2RouteReroll);
 63521 |       return;
 63522 |     }
 63523 |     const routeRerollTokenButton = event.target.closest("[data-v2-route-reroll-token]");
 63524 |     if (routeRerollTokenButton && els.actionLocationBoard.contains(routeRerollTokenButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63525 |       event.preventDefault();
 63526 |       useV2RouteRerollToken(routeRerollTokenButton.dataset.v2RouteRerollToken, routeRerollTokenButton.dataset.v2TokenId || "");
 63527 |       return;
 63528 |     }
 63529 |     const opportunityDrawButton = event.target.closest("[data-v2-opportunity-draw]");
 63530 |     if (opportunityDrawButton && els.actionLocationBoard.contains(opportunityDrawButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63531 |       event.preventDefault();
 63532 |       drawV2PendingRouteOpportunity(opportunityDrawButton.dataset.v2OpportunityDraw || "");
 63533 |       return;
 63534 |     }
 63535 |     const railExtraBuyButton = event.target.closest("[data-v2-rail-extra-buy]");
 63536 |     if (railExtraBuyButton && els.actionLocationBoard.contains(railExtraBuyButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
```


#### Hit 7 — line 63530

```text
 63518 |     if (routeRerollButton && els.actionLocationBoard.contains(routeRerollButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63519 |       event.preventDefault();
 63520 |       rerollV2RouteAction(routeRerollButton.dataset.v2RouteReroll);
 63521 |       return;
 63522 |     }
 63523 |     const routeRerollTokenButton = event.target.closest("[data-v2-route-reroll-token]");
 63524 |     if (routeRerollTokenButton && els.actionLocationBoard.contains(routeRerollTokenButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63525 |       event.preventDefault();
 63526 |       useV2RouteRerollToken(routeRerollTokenButton.dataset.v2RouteRerollToken, routeRerollTokenButton.dataset.v2TokenId || "");
 63527 |       return;
 63528 |     }
 63529 |     const opportunityDrawButton = event.target.closest("[data-v2-opportunity-draw]");
 63530 |     if (opportunityDrawButton && els.actionLocationBoard.contains(opportunityDrawButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63531 |       event.preventDefault();
 63532 |       drawV2PendingRouteOpportunity(opportunityDrawButton.dataset.v2OpportunityDraw || "");
 63533 |       return;
 63534 |     }
 63535 |     const railExtraBuyButton = event.target.closest("[data-v2-rail-extra-buy]");
 63536 |     if (railExtraBuyButton && els.actionLocationBoard.contains(railExtraBuyButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63537 |       event.preventDefault();
 63538 |       if (!railExtraBuyButton.disabled) purchaseV2ExtraEncounter();
 63539 |       return;
 63540 |     }
 63541 |     const railExtraUseButton = event.target.closest("[data-v2-rail-extra-use]");
 63542 |     if (railExtraUseButton && els.actionLocationBoard.contains(railExtraUseButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
```


#### Hit 8 — line 63536

```text
 63524 |     if (routeRerollTokenButton && els.actionLocationBoard.contains(routeRerollTokenButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63525 |       event.preventDefault();
 63526 |       useV2RouteRerollToken(routeRerollTokenButton.dataset.v2RouteRerollToken, routeRerollTokenButton.dataset.v2TokenId || "");
 63527 |       return;
 63528 |     }
 63529 |     const opportunityDrawButton = event.target.closest("[data-v2-opportunity-draw]");
 63530 |     if (opportunityDrawButton && els.actionLocationBoard.contains(opportunityDrawButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63531 |       event.preventDefault();
 63532 |       drawV2PendingRouteOpportunity(opportunityDrawButton.dataset.v2OpportunityDraw || "");
 63533 |       return;
 63534 |     }
 63535 |     const railExtraBuyButton = event.target.closest("[data-v2-rail-extra-buy]");
 63536 |     if (railExtraBuyButton && els.actionLocationBoard.contains(railExtraBuyButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63537 |       event.preventDefault();
 63538 |       if (!railExtraBuyButton.disabled) purchaseV2ExtraEncounter();
 63539 |       return;
 63540 |     }
 63541 |     const railExtraUseButton = event.target.closest("[data-v2-rail-extra-use]");
 63542 |     if (railExtraUseButton && els.actionLocationBoard.contains(railExtraUseButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63543 |       event.preventDefault();
 63544 |       if (!railExtraUseButton.disabled) useV2ExtraEncounter(Number(railExtraUseButton.dataset.v2RailExtraUse || 0), railExtraUseButton.dataset.v2TokenId || "");
 63545 |       return;
 63546 |     }
 63547 |     const railInjectionButton = event.target.closest("[data-v2-rail-injection-apply]");
 63548 |     if (railInjectionButton && els.actionLocationBoard.contains(railInjectionButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
```


#### Hit 9 — line 63542

```text
 63530 |     if (opportunityDrawButton && els.actionLocationBoard.contains(opportunityDrawButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63531 |       event.preventDefault();
 63532 |       drawV2PendingRouteOpportunity(opportunityDrawButton.dataset.v2OpportunityDraw || "");
 63533 |       return;
 63534 |     }
 63535 |     const railExtraBuyButton = event.target.closest("[data-v2-rail-extra-buy]");
 63536 |     if (railExtraBuyButton && els.actionLocationBoard.contains(railExtraBuyButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63537 |       event.preventDefault();
 63538 |       if (!railExtraBuyButton.disabled) purchaseV2ExtraEncounter();
 63539 |       return;
 63540 |     }
 63541 |     const railExtraUseButton = event.target.closest("[data-v2-rail-extra-use]");
 63542 |     if (railExtraUseButton && els.actionLocationBoard.contains(railExtraUseButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63543 |       event.preventDefault();
 63544 |       if (!railExtraUseButton.disabled) useV2ExtraEncounter(Number(railExtraUseButton.dataset.v2RailExtraUse || 0), railExtraUseButton.dataset.v2TokenId || "");
 63545 |       return;
 63546 |     }
 63547 |     const railInjectionButton = event.target.closest("[data-v2-rail-injection-apply]");
 63548 |     if (railInjectionButton && els.actionLocationBoard.contains(railInjectionButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63549 |       event.preventDefault();
 63550 |       const rail = railInjectionButton.closest("[data-v2-route-encounter-rail]");
 63551 |       const primaryType = rail?.querySelector("[data-v2-rail-injection-primary]")?.value || "";
 63552 |       applyV2TemporaryTypeInjectionEffect(railInjectionButton.dataset.v2RailInjectionApply || "", primaryType, railInjectionButton.dataset.v2RailInjectionActivation || "");
 63553 |       return;
 63554 |     }
```


#### Hit 10 — line 63548

```text
 63536 |     if (railExtraBuyButton && els.actionLocationBoard.contains(railExtraBuyButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63537 |       event.preventDefault();
 63538 |       if (!railExtraBuyButton.disabled) purchaseV2ExtraEncounter();
 63539 |       return;
 63540 |     }
 63541 |     const railExtraUseButton = event.target.closest("[data-v2-rail-extra-use]");
 63542 |     if (railExtraUseButton && els.actionLocationBoard.contains(railExtraUseButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63543 |       event.preventDefault();
 63544 |       if (!railExtraUseButton.disabled) useV2ExtraEncounter(Number(railExtraUseButton.dataset.v2RailExtraUse || 0), railExtraUseButton.dataset.v2TokenId || "");
 63545 |       return;
 63546 |     }
 63547 |     const railInjectionButton = event.target.closest("[data-v2-rail-injection-apply]");
 63548 |     if (railInjectionButton && els.actionLocationBoard.contains(railInjectionButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63549 |       event.preventDefault();
 63550 |       const rail = railInjectionButton.closest("[data-v2-route-encounter-rail]");
 63551 |       const primaryType = rail?.querySelector("[data-v2-rail-injection-primary]")?.value || "";
 63552 |       applyV2TemporaryTypeInjectionEffect(railInjectionButton.dataset.v2RailInjectionApply || "", primaryType, railInjectionButton.dataset.v2RailInjectionActivation || "");
 63553 |       return;
 63554 |     }
 63555 |     const routeEffectsToggle = event.target.closest("[data-v2-route-effects-toggle]");
 63556 |     if (routeEffectsToggle && els.actionLocationBoard.contains(routeEffectsToggle) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63557 |       event.preventDefault();
 63558 |       const uiState = v2RouteEffectsUiState();
 63559 |       uiState.routeEffectsOpen = !uiState.routeEffectsOpen;
 63560 |       saveClientUiState();
```


#### Hit 11 — line 63556

```text
 63544 |       if (!railExtraUseButton.disabled) useV2ExtraEncounter(Number(railExtraUseButton.dataset.v2RailExtraUse || 0), railExtraUseButton.dataset.v2TokenId || "");
 63545 |       return;
 63546 |     }
 63547 |     const railInjectionButton = event.target.closest("[data-v2-rail-injection-apply]");
 63548 |     if (railInjectionButton && els.actionLocationBoard.contains(railInjectionButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63549 |       event.preventDefault();
 63550 |       const rail = railInjectionButton.closest("[data-v2-route-encounter-rail]");
 63551 |       const primaryType = rail?.querySelector("[data-v2-rail-injection-primary]")?.value || "";
 63552 |       applyV2TemporaryTypeInjectionEffect(railInjectionButton.dataset.v2RailInjectionApply || "", primaryType, railInjectionButton.dataset.v2RailInjectionActivation || "");
 63553 |       return;
 63554 |     }
 63555 |     const routeEffectsToggle = event.target.closest("[data-v2-route-effects-toggle]");
 63556 |     if (routeEffectsToggle && els.actionLocationBoard.contains(routeEffectsToggle) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63557 |       event.preventDefault();
 63558 |       const uiState = v2RouteEffectsUiState();
 63559 |       uiState.routeEffectsOpen = !uiState.routeEffectsOpen;
 63560 |       saveClientUiState();
 63561 |       render();
 63562 |       return;
 63563 |     }
 63564 |     const routeEffectsClose = event.target.closest("[data-v2-route-effects-close]");
 63565 |     if (routeEffectsClose && els.actionLocationBoard.contains(routeEffectsClose) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63566 |       event.preventDefault();
 63567 |       const uiState = v2RouteEffectsUiState();
 63568 |       uiState.routeEffectsOpen = false;
```


#### Hit 12 — line 63565

```text
 63553 |       return;
 63554 |     }
 63555 |     const routeEffectsToggle = event.target.closest("[data-v2-route-effects-toggle]");
 63556 |     if (routeEffectsToggle && els.actionLocationBoard.contains(routeEffectsToggle) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63557 |       event.preventDefault();
 63558 |       const uiState = v2RouteEffectsUiState();
 63559 |       uiState.routeEffectsOpen = !uiState.routeEffectsOpen;
 63560 |       saveClientUiState();
 63561 |       render();
 63562 |       return;
 63563 |     }
 63564 |     const routeEffectsClose = event.target.closest("[data-v2-route-effects-close]");
 63565 |     if (routeEffectsClose && els.actionLocationBoard.contains(routeEffectsClose) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63566 |       event.preventDefault();
 63567 |       const uiState = v2RouteEffectsUiState();
 63568 |       uiState.routeEffectsOpen = false;
 63569 |       saveClientUiState();
 63570 |       render();
 63571 |       return;
 63572 |     }
 63573 |     const routeEffectToggle = event.target.closest("[data-v2-route-effect-toggle]");
 63574 |     if (routeEffectToggle && els.actionLocationBoard.contains(routeEffectToggle) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63575 |       event.preventDefault();
 63576 |       const uiState = v2RouteEffectsUiState();
 63577 |       const effectId = routeEffectToggle.dataset.v2RouteEffectToggle || "";
```


#### Hit 13 — line 63574

```text
 63562 |       return;
 63563 |     }
 63564 |     const routeEffectsClose = event.target.closest("[data-v2-route-effects-close]");
 63565 |     if (routeEffectsClose && els.actionLocationBoard.contains(routeEffectsClose) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63566 |       event.preventDefault();
 63567 |       const uiState = v2RouteEffectsUiState();
 63568 |       uiState.routeEffectsOpen = false;
 63569 |       saveClientUiState();
 63570 |       render();
 63571 |       return;
 63572 |     }
 63573 |     const routeEffectToggle = event.target.closest("[data-v2-route-effect-toggle]");
 63574 |     if (routeEffectToggle && els.actionLocationBoard.contains(routeEffectToggle) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63575 |       event.preventDefault();
 63576 |       const uiState = v2RouteEffectsUiState();
 63577 |       const effectId = routeEffectToggle.dataset.v2RouteEffectToggle || "";
 63578 |       uiState.routeEffectsExpandedId = uiState.routeEffectsExpandedId === effectId ? "" : effectId;
 63579 |       saveClientUiState();
 63580 |       render();
 63581 |       return;
 63582 |     }
 63583 |     const routeEffectApply = event.target.closest("[data-v2-route-effect-apply]");
 63584 |     if (routeEffectApply && els.actionLocationBoard.contains(routeEffectApply) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63585 |       event.preventDefault();
 63586 |       const card = routeEffectApply.closest("[data-v2-route-effect-card]");
```


#### Hit 14 — line 63584

```text
 63572 |     }
 63573 |     const routeEffectToggle = event.target.closest("[data-v2-route-effect-toggle]");
 63574 |     if (routeEffectToggle && els.actionLocationBoard.contains(routeEffectToggle) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63575 |       event.preventDefault();
 63576 |       const uiState = v2RouteEffectsUiState();
 63577 |       const effectId = routeEffectToggle.dataset.v2RouteEffectToggle || "";
 63578 |       uiState.routeEffectsExpandedId = uiState.routeEffectsExpandedId === effectId ? "" : effectId;
 63579 |       saveClientUiState();
 63580 |       render();
 63581 |       return;
 63582 |     }
 63583 |     const routeEffectApply = event.target.closest("[data-v2-route-effect-apply]");
 63584 |     if (routeEffectApply && els.actionLocationBoard.contains(routeEffectApply) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63585 |       event.preventDefault();
 63586 |       const card = routeEffectApply.closest("[data-v2-route-effect-card]");
 63587 |       const action = routeEffectApply.dataset.v2RouteEffectApply || "";
 63588 |       if (action === "repel") {
 63589 |         const tier = card?.querySelector('[data-v2-route-effect-field="repelTier"]')?.value || "";
 63590 |         applyV2RouteRepel(Number(routeEffectApply.dataset.v2RouteNumber || 0), tier, routeEffectApply.dataset.v2TokenId || "");
 63591 |       } else if (action === "master-ball") {
 63592 |         const residentId = card?.querySelector('[data-v2-route-effect-field="masterResident"]')?.value || "";
 63593 |         if (residentId) useV2MasterBallOnOpportunity(routeEffectApply.dataset.v2OpportunityId || "", residentId, routeEffectApply.dataset.v2TokenId || "");
 63594 |       }
 63595 |       return;
 63596 |     }
```


#### Hit 15 — line 63598

```text
 63586 |       const card = routeEffectApply.closest("[data-v2-route-effect-card]");
 63587 |       const action = routeEffectApply.dataset.v2RouteEffectApply || "";
 63588 |       if (action === "repel") {
 63589 |         const tier = card?.querySelector('[data-v2-route-effect-field="repelTier"]')?.value || "";
 63590 |         applyV2RouteRepel(Number(routeEffectApply.dataset.v2RouteNumber || 0), tier, routeEffectApply.dataset.v2TokenId || "");
 63591 |       } else if (action === "master-ball") {
 63592 |         const residentId = card?.querySelector('[data-v2-route-effect-field="masterResident"]')?.value || "";
 63593 |         if (residentId) useV2MasterBallOnOpportunity(routeEffectApply.dataset.v2OpportunityId || "", residentId, routeEffectApply.dataset.v2TokenId || "");
 63594 |       }
 63595 |       return;
 63596 |     }
 63597 |     const routeAcquireButton = event.target.closest("[data-v2-route-acquire]");
 63598 |     if (routeAcquireButton && els.actionLocationBoard.contains(routeAcquireButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63599 |       event.preventDefault();
 63600 |       acquireV2RouteActionPokemon(routeAcquireButton.dataset.v2RouteAcquire);
 63601 |       return;
 63602 |     }
 63603 |     const duplicateToggle = event.target.closest("[data-v2-duplicate-toggle]");
 63604 |     if (duplicateToggle && els.actionLocationBoard.contains(duplicateToggle) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63605 |       event.preventDefault();
 63606 |       const currentlyEnabled = duplicateToggle.dataset.v2DuplicateEnabled !== "false";
 63607 |       v2SetRouteDuplicatePreference({
 63608 |         playerId: activePlayer().id,
 63609 |         routeNumber: Number(duplicateToggle.dataset.v2RouteNumber || 0),
 63610 |         residentId: duplicateToggle.dataset.v2DuplicateToggle || "",
```


#### Hit 16 — line 63604

```text
 63592 |         const residentId = card?.querySelector('[data-v2-route-effect-field="masterResident"]')?.value || "";
 63593 |         if (residentId) useV2MasterBallOnOpportunity(routeEffectApply.dataset.v2OpportunityId || "", residentId, routeEffectApply.dataset.v2TokenId || "");
 63594 |       }
 63595 |       return;
 63596 |     }
 63597 |     const routeAcquireButton = event.target.closest("[data-v2-route-acquire]");
 63598 |     if (routeAcquireButton && els.actionLocationBoard.contains(routeAcquireButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63599 |       event.preventDefault();
 63600 |       acquireV2RouteActionPokemon(routeAcquireButton.dataset.v2RouteAcquire);
 63601 |       return;
 63602 |     }
 63603 |     const duplicateToggle = event.target.closest("[data-v2-duplicate-toggle]");
 63604 |     if (duplicateToggle && els.actionLocationBoard.contains(duplicateToggle) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63605 |       event.preventDefault();
 63606 |       const currentlyEnabled = duplicateToggle.dataset.v2DuplicateEnabled !== "false";
 63607 |       v2SetRouteDuplicatePreference({
 63608 |         playerId: activePlayer().id,
 63609 |         routeNumber: Number(duplicateToggle.dataset.v2RouteNumber || 0),
 63610 |         residentId: duplicateToggle.dataset.v2DuplicateToggle || "",
 63611 |         enabled: !currentlyEnabled
 63612 |       });
 63613 |       return;
 63614 |     }
 63615 |     const routeButton = event.target.closest("[data-v2-route-select]");
 63616 |     if (routeButton && els.actionLocationBoard.contains(routeButton)) {
```


### activeActionPhaseVersion() !== ACTION_PHASE_VERSION_V2

Occurrences: 6

#### Hit 1 — line 63412

```text
 63400 |     const makeCurrentButton = event.target.closest("[data-site-make-current]");
 63401 |     if (makeCurrentButton) {
 63402 |       makeCurrentSiteGame(makeCurrentButton.dataset.siteMakeCurrent);
 63403 |     }
 63404 |   });
 63405 |   els.sitePatchList?.addEventListener("click", (event) => {
 63406 |     const patchButton = event.target.closest("[data-site-apply-patch]");
 63407 |     if (!patchButton) return;
 63408 |     applyRulesetPatchToGame(patchButton.dataset.sitePatchGame, patchButton.dataset.siteApplyPatch);
 63409 |   });
 63410 |   els.cancelActionVisit.addEventListener("click", clearSelectedActionLocation);
 63411 |   els.actionLocationBoard.addEventListener("mouseover", (event) => {
 63412 |     if (activeActionPhaseVersion() !== ACTION_PHASE_VERSION_V2) return;
 63413 |     const routeButton = event.target.closest("[data-v2-route-preview-target]");
 63414 |     if (!routeButton || !els.actionLocationBoard.contains(routeButton) || routeButton.disabled) return;
 63415 |     if (routeButton.contains(event.relatedTarget)) return;
 63416 |     setV2RouteBrowserPreview(routeButton.dataset.v2RoutePreviewTarget);
 63417 |   });
 63418 |   els.actionLocationBoard.addEventListener("mouseout", (event) => {
 63419 |     if (activeActionPhaseVersion() !== ACTION_PHASE_VERSION_V2) return;
 63420 |     const routeButton = event.target.closest("[data-v2-route-preview-target]");
 63421 |     if (!routeButton || !els.actionLocationBoard.contains(routeButton) || routeButton.disabled) return;
 63422 |     if (routeButton.contains(event.relatedTarget)) return;
 63423 |     const browser = routeButton.closest("[data-v2-route-browser]");
 63424 |     if (!browser) return;
```


#### Hit 2 — line 63419

```text
 63407 |     if (!patchButton) return;
 63408 |     applyRulesetPatchToGame(patchButton.dataset.sitePatchGame, patchButton.dataset.siteApplyPatch);
 63409 |   });
 63410 |   els.cancelActionVisit.addEventListener("click", clearSelectedActionLocation);
 63411 |   els.actionLocationBoard.addEventListener("mouseover", (event) => {
 63412 |     if (activeActionPhaseVersion() !== ACTION_PHASE_VERSION_V2) return;
 63413 |     const routeButton = event.target.closest("[data-v2-route-preview-target]");
 63414 |     if (!routeButton || !els.actionLocationBoard.contains(routeButton) || routeButton.disabled) return;
 63415 |     if (routeButton.contains(event.relatedTarget)) return;
 63416 |     setV2RouteBrowserPreview(routeButton.dataset.v2RoutePreviewTarget);
 63417 |   });
 63418 |   els.actionLocationBoard.addEventListener("mouseout", (event) => {
 63419 |     if (activeActionPhaseVersion() !== ACTION_PHASE_VERSION_V2) return;
 63420 |     const routeButton = event.target.closest("[data-v2-route-preview-target]");
 63421 |     if (!routeButton || !els.actionLocationBoard.contains(routeButton) || routeButton.disabled) return;
 63422 |     if (routeButton.contains(event.relatedTarget)) return;
 63423 |     const browser = routeButton.closest("[data-v2-route-browser]");
 63424 |     if (!browser) return;
 63425 |     const routeNumber = String(Number(routeButton.dataset.v2RoutePreviewTarget || 0));
 63426 |     const pinned = String(Number(browser.dataset.v2RouteBrowserPinned || 0));
 63427 |     if (routeNumber !== pinned && String(Number(browser.dataset.v2RouteBrowserPreview || 0)) === routeNumber) {
 63428 |       resetV2RouteBrowserPreview();
 63429 |     }
 63430 |   });
 63431 |   els.actionLocationBoard.addEventListener("focusin", (event) => {
```


#### Hit 3 — line 63432

```text
 63420 |     const routeButton = event.target.closest("[data-v2-route-preview-target]");
 63421 |     if (!routeButton || !els.actionLocationBoard.contains(routeButton) || routeButton.disabled) return;
 63422 |     if (routeButton.contains(event.relatedTarget)) return;
 63423 |     const browser = routeButton.closest("[data-v2-route-browser]");
 63424 |     if (!browser) return;
 63425 |     const routeNumber = String(Number(routeButton.dataset.v2RoutePreviewTarget || 0));
 63426 |     const pinned = String(Number(browser.dataset.v2RouteBrowserPinned || 0));
 63427 |     if (routeNumber !== pinned && String(Number(browser.dataset.v2RouteBrowserPreview || 0)) === routeNumber) {
 63428 |       resetV2RouteBrowserPreview();
 63429 |     }
 63430 |   });
 63431 |   els.actionLocationBoard.addEventListener("focusin", (event) => {
 63432 |     if (activeActionPhaseVersion() !== ACTION_PHASE_VERSION_V2) return;
 63433 |     const routeButton = event.target.closest("[data-v2-route-preview-target]");
 63434 |     if (!routeButton || !els.actionLocationBoard.contains(routeButton) || routeButton.disabled) return;
 63435 |     setV2RouteBrowserPreview(routeButton.dataset.v2RoutePreviewTarget);
 63436 |   });
 63437 |   els.actionLocationBoard.addEventListener("mouseleave", () => {
 63438 |     if (activeActionPhaseVersion() !== ACTION_PHASE_VERSION_V2) return;
 63439 |     resetV2RouteBrowserPreview();
 63440 |   });
 63441 |   els.actionLocationBoard.addEventListener("keydown", (event) => {
 63442 |     if (activeActionPhaseVersion() !== ACTION_PHASE_VERSION_V2) return;
 63443 |     const browser = event.target.closest("[data-v2-route-browser]");
 63444 |     if (!browser || !els.actionLocationBoard.contains(browser)) return;
```


#### Hit 4 — line 63438

```text
 63426 |     const pinned = String(Number(browser.dataset.v2RouteBrowserPinned || 0));
 63427 |     if (routeNumber !== pinned && String(Number(browser.dataset.v2RouteBrowserPreview || 0)) === routeNumber) {
 63428 |       resetV2RouteBrowserPreview();
 63429 |     }
 63430 |   });
 63431 |   els.actionLocationBoard.addEventListener("focusin", (event) => {
 63432 |     if (activeActionPhaseVersion() !== ACTION_PHASE_VERSION_V2) return;
 63433 |     const routeButton = event.target.closest("[data-v2-route-preview-target]");
 63434 |     if (!routeButton || !els.actionLocationBoard.contains(routeButton) || routeButton.disabled) return;
 63435 |     setV2RouteBrowserPreview(routeButton.dataset.v2RoutePreviewTarget);
 63436 |   });
 63437 |   els.actionLocationBoard.addEventListener("mouseleave", () => {
 63438 |     if (activeActionPhaseVersion() !== ACTION_PHASE_VERSION_V2) return;
 63439 |     resetV2RouteBrowserPreview();
 63440 |   });
 63441 |   els.actionLocationBoard.addEventListener("keydown", (event) => {
 63442 |     if (activeActionPhaseVersion() !== ACTION_PHASE_VERSION_V2) return;
 63443 |     const browser = event.target.closest("[data-v2-route-browser]");
 63444 |     if (!browser || !els.actionLocationBoard.contains(browser)) return;
 63445 |     const routeButton = event.target.closest("[data-v2-route-select]");
 63446 |     if (event.key === "Escape") {
 63447 |       const workspace = v2RouteWorkspaceState();
 63448 |       if (workspace.screen === "route-detail" && workspace.activeOpportunityId) return;
 63449 |       event.preventDefault();
 63450 |       clearSelectedActionLocation();
```


#### Hit 5 — line 63442

```text
 63430 |   });
 63431 |   els.actionLocationBoard.addEventListener("focusin", (event) => {
 63432 |     if (activeActionPhaseVersion() !== ACTION_PHASE_VERSION_V2) return;
 63433 |     const routeButton = event.target.closest("[data-v2-route-preview-target]");
 63434 |     if (!routeButton || !els.actionLocationBoard.contains(routeButton) || routeButton.disabled) return;
 63435 |     setV2RouteBrowserPreview(routeButton.dataset.v2RoutePreviewTarget);
 63436 |   });
 63437 |   els.actionLocationBoard.addEventListener("mouseleave", () => {
 63438 |     if (activeActionPhaseVersion() !== ACTION_PHASE_VERSION_V2) return;
 63439 |     resetV2RouteBrowserPreview();
 63440 |   });
 63441 |   els.actionLocationBoard.addEventListener("keydown", (event) => {
 63442 |     if (activeActionPhaseVersion() !== ACTION_PHASE_VERSION_V2) return;
 63443 |     const browser = event.target.closest("[data-v2-route-browser]");
 63444 |     if (!browser || !els.actionLocationBoard.contains(browser)) return;
 63445 |     const routeButton = event.target.closest("[data-v2-route-select]");
 63446 |     if (event.key === "Escape") {
 63447 |       const workspace = v2RouteWorkspaceState();
 63448 |       if (workspace.screen === "route-detail" && workspace.activeOpportunityId) return;
 63449 |       event.preventDefault();
 63450 |       clearSelectedActionLocation();
 63451 |       return;
 63452 |     }
 63453 |     if (!routeButton) return;
 63454 |     if (event.key === "ArrowDown" || event.key === "ArrowRight") {
```


#### Hit 6 — line 63483

```text
 63471 |   });
 63472 |   els.actionTurnRail?.addEventListener("click", (event) => {
 63473 |     const playerButton = event.target.closest("[data-action-player-id]");
 63474 |     if (!playerButton || !hostTestingOverrideEnabled()) return;
 63475 |     const playerId = playerButton.dataset.actionPlayerId || "";
 63476 |     if (!switchActivePlayer(playerId, { testingOverride: true })) return;
 63477 |     setTestingToolsState({ controlledPlayerId: playerId });
 63478 |     saveState({ immediate: true });
 63479 |     render();
 63480 |   });
 63481 |   els.actionLocationBoard.addEventListener("pointerdown", (event) => {
 63482 |     const handle = event.target.closest("[data-v2-route-effects-drag-handle]");
 63483 |     if (!handle || !els.actionLocationBoard.contains(handle) || activeActionPhaseVersion() !== ACTION_PHASE_VERSION_V2) return;
 63484 |     startV2RouteEffectsDrag(event);
 63485 |   });
 63486 |   els.actionLocationBoard.addEventListener("click", (event) => {
 63487 |     const routeEnterButton = event.target.closest("[data-v2-route-enter]");
 63488 |     if (routeEnterButton && els.actionLocationBoard.contains(routeEnterButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63489 |       event.preventDefault();
 63490 |       const workspace = v2RouteWorkspaceState();
 63491 |       workspace.screen = "route-list";
 63492 |       workspace.selectedActionId = "encounter";
 63493 |       workspace.selectedRouteNumber = workspace.selectedRouteNumber || 1;
 63494 |       saveState();
 63495 |       render();
```



## app.js — candidate function inventory

| Function | Lines | Chars | Whole-file name refs |
|---|---:|---:|---:|
| `themeToHeaderTheme` | 1034-1052 | 955 | 2 |
| `createDefaultRuleset` | 2413-2440 | 877 | 4 |
| `createCleanInitialState` | 2473-2634 | 5156 | 4 |
| `tokenUseRollbackSnapshot` | 3815-3849 | 2434 | 12 |
| `buildCausalTokenEffectUndo` | 4355-4423 | 5696 | 7 |
| `restoreCausalTokenEffectUndoData` | 4509-4588 | 5448 | 2 |
| `normalizeEncounterEntryId` | 6063-6068 | 226 | 2 |
| `encounterEntry` | 6070-6087 | 716 | 4 |
| `makeEncounterWheel` | 6089-6105 | 503 | 11 |
| `buildRivalSagaPokemonTierMap` | 16951-23884 | 319617 | 2 |
| `getHiddenGrottoTierCap` | 17736-17741 | 291 | 7 |
| `privatePrepAccessForPlayer` | 20016-20039 | 1190 | 11 |
| `requirePrivatePrepAccess` | 20041-20046 | 263 | 47 |
| `setPrivateSurfaceControlsDisabled` | 20067-20074 | 368 | 3 |
| `normalizeState` | 22101-22609 | 28997 | 18 |
| `escapeHtml` | 22619-29422 | 331361 | 1145 |
| `createPokemonResultTimingWindow` | 23406-23435 | 1351 | 3 |
| `liveResultSessionForActivity` | 25765-25771 | 425 | 8 |
| `handleLiveTableAcceptResult` | 26986-26996 | 578 | 3 |
| `handleLiveTableRerollResult` | 26998-27007 | 412 | 2 |
| `recordEncounterTokenUse` | 27863-27890 | 1256 | 2 |
| `liveRefereeSituationPercent` | 30691-30696 | 420 | 3 |
| `applyLiveRefereePresentation` | 30698-30713 | 1565 | 5 |
| `resetLiveRefereeLayout` | 30784-30807 | 1129 | 2 |
| `renderLiveRefereePanel` | 32147-32253 | 6049 | 8 |
| `setLiveRefereePreference` | 32459-32476 | 1222 | 3 |
| `normalizePokemonApiName` | 33236-52708 | 924167 | 20 |
| `ensureActionPhaseGymState` | 34656-34748 | 5310 | 17 |
| `linkedActionOperationSession` | 34894-34910 | 714 | 3 |
| `closeWheelPanel` | 35814-35818 | 100 | 5 |
| `normalizeBuffMoveName` | 37564-38913 | 69034 | 2 |
| `renderHiddenGrottoDetails` | 39400-39495 | 5871 | 1 |
| `startHiddenGrottoSession` | 40154-40154 | 59 | 1 |
| `chooseHiddenGrottoType` | 40294-40325 | 1774 | 1 |
| `chooseHiddenGrottoPokemon` | 40327-40367 | 2575 | 1 |
| `availablePokemonForGameCornerTier` | 41490-41508 | 841 | 3 |
| `groupedRandomPokemonPool` | 41515-41530 | 509 | 3 |
| `getHiddenGrottoEligiblePokemonByType` | 41605-41622 | 787 | 1 |
| `isHiddenGrottoEncounterEligible` | 41624-41632 | 425 | 2 |
| `hiddenGrottoLowTierNfeCutoffIndex` | 41636-41638 | 83 | 2 |
| `hiddenGrottoEntryHasNoEvolutionNote` | 41640-41640 | 55 | 2 |
| `hiddenGrottoFinalEvolutionSpeciesIds` | 41651-41662 | 617 | 2 |
| `hiddenGrottoSpeciesForEntry` | 41664-41664 | 47 | 2 |
| `isHiddenGrottoFullyEvolvedEntry` | 41687-41687 | 51 | 2 |
| `hiddenGrottoExcludesLowTierNfe` | 41696-41696 | 50 | 2 |
| `getHiddenGrottoPool` | 41703-41727 | 1193 | 8 |
| `hiddenGrottoAvailableTypes` | 41729-41731 | 156 | 3 |
| `encounterWheelKey` | 41741-41743 | 144 | 2 |
| `encounterWheelDefinition` | 41745-41747 | 153 | 9 |
| `pendingEncounterSessions` | 41749-41752 | 175 | 6 |
| `selectedEncounterSession` | 41754-41763 | 326 | 9 |
| `encounterEntriesForSession` | 41765-41783 | 1068 | 7 |
| `buildEncounterWheelSegments` | 41802-41818 | 577 | 2 |
| `resolveEncounterSpecialResult` | 41871-41894 | 878 | 3 |
| `pendingRandomPokemonSessions` | 41956-41959 | 169 | 7 |
| `pendingRerollTargets` | 41961-42000 | 1774 | 2 |
| `rerollRandomPokemonResult` | 42040-42040 | 91 | 2 |
| `selectedRandomPokemonSession` | 42057-42066 | 342 | 2 |
| `createRandomPokemonSession` | 42068-42068 | 143 | 2 |
| `createEncounterPokemonResultSession` | 42121-42121 | 93 | 1 |
| `augmentHoneyCausalUndoAfterAcquisition` | 42172-42185 | 830 | 2 |
| `encounterSessionReadyForAutomaticCompletion` | 42199-42204 | 298 | 3 |
| `completeObtainedEncounterSession` | 42206-42217 | 650 | 3 |
| `useGameCornerToken` | 42390-42424 | 1283 | 3 |
| `confirmRandomPokemonSession` | 42426-42426 | 121 | 6 |
| `rerollRandomPokemonSession` | 42558-42558 | 104 | 6 |
| `cancelRandomPokemonSession` | 42725-42736 | 642 | 4 |
| `updateEncounterActionLog` | 42738-42772 | 1796 | 7 |
| `activeEncounterSessionForPlayer` | 42774-42779 | 315 | 2 |
| `startEncounterSession` | 42781-42781 | 59 | 2 |
| `renderGameCornerTicketResultPanel` | 43201-43245 | 2853 | 2 |
| `getRouteViewForPlayer` | 45222-45241 | 1269 | 4 |
| `v2PurchaseExtraEncounter` | 45491-45491 | 56 | 2 |
| `v2UseExtraEncounter` | 45546-45546 | 82 | 2 |
| `purchaseV2ExtraEncounter` | 46226-46233 | 213 | 2 |
| `useV2ExtraEncounter` | 46235-46251 | 941 | 2 |
| `getRouteEncounterRailCapabilitiesForPlayer` | 46445-46494 | 2549 | 2 |
| `renderRandomPokemonPanel` | 46880-46941 | 4339 | 12 |
| `completeEncounterRoll` | 46943-46997 | 2481 | 3 |
| `spinEncounterWheel` | 46999-47041 | 1981 | 2 |
| `closeEncounterSession` | 47043-47043 | 105 | 3 |
| `renderEncounterOverlay` | 47070-47215 | 10672 | 14 |
| `renderWheelPanel` | 47217-47374 | 9651 | 8 |
| `prepareTokenSandboxCommitState` | 48523-48569 | 1803 | 2 |
| `render` | 50005-50153 | 7565 | 279 |
| `applyShopTheme` | 50155-50222 | 5445 | 2 |
| `applyTheme` | 50224-50278 | 3907 | 2 |
| `contrastSurfaceTokens` | 50302-50310 | 308 | 2 |
| `applyHeaderTheme` | 50312-50342 | 2631 | 2 |
| `renderThemeChoices` | 50344-50364 | 871 | 3 |
| `honeyEligibleEncounterResults` | 50560-50568 | 607 | 2 |
| `ensureHoneyEndOfActionProcedures` | 50570-50604 | 1907 | 2 |
| `liveRefereeHoneyProcedureScreenMarkup` | 50612-50627 | 1160 | 2 |
| `resolveHoneyEndOfActionProcedure` | 50642-50704 | 2989 | 2 |
| `openAvatarCropper` | 51043-51072 | 821 | 2 |
| `renderTeambuilder` | 52843-52966 | 7086 | 2 |
| `applyActivationOverlay` | 58050-58129 | 3903 | 2 |
| `renderShop` | 59624-59728 | 5517 | 7 |
| `availablePokemonForBattleTier` | 60147-60152 | 278 | 3 |
| `renderCart` | 60732-60808 | 3343 | 3 |
| `reverseGameCornerSessionForActionVisit` | 61113-61193 | 4511 | 2 |
| `undoEncounterActionVisit` | 61202-61264 | 4526 | 3 |
| `restoreTokenEffectContractUndoData` | 61266-61304 | 3983 | 6 |
| `undoLogEntry` | 61314-61642 | 22498 | 3 |
| `bindEvents` | 61904-64249 | 105787 | 2 |

### Function themeToHeaderTheme — lines 1034-1052

```javascript
function themeToHeaderTheme(theme) {
  return {
    name: theme.name,
    colors: {
      headerBg: theme.colors.headerBg || theme.colors.surface,
      headerSubBg: theme.colors.headerSubBg || theme.colors.surface2 || theme.colors.surface,
      headerInk: theme.colors.headerInk || theme.colors.ink,
      headerMuted: theme.colors.headerMuted || theme.colors.muted,
      headerLine: theme.colors.headerLine || theme.colors.line,
      headerAccent: theme.colors.headerAccent || theme.colors.brand,
      headerChipBg: theme.colors.headerChipBg || theme.colors.surface,
      headerChipInk: theme.colors.headerChipInk || theme.colors.ink,
      headerChipLine: theme.colors.headerChipLine || theme.colors.line,
      headerControlBg: theme.colors.headerControlBg || theme.colors.surface,
      headerControlInk: theme.colors.headerControlInk || theme.colors.ink,
      headerControlLine: theme.colors.headerControlLine || theme.colors.line
    }
  };
}
```

### Function createDefaultRuleset — lines 2413-2440

```javascript
function createDefaultRuleset() {
  return {
    id: "rival-saga-s3-dev",
    name: "Rival Saga S3 Development Ruleset",
    version: CURRENT_RULESET_VERSION,
    schemaVersion: 1,
    actionPhaseVersion: DEFAULT_ACTION_PHASE_VERSION,
    supportedActionPhaseVersions: [ACTION_PHASE_VERSION_V2],
    updateMode: "manual",
    contentLibraries: {
      tokenArt: {},
      tokenCatalog: []
    },
    editors: {
      tokenArt: "active",
      tokenDefinitions: "planned",
      pokemonIndex: "planned",
      trainerClasses: "planned",
      perks: "planned",
      encounterWheels: "planned"
    },
    notes: [
      "Ruleset/content data is separate from one game's current save state.",
      "The current Action Phase is the only playable Rival Saga ruleset.",
      "Historical Action Phase implementations live in Git archives, not production runtime code."
    ]
  };
}
```

### Function createCleanInitialState — lines 2473-2634

```javascript
function createCleanInitialState() {
  return {
    ruleset: createDefaultRuleset(),
    activePlayerId: "steevee",
    activePage: "playerHub",
    liveTable: {
      enabled: true,
      viewMode: "host",
      gameflowMode: "individual",
      currentLiveStep: "",
      currentPromptTitle: "",
      currentPromptBody: "",
      currentActorPlayerId: "",
      requiredPlayerIds: [],
      waitingOnPlayerIds: [],
      passedPlayerIds: [],
      respondedPlayerIds: [],
      currentPendingEventId: "",
      currentBatchId: "",
      responsesAllowed: false,
      transactionsAllowed: false,
      canAdvance: false,
      lastResolvedEventId: "",
      resolutionAnnouncements: []
    },
    activityLogCollapsed: true,
    activityResponseDrawerOpen: false,
    testingTools: {
      ignoreTurnOrder: false,
      freeMode: false,
      controlledPlayerId: "",
      activeScenario: null
    },
    liveRefereeCollapsed: true,
    liveRefereeX: "",
    liveRefereeY: "",
    liveRefereeWidth: "",
    liveRefereeHeight: "",
    liveRefereeWindowMode: "floating",
    liveRefereeDockSide: "right",
    liveRefereePaneSplit: "",
    liveRefereeLayoutPreference: "auto",
    liveRefereeDensityPreference: "comfortable",
    liveRefereeUiScale: 1,
    liveRefereeMotionPreference: "full",
    liveRefereeScreen: "play",
    liveRefereeSelectedEffectName: "",
    liveRefereeEffectDraft: null,
    activityToasts: [],
    activeShop: "items",
    tokenShopCategoryFilter: "all",
    shopSort: { mode: "price", direction: "asc" },
    shopExpandedChoiceGroups: {},
    itemShopFilters: { group: "all", roles: [], tags: [], canAfford: false, expanded: false },
    itemShopFolderPath: [],
    activeView: "sheet",
    activeLogFilter: "all",
    wheelSessions: [],
    playerNotifications: [],
    interactionEvents: [],
    transactions: [],
    effectAuditRecords: [],
    effectOperations: [],
    delayedEffects: [],
    broughtTeamSnapshots: [],
    copiedActivations: [],
    postPayoutProcedures: [],
    endOfActionProcedures: [],
    copiedTokenRelationships: [],
    privateEffectRecords: [],
    encounterCopyRecords: [],
    chronologyCounter: 0,
    perkSystem: {
      pendingRolls: [],
      highestThresholdAwardedByPlayerId: {},
      assignments: [],
      aTierSafetyTriggered: false,
      aTierSafetyTriggeringPlayerId: "",
      aTierSafetyEligiblePlayerIds: [],
      aTierSafetyCompletedPlayerIds: [],
      adminWarnings: []
    },
    infoBattleTierRoller: {
      tierId: "",
      result: null
    },
    selectedWheelSessionId: "",
    wheelDrawerOpen: false,
    skipWheelAnimation: false,
    encounterSessions: [],
    selectedEncounterSessionId: "",
    encounterModalOpen: false,
    randomPokemonSessions: [],
    pokemonFamilyTierCache: {},
    pokemonSpriteVariants: {},
    tokenArtLibrary: {},
    selectedRandomPokemonSessionId: "",
    randomPokemonDrawerOpen: false,
    routeUiState: createDefaultRouteUiState(),
    spriteAliases: {},
    pokemonTierOverrides: {},
    seriesOrder: [],
    seriesChoiceRequired: true,
    activityLogFilters: {
      search: "",
      playerId: "all",
      phase: "all",
      category: "all",
      series: "all",
      gym: "all",
      undo: "all",
      pokemonSubtype: "all",
      sort: "newest"
    },
    shopCart: { playerId: "", items: [], open: false },
    opponentDrawer: { open: false, playerId: "", tab: "overview", search: "", type: "active", intelTag: "biggest-threat" },
    playerIntel: { globalNotes: "", players: {} },
    playerIntelByProfileId: {},
    teambuilder: { activeBuildByPlayerId: {}, buildsByPlayerId: {}, selectedSlotByPlayerId: {}, inspectorByPlayerId: {}, selectedPlayerId: "", selectedBuildId: "" },
    mvpFilters: { search: "", trainer: "all", series: "all", gym: "all", status: "all", sort: "score" },
    mvpBattleView: { series: "Kanto", gym: 1, pokemonId: "" },
    pokemonIndexFilters: { search: "", status: [], tier: [], balanceTier: [], type: [], owned: [], form: [] },
    pokemonSectionCollapsed: { active: false, legacy: false, released: false },
    globalPokemonRules: {},
    banlistHistory: [],
    pendingBattle: { player1Id: "", player2Id: "" },
    battleLogView: { series: "Kanto", gym: 1 },
    battleTeams: {},
    battleRevealGrants: [],
    phaseState: {},
    currentPhase: "start",
    shopLevelTimingVersion: SHOP_LEVEL_TIMING_VERSION,
    actionPhaseState: { selections: {}, seriesTrackers: {} },
    gymResults: [],
    seriesChampions: {},
    gameCornerSessions: [],
    gameCornerUnlocks: [],
    breederDeposits: [],
    dragonsDenSessions: [],
    hiddenGrottoSessions: [],
    silphCoSessions: [],
    bulletinBoardSessions: [],
    graveyardSessions: [],
    departmentStoreVisits: [],
    graveyardTokenOwnerFilter: "",
    pcSessions: [],
    rangerBaseSessions: [],
    pokemonCenterSessions: [],
    lingeringStatuses: [],
    tokenActivations: [],
    tokenConsumptions: [],
    moneyLedger: [],
    series: "Kanto",
    gym: 1,
    players: cleanPlayerTemplates.map(createCleanPlayer),
    pokemonRecords: [],
    pokemonLog: [],
    battleRecords: [],
    battleSchedules: {},
    log: []
  };
}
```

### Function tokenUseRollbackSnapshot — lines 3815-3849

```javascript
function tokenUseRollbackSnapshot() {
  return {
    previousPlayers: structuredClone(state.players || []),
    previousPokemonRecords: structuredClone(state.pokemonRecords || []),
    previousPokemonLog: structuredClone(state.pokemonLog || []),
    previousLingeringStatuses: structuredClone(state.lingeringStatuses || []),
    previousTokenActivations: structuredClone(state.tokenActivations || []),
    previousTokenConsumptions: structuredClone(state.tokenConsumptions || []),
    previousPlayerNotifications: structuredClone(state.playerNotifications || []),
    previousWheelSessions: structuredClone(state.wheelSessions || []),
    previousEncounterSessions: structuredClone(state.encounterSessions || []),
    previousRandomPokemonSessions: structuredClone(state.randomPokemonSessions || []),
    previousSelectedEncounterSessionId: state.selectedEncounterSessionId || "",
    previousEncounterModalOpen: Boolean(state.encounterModalOpen),
    previousInteractionEvents: structuredClone(state.interactionEvents || []),
    previousTransactions: structuredClone(state.transactions || []),
    previousGlobalPokemonRules: structuredClone(state.globalPokemonRules || {}),
    previousBanlistHistory: structuredClone(state.banlistHistory || []),
    previousTeambuilder: structuredClone(state.teambuilder || {}),
    previousBattleTeams: structuredClone(state.battleTeams || {}),
    previousPerkSystem: structuredClone(state.perkSystem || {}),
    previousClassStateByPlayerId: structuredClone(state.classStateByPlayerId || {}),
    previousPhaseState: structuredClone(state.phaseState || {}),
    previousEffectAuditRecords: structuredClone(state.effectAuditRecords || []),
    previousEffectOperations: structuredClone(state.effectOperations || []),
    previousDelayedEffects: structuredClone(state.delayedEffects || []),
    previousBroughtTeamSnapshots: structuredClone(state.broughtTeamSnapshots || []),
    previousCopiedActivations: structuredClone(state.copiedActivations || []),
    previousPostPayoutProcedures: structuredClone(state.postPayoutProcedures || []),
    previousEndOfActionProcedures: structuredClone(state.endOfActionProcedures || []),
    previousCopiedTokenRelationships: structuredClone(state.copiedTokenRelationships || []),
    previousPrivateEffectRecords: structuredClone(state.privateEffectRecords || []),
    previousEncounterCopyRecords: structuredClone(state.encounterCopyRecords || [])
  };
}
```

### Function buildCausalTokenEffectUndo — lines 4355-4423

```javascript
function buildCausalTokenEffectUndo(snapshot, activity, metadata) {
  const previousPokemonById = new Map((snapshot.previousPokemonRecords || []).map((pokemon) => [pokemon.id, pokemon]));
  const pokemonDeltas = (state.pokemonRecords || []).map((pokemon) => {
    const previous = previousPokemonById.get(pokemon.id);
    if (!previous) return null;
    const effectBuffs = causalIdCollectionDelta(previous.effectBuffs || [], pokemon.effectBuffs || []);
    const logs = causalIdCollectionDelta(previous.log || [], pokemon.log || []);
    const beforeLabels = new Set(previous.buffs || []);
    const afterLabels = new Set(pokemon.buffs || []);
    const labelsAdded = [...afterLabels].filter((label) => !beforeLabels.has(label));
    const labelsRemoved = [...beforeLabels].filter((label) => !afterLabels.has(label));
    if (!effectBuffs.createdIds.length && !effectBuffs.previousRecords.length && !logs.createdIds.length
      && !logs.previousRecords.length && !labelsAdded.length && !labelsRemoved.length) return null;
    return { pokemonId: pokemon.id, effectBuffs, logs, labelsAdded, labelsRemoved, previousLabelOrder: structuredClone(previous.buffs || []) };
  }).filter(Boolean);
  const previousRules = snapshot.previousGlobalPokemonRules || {};
  const currentRules = state.globalPokemonRules || {};
  const ruleDeltas = [...new Set([...Object.keys(previousRules), ...Object.keys(currentRules)])]
    .filter((key) => JSON.stringify(previousRules[key]) !== JSON.stringify(currentRules[key]))
    .map((key) => ({ key, existed: Object.prototype.hasOwnProperty.call(previousRules, key), previous: structuredClone(previousRules[key] || null) }));
  const currentPlayersById = new Map((state.players || []).map((player) => [player.id, player]));
  const playerBalanceDeltas = (snapshot.previousPlayers || []).map((player) => ({
    playerId: player.id,
    amount: Number(currentPlayersById.get(player.id)?.balance || 0) - Number(player.balance || 0)
  })).filter((entry) => entry.amount !== 0);
  const currentPokemonIdsByPlayer = new Map((state.players || []).map((player) => [player.id, player.pokemonIds || []]));
  const playerPokemonIdDeltas = (snapshot.previousPlayers || []).map((player) => ({
    playerId: player.id,
    delta: causalScalarSetDelta(player.pokemonIds || [], currentPokemonIdsByPlayer.get(player.id) || [])
  })).filter((entry) => entry.delta.added.length || entry.delta.removed.length);
  return {
    actionType: "undoTokenEffectContractCausal",
    causalUndoVersion: 1,
    effectId: activity.id,
    tokenDefinitionId: metadata.id,
    inventoryByPlayer: causalPlayerCollectionDeltas(snapshot.previousPlayers, state.players, "inventory"),
    playerBalanceDeltas,
    moveGrantsByPlayer: causalPlayerCollectionDeltas(snapshot.previousPlayers, state.players, "moveAccessGrants"),
    playerPokemonIdDeltas,
    pokemonRecords: causalIdCollectionDelta(snapshot.previousPokemonRecords, state.pokemonRecords),
    statuses: causalIdCollectionDelta(snapshot.previousLingeringStatuses, state.lingeringStatuses),
    activations: causalIdCollectionDelta(snapshot.previousTokenActivations, state.tokenActivations),
    consumptions: causalIdCollectionDelta(snapshot.previousTokenConsumptions, state.tokenConsumptions),
    transactions: causalIdCollectionDelta(snapshot.previousTransactions, state.transactions),
    notifications: causalIdCollectionDelta(snapshot.previousPlayerNotifications, state.playerNotifications),
    effectOperations: causalIdCollectionDelta(snapshot.previousEffectOperations, state.effectOperations),
    copiedActivations: causalIdCollectionDelta(snapshot.previousCopiedActivations, state.copiedActivations),
    copiedTokenRelationships: causalIdCollectionDelta(snapshot.previousCopiedTokenRelationships, state.copiedTokenRelationships),
    wheelSessions: causalIdCollectionDelta(snapshot.previousWheelSessions, state.wheelSessions),
    encounterSessions: causalIdCollectionDelta(snapshot.previousEncounterSessions, state.encounterSessions),
    randomPokemonSessions: causalIdCollectionDelta(snapshot.previousRandomPokemonSessions, state.randomPokemonSessions),
    delayedEffects: causalIdCollectionDelta(snapshot.previousDelayedEffects, state.delayedEffects),
    broughtTeamSnapshots: causalIdCollectionDelta(snapshot.previousBroughtTeamSnapshots, state.broughtTeamSnapshots),
    postPayoutProcedures: causalIdCollectionDelta(snapshot.previousPostPayoutProcedures, state.postPayoutProcedures),
    encounterCopyRecords: causalIdCollectionDelta(snapshot.previousEncounterCopyRecords, state.encounterCopyRecords),
    teambuilderFields: causalTopLevelFieldDelta(snapshot.previousTeambuilder || {}, state.teambuilder || {}, ["moveAccessGrantsByPlayerId"]),
    battleTeamFields: causalTopLevelFieldDelta(snapshot.previousBattleTeams || {}, state.battleTeams || {}),
    pokemonDeltas,
    pokemonLog: causalIdCollectionDelta(snapshot.previousPokemonLog || [], state.pokemonLog || []),
    teambuilderMoveGrants: causalGrantMapDeltas(snapshot.previousTeambuilder?.moveAccessGrantsByPlayerId, state.teambuilder?.moveAccessGrantsByPlayerId),
    perkMoveGrants: causalGrantMapDeltas(snapshot.previousPerkSystem?.moveAccessGrantsByPlayerId, state.perkSystem?.moveAccessGrantsByPlayerId),
    classMoveGrants: causalGrantMapDeltas(
      Object.fromEntries(Object.entries(snapshot.previousClassStateByPlayerId || {}).map(([id, value]) => [id, value?.moveAccessGrants || []])),
      Object.fromEntries(Object.entries(state.classStateByPlayerId || {}).map(([id, value]) => [id, value?.moveAccessGrants || []]))
    ),
    ruleDeltas,
    banlistHistory: causalIdCollectionDelta(snapshot.previousBanlistHistory, state.banlistHistory)
  };
}
```

### Function restoreCausalTokenEffectUndoData — lines 4509-4588

```javascript
function restoreCausalTokenEffectUndoData(undoData) {
  (undoData.inventoryByPlayer || []).forEach(({ playerId, delta }) => {
    const player = state.players.find((entry) => entry.id === playerId);
    if (player) player.inventory = applyCausalIdCollectionUndo(player.inventory, delta);
  });
  (undoData.playerBalanceDeltas || []).forEach(({ playerId, amount }) => {
    const player = state.players.find((entry) => entry.id === playerId);
    if (player) player.balance = Number(player.balance || 0) - Number(amount || 0);
  });
  (undoData.moveGrantsByPlayer || []).forEach(({ playerId, delta }) => {
    const player = state.players.find((entry) => entry.id === playerId);
    if (player) player.moveAccessGrants = applyCausalIdCollectionUndo(player.moveAccessGrants, delta);
  });
  (undoData.playerPokemonIdDeltas || []).forEach(({ playerId, delta }) => {
    const player = state.players.find((entry) => entry.id === playerId);
    if (player) player.pokemonIds = applyCausalScalarSetUndo(player.pokemonIds, delta);
  });
  state.pokemonRecords = applyCausalIdCollectionUndo(state.pokemonRecords, undoData.pokemonRecords);
  state.lingeringStatuses = applyCausalIdCollectionUndo(state.lingeringStatuses, undoData.statuses);
  state.tokenActivations = applyCausalIdCollectionUndo(state.tokenActivations, undoData.activations);
  state.tokenConsumptions = applyCausalIdCollectionUndo(state.tokenConsumptions, undoData.consumptions);
  state.transactions = applyCausalIdCollectionUndo(state.transactions, undoData.transactions);
  state.playerNotifications = applyCausalIdCollectionUndo(state.playerNotifications, undoData.notifications);
  state.effectOperations = applyCausalIdCollectionUndo(state.effectOperations, undoData.effectOperations);
  state.copiedActivations = applyCausalIdCollectionUndo(state.copiedActivations, undoData.copiedActivations);
  state.copiedTokenRelationships = applyCausalIdCollectionUndo(state.copiedTokenRelationships, undoData.copiedTokenRelationships);
  state.wheelSessions = applyCausalIdCollectionUndo(state.wheelSessions, undoData.wheelSessions);
  state.encounterSessions = applyCausalIdCollectionUndo(state.encounterSessions, undoData.encounterSessions);
  state.randomPokemonSessions = applyCausalIdCollectionUndo(state.randomPokemonSessions, undoData.randomPokemonSessions);
  state.delayedEffects = applyCausalIdCollectionUndo(state.delayedEffects, undoData.delayedEffects);
  state.broughtTeamSnapshots = applyCausalIdCollectionUndo(state.broughtTeamSnapshots, undoData.broughtTeamSnapshots);
  state.postPayoutProcedures = applyCausalIdCollectionUndo(state.postPayoutProcedures, undoData.postPayoutProcedures);
  state.encounterCopyRecords = applyCausalIdCollectionUndo(state.encounterCopyRecords, undoData.encounterCopyRecords);
  state.teambuilder ||= {};
  applyCausalTopLevelFieldUndo(state.teambuilder, undoData.teambuilderFields);
  state.battleTeams ||= {};
  applyCausalTopLevelFieldUndo(state.battleTeams, undoData.battleTeamFields);
  (undoData.pokemonDeltas || []).forEach((delta) => {
    const pokemon = state.pokemonRecords.find((entry) => entry.id === delta.pokemonId);
    if (!pokemon) return;
    pokemon.effectBuffs = applyCausalIdCollectionUndo(pokemon.effectBuffs, delta.effectBuffs);
    pokemon.log = applyCausalIdCollectionUndo(pokemon.log, delta.logs);
    const removeLabels = new Set(delta.labelsAdded || []);
    const previousLabels = delta.previousLabelOrder || [];
    const laterLabels = (pokemon.buffs || []).filter((label) => !removeLabels.has(label) && !previousLabels.includes(label));
    pokemon.buffs = [...previousLabels, ...laterLabels];
  });
  state.pokemonLog = applyCausalIdCollectionUndo(state.pokemonLog, undoData.pokemonLog);
  const restoreGrantMap = (root, deltas) => (deltas || []).forEach(({ playerId, delta }) => {
    root[playerId] = applyCausalIdCollectionUndo(root[playerId], delta);
  });
  state.teambuilder.moveAccessGrantsByPlayerId ||= {};
  restoreGrantMap(state.teambuilder.moveAccessGrantsByPlayerId, undoData.teambuilderMoveGrants);
  state.perkSystem ||= {};
  state.perkSystem.moveAccessGrantsByPlayerId ||= {};
  restoreGrantMap(state.perkSystem.moveAccessGrantsByPlayerId, undoData.perkMoveGrants);
  state.classStateByPlayerId ||= {};
  (undoData.classMoveGrants || []).forEach(({ playerId, delta }) => {
    state.classStateByPlayerId[playerId] ||= {};
    state.classStateByPlayerId[playerId].moveAccessGrants = applyCausalIdCollectionUndo(state.classStateByPlayerId[playerId].moveAccessGrants, delta);
  });
  (undoData.ruleDeltas || []).forEach((delta) => {
    if (delta.existed) state.globalPokemonRules[delta.key] = structuredClone(delta.previous);
    else delete state.globalPokemonRules[delta.key];
  });
  state.banlistHistory = applyCausalIdCollectionUndo(state.banlistHistory, undoData.banlistHistory);
  if (undoData.tokenDefinitionId === "honey-token" && undoData.procedureId) {
    const procedure = (state.endOfActionProcedures || []).find((entry) => entry.id === undoData.procedureId);
    if (procedure) {
      procedure.status = "undone";
      procedure.undoneAt = new Date().toISOString();
    }
  }
  if (state.selectedRandomPokemonSessionId && !(state.randomPokemonSessions || []).some((entry) => entry.id === state.selectedRandomPokemonSessionId)) {
    state.selectedRandomPokemonSessionId = "";
    state.randomPokemonDrawerOpen = false;
  }
  syncLinkedTransactions();
  syncPlayerPokemonLists();
}
```

### Function normalizeEncounterEntryId — lines 6063-6068

```javascript
function normalizeEncounterEntryId(name, index = 0) {
  const base = normalizePokemonName(name)
    .replace(/-sf$/i, "")
    .replace(/^hyperspace-hole$/i, "hyperspace-hole");
  return index ? `${base}-${index + 1}` : base;
}
```

### Function encounterEntry — lines 6070-6087

```javascript
function encounterEntry(name, index = 0) {
  const raw = String(name || "").trim();
  const isWater = /\s+SF$/i.test(raw);
  const displayName = raw.replace(/\s+SF$/i, "").trim();
  const id = normalizeEncounterEntryId(displayName, index);
  const isHyperspace = normalizePokemonName(displayName) === "hyperspace-hole";
  return {
    id,
    pokemonName: displayName,
    displayName,
    weight: 1,
    category: isWater ? "fishing" : isHyperspace ? "special" : "land",
    enabledByDefault: !isWater,
    removable: true,
    ...(isWater ? { notes: "Fishing / Surf encounter." } : {}),
    ...(isHyperspace ? { specialWheelId: "hoenn-hyperspace-hole", notes: "Hoenn-only Hyperspace Hole sub-wheel." } : {})
  };
}
```

### Function makeEncounterWheel — lines 6089-6105

```javascript
function makeEncounterWheel(series, gym, names) {
  const seen = new Map();
  return {
    id: `${String(series).toLowerCase()}-gym-${gym}`,
    series,
    gym,
    name: `${series} Gym ${gym} Encounter Wheel`,
    rollsPerAction: 2,
    rerollable: true,
    entries: names.map((name) => {
      const key = normalizePokemonName(String(name).replace(/\s+SF$/i, "").trim());
      const count = seen.get(key) || 0;
      seen.set(key, count + 1);
      return encounterEntry(name, count);
    })
  };
}
```

### Function buildRivalSagaPokemonTierMap — lines 16951-23884

Large function (319617 chars). First/last 35 lines:

```javascript
function buildRivalSagaPokemonTierMap() {
  const entries = {};
  Object.entries(rawRivalSagaPokemonTierList).forEach(([tierId, rawList]) => {
    const prepared = rawList
      .replace(/([A-Za-z0-9.'%-]+)\s+\(([^)]+)\)(?:\[([^\]]+)\])?/g, (_, name, note, bracketNote) => `${name}{note:${[note, bracketNote].filter(Boolean).join(" / ")}}`)
      .replace(/\{[^}]+\}/g, (block) => block.replace(/\s+/g, "_"))
      .replace(/\s+/g, " ")
      .trim();
    prepared.split(" ").filter(Boolean).forEach((token) => {
      const metadata = parseTierEntryToken(token, tierId);
      const key = normalizePokemonName(metadata.displayName) || metadata.displayName.toLowerCase().replace(/\s+/g, "-");
      if (!key) return;
      entries[key] = { ...(entries[key] || {}), ...metadata };
    });
  });
  return Object.freeze(entries);
}

const rivalSagaPokemonTierMap = buildRivalSagaPokemonTierMap();

const gameCornerTokenDefinitions = Object.freeze([
  {
    id: "safari-gc-ticket",
    name: "Safari Ticket",
    tokenType: "game-corner",
    type: "TICKET",
    gameCornerTier: "Safari",
    gameCornerTierId: "safari",
    description: "Ticket used to unlock a Safari Battle Tier Pokémon reward at the Game Corner."
  },
  {
    id: "poke-gc-ticket",
    name: "Poké Ticket",
    tokenType: "game-corner",
    type: "TICKET",
...
      </div>
    </details>
  `;
}

function activityStatusLabel(activity) {
  if (activity?.status === "open") return "Pending";
  if (activity?.status === "expired") return "Passed";
  if (activity?.status === "negated") return "Negated";
  if (activity?.status === "canceled") return "Canceled";
  if (activity?.status === "withdrawn") return "Withdrawn";
  if (activity?.status === "undone") return "Undone";
  return "Resolved";
}

function responseHistoryMarkup(activity) {
  const responses = activity.responses || [];
  if (!responses.length) return `<p class="empty-state compact">No responses recorded yet.</p>`;
  return `
    <div class="timing-record-list">
      ${responses.map((response) => {
        const player = state.players.find((entry) => entry.id === response.playerId);
        const label = activityResponseDefinitions[response.type]?.label || response.type || "Response";
        const promptStep = interactionPromptStepById(activity, interactionResponseAnswerPromptId(activity, response));
        const canceled = interactionResponseCanceled(response);
        return `
          <article>
            <span>${escapeHtml(canceled ? `${label} - Canceled` : label)}</span>
            <strong>${escapeHtml(player?.name || "Table")}</strong>
            ${response.tokenName ? `<em>${escapeHtml(response.tokenName)}</em>` : ""}
            ${promptStep ? `<small>Prompt: ${escapeHtml(liveRefereePromptStepLabel(activity, promptStep, { short: true }))}</small>` : ""}
            ${response.note ? `<p>${escapeHtml(response.note)}</p>` : ""}
          </article>
        `;
      }).join("")}
```

### Function getHiddenGrottoTierCap — lines 17736-17741

```javascript
function getHiddenGrottoTierCap(gymNumber = state.gym) {
  const naturalTier = getNaturalGymTier(gymNumber);
  const naturalTierIndex = getTierIndex(naturalTier);
  if (naturalTierIndex < 0) return naturalTier;
  return getTierNameByIndex(naturalTierIndex + HIDDEN_GROTTO_TIER_STEP_BONUS);
}
```

### Function privatePrepAccessForPlayer — lines 20016-20039

```javascript
function privatePrepAccessForPlayer(player, surfaceLabel = "private prep") {
  const activeProfileId = activeSiteProfileId();
  const ownerProfileId = playerOwnerProfileId(player);
  const access = {
    allowed: currentProfileCanControlPlayer(player),
    enforced: privatePrepControlIsEnforced(),
    surfaceLabel,
    playerName: player?.name || "this trainer",
    ownerLabel: siteUserLabel(ownerProfileId, "No linked profile"),
    activeProfileLabel: activeProfileId ? siteUserLabel(activeProfileId, "Current profile") : "No profile logged in",
    reason: ""
  };
  if (access.allowed) return access;
  if (!access.enforced) {
    access.reason = "This local development game is not linked to site profiles yet.";
  } else if (!activeProfileId) {
    access.reason = `Log into the Site Shell profile linked to ${access.playerName} to use this ${surfaceLabel}.`;
  } else if (!ownerProfileId) {
    access.reason = `${access.playerName} is not linked to a Site Shell profile yet. Link the trainer slot before using private prep.`;
  } else {
    access.reason = `Logged in as ${access.activeProfileLabel}. This ${surfaceLabel} belongs to ${access.ownerLabel}.`;
  }
  return access;
}
```

### Function requirePrivatePrepAccess — lines 20041-20046

```javascript
function requirePrivatePrepAccess(player, surfaceLabel = "private prep") {
  const access = privatePrepAccessForPlayer(player, surfaceLabel);
  if (access.allowed) return true;
  alert(access.reason || `This ${surfaceLabel} is profile locked.`);
  return false;
}
```

### Function setPrivateSurfaceControlsDisabled — lines 20067-20074

```javascript
function setPrivateSurfaceControlsDisabled(root, disabled) {
  const rootElement = typeof root === "string" ? document.querySelector(root) : root;
  if (!rootElement) return;
  rootElement.querySelectorAll("button, input, select, textarea").forEach((control) => {
    if (control.closest(".private-prep-lock")) return;
    control.disabled = Boolean(disabled);
  });
}
```

### Function normalizeState — lines 22101-22609

Large function (28997 chars). First/last 35 lines:

```javascript
function normalizeState(nextState) {
  nextState.players ||= structuredClone(initialState.players);
  const savedTokenArtLibrary = normalizeTokenArtLibrary(
    nextState.ruleset?.contentLibraries?.tokenArt
      || nextState.tokenArtLibrary
      || nextState.tokenImageOverrides
      || {}
  );
  const localTokenArtLibrary = normalizeTokenArtLibrary(loadTokenImageOverrides());
  const migratedTokenArtLibrary = Object.keys(savedTokenArtLibrary).length ? savedTokenArtLibrary : localTokenArtLibrary;
  nextState.ruleset = normalizeRuleset(nextState.ruleset, { ...nextState, tokenArtLibrary: migratedTokenArtLibrary });
  nextState.tokenArtLibrary = structuredClone(nextState.ruleset.contentLibraries.tokenArt || {});
  nextState.log ||= [];
  nextState.pokemonRecords ||= [];
  nextState.pokemonLog ||= [];
  nextState.battleRecords ||= [];
  nextState.battleSchedules ||= {};
  nextState.gymResults ||= [];
  nextState.moneyLedger ||= [];
  nextState.transactions ||= [];
  nextState.transactions = nextState.transactions.map(normalizeTransactionRecord).filter(Boolean);
  nextState.tokenConsumptions ||= [];
  nextState.tokenConsumptions = nextState.tokenConsumptions.map(normalizeTokenConsumptionRecord).filter(Boolean);
  nextState.playerNotifications ||= [];
  nextState.playerNotifications.forEach((notification) => {
    notification.status = ["pending", "completed", "dismissed", "expired"].includes(notification.status) ? notification.status : "pending";
    notification.payload ||= {};
  });
  nextState.interactionEvents ||= [];
  nextState.interactionEvents = interactionSituationLifecycle.cleanActivityRecords(nextState.interactionEvents)
    .map((event) => normalizeInteractionActivity(event, nextState));
  nextState.effectAuditRecords = Array.isArray(nextState.effectAuditRecords) ? nextState.effectAuditRecords : [];
  nextState.effectOperations = Array.isArray(nextState.effectOperations) ? nextState.effectOperations : [];
  nextState.delayedEffects = Array.isArray(nextState.delayedEffects) ? nextState.delayedEffects : [];
  nextState.broughtTeamSnapshots = Array.isArray(nextState.broughtTeamSnapshots) ? nextState.broughtTeamSnapshots : [];
...
      .map((item) => normalizeTmInventoryEntry(item))
      .flatMap(expandInventoryCategoryRecords);
    player.moveAccessGrants = normalizeTeambuilderMoveAccessGrantList(player.moveAccessGrants, { playerId: player.id });
    player.pokemon ||= [];
    player.legacyPokemon ||= [];
    player.releasedPokemon ||= [];
    player.perks = (player.perks || []).filter((perk) => !isCanceledGameContentEntry(perk));
    player.buffs ||= [];
    player.nerfs ||= [];
    player.shopLevels ||= { items: 0, tms: 0, tokens: 0 };
    player.shopLevels.items = Math.max(0, Math.min(4, Number.isFinite(Number(player.shopLevels.items)) ? Number(player.shopLevels.items) : 0));
    player.shopLevels.tms = Math.max(0, Math.min(4, Number.isFinite(Number(player.shopLevels.tms)) ? Number(player.shopLevels.tms) : 0));
    player.shopLevels.tokens = Math.max(0, Number.isFinite(Number(player.shopLevels.tokens)) ? Number(player.shopLevels.tokens) : 0);
    if (needsShopLevelTimingMigration) {
      player.shopLevels.items = Math.max(player.shopLevels.items, materializedNaturalShopLevel);
      player.shopLevels.tms = Math.max(player.shopLevels.tms, materializedNaturalShopLevel);
    }
    player.seriesWins = Number(player.seriesWins || 0);
    player.currentBounty = Number(player.currentBounty || player.seriesWins * sagaPointRules.championBountyPerSeriesWin || 0);
  });
  nextState.shopLevelTimingVersion = SHOP_LEVEL_TIMING_VERSION;
  migratePokemonRecords(nextState);
  if (!nextState.pokemonLog.length) {
    nextState.pokemonLog = nextState.pokemonRecords.flatMap((pokemon) => (pokemon.log || []).map((entry) => ({
      ...entry,
      pokemonId: pokemon.id,
      pokemonName: pokemon.name,
      trainerId: pokemon.trainerId
    }))).slice(0, 300);
  }
  syncPlayerPokemonLists(nextState);
  ensureGymPhaseState(nextState.series || "Kanto", nextState.gym || 1, nextState);
  saveCompactionRuntime.compactUndoSnapshots(nextState);
  return nextState;
}
```

### Function escapeHtml — lines 22619-29422

Large function (331361 chars). First/last 35 lines:

```javascript
function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const tokenImageRegistry = Object.freeze({
  "after-you": "assets/tokens/after-you.png",
  "arena-trap": "assets/tokens/arena-trap.png",
  "ban-token": "assets/tokens/extra-ban-token.png",
  "beast-ball": "assets/tokens/beast-ball-token.png",
  "beast-ball-token": "assets/tokens/beast-ball-token.png",
  "class-change": "assets/tokens/class-change.png",
  "class-change-token": "assets/tokens/class-change.png",
  "cleanse-tag": "assets/tokens/cleanse-tag.png",
  "clear-smog": "assets/tokens/clear-smog.png",
  "common-candy": "assets/tokens/common-candy.png",
  "devolve": "assets/tokens/devolve-token.png",
  "devolve-token": "assets/tokens/devolve-token.png",
  "ditto": "assets/tokens/ditto-token.png",
  "ditto-token": "assets/tokens/ditto-token.png",
  "dream-ball": "assets/tokens/dream-ball-token.png",
  "dream-ball-token": "assets/tokens/dream-ball-token.png",
  "embargo": "assets/tokens/embargo.png",
  "extra-ban": "assets/tokens/extra-ban-token.png",
  "extra-ban-token": "assets/tokens/extra-ban-token.png",
  "extra-encounter": "assets/tokens/extra-encounter-token.png",
  "extra-encounter-token": "assets/tokens/extra-encounter-token.png",
  "flame-curse": "assets/tokens/flame-curse.png",
  "follow-me": "assets/tokens/follow-me.png",
  "foresight": "assets/tokens/foresight-curse.png",
  "foresight-curse": "assets/tokens/foresight-curse.png",
...
    tokenName,
    metadata,
    situation: effects.length ? "Which ongoing effect will Lingering Aroma replace?" : "No ongoing effect is available.",
    fields: effects.length ? `
      <label class="wide">
        <span>Ongoing Effect</span>
        <select data-live-referee-effect-field="targetText">
          <option value="">Choose an ongoing effect</option>
          ${effects.map((effect) => `<option value="${escapeHtml(effect.id)}"${effect.id === draft.targetText ? " selected" : ""}>${escapeHtml(effect.name || effect.type)} - ${escapeHtml(livePlayerName(effect.actorPlayerId, "Table"))}</option>`).join("")}
        </select>
      </label>
    ` : "",
    submitLabel: `Confirm ${tokenName}`,
    submitDisabled: !effects.length,
    className: "lingering-aroma-target"
  });
}

function liveRefereeHazeTargetScreenMarkup({ tokenName, metadata, actor } = {}) {
  const draft = liveRefereeEffectDraftFor(tokenName, actor?.id || "");
  const selected = new Set((draft.targetPokemonIds || []).slice(0, 2));
  const selectedPokemon = (state.pokemonRecords || []).filter((pokemon) => selected.has(pokemon.id));
  const selectedSpecies = new Set(selectedPokemon.map((pokemon) => pokemonRuleKey(pokemonCommittedSpecies(pokemon))));
  const groups = liveRefereeStandardCurseActiveRosterTargets();
  return `
    <section class="live-referee-game-screen live-referee-effect-screen live-referee-wicked-screen" data-live-referee-effect-form data-haze-curse-target-form>
      ${liveRefereeSituationMarkup("Choose two different Pokemon names.")}
      ${liveRefereeEffectHiddenFields(tokenName, metadata)}
      <div class="live-referee-haze-selected" aria-label="Selected Haze Pokemon names">
        <strong>Selected names</strong>
        ${selectedPokemon.map((pokemon) => `<span data-haze-selected-species="${escapeHtml(pokemonRuleKey(pokemonCommittedSpecies(pokemon)))}">
          <i class="live-referee-wicked-sprite${pokemonSpriteClassSuffix(pokemon)}">${renderPokemonSpriteContent(pokemon)}</i>
          ${escapeHtml(pokemonCommittedSpecies(pokemon))}
        </span>`).join("")}
        ${Array.from({ length: Math.max(0, 2 - selectedPokemon.length) }, () => "<span class=\"empty\">Choose a name</span>").join("")}
```

### Function createPokemonResultTimingWindow — lines 23406-23435

```javascript
function createPokemonResultTimingWindow(session, player) {
  if (!session || session.interactionEventId || !player) return null;
  const resultName = session.resultDisplayName || session.resultPokemonName || "Pokemon result";
  const isEncounter = session.sourceType === "encounter";
  const activity = createInteractionEvent({
    type: isEncounter ? "encounter-result" : "pokemon-result",
    title: `${player.name} rolled ${resultName}`,
    message: `${session.sourceLabel || "Pokemon result"} is pending before it resolves.`,
    actorPlayerId: player.id,
    targetPlayerId: player.id,
    sourceType: session.sourceType || "random-pokemon",
    sourceId: session.id,
    responseTypes: ["encounter-reroll", "steal-encounter"],
    eligiblePlayerIds: state.players.map((entry) => entry.id),
    series: session.series || state.series,
    gym: Number(session.gym || state.gym),
    phase: session.phase || currentPhase(),
    payload: {
      randomPokemonSessionId: session.id,
      gameCornerSessionId: session.gameCornerSessionId || "",
      actionVisitId: session.actionVisitId || "",
      encounterSessionId: session.encounterSessionId || "",
      encounterRollId: session.encounterRollId || "",
      resultName,
      sourceLabel: session.sourceLabel || ""
    }
  });
  session.interactionEventId = activity.id;
  return activity;
}
```

### Function liveResultSessionForActivity — lines 25765-25771

```javascript
function liveResultSessionForActivity(activity, targetState = state) {
  if (!activity) return null;
  const sessionId = activity.payload?.randomPokemonSessionId
    || (/pokemon-result|encounter-result/.test(activity.type || "") ? activity.sourceId : "");
  if (!sessionId) return null;
  return (targetState.randomPokemonSessions || []).find((session) => session.id === sessionId && session.status === "pending") || null;
}
```

### Function handleLiveTableAcceptResult — lines 26986-26996

```javascript
async function handleLiveTableAcceptResult(sessionId, activityId = "") {
  const session = (state.randomPokemonSessions || []).find((entry) => entry.id === sessionId && entry.status === "pending");
  if (!session) {
    alert("No pending Pokemon result is available to accept.");
    return;
  }
  const activity = activityId ? liveActivityById(activityId) : liveActivityById(session.interactionEventId);
  if (activity && !liveCanFinalizeActivity(activity)) return;
  resetLiveRefereeScreenState();
  await confirmRandomPokemonSession(session.id, { skipPendingGuard: true });
}
```

### Function handleLiveTableRerollResult — lines 26998-27007

```javascript
async function handleLiveTableRerollResult(sessionId) {
  const session = (state.randomPokemonSessions || []).find((entry) => entry.id === sessionId && entry.status === "pending");
  if (!session) {
    alert("No pending Pokemon result is available to reroll.");
    return;
  }
  await rerollRandomPokemonSession(session.id, { actorPlayerId: activePlayer().id });
  saveState({ immediate: true });
  render();
}
```

### Function recordEncounterTokenUse — lines 27863-27890

```javascript
async function recordEncounterTokenUse(draft) {
  const activity = currentEncounterPendingActivity();
  if (!activity) {
    alert("Encounter Tokens are used during an encounter result window before the result is finalized.");
    return null;
  }
  if (!playerCanRespondToActivity(activity, draft.actorPlayerId)) {
    alert(`${draft.actor.name} is not eligible to respond to this encounter result.`);
    return null;
  }
  if (playerAlreadyAnsweredActivity(activity, draft.actorPlayerId, currentInteractionPromptStep(activity).id)) {
    alert(`${draft.actor.name} has already responded or chosen No Response for the current prompt.`);
    return null;
  }
  if (tokenNameIsReroll(draft.tokenName)) {
    const session = liveResultSessionForActivity(activity);
    if (!session) {
      alert("Reroll Token needs a pending encounter result before it can be used here.");
      return null;
    }
    await rerollRandomPokemonSession(session.id, { actorPlayerId: draft.actorPlayerId });
    state.liveTable = normalizeLiveTableState({ ...(state.liveTable || {}), currentPendingEventId: activity.id });
    saveState({ immediate: true });
    render();
    return activity;
  }
  return recordTokenResponseToActivity(activity, draft, "encounter-token");
}
```

### Function liveRefereeSituationPercent — lines 30691-30696

```javascript
function liveRefereeSituationPercent(surfaceType) {
  if (state.liveRefereeLayoutPreference === "situation") return 78;
  if (state.liveRefereeLayoutPreference === "table") return 52;
  if (state.liveRefereeLayoutPreference === "manual") return Math.min(82, Math.max(45, Number(state.liveRefereePaneSplit) || 60));
  return { collection: 76, reading: 74, resolution: 68, waiting: 52, decision: 60 }[surfaceType] || 60;
}
```

### Function applyLiveRefereePresentation — lines 30698-30713

```javascript
function applyLiveRefereePresentation(surfaceType = "decision") {
  const column = els.liveRefereeColumn;
  if (!column) return;
  const mode = ["floating", "expanded"].includes(state.liveRefereeWindowMode) ? state.liveRefereeWindowMode : "floating";
  state.liveRefereeWindowMode = mode;
  ["floating", "docked", "expanded", "fullTable"].forEach((name) => column.classList.toggle(`mode-${name}`, mode === name));
  ["right", "left", "bottom"].forEach((side) => column.classList.toggle(`dock-${side}`, state.liveRefereeDockSide === side));
  column.classList.toggle("motion-reduced", state.liveRefereeMotionPreference === "reduced");
  column.classList.toggle("pentagon-compact", ["collection", "reading"].includes(surfaceType) || state.liveRefereeDensityPreference === "compact");
  column.style.setProperty("--live-referee-ui-scale", String(state.liveRefereeUiScale || 1));
  column.style.setProperty("--live-referee-situation-percent", `${liveRefereeSituationPercent(surfaceType)}%`);
  document.body.classList.toggle("live-referee-docked-right", !state.liveRefereeCollapsed && mode === "docked" && state.liveRefereeDockSide === "right");
  document.body.classList.toggle("live-referee-docked-left", !state.liveRefereeCollapsed && mode === "docked" && state.liveRefereeDockSide === "left");
  document.body.classList.toggle("live-referee-docked-bottom", !state.liveRefereeCollapsed && mode === "docked" && state.liveRefereeDockSide === "bottom");
  document.body.classList.toggle("live-referee-full-table", !state.liveRefereeCollapsed && mode === "fullTable");
}
```

### Function resetLiveRefereeLayout — lines 30784-30807

```javascript
function resetLiveRefereeLayout() {
  state.liveRefereeX = "";
  state.liveRefereeY = "";
  state.liveRefereeWidth = "";
  state.liveRefereeHeight = "";
  state.liveRefereeWindowMode = "floating";
  state.liveRefereeDockSide = "right";
  state.liveRefereePaneSplit = "";
  state.liveRefereeLayoutPreference = "auto";
  state.liveRefereeDensityPreference = "comfortable";
  state.liveRefereeUiScale = 1;
  state.liveRefereeMotionPreference = "full";
  saveClientUiState({ immediate: true });
  applyLiveRefereePresentation(els.liveRefereePanel?.dataset.liveRefereeSurface || "decision");
  applyLiveRefereeSize();
  applyLiveRefereePosition();
  syncLiveRefereeDensityClasses();
  const resetValues = { windowMode: "floating", dockSide: "right", layout: "auto", density: "comfortable", scale: "1", motion: "full" };
  els.liveRefereePanel?.querySelectorAll("[data-live-referee-preference]").forEach((button) => {
    const active = button.dataset.liveRefereeValue === resetValues[button.dataset.liveRefereePreference];
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}
```

### Function renderLiveRefereePanel — lines 32147-32253

```javascript
function renderLiveRefereePanel() {
  if (!els.liveRefereePanel) return;
  const prompt = getCurrentLivePrompt();
  const phaseLabel = phaseLabels[prompt.phase] || "Phase";
  const pending = prompt.pendingEvent || null;
  const resolutionAnnouncement = currentLiveResolutionAnnouncement();
  const collapsed = Boolean(state.liveRefereeCollapsed);
  const actorName = prompt.currentActorPlayerId ? livePlayerName(prompt.currentActorPlayerId, "Table") : "Table";
  const waitingText = prompt.waitingOnPlayerIds?.length
    ? prompt.currentPriorityPlayerId
      ? `Waiting for ${livePlayerName(prompt.currentPriorityPlayerId)}`
      : livePlayerNames(prompt.waitingOnPlayerIds)
    : pending
      ? "Ready to finalize"
      : prompt.currentActorPlayerId
        ? actorName
        : "No player waiting";
  const passableIds = pending && prompt.responsesAllowed
    ? (prompt.waitingOnPlayerIds || []).filter((playerId) => playerCanRespondToActivity(pending, playerId))
    : [];
  const selectedActingId = liveRefereeResponderId(prompt);
  const controlAccess = liveRefereeControlAccess(prompt);
  const selectedCanRespond = passableIds.includes(selectedActingId);
  const waitingCount = prompt.waitingOnPlayerIds?.length || 0;
  const whatHappenedText = pending ? liveRefereeWhatHappenedText(prompt) : prompt.body || liveHostNextStepText(prompt);
  const refereeScreen = liveRefereeCurrentScreen();
  const surfaceType = liveRefereeSurfaceType(prompt, refereeScreen, resolutionAnnouncement);
  const screenContext = {
    pending,
    selectedActingId,
    selectedCanRespond,
    whatHappenedText,
    actorName,
    controlAccess
  };
  const compactPhaseLabel = liveRefereeCompactPhaseLabel(prompt);
  const collapsedProgress = liveRefereeCollapsedProgressText(prompt, resolutionAnnouncement);
  const hudViewModel = deriveLiveRefereeHudViewModel(prompt, resolutionAnnouncement);
  const animatePrompt = liveRefereeShouldAnimatePrompt(prompt);
  els.liveRefereeColumn?.classList.toggle("collapsed", collapsed);
  els.liveRefereeColumn?.classList.toggle("expanded", !collapsed);
  els.liveRefereeColumn?.classList.toggle("pending", Boolean(pending));
  els.liveRefereeColumn?.classList.toggle("ready", Boolean(pending && !waitingCount));
  els.liveRefereeColumn?.classList.toggle("effect-screen", refereeScreen !== "play");
  els.liveRefereePanel.classList.toggle("collapsed", collapsed);
  els.liveRefereePanel.classList.toggle("pending", Boolean(pending));
  els.liveRefereePanel.classList.toggle("ready", Boolean(pending && !waitingCount));
  els.liveRefereePanel.classList.toggle("effect-screen", refereeScreen !== "play");
  els.liveRefereePanel.dataset.liveRefereeScreen = refereeScreen;
  els.liveRefereePanel.dataset.liveRefereeSurface = surfaceType;
  applyLiveRefereePresentation(surfaceType);
  if (collapsed) {
    els.liveRefereeColumn.hidden = true;
    els.liveRefereePanel.replaceChildren();
    applyLiveRefereeSize();
    applyLiveRefereePosition();
    return;
  }
  els.liveRefereeColumn.hidden = false;
  els.liveRefereePanel.innerHTML = `
    <header class="live-referee-header">
      <div class="live-referee-title" data-live-referee-drag-handle title="Drag Live Referee">
        <p class="eyebrow">Live Referee</p>
        <h2>${resolutionAnnouncement ? "Result" : pending ? (prompt.currentPriorityPlayerId ? `${escapeHtml(livePlayerName(prompt.currentPriorityPlayerId))}'s Choice` : "Responses Complete") : "No Pending Event"}</h2>
      </div>
      <div class="live-referee-header-actions">
        <span>${escapeHtml(liveRefereeCompactGymCode())} / ${escapeHtml(compactPhaseLabel)}</span>
        <button class="ghost-button live-referee-return-control" type="button" data-live-referee-mode-return>Return</button>
        ${liveRefereeAppearanceMenuMarkup()}
        <button class="icon-button live-referee-collapse-icon" type="button" data-live-referee-toggle aria-expanded="true" aria-label="Collapse Live Referee" title="Collapse Live Referee">&#9660;</button>
      </div>
    </header>
    <div class="live-referee-body">
      ${tokenScenarioSandboxActive() ? `<strong class="live-referee-test-banner">TEST SANDBOX - ${escapeHtml(state.testingTools?.activeScenario?.label || "Token Scenario")}</strong>` : ""}
      <div class="live-referee-hud-shell">
        ${liveRefereePersistentHeaderMarkup(prompt, hudViewModel)}
        <div class="live-referee-context-strip">
          ${liveRefereeContextChipsMarkup(prompt)}
          ${liveRefereePromptTrailMarkup(prompt)}
        </div>
        ${liveRefereeAnnouncementMarkup(prompt, resolutionAnnouncement)}
        <div class="live-referee-hud-main">
          <main class="live-referee-stage" aria-label="Current situation and choices">
            ${renderLiveRefereeScreenBody(prompt, screenContext)}
          </main>
          <button class="live-referee-pane-divider" type="button" data-live-referee-pane-divider aria-label="Resize Situation and player table panes" title="Drag to resize panes"></button>
          <aside class="live-referee-arena" aria-label="Player table">
            ${liveRefereePlayerPentagonMarkup(prompt)}
            ${liveRefereeEffectBadgeMarkup(prompt, { animate: animatePrompt, announcement: resolutionAnnouncement })}
          </aside>
        </div>
        ${liveRefereePhaseRailMarkup(prompt)}
      </div>
    </div>
    <span class="live-referee-resize-handle" data-live-referee-resize-handle title="Resize Live Referee" aria-hidden="true"></span>
  `;
  applyLiveRefereeSize();
  applyLiveRefereePosition();
  syncLiveRefereePlayerTargetHooks();
  const incinerateForm = els.liveRefereePanel.querySelector("[data-incinerate-target-form]");
  if (incinerateForm) {
    incinerateForm.querySelectorAll("[data-incinerate-player-card]").forEach(filterLiveRefereeIncinerateCard);
    updateLiveRefereeIncinerateSelectionUi(incinerateForm);
  }
  const wickedBlowForm = els.liveRefereePanel.querySelector("[data-wicked-blow-target-form]");
  if (wickedBlowForm) updateLiveRefereeWickedBlowSelectionUi(wickedBlowForm);
}
```

### Function setLiveRefereePreference — lines 32459-32476

```javascript
function setLiveRefereePreference(group, value) {
  if (group === "windowMode" && ["floating", "expanded"].includes(value)) state.liveRefereeWindowMode = value;
  if (group === "dockSide" && ["right", "left", "bottom"].includes(value)) state.liveRefereeDockSide = value;
  if (group === "layout" && ["auto", "situation", "table"].includes(value)) state.liveRefereeLayoutPreference = value;
  if (group === "density" && ["comfortable", "compact"].includes(value)) state.liveRefereeDensityPreference = value;
  if (group === "scale" && [0.9, 1, 1.1].includes(Number(value))) state.liveRefereeUiScale = Number(value);
  if (group === "motion" && ["full", "reduced"].includes(value)) state.liveRefereeMotionPreference = value;
  saveClientUiState();
  applyLiveRefereePresentation(els.liveRefereePanel?.dataset.liveRefereeSurface || "decision");
  applyLiveRefereeSize();
  applyLiveRefereePosition();
  syncLiveRefereeDensityClasses();
  els.liveRefereePanel?.querySelectorAll(`[data-live-referee-preference="${group}"]`).forEach((button) => {
    const active = button.dataset.liveRefereeValue === String(value);
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}
```

### Function normalizePokemonApiName — lines 33236-52708

Large function (924167 chars). First/last 35 lines:

```javascript
function normalizePokemonApiName(name) {
  const specialCases = new Map([
    ["mr mime", "mr-mime"],
    ["mime jr", "mime-jr"],
    ["type null", "type-null"],
    ["nidoran f", "nidoran-f"],
    ["nidoran female", "nidoran-f"],
    ["nidoran♀", "nidoran-f"],
    ["nidoranâ™€", "nidoran-f"],
    ["nidoran m", "nidoran-m"],
    ["nidoran male", "nidoran-m"],
    ["nidoran♂", "nidoran-m"],
    ["nidoranâ™‚", "nidoran-m"],
    ["farfetchd", "farfetchd"],
    ["farfetchâ€™d", "farfetchd"],
    ["farfetch'd", "farfetchd"]
  ]);
  const cleaned = String(name || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/[.â€™']/g, "")
    .replace(/:/g, "")
    .replace(/♀/g, " f")
    .replace(/♂/g, " m")
    .replace(/â™€/g, " f")
    .replace(/â™‚/g, " m")
    .replace(/\s+/g, " ");
  if (specialCases.has(cleaned)) return specialCases.get(cleaned);
  return cleaned
    .replace(/[^a-z0-9- ]+/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "");
...
            assignable: true,
            selected: selectedMoveName && move.name.toLowerCase() === selectedMoveName.toLowerCase(),
            slotIndex: index,
            moveIndex
          })).join("")}
        ` : ""}
        ${unavailableFilteredMoves.length ? `
          <div class="teambuilder-move-group-divider">
            <span>Learnable later</span>
            <em>${unavailableFilteredMoves.length}</em>
          </div>
          ${(inspector.moveUsefulness === "all" ? unavailableUsefulMoves : unavailableFilteredMoves).map((move) => renderTeambuilderMoveRow(move, {
            assignable: true,
            selected: selectedMoveName && move.name.toLowerCase() === selectedMoveName.toLowerCase(),
            slotIndex: index,
            moveIndex
          })).join("")}
          ${inspector.moveUsefulness === "all" && unavailableUsuallyUselessMoves.length ? `
            <div class="teambuilder-move-group-divider usefulness unavailable-usefulness">
              <span>Usually Useless / Learnable Later</span>
              <em>${unavailableUsuallyUselessMoves.length}</em>
            </div>
            ${unavailableUsuallyUselessMoves.map((move) => renderTeambuilderMoveRow(move, {
              assignable: true,
              selected: selectedMoveName && move.name.toLowerCase() === selectedMoveName.toLowerCase(),
              slotIndex: index,
              moveIndex
            })).join("")}
          ` : ""}
        ` : ""}
        ${filteredMoves.length ? "" : `<p class="empty-state compact">No moves match that filter for ${escapeHtml(pokemon.name)}.</p>`}
      </div>
    </section>
  `;
}
```

### Function ensureActionPhaseGymState — lines 34656-34748

```javascript
function ensureActionPhaseGymState(series = state.series, gym = state.gym) {
  state.actionPhaseState ||= { selections: {}, seriesTrackers: {} };
  state.actionPhaseState.selections ||= {};
  state.actionPhaseState.seriesTrackers ||= {};
  const key = actionPhaseKey(series, gym);
  state.actionPhaseState.selections[key] ||= {
    series,
    gym: Number(gym),
    playerVisits: {},
    selectedLocationId: "",
    turnOrderPlayerIds: [],
      actionOperations: [],
      activeActionOperationId: "",
      destinationCommit: null
  };
  const gymState = state.actionPhaseState.selections[key];
  gymState.playerVisits ||= {};
  gymState.selectedLocationId ||= "";
  gymState.actionOperations = Array.isArray(gymState.actionOperations) ? gymState.actionOperations : [];
  gymState.activeActionOperationId ||= "";
  if (gymState.destinationCommit && typeof gymState.destinationCommit === "object") {
    gymState.destinationCommit = {
      id: String(gymState.destinationCommit.id || ""),
      requestId: String(gymState.destinationCommit.requestId || ""),
      status: Object.values(provisionalDeclarationRuntime.DESTINATION_STATES).includes(gymState.destinationCommit.status)
        ? gymState.destinationCommit.status
        : provisionalDeclarationRuntime.DESTINATION_STATES.RELEASED,
      playerId: String(gymState.destinationCommit.playerId || ""),
      actionNumber: Math.max(1, Number(gymState.destinationCommit.actionNumber || 1)),
      locationId: String(gymState.destinationCommit.locationId || ""),
      serviceId: String(gymState.destinationCommit.serviceId || ""),
      acceptedAt: gymState.destinationCommit.acceptedAt || "",
      operationId: String(gymState.destinationCommit.operationId || ""),
      releasedAt: gymState.destinationCommit.releasedAt || "",
      releaseReason: gymState.destinationCommit.releaseReason || "",
      completedAt: gymState.destinationCommit.completedAt || ""
    };
  } else {
    gymState.destinationCommit = null;
  }
  const activePlayerIds = new Set((state.players || []).map((player) => player.id));
  const existingOrder = (gymState.turnOrderPlayerIds || []).filter((playerId) => activePlayerIds.has(playerId));
  const missingOrder = placementTurnOrderPlayerIds(series).filter((playerId) => !existingOrder.includes(playerId));
  gymState.turnOrderPlayerIds = [...existingOrder, ...missingOrder];
  const visitIds = new Set(Object.values(gymState.playerVisits).flat().map((visit) => visit?.id).filter(Boolean));
  gymState.actionOperations = gymState.actionOperations
    .filter((operation) => operation?.visitId && visitIds.has(operation.visitId))
    .map((operation) => ({
      id: operation.id || `action-operation-${operation.visitId}`,
      visitId: operation.visitId,
      playerId: operation.playerId || "",
      actionNumber: Math.max(1, Number(operation.actionNumber || 1)),
      locationId: operation.locationId || "",
      locationName: operation.locationName || "",
      serviceId: operation.serviceId || "",
      committed: operation.committed !== false,
      committedAt: operation.committedAt || operation.createdAt || new Date().toISOString(),
      status: ["resolving", "completed", "cancelled"].includes(operation.status) ? operation.status : "resolving",
      linkedFeatureType: operation.linkedFeatureType || "",
      linkedFeatureSessionId: operation.linkedFeatureSessionId || "",
      linkedPendingSituationId: operation.linkedPendingSituationId || "",
      completedAt: operation.completedAt || "",
      completionReason: operation.completionReason || ""
    }));
  gymState.actionOperations.forEach((operation) => {
    if (operation.status !== "resolving" || operation.linkedFeatureType !== "encounter") return;
    const encounterSession = (state.encounterSessions || []).find((session) => session.id === operation.linkedFeatureSessionId);
    if (!encounterSessionReadyForAutomaticCompletion(encounterSession)) return;
    const completedAt = encounterSession.completedAt || new Date().toISOString();
    encounterSession.status = "completed";
    encounterSession.completedAt = completedAt;
    operation.status = "completed";
    operation.completedAt = completedAt;
    operation.completionReason = "encounter-results-obtained";
    const visit = gymState.playerVisits?.[operation.playerId]?.find((entry) => entry.id === operation.visitId);
    if (visit) visit.actionOperationStatus = "completed";
    if (gymState.destinationCommit?.operationId === operation.id) {
      gymState.destinationCommit.status = provisionalDeclarationRuntime.DESTINATION_STATES.COMPLETED;
      gymState.destinationCommit.completedAt = completedAt;
    }
    actionPhaseStateRepairQueued = true;
  });
  if (!gymState.actionOperations.some((operation) => operation.id === gymState.activeActionOperationId && operation.status === "resolving")) {
    gymState.activeActionOperationId = gymState.actionOperations.find((operation) => operation.status === "resolving")?.id || "";
  }
  if (staleActionDestinationCommit(gymState)) {
    const staleLocationId = gymState.destinationCommit?.locationId || "";
    gymState.destinationCommit = null;
    if (staleLocationId && gymState.selectedLocationId === staleLocationId) gymState.selectedLocationId = "";
    actionPhaseStateRepairQueued = true;
  }
  return gymState;
}
```

### Function linkedActionOperationSession — lines 34894-34910

```javascript
function linkedActionOperationSession(operation) {
  if (!operation?.linkedFeatureSessionId) return null;
  const collections = {
    wheel: state.wheelSessions,
    encounter: state.encounterSessions,
    "hidden-grotto": state.hiddenGrottoSessions,
    "silph-co": state.silphCoSessions,
    "bulletin-board": state.bulletinBoardSessions,
    breeder: null,
    "game-corner": state.gameCornerSessions,
    "pokemon-center": state.pokemonCenterSessions,
    graveyard: state.graveyardSessions,
    "department-store": state.departmentStoreVisits,
    pc: state.pcSessions
  };
  return (collections[operation.linkedFeatureType] || []).find((session) => session.id === operation.linkedFeatureSessionId) || null;
}
```

### Function closeWheelPanel — lines 35814-35818

```javascript
function closeWheelPanel() {
  state.wheelDrawerOpen = false;
  saveState();
  renderWheelPanel();
}
```

### Function normalizeBuffMoveName — lines 37564-38913

Large function (69034 chars). First/last 35 lines:

```javascript
function normalizeBuffMoveName(buffText) {
  return String(buffText || "")
    .replace(/^Daycare\s+TM\s+Move:\s*/i, "")
    .replace(/^Dragon's Den\s+(?:Move|Ability):\s*/i, "")
    .replace(/^(?:TM|Move|Buff Move|Learned Move)\s*:\s*/i, "")
    .trim();
}

function buffMoveOptionsForPokemon(pokemon) {
  const rawBuffs = pokemon ? teambuilderRuleContextForPokemon(pokemon).buffs.map((buff) => String(buff || "")) : [];
  const seen = new Set();
  return rawBuffs
    .map((buff) => {
      const name = normalizeBuffMoveName(buff);
      const key = buildMoveKey(name);
      if (!key || seen.has(key) || !teambuilderKnownMoveName(name)) return null;
      seen.add(key);
      return {
        ...teambuilderMoveData(name),
        name,
        source: "buff",
        sourceLabel: "Buff",
        assignable: true,
        grantDetail: buff
      };
    })
    .filter(Boolean);
}

function teambuilderMoveNamesFromGrant(grant = {}) {
  return [
    ...(Array.isArray(grant.moveNames) ? grant.moveNames : []),
    ...(Array.isArray(grant.moves) ? grant.moves : []),
    grant.moveName,
    grant.move
...
    ["Connoisseur", "Obtain 5 New Pokemon"],
    ["Purist", "Only Bring Pokemon To The Battle Phase Who Know Their Level-Up Movesets And Normal Abilities."],
    ["Prove Your Skills", "Don't Activate Any Tokens & Win A Battle"],
    ["Public Enemy", "Two Different Players Target You With Effects"],
    ["Gym Leader Apprentice", "Win A Rival Battle With 3 Pokemon Of The Same Type."],
    ["Master Baiter", "Make Two Players Mad. Money Is Not Awarded Until The Crowd Says Your Ragebait Is Sufficient."],
    ["Stall", "Have A Pokemon Out For 10 Turns In A Row"],
    ["Locked-In", "Reveal Your Team Before Team Submission"],
    ["Bills Apprentice", "Use 3 Legacy Tickets"],
    ["The Anchor", "Win A Battle With 1 Pokemon Remaining"],
    ["Skillful Victory", "Win A Battle Without Boosting Your Own Stats"],
    ["Think Long Term", "Leave Two Pokemon In Different Locations (Daycare, Silph Co, Dragons Den)"]
  ],
  master: [
    ["Be The Best", "Win 4 Rival Battles"],
    ["MVP Award", "Use One Pokemon To Get 10 KOs"],
    ["Token Mastery", "Use A Token Of Every Type"],
    ["Disruptive", "Remove 4 Different Pokemon From Other Players Teams. (Includes Encounters, Does Not Include Series Bans)"],
    ["Spammer", "Activate 10 Different Effects."],
    ["Monotype Master", "Win A Rival Battle With 4 Pokemon Of The Same Type."],
    ["Challenge Mode", "Bring 5 Pokemon To The Battle Phase"],
    ["Raw Talent", "Don't Activate Any Effects"],
    ["Untouchable", "You And Your Pokemon Make It Through The Gym Without Being Effected Negtatively By Another Player."],
    ["Reverse Sweep", "Use A Pokemon To KO At Least 3 Pokemon In A Row When You Are Down To Your Last One Or Two Pokemon And Win The Match."],
    ["Top Dog", "Beat A Player Who Brought A Pokemon That's In Your Active Party To Battle Phase."],
    ["Quality Hunter", "Obtain A Pokemon Who's Final Evolution BST Is Above 535"],
    ["Jackpot", "Spin The Slot Machine 3 Times In One Action And Win On Every Spin."],
    ["Weary Spirits", "Release 5 Pokemon At The Graveyard"],
    ["Status Master", "Apply Sleep, Paralysis, Poison, & Burn"],
    ["Bluntmons", "Win A Battle Without Using A Single STAB Move"],
    ["Cheator Mastery", "Get 12 KOs With Pokemon Who Have An Illegal Move, Ability, Or Extra EVs"],
    ["Bully", "Use A Targetting Negative Effects On Every Player"],
    ["Ferocity", "Win A Battle In 10 Turns Or Less"]
  ]
}
```

### Function renderHiddenGrottoDetails — lines 39400-39495

```javascript
function renderHiddenGrottoDetails(location, player) {
  if (!pokemonBuildDataReady()) ensurePokemonBuildDataLoaded();
  const cost = Number(location?.cost || 1500);
  const naturalTier = getNaturalGymTier(state.gym);
  const grottoTierCap = getHiddenGrottoTierCap(state.gym);
  const session = activeHiddenGrottoSession(player.id);
  const sessionTierCap = getHiddenGrottoTierCap(session?.gym || state.gym);
  if (session?.status === "type-choice") {
    return `
      <div><span>Balance</span><strong>${formatMoney(player.balance || 0)}</strong></div>
      <div><span>Cost Paid</span><strong>${formatMoney(session.cost || cost)}</strong></div>
      <div><span>Hidden Grotto Tier Cap</span><strong>${escapeHtml(formatPokemonBalanceTierLabel(sessionTierCap))}</strong></div>
      <p class="gc-rule-note">Choose one rolled type. Hidden Grotto then rolls 3 Pokemon of that type from up to 2 Battle Tier steps above this Gym's normal tier. LC/LC Elite Pokemon that can still evolve are excluded.</p>
      <section class="location-services">
        ${session.rolledTypes.map((type) => {
          const eligible = getHiddenGrottoPool(session.gym || state.gym, type);
          return `
            <article class="location-service-card">
              <div>
                <strong>${escapeHtml(type)}</strong>
                <p>${eligible.length ? `${eligible.length} eligible Pokemon` : "No eligible Pokemon"}</p>
              </div>
              <button class="buy-button" type="button" data-grotto-type="${escapeHtml(type)}"${eligible.length ? "" : " disabled"}>Choose ${escapeHtml(type)}</button>
            </article>
          `;
        }).join("")}
      </section>
    `;
  }
  if (session?.status === "pokemon-choice") {
    return `
      <div><span>Cost Paid</span><strong>${formatMoney(session.cost || cost)}</strong></div>
      <div><span>Chosen Type</span><strong>${escapeHtml(session.chosenType || "Unknown")}</strong></div>
      <div><span>Hidden Grotto Tier Cap</span><strong>${escapeHtml(formatPokemonBalanceTierLabel(sessionTierCap))}</strong></div>
      <p class="gc-rule-note">Choose 1 of the 3 rolled Pokemon. The pool includes tiers up to 2 Battle Tier steps above this Gym's normal tier and excludes LC/LC Elite Pokemon that can still evolve.</p>
      <section class="location-services">
        ${(session.rolledPokemon || []).map((choice) => {
          const name = choice.displayName || choice.pokemonName || "Unknown";
          return `
            <article class="location-service-card">
              <div>
                <strong>${escapeHtml(name)}</strong>
                <p>${escapeHtml((choice.types || []).join(" / ") || "Unknown Type")} - ${escapeHtml(formatPokemonBalanceTierLabel(choice.tier || "Unassigned"))}</p>
              </div>
              <button class="buy-button" type="button" data-grotto-pokemon="${escapeHtml(name)}">Choose ${escapeHtml(name)}</button>
            </article>
          `;
        }).join("")}
      </section>
    `;
  }
  const pool = getHiddenGrottoPool(state.gym);
  const availableTypes = hiddenGrottoAvailableTypes(state.gym);
  const typeChoiceCards = hiddenGrottoTypes.map((type) => {
    const eligible = getHiddenGrottoPool(state.gym, type);
    return `
      <button class="ghost-button grotto-type-direct-button" type="button" data-grotto-start-type="${escapeHtml(type)}"${eligible.length ? "" : " disabled"}>
        ${escapeHtml(type)} <span>${eligible.length}</span>
      </button>
    `;
  }).join("");
  const recentSession = (state.hiddenGrottoSessions || []).find((entry) => entry.playerId === player.id
    && entry.series === state.series
    && Number(entry.gym) === Number(state.gym)
    && entry.status === "completed"
    && !entry.undone);
  const recentPokemon = recentSession?.rosterPokemonId ? findPokemonRecord(recentSession.rosterPokemonId) : null;
  return `
    <div><span>Balance</span><strong>${formatMoney(player.balance || 0)}</strong></div>
    <div><span>Cost</span><strong>${formatMoney(cost)}</strong></div>
    <div><span>Current Gym Battle Tier</span><strong>${escapeHtml(formatPokemonBalanceTierLabel(naturalTier))}</strong></div>
    <div><span>Hidden Grotto Tier Cap</span><strong>${escapeHtml(formatPokemonBalanceTierLabel(grottoTierCap))}</strong></div>
    <div><span>Available Pokemon in Pool</span><strong>${pool.length}</strong></div>
    <div><span>Available Types</span><strong>${availableTypes.length}</strong></div>
    <p class="gc-rule-note">Spend 1 Action and ${formatMoney(cost)} to roll 3 types, choose one, then roll 3 Pokemon of that type and choose one. The pool reaches 2 Battle Tier steps above this Gym's normal tier. LC/LC Elite Pokemon that can still evolve remain excluded.</p>
    ${recentSession ? `
      <article class="location-service-card">
        <div class="pokemon-result-inline">
          <div class="pokemon-avatar${pokemonSpriteClassSuffix(recentPokemon)}">
            ${recentPokemon ? renderPokemonSpriteContent(recentPokemon) : `<span>${escapeHtml((recentSession.chosenPokemon || "?").slice(0, 1))}</span>`}
          </div>
          <div>
            <strong>Latest Find: ${escapeHtml(recentSession.chosenPokemon || "Unknown")}</strong>
            <p>${escapeHtml(recentSession.chosenType || "Unknown Type")} - ${escapeHtml(pokemonBattleTierSummary(recentSession.chosenPokemon || "", "Unassigned"))}</p>
          </div>
        </div>
      </article>
    ` : ""}
    <button class="buy-button" type="button" data-grotto-start="true"${availableTypes.length ? "" : " disabled"}>Explore Hidden Grotto</button>
    <section class="gc-token-use-panel grotto-type-direct-panel">
      <h3>Choose Type</h3>
      <p>Use this when a trainer class or effect lets you pick the Hidden Grotto type directly.</p>
      <div class="grotto-type-direct-grid">${typeChoiceCards}</div>
    </section>
  `;
}
```

### Function startHiddenGrottoSession — lines 40154-40154

```javascript
async function startHiddenGrottoSession({ chosenType = "" }
```

### Function chooseHiddenGrottoType — lines 40294-40325

```javascript
async function chooseHiddenGrottoType(type) {
  const session = activeHiddenGrottoSession(activePlayer().id);
  if (!session || session.status !== "type-choice" || !session.rolledTypes.includes(type)) return;
  await ensurePokemonBuildDataLoaded({ renderOnLoad: false });
  const options = getHiddenGrottoPool(session.gym || state.gym, type);
  const choices = randomUniqueSample(options, Math.min(3, options.length));
  if (!choices.length) {
    alert(`No eligible ${type} Pokemon are available for this Hidden Grotto tier pool after low-tier evolution filtering. Choose another rolled type.`);
    return;
  }
  session.chosenType = type;
  session.rolledPokemon = choices;
  session.status = "pokemon-choice";
  session.naturalTier = getNaturalGymTier(session.gym || state.gym);
  session.targetTier = getHiddenGrottoTierCap(session.gym || state.gym);
  session.tierStepBonus = HIDDEN_GROTTO_TIER_STEP_BONUS;
  const entry = (state.log || []).find((logEntry) => logEntry.hiddenGrottoSessionId === session.id);
  if (entry) {
    entry.summary = `Spent 1 Action at Hidden Grotto\nSpent ${formatMoney(session.cost)}\nGrotto Tier Cap: ${formatPokemonBalanceTierLabel(session.targetTier)}\nChose ${type}\nChoose 1 Pokemon`;
    entry.details = [
      `Current Gym Battle Tier: ${formatPokemonBalanceTierLabel(session.naturalTier)}`,
      `Hidden Grotto Tier Cap: ${formatPokemonBalanceTierLabel(session.targetTier)}`,
      `Rolled Types: ${session.rolledTypes.join(", ")}`,
      `Chosen Type: ${type}`,
      `Eligible ${type} Pool: ${options.length}`,
      `Pokemon Choices: ${choices.map((choice) => choice.displayName || choice.pokemonName).join(", ")}`
    ];
    appendUniqueLogValue(entry, "tags", "hidden-grotto-pokemon-choice");
  }
  saveState();
  render();
}
```

### Function chooseHiddenGrottoPokemon — lines 40327-40367

```javascript
async function chooseHiddenGrottoPokemon(name) {
  const player = activePlayer();
  const session = activeHiddenGrottoSession(player.id);
  if (!session || session.status !== "pokemon-choice") return;
  const choice = (session.rolledPokemon || []).find((pokemon) => pokemon.displayName === name || pokemon.pokemonName === name);
  if (!choice) return;
  await ensurePokemonBuildDataLoaded({ renderOnLoad: false });
  const acquisition = resolvePokemonAcquisitionSpecies(choice.displayName || choice.pokemonName);
  const sprite = await fetchStablePokemonSprite(acquisition.receivedSpecies || choice.displayName || choice.pokemonName);
  const pokemon = createPokemonRecord(player, choice.displayName || choice.pokemonName, "Hidden Grotto", {
    rosterType: "Active",
    receivedSpriteUrl: sprite.spriteUrl || "",
    receivedSpriteKey: sprite.spriteKey || "",
    sourceTier: getPokemonAcquisitionTier(choice.displayName || choice.pokemonName),
    acquisitionTier: getPokemonAcquisitionTier(choice.displayName || choice.pokemonName),
    gameCornerMetadata: getPokemonGameCornerMetadata(choice.displayName || choice.pokemonName)
  });
  session.chosenPokemon = choice.displayName || choice.pokemonName;
  session.rosterPokemonId = pokemon.id;
  session.status = "completed";
  session.completedAt = new Date().toISOString();
  const entry = (state.log || []).find((logEntry) => logEntry.hiddenGrottoSessionId === session.id);
  if (entry) {
    entry.summary = `Spent 1 Action at Hidden Grotto\nSpent ${formatMoney(session.cost)}\nChose ${session.chosenType} Type\nCaught ${session.chosenPokemon}`;
    entry.details = [
      `Current Gym Battle Tier: ${formatPokemonBalanceTierLabel(session.naturalTier || getNaturalGymTier(session.gym))}`,
      `Hidden Grotto Tier Cap: ${formatPokemonBalanceTierLabel(session.targetTier || getHiddenGrottoTierCap(session.gym))}`,
      `Rolled Types: ${session.rolledTypes.join(", ")}`,
      `Chosen Type: ${session.chosenType}`,
      `Pokemon Choices: ${(session.rolledPokemon || []).map((pokemon) => pokemon.displayName).join(", ")}`,
      `Chosen Pokemon: ${session.chosenPokemon}`,
      `Battle Tier: ${pokemonBattleTierSummary(session.chosenPokemon, "Unassigned").replace(/^Battle:\s*/, "")}`,
      `Types: ${(choice.types || []).join(" / ") || "Unknown"}`
    ];
    appendUniqueLogValue(entry, "pokemonNames", session.chosenPokemon);
    appendUniqueLogValue(entry, "tags", "hidden-grotto-result");
  }
  completeActionOperationForVisit(session.actionVisitId, "hidden-grotto-choice-complete");
  saveState();
  render();
}
```

### Function availablePokemonForGameCornerTier — lines 41490-41508

```javascript
function availablePokemonForGameCornerTier(tier) {
  const tierId = normalizeAcquisitionFamilyId(tier);
  const available = getPokemonByGameCornerTier(tierId)
    .map((key) => {
      const metadata = getPokemonGameCornerMetadata(key) || {};
      const battleEntry = getPokemonBattleTierEntry(key) || {};
      return {
        key,
        ...metadata,
        displayName: metadata.displayName || battleEntry.displayName || getRivalSagaPokemonDisplayName(key),
        tier: tierId,
        acquisitionFamily: tierId,
        battleTier: metadata.battleTier || battleEntry.balanceTier || "",
        battleTierLabel: metadata.battleTierLabel || battleEntry.balanceTierLabel || ""
      };
    })
    .filter((metadata) => currentPokemonRuleStatusByName(metadata.displayName) !== "Banned");
  return groupedRandomPokemonPool(available);
}
```

### Function groupedRandomPokemonPool — lines 41515-41530

```javascript
function groupedRandomPokemonPool(entries) {
  const groups = new Map();
  entries.forEach((entry) => {
    const group = pokemonRollGroupKey(entry);
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group).push(entry);
  });
  return [...groups.entries()].map(([rollGroup, forms]) => {
    const chosen = randomSample(forms, 1)[0];
    return {
      ...chosen,
      rollGroup,
      possibleSpriteForms: forms.map((form) => ({ key: form.key, displayName: form.displayName }))
    };
  });
}
```

### Function getHiddenGrottoEligiblePokemonByType — lines 41605-41622

```javascript
function getHiddenGrottoEligiblePokemonByType(type) {
  const seen = new Set();
  return Object.entries(rivalSagaPokemonTierMap)
    .map(([key, metadata]) => ({
      pokemonName: key,
      displayName: metadata.displayName || key,
      types: getPokemonTypes(metadata.displayName || key),
      tier: metadata.tier,
      metadata
    }))
    .filter((entry) => {
      const groupKey = pokemonRollGroupKey({ key: entry.pokemonName, displayName: entry.displayName, rollGroup: entry.metadata?.rollGroup });
      if (seen.has(groupKey)) return false;
      seen.add(groupKey);
      return (entry.types || []).some((candidate) => String(candidate).toLowerCase() === String(type || "").toLowerCase())
        && currentPokemonRuleStatusByName(entry.displayName) !== "Banned";
    });
}
```

### Function isHiddenGrottoEncounterEligible — lines 41624-41632

```javascript
function isHiddenGrottoEncounterEligible(entry) {
  const key = entry?.indexKey || normalizePokemonName(entry?.displayName || "");
  const name = entry?.displayName || key;
  if (!key || !name) return false;
  if (entry?.encounterEligible === false) return false;
  if (/(^|-)(mega|gmax|gigantamax|primal)(-|$)/i.test(key)) return false;
  if (currentPokemonRuleStatusByName(name) === "Banned") return false;
  return true;
}
```

### Function hiddenGrottoLowTierNfeCutoffIndex — lines 41636-41638

```javascript
function hiddenGrottoLowTierNfeCutoffIndex() {
  return getTierIndex("LC Elite");
}
```

### Function hiddenGrottoEntryHasNoEvolutionNote — lines 41640-41640

```javascript
function hiddenGrottoEntryHasNoEvolutionNote(entry = {}
```

### Function hiddenGrottoFinalEvolutionSpeciesIds — lines 41651-41662

```javascript
function hiddenGrottoFinalEvolutionSpeciesIds() {
  if (!pokemonBuildDataReady()) {
    ensurePokemonBuildDataLoaded();
    return null;
  }
  if (hiddenGrottoFinalEvolutionSpeciesIdsCache) return hiddenGrottoFinalEvolutionSpeciesIdsCache;
  const childrenByParent = teambuilderEvolutionChildrenByParent({ requestLoad: false });
  hiddenGrottoFinalEvolutionSpeciesIdsCache = new Set(teambuilderSpeciesEntries({ requestLoad: false })
    .map((species) => String(species.speciesId || ""))
    .filter((speciesId) => speciesId && !childrenByParent.has(speciesId)));
  return hiddenGrottoFinalEvolutionSpeciesIdsCache;
}
```

### Function hiddenGrottoSpeciesForEntry — lines 41664-41664

```javascript
function hiddenGrottoSpeciesForEntry(entry = {}
```

### Function isHiddenGrottoFullyEvolvedEntry — lines 41687-41687

```javascript
function isHiddenGrottoFullyEvolvedEntry(entry = {}
```

### Function hiddenGrottoExcludesLowTierNfe — lines 41696-41696

```javascript
function hiddenGrottoExcludesLowTierNfe(entry = {}
```

### Function getHiddenGrottoPool — lines 41703-41727

```javascript
function getHiddenGrottoPool(gymNumber = state.gym, type = "") {
  const targetTier = getHiddenGrottoTierCap(gymNumber);
  const seen = new Set();
  return buildPokemonIndexEntries()
    .filter((entry) => {
      if (!isHiddenGrottoEncounterEligible(entry)) return false;
      const tier = entry.balanceTierLabel || getPokemonBalanceTierLabel(entry.balanceTier);
      const tierIndex = getTierIndex(tier);
      if (tierIndex < 0) return false;
      if (!isTierAtOrBelow(tier, targetTier)) return false;
      if (hiddenGrottoExcludesLowTierNfe(entry, tier)) return false;
      if (type && !(entry.types || []).some((candidate) => String(candidate).toLowerCase() === String(type).toLowerCase())) return false;
      const groupKey = pokemonRollGroupKey({ key: entry.indexKey, displayName: entry.displayName, rollGroup: entry.policy?.rollGroup });
      if (seen.has(groupKey)) return false;
      seen.add(groupKey);
      return true;
    })
    .map((entry) => ({
      pokemonName: entry.indexKey,
      displayName: entry.displayName,
      types: entry.types || [],
      tier: entry.balanceTierLabel || getPokemonBalanceTierLabel(entry.balanceTier),
      metadata: entry
    }));
}
```

### Function hiddenGrottoAvailableTypes — lines 41729-41731

```javascript
function hiddenGrottoAvailableTypes(gymNumber = state.gym) {
  return hiddenGrottoTypes.filter((type) => getHiddenGrottoPool(gymNumber, type).length > 0);
}
```

### Function encounterWheelKey — lines 41741-41743

```javascript
function encounterWheelKey(series = state.series, gym = state.gym) {
  return `${String(series || "").toLowerCase()}-gym-${Number(gym || 1)}`;
}
```

### Function encounterWheelDefinition — lines 41745-41747

```javascript
function encounterWheelDefinition(series = state.series, gym = state.gym) {
  return encounterWheelDefinitions[encounterWheelKey(series, gym)] || null;
}
```

### Function pendingEncounterSessions — lines 41749-41752

```javascript
function pendingEncounterSessions() {
  state.encounterSessions ||= [];
  return state.encounterSessions.filter((session) => ["pending", "review"].includes(session.status));
}
```

### Function selectedEncounterSession — lines 41754-41763

```javascript
function selectedEncounterSession() {
  const pending = pendingEncounterSessions();
  if (!pending.length) return null;
  let session = pending.find((entry) => entry.id === state.selectedEncounterSessionId);
  if (!session) {
    session = pending[0];
    state.selectedEncounterSessionId = session.id;
  }
  return session;
}
```

### Function encounterEntriesForSession — lines 41765-41783

```javascript
function encounterEntriesForSession(session) {
  const definition = encounterWheelDefinition(session?.series, session?.gym);
  if (!definition) return [];
  const includeFishing = Boolean(session.includeFishing);
  const includeSurf = Boolean(session.includeSurf);
  const removed = new Set(session.removedEntryIds || []);
  const baseEntries = (definition.entries || []).filter((entry) => {
    if (removed.has(entry.id)) return false;
    const category = String(entry.category || "land").toLowerCase();
    if (category === "fishing" && !includeFishing) return false;
    if (category === "surf" && !includeSurf) return false;
    if (entry.enabledByDefault === false && !["fishing", "surf"].includes(category)) return false;
    return currentPokemonRuleStatusByName(entry.pokemonName || entry.displayName) !== "Banned";
  });
  return [...baseEntries, ...(session.temporaryEntries || [])].map((entry) => ({
    ...entry,
    weight: Math.max(0, Number(session.weightOverrides?.[entry.id] ?? entry.weight ?? 1))
  })).filter((entry) => Number(entry.weight) > 0);
}
```

### Function buildEncounterWheelSegments — lines 41802-41818

```javascript
function buildEncounterWheelSegments(entries) {
  const totalWeight = entries.reduce((total, entry) => total + Number(entry.weight || 1), 0) || 1;
  let cursor = 0;
  return entries.map((entry) => {
    const span = (Number(entry.weight || 1) / totalWeight) * 360;
    const segment = {
      entryId: entry.id,
      displayName: entry.displayName || entry.pokemonName || "Unknown",
      startAngle: cursor,
      endAngle: cursor + span,
      weight: Number(entry.weight || 1),
      category: entry.category || "land"
    };
    cursor += span;
    return segment;
  });
}
```

### Function resolveEncounterSpecialResult — lines 41871-41894

```javascript
function resolveEncounterSpecialResult(entry) {
  if (!entry?.specialWheelId) return { result: entry, special: null };
  const subWheel = hyperspaceWheelDefinitions[entry.specialWheelId];
  const subResult = subWheel ? weightedEncounterEntry(subWheel.entries || []) : null;
  if (!subResult) return { result: entry, special: null };
  return {
    result: {
      ...subResult,
      category: "hyperspace",
      sourceSpecialEntryId: entry.id,
      sourceSpecialName: entry.displayName || entry.pokemonName,
      specialWheelId: entry.specialWheelId,
      specialWheelName: subWheel.name
    },
    special: {
      triggerEntryId: entry.id,
      triggerName: entry.displayName || entry.pokemonName,
      wheelId: subWheel.id,
      wheelName: subWheel.name,
      resultEntryId: subResult.id,
      resultName: subResult.displayName || subResult.pokemonName
    }
  };
}
```

### Function pendingRandomPokemonSessions — lines 41956-41959

```javascript
function pendingRandomPokemonSessions() {
  state.randomPokemonSessions ||= [];
  return state.randomPokemonSessions.filter((session) => session.status === "pending");
}
```

### Function pendingRerollTargets — lines 41961-42000

```javascript
function pendingRerollTargets() {
  const targets = [];
  (state.randomPokemonSessions || [])
    .filter((session) => session.status === "pending" && session.rerollable !== false && !session.interactionLocked)
    .forEach((session) => {
      const ownerId = session.resultOwnerPlayerId || session.ownerPlayerId || session.playerId;
      const owner = state.players.find((player) => player.id === ownerId);
      targets.push({
        id: `random-pokemon:${session.id}`,
        kind: "random-pokemon",
        targetResultId: session.id,
        ownerPlayerId: ownerId,
        ownerName: owner?.name || "Unknown",
        sourceLabel: session.sourceLabel || "Pokemon Result",
        resultName: session.resultDisplayName || "Pending result",
        meta: `${session.series || state.series} Gym ${session.gym || state.gym}`
      });
    });
  (state.encounterSessions || [])
    .filter((session) => ["pending", "review"].includes(session.status))
    .forEach((session) => {
      const owner = state.players.find((player) => player.id === session.playerId);
      (session.rolls || [])
        .filter((roll) => !roll.rosterPokemonId)
        .forEach((roll) => {
          targets.push({
            id: `encounter-roll:${session.id}:${roll.id}`,
            kind: "encounter-roll",
            targetResultId: roll.id,
            encounterSessionId: session.id,
            ownerPlayerId: session.playerId,
            ownerName: owner?.name || "Unknown",
            sourceLabel: roll.specialEncounter ? "Encounter / Hyperspace" : "Encounter Wheel",
            resultName: roll.resultDisplayName || "Pending encounter",
            meta: `${session.series || state.series} Gym ${session.gym || state.gym}`
          });
        });
    });
  return targets;
}
```

### Function rerollRandomPokemonResult — lines 42040-42040

```javascript
async function rerollRandomPokemonResult({ targetResultId, actorPlayerId, mode = "result" }
```

### Function selectedRandomPokemonSession — lines 42057-42066

```javascript
function selectedRandomPokemonSession() {
  const pending = pendingRandomPokemonSessions();
  if (!pending.length) return null;
  let session = pending.find((entry) => entry.id === state.selectedRandomPokemonSessionId);
  if (!session) {
    session = pending[0];
    state.selectedRandomPokemonSessionId = session.id;
  }
  return session;
}
```

### Function createRandomPokemonSession — lines 42068-42068

```javascript
async function createRandomPokemonSession({ sourceType, sourceLabel, player, tier, actionVisitId = "", gameCornerSessionId = "", token = null }
```

### Function createEncounterPokemonResultSession — lines 42121-42121

```javascript
async function createEncounterPokemonResultSession({ player, encounterSession, roll, result }
```

### Function augmentHoneyCausalUndoAfterAcquisition — lines 42172-42185

```javascript
function augmentHoneyCausalUndoAfterAcquisition(randomSession, causalBeforeAcquisition) {
  if (!randomSession?.copiedFromRandomPokemonSessionId || !causalBeforeAcquisition) return;
  const historyLog = (state.log || []).find((entry) => !entry.undone
    && entry.undoData?.tokenDefinitionId === "honey-token"
    && entry.copiedRandomPokemonSessionId === randomSession.id);
  if (!historyLog?.undoData) return;
  const later = buildCausalTokenEffectUndo(causalBeforeAcquisition, {
    id: historyLog.linkedEventId || historyLog.undoData.effectId || "",
    payload: { tokenName: "Honey" }
  }, { id: "honey-token", name: "Honey" });
  historyLog.undoData = mergeCausalTokenUndoData(historyLog.undoData, later);
  historyLog.honeyAcquisitionCompleted = true;
  historyLog.acquiredPokemonId = randomSession.rosterPokemonId || "";
}
```

### Function encounterSessionReadyForAutomaticCompletion — lines 42199-42204

```javascript
function encounterSessionReadyForAutomaticCompletion(session) {
  if (!session || ["completed", "cancelled", "undone"].includes(session.status)) return false;
  const rolls = session.rolls || [];
  return rolls.length >= Number(session.maxRolls || 2)
    && rolls.every(encounterRollWasObtained);
}
```

### Function completeObtainedEncounterSession — lines 42206-42217

```javascript
function completeObtainedEncounterSession(session, completionReason = "encounter-results-obtained") {
  if (!encounterSessionReadyForAutomaticCompletion(session)) return false;
  session.status = "completed";
  session.completedAt ||= new Date().toISOString();
  (session.actionVisitIds || [session.actionVisitId]).filter(Boolean).forEach((visitId) => {
    completeActionOperationForVisit(visitId, completionReason, session.series, session.gym);
  });
  const next = pendingEncounterSessions().find((entry) => entry.id !== session.id);
  state.selectedEncounterSessionId = next?.id || "";
  state.encounterModalOpen = Boolean(next);
  return true;
}
```

### Function useGameCornerToken — lines 42390-42424

```javascript
function useGameCornerToken(tier) {
  const player = activePlayer();
  if (!requirePrivatePrepAccess(player, "Game Corner Ticket")) return;
  const session = activeGameCornerTokenPanelSession(player);
  if (!session) {
    alert("Open the Game Corner Ticket service first.");
    return;
  }
  const tierId = normalizeGameCornerTierId(tier);
  const tokenIndex = (player.inventory || []).findIndex((item) => normalizeGameCornerTierId(gameCornerTokenTier(item)) === tierId);
  if (tokenIndex < 0) {
    console.warn("Game Corner token click reached handler, but no matching token was found.", {
      requestedTier: tier,
      normalizedTier: tierId,
      detectedTokens: gameCornerTokensForPlayer(player).map((token) => ({
        name: token.name,
        tier: token.tier,
        gameCornerTier: token.gameCornerTier,
        normalized: normalizeGameCornerTierId(gameCornerTokenTier(token))
      }))
    });
    alert(`You do not own a ${getPokemonTierLabel(tierId) || tier} GC Ticket.`);
    return;
  }
  const token = player.inventory[tokenIndex];
  createRandomPokemonSession({
    sourceType: "game-corner-token",
    sourceLabel: "Game Corner Ticket",
    player,
    tier,
    actionVisitId: session.actionVisitId,
    gameCornerSessionId: session.id,
    token
  });
}
```

### Function confirmRandomPokemonSession — lines 42426-42426

```javascript
async function confirmRandomPokemonSession(sessionId = state.selectedRandomPokemonSessionId, { skipPendingGuard = false }
```

### Function rerollRandomPokemonSession — lines 42558-42558

```javascript
async function rerollRandomPokemonSession(sessionId = state.selectedRandomPokemonSessionId, options = {}
```

### Function cancelRandomPokemonSession — lines 42725-42736

```javascript
function cancelRandomPokemonSession(sessionId = state.selectedRandomPokemonSessionId) {
  const randomSession = (state.randomPokemonSessions || []).find((entry) => entry.id === sessionId);
  if (!randomSession || randomSession.status !== "pending") return;
  randomSession.status = "cancelled";
  randomSession.cancelledAt = new Date().toISOString();
  resolvePokemonResultTimingWindow(randomSession, "canceled");
  const next = pendingRandomPokemonSessions().find((entry) => entry.id !== randomSession.id);
  state.selectedRandomPokemonSessionId = next?.id || "";
  state.randomPokemonDrawerOpen = Boolean(next);
  saveState();
  render();
}
```

### Function updateEncounterActionLog — lines 42738-42772

```javascript
function updateEncounterActionLog(session, player, updater = null) {
  const entry = (state.log || []).find((logEntry) => logEntry.type === "encounter-action"
    && (logEntry.encounterSessionId === session.id || logEntry.actionVisitId === session.actionVisitId));
  if (!entry) return null;
  entry.details ||= [];
  entry.childEvents ||= [];
  entry.categories ||= [];
  entry.tags ||= [];
  if (updater) updater(entry);
  const rolls = session.rolls || [];
  const caughtNames = rolls.map((roll) => {
    const result = (state.randomPokemonSessions || []).find((randomSession) => randomSession.id === roll.randomPokemonSessionId);
    return result?.status === "confirmed" ? result.resultDisplayName : "";
  }).filter(Boolean);
  const lines = [
    "Spent 1 Action at Encounter",
    `Rolled ${rolls.length}/${session.maxRolls || 2} Encounters`,
    caughtNames.length ? `Caught ${caughtNames.join(", ")}` : "",
    session.includeFishing ? "Fishing included" : "",
    session.includeSurf ? "Surf included" : "",
    (session.removedEntryIds || []).length ? `Removed ${(session.removedEntryIds || []).length} option${session.removedEntryIds.length === 1 ? "" : "s"}` : ""
  ].filter(Boolean);
  entry.summary = lines.join("\n");
  entry.details = [
    `Active pool: ${encounterEntriesForSession(session).map((entry) => entry.displayName || entry.pokemonName).join(", ") || "None"}`,
    `Fishing included: ${session.includeFishing ? "Yes" : "No"}`,
    `Surf included: ${session.includeSurf ? "Yes" : "No"}`,
    ...(session.removedEntryIds || []).map((id) => `Removed: ${id}`),
    ...rolls.map((roll, index) => `Roll ${index + 1}: ${roll.resultDisplayName}`)
  ];
  entry.quantity = rolls.length;
  entry.playerIds = [player.id];
  entry.encounterSessionId = session.id;
  return entry;
}
```

### Function activeEncounterSessionForPlayer — lines 42774-42779

```javascript
function activeEncounterSessionForPlayer(playerId, series = state.series, gym = state.gym) {
  return (state.encounterSessions || []).find((session) => session.playerId === playerId
    && session.series === series
    && Number(session.gym) === Number(gym)
    && ["pending", "review"].includes(session.status));
}
```

### Function startEncounterSession — lines 42781-42781

```javascript
function startEncounterSession({ skipConfirmCheck = false }
```

### Function renderGameCornerTicketResultPanel — lines 43201-43245

```javascript
function renderGameCornerTicketResultPanel(player, session) {
  if (!session) return "";
  const pending = pendingRandomPokemonSessions()
    .filter((entry) => entry.sourceType === "game-corner-token"
      && entry.gameCornerSessionId === session.id
      && (entry.resultOwnerPlayerId || entry.ownerPlayerId || entry.playerId) === player.id);
  if (!pending.length) return "";
  return `
    <section class="gc-token-use-panel gc-ticket-result-panel">
      <h3>Ticket Pokemon Wheel</h3>
      <p>Resolve each pending ticket result here. Confirming consumes the ticket; canceling leaves it unused.</p>
      <div class="gc-ticket-result-stack">
        ${pending.map((entry) => {
          const metadata = entry.resultMetadata || {};
          const notes = [
            metadata.extraCost ? `Extra cost note: ${formatMoney(metadata.extraCost)}` : "",
            metadata.extraRequirement ? `Requirement: ${metadata.extraRequirement}` : "",
            metadata.note || ""
          ].filter(Boolean);
          const rerollTokenCount = (player.inventory || []).filter(isRerollToken).length;
          return `
            <article class="random-pokemon-result-card gc-ticket-result-card">
              <div class="random-pokemon-result-header">
                <div>
                  <p class="eyebrow">${escapeHtml(entry.tokenName || entry.sourceLabel || "Game Corner Ticket")}</p>
                  <h3>${escapeHtml(entry.resultDisplayName || "Unknown Pokemon")}</h3>
                  <span>${escapeHtml(pokemonBattleTierSummary(entry.resultDisplayName || entry.resultPokemonName, "Unassigned"))}</span>
                </div>
                <div class="random-pokemon-art">
                  ${entry.resultSprite ? `<img src="${escapeHtml(entry.resultSprite)}" alt="${escapeHtml(entry.resultDisplayName || "Pokemon")}">` : `<span>${escapeHtml((entry.resultDisplayName || "PK").slice(0, 2).toUpperCase())}</span>`}
                </div>
              </div>
              ${notes.length ? `<ul class="random-pokemon-notes">${notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}</ul>` : `<p class="random-pokemon-notes empty">No extra cost or requirement notes.</p>`}
              <div class="random-pokemon-actions">
                <button class="buy-button" type="button" data-confirm-random-pokemon="${escapeHtml(entry.id)}">Confirm / Add Pokemon</button>
                <button class="ghost-button" type="button" data-reroll-random-pokemon="${escapeHtml(entry.id)}"${rerollTokenCount ? "" : " disabled"}>Owner Reroll${rerollTokenCount ? ` (${rerollTokenCount})` : ""}</button>
                <button class="ghost-button" type="button" data-cancel-random-pokemon="${escapeHtml(entry.id)}">Cancel Result</button>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    </section>
  `;
}
```

### Function getRouteViewForPlayer — lines 45222-45241

```javascript
function getRouteViewForPlayer(routeState, routeNumber, playerId) {
  const route = v2FindRoute(routeState, routeNumber);
  if (!route) return null;
  const publicView = getRoutePublicView(route);
  const publicIds = new Set(publicView.publicDiscoveries.map((resident) => resident.residentId));
  const privateIds = new Set(route.privateKnowledgeByPlayerId?.[playerId] || []);
  const privateDiscoveries = (route.residents || [])
    .filter((resident) => privateIds.has(resident.residentId) && !publicIds.has(resident.residentId))
    .map(v2ResidentSafeView);
  return {
    ...publicView,
    privateDiscoveries,
    knownResidents: [...publicView.publicDiscoveries, ...privateDiscoveries],
    unresolvedEncounter: (route.encounterResults || []).find((result) => result.playerId === playerId && result.status === "unresolved") || null,
    pendingOpportunities: getPendingRouteOpportunitiesForPlayer(routeState, playerId).filter((opportunity) => opportunity.routeNumber === route.routeNumber),
    activeVisibleEffects: getVisibleRouteEffectsForPlayer(routeState, route.routeNumber, playerId),
    extraEncounterLegal: route.routeNumber <= v2CurrentProgressionRoute(),
    masterBallEligibleResidents: [...publicView.publicDiscoveries, ...privateDiscoveries]
  };
}
```

### Function v2PurchaseExtraEncounter — lines 45491-45491

```javascript
function v2PurchaseExtraEncounter(playerId, options = {}
```

### Function v2UseExtraEncounter — lines 45546-45546

```javascript
function v2UseExtraEncounter(playerId, routeNumber, tokenInventoryId, options = {}
```

### Function purchaseV2ExtraEncounter — lines 46226-46233

```javascript
function purchaseV2ExtraEncounter() {
  try {
    v2PurchaseExtraEncounter(activePlayer().id);
    v2PersistAndRender();
  } catch (error) {
    alert(error.message || "Unable to purchase Extra Encounter.");
  }
}
```

### Function useV2ExtraEncounter — lines 46235-46251

```javascript
function useV2ExtraEncounter(routeNumber, tokenInventoryId = "") {
  try {
    const player = activePlayer();
    const tokenId = tokenInventoryId || v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.extraEncounter)[0]?.id || "";
    const operation = v2UseExtraEncounter(player.id, routeNumber, tokenId);
    const workspace = v2RouteWorkspaceState(state.series);
    workspace.screen = "result";
    workspace.selectedActionId = "extra-encounter";
    workspace.selectedRouteNumber = Number(routeNumber);
    workspace.activeActionId = operation.operationId;
    state.routeUiState = normalizeRouteUiState(state.routeUiState);
    state.routeUiState.activeRouteActionIdBySeriesId[state.series] = operation.operationId;
    v2PersistRenderAndPublishRouteActivity({ stage: "encountered", actorPlayerId: player.id, seriesId: state.series, routeNumber });
  } catch (error) {
    alert(error.message || "Unable to use Extra Encounter.");
  }
}
```

### Function getRouteEncounterRailCapabilitiesForPlayer — lines 46445-46494

```javascript
function getRouteEncounterRailCapabilitiesForPlayer(routeState, routeNumber, playerId) {
  const route = v2FindRoute(routeState, routeNumber);
  const player = state.players.find((entry) => entry.id === playerId);
  if (!route || !player) {
    return {
      extra: { storedCount: 0, canBuy: false, canUse: false, tokenId: "", blockReason: "Route or player not found." },
      typeInjection: { canInject: false, options: [], opportunityId: "" },
      effects: []
    };
  }
  const workspace = v2RouteWorkspaceState(routeState.seriesId || state.series);
  const pendingOpportunity = v2RoutePendingOpportunityForPlayer(routeState, route.routeNumber, playerId, workspace.activeOpportunityId);
  const extraTokens = v2RouteInventoryTokens(player, V2_ROUTE_TOKEN_IDS.extraEncounter);
  const extraEligible = v2EligibleResidents(route, [], { routeState, playerId });
  const progressionLegal = route.routeNumber <= v2CurrentProgressionRoute();
  const extraCanUse = progressionLegal
    && !pendingOpportunity
    && extraTokens.length
    && extraEligible.length
    && v2RouteHasPositiveEncounterWeight(extraEligible);
  const injectionOptions = v2TemporaryInjectionOptionsForOpportunity(routeState, pendingOpportunity, playerId);
  const injectionFallbackOptions = injectionOptions.length ? injectionOptions : v2PrimaryTypeInjectionRailOptions();
  return {
    extra: {
      storedCount: extraTokens.length,
      canBuy: Number(player.balance || 0) >= V2_EXTRA_ENCOUNTER_PRICE,
      canUse: Boolean(extraCanUse),
      tokenId: extraTokens[0]?.id || "",
      routeNumber: route.routeNumber,
      blockReason: extraCanUse ? "" : (
        !progressionLegal ? "Extra Encounter cannot target a Route above current progression."
          : pendingOpportunity ? "Resolve the pending Route opportunity first."
            : !extraTokens.length ? "No stored Extra Encounter."
              : "No eligible Route encounter is available."
      )
    },
    typeInjection: {
      canInject: injectionOptions.length > 0,
      options: injectionFallbackOptions,
      opportunityId: injectionOptions.length ? (pendingOpportunity?.opportunityId || "") : "",
      activationId: injectionOptions.length ? v2RouteInjectionActivationId(routeState, pendingOpportunity) : "",
      blockReason: injectionOptions.length
        ? ""
        : pendingOpportunity
          ? "Type Injection source unavailable."
          : "No pending Route opportunity."
    },
    effects: getRouteEffectCapabilitiesForPlayer(routeState, route.routeNumber, playerId)
  };
}
```

### Function renderRandomPokemonPanel — lines 46880-46941

```javascript
function renderRandomPokemonPanel() {
  const pending = pendingRandomPokemonSessions();
  if (!pending.length) state.randomPokemonDrawerOpen = false;
  if (!els.randomPokemonTab || !els.randomPokemonPanel) return;
  els.randomPokemonTab.classList.toggle("hidden", !pending.length);
  els.randomPokemonTab.textContent = pending.length ? `Pokemon Result (${pending.length})` : "Pokemon Result";
  const isOpen = Boolean(pending.length && state.randomPokemonDrawerOpen);
  els.randomPokemonColumn.classList.toggle("drawer-open", isOpen);
  els.randomPokemonPanel.classList.toggle("open", isOpen);
  els.randomPokemonTab.setAttribute("aria-expanded", String(isOpen));
  const session = selectedRandomPokemonSession();
  if (!pending.length || !session) {
    els.randomPokemonSessionList.innerHTML = "";
    els.randomPokemonSessionDetail.innerHTML = "";
    return;
  }
  els.randomPokemonSessionList.replaceChildren(...pending.map((entry) => {
    const entryPlayer = state.players.find((candidate) => candidate.id === (entry.resultOwnerPlayerId || entry.ownerPlayerId || entry.playerId));
    const button = document.createElement("button");
    button.type = "button";
    button.className = `wheel-session-card${entry.id === session.id ? " active" : ""}`;
    button.dataset.randomPokemonSession = entry.id;
    button.innerHTML = `
      <strong>${escapeHtml(entry.sourceLabel || "Pokemon Result")}</strong>
      <span>${escapeHtml(entryPlayer?.name || "Unknown")} - ${escapeHtml(pokemonBattleTierSummary(entry.resultDisplayName || entry.resultPokemonName, "Unassigned"))} - ${entry.series} G${entry.gym}</span>
      <em>${escapeHtml(entry.resultDisplayName || "Pending result")}</em>
    `;
    return button;
  }));
  const player = state.players.find((entry) => entry.id === (session.resultOwnerPlayerId || session.ownerPlayerId || session.playerId));
  const metadata = session.resultMetadata || {};
  const isRevealing = !session.revealSeen;
  if (isRevealing) session.revealSeen = true;
  const rerollTokenCount = player ? (player.inventory || []).filter(isRerollToken).length : 0;
  const notes = [
    metadata.extraCost ? `Extra cost note: ${formatMoney(metadata.extraCost)}` : "",
    metadata.extraRequirement ? `Requirement: ${metadata.extraRequirement}` : "",
    metadata.note || ""
  ].filter(Boolean);
  els.randomPokemonSessionDetail.innerHTML = `
    <article class="random-pokemon-result-card${isRevealing ? " revealing" : ""}">
      <div class="random-pokemon-result-header">
        <div>
          <p class="eyebrow">${escapeHtml(session.sourceLabel || "Random Pokemon")}</p>
          <p class="random-pokemon-reveal-text">Rolling result...</p>
          <h3>${escapeHtml(session.resultDisplayName || "Unknown Pokemon")}</h3>
          <span>${escapeHtml(player?.name || "Unknown Trainer")} - ${escapeHtml(pokemonBattleTierSummary(session.resultDisplayName || session.resultPokemonName, "Unassigned"))}</span>
        </div>
        <div class="random-pokemon-art">
          ${session.resultSprite ? `<img src="${escapeHtml(session.resultSprite)}" alt="${escapeHtml(session.resultDisplayName || "Pokemon")}">` : `<span>${escapeHtml((session.resultDisplayName || "PK").slice(0, 2).toUpperCase())}</span>`}
        </div>
      </div>
      ${session.tokenName ? `<p class="random-pokemon-token">Token pending: ${escapeHtml(session.tokenName)}</p>` : ""}
      ${notes.length ? `<ul class="random-pokemon-notes">${notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}</ul>` : `<p class="random-pokemon-notes empty">No extra cost or requirement notes.</p>`}
      <div class="random-pokemon-actions">
        <button class="buy-button" type="button" data-confirm-random-pokemon="${escapeHtml(session.id)}">Confirm / Add Pokemon</button>
        <button class="ghost-button" type="button" data-cancel-random-pokemon="${escapeHtml(session.id)}">Cancel Result</button>
        <button class="ghost-button" type="button" data-reroll-random-pokemon="${escapeHtml(session.id)}"${rerollTokenCount ? "" : " disabled"} title="${rerollTokenCount ? `Spend ${player?.name || "the owner"}'s Reroll Token to replace this pending result.` : `${player?.name || "The owner"} needs a Reroll Token.`}">Owner Reroll${rerollTokenCount ? ` (${rerollTokenCount})` : " Token Required"}</button>
      </div>
    </article>
  `;
}
```

### Function completeEncounterRoll — lines 46943-46997

```javascript
async function completeEncounterRoll(sessionId, entryId) {
  const session = (state.encounterSessions || []).find((entry) => entry.id === sessionId);
  if (!session || session.status !== "pending") return;
  session.isSpinning = false;
  session.pendingEntryId = "";
  const player = state.players.find((entry) => entry.id === session.playerId) || activePlayer();
  const entries = encounterEntriesForSession(session);
  const visualResult = entries.find((entry) => entry.id === entryId) || weightedEncounterEntry(entries);
  const { result, special } = resolveEncounterSpecialResult(visualResult);
  if (!result || (session.rolls || []).length >= Number(session.maxRolls || 2)) return;
  const roll = {
    id: `encounter-roll-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    encounterSessionId: session.id,
    actionVisitId: session.actionVisitIds?.[Math.floor((session.rolls || []).length / Number(encounterWheelDefinition(session.series, session.gym)?.rollsPerAction || 2))] || session.actionVisitId,
    playerId: player.id,
    series: session.series,
    gym: Number(session.gym),
    entryId: result.id,
    visualEntryId: visualResult?.id || result.id,
    resultPokemonName: result.pokemonName || result.displayName,
    resultDisplayName: result.displayName || result.pokemonName,
    resultSprite: "",
    chosenSpriteKey: "",
    category: result.category || "land",
    weight: Number(result.weight || 1),
    specialEncounter: special,
    timestamp: new Date().toISOString()
  };
  await hydrateEncounterRollSprite(roll);
  session.rolls ||= [];
  session.rolls.push(roll);
  updateEncounterActionLog(session, player, (entry) => {
    appendLogCategory(entry, "wheel");
    appendUniqueLogValue(entry, "tags", "encounter-roll");
    appendUniqueLogValue(entry, "pokemonNames", roll.resultDisplayName);
    entry.childEvents ||= [];
    entry.childEvents.push({
      type: "encounter-roll",
      category: "wheel",
      result: roll.resultDisplayName,
      specialEncounter: special,
      encounterRollId: roll.id,
      encounterSessionId: session.id,
      actionVisitId: session.actionVisitId,
      timestamp: roll.timestamp
    });
    if (special) appendGroupedLogDetail(entry, `${special.triggerName} opened ${special.wheelName}: ${special.resultName}.`);
  });
  if (session.rolls.length >= Number(session.maxRolls || 2)) {
    session.status = "review";
    session.completedAt = new Date().toISOString();
  }
  saveState();
  render();
}
```

### Function spinEncounterWheel — lines 46999-47041

```javascript
function spinEncounterWheel(sessionId = state.selectedEncounterSessionId) {
  const session = (state.encounterSessions || []).find((entry) => entry.id === sessionId);
  if (!session || session.status !== "pending" || session.isSpinning) return;
  if ((session.rolls || []).length >= Number(session.maxRolls || 2)) return;
  const entries = encounterEntriesForSession(session);
  if (!entries.length) {
    alert("No valid Pokemon are available on this Encounter Wheel. Banned Pokemon are excluded.");
    return;
  }
  const result = weightedEncounterEntry(entries);
  if (!result) return;
  session.pendingEntryId = result.id;
  const nextRotation = nextEncounterLandingRotation(session, entries, result.id);
  session.visualRotation = nextRotation;
  if (state.skipWheelAnimation) {
    completeEncounterRoll(session.id, result.id);
    return;
  }
  session.isSpinning = true;
  saveState();
  const wheelVisual = els.encounterOverlay?.querySelector(".encounter-wheel-visual");
  const wheelDisc = wheelVisual?.querySelector(".wheel-disc");
  const latestResult = els.encounterOverlay?.querySelector(".wheel-latest-result");
  const rollButton = els.encounterOverlay?.querySelector(`[data-encounter-roll="${session.id}"]`);
  const liveDisplay = els.encounterOverlay?.querySelector("[data-encounter-live-display]");
  if (liveDisplay) liveDisplay.dataset.finalEntryId = result.id;
  if (wheelVisual && wheelDisc) {
    wheelVisual.classList.add("spinning");
    wheelDisc.getBoundingClientRect();
    wheelDisc.style.setProperty("--wheel-rotation", `${Number(nextRotation || 0)}deg`);
    animateEncounterLivePointer(els.encounterOverlay, 5200);
  } else {
    renderEncounterOverlay();
  }
  if (latestResult) {
    latestResult.innerHTML = "<span>Passing</span><strong>Spinning...</strong>";
  }
  if (rollButton) {
    rollButton.disabled = true;
    rollButton.textContent = "Spinning...";
  }
  window.setTimeout(() => completeEncounterRoll(session.id, result.id), 5200);
}
```

### Function closeEncounterSession — lines 47043-47043

```javascript
function closeEncounterSession(sessionId = state.selectedEncounterSessionId, { skipPendingGuard = false }
```

### Function renderEncounterOverlay — lines 47070-47215

Large function (10672 chars). First/last 35 lines:

```javascript
function renderEncounterOverlay() {
  const pending = pendingEncounterSessions();
  if (!pending.length) state.encounterModalOpen = false;
  if (!els.encounterTab || !els.encounterOverlay || !els.encounterBody) return;
  els.encounterTab.classList.toggle("hidden", !pending.length);
  els.encounterTab.textContent = pending.length ? `Encounter (${pending.length})` : "Encounter";
  const isOpen = Boolean(pending.length && state.encounterModalOpen);
  els.encounterOverlay.classList.toggle("hidden", !isOpen);
  els.encounterTab.setAttribute("aria-expanded", String(isOpen));
  const session = selectedEncounterSession();
  if (!pending.length || !session) {
    els.encounterSessionList.innerHTML = "";
    els.encounterBody.innerHTML = "";
    return;
  }
  const definition = encounterWheelDefinition(session.series, session.gym);
  const player = state.players.find((entry) => entry.id === session.playerId) || activePlayer();
  const entries = encounterEntriesForSession(session);
  const removedEntries = (definition?.entries || []).filter((entry) => (session.removedEntryIds || []).includes(entry.id));
  const max = Number(session.maxRolls || definition?.rollsPerAction || 2);
  const rolls = session.rolls || [];
  const isSpinning = Boolean(session.isSpinning);
  const weightEditing = Boolean(session.weightEditing);
  const rerollTokenCount = (player.inventory || []).filter(isRerollToken).length;
  const rollFreeRerollReasons = Object.fromEntries(rolls.map((roll) => [roll.id, encounterRollFreeRerollReason(player, roll)]));
  els.encounterTitle.textContent = definition?.name || "Encounter Wheel";
  els.encounterSessionList.replaceChildren(...pending.map((entry) => {
    const entryPlayer = state.players.find((candidate) => candidate.id === entry.playerId);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `wheel-session-card${entry.id === session.id ? " active" : ""}`;
    button.dataset.encounterSession = entry.id;
    button.innerHTML = `
      <strong>${escapeHtml(encounterWheelDefinition(entry.series, entry.gym)?.name || "Encounter Wheel")}</strong>
      <span>${escapeHtml(entryPlayer?.name || "Unknown")} - ${entry.series} G${entry.gym}</span>
...
        </div>
        <p class="gc-rule-note">Fishing and Surf are grouped for now. Later this should come from items/effects.</p>
        <h3>Active Wheel Options</h3>
        <div class="encounter-entry-list">
          ${entries.map((entry) => `
            <article class="encounter-entry${entry.id === finalEntryId ? " pointer-active" : ""}" data-encounter-entry-id="${escapeHtml(entry.id)}">
              <div>
                <strong>${escapeHtml(entry.displayName || entry.pokemonName)}</strong>
                <span>${escapeHtml(entry.category || "land")}</span>
              </div>
              ${weightEditing ? `
                <label class="encounter-weight-control">
                  Weight
                  <input type="number" min="0" step="1" value="${Number(entry.weight || 1)}" data-encounter-weight="${escapeHtml(entry.id)}"${rolls.length ? " disabled" : ""}>
                </label>
              ` : `<span class="encounter-weight-badge">W ${Number(entry.weight || 1)}</span>`}
              ${entry.removable === false ? "" : `<button class="ghost-button mini-button" type="button" data-encounter-remove="${escapeHtml(entry.id)}"${rolls.length ? " disabled" : ""}>Remove</button>`}
            </article>
          `).join("") || `<p class="empty-state compact">No active entries.</p>`}
        </div>
        ${removedEntries.length ? `
          <h3>Removed</h3>
          <div class="encounter-entry-list">
            ${removedEntries.map((entry) => `
              <article class="encounter-entry">
                <div><strong>${escapeHtml(entry.displayName || entry.pokemonName)}</strong><span>${escapeHtml(entry.category || "land")}</span></div>
                <button class="ghost-button mini-button" type="button" data-encounter-restore="${escapeHtml(entry.id)}"${rolls.length ? " disabled" : ""}>Restore</button>
              </article>
            `).join("")}
          </div>
        ` : ""}
      </section>
    </div>
  `;
}
```

### Function renderWheelPanel — lines 47217-47374

Large function (9651 chars). First/last 35 lines:

```javascript
function renderWheelPanel() {
  const active = activeWheelVisit();
  const pending = pendingWheelSessions();
  if (!pending.length) state.wheelDrawerOpen = false;
  els.wheelTab.classList.toggle("hidden", !pending.length);
  els.wheelTab.textContent = pending.length ? `Wheel (${pending.length})` : "Wheel";
  els.wheelColumn.classList.toggle("drawer-open", Boolean(pending.length && state.wheelDrawerOpen));
  els.wheelPanel.classList.toggle("open", Boolean(pending.length && state.wheelDrawerOpen));
  els.wheelTab.setAttribute("aria-expanded", String(Boolean(pending.length && state.wheelDrawerOpen)));
  if (!pending.length || !active) {
    els.wheelSessionList.innerHTML = pending.length
      ? pending.map((entry) => {
        const entryWheel = wheelDefinitionById(entry.wheelId);
        const entryPlayer = state.players.find((candidate) => candidate.id === entry.playerId);
        return `
          <button type="button" class="wheel-session-card" data-session-id="${escapeHtml(entry.id)}">
            <strong>${escapeHtml(entryWheel?.name || entry.wheelId || "Wheel Session")}</strong>
            <span>${escapeHtml(entryPlayer?.name || "Unknown")} - ${escapeHtml(entry.sourceLabel || "Pending")}</span>
            <em>Needs refresh</em>
          </button>
        `;
      }).join("")
      : "";
    els.wheelSessionDetail.classList.add("hidden");
    if (pending.length) {
      els.wheelSessionList.querySelectorAll("[data-session-id]").forEach((button) => {
        button.addEventListener("click", () => {
          state.selectedWheelSessionId = button.dataset.sessionId;
          saveState();
          renderWheelPanel();
        });
      });
    }
    return;
  }
...
  els.wheelOutcomes.innerHTML = visualOutcomes.map((outcome) => `
    <div class="wheel-outcome ${isTrainerClassWheel ? "trainer-class-outcome" : ""} ${activeOutcomeId === outcome.id ? "pointer-active" : ""} ${escapeHtml(outcome.visualClass || "")}" data-wheel-outcome-id="${escapeHtml(outcome.id)}" style="--outcome-color:${outcome.color}">
      <strong>${escapeHtml(outcome.label)}</strong>
      ${isTrainerClassWheel ? "" : `<span>${Math.round((Number(outcome.weight || 0) / totalWeight) * 100)}%</span>`}
      ${outcome.description ? `<small>${escapeHtml(outcome.description)}</small>` : ""}
    </div>
  `).join("");
  els.wheelLatestResult.dataset.segments = JSON.stringify(pointerSegments);
  els.wheelLatestResult.dataset.finalOutcomeId = latest?.outcomeId || "";
  els.wheelLatestResult.classList.toggle("trainer-class-result", isTrainerClassWheel);
  els.wheelLatestResult.innerHTML = visualSpinActive
    ? `<span>Passing</span><strong>Spinning...</strong>`
    : latest
      ? `<span>${isTrainerClassWheel ? "Class result" : "Latest result"}</span><strong>${escapeHtml(latest.outcomeLabel)}${latest.reward?.name && latest.reward.name !== latest.outcomeLabel ? ` - ${escapeHtml(latest.reward.name)}` : ""}</strong>`
      : isTrainerClassWheel
        ? `<strong>Ready to roll a trainer class.</strong>`
        : `<span>Ready</span><strong>No spins yet.</strong>`;
  const trainerClassCanReroll = isTrainerClassWheel && isReviewing && rolls.length > 0;
  els.spinWheel.disabled = isSpinning || (!trainerClassCanReroll && (isReviewing || remaining <= 0 || !canAfford));
  els.spinWheel.textContent = isSpinning
    ? "Spinning..."
    : trainerClassCanReroll
      ? "Reroll Class"
      : isReviewing
        ? "Results Ready"
        : remaining <= 0
          ? "Max Spins Used"
          : canAfford ? (isSlotMachine ? "Spin Slots - $2,000" : "Spin") : "Insufficient Funds";
  els.finishWheelSession.textContent = isReviewing ? "Done / Close Session" : "Finish Session";
  els.finishWheelSession.disabled = wheel.id === "trainerClassWheel" && !rolls.length && !isReviewing;
  els.skipWheelAnimation.checked = Boolean(state.skipWheelAnimation);
  els.wheelHistory.innerHTML = rolls.length
    ? rolls.map((roll, index) => `<div><strong>#${index + 1}: ${escapeHtml(roll.outcomeLabel)}</strong>${isTrainerClassWheel ? `<span>${roll.reroll ? "Reroll" : "Initial roll"}</span>` : `<span>${roll.cost ? formatMoney(roll.cost) : ""}${roll.reward ? ` - ${escapeHtml(roll.reward.name)}` : ""}</span>`}</div>`).join("")
    : `<p class="empty-state compact">Spin results for this visit will appear here.</p>`;
}
```

### Function prepareTokenSandboxCommitState — lines 48523-48569

```javascript
function prepareTokenSandboxCommitState(workingState, baseline, info) {
  const candidate = globalThis.rivalSagaTokenSandbox.prepareCommitCandidate({
    workingState,
    baselineState: baseline
  });
  const origin = {
    sessionId: info.id,
    scenarioName: info.scenarioName,
    committedAt: new Date().toISOString()
  };
  [
    "log",
    "effectAuditRecords",
    "effectOperations",
    "interactionEvents",
    "transactions",
    "tokenConsumptions",
    "tokenActivations",
    "playerNotifications",
    "lingeringStatuses",
    "randomPokemonSessions",
    "encounterSessions",
    "wheelSessions"
  ].forEach((key) => markSandboxCollectionChanges(candidate, baseline, key, origin));
  candidate.chronologyCounter = Number(candidate.chronologyCounter || 0) + 1;
  candidate.log ||= [];
  candidate.log.unshift({
    id: `sandbox-commit-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    action: "admin",
    category: "admin",
    player: "Admin Tools",
    item: `Committed Token Sandbox: ${info.scenarioName}`,
    title: "Sandbox scenario committed",
    summary: `Session ${info.id} entered real history after revision validation.`,
    details: [`Entry revision: ${info.entryRevision}`, `Controlled player: ${info.controlledPlayerName || info.controlledPlayerId || "Unknown"}`],
    type: "token-scenario-commit",
    tags: ["admin", "testing", "token-scenario", "sandbox-origin", info.id],
    sandboxOrigin: { ...origin },
    eventOrder: candidate.chronologyCounter,
    timestamp: new Date().toISOString()
  });
  candidate.sandboxCommitHistory = [
    ...(Array.isArray(candidate.sandboxCommitHistory) ? candidate.sandboxCommitHistory : []),
    { ...origin, entryRevision: info.entryRevision, controlledPlayerId: info.controlledPlayerId }
  ];
  return candidate;
}
```

### Function render — lines 50005-50153

```javascript
function render() {
  const player = activePlayer();
  if (!TOP_LEVEL_PAGE_IDS.includes(state.activePage)) state.activePage = "playerHub";
  const activePage = state.activePage || "playerHub";
  if (!PLAYER_HUB_VIEW_IDS.includes(state.activeView)) state.activeView = "sheet";
  ensureGymPhaseState();
  expireLingeringStatuses();
  applyTheme(player.theme || player.id || "saga");
  applyHeaderTheme(player.headerTheme || "default");
  els.seriesSelect.value = state.series;
  els.gymSelect.value = String(state.gym);
  renderPhaseControl();
  const freeTestingMode = hostTestingOverrideEnabled();
  document.body?.classList.toggle("free-testing-mode", freeTestingMode);
  els.actionDemoBadge?.classList.toggle("active", freeTestingMode);
  els.actionDemoBadge?.setAttribute("aria-label", freeTestingMode ? "Demo Mode is on" : "Open Demo Mode controls");
  if (!freeTestingMode) {
    els.actionDemoBadge?.setAttribute("aria-expanded", "false");
    els.actionDemoNotice?.classList.add("hidden");
  }
  els.activePlayerName.textContent = player.name;
  syncPlayerOptionLabels();
  els.trainerMetaLine.textContent = player.title || "No title unlocked";
  els.activeTrainerClass.textContent = player.trainerClass || "None";
  els.activeTrainerClassDetail.textContent = player.trainerClass || "None";
  els.activeClassOrigin.textContent = player.classOrigin || "None";
  const activePrepAccess = privatePrepAccessForPlayer(player, "trainer prep");
  els.trainerCard?.classList.toggle("private-prep-denied", !activePrepAccess.allowed);
  [els.addPerk, els.addBuff, els.addNerf, els.trainerAvatarButton, els.themeToggle, els.globalThemeToggle].forEach((button) => {
    if (!button) return;
    button.disabled = !activePrepAccess.allowed;
    button.title = activePrepAccess.allowed ? button.getAttribute("aria-label") || "" : activePrepAccess.reason;
  });
  if (els.activeClassOrigin) {
    els.activeClassOrigin.contentEditable = activePrepAccess.allowed ? "true" : "false";
    els.activeClassOrigin.tabIndex = activePrepAccess.allowed ? 0 : -1;
    els.activeClassOrigin.title = activePrepAccess.allowed ? "" : activePrepAccess.reason;
  }
  if (els.activeTrainerClassDetail) {
    els.activeTrainerClassDetail.title = activePrepAccess.allowed ? "Choose trainer class" : activePrepAccess.reason;
  }
  const derivedRecords = derivedPlayerRecords(player);
  els.activeSeriesRecord.textContent = formatRecord(derivedRecords.seriesRecord);
  els.activeRecord.textContent = formatRecord(derivedRecords.overallRecord);
  els.activeMomentum.textContent = String(player.momentum ?? 0);
  els.activeSagaPoints.textContent = String(player.sagaPoints ?? 0);
  els.activeItemAccess.textContent = shopProgressLabel(player, "items");
  els.activeTmAccess.textContent = shopProgressLabel(player, "tms");
  els.activeRangerCredits.textContent = String(ensureActionSeriesTracker(state.series, player.id).rangerCredits || 0);
  if (els.activeBadgePoints) els.activeBadgePoints.textContent = String(player.badgePoints || 0);
  els.activeBalance.textContent = formatMoney(player.balance);
  els.activeBalance.title = "Open money ledger";
  els.activeBalance.tabIndex = 0;
  els.activeBalance.classList.add("clickable-balance");
  renderPlayerNotifications(player);
  renderTrainerProfilePanel(player);
  if (player.avatarUrl) {
    els.activeTrainerAvatar.src = player.avatarUrl;
    els.activeTrainerAvatar.parentElement.classList.add("has-image");
  } else {
    els.activeTrainerAvatar.removeAttribute("src");
    els.activeTrainerAvatar.parentElement.classList.remove("has-image");
  }
  els.playerHubView.classList.toggle("hidden", activePage !== "playerHub");
  els.actionPhaseView.classList.toggle("hidden", activePage !== "actionPhase");
  els.leaderboardView.classList.toggle("hidden", activePage !== "leaderboard");
  els.mvpRaceView.classList.toggle("hidden", activePage !== "mvpRace");
  els.battlePhaseView.classList.toggle("hidden", activePage !== "battlePhase");
  els.banlistView.classList.toggle("hidden", activePage !== "banlist");
  els.infoView?.classList.toggle("hidden", activePage !== "info");
  placeSharedTrainerCard(activePage, state.activeView);
  const logClosed = state.activityLogCollapsed !== false;
  els.layout.classList.toggle("log-open", !logClosed);
  els.layout.classList.remove("live-referee-open", "live-referee-collapsed", "live-referee-expanded");
  els.detailsColumn.classList.toggle("drawer-open", !logClosed);
  els.activityPanel.classList.toggle("open", !logClosed);
  els.activityLogContent.classList.remove("hidden");
  els.toggleActivityLog.textContent = "Close";
  els.toggleActivityLog.setAttribute("aria-expanded", String(!logClosed));
  els.activityLogTab.setAttribute("aria-expanded", String(!logClosed));
  const visibleLogCount = (state.log || []).filter((entry) => !entry.undone).length;
  els.activityLogTab.textContent = logClosed ? (visibleLogCount ? `Log ${visibleLogCount}` : "Log") : "Close Log";
  els.activityLogTab.setAttribute("aria-label", logClosed ? `Open Activity Log${visibleLogCount ? `, ${visibleLogCount} entries` : ""}` : "Close Activity Log");
  if (els.liveRefereeColumn) {
    els.liveRefereeColumn.hidden = Boolean(state.liveRefereeCollapsed);
  }
  document.querySelectorAll(".top-level-tab").forEach((tab) => {
    if (tab.dataset.gameRibbon || tab.dataset.leagueDestination) return;
    tab.classList.toggle("active", tab.dataset.page === activePage);
  });
  els.shopView.classList.toggle("hidden", state.activeView !== "shop");
  els.teambuilderView?.classList.toggle("hidden", state.activeView !== "teambuilder");
  els.actionsView.classList.toggle("hidden", state.activeView !== "actions");
  els.sheetView.classList.toggle("hidden", state.activeView !== "sheet");
  document.querySelectorAll(".app-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.view === state.activeView);
  });
  renderEffectPills(els.activePerks, player.perks || [], "No perks", "perk");
  renderActiveBulletinQuests(player);
  renderEffectPills(els.activeBuffs, player.buffs || [], "No buffs", "buff");
  renderEffectPills(els.activeNerfs, player.nerfs || [], "No nerfs", "nerf");
  renderGlobalThemeMenu(player);
  renderHeaderThemeMenu(player);

  renderTrainerMenu();
  if (activePage === "playerHub") {
    if (state.activeView === "shop") {
      renderShop(player);
    } else if (state.activeView === "teambuilder") {
      renderTeambuilder(player);
    } else if (state.activeView === "actions") {
      renderActionBuilder();
    } else {
      renderInventory(player);
      renderSheet(player);
    }
  } else if (activePage === "actionPhase") {
    renderActionPhase();
  } else if (activePage === "leaderboard") {
    renderLeaderboard();
  } else if (activePage === "mvpRace") {
    renderMvpRace();
  } else if (activePage === "battlePhase") {
    renderBattlePhase();
  } else if (activePage === "banlist") {
    renderBanlist();
  } else if (activePage === "info") {
    renderInfoPage();
  }
  renderPerkTestRoller();
  if (state.activityLogCollapsed === false) {
    renderActivityFilters();
    renderLog();
  }
  renderActivityToasts();
  renderActivityResponseDrawer();
  renderLiveRefereePanel();
  renderOpponentDrawer();
  renderCart();
  renderEncounterOverlay();
  renderWheelPanel();
  renderRandomPokemonPanel();
  renderSiteShell();
  syncTokenSandboxBanner();
  if (actionPhaseStateRepairQueued && !backendSync.applyingRemote && !tokenScenarioSandboxActive()) {
    actionPhaseStateRepairQueued = false;
    saveState({ immediate: true, immediateBackend: true });
  }
}
```

### Function applyShopTheme — lines 50155-50222

```javascript
function applyShopTheme(root, colors, contrast) {
  const onBrand = colors.onBrand || "#ffffff";
  const lightSurface = relativeLuminance(colors.surface) >= 0.62;
  const shopPageBg = lightSurface
    ? `linear-gradient(180deg, color-mix(in srgb, ${colors.surface} 88%, ${colors.brand} 12%), color-mix(in srgb, ${colors.surface} 94%, ${colors.bg} 6%))`
    : `linear-gradient(180deg, color-mix(in srgb, ${colors.bg} 86%, ${colors.brand} 14%), ${colors.bg})`;
  const shopPanelBg = lightSurface
    ? `color-mix(in srgb, ${colors.surface} 88%, ${colors.brand} 12%)`
    : `color-mix(in srgb, ${colors.surface} 88%, ${colors.brand} 12%)`;
  const shopPanelBgStrong = lightSurface
    ? `color-mix(in srgb, ${colors.surface} 82%, ${colors.brand} 18%)`
    : `color-mix(in srgb, ${colors.surface2} 82%, ${colors.brand} 18%)`;
  const shopSectionHeaderBg = lightSurface
    ? `color-mix(in srgb, ${colors.surface} 86%, ${colors.brand} 14%)`
    : `color-mix(in srgb, ${colors.surface2} 86%, ${colors.brand} 14%)`;
  const shopCardBg = lightSurface
    ? `color-mix(in srgb, ${colors.surface} 95%, ${colors.brand} 5%)`
    : colors.surface;
  const shopCardBgAccent = lightSurface
    ? `color-mix(in srgb, ${colors.surface} 90%, ${colors.brand} 10%)`
    : `color-mix(in srgb, ${colors.surface} 86%, ${colors.brand} 14%)`;
  const shopInputBg = lightSurface
    ? `color-mix(in srgb, ${colors.surface} 92%, ${colors.brand} 8%)`
    : `color-mix(in srgb, ${colors.surface} 86%, ${colors.bg} 14%)`;
  const shopBorder = lightSurface
    ? `color-mix(in srgb, ${colors.line} 62%, ${colors.brand} 38%)`
    : `color-mix(in srgb, ${colors.line} 82%, transparent)`;
  const shopSecondary = lightSurface
    ? `color-mix(in srgb, ${colors.surface} 90%, ${colors.brand} 10%)`
    : contrast.surface;
  const shopSecondaryBorder = lightSurface
    ? `color-mix(in srgb, ${colors.line} 72%, ${colors.brand} 28%)`
    : contrast.line;
  const shopTooltipBg = lightSurface
    ? `color-mix(in srgb, ${colors.ink} 92%, ${colors.brand} 8%)`
    : `color-mix(in srgb, ${colors.surface2} 88%, ${colors.brand} 12%)`;
  root.style.setProperty("--shop-page-bg", colors.shopPageBg || shopPageBg);
  root.style.setProperty("--shop-panel-bg", colors.shopPanelBg || shopPanelBg);
  root.style.setProperty("--shop-panel-bg-strong", colors.shopPanelBgStrong || shopPanelBgStrong);
  root.style.setProperty("--shop-section-header-bg", colors.shopSectionHeaderBg || shopSectionHeaderBg);
  root.style.setProperty("--shop-card-bg", colors.shopCardBg || shopCardBg);
  root.style.setProperty("--shop-card-bg-accent", colors.shopCardBgAccent || shopCardBgAccent);
  root.style.setProperty("--shop-input-bg", colors.shopInputBg || shopInputBg);
  root.style.setProperty("--shop-border", colors.shopBorder || shopBorder);
  root.style.setProperty("--shop-border-hover", colors.shopBorderHover || `color-mix(in srgb, ${colors.brand} 62%, ${colors.line})`);
  root.style.setProperty("--shop-primary", colors.shopPrimary || colors.brand);
  root.style.setProperty("--shop-primary-ink", colors.shopPrimaryInk || onBrand);
  root.style.setProperty("--shop-secondary", colors.shopSecondary || shopSecondary);
  root.style.setProperty("--shop-secondary-border", colors.shopSecondaryBorder || shopSecondaryBorder);
  root.style.setProperty("--shop-secondary-ink", colors.shopSecondaryInk || (lightSurface ? colors.ink : contrast.ink));
  root.style.setProperty("--shop-text", colors.shopText || colors.ink);
  root.style.setProperty("--shop-muted", colors.shopMuted || colors.muted);
  root.style.setProperty("--shop-token-ring", colors.shopTokenRing || `color-mix(in srgb, ${colors.brand} 65%, ${colors.line})`);
  root.style.setProperty("--shop-token-ring-muted", colors.shopTokenRingMuted || `color-mix(in srgb, ${colors.line} 66%, ${colors.brand} 34%)`);
  root.style.setProperty("--shop-token-surface", colors.shopTokenSurface || (lightSurface ? `color-mix(in srgb, ${colors.surface} 90%, ${colors.brand} 10%)` : `color-mix(in srgb, ${colors.surface} 82%, ${colors.brand} 18%)`));
  root.style.setProperty("--shop-token-price-bg", colors.shopTokenPriceBg || (lightSurface ? `color-mix(in srgb, ${colors.surface} 80%, ${colors.brand} 20%)` : `color-mix(in srgb, ${colors.surface2} 70%, ${colors.brand} 30%)`));
  root.style.setProperty("--shop-token-action-bg", colors.shopTokenActionBg || colors.brand);
  root.style.setProperty("--shop-token-action-border", colors.shopTokenActionBorder || `color-mix(in srgb, ${colors.brand} 70%, ${colors.line})`);
  root.style.setProperty("--shop-token-glow", colors.shopTokenGlow || `color-mix(in srgb, ${colors.brand} ${lightSurface ? 14 : 24}%, transparent)`);
  root.style.setProperty("--shop-tooltip-bg", colors.shopTooltipBg || shopTooltipBg);
  root.style.setProperty("--shop-tooltip-text", colors.shopTooltipText || (lightSurface ? colors.surface : contrast.ink));
  root.style.setProperty("--shop-control-accent", colors.shopControlAccent || colors.danger);
  root.style.setProperty("--shop-curse-accent", colors.shopCurseAccent || colors.brandDark);
  root.style.setProperty("--shop-encounter-accent", colors.shopEncounterAccent || colors.gold);
  root.style.setProperty("--shop-protection-accent", colors.shopProtectionAccent || colors.brand);
  root.style.setProperty("--shop-game-corner-accent", colors.shopGameCornerAccent || colors.gold);
  root.style.setProperty("--shop-field-accent", colors.shopFieldAccent || colors.brandDark);
}
```

### Function applyTheme — lines 50224-50278

```javascript
function applyTheme(themeId) {
  const theme = themes[themeId] || themes.midnightRed || Object.values(themes)[0];
  const root = document.documentElement;
  const contrast = contrastSurfaceTokens(theme.colors.surface2, theme.colors.ink, theme.colors.muted, theme.colors.line);
  const lightTheme = relativeLuminance(theme.colors.surface) >= 0.62;
  const accent2 = theme.colors.accent2 || theme.colors.gold || theme.colors.brandDark;
  root.style.setProperty("--bg", theme.colors.bg);
  root.style.setProperty("--surface", theme.colors.surface);
  root.style.setProperty("--surface-2", theme.colors.surface2);
  root.style.setProperty("--ink", theme.colors.ink);
  root.style.setProperty("--muted", theme.colors.muted);
  root.style.setProperty("--line", theme.colors.line);
  root.style.setProperty("--brand", theme.colors.brand);
  root.style.setProperty("--brand-dark", theme.colors.brandDark);
  root.style.setProperty("--accent-2", accent2);
  root.style.setProperty("--on-accent-2", theme.colors.onAccent2 || theme.colors.onBrand || "#ffffff");
  root.style.setProperty("--gold", theme.colors.gold);
  root.style.setProperty("--success", theme.colors.success || "#138a4b");
  root.style.setProperty("--warning", theme.colors.warning || "#b26b00");
  root.style.setProperty("--info", theme.colors.info || theme.colors.brand);
  root.style.setProperty("--danger", theme.colors.danger);
  root.style.setProperty("--on-brand", theme.colors.onBrand || "#ffffff");
  root.style.setProperty("--result-bg", theme.colors.resultBg || contrast.surface);
  root.style.setProperty("--result-ink", theme.colors.resultInk || contrast.ink);
  root.style.setProperty("--result-border", theme.colors.resultBorder || theme.colors.success || theme.colors.brand);
  const softShadow = theme.colors.shadow || (lightTheme
    ? "0 10px 28px rgba(22, 31, 40, 0.12)"
    : "0 12px 32px rgba(0, 0, 0, 0.34)");
  const strongShadow = theme.colors.strongShadow || (lightTheme
    ? "0 18px 46px rgba(22, 31, 40, 0.18)"
    : "0 22px 54px rgba(0, 0, 0, 0.5)");
  root.style.setProperty("--shadow", softShadow);
  root.style.setProperty("--shadow-soft", softShadow);
  root.style.setProperty("--shadow-strong", strongShadow);
  root.style.setProperty("--edge-highlight", lightTheme ? "rgba(255, 255, 255, 0.78)" : "rgba(255, 255, 255, 0.14)");
  root.style.colorScheme = lightTheme ? "light" : "dark";
  root.style.setProperty("--contrast-surface", contrast.surface);
  root.style.setProperty("--contrast-surface-ink", contrast.ink);
  root.style.setProperty("--contrast-surface-text", contrast.ink);
  root.style.setProperty("--contrast-surface-muted", contrast.muted);
  root.style.setProperty("--contrast-surface-line", contrast.line);
  root.style.setProperty("--header-bg", theme.colors.headerBg || theme.colors.surface);
  root.style.setProperty("--header-sub-bg", theme.colors.headerSubBg || theme.colors.surface);
  root.style.setProperty("--header-ink", theme.colors.headerInk || theme.colors.ink);
  root.style.setProperty("--header-muted", theme.colors.headerMuted || theme.colors.muted);
  root.style.setProperty("--header-line", theme.colors.headerLine || theme.colors.line);
  root.style.setProperty("--header-accent", theme.colors.headerAccent || theme.colors.brand);
  root.style.setProperty("--header-chip-bg", theme.colors.headerChipBg || theme.colors.surface2);
  root.style.setProperty("--header-chip-ink", theme.colors.headerChipInk || theme.colors.ink);
  root.style.setProperty("--header-chip-line", theme.colors.headerChipLine || theme.colors.line);
  root.style.setProperty("--header-control-bg", theme.colors.headerControlBg || theme.colors.surface);
  root.style.setProperty("--header-control-ink", theme.colors.headerControlInk || theme.colors.ink);
  root.style.setProperty("--header-control-line", theme.colors.headerControlLine || theme.colors.line);
  applyShopTheme(root, theme.colors, contrast);
}
```

### Function contrastSurfaceTokens — lines 50302-50310

```javascript
function contrastSurfaceTokens(surface, ink, muted, line) {
  const darkSurface = relativeLuminance(surface) < 0.38;
  return {
    surface,
    ink: darkSurface ? "#f8fbff" : ink,
    muted: darkSurface ? "rgba(248, 251, 255, 0.78)" : muted,
    line: darkSurface ? "rgba(248, 251, 255, 0.28)" : line
  };
}
```

### Function applyHeaderTheme — lines 50312-50342

```javascript
function applyHeaderTheme(themeId) {
  const theme = playerHeaderThemes[themeId] || headerThemes.default;
  const globalTheme = themes[activePlayer()?.theme] || themes.midnightRed || Object.values(themes)[0];
  const fallback = {
    headerBg: globalTheme.colors.headerBg || globalTheme.colors.surface,
    headerSubBg: globalTheme.colors.headerSubBg || globalTheme.colors.surface2 || globalTheme.colors.surface,
    headerInk: globalTheme.colors.headerInk || globalTheme.colors.ink,
    headerMuted: globalTheme.colors.headerMuted || globalTheme.colors.muted,
    headerLine: globalTheme.colors.headerLine || globalTheme.colors.line,
    headerAccent: globalTheme.colors.headerAccent || globalTheme.colors.brand,
    headerChipBg: globalTheme.colors.headerChipBg || globalTheme.colors.surface,
    headerChipInk: globalTheme.colors.headerChipInk || globalTheme.colors.ink,
    headerChipLine: globalTheme.colors.headerChipLine || globalTheme.colors.line,
    headerControlBg: globalTheme.colors.headerControlBg || globalTheme.colors.surface,
    headerControlInk: globalTheme.colors.headerControlInk || globalTheme.colors.ink,
    headerControlLine: globalTheme.colors.headerControlLine || globalTheme.colors.line
  };
  const root = document.documentElement;
  root.style.setProperty("--header-bg", theme.colors.headerBg || fallback.headerBg);
  root.style.setProperty("--header-sub-bg", theme.colors.headerSubBg || fallback.headerSubBg);
  root.style.setProperty("--header-ink", theme.colors.headerInk || fallback.headerInk);
  root.style.setProperty("--header-muted", theme.colors.headerMuted || fallback.headerMuted);
  root.style.setProperty("--header-line", theme.colors.headerLine || fallback.headerLine);
  root.style.setProperty("--header-accent", theme.colors.headerAccent || theme.colors.headerLine || fallback.headerAccent);
  root.style.setProperty("--header-chip-bg", theme.colors.headerChipBg || theme.colors.headerSubBg || fallback.headerChipBg);
  root.style.setProperty("--header-chip-ink", theme.colors.headerChipInk || theme.colors.headerInk || fallback.headerChipInk);
  root.style.setProperty("--header-chip-line", theme.colors.headerChipLine || theme.colors.headerLine || fallback.headerChipLine);
  root.style.setProperty("--header-control-bg", theme.colors.headerControlBg || theme.colors.headerBg || fallback.headerControlBg);
  root.style.setProperty("--header-control-ink", theme.colors.headerControlInk || theme.colors.headerInk || fallback.headerControlInk);
  root.style.setProperty("--header-control-line", theme.colors.headerControlLine || theme.colors.headerLine || fallback.headerControlLine);
}
```

### Function renderThemeChoices — lines 50344-50364

```javascript
function renderThemeChoices(container, choices, activeId, onSelect) {
  container.replaceChildren(...Object.entries(choices).map(([id, theme]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `theme-choice${activeId === id ? " active" : ""}`;
    button.dataset.theme = id;
    const colors = theme.colors;
    button.innerHTML = `
      <span class="theme-swatches">
        <i style="background:${colors.brand || colors.headerLine || "#999"}"></i>
        <i style="background:${colors.accent2 || colors.headerAccent || colors.surface2 || colors.headerSubBg || "#ddd"}"></i>
        <i style="background:${colors.gold || colors.headerInk || "#555"}"></i>
      </span>
      <span>${theme.name}</span>
    `;
    button.addEventListener("click", () => {
      onSelect(id);
    });
    return button;
  }));
}
```

### Function honeyEligibleEncounterResults — lines 50560-50568

```javascript
function honeyEligibleEncounterResults() {
  return (state.randomPokemonSessions || []).filter((session) => {
    if (session.sourceType !== "encounter" || session.status !== "confirmed") return false;
    if (session.copiedFromRandomPokemonSessionId || session.sourceLabel === "Honey copied Encounter") return false;
    const parent = (state.encounterSessions || []).find((entry) => entry.id === session.encounterSessionId);
    return String(session.series || parent?.series || state.series) === String(state.series)
      && Number(session.gym || parent?.gym || state.gym) === Number(state.gym);
  });
}
```

### Function ensureHoneyEndOfActionProcedures — lines 50570-50604

```javascript
function ensureHoneyEndOfActionProcedures() {
  state.endOfActionProcedures ||= [];
  const eligible = honeyEligibleEncounterResults();
  if (!eligible.length) return [];
  const created = [];
  state.players.forEach((player) => {
    (player.inventory || []).forEach((item) => {
      const definition = globalThis.rivalSagaTokenEffectContract?.inventoryDefinitionFor?.(item);
      if (definition?.id !== "honey-token") return;
      const id = `end-action-honey:${state.series}:${state.gym}:${player.id}:${item.id}`;
      let procedure = state.endOfActionProcedures.find((entry) => entry.id === id);
      if (procedure && ["resolved", "skipped"].includes(procedure.status)) return;
      if (!procedure) {
        procedure = {
          id, type: "honey", status: "awaitingChoice", sourcePlayerId: player.id,
          tokenInventoryRecordId: item.id, eligibleRandomPokemonSessionIds: eligible.map((session) => session.id),
          series: state.series, gym: Number(state.gym), createdAt: new Date().toISOString()
        };
        state.endOfActionProcedures.push(procedure);
      }
      let activity = (state.interactionEvents || []).find((entry) => entry.payload?.procedureId === id && entry.status === "open");
      if (!activity) {
        activity = createInteractionEvent({
          type: "phase-boundary-procedure", title: `${player.name} may use Honey.`,
          message: `${player.name} may copy one completed Encounter from this Action Phase.`,
          actorPlayerId: player.id, targetPlayerId: player.id, sourceType: "honey-end-action",
          sourceId: id, responseTypes: [], eligiblePlayerIds: [],
          payload: { procedureId: id, tokenName: "Honey", requiresRequiredChoice: true, requiredChoicePlayerId: player.id, responsesAllowed: false, transactionsAllowed: false }
        });
      }
      created.push({ procedure, activity });
    });
  });
  return created;
}
```

### Function liveRefereeHoneyProcedureScreenMarkup — lines 50612-50627

```javascript
function liveRefereeHoneyProcedureScreenMarkup(prompt, activity) {
  const procedure = honeyProcedureForActivity(activity);
  const choices = (procedure?.eligibleRandomPokemonSessionIds || []).map((id) => (state.randomPokemonSessions || []).find((entry) => entry.id === id)).filter((entry) => entry?.status === "confirmed");
  return liveRefereeGameScreenMarkup({
    className: "live-referee-honey-screen",
    situation: "Which completed encounter will Honey copy?",
    body: liveRefereePickerScrollMarkup(choices.map((session) => liveRefereeChoiceButtonMarkup({
      label: `${livePlayerName(session.resultOwnerPlayerId || session.ownerPlayerId || session.playerId, "Player")} - ${session.resultDisplayName}`,
      attrs: `data-honey-result-choice="${escapeHtml(session.id)}" data-activity-id="${escapeHtml(activity.id)}"`,
      variant: "ghost"
    })).join("") || `<p class="empty-state compact">No eligible completed encounter remains.</p>`, "Completed encounters"),
    choices: liveRefereeNavActionsMarkup([
      liveRefereeChoiceButtonMarkup({ label: "Skip Honey", attrs: `data-honey-procedure-skip="${escapeHtml(activity.id)}"` })
    ])
  });
}
```

### Function resolveHoneyEndOfActionProcedure — lines 50642-50704

```javascript
function resolveHoneyEndOfActionProcedure(activityId, sourceRandomPokemonSessionId) {
  const activity = liveActivityById(activityId);
  const procedure = honeyProcedureForActivity(activity);
  const player = state.players.find((entry) => entry.id === procedure?.sourcePlayerId);
  const tokenIndex = (player?.inventory || []).findIndex((item) => item.id === procedure?.tokenInventoryRecordId);
  if (!procedure || !player || tokenIndex < 0 || !procedure.eligibleRandomPokemonSessionIds.includes(sourceRandomPokemonSessionId)) {
    alert("Honey's exact Token or Encounter selection is no longer available.");
    return false;
  }
  const causalBeforeHoney = tokenUseRollbackSnapshot();
  const savedPlayers = structuredClone(state.players);
  const savedRandom = structuredClone(state.randomPokemonSessions || []);
  const savedCopies = structuredClone(state.encounterCopyRecords || []);
  const token = player.inventory.splice(tokenIndex, 1)[0];
  const result = controlTokenEffects.resolveHoneyEncounterCopy(state, {
    sourceEffectId: activity.id,
    ownerPlayerId: player.id,
    sourceRandomPokemonSessionId
  }, controlTokenEffectOptions());
  if (result.result !== "resolved") {
    state.players = savedPlayers;
    state.randomPokemonSessions = savedRandom;
    state.encounterCopyRecords = savedCopies;
    alert(result.reason);
    return false;
  }
  procedure.status = "resolved";
  procedure.selectedRandomPokemonSessionId = sourceRandomPokemonSessionId;
  procedure.copiedRandomPokemonSessionId = result.randomSession?.id || "";
  procedure.consumedTokenId = token.id;
  procedure.resolvedAt = new Date().toISOString();
  activity.status = "resolved";
  activity.resolution = "honey-encounter-copied";
  state.selectedRandomPokemonSessionId = result.randomSession?.id || "";
  state.randomPokemonDrawerOpen = Boolean(result.randomSession);
  const consumption = addTokenConsumptionRecord({
    player,
    token,
    tokenName: "Honey",
    metadata: tokenEffectMetadataByName("Honey"),
    linkedEventId: activity.id,
    source: "honey-end-of-action"
  });
  const causalUndo = buildCausalTokenEffectUndo(causalBeforeHoney, activity, { id: "honey-token", name: "Honey" });
  causalUndo.procedureId = procedure.id;
  causalUndo.copiedRandomPokemonSessionId = result.randomSession?.id || "";
  addLogEntry({
    action: "token", category: "pokemon", player: player.name,
    item: result.reason, title: `${player.name} used Honey`, summary: result.reason,
    type: "honey-encounter-copy", categories: ["tokens", "pokemon", "encounter"],
    tags: ["honey", "encounter-copy", "end-of-action"], playerIds: [player.id], tokenNames: ["Honey"],
    linkedEventId: activity.id,
    tokenConsumptionId: consumption?.id || "",
    encounterCopyRecordId: result.record?.id || "",
    copiedRandomPokemonSessionId: result.randomSession?.id || "",
    undoable: true,
    undone: false,
    undoData: causalUndo
  });
  saveState({ immediate: true });
  render();
  return true;
}
```

### Function openAvatarCropper — lines 51043-51072

```javascript
function openAvatarCropper(src) {
  if (state.randomPokemonDrawerOpen) {
    state.randomPokemonDrawerOpen = false;
    saveState();
    renderRandomPokemonPanel();
  }
  const image = new Image();
  image.addEventListener("load", () => {
    const viewportSize = 320;
    const scaleToCover = Math.max(viewportSize / image.naturalWidth, viewportSize / image.naturalHeight);
    avatarCropState = {
      src,
      image,
      viewportSize,
      baseWidth: image.naturalWidth * scaleToCover,
      baseHeight: image.naturalHeight * scaleToCover,
      zoom: 1,
      x: 0,
      y: 0,
      dragging: false,
      lastX: 0,
      lastY: 0
    };
    els.avatarCropImage.src = src;
    els.avatarZoom.value = "1";
    els.avatarCropModal.classList.remove("hidden");
    updateAvatarCropper();
  });
  image.src = src;
}
```

### Function renderTeambuilder — lines 52843-52966

```javascript
function renderTeambuilder(player) {
  if (!els.teambuilderView) return;
  const access = privatePrepAccessForPlayer(player, "teambuilder");
  els.teambuilderView.classList.toggle("private-prep-locked", !access.allowed);
  setPrivateSurfaceControlsDisabled(els.teambuilderView, !access.allowed);
  if (!access.allowed) {
    if (els.teambuilderSummary) {
      els.teambuilderSummary.innerHTML = [
        renderTeambuilderSummaryCard("Access", "Locked", "profile required"),
        renderTeambuilderSummaryCard("Trainer", player.name || "Trainer", "selected slot"),
        renderTeambuilderSummaryCard("Owner", access.ownerLabel, "linked profile"),
        renderTeambuilderSummaryCard("Current", access.activeProfileLabel, "site profile")
      ].join("");
    }
    if (els.teambuilderRosterCount) els.teambuilderRosterCount.textContent = "Locked";
    if (els.teambuilderDraftTitle) els.teambuilderDraftTitle.textContent = "Private Draft";
    if (els.teambuilderValidation) {
      els.teambuilderValidation.textContent = "Profile locked";
      els.teambuilderValidation.classList.add("has-issues");
    }
    const lockMarkup = renderPrivatePrepLock(access, { surfaceLabel: "Teambuilder" });
    if (els.teambuilderRoster) els.teambuilderRoster.innerHTML = lockMarkup;
    if (els.teambuilderSpeciesBrowser) {
      els.teambuilderSpeciesBrowser.innerHTML = "";
      els.teambuilderSpeciesBrowser.classList.add("hidden");
    }
    if (els.teambuilderSlots) els.teambuilderSlots.innerHTML = lockMarkup;
    return;
  }
  const activeElement = document.activeElement;
  const activeTeambuilderInputId = activeElement?.matches?.("[data-teambuilder-move-search], [data-teambuilder-slot-move-search], [data-teambuilder-item-search], [data-teambuilder-ability-search], [data-teambuilder-slot-field], [data-teambuilder-slot-ev], [data-teambuilder-slot-iv], [data-teambuilder-showdown-text]")
    ? activeElement.id
    : "";
  const canRestoreTextSelection = activeTeambuilderInputId && typeof activeElement.selectionStart === "number" && typeof activeElement.setSelectionRange === "function";
  const activeSelectionStart = canRestoreTextSelection ? activeElement.selectionStart : null;
  const activeSelectionEnd = canRestoreTextSelection ? activeElement.selectionEnd : null;
  const roster = activeRosterForPlayer(player.id);
  const sortedRoster = sortPokemonLikePlayerSheet(roster);
  const data = teambuilderDataSource();
  const buildDataReady = pokemonBuildDataReady();
  const importedSpeciesCount = Object.keys(data.pokemon || {}).length;
  const importedMoveCount = Object.keys(data.moves || {}).length;
  const tmPool = tmMoveOptionsForPlayer(player);
  refreshTeambuilderForcedTeamState(player.id);
  const activeBuild = activeTeamBuildDraftForPlayer(player.id);
  const displayBuild = activeBuild || normalizeTeamBuildDraft({
    name: `${state.series} Gym ${state.gym} Draft`,
    playerId: player.id,
    series: state.series,
    gym: state.gym
  }, player.id);
  const validation = activeBuild ? validateTeamBuildDraft(activeBuild, player.id) : null;
  const forcedRepair = teambuilderForcedRepairState(player.id);
  const issueCount = validation?.issues?.length || 0;
  const filledSlotCount = (displayBuild.slots || []).filter(teambuilderSlotHasPokemon).length;
  const badgeBudget = teambuilderBadgeBudget(displayBuild, player);
  const selectedSlotIndex = selectedTeamBuildSlotIndex(player.id, displayBuild);
  const selectedSlot = displayBuild.slots[selectedSlotIndex] || normalizeTeamBuildSlot({}, player.id);
  const speciesBrowser = teambuilderSpeciesBrowserState(player.id);
  const databaseMode = speciesBrowser.view === "database";
  const databaseEntries = databaseMode ? buildPokemonIndexEntries() : [];
  els.teambuilderRosterViewSwitch?.querySelectorAll("[data-teambuilder-roster-view]").forEach((button) => {
    const active = button.dataset.teambuilderRosterView === speciesBrowser.view;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });

  if (els.teambuilderSummary) {
    els.teambuilderSummary.innerHTML = [
      renderTeambuilderSummaryCard("Roster", String(roster.length), "active Pokemon"),
      renderTeambuilderSummaryCard("Draft", `${filledSlotCount}/${displayBuild.slots.length}`, "slots filled"),
      renderTeambuilderSummaryCard("Badges", `${badgeBudget.remaining}/${badgeBudget.total}`, `${badgeBudget.used} reserved by party`),
      renderTeambuilderSummaryCard("Learnsets", buildDataReady ? String(importedSpeciesCount) : "Loading", buildDataReady ? `${importedMoveCount} moves` : "local data")
    ].join("");
  }
  if (els.teambuilderRosterTitle) {
    els.teambuilderRosterTitle.textContent = databaseMode ? "Pokemon Database" : "Available Pokemon";
  }
  if (els.teambuilderRosterCount) {
    els.teambuilderRosterCount.textContent = databaseMode ? `${databaseEntries.length} species` : `${roster.length} active`;
  }
  if (els.teambuilderDraftTitle) {
    els.teambuilderDraftTitle.textContent = displayBuild.name;
  }
  if (els.teambuilderValidation) {
    els.teambuilderValidation.textContent = activeBuild
      ? issueCount ? `${issueCount} issue${issueCount === 1 ? "" : "s"}` : "Legal so far"
      : "Draft storage ready";
    els.teambuilderValidation.classList.toggle("has-issues", Boolean(issueCount));
  }
  if (els.teambuilderRoster) {
    els.teambuilderRoster.classList.toggle("hidden", databaseMode);
    if (!databaseMode) {
      els.teambuilderRoster.innerHTML = sortedRoster.length
        ? renderTeambuilderRosterPc(sortedRoster, displayBuild, player)
        : `<p class="empty-state compact">No Active Pokemon available for teambuilding.</p>`;
    }
  }
  if (els.teambuilderSpeciesBrowser) {
    els.teambuilderSpeciesBrowser.classList.toggle("hidden", !databaseMode);
    if (databaseMode) renderTeambuilderSpeciesBrowser(player, { allEntries: databaseEntries, build: displayBuild });
  }
  if (els.teambuilderSlots) {
    els.teambuilderSlots.innerHTML = `
      ${forcedRepair ? `<div class="teambuilder-forced-repair ${escapeHtml(forcedRepair.status)}"><strong>${forcedRepair.status === "impossible" ? "Team Lock Blocked" : "Team Repair Required"}</strong><span>${escapeHtml(forcedRepair.reason)}</span></div>` : ""}
      ${renderTeambuilderImportExportPanel(displayBuild, player)}
      ${renderTeambuilderPartyStrip(displayBuild, selectedSlotIndex, validation)}
      ${renderTeambuilderBattleSubmissionBar(displayBuild, player, validation)}
      ${renderTeambuilderSelectedSlotEditor(selectedSlot, selectedSlotIndex, player, sortedRoster, displayBuild, validation)}
    `;
  }
  if (activeTeambuilderInputId) {
    const input = document.getElementById(activeTeambuilderInputId);
    if (input) {
      input.focus();
      if (activeSelectionStart !== null && activeSelectionEnd !== null && typeof input.setSelectionRange === "function") {
        input.setSelectionRange(
          Math.min(activeSelectionStart, input.value.length),
          Math.min(activeSelectionEnd, input.value.length)
        );
      }
    }
  }
}
```

### Function applyActivationOverlay — lines 58050-58129

```javascript
async function applyActivationOverlay() {
  // Effect Activated should remain a confirmed overlay flow: gather actor,
  // effect, target, choices, and duration here before applying future rules.
  if (!activationDraft) return;
  try {
    const player = state.players.find((candidate) => candidate.id === activationDraft.playerId);
    if (!player) return;
    if (!requirePrivatePrepAccess(player, "effect activation")) return;
    const effect = structuredClone(activationDraft.effect);
    const engineMetadata = tokenEffectMetadataByName(effect.name);
    const usability = tokenRuntimeUsabilityCheck(engineMetadata);
    const tokenActivation = effect.type === "token" || activationDraft.statusDefinitionId || activationDraft.utilityDefinitionId;
    if (tokenActivation && !usability.ok) {
      alert(usability.reason);
      return;
    }
    const statusDefinition = activationDraft.statusDefinitionId ? statusTokenDefinitions[activationDraft.statusDefinitionId] : statusTokenDefinitionByName(effect.name);
    if (statusDefinition) {
      applyStatusTokenActivation(player, effect, statusDefinition);
      return;
    }
    const utilityDefinition = activationDraft.utilityDefinitionId ? utilityTokenDefinitions[activationDraft.utilityDefinitionId] : utilityTokenDefinitionByName(effect.name);
    if (utilityDefinition && ["extraEncounter", "safeguard"].includes(engineMetadata.resolverId)) {
      const targetPlayer = engineMetadata.selfOnly
        ? player
        : state.players.find((candidate) => candidate.id === els.activationTargetPlayer.value) || player;
      closeActivationOverlay();
      els.actionName.value = "";
      els.actionNotes.value = "";
      await resolveImmediateTokenUse({
        actor: player,
        target: targetPlayer,
        actorPlayerId: player.id,
        targetPlayerId: targetPlayer?.id || "",
        targetPlayerName: targetPlayer?.name || "",
        tokenName: effect.name,
        category: engineMetadata.timingCategory,
        targetType: engineMetadata.targetType,
        targetScope: engineMetadata.targetScope,
        targetText: els.activationTargetName.value.trim(),
        notes: els.activationChoices.value.trim()
      }, { context: { manualHost: true } });
      return;
    }
    if (utilityDefinition) {
      applyUtilityTokenActivation(player, effect, utilityDefinition);
      return;
    }
    const target = state.players.find((candidate) => candidate.id === els.activationTargetPlayer.value);
    const targetType = els.activationTargetType.value;
    const targetName = els.activationTargetName.value.trim();
    const choices = els.activationChoices.value.trim();
    const duration = els.activationDuration.value.trim();
    const targetDetails = targetType === "none"
      ? "No target"
      : `${targetTypeLabel(targetType)}${target ? ` -> ${target.name}` : ""}${targetName ? ` (${targetName})` : ""}`;
    const consumed = effect.type === "token" ? removeThing(player, "token", effect.name, false) : false;
    const result = effect.type === "token"
      ? consumed ? "token consumed" : "token not found; activation logged"
      : `${effect.type} activation logged`;
    addLogEntry({
      action: "activate",
      category: effect.type === "token" ? "tokens" : effect.type === "item" ? "items" : "perks",
      player: player.name,
      item: `Activated ${effect.name}; Target ${targetDetails}${choices ? `; Choices: ${choices}` : ""}${duration ? `; Duration: ${duration}` : ""} [${result}]${activationDraft.notes ? ` (${activationDraft.notes})` : ""}`,
      type: effect.type,
      quantity: 1,
      price: 0,
      balanceAfter: player.balance
    });
    closeActivationOverlay();
    els.actionName.value = "";
    els.actionNotes.value = "";
    saveState();
    render();
  } finally {
    activationSubmitting = false;
    if (els.applyActivation) els.applyActivation.disabled = false;
  }
}
```

### Function renderShop — lines 59624-59728

```javascript
function renderShop(player) {
  if (!shops[state.activeShop]) state.activeShop = "items";
  const access = privatePrepAccessForPlayer(player, "shop");
  els.shopView?.classList.toggle("private-prep-locked", !access.allowed);
  setPrivateSurfaceControlsDisabled(els.shopView, !access.allowed);
  if (!access.allowed) {
    document.querySelectorAll(".tab[data-shop]").forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.shop === state.activeShop);
    });
    els.shopHeaderBalance && (els.shopHeaderBalance.textContent = `$${formatMoney(Number(player?.balance || 0))}`);
    els.tokenShopHeader?.classList.add("hidden");
    els.tokenShopChips?.classList.add("hidden");
    els.tmMoveFilters?.classList.add("hidden");
    els.itemShopFiltersToggle?.classList.add("hidden");
    els.itemShopAdvancedFilters?.classList.add("hidden");
    els.itemShopRoleFilterGroup?.classList.add("hidden");
    els.itemShopTagFilterGroup?.classList.add("hidden");
    els.itemShopAffordFilterGroup?.classList.add("hidden");
    els.itemShopAppliedFilters?.classList.add("hidden");
    els.itemShopBreadcrumb?.classList.add("hidden");
    els.shopGrid.innerHTML = renderPrivatePrepLock(access, { surfaceLabel: "Shop" });
    return;
  }
  const search = els.searchInput.value.trim().toLowerCase();
  const tmType = els.tmTypeFilter.value || "All";
  const tmDamageClass = els.tmDamageClassFilter.value || "All";
  const minPrice = null;
  const maxPrice = null;
  const itemMode = state.activeShop === "items";
  const itemFilters = itemShopFiltersState();
  const tokenMode = state.activeShop === "tokens";
  const tokenFilter = state.tokenShopCategoryFilter || "all";
  const department = SHOP_DEPARTMENTS[state.activeShop] || SHOP_DEPARTMENTS.items;
  if (state.activeShop === "tms" && !pokemonBuildDataReady()) ensurePokemonBuildDataLoaded();
  if (els.shopDepartmentTitle) els.shopDepartmentTitle.textContent = department.title;
  if (els.shopDepartmentSubtitle) els.shopDepartmentSubtitle.textContent = department.subtitle;
  els.shopHeaderBalance && (els.shopHeaderBalance.textContent = `$${formatMoney(Number(player?.balance || 0))}`);
  els.shopView?.classList.toggle("item-shop-mode", itemMode);
  document.querySelectorAll(".tab[data-shop]").forEach((tab) => {
    const active = tab.dataset.shop === state.activeShop;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-pressed", String(active));
    tab.setAttribute("aria-current", active ? "page" : "false");
  });
  els.tmMoveFilters?.classList.toggle("hidden", state.activeShop !== "tms");
  els.itemShopBreadcrumb?.classList.toggle("hidden", !itemMode);
  els.itemShopRoleFilterGroup?.classList.toggle("hidden", !itemMode);
  els.itemShopTagFilterGroup?.classList.toggle("hidden", !itemMode);
  els.itemShopAffordFilterGroup?.classList.toggle("hidden", !itemMode);
  renderItemShopFilterControls();
  syncShopSortControl();

  if (itemMode) {
    const filteredMode = itemShopHasActiveFilters({ search });
    renderItemShopBreadcrumb({ filtered: filteredMode, player });
    const entries = filteredMode
      ? battleItemShopData
        .filter((item) => itemShopEntryMatchesFilters(item, itemFilters, player))
        .filter((item) => !search || shopEntrySearchText(item).includes(search))
      : [];
    const cards = filteredMode ? [] : itemShopPresentationCardsForCurrentFolder(player);
    renderTokenShopChrome(player, filteredMode ? entries.length : itemFilters.canAfford ? itemShopFolderAffordableItems("root", player).length : battleItemShopData.length);
    renderItemShopAppliedFilters(filteredMode ? entries.length : cards.length);
    if (filteredMode) {
      if (entries.length === 0) {
        els.shopGrid.innerHTML = `<p class="empty-state">No shop entries match these filters.</p>`;
        return;
      }
      els.shopGrid.replaceChildren(...createItemShopResultSections(entries, player));
      requestAnimationFrame(updateShopTooltipSides);
      return;
    }
    if (!cards.length) {
      els.shopGrid.innerHTML = `<p class="empty-state">${itemFilters.canAfford ? "No affordable entries in this collection." : "This Item Shop folder is empty."}</p>`;
      return;
    }
    els.shopGrid.replaceChildren(...createItemShopPresentationSections(itemShopCurrentFolder(), cards, player));
    requestAnimationFrame(updateShopTooltipSides);
    return;
  }

  const entries = shopEntriesForActiveShop()
    .filter((item) => state.activeShop !== "tms" || tmType === "All" || item.type === tmType)
    .filter((item) => state.activeShop !== "tms" || tmDamageClass === "All" || shopTmDamageClass(item) === tmDamageClass)
    .filter((item) => !tokenMode || tokenFilter === "all" || tokenShopCategoryKey(item) === tokenFilter)
    .filter((item) => !search || shopEntrySearchText(item).includes(search));
  renderTokenShopChrome(player, entries.length);
  renderItemShopAppliedFilters(entries.length);

  if (entries.length === 0) {
    els.shopGrid.innerHTML = `<p class="empty-state">No shop entries match these filters.</p>`;
    return;
  }

  const grouped = entries.reduce((acc, item) => {
    acc[item.tier] ??= [];
    acc[item.tier].push(item);
    return acc;
  }, {});
  const orderedTiers = tierOrder.filter((name) => grouped[name])
    .concat(Object.keys(grouped).filter((name) => !tierOrder.includes(name)).sort());

  els.shopGrid.replaceChildren(...orderedTiers.map((tierName) => createShopTierSection(tierName, grouped[tierName], player)));
  requestAnimationFrame(updateShopTooltipSides);
}
```

### Function availablePokemonForBattleTier — lines 60147-60152

```javascript
function availablePokemonForBattleTier(tierId) {
  return groupedRandomPokemonPool(
    pokemonEntriesForBattleTier(tierId)
      .filter((entry) => currentPokemonRuleStatusByName(entry.displayName) !== "Banned")
  ).sort((a, b) => a.displayName.localeCompare(b.displayName));
}
```

### Function renderCart — lines 60732-60808

```javascript
function renderCart() {
  const cart = currentCart();
  const hasItems = cart.items.length > 0;
  if (!hasItems) cart.open = false;
  els.cartTab.classList.toggle("hidden", !hasItems);
  els.cartColumn.classList.toggle("drawer-open", hasItems && cart.open);
  els.cartDrawer.classList.toggle("open", hasItems && cart.open);
  els.cartTab.setAttribute("aria-expanded", String(hasItems && cart.open));
  els.cartTab.textContent = hasItems ? `Cart (${cartQuantityTotal()})` : "Cart";
  if (!hasItems) {
    els.cartItems.innerHTML = "";
    els.cartSummary.innerHTML = "";
    els.cartWarning.textContent = "";
    return;
  }

  const player = cartPlayer();
  const access = privatePrepAccessForPlayer(player, "shop cart");
  if (!access.allowed) {
    els.cartPlayer.textContent = `Cart for ${player.name}`;
    els.cartItems.innerHTML = renderPrivatePrepLock(access, { surfaceLabel: "Shop Cart", compact: true });
    els.cartSummary.innerHTML = "";
    els.cartWarning.textContent = access.reason;
    els.finalizeCart.disabled = true;
    return;
  }
  const total = cartTotal();
  const remaining = (player.balance ?? 0) - total;
  const timingLocked = !cart.items.every((entry) => canPurchaseFromShopNow(player, entry.shopType, entry));
  els.cartPlayer.textContent = `Cart for ${player.name}`;
  els.cartItems.replaceChildren(...cart.items.map((entry) => {
    const row = document.createElement("div");
    const quantity = document.createElement("input");
    const remove = document.createElement("button");
    row.className = "cart-item";
    row.innerHTML = `
      <div class="cart-item-main">
        <strong>${escapeHtml(entry.name)}</strong>
        <span>${escapeHtml(shopCartEntryMetaLabel(entry))}${entry.discountPercent ? ` - ${entry.discountPercent}% off` : ""}</span>
      </div>
      <span>${entry.price === 0 ? "Reward" : `${formatMoney(entry.price)} ea`}</span>
      <strong>${formatMoney(entry.price * entry.quantity)}</strong>
    `;
    quantity.type = "number";
    quantity.min = "1";
    quantity.max = "99";
    quantity.value = String(entry.quantity);
    quantity.className = "quantity-input";
    quantity.setAttribute("aria-label", `Cart quantity for ${entry.name}`);
    quantity.addEventListener("change", () => {
      entry.quantity = readQuantity(quantity);
      saveState();
      renderCart();
      renderShop(activePlayer());
    });
    remove.type = "button";
    remove.className = "ghost-button cart-remove";
    remove.textContent = "Remove";
    remove.addEventListener("click", () => {
      cart.items = cart.items.filter((item) => item.key !== entry.key);
      if (!cart.items.length) cart.open = false;
      saveState();
      render();
    });
    row.append(quantity, remove);
    return row;
  }));
  els.cartSummary.innerHTML = `
    <div><span>Total</span><strong>${formatMoney(total)}</strong></div>
    <div><span>${player.name} balance</span><strong>${formatMoney(player.balance)}</strong></div>
    <div><span>After purchase</span><strong>${formatMoney(remaining)}</strong></div>
  `;
  els.cartWarning.textContent = timingLocked
    ? shopPurchaseTimingMessage(cart.items[0]?.shopType || state.activeShop)
    : remaining < 0 ? "Insufficient funds. Remove entries or reduce quantities before finalizing." : "";
  els.finalizeCart.disabled = remaining < 0 || timingLocked;
}
```

### Function reverseGameCornerSessionForActionVisit — lines 61113-61193

```javascript
function reverseGameCornerSessionForActionVisit(undoData, player) {
  const sessionIds = new Set([
    undoData.gameCornerSessionId,
    ...(state.gameCornerSessions || [])
      .filter((session) => session.actionVisitId === undoData.visitId)
      .map((session) => session.id)
  ].filter(Boolean));
  if (!sessionIds.size || !player) return [];
  const earnedRewardIds = new Set();
  (state.gameCornerSessions || [])
    .filter((session) => sessionIds.has(session.id))
    .forEach((gcSession) => {
      const wheelSession = (state.wheelSessions || []).find((entry) => entry.id === gcSession.gambleWheelSessionId);
      (wheelSession?.rolls || []).forEach((roll) => {
        if (roll.reward?.id) earnedRewardIds.add(roll.reward.id);
        if (roll.rewardId) earnedRewardIds.add(roll.rewardId);
      });
    });
  const restoredTokens = [];
  const pokemonIdsToRemove = new Set();
  const randomPokemonSessionIds = new Set();
  (state.gameCornerUnlocks || [])
    .filter((unlock) => sessionIds.has(unlock.gameCornerSessionId) || unlock.actionVisitId === undoData.visitId)
    .forEach((unlock) => {
      if (unlock.pokemonId) pokemonIdsToRemove.add(unlock.pokemonId);
      if (unlock.randomPokemonSessionId) randomPokemonSessionIds.add(unlock.randomPokemonSessionId);
      const session = (state.gameCornerSessions || []).find((entry) => entry.id === unlock.gameCornerSessionId);
      const used = (session?.gcTokensUsed || []).find((entry) => entry.unlockId === unlock.id);
      if (used?.token && !earnedRewardIds.has(used.token.id) && !(player.inventory || []).some((item) => item.id === used.token.id)) {
        restoredTokens.push(used.token);
      }
    });
  (state.randomPokemonSessions || [])
    .filter((session) => sessionIds.has(session.gameCornerSessionId) || session.actionVisitId === undoData.visitId)
    .forEach((session) => {
      session.status = "undone";
      session.undoneAt = new Date().toISOString();
      randomPokemonSessionIds.add(session.id);
      if (session.rosterPokemonId) pokemonIdsToRemove.add(session.rosterPokemonId);
      (session.rerollHistory || []).forEach((reroll) => {
        if (reroll.token && !(player.inventory || []).some((item) => item.id === reroll.token.id)) {
          restoredTokens.push(reroll.token);
        }
      });
    });
  if (restoredTokens.length) player.inventory.unshift(...restoredTokens.map((token) => structuredClone(token)));
  if (pokemonIdsToRemove.size) {
    state.pokemonRecords = (state.pokemonRecords || []).filter((pokemon) => !pokemonIdsToRemove.has(pokemon.id));
    syncPlayerPokemonLists();
  }
  state.gameCornerUnlocks = (state.gameCornerUnlocks || []).filter((unlock) => !sessionIds.has(unlock.gameCornerSessionId) && unlock.actionVisitId !== undoData.visitId);
  (state.gameCornerSessions || []).forEach((session) => {
    if (sessionIds.has(session.id)) {
      session.status = "undone";
      session.undoneAt = new Date().toISOString();
    }
  });
  const gymState = ensureGymPhaseState(undoData.series || state.series, undoData.gym || state.gym);
  if (sessionIds.has(gymState.activeGameCornerTokenSessionId)) gymState.activeGameCornerTokenSessionId = "";
  if (state.selectedRandomPokemonSessionId && randomPokemonSessionIds.has(state.selectedRandomPokemonSessionId)) {
    const next = pendingRandomPokemonSessions();
    state.selectedRandomPokemonSessionId = next[0]?.id || "";
    state.randomPokemonDrawerOpen = Boolean(next.length);
  }
  const linkedInteractionIds = new Set((state.interactionEvents || [])
    .filter((activity) => randomPokemonSessionIds.has(activity.sourceId)
      || randomPokemonSessionIds.has(activity.payload?.randomPokemonSessionId))
    .map((activity) => activity.id));
  const linkedInteractionTitles = new Set((state.interactionEvents || [])
    .filter((activity) => linkedInteractionIds.has(activity.id))
    .map((activity) => activity.title)
    .filter(Boolean));
  state.log.forEach((entry) => {
    if (entry.gameCornerSessionId && sessionIds.has(entry.gameCornerSessionId)) entry.undone = true;
    if (entry.actionVisitId === undoData.visitId || entry.visitId === undoData.visitId) entry.undone = true;
    if (randomPokemonSessionIds.has(entry.randomPokemonSessionId)) entry.undone = true;
    if (linkedInteractionIds.has(entry.linkedEventId)) entry.undone = true;
    if (entry.type === "interaction-resolution" && linkedInteractionTitles.has(String(entry.summary || "").split("\n")[0])) entry.undone = true;
  });
  return [...sessionIds];
}
```

### Function undoEncounterActionVisit — lines 61202-61264

```javascript
function undoEncounterActionVisit(undoData) {
  const player = state.players.find((candidate) => candidate.id === undoData.playerId);
  if (player && undoData.previousInventory) player.inventory = structuredClone(undoData.previousInventory);
  const session = (state.encounterSessions || []).find((entry) => entry.id === undoData.encounterSessionId);
  if (!session) {
    if (undoData.previousEncounterSessions) state.encounterSessions = structuredClone(undoData.previousEncounterSessions);
    if (undoData.previousRandomPokemonSessions) state.randomPokemonSessions = structuredClone(undoData.previousRandomPokemonSessions);
    if (undoData.previousPokemonRecords) state.pokemonRecords = structuredClone(undoData.previousPokemonRecords).map(normalizePokemonRecord);
    if (undoData.previousInteractionEvents) {
      state.interactionEvents = structuredClone(undoData.previousInteractionEvents);
    } else if (Array.isArray(undoData.previousInteractionEventIds)) {
      const previousIds = new Set(undoData.previousInteractionEventIds);
      state.interactionEvents = (state.interactionEvents || []).filter((activity) => previousIds.has(activity.id));
    }
    if (undoData.previousTransactions) {
      state.transactions = structuredClone(undoData.previousTransactions);
    } else if (Array.isArray(undoData.previousTransactionIds)) {
      const previousIds = new Set(undoData.previousTransactionIds);
      state.transactions = (state.transactions || []).filter((transaction) => previousIds.has(transaction.id));
    }
    syncLinkedTransactions();
    syncPlayerPokemonLists();
    return;
  }
  const definition = encounterWheelDefinition(session.series, session.gym);
  const rollsPerAction = Number(definition?.rollsPerAction || 2);
  const visitIds = session.actionVisitIds || (session.actionVisitId ? [session.actionVisitId] : []);
  const visitIndex = Math.max(0, visitIds.indexOf(undoData.visitId));
  let rollsToRemove = (session.rolls || []).filter((roll) => roll.actionVisitId === undoData.visitId);
  if (!rollsToRemove.length || rollsToRemove.length > rollsPerAction) {
    rollsToRemove = (session.rolls || []).slice(visitIndex * rollsPerAction, visitIndex * rollsPerAction + rollsPerAction);
  }
  const rollIds = new Set(rollsToRemove.map((roll) => roll.id));
  const randomSessionIds = new Set(rollsToRemove.map((roll) => roll.randomPokemonSessionId).filter(Boolean));
  const interactionIdsToRemove = new Set((state.interactionEvents || [])
    .filter((activity) => randomSessionIds.has(activity.sourceId) || randomSessionIds.has(activity.payload?.randomPokemonSessionId))
    .map((activity) => activity.id));
  const pokemonIdsToRemove = new Set(rollsToRemove.map((roll) => roll.rosterPokemonId).filter(Boolean));
  (state.randomPokemonSessions || []).forEach((randomSession) => {
    if (randomSessionIds.has(randomSession.id) && randomSession.rosterPokemonId) pokemonIdsToRemove.add(randomSession.rosterPokemonId);
  });
  session.rolls = (session.rolls || []).filter((roll) => !rollIds.has(roll.id));
  session.resultSessionIds = (session.resultSessionIds || []).filter((id) => !randomSessionIds.has(id));
  session.actionVisitIds = visitIds.filter((id) => id !== undoData.visitId);
  session.maxRolls = Math.max(0, Number(session.maxRolls || rollsPerAction) - rollsPerAction);
  session.status = session.rolls.length >= Number(session.maxRolls || 0) ? "review" : "pending";
  session.updatedAt = new Date().toISOString();
  state.randomPokemonSessions = (state.randomPokemonSessions || []).filter((randomSession) => !randomSessionIds.has(randomSession.id));
  state.interactionEvents = (state.interactionEvents || []).filter((activity) => !interactionIdsToRemove.has(activity.id));
  state.transactions = (state.transactions || []).filter((transaction) => !interactionIdsToRemove.has(transaction.linkedEventId));
  syncLinkedTransactions();
  state.pokemonRecords = (state.pokemonRecords || []).filter((pokemon) => !pokemonIdsToRemove.has(pokemon.id));
  if (!session.actionVisitIds.length && !(session.rolls || []).length) {
    state.encounterSessions = (state.encounterSessions || []).filter((entry) => entry.id !== session.id);
  } else if (player) {
    updateEncounterActionLog(session, player);
  }
  if (state.selectedEncounterSessionId === undoData.encounterSessionId && !pendingEncounterSessions().some((entry) => entry.id === state.selectedEncounterSessionId)) {
    state.selectedEncounterSessionId = "";
    state.encounterModalOpen = false;
  }
  syncPlayerPokemonLists();
}
```

### Function restoreTokenEffectContractUndoData — lines 61266-61304

```javascript
function restoreTokenEffectContractUndoData(undoData) {
  if (undoData.previousPlayers) state.players = structuredClone(undoData.previousPlayers);
  if (undoData.previousPokemonRecords) state.pokemonRecords = structuredClone(undoData.previousPokemonRecords).map(normalizePokemonRecord);
  if (undoData.previousPokemonLog) state.pokemonLog = structuredClone(undoData.previousPokemonLog);
  if (undoData.previousLingeringStatuses) state.lingeringStatuses = structuredClone(undoData.previousLingeringStatuses);
  if (undoData.previousTokenActivations) state.tokenActivations = structuredClone(undoData.previousTokenActivations);
  if (undoData.previousTokenConsumptions) state.tokenConsumptions = structuredClone(undoData.previousTokenConsumptions);
  if (undoData.previousPlayerNotifications) state.playerNotifications = structuredClone(undoData.previousPlayerNotifications);
  if (undoData.previousWheelSessions) state.wheelSessions = structuredClone(undoData.previousWheelSessions);
  if (undoData.previousEncounterSessions) state.encounterSessions = structuredClone(undoData.previousEncounterSessions);
  if (undoData.previousRandomPokemonSessions) state.randomPokemonSessions = structuredClone(undoData.previousRandomPokemonSessions);
  if (Object.prototype.hasOwnProperty.call(undoData, "previousSelectedEncounterSessionId")) {
    state.selectedEncounterSessionId = undoData.previousSelectedEncounterSessionId || "";
  }
  if (Object.prototype.hasOwnProperty.call(undoData, "previousEncounterModalOpen")) {
    state.encounterModalOpen = Boolean(undoData.previousEncounterModalOpen);
  }
  if (undoData.previousInteractionEvents) state.interactionEvents = structuredClone(undoData.previousInteractionEvents).map((activity) => normalizeInteractionActivity(activity, state));
  if (undoData.previousTransactions) state.transactions = structuredClone(undoData.previousTransactions);
  if (undoData.previousGlobalPokemonRules) state.globalPokemonRules = structuredClone(undoData.previousGlobalPokemonRules);
  if (undoData.previousBanlistHistory) state.banlistHistory = structuredClone(undoData.previousBanlistHistory);
  if (undoData.previousTeambuilder) state.teambuilder = structuredClone(undoData.previousTeambuilder);
  if (undoData.previousBattleTeams) state.battleTeams = structuredClone(undoData.previousBattleTeams);
  if (undoData.previousPerkSystem) state.perkSystem = structuredClone(undoData.previousPerkSystem);
  if (undoData.previousClassStateByPlayerId) state.classStateByPlayerId = structuredClone(undoData.previousClassStateByPlayerId);
  if (undoData.previousPhaseState) state.phaseState = structuredClone(undoData.previousPhaseState);
  if (undoData.previousEffectAuditRecords) state.effectAuditRecords = structuredClone(undoData.previousEffectAuditRecords);
  if (undoData.previousEffectOperations) state.effectOperations = structuredClone(undoData.previousEffectOperations);
  if (undoData.previousDelayedEffects) state.delayedEffects = structuredClone(undoData.previousDelayedEffects);
  if (undoData.previousBroughtTeamSnapshots) state.broughtTeamSnapshots = structuredClone(undoData.previousBroughtTeamSnapshots);
  if (undoData.previousCopiedActivations) state.copiedActivations = structuredClone(undoData.previousCopiedActivations);
  if (undoData.previousPostPayoutProcedures) state.postPayoutProcedures = structuredClone(undoData.previousPostPayoutProcedures);
  if (undoData.previousEndOfActionProcedures) state.endOfActionProcedures = structuredClone(undoData.previousEndOfActionProcedures);
  if (undoData.previousCopiedTokenRelationships) state.copiedTokenRelationships = structuredClone(undoData.previousCopiedTokenRelationships);
  if (undoData.previousPrivateEffectRecords) state.privateEffectRecords = structuredClone(undoData.previousPrivateEffectRecords);
  if (undoData.previousEncounterCopyRecords) state.encounterCopyRecords = structuredClone(undoData.previousEncounterCopyRecords);
  syncLinkedTransactions();
  syncPlayerPokemonLists();
}
```

### Function undoLogEntry — lines 61314-61642

Large function (22498 chars). First/last 35 lines:

```javascript
function undoLogEntry(logId) {
  // Undo is intentionally data-driven: add new actionType handlers here as
  // future confirmed events begin storing their own reverse instructions.
  const entry = state.log.find((item) => item.id === logId);
  if (!entry || entry.undone || !entry.undoable || !entry.undoData) return;
  const { undoData } = entry;
  if (["undoTokenEffectContract", "undoTokenEffectContractCausal"].includes(undoData.actionType)) {
    const newer = newerCommittedTokenEffectLog(entry);
    if (newer) {
      alert(`Rewind the newer Token event first:\n\n${describeLogEntry(newer)}`);
      return;
    }
  }
  if (undoData.actionType === "removeBattleRecord") {
    state.battleRecords = state.battleRecords.filter((record) => record.id !== undoData.battleRecordId);
  } else if (undoData.actionType === "restoreBattleRecords") {
    restoreBattleRecords(undoData.records || []);
  } else if (undoData.actionType === "restoreBattlePhaseSimulation") {
    state.battleRecords = structuredClone(undoData.previousBattleRecords || []);
    state.battleSchedules ||= {};
    state.battleSchedules[gymResultKey(undoData.series || state.series, undoData.gym || state.gym)] = structuredClone(undoData.previousSchedule || {});
    state.pendingBattle = structuredClone(undoData.previousPendingBattle || {});
    syncPlayerPokemonLists();
  } else if (undoData.actionType === "removePokemonRecord") {
    state.pokemonRecords = state.pokemonRecords.filter((pokemon) => pokemon.id !== undoData.pokemonId);
    syncPlayerPokemonLists();
  } else if (undoData.actionType === "undoGymResults") {
    const gymResult = (state.gymResults || []).find((result) => result.id === undoData.gymResultId);
    if (gymResult) gymResult.undone = true;
    const replacedResult = (state.gymResults || []).find((result) => result.id === undoData.replacedResultId);
    if (replacedResult) replacedResult.undone = false;
    restoreGymResultUndoData(undoData);
  } else if (undoData.actionType === "undoBadgePointPurchase") {
    const player = state.players.find((candidate) => candidate.id === undoData.playerId);
    if (player) {
...
    if (previous.effectOperations) state.effectOperations = structuredClone(previous.effectOperations);
    ensureGymPhaseState(state.series, state.gym);
  } else {
    return;
  }
  entry.undone = true;
  const repairLog = addLogEntry({
    action: "undo",
    category: "other",
    player: "Activity Log",
    item: `Undid: ${describeLogEntry(entry)}`,
    type: undoData.actionType === "undoTokenEffectContract" ? "token-effect-repair" : "undo",
    resolutionResult: undoData.actionType === "undoTokenEffectContract" ? "repaired" : "",
    linkedEventId: undoData.effectId || "",
    quantity: 1,
    price: 0,
    balanceAfter: 0
  });
  if (undoData.actionType === "undoTokenEffectContract") {
    const tokenName = entry.tokenNames?.[0] || entry.title || "Token";
    const repairAudit = tokenEffectAuditRecord({
      stage: "repair",
      draft: { tokenName },
      metadata: tokenEffectMetadataByName(tokenName),
      result: "repaired",
      mutations: [`Rewound ${describeLogEntry(entry)}`],
      persistentStateIds: [],
      undoLogId: repairLog?.id || ""
    });
    repairAudit.undoStatus = "repaired";
  }
  syncPlayerPokemonLists();
  saveState();
  render();
}
```

### Function bindEvents — lines 61904-64249

Large function (105787 chars). First/last 35 lines:

```javascript
function bindEvents() {
  window.addEventListener("popstate", () => {
    if (shouldShowGameExperience()) {
      applyGameClientRouteFromUrl();
      enterGameExperience({ updateUrl: false });
    } else {
      setSiteShellVisible(true);
      renderSiteShell();
      loadSiteShellData();
    }
  });
  document.addEventListener("click", (event) => {
    const shellSection = event.target.closest("[data-global-shell-section]");
    if (shellSection) {
      openGlobalShellSection(shellSection.dataset.globalShellSection || "home");
      if (els.globalAccountMenu) els.globalAccountMenu.open = false;
      return;
    }
    const accountAction = event.target.closest("[data-global-account-action]");
    if (accountAction) {
      const action = accountAction.dataset.globalAccountAction;
      if (action === "site-admin") openGlobalShellSection("admin");
      if (action === "game-admin") openAdminTools();
      if (action === "logout") logoutSiteProfile();
      if (els.globalAccountMenu) els.globalAccountMenu.open = false;
      return;
    }
    const gameDestination = event.target.closest("[data-game-page]");
    if (gameDestination) {
      openGlobalGameDestination(gameDestination.dataset.gamePage || "playerHub", gameDestination.dataset.gameView || "");
      return;
    }
    const gameAction = event.target.closest("[data-game-action]");
    if (gameAction) {
      openGameShellAction(gameAction.dataset.gameAction || "");
...
  });
  [els.activationTargetType, els.activationTargetPlayer, els.activationTargetPokemon, els.activationSpeciesSearch, els.activationTargetName, els.activationChoices, els.activationDuration].forEach((control) => {
    if (!control) return;
    control.addEventListener("input", updateActivationOverlay);
    control.addEventListener("change", updateActivationOverlay);
  });
  els.activationSpeciesResults?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-activation-species]");
    if (!button) return;
    els.activationSpeciesSearch.value = button.dataset.activationSpecies || "";
    updateActivationOverlay();
  });
  els.applyActivation.addEventListener("click", async (event) => {
    event.stopPropagation();
    await applyActivationOverlay();
  });
  els.cancelActivation.addEventListener("click", (event) => {
    event.stopPropagation();
    closeActivationOverlay();
  });
  els.cancelActivationSecondary.addEventListener("click", (event) => {
    event.stopPropagation();
    closeActivationOverlay();
  });
  els.activationOverlay.addEventListener("click", (event) => {
    if (event.target === els.activationOverlay) closeActivationOverlay();
    else event.stopPropagation();
  });
  if (els.balanceForm) {
    els.balanceForm.addEventListener("submit", (event) => {
      event.preventDefault();
      adjustBalance(event.submitter?.dataset.mode || "add");
    });
  }
}
```


## index.html — retired static encounter UI

### Encounter Wheel

Occurrences: 3

#### Hit 1 — line 1366

```text
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
```


#### Hit 2 — line 1370

```text
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
```


#### Hit 3 — line 1371

```text
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
```


### encounterOverlay

Occurrences: 2

#### Hit 1 — line 1365

```text
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
```


#### Hit 2 — line 1366

```text
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
```


### encounterTab

Occurrences: 1

#### Hit 1 — line 1365

```text
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
```


### Hidden Grotto

Occurrences: 0

### encounter-token-runtime.js

Occurrences: 1

#### Hit 1 — line 16

```text
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
```



## token-effect-contract.js — encounter wording

### extra-encounter-token

Occurrences: 2

#### Hit 1 — line 260

```text
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
```


#### Hit 2 — line 766

```text
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
```


### reroll-token

Occurrences: 3

#### Hit 1 — line 87

```text
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
```


#### Hit 2 — line 330

```text
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
```


#### Hit 3 — line 765

```text
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
```


### repel-token

Occurrences: 2

#### Hit 1 — line 92

```text
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
```


#### Hit 2 — line 767

```text
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
```


### dream-ball-token

Occurrences: 2

#### Hit 1 — line 92

```text
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
```


#### Hit 2 — line 769

```text
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
```


### honey-token

Occurrences: 6

#### Hit 1 — line 88

```text
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
```


#### Hit 2 — line 337

```text
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
```


#### Hit 3 — line 451

```text
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
```


#### Hit 4 — line 770

```text
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
```


#### Hit 5 — line 817

```text
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
```


#### Hit 6 — line 1192

```text
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
```


### master-ball-token

Occurrences: 2

#### Hit 1 — line 92

```text
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
```


#### Hit 2 — line 771

```text
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
```


### Encounter Wheel

Occurrences: 1

#### Hit 1 — line 766

```text
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
```


### Hidden Grotto

Occurrences: 1

#### Hit 1 — line 770

```text
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
```



## package.json — encounter/runtime tests and scripts

### encounter

Occurrences: 3

#### Hit 1 — line 10

```text
     6 |   "scripts": {
     7 |     "start": "node server.js",
     8 |     "dev": "node server.js",
     9 |     "simulate:series": "node scripts/simulate-series.js",
    10 |     "import:encounters:hoenn": "node scripts/import-pokeapi-hoenn-encounters.js",
    11 |     "import:build-data": "node scripts/import-pokeapi-build-data.js pokemon-build-data.js pokemon-build-data.js",
    12 |     "generate:move-classification": "node scripts/generate-move-classification-data.js",
    13 |     "audit:build-data": "node scripts/audit-build-learnsets.js",
    14 |     "audit:tm-shop": "node scripts/audit-tm-shop-coverage.js",
```


#### Hit 2 — line 10

```text
     6 |   "scripts": {
     7 |     "start": "node server.js",
     8 |     "dev": "node server.js",
     9 |     "simulate:series": "node scripts/simulate-series.js",
    10 |     "import:encounters:hoenn": "node scripts/import-pokeapi-hoenn-encounters.js",
    11 |     "import:build-data": "node scripts/import-pokeapi-build-data.js pokemon-build-data.js pokemon-build-data.js",
    12 |     "generate:move-classification": "node scripts/generate-move-classification-data.js",
    13 |     "audit:build-data": "node scripts/audit-build-learnsets.js",
    14 |     "audit:tm-shop": "node scripts/audit-tm-shop-coverage.js",
```


#### Hit 3 — line 43

```text
    39 |     "test:action-balance": "node --test scripts/test-action-phase-balance.js",
    40 |     "test:action-workspace": "node --test scripts/test-action-phase-workspace.js",
    41 |     "test:v2-route-browser": "node --test scripts/test-v2-route-browser-mount.js",
    42 |     "test:v2-route-runtime": "node --test scripts/test-v2-route-runtime-sequences.js",
    43 |     "test:v2-routes": "node --test versions/next-action-phase/tests/test-route-encounter-engine.js",
    44 |     "test:provisional-declarations": "node --test scripts/test-provisional-declaration-runtime.js scripts/test-provisional-declaration-server.js",
    45 |     "test:live-referee-context": "node --test scripts/test-live-referee-controlled-context.js",
    46 |     "test:live-referee-lifecycle": "node --test scripts/test-live-referee-lifecycle.js",
    47 |     "test:live-referee-regressions": "node --test scripts/test-live-referee-token-regressions.js",
```


### action-workspace

Occurrences: 1

#### Hit 1 — line 40

```text
    36 |     "test:battle-phase": "node --test scripts/test-battle-phase-authority.js",
    37 |     "test:sabotage-flow": "node --test scripts/test-sabotage-effect-flow.js",
    38 |     "test:action-operations": "node --test scripts/test-action-operation-contract.js",
    39 |     "test:action-balance": "node --test scripts/test-action-phase-balance.js",
    40 |     "test:action-workspace": "node --test scripts/test-action-phase-workspace.js",
    41 |     "test:v2-route-browser": "node --test scripts/test-v2-route-browser-mount.js",
    42 |     "test:v2-route-runtime": "node --test scripts/test-v2-route-runtime-sequences.js",
    43 |     "test:v2-routes": "node --test versions/next-action-phase/tests/test-route-encounter-engine.js",
    44 |     "test:provisional-declarations": "node --test scripts/test-provisional-declaration-runtime.js scripts/test-provisional-declaration-server.js",
```


### action-balance

Occurrences: 1

#### Hit 1 — line 39

```text
    35 |     "test:gameplay-ribbon": "node --test scripts/test-gameplay-ribbon-league-menu.js",
    36 |     "test:battle-phase": "node --test scripts/test-battle-phase-authority.js",
    37 |     "test:sabotage-flow": "node --test scripts/test-sabotage-effect-flow.js",
    38 |     "test:action-operations": "node --test scripts/test-action-operation-contract.js",
    39 |     "test:action-balance": "node --test scripts/test-action-phase-balance.js",
    40 |     "test:action-workspace": "node --test scripts/test-action-phase-workspace.js",
    41 |     "test:v2-route-browser": "node --test scripts/test-v2-route-browser-mount.js",
    42 |     "test:v2-route-runtime": "node --test scripts/test-v2-route-runtime-sequences.js",
    43 |     "test:v2-routes": "node --test versions/next-action-phase/tests/test-route-encounter-engine.js",
```


### v2-route

Occurrences: 6

#### Hit 1 — line 18

```text
    14 |     "audit:tm-shop": "node scripts/audit-tm-shop-coverage.js",
    15 |     "audit:item-shop-sprites": "node scripts/audit-item-shop-sprites.js --check",
    16 |     "audit:item-shop-z-catalog": "node scripts/audit-item-shop-z-catalog.js --check",
    17 |     "audit:docs": "node scripts/check-doc-links.js",
    18 |     "audit:v2-routes": "node versions/next-action-phase/audit-route-generation.js",
    19 |     "generate:token-matrix": "node scripts/generate-token-effect-matrix.js",
    20 |     "generate:token-coverage": "node scripts/generate-token-qa-coverage.js",
    21 |     "generate:token-handoff": "node scripts/generate-token-final-handoff.js",
    22 |     "audit:token-contract": "node scripts/generate-token-effect-matrix.js --check",
```


#### Hit 2 — line 41

```text
    37 |     "test:sabotage-flow": "node --test scripts/test-sabotage-effect-flow.js",
    38 |     "test:action-operations": "node --test scripts/test-action-operation-contract.js",
    39 |     "test:action-balance": "node --test scripts/test-action-phase-balance.js",
    40 |     "test:action-workspace": "node --test scripts/test-action-phase-workspace.js",
    41 |     "test:v2-route-browser": "node --test scripts/test-v2-route-browser-mount.js",
    42 |     "test:v2-route-runtime": "node --test scripts/test-v2-route-runtime-sequences.js",
    43 |     "test:v2-routes": "node --test versions/next-action-phase/tests/test-route-encounter-engine.js",
    44 |     "test:provisional-declarations": "node --test scripts/test-provisional-declaration-runtime.js scripts/test-provisional-declaration-server.js",
    45 |     "test:live-referee-context": "node --test scripts/test-live-referee-controlled-context.js",
```


#### Hit 3 — line 41

```text
    37 |     "test:sabotage-flow": "node --test scripts/test-sabotage-effect-flow.js",
    38 |     "test:action-operations": "node --test scripts/test-action-operation-contract.js",
    39 |     "test:action-balance": "node --test scripts/test-action-phase-balance.js",
    40 |     "test:action-workspace": "node --test scripts/test-action-phase-workspace.js",
    41 |     "test:v2-route-browser": "node --test scripts/test-v2-route-browser-mount.js",
    42 |     "test:v2-route-runtime": "node --test scripts/test-v2-route-runtime-sequences.js",
    43 |     "test:v2-routes": "node --test versions/next-action-phase/tests/test-route-encounter-engine.js",
    44 |     "test:provisional-declarations": "node --test scripts/test-provisional-declaration-runtime.js scripts/test-provisional-declaration-server.js",
    45 |     "test:live-referee-context": "node --test scripts/test-live-referee-controlled-context.js",
```


#### Hit 4 — line 42

```text
    38 |     "test:action-operations": "node --test scripts/test-action-operation-contract.js",
    39 |     "test:action-balance": "node --test scripts/test-action-phase-balance.js",
    40 |     "test:action-workspace": "node --test scripts/test-action-phase-workspace.js",
    41 |     "test:v2-route-browser": "node --test scripts/test-v2-route-browser-mount.js",
    42 |     "test:v2-route-runtime": "node --test scripts/test-v2-route-runtime-sequences.js",
    43 |     "test:v2-routes": "node --test versions/next-action-phase/tests/test-route-encounter-engine.js",
    44 |     "test:provisional-declarations": "node --test scripts/test-provisional-declaration-runtime.js scripts/test-provisional-declaration-server.js",
    45 |     "test:live-referee-context": "node --test scripts/test-live-referee-controlled-context.js",
    46 |     "test:live-referee-lifecycle": "node --test scripts/test-live-referee-lifecycle.js",
```


#### Hit 5 — line 42

```text
    38 |     "test:action-operations": "node --test scripts/test-action-operation-contract.js",
    39 |     "test:action-balance": "node --test scripts/test-action-phase-balance.js",
    40 |     "test:action-workspace": "node --test scripts/test-action-phase-workspace.js",
    41 |     "test:v2-route-browser": "node --test scripts/test-v2-route-browser-mount.js",
    42 |     "test:v2-route-runtime": "node --test scripts/test-v2-route-runtime-sequences.js",
    43 |     "test:v2-routes": "node --test versions/next-action-phase/tests/test-route-encounter-engine.js",
    44 |     "test:provisional-declarations": "node --test scripts/test-provisional-declaration-runtime.js scripts/test-provisional-declaration-server.js",
    45 |     "test:live-referee-context": "node --test scripts/test-live-referee-controlled-context.js",
    46 |     "test:live-referee-lifecycle": "node --test scripts/test-live-referee-lifecycle.js",
```


#### Hit 6 — line 43

```text
    39 |     "test:action-balance": "node --test scripts/test-action-phase-balance.js",
    40 |     "test:action-workspace": "node --test scripts/test-action-phase-workspace.js",
    41 |     "test:v2-route-browser": "node --test scripts/test-v2-route-browser-mount.js",
    42 |     "test:v2-route-runtime": "node --test scripts/test-v2-route-runtime-sequences.js",
    43 |     "test:v2-routes": "node --test versions/next-action-phase/tests/test-route-encounter-engine.js",
    44 |     "test:provisional-declarations": "node --test scripts/test-provisional-declaration-runtime.js scripts/test-provisional-declaration-server.js",
    45 |     "test:live-referee-context": "node --test scripts/test-live-referee-controlled-context.js",
    46 |     "test:live-referee-lifecycle": "node --test scripts/test-live-referee-lifecycle.js",
    47 |     "test:live-referee-regressions": "node --test scripts/test-live-referee-token-regressions.js",
```



## encounter-token-runtime.js — full retired runtime candidate

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
