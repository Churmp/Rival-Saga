const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const source = fs.readFileSync(path.join(root, "app.js"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const header = html.slice(html.indexOf('id="gameClientHeader"'), html.indexOf('id="gameMenuOverlay"'));
const drawer = html.slice(html.indexOf('id="gameMenuOverlay"'), html.indexOf('id="siteShellModal"'));
const action = html.slice(html.indexOf('id="actionPhaseView"'), html.indexOf('id="leaderboardView"'));

test("outside-game platform shell and dedicated game header are separate", () => {
  assert.match(html, /id="globalAppShell"[\s\S]+id="siteShellModal"/);
  assert.match(html, /id="gameClientHeader" class="game-client-header"/);
  assert.match(css, /body\.site-game-active \.global-app-shell\s*\{\s*display:\s*none/);
  assert.match(css, /body\.site-game-active \.game-client-header\s*\{[\s\S]+display:\s*grid/);
  assert.doesNotMatch(html, /id="gameInstanceNav"/);
});

test("game header exposes identity, gameplay ribbon, League, trainer, and Menu", () => {
  for (const id of ["gameHeaderGameName", "gameHeaderContext", "gameplayRibbon", "gameLeagueToggle", "gameHeaderTrainerName", "gameSaveStatus", "liveRefereeLauncher", "gameMenuToggle"]) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.equal((html.match(/id="gameClientHeader"/g) || []).length, 1);
  assert.doesNotMatch(html, /id="gameHeaderDestination"/);
  assert.doesNotMatch(header, /data-game-ribbon="referee"/);
  assert.match(header, /id="liveRefereeLauncher"[\s\S]+data-game-action="live-referee"/);
  assert.match(source, /function activeGameShellDestination\(/);
  assert.match(source, /gameHeaderContext\.textContent = `\$\{state\.series\} · Gym \$\{state\.gym\}`/);
});

test("utility drawer keeps website, Preferences, administration, and account controls only", () => {
  for (const section of ["games", "rulebook", "profiles"]) {
    assert.match(drawer, new RegExp(`data-global-shell-section="${section}"`));
  }
  assert.match(drawer, /<h3>Preferences<\/h3>/);
  assert.match(drawer, /id="globalThemeToggle"/);
  assert.match(drawer, /id="gameMenuAdminSection"/);
  assert.doesNotMatch(drawer, /data-game-page|data-game-action|data-page=/);
});

test("drawer supports click-outside, Escape, focus trap, and focus restoration", () => {
  assert.match(source, /if \(event\.target === els\.gameMenuOverlay\) closeGameMenu\(\)/);
  assert.match(source, /gameMenuOpen && event\.key === "Escape"/);
  assert.match(source, /gameMenuOpen && event\.key === "Tab"/);
  assert.match(source, /gameMenuPreviousFocus \|\| els\.gameMenuToggle/);
});

test("activity log drawer always has a lightweight close path", () => {
  assert.match(source, /els\.activityLogTab\.textContent = logClosed \? \(visibleLogCount \? `Log \$\{visibleLogCount\}` : "Log"\) : "Close Log"/);
  assert.match(source, /state\.activityLogCollapsed = state\.activityLogCollapsed === false/);
  assert.match(source, /els\.toggleActivityLog\.addEventListener\("click"[\s\S]+saveClientUiState\(\);[\s\S]+els\.activityLogTab\.addEventListener/);
  assert.match(css, /\.details-column\.drawer-open \.activity-log-tab\s*\{[\s\S]+pointer-events:\s*auto;/);
});

test("V1 side drawers are present for their existing toggle logic", () => {
  assert.match(html, /<aside id="activityResponseColumn" class="activity-response-column">/);
  assert.match(html, /<aside id="opponentDrawerColumn" class="opponent-drawer-column">/);
  assert.doesNotMatch(html, /id="activityResponseTab"/);
  assert.doesNotMatch(html, /id="opponentDrawerTab"/);
  assert.match(source, /activityResponseColumn\?\.classList\.toggle\("drawer-open", open\)/);
  assert.match(source, /opponentDrawerColumn\.classList\.toggle\("drawer-open", open\)/);
});

test("account, game, and viewed-player context remain independent", () => {
  assert.match(source, /const user = activeSiteUser\(\)/);
  assert.match(source, /const gameLabel = globalShellGameLabel\(\)/);
  assert.match(source, /state\.players\?\.find\(\(player\) => player\.id === state\.activePlayerId\)/);
  assert.match(source, /switchActivePlayer\(option\.dataset\.gameHeaderPlayer/);
  assert.match(source, /saveClientUiState\(\);\s*\n\s*render\(\);/);
});

test("game and site administration remain separately permission gated", () => {
  assert.match(source, /const gameAdminAccess = hasSiteAdminAccess\(\)/);
  assert.match(source, /const siteAdminAccess = siteUserIsSiteAdmin\(\)/);
  assert.match(source, /gameMenuGameAdmin\.hidden = !gameAdminAccess/);
  assert.match(source, /gameMenuSiteAdmin\.hidden = !siteAdminAccess/);
});

test("game header owns agenda and phase advance controls", () => {
  for (const id of ["phaseAgendaToggle", "advancePhase"]) {
    assert.match(header, new RegExp(`id="${id}"`));
    assert.doesNotMatch(action, new RegExp(`id="${id}"`));
    assert.equal((html.match(new RegExp(`id="${id}"`, "g")) || []).length, 1);
  }
  assert.match(header, /onclick="advancePhase\(\)"/);
  assert.match(source, /phaseReminderText\.textContent = `Agenda \$\{agenda\.items\.length\}`/);
  assert.match(source, /els\.advancePhase\.textContent = compactPhaseAdvanceLabel\(target\)/);
  assert.match(source, /"Start Battle Phase": "Battle Phase ->"/);
  assert.doesNotMatch(action, /id="globalThemeToggle"/);
  assert.doesNotMatch(html, /<header class="topbar"/);
  assert.doesNotMatch(action, /action-phase-command/);
});

test("demo mode uses a conditional compact global badge and popover", () => {
  assert.match(header, /id="actionDemoBadge" class="game-header-demo-badge"/);
  assert.match(header, /id="actionDemoNotice" class="game-header-demo-popover hidden"/);
  assert.doesNotMatch(action, /id="actionDemoBadge"|id="actionDemoNotice"|id="actionToggleDemoMode"/);
  assert.match(source, /actionDemoBadge\?\.classList\.toggle\("active", freeTestingMode\)/);
  assert.doesNotMatch(html, /id="freeTestingBanner"/);
});

test("direct routes and refresh retain game and destination query contracts", () => {
  assert.match(source, /new URLSearchParams\(window\.location\.search\)\.get\(SITE_VIEW_PARAM\)/);
  assert.match(source, /url\.searchParams\.set\("game", safeGame\)/);
  assert.match(source, /url\.searchParams\.set\(SITE_VIEW_PARAM, "game"\)/);
  assert.match(source, /url\.searchParams\.set\("page", destination\)/);
  assert.match(source, /window\.addEventListener\("popstate"/);
  assert.match(source, /async function bootGameExperience\(\)/);
  assert.match(source, /applyGameClientRouteFromUrl\(\);\s*\n\s*setGameHydrationState\("loading"\);/);
  assert.match(source, /setupBackendSync\(\{ renderAfter: false \}\)/);
});

test("authoritative hydration masks the empty shell and provides recovery", () => {
  for (const id of ["gameHydrationScreen", "gameHydrationTitle", "gameHydrationDetail", "gameHydrationRetry"]) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.match(css, /\.game-hydration-screen\s*\{[\s\S]+position:\s*fixed/);
  assert.match(source, /setGameHydrationState\("ready"\)/);
  assert.match(source, /setGameHydrationState\("failed"\)/);
  assert.doesNotMatch(source, /setupBackendSync\(\{ renderAfter: true \}\);\s*\n\s*loadSiteShellData\(\);\s*\n\s*enterGameExperience/);
});

test("backend saves are sequenced, versioned, visible, and guarded on unload", () => {
  const serverSource = fs.readFileSync(path.join(root, "server.js"), "utf8");
  assert.match(source, /stateSaveInFlight/);
  assert.match(source, /saveRequestedRevision/);
  assert.match(source, /expectedVersion,\s*\n\s*state: createPersistableStateSnapshot\(state\)/);
  assert.match(source, /setBackendSaveStatus\("conflict"/);
  assert.match(source, /backendStateSaveIsDirty\(\)/);
  assert.match(source, /backendStateSaveHasUnresolvedConflict\(\)/);
  assert.match(source, /ensureBackendStateSavedBeforeAuthoritativeMutation\(\)/);
  assert.match(source, /markBackendRemoteConflict\("Another client advanced Action Phase timing/);
  assert.match(source, /event\.returnValue = ""/);
  assert.match(serverSource, /const maxBodyBytes = 96 \* 1024 \* 1024/);
  assert.match(serverSource, /fs\.writeFileSync\(tmp, JSON\.stringify\(record\)\)/);
});

test("legacy save compaction is shared and persisted through the versioned save queue", () => {
  assert.match(html, /save-compaction\.js\?v=\d+/);
  assert.ok(html.indexOf("save-compaction.js") < html.indexOf("app.js"));
  assert.match(source, /const saveCompactionRuntime = globalThis\.rivalSagaSaveCompaction/);
  assert.match(source, /backendSync\.pendingStorageCompaction = Boolean\(payload\.storageCompacted\)/);
  assert.match(source, /if \(loaded && backendSync\.pendingStorageCompaction\)[\s\S]*await saveState\(\{ immediate: true, immediateBackend: true \}\)/);
  assert.match(source, /saveCompactionRuntime\.compactUndoSnapshots\(state\)/);
});

test("desktop and narrow layouts keep one continuous responsive shell", () => {
  assert.match(css, /--game-header-height:\s*68px/);
  assert.match(css, /\.game-menu-drawer[\s\S]+width:\s*min\(360px/);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]+--game-header-height:\s*112px/);
  assert.match(css, /\.gameplay-ribbon-scroll[\s\S]+overflow-x:\s*auto/);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]+\.game-menu-drawer[\s\S]+width:\s*min\(100vw, 520px\)/);
});
