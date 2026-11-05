#!/usr/bin/env node
/**
 * scripts/capture-duffer-cc.mjs — the Duffer "Command Center" stills (design-spec-r2 §6.2, §6.4, §7.2 #18).
 *
 * Renders the REAL Command Center panel (its built bundle) on its own test fixtures, with every
 * partner, dealer, person, town and address swapped for this repo's invented Duffer names, and
 * shoots the six views the showcase clicks through. Never production: every /api/ request is
 * answered here from the fixtures, every other host is refused except the public font CSS.
 *
 *   node scripts/capture-duffer-cc.mjs --repo <duffer-partner-program checkout with a built panel>
 *        [--out public/images/showcase/duffer] [--data src/data/showcase/scenes/duffer-cc-stills.ts]
 *        [--review <dir>]   also write full-size PNGs there for reading
 *        [--explore <dir>]  write full-page desk + phone PNGs of every view there and stop
 *
 * The panel must be built first, in that checkout:  cd panel && node scripts/stage-robot.mjs && npx vite build
 *
 * NAMES. The fixtures' names are never written in this file: the swap reads them from the fixture
 * payloads at run time (partner/dealer rows, cities, people fields) and maps each one, by its
 * position, to an invented one. What survives anywhere else is caught by the words check: every
 * still ships with `<still>.words.json` (the text drawn inside it), and tests/demo-privacy.probe.mjs
 * fails a still whose words carry an unregistered capitalised word or a deny-listed term.
 *
 * Output per view: `<id>.webp` (desk, 2x of its display box) and `<id>-phone.webp`, each with its
 * `.words.json`, plus the generated geometry module (cursor targets, the feed row) for the scene.
 */
import { createRequire } from "node:module";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SELF = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(SELF), "..");
const req = createRequire(path.join(ROOT, "package.json"));
const { chromium } = req("playwright");
const sharp = req("sharp");

/* ------------------------------------------------------------------ args */
const arg = (name, dflt) => {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : dflt;
};
const REPO = arg("repo");
if (!REPO) {
  console.error("usage: node scripts/capture-duffer-cc.mjs --repo <duffer-partner-program checkout> [--out dir] [--data file] [--review dir] [--explore dir]");
  process.exit(2);
}
const OUT = path.resolve(ROOT, arg("out", "public/images/showcase/duffer"));
const DATA = path.resolve(ROOT, arg("data", "src/data/showcase/scenes/duffer-cc-stills.ts"));
const REVIEW = arg("review") ? path.resolve(arg("review")) : null;
const EXPLORE = arg("explore") ? path.resolve(arg("explore")) : null;
const STATIC = path.join(REPO, "worker", "static");
const TESTS = path.join(REPO, "panel", "tests");
const MC_CLIENT = path.join(REPO, ".mc-packages", "portal", "clients", "duffer-golf");
const INDEX = path.join(STATIC, "admin", "index.html");
if (!fs.existsSync(INDEX)) {
  console.error(`no built panel at ${INDEX}. Build it: cd panel && node scripts/stage-robot.mjs && npx vite build`);
  process.exit(2);
}
const BUNDLE = (fs.readFileSync(INDEX, "utf8").match(/src="\/admin\/assets\/(index-[^"]+\.js)"/) || [])[1];
if (!BUNDLE) throw new Error("the built index.html names no entry chunk");
console.log(`[duffer-cc] panel bundle ${BUNDLE}`);

/* ------------------------------------------------- the invented names */
// Every name below is in src/data/demos/invented/duffer-golf.ts or duffer-command-center.ts.
const COURSES = [
  // The three web-checked courses, in the client file's own pairing (clients/duffer-golf.ts).
  { slug: "sumac", name: "Sumac Hollow Golf Club", town: "Tull Prairie", display: 4, facility: "golf_course", site: "sumachollow.example" },
  { slug: "cottonwood", name: "Lone Cottonwood Golf Course", town: "Brannick", display: 9, facility: "golf_course", site: "lonecottonwood.example" },
  { slug: "wheatgrass", name: "Wheatgrass Pines Golf Club", town: "Osgood Bend", display: 11, facility: "golf_course", site: "wheatgrasspines.example" },
  // Composed from the checked invented towns plus a generic word (duffer-command-center.ts).
  { slug: "osgoodcc", name: "Osgood Bend Country Club", town: "Osgood Bend", display: 21, facility: "golf_course", site: "osgoodbendcc.example" },
  { slug: "brannickrange", name: "Brannick Driving Range", town: "Brannick", display: 15, facility: "driving_range", site: "brannickrange.example" },
];
const DEALERS = [
  { slug: "tullsupply", name: "Tull Prairie Golf Supply", town: "Tull Prairie" },
  { slug: "brannicksupply", name: "Brannick Golf Supply", town: "Brannick" },
];
const PEOPLE = [
  { first: "Hal", last: "Wendorf", role: "Head pro" },
  { first: "Marty", last: "Ostrand", role: "General manager" },
  { first: "Len", last: "Kessinger", role: "Head pro" },
  { first: "Owen", last: "Stricklin", role: "Owner" },
  { first: "Pete", last: "Harwell", role: "Manager" },
];
const OWN_DOMAIN = "duffer.example";
const COMMISSION_CENTS = 40000; // the seed's flat rate, $400 (spec §3.5); the fixtures' $200/$300 are not used.

