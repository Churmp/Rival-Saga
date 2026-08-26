#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const ROOT = path.resolve(__dirname, "..");
const BRANCH = "audit/purge-v1-runtime";

function git(args, inherit = false) {
  const out = execFileSync("git", args, {
    cwd: ROOT,
    encoding: "utf8",
    stdio: inherit ? "inherit" : ["ignore", "pipe", "pipe"]
  });
  return typeof out === "string" ? out.trim() : "";
}
function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8").replace(/\r/g, "");
}
function normalize(text) {
  return String(text).replace(/\r/g, "").replace(/[ \t]+$/gm, "").replace(/\n+$/g, "") + "\n";
}
function write(rel, text) {
  fs.writeFileSync(path.join(ROOT, rel), normalize(text), "utf8");
}
function count(text, needle) {
  return text.split(needle).length - 1;
}
function replaceExact(text, from, to, label) {
  const hits = count(text, from);
  if (hits !== 1) throw new Error(`${label}: expected exactly 1 match, found ${hits}.`);
  return text.replace(from, to);
}
function removeExact(text, from, label) {
  return replaceExact(text, from, "", label);
}
function forbid(text, markers, label) {
  const found = markers.filter((marker) => text.includes(marker));
  if (found.length) throw new Error(`${label}: stale authoritative marker(s) survived: ${found.join(", ")}`);
}

