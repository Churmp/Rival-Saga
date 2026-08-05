"use strict";

const fs = require("node:fs");
const path = require("node:path");
const contract = require("../token-effect-contract.js");

const outputPath = path.join(__dirname, "..", "TOKEN_IMPLEMENTATION_FINAL_HANDOFF.md");

const missingRulingById = Object.freeze({
  "after-you": "Settle the exact copied-effect behavior for Substitute, Follow Me, Parting Shot, Embargo, Smokescreen, Counterspell, 7 Tools, Teleport, Revenge, and custom-choice Control Tokens; each case currently fails closed independently."
});

const implementationBlockerById = Object.freeze({
  "foresight-curse": "Authenticated player-scoped move delivery, authorized refresh, private rendering, and revocation are not implemented; shared payloads are stripped and activation fails closed."
});

const verifiedSmokeById = Object.freeze({
  "arena-trap": "Trap one rival Active-roster Pokemon, choose compensation, refresh, then confirm it stays forced and Curse Immune.",
  incinerate: "Select one legal Item/TM from every rival, resolve, refresh, then undo and confirm all exact records return.",
  "steal-token": "Steal one exact rival Active-roster Pokemon, refresh, then undo and confirm ownership/team references restore.",
  counterspell: "Use Restrict, answer with Immunity, then Counterspell; refresh and confirm the exact Restrict record exists but is on cooldown.",
  "seven-tools": "Use Restrict, answer with Immunity, then 7 Tools; refresh and confirm Immunity is negated and one temporary Immunity copy exists.",
  immunity: "Use Restrict on one exact Pokemon, answer with Immunity, refresh, then undo the root event and confirm both exact Tokens return.",
  "extra-encounter-token": "Use Extra Encounter on one chosen player during Action Phase, refresh the one-roll Encounter session, then undo and confirm the exact Token returns.",
  "toxic-curse": "Apply Toxic Curse from one exact anchor; verify every unprotected matching Active-roster Pokemon has the Toxic Orb overlay, refresh, then undo.",
  "iron-ball-curse": "Apply Iron Ball Curse from one exact anchor; verify every unprotected matching Active-roster Pokemon has the Iron Ball overlay, refresh, then undo.",
  "flame-curse": "Apply Flame Curse from one exact anchor; verify every unprotected matching Active-roster Pokemon has the Flame Orb overlay, refresh, then undo.",
  "silencing-curse": "Apply Silencing Curse from one exact anchor, complete required revisions for all affected matching Pokemon, refresh, then undo.",
  "imprison-curse": "Apply Imprison Curse from one exact anchor; verify every affected matching Pokemon gets neutral Nature and zero effective EV/IV values without destroying saved builds, then undo.",
  smokescreen: "Answer a single-target Pokemon effect with Smokescreen, complete the wheel and any required corresponding-target choice, refresh, then confirm the original target was replaced at most once.",
  "cold-wave": "Declare Cold Wave while one explicit ongoing effect and one duration-only effect are active; refresh, confirm only the explicit ongoing effect is suppressed, then undo.",
  "move-deleter": "Choose Recover with Move Deleter, advance to the next Gym, confirm Teambuilder rejects Recover, refresh, then undo the activation.",
  "purge-curse": "Declare Purge on one player, complete payout, confirm the immutable brought snapshot releases exactly once without a response window, refresh, then undo.",
  teleport: "Answer Restrict with Teleport, refresh, advance to the next Gym's matching phase, resolve the one restored response window, then refresh and confirm it does not reopen.",
  revenge: "Create one qualifying post-payout Revenge offer, refresh the required-choice screen, select two exact brought Pokemon, resolve, then undo from History.",
  "lingering-aroma": "Replace one benefiting ongoing effect, have another player target you, and confirm exactly $500 transfers before the effect resolves.",
  "haze-curse": "Choose two different species anchors and confirm duplicate species disable while unprotected matching Active Pokemon receive Haze.",
  "knock-off-curse": "Remove the final exact TM copy granting a locked-team move and confirm Team Revision blocks progress without deleting the move.",
  "honey-token": "At End of Action, copy one finalized encounter and confirm the new result has a fresh identity with the same species, form, tier, and level.",
  "devolve-token": "Devolve one safe species anchor, confirm every matching unprotected Active copy uses the temporary parent, then advance through expiration.",
  "follow-me": "Redirect one exact Pokemon effect, resolve it, consume a real Token from the recorded player, then refresh and confirm one inventory copy exists.",
  "ditto-token": "Transform one exact Ditto into Immunity, refresh, and confirm Immunity remains in inventory without activating.",
  "after-you": "Answer Restrict with After You, choose a fresh species, resolve the copy, then confirm the original Restrict resumes."
});