/* ---------------------------------------------------------- fixtures */
function dumpFixtures() {
  const code = [
    "import sys, json",
    `sys.path.insert(0, ${JSON.stringify(TESTS)})`,
    "import fixtures as F",
    "names = ['ME','DASHBOARD','BF_CAMPAIGN','EVENTS','PARTNERS','HUBS','CUSTOMERS','PROSPECTS','INBOX','ROUTING_RULES','CODES','CODE_HISTORY','PRODUCTS','ORDERS','COMMISSIONS','PAYOUTS','MARCOMMAND','MC_LIVE_EMPTY']",
    "out = {n: getattr(F, n) for n in names}",
    "out['PARTNER_DETAIL'] = {p['id']: F.partner_detail(p['id']) for p in F.PARTNERS['partners']}",
    "out['STATEMENT'] = {p['id']: F.statement(p['id']) for p in F.PARTNERS['partners']}",
    "out['HUB_DETAIL'] = {h['id']: F.hub_detail(h['id']) for h in F.HUBS['hubs']}",
    "out['NOW'] = F.NOW",
    "print(json.dumps(out))",
  ].join("\n");
  const r = spawnSync("python3", ["-I", "-c", code], { encoding: "utf8", maxBuffer: 64 << 20 });
  if (r.status !== 0) throw new Error(`fixture dump failed: ${r.stderr}`);
  return JSON.parse(r.stdout);
}

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const caseLike = (from, to) => (from === from.toUpperCase() ? to.toUpperCase() : from[0] === from[0].toUpperCase() ? to[0].toUpperCase() + to.slice(1) : to);

/** Walk every value; `fn(key, value, parent)` returns a replacement or undefined. */
function walk(v, fn, key = null, parent = null) {
  if (Array.isArray(v)) return v.map((x, i) => walk(x, fn, i, v));
  if (v && typeof v === "object") {
    const o = {};
    for (const [k, x] of Object.entries(v)) {
      const r = fn(k, x, v);
      o[k] = r === undefined ? walk(x, fn, k, v) : r;
    }
    return o;
  }
  return v;
}

/**
 * The swap. Positional maps are built from the fixtures themselves, so no original name is
 * spelled here; then the whole payload text is rewritten through them, longest first.
 */
