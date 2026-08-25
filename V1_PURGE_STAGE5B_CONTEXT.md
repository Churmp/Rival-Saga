# V1 Purge Stage 5B Focused Encounter Wheel Context

Generated from `721c4877473236467f6d29bde3414782c72ede54` after Stage 5A.

This report intentionally separates the retired Encounter Wheel/session UI from shared Random Pokemon and token-effect helpers.

## Occurrence contexts

### encounterSessions

Occurrences: 34

#### Hit 1 — line 2550

```text
  2545 |       result: null
  2546 |     },
  2547 |     selectedWheelSessionId: "",
  2548 |     wheelDrawerOpen: false,
  2549 |     skipWheelAnimation: false,
  2550 |     encounterSessions: [],
  2551 |     selectedEncounterSessionId: "",
  2552 |     encounterModalOpen: false,
  2553 |     randomPokemonSessions: [],
  2554 |     pokemonFamilyTierCache: {},
  2555 |     pokemonSpriteVariants: {},
```

#### Hit 2 — line 3812

```text
  3807 |     previousLingeringStatuses: structuredClone(state.lingeringStatuses || []),
  3808 |     previousTokenActivations: structuredClone(state.tokenActivations || []),
  3809 |     previousTokenConsumptions: structuredClone(state.tokenConsumptions || []),
  3810 |     previousPlayerNotifications: structuredClone(state.playerNotifications || []),
  3811 |     previousWheelSessions: structuredClone(state.wheelSessions || []),
  3812 |     previousEncounterSessions: structuredClone(state.encounterSessions || []),
  3813 |     previousRandomPokemonSessions: structuredClone(state.randomPokemonSessions || []),
  3814 |     previousSelectedEncounterSessionId: state.selectedEncounterSessionId || "",
  3815 |     previousEncounterModalOpen: Boolean(state.encounterModalOpen),
  3816 |     previousInteractionEvents: structuredClone(state.interactionEvents || []),
  3817 |     previousTransactions: structuredClone(state.transactions || []),
```

#### Hit 3 — line 4341

```text
  4336 |     notifications: causalIdCollectionDelta(snapshot.previousPlayerNotifications, state.playerNotifications),
  4337 |     effectOperations: causalIdCollectionDelta(snapshot.previousEffectOperations, state.effectOperations),
  4338 |     copiedActivations: causalIdCollectionDelta(snapshot.previousCopiedActivations, state.copiedActivations),
  4339 |     copiedTokenRelationships: causalIdCollectionDelta(snapshot.previousCopiedTokenRelationships, state.copiedTokenRelationships),
  4340 |     wheelSessions: causalIdCollectionDelta(snapshot.previousWheelSessions, state.wheelSessions),
  4341 |     encounterSessions: causalIdCollectionDelta(snapshot.previousEncounterSessions, state.encounterSessions),
  4342 |     randomPokemonSessions: causalIdCollectionDelta(snapshot.previousRandomPokemonSessions, state.randomPokemonSessions),
  4343 |     delayedEffects: causalIdCollectionDelta(snapshot.previousDelayedEffects, state.delayedEffects),
  4344 |     broughtTeamSnapshots: causalIdCollectionDelta(snapshot.previousBroughtTeamSnapshots, state.broughtTeamSnapshots),
  4345 |     postPayoutProcedures: causalIdCollectionDelta(snapshot.previousPostPayoutProcedures, state.postPayoutProcedures),
  4346 |     encounterCopyRecords: causalIdCollectionDelta(snapshot.previousEncounterCopyRecords, state.encounterCopyRecords),
```

#### Hit 4 — line 4341

```text
  4336 |     notifications: causalIdCollectionDelta(snapshot.previousPlayerNotifications, state.playerNotifications),
  4337 |     effectOperations: causalIdCollectionDelta(snapshot.previousEffectOperations, state.effectOperations),
  4338 |     copiedActivations: causalIdCollectionDelta(snapshot.previousCopiedActivations, state.copiedActivations),
  4339 |     copiedTokenRelationships: causalIdCollectionDelta(snapshot.previousCopiedTokenRelationships, state.copiedTokenRelationships),
  4340 |     wheelSessions: causalIdCollectionDelta(snapshot.previousWheelSessions, state.wheelSessions),
  4341 |     encounterSessions: causalIdCollectionDelta(snapshot.previousEncounterSessions, state.encounterSessions),
  4342 |     randomPokemonSessions: causalIdCollectionDelta(snapshot.previousRandomPokemonSessions, state.randomPokemonSessions),
  4343 |     delayedEffects: causalIdCollectionDelta(snapshot.previousDelayedEffects, state.delayedEffects),
  4344 |     broughtTeamSnapshots: causalIdCollectionDelta(snapshot.previousBroughtTeamSnapshots, state.broughtTeamSnapshots),
  4345 |     postPayoutProcedures: causalIdCollectionDelta(snapshot.previousPostPayoutProcedures, state.postPayoutProcedures),
  4346 |     encounterCopyRecords: causalIdCollectionDelta(snapshot.previousEncounterCopyRecords, state.encounterCopyRecords),
```

#### Hit 5 — line 4366

```text
  4361 | 
  4362 | function mergeCausalTokenUndoData(base = {}, later = {}) {
  4363 |   const merged = structuredClone(base || {});
  4364 |   const collectionKeys = [
  4365 |     "pokemonRecords", "statuses", "activations", "consumptions", "transactions", "notifications",
  4366 |     "effectOperations", "copiedActivations", "copiedTokenRelationships", "wheelSessions", "encounterSessions",
  4367 |     "randomPokemonSessions", "delayedEffects", "broughtTeamSnapshots", "postPayoutProcedures",
  4368 |     "encounterCopyRecords", "pokemonLog", "banlistHistory"
  4369 |   ];
  4370 |   collectionKeys.forEach((key) => {
  4371 |     merged[key] = mergeCausalIdCollectionDelta(merged[key], later[key]);
```

#### Hit 6 — line 4473

```text
  4468 |   state.playerNotifications = applyCausalIdCollectionUndo(state.playerNotifications, undoData.notifications);
  4469 |   state.effectOperations = applyCausalIdCollectionUndo(state.effectOperations, undoData.effectOperations);
  4470 |   state.copiedActivations = applyCausalIdCollectionUndo(state.copiedActivations, undoData.copiedActivations);
  4471 |   state.copiedTokenRelationships = applyCausalIdCollectionUndo(state.copiedTokenRelationships, undoData.copiedTokenRelationships);
  4472 |   state.wheelSessions = applyCausalIdCollectionUndo(state.wheelSessions, undoData.wheelSessions);
  4473 |   state.encounterSessions = applyCausalIdCollectionUndo(state.encounterSessions, undoData.encounterSessions);
  4474 |   state.randomPokemonSessions = applyCausalIdCollectionUndo(state.randomPokemonSessions, undoData.randomPokemonSessions);
  4475 |   state.delayedEffects = applyCausalIdCollectionUndo(state.delayedEffects, undoData.delayedEffects);
  4476 |   state.broughtTeamSnapshots = applyCausalIdCollectionUndo(state.broughtTeamSnapshots, undoData.broughtTeamSnapshots);
  4477 |   state.postPayoutProcedures = applyCausalIdCollectionUndo(state.postPayoutProcedures, undoData.postPayoutProcedures);
  4478 |   state.encounterCopyRecords = applyCausalIdCollectionUndo(state.encounterCopyRecords, undoData.encounterCopyRecords);
```

#### Hit 7 — line 4473

```text
  4468 |   state.playerNotifications = applyCausalIdCollectionUndo(state.playerNotifications, undoData.notifications);
  4469 |   state.effectOperations = applyCausalIdCollectionUndo(state.effectOperations, undoData.effectOperations);
  4470 |   state.copiedActivations = applyCausalIdCollectionUndo(state.copiedActivations, undoData.copiedActivations);
  4471 |   state.copiedTokenRelationships = applyCausalIdCollectionUndo(state.copiedTokenRelationships, undoData.copiedTokenRelationships);
  4472 |   state.wheelSessions = applyCausalIdCollectionUndo(state.wheelSessions, undoData.wheelSessions);
  4473 |   state.encounterSessions = applyCausalIdCollectionUndo(state.encounterSessions, undoData.encounterSessions);
  4474 |   state.randomPokemonSessions = applyCausalIdCollectionUndo(state.randomPokemonSessions, undoData.randomPokemonSessions);
  4475 |   state.delayedEffects = applyCausalIdCollectionUndo(state.delayedEffects, undoData.delayedEffects);
  4476 |   state.broughtTeamSnapshots = applyCausalIdCollectionUndo(state.broughtTeamSnapshots, undoData.broughtTeamSnapshots);
  4477 |   state.postPayoutProcedures = applyCausalIdCollectionUndo(state.postPayoutProcedures, undoData.postPayoutProcedures);
  4478 |   state.encounterCopyRecords = applyCausalIdCollectionUndo(state.encounterCopyRecords, undoData.encounterCopyRecords);
```

#### Hit 8 — line 4473

```text
  4468 |   state.playerNotifications = applyCausalIdCollectionUndo(state.playerNotifications, undoData.notifications);
  4469 |   state.effectOperations = applyCausalIdCollectionUndo(state.effectOperations, undoData.effectOperations);
  4470 |   state.copiedActivations = applyCausalIdCollectionUndo(state.copiedActivations, undoData.copiedActivations);
  4471 |   state.copiedTokenRelationships = applyCausalIdCollectionUndo(state.copiedTokenRelationships, undoData.copiedTokenRelationships);
  4472 |   state.wheelSessions = applyCausalIdCollectionUndo(state.wheelSessions, undoData.wheelSessions);
  4473 |   state.encounterSessions = applyCausalIdCollectionUndo(state.encounterSessions, undoData.encounterSessions);
  4474 |   state.randomPokemonSessions = applyCausalIdCollectionUndo(state.randomPokemonSessions, undoData.randomPokemonSessions);
  4475 |   state.delayedEffects = applyCausalIdCollectionUndo(state.delayedEffects, undoData.delayedEffects);
  4476 |   state.broughtTeamSnapshots = applyCausalIdCollectionUndo(state.broughtTeamSnapshots, undoData.broughtTeamSnapshots);
  4477 |   state.postPayoutProcedures = applyCausalIdCollectionUndo(state.postPayoutProcedures, undoData.postPayoutProcedures);
  4478 |   state.encounterCopyRecords = applyCausalIdCollectionUndo(state.encounterCopyRecords, undoData.encounterCopyRecords);
```

#### Hit 9 — line 22233

```text
 22228 |   }
 22229 |   nextState.activeWheelSession = null;
 22230 |   nextState.selectedWheelSessionId ||= "";
 22231 |   nextState.wheelDrawerOpen = Boolean(nextState.wheelDrawerOpen);
 22232 |   nextState.skipWheelAnimation = Boolean(nextState.skipWheelAnimation);
 22233 |   nextState.encounterSessions ||= [];
 22234 |   nextState.encounterSessions.forEach((session) => {
 22235 |     session.status = ["pending", "review", "completed", "undone", "cancelled"].includes(session.status) ? session.status : "pending";
 22236 |     session.rolls ||= [];
 22237 |     session.removedEntryIds ||= [];
 22238 |     session.temporaryEntries ||= [];
```

#### Hit 10 — line 22234

```text
 22229 |   nextState.activeWheelSession = null;
 22230 |   nextState.selectedWheelSessionId ||= "";
 22231 |   nextState.wheelDrawerOpen = Boolean(nextState.wheelDrawerOpen);
 22232 |   nextState.skipWheelAnimation = Boolean(nextState.skipWheelAnimation);
 22233 |   nextState.encounterSessions ||= [];
 22234 |   nextState.encounterSessions.forEach((session) => {
 22235 |     session.status = ["pending", "review", "completed", "undone", "cancelled"].includes(session.status) ? session.status : "pending";
 22236 |     session.rolls ||= [];
 22237 |     session.removedEntryIds ||= [];
 22238 |     session.temporaryEntries ||= [];
 22239 |     session.weightOverrides ||= {};
```

#### Hit 11 — line 34646

```text
 34641 |       completedAt: operation.completedAt || "",
 34642 |       completionReason: operation.completionReason || ""
 34643 |     }));
 34644 |   gymState.actionOperations.forEach((operation) => {
 34645 |     if (operation.status !== "resolving" || operation.linkedFeatureType !== "encounter") return;
 34646 |     const encounterSession = (state.encounterSessions || []).find((session) => session.id === operation.linkedFeatureSessionId);
 34647 |     if (!encounterSessionReadyForAutomaticCompletion(encounterSession)) return;
 34648 |     const completedAt = encounterSession.completedAt || new Date().toISOString();
 34649 |     encounterSession.status = "completed";
 34650 |     encounterSession.completedAt = completedAt;
 34651 |     operation.status = "completed";
```

#### Hit 12 — line 34822

```text
 34817 | 
 34818 | function linkedActionOperationSession(operation) {
 34819 |   if (!operation?.linkedFeatureSessionId) return null;
 34820 |   const collections = {
 34821 |     wheel: state.wheelSessions,
 34822 |     encounter: state.encounterSessions,
 34823 |     "silph-co": state.silphCoSessions,
 34824 |     "bulletin-board": state.bulletinBoardSessions,
 34825 |     breeder: null,
 34826 |     "game-corner": state.gameCornerSessions,
 34827 |     "pokemon-center": state.pokemonCenterSessions,
```

#### Hit 13 — line 41229

```text
 41224 | function encounterWheelDefinition(series = state.series, gym = state.gym) {
 41225 |   return encounterWheelDefinitions[encounterWheelKey(series, gym)] || null;
 41226 | }
 41227 | 
 41228 | function pendingEncounterSessions() {
 41229 |   state.encounterSessions ||= [];
 41230 |   return state.encounterSessions.filter((session) => ["pending", "review"].includes(session.status));
 41231 | }
 41232 | 
 41233 | function selectedEncounterSession() {
 41234 |   const pending = pendingEncounterSessions();
```

#### Hit 14 — line 41230

```text
 41225 |   return encounterWheelDefinitions[encounterWheelKey(series, gym)] || null;
 41226 | }
 41227 | 
 41228 | function pendingEncounterSessions() {
 41229 |   state.encounterSessions ||= [];
 41230 |   return state.encounterSessions.filter((session) => ["pending", "review"].includes(session.status));
 41231 | }
 41232 | 
 41233 | function selectedEncounterSession() {
 41234 |   const pending = pendingEncounterSessions();
 41235 |   if (!pending.length) return null;
```

#### Hit 15 — line 41458

```text
 41453 |         sourceLabel: session.sourceLabel || "Pokemon Result",
 41454 |         resultName: session.resultDisplayName || "Pending result",
 41455 |         meta: `${session.series || state.series} Gym ${session.gym || state.gym}`
 41456 |       });
 41457 |     });
 41458 |   (state.encounterSessions || [])
 41459 |     .filter((session) => ["pending", "review"].includes(session.status))
 41460 |     .forEach((session) => {
 41461 |       const owner = state.players.find((player) => player.id === session.playerId);
 41462 |       (session.rolls || [])
 41463 |         .filter((roll) => !roll.rosterPokemonId)
```

#### Hit 16 — line 41524

```text
 41519 | async function rerollRandomPokemonResult({ targetResultId, actorPlayerId, mode = "result" }) {
 41520 |   const actor = state.players.find((player) => player.id === actorPlayerId);
 41521 |   if (!actor) return;
 41522 |   if (String(targetResultId || "").startsWith("encounter-roll:")) {
 41523 |     const [, sessionId, rollId] = targetResultId.split(":");
 41524 |     const session = (state.encounterSessions || []).find((entry) => entry.id === sessionId);
 41525 |     const roll = (session?.rolls || []).find((entry) => entry.id === rollId);
 41526 |     const effectiveMode = mode === "result" && roll?.specialEncounter && session?.playerId && session.playerId !== actor.id
 41527 |       ? "encounter"
 41528 |       : mode;
 41529 |     await rerollEncounterRoll(sessionId, rollId, { actorPlayerId: actor.id, mode: effectiveMode });
```

#### Hit 17 — line 41700

```text
 41695 |   return true;
 41696 | }
 41697 | 
 41698 | async function addEncounterRollToRoster(sessionId, rollId, { skipPendingGuard = false } = {}) {
 41699 |   if (!skipPendingGuard && !guardPendingEventBeforeAction("Accept Encounter Result", () => addEncounterRollToRoster(sessionId, rollId, { skipPendingGuard: true }))) return;
 41700 |   const session = (state.encounterSessions || []).find((entry) => entry.id === sessionId);
 41701 |   const roll = (session?.rolls || []).find((entry) => entry.id === rollId);
 41702 |   if (!session || !roll || roll.rosterPokemonId) return;
 41703 |   const player = state.players.find((entry) => entry.id === session.playerId) || activePlayer();
 41704 |   await hydrateEncounterRollSprite(roll);
 41705 |   await ensurePokemonBuildDataLoaded({ renderOnLoad: false });
```

#### Hit 18 — line 41742

```text
 41737 |   saveState();
 41738 |   render();
 41739 | }
 41740 | 
 41741 | async function rerollEncounterRoll(sessionId, rollId, options = {}) {
 41742 |   const session = (state.encounterSessions || []).find((entry) => entry.id === sessionId);
 41743 |   const roll = (session?.rolls || []).find((entry) => entry.id === rollId);
 41744 |   if (!session || !roll || roll.rosterPokemonId) return;
 41745 |   const player = state.players.find((entry) => entry.id === session.playerId) || activePlayer();
 41746 |   const actor = state.players.find((entry) => entry.id === (options.actorPlayerId || session.playerId)) || player;
 41747 |   if (!requirePrivatePrepAccess(actor, "reroll token")) return;
```

#### Hit 19 — line 41950

```text
 41945 |   randomSession.confirmedAt = new Date().toISOString();
 41946 |   randomSession.rosterPokemonId = pokemon.id;
 41947 |   resolvePokemonResultTimingWindow(randomSession, "resolved");
 41948 |   augmentHoneyCausalUndoAfterAcquisition(randomSession, honeyAcquisitionSnapshot);
 41949 |   if (randomSession.sourceType === "encounter") {
 41950 |     const encounterSession = (state.encounterSessions || []).find((entry) => entry.id === randomSession.encounterSessionId);
 41951 |     if (encounterSession) {
 41952 |       const roll = (encounterSession.rolls || []).find((entry) => entry.id === randomSession.encounterRollId);
 41953 |       if (roll) {
 41954 |         roll.confirmedPokemonId = pokemon.id;
 41955 |         roll.confirmedAt = randomSession.confirmedAt;
```

#### Hit 20 — line 42055

```text
 42050 |   const exactToken = actor.inventory[tokenIndex];
 42051 |   const sourceEffectId = options.sourceEffectId || `reroll:${exactToken.id}:${randomSession.id}`;
 42052 |   const duplicateOperation = rerollOperationForSource(sourceEffectId);
 42053 |   if (duplicateOperation) return duplicateOperation;
 42054 |   const encounterSession = randomSession.sourceType === "encounter"
 42055 |     ? (state.encounterSessions || []).find((entry) => entry.id === randomSession.encounterSessionId)
 42056 |     : null;
 42057 |   const available = encounterSession ? encounterEntriesForSession(encounterSession) : availablePokemonForGameCornerTier(randomSession.tierId);
 42058 |   if (!available.length) {
 42059 |     alert("No Pokemon are available in this result pool.");
 42060 |     return;
```

#### Hit 21 — line 42254

```text
 42249 |   entry.encounterSessionId = session.id;
 42250 |   return entry;
 42251 | }
 42252 | 
 42253 | function activeEncounterSessionForPlayer(playerId, series = state.series, gym = state.gym) {
 42254 |   return (state.encounterSessions || []).find((session) => session.playerId === playerId
 42255 |     && session.series === series
 42256 |     && Number(session.gym) === Number(gym)
 42257 |     && ["pending", "review"].includes(session.status));
 42258 | }
 42259 | 
```

#### Hit 22 — line 42276

```text
 42271 |       alert(check.reason);
 42272 |       return false;
 42273 |     }
 42274 |   }
 42275 |   const previousVisits = structuredClone(actionVisitsForPlayer(player.id));
 42276 |   const previousEncounterSessions = structuredClone(state.encounterSessions || []);
 42277 |   const previousRandomPokemonSessions = structuredClone(state.randomPokemonSessions || []);
 42278 |   const previousPokemonRecords = structuredClone(state.pokemonRecords || []);
 42279 |   const previousInventory = structuredClone(player.inventory || []);
 42280 |   const previousInteractionEventIds = (state.interactionEvents || []).map((activity) => activity.id).filter(Boolean);
 42281 |   const previousTransactionIds = (state.transactions || []).map((transaction) => transaction.id).filter(Boolean);
```

#### Hit 23 — line 42297

```text
 42292 |     phase: currentPhase(),
 42293 |     createdAt: new Date().toISOString(),
 42294 |     placeholder: false
 42295 |   };
 42296 |   commitActionVisit(visit);
 42297 |   state.encounterSessions ||= [];
 42298 |   let session = activeEncounterSessionForPlayer(player.id);
 42299 |   const reusedSession = Boolean(session);
 42300 |   if (session) {
 42301 |     session.actionVisitIds ||= session.actionVisitId ? [session.actionVisitId] : [];
 42302 |     session.actionVisitIds.push(visit.id);
```

#### Hit 24 — line 42328

```text
 42323 |       rolls: [],
 42324 |       status: "pending",
 42325 |       visualRotation: 0,
 42326 |       createdAt: new Date().toISOString()
 42327 |     };
 42328 |     state.encounterSessions.unshift(session);
 42329 |   }
 42330 |   linkActionOperation(visit.id, { featureType: "encounter", featureSessionId: session.id });
 42331 |   state.selectedEncounterSessionId = session.id;
 42332 |   state.encounterModalOpen = true;
 42333 |   addLogEntry({
```

#### Hit 25 — line 46423

