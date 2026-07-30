const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");

const fixtures = require("./fixtures/game-shell-fixtures.js");
const contract = require("../game-shell-contract.js");

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "rival-saga-shell-"));
const gamesDir = path.join(tempRoot, "games");
fs.mkdirSync(gamesDir, { recursive: true });
fs.writeFileSync(path.join(tempRoot, "users.json"), JSON.stringify({
  users: [{ id: "steven", loginId: "steven", displayName: "Steven", role: "admin", gameIds: ["progressed-current"] }]
}));
fs.writeFileSync(path.join(tempRoot, "ruleset-patches.json"), JSON.stringify({ patches: [] }));

const records = [
  fixtures.currentProgressed,
  fixtures.currentEmpty,
  fixtures.supportedLegacy,
  fixtures.modernTokenReferee,
  fixtures.malformedOptional,
  fixtures.unsupportedSchema,
  fixtures.isolatedQa,
  fixtures.orphanedValid
];
records.forEach((record) => fs.writeFileSync(path.join(gamesDir, `${record.id}.json`), JSON.stringify(record, null, 2)));

function digest(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

const hashesBefore = new Map(records.map((record) => [record.id, digest(path.join(gamesDir, `${record.id}.json`))]));
process.env.RIVAL_SAGA_DATA_DIR = tempRoot;
const { server } = require("../server.js");

let origin = "";
test.before(async () => {
  await assert.rejects(fetch("http://127.0.0.1:1/api/site"), /fetch failed/i);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  origin = `http://127.0.0.1:${server.address().port}`;
});

test.after(async () => {
  await new Promise((resolve) => server.close(resolve));
  fs.rmSync(tempRoot, { recursive: true, force: true });
});

test("normalizes current, legacy, modern, and malformed optional records", () => {
  for (const record of [fixtures.currentProgressed, fixtures.currentEmpty, fixtures.supportedLegacy, fixtures.modernTokenReferee, fixtures.malformedOptional]) {
    assert.equal(contract.normalizeGameSummary(record).ok, true, record.id);
  }
  const progressed = contract.normalizeGameSummary(fixtures.currentProgressed).summary;
  assert.equal(progressed.series, "Hoenn");
  assert.equal(progressed.gym, 6);
  assert.equal(progressed.phase, "battle");
  assert.equal(progressed.playerCount, 2);
});

test("rejects unsupported required schemas without modifying the record", () => {
  const before = JSON.stringify(fixtures.unsupportedSchema);
  const result = contract.normalizeGameSummary(fixtures.unsupportedSchema);
  assert.equal(result.ok, false);
  assert.equal(result.code, "unsupported_schema");
  assert.match(result.reason, /Schema 99/);
  assert.equal(JSON.stringify(fixtures.unsupportedSchema), before);
});

test("shell and inner game share one API origin", () => {
  assert.equal(contract.resolveApiOrigin(new URL(`${origin}/?game=progressed-current`)), origin);
  const configured = contract.resolveApiOrigin(new URL("http://127.0.0.1:9999/"), origin);
  assert.equal(configured, origin);
});

test("authoritative progressed game appears with matching gym and phase", async () => {
  const response = await fetch(`${origin}/api/site`);
  assert.equal(response.status, 200);
  const payload = await response.json();
  const progressed = payload.games.find((game) => game.id === "progressed-current");
  assert.ok(progressed);
  assert.equal(progressed.gym, fixtures.currentProgressed.state.gym);
  assert.equal(progressed.phase, fixtures.currentProgressed.state.currentPhase);
  assert.equal(progressed.playerCount, fixtures.currentProgressed.state.players.length);
});

test("opening a summary loads the exact same stable game ID", async () => {
  const payload = await fetch(`${origin}/api/games/progressed-current/state`).then((response) => response.json());
  assert.equal(payload.gameId, "progressed-current");
  assert.equal(payload.state.series, "Hoenn");
});

test("orphaned records are directory-indexed once and isolated QA does not leak", async () => {
  const payload = await fetch(`${origin}/api/games`).then((response) => response.json());
  assert.equal(payload.games.filter((game) => game.id === "orphaned-valid").length, 1);
  assert.equal(payload.games.some((game) => game.id === fixtures.isolatedQa.id), false);
  assert.equal(payload.gameIndex.excluded.some((entry) => entry.id === fixtures.isolatedQa.id), true);
});

test("unsupported schema is reported clearly and optional damage does not erase the list", async () => {
  const payload = await fetch(`${origin}/api/site`).then((response) => response.json());
  assert.equal(payload.games.some((game) => game.id === "malformed-optional"), true);
  assert.equal(payload.gameIndex.rejected.some((entry) => entry.id === "unsupported-schema" && entry.code === "unsupported_schema"), true);
  assert.ok(payload.games.length > 1);
});

test("stale deep links fail with 404 and do not create replacement games", async () => {
  const missingPath = path.join(gamesDir, `${fixtures.staleRememberedGameId}.json`);
  const response = await fetch(`${origin}/api/games/${fixtures.staleRememberedGameId}/state`);
  assert.equal(response.status, 404);
  assert.equal(fs.existsSync(missingPath), false);
});

test("retry succeeds after the backend becomes reachable", async () => {
  const response = await fetch(`${origin}/api/site`);
  assert.equal(response.status, 200);
  assert.equal((await response.json()).games.length, 6);
});

test("listing and opening do not modify authoritative records", () => {
  records.forEach((record) => {
    assert.equal(digest(path.join(gamesDir, `${record.id}.json`)), hashesBefore.get(record.id), record.id);
  });
});

test("shell source preserves stale identities narrowly and never labels request failure as no games", () => {
  const source = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
  assert.match(source, /localStorage\.removeItem\(BACKEND_GAME_ID_KEY\)/);
  assert.match(source, /siteShellState\.activeSection = "games";/);
  assert.match(source, /setActiveSiteProfileId\(""\)/);
  assert.match(source, /Games could not be loaded; use Retry above\./);
  assert.match(source, /data-site-retry-games/);
  assert.match(source, /backendSync\.staleTrainerId/);
});
