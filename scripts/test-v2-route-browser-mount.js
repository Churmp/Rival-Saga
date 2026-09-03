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
  const start = presentationCss.indexOf(selector);
  assert.notEqual(start, -1, `${selector} should exist`);
  const bodyStart = presentationCss.indexOf("{", start);
  const bodyEnd = presentationCss.indexOf("}", bodyStart);
  assert.notEqual(bodyStart, -1, `${selector} should have a body`);
  assert.notEqual(bodyEnd, -1, `${selector} body should close`);
  return presentationCss.slice(bodyStart + 1, bodyEnd);
}

test("new game UI exposes the current Action Phase version", () => {
  const createCard = indexHtml.match(/<section class="site-shell-card site-create-game-card">[\s\S]*?<\/section>/)?.[0] || "";
  const createBody = functionBody("createSiteGame");
  assert.match(appJs, /const DEFAULT_ACTION_PHASE_VERSION = ACTION_PHASE_VERSION_V2/);
  assert.match(appJs, /const ACTION_PHASE_VERSION_V2 = "action-phase-v2-real-series"/);
  assert.match(appJs, /supportedActionPhaseVersions: \[ACTION_PHASE_VERSION_V2\]/);
  assert.match(createBody, /DEFAULT_ACTION_PHASE_VERSION/);
  assert.doesNotMatch(createCard, /Action Phase Version|\bV1\b/i);
});

test("renderActionPhase delegates directly to the current Route Action renderer", () => {
  const body = functionBody("renderActionPhase");
  assert.match(body, /renderV2RouteActionPhase\(\)/);
  assert.doesNotMatch(body, /activeActionPhaseVersion|ensureActionPhaseGymState|renderActionWorkspaceRootMenu/);
});

