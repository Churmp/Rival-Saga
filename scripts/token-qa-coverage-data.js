"use strict";

const COVERAGE_REVISION = "2026-07-29-settled-copy-and-curse-runtime-v2";

const FLAGS_NONE = Object.freeze({
  reload: false,
  undo: false,
  sandboxDiscard: false,
  sandboxCommit: false,
  teambuilder: false
});

function scenario(config) {
  return {
    coverage: "Not Covered",
    level: "Manual-only",
    testFile: "None",
    testId: "None",
    setup: "No executable setup exists.",
    action: "No automated action exists.",
    expected: "The intended gameplay result is not asserted automatically.",
    assertions: ["None; this scenario has no executable result-level assertions."],
    flags: FLAGS_NONE,
    gaps: "A result-level automated scenario is required.",
    ...config,
    flags: { ...FLAGS_NONE, ...(config.flags || {}) }
  };
}

function requirement(name, coverage, evidence, gap = "") {
  return { name, coverage, evidence, gap };
}

function staticOnlyToken(tokenId, gap) {
  return {
    tokenId,
    requirements: [
      requirement("Declared gameplay result", "Static Only", "Contract and runtime wiring only", "No executable result-level Token scenario exists.")
    ],
    scenarios: [scenario({
      id: `${tokenId.toUpperCase()}-STATIC`,
      name: "Current runtime path inventory",
      coverage: "Static Only",
      level: "Static Wiring",
      setup: "Load the Token contract and inspect the registered runtime path.",
      action: "Confirm that the Token has a catalog definition and a resolver/wiring declaration.",
      expected: "The report records the path without claiming that its gameplay result works.",
      assertions: ["No gameplay-state assertion exists for this Token."],
      gaps: gap
    })]
  };
}

function settledResolverCoverage({
  tokenId,
  behavior,
  testId,
  expected,
  assertions,
  gap,
  browserTestId = "",
  browserExpected = "",
  browserAssertions = [],
  browserUndoCovered = false,
  integrationTestId = "",
  integrationTestFile = "scripts/test-token-controller-integration.js",
  integrationRequirement = "Controller declaration, persistence, and undo",
  integrationSetup = "Declare the owned exact Token through the scenario controller and persist the result through a temporary backend.",
  integrationAction = "Resolve, reload, verify the authoritative effect record, and undo the exact activation.",
  integrationFlags = {},
  integrationExpected = "",
  integrationAssertions = []
}) {
  const browserCoverage = browserTestId ? "Covered" : "Not Covered";
  const persistenceCoverage = browserUndoCovered ? "Covered" : browserTestId ? "Partially Covered" : "Not Covered";
  return {
    tokenId,
    requirements: [
      requirement(behavior, "Partially Covered", testId, gap),
      ...(integrationTestId ? [requirement(integrationRequirement, "Covered", integrationTestId)] : []),
      requirement("Production browser lifecycle", browserCoverage, browserTestId || "None", browserTestId ? gap : "A destructive production-browser scenario has not been approved for this slice."),
      requirement("Refresh and administrative undo", persistenceCoverage, browserTestId || "None", browserUndoCovered
        ? "The production browser scenario covers backend refresh and History undo."
        : browserTestId
          ? "The production browser scenario covers backend refresh; effect-specific administrative undo remains a separate evidence gap."
          : "The pure resolver snapshot is covered where applicable; the production UI lifecycle still needs focused evidence.")
    ],
    scenarios: [
      scenario({
        id: `${tokenId.toUpperCase()}-SETTLED-001`,
        name: behavior,
        coverage: "Partially Covered",
        level: "Unit",
        testFile: "scripts/test-settled-token-rulings.js",
        testId,
        setup: "Create the smallest isolated state required by the settled mechanic contract.",
        action: "Run the pure resolver or contract-safety boundary.",
        expected,
        assertions,
        gaps: gap
      }),
      ...(integrationTestId ? [scenario({
        id: `${tokenId.toUpperCase()}-INTEGRATION-001`,
        name: `${behavior} through the scenario controller`,
        coverage: "Covered",
        level: "Integration",
        testFile: integrationTestFile,
        testId: integrationTestId,
        setup: integrationSetup,
        action: integrationAction,
        expected: integrationExpected,
        assertions: integrationAssertions,
        flags: integrationFlags,
        gaps: gap
      })] : []),
      ...(browserTestId ? [scenario({
        id: `${tokenId.toUpperCase()}-BROWSER-001`,
        name: `${behavior} in the production browser runtime`,
        coverage: "Covered",
        level: "Browser",
        testFile: "scripts/test-token-browser.js",
        testId: browserTestId,
        setup: "Load the production app against an isolated temporary authoritative backend.",
        action: "Complete the production flow, persist it, refresh, and inspect its terminal behavior.",
        expected: browserExpected,
        assertions: browserAssertions,
        gaps: gap
      })] : [])
    ]
  };
}

function settledBatchCoverage({
  tokenId,
  behavior,
  testId,
  expected,
  assertions,
  gap,
  browserTestId = "",
  browserRequirement = "Production browser lifecycle",
  browserAction = "Resolve the interaction, persist it, refresh, and inspect exact inventory and chain state.",
  browserExpected = "",
  browserAssertions = [],
  browserPersistenceCovered = Boolean(browserTestId)
}) {
  return {
    tokenId,
    requirements: [
      requirement(behavior, "Partially Covered", testId, gap),
      requirement(browserRequirement, browserTestId ? "Covered" : "Not Covered", browserTestId || "None", browserTestId ? gap : "No effect-specific production browser scenario exists yet."),
      requirement("Refresh and duplicate completion", browserPersistenceCovered ? "Covered" : "Not Covered", browserPersistenceCovered ? browserTestId : "None", browserPersistenceCovered ? gap : "Pure resolver identity and undo are covered where noted; production refresh remains unverified.")
    ],
    scenarios: [
      scenario({
        id: `${tokenId.toUpperCase()}-BATCH-001`,
        name: behavior,
        coverage: "Partially Covered",
        level: "Unit",
        testFile: "scripts/test-settled-effect-batch.js",
        testId,
        setup: "Create the smallest isolated state needed for the settled exact-record mechanic.",
        action: "Run the canonical resolver and inspect exact identities, mutations, and fail-closed boundaries.",
        expected,
        assertions,
        gaps: gap
      }),
      ...(browserTestId ? [scenario({
        id: `${tokenId.toUpperCase()}-BROWSER-001`,
        name: `${behavior} through the production Live Referee`,
        coverage: "Covered",
        level: "Browser",
        testFile: "scripts/test-token-browser.js",
        testId: browserTestId,
        setup: "Load the production app against an isolated temporary authoritative backend.",
        action: browserAction,
        expected: browserExpected,
        assertions: browserAssertions,
        flags: { reload: browserPersistenceCovered },
        gaps: gap
      })] : [])
    ]
  };
}

function standardCurseCoverage({ tokenId, effectName, effectTestId, effectExpected, effectAssertions }) {
  return {
    tokenId,
    requirements: [
      requirement("Exact Active Roster declaration anchor owned by any player", "Covered", "SCL-001 and SCL-002"),
      requirement("Species-wide application to every matching Active Roster instance", "Covered", "SCL-003 through SCL-006"),
      requirement("Non-Active and stale targets fail safely before mutation", "Covered", "SCL-002 and SCL-008"),
      requirement(effectName, "Covered", effectTestId),
      requirement("Arena Trap Curse immunity and Substitute exclude exact matches independently", "Covered", "SCL-004"),
      requirement("Canonical owned-token picker exposes the Curse during its Sabotage window", "Covered", "BROWSER-007"),
      requirement("Causal result preserves the selected anchor plus affected and protected exact instances", "Covered", "SCL-003 through SCL-006"),
      requirement("Two-Gym phase-anchored expiration", "Covered", "SCL-007 and BROWSER-006"),
      requirement("Duplicate completion and undo", "Covered", "SCL-008"),
      requirement("Backend reload and visible browser refresh", "Covered", "SCL-009 and BROWSER-006"),
      requirement("Sandbox isolation and discard", "Covered", "TSB-023")
    ],
    scenarios: [
      scenario({
        id: `${tokenId.toUpperCase()}-TARGET-001`,
        name: "Exact Active Roster anchor and pre-consumption rejection",
        coverage: "Covered",
        level: "Unit",
        testFile: "scripts/test-standard-curse-tokens.js",
        testId: "SCL-002",
        setup: "The source has own and rival Active Roster Pokemon plus a Legacy record and duplicate species with stable IDs.",
        action: "Declare a standard Curse against legal own/rival records and reject the non-Active record.",
        expected: "Only exact Active Roster instances may anchor the declaration and rejection does not consume a Token.",
        assertions: ["Selected target type is rosterInstance.", "Application scope is globalSpecies.", "Controller relation is anyPlayer.", "The Legacy target is rejected before consumption."]
      }),
      scenario({
        id: `${tokenId.toUpperCase()}-EFFECT-001`,
        name: effectName,
        coverage: "Covered",
        level: "Unit",
        testFile: "scripts/test-standard-curse-tokens.js",
        testId: effectTestId,
        setup: "Duplicate matching Active Roster Pokemon across players have configured Teambuilder sets.",
        action: `Resolve ${tokenId} and calculate the effective build.`,
        expected: effectExpected,
        assertions: effectAssertions,
        flags: { teambuilder: true }
      }),
      scenario({
        id: `${tokenId.toUpperCase()}-PROTECTION-001`,
        name: "Arena immunity and Substitute protect matching exact instances independently",
        coverage: "Covered",
        level: "Unit",
        testFile: "scripts/test-standard-curse-tokens.js",
        testId: "SCL-004",
        setup: "Matching Active Roster Pokemon include one Arena Trapped instance, one Substitute instance, and one unprotected instance.",
        action: "Declare a standard species-wide Curse from one legal exact anchor.",
        expected: "Each protected instance is excluded independently while the unprotected matching instance is affected.",
        assertions: ["Arena immunity is preserved.", "Only the matching Substitute becomes consumed.", "Protected exact IDs are excluded.", "The unprotected matching ID remains affected."]
      }),
      scenario({
        id: `${tokenId.toUpperCase()}-DURATION-001`,
        name: "Two-Gym phase-anchored expiration",
        coverage: "Covered",
        level: "Unit",
        testFile: "scripts/test-standard-curse-tokens.js",
        testId: "SCL-007",
        setup: "A standard Curse resolves during Kanto Gym 1 Action Phase.",
        action: "Advance first to Gym 3 Start and then Gym 3 Action Phase.",
        expected: "The Curse remains active before its matching phase and expires exactly at the matching phase boundary.",
        assertions: ["Gym 3 Start does not expire the status.", "Gym 3 Action expires exactly that status."]
      }),
      scenario({
        id: `${tokenId.toUpperCase()}-RECOVERY-001`,
        name: "Stale-target refund, duplicate completion, and undo",
        coverage: "Covered",
        level: "Integration",
        testFile: "scripts/test-standard-curse-tokens.js",
        testId: "SCL-008",
        setup: "Separate declarations become stale, complete twice, and resolve before undo.",
        action: "Attempt each completion and restore the declaration snapshot.",
        expected: "Stale failure refunds once, duplicate completion is inert, and undo restores the exact pre-declaration state.",
        assertions: ["Stale failure refunds exactly once.", "Second completion is rejected.", "Undo removes the exact status and restores inventory."],
        flags: { undo: true }
      }),
      scenario({
        id: `${tokenId.toUpperCase()}-BROWSER-007`,
        name: "Canonical Sabotage picker authority",
        coverage: "Covered",
        level: "Browser",
        testFile: "scripts/test-token-browser.js",
        testId: "BROWSER-007",
        setup: "The production Live Referee inventory contains real Curse records alongside category, Field-placeholder, blocked, development-only, and illegal-timing records.",
        action: "Open the Token picker during the explicit Sabotage Curse window.",
        expected: "Only canonical owned usable Curses appear, with quantities counted from exact inventory records.",
        assertions: ["The Curse appears under a non-selectable category heading.", "Protection Token and legacy Electric/Grassy Field placeholders are absent.", "Blocked, development-only, and illegal-timing records are absent.", "An empty legal inventory renders the clean empty state."],
        flags: { reload: true }
      }),
      scenario({
        id: `${tokenId.toUpperCase()}-BROWSER-006`,
        name: "Visible standard Curse enforcement survives refresh and expires cleanly",
        coverage: "Covered",
        level: "Browser",
        testFile: "scripts/test-token-browser.js",
        testId: "BROWSER-006",
        setup: "The isolated Chromium scenario gives Steevee all five standard Curses and configured exact roster-instance sets.",
        action: "Resolve all five Curses through visible controls, complete Silencing repair, refresh, expire at the phase anchor, and refresh again.",
        expected: "All five effective restrictions persist without erasing configured data, then all five expire and restore the configured view.",
        assertions: ["Five active statuses survive refresh.", "Forced item and Imprison overlays are visible.", "Silencing repair remains completed.", "Zero active statuses remain after expiration and refresh."],
        flags: { reload: true, teambuilder: true }
      }),
      scenario({
        id: `${tokenId.toUpperCase()}-SANDBOX-023`,
        name: "Standard Curse stays isolated in the Token sandbox",
        coverage: "Covered",
        level: "Integration",
        testFile: "scripts/test-token-sandbox.js",
        testId: "TSB-023",
        setup: "A configured exact roster instance and Flame Curse Token are cloned into a sandbox session.",
        action: "Resolve the Curse, prepare a commit candidate, then discard to the authoritative baseline.",
        expected: "The working state and candidate contain one exact status and consumption while discard restores zero statuses and the configured item.",
        assertions: ["The real baseline remains byte-identical during resolution.", "The commit candidate retains the exact Curse.", "Discard removes the status and consumption."],
        flags: { sandboxDiscard: true, teambuilder: true },
        gaps: "General idempotent server commit behavior remains covered by shared TSB-019 through TSB-021 infrastructure."
      })
    ]
  };
}

