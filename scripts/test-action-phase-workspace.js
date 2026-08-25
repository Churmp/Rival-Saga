const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const projectRoot = path.resolve(__dirname, "..");
const appJs = fs.readFileSync(path.join(projectRoot, "app.js"), "utf8");
const indexHtml = fs.readFileSync(path.join(projectRoot, "index.html"), "utf8");
const cssSource = fs.readFileSync(path.join(projectRoot, "styles.css"), "utf8");
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

test("V1 resolving operations reopen their workspace even if selection was cleared", () => {
  const renderBody = functionBody("renderActionPhase");
  assert.match(renderBody, /const activeOperation = currentActionOperation\(\)/);
  assert.match(renderBody, /const activeOperationLocation = activeOperation\?\.playerId === player\.id[\s\S]+actionLocationById\(activeOperation\.locationId\)/);
  assert.match(renderBody, /const workspaceLocation = selectedLocation \|\| activeOperationLocation/);
  assert.match(renderBody, /backLabel: workspaceIsResolvingOperation \? "Resolving" : "Actions"/);
  assert.match(renderBody, /backDisabled: workspaceIsResolvingOperation/);
  assert.match(renderBody, /activeOperation\.locationId === workspaceLocation\?\.id/);
});

test("V2 Action Workspace root only exposes Route Encounter in this pass", () => {
  const renderBody = functionBody("renderV2RouteActionPhase");
  const landingBody = functionBody("renderV2RouteLanding");
  assert.match(renderBody, /renderV2RouteLanding\(routeState, player, remaining\)/);
  assert.match(landingBody, /data-v2-route-enter/);
  assert.doesNotMatch(landingBody, /V2 Action Phase/);
  assert.match(renderBody, /actionPhaseBalance\.hidden = true/);
  assert.match(renderBody, /`\$\{remaining\}\/\$\{ledger\.available\} Actions`/);
  assert.doesNotMatch(renderBody, /renderActionWorkspaceRootMenu/);
  assert.doesNotMatch(appJs, /data-action-workspace-action/);
  assert.doesNotMatch(renderBody, /Legacy-backed Action/);
  assert.doesNotMatch(renderBody, /workspace\.screen === "legacy"/);
});

test("Route Encounter nested flow separates route selection from commit", () => {
  const renderBody = functionBody("renderV2RouteActionPhase");
  const browserBody = functionBody("renderV2RouteBrowser");
  const commandsBody = functionBody("renderV2RouteBrowserCommands");
  const takeBody = functionBody("takeV2RouteAction");
  assert.match(renderBody, /workspace\.screen === "route-list"/);
  assert.match(renderBody, /renderV2RouteBrowser\(routeState, workspace, player, remaining, routeBlockedReason\)/);
  assert.match(renderBody, /workspace\.screen === "route-detail"/);
  assert.match(renderBody, /backDisabled: pending/);
  assert.match(browserBody, /data-v2-route-browser/);
  assert.match(browserBody, /data-v2-route-select/);
  assert.match(browserBody, /data-v2-route-preview-target/);
  assert.match(browserBody, /aria-label="Choose a Route"/);
  assert.match(renderBody, /title: "Choose a Route"/);
  assert.match(renderBody, /description: "Preview freely\. Explore spends 1 Action\."/);
  assert.match(commandsBody, /data-v2-route-confirm/);
  assert.match(appJs, /data-v2-route-select/);
  assert.match(appJs, /data-v2-route-confirm/);
  assert.match(functionBody("setV2RouteBrowserPreview"), /data-v2-route-preview/);
  assert.match(functionBody("focusV2RouteBrowserSibling"), /setV2RouteBrowserPreview/);
  assert.match(functionBody("focusV2RouteBrowserRoute"), /requestAnimationFrame/);
  assert.doesNotMatch(appJs, /data-v2-route-select[\s\S]{0,240}takeV2RouteAction/);
  assert.match(appJs, /workspace\.screen = "route-list";[\s\S]{0,180}workspace\.selectedRouteNumber = Number\(routeButton\.dataset\.v2RouteSelect/);
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
  assert.match(cssSource, /\.action-compact-hud\s*\{/);
  assert.match(cssSource, /\.action-inline-status\s*\{/);
  assert.match(cssSource, /\.action-turn-rail\.hidden\s*\{/);
  assert.match(cssSource, /\.action-turn-list\s*\{[\s\S]*overflow-x:\s*auto/);
  assert.match(cssSource, /\.action-workspace\s*\{/);
  assert.match(cssSource, /\.action-workspace-menu\s*\{[\s\S]*repeat\(auto-fit, minmax\(190px, 1fr\)\)/);
  assert.match(cssSource, /\.v2-route-landing\s*\{/);
  assert.match(cssSource, /\.v2-route-browser-layout\s*\{/);
  assert.match(cssSource, /\.v2-route-browser-menu\s*\{/);
  assert.match(cssSource, /\.v2-route-menu-item\s*\{/);
  assert.match(cssSource, /\.v2-route-browser-preview\s*\{/);
  assert.match(cssSource, /\.v2-route-preview-slots\s*\{/);
  assert.match(cssSource, /\.v2-route-preview-slot-group\s*\{[\s\S]*repeat\(auto-fit, minmax\(var\(--route-slot-size\), 1fr\)\)/);
  assert.match(cssSource, /\.v2-route-browser-preview\.density-sparse/);
  assert.match(cssSource, /\.v2-action-phase-view \.action-workspace-header \.eyebrow\s*\{[\s\S]*display:\s*none/);
  assert.match(cssSource, /\.v2-route-encounter-reveal\s*,/);
  assert.match(cssSource, /@media \(max-width: 560px\)[\s\S]+\.v2-route-browser-preview/);
  assert.match(cssSource, /@media \(prefers-reduced-motion: reduce\)/);
});
