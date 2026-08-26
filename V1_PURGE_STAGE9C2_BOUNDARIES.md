# Stage 9C2 — Final Live Encounter Source Boundaries

Generated from `b49e7c7b747c447c13bb430f842ff60a36fde6c4`.

## Live response/timing constants — `app.js:600-890`

```js
   600 |   "Guitarist",
   601 |   "Painter",
   602 |   "Scientist",
   603 |   "Winstrate Family",
   604 |   "Actor"
   605 | ]);
   606 | const trainerClassAbilities = Object.fromEntries(trainerClassNames.map((name) => [name, []]));
   607 | trainerClassAbilities.Unknown = [];
   608 | const trainerClassWheelDefinition = Object.freeze({
   609 |   id: "trainerClassWheel",
   610 |   name: "Trainer Class Wheel",
   611 |   description: "Rolls one trainer class from the current class list.",
   612 |   outcomes: trainerClassNames.map((name) => ({
   613 |     id: slugify(name),
   614 |     label: name,
   615 |     weight: 1,
   616 |     rewardType: "trainer-class",
   617 |     rewardData: { trainerClass: name }
   618 |   }))
   619 | });
   620 |
   621 | const activityResponseRules = Object.freeze({
   622 |   "token-activation": {
   623 |     label: "Token Activation",
   624 |     responseTypes: ["immunity"]
   625 |   },
   626 |   controlToken: {
   627 |     label: "Control Token",
   628 |     responseTypes: ["immunity"]
   629 |   },
   630 |   curseToken: {
   631 |     label: "Curse Token",
   632 |     responseTypes: ["immunity"]
   633 |   },
   634 |   encounterResult: {
   635 |     label: "Encounter Result",
   636 |     responseTypes: ["encounter-reroll", "steal-encounter"]
   637 |   },
   638 |   "class-activation": {
   639 |     label: "Class Activation",
   640 |     responseTypes: ["immunity"]
   641 |   },
   642 |   "perk-activation": {
   643 |     label: "Perk Activation",
   644 |     responseTypes: ["immunity"]
   645 |   },
   646 |   "pokemon-result": {
   647 |     label: "Pokemon Result",
   648 |     responseTypes: ["encounter-reroll", "steal-encounter"]
   649 |   },
   650 |   "encounter-result": {
   651 |     label: "Encounter Result",
   652 |     responseTypes: ["encounter-reroll", "steal-encounter"]
   653 |   }
   654 | });
   655 |
   656 | const activityResponseDefinitions = Object.freeze({
   657 |   immunity: {
   658 |     id: "immunity",
   659 |     label: "Use Immunity",
   660 |     tokenNames: ["Immunity", "Emergency Immunity Token"],
   661 |     description: "Cancel a token, perk, or class effect targeting you."
   662 |   },
   663 |   "encounter-reroll": {
   664 |     id: "encounter-reroll",
   665 |     label: "Reroll Encounter",
   666 |     tokenNames: ["Reroll Token"],
   667 |     description: "Future hook: force a Pokemon result to be rerolled."
   668 |   },
   669 |   "steal-encounter": {
   670 |     id: "steal-encounter",
   671 |     label: "Steal Encounter",
   672 |     tokenNames: ["Quick Ball Token", "Steal"],
   673 |     description: "Future hook: take a Pokemon result before it is claimed."
   674 |   }
   675 | });
   676 |
   677 | const TOKEN_TIMING_CATEGORIES = Object.freeze({
   678 |   CONTROL: "control",
   679 |   PROTECTION: "protection",
   680 |   ENCOUNTER: "encounter",
   681 |   CURSE: "curse",
   682 |   MANUAL: "manual"
   683 | });
   684 |
   685 | const EFFECT_SOURCE_TYPES = Object.freeze({
   686 |   TOKEN: "token",
   687 |   CLASS: "class",
   688 |   PERK: "perk",
   689 |   ITEM: "item",
   690 |   TM: "tm",
   691 |   POKEMON: "pokemon",
   692 |   LOCATION: "location",
   693 |   TRANSACTION: "transaction",
   694 |   MANUAL: "manual",
   695 |   MANUAL_HOST: "manualHost"
   696 | });
   697 |
   698 | const EFFECT_TARGET_CATEGORIES = Object.freeze({
   699 |   PLAYER: "player",
   700 |   POKEMON: "pokemon",
   701 |   TEAM: "team",
   702 |   PARTY_ROSTER: "partyRoster",
   703 |   ENCOUNTER_RESULT: "encounterResult",
   704 |   TOKEN: "token",
   705 |   ITEM: "item",
   706 |   TM: "tm",
   707 |   MONEY: "money",
   708 |   CLASS: "class",
   709 |   FIELD: "field",
   710 |   BATTLE_RESULT: "battleResult",
   711 |   WHOLE_TABLE: "wholeTable",
   712 |   MANUAL: "manual"
   713 | });
   714 |
   715 | const EFFECT_TARGET_TYPES = Object.freeze({
   716 |   NONE: "none",
   717 |   CURRENT_PROMPT: "currentPrompt",
   718 |   POKEMON: "pokemon",
   719 |   PLAYER: "player",
   720 |   TEAM: "team",
   721 |   ENCOUNTER_RESULT: "encounterResult",
   722 |   RESOURCE: "resource",
   723 |   TABLE: "table",
   724 |   MANUAL: "manual"
   725 | });
   726 |
   727 | const EFFECT_TARGET_SCOPES = Object.freeze({
   728 |   NONE: "none",
   729 |   CURRENT_PROMPT: "currentPrompt",
   730 |   SPECIES: "species",
   731 |   ROSTER_INSTANCE: "rosterInstance",
   732 |   SINGLE_PLAYER: "singlePlayer",
   733 |   ALL_PLAYERS: "allPlayers",
   734 |   SINGLE_TEAM: "singleTeam",
   735 |   ALL_TEAMS: "allTeams",
   736 |   SINGLE_RESOURCE: "singleResource",
   737 |   ALL_MATCHING_RESOURCES: "allMatchingResources",
   738 |   TABLE_WIDE: "tableWide",
   739 |   MANUAL: "manual"
   740 | });
   741 |
   742 | const EFFECT_APPLICATION_SCOPES = Object.freeze({
   743 |   ROSTER_INSTANCE: "rosterInstance",
   744 |   SELECTED_ROSTER_INSTANCES: "selectedRosterInstances",
   745 |   SUBMITTED_TEAM_INSTANCES: "submittedTeamInstances",
   746 |   PLAYER_ROSTER_INSTANCES: "playerRosterInstances",
   747 |   GLOBAL_SPECIES: "globalSpecies",
   748 |   SINGLE_PLAYER: "singlePlayer",
   749 |   ALL_PLAYERS: "allPlayers",
   750 |   TABLE_WIDE: "tableWide",
   751 |   MANUAL: "manual"
   752 | });
   753 |
   754 | const EFFECT_RESOLUTION_MODES = Object.freeze({
   755 |   AUTOMATIC: "automatic",
   756 |   GUIDED: "guided",
   757 |   HOST_CONFIRMED: "hostConfirmed",
   758 |   // Migration aliases for old saves and manual events.
   759 |   MANUAL_REQUIRED: "hostConfirmed",
   760 |   AUDIT_ONLY: "hostConfirmed",
   761 |   HYBRID: "guided"
   762 | });
   763 |
   764 | const TOKEN_CONSUMPTION_MODES = Object.freeze({
   765 |   CONSUME_ON_USE: "consumeOnUse",
   766 |   CONSUME_ON_RESOLVE: "consumeOnResolve",
   767 |   MANUAL_CONSUMPTION: "manualConsumption",
   768 |   REFUND_IF_CANCELED: "refundIfCanceled"
   769 | });
   770 |
   771 | const TOKEN_USE_TYPES = Object.freeze({
   772 |   ACTIVATION: "activation",
   773 |   RESPONSE: "response",
   774 |   ENCOUNTER_MODIFIER: "encounterModifier"
   775 | });
   776 |
   777 | const TOKEN_OBJECT_TYPES = Object.freeze({
   778 |   TOKEN: "token",
   779 |   TICKET: "ticket",
   780 |   POINT: "point",
   781 |   KEY_ITEM: "keyItem"
   782 | });
   783 |
   784 | const TOKEN_TIMING_WINDOWS = Object.freeze({
   785 |   ACTION_OPEN: "actionOpen",
   786 |   SHOP_OPEN: "shopOpen",
   787 |   TEAM_BUILDING: "teamBuilding",
   788 |   BATTLE_PREP: "battlePrep",
   789 |   RESPONSE_WINDOW: "responseWindow",
   790 |   WHEEL_WINDOW: "wheelWindow",
   791 |   TEAM_PREVIEW: "teamPreview",
   792 |   SABOTAGE: "sabotage",
   793 |   BATTLE_RESULTS: "battleResults",
   794 |   MANUAL_HOST: "manualHost"
   795 | });
   796 |
   797 | const TOKEN_ACTIVATION_PATTERNS = Object.freeze({
   798 |   PROACTIVE: "proactive",
   799 |   RESPONSE: "response",
   800 |   CONDITIONAL_OPTIONAL_TRIGGER: "conditionalOptionalTrigger",
   801 |   AUTOMATIC_TRIGGER: "automaticTrigger",
   802 |   REPLACEMENT: "replacement",
   803 |   PREVENTION: "prevention",
   804 |   LOCATION_GATED: "locationGated",
   805 |   WHEEL_GATED: "wheelGated",
   806 |   BATTLE_TRICK: "battleTrick"
   807 | });
   808 |
   809 | const TOKEN_PERSISTENCE_BUCKETS = Object.freeze({
   810 |   INSTANT: "instant",
   811 |   LINGERING_EFFECT: "lingeringEffect",
   812 |   STORED_MARKER: "storedMarker",
   813 |   PERMANENT_CHANGE: "permanentChange",
   814 |   NONE: "none"
   815 | });
   816 |
   817 | const TOKEN_RESOLUTION_PAYLOADS = Object.freeze({
   818 |   RESOURCE_CHANGE: "resourceChange",
   819 |   ROSTER_CHANGE: "rosterChange",
   820 |   LEGALITY_CHANGE: "legalityChange",
   821 |   PROTECTION: "protection",
   822 |   PREVENTION: "prevention",
   823 |   REPLACEMENT: "replacement",
   824 |   COPY: "copy",
   825 |   WHEEL: "wheel",
   826 |   BUFF_NERF_APPLICATION: "buffNerfApplication",
   827 |   BATTLE_TRICK: "battleTrick"
   828 | });
   829 |
   830 | const TOKEN_PENDING_EVENT_TYPES = Object.freeze({
   831 |   ENCOUNTER_RESULT: "encounterResult",
   832 |   CONTROL_TOKEN: "controlToken",
   833 |   PROTECTION_RESPONSE: "protectionResponse",
   834 |   CURSE_TOKEN: "curseToken",
   835 |   ENCOUNTER_TOKEN: "encounterToken",
   836 |   CLASS_EFFECT: "classEffect",
   837 |   MANUAL_EVENT: "manualEvent",
   838 |   TRANSACTION_ONLY: "transactionOnly",
   839 |   BATTLE_SUBMISSION: "battleSubmission",
   840 |   TEAM_LOCK_WINDOW: "teamLockWindow"
   841 | });
   842 |
   843 | const TOKEN_TIMING_DEFAULTS = Object.freeze({
   844 |   [TOKEN_TIMING_CATEGORIES.CONTROL]: Object.freeze({
   845 |     timingCategory: TOKEN_TIMING_CATEGORIES.CONTROL,
   846 |     useType: TOKEN_USE_TYPES.ACTIVATION,
   847 |     createsPendingEvent: true,
   848 |     requiresPendingEvent: false,
   849 |     opensResponseWindow: true,
   850 |     transactionsAllowed: true,
   851 |     responseRole: "threat",
   852 |     livePromptType: TOKEN_PENDING_EVENT_TYPES.CONTROL_TOKEN
   853 |   }),
   854 |   [TOKEN_TIMING_CATEGORIES.PROTECTION]: Object.freeze({
   855 |     timingCategory: TOKEN_TIMING_CATEGORIES.PROTECTION,
   856 |     useType: TOKEN_USE_TYPES.RESPONSE,
   857 |     createsPendingEvent: false,
   858 |     requiresPendingEvent: true,
   859 |     opensResponseWindow: false,
   860 |     transactionsAllowed: true,
   861 |     responseRole: "protection",
   862 |     livePromptType: TOKEN_PENDING_EVENT_TYPES.PROTECTION_RESPONSE
   863 |   }),
   864 |   [TOKEN_TIMING_CATEGORIES.ENCOUNTER]: Object.freeze({
   865 |     timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,
   866 |     useType: TOKEN_USE_TYPES.ENCOUNTER_MODIFIER,
   867 |     createsPendingEvent: false,
   868 |     requiresPendingEvent: true,
   869 |     requiredPendingType: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT,
   870 |     responseRole: "encounterModifier",
   871 |     livePromptType: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_TOKEN
   872 |   }),
   873 |   [TOKEN_TIMING_CATEGORIES.CURSE]: Object.freeze({
   874 |     timingCategory: TOKEN_TIMING_CATEGORIES.CURSE,
   875 |     useType: TOKEN_USE_TYPES.ACTIVATION,
   876 |     createsPendingEvent: true,
   877 |     requiresPendingEvent: false,
   878 |     opensResponseWindow: true,
   879 |     transactionsAllowed: true,
   880 |     preferredTimingWindow: TOKEN_PENDING_EVENT_TYPES.TEAM_LOCK_WINDOW,
   881 |     responseRole: "threat",
   882 |     livePromptType: TOKEN_PENDING_EVENT_TYPES.CURSE_TOKEN
   883 |   })
   884 | });
   885 |
   886 | const TOKEN_TIMING_LEGACY_OVERRIDES = Object.freeze({
   887 |   "move-deleter-curse": Object.freeze({
   888 |     ...TOKEN_TIMING_DEFAULTS[TOKEN_TIMING_CATEGORIES.CONTROL],
   889 |     canonicalId: "move-deleter",
   890 |     legacyId: "move-deleter-curse",
```

## Default state + generic token metadata — `app.js:2480-2790`

```js
  2480 |       freeMode: false,
  2481 |       controlledPlayerId: "",
  2482 |       activeScenario: null
  2483 |     },
  2484 |     liveRefereeCollapsed: true,
  2485 |     liveRefereeX: "",
  2486 |     liveRefereeY: "",
  2487 |     liveRefereeWidth: "",
  2488 |     liveRefereeHeight: "",
  2489 |     liveRefereeWindowMode: "floating",
  2490 |     liveRefereeDockSide: "right",
  2491 |     liveRefereePaneSplit: "",
  2492 |     liveRefereeLayoutPreference: "auto",
  2493 |     liveRefereeDensityPreference: "comfortable",
  2494 |     liveRefereeUiScale: 1,
  2495 |     liveRefereeMotionPreference: "full",
  2496 |     liveRefereeScreen: "play",
  2497 |     liveRefereeSelectedEffectName: "",
  2498 |     liveRefereeEffectDraft: null,
  2499 |     activityToasts: [],
  2500 |     activeShop: "items",
  2501 |     tokenShopCategoryFilter: "all",
  2502 |     shopSort: { mode: "price", direction: "asc" },
  2503 |     shopExpandedChoiceGroups: {},
  2504 |     itemShopFilters: { group: "all", roles: [], tags: [], canAfford: false, expanded: false },
  2505 |     itemShopFolderPath: [],
  2506 |     activeView: "sheet",
  2507 |     activeLogFilter: "all",
  2508 |     wheelSessions: [],
  2509 |     playerNotifications: [],
  2510 |     interactionEvents: [],
  2511 |     transactions: [],
  2512 |     effectAuditRecords: [],
  2513 |     effectOperations: [],
  2514 |     delayedEffects: [],
  2515 |     broughtTeamSnapshots: [],
  2516 |     copiedActivations: [],
  2517 |     postPayoutProcedures: [],
  2518 |     endOfActionProcedures: [],
  2519 |     copiedTokenRelationships: [],
  2520 |     privateEffectRecords: [],
  2521 |     encounterCopyRecords: [],
  2522 |     chronologyCounter: 0,
  2523 |     perkSystem: {
  2524 |       pendingRolls: [],
  2525 |       highestThresholdAwardedByPlayerId: {},
  2526 |       assignments: [],
  2527 |       aTierSafetyTriggered: false,
  2528 |       aTierSafetyTriggeringPlayerId: "",
  2529 |       aTierSafetyEligiblePlayerIds: [],
  2530 |       aTierSafetyCompletedPlayerIds: [],
  2531 |       adminWarnings: []
  2532 |     },
  2533 |     infoBattleTierRoller: {
  2534 |       tierId: "",
  2535 |       result: null
  2536 |     },
  2537 |     selectedWheelSessionId: "",
  2538 |     wheelDrawerOpen: false,
  2539 |     skipWheelAnimation: false,
  2540 |     randomPokemonSessions: [],
  2541 |     pokemonFamilyTierCache: {},
  2542 |     pokemonSpriteVariants: {},
  2543 |     tokenArtLibrary: {},
  2544 |     selectedRandomPokemonSessionId: "",
  2545 |     randomPokemonDrawerOpen: false,
  2546 |     routeUiState: createDefaultRouteUiState(),
  2547 |     spriteAliases: {},
  2548 |     pokemonTierOverrides: {},
  2549 |     seriesOrder: [],
  2550 |     seriesChoiceRequired: true,
  2551 |     activityLogFilters: {
  2552 |       search: "",
  2553 |       playerId: "all",
  2554 |       phase: "all",
  2555 |       category: "all",
  2556 |       series: "all",
  2557 |       gym: "all",
  2558 |       undo: "all",
  2559 |       pokemonSubtype: "all",
  2560 |       sort: "newest"
  2561 |     },
  2562 |     shopCart: { playerId: "", items: [], open: false },
  2563 |     opponentDrawer: { open: false, playerId: "", tab: "overview", search: "", type: "active", intelTag: "biggest-threat" },
  2564 |     playerIntel: { globalNotes: "", players: {} },
  2565 |     playerIntelByProfileId: {},
  2566 |     teambuilder: { activeBuildByPlayerId: {}, buildsByPlayerId: {}, selectedSlotByPlayerId: {}, inspectorByPlayerId: {}, selectedPlayerId: "", selectedBuildId: "" },
  2567 |     mvpFilters: { search: "", trainer: "all", series: "all", gym: "all", status: "all", sort: "score" },
  2568 |     mvpBattleView: { series: "Kanto", gym: 1, pokemonId: "" },
  2569 |     pokemonIndexFilters: { search: "", status: [], tier: [], balanceTier: [], type: [], owned: [], form: [] },
  2570 |     pokemonSectionCollapsed: { active: false, legacy: false, released: false },
  2571 |     globalPokemonRules: {},
  2572 |     banlistHistory: [],
  2573 |     pendingBattle: { player1Id: "", player2Id: "" },
  2574 |     battleLogView: { series: "Kanto", gym: 1 },
  2575 |     battleTeams: {},
  2576 |     battleRevealGrants: [],
  2577 |     phaseState: {},
  2578 |     currentPhase: "start",
  2579 |     shopLevelTimingVersion: SHOP_LEVEL_TIMING_VERSION,
  2580 |     actionPhaseState: { selections: {}, seriesTrackers: {} },
  2581 |     gymResults: [],
  2582 |     seriesChampions: {},
  2583 |     gameCornerSessions: [],
  2584 |     gameCornerUnlocks: [],
  2585 |     breederDeposits: [],
  2586 |     dragonsDenSessions: [],
  2587 |     silphCoSessions: [],
  2588 |     bulletinBoardSessions: [],
  2589 |     graveyardSessions: [],
  2590 |     departmentStoreVisits: [],
  2591 |     graveyardTokenOwnerFilter: "",
  2592 |     pcSessions: [],
  2593 |     rangerBaseSessions: [],
  2594 |     pokemonCenterSessions: [],
  2595 |     lingeringStatuses: [],
  2596 |     tokenActivations: [],
  2597 |     tokenConsumptions: [],
  2598 |     moneyLedger: [],
  2599 |     series: "Kanto",
  2600 |     gym: 1,
  2601 |     players: cleanPlayerTemplates.map(createCleanPlayer),
  2602 |     pokemonRecords: [],
  2603 |     pokemonLog: [],
  2604 |     battleRecords: [],
  2605 |     battleSchedules: {},
  2606 |     log: []
  2607 |   };
  2608 | }
  2609 |
  2610 | const initialState = createCleanInitialState();
  2611 |
  2612 | let battleItemShopData = itemShopData;
  2613 | const gameCornerTicketUtilityData = Object.freeze([
  2614 |   { id: "safari-gc-ticket", name: "Safari Ticket", legacyNames: ["Safari GC Ticket"], tokenType: "game-corner", type: "TICKET", tier: "Tickets", category: "Game Corner Tickets", price: 2000, gameCornerTierId: "safari", gameCornerTier: "Safari", description: "Game Corner Ticket for Safari Battle Tier Pokémon." },
  2615 |   { id: "poke-gc-ticket", name: "Poké Ticket", legacyNames: ["Poke GC Ticket"], tokenType: "game-corner", type: "TICKET", tier: "Tickets", category: "Game Corner Tickets", price: 3000, gameCornerTierId: "poke", gameCornerTier: "Poké", description: "Game Corner Ticket for Poké and Poké Elite Battle Tier Pokémon." },
  2616 |   { id: "great-gc-ticket", name: "Great Ticket", legacyNames: ["Great GC Ticket"], tokenType: "game-corner", type: "TICKET", tier: "Tickets", category: "Game Corner Tickets", price: 5000, gameCornerTierId: "great", gameCornerTier: "Great", description: "Game Corner Ticket for Great and Great Elite Battle Tier Pokémon." },
  2617 |   { id: "ultra-gc-ticket", name: "Ultra Ticket", legacyNames: ["Ultra GC Ticket"], tokenType: "game-corner", type: "TICKET", tier: "Tickets", category: "Game Corner Tickets", price: 7000, gameCornerTierId: "ultra", gameCornerTier: "Ultra", description: "Game Corner Ticket for Ultra and Ultra Elite Battle Tier Pokémon." },
  2618 |   { id: "master-gc-ticket", name: "Master Ticket", legacyNames: ["Master GC Ticket"], tokenType: "game-corner", type: "TICKET", tier: "Tickets", category: "Game Corner Tickets", price: 9000, gameCornerTierId: "master", gameCornerTier: "Master", description: "Game Corner Ticket for Master and Master Elite Battle Tier Pokémon." }
  2619 | ]);
  2620 | const legacyTicketUtilityData = Object.freeze([
  2621 |   { id: "legacy-ticket", legacyIds: ["legacy-token"], name: "Legacy Ticket", tokenType: "legacy", type: "TICKET", tier: "Tickets", category: "Legacy Tickets", price: 5000, description: "Use at the PC for Legacy access. Cannot be stolen or destroyed. Price increases by 1000 every time it is bought per series." }
  2622 | ]);
  2623 | const utilityShopData = [
  2624 |   {
  2625 |     id: "utility-badge-point",
  2626 |     name: "Badge Point",
  2627 |     shopAction: "badge-point",
  2628 |     tier: "Utility",
  2629 |     category: "Progress",
  2630 |     price: 0,
  2631 |     dynamicPrice: true,
  2632 |     description: "Gain +1 Badge Point. Cost starts at $5,000 and increases by $1,000 per purchase this series."
  2633 |   },
  2634 |   ...gameCornerTicketUtilityData,
  2635 |   ...legacyTicketUtilityData
  2636 | ];
  2637 | const trainerResourceItemShopData = Object.freeze([
  2638 |   {
  2639 |     ...legacyTicketUtilityData[0],
  2640 |     shopGroup: "held",
  2641 |     roles: ["utility"],
  2642 |     tags: ["build-enabling"],
  2643 |     shopType: "items",
  2644 |     shopPhaseOnly: true
  2645 |   },
  2646 |   {
  2647 |     id: "utility-badge-point",
  2648 |     name: "Badge Point",
  2649 |     shopAction: "badge-point",
  2650 |     tier: "Trainer Resources",
  2651 |     category: "Trainer Resources",
  2652 |     shopGroup: "held",
  2653 |     roles: ["utility"],
  2654 |     tags: ["build-enabling"],
  2655 |     price: 0,
  2656 |     dynamicPrice: true,
  2657 |     disableExternalSpriteLookup: true,
  2658 |     description: "Gain +1 Badge Point. Cost starts at $5,000 and increases by $1,000 per purchase this series."
  2659 |   }
  2660 | ]);
  2661 | battleItemShopData = Object.freeze([...itemShopData, ...trainerResourceItemShopData]);
  2662 |
  2663 | const defaultTokenShopData = Object.freeze([
  2664 |     { id: "class-change", name: "Class Change", tokenType: "control", tier: "Control", category: "Control", price: 2500, description: "Roll the Trainer Class Wheel for yourself and take the new class." },
  2665 |     { id: "restrict-token", name: "Restrict", tokenType: "control", tier: "Control", category: "Control", price: 5000, description: "Prevent a Pokemon from being brought for 6 gyms." },
  2666 |     { id: "arena-trap", name: "Arena Trap", tokenType: "control", tier: "Control", category: "Control", price: 6500, description: "Force a rival party Pokemon to be brought this Battle Phase. The trapped Pokemon cannot be cursed." },
  2667 |     { id: "cold-wave", name: "Cold Wave", tokenType: "control", tier: "Control", category: "Control", price: 7500, description: "When Activated, Suppress All Ongoing Activated Effects Until The End Of This Gym. Suppressed Effects Have No Effect Until This Gym Ends, Then Return To Normal." },
  2668 |     { id: "clear-smog", name: "Clear Smog", tokenType: "control", tier: "Control", category: "Control", price: 8500, description: "Remove permanent buffs from a chosen Pokemon, including levels, illegal abilities, and illegal moves." },
  2669 |     { id: "rage-candy-bar", name: "Rage Candy Bar", tokenType: "control", tier: "Control", category: "Control", price: 9000, description: "Give one of your Pokemon +3 levels, +252 EV cap, and Restrict immunity for 2 gyms." },
  2670 |     { id: "lingering-aroma", name: "Lingering Aroma", tokenType: "control", tier: "Control", category: "Control", price: 10000, description: "Replace one exact active ongoing effect attached to or benefiting you. It stops applying. For its remaining lifetime, other players must pay you $500 to declare an effect that targets you." },
  2671 |     { id: "wicked-blow", name: "Wicked Blow", tokenType: "control", tier: "Control", category: "Control", price: 11000, description: "Choose a Pokemon on a player's team. Reroll it for a random Pokemon 3 Battle Tiers below its final evolution tier." },
  2672 |     { id: "rebrand", name: "Rebrand", tokenType: "control", tier: "Control", category: "Control", price: 11000, description: "Force a rival to roll the Trainer Class Wheel and change class. Trainer class abilities cannot respond." },
  2673 |     { id: "extra-ban-token", name: "Extra Ban", tokenType: "control", tier: "Control", category: "Control", price: 13500, description: "Ban any Pokemon from play." },
  2674 |     { id: "unban-token", name: "Unban", tokenType: "control", tier: "Control", category: "Control", price: 13500, description: "Unban a Pokemon. It cannot be banned again for 6 gyms." },
  2675 |     { id: "incinerate", name: "Incinerate", tokenType: "control", tier: "Control", category: "Control", price: 17000, description: "Choose one Item or TM from every other player except Masterball items and remove it from their bag" },
  2676 |     { id: "steal-token", name: "Steal", tokenType: "control", tier: "Control", category: "Control", price: 18000, description: "Steal a Pokemon from another player." },
  2677 |     { id: "safeguard", name: "Safeguard", tokenType: "protection", tier: "Protection", category: "Protection", price: 3000, description: "Your Money And Tokens Cannot Be Stolen, Destroyed, Or Copied. You Are Unaffected By Follow Me And Embargo." },
  2678 |     { id: "teleport", name: "Teleport", tokenType: "protection", tier: "Protection", category: "Protection", price: 3500, description: "Delay an effect until the start of the next matching phase during the next gym." },
  2679 |     { id: "substitute", name: "Substitute", tokenType: "protection", tier: "Protection", category: "Protection", price: 6500, description: "Choose a Pokemon to protect from one effect. If it would be banned, it is not banned and cannot be banned again during this phase." },
  2680 |     { id: "follow-me", name: "Follow Me", tokenType: "protection", tier: "Protection", category: "Protection", price: 5000, description: "When Another Player Or Another Player's Pokemon Is Targeted By An Effect, Change The Target To You Or One Of Your Legal Pokemon Instead. The New Target Must Be A Legal Target For The Original Effect. After This Effect Resolves, For The Rest Of This Gym, Copy Each Token Used By The Player Whose Effect You Redirected. Follow Me Cannot Redirect Global Effects Or Effects That Do Not Target A Player Or Pokemon." },
  2681 |     { id: "parting-shot", name: "Parting Shot", tokenType: "protection", tier: "Protection", category: "Protection", price: 4000, description: "During Team Preview, switch a previewed Pokemon for another party Pokemon. Cursed-swap retaliation is tracked manually." },
  2682 |     { id: "embargo", name: "Embargo", tokenType: "protection", tier: "Protection", category: "Protection", price: 7000, description: "Target player can only use one more token this gym. You cannot use another token after this resolves." },
  2683 |     { id: "counterspell", name: "Counterspell", tokenType: "protection", tier: "Protection", category: "Protection", price: 7000, description: "When One Of Your Tokens Is Negated, Use This Token. The Negated Token Is Not Consumed. That Token Cannot Be Used Again Until 2 Gyms Have Passed." },
  2684 |     { id: "after-you", name: "After You", tokenType: "protection", tier: "Protection", category: "Protection", price: 7000, description: "After a player declares an effect, copy and use it." },
  2685 |     { id: "smokescreen", name: "Smokescreen", tokenType: "protection", tier: "Protection", category: "Protection", price: 6000, description: "When You Or Your Pokemon Are Targetted For An Effect, Spin A Wheel With All Players. The Result Is The New Target Of That Effect. If Pokemon Are Targetted When This Is Used, Choose A Legal Target From That Player Landed On. Your Original Target Remains The Same." },
  2686 |     { id: "seven-tools", name: "7 Tools Of The Bandit", tokenType: "protection", tier: "Protection", category: "Protection", price: 9000, description: "When A Player Activates A Protection Token, Use This Token Immediately After. Negate That Protection Token, Then Copy It. The Copied Token Must Be Used During This Gym Or It Is Lost." },
  2687 |     { id: "immunity", name: "Immunity", tokenType: "protection", tier: "Protection", category: "Protection", price: 9000, description: "Negate any effect or global effect. Does not stop series restricts or bans." },
  2688 |     { id: "revenge", name: "Revenge", tokenType: "protection", tier: "Protection", category: "Protection", price: 10000, description: "After a Battle Phase where an opponent cursed a Pokemon you brought, release 2 Pokemon from their brought team and destroy the held item." },
  2689 |     { id: "reroll-token", name: "Reroll", tokenType: "reroll", tier: "Encounter", category: "Encounter", price: 1000, description: "Reroll any wheel result." },
  2690 |     { id: "extra-encounter-token", name: "Extra Encounter Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 3500, description: "Use in Action Phase to roll an extra encounter." },
  2691 |     { id: "repel-token", name: "Repel", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 3500, description: "Remove one Pokemon for every 5 entries on an encounter wheel." },
  2692 |     { id: "quick-ball-token", name: "Quick Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 12500, description: "Release an encounter and steal another player's encounter." },
  2693 |     { id: "dream-ball-token", name: "Dream Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 8000, description: "Before an encounter wheel, name almost any ability. The encounter has access to that ability." },
  2694 |     { id: "honey-token", name: "Honey", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 7000, description: "At End of Action Phase, choose an eligible Pokemon encountered during that Action Phase and copy that encounter." },
  2695 |     { id: "master-ball-token", name: "Master Ball Token", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 12500, description: "Choose your encounter. Other players cannot change it." },
  2696 |     { id: "beast-ball-token", name: "Beast Ball", tokenType: "encounter", tier: "Encounter", category: "Encounter", price: 8000, description: "Before an encounter wheel, name any move. The encounter has access to that move." },
  2697 |     { id: "move-deleter", legacyIds: ["move-deleter-curse"], name: "Move Deleter", tokenType: "control", tier: "Control", category: "Control", price: 1500, description: "Ban one move from being brought for 1 week. Cannot be used after team submission." },
  2698 |     { id: "toxic-curse", name: "Toxic Curse", tokenType: "curse", tier: "Curses", category: "Curses", price: 3000, description: "Force a Pokemon to carry a Toxic Orb for 2 gyms." },
  2699 |     { id: "iron-ball-curse", name: "Iron Ball Curse", tokenType: "curse", tier: "Curses", category: "Curses", price: 3000, description: "Force a Pokemon to carry an Iron Ball for 2 gyms." },
  2700 |     { id: "flame-curse", name: "Flame Curse", tokenType: "curse", tier: "Curses", category: "Curses", price: 3000, description: "Force a Pokemon to carry a Flame Orb for 2 gyms." },
  2701 |     { id: "silencing-curse", name: "Silencing Curse", tokenType: "curse", tier: "Curses", category: "Curses", price: 4000, description: "Restrict a Pokemon to 2 move slots for 2 gyms." },
  2702 |     { id: "knock-off-curse", name: "Knock Off Curse", tokenType: "curse", tier: "Curses", category: "Curses", price: 4000, description: "Choose a Pokemon and an Item or TM move. If it is on the Pokemon, remove it from inventory. Masterball items are protected." },
  2703 |     { id: "haze-curse", name: "Haze Curse", tokenType: "curse", tier: "Curses", category: "Curses", price: 3000, description: "Select 2 Pokemon. Their buffs are negated for 2 gyms." },
  2704 |     { id: "imprison-curse", name: "Imprison Curse", tokenType: "curse", tier: "Curses", category: "Curses", price: 3000, description: "Selected Pokemon cannot have EVs or IVs and must use a neutral nature for 2 gyms." },
  2705 |     { id: "devolve-token", name: "Devolve", tokenType: "curse", tier: "Curses", category: "Curses", price: 5000, description: "Selected Pokemon is devolved for 1 gym. During team submission, the target may adjust its set before preview." },
  2706 |     { id: "purge-curse", name: "Purge Curse", tokenType: "curse", tier: "Curses", category: "Curses", price: 20000, description: "All Pokemon brought to this Battle Phase are released after battle completes. This token ignores other effects." },
  2707 |     { id: "foresight-curse", name: "Foresight Curse", tokenType: "curse", tier: "Curses", category: "Curses", price: 5000, description: "Choose 6 Pokemon. If Any Of Those Pokemon Are Brought To This Battle Phase, Their Sets Become Revealed To You. This Is Not A Nerf/Debuff." },
  2708 |     { id: "ditto-token", name: "Ditto", tokenType: "control", tier: "Control", category: "Control", price: 0, cannotPurchase: true, description: "Transforms into any token except Game Corner Tickets." }
  2709 | ]);
  2710 |
  2711 | const shops = {
  2712 |   items: battleItemShopData,
  2713 |   tms: tmShopData,
  2714 |   tokens: defaultTokenShopData
  2715 | };
  2716 |
  2717 | const tokenEffectDefinitions = Object.freeze({
  2718 |   "reroll-token": {
  2719 |     id: "reroll-token",
  2720 |     name: "Reroll Token",
  2721 |     sourceType: "token",
  2722 |     timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,
  2723 |     useType: TOKEN_USE_TYPES.ENCOUNTER_MODIFIER,
  2724 |     createsPendingEvent: false,
  2725 |     requiresPendingEvent: true,
  2726 |     requiredPendingType: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT,
  2727 |     responseRole: "encounterModifier",
  2728 |     livePromptType: "encounterToken",
  2729 |     timing: "pending-result",
  2730 |     targetType: "pending-random-result",
  2731 |     validTargets: ["random-pokemon-result", "encounter-result", "quest-roll"],
  2732 |     excludedSources: ["game-corner-gamble-wheel"],
  2733 |     effect: "reroll"
  2734 |   }
  2735 | });
  2736 |
  2737 | const utilityTokenDefinitions = Object.freeze({
  2738 |   "class-change": { names: ["Class Change", "Class Change Token"], category: "control", targetMode: "player", effectType: "trainer-class-wheel", selfOnly: true, note: "Spin the Trainer Class Wheel for yourself." },
  2739 |   "arena-trap": { names: ["Arena Trap"], category: "control", targetMode: "single-pokemon", targetType: EFFECT_TARGET_TYPES.POKEMON, targetScope: EFFECT_TARGET_SCOPES.ROSTER_INSTANCE, effectType: "arena-trap", note: "Must be brought this Battle Phase and cannot be cursed." },
  2740 |   "cold-wave": { names: ["Cold Wave"], category: "control", targetMode: "none", targetType: EFFECT_TARGET_TYPES.TABLE, targetScope: EFFECT_TARGET_SCOPES.TABLE_WIDE, effectType: "log", note: "Suppresses records explicitly classified as ongoing effects through this Gym without removing or expiring them." },
  2741 |   "clear-smog": { names: ["Clear Smog"], category: "control", targetMode: "single-pokemon", targetType: EFFECT_TARGET_TYPES.POKEMON, targetScope: EFFECT_TARGET_SCOPES.ROSTER_INSTANCE, effectType: "clear-smog", note: "Clearable permanent buffs and exact-instance access grants are removed." },
  2742 |   "rage-candy-bar": { names: ["Rage Candy Bar"], category: "control", targetMode: "single-pokemon", targetType: EFFECT_TARGET_TYPES.POKEMON, targetScope: EFFECT_TARGET_SCOPES.ROSTER_INSTANCE, applicationScope: EFFECT_APPLICATION_SCOPES.ROSTER_INSTANCE, effectType: "add-buffs", buffs: ["+3 Levels", "EV Cap +252"], note: "+3 Levels, EV Cap +252, and Restrict immunity share a 2-Gym duration. Reuse extends it by 2 Gyms without stacking." },
  2743 |   "lingering-aroma": { names: ["Lingering Aroma"], category: "control", targetMode: "none", targetType: EFFECT_TARGET_TYPES.RESOURCE, targetScope: EFFECT_TARGET_SCOPES.SINGLE_RESOURCE, choiceLabel: "Ongoing Effect", effectType: "log", note: "Selects one active record explicitly classified as an ongoing effect and links its replacement text until that record ends." },
  2744 |   "wicked-blow": { names: ["Wicked Blow"], category: "control", targetMode: "single-pokemon", targetType: EFFECT_TARGET_TYPES.POKEMON, targetScope: EFFECT_TARGET_SCOPES.ROSTER_INSTANCE, effectType: "wicked-blow", note: "Reroll one exact Pokemon in any player's Active Roster three ordered Battle Tier steps below its final-evolution tier." },
  2745 |   "rebrand": { names: ["Rebrand", "Rebrand Token"], category: "control", targetMode: "player", targetType: EFFECT_TARGET_TYPES.PLAYER, targetScope: EFFECT_TARGET_SCOPES.SINGLE_PLAYER, effectType: "trainer-class-wheel", note: "Spin the Trainer Class Wheel for a target player." },
  2746 |   "incinerate": { names: ["Incinerate"], category: "control", targetMode: "none", targetType: EFFECT_TARGET_TYPES.RESOURCE, targetScope: EFFECT_TARGET_SCOPES.ALL_MATCHING_RESOURCES, choiceLabel: "One Item or TM per rival", effectType: "remove-from-rivals", note: "Removes one independently selected, stable-ID Item/TM record from each other player who has a legal target." },
  2747 |   "steal-token": { names: ["Steal"], category: "control", targetMode: "single-pokemon", targetType: EFFECT_TARGET_TYPES.POKEMON, targetScope: EFFECT_TARGET_SCOPES.ROSTER_INSTANCE, effectType: "steal-pokemon", note: "Transfers the selected Pokemon to the token user." },
  2748 |   "ditto-token": { names: ["Ditto"], category: "control", targetMode: "none", targetType: EFFECT_TARGET_TYPES.RESOURCE, targetScope: EFFECT_TARGET_SCOPES.SINGLE_RESOURCE, effectType: "log", note: "Transforms its exact inventory record into one canonical activatable Token inventory copy." },
  2749 |   "safeguard": { names: ["Safeguard"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.PLAYER, targetScope: EFFECT_TARGET_SCOPES.SINGLE_PLAYER, selfOnly: true, effectType: "player-buff", buff: "Safeguard", note: "Money and Tokens protected from steal, destroy, and copy; Follow Me and Embargo do not affect the player." },
  2750 |   "teleport": { names: ["Teleport"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Teleport Pending", note: "Delays one effect until matching phase next gym." },
  2751 |   "substitute": { names: ["Substitute"], category: "protection", targetMode: "single-pokemon", targetType: EFFECT_TARGET_TYPES.POKEMON, targetScope: EFFECT_TARGET_SCOPES.ROSTER_INSTANCE, applicationScope: EFFECT_APPLICATION_SCOPES.ROSTER_INSTANCE, effectType: "add-buffs", buffs: ["Substitute Protection"], note: "Protects one owned roster instance from the next effect that would affect it." },
  2752 |   "seven-tools": { names: ["7 Tools Of The Bandit", "7 Tools", "Seven Tools"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "counter-response", note: "Negates the exact Protection response and creates one same-Gym temporary copy atomically." },
  2753 |   "counterspell": { names: ["Counterspell"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "counter-response", note: "Restores the user's exact negated Token on a two-Gym phase-anchored cooldown." },
  2754 |   "follow-me": { names: ["Follow Me"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Follow Me Pending", note: "Redirects one legal corresponding target, then copies later real Token consumption into inventory for this Gym." },
  2755 |   "parting-shot": { names: ["Parting Shot"], category: "protection", targetMode: "single-pokemon", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "add-buffs", buffs: ["Parting Shot Swap Pending"], note: "Team Preview swap marker." },
  2756 |   "embargo": { names: ["Embargo"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-nerf", nerf: "Embargo", note: "Only one more token this gym." },
  2757 |   "after-you": { names: ["After You"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "After You Pending", note: "Creates a fresh virtual copy of the current supported Token activation before the original resolves." },
  2758 |   "smokescreen": { names: ["Smokescreen"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "log", note: "Spins every player once and replaces the original target only when another player has a legal corresponding target." },
  2759 |   "immunity": { names: ["Immunity", "Emergency Immunity Token"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Immunity", note: "Negates one effect/global effect." },
  2760 |   "revenge": { names: ["Revenge"], category: "protection", targetMode: "player", targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Revenge Pending", note: "Post-curse revenge marker." },
  2761 |   "extra-encounter-token": { names: ["Extra Encounter Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Extra Encounter Available", note: "Spend during Action Phase to roll an extra encounter." },
  2762 |   "repel-token": { names: ["Repel"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, choiceLabel: "Pokemon Name", effectType: "log", note: "Remove one Pokemon per 5 entries from Encounter Wheel. Wheel editor hook pending." },
  2763 |   "quick-ball-token": { names: ["Quick Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Quick Ball Pending", note: "Release/steal encounter marker." },
  2764 |   "dream-ball-token": { names: ["Dream Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Dream Ball Pending", note: "Encounter ability choice marker." },
  2765 |   "honey-token": { names: ["Honey"], category: "encounter", targetMode: "none", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.MANUAL, effectType: "log", note: "At End of Action, copies one immutable completed Encounter result into a new acquisition-ready Encounter without rerolling." },
  2766 |   "master-ball-token": { names: ["Master Ball Token"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Master Ball Pending", note: "Choose encounter; cannot be changed by other players." },
  2767 |   "beast-ball-token": { names: ["Beast Ball"], category: "encounter", targetMode: "player", targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT, targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT, effectType: "player-buff", buff: "Beast Ball Pending", note: "Encounter move choice marker." }
  2768 | });
  2769 |
  2770 | const statusTokenDefinitions = Object.freeze({
  2771 |   "restrict-token": {
  2772 |     names: ["Restrict Token", "Restrict"],
  2773 |     category: "control",
  2774 |     label: "Restrict Token",
  2775 |     statusType: "restrict",
  2776 |     statusName: "Restricted",
  2777 |     durationGyms: 6,
  2778 |     targetMode: "single-pokemon",
  2779 |     targetType: EFFECT_TARGET_TYPES.POKEMON,
  2780 |     targetScope: EFFECT_TARGET_SCOPES.SPECIES,
  2781 |     note: "Cannot be brought for 6 gyms"
  2782 |   },
  2783 |   "extra-ban-token": {
  2784 |     names: ["Extra Ban Token", "Ban Token", "Extra Ban"],
  2785 |     category: "control",
  2786 |     label: "Ban Token",
  2787 |     statusType: "ban",
  2788 |     statusName: "Banned",
  2789 |     durationGyms: null,
  2790 |     targetMode: "single-pokemon",
```

