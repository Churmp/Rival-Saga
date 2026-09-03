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
const { tmShopData, rawTmShopData } = require("../shop-data.js");
const tmBrowseData = require("../tm-browse-data.js");
const moveClassification = require("../move-classification-data.js");

const rootDir = path.resolve(__dirname, "..");
const validFolders = new Set(["damage", "setup", "disruption", "field", "support"]);
const validShelves = new Set(["staples", "main", "niche", "junk"]);
const shelfOrder = ["staples", "main", "niche", "junk"];
const shelfLabels = ["Staples", "Main", "Niche", "Junk Drawer"];
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
  if (!executable) throw new Error("No supported Chromium browser was found for TM Shop browser QA.");
  return executable;
}

async function waitForJson(url, timeoutMs = 10000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return response.json();
    } catch {
      // Chromium is still exposing its debugging endpoint.
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

async function captureViewportSlice(name, width, height) {
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width,
    height: Math.max(height, 700),
    deviceScaleFactor: 1,
    mobile: width < 600
  });
  await delay(100);
  const outputDir = path.join(rootDir, "artifacts", "tm-shop-browser");
  fs.mkdirSync(outputDir, { recursive: true });
  const result = await cdp.send("Page.captureScreenshot", {
    format: "png",
    clip: { x: 0, y: 0, width, height, scale: 1 },
    captureBeyondViewport: true
  });
  const filePath = path.join(outputDir, name);
  fs.writeFileSync(filePath, Buffer.from(result.data, "base64"));
  return filePath;
}

async function tmLayoutSnapshot(width, height = 760) {
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width,
    height: Math.max(height, 700),
    deviceScaleFactor: 1,
    mobile: width < 600
  });
  await delay(120);
  return evaluate(`(() => {
    const grid = document.querySelector('.tm-shop-grid');
    const cards = [...document.querySelectorAll('.tm-shop-card')];
    const columns = grid ? getComputedStyle(grid).gridTemplateColumns.split(' ').filter(Boolean).length : 0;
    const firstTop = cards[0]?.getBoundingClientRect().top || 0;
    const firstRow = cards.filter((card) => Math.abs(card.getBoundingClientRect().top - firstTop) < 3);
    const cardMetrics = cards.slice(0, 12).map((card) => {
      const rect = card.getBoundingClientRect();
      const visual = card.querySelector('.tm-card-visual')?.getBoundingClientRect();
      const body = card.querySelector('.tm-card-body')?.getBoundingClientRect();
      const name = card.querySelector('.shop-name-cell > strong')?.getBoundingClientRect();
      const price = card.querySelector('.tm-card-price-info')?.getBoundingClientRect();
      const identity = card.querySelector('.tm-card-identity')?.getBoundingClientRect();
      const stats = [...card.querySelectorAll('.tm-card-stat-strip span')].map((stat) => stat.getBoundingClientRect());
      const buttons = [...card.querySelectorAll('.tm-card-actions button')].map((button) => button.getBoundingClientRect());
      const statWidths = stats.map((stat) => Math.round(stat.width));
      const buttonWidths = buttons.map((button) => Math.round(button.width));
      return {
        name: card.dataset.tmName,
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        textStart: body ? Math.round(body.left - rect.left) : 0,
        visualWidth: visual ? Math.round(visual.width) : 0,
        visualCenterOffset: visual && identity ? Math.round(Math.abs((visual.top + visual.height / 2) - (identity.top + identity.height / 2))) : 0,
        headerTopDelta: name && price ? Math.round(Math.abs(name.top - price.top)) : 0,
        priceRightGap: price ? Math.round(rect.right - price.right) : 0,
        statCount: stats.length,
        statWidths,
        statWidthSpread: statWidths.length ? Math.max(...statWidths) - Math.min(...statWidths) : 0,
        buttonWidths,
        buttonWidthSpread: buttonWidths.length ? Math.max(...buttonWidths) - Math.min(...buttonWidths) : 0
      };
    });
    const textStarts = cardMetrics.map((metric) => metric.textStart).filter(Boolean);
    return {
      width: ${width},
      columns,
      firstRowCount: firstRow.length,
      cardMetrics,
      textStartSpread: textStarts.length ? Math.max(...textStarts) - Math.min(...textStarts) : 0,
      overflow: grid ? grid.scrollWidth > grid.clientWidth + 1 : true
    };
  })()`);
}

function actionableBrowserErrors() {
  return browserErrors.filter((message) => !/beforeunload.*confirmation panel/.test(message));
}

function actionableExternalRequests() {
  return externalRequests.filter((url) => !/chromestatus\.com\/feature\/5082396709879808/.test(url));
}

