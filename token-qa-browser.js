(function initTokenQaBrowser() {
  "use strict";

  const effects = globalThis.rivalSagaControlTokenEffects;
  const controllerApi = globalThis.rivalSagaTokenControlController;
  const params = new URLSearchParams(location.search);
  const scenarioId = params.get("scenario") || "BROWSER-001";
  const gameId = params.get("gameId") || `token-qa-${scenarioId.toLowerCase()}`;
  const titles = {
    "BROWSER-001": "Rage, Restrict, and Unban",
    "BROWSER-002": "Substitute and Extra Ban",
    "BROWSER-003": "Arena Trap and Clear Smog",
    "BROWSER-004": "Incinerate and Steal",
    "BROWSER-005": "Wicked Blow",
    "BROWSER-006": "Standard Curse Tokens"
  };
  const battleTierOrder = ["LC", "LC Elite", "Safari", "Safari Elite", "Poke", "Poke Elite", "Great", "Great Elite", "Ultra", "Ultra Elite", "Master", "Master Elite"];
  let state;
  let version = 0;
  let controller;
  let lastMessage = "Scenario ready.";

  function token(id, name) {
    return { id, name, type: "TOKEN", category: "Token" };
  }

  function resource(id, name, type = "ITEM", extras = {}) {
    return { id, name, type, ...extras };
  }

  function player(id, name, inventory) {
    return { id, name, inventory, moveAccessGrants: [], perks: [], buffs: [] };
  }

  function pokemon(id, trainerId, name, extras = {}) {
    return {
      id,
      trainerId,
      name,
      currentSpecies: name,
      rosterType: "Active",
      status: "Active",
      level: 100,
      naturalLevel: 100,
      ability: "Natural Ability",
      moves: ["Tackle"],
      buffs: [],
      nerfs: [],
      effectBuffs: [],
      ...extras
    };
  }

  function fixture() {
    return {
      marker: `browser-token-qa:${scenarioId}`,
      qaBrowserStep: 0,
      series: "Kanto",
      gym: 1,
      phase: "action",
      players: [
        player("gold", "Gold", [
          token("gold-rage", "Rage Candy Bar"),
          token("gold-sub", "Substitute"),
          resource("gold-leftovers", "Leftovers")
        ]),
        player("red", "Red", [
          token("red-sub", "Substitute"),
          resource("red-leftovers-1", "Leftovers"),
          resource("red-leftovers-2", "Leftovers"),
          resource("red-recover", "Recover", "TM", { moveName: "Recover" })
        ]),
        player("steevee", "Steevee", [
          token("steevee-restrict", "Restrict"),
          token("steevee-restrict-retry", "Restrict"),
          token("steevee-unban", "Unban"),
          token("steevee-extra-ban", "Extra Ban"),
          token("steevee-arena", "Arena Trap"),
          token("steevee-clear", "Clear Smog"),
          token("steevee-incinerate", "Incinerate"),
          token("steevee-steal", "Steal"),
          token("steevee-wicked", "Wicked Blow"),
          token("steevee-toxic", "Toxic Curse"),
          token("steevee-iron", "Iron Ball Curse"),
          token("steevee-flame", "Flame Curse"),
          token("steevee-silencing", "Silencing Curse"),
          token("steevee-imprison", "Imprison Curse"),
          resource("steevee-leftovers", "Leftovers")
        ])
      ],
      pokemonRecords: [
        pokemon("gold-garchomp", "gold", "Garchomp", { baseStats: { hp: 108 } }),
        pokemon("red-garchomp", "red", "Garchomp", { baseStats: { hp: 108 }, battleTier: "Poke" }),
        pokemon("red-garchomp-2", "red", "Garchomp"),
        pokemon("red-lucario", "red", "Lucario"),
        pokemon("steevee-alakazam", "steevee", "Alakazam")
      ],
      interactionEvents: [],
      transactions: [],
      log: [],
      lingeringStatuses: [],
      globalPokemonRules: {},
      banlistHistory: [],
      fieldTokens: [],
      effectAuditRecords: [],
      effectOperations: [],
      tokenConsumptions: [],
      tokenActivations: [],
      tokenUndoHistory: [],
      classStateByPlayerId: { gold: { classId: "professor", moveAccessGrants: [], persistentMarker: "class-safe" } },
      perkSystem: { moveAccessGrantsByPlayerId: {}, persistentMarker: "perk-safe" },
      teambuilder: {
        moveAccessGrantsByPlayerId: {},
        activeBuildByPlayerId: { red: "red-browser-build" },
        buildsByPlayerId: {
          red: [{
            id: "red-browser-build",
            series: "Kanto",
            gym: 1,
            slots: [
              { slotIndex: 0, pokemonRecordId: "red-lucario", item: "Leftovers", nature: "Jolly", moves: ["Aura Sphere", "Protect"] },
              { slotIndex: 1, pokemonRecordId: "red-garchomp", item: "Leftovers", nature: "Jolly", moves: ["Earthquake", "Dragon Claw", "Protect", "Swords Dance"] },
              { slotIndex: 2, pokemonRecordId: "red-garchomp-2", selectedBattleSpecies: "Garchomp", item: "Leftovers", nature: "Jolly", moves: ["Dragon Claw"], evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }, ivs: { hp: 31, atk: 31, def: 31, spa: 0, spd: 31, spe: 31 } }
            ]
          }]
        }
      },
      battleTeams: {
        "Kanto:G1": {
          red: {
            selected: ["red-lucario", "red-garchomp"],
            selectedBattleSpecies: ["Lucario", "Garchomp"],
            badgeBoosts: [1, 0],
            locked: false
          }
        }
      },
      testingTools: { ignoreTurnOrder: false, freeMode: false, controlledPlayerId: "gold", activeScenario: null },
      liveTable: { currentPendingEventId: "", resolutionAnnouncements: [] }
    };
  }

  function makeController() {
    controller = controllerApi.createScenarioController(state, {
      idPrefix: `${scenarioId.toLowerCase()}-v${version}`,
      seriesOrder: ["Kanto", "Johto", "Hoenn"],
      battleTierForPokemon: (entry) => entry.battleTier || "Great",
      naturalBattleTier: () => "Great",
      tierIndexForName: (tier) => battleTierOrder.indexOf(tier),
      requiredBadgePointsForPokemon: (entry) => Math.max(0, battleTierOrder.indexOf(entry.battleTier || "Great") - battleTierOrder.indexOf("Great")),
      bringLegalityForPokemon: () => ({ ok: true, reason: "" }),
      abilityExists: () => true,
      moveExists: () => true,
      wickedBlowReplacementPlan: (_state, pokemon, targetContext) => targetContext.preview
        ? { ok: true, poolSize: 2, tierCalculation: { finalEvolutionTier: "Great Elite", replacementTier: "Poke" } }
        : {
          ok: true,
          replacementSpecies: "Barbaracle",
          teamSpecies: "Barbaracle",
          pokemonPatch: { ...pokemon, name: "Barbaracle", currentSpecies: "Barbaracle" },
          assignedBadgePoints: 0,
          poolSize: 2,
          tierCalculation: { finalEvolutionTier: "Great Elite", replacementTier: "Poke", orderedStepsBelow: 3 },
          teambuilderSlotPatch: (_slot, index) => ({
            pokemonRecordId: pokemon.id,
            slotIndex: index,
            selectedBattleSpecies: "Barbaracle",
            moves: ["", "", "", ""]
          })
        },
      resourceDefinitionForName: (name) => String(name || "").trim().toLowerCase() === "leftovers"
        ? { name: "Leftovers", type: "ITEM" }
        : null
    });
  }

  async function requestState(method = "GET", nextState = null) {
    const response = await fetch(`/api/games/${encodeURIComponent(gameId)}/state`, method === "GET" ? {} : {
      method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ expectedVersion: version, state: nextState })
    });
    const payload = await response.json();
    if (method === "GET" && response.status === 404) return { version: 0, state: null };
    if (!response.ok) throw new Error(`${method} state failed: ${response.status} ${JSON.stringify(payload)}`);
    return payload;
  }

  async function save() {
    const payload = await requestState("PUT", controller.getState());
    version = payload.version;
    state = controller.getState();
    document.getElementById("save-state").textContent = `Saved revision ${version}`;
  }

  function findPokemon(id) {
    return state.pokemonRecords.find((entry) => entry.id === id);
  }

  function status(type, pokemonId = "") {
    const pokemon = pokemonId ? findPokemon(pokemonId) : null;
    return state.lingeringStatuses.find((entry) => entry.type === type && (!pokemonId
      || entry.targetPokemonId === pokemonId
      || effects.statusAffectsPokemon(entry, pokemon, { state, series: state.series, gym: state.gym, phase: state.phase })));
  }

  function activeCount(type) {
    return state.lingeringStatuses.filter((entry) => entry.type === type && entry.status === "active").length;
  }

  function runToken(input) {
    const declared = controller.declare(input);
    if (!declared.ok) throw new Error(declared.reason);
    if (declared.immediate) return declared;
    const resolved = controller.resolve(declared.event.id);
    if (!resolved.ok) throw new Error(resolved.reason);
    return { declared, resolved };
  }

  const actions = {
    async rage() {
      runToken({ tokenId: "rage-candy-bar", actorPlayerId: "gold", tokenInventoryId: "gold-rage", targetPokemonId: "gold-garchomp" });
      state.qaBrowserStep = 1;
      lastMessage = "Gold used Rage Candy Bar on Garchomp.";
    },
    async restrict() {
      runToken({ tokenId: "restrict-token", actorPlayerId: "steevee", tokenInventoryId: "steevee-restrict", targetPokemonId: "red-garchomp", speciesName: "Garchomp" });
      state.qaBrowserStep = 2;
      lastMessage = "Steevee Restricted Garchomp. Gold's Rage-protected instance stayed legal.";
    },
    async unban() {
      runToken({ tokenId: "unban-token", actorPlayerId: "steevee", tokenInventoryId: "steevee-unban", targetPokemonId: "red-garchomp", speciesName: "Garchomp" });
      state.qaBrowserStep = 3;
      lastMessage = "Steevee Unbanned Garchomp and created six-Gym protection.";
    },
    async retryProtected() {
      const activationCount = state.tokenActivations.length;
      const consumptionCount = state.tokenConsumptions.length;
      const restrict = controller.declare({ tokenId: "restrict-token", actorPlayerId: "steevee", tokenInventoryId: "steevee-restrict-retry", targetPokemonId: "red-garchomp", speciesName: "Garchomp" });
      const extraBan = controller.declare({ tokenId: "extra-ban-token", actorPlayerId: "steevee", tokenInventoryId: "steevee-extra-ban", targetPokemonId: "red-garchomp" });
      if (restrict.ok || extraBan.ok) throw new Error("Unban protection did not reject both protected declarations.");
      if (state.tokenActivations.length !== activationCount || state.tokenConsumptions.length !== consumptionCount) {
        throw new Error("A protected declaration changed activation or consumption history.");
      }
      state.qaRetryResults = { restrict: "Rejected", extraBan: "Rejected" };
      state.qaBrowserStep = 4;
      lastMessage = "Unban protection rejected both Restrict and Extra Ban before consumption.";
    },
    async substituteRed() {
      runToken({ tokenId: "substitute", actorPlayerId: "red", tokenInventoryId: "red-sub", targetPokemonId: "red-garchomp" });
      state.qaBrowserStep = 1;
      lastMessage = "Red attached Substitute to Garchomp.";
    },
    async substituteGold() {
      runToken({ tokenId: "substitute", actorPlayerId: "gold", tokenInventoryId: "gold-sub", targetPokemonId: "gold-garchomp" });
      state.qaBrowserStep = 2;
      lastMessage = "Gold attached Substitute to the matching Garchomp.";
    },
    async extraBan() {
      runToken({ tokenId: "extra-ban-token", actorPlayerId: "steevee", tokenInventoryId: "steevee-extra-ban", targetPokemonId: "red-garchomp" });
      state.qaBrowserStep = 3;
      lastMessage = "Red's selected Substitute negated the entire Extra Ban. Gold's Substitute remained.";
    },
    async undoBan() {
      const activation = [...state.tokenActivations].reverse().find((entry) => entry.tokenDefinitionId === "extra-ban-token");
      if (!activation) throw new Error("No Extra Ban activation is available to undo.");
      const undone = controller.undo(activation.id);
      if (!undone.ok) throw new Error(undone.reason);
      state = controller.getState();
      state.qaBrowserStep = 4;
      lastMessage = "Extra Ban was undone. Only its selected Substitute was restored.";
    },
    async arena() {
      runToken({ tokenId: "arena-trap", actorPlayerId: "steevee", tokenInventoryId: "steevee-arena", targetPokemonId: "red-garchomp" });
      state.qaBrowserStep = 1;
      lastMessage = "Steevee Arena Trapped Red's exact Garchomp. Red must choose its compensation before Team Lock.";
    },
    async arenaCompensation() {
      const arenaStatus = status(effects.CONTROL_STATUS_TYPES.ARENA_TRAP, "red-garchomp");
      if (!arenaStatus) throw new Error("No active Arena Trap is available for customization.");
      const choice = effects.applyArenaTrapCustomization(state, {
        statusId: arenaStatus.id,
        actorPlayerId: "red",
        kind: "move",
        name: "Recover",
        moveSlotIndex: 0
      }, {
        series: "Kanto",
        gym: 1,
        phase: "action",
        makeId: (prefix) => `${prefix}-browser-choice`,
        battleTeamKey: () => "Kanto:G1",
        teamSizeForPlayer: () => 6,
        moveExists: () => true
      });
      if (choice.result !== "resolved") throw new Error(choice.reason || "Arena Trap compensation did not resolve.");
      state.qaBrowserStep = 2;
      lastMessage = "Red chose Recover. The exact trapped Garchomp's generated set now includes it.";
    },
    async rageForClear() {
      runToken({ tokenId: "rage-candy-bar", actorPlayerId: "gold", tokenInventoryId: "gold-rage", targetPokemonId: "gold-garchomp" });
      const gold = state.players.find((entry) => entry.id === "gold");
      gold.moveAccessGrants.push({ id: "browser-exact-grant", pokemonRecordId: "gold-garchomp", moveName: "Spore", active: true, status: "active" });
      state.qaBrowserStep = 3;
      lastMessage = "Gold's Garchomp gained the Rage enhancement and one exact move grant.";
    },
    async clear() {
      runToken({ tokenId: "clear-smog", actorPlayerId: "steevee", tokenInventoryId: "steevee-clear", targetPokemonId: "gold-garchomp" });
      state.qaBrowserStep = 4;
      lastMessage = "Clear Smog removed the exact Rage stat buffs and move grant.";
    },
    async incinerate() {
      runToken({
        tokenId: "incinerate",
        actorPlayerId: "steevee",
        tokenInventoryId: "steevee-incinerate",
        resourceSelections: [
          { playerId: "gold", resourceId: "gold-leftovers" },
          { playerId: "red", resourceId: "red-recover" }
        ]
      });
      state.qaBrowserStep = 1;
      lastMessage = "Incinerate destroyed Gold's Leftovers and Red's Recover while preserving Steevee's copy.";
    },
    async steal() {
      runToken({
        tokenId: "steal-token",
        actorPlayerId: "steevee",
        tokenInventoryId: "steevee-steal",
        targetPokemonId: "red-lucario"
      });
      state.qaBrowserStep = 2;
      lastMessage = "Steal transferred Red's exact Lucario to Steevee and removed Red's stale team references.";
    },
    async wicked() {
      runToken({
        tokenId: "wicked-blow",
        actorPlayerId: "steevee",
        tokenInventoryId: "steevee-wicked",
        targetPokemonId: "red-garchomp-2"
      });
      state.qaBrowserStep = 1;
      lastMessage = "Wicked Blow rerolled Red's exact Active Roster Garchomp into Barbaracle.";
    },
    async flameCurse() {
      runToken({ tokenId: "flame-curse", actorPlayerId: "steevee", tokenInventoryId: "steevee-flame", targetPokemonId: "red-lucario" });
      state.qaBrowserStep = 1;
      lastMessage = "Flame Curse forced Flame Orb on Red's exact Lucario.";
    },
    async silencingCurse() {
      runToken({ tokenId: "silencing-curse", actorPlayerId: "steevee", tokenInventoryId: "steevee-silencing", targetPokemonId: "red-garchomp" });
      state.qaBrowserStep = 2;
      lastMessage = "Silencing Curse requires Red to choose two moves for the exact Garchomp.";
    },
    async repairSilencing() {
      const silencing = status("curse-silencing", "red-garchomp");
      const repaired = effects.completeSilencingSetRepair(state, {
        sourceStatusId: silencing?.id,
        buildId: "red-browser-build",
        moveNames: ["Protect", "Swords Dance"]
      }, { now: new Date().toISOString() });
      if (!repaired.ok) throw new Error(repaired.reason);
      state.qaBrowserStep = 3;
      lastMessage = "Red explicitly kept Protect and Swords Dance.";
    },
    async imprisonCurse() {
      runToken({ tokenId: "imprison-curse", actorPlayerId: "steevee", tokenInventoryId: "steevee-imprison", targetPokemonId: "red-garchomp-2" });
      state.qaBrowserStep = 4;
      lastMessage = "Imprison temporarily removed nature and stat customization from the exact Garchomp.";
    },
    async toxicCurse() {
      runToken({ tokenId: "toxic-curse", actorPlayerId: "steevee", tokenInventoryId: "steevee-toxic", targetPokemonId: "steevee-alakazam" });
      state.qaBrowserStep = 5;
      lastMessage = "Steevee used Toxic Curse on their own Active Roster Alakazam.";
    },
    async ironCurse() {
      runToken({ tokenId: "iron-ball-curse", actorPlayerId: "steevee", tokenInventoryId: "steevee-iron", targetPokemonId: "gold-garchomp" });
      state.qaBrowserStep = 6;
      lastMessage = "Iron Ball Curse resolved on Gold's exact Active Roster Garchomp.";
    },
    async expireCurses() {
      controller.expireAtPhase({ series: "Kanto", gym: 3, phase: "action" });
      state.qaBrowserStep = 7;
      lastMessage = "The five phase-anchored Curses expired at Action Phase two Gyms later.";
    }
  };

  function nextAction() {
    const step = Number(state.qaBrowserStep || 0);
    if (scenarioId === "BROWSER-001") return [
      ["rage", "Use Rage Candy Bar"],
      ["restrict", "Use Restrict"],
      ["unban", "Use Unban"],
      ["retryProtected", "Try Protected Effects"]
    ][step] || null;
    if (scenarioId === "BROWSER-002") return [
      ["substituteRed", "Attach Red's Substitute"],
      ["substituteGold", "Attach Gold's Substitute"],
      ["extraBan", "Use Extra Ban on Red"],
      ["undoBan", "Undo Extra Ban"]
    ][step] || null;
    if (scenarioId === "BROWSER-003") {
      return [
        ["arena", "Use Arena Trap"],
        ["arenaCompensation", "Choose Recover for Red"],
        ["rageForClear", "Use Rage Candy Bar"],
        ["clear", "Use Clear Smog"]
      ][step] || null;
    }
    if (scenarioId === "BROWSER-005") return [
      ["wicked", "Use Wicked Blow"]
    ][step] || null;
    if (scenarioId === "BROWSER-006") return [
      ["flameCurse", "Use Flame Curse"],
      ["silencingCurse", "Use Silencing Curse"],
      ["repairSilencing", "Choose Two Moves"],
      ["imprisonCurse", "Use Imprison Curse"],
      ["toxicCurse", "Use Toxic Curse"],
      ["ironCurse", "Use Iron Ball Curse"],
      ["expireCurses", "Advance To Expiration"]
    ][step] || null;
    return [
      ["incinerate", "Use Incinerate"],
      ["steal", "Use Steal"]
    ][step] || null;
  }

  function resultRows() {
    const rows = [["Last result", lastMessage, "good", "last-result"]];
    if (scenarioId === "BROWSER-001") {
      rows.push(
        ["Gold's Garchomp", controller.battleLegality("gold-garchomp").legal ? "Legal" : "Illegal", "good", "gold-legality"],
        ["Red's Garchomp", controller.battleLegality("red-garchomp").legal ? "Legal" : "Illegal", "good", "red-legality"],
        ["Active Restrict", String(activeCount(effects.CONTROL_STATUS_TYPES.RESTRICT)), "good", "restrict-count"],
        ["Unban protection", String(activeCount(effects.CONTROL_STATUS_TYPES.UNBAN_PROTECTION)), "good", "unban-count"],
        ["Restrict retry", state.qaRetryResults?.restrict || "Not attempted", "good", "restrict-retry"],
        ["Extra Ban retry", state.qaRetryResults?.extraBan || "Not attempted", "good", "extra-ban-retry"]
      );
    } else if (scenarioId === "BROWSER-002") {
      rows.push(
        ["Red's Substitute", status(effects.CONTROL_STATUS_TYPES.SUBSTITUTE, "red-garchomp")?.status || "None", "good", "red-substitute"],
        ["Gold's Substitute", status(effects.CONTROL_STATUS_TYPES.SUBSTITUTE, "gold-garchomp")?.status || "None", "good", "gold-substitute"],
        ["Active species Ban", String(activeCount(effects.CONTROL_STATUS_TYPES.BAN)), "good", "ban-count"],
        ["Phase Ban protection", String(activeCount(effects.CONTROL_STATUS_TYPES.BAN_PHASE_PROTECTION)), "good", "phase-protection-count"]
      );
    } else if (scenarioId === "BROWSER-003") {
      const exactGrant = state.players.find((entry) => entry.id === "gold").moveAccessGrants.find((entry) => entry.id === "browser-exact-grant");
      const arenaStatus = status(effects.CONTROL_STATUS_TYPES.ARENA_TRAP, "red-garchomp");
      const redBuild = (state.teambuilder?.buildsByPlayerId?.red || []).find((entry) => (
        (entry.slots || []).some((slot) => slot?.pokemonRecordId === "red-garchomp")
      ));
      const redBattleTeam = state.battleTeams?.["Kanto:G1"]?.red;
      const arenaChoice = arenaStatus?.payload?.customization;
      const trappedSlot = redBuild?.slots?.find((slot) => slot?.pokemonRecordId === "red-garchomp");
      rows.push(
        ["Exact team accepted", controller.validateLockedTeam("red", ["red-garchomp"]).valid ? "Yes" : "Blocked", "good", "arena-exact"],
        ["Same-species replacement", controller.validateLockedTeam("red", ["red-garchomp-2"]).valid ? "Accepted" : "Rejected", "good", "arena-replacement"],
        ["Curse on trapped target", controller.validateCurseTarget("red-garchomp").ok ? "Allowed" : "Blocked", "good", "arena-curse"],
        ["Draft ownership", redBuild ? "Inserted" : "Missing", "good", "arena-draft-member"],
        ["Battle Team ownership", redBattleTeam?.selected?.includes("red-garchomp") ? "Inserted" : "Missing", "good", "arena-team-member"],
        ["Exact slot lock", arenaStatus?.payload?.teamSlotLock ? "Locked" : "Missing", "good", "arena-slot-lock"],
        ["Compensation", arenaChoice?.status === "completed" ? `${arenaChoice.kind === "move" ? "Move" : "Ability"}: ${arenaChoice.name}` : "Choice required", "good", "arena-compensation"],
        ["Generated set grant", trappedSlot?.moves?.includes("Recover") ? "Recover" : "Not selected", "good", "arena-custom-move"],
        ["Active Rage stat buffs", String(findPokemon("gold-garchomp").effectBuffs.filter((entry) => entry.status === "active").length), "good", "rage-buff-count"],
        ["Exact move grant", exactGrant?.status || "Not created", "good", "move-grant"],
        ["Restrict immunity", effects.pokemonHasRestrictImmunity(state, findPokemon("gold-garchomp"), { series: "Kanto", gym: 1, phase: "action" }) ? "Active" : "Inactive", "good", "rage-immunity"]
      );
    } else if (scenarioId === "BROWSER-004") {
      const goldLeftovers = state.players.find((entry) => entry.id === "gold").inventory.filter((entry) => entry.name === "Leftovers").length;
      const redLeftovers = state.players.find((entry) => entry.id === "red").inventory.filter((entry) => entry.name === "Leftovers").length;
      const redRecover = state.players.find((entry) => entry.id === "red").inventory.filter((entry) => entry.id === "red-recover").length;
      const steeveeLeftovers = state.players.find((entry) => entry.id === "steevee").inventory.filter((entry) => entry.name === "Leftovers").length;
      const redTeam = state.battleTeams?.["Kanto:G1"]?.red?.selected || [];
      const redBuild = state.teambuilder?.buildsByPlayerId?.red?.[0];
      rows.push(
        ["Gold Leftovers", String(goldLeftovers), "good", "gold-leftovers"],
        ["Red Leftovers", String(redLeftovers), "good", "red-leftovers"],
        ["Red Recover", String(redRecover), "good", "red-recover"],
        ["Steevee Leftovers", String(steeveeLeftovers), "good", "steevee-leftovers"],
        ["Destroy operations", String(state.effectOperations.filter((operation) => operation.operationType === "destroyInventoryResource").length), "good", "destroy-operations"],
        ["Lucario owner", state.players.find((entry) => entry.id === findPokemon("red-lucario")?.trainerId)?.name || "Unknown", "good", "lucario-owner"],
        ["Red Battle Team", redTeam.includes("red-lucario") ? "Still referenced" : "Reference removed", "good", "red-team-reference"],
        ["Red Teambuilder", redBuild?.slots?.some((slot) => slot?.pokemonRecordId === "red-lucario") ? "Still referenced" : "Reference removed", "good", "red-build-reference"],
        ["Transfer operations", String(state.effectOperations.filter((operation) => operation.operationType === "transferPokemonOwnership").length), "good", "transfer-operations"]
      );
    } else if (scenarioId === "BROWSER-005") {
      const rerolled = findPokemon("red-garchomp-2");
      const redTeam = state.battleTeams?.["Kanto:G1"]?.red;
      const redBuildSlot = state.teambuilder?.buildsByPlayerId?.red?.[0]?.slots?.find((slot) => slot?.pokemonRecordId === "red-garchomp-2");
      const rerollOperation = state.effectOperations.find((operation) => operation.operationType === "rerollPokemon");
      rows.push(
        ["Stable instance", rerolled?.id || "Missing", "good", "wicked-stable-id"],
        ["Roster species", rerolled?.name || "Missing", "good", "wicked-roster-species"],
        ["Battle Team membership", redTeam?.selected?.includes("red-garchomp-2") ? "Incorrectly added" : "Not added", "good", "wicked-team-membership"],
        ["Teambuilder species", redBuildSlot?.selectedBattleSpecies || "Missing", "good", "wicked-build-species"],
        ["Teambuilder moves", (redBuildSlot?.moves || []).filter(Boolean).length ? "Not reset" : "Reset", "good", "wicked-build-reset"],
        ["Reroll operations", String(state.effectOperations.filter((operation) => operation.operationType === "rerollPokemon").length), "good", "wicked-operation-count"],
        ["Tier roll", `${rerollOperation?.tierCalculation?.finalEvolutionTier || "Missing"} -> ${rerollOperation?.tierCalculation?.replacementTier || "Missing"}`, "good", "wicked-tier-roll"]
      );
    } else {
      const redBuild = state.teambuilder?.buildsByPlayerId?.red?.[0];
      const lucarioSlot = redBuild?.slots?.find((slot) => slot?.pokemonRecordId === "red-lucario");
      const silencedSlot = redBuild?.slots?.find((slot) => slot?.pokemonRecordId === "red-garchomp");
      const imprisonedSlot = redBuild?.slots?.find((slot) => slot?.pokemonRecordId === "red-garchomp-2");
      const activeStatuses = (state.lingeringStatuses || []).filter((entry) => entry.status === "active" && String(entry.type || "").startsWith("curse-"));
      const statusOptions = { state, series: state.series, gym: state.gym, phase: state.phase };
      const lucarioEffective = effects.applyStandardCurseSetOverrides(lucarioSlot, effects.standardCurseSetRules(activeStatuses.filter((entry) => effects.statusAffectsPokemon(entry, findPokemon("red-lucario"), statusOptions))));
      const imprisonedEffective = effects.applyStandardCurseSetOverrides(imprisonedSlot, effects.standardCurseSetRules(activeStatuses.filter((entry) => effects.statusAffectsPokemon(entry, findPokemon("red-garchomp-2"), statusOptions))));
      const silencing = status("curse-silencing", "red-garchomp");
      rows.push(
        ["Active standard Curses", String(activeStatuses.length), "good", "curse-active-count"],
        ["Configured Lucario item", lucarioSlot?.item || "Missing", "good", "curse-configured-item"],
        ["Effective Lucario item", lucarioEffective?.item || "Missing", "good", "curse-effective-item"],
        ["Silencing repair", state.teambuilder?.setRepairByStatusId?.[silencing?.id]?.status || "Not required", "good", "curse-silencing-repair"],
        ["Silenced move count", String((silencedSlot?.moves || []).filter(Boolean).length), "good", "curse-silenced-moves"],
        ["Configured Nature", imprisonedSlot?.nature || "Missing", "good", "curse-configured-nature"],
        ["Effective Nature", imprisonedEffective?.nature || "Neutral", "good", "curse-effective-nature"],
        ["Effective EV total", String(Object.values(imprisonedEffective?.evs || {}).reduce((sum, value) => sum + Number(value || 0), 0)), "good", "curse-effective-ev-total"]
      );
    }
    return rows;
  }

  function render() {
    document.getElementById("scenario-title").textContent = titles[scenarioId] || scenarioId;
    const next = nextAction();
    document.getElementById("situation-text").textContent = next ? lastMessage : `${lastMessage} Scenario complete.`;
    const actionBar = document.getElementById("action-bar");
    actionBar.replaceChildren();
    if (next) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "qa-button primary";
      button.dataset.action = next[0];
      button.textContent = next[1];
      actionBar.append(button);
    } else {
      const complete = document.createElement("strong");
      complete.textContent = "Scenario complete";
      actionBar.append(complete);
    }
    const restart = document.createElement("button");
    restart.type = "button";
    restart.className = "qa-button";
    restart.dataset.action = "restart";
    restart.textContent = "Restart Scenario";
    actionBar.append(restart);

    const resultGrid = document.getElementById("result-grid");
    resultGrid.replaceChildren(...resultRows().map(([label, value, tone, key]) => {
      const row = document.createElement("div");
      row.className = "result-row";
      const name = document.createElement("span");
      name.textContent = label;
      const output = document.createElement("output");
      output.textContent = value;
      output.dataset.tone = tone;
      output.dataset.check = key;
      row.append(name, output);
      return row;
    }));
    document.body.dataset.step = String(state.qaBrowserStep || 0);
    document.body.dataset.busy = "false";
  }

  async function reset() {
    const current = await requestState();
    version = Number(current.version || 0);
    state = fixture();
    makeController();
    await save();
    lastMessage = "Scenario reset to its isolated starting state.";
    render();
  }

  async function handleAction(action) {
    document.body.dataset.busy = "true";
    document.querySelectorAll("button").forEach((button) => { button.disabled = true; });
    if (action === "restart") return reset();
    await actions[action]();
    state = controller.getState();
    await save();
    render();
  }

  document.getElementById("action-bar").addEventListener("click", (event) => {
    const action = event.target.closest("[data-action]")?.dataset.action;
    if (!action) return;
    handleAction(action).catch(showError);
  });

  function showError(error) {
    console.error(error);
    document.body.dataset.busy = "false";
    const output = document.getElementById("qa-error");
    output.hidden = false;
    output.textContent = error?.stack || String(error);
  }

  async function init() {
    if (!effects || !controllerApi) throw new Error("Token QA dependencies did not load.");
    const payload = await requestState();
    version = Number(payload.version || 0);
    if (!payload.state || payload.state.marker !== `browser-token-qa:${scenarioId}`) {
      state = fixture();
      makeController();
      await save();
      lastMessage = "Scenario created in isolated backend state.";
    } else {
      state = payload.state;
      makeController();
      lastMessage = "Persisted scenario reloaded from the backend.";
      document.getElementById("save-state").textContent = `Reloaded revision ${version}`;
    }
    render();
  }

  init().catch(showError);
})();
