const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const source = fs.readFileSync(path.join(root, "app.js"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const header = html.slice(html.indexOf('id="gameClientHeader"'), html.indexOf('id="gameMenuOverlay"'));
const league = html.slice(html.indexOf('id="gameLeagueMenu"'), html.indexOf('class="game-header-actions"'));
const drawer = html.slice(html.indexOf('id="gameMenuOverlay"'), html.indexOf('id="siteShellModal"'));
const action = html.slice(html.indexOf('id="actionPhaseView"'), html.indexOf('id="leaderboardView"'));

test("gameplay ribbon renders six canonical destinations with full accessible names", () => {
  const destinations = [
    ["referee", "Live Referee"],
    ["actionPhase", "Action Phase"],
    ["teambuilder", "Team Builder"],
    ["sheet", "Player Sheet"],
    ["shop", "Shops"],
    ["battlePhase", "Battle Phase"]
  ];
  assert.equal((header.match(/data-game-ribbon=/g) || []).length, 6);
  for (const [id, label] of destinations) {
    assert.match(header, new RegExp(`data-game-ribbon="${id}"[\\s\\S]+?aria-label="${label}"`));
  }
  assert.match(header, /data-game-action="live-referee"/);
  assert.match(header, /data-page="actionPhase"/);
  assert.match(header, /data-game-view="teambuilder"/);
  assert.match(header, /data-game-view="sheet"/);
  assert.match(header, /data-game-view="shop"/);
  assert.match(header, /data-page="battlePhase"/);
});

test("active destination is canonical state with semantic current-page exposure", () => {
  assert.match(source, /function activeGameShellDestination\(\)/);
  assert.match(source, /state\.liveRefereeCollapsed === false/);
  assert.match(source, /state\.activityLogCollapsed === false/);
  assert.match(source, /button\.setAttribute\("aria-current", "page"\)/);
  assert.match(source, /button\.classList\.toggle\("active", active\)/);
});

test("one navigation helper owns URL history, direct links, refresh, and popstate", () => {
  assert.match(source, /function openGlobalGameDestination\(page, view = "", \{ updateHistory = true \} = \{\}\)/);
  assert.match(source, /function openGameShellAction\(action, \{ updateHistory = true \} = \{\}\)/);
  assert.match(source, /window\.history\[replace \? "replaceState" : "pushState"\]/);
  assert.match(source, /url\.searchParams\.set\("page", destination\)/);
  assert.match(source, /url\.searchParams\.set\("panel", view\)/);
  assert.match(source, /window\.addEventListener\("popstate"[\s\S]+applyGameClientRouteFromUrl\(\)/);
});

test("League menu contains only supported canonical informational destinations", () => {
  for (const destination of ["leaderboard", "mvpRace", "banlist", "history"]) {
    assert.match(league, new RegExp(`data-league-destination="${destination}"`));
  }
  for (const unsupported of ["typeStatistics", "pokemonUsage", "gymArchive", "seriesHistory", "gymRankings"]) {
    assert.doesNotMatch(league, new RegExp(unsupported, "i"));
  }
  assert.match(league, /Current Competition/);
  assert.match(league, /Records &amp; Reference/);
  assert.doesNotMatch(league, /<section>\s*<h2>[^<]+<\/h2>\s*<\/section>/);
});

test("League supports open state, outside click, Escape, focus restoration, and arrow navigation", () => {
  assert.match(header, /id="gameLeagueToggle"[\s\S]+aria-expanded="false"[\s\S]+aria-haspopup="menu"/);
  assert.match(source, /function openGameLeagueMenu\(\)/);
  assert.match(source, /function closeGameLeagueMenu\(\{ restoreFocus = true \} = \{\}\)/);
  assert.match(source, /!event\.target\.closest\("\.game-header-navigation"\)\) closeGameLeagueMenu\(\)/);
  assert.match(source, /gameLeagueOpen && event\.key === "Escape"/);
  assert.match(source, /gameLeaguePreviousFocus \|\| els\.gameLeagueToggle/);
  assert.match(source, /\["ArrowDown", "ArrowUp", "Home", "End"\]/);
});

test("League and utility Menu enforce one open overlay", () => {
  assert.match(source, /function openGameMenu\(\)[\s\S]+closeGameLeagueMenu\(\{ restoreFocus: false \}\)/);
  assert.match(source, /function openGameLeagueMenu\(\)[\s\S]+closeGameMenu\(\{ restoreFocus: false \}\)/);
  assert.match(source, /gameHeaderGameToggle[\s\S]+closeGameLeagueMenu\(\{ restoreFocus: false \}\)/);
});

test("utility drawer has no gameplay or League destination duplication", () => {
  assert.doesNotMatch(drawer, /data-game-ribbon|data-league-destination|data-game-page|data-game-action|data-page=/);
  for (const destination of ["Return to Games", "Rules", "View Profile", "Edit Profile", "Preferences", "Administration"]) {
    assert.match(drawer, new RegExp(destination));
  }
});

test("theme controls live in Preferences and retain canonical persistence", () => {
  assert.match(drawer, /class="game-menu-preferences"[\s\S]+id="globalThemeToggle"[\s\S]+id="globalThemeMenu"/);
  assert.doesNotMatch(action, /globalThemeToggle|globalThemeMenu|top-theme-control/);
  assert.match(source, /function renderGlobalThemeMenu\(player\)[\s\S]+player\.theme = id;[\s\S]+saveState\(\);/);
});

test("global header retains agenda, phase advance, and DEMO behavior", () => {
  for (const id of ["actionDemoBadge", "actionDemoNotice", "phaseAgendaToggle", "advancePhase"]) {
    assert.match(header, new RegExp(`id="${id}"`));
    assert.doesNotMatch(action, new RegExp(`id="${id}"`));
  }
  assert.match(action, /id="actionCommandRemaining"/);
  assert.doesNotMatch(action, /action-phase-command/);
  assert.match(header, /onclick="advancePhase\(\)"/);
  assert.match(source, /phaseAgendaToggle\.addEventListener\("click"/);
});

test("responsive shell keeps desktop one-row and mobile continuous two-row navigation", () => {
  assert.match(css, /--game-header-height:\s*68px/);
  assert.match(css, /grid-template-columns:\s*minmax\(190px, \.8fr\) minmax\(460px, 1\.7fr\) minmax\(190px, \.8fr\)/);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]+grid-template-areas:[\s\S]+"identity actions"[\s\S]+"ribbon ribbon"/);
  assert.match(css, /\.gameplay-ribbon-scroll[\s\S]+overflow-x:\s*auto/);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]+\.game-league-menu[\s\S]+position:\s*fixed[\s\S]+width:\s*100vw/);
});

test("ribbon keyboard navigation supports arrows, Home, and End", () => {
  assert.match(source, /gameplayRibbon\?\.addEventListener\("keydown"/);
  assert.match(source, /\["ArrowLeft", "ArrowRight", "Home", "End"\]/);
  assert.match(source, /items\[nextIndex\]\?\.focus\(\)/);
});

test("viewed trainer remains independent from account and current game", () => {
  assert.match(source, /const user = activeSiteUser\(\)/);
  assert.match(source, /const gameLabel = globalShellGameLabel\(\)/);
  assert.match(source, /state\.players\?\.find\(\(player\) => player\.id === state\.activePlayerId\)/);
  assert.match(source, /switchActivePlayer\(option\.dataset\.gameHeaderPlayer/);
});
