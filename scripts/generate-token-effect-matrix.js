"use strict";

const fs = require("fs");
const path = require("path");
const contract = require(path.join(__dirname, "..", "token-effect-contract.js"));

const root = path.join(__dirname, "..");
const appPath = path.join(root, "app.js");
const outputPath = path.join(root, "TOKEN_EFFECT_MATRIX.md");
const sagaRulesPath = path.join(root, "SAGA_TOKEN_RULES.md");
const timingRulesPath = path.join(root, "TIMING_AND_PHASES.md");
const liveRefereePath = path.join(root, "LIVE_REFEREE_GAMEPLAY_CONTROLLER.md");
const checkOnly = process.argv.includes("--check");

function catalogEntries() {
  const source = fs.readFileSync(appPath, "utf8");
  const start = source.indexOf("const defaultTokenShopData = Object.freeze([");
  const end = source.indexOf("\n]);", start);
  if (start < 0 || end < 0) throw new Error("Could not locate defaultTokenShopData in app.js.");
  return source.slice(start, end).split(/\r?\n/).map((line) => {
    const id = line.match(/\bid:\s*"([^"]+)"/)?.[1] || "";
    const name = line.match(/\bname:\s*"([^"]+)"/)?.[1] || "";
    const rulesText = line.match(/\bdescription:\s*"([^"]+)"/)?.[1] || "";
    return id && name ? { id, name, rulesText } : null;
  }).filter(Boolean);
}

function normalizedText(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[.!?]+$/g, "")
    .replace(/\s+/g, " ");
}

function list(values, fallback = "None") {
  return Array.isArray(values) && values.length ? values.join(", ") : fallback;
}

function task(definition) {
  if (definition.intendedResolutionMode === contract.resolverModes.GUIDED) return definition.guidedTask?.instruction || "MISSING";
  if (definition.intendedResolutionMode === contract.resolverModes.HOST_CONFIRMED) return definition.hostTask?.instruction || "MISSING";
  return list(definition.automaticMutations, "No state mutation declared");
}

function timingSummary(definition) {
  if (definition.phaseBoundaryProcedure) return `${definition.phaseBoundaryProcedure} (${definition.explicitPhaseTiming || "explicit boundary"})`;
  if (definition.usesControlTiming) return `Control window: ${list(definition.legalControlContexts)}`;
  return list(definition.timingWindows);
}

function auditCanonicalSemantics() {
  const errors = [];
  const sagaRules = fs.readFileSync(sagaRulesPath, "utf8");
  const timingRules = fs.readFileSync(timingRulesPath, "utf8");
  const liveReferee = fs.readFileSync(liveRefereePath, "utf8");
  const canonicalText = [sagaRules, timingRules, liveReferee].join("\n");
  const rocketTiming = "Temporary Steal Tokens may be used only At End of Battle Phase, immediately after Battle Payout resolves and before ordinary Control Timing reopens, while the player still holds Rocket Grunt.";
  const magicianWording = "Once Per Gym, Respond To A Targeted Effect And Change One Chosen Target To Another Legal Corresponding Target. Global All-Player Effects Are Excluded.";
  if (!sagaRules.includes(rocketTiming)) errors.push("Rocket Grunt Temporary Steal timing is missing the exact canonical sentence");
  if (/They are usable only after Battle Payout while the player still holds Rocket Grunt\./i.test(canonicalText)) {
    errors.push("Rocket Grunt still uses the obsolete after-Battle-Payout-only wording");
  }
  if (!timingRules.includes("gymStartPreparationControl") || !liveReferee.includes("gymStartPreparationControl")) {
    errors.push("Gym Start Preparation Control is missing from canonical timing/controller documentation");
  }
  if (!timingRules.includes("endOfActionPhaseProcedure") || !timingRules.includes("endOfBattlePhaseProcedure")) {
    errors.push("Canonical phase-boundary procedures are missing from timing documentation");
  }
  if (/After the targeted player's Battle Phase completes/i.test(canonicalText)) {
    errors.push("Purge still uses the obsolete targeted player's Battle Phase wording");
  }
  if (!sagaRules.includes(magicianWording)) errors.push("Magician is missing its exact approved redirect wording");
  if (!sagaRules.includes("Redirectability is mechanism-specific") || !liveReferee.includes("Redirect Resolution Contract")) {
    errors.push("Mechanism-specific Magician, Follow Me, and Smokescreen policy is missing from canonical documentation");
  }
  return errors;
}

