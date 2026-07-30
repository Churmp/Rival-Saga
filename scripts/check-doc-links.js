const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const ignoredDirectories = new Set([".git", "data", "node_modules"]);
const authorityRequirements = new Map([
  ["RULEBOOK.md", "CANONICAL RULES"],
  ["TIMING_AND_PHASES.md", "CANONICAL RULES"],
  ["SAGA_TOKEN_RULES.md", "CANONICAL SUBSYSTEM RULES"],
  ["LIVE_REFEREE_GAMEPLAY_CONTROLLER.md", "CANONICAL SUBSYSTEM RULES"],
  ["IMPLEMENTATION_STATUS.md", "IMPLEMENTATION STATUS"],
  ["ARCHITECTURE.md", "IMPLEMENTATION ARCHITECTURE"],
  ["EFFECT_RESOLUTION_ARCHITECTURE.md", "IMPLEMENTATION ARCHITECTURE"],
  ["TRAINER_CLASS_IMPORT_PREP.md", "IMPLEMENTATION ARCHITECTURE"],
  ["CODEX_RULES_UNDERSTANDING_AUDIT.md", "HISTORICAL / SUPERSEDED"],
  ["GAMEFLOW_ARCHEOLOGY.md", "HISTORICAL / SUPERSEDED"],
  ["LIVE_TABLE_ARCHITECTURE.md", "HISTORICAL / SUPERSEDED"],
  ["TOKEN_TIMING_ARCHITECTURE.md", "HISTORICAL / SUPERSEDED"],
  ["LIVE_REFEREE_EFFECT_DRAWER_ARCHITECTURE.md", "HISTORICAL / SUPERSEDED"],
  ["RULEBOOK_ALIGNMENT_AUDIT.md", "HISTORICAL / SUPERSEDED"],
  ["RULEBOOK_SOURCE_OF_TRUTH_PLAN.md", "MIGRATION PLAN"],
  ["TOKEN_EFFECT_MATRIX.md", "IMPLEMENTATION STATUS"]
]);

function markdownFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (ignoredDirectories.has(entry.name)) return [];
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return markdownFiles(fullPath);
    return entry.isFile() && entry.name.toLowerCase().endsWith(".md") ? [fullPath] : [];
  });
}

function localLinkTarget(sourceFile, rawTarget) {
  const target = rawTarget.trim().replace(/^<|>$/g, "");
  if (!target || target.startsWith("#") || /^[a-z][a-z0-9+.-]*:/i.test(target)) return null;
  const withoutAnchor = target.split("#", 1)[0].split("?", 1)[0];
  return withoutAnchor ? path.resolve(path.dirname(sourceFile), decodeURIComponent(withoutAnchor)) : null;
}

const errors = [];
const files = markdownFiles(root);
files.forEach((file) => {
  const text = fs.readFileSync(file, "utf8");
  const linkPattern = /\[[^\]]*\]\(([^)]+)\)/g;
  for (const match of text.matchAll(linkPattern)) {
    const target = localLinkTarget(file, match[1]);
    if (target && !fs.existsSync(target)) {
      errors.push(`${path.relative(root, file)}: missing local link target ${match[1]}`);
    }
  }
});

authorityRequirements.forEach((authority, relativePath) => {
  const file = path.join(root, relativePath);
  if (!fs.existsSync(file)) {
    errors.push(`${relativePath}: required documentation file is missing`);
    return;
  }
  const header = fs.readFileSync(file, "utf8").split(/\r?\n/, 3).join("\n");
  if (!header.includes(`Authority: ${authority}`)) {
    errors.push(`${relativePath}: expected Authority: ${authority}`);
  }
});

if (errors.length) {
  console.error(`Documentation audit failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Documentation audit passed: ${files.length} Markdown files checked; ${authorityRequirements.size} authority banners verified.`);
