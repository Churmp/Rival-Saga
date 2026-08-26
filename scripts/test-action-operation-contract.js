const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const appSource = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
const cssSource = fs.readFileSync(path.join(__dirname, "..", "styles.css"), "utf8");
const htmlSource = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");

test("all Action visit commits use the shared operation entry point", () => {
  assert.equal((appSource.match(/actionVisitsForPlayer\([^\n]+\)\.push\(visit\)/g) || []).length, 0);
  assert.match(appSource, /function commitActionVisit\(visit\)/);
  assert.match(appSource, /function completeActionOperationForVisit\(visitId/);
});

test("required completion hooks and bounded picker layout are wired", () => {
  for (const hook of [
    "silph-co-choice-complete", "bulletin-quests-confirmed",
    "wheel-session-closed", "dragons-den-placement-complete"
  ]) assert.match(appSource, new RegExp(hook));
  assert.match(cssSource, /\.live-referee-picker-scroll\s*\{[^}]*min-height:\s*0;[^}]*overflow-y:\s*auto;/s);
  assert.match(cssSource, /\.live-referee-stage \.live-referee-tokens-screen\s*\{[^}]*overflow:\s*hidden;/s);
});


test("backend mutation tracking acknowledges versions before full-state saves continue", () => {
  assert.match(appSource, /const payload = await response\.clone\(\)\.json\(\)\.catch\(\(\) => null\);/);
  assert.match(appSource, /backendSync\.version = Math\.max\(Number\(backendSync\.version \|\| 0\), acknowledgedVersion\);/);
  assert.match(appSource, /while \(backendSync\.pendingGameplayWrites\.size\)/);
  assert.match(appSource, /startsWith\("action-destination-"\)[\s\S]*Number\(payload\.version \|\| 0\) <= Number\(backendSync\.version \|\| 0\)/);
});

test("manual location completion uses the compact authoritative command", () => {
  assert.match(appSource, /async function finishCurrentActionOperation\(\)/);
  assert.match(appSource, /action-destination-commits\/\$\{encodeURIComponent\(commit\.id\)\}\/complete/);
  assert.match(appSource, /operationId: operation\.id/);
});

