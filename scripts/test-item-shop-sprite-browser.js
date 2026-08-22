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

let server;
let browserProcess;
let browserProfile;
let cdp;
const browserDiagnostics = [];
const browserErrors = [];
const externalRequests = [];

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
  cdp.on("Runtime.consoleAPICalled", (params) => {
    if (params.type === "error") browserErrors.push(params.args.map((arg) => arg.value || arg.description || "").join(" "));
  });
  cdp.on("Log.entryAdded", ({ entry }) => {
    const message = `${entry?.text || "Browser log error"}${entry?.url ? ` (${entry.url})` : ""}`;
    if (entry?.level === "error" && !/favicon\.ico|\/api\/games\/default\/state/.test(message)) browserErrors.push(message);
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
      requestedKeys: Object.fromEntries(['covert-cloak', 'booster-energy', 'loaded-dice', 'heavy-duty-boots'].map((key) => [key, Boolean(window.rivalSagaShopSpriteData.items[key])]))
    };
  })()`);
  assert.equal(runtime.spriteBeforeApp, true);
  assert.equal(runtime.mappingCount, 270);
  assert.deepEqual(runtime.requestedKeys, {
    "covert-cloak": true,
    "booster-energy": true,
    "loaded-dice": true,
    "heavy-duty-boots": true
  });

  await evaluate("document.querySelector('[data-view=\"shop\"]')?.click()");
  await waitUntil("Boolean(document.querySelector('#searchInput'))");
  const reports = await evaluate(`(async () => {
    const names = ['Covert Cloak', 'Booster Energy', 'Loaded Dice', 'Heavy-Duty Boots'];
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
    assert.ok(report.currentSrc.includes("/assets/shop/items/"), `${report.name} should point into assets/shop/items`);
    assert.ok(report.naturalWidth > 0, `${report.name} sprite should load`);
    assert.equal(report.localStatus, 200, `${report.name} local sprite should return HTTP 200`);
    assert.equal(report.labelOpacity, "0", `${report.name} initials label should be hidden behind the image`);
  }
  assert.deepEqual(browserErrors, []);
  assert.deepEqual(externalRequests, []);
});

