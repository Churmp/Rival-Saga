(function initEncounterTokenRuntime(root, factory) {
  const runtime = factory();
  if (typeof module === "object" && module.exports) module.exports = runtime;
  if (root) root.rivalSagaEncounterTokenRuntime = runtime;
})(typeof globalThis !== "undefined" ? globalThis : this, function createEncounterTokenRuntime() {
  "use strict";

  function phaseFor(state = {}) {
    const series = String(state.series || "");
    const gym = Number(state.gym || 1);
    return String(state.phaseState?.[`${series}:G${gym}`]?.currentPhase
      || state.phaseState?.[`${series}-G${gym}`]?.currentPhase
      || state.currentPhase
      || "");
  }

  function activeSessionForPlayer(state = {}, playerId = "") {
    return (state.encounterSessions || []).find((session) => session.playerId === playerId
      && session.series === state.series
      && Number(session.gym) === Number(state.gym)
      && ["pending", "review"].includes(session.status)) || null;
  }

  function validateExtraEncounter(state = {}, input = {}, options = {}) {
    const playerId = String(input.playerId || "");
    const player = (state.players || []).find((entry) => entry.id === playerId) || null;
    const wheel = options.wheelDefinition || null;
    if (phaseFor(state) !== "action") return { ok: false, reason: "Extra Encounter is only legal during Action Phase." };
    if (!player) return { ok: false, reason: "The selected player no longer exists." };
    if (!wheel?.id || !Array.isArray(wheel.entries) || !wheel.entries.length) {
      return { ok: false, reason: "No Encounter Wheel is available for the current Series and Gym." };
    }
    return { ok: true, player, wheel };
  }

  function grantExtraEncounter(state = {}, input = {}, options = {}) {
    const validation = validateExtraEncounter(state, input, options);
    if (!validation.ok) return validation;
    const now = String(options.now || new Date().toISOString());
    const sourceTokenId = String(input.sourceTokenId || "");
    const sourceActivationId = String(input.sourceActivationId || sourceTokenId || "");
    const existingGrant = (state.encounterSessions || []).flatMap((session) => session.extraEncounterGrants || [])
      .find((grant) => (sourceActivationId && grant.sourceActivationId === sourceActivationId)
        || (sourceTokenId && grant.sourceTokenId === sourceTokenId));
    if (existingGrant) {
      const session = (state.encounterSessions || []).find((entry) => entry.id === existingGrant.encounterSessionId) || null;
      return { ok: true, duplicate: true, created: false, session, grant: existingGrant };
    }

    state.encounterSessions ||= [];
    let session = activeSessionForPlayer(state, validation.player.id);
    const created = !session;
    if (!session) {
      const sessionId = String(options.sessionId || `extra-encounter-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`);
      session = {
        id: sessionId,
        playerId: validation.player.id,
        series: state.series,
        gym: Number(state.gym || 1),
        phase: "action",
        actionVisitId: "",
        actionVisitIds: [],
        wheelId: validation.wheel.id,
        maxRolls: 0,
        includeFishing: false,
        includeSurf: false,
        removedEntryIds: [],
        temporaryEntries: [],
        weightOverrides: {},
        resultSessionIds: [],
        rolls: [],
        status: "pending",
        visualRotation: 0,
        sourceType: "extra-encounter-token",
        createdAt: now
      };
      state.encounterSessions.unshift(session);
    }

    session.maxRolls = Math.max(Number(session.maxRolls || 0), (session.rolls || []).length) + 1;
    session.status = "pending";
    session.updatedAt = now;
    session.extraEncounterGrants ||= [];
    const grant = {
      id: String(options.grantId || `extra-encounter-grant-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`),
      encounterSessionId: session.id,
      playerId: validation.player.id,
      sourceTokenId,
      sourceActivationId,
      rollsGranted: 1,
      createdAt: now
    };
    session.extraEncounterGrants.push(grant);
    return { ok: true, duplicate: false, created, session, grant };
  }

  return Object.freeze({
    phaseFor,
    activeSessionForPlayer,
    validateExtraEncounter,
    grantExtraEncounter
  });
});