function swap(F) {
  const partners = F.PARTNERS.partners;
  const hubs = F.HUBS.hubs;
  if (partners.length > COURSES.length || hubs.length > DEALERS.length) throw new Error("more fixture partners/dealers than invented names: add names first");
  const text = []; // [from, to, {word, caseFold}]
  const idMap = new Map();
  partners.forEach((p, i) => {
    const c = COURSES[i];
    idMap.set(p.id, `pt_${c.slug}`);
    text.push([p.businessName, c.name]);
  });
  hubs.forEach((h, i) => {
    const d = DEALERS[i];
    idMap.set(h.id, `pt_${d.slug}`);
    text.push([h.businessName, d.name]);
  });
  // Ids, then their slugs and referral codes ("fairway" / "FAIRWAY" -> "sumac" / "SUMAC").
  for (const [from, to] of idMap) {
    text.push([from, to]);
    text.push([from.slice(3), to.slice(3), "slug"]);
  }
  // Every city any payload names, to an invented town (partners keep their own course's town).
  const cities = new Set();
  walk(F, (k, v) => {
    if ((k === "city" || k === "hubName") && typeof v === "string") cities.add(v);
    return undefined;
  });
  const towns = ["Tull Prairie", "Brannick", "Osgood Bend"];
  [...cities].forEach((c, i) => text.push([c, towns[i % towns.length]]));
  // Freeform place words that are not in a `city` field (a stock move's "From <town>"): mapped below by field.

  let json = JSON.stringify(F);
  // Hosts first: the fixtures' "<x>.example.com" and "example.com" become registered .example domains.
  json = json.replace(/https?:\/\/([a-z0-9-]+)\.example\.com/gi, "https://$1.example").replace(/@example\.com/gi, `@${OWN_DOMAIN}`).replace(/https?:\/\/example\.com/gi, `https://${OWN_DOMAIN}`);
  for (const [from, to, kind] of text.sort((a, b) => b[0].length - a[0].length)) {
    if (!from) continue;
    if (kind === "slug") json = json.replace(new RegExp(`(?<![A-Za-z0-9])${esc(from)}(?![A-Za-z0-9])`, "gi"), (m) => caseLike(m, to));
    else json = json.replace(new RegExp(`(?<![A-Za-z0-9])${esc(from)}(?![A-Za-z0-9])`, "g"), to);
  }
  const S = JSON.parse(json);
  const course = (id) => COURSES[[...idMap.values()].indexOf(id)] ?? null;

  // People: every person field gets an invented person; addresses and phones invented and 555-01xx.
  let n = 0;
  const personFor = new Map();
  const who = (key) => {
    if (!personFor.has(key)) personFor.set(key, PEOPLE[n++ % PEOPLE.length]);
    return personFor.get(key);
  };
  const fix = (o, id) => {
    const c = course(id);
    const p = who(id);
    if ("contactName" in o) o.contactName = `${p.first} ${p.last}`;
    if ("contactRole" in o) o.contactRole = p.role;
    if ("email" in o && o.email) o.email = `${p.first}.${p.last}@${c?.site ?? OWN_DOMAIN}`.toLowerCase();
    if ("phone" in o && o.phone) o.phone = `(785) 555-01${String(10 + COURSES.indexOf(c ?? COURSES[0]) * 7).padStart(2, "0")}`;
    if ("addressLine1" in o && o.addressLine1) o.addressLine1 = `${1200 + 40 * COURSES.indexOf(c ?? COURSES[0])} Clubhouse Road`;
    if ("postalCode" in o && o.postalCode) o.postalCode = "67999";
    if ("website" in o && o.website) o.website = `https://${c?.site ?? OWN_DOMAIN}`;
    if ("notes" in o && o.notes) o.notes = "Prefers calls after 3pm.";
  };
  for (const [id, d] of Object.entries(S.PARTNER_DETAIL)) {
    fix(d.partner, id);
    const c = course(id);
    d.partner.city = c.town;
    d.partner.state = "KS";
    d.partner.facilityType = c.facility;
    for (const x of d.displays) Object.assign(x, { displayNumber: c.display, codeId: c.display, label: `${c.display}-T${String(c.display).padStart(3, "0")}` });
    for (const x of d.history) Object.assign(x, { displayNumber: c.display, codeId: c.display });
    d.series30d = d.series30d.map((x) => ({ ...x }));
  }
  for (const [, d] of Object.entries(S.HUB_DETAIL)) {
    const i = [...idMap.values()].indexOf(d.hub.id) - COURSES.length;
    fix(d.hub, d.hub.id);
    d.hub.city = DEALERS[Math.max(0, i)]?.town ?? "Tull Prairie";
    d.hub.state = "KS";
    for (const m of d.moves) if (m.note) m.note = "From the warehouse";
  }
  for (const p of S.PARTNERS.partners) {
    const c = course(p.id);
    Object.assign(p, { city: c.town, state: "KS", facilityType: c.facility, displays: p.displays.length ? [c.display] : [] });
    if (p.claimedDisplayNumber) p.claimedDisplayNumber = c.display;
  }
  S.HUBS.hubs.forEach((h, i) => Object.assign(h, { city: DEALERS[i].town, state: "KS", statesServed: h.statesServed.length ? ["KS"] : [] }));
  // Customers: invented first names; customer records are not shot.
  S.CUSTOMERS.customers.forEach((c, i) => {
    const p = PEOPLE[(i + 2) % PEOPLE.length];
    if (c.firstName) c.firstName = p.first;
    if (c.email) c.email = `${p.first.toLowerCase()}@${OWN_DOMAIN}`;
    if (c.phone) c.phone = `(785) 555-01${String(40 + i)}`;
  });
  // The signed-in seat: the company, not a person; a passkey on file so the passkey offer stays away.
  Object.assign(S.ME, { displayName: "Duffer Golf", email: `owner@${OWN_DOMAIN}`, passkeys: 1 });

  // Displays: renumbered to each course's display, as the showcase's other tabs number them.
  const byOldDisplay = new Map();
  for (const p of F.PARTNERS.partners) for (const d of p.displays) byOldDisplay.set(d, course(idMap.get(p.id)).display);
  S.CODES.codes = S.CODES.codes.map((c) => {
    const to = byOldDisplay.get(c.displayNumber) ?? c.displayNumber + 20;
    return { ...c, id: to, displayNumber: to, label: `${to}-T${String(to).padStart(3, "0")}`, token: `tok${String(to).padStart(4, "0")}`, url: `https://${OWN_DOMAIN}/s/tok${String(to).padStart(4, "0")}` };
  });
  for (const q of S.DASHBOARD.quietDisplays) {
    const c = course(q.partnerId);
    if (c) Object.assign(q, { displayNumber: c.display, codeId: c.display, label: `${c.display}-T${String(c.display).padStart(3, "0")}` });
  }

  // Money: the flat $400 per sale (spec §3.5), paid by check.
  for (const p of S.PRODUCTS.products) p.commissionCents = p.active ? COMMISSION_CENTS : p.commissionCents;
  for (const o of S.ORDERS.orders) if (o.commissionCents) o.commissionCents = COMMISSION_CENTS;
  for (const c of S.COMMISSIONS.commissions) c.amountCents = COMMISSION_CENTS;
  for (const b of S.COMMISSIONS.byPartner) b.owedCents = b.count * COMMISSION_CENTS;
  for (const p of S.PAYOUTS.payouts) p.totalCents = p.commissionCount * COMMISSION_CENTS;
  for (const st of Object.values(S.STATEMENT)) {
    for (const l of st.lines) l.commissionCents = COMMISSION_CENTS;
    const sum = (s) => st.lines.filter((l) => l.commissionStatus === s).length * COMMISSION_CENTS;
    Object.assign(st, { commissionOwedCents: sum("owed"), commissionPaidCents: sum("paid"), commissionHeldCents: sum("held") });
  }

  // The live feed: invented scans, visits and leads across the three courses.
  const NOW = S.NOW;
  const MIN = 60000;
  const ev = (id, type, ago, ci, device, os) => {
    const c = COURSES[ci];
    return { id, ts: NOW - ago * MIN, type, displayNumber: c.display, partnerId: `pt_${c.slug}`, businessName: c.name, city: c.town, region: "KS", deviceType: device, os, isBot: false, nearestHub: null };
  };
  S.EVENTS = {
    schema: "duffer/events/1",
    newestId: 220,
    events: [
      ev(220, "scan", 1, 0, "mobile", "iOS"),
      ev(219, "page_view", 2, 1, "mobile", "Android"),
      ev(218, "lead_submitted", 4, 1, "mobile", "Android"),
      ev(217, "scan", 6, 2, "mobile", "iOS"),
      ev(216, "outbound_buy", 9, 0, "mobile", "iOS"),
      ev(215, "page_view", 11, 0, "mobile", "iOS"),
      ev(214, "scan", 14, 1, "mobile", "iOS"),
      ev(213, "scan", 22, 2, "mobile", "Android"),
      ev(212, "page_view", 31, 2, "desktop", "Windows"),
      ev(211, "scan", 38, 0, "mobile", "iOS"),
    ],
  };
  S.DASHBOARD.hubs = { approved: 1, applied: 1 };
  return { S, idMap, course };
}