before(async () => {
  server = await startTemporaryServer("tm-shop-browser");
  const fixtureState = controlStateFixture("tm-shop-browser");
  fixtureState.activePage = "playerHub";
  fixtureState.activeView = "shop";
  fixtureState.activeShop = "tms";
  fixtureState.activePlayerId = "gold";
  fixtureState.currentPhase = "shop";
  fixtureState.phase = "shop";
  fixtureState.players.forEach((player) => {
    player.balance = 50000;
    player.shopLevels = { items: 4, tms: 4, tokens: 4 };
  });
  await saveGame(server.baseUrl, "default", fixtureState, 0);

  const debuggingPort = await availablePort();
  browserProfile = fs.mkdtempSync(path.join(os.tmpdir(), "rival-saga-tm-shop-browser-"));
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

test("[TM-SHOP-METADATA-001] final purchasable TMs have presentation browse metadata only", () => {
  const finalNames = new Set(tmShopData.map((item) => item.name));
  const rawOnlyNames = rawTmShopData.map((item) => item.name).filter((name) => !finalNames.has(name));
  const naturalizedNames = new Set((moveClassification.naturalizedRareTmMoves || []).map((entry) => entry.name));
  assert.equal(tmShopData.length, 453);
  assert.equal(moveClassification.naturalizedRareTmMoves.length, 132);
  assert.ok(rawOnlyNames.length > 0);
  assert.equal(finalNames.has("First Impression"), false);
  assert.equal(naturalizedNames.has("First Impression"), true);
  assert.equal(finalNames.has("Pollen Puff"), true);
  assert.equal(finalNames.has("Dragon Cheer"), false);
  assert.ok((moveClassification.singlesExcludedMoves || []).includes("Dragon Cheer"));
  for (const item of tmShopData) {
    const meta = tmBrowseData.moves[item.name];
    assert.ok(meta, `${item.name} needs TM browse metadata`);
    assert.deepEqual(Object.keys(meta).sort(), ["placements"]);
    assert.equal(Object.hasOwn(meta, "shelf"), false, `${item.name} should not use the old global shelf field`);
    assert.equal(Object.hasOwn(meta, "folders"), false, `${item.name} should not use the old folders field`);
    assert.ok(meta.placements && typeof meta.placements === "object" && !Array.isArray(meta.placements), `${item.name} placements should be an object`);
    const placements = Object.entries(meta.placements);
    assert.ok(placements.length >= 1, `${item.name} should have at least one placement`);
    placements.forEach(([folder, shelf]) => {
      assert.ok(validFolders.has(folder), `${item.name} has invalid folder ${folder}`);
      assert.ok(validShelves.has(shelf), `${item.name} has invalid shelf ${shelf}`);
    });
  }
  for (const name of Object.keys(tmBrowseData.moves)) {
    assert.ok(finalNames.has(name), `${name} should not be browse metadata for a filtered-out raw TM`);
  }
  assert.deepEqual(tmBrowseData.moves["Power-Up Punch"], { placements: { damage: "niche", setup: "main" } });
  assert.deepEqual(tmBrowseData.moves["Chilling Water"], { placements: { damage: "main" } });
  assert.deepEqual(tmBrowseData.moves["Rapid Spin"], { placements: { damage: "junk", field: "staples" } });
  assert.deepEqual(tmBrowseData.moves["Clear Smog"], { placements: { damage: "niche", disruption: "main" } });
  assert.deepEqual(tmBrowseData.moves["Parting Shot"], { placements: { disruption: "staples", support: "main" } });
  assert.deepEqual(tmBrowseData.moves["Trick"], { placements: { disruption: "staples", support: "main" } });
  assert.deepEqual(tmBrowseData.moves["Switcheroo"], { placements: { disruption: "main", support: "main" } });
  assert.deepEqual(tmBrowseData.moves["Skill Swap"], { placements: { disruption: "junk", support: "junk" } });
  assert.deepEqual(tmBrowseData.moves["Magic Room"], { placements: { field: "junk" } });
  assert.deepEqual(tmBrowseData.moves["Tailwind"], { placements: { field: "niche" } });
  assert.deepEqual(tmBrowseData.moves["Yawn"], { placements: { disruption: "main" } });
  assert.deepEqual(tmBrowseData.moves["Happy Hour"], { placements: { setup: "niche" } });
  assert.deepEqual(tmBrowseData.moves["Celebrate"], { placements: { setup: "niche" } });
  assert.deepEqual(tmBrowseData.moves["Substitute"], { placements: { setup: "staples", support: "main" } });
  assert.deepEqual(tmBrowseData.moves["U-Turn"], { placements: { damage: "staples", support: "staples" } });
  assert.deepEqual(tmBrowseData.moves["Flamethrower"], { placements: { damage: "staples" } });
  assert.deepEqual(tmBrowseData.moves["Secret Power"], { placements: { damage: "main" } });
  assert.deepEqual(tmBrowseData.moves["Fire Fang"], { placements: { damage: "main" } });
  assert.deepEqual(tmBrowseData.moves["Thunder Fang"], { placements: { damage: "main" } });
  assert.deepEqual(tmBrowseData.moves["Ice Fang"], { placements: { damage: "main" } });
  assert.deepEqual(tmBrowseData.moves["Ancient Power"], { placements: { damage: "niche" } });
  assert.deepEqual(tmBrowseData.moves["Aurora Beam"], { placements: { damage: "niche" } });
  assert.deepEqual(tmBrowseData.moves["Bite"], { placements: { damage: "niche" } });
  assert.deepEqual(tmBrowseData.moves["Brine"], { placements: { damage: "niche" } });
  assert.deepEqual(tmBrowseData.moves["Crush Claw"], { placements: { damage: "niche" } });
  assert.deepEqual(tmBrowseData.moves["Darkest Lariat"], { placements: { damage: "main" } });
  assert.deepEqual(tmBrowseData.moves["Feint"], { placements: { damage: "niche" } });
  assert.deepEqual(tmBrowseData.moves["Fire Pledge"], { placements: { damage: "niche" } });
  assert.deepEqual(tmBrowseData.moves["Harden"], { placements: { setup: "junk" } });
  assert.deepEqual(tmBrowseData.moves["Headbutt"], { placements: { damage: "niche" } });
  assert.deepEqual(tmBrowseData.moves["Magnitude"], { placements: { damage: "niche" } });
  assert.deepEqual(tmBrowseData.moves["Mega Kick"], { placements: { damage: "niche" } });
  assert.deepEqual(tmBrowseData.moves["Mind Reader"], { placements: { support: "niche" } });
  assert.deepEqual(tmBrowseData.moves["Ominous Wind"], { placements: { damage: "niche" } });
  assert.deepEqual(tmBrowseData.moves["Poison Tail"], { placements: { damage: "niche" } });
  assert.deepEqual(tmBrowseData.moves["Psybeam"], { placements: { damage: "niche" } });
  assert.deepEqual(tmBrowseData.moves["Punishment"], { placements: { damage: "niche" } });
  assert.deepEqual(tmBrowseData.moves["Rage"], { placements: { damage: "junk" } });
  assert.deepEqual(tmBrowseData.moves["Refresh"], { placements: { support: "niche" } });
  assert.deepEqual(tmBrowseData.moves["Rock Climb"], { placements: { damage: "niche" } });
  assert.deepEqual(tmBrowseData.moves["Silver Wind"], { placements: { damage: "niche" } });
  assert.deepEqual(tmBrowseData.moves["Sky Drop"], { placements: { damage: "niche" } });
  assert.deepEqual(tmBrowseData.moves["Snarl"], { placements: { damage: "main" } });
  assert.deepEqual(tmBrowseData.moves["Spit Up"], { placements: { damage: "niche" } });
  assert.deepEqual(tmBrowseData.moves["Steel Wing"], { placements: { damage: "main" } });
  assert.deepEqual(tmBrowseData.moves["Stomp"], { placements: { damage: "niche" } });
  assert.deepEqual(tmBrowseData.moves["Strength"], { placements: { damage: "main" } });
  assert.deepEqual(tmBrowseData.moves["Thrash"], { placements: { damage: "niche" } });
  assert.deepEqual(tmBrowseData.moves["Twister"], { placements: { damage: "junk" } });
  assert.deepEqual(tmBrowseData.moves["Wake Up Slap"], { placements: { damage: "niche" } });
  assert.deepEqual(tmBrowseData.moves["Water Pledge"], { placements: { damage: "niche" } });
  assert.deepEqual(tmBrowseData.moves["Hyper Beam"], { placements: { damage: "niche" } });
  assert.deepEqual(tmBrowseData.moves["Giga Impact"], { placements: { damage: "niche" } });
  assert.deepEqual(tmBrowseData.moves["Dig"], { placements: { damage: "niche" } });
  assert.deepEqual(tmBrowseData.moves["Dive"], { placements: { damage: "niche" } });
  assert.deepEqual(tmBrowseData.moves["Temper Flare"], { placements: { damage: "main" } });
  assert.deepEqual(tmBrowseData.moves["Steel Roller"], { placements: { damage: "niche" } });
  assert.deepEqual(tmBrowseData.moves["Razor Wind"], { placements: { damage: "junk" } });
  assert.deepEqual(tmBrowseData.moves["Take Down"], { placements: { damage: "junk" } });
  assert.deepEqual(tmBrowseData.moves["Quick Guard"], { placements: { support: "junk" } });
  assert.deepEqual(tmBrowseData.moves["Rototiller"], { placements: { setup: "junk" } });
  assert.deepEqual(tmBrowseData.moves["Pollen Puff"], { placements: { damage: "main" } });
  assert.deepEqual(tmBrowseData.moves["Will-o-Wisp"], { placements: { disruption: "staples" } });
  assert.deepEqual(tmBrowseData.moves["Bubblebeam"], { placements: { damage: "niche" } });
  assert.equal(tmBrowseData.moves["Water Gun"].placements.damage, "junk");
  assert.equal(tmBrowseData.moves["Cut"].placements.damage, "junk");
  assert.equal(tmBrowseData.moves["Fissure"].placements.damage, "niche");
  assert.equal(tmBrowseData.moves["Horn Drill"].placements.damage, "niche");
  assert.equal(tmBrowseData.moves["First Impression"], undefined);
  assert.equal(tmBrowseData.moves["Dragon Cheer"], undefined);
  assert.equal(tmBrowseData.moves["Freeze-Dry"], undefined);
  assert.equal(tmBrowseData.moves["Soft-Boiled"], undefined);
  assert.equal(tmBrowseData.moves["Acid"], undefined);
});

test("[TM-SHOP-BROWSER-001] TM Shop browses by folder and shelf without old level browsing", async () => {
  await cdp.send("Page.navigate", { url: `${server.baseUrl}/?view=game&game=default&page=playerHub&panel=shop&tm-shop-browser=${Date.now()}` });
  await waitUntil("document.readyState === 'complete' || document.readyState === 'interactive'");
  await waitUntil("Boolean(window.rivalSagaTmBrowseData?.moves)");
  await waitUntil("typeof state !== 'undefined' && typeof render === 'function'");
  await evaluate(`(() => {
    localStorage.removeItem('rival-saga-tm-shop-browse-ui-v1');
    localStorage.removeItem('rival-saga-tm-shop-browse-ui-v2');
    state.activePage = 'playerHub';
    state.activeView = 'shop';
    state.activeShop = 'tms';
    state.activePlayerId = 'gold';
    state.currentPhase = 'shop';
    state.phase = 'shop';
    const player = state.players.find((entry) => entry.id === 'gold');
    if (player) {
      player.balance = 50000;
      player.shopLevels = { items: 4, tms: 4, tokens: 4 };
    }
    document.querySelector('#searchInput').value = '';
    render();
  })()`);
  await waitUntil("document.querySelector('#shopView.tm-shop-mode .tm-shop-folder-tile')");

  const report = await evaluate(`(async () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const cards = () => [...document.querySelectorAll('#shopGrid .tm-shop-card')];
    const names = () => cards().map((card) => card.dataset.tmName);
    const cardData = () => cards().map((card) => ({
      name: card.dataset.tmName,
      type: card.dataset.tmType,
      moveClass: card.dataset.tmClass,
      shelf: card.dataset.tmShelf,
      context: card.querySelector('.tm-card-context')?.textContent?.trim() || '',
      identity: card.querySelector('.tm-card-identity')?.textContent?.replace(/\\s+/g, ' ').trim() || '',
      stats: [...card.querySelectorAll('.tm-card-stat-strip span')].map((stat) => stat.textContent.replace(/\\s+/g, ' ').trim()),
      oldBadges: [...card.querySelectorAll('.tm-card-meta .shop-meta-badge')].map((badge) => badge.textContent.trim()),
      hasDescription: Boolean(card.querySelector('.tm-card-description')),
      pp: card.dataset.tmPp,
      price: Number((card.querySelector('.price')?.textContent || '').replace(/[^0-9]/g, '')) || 0
    }));
    const activeFolder = () => document.querySelector('[data-tm-browse-folder].active')?.dataset.tmBrowseFolder || '';
    const activeShelf = () => document.querySelector('[data-tm-browse-shelf].active')?.dataset.tmBrowseShelf || '';
    const heading = () => document.querySelector('.tm-shop-results-header .eyebrow')?.textContent?.trim() || '';
    const resultCount = () => {
      const text = document.querySelector('.tm-shop-results-header h3')?.textContent || '';
      const match = text.match(/(\\d+)\\s+shown\\s+·\\s+(\\d+)\\s+total TMs/);
      return { text: text.trim(), shown: Number(match?.[1] || 0), total: Number(match?.[2] || 0) };
    };
    const shelfRank = { staples: 4, main: 3, niche: 2, junk: 1 };
    const effectiveAllShelf = (item) => Object.values(window.rivalSagaTmBrowseData.moves[item.name]?.placements || {})
      .sort((a, b) => (shelfRank[b] || 0) - (shelfRank[a] || 0))[0] || '';
    const countFor = (folder, shelf) => tmShopData.filter((item) => {
      const placements = window.rivalSagaTmBrowseData.moves[item.name]?.placements || {};
      return folder === 'all'
        ? effectiveAllShelf(item) === shelf
        : placements[folder] === shelf;
    }).length;
    const placementFor = (name, folder) => window.rivalSagaTmBrowseData.moves[name]?.placements?.[folder] || '';
    const shelfCounts = () => Object.fromEntries([...document.querySelectorAll('[data-tm-browse-shelf]')].map((button) => [
      button.dataset.tmBrowseShelf,
      Number(button.querySelector('b')?.textContent || 0)
    ]));
    const shelfButtonIds = () => [...document.querySelectorAll('[data-tm-browse-shelf]')].map((button) => button.dataset.tmBrowseShelf);
    const shelfButtonLabels = () => [...document.querySelectorAll('[data-tm-browse-shelf]')].map((button) => button.querySelector('span')?.textContent?.trim() || '');
    const clickFolder = async (folder) => {
      document.querySelector(\`[data-tm-browse-folder="\${folder}"]\`).click();
      await sleep(100);
    };
    const clickShelf = async (shelf) => {
      document.querySelector(\`[data-tm-browse-shelf="\${shelf}"]\`).click();
      await sleep(100);
    };
    const clickDamageType = async (type) => {
      document.querySelector(\`[data-tm-damage-type="\${type}"]\`)?.click();
      await sleep(100);
    };
    const clickDamageClass = async (moveClass) => {
      document.querySelector(\`[data-tm-damage-class="\${moveClass}"]\`)?.click();
      await sleep(100);
    };
    const quickFilterSnapshot = () => ({
      visible: document.querySelector('#tmDamageQuickFilters')?.classList.contains('hidden') === false,
      activeTypes: [...document.querySelectorAll('[data-tm-damage-type].active')].map((button) => button.dataset.tmDamageType),
      activeClasses: [...document.querySelectorAll('[data-tm-damage-class].active')].map((button) => button.dataset.tmDamageClass),
      names: names(),
      data: cardData(),
      resultCount: resultCount()
    });
    const search = async (term) => {
      const input = document.querySelector('#searchInput');
      input.value = term;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await sleep(150);
    };
    const openFilters = async () => {
      const toggle = document.querySelector('#tmShopFiltersToggle');
      if (toggle?.getAttribute('aria-expanded') !== 'true') toggle.click();
      await sleep(100);
    };
    const tmVisualMetrics = () => [...document.querySelectorAll('#shopGrid .tm-shop-card')].slice(0, 12).map((card) => {
      const visual = card.querySelector('.shop-entry-visual-tm');
      const visualRect = visual?.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const visualStyle = visual ? getComputedStyle(visual) : null;
      return {
        name: card.dataset.tmName,
        cardHeight: Math.round(cardRect.height),
        cardWidth: Math.round(cardRect.width),
        visualWidth: visualRect ? Math.round(visualRect.width) : 0,
        visualHeight: visualRect ? Math.round(visualRect.height) : 0,
        visualClasses: visual?.className || '',
        visualBackgroundImage: visualStyle?.backgroundImage || '',
        visualBackgroundColor: visualStyle?.backgroundColor || ''
      };
    });
    const railStyleMetrics = () => [...document.querySelectorAll('.tm-browse-tab, .tm-shelf-tab')].map((button) => {
      const style = getComputedStyle(button);
      return {
        text: button.textContent.trim(),
        radius: parseFloat(style.borderTopLeftRadius) || 0,
        backgroundImage: style.backgroundImage || '',
        backgroundColor: style.backgroundColor || '',
        color: style.color,
        appearance: style.appearance || style.webkitAppearance || ''
      };
    });

    const scripts = [...document.scripts].map((script) => script.src);
    const tmBrowseScriptIndex = scripts.findIndex((src) => src.includes('tm-browse-data.js'));
    const appScriptIndex = scripts.findIndex((src) => src.includes('app.js'));
    const landingSnapshot = {
      tiles: [...document.querySelectorAll('[data-tm-folder-entry]')].map((button) => ({
        folder: button.dataset.tmFolderEntry,
        text: button.textContent.replace(/\s+/g, ' ').trim(),
        title: button.querySelector('strong')?.textContent?.trim() || '',
        subtitle: button.querySelector('small')?.textContent?.trim() || ''
      })),
      browseAllText: document.querySelector('[data-tm-browse-all]')?.textContent?.trim() || '',
      browseControlsHidden: document.querySelector('#tmBrowseControls')?.classList.contains('hidden') === true,
      quickFiltersHidden: document.querySelector('#tmDamageQuickFilters')?.classList.contains('hidden') === true,
      cardCount: cards().length,
      searchPlaceholder: document.querySelector('#searchInput')?.getAttribute('placeholder') || ''
    };
    await search('Flamethrower');
    const landingSearchSnapshot = {
      heading: heading(),
      names: names(),
      browseControlsHidden: document.querySelector('#tmBrowseControls')?.classList.contains('hidden') === true,
      quickFiltersHidden: document.querySelector('#tmDamageQuickFilters')?.classList.contains('hidden') === true
    };
    await search('');
    const landingRestoredSnapshot = {
      tiles: [...document.querySelectorAll('[data-tm-folder-entry]')].map((button) => button.dataset.tmFolderEntry),
      cardCount: cards().length
    };
    document.querySelector('[data-tm-folder-entry="setup"]')?.click();
    await sleep(100);
    const folderTileEntrySnapshot = {
      activeFolder: activeFolder(),
      activeShelf: activeShelf(),
      heading: heading(),
      quickFiltersHidden: document.querySelector('#tmDamageQuickFilters')?.classList.contains('hidden') === true,
      shelfLabels: shelfButtonLabels()
    };
    localStorage.removeItem('rival-saga-tm-shop-browse-ui-v2');
    render();
    await sleep(100);
    localStorage.setItem('rival-saga-tm-shop-browse-ui-v2', JSON.stringify({
      default: {
        gold: {
          folder: 'all',
          shelf: 'main',
          type: 'All',
          moveClass: 'All',
          canAfford: false,
          expanded: false
        }
      }
    }));
    render();
    await sleep(100);
    const staleSavedSnapshot = {
      tiles: [...document.querySelectorAll('[data-tm-folder-entry]')].map((button) => button.dataset.tmFolderEntry),
      shelfIds: shelfButtonIds(),
      shelfLabels: shelfButtonLabels(),
      activeFolder: activeFolder(),
      activeShelf: activeShelf(),
      heading: heading(),
      resultCount: resultCount(),
      shelfCounts: shelfCounts()
    };
    localStorage.removeItem('rival-saga-tm-shop-browse-ui-v2');
    render();
    await sleep(100);
    document.querySelector('[data-tm-browse-all]')?.click();
    await sleep(100);
    const defaultStaplesCount = countFor('all', 'staples');
    const defaultSnapshot = {
      title: document.querySelector('#shopDepartmentTitle')?.textContent?.trim() || '',
      subtitle: document.querySelector('#shopDepartmentSubtitle')?.textContent?.trim() || '',
      tmBrowseBeforeApp: tmBrowseScriptIndex >= 0 && appScriptIndex >= 0 && tmBrowseScriptIndex < appScriptIndex,
      mappingCount: Object.keys(window.rivalSagaTmBrowseData.moves || {}).length,
      canonicalTmCount: tmShopData.length,
      shelfIds: shelfButtonIds(),
      shelfLabels: shelfButtonLabels(),
      activeFolder: activeFolder(),
      activeShelf: activeShelf(),
      heading: heading(),
      resultCount: resultCount(),
      cardCount: cards().length,
      expectedStaplesCount: defaultStaplesCount,
      uniqueNames: new Set(names()).size,
      hasLevelBrowseText: /Level\\s+\\d|Move Level|shop level/i.test(document.querySelector('#shopView')?.textContent || ''),
      filterDisclosureClosed: document.querySelector('#tmMoveFilters')?.classList.contains('hidden') === true,
      visibleFilterButton: document.querySelector('#tmShopFiltersToggle:not(.hidden)')?.textContent?.trim() || ''
    };
    const placementSnapshot = {
      rapidSpinField: placementFor('Rapid Spin', 'field'),
      rapidSpinDamage: placementFor('Rapid Spin', 'damage'),
      powerUpPunchSetup: placementFor('Power-Up Punch', 'setup'),
      powerUpPunchDamage: placementFor('Power-Up Punch', 'damage'),
      clearSmogDisruption: placementFor('Clear Smog', 'disruption'),
      clearSmogDamage: placementFor('Clear Smog', 'damage'),
      chillingWaterDisruption: placementFor('Chilling Water', 'disruption'),
      magicRoomField: placementFor('Magic Room', 'field'),
      tailwindField: placementFor('Tailwind', 'field'),
      yawnDisruption: placementFor('Yawn', 'disruption'),
      hornDrillDamage: placementFor('Horn Drill', 'damage'),
      rapidSpinAll: effectiveAllShelf(tmShopData.find((item) => item.name === 'Rapid Spin')),
      missingAllShelf: typeof tmBrowsePlacementShelf === 'function' ? tmBrowsePlacementShelf({ name: '__Missing TM__' }, 'all') : 'unavailable',
      rapidSpinHasOldShelf: Object.hasOwn(window.rivalSagaTmBrowseData.moves['Rapid Spin'] || {}, 'shelf'),
      rapidSpinHasOldFolders: Object.hasOwn(window.rivalSagaTmBrowseData.moves['Rapid Spin'] || {}, 'folders')
    };
    const defaultVisualMetrics = tmVisualMetrics();
    const defaultRailStyleMetrics = railStyleMetrics();
    const allShelfCounts = shelfCounts();

    const defaultNames = names();
    await clickFolder('setup');
    await clickShelf('main');
    const setupMainNames = names();
    await clickShelf('staples');
    const setupStaplesNames = names();
    await clickFolder('damage');
    const damageQuickInitial = quickFilterSnapshot();
    await clickDamageType('Fire');
    await clickDamageType('Water');
    await clickDamageType('Electric');
    const damageMultiType = quickFilterSnapshot();
    await clickDamageClass('Physical');
    const damageMultiTypePhysical = quickFilterSnapshot();
    await clickDamageClass('Physical');
    await clickDamageClass('Special');
    const damageMultiTypeSpecial = quickFilterSnapshot();
    await clickDamageClass('Physical');
    const damageMultiTypeBothClasses = quickFilterSnapshot();
    await clickDamageType('All');
    const damageAllTypesCleared = quickFilterSnapshot();
    await clickDamageClass('Special');
    await clickDamageClass('Physical');
    await clickShelf('main');
    const damageShelfCounts = shelfCounts();
    const damageMainNames = names();
    await clickShelf('niche');
    const damageNicheNames = names();
    await clickShelf('junk');
    const damageJunkNames = names();
    await clickFolder('disruption');
    await clickShelf('main');
    const disruptionMainNames = names();

    await clickFolder('field');
    const fieldQuickFiltersHidden = document.querySelector('#tmDamageQuickFilters')?.classList.contains('hidden') === true;
    await clickShelf('main');
    const fieldShelfCounts = shelfCounts();
    const fieldMainNames = names();
    await clickShelf('staples');
    const fieldStaplesNames = names();
    await clickShelf('junk');
    const fieldJunkNames = names();
    await clickShelf('staples');
    await search('Rapid Spin');
    const searchSnapshot = {
      heading: heading(),
      names: names(),
      data: cardData(),
      uniqueNames: new Set(names()).size,
      storedFolder: typeof tmShopBrowseState === 'function' ? tmShopBrowseState().folder : activeFolder(),
      storedShelf: typeof tmShopBrowseState === 'function' ? tmShopBrowseState().shelf : activeShelf()
    };
    await search('');
    const restoredSnapshot = {
      activeFolder: activeFolder(),
      activeShelf: activeShelf(),
      heading: heading()
    };

    await clickFolder('all');
    await clickShelf('staples');
    await openFilters();
    document.querySelector('#tmTypeFilter').value = 'Fire';
    document.querySelector('#tmTypeFilter').dispatchEvent(new Event('change', { bubbles: true }));
    await sleep(100);
    document.querySelector('#tmDamageClassFilter').value = 'Special';
    document.querySelector('#tmDamageClassFilter').dispatchEvent(new Event('change', { bubbles: true }));
    await sleep(100);
    const filteredData = cardData();
    const chipText = [...document.querySelectorAll('#itemShopAppliedFilters button')].map((button) => button.textContent.trim());
    document.querySelector('[data-tm-shop-remove-filter="type"]')?.click();
    await sleep(100);
    const afterRemoveType = {
      chipText: [...document.querySelectorAll('#itemShopAppliedFilters button')].map((button) => button.textContent.trim()),
      typeValue: document.querySelector('#tmTypeFilter')?.value || ''
    };
    document.querySelector('[data-tm-shop-clear-filters]')?.click();
    await sleep(100);
    const afterClear = {
      hidden: document.querySelector('#itemShopAppliedFilters')?.classList.contains('hidden') === true,
      typeValue: document.querySelector('#tmTypeFilter')?.value || '',
      classValue: document.querySelector('#tmDamageClassFilter')?.value || ''
    };

    const player = state.players.find((entry) => entry.id === 'gold');
    player.balance = 1500;
    await clickFolder('field');
    await clickShelf('niche');
    await openFilters();
    const afford = document.querySelector('#tmCanAffordFilter');
    if (!afford.checked) afford.click();
    await sleep(100);
    const affordableData = cardData();
    afford.click();
    player.balance = 50000;
    await sleep(100);

    await search('Flamethrower');
    const flamethrowerCard = cards().find((card) => card.dataset.tmName === 'Flamethrower');
    flamethrowerCard?.querySelector('.shop-buy-button')?.click();
    await sleep(100);
    const cartEntry = state.shopCart?.items?.find((entry) => entry.name === 'Flamethrower') || null;

    const shopView = document.querySelector('#shopView');
    const desktopShopOverflow = shopView ? shopView.scrollWidth > shopView.clientWidth + 1 : true;
    const overflowProbe = shopView ? [...shopView.querySelectorAll('*')]
      .map((node) => ({
        tag: node.tagName,
        id: node.id || '',
        className: typeof node.className === 'string' ? node.className : '',
        scrollWidth: node.scrollWidth,
        clientWidth: node.clientWidth,
        text: node.textContent?.replace(/\\s+/g, ' ').trim().slice(0, 80) || ''
      }))
      .filter((entry) => entry.scrollWidth > shopView.clientWidth + 1 || entry.clientWidth > shopView.clientWidth + 1)
      .slice(0, 10) : [];
    return {
      landingSnapshot,
      landingSearchSnapshot,
      landingRestoredSnapshot,
      folderTileEntrySnapshot,
      defaultSnapshot,
      placementSnapshot,
      defaultVisualMetrics,
      defaultRailStyleMetrics,
      damageQuickInitial,
      damageMultiType,
      damageMultiTypePhysical,
      damageMultiTypeSpecial,
      damageMultiTypeBothClasses,
      damageAllTypesCleared,
      shelfCounts: allShelfCounts,
      expectedShelfCounts: {
        staples: countFor('all', 'staples'),
        main: countFor('all', 'main'),
        niche: countFor('all', 'niche'),
        junk: countFor('all', 'junk')
      },
      v2ExpectedShelfCounts: {
        staples: 119,
        main: 132,
        niche: 109,
        junk: 93
      },
      damageShelfCounts,
      expectedDamageShelfCounts: {
        staples: countFor('damage', 'staples'),
        main: countFor('damage', 'main'),
        niche: countFor('damage', 'niche'),
        junk: countFor('damage', 'junk')
      },
      v2ExpectedDamageShelfCounts: {
        staples: 84,
        main: 93,
        niche: 79,
        junk: 40
      },
      fieldShelfCounts,
      fieldQuickFiltersHidden,
      expectedFieldShelfCounts: {
        staples: countFor('field', 'staples'),
        main: countFor('field', 'main'),
        niche: countFor('field', 'niche'),
        junk: countFor('field', 'junk')
      },
      v2ExpectedFieldShelfCounts: {
        staples: 9,
        main: 8,
        niche: 4,
        junk: 5
      },
      staleSavedSnapshot,
      defaultHasRapidSpin: defaultNames.filter((name) => name === 'Rapid Spin').length,
      setupHasPowerUpPunch: setupMainNames.includes('Power-Up Punch'),
      setupStaplesHasSubstitute: setupStaplesNames.includes('Substitute'),
      damageMainHasPowerUpPunch: damageMainNames.includes('Power-Up Punch'),
      damageNicheHasPowerUpPunch: damageNicheNames.includes('Power-Up Punch'),
      damageNicheHasHornDrill: damageNicheNames.includes('Horn Drill'),
      fieldMainHasRapidSpin: fieldMainNames.includes('Rapid Spin'),
      fieldStaplesHasRapidSpin: fieldStaplesNames.includes('Rapid Spin'),
      fieldJunkHasMagicRoom: fieldJunkNames.includes('Magic Room'),
      damageMainHasRapidSpin: damageMainNames.includes('Rapid Spin'),
      damageJunkHasRapidSpin: damageJunkNames.includes('Rapid Spin'),
      disruptionMainHasClearSmog: disruptionMainNames.includes('Clear Smog'),
      damageMainHasClearSmog: damageMainNames.includes('Clear Smog'),
      damageNicheHasClearSmog: damageNicheNames.includes('Clear Smog'),
      searchSnapshot,
      restoredSnapshot,
      filteredData,
      chipText,
      afterRemoveType,
      afterClear,
      affordableData,
      cartEntry,
      desktopShopOverflow,
      overflowProbe
    };
  })()`, 25000);

  assert.deepEqual(report.landingSnapshot.tiles.map((tile) => tile.folder), ["damage", "setup", "disruption", "field", "support"]);
  assert.equal(report.landingSnapshot.tiles[0].title, "Damage");
  assert.equal(report.landingSnapshot.tiles[0].subtitle, "Attacks & coverage");
  assert.equal(report.landingSnapshot.browseAllText, "Browse All 453 TMs");
  assert.equal(report.landingSnapshot.browseControlsHidden, true);
  assert.equal(report.landingSnapshot.quickFiltersHidden, true);
  assert.equal(report.landingSnapshot.cardCount, 0);
  assert.equal(report.landingSnapshot.searchPlaceholder, "Search TMs...");
  assert.equal(report.landingSearchSnapshot.heading, "Search Results");
  assert.deepEqual(report.landingSearchSnapshot.names, ["Flamethrower"]);
  assert.equal(report.landingSearchSnapshot.browseControlsHidden, true);
  assert.equal(report.landingSearchSnapshot.quickFiltersHidden, true);
  assert.deepEqual(report.landingRestoredSnapshot.tiles, ["damage", "setup", "disruption", "field", "support"]);
  assert.equal(report.landingRestoredSnapshot.cardCount, 0);
  assert.equal(report.folderTileEntrySnapshot.activeFolder, "setup");
  assert.equal(report.folderTileEntrySnapshot.activeShelf, "staples");
  assert.equal(report.folderTileEntrySnapshot.heading, "Setup · Staples");
  assert.equal(report.folderTileEntrySnapshot.quickFiltersHidden, true);
  assert.deepEqual(report.folderTileEntrySnapshot.shelfLabels, shelfLabels);
  assert.equal(report.defaultSnapshot.title, "TMs");
  assert.equal(report.defaultSnapshot.subtitle, "Build your move library");
  assert.equal(report.defaultSnapshot.tmBrowseBeforeApp, true);
  assert.equal(report.defaultSnapshot.mappingCount, 453);
  assert.equal(report.defaultSnapshot.canonicalTmCount, 453);
  assert.deepEqual(report.defaultSnapshot.shelfIds, shelfOrder);
  assert.deepEqual(report.defaultSnapshot.shelfLabels, shelfLabels);
  assert.equal(report.defaultSnapshot.activeFolder, "all");
  assert.equal(report.defaultSnapshot.activeShelf, "staples");
  assert.equal(report.defaultSnapshot.heading, "All · Staples");
  assert.deepEqual(report.defaultSnapshot.resultCount, {
    text: `${report.defaultSnapshot.expectedStaplesCount} shown · 453 total TMs`,
    shown: report.defaultSnapshot.expectedStaplesCount,
    total: 453
  });
  assert.deepEqual(report.staleSavedSnapshot.tiles, ["damage", "setup", "disruption", "field", "support"]);
  assert.deepEqual(report.staleSavedSnapshot.shelfIds, []);
  assert.deepEqual(report.staleSavedSnapshot.shelfLabels, []);
  assert.equal(report.defaultSnapshot.cardCount, report.defaultSnapshot.expectedStaplesCount);
  assert.equal(report.defaultSnapshot.uniqueNames, report.defaultSnapshot.cardCount);
  assert.equal(report.defaultSnapshot.hasLevelBrowseText, false);
  assert.equal(report.defaultSnapshot.filterDisclosureClosed, true);
  assert.equal(report.defaultSnapshot.visibleFilterButton, "Filters");
  assert.deepEqual(report.placementSnapshot, {
    rapidSpinField: "staples",
    rapidSpinDamage: "junk",
    powerUpPunchSetup: "main",
    powerUpPunchDamage: "niche",
    clearSmogDisruption: "main",
    clearSmogDamage: "niche",
    chillingWaterDisruption: "",
    magicRoomField: "junk",
    tailwindField: "niche",
    yawnDisruption: "main",
    hornDrillDamage: "niche",
    rapidSpinAll: "staples",
    missingAllShelf: "",
    rapidSpinHasOldShelf: false,
    rapidSpinHasOldFolders: false
  });
  assert.ok(report.defaultVisualMetrics.length > 0);
  report.defaultVisualMetrics.forEach((metric) => {
    assert.ok(metric.cardHeight <= 176, `${metric.name} TM card should stay compact and readable: ${JSON.stringify(metric)}`);
    assert.ok(metric.visualWidth > 0 && metric.visualWidth <= 44, `${metric.name} TM visual should be a small accent: ${JSON.stringify(metric)}`);
    assert.ok(metric.visualHeight > 0 && metric.visualHeight <= 44, `${metric.name} TM visual should be a small accent: ${JSON.stringify(metric)}`);
    assert.doesNotMatch(metric.visualClasses, /(^|\s)type-[a-z]/, `${metric.name} TM visual should not use global Pokemon type classes`);
    assert.match(metric.visualClasses, /\btm-type-[a-z]/, `${metric.name} TM visual should use scoped TM type classes`);
  });
  assert.ok(report.defaultRailStyleMetrics.length >= 10);
  report.defaultRailStyleMetrics.forEach((metric) => {
    assert.ok(metric.radius >= 12, `TM rail button should have segmented rounding: ${JSON.stringify(metric)}`);
    assert.notEqual(metric.backgroundColor, "rgb(239, 239, 239)", `TM rail button should not render as browser default: ${JSON.stringify(metric)}`);
  });
  assert.deepEqual(report.shelfCounts, report.expectedShelfCounts);
  assert.deepEqual(report.shelfCounts, report.v2ExpectedShelfCounts);
  assert.equal(Object.values(report.shelfCounts).reduce((sum, count) => sum + count, 0), report.defaultSnapshot.canonicalTmCount);
  assert.equal(report.damageQuickInitial.visible, true);
  assert.deepEqual(report.damageQuickInitial.activeTypes, ["All"]);
  assert.deepEqual(report.damageQuickInitial.activeClasses, []);
  assert.equal(report.damageMultiType.visible, true);
  assert.deepEqual(report.damageMultiType.activeTypes.sort(), ["Electric", "Fire", "Water"]);
  assert.ok(report.damageMultiType.data.length > 0);
  report.damageMultiType.data.forEach((card) => assert.ok(["Electric", "Fire", "Water"].includes(card.type), `${card.name} should match one selected type`));
  assert.deepEqual(report.damageMultiTypePhysical.activeClasses, ["Physical"]);
  report.damageMultiTypePhysical.data.forEach((card) => {
    assert.ok(["Electric", "Fire", "Water"].includes(card.type), `${card.name} should keep selected type OR filter`);
    assert.equal(card.moveClass, "Physical");
  });
  assert.deepEqual(report.damageMultiTypeSpecial.activeClasses, ["Special"]);
  report.damageMultiTypeSpecial.data.forEach((card) => {
    assert.ok(["Electric", "Fire", "Water"].includes(card.type), `${card.name} should keep selected type OR filter`);
    assert.equal(card.moveClass, "Special");
  });
  assert.deepEqual(report.damageMultiTypeBothClasses.activeClasses.sort(), ["Physical", "Special"]);
  report.damageMultiTypeBothClasses.data.forEach((card) => {
    assert.ok(["Electric", "Fire", "Water"].includes(card.type), `${card.name} should keep selected type OR filter`);
    assert.ok(["Physical", "Special"].includes(card.moveClass), `${card.name} should match one selected category`);
  });
  assert.deepEqual(report.damageAllTypesCleared.activeTypes, ["All"]);
  assert.equal(report.damageAllTypesCleared.activeTypes.includes("Fire"), false);
  report.damageAllTypesCleared.data.forEach((card) => assert.ok(["Physical", "Special"].includes(card.moveClass), `${card.name} should still respect selected categories`));
  assert.deepEqual(report.damageShelfCounts, report.expectedDamageShelfCounts);
  assert.deepEqual(report.damageShelfCounts, report.v2ExpectedDamageShelfCounts);
  assert.deepEqual(report.fieldShelfCounts, report.expectedFieldShelfCounts);
  assert.deepEqual(report.fieldShelfCounts, report.v2ExpectedFieldShelfCounts);
  assert.equal(report.fieldQuickFiltersHidden, true);
  assert.equal(report.defaultHasRapidSpin, 1);
  assert.equal(report.setupHasPowerUpPunch, true);
  assert.equal(report.setupStaplesHasSubstitute, true);
  assert.equal(report.damageMainHasPowerUpPunch, false);
  assert.equal(report.damageNicheHasPowerUpPunch, true);
  assert.equal(report.damageNicheHasHornDrill, true);
  assert.equal(report.fieldMainHasRapidSpin, false);
  assert.equal(report.fieldStaplesHasRapidSpin, true);
  assert.equal(report.fieldJunkHasMagicRoom, true);
  assert.equal(report.damageMainHasRapidSpin, false);
  assert.equal(report.damageJunkHasRapidSpin, true);
  assert.equal(report.disruptionMainHasClearSmog, true);
  assert.equal(report.damageMainHasClearSmog, false);
  assert.equal(report.damageNicheHasClearSmog, true);
  assert.equal(report.searchSnapshot.heading, "Search Results");
  assert.deepEqual(report.searchSnapshot.names, ["Rapid Spin"]);
  assert.equal(report.searchSnapshot.uniqueNames, 1);
  assert.ok(report.searchSnapshot.data.some((card) => card.name === "Rapid Spin" && /Field · Staples/.test(card.context) && /Damage · Junk Drawer/.test(card.context)));
  assert.equal(report.searchSnapshot.storedFolder, "field");
  assert.equal(report.searchSnapshot.storedShelf, "staples");
  assert.equal(report.restoredSnapshot.activeFolder, "field");
  assert.equal(report.restoredSnapshot.activeShelf, "staples");
  assert.equal(report.restoredSnapshot.heading, "Field · Staples");
  assert.ok(report.filteredData.length > 0);
  report.filteredData.forEach((card) => {
    assert.equal(card.type, "Fire");
    assert.equal(card.moveClass, "Special");
    assert.equal(card.hasDescription, false);
    assert.equal(card.oldBadges.length, 0, `${card.name} should not duplicate Type/Category as old badges`);
    assert.match(card.identity, /^FIRE · SPECIAL$/);
    assert.ok(card.stats.some((stat) => /^POW /.test(stat)), `${card.name} should expose power metadata`);
    assert.ok(card.stats.some((stat) => /^ACC /.test(stat)), `${card.name} should expose accuracy metadata`);
    assert.ok(card.stats.some((stat) => /^PP /.test(stat)), `${card.name} should expose canonical PP metadata`);
    assert.notEqual(card.pp, "-");
  });
  assert.ok(report.chipText.includes("Fire x"));
  assert.ok(report.chipText.includes("Special x"));
  assert.equal(report.afterRemoveType.typeValue, "All");
  assert.ok(!report.afterRemoveType.chipText.includes("Fire x"));
  assert.equal(report.afterClear.hidden, true);
  assert.equal(report.afterClear.typeValue, "All");
  assert.equal(report.afterClear.classValue, "All");
  assert.ok(report.affordableData.length > 0);
  assert.ok(report.affordableData.some((card) => card.name === "Tailwind"), "Tailwind should be affordable in Field · Niche");
  report.affordableData.forEach((card) => assert.ok(card.price <= 1500, `${card.name} should be affordable`));
  assert.equal(report.cartEntry?.name, "Flamethrower");
  assert.equal(report.cartEntry?.shopType, "tms");
  assert.match(report.cartEntry?.id || "", /^tm-/);
  assert.equal(report.desktopShopOverflow, false, JSON.stringify(report.overflowProbe, null, 2));

  await evaluate(`(() => {
    const input = document.querySelector('#searchInput');
    if (input) {
      input.value = '';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
    if (typeof setTmShopBrowseState === 'function') {
      setTmShopBrowseState({ view: 'landing', folder: 'all', shelf: 'staples', type: 'All', types: [], moveClass: 'All', moveClasses: [], canAfford: false, expanded: false }, activePlayer());
    }
    window.scrollTo(0, 0);
    render();
  })()`);
  const landingDesktopShot = await captureViewportSlice("tm-shop-landing-desktop-full.png", 1280, 760);
  const landingMobileShot = await captureViewportSlice("tm-shop-landing-mobile-full.png", 390, 760);
  await evaluate(`(() => {
    if (typeof setTmShopBrowseState === 'function') {
      setTmShopBrowseState({ view: 'browse', folder: 'damage', shelf: 'staples', type: 'All', types: [], moveClass: 'All', moveClasses: [], canAfford: false, expanded: false }, activePlayer());
    }
    window.scrollTo(0, 0);
    render();
  })()`);
  const layoutSamples = {
    ultrawide: await tmLayoutSnapshot(1920, 900),
    desktop: await tmLayoutSnapshot(1440, 820),
    narrowDesktop: await tmLayoutSnapshot(1100, 780),
    tablet: await tmLayoutSnapshot(820, 760),
    mobile: await tmLayoutSnapshot(390, 760)
  };
  const ultraWideShot = await captureViewportSlice("tm-shop-damage-ultrawide-full.png", 1920, 900);
  const wideDesktopShot = await captureViewportSlice("tm-shop-damage-desktop-1440-full.png", 1440, 820);
  const desktopShot = await captureViewportSlice("tm-shop-damage-desktop-top-250.png", 1280, 250);
  const desktopFullShot = await captureViewportSlice("tm-shop-damage-desktop-full.png", 1280, 760);
  const narrowDesktopShot = await captureViewportSlice("tm-shop-damage-narrow-desktop-full.png", 1100, 760);
  const tabletShot = await captureViewportSlice("tm-shop-damage-tablet-full.png", 820, 760);
  const mobileShot = await captureViewportSlice("tm-shop-damage-mobile-top-250.png", 390, 250);
  const mobileFullShot = await captureViewportSlice("tm-shop-damage-mobile-full.png", 390, 760);
  const statusAndVariableProbe = await evaluate(`(async () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const search = async (term) => {
      const input = document.querySelector('#searchInput');
      input.value = term;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await sleep(120);
    };
    const cardProbe = () => {
      const card = document.querySelector('.tm-shop-card');
      return {
        name: card?.dataset.tmName || '',
        identity: card?.querySelector('.tm-card-identity')?.textContent?.replace(/\\s+/g, ' ').trim() || '',
        stats: [...(card?.querySelectorAll('.tm-card-stat-strip span') || [])].map((stat) => stat.textContent.replace(/\\s+/g, ' ').trim()),
        statWidths: [...(card?.querySelectorAll('.tm-card-stat-strip span') || [])].map((stat) => Math.round(stat.getBoundingClientRect().width)),
        buttonWidths: [...(card?.querySelectorAll('.tm-card-actions button') || [])].map((button) => Math.round(button.getBoundingClientRect().width))
      };
    };
    await search('Substitute');
    const status = cardProbe();
    await search('Electro Ball');
    const variable = cardProbe();
    await search('');
    return { status, variable };
  })()`, 10000);
  const mobileReport = layoutSamples.mobile;
  assert.equal(mobileReport.columns, 1);
  assert.equal(mobileReport.overflow, false);
  assert.ok(mobileReport.cardMetrics.length > 0);
  assert.deepEqual({
    ultrawide: layoutSamples.ultrawide.columns,
    desktop: layoutSamples.desktop.columns,
    narrowDesktop: layoutSamples.narrowDesktop.columns,
    tablet: layoutSamples.tablet.columns,
    mobile: layoutSamples.mobile.columns
  }, {
    ultrawide: 5,
    desktop: 4,
    narrowDesktop: 3,
    tablet: 3,
    mobile: 1
  });
  Object.values(layoutSamples).forEach((sample) => {
    assert.ok(sample.columns <= 5, `TM grid should never exceed five columns: ${JSON.stringify(sample)}`);
    assert.equal(sample.overflow, false, `TM grid should not overflow at ${sample.width}px`);
    assert.ok(sample.firstRowCount <= 5, `TM first row should not exceed five cards: ${JSON.stringify(sample)}`);
    assert.ok(sample.textStartSpread <= 1, `TM card text should start on a fixed icon grid: ${JSON.stringify(sample.cardMetrics)}`);
    sample.cardMetrics.forEach((metric) => {
      assert.ok(metric.height <= 186, `${metric.name} TM card should remain compact: ${JSON.stringify(metric)}`);
      assert.ok(metric.visualWidth > 0 && metric.visualWidth <= 50, `${metric.name} TM visual should stay in a fixed icon column: ${JSON.stringify(metric)}`);
      assert.ok(metric.visualCenterOffset <= 26, `${metric.name} TM visual should align with the identity/type band: ${JSON.stringify(metric)}`);
      assert.ok(metric.headerTopDelta <= 6, `${metric.name} TM name and price should align in the header: ${JSON.stringify(metric)}`);
      assert.ok(metric.priceRightGap <= 14, `${metric.name} TM price/info should stay on the upper-right edge: ${JSON.stringify(metric)}`);
      assert.equal(metric.statCount, 3, `${metric.name} should render POW/ACC/PP as one three-part stat row`);
      assert.ok(metric.statWidthSpread <= 2, `${metric.name} POW/ACC/PP columns should align evenly: ${JSON.stringify(metric)}`);
      assert.ok(metric.buttonWidthSpread <= 2, `${metric.name} Add/Buy buttons should be balanced: ${JSON.stringify(metric)}`);
    });
  });
  assert.match(statusAndVariableProbe.status.identity, /STATUS$/);
  assert.ok(statusAndVariableProbe.status.stats.some((stat) => /^POW -$/.test(stat)), JSON.stringify(statusAndVariableProbe.status));
  assert.ok(statusAndVariableProbe.variable.stats.some((stat) => /^POW VAR$/.test(stat)), JSON.stringify(statusAndVariableProbe.variable));
  assert.ok(fs.existsSync(landingDesktopShot));
  assert.ok(fs.existsSync(landingMobileShot));
  assert.ok(fs.existsSync(ultraWideShot));
  assert.ok(fs.existsSync(wideDesktopShot));
  assert.ok(fs.existsSync(desktopShot));
  assert.ok(fs.existsSync(desktopFullShot));
  assert.ok(fs.existsSync(narrowDesktopShot));
  assert.ok(fs.existsSync(tabletShot));
  assert.ok(fs.existsSync(mobileShot));
  assert.ok(fs.existsSync(mobileFullShot));
  assert.deepEqual(actionableBrowserErrors(), []);
  assert.deepEqual(actionableExternalRequests(), []);
});
