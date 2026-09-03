const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const projectRoot = path.resolve(__dirname, "..");
const appJs = fs.readFileSync(path.join(projectRoot, "app.js"), "utf8");
const indexHtml = fs.readFileSync(path.join(projectRoot, "index.html"), "utf8");
const cssSource = fs.readFileSync(path.join(projectRoot, "styles.css"), "utf8");
const actionDestinationBarCss = fs.readFileSync(path.join(projectRoot, "ui", "action-destination-bar.css"), "utf8");
const actionPhaseShellCss = fs.readFileSync(path.join(projectRoot, "ui", "action-phase-shell.css"), "utf8");
const presentationCss = `${cssSource}\n${actionDestinationBarCss}\n${actionPhaseShellCss}`;
const actionMarkup = indexHtml.slice(indexHtml.indexOf('id="actionPhaseView"'), indexHtml.indexOf('id="leaderboardView"'));

function functionBody(name) {
  const start = appJs.indexOf(`function ${name}(`);
  assert.notEqual(start, -1, `${name} should exist`);
  const argsStart = appJs.indexOf("(", start);
  let parenDepth = 0;
  let argsEnd = -1;
  for (let index = argsStart; index < appJs.length; index += 1) {
    if (appJs[index] === "(") parenDepth += 1;
    if (appJs[index] === ")") parenDepth -= 1;
    if (parenDepth === 0) {
      argsEnd = index;
      break;
    }
  }
  assert.notEqual(argsEnd, -1, `${name} arguments should close`);
  const bodyStart = appJs.indexOf("{", argsEnd);
  let depth = 0;
  for (let index = bodyStart; index < appJs.length; index += 1) {
    if (appJs[index] === "{") depth += 1;
    if (appJs[index] === "}") depth -= 1;
    if (depth === 0) return appJs.slice(bodyStart + 1, index);
  }
  throw new Error(`${name} body was not closed`);
}

function cssRule(selector) {
  const start = presentationCss.indexOf(selector);
  assert.notEqual(start, -1, `${selector} should exist`);
  const bodyStart = presentationCss.indexOf("{", start);
  const bodyEnd = presentationCss.indexOf("}", bodyStart);
  assert.notEqual(bodyStart, -1, `${selector} should have a body`);
  assert.notEqual(bodyEnd, -1, `${selector} body should close`);
  return presentationCss.slice(bodyStart + 1, bodyEnd);
}

function exactCssRule(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = presentationCss.match(new RegExp(`(?:^|\\n)${escaped}\\s*\\{([\\s\\S]*?)\\n\\}`));
  assert.ok(match, `${selector} should exist as a standalone rule`);
  return match[1];
}

test("Action Phase body uses compact status and Action Workspace instead of trainer profile card", () => {
  assert.doesNotMatch(actionMarkup, /actionPhaseTrainerCardSlot/);
  assert.match(actionMarkup, /class="action-compact-hud"/);
  assert.match(actionMarkup, /class="action-inline-status"/);
  assert.match(actionMarkup, /id="actionPhaseBalance"/);
  assert.match(actionMarkup, /id="actionPlayersToggle"/);
  assert.match(actionMarkup, /id="actionTurnSummary"/);
  assert.match(actionMarkup, /id="actionTurnRail"/);
  assert.match(actionMarkup, /id="actionPhaseAlerts"/);
  assert.match(actionMarkup, /class="action-workspace"/);
  assert.match(actionMarkup, /id="actionLocationBoard"/);
  assert.match(actionMarkup, /id="actionLocationMeta"/);
  assert.doesNotMatch(actionMarkup, /Selected Trainer/);
  assert.doesNotMatch(actionMarkup, /Location Board/);
  assert.doesNotMatch(actionMarkup, /Location Details/);
  assert.doesNotMatch(actionMarkup, /action-phase-command/);
  assert.doesNotMatch(actionMarkup, /action-phase-brief/);
});