const tokens = [
  {
    tokenId: "restrict-token",
    requirements: [
      requirement("Normal global Restrict", "Covered", "TCI-001"),
      requirement("Rage-protected exact instance remains legal", "Covered", "TCI-004 and BROWSER-001"),
      requirement("Ordinary matching instances become illegal", "Covered", "TCI-004 and BROWSER-001"),
      requirement("Immunity negation prevents mutation", "Covered", "TCI-003"),
      requirement("Immunity uses a structured negated causal result", "Covered", "TRS-002"),
      requirement("Unban protection blocks Restrict", "Covered", "TCI-001"),
      requirement("Reload", "Covered", "TCI-004 and BROWSER-001"),
      requirement("Undo", "Covered", "TCI-004"),
      requirement("Sandbox discard", "Covered", "TSB-019"),
      requirement("Sandbox commit", "Covered", "TSB-019")
    ],
    scenarios: [
      scenario({
        id: "RST-001",
        name: "Global Restrict honors exact Rage immunity",
        coverage: "Covered",
        level: "Unit",
        testFile: "scripts/test-control-token-foundation.js",
        testId: "TCF-012",
        setup: "Gold and Red each own a Garchomp. Gold's exact instance receives Rage Candy Bar.",
        action: "Resolve species-wide Restrict for Garchomp after computing Rage immunity and Substitute interception.",
        expected: "Gold's Rage-protected instance remains legal while Red's matching instance becomes illegal.",
        assertions: [
          "rageImmuneRosterInstanceIds equals [gold-garchomp].",
          "The Restrict resolver returns resolved.",
          "battleLegality(gold-garchomp).legal is true.",
          "battleLegality(red-garchomp).legal is false.",
          "The unused Substitute remains active."
        ],
        gaps: "Does not assert exact Restrict source metadata, duration, inventory consumption, reload, undo, or controller persistence."
      }),
      scenario({
        id: "RST-002",
        name: "Instance-scoped Restrict foundation does not become global",
        coverage: "Covered",
        level: "Unit",
        testFile: "scripts/test-control-token-foundation.js",
        testId: "TCF-013",
        setup: "Gold and Red each own a Garchomp.",
        action: "Create a one-Gym submitted-team instance restriction for Gold's exact record.",
        expected: "Only Gold's selected roster instance is illegal.",
        assertions: [
          "The instance restriction returns resolved.",
          "battleLegality(gold-garchomp).legal is false.",
          "battleLegality(red-garchomp).legal is true."
        ],
        gaps: "This is shared scope infrastructure, not a declaration of the normal Restrict Token."
      }),
      scenario({
        id: "RST-003",
        name: "Controller Restrict ordering, exact exemptions, reload, and undo",
        coverage: "Covered",
        level: "Integration",
        testFile: "scripts/test-token-controller-integration.js",
        testId: "TCI-004",
        setup: "Red's exact Garchomp receives Substitute; a second Red Garchomp and Gold's matching Garchomp remain unprotected.",
        action: "Declare and resolve Restrict through the controller, persist it to the backend, reload it, and invoke controller undo.",
        expected: "Only the exact substituted instance is exempt; all other matches are illegal; reload and undo preserve exact state.",
        assertions: [
          "The directly affected player receives first response priority.",
          "The exact Substitute is consumed and stored in excludedRosterInstanceIds.",
          "Other matching instances become illegal.",
          "Backend reload preserves the exclusion and consumed attachment.",
          "Controller undo removes Restrict, restores Substitute, and restores provisional inventory."
        ],
        flags: { reload: true, undo: true },
        gaps: "Full Live Referee multiplayer identity and universal Token lifecycle remain outside this integration scenario."
      }),
      scenario({
        id: "RST-004",
        name: "Immunity resolves before Substitute and parent mutation",
        coverage: "Covered",
        level: "Integration",
        testFile: "scripts/test-token-controller-integration.js",
        testId: "TCI-003",
        setup: "Red's targeted Garchomp has Substitute and Red owns Immunity.",
        action: "Declare Restrict, confirm Red has response priority, and respond with Immunity.",
        expected: "Immunity negates Restrict before Substitute interception or global mutation.",
        assertions: [
          "The event resolves as negated-by-immunity.",
          "No Restrict status or global rule is created.",
          "Substitute remains active.",
          "Immunity inventory is consumed under the provisional policy."
        ],
        gaps: "Not exercised through the full production Live Referee DOM."
      }),
      scenario({
        id: "RST-RESULT-001",
        name: "Structured Immunity negation result",
        coverage: "Covered",
        level: "Unit",
        testFile: "scripts/test-token-result-summary.js",
        testId: "TRS-002",
        setup: "Restrict and its responding Immunity have both been confirmed and consumed.",
        action: "Build the final structured result and compact causal chain.",
        expected: "Immunity is the resolving response, Restrict is negated rather than canceled, no Restrict mutation is created, and both consumptions remain recorded.",
        assertions: [
          "Final outcome is negated and resolvedByEffectId identifies Immunity.",
          "Original and responding actors are both retained.",
          "The summary says no Restrict was created and both Tokens remain consumed.",
          "The compact chain contains the original effect, response, and final result without pass entries."
        ],
        gaps: "Production DOM rendering reads this structure, but this scenario asserts the result module directly."
      }),
      scenario({
        id: "RST-BROWSER-001",
        name: "Visible Rage, Restrict, and Unban browser flow",
        coverage: "Covered",
        level: "Browser",
        testFile: "scripts/test-token-browser.js",
        testId: "BROWSER-001",
        setup: "Open the isolated browser QA screen with Gold and Red owning matching Garchomp.",
        action: "Click visible Rage Candy Bar and Restrict controls, refresh, use Unban, attempt both protected effects, and refresh again.",
        expected: "The visible legality and status results update after each action and survive refresh without browser errors.",
        assertions: [
          "Gold remains visibly Legal while Red becomes Illegal after Restrict.",
          "Restrict count becomes one, then zero after Unban.",
          "Unban protection count is one after refresh.",
          "Visible Restrict and Extra Ban retries both read Rejected.",
          "No uncaught exception, console error, or browser log error is recorded."
        ],
        flags: { reload: true },
        gaps: "Uses the isolated QA screen rather than a full five-player Live Referee session."
      }),
      scenario({
        id: "RST-SANDBOX-001",
        name: "Real controller sandbox discard and single authoritative commit",
        coverage: "Covered",
        level: "Integration",
        testFile: "scripts/test-token-sandbox.js",
        testId: "TSB-019",
        setup: "Seed a real temporary backend at revision one and enter a revision-bound Token Scenario Sandbox.",
        action: "Resolve Restrict once and discard, then repeat and commit the prepared candidate once.",
        expected: "Discard leaves authoritative state unchanged; commit persists exactly one Restrict mutation with no testing flags.",
        assertions: [
          "Authoritative revision and Token arrays remain unchanged during and after discard.",
          "Commit advances the backend exactly one revision.",
          "Exactly one Restrict status, consumption, and activation persist.",
          "A duplicate session commit is idempotent and creates no duplicate records."
        ],
        flags: { reload: true, sandboxDiscard: true, sandboxCommit: true },
        gaps: "The universal post-negation consumption ruling remains provisional."
      })
    ]
  },
  {
    tokenId: "unban-token",
    requirements: [
      requirement("Removes Restrict", "Covered", "TCI-001 and BROWSER-001"),
      requirement("Removes Ban", "Covered", "TCI-002"),
      requirement("Creates six-Gym protection", "Covered", "TCI-001 and BROWSER-001"),
      requirement("Blocks new Restrict", "Covered", "TCI-001"),
      requirement("Blocks new Extra Ban", "Covered", "TCI-001"),
      requirement("Mirrored status expires with structured protection", "Covered", "TCI-001"),
      requirement("Reload", "Covered", "TCI-001 and BROWSER-001"),
      requirement("Undo", "Covered", "TCI-001")
    ],
    scenarios: [
      scenario({
        id: "UNB-001",
        name: "Restrict removal, protection, mirror expiration, reload, and undo",
        coverage: "Covered",
        level: "Integration",
        testFile: "scripts/test-token-controller-integration.js",
        testId: "TCI-001",
        setup: "Resolve a sourced two-Gym Garchomp Restrict, then declare Unban through the controller.",
        action: "Assert the result, reject protected redeclarations, persist/reload, undo, and advance to the six-Gym expiration.",
        expected: "Unban creates one structured protection and one linked mirror that block both effect families and expire together.",
        assertions: [
          "Restrict is removed and all matching Garchomp become legal.",
          "Exactly one six-Gym protection and linked Unbanned mirror exist.",
          "Restrict and Extra Ban fail before consumption while unrelated species remain targetable.",
          "Backend reload preserves source linkage.",
          "Undo restores Restrict and provisional inventory; expiration normalizes the mirror with the same status ID."
        ],
        flags: { reload: true, undo: true },
        gaps: "Final universal inventory handling after all negation/cancellation outcomes remains unsettled."
      }),
      scenario({
        id: "UNB-002",
        name: "Universal Ban removal uses the same protection contract",
        coverage: "Covered",
        level: "Integration",
        testFile: "scripts/test-token-controller-integration.js",
        testId: "TCI-002",
        setup: "Resolve Extra Ban on Lucario without Substitute interception.",
        action: "Declare and resolve Unban for Lucario.",
        expected: "The universal Ban is removed and the same six-Gym species protection is created.",
        assertions: [
          "The Ban status ID is listed in removedStatusIds.",
          "All matching Lucario become legal.",
          "Exactly one Unban protection remains active.",
          "The global mirror status is Unbanned."
        ],
        gaps: "No separate full Live Referee browser path starts from Ban in this scenario."
      }),
      scenario({
        id: "UNB-BROWSER-001",
        name: "Visible Unban result and backend refresh",
        coverage: "Covered",
        level: "Browser",
        testFile: "scripts/test-token-browser.js",
        testId: "BROWSER-001",
        setup: "Use the isolated QA screen to apply Rage and Restrict to matching Garchomp.",
        action: "Click Use Unban, click Try Protected Effects, and refresh the browser from the persisted backend revision.",
        expected: "Both matching Pokemon are visibly legal and one Unban protection remains after refresh.",
        assertions: [
          "Visible Restrict count changes from one to zero.",
          "Visible Unban protection count changes to one.",
          "Both legality rows read Legal after refresh.",
          "Restrict and Extra Ban retries both read Rejected.",
          "No browser errors are recorded."
        ],
        flags: { reload: true },
        gaps: "The isolated screen does not prove a real multiplayer account-to-profile authorization path."
      })
    ]
  },
  {
    tokenId: "rage-candy-bar",
    requirements: [
      requirement("Owned target only", "Not Covered", "None", "The current test uses a legal owner but never attempts an illegal owner."),
      requirement("+3 levels", "Covered", "TCI-006"),
      requirement("+252 EV cap", "Covered", "TCI-006"),
      requirement("Restrict immunity", "Covered", "TCI-004 and BROWSER-001"),
      requirement("Shared two-Gym duration", "Covered", "TCF-014"),
      requirement("Reuse adds two Gyms", "Covered", "TCF-014"),
      requirement("Bonuses do not stack", "Covered", "TCF-014"),
      requirement("Full enhancement expires together", "Covered", "TCF-014"),
      requirement("Clear Smog removes stat buffs correctly", "Covered", "TCI-006 and BROWSER-003"),
      requirement("Reload", "Covered", "TCI-006 and BROWSER-003"),
      requirement("Undo", "Not Covered", "None")
    ],
    scenarios: [
      scenario({
        id: "RCB-001",
        name: "Shared Rage enhancement extends without stacking",
        coverage: "Covered",
        level: "Unit",
        testFile: "scripts/test-control-token-foundation.js",
        testId: "TCF-014",
        setup: "Gold owns one Garchomp at Kanto Gym 1.",
        action: "Resolve Rage Candy Bar, resolve it again at Gym 2, then advance to its start-of-Gym expiration.",
        expected: "One composite status lasts two Gyms, reuse extends it to four without duplicate buffs, and all benefits expire together.",
        assertions: [
          "Initial durationGyms is 2.",
          "Exactly two non-permanent buffs reference the same sourceStatusId.",
          "Reuse reports extended and keeps the same status ID.",
          "Extended durationGyms is 4 and the buff count remains 2.",
          "At Gym 5 Restrict immunity is false, both buffs are expired, and visible buff labels are empty."
        ],
        gaps: "Exact +3 and +252 values, inventory delta, reload, undo, and controller persistence are not asserted."
      }),
      scenario({
        id: "RCB-002",
        name: "Rage immunity precedes Substitute interception",
        coverage: "Covered",
        level: "Unit",
        testFile: "scripts/test-control-token-foundation.js",
        testId: "TCF-012",
        setup: "Gold's Garchomp has Rage Candy Bar and an active Substitute; Red owns a matching Garchomp.",
        action: "Declare species-wide Restrict.",
        expected: "Rage immunity exempts Gold before Substitute is considered, preserving the Substitute.",
        assertions: [
          "rageImmuneRosterInstanceIds equals [gold-garchomp].",
          "Gold's Substitute status remains active.",
          "Gold is legal and Red is illegal after Restrict."
        ],
        gaps: "No Live Referee or persisted inventory assertion."
      }),
      scenario({
        id: "RCB-003",
        name: "Real Rage enhancement before Clear Smog",
        coverage: "Covered",
        level: "Integration",
        testFile: "scripts/test-token-controller-integration.js",
        testId: "TCI-006",
        setup: "Resolve Rage Candy Bar through the controller, then add exact and player-wide move grants.",
        action: "Resolve Clear Smog, save/reload backend state, and undo Clear Smog.",
        expected: "The exact +3/+252 records are removed and restored precisely without deleting the timed immunity status or unrelated data.",
        assertions: [
          "Rage creates levelBonus 3 and evCapBonus 252 records.",
          "Clear Smog removes both exact records and the exact move grant.",
          "Restrict immunity remains active under the approved composite-status behavior.",
          "Backend reload preserves removal and controller undo restores exact benefits."
        ],
        flags: { reload: true, undo: true },
        gaps: "Rage activation itself is not undone in this scenario."
      }),
      scenario({
        id: "RCB-BROWSER-001",
        name: "Visible Rage legality and Clear Smog results",
        coverage: "Covered",
        level: "Browser",
        testFile: "scripts/test-token-browser.js",
        testId: "BROWSER-003",
        setup: "Open the isolated Arena Trap and Clear Smog browser scenario.",
        action: "Click Rage Candy Bar, then Clear Smog, and refresh backend state.",
        expected: "Two active Rage stat buffs become zero while visible Restrict immunity remains Active.",
        assertions: [
          "The visible Rage buff count is two before Clear Smog.",
          "The visible Rage buff count is zero after Clear Smog and refresh.",
          "Restrict immunity remains visibly Active.",
          "No browser errors are recorded."
        ],
        flags: { reload: true },
        gaps: "No final production HUD duration countdown is asserted."
      })
    ]
  },
  {
    tokenId: "substitute",
    requirements: [
      requirement("Owned target only", "Covered", "TCF-002"),
      requirement("Duplicate placement rejected without consumption", "Covered", "TCI-007"),
      requirement("Instance-target interception", "Covered", "TCF-003"),
      requirement("Multi-instance exemption", "Covered", "TCF-004"),
      requirement("Universal Restrict exact-instance exemption", "Covered", "TCI-004"),
      requirement("Exact-instance Flame Curse interception", "Covered", "TCF-005 and SCL-004"),
      requirement("Selected-target Extra Ban full negation", "Covered", "TCF-007"),
      requirement("Only selected Substitute consumed", "Covered", "TCF-007"),
      requirement("Rage immunity checked before Substitute", "Covered", "TCF-012"),
      requirement("Species-wide exemption result explains exact protection and remaining scope", "Covered", "TRS-004"),
      requirement("Negated parent does not consume Substitute", "Covered", "TCI-003"),
      requirement("Reload", "Covered", "TCI-004 and BROWSER-002"),
      requirement("Undo", "Covered", "TCI-004 and BROWSER-002"),
      requirement("Sandbox discard", "Covered", "TCF-016"),
      requirement("Sandbox commit", "Partially Covered", "TCF-016", "A commit candidate is asserted; a persisted server commit and reload are not.")
    ],
    scenarios: [
      scenario({
        id: "SUB-001",
        name: "Placement ownership and duplicate attachment guard",
        coverage: "Partially Covered",
        level: "Unit",
        testFile: "scripts/test-control-token-foundation.js",
        testId: "TCF-002",
        setup: "Gold owns Garchomp; a mismatched owner and then Gold attempt Substitute placement.",
        action: "Attempt wrong-owner placement, legal placement, and duplicate placement.",
        expected: "Only one exact-instance Substitute attachment exists.",
        assertions: [
          "Wrong-owner placement returns noEffect and creates zero statuses.",
          "Legal placement returns resolved with rosterInstance scope and [gold-garchomp] affected.",
          "Duplicate placement returns noEffect and leaves exactly one active attachment."
        ],
        gaps: "Token inventory difference is not asserted, so duplicate rejection without consumption is not fully proven."
      }),
      scenario({
        id: "SUB-002",
        name: "Exact-instance interception",
        coverage: "Covered",
        level: "Unit",
        testFile: "scripts/test-control-token-foundation.js",
        testId: "TCF-003",
        setup: "Gold's exact Garchomp instance has Substitute.",
        action: "Apply a one-instance Iron Ball-style curse to that record.",
        expected: "Substitute is consumed, only that record is excluded, and the parent is not universally negated.",
        assertions: [
          "Interception result is intercepted.",
          "negateEntireEffect is false.",
          "excludedRosterInstanceIds equals [gold-garchomp].",
          "The attachment status becomes consumed."
        ],
        gaps: "No parent status application or Token inventory assertion."
      }),
      scenario({
        id: "SUB-003",
        name: "Multi-instance effect preserves unprotected targets",
        coverage: "Covered",
        level: "Unit",
        testFile: "scripts/test-control-token-foundation.js",
        testId: "TCF-004",
        setup: "A two-instance effect targets protected gold-garchomp and unprotected red-lucario.",
        action: "Run Substitute interception.",
        expected: "The protected record is excluded while the other selected record remains affected.",
        assertions: [
          "affectedRosterInstanceIds retains both exact IDs.",
          "excludedRosterInstanceIds contains only gold-garchomp.",
          "negateEntireEffect is false."
        ],
        gaps: "No controller persistence or reload assertion."
      }),
      scenario({
        id: "SUB-004",
        name: "One-instance interception consumes only the matching Substitute",
        coverage: "Covered",
        level: "Unit",
        testFile: "scripts/test-control-token-foundation.js",
        testId: "TCF-005",
        setup: "Gold's exact Garchomp has Substitute and a separate matching Garchomp exists elsewhere.",
        action: "Run the low-level one-instance interception path against Gold's record.",
        expected: "Gold's Substitute is consumed and only Gold's record is excluded by this low-level interception payload.",
        assertions: [
          "The selected attachment becomes consumed.",
          "The interception retains only gold-garchomp as its exact affected ID."
        ],
        gaps: "This is a low-level interception case. SCL-004 covers independent exclusions during species-wide standard Curse resolution."
      }),
      scenario({
        id: "SUB-005",
        name: "Selected-anchor Extra Ban consumes only one Substitute",
        coverage: "Covered",
        level: "Unit",
        testFile: "scripts/test-control-token-foundation.js",
        testId: "TCF-007",
        setup: "Gold and Red each have a Garchomp with Substitute.",
        action: "Select Gold's Garchomp as the universal Ban anchor, reload and undo, then repeat with Red selected.",
        expected: "The selected attachment alone is consumed, the Ban is fully negated, the other attachment survives, and reversing the anchor reverses consumption.",
        assertions: [
          "negateEntireEffect is true.",
          "consumedStatusIds contains only the selected attachment ID.",
          "No active Garchomp Ban exists.",
          "JSON reload preserves the unselected active attachment.",
          "Snapshot restore returns both attachments to active.",
          "Reversed selection consumes only Red's attachment."
        ],
        flags: { undo: true },
        gaps: "The serialization assertion is Unit evidence, not backend reload; Token inventory is not asserted."
      }),
      scenario({
        id: "SUB-006",
        name: "Exact interception serialization and snapshot undo",
        coverage: "Covered",
        level: "Unit",
        testFile: "scripts/test-control-token-foundation.js",
        testId: "TCF-015",
        setup: "Red's exact Garchomp has Substitute before a low-level exact-instance interception.",
        action: "Intercept the effect, serialize state, then restore the pre-interception snapshot.",
        expected: "Reload keeps the exact consumed attachment and undo restores Substitute.",
        assertions: [
          "Reloaded Substitute remains consumed for red-garchomp.",
          "Undo restores the Substitute attachment to active."
        ],
        flags: { undo: true },
        gaps: "Uses pure JSON reload and snapshot restore, not backend/browser refresh and Advanced Repair UI."
      }),
      scenario({
        id: "SUB-007",
        name: "Sandbox discard and commit-candidate isolation",
        coverage: "Partially Covered",
        level: "Integration",
        testFile: "scripts/test-control-token-foundation.js",
        testId: "TCF-016",
        setup: "Enter an isolated Token sandbox from a real state with no statuses.",
        action: "Place Substitute in working state, discard, re-enter, place it again, and prepare a commit candidate.",
        expected: "Discard leaves real state untouched and the candidate contains one attachment.",
        assertions: [
          "Real lingeringStatuses remains empty during sandbox work.",
          "After discard the real Pokemon has no Rage effect buffs.",
          "The commit candidate contains exactly one Substitute attachment."
        ],
        flags: { sandboxDiscard: true },
        gaps: "No actual server commit, persisted reload, or exact inventory-consumption assertion."
      }),
      scenario({
        id: "SUB-008",
        name: "Controller ordering is source-inspected only",
        coverage: "Static Only",
        level: "Static Wiring",
        testFile: "scripts/test-control-token-foundation.js",
        testId: "TCF-017",
        setup: "Read app.js as text.",
        action: "Compare the source positions of response negation, Substitute interception, and parent mutation.",
        expected: "The source is ordered negation, interception, then mutation.",
        assertions: ["The three source offsets are ordered and expected state/undo identifiers exist."],
        gaps: "This is not a Live Referee integration or browser test and proves no runtime outcome."
      }),
      scenario({
        id: "SUB-009",
        name: "Controller inventory and duplicate placement",
        coverage: "Covered",
        level: "Integration",
        testFile: "scripts/test-token-controller-integration.js",
        testId: "TCI-007",
        setup: "Gold owns two Substitute inventory records and one eligible Garchomp.",
        action: "Place Substitute once, then attempt duplicate placement with the second exact inventory record.",
        expected: "Exactly one Token, activation, consumption, and attachment exist after the duplicate fails closed.",
        assertions: [
          "First placement removes exactly one Substitute inventory record.",
          "Exactly one activation and consumption are created.",
          "Duplicate placement fails before inventory or activation changes.",
          "The recorded policy is provisional consume on legal declaration."
        ],
        gaps: "Final universal consumption/refund policy remains unresolved."
      }),
      scenario({
        id: "SUB-010",
        name: "Controller Restrict interception reload and undo",
        coverage: "Covered",
        level: "Integration",
        testFile: "scripts/test-token-controller-integration.js",
        testId: "TCI-004",
        setup: "Attach Substitute to one of several matching Garchomp records.",
        action: "Resolve universal Restrict, reload backend state, and invoke controller undo.",
        expected: "Only the exact protected instance is exempt and its attachment is restored by undo.",
        assertions: [
          "Only the exact Substitute is consumed.",
          "Other matching Pokemon remain Restricted.",
          "Backend reload preserves exact exclusion and consumed status.",
          "Controller undo removes Restrict and restores Substitute and inventory."
        ],
        flags: { reload: true, undo: true, teambuilder: true },
        gaps: "No production Advanced Repair click path is asserted."
      }),
      scenario({
        id: "SUB-BROWSER-002",
        name: "Visible selected-target Extra Ban interception and undo",
        coverage: "Covered",
        level: "Browser",
        testFile: "scripts/test-token-browser.js",
        testId: "BROWSER-002",
        setup: "Attach Substitute to Red's and Gold's matching Garchomp through visible browser controls.",
        action: "Click Extra Ban targeting Red, refresh, click visible undo, and refresh again.",
        expected: "Only Red's selected Substitute is consumed, no Ban is created, Gold's remains active, and undo restores Red's.",
        assertions: [
          "Red reads consumed while Gold reads active after Extra Ban and refresh.",
          "Active Ban count is zero and phase protection count is one.",
          "Both attachments read active after visible undo and refresh.",
          "No browser errors are recorded."
        ],
        flags: { reload: true, undo: true },
        gaps: "The browser QA board is isolated from normal multiplayer identity."
      }),
      scenario({
        id: "SUB-RESULT-001",
        name: "Exact-instance exemption result wording",
        coverage: "Covered",
        level: "Unit",
        testFile: "scripts/test-token-result-summary.js",
        testId: "TRS-004",
        setup: "A species-wide Restrict is intercepted by Substitute on one exact owned Pokemon.",
        action: "Build the final structured result and announcement.",
        expected: "The protected owner and instance are named while the remaining matching species scope is explicitly preserved.",
        assertions: [
          "The exact protected roster instance appears in excludedRosterInstanceIds.",
          "The summary names the owner's protected Pokemon.",
          "The summary states that Restrict still resolved against all other matching Pokemon."
        ],
        gaps: "The result module is asserted directly rather than through a five-player production HUD session."
      })
    ]
  },
  {
    tokenId: "arena-trap",
    requirements: [
      requirement("Rival Active-roster instance only and currently legal to bring", "Covered", "TCF-010D, TCI-005, and TCI-005C"),
      requirement("Badge-supported higher-tier targets remain eligible and preserve their minimum Badge assignment", "Covered", "TCF-010D"),
      requirement("Badge-illegal targets fail before mutation or Token consumption", "Covered", "TCF-010D and TCI-005C"),
      requirement("Lower-tier target eligibility is independent from compensation", "Covered", "TCF-010C"),
      requirement("Immediate draft and Battle Team insertion", "Covered", "TCF-010 and BROWSER-003"),
      requirement("Exact instance required in team", "Covered", "TCI-005 and BROWSER-003"),
      requirement("Same-species replacement does not satisfy it", "Covered", "TCI-005 and BROWSER-003"),
      requirement("Curse targeting blocked", "Covered", "TCI-005 and BROWSER-003"),
      requirement("Same-species other instance not protected", "Covered", "TCI-005"),
      requirement("Expiration at mapped post-battle cleanup", "Covered", "TCF-010"),
      requirement("Full team creates mandatory repair without arbitrary deletion", "Covered", "TCF-010B"),
      requirement("Compensation begins at two ordered tier steps below Natural tier and counts Elite tiers", "Covered", "TCF-010C"),
      requirement("Target owner chooses one approved Ability or injectable move", "Covered", "TCF-010E, TCI-005B, and BROWSER-003"),
      requirement("Shared injection bans and class-only explicit overrides", "Covered", "TCF-010F"),
      requirement("Pending compensation blocks Team Lock", "Covered", "TCI-005B and BROWSER-003"),
      requirement("Exact-instance grant appears in the generated set", "Covered", "TCF-010E, TCI-005B, and BROWSER-003"),
      requirement("Exact-instance result names owner, duplicate slot, and compensation state", "Covered", "TRS-001 and TRS-001B"),
      requirement("Reload", "Covered", "TCF-010E, TCI-005, TCI-005B, and BROWSER-003"),
      requirement("Undo", "Covered", "TCF-010E, TCI-005, and TCI-005B"),
      requirement("Stale confirmed declaration cancels and refunds before mutation", "Covered", "TCI-008"),
      requirement("Sandbox discard", "Covered", "TCF-016B and TSB-020"),
      requirement("Sandbox commit exactly once", "Covered", "TCF-016B and TSB-020")
    ],
    scenarios: [
      scenario({
        id: "ART-001",
        name: "Exact Arena Trap attachment and Battle Results expiration",
        coverage: "Partially Covered",
        level: "Unit",
        testFile: "scripts/test-control-token-foundation.js",
        testId: "TCF-010",
        setup: "Gold acts with an owned Garchomp, rival Red's Lucario, and another rival Pokemon available.",
        action: "Attempt a self target, trap Red's Lucario, query exact statuses, and enter Battle Results cleanup.",
        expected: "Self targeting fails; only Red's Lucario is trapped and that status expires at Battle Results.",
        assertions: [
          "Self target returns noEffect.",
          "Rival target returns resolved with rosterInstance scope and mustBeBrought true.",
          "pokemonHasArenaTrap is true for red-lucario and false for red-garchomp.",
          "Cleanup expires exactly the created status ID.",
          "The target is no longer trapped at battle-results."
        ],
        gaps: "Unit resolver evidence only; controller and browser behavior is covered separately."
      }),
      scenario({
        id: "ART-001B",
        name: "Full team enters mandatory Arena Trap repair",
        coverage: "Covered",
        level: "Unit",
        testFile: "scripts/test-control-token-foundation.js",
        testId: "TCF-010B",
        setup: "Red has a full six-member draft and a seventh exact rival Pokemon is targeted by Arena Trap.",
        action: "Resolve Arena Trap against the unselected seventh Pokemon.",
        expected: "The exact target is inserted as a seventh temporary selection and a one-removal repair is created without deleting an existing member.",
        assertions: [
          "All six previous selections remain in their original order.",
          "The trapped exact instance is inserted as the seventh selection.",
          "Repair requires removal of one unlocked member and lists the trapped instance as forced.",
          "The linked Battle Team also contains seven members until repair."
        ],
        flags: { teambuilder: true },
        gaps: "The production repair picker is wired but not driven by this Unit test."
      }),
      scenario({
        id: "ART-002",
        name: "Controller declaration, validators, Curse gate, reload, cleanup, and undo",
        coverage: "Covered",
        level: "Integration",
        testFile: "scripts/test-token-controller-integration.js",
        testId: "TCI-005",
        setup: "Steevee owns three Arena Trap records; rival Red has two same-species Active instances and one Legacy instance.",
        action: "Attempt illegal targets, trap one exact Active instance, execute both validators and Curse checks, reload, clean up, and undo.",
        expected: "Illegal declarations consume nothing; only the exact trapped record satisfies both team validators and receives Curse protection.",
        assertions: [
          "Own and non-Active targets fail before consumption or activation.",
          "Both draft and locked-team validators require the exact ID.",
          "Same-species replacement fails.",
          "Curse is blocked only on the trapped instance.",
          "Backend reload preserves enforcement; cleanup and undo each remove the obligation."
        ],
        flags: { reload: true, undo: true, teambuilder: true },
        gaps: "A real Battle Results phase click is represented by the mapped cleanup function, not the full Battle Phase UI."
      }),
      scenario({
        id: "ART-002B",
        name: "Mandatory compensation, exact generated-set grant, reload, and root undo",
        coverage: "Covered",
        level: "Integration",
        testFile: "scripts/test-token-controller-integration.js",
        testId: "TCI-005B",
        setup: "Red already has one Pokemon in a saved build/team, and the exact Arena Trap target is two ordered Battle Tier steps below the Natural tier.",
        action: "Resolve Arena Trap, attempt Team Lock, let Red choose Recover for move slot 3, reload, then undo the root Arena activation.",
        expected: "Team Lock remains blocked until Red chooses; Recover belongs only to the trapped instance and its generated set, then reloads and undoes with Arena Trap.",
        assertions: [
          "The compensation record begins pending and Team Lock reports the unresolved choice.",
          "Only the target owner may complete the choice.",
          "The structured move grant identifies the exact roster instance and source Arena status.",
          "The generated set contains Recover in the selected slot.",
          "Reload preserves both grant and set; root undo removes the status/grant and restores the complete pre-Arena build and Battle Team."
        ],
        flags: { reload: true, undo: true, teambuilder: true },
        gaps: "The normal multiplayer Live Referee screen is wired but represented here by controller/result-level evidence and the isolated browser scenario."
      }),
      scenario({
        id: "ART-002C",
        name: "Badge-illegal target rejection before consumption",
        coverage: "Covered",
        level: "Integration",
        testFile: "scripts/test-token-controller-integration.js",
        testId: "TCI-005C",
        setup: "Red lacks the Badge capacity required to bring the selected higher-tier Active-roster Pokemon.",
        action: "Attempt to declare Arena Trap on that exact instance.",
        expected: "The declaration fails closed before creating an activation or consuming Arena Trap.",
        assertions: [
          "The authoritative bring-legality reason names insufficient Badge capacity.",
          "Arena Trap inventory is unchanged.",
          "No activation record is created."
        ],
        gaps: "This focused test injects the authoritative legality result; production app parity is also statically wired through the shared controller."
      }),
      scenario({
        id: "ART-LIFECYCLE-001",
        name: "Stale confirmed target cancels and refunds",
        coverage: "Covered",
        level: "Integration",
        testFile: "scripts/test-token-controller-integration.js",
        testId: "TCI-008",
        setup: "Declare Arena Trap on a legal rival Active-roster instance, then move that instance to Legacy before resolution.",
        action: "Resolve the saved pending event and reload the temporary authoritative backend.",
        expected: "Current legality wins: no Arena status is created, the event is canceled, and the exact consumed Token is refunded.",
        assertions: [
          "Resolution returns systemFailure with refunded true.",
          "Event status is canceled with canceledRefunded outcome.",
          "Inventory returns to its pre-declaration count.",
          "No Arena Trap status exists after reload."
        ],
        flags: { reload: true },
        gaps: "The same controller revalidation helper is used by the production Live Referee route."
      }),
      scenario({
        id: "ART-REGISTRY-001",
        name: "Shared customization registry and source-specific overrides",
        coverage: "Covered",
        level: "Unit",
        testFile: "scripts/test-control-token-foundation.js",
        testId: "TCF-010F",
        setup: "Evaluate banned and legal Ability/move injections from Token and Trainer Class sources.",
        action: "Check Wonder Guard, Last Respects, Levitate, and a class-specific Wonder Guard allowlist.",
        expected: "Generic injections obey the shared bans; only an explicit matching Trainer Class allowlist overrides one ban; natural access is unchanged.",
        assertions: [
          "Wonder Guard and Last Respects are rejected for Token injection.",
          "Levitate is legal.",
          "A matching explicit Trainer Class allowlist permits its named exception only.",
          "Natural Ability and move data are not rewritten by the injection registry."
        ],
        gaps: "Future customization sources must opt into this shared registry and provide explicit source metadata."
      }),
      scenario({
        id: "ART-BROWSER-003",
        name: "Visible Arena Trap team and Curse enforcement",
        coverage: "Covered",
        level: "Browser",
        testFile: "scripts/test-token-browser.js",
        testId: "BROWSER-003",
        setup: "Open the isolated browser scenario with two Red Garchomp roster instances.",
        action: "Click Use Arena Trap on the first instance and refresh after completing the combined scenario.",
        expected: "The visible exact team is blocked until Red chooses Recover, then accepted; same-species replacement remains rejected and Curse remains blocked after refresh.",
        assertions: [
          "Exact team first reads Blocked and compensation reads Choice required.",
          "After Red chooses, compensation reads Move: Recover and the generated set reads Recover.",
          "Exact team accepted then reads Yes.",
          "Same-species replacement reads Rejected.",
          "Curse on trapped target reads Blocked.",
          "Draft and Battle Team ownership both read Inserted.",
          "Exact slot lock reads Locked.",
          "All results survive backend refresh without browser errors."
        ],
        flags: { reload: true, teambuilder: true },
        gaps: "Battle Results cleanup is covered in Unit and Integration evidence, not this Browser scenario."
      }),
      scenario({
        id: "ART-RESULT-001",
        name: "Exact-instance Arena Trap result presentation",
        coverage: "Covered",
        level: "Unit",
        testFile: "scripts/test-token-result-summary.js",
        testId: "TRS-001",
        setup: "One owner has duplicate matching Pokemon and Arena Trap resolved on the second Active-roster instance.",
        action: "Build the final result summary, cards, and announcement.",
        expected: "The result names the exact owner, Pokemon, and duplicate slot without implying species-wide application or exposing an internal ID.",
        assertions: [
          "Target presentation is owner plus Pokemon plus Active-roster slot.",
          "Application scope remains rosterInstance.",
          "Announcement describes forced team insertion, removal lock, and Curse protection.",
          "No raw roster-instance ID appears in player-facing text."
        ],
        flags: { teambuilder: true },
        gaps: "The result module is asserted directly; production Live Referee rendering is covered by the app wiring and remains a multiplayer smoke-test target."
      }),
      scenario({
        id: "ART-RESULT-001B",
        name: "Completed Arena Trap compensation result presentation",
        coverage: "Covered",
        level: "Unit",
        testFile: "scripts/test-token-result-summary.js",
        testId: "TRS-001B",
        setup: "The target owner completed Arena Trap compensation with Ability: Levitate.",
        action: "Build the final result summary and compact announcement.",
        expected: "The result identifies the exact granted customization without describing a generic tier or BST buff.",
        assertions: [
          "The announcement says the target gained Ability: Levitate.",
          "The Compensation card shows Ability: Levitate."
        ],
        flags: { teambuilder: true },
        gaps: "The move-grant variant is exercised by TCI-005B and BROWSER-003."
      }),
      scenario({
        id: "ART-SANDBOX-001",
        name: "Arena Trap team ownership sandbox discard and idempotent commit",
        coverage: "Covered",
        level: "Integration",
        testFile: "scripts/test-token-sandbox.js",
        testId: "TSB-020",
        setup: "Seed a temporary backend, then resolve Arena Trap inside separate discard and commit sandbox sessions.",
        action: "Discard the first Arena mutation, commit the second once, and replay the same commit request.",
        expected: "Discard restores the original team exactly; commit persists one exact slot, status, activation, and consumption without duplication.",
        assertions: [
          "Discard restores baseline Teambuilder, Battle Team, status, and consumption state.",
          "Commit persists one exact draft slot and one exact Battle Team member.",
          "One linked lock status, activation, and consumption persist.",
          "Duplicate session commit is idempotent at the same backend revision."
        ],
        flags: { reload: true, sandboxDiscard: true, sandboxCommit: true, teambuilder: true },
        gaps: "This sandbox scenario covers the forced team mutation; compensation sandbox isolation is covered separately by TCF-016B."
      }),
      scenario({
        id: "ART-SANDBOX-002",
        name: "Arena Trap compensation sandbox discard and commit isolation",
        coverage: "Covered",
        level: "Unit",
        testFile: "scripts/test-control-token-foundation.js",
        testId: "TCF-016B",
        setup: "Run one move-compensation choice in a discarded sandbox and one Ability choice in a committed sandbox.",
        action: "Discard the first working clone, then prepare and complete the second commit.",
        expected: "Discard leaves real state untouched; commit candidate contains the exact linked Arena status and Levitate effect grant.",
        assertions: [
          "Discard does not leak a move grant or status into real state.",
          "The commit candidate records Levitate on the Arena customization payload.",
          "Only the exact trapped Pokemon receives the linked Ability grant."
        ],
        flags: { sandboxDiscard: true, sandboxCommit: true, teambuilder: true },
        gaps: "Backend idempotent commit behavior remains covered by TSB-020."
      })
    ]
  },
  {
    tokenId: "clear-smog",
    requirements: [
      requirement("Removes structured Rage stat buffs", "Covered", "TCI-006 and BROWSER-003"),
      requirement("Removes exact-instance move grants", "Covered", "TCI-006 and BROWSER-003"),
      requirement("Removes buff labels", "Covered", "TCI-006"),
      requirement("Does not affect another instance", "Covered", "TCI-006"),
      requirement("Does not damage natural roster data", "Covered", "TCI-006"),
      requirement("Does not delete player-wide class/perk state", "Covered", "TCI-006"),
      requirement("Reload", "Covered", "TCI-006 and BROWSER-003"),
      requirement("Undo", "Covered", "TCI-006")
    ],
    scenarios: [scenario({
      id: "CSM-001",
      name: "Selected-instance buffs and grants are cleared in isolation",
      coverage: "Covered",
      level: "Unit",
      testFile: "scripts/test-control-token-foundation.js",
      testId: "TCF-011",
      setup: "Gold's Garchomp has a clearable level buff, permanent buff labels, one pending label, and an exact move grant; another record has an unrelated grant.",
      action: "Resolve Clear Smog on gold-garchomp.",
      expected: "Clearable selected-instance state is removed while pending and unrelated records remain.",
      assertions: [
        "Resolver returns resolved.",
        "The selected effectBuff status becomes removed.",
        "Selected visible buffs become exactly [TM Move Pending].",
        "The selected exact move grant becomes removed and inactive.",
        "The unrelated move grant remains active."
      ],
      gaps: "No real Rage source, natural roster fields, player-wide class/perk state, reload, undo, UI, or inventory assertion."
    }), scenario({
      id: "CSM-002",
      name: "Controller Clear Smog after real Rage",
      coverage: "Covered",
      level: "Integration",
      testFile: "scripts/test-token-controller-integration.js",
      testId: "TCI-006",
      setup: "Resolve Rage on Gold's Garchomp and add exact, unrelated, class-wide, and perk-wide move grants.",
      action: "Resolve Clear Smog, persist/reload the result, and invoke controller undo.",
      expected: "Only selected-instance clearable records and labels are removed; natural and player-wide records survive.",
      assertions: [
        "Exact +3 and +252 Rage buff records become removed.",
        "The exact move grant is removed while the unrelated grant remains active.",
        "Natural level, base stats, ability, moves, owner, roster, origin, class, and perk fields are unchanged.",
        "Backend reload preserves removal and undo restores only the removed exact records."
      ],
      flags: { reload: true, undo: true },
      gaps: "Final classification of every future class/perk grant still depends on those effect contracts."
    }), scenario({
      id: "CSM-BROWSER-003",
      name: "Visible Clear Smog selected-instance result",
      coverage: "Covered",
      level: "Browser",
      testFile: "scripts/test-token-browser.js",
      testId: "BROWSER-003",
      setup: "Use visible controls to apply Rage and an exact move grant to Gold's Garchomp.",
      action: "Click Use Clear Smog and refresh persisted backend state.",
      expected: "Visible active Rage buffs become zero and the exact move grant reads removed while immunity remains active.",
      assertions: [
        "Rage buff count changes from two to zero.",
        "Exact move grant changes from active to removed.",
        "Restrict immunity remains Active under the approved current behavior.",
        "Results survive refresh without browser errors."
      ],
      flags: { reload: true },
      gaps: "The browser board does not enumerate every preserved natural field; Integration evidence does."
    })]
  },
  {
    tokenId: "extra-ban-token",
    requirements: [
      requirement("Selected roster instance retained as declaration anchor", "Covered", "TCF-009"),
      requirement("Global species scope", "Covered", "TCF-009"),
      requirement("Unban protection blocks it", "Covered", "TCI-001"),
      requirement("Selected Substitute fully negates it", "Covered", "TCF-007"),
      requirement("Other matching Substitutes remain", "Covered", "TCF-007"),
      requirement("Current-phase repeat-Ban protection created", "Covered", "TCF-006"),
      requirement("Reload", "Covered", "BROWSER-002"),
      requirement("Undo", "Covered", "BROWSER-002")
    ],
    scenarios: [
      scenario({
        id: "XBN-001",
        name: "Selected anchor produces a universal species Ban",
        coverage: "Covered",
        level: "Unit",
        testFile: "scripts/test-control-token-foundation.js",
        testId: "TCF-009",
        setup: "Gold and Red each own Garchomp; Gold's exact record is selected.",
        action: "Resolve Extra Ban.",
        expected: "The status retains Gold's selected record and Garchomp species while making all matching records illegal.",
        assertions: [
          "Resolver returns resolved.",
          "selectedTargetType is rosterInstance.",
          "selectedRosterInstanceId is gold-garchomp.",
          "selectedSpeciesId is garchomp.",
          "applicationScope is globalSpecies.",
          "Both Gold's and Red's Garchomp are illegal."
        ],
        gaps: "No Unban-protection, inventory, controller persistence, or browser assertion."
      }),
      scenario({
        id: "XBN-002",
        name: "Selected Substitute negates universal Ban",
        coverage: "Covered",
        level: "Unit",
        testFile: "scripts/test-control-token-foundation.js",
        testId: "TCF-007",
        setup: "Two matching Garchomp records each have Substitute.",
        action: "Ban one selected record, reload and undo, then reverse the selected target.",
        expected: "Only the selected Substitute is consumed and the entire Ban is negated.",
        assertions: [
          "negateEntireEffect is true.",
          "Only the selected attachment ID is consumed.",
          "The unselected attachment remains active.",
          "No active species Ban exists.",
          "Reload preserves and undo restores exact attachment state.",
          "Reversing selection reverses consumption."
        ],
        flags: { undo: true },
        gaps: "Unit serialization is not backend reload evidence; controller and Browser evidence is recorded separately."
      }),
      scenario({
        id: "XBN-003",
        name: "Ban interception creates phase-scoped repeat protection",
        coverage: "Covered",
        level: "Unit",
        testFile: "scripts/test-control-token-foundation.js",
        testId: "TCF-006",
        setup: "Gold's selected Garchomp has Substitute.",
        action: "Attempt a selected-anchor global Ban in Action Phase.",
        expected: "The Ban is negated and Garchomp receives protection only for the current phase.",
        assertions: [
          "negateEntireEffect is true.",
          "Exactly one Substitute is consumed and one protection status is created.",
          "No active Garchomp Ban exists.",
          "Ban protection is true in Action and false in Shop."
        ],
        gaps: "Does not attempt a second Extra Ban through the resolver."
      }),
      scenario({
        id: "XBN-BROWSER-002",
        name: "Visible selected-anchor interception, refresh, and undo",
        coverage: "Covered",
        level: "Browser",
        testFile: "scripts/test-token-browser.js",
        testId: "BROWSER-002",
        setup: "Red and Gold each attach Substitute to matching Garchomp through visible controls.",
        action: "Click Extra Ban targeting Red, refresh, click undo, and refresh again.",
        expected: "Only the selected attachment is consumed, the universal Ban is absent, and undo restores the selected attachment.",
        assertions: [
          "Red's attachment is consumed and Gold's remains active.",
          "Active species Ban count is zero.",
          "Current-phase protection count is one before undo.",
          "Both attachments are active after undo and refresh without browser errors."
        ],
        flags: { reload: true, undo: true },
        gaps: "The repeat-Ban attempt itself remains covered by Unit/controller legality rather than a second Browser click."
      })
    ]
  },
  standardCurseCoverage({
    tokenId: "toxic-curse",
    effectName: "Toxic Orb is forced on every unprotected matching Active Roster instance",
    effectTestId: "SCL-003",
    effectExpected: "Every unprotected matching instance has Toxic Orb as its effective item while configured items remain unchanged.",
    effectAssertions: ["All unprotected matching duplicates are affected.", "Configured items remain saved.", "Effective item is Toxic Orb."]
  }),
  standardCurseCoverage({
    tokenId: "iron-ball-curse",
    effectName: "Iron Ball is forced on every unprotected matching Active Roster instance",
    effectTestId: "SCL-003",
    effectExpected: "Every unprotected matching instance has Iron Ball as its effective item while configured items remain unchanged.",
    effectAssertions: ["All unprotected matching duplicates are affected.", "Configured items remain saved.", "Effective item is Iron Ball."]
  }),
  standardCurseCoverage({
    tokenId: "flame-curse",
    effectName: "Flame Orb is forced on every unprotected matching Active Roster instance",
    effectTestId: "SCL-003",
    effectExpected: "Every unprotected matching instance has Flame Orb as its effective item while configured items remain unchanged.",
    effectAssertions: ["All unprotected matching duplicates are affected.", "Configured items remain saved.", "Effective item is Flame Orb."]
  }),
  standardCurseCoverage({
    tokenId: "silencing-curse",
    effectName: "Maximum two-move set with explicit required choice",
    effectTestId: "SCL-005",
    effectExpected: "A four-move configured set is not truncated until its owner explicitly chooses the two retained moves.",
    effectAssertions: ["Repair starts required.", "All four configured moves remain before choice.", "Exactly the selected two moves remain after repair."]
  }),
  standardCurseCoverage({
    tokenId: "imprison-curse",
    effectName: "Temporary neutral-Nature and zero EV/IV effective override",
    effectTestId: "SCL-006",
    effectExpected: "The effective set has neutral Nature and zero EVs/IVs while the configured spread remains intact.",
    effectAssertions: ["Effective Nature is neutral.", "Effective EVs and IVs are zero.", "Configured slot is byte-for-byte unchanged."]
  })
];