```text
 46418 |     </article>
 46419 |   `;
 46420 | }
 46421 | 
 46422 | async function completeEncounterRoll(sessionId, entryId) {
 46423 |   const session = (state.encounterSessions || []).find((entry) => entry.id === sessionId);
 46424 |   if (!session || session.status !== "pending") return;
 46425 |   session.isSpinning = false;
 46426 |   session.pendingEntryId = "";
 46427 |   const player = state.players.find((entry) => entry.id === session.playerId) || activePlayer();
 46428 |   const entries = encounterEntriesForSession(session);
```

#### Hit 26 — line 46479

```text
 46474 |   saveState();
 46475 |   render();
 46476 | }
 46477 | 
 46478 | function spinEncounterWheel(sessionId = state.selectedEncounterSessionId) {
 46479 |   const session = (state.encounterSessions || []).find((entry) => entry.id === sessionId);
 46480 |   if (!session || session.status !== "pending" || session.isSpinning) return;
 46481 |   if ((session.rolls || []).length >= Number(session.maxRolls || 2)) return;
 46482 |   const entries = encounterEntriesForSession(session);
 46483 |   if (!entries.length) {
 46484 |     alert("No valid Pokemon are available on this Encounter Wheel. Banned Pokemon are excluded.");
```

#### Hit 27 — line 46524

```text
 46519 |   window.setTimeout(() => completeEncounterRoll(session.id, result.id), 5200);
 46520 | }
 46521 | 
 46522 | function closeEncounterSession(sessionId = state.selectedEncounterSessionId, { skipPendingGuard = false } = {}) {
 46523 |   if (!skipPendingGuard && !guardPendingEventBeforeAction("Close Encounter Session", () => closeEncounterSession(sessionId, { skipPendingGuard: true }))) return;
 46524 |   const session = (state.encounterSessions || []).find((entry) => entry.id === sessionId);
 46525 |   if (!session) return;
 46526 |   const unaddedRolls = (session.rolls || []).filter((roll) => !encounterRollWasObtained(roll));
 46527 |   if (unaddedRolls.length) {
 46528 |     alert("Add every Encounter result to the party before closing this Encounter session.");
 46529 |     state.encounterModalOpen = true;
```

#### Hit 28 — line 48023

```text
 48018 |     "tokenConsumptions",
 48019 |     "tokenActivations",
 48020 |     "playerNotifications",
 48021 |     "lingeringStatuses",
 48022 |     "randomPokemonSessions",
 48023 |     "encounterSessions",
 48024 |     "wheelSessions"
 48025 |   ].forEach((key) => markSandboxCollectionChanges(candidate, baseline, key, origin));
 48026 |   candidate.chronologyCounter = Number(candidate.chronologyCounter || 0) + 1;
 48027 |   candidate.log ||= [];
 48028 |   candidate.log.unshift({
```

#### Hit 29 — line 50043

```text
 50038 | 
 50039 | function honeyEligibleEncounterResults() {
 50040 |   return (state.randomPokemonSessions || []).filter((session) => {
 50041 |     if (session.sourceType !== "encounter" || session.status !== "confirmed") return false;
 50042 |     if (session.copiedFromRandomPokemonSessionId || session.sourceLabel === "Honey copied Encounter") return false;
 50043 |     const parent = (state.encounterSessions || []).find((entry) => entry.id === session.encounterSessionId);
 50044 |     return String(session.series || parent?.series || state.series) === String(state.series)
 50045 |       && Number(session.gym || parent?.gym || state.gym) === Number(state.gym);
 50046 |   });
 50047 | }
 50048 | 
```

#### Hit 30 — line 60684

```text
 60679 | }
 60680 | 
 60681 | function undoEncounterActionVisit(undoData) {
 60682 |   const player = state.players.find((candidate) => candidate.id === undoData.playerId);
 60683 |   if (player && undoData.previousInventory) player.inventory = structuredClone(undoData.previousInventory);
 60684 |   const session = (state.encounterSessions || []).find((entry) => entry.id === undoData.encounterSessionId);
 60685 |   if (!session) {
 60686 |     if (undoData.previousEncounterSessions) state.encounterSessions = structuredClone(undoData.previousEncounterSessions);
 60687 |     if (undoData.previousRandomPokemonSessions) state.randomPokemonSessions = structuredClone(undoData.previousRandomPokemonSessions);
 60688 |     if (undoData.previousPokemonRecords) state.pokemonRecords = structuredClone(undoData.previousPokemonRecords).map(normalizePokemonRecord);
 60689 |     if (undoData.previousInteractionEvents) {
```

#### Hit 31 — line 60686

```text
 60681 | function undoEncounterActionVisit(undoData) {
 60682 |   const player = state.players.find((candidate) => candidate.id === undoData.playerId);
 60683 |   if (player && undoData.previousInventory) player.inventory = structuredClone(undoData.previousInventory);
 60684 |   const session = (state.encounterSessions || []).find((entry) => entry.id === undoData.encounterSessionId);
 60685 |   if (!session) {
 60686 |     if (undoData.previousEncounterSessions) state.encounterSessions = structuredClone(undoData.previousEncounterSessions);
 60687 |     if (undoData.previousRandomPokemonSessions) state.randomPokemonSessions = structuredClone(undoData.previousRandomPokemonSessions);
 60688 |     if (undoData.previousPokemonRecords) state.pokemonRecords = structuredClone(undoData.previousPokemonRecords).map(normalizePokemonRecord);
 60689 |     if (undoData.previousInteractionEvents) {
 60690 |       state.interactionEvents = structuredClone(undoData.previousInteractionEvents);
 60691 |     } else if (Array.isArray(undoData.previousInteractionEventIds)) {
```

#### Hit 32 — line 60734

```text
 60729 |   state.interactionEvents = (state.interactionEvents || []).filter((activity) => !interactionIdsToRemove.has(activity.id));
 60730 |   state.transactions = (state.transactions || []).filter((transaction) => !interactionIdsToRemove.has(transaction.linkedEventId));
 60731 |   syncLinkedTransactions();
 60732 |   state.pokemonRecords = (state.pokemonRecords || []).filter((pokemon) => !pokemonIdsToRemove.has(pokemon.id));
 60733 |   if (!session.actionVisitIds.length && !(session.rolls || []).length) {
 60734 |     state.encounterSessions = (state.encounterSessions || []).filter((entry) => entry.id !== session.id);
 60735 |   } else if (player) {
 60736 |     updateEncounterActionLog(session, player);
 60737 |   }
 60738 |   if (state.selectedEncounterSessionId === undoData.encounterSessionId && !pendingEncounterSessions().some((entry) => entry.id === state.selectedEncounterSessionId)) {
 60739 |     state.selectedEncounterSessionId = "";
```

#### Hit 33 — line 60734

```text
 60729 |   state.interactionEvents = (state.interactionEvents || []).filter((activity) => !interactionIdsToRemove.has(activity.id));
 60730 |   state.transactions = (state.transactions || []).filter((transaction) => !interactionIdsToRemove.has(transaction.linkedEventId));
 60731 |   syncLinkedTransactions();
 60732 |   state.pokemonRecords = (state.pokemonRecords || []).filter((pokemon) => !pokemonIdsToRemove.has(pokemon.id));
 60733 |   if (!session.actionVisitIds.length && !(session.rolls || []).length) {
 60734 |     state.encounterSessions = (state.encounterSessions || []).filter((entry) => entry.id !== session.id);
 60735 |   } else if (player) {
 60736 |     updateEncounterActionLog(session, player);
 60737 |   }
 60738 |   if (state.selectedEncounterSessionId === undoData.encounterSessionId && !pendingEncounterSessions().some((entry) => entry.id === state.selectedEncounterSessionId)) {
 60739 |     state.selectedEncounterSessionId = "";
```

#### Hit 34 — line 60754

```text
 60749 |   if (undoData.previousLingeringStatuses) state.lingeringStatuses = structuredClone(undoData.previousLingeringStatuses);
 60750 |   if (undoData.previousTokenActivations) state.tokenActivations = structuredClone(undoData.previousTokenActivations);
 60751 |   if (undoData.previousTokenConsumptions) state.tokenConsumptions = structuredClone(undoData.previousTokenConsumptions);
 60752 |   if (undoData.previousPlayerNotifications) state.playerNotifications = structuredClone(undoData.previousPlayerNotifications);
 60753 |   if (undoData.previousWheelSessions) state.wheelSessions = structuredClone(undoData.previousWheelSessions);
 60754 |   if (undoData.previousEncounterSessions) state.encounterSessions = structuredClone(undoData.previousEncounterSessions);
 60755 |   if (undoData.previousRandomPokemonSessions) state.randomPokemonSessions = structuredClone(undoData.previousRandomPokemonSessions);
 60756 |   if (Object.prototype.hasOwnProperty.call(undoData, "previousSelectedEncounterSessionId")) {
 60757 |     state.selectedEncounterSessionId = undoData.previousSelectedEncounterSessionId || "";
 60758 |   }
 60759 |   if (Object.prototype.hasOwnProperty.call(undoData, "previousEncounterModalOpen")) {
```


### selectedEncounterSessionId

Occurrences: 17

#### Hit 1 — line 86

```text
    81 |   "activityToasts",
    82 |   "wheelDrawerOpen",
    83 |   "selectedWheelSessionId",
    84 |   "skipWheelAnimation",
    85 |   "encounterModalOpen",
    86 |   "selectedEncounterSessionId",
    87 |   "randomPokemonDrawerOpen",
    88 |   "selectedRandomPokemonSessionId",
    89 |   "opponentDrawer",
    90 |   "routeUiState"
    91 | ]);
```

#### Hit 2 — line 2551

```text
  2546 |     },
  2547 |     selectedWheelSessionId: "",
  2548 |     wheelDrawerOpen: false,
  2549 |     skipWheelAnimation: false,
  2550 |     encounterSessions: [],
  2551 |     selectedEncounterSessionId: "",
  2552 |     encounterModalOpen: false,
  2553 |     randomPokemonSessions: [],
  2554 |     pokemonFamilyTierCache: {},
  2555 |     pokemonSpriteVariants: {},
  2556 |     tokenArtLibrary: {},
```

#### Hit 3 — line 3814

```text
  3809 |     previousTokenConsumptions: structuredClone(state.tokenConsumptions || []),
  3810 |     previousPlayerNotifications: structuredClone(state.playerNotifications || []),
  3811 |     previousWheelSessions: structuredClone(state.wheelSessions || []),
  3812 |     previousEncounterSessions: structuredClone(state.encounterSessions || []),
  3813 |     previousRandomPokemonSessions: structuredClone(state.randomPokemonSessions || []),
  3814 |     previousSelectedEncounterSessionId: state.selectedEncounterSessionId || "",
  3815 |     previousEncounterModalOpen: Boolean(state.encounterModalOpen),
  3816 |     previousInteractionEvents: structuredClone(state.interactionEvents || []),
  3817 |     previousTransactions: structuredClone(state.transactions || []),
  3818 |     previousGlobalPokemonRules: structuredClone(state.globalPokemonRules || {}),
  3819 |     previousBanlistHistory: structuredClone(state.banlistHistory || []),
```

#### Hit 4 — line 22246

```text
 22241 |     session.resultSessionIds ||= [];
 22242 |     session.visualRotation = Number(session.visualRotation || 0);
 22243 |     session.isSpinning = false;
 22244 |     session.pendingEntryId = "";
 22245 |   });
 22246 |   nextState.selectedEncounterSessionId ||= "";
 22247 |   nextState.encounterModalOpen = Boolean(nextState.encounterModalOpen);
 22248 |   nextState.randomPokemonSessions ||= [];
 22249 |   nextState.pokemonFamilyTierCache ||= {};
 22250 |   pokemonFamilyTierCache = nextState.pokemonFamilyTierCache;
 22251 |   nextState.pokemonSpriteVariants ||= {};
```

#### Hit 5 — line 41236

```text
 41231 | }
 41232 | 
 41233 | function selectedEncounterSession() {
 41234 |   const pending = pendingEncounterSessions();
 41235 |   if (!pending.length) return null;
 41236 |   let session = pending.find((entry) => entry.id === state.selectedEncounterSessionId);
 41237 |   if (!session) {
 41238 |     session = pending[0];
 41239 |     state.selectedEncounterSessionId = session.id;
 41240 |   }
 41241 |   return session;
```

#### Hit 6 — line 41239

```text
 41234 |   const pending = pendingEncounterSessions();
 41235 |   if (!pending.length) return null;
 41236 |   let session = pending.find((entry) => entry.id === state.selectedEncounterSessionId);
 41237 |   if (!session) {
 41238 |     session = pending[0];
 41239 |     state.selectedEncounterSessionId = session.id;
 41240 |   }
 41241 |   return session;
 41242 | }
 41243 | 
 41244 | function encounterEntriesForSession(session) {
```

#### Hit 7 — line 41693

```text
 41688 |   session.completedAt ||= new Date().toISOString();
 41689 |   (session.actionVisitIds || [session.actionVisitId]).filter(Boolean).forEach((visitId) => {
 41690 |     completeActionOperationForVisit(visitId, completionReason, session.series, session.gym);
 41691 |   });
 41692 |   const next = pendingEncounterSessions().find((entry) => entry.id !== session.id);
 41693 |   state.selectedEncounterSessionId = next?.id || "";
 41694 |   state.encounterModalOpen = Boolean(next);
 41695 |   return true;
 41696 | }
 41697 | 
 41698 | async function addEncounterRollToRoster(sessionId, rollId, { skipPendingGuard = false } = {}) {
```

#### Hit 8 — line 42331

```text
 42326 |       createdAt: new Date().toISOString()
 42327 |     };
 42328 |     state.encounterSessions.unshift(session);
 42329 |   }
 42330 |   linkActionOperation(visit.id, { featureType: "encounter", featureSessionId: session.id });
 42331 |   state.selectedEncounterSessionId = session.id;
 42332 |   state.encounterModalOpen = true;
 42333 |   addLogEntry({
 42334 |     action: "phase",
 42335 |     category: "action",
 42336 |     player: player.name,
```

#### Hit 9 — line 46478

```text
 46473 |   }
 46474 |   saveState();
 46475 |   render();
 46476 | }
 46477 | 
 46478 | function spinEncounterWheel(sessionId = state.selectedEncounterSessionId) {
 46479 |   const session = (state.encounterSessions || []).find((entry) => entry.id === sessionId);
 46480 |   if (!session || session.status !== "pending" || session.isSpinning) return;
 46481 |   if ((session.rolls || []).length >= Number(session.maxRolls || 2)) return;
 46482 |   const entries = encounterEntriesForSession(session);
 46483 |   if (!entries.length) {
```

#### Hit 10 — line 46522

```text
 46517 |     rollButton.textContent = "Spinning...";
 46518 |   }
 46519 |   window.setTimeout(() => completeEncounterRoll(session.id, result.id), 5200);
 46520 | }
 46521 | 
 46522 | function closeEncounterSession(sessionId = state.selectedEncounterSessionId, { skipPendingGuard = false } = {}) {
 46523 |   if (!skipPendingGuard && !guardPendingEventBeforeAction("Close Encounter Session", () => closeEncounterSession(sessionId, { skipPendingGuard: true }))) return;
 46524 |   const session = (state.encounterSessions || []).find((entry) => entry.id === sessionId);
 46525 |   if (!session) return;
 46526 |   const unaddedRolls = (session.rolls || []).filter((roll) => !encounterRollWasObtained(roll));
 46527 |   if (unaddedRolls.length) {
```

#### Hit 11 — line 46530

```text
 46525 |   if (!session) return;
 46526 |   const unaddedRolls = (session.rolls || []).filter((roll) => !encounterRollWasObtained(roll));
 46527 |   if (unaddedRolls.length) {
 46528 |     alert("Add every Encounter result to the party before closing this Encounter session.");
 46529 |     state.encounterModalOpen = true;
 46530 |     state.selectedEncounterSessionId = session.id;
 46531 |     saveState();
 46532 |     renderEncounterOverlay();
 46533 |     return;
 46534 |   }
 46535 |   if (session.status === "pending" && (session.rolls || []).length < Number(session.maxRolls || 2)
```

#### Hit 12 — line 46543

```text
 46538 |   session.completedAt ||= new Date().toISOString();
 46539 |   (session.actionVisitIds || [session.actionVisitId]).filter(Boolean).forEach((visitId) => {
 46540 |     completeActionOperationForVisit(visitId, "encounter-session-closed");
 46541 |   });
 46542 |   const next = pendingEncounterSessions().find((entry) => entry.id !== session.id);
 46543 |   state.selectedEncounterSessionId = next?.id || "";
 46544 |   state.encounterModalOpen = Boolean(next);
 46545 |   saveState();
 46546 |   render();
 46547 | }
 46548 | 
```

#### Hit 13 — line 60738

```text
 60733 |   if (!session.actionVisitIds.length && !(session.rolls || []).length) {
 60734 |     state.encounterSessions = (state.encounterSessions || []).filter((entry) => entry.id !== session.id);
 60735 |   } else if (player) {
 60736 |     updateEncounterActionLog(session, player);
 60737 |   }
 60738 |   if (state.selectedEncounterSessionId === undoData.encounterSessionId && !pendingEncounterSessions().some((entry) => entry.id === state.selectedEncounterSessionId)) {
 60739 |     state.selectedEncounterSessionId = "";
 60740 |     state.encounterModalOpen = false;
 60741 |   }
 60742 |   syncPlayerPokemonLists();
 60743 | }
```

#### Hit 14 — line 60738

```text
 60733 |   if (!session.actionVisitIds.length && !(session.rolls || []).length) {
 60734 |     state.encounterSessions = (state.encounterSessions || []).filter((entry) => entry.id !== session.id);
 60735 |   } else if (player) {
 60736 |     updateEncounterActionLog(session, player);
 60737 |   }
 60738 |   if (state.selectedEncounterSessionId === undoData.encounterSessionId && !pendingEncounterSessions().some((entry) => entry.id === state.selectedEncounterSessionId)) {
 60739 |     state.selectedEncounterSessionId = "";
 60740 |     state.encounterModalOpen = false;
 60741 |   }
 60742 |   syncPlayerPokemonLists();
 60743 | }
```

#### Hit 15 — line 60739

```text
 60734 |     state.encounterSessions = (state.encounterSessions || []).filter((entry) => entry.id !== session.id);
 60735 |   } else if (player) {
 60736 |     updateEncounterActionLog(session, player);
 60737 |   }
 60738 |   if (state.selectedEncounterSessionId === undoData.encounterSessionId && !pendingEncounterSessions().some((entry) => entry.id === state.selectedEncounterSessionId)) {
 60739 |     state.selectedEncounterSessionId = "";
 60740 |     state.encounterModalOpen = false;
 60741 |   }
 60742 |   syncPlayerPokemonLists();
 60743 | }
 60744 | 
```

#### Hit 16 — line 60757

```text
 60752 |   if (undoData.previousPlayerNotifications) state.playerNotifications = structuredClone(undoData.previousPlayerNotifications);
 60753 |   if (undoData.previousWheelSessions) state.wheelSessions = structuredClone(undoData.previousWheelSessions);
 60754 |   if (undoData.previousEncounterSessions) state.encounterSessions = structuredClone(undoData.previousEncounterSessions);
 60755 |   if (undoData.previousRandomPokemonSessions) state.randomPokemonSessions = structuredClone(undoData.previousRandomPokemonSessions);
 60756 |   if (Object.prototype.hasOwnProperty.call(undoData, "previousSelectedEncounterSessionId")) {
 60757 |     state.selectedEncounterSessionId = undoData.previousSelectedEncounterSessionId || "";
 60758 |   }
 60759 |   if (Object.prototype.hasOwnProperty.call(undoData, "previousEncounterModalOpen")) {
 60760 |     state.encounterModalOpen = Boolean(undoData.previousEncounterModalOpen);
 60761 |   }
 60762 |   if (undoData.previousInteractionEvents) state.interactionEvents = structuredClone(undoData.previousInteractionEvents).map((activity) => normalizeInteractionActivity(activity, state));
```

#### Hit 17 — line 63175

```text
 63170 |       return;
 63171 |     }
 63172 |     event.stopPropagation();
 63173 |     const sessionButton = event.target.closest("[data-encounter-session]");
 63174 |     if (sessionButton) {
 63175 |       state.selectedEncounterSessionId = sessionButton.dataset.encounterSession;
 63176 |       saveState();
 63177 |       renderEncounterOverlay();
 63178 |       return;
 63179 |     }
 63180 |     const rollButton = event.target.closest("[data-encounter-roll]");
```


### encounterModalOpen

Occurrences: 19

#### Hit 1 — line 85

```text
    80 |   "liveRefereeEffectDraft",
    81 |   "activityToasts",
    82 |   "wheelDrawerOpen",
    83 |   "selectedWheelSessionId",
    84 |   "skipWheelAnimation",
    85 |   "encounterModalOpen",
    86 |   "selectedEncounterSessionId",
    87 |   "randomPokemonDrawerOpen",
    88 |   "selectedRandomPokemonSessionId",
    89 |   "opponentDrawer",
    90 |   "routeUiState"
```

#### Hit 2 — line 2552

```text
  2547 |     selectedWheelSessionId: "",
  2548 |     wheelDrawerOpen: false,
  2549 |     skipWheelAnimation: false,
  2550 |     encounterSessions: [],
  2551 |     selectedEncounterSessionId: "",
  2552 |     encounterModalOpen: false,
  2553 |     randomPokemonSessions: [],
  2554 |     pokemonFamilyTierCache: {},
  2555 |     pokemonSpriteVariants: {},
  2556 |     tokenArtLibrary: {},
  2557 |     selectedRandomPokemonSessionId: "",
```

#### Hit 3 — line 3815

```text
  3810 |     previousPlayerNotifications: structuredClone(state.playerNotifications || []),
  3811 |     previousWheelSessions: structuredClone(state.wheelSessions || []),
  3812 |     previousEncounterSessions: structuredClone(state.encounterSessions || []),
  3813 |     previousRandomPokemonSessions: structuredClone(state.randomPokemonSessions || []),
  3814 |     previousSelectedEncounterSessionId: state.selectedEncounterSessionId || "",
  3815 |     previousEncounterModalOpen: Boolean(state.encounterModalOpen),
  3816 |     previousInteractionEvents: structuredClone(state.interactionEvents || []),
  3817 |     previousTransactions: structuredClone(state.transactions || []),
  3818 |     previousGlobalPokemonRules: structuredClone(state.globalPokemonRules || {}),
  3819 |     previousBanlistHistory: structuredClone(state.banlistHistory || []),
  3820 |     previousTeambuilder: structuredClone(state.teambuilder || {}),
```

#### Hit 4 — line 22247

```text
 22242 |     session.visualRotation = Number(session.visualRotation || 0);
 22243 |     session.isSpinning = false;
 22244 |     session.pendingEntryId = "";
 22245 |   });
 22246 |   nextState.selectedEncounterSessionId ||= "";
 22247 |   nextState.encounterModalOpen = Boolean(nextState.encounterModalOpen);
 22248 |   nextState.randomPokemonSessions ||= [];
 22249 |   nextState.pokemonFamilyTierCache ||= {};
 22250 |   pokemonFamilyTierCache = nextState.pokemonFamilyTierCache;
 22251 |   nextState.pokemonSpriteVariants ||= {};
 22252 |   nextState.selectedRandomPokemonSessionId ||= "";
```

#### Hit 5 — line 22247

```text
 22242 |     session.visualRotation = Number(session.visualRotation || 0);
 22243 |     session.isSpinning = false;
 22244 |     session.pendingEntryId = "";
 22245 |   });
 22246 |   nextState.selectedEncounterSessionId ||= "";
 22247 |   nextState.encounterModalOpen = Boolean(nextState.encounterModalOpen);
 22248 |   nextState.randomPokemonSessions ||= [];
 22249 |   nextState.pokemonFamilyTierCache ||= {};
 22250 |   pokemonFamilyTierCache = nextState.pokemonFamilyTierCache;
 22251 |   nextState.pokemonSpriteVariants ||= {};
 22252 |   nextState.selectedRandomPokemonSessionId ||= "";