test("shared trainer profile card is only placed on the Player Sheet body", () => {
  const body = functionBody("placeSharedTrainerCard");
  assert.match(body, /activePage === "playerHub" && activeView === "sheet"/);
  assert.match(body, /els\.playerHubTrainerCardSlot/);
  assert.doesNotMatch(body, /actionPhase/);
  assert.doesNotMatch(body, /battlePhase/);
});

test("root Action Workspace menu renders selectable cards for the supplied action list", () => {
  const rootMenu = functionBody("renderActionWorkspaceRootMenu");
  assert.match(rootMenu, /locationId/);
  assert.match(rootMenu, /action-menu-card/);
  assert.doesNotMatch(rootMenu, /v2/);
});

test("Action Phase delegates directly to the current Route workspace", () => {
  const renderBody = functionBody("renderActionPhase");
  assert.match(renderBody, /^\s*renderV2RouteActionPhase\(\);\s*$/);
  assert.doesNotMatch(renderBody, /currentActionOperation\(\)/);
  assert.doesNotMatch(renderBody, /renderActionWorkspaceRootMenu/);
  assert.doesNotMatch(renderBody, /workspaceIsResolvingOperation/);
});

test("V2 Action Workspace mounts a persistent destination shell", () => {
  const renderBody = functionBody("renderV2RouteActionPhase");
  const shellBody = functionBody("renderV2ActionDestinationShell");
  const navigatorBody = functionBody("renderV2ActionDestinationNavigator");
  assert.match(renderBody, /v2SelectedActionDestination\(seriesId\)/);
  assert.match(renderBody, /renderV2ActionDestinationShell\(\{/);
  assert.match(renderBody, /workspaceHtml: renderV2ActionDestinationWorkspace\(activeDestinationId, routeState, workspace, player, remaining, routeBlockedReason, latestAction, latestResult/);
  assert.match(renderBody, /const forceRoutesLanding = activeDestinationId === "routes"/);
  assert.match(renderBody, /action-location-board v2-action-phase-screen/);
  assert.match(shellBody, /data-v2-action-destination-workspace/);
  assert.match(shellBody, /class="\$\{escapeHtml\(workspaceClass\)\}"/);
  assert.match(shellBody, /v2ActionDestinationStageStyle\(activeDestinationId\)/);
  assert.match(shellBody, /renderV2ActionDestinationNavigator\(selectedDestinationId, activeDestinationId, actionStatus\)/);
  assert.doesNotMatch(shellBody, /data-v2-action-destination-panel/);
  assert.match(navigatorBody, /V2_ACTION_DESTINATIONS\.map/);
  assert.match(navigatorBody, /data-v2-action-destination-shell/);
  assert.match(navigatorBody, /data-v2-action-destination-selected/);
  assert.match(navigatorBody, /data-v2-action-destination-preview/);
  assert.match(navigatorBody, /class="v2-action-destination-shell action-nav"/);
  assert.match(navigatorBody, /class="topline"/);
  assert.match(navigatorBody, /class="v2-action-destination-grid grid"/);
  assert.match(navigatorBody, /class="v2-action-destination-card slot s\$\{slotNumber\}/);
  assert.match(navigatorBody, /class="num"/);
  assert.match(navigatorBody, /class="mark"/);
  assert.match(navigatorBody, /class="name"/);
  assert.match(navigatorBody, /class="tiny"/);
  assert.match(navigatorBody, /data-v2-action-destination-select/);
  assert.match(navigatorBody, /data-v2-action-destination-navigator/);
  assert.doesNotMatch(navigatorBody, /class="[^"]*v2-action-destination-(navigator|slot|button|header|symbol|number|copy)/);
  assert.doesNotMatch(navigatorBody, /data-v2-action-preview-bar/);
  assert.match(navigatorBody, /data-v2-action-destination-bonus-granted/);
  assert.match(navigatorBody, /destination\.bonus/);
  assert.match(appJs, /const V2_ACTION_STANDARD_DESTINATIONS = Object\.freeze/);
  assert.match(appJs, /const V2_ACTION_BONUS_DESTINATION = Object\.freeze/);
  assert.match(appJs, /const V2_ACTION_DESTINATIONS = Object\.freeze\(\[\.\.\.V2_ACTION_STANDARD_DESTINATIONS, V2_ACTION_BONUS_DESTINATION\]\)/);
  assert.match(appJs, /id: "routes"/);
  assert.match(appJs, /id: "battle-tent"/);
  assert.match(appJs, /label: "Battle Frontier"/);
  assert.match(appJs, /label: "Department Store"/);
  assert.match(appJs, /label: "Game Corner"/);
  assert.match(appJs, /label: "Graveyard"/);
  assert.match(appJs, /label: "Ranger Base"/);
  assert.match(appJs, /label: "Pokémon Center"/);
  assert.match(appJs, /label: "Bulletin Board"/);
  assert.match(appJs, /ctaLabel: "Enter Department Store"/);
  assert.match(appJs, /ctaLabel: "Enter Game Corner"/);
  assert.match(appJs, /ctaLabel: "Enter Graveyard"/);
  assert.match(appJs, /ctaLabel: "Enter Ranger Base"/);
  assert.match(appJs, /ctaLabel: "Enter Pokémon Center"/);
  assert.match(appJs, /ctaLabel: "View Bulletin Board"/);
  assert.match(functionBody("v2ActionDestinationStageClass"), /destination\.plateClass \|\| destination\.id/);
  const destinationConfig = appJs.slice(appJs.indexOf("const V2_ACTION_STANDARD_DESTINATIONS"), appJs.indexOf("const V2_ACTION_BONUS_DESTINATION"));
  assert.doesNotMatch(destinationConfig, /label: "Day Care"|label: "Silph Co\. R&D"|label: "Dragon's Den"|id: "pc"|Hidden Grotto/);
  assert.doesNotMatch(appJs, /const V2_ACTION_PREVIEW_STANDARD_SLOTS/);
  assert.doesNotMatch(appJs, /id: "move"|id: "search"|id: "engage"|id: "rest"|id: "interact"|id: "scout"|id: "explore"/);
  assert.match(renderBody, /actionPhaseBalance\.hidden = true/);
  assert.match(renderBody, /`\$\{remaining\}\/\$\{ledger\.available\} Actions`/);
  assert.doesNotMatch(renderBody, /renderActionWorkspaceRootMenu/);
  assert.doesNotMatch(appJs, /data-action-workspace-action/);
  assert.doesNotMatch(renderBody, /Legacy-backed Action/);
  assert.doesNotMatch(renderBody, /workspace\.screen === "legacy"/);
  assert.match(appJs, /renderV2RouteLanding/);
  assert.match(appJs, /data-v2-route-enter/);
  ["department-store", "game-corner", "graveyard", "ranger-base", "pokemon-center", "bulletin-board"].forEach((plateName) => {
    assert.ok(fs.existsSync(path.join(projectRoot, "assets", "action-phase", `${plateName}-plate.png`)), `${plateName} plate should be copied into repo assets`);
    assert.match(appJs, new RegExp(`assets/action-phase/${plateName}-plate\\.png`));
  });
  assert.doesNotMatch(functionBody("renderV2RouteLanding"), /v2-route-landing-art|v2-route-scenery|v2-route-map-marker|v2-route-signpost/);
  assert.doesNotMatch(functionBody("renderV2BattleTentPreview"), /v2-battle-tent-ops|v2-battle-tent-op|v2-battle-tent-facility|operations\.map/);
  assert.doesNotMatch(cssSource, /\.v2-action-location-landing::before\s*\{[\s\S]*repeating-linear-gradient/);
});

test("Route Encounter nested flow separates route selection from commit", () => {
  const renderBody = functionBody("renderV2RouteActionPhase");
  const destinationBody = functionBody("renderV2RoutesDestination");
  const destinationWorkspaceBody = functionBody("v2RouteDestinationWorkspace");
  const browserBody = functionBody("renderV2RouteBrowser");
  const commandsBody = functionBody("renderV2RouteBrowserCommands");
  const takeBody = functionBody("takeV2RouteAction");
  assert.match(destinationWorkspaceBody, /workspace\.screen === "result"/);
  assert.match(destinationWorkspaceBody, /workspace\.screen === "route-detail"/);
  assert.match(destinationWorkspaceBody, /workspace\.screen === "route-list"/);
  assert.match(destinationWorkspaceBody, /: "root"/);
  assert.match(destinationBody, /routeWorkspace\.screen === "root"/);
  assert.match(destinationBody, /renderV2RouteLanding\(routeState, player, remaining\)/);
  assert.match(destinationBody, /renderV2RouteBrowser\(routeState, routeWorkspace, player, remaining, blockedReason\)/);
  assert.match(destinationBody, /renderV2RouteResultPanel/);
  assert.match(renderBody, /backDisabled: workspace\.screen === "result"/);
  assert.match(browserBody, /data-v2-route-browser/);
  assert.match(browserBody, /data-v2-route-select/);
  assert.match(browserBody, /data-v2-route-preview-target/);
  assert.match(browserBody, /aria-label="Choose a Route"/);
  assert.match(renderBody, /activeDefinition\.label/);
  assert.match(renderBody, /activeDefinition\.description/);
  assert.match(commandsBody, /data-v2-route-confirm/);
  assert.match(appJs, /data-v2-route-select/);
  assert.match(appJs, /data-v2-routes-landing/);
  assert.match(appJs, /data-v2-route-confirm/);
  assert.match(functionBody("setV2RouteBrowserPreview"), /data-v2-route-preview/);
  assert.match(functionBody("focusV2RouteBrowserSibling"), /setV2RouteBrowserPreview/);
  assert.match(functionBody("focusV2RouteBrowserRoute"), /requestAnimationFrame/);
  assert.doesNotMatch(appJs, /data-v2-route-select[\s\S]{0,240}takeV2RouteAction/);
  assert.match(appJs, /function enterV2RouteBrowser/);
  assert.match(appJs, /workspace\.screen = "route-list";[\s\S]{0,220}workspace\.selectedRouteNumber = Number\(routeButton\.dataset\.v2RouteSelect/);
  assert.match(takeBody, /v2CommitRouteAction\(player\.id, routeNumber\)/);
  assert.match(takeBody, /v2DrawRouteActionEncounter\(committed\.action\.actionId,\s*\{\s*actingPlayerId:\s*player\.id\s*\}\)/);
  assert.match(takeBody, /workspace\.screen = "result"/);
});

test("public discovery helpers are used without rendering hidden route populations", () => {
  const renderBody = functionBody("renderV2RouteActionPhase");
  const browserBody = functionBody("renderV2RouteBrowser");
  const previewBody = functionBody("renderV2RoutePreviewSlots");
  const pillsBody = functionBody("renderV2RouteDiscoveryPills");
  const publicPreviewBody = functionBody("v2RoutePublicPreview");
  assert.match(browserBody, /v2RoutePublicPreview/);
  assert.match(previewBody, /v2RouteResidentFieldPreview/);
  assert.match(publicPreviewBody, /slots/);
  assert.match(publicPreviewBody, /v2PublicRouteSlotCount/);
  assert.match(publicPreviewBody, /premiumSlotCount/);
  assert.match(browserBody, /preview\.slotCount/);
  assert.match(browserBody, /density-\$\{escapeHtml\(v2RoutePreviewDensityClass\(preview\.slotCount\)\)\}/);
  assert.doesNotMatch(browserBody, /discoveryNames|known<\/small>|v2RouteBrowserTitle/);
  assert.match(pillsBody, /v2PublicDiscoveryNames/);
  assert.match(previewBody, /unknown: true/);
  assert.doesNotMatch(previewBody, /revealName:\s*true/);
  assert.doesNotMatch(renderBody, /\.residents/);
  assert.doesNotMatch(browserBody, /\.residents|residentId|privateKnowledgeByPlayerId|temporaryResidents/);
  assert.doesNotMatch(renderBody, /routeQuality|quality/i);
});

test("Action Workspace CSS supports V1 cards and V2 spatial Route Encounter screens", () => {
  const shellScreenRule = cssRule(".v2-action-phase-screen");
  const actionNavRule = cssRule(".action-nav");
  const actionGridRule = cssRule(".action-nav .grid");
  const actionSlotRule = cssRule(".action-nav .slot");
  assert.match(cssSource, /\.action-compact-hud\s*\{/);
  assert.match(cssSource, /\.action-inline-status\s*\{/);
  assert.match(cssSource, /\.action-turn-rail\.hidden\s*\{/);
  assert.match(cssSource, /\.action-turn-list\s*\{[\s\S]*overflow-x:\s*auto/);
  assert.match(cssSource, /\.action-workspace\s*\{/);
  assert.match(cssSource, /\.action-workspace-menu\s*\{[\s\S]*repeat\(auto-fit, minmax\(190px, 1fr\)\)/);
  assert.match(cssSource, /\.v2-action-phase-view \.action-compact-hud\s*\{[\s\S]*display:\s*none/);
  assert.match(cssSource, /\.v2-action-phase-view \.action-workspace-header\s*\{[\s\S]*display:\s*none/);
  assert.match(indexHtml, /styles\.css[^]*ui\/action-destination-bar\.css[^]*ui\/action-phase-shell\.css/);
  assert.match(shellScreenRule, /height:\s*calc\(100dvh - var\(--game-shell-header-height,52px\)\)/);
  assert.match(shellScreenRule, /gap:\s*var\(--v2-action-shell-stage-gap\)/);
  assert.match(actionDestinationBarCss, /\.action-nav\s*\{[\s\S]*flex:\s*0 0 auto/);
  assert.match(cssSource, /\.action-nav \.topline\s*\{/);
  assert.match(actionGridRule, /grid-template-columns:\s*repeat\(10, minmax\(0, 1fr\)\)/);
  assert.match(actionGridRule, /grid-template-rows:\s*34px 34px/);
  assert.match(cssSource, /\.action-nav \.s4\s*\{[\s\S]*grid-row:\s*1[\s\S]*grid-column:\s*8 \/ span 2/);
  assert.match(cssSource, /\.action-nav \.s9\s*\{[\s\S]*grid-row:\s*2[\s\S]*grid-column:\s*9 \/ span 2/);
  assert.match(cssSource, /\.action-nav\[data-v2-action-destination-bonus-granted="false"\] \.s9\s*\{[\s\S]*visibility:\s*hidden/);
  assert.match(actionSlotRule, /height:\s*34px/);
  assert.match(actionSlotRule, /clip-path:\s*polygon\(6% 0, 100% 0, 94% 100%, 0 100%\)/);
  assert.doesNotMatch(presentationCss, /\.v2-action-destination-(navigator|header|slot|button|symbol|number|copy)\b/);
  assert.doesNotMatch(functionBody("renderV2ActionDestinationNavigator"), /destination\.kicker \|\| "Action Location"/);
  assert.match(actionPhaseShellCss, /\.v2-action-destination-stage\s*\{[\s\S]*flex:\s*1 1 auto/);
  assert.match(actionPhaseShellCss, /\.v2-action-destination-stage\s*\{[\s\S]*overflow:\s*hidden/);
  assert.match(actionPhaseShellCss, /background-image:\s*var\(--v2-action-destination-art\)/);
  assert.match(actionPhaseShellCss, /filter:\s*brightness\(var\(--v2-action-art-brightness\)\) saturate\(var\(--v2-action-art-saturation\)\)/);
  assert.doesNotMatch(actionPhaseShellCss.match(/(?:^|\n)\.v2-action-destination-stage\s*\{[\s\S]*?\n\}/)?.[0] || "", /overflow-y:\s*auto/);
  assert.doesNotMatch(cssSource, /\.v2-action-destination-strip\s*\{/);
  assert.doesNotMatch(cssSource, /data-v2-action-preview-bar/);
  assert.doesNotMatch(cssSource, /\.v2-action-preview-grid\s*\{/);
  assert.doesNotMatch(cssSource, /\.v2-action-preview-slot\s*\{/);
  assert.doesNotMatch(cssSource, /\.v2-action-destination-preview-stack\s*\{/);
  assert.doesNotMatch(cssSource, /\.v2-action-destination-panel\[aria-hidden="true"\]/);
  assert.ok(fs.existsSync(path.join(projectRoot, "assets", "action-phase", "route-encounter-plate.png")), "Route Encounter plate should be copied into repo assets");
  assert.ok(fs.existsSync(path.join(projectRoot, "assets", "action-phase", "battle-frontier-plate.png")), "Battle Frontier plate should be copied into repo assets");
  assert.match(appJs, /assets\/action-phase\/route-encounter-plate\.png/);
  assert.match(appJs, /assets\/action-phase\/battle-frontier-plate\.png/);
  assert.match(functionBody("v2ActionDestinationStageArt"), /routes:\s*\{\s*image:\s*"\/assets\/action-phase\/route-encounter-plate\.png", position:\s*"63% center"/);
  assert.match(functionBody("v2ActionDestinationStageArt"), /"battle-tent":\s*\{\s*image:\s*"\/assets\/action-phase\/battle-frontier-plate\.png", position:\s*"64% center"/);
  assert.doesNotMatch(cssSource, /\.v2-route-forest-depth\s*\{/);
  assert.doesNotMatch(cssSource, /\.v2-route-scenery\s*\{/);
  assert.doesNotMatch(cssSource, /\.v2-route-path-ribbon\s*\{/);
  assert.doesNotMatch(cssSource, /\.v2-route-signpost\s*\{/);
  assert.doesNotMatch(cssSource, /\.v2-route-map-marker\s*\{/);
  assert.match(cssSource, /\.v2-route-browser-layout\s*\{/);
  assert.match(cssSource, /\.v2-route-browser-menu\s*\{/);
  assert.match(cssSource, /\.v2-route-menu-item\s*\{/);
  assert.match(cssSource, /\.v2-route-browser-preview\s*\{/);
  assert.match(cssSource, /\.v2-route-preview-slots\s*\{/);
  assert.match(cssSource, /\.v2-route-preview-slot-group\s*\{[\s\S]*repeat\(auto-fit, minmax\(var\(--route-slot-size\), 1fr\)\)/);
  assert.match(cssSource, /\.v2-route-browser-preview\.density-sparse/);
  assert.match(appJs, /Battle Frontier/);
  assert.match(cssSource, /\.v2-battle-frontier-entry\s*\{/);
  assert.doesNotMatch(cssSource, /\.v2-battle-tent-facility\s*\{/);
  assert.doesNotMatch(cssSource, /\.v2-battle-tent-core\s*\{/);
  assert.doesNotMatch(cssSource, /\.v2-battle-tent-op\s*\{/);
  assert.match(cssSource, /\.v2-action-phase-view \.action-workspace-header \.eyebrow\s*\{[\s\S]*display:\s*none/);
  assert.match(cssSource, /\.v2-route-encounter-reveal\s*,/);
  assert.match(cssSource, /@media \(max-width: 560px\)[\s\S]+\.v2-route-browser-preview/);
  assert.match(cssSource, /@media \(prefers-reduced-motion: reduce\)/);
});