[
  ["safeguard", "No test proves any protected theft/destruction/copy outcome is blocked."],
  ["embargo", "No test creates, persists, enforces, or expires the player status."],
  ["reroll-token", "No test drives an encounter result through reroll, persistence, and undo."],
  ["payday-field", "No field replacement, money effect, persistence, or expiration result is asserted."],
  ["drizzle-field", "No field replacement or ongoing weather result is asserted."],
  ["drought-field", "No field replacement or ongoing weather result is asserted."],
  ["taunt-field", "No field replacement or declared lockout result is asserted."],
  ["snow-warning-field", "No field replacement or ongoing weather result is asserted."],
  ["sand-stream-field", "No field replacement or ongoing weather result is asserted."],
  ["infestation-field", "No field replacement or ongoing effect result is asserted."],
  ["surging-strikes-field", "No field replacement or ongoing effect result is asserted."]
].forEach(([tokenId, gap]) => tokens.push(staticOnlyToken(tokenId, gap)));

tokens.push({
  tokenId: "immunity",
  requirements: [
    requirement("Directly affected player receives response priority", "Covered", "TCI-003"),
    requirement("Exact owned Immunity is consumed only on confirmed response", "Covered", "TCI-003"),
    requirement("Parent effect is atomically negated before Substitute or mutation", "Covered", "TCI-003"),
    requirement("Causal result summary names both effects and consumptions", "Covered", "TRS-002"),
    requirement("Backend reload and root undo restore exact inventory", "Covered", "TCI-003"),
    requirement("Production response-chain refresh and undo", "Covered", "BROWSER-008"),
    requirement("Sandbox isolation and discard", "Covered", "TSB-025")
  ],
  scenarios: [
    scenario({
      id: "IMMUNITY-INTEGRATION-001",
      name: "Exact response priority, atomic negation, reload, and undo",
      coverage: "Covered",
      level: "Integration",
      testFile: "scripts/test-token-controller-integration.js",
      testId: "TCI-003",
      setup: "Restrict targets Red's exact Garchomp while that Pokemon has an active Substitute and Red owns one exact Immunity record.",
      action: "Red answers the current Restrict prompt with Immunity, persists the result, reloads it, then undoes the root declaration.",
      expected: "Immunity negates Restrict before Substitute, survives reload as a terminal result, and root undo restores both exact Token inventories.",
      assertions: ["Red receives response priority.", "No Restrict status or global rule is created.", "Substitute remains active.", "Reload retains the negated outcome.", "Undo restores Immunity and Restrict."],
      flags: { reload: true, undo: true }
    }),
    scenario({
      id: "IMMUNITY-RESULT-001",
      name: "Complete causal result announcement",
      coverage: "Covered",
      level: "Unit",
      testFile: "scripts/test-token-result-summary.js",
      testId: "TRS-002",
      setup: "A Restrict root and its exact Immunity response are both represented by consumption records.",
      action: "Build the terminal result summary and announcement.",
      expected: "The announcement states that Immunity negated Restrict and retains both exact consumptions.",
      assertions: ["Final outcome is negated.", "Both Token consumption IDs remain causal.", "The result title names Immunity and Restrict."],
      gaps: "Visual styling is covered by the shared Live Referee result presentation rather than this pure summary test."
    }),
    scenario({
      id: "IMMUNITY-SANDBOX-001",
      name: "Negation stays isolated in the sandbox clone",
      coverage: "Covered",
      level: "Integration",
      testFile: "scripts/test-token-sandbox.js",
      testId: "TSB-025",
      setup: "A sandbox clone contains exact Restrict and Immunity records while the authoritative baseline remains untouched.",
      action: "Resolve Restrict into Immunity, prepare a commit candidate, then discard.",
      expected: "The clone and candidate retain the negated event and two consumptions; discard restores both original Tokens and no consumptions.",
      assertions: ["Baseline bytes never change.", "Candidate contains both consumptions.", "Discard restores both exact inventory IDs."],
      flags: { sandboxDiscard: true }
    })
  ]
});

