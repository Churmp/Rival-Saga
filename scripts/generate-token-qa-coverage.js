"use strict";

const fs = require("node:fs");
const path = require("node:path");
const contract = require("../token-effect-contract.js");
const coverageData = require("./token-qa-coverage-data.js");

const ROOT = path.join(__dirname, "..");
const OUTPUT_PATH = path.join(ROOT, "TOKEN_QA_COVERAGE.md");
const COVERAGE_LABELS = new Set([
  "Covered",
  "Partially Covered",
  "Static Only",
  "Manual Only",
  "Not Covered",
  "Blocked By Ruling"
]);
const TEST_LEVELS = new Set(["Unit", "Integration", "Browser", "Manual-only", "Static Wiring"]);

function normalizePath(filePath) {
  return filePath.replace(/\\/g, "/");
}

function markdown(value) {
  return String(value ?? "").replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}

function yesNo(value) {
  return value ? "Yes" : "No";
}

function discoverTests() {
  const files = fs.readdirSync(__dirname)
    .filter((file) => /^test-.*\.js$/i.test(file))
    .map((file) => normalizePath(path.join("scripts", file)));
  const tests = new Map();
  const errors = [];
  files.forEach((relativePath) => {
    const source = fs.readFileSync(path.join(ROOT, relativePath), "utf8");
    const pattern = /test\(\s*["'`]\[([A-Z0-9-]+)\]\s+([^"'`]+)["'`]/g;
    let match;
    while ((match = pattern.exec(source))) {
      const [, id, title] = match;
      if (tests.has(id)) {
        errors.push(`Duplicate executable test ID ${id} in ${relativePath} and ${tests.get(id).file}`);
      } else {
        tests.set(id, { id, title: title.trim(), file: relativePath });
      }
    }
  });
  return { tests, errors };
}

function validateCoverage() {
  const errors = [...contract.validate()];
  const { tests, errors: discoveryErrors } = discoverTests();
  errors.push(...discoveryErrors);

  const partialDefinitions = Object.values(contract.definitions)
    .filter((definition) => definition.runtimeImplementationStatus === "partial");
  const partialIds = new Set(partialDefinitions.map((definition) => definition.id));
  const verifiedDefinitions = Object.values(contract.definitions)
    .filter((definition) => definition.runtimeImplementationStatus === "verifiedComplete");
  const trackedIds = new Set([...partialIds, ...verifiedDefinitions.map((definition) => definition.id)]);
  const tokenIds = new Set();
  const scenarioIds = new Set();
  const watchlistIds = new Set();

  coverageData.tokens.forEach((token) => {
    if (!trackedIds.has(token.tokenId)) errors.push(`${token.tokenId}: report entry is neither a current partial nor verified-complete Token`);
    if (tokenIds.has(token.tokenId)) errors.push(`${token.tokenId}: duplicate Token coverage entry`);
    tokenIds.add(token.tokenId);
    if (!Array.isArray(token.requirements) || !token.requirements.length) errors.push(`${token.tokenId}: missing requirement coverage`);
    if (!Array.isArray(token.scenarios) || !token.scenarios.length) errors.push(`${token.tokenId}: missing named scenarios`);

    (token.requirements || []).forEach((entry) => {
      if (!String(entry.name || "").trim()) errors.push(`${token.tokenId}: requirement lacks a name`);
      if (!COVERAGE_LABELS.has(entry.coverage)) errors.push(`${token.tokenId}/${entry.name}: invalid coverage ${entry.coverage}`);
      const evidenceIds = String(entry.evidence || "").match(/[A-Z][A-Z0-9]*(?:-[A-Z][A-Z0-9]*)*-\d{3}[A-Z]?/g) || [];
      evidenceIds.forEach((id) => {
        if (!tests.has(id)) errors.push(`${token.tokenId}/${entry.name}: referenced requirement test ${id} does not exist`);
      });
      if (entry.coverage === "Covered" && !evidenceIds.length) {
        errors.push(`${token.tokenId}/${entry.name}: Covered requirement lacks executable evidence`);
      }
    });

    (token.scenarios || []).forEach((entry) => {
      const context = `${token.tokenId}/${entry.id || "missing-id"}`;
      if (!String(entry.id || "").trim()) errors.push(`${token.tokenId}: scenario lacks an ID`);
      if (scenarioIds.has(entry.id)) errors.push(`${context}: duplicate scenario ID`);
      scenarioIds.add(entry.id);
      if (!String(entry.name || "").trim()) errors.push(`${context}: missing scenario name`);
      if (!COVERAGE_LABELS.has(entry.coverage)) errors.push(`${context}: invalid coverage ${entry.coverage}`);
      if (!TEST_LEVELS.has(entry.level)) errors.push(`${context}: invalid test level ${entry.level}`);
      ["setup", "action", "expected", "gaps"].forEach((field) => {
        if (!String(entry[field] || "").trim()) errors.push(`${context}: missing ${field}`);
      });
      if (!Array.isArray(entry.assertions) || !entry.assertions.length) errors.push(`${context}: missing exact assertions`);
      ["reload", "undo", "sandboxDiscard", "sandboxCommit", "teambuilder"].forEach((flag) => {
        if (typeof entry.flags?.[flag] !== "boolean") errors.push(`${context}: ${flag} must be Yes/No data`);
      });

      const hasTest = entry.testId && entry.testId !== "None";
      if (hasTest) {
        const discovered = tests.get(entry.testId);
        if (!discovered) {
          errors.push(`${context}: referenced test ${entry.testId} does not exist`);
        } else if (normalizePath(entry.testFile) !== discovered.file) {
          errors.push(`${context}: ${entry.testId} exists in ${discovered.file}, not ${entry.testFile}`);
        }
      } else if (entry.testFile !== "None") {
        errors.push(`${context}: test file is present without a test ID`);
      }

      if (entry.coverage === "Covered" && !hasTest) errors.push(`${context}: Covered scenario lacks an executable test`);
      if (entry.coverage === "Covered" && ["Static Wiring", "Manual-only"].includes(entry.level)) {
        errors.push(`${context}: ${entry.level} cannot be called Covered`);
      }
      if (entry.coverage === "Static Only" && entry.level !== "Static Wiring") {
        errors.push(`${context}: Static Only scenario must use Static Wiring level`);
      }
      if (entry.coverage === "Manual Only" && entry.level !== "Manual-only") {
        errors.push(`${context}: Manual Only scenario must use Manual-only level`);
      }
    });
  });

  partialIds.forEach((id) => {
    if (!tokenIds.has(id)) errors.push(`${id}: current partial Token is missing from TOKEN_QA_COVERAGE`);
  });

  (coverageData.revisionWatchlist || []).forEach((entry) => {
    const definition = contract.definitions[entry.tokenId];
    if (!definition) errors.push(`${entry.tokenId}: revision watchlist references an unknown Token`);
    if (watchlistIds.has(entry.tokenId)) errors.push(`${entry.tokenId}: duplicate revision watchlist entry`);
    watchlistIds.add(entry.tokenId);
    if (!String(entry.behavior || "").trim()) errors.push(`${entry.tokenId}: revision watchlist behavior is missing`);
    if (!COVERAGE_LABELS.has(entry.coverage)) errors.push(`${entry.tokenId}: invalid revision watchlist coverage ${entry.coverage}`);
    const hasNamedExecutableScenario = coverageData.tokens
      .find((token) => token.tokenId === entry.tokenId)
      ?.scenarios?.some((scenarioEntry) => scenarioEntry.testId !== "None" && scenarioEntry.testFile !== "None");
    if (!["Static Only", "Not Covered", "Manual Only", "Blocked By Ruling"].includes(entry.coverage)
      && !hasNamedExecutableScenario) {
      errors.push(`${entry.tokenId}: revision watchlist cannot claim ${entry.coverage} without a named executable scenario`);
    }
    if (!String(entry.evidence || "").trim() || !String(entry.currentGap || "").trim()) {
      errors.push(`${entry.tokenId}: revision watchlist evidence/current gap is incomplete`);
    }
    const evidenceIds = String(entry.evidence || "").match(/[A-Z]{2,8}-\d{3}/g) || [];
    evidenceIds.forEach((id) => {
      if (!tests.has(id)) errors.push(`${entry.tokenId}: referenced watchlist test ${id} does not exist`);
    });
  });
  ["cold-wave", "counterspell", "seven-tools", "smokescreen", "foresight-curse"].forEach((id) => {
    if (!watchlistIds.has(id)) errors.push(`${id}: approved catalog/revision behavior is missing from the QA watchlist`);
  });

  const untracked = [...tokenIds].filter((id) => !trackedIds.has(id));
  if (untracked.length) errors.push(`Untracked Tokens included: ${untracked.join(", ")}`);

  return { errors, tests, partialDefinitions, verifiedDefinitions };
}

function renderReport(validation) {
  const definitionOrder = new Map(Object.values(contract.definitions).map((definition, index) => [definition.id, index]));
  const tokens = [...coverageData.tokens].sort((a, b) => definitionOrder.get(a.tokenId) - definitionOrder.get(b.tokenId));
  const scenarios = tokens.flatMap((token) => token.scenarios.map((entry) => ({ token, entry })));
  const requirements = tokens.flatMap((token) => token.requirements.map((entry) => ({ token, entry })));
  const coverageCounts = [...COVERAGE_LABELS].map((label) => [label, scenarios.filter(({ entry }) => entry.coverage === label).length]);
  const requirementCounts = [...COVERAGE_LABELS].map((label) => [label, requirements.filter(({ entry }) => entry.coverage === label).length]);
  const levelCounts = [...TEST_LEVELS].map((level) => [level, scenarios.filter(({ entry }) => entry.level === level).length]);
  const browserTestCount = new Set(scenarios
    .filter(({ entry }) => entry.level === "Browser" && entry.testId !== "None")
    .map(({ entry }) => entry.testId)).size;
  const usabilityCounts = contract.list.reduce((counts, definition) => {
    counts[definition.runtimeUsability] = (counts[definition.runtimeUsability] || 0) + 1;
    return counts;
  }, {});
  const lines = [
    "> **Authority: IMPLEMENTATION STATUS / QA EVIDENCE**",
    "> This generated report describes and retains test evidence. It does not create gameplay rules or promote any Token by itself.",
    "",
    "# Token QA Coverage",
    "",
    `- Coverage revision: \`${coverageData.COVERAGE_REVISION}\``,
    `- Token contract revision: \`${contract.contractDefinitionRevision}\``,
    `- Tracked partial/verified Tokens: **${tokens.length}/${validation.partialDefinitions.length + validation.verifiedDefinitions.length}**`,
    `- Current partial Tokens: **${validation.partialDefinitions.length}**`,
    `- Verified-complete Tokens with retained QA evidence: **${validation.verifiedDefinitions.length}**`,
    `- Contract definitions: **${contract.list.length}**`,
    `- Runtime usability: **${usabilityCounts.usable || 0} usable**, **${usabilityCounts.guidedOnly || 0} Guided only**, **${usabilityCounts.developmentOnly || 0} development only**, **${usabilityCounts.blocked || 0} blocked**`,
    `- Catalog/revision watchlist entries: **${(coverageData.revisionWatchlist || []).length}**`,
    `- Named scenarios: **${scenarios.length}**`,
    `- Unique executable Browser tests: **${browserTestCount}**`,
    "- Source: `scripts/token-qa-coverage-data.js`",
    "- Freshness check: `npm run test:token-coverage`",
    "- Regenerate after intentional inventory edits: `npm run generate:token-coverage`",
    "",
    "## Evidence Rules",
    "",
    "- `Covered` requires a named executable test with result-level assertions.",
    "- `Partially Covered` means executable assertions exist, but one or more required outcomes are absent.",
    "- `Static Only` means source or contract wiring is inspected; no gameplay result is proven.",
    "- `Manual Only` means a human-observed path exists without automated result assertions.",
    "- `Not Covered` means the required result is not presently exercised.",
    "- `Blocked By Ruling` means a stable expected result cannot be written yet.",
    "- Pure JSON serialization is Unit evidence only. It is not backend reload or Browser refresh evidence.",
    "- Snapshot restoration may support Unit-level state-restoration evidence, but it is not controller undo or visible Browser undo evidence.",
    "- Source ordering is Static Wiring evidence only. It is not controller Integration or Browser smoke evidence.",
    "",
    "## Summary",
    "",
    "### Scenario Status",
    "",
    "| Coverage | Count |",
    "| --- | ---: |",
    ...coverageCounts.map(([label, count]) => `| ${label} | ${count} |`),
    "",
    "### Required Outcome Status",
    "",
    "| Coverage | Count |",
    "| --- | ---: |",
    ...requirementCounts.map(([label, count]) => `| ${label} | ${count} |`),
    "",
    "### Test Level",
    "",
    "| Level | Count |",
    "| --- | ---: |",
    ...levelCounts.map(([level, count]) => `| ${level} | ${count} |`),
    "",
    levelCounts.find(([level]) => level === "Browser")?.[1]
      ? "Browser scenarios use visible controls, backend refresh, visible result assertions, and console/error collection. They do not mark a Token verified complete."
      : "There are currently **no Browser-level Token scenarios**. Static Wiring must not be treated as end-to-end coverage.",
    "",
    "## Catalog And Revision Watchlist",
    "",
    "These entries are explicit non-coverage records. Catalog presence, contract metadata, and dormant runtime wiring do not prove their gameplay results.",
    "",
    "| Token | Runtime status | Runtime usability | Approved/revised behavior | Coverage | Evidence | Current gap |",
    "| --- | --- | --- | --- | --- | --- | --- |",
    ...(coverageData.revisionWatchlist || []).map((entry) => {
      const definition = contract.definitions[entry.tokenId];
      return `| ${markdown(definition.name)} | ${definition.runtimeImplementationStatus} | ${definition.runtimeUsability} | ${markdown(entry.behavior)} | ${entry.coverage} | ${markdown(entry.evidence)} | ${markdown(entry.currentGap)} |`;
    }),
    "",
    "## Token Inventory",
    ""
  ];

  tokens.forEach((token) => {
    const definition = contract.definitions[token.tokenId];
    lines.push(`### ${definition.name}`);
    lines.push("");
    lines.push(`- **Token ID:** \`${definition.id}\``);
    lines.push(`- **Runtime status:** \`${definition.runtimeImplementationStatus}\``);
    lines.push(`- **Runtime usability:** \`${definition.runtimeUsability}\` - ${markdown(definition.runtimeUsabilityReason)}`);
    lines.push(`- **Resolver:** \`${definition.resolverMode}\` / \`${definition.resolverId}\``);
    lines.push("");
    lines.push("#### Required Outcome Coverage");
    lines.push("");
    lines.push("| Required outcome | Coverage | Evidence | Current gap |");
    lines.push("| --- | --- | --- | --- |");
    token.requirements.forEach((entry) => {
      lines.push(`| ${markdown(entry.name)} | ${entry.coverage} | ${markdown(entry.evidence)} | ${markdown(entry.gap || "None recorded.")} |`);
    });
    lines.push("");
    lines.push("#### Named Scenarios");
    lines.push("");
    token.scenarios.forEach((entry) => {
      lines.push(`##### ${entry.id} - ${entry.name}`);
      lines.push("");
      lines.push(`- **Coverage:** ${entry.coverage}`);
      lines.push(`- **Test level:** ${entry.level}`);
      lines.push(`- **Test file:** \`${entry.testFile}\``);
      lines.push(`- **Test ID:** \`${entry.testId}\``);
      lines.push(`- **Setup:** ${entry.setup}`);
      lines.push(`- **Action:** ${entry.action}`);
      lines.push(`- **Expected gameplay result:** ${entry.expected}`);
      lines.push("- **Exact assertions:**");
      entry.assertions.forEach((assertion) => lines.push(`  - ${assertion}`));
      lines.push(`- **Reload tested:** ${yesNo(entry.flags.reload)}`);
      lines.push(`- **Undo tested:** ${yesNo(entry.flags.undo)}`);
      lines.push(`- **Sandbox discard tested:** ${yesNo(entry.flags.sandboxDiscard)}`);
      lines.push(`- **Sandbox commit tested:** ${yesNo(entry.flags.sandboxCommit)}`);
      lines.push(`- **Teambuilder enforcement tested:** ${yesNo(entry.flags.teambuilder)}`);
      lines.push(`- **Current gaps:** ${entry.gaps}`);
      lines.push("");
    });
  });

  lines.push("## Missing Automated Coverage Before The Next Token Batch");
  lines.push("");
  tokens.forEach((token) => {
    const missing = token.requirements.filter((entry) => ["Not Covered", "Manual Only", "Static Only", "Blocked By Ruling"].includes(entry.coverage));
    if (!missing.length) return;
    lines.push(`- **${contract.definitions[token.tokenId].name}:** ${missing.map((entry) => entry.name).join("; ")}.`);
  });
  lines.push("");
  lines.push("## Minimal Manual Browser Smoke");
  lines.push("");
  lines.push("1. In the full Live Referee with normal multiplayer identity, declare one current-slice Token and verify the prompted response owner, visible resolution announcement, and inventory/log result.");
  lines.push("2. At real Gym boundaries, verify the approved final Token-consumption and multi-Gym expiration rulings once those universal lifecycle decisions are settled.");
  lines.push("");
  return `${lines.join("\n")}\n`;
}

function buildReport() {
  const validation = validateCoverage();
  if (validation.errors.length) {
    const error = new Error(`Token QA coverage validation failed:\n- ${validation.errors.join("\n- ")}`);
    error.validation = validation;
    throw error;
  }
  return { validation, report: renderReport(validation) };
}

function checkFreshness(report) {
  if (!fs.existsSync(OUTPUT_PATH)) throw new Error("TOKEN_QA_COVERAGE.md is missing. Run npm run generate:token-coverage.");
  const current = fs.readFileSync(OUTPUT_PATH, "utf8");
  if (current !== report) throw new Error("TOKEN_QA_COVERAGE.md is stale. Run npm run generate:token-coverage and review the change.");
}

function printSummary() {
  const validation = validateCoverage();
  if (validation.errors.length) throw new Error(validation.errors.join("\n"));
  const definitionOrder = new Map(Object.values(contract.definitions).map((definition, index) => [definition.id, index]));
  const tokens = [...coverageData.tokens].sort((a, b) => definitionOrder.get(a.tokenId) - definitionOrder.get(b.tokenId));
  const scenarios = tokens.flatMap((token) => token.scenarios.map((entry) => ({ token, entry })));
  const counts = {};
  const levelCounts = {};
  const requirementCounts = {};
  scenarios.forEach(({ entry }) => { counts[entry.coverage] = (counts[entry.coverage] || 0) + 1; });
  scenarios.forEach(({ entry }) => { levelCounts[entry.level] = (levelCounts[entry.level] || 0) + 1; });
  tokens.flatMap((token) => token.requirements).forEach((entry) => {
    requirementCounts[entry.coverage] = (requirementCounts[entry.coverage] || 0) + 1;
  });
  console.log(`Token QA coverage: ${tokens.length} tracked partial/verified Tokens; ${scenarios.length} named scenarios; ${(coverageData.revisionWatchlist || []).length} catalog/revision watchlist entries.`);
  console.log(`Scenario status: ${[...COVERAGE_LABELS].filter((label) => counts[label]).map((label) => `${label} ${counts[label]}`).join(" | ")}`);
  console.log(`Required outcomes: ${[...COVERAGE_LABELS].filter((label) => requirementCounts[label]).map((label) => `${label} ${requirementCounts[label]}`).join(" | ")}`);
  console.log(`Evidence levels: ${[...TEST_LEVELS].filter((level) => levelCounts[level]).map((level) => `${level} ${levelCounts[level]}`).join(" | ")}`);
  console.log(`Unique executable Browser tests: ${new Set(scenarios.filter(({ entry }) => entry.level === "Browser").map(({ entry }) => entry.testId)).size}`);
  scenarios.forEach(({ token, entry }) => {
    const evidence = entry.testId === "None" ? entry.level : entry.testId;
    console.log(`${entry.coverage.padEnd(17)} ${entry.id.padEnd(24)} ${contract.definitions[token.tokenId].name} - ${entry.name} [${evidence}]`);
  });
}

if (require.main === module) {
  try {
    const args = new Set(process.argv.slice(2));
    const { report } = buildReport();
    if (args.has("--check")) {
      checkFreshness(report);
      console.log("TOKEN_QA_COVERAGE.md is fresh and every Covered scenario has an executable test ID.");
    } else {
      fs.writeFileSync(OUTPUT_PATH, report, "utf8");
      console.log(`Generated TOKEN_QA_COVERAGE.md for ${coverageData.tokens.length} tracked partial/verified Tokens.`);
    }
    if (args.has("--summary")) printSummary();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = Object.freeze({ buildReport, checkFreshness, printSummary, validateCoverage, OUTPUT_PATH });
