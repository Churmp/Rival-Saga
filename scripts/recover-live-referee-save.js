"use strict";

const fs = require("node:fs");
const path = require("node:path");
const lifecycle = require("../interaction-situation-lifecycle.js");

function argument(name, fallback = "") {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? String(process.argv[index + 1] || fallback) : fallback;
}

const gameId = argument("game");
const eventId = argument("event");
const apply = process.argv.includes("--apply");
if (!gameId || !eventId) {
  throw new Error("Usage: node scripts/recover-live-referee-save.js --game <id> --event <id> [--apply]");
}

const root = path.resolve(__dirname, "..");
const gameFile = path.join(root, "data", "games", `${gameId}.json`);
if (!fs.existsSync(gameFile)) throw new Error(`Game save not found: ${gameFile}`);

const game = JSON.parse(fs.readFileSync(gameFile, "utf8"));
const state = game.state || {};
const stateEvent = (state.interactionEvents || []).find((entry) => entry.id === eventId);
const activityEvent = (game.activity || []).find((entry) => entry.id === eventId);
const event = stateEvent || activityEvent;
if (!event) throw new Error(`Event ${eventId} was not found in ${gameId}.`);

const linkedConsumptions = (state.tokenConsumptions || []).filter((entry) => entry.linkedEventId === eventId);
const linkedIds = new Set([
  event.payload?.appliedTokenEffectId,
  event.payload?.createdEffectId,
  event.payload?.resolutionAuditId
].filter(Boolean));
const linkedRecords = [
  ...(state.tokenActivations || []),
  ...(state.lingeringStatuses || []),
  ...(state.effectAuditRecords || []),
  ...(state.effectOperations || [])
].filter((entry) => linkedIds.has(entry.id)
  || entry.sourceEffectId === eventId
  || entry.linkedEventId === eventId);
const targetId = String(event.payload?.selectedRosterInstanceId || "");
const selectedInBattleTeam = Object.values(state.battleTeams || {}).some((byPlayer) => Object.values(byPlayer || {}).some((team) => (
  (team?.selected || []).includes(targetId)
  && (team?.forcedPokemonIds || team?.forcedRosterInstanceIds || []).includes(targetId)
)));
const malformedStateRecords = (state.interactionEvents || []).filter(lifecycle.isMisroutedResponseActivity);
const malformedActivityRecords = (game.activity || []).filter(lifecycle.isMisroutedResponseActivity);
const eventMalformedStateRecords = malformedStateRecords.filter((entry) => entry.activity?.id === eventId);
const mutationEvidence = linkedRecords.length > 0 || selectedInBattleTeam;

const report = {
  gameId,
  eventId,
  tokenName: event.payload?.tokenName || event.sourceId || "",
  actorPlayerId: event.actorPlayerId || "",
  targetPlayerId: event.targetPlayerId || "",
  selectedRosterInstanceId: targetId,
  eventStatus: event.status || "",
  linkedConsumptionCount: linkedConsumptions.length,
  linkedMutationRecordCount: linkedRecords.length,
  selectedAsForcedTeamMember: selectedInBattleTeam,
  malformedStateRecordCount: malformedStateRecords.length,
  malformedActivityRecordCount: malformedActivityRecords.length,
  malformedRecordsForEvent: eventMalformedStateRecords.length,
  safeNoMutationRecovery: !linkedConsumptions.length && !mutationEvidence,
  mode: apply ? "apply" : "dry-run"
};
console.log(JSON.stringify(report, null, 2));

if (!apply) process.exit(0);
if (!report.safeNoMutationRecovery) {
  throw new Error("Automatic no-mutation recovery refused: consumption or mutation evidence exists.");
}
if (!eventMalformedStateRecords.length) {
  throw new Error("Automatic recovery refused: no matching malformed response activity was found in game state.");
}

const recoveredAt = new Date().toISOString();
const recoverEvent = (entry) => {
  if (!entry || entry.id !== eventId) return;
  entry.status = "canceled";
  entry.resolvedAt = recoveredAt;
  entry.updatedAt = recoveredAt;
  entry.resolutionMode = "failed-recovery";
  entry.payload ||= {};
  delete entry.payload.appliedTokenEffectId;
  delete entry.payload.createdEffectId;
  delete entry.payload.resolutionAuditId;
  entry.payload.resolutionResult = "canceledRefunded";
  entry.payload.stateMutations = [];
  entry.payload.recovery = {
    recoveredAt,
    reason: "Response records were misrouted as standalone activities. No Token consumption or gameplay mutation occurred.",
    refundedTokenCount: 0,
    removedMalformedStateRecords: malformedStateRecords.length,
    removedMalformedActivityRecords: malformedActivityRecords.length
  };
  lifecycle.markCanceledRefunded(entry, {
    tokenConsumed: false,
    mutationState: lifecycle.MUTATION_STATES.NOT_STARTED,
    resumesAfter: "Return to Action Phase."
  }, { now: recoveredAt });
};

state.interactionEvents = lifecycle.cleanActivityRecords(state.interactionEvents || []);
game.activity = lifecycle.cleanActivityRecords(game.activity || []);
recoverEvent((state.interactionEvents || []).find((entry) => entry.id === eventId));
recoverEvent((game.activity || []).find((entry) => entry.id === eventId));
state.liveTable ||= {};
if (state.liveTable.currentPendingEventId === eventId || malformedStateRecords.some((entry) => entry.id === state.liveTable.currentPendingEventId)) {
  state.liveTable.currentPendingEventId = "";
}
state.liveTable.lastResolvedEventId = eventId;
state.log ||= [];
const chronologyRecords = [
  ...(state.log || []),
  ...(state.interactionEvents || []),
  ...(state.transactions || []),
  ...(state.tokenConsumptions || [])
];
state.chronologyCounter = chronologyRecords.reduce(
  (max, record) => Math.max(max, Number(record?.eventOrder || 0)),
  Number(state.chronologyCounter || 0)
) + 1;
state.log.unshift({
  id: `live-referee-recovery-${Date.now()}`,
  action: "admin",
  category: "system",
  player: "System Recovery",
  item: `Recovered stale Live Referee event: ${event.title || eventId}.`,
  title: "Live Referee event recovered",
  summary: "No Token was consumed and no gameplay mutation occurred. Misrouted response records were removed and the stale event was closed.",
  type: "interaction-recovery",
  categories: ["system", "interaction", "admin"],
  tags: ["failed-recovery", "no-mutation", "no-refund"],
  linkedEventId: eventId,
  eventOrder: state.chronologyCounter,
  timestamp: recoveredAt
});
game.version = Number(game.version || 0) + 1;
game.updatedAt = recoveredAt;

const backupDir = path.join(root, "data", "backups");
fs.mkdirSync(backupDir, { recursive: true });
const backupFile = path.join(backupDir, `${gameId}-pre-live-referee-recovery-${recoveredAt.replace(/[:.]/g, "-")}.json`);
fs.copyFileSync(gameFile, backupFile, fs.constants.COPYFILE_EXCL);
const temporaryFile = `${gameFile}.recovery-${process.pid}.tmp`;
fs.writeFileSync(temporaryFile, JSON.stringify(game, null, 2));
fs.renameSync(temporaryFile, gameFile);
console.log(JSON.stringify({ ok: true, backupFile, gameFile, version: game.version, updatedAt: game.updatedAt }, null, 2));