tokens.push({
  tokenId: "extra-encounter-token",
  requirements: [
    requirement("Action Phase and exact chosen-player validation before mutation", "Covered", "ETR-001"),
    requirement("One-roll standalone authoritative Encounter session", "Covered", "ETR-002"),
    requirement("Exactly one roll added to an existing open session", "Covered", "ETR-003"),
    requirement("Stable grant identity and duplicate-completion prevention", "Covered", "ETR-004 and ETR-005"),
    requirement("Production consumption, refresh, normal Encounter overlay, and History undo", "Covered", "BROWSER-010"),
    requirement("Sandbox isolation and discard", "Covered", "TSB-024")
  ],
  scenarios: [
    scenario({
      id: "EXTRA-ENCOUNTER-RUNTIME-001",
      name: "Create or extend exactly one authoritative Encounter roll",
      coverage: "Covered",
      level: "Unit",
      testFile: "scripts/test-encounter-token-runtime.js",
      testId: "ETR-003",
      setup: "Gold has an open two-roll Encounter session and is selected as the exact Extra Encounter target.",
      action: "Grant Extra Encounter through the shared Encounter Token runtime.",
      expected: "The same session becomes pending with a maximum of exactly three rolls.",
      assertions: ["No parallel session is created.", "The chosen player's session identity is retained.", "Exactly one roll is added."],
      gaps: "Standalone creation and illegal timing are covered by ETR-001 and ETR-002."
    }),
    scenario({
      id: "EXTRA-ENCOUNTER-BROWSER-001",
      name: "Production consume, refresh, overlay continuation, and undo",
      coverage: "Covered",
      level: "Browser",
      testFile: "scripts/test-token-browser.js",
      testId: "BROWSER-010",
      setup: "Steevee owns one exact Extra Encounter Token and selects Gold during Action Phase in an isolated production game.",
      action: "Resolve the real app flow, persist and refresh the one-roll session, then use the History undo record.",
      expected: "Gold's normal Encounter overlay remains pending after refresh; undo removes that exact session and restores Steevee's exact Token.",
      assertions: ["Session target is Gold.", "Maximum rolls equals one.", "Grant identity survives refresh.", "Undo restores the Token and clears selected/open Encounter UI state."],
      flags: { reload: true, undo: true }
    }),
    scenario({
      id: "EXTRA-ENCOUNTER-SANDBOX-001",
      name: "Encounter grant stays isolated in the sandbox clone",
      coverage: "Covered",
      level: "Integration",
      testFile: "scripts/test-token-sandbox.js",
      testId: "TSB-024",
      setup: "An empty authoritative Encounter-session baseline is cloned into a Token sandbox.",
      action: "Grant one exact Extra Encounter session, prepare a commit candidate, then discard.",
      expected: "Only the clone and candidate contain the stable grant; discard returns to zero sessions.",
      assertions: ["Baseline bytes never change.", "Candidate contains the exact grant ID.", "Discard removes the session."],
      flags: { sandboxDiscard: true }
    })
  ]
});