try {
  if (git(["branch", "--show-current"]) !== BRANCH) throw new Error(`Run only on ${BRANCH}.`);
  const status = git(["status", "--porcelain"]);
  if (status) throw new Error(`Working tree must be clean.\n${status}`);

  let architecture = read("ARCHITECTURE.md");

  architecture = replaceExact(
    architecture,
    "- Ruleset/content: editable Rival Saga content, such as token art, token definitions, Pokemon tiers, sprite aliases, trainer classes, perks, shop data, and encounter wheels.",
    "- Ruleset/content: editable Rival Saga content, such as token art, token definitions, Pokemon tiers, sprite aliases, trainer classes, perks, shop data, Route data, and current reward wheels.",
    "ARCHITECTURE ruleset/content examples"
  );

  architecture = replaceExact(
    architecture,
    `Action Phase behavior is now a pinned ruleset contract. \`action-phase-v2-real-series\` is the current/default Rival Saga ruleset for newly created games and lobbies. V2 is the exclusive target for new feature development. \`action-phase-v1-current-series\` is archived/maintenance-only: preserve playability, explicitly persisted V1 saves, and narrowly requested V1 fixes, but do not refactor or extend V1 for new gameplay. Existing V1 saves remain supported for compatibility and must not be converted to V2 merely by loading.\n\nV1 compatibility must not force V2 gameplay to use V1 models. In particular, V2 Encounter work should not rewrite or inherit the root Encounter Wheel, Hidden Grotto, Fishing/Surf toggles, rod access, or Hyperspace sub-wheel. V2 Route ordinary populations, Premium Resident slots, discoveries, private knowledge, suppressions, temporary injections, and same-Route rerolls belong to the V2 Route system boundary. Shared infrastructure remains shared only where the actual rule remains common; do not duplicate the entire Token system, but isolate version-specific Token interactions against the V2 system they affect. Broad V1 file/folder migration is not a prerequisite for V2 development.`,
    `Action Phase behavior is a single current ruleset contract. \`action-phase-v2-real-series\` remains the stored identifier for the Route-era implementation, but there is no supported alternate V1 runtime and no requirement to load or continue V1 saves. Historical Action Phase behavior belongs in Git history and the pre-removal archive branches, not in production compatibility paths. New work extends the one current ruleset rather than adding version forks.\n\nRoute Exploration is the current Pokemon-acquisition Action path. The retired pre-Route encounter and grotto systems are not production models and must not be restored as compatibility branches. Shared Pokemon-result, reroll, and Token infrastructure remains shared where the current Route-era rules still use it; existing \`state.v2\` and \`v2*\` names may remain until a separate naming cleanup. See \`versions/README.md\` for the current versioning authority.`,
    "ARCHITECTURE current runtime authority"
  );

  architecture = replaceExact(
    architecture,
    "Current location rule foundations:",
    "Current surviving location rule foundations (Route Exploration is documented separately by the current Route runtime):",
    "ARCHITECTURE Action location intro"
  );
  architecture = removeExact(
    architecture,
    "- Encounter: roll the Encounter Wheel for the current gym twice.\n",
    "ARCHITECTURE retired Encounter location bullet"
  );
  architecture = replaceExact(
    architecture,
    "- Pokemon Center: cleanse and protect the Encounter Wheel for the gym, restore recent released Pokemon for tier-scaled costs, or buy an Emergency Immunity Token for 5000 that expires at gym end.",
    "- Pokemon Center: restore recent released Pokemon for tier-scaled costs or buy an Emergency Immunity Token for 5000 that expires at gym end; current behavior has no dependency on the retired pre-Route encounter runtime.",
    "ARCHITECTURE Pokemon Center retired dependency"
  );
  architecture = removeExact(
    architecture,
    "- Hidden Grotto: pay 1500, roll 3 random types, choose one, then roll 3 Pokemon from the chosen type and choose one. The Pokemon roll pool includes Battle Tiers up to two tier steps above the current Gym's natural Battle Tier, clamped at Master Elite. Pokemon in LC or LC Elite that can still evolve are excluded, but fully evolved or single-stage Pokemon in those low tiers remain eligible.\n",
    "ARCHITECTURE retired grotto bullet"
  );

  forbid(
    architecture,
    ["action-phase-v1-current-series", "Encounter Wheel", "Hidden Grotto", "Existing V1 saves remain supported", "V1 compatibility must"],
    "ARCHITECTURE.md"
  );

  let statusDoc = read("IMPLEMENTATION_STATUS.md");

  statusDoc = replaceExact(
    statusDoc,
    "Games now carry an explicit Action Phase version through `ruleset.actionPhaseVersion`. `action-phase-v2-real-series` is the current/default Rival Saga ruleset for newly created games and lobbies, and it mounts the V2 Route Action Phase workspace instead of the V1 location board. `action-phase-v1-current-series` is archived/maintenance-only: explicitly persisted V1 saves remain supported for compatibility and must keep loading as V1 without being converted to V2. New feature development targets V2 exclusively.",
    "Rival Saga now has one supported playable Action Phase runtime. `action-phase-v2-real-series` remains the stored identifier for the current Route-era ruleset and mounts the Route Action workspace for all supported games. The retired V1 Action Phase is preserved only in Git history and archive branches; production no longer provides a V1 compatibility path or guarantees that V1 saves can continue as V1.",
    "IMPLEMENTATION_STATUS current runtime summary"
  );
  statusDoc = replaceExact(
    statusDoc,
    "V1 is now documented as maintenance/freeze-oriented, while V2 is the active gameplay-development target. ",
    "The retired V1 runtime is no longer a maintenance or compatibility target. ",
    "IMPLEMENTATION_STATUS retired V1 framing"
  );

  statusDoc = replaceExact(
    statusDoc,
    "Focused unit/static coverage is recorded in `scripts/test-action-phase-balance.js`. Browser verification covered the canonical location board, multi-Pokémon Silph panel, exact Slot Machine distribution, legacy Ticket/visit display migration, and a clean current-bundle console. Full end-to-end mutation coverage for every location lifecycle is still required before individual effects can be labeled `verifiedComplete`.",
    "The retired V1 Action-balance suite was removed with its runtime. Current Action/Route coverage is split across `scripts/test-action-operation-contract.js`, `scripts/test-v2-route-browser-mount.js`, `scripts/test-v2-route-runtime-sequences.js`, and the Route engine tests under `versions/next-action-phase/tests/`. Full end-to-end mutation coverage for every surviving location lifecycle is still required before individual effects can be labeled `verifiedComplete`.",
    "IMPLEMENTATION_STATUS removed V1 balance-suite reference"
  );

  statusDoc = replaceExact(
    statusDoc,
    "Action visits now create a persisted, idempotent Action operation. Visit confirmation spends the Action once, while the operation keeps the same player and Action number current until its linked location session and chronology blockers finish. Hidden Grotto, Encounter, Silph Co, Bulletin Board, wheel services, Dragon's Den, Ranger Base, Daycare, Game Corner, Pokemon Center, Graveyard, Department Store, and PC are wired to the shared contract. Multi-service locations require the visible Finish Action control, which now uses a compact authoritative completion route rather than a full-state upload. Fully obtained Encounter sessions complete automatically and old fully obtained review sessions repair on load. Generic immediate services complete through the shared path. Interaction resolution retries a completion that was waiting on a linked response chain.",
    "Surviving shared-location Action visits use persisted, idempotent Action operations. Visit confirmation spends the Action once, while the operation keeps the same player and Action number current until its linked current-runtime session and chronology blockers finish. Multi-service locations use the visible Finish Action control and compact authoritative completion route rather than a full-state upload. Route Exploration uses its own current Route Action -> opportunity -> result -> acquisition chain instead of the retired pre-Route encounter/grotto session model. Generic immediate services complete through the shared path, and interaction resolution retries completion when it was waiting on a linked response chain.",
    "IMPLEMENTATION_STATUS retired Action-operation wiring"
  );

  statusDoc = replaceExact(
    statusDoc,
    "Action destination startup now recognizes the exact backend reservation that immediately precedes a local location starter. Shared visit starters and Game Corner continue only their matching accepted reservation, while Encounter uses an explicit post-reservation path and reports startup failure so the existing rollback can release the commit. Action Phase also exposes a visible Demo Mode toggle and direct trainer selection through the turn rail. New or geometry-free clients default Live Referee to docked mode, with bottom docking on narrow screens. Isolated production-browser scenarios verified Encounter acquisition repair, Department Store start/finish, Game Corner Slot Machine spin/review/finish, and legacy Game Corner Ticket detection plus a Safari result through its five-player response window while the save stayed `Saved`.",
    "Action destination startup recognizes the exact backend reservation that immediately precedes a surviving local location starter, and stale accepted reservations are repaired when their visit flow is gone. Current Route acquisition does not use the retired pre-Route Encounter starter path. Action Phase also exposes a visible Demo Mode toggle and direct trainer selection through the turn rail. New or geometry-free clients default Live Referee to docked mode, with bottom docking on narrow screens. Current focused coverage verifies the shared Action-operation reservation/repair contract separately from Route runtime acquisition coverage.",
    "IMPLEMENTATION_STATUS retired Encounter startup path"
  );

  forbid(
    statusDoc,
    [
      "action-phase-v1-current-series",
      "Hidden Grotto",
      "Encounter Wheel",
      "scripts/test-action-phase-balance.js",
      "V1 saves remain supported",
      "maintenance/freeze-oriented",
      "Encounter acquisition repair",
      "while Encounter uses an explicit post-reservation path"
    ],
    "IMPLEMENTATION_STATUS.md"
  );

  write("ARCHITECTURE.md", architecture);
  write("IMPLEMENTATION_STATUS.md", statusDoc);

  git(["add", "ARCHITECTURE.md", "IMPLEMENTATION_STATUS.md"]);
  execFileSync("git", ["diff", "--cached", "--check"], { cwd: ROOT, stdio: "inherit" });
  const staged = git(["diff", "--cached", "--stat"]);
  if (!staged) throw new Error("Stage 10D produced no documentation diff.");
  console.log(`\n${staged}`);

  git(["commit", "-m", "Align authoritative docs with current-only runtime"], true);
  git(["push", "origin", BRANCH], true);
  console.log("\nStage 10D documentation truth complete.");
} catch (error) {
  console.error(`\nV1 purge Stage 10D documentation correction failed safely:\n${error.message}`);
  try { execFileSync("git", ["reset", "--hard", "HEAD"], { cwd: ROOT, stdio: "ignore" }); } catch {}
  process.exitCode = 1;
}
