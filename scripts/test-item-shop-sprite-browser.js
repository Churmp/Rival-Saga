"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawn } = require("node:child_process");
const { test, before, after } = require("node:test");
const {
  controlStateFixture,
  saveGame,
  startTemporaryServer,
  stopTemporaryServer
} = require("./token-controller-test-fixture.js");

const rootDir = path.resolve(__dirname, "..");
let server;
let browserProcess;
let browserProfile;
let cdp;
const browserDiagnostics = [];
const browserErrors = [];
const externalRequests = [];

function actionableBrowserErrors() {
  return browserErrors.filter((message) => !/beforeunload.*confirmation panel/.test(message));
}

function actionableExternalRequests() {
  return externalRequests.filter((url) => !/chromestatus\.com\/feature\/5082396709879808/.test(url));
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function availablePort() {
  const net = require("node:net");
  const listener = net.createServer();
  await new Promise((resolve, reject) => listener.listen(0, "127.0.0.1", resolve).once("error", reject));
  const port = listener.address().port;
  await new Promise((resolve) => listener.close(resolve));
  return port;
}

function browserExecutable() {
  const candidates = [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
  ];
  const executable = candidates.find((candidate) => fs.existsSync(candidate));
  if (!executable) throw new Error("No supported Chromium browser was found for Item Shop sprite browser QA.");
  return executable;
}

async function waitForJson(url, timeoutMs = 10000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return response.json();
    } catch {
      // Chromium is still opening its debugging endpoint.
    }
    await delay(50);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

class CdpClient {
  constructor(url) {
    this.socket = new WebSocket(url);
    this.sequence = 0;
    this.pending = new Map();
    this.listeners = new Map();
  }

  async open() {
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error("Timed out opening the Chromium debugging socket.")), 10000);
      this.socket.addEventListener("open", () => {
        clearTimeout(timeout);
        resolve();
      }, { once: true });
      this.socket.addEventListener("error", (event) => {
        clearTimeout(timeout);
        reject(event);
      }, { once: true });
    });
    this.socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(message.error.message));
        else pending.resolve(message.result || {});
        return;
      }
      (this.listeners.get(message.method) || []).forEach((listener) => listener(message.params || {}));
    });
  }

  send(method, params = {}, timeoutMs = 10000) {
    const id = ++this.sequence;
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`Timed out waiting for Chromium command ${method}.`));
      }, timeoutMs);
      this.pending.set(id, {
        method,
        resolve: (value) => {
          clearTimeout(timeout);
          resolve(value);
        },
        reject: (error) => {
          clearTimeout(timeout);
          reject(error);
        }
      });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  on(method, listener) {
    if (!this.listeners.has(method)) this.listeners.set(method, []);
    this.listeners.get(method).push(listener);
  }

  async close() {
    if (this.socket.readyState === WebSocket.OPEN) this.socket.close();
  }
}

async function evaluate(expression, timeoutMs = 10000) {
  const result = await cdp.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true
  }, timeoutMs);
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text || "Browser evaluation failed.");
  }
  return result.result?.value;
}

async function waitUntil(expression, timeoutMs = 10000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    if (await evaluate(`Boolean(${expression})`)) return;
    await delay(50);
  }
  throw new Error(`Timed out waiting for browser condition: ${expression}`);
}

async function captureShopHudScreenshot(name, height = 250) {
  const outputDir = process.env.RIVAL_SAGA_SHOP_SCREENSHOT_DIR || path.join(rootDir, "artifacts", "item-shop-front-page");
  fs.mkdirSync(outputDir, { recursive: true });
  const metrics = await evaluate(`(() => ({ width: window.innerWidth, height: window.innerHeight }))()`);
  const width = Math.min(Number(metrics.width) || 1280, 1280);
  const captureHeight = Math.min(Number(height) || 250, Number(metrics.height) || height || 250);
  const result = await cdp.send("Page.captureScreenshot", {
    format: "png",
    clip: { x: 0, y: 0, width, height: captureHeight, scale: 1 },
    captureBeyondViewport: true
  }, 10000);
  const filePath = path.join(outputDir, name);
  fs.writeFileSync(filePath, Buffer.from(result.data, "base64"));
  return filePath;
}

