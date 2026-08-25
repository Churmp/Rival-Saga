const http = require("http");
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const { createHash, randomBytes, randomUUID, timingSafeEqual } = require("crypto");
const gameShellContract = require("./game-shell-contract.js");
const saveCompactionRuntime = require("./save-compaction.js");
const interactionSituationLifecycle = require("./interaction-situation-lifecycle.js");
const provisionalDeclarationRuntime = require("./provisional-declaration-runtime.js");
const tokenEffectContract = require("./token-effect-contract.js");
const tokenInventoryRuntime = require("./token-inventory-runtime.js");
const tokenControlEffects = require("./token-control-effects.js");

const PORT = Number(process.env.PORT || 4173);
const ROOT = __dirname;
const DATA_DIR = process.env.RIVAL_SAGA_DATA_DIR
  ? path.resolve(process.env.RIVAL_SAGA_DATA_DIR)
  : path.join(ROOT, "data");
const GAMES_DIR = path.join(DATA_DIR, "games");
const TOKEN_ART_DIR = path.join(DATA_DIR, "token-art");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const RULESET_PATCHES_FILE = path.join(DATA_DIR, "ruleset-patches.json");
const ACTION_PHASE_VERSION_V2 = "action-phase-v2-real-series";
const DEFAULT_ACTION_PHASE_VERSION = ACTION_PHASE_VERSION_V2;
const STATIC_FILES = new Set([
  "/",
  "/index.html",
  "/app.js",
  "/save-compaction.js",
  "/game-shell-contract.js",
  "/interaction-situation-lifecycle.js",
  "/provisional-declaration-runtime.js",
  "/encounter-token-runtime.js",
  "/token-effect-contract.js",
  "/token-control-effects.js",
  "/token-control-controller.js",
  "/token-result-summary.js",
  "/token-inventory-runtime.js",
  "/token-sandbox-session.js",
  "/token-qa-harness.html",
  "/token-qa-browser.js",
  "/token-qa-browser.css",
  "/styles.css",
  "/shop-data.js",
  "/shop-choice-data.js",
  "/shop-browse-data.js",
  "/item-reference-data.js",
  "/shop-sprite-data.js",
  "/move-classification-data.js",
  "/pokemon-balance-tiers.js",
  "/pokemon-build-data.js",
  "/silph-data.js",
  "/action-phase-balance.js",
  "/ARCHITECTURE.md",
  "/SAGA_TOKEN_RULES.md",
  "/README.md"
]);
const COMPRESSIBLE_STATIC_EXTENSIONS = new Set([".html", ".js", ".css", ".json", ".svg", ".md"]);
const SITE_SHELL_ROUTES = new Set([
  "/",
  "/games",
  "/rulebook",
  "/patch-notes",
  "/profiles",
  "/forums",
  "/admin"
]);

const sseClients = new Map();
const gameSummaryCache = new Map();
const V2_ROUTE_PUBLIC_ACTIVITY_STAGES = new Set(["exploring", "encountered", "rerolled", "obtained"]);
const V2_ROUTE_PUBLIC_ACTIVITY_TTL_MS = 30 * 1000;

function ensureDataDirs() {
  fs.mkdirSync(GAMES_DIR, { recursive: true });
  fs.mkdirSync(TOKEN_ART_DIR, { recursive: true });
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function safeGameId(value) {
  const id = String(value || "default").trim().toLowerCase().replace(/[^a-z0-9_-]/g, "-").replace(/-+/g, "-");
  return id || "default";
}

function gamePath(gameId) {
  return path.join(GAMES_DIR, `${safeGameId(gameId)}.json`);
}

function tokenArtKey(value) {
  const key = String(value || "").trim().toLowerCase().replace(/[^a-z0-9_-]/g, "-").replace(/-+/g, "-");
  return key || "token";
}

function safeUserId(value) {
  const id = String(value || "guest").trim().toLowerCase().replace(/[^a-z0-9_-]/g, "-").replace(/-+/g, "-");
  return id || "guest";
}

function normalizeLoginId(value) {
  return safeUserId(value);
}

function safePatchId(value) {
  const id = String(value || "").trim().toLowerCase().replace(/[^a-z0-9_.-]/g, "-").replace(/-+/g, "-");
  return id || `patch-${Date.now()}`;
}

function tokenArtPath(gameId, key) {
  return path.join(TOKEN_ART_DIR, safeGameId(gameId), `${tokenArtKey(key)}.json`);
}

function tokenArtImageUrl(gameId, key) {
  return `/api/games/${encodeURIComponent(safeGameId(gameId))}/token-art/${encodeURIComponent(tokenArtKey(key))}/image`;
}

function nowIso() {
  return new Date().toISOString();
}

function hashPassword(password, salt = randomBytes(16).toString("hex")) {
  const normalized = String(password || "");
  const passwordHash = createHash("sha256").update(`${salt}:${normalized}`).digest("hex");
  return { passwordSalt: salt, passwordHash };
}

function verifyPassword(user, password) {
  if (!user?.passwordHash || !user?.passwordSalt) return false;
  const attempted = hashPassword(password, user.passwordSalt).passwordHash;
  try {
    return timingSafeEqual(Buffer.from(user.passwordHash, "hex"), Buffer.from(attempted, "hex"));
  } catch {
    return false;
  }
}

function readJsonFile(file, fallback) {
  ensureDataDirs();
  if (!fs.existsSync(file)) {
    writeJsonFile(file, fallback);
    return structuredClone(fallback);
  }
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    const brokenPath = `${file}.broken-${Date.now()}`;
    fs.renameSync(file, brokenPath);
    writeJsonFile(file, fallback);
    return structuredClone(fallback);
  }
}

function writeJsonFile(file, payload) {
  ensureDataDirs();
  const tmp = `${file}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(payload, null, 2));
  fs.renameSync(tmp, file);
}

function defaultGameRecord(gameId = "default", name = "Rival Saga Table") {
  return {
    id: safeGameId(gameId),
    name,
    description: "",
    status: "lobby",
    maxPlayers: 5,
    createdAt: nowIso(),
    updatedAt: nowIso(),
    version: 0,
    rulesetVersion: "S3-dev",
    actionPhaseVersion: DEFAULT_ACTION_PHASE_VERSION,
    rulesetPatchHistory: [],
    sandboxCommits: [],
    state: null,
    members: [],
    activity: []
  };
}

function normalizeUser(user = {}) {
  const displayName = String(user.displayName || user.name || "Guest Player").trim() || "Guest Player";
  const loginId = normalizeLoginId(user.loginId || user.id || displayName);
  const sagaAdminAlias = loginId === "sagaadmin" || safeUserId(displayName) === "sagaadmin";
  const role = sagaAdminAlias ? "admin" : String(user.role || "player");
  return {
    id: loginId,
    loginId,
    displayName,
    role,
    passwordSalt: String(user.passwordSalt || ""),
    passwordHash: String(user.passwordHash || ""),
    createdAt: user.createdAt || nowIso(),
    updatedAt: user.updatedAt || nowIso(),
    gameIds: Array.isArray(user.gameIds) ? [...new Set(user.gameIds.map(safeGameId))] : []
  };
}

function publicUser(user = {}) {
  const normalized = normalizeUser(user);
  return {
    id: normalized.id,
    displayName: normalized.displayName,
    role: normalized.role,
    isSiteAdmin: siteRoleAllowsSiteAdmin(normalized.role) || normalized.id === "sagaadmin" || safeUserId(normalized.displayName) === "sagaadmin",
    createdAt: normalized.createdAt,
    updatedAt: normalized.updatedAt,
    gameIds: normalized.gameIds,
    hasPassword: Boolean(normalized.passwordHash)
  };
}

function readUsers() {
  const payload = readJsonFile(USERS_FILE, { users: [] });
  payload.users = Array.isArray(payload.users) ? payload.users.map(normalizeUser) : [];
  return payload;
}

function writeUsers(payload) {
  payload.users = Array.isArray(payload.users) ? payload.users.map(normalizeUser) : [];
  writeJsonFile(USERS_FILE, payload);
}

function normalizeRulesetPatch(patch = {}) {
  const version = String(patch.version || patch.id || `S3-dev-${Date.now()}`).trim();
  return {
    id: safePatchId(patch.id || version),
    version,
    title: String(patch.title || patch.name || version || "Ruleset Patch"),
    summary: String(patch.summary || ""),
    status: ["draft", "published", "archived"].includes(patch.status) ? patch.status : "draft",
    createdAt: patch.createdAt || nowIso(),
    publishedAt: patch.publishedAt || "",
    changes: Array.isArray(patch.changes) ? patch.changes.map((change) => ({
      type: String(change?.type || "note"),
      target: String(change?.target || ""),
      summary: String(change?.summary || change || "")
    })) : []
  };
}

function readRulesetPatches() {
  const payload = readJsonFile(RULESET_PATCHES_FILE, { patches: [] });
  payload.patches = Array.isArray(payload.patches) ? payload.patches.map(normalizeRulesetPatch) : [];
  return payload;
}

function writeRulesetPatches(payload) {
  payload.patches = Array.isArray(payload.patches) ? payload.patches.map(normalizeRulesetPatch) : [];
  writeJsonFile(RULESET_PATCHES_FILE, payload);
}

function readGame(gameId = "default") {
  ensureDataDirs();
  const file = gamePath(gameId);
  if (!fs.existsSync(file)) {
    const record = defaultGameRecord(gameId);
    writeGame(record);
    return record;
  }
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    const brokenPath = `${file}.broken-${Date.now()}`;
    fs.renameSync(file, brokenPath);
    const record = defaultGameRecord(gameId);
    writeGame(record);
    return record;
  }
}

function writeGame(record) {
  ensureDataDirs();
  const file = gamePath(record.id);
  const tmp = `${file}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(record));
  fs.renameSync(tmp, file);
  gameSummaryCache.delete(safeGameId(record.id));
}

function writeTokenArt(gameId, key, setting) {
  const artPath = tokenArtPath(gameId, key);
  fs.mkdirSync(path.dirname(artPath), { recursive: true });
  fs.writeFileSync(artPath, JSON.stringify({
    key: tokenArtKey(key),
    gameId: safeGameId(gameId),
    setting,
    updatedAt: nowIso()
  }, null, 2));
}

function readTokenArt(gameId, key) {
  const artPath = tokenArtPath(gameId, key);
  if (!fs.existsSync(artPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(artPath, "utf8"));
  } catch {
    return null;
  }
}

function isPlainObject(value) {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

const CANCELED_TOKEN_CONTENT_IDS = new Set([
  "payday-field", "drizzle-field", "drought-field", "taunt-field",
  "snow-warning-field", "sand-stream-field", "infestation-field", "surging-strikes-field",
  "electric-field-token", "grassy-field-token", "field-kit"
]);

function isCanceledTokenContent(entry) {
  const normalized = typeof entry === "string" ? { id: entry, name: entry } : entry || {};
  const id = tokenArtKey(normalized.catalogId || normalized.id || normalized.name || normalized.tokenName || "");
  return CANCELED_TOKEN_CONTENT_IDS.has(id)
    || String(normalized.tokenType || "").toLowerCase() === "field"
    || /-field-token$/.test(tokenArtKey(normalized.name || normalized.tokenName || ""));
}

function validateGameStateStructure(state) {
  const errors = [];
  if (!isPlainObject(state)) return ["state must be an object"];
  if (!Array.isArray(state.players) || !state.players.length) errors.push("state.players must contain at least one player");
  ["pokemonRecords", "interactionEvents", "transactions", "log", "lingeringStatuses"].forEach((key) => {
    if (!Array.isArray(state[key])) errors.push(`state.${key} must be an array`);
  });
  try {
    JSON.stringify(state);
  } catch {
    errors.push("state must be JSON serializable");
  }
  return errors;
}

function cloneJson(value) {
  return value === undefined ? value : JSON.parse(JSON.stringify(value));
}

const FORESIGHT_PRIVATE_SET_KEYS = new Set([
  "privatesetdata",
  "revealedset",
  "revealedsets",
  "setdata",
  "setsnapshot",
  "setsnapshots",
  "pokemonset",
  "pokemonsets",
  "moves",
  "moveset",
  "ability",
  "item",
  "nature",
  "evs",
  "ivs",
  "teratype"
]);

function sharedPayloadKey(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function recordReferencesForesight(record) {
  if (!isPlainObject(record)) return false;
  return [
    record.id,
    record.type,
    record.name,
    record.sourceId,
    record.sourceTokenName,
    record.tokenName,
    record.tokenDefinitionId,
    record.effectClassification
  ].some((value) => /foresight/i.test(String(value || "")));
}

function stripPrivateForesightSetDataFromSharedPayload(payload) {
  let changed = false;
  const visit = (value, withinForesightRecord = false) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => visit(entry, withinForesightRecord));
      return;
    }
    if (!isPlainObject(value)) return;
    const foresightRecord = withinForesightRecord || recordReferencesForesight(value);
    Object.keys(value).forEach((key) => {
      if (foresightRecord && FORESIGHT_PRIVATE_SET_KEYS.has(sharedPayloadKey(key))) {
        delete value[key];
        changed = true;
        return;
      }
      visit(value[key], foresightRecord);
    });
  };
  visit(payload);
  return changed;
}

function sanitizeSharedGamePayloadForDelivery(payload) {
  const sanitized = cloneJson(payload);
  const removePrivateEffectCollections = (value) => {
    if (Array.isArray(value)) return value.forEach(removePrivateEffectCollections);
    if (!isPlainObject(value)) return;
    Object.keys(value).forEach((key) => {
      if (sharedPayloadKey(key) === "privateeffectrecords") {
        delete value[key];
        return;
      }
      removePrivateEffectCollections(value[key]);
    });
  };
  removePrivateEffectCollections(sanitized);
  stripPrivateForesightSetDataFromSharedPayload(sanitized);
  return sanitized;
}