function renderMatrix(entries) {
  const intendedCounts = entries.reduce((result, entry) => {
    result[entry.intendedResolutionMode] = (result[entry.intendedResolutionMode] || 0) + 1;
    return result;
  }, {});
  const runtimeCounts = entries.reduce((result, entry) => {
    result[entry.runtimeImplementationStatus] = (result[entry.runtimeImplementationStatus] || 0) + 1;
    return result;
  }, {});
  const usabilityCounts = entries.reduce((result, entry) => {
    result[entry.runtimeUsability] = (result[entry.runtimeUsability] || 0) + 1;
    return result;
  }, {});
  const lines = [
    "> **Authority: IMPLEMENTATION STATUS**",
    "> This generated file reports declarative intent and registered runtime evidence. It does not create gameplay rules.",
    "",
    "# Rival Saga Token Effect Matrix",
    "",
    "> Generated from `token-effect-contract.js`. Do not edit this file by hand.",
    "",
    `Contract schema: **v${contract.schemaVersion}**  `,
    `Contract definition revision: **${contract.contractDefinitionRevision}**  `,
    `Definitions: **${entries.length}**  `,
    `Runtime verification registry entries: **${Object.keys(contract.runtimeVerificationById).length}**  `,
    `Intended Automatic: **${intendedCounts.automatic || 0}** | Intended Guided: **${intendedCounts.guided || 0}** | Intended Host Confirmed: **${intendedCounts.hostConfirmed || 0}**`,
    `Verified Complete: **${runtimeCounts.verifiedComplete || 0}** | Partial: **${runtimeCounts.partial || 0}** | Text Only: **${runtimeCounts.textOnly || 0}** | Missing: **${runtimeCounts.missing || 0}** | Blocked By Ruling: **${runtimeCounts.blockedByRuling || 0}**`,
    `Runtime Usability - Usable: **${usabilityCounts.usable || 0}** | Guided Only: **${usabilityCounts.guidedOnly || 0}** | Development Only: **${usabilityCounts.developmentOnly || 0}** | Blocked: **${usabilityCounts.blocked || 0}**`,
    "",
    "## Summary",
    "",
    "| Token | Family | Legal Timing | Target | Magician | Follow Me | Smokescreen | Intended Mode | Runtime Status | Runtime Usability |",
    "|---|---|---|---|---|---|---|---|---|---|",
    ...entries.map((entry) => `| ${entry.name} | ${entry.family} | ${timingSummary(entry)} | ${entry.targetType} / ${entry.targetScope} (${entry.minTargets}-${entry.maxTargets}) | ${entry.redirectPolicy.magician.status} | ${entry.redirectPolicy.followMe.status} | ${entry.redirectPolicy.smokescreen.status} | ${entry.intendedResolutionMode} | ${entry.runtimeImplementationStatus} | ${entry.runtimeUsability} |`),
    "",
    "## Definitions",
    ""
  ];
  entries.forEach((entry) => {
    lines.push(
      `### ${entry.name}`,
      "",
      `- **ID:** \`${entry.id}\``,
      `- **Family:** ${entry.family}`,
      `- **Rules:** ${entry.rulesText}`,
      `- **Semantic metadata:** tags: ${list(entry.effectTags)}; visibility: ${entry.visibility}; classification: ${entry.effectClassification}; removable by: ${list(entry.removableBy)}.`,
      `- **Mechanic contract:** ${Object.keys(entry.mechanicContract || {}).length ? JSON.stringify(entry.mechanicContract) : "No specialized mechanic relationship metadata."}`,
      `- **Timing:** model: ${entry.timingModel}; phases/compatibility windows: ${list(entry.legalPhases)} / ${list(entry.timingWindows)} (${entry.runtimeTimingProjection}); phase-boundary procedure: ${entry.phaseBoundaryProcedure || "none"}; explicit timing: ${entry.explicitPhaseTiming || "none"}; status/candidate: ${entry.timingStatus} / ${entry.candidateTiming || "none"}; Control Timing: ${entry.usesControlTiming ? "yes" : "no"}; Control window required: ${entry.controlWindowRequired ? "yes" : "no"}; Control contexts: ${list(entry.legalControlContexts)}; activation: ${entry.activationType}; Response: ${entry.isResponse ? "yes" : "no"}; opens response window: ${entry.opensResponseWindow ? "yes" : "no"}; administrative override: ${entry.administrativeOverride ? "available" : "unavailable"}; priority: ${entry.specialPriority}.`,
      `- **Choices/target:** ${list(entry.requiredChoices)}; ${entry.targetType} / ${entry.targetScope} (${entry.targetScopeStatus}); targets: ${entry.minTargets}-${entry.maxTargets} via ${entry.targetCollectionType}; ${entry.targetValidation} Controller relation: ${entry.targetControllerRelation}; self only: ${entry.selfOnly ? "yes" : "no"}; other player only: ${entry.otherPlayerOnly ? "yes" : "no"}; exclude actor: ${entry.excludeActor ? "yes" : "no"}; same/different controller required: ${entry.sameControllerRequired ? "yes" : "no"} / ${entry.differentControllerRequired ? "yes" : "no"}; revalidate: ${entry.revalidateOnResolution ? "yes" : "no"}.`,
      `- **Redirect - Magician:** **${entry.redirectPolicy.magician.status}**. ${entry.redirectPolicy.magician.reason} Changes selected targets: ${entry.redirectPolicy.magician.changesSelectedTargetCount}; preserves original target contract: ${entry.redirectPolicy.magician.preservesTargetType && entry.redirectPolicy.magician.preservesTargetControllerRelation && entry.redirectPolicy.magician.preservesTargetCount ? "yes" : "no"}; fresh direct-target priority: ${entry.redirectPolicy.magician.requiresFreshDirectTargetPriority ? "required" : "not applicable"}.`,
      `- **Redirect - Follow Me:** **${entry.redirectPolicy.followMe.status}**. ${entry.redirectPolicy.followMe.reason} Fresh direct-target priority: ${entry.redirectPolicy.followMe.requiresFreshDirectTargetPriority ? "required" : "not applicable"}.`,
      `- **Smokescreen replacement-wheel policy:** **${entry.redirectPolicy.smokescreen.status}**. ${entry.redirectPolicy.smokescreen.reason} Operation: ${entry.redirectPolicy.smokescreen.targetOperation}; original-player result keeps target: ${entry.redirectPolicy.smokescreen.originalPlayerResultKeepsTarget ? "yes" : "not applicable"}; no legal corresponding target: ${entry.redirectPolicy.smokescreen.noLegalCorrespondingTargetHandling || "not applicable"}.`,
      `- **Declaration:** ${entry.declarationCost}; mode: ${entry.consumptionMode}; consume at ${entry.consumptionTiming}; legal use: ${entry.consumesOnLegalUse ? "consume" : "do not consume"}; misses: ${entry.consumeIfMisses ? "consume" : "do not consume"}; blocked: ${entry.consumeIfBlocked ? "consume" : "do not consume"}; other costs: ${list(entry.otherDeclarationCosts)}; announcement: ${entry.declarationAnnouncement}`,
      `- **Resolution intent:** **${entry.intendedResolutionMode}** via \`${entry.resolverId}\`. ${task(entry)} Success: ${list(entry.successConditions)} Failure/no effect: ${list(entry.failureConditions)} Parent: ${entry.parentInteraction}`,
      `- **Persistence:** ${entry.persistence}; ${entry.stateClassification}; duration: ${entry.duration}; expires: ${entry.expirationPoint}; replacement: ${entry.replacementRules}; stacking: ${entry.stackingRules}`,
      `- **Boundary record selection:** type: ${entry.eligibleRecordType || "none"}; window: ${entry.eligibleRecordWindow || "none"}; count: ${entry.selectionCount}; copied payload: ${entry.copiedPayloadStatus}.`,
      `- **Runtime status:** **${entry.runtimeImplementationStatus}**. Runtime usability: **${entry.runtimeUsability}** - ${entry.runtimeUsabilityReason} Evidence: ${entry.runtimeEvidence} Last verified test: ${entry.lastVerifiedTest}. Contract revision: ${entry.contractDefinitionRevision}.`,
      `- **Completion records:** outcome: ${entry.outcomeTemplate}; audit: ${list(entry.auditFields)}; undo: ${list(entry.undoPayload)}.`,
      `- **Required tests:** ${list(entry.requiredTests)}`,
      ""
    );
  });
  return `${lines.join("\n")}\n`;
}