## Token engine definitions/normalizers — `app.js:2940-3550`

```js
  2940 |   "devolve-token": {
  2941 |     names: ["Devolve Token", "Devolve"],
  2942 |     category: "curse",
  2943 |     label: "Devolve Token",
  2944 |     statusType: "curse-devolve",
  2945 |     statusName: "Devolved",
  2946 |     durationGyms: 1,
  2947 |     targetMode: "single-pokemon",
  2948 |     targetType: EFFECT_TARGET_TYPES.POKEMON,
  2949 |     targetScope: EFFECT_TARGET_SCOPES.ROSTER_INSTANCE,
  2950 |     note: "Devolved for 1 gym. Team Submission set-change hook pending.",
  2951 |     payload: { devolved: true, allowSetChangeIfTeamSubmission: true }
  2952 |   },
  2953 |   "foresight-curse": {
  2954 |     names: ["Foresight Curse"],
  2955 |     category: "curse",
  2956 |     label: "Foresight Curse",
  2957 |     statusType: "curse-foresight",
  2958 |     statusName: "Foresight Marked",
  2959 |     durationGyms: 1,
  2960 |     targetMode: "multi-pokemon",
  2961 |     targetCount: 6,
  2962 |     targetType: EFFECT_TARGET_TYPES.POKEMON,
  2963 |     targetScope: EFFECT_TARGET_SCOPES.ROSTER_INSTANCE,
  2964 |     note: "Set revealed only to the Foresight Curse user if brought this Battle Phase",
  2965 |     payload: { revealSetIfBrought: true, visibility: "sourcePlayerOnly", privateInformation: true, notDebuff: true },
  2966 |     notDebuff: true
  2967 |   }
  2968 | });
  2969 |
  2970 | const TOKEN_TIMING_ENGINE_V1_DEFINITIONS = Object.freeze({
  2971 |   "extra-encounter-token": Object.freeze({
  2972 |     id: "extra-encounter-token",
  2973 |     names: ["Extra Encounter Token", "Extra Encounter"],
  2974 |     objectType: TOKEN_OBJECT_TYPES.TOKEN,
  2975 |     family: ["encounter"],
  2976 |     timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,
  2977 |     timingWindows: [TOKEN_TIMING_WINDOWS.ACTION_OPEN, TOKEN_TIMING_WINDOWS.MANUAL_HOST],
  2978 |     activationPattern: TOKEN_ACTIVATION_PATTERNS.PROACTIVE,
  2979 |     persistence: TOKEN_PERSISTENCE_BUCKETS.INSTANT,
  2980 |     resolutionPayloads: [TOKEN_RESOLUTION_PAYLOADS.WHEEL, TOKEN_RESOLUTION_PAYLOADS.ROSTER_CHANGE],
  2981 |     targetType: EFFECT_TARGET_TYPES.PLAYER,
  2982 |     targetScope: EFFECT_TARGET_SCOPES.SINGLE_PLAYER,
  2983 |     selfOnly: true,
  2984 |     duration: "instant",
  2985 |     consumesOnLegalUse: true,
  2986 |     consumeIfMisses: true,
  2987 |     consumeIfBlocked: true,
  2988 |     canOpenPendingEvent: false,
  2989 |     canBeRespondedTo: false,
  2990 |     canRespondTo: [],
  2991 |     visibility: "public",
  2992 |     logType: "tokenUsed",
  2993 |     resolverId: "extraEncounter"
  2994 |   }),
  2995 |   "restrict-token": Object.freeze({
  2996 |     id: "restrict-token",
  2997 |     names: ["Restrict Token", "Restrict"],
  2998 |     objectType: TOKEN_OBJECT_TYPES.TOKEN,
  2999 |     family: ["control"],
  3000 |     timingCategory: TOKEN_TIMING_CATEGORIES.CONTROL,
  3001 |     timingWindows: [TOKEN_TIMING_WINDOWS.ACTION_OPEN, TOKEN_TIMING_WINDOWS.MANUAL_HOST],
  3002 |     activationPattern: TOKEN_ACTIVATION_PATTERNS.PROACTIVE,
  3003 |     persistence: TOKEN_PERSISTENCE_BUCKETS.LINGERING_EFFECT,
  3004 |     resolutionPayloads: [TOKEN_RESOLUTION_PAYLOADS.LEGALITY_CHANGE, TOKEN_RESOLUTION_PAYLOADS.BUFF_NERF_APPLICATION],
  3005 |     targetType: EFFECT_TARGET_TYPES.POKEMON,
  3006 |     targetScope: EFFECT_TARGET_SCOPES.SPECIES,
  3007 |     duration: "sixGyms",
  3008 |     durationGyms: 6,
  3009 |     consumesOnLegalUse: true,
  3010 |     consumeIfMisses: true,
  3011 |     consumeIfBlocked: true,
  3012 |     canOpenPendingEvent: true,
  3013 |     canBeRespondedTo: true,
  3014 |     canRespondTo: [],
  3015 |     visibility: "public",
  3016 |     logType: "tokenUsed",
  3017 |     resolverId: "restrict"
  3018 |   }),
  3019 |   safeguard: Object.freeze({
  3020 |     id: "safeguard",
  3021 |     names: ["Safeguard"],
  3022 |     objectType: TOKEN_OBJECT_TYPES.TOKEN,
  3023 |     family: ["protection"],
  3024 |     timingCategory: TOKEN_TIMING_CATEGORIES.PROTECTION,
  3025 |     timingWindows: [TOKEN_TIMING_WINDOWS.ACTION_OPEN, TOKEN_TIMING_WINDOWS.MANUAL_HOST],
  3026 |     activationPattern: TOKEN_ACTIVATION_PATTERNS.PROACTIVE,
  3027 |     persistence: TOKEN_PERSISTENCE_BUCKETS.LINGERING_EFFECT,
  3028 |     resolutionPayloads: [TOKEN_RESOLUTION_PAYLOADS.PROTECTION, TOKEN_RESOLUTION_PAYLOADS.PREVENTION],
  3029 |     targetType: EFFECT_TARGET_TYPES.PLAYER,
  3030 |     targetScope: EFFECT_TARGET_SCOPES.SINGLE_PLAYER,
  3031 |     selfOnly: true,
  3032 |     duration: "untilGymEnd",
  3033 |     consumesOnLegalUse: true,
  3034 |     consumeIfMisses: true,
  3035 |     consumeIfBlocked: true,
  3036 |     canOpenPendingEvent: true,
  3037 |     canBeRespondedTo: true,
  3038 |     canRespondTo: [],
  3039 |     protectionScope: ["moneySteal", "moneyDestroy", "moneyCopy", "tokenSteal", "tokenDestroy", "tokenCopy", "followMe", "embargo"],
  3040 |     visibility: "public",
  3041 |     logType: "tokenUsed",
  3042 |     resolverId: "safeguard"
  3043 |   }),
  3044 |   immunity: Object.freeze({
  3045 |     id: "immunity",
  3046 |     names: ["Immunity", "Emergency Immunity Token"],
  3047 |     objectType: TOKEN_OBJECT_TYPES.TOKEN,
  3048 |     family: ["protection"],
  3049 |     timingCategory: TOKEN_TIMING_CATEGORIES.PROTECTION,
  3050 |     timingWindows: [TOKEN_TIMING_WINDOWS.RESPONSE_WINDOW, TOKEN_TIMING_WINDOWS.MANUAL_HOST],
  3051 |     activationPattern: TOKEN_ACTIVATION_PATTERNS.RESPONSE,
  3052 |     persistence: TOKEN_PERSISTENCE_BUCKETS.INSTANT,
  3053 |     resolutionPayloads: [TOKEN_RESOLUTION_PAYLOADS.PROTECTION, TOKEN_RESOLUTION_PAYLOADS.PREVENTION],
  3054 |     targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT,
  3055 |     targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT,
  3056 |     duration: "instant",
  3057 |     consumesOnLegalUse: true,
  3058 |     consumeIfMisses: true,
  3059 |     consumeIfBlocked: true,
  3060 |     canOpenPendingEvent: false,
  3061 |     canBeRespondedTo: false,
  3062 |     canRespondTo: ["targetedToken", "targetedEffect"],
  3063 |     protectionScope: ["targetedToken", "targetedEffect"],
  3064 |     visibility: "public",
  3065 |     logType: "tokenUsed",
  3066 |     resolverId: "immunity"
  3067 |   }),
  3068 |   substitute: Object.freeze({
  3069 |     id: "substitute",
  3070 |     names: ["Substitute"],
  3071 |     objectType: TOKEN_OBJECT_TYPES.TOKEN,
  3072 |     family: ["protection", "attached"],
  3073 |     timingCategory: TOKEN_TIMING_CATEGORIES.PROTECTION,
  3074 |     timingWindows: [TOKEN_TIMING_WINDOWS.ACTION_OPEN, TOKEN_TIMING_WINDOWS.BATTLE_PREP, TOKEN_TIMING_WINDOWS.MANUAL_HOST],
  3075 |     activationPattern: TOKEN_ACTIVATION_PATTERNS.PROACTIVE,
  3076 |     persistence: TOKEN_PERSISTENCE_BUCKETS.LINGERING_EFFECT,
  3077 |     resolutionPayloads: [TOKEN_RESOLUTION_PAYLOADS.PROTECTION, TOKEN_RESOLUTION_PAYLOADS.PREVENTION],
  3078 |     targetType: EFFECT_TARGET_TYPES.POKEMON,
  3079 |     targetScope: EFFECT_TARGET_SCOPES.ROSTER_INSTANCE,
  3080 |     duration: "untilUsedOrGymEnd",
  3081 |     consumesOnLegalUse: true,
  3082 |     consumeIfMisses: true,
  3083 |     consumeIfBlocked: true,
  3084 |     canOpenPendingEvent: false,
  3085 |     canBeRespondedTo: false,
  3086 |     canRespondTo: [],
  3087 |     protectionScope: ["targetedEffect"],
  3088 |     visibility: "public",
  3089 |     logType: "tokenAttached",
  3090 |     resolverId: "substituteAttach"
  3091 |   }),
  3092 |   "seven-tools": Object.freeze({
  3093 |     id: "seven-tools",
  3094 |     names: ["7 Tools Of The Bandit", "7 Tools", "Seven Tools"],
  3095 |     objectType: TOKEN_OBJECT_TYPES.TOKEN,
  3096 |     family: ["protection", "counter"],
  3097 |     timingCategory: TOKEN_TIMING_CATEGORIES.PROTECTION,
  3098 |     timingWindows: [TOKEN_TIMING_WINDOWS.RESPONSE_WINDOW, TOKEN_TIMING_WINDOWS.MANUAL_HOST],
  3099 |     activationPattern: TOKEN_ACTIVATION_PATTERNS.RESPONSE,
  3100 |     persistence: TOKEN_PERSISTENCE_BUCKETS.INSTANT,
  3101 |     resolutionPayloads: [TOKEN_RESOLUTION_PAYLOADS.PREVENTION],
  3102 |     targetType: EFFECT_TARGET_TYPES.CURRENT_PROMPT,
  3103 |     targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT,
  3104 |     duration: "instant",
  3105 |     consumesOnLegalUse: true,
  3106 |     consumeIfMisses: true,
  3107 |     consumeIfBlocked: true,
  3108 |     canOpenPendingEvent: false,
  3109 |     canBeRespondedTo: false,
  3110 |     canRespondTo: ["protectionResponse"],
  3111 |     protectionScope: ["protectionResponse"],
  3112 |     visibility: "public",
  3113 |     logType: "tokenUsed",
  3114 |     resolverId: "counterProtection"
  3115 |   }),
  3116 |   "reroll-token": Object.freeze({
  3117 |     id: "reroll-token",
  3118 |     names: ["Reroll Token", "Reroll"],
  3119 |     objectType: TOKEN_OBJECT_TYPES.TOKEN,
  3120 |     family: ["reroll"],
  3121 |     timingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER,
  3122 |     timingWindows: [TOKEN_TIMING_WINDOWS.WHEEL_WINDOW, TOKEN_TIMING_WINDOWS.MANUAL_HOST],
  3123 |     activationPattern: TOKEN_ACTIVATION_PATTERNS.RESPONSE,
  3124 |     persistence: TOKEN_PERSISTENCE_BUCKETS.INSTANT,
  3125 |     resolutionPayloads: [TOKEN_RESOLUTION_PAYLOADS.WHEEL, TOKEN_RESOLUTION_PAYLOADS.REPLACEMENT],
  3126 |     targetType: EFFECT_TARGET_TYPES.ENCOUNTER_RESULT,
  3127 |     targetScope: EFFECT_TARGET_SCOPES.CURRENT_PROMPT,
  3128 |     duration: "instant",
  3129 |     consumesOnLegalUse: true,
  3130 |     consumeIfMisses: true,
  3131 |     consumeIfBlocked: true,
  3132 |     canOpenPendingEvent: false,
  3133 |     canBeRespondedTo: false,
  3134 |     canRespondTo: ["wheelRoll"],
  3135 |     visibility: "public",
  3136 |     logType: "tokenUsed",
  3137 |     resolverId: "reroll"
  3138 |   })
  3139 | });
  3140 |
  3141 | function tokenTimingCategoryFromRaw(value = "") {
  3142 |   const key = String(value || "").toLowerCase().trim();
  3143 |   if (key === "reroll") return TOKEN_TIMING_CATEGORIES.ENCOUNTER;
  3144 |   if (Object.values(TOKEN_TIMING_CATEGORIES).includes(key)) return key;
  3145 |   if (key === "curses") return TOKEN_TIMING_CATEGORIES.CURSE;
  3146 |   if (key === "encounters") return TOKEN_TIMING_CATEGORIES.ENCOUNTER;
  3147 |   if (key === "manual" || key === "other") return TOKEN_TIMING_CATEGORIES.MANUAL;
  3148 |   return "";
  3149 | }
  3150 |
  3151 | function tokenEngineDefinitionByName(tokenName = "") {
  3152 |   const key = slugify(tokenName);
  3153 |   if (!key) return null;
  3154 |   const entry = Object.entries(TOKEN_TIMING_ENGINE_V1_DEFINITIONS)
  3155 |     .find(([id, definition]) => slugify(id) === key || (definition.names || []).some((name) => slugify(name) === key));
  3156 |   return entry ? { ...entry[1], id: entry[1].id || entry[0], source: "engine-v1" } : null;
  3157 | }
  3158 |
  3159 | function tokenTimingDefinitionByName(tokenName = "") {
  3160 |   const key = slugify(tokenName);
  3161 |   if (!key) return null;
  3162 |   const legacy = TOKEN_TIMING_LEGACY_OVERRIDES[key];
  3163 |   if (legacy) return { id: key, source: "legacy", ...legacy };
  3164 |   const engine = tokenEngineDefinitionByName(tokenName);
  3165 |   if (engine) return { id: engine.id || key, source: "engine-v1", ...engine };
  3166 |   const effectDefinition = Object.values(tokenEffectDefinitions).find((definition) => slugify(definition.name || definition.id) === key);
  3167 |   if (effectDefinition?.timingCategory) return { id: effectDefinition.id, source: "effect", ...effectDefinition };
  3168 |   const utilityEntry = Object.entries(utilityTokenDefinitions).find(([, definition]) => definition.names.some((candidate) => slugify(candidate) === key));
  3169 |   if (utilityEntry) {
  3170 |     const [, definition] = utilityEntry;
  3171 |     const category = tokenTimingCategoryFromRaw(definition.timingCategory || definition.category);
  3172 |     return { id: utilityEntry[0], source: "utility", ...TOKEN_TIMING_DEFAULTS[category], ...definition, timingCategory: category || definition.category };
  3173 |   }
  3174 |   const statusEntry = Object.entries(statusTokenDefinitions).find(([, definition]) => definition.names.some((candidate) => slugify(candidate) === key));
  3175 |   if (statusEntry) {
  3176 |     const [, definition] = statusEntry;
  3177 |     const category = tokenTimingCategoryFromRaw(definition.timingCategory || definition.category);
  3178 |     return { id: statusEntry[0], source: "status", ...TOKEN_TIMING_DEFAULTS[category], ...definition, timingCategory: category || definition.category };
  3179 |   }
  3180 |   const shopEntry = activeTokenCatalog().find((item) => slugify(item.name || item.id) === key || (item.legacyIds || []).some((id) => slugify(id) === key));
  3181 |   if (shopEntry) {
  3182 |     const category = tokenTimingCategoryFromRaw(shopEntry.timingCategory || shopEntry.tokenType || shopEntry.category);
  3183 |     return { id: shopEntry.id, source: "shop", ...TOKEN_TIMING_DEFAULTS[category], ...shopEntry, timingCategory: category };
  3184 |   }
  3185 |   return null;
  3186 | }
  3187 |
  3188 | function tokenTimingCategoryForName(tokenName = "", fallback = "") {
  3189 |   return tokenTimingCategoryFromRaw(tokenTimingDefinitionByName(tokenName)?.timingCategory || fallback);
  3190 | }
  3191 |
  3192 | function normalizeEffectTargetType(value = "") {
  3193 |   const raw = String(value || "").trim();
  3194 |   const key = raw.toLowerCase();
  3195 |   const values = Object.values(EFFECT_TARGET_TYPES);
  3196 |   if (values.includes(raw)) return raw;
  3197 |   if (key === "current-prompt") return EFFECT_TARGET_TYPES.CURRENT_PROMPT;
  3198 |   if (key === "pending-random-result" || key === "pending-result") return EFFECT_TARGET_TYPES.ENCOUNTER_RESULT;
  3199 |   if (/encounter|random/.test(key)) return EFFECT_TARGET_TYPES.ENCOUNTER_RESULT;
  3200 |   if (/pokemon/.test(key)) return EFFECT_TARGET_TYPES.POKEMON;
  3201 |   if (/player/.test(key)) return EFFECT_TARGET_TYPES.PLAYER;
  3202 |   if (/team/.test(key)) return EFFECT_TARGET_TYPES.TEAM;
  3203 |   if (/resource|item|token|money|tm/.test(key)) return EFFECT_TARGET_TYPES.RESOURCE;
  3204 |   if (/table|field|global/.test(key)) return EFFECT_TARGET_TYPES.TABLE;
  3205 |   if (key === "none") return EFFECT_TARGET_TYPES.NONE;
  3206 |   if (key === "manual") return EFFECT_TARGET_TYPES.MANUAL;
  3207 |   return "";
  3208 | }
  3209 |
  3210 | function normalizeEffectTargetScope(value = "") {
  3211 |   const raw = String(value || "").trim();
  3212 |   const key = raw.toLowerCase();
  3213 |   const values = Object.values(EFFECT_TARGET_SCOPES);
  3214 |   if (values.includes(raw)) return raw;
  3215 |   if (key === "current-prompt" || key === "pending-result") return EFFECT_TARGET_SCOPES.CURRENT_PROMPT;
  3216 |   if (key === "pokemon-species" || key === "species-name") return EFFECT_TARGET_SCOPES.SPECIES;
  3217 |   if (key === "single-pokemon" || key === "owned-copy" || key === "roster-instance") return EFFECT_TARGET_SCOPES.ROSTER_INSTANCE;
  3218 |   if (key === "player" || key === "single-player") return EFFECT_TARGET_SCOPES.SINGLE_PLAYER;
  3219 |   if (key === "all-players") return EFFECT_TARGET_SCOPES.ALL_PLAYERS;
  3220 |   if (key === "team" || key === "single-team") return EFFECT_TARGET_SCOPES.SINGLE_TEAM;
  3221 |   if (key === "all-teams") return EFFECT_TARGET_SCOPES.ALL_TEAMS;
  3222 |   if (key === "resource" || key === "single-resource") return EFFECT_TARGET_SCOPES.SINGLE_RESOURCE;
  3223 |   if (key === "all-matching-resources") return EFFECT_TARGET_SCOPES.ALL_MATCHING_RESOURCES;
  3224 |   if (key === "table" || key === "table-wide" || key === "global" || key === "field" || key === "none") return EFFECT_TARGET_SCOPES.TABLE_WIDE;
  3225 |   if (key === "manual") return EFFECT_TARGET_SCOPES.MANUAL;
  3226 |   return "";
  3227 | }
  3228 |
  3229 | function effectTargetTypeFromDefinition(definition = {}, category = "") {
  3230 |   const explicit = normalizeEffectTargetType(definition.targetType);
  3231 |   if (explicit) return explicit;
  3232 |   if (category === TOKEN_TIMING_CATEGORIES.PROTECTION) return EFFECT_TARGET_TYPES.CURRENT_PROMPT;
  3233 |   if (category === TOKEN_TIMING_CATEGORIES.ENCOUNTER) return EFFECT_TARGET_TYPES.ENCOUNTER_RESULT;
  3234 |   const mode = String(definition.targetMode || "").toLowerCase();
  3235 |   if (/pokemon/.test(mode) || mode === "banned-pokemon") return EFFECT_TARGET_TYPES.POKEMON;
  3236 |   if (/player/.test(mode)) return EFFECT_TARGET_TYPES.PLAYER;
  3237 |   if (/field/.test(mode) || definition.effectType === "field") return EFFECT_TARGET_TYPES.TABLE;
  3238 |   if (/item|tm|token|money/.test(mode) || definition.choiceLabel) return EFFECT_TARGET_TYPES.RESOURCE;
  3239 |   if (mode === "none") return EFFECT_TARGET_TYPES.TABLE;
  3240 |   return EFFECT_TARGET_TYPES.MANUAL;
  3241 | }
  3242 |
  3243 | function effectTargetScopeFromDefinition(definition = {}, targetType = "", category = "") {
  3244 |   const explicit = normalizeEffectTargetScope(definition.targetScope);
  3245 |   if (explicit) return explicit;
  3246 |   if (targetType === EFFECT_TARGET_TYPES.CURRENT_PROMPT) return EFFECT_TARGET_SCOPES.CURRENT_PROMPT;
  3247 |   if (targetType === EFFECT_TARGET_TYPES.ENCOUNTER_RESULT) return EFFECT_TARGET_SCOPES.CURRENT_PROMPT;
  3248 |   if (targetType === EFFECT_TARGET_TYPES.PLAYER) return EFFECT_TARGET_SCOPES.SINGLE_PLAYER;
  3249 |   if (targetType === EFFECT_TARGET_TYPES.TABLE) return EFFECT_TARGET_SCOPES.TABLE_WIDE;
  3250 |   if (targetType === EFFECT_TARGET_TYPES.RESOURCE) return definition.targetMode === "none"
  3251 |     ? EFFECT_TARGET_SCOPES.ALL_MATCHING_RESOURCES
  3252 |     : EFFECT_TARGET_SCOPES.SINGLE_RESOURCE;
  3253 |   if (targetType === EFFECT_TARGET_TYPES.POKEMON) {
  3254 |     if (statusTokenTargetsPokemonSpecies(definition)) return EFFECT_TARGET_SCOPES.SPECIES;
  3255 |     if (definition.targetMode === "multi-pokemon" || definition.targetMode === "single-pokemon" || definition.targetMode === "banned-pokemon") {
  3256 |       return EFFECT_TARGET_SCOPES.ROSTER_INSTANCE;
  3257 |     }
  3258 |   }
  3259 |   if (targetType === EFFECT_TARGET_TYPES.NONE) return EFFECT_TARGET_SCOPES.NONE;
  3260 |   return category === TOKEN_TIMING_CATEGORIES.MANUAL ? EFFECT_TARGET_SCOPES.MANUAL : EFFECT_TARGET_SCOPES.MANUAL;
  3261 | }
  3262 |
  3263 | function targetCategoryFromEffectBucket(targetType = "", targetScope = "") {
  3264 |   if (targetType === EFFECT_TARGET_TYPES.POKEMON) return EFFECT_TARGET_CATEGORIES.POKEMON;
  3265 |   if (targetType === EFFECT_TARGET_TYPES.ENCOUNTER_RESULT) return EFFECT_TARGET_CATEGORIES.ENCOUNTER_RESULT;
  3266 |   if (targetType === EFFECT_TARGET_TYPES.PLAYER) return EFFECT_TARGET_CATEGORIES.PLAYER;
  3267 |   if (targetType === EFFECT_TARGET_TYPES.RESOURCE) return EFFECT_TARGET_CATEGORIES.TOKEN;
  3268 |   if (targetType === EFFECT_TARGET_TYPES.TABLE || targetType === EFFECT_TARGET_TYPES.TEAM) return EFFECT_TARGET_CATEGORIES.WHOLE_TABLE;
  3269 |   if (targetType === EFFECT_TARGET_TYPES.CURRENT_PROMPT) return EFFECT_TARGET_CATEGORIES.MANUAL;
  3270 |   if (targetScope === EFFECT_TARGET_SCOPES.TABLE_WIDE) return EFFECT_TARGET_CATEGORIES.WHOLE_TABLE;
  3271 |   return EFFECT_TARGET_CATEGORIES.MANUAL;
  3272 | }
  3273 |
  3274 | function tokenContractDefinitionByName(tokenName = "") {
  3275 |   const contract = globalThis.rivalSagaTokenEffectContract;
  3276 |   if (!contract?.definitionFor) return null;
  3277 |   const direct = contract.definitionFor(tokenName);
  3278 |   if (direct) return direct;
  3279 |   const timingDefinition = tokenTimingDefinitionByName(tokenName);
  3280 |   return timingDefinition?.id ? contract.definitionFor(timingDefinition.id) : null;
  3281 | }
  3282 |
  3283 | function normalizeEffectResolutionMode(value = "") {
  3284 |   const key = String(value || "").trim().toLowerCase();
  3285 |   if (key === EFFECT_RESOLUTION_MODES.AUTOMATIC) return EFFECT_RESOLUTION_MODES.AUTOMATIC;
  3286 |   if (key === EFFECT_RESOLUTION_MODES.GUIDED || key === "hybrid") return EFFECT_RESOLUTION_MODES.GUIDED;
  3287 |   if (["hostconfirmed", "host-confirmed", "manual", "audit"].includes(key)) return EFFECT_RESOLUTION_MODES.HOST_CONFIRMED;
  3288 |   return EFFECT_RESOLUTION_MODES.HOST_CONFIRMED;
  3289 | }
  3290 |
  3291 | function tokenResolutionModeForDefinition(definition = {}) {
  3292 |   if (definition.resolverMode || definition.resolutionMode) {
  3293 |     return normalizeEffectResolutionMode(definition.resolverMode || definition.resolutionMode);
  3294 |   }
  3295 |   const key = slugify(definition.name || definition.id || definition.names?.[0] || "");
  3296 |   if (key === "reroll-token" || key === "reroll") return EFFECT_RESOLUTION_MODES.AUTOMATIC;
  3297 |   if (["restrict", "immunity", "counterProtection", "substituteAttach"].includes(definition.resolverId)) return EFFECT_RESOLUTION_MODES.AUTOMATIC;
  3298 |   if (definition.resolverId === "safeguard") return EFFECT_RESOLUTION_MODES.AUTOMATIC;
  3299 |   if (definition.resolverId === "extraEncounter") return EFFECT_RESOLUTION_MODES.AUTOMATIC;
  3300 |   return EFFECT_RESOLUTION_MODES.HOST_CONFIRMED;
  3301 | }
  3302 |
  3303 | function tokenConsumptionModeForDefinition(definition = {}) {
  3304 |   const category = tokenTimingCategoryFromRaw(definition.timingCategory || definition.category);
  3305 |   if (!category || category === TOKEN_TIMING_CATEGORIES.MANUAL) return TOKEN_CONSUMPTION_MODES.MANUAL_CONSUMPTION;
  3306 |   return TOKEN_CONSUMPTION_MODES.CONSUME_ON_USE;
  3307 | }
  3308 |
  3309 | function tokenEffectMetadataByName(tokenName = "") {
  3310 |   const timingDefinition = tokenTimingDefinitionByName(tokenName) || {};
  3311 |   const engineDefinition = tokenEngineDefinitionByName(tokenName) || {};
  3312 |   const contractDefinition = tokenContractDefinitionByName(tokenName) || {};
  3313 |   const definition = { ...timingDefinition, ...engineDefinition, ...contractDefinition };
  3314 |   const category = tokenTimingCategoryFromRaw(definition.timingCategory || definition.category) || TOKEN_TIMING_CATEGORIES.MANUAL;
  3315 |   const defaults = TOKEN_TIMING_DEFAULTS[category] || {};
  3316 |   const displayName = displayInventoryTokenName(tokenName || definition.name || definition.names?.[0] || definition.id || "Token");
  3317 |   const resolutionMode = tokenResolutionModeForDefinition({ ...definition, name: displayName });
  3318 |   const consumptionMode = tokenConsumptionModeForDefinition({ ...definition, timingCategory: category });
  3319 |   const targetType = effectTargetTypeFromDefinition(definition, category);
  3320 |   const targetScope = effectTargetScopeFromDefinition(definition, targetType, category);
  3321 |   const applicationScope = definition.applicationScope || ({
  3322 |     [EFFECT_TARGET_SCOPES.SPECIES]: EFFECT_APPLICATION_SCOPES.GLOBAL_SPECIES,
  3323 |     [EFFECT_TARGET_SCOPES.ROSTER_INSTANCE]: EFFECT_APPLICATION_SCOPES.ROSTER_INSTANCE,
  3324 |     [EFFECT_TARGET_SCOPES.SINGLE_TEAM]: EFFECT_APPLICATION_SCOPES.SUBMITTED_TEAM_INSTANCES,
  3325 |     [EFFECT_TARGET_SCOPES.SINGLE_PLAYER]: EFFECT_APPLICATION_SCOPES.SINGLE_PLAYER,
  3326 |     [EFFECT_TARGET_SCOPES.ALL_PLAYERS]: EFFECT_APPLICATION_SCOPES.ALL_PLAYERS,
  3327 |     [EFFECT_TARGET_SCOPES.TABLE_WIDE]: EFFECT_APPLICATION_SCOPES.TABLE_WIDE
  3328 |   }[targetScope] || EFFECT_APPLICATION_SCOPES.MANUAL);
  3329 |   return {
  3330 |     id: definition.canonicalId || definition.id || slugify(displayName),
  3331 |     name: displayName,
  3332 |     sourceType: EFFECT_SOURCE_TYPES.TOKEN,
  3333 |     timingCategory: category,
  3334 |     targetType,
  3335 |     targetScope,
  3336 |     selectedTargetType: definition.selectedTargetType || targetType,
  3337 |     applicationScope,
  3338 |     affectedEntityType: definition.affectedEntityType || targetType,
  3339 |     substituteInterceptionPolicy: definition.substituteInterceptionPolicy || "",
  3340 |     substituteChecksSelectedTargetOnly: Boolean(definition.substituteChecksSelectedTargetOnly),
  3341 |     targetCategory: targetCategoryFromEffectBucket(targetType, targetScope),
  3342 |     resolutionMode,
  3343 |     consumptionMode,
  3344 |     objectType: definition.objectType || TOKEN_OBJECT_TYPES.TOKEN,
  3345 |     family: Array.isArray(definition.family) ? definition.family : [definition.family || category].filter(Boolean),
  3346 |     timingWindows: Array.isArray(definition.timingWindows) ? definition.timingWindows : [],
  3347 |     activationPattern: definition.activationPattern || "",
  3348 |     persistence: definition.persistence || TOKEN_PERSISTENCE_BUCKETS.NONE,
  3349 |     resolutionPayloads: Array.isArray(definition.resolutionPayloads) ? definition.resolutionPayloads : [],
  3350 |     duration: definition.duration || "",
  3351 |     consumesOnLegalUse: definition.consumesOnLegalUse !== false,
  3352 |     consumeIfMisses: definition.consumeIfMisses !== false,
  3353 |     consumeIfBlocked: definition.consumeIfBlocked !== false,
  3354 |     canOpenPendingEvent: Boolean(definition.canOpenPendingEvent ?? definition.createsPendingEvent ?? defaults.createsPendingEvent),
  3355 |     canBeRespondedTo: Boolean(definition.canBeRespondedTo ?? definition.opensResponseWindow ?? defaults.opensResponseWindow),
  3356 |     canRespondTo: Array.isArray(definition.canRespondTo) ? definition.canRespondTo : [],
  3357 |     protectionScope: Array.isArray(definition.protectionScope) ? definition.protectionScope : [],
  3358 |     removableBy: Array.isArray(definition.removableBy) ? definition.removableBy : [],
  3359 |     visibility: definition.visibility || "public",
  3360 |     logType: definition.logType || "tokenUsed",
  3361 |     resolverId: definition.resolverId || "",
  3362 |     resolverMode: resolutionMode,
  3363 |     rulesText: definition.rulesText || definition.description || definition.note || "",
  3364 |     legalPhases: Array.isArray(definition.legalPhases) ? definition.legalPhases : [],
  3365 |     legalControlContexts: Array.isArray(definition.legalControlContexts) ? definition.legalControlContexts : [],
  3366 |     activationType: definition.activationType || "",
  3367 |     usesControlTiming: Boolean(definition.usesControlTiming),
  3368 |     isResponse: Boolean(definition.isResponse),
  3369 |     specialPriority: definition.specialPriority || "",
  3370 |     requiredChoices: Array.isArray(definition.requiredChoices) ? definition.requiredChoices : [],
  3371 |     targetValidation: definition.targetValidation || "",
  3372 |     redirectPolicy: definition.redirectPolicy || null,
  3373 |     targetsRedirectable: definition.redirectPolicy ? false : definition.targetsRedirectable === true,
  3374 |     revalidateOnResolution: definition.revalidateOnResolution !== false,
  3375 |     declarationCost: definition.declarationCost || "Consume 1 Token",
  3376 |     consumptionTiming: definition.consumptionTiming || "Declaration confirmation",
  3377 |     otherDeclarationCosts: Array.isArray(definition.otherDeclarationCosts) ? definition.otherDeclarationCosts : [],
  3378 |     declarationAnnouncement: definition.declarationAnnouncement || "",
  3379 |     automaticMutations: Array.isArray(definition.automaticMutations) ? definition.automaticMutations : [],
  3380 |     guidedTask: definition.guidedTask || null,
  3381 |     hostTask: definition.hostTask || null,
  3382 |     successConditions: Array.isArray(definition.successConditions) ? definition.successConditions : [],
  3383 |     failureConditions: Array.isArray(definition.failureConditions) ? definition.failureConditions : [],
  3384 |     parentInteraction: definition.parentInteraction || "",
  3385 |     expirationPoint: definition.expirationPoint || "",
  3386 |     replacementRules: definition.replacementRules || "",
  3387 |     stackingRules: definition.stackingRules || "",
  3388 |     stateClassification: definition.stateClassification || "",
  3389 |     outcomeTemplate: definition.outcomeTemplate || "",
  3390 |     auditFields: Array.isArray(definition.auditFields) ? definition.auditFields : [],
  3391 |     undoPayload: Array.isArray(definition.undoPayload) ? definition.undoPayload : [],
  3392 |     implementationStatus: definition.implementationStatus || "",
  3393 |     runtimeImplementationStatus: definition.runtimeImplementationStatus || "",
  3394 |     runtimeUsability: definition.runtimeUsability || "usable",
  3395 |     runtimeUsabilityReason: definition.runtimeUsabilityReason || "",
  3396 |     requiredTests: Array.isArray(definition.requiredTests) ? definition.requiredTests : [],
  3397 |     targetControllerRelation: definition.targetControllerRelation || "",
  3398 |     selfOnly: Boolean(definition.selfOnly),
  3399 |     otherPlayerOnly: Boolean(definition.otherPlayerOnly),
  3400 |     excludeActor: Boolean(definition.excludeActor),
  3401 |     differentControllerRequired: Boolean(definition.differentControllerRequired),
  3402 |     createsPendingEvent: Boolean(definition.createsPendingEvent ?? definition.canOpenPendingEvent ?? defaults.createsPendingEvent),
  3403 |     requiresPendingEvent: Boolean(definition.requiresPendingEvent ?? defaults.requiresPendingEvent),
  3404 |     opensResponseWindow: Boolean(definition.opensResponseWindow ?? defaults.opensResponseWindow),
  3405 |     transactionsAllowed: definition.transactionsAllowed !== undefined ? Boolean(definition.transactionsAllowed) : defaults.transactionsAllowed !== false,
  3406 |     promptTemplate: "{actor} used {token} on {target}.",
  3407 |     shortPromptText: definition.note || definition.description || "",
  3408 |     definition
  3409 |   };
  3410 | }
  3411 |
  3412 | function tokenRuntimeUsabilityCheck(metadataOrName = "") {
  3413 |   const metadata = typeof metadataOrName === "object" && metadataOrName
  3414 |     ? metadataOrName
  3415 |     : tokenEffectMetadataByName(metadataOrName);
  3416 |   const definition = metadata?.definition?.runtimeUsability
  3417 |     ? metadata.definition
  3418 |     : tokenContractDefinitionByName(metadata?.id || metadata?.name || metadataOrName);
  3419 |   const contract = globalThis.rivalSagaTokenEffectContract;
  3420 |   if (!definition || !contract?.activationUsabilityFor) {
  3421 |     return { ok: true, status: "usable", mayConsume: true, reason: "" };
  3422 |   }
  3423 |   return contract.activationUsabilityFor(definition);
  3424 | }
  3425 |
  3426 | function tokenRuntimeResultSafetyCheck(metadataOrName = "", outcome = {}) {
  3427 |   const metadata = typeof metadataOrName === "object" && metadataOrName
  3428 |     ? metadataOrName
  3429 |     : tokenEffectMetadataByName(metadataOrName);
  3430 |   const contract = globalThis.rivalSagaTokenEffectContract;
  3431 |   if (!contract?.runtimeResultSafetyFor) return { ok: true, reason: "" };
  3432 |   return contract.runtimeResultSafetyFor(metadata?.definition || metadata?.id || metadata?.name || metadataOrName, outcome);
  3433 | }
  3434 |
  3435 | function tokenTimingCategoryLabel(category) {
  3436 |   return {
  3437 |     [TOKEN_TIMING_CATEGORIES.CONTROL]: "Control Token",
  3438 |     [TOKEN_TIMING_CATEGORIES.PROTECTION]: "Protection Token",
  3439 |     [TOKEN_TIMING_CATEGORIES.ENCOUNTER]: "Encounter Token",
  3440 |     [TOKEN_TIMING_CATEGORIES.CURSE]: "Curse Token",
  3441 |     [TOKEN_TIMING_CATEGORIES.MANUAL]: "Manual Token"
  3442 |   }[category] || "Token";
  3443 | }
  3444 |
  3445 | function ordinaryControlBlockingReason(targetState = state) {
  3446 |   const phaseRecord = provisionalDeclarationRuntime.phaseStateRecord?.(targetState) || null;
  3447 |   const battlePhase = phaseRecord?.battlePhase || {};
  3448 |   if ((battlePhase.revisionOperations || []).some((operation) => operation.status === "WAITING_FOR_REVISIONS")) {
  3449 |     return "A required team revision is still open.";
  3450 |   }
  3451 |   if ((battlePhase.revisionWindows || []).some((window) => window.status === "open")) {
  3452 |     return "A required team revision is still open.";
  3453 |   }
  3454 |   if ((targetState.playerNotifications || []).some((notification) => notification.requiresAction !== false
  3455 |     && !["completed", "resolved", "cancelled", "dismissed"].includes(String(notification.status || "pending").toLowerCase()))) {
  3456 |     return "A required gameplay choice is still open.";
  3457 |   }
  3458 |   if (activeArenaTrapCustomizationStatus?.("", targetState)) {
  3459 |     return "Arena Trap customization must finish before another effect is declared.";
  3460 |   }
  3461 |   return "";
  3462 | }
  3463 |
  3464 | function battlePayoutCompleteForState(targetState = state) {
  3465 |   return (targetState.gymResults || []).some((result) => !result.undone
  3466 |     && result.series === targetState.series
  3467 |     && Number(result.gym) === Number(targetState.gym));
  3468 | }
  3469 |
  3470 | function ordinaryControlTimingStatusForState(targetState = state) {
  3471 |   return provisionalDeclarationRuntime.ordinaryControlTimingStatus(targetState, {
  3472 |     actionsPerPlayer: actionPhaseRules.actionsPerPlayer,
  3473 |     isBlocking: interactionSituationLifecycle.isBlocking,
  3474 |     battlePayoutComplete: battlePayoutCompleteForState(targetState),
  3475 |     blockingReason: ordinaryControlBlockingReason(targetState)
  3476 |   });
  3477 | }
  3478 |
  3479 | function tokenTimingWindowsForContext(context = {}) {
  3480 |   const pendingEvent = context.pendingEvent || getCurrentPendingEvent?.() || null;
  3481 |   const targetState = context.targetState || state;
  3482 |   const windows = new Set();
  3483 |   if (context.manualHost) windows.add(TOKEN_TIMING_WINDOWS.MANUAL_HOST);
  3484 |   if (pendingEvent) {
  3485 |     windows.add(TOKEN_TIMING_WINDOWS.RESPONSE_WINDOW);
  3486 |     const resultSession = liveResultSessionForActivity?.(pendingEvent);
  3487 |     const pendingKind = `${pendingEvent.type || ""} ${pendingEvent.sourceType || ""}`;
  3488 |     if (resultSession || /encounter-result|pokemon-result/i.test(pendingKind)) {
  3489 |       windows.add("encounterResult");
  3490 |       windows.add(TOKEN_TIMING_WINDOWS.WHEEL_WINDOW);
  3491 |     } else if (pendingEvent.payload?.encounterStage === "beforeRoll" || /encounter-before|wheel-before/i.test(pendingKind)) {
  3492 |       windows.add("encounterBeforeRoll");
  3493 |     } else if (/wheel/i.test(pendingKind)) {
  3494 |       windows.add(TOKEN_TIMING_WINDOWS.WHEEL_WINDOW);
  3495 |     }
  3496 |   } else {
  3497 |     const phase = currentPhase?.() || "";
  3498 |     if (phase) windows.add(phase);
  3499 |     if (phase === "start") windows.add("gymStart");
  3500 |     const ordinaryControl = ordinaryControlTimingStatusForState(targetState);
  3501 |     if (ordinaryControl.open) {
  3502 |       windows.add(ordinaryControl.context);
  3503 |       if (ordinaryControl.context === "actionOpenControl") windows.add(TOKEN_TIMING_WINDOWS.ACTION_OPEN);
  3504 |       if (ordinaryControl.context === "teamBuilding") windows.add(TOKEN_TIMING_WINDOWS.TEAM_BUILDING);
  3505 |       if (ordinaryControl.context === "shop") windows.add(TOKEN_TIMING_WINDOWS.SHOP_OPEN);
  3506 |       if (ordinaryControl.context === "postBattleControl") windows.add("postBattleControl");
  3507 |     }
  3508 |     if (phase === "battle-results") {
  3509 |       windows.add(TOKEN_TIMING_WINDOWS.BATTLE_RESULTS);
  3510 |       windows.add("battleResults");
  3511 |     }
  3512 |     try {
  3513 |       if (phase === "battle") {
  3514 |         const substep = battlePhaseSubstep?.();
  3515 |         if (substep === "teamPreparation" || substep === "teamSubmissionLock") windows.add(TOKEN_TIMING_WINDOWS.BATTLE_PREP);
  3516 |         if (substep === "sabotage") windows.add(TOKEN_TIMING_WINDOWS.SABOTAGE);
  3517 |         if (BATTLE_PHASE_REVEALED_SUBSTEPS?.includes?.(substep)) windows.add(TOKEN_TIMING_WINDOWS.TEAM_PREVIEW);
  3518 |       }
  3519 |     } catch {
  3520 |       // Battle substep helpers are not required for non-battle timing checks.
  3521 |     }
  3522 |   }
  3523 |   if (context.teamBuilding) windows.add(TOKEN_TIMING_WINDOWS.TEAM_BUILDING);
  3524 |   if (context.battlePrep) windows.add(TOKEN_TIMING_WINDOWS.BATTLE_PREP);
  3525 |   if (context.encounterBeforeRoll) windows.add("encounterBeforeRoll");
  3526 |   if (context.encounterResult) windows.add("encounterResult");
  3527 |   return [...windows];
  3528 | }
  3529 |
  3530 | function tokenUseTimingCheck({ player, tokenName, metadata = tokenEffectMetadataByName(tokenName), context = {} } = {}) {
  3531 |   if (!player) return { ok: false, reason: "Choose a player before using this token." };
  3532 |   if (!tokenName) return { ok: false, reason: "Choose a token before using it." };
  3533 |   const usability = tokenRuntimeUsabilityCheck(metadata);
  3534 |   if (!usability.ok) return { ...usability, ok: false };
  3535 |   if (!playerHasTokenForEffect(player, tokenName, metadata)) return { ok: false, reason: `${player.name} does not have ${tokenName}.` };
  3536 |   const pendingEvent = context.pendingEvent || getCurrentPendingEvent?.() || null;
  3537 |   const windows = tokenTimingWindowsForContext({ ...context, pendingEvent });
  3538 |   const legalWindows = metadata.timingWindows || [];
  3539 |   const legalControlContexts = metadata.legalControlContexts || [];
  3540 |   const phaseSpecificControlContext = !pendingEvent && !context.manualHost
  3541 |     ? ([
  3542 |       ["sabotageCurseWindow", windows.includes(TOKEN_TIMING_WINDOWS.SABOTAGE)],
  3543 |       ["gymStartPreparationControl", windows.includes("gymStartPreparationControl")]
  3544 |     ].find(([contextName, active]) => active && legalControlContexts.includes(contextName))?.[0] || "")
  3545 |     : "";
  3546 |   const ordinaryControl = !pendingEvent && !context.manualHost && metadata.usesControlTiming && !phaseSpecificControlContext
  3547 |     ? ordinaryControlTimingStatusForState(context.targetState || state)
  3548 |     : null;
  3549 |   if (ordinaryControl && !ordinaryControl.open) {
  3550 |     return { ok: false, reason: ordinaryControl.reason, windows, legalWindows };
```