/* ------------------------------------------------------------- API */
const QR_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 29" shape-rendering="crispEdges"><rect width="29" height="29" fill="#fff"/>' +
  '<path d="M2 2h7v7H2zM20 2h7v7h-7zM2 20h7v7H2zM4 4v3h3V4zM22 4v3h3V4zM4 22v3h3v-3zM11 2h2v2h-2zM14 4h2v3h-2zM11 8h3v2h-3zM16 11h3v2h-3zM11 13h2v4h-2zM20 11h2v2h-2zM23 13h4v2h-4zM14 16h3v3h-3zM19 17h2v2h-2zM22 19h3v2h-3zM11 20h2v2h-2zM14 22h2v5h-2zM18 22h2v2h-2zM21 24h3v3h-3zM25 22h2v2h-2zM2 11h2v2H2zM5 13h3v2H5zM2 16h2v2H2z" fill="#000"/></svg>';

function routesFor(S) {
  const sig = (schema) => ({ schema, sheetUrl: `https://${OWN_DOMAIN}/join`, shareUrl: `https://${OWN_DOMAIN}/join`, visits30d: 14, sheetVisits30d: 9, signups30d: 2, lastSignupAt: S.NOW - 3 * 86400000 });
  return [
    [/^\/api\/admin\/me$/, () => S.ME],
    [/^\/api\/admin\/dashboard$/, () => S.DASHBOARD],
    [/^\/api\/admin\/campaigns\/bf2026$/, () => S.BF_CAMPAIGN],
    [/^\/api\/admin\/events(\?.*)?$/, () => S.EVENTS],
    [/^\/api\/admin\/partners$/, () => S.PARTNERS],
    [/^\/api\/admin\/partners\/(pt_[a-z]+)\/statement(\?.*)?$/, (m) => S.STATEMENT[m[1]]],
    [/^\/api\/admin\/partners\/pt_[a-z]+\/display-orders$/, () => ({ schema: "duffer/display-orders/1", configured: true, orders: [] })],
    [/^\/api\/admin\/partners\/(pt_[a-z]+)$/, (m) => S.PARTNER_DETAIL[m[1]]],
    [/^\/api\/admin\/hubs$/, () => S.HUBS],
    [/^\/api\/admin\/hubs\/(pt_[a-z]+)$/, (m) => S.HUB_DETAIL[m[1]]],
    [/^\/api\/admin\/customers$/, () => S.CUSTOMERS],
    [/^\/api\/admin\/prospects$/, () => S.PROSPECTS],
    [/^\/api\/admin\/inbox(\?.*)?$/, () => S.INBOX],
    [/^\/api\/admin\/routing-rules$/, () => S.ROUTING_RULES],
    [/^\/api\/admin\/codes$/, () => S.CODES],
    [/^\/api\/admin\/codes\/\d+\/history$/, () => S.CODE_HISTORY],
    [/^\/api\/admin\/products$/, () => S.PRODUCTS],
    [/^\/api\/admin\/orders$/, () => S.ORDERS],
    [/^\/api\/admin\/commissions$/, () => S.COMMISSIONS],
    [/^\/api\/admin\/payouts$/, () => S.PAYOUTS],
    [/^\/api\/admin\/marcommand$/, () => S.MARCOMMAND],
    [/^\/api\/admin\/marcommand\/live$/, () => S.MC_LIVE_EMPTY],
    [/^\/api\/admin\/(hub-)?signup-link\/qr\.svg$/, "svg"],
    [/^\/api\/admin\/signup-link$/, () => sig("duffer/signup-link/1")],
    [/^\/api\/admin\/hub-signup-link$/, () => sig("duffer/hub-signup-link/1")],
  ];
}