tokens.push({
  tokenId: "incinerate",
  requirements: [
    requirement("Independent exact Item or TM selection per eligible rival, excluding Master Ball", "Covered", "TCF-026, TCF-027, TCF-027A, and TCI-009"),
    requirement("One exact selected stable-ID record removed per eligible rival", "Covered", "TCF-026 and TCI-009"),
    requirement("Source player's inventory remains untouched", "Covered", "TCF-026, TCI-009, and BROWSER-004"),
    requirement("No match resolves with no effect after confirmed consumption", "Covered", "TCF-026 and TCI-009"),
    requirement("Response negation creates no destruction operation", "Covered", "TCI-009"),
    requirement("Atomic failure and stale data refund", "Covered", "TCF-027 and shared controller refund tests"),
    requirement("Pre-destination provisional claim, persisted draft, withdrawal, and exactly-once confirmation", "Covered", "BROWSER-009"),
    requirement("Structured result summary", "Covered", "TRS-006"),
    requirement("Reload and undo", "Covered", "TCI-009 and BROWSER-004"),
    requirement("Sandbox discard and idempotent commit", "Covered", "TSB-021")
  ],
  scenarios: [
    scenario({
      id: "INC-UNIT-001",
      name: "One stable record per rival and atomic invalid-record failure",
      coverage: "Covered",
      level: "Unit",
      testFile: "scripts/test-control-token-foundation.js",
      testId: "TCF-026",
      setup: "Two rivals expose different stable Item/TM records, one rival owns duplicate Items, and the source owns another copy.",
      action: "Select Gold's Leftovers and Red's Recover, then resolve Incinerate.",
      expected: "The two independently selected stable records are destroyed, Red's duplicate Items and the source copy remain, and two structured operations are recorded.",
      assertions: ["Two rival IDs are affected.", "Source inventory is unchanged.", "Each operation records the exact destroyed inventory ID and consumption link."],
      gaps: "The companion TCF-027 case covers a missing stable ID and zero mutation."
    }),
    scenario({
      id: "INC-INTEGRATION-001",
      name: "Response, no-effect, reload, and undo lifecycle",
      coverage: "Covered",
      level: "Integration",
      testFile: "scripts/test-token-controller-integration.js",
      testId: "TCI-009",
      setup: "Incinerate has independent stable selections, response priority, one no-target rival scenario, and an isolated authoritative backend.",
      action: "Negate one declaration, resolve another with different per-rival targets, reload, reject duplicate completion, undo, then resolve no-target cases.",
      expected: "Negation creates no operation; exact selections persist; duplicate resolution is inert; undo restores exact resources; opponents without targets are skipped and an entirely empty declaration resolves no effect.",
      assertions: ["Immunity preserves both inventories.", "Reload preserves two operations.", "Undo restores exact IDs.", "Empty match records no operation."],
      flags: { reload: true, undo: true }
    }),
    scenario({
      id: "INC-RESULT-001",
      name: "Exact destroyed-resource announcement",
      coverage: "Covered",
      level: "Unit",
      testFile: "scripts/test-token-result-summary.js",
      testId: "TRS-006",
      setup: "A resolved Incinerate result contains two destruction operations.",
      action: "Build the compact causal announcement.",
      expected: "The source player and each rival's exact destroyed resource are named.",
      assertions: ["Both rival names appear.", "Both destroyed resource names appear.", "The operation list survives normalization."]
    }),
    scenario({
      id: "INC-BROWSER-004",
      name: "Visible Incinerate operation survives refresh",
      coverage: "Covered",
      level: "Browser",
      testFile: "scripts/test-token-browser.js",
      testId: "BROWSER-004",
      setup: "The isolated browser scenario gives each rival and the source Leftovers.",
      action: "Click Use Incinerate and refresh.",
      expected: "One rival copy each is removed, the source copy remains, and two operations persist.",
      assertions: ["Visible inventory counts are exact.", "Visible operation count is two after refresh.", "No browser errors occur."],
      flags: { reload: true }
    }),
    scenario({
      id: "INC-BROWSER-009",
      name: "Provisional Action Control declaration survives refresh and withdrawal",
      coverage: "Covered",
      level: "Browser",
      testFile: "scripts/test-token-browser.js",
      testId: "BROWSER-009",
      setup: "Open production Rival Saga during an Action destination decision with three exact Incinerate records.",
      action: "Claim Incinerate before choosing targets, collapse and reopen, refresh, persist per-rival choices, withdraw, then claim and confirm again.",
      expected: "The provisional Activity survives presentation changes without consumption; withdrawal restores the same Action; the fresh confirmation consumes exactly once and opens the normal response situation.",
      assertions: ["No provisional consumption or mutation occurs.", "Draft choices survive backend refresh.", "A fresh post-withdrawal claim is allowed.", "Confirmation creates one consumption and preserves the interrupted Action."],
      flags: { reload: true }
    }),
    scenario({
      id: "INC-SANDBOX-021",
      name: "Sandbox discard and idempotent commit",
      coverage: "Covered",
      level: "Integration",
      testFile: "scripts/test-token-sandbox.js",
      testId: "TSB-021",
      setup: "Incinerate and Steal resolve in separate discard and commit sandbox sessions.",
      action: "Discard once, commit once, then repeat the same commit.",
      expected: "Discard leaves authoritative inventory unchanged; commit applies two destruction operations once.",
      assertions: ["Authoritative revision is unchanged after discard.", "Duplicate commit is idempotent.", "Final destruction operation count is two."],
      flags: { sandboxDiscard: true, sandboxCommit: true }
    })
  ]
});