function normalizeTokenArtSetting(setting) {
  if (typeof setting === "string") {
    return { src: setting, fit: "cover", zoom: 1, x: 0, y: 0, rotate: 0, borderColor: "", custom: true };
  }
  if (!isPlainObject(setting)) {
    return { src: "", fit: "cover", zoom: 1, x: 0, y: 0, rotate: 0, borderColor: "", custom: false };
  }
  return {
    src: String(setting.src || setting.url || ""),
    fit: setting.fit === "contain" ? "contain" : "cover",
    zoom: Math.max(0.7, Math.min(1.5, Number(setting.zoom || 1))),
    x: Math.max(-40, Math.min(40, Number(setting.x || 0))),
    y: Math.max(-40, Math.min(40, Number(setting.y || 0))),
    rotate: Math.max(-180, Math.min(180, Number(setting.rotate || 0))),
    borderColor: /^#[0-9a-f]{6}$/i.test(String(setting.borderColor || "")) ? setting.borderColor : "",
    custom: Boolean(setting.custom)
  };
}

function compactTokenArtLibraryForState(gameId, library, { persistTokenArt = true } = {}) {
  const compacted = {};
  let changed = false;
  Object.entries(isPlainObject(library) ? library : {}).forEach(([rawKey, rawSetting]) => {
    const key = tokenArtKey(rawKey);
    const setting = normalizeTokenArtSetting(rawSetting);
    if (!setting.src) {
      changed = true;
      return;
    }
    if (key !== rawKey) changed = true;
    if (setting.src.startsWith("data:")) {
      if (persistTokenArt) writeTokenArt(gameId, key, { ...setting, custom: true });
      if (persistTokenArt || fs.existsSync(tokenArtPath(gameId, key))) {
        compacted[key] = { ...setting, src: tokenArtImageUrl(gameId, key), custom: true };
        changed = true;
      } else {
        compacted[key] = setting;
      }
      return;
    }
    compacted[key] = setting;
  });
  if (Object.keys(compacted).length !== Object.keys(isPlainObject(library) ? library : {}).length) changed = true;
  return { library: compacted, changed };
}

function compactUndoDataForStorage(undoData) {
  return saveCompactionRuntime.compactUndoData(undoData);
}

function compactUndoSnapshotsForStorage(state) {
  return saveCompactionRuntime.compactUndoSnapshots(state).changed;
}

function compactGameStateForStorage(gameId, state, { compactUndoSnapshots = false, persistTokenArt = true } = {}) {
  if (!isPlainObject(state)) return { state, changed: false };
  const next = cloneJson(state);
  let changed = false;
  if (Array.isArray(next.interactionEvents)) {
    const cleanedInteractionEvents = interactionSituationLifecycle.cleanActivityRecords(next.interactionEvents);
    changed = cleanedInteractionEvents.length !== next.interactionEvents.length || changed;
    next.interactionEvents = cleanedInteractionEvents;
  }
  const ruleset = isPlainObject(next.ruleset) ? next.ruleset : {};
  const contentLibraries = isPlainObject(ruleset.contentLibraries) ? ruleset.contentLibraries : {};
  const rulesetTokenArt = contentLibraries.tokenArt;
  const fallbackTokenArt = next.tokenArtLibrary || ruleset.tokenArtLibrary;
  const sourceTokenArt = isPlainObject(rulesetTokenArt) && Object.keys(rulesetTokenArt).length
    ? rulesetTokenArt
    : fallbackTokenArt;

  if (isPlainObject(sourceTokenArt)) {
    const result = compactTokenArtLibraryForState(gameId, sourceTokenArt, { persistTokenArt });
    ruleset.contentLibraries = { ...contentLibraries, tokenArt: result.library };
    next.ruleset = ruleset;
    changed = changed || result.changed;
  }
  if (Object.prototype.hasOwnProperty.call(next, "tokenArtLibrary")) {
    delete next.tokenArtLibrary;
    changed = true;
  }
  if (Object.prototype.hasOwnProperty.call(ruleset, "tokenArtLibrary")) {
    delete ruleset.tokenArtLibrary;
    changed = true;
  }
  if (Object.prototype.hasOwnProperty.call(next, "fieldTokens")) {
    delete next.fieldTokens;
    changed = true;
  }
  (Array.isArray(next.players) ? next.players : []).forEach((player) => {
    if (Array.isArray(player.inventory)) {
      const inventory = player.inventory.filter((entry) => !isCanceledTokenContent(entry));
      changed = inventory.length !== player.inventory.length || changed;
      player.inventory = inventory;
    }
    if (Array.isArray(player.perks)) {
      const perks = player.perks.filter((entry) => !isCanceledTokenContent(entry));
      changed = perks.length !== player.perks.length || changed;
      player.perks = perks;
    }
  });
  changed = stripPrivateForesightSetDataFromSharedPayload(next) || changed;
  if (compactUndoSnapshots) changed = compactUndoSnapshotsForStorage(next) || changed;

  return { state: next, changed };
}

