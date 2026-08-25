const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const projectRoot = path.resolve(__dirname, "..");
const appJs = fs.readFileSync(path.join(projectRoot, "app.js"), "utf8");
const indexHtml = fs.readFileSync(path.join(projectRoot, "index.html"), "utf8");
const cssSource = fs.readFileSync(path.join(projectRoot, "styles.css"), "utf8");
const packageJson = JSON.parse(fs.readFileSync(path.join(projectRoot, "package.json"), "utf8"));

function functionBody(name) {
  const start = appJs.indexOf(`function ${name}(`);
  assert.notEqual(start, -1, `${name} should exist`);
  const paramsStart = appJs.indexOf("(", start);
  let paramsDepth = 0;
  let paramsEnd = -1;
  for (let index = paramsStart; index < appJs.length; index += 1) {
    if (appJs[index] === "(") paramsDepth += 1;
    if (appJs[index] === ")") paramsDepth -= 1;
    if (paramsDepth === 0) {
      paramsEnd = index;
      break;
    }
  }
  assert.notEqual(paramsEnd, -1, `${name} parameters should close`);
  const bodyStart = appJs.indexOf("{", paramsEnd);
  let depth = 0;
  for (let index = bodyStart; index < appJs.length; index += 1) {
    if (appJs[index] === "{") depth += 1;
    if (appJs[index] === "}") depth -= 1;
    if (depth === 0) return appJs.slice(bodyStart + 1, index);
  }
  throw new Error(`${name} body was not closed`);
}

function cssRule(selector) {
  const start = cssSource.indexOf(selector);
  assert.notEqual(start, -1, `${selector} should exist`);
  const bodyStart = cssSource.indexOf("{", start);
  const bodyEnd = cssSource.indexOf("}", bodyStart);
  assert.notEqual(bodyStart, -1, `${selector} should have a body`);
  assert.notEqual(bodyEnd, -1, `${selector} body should close`);
  return cssSource.slice(bodyStart + 1, bodyEnd);
}

test("new game UI defaults to V2 without exposing legacy V1 prominently", () => {
  const createCard = indexHtml.match(/<section class="site-shell-card site-create-game-card">[\s\S]*?<\/section>/)?.[0] || "";
  const createBody = functionBody("createSiteGame");
  assert.match(appJs, /const DEFAULT_ACTION_PHASE_VERSION = ACTION_PHASE_VERSION_V2/);
  assert.match(appJs, /const ACTION_PHASE_VERSION_V2 = "action-phase-v2-real-series"/);
  assert.match(appJs, /supportedActionPhaseVersions: \[ACTION_PHASE_VERSION_V1, ACTION_PHASE_VERSION_V2\]/);
  assert.match(createBody, /DEFAULT_ACTION_PHASE_VERSION/);
  assert.doesNotMatch(createCard, /action-phase-v1-current-series|Action Phase Version|V1/i);
});

test("renderActionPhase delegates V2 without replacing the V1 branch", () => {
  const body = functionBody("renderActionPhase");
  const v2Branch = body.indexOf("renderV2RouteActionPhase()");
  const v1Branch = body.indexOf("ensureActionPhaseGymState()");
  assert.match(body, /activeActionPhaseVersion\(\) === ACTION_PHASE_VERSION_V2/);
  assert.match(body, /renderV2RouteActionPhase\(\)/);
  assert.match(body, /ensureActionPhaseGymState\(\)/, "V1 render path should still be present");
  assert.match(body, /renderActionWorkspaceRootMenu\(\{ player, visits, disabledReason: timingPauseReason \}\)/, "V1 root Action Workspace should still render");
  assert.ok(v2Branch >= 0 && v1Branch >= 0 && v2Branch < v1Branch, "V2 should route before the V1 workspace is initialized");
});

test("loading V2 renders Route Action without invoking V1 Encounter Wheel behavior", () => {
  const body = functionBody("renderV2RouteActionPhase");
  assert.match(body, /v2EnsureRouteSeriesState/);
  assert.match(body, /renderV2RouteLanding|renderV2RouteBrowser|renderV2RouteResultPanel/);
  assert.doesNotMatch(body, /Encounter Wheel|encounterWheelDefinition|createWheelSession|openEncounter|startEncounter/i);
});

