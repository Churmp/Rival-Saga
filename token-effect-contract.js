(function registerRivalSagaTokenContract(root, factory) {
  const contract = factory();
  if (typeof module === "object" && module.exports) module.exports = contract;
  if (root) root.rivalSagaTokenEffectContract = contract;
})(typeof globalThis !== "undefined" ? globalThis : this, function createRivalSagaTokenContract() {
  "use strict";

  const resolverModes = Object.freeze({
    AUTOMATIC: "automatic",
    GUIDED: "guided",
    HOST_CONFIRMED: "hostConfirmed"
  });

  const runtimeImplementationStatuses = Object.freeze({
    VERIFIED_COMPLETE: "verifiedComplete",
    PARTIAL: "partial",
    TEXT_ONLY: "textOnly",
    MISSING: "missing",
    BLOCKED_BY_RULING: "blockedByRuling"
  });

  const runtimeUsabilityStatuses = Object.freeze({
    USABLE: "usable",
    GUIDED_ONLY: "guidedOnly",
    DEVELOPMENT_ONLY: "developmentOnly",
    BLOCKED: "blocked"
  });

  const copyActivationModes = Object.freeze({
    AFTER_YOU: "afterYouImmediateActivation",
    FOLLOW_ME: "followMeOngoingActivation",
    DITTO: "dittoSelectedActivation",
    CLASS_EFFECT: "classGrantedActivation",
    TEMPORARY_INVENTORY: "temporaryInventoryCopy"
  });

  const afterYouProtectionInteractionMatrix = Object.freeze({
    "safeguard": Object.freeze({ supported: true, copiedTarget: "afterYouUser", freshChoicesRequired: false, resolvesBeforeOriginal: true, reason: "The copied Safeguard protects the After You user before the original Safeguard resolves." }),
    "immunity": Object.freeze({ supported: true, copiedTarget: "originalImmunityActivation", freshChoicesRequired: false, resolvesBeforeOriginal: true, negatesOriginal: true, reason: "The copied Immunity targets and negates the original Immunity, then its parent prompt resumes." }),
    "substitute": Object.freeze({ supported: false, reason: "Substitute is a proactive exact-Pokemon attachment without a pending activation window to copy." }),
    "follow-me": Object.freeze({ supported: false, reason: "Copying Follow Me would create a recursive redirect-and-copy relationship." }),
    "parting-shot": Object.freeze({ supported: false, reason: "The copied Team Preview swap and retaliation relationship needs its own exact team-revision contract." }),
    "embargo": Object.freeze({ supported: false, reason: "The copied Embargo user's post-resolution Token restriction is not yet defined." }),
    "after-you": Object.freeze({ supported: false, reason: "After You cannot copy another After You virtual activation." }),
    "smokescreen": Object.freeze({ supported: false, reason: "The copied wheel, corresponding target, and redirect priority are not yet defined." }),
    "counterspell": Object.freeze({ supported: false, reason: "The copied user does not own the exact negated Token record Counterspell must restore." }),
    "seven-tools": Object.freeze({ supported: false, reason: "The temporary inventory copy obligation for a virtual 7 Tools activation is not yet defined." }),
    "teleport": Object.freeze({ supported: false, reason: "Nested delayed-response ownership and the return anchor are not yet defined." }),
    "revenge": Object.freeze({ supported: false, reason: "Revenge is a post-payout procedure, not a copyable pending Protection activation." })
  });

  function afterYouProtectionInteractionFor(value) {
    const id = typeof value === "object" ? value?.id : String(value || "").trim().toLowerCase();
    return afterYouProtectionInteractionMatrix[id] || Object.freeze({ supported: false, reason: "This Protection Token has no approved After You interaction." });
  }

  function copyActivationPolicyFor(mode) {
    const common = {
      createsInventoryRecord: false,
      consumesOriginalToken: false,
      consumesCopiedTokenInventory: false,
      copiedUserPaysExplicitCostsUnlessWaived: true,
      requiresFreshTargetsAndChoicesUnlessStated: true,
      copiedActivationsCannotBeCopied: true,
      provenanceRequired: true
    };
    const policies = {
      [copyActivationModes.AFTER_YOU]: { ...common, sourceWindow: "currentDeclaredEffect", lifetime: "oneImmediateActivation" },
      [copyActivationModes.FOLLOW_ME]: { ...common, sourceWindow: "laterTokensUsedByRecordedPlayer", lifetime: "currentGymRelationship" },
      [copyActivationModes.DITTO]: { ...common, sourceWindow: "oneChosenLegalTokenDefinition", lifetime: "oneActivation", excludesTickets: true },
      [copyActivationModes.CLASS_EFFECT]: { ...common, sourceWindow: "classEffectGrant", lifetime: "grantDefined" },
      [copyActivationModes.TEMPORARY_INVENTORY]: {
        ...common,
        createsInventoryRecord: true,
        sourceWindow: "exactNegatedProtectionToken",
        lifetime: "temporaryInventoryRecord",
        copiedActivationsCannotBeCopied: true
      }
    };
    return Object.freeze(policies[mode] || { ...common, sourceWindow: "unknown", lifetime: "unknown" });
  }

  const runtimeStatusGroups = Object.freeze({
    partial: [
      "restrict-token", "arena-trap", "clear-smog", "rage-candy-bar", "extra-ban-token", "unban-token", "steal-token",
      "incinerate", "wicked-blow", "cold-wave", "move-deleter", "smokescreen", "after-you", "ditto-token", "purge-curse", "teleport", "revenge",
      "safeguard", "substitute", "seven-tools", "counterspell", "follow-me", "embargo", "reroll-token",
      "devolve-token", "honey-token", "knock-off-curse", "haze-curse", "lingering-aroma"
    ],
    textOnly: [
      "class-change", "rebrand", "parting-shot",
      "repel-token", "quick-ball-token", "dream-ball-token", "master-ball-token", "beast-ball-token", "foresight-curse"
    ],
    blockedByRuling: []
  });

  const runtimeStatusById = Object.freeze(Object.fromEntries(Object.entries(runtimeStatusGroups)
    .flatMap(([status, ids]) => ids.map((id) => [id, status]))));

  const contractDefinitionRevision = "2026-08-04-lifecycle-completion-slice-v3";
  const registeredRuntimeVerificationTests = Object.freeze([
    "token-declaration-timing",
    "token-response-parent-chain",
    "token-multi-target-validation",
    "token-reload-persistence",
    "token-sandbox-isolation",
    "token-undo-repair",
    "token-inventory-runtime",
    "standard-curse-species-lifecycle",
    "follow-me-e2e",
    "ditto-inventory-e2e",
    "lingering-aroma-e2e",
    "move-deleter-e2e",
    "knock-off-e2e",
    "revenge-post-payout-e2e",
    "control-completion-slice-e2e",
    "lifecycle-completion-slice-e2e"
  ]);
  const runtimeVerificationById = Object.freeze({
    "restrict-token": Object.freeze({
      status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
      tests: Object.freeze(["token-declaration-timing", "token-response-parent-chain", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "control-completion-slice-e2e"]),
      evidence: "Six-Gym canonical species identity, exact Rage immunity, response priority, Teambuilder and submitted-team enforcement, expiration, production refresh, causal History undo, and idempotent sandbox isolation are covered by PD-RUNTIME-013, TCS-001, BROWSER-019, TCI-003/004, and TSB-026.",
      verifiedAt: "2026-08-03",
      contractDefinitionRevision
    }),
    "extra-ban-token": Object.freeze({
      status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
      tests: Object.freeze(["token-declaration-timing", "token-response-parent-chain", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "control-completion-slice-e2e"]),
      evidence: "Exact Active-roster anchor selection, selected-only Substitute interception, universal legality, other-copy isolation, production refresh, Teambuilder/submitted-team enforcement, causal History undo, and sandbox isolation are covered by TCS-002, TCF-006/007/009, BROWSER-020, and TSB-026.",
      verifiedAt: "2026-08-03",
      contractDefinitionRevision
    }),
    "unban-token": Object.freeze({
      status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
      tests: Object.freeze(["token-declaration-timing", "token-response-parent-chain", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "control-completion-slice-e2e"]),
      evidence: "Exact stable status selection, one-record removal, stale confirmation refund, six-Gym protection, unchanged unrelated schedules, production refresh, causal restoration, and sandbox isolation are covered by TCS-003, TCI-001/002, BROWSER-021, and TSB-026.",
      verifiedAt: "2026-08-03",
      contractDefinitionRevision
    }),
    "clear-smog": Object.freeze({
      status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
      tests: Object.freeze(["token-declaration-timing", "token-response-parent-chain", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "control-completion-slice-e2e"]),
      evidence: "Provenance-only permanent removal of Rage, Ability, and exact move grants, preservation of native and expired data, rendered results, production refresh, causal History undo, and sandbox isolation are covered by TCS-004, TCF-011, TCI-006, BROWSER-022, and TSB-026.",
      verifiedAt: "2026-08-03",
      contractDefinitionRevision
    }),
    "rage-candy-bar": Object.freeze({
      status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
      tests: Object.freeze(["token-declaration-timing", "token-response-parent-chain", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "control-completion-slice-e2e"]),
      evidence: "Exact owned-instance targeting, one shared enhancement, non-stacking extension, same-species isolation, Restrict immunity, Teambuilder level/EV consumption, expiration, production refresh, ordered causal undo, and sandbox isolation are covered by TCS-001/005, TCF-012/014, BROWSER-023, and TSB-026.",
      verifiedAt: "2026-08-03",
      contractDefinitionRevision
    }),
    "safeguard": Object.freeze({
      status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
      tests: Object.freeze(["token-declaration-timing", "token-response-parent-chain", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "control-completion-slice-e2e"]),
      evidence: "Exact self-player declaration, response-enabled production lifecycle, all eight approved protection categories, explicit non-protected boundaries, exact-player scope, expiration, refresh, causal History undo, and sandbox isolation are covered by TCS-006, BROWSER-008/024, TCF-029, and TSB-026.",
      verifiedAt: "2026-08-03",
      contractDefinitionRevision
    }),
    "arena-trap": Object.freeze({
      status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
      tests: Object.freeze([
        "token-declaration-timing",
        "token-response-parent-chain",
        "token-multi-target-validation",
        "token-reload-persistence",
        "token-sandbox-isolation",
        "token-undo-repair"
      ]),
      evidence: "Exact-instance declaration, authoritative bring legality, forced team insertion, compensation, Teambuilder enforcement, result summaries, reload, undo, sandbox isolation, and Battle Results cleanup are covered by executable Unit, Integration, Browser, Result, and Sandbox tests.",
      verifiedAt: "2026-07-24",
      contractDefinitionRevision
    }),
    "incinerate": Object.freeze({
      status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
      tests: Object.freeze([
        "token-declaration-timing",
        "token-response-parent-chain",
        "token-multi-target-validation",
        "token-reload-persistence",
        "token-sandbox-isolation",
        "token-undo-repair"
      ]),
      evidence: "Catalog-backed declaration, one independently selected stable-ID Item or TM destruction per eligible rival, Master Ball exclusion, response negation, no-effect resolution, atomic fail-closed behavior, result summaries, reload, undo, browser execution, and sandbox isolation are covered by executable tests.",
      verifiedAt: "2026-07-24",
      contractDefinitionRevision
    }),
    "steal-token": Object.freeze({
      status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
      tests: Object.freeze([
        "token-declaration-timing",
        "token-response-parent-chain",
        "token-reload-persistence",
        "token-sandbox-isolation",
        "token-undo-repair"
      ]),
      evidence: "Exact-instance ownership transfer, stale team-reference removal, Sticky Hold protection, Safeguard boundary, Substitute interception, response negation, stale-target refund, result summaries, reload, undo, browser execution, and sandbox isolation are covered by executable tests.",
      verifiedAt: "2026-07-24",
      contractDefinitionRevision
    }),
    "toxic-curse": Object.freeze({
      status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
      tests: Object.freeze(["token-declaration-timing", "token-response-parent-chain", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "standard-curse-species-lifecycle"]),
      evidence: "Exact Active Roster anchor selection, species-wide Toxic Orb enforcement, independent Curse Immunity and Substitute exclusions, phase-anchored duration, exact result data, stale refund, reload, undo, browser execution, and sandbox isolation are covered by executable tests.",
      verifiedAt: "2026-07-29",
      contractDefinitionRevision
    }),
    "iron-ball-curse": Object.freeze({
      status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
      tests: Object.freeze(["token-declaration-timing", "token-response-parent-chain", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "standard-curse-species-lifecycle"]),
      evidence: "Exact Active Roster anchor selection, species-wide Iron Ball enforcement, independent Curse Immunity and Substitute exclusions, phase-anchored duration, exact result data, stale refund, reload, undo, browser execution, and sandbox isolation are covered by executable tests.",
      verifiedAt: "2026-07-29",
      contractDefinitionRevision
    }),
    "flame-curse": Object.freeze({
      status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
      tests: Object.freeze(["token-declaration-timing", "token-response-parent-chain", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "standard-curse-species-lifecycle"]),
      evidence: "Exact Active Roster anchor selection, species-wide Flame Orb enforcement, independent Curse Immunity and Substitute exclusions, phase-anchored duration, exact result data, stale refund, reload, undo, browser execution, and sandbox isolation are covered by executable tests.",
      verifiedAt: "2026-07-29",
      contractDefinitionRevision
    }),
    "silencing-curse": Object.freeze({
      status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
      tests: Object.freeze(["token-declaration-timing", "token-response-parent-chain", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "standard-curse-species-lifecycle"]),
      evidence: "Exact Active Roster anchor selection, species-wide non-destructive two-move enforcement and per-instance repair, Team Lock enforcement, protection exclusions, phase-anchored duration, reload, undo, browser execution, and sandbox isolation are covered by executable tests.",
      verifiedAt: "2026-07-29",
      contractDefinitionRevision
    }),
    "imprison-curse": Object.freeze({
      status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
      tests: Object.freeze(["token-declaration-timing", "token-response-parent-chain", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "standard-curse-species-lifecycle"]),
      evidence: "Exact Active Roster anchor selection, species-wide non-destructive neutral-Nature and zero EV/IV overrides, independent protection exclusions, phase-anchored duration, reload, undo, browser execution, and sandbox isolation are covered by executable tests.",
      verifiedAt: "2026-07-29",
      contractDefinitionRevision
    }),
    "seven-tools": Object.freeze({
      status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
      tests: Object.freeze(["token-response-parent-chain", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "token-inventory-runtime"]),
      evidence: "Exact consumed Protection identity, Safeguard Copy protection, atomic parent negation plus temporary copy creation, same-Gym availability, End-of-Gym expiration, stale fail-closed refund, refresh persistence, undo restoration, and duplicate-completion prevention are covered by focused runtime and production-browser tests.",
      verifiedAt: "2026-07-26",
      contractDefinitionRevision
    }),
    "counterspell": Object.freeze({
      status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
      tests: Object.freeze(["token-response-parent-chain", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "token-inventory-runtime"]),
      evidence: "Own-token negation qualification, exact consumed inventory restoration, explicit consumption exception, two-Gym phase-anchored cooldown, refresh persistence, phase-undo restoration, stale fail-closed refund, and duplicate prevention are covered by focused runtime and production-browser tests.",
      verifiedAt: "2026-07-26",
      contractDefinitionRevision
    }),
    "immunity": Object.freeze({
      status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
      tests: Object.freeze(["token-response-parent-chain", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair"]),
      evidence: "Exact current-prompt response priority, confirmation-time consumption, atomic parent negation, causal result summaries, refresh persistence, duplicate-resolution prevention, undo restoration, and sandbox isolation are covered by the Control, response-chain, production-browser, and sandbox suites.",
      verifiedAt: "2026-07-29",
      contractDefinitionRevision
    }),
    "follow-me": Object.freeze({
      status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
      tests: Object.freeze(["token-response-parent-chain", "token-reload-persistence", "token-undo-repair", "token-inventory-runtime", "follow-me-e2e"]),
      evidence: "BROWSER-013 and SEB-005 cover legal corresponding-target redirection, parent-gated activation, exact real-consumption inventory copies, duplicate prevention, backend refresh, Gym-end relationship expiration, and newest-first History undo.",
      verifiedAt: "2026-08-03",
      contractDefinitionRevision
    }),
    "ditto-token": Object.freeze({
      status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
      tests: Object.freeze(["token-declaration-timing", "token-reload-persistence", "token-undo-repair", "token-inventory-runtime", "ditto-inventory-e2e"]),
      evidence: "BROWSER-015 and SEB-006 cover the production non-Ditto picker, exact source-record transformation, canonical identity and provenance, no immediate activation, duplicate-safe operation identity, backend refresh, and History undo.",
      verifiedAt: "2026-08-03",
      contractDefinitionRevision
    }),
    "lingering-aroma": Object.freeze({
      status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
      tests: Object.freeze(["token-declaration-timing", "token-reload-persistence", "token-undo-repair", "lingering-aroma-e2e"]),
      evidence: "BROWSER-016, STR-004, and PD-SERVER-007 cover exact benefiting-effect selection, linked replacement and expiration, confirmed outside targeting cost paid once, withdrawal and insufficient-funds behavior, cost retention after negation, backend refresh, and ordered History undo.",
      verifiedAt: "2026-08-03",
      contractDefinitionRevision
    }),
    "move-deleter": Object.freeze({
      status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
      tests: Object.freeze(["token-declaration-timing", "token-reload-persistence", "token-undo-repair", "move-deleter-e2e"]),
      evidence: "BROWSER-017, STR-005, STR-010, and TCI-013 cover canonical declaration, next-Gym global enforcement in selection and validation, explicit Showdown import/export rejection, backend refresh, exact expiration, and History/controller undo.",
      verifiedAt: "2026-08-03",
      contractDefinitionRevision
    }),
    "knock-off-curse": Object.freeze({
      status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
      tests: Object.freeze(["token-declaration-timing", "token-reload-persistence", "token-undo-repair", "knock-off-e2e"]),
      evidence: "BROWSER-018 and SEB-003 cover the production exact Pokemon/resource selector, exact Item/TM destruction, Master Ball exclusion, duplicate-TM access, final-TM Sabotage revision creation without silent set edits, backend refresh, and History undo.",
      verifiedAt: "2026-08-03",
      contractDefinitionRevision
    }),
    "revenge": Object.freeze({
      status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
      tests: Object.freeze(["token-reload-persistence", "token-undo-repair", "revenge-post-payout-e2e"]),
      evidence: "BROWSER-012, STR-008, and STR-012 cover real Gym payout-to-offer ordering, immutable brought snapshots, no pre-confirmation consumption, exact two-Pokemon release, optional exact held Item boundaries, terminal closure, backend refresh, decline behavior, and History undo.",
      verifiedAt: "2026-08-03",
      contractDefinitionRevision
    }),
    "cold-wave": Object.freeze({
      status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
      tests: Object.freeze(["token-declaration-timing", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "lifecycle-completion-slice-e2e"]),
      evidence: "Explicit ongoing-only suppression, suppression-aware status and Follow Me consumption, duration-only exclusion, Gym-end behavior, production refresh, rendered suppressed state, causal History undo, and idempotent sandbox isolation are covered by TLS-001, TCI-014, BROWSER-025, and TSB-027.",
      verifiedAt: "2026-08-04",
      contractDefinitionRevision
    }),
    "wicked-blow": Object.freeze({
      status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
      tests: Object.freeze(["token-declaration-timing", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "lifecycle-completion-slice-e2e"]),
      evidence: "Own/rival exact Active-roster targeting, non-Active and stale rejection, stable identity, acquisition and Evolution Lock checks, exact team-reference coherence without new membership, set cleanup, refresh, causal History undo, unresolved mixed-tier branch fail-closed behavior, and sandbox isolation are covered by TLS-002, TCI-012, BROWSER-026, and TSB-022/027.",
      verifiedAt: "2026-08-04",
      contractDefinitionRevision
    }),
    "teleport": Object.freeze({
      status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
      tests: Object.freeze(["token-response-parent-chain", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "lifecycle-completion-slice-e2e"]),
      evidence: "Exact root-Control delay, matching-phase return, no-retarget revalidation, gameplay no-effect and system-failure split, duplicate-terminal prevention, refresh, merged causal History restoration of both exact Tokens, and sandbox isolation are covered by TLS-003, STR-009/011, BROWSER-011/027, and TSB-027.",
      verifiedAt: "2026-08-04",
      contractDefinitionRevision
    }),
    "purge-curse": Object.freeze({
      status: runtimeImplementationStatuses.VERIFIED_COMPLETE,
      tests: Object.freeze(["token-declaration-timing", "token-reload-persistence", "token-sandbox-isolation", "token-undo-repair", "lifecycle-completion-slice-e2e"]),
      evidence: "Non-respondable declaration, immutable exact brought-team snapshot, post-payout blocking and atomic release, exact-ID same-species isolation, later-change preservation, duplicate prevention, production refresh, causal History undo, and sandbox isolation are covered by TLS-006, STR-007/010, BROWSER-030, and TSB-027.",
      verifiedAt: "2026-08-04",
      contractDefinitionRevision
    })
  });

  const legalTimingValues = Object.freeze([
    "gymStartPreparationControl", "action", "actionOpen", "teamBuilding", "shop", "shopOpen", "postBattleControl", "responseWindow", "wheelWindow", "sabotage", "teamPreview", "battlePayout",
    "endOfActionPhaseProcedure", "endOfBattlePhaseProcedure"
  ]);
  const legalControlContextValues = Object.freeze([
    "gymStartPreparationControl", "actionOpenControl", "teamBuilding", "shop", "postBattleControl", "sabotageCurseWindow"
  ]);
  const ordinaryControlContexts = Object.freeze([
    "gymStartPreparationControl", "actionOpenControl", "teamBuilding", "shop", "postBattleControl"
  ]);
  const curseControlContexts = Object.freeze([...ordinaryControlContexts, "sabotageCurseWindow"]);
  const legacyControlTimingWindows = Object.freeze(["actionOpen", "teamBuilding", "shopOpen"]);
  const curseTimingWindows = Object.freeze([...legacyControlTimingWindows, "sabotage"]);
  const phaseBoundaryProcedureValues = Object.freeze(["endOfActionPhaseProcedure", "endOfBattlePhaseProcedure"]);
  const timingStatusValues = Object.freeze(["settled", "needsRuling"]);
  const targetTypes = Object.freeze(["none", "currentPrompt", "pokemon", "player", "team", "resource", "table", "manual"]);
  const selectedTargetTypes = Object.freeze([...targetTypes, "rosterInstance", "species", "move"]);
  const targetScopes = Object.freeze(["none", "currentPrompt", "species", "rosterInstance", "singlePlayer", "allPlayers", "singleTeam", "allTeams", "singleResource", "allMatchingResources", "tableWide", "manual"]);
  const applicationScopes = Object.freeze(["rosterInstance", "selectedRosterInstances", "submittedTeamInstances", "playerRosterInstances", "globalSpecies", "singlePlayer", "allPlayers", "tableWide", "manual"]);
  const targetControllerRelations = Object.freeze([
    "notApplicable", "anyPlayer", "self", "otherPlayer", "rival", "everyOtherPlayer", "sameController", "differentController", "needsRuling"
  ]);
  const redirectPolicyStatuses = Object.freeze(["allowed", "notAllowed", "needsRuling"]);
  const registeredResolverIds = Object.freeze([
    "hostConfirmed", "trainerClassWheel", "restrict", "utilityEffect", "wickedBlow", "statusEffect", "safeguard", "delayParent",
    "substituteAttach", "redirectParentToSelf", "teamPreviewSwap", "playerStatus", "copyParentEffect", "randomRedirect", "immunity",
    "revengeRelease", "moveBan", "knockOff", "multiStatusEffect", "purgeAfterBattle", "copyToken",
    "arenaTrap", "clearSmog", "extraBan", "counterProtection", "ongoingEffectTextReplacement", "ongoingEffectSuppression",
    "hazeCurse", "devolveCurse", "copyTokenInventory",
    "restoreNegatedTokenWithCooldown", "smokescreenRedirect"
  ]);

  const finalResults = Object.freeze({
    REJECTED: "rejected",
    WITHDRAWN: "withdrawn",
    RESOLVED: "resolved",
    NEGATED: "negated",
    BLOCKED: "blocked",
    PARTIALLY_RESOLVED: "partiallyResolved",
    RESOLVED_NO_EFFECT: "resolvedNoEffect",
    CANCELED_REFUNDED: "canceledRefunded",
    CANCELED: "canceledRefunded",
    NO_EFFECT: "resolvedNoEffect",
    DELAYED: "delayed",
    REDIRECTED: "redirected",
    REPLACED: "replaced",
    EXPIRED: "expired",
    REPAIRED: "repaired"
  });

  const phaseSets = Object.freeze({
    response: ["responseWindow"],
  });

  const unresolvedMultiGymExpiration = "Needs Ruling: exact duration counter; expires during the Start-of-Gym expiration step after its approved duration.";
  const phaseAnchoredTwoGymExpiration = "At the matching phase boundary two Gyms after activation.";

  const magicianAllowedTokenIds = Object.freeze([
    "restrict-token", "arena-trap", "clear-smog", "rage-candy-bar", "wicked-blow", "rebrand", "extra-ban-token",
    "unban-token", "steal-token", "substitute", "revenge", "toxic-curse", "iron-ball-curse", "flame-curse",
    "silencing-curse", "knock-off-curse", "haze-curse", "imprison-curse", "devolve-token", "foresight-curse"
  ]);
  const redirectNeedsRulingTokenIds = Object.freeze([]);
  const correspondingTargetMechanismTokenIds = Object.freeze([
    "arena-trap", "clear-smog", "wicked-blow", "rebrand", "extra-ban-token", "steal-token",
    "toxic-curse", "iron-ball-curse", "silencing-curse", "knock-off-curse", "haze-curse",
    "imprison-curse", "devolve-token", "foresight-curse"
  ]);
  const followMeAllowedTokenIds = correspondingTargetMechanismTokenIds;
  const smokescreenAllowedTokenIds = correspondingTargetMechanismTokenIds;

  function redirectPolicyStatus(tokenId, allowedIds) {
    if (redirectNeedsRulingTokenIds.includes(tokenId)) return "needsRuling";
    return allowedIds.includes(tokenId) ? "allowed" : "notAllowed";
  }

  function redirectPolicyReason(config, mechanism, status) {
    if (status === "allowed" && mechanism === "magician") {
      const relationshipNote = ["haze-curse", "foresight-curse"].includes(config.id)
        ? " The replacement must obey the approved controller relationship once that relationship is ruled."
        : "";
      return `One chosen target may change when a different legal corresponding target exists.${relationshipNote}`;
    }
    if (status === "allowed" && mechanism === "followMe") {
      return "The Follow Me user may become the player target only when that user satisfies the original target restrictions.";
    }
    if (status === "allowed" && mechanism === "smokescreen") {
      return "Spin once across every player. The original player result keeps the target; another player result replaces it with one legal corresponding target, or leaves it unchanged when none exists.";
    }
    if (config.id === "class-change" || config.id === "safeguard") return "The effect is self-only and has no legal alternate target.";
    if (config.id === "purge-curse") return "Purge explicitly ignores other gameplay effects and cannot be redirected.";
    if (config.id === "incinerate") return "Each opposing player contributes an independently selected resource; player/Pokemon target redirection does not apply.";
    if (config.targetType === "table" || config.targetScope === "tableWide") return "Global and table-wide effects do not have a redirectable chosen target.";
    if (config.targetType === "currentPrompt" || config.targetScope === "currentPrompt" || config.isResponse) return "Current-prompt responses are not independently redirected as targets.";
    if (config.id === "honey-token") return "The encounter record is a boundary-offer selection, not a chosen gameplay target for redirection.";
    if (config.family === "Encounter") return "This encounter modifier does not expose a legal alternate gameplay target for this mechanism.";
    if (mechanism === "followMe") return "The Follow Me user cannot become a legal corresponding target under this effect's current target contract.";
    if (mechanism === "smokescreen") return "A random player result cannot replace the selected target with a legal corresponding target under this effect's current target contract.";
    return "The effect has no different legal corresponding target for this mechanism.";
  }

  function redirectMechanismPolicy(config, mechanism, status) {
    const mayRedirect = status !== "notAllowed";
    const shared = {
      status,
      reason: redirectPolicyReason(config, mechanism, status),
      changesSelectedTargetCount: mayRedirect ? 1 : 0,
      preservesTargetType: true,
      preservesTargetControllerRelation: true,
      preservesTargetCount: true,
      preservesCosts: true,
      preservesSourcePlayer: true,
      preservesEffectText: true,
      preservesOtherSelectedTargets: true,
      requiresFreshDirectTargetPriority: mayRedirect
    };
    if (mechanism === "magician") return Object.freeze({
      ...shared,
      targetOperation: "replaceOneCorrespondingTarget",
      mechanismRule: "Replace exactly one chosen gameplay target with a different legal corresponding target.",
      requiresDifferentLegalCorrespondingTarget: true,
      legalAlternateTargetExplanation: String(config.magicianLegalAlternateTargetExplanation || "")
    });
    if (mechanism === "followMe") return Object.freeze({
      ...shared,
      targetOperation: "replaceOneCorrespondingTarget",
      mechanismRule: "The Follow Me user must be able to become the legal corresponding target.",
      requiresUserLegalCorrespondingTarget: true
    });
    return Object.freeze({
      ...shared,
      targetOperation: "replaceOneCorrespondingTarget",
      changesSelectedTargetCount: mayRedirect ? 1 : 0,
      addedTargetCount: 0,
      preservesOriginalTargets: false,
      mechanismRule: "Spin once across every player; keep the original target on the original-player result, otherwise replace it with one legal corresponding target when available.",
      requiresUserInitiallyTargeted: true,
      requiresRandomPlayerLegalCorrespondingTarget: true,
      includesEveryPlayerExactlyOnce: true,
      originalPlayerResultKeepsTarget: true,
      noLegalCorrespondingTargetHandling: "keepOriginalTarget"
    });
  }

  function redirectPolicyFor(config) {
    const magicianStatus = redirectPolicyStatus(config.id, magicianAllowedTokenIds);
    const followMeStatus = redirectPolicyStatus(config.id, followMeAllowedTokenIds);
    const smokescreenStatus = redirectPolicyStatus(config.id, smokescreenAllowedTokenIds);
    return Object.freeze({
      model: "mechanismSpecificV2",
      magician: redirectMechanismPolicy(config, "magician", magicianStatus),
      followMe: redirectMechanismPolicy(config, "followMe", followMeStatus),
      smokescreen: redirectMechanismPolicy(config, "smokescreen", smokescreenStatus)
    });
  }

  function requiredTestsFor(config, family, isResponse, maxTargets) {
    if (Array.isArray(config.requiredTests)) return config.requiredTests;
    const tests = ["Legal declaration timing", "Illegal declaration timing", "Outcome", "Reload persistence", "Newest-first undo/repair"];
    if (isResponse) {
      tests.push(
        "Requires legal parent prompt",
        "Response compatibility",
        "Priority ownership",
        "Parent pause/resume",
        "No independent target unless rules require one"
      );
    } else {
      tests.push("Declaration consumed at most once", "Pending event and response-chain behavior");
    }
    if (maxTargets > 1) {
      tests.push(
        "Exact target count",
        "Duplicate-target rejection",
        "Ownership/controller relationship",
        "Full revalidation at resolution"
      );
    }
    return tests;
  }

  function sentence(value) {
    const text = String(value || "").trim();
    return text && !/[.!?]$/.test(text) ? `${text}.` : text;
  }

  function defineToken(config) {
    const family = config.family || "Control";
    const isResponse = Boolean(config.isResponse);
    const resolverMode = config.resolverMode || resolverModes.HOST_CONFIRMED;
    const rulesText = sentence(config.rulesText);
    const singularScopes = ["species", "rosterInstance", "singlePlayer", "singleTeam", "singleResource"];
    const defaultTargetCount = singularScopes.includes(config.targetScope) ? 1 : 0;
    const minTargets = config.minTargets ?? defaultTargetCount;
    const maxTargets = config.maxTargets ?? defaultTargetCount;
    const runtimeVerification = runtimeVerificationById[config.id] || null;
    const runtimeImplementationStatus = runtimeVerification?.status === runtimeImplementationStatuses.VERIFIED_COMPLETE
      ? runtimeImplementationStatuses.VERIFIED_COMPLETE
      : runtimeStatusById[config.id] || runtimeImplementationStatuses.MISSING;
    const runtimeUsability = config.runtimeUsability
      || (runtimeImplementationStatus === runtimeImplementationStatuses.BLOCKED_BY_RULING
        || runtimeImplementationStatus === runtimeImplementationStatuses.MISSING
        ? runtimeUsabilityStatuses.BLOCKED
        : runtimeImplementationStatus === runtimeImplementationStatuses.TEXT_ONLY
          ? runtimeUsabilityStatuses.GUIDED_ONLY
          : runtimeUsabilityStatuses.USABLE);
    const usesControlTiming = config.usesControlTiming !== undefined ? Boolean(config.usesControlTiming) : family === "Control" || family === "Curse";
    const legalPhases = config.legalPhases ?? [];
    const timingWindows = config.timingWindows ?? (usesControlTiming ? legacyControlTimingWindows : legalPhases);
    const legalControlContexts = config.legalControlContexts ?? (usesControlTiming ? ordinaryControlContexts : []);
    const timingPermissions = Object.freeze({ ...(config.timingPermissions || {}) });
    const phaseBoundaryProcedure = config.phaseBoundaryProcedure || "";
    const selfOnly = Boolean(config.selfOnly);
    const otherPlayerOnly = Boolean(config.otherPlayerOnly);
    const excludeActor = Boolean(config.excludeActor);
    const sameControllerRequired = Boolean(config.sameControllerRequired);
    const differentControllerRequired = Boolean(config.differentControllerRequired);
    const chosenTargetScopes = ["species", "rosterInstance", "singlePlayer", "singleTeam", "singleResource"];
    const needsControllerRuling = ["Control", "Curse"].includes(family) && chosenTargetScopes.includes(config.targetScope);
    const targetControllerRelation = config.targetControllerRelation
      || (selfOnly ? "self" : otherPlayerOnly ? "otherPlayer" : needsControllerRuling ? "needsRuling" : "notApplicable");
    const redirectPolicy = redirectPolicyFor({ ...config, family, isResponse, targetControllerRelation });
    const rawAliases = [config.name, ...(config.aliases || [])];
    const normalizedAliasCounts = rawAliases.reduce((counts, alias) => {
      const key = String(alias || "").trim().toLowerCase();
      if (key) counts.set(key, (counts.get(key) || 0) + 1);
      return counts;
    }, new Map());
    return Object.freeze({
      sourceType: "token",
      id: config.id,
      canonicalId: config.id,
      name: config.name,
      aliases: [...new Set(rawAliases)],
      duplicateAliases: rawAliases.filter((alias) => normalizedAliasCounts.get(String(alias || "").trim().toLowerCase()) > 1),
      family,
      rulesText,
      timingCategory: config.timingCategory || family.toLowerCase(),
      legalPhases,
      timingWindows,
      administrativeOverride: config.administrativeOverride !== false,
      timingModel: phaseBoundaryProcedure ? "phaseBoundaryProcedure" : usesControlTiming ? "controlWindow" : "explicitWindow",
      phaseBoundaryProcedure,
      explicitPhaseTiming: config.explicitPhaseTiming || "",
      timingStatus: config.timingStatus || "settled",
      candidateTiming: config.candidateTiming || "",
      controlWindowRequired: config.controlWindowRequired !== undefined ? Boolean(config.controlWindowRequired) : usesControlTiming,
      legalControlContexts,
      timingPermissions,
      runtimeTimingProjection: usesControlTiming ? "legacyControlWindowProjection" : "canonicalExplicitTiming",
      controlTimingBoundary: usesControlTiming
        ? { opensWhen: "The gameplay controller reports ordinary Control Timing open", contexts: legalControlContexts }
        : null,
      activationPattern: config.activationPattern || (isResponse ? "response" : "proactive"),
      activationType: config.activationType || (isResponse ? "Response" : "Declaration"),
      usesControlTiming,
      isResponse,
      createsPendingEvent: config.createsPendingEvent !== undefined ? Boolean(config.createsPendingEvent) : !isResponse && ["Control", "Curse"].includes(family),
      opensResponseWindow: config.opensResponseWindow !== undefined ? Boolean(config.opensResponseWindow) : !isResponse && ["Control", "Curse"].includes(family),
      canOpenPendingEvent: config.canOpenPendingEvent !== undefined ? Boolean(config.canOpenPendingEvent) : !isResponse && ["Control", "Curse"].includes(family),
      canBeRespondedTo: config.canBeRespondedTo !== undefined ? Boolean(config.canBeRespondedTo)
        : config.opensResponseWindow !== undefined ? Boolean(config.opensResponseWindow)
          : !isResponse && ["Control", "Curse"].includes(family),
      requiresPendingEvent: config.requiresPendingEvent !== undefined ? Boolean(config.requiresPendingEvent) : isResponse,
      specialPriority: config.specialPriority || "Normal table priority",
      canRespondTo: config.canRespondTo || [],
      protectionScope: config.protectionScope || [],
      requiredChoices: config.requiredChoices || [],
      targetType: config.targetType || "manual",
      targetScope: config.targetScope || "manual",
      selectedTargetType: config.selectedTargetType || config.targetType || "manual",
      selectedTargetRecordFields: config.selectedTargetRecordFields || [],
      applicationScope: config.applicationScope || ({
        species: "globalSpecies",
        rosterInstance: "rosterInstance",
        singleTeam: "submittedTeamInstances",
        singlePlayer: "singlePlayer",
        allPlayers: "allPlayers",
        tableWide: "tableWide"
      }[config.targetScope] || "manual"),
      affectedEntityType: config.affectedEntityType || config.targetType || "manual",
      substituteInterceptionPolicy: config.substituteInterceptionPolicy || "",
      substituteChecksSelectedTargetOnly: Boolean(config.substituteChecksSelectedTargetOnly),
      targetScopeStatus: config.targetScopeStatus || "settled",
      minTargets,
      maxTargets,
      targetCollectionType: config.targetCollectionType || (maxTargets > 1 ? "validatedCollection" : maxTargets === 1 ? "singleTarget" : "none"),
      targetValidation: config.targetValidation || "The chosen target must still exist and remain legal for this effect.",
      targetControllerRelation,
      selfOnly,
      otherPlayerOnly,
      excludeActor,
      sameControllerRequired,
      differentControllerRequired,
      redirectPolicy,
      effectTags: config.effectTags || [],
      visibility: config.visibility || "public",
      effectClassification: config.effectClassification || "effect",
      isOngoingEffect: config.isOngoingEffect === true,
      copyActivationMode: config.copyActivationMode || "",
      copyActivationPolicy: config.copyActivationMode ? copyActivationPolicyFor(config.copyActivationMode) : null,
      removableBy: config.removableBy || [],
      mechanicContract: Object.freeze({ ...(config.mechanicContract || {}) }),
      revalidateOnResolution: config.revalidateOnResolution !== false,
      declarationCost: config.declarationCost ?? "Consume 1 Token",
      consumptionMode: config.consumptionMode || "consumeOnUse",
      consumptionTiming: config.consumptionTiming || "Declaration confirmation",
      consumesOnLegalUse: config.consumesOnLegalUse !== undefined ? Boolean(config.consumesOnLegalUse) : true,
      consumeIfMisses: config.consumeIfMisses !== undefined ? Boolean(config.consumeIfMisses) : true,
      consumeIfBlocked: config.consumeIfBlocked !== undefined ? Boolean(config.consumeIfBlocked) : true,
      otherDeclarationCosts: config.otherDeclarationCosts || [],
      declarationAnnouncement: config.declarationAnnouncement || "{actor} used {token}{targetClause}.",
      resolverMode,
      intendedResolutionMode: resolverMode,
      resolverId: config.resolverId || "hostConfirmed",
      automaticMutations: config.automaticMutations || [],
      guidedTask: config.guidedTask || null,
      hostTask: config.hostTask || (resolverMode === resolverModes.HOST_CONFIRMED ? {
        instruction: `Complete ${config.name}'s rules at the table.`,
        responsible: "Host",
        websiteRecords: "The confirmed outcome and audit trail.",
        confirmationLabel: "Confirm Completed"
      } : null),
      successConditions: config.successConditions || ["The declaration remains legal when its prompt resolves."],
      failureConditions: config.failureConditions || ["The effect is negated, canceled, or its target is no longer legal."],
      parentInteraction: config.parentInteraction || (isResponse ? "Resolve this response, then return to the paused parent prompt." : "Close this effect after its response chain resolves."),
      persistence: config.persistence || "instant",
      duration: config.duration || "Instant",
      expirationPoint: config.expirationPoint || "After resolution",
      replacementRules: config.replacementRules || "None",
      stackingRules: config.stackingRules || "Does not stack unless the rules text says otherwise.",
      eligibleRecordType: config.eligibleRecordType || "",
      eligibleRecordWindow: config.eligibleRecordWindow || "",
      selectionCount: config.selectionCount ?? 0,
      copiedPayloadStatus: config.copiedPayloadStatus || "notApplicable",
      stateClassification: config.stateClassification || (config.persistence === "instant" || !config.persistence ? "Immediate" : "Lingering"),
      outcomeTemplate: config.outcomeTemplate || "{token} {result}.",
      auditFields: ["declaration", "consumption", "responses", "passes", "selectedTarget", "selectedRosterInstanceId", "selectedSpeciesId", "applicationScope", "affectedEntities", "excludedEntities", "resolverMode", "result", "mutations", "relationships", "undo"],
      undoPayload: config.undoPayload || ["players", "pokemonRecords", "lingeringStatuses", "tokenActivations", "interactionEvents"],
      runtimeImplementationStatus,
      runtimeUsability,
      runtimeUsabilityReason: String(config.runtimeUsabilityReason || (runtimeUsability === runtimeUsabilityStatuses.BLOCKED
        ? `${config.name} is unavailable because its complete legal resolution is not implemented.`
        : runtimeUsability === runtimeUsabilityStatuses.DEVELOPMENT_ONLY
          ? `${config.name} is available only to isolated development tests and cannot be activated through gameplay controls.`
          : runtimeUsability === runtimeUsabilityStatuses.GUIDED_ONLY
            ? `${config.name} requires its Guided resolution flow.`
            : "This Token may be declared through its current runtime flow.")),
      runtimeEvidence: runtimeImplementationStatus === runtimeImplementationStatuses.VERIFIED_COMPLETE
        ? runtimeVerification.evidence
        : runtimeImplementationStatus === runtimeImplementationStatuses.PARTIAL
        ? "A runtime path records or applies part of the declared effect; complete Saga behavior has not been verified end to end."
        : runtimeImplementationStatus === runtimeImplementationStatuses.TEXT_ONLY
          ? "The current Guided or host surface records an entered result, but the declared gameplay mutation is not implemented end to end."
          : runtimeImplementationStatus === runtimeImplementationStatuses.BLOCKED_BY_RULING
            ? "Complete runtime behavior is blocked by an unresolved Saga ruling identified in the canonical Token rules."
            : "No verified runtime implementation evidence is registered.",
      lastVerifiedTest: runtimeImplementationStatus === runtimeImplementationStatuses.VERIFIED_COMPLETE
        ? runtimeVerification.tests.join(", ")
        : "Not end-to-end verified",
      runtimeVerification,
      contractDefinitionRevision,
      requiredTests: requiredTestsFor(config, family, isResponse, maxTargets)
    });
  }

  const control = (config) => defineToken({ family: "Control", timingCategory: "control", usesControlTiming: true, controlWindowRequired: true, legalControlContexts: ordinaryControlContexts, ...config });
  const curse = (config) => defineToken({
    family: "Curse",
    timingCategory: "curse",
    usesControlTiming: true,
    controlWindowRequired: true,
    legalControlContexts: curseControlContexts,
    timingWindows: curseTimingWindows,
    timingPermissions: { sabotageCurseWindow: true },
    ...config
  });
  const protection = (config) => defineToken({ family: "Protection", timingCategory: "protection", legalPhases: phaseSets.response, isResponse: true, ...config });
  const encounter = (config) => defineToken({ family: "Encounter", timingCategory: "encounter", ...config });

  const definitions = [
    control({ id: "class-change", name: "Class Change", rulesText: "Roll the Trainer Class Wheel for yourself and take the new class", targetType: "player", targetScope: "singlePlayer", targetControllerRelation: "self", selfOnly: true, resolverMode: resolverModes.GUIDED, resolverId: "trainerClassWheel", requiredChoices: ["Wheel result"], guidedTask: { instruction: "Spin the Trainer Class Wheel for the acting player.", responsible: "Acting player", resultLabel: "New Trainer Class", placeholder: "Record the class rolled", confirmationLabel: "Apply Class Result" } }),
    control({ id: "restrict-token", name: "Restrict", aliases: ["Restrict Token"], rulesText: "Prevent a Pokemon from being brought for 6 gyms", targetType: "pokemon", targetScope: "species", selectedTargetType: "pokemon", applicationScope: "globalSpecies", affectedEntityType: "pokemon", resolverMode: resolverModes.AUTOMATIC, resolverId: "restrict", persistence: "lingeringEffect", duration: "6 Gyms", expirationPoint: "At the approved start-of-Gym expiration checkpoint after 6 Gyms.", automaticMutations: ["Create species-wide Restrict status", "Preserve exact roster-instance Rage exemptions", "Update all authoritative Pokemon legality surfaces", "Schedule one expiration"], outcomeTemplate: "{target} is Restricted for 6 Gyms.", mechanicContract: { speciesWideRestriction: true, durationGyms: 6, rageCandyImmunityExactInstanceOnly: true, authoritativeTeamLegalityRequired: true, canonicalSpeciesNormalizationRequired: true, causalHistoryUndoRequired: true } }),
    control({ id: "arena-trap", name: "Arena Trap", rulesText: "Force a rival party Pokemon to be brought this Battle Phase. The trapped Pokemon cannot be cursed", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", targetControllerRelation: "rival", otherPlayerOnly: true, excludeActor: true, differentControllerRequired: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "arenaTrap", persistence: "lingeringEffect", duration: "Current Battle Phase", expirationPoint: "At the end of the current Battle Phase after applicable End-of-Battle procedures complete.", automaticMutations: ["Validate the exact Active-roster target with authoritative Teambuilder bring legality", "Immediately insert and lock the exact instance in the target player's Battle Phase team with its minimum Badge assignment", "Create mandatory team repair if insertion exceeds team size", "Prevent Curse targeting while active", "When at least two ordered Battle Tier steps below the Natural Battle Tier, require the target owner to choose one AAA-approved Ability or injectable move", "Expire the linked team lock, protection, and customization at Battle Results"], mechanicContract: { exactRosterInstanceRequired: true, targetEligibilityUsesAuthoritativeBringLegality: true, compensationThresholdIsIndependentOfEligibility: true, compensationThresholdOrderedTierStepsBelow: 2, eliteTiersCountAsSteps: true, compensationChoiceOwner: "targetPlayer", customizationKinds: ["ability", "move"], customizationUsesSharedInjectionRegistry: true, immediatelyMutatesCurrentBattleTeam: true, forcedMemberCannotBeRemovedOrReplaced: true, forcedSlotPreservesMinimumBadgeAssignment: true, unresolvedCompensationBlocksTeamLock: true, fullTeamCreatesMandatoryRepair: true, sameSpeciesDoesNotSatisfyRequirement: true, curseProtectionUsesExactInstance: true } }),
    control({ id: "cold-wave", name: "Cold Wave", rulesText: "When Activated, Suppress All Ongoing Activated Effects Until The End Of This Gym. Suppressed Effects Have No Effect Until This Gym Ends, Then Return To Normal", targetType: "table", targetScope: "tableWide", applicationScope: "tableWide", affectedEntityType: "ongoingEffect", resolverMode: resolverModes.AUTOMATIC, resolverId: "ongoingEffectSuppression", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Cold Wave creates a same-Gym suppression record. Runtime effect checks ignore only records explicitly marked isOngoingEffect while preserving their state and expiration.", requiredChoices: [], persistence: "lingeringEffect", duration: "Until the end of this Gym", expirationPoint: "End of Gym after naturally expired effects remain expired.", effectTags: ["Suppress"], mechanicContract: { applicationScope: "tableWide", eligibleClassificationField: "isOngoingEffect", eligibleClassificationValue: true, operation: "suppressBehaviorWithoutRemovingRecord", preservesOwnerSourceDurationExpirationIdentity: true, restoreSurvivingEffectsAtGymEnd: true, reviveNaturallyExpiredEffects: false } }),
    control({ id: "clear-smog", name: "Clear Smog", rulesText: "Remove permanent buffs from a chosen Pokemon, including levels, illegal abilities, and illegal moves", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "clearSmog", automaticMutations: ["Remove clearable structured buffs from the selected Pokemon", "Remove only labels proven to represent those removed buffs", "Revoke exact-instance move-access grants"], mechanicContract: { activeRosterRequired: true, provenanceRequired: true, destructiveSetDifferenceForbidden: true, causalHistoryUndoRequired: true } }),
    control({ id: "rage-candy-bar", name: "Rage Candy Bar", rulesText: "Give one of your Pokemon +3 levels, +252 EV cap, and Restrict immunity for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", targetControllerRelation: "self", selfOnly: true, magicianLegalAlternateTargetExplanation: "Magician may change the target only to a different Pokemon owned by the same acting player.", resolverMode: resolverModes.AUTOMATIC, resolverId: "utilityEffect", persistence: "lingeringEffect", duration: "2 Gyms; another use extends the shared duration by 2 Gyms", expirationPoint: unresolvedMultiGymExpiration, replacementRules: "Another Rage Candy Bar on the same roster instance extends the one composite enhancement by 2 Gyms.", stackingRules: "The +3 Levels and +252 EV-cap bonuses do not stack.", automaticMutations: ["Create or extend one timed Rage Candy enhancement", "Grant +3 Levels", "Grant EV Cap +252", "Grant Restrict immunity", "Remove all remaining components when the shared duration expires"] }),
    control({ id: "lingering-aroma", name: "Lingering Aroma", rulesText: "When A Player Has An Ongoing Effect In Play, Use This Token. Replace That Effect's Text With 'Players Who Target Me Gain 500' Until That Effect Ends", targetType: "resource", targetScope: "singleResource", targetScopeStatus: "settled", targetControllerRelation: "anyPlayer", targetCollectionType: "activeOngoingEffectRecord", targetValidation: "The selected active record must explicitly have isOngoingEffect set to true.", resolverMode: resolverModes.AUTOMATIC, resolverId: "ongoingEffectTextReplacement", runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Lingering Aroma is blocked before consumption until the rules identify who 'me' means and which player pays and receives the $500 when the replacement trigger occurs.", requiredChoices: ["One active record explicitly classified as an ongoing effect"], persistence: "linkedEffectTextReplacement", duration: "For the remainder of the selected effect", expirationPoint: "Automatically when the selected original effect ends.", effectTags: ["Replace Text"], mechanicContract: { eligibilityStatus: "settled", eligibleClassificationField: "isOngoingEffect", eligibleClassificationValue: true, replacementText: "Players Who Target Me Gain 500", replacementTriggerStatus: "needsRuling", meIdentityStatus: "needsRuling", payerStatus: "needsRuling", recipientStatus: "needsRuling", removeOriginalEffect: false, preserveOriginalText: true, preserveSourceOwnerDurationExpirationIdentity: true, relationshipPersistsForDisplayReloadUndo: true, expiresWithOriginalEffect: true, durationAloneDoesNotImplyEligibility: true } }),
    control({ id: "wicked-blow", name: "Wicked Blow", rulesText: "Choose A Pokemon On A Player's Team. Reroll It For A Random Pokemon 3 Battle Tiers Below Its Final Evolution Tier.", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "rosterInstance", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "wickedBlow", effectTags: ["Reroll"], automaticMutations: ["Validate one exact Pokemon in any player's Active Roster", "Determine the target's final-evolution Battle Tier", "Roll from the exact Battle Tier three ordered tier steps below", "Replace the Pokemon while preserving its stable roster-instance identity", "Reset species-specific Teambuilder fields through the canonical slot replacement path", "Update any current team, locked-team, and Teambuilder references to that exact instance atomically"], mechanicContract: { exactRosterInstanceRequired: true, activeRosterRequired: true, currentBattlePhaseTeamRequired: false, sourcePlayerMayTargetOwnPokemon: true, sourcePlayerMayTargetAnotherPlayersPokemon: true, orderedBattleTierStepsBelow: 3, eliteTiersCountAsSteps: true, finalEvolutionTierRequired: true, stablePokemonIdRequired: true, acquisitionRulesApplyToReplacement: true, speciesSpecificTeamBuildFieldsReset: true, exactInstanceStatusesRemainAttached: true, existingTeamReferencesRemainCoherent: true, doesNotCreateTeamMembership: true, atomicMutationRequired: true } }),
    control({ id: "rebrand", name: "Rebrand", aliases: ["Rebrand Token"], rulesText: "Force a rival to roll the Trainer Class Wheel and change class. Trainer Class abilities cannot respond", targetType: "player", targetScope: "singlePlayer", targetControllerRelation: "otherPlayer", otherPlayerOnly: true, excludeActor: true, resolverMode: resolverModes.GUIDED, resolverId: "trainerClassWheel", requiredChoices: ["Target player", "Wheel result"], guidedTask: { instruction: "Spin the Trainer Class Wheel for the targeted player.", responsible: "Target player", resultLabel: "New Trainer Class", placeholder: "Record the class rolled", confirmationLabel: "Apply Class Result" } }),
    control({ id: "extra-ban-token", name: "Extra Ban", aliases: ["Extra Ban Token", "Ban Token"], rulesText: "Ban any Pokemon from play", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", selectedTargetRecordFields: ["selectedRosterInstanceId", "selectedSpeciesId"], applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", substituteInterceptionPolicy: "negateEntireEffect", substituteChecksSelectedTargetOnly: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "extraBan", persistence: "lingeringEffect", duration: "Indefinite", expirationPoint: "Removed by Unban or a rules reset", automaticMutations: ["Retain the selected Active-roster instance declaration anchor", "Check Substitute only on that selected instance", "Create species-wide Ban status if not intercepted", "Update global Pokemon legality"], mechanicContract: { activeRosterRequired: true, exactSelectedAnchorRequired: true, selectedAnchorSubstituteOnly: true, causalHistoryUndoRequired: true } }),
    control({ id: "unban-token", name: "Unban", aliases: ["Unban Token"], rulesText: "Unban a Pokemon. It cannot be banned again for 6 gyms", targetType: "pokemon", targetScope: "species", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "6 Gyms", expirationPoint: unresolvedMultiGymExpiration, automaticMutations: ["Remove active Ban or Restrict", "Create Unban protection", "Update global Pokemon legality"] }),
    control({ id: "incinerate", name: "Incinerate", rulesText: "Choose one Item or TM from every other player except Masterball items and remove it from their bag", targetType: "resource", targetScope: "allMatchingResources", selectedTargetType: "resource", applicationScope: "allPlayers", affectedEntityType: "resource", targetControllerRelation: "everyOtherPlayer", excludeActor: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "utilityEffect", requiredChoices: ["One exact legal Item or TM record from each other player who has one"], effectTags: ["Destroy"], automaticMutations: ["Validate one stable-ID non-Master-Ball Item or TM selection for each eligible opposing player", "Skip opposing players who have no legal target", "Atomically destroy every exact selected inventory record", "Record each destruction as a stable-ID effect operation"], mechanicContract: { resourceCategories: ["Item", "TM"], independentSelectionPerOtherPlayer: true, differentSelectionsAllowed: true, oneSelectedRecordPerEligibleOpponent: true, playersWithoutLegalTargetsAreSkipped: true, excludesSourcePlayer: true, excludesMasterBallItems: true, stableInventoryIdsRequired: true, emptyMatchResolvesNoEffect: true, atomicMutationRequired: true } }),
    control({ id: "steal-token", name: "Steal", rulesText: "Steal a Pokemon from another player", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "rosterInstance", affectedEntityType: "pokemon", targetControllerRelation: "differentController", otherPlayerOnly: true, excludeActor: true, differentControllerRequired: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "utilityEffect", effectTags: ["Steal"], automaticMutations: ["Transfer the exact selected Pokemon record to the acting player's Active roster", "Remove stale current-team references owned by the previous player", "Record the transfer as a stable-ID ownership operation"], mechanicContract: { exactRosterInstanceRequired: true, transfersToActingPlayerActiveRoster: true, formalStealTagRequired: true, stickyHoldBlocksAllPokemonSteal: true, safeguardDoesNotProtectPokemon: true, substituteMayProtectSelectedInstance: true, stablePokemonIdRequired: true, atomicMutationRequired: true } }),

    protection({ id: "safeguard", name: "Safeguard", rulesText: "Your Money And Tokens Cannot Be Stolen, Destroyed, Or Copied. You Are Unaffected By Follow Me And Embargo.", isResponse: false, usesControlTiming: true, controlWindowRequired: true, legalControlContexts: ordinaryControlContexts, activationPattern: "proactive", activationType: "Declaration", requiresPendingEvent: false, targetType: "player", targetScope: "singlePlayer", targetControllerRelation: "self", selfOnly: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "safeguard", createsPendingEvent: true, opensResponseWindow: true, canBeRespondedTo: true, persistence: "lingeringEffect", duration: "Until Gym end", expirationPoint: "At the approved End-of-Gym expiration checkpoint.", protectionScope: ["moneySteal", "moneyDestroy", "moneyCopy", "tokenSteal", "tokenDestroy", "tokenCopy", "followMe", "embargo"], automaticMutations: ["Create exact-player Safeguard protection", "Block only canonical Safeguard operation categories"], mechanicContract: { exactPlayerScopeRequired: true, categoryMatrixRequired: true, protectedCategories: ["moneySteal", "moneyDestroy", "moneyCopy", "tokenSteal", "tokenDestroy", "tokenCopy", "followMe", "embargo"], explicitNonProtectedCategories: ["itemSteal", "itemDestroy", "tmSteal", "tmDestroy", "pokemonSteal", "forcedPayment", "counterspellRestoration"] } }),
    protection({ id: "teleport", name: "Teleport", rulesText: "Delay an effect until the start of the next matching phase during the next gym", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "delayParent", canRespondTo: ["delayableEffect"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Teleport is production-usable for exact declared Token events handled by the Control controller. Unsupported or nested response effects are hidden and fail before consumption.", requiredChoices: [], parentInteraction: "Close the parent as delayed and preserve one authoritative delayed-effect record. At the next Gym's matching phase, revalidate without retargeting and resolve using the actual resolution phase anchor.", persistence: "delayedEffectRecord", duration: "Until the start of the next matching phase during the next Gym", expirationPoint: "Terminal after resolution, gameplay-illegal no-effect, or system-failure cancellation and refund.", mechanicContract: { nextGymSamePhaseRequired: true, declarationPhaseAnchorPreserved: true, resolutionDurationAnchorsToActualResolutionPhase: true, revalidateAtReturn: true, gameplayIllegalityResult: "resolvedNoEffect", gameplayIllegalityConsumesTeleportAndParent: true, gameplayIllegalityRetargets: false, gameplayIllegalityRefunds: false, systemCorruptUnsupportedResult: "canceledRefunded", duplicateResolutionForbidden: true, refreshPersistenceRequired: true, supportedProductionParents: "exact declared Token events handled by the Control controller", unsupportedParentsFailBeforeConsumption: true } }),
    protection({ id: "substitute", name: "Substitute", rulesText: "Choose a Pokemon to protect from one effect. If it would be banned, it is not banned and cannot be banned again during this phase", isResponse: false, legalPhases: ["action", "teamBuilding"], timingWindows: ["action", "teamBuilding"], activationPattern: "proactive", requiresPendingEvent: false, targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "pokemon", applicationScope: "rosterInstance", affectedEntityType: "pokemon", targetControllerRelation: "self", selfOnly: true, magicianLegalAlternateTargetExplanation: "Magician may change the target only to another Pokemon owned by the Substitute user.", resolverMode: resolverModes.AUTOMATIC, resolverId: "substituteAttach", createsPendingEvent: false, opensResponseWindow: false, persistence: "lingeringEffect", duration: "Until used or Gym end", expirationPoint: "When its one-use protection is spent or at the approved End-of-Gym expiration checkpoint, whichever occurs first.", automaticMutations: ["Attach one-use Substitute protection to the selected roster instance", "Intercept after responses and before parent mutation", "Normally exempt only that roster instance", "Negate an entire species-wide Ban and create current-phase Ban protection"] }),
    protection({ id: "follow-me", name: "Follow Me", rulesText: "When Another Player Or Another Player's Pokemon Is Targeted By An Effect, Change The Target To You Or One Of Your Legal Pokemon Instead. The New Target Must Be A Legal Target For The Original Effect. After This Effect Resolves, For The Rest Of This Gym, Copy Each Token Used By The Player Whose Effect You Redirected. Follow Me Cannot Redirect Global Effects Or Effects That Do Not Target A Player Or Pokemon", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "redirectParentToSelf", copyActivationMode: copyActivationModes.FOLLOW_ME, canRespondTo: ["singlePlayerTarget", "rosterInstanceTarget"], parentInteraction: "Replace one corresponding target with the Follow Me user or one of that user's legal Pokemon, preserve unaffected targets, then after the redirected parent resolves create the Gym-long Copy relationship.", persistence: "lingeringEffect", duration: "Through the current Gym after the redirected parent resolves", expirationPoint: "End of Gym", effectTags: ["Redirect", "Copy"], runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Follow Me is unavailable because its Gym-long Copy relationship is not implemented and the mandatory/optional plus relative-resolution order of each later copied activation is not settled. No target is redirected and the Token is not consumed.", automaticMutations: ["Replace one corresponding parent target", "Preserve source, cost, text, target type, target count, and unaffected targets", "Record the redirected effect's source player", "Create a Gym-long ongoing Copy relationship after parent resolution"], mechanicContract: { initialRedirectOperation: "replaceOneCorrespondingTarget", requiresLegalCorrespondingTarget: true, excludesGlobalAndTargetlessEffects: true, preserveSourceCostTextTargetTypeTargetCountAndUnaffectedTargets: true, ongoingEffectBeginsAfterRedirectedParentResolves: true, ongoingEffectDuration: "currentGym", copyEachLaterTokenUsedByRecordedPlayer: true, copiedActivationChoiceRequirement: "needsRuling", copiedActivationRelativeOrder: "needsRuling", copySemanticsStatus: "settled" } }),
    protection({ id: "parting-shot", name: "Parting Shot", rulesText: "During Team Preview, switch a previewed Pokemon for another party Pokemon. Cursed-swap retaliation is tracked manually", isResponse: false, legalPhases: ["teamPreview"], timingWindows: ["teamPreview"], activationPattern: "phaseSpecific", activationType: "Team Preview declaration", requiresPendingEvent: false, createsPendingEvent: true, opensResponseWindow: true, targetType: "team", targetScope: "singleTeam", resolverMode: resolverModes.GUIDED, resolverId: "teamPreviewSwap", requiredChoices: ["Pokemon out", "Pokemon in"], guidedTask: { instruction: "Choose the revealed Pokemon leaving and the legal party Pokemon replacing it.", responsible: "Affected player", resultLabel: "Completed Swap", placeholder: "Abra out; Grovyle in", confirmationLabel: "Apply Team Swap" } }),
    protection({ id: "embargo", name: "Embargo", rulesText: "Target player can only use one more Token this gym. You cannot use another Token after this resolves", targetType: "player", targetScope: "singlePlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "playerStatus", persistence: "lingeringEffect", duration: "Until Gym end", expirationPoint: "At the approved End-of-Gym expiration checkpoint.", automaticMutations: ["Limit target to one more Token", "Prevent the acting player from using another Token this Gym"] }),
    protection({ id: "after-you", name: "After You", rulesText: "After a player declares an effect, copy and use it", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "copyParentEffect", copyActivationMode: copyActivationModes.AFTER_YOU, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "After You is unavailable because its fresh target/choice and explicit-cost controller is not implemented, and the copyable effect-source classes plus relative chain order are not settled.", requiredChoices: ["Copied effect target and choices"], guidedTask: { instruction: "Copy the parent effect, then enter fresh legal targets, choices, and any explicit costs required by that effect.", responsible: "Responding player", resultLabel: "Copied Effect Result", placeholder: "Describe target, choices, costs, and result", confirmationLabel: "Resolve Copied Effect" }, mechanicContract: { copyableSourceTypes: "needsRuling", copiedActivationRelativeOrder: "needsRuling" } }),
    protection({ id: "smokescreen", name: "Smokescreen", rulesText: "When You Or Your Pokemon Are Targetted For An Effect, Spin A Wheel With All Players. The Result Is The New Target Of That Effect. If Pokemon Are Targetted When This Is Used, Choose A Legal Target From That Player Landed On. Your Original Target Remains The Same", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.GUIDED, resolverId: "smokescreenRedirect", canRespondTo: ["singlePlayerTarget", "rosterInstanceTarget"], requiredChoices: ["Wheel result player", "One legal corresponding Pokemon when the parent targets Pokemon and the result changes player"], guidedTask: { instruction: "Spin once with every player represented exactly once. Keep the original target when its player wins or when another winning player has no legal corresponding target; otherwise choose one legal corresponding target owned by that player.", responsible: "Targeted player", resultLabel: "Redirect Result", placeholder: "Gold - Lucario", confirmationLabel: "Confirm Smokescreen" }, parentInteraction: "Replace the original selected target only when the wheel lands on another player with a legal corresponding target. Preserve the source, costs, text, target category, target count, and every unaffected target.", effectTags: ["Redirect"], runtimeUsability: runtimeUsabilityStatuses.GUIDED_ONLY, runtimeUsabilityReason: "Smokescreen uses the guided wheel and corresponding-target confirmation flow; it cannot fall back to additive or arbitrary target behavior.", mechanicContract: { targetOperation: "replaceOneCorrespondingTarget", wheelIncludesEveryPlayerExactlyOnce: true, originalPlayerResultKeepsTarget: true, playerParentUsesLandedPlayer: true, pokemonParentChoosesLegalPokemonOwnedByLandedPlayer: true, preserveSourceCostTextTargetCategoryTargetCountAndOtherTargets: true, noLegalCorrespondingTargetHandling: "keepOriginalTarget", redirectReplacement: true, recursiveWheel: false } }),
    protection({ id: "counterspell", name: "Counterspell", rulesText: "When One Of Your Tokens Is Negated, Use This Token. The Negated Token Is Not Consumed. That Token Cannot Be Used Again Until 2 Gyms Have Passed", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "restoreNegatedTokenWithCooldown", canRespondTo: ["negatedOwnTokenActivation"], requiredChoices: ["The user's exact negated Token inventory record"], persistence: "exactTokenCooldown", duration: "2 Gyms from the declaration phase anchor", expirationPoint: "At the same phase boundary two Gyms after Counterspell resolves", effectTags: ["Restore", "Cooldown"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Counterspell restores the exact negated owned Token on its persisted two-Gym phase-anchored cooldown.", automaticMutations: ["Restore the exact consumed Token inventory record", "Apply a two-Gym cooldown anchored to the declaration phase", "Keep the original activation negated"], mechanicContract: { requiresOwnedActivatedTokenNegated: true, originalTokenRemainsNegated: true, originalTokenDoesNotResolve: true, restoreExactTokenInventoryRecord: true, cooldownGyms: 2, cooldownScope: "exactRestoredToken", visibleWhileUnusable: true, normalUseReturnsAfterCooldown: true, explicitConsumptionException: true, preserveDeclarationNegationResponseRestorationCooldownRelationship: true, counterspellUsesUniversalLifecycle: true } }),
    protection({ id: "seven-tools", name: "7 Tools Of The Bandit", aliases: ["7 Tools", "Seven Tools"], rulesText: "When A Player Activates A Protection Token, Use This Token Immediately After. Negate That Protection Token, Then Copy It. The Copied Token Must Be Used During This Gym Or It Is Lost", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "counterProtection", copyActivationMode: copyActivationModes.TEMPORARY_INVENTORY, canRespondTo: ["protectionTokenActivation"], specialPriority: "Immediately after the targeted Protection Token activation", persistence: "temporaryCopiedToken", duration: "Until used or End of Gym", expirationPoint: "End of the current Gym if unused", effectTags: ["Negate", "Copy"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "7 Tools atomically negates the exact Protection response and creates its same-Gym temporary copy.", parentInteraction: "Negate the targeted Protection Token, keep it negated, then create one temporary copy for the 7 Tools user.", automaticMutations: ["Negate the targeted Protection Token", "Create one temporary copy for the 7 Tools user", "Retain copied Token timing, targeting, and effect rules", "Expire the temporary copy unused at End of Gym"], mechanicContract: { respondsOnlyToProtectionTokenActivation: true, negateTargetProtection: true, temporaryCopyCount: 1, copyOwner: "sevenToolsUser", preserveCopiedDefinitionTimingTargetsAndRules: true, permanentInventory: false, expiresAtEndOfCurrentGym: true, recordSourceDefinitionActivationOwnerCreationGymAndExpiration: true, safeguardCopyProtectionMustBeChecked: true, copyModelIsTokenSpecific: true, atomicResolutionRequired: true } }),
    protection({ id: "immunity", name: "Immunity", aliases: ["Emergency Immunity Token"], rulesText: "Negate any effect or global effect. Does not stop Series Restricts or bans", targetType: "currentPrompt", targetScope: "currentPrompt", resolverMode: resolverModes.AUTOMATIC, resolverId: "immunity", canRespondTo: ["targetedEffect", "globalEffect"], protectionScope: ["targetedEffect", "globalEffect"], runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Immunity atomically negates its exact current parent prompt and is covered across reload, undo, results, and sandbox isolation.", automaticMutations: ["Negate the parent prompt"] }),
    protection({ id: "revenge", name: "Revenge", rulesText: "After a Battle Phase where an opponent cursed a Pokemon you brought, release 2 Pokemon from their brought team and destroy the held item", isResponse: false, legalPhases: [], timingWindows: ["endOfBattlePhaseProcedure"], phaseBoundaryProcedure: "endOfBattlePhaseProcedure", explicitPhaseTiming: "postPayoutBeforeControl", activationPattern: "phaseBoundaryOptionalTrigger", activationType: "Post-payout optional offer", requiresPendingEvent: false, createsPendingEvent: true, opensResponseWindow: false, targetType: "team", targetScope: "singleTeam", targetControllerRelation: "otherPlayer", otherPlayerOnly: true, excludeActor: true, differentControllerRequired: true, resolverMode: resolverModes.AUTOMATIC, resolverId: "revengeRelease", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Revenge is offered after payout from exact current-Gym Curse anchors and the immutable brought-team snapshot. It consumes only after the affected player confirms two exact Pokemon and an optional eligible held Item.", requiredChoices: ["Exactly two exact Pokemon from the offender's immutable brought team", "At most one eligible held item from those two"], guidedTask: { instruction: "Choose exactly two exact roster instances from the offending player's immutable brought-team snapshot, then optionally choose one eligible exactly referenced held item from those two.", responsible: "Affected player", resultLabel: "Revenge Choices", placeholder: "Two exact roster IDs and optional exact held item ID", confirmationLabel: "Apply Revenge" }, mechanicContract: { postPayoutBeforeControl: true, immutableBroughtSnapshotRequired: true, exactReleaseCount: 2, qualifyingCurseMustTargetExactBroughtInstance: true, heldItemSelectionMaximum: 1, heldItemMustBelongToSelectedReleasedPokemon: true, exactHeldInventoryReferenceRequired: true, masterBallTierProtected: true, sameNameInventoryGuessingForbidden: true, atomicResolutionRequired: true, idempotentResolutionRequired: true, adminUndoRequired: true, optionalOfferCanBeDeclinedWithoutConsumption: true, productionChoiceScreenRequired: true } }),

    encounter({ id: "reroll-token", name: "Reroll", aliases: ["Reroll Token"], rulesText: "Reroll an eligible unresolved Pokemon result.", legalPhases: [], timingWindows: [], isResponse: false, requiresPendingEvent: false, createsPendingEvent: false, opensResponseWindow: false, targetType: "manual", targetScope: "manual", resolverMode: resolverModes.HOST_CONFIRMED, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Reroll is resolved by the current contextual result UI (including Route and shared Random Pokemon results); generic Live Referee Encounter activation is intentionally blocked.", requiredChoices: [] }),
    encounter({ id: "extra-encounter-token", name: "Extra Encounter Token", aliases: ["Extra Encounter"], rulesText: "Gain one additional encounter opportunity on a currently legal Route.", legalPhases: [], timingWindows: [], isResponse: false, requiresPendingEvent: false, createsPendingEvent: false, opensResponseWindow: false, targetType: "manual", targetScope: "manual", resolverMode: resolverModes.HOST_CONFIRMED, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Extra Encounter is resolved only inside the current Route action through useV2ExtraEncounter; generic Token/Live Referee activation is intentionally blocked.", requiredChoices: [] }),
    encounter({ id: "repel-token", name: "Repel", rulesText: "On a Route, suppress five eligible residents of a chosen Battle Tier.", legalPhases: [], timingWindows: [], isResponse: false, requiresPendingEvent: false, createsPendingEvent: false, opensResponseWindow: false, targetType: "manual", targetScope: "manual", resolverMode: resolverModes.HOST_CONFIRMED, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Repel is resolved only inside the current Route action through applyV2RouteRepel; generic Token/Live Referee activation is intentionally blocked.", requiredChoices: [] }),
    encounter({ id: "quick-ball-token", name: "Quick Ball Token", rulesText: "Exchange your encounter for another player's encounter.", legalPhases: [], timingWindows: [], isResponse: false, requiresPendingEvent: false, createsPendingEvent: false, opensResponseWindow: false, targetType: "manual", targetScope: "manual", resolverMode: resolverModes.HOST_CONFIRMED, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Quick Ball is retained as a Saga Token concept but is blocked until its current Route-era transfer rules are reviewed; the retired wheel-era transfer path no longer exists.", requiredChoices: [] }),
    encounter({ id: "dream-ball-token", name: "Dream Ball Token", rulesText: "Grant an encountered Pokemon access to a chosen legal ability.", legalPhases: [], timingWindows: [], isResponse: false, requiresPendingEvent: false, createsPendingEvent: false, opensResponseWindow: false, targetType: "manual", targetScope: "manual", resolverMode: resolverModes.HOST_CONFIRMED, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Dream Ball is retained as a Saga Token concept but is blocked until its Route-era grant timing and persistence are reviewed; the retired before-wheel path no longer exists.", requiredChoices: [] }),
    encounter({ id: "honey-token", name: "Honey", rulesText: "Copy an eligible encounter.", legalPhases: [], timingWindows: [], isResponse: false, requiresPendingEvent: false, createsPendingEvent: false, opensResponseWindow: false, targetType: "manual", targetScope: "manual", resolverMode: resolverModes.HOST_CONFIRMED, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Honey is retained as a Saga Token concept but is blocked until its Route-era copy rules are reviewed; the retired end-of-Action Encounter-copy runtime no longer exists.", requiredChoices: [] }),
    encounter({ id: "master-ball-token", name: "Master Ball Token", rulesText: "Use a pending Route opportunity to choose a known eligible resident.", legalPhases: [], timingWindows: [], isResponse: false, requiresPendingEvent: false, createsPendingEvent: false, opensResponseWindow: false, targetType: "manual", targetScope: "manual", resolverMode: resolverModes.HOST_CONFIRMED, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Master Ball is resolved only inside the current Route action through useV2MasterBallOnOpportunity; generic Token/Live Referee activation is intentionally blocked.", requiredChoices: [] }),
    encounter({ id: "beast-ball-token", name: "Beast Ball", rulesText: "Grant an encountered Pokemon access to a chosen legal move.", legalPhases: [], timingWindows: [], isResponse: false, requiresPendingEvent: false, createsPendingEvent: false, opensResponseWindow: false, targetType: "manual", targetScope: "manual", resolverMode: resolverModes.HOST_CONFIRMED, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Beast Ball is retained as a Saga Token concept but is blocked until its Route-era grant timing and persistence are reviewed; the retired before-wheel path no longer exists.", requiredChoices: [] }),

    control({ id: "move-deleter", name: "Move Deleter", aliases: ["Move Deleter Curse"], rulesText: "Ban one move from being brought for 1 week. Cannot be used after team submission", targetType: "resource", targetScope: "singleResource", selectedTargetType: "move", applicationScope: "tableWide", affectedEntityType: "move", targetScopeStatus: "settled", targetControllerRelation: "notApplicable", minTargets: 1, maxTargets: 1, targetCollectionType: "canonicalMove", resolverMode: resolverModes.AUTOMATIC, resolverId: "moveBan", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Move Deleter records one canonical global move restriction for the next Gym and the Teambuilder and validator enforce it.", requiredChoices: ["One canonical move"], persistence: "lingeringEffect", duration: "Next Gym", expirationPoint: "End of the next Gym", automaticMutations: ["Create a global move restriction keyed by canonical move identity", "Disable the move in Teambuilder and team validation during the next Gym", "Expire the restriction when that Gym ends"] }),
    curse({ id: "toxic-curse", name: "Toxic Curse", rulesText: "Force a Pokemon to carry a Toxic Orb for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Toxic Orb status with exact protected-instance exclusions"] }),
    curse({ id: "iron-ball-curse", name: "Iron Ball Curse", rulesText: "Force a Pokemon to carry an Iron Ball for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Iron Ball status with exact protected-instance exclusions"] }),
    curse({ id: "flame-curse", name: "Flame Curse", rulesText: "Force a Pokemon to carry a Flame Orb for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", targetControllerRelation: "anyPlayer", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide forced Flame Orb status with exact protected-instance exclusions"] }),
    curse({ id: "silencing-curse", name: "Silencing Curse", rulesText: "Restrict a Pokemon to 2 move slots for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide max-two-moves status with exact protected-instance exclusions", "Require explicit per-instance two-move repair where needed"] }),
    curse({ id: "knock-off-curse", name: "Knock Off Curse", rulesText: "Choose a Pokemon and an Item or TM move. If it is on the Pokemon, remove it from inventory. Masterball items are protected", targetType: "pokemon", targetScope: "rosterInstance", targetControllerRelation: "needsRuling", resolverMode: resolverModes.GUIDED, resolverId: "knockOff", runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Knock Off Curse is unavailable until the legal target-controller relationship is settled and exact Item/TM removal is implemented. The Token is not consumed.", requiredChoices: ["Item or TM name"], guidedTask: { instruction: "Name the Item or TM move to check on the selected Pokemon.", responsible: "Acting player", resultLabel: "Item or TM", placeholder: "Leftovers", confirmationLabel: "Resolve Knock Off" } }),
    curse({ id: "haze-curse", name: "Haze Curse", rulesText: "Select 2 Pokemon. Their buffs are negated for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "needsRuling", minTargets: 2, maxTargets: 2, targetCollectionType: "validatedRosterInstances", resolverMode: resolverModes.GUIDED, resolverId: "multiStatusEffect", runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Haze Curse is unavailable until the legal controllers for its two species anchors and its two-Gym expiration boundary are settled. The Token is not consumed.", requiredChoices: ["Exactly two Pokemon species anchors"], guidedTask: { instruction: "Choose exactly two Active Roster Pokemon as species anchors. Which controllers are legal remains Needs Ruling.", responsible: "Acting player", resultLabel: "Selected Species", placeholder: "Controller - Pokemon; Controller - Pokemon", confirmationLabel: "Apply Haze" }, persistence: "lingeringEffect", duration: "2 Gyms", expirationPoint: unresolvedMultiGymExpiration }),
    curse({ id: "imprison-curse", name: "Imprison Curse", rulesText: "Selected Pokemon cannot have EVs or IVs and must use a neutral nature for 2 gyms", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "2 phase-anchored Gyms", expirationPoint: phaseAnchoredTwoGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Apply a species-wide non-destructive no-EVs, no-IVs, neutral-Nature override with exact protected-instance exclusions"] }),
    curse({ id: "devolve-token", name: "Devolve", aliases: ["Devolve Token"], rulesText: "Selected Pokemon is devolved for 1 gym. During team submission, the target may adjust its set before preview", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", resolverMode: resolverModes.AUTOMATIC, resolverId: "statusEffect", persistence: "lingeringEffect", duration: "1 Gym", expirationPoint: unresolvedMultiGymExpiration, automaticMutations: ["Use the selected roster instance as a species anchor", "Create species-wide Devolved status with exact protected-instance exclusions", "Permit Team Submission set revision"], runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Devolve is unavailable until branch/form selection, temporary species state, set revision, and exact restoration rules are canonical and implemented." }),
    curse({ id: "purge-curse", name: "Purge Curse", rulesText: "All Pokemon brought to this Battle Phase are released after battle completes. This Token ignores other effects", targetType: "player", targetScope: "singlePlayer", selectedTargetType: "player", applicationScope: "submittedTeamInstances", affectedEntityType: "pokemon", targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "purgeAfterBattle", runtimeUsability: runtimeUsabilityStatuses.USABLE, runtimeUsabilityReason: "Purge records an absolute target-player marker, then atomically releases that player's immutable brought-team snapshot after Gym payout.", opensResponseWindow: false, persistence: "lingeringEffect", duration: "Until the post-payout checkpoint of the current Battle Phase", expirationPoint: "Immediately after Gym payout and before ordinary Control Timing reopens.", automaticMutations: ["Create an absolute Purge marker without an ordinary response window", "Capture the immutable exact brought-team snapshot", "After payout release every exact brought roster instance atomically", "Ignore Substitute, Curse Immunity, redirection, negation, and other gameplay prevention"], mechanicContract: { postPayoutBeforeControl: true, immutableBroughtSnapshotRequired: true, absoluteGameplayEffect: true, canBeRespondedTo: false, canBeNegated: false, canBeRedirected: false, canBeProtected: false, ignoresSubstitute: true, ignoresCurseImmunity: true, atomicResolutionRequired: true, idempotentResolutionRequired: true, adminUndoRequired: true, systemFailureRollbackAndRefundRequired: true } }),
    curse({ id: "foresight-curse", name: "Foresight Curse", rulesText: "Choose 6 Pokemon. If Any Of Those Pokemon Are Brought To This Battle Phase, Their Sets Become Revealed To You. This Is Not A Nerf/Debuff", targetType: "pokemon", targetScope: "rosterInstance", selectedTargetType: "rosterInstance", applicationScope: "globalSpecies", affectedEntityType: "pokemon", targetControllerRelation: "needsRuling", minTargets: 6, maxTargets: 6, targetCollectionType: "validatedRosterInstances", resolverMode: resolverModes.GUIDED, resolverId: "multiStatusEffect", requiredChoices: ["Exactly six Pokemon species anchors"], guidedTask: { instruction: "Choose exactly six Active Roster Pokemon as species anchors. If matching species are brought, reveal their sets only to the Foresight Curse user. Which controllers are legal remains Needs Ruling.", responsible: "Acting player", resultLabel: "Privately Marked Species", placeholder: "List the six selected Pokemon", confirmationLabel: "Apply Private Foresight" }, persistence: "privateInformationMarker", duration: "Current Battle Phase", expirationPoint: "At the end of the current Battle Phase after its private reveal obligation is complete.", visibility: "sourcePlayerOnly", effectClassification: "privateInformationMarkerNotDebuff", removableBy: [], runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Foresight Curse is unavailable because player-scoped private set delivery is not implemented. No selections or set data are placed in shared game state and the Token is not consumed.", mechanicContract: { selectionCount: 6, selectionUsesRosterInstanceAnchors: true, applicationScope: "globalSpecies", revealOnlyToSourcePlayer: true, authorizedViewer: "sourcePlayer", unauthorizedViewers: "everyOtherPlayer", hostAccessPolicy: "separateAdministrativeAuthorization", clientSideHidingSufficient: false, sharedStatePayloadMayContainSetData: false, automaticRevealEnabled: false, publicReveal: false, privateVisibilityData: true, nerfOrDebuff: false, removableByClearSmog: false, removableByGenericNerfRemoval: false, ownedPokemonRestriction: false, unauthorizedViewsMustNotReceiveOrRenderSetData: true } }),

    control({ id: "ditto-token", name: "Ditto", rulesText: "Transforms into any Token except Game Corner Tickets", targetType: "resource", targetScope: "singleResource", resolverMode: resolverModes.GUIDED, resolverId: "copyToken", copyActivationMode: copyActivationModes.DITTO, runtimeUsability: runtimeUsabilityStatuses.BLOCKED, runtimeUsabilityReason: "Ditto is unavailable because its legal Token picker and fresh declaration controller are not implemented, and the handling of phase-boundary-only, response-only, and delayed Tokens outside their native windows is not settled.", requiredChoices: ["Token to copy", "Fresh targets and choices", "Explicit copied-effect costs"], guidedTask: { instruction: "Choose one legal normal Token definition, then create one copied activation with fresh targets, choices, and explicit costs. Do not add that Token to inventory.", responsible: "Acting player", resultLabel: "Copied Activation", placeholder: "Restrict", confirmationLabel: "Use Ditto Activation" }, mechanicContract: { selectedDefinitionMustBeCurrentlyTimingLegal: "needsRuling", phaseBoundaryResponseAndDelayedTokenHandling: "needsRuling" } })
  ];

  const settledRuleOverrides = Object.freeze({
    "lingering-aroma": {
      rulesText: "Replace one exact active ongoing effect attached to or benefiting you. It stops applying. For its remaining lifetime, other players must pay you $500 to declare an effect that targets you.",
      targetControllerRelation: "self",
      runtimeUsability: runtimeUsabilityStatuses.USABLE,
      runtimeUsabilityReason: "Lingering Aroma selects an exact benefiting ongoing-effect record, replaces its behavior without extending it, and atomically charges confirmed outside targeting declarations.",
      mechanicContract: { exactOngoingEffectRecordRequired: true, mustBenefitActingPlayer: true, removeOriginalEffect: true, preserveOriginalRecordForHistory: true, originalBehaviorStopsApplying: true, replacementText: "Players must pay me $500 to declare an effect that targets me.", declarationCostAmount: 500, declarationCostTiming: "confirmedDeclaration", declarationCostPaidOncePerDeclaration: true, selfTargetExempt: true, provisionalWithdrawalPaysNothing: true, confirmedCostSurvivesNegationRedirectOrNoEffect: true, preserveSourceOwnerDurationExpirationIdentity: true, expiresWithOriginalEffect: true }
    },
    "knock-off-curse": {
      targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "knockOff",
      runtimeUsability: runtimeUsabilityStatuses.USABLE,
      runtimeUsabilityReason: "Knock Off uses one exact Active-roster anchor and destroys its exact held Item or exact TM inventory grant, opening mandatory set revision when final TM access is lost.",
      mechanicContract: { exactRosterInstanceRequired: true, activeRosterRequired: true, exactInventoryRecordRequired: true, heldItemOrCurrentSetTmMoveOnly: true, masterBallTierProtected: true, finalTmCopyLossRevokesAccess: true, naturalOrOtherMoveSourcesRemainLegal: true, mandatoryTeamRevisionAfterSabotage: true, preserveTeamMembershipAndUnrelatedSetChoices: true, atomicMutationRequired: true }
    },
    "haze-curse": {
      targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "hazeCurse",
      runtimeUsability: runtimeUsabilityStatuses.USABLE,
      runtimeUsabilityReason: "Haze selects two exact Active-roster anchors with different species and suppresses structured buffs across each species with per-instance protection.",
      expirationPoint: phaseAnchoredTwoGymExpiration,
      mechanicContract: { exactSelectionCount: 2, differentSpeciesRequired: true, applicationScope: "globalSpecies", structuredBuffsSuppressedNotDeleted: true, perInstanceProtection: true, phaseAnchoredDurationGyms: 2 }
    },
    "devolve-token": {
      targetControllerRelation: "anyPlayer", resolverMode: resolverModes.AUTOMATIC, resolverId: "devolveCurse",
      runtimeUsability: runtimeUsabilityStatuses.USABLE,
      runtimeUsabilityReason: "Devolve validates one unambiguous safe direct pre-evolution, applies a temporary species overlay to unprotected matching Active instances, and restores exact records at expiration.",
      expirationPoint: "At the same phase boundary one Gym later.",
      mechanicContract: { selectedAnchorScope: "rosterInstance", applicationScope: "globalSpecies", directPreEvolutionOnly: true, ambiguousOrUnsafeParentFailsBeforeConsumption: true, stableRosterIdentityRequired: true, temporarySpeciesOverlayRequired: true, mandatoryTeamRevisionWhenBuildIllegal: true, preserveTeamMembership: true, exactExpirationRestoration: true, perInstanceProtection: true }
    },
    "ditto-token": {
      targetType: "resource", targetScope: "singleResource", resolverMode: resolverModes.AUTOMATIC, resolverId: "copyTokenInventory",
      runtimeUsability: runtimeUsabilityStatuses.USABLE,
      runtimeUsabilityReason: "Ditto transforms its exact owned inventory record into one canonical inventory copy chosen from the searchable activatable Token catalog; it does not activate the copy immediately.",
      requiredChoices: ["One canonical activatable Token definition"],
      mechanicContract: { exactOwnedDittoInventoryRecordRequired: true, createsCanonicalInventoryCopy: true, immediateActivation: false, excludesDitto: true, stableIdentityAndProvenanceRequired: true }
    },
    "follow-me": {
      runtimeUsability: runtimeUsabilityStatuses.USABLE,
      runtimeUsabilityReason: "Follow Me redirects one legal corresponding player or Pokemon target, then creates an idempotent Gym-long relationship that copies later real inventory Token consumption into inventory.",
      mechanicContract: { initialRedirectOperation: "replaceOneCorrespondingTarget", requiresLegalCorrespondingTarget: true, excludesGlobalAndTargetlessEffects: true, preserveSourceCostTextTargetTypeTargetCountAndUnaffectedTargets: true, ongoingEffectBeginsAfterRedirectedParentResolves: true, ongoingEffectDuration: "currentGym", copyEachLaterTokenUsedByRecordedPlayer: true, copiesOnlyRealInventoryConsumption: true, copiedTokenAddedToInventory: true, copiedTokenNotImmediatelyActivated: true, copiedActivationsDoNotRecurse: true, copySemanticsStatus: "settled" }
    },
    "after-you": {
      resolverMode: resolverModes.AUTOMATIC, resolverId: "copyParentEffect",
      runtimeUsability: runtimeUsabilityStatuses.USABLE,
      runtimeUsabilityReason: "After You supports automatic Control parents with fresh legal choices plus the explicit Safeguard and Immunity interactions; every other Protection interaction fails closed individually before consumption.",
      mechanicContract: { copyableSourceTypes: "pendingTokenActivation", virtualActivationOnly: true, createsInventoryRecord: false, copiedUserPaysExplicitNonTokenCosts: true, freshTargetsAndChoicesRequired: true, copiedActivationResolvesBeforeOriginal: true, originalChainResumesAfterCopiedTerminal: true, recursiveAfterYouForbidden: true, protectionInteractionMatrixRequired: true, unclearProtectionInteractionFailsClosedIndividually: true }
    },
    "foresight-curse": {
      targetControllerRelation: "anyPlayer",
      runtimeUsability: runtimeUsabilityStatuses.BLOCKED,
      runtimeUsabilityReason: "The six-species private marker is implemented, but activation remains blocked until authenticated source-only delivery is verified with separate authorized and unauthorized clients.",
      mechanicContract: { selectionCount: 6, differentSpeciesRequired: true, selectionUsesRosterInstanceAnchors: true, applicationScope: "globalSpecies", revealMovesOnly: true, revealOnlyToSourcePlayer: true, authorizedViewer: "sourcePlayer", unauthorizedViewers: "everyOtherPlayer", hostAccessPolicy: "separateAdministrativeAuthorization", clientSideHidingSufficient: false, sharedStatePayloadMayContainSetData: false, publicReveal: false, privateVisibilityData: true, nerfOrDebuff: false, removableByClearSmog: false, removableByGenericNerfRemoval: false, ownedPokemonRestriction: false, unauthorizedViewsMustNotReceiveOrRenderSetData: true }
    }
  });
  const effectiveDefinitions = definitions.map((definition) => Object.freeze({
    ...definition,
    ...(settledRuleOverrides[definition.id] || {})
  }));
  const byId = Object.freeze(Object.fromEntries(effectiveDefinitions.map((definition) => [definition.id, definition])));
  const byName = new Map();
  effectiveDefinitions.forEach((definition) => definition.aliases.forEach((name) => byName.set(String(name).trim().toLowerCase(), definition)));

  function definitionFor(value) {
    const key = String(value || "").trim();
    if (!key) return null;
    return byId[key] || byName.get(key.toLowerCase()) || null;
  }

  function inventoryDefinitionFor(item) {
    if (!item || typeof item !== "object" || Array.isArray(item)) return null;
    const candidates = [item.tokenDefinitionId, item.effectId, item.canonicalId, item.name, item.id].filter(Boolean);
    for (const candidate of candidates) {
      const definition = definitionFor(candidate);
      if (definition) return definition;
    }
    return null;
  }

  function activationUsabilityFor(value, { allowDevelopmentOnly = false } = {}) {
    const definition = typeof value === "object" && value ? value : definitionFor(value);
    if (!definition) {
      return Object.freeze({ ok: false, status: runtimeUsabilityStatuses.BLOCKED, mayConsume: false, reason: "This Token has no registered runtime contract." });
    }
    const status = definition.runtimeUsability || runtimeUsabilityStatuses.BLOCKED;
    const developmentAllowed = status === runtimeUsabilityStatuses.DEVELOPMENT_ONLY && allowDevelopmentOnly;
    const ok = status === runtimeUsabilityStatuses.USABLE
      || status === runtimeUsabilityStatuses.GUIDED_ONLY
      || developmentAllowed;
    return Object.freeze({
      ok,
      status,
      mayConsume: ok,
      developmentOnly: status === runtimeUsabilityStatuses.DEVELOPMENT_ONLY,
      reason: ok ? "" : definition.runtimeUsabilityReason || `${definition.name} is unavailable in the current runtime.`
    });
  }

  function runtimeResultSafetyFor(value, outcome = {}) {
    const definition = typeof value === "object" && value ? value : definitionFor(value);
    if (!definition) return Object.freeze({ ok: false, reason: "Unknown Token result." });
    if (definition.id === "seven-tools") {
      const continuationRecorded = Boolean(outcome.temporaryCopyTokenId || outcome.mandatoryGuidedContinuationId);
      if (outcome.negatedProtectionToken && !continuationRecorded) {
        return Object.freeze({ ok: false, reason: "7 Tools cannot negate a Protection Token without creating its temporary copy or a mandatory continuation." });
      }
      if (outcome.closed && !continuationRecorded) {
        return Object.freeze({ ok: false, reason: "7 Tools cannot close without its temporary copy obligation." });
      }
    }
    if (definition.id === "smokescreen") {
      if (outcome.addedTargetId || outcome.originalTargetsPreserved === true) {
        return Object.freeze({ ok: false, reason: "Smokescreen cannot use the obsolete additive-target model." });
      }
      const landedOnOriginal = outcome.wheelResultPlayerId && outcome.wheelResultPlayerId === outcome.originalTargetPlayerId;
      const validNoChange = Boolean(outcome.keptOriginalTarget && (landedOnOriginal || outcome.noLegalCorrespondingTarget));
      const validReplacement = Boolean(outcome.replacedOriginalTarget && outcome.replacementTargetId && !landedOnOriginal);
      if (outcome.closed && (!outcome.wheelResultPlayerId || (!validNoChange && !validReplacement))) {
        return Object.freeze({ ok: false, reason: "Smokescreen cannot close without a valid wheel result and either a legal corresponding replacement or an explicit keep-original result." });
      }
    }
    if (definition.id === "follow-me" && outcome.redirectedTarget && outcome.closed
      && !outcome.ongoingCopyRelationshipId && !outcome.mandatoryGuidedContinuationId) {
      return Object.freeze({ ok: false, reason: "Follow Me cannot close after redirection without its Gym-long Copy obligation." });
    }
    if (definition.id === "foresight-curse") {
      if (outcome.closed && !outcome.playerScopedPrivateRecordId) {
        return Object.freeze({ ok: false, reason: "Foresight cannot close without an authorized player-scoped private record." });
      }
      if (outcome.sharedPayloadContainsPrivateSetData) {
        return Object.freeze({ ok: false, reason: "Foresight set data cannot be stored in shared game state." });
      }
      const unauthorizedRecipients = Array.isArray(outcome.revealRecipientPlayerIds)
        ? outcome.revealRecipientPlayerIds.filter((playerId) => playerId && playerId !== outcome.sourcePlayerId)
        : [];
      if (unauthorizedRecipients.length) {
        return Object.freeze({ ok: false, reason: "Foresight set data cannot be delivered to unauthorized players." });
      }
    }
    return Object.freeze({ ok: true, reason: "" });
  }

  function validate() {
    const errors = [];
    const idOwners = new Map();
    const nameOwners = new Map();
    const aliasOwners = new Map();
    const hasRequiredTest = (definition, expected) => definition.requiredTests.some((test) => test === expected);
    const responseRequiredTests = [
      "Requires legal parent prompt",
      "Response compatibility",
      "Priority ownership",
      "Parent pause/resume",
      "No independent target unless rules require one"
    ];
    const multiTargetRequiredTests = [
      "Exact target count",
      "Duplicate-target rejection",
      "Ownership/controller relationship",
      "Full revalidation at resolution"
    ];
    effectiveDefinitions.forEach((definition) => {
      ["id", "name", "family", "rulesText", "intendedResolutionMode", "resolverId", "targetType", "targetScope", "targetControllerRelation", "redirectPolicy", "consumptionTiming", "outcomeTemplate", "runtimeImplementationStatus", "runtimeUsability", "runtimeUsabilityReason", "runtimeEvidence", "lastVerifiedTest"].forEach((fieldName) => {
        if (!definition[fieldName]) errors.push(`${definition.id || "unknown"}: missing ${fieldName}`);
      });
      const id = String(definition.id || "").toLowerCase();
      const name = String(definition.name || "").toLowerCase();
      if (idOwners.has(id)) errors.push(`Duplicate contract ID: ${definition.id}`);
      else idOwners.set(id, definition.id);
      if (nameOwners.has(name)) errors.push(`Duplicate canonical Token name: ${definition.name}`);
      else nameOwners.set(name, definition.id);
      if (definition.duplicateAliases.length) errors.push(`${definition.id}: duplicate aliases in definition: ${[...new Set(definition.duplicateAliases)].join(", ")}`);
      definition.aliases.forEach((alias) => {
        const key = String(alias || "").trim().toLowerCase();
        if (!key) return;
        if (aliasOwners.has(key) && aliasOwners.get(key) !== definition.id) errors.push(`Duplicate Token alias: ${alias}`);
        else aliasOwners.set(key, definition.id);
      });
      if (!Object.values(resolverModes).includes(definition.intendedResolutionMode)) errors.push(`${definition.id}: invalid intended resolution mode ${definition.intendedResolutionMode}`);
      if (!Object.values(runtimeImplementationStatuses).includes(definition.runtimeImplementationStatus)) errors.push(`${definition.id}: invalid runtime implementation status ${definition.runtimeImplementationStatus}`);
      if (!Object.values(runtimeUsabilityStatuses).includes(definition.runtimeUsability)) errors.push(`${definition.id}: invalid runtime usability ${definition.runtimeUsability}`);
      if (!String(definition.runtimeUsabilityReason || "").trim()) errors.push(`${definition.id}: runtime usability reason is empty`);
      if (!registeredResolverIds.includes(definition.resolverId)) errors.push(`${definition.id}: unknown resolver ID ${definition.resolverId}`);
      [...definition.legalPhases, ...definition.timingWindows].forEach((timing) => {
        if (!legalTimingValues.includes(timing)) errors.push(`${definition.id}: unknown timing value ${timing}`);
      });
      definition.legalControlContexts.forEach((context) => {
        if (!legalControlContextValues.includes(context)) errors.push(`${definition.id}: unknown Control context ${context}`);
      });
      if (definition.phaseBoundaryProcedure && !phaseBoundaryProcedureValues.includes(definition.phaseBoundaryProcedure)) {
        errors.push(`${definition.id}: unknown phase-boundary procedure ${definition.phaseBoundaryProcedure}`);
      }
      if (definition.timingModel === "phaseBoundaryProcedure" && !definition.phaseBoundaryProcedure) errors.push(`${definition.id}: phase-boundary timing lacks a procedure`);
      if (definition.phaseBoundaryProcedure && definition.usesControlTiming) errors.push(`${definition.id}: phase-boundary procedure cannot simultaneously use ordinary Control Timing`);
      if (definition.usesControlTiming && !definition.controlWindowRequired) errors.push(`${definition.id}: ordinary Control effect does not require an open Control window`);
      if (definition.usesControlTiming && !definition.legalControlContexts.length) errors.push(`${definition.id}: ordinary Control effect lacks semantic Control contexts`);
      if (definition.usesControlTiming && !definition.timingWindows.length) errors.push(`${definition.id}: empty legacy timing projection would be treated as unrestricted by the current runtime`);
      if ([...definition.legalPhases, ...definition.timingWindows, ...definition.legalControlContexts].includes("gymStart")) {
        errors.push(`${definition.id}: broad gymStart timing is unsupported; use gymStartPreparationControl only`);
      }
      if (!targetTypes.includes(definition.targetType)) errors.push(`${definition.id}: unknown target type ${definition.targetType}`);
      if (!targetScopes.includes(definition.targetScope)) errors.push(`${definition.id}: unknown target scope ${definition.targetScope}`);
      if (!selectedTargetTypes.includes(definition.selectedTargetType)) errors.push(`${definition.id}: unknown selected target type ${definition.selectedTargetType}`);
      if (!applicationScopes.includes(definition.applicationScope)) errors.push(`${definition.id}: unknown application scope ${definition.applicationScope}`);
      if (!targetControllerRelations.includes(definition.targetControllerRelation)) errors.push(`${definition.id}: unknown target-controller relationship ${definition.targetControllerRelation}`);
      if (!timingStatusValues.includes(definition.timingStatus)) errors.push(`${definition.id}: unknown timing status ${definition.timingStatus}`);
      if (!Number.isInteger(definition.minTargets) || !Number.isInteger(definition.maxTargets) || definition.minTargets < 0 || definition.maxTargets < definition.minTargets) {
        errors.push(`${definition.id}: invalid target-count range ${definition.minTargets}-${definition.maxTargets}`);
      }
      if (definition.maxTargets > 1 && ["none", "singleTarget"].includes(definition.targetCollectionType)) errors.push(`${definition.id}: multi-target effect needs a collection target type`);
      if (definition.maxTargets === 0 && definition.targetCollectionType !== "none") errors.push(`${definition.id}: targetless effect cannot declare ${definition.targetCollectionType}`);
      if (definition.resolverMode === resolverModes.GUIDED && !definition.guidedTask?.instruction) errors.push(`${definition.id}: Guided effect needs a task`);
      if (definition.resolverMode === resolverModes.HOST_CONFIRMED && !definition.hostTask?.instruction) errors.push(`${definition.id}: Host Confirmed effect needs a task`);
      if (definition.isResponse) responseRequiredTests.forEach((test) => {
        if (!hasRequiredTest(definition, test)) errors.push(`${definition.id}: response Token missing required test: ${test}`);
      });
      if (definition.maxTargets > 1) multiTargetRequiredTests.forEach((test) => {
        if (!hasRequiredTest(definition, test)) errors.push(`${definition.id}: multi-target effect missing required test: ${test}`);
      });
      if (definition.duration !== "Instant" && definition.expirationPoint === "After resolution") {
        errors.push(`${definition.id}: lingering effect retains immediate expiration`);
      }
      if (definition.family === "Control" && (definition.legalPhases.includes("sabotage") || definition.timingWindows.includes("sabotage"))) {
        errors.push(`${definition.id}: ordinary Control timing cannot include Sabotage`);
      }
      if (definition.family === "Curse") {
        const hasSabotageTiming = definition.legalPhases.includes("sabotage") || definition.timingWindows.includes("sabotage");
        const hasSabotageContext = definition.legalControlContexts.includes("sabotageCurseWindow");
        if (hasSabotageTiming !== hasSabotageContext) {
          errors.push(`${definition.id}: Sabotage Curse timing and sabotageCurseWindow context must be declared together`);
        }
      }
      if (Boolean(definition.timingPermissions?.sabotageCurseWindow)
        !== definition.legalControlContexts.includes("sabotageCurseWindow")) {
        errors.push(`${definition.id}: sabotageCurseWindow timing permission and legal Control context must agree`);
      }
      if (definition.selfOnly && definition.otherPlayerOnly) errors.push(`${definition.id}: cannot be both selfOnly and otherPlayerOnly`);
      if (definition.sameControllerRequired && definition.differentControllerRequired) errors.push(`${definition.id}: cannot require both same and different controllers`);
      if (definition.selfOnly && definition.excludeActor) errors.push(`${definition.id}: selfOnly contradicts excludeActor`);
      if (definition.selfOnly && definition.targetControllerRelation !== "self") errors.push(`${definition.id}: selfOnly must use the self controller relationship`);
      if (definition.otherPlayerOnly && !definition.excludeActor) errors.push(`${definition.id}: otherPlayerOnly must exclude the actor`);
      if (definition.otherPlayerOnly && !["otherPlayer", "rival", "differentController"].includes(definition.targetControllerRelation)) {
        errors.push(`${definition.id}: otherPlayerOnly contradicts ${definition.targetControllerRelation}`);
      }
      if (definition.sameControllerRequired && !["self", "sameController"].includes(definition.targetControllerRelation)) {
        errors.push(`${definition.id}: sameControllerRequired contradicts ${definition.targetControllerRelation}`);
      }
      if (definition.differentControllerRequired && !["otherPlayer", "rival", "differentController"].includes(definition.targetControllerRelation)) {
        errors.push(`${definition.id}: differentControllerRequired contradicts ${definition.targetControllerRelation}`);
      }
      const redirectPolicy = definition.redirectPolicy || {};
      const mechanisms = ["magician", "followMe", "smokescreen"];
      if (redirectPolicy.model !== "mechanismSpecificV2") errors.push(`${definition.id}: redirect policy is not mechanism-specific v2`);
      mechanisms.forEach((mechanism) => {
        const policy = redirectPolicy[mechanism];
        if (!policy || !redirectPolicyStatuses.includes(policy.status)) errors.push(`${definition.id}: invalid ${mechanism} redirect policy`);
        if (!policy?.reason || !policy?.mechanismRule) errors.push(`${definition.id}: ${mechanism} redirect policy lacks a reason or mechanism rule`);
        if (policy?.status === "allowed") {
          ["preservesTargetType", "preservesTargetControllerRelation", "preservesTargetCount", "preservesCosts", "preservesSourcePlayer", "preservesEffectText", "preservesOtherSelectedTargets", "requiresFreshDirectTargetPriority"].forEach((fieldName) => {
            if (policy[fieldName] !== true) errors.push(`${definition.id}: allowed ${mechanism} redirect does not enforce ${fieldName}`);
          });
        }
      });
      const targetlessRedirectShape = definition.maxTargets === 0
        || ["none", "currentPrompt", "table"].includes(definition.targetType)
        || ["none", "currentPrompt", "allPlayers", "allTeams", "allMatchingResources", "tableWide"].includes(definition.targetScope);
      if (targetlessRedirectShape && mechanisms.some((mechanism) => redirectPolicy[mechanism]?.status === "allowed")) {
        errors.push(`${definition.id}: targetless, current-prompt, global, or table-wide effect allows a target redirect`);
      }
      if ((definition.targetType === "table" || ["allPlayers", "allTeams", "allMatchingResources", "tableWide"].includes(definition.targetScope))
        && redirectPolicy.magician?.status === "allowed") {
        errors.push(`${definition.id}: global or table-wide effect allows Magician`);
      }
      if (definition.selfOnly && redirectPolicy.magician?.status === "allowed" && !redirectPolicy.magician.legalAlternateTargetExplanation) {
        errors.push(`${definition.id}: self-only effect allows Magician without a legal alternate-target explanation`);
      }
      if (definition.maxTargets > 1 && redirectPolicy.magician?.status === "allowed" && redirectPolicy.magician.changesSelectedTargetCount !== 1) {
        errors.push(`${definition.id}: multi-target Magician redirect changes more than one selected target`);
      }
      if (redirectPolicy.magician?.status === "allowed" && redirectPolicy.magician.requiresDifferentLegalCorrespondingTarget !== true) {
        errors.push(`${definition.id}: Magician does not require a different legal corresponding target`);
      }
      if (mechanisms.some((mechanism) => redirectPolicy[mechanism]?.status === "allowed"
        && redirectPolicy[mechanism].preservesTargetControllerRelation !== true)) {
        errors.push(`${definition.id}: redirect may violate the original target-controller relationship`);
      }
      if (new Set(mechanisms.map((mechanism) => redirectPolicy[mechanism]?.mechanismRule)).size !== mechanisms.length) {
        errors.push(`${definition.id}: Magician, Follow Me, and Smokescreen are treated as one identical policy`);
      }
      if (redirectPolicy.smokescreen?.status === "allowed"
        && (redirectPolicy.smokescreen.targetOperation !== "replaceOneCorrespondingTarget"
          || redirectPolicy.smokescreen.includesEveryPlayerExactlyOnce !== true
          || redirectPolicy.smokescreen.originalPlayerResultKeepsTarget !== true
          || redirectPolicy.smokescreen.noLegalCorrespondingTargetHandling !== "keepOriginalTarget")) {
        errors.push(`${definition.id}: Smokescreen replacement-wheel policy is incomplete`);
      }
      if (Object.prototype.hasOwnProperty.call(definition, "targetsRedirectable")) {
        errors.push(`${definition.id}: obsolete universal targetsRedirectable flag remains in the contract`);
      }
      if (magicianAllowedTokenIds.includes(definition.id) && redirectPolicy.magician?.status !== "allowed") {
        errors.push(`${definition.id}: approved Magician-eligible target is not allowed`);
      }
      if (redirectNeedsRulingTokenIds.includes(definition.id) && mechanisms.some((mechanism) => redirectPolicy[mechanism]?.status !== "needsRuling")) {
        errors.push(`${definition.id}: unresolved redirect interaction must remain mechanism-specific needsRuling`);
      }
      if (["haze-curse", "foresight-curse"].includes(definition.id)) {
        const targetCopy = [...definition.requiredChoices, definition.guidedTask?.instruction || ""].join(" ");
        if (/\bowned\b/i.test(targetCopy)) errors.push(`${definition.id}: unsupported owned-Pokemon restriction`);
        if (definition.targetControllerRelation !== "anyPlayer") errors.push(`${definition.id}: target-controller relationship must allow any player's Active Roster anchors`);
      }
      if (definition.id === "lingering-aroma") {
        const mechanic = definition.mechanicContract;
        if (definition.runtimeImplementationStatus !== runtimeImplementationStatuses.VERIFIED_COMPLETE
          || definition.runtimeUsability !== runtimeUsabilityStatuses.USABLE
          || mechanic.exactOngoingEffectRecordRequired !== true || mechanic.mustBenefitActingPlayer !== true
          || mechanic.removeOriginalEffect !== true || mechanic.originalBehaviorStopsApplying !== true
          || mechanic.declarationCostAmount !== 500 || mechanic.declarationCostTiming !== "confirmedDeclaration"
          || mechanic.declarationCostPaidOncePerDeclaration !== true || mechanic.selfTargetExempt !== true
          || mechanic.provisionalWithdrawalPaysNothing !== true || mechanic.confirmedCostSurvivesNegationRedirectOrNoEffect !== true
          || mechanic.preserveSourceOwnerDurationExpirationIdentity !== true || mechanic.expiresWithOriginalEffect !== true) {
          errors.push(`${definition.id}: incomplete Ongoing Effect text-replacement contract`);
        }
      }
      if (definition.id === "cold-wave") {
        const mechanic = definition.mechanicContract;
        if (definition.applicationScope !== "tableWide" || mechanic.operation !== "suppressBehaviorWithoutRemovingRecord"
          || mechanic.eligibleClassificationField !== "isOngoingEffect" || mechanic.eligibleClassificationValue !== true
          || mechanic.preservesOwnerSourceDurationExpirationIdentity !== true
          || mechanic.restoreSurvivingEffectsAtGymEnd !== true || mechanic.reviveNaturallyExpiredEffects !== false) {
          errors.push(`${definition.id}: incomplete table-wide suppression contract`);
        }
      }
      if (definition.id === "counterspell") {
        const mechanic = definition.mechanicContract;
        if (!definition.isResponse || mechanic.requiresOwnedActivatedTokenNegated !== true
          || mechanic.originalTokenRemainsNegated !== true || mechanic.restoreExactTokenInventoryRecord !== true
          || mechanic.cooldownGyms !== 2 || mechanic.cooldownScope !== "exactRestoredToken"
          || mechanic.visibleWhileUnusable !== true || mechanic.explicitConsumptionException !== true) {
          errors.push(`${definition.id}: incomplete exact-Token restoration/cooldown contract`);
        }
      }
      if (definition.id === "seven-tools") {
        const mechanic = definition.mechanicContract;
        if (!definition.effectTags.includes("Negate") || !definition.effectTags.includes("Copy")
          || !definition.isResponse || mechanic.respondsOnlyToProtectionTokenActivation !== true
          || mechanic.negateTargetProtection !== true || mechanic.temporaryCopyCount !== 1
          || mechanic.permanentInventory !== false || mechanic.expiresAtEndOfCurrentGym !== true
          || mechanic.safeguardCopyProtectionMustBeChecked !== true || mechanic.copyModelIsTokenSpecific !== true
          || mechanic.atomicResolutionRequired !== true || definition.runtimeUsability !== runtimeUsabilityStatuses.USABLE
          || definition.runtimeImplementationStatus !== runtimeImplementationStatuses.VERIFIED_COMPLETE) {
          errors.push(`${definition.id}: incomplete Protection-negation/temporary-copy contract`);
        }
      }
      if (definition.id === "smokescreen") {
        const mechanic = definition.mechanicContract;
        if (definition.resolverId !== "smokescreenRedirect" || mechanic.targetOperation !== "replaceOneCorrespondingTarget"
          || mechanic.wheelIncludesEveryPlayerExactlyOnce !== true || mechanic.originalPlayerResultKeepsTarget !== true
          || mechanic.noLegalCorrespondingTargetHandling !== "keepOriginalTarget" || mechanic.redirectReplacement !== true
          || definition.runtimeUsability !== runtimeUsabilityStatuses.GUIDED_ONLY) {
          errors.push(`${definition.id}: incomplete replacement-style Smokescreen contract`);
        }
      }
      if (definition.id === "follow-me") {
        const mechanic = definition.mechanicContract;
        if (mechanic.initialRedirectOperation !== "replaceOneCorrespondingTarget"
          || mechanic.excludesGlobalAndTargetlessEffects !== true
          || mechanic.ongoingEffectBeginsAfterRedirectedParentResolves !== true
          || mechanic.copyEachLaterTokenUsedByRecordedPlayer !== true || mechanic.copySemanticsStatus !== "settled"
          || definition.copyActivationMode !== copyActivationModes.FOLLOW_ME
          || mechanic.copiedTokenAddedToInventory !== true || mechanic.copiesOnlyRealInventoryConsumption !== true
          || definition.copyActivationPolicy?.copiedActivationsCannotBeCopied !== true
          || definition.runtimeUsability !== runtimeUsabilityStatuses.USABLE) {
          errors.push(`${definition.id}: incomplete redirect plus Gym-long Copy contract`);
        }
      }
      if (definition.id === "after-you") {
        const immunity = afterYouProtectionInteractionFor("immunity");
        const sevenTools = afterYouProtectionInteractionFor("seven-tools");
        if (definition.runtimeUsability !== runtimeUsabilityStatuses.USABLE
          || definition.mechanicContract?.protectionInteractionMatrixRequired !== true
          || immunity.supported !== true || immunity.negatesOriginal !== true
          || sevenTools.supported !== false) {
          errors.push(`${definition.id}: incomplete explicit Protection interaction matrix`);
        }
      }
      if (definition.id === "foresight-curse") {
        const mechanic = definition.mechanicContract;
        if (definition.visibility !== "sourcePlayerOnly" || definition.effectClassification !== "privateInformationMarkerNotDebuff"
          || mechanic.selectionCount !== 6 || mechanic.revealOnlyToSourcePlayer !== true || mechanic.publicReveal !== false
          || mechanic.nerfOrDebuff !== false || mechanic.removableByClearSmog !== false
          || mechanic.removableByGenericNerfRemoval !== false || mechanic.ownedPokemonRestriction !== false
          || mechanic.unauthorizedViewsMustNotReceiveOrRenderSetData !== true
          || mechanic.authorizedViewer !== "sourcePlayer" || mechanic.unauthorizedViewers !== "everyOtherPlayer"
          || mechanic.clientSideHidingSufficient !== false || mechanic.sharedStatePayloadMayContainSetData !== false
          || definition.runtimeUsability !== runtimeUsabilityStatuses.BLOCKED) {
          errors.push(`${definition.id}: incomplete private non-debuff reveal contract`);
        }
      }
      if (definition.id === "purge-curse" && /targeted player's Battle Phase/i.test(definition.hostTask?.instruction || "")) {
        errors.push(`${definition.id}: host task uses the obsolete targeted player's Battle Phase wording`);
      }
      if (definition.runtimeImplementationStatus === runtimeImplementationStatuses.VERIFIED_COMPLETE) {
        const verification = runtimeVerificationById[definition.id];
        if (!verification) errors.push(`${definition.id}: verifiedComplete lacks a verification-registry entry`);
        if (!Array.isArray(verification?.tests) || !verification.tests.length) errors.push(`${definition.id}: verifiedComplete lacks named registered tests`);
        (verification?.tests || []).forEach((testId) => {
          if (!registeredRuntimeVerificationTests.includes(testId)) errors.push(`${definition.id}: unknown verification test ID ${testId}`);
        });
        if (!String(verification?.evidence || "").trim()) errors.push(`${definition.id}: verifiedComplete evidence is empty`);
        if (!String(verification?.verifiedAt || "").trim()) errors.push(`${definition.id}: verifiedComplete verifiedAt is empty`);
        if (verification?.contractDefinitionRevision !== contractDefinitionRevision) {
          errors.push(`${definition.id}: verification predates the current contract definition revision`);
        }
      }
    });
    Object.entries(runtimeVerificationById).forEach(([tokenId, verification]) => {
      if (!byId[tokenId]) errors.push(`${tokenId}: verification registry references an unknown Token`);
      if (verification?.status !== runtimeImplementationStatuses.VERIFIED_COMPLETE) errors.push(`${tokenId}: verification registry status must be verifiedComplete`);
    });
    return errors;
  }

  return Object.freeze({
    schemaVersion: 6,
    contractDefinitionRevision,
    resolverModes,
    runtimeImplementationStatuses,
    runtimeUsabilityStatuses,
    copyActivationModes,
    copyActivationPolicyFor,
    afterYouProtectionInteractionMatrix,
    afterYouProtectionInteractionFor,
    registeredRuntimeVerificationTests,
    runtimeVerificationById,
    legalTimingValues,
    legalControlContextValues,
    ordinaryControlContexts,
    legacyControlTimingWindows,
    phaseBoundaryProcedureValues,
    targetTypes,
    targetScopes,
    applicationScopes,
    targetControllerRelations,
    redirectPolicyStatuses,
    registeredResolverIds,
    finalResults,
    definitions: byId,
    list: Object.freeze(effectiveDefinitions),
    definitionFor,
    inventoryDefinitionFor,
    activationUsabilityFor,
    runtimeResultSafetyFor,
    validate
  });
});