const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2", ".woff": "font/woff", ".ico": "image/x-icon", ".wasm": "application/wasm" };

function pageTheme() {
  const j = JSON.parse(fs.readFileSync(path.join(MC_CLIENT, "theme.json"), "utf8"));
  const base = `/c/${j.slug}`;
  const brand = (p) => `${base}/brand/${p.slice("assets/".length)}`;
  return { slug: j.slug, name: j.name, mode: "light", cssHref: `${base}/theme.css`, lockupSrc: brand(j.lockup), markSrc: brand(j.mark), markFilter: j.markFilter, fonts: j.fonts, cardSurface: j.cardSurface, palette: j.palette, ribbonOrder: j.ribbonOrder, timeZone: j.timeZone };
}

function adminHtml() {
  const t = pageTheme();
  const e = (v) => v.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const tags = `<script id="pt-theme" type="application/json">${JSON.stringify(t).replace(/</g, "\\u003c")}</script><link rel="stylesheet" href="${e(t.cssHref)}"><link rel="stylesheet" href="${e(t.fonts.href)}">`;
  return fs.readFileSync(INDEX, "utf8").replace("</head>", `${tags}</head>`);
}

const ORIGIN = "http://duffer.local";
const FONT_HOSTS = new Set(["fonts.googleapis.com", "fonts.gstatic.com"]);

async function newSession(browser, S, viewport) {
  const ctx = await browser.newContext(viewport);
  // Remembered "Not now" for the passkey offer, as a returning owner's browser would hold it.
  await ctx.addInitScript(() => {
    try {
      localStorage.setItem("duffer.passkeyNudge.dismissed", "1");
    } catch {}
  });
  const routes = routesFor(S);
  const misses = [];
  await ctx.route("**/*", async (route) => {
    const u = new URL(route.request().url());
    if (FONT_HOSTS.has(u.host)) return route.continue();
    if (u.origin !== ORIGIN) return route.abort();
    const p = u.pathname + u.search;
    if (p.startsWith("/api/")) {
      if (/^\/api\/admin\/codes\/\d+\/qr\.svg/.test(p)) return route.fulfill({ status: 200, contentType: "image/svg+xml", body: QR_SVG });
      const m = /^\/api\/admin\/print\/(display-template|signup-template)\.png/.exec(p);
      if (m) return route.fulfill({ status: 200, contentType: "image/png", body: fs.readFileSync(path.join(STATIC, "print", `${m[1]}.png`)) });
      if (route.request().method() === "GET") {
        for (const [re, fn] of routes) {
          const mm = re.exec(p);
          if (mm && fn === "svg") return route.fulfill({ status: 200, contentType: "image/svg+xml", body: QR_SVG });
          if (mm) return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(fn(mm)) });
        }
      }
      misses.push(`${route.request().method()} ${p}`);
      return route.fulfill({ status: 502, contentType: "application/json", body: '{"error":"not stubbed"}' });
    }
    if (u.pathname === "/admin/" || u.pathname === "/admin/index.html") return route.fulfill({ status: 200, contentType: "text/html; charset=utf-8", body: adminHtml() });
    const cm = /^\/c\/duffer-golf\/(theme\.css|brand\/([A-Za-z0-9._-]+))$/.exec(u.pathname);
    if (cm) {
      const f = cm[1] === "theme.css" ? path.join(MC_CLIENT, "theme.css") : path.join(MC_CLIENT, "assets", cm[2]);
      return fs.existsSync(f) ? route.fulfill({ status: 200, contentType: f.endsWith(".css") ? "text/css" : "image/svg+xml", body: fs.readFileSync(f) }) : route.fulfill({ status: 404, body: "" });
    }
    const f = path.join(STATIC, decodeURIComponent(u.pathname));
    if (!f.startsWith(STATIC) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) return route.fulfill({ status: 404, body: "" });
    return route.fulfill({ status: 200, contentType: MIME[path.extname(f)] || "application/octet-stream", body: fs.readFileSync(f) });
  });
  const page = await ctx.newPage();
  return { ctx, page, misses };
}

