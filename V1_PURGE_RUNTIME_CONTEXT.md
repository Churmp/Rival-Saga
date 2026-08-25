# V1 Purge Runtime Context

Generated from `78999ef8fb73d45165b4f2a86f218241a995af6b` on `audit/purge-v1-runtime`.

This report is temporary purge tooling. It records exact current code boundaries so V1 can be removed surgically without relying on stale line numbers or keyword-wide deletion.

## app.js — version contract and dispatch

### ACTION_PHASE_VERSION_V1

Occurrences shown: 8


#### Hit 1 — line 2399

````text
  2381 |   { id: "barack", name: "Player 1", theme: "emerald" },
  2382 |   { id: "austin", name: "Player 2", theme: "violet" },
  2383 |   { id: "gold", name: "Player 3", theme: "gold" },
  2384 |   { id: "steevee", name: "Player 4", theme: "sapphire" },
  2385 |   { id: "deth", name: "Player 5", theme: "scarlet" }
  2386 | ]);
  2387 | 
  2388 | const placeholderTrainerTitles = Object.freeze([
  2389 |   "",
  2390 |   "Rookie Rival",
  2391 |   "Ace Trainer",
  2392 |   "Gym Breaker",
  2393 |   "Wheel Watcher",
  2394 |   "Token Tactician",
  2395 |   "Saga Veteran"
  2396 | ]);
  2397 | 
  2398 | const CURRENT_RULESET_VERSION = "S3-dev";
  2399 | const ACTION_PHASE_VERSION_V1 = "action-phase-v1-current-series";
  2400 | const ACTION_PHASE_VERSION_V2 = "action-phase-v2-real-series";
  2401 | const DEFAULT_ACTION_PHASE_VERSION = ACTION_PHASE_VERSION_V2;
  2402 | const ACTION_PHASE_VERSION_LABELS = Object.freeze({
  2403 |   [ACTION_PHASE_VERSION_V1]: "Action Phase V1 / Legacy",
  2404 |   [ACTION_PHASE_VERSION_V2]: "Action Phase V2 / Current"
  2405 | });
  2406 | 
  2407 | function normalizeActionPhaseVersion(value) {
  2408 |   if (value === ACTION_PHASE_VERSION_V1) return ACTION_PHASE_VERSION_V1;
  2409 |   return value === ACTION_PHASE_VERSION_V2 ? ACTION_PHASE_VERSION_V2 : DEFAULT_ACTION_PHASE_VERSION;
  2410 | }
  2411 | 
  2412 | function actionPhaseVersionLabel(value) {
  2413 |   return ACTION_PHASE_VERSION_LABELS[normalizeActionPhaseVersion(value)] || ACTION_PHASE_VERSION_LABELS[DEFAULT_ACTION_PHASE_VERSION];
  2414 | }
  2415 | 
  2416 | function createDefaultRuleset() {
  2417 |   return {
````


#### Hit 2 — line 2403

````text
  2385 |   { id: "deth", name: "Player 5", theme: "scarlet" }
  2386 | ]);
  2387 | 
  2388 | const placeholderTrainerTitles = Object.freeze([
  2389 |   "",
  2390 |   "Rookie Rival",
  2391 |   "Ace Trainer",
  2392 |   "Gym Breaker",
  2393 |   "Wheel Watcher",
  2394 |   "Token Tactician",
  2395 |   "Saga Veteran"
  2396 | ]);
  2397 | 
  2398 | const CURRENT_RULESET_VERSION = "S3-dev";
  2399 | const ACTION_PHASE_VERSION_V1 = "action-phase-v1-current-series";
  2400 | const ACTION_PHASE_VERSION_V2 = "action-phase-v2-real-series";
  2401 | const DEFAULT_ACTION_PHASE_VERSION = ACTION_PHASE_VERSION_V2;
  2402 | const ACTION_PHASE_VERSION_LABELS = Object.freeze({
  2403 |   [ACTION_PHASE_VERSION_V1]: "Action Phase V1 / Legacy",
  2404 |   [ACTION_PHASE_VERSION_V2]: "Action Phase V2 / Current"
  2405 | });
  2406 | 
  2407 | function normalizeActionPhaseVersion(value) {
  2408 |   if (value === ACTION_PHASE_VERSION_V1) return ACTION_PHASE_VERSION_V1;
  2409 |   return value === ACTION_PHASE_VERSION_V2 ? ACTION_PHASE_VERSION_V2 : DEFAULT_ACTION_PHASE_VERSION;
  2410 | }
  2411 | 
  2412 | function actionPhaseVersionLabel(value) {
  2413 |   return ACTION_PHASE_VERSION_LABELS[normalizeActionPhaseVersion(value)] || ACTION_PHASE_VERSION_LABELS[DEFAULT_ACTION_PHASE_VERSION];
  2414 | }
  2415 | 
  2416 | function createDefaultRuleset() {
  2417 |   return {
  2418 |     id: "rival-saga-s3-dev",
  2419 |     name: "Rival Saga S3 Development Ruleset",
  2420 |     version: CURRENT_RULESET_VERSION,
  2421 |     schemaVersion: 1,
````


#### Hit 3 — line 2408

````text
  2390 |   "Rookie Rival",
  2391 |   "Ace Trainer",
  2392 |   "Gym Breaker",
  2393 |   "Wheel Watcher",
  2394 |   "Token Tactician",
  2395 |   "Saga Veteran"
  2396 | ]);
  2397 | 
  2398 | const CURRENT_RULESET_VERSION = "S3-dev";
  2399 | const ACTION_PHASE_VERSION_V1 = "action-phase-v1-current-series";
  2400 | const ACTION_PHASE_VERSION_V2 = "action-phase-v2-real-series";
  2401 | const DEFAULT_ACTION_PHASE_VERSION = ACTION_PHASE_VERSION_V2;
  2402 | const ACTION_PHASE_VERSION_LABELS = Object.freeze({
  2403 |   [ACTION_PHASE_VERSION_V1]: "Action Phase V1 / Legacy",
  2404 |   [ACTION_PHASE_VERSION_V2]: "Action Phase V2 / Current"
  2405 | });
  2406 | 
  2407 | function normalizeActionPhaseVersion(value) {
  2408 |   if (value === ACTION_PHASE_VERSION_V1) return ACTION_PHASE_VERSION_V1;
  2409 |   return value === ACTION_PHASE_VERSION_V2 ? ACTION_PHASE_VERSION_V2 : DEFAULT_ACTION_PHASE_VERSION;
  2410 | }
  2411 | 
  2412 | function actionPhaseVersionLabel(value) {
  2413 |   return ACTION_PHASE_VERSION_LABELS[normalizeActionPhaseVersion(value)] || ACTION_PHASE_VERSION_LABELS[DEFAULT_ACTION_PHASE_VERSION];
  2414 | }
  2415 | 
  2416 | function createDefaultRuleset() {
  2417 |   return {
  2418 |     id: "rival-saga-s3-dev",
  2419 |     name: "Rival Saga S3 Development Ruleset",
  2420 |     version: CURRENT_RULESET_VERSION,
  2421 |     schemaVersion: 1,
  2422 |     actionPhaseVersion: DEFAULT_ACTION_PHASE_VERSION,
  2423 |     supportedActionPhaseVersions: [ACTION_PHASE_VERSION_V1, ACTION_PHASE_VERSION_V2],
  2424 |     updateMode: "manual",
  2425 |     contentLibraries: {
  2426 |       tokenArt: {},
````


#### Hit 4 — line 2408

````text
  2390 |   "Rookie Rival",
  2391 |   "Ace Trainer",
  2392 |   "Gym Breaker",
  2393 |   "Wheel Watcher",
  2394 |   "Token Tactician",
  2395 |   "Saga Veteran"
  2396 | ]);
  2397 | 
  2398 | const CURRENT_RULESET_VERSION = "S3-dev";
  2399 | const ACTION_PHASE_VERSION_V1 = "action-phase-v1-current-series";
  2400 | const ACTION_PHASE_VERSION_V2 = "action-phase-v2-real-series";
  2401 | const DEFAULT_ACTION_PHASE_VERSION = ACTION_PHASE_VERSION_V2;
  2402 | const ACTION_PHASE_VERSION_LABELS = Object.freeze({
  2403 |   [ACTION_PHASE_VERSION_V1]: "Action Phase V1 / Legacy",
  2404 |   [ACTION_PHASE_VERSION_V2]: "Action Phase V2 / Current"
  2405 | });
  2406 | 
  2407 | function normalizeActionPhaseVersion(value) {
  2408 |   if (value === ACTION_PHASE_VERSION_V1) return ACTION_PHASE_VERSION_V1;
  2409 |   return value === ACTION_PHASE_VERSION_V2 ? ACTION_PHASE_VERSION_V2 : DEFAULT_ACTION_PHASE_VERSION;
  2410 | }
  2411 | 
  2412 | function actionPhaseVersionLabel(value) {
  2413 |   return ACTION_PHASE_VERSION_LABELS[normalizeActionPhaseVersion(value)] || ACTION_PHASE_VERSION_LABELS[DEFAULT_ACTION_PHASE_VERSION];
  2414 | }
  2415 | 
  2416 | function createDefaultRuleset() {
  2417 |   return {
  2418 |     id: "rival-saga-s3-dev",
  2419 |     name: "Rival Saga S3 Development Ruleset",
  2420 |     version: CURRENT_RULESET_VERSION,
  2421 |     schemaVersion: 1,
  2422 |     actionPhaseVersion: DEFAULT_ACTION_PHASE_VERSION,
  2423 |     supportedActionPhaseVersions: [ACTION_PHASE_VERSION_V1, ACTION_PHASE_VERSION_V2],
  2424 |     updateMode: "manual",
  2425 |     contentLibraries: {
  2426 |       tokenArt: {},
````


#### Hit 5 — line 2423

````text
  2405 | });
  2406 | 
  2407 | function normalizeActionPhaseVersion(value) {
  2408 |   if (value === ACTION_PHASE_VERSION_V1) return ACTION_PHASE_VERSION_V1;
  2409 |   return value === ACTION_PHASE_VERSION_V2 ? ACTION_PHASE_VERSION_V2 : DEFAULT_ACTION_PHASE_VERSION;
  2410 | }
  2411 | 
  2412 | function actionPhaseVersionLabel(value) {
  2413 |   return ACTION_PHASE_VERSION_LABELS[normalizeActionPhaseVersion(value)] || ACTION_PHASE_VERSION_LABELS[DEFAULT_ACTION_PHASE_VERSION];
  2414 | }
  2415 | 
  2416 | function createDefaultRuleset() {
  2417 |   return {
  2418 |     id: "rival-saga-s3-dev",
  2419 |     name: "Rival Saga S3 Development Ruleset",
  2420 |     version: CURRENT_RULESET_VERSION,
  2421 |     schemaVersion: 1,
  2422 |     actionPhaseVersion: DEFAULT_ACTION_PHASE_VERSION,
  2423 |     supportedActionPhaseVersions: [ACTION_PHASE_VERSION_V1, ACTION_PHASE_VERSION_V2],
  2424 |     updateMode: "manual",
  2425 |     contentLibraries: {
  2426 |       tokenArt: {},
  2427 |       tokenCatalog: []
  2428 |     },
  2429 |     editors: {
  2430 |       tokenArt: "active",
  2431 |       tokenDefinitions: "planned",
  2432 |       pokemonIndex: "planned",
  2433 |       trainerClasses: "planned",
  2434 |       perks: "planned",
  2435 |       encounterWheels: "planned"
  2436 |     },
  2437 |     notes: [
  2438 |       "Ruleset/content data is separate from one game's current save state.",
  2439 |       "Action Phase V2 is the current/default Rival Saga ruleset for newly created games.",
  2440 |       "Action Phase V1 is archived/maintenance-only and remains available for explicitly persisted legacy saves.",
  2441 |       "New feature development targets Action Phase V2 exclusively."
````


#### Hit 6 — line 21154

````text
 21136 |       const error = new Error(`Backend load failed (${response.status})`);
 21137 |       error.status = response.status;
 21138 |       throw error;
 21139 |     }
 21140 |     const payload = await response.json();
 21141 |     backendSync.pendingStorageCompaction = Boolean(payload.storageCompacted);
 21142 |     backendSync.version = Number(payload.version || 0);
 21143 |     backendSync.saveRequestedRevision = 0;
 21144 |     backendSync.savePersistedRevision = 0;
 21145 |     backendSync.lastSavedAt = payload.updatedAt || "";
 21146 |     setBackendSaveStatus("saved");
 21147 |     if (!payload.state) {
 21148 |       backendSync.loadStatus = "empty";
 21149 |       backendSync.applyingRemote = true;
 21150 |       state = normalizeState(createCleanInitialState());
 21151 |       state.ruleset.actionPhaseVersion = normalizeActionPhaseVersion(payload.actionPhaseVersion || state.ruleset.actionPhaseVersion);
 21152 |       state.ruleset.supportedActionPhaseVersions = [...new Set([
 21153 |         ...(state.ruleset.supportedActionPhaseVersions || []),
 21154 |         ACTION_PHASE_VERSION_V1,
 21155 |         ACTION_PHASE_VERSION_V2
 21156 |       ].map(normalizeActionPhaseVersion))];
 21157 |       syncLobbyMembersToTrainerSlots(payload.members || [], { force: true });
 21158 |       writeStoredState(state);
 21159 |       backendSync.applyingRemote = false;
 21160 |       if (renderAfter) render();
 21161 |       return false;
 21162 |     }
 21163 |     const localSnapshot = clientLocalStateSnapshot(state);
 21164 |     const localPlayerId = state.activePlayerId;
 21165 |     const previousActivityIds = new Set(openInteractionActivitiesForPlayer(localPlayerId, "open").map((activity) => activity.id));
 21166 |     backendSync.applyingRemote = true;
 21167 |     const normalizedRemoteState = normalizeState(payload.state);
 21168 |     if (payload.actionPhaseVersion) {
 21169 |       normalizedRemoteState.ruleset ||= createDefaultRuleset();
 21170 |       normalizedRemoteState.ruleset.actionPhaseVersion = normalizeActionPhaseVersion(payload.actionPhaseVersion);
 21171 |       normalizedRemoteState.ruleset.supportedActionPhaseVersions = [...new Set([
 21172 |         ...(normalizedRemoteState.ruleset.supportedActionPhaseVersions || []),
````


#### Hit 7 — line 21173

````text
 21155 |         ACTION_PHASE_VERSION_V2
 21156 |       ].map(normalizeActionPhaseVersion))];
 21157 |       syncLobbyMembersToTrainerSlots(payload.members || [], { force: true });
 21158 |       writeStoredState(state);
 21159 |       backendSync.applyingRemote = false;
 21160 |       if (renderAfter) render();
 21161 |       return false;
 21162 |     }
 21163 |     const localSnapshot = clientLocalStateSnapshot(state);
 21164 |     const localPlayerId = state.activePlayerId;
 21165 |     const previousActivityIds = new Set(openInteractionActivitiesForPlayer(localPlayerId, "open").map((activity) => activity.id));
 21166 |     backendSync.applyingRemote = true;
 21167 |     const normalizedRemoteState = normalizeState(payload.state);
 21168 |     if (payload.actionPhaseVersion) {
 21169 |       normalizedRemoteState.ruleset ||= createDefaultRuleset();
 21170 |       normalizedRemoteState.ruleset.actionPhaseVersion = normalizeActionPhaseVersion(payload.actionPhaseVersion);
 21171 |       normalizedRemoteState.ruleset.supportedActionPhaseVersions = [...new Set([
 21172 |         ...(normalizedRemoteState.ruleset.supportedActionPhaseVersions || []),
 21173 |         ACTION_PHASE_VERSION_V1,
 21174 |         ACTION_PHASE_VERSION_V2
 21175 |       ].map(normalizeActionPhaseVersion))];
 21176 |     }
 21177 |     if (localSnapshot.activePlayerId && !(normalizedRemoteState.players || []).some((player) => player.id === localSnapshot.activePlayerId)) {
 21178 |       backendSync.staleTrainerId = localSnapshot.activePlayerId;
 21179 |       delete localSnapshot.activePlayerId;
 21180 |     } else {
 21181 |       backendSync.staleTrainerId = "";
 21182 |     }
 21183 |     state = restoreClientLocalState(normalizedRemoteState, localSnapshot);
 21184 |     const membershipSynced = syncLobbyMembersToTrainerSlots(payload.members || []);
 21185 |     backendSync.pendingMembershipSync = Boolean(backendSync.pendingMembershipSync || membershipSynced);
 21186 |     mirrorTokenArtLibraryToLocal();
 21187 |     hydrateLiveRefereeFromProvisionalDeclaration();
 21188 |     openInteractionActivitiesForPlayer(state.activePlayerId, "open").forEach((activity) => {
 21189 |       if (previousActivityIds.has(activity.id)) return;
 21190 |       if ((state.activityToasts || []).some((toast) => toast.interactionId === activity.id)) return;
 21191 |       createActivityToastFromInteraction(activity);
````


#### Hit 8 — line 22870

````text
 22852 |     source.tokenArtLibrary,
 22853 |     legacyState.tokenArtLibrary,
 22854 |     legacyState.tokenImageOverrides
 22855 |   ];
 22856 |   const tokenArt = tokenArtCandidates.reduce((chosen, candidate) => {
 22857 |     if (Object.keys(chosen).length) return chosen;
 22858 |     return normalizeTokenArtLibrary(candidate || {});
 22859 |   }, {});
 22860 |   const tokenCatalog = normalizeTokenCatalog(sourceLibraries.tokenCatalog || source.tokenCatalog || legacyState.tokenCatalog || []);
 22861 |   return {
 22862 |     ...base,
 22863 |     ...source,
 22864 |     id: String(source.id || base.id),
 22865 |     name: String(source.name || base.name),
 22866 |     version: String(source.version || base.version),
 22867 |     schemaVersion: Number(source.schemaVersion || base.schemaVersion),
 22868 |     actionPhaseVersion: persistedActionPhaseVersion
 22869 |       ? normalizeActionPhaseVersion(persistedActionPhaseVersion)
 22870 |       : ACTION_PHASE_VERSION_V1,
 22871 |     supportedActionPhaseVersions: [...new Set([
 22872 |       ...base.supportedActionPhaseVersions,
 22873 |       ...(Array.isArray(source.supportedActionPhaseVersions) ? source.supportedActionPhaseVersions : [])
 22874 |     ].map(normalizeActionPhaseVersion))],
 22875 |     updateMode: source.updateMode === "automatic" ? "automatic" : "manual",
 22876 |     contentLibraries: {
 22877 |       ...base.contentLibraries,
 22878 |       ...sourceLibraries,
 22879 |       tokenArt,
 22880 |       tokenCatalog
 22881 |     },
 22882 |     editors: {
 22883 |       ...base.editors,
 22884 |       ...(source.editors && typeof source.editors === "object" && !Array.isArray(source.editors) ? source.editors : {})
 22885 |     },
 22886 |     notes: Array.isArray(source.notes) && source.notes.length ? source.notes : base.notes
 22887 |   };
 22888 | }
````

### ACTION_PHASE_VERSION_V2

Occurrences shown: 12+


#### Hit 1 — line 2400

````text
  2382 |   { id: "austin", name: "Player 2", theme: "violet" },
  2383 |   { id: "gold", name: "Player 3", theme: "gold" },
  2384 |   { id: "steevee", name: "Player 4", theme: "sapphire" },
  2385 |   { id: "deth", name: "Player 5", theme: "scarlet" }
  2386 | ]);
  2387 | 
  2388 | const placeholderTrainerTitles = Object.freeze([
  2389 |   "",
  2390 |   "Rookie Rival",
  2391 |   "Ace Trainer",
  2392 |   "Gym Breaker",
  2393 |   "Wheel Watcher",
  2394 |   "Token Tactician",
  2395 |   "Saga Veteran"
  2396 | ]);
  2397 | 
  2398 | const CURRENT_RULESET_VERSION = "S3-dev";
  2399 | const ACTION_PHASE_VERSION_V1 = "action-phase-v1-current-series";
  2400 | const ACTION_PHASE_VERSION_V2 = "action-phase-v2-real-series";
  2401 | const DEFAULT_ACTION_PHASE_VERSION = ACTION_PHASE_VERSION_V2;
  2402 | const ACTION_PHASE_VERSION_LABELS = Object.freeze({
  2403 |   [ACTION_PHASE_VERSION_V1]: "Action Phase V1 / Legacy",
  2404 |   [ACTION_PHASE_VERSION_V2]: "Action Phase V2 / Current"
  2405 | });
  2406 | 
  2407 | function normalizeActionPhaseVersion(value) {
  2408 |   if (value === ACTION_PHASE_VERSION_V1) return ACTION_PHASE_VERSION_V1;
  2409 |   return value === ACTION_PHASE_VERSION_V2 ? ACTION_PHASE_VERSION_V2 : DEFAULT_ACTION_PHASE_VERSION;
  2410 | }
  2411 | 
  2412 | function actionPhaseVersionLabel(value) {
  2413 |   return ACTION_PHASE_VERSION_LABELS[normalizeActionPhaseVersion(value)] || ACTION_PHASE_VERSION_LABELS[DEFAULT_ACTION_PHASE_VERSION];
  2414 | }
  2415 | 
  2416 | function createDefaultRuleset() {
  2417 |   return {
  2418 |     id: "rival-saga-s3-dev",
````


#### Hit 2 — line 2401

````text
  2383 |   { id: "gold", name: "Player 3", theme: "gold" },
  2384 |   { id: "steevee", name: "Player 4", theme: "sapphire" },
  2385 |   { id: "deth", name: "Player 5", theme: "scarlet" }
  2386 | ]);
  2387 | 
  2388 | const placeholderTrainerTitles = Object.freeze([
  2389 |   "",
  2390 |   "Rookie Rival",
  2391 |   "Ace Trainer",
  2392 |   "Gym Breaker",
  2393 |   "Wheel Watcher",
  2394 |   "Token Tactician",
  2395 |   "Saga Veteran"
  2396 | ]);
  2397 | 
  2398 | const CURRENT_RULESET_VERSION = "S3-dev";
  2399 | const ACTION_PHASE_VERSION_V1 = "action-phase-v1-current-series";
  2400 | const ACTION_PHASE_VERSION_V2 = "action-phase-v2-real-series";
  2401 | const DEFAULT_ACTION_PHASE_VERSION = ACTION_PHASE_VERSION_V2;
  2402 | const ACTION_PHASE_VERSION_LABELS = Object.freeze({
  2403 |   [ACTION_PHASE_VERSION_V1]: "Action Phase V1 / Legacy",
  2404 |   [ACTION_PHASE_VERSION_V2]: "Action Phase V2 / Current"
  2405 | });
  2406 | 
  2407 | function normalizeActionPhaseVersion(value) {
  2408 |   if (value === ACTION_PHASE_VERSION_V1) return ACTION_PHASE_VERSION_V1;
  2409 |   return value === ACTION_PHASE_VERSION_V2 ? ACTION_PHASE_VERSION_V2 : DEFAULT_ACTION_PHASE_VERSION;
  2410 | }
  2411 | 
  2412 | function actionPhaseVersionLabel(value) {
  2413 |   return ACTION_PHASE_VERSION_LABELS[normalizeActionPhaseVersion(value)] || ACTION_PHASE_VERSION_LABELS[DEFAULT_ACTION_PHASE_VERSION];
  2414 | }
  2415 | 
  2416 | function createDefaultRuleset() {
  2417 |   return {
  2418 |     id: "rival-saga-s3-dev",
  2419 |     name: "Rival Saga S3 Development Ruleset",
````


#### Hit 3 — line 2404

````text
  2386 | ]);
  2387 | 
  2388 | const placeholderTrainerTitles = Object.freeze([
  2389 |   "",
  2390 |   "Rookie Rival",
  2391 |   "Ace Trainer",
  2392 |   "Gym Breaker",
  2393 |   "Wheel Watcher",
  2394 |   "Token Tactician",
  2395 |   "Saga Veteran"
  2396 | ]);
  2397 | 
  2398 | const CURRENT_RULESET_VERSION = "S3-dev";
  2399 | const ACTION_PHASE_VERSION_V1 = "action-phase-v1-current-series";
  2400 | const ACTION_PHASE_VERSION_V2 = "action-phase-v2-real-series";
  2401 | const DEFAULT_ACTION_PHASE_VERSION = ACTION_PHASE_VERSION_V2;
  2402 | const ACTION_PHASE_VERSION_LABELS = Object.freeze({
  2403 |   [ACTION_PHASE_VERSION_V1]: "Action Phase V1 / Legacy",
  2404 |   [ACTION_PHASE_VERSION_V2]: "Action Phase V2 / Current"
  2405 | });
  2406 | 
  2407 | function normalizeActionPhaseVersion(value) {
  2408 |   if (value === ACTION_PHASE_VERSION_V1) return ACTION_PHASE_VERSION_V1;
  2409 |   return value === ACTION_PHASE_VERSION_V2 ? ACTION_PHASE_VERSION_V2 : DEFAULT_ACTION_PHASE_VERSION;
  2410 | }
  2411 | 
  2412 | function actionPhaseVersionLabel(value) {
  2413 |   return ACTION_PHASE_VERSION_LABELS[normalizeActionPhaseVersion(value)] || ACTION_PHASE_VERSION_LABELS[DEFAULT_ACTION_PHASE_VERSION];
  2414 | }
  2415 | 
  2416 | function createDefaultRuleset() {
  2417 |   return {
  2418 |     id: "rival-saga-s3-dev",
  2419 |     name: "Rival Saga S3 Development Ruleset",
  2420 |     version: CURRENT_RULESET_VERSION,
  2421 |     schemaVersion: 1,
  2422 |     actionPhaseVersion: DEFAULT_ACTION_PHASE_VERSION,
````


#### Hit 4 — line 2409

````text
  2391 |   "Ace Trainer",
  2392 |   "Gym Breaker",
  2393 |   "Wheel Watcher",
  2394 |   "Token Tactician",
  2395 |   "Saga Veteran"
  2396 | ]);
  2397 | 
  2398 | const CURRENT_RULESET_VERSION = "S3-dev";
  2399 | const ACTION_PHASE_VERSION_V1 = "action-phase-v1-current-series";
  2400 | const ACTION_PHASE_VERSION_V2 = "action-phase-v2-real-series";
  2401 | const DEFAULT_ACTION_PHASE_VERSION = ACTION_PHASE_VERSION_V2;
  2402 | const ACTION_PHASE_VERSION_LABELS = Object.freeze({
  2403 |   [ACTION_PHASE_VERSION_V1]: "Action Phase V1 / Legacy",
  2404 |   [ACTION_PHASE_VERSION_V2]: "Action Phase V2 / Current"
  2405 | });
  2406 | 
  2407 | function normalizeActionPhaseVersion(value) {
  2408 |   if (value === ACTION_PHASE_VERSION_V1) return ACTION_PHASE_VERSION_V1;
  2409 |   return value === ACTION_PHASE_VERSION_V2 ? ACTION_PHASE_VERSION_V2 : DEFAULT_ACTION_PHASE_VERSION;
  2410 | }
  2411 | 
  2412 | function actionPhaseVersionLabel(value) {
  2413 |   return ACTION_PHASE_VERSION_LABELS[normalizeActionPhaseVersion(value)] || ACTION_PHASE_VERSION_LABELS[DEFAULT_ACTION_PHASE_VERSION];
  2414 | }
  2415 | 
  2416 | function createDefaultRuleset() {
  2417 |   return {
  2418 |     id: "rival-saga-s3-dev",
  2419 |     name: "Rival Saga S3 Development Ruleset",
  2420 |     version: CURRENT_RULESET_VERSION,
  2421 |     schemaVersion: 1,
  2422 |     actionPhaseVersion: DEFAULT_ACTION_PHASE_VERSION,
  2423 |     supportedActionPhaseVersions: [ACTION_PHASE_VERSION_V1, ACTION_PHASE_VERSION_V2],
  2424 |     updateMode: "manual",
  2425 |     contentLibraries: {
  2426 |       tokenArt: {},
  2427 |       tokenCatalog: []
````


#### Hit 5 — line 2409

````text
  2391 |   "Ace Trainer",
  2392 |   "Gym Breaker",
  2393 |   "Wheel Watcher",
  2394 |   "Token Tactician",
  2395 |   "Saga Veteran"
  2396 | ]);
  2397 | 
  2398 | const CURRENT_RULESET_VERSION = "S3-dev";
  2399 | const ACTION_PHASE_VERSION_V1 = "action-phase-v1-current-series";
  2400 | const ACTION_PHASE_VERSION_V2 = "action-phase-v2-real-series";
  2401 | const DEFAULT_ACTION_PHASE_VERSION = ACTION_PHASE_VERSION_V2;
  2402 | const ACTION_PHASE_VERSION_LABELS = Object.freeze({
  2403 |   [ACTION_PHASE_VERSION_V1]: "Action Phase V1 / Legacy",
  2404 |   [ACTION_PHASE_VERSION_V2]: "Action Phase V2 / Current"
  2405 | });
  2406 | 
  2407 | function normalizeActionPhaseVersion(value) {
  2408 |   if (value === ACTION_PHASE_VERSION_V1) return ACTION_PHASE_VERSION_V1;
  2409 |   return value === ACTION_PHASE_VERSION_V2 ? ACTION_PHASE_VERSION_V2 : DEFAULT_ACTION_PHASE_VERSION;
  2410 | }
  2411 | 
  2412 | function actionPhaseVersionLabel(value) {
  2413 |   return ACTION_PHASE_VERSION_LABELS[normalizeActionPhaseVersion(value)] || ACTION_PHASE_VERSION_LABELS[DEFAULT_ACTION_PHASE_VERSION];
  2414 | }
  2415 | 
  2416 | function createDefaultRuleset() {
  2417 |   return {
  2418 |     id: "rival-saga-s3-dev",
  2419 |     name: "Rival Saga S3 Development Ruleset",
  2420 |     version: CURRENT_RULESET_VERSION,
  2421 |     schemaVersion: 1,
  2422 |     actionPhaseVersion: DEFAULT_ACTION_PHASE_VERSION,
  2423 |     supportedActionPhaseVersions: [ACTION_PHASE_VERSION_V1, ACTION_PHASE_VERSION_V2],
  2424 |     updateMode: "manual",
  2425 |     contentLibraries: {
  2426 |       tokenArt: {},
  2427 |       tokenCatalog: []
````


#### Hit 6 — line 2423

````text
  2405 | });
  2406 | 
  2407 | function normalizeActionPhaseVersion(value) {
  2408 |   if (value === ACTION_PHASE_VERSION_V1) return ACTION_PHASE_VERSION_V1;
  2409 |   return value === ACTION_PHASE_VERSION_V2 ? ACTION_PHASE_VERSION_V2 : DEFAULT_ACTION_PHASE_VERSION;
  2410 | }
  2411 | 
  2412 | function actionPhaseVersionLabel(value) {
  2413 |   return ACTION_PHASE_VERSION_LABELS[normalizeActionPhaseVersion(value)] || ACTION_PHASE_VERSION_LABELS[DEFAULT_ACTION_PHASE_VERSION];
  2414 | }
  2415 | 
  2416 | function createDefaultRuleset() {
  2417 |   return {
  2418 |     id: "rival-saga-s3-dev",
  2419 |     name: "Rival Saga S3 Development Ruleset",
  2420 |     version: CURRENT_RULESET_VERSION,
  2421 |     schemaVersion: 1,
  2422 |     actionPhaseVersion: DEFAULT_ACTION_PHASE_VERSION,
  2423 |     supportedActionPhaseVersions: [ACTION_PHASE_VERSION_V1, ACTION_PHASE_VERSION_V2],
  2424 |     updateMode: "manual",
  2425 |     contentLibraries: {
  2426 |       tokenArt: {},
  2427 |       tokenCatalog: []
  2428 |     },
  2429 |     editors: {
  2430 |       tokenArt: "active",
  2431 |       tokenDefinitions: "planned",
  2432 |       pokemonIndex: "planned",
  2433 |       trainerClasses: "planned",
  2434 |       perks: "planned",
  2435 |       encounterWheels: "planned"
  2436 |     },
  2437 |     notes: [
  2438 |       "Ruleset/content data is separate from one game's current save state.",
  2439 |       "Action Phase V2 is the current/default Rival Saga ruleset for newly created games.",
  2440 |       "Action Phase V1 is archived/maintenance-only and remains available for explicitly persisted legacy saves.",
  2441 |       "New feature development targets Action Phase V2 exclusively."
````


#### Hit 7 — line 21155

````text
 21137 |       error.status = response.status;
 21138 |       throw error;
 21139 |     }
 21140 |     const payload = await response.json();
 21141 |     backendSync.pendingStorageCompaction = Boolean(payload.storageCompacted);
 21142 |     backendSync.version = Number(payload.version || 0);
 21143 |     backendSync.saveRequestedRevision = 0;
 21144 |     backendSync.savePersistedRevision = 0;
 21145 |     backendSync.lastSavedAt = payload.updatedAt || "";
 21146 |     setBackendSaveStatus("saved");
 21147 |     if (!payload.state) {
 21148 |       backendSync.loadStatus = "empty";
 21149 |       backendSync.applyingRemote = true;
 21150 |       state = normalizeState(createCleanInitialState());
 21151 |       state.ruleset.actionPhaseVersion = normalizeActionPhaseVersion(payload.actionPhaseVersion || state.ruleset.actionPhaseVersion);
 21152 |       state.ruleset.supportedActionPhaseVersions = [...new Set([
 21153 |         ...(state.ruleset.supportedActionPhaseVersions || []),
 21154 |         ACTION_PHASE_VERSION_V1,
 21155 |         ACTION_PHASE_VERSION_V2
 21156 |       ].map(normalizeActionPhaseVersion))];
 21157 |       syncLobbyMembersToTrainerSlots(payload.members || [], { force: true });
 21158 |       writeStoredState(state);
 21159 |       backendSync.applyingRemote = false;
 21160 |       if (renderAfter) render();
 21161 |       return false;
 21162 |     }
 21163 |     const localSnapshot = clientLocalStateSnapshot(state);
 21164 |     const localPlayerId = state.activePlayerId;
 21165 |     const previousActivityIds = new Set(openInteractionActivitiesForPlayer(localPlayerId, "open").map((activity) => activity.id));
 21166 |     backendSync.applyingRemote = true;
 21167 |     const normalizedRemoteState = normalizeState(payload.state);
 21168 |     if (payload.actionPhaseVersion) {
 21169 |       normalizedRemoteState.ruleset ||= createDefaultRuleset();
 21170 |       normalizedRemoteState.ruleset.actionPhaseVersion = normalizeActionPhaseVersion(payload.actionPhaseVersion);
 21171 |       normalizedRemoteState.ruleset.supportedActionPhaseVersions = [...new Set([
 21172 |         ...(normalizedRemoteState.ruleset.supportedActionPhaseVersions || []),
 21173 |         ACTION_PHASE_VERSION_V1,
````


#### Hit 8 — line 21174

````text
 21156 |       ].map(normalizeActionPhaseVersion))];
 21157 |       syncLobbyMembersToTrainerSlots(payload.members || [], { force: true });
 21158 |       writeStoredState(state);
 21159 |       backendSync.applyingRemote = false;
 21160 |       if (renderAfter) render();
 21161 |       return false;
 21162 |     }
 21163 |     const localSnapshot = clientLocalStateSnapshot(state);
 21164 |     const localPlayerId = state.activePlayerId;
 21165 |     const previousActivityIds = new Set(openInteractionActivitiesForPlayer(localPlayerId, "open").map((activity) => activity.id));
 21166 |     backendSync.applyingRemote = true;
 21167 |     const normalizedRemoteState = normalizeState(payload.state);
 21168 |     if (payload.actionPhaseVersion) {
 21169 |       normalizedRemoteState.ruleset ||= createDefaultRuleset();
 21170 |       normalizedRemoteState.ruleset.actionPhaseVersion = normalizeActionPhaseVersion(payload.actionPhaseVersion);
 21171 |       normalizedRemoteState.ruleset.supportedActionPhaseVersions = [...new Set([
 21172 |         ...(normalizedRemoteState.ruleset.supportedActionPhaseVersions || []),
 21173 |         ACTION_PHASE_VERSION_V1,
 21174 |         ACTION_PHASE_VERSION_V2
 21175 |       ].map(normalizeActionPhaseVersion))];
 21176 |     }
 21177 |     if (localSnapshot.activePlayerId && !(normalizedRemoteState.players || []).some((player) => player.id === localSnapshot.activePlayerId)) {
 21178 |       backendSync.staleTrainerId = localSnapshot.activePlayerId;
 21179 |       delete localSnapshot.activePlayerId;
 21180 |     } else {
 21181 |       backendSync.staleTrainerId = "";
 21182 |     }
 21183 |     state = restoreClientLocalState(normalizedRemoteState, localSnapshot);
 21184 |     const membershipSynced = syncLobbyMembersToTrainerSlots(payload.members || []);
 21185 |     backendSync.pendingMembershipSync = Boolean(backendSync.pendingMembershipSync || membershipSynced);
 21186 |     mirrorTokenArtLibraryToLocal();
 21187 |     hydrateLiveRefereeFromProvisionalDeclaration();
 21188 |     openInteractionActivitiesForPlayer(state.activePlayerId, "open").forEach((activity) => {
 21189 |       if (previousActivityIds.has(activity.id)) return;
 21190 |       if ((state.activityToasts || []).some((toast) => toast.interactionId === activity.id)) return;
 21191 |       createActivityToastFromInteraction(activity);
 21192 |     });
````


#### Hit 9 — line 43056

````text
 43038 |   } catch (error) {
 43039 |     console.error("Action Phase service failed safely", error);
 43040 |     rollback();
 43041 |     try {
 43042 |       if (destinationCommit?.id) await releaseAuthoritativeActionDestination(destinationCommit, error?.message || "The selected Action destination did not start.");
 43043 |       else if (!error?.skipAuthoritativeReload && !backendStateSaveIsDirty()) await loadBackendState({ renderAfter: false });
 43044 |       render();
 43045 |     } catch (rollbackError) {
 43046 |       console.error("Action Phase rollback render failed", rollbackError);
 43047 |       render();
 43048 |     }
 43049 |     alert(`${error?.message || service.label || location.name} No action was spent.`);
 43050 |   } finally {
 43051 |     actionServiceInProgress = false;
 43052 |   }
 43053 | }
 43054 | 
 43055 | function clearSelectedActionLocation() {
 43056 |   if (activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 43057 |     const workspace = v2RouteWorkspaceState();
 43058 |     if (workspace.screen === "route-detail") {
 43059 |       if (workspace.activeOpportunityId) {
 43060 |         return;
 43061 |       }
 43062 |       workspace.screen = "route-list";
 43063 |       workspace.selectedRouteNumber = 0;
 43064 |     } else if (workspace.screen === "route-list" || workspace.screen === "legacy" || workspace.screen === "result") {
 43065 |       const actionPhase = v2EnsureActionPhase(state.series);
 43066 |       const action = workspace.activeActionId ? v2FindAction(actionPhase, workspace.activeActionId) : null;
 43067 |       if (workspace.screen === "result" && action && action.settlementStatus !== "settled") {
 43068 |         return;
 43069 |       }
 43070 |       workspace.screen = "root";
 43071 |       workspace.selectedActionId = "";
 43072 |       workspace.selectedRouteNumber = 0;
 43073 |       workspace.activeActionId = "";
 43074 |     }
````


#### Hit 10 — line 44324

````text
 44306 |         regionalVariance: {
 44307 |           rulesId: regionalVarianceRules.id,
 44308 |           status: regionalVarianceRules.status,
 44309 |           appliesToPremiumResidents: false
 44310 |         }
 44311 |       },
 44312 |       premiumResidentIds: premiumResidents.map((resident) => resident.residentId),
 44313 |       residents,
 44314 |       publicDiscoveryResidentIds: [],
 44315 |       privateKnowledgeByPlayerId: {},
 44316 |       suppressions: [],
 44317 |       pendingEncounterOpportunities: [],
 44318 |       encounterResults: [],
 44319 |       finalizedAcquisitions: []
 44320 |     });
 44321 |   }
 44322 |   return {
 44323 |     schemaVersion: 1,
 44324 |     actionPhaseVersion: ACTION_PHASE_VERSION_V2,
 44325 |     seriesId,
 44326 |     seed,
 44327 |     revision: 0,
 44328 |     counters: { opportunity: 0, result: 0, suppression: 0, acquisition: 0, temporaryResident: 0 },
 44329 |     duplicatePreferencesByPlayerId: {},
 44330 |     routes
 44331 |   };
 44332 | }
 44333 | 
 44334 | function v2NormalizeRouteEncounterState(routeState, seriesId) {
 44335 |   const next = routeState && typeof routeState === "object" ? routeState : {};
 44336 |   next.schemaVersion = Number(next.schemaVersion || 1);
 44337 |   next.actionPhaseVersion = ACTION_PHASE_VERSION_V2;
 44338 |   next.seriesId = v2Text(next.seriesId, seriesId);
 44339 |   next.seed = v2Text(next.seed, `${currentBackendGameId() || "local"}:${next.seriesId}:route-encounters`);
 44340 |   next.revision = Number(next.revision || 0);
 44341 |   next.duplicatePreferencesByPlayerId = v2NormalizeRouteDuplicatePreferences(next.duplicatePreferencesByPlayerId);
 44342 |   next.counters ||= {};
````


#### Hit 11 — line 44337

````text
 44319 |       finalizedAcquisitions: []
 44320 |     });
 44321 |   }
 44322 |   return {
 44323 |     schemaVersion: 1,
 44324 |     actionPhaseVersion: ACTION_PHASE_VERSION_V2,
 44325 |     seriesId,
 44326 |     seed,
 44327 |     revision: 0,
 44328 |     counters: { opportunity: 0, result: 0, suppression: 0, acquisition: 0, temporaryResident: 0 },
 44329 |     duplicatePreferencesByPlayerId: {},
 44330 |     routes
 44331 |   };
 44332 | }
 44333 | 
 44334 | function v2NormalizeRouteEncounterState(routeState, seriesId) {
 44335 |   const next = routeState && typeof routeState === "object" ? routeState : {};
 44336 |   next.schemaVersion = Number(next.schemaVersion || 1);
 44337 |   next.actionPhaseVersion = ACTION_PHASE_VERSION_V2;
 44338 |   next.seriesId = v2Text(next.seriesId, seriesId);
 44339 |   next.seed = v2Text(next.seed, `${currentBackendGameId() || "local"}:${next.seriesId}:route-encounters`);
 44340 |   next.revision = Number(next.revision || 0);
 44341 |   next.duplicatePreferencesByPlayerId = v2NormalizeRouteDuplicatePreferences(next.duplicatePreferencesByPlayerId);
 44342 |   next.counters ||= {};
 44343 |   next.counters.opportunity = Math.max(Number(next.counters.opportunity || 0), ...(next.routes || []).flatMap((route) => (route.pendingEncounterOpportunities || []).map((entry) => v2CounterFromId(entry.opportunityId))), 0);
 44344 |   next.counters.result = Math.max(Number(next.counters.result || 0), ...(next.routes || []).flatMap((route) => (route.encounterResults || []).map((entry) => v2CounterFromId(entry.resultId))), 0);
 44345 |   next.counters.acquisition = Math.max(Number(next.counters.acquisition || 0), ...(next.routes || []).flatMap((route) => (route.finalizedAcquisitions || []).map((entry) => v2CounterFromId(entry.acquisitionId))), 0);
 44346 |   next.counters.suppression = Number(next.counters.suppression || 0);
 44347 |   next.counters.temporaryResident = Number(next.counters.temporaryResident || 0);
 44348 |   next.routes = Array.isArray(next.routes) ? next.routes : [];
 44349 |   next.routes.forEach((route) => {
 44350 |     route.residents = Array.isArray(route.residents) ? route.residents : [];
 44351 |     const persistedPremiumIds = new Set(Array.isArray(route.premiumResidentIds) ? route.premiumResidentIds : []);
 44352 |     route.residents.forEach((resident) => {
 44353 |       const premium = resident.slotKind === "premium" || resident.premium === true || persistedPremiumIds.has(resident.residentId);
 44354 |       resident.slotKind = premium ? "premium" : "normal";
 44355 |       resident.premium = premium;
````


#### Hit 12 — line 44394

````text
 44376 |   state.v2.routeEncounterBySeriesId ||= {};
 44377 |   const normalizedSeriesId = v2Text(seriesId, "series-v2");
 44378 |   if (!state.v2.routeEncounterBySeriesId[normalizedSeriesId]) {
 44379 |     const seed = `${currentBackendGameId() || "local"}:${normalizedSeriesId}:route-encounters`;
 44380 |     state.v2.routeEncounterBySeriesId[normalizedSeriesId] = v2CreateRouteSeriesState(normalizedSeriesId, seed);
 44381 |     state.v2.activeRouteEncounterSeriesId = normalizedSeriesId;
 44382 |   }
 44383 |   state.v2.routeEncounterBySeriesId[normalizedSeriesId] = v2NormalizeRouteEncounterState(state.v2.routeEncounterBySeriesId[normalizedSeriesId], normalizedSeriesId);
 44384 |   v2RepairRouteEffectOperationsFromRouteState(normalizedSeriesId, state.v2.routeEncounterBySeriesId[normalizedSeriesId]);
 44385 |   return state.v2.routeEncounterBySeriesId[normalizedSeriesId];
 44386 | }
 44387 | 
 44388 | function v2EnsureActionPhase(seriesId = state.series) {
 44389 |   state.v2 ||= {};
 44390 |   state.v2.actionPhaseBySeriesId ||= {};
 44391 |   const normalizedSeriesId = v2Text(seriesId, "series-v2");
 44392 |   const existing = state.v2.actionPhaseBySeriesId[normalizedSeriesId] || {};
 44393 |   existing.schemaVersion = Number(existing.schemaVersion || 1);
 44394 |   existing.actionPhaseVersion = ACTION_PHASE_VERSION_V2;
 44395 |   existing.seriesId = normalizedSeriesId;
 44396 |   existing.counters ||= {};
 44397 |   existing.actions = Array.isArray(existing.actions) ? existing.actions : [];
 44398 |   existing.spends = Array.isArray(existing.spends) ? existing.spends : [];
 44399 |   existing.counters.action = Math.max(Number(existing.counters.action || 0), ...existing.actions.map((entry) => v2CounterFromId(entry.actionId)), 0);
 44400 |   existing.counters.spend = Math.max(Number(existing.counters.spend || 0), ...existing.spends.map((entry) => v2CounterFromId(entry.spendId)), 0);
 44401 |   existing.playerActionLedger = existing.playerActionLedger && typeof existing.playerActionLedger === "object" ? existing.playerActionLedger : {};
 44402 |   state.players.forEach((player) => {
 44403 |     existing.playerActionLedger[player.id] ||= { available: actionPhaseRules.actionsPerPlayer, spentActionIds: [] };
 44404 |     existing.playerActionLedger[player.id].available = Number(existing.playerActionLedger[player.id].available || actionPhaseRules.actionsPerPlayer);
 44405 |     existing.playerActionLedger[player.id].spentActionIds = Array.isArray(existing.playerActionLedger[player.id].spentActionIds)
 44406 |       ? existing.playerActionLedger[player.id].spentActionIds
 44407 |       : [];
 44408 |   });
 44409 |   state.v2.actionPhaseBySeriesId[normalizedSeriesId] = existing;
 44410 |   return existing;
 44411 | }
 44412 | 
````

### function normalizeActionPhaseVersion

Occurrences shown: 1


#### Hit 1 — line 2407

````text
  2389 |   "",
  2390 |   "Rookie Rival",
  2391 |   "Ace Trainer",
  2392 |   "Gym Breaker",
  2393 |   "Wheel Watcher",
  2394 |   "Token Tactician",
  2395 |   "Saga Veteran"
  2396 | ]);
  2397 | 
  2398 | const CURRENT_RULESET_VERSION = "S3-dev";
  2399 | const ACTION_PHASE_VERSION_V1 = "action-phase-v1-current-series";
  2400 | const ACTION_PHASE_VERSION_V2 = "action-phase-v2-real-series";
  2401 | const DEFAULT_ACTION_PHASE_VERSION = ACTION_PHASE_VERSION_V2;
  2402 | const ACTION_PHASE_VERSION_LABELS = Object.freeze({
  2403 |   [ACTION_PHASE_VERSION_V1]: "Action Phase V1 / Legacy",
  2404 |   [ACTION_PHASE_VERSION_V2]: "Action Phase V2 / Current"
  2405 | });
  2406 | 
  2407 | function normalizeActionPhaseVersion(value) {
  2408 |   if (value === ACTION_PHASE_VERSION_V1) return ACTION_PHASE_VERSION_V1;
  2409 |   return value === ACTION_PHASE_VERSION_V2 ? ACTION_PHASE_VERSION_V2 : DEFAULT_ACTION_PHASE_VERSION;
  2410 | }
  2411 | 
  2412 | function actionPhaseVersionLabel(value) {
  2413 |   return ACTION_PHASE_VERSION_LABELS[normalizeActionPhaseVersion(value)] || ACTION_PHASE_VERSION_LABELS[DEFAULT_ACTION_PHASE_VERSION];
  2414 | }
  2415 | 
  2416 | function createDefaultRuleset() {
  2417 |   return {
  2418 |     id: "rival-saga-s3-dev",
  2419 |     name: "Rival Saga S3 Development Ruleset",
  2420 |     version: CURRENT_RULESET_VERSION,
  2421 |     schemaVersion: 1,
  2422 |     actionPhaseVersion: DEFAULT_ACTION_PHASE_VERSION,
  2423 |     supportedActionPhaseVersions: [ACTION_PHASE_VERSION_V1, ACTION_PHASE_VERSION_V2],
  2424 |     updateMode: "manual",
  2425 |     contentLibraries: {
````

### function activeActionPhaseVersion

Occurrences shown: 1


#### Hit 1 — line 43943

````text
 43925 | const V2_TYPE_INJECTION_TIER_ROLLS = Object.freeze([
 43926 |   Object.freeze({ id: "base-or-lower", label: "Route natural tier or lower", weight: 75, offset: 0, baseOrLower: true }),
 43927 |   Object.freeze({ id: "plus-1", label: "+1 tier", weight: 20, offset: 1 }),
 43928 |   Object.freeze({ id: "plus-2", label: "+2 tiers", weight: 5, offset: 2 })
 43929 | ]);
 43930 | const V2_ROUTE_TOKEN_IDS = Object.freeze({
 43931 |   extraEncounter: "extra-encounter-token",
 43932 |   reroll: "reroll-token",
 43933 |   repel: "repel-token",
 43934 |   masterBall: "master-ball-token"
 43935 | });
 43936 | const V2_ROUTE_TOKEN_NAMES = Object.freeze({
 43937 |   [V2_ROUTE_TOKEN_IDS.extraEncounter]: ["extra encounter token", "extra encounter"],
 43938 |   [V2_ROUTE_TOKEN_IDS.reroll]: ["reroll token", "reroll"],
 43939 |   [V2_ROUTE_TOKEN_IDS.repel]: ["repel token", "repel"],
 43940 |   [V2_ROUTE_TOKEN_IDS.masterBall]: ["master ball token", "master ball"]
 43941 | });
 43942 | 
 43943 | function activeActionPhaseVersion() {
 43944 |   return normalizeActionPhaseVersion(state.ruleset?.actionPhaseVersion || state.actionPhaseVersion || DEFAULT_ACTION_PHASE_VERSION);
 43945 | }
 43946 | 
 43947 | function v2Text(value, fallback = "") {
 43948 |   const normalized = String(value ?? "").trim();
 43949 |   return normalized || fallback;
 43950 | }
 43951 | 
 43952 | function v2Slugify(value) {
 43953 |   return v2Text(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
 43954 | }
 43955 | 
 43956 | function v2NormalizeSeriesRegion(value) {
 43957 |   const key = v2Slugify(value);
 43958 |   return V2_SERIES_REGIONS.find((region) => v2Slugify(region) === key) || "";
 43959 | }
 43960 | 
 43961 | function v2ParseGenerationNumber(value) {
````

### supportedActionPhaseVersions

Occurrences shown: 9


#### Hit 1 — line 2423

````text
  2405 | });
  2406 | 
  2407 | function normalizeActionPhaseVersion(value) {
  2408 |   if (value === ACTION_PHASE_VERSION_V1) return ACTION_PHASE_VERSION_V1;
  2409 |   return value === ACTION_PHASE_VERSION_V2 ? ACTION_PHASE_VERSION_V2 : DEFAULT_ACTION_PHASE_VERSION;
  2410 | }
  2411 | 
  2412 | function actionPhaseVersionLabel(value) {
  2413 |   return ACTION_PHASE_VERSION_LABELS[normalizeActionPhaseVersion(value)] || ACTION_PHASE_VERSION_LABELS[DEFAULT_ACTION_PHASE_VERSION];
  2414 | }
  2415 | 
  2416 | function createDefaultRuleset() {
  2417 |   return {
  2418 |     id: "rival-saga-s3-dev",
  2419 |     name: "Rival Saga S3 Development Ruleset",
  2420 |     version: CURRENT_RULESET_VERSION,
  2421 |     schemaVersion: 1,
  2422 |     actionPhaseVersion: DEFAULT_ACTION_PHASE_VERSION,
  2423 |     supportedActionPhaseVersions: [ACTION_PHASE_VERSION_V1, ACTION_PHASE_VERSION_V2],
  2424 |     updateMode: "manual",
  2425 |     contentLibraries: {
  2426 |       tokenArt: {},
  2427 |       tokenCatalog: []
  2428 |     },
  2429 |     editors: {
  2430 |       tokenArt: "active",
  2431 |       tokenDefinitions: "planned",
  2432 |       pokemonIndex: "planned",
  2433 |       trainerClasses: "planned",
  2434 |       perks: "planned",
  2435 |       encounterWheels: "planned"
  2436 |     },
  2437 |     notes: [
  2438 |       "Ruleset/content data is separate from one game's current save state.",
  2439 |       "Action Phase V2 is the current/default Rival Saga ruleset for newly created games.",
  2440 |       "Action Phase V1 is archived/maintenance-only and remains available for explicitly persisted legacy saves.",
  2441 |       "New feature development targets Action Phase V2 exclusively."
````


#### Hit 2 — line 21152

````text
 21134 |     const response = await backendFetch(`/api/games/${encodeURIComponent(backendSync.gameId)}/state`);
 21135 |     if (!response.ok) {
 21136 |       const error = new Error(`Backend load failed (${response.status})`);
 21137 |       error.status = response.status;
 21138 |       throw error;
 21139 |     }
 21140 |     const payload = await response.json();
 21141 |     backendSync.pendingStorageCompaction = Boolean(payload.storageCompacted);
 21142 |     backendSync.version = Number(payload.version || 0);
 21143 |     backendSync.saveRequestedRevision = 0;
 21144 |     backendSync.savePersistedRevision = 0;
 21145 |     backendSync.lastSavedAt = payload.updatedAt || "";
 21146 |     setBackendSaveStatus("saved");
 21147 |     if (!payload.state) {
 21148 |       backendSync.loadStatus = "empty";
 21149 |       backendSync.applyingRemote = true;
 21150 |       state = normalizeState(createCleanInitialState());
 21151 |       state.ruleset.actionPhaseVersion = normalizeActionPhaseVersion(payload.actionPhaseVersion || state.ruleset.actionPhaseVersion);
 21152 |       state.ruleset.supportedActionPhaseVersions = [...new Set([
 21153 |         ...(state.ruleset.supportedActionPhaseVersions || []),
 21154 |         ACTION_PHASE_VERSION_V1,
 21155 |         ACTION_PHASE_VERSION_V2
 21156 |       ].map(normalizeActionPhaseVersion))];
 21157 |       syncLobbyMembersToTrainerSlots(payload.members || [], { force: true });
 21158 |       writeStoredState(state);
 21159 |       backendSync.applyingRemote = false;
 21160 |       if (renderAfter) render();
 21161 |       return false;
 21162 |     }
 21163 |     const localSnapshot = clientLocalStateSnapshot(state);
 21164 |     const localPlayerId = state.activePlayerId;
 21165 |     const previousActivityIds = new Set(openInteractionActivitiesForPlayer(localPlayerId, "open").map((activity) => activity.id));
 21166 |     backendSync.applyingRemote = true;
 21167 |     const normalizedRemoteState = normalizeState(payload.state);
 21168 |     if (payload.actionPhaseVersion) {
 21169 |       normalizedRemoteState.ruleset ||= createDefaultRuleset();
 21170 |       normalizedRemoteState.ruleset.actionPhaseVersion = normalizeActionPhaseVersion(payload.actionPhaseVersion);
````


#### Hit 3 — line 21153

````text
 21135 |     if (!response.ok) {
 21136 |       const error = new Error(`Backend load failed (${response.status})`);
 21137 |       error.status = response.status;
 21138 |       throw error;
 21139 |     }
 21140 |     const payload = await response.json();
 21141 |     backendSync.pendingStorageCompaction = Boolean(payload.storageCompacted);
 21142 |     backendSync.version = Number(payload.version || 0);
 21143 |     backendSync.saveRequestedRevision = 0;
 21144 |     backendSync.savePersistedRevision = 0;
 21145 |     backendSync.lastSavedAt = payload.updatedAt || "";
 21146 |     setBackendSaveStatus("saved");
 21147 |     if (!payload.state) {
 21148 |       backendSync.loadStatus = "empty";
 21149 |       backendSync.applyingRemote = true;
 21150 |       state = normalizeState(createCleanInitialState());
 21151 |       state.ruleset.actionPhaseVersion = normalizeActionPhaseVersion(payload.actionPhaseVersion || state.ruleset.actionPhaseVersion);
 21152 |       state.ruleset.supportedActionPhaseVersions = [...new Set([
 21153 |         ...(state.ruleset.supportedActionPhaseVersions || []),
 21154 |         ACTION_PHASE_VERSION_V1,
 21155 |         ACTION_PHASE_VERSION_V2
 21156 |       ].map(normalizeActionPhaseVersion))];
 21157 |       syncLobbyMembersToTrainerSlots(payload.members || [], { force: true });
 21158 |       writeStoredState(state);
 21159 |       backendSync.applyingRemote = false;
 21160 |       if (renderAfter) render();
 21161 |       return false;
 21162 |     }
 21163 |     const localSnapshot = clientLocalStateSnapshot(state);
 21164 |     const localPlayerId = state.activePlayerId;
 21165 |     const previousActivityIds = new Set(openInteractionActivitiesForPlayer(localPlayerId, "open").map((activity) => activity.id));
 21166 |     backendSync.applyingRemote = true;
 21167 |     const normalizedRemoteState = normalizeState(payload.state);
 21168 |     if (payload.actionPhaseVersion) {
 21169 |       normalizedRemoteState.ruleset ||= createDefaultRuleset();
 21170 |       normalizedRemoteState.ruleset.actionPhaseVersion = normalizeActionPhaseVersion(payload.actionPhaseVersion);
 21171 |       normalizedRemoteState.ruleset.supportedActionPhaseVersions = [...new Set([
````


#### Hit 4 — line 21171

````text
 21153 |         ...(state.ruleset.supportedActionPhaseVersions || []),
 21154 |         ACTION_PHASE_VERSION_V1,
 21155 |         ACTION_PHASE_VERSION_V2
 21156 |       ].map(normalizeActionPhaseVersion))];
 21157 |       syncLobbyMembersToTrainerSlots(payload.members || [], { force: true });
 21158 |       writeStoredState(state);
 21159 |       backendSync.applyingRemote = false;
 21160 |       if (renderAfter) render();
 21161 |       return false;
 21162 |     }
 21163 |     const localSnapshot = clientLocalStateSnapshot(state);
 21164 |     const localPlayerId = state.activePlayerId;
 21165 |     const previousActivityIds = new Set(openInteractionActivitiesForPlayer(localPlayerId, "open").map((activity) => activity.id));
 21166 |     backendSync.applyingRemote = true;
 21167 |     const normalizedRemoteState = normalizeState(payload.state);
 21168 |     if (payload.actionPhaseVersion) {
 21169 |       normalizedRemoteState.ruleset ||= createDefaultRuleset();
 21170 |       normalizedRemoteState.ruleset.actionPhaseVersion = normalizeActionPhaseVersion(payload.actionPhaseVersion);
 21171 |       normalizedRemoteState.ruleset.supportedActionPhaseVersions = [...new Set([
 21172 |         ...(normalizedRemoteState.ruleset.supportedActionPhaseVersions || []),
 21173 |         ACTION_PHASE_VERSION_V1,
 21174 |         ACTION_PHASE_VERSION_V2
 21175 |       ].map(normalizeActionPhaseVersion))];
 21176 |     }
 21177 |     if (localSnapshot.activePlayerId && !(normalizedRemoteState.players || []).some((player) => player.id === localSnapshot.activePlayerId)) {
 21178 |       backendSync.staleTrainerId = localSnapshot.activePlayerId;
 21179 |       delete localSnapshot.activePlayerId;
 21180 |     } else {
 21181 |       backendSync.staleTrainerId = "";
 21182 |     }
 21183 |     state = restoreClientLocalState(normalizedRemoteState, localSnapshot);
 21184 |     const membershipSynced = syncLobbyMembersToTrainerSlots(payload.members || []);
 21185 |     backendSync.pendingMembershipSync = Boolean(backendSync.pendingMembershipSync || membershipSynced);
 21186 |     mirrorTokenArtLibraryToLocal();
 21187 |     hydrateLiveRefereeFromProvisionalDeclaration();
 21188 |     openInteractionActivitiesForPlayer(state.activePlayerId, "open").forEach((activity) => {
 21189 |       if (previousActivityIds.has(activity.id)) return;
````


#### Hit 5 — line 21172

````text
 21154 |         ACTION_PHASE_VERSION_V1,
 21155 |         ACTION_PHASE_VERSION_V2
 21156 |       ].map(normalizeActionPhaseVersion))];
 21157 |       syncLobbyMembersToTrainerSlots(payload.members || [], { force: true });
 21158 |       writeStoredState(state);
 21159 |       backendSync.applyingRemote = false;
 21160 |       if (renderAfter) render();
 21161 |       return false;
 21162 |     }
 21163 |     const localSnapshot = clientLocalStateSnapshot(state);
 21164 |     const localPlayerId = state.activePlayerId;
 21165 |     const previousActivityIds = new Set(openInteractionActivitiesForPlayer(localPlayerId, "open").map((activity) => activity.id));
 21166 |     backendSync.applyingRemote = true;
 21167 |     const normalizedRemoteState = normalizeState(payload.state);
 21168 |     if (payload.actionPhaseVersion) {
 21169 |       normalizedRemoteState.ruleset ||= createDefaultRuleset();
 21170 |       normalizedRemoteState.ruleset.actionPhaseVersion = normalizeActionPhaseVersion(payload.actionPhaseVersion);
 21171 |       normalizedRemoteState.ruleset.supportedActionPhaseVersions = [...new Set([
 21172 |         ...(normalizedRemoteState.ruleset.supportedActionPhaseVersions || []),
 21173 |         ACTION_PHASE_VERSION_V1,
 21174 |         ACTION_PHASE_VERSION_V2
 21175 |       ].map(normalizeActionPhaseVersion))];
 21176 |     }
 21177 |     if (localSnapshot.activePlayerId && !(normalizedRemoteState.players || []).some((player) => player.id === localSnapshot.activePlayerId)) {
 21178 |       backendSync.staleTrainerId = localSnapshot.activePlayerId;
 21179 |       delete localSnapshot.activePlayerId;
 21180 |     } else {
 21181 |       backendSync.staleTrainerId = "";
 21182 |     }
 21183 |     state = restoreClientLocalState(normalizedRemoteState, localSnapshot);
 21184 |     const membershipSynced = syncLobbyMembersToTrainerSlots(payload.members || []);
 21185 |     backendSync.pendingMembershipSync = Boolean(backendSync.pendingMembershipSync || membershipSynced);
 21186 |     mirrorTokenArtLibraryToLocal();
 21187 |     hydrateLiveRefereeFromProvisionalDeclaration();
 21188 |     openInteractionActivitiesForPlayer(state.activePlayerId, "open").forEach((activity) => {
 21189 |       if (previousActivityIds.has(activity.id)) return;
 21190 |       if ((state.activityToasts || []).some((toast) => toast.interactionId === activity.id)) return;
````


#### Hit 6 — line 22871

````text
 22853 |     legacyState.tokenArtLibrary,
 22854 |     legacyState.tokenImageOverrides
 22855 |   ];
 22856 |   const tokenArt = tokenArtCandidates.reduce((chosen, candidate) => {
 22857 |     if (Object.keys(chosen).length) return chosen;
 22858 |     return normalizeTokenArtLibrary(candidate || {});
 22859 |   }, {});
 22860 |   const tokenCatalog = normalizeTokenCatalog(sourceLibraries.tokenCatalog || source.tokenCatalog || legacyState.tokenCatalog || []);
 22861 |   return {
 22862 |     ...base,
 22863 |     ...source,
 22864 |     id: String(source.id || base.id),
 22865 |     name: String(source.name || base.name),
 22866 |     version: String(source.version || base.version),
 22867 |     schemaVersion: Number(source.schemaVersion || base.schemaVersion),
 22868 |     actionPhaseVersion: persistedActionPhaseVersion
 22869 |       ? normalizeActionPhaseVersion(persistedActionPhaseVersion)
 22870 |       : ACTION_PHASE_VERSION_V1,
 22871 |     supportedActionPhaseVersions: [...new Set([
 22872 |       ...base.supportedActionPhaseVersions,
 22873 |       ...(Array.isArray(source.supportedActionPhaseVersions) ? source.supportedActionPhaseVersions : [])
 22874 |     ].map(normalizeActionPhaseVersion))],
 22875 |     updateMode: source.updateMode === "automatic" ? "automatic" : "manual",
 22876 |     contentLibraries: {
 22877 |       ...base.contentLibraries,
 22878 |       ...sourceLibraries,
 22879 |       tokenArt,
 22880 |       tokenCatalog
 22881 |     },
 22882 |     editors: {
 22883 |       ...base.editors,
 22884 |       ...(source.editors && typeof source.editors === "object" && !Array.isArray(source.editors) ? source.editors : {})
 22885 |     },
 22886 |     notes: Array.isArray(source.notes) && source.notes.length ? source.notes : base.notes
 22887 |   };
 22888 | }
 22889 | 
````


#### Hit 7 — line 22872

````text
 22854 |     legacyState.tokenImageOverrides
 22855 |   ];
 22856 |   const tokenArt = tokenArtCandidates.reduce((chosen, candidate) => {
 22857 |     if (Object.keys(chosen).length) return chosen;
 22858 |     return normalizeTokenArtLibrary(candidate || {});
 22859 |   }, {});
 22860 |   const tokenCatalog = normalizeTokenCatalog(sourceLibraries.tokenCatalog || source.tokenCatalog || legacyState.tokenCatalog || []);
 22861 |   return {
 22862 |     ...base,
 22863 |     ...source,
 22864 |     id: String(source.id || base.id),
 22865 |     name: String(source.name || base.name),
 22866 |     version: String(source.version || base.version),
 22867 |     schemaVersion: Number(source.schemaVersion || base.schemaVersion),
 22868 |     actionPhaseVersion: persistedActionPhaseVersion
 22869 |       ? normalizeActionPhaseVersion(persistedActionPhaseVersion)
 22870 |       : ACTION_PHASE_VERSION_V1,
 22871 |     supportedActionPhaseVersions: [...new Set([
 22872 |       ...base.supportedActionPhaseVersions,
 22873 |       ...(Array.isArray(source.supportedActionPhaseVersions) ? source.supportedActionPhaseVersions : [])
 22874 |     ].map(normalizeActionPhaseVersion))],
 22875 |     updateMode: source.updateMode === "automatic" ? "automatic" : "manual",
 22876 |     contentLibraries: {
 22877 |       ...base.contentLibraries,
 22878 |       ...sourceLibraries,
 22879 |       tokenArt,
 22880 |       tokenCatalog
 22881 |     },
 22882 |     editors: {
 22883 |       ...base.editors,
 22884 |       ...(source.editors && typeof source.editors === "object" && !Array.isArray(source.editors) ? source.editors : {})
 22885 |     },
 22886 |     notes: Array.isArray(source.notes) && source.notes.length ? source.notes : base.notes
 22887 |   };
 22888 | }
 22889 | 
 22890 | function ensureRulesetState() {
````


#### Hit 8 — line 22873

````text
 22855 |   ];
 22856 |   const tokenArt = tokenArtCandidates.reduce((chosen, candidate) => {
 22857 |     if (Object.keys(chosen).length) return chosen;
 22858 |     return normalizeTokenArtLibrary(candidate || {});
 22859 |   }, {});
 22860 |   const tokenCatalog = normalizeTokenCatalog(sourceLibraries.tokenCatalog || source.tokenCatalog || legacyState.tokenCatalog || []);
 22861 |   return {
 22862 |     ...base,
 22863 |     ...source,
 22864 |     id: String(source.id || base.id),
 22865 |     name: String(source.name || base.name),
 22866 |     version: String(source.version || base.version),
 22867 |     schemaVersion: Number(source.schemaVersion || base.schemaVersion),
 22868 |     actionPhaseVersion: persistedActionPhaseVersion
 22869 |       ? normalizeActionPhaseVersion(persistedActionPhaseVersion)
 22870 |       : ACTION_PHASE_VERSION_V1,
 22871 |     supportedActionPhaseVersions: [...new Set([
 22872 |       ...base.supportedActionPhaseVersions,
 22873 |       ...(Array.isArray(source.supportedActionPhaseVersions) ? source.supportedActionPhaseVersions : [])
 22874 |     ].map(normalizeActionPhaseVersion))],
 22875 |     updateMode: source.updateMode === "automatic" ? "automatic" : "manual",
 22876 |     contentLibraries: {
 22877 |       ...base.contentLibraries,
 22878 |       ...sourceLibraries,
 22879 |       tokenArt,
 22880 |       tokenCatalog
 22881 |     },
 22882 |     editors: {
 22883 |       ...base.editors,
 22884 |       ...(source.editors && typeof source.editors === "object" && !Array.isArray(source.editors) ? source.editors : {})
 22885 |     },
 22886 |     notes: Array.isArray(source.notes) && source.notes.length ? source.notes : base.notes
 22887 |   };
 22888 | }
 22889 | 
 22890 | function ensureRulesetState() {
 22891 |   state.ruleset = normalizeRuleset(state.ruleset, state);
````


#### Hit 9 — line 22873

````text
 22855 |   ];
 22856 |   const tokenArt = tokenArtCandidates.reduce((chosen, candidate) => {
 22857 |     if (Object.keys(chosen).length) return chosen;
 22858 |     return normalizeTokenArtLibrary(candidate || {});
 22859 |   }, {});
 22860 |   const tokenCatalog = normalizeTokenCatalog(sourceLibraries.tokenCatalog || source.tokenCatalog || legacyState.tokenCatalog || []);
 22861 |   return {
 22862 |     ...base,
 22863 |     ...source,
 22864 |     id: String(source.id || base.id),
 22865 |     name: String(source.name || base.name),
 22866 |     version: String(source.version || base.version),
 22867 |     schemaVersion: Number(source.schemaVersion || base.schemaVersion),
 22868 |     actionPhaseVersion: persistedActionPhaseVersion
 22869 |       ? normalizeActionPhaseVersion(persistedActionPhaseVersion)
 22870 |       : ACTION_PHASE_VERSION_V1,
 22871 |     supportedActionPhaseVersions: [...new Set([
 22872 |       ...base.supportedActionPhaseVersions,
 22873 |       ...(Array.isArray(source.supportedActionPhaseVersions) ? source.supportedActionPhaseVersions : [])
 22874 |     ].map(normalizeActionPhaseVersion))],
 22875 |     updateMode: source.updateMode === "automatic" ? "automatic" : "manual",
 22876 |     contentLibraries: {
 22877 |       ...base.contentLibraries,
 22878 |       ...sourceLibraries,
 22879 |       tokenArt,
 22880 |       tokenCatalog
 22881 |     },
 22882 |     editors: {
 22883 |       ...base.editors,
 22884 |       ...(source.editors && typeof source.editors === "object" && !Array.isArray(source.editors) ? source.editors : {})
 22885 |     },
 22886 |     notes: Array.isArray(source.notes) && source.notes.length ? source.notes : base.notes
 22887 |   };
 22888 | }
 22889 | 
 22890 | function ensureRulesetState() {
 22891 |   state.ruleset = normalizeRuleset(state.ruleset, state);
````

### function renderActionPhase()

Occurrences shown: 1


#### Hit 1 — line 46833

````text
 46815 |     const action = workspace.activeActionId ? v2FindRouteActionOrOperation(actionPhase, seriesId, workspace.activeActionId) : latestAction;
 46816 |     const result = action?.resultId ? v2FindResult(routeState, action.resultId).result : latestResult;
 46817 |     const settled = action?.settlementStatus === "settled";
 46818 |     setActionWorkspaceChrome({
 46819 |       title: settled ? "Route Encounter Settled" : "Encounter Result",
 46820 |       description: settled ? "The encounter has been acquired. You can return to Actions." : "The Action is committed; resolve the result here.",
 46821 |       backLabel: settled ? "Actions" : "Committed",
 46822 |       backDisabled: !settled
 46823 |     });
 46824 |     els.actionLocationBoard.className = "action-location-board v2-route-reveal-stage";
 46825 |     els.actionLocationMeta.className = "action-location-meta v2-route-meta";
 46826 |     els.actionLocationBoard.innerHTML = renderV2RouteResultPanel(action, result, player);
 46827 |     state.routeUiState = normalizeRouteUiState(state.routeUiState);
 46828 |     els.actionLocationMeta.innerHTML = state.routeUiState.lastRouteAcquisitionMessage ? `<p class="v2-route-acquisition-note">${escapeHtml(state.routeUiState.lastRouteAcquisitionMessage)}</p>` : "";
 46829 |   }
 46830 |   applyV2RouteEffectsPosition();
 46831 | }
 46832 | 
 46833 | function renderActionPhase() {
 46834 |   if (activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 46835 |     renderV2RouteActionPhase();
 46836 |     return;
 46837 |   }
 46838 |   els.actionPhaseView?.classList.remove("v2-action-phase-view");
 46839 |   const workspaceEl = els.actionLocationBoard?.closest(".action-workspace");
 46840 |   if (workspaceEl) delete workspaceEl.dataset.v2Screen;
 46841 |   const player = activePlayer();
 46842 |   const gymState = ensureActionPhaseGymState();
 46843 |   const visits = activeActionVisitsForPlayer(player.id);
 46844 |   const used = actionUsedByPlayer(player.id);
 46845 |   const remaining = actionRemainingForPlayer(player.id);
 46846 |   const tracker = ensureActionSeriesTracker(state.series, player.id);
 46847 |   const selectedLocation = actionLocationById(gymState.selectedLocationId);
 46848 |   const activeOperation = currentActionOperation();
 46849 |   const activeOperationLocation = activeOperation?.playerId === player.id
 46850 |     ? actionLocationById(activeOperation.locationId)
 46851 |     : null;
````

### activeActionPhaseVersion() === ACTION_PHASE_VERSION_V1

Occurrences shown: 0

_No occurrences._

### activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2

Occurrences shown: 12+


#### Hit 1 — line 43056

````text
 43038 |   } catch (error) {
 43039 |     console.error("Action Phase service failed safely", error);
 43040 |     rollback();
 43041 |     try {
 43042 |       if (destinationCommit?.id) await releaseAuthoritativeActionDestination(destinationCommit, error?.message || "The selected Action destination did not start.");
 43043 |       else if (!error?.skipAuthoritativeReload && !backendStateSaveIsDirty()) await loadBackendState({ renderAfter: false });
 43044 |       render();
 43045 |     } catch (rollbackError) {
 43046 |       console.error("Action Phase rollback render failed", rollbackError);
 43047 |       render();
 43048 |     }
 43049 |     alert(`${error?.message || service.label || location.name} No action was spent.`);
 43050 |   } finally {
 43051 |     actionServiceInProgress = false;
 43052 |   }
 43053 | }
 43054 | 
 43055 | function clearSelectedActionLocation() {
 43056 |   if (activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 43057 |     const workspace = v2RouteWorkspaceState();
 43058 |     if (workspace.screen === "route-detail") {
 43059 |       if (workspace.activeOpportunityId) {
 43060 |         return;
 43061 |       }
 43062 |       workspace.screen = "route-list";
 43063 |       workspace.selectedRouteNumber = 0;
 43064 |     } else if (workspace.screen === "route-list" || workspace.screen === "legacy" || workspace.screen === "result") {
 43065 |       const actionPhase = v2EnsureActionPhase(state.series);
 43066 |       const action = workspace.activeActionId ? v2FindAction(actionPhase, workspace.activeActionId) : null;
 43067 |       if (workspace.screen === "result" && action && action.settlementStatus !== "settled") {
 43068 |         return;
 43069 |       }
 43070 |       workspace.screen = "root";
 43071 |       workspace.selectedActionId = "";
 43072 |       workspace.selectedRouteNumber = 0;
 43073 |       workspace.activeActionId = "";
 43074 |     }
````


#### Hit 2 — line 46834

````text
 46816 |     const result = action?.resultId ? v2FindResult(routeState, action.resultId).result : latestResult;
 46817 |     const settled = action?.settlementStatus === "settled";
 46818 |     setActionWorkspaceChrome({
 46819 |       title: settled ? "Route Encounter Settled" : "Encounter Result",
 46820 |       description: settled ? "The encounter has been acquired. You can return to Actions." : "The Action is committed; resolve the result here.",
 46821 |       backLabel: settled ? "Actions" : "Committed",
 46822 |       backDisabled: !settled
 46823 |     });
 46824 |     els.actionLocationBoard.className = "action-location-board v2-route-reveal-stage";
 46825 |     els.actionLocationMeta.className = "action-location-meta v2-route-meta";
 46826 |     els.actionLocationBoard.innerHTML = renderV2RouteResultPanel(action, result, player);
 46827 |     state.routeUiState = normalizeRouteUiState(state.routeUiState);
 46828 |     els.actionLocationMeta.innerHTML = state.routeUiState.lastRouteAcquisitionMessage ? `<p class="v2-route-acquisition-note">${escapeHtml(state.routeUiState.lastRouteAcquisitionMessage)}</p>` : "";
 46829 |   }
 46830 |   applyV2RouteEffectsPosition();
 46831 | }
 46832 | 
 46833 | function renderActionPhase() {
 46834 |   if (activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 46835 |     renderV2RouteActionPhase();
 46836 |     return;
 46837 |   }
 46838 |   els.actionPhaseView?.classList.remove("v2-action-phase-view");
 46839 |   const workspaceEl = els.actionLocationBoard?.closest(".action-workspace");
 46840 |   if (workspaceEl) delete workspaceEl.dataset.v2Screen;
 46841 |   const player = activePlayer();
 46842 |   const gymState = ensureActionPhaseGymState();
 46843 |   const visits = activeActionVisitsForPlayer(player.id);
 46844 |   const used = actionUsedByPlayer(player.id);
 46845 |   const remaining = actionRemainingForPlayer(player.id);
 46846 |   const tracker = ensureActionSeriesTracker(state.series, player.id);
 46847 |   const selectedLocation = actionLocationById(gymState.selectedLocationId);
 46848 |   const activeOperation = currentActionOperation();
 46849 |   const activeOperationLocation = activeOperation?.playerId === player.id
 46850 |     ? actionLocationById(activeOperation.locationId)
 46851 |     : null;
 46852 |   const workspaceLocation = selectedLocation || activeOperationLocation;
````


#### Hit 3 — line 63820

````text
 63802 |     setAdminFreeTestingMode(!hostTestingOverrideEnabled());
 63803 |   });
 63804 |   els.actionTurnRail?.addEventListener("click", (event) => {
 63805 |     const playerButton = event.target.closest("[data-action-player-id]");
 63806 |     if (!playerButton || !hostTestingOverrideEnabled()) return;
 63807 |     const playerId = playerButton.dataset.actionPlayerId || "";
 63808 |     if (!switchActivePlayer(playerId, { testingOverride: true })) return;
 63809 |     setTestingToolsState({ controlledPlayerId: playerId });
 63810 |     saveState({ immediate: true });
 63811 |     render();
 63812 |   });
 63813 |   els.actionLocationBoard.addEventListener("pointerdown", (event) => {
 63814 |     const handle = event.target.closest("[data-v2-route-effects-drag-handle]");
 63815 |     if (!handle || !els.actionLocationBoard.contains(handle) || activeActionPhaseVersion() !== ACTION_PHASE_VERSION_V2) return;
 63816 |     startV2RouteEffectsDrag(event);
 63817 |   });
 63818 |   els.actionLocationBoard.addEventListener("click", (event) => {
 63819 |     const routeEnterButton = event.target.closest("[data-v2-route-enter]");
 63820 |     if (routeEnterButton && els.actionLocationBoard.contains(routeEnterButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63821 |       event.preventDefault();
 63822 |       const workspace = v2RouteWorkspaceState();
 63823 |       workspace.screen = "route-list";
 63824 |       workspace.selectedActionId = "encounter";
 63825 |       workspace.selectedRouteNumber = workspace.selectedRouteNumber || 1;
 63826 |       saveState();
 63827 |       render();
 63828 |       focusV2RouteBrowserRoute(workspace.selectedRouteNumber);
 63829 |       return;
 63830 |     }
 63831 |     const routeContinueButton = event.target.closest("[data-v2-route-continue]");
 63832 |     if (routeContinueButton && els.actionLocationBoard.contains(routeContinueButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63833 |       event.preventDefault();
 63834 |       const workspace = v2RouteWorkspaceState();
 63835 |       workspace.screen = "root";
 63836 |       workspace.selectedActionId = "";
 63837 |       workspace.selectedRouteNumber = 0;
 63838 |       workspace.activeActionId = "";
````


#### Hit 4 — line 63832

````text
 63814 |     const handle = event.target.closest("[data-v2-route-effects-drag-handle]");
 63815 |     if (!handle || !els.actionLocationBoard.contains(handle) || activeActionPhaseVersion() !== ACTION_PHASE_VERSION_V2) return;
 63816 |     startV2RouteEffectsDrag(event);
 63817 |   });
 63818 |   els.actionLocationBoard.addEventListener("click", (event) => {
 63819 |     const routeEnterButton = event.target.closest("[data-v2-route-enter]");
 63820 |     if (routeEnterButton && els.actionLocationBoard.contains(routeEnterButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63821 |       event.preventDefault();
 63822 |       const workspace = v2RouteWorkspaceState();
 63823 |       workspace.screen = "route-list";
 63824 |       workspace.selectedActionId = "encounter";
 63825 |       workspace.selectedRouteNumber = workspace.selectedRouteNumber || 1;
 63826 |       saveState();
 63827 |       render();
 63828 |       focusV2RouteBrowserRoute(workspace.selectedRouteNumber);
 63829 |       return;
 63830 |     }
 63831 |     const routeContinueButton = event.target.closest("[data-v2-route-continue]");
 63832 |     if (routeContinueButton && els.actionLocationBoard.contains(routeContinueButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63833 |       event.preventDefault();
 63834 |       const workspace = v2RouteWorkspaceState();
 63835 |       workspace.screen = "root";
 63836 |       workspace.selectedActionId = "";
 63837 |       workspace.selectedRouteNumber = 0;
 63838 |       workspace.activeActionId = "";
 63839 |       saveState();
 63840 |       render();
 63841 |       return;
 63842 |     }
 63843 |     const routeConfirmButton = event.target.closest("[data-v2-route-confirm]");
 63844 |     if (routeConfirmButton && els.actionLocationBoard.contains(routeConfirmButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63845 |       event.preventDefault();
 63846 |       if (!routeConfirmButton.disabled) takeV2RouteAction(Number(routeConfirmButton.dataset.v2RouteConfirm || 0));
 63847 |       return;
 63848 |     }
 63849 |     const routeRerollButton = event.target.closest("[data-v2-route-reroll]");
 63850 |     if (routeRerollButton && els.actionLocationBoard.contains(routeRerollButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
````


#### Hit 5 — line 63844

````text
 63826 |       saveState();
 63827 |       render();
 63828 |       focusV2RouteBrowserRoute(workspace.selectedRouteNumber);
 63829 |       return;
 63830 |     }
 63831 |     const routeContinueButton = event.target.closest("[data-v2-route-continue]");
 63832 |     if (routeContinueButton && els.actionLocationBoard.contains(routeContinueButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63833 |       event.preventDefault();
 63834 |       const workspace = v2RouteWorkspaceState();
 63835 |       workspace.screen = "root";
 63836 |       workspace.selectedActionId = "";
 63837 |       workspace.selectedRouteNumber = 0;
 63838 |       workspace.activeActionId = "";
 63839 |       saveState();
 63840 |       render();
 63841 |       return;
 63842 |     }
 63843 |     const routeConfirmButton = event.target.closest("[data-v2-route-confirm]");
 63844 |     if (routeConfirmButton && els.actionLocationBoard.contains(routeConfirmButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63845 |       event.preventDefault();
 63846 |       if (!routeConfirmButton.disabled) takeV2RouteAction(Number(routeConfirmButton.dataset.v2RouteConfirm || 0));
 63847 |       return;
 63848 |     }
 63849 |     const routeRerollButton = event.target.closest("[data-v2-route-reroll]");
 63850 |     if (routeRerollButton && els.actionLocationBoard.contains(routeRerollButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63851 |       event.preventDefault();
 63852 |       rerollV2RouteAction(routeRerollButton.dataset.v2RouteReroll);
 63853 |       return;
 63854 |     }
 63855 |     const routeRerollTokenButton = event.target.closest("[data-v2-route-reroll-token]");
 63856 |     if (routeRerollTokenButton && els.actionLocationBoard.contains(routeRerollTokenButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63857 |       event.preventDefault();
 63858 |       useV2RouteRerollToken(routeRerollTokenButton.dataset.v2RouteRerollToken, routeRerollTokenButton.dataset.v2TokenId || "");
 63859 |       return;
 63860 |     }
 63861 |     const opportunityDrawButton = event.target.closest("[data-v2-opportunity-draw]");
 63862 |     if (opportunityDrawButton && els.actionLocationBoard.contains(opportunityDrawButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
````


#### Hit 6 — line 63850

````text
 63832 |     if (routeContinueButton && els.actionLocationBoard.contains(routeContinueButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63833 |       event.preventDefault();
 63834 |       const workspace = v2RouteWorkspaceState();
 63835 |       workspace.screen = "root";
 63836 |       workspace.selectedActionId = "";
 63837 |       workspace.selectedRouteNumber = 0;
 63838 |       workspace.activeActionId = "";
 63839 |       saveState();
 63840 |       render();
 63841 |       return;
 63842 |     }
 63843 |     const routeConfirmButton = event.target.closest("[data-v2-route-confirm]");
 63844 |     if (routeConfirmButton && els.actionLocationBoard.contains(routeConfirmButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63845 |       event.preventDefault();
 63846 |       if (!routeConfirmButton.disabled) takeV2RouteAction(Number(routeConfirmButton.dataset.v2RouteConfirm || 0));
 63847 |       return;
 63848 |     }
 63849 |     const routeRerollButton = event.target.closest("[data-v2-route-reroll]");
 63850 |     if (routeRerollButton && els.actionLocationBoard.contains(routeRerollButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63851 |       event.preventDefault();
 63852 |       rerollV2RouteAction(routeRerollButton.dataset.v2RouteReroll);
 63853 |       return;
 63854 |     }
 63855 |     const routeRerollTokenButton = event.target.closest("[data-v2-route-reroll-token]");
 63856 |     if (routeRerollTokenButton && els.actionLocationBoard.contains(routeRerollTokenButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63857 |       event.preventDefault();
 63858 |       useV2RouteRerollToken(routeRerollTokenButton.dataset.v2RouteRerollToken, routeRerollTokenButton.dataset.v2TokenId || "");
 63859 |       return;
 63860 |     }
 63861 |     const opportunityDrawButton = event.target.closest("[data-v2-opportunity-draw]");
 63862 |     if (opportunityDrawButton && els.actionLocationBoard.contains(opportunityDrawButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63863 |       event.preventDefault();
 63864 |       drawV2PendingRouteOpportunity(opportunityDrawButton.dataset.v2OpportunityDraw || "");
 63865 |       return;
 63866 |     }
 63867 |     const railExtraBuyButton = event.target.closest("[data-v2-rail-extra-buy]");
 63868 |     if (railExtraBuyButton && els.actionLocationBoard.contains(railExtraBuyButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
````


#### Hit 7 — line 63856

````text
 63838 |       workspace.activeActionId = "";
 63839 |       saveState();
 63840 |       render();
 63841 |       return;
 63842 |     }
 63843 |     const routeConfirmButton = event.target.closest("[data-v2-route-confirm]");
 63844 |     if (routeConfirmButton && els.actionLocationBoard.contains(routeConfirmButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63845 |       event.preventDefault();
 63846 |       if (!routeConfirmButton.disabled) takeV2RouteAction(Number(routeConfirmButton.dataset.v2RouteConfirm || 0));
 63847 |       return;
 63848 |     }
 63849 |     const routeRerollButton = event.target.closest("[data-v2-route-reroll]");
 63850 |     if (routeRerollButton && els.actionLocationBoard.contains(routeRerollButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63851 |       event.preventDefault();
 63852 |       rerollV2RouteAction(routeRerollButton.dataset.v2RouteReroll);
 63853 |       return;
 63854 |     }
 63855 |     const routeRerollTokenButton = event.target.closest("[data-v2-route-reroll-token]");
 63856 |     if (routeRerollTokenButton && els.actionLocationBoard.contains(routeRerollTokenButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63857 |       event.preventDefault();
 63858 |       useV2RouteRerollToken(routeRerollTokenButton.dataset.v2RouteRerollToken, routeRerollTokenButton.dataset.v2TokenId || "");
 63859 |       return;
 63860 |     }
 63861 |     const opportunityDrawButton = event.target.closest("[data-v2-opportunity-draw]");
 63862 |     if (opportunityDrawButton && els.actionLocationBoard.contains(opportunityDrawButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63863 |       event.preventDefault();
 63864 |       drawV2PendingRouteOpportunity(opportunityDrawButton.dataset.v2OpportunityDraw || "");
 63865 |       return;
 63866 |     }
 63867 |     const railExtraBuyButton = event.target.closest("[data-v2-rail-extra-buy]");
 63868 |     if (railExtraBuyButton && els.actionLocationBoard.contains(railExtraBuyButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63869 |       event.preventDefault();
 63870 |       if (!railExtraBuyButton.disabled) purchaseV2ExtraEncounter();
 63871 |       return;
 63872 |     }
 63873 |     const railExtraUseButton = event.target.closest("[data-v2-rail-extra-use]");
 63874 |     if (railExtraUseButton && els.actionLocationBoard.contains(railExtraUseButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
````


#### Hit 8 — line 63862

````text
 63844 |     if (routeConfirmButton && els.actionLocationBoard.contains(routeConfirmButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63845 |       event.preventDefault();
 63846 |       if (!routeConfirmButton.disabled) takeV2RouteAction(Number(routeConfirmButton.dataset.v2RouteConfirm || 0));
 63847 |       return;
 63848 |     }
 63849 |     const routeRerollButton = event.target.closest("[data-v2-route-reroll]");
 63850 |     if (routeRerollButton && els.actionLocationBoard.contains(routeRerollButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63851 |       event.preventDefault();
 63852 |       rerollV2RouteAction(routeRerollButton.dataset.v2RouteReroll);
 63853 |       return;
 63854 |     }
 63855 |     const routeRerollTokenButton = event.target.closest("[data-v2-route-reroll-token]");
 63856 |     if (routeRerollTokenButton && els.actionLocationBoard.contains(routeRerollTokenButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63857 |       event.preventDefault();
 63858 |       useV2RouteRerollToken(routeRerollTokenButton.dataset.v2RouteRerollToken, routeRerollTokenButton.dataset.v2TokenId || "");
 63859 |       return;
 63860 |     }
 63861 |     const opportunityDrawButton = event.target.closest("[data-v2-opportunity-draw]");
 63862 |     if (opportunityDrawButton && els.actionLocationBoard.contains(opportunityDrawButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63863 |       event.preventDefault();
 63864 |       drawV2PendingRouteOpportunity(opportunityDrawButton.dataset.v2OpportunityDraw || "");
 63865 |       return;
 63866 |     }
 63867 |     const railExtraBuyButton = event.target.closest("[data-v2-rail-extra-buy]");
 63868 |     if (railExtraBuyButton && els.actionLocationBoard.contains(railExtraBuyButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63869 |       event.preventDefault();
 63870 |       if (!railExtraBuyButton.disabled) purchaseV2ExtraEncounter();
 63871 |       return;
 63872 |     }
 63873 |     const railExtraUseButton = event.target.closest("[data-v2-rail-extra-use]");
 63874 |     if (railExtraUseButton && els.actionLocationBoard.contains(railExtraUseButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63875 |       event.preventDefault();
 63876 |       if (!railExtraUseButton.disabled) useV2ExtraEncounter(Number(railExtraUseButton.dataset.v2RailExtraUse || 0), railExtraUseButton.dataset.v2TokenId || "");
 63877 |       return;
 63878 |     }
 63879 |     const railInjectionButton = event.target.closest("[data-v2-rail-injection-apply]");
 63880 |     if (railInjectionButton && els.actionLocationBoard.contains(railInjectionButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
````


#### Hit 9 — line 63868

````text
 63850 |     if (routeRerollButton && els.actionLocationBoard.contains(routeRerollButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63851 |       event.preventDefault();
 63852 |       rerollV2RouteAction(routeRerollButton.dataset.v2RouteReroll);
 63853 |       return;
 63854 |     }
 63855 |     const routeRerollTokenButton = event.target.closest("[data-v2-route-reroll-token]");
 63856 |     if (routeRerollTokenButton && els.actionLocationBoard.contains(routeRerollTokenButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63857 |       event.preventDefault();
 63858 |       useV2RouteRerollToken(routeRerollTokenButton.dataset.v2RouteRerollToken, routeRerollTokenButton.dataset.v2TokenId || "");
 63859 |       return;
 63860 |     }
 63861 |     const opportunityDrawButton = event.target.closest("[data-v2-opportunity-draw]");
 63862 |     if (opportunityDrawButton && els.actionLocationBoard.contains(opportunityDrawButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63863 |       event.preventDefault();
 63864 |       drawV2PendingRouteOpportunity(opportunityDrawButton.dataset.v2OpportunityDraw || "");
 63865 |       return;
 63866 |     }
 63867 |     const railExtraBuyButton = event.target.closest("[data-v2-rail-extra-buy]");
 63868 |     if (railExtraBuyButton && els.actionLocationBoard.contains(railExtraBuyButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63869 |       event.preventDefault();
 63870 |       if (!railExtraBuyButton.disabled) purchaseV2ExtraEncounter();
 63871 |       return;
 63872 |     }
 63873 |     const railExtraUseButton = event.target.closest("[data-v2-rail-extra-use]");
 63874 |     if (railExtraUseButton && els.actionLocationBoard.contains(railExtraUseButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63875 |       event.preventDefault();
 63876 |       if (!railExtraUseButton.disabled) useV2ExtraEncounter(Number(railExtraUseButton.dataset.v2RailExtraUse || 0), railExtraUseButton.dataset.v2TokenId || "");
 63877 |       return;
 63878 |     }
 63879 |     const railInjectionButton = event.target.closest("[data-v2-rail-injection-apply]");
 63880 |     if (railInjectionButton && els.actionLocationBoard.contains(railInjectionButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63881 |       event.preventDefault();
 63882 |       const rail = railInjectionButton.closest("[data-v2-route-encounter-rail]");
 63883 |       const primaryType = rail?.querySelector("[data-v2-rail-injection-primary]")?.value || "";
 63884 |       applyV2TemporaryTypeInjectionEffect(railInjectionButton.dataset.v2RailInjectionApply || "", primaryType, railInjectionButton.dataset.v2RailInjectionActivation || "");
 63885 |       return;
 63886 |     }
````


#### Hit 10 — line 63874

````text
 63856 |     if (routeRerollTokenButton && els.actionLocationBoard.contains(routeRerollTokenButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63857 |       event.preventDefault();
 63858 |       useV2RouteRerollToken(routeRerollTokenButton.dataset.v2RouteRerollToken, routeRerollTokenButton.dataset.v2TokenId || "");
 63859 |       return;
 63860 |     }
 63861 |     const opportunityDrawButton = event.target.closest("[data-v2-opportunity-draw]");
 63862 |     if (opportunityDrawButton && els.actionLocationBoard.contains(opportunityDrawButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63863 |       event.preventDefault();
 63864 |       drawV2PendingRouteOpportunity(opportunityDrawButton.dataset.v2OpportunityDraw || "");
 63865 |       return;
 63866 |     }
 63867 |     const railExtraBuyButton = event.target.closest("[data-v2-rail-extra-buy]");
 63868 |     if (railExtraBuyButton && els.actionLocationBoard.contains(railExtraBuyButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63869 |       event.preventDefault();
 63870 |       if (!railExtraBuyButton.disabled) purchaseV2ExtraEncounter();
 63871 |       return;
 63872 |     }
 63873 |     const railExtraUseButton = event.target.closest("[data-v2-rail-extra-use]");
 63874 |     if (railExtraUseButton && els.actionLocationBoard.contains(railExtraUseButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63875 |       event.preventDefault();
 63876 |       if (!railExtraUseButton.disabled) useV2ExtraEncounter(Number(railExtraUseButton.dataset.v2RailExtraUse || 0), railExtraUseButton.dataset.v2TokenId || "");
 63877 |       return;
 63878 |     }
 63879 |     const railInjectionButton = event.target.closest("[data-v2-rail-injection-apply]");
 63880 |     if (railInjectionButton && els.actionLocationBoard.contains(railInjectionButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63881 |       event.preventDefault();
 63882 |       const rail = railInjectionButton.closest("[data-v2-route-encounter-rail]");
 63883 |       const primaryType = rail?.querySelector("[data-v2-rail-injection-primary]")?.value || "";
 63884 |       applyV2TemporaryTypeInjectionEffect(railInjectionButton.dataset.v2RailInjectionApply || "", primaryType, railInjectionButton.dataset.v2RailInjectionActivation || "");
 63885 |       return;
 63886 |     }
 63887 |     const routeEffectsToggle = event.target.closest("[data-v2-route-effects-toggle]");
 63888 |     if (routeEffectsToggle && els.actionLocationBoard.contains(routeEffectsToggle) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63889 |       event.preventDefault();
 63890 |       const uiState = v2RouteEffectsUiState();
 63891 |       uiState.routeEffectsOpen = !uiState.routeEffectsOpen;
 63892 |       saveClientUiState();
````


#### Hit 11 — line 63880

````text
 63862 |     if (opportunityDrawButton && els.actionLocationBoard.contains(opportunityDrawButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63863 |       event.preventDefault();
 63864 |       drawV2PendingRouteOpportunity(opportunityDrawButton.dataset.v2OpportunityDraw || "");
 63865 |       return;
 63866 |     }
 63867 |     const railExtraBuyButton = event.target.closest("[data-v2-rail-extra-buy]");
 63868 |     if (railExtraBuyButton && els.actionLocationBoard.contains(railExtraBuyButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63869 |       event.preventDefault();
 63870 |       if (!railExtraBuyButton.disabled) purchaseV2ExtraEncounter();
 63871 |       return;
 63872 |     }
 63873 |     const railExtraUseButton = event.target.closest("[data-v2-rail-extra-use]");
 63874 |     if (railExtraUseButton && els.actionLocationBoard.contains(railExtraUseButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63875 |       event.preventDefault();
 63876 |       if (!railExtraUseButton.disabled) useV2ExtraEncounter(Number(railExtraUseButton.dataset.v2RailExtraUse || 0), railExtraUseButton.dataset.v2TokenId || "");
 63877 |       return;
 63878 |     }
 63879 |     const railInjectionButton = event.target.closest("[data-v2-rail-injection-apply]");
 63880 |     if (railInjectionButton && els.actionLocationBoard.contains(railInjectionButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63881 |       event.preventDefault();
 63882 |       const rail = railInjectionButton.closest("[data-v2-route-encounter-rail]");
 63883 |       const primaryType = rail?.querySelector("[data-v2-rail-injection-primary]")?.value || "";
 63884 |       applyV2TemporaryTypeInjectionEffect(railInjectionButton.dataset.v2RailInjectionApply || "", primaryType, railInjectionButton.dataset.v2RailInjectionActivation || "");
 63885 |       return;
 63886 |     }
 63887 |     const routeEffectsToggle = event.target.closest("[data-v2-route-effects-toggle]");
 63888 |     if (routeEffectsToggle && els.actionLocationBoard.contains(routeEffectsToggle) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63889 |       event.preventDefault();
 63890 |       const uiState = v2RouteEffectsUiState();
 63891 |       uiState.routeEffectsOpen = !uiState.routeEffectsOpen;
 63892 |       saveClientUiState();
 63893 |       render();
 63894 |       return;
 63895 |     }
 63896 |     const routeEffectsClose = event.target.closest("[data-v2-route-effects-close]");
 63897 |     if (routeEffectsClose && els.actionLocationBoard.contains(routeEffectsClose) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63898 |       event.preventDefault();
````


#### Hit 12 — line 63888

````text
 63870 |       if (!railExtraBuyButton.disabled) purchaseV2ExtraEncounter();
 63871 |       return;
 63872 |     }
 63873 |     const railExtraUseButton = event.target.closest("[data-v2-rail-extra-use]");
 63874 |     if (railExtraUseButton && els.actionLocationBoard.contains(railExtraUseButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63875 |       event.preventDefault();
 63876 |       if (!railExtraUseButton.disabled) useV2ExtraEncounter(Number(railExtraUseButton.dataset.v2RailExtraUse || 0), railExtraUseButton.dataset.v2TokenId || "");
 63877 |       return;
 63878 |     }
 63879 |     const railInjectionButton = event.target.closest("[data-v2-rail-injection-apply]");
 63880 |     if (railInjectionButton && els.actionLocationBoard.contains(railInjectionButton) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63881 |       event.preventDefault();
 63882 |       const rail = railInjectionButton.closest("[data-v2-route-encounter-rail]");
 63883 |       const primaryType = rail?.querySelector("[data-v2-rail-injection-primary]")?.value || "";
 63884 |       applyV2TemporaryTypeInjectionEffect(railInjectionButton.dataset.v2RailInjectionApply || "", primaryType, railInjectionButton.dataset.v2RailInjectionActivation || "");
 63885 |       return;
 63886 |     }
 63887 |     const routeEffectsToggle = event.target.closest("[data-v2-route-effects-toggle]");
 63888 |     if (routeEffectsToggle && els.actionLocationBoard.contains(routeEffectsToggle) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63889 |       event.preventDefault();
 63890 |       const uiState = v2RouteEffectsUiState();
 63891 |       uiState.routeEffectsOpen = !uiState.routeEffectsOpen;
 63892 |       saveClientUiState();
 63893 |       render();
 63894 |       return;
 63895 |     }
 63896 |     const routeEffectsClose = event.target.closest("[data-v2-route-effects-close]");
 63897 |     if (routeEffectsClose && els.actionLocationBoard.contains(routeEffectsClose) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
 63898 |       event.preventDefault();
 63899 |       const uiState = v2RouteEffectsUiState();
 63900 |       uiState.routeEffectsOpen = false;
 63901 |       saveClientUiState();
 63902 |       render();
 63903 |       return;
 63904 |     }
 63905 |     const routeEffectToggle = event.target.closest("[data-v2-route-effect-toggle]");
 63906 |     if (routeEffectToggle && els.actionLocationBoard.contains(routeEffectToggle) && activeActionPhaseVersion() === ACTION_PHASE_VERSION_V2) {
````


## app.js — retired encounter domains

### hiddenGrottoSessions

Occurrences shown: 10


#### Hit 1 — line 2616

````text
  2602 |     pendingBattle: { player1Id: "", player2Id: "" },
  2603 |     battleLogView: { series: "Kanto", gym: 1 },
  2604 |     battleTeams: {},
  2605 |     battleRevealGrants: [],
  2606 |     phaseState: {},
  2607 |     currentPhase: "start",
  2608 |     shopLevelTimingVersion: SHOP_LEVEL_TIMING_VERSION,
  2609 |     actionPhaseState: { selections: {}, seriesTrackers: {} },
  2610 |     gymResults: [],
  2611 |     seriesChampions: {},
  2612 |     gameCornerSessions: [],
  2613 |     gameCornerUnlocks: [],
  2614 |     breederDeposits: [],
  2615 |     dragonsDenSessions: [],
  2616 |     hiddenGrottoSessions: [],
  2617 |     silphCoSessions: [],
  2618 |     bulletinBoardSessions: [],
  2619 |     graveyardSessions: [],
  2620 |     departmentStoreVisits: [],
  2621 |     graveyardTokenOwnerFilter: "",
  2622 |     pcSessions: [],
  2623 |     rangerBaseSessions: [],
  2624 |     pokemonCenterSessions: [],
  2625 |     lingeringStatuses: [],
  2626 |     tokenActivations: [],
  2627 |     tokenConsumptions: [],
  2628 |     moneyLedger: [],
  2629 |     series: "Kanto",
  2630 |     gym: 1,
````


#### Hit 2 — line 22215

````text
 22201 |     ? nextState.liveRefereeLayoutPreference
 22202 |     : "auto";
 22203 |   nextState.liveRefereeDensityPreference = nextState.liveRefereeDensityPreference === "compact" ? "compact" : "comfortable";
 22204 |   nextState.liveRefereeUiScale = [0.9, 1, 1.1].includes(Number(nextState.liveRefereeUiScale)) ? Number(nextState.liveRefereeUiScale) : 1;
 22205 |   nextState.liveRefereeMotionPreference = nextState.liveRefereeMotionPreference === "reduced" ? "reduced" : "full";
 22206 |   nextState.activityToasts ||= [];
 22207 |   nextState.liveTable = normalizeLiveTableState(nextState.liveTable || {});
 22208 |   const toastCutoff = Date.now() - 30000;
 22209 |   nextState.activityToasts = nextState.activityToasts
 22210 |     .filter((toast) => new Date(toast.createdAt || 0).getTime() >= toastCutoff)
 22211 |     .slice(0, 5);
 22212 |   nextState.gameCornerSessions ||= [];
 22213 |   nextState.gameCornerUnlocks ||= [];
 22214 |   nextState.dragonsDenSessions ||= [];
 22215 |   nextState.hiddenGrottoSessions ||= [];
 22216 |   nextState.hiddenGrottoSessions.forEach((session) => {
 22217 |     session.status = ["type-choice", "pokemon-choice", "completed", "undone"].includes(session.status) ? session.status : "type-choice";
 22218 |     session.rolledTypes ||= [];
 22219 |     session.rolledPokemon ||= [];
 22220 |   });
 22221 |   nextState.silphCoSessions ||= [];
 22222 |   nextState.silphCoSessions.forEach((session) => {
 22223 |     session.status = ["pending-choice", "completed", "undone"].includes(session.status) ? session.status : "pending-choice";
 22224 |     session.rolledMoves ||= [];
 22225 |     session.rolledAbilities ||= [];
 22226 |     session.rerollHistory ||= [];
 22227 |   });
 22228 |   nextState.bulletinBoardSessions ||= [];
 22229 |   nextState.bulletinBoardSessions.forEach((session) => {
````


#### Hit 3 — line 22216

````text
 22202 |     : "auto";
 22203 |   nextState.liveRefereeDensityPreference = nextState.liveRefereeDensityPreference === "compact" ? "compact" : "comfortable";
 22204 |   nextState.liveRefereeUiScale = [0.9, 1, 1.1].includes(Number(nextState.liveRefereeUiScale)) ? Number(nextState.liveRefereeUiScale) : 1;
 22205 |   nextState.liveRefereeMotionPreference = nextState.liveRefereeMotionPreference === "reduced" ? "reduced" : "full";
 22206 |   nextState.activityToasts ||= [];
 22207 |   nextState.liveTable = normalizeLiveTableState(nextState.liveTable || {});
 22208 |   const toastCutoff = Date.now() - 30000;
 22209 |   nextState.activityToasts = nextState.activityToasts
 22210 |     .filter((toast) => new Date(toast.createdAt || 0).getTime() >= toastCutoff)
 22211 |     .slice(0, 5);
 22212 |   nextState.gameCornerSessions ||= [];
 22213 |   nextState.gameCornerUnlocks ||= [];
 22214 |   nextState.dragonsDenSessions ||= [];
 22215 |   nextState.hiddenGrottoSessions ||= [];
 22216 |   nextState.hiddenGrottoSessions.forEach((session) => {
 22217 |     session.status = ["type-choice", "pokemon-choice", "completed", "undone"].includes(session.status) ? session.status : "type-choice";
 22218 |     session.rolledTypes ||= [];
 22219 |     session.rolledPokemon ||= [];
 22220 |   });
 22221 |   nextState.silphCoSessions ||= [];
 22222 |   nextState.silphCoSessions.forEach((session) => {
 22223 |     session.status = ["pending-choice", "completed", "undone"].includes(session.status) ? session.status : "pending-choice";
 22224 |     session.rolledMoves ||= [];
 22225 |     session.rolledAbilities ||= [];
 22226 |     session.rerollHistory ||= [];
 22227 |   });
 22228 |   nextState.bulletinBoardSessions ||= [];
 22229 |   nextState.bulletinBoardSessions.forEach((session) => {
 22230 |     session.quests ||= [];
````


#### Hit 4 — line 34905

````text
 34891 | function linkActionOperation(visitId, { featureType = "", featureSessionId = "", pendingSituationId = "" } = {}) {
 34892 |   const operation = actionOperationForVisit(visitId);
 34893 |   if (!operation) return null;
 34894 |   if (featureType) operation.linkedFeatureType = featureType;
 34895 |   if (featureSessionId) operation.linkedFeatureSessionId = featureSessionId;
 34896 |   if (pendingSituationId) operation.linkedPendingSituationId = pendingSituationId;
 34897 |   return operation;
 34898 | }
 34899 | 
 34900 | function linkedActionOperationSession(operation) {
 34901 |   if (!operation?.linkedFeatureSessionId) return null;
 34902 |   const collections = {
 34903 |     wheel: state.wheelSessions,
 34904 |     encounter: state.encounterSessions,
 34905 |     "hidden-grotto": state.hiddenGrottoSessions,
 34906 |     "silph-co": state.silphCoSessions,
 34907 |     "bulletin-board": state.bulletinBoardSessions,
 34908 |     breeder: null,
 34909 |     "game-corner": state.gameCornerSessions,
 34910 |     "pokemon-center": state.pokemonCenterSessions,
 34911 |     graveyard: state.graveyardSessions,
 34912 |     "department-store": state.departmentStoreVisits,
 34913 |     pc: state.pcSessions
 34914 |   };
 34915 |   return (collections[operation.linkedFeatureType] || []).find((session) => session.id === operation.linkedFeatureSessionId) || null;
 34916 | }
 34917 | 
 34918 | function actionOperationBlockReason(operation) {
 34919 |   if (!operation || operation.status !== "resolving") return "";
````


#### Hit 5 — line 39467

````text
 39453 |         }).join("")}
 39454 |       </section>
 39455 |     `;
 39456 |   }
 39457 |   const pool = getHiddenGrottoPool(state.gym);
 39458 |   const availableTypes = hiddenGrottoAvailableTypes(state.gym);
 39459 |   const typeChoiceCards = hiddenGrottoTypes.map((type) => {
 39460 |     const eligible = getHiddenGrottoPool(state.gym, type);
 39461 |     return `
 39462 |       <button class="ghost-button grotto-type-direct-button" type="button" data-grotto-start-type="${escapeHtml(type)}"${eligible.length ? "" : " disabled"}>
 39463 |         ${escapeHtml(type)} <span>${eligible.length}</span>
 39464 |       </button>
 39465 |     `;
 39466 |   }).join("");
 39467 |   const recentSession = (state.hiddenGrottoSessions || []).find((entry) => entry.playerId === player.id
 39468 |     && entry.series === state.series
 39469 |     && Number(entry.gym) === Number(state.gym)
 39470 |     && entry.status === "completed"
 39471 |     && !entry.undone);
 39472 |   const recentPokemon = recentSession?.rosterPokemonId ? findPokemonRecord(recentSession.rosterPokemonId) : null;
 39473 |   return `
 39474 |     <div><span>Balance</span><strong>${formatMoney(player.balance || 0)}</strong></div>
 39475 |     <div><span>Cost</span><strong>${formatMoney(cost)}</strong></div>
 39476 |     <div><span>Current Gym Battle Tier</span><strong>${escapeHtml(formatPokemonBalanceTierLabel(naturalTier))}</strong></div>
 39477 |     <div><span>Hidden Grotto Tier Cap</span><strong>${escapeHtml(formatPokemonBalanceTierLabel(grottoTierCap))}</strong></div>
 39478 |     <div><span>Available Pokemon in Pool</span><strong>${pool.length}</strong></div>
 39479 |     <div><span>Available Types</span><strong>${availableTypes.length}</strong></div>
 39480 |     <p class="gc-rule-note">Spend 1 Action and ${formatMoney(cost)} to roll 3 types, choose one, then roll 3 Pokemon of that type and choose one. The pool reaches 2 Battle Tier steps above this Gym's normal tier. LC/LC Elite Pokemon that can still evolve remain excluded.</p>
 39481 |     ${recentSession ? `
````


#### Hit 6 — line 40201

````text
 40187 |   const directTypeChoices = directType ? randomUniqueSample(directTypeOptions, Math.min(3, directTypeOptions.length)) : [];
 40188 |   if (directType && !directTypeChoices.length) {
 40189 |     alert(`No eligible ${directType} Pokemon are available for this Hidden Grotto tier pool after low-tier evolution filtering.`);
 40190 |     return;
 40191 |   }
 40192 |   const check = actionLocationCanConfirm(location, player.id, 1);
 40193 |   if (!check.ok) {
 40194 |     alert(check.reason);
 40195 |     return;
 40196 |   }
 40197 |   const previousVisits = structuredClone(actionVisitsForPlayer(player.id));
 40198 |   const previousBalance = Number(player.balance || 0);
 40199 |   const previousMoneyLedger = structuredClone(state.moneyLedger || []);
 40200 |   const previousPokemonRecords = structuredClone(state.pokemonRecords || []);
 40201 |   const previousHiddenGrottoSessions = structuredClone(state.hiddenGrottoSessions || []);
 40202 |   const visit = {
 40203 |     id: `action-visit-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
 40204 |     playerId: player.id,
 40205 |     locationId: "hidden-grotto",
 40206 |     locationName: "Hidden Grotto",
 40207 |     serviceId: "hidden-grotto-start",
 40208 |     serviceLabel: "Explore Hidden Grotto",
 40209 |     actionCost: 1,
 40210 |     series: state.series,
 40211 |     gym: Number(state.gym),
 40212 |     phase: currentPhase(),
 40213 |     createdAt: new Date().toISOString(),
 40214 |     placeholder: false
 40215 |   };
````


#### Hit 7 — line 40251

````text
 40237 |     cost,
 40238 |     ledgerEntryId: ledgerEntry.id,
 40239 |     naturalTier,
 40240 |     targetTier,
 40241 |     tierStepBonus: HIDDEN_GROTTO_TIER_STEP_BONUS,
 40242 |     poolCount: pool.length,
 40243 |     rolledTypes,
 40244 |     chosenType: directType || null,
 40245 |     rolledPokemon: directType ? directTypeChoices : [],
 40246 |     chosenPokemon: null,
 40247 |     rosterPokemonId: "",
 40248 |     status: directType ? "pokemon-choice" : "type-choice",
 40249 |     createdAt: new Date().toISOString()
 40250 |   };
 40251 |   state.hiddenGrottoSessions ||= [];
 40252 |   state.hiddenGrottoSessions.unshift(session);
 40253 |   linkActionOperation(visit.id, { featureType: "hidden-grotto", featureSessionId: session.id });
 40254 |   addLogEntry({
 40255 |     action: "phase",
 40256 |     category: "action",
 40257 |     player: player.name,
 40258 |     item: `${player.name} explored Hidden Grotto`,
 40259 |     title: `${player.name} explored Hidden Grotto`,
 40260 |     summary: directType
 40261 |       ? `Spent 1 Action at Hidden Grotto\nSpent ${formatMoney(cost)}\nGrotto Tier Cap: ${formatPokemonBalanceTierLabel(targetTier)}\nChose ${directType}\nChoose 1 Pokemon`
 40262 |       : `Spent 1 Action at Hidden Grotto\nSpent ${formatMoney(cost)}\nGrotto Tier Cap: ${formatPokemonBalanceTierLabel(targetTier)}\nChoose a type`,
 40263 |     details: [
 40264 |       `Current Gym Battle Tier: ${formatPokemonBalanceTierLabel(naturalTier)}`,
 40265 |       `Hidden Grotto Tier Cap: ${formatPokemonBalanceTierLabel(targetTier)}`,
````


#### Hit 8 — line 40252

````text
 40238 |     ledgerEntryId: ledgerEntry.id,
 40239 |     naturalTier,
 40240 |     targetTier,
 40241 |     tierStepBonus: HIDDEN_GROTTO_TIER_STEP_BONUS,
 40242 |     poolCount: pool.length,
 40243 |     rolledTypes,
 40244 |     chosenType: directType || null,
 40245 |     rolledPokemon: directType ? directTypeChoices : [],
 40246 |     chosenPokemon: null,
 40247 |     rosterPokemonId: "",
 40248 |     status: directType ? "pokemon-choice" : "type-choice",
 40249 |     createdAt: new Date().toISOString()
 40250 |   };
 40251 |   state.hiddenGrottoSessions ||= [];
 40252 |   state.hiddenGrottoSessions.unshift(session);
 40253 |   linkActionOperation(visit.id, { featureType: "hidden-grotto", featureSessionId: session.id });
 40254 |   addLogEntry({
 40255 |     action: "phase",
 40256 |     category: "action",
 40257 |     player: player.name,
 40258 |     item: `${player.name} explored Hidden Grotto`,
 40259 |     title: `${player.name} explored Hidden Grotto`,
 40260 |     summary: directType
 40261 |       ? `Spent 1 Action at Hidden Grotto\nSpent ${formatMoney(cost)}\nGrotto Tier Cap: ${formatPokemonBalanceTierLabel(targetTier)}\nChose ${directType}\nChoose 1 Pokemon`
 40262 |       : `Spent 1 Action at Hidden Grotto\nSpent ${formatMoney(cost)}\nGrotto Tier Cap: ${formatPokemonBalanceTierLabel(targetTier)}\nChoose a type`,
 40263 |     details: [
 40264 |       `Current Gym Battle Tier: ${formatPokemonBalanceTierLabel(naturalTier)}`,
 40265 |       `Hidden Grotto Tier Cap: ${formatPokemonBalanceTierLabel(targetTier)}`,
 40266 |       `Available Pokemon in Pool: ${pool.length}`,
````


#### Hit 9 — line 41744

````text
 41730 |       tier: entry.balanceTierLabel || getPokemonBalanceTierLabel(entry.balanceTier),
 41731 |       metadata: entry
 41732 |     }));
 41733 | }
 41734 | 
 41735 | function hiddenGrottoAvailableTypes(gymNumber = state.gym) {
 41736 |   return hiddenGrottoTypes.filter((type) => getHiddenGrottoPool(gymNumber, type).length > 0);
 41737 | }
 41738 | 
 41739 | function pendingSilphCoSession(playerId = activePlayer().id) {
 41740 |   return (state.silphCoSessions || []).find((session) => session.playerId === playerId && session.status === "pending-choice") || null;
 41741 | }
 41742 | 
 41743 | function activeHiddenGrottoSession(playerId = activePlayer().id) {
 41744 |   return (state.hiddenGrottoSessions || []).find((session) => session.playerId === playerId && ["type-choice", "pokemon-choice"].includes(session.status)) || null;
 41745 | }
 41746 | 
 41747 | function encounterWheelKey(series = state.series, gym = state.gym) {
 41748 |   return `${String(series || "").toLowerCase()}-gym-${Number(gym || 1)}`;
 41749 | }
 41750 | 
 41751 | function encounterWheelDefinition(series = state.series, gym = state.gym) {
 41752 |   return encounterWheelDefinitions[encounterWheelKey(series, gym)] || null;
 41753 | }
 41754 | 
 41755 | function pendingEncounterSessions() {
 41756 |   state.encounterSessions ||= [];
 41757 |   return state.encounterSessions.filter((session) => ["pending", "review"].includes(session.status));
 41758 | }
````


#### Hit 10 — line 61756

````text
 61742 |     if (undoData.previousPokemonRecords) state.pokemonRecords = structuredClone(undoData.previousPokemonRecords).map(normalizePokemonRecord);
 61743 |     if (undoData.previousSilphCoSessions) state.silphCoSessions = structuredClone(undoData.previousSilphCoSessions);
 61744 |     if (player && undoData.previousMoveAccessGrants) player.moveAccessGrants = structuredClone(undoData.previousMoveAccessGrants);
 61745 |     syncPlayerPokemonLists();
 61746 |   } else if (undoData.actionType === "undoHiddenGrottoAction") {
 61747 |     const key = actionPhaseKey(undoData.series, undoData.gym);
 61748 |     state.actionPhaseState ||= { selections: {}, seriesTrackers: {} };
 61749 |     state.actionPhaseState.selections ||= {};
 61750 |     state.actionPhaseState.selections[key] ||= { series: undoData.series, gym: undoData.gym, playerVisits: {} };
 61751 |     state.actionPhaseState.selections[key].playerVisits[undoData.playerId] = structuredClone(undoData.previousVisits || []);
 61752 |     const player = state.players.find((candidate) => candidate.id === undoData.playerId);
 61753 |     if (player) player.balance = Number(undoData.previousBalance ?? player.balance ?? 0);
 61754 |     if (undoData.previousMoneyLedger) state.moneyLedger = structuredClone(undoData.previousMoneyLedger);
 61755 |     if (undoData.previousPokemonRecords) state.pokemonRecords = structuredClone(undoData.previousPokemonRecords).map(normalizePokemonRecord);
 61756 |     if (undoData.previousHiddenGrottoSessions) state.hiddenGrottoSessions = structuredClone(undoData.previousHiddenGrottoSessions);
 61757 |     syncPlayerPokemonLists();
 61758 |   } else if (undoData.actionType === "undoEncounterAction") {
 61759 |     const key = actionPhaseKey(undoData.series, undoData.gym);
 61760 |     state.actionPhaseState ||= { selections: {}, seriesTrackers: {} };
 61761 |     state.actionPhaseState.selections ||= {};
 61762 |     state.actionPhaseState.selections[key] ||= { series: undoData.series, gym: undoData.gym, playerVisits: {} };
 61763 |     state.actionPhaseState.selections[key].playerVisits[undoData.playerId] = (state.actionPhaseState.selections[key].playerVisits[undoData.playerId] || [])
 61764 |       .filter((visit) => visit.id !== undoData.visitId);
 61765 |     undoEncounterActionVisit(undoData);
 61766 |   } else if (undoData.actionType === "undoActionVisit") {
 61767 |     const key = actionPhaseKey(undoData.series, undoData.gym);
 61768 |     state.actionPhaseState ||= { selections: {}, seriesTrackers: {} };
 61769 |     state.actionPhaseState.selections ||= {};
 61770 |     state.actionPhaseState.seriesTrackers ||= {};
````

### function startHiddenGrottoSession

Occurrences shown: 1


#### Hit 1 — line 40160

````text
 40146 |     <p class="gc-rule-note">Choose exactly one of the two Ability or four Move results for every Pokémon. Options are persisted and cannot reroll on refresh.</p>
 40147 |     ${(pending.developments || []).map((development) => `<section class="breeder-select-panel silph-development ${development.status}"><h3>${escapeHtml(development.pokemonName)} - ${development.status === "completed" ? `Selected ${escapeHtml(development.selectedValue)}` : "Choice Required"}</h3><div class="location-services">${[
 40148 |       ...(development.rolledAbilities || []).map((value) => ({ type: "ability", value })),
 40149 |       ...(development.rolledMoves || []).map((value) => ({ type: "move", value }))
 40150 |     ].map((option) => `<article class="location-service-card"><div><strong>${escapeHtml(option.value)}</strong><p>${option.type === "ability" ? "Ability" : "Move"}</p></div><button class="buy-button mini-button" data-silph-select="${escapeHtml(development.pokemonId)}:${escapeHtml(option.type)}:${escapeHtml(option.value)}" ${development.status === "completed" ? "disabled" : ""}>Select</button></article>`).join("")}</div></section>`).join("")}`;
 40151 |   const eligible = silphEligiblePokemon(player.id);
 40152 |   return `
 40153 |     <div><span>Balance</span><strong>${formatMoney(player.balance || 0)}</strong></div>
 40154 |     <p class="gc-rule-note">Choose up to three eligible Pokémon. Costs use consolidated Battle Tier: Safari $1,000; Poké $2,000; Great $3,000; Ultra $4,000; Master $5,000.</p>
 40155 |     <label>Pokémon (Ctrl/Cmd-click for multiple)<select id="silphPokemonSelect" multiple size="${Math.min(8, Math.max(3, eligible.length))}">${eligible.map((pokemon) => { const tier = pokemonConsolidatedBattleTier(pokemon); const cost = globalThis.rivalSagaActionPhaseBalance.SILPH_COSTS[tier] || 0; return `<option value="${escapeHtml(pokemon.id)}">${escapeHtml(pokemon.name)} - ${escapeHtml(globalThis.rivalSagaActionPhaseBalance.tierLabel(tier) || "Tier required")} - ${cost ? formatMoney(cost) : "Unavailable"}</option>`; }).join("")}</select></label>
 40156 |     <div class="breeder-select-panel" data-silph-preview><span>Select one to three Pokémon.</span></div>
 40157 |     <button class="buy-button" type="button" data-silph-start ${eligible.length ? "" : "disabled"}>Start Silph Co. R&D</button>`;
 40158 | }
 40159 | 
 40160 | async function startHiddenGrottoSession({ chosenType = "" } = {}) {
 40161 |   const player = activePlayer();
 40162 |   const location = actionLocationById("hidden-grotto");
 40163 |   const cost = Number(location?.cost || 1500);
 40164 |   if (Number(player.balance || 0) < cost) {
 40165 |     alert(`Hidden Grotto costs ${formatMoney(cost)}. You do not have enough money.`);
 40166 |     return;
 40167 |   }
 40168 |   await ensurePokemonBuildDataLoaded({ renderOnLoad: false });
 40169 |   const naturalTier = getNaturalGymTier(state.gym);
 40170 |   const targetTier = getHiddenGrottoTierCap(state.gym);
 40171 |   const pool = getHiddenGrottoPool(state.gym);
 40172 |   const availableTypes = hiddenGrottoAvailableTypes(state.gym);
 40173 |   if (!pool.length || !availableTypes.length) {
 40174 |     alert(`No eligible Pokemon are currently available for Hidden Grotto at ${formatPokemonBalanceTierLabel(targetTier)} or lower.`);
````

### encounterWheelDefinition

Occurrences shown: 11


#### Hit 1 — line 3934

````text
  3920 | }
  3921 | 
  3922 | async function resolveImmediateTokenUse(draft, { context = {} } = {}) {
  3923 |   const metadata = tokenEffectMetadataByName(draft.tokenName);
  3924 |   const timingCheck = tokenUseTimingCheck({ player: draft.actor, tokenName: draft.tokenName, metadata, context });
  3925 |   if (!timingCheck.ok) {
  3926 |     alert(timingCheck.reason);
  3927 |     return null;
  3928 |   }
  3929 |   let extraEncounterValidation = null;
  3930 |   if (metadata.resolverId === "extraEncounter") {
  3931 |     extraEncounterValidation = encounterTokenRuntime.validateExtraEncounter(state, {
  3932 |       playerId: draft.targetPlayerId
  3933 |     }, {
  3934 |       wheelDefinition: encounterWheelDefinition(state.series, state.gym)
  3935 |     });
  3936 |     if (!extraEncounterValidation.ok) {
  3937 |       alert(extraEncounterValidation.reason);
  3938 |       return null;
  3939 |     }
  3940 |   }
  3941 |   if (metadata.id === "substitute") {
  3942 |     const legality = controlTokenDraftLegality(draft, metadata);
  3943 |     if (!legality.ok) {
  3944 |       alert(legality.reason);
  3945 |       return null;
  3946 |     }
  3947 |   }
  3948 |   if (metadata.resolverId === "substituteAttach") {
````


#### Hit 2 — line 6138

````text
  6124 |   "hoenn-hyperspace-hole": {
  6125 |     id: "hoenn-hyperspace-hole",
  6126 |     series: "Hoenn",
  6127 |     name: "Hoenn Hyperspace Hole Wheel",
  6128 |     entries: [
  6129 |       "Rayquaza", "Cresselia", "Uxie", "Mesprit", "Azelf", "Landorus", "Thundurus", "Tornadus",
  6130 |       "Tornadus T", "Landorus T", "Thundurus T", "Dialga", "Palkia", "Giratina", "Groudon",
  6131 |       "Kyogre", "Jirachi", "Deoxys", "Deoxys A", "Deoxys S", "Deoxys D", "Kyurem", "Reshiram",
  6132 |       "Zekrom", "Cobalion", "Terrakion", "Virizion", "Regirock", "Regice", "Registeel",
  6133 |       "Regigigas", "Entei", "Raikou", "Suicune", "Latias", "Latios", "Heatran", "Ho-Oh", "Lugia"
  6134 |     ].map((name) => encounterEntry(name))
  6135 |   }
  6136 | });
  6137 | 
  6138 | const encounterWheelDefinitions = Object.freeze({
  6139 |   "kanto-gym-1": makeEncounterWheel("Kanto", 1, ["Pidgey", "Shinx", "Oddish", "Magikarp SF", "Tentacool SF"]),
  6140 |   "hoenn-gym-1": makeEncounterWheel("Hoenn", 1, [
  6141 |     "Chikorita", "Cyndaquil", "Totodile", "Wurmple", "Zigzagoon", "Poochyena", "Lillipup", "Zorua",
  6142 |     "Sewaddle", "Turtwig", "Chimchar", "Piplup", "Snivy", "Oshawott", "Tepig", "Wingull",
  6143 |     "Wailmer SF", "Carvanha SF", "Chatot", "Shellos", "Tentacool SF", "Magikarp SF", "Lotad",
  6144 |     "Seedot", "Ralts", "Surskit", "Gothita", "Tympole", "Marill", "Corphish SF", "Goldeen SF",
  6145 |     "Taillow", "Pidove", "Shroomish", "Slakoth", "Cottonee", "Paras", "Phantump", "Omanyte",
  6146 |     "Kabuto", "Aerodactyl", "Lileep", "Anorith", "Cranidos", "Shieldon", "Tirtouga", "Archen",
  6147 |     "Tyrunt", "Amaura", "Makuhita", "Whismur", "Nincada", "Skitty", "Hyperspace Hole", "Joltik",
  6148 |     "Eevee", "Abra", "Geodude"
  6149 |   ]),
  6150 |   "hoenn-gym-2": makeEncounterWheel("Hoenn", 2, [
  6151 |     "Tentacool SF", "Wingull SF", "Wailmer SF", "Magikarp SF", "Zubat", "Makuhita", "Geodude",
  6152 |     "Abra", "Timburr", "Axew", "Onix", "Aron", "Sableye", "Mawile", "Nosepass", "Electrike",
````


#### Hit 3 — line 38657

````text
 38643 | function activeGraveyardSession(playerId = activePlayer().id) {
 38644 |   state.graveyardSessions ||= [];
 38645 |   return state.graveyardSessions.find((session) => session.playerId === playerId
 38646 |     && session.series === state.series
 38647 |     && Number(session.gym) === Number(state.gym)
 38648 |     && session.status === "active") || null;
 38649 | }
 38650 | 
 38651 | function actionLocationServices(location, player = activePlayer(), tracker = ensureActionSeriesTracker(state.series, player.id)) {
 38652 |   if (!location) return [];
 38653 |   if (location.id === "pokemon-breeder") return [];
 38654 |   if (location.id === "ranger-base") return [];
 38655 |   if (location.id === "pokemon-center") return [];
 38656 |   if (location.id === "encounter") {
 38657 |     const wheel = encounterWheelDefinition();
 38658 |     return [{
 38659 |       id: "encounter-wheel",
 38660 |       label: "Open Encounter Wheel",
 38661 |       buttonLabel: "Spend 1 Action",
 38662 |       description: wheel
 38663 |         ? `Spend 1 Action to roll ${wheel.name} twice. Encounter results can be confirmed as Pokemon Results.`
 38664 |         : "No encounter wheel is defined for the current gym yet.",
 38665 |       actionCost: 1,
 38666 |       maxUsesPerAction: wheel?.rollsPerAction || 2,
 38667 |       allowsMultipleUses: false,
 38668 |       disabled: !wheel,
 38669 |       disabledReason: wheel ? "" : "No Encounter Wheel is defined for this Series/Gym.",
 38670 |       implementationStatus: "Implemented MVP"
 38671 |     }];
````


#### Hit 4 — line 41751

````text
 41737 | }
 41738 | 
 41739 | function pendingSilphCoSession(playerId = activePlayer().id) {
 41740 |   return (state.silphCoSessions || []).find((session) => session.playerId === playerId && session.status === "pending-choice") || null;
 41741 | }
 41742 | 
 41743 | function activeHiddenGrottoSession(playerId = activePlayer().id) {
 41744 |   return (state.hiddenGrottoSessions || []).find((session) => session.playerId === playerId && ["type-choice", "pokemon-choice"].includes(session.status)) || null;
 41745 | }
 41746 | 
 41747 | function encounterWheelKey(series = state.series, gym = state.gym) {
 41748 |   return `${String(series || "").toLowerCase()}-gym-${Number(gym || 1)}`;
 41749 | }
 41750 | 
 41751 | function encounterWheelDefinition(series = state.series, gym = state.gym) {
 41752 |   return encounterWheelDefinitions[encounterWheelKey(series, gym)] || null;
 41753 | }
 41754 | 
 41755 | function pendingEncounterSessions() {
 41756 |   state.encounterSessions ||= [];
 41757 |   return state.encounterSessions.filter((session) => ["pending", "review"].includes(session.status));
 41758 | }
 41759 | 
 41760 | function selectedEncounterSession() {
 41761 |   const pending = pendingEncounterSessions();
 41762 |   if (!pending.length) return null;
 41763 |   let session = pending.find((entry) => entry.id === state.selectedEncounterSessionId);
 41764 |   if (!session) {
 41765 |     session = pending[0];
````


#### Hit 5 — line 41752

````text
 41738 | 
 41739 | function pendingSilphCoSession(playerId = activePlayer().id) {
 41740 |   return (state.silphCoSessions || []).find((session) => session.playerId === playerId && session.status === "pending-choice") || null;
 41741 | }
 41742 | 
 41743 | function activeHiddenGrottoSession(playerId = activePlayer().id) {
 41744 |   return (state.hiddenGrottoSessions || []).find((session) => session.playerId === playerId && ["type-choice", "pokemon-choice"].includes(session.status)) || null;
 41745 | }
 41746 | 
 41747 | function encounterWheelKey(series = state.series, gym = state.gym) {
 41748 |   return `${String(series || "").toLowerCase()}-gym-${Number(gym || 1)}`;
 41749 | }
 41750 | 
 41751 | function encounterWheelDefinition(series = state.series, gym = state.gym) {
 41752 |   return encounterWheelDefinitions[encounterWheelKey(series, gym)] || null;
 41753 | }
 41754 | 
 41755 | function pendingEncounterSessions() {
 41756 |   state.encounterSessions ||= [];
 41757 |   return state.encounterSessions.filter((session) => ["pending", "review"].includes(session.status));
 41758 | }
 41759 | 
 41760 | function selectedEncounterSession() {
 41761 |   const pending = pendingEncounterSessions();
 41762 |   if (!pending.length) return null;
 41763 |   let session = pending.find((entry) => entry.id === state.selectedEncounterSessionId);
 41764 |   if (!session) {
 41765 |     session = pending[0];
 41766 |     state.selectedEncounterSessionId = session.id;
````


#### Hit 6 — line 41772

````text
 41758 | }
 41759 | 
 41760 | function selectedEncounterSession() {
 41761 |   const pending = pendingEncounterSessions();
 41762 |   if (!pending.length) return null;
 41763 |   let session = pending.find((entry) => entry.id === state.selectedEncounterSessionId);
 41764 |   if (!session) {
 41765 |     session = pending[0];
 41766 |     state.selectedEncounterSessionId = session.id;
 41767 |   }
 41768 |   return session;
 41769 | }
 41770 | 
 41771 | function encounterEntriesForSession(session) {
 41772 |   const definition = encounterWheelDefinition(session?.series, session?.gym);
 41773 |   if (!definition) return [];
 41774 |   const includeFishing = Boolean(session.includeFishing);
 41775 |   const includeSurf = Boolean(session.includeSurf);
 41776 |   const removed = new Set(session.removedEntryIds || []);
 41777 |   const baseEntries = (definition.entries || []).filter((entry) => {
 41778 |     if (removed.has(entry.id)) return false;
 41779 |     const category = String(entry.category || "land").toLowerCase();
 41780 |     if (category === "fishing" && !includeFishing) return false;
 41781 |     if (category === "surf" && !includeSurf) return false;
 41782 |     if (entry.enabledByDefault === false && !["fishing", "surf"].includes(category)) return false;
 41783 |     return currentPokemonRuleStatusByName(entry.pokemonName || entry.displayName) !== "Banned";
 41784 |   });
 41785 |   return [...baseEntries, ...(session.temporaryEntries || [])].map((entry) => ({
 41786 |     ...entry,
````


#### Hit 7 — line 42790

````text
 42776 |   entry.encounterSessionId = session.id;
 42777 |   return entry;
 42778 | }
 42779 | 
 42780 | function activeEncounterSessionForPlayer(playerId, series = state.series, gym = state.gym) {
 42781 |   return (state.encounterSessions || []).find((session) => session.playerId === playerId
 42782 |     && session.series === series
 42783 |     && Number(session.gym) === Number(gym)
 42784 |     && ["pending", "review"].includes(session.status));
 42785 | }
 42786 | 
 42787 | function startEncounterSession({ skipConfirmCheck = false } = {}) {
 42788 |   const player = activePlayer();
 42789 |   const location = actionLocationById("encounter");
 42790 |   const definition = encounterWheelDefinition();
 42791 |   if (!definition) {
 42792 |     alert("No Encounter Wheel is defined for this Series/Gym yet.");
 42793 |     return false;
 42794 |   }
 42795 |   if (!skipConfirmCheck) {
 42796 |     const check = actionLocationCanConfirm(location, player.id, 1);
 42797 |     if (!check.ok) {
 42798 |       alert(check.reason);
 42799 |       return false;
 42800 |     }
 42801 |   }
 42802 |   const previousVisits = structuredClone(actionVisitsForPlayer(player.id));
 42803 |   const previousEncounterSessions = structuredClone(state.encounterSessions || []);
 42804 |   const previousRandomPokemonSessions = structuredClone(state.randomPokemonSessions || []);
````


#### Hit 8 — line 47288

````text
 47274 | 
 47275 | async function completeEncounterRoll(sessionId, entryId) {
 47276 |   const session = (state.encounterSessions || []).find((entry) => entry.id === sessionId);
 47277 |   if (!session || session.status !== "pending") return;
 47278 |   session.isSpinning = false;
 47279 |   session.pendingEntryId = "";
 47280 |   const player = state.players.find((entry) => entry.id === session.playerId) || activePlayer();
 47281 |   const entries = encounterEntriesForSession(session);
 47282 |   const visualResult = entries.find((entry) => entry.id === entryId) || weightedEncounterEntry(entries);
 47283 |   const { result, special } = resolveEncounterSpecialResult(visualResult);
 47284 |   if (!result || (session.rolls || []).length >= Number(session.maxRolls || 2)) return;
 47285 |   const roll = {
 47286 |     id: `encounter-roll-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
 47287 |     encounterSessionId: session.id,
 47288 |     actionVisitId: session.actionVisitIds?.[Math.floor((session.rolls || []).length / Number(encounterWheelDefinition(session.series, session.gym)?.rollsPerAction || 2))] || session.actionVisitId,
 47289 |     playerId: player.id,
 47290 |     series: session.series,
 47291 |     gym: Number(session.gym),
 47292 |     entryId: result.id,
 47293 |     visualEntryId: visualResult?.id || result.id,
 47294 |     resultPokemonName: result.pokemonName || result.displayName,
 47295 |     resultDisplayName: result.displayName || result.pokemonName,
 47296 |     resultSprite: "",
 47297 |     chosenSpriteKey: "",
 47298 |     category: result.category || "land",
 47299 |     weight: Number(result.weight || 1),
 47300 |     specialEncounter: special,
 47301 |     timestamp: new Date().toISOString()
 47302 |   };
````


#### Hit 9 — line 47417

````text
 47403 |   const pending = pendingEncounterSessions();
 47404 |   if (!pending.length) state.encounterModalOpen = false;
 47405 |   if (!els.encounterTab || !els.encounterOverlay || !els.encounterBody) return;
 47406 |   els.encounterTab.classList.toggle("hidden", !pending.length);
 47407 |   els.encounterTab.textContent = pending.length ? `Encounter (${pending.length})` : "Encounter";
 47408 |   const isOpen = Boolean(pending.length && state.encounterModalOpen);
 47409 |   els.encounterOverlay.classList.toggle("hidden", !isOpen);
 47410 |   els.encounterTab.setAttribute("aria-expanded", String(isOpen));
 47411 |   const session = selectedEncounterSession();
 47412 |   if (!pending.length || !session) {
 47413 |     els.encounterSessionList.innerHTML = "";
 47414 |     els.encounterBody.innerHTML = "";
 47415 |     return;
 47416 |   }
 47417 |   const definition = encounterWheelDefinition(session.series, session.gym);
 47418 |   const player = state.players.find((entry) => entry.id === session.playerId) || activePlayer();
 47419 |   const entries = encounterEntriesForSession(session);
 47420 |   const removedEntries = (definition?.entries || []).filter((entry) => (session.removedEntryIds || []).includes(entry.id));
 47421 |   const max = Number(session.maxRolls || definition?.rollsPerAction || 2);
 47422 |   const rolls = session.rolls || [];
 47423 |   const isSpinning = Boolean(session.isSpinning);
 47424 |   const weightEditing = Boolean(session.weightEditing);
 47425 |   const rerollTokenCount = (player.inventory || []).filter(isRerollToken).length;
 47426 |   const rollFreeRerollReasons = Object.fromEntries(rolls.map((roll) => [roll.id, encounterRollFreeRerollReason(player, roll)]));
 47427 |   els.encounterTitle.textContent = definition?.name || "Encounter Wheel";
 47428 |   els.encounterSessionList.replaceChildren(...pending.map((entry) => {
 47429 |     const entryPlayer = state.players.find((candidate) => candidate.id === entry.playerId);
 47430 |     const button = document.createElement("button");
 47431 |     button.type = "button";
````


#### Hit 10 — line 47435

````text
 47421 |   const max = Number(session.maxRolls || definition?.rollsPerAction || 2);
 47422 |   const rolls = session.rolls || [];
 47423 |   const isSpinning = Boolean(session.isSpinning);
 47424 |   const weightEditing = Boolean(session.weightEditing);
 47425 |   const rerollTokenCount = (player.inventory || []).filter(isRerollToken).length;
 47426 |   const rollFreeRerollReasons = Object.fromEntries(rolls.map((roll) => [roll.id, encounterRollFreeRerollReason(player, roll)]));
 47427 |   els.encounterTitle.textContent = definition?.name || "Encounter Wheel";
 47428 |   els.encounterSessionList.replaceChildren(...pending.map((entry) => {
 47429 |     const entryPlayer = state.players.find((candidate) => candidate.id === entry.playerId);
 47430 |     const button = document.createElement("button");
 47431 |     button.type = "button";
 47432 |     button.className = `wheel-session-card${entry.id === session.id ? " active" : ""}`;
 47433 |     button.dataset.encounterSession = entry.id;
 47434 |     button.innerHTML = `
 47435 |       <strong>${escapeHtml(encounterWheelDefinition(entry.series, entry.gym)?.name || "Encounter Wheel")}</strong>
 47436 |       <span>${escapeHtml(entryPlayer?.name || "Unknown")} - ${entry.series} G${entry.gym}</span>
 47437 |       <em>${(entry.rolls || []).length}/${entry.maxRolls || 2} rolls</em>
 47438 |     `;
 47439 |     return button;
 47440 |   }));
 47441 |   const totalWeight = entries.reduce((total, entry) => total + Number(entry.weight || 1), 0) || 1;
 47442 |   const colors = ["#7cc6fe", "#98d973", "#f7c948", "#ff8a65", "#c6a4ff", "#80cbc4", "#f06292", "#ffd166"];
 47443 |   let cursor = 0;
 47444 |   const segments = buildEncounterWheelSegments(entries);
 47445 |   const finalRoll = rolls[rolls.length - 1];
 47446 |   const finalEntryId = finalRoll?.visualEntryId || finalRoll?.entryId || "";
 47447 |   const finalMeta = finalRoll
 47448 |     ? finalRoll.specialEncounter
 47449 |       ? `${finalRoll.specialEncounter.triggerName} -> ${finalRoll.specialEncounter.wheelName}`
````


#### Hit 11 — line 61558

````text
 61544 |     } else if (Array.isArray(undoData.previousInteractionEventIds)) {
 61545 |       const previousIds = new Set(undoData.previousInteractionEventIds);
 61546 |       state.interactionEvents = (state.interactionEvents || []).filter((activity) => previousIds.has(activity.id));
 61547 |     }
 61548 |     if (undoData.previousTransactions) {
 61549 |       state.transactions = structuredClone(undoData.previousTransactions);
 61550 |     } else if (Array.isArray(undoData.previousTransactionIds)) {
 61551 |       const previousIds = new Set(undoData.previousTransactionIds);
 61552 |       state.transactions = (state.transactions || []).filter((transaction) => previousIds.has(transaction.id));
 61553 |     }
 61554 |     syncLinkedTransactions();
 61555 |     syncPlayerPokemonLists();
 61556 |     return;
 61557 |   }
 61558 |   const definition = encounterWheelDefinition(session.series, session.gym);
 61559 |   const rollsPerAction = Number(definition?.rollsPerAction || 2);
 61560 |   const visitIds = session.actionVisitIds || (session.actionVisitId ? [session.actionVisitId] : []);
 61561 |   const visitIndex = Math.max(0, visitIds.indexOf(undoData.visitId));
 61562 |   let rollsToRemove = (session.rolls || []).filter((roll) => roll.actionVisitId === undoData.visitId);
 61563 |   if (!rollsToRemove.length || rollsToRemove.length > rollsPerAction) {
 61564 |     rollsToRemove = (session.rolls || []).slice(visitIndex * rollsPerAction, visitIndex * rollsPerAction + rollsPerAction);
 61565 |   }
 61566 |   const rollIds = new Set(rollsToRemove.map((roll) => roll.id));
 61567 |   const randomSessionIds = new Set(rollsToRemove.map((roll) => roll.randomPokemonSessionId).filter(Boolean));
 61568 |   const interactionIdsToRemove = new Set((state.interactionEvents || [])
 61569 |     .filter((activity) => randomSessionIds.has(activity.sourceId) || randomSessionIds.has(activity.payload?.randomPokemonSessionId))
 61570 |     .map((activity) => activity.id));
 61571 |   const pokemonIdsToRemove = new Set(rollsToRemove.map((roll) => roll.rosterPokemonId).filter(Boolean));
 61572 |   (state.randomPokemonSessions || []).forEach((randomSession) => {
````

### encounterTokenRuntime

Occurrences shown: 4


#### Hit 1 — line 27

````text
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
````


#### Hit 2 — line 28

````text
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
````


#### Hit 3 — line 3931

````text
  3917 |   state.effectAuditRecords ||= [];
  3918 |   state.effectAuditRecords.unshift(record);
  3919 |   return record;
  3920 | }
  3921 | 
  3922 | async function resolveImmediateTokenUse(draft, { context = {} } = {}) {
  3923 |   const metadata = tokenEffectMetadataByName(draft.tokenName);
  3924 |   const timingCheck = tokenUseTimingCheck({ player: draft.actor, tokenName: draft.tokenName, metadata, context });
  3925 |   if (!timingCheck.ok) {
  3926 |     alert(timingCheck.reason);
  3927 |     return null;
  3928 |   }
  3929 |   let extraEncounterValidation = null;
  3930 |   if (metadata.resolverId === "extraEncounter") {
  3931 |     extraEncounterValidation = encounterTokenRuntime.validateExtraEncounter(state, {
  3932 |       playerId: draft.targetPlayerId
  3933 |     }, {
  3934 |       wheelDefinition: encounterWheelDefinition(state.series, state.gym)
  3935 |     });
  3936 |     if (!extraEncounterValidation.ok) {
  3937 |       alert(extraEncounterValidation.reason);
  3938 |       return null;
  3939 |     }
  3940 |   }
  3941 |   if (metadata.id === "substitute") {
  3942 |     const legality = controlTokenDraftLegality(draft, metadata);
  3943 |     if (!legality.ok) {
  3944 |       alert(legality.reason);
  3945 |       return null;
````


#### Hit 4 — line 3986

````text
  3972 |     alert(`${draft.actor.name} does not have ${draft.tokenName}.`);
  3973 |     return null;
  3974 |   }
  3975 |   const consumedToken = consumed?.token || { id: "", name: draft.tokenName };
  3976 |   const now = new Date().toISOString();
  3977 |   const details = [
  3978 |     `Token: ${consumedToken.name || draft.tokenName}`,
  3979 |     `Timing: ${(timingCheck.windows || []).join(", ") || "manual"}`,
  3980 |     `Pattern: ${metadata.activationPattern || "manual"}`
  3981 |   ];
  3982 |   const statusIds = [];
  3983 |   let encounterSessionId = "";
  3984 |   let result = "resolved";
  3985 |   if (metadata.resolverId === "extraEncounter") {
  3986 |     const grant = encounterTokenRuntime.grantExtraEncounter(state, {
  3987 |       playerId: extraEncounterValidation.player.id,
  3988 |       sourceTokenId: consumedToken.id || "",
  3989 |       sourceActivationId: consumedToken.id || ""
  3990 |     }, {
  3991 |       wheelDefinition: extraEncounterValidation.wheel,
  3992 |       now
  3993 |     });
  3994 |     if (!grant.ok || !grant.session) {
  3995 |       restoreTokenEffectContractUndoData(rollbackSnapshot);
  3996 |       alert(grant.reason || "The extra Encounter session could not be created. The Token was not consumed.");
  3997 |       return null;
  3998 |     }
  3999 |     encounterSessionId = grant.session.id;
  4000 |     state.selectedEncounterSessionId = grant.session.id;
````

### rivalSagaEncounterTokenRuntime

Occurrences shown: 1


#### Hit 1 — line 27

````text
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
````

### encounterOverlay

Occurrences shown: 12+


#### Hit 1 — line 18844

````text
 18830 |   wheelSessionDetail: document.querySelector("#wheelSessionDetail"),
 18831 |   wheelName: document.querySelector("#wheelName"),
 18832 |   wheelRollStatus: document.querySelector("#wheelRollStatus"),
 18833 |   wheelDescription: document.querySelector("#wheelDescription"),
 18834 |   wheelMeta: document.querySelector("#wheelMeta"),
 18835 |   wheelVisual: document.querySelector("#wheelVisual"),
 18836 |   wheelOutcomes: document.querySelector("#wheelOutcomes"),
 18837 |   wheelLatestResult: document.querySelector("#wheelLatestResult"),
 18838 |   spinWheel: document.querySelector("#spinWheel"),
 18839 |   finishWheelSession: document.querySelector("#finishWheelSession"),
 18840 |   skipWheelAnimation: document.querySelector("#skipWheelAnimation"),
 18841 |   closeWheelPanel: document.querySelector("#closeWheelPanel"),
 18842 |   wheelHistory: document.querySelector("#wheelHistory"),
 18843 |   encounterTab: document.querySelector("#encounterTab"),
 18844 |   encounterOverlay: document.querySelector("#encounterOverlay"),
 18845 |   closeEncounterOverlay: document.querySelector("#closeEncounterOverlay"),
 18846 |   encounterSessionList: document.querySelector("#encounterSessionList"),
 18847 |   encounterTitle: document.querySelector("#encounterTitle"),
 18848 |   encounterBody: document.querySelector("#encounterBody"),
 18849 |   randomPokemonColumn: document.querySelector("#randomPokemonColumn"),
 18850 |   randomPokemonTab: document.querySelector("#randomPokemonTab"),
 18851 |   randomPokemonPanel: document.querySelector("#randomPokemonPanel"),
 18852 |   closeRandomPokemonPanel: document.querySelector("#closeRandomPokemonPanel"),
 18853 |   randomPokemonSessionList: document.querySelector("#randomPokemonSessionList"),
 18854 |   randomPokemonSessionDetail: document.querySelector("#randomPokemonSessionDetail"),
 18855 |   rerollTargetModal: document.querySelector("#rerollTargetModal"),
 18856 |   closeRerollTargetModal: document.querySelector("#closeRerollTargetModal"),
 18857 |   rerollTargetIntro: document.querySelector("#rerollTargetIntro"),
 18858 |   rerollTargetList: document.querySelector("#rerollTargetList"),
````


#### Hit 2 — line 18844

````text
 18830 |   wheelSessionDetail: document.querySelector("#wheelSessionDetail"),
 18831 |   wheelName: document.querySelector("#wheelName"),
 18832 |   wheelRollStatus: document.querySelector("#wheelRollStatus"),
 18833 |   wheelDescription: document.querySelector("#wheelDescription"),
 18834 |   wheelMeta: document.querySelector("#wheelMeta"),
 18835 |   wheelVisual: document.querySelector("#wheelVisual"),
 18836 |   wheelOutcomes: document.querySelector("#wheelOutcomes"),
 18837 |   wheelLatestResult: document.querySelector("#wheelLatestResult"),
 18838 |   spinWheel: document.querySelector("#spinWheel"),
 18839 |   finishWheelSession: document.querySelector("#finishWheelSession"),
 18840 |   skipWheelAnimation: document.querySelector("#skipWheelAnimation"),
 18841 |   closeWheelPanel: document.querySelector("#closeWheelPanel"),
 18842 |   wheelHistory: document.querySelector("#wheelHistory"),
 18843 |   encounterTab: document.querySelector("#encounterTab"),
 18844 |   encounterOverlay: document.querySelector("#encounterOverlay"),
 18845 |   closeEncounterOverlay: document.querySelector("#closeEncounterOverlay"),
 18846 |   encounterSessionList: document.querySelector("#encounterSessionList"),
 18847 |   encounterTitle: document.querySelector("#encounterTitle"),
 18848 |   encounterBody: document.querySelector("#encounterBody"),
 18849 |   randomPokemonColumn: document.querySelector("#randomPokemonColumn"),
 18850 |   randomPokemonTab: document.querySelector("#randomPokemonTab"),
 18851 |   randomPokemonPanel: document.querySelector("#randomPokemonPanel"),
 18852 |   closeRandomPokemonPanel: document.querySelector("#closeRandomPokemonPanel"),
 18853 |   randomPokemonSessionList: document.querySelector("#randomPokemonSessionList"),
 18854 |   randomPokemonSessionDetail: document.querySelector("#randomPokemonSessionDetail"),
 18855 |   rerollTargetModal: document.querySelector("#rerollTargetModal"),
 18856 |   closeRerollTargetModal: document.querySelector("#closeRerollTargetModal"),
 18857 |   rerollTargetIntro: document.querySelector("#rerollTargetIntro"),
 18858 |   rerollTargetList: document.querySelector("#rerollTargetList"),
````


#### Hit 3 — line 41842

````text
 41828 |   const angleUnderPointer = normalizeAngle(ENCOUNTER_POINTER_ANGLE_DEGREES - rotationAngle);
 41829 |   return segments.find((segment, index) => {
 41830 |     const end = index === segments.length - 1 ? 360.000001 : segment.endAngle;
 41831 |     return angleUnderPointer >= segment.startAngle && angleUnderPointer < end;
 41832 |   }) || segments[segments.length - 1];
 41833 | }
 41834 | 
 41835 | function rotationFromTransform(transform) {
 41836 |   if (!transform || transform === "none") return 0;
 41837 |   const values = transform.match(/matrix\(([^)]+)\)/)?.[1]?.split(",").map((value) => Number(value.trim()));
 41838 |   if (!values || values.length < 2) return 0;
 41839 |   return Math.atan2(values[1], values[0]) * (180 / Math.PI);
 41840 | }
 41841 | 
 41842 | function updateEncounterLivePointerDisplay({ root = els.encounterOverlay, status = "Passing", finalName = "", finalMeta = "" } = {}) {
 41843 |   const display = root?.querySelector("[data-encounter-live-display]");
 41844 |   const wheelDisc = root?.querySelector(".encounter-wheel-visual .wheel-disc");
 41845 |   if (!display) return null;
 41846 |   const segments = JSON.parse(display.dataset.segments || "[]");
 41847 |   let segment = null;
 41848 |   if (finalName) {
 41849 |     segment = segments.find((entry) => entry.entryId === display.dataset.finalEntryId) || null;
 41850 |   } else {
 41851 |     if (!wheelDisc) return null;
 41852 |     segment = getEncounterSegmentAtPointer(rotationFromTransform(getComputedStyle(wheelDisc).transform), segments);
 41853 |   }
 41854 |   const name = finalName || segment?.displayName || "Ready";
 41855 |   const meta = finalMeta || (segment ? `${segment.category || "land"} / W${segment.weight || 1}` : "");
 41856 |   display.innerHTML = `
````


#### Hit 4 — line 47351

````text
 47337 |     alert("No valid Pokemon are available on this Encounter Wheel. Banned Pokemon are excluded.");
 47338 |     return;
 47339 |   }
 47340 |   const result = weightedEncounterEntry(entries);
 47341 |   if (!result) return;
 47342 |   session.pendingEntryId = result.id;
 47343 |   const nextRotation = nextEncounterLandingRotation(session, entries, result.id);
 47344 |   session.visualRotation = nextRotation;
 47345 |   if (state.skipWheelAnimation) {
 47346 |     completeEncounterRoll(session.id, result.id);
 47347 |     return;
 47348 |   }
 47349 |   session.isSpinning = true;
 47350 |   saveState();
 47351 |   const wheelVisual = els.encounterOverlay?.querySelector(".encounter-wheel-visual");
 47352 |   const wheelDisc = wheelVisual?.querySelector(".wheel-disc");
 47353 |   const latestResult = els.encounterOverlay?.querySelector(".wheel-latest-result");
 47354 |   const rollButton = els.encounterOverlay?.querySelector(`[data-encounter-roll="${session.id}"]`);
 47355 |   const liveDisplay = els.encounterOverlay?.querySelector("[data-encounter-live-display]");
 47356 |   if (liveDisplay) liveDisplay.dataset.finalEntryId = result.id;
 47357 |   if (wheelVisual && wheelDisc) {
 47358 |     wheelVisual.classList.add("spinning");
 47359 |     wheelDisc.getBoundingClientRect();
 47360 |     wheelDisc.style.setProperty("--wheel-rotation", `${Number(nextRotation || 0)}deg`);
 47361 |     animateEncounterLivePointer(els.encounterOverlay, 5200);
 47362 |   } else {
 47363 |     renderEncounterOverlay();
 47364 |   }
 47365 |   if (latestResult) {
````


#### Hit 5 — line 47353

````text
 47339 |   }
 47340 |   const result = weightedEncounterEntry(entries);
 47341 |   if (!result) return;
 47342 |   session.pendingEntryId = result.id;
 47343 |   const nextRotation = nextEncounterLandingRotation(session, entries, result.id);
 47344 |   session.visualRotation = nextRotation;
 47345 |   if (state.skipWheelAnimation) {
 47346 |     completeEncounterRoll(session.id, result.id);
 47347 |     return;
 47348 |   }
 47349 |   session.isSpinning = true;
 47350 |   saveState();
 47351 |   const wheelVisual = els.encounterOverlay?.querySelector(".encounter-wheel-visual");
 47352 |   const wheelDisc = wheelVisual?.querySelector(".wheel-disc");
 47353 |   const latestResult = els.encounterOverlay?.querySelector(".wheel-latest-result");
 47354 |   const rollButton = els.encounterOverlay?.querySelector(`[data-encounter-roll="${session.id}"]`);
 47355 |   const liveDisplay = els.encounterOverlay?.querySelector("[data-encounter-live-display]");
 47356 |   if (liveDisplay) liveDisplay.dataset.finalEntryId = result.id;
 47357 |   if (wheelVisual && wheelDisc) {
 47358 |     wheelVisual.classList.add("spinning");
 47359 |     wheelDisc.getBoundingClientRect();
 47360 |     wheelDisc.style.setProperty("--wheel-rotation", `${Number(nextRotation || 0)}deg`);
 47361 |     animateEncounterLivePointer(els.encounterOverlay, 5200);
 47362 |   } else {
 47363 |     renderEncounterOverlay();
 47364 |   }
 47365 |   if (latestResult) {
 47366 |     latestResult.innerHTML = "<span>Passing</span><strong>Spinning...</strong>";
 47367 |   }
````


#### Hit 6 — line 47354

````text
 47340 |   const result = weightedEncounterEntry(entries);
 47341 |   if (!result) return;
 47342 |   session.pendingEntryId = result.id;
 47343 |   const nextRotation = nextEncounterLandingRotation(session, entries, result.id);
 47344 |   session.visualRotation = nextRotation;
 47345 |   if (state.skipWheelAnimation) {
 47346 |     completeEncounterRoll(session.id, result.id);
 47347 |     return;
 47348 |   }
 47349 |   session.isSpinning = true;
 47350 |   saveState();
 47351 |   const wheelVisual = els.encounterOverlay?.querySelector(".encounter-wheel-visual");
 47352 |   const wheelDisc = wheelVisual?.querySelector(".wheel-disc");
 47353 |   const latestResult = els.encounterOverlay?.querySelector(".wheel-latest-result");
 47354 |   const rollButton = els.encounterOverlay?.querySelector(`[data-encounter-roll="${session.id}"]`);
 47355 |   const liveDisplay = els.encounterOverlay?.querySelector("[data-encounter-live-display]");
 47356 |   if (liveDisplay) liveDisplay.dataset.finalEntryId = result.id;
 47357 |   if (wheelVisual && wheelDisc) {
 47358 |     wheelVisual.classList.add("spinning");
 47359 |     wheelDisc.getBoundingClientRect();
 47360 |     wheelDisc.style.setProperty("--wheel-rotation", `${Number(nextRotation || 0)}deg`);
 47361 |     animateEncounterLivePointer(els.encounterOverlay, 5200);
 47362 |   } else {
 47363 |     renderEncounterOverlay();
 47364 |   }
 47365 |   if (latestResult) {
 47366 |     latestResult.innerHTML = "<span>Passing</span><strong>Spinning...</strong>";
 47367 |   }
 47368 |   if (rollButton) {
````


#### Hit 7 — line 47355

````text
 47341 |   if (!result) return;
 47342 |   session.pendingEntryId = result.id;
 47343 |   const nextRotation = nextEncounterLandingRotation(session, entries, result.id);
 47344 |   session.visualRotation = nextRotation;
 47345 |   if (state.skipWheelAnimation) {
 47346 |     completeEncounterRoll(session.id, result.id);
 47347 |     return;
 47348 |   }
 47349 |   session.isSpinning = true;
 47350 |   saveState();
 47351 |   const wheelVisual = els.encounterOverlay?.querySelector(".encounter-wheel-visual");
 47352 |   const wheelDisc = wheelVisual?.querySelector(".wheel-disc");
 47353 |   const latestResult = els.encounterOverlay?.querySelector(".wheel-latest-result");
 47354 |   const rollButton = els.encounterOverlay?.querySelector(`[data-encounter-roll="${session.id}"]`);
 47355 |   const liveDisplay = els.encounterOverlay?.querySelector("[data-encounter-live-display]");
 47356 |   if (liveDisplay) liveDisplay.dataset.finalEntryId = result.id;
 47357 |   if (wheelVisual && wheelDisc) {
 47358 |     wheelVisual.classList.add("spinning");
 47359 |     wheelDisc.getBoundingClientRect();
 47360 |     wheelDisc.style.setProperty("--wheel-rotation", `${Number(nextRotation || 0)}deg`);
 47361 |     animateEncounterLivePointer(els.encounterOverlay, 5200);
 47362 |   } else {
 47363 |     renderEncounterOverlay();
 47364 |   }
 47365 |   if (latestResult) {
 47366 |     latestResult.innerHTML = "<span>Passing</span><strong>Spinning...</strong>";
 47367 |   }
 47368 |   if (rollButton) {
 47369 |     rollButton.disabled = true;
````


#### Hit 8 — line 47361

````text
 47347 |     return;
 47348 |   }
 47349 |   session.isSpinning = true;
 47350 |   saveState();
 47351 |   const wheelVisual = els.encounterOverlay?.querySelector(".encounter-wheel-visual");
 47352 |   const wheelDisc = wheelVisual?.querySelector(".wheel-disc");
 47353 |   const latestResult = els.encounterOverlay?.querySelector(".wheel-latest-result");
 47354 |   const rollButton = els.encounterOverlay?.querySelector(`[data-encounter-roll="${session.id}"]`);
 47355 |   const liveDisplay = els.encounterOverlay?.querySelector("[data-encounter-live-display]");
 47356 |   if (liveDisplay) liveDisplay.dataset.finalEntryId = result.id;
 47357 |   if (wheelVisual && wheelDisc) {
 47358 |     wheelVisual.classList.add("spinning");
 47359 |     wheelDisc.getBoundingClientRect();
 47360 |     wheelDisc.style.setProperty("--wheel-rotation", `${Number(nextRotation || 0)}deg`);
 47361 |     animateEncounterLivePointer(els.encounterOverlay, 5200);
 47362 |   } else {
 47363 |     renderEncounterOverlay();
 47364 |   }
 47365 |   if (latestResult) {
 47366 |     latestResult.innerHTML = "<span>Passing</span><strong>Spinning...</strong>";
 47367 |   }
 47368 |   if (rollButton) {
 47369 |     rollButton.disabled = true;
 47370 |     rollButton.textContent = "Spinning...";
 47371 |   }
 47372 |   window.setTimeout(() => completeEncounterRoll(session.id, result.id), 5200);
 47373 | }
 47374 | 
 47375 | function closeEncounterSession(sessionId = state.selectedEncounterSessionId, { skipPendingGuard = false } = {}) {
````


#### Hit 9 — line 47405

````text
 47391 |   session.completedAt ||= new Date().toISOString();
 47392 |   (session.actionVisitIds || [session.actionVisitId]).filter(Boolean).forEach((visitId) => {
 47393 |     completeActionOperationForVisit(visitId, "encounter-session-closed");
 47394 |   });
 47395 |   const next = pendingEncounterSessions().find((entry) => entry.id !== session.id);
 47396 |   state.selectedEncounterSessionId = next?.id || "";
 47397 |   state.encounterModalOpen = Boolean(next);
 47398 |   saveState();
 47399 |   render();
 47400 | }
 47401 | 
 47402 | function renderEncounterOverlay() {
 47403 |   const pending = pendingEncounterSessions();
 47404 |   if (!pending.length) state.encounterModalOpen = false;
 47405 |   if (!els.encounterTab || !els.encounterOverlay || !els.encounterBody) return;
 47406 |   els.encounterTab.classList.toggle("hidden", !pending.length);
 47407 |   els.encounterTab.textContent = pending.length ? `Encounter (${pending.length})` : "Encounter";
 47408 |   const isOpen = Boolean(pending.length && state.encounterModalOpen);
 47409 |   els.encounterOverlay.classList.toggle("hidden", !isOpen);
 47410 |   els.encounterTab.setAttribute("aria-expanded", String(isOpen));
 47411 |   const session = selectedEncounterSession();
 47412 |   if (!pending.length || !session) {
 47413 |     els.encounterSessionList.innerHTML = "";
 47414 |     els.encounterBody.innerHTML = "";
 47415 |     return;
 47416 |   }
 47417 |   const definition = encounterWheelDefinition(session.series, session.gym);
 47418 |   const player = state.players.find((entry) => entry.id === session.playerId) || activePlayer();
 47419 |   const entries = encounterEntriesForSession(session);
````


#### Hit 10 — line 47409

````text
 47395 |   const next = pendingEncounterSessions().find((entry) => entry.id !== session.id);
 47396 |   state.selectedEncounterSessionId = next?.id || "";
 47397 |   state.encounterModalOpen = Boolean(next);
 47398 |   saveState();
 47399 |   render();
 47400 | }
 47401 | 
 47402 | function renderEncounterOverlay() {
 47403 |   const pending = pendingEncounterSessions();
 47404 |   if (!pending.length) state.encounterModalOpen = false;
 47405 |   if (!els.encounterTab || !els.encounterOverlay || !els.encounterBody) return;
 47406 |   els.encounterTab.classList.toggle("hidden", !pending.length);
 47407 |   els.encounterTab.textContent = pending.length ? `Encounter (${pending.length})` : "Encounter";
 47408 |   const isOpen = Boolean(pending.length && state.encounterModalOpen);
 47409 |   els.encounterOverlay.classList.toggle("hidden", !isOpen);
 47410 |   els.encounterTab.setAttribute("aria-expanded", String(isOpen));
 47411 |   const session = selectedEncounterSession();
 47412 |   if (!pending.length || !session) {
 47413 |     els.encounterSessionList.innerHTML = "";
 47414 |     els.encounterBody.innerHTML = "";
 47415 |     return;
 47416 |   }
 47417 |   const definition = encounterWheelDefinition(session.series, session.gym);
 47418 |   const player = state.players.find((entry) => entry.id === session.playerId) || activePlayer();
 47419 |   const entries = encounterEntriesForSession(session);
 47420 |   const removedEntries = (definition?.entries || []).filter((entry) => (session.removedEntryIds || []).includes(entry.id));
 47421 |   const max = Number(session.maxRolls || definition?.rollsPerAction || 2);
 47422 |   const rolls = session.rolls || [];
 47423 |   const isSpinning = Boolean(session.isSpinning);
````


#### Hit 11 — line 64030

````text
 64016 |     state.randomPokemonDrawerOpen = !state.randomPokemonDrawerOpen;
 64017 |     saveState();
 64018 |     renderRandomPokemonPanel();
 64019 |   });
 64020 |   els.encounterTab?.addEventListener("click", () => {
 64021 |     state.encounterModalOpen = !state.encounterModalOpen;
 64022 |     saveState();
 64023 |     renderEncounterOverlay();
 64024 |   });
 64025 |   els.closeEncounterOverlay?.addEventListener("click", () => {
 64026 |     state.encounterModalOpen = false;
 64027 |     saveState();
 64028 |     renderEncounterOverlay();
 64029 |   });
 64030 |   els.encounterOverlay?.addEventListener("click", (event) => {
 64031 |     if (event.target === els.encounterOverlay) {
 64032 |       state.encounterModalOpen = false;
 64033 |       saveState();
 64034 |       renderEncounterOverlay();
 64035 |       return;
 64036 |     }
 64037 |     event.stopPropagation();
 64038 |     const sessionButton = event.target.closest("[data-encounter-session]");
 64039 |     if (sessionButton) {
 64040 |       state.selectedEncounterSessionId = sessionButton.dataset.encounterSession;
 64041 |       saveState();
 64042 |       renderEncounterOverlay();
 64043 |       return;
 64044 |     }
````


#### Hit 12 — line 64031

````text
 64017 |     saveState();
 64018 |     renderRandomPokemonPanel();
 64019 |   });
 64020 |   els.encounterTab?.addEventListener("click", () => {
 64021 |     state.encounterModalOpen = !state.encounterModalOpen;
 64022 |     saveState();
 64023 |     renderEncounterOverlay();
 64024 |   });
 64025 |   els.closeEncounterOverlay?.addEventListener("click", () => {
 64026 |     state.encounterModalOpen = false;
 64027 |     saveState();
 64028 |     renderEncounterOverlay();
 64029 |   });
 64030 |   els.encounterOverlay?.addEventListener("click", (event) => {
 64031 |     if (event.target === els.encounterOverlay) {
 64032 |       state.encounterModalOpen = false;
 64033 |       saveState();
 64034 |       renderEncounterOverlay();
 64035 |       return;
 64036 |     }
 64037 |     event.stopPropagation();
 64038 |     const sessionButton = event.target.closest("[data-encounter-session]");
 64039 |     if (sessionButton) {
 64040 |       state.selectedEncounterSessionId = sessionButton.dataset.encounterSession;
 64041 |       saveState();
 64042 |       renderEncounterOverlay();
 64043 |       return;
 64044 |     }
 64045 |     const rollButton = event.target.closest("[data-encounter-roll]");
````

### includeFishing

Occurrences shown: 8


#### Hit 1 — line 41774

````text
 41760 | function selectedEncounterSession() {
 41761 |   const pending = pendingEncounterSessions();
 41762 |   if (!pending.length) return null;
 41763 |   let session = pending.find((entry) => entry.id === state.selectedEncounterSessionId);
 41764 |   if (!session) {
 41765 |     session = pending[0];
 41766 |     state.selectedEncounterSessionId = session.id;
 41767 |   }
 41768 |   return session;
 41769 | }
 41770 | 
 41771 | function encounterEntriesForSession(session) {
 41772 |   const definition = encounterWheelDefinition(session?.series, session?.gym);
 41773 |   if (!definition) return [];
 41774 |   const includeFishing = Boolean(session.includeFishing);
 41775 |   const includeSurf = Boolean(session.includeSurf);
 41776 |   const removed = new Set(session.removedEntryIds || []);
 41777 |   const baseEntries = (definition.entries || []).filter((entry) => {
 41778 |     if (removed.has(entry.id)) return false;
 41779 |     const category = String(entry.category || "land").toLowerCase();
 41780 |     if (category === "fishing" && !includeFishing) return false;
 41781 |     if (category === "surf" && !includeSurf) return false;
 41782 |     if (entry.enabledByDefault === false && !["fishing", "surf"].includes(category)) return false;
 41783 |     return currentPokemonRuleStatusByName(entry.pokemonName || entry.displayName) !== "Banned";
 41784 |   });
 41785 |   return [...baseEntries, ...(session.temporaryEntries || [])].map((entry) => ({
 41786 |     ...entry,
 41787 |     weight: Math.max(0, Number(session.weightOverrides?.[entry.id] ?? entry.weight ?? 1))
 41788 |   })).filter((entry) => Number(entry.weight) > 0);
````


#### Hit 2 — line 41774

````text
 41760 | function selectedEncounterSession() {
 41761 |   const pending = pendingEncounterSessions();
 41762 |   if (!pending.length) return null;
 41763 |   let session = pending.find((entry) => entry.id === state.selectedEncounterSessionId);
 41764 |   if (!session) {
 41765 |     session = pending[0];
 41766 |     state.selectedEncounterSessionId = session.id;
 41767 |   }
 41768 |   return session;
 41769 | }
 41770 | 
 41771 | function encounterEntriesForSession(session) {
 41772 |   const definition = encounterWheelDefinition(session?.series, session?.gym);
 41773 |   if (!definition) return [];
 41774 |   const includeFishing = Boolean(session.includeFishing);
 41775 |   const includeSurf = Boolean(session.includeSurf);
 41776 |   const removed = new Set(session.removedEntryIds || []);
 41777 |   const baseEntries = (definition.entries || []).filter((entry) => {
 41778 |     if (removed.has(entry.id)) return false;
 41779 |     const category = String(entry.category || "land").toLowerCase();
 41780 |     if (category === "fishing" && !includeFishing) return false;
 41781 |     if (category === "surf" && !includeSurf) return false;
 41782 |     if (entry.enabledByDefault === false && !["fishing", "surf"].includes(category)) return false;
 41783 |     return currentPokemonRuleStatusByName(entry.pokemonName || entry.displayName) !== "Banned";
 41784 |   });
 41785 |   return [...baseEntries, ...(session.temporaryEntries || [])].map((entry) => ({
 41786 |     ...entry,
 41787 |     weight: Math.max(0, Number(session.weightOverrides?.[entry.id] ?? entry.weight ?? 1))
 41788 |   })).filter((entry) => Number(entry.weight) > 0);
````


#### Hit 3 — line 41780

````text
 41766 |     state.selectedEncounterSessionId = session.id;
 41767 |   }
 41768 |   return session;
 41769 | }
 41770 | 
 41771 | function encounterEntriesForSession(session) {
 41772 |   const definition = encounterWheelDefinition(session?.series, session?.gym);
 41773 |   if (!definition) return [];
 41774 |   const includeFishing = Boolean(session.includeFishing);
 41775 |   const includeSurf = Boolean(session.includeSurf);
 41776 |   const removed = new Set(session.removedEntryIds || []);
 41777 |   const baseEntries = (definition.entries || []).filter((entry) => {
 41778 |     if (removed.has(entry.id)) return false;
 41779 |     const category = String(entry.category || "land").toLowerCase();
 41780 |     if (category === "fishing" && !includeFishing) return false;
 41781 |     if (category === "surf" && !includeSurf) return false;
 41782 |     if (entry.enabledByDefault === false && !["fishing", "surf"].includes(category)) return false;
 41783 |     return currentPokemonRuleStatusByName(entry.pokemonName || entry.displayName) !== "Banned";
 41784 |   });
 41785 |   return [...baseEntries, ...(session.temporaryEntries || [])].map((entry) => ({
 41786 |     ...entry,
 41787 |     weight: Math.max(0, Number(session.weightOverrides?.[entry.id] ?? entry.weight ?? 1))
 41788 |   })).filter((entry) => Number(entry.weight) > 0);
 41789 | }
 41790 | 
 41791 | function weightedEncounterEntry(entries) {
 41792 |   const totalWeight = entries.reduce((total, entry) => total + Number(entry.weight || 1), 0);
 41793 |   if (!entries.length || totalWeight <= 0) return null;
 41794 |   let roll = Math.random() * totalWeight;
````


#### Hit 4 — line 42762

````text
 42748 |   entry.details ||= [];
 42749 |   entry.childEvents ||= [];
 42750 |   entry.categories ||= [];
 42751 |   entry.tags ||= [];
 42752 |   if (updater) updater(entry);
 42753 |   const rolls = session.rolls || [];
 42754 |   const caughtNames = rolls.map((roll) => {
 42755 |     const result = (state.randomPokemonSessions || []).find((randomSession) => randomSession.id === roll.randomPokemonSessionId);
 42756 |     return result?.status === "confirmed" ? result.resultDisplayName : "";
 42757 |   }).filter(Boolean);
 42758 |   const lines = [
 42759 |     "Spent 1 Action at Encounter",
 42760 |     `Rolled ${rolls.length}/${session.maxRolls || 2} Encounters`,
 42761 |     caughtNames.length ? `Caught ${caughtNames.join(", ")}` : "",
 42762 |     session.includeFishing ? "Fishing included" : "",
 42763 |     session.includeSurf ? "Surf included" : "",
 42764 |     (session.removedEntryIds || []).length ? `Removed ${(session.removedEntryIds || []).length} option${session.removedEntryIds.length === 1 ? "" : "s"}` : ""
 42765 |   ].filter(Boolean);
 42766 |   entry.summary = lines.join("\n");
 42767 |   entry.details = [
 42768 |     `Active pool: ${encounterEntriesForSession(session).map((entry) => entry.displayName || entry.pokemonName).join(", ") || "None"}`,
 42769 |     `Fishing included: ${session.includeFishing ? "Yes" : "No"}`,
 42770 |     `Surf included: ${session.includeSurf ? "Yes" : "No"}`,
 42771 |     ...(session.removedEntryIds || []).map((id) => `Removed: ${id}`),
 42772 |     ...rolls.map((roll, index) => `Roll ${index + 1}: ${roll.resultDisplayName}`)
 42773 |   ];
 42774 |   entry.quantity = rolls.length;
 42775 |   entry.playerIds = [player.id];
 42776 |   entry.encounterSessionId = session.id;
````


#### Hit 5 — line 42769

````text
 42755 |     const result = (state.randomPokemonSessions || []).find((randomSession) => randomSession.id === roll.randomPokemonSessionId);
 42756 |     return result?.status === "confirmed" ? result.resultDisplayName : "";
 42757 |   }).filter(Boolean);
 42758 |   const lines = [
 42759 |     "Spent 1 Action at Encounter",
 42760 |     `Rolled ${rolls.length}/${session.maxRolls || 2} Encounters`,
 42761 |     caughtNames.length ? `Caught ${caughtNames.join(", ")}` : "",
 42762 |     session.includeFishing ? "Fishing included" : "",
 42763 |     session.includeSurf ? "Surf included" : "",
 42764 |     (session.removedEntryIds || []).length ? `Removed ${(session.removedEntryIds || []).length} option${session.removedEntryIds.length === 1 ? "" : "s"}` : ""
 42765 |   ].filter(Boolean);
 42766 |   entry.summary = lines.join("\n");
 42767 |   entry.details = [
 42768 |     `Active pool: ${encounterEntriesForSession(session).map((entry) => entry.displayName || entry.pokemonName).join(", ") || "None"}`,
 42769 |     `Fishing included: ${session.includeFishing ? "Yes" : "No"}`,
 42770 |     `Surf included: ${session.includeSurf ? "Yes" : "No"}`,
 42771 |     ...(session.removedEntryIds || []).map((id) => `Removed: ${id}`),
 42772 |     ...rolls.map((roll, index) => `Roll ${index + 1}: ${roll.resultDisplayName}`)
 42773 |   ];
 42774 |   entry.quantity = rolls.length;
 42775 |   entry.playerIds = [player.id];
 42776 |   entry.encounterSessionId = session.id;
 42777 |   return entry;
 42778 | }
 42779 | 
 42780 | function activeEncounterSessionForPlayer(playerId, series = state.series, gym = state.gym) {
 42781 |   return (state.encounterSessions || []).find((session) => session.playerId === playerId
 42782 |     && session.series === series
 42783 |     && Number(session.gym) === Number(gym)
````


#### Hit 6 — line 42844

````text
 42830 |     session.maxRolls = Number(session.maxRolls || 0) + Number(definition.rollsPerAction || 2);
 42831 |     if (session.status === "review") session.status = "pending";
 42832 |     session.updatedAt = new Date().toISOString();
 42833 |   } else {
 42834 |     session = {
 42835 |       id: `encounter-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
 42836 |       playerId: player.id,
 42837 |       series: state.series,
 42838 |       gym: Number(state.gym),
 42839 |       phase: "action",
 42840 |       actionVisitId: visit.id,
 42841 |       actionVisitIds: [visit.id],
 42842 |       wheelId: definition.id,
 42843 |       maxRolls: Number(definition.rollsPerAction || 2),
 42844 |       includeFishing: false,
 42845 |       includeSurf: false,
 42846 |       removedEntryIds: [],
 42847 |       temporaryEntries: [],
 42848 |       weightOverrides: {},
 42849 |       resultSessionIds: [],
 42850 |       rolls: [],
 42851 |       status: "pending",
 42852 |       visualRotation: 0,
 42853 |       createdAt: new Date().toISOString()
 42854 |     };
 42855 |     state.encounterSessions.unshift(session);
 42856 |   }
 42857 |   linkActionOperation(visit.id, { featureType: "encounter", featureSessionId: session.id });
 42858 |   state.selectedEncounterSessionId = session.id;
````


#### Hit 7 — line 47511

````text
 47497 |                 `}
 47498 |               </div>
 47499 |             </article>
 47500 |           `).join("") : `<p class="empty-state compact">Encounter results will appear here.</p>`}
 47501 |         </div>
 47502 |       </section>
 47503 |       <section class="encounter-controls">
 47504 |         <div class="wheel-meta">
 47505 |           <div><span>Trainer</span><strong>${escapeHtml(player.name)}</strong></div>
 47506 |           <div><span>Rolls</span><strong>${rolls.length}/${max}</strong></div>
 47507 |           <div><span>Active Options</span><strong>${entries.length}</strong></div>
 47508 |           <div><span>Rerolls</span><strong>Allowed</strong></div>
 47509 |         </div>
 47510 |         <div class="encounter-toggle-row">
 47511 |           <label><input type="checkbox" data-encounter-toggle="water" ${session.includeFishing || session.includeSurf ? "checked" : ""}> Include Fishing / Surf</label>
 47512 |           <label><input type="checkbox" data-encounter-weight-editing ${weightEditing ? "checked" : ""}${rolls.length ? " disabled" : ""}> Edit Weights</label>
 47513 |         </div>
 47514 |         <p class="gc-rule-note">Fishing and Surf are grouped for now. Later this should come from items/effects.</p>
 47515 |         <h3>Active Wheel Options</h3>
 47516 |         <div class="encounter-entry-list">
 47517 |           ${entries.map((entry) => `
 47518 |             <article class="encounter-entry${entry.id === finalEntryId ? " pointer-active" : ""}" data-encounter-entry-id="${escapeHtml(entry.id)}">
 47519 |               <div>
 47520 |                 <strong>${escapeHtml(entry.displayName || entry.pokemonName)}</strong>
 47521 |                 <span>${escapeHtml(entry.category || "land")}</span>
 47522 |               </div>
 47523 |               ${weightEditing ? `
 47524 |                 <label class="encounter-weight-control">
 47525 |                   Weight
````


#### Hit 8 — line 64060

````text
 64046 |     if (rollButton && !rollButton.disabled) {
 64047 |       spinEncounterWheel(rollButton.dataset.encounterRoll);
 64048 |       return;
 64049 |     }
 64050 |     const doneButton = event.target.closest("[data-encounter-done]");
 64051 |     if (doneButton) {
 64052 |       closeEncounterSession(doneButton.dataset.encounterDone);
 64053 |       return;
 64054 |     }
 64055 |     const toggle = event.target.closest("[data-encounter-toggle]");
 64056 |     if (toggle) {
 64057 |       const session = selectedEncounterSession();
 64058 |       if (!session || (session.rolls || []).length) return;
 64059 |       if (toggle.dataset.encounterToggle === "water") {
 64060 |         session.includeFishing = toggle.checked;
 64061 |         session.includeSurf = toggle.checked;
 64062 |       }
 64063 |       saveState();
 64064 |       renderEncounterOverlay();
 64065 |       return;
 64066 |     }
 64067 |     const weightEditingToggle = event.target.closest("[data-encounter-weight-editing]");
 64068 |     if (weightEditingToggle) {
 64069 |       const session = selectedEncounterSession();
 64070 |       if (!session || (session.rolls || []).length) return;
 64071 |       session.weightEditing = weightEditingToggle.checked;
 64072 |       saveState();
 64073 |       renderEncounterOverlay();
 64074 |       return;
````

### includeSurf

Occurrences shown: 8


#### Hit 1 — line 41775

````text
 41761 |   const pending = pendingEncounterSessions();
 41762 |   if (!pending.length) return null;
 41763 |   let session = pending.find((entry) => entry.id === state.selectedEncounterSessionId);
 41764 |   if (!session) {
 41765 |     session = pending[0];
 41766 |     state.selectedEncounterSessionId = session.id;
 41767 |   }
 41768 |   return session;
 41769 | }
 41770 | 
 41771 | function encounterEntriesForSession(session) {
 41772 |   const definition = encounterWheelDefinition(session?.series, session?.gym);
 41773 |   if (!definition) return [];
 41774 |   const includeFishing = Boolean(session.includeFishing);
 41775 |   const includeSurf = Boolean(session.includeSurf);
 41776 |   const removed = new Set(session.removedEntryIds || []);
 41777 |   const baseEntries = (definition.entries || []).filter((entry) => {
 41778 |     if (removed.has(entry.id)) return false;
 41779 |     const category = String(entry.category || "land").toLowerCase();
 41780 |     if (category === "fishing" && !includeFishing) return false;
 41781 |     if (category === "surf" && !includeSurf) return false;
 41782 |     if (entry.enabledByDefault === false && !["fishing", "surf"].includes(category)) return false;
 41783 |     return currentPokemonRuleStatusByName(entry.pokemonName || entry.displayName) !== "Banned";
 41784 |   });
 41785 |   return [...baseEntries, ...(session.temporaryEntries || [])].map((entry) => ({
 41786 |     ...entry,
 41787 |     weight: Math.max(0, Number(session.weightOverrides?.[entry.id] ?? entry.weight ?? 1))
 41788 |   })).filter((entry) => Number(entry.weight) > 0);
 41789 | }
````


#### Hit 2 — line 41775

````text
 41761 |   const pending = pendingEncounterSessions();
 41762 |   if (!pending.length) return null;
 41763 |   let session = pending.find((entry) => entry.id === state.selectedEncounterSessionId);
 41764 |   if (!session) {
 41765 |     session = pending[0];
 41766 |     state.selectedEncounterSessionId = session.id;
 41767 |   }
 41768 |   return session;
 41769 | }
 41770 | 
 41771 | function encounterEntriesForSession(session) {
 41772 |   const definition = encounterWheelDefinition(session?.series, session?.gym);
 41773 |   if (!definition) return [];
 41774 |   const includeFishing = Boolean(session.includeFishing);
 41775 |   const includeSurf = Boolean(session.includeSurf);
 41776 |   const removed = new Set(session.removedEntryIds || []);
 41777 |   const baseEntries = (definition.entries || []).filter((entry) => {
 41778 |     if (removed.has(entry.id)) return false;
 41779 |     const category = String(entry.category || "land").toLowerCase();
 41780 |     if (category === "fishing" && !includeFishing) return false;
 41781 |     if (category === "surf" && !includeSurf) return false;
 41782 |     if (entry.enabledByDefault === false && !["fishing", "surf"].includes(category)) return false;
 41783 |     return currentPokemonRuleStatusByName(entry.pokemonName || entry.displayName) !== "Banned";
 41784 |   });
 41785 |   return [...baseEntries, ...(session.temporaryEntries || [])].map((entry) => ({
 41786 |     ...entry,
 41787 |     weight: Math.max(0, Number(session.weightOverrides?.[entry.id] ?? entry.weight ?? 1))
 41788 |   })).filter((entry) => Number(entry.weight) > 0);
 41789 | }
````


#### Hit 3 — line 41781

````text
 41767 |   }
 41768 |   return session;
 41769 | }
 41770 | 
 41771 | function encounterEntriesForSession(session) {
 41772 |   const definition = encounterWheelDefinition(session?.series, session?.gym);
 41773 |   if (!definition) return [];
 41774 |   const includeFishing = Boolean(session.includeFishing);
 41775 |   const includeSurf = Boolean(session.includeSurf);
 41776 |   const removed = new Set(session.removedEntryIds || []);
 41777 |   const baseEntries = (definition.entries || []).filter((entry) => {
 41778 |     if (removed.has(entry.id)) return false;
 41779 |     const category = String(entry.category || "land").toLowerCase();
 41780 |     if (category === "fishing" && !includeFishing) return false;
 41781 |     if (category === "surf" && !includeSurf) return false;
 41782 |     if (entry.enabledByDefault === false && !["fishing", "surf"].includes(category)) return false;
 41783 |     return currentPokemonRuleStatusByName(entry.pokemonName || entry.displayName) !== "Banned";
 41784 |   });
 41785 |   return [...baseEntries, ...(session.temporaryEntries || [])].map((entry) => ({
 41786 |     ...entry,
 41787 |     weight: Math.max(0, Number(session.weightOverrides?.[entry.id] ?? entry.weight ?? 1))
 41788 |   })).filter((entry) => Number(entry.weight) > 0);
 41789 | }
 41790 | 
 41791 | function weightedEncounterEntry(entries) {
 41792 |   const totalWeight = entries.reduce((total, entry) => total + Number(entry.weight || 1), 0);
 41793 |   if (!entries.length || totalWeight <= 0) return null;
 41794 |   let roll = Math.random() * totalWeight;
 41795 |   for (const entry of entries) {
````


#### Hit 4 — line 42763

````text
 42749 |   entry.childEvents ||= [];
 42750 |   entry.categories ||= [];
 42751 |   entry.tags ||= [];
 42752 |   if (updater) updater(entry);
 42753 |   const rolls = session.rolls || [];
 42754 |   const caughtNames = rolls.map((roll) => {
 42755 |     const result = (state.randomPokemonSessions || []).find((randomSession) => randomSession.id === roll.randomPokemonSessionId);
 42756 |     return result?.status === "confirmed" ? result.resultDisplayName : "";
 42757 |   }).filter(Boolean);
 42758 |   const lines = [
 42759 |     "Spent 1 Action at Encounter",
 42760 |     `Rolled ${rolls.length}/${session.maxRolls || 2} Encounters`,
 42761 |     caughtNames.length ? `Caught ${caughtNames.join(", ")}` : "",
 42762 |     session.includeFishing ? "Fishing included" : "",
 42763 |     session.includeSurf ? "Surf included" : "",
 42764 |     (session.removedEntryIds || []).length ? `Removed ${(session.removedEntryIds || []).length} option${session.removedEntryIds.length === 1 ? "" : "s"}` : ""
 42765 |   ].filter(Boolean);
 42766 |   entry.summary = lines.join("\n");
 42767 |   entry.details = [
 42768 |     `Active pool: ${encounterEntriesForSession(session).map((entry) => entry.displayName || entry.pokemonName).join(", ") || "None"}`,
 42769 |     `Fishing included: ${session.includeFishing ? "Yes" : "No"}`,
 42770 |     `Surf included: ${session.includeSurf ? "Yes" : "No"}`,
 42771 |     ...(session.removedEntryIds || []).map((id) => `Removed: ${id}`),
 42772 |     ...rolls.map((roll, index) => `Roll ${index + 1}: ${roll.resultDisplayName}`)
 42773 |   ];
 42774 |   entry.quantity = rolls.length;
 42775 |   entry.playerIds = [player.id];
 42776 |   entry.encounterSessionId = session.id;
 42777 |   return entry;
````


#### Hit 5 — line 42770

````text
 42756 |     return result?.status === "confirmed" ? result.resultDisplayName : "";
 42757 |   }).filter(Boolean);
 42758 |   const lines = [
 42759 |     "Spent 1 Action at Encounter",
 42760 |     `Rolled ${rolls.length}/${session.maxRolls || 2} Encounters`,
 42761 |     caughtNames.length ? `Caught ${caughtNames.join(", ")}` : "",
 42762 |     session.includeFishing ? "Fishing included" : "",
 42763 |     session.includeSurf ? "Surf included" : "",
 42764 |     (session.removedEntryIds || []).length ? `Removed ${(session.removedEntryIds || []).length} option${session.removedEntryIds.length === 1 ? "" : "s"}` : ""
 42765 |   ].filter(Boolean);
 42766 |   entry.summary = lines.join("\n");
 42767 |   entry.details = [
 42768 |     `Active pool: ${encounterEntriesForSession(session).map((entry) => entry.displayName || entry.pokemonName).join(", ") || "None"}`,
 42769 |     `Fishing included: ${session.includeFishing ? "Yes" : "No"}`,
 42770 |     `Surf included: ${session.includeSurf ? "Yes" : "No"}`,
 42771 |     ...(session.removedEntryIds || []).map((id) => `Removed: ${id}`),
 42772 |     ...rolls.map((roll, index) => `Roll ${index + 1}: ${roll.resultDisplayName}`)
 42773 |   ];
 42774 |   entry.quantity = rolls.length;
 42775 |   entry.playerIds = [player.id];
 42776 |   entry.encounterSessionId = session.id;
 42777 |   return entry;
 42778 | }
 42779 | 
 42780 | function activeEncounterSessionForPlayer(playerId, series = state.series, gym = state.gym) {
 42781 |   return (state.encounterSessions || []).find((session) => session.playerId === playerId
 42782 |     && session.series === series
 42783 |     && Number(session.gym) === Number(gym)
 42784 |     && ["pending", "review"].includes(session.status));
````


#### Hit 6 — line 42845

````text
 42831 |     if (session.status === "review") session.status = "pending";
 42832 |     session.updatedAt = new Date().toISOString();
 42833 |   } else {
 42834 |     session = {
 42835 |       id: `encounter-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
 42836 |       playerId: player.id,
 42837 |       series: state.series,
 42838 |       gym: Number(state.gym),
 42839 |       phase: "action",
 42840 |       actionVisitId: visit.id,
 42841 |       actionVisitIds: [visit.id],
 42842 |       wheelId: definition.id,
 42843 |       maxRolls: Number(definition.rollsPerAction || 2),
 42844 |       includeFishing: false,
 42845 |       includeSurf: false,
 42846 |       removedEntryIds: [],
 42847 |       temporaryEntries: [],
 42848 |       weightOverrides: {},
 42849 |       resultSessionIds: [],
 42850 |       rolls: [],
 42851 |       status: "pending",
 42852 |       visualRotation: 0,
 42853 |       createdAt: new Date().toISOString()
 42854 |     };
 42855 |     state.encounterSessions.unshift(session);
 42856 |   }
 42857 |   linkActionOperation(visit.id, { featureType: "encounter", featureSessionId: session.id });
 42858 |   state.selectedEncounterSessionId = session.id;
 42859 |   state.encounterModalOpen = true;
````


#### Hit 7 — line 47511

````text
 47497 |                 `}
 47498 |               </div>
 47499 |             </article>
 47500 |           `).join("") : `<p class="empty-state compact">Encounter results will appear here.</p>`}
 47501 |         </div>
 47502 |       </section>
 47503 |       <section class="encounter-controls">
 47504 |         <div class="wheel-meta">
 47505 |           <div><span>Trainer</span><strong>${escapeHtml(player.name)}</strong></div>
 47506 |           <div><span>Rolls</span><strong>${rolls.length}/${max}</strong></div>
 47507 |           <div><span>Active Options</span><strong>${entries.length}</strong></div>
 47508 |           <div><span>Rerolls</span><strong>Allowed</strong></div>
 47509 |         </div>
 47510 |         <div class="encounter-toggle-row">
 47511 |           <label><input type="checkbox" data-encounter-toggle="water" ${session.includeFishing || session.includeSurf ? "checked" : ""}> Include Fishing / Surf</label>
 47512 |           <label><input type="checkbox" data-encounter-weight-editing ${weightEditing ? "checked" : ""}${rolls.length ? " disabled" : ""}> Edit Weights</label>
 47513 |         </div>
 47514 |         <p class="gc-rule-note">Fishing and Surf are grouped for now. Later this should come from items/effects.</p>
 47515 |         <h3>Active Wheel Options</h3>
 47516 |         <div class="encounter-entry-list">
 47517 |           ${entries.map((entry) => `
 47518 |             <article class="encounter-entry${entry.id === finalEntryId ? " pointer-active" : ""}" data-encounter-entry-id="${escapeHtml(entry.id)}">
 47519 |               <div>
 47520 |                 <strong>${escapeHtml(entry.displayName || entry.pokemonName)}</strong>
 47521 |                 <span>${escapeHtml(entry.category || "land")}</span>
 47522 |               </div>
 47523 |               ${weightEditing ? `
 47524 |                 <label class="encounter-weight-control">
 47525 |                   Weight
````


#### Hit 8 — line 64061

````text
 64047 |       spinEncounterWheel(rollButton.dataset.encounterRoll);
 64048 |       return;
 64049 |     }
 64050 |     const doneButton = event.target.closest("[data-encounter-done]");
 64051 |     if (doneButton) {
 64052 |       closeEncounterSession(doneButton.dataset.encounterDone);
 64053 |       return;
 64054 |     }
 64055 |     const toggle = event.target.closest("[data-encounter-toggle]");
 64056 |     if (toggle) {
 64057 |       const session = selectedEncounterSession();
 64058 |       if (!session || (session.rolls || []).length) return;
 64059 |       if (toggle.dataset.encounterToggle === "water") {
 64060 |         session.includeFishing = toggle.checked;
 64061 |         session.includeSurf = toggle.checked;
 64062 |       }
 64063 |       saveState();
 64064 |       renderEncounterOverlay();
 64065 |       return;
 64066 |     }
 64067 |     const weightEditingToggle = event.target.closest("[data-encounter-weight-editing]");
 64068 |     if (weightEditingToggle) {
 64069 |       const session = selectedEncounterSession();
 64070 |       if (!session || (session.rolls || []).length) return;
 64071 |       session.weightEditing = weightEditingToggle.checked;
 64072 |       saveState();
 64073 |       renderEncounterOverlay();
 64074 |       return;
 64075 |     }
````


## server.js — persisted version contract

### ACTION_PHASE_VERSION_V1

Occurrences shown: 4


#### Hit 1 — line 23

````text
     5 | const { createHash, randomBytes, randomUUID, timingSafeEqual } = require("crypto");
     6 | const gameShellContract = require("./game-shell-contract.js");
     7 | const saveCompactionRuntime = require("./save-compaction.js");
     8 | const interactionSituationLifecycle = require("./interaction-situation-lifecycle.js");
     9 | const provisionalDeclarationRuntime = require("./provisional-declaration-runtime.js");
    10 | const tokenEffectContract = require("./token-effect-contract.js");
    11 | const tokenInventoryRuntime = require("./token-inventory-runtime.js");
    12 | const tokenControlEffects = require("./token-control-effects.js");
    13 | 
    14 | const PORT = Number(process.env.PORT || 4173);
    15 | const ROOT = __dirname;
    16 | const DATA_DIR = process.env.RIVAL_SAGA_DATA_DIR
    17 |   ? path.resolve(process.env.RIVAL_SAGA_DATA_DIR)
    18 |   : path.join(ROOT, "data");
    19 | const GAMES_DIR = path.join(DATA_DIR, "games");
    20 | const TOKEN_ART_DIR = path.join(DATA_DIR, "token-art");
    21 | const USERS_FILE = path.join(DATA_DIR, "users.json");
    22 | const RULESET_PATCHES_FILE = path.join(DATA_DIR, "ruleset-patches.json");
    23 | const ACTION_PHASE_VERSION_V1 = "action-phase-v1-current-series";
    24 | const ACTION_PHASE_VERSION_V2 = "action-phase-v2-real-series";
    25 | const DEFAULT_ACTION_PHASE_VERSION = ACTION_PHASE_VERSION_V2;
    26 | const STATIC_FILES = new Set([
    27 |   "/",
    28 |   "/index.html",
    29 |   "/app.js",
    30 |   "/save-compaction.js",
    31 |   "/game-shell-contract.js",
    32 |   "/interaction-situation-lifecycle.js",
    33 |   "/provisional-declaration-runtime.js",
    34 |   "/encounter-token-runtime.js",
    35 |   "/token-effect-contract.js",
    36 |   "/token-control-effects.js",
    37 |   "/token-control-controller.js",
    38 |   "/token-result-summary.js",
    39 |   "/token-inventory-runtime.js",
    40 |   "/token-sandbox-session.js",
    41 |   "/token-qa-harness.html",
````


#### Hit 2 — line 626

````text
   608 |   game.state.interactionEvents.forEach((activity) => upsertGameActivity(game, activity, { incomingAuthoritative: true }));
   609 |   saveCompactionRuntime.compactUndoSnapshots({ log: [], interactionEvents: game.activity });
   610 |   saveCompactionRuntime.compactUndoSnapshots(game.state);
   611 |   game.activity = (game.activity || [])
   612 |     .sort((a, b) => Number(b.eventOrder || 0) - Number(a.eventOrder || 0)
   613 |       || new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
   614 | }
   615 | 
   616 | function parseSummaryScalar(rawValue) {
   617 |   const source = String(rawValue || "").trim().replace(/,$/, "");
   618 |   try {
   619 |     return JSON.parse(source);
   620 |   } catch {
   621 |     return undefined;
   622 |   }
   623 | }
   624 | 
   625 | function normalizeActionPhaseVersion(value) {
   626 |   if (value === ACTION_PHASE_VERSION_V1) return ACTION_PHASE_VERSION_V1;
   627 |   return value === ACTION_PHASE_VERSION_V2 ? ACTION_PHASE_VERSION_V2 : DEFAULT_ACTION_PHASE_VERSION;
   628 | }
   629 | 
   630 | function persistedActionPhaseVersion(game = {}) {
   631 |   const candidate = game.actionPhaseVersion || game.state?.ruleset?.actionPhaseVersion || game.state?.actionPhaseVersion;
   632 |   if (candidate) return normalizeActionPhaseVersion(candidate);
   633 |   return game.state ? ACTION_PHASE_VERSION_V1 : DEFAULT_ACTION_PHASE_VERSION;
   634 | }
   635 | 
   636 | function scanLargeGameSummary(file, fallbackId) {
   637 |   const summary = { id: fallbackId, members: [], state: { players: [] } };
   638 |   let inState = false;
   639 |   let inPlayers = false;
   640 |   let inMembers = false;
   641 |   let currentMember = null;
   642 |   let rulesetSchemaCaptured = false;
   643 |   const fd = fs.openSync(file, "r");
   644 |   const chunk = Buffer.allocUnsafe(1024 * 1024);
````


#### Hit 3 — line 626

````text
   608 |   game.state.interactionEvents.forEach((activity) => upsertGameActivity(game, activity, { incomingAuthoritative: true }));
   609 |   saveCompactionRuntime.compactUndoSnapshots({ log: [], interactionEvents: game.activity });
   610 |   saveCompactionRuntime.compactUndoSnapshots(game.state);
   611 |   game.activity = (game.activity || [])
   612 |     .sort((a, b) => Number(b.eventOrder || 0) - Number(a.eventOrder || 0)
   613 |       || new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
   614 | }
   615 | 
   616 | function parseSummaryScalar(rawValue) {
   617 |   const source = String(rawValue || "").trim().replace(/,$/, "");
   618 |   try {
   619 |     return JSON.parse(source);
   620 |   } catch {
   621 |     return undefined;
   622 |   }
   623 | }
   624 | 
   625 | function normalizeActionPhaseVersion(value) {
   626 |   if (value === ACTION_PHASE_VERSION_V1) return ACTION_PHASE_VERSION_V1;
   627 |   return value === ACTION_PHASE_VERSION_V2 ? ACTION_PHASE_VERSION_V2 : DEFAULT_ACTION_PHASE_VERSION;
   628 | }
   629 | 
   630 | function persistedActionPhaseVersion(game = {}) {
   631 |   const candidate = game.actionPhaseVersion || game.state?.ruleset?.actionPhaseVersion || game.state?.actionPhaseVersion;
   632 |   if (candidate) return normalizeActionPhaseVersion(candidate);
   633 |   return game.state ? ACTION_PHASE_VERSION_V1 : DEFAULT_ACTION_PHASE_VERSION;
   634 | }
   635 | 
   636 | function scanLargeGameSummary(file, fallbackId) {
   637 |   const summary = { id: fallbackId, members: [], state: { players: [] } };
   638 |   let inState = false;
   639 |   let inPlayers = false;
   640 |   let inMembers = false;
   641 |   let currentMember = null;
   642 |   let rulesetSchemaCaptured = false;
   643 |   const fd = fs.openSync(file, "r");
   644 |   const chunk = Buffer.allocUnsafe(1024 * 1024);
````


#### Hit 4 — line 633

````text
   615 | 
   616 | function parseSummaryScalar(rawValue) {
   617 |   const source = String(rawValue || "").trim().replace(/,$/, "");
   618 |   try {
   619 |     return JSON.parse(source);
   620 |   } catch {
   621 |     return undefined;
   622 |   }
   623 | }
   624 | 
   625 | function normalizeActionPhaseVersion(value) {
   626 |   if (value === ACTION_PHASE_VERSION_V1) return ACTION_PHASE_VERSION_V1;
   627 |   return value === ACTION_PHASE_VERSION_V2 ? ACTION_PHASE_VERSION_V2 : DEFAULT_ACTION_PHASE_VERSION;
   628 | }
   629 | 
   630 | function persistedActionPhaseVersion(game = {}) {
   631 |   const candidate = game.actionPhaseVersion || game.state?.ruleset?.actionPhaseVersion || game.state?.actionPhaseVersion;
   632 |   if (candidate) return normalizeActionPhaseVersion(candidate);
   633 |   return game.state ? ACTION_PHASE_VERSION_V1 : DEFAULT_ACTION_PHASE_VERSION;
   634 | }
   635 | 
   636 | function scanLargeGameSummary(file, fallbackId) {
   637 |   const summary = { id: fallbackId, members: [], state: { players: [] } };
   638 |   let inState = false;
   639 |   let inPlayers = false;
   640 |   let inMembers = false;
   641 |   let currentMember = null;
   642 |   let rulesetSchemaCaptured = false;
   643 |   const fd = fs.openSync(file, "r");
   644 |   const chunk = Buffer.allocUnsafe(1024 * 1024);
   645 |   let remainder = "";
   646 |   const visitLine = (line) => {
   647 |     const topLevel = line.match(/^  "(id|name|description|status|maxPlayers|createdAt|updatedAt|version|rulesetVersion|schemaVersion|actionPhaseVersion)": (.*)$/);
   648 |     if (topLevel) summary[topLevel[1]] = parseSummaryScalar(topLevel[2]);
   649 |     if (/^  "state": \{$/.test(line)) inState = true;
   650 |     else if (inState && /^  \},?$/.test(line)) inState = false;
   651 |     if (inState) {
````

### ACTION_PHASE_VERSION_V2

Occurrences shown: 4


#### Hit 1 — line 24

````text
     6 | const gameShellContract = require("./game-shell-contract.js");
     7 | const saveCompactionRuntime = require("./save-compaction.js");
     8 | const interactionSituationLifecycle = require("./interaction-situation-lifecycle.js");
     9 | const provisionalDeclarationRuntime = require("./provisional-declaration-runtime.js");
    10 | const tokenEffectContract = require("./token-effect-contract.js");
    11 | const tokenInventoryRuntime = require("./token-inventory-runtime.js");
    12 | const tokenControlEffects = require("./token-control-effects.js");
    13 | 
    14 | const PORT = Number(process.env.PORT || 4173);
    15 | const ROOT = __dirname;
    16 | const DATA_DIR = process.env.RIVAL_SAGA_DATA_DIR
    17 |   ? path.resolve(process.env.RIVAL_SAGA_DATA_DIR)
    18 |   : path.join(ROOT, "data");
    19 | const GAMES_DIR = path.join(DATA_DIR, "games");
    20 | const TOKEN_ART_DIR = path.join(DATA_DIR, "token-art");
    21 | const USERS_FILE = path.join(DATA_DIR, "users.json");
    22 | const RULESET_PATCHES_FILE = path.join(DATA_DIR, "ruleset-patches.json");
    23 | const ACTION_PHASE_VERSION_V1 = "action-phase-v1-current-series";
    24 | const ACTION_PHASE_VERSION_V2 = "action-phase-v2-real-series";
    25 | const DEFAULT_ACTION_PHASE_VERSION = ACTION_PHASE_VERSION_V2;
    26 | const STATIC_FILES = new Set([
    27 |   "/",
    28 |   "/index.html",
    29 |   "/app.js",
    30 |   "/save-compaction.js",
    31 |   "/game-shell-contract.js",
    32 |   "/interaction-situation-lifecycle.js",
    33 |   "/provisional-declaration-runtime.js",
    34 |   "/encounter-token-runtime.js",
    35 |   "/token-effect-contract.js",
    36 |   "/token-control-effects.js",
    37 |   "/token-control-controller.js",
    38 |   "/token-result-summary.js",
    39 |   "/token-inventory-runtime.js",
    40 |   "/token-sandbox-session.js",
    41 |   "/token-qa-harness.html",
    42 |   "/token-qa-browser.js",
````


#### Hit 2 — line 25

````text
     7 | const saveCompactionRuntime = require("./save-compaction.js");
     8 | const interactionSituationLifecycle = require("./interaction-situation-lifecycle.js");
     9 | const provisionalDeclarationRuntime = require("./provisional-declaration-runtime.js");
    10 | const tokenEffectContract = require("./token-effect-contract.js");
    11 | const tokenInventoryRuntime = require("./token-inventory-runtime.js");
    12 | const tokenControlEffects = require("./token-control-effects.js");
    13 | 
    14 | const PORT = Number(process.env.PORT || 4173);
    15 | const ROOT = __dirname;
    16 | const DATA_DIR = process.env.RIVAL_SAGA_DATA_DIR
    17 |   ? path.resolve(process.env.RIVAL_SAGA_DATA_DIR)
    18 |   : path.join(ROOT, "data");
    19 | const GAMES_DIR = path.join(DATA_DIR, "games");
    20 | const TOKEN_ART_DIR = path.join(DATA_DIR, "token-art");
    21 | const USERS_FILE = path.join(DATA_DIR, "users.json");
    22 | const RULESET_PATCHES_FILE = path.join(DATA_DIR, "ruleset-patches.json");
    23 | const ACTION_PHASE_VERSION_V1 = "action-phase-v1-current-series";
    24 | const ACTION_PHASE_VERSION_V2 = "action-phase-v2-real-series";
    25 | const DEFAULT_ACTION_PHASE_VERSION = ACTION_PHASE_VERSION_V2;
    26 | const STATIC_FILES = new Set([
    27 |   "/",
    28 |   "/index.html",
    29 |   "/app.js",
    30 |   "/save-compaction.js",
    31 |   "/game-shell-contract.js",
    32 |   "/interaction-situation-lifecycle.js",
    33 |   "/provisional-declaration-runtime.js",
    34 |   "/encounter-token-runtime.js",
    35 |   "/token-effect-contract.js",
    36 |   "/token-control-effects.js",
    37 |   "/token-control-controller.js",
    38 |   "/token-result-summary.js",
    39 |   "/token-inventory-runtime.js",
    40 |   "/token-sandbox-session.js",
    41 |   "/token-qa-harness.html",
    42 |   "/token-qa-browser.js",
    43 |   "/token-qa-browser.css",
````


#### Hit 3 — line 627

````text
   609 |   saveCompactionRuntime.compactUndoSnapshots({ log: [], interactionEvents: game.activity });
   610 |   saveCompactionRuntime.compactUndoSnapshots(game.state);
   611 |   game.activity = (game.activity || [])
   612 |     .sort((a, b) => Number(b.eventOrder || 0) - Number(a.eventOrder || 0)
   613 |       || new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
   614 | }
   615 | 
   616 | function parseSummaryScalar(rawValue) {
   617 |   const source = String(rawValue || "").trim().replace(/,$/, "");
   618 |   try {
   619 |     return JSON.parse(source);
   620 |   } catch {
   621 |     return undefined;
   622 |   }
   623 | }
   624 | 
   625 | function normalizeActionPhaseVersion(value) {
   626 |   if (value === ACTION_PHASE_VERSION_V1) return ACTION_PHASE_VERSION_V1;
   627 |   return value === ACTION_PHASE_VERSION_V2 ? ACTION_PHASE_VERSION_V2 : DEFAULT_ACTION_PHASE_VERSION;
   628 | }
   629 | 
   630 | function persistedActionPhaseVersion(game = {}) {
   631 |   const candidate = game.actionPhaseVersion || game.state?.ruleset?.actionPhaseVersion || game.state?.actionPhaseVersion;
   632 |   if (candidate) return normalizeActionPhaseVersion(candidate);
   633 |   return game.state ? ACTION_PHASE_VERSION_V1 : DEFAULT_ACTION_PHASE_VERSION;
   634 | }
   635 | 
   636 | function scanLargeGameSummary(file, fallbackId) {
   637 |   const summary = { id: fallbackId, members: [], state: { players: [] } };
   638 |   let inState = false;
   639 |   let inPlayers = false;
   640 |   let inMembers = false;
   641 |   let currentMember = null;
   642 |   let rulesetSchemaCaptured = false;
   643 |   const fd = fs.openSync(file, "r");
   644 |   const chunk = Buffer.allocUnsafe(1024 * 1024);
   645 |   let remainder = "";
````


#### Hit 4 — line 627

````text
   609 |   saveCompactionRuntime.compactUndoSnapshots({ log: [], interactionEvents: game.activity });
   610 |   saveCompactionRuntime.compactUndoSnapshots(game.state);
   611 |   game.activity = (game.activity || [])
   612 |     .sort((a, b) => Number(b.eventOrder || 0) - Number(a.eventOrder || 0)
   613 |       || new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
   614 | }
   615 | 
   616 | function parseSummaryScalar(rawValue) {
   617 |   const source = String(rawValue || "").trim().replace(/,$/, "");
   618 |   try {
   619 |     return JSON.parse(source);
   620 |   } catch {
   621 |     return undefined;
   622 |   }
   623 | }
   624 | 
   625 | function normalizeActionPhaseVersion(value) {
   626 |   if (value === ACTION_PHASE_VERSION_V1) return ACTION_PHASE_VERSION_V1;
   627 |   return value === ACTION_PHASE_VERSION_V2 ? ACTION_PHASE_VERSION_V2 : DEFAULT_ACTION_PHASE_VERSION;
   628 | }
   629 | 
   630 | function persistedActionPhaseVersion(game = {}) {
   631 |   const candidate = game.actionPhaseVersion || game.state?.ruleset?.actionPhaseVersion || game.state?.actionPhaseVersion;
   632 |   if (candidate) return normalizeActionPhaseVersion(candidate);
   633 |   return game.state ? ACTION_PHASE_VERSION_V1 : DEFAULT_ACTION_PHASE_VERSION;
   634 | }
   635 | 
   636 | function scanLargeGameSummary(file, fallbackId) {
   637 |   const summary = { id: fallbackId, members: [], state: { players: [] } };
   638 |   let inState = false;
   639 |   let inPlayers = false;
   640 |   let inMembers = false;
   641 |   let currentMember = null;
   642 |   let rulesetSchemaCaptured = false;
   643 |   const fd = fs.openSync(file, "r");
   644 |   const chunk = Buffer.allocUnsafe(1024 * 1024);
   645 |   let remainder = "";
````

### function normalizeActionPhaseVersion

Occurrences shown: 1


#### Hit 1 — line 625

````text
   607 |   game.activity = interactionSituationLifecycle.cleanActivityRecords(game.activity || []);
   608 |   game.state.interactionEvents.forEach((activity) => upsertGameActivity(game, activity, { incomingAuthoritative: true }));
   609 |   saveCompactionRuntime.compactUndoSnapshots({ log: [], interactionEvents: game.activity });
   610 |   saveCompactionRuntime.compactUndoSnapshots(game.state);
   611 |   game.activity = (game.activity || [])
   612 |     .sort((a, b) => Number(b.eventOrder || 0) - Number(a.eventOrder || 0)
   613 |       || new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
   614 | }
   615 | 
   616 | function parseSummaryScalar(rawValue) {
   617 |   const source = String(rawValue || "").trim().replace(/,$/, "");
   618 |   try {
   619 |     return JSON.parse(source);
   620 |   } catch {
   621 |     return undefined;
   622 |   }
   623 | }
   624 | 
   625 | function normalizeActionPhaseVersion(value) {
   626 |   if (value === ACTION_PHASE_VERSION_V1) return ACTION_PHASE_VERSION_V1;
   627 |   return value === ACTION_PHASE_VERSION_V2 ? ACTION_PHASE_VERSION_V2 : DEFAULT_ACTION_PHASE_VERSION;
   628 | }
   629 | 
   630 | function persistedActionPhaseVersion(game = {}) {
   631 |   const candidate = game.actionPhaseVersion || game.state?.ruleset?.actionPhaseVersion || game.state?.actionPhaseVersion;
   632 |   if (candidate) return normalizeActionPhaseVersion(candidate);
   633 |   return game.state ? ACTION_PHASE_VERSION_V1 : DEFAULT_ACTION_PHASE_VERSION;
   634 | }
   635 | 
   636 | function scanLargeGameSummary(file, fallbackId) {
   637 |   const summary = { id: fallbackId, members: [], state: { players: [] } };
   638 |   let inState = false;
   639 |   let inPlayers = false;
   640 |   let inMembers = false;
   641 |   let currentMember = null;
   642 |   let rulesetSchemaCaptured = false;
   643 |   const fd = fs.openSync(file, "r");
````

### function persistedActionPhaseVersion

Occurrences shown: 1


#### Hit 1 — line 630

````text
   612 |     .sort((a, b) => Number(b.eventOrder || 0) - Number(a.eventOrder || 0)
   613 |       || new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
   614 | }
   615 | 
   616 | function parseSummaryScalar(rawValue) {
   617 |   const source = String(rawValue || "").trim().replace(/,$/, "");
   618 |   try {
   619 |     return JSON.parse(source);
   620 |   } catch {
   621 |     return undefined;
   622 |   }
   623 | }
   624 | 
   625 | function normalizeActionPhaseVersion(value) {
   626 |   if (value === ACTION_PHASE_VERSION_V1) return ACTION_PHASE_VERSION_V1;
   627 |   return value === ACTION_PHASE_VERSION_V2 ? ACTION_PHASE_VERSION_V2 : DEFAULT_ACTION_PHASE_VERSION;
   628 | }
   629 | 
   630 | function persistedActionPhaseVersion(game = {}) {
   631 |   const candidate = game.actionPhaseVersion || game.state?.ruleset?.actionPhaseVersion || game.state?.actionPhaseVersion;
   632 |   if (candidate) return normalizeActionPhaseVersion(candidate);
   633 |   return game.state ? ACTION_PHASE_VERSION_V1 : DEFAULT_ACTION_PHASE_VERSION;
   634 | }
   635 | 
   636 | function scanLargeGameSummary(file, fallbackId) {
   637 |   const summary = { id: fallbackId, members: [], state: { players: [] } };
   638 |   let inState = false;
   639 |   let inPlayers = false;
   640 |   let inMembers = false;
   641 |   let currentMember = null;
   642 |   let rulesetSchemaCaptured = false;
   643 |   const fd = fs.openSync(file, "r");
   644 |   const chunk = Buffer.allocUnsafe(1024 * 1024);
   645 |   let remainder = "";
   646 |   const visitLine = (line) => {
   647 |     const topLevel = line.match(/^  "(id|name|description|status|maxPlayers|createdAt|updatedAt|version|rulesetVersion|schemaVersion|actionPhaseVersion)": (.*)$/);
   648 |     if (topLevel) summary[topLevel[1]] = parseSummaryScalar(topLevel[2]);
````

### actionPhaseVersion

Occurrences shown: 12+


#### Hit 1 — line 171

````text
   153 | function writeJsonFile(file, payload) {
   154 |   ensureDataDirs();
   155 |   const tmp = `${file}.tmp`;
   156 |   fs.writeFileSync(tmp, JSON.stringify(payload, null, 2));
   157 |   fs.renameSync(tmp, file);
   158 | }
   159 | 
   160 | function defaultGameRecord(gameId = "default", name = "Rival Saga Table") {
   161 |   return {
   162 |     id: safeGameId(gameId),
   163 |     name,
   164 |     description: "",
   165 |     status: "lobby",
   166 |     maxPlayers: 5,
   167 |     createdAt: nowIso(),
   168 |     updatedAt: nowIso(),
   169 |     version: 0,
   170 |     rulesetVersion: "S3-dev",
   171 |     actionPhaseVersion: DEFAULT_ACTION_PHASE_VERSION,
   172 |     rulesetPatchHistory: [],
   173 |     sandboxCommits: [],
   174 |     state: null,
   175 |     members: [],
   176 |     activity: []
   177 |   };
   178 | }
   179 | 
   180 | function normalizeUser(user = {}) {
   181 |   const displayName = String(user.displayName || user.name || "Guest Player").trim() || "Guest Player";
   182 |   const loginId = normalizeLoginId(user.loginId || user.id || displayName);
   183 |   const sagaAdminAlias = loginId === "sagaadmin" || safeUserId(displayName) === "sagaadmin";
   184 |   const role = sagaAdminAlias ? "admin" : String(user.role || "player");
   185 |   return {
   186 |     id: loginId,
   187 |     loginId,
   188 |     displayName,
   189 |     role,
````


#### Hit 2 — line 631

````text
   613 |       || new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
   614 | }
   615 | 
   616 | function parseSummaryScalar(rawValue) {
   617 |   const source = String(rawValue || "").trim().replace(/,$/, "");
   618 |   try {
   619 |     return JSON.parse(source);
   620 |   } catch {
   621 |     return undefined;
   622 |   }
   623 | }
   624 | 
   625 | function normalizeActionPhaseVersion(value) {
   626 |   if (value === ACTION_PHASE_VERSION_V1) return ACTION_PHASE_VERSION_V1;
   627 |   return value === ACTION_PHASE_VERSION_V2 ? ACTION_PHASE_VERSION_V2 : DEFAULT_ACTION_PHASE_VERSION;
   628 | }
   629 | 
   630 | function persistedActionPhaseVersion(game = {}) {
   631 |   const candidate = game.actionPhaseVersion || game.state?.ruleset?.actionPhaseVersion || game.state?.actionPhaseVersion;
   632 |   if (candidate) return normalizeActionPhaseVersion(candidate);
   633 |   return game.state ? ACTION_PHASE_VERSION_V1 : DEFAULT_ACTION_PHASE_VERSION;
   634 | }
   635 | 
   636 | function scanLargeGameSummary(file, fallbackId) {
   637 |   const summary = { id: fallbackId, members: [], state: { players: [] } };
   638 |   let inState = false;
   639 |   let inPlayers = false;
   640 |   let inMembers = false;
   641 |   let currentMember = null;
   642 |   let rulesetSchemaCaptured = false;
   643 |   const fd = fs.openSync(file, "r");
   644 |   const chunk = Buffer.allocUnsafe(1024 * 1024);
   645 |   let remainder = "";
   646 |   const visitLine = (line) => {
   647 |     const topLevel = line.match(/^  "(id|name|description|status|maxPlayers|createdAt|updatedAt|version|rulesetVersion|schemaVersion|actionPhaseVersion)": (.*)$/);
   648 |     if (topLevel) summary[topLevel[1]] = parseSummaryScalar(topLevel[2]);
   649 |     if (/^  "state": \{$/.test(line)) inState = true;
````


#### Hit 3 — line 631

````text
   613 |       || new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
   614 | }
   615 | 
   616 | function parseSummaryScalar(rawValue) {
   617 |   const source = String(rawValue || "").trim().replace(/,$/, "");
   618 |   try {
   619 |     return JSON.parse(source);
   620 |   } catch {
   621 |     return undefined;
   622 |   }
   623 | }
   624 | 
   625 | function normalizeActionPhaseVersion(value) {
   626 |   if (value === ACTION_PHASE_VERSION_V1) return ACTION_PHASE_VERSION_V1;
   627 |   return value === ACTION_PHASE_VERSION_V2 ? ACTION_PHASE_VERSION_V2 : DEFAULT_ACTION_PHASE_VERSION;
   628 | }
   629 | 
   630 | function persistedActionPhaseVersion(game = {}) {
   631 |   const candidate = game.actionPhaseVersion || game.state?.ruleset?.actionPhaseVersion || game.state?.actionPhaseVersion;
   632 |   if (candidate) return normalizeActionPhaseVersion(candidate);
   633 |   return game.state ? ACTION_PHASE_VERSION_V1 : DEFAULT_ACTION_PHASE_VERSION;
   634 | }
   635 | 
   636 | function scanLargeGameSummary(file, fallbackId) {
   637 |   const summary = { id: fallbackId, members: [], state: { players: [] } };
   638 |   let inState = false;
   639 |   let inPlayers = false;
   640 |   let inMembers = false;
   641 |   let currentMember = null;
   642 |   let rulesetSchemaCaptured = false;
   643 |   const fd = fs.openSync(file, "r");
   644 |   const chunk = Buffer.allocUnsafe(1024 * 1024);
   645 |   let remainder = "";
   646 |   const visitLine = (line) => {
   647 |     const topLevel = line.match(/^  "(id|name|description|status|maxPlayers|createdAt|updatedAt|version|rulesetVersion|schemaVersion|actionPhaseVersion)": (.*)$/);
   648 |     if (topLevel) summary[topLevel[1]] = parseSummaryScalar(topLevel[2]);
   649 |     if (/^  "state": \{$/.test(line)) inState = true;
````


#### Hit 4 — line 631

````text
   613 |       || new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
   614 | }
   615 | 
   616 | function parseSummaryScalar(rawValue) {
   617 |   const source = String(rawValue || "").trim().replace(/,$/, "");
   618 |   try {
   619 |     return JSON.parse(source);
   620 |   } catch {
   621 |     return undefined;
   622 |   }
   623 | }
   624 | 
   625 | function normalizeActionPhaseVersion(value) {
   626 |   if (value === ACTION_PHASE_VERSION_V1) return ACTION_PHASE_VERSION_V1;
   627 |   return value === ACTION_PHASE_VERSION_V2 ? ACTION_PHASE_VERSION_V2 : DEFAULT_ACTION_PHASE_VERSION;
   628 | }
   629 | 
   630 | function persistedActionPhaseVersion(game = {}) {
   631 |   const candidate = game.actionPhaseVersion || game.state?.ruleset?.actionPhaseVersion || game.state?.actionPhaseVersion;
   632 |   if (candidate) return normalizeActionPhaseVersion(candidate);
   633 |   return game.state ? ACTION_PHASE_VERSION_V1 : DEFAULT_ACTION_PHASE_VERSION;
   634 | }
   635 | 
   636 | function scanLargeGameSummary(file, fallbackId) {
   637 |   const summary = { id: fallbackId, members: [], state: { players: [] } };
   638 |   let inState = false;
   639 |   let inPlayers = false;
   640 |   let inMembers = false;
   641 |   let currentMember = null;
   642 |   let rulesetSchemaCaptured = false;
   643 |   const fd = fs.openSync(file, "r");
   644 |   const chunk = Buffer.allocUnsafe(1024 * 1024);
   645 |   let remainder = "";
   646 |   const visitLine = (line) => {
   647 |     const topLevel = line.match(/^  "(id|name|description|status|maxPlayers|createdAt|updatedAt|version|rulesetVersion|schemaVersion|actionPhaseVersion)": (.*)$/);
   648 |     if (topLevel) summary[topLevel[1]] = parseSummaryScalar(topLevel[2]);
   649 |     if (/^  "state": \{$/.test(line)) inState = true;
````


#### Hit 5 — line 647

````text
   629 | 
   630 | function persistedActionPhaseVersion(game = {}) {
   631 |   const candidate = game.actionPhaseVersion || game.state?.ruleset?.actionPhaseVersion || game.state?.actionPhaseVersion;
   632 |   if (candidate) return normalizeActionPhaseVersion(candidate);
   633 |   return game.state ? ACTION_PHASE_VERSION_V1 : DEFAULT_ACTION_PHASE_VERSION;
   634 | }
   635 | 
   636 | function scanLargeGameSummary(file, fallbackId) {
   637 |   const summary = { id: fallbackId, members: [], state: { players: [] } };
   638 |   let inState = false;
   639 |   let inPlayers = false;
   640 |   let inMembers = false;
   641 |   let currentMember = null;
   642 |   let rulesetSchemaCaptured = false;
   643 |   const fd = fs.openSync(file, "r");
   644 |   const chunk = Buffer.allocUnsafe(1024 * 1024);
   645 |   let remainder = "";
   646 |   const visitLine = (line) => {
   647 |     const topLevel = line.match(/^  "(id|name|description|status|maxPlayers|createdAt|updatedAt|version|rulesetVersion|schemaVersion|actionPhaseVersion)": (.*)$/);
   648 |     if (topLevel) summary[topLevel[1]] = parseSummaryScalar(topLevel[2]);
   649 |     if (/^  "state": \{$/.test(line)) inState = true;
   650 |     else if (inState && /^  \},?$/.test(line)) inState = false;
   651 |     if (inState) {
   652 |       const stateValue = line.match(/^    "(series|gym|currentPhase|schemaVersion)": (.*)$/);
   653 |       if (stateValue) summary.state[stateValue[1]] = parseSummaryScalar(stateValue[2]);
   654 |       if (!rulesetSchemaCaptured) {
   655 |         const rulesetSchema = line.match(/^      "schemaVersion": (.*)$/);
   656 |         if (rulesetSchema) {
   657 |           summary.state.ruleset = { schemaVersion: parseSummaryScalar(rulesetSchema[1]) };
   658 |           rulesetSchemaCaptured = true;
   659 |         }
   660 |       }
   661 |       const rulesetActionPhaseVersion = line.match(/^      "actionPhaseVersion": (.*)$/);
   662 |       if (rulesetActionPhaseVersion) {
   663 |         summary.state.ruleset ||= {};
   664 |         summary.state.ruleset.actionPhaseVersion = parseSummaryScalar(rulesetActionPhaseVersion[1]);
   665 |       }
````


#### Hit 6 — line 661

````text
   643 |   const fd = fs.openSync(file, "r");
   644 |   const chunk = Buffer.allocUnsafe(1024 * 1024);
   645 |   let remainder = "";
   646 |   const visitLine = (line) => {
   647 |     const topLevel = line.match(/^  "(id|name|description|status|maxPlayers|createdAt|updatedAt|version|rulesetVersion|schemaVersion|actionPhaseVersion)": (.*)$/);
   648 |     if (topLevel) summary[topLevel[1]] = parseSummaryScalar(topLevel[2]);
   649 |     if (/^  "state": \{$/.test(line)) inState = true;
   650 |     else if (inState && /^  \},?$/.test(line)) inState = false;
   651 |     if (inState) {
   652 |       const stateValue = line.match(/^    "(series|gym|currentPhase|schemaVersion)": (.*)$/);
   653 |       if (stateValue) summary.state[stateValue[1]] = parseSummaryScalar(stateValue[2]);
   654 |       if (!rulesetSchemaCaptured) {
   655 |         const rulesetSchema = line.match(/^      "schemaVersion": (.*)$/);
   656 |         if (rulesetSchema) {
   657 |           summary.state.ruleset = { schemaVersion: parseSummaryScalar(rulesetSchema[1]) };
   658 |           rulesetSchemaCaptured = true;
   659 |         }
   660 |       }
   661 |       const rulesetActionPhaseVersion = line.match(/^      "actionPhaseVersion": (.*)$/);
   662 |       if (rulesetActionPhaseVersion) {
   663 |         summary.state.ruleset ||= {};
   664 |         summary.state.ruleset.actionPhaseVersion = parseSummaryScalar(rulesetActionPhaseVersion[1]);
   665 |       }
   666 |       if (/^    "players": \[$/.test(line)) inPlayers = true;
   667 |       else if (inPlayers && /^    \],?$/.test(line)) inPlayers = false;
   668 |       else if (inPlayers && /^      \{$/.test(line)) summary.state.players.push({});
   669 |     }
   670 |     if (/^  "members": \[$/.test(line)) inMembers = true;
   671 |     else if (inMembers && /^  \],?$/.test(line)) {
   672 |       if (currentMember) summary.members.push(currentMember);
   673 |       currentMember = null;
   674 |       inMembers = false;
   675 |     } else if (inMembers) {
   676 |       const stringMember = line.match(/^    (".*")(?:,)?$/);
   677 |       if (stringMember) summary.members.push(parseSummaryScalar(stringMember[1]));
   678 |       if (/^    \{$/.test(line)) currentMember = {};
   679 |       const memberValue = line.match(/^      "(userId|id|role)": (.*)$/);
````


#### Hit 7 — line 664

````text
   646 |   const visitLine = (line) => {
   647 |     const topLevel = line.match(/^  "(id|name|description|status|maxPlayers|createdAt|updatedAt|version|rulesetVersion|schemaVersion|actionPhaseVersion)": (.*)$/);
   648 |     if (topLevel) summary[topLevel[1]] = parseSummaryScalar(topLevel[2]);
   649 |     if (/^  "state": \{$/.test(line)) inState = true;
   650 |     else if (inState && /^  \},?$/.test(line)) inState = false;
   651 |     if (inState) {
   652 |       const stateValue = line.match(/^    "(series|gym|currentPhase|schemaVersion)": (.*)$/);
   653 |       if (stateValue) summary.state[stateValue[1]] = parseSummaryScalar(stateValue[2]);
   654 |       if (!rulesetSchemaCaptured) {
   655 |         const rulesetSchema = line.match(/^      "schemaVersion": (.*)$/);
   656 |         if (rulesetSchema) {
   657 |           summary.state.ruleset = { schemaVersion: parseSummaryScalar(rulesetSchema[1]) };
   658 |           rulesetSchemaCaptured = true;
   659 |         }
   660 |       }
   661 |       const rulesetActionPhaseVersion = line.match(/^      "actionPhaseVersion": (.*)$/);
   662 |       if (rulesetActionPhaseVersion) {
   663 |         summary.state.ruleset ||= {};
   664 |         summary.state.ruleset.actionPhaseVersion = parseSummaryScalar(rulesetActionPhaseVersion[1]);
   665 |       }
   666 |       if (/^    "players": \[$/.test(line)) inPlayers = true;
   667 |       else if (inPlayers && /^    \],?$/.test(line)) inPlayers = false;
   668 |       else if (inPlayers && /^      \{$/.test(line)) summary.state.players.push({});
   669 |     }
   670 |     if (/^  "members": \[$/.test(line)) inMembers = true;
   671 |     else if (inMembers && /^  \],?$/.test(line)) {
   672 |       if (currentMember) summary.members.push(currentMember);
   673 |       currentMember = null;
   674 |       inMembers = false;
   675 |     } else if (inMembers) {
   676 |       const stringMember = line.match(/^    (".*")(?:,)?$/);
   677 |       if (stringMember) summary.members.push(parseSummaryScalar(stringMember[1]));
   678 |       if (/^    \{$/.test(line)) currentMember = {};
   679 |       const memberValue = line.match(/^      "(userId|id|role)": (.*)$/);
   680 |       if (memberValue && currentMember) currentMember[memberValue[1]] = parseSummaryScalar(memberValue[2]);
   681 |       if (/^    \},?$/.test(line) && currentMember) {
   682 |         summary.members.push(currentMember);
````


#### Hit 8 — line 1621

````text
  1603 |     else patchesPayload.patches.unshift(patch);
  1604 |     writeRulesetPatches(patchesPayload);
  1605 |     return sendJson(res, existingIndex >= 0 ? 200 : 201, { patch });
  1606 |   }
  1607 |   if (url.pathname === "/api/games" && req.method === "GET") {
  1608 |     const gameIndex = listGames();
  1609 |     return sendJson(res, 200, { games: gameIndex.games, gameIndex });
  1610 |   }
  1611 |   if (url.pathname === "/api/games" && req.method === "POST") {
  1612 |     const body = await readBody(req);
  1613 |     const id = safeGameId(body.id || body.name || randomUUID().slice(0, 8));
  1614 |     const existing = fs.existsSync(gamePath(id));
  1615 |     if (existing) return sendError(res, 409, "A game with that id already exists.");
  1616 |     const game = defaultGameRecord(id, body.name || "Rival Saga Table");
  1617 |     game.description = body.description || "";
  1618 |     game.status = body.status || "lobby";
  1619 |     game.maxPlayers = Math.max(2, Math.min(12, Number(body.maxPlayers || 5)));
  1620 |     game.rulesetVersion = body.rulesetVersion || game.rulesetVersion;
  1621 |     game.actionPhaseVersion = normalizeActionPhaseVersion(body.actionPhaseVersion || game.actionPhaseVersion);
  1622 |     game.members = Array.isArray(body.members) ? body.members.map((member) => typeof member === "string" ? { userId: safeUserId(member), role: "player" } : {
  1623 |       userId: safeUserId(member.userId || member.id),
  1624 |       role: member.role || "player"
  1625 |     }).filter((member) => member.userId) : [];
  1626 |     writeGame(game);
  1627 |     game.members.forEach((member) => addGameMembership(game.id, member.userId, member.role));
  1628 |     return sendJson(res, 201, { game });
  1629 |   }
  1630 |   const gameDeleteMatch = url.pathname.match(/^\/api\/games\/([^/]+)(?:\/delete)?$/);
  1631 |   if (gameDeleteMatch && (req.method === "DELETE" || (req.method === "POST" && url.pathname.endsWith("/delete")))) {
  1632 |     const gameId = safeGameId(gameDeleteMatch[1]);
  1633 |     const body = await readBody(req);
  1634 |     if (!userCanManageSite(body.userId)) return sendError(res, 403, "Site admin access is required to delete game lobbies.");
  1635 |     if (!fs.existsSync(gamePath(gameId))) return sendError(res, 404, "Game not found.");
  1636 |     const deletedGame = readGame(gameId);
  1637 |     const usersPayload = readUsers();
  1638 |     usersPayload.users = usersPayload.users.map((user) => ({
  1639 |       ...user,
````


#### Hit 9 — line 1621

````text
  1603 |     else patchesPayload.patches.unshift(patch);
  1604 |     writeRulesetPatches(patchesPayload);
  1605 |     return sendJson(res, existingIndex >= 0 ? 200 : 201, { patch });
  1606 |   }
  1607 |   if (url.pathname === "/api/games" && req.method === "GET") {
  1608 |     const gameIndex = listGames();
  1609 |     return sendJson(res, 200, { games: gameIndex.games, gameIndex });
  1610 |   }
  1611 |   if (url.pathname === "/api/games" && req.method === "POST") {
  1612 |     const body = await readBody(req);
  1613 |     const id = safeGameId(body.id || body.name || randomUUID().slice(0, 8));
  1614 |     const existing = fs.existsSync(gamePath(id));
  1615 |     if (existing) return sendError(res, 409, "A game with that id already exists.");
  1616 |     const game = defaultGameRecord(id, body.name || "Rival Saga Table");
  1617 |     game.description = body.description || "";
  1618 |     game.status = body.status || "lobby";
  1619 |     game.maxPlayers = Math.max(2, Math.min(12, Number(body.maxPlayers || 5)));
  1620 |     game.rulesetVersion = body.rulesetVersion || game.rulesetVersion;
  1621 |     game.actionPhaseVersion = normalizeActionPhaseVersion(body.actionPhaseVersion || game.actionPhaseVersion);
  1622 |     game.members = Array.isArray(body.members) ? body.members.map((member) => typeof member === "string" ? { userId: safeUserId(member), role: "player" } : {
  1623 |       userId: safeUserId(member.userId || member.id),
  1624 |       role: member.role || "player"
  1625 |     }).filter((member) => member.userId) : [];
  1626 |     writeGame(game);
  1627 |     game.members.forEach((member) => addGameMembership(game.id, member.userId, member.role));
  1628 |     return sendJson(res, 201, { game });
  1629 |   }
  1630 |   const gameDeleteMatch = url.pathname.match(/^\/api\/games\/([^/]+)(?:\/delete)?$/);
  1631 |   if (gameDeleteMatch && (req.method === "DELETE" || (req.method === "POST" && url.pathname.endsWith("/delete")))) {
  1632 |     const gameId = safeGameId(gameDeleteMatch[1]);
  1633 |     const body = await readBody(req);
  1634 |     if (!userCanManageSite(body.userId)) return sendError(res, 403, "Site admin access is required to delete game lobbies.");
  1635 |     if (!fs.existsSync(gamePath(gameId))) return sendError(res, 404, "Game not found.");
  1636 |     const deletedGame = readGame(gameId);
  1637 |     const usersPayload = readUsers();
  1638 |     usersPayload.users = usersPayload.users.map((user) => ({
  1639 |       ...user,
````


#### Hit 10 — line 1621

````text
  1603 |     else patchesPayload.patches.unshift(patch);
  1604 |     writeRulesetPatches(patchesPayload);
  1605 |     return sendJson(res, existingIndex >= 0 ? 200 : 201, { patch });
  1606 |   }
  1607 |   if (url.pathname === "/api/games" && req.method === "GET") {
  1608 |     const gameIndex = listGames();
  1609 |     return sendJson(res, 200, { games: gameIndex.games, gameIndex });
  1610 |   }
  1611 |   if (url.pathname === "/api/games" && req.method === "POST") {
  1612 |     const body = await readBody(req);
  1613 |     const id = safeGameId(body.id || body.name || randomUUID().slice(0, 8));
  1614 |     const existing = fs.existsSync(gamePath(id));
  1615 |     if (existing) return sendError(res, 409, "A game with that id already exists.");
  1616 |     const game = defaultGameRecord(id, body.name || "Rival Saga Table");
  1617 |     game.description = body.description || "";
  1618 |     game.status = body.status || "lobby";
  1619 |     game.maxPlayers = Math.max(2, Math.min(12, Number(body.maxPlayers || 5)));
  1620 |     game.rulesetVersion = body.rulesetVersion || game.rulesetVersion;
  1621 |     game.actionPhaseVersion = normalizeActionPhaseVersion(body.actionPhaseVersion || game.actionPhaseVersion);
  1622 |     game.members = Array.isArray(body.members) ? body.members.map((member) => typeof member === "string" ? { userId: safeUserId(member), role: "player" } : {
  1623 |       userId: safeUserId(member.userId || member.id),
  1624 |       role: member.role || "player"
  1625 |     }).filter((member) => member.userId) : [];
  1626 |     writeGame(game);
  1627 |     game.members.forEach((member) => addGameMembership(game.id, member.userId, member.role));
  1628 |     return sendJson(res, 201, { game });
  1629 |   }
  1630 |   const gameDeleteMatch = url.pathname.match(/^\/api\/games\/([^/]+)(?:\/delete)?$/);
  1631 |   if (gameDeleteMatch && (req.method === "DELETE" || (req.method === "POST" && url.pathname.endsWith("/delete")))) {
  1632 |     const gameId = safeGameId(gameDeleteMatch[1]);
  1633 |     const body = await readBody(req);
  1634 |     if (!userCanManageSite(body.userId)) return sendError(res, 403, "Site admin access is required to delete game lobbies.");
  1635 |     if (!fs.existsSync(gamePath(gameId))) return sendError(res, 404, "Game not found.");
  1636 |     const deletedGame = readGame(gameId);
  1637 |     const usersPayload = readUsers();
  1638 |     usersPayload.users = usersPayload.users.map((user) => ({
  1639 |       ...user,
````


#### Hit 11 — line 2162

````text
  2144 |     let storageCompacted = false;
  2145 |     if (game.state) {
  2146 |       const compacted = compactGameStateForStorage(game.id, game.state, {
  2147 |         compactUndoSnapshots: true,
  2148 |         persistTokenArt: false
  2149 |       });
  2150 |       storageCompacted = compacted.changed;
  2151 |       if (compacted.changed) game.state = compacted.state;
  2152 |     }
  2153 |     const users = readUsers().users;
  2154 |     const memberIds = (game.members || []).map((member) => typeof member === "string" ? member : member.userId || member.id || "").map(safeUserId);
  2155 |     return sendJson(res, 200, {
  2156 |       gameId: game.id,
  2157 |       name: game.name,
  2158 |       version: game.version,
  2159 |       updatedAt: game.updatedAt,
  2160 |       storageCompacted,
  2161 |       rulesetVersion: game.rulesetVersion,
  2162 |       actionPhaseVersion: persistedActionPhaseVersion(game),
  2163 |       sandboxCommits: Array.isArray(game.sandboxCommits) ? game.sandboxCommits : [],
  2164 |       members: memberIds.map((userId) => ({
  2165 |         userId,
  2166 |         displayName: users.find((user) => user.id === userId)?.displayName || userId,
  2167 |         role: (game.members || []).find((member) => safeUserId(typeof member === "string" ? member : member.userId || member.id) === userId)?.role || "player"
  2168 |       })),
  2169 |       state: sanitizeSharedGamePayloadForDelivery(game.state)
  2170 |     });
  2171 |   }
  2172 | 
  2173 |   if (resource === "state" && req.method === "PUT") {
  2174 |     const body = await readBody(req);
  2175 |     if (!body || !isPlainObject(body.state)) {
  2176 |       return sendError(res, 400, "state object is required");
  2177 |     }
  2178 |     const game = readGame(gameId);
  2179 |     const timingConflict = authoritativeTimingOverwriteConflict(game.state, body.state);
  2180 |     if (timingConflict) {
````


#### Hit 12 — line 2229

````text
  2211 |         return sendJson(res, 400, { error: "expectedVersion must be a non-negative integer" });
  2212 |       }
  2213 |       if (expectedVersion !== Number(game.version || 0)) {
  2214 |         return sendJson(res, 409, {
  2215 |           error: "version-conflict",
  2216 |           expectedVersion,
  2217 |           currentVersion: Number(game.version || 0),
  2218 |           updatedAt: game.updatedAt
  2219 |         });
  2220 |       }
  2221 |     }
  2222 |     if (body.commitType === "token-scenario" && !sandboxSessionId) {
  2223 |       return sendJson(res, 400, { error: "sandboxSessionId is required for a Token scenario commit" });
  2224 |     }
  2225 |     game.state = compactGameStateForStorage(game.id, body.state, { compactUndoSnapshots: true }).state;
  2226 |     syncGameActivitiesFromState(game);
  2227 |     game.name = body.name || game.name;
  2228 |     game.rulesetVersion = game.state?.ruleset?.version || game.rulesetVersion;
  2229 |     game.actionPhaseVersion = persistedActionPhaseVersion(game);
  2230 |     game.version = Number(game.version || 0) + 1;
  2231 |     game.updatedAt = nowIso();
  2232 |     if (body.commitType === "token-scenario") {
  2233 |       const stateCommit = (body.state.sandboxCommitHistory || []).find((record) => record.sessionId === sandboxSessionId) || {};
  2234 |       game.sandboxCommits.push({
  2235 |         ...stateCommit,
  2236 |         sessionId: sandboxSessionId,
  2237 |         committedRevision: game.version,
  2238 |         committedAt: stateCommit.committedAt || game.updatedAt
  2239 |       });
  2240 |     }
  2241 |     writeGame(game);
  2242 |     broadcast(game.id, {
  2243 |       type: "state-updated",
  2244 |       gameId: game.id,
  2245 |       version: game.version,
  2246 |       updatedAt: game.updatedAt,
  2247 |       clientId: body.clientId || "",
````


## index.html — retired encounter UI

### Encounter Wheel

Occurrences shown: 3


#### Hit 1 — line 1366

````text
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
````


#### Hit 2 — line 1370

````text
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
````


#### Hit 3 — line 1371

````text
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
````

### encounterOverlay

Occurrences shown: 2


#### Hit 1 — line 1365

````text
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
````


#### Hit 2 — line 1366

````text
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
````

### encounterTab

Occurrences shown: 1


#### Hit 1 — line 1365

````text
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
````

### Hidden Grotto

Occurrences shown: 0

_No occurrences._

### encounter-token-runtime.js

Occurrences shown: 1


#### Hit 1 — line 16

````text
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
````


## token-effect-contract.js — old wheel semantics

### reroll-token

Occurrences shown: 3


#### Hit 1 — line 87

````text
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
````


#### Hit 2 — line 330

````text
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
````


#### Hit 3 — line 765

````text
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
````

### extra-encounter-token

Occurrences shown: 2


#### Hit 1 — line 260

````text
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
````


#### Hit 2 — line 766

````text
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
````

### repel-token

Occurrences shown: 2


#### Hit 1 — line 92

````text
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
````


#### Hit 2 — line 767

````text
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
````

### dream-ball-token

Occurrences shown: 2


#### Hit 1 — line 92

````text
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
````


#### Hit 2 — line 769

````text
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
````

### honey-token

Occurrences shown: 6


#### Hit 1 — line 88

````text
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
````


#### Hit 2 — line 337

````text
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
````


#### Hit 3 — line 451

````text
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
````


#### Hit 4 — line 770

````text
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
````


#### Hit 5 — line 817

````text
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
````


#### Hit 6 — line 1192

````text
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
````

### master-ball-token

Occurrences shown: 2


#### Hit 1 — line 92

````text
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
````


#### Hit 2 — line 771

````text
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
````

### Hidden Grotto

Occurrences shown: 1


#### Hit 1 — line 770

````text
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
````

### Encounter Wheel

Occurrences shown: 1


#### Hit 1 — line 766

````text
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
````


## action-phase-balance.js — mixed/shared boundary

### consolidatedTier

Occurrences shown: 4


#### Hit 1 — line 29

````text
    17 |   const SLOT_MACHINE_RESULTS = Object.freeze([
    18 |     { id: "nothing", label: "Better Luck Next Time", weight: 20, rewardTier: "" },
    19 |     { id: "safari", label: "Safari Ticket", weight: 30, rewardTier: "safari" },
    20 |     { id: "poke", label: "Poké Ticket", weight: 25, rewardTier: "poke" },
    21 |     { id: "great", label: "Great Ticket", weight: 15, rewardTier: "great" },
    22 |     { id: "ultra", label: "Ultra Ticket", weight: 7, rewardTier: "ultra" },
    23 |     { id: "master", label: "Master Ticket", weight: 3, rewardTier: "master" }
    24 |   ]);
    25 |   const GRAVEYARD_VALUES = Object.freeze({ safari: 1500, poke: 2500, great: 3500, ultra: 5000, master: 7500 });
    26 |   const SILPH_COSTS = Object.freeze({ safari: 1000, poke: 2000, great: 3000, ultra: 4000, master: 5000 });
    27 |   const DRAGON_DEN_COSTS = Object.freeze({ safari: 1000, poke: 1500, great: 2500, ultra: 4000, master: 6000 });
    28 | 
    29 |   function consolidatedTier(value) {
    30 |     const normalized = String(value || "")
    31 |       .normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    32 |       .toLowerCase().replace(/pok(?:e|\u00e9)/g, "poke").replace(/[^a-z0-9]+/g, "");
    33 |     if (/^safari(?:elite)?$/.test(normalized)) return "safari";
    34 |     if (/^(?:poke|pokeball)(?:elite)?$/.test(normalized)) return "poke";
    35 |     if (/^great(?:ball)?(?:elite)?$/.test(normalized)) return "great";
    36 |     if (/^ultra(?:ball)?(?:elite)?$/.test(normalized)) return "ultra";
    37 |     if (/^master(?:ball)?(?:elite)?$/.test(normalized)) return "master";
    38 |     return "";
    39 |   }
    40 | 
    41 |   function tierLabel(value) {
````


#### Hit 2 — line 42

````text
    30 |     const normalized = String(value || "")
    31 |       .normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    32 |       .toLowerCase().replace(/pok(?:e|\u00e9)/g, "poke").replace(/[^a-z0-9]+/g, "");
    33 |     if (/^safari(?:elite)?$/.test(normalized)) return "safari";
    34 |     if (/^(?:poke|pokeball)(?:elite)?$/.test(normalized)) return "poke";
    35 |     if (/^great(?:ball)?(?:elite)?$/.test(normalized)) return "great";
    36 |     if (/^ultra(?:ball)?(?:elite)?$/.test(normalized)) return "ultra";
    37 |     if (/^master(?:ball)?(?:elite)?$/.test(normalized)) return "master";
    38 |     return "";
    39 |   }
    40 | 
    41 |   function tierLabel(value) {
    42 |     return TIER_LABELS[consolidatedTier(value)] || "";
    43 |   }
    44 | 
    45 |   function resultForRng(rngValue) {
    46 |     const roll = Math.min(0.999999999999, Math.max(0, Number(rngValue) || 0)) * 100;
    47 |     let cursor = 0;
    48 |     return SLOT_MACHINE_RESULTS.find((result) => {
    49 |       cursor += result.weight;
    50 |       return roll < cursor;
    51 |     }) || SLOT_MACHINE_RESULTS[SLOT_MACHINE_RESULTS.length - 1];
    52 |   }
    53 | 
    54 |   function normalDepartmentPrice(listedPrice, savingsUsed = 0) {
````


#### Hit 3 — line 76

````text
    64 |     return { listedPrice: listed, discount, finalPrice: listed - discount };
    65 |   }
    66 | 
    67 |   function salePrice(listedPrice) {
    68 |     return Math.round(Math.max(0, Number(listedPrice) || 0) * 0.75);
    69 |   }
    70 | 
    71 |   function curseRolls(totalDestroyValue) {
    72 |     return Math.floor(Math.max(0, Number(totalDestroyValue) || 0) / 6000);
    73 |   }
    74 | 
    75 |   function summedTierCost(tiers, table) {
    76 |     return (tiers || []).reduce((total, tier) => total + Number(table[consolidatedTier(tier)] || 0), 0);
    77 |   }
    78 | 
    79 |   return Object.freeze({
    80 |     CONSOLIDATED_TIERS, TIER_LABELS, TICKET_TIERS, SLOT_MACHINE_RESULTS,
    81 |     GRAVEYARD_VALUES, SILPH_COSTS, DRAGON_DEN_COSTS,
    82 |     consolidatedTier, tierLabel, resultForRng, normalDepartmentPrice,
    83 |     clearancePrice, salePrice, curseRolls,
    84 |     silphTotalCost: (tiers) => summedTierCost(tiers, SILPH_COSTS)
    85 |   });
    86 | });
    87 | 
````


#### Hit 4 — line 82

````text
    70 | 
    71 |   function curseRolls(totalDestroyValue) {
    72 |     return Math.floor(Math.max(0, Number(totalDestroyValue) || 0) / 6000);
    73 |   }
    74 | 
    75 |   function summedTierCost(tiers, table) {
    76 |     return (tiers || []).reduce((total, tier) => total + Number(table[consolidatedTier(tier)] || 0), 0);
    77 |   }
    78 | 
    79 |   return Object.freeze({
    80 |     CONSOLIDATED_TIERS, TIER_LABELS, TICKET_TIERS, SLOT_MACHINE_RESULTS,
    81 |     GRAVEYARD_VALUES, SILPH_COSTS, DRAGON_DEN_COSTS,
    82 |     consolidatedTier, tierLabel, resultForRng, normalDepartmentPrice,
    83 |     clearancePrice, salePrice, curseRolls,
    84 |     silphTotalCost: (tiers) => summedTierCost(tiers, SILPH_COSTS)
    85 |   });
    86 | });
    87 | 
````

### GAME_CORNER

Occurrences shown: 0

_No occurrences._

### SILPH_COSTS

Occurrences shown: 3


#### Hit 1 — line 26

````text
    14 |     { id: "ultra", name: "Ultra Ticket", price: 7000, battleTiers: ["Ultra", "Ultra Elite"] },
    15 |     { id: "master", name: "Master Ticket", price: 9000, battleTiers: ["Master", "Master Elite"] }
    16 |   ]);
    17 |   const SLOT_MACHINE_RESULTS = Object.freeze([
    18 |     { id: "nothing", label: "Better Luck Next Time", weight: 20, rewardTier: "" },
    19 |     { id: "safari", label: "Safari Ticket", weight: 30, rewardTier: "safari" },
    20 |     { id: "poke", label: "Poké Ticket", weight: 25, rewardTier: "poke" },
    21 |     { id: "great", label: "Great Ticket", weight: 15, rewardTier: "great" },
    22 |     { id: "ultra", label: "Ultra Ticket", weight: 7, rewardTier: "ultra" },
    23 |     { id: "master", label: "Master Ticket", weight: 3, rewardTier: "master" }
    24 |   ]);
    25 |   const GRAVEYARD_VALUES = Object.freeze({ safari: 1500, poke: 2500, great: 3500, ultra: 5000, master: 7500 });
    26 |   const SILPH_COSTS = Object.freeze({ safari: 1000, poke: 2000, great: 3000, ultra: 4000, master: 5000 });
    27 |   const DRAGON_DEN_COSTS = Object.freeze({ safari: 1000, poke: 1500, great: 2500, ultra: 4000, master: 6000 });
    28 | 
    29 |   function consolidatedTier(value) {
    30 |     const normalized = String(value || "")
    31 |       .normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    32 |       .toLowerCase().replace(/pok(?:e|\u00e9)/g, "poke").replace(/[^a-z0-9]+/g, "");
    33 |     if (/^safari(?:elite)?$/.test(normalized)) return "safari";
    34 |     if (/^(?:poke|pokeball)(?:elite)?$/.test(normalized)) return "poke";
    35 |     if (/^great(?:ball)?(?:elite)?$/.test(normalized)) return "great";
    36 |     if (/^ultra(?:ball)?(?:elite)?$/.test(normalized)) return "ultra";
    37 |     if (/^master(?:ball)?(?:elite)?$/.test(normalized)) return "master";
    38 |     return "";
````


#### Hit 2 — line 81

````text
    69 |   }
    70 | 
    71 |   function curseRolls(totalDestroyValue) {
    72 |     return Math.floor(Math.max(0, Number(totalDestroyValue) || 0) / 6000);
    73 |   }
    74 | 
    75 |   function summedTierCost(tiers, table) {
    76 |     return (tiers || []).reduce((total, tier) => total + Number(table[consolidatedTier(tier)] || 0), 0);
    77 |   }
    78 | 
    79 |   return Object.freeze({
    80 |     CONSOLIDATED_TIERS, TIER_LABELS, TICKET_TIERS, SLOT_MACHINE_RESULTS,
    81 |     GRAVEYARD_VALUES, SILPH_COSTS, DRAGON_DEN_COSTS,
    82 |     consolidatedTier, tierLabel, resultForRng, normalDepartmentPrice,
    83 |     clearancePrice, salePrice, curseRolls,
    84 |     silphTotalCost: (tiers) => summedTierCost(tiers, SILPH_COSTS)
    85 |   });
    86 | });
    87 | 
````


#### Hit 3 — line 84

````text
    72 |     return Math.floor(Math.max(0, Number(totalDestroyValue) || 0) / 6000);
    73 |   }
    74 | 
    75 |   function summedTierCost(tiers, table) {
    76 |     return (tiers || []).reduce((total, tier) => total + Number(table[consolidatedTier(tier)] || 0), 0);
    77 |   }
    78 | 
    79 |   return Object.freeze({
    80 |     CONSOLIDATED_TIERS, TIER_LABELS, TICKET_TIERS, SLOT_MACHINE_RESULTS,
    81 |     GRAVEYARD_VALUES, SILPH_COSTS, DRAGON_DEN_COSTS,
    82 |     consolidatedTier, tierLabel, resultForRng, normalDepartmentPrice,
    83 |     clearancePrice, salePrice, curseRolls,
    84 |     silphTotalCost: (tiers) => summedTierCost(tiers, SILPH_COSTS)
    85 |   });
    86 | });
    87 | 
````

### curseRolls

Occurrences shown: 2


#### Hit 1 — line 71

````text
    59 |   }
    60 | 
    61 |   function clearancePrice(listedPrice) {
    62 |     const listed = Math.max(0, Number(listedPrice) || 0);
    63 |     const discount = Math.min(Math.round(listed * 0.5), 3000);
    64 |     return { listedPrice: listed, discount, finalPrice: listed - discount };
    65 |   }
    66 | 
    67 |   function salePrice(listedPrice) {
    68 |     return Math.round(Math.max(0, Number(listedPrice) || 0) * 0.75);
    69 |   }
    70 | 
    71 |   function curseRolls(totalDestroyValue) {
    72 |     return Math.floor(Math.max(0, Number(totalDestroyValue) || 0) / 6000);
    73 |   }
    74 | 
    75 |   function summedTierCost(tiers, table) {
    76 |     return (tiers || []).reduce((total, tier) => total + Number(table[consolidatedTier(tier)] || 0), 0);
    77 |   }
    78 | 
    79 |   return Object.freeze({
    80 |     CONSOLIDATED_TIERS, TIER_LABELS, TICKET_TIERS, SLOT_MACHINE_RESULTS,
    81 |     GRAVEYARD_VALUES, SILPH_COSTS, DRAGON_DEN_COSTS,
    82 |     consolidatedTier, tierLabel, resultForRng, normalDepartmentPrice,
    83 |     clearancePrice, salePrice, curseRolls,
````


#### Hit 2 — line 83

````text
    71 |   function curseRolls(totalDestroyValue) {
    72 |     return Math.floor(Math.max(0, Number(totalDestroyValue) || 0) / 6000);
    73 |   }
    74 | 
    75 |   function summedTierCost(tiers, table) {
    76 |     return (tiers || []).reduce((total, tier) => total + Number(table[consolidatedTier(tier)] || 0), 0);
    77 |   }
    78 | 
    79 |   return Object.freeze({
    80 |     CONSOLIDATED_TIERS, TIER_LABELS, TICKET_TIERS, SLOT_MACHINE_RESULTS,
    81 |     GRAVEYARD_VALUES, SILPH_COSTS, DRAGON_DEN_COSTS,
    82 |     consolidatedTier, tierLabel, resultForRng, normalDepartmentPrice,
    83 |     clearancePrice, salePrice, curseRolls,
    84 |     silphTotalCost: (tiers) => summedTierCost(tiers, SILPH_COSTS)
    85 |   });
    86 | });
    87 | 
````

### module.exports

Occurrences shown: 2


#### Hit 1 — line 3

````text
     1 | (function initActionPhaseBalance(root, factory) {
     2 |   const api = factory();
     3 |   if (typeof module !== "undefined" && module.exports) module.exports = api;
     4 |   if (root) root.rivalSagaActionPhaseBalance = api;
     5 | })(typeof globalThis !== "undefined" ? globalThis : this, function createActionPhaseBalance() {
     6 |   "use strict";
     7 | 
     8 |   const CONSOLIDATED_TIERS = Object.freeze(["safari", "poke", "great", "ultra", "master"]);
     9 |   const TIER_LABELS = Object.freeze({ safari: "Safari", poke: "Poké", great: "Great", ultra: "Ultra", master: "Master" });
    10 |   const TICKET_TIERS = Object.freeze([
    11 |     { id: "safari", name: "Safari Ticket", price: 2000, battleTiers: ["Safari"] },
    12 |     { id: "poke", name: "Poké Ticket", price: 3000, battleTiers: ["Poké", "Poké Elite"] },
    13 |     { id: "great", name: "Great Ticket", price: 5000, battleTiers: ["Great", "Great Elite"] },
    14 |     { id: "ultra", name: "Ultra Ticket", price: 7000, battleTiers: ["Ultra", "Ultra Elite"] },
    15 |     { id: "master", name: "Master Ticket", price: 9000, battleTiers: ["Master", "Master Elite"] }
````


#### Hit 2 — line 3

````text
     1 | (function initActionPhaseBalance(root, factory) {
     2 |   const api = factory();
     3 |   if (typeof module !== "undefined" && module.exports) module.exports = api;
     4 |   if (root) root.rivalSagaActionPhaseBalance = api;
     5 | })(typeof globalThis !== "undefined" ? globalThis : this, function createActionPhaseBalance() {
     6 |   "use strict";
     7 | 
     8 |   const CONSOLIDATED_TIERS = Object.freeze(["safari", "poke", "great", "ultra", "master"]);
     9 |   const TIER_LABELS = Object.freeze({ safari: "Safari", poke: "Poké", great: "Great", ultra: "Ultra", master: "Master" });
    10 |   const TICKET_TIERS = Object.freeze([
    11 |     { id: "safari", name: "Safari Ticket", price: 2000, battleTiers: ["Safari"] },
    12 |     { id: "poke", name: "Poké Ticket", price: 3000, battleTiers: ["Poké", "Poké Elite"] },
    13 |     { id: "great", name: "Great Ticket", price: 5000, battleTiers: ["Great", "Great Elite"] },
    14 |     { id: "ultra", name: "Ultra Ticket", price: 7000, battleTiers: ["Ultra", "Ultra Elite"] },
    15 |     { id: "master", name: "Master Ticket", price: 9000, battleTiers: ["Master", "Master Elite"] }
````

### rivalSagaActionPhaseBalance

Occurrences shown: 1


#### Hit 1 — line 4

````text
     1 | (function initActionPhaseBalance(root, factory) {
     2 |   const api = factory();
     3 |   if (typeof module !== "undefined" && module.exports) module.exports = api;
     4 |   if (root) root.rivalSagaActionPhaseBalance = api;
     5 | })(typeof globalThis !== "undefined" ? globalThis : this, function createActionPhaseBalance() {
     6 |   "use strict";
     7 | 
     8 |   const CONSOLIDATED_TIERS = Object.freeze(["safari", "poke", "great", "ultra", "master"]);
     9 |   const TIER_LABELS = Object.freeze({ safari: "Safari", poke: "Poké", great: "Great", ultra: "Ultra", master: "Master" });
    10 |   const TICKET_TIERS = Object.freeze([
    11 |     { id: "safari", name: "Safari Ticket", price: 2000, battleTiers: ["Safari"] },
    12 |     { id: "poke", name: "Poké Ticket", price: 3000, battleTiers: ["Poké", "Poké Elite"] },
    13 |     { id: "great", name: "Great Ticket", price: 5000, battleTiers: ["Great", "Great Elite"] },
    14 |     { id: "ultra", name: "Ultra Ticket", price: 7000, battleTiers: ["Ultra", "Ultra Elite"] },
    15 |     { id: "master", name: "Master Ticket", price: 9000, battleTiers: ["Master", "Master Elite"] }
    16 |   ]);
````


## package.json — legacy scripts/tests

### import:encounters:hoenn

Occurrences shown: 1


#### Hit 1 — line 10

````text
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
````

### test:action-balance

Occurrences shown: 1


#### Hit 1 — line 39

````text
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
````

### test:action-workspace

Occurrences shown: 1


#### Hit 1 — line 40

````text
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
````

### test:v2-route

Occurrences shown: 3


#### Hit 1 — line 41

````text
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
````


#### Hit 2 — line 42

````text
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
````


#### Hit 3 — line 43

````text
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
````

### audit:v2-routes

Occurrences shown: 1


#### Hit 1 — line 18

````text
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
````

