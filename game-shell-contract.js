(function installRivalSagaGameShellContract(root, factory) {
  const api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root) root.rivalSagaGameShellContract = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function createRivalSagaGameShellContract() {
  "use strict";

  const SUPPORTED_GAME_SCHEMA_VERSION = 1;
  const ISOLATED_GAME_ID_PATTERN = /^(?:browser-smoke|codex-)/i;
  const ACTION_PHASE_VERSION_V1 = "action-phase-v1-current-series";
  const ACTION_PHASE_VERSION_V2 = "action-phase-v2-real-series";
  const DEFAULT_ACTION_PHASE_VERSION = ACTION_PHASE_VERSION_V2;

  function isObject(value) {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
  }

  function text(value, fallback = "") {
    const normalized = String(value ?? "").trim();
    return normalized || fallback;
  }

  function finiteNumber(value, fallback) {
    const normalized = Number(value);
    return Number.isFinite(normalized) ? normalized : fallback;
  }

  function gameRecordId(record = {}, fallbackId = "") {
    return text(record.gameId || record.id || fallbackId);
  }

  function gameSchemaVersion(record = {}) {
    const candidate = record.schemaVersion
      ?? record.state?.schemaVersion
      ?? record.state?.ruleset?.schemaVersion
      ?? 1;
    return Math.max(1, finiteNumber(candidate, 1));
  }

  function gamePhase(record = {}, series = "", gym = 1) {
    const state = isObject(record.state) ? record.state : {};
    const phaseState = isObject(state.phaseState) ? state.phaseState : {};
    const keyedPhase = phaseState[`${series}:${gym}`] || phaseState[`${series}-${gym}`] || {};
    return text(record.phase || state.currentPhase || keyedPhase.currentPhase || state.phase, "start");
  }

  function actionPhaseVersion(record = {}) {
    const state = isObject(record.state) ? record.state : {};
    const candidate = record.actionPhaseVersion
      || record.ruleset?.actionPhaseVersion
      || state.ruleset?.actionPhaseVersion
      || state.actionPhaseVersion;
    if (candidate === ACTION_PHASE_VERSION_V1) return ACTION_PHASE_VERSION_V1;
    if (candidate === ACTION_PHASE_VERSION_V2) return ACTION_PHASE_VERSION_V2;
    return isObject(record.state) ? ACTION_PHASE_VERSION_V1 : DEFAULT_ACTION_PHASE_VERSION;
  }

  function normalizedMembers(record = {}) {
    if (!Array.isArray(record.members)) return [];
    return record.members.map((member) => {
      if (typeof member === "string") return { userId: text(member), displayName: text(member), role: "player" };
      if (!isObject(member)) return null;
      const userId = text(member.userId || member.id);
      if (!userId) return null;
      return {
        userId,
        displayName: text(member.displayName || member.name, userId),
        role: text(member.role, "player")
      };
    }).filter(Boolean);
  }

  function isIsolatedGameRecord(record = {}, fallbackId = "") {
    const gameId = gameRecordId(record, fallbackId);
    return Boolean(record.isolated || record.sandbox || record.testFixture || ISOLATED_GAME_ID_PATTERN.test(gameId));
  }

  function normalizeGameSummary(record = {}, options = {}) {
    if (!isObject(record)) return { ok: false, id: text(options.fallbackId, "unknown"), reason: "Record is not an object." };
    const gameId = gameRecordId(record, options.fallbackId);
    if (!gameId) return { ok: false, id: "unknown", reason: "Required game ID is missing." };
    const schemaVersion = gameSchemaVersion(record);
    const state = isObject(record.state) ? record.state : {};
    const series = text(record.series || state.series, "Unstarted");
    const gym = Math.max(1, finiteNumber(record.gym ?? state.gym, 1));
    const members = normalizedMembers(record);
    const summary = {
      gameId,
      id: gameId,
      name: text(record.name, gameId),
      description: text(record.description),
      series,
      gym,
      phase: gamePhase(record, series, gym),
      updatedAt: text(record.updatedAt || record.modifiedAt),
      playerCount: Math.max(0, finiteNumber(record.playerCount, Array.isArray(state.players) ? state.players.length : members.length)),
      status: text(record.status, state.gameStatus ? text(state.gameStatus, "active") : "lobby"),
      schemaVersion,
      version: Math.max(0, finiteNumber(record.version, 0)),
      rulesetVersion: text(record.rulesetVersion || state.ruleset?.version, "S3-dev"),
      actionPhaseVersion: actionPhaseVersion(record),
      maxPlayers: Math.max(1, finiteNumber(record.maxPlayers, 5)),
      rulesetPatchHistory: Array.isArray(record.rulesetPatchHistory) ? record.rulesetPatchHistory : [],
      members
    };
    if (schemaVersion > SUPPORTED_GAME_SCHEMA_VERSION) {
      return {
        ok: false,
        id: gameId,
        reason: `Schema ${schemaVersion} is newer than supported schema ${SUPPORTED_GAME_SCHEMA_VERSION}.`,
        code: "unsupported_schema",
        summary
      };
    }
    return { ok: true, summary };
  }

  function normalizeGameIndex(records) {
    const source = Array.isArray(records) ? records : [];
    const games = [];
    const rejected = [];
    source.forEach((record, index) => {
      const result = normalizeGameSummary(record, { fallbackId: `record-${index + 1}` });
      if (result.ok) games.push(result.summary);
      else rejected.push({ id: result.id, reason: result.reason, code: result.code || "invalid_record", summary: result.summary || null });
    });
    return { games, rejected, returnedCount: source.length, normalizedCount: games.length };
  }

  function resolveApiOrigin(locationLike, configuredOrigin = "") {
    const pageOrigin = text(locationLike?.origin);
    const configured = text(configuredOrigin);
    if (!configured) return pageOrigin;
    try {
      return new URL(configured, pageOrigin ? `${pageOrigin}/` : undefined).origin;
    } catch {
      return pageOrigin;
    }
  }

  return {
    SUPPORTED_GAME_SCHEMA_VERSION,
    DEFAULT_ACTION_PHASE_VERSION,
    gameRecordId,
    actionPhaseVersion,
    isIsolatedGameRecord,
    normalizeGameSummary,
    normalizeGameIndex,
    resolveApiOrigin
  };
});
