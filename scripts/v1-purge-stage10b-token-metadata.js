#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");
const source = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
const start = source.indexOf("const defaultTokenShopData = Object.freeze([");
const end = source.indexOf("\n]);", start);
if (start < 0 || end < 0) throw new Error("defaultTokenShopData not found");
const ids = new Set(["quick-ball-token", "dream-ball-token", "honey-token", "beast-ball-token"]);
for (const line of source.slice(start, end).split(/\r?\n/)) {
  const id = line.match(/\bid:\s*"([^"]+)"/)?.[1] || "";
  if (ids.has(id)) console.log(line.trim());
}