function countBy(values, key) {
  return values.reduce((counts, value) => {
    const name = value[key] || "unknown";
    counts[name] = (counts[name] || 0) + 1;
    return counts;
  }, {});
}

function implementationLabel(definition) {
  if (definition.runtimeImplementationStatus === "verifiedComplete") return "verifiedComplete";
  if (definition.runtimeUsability === "developmentOnly") return "developmentOnly";
  if (definition.runtimeUsability === "blocked") return definition.runtimeImplementationStatus === "blockedByRuling"
    ? "blockedRuling"
    : "blockedMissingImplementation";
  if (definition.runtimeUsability === "guidedOnly") return "guidedOnly";
  if (definition.runtimeImplementationStatus === "partial") return "usablePartial";
  return definition.runtimeImplementationStatus;
}

function reconciledStatus(definition) {
  if (definition.runtimeImplementationStatus === "verifiedComplete") return "verifiedComplete";
  if (definition.runtimeUsability === "usable") return "usablePartial";
  if (definition.runtimeUsability === "guidedOnly") return "guidedOnly";
  if (definition.runtimeUsability === "developmentOnly") return "developmentOnly";
  if (definition.runtimeUsability === "blocked") return definition.runtimeImplementationStatus === "blockedByRuling"
    ? "blockedRuling"
    : "blockedMissingImplementation";
  return "blockedMissingImplementation";
}

function supportedSurfaces(definition) {
  if (definition.id === "extra-encounter-token") {
    return "Live Referee; exact inventory; authoritative Encounter session/overlay; History/result; refresh; undo; sandbox";
  }
  if (definition.id === "follow-me") return "Live Referee corresponding-target redirect; parent-gated Gym relationship; real inventory-copy runtime; Gym-end expiration; refresh; History undo; duplicate prevention";
  if (definition.id === "ditto-token") return "Live Referee searchable canonical Token picker; exact inventory transformation/provenance; no immediate activation; refresh; History undo; duplicate prevention";
  if (definition.id === "lingering-aroma") return "Live Referee exact ongoing-effect selector; linked replacement; confirmed declaration-cost transfer; later-negation retention; refresh; linked expiration; History undo";
  if (definition.id === "move-deleter") return "Live Referee canonical move selector; next-Gym global restriction; Teambuilder selection/validation/import/export enforcement; refresh; phase expiration; History undo";
  if (definition.id === "knock-off-curse") return "Live Referee exact Pokemon/resource selector; exact Item/TM destruction; final-TM Sabotage revision from locked provenance; refresh; History undo";
  if (definition.id === "revenge") return "Production Gym finalization/payout offer; immutable brought snapshot; exact two-Pokemon and optional held-Item choice; decline; terminal idempotency; refresh; History undo";
  if (definition.runtimeImplementationStatus === "verifiedComplete") {
    return "Live Referee; exact inventory; response chain; History/result; refresh; undo; sandbox";
  }
  if (definition.id === "purge-curse") return "Live Referee non-respondable declaration; immutable brought snapshot; post-payout resolver; History; snapshot undo";
  if (definition.id === "teleport") return "Live Referee response; persisted delayed record; deterministic matching-phase return; revalidation; History; refund/no-effect split; refresh/undo/sandbox infrastructure";
  if (definition.id === "cold-wave") return "Live Referee declaration; explicit ongoing-effect suppression record; UI status; Gym-end unsuppression; History; refresh/undo/sandbox infrastructure";
  if (definition.id === "smokescreen") return "Live Referee Guided response; complete wheel; corresponding-target required choice; parent target replacement; History; refresh/undo/sandbox infrastructure";
  if (definition.id === "haze-curse") return "Live Referee two-species selector; duplicate-name disabling; species-wide exact-instance protection; temporary buff suppression";
  if (definition.id === "honey-token") return "End-of-Action exact result selector; fresh acquisition-ready Encounter identity; duplicate-safe resolver";
  if (definition.id === "devolve-token") return "Live Referee species anchor; safe direct-parent validation; temporary species/build overlays; exact expiration restoration";
  if (definition.id === "after-you") return "Live Referee response chain; fresh-target automatic Control copies; Safeguard/Immunity matrix; virtual activation provenance; browser refresh";
  if (definition.runtimeUsability === "blocked") return "Fail-closed picker/controller gate; no consumption";
  if (definition.runtimeUsability === "guidedOnly") return "Live Referee Guided flow; response window where applicable; History audit";
  return "Live Referee declaration/response; exact inventory; pending chain; current resolver; History; shared undo/sandbox infrastructure";
}