test("phase advancement is blocked while a current Action operation is unresolved", () => {
  assert.match(appSource, /function phaseAdvanceBlockedByActionOperation\(target = nextPhaseTarget\(\)\)/);
  assert.match(appSource, /const operation = currentActionOperation\(\)/);
  assert.match(appSource, /Finish or undo that Action before advancing phases\./);
  assert.match(appSource, /function openPhaseAdvanceConfirm\(\)[\s\S]*phaseAdvanceBlockedByActionOperation\(pendingPhaseAdvance\)/);
  assert.match(appSource, /async function confirmPhaseAdvance[\s\S]*phaseAdvanceBlockedByActionOperation\(target\)/);
  assert.match(appSource, /if \(blockedReason\) \{[\s\S]*alert\(blockedReason\);[\s\S]*return;/);
});

test("legacy Game Corner Tickets fall back to their name for tier detection", () => {
  assert.match(appSource, /for \(const candidate of \[item\?\.gameCornerTierId, item\?\.gameCornerTier, item\?\.name, item\?\.tier\]\)/);
  assert.match(appSource, /counts\[definition\.gameCornerTierId\]/);
  assert.match(appSource, /service\.disabled && service\.disabledReason/);
});

test("Game Corner tickets expose inline Pokemon result controls", () => {
  assert.match(appSource, /function renderGameCornerTicketResultPanel\(player, session\)/);
  assert.match(appSource, /sourceType === "game-corner-token"/);
  assert.match(appSource, /Ticket Pokemon Wheel/);
  assert.match(appSource, /data-confirm-random-pokemon/);
  assert.match(appSource, /data-reroll-random-pokemon/);
  assert.match(appSource, /data-cancel-random-pokemon/);
  assert.match(cssSource, /\.gc-ticket-result-panel/);
});

test("Game Corner result resolutions stay attached to their parent undo", () => {
  assert.match(appSource, /gameCornerSessionId: session\.gameCornerSessionId \|\| ""/);
  assert.match(appSource, /actionVisitId: session\.actionVisitId \|\| ""/);
  assert.match(appSource, /linkedEventId: activity\.id \|\| ""/);
  assert.match(appSource, /randomPokemonSessionId: activity\.payload\?\.randomPokemonSessionId \|\| ""/);
  assert.match(appSource, /gameCornerSessionId: activity\.payload\?\.gameCornerSessionId \|\| ""/);
  assert.match(appSource, /linkedInteractionIds\.has\(entry\.linkedEventId\)/);
  assert.match(appSource, /entry\.type === "interaction-resolution" && linkedInteractionTitles\.has/);
});


test("accepted destination reservations continue into their exact local starter", () => {
  assert.match(appSource, /function matchingAcceptedActionDestination\(\{ playerId = "", locationId = "", serviceId = "" \} = \{\}\)/);
  assert.match(appSource, /function createLocationActionVisit[\s\S]*matchingAcceptedActionDestination\(\{ playerId: player\.id, locationId: location\.id, serviceId \}\)/);
  assert.match(appSource, /function createGameCornerActionSession[\s\S]*matchingAcceptedActionDestination\(\{ playerId: player\.id, locationId: location\.id, serviceId: service\.id \}\)/);
  assert.match(appSource, /async function persistStartedActionDestination\(\)/);
  assert.match(appSource, /saveState\(\);[\s\S]*await persistStartedActionDestination\(\);[\s\S]*render\(\);/);
});

test("stale destination reservations are repaired when their visit flow is gone", () => {
  assert.match(appSource, /function staleActionDestinationCommit\(gymState = \{\}\)/);
  assert.match(appSource, /ACTION_DESTINATION_START_GRACE_MS/);
  assert.match(appSource, /DESTINATION_STATES\.COMPLETED/);
  assert.match(appSource, /Date\.now\(\) - acceptedMs > ACTION_DESTINATION_START_GRACE_MS/);
  assert.match(appSource, /if \(staleActionDestinationCommit\(gymState\)\) \{[\s\S]*gymState\.destinationCommit = null;/);
  assert.match(appSource, /if \(staleLocationId && gymState\.selectedLocationId === staleLocationId\) gymState\.selectedLocationId = "";/);
  assert.match(appSource, /actionPhaseStateRepairQueued = true;/);
  assert.match(appSource, /if \(actionPhaseStateRepairQueued && !backendSync\.applyingRemote[\s\S]+saveState\(\{ immediate: true, immediateBackend: true \}\);/);
  assert.match(appSource, /if \(!operation\) return true;/);
  assert.match(appSource, /return !isActiveActionVisit\(visit\);/);
});

test("undoing an Action visit clears its linked operation and destination", () => {
  assert.match(appSource, /function clearActionOperationForUndoneVisit\(visitId/);
  assert.match(appSource, /gymState\.actionOperations = \(gymState\.actionOperations \|\| \[\]\)\.filter/);
  assert.match(appSource, /removedOperationIds\.has\(gymState\.activeActionOperationId\)/);
  assert.match(appSource, /removedOperationIds\.has\(commit\.operationId\)/);
  assert.match(appSource, /clearActionOperationForUndoneVisit\(undoData\.visitId, undoData\.playerId, undoData\.series, undoData\.gym\);/);
});

test("Action Phase Demo Mode controls and player switching are wired", () => {
  assert.match(htmlSource, /id="actionDemoStatus"/);
  assert.match(htmlSource, /id="actionToggleDemoMode"/);
  assert.match(appSource, /function renderActionDemoControls\(\)/);
  assert.match(appSource, /data-action-player-id=/);
  assert.match(appSource, /setTestingToolsState\(\{ controlledPlayerId: playerId \}\)/);
  assert.match(cssSource, /\.game-header-demo-popover\s*\{/);
  assert.match(cssSource, /\.action-turn-chip\.selectable/);
});