test("browser V2 mount stores state in the real persisted buckets", () => {
  assert.match(indexHtml, /app\.js\?v=\d+/, "browser should fetch the mounted V2 app script");
  assert.match(appJs, /if \(payload\.actionPhaseVersion\)/, "remote game version should align loaded state");
  assert.match(appJs, /nextState\.v2\.routeEncounterBySeriesId \|\|= \{\}/);
  assert.match(appJs, /nextState\.v2\.actionPhaseBySeriesId \|\|= \{\}/);
  assert.match(appJs, /state\.v2\.routeEncounterBySeriesId\[normalizedSeriesId\]/);
  assert.match(appJs, /state\.v2\.actionPhaseBySeriesId\[normalizedSeriesId\]/);
  assert.match(appJs, /routeUiState: createDefaultRouteUiState\(\)/);
  assert.match(appJs, /delete snapshot\.routeUiState/);
  assert.match(appJs, /delete snapshot\.v2\.routeWorkspaceBySeriesId/);
  assert.match(appJs, /state\.pokemonRecords\.unshift\(pokemon\)/);
  assert.match(appJs, /player\.pokemonIds = \[\.\.\.new Set/);
  assert.doesNotMatch(appJs, /nextState\.v2\.routeWorkspaceBySeriesId \|\|= \{\}/);
});

test("visible V2 route render path exposes public discoveries but not hidden populations", () => {
  const body = functionBody("renderV2RouteActionPhase");
  const browserBody = functionBody("renderV2RouteBrowser");
  const previewBody = functionBody("renderV2RoutePreviewSlots");
  const commandsBody = functionBody("renderV2RouteBrowserCommands");
  const revealBody = functionBody("renderV2RouteResultPanel");
  assert.match(browserBody, /v2RoutePublicPreview/);
  assert.match(browserBody, /data-v2-route-browser/);
  assert.match(browserBody, /data-v2-route-select/);
  assert.match(browserBody, /data-v2-route-preview-target/);
  assert.match(previewBody, /v2RouteResidentFieldPreview/);
  assert.match(previewBody, /unknown: true/);
  assert.match(previewBody, /data-v2-route-resident-field/);
  assert.match(previewBody, /v2-route-premium-marker/);
  assert.match(previewBody, /data-v2-duplicate-toggle/);
  assert.doesNotMatch(previewBody, /revealName:\s*true/);
  assert.match(commandsBody, /data-v2-route-confirm/);
  assert.match(revealBody, /data-v2-route-acquire/);
  assert.doesNotMatch(revealBody, /v2-route-diagnostics|opportunityId|residentId/);
  assert.doesNotMatch(body, /residents/);
  assert.doesNotMatch(browserBody, /\.residents|residentId|privateKnowledgeByPlayerId|temporaryResidents|regionalIdentity|generationProvenance/);
  assert.doesNotMatch(previewBody, /\.residents|privateKnowledgeByPlayerId|temporaryResidents|regionalIdentity|generationProvenance/);
  assert.doesNotMatch(commandsBody, /<option value="\$\{escapeHtml\(resident\.residentId\)\}/);
  assert.doesNotMatch(body, /routeQuality|quality/i);
});

test("fresh V2 routes generate persisted variable populations without fixed 24 assumptions", () => {
  const createBody = functionBody("v2CreateRouteSeriesState");
  const sizeBody = functionBody("v2RoutePopulationSize");
  assert.match(appJs, /const V2_ROUTE_POPULATION_MIN = 20/);
  assert.match(appJs, /const V2_ROUTE_POPULATION_MAX = 30/);
  assert.match(createBody, /const populationSize = v2RoutePopulationSize\(rng\)/);
  assert.match(createBody, /residents\.length < populationSize/);
  assert.match(createBody, /populationSize/);
  assert.match(sizeBody, /V2_ROUTE_POPULATION_MIN/);
  assert.match(sizeBody, /V2_ROUTE_POPULATION_MAX/);
  assert.doesNotMatch(appJs, /const V2_ROUTE_POPULATION_SIZE = 24/);
  assert.doesNotMatch(createBody, /residents\.length < 24|V2_ROUTE_POPULATION_SIZE/);
});

test("fresh V2 routes append hidden fixed Premium Resident slots", () => {
  const createBody = functionBody("v2CreateRouteSeriesState");
  const premiumBody = functionBody("v2GeneratePremiumResidents");
  const previewBody = functionBody("v2RoutePublicPreview");
  const slotsBody = functionBody("renderV2RoutePreviewSlots");
  assert.match(appJs, /const V2_ROUTE_PREMIUM_RESIDENT_COUNT = 2/);
  assert.match(appJs, /const V2_ROUTE_PREMIUM_ENCOUNTER_WEIGHT = 0\.15/);
  assert.match(appJs, /const V2_REGIONAL_VARIANCE_RULES = Object\.freeze/);
  assert.match(appJs, /function v2DeriveRegionalIdentity/);
  assert.match(appJs, /ultra-elite/);
  assert.match(appJs, /master-elite/);
  assert.match(createBody, /residents\.push\(\.\.\.premiumResidents\)/);
  assert.match(createBody, /premiumResidentIds/);
  assert.match(premiumBody, /slotKind: "premium"/);
  assert.match(premiumBody, /encounterWeight: V2_ROUTE_PREMIUM_ENCOUNTER_WEIGHT/);
  assert.match(previewBody, /premiumSlotCount/);
  assert.match(slotsBody, /v2-route-premium-marker/);
  assert.match(slotsBody, /slot\.premium/);
  assert.doesNotMatch(slotsBody, /privateKnowledgeByPlayerId|routeQuality/);
});

test("route browser exposes only the intentional public slot-count selector", () => {
  const countBody = functionBody("v2PublicRouteSlotCount");
  const previewBody = functionBody("v2RoutePublicPreview");
  const browserBody = functionBody("renderV2RouteBrowser");
  assert.match(countBody, /route\?\.residents/);
  assert.doesNotMatch(countBody, /displayName|residentId|routeQuality|weight|privateKnowledgeByPlayerId/);
  assert.match(previewBody, /slotCount/);
  assert.match(previewBody, /slots/);
  assert.match(previewBody, /unknownCount/);
  assert.match(browserBody, /preview\.slotCount/);
  assert.doesNotMatch(browserBody, /routeQuality|weight|seed|privateKnowledgeByPlayerId|residentId|regionalIdentity|generationProvenance/);
});

test("route browser layout derives density from live public slot counts", () => {
  const densityBody = functionBody("v2RoutePreviewDensityClass");
  const browserBody = functionBody("renderV2RouteBrowser");
  const previewBody = functionBody("renderV2RoutePreviewSlots");
  assert.match(densityBody, /slotCount <= 20[\s\S]*"sparse"/);
  assert.match(densityBody, /slotCount <= 23[\s\S]*"relaxed"/);
  assert.match(densityBody, /slotCount <= 27[\s\S]*"standard"/);
  assert.match(densityBody, /slotCount <= 30[\s\S]*"dense"/);
  assert.match(densityBody, /"stress"/);
  assert.match(browserBody, /density-\$\{escapeHtml\(v2RoutePreviewDensityClass\(preview\.slotCount\)\)\}/);
  assert.match(browserBody, /--route-slot-count: \$\{escapeHtml\(preview\.slotCount\)\};/);
  assert.match(browserBody, /Preview Route \$\{escapeHtml\(route\.routeNumber\)\}\. \$\{escapeHtml\(discoveryLabel\)\}\./);
  assert.match(browserBody, /\$\{escapeHtml\(preview\.discoveries\.length\)\} \/ \$\{escapeHtml\(preview\.slotCount\)\}/);
  assert.doesNotMatch(browserBody, /discoveryNames|\.join\(", "\)|known<\/small>|v2RouteBrowserTitle/);
  assert.doesNotMatch(previewBody, /Undiscovered/);
  assert.match(cssSource, /\.v2-route-browser-preview\.density-sparse/);
  assert.match(cssSource, /\.v2-route-browser-preview\.density-relaxed/);
  assert.match(cssSource, /\.v2-route-browser-preview\.density-dense/);
  assert.match(cssSource, /\.v2-route-browser-preview\.density-stress/);
  assert.match(cssSource, /grid-template-columns:\s*repeat\(auto-fit, minmax\(var\(--route-slot-size\), 1fr\)\)/);
});

test("mounted V2 route runtime exposes selectors and encounter capabilities", () => {
  for (const name of [
    "getRoutePublicView",
    "getRouteViewForPlayer",
    "getEncounterCapabilitiesForPlayer",
    "getPendingRouteOpportunitiesForPlayer",
    "getMasterBallOpportunityCapabilitiesForPlayer",
    "getRouteDuplicatePreferenceControlsForPlayer",
    "getRouteRepelCapabilitiesForPlayer",
    "getVisibleRouteEffectsForPlayer"
  ]) {
    functionBody(name);
  }
  assert.doesNotMatch(functionBody("getRoutePublicView"), /privateKnowledgeByPlayerId|routeQuality|seed|suppressions|generationProvenance/);
  assert.doesNotMatch(functionBody("getRouteViewForPlayer"), /routeQuality|seed|generationProvenance/);
  assert.match(functionBody("getRouteViewForPlayer"), /activeVisibleEffects/);
  assert.match(functionBody("getEncounterCapabilitiesForPlayer"), /canPersonalDuplicateReroll/);
  assert.match(functionBody("getEncounterCapabilitiesForPlayer"), /canUseRerollToken/);
  assert.match(functionBody("getMasterBallOpportunityCapabilitiesForPlayer"), /eligibleResidents/);
  assert.match(functionBody("getRouteDuplicatePreferenceControlsForPlayer"), /v2PlayerOwnsRouteResident/);
  assert.match(functionBody("getRouteDuplicatePreferenceControlsForPlayer"), /privateKnowledgeByPlayerId/);
  assert.match(functionBody("getRouteRepelCapabilitiesForPlayer"), /route\?\.(?:residents)|route\.residents/);
  assert.match(functionBody("getRouteRepelCapabilitiesForPlayer"), /canApplyRepel/);
  assert.match(functionBody("getRouteRepelCapabilitiesForPlayer"), /unsuppressedEligibleCount/);
  assert.match(functionBody("getPendingRouteOpportunitiesForPlayer"), /status === "pending"/);
  assert.doesNotMatch(functionBody("getVisibleRouteEffectsForPlayer"), /temporaryResidentIds|residentIds|suppressedResidentIds/);
});

test("mounted V2 duplicate preferences are authoritative player-scoped controls", () => {
  const eligibilityBody = functionBody("v2EligibleResidents");
  const setterBody = functionBody("v2SetRouteDuplicatePreference");
  const previewSlotsBody = functionBody("renderV2RoutePreviewSlots");
  assert.match(appJs, /duplicatePreferencesByPlayerId/);
  assert.match(eligibilityBody, /v2ResidentDuplicatePreferenceFilters/);
  assert.match(eligibilityBody, /options\.playerId/);
  assert.match(setterBody, /v2PlayerOwnsRouteResident/);
  assert.match(setterBody, /privateKnowledgeByPlayerId/);
  assert.match(setterBody, /resident\.permanent === false/);
  assert.match(functionBody("v2RouteResidentFieldPreview"), /getRouteDuplicatePreferenceControlsForPlayer/);
  assert.match(previewSlotsBody, /data-v2-duplicate-toggle/);
  assert.match(previewSlotsBody, /control\.duplicateEnabled \? "ON" : "OFF"/);
  assert.doesNotMatch(appJs, /function renderV2RouteDuplicatePreferenceControls/);
  assert.doesNotMatch(previewSlotsBody, /route\.residents|privateKnowledgeByPlayerId|temporaryResidents/);
  assert.match(appJs, /v2SetRouteDuplicatePreference\(\{/);
});

test("mounted V2 route effect runtime exposes source-agnostic capabilities without hidden selector leakage", () => {
  for (const name of [
    "v2RouteEffectOperations",
    "v2ApplyRouteRevealEffect",
    "getRouteRevealCapabilities",
    "v2ApplyTemporaryPrimaryTypeInjection",
    "getTemporaryPrimaryTypeInjectionCapabilities",
    "v2MarkOpportunityTemporaryEffects"
  ]) {
    functionBody(name);
  }
  assert.match(functionBody("v2ApplyRouteRevealEffect"), /visibility === "table"/);
  assert.match(functionBody("v2ApplyRouteRevealEffect"), /privateKnowledgeByPlayerId/);
  assert.match(functionBody("v2RouteResidentMatchesFilter"), /excludeResidentIds/);
  assert.match(functionBody("v2ApplyTemporaryPrimaryTypeInjection"), /count !== V2_TYPE_INJECTION_COUNT/);
  assert.match(functionBody("getTemporaryPrimaryTypeInjectionCapabilities"), /primaryType/);
  assert.match(functionBody("v2SelectTypeInjectionCandidate"), /v2InjectionTierRollForRoute/);
  assert.match(functionBody("v2InjectionTierRollForRoute"), /V2_TYPE_INJECTION_TIER_ROLLS/);
  assert.match(functionBody("v2TypeInjectionCandidates"), /!== "master-elite"/);
  assert.match(functionBody("v2ApplyTemporaryPrimaryTypeInjection"), /temporaryResidents/);
  assert.match(functionBody("v2EligibleResidents"), /temporaryResidents/);
  assert.doesNotMatch(functionBody("renderV2RouteBrowser"), /temporaryResidents|privateKnowledgeByPlayerId|routeEffectOperationsBySeriesId|regionalIdentity|generationProvenance/);
});

test("mounted V2 route runtime wires approved token mechanics through exact inventory", () => {
  for (const name of [
    "v2PurchaseExtraEncounter",
    "v2UseExtraEncounter",
    "v2UseRerollTokenOnAction",
    "v2ApplyRepelToRoute",
    "v2UseMasterBallOnOpportunity",
    "drawV2PendingRouteOpportunity",
    "v2ConsumeExactRouteToken"
  ]) {
    functionBody(name);
  }
  assert.match(appJs, /const V2_EXTRA_ENCOUNTER_PRICE = 2500/);
  assert.match(functionBody("v2UseExtraEncounter"), /v2ConsumeExactRouteToken/);
  assert.match(functionBody("v2UseExtraEncounter"), /extra-encounter-token/);
  assert.match(functionBody("v2UseExtraEncounter"), /v2DrawRouteOpportunityEncounter/);
  assert.match(functionBody("v2UseExtraEncounter"), /v2EligibleResidents/);
  assert.doesNotMatch(functionBody("v2UseExtraEncounter"), /spentActionIds\.push/);
  assert.match(functionBody("v2ApplyRepelToRoute"), /V2_REPEL_SUPPRESSION_COUNT/);
  assert.match(functionBody("v2ApplyRepelToRoute"), /candidates\.length < V2_REPEL_SUPPRESSION_COUNT/);
  assert.doesNotMatch(functionBody("renderV2RouteBrowserTools"), /tierOptions = \["lc", "lc-elite", "safari", "poke", "great", "ultra", "master"\]/);
  assert.match(functionBody("renderV2RouteBrowserTools"), /renderV2RouteEncounterRail/);
  assert.match(functionBody("getRouteEncounterRailCapabilitiesForPlayer"), /getRouteEffectCapabilitiesForPlayer/);
  assert.match(functionBody("getRouteEffectCapabilitiesForPlayer"), /getRouteRepelCapabilitiesForPlayer/);
  assert.match(functionBody("v2UseMasterBallOnOpportunity"), /opportunity\.status = "consumed"/);
  assert.match(functionBody("v2UseMasterBallOnOpportunity"), /sourceAction\.resultId = resultId/);
  assert.match(functionBody("drawV2PendingRouteOpportunity"), /v2DrawRouteActionEncounter|v2DrawRouteOpportunityEncounter/);
});

test("mounted V2 route UI has an Encounter Rail plus floating conditional effects surface", () => {
  const railBody = functionBody("renderV2RouteEncounterRail");
  const effectCapabilitiesBody = functionBody("getRouteEffectCapabilitiesForPlayer");
  assert.match(appJs, /data-v2-route-effects-toggle/);
  assert.match(appJs, /data-v2-route-effects-window/);
  assert.match(appJs, /data-v2-route-effects-drag-handle/);
  assert.match(appJs, /data-v2-route-effect-list/);
  assert.match(appJs, /data-v2-route-encounter-rail/);
  assert.match(appJs, /data-v2-rail-extra-buy/);
  assert.match(appJs, /data-v2-rail-extra-use/);
  assert.match(appJs, /data-v2-route-rail-injection/);
  assert.match(appJs, /data-v2-rail-injection-primary/);
  assert.match(appJs, /data-v2-rail-injection-apply/);
  assert.match(appJs, /data-v2-rail-injection-activation/);
  assert.match(appJs, /v2RouteInjectionActivationId/);
  assert.match(railBody, /v2-route-rail-section injection/);
  assert.match(railBody, /v2-route-rail-zero/);
  assert.match(railBody, /injection\.canInject \? "" : " disabled"/);
  assert.match(functionBody("applyV2TemporaryTypeInjectionEffect"), /activationKey/);
  assert.match(functionBody("applyV2TemporaryTypeInjectionEffect"), /sourceEffectId:\s*activationKey/);
  assert.match(functionBody("applyV2TemporaryTypeInjectionEffect"), /route-rail-type-injection:\$\{state\.series\}:\$\{opportunityId\}:\$\{activationKey\}/);
  assert.doesNotMatch(functionBody("applyV2TemporaryTypeInjectionEffect"), /route-rail-type-injection:\$\{state\.series\}:\$\{opportunityId\}:\$\{primaryType\}/);
  assert.match(appJs, /data-v2-route-effect-apply="repel"/);
  assert.match(appJs, /data-v2-route-reroll-token/);
  assert.match(appJs, /data-v2-opportunity-draw/);
  assert.match(appJs, /data-v2-route-effect-apply="master-ball"/);
  assert.doesNotMatch(effectCapabilitiesBody, /extra-purchase|extra-use|type-injection|v2TemporaryInjectionOptionsForOpportunity/);
  assert.doesNotMatch(railBody, /data-v2-route-effect-apply/);
  assert.doesNotMatch(railBody, /repelTier|masterResident/);
  assert.doesNotMatch(railBody, /battleTier|Tier Scope|data-v2-route-effect-field="injectionOption"/);
  assert.doesNotMatch(appJs, /data-v2-extra-buy|data-v2-extra-use|data-v2-repel-apply|data-v2-master-ball-use|data-v2-master-ball-resident/);
  assert.doesNotMatch(functionBody("renderV2RouteBrowserCommands"), /residentIds|resident\.residentId/);
  assert.doesNotMatch(functionBody("renderV2RouteBrowser"), /routeQuality|seed|regionalIdentity|generationProvenance/);
});

test("mounted V2 route browser keeps rail and navigation geometry stable", () => {
  assert.match(functionBody("renderV2RoutePreviewSlots"), /v2-route-slot-meta/);
  assert.match(functionBody("renderV2RoutePreviewSlots"), /renderDuplicateToggle\(slot\.duplicateControl\)/);
  assert.match(cssSource, /\.v2-route-slot-meta\s*\{[\s\S]*display:\s*inline-flex/);
  assert.match(cssSource, /\.v2-route-slot-meta\s*\{[\s\S]*flex-wrap:\s*wrap/);
  assert.doesNotMatch(cssRule(".v2-route-slot-duplicate-toggle"), /position:\s*absolute/);
  assert.doesNotMatch(cssRule(".v2-route-slot-tier"), /position:\s*absolute/);
  assert.match(cssSource, /\.v2-route-browser-menu\s*\{[\s\S]*overflow-anchor:\s*none/);
  assert.match(cssSource, /\.v2-route-menu-item\s*\{[\s\S]*box-sizing:\s*border-box/);
  assert.match(cssSource, /\.v2-route-menu-item\s*\{[\s\S]*width:\s*100%/);
  assert.match(cssSource, /\.v2-route-browser-previews\s*\{[\s\S]*display:\s*grid/);
  const previewRule = cssSource.match(/\.v2-route-browser-preview\s*\{[\s\S]*?\n\}/)?.[0] || "";
  assert.doesNotMatch(previewRule, /animation|transform|translate|scale/);
  assert.match(previewRule, /grid-area:\s*1 \/ 1/);
  assert.match(cssSource, /\.v2-route-browser-preview\[aria-hidden="true"\]\s*\{[\s\S]*visibility:\s*hidden/);
  assert.doesNotMatch(cssSource, /@keyframes v2RouteBrowserPreview/);
  assert.match(appJs, /data-v2-route-browser-preview/);
  assert.match(functionBody("renderV2RouteBrowser"), /aria-hidden="\$\{selected \? "false" : "true"\}"/);
  assert.match(functionBody("setV2RouteBrowserPreview"), /if \(normalized === current\) return false/);
  assert.match(functionBody("setV2RouteBrowserPreview"), /dataset\.v2RouteBrowserPreview = normalized/);
  assert.match(functionBody("setV2RouteBrowserPreview"), /setAttribute\("aria-hidden", active \? "false" : "true"\)/);
  assert.doesNotMatch(functionBody("setV2RouteBrowserPreview"), /panel\.hidden/);
  assert.match(appJs, /addEventListener\("mouseout"/);
  assert.match(appJs, /resetV2RouteBrowserPreview\(\)/);
  assert.match(appJs, /routeButton\.contains\(event\.relatedTarget\)/);
  const selectedRule = cssRule(".v2-route-menu-item.selected");
  const hoverRule = cssSource.match(/\.v2-route-menu-item:hover,[\s\S]*?\.v2-route-menu-item\.previewed\s*\{[\s\S]*?\n\}/)?.[0] || "";
  assert.doesNotMatch(selectedRule, /transform|translate|scale|padding|margin|border-width|min-height|height|width/);
  assert.doesNotMatch(hoverRule, /transform|translate|scale|padding|margin|border-width|min-height|height|width/);
});

test("floating V2 route effects are client-local and scale through capability lists", () => {
  const defaultUiBody = functionBody("createDefaultRouteUiState");
  const normalizeUiBody = functionBody("normalizeRouteUiState");
  const persistBody = functionBody("createPersistableStateSnapshot");
  const listBody = functionBody("renderV2RouteEffectList");
  const capabilitiesBody = functionBody("getRouteEffectCapabilitiesForPlayer");
  assert.match(defaultUiBody, /routeEffectsOpen/);
  assert.match(defaultUiBody, /routeEffectsX/);
  assert.match(defaultUiBody, /routeEffectsY/);
  assert.match(defaultUiBody, /routeEffectsExpandedId/);
  assert.match(normalizeUiBody, /routeEffectsExpandedId/);
  assert.match(persistBody, /delete snapshot\.routeUiState/);
  assert.match(listBody, /capabilities\.map/);
  assert.match(capabilitiesBody, /options\.extraCapabilities/);
  assert.match(functionBody("renderV2RouteBrowserTools"), /renderV2RouteEncounterRail/);
  assert.doesNotMatch(functionBody("renderV2RouteBrowserTools"), /extraTokens|repelCapabilities|masterBallCapabilities|v2TemporaryInjectionOptionsForOpportunity/);
});

test("package exposes the browser mount regression test", () => {
  assert.equal(packageJson.scripts["test:v2-route-browser"], "node --test scripts/test-v2-route-browser-mount.js");
  assert.equal(packageJson.scripts["test:v2-route-runtime"], "node --test scripts/test-v2-route-runtime-sequences.js");
});