function remainingBlocker(definition) {
  if (definition.runtimeImplementationStatus === "verifiedComplete") return "None.";
  if (definition.runtimeUsability === "blocked") {
    return implementationBlockerById[definition.id] || definition.runtimeUsabilityReason;
  }
  if (definition.runtimeUsability === "developmentOnly") return implementationBlockerById[definition.id] || definition.runtimeUsabilityReason;
  if (definition.id === "smokescreen") return "The wheel result remains a Guided table choice; destructive browser refresh and History-undo evidence remain pending.";
  if (definition.runtimeUsability === "guidedOnly") return "Automatic gameplay mutation and effect-specific end-to-end verification are not complete.";
  if (definition.id === "teleport") return "Production support is intentionally limited to exact root Token events handled by the Control controller; BROWSER-011 covers refresh and duplicate prevention, while effect-specific History undo remains pending.";
  if (definition.id === "revenge") return "BROWSER-012 covers confirmation, reload, and History undo; one full payout-to-offer phase-through remains pending.";
  if (definition.id === "move-deleter") return "Destructive browser import/export rejection and History undo evidence remains pending.";
  if (definition.id === "cold-wave") return "Every future ongoing-effect consumer must use the suppression-aware lookup; destructive browser evidence remains pending.";
  if (definition.id === "lingering-aroma") return "Production browser evidence is still needed for provisional withdrawal, later negation retaining payment, refresh, and History undo.";
  if (definition.id === "haze-curse") return "Two-Gym expiration, generated-set enforcement, refresh, and History undo still need effect-specific browser evidence.";
  if (definition.id === "knock-off-curse") return "Final-TM loss still needs a production Sabotage Team Revision browser test through confirmation, refresh, and undo.";
  if (definition.id === "honey-token") return "The exact-result selector and acquisition handoff still need production browser refresh and History-undo evidence.";
  if (definition.id === "devolve-token") return "Illegal-set Team Revision and exact production refresh/undo/expiration still need browser evidence.";
  if (definition.id === "follow-me") return "Gym-end expiration and History undo for the persisted relationship still need effect-specific browser evidence.";
  if (definition.id === "ditto-token") return "The production picker still needs browser refresh, exact transformed-record presentation, and History undo evidence.";
  if (definition.id === "after-you") return "Custom-choice Control Tokens and unsupported Protection interactions remain individually fail-closed; supported chain paths still need History-undo evidence.";
  return "Effect-specific end-to-end coverage and one or more rule-enforcement surfaces remain incomplete; see TOKEN_QA_COVERAGE.md.";
}

function missingRuling(definition) {
  return missingRulingById[definition.id] || "None currently identified; remaining work is implementation or verification.";
}

function smokeTest(definition) {
  if (verifiedSmokeById[definition.id]) return verifiedSmokeById[definition.id];
  if (definition.runtimeUsability === "blocked") return `Own ${definition.name}, enter its legal timing, and confirm it is unavailable with no inventory consumption.`;
  if (definition.runtimeUsability === "developmentOnly") return `Confirm ${definition.name} is unavailable in normal play and run its isolated resolver scenario without authoritative save mutation.`;
  if (definition.runtimeUsability === "guidedOnly") return `Declare ${definition.name} in its legal window, complete the Guided result, refresh, and verify the audit record without duplicate consumption.`;
  return `Declare ${definition.name} against one legal target, resolve its current path, refresh, inspect History, then undo.`;
}