function mergeActivityRecordLists(existing = [], incoming = []) {
  const records = new Map();
  [...existing, ...incoming].forEach((record) => {
    if (!isPlainObject(record)) return;
    const key = record.id || `${record.type || "record"}:${record.eventOrder || record.createdAt || records.size}`;
    records.set(key, { ...(records.get(key) || {}), ...cloneJson(record) });
  });
  return [...records.values()].sort((a, b) => Number(a.eventOrder || 0) - Number(b.eventOrder || 0)
    || new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
}

function mergeActivityRecordMaps(existing = {}, incoming = {}, { incomingAuthoritative = false } = {}) {
  const merged = { ...(isPlainObject(existing) ? cloneJson(existing) : {}) };
  Object.entries(isPlainObject(incoming) ? incoming : {}).forEach(([key, value]) => {
    const current = merged[key];
    if (!isPlainObject(current) || !isPlainObject(value)) {
      merged[key] = cloneJson(value);
      return;
    }
    if (incomingAuthoritative) {
      merged[key] = { ...current, ...cloneJson(value) };
      return;
    }
    const currentComplete = Boolean(current.complete) || ["resolved", "canceled", "negated"].includes(current.status);
    const incomingComplete = Boolean(value.complete) || ["resolved", "canceled", "negated"].includes(value.status);
    const currentProgress = Number(current.priorityIndex || 0);
    const incomingProgress = Number(value.priorityIndex || 0);
    merged[key] = currentComplete && !incomingComplete || currentProgress > incomingProgress
      ? { ...cloneJson(value), ...current }
      : { ...current, ...cloneJson(value) };
  });
  return merged;
}

function mergeActivitySnapshots(existing, incoming, { incomingAuthoritative = false } = {}) {
  if (!isPlainObject(existing)) return cloneJson(incoming);
  const next = { ...cloneJson(existing), ...cloneJson(incoming) };
  next.payload = incomingAuthoritative
    ? cloneJson(incoming.payload || {})
    : { ...(existing.payload || {}), ...(incoming.payload || {}) };
  next.responses = mergeActivityRecordLists(existing.responses, incoming.responses);
  next.transactions = mergeActivityRecordLists(existing.transactions, incoming.transactions);
  next.promptPriority = mergeActivityRecordMaps(existing.promptPriority, incoming.promptPriority, { incomingAuthoritative });
  next.promptResolutions = mergeActivityRecordMaps(existing.promptResolutions, incoming.promptResolutions, { incomingAuthoritative });
  if (!incomingAuthoritative) {
    const terminalStatuses = new Set(["resolved", "negated", "canceled", "expired", "withdrawn"]);
    if (terminalStatuses.has(existing.status) && !terminalStatuses.has(incoming.status)) {
      next.status = existing.status;
      next.resolvedAt = existing.resolvedAt || next.resolvedAt;
      next.resolutionMode = existing.resolutionMode || next.resolutionMode;
    }
  }
  return next;
}

function upsertGameActivity(game, incomingActivity, { incomingAuthoritative = false } = {}) {
  if (!isPlainObject(incomingActivity) || !incomingActivity.id) return null;
  if (interactionSituationLifecycle.isMisroutedResponseActivity(incomingActivity)) return null;
  const incoming = cloneJson(incomingActivity);
  game.activity ||= [];
  const activityIndex = game.activity.findIndex((entry) => entry.id === incoming.id);
  const activity = activityIndex >= 0
    ? mergeActivitySnapshots(game.activity[activityIndex], incoming, { incomingAuthoritative })
    : incoming;
  if (activityIndex >= 0) game.activity[activityIndex] = activity;
  else game.activity.unshift(activity);
  if (isPlainObject(game.state)) {
    game.state.interactionEvents ||= [];
    const stateIndex = game.state.interactionEvents.findIndex((entry) => entry.id === activity.id);
    const stateActivity = cloneJson(activity);
    if (stateIndex >= 0) {
      game.state.interactionEvents[stateIndex] = mergeActivitySnapshots(
        game.state.interactionEvents[stateIndex],
        stateActivity,
        { incomingAuthoritative: false }
      );
    }
    else game.state.interactionEvents.unshift(stateActivity);
  }
  return activity;
}

function syncGameActivitiesFromState(game) {
  if (!Array.isArray(game.state?.interactionEvents)) return;
  game.state.interactionEvents = interactionSituationLifecycle.cleanActivityRecords(game.state.interactionEvents);
  game.activity = interactionSituationLifecycle.cleanActivityRecords(game.activity || []);
  game.state.interactionEvents.forEach((activity) => upsertGameActivity(game, activity, { incomingAuthoritative: true }));
  saveCompactionRuntime.compactUndoSnapshots({ log: [], interactionEvents: game.activity });
  saveCompactionRuntime.compactUndoSnapshots(game.state);
  game.activity = (game.activity || [])
    .sort((a, b) => Number(b.eventOrder || 0) - Number(a.eventOrder || 0)
      || new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
}

function parseSummaryScalar(rawValue) {
  const source = String(rawValue || "").trim().replace(/,$/, "");
  try {
    return JSON.parse(source);
  } catch {
    return undefined;
  }
}

function normalizeActionPhaseVersion() {
  return DEFAULT_ACTION_PHASE_VERSION;
}

function persistedActionPhaseVersion() {
  return DEFAULT_ACTION_PHASE_VERSION;
}

function scanLargeGameSummary(file, fallbackId) {
  const summary = { id: fallbackId, members: [], state: { players: [] } };
  let inState = false;
  let inPlayers = false;
  let inMembers = false;
  let currentMember = null;
  let rulesetSchemaCaptured = false;
  const fd = fs.openSync(file, "r");
  const chunk = Buffer.allocUnsafe(1024 * 1024);
  let remainder = "";
  const visitLine = (line) => {
    const topLevel = line.match(/^  "(id|name|description|status|maxPlayers|createdAt|updatedAt|version|rulesetVersion|schemaVersion|actionPhaseVersion)": (.*)$/);
    if (topLevel) summary[topLevel[1]] = parseSummaryScalar(topLevel[2]);
    if (/^  "state": \{$/.test(line)) inState = true;
    else if (inState && /^  \},?$/.test(line)) inState = false;
    if (inState) {
      const stateValue = line.match(/^    "(series|gym|currentPhase|schemaVersion)": (.*)$/);
      if (stateValue) summary.state[stateValue[1]] = parseSummaryScalar(stateValue[2]);
      if (!rulesetSchemaCaptured) {
        const rulesetSchema = line.match(/^      "schemaVersion": (.*)$/);
        if (rulesetSchema) {
          summary.state.ruleset = { schemaVersion: parseSummaryScalar(rulesetSchema[1]) };
          rulesetSchemaCaptured = true;
        }
      }
      const rulesetActionPhaseVersion = line.match(/^      "actionPhaseVersion": (.*)$/);
      if (rulesetActionPhaseVersion) {
        summary.state.ruleset ||= {};
        summary.state.ruleset.actionPhaseVersion = parseSummaryScalar(rulesetActionPhaseVersion[1]);
      }
      if (/^    "players": \[$/.test(line)) inPlayers = true;
      else if (inPlayers && /^    \],?$/.test(line)) inPlayers = false;
      else if (inPlayers && /^      \{$/.test(line)) summary.state.players.push({});
    }
    if (/^  "members": \[$/.test(line)) inMembers = true;
    else if (inMembers && /^  \],?$/.test(line)) {
      if (currentMember) summary.members.push(currentMember);
      currentMember = null;
      inMembers = false;
    } else if (inMembers) {
      const stringMember = line.match(/^    (".*")(?:,)?$/);
      if (stringMember) summary.members.push(parseSummaryScalar(stringMember[1]));
      if (/^    \{$/.test(line)) currentMember = {};
      const memberValue = line.match(/^      "(userId|id|role)": (.*)$/);
      if (memberValue && currentMember) currentMember[memberValue[1]] = parseSummaryScalar(memberValue[2]);
      if (/^    \},?$/.test(line) && currentMember) {
        summary.members.push(currentMember);
        currentMember = null;
      }
    }
  };
  try {
    let bytesRead;
    do {
      bytesRead = fs.readSync(fd, chunk, 0, chunk.length, null);
      const combined = remainder + chunk.toString("utf8", 0, bytesRead);
      const lines = combined.split(/\r?\n/);
      remainder = lines.pop() || "";
      lines.forEach(visitLine);
    } while (bytesRead > 0);
    if (remainder) visitLine(remainder);
  } finally {
    fs.closeSync(fd);
  }
  summary.playerCount = summary.state.players.length;
  return summary;
}

function readGameRecordForSummary(file, fallbackId) {
  const stats = fs.statSync(file);
  const cacheKey = `${stats.size}:${stats.mtimeMs}`;
  const cached = gameSummaryCache.get(fallbackId);
  if (cached?.cacheKey === cacheKey) return cached.record;
  const record = stats.size <= 8 * 1024 * 1024
    ? JSON.parse(fs.readFileSync(file, "utf8"))
    : scanLargeGameSummary(file, fallbackId);
  gameSummaryCache.set(fallbackId, { cacheKey, record });
  return record;
}

function listGames() {
  ensureDataDirs();
  const users = readUsers().users;
  const rejected = [];
  const excluded = [];
  const games = fs.readdirSync(GAMES_DIR)
    .filter((name) => name.endsWith(".json"))
    .map((name) => {
      const fallbackId = name.replace(/\.json$/, "");
      let game;
      try {
        game = readGameRecordForSummary(path.join(GAMES_DIR, name), fallbackId);
      } catch (error) {
        rejected.push({ id: fallbackId, reason: `Record could not be parsed: ${error.message}` });
        return null;
      }
      if (gameShellContract.isIsolatedGameRecord(game, fallbackId)) {
        excluded.push({ id: gameShellContract.gameRecordId(game, fallbackId), reason: "Isolated QA or sandbox record." });
        return null;
      }
      const rawMembers = Array.isArray(game.members) ? game.members : [];
      const memberIds = rawMembers.map((member) => typeof member === "string" ? member : member.userId || member.id || "").map(safeUserId);
      const normalized = gameShellContract.normalizeGameSummary({
        ...game,
        members: memberIds.map((userId) => ({
          userId,
          displayName: users.find((user) => user.id === userId)?.displayName || userId,
          role: rawMembers.find((member) => (typeof member === "string" ? member : member.userId || member.id) === userId)?.role || "player"
        }))
      }, { fallbackId });
      if (!normalized.ok) {
        rejected.push({ id: normalized.id, reason: normalized.reason, code: normalized.code, summary: normalized.summary || null });
        return null;
      }
      return normalized.summary;
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));
  return { games, rejected, excluded, authoritativeCount: games.length + rejected.length + excluded.length };
}

function addGameMembership(gameId, userId, role = "player") {
  const safeGame = safeGameId(gameId);
  const safeUser = safeUserId(userId);
  if (!safeUser || safeUser === "guest") return;
  const usersPayload = readUsers();
  let user = usersPayload.users.find((entry) => entry.id === safeUser);
  if (!user) {
    user = normalizeUser({ id: safeUser, displayName: safeUser, role });
    usersPayload.users.push(user);
  }
  if (!user.gameIds.includes(safeGame)) user.gameIds.push(safeGame);
  user.updatedAt = nowIso();
  writeUsers(usersPayload);
  const game = readGame(safeGame);
  game.members ||= [];
  if (!game.members.some((member) => (typeof member === "string" ? member : member.userId || member.id) === safeUser)) {
    game.members.push({ userId: safeUser, role });
    game.updatedAt = nowIso();
    writeGame(game);
  }
}

function siteRoleAllowsAdmin(role) {
  return ["admin", "owner", "host"].includes(String(role || "").toLowerCase());
}

function siteRoleAllowsSiteAdmin(role) {
  return ["admin", "site-admin", "superadmin"].includes(String(role || "").toLowerCase());
}

function userCanManageSite(userId) {
  const safeUser = safeUserId(userId);
  if (!safeUser || safeUser === "guest") return false;
  const user = readUsers().users.find((entry) => entry.id === safeUser);
  return Boolean(user && (siteRoleAllowsSiteAdmin(user.role) || user.id === "sagaadmin" || safeUserId(user.displayName) === "sagaadmin"));
}

function gameHasAdminMember(game = {}) {
  return (game.members || []).some((member) => siteRoleAllowsAdmin(typeof member === "string" ? "player" : member.role));
}

function createOrUpdateTestUser(gameId, index) {
  const safeGame = safeGameId(gameId);
  const safeUser = safeUserId(`${safeGame}-test-player-${index}`);
  const usersPayload = readUsers();
  const existingIndex = usersPayload.users.findIndex((entry) => entry.id === safeUser);
  const existingUser = existingIndex >= 0 ? usersPayload.users[existingIndex] : {};
  const user = normalizeUser({
    ...existingUser,
    id: safeUser,
    loginId: safeUser,
    displayName: `Test Player ${index}`,
    role: "player",
    passwordSalt: "",
    passwordHash: "",
    gameIds: [...new Set([...(existingUser.gameIds || []), safeGame])]
  });
  if (existingIndex >= 0) usersPayload.users[existingIndex] = user;
  else usersPayload.users.push(user);
  writeUsers(usersPayload);
  return user;
}

function userHasAnyAdminAccess(userId) {
  const safeUser = safeUserId(userId);
  if (!safeUser || safeUser === "guest") return false;
  const user = readUsers().users.find((entry) => entry.id === safeUser);
  if (siteRoleAllowsAdmin(user?.role) || siteRoleAllowsSiteAdmin(user?.role)) return true;
  return listGames().games.some((game) => (game.members || []).some((member) => member.userId === safeUser && siteRoleAllowsAdmin(member.role)));
}

function userCanAdminGame(userId, gameId) {
  const safeUser = safeUserId(userId);
  if (!safeUser || safeUser === "guest") return false;
  const user = readUsers().users.find((entry) => entry.id === safeUser);
  if (siteRoleAllowsAdmin(user?.role) || siteRoleAllowsSiteAdmin(user?.role)) return true;
  const game = readGame(gameId);
  return (game.members || []).some((member) => {
    const memberId = typeof member === "string" ? member : member.userId || member.id;
    return safeUserId(memberId) === safeUser && siteRoleAllowsAdmin(typeof member === "string" ? "player" : member.role);
  });
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    const maxBodyBytes = 96 * 1024 * 1024;
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > maxBodyBytes) {
        reject(new Error("Request body too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET,POST,PUT,DELETE,OPTIONS",
    "access-control-allow-headers": "content-type"
  });
  res.end(body);
}

function sendError(res, status, message) {
  sendJson(res, status, { error: message });
}

function broadcast(gameId, payload) {
  const clients = sseClients.get(safeGameId(gameId));
  if (!clients) return;
  const message = `data: ${JSON.stringify(sanitizeSharedGamePayloadForDelivery(payload))}\n\n`;
  clients.forEach((client) => client.write(message));
}

function v2RoutePublicActivityFromBody(game, body = {}) {
  const stage = String(body.stage || "").trim();
  if (!V2_ROUTE_PUBLIC_ACTIVITY_STAGES.has(stage)) {
    return { ok: false, status: 400, error: "Unsupported V2 Route public activity stage." };
  }
  const state = game.state && typeof game.state === "object" && !Array.isArray(game.state) ? game.state : {};
  const actorPlayerId = String(body.actorPlayerId || "").trim();
  const actor = (state.players || []).find((player) => String(player.id || "") === actorPlayerId);
  if (!actor) return { ok: false, status: 400, error: "Activity actor must be an authoritative player." };
  const routeNumber = Number(body.routeNumber || 0);
  if (!Number.isInteger(routeNumber) || routeNumber < 1 || routeNumber > 9) {
    return { ok: false, status: 400, error: "Route public activity requires Route 1-9." };
  }
  const seriesId = String(body.seriesId || state.series || "").trim();
  if (!seriesId) return { ok: false, status: 400, error: "Route public activity requires a series." };
  const now = Date.now();
  const activity = {
    schemaVersion: 1,
    activityId: `v2-route-activity-${now}-${randomUUID().slice(0, 8)}`,
    kind: "v2-route-encounter",
    stage,
    actorPlayerId,
    actorName: String(actor.name || actor.title || actor.id || "Trainer"),
    seriesId,
    routeNumber,
    occurredAt: new Date(now).toISOString(),
    expiresAt: new Date(now + V2_ROUTE_PUBLIC_ACTIVITY_TTL_MS).toISOString()
  };
  if (stage === "obtained") {
    const pokemonRecordId = String(body.pokemonRecordId || "").trim();
    const pokemon = (state.pokemonRecords || []).find((record) => String(record.id || "") === pokemonRecordId);
    if (!pokemon || String(pokemon.trainerId || pokemon.ownerId || "") !== actorPlayerId) {
      return { ok: false, status: 400, error: "Obtained activity requires an authoritative owned Pokemon record." };
    }
    const routeMetadata = pokemon.routeEncounterMetadata || pokemon.acquisitionMetadata || {};
    if (String(routeMetadata.sourceType || pokemon.source || "").toLowerCase() !== "route encounter"
      && String(routeMetadata.sourceType || "").toLowerCase() !== "v2-route-encounter") {
      return { ok: false, status: 400, error: "Obtained activity Pokemon must come from Route Encounter." };
    }
    activity.pokemonRecordId = pokemon.id;
    activity.pokemonName = String(pokemon.name || pokemon.acquiredSpeciesName || pokemon.currentSpecies || "Pokemon");
  }
  return { ok: true, activity };
}

function serveStatic(req, res, pathname) {
  const route = pathname === "/" ? "/index.html" : pathname;
  const assetPrefix = "/assets/";
  if (!STATIC_FILES.has(route) && !route.startsWith(assetPrefix)) return false;
  const filePath = path.join(ROOT, route.replace(/^\//, ""));
  const resolvedPath = path.resolve(filePath);
  if (route.startsWith(assetPrefix) && !resolvedPath.startsWith(path.join(ROOT, "assets") + path.sep)) return false;
  if (!fs.existsSync(filePath)) return false;
  const ext = path.extname(filePath).toLowerCase();
  const types = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
    ".md": "text/plain; charset=utf-8"
  };
  const stat = fs.statSync(filePath);
  const etag = `W/"${stat.size.toString(16)}-${Math.trunc(stat.mtimeMs).toString(16)}"`;
  const requestUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const isVersioned = requestUrl.searchParams.has("v");
  const cacheControl = ext === ".html"
    ? "no-cache"
    : isVersioned
      ? "public, max-age=31536000, immutable"
      : "public, max-age=3600, must-revalidate";
  const headers = {
    "content-type": types[ext] || "application/octet-stream",
    "cache-control": cacheControl,
    "etag": etag,
    "last-modified": stat.mtime.toUTCString(),
    "x-content-type-options": "nosniff"
  };
  if (COMPRESSIBLE_STATIC_EXTENSIONS.has(ext)) headers.vary = "Accept-Encoding";
  if (req.headers["if-none-match"] === etag) {
    res.writeHead(304, headers);
    res.end();
    return true;
  }

  const acceptedEncodings = String(req.headers["accept-encoding"] || "");
  let compressor = null;
  if (COMPRESSIBLE_STATIC_EXTENSIONS.has(ext) && acceptedEncodings.includes("br")) {
    headers["content-encoding"] = "br";
    compressor = zlib.createBrotliCompress({
      params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 4 }
    });
  } else if (COMPRESSIBLE_STATIC_EXTENSIONS.has(ext) && acceptedEncodings.includes("gzip")) {
    headers["content-encoding"] = "gzip";
    compressor = zlib.createGzip({ level: zlib.constants.Z_BEST_SPEED });
  } else {
    headers["content-length"] = stat.size;
  }

  res.writeHead(200, headers);
  if (req.method === "HEAD") {
    res.end();
    return true;
  }
  const stream = fs.createReadStream(filePath);
  if (compressor) stream.pipe(compressor).pipe(res);
  else stream.pipe(res);
  return true;
}

function gameStateVersionConflict(game, expectedVersion) {
  if (!Number.isInteger(Number(expectedVersion)) || Number(expectedVersion) < 0) {
    return { status: 400, payload: { error: "expectedVersion must be a non-negative integer" } };
  }
  if (Number(expectedVersion) !== Number(game.version || 0)) {
    const currentSituation = provisionalDeclarationRuntime.currentProvisional(game.state || {})
      || provisionalDeclarationRuntime.blockingActivity(game.state || {}, interactionSituationLifecycle.isBlocking)
      || provisionalDeclarationRuntime.activeDestinationCommit(
        provisionalDeclarationRuntime.actionGymState(game.state || {}) || {}
      );
    return {
      status: 409,
      payload: {
        error: "version-conflict",
        expectedVersion: Number(expectedVersion),
        currentVersion: Number(game.version || 0),
        currentSituation: sanitizeSharedGamePayloadForDelivery(currentSituation || null)
      }
    };
  }
  return null;
}

const ACTION_DESTINATION_START_GRACE_MS = 30 * 1000;

function unstartedActionDestinationExpired(commit = {}, nowMs = Date.now()) {
  if (commit.status !== provisionalDeclarationRuntime.DESTINATION_STATES.ACCEPTED || commit.operationId) return false;
  const acceptedMs = Date.parse(commit.acceptedAt || "");
  return Number.isFinite(acceptedMs) && nowMs - acceptedMs > ACTION_DESTINATION_START_GRACE_MS;
}

function orphanedActionDestinationCommit(gymState = {}) {
  const commit = provisionalDeclarationRuntime.activeDestinationCommit(gymState);
  if (!commit) return false;
  if (commit.status === provisionalDeclarationRuntime.DESTINATION_STATES.ACCEPTED && !commit.operationId) {
    return unstartedActionDestinationExpired(commit);
  }
  const operation = (Array.isArray(gymState.actionOperations) ? gymState.actionOperations : [])
    .find((entry) => entry?.id === commit.operationId);
  if (!operation || operation.status !== "resolving") return true;
  const visit = (gymState.playerVisits?.[commit.playerId] || [])
    .find((entry) => entry?.id === operation.visitId);
  return !visit
    || visit.undone
    || visit.cancelled
    || ["undone", "cancelled"].includes(String(visit.status || "").toLowerCase());
}

function actionPhaseSelectionForState(state = {}, series = state.series, gym = state.gym) {
  const key = `${series}-G${Number(gym || 1)}`;
  return state.actionPhaseState?.selections?.[key] || null;
}

function activeActionVisitForOperation(gymState = {}, operation = {}) {
  const visits = gymState.playerVisits?.[operation.playerId] || [];
  const visit = visits.find((entry) => entry?.id === operation.visitId);
  if (!visit || visit.undone || visit.cancelled) return null;
  if (["undone", "cancelled"].includes(String(visit.status || "").toLowerCase())) return null;
  return visit;
}

function incomingActionDestinationMatchesCurrent(currentCommit = {}, currentGymState = {}, incomingGymState = {}) {
  const incomingCommit = incomingGymState.destinationCommit || null;
  const incomingOperations = Array.isArray(incomingGymState.actionOperations) ? incomingGymState.actionOperations : [];
  const operationId = currentCommit.operationId || incomingCommit?.operationId || "";
  const incomingOperation = incomingOperations.find((operation) => operation.id === operationId) || null;
  const matchingOperation = incomingOperation
    && incomingOperation.playerId === currentCommit.playerId
    && incomingOperation.locationId === currentCommit.locationId
    && (!currentCommit.serviceId || incomingOperation.serviceId === currentCommit.serviceId);
  const matchingId = incomingCommit?.id === currentCommit.id;
  const sameStatus = incomingCommit?.status === currentCommit.status;
  const advancesMatchingOperation = [
    provisionalDeclarationRuntime.DESTINATION_STATES.RESOLVING,
    provisionalDeclarationRuntime.DESTINATION_STATES.COMPLETED
  ].includes(incomingCommit?.status)
    && (currentCommit.status === provisionalDeclarationRuntime.DESTINATION_STATES.ACCEPTED
      || currentCommit.status === provisionalDeclarationRuntime.DESTINATION_STATES.RESOLVING)
    && incomingCommit.operationId
    && matchingOperation
    && incomingOperation.status === (incomingCommit.status === provisionalDeclarationRuntime.DESTINATION_STATES.COMPLETED ? "completed" : "resolving");
  if (matchingId && (sameStatus || advancesMatchingOperation)) return true;
  if (incomingCommit) return false;

  const currentOperation = (Array.isArray(currentGymState.actionOperations) ? currentGymState.actionOperations : [])
    .find((operation) => operation.id === currentCommit.operationId) || {};
  if (matchingOperation && incomingOperation.status === "completed") return true;
  if (matchingOperation && !activeActionVisitForOperation(incomingGymState, incomingOperation)) return true;
  if (!incomingOperation && currentOperation.visitId) {
    const incomingVisit = (incomingGymState.playerVisits?.[currentCommit.playerId] || [])
      .find((visit) => visit?.id === currentOperation.visitId);
    return !incomingVisit
      || incomingVisit.undone
      || incomingVisit.cancelled
      || ["undone", "cancelled"].includes(String(incomingVisit.status || "").toLowerCase());
  }
  return false;
}

function authoritativeTimingOverwriteConflict(currentState, incomingState) {
  const currentDeclaration = provisionalDeclarationRuntime.currentProvisional(currentState || {});
  if (currentDeclaration) {
    const incomingDeclaration = (incomingState?.interactionEvents || []).find((entry) => entry?.id === currentDeclaration.id);
    if (!incomingDeclaration
      || incomingDeclaration.payload?.declarationStage !== provisionalDeclarationRuntime.DECLARATION_STAGES.PROVISIONAL
      || Number(incomingDeclaration.payload?.declarationRevision || 0) !== Number(currentDeclaration.payload?.declarationRevision || 0)) {
      return {
        reason: "An authoritative provisional declaration changed after this client loaded the game.",
        currentSituation: currentDeclaration
      };
    }
  }
  const currentBlocking = provisionalDeclarationRuntime.blockingActivity(currentState || {}, interactionSituationLifecycle.isBlocking);
  if (currentBlocking && !currentDeclaration) {
    const incomingBlocking = (incomingState?.interactionEvents || []).find((entry) => entry?.id === currentBlocking.id);
    if (!incomingBlocking) {
      return {
        reason: "An authoritative gameplay situation changed after this client loaded the game.",
        currentSituation: currentBlocking
      };
    }
  }
  const currentGymState = provisionalDeclarationRuntime.actionGymState(currentState || {}) || {};
  const currentCommit = provisionalDeclarationRuntime.activeDestinationCommit(currentGymState);
  if (currentCommit && !orphanedActionDestinationCommit(currentGymState)) {
    const incomingGymState = actionPhaseSelectionForState(incomingState || {}, currentGymState.series, currentGymState.gym) || {};
    if (!incomingActionDestinationMatchesCurrent(currentCommit, currentGymState, incomingGymState)) {
      return {
        reason: "An authoritative Action destination changed after this client loaded the game.",
        currentSituation: provisionalDeclarationRuntime.blockingActivity(currentState || {}, interactionSituationLifecycle.isBlocking)
      };
    }
  }
  return null;
}

function serverTokenDefinitionForItem(item) {
  if (!item || !isPlainObject(item)) return null;
  return tokenEffectContract.inventoryDefinitionFor(item) || tokenEffectContract.definitionFor(
    item.tokenDefinitionId || item.effectId || item.canonicalId || item.name || item.id
  );
}

function serverExactTokenRecord(state, playerId, inventoryRecordId, effectContractId = "") {
  const player = (state.players || []).find((entry) => String(entry.id || "") === String(playerId || ""));
  const index = (player?.inventory || []).findIndex((entry) => String(entry.id || "") === String(inventoryRecordId || ""));
  if (!player || index < 0) return { ok: false, reason: "The exact owned effect is no longer in this player's inventory." };
  const item = player.inventory[index];
  const definition = serverTokenDefinitionForItem(item);
  if (!definition || definition.id !== String(effectContractId || "")) {
    return { ok: false, reason: "The exact inventory record no longer matches the declared effect." };
  }
  const usability = tokenEffectContract.activationUsabilityFor(definition);
  if (!usability.ok) return { ok: false, reason: usability.reason || "This effect is not runtime-usable." };
  const availability = tokenInventoryRuntime.itemAvailability(item, {
    series: state.series || "",
    gym: Number(state.gym || 1),
    phase: provisionalDeclarationRuntime.phaseFor(state),
    seriesOrder: state.seriesOrder || []
  });
  if (!availability.ok) return { ok: false, reason: availability.reason || "This exact effect record is unavailable." };
  return { ok: true, player, item, index, definition };
}

function activeRosterRecords(state, playerId = "") {
  return (state.pokemonRecords || []).filter((pokemon) => (!playerId || pokemon.trainerId === playerId)
    && !["Released", "Removed"].includes(pokemon.status)
    && (pokemon.rosterType || "Active") === "Active"
    && !pokemon.breederStatus?.status
    && !pokemon.dragonDenStatus?.status);
}

function serverDeclarationHasConstructiblePath(state, playerId, definition) {
  if (definition.id === "unban-token") {
    return tokenControlEffects.activeStatuses(state, {
      series: state.series,
      gym: Number(state.gym || 1),
      phase: provisionalDeclarationRuntime.phaseFor(state),
      seriesOrder: state.seriesOrder || []
    }, (status) => ["ban", "restrict"].includes(status.type)).length > 0;
  }
  if (definition.id === "lingering-aroma") {
    return tokenControlEffects.activeExplicitOngoingEffects(state).some((effect) => tokenControlEffects.ongoingEffectBenefitsPlayer(effect, playerId));
  }
  if (Number(definition.minTargets || 0) < 1) return true;
  if (definition.targetScope === "rosterInstance") {
    return activeRosterRecords(state).some((pokemon) => {
      if ((definition.selfOnly || definition.targetControllerRelation === "self") && pokemon.trainerId !== playerId) return false;
      if ((definition.otherPlayerOnly || ["rival", "otherPlayer", "differentController"].includes(definition.targetControllerRelation)) && pokemon.trainerId === playerId) return false;
      return true;
    });
  }
  if (definition.targetScope === "singlePlayer") {
    return (state.players || []).some((player) => {
      if (definition.selfOnly || definition.targetControllerRelation === "self") return player.id === playerId;
      if (definition.otherPlayerOnly || ["rival", "otherPlayer", "differentController"].includes(definition.targetControllerRelation)) return player.id !== playerId;
      return true;
    });
  }
  return true;
}

function serverValidateDeclarationDraft(state, activity, definition, rawDraft) {
  const draft = provisionalDeclarationRuntime.normalizeDraftSelections(rawDraft);
  const actorPlayerId = activity.payload.declaringPlayerId;
  let targetPokemon = null;
  let targetPlayer = null;
  if (definition.targetScope === "rosterInstance") {
    targetPokemon = activeRosterRecords(state).find((pokemon) => pokemon.id === draft.targetPokemonId) || null;
    if (!targetPokemon) return { ok: false, reason: "Choose an exact Pokemon that is still in an Active Roster.", draft };
    if ((definition.selfOnly || definition.targetControllerRelation === "self") && targetPokemon.trainerId !== actorPlayerId) {
      return { ok: false, reason: "This effect must target the declaring player's Pokemon.", draft };
    }
    if ((definition.otherPlayerOnly || ["rival", "otherPlayer", "differentController"].includes(definition.targetControllerRelation)) && targetPokemon.trainerId === actorPlayerId) {
      return { ok: false, reason: "This effect must target another player's Pokemon.", draft };
    }
    targetPlayer = (state.players || []).find((player) => player.id === targetPokemon.trainerId) || null;
  } else if (definition.targetScope === "species") {
    if (!draft.targetText) return { ok: false, reason: "Choose a Pokemon species before confirming.", draft };
    if (definition.id === "unban-token") {
      const speciesKey = tokenControlEffects.defaultSpeciesKey(draft.targetText);
      const selected = tokenControlEffects.activeStatuses(state, {
        series: state.series,
        gym: Number(state.gym || 1),
        phase: provisionalDeclarationRuntime.phaseFor(state),
        seriesOrder: state.seriesOrder || []
      }, (status) => ["ban", "restrict"].includes(status.type)
        && tokenControlEffects.defaultSpeciesKey(status.targetPokemonName || status.speciesId) === speciesKey)
        .find((status) => status.id === draft.selectedStatusId);
      if (!selected) return { ok: false, reason: "Choose one exact active Ban or Restrict record before confirming.", draft };
    }
  } else if (definition.targetScope === "singlePlayer") {
    targetPlayer = (state.players || []).find((player) => player.id === draft.targetPlayerId) || null;
    if (!targetPlayer) return { ok: false, reason: "Choose a player before confirming.", draft };
    if ((definition.selfOnly || definition.targetControllerRelation === "self") && targetPlayer.id !== actorPlayerId) {
      return { ok: false, reason: "This effect must target the declaring player.", draft };
    }
    if ((definition.otherPlayerOnly || ["rival", "otherPlayer", "differentController"].includes(definition.targetControllerRelation)) && targetPlayer.id === actorPlayerId) {
      return { ok: false, reason: "This effect must target another player.", draft };
    }
  }
  if (definition.id === "incinerate") {
    const opponents = (state.players || []).filter((player) => player.id !== actorPlayerId);
    const selections = new Map(draft.resourceSelections.map((entry) => [entry.playerId, entry.resourceId]));
    for (const opponent of opponents) {
      const legal = tokenControlEffects.incinerateEligibleResources(opponent);
      if (!legal.length) continue;
      const selectedId = selections.get(opponent.id);
      if (!selectedId || !legal.some((entry) => entry.id === selectedId)) {
        return { ok: false, reason: `Choose one current legal Item or TM from ${opponent.name || "each opposing player"}.`, draft };
      }
    }
    if ([...selections].some(([playerId, resourceId]) => {
      const owner = opponents.find((player) => player.id === playerId);
      return !owner || !tokenControlEffects.incinerateEligibleResources(owner).some((entry) => entry.id === resourceId);
    })) return { ok: false, reason: "One Incinerate selection is stale or no longer legal.", draft };
  }
  if (definition.id === "lingering-aroma") {
    const effect = tokenControlEffects.activeExplicitOngoingEffects(state).find((entry) => entry.id === draft.targetText);
    if (!effect || !tokenControlEffects.ongoingEffectBenefitsPlayer(effect, actorPlayerId)) {
      return { ok: false, reason: "Choose one exact active ongoing effect attached to or benefiting this player.", draft };
    }
  }
  if (definition.id === "haze-curse") {
    const anchors = [...new Set(draft.targetPokemonIds)].map((id) => activeRosterRecords(state).find((pokemon) => pokemon.id === id));
    const species = new Set(anchors.filter(Boolean).map((pokemon) => tokenControlEffects.defaultSpeciesKey(pokemon.name || pokemon.currentSpecies)));
    if (anchors.length !== 2 || anchors.some((pokemon) => !pokemon) || species.size !== 2) {
      return { ok: false, reason: "Choose exactly two Active Roster Pokemon with different names.", draft };
    }
    targetPokemon = anchors[0];
    targetPlayer = (state.players || []).find((player) => player.id === targetPokemon.trainerId) || null;
  }
  if (definition.id === "ditto-token") {
    const copiedDefinition = tokenEffectContract.definitionFor(draft.resourceDefinitionId || draft.targetText);
    if (!copiedDefinition || copiedDefinition.id === "ditto-token" || !tokenEffectContract.activationUsabilityFor(copiedDefinition).ok) {
      return { ok: false, reason: "Choose one canonical activatable non-Ditto Token.", draft };
    }
  }
  if (definition.id === "knock-off-curse") {
    const owner = targetPlayer;
    const resource = (owner?.inventory || []).find((entry) => entry.id === draft.inventoryRecordId);
    if (!resource || !["item", "tm"].includes(draft.choiceKind)) {
      return { ok: false, reason: "Choose the exact held Item or exact TM record for Knock Off Curse.", draft };
    }
    if (draft.choiceKind === "item" && tokenControlEffects.isMasterBallResource(resource)) {
      return { ok: false, reason: "Master Ball-tier Items cannot be selected by Knock Off Curse.", draft };
    }
  }
  return { ok: true, draft, targetPokemon, targetPlayer };
}

function serverTokenRollbackSnapshot(state, excludedActivityId = "") {
  return {
    previousPlayers: cloneJson(state.players || []),
    previousPokemonRecords: cloneJson(state.pokemonRecords || []),
    previousLingeringStatuses: cloneJson(state.lingeringStatuses || []),
    previousTokenActivations: cloneJson(state.tokenActivations || []),
    previousTokenConsumptions: cloneJson(state.tokenConsumptions || []),
    previousPlayerNotifications: cloneJson(state.playerNotifications || []),
    previousRandomPokemonSessions: cloneJson(state.randomPokemonSessions || []),
    previousInteractionEvents: cloneJson((state.interactionEvents || []).filter((entry) => entry.id !== excludedActivityId)),
    previousTransactions: cloneJson(state.transactions || []),
    previousGlobalPokemonRules: cloneJson(state.globalPokemonRules || {}),
    previousBanlistHistory: cloneJson(state.banlistHistory || []),
    previousTeambuilder: cloneJson(state.teambuilder || {}),
    previousBattleTeams: cloneJson(state.battleTeams || {}),
    previousPerkSystem: cloneJson(state.perkSystem || {}),
    previousClassStateByPlayerId: cloneJson(state.classStateByPlayerId || {}),
    previousPhaseState: cloneJson(state.phaseState || {}),
    previousEffectAuditRecords: cloneJson(state.effectAuditRecords || []),
    previousEffectOperations: cloneJson(state.effectOperations || []),
    previousCopiedTokenRelationships: cloneJson(state.copiedTokenRelationships || []),
    previousPrivateEffectRecords: cloneJson(state.privateEffectRecords || []),
    previousEncounterCopyRecords: cloneJson(state.encounterCopyRecords || [])
  };
}

function serverNextEventOrder(state) {
  const values = [
    ...(state.interactionEvents || []), ...(state.tokenConsumptions || []), ...(state.log || [])
  ].map((entry) => Number(entry?.eventOrder || 0));
  return Math.max(0, ...values) + 1;
}

function writeAuthoritativeTimingMutation(game, body, type, activity = null) {
  syncGameActivitiesFromState(game);
  game.version = Number(game.version || 0) + 1;
  game.updatedAt = nowIso();
  writeGame(game);
  broadcast(game.id, {
    type,
    gameId: game.id,
    version: game.version,
    updatedAt: game.updatedAt,
    clientId: body.clientId || "",
    activity: activity ? sanitizeSharedGamePayloadForDelivery(activity) : undefined
  });
  return sanitizeSharedGamePayloadForDelivery({
    ok: true,
    gameId: game.id,
    version: game.version,
    updatedAt: game.updatedAt,
    activity,
    state: game.state
  });
}

function confirmServerProvisionalDeclaration(game, activity, body) {
  const decision = provisionalDeclarationRuntime.actionDecisionContext(game.state, { actionsPerPlayer: 3 });
  const continuation = activity.payload.interruptedContinuation || {};
  if (decision.phase !== "action" || decision.operation || provisionalDeclarationRuntime.activeDestinationCommit(decision.gymState)
    || decision.currentPlayerId !== continuation.actionPlayerId
    || decision.actionNumber !== Number(continuation.actionNumber || 0)) {
    return { ok: false, error: "stale-timing-context", reason: "The interrupted Action decision no longer matches this declaration." };
  }
  const exact = serverExactTokenRecord(
    game.state,
    activity.payload.declaringPlayerId,
    activity.payload.exactInventoryRecordId,
    activity.payload.effectContractId
  );
  if (!exact.ok) return { ok: false, error: "stale-effect-record", reason: exact.reason };
  const validated = serverValidateDeclarationDraft(game.state, activity, exact.definition, body.draftSelections);
  if (!validated.ok) return { ok: false, error: "illegal-declaration", reason: validated.reason };

  const now = nowIso();
  const declarationTargetPlayerIds = [...new Set([
    exact.definition.targetType === "player" ? validated.targetPlayer?.id : "",
    ...(validated.draft.targetPlayerIds || [])
  ].filter(Boolean))];
  const rollbackSnapshot = serverTokenRollbackSnapshot(game.state, activity.id);
  const aromaCosts = tokenControlEffects.applyLingeringAromaTargetingCosts(game.state, {
    declaringPlayerId: exact.player.id,
    targetPlayerIds: declarationTargetPlayerIds,
    sourceEffectId: activity.id
  }, { series: game.state.series, gym: Number(game.state.gym || 1), phase: provisionalDeclarationRuntime.phaseFor(game.state), now });
  if (["blocked", "systemFailure"].includes(aromaCosts.result)) {
    return { ok: false, error: "illegal-declaration-cost", reason: aromaCosts.reason };
  }
  const consumedToken = exact.player.inventory.splice(exact.index, 1)[0];
  const consumption = {
    id: `token-consumption-${randomUUID()}`,
    playerId: exact.player.id,
    tokenId: consumedToken.id || "",
    tokenDefinitionId: exact.definition.id,
    tokenName: consumedToken.name || exact.definition.name,
    quantity: 1,
    consumedAt: now,
    linkedEventId: activity.id,
    linkedResponseId: "",
    promptId: `event:${activity.id}`,
    consumptionMode: exact.definition.consumptionMode || "refundIfCanceled",
    status: "consumed",
    refundStatus: "not-refunded",
    source: "provisional-declaration-confirmation",
    inventoryItem: cloneJson(consumedToken),
    eventOrder: serverNextEventOrder(game.state)
  };
  game.state.tokenConsumptions ||= [];
  game.state.tokenConsumptions.unshift(consumption);

  const draft = validated.draft;
  const targetPokemon = validated.targetPokemon;
  const targetPlayer = validated.targetPlayer;
  const targetText = exact.definition.id === "incinerate"
    ? `${draft.resourceSelections.length} selected rival record${draft.resourceSelections.length === 1 ? "" : "s"}`
    : targetPokemon?.name || draft.targetText || targetPlayer?.name || "";
  const targetLabel = targetPokemon && targetPlayer
    ? `${targetPlayer.name}'s ${targetPokemon.name}`
    : targetText || targetPlayer?.name || "the table";
  Object.assign(activity, {
    type: exact.definition.timingCategory === "curse" ? "curseToken" : "controlToken",
    title: `${exact.player.name} used ${exact.definition.name}${targetLabel ? ` on ${targetLabel}` : ""}.`,
    message: `${exact.player.name} used ${exact.definition.name}${targetLabel ? ` targeting ${targetLabel}` : ""}.`,
    targetPlayerId: targetPlayer?.id || "",
    sourceType: "token-use",
    sourceId: exact.definition.id,
    responseTypes: ["immunity"],
    eligiblePlayerIds: (game.state.players || []).map((player) => player.id).filter(Boolean),
    updatedAt: now
  });
  const speciesId = String(targetPokemon?.name || draft.targetText || "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  activity.payload = {
    ...activity.payload,
    declarationStage: provisionalDeclarationRuntime.DECLARATION_STAGES.CONFIRMED,
    confirmationState: provisionalDeclarationRuntime.DECLARATION_STAGES.CONFIRMED,
    consumptionState: provisionalDeclarationRuntime.CONSUMPTION_STATES.CONSUMED,
    mutationState: provisionalDeclarationRuntime.MUTATION_STATES.NOT_STARTED,
    declarationRevision: Math.max(1, Number(activity.payload.declarationRevision || 1)) + 1,
    confirmedAt: now,
    draftSelections: draft,
    tokenId: exact.definition.id,
    tokenName: exact.definition.name,
    tokenTimingCategory: exact.definition.timingCategory,
    livePromptType: exact.definition.timingCategory === "curse" ? "curseToken" : "controlToken",
    targetText,
    targetPlayerName: targetPlayer?.name || "",
    targetPokemonId: targetPokemon?.id || "",
    targetPokemonName: targetPokemon?.name || "",
    targetType: exact.definition.targetType,
    targetScope: exact.definition.targetScope,
    selectedTargetType: exact.definition.selectedTargetType || exact.definition.targetType,
    applicationScope: exact.definition.applicationScope || "manual",
    affectedEntityType: exact.definition.affectedEntityType || exact.definition.targetType,
    selectedRosterInstanceId: targetPokemon?.id || "",
    selectedSpeciesId: speciesId,
    speciesId,
    selectedRosterInstanceIds: [targetPokemon?.id].filter(Boolean),
    affectedRosterInstanceIds: [targetPokemon?.id].filter(Boolean),
    excludedRosterInstanceIds: [],
    resourceSelections: cloneJson(draft.resourceSelections),
    resourceDefinitionId: draft.resourceDefinitionId,
    choiceKind: draft.choiceKind,
    inventoryRecordId: draft.inventoryRecordId,
    moveName: draft.moveName,
    selectedRosterInstanceIds: draft.targetPokemonIds.length ? cloneJson(draft.targetPokemonIds) : [targetPokemon?.id].filter(Boolean),
    lingeringAromaDeclarationCostOperationId: aromaCosts.operation?.id || "",
    notes: draft.notes,
    effectApplication: exact.definition.resolverMode,
    resolutionMode: exact.definition.resolverMode,
    consumptionMode: exact.definition.consumptionMode,
    responsesAllowed: true,
    transactionsAllowed: exact.definition.transactionsAllowed !== false,
    tokenConsumptionIds: [consumption.id],
    consumptionRecordId: consumption.id,
    consumedTokenId: consumedToken.id || "",
    tokenDeclarationUndo: rollbackSnapshot,
    sourceEffectId: activity.id,
    effectContractVersion: tokenEffectContract.schemaVersion
  };
  activity.promptPriority = {};
  activity.promptResolutions = {};
  activity.situation = {
    ...(activity.situation || {}),
    status: "awaitingResponse",
    whatHappened: activity.title,
    actingPlayerId: "",
    requiredAction: "Respond or choose No Response.",
    blockingReason: `${exact.definition.name} must finish resolving before the interrupted Action continues.`,
    tokenConsumed: true,
    mutationState: provisionalDeclarationRuntime.MUTATION_STATES.NOT_STARTED,
    mutationsStarted: false,
    mutationsCompleted: false,
    updatedAt: now
  };
  game.state.liveTable = { ...(game.state.liveTable || {}), currentPendingEventId: activity.id };
  game.state.effectAuditRecords ||= [];
  const declarationAudit = {
    id: `effect-audit-${randomUUID()}`,
    effectId: activity.id,
    tokenDefinitionId: exact.definition.id,
    tokenId: consumedToken.id || "",
    tokenName: exact.definition.name,
    stage: "declaration",
    userPlayerId: exact.player.id,
    originalOwnerPlayerId: exact.player.id,
    timestamp: now,
    series: game.state.series,
    gym: Number(game.state.gym || 1),
    phase: "action",
    timingWindow: ["actionOpen"],
    targets: { playerId: targetPlayer?.id || "", pokemonId: targetPokemon?.id || "", text: targetLabel },
    tokenConsumed: true,
    resolverMode: exact.definition.resolverMode,
    resolutionResult: "pending",
    stateMutations: [],
    undoStatus: "available"
  };
  game.state.effectAuditRecords.unshift(declarationAudit);
  activity.payload.declarationAuditId = declarationAudit.id;
  game.state.log ||= [];
  game.state.log.unshift({
    id: `log-${randomUUID()}`,
    action: "token",
    category: "tokens",
    player: exact.player.name,
    item: `${exact.player.name} used ${exact.definition.name}.`,
    title: `${exact.definition.timingCategory === "curse" ? "Curse" : "Control Token"} window opened`,
    summary: `${activity.title}\nThe interrupted Action remains paused until this effect resolves.`,
    type: "interaction-created",
    categories: ["tokens", "interaction"],
    tags: ["timing-window", "token", exact.definition.timingCategory, exact.definition.name],
    playerIds: [exact.player.id, targetPlayer?.id].filter(Boolean),
    tokenNames: [exact.definition.name],
    linkedEventId: activity.id,
    eventOrder: serverNextEventOrder(game.state),
    timestamp: now
  });
  return { ok: true, activity, consumption };
}

async function handleApi(req, res, url) {
  if (req.method === "OPTIONS") return sendJson(res, 204, {});
  if (url.pathname === "/api/health" && req.method === "GET") {
    return sendJson(res, 200, { ok: true, service: "rival-saga", now: nowIso() });
  }
  if (url.pathname === "/api/site" && req.method === "GET") {
    const gameIndex = listGames();
    return sendJson(res, 200, {
      users: readUsers().users.map(publicUser),
      games: gameIndex.games,
      gameIndex: {
        authoritativeCount: gameIndex.authoritativeCount,
        normalizedCount: gameIndex.games.length,
        rejected: gameIndex.rejected,
        excluded: gameIndex.excluded
      },
      rulesetPatches: readRulesetPatches().patches
    });
  }
  if (url.pathname === "/api/users" && req.method === "GET") {
    return sendJson(res, 200, { users: readUsers().users.map(publicUser) });
  }
  if (url.pathname === "/api/users/login" && req.method === "POST") {
    const body = await readBody(req);
    const loginId = normalizeLoginId(body.loginId || body.id);
    const user = readUsers().users.find((entry) => entry.id === loginId);
    if (!user || !verifyPassword(user, body.password)) return sendError(res, 401, "Invalid login ID or password.");
    return sendJson(res, 200, { user: publicUser(user) });
  }
  if (url.pathname === "/api/users" && req.method === "POST") {
    const body = await readBody(req);
    const usersPayload = readUsers();
    const existingId = normalizeLoginId(body.loginId || body.id || body.displayName || body.name);
    const existingIndex = usersPayload.users.findIndex((entry) => entry.id === existingId);
    if (body.createOnly && existingIndex >= 0) return sendError(res, 409, "An account with that login ID already exists.");
    if (body.createOnly && !String(body.password || "").trim()) return sendError(res, 400, "Password is required.");
    const passwordFields = String(body.password || "").trim()
      ? hashPassword(body.password)
      : existingIndex >= 0 ? {
        passwordSalt: usersPayload.users[existingIndex].passwordSalt || "",
        passwordHash: usersPayload.users[existingIndex].passwordHash || ""
      } : {};
    const user = normalizeUser({
      id: existingId,
      loginId: existingId,
      displayName: body.displayName || body.name || "Guest Player",
      role: body.role || usersPayload.users[existingIndex]?.role || "player",
      ...passwordFields
    });
    if (existingIndex >= 0) {
      usersPayload.users[existingIndex] = {
        ...usersPayload.users[existingIndex],
        ...user,
        createdAt: usersPayload.users[existingIndex].createdAt,
        updatedAt: nowIso()
      };
    } else {
      usersPayload.users.push(user);
    }
    writeUsers(usersPayload);
    return sendJson(res, existingIndex >= 0 ? 200 : 201, { user: publicUser(usersPayload.users.find((entry) => entry.id === user.id)) });
  }
  if (url.pathname === "/api/ruleset-patches" && req.method === "GET") {
    return sendJson(res, 200, { patches: readRulesetPatches().patches });
  }
  if (url.pathname === "/api/ruleset-patches" && req.method === "POST") {
    const body = await readBody(req);
    if (!userHasAnyAdminAccess(body.userId)) return sendError(res, 403, "Admin access is required to create ruleset patches.");
    const patchesPayload = readRulesetPatches();
    const patch = normalizeRulesetPatch(body);
    const existingIndex = patchesPayload.patches.findIndex((entry) => entry.id === patch.id);
    if (existingIndex >= 0) patchesPayload.patches[existingIndex] = { ...patch, createdAt: patchesPayload.patches[existingIndex].createdAt };
    else patchesPayload.patches.unshift(patch);
    writeRulesetPatches(patchesPayload);
    return sendJson(res, existingIndex >= 0 ? 200 : 201, { patch });
  }
  if (url.pathname === "/api/games" && req.method === "GET") {
    const gameIndex = listGames();
    return sendJson(res, 200, { games: gameIndex.games, gameIndex });
  }
  if (url.pathname === "/api/games" && req.method === "POST") {
    const body = await readBody(req);
    const id = safeGameId(body.id || body.name || randomUUID().slice(0, 8));
    const existing = fs.existsSync(gamePath(id));
    if (existing) return sendError(res, 409, "A game with that id already exists.");
    const game = defaultGameRecord(id, body.name || "Rival Saga Table");
    game.description = body.description || "";
    game.status = body.status || "lobby";
    game.maxPlayers = Math.max(2, Math.min(12, Number(body.maxPlayers || 5)));
    game.rulesetVersion = body.rulesetVersion || game.rulesetVersion;
    game.actionPhaseVersion = normalizeActionPhaseVersion(body.actionPhaseVersion || game.actionPhaseVersion);
    game.members = Array.isArray(body.members) ? body.members.map((member) => typeof member === "string" ? { userId: safeUserId(member), role: "player" } : {
      userId: safeUserId(member.userId || member.id),
      role: member.role || "player"
    }).filter((member) => member.userId) : [];
    writeGame(game);
    game.members.forEach((member) => addGameMembership(game.id, member.userId, member.role));
    return sendJson(res, 201, { game });
  }
  const gameDeleteMatch = url.pathname.match(/^\/api\/games\/([^/]+)(?:\/delete)?$/);
  if (gameDeleteMatch && (req.method === "DELETE" || (req.method === "POST" && url.pathname.endsWith("/delete")))) {
    const gameId = safeGameId(gameDeleteMatch[1]);
    const body = await readBody(req);
    if (!userCanManageSite(body.userId)) return sendError(res, 403, "Site admin access is required to delete game lobbies.");
    if (!fs.existsSync(gamePath(gameId))) return sendError(res, 404, "Game not found.");
    const deletedGame = readGame(gameId);
    const usersPayload = readUsers();
    usersPayload.users = usersPayload.users.map((user) => ({
      ...user,
      gameIds: (user.gameIds || []).filter((id) => safeGameId(id) !== gameId),
      updatedAt: (user.gameIds || []).some((id) => safeGameId(id) === gameId) ? nowIso() : user.updatedAt
    }));
    writeUsers(usersPayload);
    fs.rmSync(gamePath(gameId), { force: true });
    fs.rmSync(path.join(TOKEN_ART_DIR, gameId), { recursive: true, force: true });
    broadcast(gameId, {
      type: "game-deleted",
      gameId,
      deletedAt: nowIso()
    });
    return sendJson(res, 200, { ok: true, gameId, deletedGame: { id: deletedGame.id, name: deletedGame.name } });
  }
  const gameClaimMatch = url.pathname.match(/^\/api\/games\/([^/]+)\/claim$/);
  if (gameClaimMatch && req.method === "POST") {
    const gameId = safeGameId(gameClaimMatch[1]);
    if (!fs.existsSync(gamePath(gameId))) return sendError(res, 404, "Game not found.");
    const body = await readBody(req);
    const userId = safeUserId(body.userId);
    if (!userId || userId === "guest") return sendError(res, 400, "A valid user is required.");
    const game = readGame(gameId);
    if (gameHasAdminMember(game) && !userCanAdminGame(userId, gameId)) {
      return sendError(res, 403, "This game already has an owner or host.");
    }
    addGameMembership(gameId, userId, "owner");
    const claimedGame = readGame(gameId);
    let sawClaimingUser = false;
    claimedGame.members = (claimedGame.members || []).map((member) => {
      const memberId = safeUserId(typeof member === "string" ? member : member.userId || member.id);
      if (memberId !== userId) return member;
      sawClaimingUser = true;
      return { userId, role: "owner" };
    });
    if (!sawClaimingUser) claimedGame.members.push({ userId, role: "owner" });
    claimedGame.updatedAt = nowIso();
    writeGame(claimedGame);
    return sendJson(res, 200, { game: claimedGame });
  }
  const gameTestMembersMatch = url.pathname.match(/^\/api\/games\/([^/]+)\/test-members$/);
  if (gameTestMembersMatch && req.method === "POST") {
    const gameId = safeGameId(gameTestMembersMatch[1]);
    if (!fs.existsSync(gamePath(gameId))) return sendError(res, 404, "Game not found.");
    const body = await readBody(req);
    if (!userCanAdminGame(body.userId, gameId)) return sendError(res, 403, "Host access is required to add test accounts.");
    const initialGame = readGame(gameId);
    const maxPlayers = Math.max(2, Math.min(12, Number(initialGame.maxPlayers || 5)));
    const requested = Math.max(1, Math.min(12, Number(body.count || maxPlayers)));
    const existingIds = new Set((initialGame.members || []).map((member) => safeUserId(typeof member === "string" ? member : member.userId || member.id)));
    const added = [];
    for (let index = 1; index <= 50 && added.length < requested && existingIds.size < maxPlayers; index += 1) {
      const testUserId = safeUserId(`${gameId}-test-player-${index}`);
      if (existingIds.has(testUserId)) continue;
      const user = createOrUpdateTestUser(gameId, index);
      addGameMembership(gameId, user.id, "player");
      existingIds.add(user.id);
      added.push(publicUser(user));
    }
    return sendJson(res, 200, { game: readGame(gameId), added });
  }
  const gameMembershipMatch = url.pathname.match(/^\/api\/games\/([^/]+)\/members$/);
  if (gameMembershipMatch && req.method === "POST") {
    const gameId = safeGameId(gameMembershipMatch[1]);
    if (!fs.existsSync(gamePath(gameId))) return sendError(res, 404, "Game not found.");
    const body = await readBody(req);
    const userId = safeUserId(body.userId);
    if (!userId || userId === "guest") return sendError(res, 400, "A valid user is required.");
    const game = readGame(gameId);
    const existingMembers = Array.isArray(game.members) ? game.members : [];
    const alreadyMember = existingMembers.some((member) => safeUserId(typeof member === "string" ? member : member.userId || member.id) === userId);
    if (!alreadyMember && existingMembers.length >= Number(game.maxPlayers || 5)) return sendError(res, 409, "This game lobby is full.");
    addGameMembership(gameId, userId, body.role || "player");
    return sendJson(res, 200, { game: readGame(gameId) });
  }
  const patchApplyMatch = url.pathname.match(/^\/api\/games\/([^/]+)\/ruleset-patches\/([^/]+)\/apply$/);
  if (patchApplyMatch && req.method === "POST") {
    const gameId = safeGameId(patchApplyMatch[1]);
    const patchId = safePatchId(patchApplyMatch[2]);
    const body = await readBody(req);
    if (!userCanAdminGame(body.userId, gameId)) return sendError(res, 403, "Admin access is required to apply ruleset patches.");
    const patches = readRulesetPatches().patches;
    const patch = patches.find((entry) => entry.id === patchId);
    if (!patch) return sendError(res, 404, "Ruleset patch not found");
    const game = readGame(gameId);
    game.rulesetPatchHistory ||= [];
    if (!game.rulesetPatchHistory.some((entry) => entry.patchId === patch.id)) {
      game.rulesetPatchHistory.unshift({
        patchId: patch.id,
        version: patch.version,
        title: patch.title,
        appliedAt: nowIso(),
        mode: "manual-placeholder"
      });
    }
    game.rulesetVersion = patch.version || game.rulesetVersion;
    if (game.state && typeof game.state === "object") {
      game.state.ruleset ||= {};
      game.state.ruleset.version = game.rulesetVersion;
      game.state.ruleset.lastPatchId = patch.id;
      game.state.ruleset.lastPatchAppliedAt = game.rulesetPatchHistory[0]?.appliedAt || nowIso();
    }
    game.version = Number(game.version || 0) + 1;
    game.updatedAt = nowIso();
    writeGame(game);
    broadcast(game.id, {
      type: "ruleset-patch-applied",
      gameId: game.id,
      version: game.version,
      rulesetVersion: game.rulesetVersion,
      patch
    });
    return sendJson(res, 200, { game, patch });
  }
  const destinationCommitMatch = url.pathname.match(/^\/api\/games\/([^/]+)\/action-destination-commits$/);
  if (destinationCommitMatch && req.method === "POST") {
    const gameId = safeGameId(destinationCommitMatch[1]);
    if (!fs.existsSync(gamePath(gameId))) return sendError(res, 404, "Game not found.");
    const body = await readBody(req);
    if (!body.playerId || !body.locationId || !body.serviceId || !body.requestId) {
      return sendError(res, 400, "playerId, locationId, serviceId, and requestId are required.");
    }
    const game = readGame(gameId);
    if (!isPlainObject(game.state)) return sendError(res, 409, "The game has no authoritative state.");
    const gymState = provisionalDeclarationRuntime.actionGymState(game.state, { create: true });
    if (gymState.destinationCommit?.requestId && gymState.destinationCommit.requestId === String(body.requestId || "")) {
      return sendJson(res, 200, sanitizeSharedGamePayloadForDelivery({
        ok: true, duplicate: true, commit: gymState.destinationCommit, version: game.version, state: game.state
      }));
    }
    const conflict = gameStateVersionConflict(game, body.expectedVersion);
    if (conflict) return sendJson(res, conflict.status, conflict.payload);
    const reserved = provisionalDeclarationRuntime.reserveDestination(game.state, body, nowIso(), {
      actionsPerPlayer: 3,
      isBlocking: interactionSituationLifecycle.isBlocking,
      allowAnyActionPlayer: Boolean(game.state.testingTools?.freeMode || game.state.testingTools?.ignoreTurnOrder)
    });
    if (!reserved.ok) {
      return sendJson(res, 409, sanitizeSharedGamePayloadForDelivery({
        error: "control-timing-closed",
        reason: reserved.reason,
        currentVersion: game.version,
        currentSituation: reserved.timing?.pending || null,
        state: game.state
      }));
    }
    const payload = writeAuthoritativeTimingMutation(game, body, "action-destination-committed");
    payload.commit = reserved.commit;
    return sendJson(res, 201, payload);
  }

  const destinationReleaseMatch = url.pathname.match(/^\/api\/games\/([^/]+)\/action-destination-commits\/([^/]+)\/release$/);
  if (destinationReleaseMatch && req.method === "POST") {
    const gameId = safeGameId(destinationReleaseMatch[1]);
    if (!fs.existsSync(gamePath(gameId))) return sendError(res, 404, "Game not found.");
    const body = await readBody(req);
    const game = readGame(gameId);
    if (!isPlainObject(game.state)) return sendError(res, 409, "The game has no authoritative state.");
    const conflict = gameStateVersionConflict(game, body.expectedVersion);
    if (conflict) return sendJson(res, conflict.status, conflict.payload);
    const released = provisionalDeclarationRuntime.releaseDestination(
      game.state,
      destinationReleaseMatch[2],
      nowIso(),
      body.reason || "The selected Action destination did not start."
    );
    if (!released.ok) {
      return sendJson(res, 409, {
        error: released.reason,
        reason: released.reason === "destination-operation-started"
          ? "The Action operation already started and cannot be released as an unstarted destination."
          : "The Action destination reservation no longer exists.",
        currentVersion: game.version,
        state: game.state
      });
    }
    const payload = writeAuthoritativeTimingMutation(game, body, "action-destination-released");
    payload.commit = released.commit;
    payload.duplicate = Boolean(released.duplicate);
    return sendJson(res, 200, payload);
  }

  const destinationCompleteMatch = url.pathname.match(/^\/api\/games\/([^/]+)\/action-destination-commits\/([^/]+)\/complete$/);
  if (destinationCompleteMatch && req.method === "POST") {
    const gameId = safeGameId(destinationCompleteMatch[1]);
    if (!fs.existsSync(gamePath(gameId))) return sendError(res, 404, "Game not found.");
    const body = await readBody(req);
    const game = readGame(gameId);
    if (!isPlainObject(game.state)) return sendError(res, 409, "The game has no authoritative state.");
    const conflict = gameStateVersionConflict(game, body.expectedVersion);
    if (conflict) return sendJson(res, conflict.status, conflict.payload);
    const gymState = provisionalDeclarationRuntime.actionGymState(game.state, { create: true });
    const commit = gymState.destinationCommit || null;
    if (!commit || commit.id !== destinationCompleteMatch[2]) {
      return sendJson(res, 409, { error: "destination-missing", reason: "The Action destination is no longer active.", currentVersion: game.version, state: game.state });
    }
    const operation = (gymState.actionOperations || []).find((entry) => entry.id === commit.operationId);
    if (!operation || (body.operationId && operation.id !== body.operationId)) {
      return sendJson(res, 409, { error: "operation-missing", reason: "The linked Action operation no longer matches this destination.", currentVersion: game.version, state: game.state });
    }
    if (commit.status === provisionalDeclarationRuntime.DESTINATION_STATES.COMPLETED && operation.status === "completed") {
      return sendJson(res, 200, sanitizeSharedGamePayloadForDelivery({ ok: true, duplicate: true, commit, operation, version: game.version, state: game.state }));
    }
    if (commit.status !== provisionalDeclarationRuntime.DESTINATION_STATES.RESOLVING || operation.status !== "resolving") {
      return sendJson(res, 409, { error: "operation-not-resolving", reason: "The Action operation is not awaiting completion.", currentVersion: game.version, state: game.state });
    }
    const openWheel = (game.state.wheelSessions || []).find((session) => (session.sourceActionVisitId === operation.visitId || session.actionVisitId === operation.visitId)
      && !["completed", "cancelled", "undone"].includes(String(session.status || "").toLowerCase()));
    if (openWheel) {
      return sendJson(res, 409, { error: "wheel-session-open", reason: "The linked wheel session is still open.", currentVersion: game.version, state: game.state });
    }
    const sessionCollections = {
      breeder: game.state.breederVisits,
      "game-corner": game.state.gameCornerSessions,
      "pokemon-center": game.state.pokemonCenterSessions,
      graveyard: game.state.graveyardSessions,
      pc: game.state.pcSessions,
      "department-store": game.state.departmentStoreVisits
    };
    const linkedSession = (sessionCollections[operation.linkedFeatureType] || [])
      .find((session) => session.id === operation.linkedFeatureSessionId);
    const completedAt = nowIso();
    if (linkedSession) {
      linkedSession.actionOperationReady = true;
      linkedSession.actionOperationFinishedAt = completedAt;
      linkedSession.status = "completed";
      linkedSession.completedAt ||= completedAt;
    }
    operation.status = "completed";
    operation.completedAt = completedAt;
    operation.completionReason = "location-session-finished";
    commit.status = provisionalDeclarationRuntime.DESTINATION_STATES.COMPLETED;
    commit.completedAt = completedAt;
    if (gymState.activeActionOperationId === operation.id) gymState.activeActionOperationId = "";
    const visit = (gymState.playerVisits?.[operation.playerId] || []).find((entry) => entry.id === operation.visitId);
    if (visit) visit.actionOperationStatus = "completed";
    const payload = writeAuthoritativeTimingMutation(game, body, "action-destination-completed");
    delete payload.state;
    payload.commit = commit;
    payload.operation = operation;
    payload.linkedSession = linkedSession || null;
    return sendJson(res, 200, payload);
  }

  const provisionalMatch = url.pathname.match(/^\/api\/games\/([^/]+)\/provisional-declarations(?:\/([^/]+)(?:\/(draft|confirm|withdraw|release))?)?$/);
  if (provisionalMatch) {
    const gameId = safeGameId(provisionalMatch[1]);
    if (!fs.existsSync(gamePath(gameId))) return sendError(res, 404, "Game not found.");
    const declarationId = String(provisionalMatch[2] || "");
    const operation = String(provisionalMatch[3] || "");
    const body = await readBody(req);
    const game = readGame(gameId);
    if (!isPlainObject(game.state)) return sendError(res, 409, "The game has no authoritative state.");
    game.state.interactionEvents ||= [];

    if (!declarationId && req.method === "POST") {
      const claimKey = String(body.claimKey || "");
      const requestedDeclarationId = String(body.declarationId || "");
      const existing = game.state.interactionEvents.find((entry) => {
        if (requestedDeclarationId && entry.id === requestedDeclarationId) return true;
        return claimKey
          && entry.payload?.claimKey === claimKey
          && provisionalDeclarationRuntime.isProvisionalActivity(entry);
      });
      if (existing) {
        return sendJson(res, 200, sanitizeSharedGamePayloadForDelivery({
          ok: true, duplicate: true, activity: existing, version: game.version, state: game.state
        }));
      }
      const conflict = gameStateVersionConflict(game, body.expectedVersion);
      if (conflict) return sendJson(res, conflict.status, conflict.payload);
      const exact = serverExactTokenRecord(game.state, body.declaringPlayerId, body.inventoryRecordId, body.effectContractId);
      if (!exact.ok) return sendJson(res, 409, { error: "illegal-effect-claim", reason: exact.reason, currentVersion: game.version });
      if (!exact.definition.usesControlTiming || exact.definition.isResponse || !exact.definition.timingWindows.includes("actionOpen")) {
        return sendJson(res, 409, { error: "illegal-effect-claim", reason: "This exact effect is not legal in ordinary Action Control Timing.", currentVersion: game.version });
      }
      if (!serverDeclarationHasConstructiblePath(game.state, exact.player.id, exact.definition)) {
        return sendJson(res, 409, { error: "illegal-effect-claim", reason: "This effect has no constructible legal declaration path right now.", currentVersion: game.version });
      }
      const timing = provisionalDeclarationRuntime.controlTimingStatus(game.state, {
        actionsPerPlayer: 3,
        isBlocking: interactionSituationLifecycle.isBlocking
      });
      if (!timing.open) {
        return sendJson(res, 409, sanitizeSharedGamePayloadForDelivery({
          error: "control-timing-closed",
          reason: timing.reason,
          currentVersion: game.version,
          currentSituation: timing.pending || null,
          state: game.state
        }));
      }
      const interruptedPlayer = (game.state.players || []).find((player) => player.id === timing.decision.currentPlayerId);
      const activity = provisionalDeclarationRuntime.createActivity({
        declarationId: String(body.declarationId || `provisional-${randomUUID()}`),
        claimKey,
        declaringPlayerId: exact.player.id,
        declaringPlayerName: exact.player.name,
        effectContractId: exact.definition.id,
        effectName: exact.definition.name,
        inventoryRecordId: exact.item.id,
        series: game.state.series,
        gym: game.state.gym,
        interruptedActionPlayerId: timing.decision.currentPlayerId,
        interruptedActionPlayerName: interruptedPlayer?.name,
        interruptedContinuation: {
          series: game.state.series,
          gym: Number(game.state.gym || 1),
          phase: "action",
          actionPlayerId: timing.decision.currentPlayerId,
          actionNumber: timing.decision.actionNumber,
          selectedLocationId: timing.decision.gymState?.selectedLocationId || ""
        },
        timingContext: {
          type: "actionOpenControl",
          phase: "action",
          series: game.state.series,
          gym: Number(game.state.gym || 1),
          actionPlayerId: timing.decision.currentPlayerId,
          actionNumber: timing.decision.actionNumber
        },
        draftSelections: body.draftSelections || {}
      }, nowIso());
      activity.eventOrder = serverNextEventOrder(game.state);
      game.state.interactionEvents.unshift(activity);
      game.state.liveTable = { ...(game.state.liveTable || {}), enabled: true, currentPendingEventId: activity.id };
      return sendJson(res, 201, writeAuthoritativeTimingMutation(game, body, "provisional-declaration-claimed", activity));
    }

    const activity = game.state.interactionEvents.find((entry) => entry.id === declarationId);
    if (!activity) return sendError(res, 404, "Provisional declaration not found.");

    if (operation === "draft" && req.method === "PUT") {
      if (String(activity.payload?.declaringPlayerId || "") !== String(body.declaringPlayerId || "")) {
        return sendError(res, 403, "Only the declaring player may update this declaration draft.");
      }
      const updated = provisionalDeclarationRuntime.updateDraft(activity, body.draftSelections, body.expectedDeclarationRevision, nowIso());
      if (!updated.ok) {
        return sendJson(res, 409, sanitizeSharedGamePayloadForDelivery({
          error: updated.reason, currentRevision: updated.currentRevision, currentVersion: game.version, activity
        }));
      }
      const payload = writeAuthoritativeTimingMutation(game, body, "provisional-declaration-draft", activity);
      payload.declarationRevision = updated.revision;
      return sendJson(res, 200, payload);
    }

    if (operation === "confirm" && req.method === "POST") {
      if (activity.payload?.declarationStage === provisionalDeclarationRuntime.DECLARATION_STAGES.CONFIRMED) {
        return sendJson(res, 200, sanitizeSharedGamePayloadForDelivery({
          ok: true, duplicate: true, activity, version: game.version, state: game.state
        }));
      }
      const conflict = gameStateVersionConflict(game, body.expectedVersion);
      if (conflict) return sendJson(res, conflict.status, conflict.payload);
      if (!provisionalDeclarationRuntime.isProvisionalActivity(activity)) {
        return sendJson(res, 409, { error: "not-provisional", reason: "This declaration is no longer awaiting confirmation.", currentVersion: game.version });
      }
      if (String(activity.payload.declaringPlayerId) !== String(body.declaringPlayerId || "")) {
        return sendError(res, 403, "Only the declaring player may confirm this declaration.");
      }
      const currentDeclarationRevision = Math.max(1, Number(activity.payload.declarationRevision || 1));
      if (Number(body.expectedDeclarationRevision) !== currentDeclarationRevision) {
        return sendJson(res, 409, sanitizeSharedGamePayloadForDelivery({
          error: "declaration-revision-conflict", currentRevision: currentDeclarationRevision,
          currentVersion: game.version, activity
        }));
      }
      const confirmed = confirmServerProvisionalDeclaration(game, activity, body);
      if (!confirmed.ok) {
        return sendJson(res, 409, sanitizeSharedGamePayloadForDelivery({
          error: confirmed.error, reason: confirmed.reason, currentVersion: game.version, activity
        }));
      }
      const payload = writeAuthoritativeTimingMutation(game, body, "provisional-declaration-confirmed", activity);
      payload.consumption = confirmed.consumption;
      return sendJson(res, 200, payload);
    }

    if (["withdraw", "release"].includes(operation) && req.method === "POST") {
      if (operation === "release" && !userCanAdminGame(body.userId, gameId)) {
        return sendError(res, 403, "Host access is required to release an abandoned declaration.");
      }
      if (operation === "withdraw" && String(activity.payload?.declaringPlayerId || "") !== String(body.declaringPlayerId || "")) {
        return sendError(res, 403, "Only the declaring player may withdraw this declaration.");
      }
      if (activity.payload?.declarationStage === provisionalDeclarationRuntime.DECLARATION_STAGES.WITHDRAWN) {
        return sendJson(res, 200, sanitizeSharedGamePayloadForDelivery({
          ok: true, duplicate: true, activity, version: game.version, state: game.state
        }));
      }
      const conflict = gameStateVersionConflict(game, body.expectedVersion);
      if (conflict) return sendJson(res, conflict.status, conflict.payload);
      const withdrawn = provisionalDeclarationRuntime.markWithdrawn(
        activity,
        nowIso(),
        operation === "release" ? "Host released an abandoned unconfirmed declaration." : "Player withdrew before confirmation."
      );
      if (!withdrawn.ok) return sendJson(res, 409, { error: withdrawn.reason, reason: "Only an unconfirmed declaration may be withdrawn." });
      if (game.state.liveTable?.currentPendingEventId === activity.id) game.state.liveTable.currentPendingEventId = "";
      return sendJson(res, 200, writeAuthoritativeTimingMutation(
        game,
        body,
        operation === "release" ? "provisional-declaration-released" : "provisional-declaration-withdrawn",
        activity
      ));
    }

    return sendError(res, 405, "Unsupported provisional declaration request.");
  }

  const tokenArtMatch = url.pathname.match(/^\/api\/games\/([^/]+)\/token-art\/([^/]+)(?:\/image)?$/);
  if (tokenArtMatch) {
    const gameId = safeGameId(tokenArtMatch[1]);
    const key = tokenArtKey(tokenArtMatch[2]);
    const imageRequest = url.pathname.endsWith("/image");
    if (imageRequest && req.method === "GET") {
      const record = readTokenArt(gameId, key);
      const src = String(record?.setting?.src || "");
      const match = src.match(/^data:([^;,]+);base64,(.+)$/);
      if (!match) return sendError(res, 404, "Token art image not found");
      const buffer = Buffer.from(match[2], "base64");
      res.writeHead(200, {
        "content-type": match[1] || "image/png",
        "cache-control": "no-cache",
        "access-control-allow-origin": "*"
      });
      res.end(buffer);
      return;
    }
    if (!imageRequest && req.method === "PUT") {
      const body = await readBody(req);
      const setting = body?.setting && typeof body.setting === "object" ? body.setting : {};
      writeTokenArt(gameId, key, setting);
      return sendJson(res, 200, {
        ok: true,
        key,
        setting: {
          ...setting,
          src: String(setting.src || "").startsWith("data:")
            ? `${tokenArtImageUrl(gameId, key)}?v=${Date.now()}`
            : String(setting.src || "")
        }
      });
    }
    return sendError(res, 405, "Unsupported token art request");
  }
  const presenceMatch = url.pathname.match(/^\/api\/games\/([^/]+)\/presence\/activity$/);
  if (presenceMatch) {
    const gameId = safeGameId(presenceMatch[1]);
    if (req.method !== "POST") return sendError(res, 405, "Unsupported presence activity request");
    if (!fs.existsSync(gamePath(gameId))) return sendError(res, 404, "Game not found.");
    const body = await readBody(req);
    const game = readGame(gameId);
    const normalized = v2RoutePublicActivityFromBody(game, body || {});
    if (!normalized.ok) return sendError(res, normalized.status || 400, normalized.error || "Invalid public activity.");
    broadcast(game.id, {
      type: "v2-route-public-activity",
      gameId: game.id,
      clientId: body.clientId || "",
      activity: normalized.activity
    });
    return sendJson(res, 202, { ok: true, activity: normalized.activity });
  }

  const gameMatch = url.pathname.match(/^\/api\/games\/([^/]+)(?:\/(state|events|activity)(?:\/([^/]+)(?:\/(responses|status))?)?)?$/);
  if (!gameMatch) return sendError(res, 404, "Not found");
  const gameId = safeGameId(gameMatch[1]);
  const resource = gameMatch[2] || "";
  const resourceId = gameMatch[3] || "";
  const subresource = gameMatch[4] || "";

  if ((req.method === "GET" || req.method === "HEAD") && !fs.existsSync(gamePath(gameId))) {
    return sendError(res, 404, "Game not found.");
  }

  if (resource === "events" && req.method === "GET") {
    const game = readGame(gameId);
    res.writeHead(200, {
      "content-type": "text/event-stream",
      "cache-control": "no-cache",
      connection: "keep-alive",
      "access-control-allow-origin": "*"
    });
    res.write(`data: ${JSON.stringify({ type: "connected", gameId, version: game.version })}\n\n`);
    const clients = sseClients.get(gameId) || new Set();
    clients.add(res);
    sseClients.set(gameId, clients);
    req.on("close", () => {
      clients.delete(res);
      if (!clients.size) sseClients.delete(gameId);
    });
    return;
  }

  if (!resource && req.method === "GET") {
    const game = readGame(gameId);
    if (game.state) {
      const compacted = compactGameStateForStorage(game.id, game.state, { persistTokenArt: false });
      if (compacted.changed) game.state = compacted.state;
    }
    return sendJson(res, 200, { game: sanitizeSharedGamePayloadForDelivery(game) });
  }

  if (resource === "state" && req.method === "GET") {
    const game = readGame(gameId);
    let storageCompacted = false;
    if (game.state) {
      const compacted = compactGameStateForStorage(game.id, game.state, {
        compactUndoSnapshots: true,
        persistTokenArt: false
      });
      storageCompacted = compacted.changed;
      if (compacted.changed) game.state = compacted.state;
    }
    const users = readUsers().users;
    const memberIds = (game.members || []).map((member) => typeof member === "string" ? member : member.userId || member.id || "").map(safeUserId);
    return sendJson(res, 200, {
      gameId: game.id,
      name: game.name,
      version: game.version,
      updatedAt: game.updatedAt,
      storageCompacted,
      rulesetVersion: game.rulesetVersion,
      actionPhaseVersion: persistedActionPhaseVersion(game),
      sandboxCommits: Array.isArray(game.sandboxCommits) ? game.sandboxCommits : [],
      members: memberIds.map((userId) => ({
        userId,
        displayName: users.find((user) => user.id === userId)?.displayName || userId,
        role: (game.members || []).find((member) => safeUserId(typeof member === "string" ? member : member.userId || member.id) === userId)?.role || "player"
      })),
      state: sanitizeSharedGamePayloadForDelivery(game.state)
    });
  }

  if (resource === "state" && req.method === "PUT") {
    const body = await readBody(req);
    if (!body || !isPlainObject(body.state)) {
      return sendError(res, 400, "state object is required");
    }
    const game = readGame(gameId);
    const timingConflict = authoritativeTimingOverwriteConflict(game.state, body.state);
    if (timingConflict) {
      return sendJson(res, 409, sanitizeSharedGamePayloadForDelivery({
        error: "authoritative-timing-conflict",
        reason: timingConflict.reason,
        currentVersion: Number(game.version || 0),
        updatedAt: game.updatedAt,
        currentSituation: timingConflict.currentSituation || null
      }));
    }
    game.sandboxCommits ||= [];
    const sandboxSessionId = String(body.sandboxSessionId || "").trim();
    const priorSandboxCommit = body.commitType === "token-scenario" && sandboxSessionId
      ? game.sandboxCommits.find((record) => record.sessionId === sandboxSessionId)
        || (game.state?.sandboxCommitHistory || []).find((record) => record.sessionId === sandboxSessionId)
      : null;
    if (priorSandboxCommit) {
      return sendJson(res, 200, {
        ok: true,
        alreadyCommitted: true,
        version: game.version,
        updatedAt: game.updatedAt,
        commitType: "token-scenario",
        sandboxSessionId
      });
    }
    const stateErrors = validateGameStateStructure(body.state);
    if (stateErrors.length) return sendJson(res, 400, { error: "invalid-state", details: stateErrors });
    const hasExpectedVersion = Object.prototype.hasOwnProperty.call(body, "expectedVersion");
    if (hasExpectedVersion) {
      const expectedVersion = Number(body.expectedVersion);
      if (!Number.isInteger(expectedVersion) || expectedVersion < 0) {
        return sendJson(res, 400, { error: "expectedVersion must be a non-negative integer" });
      }
      if (expectedVersion !== Number(game.version || 0)) {
        return sendJson(res, 409, {
          error: "version-conflict",
          expectedVersion,
          currentVersion: Number(game.version || 0),
          updatedAt: game.updatedAt
        });
      }
    }
    if (body.commitType === "token-scenario" && !sandboxSessionId) {
      return sendJson(res, 400, { error: "sandboxSessionId is required for a Token scenario commit" });
    }
    game.state = compactGameStateForStorage(game.id, body.state, { compactUndoSnapshots: true }).state;
    syncGameActivitiesFromState(game);
    game.name = body.name || game.name;
    game.rulesetVersion = game.state?.ruleset?.version || game.rulesetVersion;
    game.actionPhaseVersion = persistedActionPhaseVersion(game);
    game.version = Number(game.version || 0) + 1;
    game.updatedAt = nowIso();
    if (body.commitType === "token-scenario") {
      const stateCommit = (body.state.sandboxCommitHistory || []).find((record) => record.sessionId === sandboxSessionId) || {};
      game.sandboxCommits.push({
        ...stateCommit,
        sessionId: sandboxSessionId,
        committedRevision: game.version,
        committedAt: stateCommit.committedAt || game.updatedAt
      });
    }
    writeGame(game);
    broadcast(game.id, {
      type: "state-updated",
      gameId: game.id,
      version: game.version,
      updatedAt: game.updatedAt,
      clientId: body.clientId || "",
      commitType: body.commitType || "",
      sandboxSessionId: body.sandboxSessionId || ""
    });
    return sendJson(res, 200, {
      ok: true,
      version: game.version,
      updatedAt: game.updatedAt,
      commitType: body.commitType || "",
      sandboxSessionId: body.sandboxSessionId || ""
    });
  }

  if (resource === "activity" && !resourceId && req.method === "POST") {
    const body = await readBody(req);
    const game = readGame(gameId);
    const activity = upsertGameActivity(game, {
      id: body.id || `server-activity-${Date.now()}-${randomUUID().slice(0, 6)}`,
      ...body,
      createdAt: body.createdAt || nowIso()
    });
    game.version = Number(game.version || 0) + 1;
    game.updatedAt = nowIso();
    writeGame(game);
    broadcast(game.id, {
      type: "activity-created",
      gameId: game.id,
      version: game.version,
      clientId: body.clientId || "",
      activity
    });
    return sendJson(res, 201, sanitizeSharedGamePayloadForDelivery({ activity, version: game.version }));
  }

  if (resource === "activity" && !resourceId && req.method === "GET") {
    const game = readGame(gameId);
    return sendJson(res, 200, sanitizeSharedGamePayloadForDelivery({ activity: game.activity || [], version: game.version }));
  }

  if (resource === "activity" && resourceId && subresource === "responses" && req.method === "POST") {
    const body = await readBody(req);
    const game = readGame(gameId);
    game.activity ||= [];
    let activity = isPlainObject(body.activity) && body.activity.id === resourceId
      ? upsertGameActivity(game, body.activity)
      : game.activity.find((entry) => entry.id === resourceId);
    if (!activity) {
      activity = {
        id: resourceId,
        title: body.activityTitle || "Respondable Activity",
        status: "open",
        responses: [],
        createdAt: nowIso()
      };
      activity = upsertGameActivity(game, activity);
    }
    activity.responses ||= [];
    const response = {
      id: body.id || `activity-response-${Date.now()}-${randomUUID().slice(0, 6)}`,
      type: body.type || "response",
      playerId: body.playerId || "",
      source: body.source || "",
      status: body.status || "",
      tokenId: body.tokenId || "",
      tokenName: body.tokenName || "",
      note: body.note || "",
      targetText: body.targetText || "",
      respondingToPromptId: body.respondingToPromptId || body.promptId || "",
      promptId: body.promptId || body.respondingToPromptId || "",
      promptStepId: body.promptStepId || "",
      createsPrompt: body.createsPrompt !== undefined ? Boolean(body.createsPrompt) : body.type !== "pass",
      canceledAt: body.canceledAt || "",
      cancelReason: body.cancelReason || "",
      eventOrder: Number(body.eventOrder || 0),
      createdAt: body.createdAt || nowIso()
    };
    if (!activity.responses.some((entry) => entry.id === response.id)) activity.responses.push(response);
    activity.status = body.activityStatus || activity.status || "open";
    activity.updatedAt = nowIso();
    activity = upsertGameActivity(game, activity);
    game.version = Number(game.version || 0) + 1;
    game.updatedAt = nowIso();
    writeGame(game);
    broadcast(game.id, {
      type: "activity-response",
      gameId: game.id,
      version: game.version,
      clientId: body.clientId || "",
      activityId: activity.id,
      activity,
      response
    });
    return sendJson(res, 201, sanitizeSharedGamePayloadForDelivery({ activity, response, version: game.version }));
  }

  if (resource === "activity" && resourceId && subresource === "status" && req.method === "PUT") {
    const body = await readBody(req);
    const game = readGame(gameId);
    game.activity ||= [];
    let activity = isPlainObject(body.activity) && body.activity.id === resourceId
      ? upsertGameActivity(game, body.activity)
      : game.activity.find((entry) => entry.id === resourceId);
    if (!activity) return sendError(res, 404, "Activity not found");
    activity.status = body.status || activity.status;
    activity.resolutionMode = body.resolutionMode || activity.resolutionMode || "";
    activity.resolvedAt = body.resolvedAt || activity.resolvedAt || (activity.status === "open" ? "" : nowIso());
    activity.updatedAt = nowIso();
    activity = upsertGameActivity(game, activity);
    game.version = Number(game.version || 0) + 1;
    game.updatedAt = nowIso();
    writeGame(game);
    broadcast(game.id, {
      type: "activity-status",
      gameId: game.id,
      version: game.version,
      clientId: body.clientId || "",
      activityId: activity.id,
      activity,
      status: activity.status
    });
    return sendJson(res, 200, sanitizeSharedGamePayloadForDelivery({ activity, version: game.version }));
  }

  return sendError(res, 404, "Not found");
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  try {
    if (url.pathname.startsWith("/api/")) return await handleApi(req, res, url);
    if (serveStatic(req, res, url.pathname)) return;
    if (req.method === "GET" && SITE_SHELL_ROUTES.has(url.pathname.replace(/\/+$/, "") || "/")) {
      if (serveStatic(req, res, "/index.html")) return;
    }
    sendError(res, 404, "Not found");
  } catch (error) {
    console.error(error);
    sendError(res, 500, error.message || "Server error");
  }
});

if (require.main === module) {
  server.listen(PORT, () => {
    ensureDataDirs();
    const address = server.address();
    console.log(`Rival Saga server running at http://127.0.0.1:${address?.port || PORT}`);
  });
}

module.exports = {
  server,
  validateGameStateStructure,
  stripPrivateForesightSetDataFromSharedPayload,
  sanitizeSharedGamePayloadForDelivery
};
