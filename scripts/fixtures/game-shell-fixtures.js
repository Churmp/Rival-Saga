const progressedState = {
  series: "Hoenn",
  gym: 6,
  currentPhase: "battle",
  ruleset: { version: "S3-dev", schemaVersion: 1 },
  players: [
    { id: "trainer-red", name: "Red" },
    { id: "trainer-blue", name: "Blue" }
  ],
  tokenConsumptions: [{ id: "token-use-1", tokenId: "arena-trap" }],
  liveTable: { flowState: "rivalBattles", resolutionAnnouncements: [] },
  teamBuilds: { "trainer-red": { slots: [{ pokemonRecordId: "charizard-1" }] } }
};

module.exports = {
  currentProgressed: {
    id: "progressed-current",
    name: "Progressed Current",
    status: "active",
    updatedAt: "2026-07-24T12:00:00.000Z",
    version: 42,
    maxPlayers: 5,
    members: [{ userId: "steven", role: "owner" }],
    state: progressedState
  },
  currentEmpty: {
    id: "empty-current",
    name: "Empty Current",
    status: "lobby",
    updatedAt: "2026-07-24T11:00:00.000Z",
    state: { series: "Kanto", gym: 1, currentPhase: "start", ruleset: { schemaVersion: 1 }, players: [] }
  },
  supportedLegacy: {
    id: "legacy-supported",
    name: "Legacy Supported",
    updatedAt: "2026-07-23T10:00:00.000Z",
    state: { series: "Johto", gym: 3, players: [{ id: "legacy-trainer", name: "Legacy" }] }
  },
  modernTokenReferee: {
    id: "modern-token-referee",
    name: "Modern Token Referee",
    updatedAt: "2026-07-22T10:00:00.000Z",
    state: {
      series: "Sinnoh",
      gym: 4,
      currentPhase: "action",
      ruleset: { schemaVersion: 1 },
      players: [{ id: "modern-trainer", name: "Modern" }],
      tokenConsumptions: [{ id: "modern-token", resultSummary: { duration: { gyms: 2 } } }],
      liveTable: { controlledContext: { actorPlayerId: "modern-trainer" } },
      sandboxCommits: [{ id: "commit-1", status: "committed" }]
    }
  },
  malformedOptional: {
    id: "malformed-optional",
    name: "Malformed Optional",
    members: { unexpectedly: "not-an-array" },
    rulesetPatchHistory: { unexpectedly: "not-an-array" },
    state: { series: "Unova", gym: 2, currentPhase: "shop", ruleset: { schemaVersion: 1 }, players: [] }
  },
  unsupportedSchema: {
    id: "unsupported-schema",
    name: "Future Game",
    state: { series: "Paldea", gym: 8, currentPhase: "battle", ruleset: { schemaVersion: 99 }, players: [] }
  },
  isolatedQa: {
    id: "codex-shell-qa-smoke",
    name: "Isolated QA",
    testFixture: true,
    state: { ruleset: { schemaVersion: 1 }, players: [] }
  },
  orphanedValid: {
    id: "orphaned-valid",
    name: "Orphaned Valid",
    state: { series: "Kalos", gym: 5, currentPhase: "action", ruleset: { schemaVersion: 1 }, players: [] }
  },
  staleRememberedGameId: "missing-remembered-game",
  staleRememberedTrainerId: "missing-remembered-trainer"
};