function escapeCell(value) {
  return String(value || "").replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}

const implementationCounts = countBy(contract.list, "runtimeImplementationStatus");
const usabilityCounts = countBy(contract.list, "runtimeUsability");
const reconciledCounts = contract.list.reduce((counts, definition) => {
  const status = reconciledStatus(definition);
  counts[status] = (counts[status] || 0) + 1;
  return counts;
}, {});
const reconciledStatusOrder = [
  "verifiedComplete",
  "usablePartial",
  "guidedOnly",
  "developmentOnly",
  "blockedMissingImplementation",
  "blockedRuling"
];
const lines = [
  "# Token Implementation Final Handoff",
  "",
  `Generated from the canonical ${contract.list.length}-Token contract on 2026-08-04. Contract revision: \`${contract.contractDefinitionRevision || contract.list[0]?.contractDefinitionRevision || "unknown"}\`.`,
  "",
  "## Runtime Truth",
  "",
  `Implementation: ${Object.entries(implementationCounts).map(([key, value]) => `\`${key}\` ${value}`).join(", ")}.`,
  "",
  `Usability: ${Object.entries(usabilityCounts).map(([key, value]) => `\`${key}\` ${value}`).join(", ")}.`,
  "",
  `Exclusive reconciliation: ${reconciledStatusOrder.map((key) => `\`${key}\` ${reconciledCounts[key] || 0}`).join(", ")}.`,
  "",
  "`runtimeImplementationStatus` describes evidence. `runtimeUsability` independently decides whether gameplay may consume the Token. Blocked entries fail before consumption.",
  "",
  "## Ordinary Control Timing",
  "",
  "The shared semantic gate opens ordinary Control during pre-Gym preparation, idle Action destination decisions, Team Building, Shopping, and after Battle Payout reaches a terminal result. It closes during Gym Start procedures, active location operations, interaction chains, required choices, Team Lock, Sabotage, Team Preview, Rival Battles, and unfinished payout. The server-authoritative pre-destination claim/destination race is unchanged; a withdrawn or resolved interruption returns to the same Action player and Action number.",
  "",
  "Focused evidence: `PD-RUNTIME-001` through `PD-RUNTIME-013`, `PD-SERVER-001` through `PD-SERVER-007`, and production browser scenario `BROWSER-009`.",
  "",
  "## Catalog",
  "",
  "| Token | Timing | Reconciled status | Runtime status | Implementation status | Target | Main resolver | Supported surfaces | Remaining blocker | Exact missing ruling | Best manual smoke test |",
  "|---|---|---|---|---|---|---|---|---|---|---|"
];

contract.list.forEach((definition) => {
  const timingValues = definition.usesControlTiming && definition.legalControlContexts?.length
    ? definition.legalControlContexts
    : definition.timingWindows;
  const timing = `${definition.family}: ${timingValues.join(", ") || definition.explicitPhaseTiming || "contract-defined"}`;
  const target = `${definition.selectedTargetType || definition.targetType} -> ${definition.applicationScope || definition.targetScope}`;
  lines.push(`| ${[
    definition.name,
    timing,
    reconciledStatus(definition),
    definition.runtimeUsability,
    implementationLabel(definition),
    target,
    definition.resolverId,
    supportedSurfaces(definition),
    remainingBlocker(definition),
    missingRuling(definition),
    smokeTest(definition)
  ].map(escapeCell).join(" | ")} |`);
});

lines.push(
  "",
  "## Interpretation",
  "",
  "- `verifiedComplete` is reserved for Tokens with named executable evidence across their applicable runtime surfaces.",
  "- `usablePartial` means the current resolver is intentionally available, but the catalog row must not be read as proof of full Saga automation.",
  "- `guidedOnly` means the host records or confirms an approved result through the Guided flow.",
  "- `developmentOnly`, `blockedMissingImplementation`, and `blockedRuling` fail closed in normal play before consumption.",
  `- Category labels, Tickets, and legacy/container records are not part of the ${contract.list.length} activatable contracts.`
);

fs.writeFileSync(outputPath, `${lines.join("\n")}\n`, "utf8");
console.log(`Wrote ${path.basename(outputPath)} (${contract.list.length} Tokens).`);