```

#### Hit 6 — line 41694

```text
 41689 |   (session.actionVisitIds || [session.actionVisitId]).filter(Boolean).forEach((visitId) => {
 41690 |     completeActionOperationForVisit(visitId, completionReason, session.series, session.gym);
 41691 |   });
 41692 |   const next = pendingEncounterSessions().find((entry) => entry.id !== session.id);
 41693 |   state.selectedEncounterSessionId = next?.id || "";
 41694 |   state.encounterModalOpen = Boolean(next);
 41695 |   return true;
 41696 | }
 41697 | 
 41698 | async function addEncounterRollToRoster(sessionId, rollId, { skipPendingGuard = false } = {}) {
 41699 |   if (!skipPendingGuard && !guardPendingEventBeforeAction("Accept Encounter Result", () => addEncounterRollToRoster(sessionId, rollId, { skipPendingGuard: true }))) return;
```

#### Hit 7 — line 42332

```text
 42327 |     };
 42328 |     state.encounterSessions.unshift(session);
 42329 |   }
 42330 |   linkActionOperation(visit.id, { featureType: "encounter", featureSessionId: session.id });
 42331 |   state.selectedEncounterSessionId = session.id;
 42332 |   state.encounterModalOpen = true;
 42333 |   addLogEntry({
 42334 |     action: "phase",
 42335 |     category: "action",
 42336 |     player: player.name,
 42337 |     item: `${player.name} took action at Encounter`,
```

#### Hit 8 — line 46529

```text
 46524 |   const session = (state.encounterSessions || []).find((entry) => entry.id === sessionId);
 46525 |   if (!session) return;
 46526 |   const unaddedRolls = (session.rolls || []).filter((roll) => !encounterRollWasObtained(roll));
 46527 |   if (unaddedRolls.length) {
 46528 |     alert("Add every Encounter result to the party before closing this Encounter session.");
 46529 |     state.encounterModalOpen = true;
 46530 |     state.selectedEncounterSessionId = session.id;
 46531 |     saveState();
 46532 |     renderEncounterOverlay();
 46533 |     return;
 46534 |   }
```

#### Hit 9 — line 46544

```text
 46539 |   (session.actionVisitIds || [session.actionVisitId]).filter(Boolean).forEach((visitId) => {
 46540 |     completeActionOperationForVisit(visitId, "encounter-session-closed");
 46541 |   });
 46542 |   const next = pendingEncounterSessions().find((entry) => entry.id !== session.id);
 46543 |   state.selectedEncounterSessionId = next?.id || "";
 46544 |   state.encounterModalOpen = Boolean(next);
 46545 |   saveState();
 46546 |   render();
 46547 | }
 46548 | 
 46549 | function renderEncounterOverlay() {
```

#### Hit 10 — line 46551

```text
 46546 |   render();
 46547 | }
 46548 | 
 46549 | function renderEncounterOverlay() {
 46550 |   const pending = pendingEncounterSessions();
 46551 |   if (!pending.length) state.encounterModalOpen = false;
 46552 |   if (!els.encounterTab || !els.encounterOverlay || !els.encounterBody) return;
 46553 |   els.encounterTab.classList.toggle("hidden", !pending.length);
 46554 |   els.encounterTab.textContent = pending.length ? `Encounter (${pending.length})` : "Encounter";
 46555 |   const isOpen = Boolean(pending.length && state.encounterModalOpen);
 46556 |   els.encounterOverlay.classList.toggle("hidden", !isOpen);
```

#### Hit 11 — line 46555

```text
 46550 |   const pending = pendingEncounterSessions();
 46551 |   if (!pending.length) state.encounterModalOpen = false;
 46552 |   if (!els.encounterTab || !els.encounterOverlay || !els.encounterBody) return;
 46553 |   els.encounterTab.classList.toggle("hidden", !pending.length);
 46554 |   els.encounterTab.textContent = pending.length ? `Encounter (${pending.length})` : "Encounter";
 46555 |   const isOpen = Boolean(pending.length && state.encounterModalOpen);
 46556 |   els.encounterOverlay.classList.toggle("hidden", !isOpen);
 46557 |   els.encounterTab.setAttribute("aria-expanded", String(isOpen));
 46558 |   const session = selectedEncounterSession();
 46559 |   if (!pending.length || !session) {
 46560 |     els.encounterSessionList.innerHTML = "";
```

#### Hit 12 — line 60740

```text
 60735 |   } else if (player) {
 60736 |     updateEncounterActionLog(session, player);
 60737 |   }
 60738 |   if (state.selectedEncounterSessionId === undoData.encounterSessionId && !pendingEncounterSessions().some((entry) => entry.id === state.selectedEncounterSessionId)) {
 60739 |     state.selectedEncounterSessionId = "";
 60740 |     state.encounterModalOpen = false;
 60741 |   }
 60742 |   syncPlayerPokemonLists();
 60743 | }
 60744 | 
 60745 | function restoreTokenEffectContractUndoData(undoData) {
```

#### Hit 13 — line 60760

```text
 60755 |   if (undoData.previousRandomPokemonSessions) state.randomPokemonSessions = structuredClone(undoData.previousRandomPokemonSessions);
 60756 |   if (Object.prototype.hasOwnProperty.call(undoData, "previousSelectedEncounterSessionId")) {
 60757 |     state.selectedEncounterSessionId = undoData.previousSelectedEncounterSessionId || "";
 60758 |   }
 60759 |   if (Object.prototype.hasOwnProperty.call(undoData, "previousEncounterModalOpen")) {
 60760 |     state.encounterModalOpen = Boolean(undoData.previousEncounterModalOpen);
 60761 |   }
 60762 |   if (undoData.previousInteractionEvents) state.interactionEvents = structuredClone(undoData.previousInteractionEvents).map((activity) => normalizeInteractionActivity(activity, state));
 60763 |   if (undoData.previousTransactions) state.transactions = structuredClone(undoData.previousTransactions);
 60764 |   if (undoData.previousGlobalPokemonRules) state.globalPokemonRules = structuredClone(undoData.previousGlobalPokemonRules);
 60765 |   if (undoData.previousBanlistHistory) state.banlistHistory = structuredClone(undoData.previousBanlistHistory);
```

#### Hit 14 — line 62736

```text
 62731 |       if (state.randomPokemonDrawerOpen) {
 62732 |         state.randomPokemonDrawerOpen = false;
 62733 |         saveState();
 62734 |         renderRandomPokemonPanel();
 62735 |       }
 62736 |       if (state.encounterModalOpen) {
 62737 |         state.encounterModalOpen = false;
 62738 |         saveState();
 62739 |         renderEncounterOverlay();
 62740 |       }
 62741 |       els.phaseAgendaPanel.classList.add("hidden");
```

#### Hit 15 — line 62737

```text
 62732 |         state.randomPokemonDrawerOpen = false;
 62733 |         saveState();
 62734 |         renderRandomPokemonPanel();
 62735 |       }
 62736 |       if (state.encounterModalOpen) {
 62737 |         state.encounterModalOpen = false;
 62738 |         saveState();
 62739 |         renderEncounterOverlay();
 62740 |       }
 62741 |       els.phaseAgendaPanel.classList.add("hidden");
 62742 |       els.phaseAgendaToggle.setAttribute("aria-expanded", "false");
```

#### Hit 16 — line 63156

```text
 63151 |     state.randomPokemonDrawerOpen = !state.randomPokemonDrawerOpen;
 63152 |     saveState();
 63153 |     renderRandomPokemonPanel();
 63154 |   });
 63155 |   els.encounterTab?.addEventListener("click", () => {
 63156 |     state.encounterModalOpen = !state.encounterModalOpen;
 63157 |     saveState();
 63158 |     renderEncounterOverlay();
 63159 |   });
 63160 |   els.closeEncounterOverlay?.addEventListener("click", () => {
 63161 |     state.encounterModalOpen = false;
```

#### Hit 17 — line 63156

```text
 63151 |     state.randomPokemonDrawerOpen = !state.randomPokemonDrawerOpen;
 63152 |     saveState();
 63153 |     renderRandomPokemonPanel();
 63154 |   });
 63155 |   els.encounterTab?.addEventListener("click", () => {
 63156 |     state.encounterModalOpen = !state.encounterModalOpen;
 63157 |     saveState();
 63158 |     renderEncounterOverlay();
 63159 |   });
 63160 |   els.closeEncounterOverlay?.addEventListener("click", () => {
 63161 |     state.encounterModalOpen = false;
```

#### Hit 18 — line 63161

```text
 63156 |     state.encounterModalOpen = !state.encounterModalOpen;
 63157 |     saveState();
 63158 |     renderEncounterOverlay();
 63159 |   });
 63160 |   els.closeEncounterOverlay?.addEventListener("click", () => {
 63161 |     state.encounterModalOpen = false;
 63162 |     saveState();
 63163 |     renderEncounterOverlay();
 63164 |   });
 63165 |   els.encounterOverlay?.addEventListener("click", (event) => {
 63166 |     if (event.target === els.encounterOverlay) {
```

#### Hit 19 — line 63167

```text
 63162 |     saveState();
 63163 |     renderEncounterOverlay();
 63164 |   });
 63165 |   els.encounterOverlay?.addEventListener("click", (event) => {
 63166 |     if (event.target === els.encounterOverlay) {
 63167 |       state.encounterModalOpen = false;
 63168 |       saveState();
 63169 |       renderEncounterOverlay();
 63170 |       return;
 63171 |     }
 63172 |     event.stopPropagation();
```


### encounterOverlay

Occurrences: 13

#### Hit 1 — line 18770

```text
 18765 |   finishWheelSession: document.querySelector("#finishWheelSession"),
 18766 |   skipWheelAnimation: document.querySelector("#skipWheelAnimation"),
 18767 |   closeWheelPanel: document.querySelector("#closeWheelPanel"),
 18768 |   wheelHistory: document.querySelector("#wheelHistory"),
 18769 |   encounterTab: document.querySelector("#encounterTab"),
 18770 |   encounterOverlay: document.querySelector("#encounterOverlay"),
 18771 |   closeEncounterOverlay: document.querySelector("#closeEncounterOverlay"),
 18772 |   encounterSessionList: document.querySelector("#encounterSessionList"),
 18773 |   encounterTitle: document.querySelector("#encounterTitle"),
 18774 |   encounterBody: document.querySelector("#encounterBody"),
 18775 |   randomPokemonColumn: document.querySelector("#randomPokemonColumn"),
```

#### Hit 2 — line 18770

```text
 18765 |   finishWheelSession: document.querySelector("#finishWheelSession"),
 18766 |   skipWheelAnimation: document.querySelector("#skipWheelAnimation"),
 18767 |   closeWheelPanel: document.querySelector("#closeWheelPanel"),
 18768 |   wheelHistory: document.querySelector("#wheelHistory"),
 18769 |   encounterTab: document.querySelector("#encounterTab"),
 18770 |   encounterOverlay: document.querySelector("#encounterOverlay"),
 18771 |   closeEncounterOverlay: document.querySelector("#closeEncounterOverlay"),
 18772 |   encounterSessionList: document.querySelector("#encounterSessionList"),
 18773 |   encounterTitle: document.querySelector("#encounterTitle"),
 18774 |   encounterBody: document.querySelector("#encounterBody"),
 18775 |   randomPokemonColumn: document.querySelector("#randomPokemonColumn"),
```

#### Hit 3 — line 41315

```text
 41310 |   const values = transform.match(/matrix\(([^)]+)\)/)?.[1]?.split(",").map((value) => Number(value.trim()));
 41311 |   if (!values || values.length < 2) return 0;
 41312 |   return Math.atan2(values[1], values[0]) * (180 / Math.PI);
 41313 | }
 41314 | 
 41315 | function updateEncounterLivePointerDisplay({ root = els.encounterOverlay, status = "Passing", finalName = "", finalMeta = "" } = {}) {
 41316 |   const display = root?.querySelector("[data-encounter-live-display]");
 41317 |   const wheelDisc = root?.querySelector(".encounter-wheel-visual .wheel-disc");
 41318 |   if (!display) return null;
 41319 |   const segments = JSON.parse(display.dataset.segments || "[]");
 41320 |   let segment = null;
```

#### Hit 4 — line 46498

```text
 46493 |     completeEncounterRoll(session.id, result.id);
 46494 |     return;
 46495 |   }
 46496 |   session.isSpinning = true;
 46497 |   saveState();
 46498 |   const wheelVisual = els.encounterOverlay?.querySelector(".encounter-wheel-visual");
 46499 |   const wheelDisc = wheelVisual?.querySelector(".wheel-disc");
 46500 |   const latestResult = els.encounterOverlay?.querySelector(".wheel-latest-result");
 46501 |   const rollButton = els.encounterOverlay?.querySelector(`[data-encounter-roll="${session.id}"]`);
 46502 |   const liveDisplay = els.encounterOverlay?.querySelector("[data-encounter-live-display]");
 46503 |   if (liveDisplay) liveDisplay.dataset.finalEntryId = result.id;
```

#### Hit 5 — line 46500

```text
 46495 |   }
 46496 |   session.isSpinning = true;
 46497 |   saveState();
 46498 |   const wheelVisual = els.encounterOverlay?.querySelector(".encounter-wheel-visual");
 46499 |   const wheelDisc = wheelVisual?.querySelector(".wheel-disc");
 46500 |   const latestResult = els.encounterOverlay?.querySelector(".wheel-latest-result");
 46501 |   const rollButton = els.encounterOverlay?.querySelector(`[data-encounter-roll="${session.id}"]`);
 46502 |   const liveDisplay = els.encounterOverlay?.querySelector("[data-encounter-live-display]");
 46503 |   if (liveDisplay) liveDisplay.dataset.finalEntryId = result.id;
 46504 |   if (wheelVisual && wheelDisc) {
 46505 |     wheelVisual.classList.add("spinning");
```

#### Hit 6 — line 46501

```text
 46496 |   session.isSpinning = true;
 46497 |   saveState();
 46498 |   const wheelVisual = els.encounterOverlay?.querySelector(".encounter-wheel-visual");
 46499 |   const wheelDisc = wheelVisual?.querySelector(".wheel-disc");
 46500 |   const latestResult = els.encounterOverlay?.querySelector(".wheel-latest-result");
 46501 |   const rollButton = els.encounterOverlay?.querySelector(`[data-encounter-roll="${session.id}"]`);
 46502 |   const liveDisplay = els.encounterOverlay?.querySelector("[data-encounter-live-display]");
 46503 |   if (liveDisplay) liveDisplay.dataset.finalEntryId = result.id;
 46504 |   if (wheelVisual && wheelDisc) {
 46505 |     wheelVisual.classList.add("spinning");
 46506 |     wheelDisc.getBoundingClientRect();
```

#### Hit 7 — line 46502

```text
 46497 |   saveState();
 46498 |   const wheelVisual = els.encounterOverlay?.querySelector(".encounter-wheel-visual");
 46499 |   const wheelDisc = wheelVisual?.querySelector(".wheel-disc");
 46500 |   const latestResult = els.encounterOverlay?.querySelector(".wheel-latest-result");
 46501 |   const rollButton = els.encounterOverlay?.querySelector(`[data-encounter-roll="${session.id}"]`);
 46502 |   const liveDisplay = els.encounterOverlay?.querySelector("[data-encounter-live-display]");
 46503 |   if (liveDisplay) liveDisplay.dataset.finalEntryId = result.id;
 46504 |   if (wheelVisual && wheelDisc) {
 46505 |     wheelVisual.classList.add("spinning");
 46506 |     wheelDisc.getBoundingClientRect();
 46507 |     wheelDisc.style.setProperty("--wheel-rotation", `${Number(nextRotation || 0)}deg`);
```

#### Hit 8 — line 46508

```text
 46503 |   if (liveDisplay) liveDisplay.dataset.finalEntryId = result.id;
 46504 |   if (wheelVisual && wheelDisc) {
 46505 |     wheelVisual.classList.add("spinning");
 46506 |     wheelDisc.getBoundingClientRect();
 46507 |     wheelDisc.style.setProperty("--wheel-rotation", `${Number(nextRotation || 0)}deg`);
 46508 |     animateEncounterLivePointer(els.encounterOverlay, 5200);
 46509 |   } else {
 46510 |     renderEncounterOverlay();
 46511 |   }
 46512 |   if (latestResult) {
 46513 |     latestResult.innerHTML = "<span>Passing</span><strong>Spinning...</strong>";
```

#### Hit 9 — line 46552

```text
 46547 | }
 46548 | 
 46549 | function renderEncounterOverlay() {
 46550 |   const pending = pendingEncounterSessions();
 46551 |   if (!pending.length) state.encounterModalOpen = false;
 46552 |   if (!els.encounterTab || !els.encounterOverlay || !els.encounterBody) return;
 46553 |   els.encounterTab.classList.toggle("hidden", !pending.length);
 46554 |   els.encounterTab.textContent = pending.length ? `Encounter (${pending.length})` : "Encounter";
 46555 |   const isOpen = Boolean(pending.length && state.encounterModalOpen);
 46556 |   els.encounterOverlay.classList.toggle("hidden", !isOpen);
 46557 |   els.encounterTab.setAttribute("aria-expanded", String(isOpen));
```

#### Hit 10 — line 46556

```text
 46551 |   if (!pending.length) state.encounterModalOpen = false;
 46552 |   if (!els.encounterTab || !els.encounterOverlay || !els.encounterBody) return;
 46553 |   els.encounterTab.classList.toggle("hidden", !pending.length);
 46554 |   els.encounterTab.textContent = pending.length ? `Encounter (${pending.length})` : "Encounter";
 46555 |   const isOpen = Boolean(pending.length && state.encounterModalOpen);
 46556 |   els.encounterOverlay.classList.toggle("hidden", !isOpen);
 46557 |   els.encounterTab.setAttribute("aria-expanded", String(isOpen));
 46558 |   const session = selectedEncounterSession();
 46559 |   if (!pending.length || !session) {
 46560 |     els.encounterSessionList.innerHTML = "";
 46561 |     els.encounterBody.innerHTML = "";
```

#### Hit 11 — line 63165

```text
 63160 |   els.closeEncounterOverlay?.addEventListener("click", () => {
 63161 |     state.encounterModalOpen = false;
 63162 |     saveState();
 63163 |     renderEncounterOverlay();
 63164 |   });
 63165 |   els.encounterOverlay?.addEventListener("click", (event) => {
 63166 |     if (event.target === els.encounterOverlay) {
 63167 |       state.encounterModalOpen = false;
 63168 |       saveState();
 63169 |       renderEncounterOverlay();
 63170 |       return;
```

#### Hit 12 — line 63166

```text
 63161 |     state.encounterModalOpen = false;
 63162 |     saveState();
 63163 |     renderEncounterOverlay();
 63164 |   });
 63165 |   els.encounterOverlay?.addEventListener("click", (event) => {
 63166 |     if (event.target === els.encounterOverlay) {
 63167 |       state.encounterModalOpen = false;
 63168 |       saveState();
 63169 |       renderEncounterOverlay();
 63170 |       return;
 63171 |     }
```

#### Hit 13 — line 63250

```text
 63245 |       session.removedEntryIds = (session.removedEntryIds || []).filter((id) => id !== restoreButton.dataset.encounterRestore);
 63246 |       saveState();
 63247 |       renderEncounterOverlay();
 63248 |     }
 63249 |   });
 63250 |   els.encounterOverlay?.addEventListener("input", (event) => {
 63251 |     const weightInput = event.target.closest("[data-encounter-weight]");
 63252 |     if (!weightInput) return;
 63253 |     const session = selectedEncounterSession();
 63254 |     if (!session || (session.rolls || []).length) return;
 63255 |     session.weightOverrides ||= {};
```


### encounterTab

Occurrences: 7

#### Hit 1 — line 18769

```text
 18764 |   spinWheel: document.querySelector("#spinWheel"),
 18765 |   finishWheelSession: document.querySelector("#finishWheelSession"),
 18766 |   skipWheelAnimation: document.querySelector("#skipWheelAnimation"),
 18767 |   closeWheelPanel: document.querySelector("#closeWheelPanel"),
 18768 |   wheelHistory: document.querySelector("#wheelHistory"),
 18769 |   encounterTab: document.querySelector("#encounterTab"),
 18770 |   encounterOverlay: document.querySelector("#encounterOverlay"),
 18771 |   closeEncounterOverlay: document.querySelector("#closeEncounterOverlay"),
 18772 |   encounterSessionList: document.querySelector("#encounterSessionList"),
 18773 |   encounterTitle: document.querySelector("#encounterTitle"),
 18774 |   encounterBody: document.querySelector("#encounterBody"),
```

#### Hit 2 — line 18769

```text
 18764 |   spinWheel: document.querySelector("#spinWheel"),
 18765 |   finishWheelSession: document.querySelector("#finishWheelSession"),
 18766 |   skipWheelAnimation: document.querySelector("#skipWheelAnimation"),
 18767 |   closeWheelPanel: document.querySelector("#closeWheelPanel"),
 18768 |   wheelHistory: document.querySelector("#wheelHistory"),
 18769 |   encounterTab: document.querySelector("#encounterTab"),
 18770 |   encounterOverlay: document.querySelector("#encounterOverlay"),
 18771 |   closeEncounterOverlay: document.querySelector("#closeEncounterOverlay"),
 18772 |   encounterSessionList: document.querySelector("#encounterSessionList"),
 18773 |   encounterTitle: document.querySelector("#encounterTitle"),
 18774 |   encounterBody: document.querySelector("#encounterBody"),
```

#### Hit 3 — line 46552

```text
 46547 | }
 46548 | 
 46549 | function renderEncounterOverlay() {
 46550 |   const pending = pendingEncounterSessions();
 46551 |   if (!pending.length) state.encounterModalOpen = false;
 46552 |   if (!els.encounterTab || !els.encounterOverlay || !els.encounterBody) return;
 46553 |   els.encounterTab.classList.toggle("hidden", !pending.length);
 46554 |   els.encounterTab.textContent = pending.length ? `Encounter (${pending.length})` : "Encounter";
 46555 |   const isOpen = Boolean(pending.length && state.encounterModalOpen);
 46556 |   els.encounterOverlay.classList.toggle("hidden", !isOpen);
 46557 |   els.encounterTab.setAttribute("aria-expanded", String(isOpen));
```

#### Hit 4 — line 46553

```text
 46548 | 
 46549 | function renderEncounterOverlay() {
 46550 |   const pending = pendingEncounterSessions();
 46551 |   if (!pending.length) state.encounterModalOpen = false;
 46552 |   if (!els.encounterTab || !els.encounterOverlay || !els.encounterBody) return;
 46553 |   els.encounterTab.classList.toggle("hidden", !pending.length);
 46554 |   els.encounterTab.textContent = pending.length ? `Encounter (${pending.length})` : "Encounter";
 46555 |   const isOpen = Boolean(pending.length && state.encounterModalOpen);
 46556 |   els.encounterOverlay.classList.toggle("hidden", !isOpen);
 46557 |   els.encounterTab.setAttribute("aria-expanded", String(isOpen));
 46558 |   const session = selectedEncounterSession();
```

#### Hit 5 — line 46554

```text
 46549 | function renderEncounterOverlay() {
 46550 |   const pending = pendingEncounterSessions();
 46551 |   if (!pending.length) state.encounterModalOpen = false;
 46552 |   if (!els.encounterTab || !els.encounterOverlay || !els.encounterBody) return;
 46553 |   els.encounterTab.classList.toggle("hidden", !pending.length);
 46554 |   els.encounterTab.textContent = pending.length ? `Encounter (${pending.length})` : "Encounter";
 46555 |   const isOpen = Boolean(pending.length && state.encounterModalOpen);
 46556 |   els.encounterOverlay.classList.toggle("hidden", !isOpen);
 46557 |   els.encounterTab.setAttribute("aria-expanded", String(isOpen));
 46558 |   const session = selectedEncounterSession();
 46559 |   if (!pending.length || !session) {
```

#### Hit 6 — line 46557

```text
 46552 |   if (!els.encounterTab || !els.encounterOverlay || !els.encounterBody) return;
 46553 |   els.encounterTab.classList.toggle("hidden", !pending.length);
 46554 |   els.encounterTab.textContent = pending.length ? `Encounter (${pending.length})` : "Encounter";
 46555 |   const isOpen = Boolean(pending.length && state.encounterModalOpen);
 46556 |   els.encounterOverlay.classList.toggle("hidden", !isOpen);
 46557 |   els.encounterTab.setAttribute("aria-expanded", String(isOpen));
 46558 |   const session = selectedEncounterSession();
 46559 |   if (!pending.length || !session) {
 46560 |     els.encounterSessionList.innerHTML = "";
 46561 |     els.encounterBody.innerHTML = "";
 46562 |     return;
```

#### Hit 7 — line 63155

```text
 63150 |   els.randomPokemonTab.addEventListener("click", () => {
 63151 |     state.randomPokemonDrawerOpen = !state.randomPokemonDrawerOpen;
 63152 |     saveState();
 63153 |     renderRandomPokemonPanel();
 63154 |   });
 63155 |   els.encounterTab?.addEventListener("click", () => {
 63156 |     state.encounterModalOpen = !state.encounterModalOpen;
 63157 |     saveState();
 63158 |     renderEncounterOverlay();
 63159 |   });
 63160 |   els.closeEncounterOverlay?.addEventListener("click", () => {
```


### includeFishing

Occurrences: 8

#### Hit 1 — line 41247

```text
 41242 | }
 41243 | 
 41244 | function encounterEntriesForSession(session) {
 41245 |   const definition = encounterWheelDefinition(session?.series, session?.gym);
 41246 |   if (!definition) return [];
 41247 |   const includeFishing = Boolean(session.includeFishing);
 41248 |   const includeSurf = Boolean(session.includeSurf);
 41249 |   const removed = new Set(session.removedEntryIds || []);
 41250 |   const baseEntries = (definition.entries || []).filter((entry) => {
 41251 |     if (removed.has(entry.id)) return false;
 41252 |     const category = String(entry.category || "land").toLowerCase();
```

#### Hit 2 — line 41247

```text
 41242 | }
 41243 | 
 41244 | function encounterEntriesForSession(session) {
 41245 |   const definition = encounterWheelDefinition(session?.series, session?.gym);
 41246 |   if (!definition) return [];
 41247 |   const includeFishing = Boolean(session.includeFishing);
 41248 |   const includeSurf = Boolean(session.includeSurf);
 41249 |   const removed = new Set(session.removedEntryIds || []);
 41250 |   const baseEntries = (definition.entries || []).filter((entry) => {
 41251 |     if (removed.has(entry.id)) return false;
 41252 |     const category = String(entry.category || "land").toLowerCase();
```

#### Hit 3 — line 41253

```text
 41248 |   const includeSurf = Boolean(session.includeSurf);
 41249 |   const removed = new Set(session.removedEntryIds || []);
 41250 |   const baseEntries = (definition.entries || []).filter((entry) => {
 41251 |     if (removed.has(entry.id)) return false;
 41252 |     const category = String(entry.category || "land").toLowerCase();
 41253 |     if (category === "fishing" && !includeFishing) return false;
 41254 |     if (category === "surf" && !includeSurf) return false;
 41255 |     if (entry.enabledByDefault === false && !["fishing", "surf"].includes(category)) return false;
 41256 |     return currentPokemonRuleStatusByName(entry.pokemonName || entry.displayName) !== "Banned";
 41257 |   });
 41258 |   return [...baseEntries, ...(session.temporaryEntries || [])].map((entry) => ({
```

#### Hit 4 — line 42235

```text
 42230 |   }).filter(Boolean);
 42231 |   const lines = [
 42232 |     "Spent 1 Action at Encounter",
 42233 |     `Rolled ${rolls.length}/${session.maxRolls || 2} Encounters`,
 42234 |     caughtNames.length ? `Caught ${caughtNames.join(", ")}` : "",
 42235 |     session.includeFishing ? "Fishing included" : "",
 42236 |     session.includeSurf ? "Surf included" : "",
 42237 |     (session.removedEntryIds || []).length ? `Removed ${(session.removedEntryIds || []).length} option${session.removedEntryIds.length === 1 ? "" : "s"}` : ""
 42238 |   ].filter(Boolean);
 42239 |   entry.summary = lines.join("\n");
 42240 |   entry.details = [
```

#### Hit 5 — line 42242

```text
 42237 |     (session.removedEntryIds || []).length ? `Removed ${(session.removedEntryIds || []).length} option${session.removedEntryIds.length === 1 ? "" : "s"}` : ""
 42238 |   ].filter(Boolean);
 42239 |   entry.summary = lines.join("\n");
 42240 |   entry.details = [
 42241 |     `Active pool: ${encounterEntriesForSession(session).map((entry) => entry.displayName || entry.pokemonName).join(", ") || "None"}`,
 42242 |     `Fishing included: ${session.includeFishing ? "Yes" : "No"}`,
 42243 |     `Surf included: ${session.includeSurf ? "Yes" : "No"}`,
 42244 |     ...(session.removedEntryIds || []).map((id) => `Removed: ${id}`),
 42245 |     ...rolls.map((roll, index) => `Roll ${index + 1}: ${roll.resultDisplayName}`)
 42246 |   ];
 42247 |   entry.quantity = rolls.length;
```

#### Hit 6 — line 42317

```text
 42312 |       phase: "action",
 42313 |       actionVisitId: visit.id,
 42314 |       actionVisitIds: [visit.id],
 42315 |       wheelId: definition.id,
 42316 |       maxRolls: Number(definition.rollsPerAction || 2),
 42317 |       includeFishing: false,
 42318 |       includeSurf: false,
 42319 |       removedEntryIds: [],
 42320 |       temporaryEntries: [],
 42321 |       weightOverrides: {},
 42322 |       resultSessionIds: [],
```

#### Hit 7 — line 46658

```text
 46653 |           <div><span>Rolls</span><strong>${rolls.length}/${max}</strong></div>
 46654 |           <div><span>Active Options</span><strong>${entries.length}</strong></div>
 46655 |           <div><span>Rerolls</span><strong>Allowed</strong></div>
 46656 |         </div>
 46657 |         <div class="encounter-toggle-row">
 46658 |           <label><input type="checkbox" data-encounter-toggle="water" ${session.includeFishing || session.includeSurf ? "checked" : ""}> Include Fishing / Surf</label>
 46659 |           <label><input type="checkbox" data-encounter-weight-editing ${weightEditing ? "checked" : ""}${rolls.length ? " disabled" : ""}> Edit Weights</label>
 46660 |         </div>
 46661 |         <p class="gc-rule-note">Fishing and Surf are grouped for now. Later this should come from items/effects.</p>
 46662 |         <h3>Active Wheel Options</h3>
 46663 |         <div class="encounter-entry-list">
```

#### Hit 8 — line 63195

```text
 63190 |     const toggle = event.target.closest("[data-encounter-toggle]");
 63191 |     if (toggle) {
 63192 |       const session = selectedEncounterSession();
 63193 |       if (!session || (session.rolls || []).length) return;
 63194 |       if (toggle.dataset.encounterToggle === "water") {
 63195 |         session.includeFishing = toggle.checked;
 63196 |         session.includeSurf = toggle.checked;
 63197 |       }
 63198 |       saveState();
 63199 |       renderEncounterOverlay();
 63200 |       return;
```


### includeSurf

Occurrences: 8

#### Hit 1 — line 41248

```text
 41243 | 
 41244 | function encounterEntriesForSession(session) {
 41245 |   const definition = encounterWheelDefinition(session?.series, session?.gym);
 41246 |   if (!definition) return [];
 41247 |   const includeFishing = Boolean(session.includeFishing);
 41248 |   const includeSurf = Boolean(session.includeSurf);
 41249 |   const removed = new Set(session.removedEntryIds || []);
 41250 |   const baseEntries = (definition.entries || []).filter((entry) => {
 41251 |     if (removed.has(entry.id)) return false;
 41252 |     const category = String(entry.category || "land").toLowerCase();
 41253 |     if (category === "fishing" && !includeFishing) return false;
```

#### Hit 2 — line 41248

```text
 41243 | 
 41244 | function encounterEntriesForSession(session) {
 41245 |   const definition = encounterWheelDefinition(session?.series, session?.gym);
 41246 |   if (!definition) return [];
 41247 |   const includeFishing = Boolean(session.includeFishing);
 41248 |   const includeSurf = Boolean(session.includeSurf);
 41249 |   const removed = new Set(session.removedEntryIds || []);
 41250 |   const baseEntries = (definition.entries || []).filter((entry) => {
 41251 |     if (removed.has(entry.id)) return false;
 41252 |     const category = String(entry.category || "land").toLowerCase();
 41253 |     if (category === "fishing" && !includeFishing) return false;
```

#### Hit 3 — line 41254

```text
 41249 |   const removed = new Set(session.removedEntryIds || []);
 41250 |   const baseEntries = (definition.entries || []).filter((entry) => {
 41251 |     if (removed.has(entry.id)) return false;
 41252 |     const category = String(entry.category || "land").toLowerCase();
 41253 |     if (category === "fishing" && !includeFishing) return false;
 41254 |     if (category === "surf" && !includeSurf) return false;
 41255 |     if (entry.enabledByDefault === false && !["fishing", "surf"].includes(category)) return false;
 41256 |     return currentPokemonRuleStatusByName(entry.pokemonName || entry.displayName) !== "Banned";
 41257 |   });
 41258 |   return [...baseEntries, ...(session.temporaryEntries || [])].map((entry) => ({
 41259 |     ...entry,
```

#### Hit 4 — line 42236

```text
 42231 |   const lines = [
 42232 |     "Spent 1 Action at Encounter",
 42233 |     `Rolled ${rolls.length}/${session.maxRolls || 2} Encounters`,
 42234 |     caughtNames.length ? `Caught ${caughtNames.join(", ")}` : "",
 42235 |     session.includeFishing ? "Fishing included" : "",
 42236 |     session.includeSurf ? "Surf included" : "",
 42237 |     (session.removedEntryIds || []).length ? `Removed ${(session.removedEntryIds || []).length} option${session.removedEntryIds.length === 1 ? "" : "s"}` : ""
 42238 |   ].filter(Boolean);
 42239 |   entry.summary = lines.join("\n");
 42240 |   entry.details = [
 42241 |     `Active pool: ${encounterEntriesForSession(session).map((entry) => entry.displayName || entry.pokemonName).join(", ") || "None"}`,
```

#### Hit 5 — line 42243

```text
 42238 |   ].filter(Boolean);
 42239 |   entry.summary = lines.join("\n");
 42240 |   entry.details = [
 42241 |     `Active pool: ${encounterEntriesForSession(session).map((entry) => entry.displayName || entry.pokemonName).join(", ") || "None"}`,
 42242 |     `Fishing included: ${session.includeFishing ? "Yes" : "No"}`,
 42243 |     `Surf included: ${session.includeSurf ? "Yes" : "No"}`,
 42244 |     ...(session.removedEntryIds || []).map((id) => `Removed: ${id}`),
 42245 |     ...rolls.map((roll, index) => `Roll ${index + 1}: ${roll.resultDisplayName}`)
 42246 |   ];
 42247 |   entry.quantity = rolls.length;
 42248 |   entry.playerIds = [player.id];
```

#### Hit 6 — line 42318

```text
 42313 |       actionVisitId: visit.id,
 42314 |       actionVisitIds: [visit.id],
 42315 |       wheelId: definition.id,
 42316 |       maxRolls: Number(definition.rollsPerAction || 2),
 42317 |       includeFishing: false,
 42318 |       includeSurf: false,
 42319 |       removedEntryIds: [],
 42320 |       temporaryEntries: [],
 42321 |       weightOverrides: {},
 42322 |       resultSessionIds: [],
 42323 |       rolls: [],
```

#### Hit 7 — line 46658

```text
 46653 |           <div><span>Rolls</span><strong>${rolls.length}/${max}</strong></div>
 46654 |           <div><span>Active Options</span><strong>${entries.length}</strong></div>
 46655 |           <div><span>Rerolls</span><strong>Allowed</strong></div>
 46656 |         </div>
 46657 |         <div class="encounter-toggle-row">
 46658 |           <label><input type="checkbox" data-encounter-toggle="water" ${session.includeFishing || session.includeSurf ? "checked" : ""}> Include Fishing / Surf</label>
 46659 |           <label><input type="checkbox" data-encounter-weight-editing ${weightEditing ? "checked" : ""}${rolls.length ? " disabled" : ""}> Edit Weights</label>
 46660 |         </div>
 46661 |         <p class="gc-rule-note">Fishing and Surf are grouped for now. Later this should come from items/effects.</p>
 46662 |         <h3>Active Wheel Options</h3>
 46663 |         <div class="encounter-entry-list">
```

#### Hit 8 — line 63196

```text
 63191 |     if (toggle) {
 63192 |       const session = selectedEncounterSession();
 63193 |       if (!session || (session.rolls || []).length) return;
 63194 |       if (toggle.dataset.encounterToggle === "water") {
 63195 |         session.includeFishing = toggle.checked;
 63196 |         session.includeSurf = toggle.checked;
 63197 |       }
 63198 |       saveState();
 63199 |       renderEncounterOverlay();
 63200 |       return;
 63201 |     }
```


### encounterWheelDefinitions

Occurrences: 2

#### Hit 1 — line 6071

```text
  6066 |       "Regigigas", "Entei", "Raikou", "Suicune", "Latias", "Latios", "Heatran", "Ho-Oh", "Lugia"
  6067 |     ].map((name) => encounterEntry(name))
  6068 |   }
  6069 | });
  6070 | 
  6071 | const encounterWheelDefinitions = Object.freeze({
  6072 |   "kanto-gym-1": makeEncounterWheel("Kanto", 1, ["Pidgey", "Shinx", "Oddish", "Magikarp SF", "Tentacool SF"]),
  6073 |   "hoenn-gym-1": makeEncounterWheel("Hoenn", 1, [
  6074 |     "Chikorita", "Cyndaquil", "Totodile", "Wurmple", "Zigzagoon", "Poochyena", "Lillipup", "Zorua",
  6075 |     "Sewaddle", "Turtwig", "Chimchar", "Piplup", "Snivy", "Oshawott", "Tepig", "Wingull",
  6076 |     "Wailmer SF", "Carvanha SF", "Chatot", "Shellos", "Tentacool SF", "Magikarp SF", "Lotad",
```

#### Hit 2 — line 41225

```text
 41220 | function encounterWheelKey(series = state.series, gym = state.gym) {
 41221 |   return `${String(series || "").toLowerCase()}-gym-${Number(gym || 1)}`;
 41222 | }
 41223 | 
 41224 | function encounterWheelDefinition(series = state.series, gym = state.gym) {
 41225 |   return encounterWheelDefinitions[encounterWheelKey(series, gym)] || null;
 41226 | }
 41227 | 
 41228 | function pendingEncounterSessions() {
 41229 |   state.encounterSessions ||= [];
 41230 |   return state.encounterSessions.filter((session) => ["pending", "review"].includes(session.status));
```


### encounterWheelDefinition(

Occurrences: 8

#### Hit 1 — line 38574

```text
 38569 |   if (!location) return [];
 38570 |   if (location.id === "pokemon-breeder") return [];
 38571 |   if (location.id === "ranger-base") return [];
 38572 |   if (location.id === "pokemon-center") return [];
 38573 |   if (location.id === "encounter") {
 38574 |     const wheel = encounterWheelDefinition();
 38575 |     return [{
 38576 |       id: "encounter-wheel",
 38577 |       label: "Open Encounter Wheel",
 38578 |       buttonLabel: "Spend 1 Action",
 38579 |       description: wheel
```

#### Hit 2 — line 41224

```text
 41219 | 
 41220 | function encounterWheelKey(series = state.series, gym = state.gym) {
 41221 |   return `${String(series || "").toLowerCase()}-gym-${Number(gym || 1)}`;
 41222 | }
 41223 | 
 41224 | function encounterWheelDefinition(series = state.series, gym = state.gym) {
 41225 |   return encounterWheelDefinitions[encounterWheelKey(series, gym)] || null;
 41226 | }
 41227 | 
 41228 | function pendingEncounterSessions() {
 41229 |   state.encounterSessions ||= [];
```

#### Hit 3 — line 41245

```text
 41240 |   }
 41241 |   return session;
 41242 | }
 41243 | 
 41244 | function encounterEntriesForSession(session) {
 41245 |   const definition = encounterWheelDefinition(session?.series, session?.gym);
 41246 |   if (!definition) return [];
 41247 |   const includeFishing = Boolean(session.includeFishing);
 41248 |   const includeSurf = Boolean(session.includeSurf);
 41249 |   const removed = new Set(session.removedEntryIds || []);
 41250 |   const baseEntries = (definition.entries || []).filter((entry) => {
```

#### Hit 4 — line 42263

```text
 42258 | }
 42259 | 
 42260 | function startEncounterSession({ skipConfirmCheck = false } = {}) {
 42261 |   const player = activePlayer();
 42262 |   const location = actionLocationById("encounter");
 42263 |   const definition = encounterWheelDefinition();
 42264 |   if (!definition) {
 42265 |     alert("No Encounter Wheel is defined for this Series/Gym yet.");
 42266 |     return false;
 42267 |   }
 42268 |   if (!skipConfirmCheck) {
```

#### Hit 5 — line 46435

```text
 46430 |   const { result, special } = resolveEncounterSpecialResult(visualResult);
 46431 |   if (!result || (session.rolls || []).length >= Number(session.maxRolls || 2)) return;
 46432 |   const roll = {
 46433 |     id: `encounter-roll-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
 46434 |     encounterSessionId: session.id,
 46435 |     actionVisitId: session.actionVisitIds?.[Math.floor((session.rolls || []).length / Number(encounterWheelDefinition(session.series, session.gym)?.rollsPerAction || 2))] || session.actionVisitId,
 46436 |     playerId: player.id,
 46437 |     series: session.series,
 46438 |     gym: Number(session.gym),
 46439 |     entryId: result.id,
 46440 |     visualEntryId: visualResult?.id || result.id,
```

#### Hit 6 — line 46564

```text
 46559 |   if (!pending.length || !session) {
 46560 |     els.encounterSessionList.innerHTML = "";
 46561 |     els.encounterBody.innerHTML = "";
 46562 |     return;
 46563 |   }
 46564 |   const definition = encounterWheelDefinition(session.series, session.gym);
 46565 |   const player = state.players.find((entry) => entry.id === session.playerId) || activePlayer();
 46566 |   const entries = encounterEntriesForSession(session);
 46567 |   const removedEntries = (definition?.entries || []).filter((entry) => (session.removedEntryIds || []).includes(entry.id));
 46568 |   const max = Number(session.maxRolls || definition?.rollsPerAction || 2);
 46569 |   const rolls = session.rolls || [];
```

#### Hit 7 — line 46582

```text
 46577 |     const button = document.createElement("button");
 46578 |     button.type = "button";
 46579 |     button.className = `wheel-session-card${entry.id === session.id ? " active" : ""}`;
 46580 |     button.dataset.encounterSession = entry.id;
 46581 |     button.innerHTML = `
 46582 |       <strong>${escapeHtml(encounterWheelDefinition(entry.series, entry.gym)?.name || "Encounter Wheel")}</strong>
 46583 |       <span>${escapeHtml(entryPlayer?.name || "Unknown")} - ${entry.series} G${entry.gym}</span>
 46584 |       <em>${(entry.rolls || []).length}/${entry.maxRolls || 2} rolls</em>
 46585 |     `;
 46586 |     return button;
 46587 |   }));
```

#### Hit 8 — line 60705

```text
 60700 |     }
 60701 |     syncLinkedTransactions();
 60702 |     syncPlayerPokemonLists();
 60703 |     return;
 60704 |   }
 60705 |   const definition = encounterWheelDefinition(session.series, session.gym);
 60706 |   const rollsPerAction = Number(definition?.rollsPerAction || 2);
 60707 |   const visitIds = session.actionVisitIds || (session.actionVisitId ? [session.actionVisitId] : []);
 60708 |   const visitIndex = Math.max(0, visitIds.indexOf(undoData.visitId));
 60709 |   let rollsToRemove = (session.rolls || []).filter((roll) => roll.actionVisitId === undoData.visitId);
 60710 |   if (!rollsToRemove.length || rollsToRemove.length > rollsPerAction) {
```


### startEncounterSession(

Occurrences: 2

#### Hit 1 — line 42260

```text
 42255 |     && session.series === series
 42256 |     && Number(session.gym) === Number(gym)
 42257 |     && ["pending", "review"].includes(session.status));
 42258 | }
 42259 | 
 42260 | function startEncounterSession({ skipConfirmCheck = false } = {}) {
 42261 |   const player = activePlayer();
 42262 |   const location = actionLocationById("encounter");
 42263 |   const definition = encounterWheelDefinition();
 42264 |   if (!definition) {
 42265 |     alert("No Encounter Wheel is defined for this Series/Gym yet.");
```

#### Hit 2 — line 42421

```text
 42416 |       confirmGameCornerService(service, location, player);
 42417 |       await persistStartedActionDestination();
 42418 |       return;
 42419 |     }
 42420 |     if (location?.id === "encounter") {
 42421 |       if (!startEncounterSession({ skipConfirmCheck: true })) {
 42422 |         throw new Error("The Encounter location could not start.");
 42423 |       }
 42424 |       await persistStartedActionDestination();
 42425 |       return;
 42426 |     }
```


### spinEncounterWheel(

Occurrences: 2

#### Hit 1 — line 46478

```text
 46473 |   }
 46474 |   saveState();
 46475 |   render();
 46476 | }
 46477 | 
 46478 | function spinEncounterWheel(sessionId = state.selectedEncounterSessionId) {
 46479 |   const session = (state.encounterSessions || []).find((entry) => entry.id === sessionId);
 46480 |   if (!session || session.status !== "pending" || session.isSpinning) return;
 46481 |   if ((session.rolls || []).length >= Number(session.maxRolls || 2)) return;
 46482 |   const entries = encounterEntriesForSession(session);
 46483 |   if (!entries.length) {
```

#### Hit 2 — line 63182

```text
 63177 |       renderEncounterOverlay();
 63178 |       return;
 63179 |     }
 63180 |     const rollButton = event.target.closest("[data-encounter-roll]");
 63181 |     if (rollButton && !rollButton.disabled) {
 63182 |       spinEncounterWheel(rollButton.dataset.encounterRoll);
 63183 |       return;
 63184 |     }
 63185 |     const doneButton = event.target.closest("[data-encounter-done]");
 63186 |     if (doneButton) {
 63187 |       closeEncounterSession(doneButton.dataset.encounterDone);
```


### closeEncounterSession(

Occurrences: 3

#### Hit 1 — line 46522

```text
 46517 |     rollButton.textContent = "Spinning...";
 46518 |   }
 46519 |   window.setTimeout(() => completeEncounterRoll(session.id, result.id), 5200);
 46520 | }
 46521 | 
 46522 | function closeEncounterSession(sessionId = state.selectedEncounterSessionId, { skipPendingGuard = false } = {}) {
 46523 |   if (!skipPendingGuard && !guardPendingEventBeforeAction("Close Encounter Session", () => closeEncounterSession(sessionId, { skipPendingGuard: true }))) return;
 46524 |   const session = (state.encounterSessions || []).find((entry) => entry.id === sessionId);
 46525 |   if (!session) return;
 46526 |   const unaddedRolls = (session.rolls || []).filter((roll) => !encounterRollWasObtained(roll));
 46527 |   if (unaddedRolls.length) {
```

#### Hit 2 — line 46523

```text
 46518 |   }
 46519 |   window.setTimeout(() => completeEncounterRoll(session.id, result.id), 5200);
 46520 | }
 46521 | 
 46522 | function closeEncounterSession(sessionId = state.selectedEncounterSessionId, { skipPendingGuard = false } = {}) {
 46523 |   if (!skipPendingGuard && !guardPendingEventBeforeAction("Close Encounter Session", () => closeEncounterSession(sessionId, { skipPendingGuard: true }))) return;
 46524 |   const session = (state.encounterSessions || []).find((entry) => entry.id === sessionId);
 46525 |   if (!session) return;
 46526 |   const unaddedRolls = (session.rolls || []).filter((roll) => !encounterRollWasObtained(roll));
 46527 |   if (unaddedRolls.length) {
 46528 |     alert("Add every Encounter result to the party before closing this Encounter session.");
```

#### Hit 3 — line 63187

```text
 63182 |       spinEncounterWheel(rollButton.dataset.encounterRoll);
 63183 |       return;
 63184 |     }
 63185 |     const doneButton = event.target.closest("[data-encounter-done]");
 63186 |     if (doneButton) {
 63187 |       closeEncounterSession(doneButton.dataset.encounterDone);
 63188 |       return;
 63189 |     }
 63190 |     const toggle = event.target.closest("[data-encounter-toggle]");
 63191 |     if (toggle) {
 63192 |       const session = selectedEncounterSession();
```


### renderEncounterOverlay(

Occurrences: 14

#### Hit 1 — line 41866

```text
 41861 |       actionVisitId: session.actionVisitId,
 41862 |       timestamp: new Date().toISOString()
 41863 |     });
 41864 |   });
 41865 |   saveState();
 41866 |   renderEncounterOverlay();
 41867 | }
 41868 | 
 41869 | function useGameCornerToken(tier) {
 41870 |   const player = activePlayer();
 41871 |   if (!requirePrivatePrepAccess(player, "Game Corner Ticket")) return;
```

#### Hit 2 — line 46510

```text
 46505 |     wheelVisual.classList.add("spinning");
 46506 |     wheelDisc.getBoundingClientRect();
 46507 |     wheelDisc.style.setProperty("--wheel-rotation", `${Number(nextRotation || 0)}deg`);
 46508 |     animateEncounterLivePointer(els.encounterOverlay, 5200);
 46509 |   } else {
 46510 |     renderEncounterOverlay();
 46511 |   }
 46512 |   if (latestResult) {
 46513 |     latestResult.innerHTML = "<span>Passing</span><strong>Spinning...</strong>";
 46514 |   }
 46515 |   if (rollButton) {
```

#### Hit 3 — line 46532

```text
 46527 |   if (unaddedRolls.length) {
 46528 |     alert("Add every Encounter result to the party before closing this Encounter session.");
 46529 |     state.encounterModalOpen = true;
 46530 |     state.selectedEncounterSessionId = session.id;
 46531 |     saveState();
 46532 |     renderEncounterOverlay();
 46533 |     return;
 46534 |   }
 46535 |   if (session.status === "pending" && (session.rolls || []).length < Number(session.maxRolls || 2)
 46536 |     && !confirm(`Finish this Encounter session with ${(session.rolls || []).length}/${session.maxRolls || 2} rolls used?`)) return;
 46537 |   session.status = "completed";
```

#### Hit 4 — line 46549

```text
 46544 |   state.encounterModalOpen = Boolean(next);
 46545 |   saveState();
 46546 |   render();
 46547 | }
 46548 | 
 46549 | function renderEncounterOverlay() {
 46550 |   const pending = pendingEncounterSessions();
 46551 |   if (!pending.length) state.encounterModalOpen = false;
 46552 |   if (!els.encounterTab || !els.encounterOverlay || !els.encounterBody) return;
 46553 |   els.encounterTab.classList.toggle("hidden", !pending.length);
 46554 |   els.encounterTab.textContent = pending.length ? `Encounter (${pending.length})` : "Encounter";
```

#### Hit 5 — line 49623

```text
 49618 |   renderActivityToasts();
 49619 |   renderActivityResponseDrawer();
 49620 |   renderLiveRefereePanel();
 49621 |   renderOpponentDrawer();
 49622 |   renderCart();
 49623 |   renderEncounterOverlay();
 49624 |   renderWheelPanel();
 49625 |   renderRandomPokemonPanel();
 49626 |   renderSiteShell();
 49627 |   syncTokenSandboxBanner();
 49628 |   if (actionPhaseStateRepairQueued && !backendSync.applyingRemote && !tokenScenarioSandboxActive()) {
```

#### Hit 6 — line 62739

```text
 62734 |         renderRandomPokemonPanel();
 62735 |       }
 62736 |       if (state.encounterModalOpen) {
 62737 |         state.encounterModalOpen = false;
 62738 |         saveState();
 62739 |         renderEncounterOverlay();
 62740 |       }
 62741 |       els.phaseAgendaPanel.classList.add("hidden");
 62742 |       els.phaseAgendaToggle.setAttribute("aria-expanded", "false");
 62743 |       els.actionDemoNotice?.classList.add("hidden");
 62744 |       els.actionDemoBadge?.setAttribute("aria-expanded", "false");
```

#### Hit 7 — line 63158

```text
 63153 |     renderRandomPokemonPanel();
 63154 |   });
 63155 |   els.encounterTab?.addEventListener("click", () => {
 63156 |     state.encounterModalOpen = !state.encounterModalOpen;
 63157 |     saveState();
 63158 |     renderEncounterOverlay();
 63159 |   });
 63160 |   els.closeEncounterOverlay?.addEventListener("click", () => {
 63161 |     state.encounterModalOpen = false;
 63162 |     saveState();
 63163 |     renderEncounterOverlay();
```

#### Hit 8 — line 63163

```text
 63158 |     renderEncounterOverlay();
 63159 |   });
 63160 |   els.closeEncounterOverlay?.addEventListener("click", () => {
 63161 |     state.encounterModalOpen = false;
 63162 |     saveState();
 63163 |     renderEncounterOverlay();
 63164 |   });
 63165 |   els.encounterOverlay?.addEventListener("click", (event) => {
 63166 |     if (event.target === els.encounterOverlay) {
 63167 |       state.encounterModalOpen = false;
 63168 |       saveState();
```

#### Hit 9 — line 63169

```text
 63164 |   });
 63165 |   els.encounterOverlay?.addEventListener("click", (event) => {
 63166 |     if (event.target === els.encounterOverlay) {
 63167 |       state.encounterModalOpen = false;
 63168 |       saveState();
 63169 |       renderEncounterOverlay();
 63170 |       return;
 63171 |     }
 63172 |     event.stopPropagation();
 63173 |     const sessionButton = event.target.closest("[data-encounter-session]");
 63174 |     if (sessionButton) {
```

#### Hit 10 — line 63177

```text
 63172 |     event.stopPropagation();
 63173 |     const sessionButton = event.target.closest("[data-encounter-session]");
 63174 |     if (sessionButton) {
 63175 |       state.selectedEncounterSessionId = sessionButton.dataset.encounterSession;
 63176 |       saveState();
 63177 |       renderEncounterOverlay();
 63178 |       return;
 63179 |     }
 63180 |     const rollButton = event.target.closest("[data-encounter-roll]");
 63181 |     if (rollButton && !rollButton.disabled) {
 63182 |       spinEncounterWheel(rollButton.dataset.encounterRoll);
```

#### Hit 11 — line 63199

```text
 63194 |       if (toggle.dataset.encounterToggle === "water") {
 63195 |         session.includeFishing = toggle.checked;
 63196 |         session.includeSurf = toggle.checked;
 63197 |       }
 63198 |       saveState();
 63199 |       renderEncounterOverlay();
 63200 |       return;
 63201 |     }
 63202 |     const weightEditingToggle = event.target.closest("[data-encounter-weight-editing]");
 63203 |     if (weightEditingToggle) {
 63204 |       const session = selectedEncounterSession();
```

#### Hit 12 — line 63208

```text
 63203 |     if (weightEditingToggle) {
 63204 |       const session = selectedEncounterSession();
 63205 |       if (!session || (session.rolls || []).length) return;
 63206 |       session.weightEditing = weightEditingToggle.checked;
 63207 |       saveState();
 63208 |       renderEncounterOverlay();
 63209 |       return;
 63210 |     }
 63211 |     const skipAnimationToggle = event.target.closest("[data-encounter-skip-animation]");
 63212 |     if (skipAnimationToggle) {
 63213 |       state.skipWheelAnimation = skipAnimationToggle.checked;
```

#### Hit 13 — line 63238

```text
 63233 |       const session = selectedEncounterSession();
 63234 |       if (!session || (session.rolls || []).length) return;
 63235 |       session.removedEntryIds ||= [];
 63236 |       if (!session.removedEntryIds.includes(removeButton.dataset.encounterRemove)) session.removedEntryIds.push(removeButton.dataset.encounterRemove);
 63237 |       saveState();
 63238 |       renderEncounterOverlay();
 63239 |       return;
 63240 |     }
 63241 |     const restoreButton = event.target.closest("[data-encounter-restore]");
 63242 |     if (restoreButton) {
 63243 |       const session = selectedEncounterSession();
```

#### Hit 14 — line 63247

```text
 63242 |     if (restoreButton) {
 63243 |       const session = selectedEncounterSession();
 63244 |       if (!session || (session.rolls || []).length) return;
 63245 |       session.removedEntryIds = (session.removedEntryIds || []).filter((id) => id !== restoreButton.dataset.encounterRestore);
 63246 |       saveState();
 63247 |       renderEncounterOverlay();
 63248 |     }
 63249 |   });
 63250 |   els.encounterOverlay?.addEventListener("input", (event) => {
 63251 |     const weightInput = event.target.closest("[data-encounter-weight]");
 63252 |     if (!weightInput) return;
```


### data-encounter

Occurrences: 30

#### Hit 1 — line 41316

```text
 41311 |   if (!values || values.length < 2) return 0;
 41312 |   return Math.atan2(values[1], values[0]) * (180 / Math.PI);
 41313 | }
 41314 | 
 41315 | function updateEncounterLivePointerDisplay({ root = els.encounterOverlay, status = "Passing", finalName = "", finalMeta = "" } = {}) {
 41316 |   const display = root?.querySelector("[data-encounter-live-display]");
 41317 |   const wheelDisc = root?.querySelector(".encounter-wheel-visual .wheel-disc");
 41318 |   if (!display) return null;
 41319 |   const segments = JSON.parse(display.dataset.segments || "[]");
 41320 |   let segment = null;
 41321 |   if (finalName) {
```

#### Hit 2 — line 41336

```text
 41331 |     <strong>${escapeHtml(name)}</strong>
 41332 |     ${meta ? `<em>${escapeHtml(meta)}</em>` : ""}
 41333 |   `;
 41334 |   root?.querySelectorAll(".encounter-entry.pointer-active").forEach((entry) => entry.classList.remove("pointer-active"));
 41335 |   const activeEntryId = finalName ? display.dataset.finalEntryId : segment?.entryId;
 41336 |   if (activeEntryId) root?.querySelector(`[data-encounter-entry-id="${CSS.escape(activeEntryId)}"]`)?.classList.add("pointer-active");
 41337 |   return segment;
 41338 | }
 41339 | 
 41340 | function animateEncounterLivePointer(root, duration = 5200) {
 41341 |   const start = performance.now();
```

#### Hit 3 — line 46501

```text
 46496 |   session.isSpinning = true;
 46497 |   saveState();
 46498 |   const wheelVisual = els.encounterOverlay?.querySelector(".encounter-wheel-visual");
 46499 |   const wheelDisc = wheelVisual?.querySelector(".wheel-disc");
 46500 |   const latestResult = els.encounterOverlay?.querySelector(".wheel-latest-result");
 46501 |   const rollButton = els.encounterOverlay?.querySelector(`[data-encounter-roll="${session.id}"]`);
 46502 |   const liveDisplay = els.encounterOverlay?.querySelector("[data-encounter-live-display]");
 46503 |   if (liveDisplay) liveDisplay.dataset.finalEntryId = result.id;
 46504 |   if (wheelVisual && wheelDisc) {
 46505 |     wheelVisual.classList.add("spinning");
 46506 |     wheelDisc.getBoundingClientRect();
```

#### Hit 4 — line 46502

```text
 46497 |   saveState();
 46498 |   const wheelVisual = els.encounterOverlay?.querySelector(".encounter-wheel-visual");
 46499 |   const wheelDisc = wheelVisual?.querySelector(".wheel-disc");
 46500 |   const latestResult = els.encounterOverlay?.querySelector(".wheel-latest-result");
 46501 |   const rollButton = els.encounterOverlay?.querySelector(`[data-encounter-roll="${session.id}"]`);
 46502 |   const liveDisplay = els.encounterOverlay?.querySelector("[data-encounter-live-display]");
 46503 |   if (liveDisplay) liveDisplay.dataset.finalEntryId = result.id;
 46504 |   if (wheelVisual && wheelDisc) {
 46505 |     wheelVisual.classList.add("spinning");
 46506 |     wheelDisc.getBoundingClientRect();
 46507 |     wheelDisc.style.setProperty("--wheel-rotation", `${Number(nextRotation || 0)}deg`);
```

#### Hit 5 — line 46617

```text
 46612 |           <div class="wheel-disc" style="--wheel-rotation:${Number(session.visualRotation || 0)}deg">
 46613 |             <div class="wheel-face encounter-wheel-face" aria-hidden="true"></div>
 46614 |           </div>
 46615 |           <div class="wheel-hub"></div>
 46616 |         </div>
 46617 |         <div class="wheel-latest-result encounter-live-result" data-encounter-live-display data-segments="${escapeHtml(JSON.stringify(segments))}" data-final-entry-id="${escapeHtml(finalEntryId)}">
 46618 |           <span>${isSpinning ? "Passing" : rolls.length ? "Result" : "Ready"}</span>
 46619 |           <strong>${isSpinning ? "Spinning..." : rolls.length ? escapeHtml(finalRoll.resultDisplayName) : "Ready"}</strong>
 46620 |           ${!isSpinning && finalMeta ? `<em>${escapeHtml(finalMeta)}</em>` : ""}
 46621 |         </div>
 46622 |         <div class="split-actions">
```

#### Hit 6 — line 46623

```text
 46618 |           <span>${isSpinning ? "Passing" : rolls.length ? "Result" : "Ready"}</span>
 46619 |           <strong>${isSpinning ? "Spinning..." : rolls.length ? escapeHtml(finalRoll.resultDisplayName) : "Ready"}</strong>
 46620 |           ${!isSpinning && finalMeta ? `<em>${escapeHtml(finalMeta)}</em>` : ""}
 46621 |         </div>
 46622 |         <div class="split-actions">
 46623 |           <button class="buy-button" type="button" data-encounter-roll="${escapeHtml(session.id)}"${canRoll ? "" : " disabled"}>${isSpinning ? "Spinning..." : rolls.length >= max ? "All Rolls Used" : "Roll Encounter"}</button>
 46624 |           <button class="ghost-button" type="button" data-encounter-done="${escapeHtml(session.id)}">Done</button>
 46625 |         </div>
 46626 |         <label class="wheel-skip-toggle encounter-skip-toggle">
 46627 |           <input type="checkbox" data-encounter-skip-animation ${state.skipWheelAnimation ? "checked" : ""}>
 46628 |           Skip Animation
```

#### Hit 7 — line 46624

```text
 46619 |           <strong>${isSpinning ? "Spinning..." : rolls.length ? escapeHtml(finalRoll.resultDisplayName) : "Ready"}</strong>
 46620 |           ${!isSpinning && finalMeta ? `<em>${escapeHtml(finalMeta)}</em>` : ""}
 46621 |         </div>
 46622 |         <div class="split-actions">
 46623 |           <button class="buy-button" type="button" data-encounter-roll="${escapeHtml(session.id)}"${canRoll ? "" : " disabled"}>${isSpinning ? "Spinning..." : rolls.length >= max ? "All Rolls Used" : "Roll Encounter"}</button>
 46624 |           <button class="ghost-button" type="button" data-encounter-done="${escapeHtml(session.id)}">Done</button>
 46625 |         </div>
 46626 |         <label class="wheel-skip-toggle encounter-skip-toggle">
 46627 |           <input type="checkbox" data-encounter-skip-animation ${state.skipWheelAnimation ? "checked" : ""}>
 46628 |           Skip Animation
 46629 |         </label>
```

#### Hit 8 — line 46627

```text
 46622 |         <div class="split-actions">
 46623 |           <button class="buy-button" type="button" data-encounter-roll="${escapeHtml(session.id)}"${canRoll ? "" : " disabled"}>${isSpinning ? "Spinning..." : rolls.length >= max ? "All Rolls Used" : "Roll Encounter"}</button>
 46624 |           <button class="ghost-button" type="button" data-encounter-done="${escapeHtml(session.id)}">Done</button>
 46625 |         </div>
 46626 |         <label class="wheel-skip-toggle encounter-skip-toggle">
 46627 |           <input type="checkbox" data-encounter-skip-animation ${state.skipWheelAnimation ? "checked" : ""}>
 46628 |           Skip Animation
 46629 |         </label>
 46630 |         <h3>Results</h3>
 46631 |         <div class="encounter-result-list">
 46632 |           ${rolls.length ? rolls.map((roll, index) => `
```

#### Hit 9 — line 46641

```text
 46636 |                 <strong>#${index + 1}: ${escapeHtml(roll.resultDisplayName)}</strong>
 46637 |                 <span>${roll.specialEncounter ? `${escapeHtml(roll.specialEncounter.triggerName)} -> ${escapeHtml(roll.specialEncounter.wheelName)}` : escapeHtml(roll.category || "land")} - ${escapeHtml(pokemonBattleTierSummary(roll.resultDisplayName || roll.resultPokemonName, "Unassigned"))}${roll.rerollHistory?.length ? ` - ${roll.rerollHistory.length} reroll${roll.rerollHistory.length === 1 ? "" : "s"}` : ""}</span>
 46638 |               </div>
 46639 |               <div class="encounter-result-actions">
 46640 |                 ${roll.rosterPokemonId ? `<span class="encounter-result-added">Added</span>` : `
 46641 |                   <button class="buy-button mini-button" type="button" data-encounter-add="${escapeHtml(roll.id)}">Add</button>
 46642 |                   <button class="ghost-button mini-button" type="button" data-encounter-reroll="${escapeHtml(roll.id)}" data-encounter-reroll-mode="result"${rollFreeRerollReasons[roll.id] || rerollTokenCount ? "" : " disabled"} title="${roll.specialEncounter ? `Spend ${player.name}'s Reroll Token to reroll within the Hyperspace sub-wheel.` : rollFreeRerollReasons[roll.id] ? `Free reroll: ${escapeHtml(rollFreeRerollReasons[roll.id])}` : rerollTokenCount ? `Spend ${player.name}'s Reroll Token on this encounter result.` : `${player.name} needs a Reroll Token.`}">${roll.specialEncounter ? "Owner Reroll Hyperspace" : rollFreeRerollReasons[roll.id] ? "Free Reroll" : `Owner Reroll${rerollTokenCount ? ` (${rerollTokenCount})` : ""}`}</button>
 46643 |                   ${roll.specialEncounter ? `<button class="ghost-button mini-button danger-lite" type="button" data-encounter-reroll="${escapeHtml(roll.id)}" data-encounter-reroll-mode="encounter"${rollFreeRerollReasons[roll.id] || rerollTokenCount ? "" : " disabled"} title="${rollFreeRerollReasons[roll.id] ? `Free respin: ${escapeHtml(rollFreeRerollReasons[roll.id])}` : rerollTokenCount ? `Spend ${player.name}'s Reroll Token to respin the original Encounter Wheel result.` : `${player.name} needs a Reroll Token.`}">Owner Respin Encounter</button>` : ""}
 46644 |                 `}
 46645 |               </div>
 46646 |             </article>
```

#### Hit 10 — line 46642

```text
 46637 |                 <span>${roll.specialEncounter ? `${escapeHtml(roll.specialEncounter.triggerName)} -> ${escapeHtml(roll.specialEncounter.wheelName)}` : escapeHtml(roll.category || "land")} - ${escapeHtml(pokemonBattleTierSummary(roll.resultDisplayName || roll.resultPokemonName, "Unassigned"))}${roll.rerollHistory?.length ? ` - ${roll.rerollHistory.length} reroll${roll.rerollHistory.length === 1 ? "" : "s"}` : ""}</span>
 46638 |               </div>
 46639 |               <div class="encounter-result-actions">
 46640 |                 ${roll.rosterPokemonId ? `<span class="encounter-result-added">Added</span>` : `
 46641 |                   <button class="buy-button mini-button" type="button" data-encounter-add="${escapeHtml(roll.id)}">Add</button>
 46642 |                   <button class="ghost-button mini-button" type="button" data-encounter-reroll="${escapeHtml(roll.id)}" data-encounter-reroll-mode="result"${rollFreeRerollReasons[roll.id] || rerollTokenCount ? "" : " disabled"} title="${roll.specialEncounter ? `Spend ${player.name}'s Reroll Token to reroll within the Hyperspace sub-wheel.` : rollFreeRerollReasons[roll.id] ? `Free reroll: ${escapeHtml(rollFreeRerollReasons[roll.id])}` : rerollTokenCount ? `Spend ${player.name}'s Reroll Token on this encounter result.` : `${player.name} needs a Reroll Token.`}">${roll.specialEncounter ? "Owner Reroll Hyperspace" : rollFreeRerollReasons[roll.id] ? "Free Reroll" : `Owner Reroll${rerollTokenCount ? ` (${rerollTokenCount})` : ""}`}</button>
 46643 |                   ${roll.specialEncounter ? `<button class="ghost-button mini-button danger-lite" type="button" data-encounter-reroll="${escapeHtml(roll.id)}" data-encounter-reroll-mode="encounter"${rollFreeRerollReasons[roll.id] || rerollTokenCount ? "" : " disabled"} title="${rollFreeRerollReasons[roll.id] ? `Free respin: ${escapeHtml(rollFreeRerollReasons[roll.id])}` : rerollTokenCount ? `Spend ${player.name}'s Reroll Token to respin the original Encounter Wheel result.` : `${player.name} needs a Reroll Token.`}">Owner Respin Encounter</button>` : ""}
 46644 |                 `}
 46645 |               </div>
 46646 |             </article>
 46647 |           `).join("") : `<p class="empty-state compact">Encounter results will appear here.</p>`}
```

#### Hit 11 — line 46642

```text
 46637 |                 <span>${roll.specialEncounter ? `${escapeHtml(roll.specialEncounter.triggerName)} -> ${escapeHtml(roll.specialEncounter.wheelName)}` : escapeHtml(roll.category || "land")} - ${escapeHtml(pokemonBattleTierSummary(roll.resultDisplayName || roll.resultPokemonName, "Unassigned"))}${roll.rerollHistory?.length ? ` - ${roll.rerollHistory.length} reroll${roll.rerollHistory.length === 1 ? "" : "s"}` : ""}</span>
 46638 |               </div>
 46639 |               <div class="encounter-result-actions">
 46640 |                 ${roll.rosterPokemonId ? `<span class="encounter-result-added">Added</span>` : `
 46641 |                   <button class="buy-button mini-button" type="button" data-encounter-add="${escapeHtml(roll.id)}">Add</button>
 46642 |                   <button class="ghost-button mini-button" type="button" data-encounter-reroll="${escapeHtml(roll.id)}" data-encounter-reroll-mode="result"${rollFreeRerollReasons[roll.id] || rerollTokenCount ? "" : " disabled"} title="${roll.specialEncounter ? `Spend ${player.name}'s Reroll Token to reroll within the Hyperspace sub-wheel.` : rollFreeRerollReasons[roll.id] ? `Free reroll: ${escapeHtml(rollFreeRerollReasons[roll.id])}` : rerollTokenCount ? `Spend ${player.name}'s Reroll Token on this encounter result.` : `${player.name} needs a Reroll Token.`}">${roll.specialEncounter ? "Owner Reroll Hyperspace" : rollFreeRerollReasons[roll.id] ? "Free Reroll" : `Owner Reroll${rerollTokenCount ? ` (${rerollTokenCount})` : ""}`}</button>
 46643 |                   ${roll.specialEncounter ? `<button class="ghost-button mini-button danger-lite" type="button" data-encounter-reroll="${escapeHtml(roll.id)}" data-encounter-reroll-mode="encounter"${rollFreeRerollReasons[roll.id] || rerollTokenCount ? "" : " disabled"} title="${rollFreeRerollReasons[roll.id] ? `Free respin: ${escapeHtml(rollFreeRerollReasons[roll.id])}` : rerollTokenCount ? `Spend ${player.name}'s Reroll Token to respin the original Encounter Wheel result.` : `${player.name} needs a Reroll Token.`}">Owner Respin Encounter</button>` : ""}
 46644 |                 `}
 46645 |               </div>
 46646 |             </article>
 46647 |           `).join("") : `<p class="empty-state compact">Encounter results will appear here.</p>`}
```

#### Hit 12 — line 46643

```text
 46638 |               </div>
 46639 |               <div class="encounter-result-actions">
 46640 |                 ${roll.rosterPokemonId ? `<span class="encounter-result-added">Added</span>` : `
 46641 |                   <button class="buy-button mini-button" type="button" data-encounter-add="${escapeHtml(roll.id)}">Add</button>
 46642 |                   <button class="ghost-button mini-button" type="button" data-encounter-reroll="${escapeHtml(roll.id)}" data-encounter-reroll-mode="result"${rollFreeRerollReasons[roll.id] || rerollTokenCount ? "" : " disabled"} title="${roll.specialEncounter ? `Spend ${player.name}'s Reroll Token to reroll within the Hyperspace sub-wheel.` : rollFreeRerollReasons[roll.id] ? `Free reroll: ${escapeHtml(rollFreeRerollReasons[roll.id])}` : rerollTokenCount ? `Spend ${player.name}'s Reroll Token on this encounter result.` : `${player.name} needs a Reroll Token.`}">${roll.specialEncounter ? "Owner Reroll Hyperspace" : rollFreeRerollReasons[roll.id] ? "Free Reroll" : `Owner Reroll${rerollTokenCount ? ` (${rerollTokenCount})` : ""}`}</button>
 46643 |                   ${roll.specialEncounter ? `<button class="ghost-button mini-button danger-lite" type="button" data-encounter-reroll="${escapeHtml(roll.id)}" data-encounter-reroll-mode="encounter"${rollFreeRerollReasons[roll.id] || rerollTokenCount ? "" : " disabled"} title="${rollFreeRerollReasons[roll.id] ? `Free respin: ${escapeHtml(rollFreeRerollReasons[roll.id])}` : rerollTokenCount ? `Spend ${player.name}'s Reroll Token to respin the original Encounter Wheel result.` : `${player.name} needs a Reroll Token.`}">Owner Respin Encounter</button>` : ""}
 46644 |                 `}
 46645 |               </div>
 46646 |             </article>
 46647 |           `).join("") : `<p class="empty-state compact">Encounter results will appear here.</p>`}
 46648 |         </div>
```

#### Hit 13 — line 46643

```text
 46638 |               </div>
 46639 |               <div class="encounter-result-actions">
 46640 |                 ${roll.rosterPokemonId ? `<span class="encounter-result-added">Added</span>` : `
 46641 |                   <button class="buy-button mini-button" type="button" data-encounter-add="${escapeHtml(roll.id)}">Add</button>
 46642 |                   <button class="ghost-button mini-button" type="button" data-encounter-reroll="${escapeHtml(roll.id)}" data-encounter-reroll-mode="result"${rollFreeRerollReasons[roll.id] || rerollTokenCount ? "" : " disabled"} title="${roll.specialEncounter ? `Spend ${player.name}'s Reroll Token to reroll within the Hyperspace sub-wheel.` : rollFreeRerollReasons[roll.id] ? `Free reroll: ${escapeHtml(rollFreeRerollReasons[roll.id])}` : rerollTokenCount ? `Spend ${player.name}'s Reroll Token on this encounter result.` : `${player.name} needs a Reroll Token.`}">${roll.specialEncounter ? "Owner Reroll Hyperspace" : rollFreeRerollReasons[roll.id] ? "Free Reroll" : `Owner Reroll${rerollTokenCount ? ` (${rerollTokenCount})` : ""}`}</button>
 46643 |                   ${roll.specialEncounter ? `<button class="ghost-button mini-button danger-lite" type="button" data-encounter-reroll="${escapeHtml(roll.id)}" data-encounter-reroll-mode="encounter"${rollFreeRerollReasons[roll.id] || rerollTokenCount ? "" : " disabled"} title="${rollFreeRerollReasons[roll.id] ? `Free respin: ${escapeHtml(rollFreeRerollReasons[roll.id])}` : rerollTokenCount ? `Spend ${player.name}'s Reroll Token to respin the original Encounter Wheel result.` : `${player.name} needs a Reroll Token.`}">Owner Respin Encounter</button>` : ""}
 46644 |                 `}
 46645 |               </div>
 46646 |             </article>
 46647 |           `).join("") : `<p class="empty-state compact">Encounter results will appear here.</p>`}
 46648 |         </div>
```

#### Hit 14 — line 46658

```text
 46653 |           <div><span>Rolls</span><strong>${rolls.length}/${max}</strong></div>
 46654 |           <div><span>Active Options</span><strong>${entries.length}</strong></div>
 46655 |           <div><span>Rerolls</span><strong>Allowed</strong></div>
 46656 |         </div>
 46657 |         <div class="encounter-toggle-row">
 46658 |           <label><input type="checkbox" data-encounter-toggle="water" ${session.includeFishing || session.includeSurf ? "checked" : ""}> Include Fishing / Surf</label>
 46659 |           <label><input type="checkbox" data-encounter-weight-editing ${weightEditing ? "checked" : ""}${rolls.length ? " disabled" : ""}> Edit Weights</label>
 46660 |         </div>
 46661 |         <p class="gc-rule-note">Fishing and Surf are grouped for now. Later this should come from items/effects.</p>
 46662 |         <h3>Active Wheel Options</h3>
 46663 |         <div class="encounter-entry-list">
```

#### Hit 15 — line 46659

```text
 46654 |           <div><span>Active Options</span><strong>${entries.length}</strong></div>
 46655 |           <div><span>Rerolls</span><strong>Allowed</strong></div>
 46656 |         </div>
 46657 |         <div class="encounter-toggle-row">
 46658 |           <label><input type="checkbox" data-encounter-toggle="water" ${session.includeFishing || session.includeSurf ? "checked" : ""}> Include Fishing / Surf</label>
 46659 |           <label><input type="checkbox" data-encounter-weight-editing ${weightEditing ? "checked" : ""}${rolls.length ? " disabled" : ""}> Edit Weights</label>
 46660 |         </div>
 46661 |         <p class="gc-rule-note">Fishing and Surf are grouped for now. Later this should come from items/effects.</p>
 46662 |         <h3>Active Wheel Options</h3>
 46663 |         <div class="encounter-entry-list">
 46664 |           ${entries.map((entry) => `
```

#### Hit 16 — line 46665

```text
 46660 |         </div>
 46661 |         <p class="gc-rule-note">Fishing and Surf are grouped for now. Later this should come from items/effects.</p>
 46662 |         <h3>Active Wheel Options</h3>
 46663 |         <div class="encounter-entry-list">
 46664 |           ${entries.map((entry) => `
 46665 |             <article class="encounter-entry${entry.id === finalEntryId ? " pointer-active" : ""}" data-encounter-entry-id="${escapeHtml(entry.id)}">
 46666 |               <div>
 46667 |                 <strong>${escapeHtml(entry.displayName || entry.pokemonName)}</strong>
 46668 |                 <span>${escapeHtml(entry.category || "land")}</span>
 46669 |               </div>
 46670 |               ${weightEditing ? `
```

#### Hit 17 — line 46673

```text
 46668 |                 <span>${escapeHtml(entry.category || "land")}</span>
 46669 |               </div>
 46670 |               ${weightEditing ? `
 46671 |                 <label class="encounter-weight-control">
 46672 |                   Weight
 46673 |                   <input type="number" min="0" step="1" value="${Number(entry.weight || 1)}" data-encounter-weight="${escapeHtml(entry.id)}"${rolls.length ? " disabled" : ""}>
 46674 |                 </label>
 46675 |               ` : `<span class="encounter-weight-badge">W ${Number(entry.weight || 1)}</span>`}
 46676 |               ${entry.removable === false ? "" : `<button class="ghost-button mini-button" type="button" data-encounter-remove="${escapeHtml(entry.id)}"${rolls.length ? " disabled" : ""}>Remove</button>`}
 46677 |             </article>
 46678 |           `).join("") || `<p class="empty-state compact">No active entries.</p>`}
```

#### Hit 18 — line 46676

```text
 46671 |                 <label class="encounter-weight-control">
 46672 |                   Weight
 46673 |                   <input type="number" min="0" step="1" value="${Number(entry.weight || 1)}" data-encounter-weight="${escapeHtml(entry.id)}"${rolls.length ? " disabled" : ""}>
 46674 |                 </label>
 46675 |               ` : `<span class="encounter-weight-badge">W ${Number(entry.weight || 1)}</span>`}
 46676 |               ${entry.removable === false ? "" : `<button class="ghost-button mini-button" type="button" data-encounter-remove="${escapeHtml(entry.id)}"${rolls.length ? " disabled" : ""}>Remove</button>`}
 46677 |             </article>
 46678 |           `).join("") || `<p class="empty-state compact">No active entries.</p>`}
 46679 |         </div>
 46680 |         ${removedEntries.length ? `
 46681 |           <h3>Removed</h3>
```

#### Hit 19 — line 46686

```text
 46681 |           <h3>Removed</h3>
 46682 |           <div class="encounter-entry-list">
 46683 |             ${removedEntries.map((entry) => `
 46684 |               <article class="encounter-entry">
 46685 |                 <div><strong>${escapeHtml(entry.displayName || entry.pokemonName)}</strong><span>${escapeHtml(entry.category || "land")}</span></div>
 46686 |                 <button class="ghost-button mini-button" type="button" data-encounter-restore="${escapeHtml(entry.id)}"${rolls.length ? " disabled" : ""}>Restore</button>
 46687 |               </article>
 46688 |             `).join("")}
 46689 |           </div>
 46690 |         ` : ""}
 46691 |       </section>
```

#### Hit 20 — line 63173

```text
 63168 |       saveState();
 63169 |       renderEncounterOverlay();
 63170 |       return;
 63171 |     }
 63172 |     event.stopPropagation();
 63173 |     const sessionButton = event.target.closest("[data-encounter-session]");
 63174 |     if (sessionButton) {
 63175 |       state.selectedEncounterSessionId = sessionButton.dataset.encounterSession;
 63176 |       saveState();
 63177 |       renderEncounterOverlay();
 63178 |       return;
```

#### Hit 21 — line 63180

```text
 63175 |       state.selectedEncounterSessionId = sessionButton.dataset.encounterSession;
 63176 |       saveState();
 63177 |       renderEncounterOverlay();
 63178 |       return;
 63179 |     }
 63180 |     const rollButton = event.target.closest("[data-encounter-roll]");
 63181 |     if (rollButton && !rollButton.disabled) {
 63182 |       spinEncounterWheel(rollButton.dataset.encounterRoll);
 63183 |       return;
 63184 |     }
 63185 |     const doneButton = event.target.closest("[data-encounter-done]");
```

#### Hit 22 — line 63185

```text
 63180 |     const rollButton = event.target.closest("[data-encounter-roll]");
 63181 |     if (rollButton && !rollButton.disabled) {
 63182 |       spinEncounterWheel(rollButton.dataset.encounterRoll);
 63183 |       return;
 63184 |     }
 63185 |     const doneButton = event.target.closest("[data-encounter-done]");
 63186 |     if (doneButton) {
 63187 |       closeEncounterSession(doneButton.dataset.encounterDone);
 63188 |       return;
 63189 |     }
 63190 |     const toggle = event.target.closest("[data-encounter-toggle]");
```

#### Hit 23 — line 63190

```text
 63185 |     const doneButton = event.target.closest("[data-encounter-done]");
 63186 |     if (doneButton) {
 63187 |       closeEncounterSession(doneButton.dataset.encounterDone);
 63188 |       return;
 63189 |     }
 63190 |     const toggle = event.target.closest("[data-encounter-toggle]");
 63191 |     if (toggle) {
 63192 |       const session = selectedEncounterSession();
 63193 |       if (!session || (session.rolls || []).length) return;
 63194 |       if (toggle.dataset.encounterToggle === "water") {
 63195 |         session.includeFishing = toggle.checked;
```

#### Hit 24 — line 63202

```text
 63197 |       }
 63198 |       saveState();
 63199 |       renderEncounterOverlay();
 63200 |       return;
 63201 |     }
 63202 |     const weightEditingToggle = event.target.closest("[data-encounter-weight-editing]");
 63203 |     if (weightEditingToggle) {
 63204 |       const session = selectedEncounterSession();
 63205 |       if (!session || (session.rolls || []).length) return;
 63206 |       session.weightEditing = weightEditingToggle.checked;
 63207 |       saveState();
```

#### Hit 25 — line 63211

```text
 63206 |       session.weightEditing = weightEditingToggle.checked;
 63207 |       saveState();
 63208 |       renderEncounterOverlay();
 63209 |       return;
 63210 |     }
 63211 |     const skipAnimationToggle = event.target.closest("[data-encounter-skip-animation]");
 63212 |     if (skipAnimationToggle) {
 63213 |       state.skipWheelAnimation = skipAnimationToggle.checked;
 63214 |       saveState();
 63215 |       return;
 63216 |     }
```

#### Hit 26 — line 63217

```text
 63212 |     if (skipAnimationToggle) {
 63213 |       state.skipWheelAnimation = skipAnimationToggle.checked;
 63214 |       saveState();
 63215 |       return;
 63216 |     }
 63217 |     const addEncounterButton = event.target.closest("[data-encounter-add]");
 63218 |     if (addEncounterButton) {
 63219 |       const session = selectedEncounterSession();
 63220 |       if (session) addEncounterRollToRoster(session.id, addEncounterButton.dataset.encounterAdd);
 63221 |       return;
 63222 |     }
```

#### Hit 27 — line 63223

```text
 63218 |     if (addEncounterButton) {
 63219 |       const session = selectedEncounterSession();
 63220 |       if (session) addEncounterRollToRoster(session.id, addEncounterButton.dataset.encounterAdd);
 63221 |       return;
 63222 |     }
 63223 |     const rerollEncounterButton = event.target.closest("[data-encounter-reroll]");
 63224 |     if (rerollEncounterButton && !rerollEncounterButton.disabled) {
 63225 |       const session = selectedEncounterSession();
 63226 |       if (session) rerollEncounterRoll(session.id, rerollEncounterButton.dataset.encounterReroll, {
 63227 |         mode: rerollEncounterButton.dataset.encounterRerollMode || "result"
 63228 |       });
```

#### Hit 28 — line 63231

```text
 63226 |       if (session) rerollEncounterRoll(session.id, rerollEncounterButton.dataset.encounterReroll, {
 63227 |         mode: rerollEncounterButton.dataset.encounterRerollMode || "result"
 63228 |       });
 63229 |       return;
 63230 |     }
 63231 |     const removeButton = event.target.closest("[data-encounter-remove]");
 63232 |     if (removeButton) {
 63233 |       const session = selectedEncounterSession();
 63234 |       if (!session || (session.rolls || []).length) return;
 63235 |       session.removedEntryIds ||= [];
 63236 |       if (!session.removedEntryIds.includes(removeButton.dataset.encounterRemove)) session.removedEntryIds.push(removeButton.dataset.encounterRemove);
```

#### Hit 29 — line 63241

```text
 63236 |       if (!session.removedEntryIds.includes(removeButton.dataset.encounterRemove)) session.removedEntryIds.push(removeButton.dataset.encounterRemove);
 63237 |       saveState();
 63238 |       renderEncounterOverlay();
 63239 |       return;
 63240 |     }
 63241 |     const restoreButton = event.target.closest("[data-encounter-restore]");
 63242 |     if (restoreButton) {
 63243 |       const session = selectedEncounterSession();
 63244 |       if (!session || (session.rolls || []).length) return;
 63245 |       session.removedEntryIds = (session.removedEntryIds || []).filter((id) => id !== restoreButton.dataset.encounterRestore);
 63246 |       saveState();
```

#### Hit 30 — line 63251

```text
 63246 |       saveState();
 63247 |       renderEncounterOverlay();
 63248 |     }
 63249 |   });
 63250 |   els.encounterOverlay?.addEventListener("input", (event) => {
 63251 |     const weightInput = event.target.closest("[data-encounter-weight]");
 63252 |     if (!weightInput) return;
 63253 |     const session = selectedEncounterSession();
 63254 |     if (!session || (session.rolls || []).length) return;
 63255 |     session.weightOverrides ||= {};
 63256 |     session.weightOverrides[weightInput.dataset.encounterWeight] = Math.max(0, Number(weightInput.value || 0));
```


### undoEncounterActionVisit(

Occurrences: 3

#### Hit 1 — line 60681

```text
 60676 |   const previousGcTokens = structuredClone(undoData.previousInventory || []).filter(isGameCornerToken);
 60677 |   const currentNonGcInventory = (player.inventory || []).filter((item) => !isGameCornerToken(item));
 60678 |   player.inventory = [...previousGcTokens, ...currentNonGcInventory];
 60679 | }
 60680 | 
 60681 | function undoEncounterActionVisit(undoData) {
 60682 |   const player = state.players.find((candidate) => candidate.id === undoData.playerId);
 60683 |   if (player && undoData.previousInventory) player.inventory = structuredClone(undoData.previousInventory);
 60684 |   const session = (state.encounterSessions || []).find((entry) => entry.id === undoData.encounterSessionId);
 60685 |   if (!session) {
 60686 |     if (undoData.previousEncounterSessions) state.encounterSessions = structuredClone(undoData.previousEncounterSessions);
```

#### Hit 2 — line 60900

```text
 60895 |     state.actionPhaseState ||= { selections: {}, seriesTrackers: {} };
 60896 |     state.actionPhaseState.selections ||= {};
 60897 |     state.actionPhaseState.selections[key] ||= { series: undoData.series, gym: undoData.gym, playerVisits: {} };
 60898 |     state.actionPhaseState.selections[key].playerVisits[undoData.playerId] = (state.actionPhaseState.selections[key].playerVisits[undoData.playerId] || [])
 60899 |       .filter((visit) => visit.id !== undoData.visitId);
 60900 |     undoEncounterActionVisit(undoData);
 60901 |   } else if (undoData.actionType === "undoActionVisit") {
 60902 |     const key = actionPhaseKey(undoData.series, undoData.gym);
 60903 |     state.actionPhaseState ||= { selections: {}, seriesTrackers: {} };
 60904 |     state.actionPhaseState.selections ||= {};
 60905 |     state.actionPhaseState.seriesTrackers ||= {};
```

#### Hit 3 — line 60930

```text
 60925 |       restoreGameCornerTokenInventorySnapshot(undoData, player);
 60926 |       state.log.forEach((logEntry) => {
 60927 |         if (undoneGameCornerSessionIds.includes(logEntry.gameCornerSessionId)) logEntry.undone = true;
 60928 |       });
 60929 |     } else if (undoData.locationId === "encounter" || undoData.encounterSessionId) {
 60930 |       undoEncounterActionVisit(undoData);
 60931 |     } else {
 60932 |       if (player && undoData.previousInventory) player.inventory = structuredClone(undoData.previousInventory);
 60933 |       if (player && undoData.previousBalance !== undefined) player.balance = Number(undoData.previousBalance);
 60934 |       if (undoData.previousMoneyLedger) state.moneyLedger = structuredClone(undoData.previousMoneyLedger);
 60935 |       undoneWheelSessionIds = (state.wheelSessions || [])
```


### featureType: "encounter"

Occurrences: 1

#### Hit 1 — line 42330

```text
 42325 |       visualRotation: 0,
 42326 |       createdAt: new Date().toISOString()
 42327 |     };
 42328 |     state.encounterSessions.unshift(session);
 42329 |   }
 42330 |   linkActionOperation(visit.id, { featureType: "encounter", featureSessionId: session.id });
 42331 |   state.selectedEncounterSessionId = session.id;
 42332 |   state.encounterModalOpen = true;
 42333 |   addLogEntry({
 42334 |     action: "phase",
 42335 |     category: "action",
```


### "encounter": state.encounterSessions

Occurrences: 0


## Function inventory and source

| Function | Refs | Source chars |
|---|---:|---:|
| `encounterWheelKey` | 2 | 144 |
| `encounterWheelDefinition` | 10 | 153 |
| `pendingEncounterSessions` | 6 | 175 |
| `selectedEncounterSession` | 26 | 326 |
| `encounterEntriesForSession` | 7 | 1068 |
| `weightedEncounterEntry` | 4 | 383 |
| `buildEncounterWheelSegments` | 2 | 577 |
| `getEncounterSegmentAtPointer` | 2 | 439 |
| `updateEncounterLivePointerDisplay` | 2 | 1367 |
| `animateEncounterLivePointer` | 2 | 321 |
| `resolveEncounterSpecialResult` | 3 | 878 |
| `encounterEntryCenterDegrees` | 2 | 368 |
| `nextEncounterLandingRotation` | 2 | 362 |
| `encounterRollFreeRerollReason` | 3 | 362 |
| `pendingRandomPokemonSessions` | 7 | 169 |
| `rerollRandomPokemonResult` | 2 | 939 |
| `selectedRandomPokemonSession` | 25 | 342 |
| `createRandomPokemonSession` | 2 | 1944 |
| `createEncounterPokemonResultSession` | 1 | 1949 |
| `hydrateEncounterRollSprite` | 4 | 380 |
| `encounterRollWasObtained` | 3 | 112 |
| `encounterSessionReadyForAutomaticCompletion` | 3 | 298 |
| `completeObtainedEncounterSession` | 3 | 650 |
| `addEncounterRollToRoster` | 3 | 2437 |
| `rerollEncounterRoll` | 3 | 6773 |
| `confirmRandomPokemonSession` | 6 | 6960 |
| `rerollRandomPokemonSession` | 6 | 8489 |
| `cancelRandomPokemonSession` | 4 | 642 |
| `updateEncounterActionLog` | 7 | 1796 |
| `activeEncounterSessionForPlayer` | 2 | 315 |
| `startEncounterSession` | 2 | 4200 |
| `renderRandomPokemonPanel` | 12 | 4339 |
| `completeEncounterRoll` | 3 | 2481 |
| `spinEncounterWheel` | 2 | 1981 |
| `closeEncounterSession` | 3 | 1457 |
| `renderEncounterOverlay` | 14 | 10672 |
| `renderWheelPanel` | 8 | 9651 |
| `cancelCurrentGymWheelSessionsForPlayers` | 4 | 571 |
| `honeyEligibleEncounterResults` | 2 | 607 |
| `reverseWheelSessionsForActionVisit` | 2 | 2765 |
| `undoEncounterActionVisit` | 3 | 4526 |


### Function encounterWheelKey

```javascript
function encounterWheelKey(series = state.series, gym = state.gym) {
  return `${String(series || "").toLowerCase()}-gym-${Number(gym || 1)}`;
}
```

### Function encounterWheelDefinition

```javascript
function encounterWheelDefinition(series = state.series, gym = state.gym) {
  return encounterWheelDefinitions[encounterWheelKey(series, gym)] || null;
}
```

### Function pendingEncounterSessions

```javascript
function pendingEncounterSessions() {
  state.encounterSessions ||= [];
  return state.encounterSessions.filter((session) => ["pending", "review"].includes(session.status));
}
```

### Function selectedEncounterSession

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

### Function encounterEntriesForSession

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

### Function weightedEncounterEntry

```javascript
function weightedEncounterEntry(entries) {
  const totalWeight = entries.reduce((total, entry) => total + Number(entry.weight || 1), 0);
  if (!entries.length || totalWeight <= 0) return null;
  let roll = Math.random() * totalWeight;
  for (const entry of entries) {
    roll -= Number(entry.weight || 1);
    if (roll <= 0) return entry;
  }
  return entries[entries.length - 1];
}
```

### Function buildEncounterWheelSegments

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

### Function getEncounterSegmentAtPointer

```javascript
function getEncounterSegmentAtPointer(rotationAngle, segments) {
  if (!segments?.length) return null;
  const angleUnderPointer = normalizeAngle(ENCOUNTER_POINTER_ANGLE_DEGREES - rotationAngle);
  return segments.find((segment, index) => {
    const end = index === segments.length - 1 ? 360.000001 : segment.endAngle;
    return angleUnderPointer >= segment.startAngle && angleUnderPointer < end;
  }) || segments[segments.length - 1];
}
```

### Function updateEncounterLivePointerDisplay

```javascript
function updateEncounterLivePointerDisplay({ root = els.encounterOverlay, status = "Passing", finalName = "", finalMeta = "" } = {}) {
  const display = root?.querySelector("[data-encounter-live-display]");
  const wheelDisc = root?.querySelector(".encounter-wheel-visual .wheel-disc");
  if (!display) return null;
  const segments = JSON.parse(display.dataset.segments || "[]");
  let segment = null;
  if (finalName) {
    segment = segments.find((entry) => entry.entryId === display.dataset.finalEntryId) || null;
  } else {
    if (!wheelDisc) return null;
    segment = getEncounterSegmentAtPointer(rotationFromTransform(getComputedStyle(wheelDisc).transform), segments);
  }
  const name = finalName || segment?.displayName || "Ready";
  const meta = finalMeta || (segment ? `${segment.category || "land"} / W${segment.weight || 1}` : "");
  display.innerHTML = `
    <span>${escapeHtml(status)}</span>
    <strong>${escapeHtml(name)}</strong>
    ${meta ? `<em>${escapeHtml(meta)}</em>` : ""}
  `;
  root?.querySelectorAll(".encounter-entry.pointer-active").forEach((entry) => entry.classList.remove("pointer-active"));
  const activeEntryId = finalName ? display.dataset.finalEntryId : segment?.entryId;
  if (activeEntryId) root?.querySelector(`[data-encounter-entry-id="${CSS.escape(activeEntryId)}"]`)?.classList.add("pointer-active");
  return segment;
}
```

### Function animateEncounterLivePointer

```javascript
function animateEncounterLivePointer(root, duration = 5200) {
  const start = performance.now();
  function tick(now) {
    if (!root?.isConnected) return;
    updateEncounterLivePointerDisplay({ root, status: "Passing" });
    if (now - start < duration) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
```

### Function resolveEncounterSpecialResult

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

### Function encounterEntryCenterDegrees

```javascript
function encounterEntryCenterDegrees(entries, entryId) {
  const totalWeight = entries.reduce((total, entry) => total + Number(entry.weight || 1), 0) || 1;
  let cursor = 0;
  for (const entry of entries) {
    const span = (Number(entry.weight || 1) / totalWeight) * 360;
    if (entry.id === entryId) return cursor + (span / 2);
    cursor += span;
  }
  return 0;
}
```

### Function nextEncounterLandingRotation

```javascript
function nextEncounterLandingRotation(session, entries, entryId) {
  const current = Number(session.visualRotation || 0);
  const currentTurn = ((current % 360) + 360) % 360;
  const targetTurn = (360 - encounterEntryCenterDegrees(entries, entryId)) % 360;
  let delta = targetTurn - currentTurn;
  if (delta < 0) delta += 360;
  return current + 2160 + delta;
}
```

### Function encounterRollFreeRerollReason

```javascript
function encounterRollFreeRerollReason(player, roll) {
  const pokemonName = roll?.resultDisplayName || roll?.resultPokemonName || "";
  if (!pokemonName) return "";
  if (currentPokemonRuleStatusByName(pokemonName) === "Banned") return "Banned Pokemon";
  if (playerHasPokemonFamily(player.id, pokemonName)) return "Evolution line already owned";
  return "";
}
```

### Function pendingRandomPokemonSessions

```javascript
function pendingRandomPokemonSessions() {
  state.randomPokemonSessions ||= [];
  return state.randomPokemonSessions.filter((session) => session.status === "pending");
}
```

### Function rerollRandomPokemonResult

```javascript
async function rerollRandomPokemonResult({ targetResultId, actorPlayerId, mode = "result" }) {
  const actor = state.players.find((player) => player.id === actorPlayerId);
  if (!actor) return;
  if (String(targetResultId || "").startsWith("encounter-roll:")) {
    const [, sessionId, rollId] = targetResultId.split(":");
    const session = (state.encounterSessions || []).find((entry) => entry.id === sessionId);
    const roll = (session?.rolls || []).find((entry) => entry.id === rollId);
    const effectiveMode = mode === "result" && roll?.specialEncounter && session?.playerId && session.playerId !== actor.id
      ? "encounter"
      : mode;
    await rerollEncounterRoll(sessionId, rollId, { actorPlayerId: actor.id, mode: effectiveMode });
    return;
  }
  const randomSessionId = String(targetResultId || "").replace(/^random-pokemon:/, "");
  await rerollRandomPokemonSession(randomSessionId, { actorPlayerId: actor.id });
}
```

### Function selectedRandomPokemonSession

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

### Function createRandomPokemonSession

```javascript
async function createRandomPokemonSession({ sourceType, sourceLabel, player, tier, actionVisitId = "", gameCornerSessionId = "", token = null }) {
  const available = availablePokemonForGameCornerTier(tier);
  if (!available.length) {
    alert(`No available ${getPokemonTierLabel(tier) || tier} Pokemon are currently eligible. Banned Pokemon are rerolled/excluded.`);
    return null;
  }
  const result = randomSample(available, 1)[0];
  const session = {
    id: `random-pokemon-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    sourceType,
    sourceLabel,
    playerId: player.id,
    ownerPlayerId: player.id,
    resultOwnerPlayerId: player.id,
    series: state.series,
    gym: Number(state.gym),
    phase: currentPhase(),
    locationSessionId: gameCornerSessionId,
    gameCornerSessionId,
    actionVisitId,
    tokenId: token?.id || "",
    tokenName: token?.name || "",
    tierId: normalizeGameCornerTierId(tier),
    status: "pending",
    resultPokemonName: result.key,
    resultDisplayName: result.displayName,
    resultSprite: "",
    chosenSpriteKey: "",
    resultMetadata: structuredClone(result),
    rerollable: true,
    interactionLocked: false,
    rerollCount: 0,
    createdAt: new Date().toISOString(),
    confirmedAt: null
  };
  state.randomPokemonSessions ||= [];
  state.randomPokemonSessions.unshift(session);
  state.selectedRandomPokemonSessionId = session.id;
  state.randomPokemonDrawerOpen = true;
  createPokemonResultTimingWindow(session, player);
  saveState();
  render();
  const sprite = await fetchStablePokemonSprite(result.displayName, session.chosenSpriteKey);
  const latest = (state.randomPokemonSessions || []).find((entry) => entry.id === session.id);
  if (latest && latest.status === "pending") {
    latest.chosenSpriteKey = sprite.spriteKey || "";
    latest.resultSprite = sprite.spriteUrl || "";
    saveState();
    renderRandomPokemonPanel();
  }
  return session;
}
```

### Function createEncounterPokemonResultSession

```javascript
async function createEncounterPokemonResultSession({ player, encounterSession, roll, result }) {
  const session = {
    id: `random-pokemon-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    sourceType: "encounter",
    sourceLabel: "Encounter Wheel",
    playerId: player.id,
    ownerPlayerId: player.id,
    resultOwnerPlayerId: player.id,
    series: encounterSession.series,
    gym: Number(encounterSession.gym),
    phase: "action",
    encounterSessionId: encounterSession.id,
    actionVisitId: encounterSession.actionVisitId,
    encounterRollId: roll.id,
    wheelId: encounterSession.wheelId,
    tokenId: "",
    tokenName: "",
    tierId: getPokemonAcquisitionTier(result.displayName || result.pokemonName || "") || "",
    status: "pending",
    resultPokemonName: result.pokemonName || result.displayName,
    resultDisplayName: result.displayName || result.pokemonName,
    resultSprite: "",
    chosenSpriteKey: "",
    resultMetadata: structuredClone(result),
    rerollable: true,
    interactionLocked: false,
    rerollCount: 0,
    createdAt: new Date().toISOString(),
    confirmedAt: null
  };
  state.randomPokemonSessions ||= [];
  state.randomPokemonSessions.unshift(session);
  encounterSession.resultSessionIds ||= [];
  encounterSession.resultSessionIds.push(session.id);
  roll.randomPokemonSessionId = session.id;
  state.selectedRandomPokemonSessionId = session.id;
  state.randomPokemonDrawerOpen = true;
  createPokemonResultTimingWindow(session, player);
  saveState();
  render();
  const sprite = await fetchStablePokemonSprite(session.resultDisplayName, session.chosenSpriteKey);
  const latest = (state.randomPokemonSessions || []).find((entry) => entry.id === session.id);
  if (latest && latest.status === "pending") {
    latest.chosenSpriteKey = sprite.spriteKey || "";
    latest.resultSprite = sprite.spriteUrl || "";
    saveState();
    renderRandomPokemonPanel();
  }
  return session;
}
```

### Function hydrateEncounterRollSprite

```javascript
async function hydrateEncounterRollSprite(roll) {
  if (!roll || roll.resultSprite) return roll;
  const sprite = await fetchStablePokemonSprite(roll.resultDisplayName || roll.resultPokemonName, roll.chosenSpriteKey || "");
  roll.chosenSpriteKey = sprite.spriteKey || roll.chosenSpriteKey || "";
  roll.resultSprite = sprite.spriteUrl || roll.resultSprite || "";
  return roll;
}
```

### Function encounterRollWasObtained

```javascript
function encounterRollWasObtained(roll) {
  return Boolean(roll?.rosterPokemonId || roll?.confirmedPokemonId);
}
```

### Function encounterSessionReadyForAutomaticCompletion

```javascript
function encounterSessionReadyForAutomaticCompletion(session) {
  if (!session || ["completed", "cancelled", "undone"].includes(session.status)) return false;
  const rolls = session.rolls || [];
  return rolls.length >= Number(session.maxRolls || 2)
    && rolls.every(encounterRollWasObtained);
}
```

### Function completeObtainedEncounterSession

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

### Function addEncounterRollToRoster

```javascript
async function addEncounterRollToRoster(sessionId, rollId, { skipPendingGuard = false } = {}) {
  if (!skipPendingGuard && !guardPendingEventBeforeAction("Accept Encounter Result", () => addEncounterRollToRoster(sessionId, rollId, { skipPendingGuard: true }))) return;
  const session = (state.encounterSessions || []).find((entry) => entry.id === sessionId);
  const roll = (session?.rolls || []).find((entry) => entry.id === rollId);
  if (!session || !roll || roll.rosterPokemonId) return;
  const player = state.players.find((entry) => entry.id === session.playerId) || activePlayer();
  await hydrateEncounterRollSprite(roll);
  await ensurePokemonBuildDataLoaded({ renderOnLoad: false });
  const acquisition = resolvePokemonAcquisitionSpecies(roll.resultDisplayName || roll.resultPokemonName);
  const receivedSprite = acquisition.receivedSpecies && teambuilderDataKey(acquisition.receivedSpecies) !== teambuilderDataKey(roll.resultDisplayName || roll.resultPokemonName)
    ? await fetchStablePokemonSprite(acquisition.receivedSpecies)
    : { spriteUrl: roll.resultSprite || "", spriteKey: roll.chosenSpriteKey || "" };
  const pokemon = createPokemonRecord(player, roll.resultDisplayName || roll.resultPokemonName, "Encounter Wheel", {
    rosterType: "Active",
    receivedSpriteUrl: receivedSprite.spriteUrl || "",
    receivedSpriteKey: receivedSprite.spriteKey || "",
    sourceTier: getPokemonAcquisitionTier(roll.resultDisplayName || roll.resultPokemonName),
    acquisitionTier: getPokemonAcquisitionTier(roll.resultDisplayName || roll.resultPokemonName),
    gameCornerMetadata: getPokemonGameCornerMetadata(roll.resultDisplayName || roll.resultPokemonName)
  });
  roll.rosterPokemonId = pokemon.id;
  roll.addedAt = new Date().toISOString();
  updateEncounterActionLog(session, player, (entry) => {
    appendLogCategory(entry, "pokemon");
    appendUniqueLogValue(entry, "pokemonNames", roll.resultDisplayName);
    appendGroupedLogDetail(entry, `Encounter caught: ${roll.resultDisplayName}.`);
    entry.childEvents ||= [];
    entry.childEvents.push({
      type: "encounter-caught",
      category: "pokemon",
      pokemonName: roll.resultDisplayName,
      pokemonId: pokemon.id,
      encounterRollId: roll.id,
      encounterSessionId: session.id,
      actionVisitId: session.actionVisitId,
      timestamp: roll.addedAt
    });
  });
  completeObtainedEncounterSession(session);
  saveState();
  render();
}
```

### Function rerollEncounterRoll

```javascript
async function rerollEncounterRoll(sessionId, rollId, options = {}) {
  const session = (state.encounterSessions || []).find((entry) => entry.id === sessionId);
  const roll = (session?.rolls || []).find((entry) => entry.id === rollId);
  if (!session || !roll || roll.rosterPokemonId) return;
  const player = state.players.find((entry) => entry.id === session.playerId) || activePlayer();
  const actor = state.players.find((entry) => entry.id === (options.actorPlayerId || session.playerId)) || player;
  if (!requirePrivatePrepAccess(actor, "reroll token")) return;
  const rerollMode = options.mode || "result";
  const freeRerollReason = actor.id === player.id ? encounterRollFreeRerollReason(player, roll) : "";
  const tokenIndex = freeRerollReason ? -1 : playerRerollTokenIndex(actor);
  if (!freeRerollReason && tokenIndex < 0) {
    alert(`${actor.name} needs a Reroll Token.`);
    return;
  }
  const exactToken = tokenIndex >= 0 ? actor.inventory[tokenIndex] : null;
  const sourceEffectId = options.sourceEffectId || (exactToken ? `reroll:${exactToken.id}:${session.id}:${roll.id}` : "");
  const duplicateOperation = rerollOperationForSource(sourceEffectId);
  if (duplicateOperation) return duplicateOperation;
  const shouldStayInSpecialWheel = rerollMode !== "encounter" && roll.specialEncounter?.wheelId;
  const entries = shouldStayInSpecialWheel
    ? (hyperspaceWheelDefinitions[roll.specialEncounter.wheelId]?.entries || [])
    : encounterEntriesForSession(session);
  if (!entries.length) {
    alert("No Pokemon are available in this Encounter pool.");
    return;
  }
  const currentKey = normalizePokemonName(roll.resultPokemonName || roll.resultDisplayName);
  const next = randomSample(entries.filter((entry) => normalizePokemonName(entry.key || entry.pokemonName || entry.displayName) !== currentKey), 1)[0] || randomSample(entries, 1)[0];
  if (!next) return;
  const causalBeforeReroll = exactToken ? tokenUseRollbackSnapshot() : null;
  const rerollToken = freeRerollReason ? null : actor.inventory.splice(tokenIndex, 1)[0];
  const previousResult = {
    resultPokemonName: roll.resultPokemonName,
    resultDisplayName: roll.resultDisplayName,
    resultSprite: roll.resultSprite || "",
    chosenSpriteKey: roll.chosenSpriteKey || "",
    entryId: roll.entryId,
    visualEntryId: roll.visualEntryId || roll.entryId,
    category: roll.category || "land",
    weight: Number(roll.weight || 1),
    specialEncounter: structuredClone(roll.specialEncounter || null)
  };
  const { result: resolvedNext, special: nextSpecial } = shouldStayInSpecialWheel
    ? { result: next, special: { ...roll.specialEncounter, resultEntryId: next.id, resultName: next.displayName || next.pokemonName || next.key } }
    : resolveEncounterSpecialResult(next);
  const nextName = resolvedNext.displayName || resolvedNext.pokemonName || resolvedNext.key;
  roll.rerollHistory ||= [];
  const previousRevisionId = roll.resultRevisionId || `${roll.id}:original`;
  const rerollRecordId = `encounter-reroll-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  roll.rerollHistory.push({
    id: rerollRecordId,
    actorPlayerId: actor.id,
    targetPlayerId: player.id,
    targetResultId: roll.id,
    token: rerollToken ? structuredClone(rerollToken) : null,
    free: Boolean(freeRerollReason),
    freeReason: freeRerollReason,
    mode: rerollMode,
    previousResult: { ...previousResult, resultRevisionId: previousRevisionId, status: "superseded" },
    newResultPokemonName: resolvedNext.key || resolvedNext.pokemonName || resolvedNext.displayName,
    newResultDisplayName: nextName,
    usedAt: new Date().toISOString()
  });
  roll.entryId = resolvedNext.id;
  roll.visualEntryId = nextSpecial?.triggerEntryId || next.id;
  roll.resultPokemonName = resolvedNext.pokemonName || resolvedNext.displayName;
  roll.resultDisplayName = nextName;
  roll.category = resolvedNext.category || "land";
  roll.weight = Number(resolvedNext.weight || 1);
  roll.specialEncounter = nextSpecial;
  roll.resultSprite = "";
  roll.chosenSpriteKey = "";
  roll.resultRevisionId = `${roll.id}:replacement:${rerollRecordId}`;
  roll.supersedesResultRevisionId = previousRevisionId;
  await hydrateEncounterRollSprite(roll);
  if (rerollToken) {
    addTokenConsumptionRecord({
      player: actor, token: rerollToken, tokenName: rerollToken.name,
      metadata: tokenEffectMetadataByName(rerollToken.name), linkedEventId: sourceEffectId, source: "encounter-result-reroll"
    });
    const operation = {
      id: `effect-operation-${rerollRecordId}`,
      operationType: "rerollEncounterResult", sourceEffectId, sourceTokenId: rerollToken.id,
      targetResultId: roll.id, targetSessionId: session.id, resultKind: "encounter-roll",
      previousResultRevisionId: previousRevisionId, replacementResultRevisionId: roll.resultRevisionId,
      status: "completed", createdAt: new Date().toISOString()
    };
    state.effectOperations ||= [];
    state.effectOperations.push(operation);
    recordRerollTokenHistory({ snapshot: causalBeforeReroll, actor, token: rerollToken, sourceEffectId,
      targetResultId: roll.id, targetPlayerId: player.id, previousName: previousResult.resultDisplayName,
      nextName, resultKind: "encounter-roll" });
  }
  updateEncounterActionLog(session, player, (entry) => {
    appendLogCategory(entry, "items");
    appendLogCategory(entry, "pokemon");
    appendUniqueLogValue(entry, "tags", "encounter-reroll");
    if (rerollToken?.name) appendUniqueLogValue(entry, "tokenNames", rerollToken.name);
    appendUniqueLogValue(entry, "playerIds", actor.id);
    appendUniqueLogValue(entry, "pokemonNames", nextName);
    const modeLabel = rerollMode === "encounter" ? "Encounter respin" : shouldStayInSpecialWheel ? "Hyperspace reroll" : "Encounter reroll";
    appendGroupedLogDetail(entry, freeRerollReason
      ? `${modeLabel} (${freeRerollReason}): ${previousResult.resultDisplayName} -> ${nextName}.`
      : `${actor.name} used Reroll Token on ${player.name}'s ${modeLabel}: ${previousResult.resultDisplayName} -> ${nextName}.`);
    entry.childEvents ||= [];
    entry.childEvents.push({
      type: "encounter-reroll",
      category: "items",
      tokenId: rerollToken?.id || "",
      tokenName: rerollToken?.name || "",
      actorPlayerId: actor.id,
      targetPlayerId: player.id,
      targetResultId: roll.id,
      free: Boolean(freeRerollReason),
      freeReason: freeRerollReason,
      mode: rerollMode,
      previousPokemon: previousResult.resultDisplayName,
      newPokemon: nextName,
      encounterRollId: roll.id,
      encounterSessionId: session.id,
      actionVisitId: session.actionVisitId,
      timestamp: new Date().toISOString()
    });
  });
  saveState();
  renderEncounterOverlay();
}
```

### Function confirmRandomPokemonSession

```javascript
async function confirmRandomPokemonSession(sessionId = state.selectedRandomPokemonSessionId, { skipPendingGuard = false } = {}) {
  if (!skipPendingGuard && !guardPendingEventBeforeAction("Confirm Pokemon Result", () => confirmRandomPokemonSession(sessionId, { skipPendingGuard: true }))) return;
  const randomSession = (state.randomPokemonSessions || []).find((entry) => entry.id === sessionId);
  if (!randomSession || randomSession.status !== "pending") return;
  const honeyAcquisitionSnapshot = randomSession.copiedFromRandomPokemonSessionId ? tokenUseRollbackSnapshot() : null;
  const player = state.players.find((entry) => entry.id === (randomSession.resultOwnerPlayerId || randomSession.ownerPlayerId || randomSession.playerId));
  if (!player) return;
  if (!requirePrivatePrepAccess(player, "random Pokemon result")) return;
  const tokenIndex = randomSession.tokenId ? (player.inventory || []).findIndex((item) => item.id === randomSession.tokenId) : -1;
  if (randomSession.sourceType === "game-corner-token" && tokenIndex < 0) {
    alert("That Game Corner Ticket is no longer available.");
    return;
  }
  if (!confirm(`Add ${randomSession.resultDisplayName} to ${player.name}'s Active roster?`)) return;
  const token = tokenIndex >= 0 ? player.inventory[tokenIndex] : null;
  if (tokenIndex >= 0) {
    player.inventory.splice(tokenIndex, 1);
  }
  const session = (state.gameCornerSessions || []).find((entry) => entry.id === randomSession.gameCornerSessionId);
  const visit = gameCornerSessionVisit(session);
  const choice = randomSession.resultMetadata || {};
  await ensurePokemonBuildDataLoaded({ renderOnLoad: false });
  const acquisition = resolvePokemonAcquisitionSpecies(randomSession.resultDisplayName);
  const receivedSpecies = acquisition.receivedSpecies || randomSession.resultDisplayName;
  const sprite = randomSession.resultSprite
    && teambuilderDataKey(receivedSpecies) === teambuilderDataKey(randomSession.resultDisplayName)
    ? { spriteUrl: randomSession.resultSprite, spriteKey: randomSession.chosenSpriteKey || "" }
    : await fetchStablePokemonSprite(receivedSpecies, teambuilderDataKey(receivedSpecies) === teambuilderDataKey(randomSession.resultDisplayName) ? randomSession.chosenSpriteKey : "");
  const spriteUrl = sprite.spriteUrl || "";
  randomSession.resultSprite = spriteUrl || randomSession.resultSprite || "";
  randomSession.chosenSpriteKey = sprite.spriteKey || randomSession.chosenSpriteKey || "";
  const pokemon = createPokemonRecord(player, randomSession.resultDisplayName, randomSession.sourceLabel || "Random Pokemon", {
    rosterType: "Active",
    receivedSpriteUrl: spriteUrl,
    receivedSpriteKey: sprite.spriteKey || "",
    sourceTier: randomSession.tierId,
    acquisitionTier: randomSession.tierId,
    gameCornerMetadata: choice
  });
  randomSession.status = "confirmed";
  randomSession.confirmedAt = new Date().toISOString();
  randomSession.rosterPokemonId = pokemon.id;
  resolvePokemonResultTimingWindow(randomSession, "resolved");
  augmentHoneyCausalUndoAfterAcquisition(randomSession, honeyAcquisitionSnapshot);
  if (randomSession.sourceType === "encounter") {
    const encounterSession = (state.encounterSessions || []).find((entry) => entry.id === randomSession.encounterSessionId);
    if (encounterSession) {
      const roll = (encounterSession.rolls || []).find((entry) => entry.id === randomSession.encounterRollId);
      if (roll) {
        roll.confirmedPokemonId = pokemon.id;
        roll.confirmedAt = randomSession.confirmedAt;
      }
      updateEncounterActionLog(encounterSession, player, (entry) => {
        appendLogCategory(entry, "pokemon");
        appendUniqueLogValue(entry, "pokemonNames", randomSession.resultDisplayName);
        appendGroupedLogDetail(entry, `Caught ${randomSession.resultDisplayName}.`);
        entry.childEvents ||= [];
        entry.childEvents.push({
          type: "encounter-caught",
          category: "pokemon",
          pokemonId: pokemon.id,
          pokemonName: randomSession.resultDisplayName,
          randomPokemonSessionId: randomSession.id,
          encounterSessionId: encounterSession.id,
          timestamp: randomSession.confirmedAt
        });
      });
      completeObtainedEncounterSession(encounterSession);
    }
    saveState();
    render();
    return;
  }
  if (randomSession.sourceType !== "game-corner-token" || !session || !token) {
    saveState();
    render();
    return;
  }
  const unlock = {
    id: `gc-unlock-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    playerId: player.id,
    tokenId: token.id,
    tokenName: token.name,
    gameCornerTier: randomSession.tierId,
    choices: [structuredClone(choice)],
    chosenPokemonName: randomSession.resultDisplayName,
    pokemonId: pokemon.id,
    randomPokemonSessionId: randomSession.id,
    series: state.series,
    gym: Number(state.gym),
    actionVisitId: visit?.id || session.actionVisitId,
    gameCornerSessionId: session.id,
    status: "completed",
    createdAt: new Date().toISOString()
  };
  state.gameCornerUnlocks ||= [];
  state.gameCornerUnlocks.unshift(unlock);
  session.gcTokensUsed ||= [];
  session.gcTokensUsed.push({ token: structuredClone(token), unlockId: unlock.id, pokemonId: pokemon.id, randomPokemonSessionId: randomSession.id, usedAt: unlock.createdAt });
  updateGameCornerActionLog(session, player, (entry) => {
    appendLogCategory(entry, "items");
    appendLogCategory(entry, "pokemon");
    appendUniqueLogValue(entry, "tags", "game-corner-token-use");
    appendUniqueLogValue(entry, "tags", "game-corner-pokemon-unlock");
    appendUniqueLogValue(entry, "tokenNames", token.name);
    appendUniqueLogValue(entry, "itemNames", token.name);
    appendUniqueLogValue(entry, "tokenIds", token.id);
    appendUniqueLogValue(entry, "pokemonNames", choice.displayName);
    appendGroupedLogDetail(entry, `Used ${token.name}. Rolled ${randomSession.resultDisplayName}. Caught ${randomSession.resultDisplayName}.${choice.extraCost ? ` Extra cost note: ${formatMoney(choice.extraCost)}.` : ""}${choice.extraRequirement ? ` Requirement note: ${choice.extraRequirement}.` : ""}${choice.note ? ` Note: ${choice.note}.` : ""}`);
    entry.childEvents ||= [];
    entry.childEvents.push({
      type: "game-corner-token-use",
      category: "items",
      tokenId: token.id,
      tokenName: token.name,
      gameCornerTier: randomSession.tierId,
      unlockId: unlock.id,
      pokemonId: pokemon.id,
      randomPokemonSessionId: randomSession.id,
      pokemonName: randomSession.resultDisplayName,
      rolledPokemon: randomSession.resultDisplayName,
      actionVisitId: unlock.actionVisitId,
      timestamp: unlock.createdAt
    });
  });
  const next = pendingRandomPokemonSessions().find((entry) => entry.id !== randomSession.id);
  state.selectedRandomPokemonSessionId = next?.id || "";
  state.randomPokemonDrawerOpen = Boolean(next);
  saveState();
  render();
}
```

### Function rerollRandomPokemonSession

```javascript
async function rerollRandomPokemonSession(sessionId = state.selectedRandomPokemonSessionId, options = {}) {
  const randomSession = (state.randomPokemonSessions || []).find((entry) => entry.id === sessionId);
  if (!randomSession || randomSession.status !== "pending" || randomSession.rerollable === false || randomSession.interactionLocked) return;
  const ownerPlayerId = randomSession.resultOwnerPlayerId || randomSession.ownerPlayerId || randomSession.playerId;
  const player = state.players.find((entry) => entry.id === ownerPlayerId);
  const actor = state.players.find((entry) => entry.id === (options.actorPlayerId || ownerPlayerId));
  if (!player || !actor) return;
  if (!requirePrivatePrepAccess(actor, "reroll token")) return;
  const tokenIndex = playerRerollTokenIndex(actor);
  if (tokenIndex < 0) {
    alert(`${actor.name} needs a Reroll Token.`);
    return;
  }
  const exactToken = actor.inventory[tokenIndex];
  const sourceEffectId = options.sourceEffectId || `reroll:${exactToken.id}:${randomSession.id}`;
  const duplicateOperation = rerollOperationForSource(sourceEffectId);
  if (duplicateOperation) return duplicateOperation;
  const encounterSession = randomSession.sourceType === "encounter"
    ? (state.encounterSessions || []).find((entry) => entry.id === randomSession.encounterSessionId)
    : null;
  const available = encounterSession ? encounterEntriesForSession(encounterSession) : availablePokemonForGameCornerTier(randomSession.tierId);
  if (!available.length) {
    alert("No Pokemon are available in this result pool.");
    return;
  }
  const causalBeforeReroll = tokenUseRollbackSnapshot();
  const rerollToken = actor.inventory.splice(tokenIndex, 1)[0];
  const previousResult = {
    resultPokemonName: randomSession.resultPokemonName,
    resultDisplayName: randomSession.resultDisplayName,
    resultSprite: randomSession.resultSprite,
    chosenSpriteKey: randomSession.chosenSpriteKey || "",
    resultMetadata: structuredClone(randomSession.resultMetadata || {})
  };
  const currentKey = normalizePokemonName(randomSession.resultPokemonName || randomSession.resultDisplayName);
  const next = randomSample(available.filter((entry) => normalizePokemonName(entry.key || entry.pokemonName || entry.displayName) !== currentKey), 1)[0] || randomSample(available, 1)[0];
  const nextName = next.displayName || next.pokemonName || next.key;
  randomSession.resultHistory ||= [];
  const previousRevisionId = randomSession.resultRevisionId || `${randomSession.id}:original`;
  randomSession.resultHistory.push({ ...previousResult, resultRevisionId: previousRevisionId, status: "superseded" });
  randomSession.rerollHistory ||= [];
  randomSession.rerollHistory.push({
    id: `reroll-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    actorPlayerId: actor.id,
    targetPlayerId: player.id,
    targetResultId: randomSession.id,
    token: structuredClone(rerollToken),
    tokenId: rerollToken.id,
    tokenName: rerollToken.name,
    previousResult,
    newResultPokemonName: next.key || next.pokemonName || next.displayName,
    newResultDisplayName: nextName,
    usedAt: new Date().toISOString()
  });
  let savedRerollResponse = null;
  if (randomSession.interactionEventId) {
    const updatedActivity = addInteractionResponse(randomSession.interactionEventId, {
      type: encounterSession ? "encounter-reroll" : "pokemon-reroll",
      playerId: actor.id,
      tokenId: rerollToken.id,
      tokenName: rerollToken.name,
      note: `${actor.name} rerolled ${previousResult.resultDisplayName} into ${nextName}.`
    });
    savedRerollResponse = updatedActivity?.responses?.[updatedActivity.responses.length - 1] || null;
  }
  addTokenConsumptionRecord({
    player: actor,
    token: rerollToken,
    tokenName: rerollToken.name,
    metadata: tokenEffectMetadataByName(rerollToken.name),
    linkedEventId: randomSession.interactionEventId || "",
    linkedResponseId: savedRerollResponse?.id || "",
    promptId: savedRerollResponse?.respondingToPromptId || "",
    source: "encounter-reroll"
  });
  randomSession.rerollCount = Number(randomSession.rerollCount || 0) + 1;
  randomSession.resultPokemonName = next.key || next.pokemonName || next.displayName;
  randomSession.resultDisplayName = nextName;
  randomSession.resultMetadata = structuredClone(next);
  randomSession.resultSprite = "";
  randomSession.chosenSpriteKey = "";
  const rerollRecord = randomSession.rerollHistory[randomSession.rerollHistory.length - 1];
  randomSession.resultRevisionId = `${randomSession.id}:replacement:${rerollRecord.id}`;
  randomSession.supersedesResultRevisionId = previousRevisionId;
  randomSession.revealSeen = false;
  state.selectedRandomPokemonSessionId = randomSession.id;
  state.randomPokemonDrawerOpen = true;
  if (randomSession.gameCornerSessionId) {
    const gcSession = (state.gameCornerSessions || []).find((entry) => entry.id === randomSession.gameCornerSessionId);
    if (gcSession) {
      updateGameCornerActionLog(gcSession, player, (entry) => {
        appendLogCategory(entry, "items");
        appendLogCategory(entry, "pokemon");
        appendUniqueLogValue(entry, "tags", "random-pokemon-reroll");
        appendUniqueLogValue(entry, "tokenNames", rerollToken.name);
        appendUniqueLogValue(entry, "playerIds", actor.id);
        appendGroupedLogDetail(entry, `${actor.name} used Reroll Token on ${player.name}'s Game Corner Ticket result: ${previousResult.resultDisplayName} -> ${nextName}.`);
        entry.childEvents ||= [];
        entry.childEvents.push({
          type: "random-pokemon-reroll",
          category: "items",
          tokenId: rerollToken.id,
          tokenName: rerollToken.name,
          actorPlayerId: actor.id,
          targetPlayerId: player.id,
          targetResultId: randomSession.id,
          previousPokemon: previousResult.resultDisplayName,
          newPokemon: nextName,
          randomPokemonSessionId: randomSession.id,
          timestamp: new Date().toISOString()
        });
      });
    }
  }
  if (encounterSession) {
    updateEncounterActionLog(encounterSession, player, (entry) => {
      appendLogCategory(entry, "items");
      appendLogCategory(entry, "pokemon");
      appendUniqueLogValue(entry, "tags", "encounter-reroll");
      appendUniqueLogValue(entry, "tokenNames", rerollToken.name);
      appendUniqueLogValue(entry, "playerIds", actor.id);
      appendGroupedLogDetail(entry, `${actor.name} used Reroll Token on ${player.name}'s Encounter result: ${previousResult.resultDisplayName} -> ${nextName}.`);
      entry.childEvents ||= [];
      entry.childEvents.push({
        type: "encounter-reroll",
        category: "items",
        tokenId: rerollToken.id,
        tokenName: rerollToken.name,
        actorPlayerId: actor.id,
        targetPlayerId: player.id,
        targetResultId: randomSession.id,
        previousPokemon: previousResult.resultDisplayName,
        newPokemon: nextName,
        randomPokemonSessionId: randomSession.id,
        encounterSessionId: encounterSession.id,
        timestamp: new Date().toISOString()
      });
    });
  }
  saveState();
  renderRandomPokemonPanel();
  const sprite = await fetchStablePokemonSprite(nextName, randomSession.chosenSpriteKey);
  const latest = (state.randomPokemonSessions || []).find((entry) => entry.id === randomSession.id);
  if (latest && latest.status === "pending") {
    latest.chosenSpriteKey = sprite.spriteKey || "";
    latest.resultSprite = sprite.spriteUrl || "";
    state.selectedRandomPokemonSessionId = latest.id;
    state.randomPokemonDrawerOpen = true;
    saveState();
    renderRandomPokemonPanel();
  }
  const operation = {
    id: `effect-operation-${rerollRecord.id}`,
    operationType: "rerollEncounterResult", sourceEffectId, sourceTokenId: rerollToken.id,
    targetResultId: randomSession.id, resultKind: encounterSession ? "encounter-result" : "wheel-result",
    previousResultRevisionId: previousRevisionId, replacementResultRevisionId: randomSession.resultRevisionId,
    status: "completed", createdAt: new Date().toISOString()
  };
  state.effectOperations ||= [];
  state.effectOperations.push(operation);
  recordRerollTokenHistory({ snapshot: causalBeforeReroll, actor, token: rerollToken, sourceEffectId,
    targetResultId: randomSession.id, targetPlayerId: player.id, previousName: previousResult.resultDisplayName,
    nextName, resultKind: operation.resultKind });
  saveState();
  return operation;
}
```

### Function cancelRandomPokemonSession

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

### Function updateEncounterActionLog

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

### Function activeEncounterSessionForPlayer

```javascript
function activeEncounterSessionForPlayer(playerId, series = state.series, gym = state.gym) {
  return (state.encounterSessions || []).find((session) => session.playerId === playerId
    && session.series === series
    && Number(session.gym) === Number(gym)
    && ["pending", "review"].includes(session.status));
}
```

### Function startEncounterSession

```javascript
function startEncounterSession({ skipConfirmCheck = false } = {}) {
  const player = activePlayer();
  const location = actionLocationById("encounter");
  const definition = encounterWheelDefinition();
  if (!definition) {
    alert("No Encounter Wheel is defined for this Series/Gym yet.");
    return false;
  }
  if (!skipConfirmCheck) {
    const check = actionLocationCanConfirm(location, player.id, 1);
    if (!check.ok) {
      alert(check.reason);
      return false;
    }
  }
  const previousVisits = structuredClone(actionVisitsForPlayer(player.id));
  const previousEncounterSessions = structuredClone(state.encounterSessions || []);
  const previousRandomPokemonSessions = structuredClone(state.randomPokemonSessions || []);
  const previousPokemonRecords = structuredClone(state.pokemonRecords || []);
  const previousInventory = structuredClone(player.inventory || []);
  const previousInteractionEventIds = (state.interactionEvents || []).map((activity) => activity.id).filter(Boolean);
  const previousTransactionIds = (state.transactions || []).map((transaction) => transaction.id).filter(Boolean);
  const visit = {
    id: `action-visit-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    playerId: player.id,
    locationId: "encounter",
    locationName: "Encounter",
    serviceId: "encounter-wheel",
    serviceLabel: "Open Encounter Wheel",
    actionCost: 1,
    series: state.series,
    gym: Number(state.gym),
    phase: currentPhase(),
    createdAt: new Date().toISOString(),
    placeholder: false
  };
  commitActionVisit(visit);
  state.encounterSessions ||= [];
  let session = activeEncounterSessionForPlayer(player.id);
  const reusedSession = Boolean(session);
  if (session) {
    session.actionVisitIds ||= session.actionVisitId ? [session.actionVisitId] : [];
    session.actionVisitIds.push(visit.id);
    session.maxRolls = Number(session.maxRolls || 0) + Number(definition.rollsPerAction || 2);
    if (session.status === "review") session.status = "pending";
    session.updatedAt = new Date().toISOString();
  } else {
    session = {
      id: `encounter-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      playerId: player.id,
      series: state.series,
      gym: Number(state.gym),
      phase: "action",
      actionVisitId: visit.id,
      actionVisitIds: [visit.id],
      wheelId: definition.id,
      maxRolls: Number(definition.rollsPerAction || 2),
      includeFishing: false,
      includeSurf: false,
      removedEntryIds: [],
      temporaryEntries: [],
      weightOverrides: {},
      resultSessionIds: [],
      rolls: [],
      status: "pending",
      visualRotation: 0,
      createdAt: new Date().toISOString()
    };
    state.encounterSessions.unshift(session);
  }
  linkActionOperation(visit.id, { featureType: "encounter", featureSessionId: session.id });
  state.selectedEncounterSessionId = session.id;
  state.encounterModalOpen = true;
  addLogEntry({
    action: "phase",
    category: "action",
    player: player.name,
    item: `${player.name} took action at Encounter`,
    title: `${player.name} took action at Encounter`,
    summary: `Spent 1 Action at Encounter\nRolled ${(session.rolls || []).length}/${session.maxRolls || 2} Encounters`,
    details: [reusedSession ? "Added 2 more rolls to existing Encounter session" : "Spent 1 Action at Encounter"],
    type: "encounter-action",
    categories: ["action", "pokemon"],
    tags: ["encounter", "wheel"],
    subtypes: ["Encounter"],
    playerIds: [player.id],
    actionVisitId: visit.id,
    visitId: visit.id,
    encounterSessionId: session.id,
    combinedEncounterSession: reusedSession,
    undoable: true,
    undone: false,
    undoData: {
      actionType: "undoEncounterAction",
      visitId: visit.id,
      playerId: player.id,
      locationId: "encounter",
      encounterSessionId: session.id,
      series: state.series,
      gym: Number(state.gym),
      previousVisits,
      previousEncounterSessions,
      previousRandomPokemonSessions,
      previousPokemonRecords,
      previousInventory,
      previousInteractionEventIds,
      previousTransactionIds
    }
  });
  saveState();
  render();
  return true;
}
```

### Function renderRandomPokemonPanel

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

### Function completeEncounterRoll

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

### Function spinEncounterWheel

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

### Function closeEncounterSession

```javascript
function closeEncounterSession(sessionId = state.selectedEncounterSessionId, { skipPendingGuard = false } = {}) {
  if (!skipPendingGuard && !guardPendingEventBeforeAction("Close Encounter Session", () => closeEncounterSession(sessionId, { skipPendingGuard: true }))) return;
  const session = (state.encounterSessions || []).find((entry) => entry.id === sessionId);
  if (!session) return;
  const unaddedRolls = (session.rolls || []).filter((roll) => !encounterRollWasObtained(roll));
  if (unaddedRolls.length) {
    alert("Add every Encounter result to the party before closing this Encounter session.");
    state.encounterModalOpen = true;
    state.selectedEncounterSessionId = session.id;
    saveState();
    renderEncounterOverlay();
    return;
  }
  if (session.status === "pending" && (session.rolls || []).length < Number(session.maxRolls || 2)
    && !confirm(`Finish this Encounter session with ${(session.rolls || []).length}/${session.maxRolls || 2} rolls used?`)) return;
  session.status = "completed";
  session.completedAt ||= new Date().toISOString();
  (session.actionVisitIds || [session.actionVisitId]).filter(Boolean).forEach((visitId) => {
    completeActionOperationForVisit(visitId, "encounter-session-closed");
  });
  const next = pendingEncounterSessions().find((entry) => entry.id !== session.id);
  state.selectedEncounterSessionId = next?.id || "";
  state.encounterModalOpen = Boolean(next);
  saveState();
  render();
}
```

### Function renderEncounterOverlay

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
      <em>${(entry.rolls || []).length}/${entry.maxRolls || 2} rolls</em>
    `;
    return button;
  }));
  const totalWeight = entries.reduce((total, entry) => total + Number(entry.weight || 1), 0) || 1;
  const colors = ["#7cc6fe", "#98d973", "#f7c948", "#ff8a65", "#c6a4ff", "#80cbc4", "#f06292", "#ffd166"];
  let cursor = 0;
  const segments = buildEncounterWheelSegments(entries);
  const finalRoll = rolls[rolls.length - 1];
  const finalEntryId = finalRoll?.visualEntryId || finalRoll?.entryId || "";
  const finalMeta = finalRoll
    ? finalRoll.specialEncounter
      ? `${finalRoll.specialEncounter.triggerName} -> ${finalRoll.specialEncounter.wheelName}`
      : `${finalRoll.category || "land"} / W${Number(finalRoll.weight || 1)}`
    : "";
  const visualEntries = entries.map((entry, index) => {
    const start = cursor;
    const percent = Number(entry.weight || 1) / totalWeight * 100;
    cursor += percent;
    return { ...entry, color: colors[index % colors.length], start, end: cursor, midpoint: start + percent / 2 };
  });
  const gradientStops = visualEntries.map((entry) => `${entry.color} ${entry.start}% ${entry.end}%`).join(", ");
  const canRoll = session.status === "pending" && !isSpinning && rolls.length < max && entries.length > 0;
  els.encounterBody.innerHTML = `
    <div class="encounter-layout">
      <section class="encounter-wheel-section">
        <div class="wheel-visual encounter-wheel-visual${isSpinning ? " spinning" : ""}" style="--wheel-gradient:conic-gradient(${gradientStops})">
          <div class="wheel-pointer"></div>
          <div class="wheel-disc" style="--wheel-rotation:${Number(session.visualRotation || 0)}deg">
            <div class="wheel-face encounter-wheel-face" aria-hidden="true"></div>
          </div>
          <div class="wheel-hub"></div>
        </div>
        <div class="wheel-latest-result encounter-live-result" data-encounter-live-display data-segments="${escapeHtml(JSON.stringify(segments))}" data-final-entry-id="${escapeHtml(finalEntryId)}">
          <span>${isSpinning ? "Passing" : rolls.length ? "Result" : "Ready"}</span>
          <strong>${isSpinning ? "Spinning..." : rolls.length ? escapeHtml(finalRoll.resultDisplayName) : "Ready"}</strong>
          ${!isSpinning && finalMeta ? `<em>${escapeHtml(finalMeta)}</em>` : ""}
        </div>
        <div class="split-actions">
          <button class="buy-button" type="button" data-encounter-roll="${escapeHtml(session.id)}"${canRoll ? "" : " disabled"}>${isSpinning ? "Spinning..." : rolls.length >= max ? "All Rolls Used" : "Roll Encounter"}</button>
          <button class="ghost-button" type="button" data-encounter-done="${escapeHtml(session.id)}">Done</button>
        </div>
        <label class="wheel-skip-toggle encounter-skip-toggle">
          <input type="checkbox" data-encounter-skip-animation ${state.skipWheelAnimation ? "checked" : ""}>
          Skip Animation
        </label>
        <h3>Results</h3>
        <div class="encounter-result-list">
          ${rolls.length ? rolls.map((roll, index) => `
            <article class="encounter-result-card">
              <div class="encounter-result-art">${roll.resultSprite ? `<img src="${escapeHtml(roll.resultSprite)}" alt="${escapeHtml(roll.resultDisplayName)}">` : `<span>${escapeHtml((roll.resultDisplayName || "?").slice(0, 1))}</span>`}</div>
              <div>
                <strong>#${index + 1}: ${escapeHtml(roll.resultDisplayName)}</strong>
                <span>${roll.specialEncounter ? `${escapeHtml(roll.specialEncounter.triggerName)} -> ${escapeHtml(roll.specialEncounter.wheelName)}` : escapeHtml(roll.category || "land")} - ${escapeHtml(pokemonBattleTierSummary(roll.resultDisplayName || roll.resultPokemonName, "Unassigned"))}${roll.rerollHistory?.length ? ` - ${roll.rerollHistory.length} reroll${roll.rerollHistory.length === 1 ? "" : "s"}` : ""}</span>
              </div>
              <div class="encounter-result-actions">
                ${roll.rosterPokemonId ? `<span class="encounter-result-added">Added</span>` : `
                  <button class="buy-button mini-button" type="button" data-encounter-add="${escapeHtml(roll.id)}">Add</button>
                  <button class="ghost-button mini-button" type="button" data-encounter-reroll="${escapeHtml(roll.id)}" data-encounter-reroll-mode="result"${rollFreeRerollReasons[roll.id] || rerollTokenCount ? "" : " disabled"} title="${roll.specialEncounter ? `Spend ${player.name}'s Reroll Token to reroll within the Hyperspace sub-wheel.` : rollFreeRerollReasons[roll.id] ? `Free reroll: ${escapeHtml(rollFreeRerollReasons[roll.id])}` : rerollTokenCount ? `Spend ${player.name}'s Reroll Token on this encounter result.` : `${player.name} needs a Reroll Token.`}">${roll.specialEncounter ? "Owner Reroll Hyperspace" : rollFreeRerollReasons[roll.id] ? "Free Reroll" : `Owner Reroll${rerollTokenCount ? ` (${rerollTokenCount})` : ""}`}</button>
                  ${roll.specialEncounter ? `<button class="ghost-button mini-button danger-lite" type="button" data-encounter-reroll="${escapeHtml(roll.id)}" data-encounter-reroll-mode="encounter"${rollFreeRerollReasons[roll.id] || rerollTokenCount ? "" : " disabled"} title="${rollFreeRerollReasons[roll.id] ? `Free respin: ${escapeHtml(rollFreeRerollReasons[roll.id])}` : rerollTokenCount ? `Spend ${player.name}'s Reroll Token to respin the original Encounter Wheel result.` : `${player.name} needs a Reroll Token.`}">Owner Respin Encounter</button>` : ""}
                `}
              </div>
            </article>
          `).join("") : `<p class="empty-state compact">Encounter results will appear here.</p>`}
        </div>
      </section>
      <section class="encounter-controls">
        <div class="wheel-meta">
          <div><span>Trainer</span><strong>${escapeHtml(player.name)}</strong></div>
          <div><span>Rolls</span><strong>${rolls.length}/${max}</strong></div>
          <div><span>Active Options</span><strong>${entries.length}</strong></div>
          <div><span>Rerolls</span><strong>Allowed</strong></div>
        </div>
        <div class="encounter-toggle-row">
          <label><input type="checkbox" data-encounter-toggle="water" ${session.includeFishing || session.includeSurf ? "checked" : ""}> Include Fishing / Surf</label>
          <label><input type="checkbox" data-encounter-weight-editing ${weightEditing ? "checked" : ""}${rolls.length ? " disabled" : ""}> Edit Weights</label>
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

### Function renderWheelPanel

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
  const { wheel, session, player } = active;
  const rolls = session.rolls || [];
  const cost = Number(wheel.cost?.amount || 0);
  const max = Number(session.maxRolls || wheel.maxRollsPerVisit || Infinity);
  const remaining = Number.isFinite(max) ? Math.max(0, max - rolls.length) : Infinity;
  const canAfford = wheel.cost?.type !== "money" || Number(player.balance || 0) >= cost;
  const isReviewing = session.status === "review";
  const isTrainerClassWheel = wheel.id === "trainerClassWheel";
  const isSlotMachine = wheel.id === "gameCornerGamble";
  const visualSpinActive = isTrainerClassWheel && Number(session.visualSpinUntil || 0) > Date.now();
  if (isTrainerClassWheel && session.visualSpinUntil && !visualSpinActive) {
    session.visualSpinUntil = 0;
    session.visualSpinOutcomeId = "";
  }
  const isSpinning = Boolean(session.isSpinning || visualSpinActive);
  els.wheelSessionDetail.classList.remove("hidden");
  els.wheelSessionList.replaceChildren(...pending.map((entry) => {
    const entryWheel = wheelDefinitionById(entry.wheelId);
    const entryPlayer = state.players.find((candidate) => candidate.id === entry.playerId);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `wheel-session-card${entry.id === session.id ? " active" : ""}${entry.status === "review" ? " review" : ""}`;
    button.dataset.sessionId = entry.id;
    button.innerHTML = `
      <strong>${escapeHtml(entryWheel?.name || "Wheel Session")}</strong>
      <span>${escapeHtml(entryPlayer?.name || "Unknown")} - ${escapeHtml(entry.sourceLabel || "Action")} - ${entry.series} G${entry.gym}</span>
      <em>${entry.status === "review" ? "Review results" : `${(entry.rolls || []).length}/${entry.maxRolls || entryWheel?.maxRollsPerVisit || "--"} spins`}</em>
    `;
    button.addEventListener("click", () => {
      state.selectedWheelSessionId = entry.id;
      saveState();
      renderWheelPanel();
    });
    return button;
  }));
  els.wheelName.textContent = wheel.name;
  els.wheelDescription.textContent = wheel.description;
  els.wheelRollStatus.textContent = isReviewing ? "Results ready" : isSlotMachine ? `${rolls.length} spins completed` : Number.isFinite(max) ? `${rolls.length}/${max} rolls used` : `${rolls.length} rolls`;
  els.wheelMeta.innerHTML = `
    <div><span>Trainer</span><strong>${escapeHtml(player.name)}</strong></div>
    ${session.targetPlayerId ? `<div><span>Target</span><strong>${escapeHtml(state.players.find((candidate) => candidate.id === session.targetPlayerId)?.name || player.name)}</strong></div>` : ""}
    <div><span>Cost</span><strong>${cost ? formatMoney(cost) : "Free"}</strong></div>
    <div><span>Rerollable</span><strong>${wheel.rerollable ? "Yes" : "No"}</strong></div>
    <div><span>Balance</span><strong>${formatMoney(player.balance || 0)}</strong></div>
  `;
  const latest = rolls[rolls.length - 1];
  const totalWeight = wheel.outcomes.reduce((total, outcome) => total + Number(outcome.weight || 0), 0);
  const pointerSegments = wheelOutcomeSegments(wheel);
  const wheelColors = ["#f7c948", "#7cc6fe", "#ff8a65", "#98d973", "#c6a4ff", "#f06292", "#80cbc4", "#ffd166"];
  let cursor = 0;
  const visualOutcomes = wheel.outcomes.map((outcome, index) => {
    const start = cursor;
    const percent = Number(outcome.weight || 0) / totalWeight * 100;
    cursor += percent;
    return {
      ...outcome,
      color: wheelColors[index % wheelColors.length],
      start,
      end: cursor,
      midpoint: start + percent / 2
    };
  });
  const gradientStops = visualOutcomes.map((outcome) => {
    return `${outcome.color} ${outcome.start}% ${outcome.end}%`;
  }).join(", ");
  els.wheelVisual.style.setProperty("--wheel-gradient", `conic-gradient(${gradientStops})`);
  els.wheelVisual.classList.toggle("spinning", isSpinning);
  els.wheelVisual.classList.toggle("slot-machine", isSlotMachine);
  els.wheelVisual.innerHTML = isSlotMachine ? `
    <div class="slot-machine-marquee">RIVAL SLOTS</div>
    <div class="slot-reel-bank"><span>${escapeHtml(latest?.outcomeLabel?.split(" ")[0] || "?")}</span><span>${escapeHtml(latest?.rewardName ? "TICKET" : "LUCK")}</span><span>${escapeHtml(latest?.rewardName ? "WIN" : "SPIN")}</span></div>
    <div class="wheel-disc slot-machine-logic-disc" style="--wheel-rotation:${Number(session.visualRotation || 0)}deg"></div>
    <div class="slot-machine-payline"></div>
  ` : `
    <div class="wheel-pointer"></div>
    <div class="wheel-disc" style="--wheel-rotation:${Number(session.visualRotation || 0)}deg">
      <div class="wheel-face${isTrainerClassWheel ? " trainer-class-wheel-face" : ""}" aria-hidden="true">
        ${isTrainerClassWheel || visualOutcomes.length > 16 ? "" : visualOutcomes.map((outcome) => {
          const angle = outcome.midpoint / 100 * 360;
          const label = outcome.label.replace("Safari Zone", "Safari").replace("Master Ball", "Master").replace("Ultra Ball", "Ultra").replace("Great Ball", "Great");
          return `<span style="--angle:${angle}deg">${escapeHtml(label)}</span>`;
        }).join("")}
      </div>
    </div>
    <div class="wheel-hub"></div>
  `;
  els.wheelOutcomes.classList.toggle("trainer-class-outcomes", isTrainerClassWheel);
  const activeOutcomeId = visualSpinActive ? session.visualSpinOutcomeId : latest?.outcomeId;
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

### Function cancelCurrentGymWheelSessionsForPlayers

```javascript
function cancelCurrentGymWheelSessionsForPlayers(playerIds) {
  const ids = new Set(playerIds);
  (state.wheelSessions || []).forEach((session) => {
    if (ids.has(session.playerId) && session.series === state.series && Number(session.gym) === Number(state.gym) && ["pending", "review"].includes(session.status)) {
      session.status = "cancelled";
    }
  });
  if (state.selectedWheelSessionId && !pendingWheelSessions().some((session) => session.id === state.selectedWheelSessionId)) {
    state.selectedWheelSessionId = "";
    state.wheelDrawerOpen = false;
  }
}
```

### Function honeyEligibleEncounterResults

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

### Function reverseWheelSessionsForActionVisit

```javascript
function reverseWheelSessionsForActionVisit(undoData, player) {
  const gameCornerWheelSessionIds = (state.gameCornerSessions || [])
    .filter((session) => session.id === undoData.gameCornerSessionId || session.actionVisitId === undoData.visitId)
    .map((session) => session.gambleWheelSessionId)
    .filter(Boolean);
  const sessionIds = new Set([
    undoData.wheelSessionId,
    ...gameCornerWheelSessionIds,
    ...(state.wheelSessions || [])
      .filter((session) => session.sourceActionVisitId === undoData.visitId
        || session.actionVisitId === undoData.visitId
        || session.gameCornerSessionId === undoData.gameCornerSessionId)
      .map((session) => session.id)
  ].filter(Boolean));
  if (!sessionIds.size || !player) return [];

  const sessions = (state.wheelSessions || []).filter((session) => sessionIds.has(session.id));
  const rollLedgerIds = new Set();
  const rewardIds = new Set();
  let refundTotal = 0;

  sessions.forEach((session) => {
    (session.rolls || []).forEach((roll) => {
      if (roll.ledgerEntryId) rollLedgerIds.add(roll.ledgerEntryId);
      if (roll.reward?.id) rewardIds.add(roll.reward.id);
      if (roll.rewardId) rewardIds.add(roll.rewardId);
      refundTotal += Number(roll.costPaid ?? roll.cost ?? 0);
    });
    session.status = "undone";
    session.undoneAt = new Date().toISOString();
    session.isSpinning = false;
    session.rollsUndone = true;
  });

  const matchingLedgerEntries = (state.moneyLedger || []).filter((entry) => {
    if (rollLedgerIds.has(entry.id)) return true;
    if (entry.wheelSessionId && sessionIds.has(entry.wheelSessionId)) return true;
    return entry.actionVisitId === undoData.visitId
      && ["game-corner-spin", "wheel-spin"].includes(entry.sourceType);
  });
  if (!refundTotal) {
    refundTotal = matchingLedgerEntries.reduce((total, entry) => total + Math.abs(Number(entry.amount || 0)), 0);
  }
  if (refundTotal) player.balance = Number(player.balance || 0) + refundTotal;

  player.inventory = (player.inventory || []).filter((item) => {
    if (rewardIds.has(item.id)) return false;
    if (item.wheelSessionId && sessionIds.has(item.wheelSessionId)) return false;
    return item.actionVisitId !== undoData.visitId && item.sourceVisitId !== undoData.visitId;
  });

  const ledgerEntryIds = new Set(matchingLedgerEntries.map((entry) => entry.id));
  state.moneyLedger = (state.moneyLedger || []).filter((entry) => !ledgerEntryIds.has(entry.id));

  if (state.selectedWheelSessionId && sessionIds.has(state.selectedWheelSessionId)) {
    const next = pendingWheelSessions().find((session) => !sessionIds.has(session.id));
    state.selectedWheelSessionId = next?.id || "";
    state.wheelDrawerOpen = Boolean(next);
  }
  return [...sessionIds];
}
```

### Function undoEncounterActionVisit

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

## Declaration inventory and source

| Declaration | Refs | Source chars |
|---|---:|---:|
| `normalizeEncounterEntryId` | 2 | 0 |
| `encounterEntry` | 6 | 0 |
| `makeEncounterWheel` | 11 | 0 |
| `starterWheelDefinitions` | 1 | 319 |
| `hyperspaceWheelDefinitions` | 3 | 707 |
| `encounterWheelDefinitions` | 2 | 5144 |
| `ENCOUNTER_POINTER_ANGLE_DEGREES` | 2 | 42 |


### Declaration normalizeEncounterEntryId

_Not found._

### Declaration encounterEntry

_Not found._

### Declaration makeEncounterWheel

_Not found._

### Declaration starterWheelDefinitions

```javascript
const starterWheelDefinitions = Object.freeze({
  "hoenn-gym-1": {
    id: "hoenn-starter-wheel",
    series: "Hoenn",
    gym: 1,
    name: "Hoenn Starter Wheel",
    timing: "Start of Gym 1 Phase",
    trigger: "natural-event",
    entries: ["Treecko", "Mudkip", "Torchic"].map((name) => encounterEntry(name))
  }
});
```

### Declaration hyperspaceWheelDefinitions

```javascript
const hyperspaceWheelDefinitions = Object.freeze({
  "hoenn-hyperspace-hole": {
    id: "hoenn-hyperspace-hole",
    series: "Hoenn",
    name: "Hoenn Hyperspace Hole Wheel",
    entries: [
      "Rayquaza", "Cresselia", "Uxie", "Mesprit", "Azelf", "Landorus", "Thundurus", "Tornadus",
      "Tornadus T", "Landorus T", "Thundurus T", "Dialga", "Palkia", "Giratina", "Groudon",
      "Kyogre", "Jirachi", "Deoxys", "Deoxys A", "Deoxys S", "Deoxys D", "Kyurem", "Reshiram",
      "Zekrom", "Cobalion", "Terrakion", "Virizion", "Regirock", "Regice", "Registeel",
      "Regigigas", "Entei", "Raikou", "Suicune", "Latias", "Latios", "Heatran", "Ho-Oh", "Lugia"
    ].map((name) => encounterEntry(name))
  }
});
```

### Declaration encounterWheelDefinitions

```javascript
const encounterWheelDefinitions = Object.freeze({
  "kanto-gym-1": makeEncounterWheel("Kanto", 1, ["Pidgey", "Shinx", "Oddish", "Magikarp SF", "Tentacool SF"]),
  "hoenn-gym-1": makeEncounterWheel("Hoenn", 1, [
    "Chikorita", "Cyndaquil", "Totodile", "Wurmple", "Zigzagoon", "Poochyena", "Lillipup", "Zorua",
    "Sewaddle", "Turtwig", "Chimchar", "Piplup", "Snivy", "Oshawott", "Tepig", "Wingull",
    "Wailmer SF", "Carvanha SF", "Chatot", "Shellos", "Tentacool SF", "Magikarp SF", "Lotad",
    "Seedot", "Ralts", "Surskit", "Gothita", "Tympole", "Marill", "Corphish SF", "Goldeen SF",
    "Taillow", "Pidove", "Shroomish", "Slakoth", "Cottonee", "Paras", "Phantump", "Omanyte",
    "Kabuto", "Aerodactyl", "Lileep", "Anorith", "Cranidos", "Shieldon", "Tirtouga", "Archen",
    "Tyrunt", "Amaura", "Makuhita", "Whismur", "Nincada", "Skitty", "Hyperspace Hole", "Joltik",
    "Eevee", "Abra", "Geodude"
  ]),
  "hoenn-gym-2": makeEncounterWheel("Hoenn", 2, [
    "Tentacool SF", "Wingull SF", "Wailmer SF", "Magikarp SF", "Zubat", "Makuhita", "Geodude",
    "Abra", "Timburr", "Axew", "Onix", "Aron", "Sableye", "Mawile", "Nosepass", "Electrike",
    "Zigzagoon", "Gulpin", "Plusle", "Minun", "Oddish", "Hyperspace Hole", "Voltorb", "Trubbish",
    "Chatot", "Shellos", "Magnemite", "Poochyena"
  ]),
  "hoenn-gym-3": makeEncounterWheel("Hoenn", 3, [
    "Zigzagoon", "Roselia", "Marill", "Volbeat", "Illumise", "Oddish", "Surskit", "Rattata",
    "Deerling", "Tympole SF", "Corphish SF", "Magikarp SF", "Goldeen SF", "Poochyena", "Seedot",
    "Numel", "Machop", "Ponyta", "Throh", "Sawk", "Tyrogue", "Hyperspace Hole"
  ]),
  "hoenn-gym-4": makeEncounterWheel("Hoenn", 4, [
    "Spinda", "Sandshrew", "Skarmory", "Scraggy", "Klefki", "Bouffalant", "Slugma", "Numel",
    "Koffing", "Torkoal", "Grimer", "Roggenrola", "Diglett", "Tyrogue", "Swablu", "Lombre",
    "Nuzleaf", "Zangoose", "Seviper", "Surskit", "Skorupi", "Misdreavus", "Tympole", "Swablu",
    "Azumarill SF", "Barboach SF", "Magikarp SF", "Goldeen SF", "Geodude", "Zubat", "Lunatone",
    "Solrock", "Deino", "Druddigon", "Clefairy", "Bagon", "Taillow", "Jigglypuff", "Wingull",
    "Pidove", "Wailmer", "Tentacool", "Spoink", "Mankey", "Ponyta", "Wynaut", "Hyperspace Hole"
  ]),
  "hoenn-gym-5": makeEncounterWheel("Hoenn", 5, [
    "Sandshrew", "Trapinch", "Cacnea", "Baltoy", "Sandile", "Dwebble", "Gible", "Marill",
    "Surskit", "Barboach SF", "Magikarp SF", "Goldeen SF", "Geodude", "Frillish SF", "Skrelp SF",
    "Clauncher SF", "Krabby SF", "Tentacool SF", "Wingull SF", "Wailmer SF", "Clamperl SF",
    "Lanturn SF", "Relicanth SF", "Spiritomb", "Hyperspace Hole"
  ]),
  "hoenn-gym-6": makeEncounterWheel("Hoenn", 6, [
    "Linoone", "Manectric", "Pelipper", "Kecleon", "Raticate", "Luxio", "Aipom", "Tentacool SF",
    "Sharpedo SF", "Magikarp SF", "Goldeen SF", "Gloom", "Tropius", "Feebas SF", "Castform",
    "Skitty", "Plusle", "Shuppet", "Duskull", "Marill SF", "Surskit SF", "Corphish SF",
    "Mightyena", "Wailmer SF", "Hyperspace Hole"
  ]),
  "hoenn-gym-7": makeEncounterWheel("Hoenn", 7, [
    "Oddish", "Marill", "Kecleon", "Linoone", "Tropius", "Absol", "Surskit", "Barboach SF",
    "Magikarp SF", "Tentacool SF", "Goldeen SF", "Mightyena", "Seedot", "Golbat", "Shuppet",
    "Pelipper", "Elgyem", "Hypno", "Aipom", "Duskull", "Wailmer SF", "Doduo", "Psyduck",
    "Rhyhorn", "Kakuna", "Pidgeotto", "Buneary", "Heracross", "Donphan", "Pinsir", "Xatu",
    "Wobbuffet", "Pikachu", "Girafarig", "Teddiursa", "Hoothoot", "Pineco", "Houndour",
    "Miltank", "Ledyba", "Sunkern", "Shuckle", "Geodude", "Mareep", "Gligar", "Snubbull",
    "Stantler", "Spinarak", "Quagsire SF", "Octillery SF", "Frillish SF", "Finneon SF",
    "Alomomola SF", "Sharpedo SF", "Meditite", "Vulpix", "Bronzor", "Growlithe", "Chimecho",
    "Staryu", "Electrode", "Torkoal", "Hyperspace Hole", "Lanturn SF", "Clamperl SF",
    "Relicanth SF", "Beldum", "Seel", "Spheal", "Snorunt", "Cubchoo", "Delibird"
  ]),
  "hoenn-gym-8": makeEncounterWheel("Hoenn", 8, [
    "Frillish SF", "Finneon SF", "Alomomola SF", "Tentacool SF", "Pelipper SF", "Wailmer SF",
    "Magikarp SF", "Chinchou SF", "Clamperl SF", "Relicanth SF", "Sharpedo SF", "Luvdisc SF",
    "Corsola SF", "Golbat", "Graveler", "Hyperspace Hole", "Horsea SF", "Claydol", "Ariados",
    "Sableye", "Mawile", "Swablu", "Banette", "Dusclops"
  ]),
  "hoenn-gym-9": makeEncounterWheel("Hoenn", 9, [
    "Tentacool SF", "Pelipper SF", "Luvdisc SF", "Wailmer SF", "Corsola SF", "Magikarp SF",
    "Golbat SF", "Lairon", "Hariyama", "Loudred", "Sableye", "Mawile", "Medicham", "Barboach SF",
    "Goldeen SF", "Mantine SF", "Remoraid SF", "Hyperspace Hole", "Tangela", "Glameow",
    "Sunkern", "Minccino", "Venomoth", "Zebstrika", "Xatu", "Maractus", "Graveler", "Binacle",
    "Persian", "Audino", "Munna", "Ditto", "Darmanitan", "Larvesta", "Porygon", "Forretress",
    "Stantler", "Donphan", "Kricketune", "Rufflet", "Vullaby", "Vulpix", "Girafarig", "Magby",
    "Elekid", "Crustle", "Happiny", "Klink", "Tynamo", "Boldore", "Excadrill", "Onix",
    "Cofagrigus", "Slowpoke", "Unown", "Petilil", "Cherrim"
  ])
});
```

### Declaration ENCOUNTER_POINTER_ANGLE_DEGREES

```javascript
const ENCOUNTER_POINTER_ANGLE_DEGREES = 0;
```

## index.html Encounter UI contexts


### encounterTab

Occurrences: 1

#### Hit 1 — line 1364

```text
  1354 |               <p class="eyebrow">Random Pokemon</p>
  1355 |               <h2>Pokemon Result</h2>
  1356 |             </div>
  1357 |             <button id="closeRandomPokemonPanel" class="ghost-button" type="button">Close</button>
  1358 |           </div>
  1359 |           <div id="randomPokemonSessionList" class="wheel-session-list"></div>
  1360 |           <div id="randomPokemonSessionDetail" class="random-pokemon-detail"></div>
  1361 |         </section>
  1362 |       </aside>
  1363 | 
  1364 |       <button id="encounterTab" class="encounter-tab hidden" type="button" aria-controls="encounterOverlay" aria-expanded="false">Encounter</button>
  1365 |       <section id="encounterOverlay" class="encounter-overlay hidden" aria-label="Encounter Wheel">
  1366 |         <div class="encounter-modal">
  1367 |           <div class="panel-header">
  1368 |             <div>
  1369 |               <p class="eyebrow">Encounter Wheel</p>
  1370 |               <h2 id="encounterTitle">Encounter Wheel</h2>
  1371 |             </div>
  1372 |             <button id="closeEncounterOverlay" class="ghost-button" type="button">Close</button>
  1373 |           </div>
  1374 |           <div id="encounterSessionList" class="wheel-session-list"></div>
```


### encounterOverlay

Occurrences: 2

#### Hit 1 — line 1364

```text
  1354 |               <p class="eyebrow">Random Pokemon</p>
  1355 |               <h2>Pokemon Result</h2>
  1356 |             </div>
  1357 |             <button id="closeRandomPokemonPanel" class="ghost-button" type="button">Close</button>
  1358 |           </div>
  1359 |           <div id="randomPokemonSessionList" class="wheel-session-list"></div>
  1360 |           <div id="randomPokemonSessionDetail" class="random-pokemon-detail"></div>
  1361 |         </section>
  1362 |       </aside>
  1363 | 
  1364 |       <button id="encounterTab" class="encounter-tab hidden" type="button" aria-controls="encounterOverlay" aria-expanded="false">Encounter</button>
  1365 |       <section id="encounterOverlay" class="encounter-overlay hidden" aria-label="Encounter Wheel">
  1366 |         <div class="encounter-modal">
  1367 |           <div class="panel-header">
  1368 |             <div>
  1369 |               <p class="eyebrow">Encounter Wheel</p>
  1370 |               <h2 id="encounterTitle">Encounter Wheel</h2>
  1371 |             </div>
  1372 |             <button id="closeEncounterOverlay" class="ghost-button" type="button">Close</button>
  1373 |           </div>
  1374 |           <div id="encounterSessionList" class="wheel-session-list"></div>
```

#### Hit 2 — line 1365

```text
  1355 |               <h2>Pokemon Result</h2>
  1356 |             </div>
  1357 |             <button id="closeRandomPokemonPanel" class="ghost-button" type="button">Close</button>
  1358 |           </div>
  1359 |           <div id="randomPokemonSessionList" class="wheel-session-list"></div>
  1360 |           <div id="randomPokemonSessionDetail" class="random-pokemon-detail"></div>
  1361 |         </section>
  1362 |       </aside>
  1363 | 
  1364 |       <button id="encounterTab" class="encounter-tab hidden" type="button" aria-controls="encounterOverlay" aria-expanded="false">Encounter</button>
  1365 |       <section id="encounterOverlay" class="encounter-overlay hidden" aria-label="Encounter Wheel">
  1366 |         <div class="encounter-modal">
  1367 |           <div class="panel-header">
  1368 |             <div>
  1369 |               <p class="eyebrow">Encounter Wheel</p>
  1370 |               <h2 id="encounterTitle">Encounter Wheel</h2>
  1371 |             </div>
  1372 |             <button id="closeEncounterOverlay" class="ghost-button" type="button">Close</button>
  1373 |           </div>
  1374 |           <div id="encounterSessionList" class="wheel-session-list"></div>
  1375 |           <div id="encounterBody"></div>
```


### Encounter Wheel

Occurrences: 3

#### Hit 1 — line 1365

```text
  1355 |               <h2>Pokemon Result</h2>
  1356 |             </div>
  1357 |             <button id="closeRandomPokemonPanel" class="ghost-button" type="button">Close</button>
  1358 |           </div>
  1359 |           <div id="randomPokemonSessionList" class="wheel-session-list"></div>
  1360 |           <div id="randomPokemonSessionDetail" class="random-pokemon-detail"></div>
  1361 |         </section>
  1362 |       </aside>
  1363 | 
  1364 |       <button id="encounterTab" class="encounter-tab hidden" type="button" aria-controls="encounterOverlay" aria-expanded="false">Encounter</button>
  1365 |       <section id="encounterOverlay" class="encounter-overlay hidden" aria-label="Encounter Wheel">
  1366 |         <div class="encounter-modal">
  1367 |           <div class="panel-header">
  1368 |             <div>
  1369 |               <p class="eyebrow">Encounter Wheel</p>
  1370 |               <h2 id="encounterTitle">Encounter Wheel</h2>
  1371 |             </div>
  1372 |             <button id="closeEncounterOverlay" class="ghost-button" type="button">Close</button>
  1373 |           </div>
  1374 |           <div id="encounterSessionList" class="wheel-session-list"></div>
  1375 |           <div id="encounterBody"></div>
```

#### Hit 2 — line 1369

```text
  1359 |           <div id="randomPokemonSessionList" class="wheel-session-list"></div>
  1360 |           <div id="randomPokemonSessionDetail" class="random-pokemon-detail"></div>
  1361 |         </section>
  1362 |       </aside>
  1363 | 
  1364 |       <button id="encounterTab" class="encounter-tab hidden" type="button" aria-controls="encounterOverlay" aria-expanded="false">Encounter</button>
  1365 |       <section id="encounterOverlay" class="encounter-overlay hidden" aria-label="Encounter Wheel">
  1366 |         <div class="encounter-modal">
  1367 |           <div class="panel-header">
  1368 |             <div>
  1369 |               <p class="eyebrow">Encounter Wheel</p>
  1370 |               <h2 id="encounterTitle">Encounter Wheel</h2>
  1371 |             </div>
  1372 |             <button id="closeEncounterOverlay" class="ghost-button" type="button">Close</button>
  1373 |           </div>
  1374 |           <div id="encounterSessionList" class="wheel-session-list"></div>
  1375 |           <div id="encounterBody"></div>
  1376 |         </div>
  1377 |       </section>
  1378 |     </main>
  1379 | 
```

#### Hit 3 — line 1370

```text
  1360 |           <div id="randomPokemonSessionDetail" class="random-pokemon-detail"></div>
  1361 |         </section>
  1362 |       </aside>
  1363 | 
  1364 |       <button id="encounterTab" class="encounter-tab hidden" type="button" aria-controls="encounterOverlay" aria-expanded="false">Encounter</button>
  1365 |       <section id="encounterOverlay" class="encounter-overlay hidden" aria-label="Encounter Wheel">
  1366 |         <div class="encounter-modal">
  1367 |           <div class="panel-header">
  1368 |             <div>
  1369 |               <p class="eyebrow">Encounter Wheel</p>
  1370 |               <h2 id="encounterTitle">Encounter Wheel</h2>
  1371 |             </div>
  1372 |             <button id="closeEncounterOverlay" class="ghost-button" type="button">Close</button>
  1373 |           </div>
  1374 |           <div id="encounterSessionList" class="wheel-session-list"></div>
  1375 |           <div id="encounterBody"></div>
  1376 |         </div>
  1377 |       </section>
  1378 |     </main>
  1379 | 
  1380 |     <template id="shopCardTemplate">
```


## styles.css Encounter UI contexts


### .encounter-tab

Occurrences: 2

#### Hit 1 — line 16542

```text
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
```

#### Hit 2 — line 16568

```text
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


### .encounter-overlay

Occurrences: 2

#### Hit 1 — line 16558

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
```

#### Hit 2 — line 16569

```text
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
```


### .encounter-modal

Occurrences: 14

#### Hit 1 — line 16573

```text
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
```

#### Hit 2 — line 16587

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
```

#### Hit 3 — line 16588

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
```

#### Hit 4 — line 16589

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
```

#### Hit 5 — line 16590

```text
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
```

#### Hit 6 — line 16591

```text
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
```

#### Hit 7 — line 16592

```text
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
```

#### Hit 8 — line 16596

```text
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
```

#### Hit 9 — line 16597

```text
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

#### Hit 10 — line 16598

```text
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

#### Hit 11 — line 16599

```text
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

#### Hit 12 — line 16603

```text
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
```

#### Hit 13 — line 16604

```text
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
```

#### Hit 14 — line 16605

```text
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
```


### .encounter-wheel

Occurrences: 3

#### Hit 1 — line 16618

```text
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
```

#### Hit 2 — line 16624

```text
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
```

#### Hit 3 — line 16631

```text
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
```


### .encounter-pointer

Occurrences: 0