async function open(page, hash, wait) {
  await page.goto(`${ORIGIN}/admin/#${hash}`, { waitUntil: "domcontentloaded" });
  if (wait) await page.waitForSelector(wait, { timeout: 15000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(900);
  // The Black Friday block is dated (spec §6.2): it is taken out of the dashboard before any shot.
  await page.evaluate(() => document.querySelectorAll('[data-block="black-friday"], [data-group="black-friday"]').forEach((e) => e.remove()));
}

/** Every piece of text drawn inside `rect` (page css px): text nodes, form values, chosen options. */
function wordsIn(rect) {
  const hit = (r) => r.width > 0 && r.height > 0 && r.right > rect.x && r.left < rect.x + rect.w && r.bottom > rect.y && r.top < rect.y + rect.h;
  const shown = (el) => {
    for (let e = el; e; e = e.parentElement) {
      const cs = getComputedStyle(e);
      if (cs.display === "none" || cs.visibility === "hidden" || parseFloat(cs.opacity) === 0) return false;
    }
    return true;
  };
  const out = [];
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  for (let n = w.nextNode(); n; n = w.nextNode()) {
    const t = (n.nodeValue || "").replace(/\s+/g, " ").trim();
    if (!t || !n.parentElement || !shown(n.parentElement)) continue;
    // An <option> of a closed <select> is not drawn; the chosen one is read from the select below.
    if (n.parentElement.closest("script, style, noscript, template, select, datalist")) continue;
    // A closed <details> (a menu) keeps its body in the DOM, with boxes, but draws only its summary.
    const det = n.parentElement.closest("details:not([open])");
    if (det && !n.parentElement.closest("summary")) continue;
    if (n.parentElement.checkVisibility && !n.parentElement.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true, contentVisibilityAuto: true })) continue;
    range.selectNodeContents(n);
    // Drawn = inside the shot AND not clipped away by an overflow ancestor (a closed menu's contents).
    const clippedAway = (r) => {
      for (let e = n.parentElement; e && e !== document.body; e = e.parentElement) {
        const cs = getComputedStyle(e);
        if (cs.overflowX === "visible" && cs.overflowY === "visible") continue;
        const b = e.getBoundingClientRect();
        if (r.right <= b.left || r.left >= b.right || r.bottom <= b.top || r.top >= b.bottom) return true;
      }
      return false;
    };
    if ([...range.getClientRects()].some((r) => hit(r) && !clippedAway(r))) out.push(t);
  }
  for (const el of document.querySelectorAll("input, textarea, select")) {
    if (!shown(el) || !hit(el.getBoundingClientRect())) continue;
    const v = el.tagName === "SELECT" ? [...el.selectedOptions].map((o) => o.textContent).join(" ") : el.value || el.getAttribute("placeholder") || "";
    if (v.trim()) out.push(v.replace(/\s+/g, " ").trim());
  }
  return [...new Set(out)];
}

/* ------------------------------------------------------------- views */
// Desk: the 1440 x 900 window as the owner sees it; `top` scrolls a section to the top of the
// scrolling <main>. `targets` are found by their text and measured (still css px) for the drawn
// cursor. Phone: the panel's own phone layout at 390 wide, cut to `crop`: a list of
// [from, to] pairs, each a {text|sel, edge} the band starts or ends at; several bands stack.
const DESK = { width: 1440, height: 900 };
const PHONE_W = 390;
const VIEWS = [
  {
    id: "dashboard",
    hash: "/",
    wait: "[data-feed]",
    targets: { scans: { label: "Scans today", number: true } },
    crop: [[{ y: 0 }, { sel: "[data-group='network'], section:has(> h2)", nth: 0, edge: "bottom", pad: 12 }]],
  },
  {
    id: "feed-before",
    hash: "/",
    wait: "[data-feed]",
    feed: "before",
    top: "section:has(#live-feed-rows)",
    targets: { row: { sel: "[data-feed-row]", box: true } },
    crop: [[{ sel: "section:has(#live-feed-rows)", edge: "top", pad: -10 }, { sel: "[data-feed-row]", nth: 4, edge: "bottom" }]],
  },
  {
    id: "feed",
    hash: "/",
    wait: "[data-feed]",
    top: "section:has(#live-feed-rows)",
    targets: { row: { sel: "[data-feed-row]", box: true } },
    crop: [[{ sel: "section:has(#live-feed-rows)", edge: "top", pad: -10 }, { sel: "[data-feed-row]", nth: 4, edge: "bottom" }]],
  },
  {
    id: "qr",
    hash: "/qr",
    wait: "table, section",
    top: "section:has(table)",
    phoneTop: "section:last-of-type",
    targets: { row: { text: "Sumac Hollow Golf Club" } },
    crop: [[{ sel: "main section:last-of-type", edge: "top", pad: -10 }, { text: "#41", edge: "top", pad: -18 }]],
  },
  {
    id: "partners",
    hash: "/partners",
    wait: "table, section",
    targets: { course: { text: "Sumac Hollow Golf Club" } },
    crop: [[{ sel: "[data-group='partners']", edge: "top", pad: -10 }, { sel: "[data-group='partners']", edge: "bottom", pad: 8, max: 600 }]],
  },
  {
    id: "partner",
    hash: "/partners/pt_sumac",
    wait: "h1",
    targets: { scans: { text: "Scans, 30 days" } },
    crop: [[{ y: 0 }, { sel: "main section", nth: 0, edge: "bottom", pad: 12 }]],
  },
  {
    id: "orders",
    hash: "/orders",
    wait: "table, section",
    targets: { owed: { text: "Commission owed: $400.00" } },
    crop: [[{ sel: "main section", nth: 0, edge: "top", pad: -10 }, { text: "DG-0004", edge: "top", pad: -18 }]],
  },
  {
    id: "commissions",
    hash: "/commissions",
    wait: "table, section",
    targets: { pay: { text: "Record payout" }, check: { text: "Check 1042" } },
    crop: [
      [{ sel: "main section", nth: 0, edge: "top", pad: -10 }, { sel: "main section", nth: 0, edge: "bottom", pad: 10 }],
      [{ sel: "main section:last-of-type", edge: "top", pad: -10 }, { sel: "main section:last-of-type", edge: "bottom", pad: 10 }],
    ],
  },
];