test("loading V2 renders Route Action without invoking V1 Encounter Wheel behavior", () => {
  const body = functionBody("renderV2RouteActionPhase");
  assert.match(body, /v2EnsureRouteSeriesState/);
  assert.match(body, /renderV2ActionDestinationShell/);
  assert.match(functionBody("renderV2RoutesDestination"), /renderV2RouteBrowser|renderV2RouteResultPanel/);
  assert.match(functionBody("renderV2BattleTentPreview"), /Battle Frontier/);
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

test("V2 Action destinations preview client-locally without spending Actions", () => {
  const defaultUiBody = functionBody("createDefaultRouteUiState");
  const normalizeUiBody = functionBody("normalizeRouteUiState");
  const selectedBody = functionBody("v2SelectedActionDestination");
  const selectBody = functionBody("selectV2ActionDestination");
  const previewBody = functionBody("setV2ActionDestinationPreview");
  const resetBody = functionBody("resetV2ActionDestinationPreview");
  const renderBody = functionBody("renderV2ActionDestinationShell");
  const navigatorBody = functionBody("renderV2ActionDestinationNavigator");
  assert.match(appJs, /const V2_ACTION_STANDARD_DESTINATIONS = Object\.freeze/);
  assert.match(appJs, /const V2_ACTION_BONUS_DESTINATION = Object\.freeze/);
  assert.match(appJs, /const V2_ACTION_DESTINATION_IDS = Object\.freeze\(V2_ACTION_DESTINATIONS\.map/);
  assert.match(appJs, /const V2_ACTION_DESTINATIONS = Object\.freeze/);
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
  const destinationConfig = appJs.slice(appJs.indexOf("const V2_ACTION_STANDARD_DESTINATIONS"), appJs.indexOf("const V2_ACTION_BONUS_DESTINATION"));
  assert.doesNotMatch(destinationConfig, /label: "Day Care"|label: "Silph Co\. R&D"|label: "Dragon's Den"|id: "pc"|Hidden Grotto/);
  assert.doesNotMatch(appJs, /const V2_ACTION_PREVIEW_STANDARD_SLOTS/);
  assert.doesNotMatch(appJs, /id: "move"|id: "search"|id: "engage"|id: "rest"|id: "interact"|id: "scout"|id: "explore"/);
  assert.match(defaultUiBody, /selectedActionDestinationBySeriesId/);
  assert.match(defaultUiBody, /hoveredActionDestination/);
  assert.match(normalizeUiBody, /selectedActionDestinationBySeriesId/);
  assert.match(selectedBody, /normalizeV2ActionDestinationId[\s\S]*"routes"/);
  assert.match(renderBody, /data-v2-action-destination-workspace/);
  assert.match(renderBody, /v2-action-destination-stage/);
  assert.match(renderBody, /v2ActionDestinationStageStyle\(activeDestinationId\)/);
  assert.match(renderBody, /renderV2ActionDestinationNavigator\(selectedDestinationId, activeDestinationId, actionStatus\)/);
  assert.match(navigatorBody, /data-v2-action-destination-navigator/);
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
  assert.doesNotMatch(navigatorBody, /class="[^"]*v2-action-destination-(navigator|slot|button|header|symbol|number|copy)/);
  assert.doesNotMatch(navigatorBody, /data-v2-action-preview-bar/);
  assert.match(navigatorBody, /data-v2-action-destination-bonus-granted/);
  assert.match(navigatorBody, /data-v2-action-destination-select/);
  assert.doesNotMatch(renderBody, /data-v2-action-destination-panel/);
  assert.match(previewBody, /if \(normalized === current\) return false/);
  assert.match(previewBody, /dataset\.v2ActionDestinationPreview = normalized/);
  assert.match(previewBody, /workspaceTarget\.innerHTML = renderV2ActionDestinationWorkspace/);
  assert.match(resetBody, /setV2ActionDestinationPreview\(shell\.dataset\.v2ActionDestinationSelected/);
  assert.match(selectBody, /v2SetSelectedActionDestination/);
  assert.match(selectBody, /saveClientUiState\(\)/);
  assert.doesNotMatch(selectBody, /saveState|spentActionIds|v2CommitRouteAction|createLocationActionVisit/);
  assert.match(functionBody("createPersistableStateSnapshot"), /delete snapshot\.routeUiState/);
  assert.match(appJs, /data-v2-route-enter/);
  assert.match(appJs, /data-v2-routes-landing/);
});

test("V2 Action destination selector geometry is stable across previews", () => {
  const actionNavRule = cssRule(".action-nav");
  const buttonRule = cssRule(".action-nav .slot");
  const selectedRule = cssRule(".action-nav .slot.selected");
  const hoverRule = cssSource.match(/\.action-nav \.slot:hover,[\s\S]*?\.action-nav \.slot\.previewed\s*\{[\s\S]*?\n\}/)?.[0] || "";
  const screenRule = cssRule(".v2-action-phase-screen");
  const destinationGridRule = cssRule(".action-nav .grid");
  assert.match(actionNavRule, /overflow-anchor:\s*none/);
  assert.match(indexHtml, /styles\.css[^]*ui\/action-destination-bar\.css[^]*ui\/action-phase-shell\.css/);
  assert.match(screenRule, /height:\s*calc\(100dvh - var\(--game-shell-header-height,52px\)\)/);
  assert.match(screenRule, /gap:\s*var\(--v2-action-shell-stage-gap\)/);
  assert.match(actionDestinationBarCss, /\.action-nav\s*\{[\s\S]*flex:\s*0 0 auto/);
  assert.match(cssSource, /\.action-nav \.topline\s*\{/);
  assert.match(destinationGridRule, /grid-template-columns:\s*repeat\(10, minmax\(0, 1fr\)\)/);
  assert.match(destinationGridRule, /grid-template-rows:\s*34px 34px/);
  assert.match(cssSource, /\.action-nav \.s1\s*\{[\s\S]*grid-row:\s*1[\s\S]*grid-column:\s*2 \/ span 2/);
  assert.match(cssSource, /\.action-nav \.s4\s*\{[\s\S]*grid-row:\s*1[\s\S]*grid-column:\s*8 \/ span 2/);
  assert.match(cssSource, /\.action-nav \.s9\s*\{[\s\S]*grid-row:\s*2[\s\S]*grid-column:\s*9 \/ span 2/);
  assert.match(cssSource, /\.action-nav\[data-v2-action-destination-bonus-granted="false"\] \.s9\s*\{[\s\S]*visibility:\s*hidden/);
  assert.match(cssSource, /\.action-nav \*,\s*\.action-nav \*::before,\s*\.action-nav \*::after\s*\{[\s\S]*box-sizing:\s*border-box/);
  assert.match(buttonRule, /height:\s*34px/);
  assert.match(buttonRule, /clip-path:\s*polygon\(6% 0, 100% 0, 94% 100%, 0 100%\)/);
  assert.doesNotMatch(functionBody("renderV2ActionDestinationNavigator"), /destination\.kicker \|\| "Action Location"/);
  const shellStageRule = actionPhaseShellCss.match(/(?:^|\n)\.v2-action-destination-stage\s*\{[\s\S]*?\n\}/)?.[0] || "";
  assert.match(shellStageRule, /flex:\s*1 1 auto/);
  assert.match(shellStageRule, /overflow:\s*hidden/);
  assert.match(actionPhaseShellCss, /background-image:\s*var\(--v2-action-destination-art\)/);
  assert.match(actionPhaseShellCss, /filter:\s*brightness\(var\(--v2-action-art-brightness\)\) saturate\(var\(--v2-action-art-saturation\)\)/);
  assert.ok(fs.existsSync(path.join(projectRoot, "assets", "action-phase", "route-encounter-plate.png")), "Route Encounter plate should be copied into repo assets");
  assert.ok(fs.existsSync(path.join(projectRoot, "assets", "action-phase", "battle-frontier-plate.png")), "Battle Frontier plate should be copied into repo assets");
  ["department-store", "game-corner", "graveyard", "ranger-base", "pokemon-center", "bulletin-board"].forEach((plateName) => {
    assert.ok(fs.existsSync(path.join(projectRoot, "assets", "action-phase", `${plateName}-plate.png`)), `${plateName} plate should be copied into repo assets`);
    assert.match(appJs, new RegExp(`assets/action-phase/${plateName}-plate\\.png`));
  });
  assert.match(functionBody("v2ActionDestinationStageArt"), /routes:\s*\{\s*image:\s*"\/assets\/action-phase\/route-encounter-plate\.png", position:\s*"63% center"/);
  assert.match(functionBody("v2ActionDestinationStageArt"), /"battle-tent":\s*\{\s*image:\s*"\/assets\/action-phase\/battle-frontier-plate\.png", position:\s*"64% center"/);
  assert.doesNotMatch(cssSource, /\.v2-route-scenery\s*\{/);
  assert.doesNotMatch(cssSource, /\.v2-action-location-landing::before\s*\{[\s\S]*repeating-linear-gradient/);
  assert.doesNotMatch(cssSource, /\.v2-battle-tent-op\s*\{/);
  assert.doesNotMatch(shellStageRule, /overflow-y:\s*auto/);
  assert.doesNotMatch(shellStageRule, /(?:^|\n)\s*height:\s*var\(--v2-action-destination-workspace/);
  assert.doesNotMatch(cssSource, /\.v2-action-destination-strip\s*\{/);
  assert.doesNotMatch(cssSource, /data-v2-action-preview-bar/);
  assert.doesNotMatch(cssSource, /\.v2-action-preview-grid\s*\{/);
  assert.doesNotMatch(cssSource, /\.v2-action-preview-slot\s*\{/);
  assert.doesNotMatch(cssSource, /\.v2-action-destination-preview-stack/);
  assert.doesNotMatch(cssSource, /\.v2-action-destination-panel/);
  assert.doesNotMatch(presentationCss, /\.v2-action-destination-(navigator|header|slot|button|symbol|number|copy)\b/);
  assert.doesNotMatch(buttonRule, /translate|scale/);
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