tokens.push({
  tokenId: "steal-token",
  requirements: [
    requirement("Exact rival roster-instance target", "Covered", "TCF-028 and TCI-011"),
    requirement("Formal Steal tag and Sticky Hold protection", "Covered", "TCF-029 and TCI-010"),
    requirement("Safeguard does not block Pokemon ownership transfer", "Covered", "TCF-028 and TCI-011"),
    requirement("Substitute consumes and negates the exact transfer", "Covered", "TCI-010"),
    requirement("Ownership and stale current-team references update atomically", "Covered", "TCF-028 and TCI-011"),
    requirement("Stale target cancels and refunds", "Covered", "TCI-011"),
    requirement("Structured result and Sticky Hold summaries", "Covered", "TRS-007 and TRS-008"),
    requirement("Reload and undo", "Covered", "TCI-011 and BROWSER-004"),
    requirement("Sandbox discard and idempotent commit", "Covered", "TSB-021")
  ],
  scenarios: [
    scenario({
      id: "STEAL-UNIT-001",
      name: "Exact ownership transfer and team-reference cleanup",
      coverage: "Covered",
      level: "Unit",
      testFile: "scripts/test-control-token-foundation.js",
      testId: "TCF-028",
      setup: "Red's exact Lucario appears in a current Battle Team and active Teambuilder build.",
      action: "Resolve a formally tagged Steal from Steevee.",
      expected: "Only Lucario changes owner; Red's current team references are removed; Safeguard does not block the Pokemon transfer.",
      assertions: ["Trainer ID becomes Steevee.", "Battle Team and Teambuilder references are removed.", "The operation retains the previous-owner snapshot."]
    }),
    scenario({
      id: "STEAL-INTEGRATION-001",
      name: "Sticky Hold and Substitute protection",
      coverage: "Covered",
      level: "Integration",
      testFile: "scripts/test-token-controller-integration.js",
      testId: "TCI-010",
      setup: "One declaration targets a Sticky Hold owner; another targets a Pokemon with Substitute.",
      action: "Attempt both declarations and resolve the confirmed Substitute case.",
      expected: "Sticky Hold rejects before consumption; Substitute is consumed and negates the transfer after confirmation.",
      assertions: ["Sticky declaration creates no consumption.", "Substitute becomes consumed.", "Pokemon ownership remains unchanged.", "Steal remains consumed after negation."]
    }),
    scenario({
      id: "STEAL-INTEGRATION-002",
      name: "Transfer reload, undo, and stale-target refund",
      coverage: "Covered",
      level: "Integration",
      testFile: "scripts/test-token-controller-integration.js",
      testId: "TCI-011",
      setup: "Red's Lucario is selected in current team surfaces and Steevee owns multiple Steal Tokens.",
      action: "Resolve Steal, reload, undo, then make a separate target stale before resolution.",
      expected: "Transfer and cleanup persist; undo restores exact prior ownership and references; stale resolution refunds.",
      assertions: ["Reload owner is Steevee.", "Undo owner is Red with original team references.", "Stale event is canceled and Token count restored."],
      flags: { reload: true, undo: true, teambuilder: true }
    }),
    scenario({
      id: "STEAL-RESULT-001",
      name: "Exact ownership and protection announcements",
      coverage: "Covered",
      level: "Unit",
      testFile: "scripts/test-token-result-summary.js",
      testId: "TRS-007",
      setup: "A transfer operation records previous and new owners.",
      action: "Build the resolved announcement.",
      expected: "The actor, previous owner, exact Pokemon, and locations are named.",
      assertions: ["Title names Steevee, Gold, and Lucario.", "Detail names both roster locations.", "TRS-008 separately names Sticky Hold when blocked."]
    }),
    scenario({
      id: "STEAL-BROWSER-004",
      name: "Visible exact transfer survives refresh",
      coverage: "Covered",
      level: "Browser",
      testFile: "scripts/test-token-browser.js",
      testId: "BROWSER-004",
      setup: "Red's Lucario appears in both current team surfaces.",
      action: "Click Use Steal and refresh.",
      expected: "Steevee remains the visible owner and Red's stale references remain removed.",
      assertions: ["Visible owner is Steevee.", "Both reference checks read removed.", "One transfer operation persists.", "No browser errors occur."],
      flags: { reload: true, teambuilder: true }
    }),
    scenario({
      id: "STEAL-SANDBOX-021",
      name: "Sandbox discard and idempotent commit",
      coverage: "Covered",
      level: "Integration",
      testFile: "scripts/test-token-sandbox.js",
      testId: "TSB-021",
      setup: "The exact transfer runs in discard and commit sessions.",
      action: "Discard, commit, and retry the same commit.",
      expected: "Discard preserves Red ownership; commit transfers once; duplicate commit does not duplicate operations.",
      assertions: ["Authoritative owner remains Red after discard.", "Final owner is Steevee.", "Exactly one transfer operation exists."],
      flags: { sandboxDiscard: true, sandboxCommit: true }
    })
  ]
});