/** In-page: the element a target or crop spec names, or null. */
function locate(spec) {
  const vis = (e) => {
    const r = e.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };
  if (spec.sel) {
    const all = [...document.querySelectorAll(spec.sel)].filter(vis);
    return all[spec.nth ?? 0] ?? null;
  }
  const want = spec.text ?? spec.label;
  if (!want) return null;
  // The smallest visible element whose own text holds the string.
  let best = null;
  for (const e of document.querySelectorAll("body *")) {
    if (!vis(e) || !(e.textContent || "").includes(want)) continue;
    const r = e.getBoundingClientRect();
    if (!best || r.width * r.height <= best.r.width * best.r.height) best = { e, r };
  }
  if (!best) return null;
  if (!spec.number) return best.e;
  // A KPI card: the label's card, then the largest type inside it (the figure).
  let card = best.e;
  while (card.parentElement && card.getBoundingClientRect().height < 90) card = card.parentElement;
  let big = null;
  for (const e of card.querySelectorAll("*")) {
    if (!e.childElementCount && /\d/.test(e.textContent || "") && vis(e)) {
      const fs = parseFloat(getComputedStyle(e).fontSize);
      if (!big || fs > big.fs) big = { e, fs };
    }
  }
  return big?.e ?? best.e;
}

async function rectOf(page, spec) {
  return page.evaluate(
    ([spec, src]) => {
      const locate = new Function(`return (${src})`)();
      const e = locate(spec);
      if (!e) return null;
      const r = e.getBoundingClientRect();
      return { x: r.left, y: r.top, w: r.width, h: r.height };
    },
    [spec, locate.toString()],
  );
}

async function scrollTop(page, sel) {
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) throw new Error(`no ${sel}`);
    el.scrollIntoView({ block: "start", behavior: "instant" });
    const main = document.querySelector("main");
    if (main && main.scrollTop > 0) main.scrollTop -= 24;
    else window.scrollBy(0, -24);
  }, sel);
  await page.waitForTimeout(500);
}

const round = (r) => (r ? { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.w), h: Math.round(r.h) } : null);

async function writeStill(png, file, cssW, outW, words, rect) {
  const img = sharp(png);
  const buf = await (outW ? img.resize({ width: outW }) : img).webp({ quality: 80, effort: 6 }).toBuffer();
  fs.writeFileSync(path.join(OUT, file), buf);
  const meta = await sharp(buf).metadata();
  const manifest = {
    still: file,
    scope: "duffer-golf",
    source: `Duffer Golf Command Center, panel bundle ${BUNDLE}, rendered on its test fixtures with invented names (scripts/capture-duffer-cc.mjs)`,
    captured: new Date().toISOString().slice(0, 10),
    rect: rect,
    lines: words,
  };
  fs.writeFileSync(path.join(OUT, file.replace(/\.webp$/, ".words.json")), `${JSON.stringify(manifest, null, 2)}\n`);
  if (REVIEW) fs.writeFileSync(path.join(REVIEW, file.replace(/\.webp$/, ".png")), png);
  return { src: `/images/showcase/duffer/${file}`, width: meta.width, height: meta.height, bytes: buf.length, css: { w: cssW, h: Math.round((meta.height * cssW) / meta.width) } };
}