test("[ITEM-SHOP-BROWSE-001] Item Shop browse chrome stays compact and filters flatten intentionally", async () => {
  await cdp.send("Page.navigate", { url: `${server.baseUrl}/?view=game&game=default&page=playerHub&panel=shop&item-shop-browse-browser=${Date.now()}` });
  await waitUntil("document.readyState === 'complete' || document.readyState === 'interactive'");
  await waitUntil("Boolean(document.querySelector('#shopGrid'))");
  await waitUntil("document.body.classList.contains('site-game-active')");
  await waitUntil("document.querySelector('.item-shop-browse-copy h3')?.textContent?.trim() === 'Item Shop'");

  const initialChrome = await evaluate(`(() => ({
    localPlayerTabsGone: !document.querySelector('.app-tabs'),
    productTypeNavGone: !document.querySelector('#itemShopGroupNav'),
    priceControlsGone: !document.querySelector('#minPriceFilter') && !document.querySelector('#maxPriceFilter') && !document.querySelector('.shop-filter-price'),
    sortControlsGone: !document.querySelector('#shopSortSelect') && !document.querySelector('.shop-filter-sort'),
    shopTabs: [...document.querySelectorAll('.shop-mode-tabs [data-shop]')].map((button) => button.textContent.trim()),
    filtersButtonVisible: !document.querySelector('#itemShopFiltersToggle')?.classList.contains('hidden'),
    canAffordVisible: !document.querySelector('#itemShopAffordFilterGroup')?.classList.contains('hidden'),
    rootBackVisible: Boolean(document.querySelector('.item-shop-browse-nav:not(.hidden) button')),
    rootTitle: document.querySelector('.item-shop-browse-copy h3')?.textContent?.trim(),
    rootSummary: document.querySelector('.item-shop-browse-topline span')?.textContent?.trim() || '',
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
  assert.equal(initialChrome.rootTitle, "Item Shop");
  assert.match(initialChrome.rootSummary, /11 collections/);
  assert.match(initialChrome.rootSummary, /21 items/);
  assert.ok(initialChrome.rootNames.includes("Trainer Resources"), "Trainer Resources should be visible at the Items root");
  ["Light Clay", "Eviolite", "Assault Vest", "Heavy-Duty Boots"].forEach((name) => {
    assert.ok(initialChrome.rootNames.includes(name), `${name} should be visible on the root storefront`);
  });

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
    await clickCard('Trainer Resources');
    const trainerTitle = title();
    const trainerSummary = document.querySelector('.item-shop-browse-topline span')?.textContent?.trim() || '';
    const trainerNames = names();
    const trainerBackText = document.querySelector('.item-shop-browse-nav button')?.textContent?.trim() || '';
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
      trainerTitle,
      trainerSummary,
      trainerNames,
      trainerBackText,
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
  assert.equal(browseReport.trainerTitle, "Trainer Resources");
  assert.equal(browseReport.trainerSummary, "2 items");
  assert.ok(browseReport.trainerNames.includes("Legacy Ticket"));
  assert.ok(browseReport.trainerNames.includes("Badge Point"));
  assert.match(browseReport.trainerBackText, /Item Shop/);
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
    for (let i = 0; i < 5 && title() !== 'Item Shop'; i += 1) {
      document.querySelector('[data-item-shop-folder-back]')?.click();
      await sleep(150);
    }
  })()`);
  await waitUntil("document.querySelector('.item-shop-browse-copy h3')?.textContent?.trim() === 'Item Shop'");
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
  await waitUntil("document.querySelector('.item-shop-browse-copy h3')?.textContent?.trim() === 'Item Shop'");
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
      shopTabs: [...document.querySelectorAll('.shop-mode-tabs [data-shop]')].map((button) => button.textContent.trim()),
      rootTitle: document.querySelector('.item-shop-browse-copy h3')?.textContent?.trim() || '',
      rootSummary: document.querySelector('.item-shop-browse-topline span')?.textContent?.trim() || '',
      rootBackVisible: Boolean(document.querySelector('.item-shop-browse-nav:not(.hidden) button')),
      rootNames,
      firstCardVisible: Boolean(document.querySelector('#shopGrid .shop-row')?.getBoundingClientRect().top < window.innerHeight),
      filtersOpen: !document.querySelector('#itemShopAdvancedFilters')?.classList.contains('hidden'),
      roleWrap: getComputedStyle(roleRow).flexWrap,
      roleOverflowX: getComputedStyle(roleRow).overflowX,
      tagWrap: getComputedStyle(tagRow).flexWrap,
      tagOverflowX: getComputedStyle(tagRow).overflowX
    };
  })()`, 20000);
  await cdp.send("Emulation.clearDeviceMetricsOverride");

  assert.deepEqual(mobileReport.shopTabs, ["Items", "TMs", "Tokens"]);
  assert.ok(mobileReport.viewport.width >= 390 && mobileReport.viewport.width <= 391, JSON.stringify(mobileReport.viewport));
  assert.equal(mobileReport.pageOverflowX, false);
  assert.equal(mobileReport.rootTitle, "Item Shop");
  assert.match(mobileReport.rootSummary, /11 collections/);
  assert.ok(mobileReport.rootNames.includes("Trainer Resources"));
  assert.equal(mobileReport.rootBackVisible, false);
  assert.equal(mobileReport.firstCardVisible, true);
  assert.equal(mobileReport.filtersOpen, true);
  assert.equal(mobileReport.roleWrap, "wrap");
  assert.notEqual(mobileReport.roleOverflowX, "auto");
  assert.equal(mobileReport.tagWrap, "wrap");
  assert.notEqual(mobileReport.tagOverflowX, "auto");
  assert.deepEqual(browserErrors, []);
  assert.deepEqual(externalRequests, []);
});