tokens.push({
  tokenId: "wicked-blow",
  requirements: [
    requirement("Own or rival exact Active Roster target", "Covered", "TCF-031 and TCI-012"),
    requirement("No current Battle Phase team required", "Covered", "TCF-030, TCI-012, and BROWSER-005"),
    requirement("Reserve, Released, Daycare/facility, Temporary, and other non-Active records rejected", "Covered", "TCI-012"),
    requirement("Duplicate species remain exact-ID targets", "Covered", "TCF-031 and TCI-012"),
    requirement("Existing exact-ID team and Teambuilder references remain coherent without creating membership", "Covered", "TCF-031, TCI-012, and BROWSER-005"),
    requirement("Canonical three-ordered-tier reroll and acquisition replacement", "Covered", "TCF-030, TCI-012, and TRS-009"),
    requirement("Production evolution-data hydration before target eligibility", "Covered", "BROWSER-007"),
    requirement("Preview is mutation-free and does not consume", "Covered", "TCI-012"),
    requirement("Stale target cancels and refunds", "Covered", "TCI-012"),
    requirement("Reload, duplicate completion, and undo", "Covered", "TCI-012 and BROWSER-005"),
    requirement("Sandbox discard", "Covered", "TSB-022")
  ],
  scenarios: [
    scenario({
      id: "WICKED-UNIT-001",
      name: "Exact Active Roster replacement and optional reference coherence",
      coverage: "Covered",
      level: "Unit",
      testFile: "scripts/test-control-token-foundation.js",
      testId: "TCF-031",
      setup: "Duplicate exact roster records exist; one target has current-team, locked-slot, and Teambuilder references, while another legal Active Roster target has no Battle Team.",
      action: "Resolve Wicked Blow against each exact target.",
      expected: "Only the selected stable roster record changes; existing exact-ID mirrors update; the no-team case stays without a Battle Team.",
      assertions: ["The selected stable ID becomes Barbaracle.", "The duplicate record is unchanged.", "Existing exact-ID mirrors update.", "An empty battleTeams object remains empty."],
      flags: { teambuilder: true },
      gaps: "The unresolved mixed-tier branched-family ruling still fails closed."
    }),
    scenario({
      id: "WICKED-INTEGRATION-001",
      name: "Active Roster legality, refresh, undo, and stale refund",
      coverage: "Covered",
      level: "Integration",
      testFile: "scripts/test-token-controller-integration.js",
      testId: "TCI-012",
      setup: "Own and rival Active Roster targets, duplicate species, non-Active records, an optional current team, and an isolated backend are available.",
      action: "Preview, resolve with and without a team, reload, reject duplicate completion, undo, and make a separate confirmed target stale.",
      expected: "Both owners' Active Roster Pokemon are legal; non-Active records are rejected; exact replacement persists and undoes; stale resolution refunds once.",
      assertions: ["Preview changes no state or inventory.", "Own and rival no-team targets resolve.", "A Reserve record remains illegal even when stale-linked to a team.", "Reload and undo preserve exact identity.", "Stale Active Roster membership refunds."],
      flags: { reload: true, undo: true, teambuilder: true },
      gaps: "The unresolved mixed-tier branched-family ruling still fails closed."
    }),
    scenario({
      id: "WICKED-RESULT-001",
      name: "Exact reroll announcement",
      coverage: "Covered",
      level: "Unit",
      testFile: "scripts/test-token-result-summary.js",
      testId: "TRS-009",
      setup: "A stable-ID reroll operation records owner, old species, replacement, and tier calculation.",
      action: "Build the final causal announcement.",
      expected: "The result names the exact owner, old species, replacement, and ordered tier movement.",
      assertions: ["Title names the actor, owner, and original Pokemon.", "Cards show original, replacement, and tier roll.", "The exact target ID remains in the operation."],
      gaps: "No additional result gap is known for the covered automatic path."
    }),
    scenario({
      id: "WICKED-BROWSER-007",
      name: "Production selector waits for canonical evolution data",
      coverage: "Covered",
      level: "Browser",
      testFile: "scripts/test-token-browser.js",
      testId: "BROWSER-007",
      setup: "The production page begins without the lazy Pokemon build-data asset loaded and has ordinary plus mixed-tier branched Active Roster targets.",
      action: "Open Wicked Blow immediately, await the production asset, evaluate targets, and resolve the ordinary target.",
      expected: "A loading state becomes a legal exact-target selector automatically; mixed-tier ambiguity remains blocked; the canonical resolver completes normally.",
      assertions: ["No target is disabled merely for pending data.", "The production asset URL loads.", "Garchomp becomes selectable without reopening.", "Eevee remains safely blocked.", "Resolution preserves the stable ID and creates one operation with no browser errors."],
      flags: { reload: true, teambuilder: true },
      gaps: "The unresolved mixed-tier branched-family ruling still fails closed."
    }),
    scenario({
      id: "WICKED-BROWSER-005",
      name: "No-team Active Roster replacement survives refresh",
      coverage: "Covered",
      level: "Browser",
      testFile: "scripts/test-token-browser.js",
      testId: "BROWSER-005",
      setup: "Red's second Garchomp is in the Active Roster and Teambuilder but is not on the current Battle Team.",
      action: "Use Wicked Blow and refresh the isolated browser scenario.",
      expected: "The exact Active Roster record and existing Teambuilder mirror become Barbaracle without adding Battle Team membership.",
      assertions: ["Stable ID remains unchanged.", "Roster and build show Barbaracle.", "Battle Team reports Not added before and after refresh.", "One reroll operation persists with no browser errors."],
      flags: { reload: true, teambuilder: true },
      gaps: "The production multiplayer presentation still benefits from manual group testing."
    }),
    scenario({
      id: "WICKED-SANDBOX-022",
      name: "Sandbox discard restores the exact Active Roster record",
      coverage: "Covered",
      level: "Integration",
      testFile: "scripts/test-token-sandbox.js",
      testId: "TSB-022",
      setup: "An Active Roster target with a Teambuilder mirror and no Battle Team is cloned into a sandbox.",
      action: "Resolve Wicked Blow in the working clone, then discard.",
      expected: "Sandbox state changes only the exact clone; discard restores Garchomp, its set, and the empty Battle Team state.",
      assertions: ["Working clone becomes Barbaracle.", "Authoritative baseline bytes remain unchanged.", "Discard restores Garchomp and Dragon Claw.", "No reroll operation remains."],
      flags: { sandboxDiscard: true, teambuilder: true },
      gaps: "Wicked Blow does not yet have its own persisted sandbox commit case; shared commit idempotency infrastructure is covered elsewhere."
    })
  ]
});

tokens.push(settledBatchCoverage({
  tokenId: "follow-me",
  behavior: "Redirect one corresponding target and create an idempotent Gym-long real inventory-copy relationship",
  testId: "SEB-005",
  expected: "The relationship waits for the redirected parent to resolve, then copies each later real consumed Token exactly once without reacting to virtual activations.",
  assertions: ["Parent resolution activates the relationship.", "Canonical Token identity and source provenance are preserved.", "Duplicate completion grants no duplicate.", "Virtual copies do not trigger it."],
  browserTestId: "BROWSER-013",
  browserExpected: "The production response redirects one exact Active Roster target; parent resolution activates the relationship; one later real Restrict consumption grants one persistent copy across refresh.",
  browserAssertions: ["The relationship is pending before parent resolution and active after it.", "The redirected exact Pokemon changes ownership through the parent Steal.", "The copied Token is inventory, not an immediate activation.", "Refresh and duplicate processing preserve exactly one copy."],
  gap: "Gym-end expiration and History undo for the relationship still need an effect-specific browser scenario; Drizzle's trigger conditions remain separate."
}));

tokens.push({
  tokenId: "counterspell",
  requirements: [
    requirement("Only the user's exact Token that the current response would negate is eligible", "Covered", "BROWSER-008"),
    requirement("Restore the exact consumed inventory ID without resolving the original activation", "Covered", "BROWSER-008"),
    requirement("Two-Gym phase-anchored cooldown remains visible but unusable", "Covered", "TIR-003"),
    requirement("Cooldown completion is one-time and reload safe", "Covered", "TIR-004"),
    requirement("Refresh, duplicate prevention, and History undo", "Covered", "BROWSER-008")
  ],
  scenarios: [
    scenario({
      id: "COUNTERSPELL-INVENTORY",
      name: "Exact Token restoration and phase-anchored cooldown",
      coverage: "Covered",
      level: "Unit",
      testFile: "scripts/test-token-inventory-runtime.js",
      testId: "TIR-003",
      setup: "Create one exact consumed Token inventory record at Kanto Gym 2 Action Phase.",
      action: "Restore it through the Counterspell inventory runtime and inspect availability through Gym 4.",
      expected: "The same stable ID remains unavailable until Gym 4 Action Phase, then becomes usable.",
      assertions: ["Stable ID is unchanged.", "Gym 3 remains unavailable.", "Gym 4 Start remains unavailable.", "Gym 4 Action is available."],
      gaps: "Five-client simultaneous priority remains manual QA."
    }),
    scenario({
      id: "COUNTERSPELL-BROWSER",
      name: "Production response chain, refresh, duplicate prevention, and undo",
      coverage: "Covered",
      level: "Browser",
      testFile: "scripts/test-token-browser.js",
      testId: "BROWSER-008",
      setup: "Open production Rival Saga against a temporary backend with Restrict, Immunity, and Counterspell.",
      action: "Resolve Restrict -> Immunity -> Counterspell, refresh, inspect the exact cooldown record, then undo the terminal event.",
      expected: "One exact Restrict record returns on cooldown; refresh creates no duplicate; undo restores all three original Tokens.",
      assertions: ["Counterspell qualifies only for the source player's Token.", "Exact inventory count remains one.", "Cooldown survives refresh.", "Undo removes the cooldown and restores declaration inventory."],
      gaps: "No destructive authoritative save is used."
    })
  ]
});

tokens.push({
  tokenId: "seven-tools",
  requirements: [
    requirement("Answer only the exact newest Protection response", "Covered", "BROWSER-008"),
    requirement("Negation and copy are atomic", "Covered", "BROWSER-008"),
    requirement("Temporary copied Token inventory preserves canonical identity", "Covered", "TIR-001"),
    requirement("Copied Token availability and Gym-end expiration", "Covered", "TIR-002"),
    requirement("Safeguard Copy protection before consumption", "Covered", "BROWSER-008"),
    requirement("Refresh, duplicate prevention, and History undo", "Covered", "BROWSER-008")
  ],
  scenarios: [
    scenario({
      id: "SEVEN-TOOLS-INVENTORY",
      name: "Temporary copied inventory identity and expiration",
      coverage: "Covered",
      level: "Unit",
      testFile: "scripts/test-token-inventory-runtime.js",
      testId: "TIR-001",
      setup: "Create a temporary copy from one exact consumed Immunity record.",
      action: "Inspect source/copy identity and availability in the creation Gym and next Gym.",
      expected: "The source is unchanged; the copy has a new ID, preserves the canonical definition, and expires outside the creation Gym.",
      assertions: ["Source identity is retained in runtime metadata.", "Canonical Immunity definition is retained.", "Creation Gym is usable.", "Next Gym is unavailable."],
      gaps: "No five-client simultaneous priority is exercised."
    }),
    scenario({
      id: "SEVEN-TOOLS-BROWSER",
      name: "Production atomic chain, Safeguard, refresh, and undo",
      coverage: "Covered",
      level: "Browser",
      testFile: "scripts/test-token-browser.js",
      testId: "BROWSER-008",
      setup: "Open production Rival Saga against a temporary backend with Restrict, Immunity, 7 Tools, and a temporary Safeguard check.",
      action: "Verify Safeguard blocks Copy, then resolve Restrict -> Immunity -> 7 Tools after removing the test protection; refresh and undo the terminal event.",
      expected: "Immunity is negated only when one temporary Immunity copy is delivered; refresh does not duplicate it; undo restores all original inventory.",
      assertions: ["Safeguard blocks before 7 Tools consumption.", "Protection negation and copy both occur.", "Temporary copy survives refresh.", "Undo restores Restrict, Immunity, and 7 Tools and removes the copy."],
      gaps: "No five-client simultaneous priority is exercised."
    })
  ]
});