async function captureAll(browser, S) {
  fs.mkdirSync(OUT, { recursive: true });
  if (REVIEW) fs.mkdirSync(REVIEW, { recursive: true });
  const fullFeed = S.EVENTS;
  const before = { ...fullFeed, events: fullFeed.events.slice(1), newestId: fullFeed.events[1].id };
  const result = {};

  // Desk: 1440 x 900 at 2x, written at 2x of the ~1218 px display box.
  {
    const { ctx, page, misses } = await newSession(browser, S, { viewport: DESK, deviceScaleFactor: 2 });
    for (const v of VIEWS) {
      S.EVENTS = v.feed === "before" ? before : fullFeed;
      await open(page, v.hash, v.wait);
      if (v.top) await scrollTop(page, v.top);
      const targets = {};
      for (const [k, spec] of Object.entries(v.targets ?? {})) {
        const r = round(await rectOf(page, spec));
        if (!r) throw new Error(`${v.id}: target ${k} not found`);
        targets[k] = r;
      }
      const rect = { x: 0, y: 0, w: DESK.width, h: DESK.height };
      const words = await page.evaluate(wordsIn, rect);
      const png = await page.screenshot({ type: "png" });
      result[v.id] = { desk: await writeStill(png, `${v.id}.webp`, DESK.width, 2880, words, rect), targets };
    }
    if (misses.length) console.log(`[duffer-cc] desk unstubbed: ${[...new Set(misses)].join(", ")}`);
    await ctx.close();
  }

  // Phone: the panel's phone layout, 390 wide at 2x; a tall window keeps the fixed tab bar out of every band.
  {
    const { ctx, page, misses } = await newSession(browser, S, { viewport: { width: PHONE_W, height: 5000 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    for (const v of VIEWS) {
      S.EVENTS = v.feed === "before" ? before : fullFeed;
      await open(page, v.hash, v.wait);
      const bands = [];
      for (const [a, b] of v.crop) {
        const edge = async (s) => {
          if (s.y !== undefined) return s.y;
          const r = await rectOf(page, s);
          if (!r) throw new Error(`${v.id}: phone crop edge ${JSON.stringify(s)} not found`);
          return (s.edge === "bottom" ? r.y + r.h : r.y) + (s.pad ?? 0);
        };
        const y0 = Math.max(0, Math.round(await edge(a)));
        let y1 = Math.round(await edge(b));
        if (b.max && y1 - y0 > b.max) y1 = y0 + b.max;
        bands.push({ x: 0, y: y0, w: PHONE_W, h: y1 - y0 });
      }
      const pngs = [];
      const words = [];
      for (const r of bands) {
        pngs.push(await page.screenshot({ type: "png", clip: { x: r.x, y: r.y, width: r.w, height: r.h } }));
        words.push(...(await page.evaluate(wordsIn, r)));
      }
      let png = pngs[0];
      if (pngs.length > 1) {
        // Bands stack with a 12 px gap of the page's own ground.
        const gap = 24;
        const metas = await Promise.all(pngs.map((p) => sharp(p).metadata()));
        const H = metas.reduce((n, m) => n + m.height, 0) + gap * (pngs.length - 1);
        const ground = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
        const [r, g, bl] = (ground.match(/\d+/g) || [255, 255, 255]).map(Number);
        let top = 0;
        const layers = pngs.map((p, i) => {
          const l = { input: p, top, left: 0 };
          top += metas[i].height + gap;
          return l;
        });
        png = await sharp({ create: { width: metas[0].width, height: H, channels: 3, background: { r, g, b: bl } } }).composite(layers).png().toBuffer();
      }
      const targets = {};
      if (bands.length === 1) {
        for (const [k, spec] of Object.entries(v.targets ?? {})) {
          const t = round(await rectOf(page, spec));
          if (t && t.y >= bands[0].y && t.y + t.h <= bands[0].y + bands[0].h) targets[k] = { ...t, y: t.y - bands[0].y };
        }
      }
      result[v.id].phone = await writeStill(png, `${v.id}-phone.webp`, PHONE_W, null, [...new Set(words)], bands.length === 1 ? bands[0] : bands);
      result[v.id].phoneTargets = targets;
    }
    if (misses.length) console.log(`[duffer-cc] phone unstubbed: ${[...new Set(misses)].join(", ")}`);
    await ctx.close();
  }
  S.EVENTS = fullFeed;
  return result;
}

function writeData(result) {
  const lines = [
    "// GENERATED by scripts/capture-duffer-cc.mjs. Do not edit by hand: re-run the script.",
    `// Duffer Golf Command Center panel bundle ${BUNDLE}, on its test fixtures with every name swapped for`,
    "// the invented Duffer set (src/data/demos/invented/duffer-golf.ts, duffer-command-center.ts).",
    "// Each still has a <still>.words.json beside it, read by tests/demo-privacy.probe.mjs (spec §7.2 #18).",
    "// Rects are still css px: desk stills are a 1440 x 900 window, phone stills 390 wide.",
    `export const DUFFER_CC_SHOTS = ${JSON.stringify(result, null, 2)} as const;`,
    "",
  ];
  fs.writeFileSync(DATA, lines.join("\n"));
}

async function main() {
  const F = dumpFixtures();
  const { S } = swap(F);
  const browser = await chromium.launch();
  try {
    if (EXPLORE) {
      fs.mkdirSync(EXPLORE, { recursive: true });
      for (const [mode, vp] of [
        ["desk", { viewport: DESK, deviceScaleFactor: 1 }],
        ["phone", { viewport: { width: PHONE_W, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }],
      ]) {
        const { ctx, page } = await newSession(browser, S, vp);
        for (const v of VIEWS) {
          await open(page, v.hash, null);
          if (mode === "desk" && v.top) await scrollTop(page, v.top);
          await page.screenshot({ path: path.join(EXPLORE, `${v.id}-${mode}.png`), fullPage: mode === "phone" });
        }
        await ctx.close();
      }
      return;
    }
    const result = await captureAll(browser, S);
    writeData(result);
    let total = 0;
    for (const [id, r] of Object.entries(result)) {
      total += r.desk.bytes + r.phone.bytes;
      console.log(`[duffer-cc] ${id}: desk ${r.desk.width}x${r.desk.height} ${(r.desk.bytes / 1024).toFixed(0)} KB, phone ${r.phone.width}x${r.phone.height} ${(r.phone.bytes / 1024).toFixed(0)} KB, targets ${Object.keys(r.targets).join(",")} / ${Object.keys(r.phoneTargets).join(",")}`);
    }
    console.log(`[duffer-cc] ${Object.keys(result).length} views, ${(total / 1024).toFixed(0)} KB total -> ${path.relative(ROOT, OUT)}, ${path.relative(ROOT, DATA)}`);
  } finally {
    await browser.close();
  }
}

await main();