## Snapshot/undo/persistence token plumbing — `app.js:3760-4520`

```js
  3760 |     actorPlayerId: draft.actorPlayerId,
  3761 |     targetPlayerId: draft.targetPlayerId || "",
  3762 |     targetPokemonIds: [draft.targetPokemonId].filter(Boolean),
  3763 |     targetPokemonNames: [draft.targetPokemonName || draft.targetText].filter(Boolean),
  3764 |     selectedTargetType: draft.selectedTargetType || metadata.selectedTargetType || draft.targetType || "",
  3765 |     applicationScope: draft.applicationScope || metadata.applicationScope || "",
  3766 |     affectedEntityType: draft.affectedEntityType || metadata.affectedEntityType || draft.targetType || "",
  3767 |     selectedRosterInstanceId,
  3768 |     selectedSpeciesId,
  3769 |     speciesId: selectedSpeciesId,
  3770 |     selectedRosterInstanceIds,
  3771 |     affectedRosterInstanceIds: draft.affectedRosterInstanceIds || selectedRosterInstanceIds,
  3772 |     excludedRosterInstanceIds: draft.excludedRosterInstanceIds || [],
  3773 |     substituteInterceptionPolicy: draft.substituteInterceptionPolicy || metadata.substituteInterceptionPolicy || "",
  3774 |     substituteChecksSelectedTargetOnly: draft.substituteChecksSelectedTargetOnly ?? metadata.substituteChecksSelectedTargetOnly,
  3775 |     sourceEffectId: draft.sourceEffectId || "",
  3776 |     sourcePlayerId: draft.actorPlayerId || "",
  3777 |     statusIds,
  3778 |     series: state.series,
  3779 |     gym: Number(state.gym),
  3780 |     phase: currentPhase(),
  3781 |     details,
  3782 |     createdAt: new Date().toISOString()
  3783 |   };
  3784 |   state.tokenActivations ||= [];
  3785 |   state.tokenActivations.unshift(activation);
  3786 |   return activation;
  3787 | }
  3788 |
  3789 | function tokenUseRollbackSnapshot() {
  3790 |   return {
  3791 |     previousPlayers: structuredClone(state.players || []),
  3792 |     previousPokemonRecords: structuredClone(state.pokemonRecords || []),
  3793 |     previousPokemonLog: structuredClone(state.pokemonLog || []),
  3794 |     previousLingeringStatuses: structuredClone(state.lingeringStatuses || []),
  3795 |     previousTokenActivations: structuredClone(state.tokenActivations || []),
  3796 |     previousTokenConsumptions: structuredClone(state.tokenConsumptions || []),
  3797 |     previousPlayerNotifications: structuredClone(state.playerNotifications || []),
  3798 |     previousWheelSessions: structuredClone(state.wheelSessions || []),
  3799 |     previousRandomPokemonSessions: structuredClone(state.randomPokemonSessions || []),
  3800 |     previousInteractionEvents: structuredClone(state.interactionEvents || []),
  3801 |     previousTransactions: structuredClone(state.transactions || []),
  3802 |     previousGlobalPokemonRules: structuredClone(state.globalPokemonRules || {}),
  3803 |     previousBanlistHistory: structuredClone(state.banlistHistory || []),
  3804 |     previousTeambuilder: structuredClone(state.teambuilder || {}),
  3805 |     previousBattleTeams: structuredClone(state.battleTeams || {}),
  3806 |     previousPerkSystem: structuredClone(state.perkSystem || {}),
  3807 |     previousClassStateByPlayerId: structuredClone(state.classStateByPlayerId || {}),
  3808 |     previousPhaseState: structuredClone(state.phaseState || {}),
  3809 |     previousEffectAuditRecords: structuredClone(state.effectAuditRecords || []),
  3810 |     previousEffectOperations: structuredClone(state.effectOperations || []),
  3811 |     previousDelayedEffects: structuredClone(state.delayedEffects || []),
  3812 |     previousBroughtTeamSnapshots: structuredClone(state.broughtTeamSnapshots || []),
  3813 |     previousCopiedActivations: structuredClone(state.copiedActivations || []),
  3814 |     previousPostPayoutProcedures: structuredClone(state.postPayoutProcedures || []),
  3815 |     previousEndOfActionProcedures: structuredClone(state.endOfActionProcedures || []),
  3816 |     previousCopiedTokenRelationships: structuredClone(state.copiedTokenRelationships || []),
  3817 |     previousPrivateEffectRecords: structuredClone(state.privateEffectRecords || []),
  3818 |     previousEncounterCopyRecords: structuredClone(state.encounterCopyRecords || [])
  3819 |   };
  3820 | }
  3821 |
  3822 | function tokenEffectAuditRecord({
  3823 |   stage = "declaration",
  3824 |   activity = null,
  3825 |   response = null,
  3826 |   draft = {},
  3827 |   metadata = tokenEffectMetadataByName(draft.tokenName || activity?.payload?.tokenName || response?.tokenName || ""),
  3828 |   result = "pending",
  3829 |   mutations = [],
  3830 |   persistentStateIds = [],
  3831 |   hostConfirmation = "",
  3832 |   undoLogId = ""
  3833 | } = {}) {
  3834 |   const tokenName = draft.tokenName || activity?.payload?.tokenName || response?.tokenName || metadata.name || "Token";
  3835 |   const actorPlayerId = draft.actorPlayerId || response?.playerId || activity?.actorPlayerId || "";
  3836 |   const promptId = response?.respondingToPromptId || activity && interactionRootPromptId(activity) || "";
  3837 |   const record = {
  3838 |     id: `effect-audit-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  3839 |     effectId: activity?.id || response?.id || `immediate:${Date.now()}`,
  3840 |     tokenDefinitionId: metadata.id || slugify(tokenName),
  3841 |     tokenId: draft.consumedTokenId || response?.tokenId || activity?.payload?.consumedTokenId || "",
  3842 |     tokenName,
  3843 |     stage,
  3844 |     userPlayerId: actorPlayerId,
  3845 |     originalOwnerPlayerId: actorPlayerId,
  3846 |     timestamp: new Date().toISOString(),
  3847 |     series: state.series,
  3848 |     gym: Number(state.gym),
  3849 |     phase: currentPhase(),
  3850 |     timingWindow: tokenTimingWindowsForContext({ pendingEvent: activity || getCurrentPendingEvent() }),
  3851 |     targets: {
  3852 |       playerId: draft.targetPlayerId || response?.targetPlayerId || activity?.targetPlayerId || "",
  3853 |       pokemonId: draft.targetPokemonId || response?.targetPokemonId || activity?.payload?.targetPokemonId || "",
  3854 |       text: tokenUseTargetLabel(draft) || response?.targetText || activity?.payload?.targetText || "",
  3855 |       selectedTargetType: draft.selectedTargetType || activity?.payload?.selectedTargetType || metadata.selectedTargetType || "",
  3856 |       applicationScope: draft.applicationScope || activity?.payload?.applicationScope || metadata.applicationScope || "",
  3857 |       affectedEntityType: draft.affectedEntityType || activity?.payload?.affectedEntityType || metadata.affectedEntityType || "",
  3858 |       selectedRosterInstanceId: draft.selectedRosterInstanceId || activity?.payload?.selectedRosterInstanceId || "",
  3859 |       selectedSpeciesId: draft.selectedSpeciesId || activity?.payload?.selectedSpeciesId || "",
  3860 |       speciesId: draft.speciesId || activity?.payload?.speciesId || "",
  3861 |       selectedRosterInstanceIds: draft.selectedRosterInstanceIds || activity?.payload?.selectedRosterInstanceIds || [],
  3862 |       affectedRosterInstanceIds: draft.affectedRosterInstanceIds || activity?.payload?.affectedRosterInstanceIds || [],
  3863 |       excludedRosterInstanceIds: draft.excludedRosterInstanceIds || activity?.payload?.excludedRosterInstanceIds || [],
  3864 |       substituteInterceptionPolicy: draft.substituteInterceptionPolicy || activity?.payload?.substituteInterceptionPolicy || metadata.substituteInterceptionPolicy || "",
  3865 |       substituteChecksSelectedTargetOnly: draft.substituteChecksSelectedTargetOnly ?? activity?.payload?.substituteChecksSelectedTargetOnly ?? metadata.substituteChecksSelectedTargetOnly
  3866 |     },
  3867 |     requiredChoices: metadata.requiredChoices || [],
  3868 |     choices: draft.notes || response?.resolutionText || activity?.payload?.resolutionResultText || "",
  3869 |     tokenConsumed: Boolean(draft.consumedTokenId || response?.tokenId || activity?.payload?.consumedTokenId),
  3870 |     declarationCosts: metadata.declarationCost || "Consume 1 Token",
  3871 |     responseIds: (activity?.responses || []).map((entry) => entry.id),
  3872 |     passOrder: (activity?.responses || []).filter((entry) => entry.type === "pass").map((entry) => entry.playerId),
  3873 |     resolverMode: metadata.resolutionMode,
  3874 |     resolutionResult: result,
  3875 |     stateMutations: mutations,
  3876 |     persistentStateIds,
  3877 |     parentEffectId: response?.respondingToPromptId || "",
  3878 |     childEffectIds: (activity?.responses || []).map((entry) => entry.id),
  3879 |     hostConfirmation,
  3880 |     undoLogId,
  3881 |     undoStatus: "available",
  3882 |     testData: Boolean(state.testingTools?.activeScenario)
  3883 |   };
  3884 |   state.effectAuditRecords ||= [];
  3885 |   state.effectAuditRecords.unshift(record);
  3886 |   return record;
  3887 | }
  3888 |
  3889 | async function resolveImmediateTokenUse(draft, { context = {} } = {}) {
  3890 |   const metadata = tokenEffectMetadataByName(draft.tokenName);
  3891 |   if (metadata.resolverId === "extraEncounter") {
  3892 |     alert("Extra Encounter is used from the current Route action. Open Routes and use the Token on the Route you want to explore.");
  3893 |     return null;
  3894 |   }
  3895 |   const timingCheck = tokenUseTimingCheck({ player: draft.actor, tokenName: draft.tokenName, metadata, context });
  3896 |   if (!timingCheck.ok) {
  3897 |     alert(timingCheck.reason);
  3898 |     return null;
  3899 |   }
  3900 |   if (metadata.id === "substitute") {
  3901 |     const legality = controlTokenDraftLegality(draft, metadata);
  3902 |     if (!legality.ok) {
  3903 |       alert(legality.reason);
  3904 |       return null;
  3905 |     }
  3906 |   }
  3907 |   if (metadata.resolverId === "substituteAttach") {
  3908 |     const targetPokemon = (state.pokemonRecords || []).find((pokemon) => pokemon.id === draft.targetPokemonId);
  3909 |     if (!targetPokemon || targetPokemon.trainerId !== draft.actorPlayerId || ["Released", "Removed"].includes(targetPokemon.status)) {
  3910 |       alert("Choose a specific Pokemon owned by the acting player for Substitute.");
  3911 |       return null;
  3912 |     }
  3913 |     const activeSubstitute = (state.lingeringStatuses || []).some((status) => status.status === "active"
  3914 |       && status.type === "substitute-attached"
  3915 |       && status.targetPokemonId === targetPokemon.id);
  3916 |     if (activeSubstitute) {
  3917 |       alert(`${targetPokemon.name} already has a Substitute.`);
  3918 |       return null;
  3919 |     }
  3920 |   }
  3921 |   const rollbackSnapshot = tokenUseRollbackSnapshot();
  3922 |   const consumed = metadata.consumesOnLegalUse
  3923 |     ? consumeTokenForEffect({
  3924 |       player: draft.actor,
  3925 |       tokenName: draft.tokenName,
  3926 |       metadata,
  3927 |       source: "token-engine-v1"
  3928 |     })
  3929 |     : { token: null, consumption: null };
  3930 |   if (metadata.consumesOnLegalUse && !consumed?.token) {
  3931 |     alert(`${draft.actor.name} does not have ${draft.tokenName}.`);
  3932 |     return null;
  3933 |   }
  3934 |   const consumedToken = consumed?.token || { id: "", name: draft.tokenName };
  3935 |   const now = new Date().toISOString();
  3936 |   const details = [
  3937 |     `Token: ${consumedToken.name || draft.tokenName}`,
  3938 |     `Timing: ${(timingCheck.windows || []).join(", ") || "manual"}`,
  3939 |     `Pattern: ${metadata.activationPattern || "manual"}`
  3940 |   ];
  3941 |   const statusIds = [];
  3942 |   let result = "resolved";
  3943 |   if (metadata.resolverId === "safeguard") {
  3944 |     const expires = statusExpiresAt(1);
  3945 |     const status = applyLingeringEffect({
  3946 |       type: "safeguard",
  3947 |       name: "Safeguard",
  3948 |       category: TOKEN_TIMING_CATEGORIES.PROTECTION,
  3949 |       isCurse: false,
  3950 |       sourceTokenId: consumedToken.id || "",
  3951 |       sourceTokenName: consumedToken.name || draft.tokenName,
  3952 |       actorPlayerId: draft.actorPlayerId,
  3953 |       actorPlayerName: draft.actor?.name || "",
  3954 |       targetPlayerId: draft.actorPlayerId,
  3955 |       targetPlayerName: draft.actor?.name || "",
  3956 |       duration: metadata.duration,
  3957 |       durationGyms: 1,
  3958 |       expiresAtSeries: expires.expiresAtSeries,
  3959 |       expiresAtGym: expires.expiresAtGym,
  3960 |       payload: { protectionScope: metadata.protectionScope },
  3961 |       note: "Money and Tokens cannot be stolen, destroyed, or copied. Follow Me and Embargo do not affect this player.",
  3962 |       createdAt: now
  3963 |     });
  3964 |     statusIds.push(status.id);
  3965 |     details.push("Created lingering Safeguard protection.");
  3966 |     result = "lingering-protection-created";
  3967 |   } else if (metadata.resolverId === "substituteAttach") {
  3968 |     const targetPokemon = (state.pokemonRecords || []).find((pokemon) => pokemon.id === draft.targetPokemonId);
  3969 |     const expires = statusExpiresAt(1);
  3970 |     const placement = controlTokenEffects?.resolveSubstitutePlacement(state, {
  3971 |       sourceTokenId: consumedToken.id || "",
  3972 |       sourceTokenName: consumedToken.name || draft.tokenName,
  3973 |       actorPlayerId: draft.actorPlayerId,
  3974 |       actorPlayerName: draft.actor?.name || "",
  3975 |       targetPokemonId: targetPokemon.id,
  3976 |       requiredOwnerPlayerId: draft.actorPlayerId,
  3977 |       duration: metadata.duration,
  3978 |       durationGyms: 1,
  3979 |       expiresAtSeries: expires.expiresAtSeries,
  3980 |       expiresAtGym: expires.expiresAtGym,
  3981 |       sourceEffectId: `substitute-placement-${Date.now()}`
  3982 |     }, controlTokenEffectOptions(now));
  3983 |     if (!placement || placement.result !== "resolved") {
  3984 |       alert(placement?.reason || "Substitute could not be attached.");
  3985 |       return null;
  3986 |     }
  3987 |     statusIds.push(...placement.statusIds);
  3988 |     details.push(placement.reason);
  3989 |     result = "attached-protection-created";
  3990 |   } else {
  3991 |     details.push(metadata.shortPromptText || "Token use recorded. Effect application is manual.");
  3992 |     result = "manual-required";
  3993 |   }
  3994 |   const activation = createTokenActivationRecord({ consumedToken, metadata, draft, statusIds, details });
  3995 |   const targetLabel = tokenUseTargetLabel(draft);
  3996 |   const resolutionAudit = tokenEffectAuditRecord({
  3997 |     stage: "resolution",
  3998 |     draft: { ...draft, consumedTokenId: consumedToken.id || "" },
  3999 |     metadata,
  4000 |     result: result === "manual-required" ? "noEffect" : "resolved",
  4001 |     mutations: details,
  4002 |     persistentStateIds: [...statusIds].filter(Boolean)
  4003 |   });
  4004 |   const resolutionLog = addLogEntry({
  4005 |     action: "token",
  4006 |     category: "tokens",
  4007 |     player: draft.actor?.name || "Table",
  4008 |     item: `${draft.actor?.name || "A player"} used ${consumedToken.name || draft.tokenName}${targetLabel ? ` on ${targetLabel}` : ""}.`,
  4009 |     title: `${draft.actor?.name || "A player"} used ${consumedToken.name || draft.tokenName}`,
  4010 |     summary: details.join("\n"),
  4011 |     details,
  4012 |     type: "token-engine-v1",
  4013 |     categories: ["tokens", metadata.timingCategory, metadata.persistence, metadata.objectType].filter(Boolean),
  4014 |     tags: ["token-engine-v1", metadata.resolverId, ...(metadata.family || []), consumedToken.name || draft.tokenName].filter(Boolean),
  4015 |     playerIds: [draft.actorPlayerId, draft.targetPlayerId].filter(Boolean),
  4016 |     tokenNames: [consumedToken.name || draft.tokenName],
  4017 |     tokenId: consumedToken.id || "",
  4018 |     tokenActivationId: activation.id,
  4019 |     encounterSessionId,
  4020 |     effectAuditId: resolutionAudit.id,
  4021 |     tokenConsumptionIds: consumed?.consumption ? [consumed.consumption.id] : [],
  4022 |     statusIds,
  4023 |     tokenUse: {
  4024 |       tokenName: consumedToken.name || draft.tokenName,
  4025 |       actorId: draft.actorPlayerId,
  4026 |       sourceTokenId: consumedToken.id || "",
  4027 |       timingWindow: timingCheck.windows,
  4028 |       activationPattern: metadata.activationPattern,
  4029 |       target: targetLabel,
  4030 |       result,
  4031 |       consumed: Boolean(consumed?.token),
  4032 |       blocked: false,
  4033 |       createdEffectId: statusIds[0] || "",
  4034 |       pendingEventId: "",
  4035 |       timestamp: now
  4036 |     },
  4037 |     undoable: true,
  4038 |     undone: false,
  4039 |     undoData: {
  4040 |       actionType: "undoUtilityTokenActivation",
  4041 |       activationId: activation.id,
  4042 |       ...rollbackSnapshot
  4043 |     }
  4044 |   });
  4045 |   resolutionAudit.undoLogId = resolutionLog?.id || "";
  4046 |   const outcomeTitle = metadata.resolverId === "safeguard"
  4047 |       ? "Safeguard active."
  4048 |       : metadata.resolverId === "substituteAttach"
  4049 |         ? "Substitute attached."
  4050 |         : `${consumedToken.name || draft.tokenName} resolved.`;
  4051 |   const immediateActivity = {
  4052 |     id: activation.id,
  4053 |     title: consumedToken.name || draft.tokenName,
  4054 |     actorPlayerId: draft.actorPlayerId,
  4055 |     targetPlayerId: draft.targetPlayerId || findPokemonRecord(draft.targetPokemonId)?.trainerId || "",
  4056 |     responses: [],
  4057 |     payload: {
  4058 |       tokenName: consumedToken.name || draft.tokenName,
  4059 |       targetPlayerId: draft.targetPlayerId || findPokemonRecord(draft.targetPokemonId)?.trainerId || "",
  4060 |       targetPokemonId: draft.targetPokemonId || "",
  4061 |       targetPokemonName: draft.targetPokemonName || "",
  4062 |       selectedTargetType: draft.selectedTargetType || metadata.selectedTargetType || draft.targetType || "",
  4063 |       selectedRosterInstanceId: draft.selectedRosterInstanceId || draft.targetPokemonId || "",
  4064 |       selectedSpeciesId: draft.selectedSpeciesId || draft.speciesId || "",
  4065 |       applicationScope: draft.applicationScope || metadata.applicationScope || ""
  4066 |     }
  4067 |   };
  4068 |   const immediateSummary = tokenResultSummary?.buildResultSummary?.({
  4069 |     state,
  4070 |     activity: immediateActivity,
  4071 |     finalOutcome: result === "manual-required" ? "resolvedNoEffect" : "resolved",
  4072 |     resultData: {
  4073 |       createdStatusIds: statusIds,
  4074 |       affectedRosterInstanceIds: [draft.targetPokemonId].filter(Boolean),
  4075 |       consumedTokenRecords: consumed?.consumption ? [consumed.consumption] : [],
  4076 |       operations: []
  4077 |     },
  4078 |     continuation: details.slice(-2).join(" ")
  4079 |   });
  4080 |   const immediatePresentation = immediateSummary && tokenResultSummary?.announcementForResult
  4081 |     ? tokenResultSummary.announcementForResult(immediateSummary, state)
  4082 |     : { title: outcomeTitle, detail: details.slice(-2).join(" "), tone: result === "manual-required" ? "manual" : "resolved" };
  4083 |   queueLiveResolutionAnnouncement({
  4084 |     id: `resolution:${activation.id}`,
  4085 |     ...immediatePresentation,
  4086 |     linkedEventId: "",
  4087 |     resultSummary: immediateSummary
  4088 |   });
  4089 |   syncPlayerPokemonLists();
  4090 |   saveState({ immediate: true });
  4091 |   render();
  4092 |   return activation;
  4093 | }
  4094 |
  4095 | function resolveDittoInventoryCopyUse(draft, metadata) {
  4096 |   const legality = controlTokenDraftLegality(draft, metadata);
  4097 |   if (!legality.ok) { alert(legality.reason); return null; }
  4098 |   const definition = globalThis.rivalSagaTokenEffectContract?.definitionFor?.(draft.resourceDefinitionId || "");
  4099 |   const undo = tokenUseRollbackSnapshot();
  4100 |   const consumed = consumeTokenForEffect({ player: draft.actor, tokenName: draft.tokenName, metadata, source: "ditto-transform" });
  4101 |   if (!consumed?.token) { alert(`${draft.actor.name} does not have ${draft.tokenName}.`); return null; }
  4102 |   const sourceEffectId = `ditto:${consumed.consumption?.id || consumed.token.id}`;
  4103 |   const result = controlTokenEffects.createCanonicalTokenInventoryCopy(state, {
  4104 |     ownerPlayerId: draft.actorPlayerId, definition, sourceEffectId,
  4105 |     sourceInventoryRecordId: consumed.token.id, sourcePlayerId: draft.actorPlayerId, copySourceType: "ditto"
  4106 |   }, { ...controlTokenEffectOptions(), definitionFor: (value) => globalThis.rivalSagaTokenEffectContract?.definitionFor?.(value) || null });
  4107 |   if (result.result !== "resolved") {
  4108 |     restoreTokenEffectContractUndoData(undo);
  4109 |     alert(result.reason);
  4110 |     return null;
  4111 |   }
  4112 |   addLogEntry({
  4113 |     action: "token", category: "tokens", player: draft.actor.name,
  4114 |     item: `${draft.actor.name}'s Ditto became ${definition.name}.`, title: "Ditto transformed",
  4115 |     summary: `Created one canonical ${definition.name} inventory copy. It was not activated.`,
  4116 |     type: "ditto-token-copy", categories: ["tokens"], tags: ["ditto", "inventory-copy"],
  4117 |     playerIds: [draft.actorPlayerId], tokenNames: ["Ditto", definition.name], undoable: true, undone: false,
  4118 |     undoData: { actionType: "undoTokenEffectContract", ...undo }
  4119 |   });
  4120 |   resetLiveRefereeScreenState();
  4121 |   saveState({ immediate: true });
  4122 |   render();
  4123 |   return result;
  4124 | }
  4125 |
  4126 | async function resolveTokenUse(draft, { context = {} } = {}) {
  4127 |   if (!draft?.actor) {
  4128 |     alert("Choose a player before using this token.");
  4129 |     return null;
  4130 |   }
  4131 |   const metadata = tokenEffectMetadataByName(draft.tokenName);
  4132 |   const pendingEvent = context.pendingEvent || getCurrentPendingEvent();
  4133 |   const timingCheck = tokenUseTimingCheck({ player: draft.actor, tokenName: draft.tokenName, metadata, context: { ...context, pendingEvent } });
  4134 |   if (!timingCheck.ok) {
  4135 |     alert(timingCheck.reason);
  4136 |     return null;
  4137 |   }
  4138 |   if (pendingEvent) {
  4139 |     if (metadata.timingWindows.includes(TOKEN_TIMING_WINDOWS.WHEEL_WINDOW) || metadata.timingCategory === TOKEN_TIMING_CATEGORIES.ENCOUNTER) {
  4140 |       return recordEncounterTokenUse(draft);
  4141 |     }
  4142 |     if (metadata.activationPattern === TOKEN_ACTIVATION_PATTERNS.RESPONSE || metadata.timingCategory === TOKEN_TIMING_CATEGORIES.PROTECTION) {
  4143 |       return recordProtectionTokenUse(draft);
  4144 |     }
  4145 |     alert(`${metadata.name || draft.tokenName} is not a response to the current prompt.`);
  4146 |     return null;
  4147 |   }
  4148 |   if (metadata.id === "ditto-token") return resolveDittoInventoryCopyUse(draft, metadata);
  4149 |   if (metadata.canOpenPendingEvent || metadata.createsPendingEvent || [TOKEN_TIMING_CATEGORIES.CONTROL, TOKEN_TIMING_CATEGORIES.CURSE].includes(metadata.timingCategory)) {
  4150 |     return createTokenPendingEventFromUse(draft);
  4151 |   }
  4152 |   return resolveImmediateTokenUse(draft, { context });
  4153 | }
  4154 |
  4155 | function tokenDraftFromActivity(activity, resolutionText = "") {
  4156 |   const actor = state.players.find((player) => player.id === activity?.actorPlayerId);
  4157 |   const target = state.players.find((player) => player.id === activity?.targetPlayerId);
  4158 |   return {
  4159 |     actor,
  4160 |     target,
  4161 |     actorPlayerId: actor?.id || activity?.actorPlayerId || "",
  4162 |     targetPlayerId: target?.id || activity?.targetPlayerId || "",
  4163 |     targetPlayerName: target?.name || activity?.payload?.targetPlayerName || "",
  4164 |     targetPokemonId: activity?.payload?.targetPokemonId || "",
  4165 |     targetPokemonName: activity?.payload?.targetPokemonName || "",
  4166 |     targetText: activity?.payload?.targetText || "",
  4167 |     tokenName: activity?.payload?.tokenName || "",
  4168 |     category: tokenTimingCategoryFromRaw(activity?.payload?.tokenTimingCategory),
  4169 |     targetType: activity?.payload?.targetType || "",
  4170 |     targetScope: activity?.payload?.targetScope || "",
  4171 |     selectedTargetType: activity?.payload?.selectedTargetType || "",
  4172 |     applicationScope: activity?.payload?.applicationScope || "",
  4173 |     affectedEntityType: activity?.payload?.affectedEntityType || "",
  4174 |     selectedRosterInstanceId: activity?.payload?.selectedRosterInstanceId || "",
  4175 |     selectedStatusId: activity?.payload?.selectedStatusId || "",
  4176 |     selectedSpeciesId: activity?.payload?.selectedSpeciesId || "",
  4177 |     speciesId: activity?.payload?.speciesId || "",
  4178 |     selectedRosterInstanceIds: activity?.payload?.selectedRosterInstanceIds || [],
  4179 |     affectedRosterInstanceIds: activity?.payload?.affectedRosterInstanceIds || [],
  4180 |     excludedRosterInstanceIds: activity?.payload?.excludedRosterInstanceIds || [],
  4181 |     resourceSelections: activity?.payload?.resourceSelections || [],
  4182 |     substituteInterceptionPolicy: activity?.payload?.substituteInterceptionPolicy || "",
  4183 |     substituteChecksSelectedTargetOnly: activity?.payload?.substituteChecksSelectedTargetOnly,
  4184 |     sourceEffectId: activity?.id || "",
  4185 |     notes: resolutionText
  4186 |   };
  4187 | }
  4188 |
  4189 | function causalIdCollectionDelta(previous = [], current = []) {
  4190 |   const before = new Map((previous || []).filter((entry) => entry?.id).map((entry) => [entry.id, entry]));
  4191 |   const after = new Map((current || []).filter((entry) => entry?.id).map((entry) => [entry.id, entry]));
  4192 |   return {
  4193 |     createdIds: [...after.keys()].filter((id) => !before.has(id)),
  4194 |     previousRecords: [...before.entries()]
  4195 |       .filter(([id]) => !after.has(id))
  4196 |       .map(([, record]) => structuredClone(record)),
  4197 |     changedRecords: [...before.entries()]
  4198 |       .filter(([id, record]) => after.has(id) && JSON.stringify(record) !== JSON.stringify(after.get(id)))
  4199 |       .map(([id, record]) => ({
  4200 |         id,
  4201 |         fields: causalTopLevelFieldDelta(record, after.get(id))
  4202 |       }))
  4203 |   };
  4204 | }
  4205 |
  4206 | function causalTopLevelFieldDelta(previous = {}, current = {}, ignoredKeys = []) {
  4207 |   const ignored = new Set(ignoredKeys || []);
  4208 |   return [...new Set([...Object.keys(previous || {}), ...Object.keys(current || {})])]
  4209 |     .filter((key) => !ignored.has(key) && JSON.stringify(previous?.[key]) !== JSON.stringify(current?.[key]))
  4210 |     .map((key) => ({
  4211 |       key,
  4212 |       previousExists: Object.prototype.hasOwnProperty.call(previous || {}, key),
  4213 |       previous: structuredClone(previous?.[key]),
  4214 |       appliedExists: Object.prototype.hasOwnProperty.call(current || {}, key),
  4215 |       applied: structuredClone(current?.[key])
  4216 |     }));
  4217 | }
  4218 |
  4219 | function causalScalarSetDelta(previous = [], current = []) {
  4220 |   const before = new Set(previous || []);
  4221 |   const after = new Set(current || []);
  4222 |   return {
  4223 |     added: [...after].filter((value) => !before.has(value)),
  4224 |     removed: [...before].filter((value) => !after.has(value))
  4225 |   };
  4226 | }
  4227 |
  4228 | function mergeCausalIdCollectionDelta(base = {}, later = {}) {
  4229 |   const createdIds = [...new Set([...(base.createdIds || []), ...(later.createdIds || [])])];
  4230 |   const created = new Set(createdIds);
  4231 |   const previousById = new Map((base.previousRecords || []).map((record) => [record.id, structuredClone(record)]));
  4232 |   (later.previousRecords || []).forEach((record) => {
  4233 |     if (!created.has(record.id) && !previousById.has(record.id)) previousById.set(record.id, structuredClone(record));
  4234 |   });
  4235 |   const changedById = new Map((base.changedRecords || []).map((entry) => [entry.id, structuredClone(entry)]));
  4236 |   (later.changedRecords || []).forEach((entry) => {
  4237 |     if (created.has(entry.id) || previousById.has(entry.id)) return;
  4238 |     const existing = changedById.get(entry.id);
  4239 |     if (!existing) {
  4240 |       changedById.set(entry.id, structuredClone(entry));
  4241 |       return;
  4242 |     }
  4243 |     const fieldsByKey = new Map((existing.fields || []).map((field) => [field.key, field]));
  4244 |     (entry.fields || []).forEach((field) => {
  4245 |       if (!fieldsByKey.has(field.key)) fieldsByKey.set(field.key, structuredClone(field));
  4246 |       else fieldsByKey.get(field.key).applied = structuredClone(field.applied);
  4247 |     });
  4248 |     existing.fields = [...fieldsByKey.values()];
  4249 |   });
  4250 |   return { createdIds, previousRecords: [...previousById.values()], changedRecords: [...changedById.values()] };
  4251 | }
  4252 |
  4253 | function mergeCausalScalarSetDelta(base = {}, later = {}) {
  4254 |   const added = new Set(base.added || []);
  4255 |   const removed = new Set(base.removed || []);
  4256 |   (later.added || []).forEach((value) => removed.delete(value) || added.add(value));
  4257 |   (later.removed || []).forEach((value) => added.delete(value) || removed.add(value));
  4258 |   return { added: [...added], removed: [...removed] };
  4259 | }
  4260 |
  4261 | function causalPlayerCollectionDeltas(previousPlayers = [], currentPlayers = [], field = "inventory") {
  4262 |   const currentById = new Map((currentPlayers || []).map((player) => [player.id, player]));
  4263 |   return (previousPlayers || []).map((player) => ({
  4264 |     playerId: player.id,
  4265 |     delta: causalIdCollectionDelta(player[field] || [], currentById.get(player.id)?.[field] || [])
  4266 |   })).filter((entry) => entry.delta.createdIds.length || entry.delta.previousRecords.length || entry.delta.changedRecords.length);
  4267 | }
  4268 |
  4269 | function causalGrantMapDeltas(previousMap = {}, currentMap = {}) {
  4270 |   return [...new Set([...Object.keys(previousMap || {}), ...Object.keys(currentMap || {})])].map((playerId) => ({
  4271 |     playerId,
  4272 |     delta: causalIdCollectionDelta(previousMap?.[playerId] || [], currentMap?.[playerId] || [])
  4273 |   })).filter((entry) => entry.delta.createdIds.length || entry.delta.previousRecords.length || entry.delta.changedRecords.length);
  4274 | }
  4275 |
  4276 | function buildCausalTokenEffectUndo(snapshot, activity, metadata) {
  4277 |   const previousPokemonById = new Map((snapshot.previousPokemonRecords || []).map((pokemon) => [pokemon.id, pokemon]));
  4278 |   const pokemonDeltas = (state.pokemonRecords || []).map((pokemon) => {
  4279 |     const previous = previousPokemonById.get(pokemon.id);
  4280 |     if (!previous) return null;
  4281 |     const effectBuffs = causalIdCollectionDelta(previous.effectBuffs || [], pokemon.effectBuffs || []);
  4282 |     const logs = causalIdCollectionDelta(previous.log || [], pokemon.log || []);
  4283 |     const beforeLabels = new Set(previous.buffs || []);
  4284 |     const afterLabels = new Set(pokemon.buffs || []);
  4285 |     const labelsAdded = [...afterLabels].filter((label) => !beforeLabels.has(label));
  4286 |     const labelsRemoved = [...beforeLabels].filter((label) => !afterLabels.has(label));
  4287 |     if (!effectBuffs.createdIds.length && !effectBuffs.previousRecords.length && !logs.createdIds.length
  4288 |       && !logs.previousRecords.length && !labelsAdded.length && !labelsRemoved.length) return null;
  4289 |     return { pokemonId: pokemon.id, effectBuffs, logs, labelsAdded, labelsRemoved, previousLabelOrder: structuredClone(previous.buffs || []) };
  4290 |   }).filter(Boolean);
  4291 |   const previousRules = snapshot.previousGlobalPokemonRules || {};
  4292 |   const currentRules = state.globalPokemonRules || {};
  4293 |   const ruleDeltas = [...new Set([...Object.keys(previousRules), ...Object.keys(currentRules)])]
  4294 |     .filter((key) => JSON.stringify(previousRules[key]) !== JSON.stringify(currentRules[key]))
  4295 |     .map((key) => ({ key, existed: Object.prototype.hasOwnProperty.call(previousRules, key), previous: structuredClone(previousRules[key] || null) }));
  4296 |   const currentPlayersById = new Map((state.players || []).map((player) => [player.id, player]));
  4297 |   const playerBalanceDeltas = (snapshot.previousPlayers || []).map((player) => ({
  4298 |     playerId: player.id,
  4299 |     amount: Number(currentPlayersById.get(player.id)?.balance || 0) - Number(player.balance || 0)
  4300 |   })).filter((entry) => entry.amount !== 0);
  4301 |   const currentPokemonIdsByPlayer = new Map((state.players || []).map((player) => [player.id, player.pokemonIds || []]));
  4302 |   const playerPokemonIdDeltas = (snapshot.previousPlayers || []).map((player) => ({
  4303 |     playerId: player.id,
  4304 |     delta: causalScalarSetDelta(player.pokemonIds || [], currentPokemonIdsByPlayer.get(player.id) || [])
  4305 |   })).filter((entry) => entry.delta.added.length || entry.delta.removed.length);
  4306 |   return {
  4307 |     actionType: "undoTokenEffectContractCausal",
  4308 |     causalUndoVersion: 1,
  4309 |     effectId: activity.id,
  4310 |     tokenDefinitionId: metadata.id,
  4311 |     inventoryByPlayer: causalPlayerCollectionDeltas(snapshot.previousPlayers, state.players, "inventory"),
  4312 |     playerBalanceDeltas,
  4313 |     moveGrantsByPlayer: causalPlayerCollectionDeltas(snapshot.previousPlayers, state.players, "moveAccessGrants"),
  4314 |     playerPokemonIdDeltas,
  4315 |     pokemonRecords: causalIdCollectionDelta(snapshot.previousPokemonRecords, state.pokemonRecords),
  4316 |     statuses: causalIdCollectionDelta(snapshot.previousLingeringStatuses, state.lingeringStatuses),
  4317 |     activations: causalIdCollectionDelta(snapshot.previousTokenActivations, state.tokenActivations),
  4318 |     consumptions: causalIdCollectionDelta(snapshot.previousTokenConsumptions, state.tokenConsumptions),
  4319 |     transactions: causalIdCollectionDelta(snapshot.previousTransactions, state.transactions),
  4320 |     notifications: causalIdCollectionDelta(snapshot.previousPlayerNotifications, state.playerNotifications),
  4321 |     effectOperations: causalIdCollectionDelta(snapshot.previousEffectOperations, state.effectOperations),
  4322 |     copiedActivations: causalIdCollectionDelta(snapshot.previousCopiedActivations, state.copiedActivations),
  4323 |     copiedTokenRelationships: causalIdCollectionDelta(snapshot.previousCopiedTokenRelationships, state.copiedTokenRelationships),
  4324 |     wheelSessions: causalIdCollectionDelta(snapshot.previousWheelSessions, state.wheelSessions),
  4325 |     randomPokemonSessions: causalIdCollectionDelta(snapshot.previousRandomPokemonSessions, state.randomPokemonSessions),
  4326 |     delayedEffects: causalIdCollectionDelta(snapshot.previousDelayedEffects, state.delayedEffects),
  4327 |     broughtTeamSnapshots: causalIdCollectionDelta(snapshot.previousBroughtTeamSnapshots, state.broughtTeamSnapshots),
  4328 |     postPayoutProcedures: causalIdCollectionDelta(snapshot.previousPostPayoutProcedures, state.postPayoutProcedures),
  4329 |     encounterCopyRecords: causalIdCollectionDelta(snapshot.previousEncounterCopyRecords, state.encounterCopyRecords),
  4330 |     teambuilderFields: causalTopLevelFieldDelta(snapshot.previousTeambuilder || {}, state.teambuilder || {}, ["moveAccessGrantsByPlayerId"]),
  4331 |     battleTeamFields: causalTopLevelFieldDelta(snapshot.previousBattleTeams || {}, state.battleTeams || {}),
  4332 |     pokemonDeltas,
  4333 |     pokemonLog: causalIdCollectionDelta(snapshot.previousPokemonLog || [], state.pokemonLog || []),
  4334 |     teambuilderMoveGrants: causalGrantMapDeltas(snapshot.previousTeambuilder?.moveAccessGrantsByPlayerId, state.teambuilder?.moveAccessGrantsByPlayerId),
  4335 |     perkMoveGrants: causalGrantMapDeltas(snapshot.previousPerkSystem?.moveAccessGrantsByPlayerId, state.perkSystem?.moveAccessGrantsByPlayerId),
  4336 |     classMoveGrants: causalGrantMapDeltas(
  4337 |       Object.fromEntries(Object.entries(snapshot.previousClassStateByPlayerId || {}).map(([id, value]) => [id, value?.moveAccessGrants || []])),
  4338 |       Object.fromEntries(Object.entries(state.classStateByPlayerId || {}).map(([id, value]) => [id, value?.moveAccessGrants || []]))
  4339 |     ),
  4340 |     ruleDeltas,
  4341 |     banlistHistory: causalIdCollectionDelta(snapshot.previousBanlistHistory, state.banlistHistory)
  4342 |   };
  4343 | }
  4344 |
  4345 | function mergeCausalTokenUndoData(base = {}, later = {}) {
  4346 |   const merged = structuredClone(base || {});
  4347 |   const collectionKeys = [
  4348 |     "pokemonRecords", "statuses", "activations", "consumptions", "transactions", "notifications",
  4349 |     "effectOperations", "copiedActivations", "copiedTokenRelationships", "wheelSessions",
  4350 |     "randomPokemonSessions", "delayedEffects", "broughtTeamSnapshots", "postPayoutProcedures",
  4351 |     "encounterCopyRecords", "pokemonLog", "banlistHistory"
  4352 |   ];
  4353 |   collectionKeys.forEach((key) => {
  4354 |     merged[key] = mergeCausalIdCollectionDelta(merged[key], later[key]);
  4355 |   });
  4356 |   const mergePlayerDeltas = (key) => {
  4357 |     const byPlayer = new Map((merged[key] || []).map((entry) => [entry.playerId, structuredClone(entry)]));
  4358 |     (later[key] || []).forEach((entry) => {
  4359 |       if (!byPlayer.has(entry.playerId)) byPlayer.set(entry.playerId, structuredClone(entry));
  4360 |       else byPlayer.get(entry.playerId).delta = mergeCausalIdCollectionDelta(byPlayer.get(entry.playerId).delta, entry.delta);
  4361 |     });
  4362 |     merged[key] = [...byPlayer.values()];
  4363 |   };
  4364 |   ["inventoryByPlayer", "moveGrantsByPlayer", "teambuilderMoveGrants", "perkMoveGrants", "classMoveGrants"].forEach(mergePlayerDeltas);
  4365 |   const pokemonIdsByPlayer = new Map((merged.playerPokemonIdDeltas || []).map((entry) => [entry.playerId, structuredClone(entry)]));
  4366 |   (later.playerPokemonIdDeltas || []).forEach((entry) => {
  4367 |     if (!pokemonIdsByPlayer.has(entry.playerId)) pokemonIdsByPlayer.set(entry.playerId, structuredClone(entry));
  4368 |     else pokemonIdsByPlayer.get(entry.playerId).delta = mergeCausalScalarSetDelta(pokemonIdsByPlayer.get(entry.playerId).delta, entry.delta);
  4369 |   });
  4370 |   merged.playerPokemonIdDeltas = [...pokemonIdsByPlayer.values()];
  4371 |   const mergeFields = (baseFields = [], laterFields = []) => {
  4372 |     const byKey = new Map((baseFields || []).map((field) => [field.key, structuredClone(field)]));
  4373 |     (laterFields || []).forEach((field) => {
  4374 |       if (!byKey.has(field.key)) byKey.set(field.key, structuredClone(field));
  4375 |       else {
  4376 |         byKey.get(field.key).appliedExists = field.appliedExists;
  4377 |         byKey.get(field.key).applied = structuredClone(field.applied);
  4378 |       }
  4379 |     });
  4380 |     return [...byKey.values()];
  4381 |   };
  4382 |   merged.teambuilderFields = mergeFields(merged.teambuilderFields, later.teambuilderFields);
  4383 |   merged.battleTeamFields = mergeFields(merged.battleTeamFields, later.battleTeamFields);
  4384 |   merged.pokemonDeltas = [...(merged.pokemonDeltas || []), ...(later.pokemonDeltas || [])];
  4385 |   merged.ruleDeltas = [...(merged.ruleDeltas || []), ...(later.ruleDeltas || []).filter((entry) => !(merged.ruleDeltas || []).some((current) => current.key === entry.key))];
  4386 |   return merged;
  4387 | }
  4388 |
  4389 | function applyCausalIdCollectionUndo(collection = [], delta = {}) {
  4390 |   const createdIds = new Set(delta.createdIds || []);
  4391 |   const next = (collection || []).filter((entry) => !createdIds.has(entry?.id));
  4392 |   (delta.previousRecords || []).forEach((record) => {
  4393 |     const index = next.findIndex((entry) => entry?.id === record.id);
  4394 |     if (index >= 0) next[index] = structuredClone(record);
  4395 |     else next.push(structuredClone(record));
  4396 |   });
  4397 |   (delta.changedRecords || []).forEach(({ id, fields }) => {
  4398 |     const record = next.find((entry) => entry?.id === id);
  4399 |     if (!record) return;
  4400 |     (fields || []).forEach((field) => {
  4401 |       const currentExists = Object.prototype.hasOwnProperty.call(record, field.key);
  4402 |       if (currentExists !== Boolean(field.appliedExists) || JSON.stringify(record[field.key]) !== JSON.stringify(field.applied)) return;
  4403 |       if (field.previousExists) record[field.key] = structuredClone(field.previous);
  4404 |       else delete record[field.key];
  4405 |     });
  4406 |   });
  4407 |   return next;
  4408 | }
  4409 |
  4410 | function applyCausalScalarSetUndo(collection = [], delta = {}) {
  4411 |   const added = new Set(delta.added || []);
  4412 |   const next = (collection || []).filter((value) => !added.has(value));
  4413 |   (delta.removed || []).forEach((value) => {
  4414 |     if (!next.includes(value)) next.push(value);
  4415 |   });
  4416 |   return next;
  4417 | }
  4418 |
  4419 | function applyCausalTopLevelFieldUndo(target = {}, fields = []) {
  4420 |   (fields || []).forEach((field) => {
  4421 |     const currentExists = Object.prototype.hasOwnProperty.call(target, field.key);
  4422 |     if (currentExists !== Boolean(field.appliedExists) || JSON.stringify(target[field.key]) !== JSON.stringify(field.applied)) return;
  4423 |     if (field.previousExists) target[field.key] = structuredClone(field.previous);
  4424 |     else delete target[field.key];
  4425 |   });
  4426 |   return target;
  4427 | }
  4428 |
  4429 | function restoreCausalTokenEffectUndoData(undoData) {
  4430 |   (undoData.inventoryByPlayer || []).forEach(({ playerId, delta }) => {
  4431 |     const player = state.players.find((entry) => entry.id === playerId);
  4432 |     if (player) player.inventory = applyCausalIdCollectionUndo(player.inventory, delta);
  4433 |   });
  4434 |   (undoData.playerBalanceDeltas || []).forEach(({ playerId, amount }) => {
  4435 |     const player = state.players.find((entry) => entry.id === playerId);
  4436 |     if (player) player.balance = Number(player.balance || 0) - Number(amount || 0);
  4437 |   });
  4438 |   (undoData.moveGrantsByPlayer || []).forEach(({ playerId, delta }) => {
  4439 |     const player = state.players.find((entry) => entry.id === playerId);
  4440 |     if (player) player.moveAccessGrants = applyCausalIdCollectionUndo(player.moveAccessGrants, delta);
  4441 |   });
  4442 |   (undoData.playerPokemonIdDeltas || []).forEach(({ playerId, delta }) => {
  4443 |     const player = state.players.find((entry) => entry.id === playerId);
  4444 |     if (player) player.pokemonIds = applyCausalScalarSetUndo(player.pokemonIds, delta);
  4445 |   });
  4446 |   state.pokemonRecords = applyCausalIdCollectionUndo(state.pokemonRecords, undoData.pokemonRecords);
  4447 |   state.lingeringStatuses = applyCausalIdCollectionUndo(state.lingeringStatuses, undoData.statuses);
  4448 |   state.tokenActivations = applyCausalIdCollectionUndo(state.tokenActivations, undoData.activations);
  4449 |   state.tokenConsumptions = applyCausalIdCollectionUndo(state.tokenConsumptions, undoData.consumptions);
  4450 |   state.transactions = applyCausalIdCollectionUndo(state.transactions, undoData.transactions);
  4451 |   state.playerNotifications = applyCausalIdCollectionUndo(state.playerNotifications, undoData.notifications);
  4452 |   state.effectOperations = applyCausalIdCollectionUndo(state.effectOperations, undoData.effectOperations);
  4453 |   state.copiedActivations = applyCausalIdCollectionUndo(state.copiedActivations, undoData.copiedActivations);
  4454 |   state.copiedTokenRelationships = applyCausalIdCollectionUndo(state.copiedTokenRelationships, undoData.copiedTokenRelationships);
  4455 |   state.wheelSessions = applyCausalIdCollectionUndo(state.wheelSessions, undoData.wheelSessions);
  4456 |   state.randomPokemonSessions = applyCausalIdCollectionUndo(state.randomPokemonSessions, undoData.randomPokemonSessions);
  4457 |   state.delayedEffects = applyCausalIdCollectionUndo(state.delayedEffects, undoData.delayedEffects);
  4458 |   state.broughtTeamSnapshots = applyCausalIdCollectionUndo(state.broughtTeamSnapshots, undoData.broughtTeamSnapshots);
  4459 |   state.postPayoutProcedures = applyCausalIdCollectionUndo(state.postPayoutProcedures, undoData.postPayoutProcedures);
  4460 |   state.encounterCopyRecords = applyCausalIdCollectionUndo(state.encounterCopyRecords, undoData.encounterCopyRecords);
  4461 |   state.teambuilder ||= {};
  4462 |   applyCausalTopLevelFieldUndo(state.teambuilder, undoData.teambuilderFields);
  4463 |   state.battleTeams ||= {};
  4464 |   applyCausalTopLevelFieldUndo(state.battleTeams, undoData.battleTeamFields);
  4465 |   (undoData.pokemonDeltas || []).forEach((delta) => {
  4466 |     const pokemon = state.pokemonRecords.find((entry) => entry.id === delta.pokemonId);
  4467 |     if (!pokemon) return;
  4468 |     pokemon.effectBuffs = applyCausalIdCollectionUndo(pokemon.effectBuffs, delta.effectBuffs);
  4469 |     pokemon.log = applyCausalIdCollectionUndo(pokemon.log, delta.logs);
  4470 |     const removeLabels = new Set(delta.labelsAdded || []);
  4471 |     const previousLabels = delta.previousLabelOrder || [];
  4472 |     const laterLabels = (pokemon.buffs || []).filter((label) => !removeLabels.has(label) && !previousLabels.includes(label));
  4473 |     pokemon.buffs = [...previousLabels, ...laterLabels];
  4474 |   });
  4475 |   state.pokemonLog = applyCausalIdCollectionUndo(state.pokemonLog, undoData.pokemonLog);
  4476 |   const restoreGrantMap = (root, deltas) => (deltas || []).forEach(({ playerId, delta }) => {
  4477 |     root[playerId] = applyCausalIdCollectionUndo(root[playerId], delta);
  4478 |   });
  4479 |   state.teambuilder.moveAccessGrantsByPlayerId ||= {};
  4480 |   restoreGrantMap(state.teambuilder.moveAccessGrantsByPlayerId, undoData.teambuilderMoveGrants);
  4481 |   state.perkSystem ||= {};
  4482 |   state.perkSystem.moveAccessGrantsByPlayerId ||= {};
  4483 |   restoreGrantMap(state.perkSystem.moveAccessGrantsByPlayerId, undoData.perkMoveGrants);
  4484 |   state.classStateByPlayerId ||= {};
  4485 |   (undoData.classMoveGrants || []).forEach(({ playerId, delta }) => {
  4486 |     state.classStateByPlayerId[playerId] ||= {};
  4487 |     state.classStateByPlayerId[playerId].moveAccessGrants = applyCausalIdCollectionUndo(state.classStateByPlayerId[playerId].moveAccessGrants, delta);
  4488 |   });
  4489 |   (undoData.ruleDeltas || []).forEach((delta) => {
  4490 |     if (delta.existed) state.globalPokemonRules[delta.key] = structuredClone(delta.previous);
  4491 |     else delete state.globalPokemonRules[delta.key];
  4492 |   });
  4493 |   state.banlistHistory = applyCausalIdCollectionUndo(state.banlistHistory, undoData.banlistHistory);
  4494 |   if (undoData.tokenDefinitionId === "honey-token" && undoData.procedureId) {
  4495 |     const procedure = (state.endOfActionProcedures || []).find((entry) => entry.id === undoData.procedureId);
  4496 |     if (procedure) {
  4497 |       procedure.status = "undone";
  4498 |       procedure.undoneAt = new Date().toISOString();
  4499 |     }
  4500 |   }
  4501 |   if (state.selectedRandomPokemonSessionId && !(state.randomPokemonSessions || []).some((entry) => entry.id === state.selectedRandomPokemonSessionId)) {
  4502 |     state.selectedRandomPokemonSessionId = "";
  4503 |     state.randomPokemonDrawerOpen = false;
  4504 |   }
  4505 |   syncLinkedTransactions();
  4506 |   syncPlayerPokemonLists();
  4507 | }
  4508 |
  4509 | function recordTokenContractResolution(activity, metadata, {
  4510 |   result = "resolved",
  4511 |   details = [],
  4512 |   mutations = [],
  4513 |   persistentStateIds = [],
  4514 |   hostConfirmation = ""
  4515 | } = {}) {
  4516 |   const canonicalResult = result === "noEffect" ? "resolvedNoEffect"
  4517 |     : result === "canceled" ? "canceledRefunded"
  4518 |       : result;
  4519 |   const draft = tokenDraftFromActivity(activity, hostConfirmation);
  4520 |   const audit = tokenEffectAuditRecord({
```

## State normalization near Encounter copy records — `app.js:21870-21930`

```js
 21870 |   );
 21871 |   const localTokenArtLibrary = normalizeTokenArtLibrary(loadTokenImageOverrides());
 21872 |   const migratedTokenArtLibrary = Object.keys(savedTokenArtLibrary).length ? savedTokenArtLibrary : localTokenArtLibrary;
 21873 |   nextState.ruleset = normalizeRuleset(nextState.ruleset, { ...nextState, tokenArtLibrary: migratedTokenArtLibrary });
 21874 |   nextState.tokenArtLibrary = structuredClone(nextState.ruleset.contentLibraries.tokenArt || {});
 21875 |   nextState.log ||= [];
 21876 |   nextState.pokemonRecords ||= [];
 21877 |   nextState.pokemonLog ||= [];
 21878 |   nextState.battleRecords ||= [];
 21879 |   nextState.battleSchedules ||= {};
 21880 |   nextState.gymResults ||= [];
 21881 |   nextState.moneyLedger ||= [];
 21882 |   nextState.transactions ||= [];
 21883 |   nextState.transactions = nextState.transactions.map(normalizeTransactionRecord).filter(Boolean);
 21884 |   nextState.tokenConsumptions ||= [];
 21885 |   nextState.tokenConsumptions = nextState.tokenConsumptions.map(normalizeTokenConsumptionRecord).filter(Boolean);
 21886 |   nextState.playerNotifications ||= [];
 21887 |   nextState.playerNotifications.forEach((notification) => {
 21888 |     notification.status = ["pending", "completed", "dismissed", "expired"].includes(notification.status) ? notification.status : "pending";
 21889 |     notification.payload ||= {};
 21890 |   });
 21891 |   nextState.interactionEvents ||= [];
 21892 |   nextState.interactionEvents = interactionSituationLifecycle.cleanActivityRecords(nextState.interactionEvents)
 21893 |     .map((event) => normalizeInteractionActivity(event, nextState));
 21894 |   nextState.effectAuditRecords = Array.isArray(nextState.effectAuditRecords) ? nextState.effectAuditRecords : [];
 21895 |   nextState.effectOperations = Array.isArray(nextState.effectOperations) ? nextState.effectOperations : [];
 21896 |   nextState.delayedEffects = Array.isArray(nextState.delayedEffects) ? nextState.delayedEffects : [];
 21897 |   nextState.broughtTeamSnapshots = Array.isArray(nextState.broughtTeamSnapshots) ? nextState.broughtTeamSnapshots : [];
 21898 |   nextState.copiedActivations = Array.isArray(nextState.copiedActivations) ? nextState.copiedActivations : [];
 21899 |   nextState.postPayoutProcedures = Array.isArray(nextState.postPayoutProcedures) ? nextState.postPayoutProcedures : [];
 21900 |   nextState.endOfActionProcedures = Array.isArray(nextState.endOfActionProcedures) ? nextState.endOfActionProcedures : [];
 21901 |   nextState.copiedTokenRelationships = Array.isArray(nextState.copiedTokenRelationships) ? nextState.copiedTokenRelationships : [];
 21902 |   nextState.privateEffectRecords = Array.isArray(nextState.privateEffectRecords) ? nextState.privateEffectRecords : [];
 21903 |   nextState.encounterCopyRecords = Array.isArray(nextState.encounterCopyRecords) ? nextState.encounterCopyRecords : [];
 21904 |   syncLinkedTransactions(nextState);
 21905 |   normalizeChronologyState(nextState);
 21906 |   nextState.perkSystem ||= {};
 21907 |   nextState.perkSystem.pendingRolls ||= [];
 21908 |   nextState.perkSystem.pendingRolls.forEach((roll) => {
 21909 |     roll.choices ||= [];
 21910 |     roll.claimed = Boolean(roll.claimed);
 21911 |     roll.skipped = Boolean(roll.skipped);
 21912 |     roll.chosenPerkId ||= null;
 21913 |   });
 21914 |   nextState.perkSystem.highestThresholdAwardedByPlayerId ||= {};
 21915 |   nextState.perkSystem.assignments ||= [];
 21916 |   nextState.perkSystem.assignments.forEach((assignment) => {
 21917 |     assignment.tier = normalizePerkTier(assignment.tier);
 21918 |     assignment.status = ["active", "removed", "consumed", "replaced"].includes(assignment.status) ? assignment.status : "active";
 21919 |   });
 21920 |   nextState.perkSystem.aTierSafetyTriggered = Boolean(nextState.perkSystem.aTierSafetyTriggered);
 21921 |   nextState.perkSystem.aTierSafetyTriggeringPlayerId ||= "";
 21922 |   nextState.perkSystem.aTierSafetyEligiblePlayerIds = [...new Set(nextState.perkSystem.aTierSafetyEligiblePlayerIds || [])];
 21923 |   nextState.perkSystem.aTierSafetyCompletedPlayerIds = [...new Set(nextState.perkSystem.aTierSafetyCompletedPlayerIds || [])];
 21924 |   nextState.perkSystem.adminWarnings ||= [];
 21925 |   nextState.infoBattleTierRoller ||= {};
 21926 |   nextState.infoBattleTierRoller.tierId = normalizeBalanceTierId(nextState.infoBattleTierRoller.tierId || "");
 21927 |   nextState.infoBattleTierRoller.result ||= null;
 21928 |   nextState.activityResponseDrawerOpen = Boolean(nextState.activityResponseDrawerOpen);
 21929 |   nextState.liveRefereeScreen = normalizeLiveRefereeScreenName(nextState.liveRefereeScreen || "play");
 21930 |   nextState.liveRefereeSelectedEffectName = String(nextState.liveRefereeSelectedEffectName || "").trim();
```

## Pokemon result timing window — `app.js:23120-23190`

```js
 23120 |   ensureInteractionPromptPriority(event, interactionRootPromptStep(event), state);
 23121 |   syncInteractionSituation(event);
 23122 |   state.interactionEvents.unshift(event);
 23123 |   console.info("Rival Saga respondable Activity created", {
 23124 |     id: event.id,
 23125 |     type: event.type,
 23126 |     sourceType: event.sourceType,
 23127 |     eligiblePlayerIds: event.eligiblePlayerIds,
 23128 |     responseTypes: event.responseTypes
 23129 |   });
 23130 |   if (playerCanRespondToActivity(event, activePlayer().id)) createActivityToastFromInteraction(event);
 23131 |   pushBackendActivity(event);
 23132 |   eligiblePlayerIds.forEach((playerId) => {
 23133 |     createPlayerNotification(playerId, {
 23134 |       type: "interaction-window",
 23135 |       title,
 23136 |       message: `${message} A respondable Activity is open.`,
 23137 |       sourceType: "interaction-event",
 23138 |       sourceId: event.id,
 23139 |       priority: 2,
 23140 |       requiresAction: false,
 23141 |       payload: { interactionEventId: event.id }
 23142 |     });
 23143 |   });
 23144 |   return event;
 23145 | }
 23146 |
 23147 | function createPokemonResultTimingWindow(session, player) {
 23148 |   if (!session || session.interactionEventId || !player) return null;
 23149 |   const resultName = session.resultDisplayName || session.resultPokemonName || "Pokemon result";
 23150 |   const isEncounter = session.sourceType === "encounter";
 23151 |   const activity = createInteractionEvent({
 23152 |     type: isEncounter ? "encounter-result" : "pokemon-result",
 23153 |     title: `${player.name} rolled ${resultName}`,
 23154 |     message: `${session.sourceLabel || "Pokemon result"} is pending before it resolves.`,
 23155 |     actorPlayerId: player.id,
 23156 |     targetPlayerId: player.id,
 23157 |     sourceType: session.sourceType || "random-pokemon",
 23158 |     sourceId: session.id,
 23159 |     responseTypes: ["encounter-reroll", "steal-encounter"],
 23160 |     eligiblePlayerIds: state.players.map((entry) => entry.id),
 23161 |     series: session.series || state.series,
 23162 |     gym: Number(session.gym || state.gym),
 23163 |     phase: session.phase || currentPhase(),
 23164 |     payload: {
 23165 |       randomPokemonSessionId: session.id,
 23166 |       gameCornerSessionId: session.gameCornerSessionId || "",
 23167 |       actionVisitId: session.actionVisitId || "",
 23168 |       encounterSessionId: session.encounterSessionId || "",
 23169 |       encounterRollId: session.encounterRollId || "",
 23170 |       resultName,
 23171 |       sourceLabel: session.sourceLabel || ""
 23172 |     }
 23173 |   });
 23174 |   session.interactionEventId = activity.id;
 23175 |   return activity;
 23176 | }
 23177 |
 23178 | function resolvePokemonResultTimingWindow(session, mode = "resolved") {
 23179 |   if (!session?.interactionEventId) return;
 23180 |   resolveInteractionActivity(session.interactionEventId, mode, { renderAfter: false });
 23181 | }
 23182 |
 23183 | function createActivityToastFromInteraction(activity) {
 23184 |   if (!activity) return;
 23185 |   state.activityToasts ||= [];
 23186 |   const toast = {
 23187 |     id: `activity-toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
 23188 |     interactionId: activity.id || "",
 23189 |     title: activity.title || "Respondable Activity",
 23190 |     message: activity.message || "",
```

## Live timing category/prompt details — `app.js:25480-25610`

```js
 25480 | }
 25481 |
 25482 | function liveGameflowMode(targetState = state) {
 25483 |   return normalizeLiveTableState(targetState.liveTable || {}).gameflowMode;
 25484 | }
 25485 |
 25486 | function liveGameflowModeLabel(mode = liveGameflowMode()) {
 25487 |   return mode === "batch" ? "Batch Order" : "Individual Turn Order";
 25488 | }
 25489 |
 25490 | function getCurrentPendingEvent(targetState = state) {
 25491 |   return (targetState.interactionEvents || [])
 25492 |     .filter((event) => sandboxInteractionEventVisible(event, targetState))
 25493 |     .filter((event) => interactionSituationLifecycle.isBlocking(event))
 25494 |     .sort((a, b) => Number(a.eventOrder || 0) - Number(b.eventOrder || 0)
 25495 |       || new Date(a.createdAt || 0) - new Date(b.createdAt || 0))[0] || null;
 25496 | }
 25497 |
 25498 | function canShowLiveResponseControls(targetState = state) {
 25499 |   return Boolean(getCurrentPendingEvent(targetState));
 25500 | }
 25501 |
 25502 | function canShowLiveTransactionControls(targetState = state) {
 25503 |   return Boolean(getCurrentPendingEvent(targetState));
 25504 | }
 25505 |
 25506 | function liveResultSessionForActivity(activity, targetState = state) {
 25507 |   if (!activity) return null;
 25508 |   const sessionId = activity.payload?.randomPokemonSessionId
 25509 |     || (/pokemon-result|encounter-result/.test(activity.type || "") ? activity.sourceId : "");
 25510 |   if (!sessionId) return null;
 25511 |   return (targetState.randomPokemonSessions || []).find((session) => session.id === sessionId && session.status === "pending") || null;
 25512 | }
 25513 |
 25514 | function liveActivityTimingCategory(activity) {
 25515 |   if (!activity) return "";
 25516 |   if (activity.payload?.tokenTimingCategory) return tokenTimingCategoryFromRaw(activity.payload.tokenTimingCategory);
 25517 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.CONTROL_TOKEN) return TOKEN_TIMING_CATEGORIES.CONTROL;
 25518 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.CURSE_TOKEN) return TOKEN_TIMING_CATEGORIES.CURSE;
 25519 |   if (activity.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT || activity.type === "encounter-result") return TOKEN_TIMING_CATEGORIES.ENCOUNTER;
 25520 |   return "";
 25521 | }
 25522 |
 25523 | function liveTokenPromptDetails(activity, resultSession = null, targetState = state) {
 25524 |   const category = liveActivityTimingCategory(activity);
 25525 |   const actor = targetState.players.find((player) => player.id === activity?.actorPlayerId);
 25526 |   const target = targetState.players.find((player) => player.id === activity?.targetPlayerId);
 25527 |   const tokenName = activity?.payload?.tokenName || activity?.sourceId || "Token";
 25528 |   const targetText = activity?.payload?.targetText || activity?.payload?.targetPlayerName || target?.name || "the target";
 25529 |   const teamLockText = activity?.payload?.teamLock
 25530 |     ? " This is happening during Sabotage. Submitted teams are locked before Team Preview."
 25531 |     : "";
 25532 |   if (resultSession || activity?.type === "encounter-result" || activity?.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT) {
 25533 |     const resultOwnerId = resultSession?.resultOwnerPlayerId || resultSession?.ownerPlayerId || resultSession?.playerId || activity?.actorPlayerId || "";
 25534 |     const resultOwner = targetState.players.find((player) => player.id === resultOwnerId);
 25535 |     const resultName = resultSession?.resultDisplayName || activity?.payload?.resultName || "an encounter";
 25536 |     return {
 25537 |       type: "encounter-result-pending",
 25538 |       statusLabel: "Waiting to Resolve",
 25539 |       title: "Encounter Result Pending",
 25540 |       body: `${resultOwner?.name || actor?.name || "A player"} rolled ${resultName}. Encounter modifiers, rerolls, responses, and trades may happen before this result is finalized.`,
 25541 |       helperText: "Use Encounter Tokens during this window, trade, record No Response, then finalize the result."
 25542 |     };
 25543 |   }
 25544 |   if (category === TOKEN_TIMING_CATEGORIES.CONTROL) {
 25545 |     return {
 25546 |       type: "control-token-pending",
 25547 |       statusLabel: "Control Token Pending",
 25548 |       title: "Control Token Pending",
 25549 |       body: `${actor?.name || "A player"} used ${tokenName} targeting ${targetText}. Protection responses and trades may happen before this resolves.`,
 25550 |       helperText: "Record protection responses, trades, or No Response. Finalize only when the table is ready to resolve the token."
 25551 |     };
 25552 |   }
 25553 |   if (category === TOKEN_TIMING_CATEGORIES.CURSE) {
 25554 |     return {
 25555 |       type: "curse-token-pending",
 25556 |       statusLabel: "Curse Pending",
 25557 |       title: "Curse Pending",
 25558 |       body: `${actor?.name || "A player"} used ${tokenName} targeting ${targetText}. Protection or cleanse effects may happen before this resolves.${teamLockText}`,
 25559 |       helperText: `If this curse resolves and the target is valid for Battle Phase, the curse applies according to its effect.${teamLockText}`
 25560 |     };
 25561 |   }
 25562 |   if (activity?.type === TOKEN_PENDING_EVENT_TYPES.TEAM_LOCK_WINDOW) {
 25563 |     return {
 25564 |       type: "sabotage-pending",
 25565 |       statusLabel: "Sabotage",
 25566 |       title: activity.title || "Sabotage Window",
 25567 |       body: activity.message || "Sabotage is open. Submitted teams are locked before Team Preview.",
 25568 |       helperText: "Use this window for final pre-preview responses, trades, or No Response before teams are considered locked."
 25569 |     };
 25570 |   }
 25571 |   if (activity?.type === TOKEN_PENDING_EVENT_TYPES.MANUAL_EVENT || activity?.type === "manual-event") {
 25572 |     return {
 25573 |       type: "manual-event-pending",
 25574 |       statusLabel: "Manual Event",
 25575 |       title: activity.title || "Manual Event Pending",
 25576 |       body: activity.message || "This manual event is pending before it resolves.",
 25577 |       helperText: "Use this table window to record responses, trades, or No Response before finalizing."
 25578 |     };
 25579 |   }
 25580 |   return null;
 25581 | }
 25582 |
 25583 | function interactionRootPromptId(activity) {
 25584 |   return activity?.id ? `event:${activity.id}` : "event:unknown";
 25585 | }
 25586 |
 25587 | function interactionResponsePromptStepId(response) {
 25588 |   return response?.promptStepId || (response?.id ? `response:${response.id}` : "");
 25589 | }
 25590 |
 25591 | function interactionResponseAnswerPromptId(activity, response) {
 25592 |   return String(response?.respondingToPromptId || response?.promptId || interactionRootPromptId(activity));
 25593 | }
 25594 |
 25595 | function interactionResponseCanceled(response) {
 25596 |   const status = String(response?.status || "").toLowerCase();
 25597 |   return Boolean(response?.canceledAt || status === "canceled" || status === "cancelled" || status === "undone");
 25598 | }
 25599 |
 25600 | function interactionResponseCreatesPrompt(response) {
 25601 |   return Boolean(response && response.type !== "pass" && response.createsPrompt !== false && !interactionResponseCanceled(response));
 25602 | }
 25603 |
 25604 | function interactionResponsesInOrder(activity) {
 25605 |   return [...(activity?.responses || [])].sort((a, b) => Number(a.eventOrder || 0) - Number(b.eventOrder || 0)
 25606 |     || new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
 25607 | }
 25608 |
 25609 | function interactionRootPromptStep(activity) {
 25610 |   return {
```

## Current Live prompt result-session handling — `app.js:26130-26220`

```js
 26130 |     gameflowMode: prompt.gameflowMode,
 26131 |     currentLiveStep: prompt.type || "",
 26132 |     currentPromptTitle: prompt.title || "",
 26133 |     currentPromptBody: prompt.body || "",
 26134 |     currentActorPlayerId: prompt.currentActorPlayerId || "",
 26135 |     currentPriorityPlayerId: prompt.currentPriorityPlayerId || "",
 26136 |     priorityOrderPlayerIds: prompt.priorityOrderPlayerIds || [],
 26137 |     priorityComplete: Boolean(prompt.priorityComplete),
 26138 |     requiredPlayerIds: prompt.requiredPlayerIds || [],
 26139 |     waitingOnPlayerIds: prompt.waitingOnPlayerIds || [],
 26140 |     passedPlayerIds: prompt.passedPlayerIds || [],
 26141 |     respondedPlayerIds: prompt.respondedPlayerIds || [],
 26142 |     currentPendingEventId: prompt.currentPendingEventId || "",
 26143 |     currentBatchId: prompt.currentBatchId || "",
 26144 |     responsesAllowed: Boolean(prompt.responsesAllowed),
 26145 |     transactionsAllowed: Boolean(prompt.transactionsAllowed),
 26146 |     canAdvance: Boolean(prompt.canAdvance),
 26147 |     lastResolvedEventId: liveTable?.lastResolvedEventId || ""
 26148 |   });
 26149 | }
 26150 |
 26151 | function getCurrentLivePrompt(targetState = state) {
 26152 |   const pendingEvent = getCurrentPendingEvent(targetState);
 26153 |   const phase = currentPhase();
 26154 |   const flowMode = liveGameflowMode();
 26155 |   if (pendingEvent) {
 26156 |     const resultSession = liveResultSessionForActivity(pendingEvent, targetState);
 26157 |     const promptChain = interactionPromptChain(pendingEvent);
 26158 |     const currentPromptStep = currentInteractionPromptStep(pendingEvent);
 26159 |     const respondingToPromptStep = parentInteractionPromptStep(pendingEvent, currentPromptStep);
 26160 |     const playerIds = livePromptPlayerIds(pendingEvent, currentPromptStep, targetState);
 26161 |     const resultOwnerId = resultSession?.resultOwnerPlayerId || resultSession?.ownerPlayerId || resultSession?.playerId || "";
 26162 |     const resultOwner = targetState.players.find((player) => player.id === resultOwnerId);
 26163 |     const resultName = resultSession?.resultDisplayName || pendingEvent.payload?.resultName || "";
 26164 |     const sourceLabel = resultSession?.sourceLabel || pendingEvent.payload?.sourceLabel || pendingEvent.sourceType || "Event";
 26165 |     const isEncounterResult = Boolean(resultSession?.sourceType === "encounter" || pendingEvent.type === "encounter-result");
 26166 |     const tokenPrompt = liveTokenPromptDetails(pendingEvent, resultSession, targetState);
 26167 |     const promptDisplay = liveCurrentPromptDetails(pendingEvent, tokenPrompt, currentPromptStep, respondingToPromptStep);
 26168 |     if (resultSession) {
 26169 |       return {
 26170 |         id: `live-${pendingEvent.id}`,
 26171 |         type: tokenPrompt?.type || (isEncounterResult ? "encounter-result-pending" : "pokemon-result-pending"),
 26172 |         statusLabel: promptDisplay.statusLabel || "Waiting to Resolve",
 26173 |         title: promptDisplay.title || (resultName ? `${resultOwner?.name || "A player"} rolled ${resultName}` : pendingEvent.title || "Pokemon result pending"),
 26174 |         body: promptDisplay.body || `${resultName || "This Pokemon result"} from ${sourceLabel} is waiting to resolve.`,
 26175 |         helperText: promptDisplay.helperText || "Before accepting it, players may use a legal response, trade, or choose No Response.",
 26176 |         phase: pendingEvent.phase || phase,
 26177 |         gameflowMode: flowMode,
 26178 |         currentActorPlayerId: currentPromptStep.actorPlayerId || resultOwnerId || pendingEvent.actorPlayerId || pendingEvent.targetPlayerId || "",
 26179 |         activePlayerIds: [currentPromptStep.actorPlayerId || resultOwnerId || pendingEvent.actorPlayerId].filter(Boolean),
 26180 |         requiredPlayerIds: playerIds.eligiblePlayerIds,
 26181 |         waitingOnPlayerIds: playerIds.waitingOnPlayerIds,
 26182 |         passedPlayerIds: playerIds.passedPlayerIds,
 26183 |         respondedPlayerIds: playerIds.respondedPlayerIds,
 26184 |         currentPriorityPlayerId: playerIds.currentPriorityPlayerId,
 26185 |         priorityOrderPlayerIds: playerIds.priorityOrderPlayerIds,
 26186 |         priorityComplete: playerIds.priorityComplete,
 26187 |         currentPromptId: playerIds.currentPromptId,
 26188 |         currentPendingEventId: pendingEvent.id,
 26189 |         currentBatchId: "",
 26190 |         responsesAllowed: activityResponsesAllowed(pendingEvent),
 26191 |         transactionsAllowed: activityTransactionsAllowed(pendingEvent),
 26192 |         canAdvance: true,
 26193 |         availableActions: ["acceptResult", "reroll", "useResponse", "makeTransaction", "pass", "finalizeEvent"],
 26194 |         pendingEvent,
 26195 |         currentPromptStep,
 26196 |         respondingToPromptStep,
 26197 |         promptChain,
 26198 |         resultSession,
 26199 |         resultName,
 26200 |         sourceLabel
 26201 |       };
 26202 |     }
 26203 |     const promptDetails = tokenPrompt || liveTokenPromptDetails(pendingEvent, null, targetState);
 26204 |     const standardPromptDisplay = liveCurrentPromptDetails(pendingEvent, promptDetails, currentPromptStep, respondingToPromptStep);
 26205 |     return {
 26206 |       id: `live-${pendingEvent.id}`,
 26207 |       type: promptDetails?.type || "pending-event",
 26208 |       statusLabel: standardPromptDisplay.statusLabel || "Waiting to Resolve",
 26209 |       title: standardPromptDisplay.title || pendingEvent.title || "Pending event",
 26210 |       body: standardPromptDisplay.body || pendingEvent.message || "This event is pending before it resolves.",
 26211 |       helperText: standardPromptDisplay.helperText || "Pause here until eligible players respond, trade, or choose No Response.",
 26212 |       phase: pendingEvent.phase || phase,
 26213 |       gameflowMode: flowMode,
 26214 |       currentActorPlayerId: currentPromptStep.actorPlayerId || pendingEvent.actorPlayerId || pendingEvent.targetPlayerId || "",
 26215 |       activePlayerIds: [currentPromptStep.actorPlayerId || pendingEvent.actorPlayerId].filter(Boolean),
 26216 |       requiredPlayerIds: playerIds.eligiblePlayerIds,
 26217 |       waitingOnPlayerIds: playerIds.waitingOnPlayerIds,
 26218 |       passedPlayerIds: playerIds.passedPlayerIds,
 26219 |       respondedPlayerIds: playerIds.respondedPlayerIds,
 26220 |       currentPriorityPlayerId: playerIds.currentPriorityPlayerId,
```

## Manual Live event types — `app.js:26370-26440`

```js
 26370 |         detail = playerBattles.length ? `${completedBattles.length}/${playerBattles.length} battles recorded` : "No scheduled battle";
 26371 |         icon = complete ? "✓" : "…";
 26372 |       } else if (locked) {
 26373 |         status = "Locked";
 26374 |         tone = "done";
 26375 |         detail = "Team confirmed";
 26376 |         icon = "✓";
 26377 |       }
 26378 |     }
 26379 |
 26380 |     return {
 26381 |       player,
 26382 |       status,
 26383 |       tone,
 26384 |       detail,
 26385 |       icon,
 26386 |       eligible
 26387 |     };
 26388 |   });
 26389 | }
 26390 |
 26391 | function liveFeedTimestamp(value) {
 26392 |   const date = new Date(value || Date.now());
 26393 |   if (Number.isNaN(date.getTime())) return "";
 26394 |   return date.toLocaleString([], { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
 26395 | }
 26396 |
 26397 | function liveManualEventTypeOptions(selected = "manual-event") {
 26398 |   const options = [
 26399 |     ["manual-event", "Manual"],
 26400 |     ["class-effect", "Class Effect"],
 26401 |     [TOKEN_PENDING_EVENT_TYPES.CONTROL_TOKEN, "Control Token"],
 26402 |     [TOKEN_PENDING_EVENT_TYPES.CURSE_TOKEN, "Curse"],
 26403 |     [TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT, "Encounter"],
 26404 |     [TOKEN_PENDING_EVENT_TYPES.PROTECTION_RESPONSE, "Protection / Response Note"],
 26405 |     ["item-effect", "Item"],
 26406 |     ["other", "Other"]
 26407 |   ];
 26408 |   return options.map(([value, label]) => `<option value="${escapeHtml(value)}" ${value === selected ? "selected" : ""}>${escapeHtml(label)}</option>`).join("");
 26409 | }
 26410 |
 26411 | function liveTimingWindowOptions(selected = "normal") {
 26412 |   const options = [
 26413 |     ["normal", "Normal"],
 26414 |     [TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT, "Encounter Result"],
 26415 |     [TOKEN_PENDING_EVENT_TYPES.TEAM_LOCK_WINDOW, "Sabotage"],
 26416 |     ["team-preview", "Team Preview"],
 26417 |     ["battle-phase", "Battle Phase"],
 26418 |     ["other", "Other"]
 26419 |   ];
 26420 |   return options.map(([value, label]) => `<option value="${escapeHtml(value)}" ${value === selected ? "selected" : ""}>${escapeHtml(label)}</option>`).join("");
 26421 | }
 26422 |
 26423 | function effectApplicationOptions(selected = EFFECT_RESOLUTION_MODES.HOST_CONFIRMED) {
 26424 |   const normalizedSelected = normalizeEffectResolutionMode(selected);
 26425 |   const options = [
 26426 |     ["automatic", "Automatic"],
 26427 |     ["guided", "Guided"],
 26428 |     ["hostConfirmed", "Host Confirmed"]
 26429 |   ];
 26430 |   return options.map(([value, label]) => `<option value="${escapeHtml(value)}" ${value === normalizedSelected ? "selected" : ""}>${escapeHtml(label)}</option>`).join("");
 26431 | }
 26432 |
 26433 | function liveSourceOptions(selected = "manual") {
 26434 |   const options = ["Manual", "Class", "Token", "Item", "Pokemon", "Other"];
 26435 |   return options.map((label) => {
 26436 |     const value = label.toLowerCase();
 26437 |     return `<option value="${escapeHtml(value)}" ${value === selected ? "selected" : ""}>${escapeHtml(label)}</option>`;
 26438 |   }).join("");
 26439 | }
 26440 |
```

## Manual timing-window options — `app.js:27090-27210`

```js
 27090 |   const passableIds = (prompt.waitingOnPlayerIds || [])
 27091 |     .filter((playerId) => playerCanRespondToActivity(prompt.pendingEvent, playerId));
 27092 |   const selectedId = passableIds.includes(activePlayer().id) ? activePlayer().id : passableIds[0] || "";
 27093 |   return `
 27094 |     <div class="live-inline-form live-pass-form" data-live-pass-form="${escapeHtml(prompt.currentPendingEventId)}">
 27095 |       <div class="live-form-title">
 27096 |         <span>No Response</span>
 27097 |         <strong>Mark a player as passed</strong>
 27098 |       </div>
 27099 |       <p class="live-form-note">Choose the player who had a chance to answer and chose not to use a response.</p>
 27100 |       <div class="live-form-grid">
 27101 |         <label class="wide">
 27102 |           <span>Passing player</span>
 27103 |           <select data-live-pass-field="playerId" ${passableIds.length ? "" : "disabled"}>${livePlayerSelectOptions(passableIds, selectedId, "Everyone has answered")}</select>
 27104 |         </label>
 27105 |       </div>
 27106 |       <button class="ghost-button" type="button" data-live-pass-selected ${passableIds.length ? "" : "disabled"}>Record No Response</button>
 27107 |     </div>
 27108 |   `;
 27109 | }
 27110 |
 27111 | function liveReadFormField(form, selector, { checkbox = false } = {}) {
 27112 |   const field = form.querySelector(selector);
 27113 |   if (!field) return checkbox ? false : "";
 27114 |   return checkbox ? Boolean(field.checked) : field.value || "";
 27115 | }
 27116 |
 27117 | function createLiveManualEventFromForm(form) {
 27118 |   const actorPlayerId = liveReadFormField(form, '[data-live-manual-field="actorPlayerId"]') || activePlayer().id;
 27119 |   const actor = state.players.find((player) => player.id === actorPlayerId) || activePlayer();
 27120 |   const eventType = liveReadFormField(form, '[data-live-manual-field="eventType"]') || "manual-event";
 27121 |   const timingWindow = liveReadFormField(form, '[data-live-manual-field="timingWindow"]') || "normal";
 27122 |   const source = liveReadFormField(form, '[data-live-manual-field="source"]') || "manual";
 27123 |   const targetPlayerId = liveReadFormField(form, '[data-live-manual-field="targetPlayerId"]');
 27124 |   const target = state.players.find((player) => player.id === targetPlayerId);
 27125 |   const title = liveReadFormField(form, '[data-live-manual-field="title"]').trim();
 27126 |   const message = liveReadFormField(form, '[data-live-manual-field="message"]').trim();
 27127 |   const targetText = liveReadFormField(form, '[data-live-manual-field="targetText"]').trim();
 27128 |   const responseType = liveReadFormField(form, '[data-live-manual-field="responseType"]');
 27129 |   const effectApplication = liveReadFormField(form, '[data-live-manual-field="effectApplication"]') || "manual";
 27130 |   const responsesAllowed = liveReadFormField(form, '[data-live-manual-field="responsesAllowed"]', { checkbox: true });
 27131 |   const transactionsAllowed = liveReadFormField(form, '[data-live-manual-field="transactionsAllowed"]', { checkbox: true });
 27132 |   if (!title) {
 27133 |     alert("Name the pending event before creating it.");
 27134 |     return null;
 27135 |   }
 27136 |   const finalEventType = timingWindow === TOKEN_PENDING_EVENT_TYPES.TEAM_LOCK_WINDOW
 27137 |     ? TOKEN_PENDING_EVENT_TYPES.TEAM_LOCK_WINDOW
 27138 |     : timingWindow === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT
 27139 |       ? TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT
 27140 |       : eventType;
 27141 |   const activity = createInteractionEvent({
 27142 |     type: finalEventType,
 27143 |     title,
 27144 |     message: message || `${title} is pending.`,
 27145 |     actorPlayerId: actor.id,
 27146 |     targetPlayerId: target?.id || "",
 27147 |     sourceType: source,
 27148 |     responseTypes: responseType ? [responseType] : [],
 27149 |     eligiblePlayerIds: responsesAllowed ? state.players.map((player) => player.id) : [],
 27150 |     payload: {
 27151 |       liveTable: true,
 27152 |       responsesAllowed,
 27153 |       transactionsAllowed,
 27154 |       eventType,
 27155 |       timingWindow,
 27156 |       effectApplication,
 27157 |       source,
 27158 |       targetText,
 27159 |       targetPlayerName: target?.name || "",
 27160 |       teamLock: timingWindow === TOKEN_PENDING_EVENT_TYPES.TEAM_LOCK_WINDOW
 27161 |     }
 27162 |   });
 27163 |   addLogEntry({
 27164 |     action: "interaction",
 27165 |     category: "system",
 27166 |     player: actor.name,
 27167 |     item: `Live Table opened pending event: ${title}`,
 27168 |     title: "Manual event opened",
 27169 |     summary: [`Pending event: ${title}`, message || "Manual response window", targetText ? `Target: ${targetText}` : ""].filter(Boolean),
 27170 |     type: "interaction-created",
 27171 |     categories: ["system", "interaction"],
 27172 |     tags: ["live-table", "timing-window", source, finalEventType, timingWindow, effectApplication],
 27173 |     playerIds: state.players.map((player) => player.id),
 27174 |     linkedEventId: activity.id,
 27175 |     eventOrder: activity.eventOrder
 27176 |   });
 27177 |   state.liveTable = normalizeLiveTableState({ ...(state.liveTable || {}), currentPendingEventId: activity.id });
 27178 |   saveState({ immediate: true });
 27179 |   render();
 27180 |   return activity;
 27181 | }
 27182 |
 27183 | function recordLiveResponseFromForm(form) {
 27184 |   const activityId = form.dataset.liveResponseForm || "";
 27185 |   const activity = liveActivityById(activityId);
 27186 |   if (!activity) {
 27187 |     alert("Responses can only be linked to a pending event.");
 27188 |     return null;
 27189 |   }
 27190 |   if (!activityResponsesAllowed(activity)) {
 27191 |     alert("Responses are not open for this event.");
 27192 |     return null;
 27193 |   }
 27194 |   const playerId = liveReadFormField(form, '[data-live-response-field="playerId"]') || activePlayer().id;
 27195 |   const source = liveReadFormField(form, '[data-live-response-field="source"]') || "manual";
 27196 |   const status = liveReadFormField(form, '[data-live-response-field="status"]') || "resolved";
 27197 |   const note = liveReadFormField(form, '[data-live-response-field="note"]').trim();
 27198 |   const targetText = liveReadFormField(form, '[data-live-response-field="targetText"]').trim();
 27199 |   if (!note) {
 27200 |     alert("Describe the response before recording it.");
 27201 |     return null;
 27202 |   }
 27203 |   const updated = addInteractionResponse(activity.id, {
 27204 |     type: "manual",
 27205 |     playerId,
 27206 |     source,
 27207 |     status,
 27208 |     note,
 27209 |     targetText
 27210 |   });
```

## Encounter pending activity/token recording — `app.js:27550-27630`

```js
 27550 |     targetPlayerId: draft.targetPlayerId || "",
 27551 |     targetPlayerName: draft.targetPlayerName || "",
 27552 |     targetPokemonId: draft.targetPokemonId || "",
 27553 |     targetPokemonIds: draft.targetPokemonIds || [],
 27554 |     selectedRosterInstanceIds: draft.selectedRosterInstanceIds || draft.targetPokemonIds || [],
 27555 |     targetPokemonName: draft.targetPokemonName || "",
 27556 |     targetType: draft.targetType || metadata.targetType,
 27557 |     targetScope: draft.targetScope || metadata.targetScope,
 27558 |     resourceSelections: draft.resourceSelections || [],
 27559 |     resourceDefinitionId: draft.resourceDefinitionId || "",
 27560 |     choiceKind: draft.choiceKind || "",
 27561 |     inventoryRecordId: draft.inventoryRecordId || "",
 27562 |     moveName: draft.moveName || ""
 27563 |   });
 27564 |   const savedResponse = updated?.responses?.[updated.responses.length - 1];
 27565 |   if (savedResponse) {
 27566 |     savedResponse.effectContractVersion = globalThis.rivalSagaTokenEffectContract?.schemaVersion || 0;
 27567 |     savedResponse.declarationAuditId = tokenEffectAuditRecord({
 27568 |       stage: "declaration",
 27569 |       activity,
 27570 |       response: savedResponse,
 27571 |       draft: { ...draft, consumedTokenId: consumed.token.id || "" },
 27572 |       metadata,
 27573 |       result: "pending"
 27574 |     }).id;
 27575 |   }
 27576 |   addTokenTimingLog({
 27577 |     activity,
 27578 |     draft,
 27579 |     title: `${draft.actor.name} used ${draft.tokenName}`,
 27580 |     type: "interaction-response",
 27581 |     tags: ["response", responseType],
 27582 |     response: savedResponse
 27583 |   });
 27584 |   advanceAutomaticInteractionPrompts(activity);
 27585 |   saveState({ immediate: true });
 27586 |   render();
 27587 |   return savedResponse;
 27588 | }
 27589 |
 27590 | function currentEncounterPendingActivity() {
 27591 |   const activity = getCurrentPendingEvent();
 27592 |   if (!activity || activity.status !== "open") return null;
 27593 |   const session = liveResultSessionForActivity(activity);
 27594 |   if (activity.type === "encounter-result" || activity.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT) return activity;
 27595 |   if (session?.sourceType === "encounter") return activity;
 27596 |   return null;
 27597 | }
 27598 |
 27599 | function tokenNameIsReroll(tokenName) {
 27600 |   const key = slugify(tokenName);
 27601 |   return key === "reroll" || key === "reroll-token";
 27602 | }
 27603 |
 27604 | async function recordEncounterTokenUse(draft) {
 27605 |   const activity = currentEncounterPendingActivity();
 27606 |   if (!activity) {
 27607 |     alert("Encounter Tokens are used during an encounter result window before the result is finalized.");
 27608 |     return null;
 27609 |   }
 27610 |   if (!playerCanRespondToActivity(activity, draft.actorPlayerId)) {
 27611 |     alert(`${draft.actor.name} is not eligible to respond to this encounter result.`);
 27612 |     return null;
 27613 |   }
 27614 |   if (playerAlreadyAnsweredActivity(activity, draft.actorPlayerId, currentInteractionPromptStep(activity).id)) {
 27615 |     alert(`${draft.actor.name} has already responded or chosen No Response for the current prompt.`);
 27616 |     return null;
 27617 |   }
 27618 |   if (tokenNameIsReroll(draft.tokenName)) {
 27619 |     const session = liveResultSessionForActivity(activity);
 27620 |     if (!session) {
 27621 |       alert("Reroll Token needs a pending encounter result before it can be used here.");
 27622 |       return null;
 27623 |     }
 27624 |     await rerollRandomPokemonSession(session.id, { actorPlayerId: draft.actorPlayerId });
 27625 |     state.liveTable = normalizeLiveTableState({ ...(state.liveTable || {}), currentPendingEventId: activity.id });
 27626 |     saveState({ immediate: true });
 27627 |     render();
 27628 |     return activity;
 27629 |   }
 27630 |   return recordTokenResponseToActivity(activity, draft, "encounter-token");
```

## Live token can-use encounter guard — `app.js:27970-28070`

```js
 27970 |       if (!definition) return;
 27971 |       const displayName = definition.name || displayInventoryTokenName(item.name || item.id || "Token");
 27972 |       const metadata = tokenEffectMetadataByName(definition.id || displayName);
 27973 |       const key = slugify(definition.id || metadata.id || displayName);
 27974 |       if (!key) return;
 27975 |       const existing = groups.get(key) || {
 27976 |         key,
 27977 |         name: definition.name || metadata.name || displayName,
 27978 |         definition,
 27979 |         metadata,
 27980 |         items: [],
 27981 |         unavailableItems: [],
 27982 |         count: 0,
 27983 |         totalCount: 0,
 27984 |         description: ""
 27985 |       };
 27986 |       const availability = tokenInventoryRecordAvailability(item);
 27987 |       existing.totalCount += 1;
 27988 |       if (availability.ok) {
 27989 |         existing.items.push(item);
 27990 |         existing.count += 1;
 27991 |       } else {
 27992 |         existing.unavailableItems.push({ item, availability });
 27993 |       }
 27994 |       existing.description ||= item.description || metadata.shortPromptText || "";
 27995 |       groups.set(key, existing);
 27996 |     });
 27997 |   const categoryOrder = {
 27998 |     [TOKEN_TIMING_CATEGORIES.CONTROL]: 1,
 27999 |     [TOKEN_TIMING_CATEGORIES.PROTECTION]: 2,
 28000 |     [TOKEN_TIMING_CATEGORIES.ENCOUNTER]: 3,
 28001 |     [TOKEN_TIMING_CATEGORIES.CURSE]: 4,
 28002 |     [TOKEN_TIMING_CATEGORIES.MANUAL]: 9
 28003 |   };
 28004 |   return [...groups.values()].sort((a, b) => (categoryOrder[a.metadata.timingCategory] || 8) - (categoryOrder[b.metadata.timingCategory] || 8)
 28005 |     || a.name.localeCompare(b.name));
 28006 | }
 28007 |
 28008 | function liveRefereePromptIsEncounterResult(prompt) {
 28009 |   const activity = prompt?.pendingEvent;
 28010 |   return Boolean(prompt?.resultSession
 28011 |     || activity?.type === "encounter-result"
 28012 |     || activity?.type === TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT
 28013 |     || liveResultSessionForActivity(activity));
 28014 | }
 28015 |
 28016 | function liveRefereeTokenCanUseNow(group, prompt, player) {
 28017 |   if (!group || !player) return false;
 28018 |   const timingCheck = tokenUseTimingCheck({
 28019 |     player,
 28020 |     tokenName: group.name,
 28021 |     metadata: group.metadata,
 28022 |     context: { pendingEvent: prompt?.pendingEvent || null }
 28023 |   });
 28024 |   if (!timingCheck.ok) return false;
 28025 |   if (prompt?.pendingEvent && !playerCanRespondToActivity(prompt.pendingEvent, player.id)) return false;
 28026 |   const step = prompt?.currentPromptStep || currentInteractionPromptStep(prompt?.pendingEvent);
 28027 |   if (step?.kind === "response") {
 28028 |     const targetMetadata = tokenEffectMetadataByName(step.response?.tokenName || livePromptStepResponseLabel(step.response));
 28029 |     if (targetMetadata.timingCategory === TOKEN_TIMING_CATEGORIES.PROTECTION
 28030 |       && !["counterProtection", "restoreNegatedTokenWithCooldown", "copyParentEffect"].includes(group.metadata?.resolverId)) return false;
 28031 |   }
 28032 |   if (["counterProtection", "restoreNegatedTokenWithCooldown", "redirectParentToSelf", "copyParentEffect"].includes(group.metadata?.resolverId)) {
 28033 |     const plan = specialTokenResponseResolutionPlan(prompt?.pendingEvent, step, player.id, group.metadata, { previewOnly: true });
 28034 |     if (!plan.ok) return false;
 28035 |   }
 28036 |   if (group.metadata?.resolverId === "delayParent"
 28037 |     && !teleportDelayableParentPlan(prompt?.pendingEvent, step).ok) return false;
 28038 |   if (group.metadata?.timingWindows?.includes(TOKEN_TIMING_WINDOWS.WHEEL_WINDOW)) return liveRefereePromptIsEncounterResult(prompt);
 28039 |   return true;
 28040 | }
 28041 |
 28042 | function liveRefereeEffectHasRequiredTargets(group, player) {
 28043 |   const definition = group?.definition;
 28044 |   if (!definition || Number(definition.minTargets || 0) < 1) return true;
 28045 |   if (isStandardCurseTokenId(definition.id)) {
 28046 |     return liveRefereeStandardCurseActiveRosterTargets()
 28047 |       .some((entry) => entry.targets.some((target) => target.legality.ok));
 28048 |   }
 28049 |   if (definition.targetScope === EFFECT_TARGET_SCOPES.ROSTER_INSTANCE) {
 28050 |     return (state.players || []).some((owner) => {
 28051 |       if ((definition.selfOnly || definition.targetControllerRelation === "self") && owner.id !== player?.id) return false;
 28052 |       if ((definition.otherPlayerOnly || ["rival", "otherPlayer", "differentController"].includes(definition.targetControllerRelation)) && owner.id === player?.id) return false;
 28053 |       return activeRosterForPlayer(owner.id).length > 0;
 28054 |     });
 28055 |   }
 28056 |   if (definition.targetScope === EFFECT_TARGET_SCOPES.SINGLE_PLAYER) {
 28057 |     return (state.players || []).some((candidate) => {
 28058 |       if (definition.selfOnly || definition.targetControllerRelation === "self") return candidate.id === player?.id;
 28059 |       if (definition.otherPlayerOnly || ["rival", "otherPlayer", "differentController"].includes(definition.targetControllerRelation)) return candidate.id !== player?.id;
 28060 |       return true;
 28061 |     });
 28062 |   }
 28063 |   return true;
 28064 | }
 28065 |
 28066 | function getUsableEffectsForContext({
 28067 |   playerId,
 28068 |   gymId = Number(state.gym || 1),
 28069 |   phase = currentPhase(),
 28070 |   subwindow = "",
```

## Live token inventory/timing labels — `app.js:28250-28320`

```js
 28250 |   }
 28251 |   if (screen === "declareEffects") {
 28252 |     return provisionalDeclarationRuntime.controlTimingStatus(state, {
 28253 |       actionsPerPlayer: actionPhaseRules.actionsPerPlayer,
 28254 |       isBlocking: interactionSituationLifecycle.isBlocking
 28255 |     }).open;
 28256 |   }
 28257 |   if (screen === "deal") return Boolean(!prompt?.currentPendingEventId || prompt.transactionsAllowed);
 28258 |   if (screen === "manualEffect") return Boolean(prompt?.currentPendingEventId && prompt.responsesAllowed);
 28259 |   if (screen === "resolutionResult") return Boolean(prompt?.currentPendingEventId);
 28260 |   if (["arenaTrapAbility", "arenaTrapMove"].includes(screen)) {
 28261 |     return Boolean(!prompt?.pendingEvent && activeArenaTrapCustomizationStatus());
 28262 |   }
 28263 |   return true;
 28264 | }
 28265 |
 28266 | function coerceLiveRefereeScreenForPrompt(prompt = getCurrentLivePrompt()) {
 28267 |   const screen = normalizeLiveRefereeScreenName(state.liveRefereeScreen);
 28268 |   if (!liveRefereeCanShowScreen(screen, prompt)) {
 28269 |     resetLiveRefereeScreenState();
 28270 |     return "play";
 28271 |   }
 28272 |   state.liveRefereeScreen = screen;
 28273 |   return screen;
 28274 | }
 28275 |
 28276 | function liveRefereeAvailableTokenGroups(prompt, playerId = liveRefereeControlledPlayerId()) {
 28277 |   return getUsableEffectsForContext({
 28278 |     playerId,
 28279 |     gymId: Number(state.gym || 1),
 28280 |     phase: currentPhase(),
 28281 |     subwindow: currentPhase() === "battle" && battlePhaseSubstep() === "sabotage" ? "sabotageCurseWindow" : "",
 28282 |     activeOperation: currentBlockingBattleRevisionOperation?.() || null,
 28283 |     pendingRevision: openBattleRevisionWindows?.()[0] || null,
 28284 |     viewerId: activePlayer()?.id || ""
 28285 |   });
 28286 | }
 28287 |
 28288 | function liveRefereeTokenUseIntentLabel(group, prompt) {
 28289 |   const category = group?.metadata?.timingCategory || "";
 28290 |   if (prompt?.pendingEvent && category === TOKEN_TIMING_CATEGORIES.PROTECTION) return "Respond";
 28291 |   if (prompt?.pendingEvent && category === TOKEN_TIMING_CATEGORIES.ENCOUNTER) return "Modify";
 28292 |   return "Open Window";
 28293 | }
 28294 |
 28295 | function liveRefereeEffectScreenForMetadata(metadata = {}) {
 28296 |   return "tokenTarget";
 28297 | }
 28298 |
 28299 | function liveRefereeSetScreen(screen = "play", effectName = "") {
 28300 |   const normalizedScreen = normalizeLiveRefereeScreenName(screen);
 28301 |   state.liveRefereeScreen = normalizedScreen;
 28302 |   state.liveRefereeSelectedEffectName = normalizedScreen === "tokenTarget"
 28303 |     ? (effectName || state.liveRefereeSelectedEffectName || "")
 28304 |     : "";
 28305 |   if (normalizedScreen === "tokenTarget" && state.liveRefereeSelectedEffectName) {
 28306 |     liveRefereeEffectDraftFor(state.liveRefereeSelectedEffectName, liveRefereeControlledPlayerId());
 28307 |   } else if (normalizedScreen === "play") {
 28308 |     state.liveRefereeEffectDraft = null;
 28309 |   }
 28310 |   if (liveRefereeScreenNeedsNavigation(normalizedScreen)) {
 28311 |     liveRefereeNavigationActive = true;
 28312 |     liveRefereeNavigationPromptKey = liveRefereeNavigationKey();
 28313 |   } else {
 28314 |     clearLiveRefereeNavigation();
 28315 |   }
 28316 |   saveClientUiState({ immediate: true });
 28317 |   render();
 28318 | }
 28319 |
 28320 | function resetLiveRefereeScreenState() {
```

## Target-category mapping — `app.js:29370-29430`

```js
 29370 |   const speciesListId = `live-referee-species-${slugify(tokenName) || "token"}`;
 29371 |   const targetType = normalizeEffectTargetType(metadata.targetType);
 29372 |   const targetScope = normalizeEffectTargetScope(metadata.targetScope);
 29373 |   if (!tokenName) {
 29374 |     return liveRefereeGameScreenMarkup({
 29375 |       className: "live-referee-effect-screen",
 29376 |       situation: "Choose a token first.",
 29377 |       choices: liveRefereeNavActionsMarkup([
 29378 |         liveRefereeChoiceButtonMarkup({ label: "Back", screen: "tokens" })
 29379 |       ])
 29380 |     });
 29381 |   }
 29382 |   if (metadata.id === "follow-me") {
 29383 |     return liveRefereeFollowMeTargetScreenMarkup({ prompt, tokenName, metadata, actor });
 29384 |   }
 29385 |   if (metadata.id === "after-you") {
 29386 |     return liveRefereeAfterYouTargetScreenMarkup({ prompt, tokenName, metadata, actor });
 29387 |   }
 29388 |   if (targetType === EFFECT_TARGET_TYPES.CURRENT_PROMPT
 29389 |     || (targetScope === EFFECT_TARGET_SCOPES.CURRENT_PROMPT && metadata.timingCategory === TOKEN_TIMING_CATEGORIES.PROTECTION)) {
 29390 |     const promptLabel = liveRefereeCurrentPromptActionLabel(prompt);
 29391 |     return liveRefereeEffectTargetScreenMarkup({
 29392 |       prompt,
 29393 |       tokenName,
 29394 |       metadata,
 29395 |       situation: `Use ${tokenName} against ${promptLabel}?`,
 29396 |       submitLabel: `Use ${tokenName}`,
 29397 |       submitDisabled: !prompt.pendingEvent,
 29398 |       className: "current-prompt"
 29399 |     });
 29400 |   }
 29401 |   if (targetType === EFFECT_TARGET_TYPES.ENCOUNTER_RESULT) {
 29402 |     const encounterLine = liveRefereeCurrentEncounterLine(prompt);
 29403 |     return liveRefereeEffectTargetScreenMarkup({
 29404 |       prompt,
 29405 |       tokenName,
 29406 |       metadata,
 29407 |       situation: encounterLine ? (slugify(tokenName).includes("reroll") ? "Reroll this encounter?" : `Use ${tokenName} on this encounter?`) : "No encounter result is waiting.",
 29408 |       fields: encounterLine ? `<p class="live-referee-target-summary">${escapeHtml(encounterLine)}</p>` : "",
 29409 |       submitLabel: slugify(tokenName).includes("reroll") ? "Reroll" : `Use ${tokenName}`,
 29410 |       submitDisabled: !encounterLine,
 29411 |       className: "encounter-target"
 29412 |     });
 29413 |   }
 29414 |   if (metadata.id === "incinerate") {
 29415 |     return liveRefereeIncinerateTargetScreenMarkup({ prompt, tokenName, metadata, actor });
 29416 |   }
 29417 |   if (metadata.id === "wicked-blow") {
 29418 |     return liveRefereeWickedBlowTargetScreenMarkup({ prompt, tokenName, metadata, actor });
 29419 |   }
 29420 |   if (metadata.id === "move-deleter") {
 29421 |     return liveRefereeMoveDeleterTargetScreenMarkup({ prompt, tokenName, metadata, actor });
 29422 |   }
 29423 |   if (metadata.id === "lingering-aroma") {
 29424 |     return liveRefereeLingeringAromaTargetScreenMarkup({ prompt, tokenName, metadata, actor });
 29425 |   }
 29426 |   if (metadata.id === "haze-curse") {
 29427 |     return liveRefereeHazeTargetScreenMarkup({ prompt, tokenName, metadata, actor });
 29428 |   }
 29429 |   if (metadata.id === "knock-off-curse") {
 29430 |     return liveRefereeKnockOffTargetScreenMarkup({ prompt, tokenName, metadata, actor });
```

## Sandbox/admin Live scenarios — `app.js:46920-47010`

```js
 46920 |   if (kind === "teamLock") setTokenScenarioPhase("battle", "teamSubmissionLock");
 46921 |   if (kind === "sabotage") setTokenScenarioPhase("battle", "sabotage");
 46922 |   if (kind === "teamPreview") setTokenScenarioPhase("battle", "teamPreview");
 46923 |   if (kind === "rivalBattle") setTokenScenarioPhase("battle", "rivalBattles");
 46924 |   if (kind === "insufficientMoney") actor.balance = 0;
 46925 |   if (kind === "fieldActive") addTokenScenarioPersistentEffect("field", actor, target);
 46926 |   if (kind === "lingeringActive") addTokenScenarioPersistentEffect("safeguard", actor, target);
 46927 |   if (kind === "expiring") {
 46928 |     const statusId = addTokenScenarioPersistentEffect("restrict", actor, target);
 46929 |     const status = (state.lingeringStatuses || []).find((entry) => entry.id === statusId);
 46930 |     if (status) {
 46931 |       status.expiresAtSeries = state.series;
 46932 |       status.expiresAtGym = Number(state.gym);
 46933 |       status.note = "Expires at the next matching expiration check.";
 46934 |     }
 46935 |   }
 46936 |
 46937 |   let activity = null;
 46938 |   if (kind === "targetedResponse" || kind === "severalResponses") {
 46939 |     activity = createTokenScenarioEvent({ actor, target, title: `${actor.name} targeted ${target.name}.`, message: `${actor.name} used a test effect on ${target.name}.`, targeted: true });
 46940 |   } else if (kind === "nonTargetedResponse") {
 46941 |     activity = createTokenScenarioEvent({ actor, target, title: `${actor.name} changed the table.`, message: `${actor.name} used a non-targeted table effect.`, targeted: false });
 46942 |   } else if (kind === "nestedResponse") {
 46943 |     activity = createTokenScenarioEvent({ actor, target, tokenDefinition, title: `${actor.name} used ${tokenDefinition.name}.`, message: `${actor.name} used ${tokenDefinition.name} on ${target.name}.`, type: TOKEN_PENDING_EVENT_TYPES.CONTROL_TOKEN, sourceType: "scenario-test", targeted: true });
 46944 |     const responder = target;
 46945 |     addInteractionResponse(activity.id, {
 46946 |       type: "immunity",
 46947 |       playerId: responder.id,
 46948 |       respondingToPromptId: interactionRootPromptId(activity),
 46949 |       source: "token",
 46950 |       status: "recorded",
 46951 |       tokenName: "Immunity",
 46952 |       tokenId: "scenario-immunity",
 46953 |       note: `${responder.name} used Immunity in the scenario.`
 46954 |     });
 46955 |   } else if (kind === "encounterBefore") {
 46956 |     activity = createTokenScenarioEvent({ actor, target, title: `${actor.name}'s encounter is about to begin.`, message: "Choose before-roll Encounter effects now.", type: "encounter-before-roll", targeted: false, payload: { encounterStage: "beforeRoll" } });
 46957 |   } else if (kind === "encounterResult") {
 46958 |     activity = createTokenScenarioEvent({ actor, target, title: `${actor.name} rolled Abra.`, message: `${actor.name} rolled Abra. The result is pending.`, type: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT, targeted: false, payload: { encounterStage: "result", resultName: "Abra" } });
 46959 |   } else if (kind === "wheelManual") {
 46960 |     const guided = (contract?.list || []).find((definition) => definition.resolverMode === EFFECT_RESOLUTION_MODES.GUIDED) || tokenDefinition;
 46961 |     activity = createTokenScenarioEvent({ actor, target, tokenDefinition: guided, title: `${actor.name} used ${guided.name}.`, message: `${guided.name} is waiting for its guided result.`, type: TOKEN_PENDING_EVENT_TYPES.CONTROL_TOKEN, sourceType: "token-use", targeted: guided.targetScope !== "tableWide" });
 46962 |   } else if (kind === "invalidTarget") {
 46963 |     activity = createTokenScenarioEvent({ actor, target, tokenDefinition, title: `${actor.name} used ${tokenDefinition.name} with a missing target.`, message: "This scenario tests resolution revalidation.", type: TOKEN_PENDING_EVENT_TYPES.CONTROL_TOKEN, sourceType: "token-use", targeted: false });
 46964 |     activity.payload.targetPokemonId = "missing-scenario-target";
 46965 |     activity.payload.targetPokemonName = "";
 46966 |     activity.payload.targetText = "";
 46967 |   }
 46968 |
 46969 |   resetLiveRefereeScreenState();
 46970 |   state.liveRefereeCollapsed = false;
 46971 |   state.liveRefereeWindowMode = "floating";
 46972 |   render();
 46973 |   openAdminTools();
 46974 |   syncAdminRepairControls();
 46975 |   syncTokenSandboxBanner();
 46976 |   if (els.adminTokenScenarioStatus) {
 46977 |     const info = tokenScenarioSandbox.info();
 46978 |     els.adminTokenScenarioStatus.textContent = info.revisionVerified
 46979 |       ? `Sandbox active at real revision ${info.entryRevision}. Changes are isolated until commit.`
 46980 |       : "Sandbox active. The backend revision could not be verified, so commit is disabled; discard remains safe.";
 46981 |   }
 46982 | }
 46983 |
 46984 | async function discardTokenScenarioSandbox() {
 46985 |   if (!tokenScenarioSandboxActive()) return;
 46986 |   const info = tokenScenarioSandbox.info();
 46987 |   if (info?.status === "committing") return;
 46988 |   let authoritative = null;
 46989 |   let authoritativePayload = null;
 46990 |   try {
 46991 |     authoritativePayload = await fetchAuthoritativeGameState();
 46992 |     backendSync.version = authoritativePayload.version;
 46993 |     if (!authoritativePayload.state) throw new Error("The backend has no authoritative game state to reload.");
 46994 |     const safeUi = clientUiSnapshotForPersistence(state);
 46995 |     authoritative = restoreClientLocalState(normalizeState(authoritativePayload.state), safeUi);
 46996 |   } catch (error) {
 46997 |     console.warn("Token Sandbox discard could not reload authoritative state; using the unsaved entry baseline.", error);
 46998 |   }
 46999 |   const discarded = tokenScenarioSandbox.discard({ authoritativeState: authoritative });
 47000 |   tokenScenarioClientUiBaseline = null;
 47001 |   state = normalizeState(discarded.state);
 47002 |   connectBackendEvents();
 47003 |   render();
 47004 |   openAdminTools();
 47005 |   syncAdminRepairControls();
 47006 |   syncTokenSandboxBanner();
 47007 |   if (els.adminTokenScenarioStatus) {
 47008 |     els.adminTokenScenarioStatus.textContent = discarded.usedFallback
 47009 |       ? "Sandbox discarded. Backend reload failed, so the entry baseline is shown as an unsaved fallback and may be stale."
 47010 |       : `Sandbox discarded. Authoritative real revision ${authoritativePayload.version} was loaded.`;
```

## Admin test-event creation — `app.js:47450-47540`

```js
 47450 |     freeMode: Boolean(enabled),
 47451 |     controlledPlayerId
 47452 |   });
 47453 |   addLogEntry({
 47454 |     action: "admin",
 47455 |     category: "admin",
 47456 |     player: "Admin Tools",
 47457 |     item: `Free Testing Mode ${testing.freeMode ? "enabled" : "disabled"}.`,
 47458 |     type: "admin-testing-override",
 47459 |     tags: ["admin", "testing", "turn-order"],
 47460 |     quantity: 1,
 47461 |     price: 0,
 47462 |     balanceAfter: activePlayer().balance
 47463 |   });
 47464 |   saveState();
 47465 |   render();
 47466 |   syncAdminRepairControls();
 47467 | }
 47468 |
 47469 | function toggleAdminTurnOrderOverride() {
 47470 |   setAdminFreeTestingMode(Boolean(els.adminIgnoreTurnOrder?.checked));
 47471 | }
 47472 |
 47473 | function toggleAdminFreeTestingMode() {
 47474 |   setAdminFreeTestingMode(!hostTestingOverrideEnabled());
 47475 | }
 47476 |
 47477 | function createAdminTestEvent(kind = "") {
 47478 |   const actor = activePlayer();
 47479 |   const target = state.players.find((player) => player.id !== actor.id) || actor;
 47480 |   const common = {
 47481 |     actorPlayerId: actor.id,
 47482 |     targetPlayerId: target.id,
 47483 |     eligiblePlayerIds: state.players.map((player) => player.id),
 47484 |     responseTypes: ["immunity"],
 47485 |     payload: {
 47486 |       liveTable: true,
 47487 |       responsesAllowed: true,
 47488 |       transactionsAllowed: true,
 47489 |       effectApplication: "manual",
 47490 |       targetPlayerName: target.name
 47491 |     }
 47492 |   };
 47493 |   const presets = {
 47494 |     encounter: {
 47495 |       type: TOKEN_PENDING_EVENT_TYPES.ENCOUNTER_RESULT,
 47496 |       title: `${actor.name} test encounter result`,
 47497 |       message: `${actor.name} rolled a test encounter result. Encounter tokens and trades may happen before finalizing.`,
 47498 |       sourceType: "admin-test-encounter",
 47499 |       payload: { tokenTimingCategory: TOKEN_TIMING_CATEGORIES.ENCOUNTER, effectApplication: "audit" }
 47500 |     },
 47501 |     control: {
 47502 |       type: TOKEN_PENDING_EVENT_TYPES.CONTROL_TOKEN,
 47503 |       title: "Move Deleter Pending",
 47504 |       message: `${actor.name} used Move Deleter targeting ${target.name}. Protection responses and trades may happen before this resolves.`,
 47505 |       sourceType: "admin-test-control-token",
 47506 |       payload: { tokenName: "Move Deleter", tokenTimingCategory: TOKEN_TIMING_CATEGORIES.CONTROL }
 47507 |     },
 47508 |     curse: {
 47509 |       type: TOKEN_PENDING_EVENT_TYPES.CURSE_TOKEN,
 47510 |       title: "Flame Curse Pending",
 47511 |       message: `${actor.name} used Flame Curse targeting ${target.name}. Protection or cleanse effects may happen before this resolves.`,
 47512 |       sourceType: "admin-test-curse-token",
 47513 |       payload: { tokenName: "Flame Curse", tokenTimingCategory: TOKEN_TIMING_CATEGORIES.CURSE }
 47514 |     },
 47515 |     "team-lock-curse": {
 47516 |       type: TOKEN_PENDING_EVENT_TYPES.CURSE_TOKEN,
 47517 |       title: "Sabotage Curse Pending",
 47518 |       message: `${actor.name} used Flame Curse during Sabotage targeting ${target.name}. Submitted teams are locked before Team Preview.`,
 47519 |       sourceType: "admin-test-team-lock-curse",
 47520 |       payload: { tokenName: "Flame Curse", tokenTimingCategory: TOKEN_TIMING_CATEGORIES.CURSE, teamLock: true, timingWindow: TOKEN_PENDING_EVENT_TYPES.TEAM_LOCK_WINDOW }
 47521 |     },
 47522 |     "class-effect": {
 47523 |       type: "class-effect",
 47524 |       title: "Manual Class Effect Pending",
 47525 |       message: `${actor.name} triggered a test class effect. Resolve responses, trades, or No Response before applying it manually.`,
 47526 |       sourceType: "admin-test-class-effect",
 47527 |       payload: { effectApplication: "manual" }
 47528 |     }
 47529 |   };
 47530 |   const preset = presets[kind];
 47531 |   if (!preset) return;
 47532 |   const activity = createInteractionEvent({
 47533 |     ...common,
 47534 |     ...preset,
 47535 |     payload: {
 47536 |       ...common.payload,
 47537 |       ...(preset.payload || {})
 47538 |     }
 47539 |   });
 47540 |   state.activityResponseDrawerOpen = true;
```

## Causal undo cleanup — `app.js:48870-48930`

```js
 48870 | function openStartSeriesChoice() {
 48871 |   if (!state.seriesChoiceRequired || pendingPhaseAdvance || !els.phaseConfirmModal?.classList.contains("hidden")) return;
 48872 |   pendingPhaseAdvance = { phase: "chooseStartSeries", label: "Start Series", requiresSeriesChoice: true };
 48873 |   els.phaseConfirmTitle.textContent = "Choose Starting Series";
 48874 |   els.phaseConfirmMessage.textContent = phaseAdvanceConfirmMessage(pendingPhaseAdvance);
 48875 |   els.confirmPhaseAdvance.textContent = "Start Series";
 48876 |   renderPhaseSeriesChoice(pendingPhaseAdvance);
 48877 |   els.phaseConfirmModal.classList.remove("hidden");
 48878 | }
 48879 |
 48880 | function phaseAdvanceUndoSnapshot() {
 48881 |   return {
 48882 |     series: state.series,
 48883 |     gym: Number(state.gym),
 48884 |     currentPhase: currentPhase(),
 48885 |     phaseState: structuredClone(state.phaseState || {}),
 48886 |     seriesOrder: structuredClone(state.seriesOrder || []),
 48887 |     seriesChoiceRequired: Boolean(state.seriesChoiceRequired),
 48888 |     momentum: Object.fromEntries(state.players.map((player) => [player.id, Number(player.momentum || 0)])),
 48889 |     inventories: Object.fromEntries(state.players.map((player) => [player.id, structuredClone(player.inventory || [])])),
 48890 |     pokemonRecords: structuredClone(state.pokemonRecords || []),
 48891 |     playerNotifications: structuredClone(state.playerNotifications || []),
 48892 |     breederDeposits: structuredClone(state.breederDeposits || []),
 48893 |     dragonsDenSessions: structuredClone(state.dragonsDenSessions || []),
 48894 |     lingeringStatuses: structuredClone(state.lingeringStatuses || []),
 48895 |     globalPokemonRules: structuredClone(state.globalPokemonRules || {}),
 48896 |     banlistHistory: structuredClone(state.banlistHistory || []),
 48897 |     delayedEffects: structuredClone(state.delayedEffects || []),
 48898 |     broughtTeamSnapshots: structuredClone(state.broughtTeamSnapshots || []),
 48899 |     copiedActivations: structuredClone(state.copiedActivations || []),
 48900 |     postPayoutProcedures: structuredClone(state.postPayoutProcedures || []),
 48901 |     endOfActionProcedures: structuredClone(state.endOfActionProcedures || []),
 48902 |     copiedTokenRelationships: structuredClone(state.copiedTokenRelationships || []),
 48903 |     privateEffectRecords: structuredClone(state.privateEffectRecords || []),
 48904 |     encounterCopyRecords: structuredClone(state.encounterCopyRecords || []),
 48905 |     effectOperations: structuredClone(state.effectOperations || [])
 48906 |   };
 48907 | }
 48908 |
 48909 | function closePhaseAdvanceConfirm() {
 48910 |   pendingPhaseAdvance = null;
 48911 |   els.confirmPhaseAdvance.textContent = "Confirm";
 48912 |   els.phaseSeriesChoice?.classList.add("hidden");
 48913 |   els.phaseConfirmModal.classList.add("hidden");
 48914 | }
 48915 |
 48916 | async function confirmPhaseAdvance({ skipPendingGuard = false } = {}) {
 48917 |   if (!pendingPhaseAdvance) return;
 48918 |   const target = pendingPhaseAdvance;
 48919 |   const blockedReason = phaseAdvanceBlockedByActionOperation(target);
 48920 |   if (blockedReason) {
 48921 |     alert(blockedReason);
 48922 |     return;
 48923 |   }
 48924 |   const unresolvedDevelopment = (state.playerNotifications || []).find((notification) =>
 48925 |     ["breeder-egg-move", "daycare-tm-move", "dragons-den-reward"].includes(notification.type)
 48926 |     && !["completed", "resolved", "cancelled", "dismissed"].includes(String(notification.status || "pending").toLowerCase()));
 48927 |   if (unresolvedDevelopment && (target.phase === "battle" || target.flowState === LIVE_REFEREE_FLOW_STATES.TEAM_LOCK)) {
 48928 |     const owner = state.players.find((player) => player.id === unresolvedDevelopment.playerId);
 48929 |     alert(`${owner?.name || "A trainer"} must resolve ${unresolvedDevelopment.title || "a facility reward"} before Team Lock.`);
 48930 |     return;
```

## State snapshot/undo restoration — `app.js:59290-59690`

```js
 59290 |   }
 59291 |   state.gameCornerUnlocks = (state.gameCornerUnlocks || []).filter((unlock) => !sessionIds.has(unlock.gameCornerSessionId) && unlock.actionVisitId !== undoData.visitId);
 59292 |   (state.gameCornerSessions || []).forEach((session) => {
 59293 |     if (sessionIds.has(session.id)) {
 59294 |       session.status = "undone";
 59295 |       session.undoneAt = new Date().toISOString();
 59296 |     }
 59297 |   });
 59298 |   const gymState = ensureGymPhaseState(undoData.series || state.series, undoData.gym || state.gym);
 59299 |   if (sessionIds.has(gymState.activeGameCornerTokenSessionId)) gymState.activeGameCornerTokenSessionId = "";
 59300 |   if (state.selectedRandomPokemonSessionId && randomPokemonSessionIds.has(state.selectedRandomPokemonSessionId)) {
 59301 |     const next = pendingRandomPokemonSessions();
 59302 |     state.selectedRandomPokemonSessionId = next[0]?.id || "";
 59303 |     state.randomPokemonDrawerOpen = Boolean(next.length);
 59304 |   }
 59305 |   const linkedInteractionIds = new Set((state.interactionEvents || [])
 59306 |     .filter((activity) => randomPokemonSessionIds.has(activity.sourceId)
 59307 |       || randomPokemonSessionIds.has(activity.payload?.randomPokemonSessionId))
 59308 |     .map((activity) => activity.id));
 59309 |   const linkedInteractionTitles = new Set((state.interactionEvents || [])
 59310 |     .filter((activity) => linkedInteractionIds.has(activity.id))
 59311 |     .map((activity) => activity.title)
 59312 |     .filter(Boolean));
 59313 |   state.log.forEach((entry) => {
 59314 |     if (entry.gameCornerSessionId && sessionIds.has(entry.gameCornerSessionId)) entry.undone = true;
 59315 |     if (entry.actionVisitId === undoData.visitId || entry.visitId === undoData.visitId) entry.undone = true;
 59316 |     if (randomPokemonSessionIds.has(entry.randomPokemonSessionId)) entry.undone = true;
 59317 |     if (linkedInteractionIds.has(entry.linkedEventId)) entry.undone = true;
 59318 |     if (entry.type === "interaction-resolution" && linkedInteractionTitles.has(String(entry.summary || "").split("\n")[0])) entry.undone = true;
 59319 |   });
 59320 |   return [...sessionIds];
 59321 | }
 59322 |
 59323 | function restoreGameCornerTokenInventorySnapshot(undoData, player) {
 59324 |   if (!player || !undoData.previousInventory) return;
 59325 |   const previousGcTokens = structuredClone(undoData.previousInventory || []).filter(isGameCornerToken);
 59326 |   const currentNonGcInventory = (player.inventory || []).filter((item) => !isGameCornerToken(item));
 59327 |   player.inventory = [...previousGcTokens, ...currentNonGcInventory];
 59328 | }
 59329 |
 59330 | function restoreTokenEffectContractUndoData(undoData) {
 59331 |   if (undoData.previousPlayers) state.players = structuredClone(undoData.previousPlayers);
 59332 |   if (undoData.previousPokemonRecords) state.pokemonRecords = structuredClone(undoData.previousPokemonRecords).map(normalizePokemonRecord);
 59333 |   if (undoData.previousPokemonLog) state.pokemonLog = structuredClone(undoData.previousPokemonLog);
 59334 |   if (undoData.previousLingeringStatuses) state.lingeringStatuses = structuredClone(undoData.previousLingeringStatuses);
 59335 |   if (undoData.previousTokenActivations) state.tokenActivations = structuredClone(undoData.previousTokenActivations);
 59336 |   if (undoData.previousTokenConsumptions) state.tokenConsumptions = structuredClone(undoData.previousTokenConsumptions);
 59337 |   if (undoData.previousPlayerNotifications) state.playerNotifications = structuredClone(undoData.previousPlayerNotifications);
 59338 |   if (undoData.previousWheelSessions) state.wheelSessions = structuredClone(undoData.previousWheelSessions);
 59339 |   if (undoData.previousRandomPokemonSessions) state.randomPokemonSessions = structuredClone(undoData.previousRandomPokemonSessions);
 59340 |   if (undoData.previousInteractionEvents) state.interactionEvents = structuredClone(undoData.previousInteractionEvents).map((activity) => normalizeInteractionActivity(activity, state));
 59341 |   if (undoData.previousTransactions) state.transactions = structuredClone(undoData.previousTransactions);
 59342 |   if (undoData.previousGlobalPokemonRules) state.globalPokemonRules = structuredClone(undoData.previousGlobalPokemonRules);
 59343 |   if (undoData.previousBanlistHistory) state.banlistHistory = structuredClone(undoData.previousBanlistHistory);
 59344 |   if (undoData.previousTeambuilder) state.teambuilder = structuredClone(undoData.previousTeambuilder);
 59345 |   if (undoData.previousBattleTeams) state.battleTeams = structuredClone(undoData.previousBattleTeams);
 59346 |   if (undoData.previousPerkSystem) state.perkSystem = structuredClone(undoData.previousPerkSystem);
 59347 |   if (undoData.previousClassStateByPlayerId) state.classStateByPlayerId = structuredClone(undoData.previousClassStateByPlayerId);
 59348 |   if (undoData.previousPhaseState) state.phaseState = structuredClone(undoData.previousPhaseState);
 59349 |   if (undoData.previousEffectAuditRecords) state.effectAuditRecords = structuredClone(undoData.previousEffectAuditRecords);
 59350 |   if (undoData.previousEffectOperations) state.effectOperations = structuredClone(undoData.previousEffectOperations);
 59351 |   if (undoData.previousDelayedEffects) state.delayedEffects = structuredClone(undoData.previousDelayedEffects);
 59352 |   if (undoData.previousBroughtTeamSnapshots) state.broughtTeamSnapshots = structuredClone(undoData.previousBroughtTeamSnapshots);
 59353 |   if (undoData.previousCopiedActivations) state.copiedActivations = structuredClone(undoData.previousCopiedActivations);
 59354 |   if (undoData.previousPostPayoutProcedures) state.postPayoutProcedures = structuredClone(undoData.previousPostPayoutProcedures);
 59355 |   if (undoData.previousEndOfActionProcedures) state.endOfActionProcedures = structuredClone(undoData.previousEndOfActionProcedures);
 59356 |   if (undoData.previousCopiedTokenRelationships) state.copiedTokenRelationships = structuredClone(undoData.previousCopiedTokenRelationships);
 59357 |   if (undoData.previousPrivateEffectRecords) state.privateEffectRecords = structuredClone(undoData.previousPrivateEffectRecords);
 59358 |   if (undoData.previousEncounterCopyRecords) state.encounterCopyRecords = structuredClone(undoData.previousEncounterCopyRecords);
 59359 |   syncLinkedTransactions();
 59360 |   syncPlayerPokemonLists();
 59361 | }
 59362 |
 59363 | function newerCommittedTokenEffectLog(entry) {
 59364 |   const order = Number(entry?.eventOrder || 0);
 59365 |   return (state.log || [])
 59366 |     .filter((candidate) => !candidate.undone && candidate.undoable && ["undoTokenEffectContract", "undoTokenEffectContractCausal"].includes(candidate.undoData?.actionType))
 59367 |     .filter((candidate) => candidate.id !== entry.id && Number(candidate.eventOrder || 0) > order)
 59368 |     .sort((a, b) => Number(b.eventOrder || 0) - Number(a.eventOrder || 0))[0] || null;
 59369 | }
 59370 |
 59371 | function undoLogEntry(logId) {
 59372 |   // Undo is intentionally data-driven: add new actionType handlers here as
 59373 |   // future confirmed events begin storing their own reverse instructions.
 59374 |   const entry = state.log.find((item) => item.id === logId);
 59375 |   if (!entry || entry.undone || !entry.undoable || !entry.undoData) return;
 59376 |   const { undoData } = entry;
 59377 |   if (["undoTokenEffectContract", "undoTokenEffectContractCausal"].includes(undoData.actionType)) {
 59378 |     const newer = newerCommittedTokenEffectLog(entry);
 59379 |     if (newer) {
 59380 |       alert(`Rewind the newer Token event first:\n\n${describeLogEntry(newer)}`);
 59381 |       return;
 59382 |     }
 59383 |   }
 59384 |   if (undoData.actionType === "removeBattleRecord") {
 59385 |     state.battleRecords = state.battleRecords.filter((record) => record.id !== undoData.battleRecordId);
 59386 |   } else if (undoData.actionType === "restoreBattleRecords") {
 59387 |     restoreBattleRecords(undoData.records || []);
 59388 |   } else if (undoData.actionType === "restoreBattlePhaseSimulation") {
 59389 |     state.battleRecords = structuredClone(undoData.previousBattleRecords || []);
 59390 |     state.battleSchedules ||= {};
 59391 |     state.battleSchedules[gymResultKey(undoData.series || state.series, undoData.gym || state.gym)] = structuredClone(undoData.previousSchedule || {});
 59392 |     state.pendingBattle = structuredClone(undoData.previousPendingBattle || {});
 59393 |     syncPlayerPokemonLists();
 59394 |   } else if (undoData.actionType === "removePokemonRecord") {
 59395 |     state.pokemonRecords = state.pokemonRecords.filter((pokemon) => pokemon.id !== undoData.pokemonId);
 59396 |     syncPlayerPokemonLists();
 59397 |   } else if (undoData.actionType === "undoGymResults") {
 59398 |     const gymResult = (state.gymResults || []).find((result) => result.id === undoData.gymResultId);
 59399 |     if (gymResult) gymResult.undone = true;
 59400 |     const replacedResult = (state.gymResults || []).find((result) => result.id === undoData.replacedResultId);
 59401 |     if (replacedResult) replacedResult.undone = false;
 59402 |     restoreGymResultUndoData(undoData);
 59403 |   } else if (undoData.actionType === "undoBadgePointPurchase") {
 59404 |     const player = state.players.find((candidate) => candidate.id === undoData.playerId);
 59405 |     if (player) {
 59406 |       player.badgePoints = Number(undoData.previousBadgePoints || 0);
 59407 |       player.badgePurchasesThisSeries = Number(undoData.previousBadgePurchasesThisSeries || 0);
 59408 |       player.balance = Number(undoData.previousBalance ?? player.balance ?? 0);
 59409 |     }
 59410 |     state.moneyLedger = structuredClone(undoData.previousMoneyLedger || []);
 59411 |   } else if (undoData.actionType === "undoBulletinBoardAction") {
 59412 |     const key = actionPhaseKey(undoData.series, undoData.gym);
 59413 |     state.actionPhaseState ||= { selections: {}, seriesTrackers: {} };
 59414 |     state.actionPhaseState.selections ||= {};
 59415 |     state.actionPhaseState.selections[key] ||= { series: undoData.series, gym: undoData.gym, playerVisits: {} };
 59416 |     state.actionPhaseState.selections[key].playerVisits[undoData.playerId] = structuredClone(undoData.previousVisits || []);
 59417 |     const player = state.players.find((candidate) => candidate.id === undoData.playerId);
 59418 |     if (player) player.balance = Number(undoData.previousBalance ?? player.balance ?? 0);
 59419 |     if (player && undoData.previousInventory) player.inventory = structuredClone(undoData.previousInventory);
 59420 |     state.moneyLedger = structuredClone(undoData.previousMoneyLedger || []);
 59421 |     state.bulletinBoardSessions = structuredClone(undoData.previousBulletinBoardSessions || []);
 59422 |   } else if (undoData.actionType === "undoActionSystemSnapshot") {
 59423 |     const key = actionPhaseKey(undoData.series || state.series, undoData.gym || state.gym);
 59424 |     state.actionPhaseState ||= { selections: {}, seriesTrackers: {} };
 59425 |     state.actionPhaseState.selections ||= {};
 59426 |     state.actionPhaseState.selections[key] ||= { series: undoData.series || state.series, gym: Number(undoData.gym || state.gym), playerVisits: {} };
 59427 |     state.actionPhaseState.selections[key].playerVisits[undoData.playerId] = structuredClone(undoData.previousVisits || []);
 59428 |     const player = state.players.find((candidate) => candidate.id === undoData.playerId);
 59429 |     if (undoData.previousPlayers) {
 59430 |       state.players = structuredClone(undoData.previousPlayers);
 59431 |     }
 59432 |     if (player && undoData.previousInventory) player.inventory = structuredClone(undoData.previousInventory);
 59433 |     if (undoData.previousPlayerInventories) {
 59434 |       state.players.forEach((candidate) => {
 59435 |         if (Object.prototype.hasOwnProperty.call(undoData.previousPlayerInventories, candidate.id)) {
 59436 |           candidate.inventory = structuredClone(undoData.previousPlayerInventories[candidate.id] || []);
 59437 |         }
 59438 |       });
 59439 |     }
 59440 |     if (undoData.previousPokemonRecords) {
 59441 |       state.pokemonRecords = structuredClone(undoData.previousPokemonRecords).map(normalizePokemonRecord);
 59442 |       syncPlayerPokemonLists();
 59443 |     }
 59444 |     if (undoData.previousPlayerNotifications) state.playerNotifications = structuredClone(undoData.previousPlayerNotifications);
 59445 |     if (undoData.previousGraveyardSessions) state.graveyardSessions = structuredClone(undoData.previousGraveyardSessions);
 59446 |     if (undoData.previousDepartmentStoreVisits) state.departmentStoreVisits = structuredClone(undoData.previousDepartmentStoreVisits);
 59447 |     if (undoData.previousPcSessions) state.pcSessions = structuredClone(undoData.previousPcSessions);
 59448 |     if (undoData.previousRangerBaseSessions) state.rangerBaseSessions = structuredClone(undoData.previousRangerBaseSessions);
 59449 |     if (undoData.previousPokemonCenterSessions) state.pokemonCenterSessions = structuredClone(undoData.previousPokemonCenterSessions);
 59450 |     if (undoData.previousGlobalPokemonRules) state.globalPokemonRules = structuredClone(undoData.previousGlobalPokemonRules);
 59451 |     if (undoData.previousBanlistHistory) state.banlistHistory = structuredClone(undoData.previousBanlistHistory);
 59452 |     if (undoData.previousActionSeriesTrackers) {
 59453 |       state.actionPhaseState ||= { selections: {}, seriesTrackers: {} };
 59454 |       state.actionPhaseState.seriesTrackers = structuredClone(undoData.previousActionSeriesTrackers);
 59455 |     }
 59456 |     if (undoData.previousMoneyLedger) state.moneyLedger = structuredClone(undoData.previousMoneyLedger);
 59457 |     syncPlayerPokemonLists();
 59458 |   } else if (undoData.actionType === "undoSilphCoAction") {
 59459 |     const key = actionPhaseKey(undoData.series, undoData.gym);
 59460 |     state.actionPhaseState ||= { selections: {}, seriesTrackers: {} };
 59461 |     state.actionPhaseState.selections ||= {};
 59462 |     state.actionPhaseState.selections[key] ||= { series: undoData.series, gym: undoData.gym, playerVisits: {} };
 59463 |     state.actionPhaseState.selections[key].playerVisits[undoData.playerId] = structuredClone(undoData.previousVisits || []);
 59464 |     const player = state.players.find((candidate) => candidate.id === undoData.playerId);
 59465 |     if (player) player.balance = Number(undoData.previousBalance ?? player.balance ?? 0);
 59466 |     if (undoData.previousMoneyLedger) state.moneyLedger = structuredClone(undoData.previousMoneyLedger);
 59467 |     if (undoData.previousPokemonRecords) state.pokemonRecords = structuredClone(undoData.previousPokemonRecords).map(normalizePokemonRecord);
 59468 |     if (undoData.previousSilphCoSessions) state.silphCoSessions = structuredClone(undoData.previousSilphCoSessions);
 59469 |     if (player && undoData.previousMoveAccessGrants) player.moveAccessGrants = structuredClone(undoData.previousMoveAccessGrants);
 59470 |     syncPlayerPokemonLists();
 59471 |   } else if (undoData.actionType === "undoActionVisit") {
 59472 |     const key = actionPhaseKey(undoData.series, undoData.gym);
 59473 |     state.actionPhaseState ||= { selections: {}, seriesTrackers: {} };
 59474 |     state.actionPhaseState.selections ||= {};
 59475 |     state.actionPhaseState.seriesTrackers ||= {};
 59476 |     state.actionPhaseState.selections[key] ||= { series: undoData.series, gym: undoData.gym, playerVisits: {} };
 59477 |     clearActionOperationForUndoneVisit(undoData.visitId, undoData.playerId, undoData.series, undoData.gym);
 59478 |     state.actionPhaseState.selections[key].playerVisits[undoData.playerId] = structuredClone(undoData.previousVisits || []);
 59479 |     const visit = actionVisitById(undoData.visitId, undoData.playerId, undoData.series, undoData.gym);
 59480 |     if (visit) {
 59481 |       visit.undone = true;
 59482 |       visit.status = "undone";
 59483 |     }
 59484 |     const player = state.players.find((candidate) => candidate.id === undoData.playerId);
 59485 |     if (player && undoData.previousShopLevels) player.shopLevels = structuredClone(undoData.previousShopLevels);
 59486 |     if (player && undoData.previousBadgePoints !== undefined) player.badgePoints = Number(undoData.previousBadgePoints || 0);
 59487 |     state.actionPhaseState.seriesTrackers[undoData.series] ||= {};
 59488 |     if (undoData.previousTracker) {
 59489 |       state.actionPhaseState.seriesTrackers[undoData.series][undoData.playerId] = structuredClone(undoData.previousTracker);
 59490 |     }
 59491 |     let undoneWheelSessionIds = [];
 59492 |     if (undoData.locationId === "gamecorner" || undoData.wheelSessionId || (state.wheelSessions || []).some((session) => session.sourceActionVisitId === undoData.visitId)) {
 59493 |       undoneWheelSessionIds = reverseWheelSessionsForActionVisit(undoData, player);
 59494 |       const undoneGameCornerSessionIds = reverseGameCornerSessionForActionVisit(undoData, player);
 59495 |       restoreGameCornerTokenInventorySnapshot(undoData, player);
 59496 |       state.log.forEach((logEntry) => {
 59497 |         if (undoneGameCornerSessionIds.includes(logEntry.gameCornerSessionId)) logEntry.undone = true;
 59498 |       });
 59499 |     } else if (undoData.locationId === "encounter" || undoData.encounterSessionId) {
 59500 |       undoEncounterActionVisit(undoData);
 59501 |     } else {
 59502 |       if (player && undoData.previousInventory) player.inventory = structuredClone(undoData.previousInventory);
 59503 |       if (player && undoData.previousBalance !== undefined) player.balance = Number(undoData.previousBalance);
 59504 |       if (undoData.previousMoneyLedger) state.moneyLedger = structuredClone(undoData.previousMoneyLedger);
 59505 |       undoneWheelSessionIds = (state.wheelSessions || [])
 59506 |         .filter((session) => session.sourceActionVisitId === undoData.visitId)
 59507 |         .map((session) => session.id);
 59508 |       if (undoData.previousWheelSessions) state.wheelSessions = structuredClone(undoData.previousWheelSessions);
 59509 |       if (state.selectedWheelSessionId && !pendingWheelSessions().some((session) => session.id === state.selectedWheelSessionId)) {
 59510 |         state.selectedWheelSessionId = "";
 59511 |         state.wheelDrawerOpen = false;
 59512 |       }
 59513 |     }
 59514 |     state.log.forEach((logEntry) => {
 59515 |       if (logEntry.visitId === undoData.visitId
 59516 |         || logEntry.actionVisitId === undoData.visitId
 59517 |         || logEntry.sourceVisitId === undoData.visitId
 59518 |         || undoneWheelSessionIds.includes(logEntry.wheelSessionId)) logEntry.undone = true;
 59519 |     });
 59520 |   } else if (undoData.actionType === "undoActionRepair") {
 59521 |     const key = actionPhaseKey(undoData.series, undoData.gym);
 59522 |     state.actionPhaseState ||= { selections: {}, seriesTrackers: {} };
 59523 |     state.actionPhaseState.selections ||= {};
 59524 |     state.actionPhaseState.selections[key] ||= { series: undoData.series, gym: undoData.gym, playerVisits: {} };
 59525 |     state.actionPhaseState.selections[key].playerVisits = structuredClone(undoData.previousPlayerVisits || {});
 59526 |     if (undoData.previousWheelSessions) state.wheelSessions = structuredClone(undoData.previousWheelSessions);
 59527 |   } else if (undoData.actionType === "undoBreederDeposit") {
 59528 |     const key = actionPhaseKey(undoData.series, undoData.gym);
 59529 |     state.actionPhaseState ||= { selections: {}, seriesTrackers: {} };
 59530 |     state.actionPhaseState.selections ||= {};
 59531 |     state.actionPhaseState.selections[key] ||= { series: undoData.series, gym: undoData.gym, playerVisits: {} };
 59532 |     state.actionPhaseState.selections[key].playerVisits[undoData.playerId] = structuredClone(undoData.previousVisits || []);
 59533 |     const player = state.players.find((candidate) => candidate.id === undoData.playerId);
 59534 |     if (player) player.balance = Number(undoData.previousBalance ?? player.balance ?? 0);
 59535 |     if (undoData.previousMoneyLedger) state.moneyLedger = structuredClone(undoData.previousMoneyLedger);
 59536 |     if (undoData.previousPlayerNotifications) state.playerNotifications = structuredClone(undoData.previousPlayerNotifications);
 59537 |     if (undoData.previousBreederDeposits) {
 59538 |       state.breederDeposits = structuredClone(undoData.previousBreederDeposits);
 59539 |     } else {
 59540 |       state.breederDeposits = (state.breederDeposits || []).filter((deposit) => deposit.id !== undoData.breederDepositId);
 59541 |     }
 59542 |     if (undoData.previousPokemonRecords) {
 59543 |       state.pokemonRecords = structuredClone(undoData.previousPokemonRecords).map(normalizePokemonRecord);
 59544 |     } else {
 59545 |       const pokemonIndex = (state.pokemonRecords || []).findIndex((pokemon) => pokemon.id === undoData.pokemonId);
 59546 |       if (pokemonIndex >= 0 && undoData.previousPokemon) {
 59547 |         state.pokemonRecords[pokemonIndex] = normalizePokemonRecord(structuredClone(undoData.previousPokemon));
 59548 |       }
 59549 |     }
 59550 |     syncPlayerPokemonLists();
 59551 |   } else if (undoData.actionType === "undoNotificationResolution") {
 59552 |     if (undoData.previousNotifications) state.playerNotifications = structuredClone(undoData.previousNotifications);
 59553 |     const player = state.players.find((candidate) => candidate.id === undoData.playerId);
 59554 |     if (player && undoData.previousMoveAccessGrants) {
 59555 |       player.moveAccessGrants = normalizeTeambuilderMoveAccessGrantList(
 59556 |         structuredClone(undoData.previousMoveAccessGrants),
 59557 |         { playerId: player.id }
 59558 |       );
 59559 |     }
 59560 |     const pokemonIndex = (state.pokemonRecords || []).findIndex((pokemon) => pokemon.id === undoData.pokemonId);
 59561 |     if (pokemonIndex >= 0 && undoData.previousPokemon) {
 59562 |       state.pokemonRecords[pokemonIndex] = normalizePokemonRecord(structuredClone(undoData.previousPokemon));
 59563 |     }
 59564 |     syncPlayerPokemonLists();
 59565 |   } else if (undoData.actionType === "undoDragonsDenAction") {
 59566 |     const key = actionPhaseKey(undoData.series, undoData.gym);
 59567 |     state.actionPhaseState ||= { selections: {}, seriesTrackers: {} };
 59568 |     state.actionPhaseState.selections ||= {};
 59569 |     state.actionPhaseState.selections[key] ||= { series: undoData.series, gym: undoData.gym, playerVisits: {} };
 59570 |     state.actionPhaseState.selections[key].playerVisits[undoData.playerId] = structuredClone(undoData.previousVisits || []);
 59571 |     const player = state.players.find((candidate) => candidate.id === undoData.playerId);
 59572 |     if (player) player.balance = Number(undoData.previousBalance ?? player.balance ?? 0);
 59573 |     if (undoData.previousMoneyLedger) state.moneyLedger = structuredClone(undoData.previousMoneyLedger);
 59574 |     if (undoData.previousDragonDenSessions) {
 59575 |       state.dragonsDenSessions = structuredClone(undoData.previousDragonDenSessions);
 59576 |     } else {
 59577 |       state.dragonsDenSessions = (state.dragonsDenSessions || []).filter((session) => session.id !== undoData.dragonDenSessionId);
 59578 |     }
 59579 |     if (undoData.previousPokemonRecords) {
 59580 |       state.pokemonRecords = structuredClone(undoData.previousPokemonRecords).map(normalizePokemonRecord);
 59581 |     }
 59582 |     syncPlayerPokemonLists();
 59583 |   } else if (undoData.actionType === "undoDragonsDenReturn") {
 59584 |     if (undoData.previousDragonDenSessions) state.dragonsDenSessions = structuredClone(undoData.previousDragonDenSessions);
 59585 |     if (undoData.previousPlayerNotifications) state.playerNotifications = structuredClone(undoData.previousPlayerNotifications);
 59586 |     if (undoData.previousPokemonRecords) {
 59587 |       state.pokemonRecords = structuredClone(undoData.previousPokemonRecords).map(normalizePokemonRecord);
 59588 |     }
 59589 |     syncPlayerPokemonLists();
 59590 |   } else if (undoData.actionType === "undoManualTokenAdd") {
 59591 |     const player = state.players.find((candidate) => candidate.id === undoData.playerId);
 59592 |     if (!player) return;
 59593 |     player.inventory = (player.inventory || []).filter((item) => item.id !== undoData.tokenId);
 59594 |   } else if (undoData.actionType === "undoStatusTokenActivation") {
 59595 |     restoreStatusTokenActivationUndoData(undoData);
 59596 |   } else if (undoData.actionType === "undoUtilityTokenActivation") {
 59597 |     restoreTokenEffectContractUndoData(undoData);
 59598 |   } else if (undoData.actionType === "undoTokenEffectContract") {
 59599 |     restoreTokenEffectContractUndoData(undoData);
 59600 |   } else if (undoData.actionType === "undoTokenEffectContractCausal") {
 59601 |     restoreCausalTokenEffectUndoData(undoData);
 59602 |   } else if (undoData.actionType === "undoGameCornerTokenUse") {
 59603 |     const player = state.players.find((candidate) => candidate.id === undoData.playerId);
 59604 |     if (!player) return;
 59605 |     state.gameCornerUnlocks = (state.gameCornerUnlocks || []).filter((unlock) => unlock.id !== undoData.unlockId);
 59606 |     if (undoData.token && !(player.inventory || []).some((item) => item.id === undoData.token.id)) {
 59607 |       player.inventory.unshift(structuredClone(undoData.token));
 59608 |     }
 59609 |     const session = (state.gameCornerSessions || []).find((entry) => entry.id === undoData.gameCornerSessionId);
 59610 |     if (session) session.gcTokensUsed = (session.gcTokensUsed || []).filter((used) => used.unlockId !== undoData.unlockId);
 59611 |   } else if (undoData.actionType === "undoPurchase") {
 59612 |     const player = state.players.find((candidate) => candidate.id === undoData.playerId);
 59613 |     if (!player) return;
 59614 |     player.balance = Number(undoData.balanceBefore ?? player.balance ?? 0);
 59615 |     player.inventory = structuredClone(undoData.previousInventory || []);
 59616 |     state.moneyLedger = structuredClone(undoData.previousMoneyLedger || []);
 59617 |   } else if (undoData.actionType === "undoPhaseAdvance") {
 59618 |     const previous = undoData.previousState;
 59619 |     if (!previous) return;
 59620 |     state.series = previous.series;
 59621 |     state.gym = Number(previous.gym);
 59622 |     state.currentPhase = previous.currentPhase;
 59623 |     state.phaseState = structuredClone(previous.phaseState || {});
 59624 |     state.seriesOrder = structuredClone(previous.seriesOrder || []);
 59625 |     state.seriesChoiceRequired = Boolean(previous.seriesChoiceRequired);
 59626 |     state.players.forEach((player) => {
 59627 |       if (previous.momentum?.[player.id] !== undefined) player.momentum = previous.momentum[player.id];
 59628 |       if (previous.inventories?.[player.id]) player.inventory = structuredClone(previous.inventories[player.id]);
 59629 |     });
 59630 |     if (previous.pokemonRecords) state.pokemonRecords = structuredClone(previous.pokemonRecords).map(normalizePokemonRecord);
 59631 |     if (previous.playerNotifications) state.playerNotifications = structuredClone(previous.playerNotifications);
 59632 |     if (previous.breederDeposits) state.breederDeposits = structuredClone(previous.breederDeposits);
 59633 |     if (previous.dragonsDenSessions) state.dragonsDenSessions = structuredClone(previous.dragonsDenSessions);
 59634 |     if (previous.lingeringStatuses) state.lingeringStatuses = structuredClone(previous.lingeringStatuses);
 59635 |     if (previous.globalPokemonRules) state.globalPokemonRules = structuredClone(previous.globalPokemonRules);
 59636 |     if (previous.banlistHistory) state.banlistHistory = structuredClone(previous.banlistHistory);
 59637 |     if (previous.delayedEffects) state.delayedEffects = structuredClone(previous.delayedEffects);
 59638 |     if (previous.broughtTeamSnapshots) state.broughtTeamSnapshots = structuredClone(previous.broughtTeamSnapshots);
 59639 |     if (previous.copiedActivations) state.copiedActivations = structuredClone(previous.copiedActivations);
 59640 |     if (previous.postPayoutProcedures) state.postPayoutProcedures = structuredClone(previous.postPayoutProcedures);
 59641 |     if (previous.endOfActionProcedures) state.endOfActionProcedures = structuredClone(previous.endOfActionProcedures);
 59642 |     if (previous.copiedTokenRelationships) state.copiedTokenRelationships = structuredClone(previous.copiedTokenRelationships);
 59643 |     if (previous.privateEffectRecords) state.privateEffectRecords = structuredClone(previous.privateEffectRecords);
 59644 |     if (previous.encounterCopyRecords) state.encounterCopyRecords = structuredClone(previous.encounterCopyRecords);
 59645 |     if (previous.effectOperations) state.effectOperations = structuredClone(previous.effectOperations);
 59646 |     ensureGymPhaseState(state.series, state.gym);
 59647 |   } else {
 59648 |     return;
 59649 |   }
 59650 |   entry.undone = true;
 59651 |   const repairLog = addLogEntry({
 59652 |     action: "undo",
 59653 |     category: "other",
 59654 |     player: "Activity Log",
 59655 |     item: `Undid: ${describeLogEntry(entry)}`,
 59656 |     type: undoData.actionType === "undoTokenEffectContract" ? "token-effect-repair" : "undo",
 59657 |     resolutionResult: undoData.actionType === "undoTokenEffectContract" ? "repaired" : "",
 59658 |     linkedEventId: undoData.effectId || "",
 59659 |     quantity: 1,
 59660 |     price: 0,
 59661 |     balanceAfter: 0
 59662 |   });
 59663 |   if (undoData.actionType === "undoTokenEffectContract") {
 59664 |     const tokenName = entry.tokenNames?.[0] || entry.title || "Token";
 59665 |     const repairAudit = tokenEffectAuditRecord({
 59666 |       stage: "repair",
 59667 |       draft: { tokenName },
 59668 |       metadata: tokenEffectMetadataByName(tokenName),
 59669 |       result: "repaired",
 59670 |       mutations: [`Rewound ${describeLogEntry(entry)}`],
 59671 |       persistentStateIds: [],
 59672 |       undoLogId: repairLog?.id || ""
 59673 |     });
 59674 |     repairAudit.undoStatus = "repaired";
 59675 |   }
 59676 |   syncPlayerPokemonLists();
 59677 |   saveState();
 59678 |   render();
 59679 | }
 59680 |
 59681 | function renderActivityFilters() {
 59682 |   const filters = state.activityLogFilters;
 59683 |   const currentSubtypes = [...new Set((state.log || [])
 59684 |     .filter((entry) => activityCategory(entry) === "pokemon")
 59685 |     .map(inferPokemonSubtype))]
 59686 |     .filter(Boolean)
 59687 |     .sort((a, b) => pokemonLogSubtypes.indexOf(a) - pokemonLogSubtypes.indexOf(b) || a.localeCompare(b));
 59688 |   els.activityFilters.innerHTML = `
 59689 |     <label class="activity-search">
 59690 |       Search
```

## Server state normalization — `server.js:1275-1320`

```js
  1275 |     if (!resource || !["item", "tm"].includes(draft.choiceKind)) {
  1276 |       return { ok: false, reason: "Choose the exact held Item or exact TM record for Knock Off Curse.", draft };
  1277 |     }
  1278 |     if (draft.choiceKind === "item" && tokenControlEffects.isMasterBallResource(resource)) {
  1279 |       return { ok: false, reason: "Master Ball-tier Items cannot be selected by Knock Off Curse.", draft };
  1280 |     }
  1281 |   }
  1282 |   return { ok: true, draft, targetPokemon, targetPlayer };
  1283 | }
  1284 |
  1285 | function serverTokenRollbackSnapshot(state, excludedActivityId = "") {
  1286 |   return {
  1287 |     previousPlayers: cloneJson(state.players || []),
  1288 |     previousPokemonRecords: cloneJson(state.pokemonRecords || []),
  1289 |     previousLingeringStatuses: cloneJson(state.lingeringStatuses || []),
  1290 |     previousTokenActivations: cloneJson(state.tokenActivations || []),
  1291 |     previousTokenConsumptions: cloneJson(state.tokenConsumptions || []),
  1292 |     previousPlayerNotifications: cloneJson(state.playerNotifications || []),
  1293 |     previousRandomPokemonSessions: cloneJson(state.randomPokemonSessions || []),
  1294 |     previousInteractionEvents: cloneJson((state.interactionEvents || []).filter((entry) => entry.id !== excludedActivityId)),
  1295 |     previousTransactions: cloneJson(state.transactions || []),
  1296 |     previousGlobalPokemonRules: cloneJson(state.globalPokemonRules || {}),
  1297 |     previousBanlistHistory: cloneJson(state.banlistHistory || []),
  1298 |     previousTeambuilder: cloneJson(state.teambuilder || {}),
  1299 |     previousBattleTeams: cloneJson(state.battleTeams || {}),
  1300 |     previousPerkSystem: cloneJson(state.perkSystem || {}),
  1301 |     previousClassStateByPlayerId: cloneJson(state.classStateByPlayerId || {}),
  1302 |     previousPhaseState: cloneJson(state.phaseState || {}),
  1303 |     previousEffectAuditRecords: cloneJson(state.effectAuditRecords || []),
  1304 |     previousEffectOperations: cloneJson(state.effectOperations || []),
  1305 |     previousCopiedTokenRelationships: cloneJson(state.copiedTokenRelationships || []),
  1306 |     previousPrivateEffectRecords: cloneJson(state.privateEffectRecords || []),
  1307 |     previousEncounterCopyRecords: cloneJson(state.encounterCopyRecords || [])
  1308 |   };
  1309 | }
  1310 |
  1311 | function serverNextEventOrder(state) {
  1312 |   const values = [
  1313 |     ...(state.interactionEvents || []), ...(state.tokenConsumptions || []), ...(state.log || [])
  1314 |   ].map((entry) => Number(entry?.eventOrder || 0));
  1315 |   return Math.max(0, ...values) + 1;
  1316 | }
  1317 |
  1318 | function writeAuthoritativeTimingMutation(game, body, type, activity = null) {
  1319 |   syncGameActivitiesFromState(game);
  1320 |   game.version = Number(game.version || 0) + 1;
```