const catalog = catalogEntries();
const errors = [...contract.validate(), ...auditCanonicalSemantics()];
const seenCatalogIds = new Set();
catalog.forEach((entry) => {
  if (seenCatalogIds.has(entry.id)) errors.push(`Duplicate catalog ID: ${entry.id}`);
  seenCatalogIds.add(entry.id);
});
const catalogIds = new Set(catalog.map((entry) => entry.id));
const contractIds = new Set(contract.list.map((entry) => entry.id));
catalog.forEach((entry) => {
  if (!contractIds.has(entry.id)) errors.push(`Catalog Token missing contract: ${entry.id} (${entry.name})`);
  const definition = contract.definitions[entry.id];
  if (!definition) return;
  if (definition.name !== entry.name && !definition.aliases.includes(entry.name)) {
    errors.push(`Catalog/contract name disagreement for ${entry.id}: ${entry.name} != ${definition.name}`);
  }
  if (normalizedText(definition.rulesText) !== normalizedText(entry.rulesText)) {
    errors.push(`Catalog/contract rules-text disagreement for ${entry.id}`);
  }
});
contract.list.forEach((entry) => {
  if (!catalogIds.has(entry.id)) errors.push(`Contract Token missing catalog entry: ${entry.id} (${entry.name})`);
});
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

const markdown = renderMatrix(contract.list);
if (checkOnly) {
  const existing = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, "utf8") : "";
  if (existing !== markdown) {
    console.error("TOKEN_EFFECT_MATRIX.md is out of date. Run npm.cmd run generate:token-matrix.");
    process.exit(1);
  }
  console.log(`Token contract audit passed: ${contract.list.length} catalog Tokens.`);
} else {
  fs.writeFileSync(outputPath, markdown, "utf8");
  console.log(`Generated ${path.basename(outputPath)} for ${contract.list.length} Tokens.`);
}