[
  settledResolverCoverage({
    tokenId: "smokescreen",
    behavior: "Spin every player exactly once and replace one corresponding target only when the landed player has a legal choice",
    testId: "STR-001",
    expected: "The original player and no-legal-target outcomes keep the original target; another legal player allows exactly one replacement and never adds a target.",
    assertions: ["Every player appears once on the wheel.", "No reroll occurs.", "Target category is preserved.", "Original target count is preserved."],
    gap: "The Guided production surface is statically wired, but destructive browser refresh, History undo, and five-player execution remain unverified."
  }),
  settledResolverCoverage({
    tokenId: "cold-wave",
    behavior: "Suppress only records explicitly classified as ongoing effects without deleting, mutating, reviving, or rescheduling them",
    testId: "STR-003",
    expected: "Explicit ongoing records are suppressed through Gym end; duration-only and ordinary records remain active.",
    assertions: ["Only isOngoingEffect records are selected.", "Source records remain present and unchanged.", "The suppression record has a Gym-end boundary."],
    integrationTestId: "TCI-014",
    integrationExpected: "The owned Token declares and resolves once, only explicit ongoing records are suppressed after backend reload, and undo restores the Token without mutating source records.",
    integrationAssertions: ["Duration-only records remain unsuppressed.", "The exact source status remains active.", "Reload preserves suppression.", "Undo removes suppression and restores the exact Token."],
    gap: "Controller declaration, backend reload, and undo are covered by TCI-014. Production-browser display and behavior gating for every future ongoing-effect consumer remain unverified."
  }),
  settledResolverCoverage({
    tokenId: "lingering-aroma",
    behavior: "Replace one exact benefiting ongoing effect for its remaining lifetime and charge outside confirmed targeting declarations $500 once",
    testId: "STR-004",
    expected: "The original effect stops applying without deletion; the replacement inherits its boundary; confirmed outside declarations transfer one $500 cost and duplicate targeting does not charge twice.",
    assertions: ["The original record is suppressed rather than removed.", "The replacement points to the exact original record.", "The beneficiary receives $500 once per declaration.", "The replacement expires with the original effect."],
    integrationTestId: "PD-SERVER-007",
    integrationTestFile: "scripts/test-provisional-declaration-server.js",
    integrationRequirement: "Server-authoritative confirmation cost, insufficient-funds rejection, and provisional withdrawal",
    integrationSetup: "Seed isolated games with an active Lingering Aroma beneficiary and an exact player-targeting Token declaration.",
    integrationAction: "Confirm once, retry confirmation, confirm with insufficient funds, and withdraw a separate provisional declaration.",
    integrationExpected: "Successful confirmation transfers exactly $500 once; insufficient funds consume nothing; withdrawal transfers nothing.",
    integrationAssertions: ["Duplicate confirmation preserves one payment.", "Insufficient funds preserve both balances and the Token.", "Withdrawal preserves both balances and creates no consumption."],
    integrationFlags: { reload: true },
    gap: "The pure resolver and declaration-cost hooks are covered; a destructive production browser scenario for withdrawal, later negation, refresh, and History undo remains outstanding."
  }),
  settledBatchCoverage({
    tokenId: "haze-curse",
    behavior: "Select two different species anchors and suppress structured buffs species-wide with exact-instance protection",
    testId: "SEB-001",
    expected: "Duplicate species fail; both distinct names affect all unprotected matching Active instances; Substitute protects only its exact instance; saved buff records remain intact.",
    assertions: ["Two different species are mandatory.", "Duplicate species rows are disabled and chosen icons/names are shown.", "Affected and protected exact IDs are distinct.", "Buff data is not deleted."],
    browserTestId: "BROWSER-014",
    browserRequirement: "Production two-anchor selector presentation and duplicate-name disabling",
    browserAction: "Render the production Haze selector after choosing one exact Garchomp anchor.",
    browserExpected: "The selected strip shows Garchomp; all other Garchomp rows are disabled with an explanation; a different species remains selectable.",
    browserAssertions: ["The chosen anchor remains checked and enabled.", "Duplicate species instances across players are disabled.", "The chosen icon/name strip is visible.", "A different species is still enabled."],
    browserPersistenceCovered: false,
    gap: "Two-Gym browser expiration, generated-set enforcement, refresh, and History undo need effect-specific production evidence."
  }),
  settledBatchCoverage({
    tokenId: "knock-off-curse",
    behavior: "Destroy one exact held Item or TM inventory grant from one exact Active Roster Pokemon",
    testId: "SEB-003",
    expected: "Master Ball is excluded; duplicate TM ownership preserves access; loss of the final exact TM copy identifies locked slots requiring manual revision without deleting their move.",
    assertions: ["Stable Item/TM IDs drive destruction.", "Master Ball fails before mutation.", "Duplicate TM access remains legal.", "Final TM loss records exact impacted slots and leaves the move for required revision."],
    gap: "The mandatory Team Revision blocker is wired through production state, but full Sabotage browser confirmation, refresh, and undo evidence remains outstanding."
  }),
  settledBatchCoverage({
    tokenId: "honey-token",
    behavior: "Copy one immutable completed Encounter result into a fresh acquisition-ready result without rerolling",
    testId: "SEB-004",
    expected: "Species, form, finalized tier/level, and intrinsic rolled properties are copied under fresh identities; owner, roster, reroll, modifier, Item, and operation state are absent.",
    assertions: ["Encounter identity is new.", "Recipient ownership is new.", "Intrinsic rolled properties are preserved.", "Transient and prior-owner fields are not copied.", "Duplicate resolution is inert."],
    gap: "The production exact-result selector, acquisition handoff, browser refresh, and History undo still need effect-specific browser evidence."
  }),
  settledBatchCoverage({
    tokenId: "devolve-token",
    behavior: "Apply one safe direct pre-evolution as a temporary species/build overlay to every unprotected matching Active instance",
    testId: "SEB-002",
    expected: "Ambiguous or missing parent data fails before mutation; valid species-wide overlays preserve roster IDs and exact expiration removes the temporary overlays.",
    assertions: ["Unsafe parent data fails closed.", "Every matching Active instance is handled independently.", "Roster identities never change.", "Expiration restores the original configured species."],
    gap: "Required Team Revision behavior for newly illegal sets and production refresh/undo/expiration need effect-specific browser evidence."
  }),
  settledResolverCoverage({
    tokenId: "move-deleter",
    behavior: "Globally disable one exact canonical move for the next Gym",
    testId: "STR-005",
    expected: "The exact move is unavailable only during the next Gym and expires at its boundary.",
    assertions: ["Canonical move key is stable.", "Every player is covered.", "The current and later Gyms are not incorrectly affected."],
    integrationTestId: "TCI-013",
    integrationExpected: "The canonical move restriction is absent in the declaration Gym, active in the next Gym after backend reload, and removed by exact activation undo with the Token restored.",
    integrationAssertions: ["Canonical casing is stable.", "The restriction persists through reload.", "Undo removes the status.", "Undo restores the exact Token."],
    gap: "TCI-013 covers controller declaration, backend reload, and exact undo; STR-010 covers Teambuilder wiring. Full import/export/browser rejection still needs destructive evidence."
  }),
  settledResolverCoverage({
    tokenId: "purge-curse",
    behavior: "Absolutely release every exact Pokemon in the target player's immutable brought snapshot after payout",
    testId: "STR-007",
    expected: "Every snapshotted exact record is released once; gameplay protection is ignored; duplicate completion is inert and snapshot undo restores state.",
    assertions: ["Resolution is atomic.", "All immutable snapshot IDs are released.", "Duplicate operation ID does not replay.", "Undo restores the exact pre-resolution snapshot."],
    gap: "Production post-payout wiring and non-respondable declaration are statically asserted by STR-010; browser refresh, rollback/refund, and host undo are not yet exercised end to end."
  }),
  settledResolverCoverage({
    tokenId: "teleport",
    behavior: "Revalidate a delayed parent effect at its original phase on return and distinguish gameplay illegality from system failure",
    testId: "STR-009",
    expected: "Gameplay illegality resolves with no effect and no refund; corrupt/unsupported continuation cancels with refund; successful return uses the actual resolution anchor.",
    assertions: ["Declaration phase anchor is preserved.", "Gameplay-illegal return consumes both effects.", "System failure requests refund.", "Actual resolution anchor is passed to the parent resolver."],
    browserTestId: "BROWSER-011",
    browserExpected: "Teleport survives refresh as one delayed record, opens exactly one return event at the next matching phase, resolves once, and never reopens after another refresh.",
    browserAssertions: ["Both confirmed Tokens are consumed once.", "The delayed record has one stable ID.", "The return event is deterministic.", "Duplicate scheduling opens zero events.", "Terminal events remain terminal after refresh."],
    gap: "STR-011 covers the lifecycle statically and BROWSER-011 covers confirmation, backend refresh, one deterministic matching-phase return, terminal resolution, and duplicate prevention. Production support intentionally excludes nested response effects and non-Control-controller parents."
  }),
  settledResolverCoverage({
    tokenId: "revenge",
    behavior: "Release exactly two offender brought-snapshot Pokemon and optionally destroy at most one exactly referenced eligible held item",
    testId: "STR-008",
    expected: "Exactly two selected snapshot records are released; Master Ball and same-name inventory guessing are rejected.",
    assertions: ["Release count is exactly two.", "Only an exact held inventory reference may be destroyed.", "Master Ball is protected.", "Operation is atomic."],
    browserTestId: "BROWSER-012",
    browserExpected: "The required-choice screen survives refresh, consumes Revenge only on valid confirmation, releases the exact two snapshot records, closes terminally, and History undo restores the exact pre-choice state.",
    browserAssertions: ["The offer consumes nothing before confirmation.", "Two exact roster IDs are released.", "The event closes once.", "Refresh preserves the terminal result.", "History undo restores both Pokemon, the Token, and the awaiting procedure."],
    browserUndoCovered: true,
    gap: "STR-012 covers production wiring and BROWSER-012 covers the required-choice screen, backend refresh, exact two-Pokemon resolution, consumption, terminal event closure, and History undo. A complete real payout-to-offer phase-through remains manual evidence."
  }),
  settledBatchCoverage({
    tokenId: "after-you",
    behavior: "Create one non-inventory virtual activation above the copied Token with fresh legal choices and explicit interaction rules",
    testId: "SEB-007",
    expected: "The contract publishes supported Safeguard and Immunity behavior, individually blocks every unresolved Protection case, and prevents recursion.",
    assertions: ["Immunity targets and negates the original Immunity.", "Safeguard protects the After You user.", "Unsupported Protection entries remain individually fail-closed.", "After You cannot copy itself."],
    browserTestId: "BROWSER-013",
    browserExpected: "Copied Immunity resolves before and negates original Immunity; a copied ordinary Restrict resolves against a fresh species before the original Restrict resumes; refresh creates no duplicate activation.",
    browserAssertions: ["Both special and ordinary copied activations are non-inventory.", "Fresh Control targeting is independent.", "Original chain resumes only after the copy terminates.", "After You is consumed exactly once."],
    gap: "Custom-choice Control Tokens and the unsupported Protection matrix entries remain individually unavailable pending their exact interaction rules or controllers."
  }),
  settledBatchCoverage({
    tokenId: "ditto-token",
    behavior: "Transform one exact Ditto inventory record into one canonical chosen Token inventory record without activating it",
    testId: "SEB-006",
    expected: "The replacement has canonical identity and Ditto provenance, creates no activation, does not duplicate on replay, and snapshot undo removes it.",
    assertions: ["The exact source operation is idempotent.", "The selected canonical definition is preserved.", "No copied activation is created.", "Undo restores the pre-copy inventory snapshot."],
    gap: "The production picker is wired, but browser refresh, exact source-record transformation presentation, and History undo need effect-specific evidence."
  })
].forEach((entry) => tokens.push(entry));

const revisionWatchlist = Object.freeze([
  {
    tokenId: "lingering-aroma",
    behavior: "Replace one exact benefiting Ongoing Effect for its linked remaining lifetime and charge confirmed outside targeting declarations $500 once.",
    coverage: "Partially Covered",
    evidence: "STR-004",
    currentGap: "Selection, linked replacement, declaration cost, duplicate-target protection, and expiration are covered in isolation; production browser withdrawal/negation/undo remains unverified."
  },
  {
    tokenId: "cold-wave",
    behavior: "Suppress all Ongoing Activated Effects table-wide until Gym end without removing or reviving records.",
    coverage: "Partially Covered",
    evidence: "STR-003",
    currentGap: "Explicit classification and non-mutating suppression are covered; browser presentation and enforcement by every future ongoing-effect consumer remain unverified."
  },
  {
    tokenId: "counterspell",
    behavior: "Restore the user's exact negated Token and place that exact inventory record on a two-Gym phase-anchored cooldown.",
    coverage: "Manual Only",
    evidence: "TIR-003, TIR-004, and BROWSER-008 cover the implemented lifecycle",
    currentGap: "Normal five-client simultaneous priority remains manual validation."
  },
  {
    tokenId: "seven-tools",
    behavior: "Negate one just-activated Protection Token and create one same-Gym temporary copy for the responder.",
    coverage: "Manual Only",
    evidence: "TIR-001, TIR-002, TCF-019, and BROWSER-008 cover the implemented lifecycle",
    currentGap: "Normal five-client simultaneous priority remains manual validation."
  },
  {
    tokenId: "smokescreen",
    behavior: "Spin every player exactly once; the original player's target remains, while another landed player may replace one chosen target with one legal corresponding target.",
    coverage: "Partially Covered",
    evidence: "STR-001, STR-002, and TCF-020",
    currentGap: "Pure wheel/replacement semantics and production guided wiring are covered; destructive browser refresh, History undo, and five-player execution remain unverified."
  },
  {
    tokenId: "follow-me",
    behavior: "Redirect one legal corresponding target, then grant one real inventory copy of each later real Token consumed by the recorded player for the rest of the Gym.",
    coverage: "Partially Covered",
    evidence: "SEB-005, TCF-021, and BROWSER-013",
    currentGap: "Redirect, parent-gated relationship activation, canonical inventory copy, persistence, and duplicate prevention are covered; Gym-end expiration and History undo remain unverified."
  },
  {
    tokenId: "foresight-curse",
    behavior: "Reveal only matching brought-set moves to the Foresight user as private information, never through shared state, Live Referee, or History.",
    coverage: "Not Covered",
    evidence: "TCF-018, TCF-022, and SEB-008 prove fail-closed activation and recursive shared-payload stripping",
    currentGap: "Authenticated player-scoped delivery, authorized refresh, private rendering, six-target production resolution, and revocation are not implemented, so gameplay activation remains blocked."
  }
]);

module.exports = Object.freeze({ COVERAGE_REVISION, tokens, revisionWatchlist });