before(async () => {
  server = await startTemporaryServer("item-shop-sprite-browser");
  const fixtureState = controlStateFixture("item-shop-sprite-browser");
  fixtureState.activePage = "playerHub";
  fixtureState.activeView = "shop";
  fixtureState.activeShop = "items";
  fixtureState.activePlayerId = "gold";
  fixtureState.players.forEach((player) => {
    player.balance = 1000;
  });
  await saveGame(server.baseUrl, "default", fixtureState, 0);
  const debuggingPort = await availablePort();
  browserProfile = fs.mkdtempSync(path.join(os.tmpdir(), "rival-saga-item-shop-sprite-browser-"));
  browserProcess = spawn(browserExecutable(), [
    "--headless=new",
    `--remote-debugging-port=${debuggingPort}`,
    "--remote-allow-origins=*",
    `--user-data-dir=${browserProfile}`,
    "--disable-background-networking",
    "--disable-cache",
    "--disable-component-update",
    "--disable-default-apps",
    "--disable-extensions",
    "--disable-gpu",
    "--disable-gpu-sandbox",
    "--no-sandbox",
    "--no-first-run",
    "--no-default-browser-check",
    "--window-size=1280,900",
    "about:blank"
  ], { stdio: ["ignore", "ignore", "pipe"] });
  browserProcess.stderr.on("data", (chunk) => {
    if (browserDiagnostics.join("").length < 20000) browserDiagnostics.push(String(chunk).trim());
  });

  await waitForJson(`http://127.0.0.1:${debuggingPort}/json/version`);
  const targets = await waitForJson(`http://127.0.0.1:${debuggingPort}/json/list`);
  const page = targets.find((target) => target.type === "page");
  if (!page?.webSocketDebuggerUrl) throw new Error("Chromium did not expose a debuggable page.");
  cdp = new CdpClient(page.webSocketDebuggerUrl);
  await cdp.open();
  await Promise.all([
    cdp.send("Page.enable"),
    cdp.send("Runtime.enable"),
    cdp.send("Log.enable"),
    cdp.send("Network.enable")
  ]);
  await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
  await cdp.send("Network.setBlockedURLs", { urls: ["https://*"] });
  cdp.on("Network.requestWillBeSent", ({ request }) => {
    const url = request?.url || "";
    if (/^https?:\/\//.test(url) && !url.startsWith(server.baseUrl)) externalRequests.push(url);
  });
  cdp.on("Runtime.exceptionThrown", (params) => browserErrors.push(params.exceptionDetails?.exception?.description || params.exceptionDetails?.text || "Uncaught exception"));
  cdp.on("Page.javascriptDialogOpening", () => {
    cdp.send("Page.handleJavaScriptDialog", { accept: true }).catch(() => {});
  });
  cdp.on("Runtime.consoleAPICalled", (params) => {
    const message = params.args.map((arg) => arg.value || arg.description || "").join(" ");
    if (params.type === "error" && !/beforeunload.*confirmation panel/.test(message)) browserErrors.push(message);
  });
  cdp.on("Log.entryAdded", ({ entry }) => {
    const message = `${entry?.text || "Browser log error"}${entry?.url ? ` (${entry.url})` : ""}`;
    if (entry?.level === "error" && !/favicon\.ico|\/api\/games\/default\/state|beforeunload.*confirmation panel/.test(message)) browserErrors.push(message);
  });
});

after(async () => {
  if (cdp) {
    try {
      await cdp.send("Browser.close", {}, 3000);
    } catch {
      // Chromium may close before acknowledging shutdown.
    }
    await cdp.close();
  }
  if (browserProcess && browserProcess.exitCode === null) {
    const exited = new Promise((resolve) => browserProcess.once("exit", resolve));
    browserProcess.kill();
    await Promise.race([exited, delay(3000)]);
  }
  if (browserProfile && fs.existsSync(browserProfile)) {
    fs.rmSync(browserProfile, { recursive: true, force: true, maxRetries: 3, retryDelay: 50 });
  }
  await stopTemporaryServer(server);
});

test("[ITEM-SPRITE-BROWSER-001] restored Item Shop products render local sprites in the live DOM", async () => {
  await cdp.send("Page.navigate", { url: `${server.baseUrl}/?view=game&game=default&page=playerHub&panel=shop&item-shop-sprite-browser=${Date.now()}` });
  await waitUntil("document.readyState === 'complete' || document.readyState === 'interactive'");
  await waitUntil("Boolean(window.rivalSagaShopSpriteData?.items)");
  const runtime = await evaluate(`(() => {
    const scripts = [...document.scripts].map((script) => script.src);
    const spriteIndex = scripts.findIndex((src) => src.includes('shop-sprite-data.js'));
    const appIndex = scripts.findIndex((src) => src.includes('app.js'));
    return {
      spriteBeforeApp: spriteIndex >= 0 && appIndex >= 0 && spriteIndex < appIndex,
      mappingCount: Object.keys(window.rivalSagaShopSpriteData?.items || {}).length,
      requestedKeys: Object.fromEntries(['covert-cloak', 'booster-energy', 'loaded-dice', 'heavy-duty-boots', 'ability-shield', 'room-service', 'badge-point', 'legacy-ticket', 'kommonium-z', 'aloraichium-z', 'decidium-z', 'eevium-z', 'incinium-z', 'lunalium-z', 'lycanium-z', 'marshadium-z', 'mewnium-z', 'mimikium-z', 'pikanium-z', 'pikashunium-z', 'primarium-z', 'snorlium-z', 'solganium-z', 'tapunium-z', 'ultranecrozium-z'].map((key) => [key, Boolean(window.rivalSagaShopSpriteData.items[key])]))
    };
  })()`);
  assert.equal(runtime.spriteBeforeApp, true);
  assert.equal(runtime.mappingCount, 288);
  assert.deepEqual(runtime.requestedKeys, {
    "covert-cloak": true,
    "booster-energy": true,
    "loaded-dice": true,
    "heavy-duty-boots": true,
    "ability-shield": true,
    "room-service": true,
    "badge-point": true,
    "legacy-ticket": true,
    "kommonium-z": true,
    "aloraichium-z": true,
    "decidium-z": true,
    "eevium-z": true,
    "incinium-z": true,
    "lunalium-z": true,
    "lycanium-z": true,
    "marshadium-z": true,
    "mewnium-z": true,
    "mimikium-z": true,
    "pikanium-z": true,
    "pikashunium-z": true,
    "primarium-z": true,
    "snorlium-z": true,
    "solganium-z": true,
    "tapunium-z": true,
    "ultranecrozium-z": true
  });

  await evaluate("document.querySelector('[data-view=\"shop\"]')?.click()");
  await waitUntil("Boolean(document.querySelector('#searchInput'))");
  await waitUntil("typeof state !== 'undefined' && typeof render === 'function' && typeof phaseStateKey === 'function'");
  const reports = await evaluate(`(async () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    state.activePlayerId = 'gold';
    const player = state.players.find((entry) => entry.id === 'gold');
    if (player) player.balance = 10000;
    state.currentPhase = 'shop';
    state.phase = 'shop';
    state.phaseState ||= {};
    const phaseKey = phaseStateKey(state.series, state.gym);
    state.phaseState[phaseKey] ||= {};
    state.phaseState[phaseKey].currentPhase = 'shop';
    render();
    await sleep(150);
    const names = ['Covert Cloak', 'Booster Energy', 'Loaded Dice', 'Heavy-Duty Boots', 'Ability Shield', 'Room Service', 'Badge Point', 'Legacy Ticket', 'Kommonium Z', 'Aloraichium Z', 'Decidium Z', 'Eevium Z', 'Incinium Z', 'Lunalium Z', 'Lycanium Z', 'Marshadium Z', 'Mewnium Z', 'Mimikium Z', 'Pikanium Z', 'Pikashunium Z', 'Primarium Z', 'Snorlium Z', 'Solganium Z', 'Tapunium Z', 'Ultranecrozium Z'];
    const output = [];
    for (const name of names) {
      const input = document.querySelector('#searchInput');
      input.value = name;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      const started = Date.now();
      while (Date.now() - started < 3000) {
        const hasCard = [...document.querySelectorAll('#shopGrid .shop-row:not([data-item-shop-folder])')]
          .some((row) => row.querySelector('.shop-name-cell strong')?.textContent?.trim() === name);
        if (hasCard) break;
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
      const card = [...document.querySelectorAll('#shopGrid .shop-row:not([data-item-shop-folder])')]
        .find((row) => row.querySelector('.shop-name-cell strong')?.textContent?.trim() === name);
      const img = card?.querySelector('img[data-shop-sprite]');
      if (img && !img.complete) {
        await new Promise((resolve) => {
          img.addEventListener('load', resolve, { once: true });
          img.addEventListener('error', resolve, { once: true });
          setTimeout(resolve, 1500);
        });
      }
      const key = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      const localSprite = window.rivalSagaShopSpriteData.items[key]?.localSprite || '';
      const response = localSprite ? await fetch(localSprite, { cache: 'no-store' }) : null;
      output.push({
        name,
        found: Boolean(card),
        imgExists: Boolean(img),
        attrSrc: img?.getAttribute('src') || '',
        currentSrc: img?.currentSrc || '',
        naturalWidth: img?.naturalWidth || 0,
        localSprite,
        localStatus: response?.status || 0,
        labelOpacity: card ? getComputedStyle(card.querySelector('.shop-entry-visual b')).opacity : '',
        buttonText: card?.querySelector('.shop-buy-button')?.textContent?.trim() || '',
        buttonDisabled: Boolean(card?.querySelector('.shop-buy-button')?.disabled),
        buyNowText: card?.querySelector('.shop-buy-now-button')?.textContent?.trim() || '',
        buyNowDisabled: Boolean(card?.querySelector('.shop-buy-now-button')?.disabled),
        priceText: card?.querySelector('.price')?.textContent?.replace(/\\s+/g, ' ').trim() || '',
        runtimePrice: card && itemShopData.find((entry) => entry.name === name) ? discountedShopPrice(itemShopData.find((entry) => entry.name === name), state.activeShop, activePlayer()) : null,
        runtimeBalance: Number(activePlayer()?.balance || 0),
        diagnostics: card ? null : {
          bodyClasses: document.body.className,
          activeViewButton: document.querySelector('.app-tab.active')?.textContent?.trim() || '',
          gridText: document.querySelector('#shopGrid')?.textContent?.replace(/\\s+/g, ' ').trim().slice(0, 240) || '',
          resultNames: [...document.querySelectorAll('#shopGrid .shop-name-cell strong')].map((node) => node.textContent.trim()).slice(0, 12)
        }
      });
    }
    return output;
  })()`, 20000);

  for (const report of reports) {
    assert.equal(report.found, true, `${report.name} card should render: ${JSON.stringify(report.diagnostics)}`);
    assert.equal(report.imgExists, true, `${report.name} should render an image element`);
    assert.equal(report.currentSrc, `${server.baseUrl}/${report.localSprite}`, `${report.name} should use its local shop sprite`);
    assert.ok(report.currentSrc.includes("/assets/shop/items/") || report.currentSrc.includes("/assets/shop/custom/"), `${report.name} should point into local shop assets`);
    assert.ok(report.naturalWidth > 0, `${report.name} sprite should load`);
    assert.equal(report.localStatus, 200, `${report.name} local sprite should return HTTP 200`);
    assert.equal(report.labelOpacity, "0", `${report.name} initials label should be hidden behind the image`);
  }
  reports.filter((report) => report.name.endsWith("ium Z")).forEach((report) => {
    assert.equal(report.buttonText, "Add", `${report.name} should be addable after standard pricing`);
    assert.equal(report.buttonDisabled, false, `${report.name} add button should be enabled`);
    assert.equal(report.buyNowText, "Buy Now", `${report.name} should expose Buy Now`);
    assert.equal(report.buyNowDisabled, false, `${report.name} Buy Now should be enabled with enough funds: ${JSON.stringify(report)}`);
    assert.match(report.priceText, /7,500/, `${report.name} should show the standard Z-Crystal price`);
  });
  const kommoniumReport = reports.find((report) => report.name === "Kommonium Z");
  assert.equal(kommoniumReport?.buttonText, "Add");
  assert.match(kommoniumReport?.priceText || "", /7,500/);
  assert.deepEqual(actionableBrowserErrors(), []);
  assert.deepEqual(actionableExternalRequests(), []);
});

test("[ITEM-SHOP-RECOMMENDATIONS-001] Item Shop root personalizes species mechanic shortcuts from metadata", async () => {
  await cdp.send("Page.navigate", { url: `${server.baseUrl}/?view=game&game=default&page=playerHub&panel=shop&item-shop-recommendations=${Date.now()}` });
  await waitUntil("document.readyState === 'complete' || document.readyState === 'interactive'");
  await waitUntil("document.querySelector('.item-shop-browse-copy h3')?.textContent?.trim() === 'Items'");

  const report = await evaluate(`(async () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const allNames = () => [...document.querySelectorAll('#shopGrid .shop-name-cell strong')].map((node) => node.textContent.trim());
    const recommendationNames = () => [...document.querySelectorAll('.item-shop-recommendation-section .shop-name-cell strong')].map((node) => node.textContent.trim());
    const sectionTitles = () => [...document.querySelectorAll('#shopGrid > .shop-tier-section .shop-tier-header h3')].map((node) => node.textContent.trim());
    const resetRoot = async () => {
      state.activePlayerId = 'gold';
      state.activeShop = 'items';
      state.itemShopFolderPath = [];
      state.itemShopFilters = { group: 'all', roles: [], tags: [], canAfford: false, expanded: false };
      document.querySelector('#searchInput').value = '';
      render();
      saveClientUiState({ immediate: true });
      await sleep(150);
    };
    const pokemonRecord = (trainerId, name, rosterType = 'Active') => ({
      id: \`\${trainerId}-\${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}\`,
      trainerId,
      ownerId: trainerId,
      name,
      currentSpecies: name,
      baseSpecies: name,
      rosterSpeciesName: name,
      acquiredSpeciesName: name,
      status: 'Active',
      rosterType
    });
    const setPokemon = async (records) => {
      state.pokemonRecords = records;
      syncPlayerPokemonLists(state);
      await resetRoot();
    };
    const clickFolder = async (name) => {
      const card = [...document.querySelectorAll('#shopGrid [data-item-shop-folder]')]
        .find((row) => row.querySelector('.shop-name-cell strong')?.textContent?.trim() === name);
      card?.click();
      await sleep(150);
    };
    const setSearch = async (term) => {
      const input = document.querySelector('#searchInput');
      input.value = term;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await sleep(150);
    };

    await setPokemon([]);
    const defaultRootNames = allNames();
    const defaultRecommendations = recommendationNames();
    const defaultSections = sectionTitles();
    const kangaskhaniteMetadata = itemShopData.find((item) => item.name === 'Kangaskhanite')?.eligibility || null;
    const metagrossiteMetadata = itemShopData.find((item) => item.name === 'Metagrossite')?.eligibility || null;
    const kommoniumMetadata = itemShopData.find((item) => item.name === 'Kommonium Z')?.eligibility || null;
    const mimikiumMetadata = itemShopData.find((item) => item.name === 'Mimikium Z')?.eligibility || null;
    const snorliumMetadata = itemShopData.find((item) => item.name === 'Snorlium Z')?.eligibility || null;

    await setPokemon([pokemonRecord('gold', 'Kangaskhan')]);
    const kangaskhanRecommendations = recommendationNames();

    await setPokemon([]);
    const removedRecommendations = recommendationNames();

    const otherPlayerId = state.players.find((player) => player.id !== 'gold')?.id || 'steevee';
    await setPokemon([pokemonRecord(otherPlayerId, 'Kangaskhan')]);
    const unrelatedRecommendations = recommendationNames();

    await setPokemon([pokemonRecord('gold', 'Kangaskhan', 'Legacy')]);
    const legacyRecommendations = recommendationNames();

    await setPokemon([pokemonRecord('gold', 'Kommo-o')]);
    const zRecommendations = recommendationNames();

    await setPokemon([pokemonRecord('gold', 'Kangaskhan'), pokemonRecord('gold', 'Metagross'), pokemonRecord('gold', 'Kommo-o'), pokemonRecord('gold', 'Mimikyu'), pokemonRecord('gold', 'Snorlax')]);
    const teamRecommendations = recommendationNames();
    const teamSections = sectionTitles();

    await setPokemon([pokemonRecord('gold', 'Mimikyu')]);
    const mimikyuRecommendations = recommendationNames();
    const affordInput = document.querySelector('#itemShopCanAffordFilter');
    if (affordInput && !affordInput.checked) affordInput.click();
    await sleep(150);
    const affordableMimikyuRecommendations = recommendationNames();
    if (affordInput?.checked) affordInput.click();
    await sleep(150);
    const goldPlayer = state.players.find((player) => player.id === 'gold');
    const originalGoldBalance = goldPlayer?.balance || 0;
    if (goldPlayer) goldPlayer.balance = 10000;
    render();
    await sleep(150);
    const pricedAffordInput = document.querySelector('#itemShopCanAffordFilter');
    if (pricedAffordInput && !pricedAffordInput.checked) pricedAffordInput.click();
    await sleep(150);
    const affordablePricedMimikyuRecommendations = recommendationNames();
    if (pricedAffordInput?.checked) pricedAffordInput.click();
    if (goldPlayer) goldPlayer.balance = originalGoldBalance;
    render();
    await sleep(150);

    const searchReports = {};
    for (const term of ['Kangaskhanite', 'Badge Point', 'Legacy Ticket', 'Mimikium Z']) {
      await setSearch(term);
      searchReports[term] = {
        title: document.querySelector('.item-shop-browse-copy h3')?.textContent?.trim() || '',
        names: allNames()
      };
    }
    await setSearch('');

    await setPokemon([pokemonRecord('gold', 'Kangaskhan')]);
    await clickFolder('Battle Mechanics');
    await clickFolder('Mega Shop');
    const megaTitle = document.querySelector('.item-shop-browse-copy h3')?.textContent?.trim() || '';
    const megaNames = allNames();
    await resetRoot();
    await clickFolder('Battle Mechanics');
    await clickFolder('Z Shop');
    const zTitle = document.querySelector('.item-shop-browse-copy h3')?.textContent?.trim() || '';
    const zNames = allNames();
    await resetRoot();

    return {
      defaultRootNames,
      defaultRecommendations,
      defaultSections,
      kangaskhaniteMetadata,
      metagrossiteMetadata,
      kommoniumMetadata,
      mimikiumMetadata,
      snorliumMetadata,
      kangaskhanRecommendations,
      removedRecommendations,
      unrelatedRecommendations,
      legacyRecommendations,
      zRecommendations,
      teamRecommendations,
      teamSections,
      mimikyuRecommendations,
      affordableMimikyuRecommendations,
      affordablePricedMimikyuRecommendations,
      searchReports,
      megaTitle,
      megaNames,
      zTitle,
      zNames
    };
  })()`, 20000);

  ["Normalium Z", "Kommonium Z", "Kangaskhanite", "Metagrossite"].forEach((name) => {
    assert.equal(report.defaultRootNames.includes(name), false, `${name} should not be on the default root`);
  });
  assert.deepEqual(report.defaultRecommendations, []);
  assert.deepEqual(report.defaultSections, ["Main Shop", "Collections"]);
  assert.deepEqual(report.kangaskhaniteMetadata, { pokemonSpecies: ["Kangaskhan"] });
  assert.deepEqual(report.metagrossiteMetadata, { pokemonSpecies: ["Metagross"] });
  assert.deepEqual(report.kommoniumMetadata, { pokemonSpecies: ["Kommo-o"] });
  assert.deepEqual(report.mimikiumMetadata, { pokemonSpecies: ["Mimikyu"] });
  assert.deepEqual(report.snorliumMetadata, { pokemonSpecies: ["Snorlax"] });
  assert.ok(report.kangaskhanRecommendations.includes("Kangaskhanite"));
  assert.equal(report.removedRecommendations.includes("Kangaskhanite"), false);
  assert.equal(report.unrelatedRecommendations.includes("Kangaskhanite"), false);
  assert.equal(report.legacyRecommendations.includes("Kangaskhanite"), false);
  assert.ok(report.zRecommendations.includes("Kommonium Z"));
  assert.equal(report.zRecommendations.includes("Normalium Z"), false);
  assert.deepEqual(report.teamSections, ["For Your Team", "Main Shop", "Collections"]);
  ["Kangaskhanite", "Metagrossite", "Kommonium Z", "Mimikium Z", "Snorlium Z"].forEach((name) => {
    assert.ok(report.teamRecommendations.includes(name), `${name} should recommend from active ownership metadata`);
  });
  assert.ok(report.mimikyuRecommendations.includes("Mimikium Z"));
  assert.equal(report.affordableMimikyuRecommendations.includes("Mimikium Z"), false, "Can Afford should hide recommendation shortcuts the player cannot afford");
  assert.ok(report.affordablePricedMimikyuRecommendations.includes("Mimikium Z"), "Can Afford should keep priced Z recommendations when the player has enough funds");
  Object.entries(report.searchReports).forEach(([term, searchReport]) => {
    assert.equal(searchReport.title, "Filtered Results", `${term} search should flatten to results`);
    assert.ok(searchReport.names.includes(term), `${term} search should show the concrete product`);
  });
  assert.equal(report.megaTitle, "Mega Shop");
  assert.ok(report.megaNames.includes("Kangaskhanite"), "recommendation should not remove Kangaskhanite from Mega Shop");
  assert.equal(report.zTitle, "Z Shop");
  assert.ok(report.zNames.includes("Mimikium Z"), "species-specific Z-Crystals should remain in Z Shop");
  await captureShopHudScreenshot("shop-root-with-recommendations.png", 720);
  assert.deepEqual(actionableBrowserErrors(), []);
  assert.deepEqual(actionableExternalRequests(), []);
});

async function runItemShopRecommendationDrawerBrowserCheck() {
  const preferenceKey = "rival-saga-item-shop-recommendation-drawer-v1";
  const gameId = "recommendation-drawer";
  const otherGameId = "recommendation-drawer-other";
  const pokemonRecord = (trainerId, name, rosterType = "Active") => ({
    id: `${trainerId}-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    trainerId,
    ownerId: trainerId,
    name,
    currentSpecies: name,
    baseSpecies: name,
    rosterSpeciesName: name,
    acquiredSpeciesName: name,
    status: "Active",
    rosterType
  });
  const fixtureState = controlStateFixture("item-shop-recommendation-drawer");
  const otherPlayerId = fixtureState.players.find((player) => player.id !== "gold")?.id || "steevee";
  fixtureState.activePage = "playerHub";
  fixtureState.activeView = "shop";
  fixtureState.activeShop = "items";
  fixtureState.activePlayerId = "gold";
  fixtureState.players.forEach((player) => {
    player.balance = 10000;
  });
  fixtureState.pokemonRecords = [
    pokemonRecord("gold", "Kangaskhan"),
    pokemonRecord(otherPlayerId, "Kangaskhan")
  ];
  await saveGame(server.baseUrl, gameId, fixtureState, 0);

  const otherFixtureState = controlStateFixture("item-shop-recommendation-drawer-other");
  otherFixtureState.activePage = "playerHub";
  otherFixtureState.activeView = "shop";
  otherFixtureState.activeShop = "items";
  otherFixtureState.activePlayerId = "gold";
  otherFixtureState.players.forEach((player) => {
    player.balance = 10000;
  });
  otherFixtureState.pokemonRecords = [pokemonRecord("gold", "Kangaskhan")];
  await saveGame(server.baseUrl, otherGameId, otherFixtureState, 0);

  const snapshot = () => evaluate(`(() => {
    const sections = [...document.querySelectorAll('#shopGrid > .shop-tier-section')];
    const recommendation = document.querySelector('.item-shop-recommendation-section');
    const main = document.querySelector('.item-shop-main-section');
    const first = sections[0] || null;
    let preferences = {};
    try { preferences = JSON.parse(localStorage.getItem('${preferenceKey}') || '{}'); } catch {}
    return {
      gameId: backendSync.gameId || backendGameId(),
      activePlayerId: state.activePlayerId,
      recommendationVisible: Boolean(recommendation),
      recommendationNames: [...document.querySelectorAll('.item-shop-recommendation-section .shop-name-cell strong')].map((node) => node.textContent.trim()),
      dismissTitle: recommendation?.querySelector('[data-item-shop-recommendations-dismiss]')?.getAttribute('title') || '',
      dismissText: recommendation?.querySelector('[data-item-shop-recommendations-dismiss]')?.textContent?.trim() || '',
      restoreVisible: Boolean(document.querySelector('[data-item-shop-recommendations-restore]')),
      restoreText: document.querySelector('[data-item-shop-recommendations-restore]')?.textContent?.trim() || '',
      sectionTitles: sections.map((section) => section.querySelector('.shop-tier-header h3')?.textContent?.trim() || ''),
      firstSectionTitle: first?.querySelector('.shop-tier-header h3')?.textContent?.trim() || '',
      firstSectionClass: first?.className || '',
      firstSectionIsMain: first === main,
      placeholderGone: !document.querySelector('.item-shop-recommendation-section') && !document.querySelector('.item-shop-recommendation-grid'),
      saveRequestedRevision: backendSync.saveRequestedRevision,
      savePersistedRevision: backendSync.savePersistedRevision,
      saveTimerQueued: Boolean(backendSync.saveTimer),
      preferences
    };
  })()`);
  await evaluate(`(async () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const record = (trainerId, name) => ({
      id: \`\${trainerId}-\${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}\`,
      trainerId,
      ownerId: trainerId,
      name,
      currentSpecies: name,
      baseSpecies: name,
      rosterSpeciesName: name,
      acquiredSpeciesName: name,
      status: 'Active',
      rosterType: 'Active'
    });
    localStorage.removeItem('${preferenceKey}');
    localStorage.setItem('rival-saga-backend-game-id', '${gameId}');
    history.replaceState(null, '', '/?view=game&game=${gameId}&page=playerHub&panel=shop&item-shop-drawer=initial');
    backendSync.gameId = '${gameId}';
    state.activePage = 'playerHub';
    state.activeView = 'shop';
    state.activeShop = 'items';
    state.activePlayerId = 'gold';
    state.itemShopFolderPath = [];
    state.itemShopFilters = { group: 'all', roles: [], tags: [], canAfford: false, expanded: false };
    state.players.forEach((player) => { player.balance = 10000; });
    state.pokemonRecords = [record('gold', 'Kangaskhan'), record('${otherPlayerId}', 'Kangaskhan')];
    syncPlayerPokemonLists(state);
    document.querySelector('#searchInput').value = '';
    render();
    await sleep(150);
  })()`, 30000);
  const initial = await snapshot();
  assert.equal(initial.recommendationVisible, true);
  assert.ok(initial.recommendationNames.includes("Kangaskhanite"));
  assert.equal(initial.dismissTitle, "Hide recommendations");
  assert.equal(initial.dismissText, "×");
  assert.equal(initial.restoreVisible, false);
  assert.deepEqual(initial.sectionTitles, ["For Your Team", "Main Shop", "Collections"]);

  await evaluate(`(async () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    document.querySelector('[data-item-shop-recommendations-dismiss]')?.click();
    await sleep(150);
  })()`);
  const collapsed = await snapshot();
  assert.equal(collapsed.recommendationVisible, false);
  assert.equal(collapsed.placeholderGone, true);
  assert.equal(collapsed.firstSectionIsMain, true);
  assert.equal(collapsed.firstSectionTitle, "Main Shop");
  assert.equal(collapsed.restoreVisible, true);
  assert.equal(collapsed.restoreText, "Show recommendations");
  assert.equal(collapsed.preferences[gameId]?.gold, true);
  assert.equal(collapsed.saveRequestedRevision, initial.saveRequestedRevision);
  assert.equal(collapsed.savePersistedRevision, initial.savePersistedRevision);
  assert.equal(collapsed.saveTimerQueued, false);

  await cdp.send("Page.reload", { ignoreCache: true });
  await waitUntil("document.querySelector('.item-shop-browse-copy h3')?.textContent?.trim() === 'Items'");
  const afterRefresh = await snapshot();
  assert.equal(afterRefresh.recommendationVisible, false);
  assert.equal(afterRefresh.firstSectionIsMain, true);
  assert.equal(afterRefresh.restoreVisible, true);

  await evaluate(`(async () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const record = (trainerId, name) => ({
      id: \`\${trainerId}-\${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}\`,
      trainerId,
      ownerId: trainerId,
      name,
      currentSpecies: name,
      baseSpecies: name,
      rosterSpeciesName: name,
      acquiredSpeciesName: name,
      status: 'Active',
      rosterType: 'Active'
    });
    state.activePlayerId = 'gold';
    state.pokemonRecords = [record('gold', 'Metagross'), record('${otherPlayerId}', 'Kangaskhan')];
    syncPlayerPokemonLists(state);
    state.activeShop = 'items';
    state.itemShopFolderPath = [];
    state.itemShopFilters = { group: 'all', roles: [], tags: [], canAfford: false, expanded: false };
    document.querySelector('#searchInput').value = '';
    render();
    await sleep(150);
  })()`);
  const afterEligibilityChange = await snapshot();
  assert.equal(afterEligibilityChange.recommendationVisible, false);
  assert.equal(afterEligibilityChange.restoreVisible, true);
  assert.equal(afterEligibilityChange.firstSectionIsMain, true);

  await evaluate(`(async () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    state.activePlayerId = '${otherPlayerId}';
    render();
    await sleep(150);
  })()`);
  const otherPlayer = await snapshot();
  assert.equal(otherPlayer.activePlayerId, otherPlayerId);
  assert.equal(otherPlayer.recommendationVisible, true);
  assert.ok(otherPlayer.recommendationNames.includes("Kangaskhanite"));
  assert.equal(otherPlayer.restoreVisible, false);

  await evaluate(`(async () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const record = (trainerId, name) => ({
      id: \`\${trainerId}-\${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}\`,
      trainerId,
      ownerId: trainerId,
      name,
      currentSpecies: name,
      baseSpecies: name,
      rosterSpeciesName: name,
      acquiredSpeciesName: name,
      status: 'Active',
      rosterType: 'Active'
    });
    localStorage.setItem('rival-saga-backend-game-id', '${otherGameId}');
    history.replaceState(null, '', '/?view=game&game=${otherGameId}&page=playerHub&panel=shop&item-shop-drawer=other-game');
    backendSync.gameId = '${otherGameId}';
    state.activePlayerId = 'gold';
    state.pokemonRecords = [record('gold', 'Kangaskhan')];
    syncPlayerPokemonLists(state);
    state.activeShop = 'items';
    state.itemShopFolderPath = [];
    state.itemShopFilters = { group: 'all', roles: [], tags: [], canAfford: false, expanded: false };
    document.querySelector('#searchInput').value = '';
    render();
    await sleep(150);
  })()`, 30000);
  const otherGame = await snapshot();
  assert.equal(otherGame.gameId, otherGameId);
  assert.equal(otherGame.activePlayerId, "gold");
  assert.equal(otherGame.recommendationVisible, true);
  assert.ok(otherGame.recommendationNames.includes("Kangaskhanite"));
  assert.notEqual(otherGame.preferences[otherGameId]?.gold, true);

  await evaluate(`(async () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const record = (trainerId, name) => ({
      id: \`\${trainerId}-\${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}\`,
      trainerId,
      ownerId: trainerId,
      name,
      currentSpecies: name,
      baseSpecies: name,
      rosterSpeciesName: name,
      acquiredSpeciesName: name,
      status: 'Active',
      rosterType: 'Active'
    });
    localStorage.setItem('rival-saga-backend-game-id', '${gameId}');
    history.replaceState(null, '', '/?view=game&game=${gameId}&page=playerHub&panel=shop&item-shop-drawer=restore');
    backendSync.gameId = '${gameId}';
    state.activePlayerId = 'gold';
    state.pokemonRecords = [record('gold', 'Kangaskhan'), record('${otherPlayerId}', 'Kangaskhan')];
    syncPlayerPokemonLists(state);
    state.activeShop = 'items';
    state.itemShopFolderPath = [];
    state.itemShopFilters = { group: 'all', roles: [], tags: [], canAfford: false, expanded: false };
    document.querySelector('#searchInput').value = '';
    render();
    await sleep(150);
  })()`, 30000);
  const beforeRestore = await snapshot();
  assert.equal(beforeRestore.recommendationVisible, false);
  assert.equal(beforeRestore.restoreVisible, true);
  await evaluate(`(async () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    document.querySelector('[data-item-shop-recommendations-restore]')?.click();
    await sleep(150);
  })()`);
  const restored = await snapshot();
  assert.equal(restored.recommendationVisible, true);
  assert.ok(restored.recommendationNames.includes("Kangaskhanite"));
  assert.equal(restored.restoreVisible, false);
  assert.equal(restored.preferences[gameId]?.gold, false);

  await evaluate(`(async () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    state.activePlayerId = 'gold';
    state.pokemonRecords = [];
    syncPlayerPokemonLists(state);
    state.activeShop = 'items';
    state.itemShopFolderPath = [];
    state.itemShopFilters = { group: 'all', roles: [], tags: [], canAfford: false, expanded: false };
    document.querySelector('#searchInput').value = '';
    render();
    await sleep(150);
  })()`);
  const zeroRecommendations = await snapshot();
  assert.equal(zeroRecommendations.recommendationVisible, false);
  assert.equal(zeroRecommendations.restoreVisible, false);
  assert.deepEqual(zeroRecommendations.sectionTitles, ["Main Shop", "Collections"]);
  await evaluate(`(() => {
    if (storedStateSaveTimer) clearTimeout(storedStateSaveTimer);
    storedStateSaveTimer = null;
    storedStateSaveQueued = false;
    if (clientUiStateSaveTimer) clearTimeout(clientUiStateSaveTimer);
    clientUiStateSaveTimer = null;
    clientUiStateSaveQueued = false;
    if (backendSync.saveTimer) clearTimeout(backendSync.saveTimer);
    backendSync.saveTimer = null;
    if (backendSync.stateSaveAbortController) backendSync.stateSaveAbortController.abort();
    backendSync.stateSaveAbortController = null;
    backendSync.stateSaveInFlight = null;
    backendSync.saveRequestedRevision = backendSync.savePersistedRevision;
    backendSync.saveStatus = 'saved';
    backendSync.saveError = '';
  })()`, 30000);
  assert.deepEqual(actionableBrowserErrors(), []);
  assert.deepEqual(actionableExternalRequests(), []);
}

test("[ITEM-SHOP-BROWSE-001] Item Shop browse chrome stays compact and filters flatten intentionally", async () => {
  await cdp.send("Page.navigate", { url: `${server.baseUrl}/?view=game&game=default&page=playerHub&panel=shop&item-shop-browse-browser=${Date.now()}` });
  await waitUntil("document.readyState === 'complete' || document.readyState === 'interactive'");
  await waitUntil("Boolean(document.querySelector('#shopGrid'))");
  await waitUntil("document.body.classList.contains('site-game-active')");
  await evaluate(`(() => {
    localStorage.removeItem('rival-saga-client-ui-v1');
    localStorage.setItem('rival-saga-item-shop-recommendation-drawer-v1', JSON.stringify({ default: { gold: true } }));
    state.activePlayerId = 'gold';
    state.activeShop = 'items';
    state.itemShopFolderPath = [];
    state.itemShopFilters = { group: 'all', roles: [], tags: [], canAfford: false, expanded: false };
    state.pokemonRecords = [];
    syncPlayerPokemonLists(state);
    document.querySelector('#searchInput').value = '';
    render();
  })()`);
  await waitUntil("document.querySelector('.item-shop-browse-copy h3')?.textContent?.trim() === 'Items'");

  const initialChrome = await evaluate(`(() => ({
    localPlayerTabsGone: !document.querySelector('.app-tabs'),
    productTypeNavGone: !document.querySelector('#itemShopGroupNav'),
    priceControlsGone: !document.querySelector('#minPriceFilter') && !document.querySelector('#maxPriceFilter') && !document.querySelector('.shop-filter-price'),
    sortControlsGone: !document.querySelector('#shopSortSelect') && !document.querySelector('.shop-filter-sort'),
    shopTabs: [...document.querySelectorAll('.shop-mode-tabs [data-shop] .shop-department-copy strong')].map((node) => node.textContent.trim()),
    departmentTitle: document.querySelector('#shopDepartmentTitle')?.textContent?.trim() || '',
    departmentSubtitle: document.querySelector('#shopDepartmentSubtitle')?.textContent?.trim() || '',
    rivalMartGone: !document.body.textContent.includes('Rival Mart'),
    oldSideTabsGone: !document.querySelector('#activityResponseTab') && !document.querySelector('#opponentDrawerTab'),
    liveRefClosedHidden: Boolean(document.querySelector('#liveRefereeColumn')?.hidden),
    liveRefLauncherVisible: Boolean(document.querySelector('#liveRefereeLauncher')?.offsetParent),
    filtersButtonVisible: !document.querySelector('#itemShopFiltersToggle')?.classList.contains('hidden'),
    canAffordVisible: !document.querySelector('#itemShopAffordFilterGroup')?.classList.contains('hidden'),
    rootBackVisible: Boolean(document.querySelector('.item-shop-browse-nav:not(.hidden) button')),
    rootTitle: document.querySelector('.item-shop-browse-copy h3')?.textContent?.trim(),
    rootSummary: document.querySelector('.item-shop-browse-topline span')?.textContent?.trim() || '',
    sectionTitles: [...document.querySelectorAll('#shopGrid > .shop-tier-section .shop-tier-header h3')].map((node) => node.textContent.trim()),
    rootNames: [...document.querySelectorAll('#shopGrid .shop-name-cell strong')].map((node) => node.textContent.trim())
  }))()`);
  assert.equal(initialChrome.localPlayerTabsGone, true);
  assert.equal(initialChrome.productTypeNavGone, true);
  assert.equal(initialChrome.priceControlsGone, true);
  assert.equal(initialChrome.sortControlsGone, true);
  assert.deepEqual(initialChrome.shopTabs, ["Items", "TMs", "Tokens"]);
  assert.equal(initialChrome.filtersButtonVisible, true);
  assert.equal(initialChrome.canAffordVisible, true);
  assert.equal(initialChrome.rootBackVisible, false);
  assert.equal(initialChrome.departmentTitle, "Items");
  assert.match(initialChrome.departmentSubtitle, /Held items/);
  assert.equal(initialChrome.rivalMartGone, true);
  assert.equal(initialChrome.oldSideTabsGone, true);
  assert.equal(initialChrome.liveRefClosedHidden, true);
  assert.equal(initialChrome.liveRefLauncherVisible, true);
  assert.equal(initialChrome.rootTitle, "Items");
  assert.match(initialChrome.rootSummary, /18 main items/);
  assert.match(initialChrome.rootSummary, /10 collections/);
  assert.deepEqual(initialChrome.sectionTitles, ["Main Shop", "Collections"]);
  assert.equal(initialChrome.rootNames.includes("Trainer Resources"), false, "Trainer Resources should be removed from the Items root");
  assert.deepEqual(initialChrome.rootNames.slice(0, 2), ["Badge Point", "Legacy Ticket"]);
  assert.ok(initialChrome.rootNames.includes("Badge Point"));
  assert.ok(initialChrome.rootNames.includes("Legacy Ticket"));
  ["Sitrus Berry", "Light Clay", "Eviolite", "Assault Vest", "Heavy-Duty Boots"].forEach((name) => {
    assert.ok(initialChrome.rootNames.includes(name), `${name} should be visible on the root storefront`);
  });
  ["Berry Juice", "Booster Energy", "Normalium Z", "Kommonium Z", "Kangaskhanite", "Metagrossite"].forEach((name) => {
    assert.equal(initialChrome.rootNames.includes(name), false, `${name} should not appear in the default root storefront`);
  });
  await captureShopHudScreenshot("shop-hud-desktop-top-250.png");
  await captureShopHudScreenshot("shop-root-without-recommendations.png", 720);

  const productVisuals = await evaluate(`(async () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const player = state.players.find((entry) => entry.id === 'gold');
    player.balance = 10000;
    state.currentPhase = 'shop';
    state.phase = 'shop';
    state.phaseState ||= {};
    const key = phaseStateKey(state.series, state.gym);
    state.phaseState[key] ||= {};
    state.phaseState[key].currentPhase = 'shop';
    state.activeShop = 'items';
    state.itemShopFolderPath = [];
    state.itemShopFilters = { group: 'all', roles: [], tags: [], canAfford: false, expanded: false };
    document.querySelector('#searchInput').value = '';
    render();
    await sleep(150);
    const reports = [];
    for (const name of ['Badge Point', 'Legacy Ticket']) {
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      const card = [...document.querySelectorAll('#shopGrid .item-shop-main-section .shop-row:not([data-item-shop-folder])')]
        .find((row) => row.querySelector('.shop-name-cell strong')?.textContent?.trim() === name);
      const img = card?.querySelector('img[data-shop-sprite]');
      if (img && !img.complete) {
        await new Promise((resolve) => {
          img.addEventListener('load', resolve, { once: true });
          img.addEventListener('error', resolve, { once: true });
          setTimeout(resolve, 1500);
        });
      }
      const localSprite = window.rivalSagaShopSpriteData.items[slug]?.localSprite || '';
      const response = localSprite ? await fetch(localSprite, { cache: 'no-store' }) : null;
      const button = card?.querySelector('.shop-buy-button');
      reports.push({
        name,
        found: Boolean(card),
        imgExists: Boolean(img),
        currentSrc: img?.currentSrc || '',
        localSprite,
        localStatus: response?.status || 0,
        naturalWidth: img?.naturalWidth || 0,
        labelOpacity: card ? getComputedStyle(card.querySelector('.shop-entry-visual b')).opacity : '',
        buttonText: button?.textContent?.trim() || '',
        buttonDisabled: Boolean(button?.disabled),
        priceText: card?.querySelector('.price')?.textContent?.replace(/\\s+/g, ' ').trim() || ''
      });
    }
    player.balance = 1000;
    state.currentPhase = 'action';
    state.phase = 'action';
    state.phaseState[key].currentPhase = 'action';
    render();
    await sleep(150);
    return reports;
  })()`, 10000);
  const badgePointVisual = productVisuals.find((report) => report.name === "Badge Point");
  assert.equal(badgePointVisual.found, true);
  assert.equal(badgePointVisual.imgExists, true);
  assert.equal(badgePointVisual.currentSrc, `${server.baseUrl}/${badgePointVisual.localSprite}`);
  assert.ok(badgePointVisual.currentSrc.includes("/assets/shop/custom/badge-point.svg"));
  assert.equal(badgePointVisual.localStatus, 200);
  assert.ok(badgePointVisual.naturalWidth > 0);
  assert.equal(badgePointVisual.labelOpacity, "0");
  assert.equal(badgePointVisual.buttonText, "Buy");
  assert.equal(badgePointVisual.buttonDisabled, false);
  assert.match(badgePointVisual.priceText, /4,000/);
  const legacyTicketVisual = productVisuals.find((report) => report.name === "Legacy Ticket");
  assert.equal(legacyTicketVisual.found, true);
  assert.equal(legacyTicketVisual.imgExists, true);
  assert.equal(legacyTicketVisual.currentSrc, `${server.baseUrl}/${legacyTicketVisual.localSprite}`);
  assert.ok(legacyTicketVisual.currentSrc.includes("/assets/shop/custom/legacy-ticket.svg"));
  assert.equal(legacyTicketVisual.localStatus, 200);
  assert.ok(legacyTicketVisual.naturalWidth > 0);
  assert.equal(legacyTicketVisual.labelOpacity, "0");
  assert.equal(legacyTicketVisual.buttonText, "Add");
  assert.equal(legacyTicketVisual.buttonDisabled, false);
  assert.match(legacyTicketVisual.priceText, /4,000/);

  const trainerResourceScaling = await evaluate(`(async () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const player = state.players.find((entry) => entry.id === 'gold');
    const key = phaseStateKey(state.series, state.gym);
    const previousPlayer = structuredClone(player);
    const previousCart = structuredClone(state.shopCart || { playerId: '', items: [], open: false });
    const previousPhase = state.currentPhase;
    const previousPhaseAlias = state.phase;
    const previousPhaseState = structuredClone(state.phaseState || {});
    const previousShop = state.activeShop;
    const previousFolderPath = structuredClone(state.itemShopFolderPath || []);
    const previousFilters = structuredClone(state.itemShopFilters || {});
    player.balance = 20000;
    player.badgePoints = 0;
    player.badgePurchasesThisSeries = 0;
    player.legacyTicketPurchasesThisSeries = 0;
    player.inventory = [];
    state.shopCart = { playerId: '', items: [], open: false };
    state.currentPhase = 'shop';
    state.phase = 'shop';
    state.phaseState ||= {};
    state.phaseState[key] ||= {};
    state.phaseState[key].currentPhase = 'shop';
    state.activeShop = 'items';
    state.itemShopFolderPath = [];
    state.itemShopFilters = { group: 'all', roles: [], tags: [], canAfford: false, expanded: false };
    document.querySelector('#searchInput').value = '';
    render();
    await sleep(150);
    const cardFor = (name) => [...document.querySelectorAll('#shopGrid .item-shop-main-section .shop-row:not([data-item-shop-folder])')]
      .find((row) => row.querySelector('.shop-name-cell strong')?.textContent?.trim() === name);
    const priceFor = (name) => cardFor(name)?.querySelector('.price')?.textContent?.replace(/\\s+/g, ' ').trim() || '';
    const initialBadgePrice = priceFor('Badge Point');
    const initialLegacyPrice = priceFor('Legacy Ticket');
    cardFor('Legacy Ticket')?.querySelector('.shop-buy-button')?.click();
    await sleep(120);
    cardFor('Legacy Ticket')?.querySelector('.shop-buy-button')?.click();
    await sleep(120);
    const cartPrices = (state.shopCart?.items || [])
      .filter((entry) => entry.name === 'Legacy Ticket')
      .map((entry) => ({ price: entry.price, quantity: entry.quantity }));
    const cartTotal = (state.shopCart?.items || []).reduce((total, entry) => total + entry.price * entry.quantity, 0);
    finalizeCartPurchase();
    await sleep(150);
    const legacyCountAfterPurchase = player.legacyTicketPurchasesThisSeries;
    const nextLegacyPrice = priceFor('Legacy Ticket');
    cardFor('Badge Point')?.querySelector('.shop-buy-button')?.click();
    await sleep(150);
    const badgePurchasesAfterFirst = player.badgePurchasesThisSeries;
    const nextBadgePrice = priceFor('Badge Point');
    Object.assign(player, previousPlayer);
    state.shopCart = previousCart;
    state.currentPhase = previousPhase;
    state.phase = previousPhaseAlias;
    state.phaseState = previousPhaseState;
    state.activeShop = previousShop;
    state.itemShopFolderPath = previousFolderPath;
    state.itemShopFilters = previousFilters;
    render();
    await sleep(100);
    return {
      initialBadgePrice,
      initialLegacyPrice,
      cartPrices,
      cartTotal,
      legacyCountAfterPurchase,
      nextLegacyPrice,
      badgePurchasesAfterFirst,
      nextBadgePrice
    };
  })()`, 10000);
  assert.match(trainerResourceScaling.initialBadgePrice, /4,000/);
  assert.match(trainerResourceScaling.initialLegacyPrice, /4,000/);
  assert.deepEqual(trainerResourceScaling.cartPrices, [{ price: 4000, quantity: 1 }, { price: 5000, quantity: 1 }]);
  assert.equal(trainerResourceScaling.cartTotal, 9000);
  assert.equal(trainerResourceScaling.legacyCountAfterPurchase, 2);
  assert.match(trainerResourceScaling.nextLegacyPrice, /6,000/);
  assert.equal(trainerResourceScaling.badgePurchasesAfterFirst, 1);
  assert.match(trainerResourceScaling.nextBadgePrice, /5,000/);

  const affordHierarchy = await evaluate(`(async () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const input = document.querySelector('#itemShopCanAffordFilter');
    if (input && !input.checked) input.click();
    await sleep(150);
    const names = [...document.querySelectorAll('#shopGrid .shop-name-cell strong')].map((node) => node.textContent.trim());
    const report = {
      checked: Boolean(input?.checked),
      title: document.querySelector('.item-shop-browse-copy h3')?.textContent?.trim() || '',
      folderCount: document.querySelectorAll('#shopGrid [data-item-shop-folder]').length,
      hasAffordableFolder: names.includes('Berries'),
      isFlattened: document.querySelector('.item-shop-browse-copy h3')?.textContent?.trim() === 'Filtered Results'
    };
    if (input?.checked) input.click();
    await sleep(150);
    return report;
  })()`, 10000);
  assert.equal(affordHierarchy.checked, true);
  assert.equal(affordHierarchy.title, "Items");
  assert.equal(affordHierarchy.isFlattened, false);
  assert.ok(affordHierarchy.folderCount > 0);
  assert.equal(affordHierarchy.hasAffordableFolder, true);

  const browseReport = await evaluate(`(async () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const title = () => document.querySelector('.item-shop-browse-copy h3')?.textContent?.trim() || '';
    const names = () => [...document.querySelectorAll('#shopGrid .shop-name-cell strong')].map((node) => node.textContent.trim());
    const clickCard = async (name) => {
      const card = [...document.querySelectorAll('#shopGrid [data-item-shop-folder]')]
        .find((row) => row.querySelector('.shop-name-cell strong')?.textContent?.trim() === name);
      card?.click();
      await sleep(150);
    };
    const setSearch = async (term) => {
      const input = document.querySelector('#searchInput');
      input.value = term;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await sleep(150);
    };
    await clickCard('Berries');
    const berriesTitle = title();
    document.querySelector('[data-item-shop-folder-back]')?.click();
    await sleep(150);
    await clickCard('Specialist Items');
    const specialistTitle = title();
    await clickCard('Oddball Utility');
    const oddballTitle = title();
    const oddballNames = names();
    await setSearch('Heat Rock');
    const searchTitle = title();
    const heatRockVisible = names().includes('Heat Rock');
    await setSearch('');
    const restoredAfterSearch = title();
    document.querySelector('#itemShopFiltersToggle')?.click();
    await sleep(150);
    const disclosureVisible = !document.querySelector('#itemShopAdvancedFilters')?.classList.contains('hidden');
    const chipStyle = getComputedStyle(document.querySelector('#itemShopRoleFilters'));
    const switchingChip = document.querySelector('[data-item-shop-tag="switching"]');
    switchingChip?.click();
    await sleep(150);
    const switchingNames = names();
    const activeChipText = document.querySelector('#itemShopAppliedFilters')?.textContent?.replace(/\\s+/g, ' ').trim() || '';
    document.querySelector('[data-item-shop-clear-filters]')?.click();
    await sleep(150);
    const restoredAfterFilters = title();
    await setSearch('Booster Energy');
    document.querySelector('#itemShopCanAffordFilter')?.click();
    await sleep(150);
    const boosterHiddenByAfford = !names().includes('Booster Energy');
    const affordDebug = {
      checked: Boolean(document.querySelector('#itemShopCanAffordFilter')?.checked),
      balance: document.querySelector('#shopHeaderBalance')?.textContent?.trim() || '',
      names: names()
    };
    await setSearch('Berry Juice');
    const berryVisibleByAfford = names().includes('Berry Juice');
    document.querySelector('[data-item-shop-clear-filters]')?.click();
    await setSearch('');
    document.querySelector('[data-item-shop-folder-back]')?.click();
    await sleep(150);
    const backToSpecialist = title();
    document.querySelector('[data-item-shop-folder-back]')?.click();
    await sleep(150);
    await clickCard('Battle Mechanics');
    const battleTitle = title();
    return {
      berriesTitle,
      specialistTitle,
      oddballTitle,
      oddballNames,
      searchTitle,
      heatRockVisible,
      restoredAfterSearch,
      disclosureVisible,
      chipFlexWrap: chipStyle.flexWrap,
      chipOverflowX: chipStyle.overflowX,
      switchingNames,
      activeChipText,
      restoredAfterFilters,
      boosterHiddenByAfford,
      affordDebug,
      berryVisibleByAfford,
      backToSpecialist,
      battleTitle
    };
  })()`, 20000);

  assert.equal(browseReport.berriesTitle, "Berries");
  assert.equal(browseReport.specialistTitle, "Specialist Items");
  assert.equal(browseReport.oddballTitle, "Oddball Utility");
  ["Light Clay", "Eviolite", "Assault Vest", "Heavy-Duty Boots"].forEach((name) => {
    assert.equal(browseReport.oddballNames.includes(name), false, `${name} should not appear in Oddball Utility browsing`);
  });
  assert.equal(browseReport.searchTitle, "Filtered Results");
  assert.equal(browseReport.heatRockVisible, true);
  assert.equal(browseReport.restoredAfterSearch, "Oddball Utility");
  assert.equal(browseReport.disclosureVisible, true);
  assert.equal(browseReport.chipFlexWrap, "wrap");
  assert.notEqual(browseReport.chipOverflowX, "auto");
  assert.ok(browseReport.switchingNames.includes("Eject Button"));
  assert.match(browseReport.activeChipText, /Switching/);
  assert.equal(browseReport.restoredAfterFilters, "Oddball Utility");
  assert.equal(browseReport.boosterHiddenByAfford, true, JSON.stringify(browseReport.affordDebug));
  assert.equal(browseReport.berryVisibleByAfford, true);
  assert.equal(browseReport.backToSpecialist, "Specialist Items");
  assert.equal(browseReport.battleTitle, "Battle Mechanics");

  await evaluate(`(async () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const title = () => document.querySelector('.item-shop-browse-copy h3')?.textContent?.trim() || '';
    for (let i = 0; i < 5 && title() !== 'Items'; i += 1) {
      document.querySelector('[data-item-shop-folder-back]')?.click();
      await sleep(150);
    }
  })()`);
  await waitUntil("document.querySelector('.item-shop-browse-copy h3')?.textContent?.trim() === 'Items'");
  await delay(250);
  await evaluate(`(() => {
    const key = "rival-saga-client-ui-v1";
    const value = JSON.parse(localStorage.getItem(key) || "{}");
    delete value.itemShopFolderPath;
    delete value.itemShopFilters;
    localStorage.setItem(key, JSON.stringify(value));
  })()`);
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true
  });
  await cdp.send("Page.navigate", { url: `${server.baseUrl}/?view=game&game=default&page=playerHub&panel=shop&item-shop-mobile-browser=${Date.now()}` });
  await waitUntil("document.querySelector('.item-shop-browse-copy h3')?.textContent?.trim() === 'Items'");
  const mobileReport = await evaluate(`(async () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const rootNames = [...document.querySelectorAll('#shopGrid .shop-name-cell strong')].map((node) => node.textContent.trim());
    document.querySelector('#itemShopFiltersToggle')?.click();
    await sleep(150);
    const roleRow = document.querySelector('#itemShopRoleFilters');
    const tagRow = document.querySelector('#itemShopTagFilters');
    return {
      viewport: { width: window.innerWidth, height: window.innerHeight },
      pageOverflowX: document.documentElement.scrollWidth > window.innerWidth,
      shopTabs: [...document.querySelectorAll('.shop-mode-tabs [data-shop] .shop-department-copy strong')].map((node) => node.textContent.trim()),
      rootTitle: document.querySelector('.item-shop-browse-copy h3')?.textContent?.trim() || '',
      rootSummary: document.querySelector('.item-shop-browse-topline span')?.textContent?.trim() || '',
      rootBackVisible: Boolean(document.querySelector('.item-shop-browse-nav:not(.hidden) button')),
      sectionTitles: [...document.querySelectorAll('#shopGrid > .shop-tier-section .shop-tier-header h3')].map((node) => node.textContent.trim()),
      rootNames,
      firstCardVisible: Boolean(document.querySelector('#shopGrid .shop-row')?.getBoundingClientRect().top < window.innerHeight),
      filtersOpen: !document.querySelector('#itemShopAdvancedFilters')?.classList.contains('hidden'),
      roleWrap: getComputedStyle(roleRow).flexWrap,
      roleOverflowX: getComputedStyle(roleRow).overflowX,
      tagWrap: getComputedStyle(tagRow).flexWrap,
      tagOverflowX: getComputedStyle(tagRow).overflowX
    };
  })()`, 20000);
  await captureShopHudScreenshot("shop-hud-mobile-top-250.png");
  await cdp.send("Emulation.clearDeviceMetricsOverride");
  await evaluate(`(() => {
    if (storedStateSaveTimer) clearTimeout(storedStateSaveTimer);
    storedStateSaveTimer = null;
    storedStateSaveQueued = false;
    if (clientUiStateSaveTimer) clearTimeout(clientUiStateSaveTimer);
    clientUiStateSaveTimer = null;
    clientUiStateSaveQueued = false;
    if (backendSync.saveTimer) clearTimeout(backendSync.saveTimer);
    backendSync.saveTimer = null;
    if (backendSync.stateSaveAbortController) backendSync.stateSaveAbortController.abort();
    backendSync.stateSaveAbortController = null;
    backendSync.stateSaveInFlight = null;
    backendSync.saveRequestedRevision = backendSync.savePersistedRevision;
    backendSync.saveStatus = 'saved';
    backendSync.saveError = '';
  })()`, 30000);

  assert.deepEqual(mobileReport.shopTabs, ["Items", "TMs", "Tokens"]);
  assert.ok(mobileReport.viewport.width >= 390 && mobileReport.viewport.width <= 391, JSON.stringify(mobileReport.viewport));
  assert.equal(mobileReport.pageOverflowX, false);
  assert.equal(mobileReport.rootTitle, "Items");
  assert.match(mobileReport.rootSummary, /18 main items/);
  assert.match(mobileReport.rootSummary, /10 collections/);
  assert.deepEqual(mobileReport.sectionTitles, ["Main Shop", "Collections"]);
  assert.equal(mobileReport.rootNames.includes("Trainer Resources"), false);
  assert.deepEqual(mobileReport.rootNames.slice(0, 2), ["Badge Point", "Legacy Ticket"]);
  assert.ok(mobileReport.rootNames.includes("Sitrus Berry"));
  assert.equal(mobileReport.rootNames.includes("Berry Juice"), false);
  assert.equal(mobileReport.rootNames.includes("Booster Energy"), false);
  assert.equal(mobileReport.rootBackVisible, false);
  assert.equal(mobileReport.firstCardVisible, true);
  assert.equal(mobileReport.filtersOpen, true);
  assert.equal(mobileReport.roleWrap, "wrap");
  assert.notEqual(mobileReport.roleOverflowX, "auto");
  assert.equal(mobileReport.tagWrap, "wrap");
  assert.notEqual(mobileReport.tagOverflowX, "auto");
  assert.deepEqual(actionableBrowserErrors(), []);
  assert.deepEqual(actionableExternalRequests(), []);
});

test("[ITEM-SHOP-RECOMMENDATION-DRAWER-001] Item Shop recommendations collapse per game and viewed player", runItemShopRecommendationDrawerBrowserCheck);
