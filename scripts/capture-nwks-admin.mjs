#!/usr/bin/env node
/**
 * scripts/capture-nwks-admin.mjs — the NWKS "Admin" stills (design-spec-r2 §6.3, §7.2 #18).
 *
 * Runs the REAL NWKS admin panel locally on the repo's own demo seed, with every person, town,
 * church and free-text line in that seed swapped for this repo's invented NWKS set, and shoots the
 * click-through: Dashboard, Cabins before and after the cabin plan, Attendees ("Not paid yet"),
 * Badges and Luggage labels.
 *
 *   node scripts/capture-nwks-admin.mjs --repo <a THROWAWAY nwks-encounter-site worktree, built (npm run build)>
 *        [--out public/images/showcase/nwks] [--data src/data/showcase/scenes/nwks-admin-stills.ts]
 *        [--review <dir>] [--explore <dir>] [--port 8794]
 *
 * SAFETY. Local only: migrations, seed and server all run against a private `--persist-to`
 * directory this script makes and deletes; nothing is ever passed `--remote`. The rewritten seed
 * is written into the given worktree as scripts/.seed-demo-invented.mjs and deleted at the end;
 * nothing is committed there. A random local admin password is made per run and never printed.
 *
 * NAMES. The seed's own names are never spelled here: its data tables are evaluated at run time
 * and every person, town and church is mapped by position to an invented one; every free-text
 * line (reasons, notes, rationales, testimonies) is replaced outright. Each still ships with its
 * `.words.json` (the text drawn inside it) for tests/demo-privacy.probe.mjs, and before any shot the
 * whole local database is scanned against the private deny list (counts only, nothing printed).
 */
import { createRequire } from "node:module";
import { spawn, spawnSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import vm from "node:vm";
import { DatabaseSync } from "node:sqlite";
import { fileURLToPath, pathToFileURL } from "node:url";

const SELF = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(SELF), "..");
const req = createRequire(path.join(ROOT, "package.json"));
const { chromium } = req("playwright");
const sharp = req("sharp");

const arg = (name, dflt) => {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : dflt;
};
const REPO = arg("repo");
if (!REPO) {
  console.error("usage: node scripts/capture-nwks-admin.mjs --repo <throwaway nwks-encounter-site worktree, built> [--out dir] [--data file] [--review dir] [--explore dir] [--port n]");
  process.exit(2);
}
const OUT = path.resolve(ROOT, arg("out", "public/images/showcase/nwks"));
const DATA = path.resolve(ROOT, arg("data", "src/data/showcase/scenes/nwks-admin-stills.ts"));
const REVIEW = arg("review") ? path.resolve(arg("review")) : null;
const EXPLORE = arg("explore") ? path.resolve(arg("explore")) : null;
const PORT = Number(arg("port", "8794"));
// The showcase's phone sheet frames the desk still (the admin has no narrow layout below 768 px).
// --phone-crops also writes the old 768-wide crops, for comparison only.
const PHONE_CROPS = process.argv.includes("--phone-crops");
const ORIGIN = `http://127.0.0.1:${PORT}`;
const DENY_PATH = process.env.PS_DEMO_DENYLIST || path.join(os.homedir(), ".config", "preisser", "demo-denylist.txt");
const SEED = path.join(REPO, "scripts", "seed-demo.mjs");
const SEED_OUT = path.join(REPO, "scripts", ".seed-demo-invented.mjs");
if (!fs.existsSync(path.join(REPO, "dist", "admin", "index.html"))) {
  console.error(`no built admin at ${REPO}/dist/admin. Run npm run build in that worktree first.`);
  process.exit(2);
}
const BUNDLE = (fs.readFileSync(path.join(REPO, "dist", "admin", "index.html"), "utf8").match(/src="[^"]*\/(index-[^"]+\.js)"/) || [])[1] ?? "unknown";
const SHA = spawnSync("git", ["-C", REPO, "rev-parse", "--short", "HEAD"], { encoding: "utf8" }).stdout.trim();
console.log(`[nwks-admin] admin bundle ${BUNDLE} at ${SHA}`);

/* ------------------------------------------------ the invented set */
const { invented } = await import(pathToFileURL(path.join(ROOT, "src", "data", "demos", "invented", "nwks-encounter.ts")).href);
const ATT = invented.people.filter((p) => p.id.startsWith("att-"));
const SRV = invented.people.filter((p) => p.id.startsWith("srv-"));
const TOWNS = invented.towns.map((t) => t.name);
const DOMAIN = invented.domains[0].domain; // campmail.example, registered with the set
const CHURCH_KIND = ["Community Church", "Bible Church", "Fellowship"];

const REASONS = [
  "I came two years ago and I want to bring my brother-in-law this time. He will not go by himself.",
  "My son asked me to go with him. I will drive us both.",
  "It was the best weekend I have had in years and I would like to go again.",
  "Our pastor asked me to come alongside two younger men from church.",
  "I am bringing a friend from work who has never been to anything like this.",
];
const NOTES = ["Approved; bringing a first-timer.", "Approved; the pastor asked him to come.", "Held for now; we will call if a seat opens."];
const RATIONALE = "Returning to bring a first-timer who will only come if he does. The return is how a new man gets there.";
const SIGNALS = ["bring my brother-in-law", "will not go by himself"];
const TESTIMONY = { subject: "The weekend I almost skipped", body: "I nearly stayed home. I am glad I did not. The men in my cabin still call every week." };

/* ------------------------------------------------- the seed rewrite */
/** The literal after `const NAME = ` up to its matching close, honouring quotes. */
function literalSpan(src, name) {
  const at = src.indexOf(`const ${name} = `);
  if (at < 0) throw new Error(`seed has no const ${name}`);
  const start = at + `const ${name} = `.length;
  const open = src[start];
  const close = open === "[" ? "]" : open === "{" ? "}" : null;
  if (!close) {
    const end = src.indexOf(";", start);
    return { start, end };
  }
  let depth = 0;
  let quote = null;
  for (let i = start; i < src.length; i++) {
    const c = src[i];
    if (quote) {
      if (c === "\\") i++;
      else if (c === quote) quote = null;
      continue;
    }
    if (c === "'" || c === '"' || c === "`") quote = c;
    else if (c === "/" && src[i + 1] === "/") i = src.indexOf("\n", i);
    else if (c === open) depth++;
    else if (c === close && --depth === 0) return { start, end: i + 1 };
  }
  throw new Error(`unclosed ${name}`);
}

function rewriteSeed() {
  let src = fs.readFileSync(SEED, "utf8");
  const read = (name) => {
    const s = literalSpan(src, name);
    return vm.runInNewContext(`(${src.slice(s.start, s.end)})`);
  };
  const T = Object.fromEntries(["ATTENDEES", "SERVERS", "TRIAGE", "INTEREST", "TESTIMONIES", "EMAILS", "ADDRESSES"].map((n) => [n, read(n)]));
  const localPart = (r) => `${r.first}.${r.last}`.toLowerCase().replace(/[^a-z.]/g, "");

  // People: men's attendees take the invented attendees first, servers the invented roster.
  const pool = { att: [...ATT, ...SRV.slice(30)], srv: SRV.slice(0, 30) };
  const map = new Map();
  const assign = (r, kind) => {
    const k = `${r.first}|${r.last}`;
    if (!map.has(k)) {
      const p = (kind === "srv" ? pool.srv : pool.att).shift() ?? pool.srv.shift() ?? pool.att.shift();
      if (!p) throw new Error("ran out of invented people");
      map.set(k, p);
    }
    return map.get(k);
  };
  T.ATTENDEES.filter((a) => a.p === "mens").forEach((a) => assign(a, "att"));
  T.SERVERS.forEach((s) => assign(s, "srv"));
  for (const list of [T.ATTENDEES, T.INTEREST, T.TESTIMONIES, T.EMAILS]) list.forEach((r) => assign(r, "att"));

  // Places: every town the seed names (home or launch) to one of the six cleared towns.
  const townOf = new Map();
  const place = (t) => {
    if (!t) return t;
    const key = t.toLowerCase();
    if (!townOf.has(key)) townOf.set(key, TOWNS[townOf.size % TOWNS.length]);
    return townOf.get(key);
  };
  const triage = {};
  const person = (r, i) => {
    const p = map.get(`${r.first}|${r.last}`);
    const oldLocal = localPart(r);
    const out = { ...r, first: p.first, last: p.last };
    if ("city" in r) out.city = place(r.city);
    if ("launch" in r) out.launch = place(r.launch);
    if ("church" in r) out.church = `${place(r.launch ?? r.city)} ${CHURCH_KIND[i % CHURCH_KIND.length]}`;
    if (r.reason) out.reason = REASONS[i % REASONS.length];
    if (r.note) out.note = NOTES[i % NOTES.length];
    if ("invited" in r) out.invited = "A friend from church";
    if (T.TRIAGE[oldLocal]) triage[localPart(out)] = { ...T.TRIAGE[oldLocal], rationale: RATIONALE, signals: SIGNALS };
    return out;
  };
  const W = {
    ATTENDEES: T.ATTENDEES.map(person),
    SERVERS: T.SERVERS.map(person),
    TRIAGE: triage,
    INTEREST: T.INTEREST.map(person),
    TESTIMONIES: T.TESTIMONIES.map((t, i) => ({ ...person(t, i), subject: TESTIMONY.subject, body: t.body ? TESTIMONY.body : "" })),
    EMAILS: T.EMAILS.map((e, i) => {
      const p = person(e, i);
      // Subjects may carry a first name: the old person's names become the new person's.
      let subject = String(e.subject);
      subject = subject.split(e.first).join(p.first).split(e.last).join(p.last);
      return { ...p, subject };
    }),
    ADDRESSES: T.ADDRESSES.map((_, i) => `${100 + 20 * i} Prairie Lane`),
  };
  // Splice back, last first so earlier offsets stay valid.
  const spans = Object.keys(W).map((n) => ({ n, ...literalSpan(src, n) })).sort((a, b) => b.start - a.start);
  for (const s of spans) src = src.slice(0, s.start) + JSON.stringify(W[s.n], null, 1) + src.slice(s.end);
  // The demo marker domain and the reviewer address: registered .example addresses.
  src = src.replace(/const DEMO_DOMAIN = '[^']+';/, `const DEMO_DOMAIN = '${DOMAIN}';`);
  src = src.replace(/const REVIEWER = '[^']+';/, `const REVIEWER = 'reviewer@${DOMAIN}';`);
  fs.writeFileSync(SEED_OUT, src);
  return { people: map.size, towns: townOf.size };
}

/* ------------------------------------------------------------ local */
function wr(args, env = {}) {
  const r = spawnSync("npx", ["wrangler", ...args], { cwd: REPO, encoding: "utf8", env: { ...process.env, ...env }, maxBuffer: 64 << 20 });
  if (r.status !== 0) throw new Error(`wrangler ${args.slice(0, 3).join(" ")} failed: ${(r.stderr || "").slice(-600)}`);
  return r.stdout;
}

/** Reads go straight to the local D1's own SQLite file (one wrangler spawn per query took minutes). */
function query(P, sql) {
  const dir = path.join(P, "v3", "d1", "miniflare-D1DatabaseObject");
  const file = fs.readdirSync(dir).find((f) => f.endsWith(".sqlite") && f !== "metadata.sqlite");
  if (!file) throw new Error(`no local D1 file under ${dir}`);
  const db = new DatabaseSync(path.join(dir, file), { readOnly: true });
  try {
    return db.prepare(sql).all();
  } finally {
    db.close();
  }
}

/** Every TEXT value in the local database against the private deny list. Counts only. */
function denyAudit(P) {
  const deny = fs
    .readFileSync(DENY_PATH, "utf8")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => (l.startsWith("site:") ? l.slice(5).trim() : l))
    .map((t) => new RegExp(`(?<![\\p{L}\\p{N}])${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+")}(?![\\p{L}\\p{N}])`, "iu"));
  let cells = 0;
  let hits = 0;
  const where = new Set();
  for (const { name } of query(P, "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE '\\_cf%' ESCAPE '\\' AND name NOT IN ('d1_migrations','sqlite_sequence')")) {
    const cols = query(P, `PRAGMA table_info(${name})`).filter((c) => /TEXT|^$/i.test(c.type)).map((c) => c.name);
    if (!cols.length) continue;
    const n = query(P, `SELECT COUNT(*) AS n FROM ${name}`)[0].n;
    if (!n) continue;
    for (const row of query(P, `SELECT ${cols.map((c) => `"${c}"`).join(",")} FROM ${name}`)) {
      for (const c of cols) {
        const v = row[c];
        if (typeof v !== "string" || !v) continue;
        cells++;
        if (deny.some((re) => re.test(v))) {
          hits++;
          where.add(`${name}.${c}`);
        }
      }
    }
  }
  return { cells, hits, where: [...where], terms: deny.length };
}

/**
 * Local copy only: the migrations' own content (site copy, email templates, form options) names
 * real places; every deny-listed term in the cells the audit flagged becomes an invented town.
 * The terms are read from the private list at run time; none is printed or written anywhere else.
 */
function scrubLocal(P, where) {
  const terms = fs
    .readFileSync(DENY_PATH, "utf8")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => (l.startsWith("site:") ? l.slice(5).trim() : l));
  const res = terms.map((t, i) => [new RegExp(`(?<![\\p{L}\\p{N}])${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+")}(?![\\p{L}\\p{N}])`, "giu"), TOWNS[i % TOWNS.length]]);
  const sql = [];
  for (const tc of where) {
    const [table, col] = tc.split(".");
    for (const row of query(P, `SELECT rowid AS rid, "${col}" AS v FROM ${table}`)) {
      if (typeof row.v !== "string") continue;
      let v = row.v;
      for (const [re, to] of res) v = v.replace(re, to);
      if (v !== row.v) sql.push(`UPDATE ${table} SET "${col}" = '${v.replace(/'/g, "''")}' WHERE rowid = ${row.rid};`);
    }
  }
  if (!sql.length) return 0;
  const f = path.join(P, "scrub.sql");
  fs.writeFileSync(f, sql.join("\n"));
  wr(["d1", "execute", "nwks-encounter", "--local", "--persist-to", P, `--file=${f}`]);
  fs.rmSync(f);
  return sql.length;
}

function startServer(P) {
  const child = spawn("npx", ["wrangler", "pages", "dev", "dist", "--local", "--port", String(PORT), "--ip", "127.0.0.1", "--persist-to", P], {
    cwd: REPO,
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, BROWSER: "none" },
    detached: true,
  });
  let log = "";
  child.stdout.on("data", (d) => (log += d));
  child.stderr.on("data", (d) => (log += d));
  // wrangler pages dev dies after a few idle seconds (memory wrangler-pages-dev-dies-on-5s-idle): keep it busy.
  const ping = setInterval(() => fetch(`${ORIGIN}/api/health`).catch(() => {}), 2000);
  const stop = () => {
    clearInterval(ping);
    try {
      process.kill(-child.pid, "SIGTERM");
    } catch {}
  };
  return { child, stop, log: () => log };
}

async function waitUp() {
  for (let i = 0; i < 120; i++) {
    try {
      const r = await fetch(`${ORIGIN}/admin/`);
      if (r.status < 500) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("the local admin never answered");
}

/* ----------------------------------------------------------- words */
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

/** In-page: the element a spec names (a selector, or the smallest element holding a text). */
function locate(spec) {
  const vis = (e) => {
    const r = e.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };
  let el = null;
  if (spec.sel) el = [...document.querySelectorAll(spec.sel)].filter(vis)[spec.nth ?? 0] ?? null;
  else if (spec.exact && spec.nth !== undefined) {
    // The nth element (document order) whose whole text is exactly this, deepest match only.
    const want = spec.text.toLowerCase();
    const all = [...document.querySelectorAll("body *")].filter((e) => vis(e) && (e.textContent || "").replace(/\s+/g, " ").trim().toLowerCase() === want && ![...e.children].some((c) => (c.textContent || "").replace(/\s+/g, " ").trim().toLowerCase() === want));
    el = all[spec.nth] ?? null;
  } else {
    let best = null;
    const want = spec.text.toLowerCase();
    for (const e of document.querySelectorAll("body *")) {
      if (!vis(e)) continue;
      const t = (e.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
      if (spec.exact ? t !== want : !t.includes(want)) continue;
      const r = e.getBoundingClientRect();
      if (!best || r.width * r.height <= best.a) best = { e, a: r.width * r.height };
    }
    el = best?.e ?? null;
  }
  // `climb`: the nearest ancestor at least this tall (a card around a label).
  if (el && spec.climb) while (el.parentElement && el.getBoundingClientRect().height < spec.climb) el = el.parentElement;
  // `number`: the largest type inside (a KPI's figure).
  if (el && spec.number) {
    let big = null;
    for (const e of el.querySelectorAll("*")) {
      if (!e.childElementCount && /\d/.test(e.textContent || "") && vis(e)) {
        const fs = parseFloat(getComputedStyle(e).fontSize);
        if (!big || fs > big.fs) big = { e, fs };
      }
    }
    if (big) el = big.e;
  }
  return el;
}

async function rectOf(page, spec) {
  return page.evaluate(
    ([spec, src]) => {
      const locate = new Function(`return (${src})`)();
      const e = locate(spec);
      if (!e) return null;
      const r = e.getBoundingClientRect();
      return { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) };
    },
    [spec, locate.toString()],
  );
}

async function click(page, spec) {
  const r = await rectOf(page, spec);
  if (!r) throw new Error(`nothing to click for ${JSON.stringify(spec)}`);
  await page.mouse.click(r.x + r.w / 2, r.y + r.h / 2);
  await page.waitForTimeout(900);
}

async function writeStill(png, file, cssW, outW, words, rect) {
  const img = sharp(png);
  const buf = await (outW ? img.resize({ width: outW }) : img).webp({ quality: 80, effort: 6 }).toBuffer();
  fs.writeFileSync(path.join(OUT, file), buf);
  const meta = await sharp(buf).metadata();
  fs.writeFileSync(
    path.join(OUT, file.replace(/\.webp$/, ".words.json")),
    `${JSON.stringify(
      {
        still: file,
        scope: "nwks-encounter",
        source: `NWKS Encounter admin, bundle ${BUNDLE}, run locally on its demo seed with every name swapped for invented ones (scripts/capture-nwks-admin.mjs)`,
        captured: new Date().toISOString().slice(0, 10),
        rect,
        lines: words,
      },
      null,
      2,
    )}\n`,
  );
  if (REVIEW) fs.writeFileSync(path.join(REVIEW, file.replace(/\.webp$/, ".png")), png);
  return { src: `/images/showcase/nwks/${file}`, width: meta.width, height: meta.height, bytes: buf.length, css: { w: cssW, h: Math.round((meta.height * cssW) / meta.width) } };
}

/* ------------------------------------------------------------ views */
const DESK = { width: 1440, height: 900 };
const PHONE_W = 390;

async function session(browser, vp, cookieJar) {
  // bypassCSP: only so the stand-in font's stylesheet loads (the admin's CSP allows 'self' styles).
  const ctx = await browser.newContext({ ...vp, bypassCSP: true });
  await ctx.addInitScript(() => {
    try {
      localStorage.setItem("nwks_program", "mens");
      sessionStorage.setItem("nwks_program_from_door", "mens");
    } catch {}
  });
  await ctx.addCookies(cookieJar);
  // Local only: any request off this machine is refused (fonts the admin ships are local).
  const posts = [];
  await ctx.route("**/*", (route) => {
    const u = new URL(route.request().url());
    if (u.origin !== ORIGIN) return route.abort();
    if (FONT_FILES.has(u.pathname)) return route.fulfill({ status: 200, contentType: "font/woff2", body: FONT_FILES.get(u.pathname) });
    if (route.request().method() !== "GET") posts.push(`${route.request().method()} ${u.pathname}`);
    return route.continue();
  });
  const page = await ctx.newPage();
  return { ctx, page, posts };
}

/**
 * This machine has no Mac system font: the admin's system stack falls back to DejaVu here. Inter,
 * the neo-grotesque this site already ships, stands in for the Mac's system UI font the owner sees.
 */
const FONT_FILES = new Map();
let FONT_CSS = "";
/** Inter's latin faces, fetched once and served from the page's own origin (no load can fail mid-run). */
async function loadInter() {
  const css = await (await fetch("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=block", { headers: { "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36" } })).text();
  const latin = css.split("/*").filter((b) => b.startsWith(" latin */")).map((b) => b.slice(b.indexOf("*/") + 2));
  if (!latin.length) throw new Error("could not read Inter's latin faces");
  let i = 0;
  const faces = [];
  for (const face of latin) {
    const url = (face.match(/url\((https:[^)]+)\)/) || [])[1];
    if (!url) continue;
    const name = `/__ps-font/inter-${i++}.woff2`;
    FONT_FILES.set(name, Buffer.from(await (await fetch(url)).arrayBuffer()));
    faces.push(face.replace(url, name));
  }
  FONT_CSS = `${faces.join("\n")}\n*:not(code):not(pre):not(kbd):not(samp) { font-family: Inter, ui-sans-serif, system-ui, sans-serif !important; }`;
}

async function settle(page) {
  await page.waitForLoadState("networkidle", { timeout: 6000 }).catch(() => {});
  await page.addStyleTag({ content: FONT_CSS });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1200);
}

async function go(page, p) {
  if (!page.url().startsWith(`${ORIGIN}/admin`)) {
    await page.goto(`${ORIGIN}/admin/`, { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 6000 }).catch(() => {});
  }
  // The admin is a HashRouter app: routes live after "#".
  await page.evaluate((to) => {
    location.hash = to;
  }, p);
  await settle(page);
}

async function runOnce() {
  const P = fs.mkdtempSync(path.join(os.tmpdir(), "nwks-d1-"));
  let server = null;
  const browser = await chromium.launch();
  try {
    console.log("[nwks-admin] migrations -> private local D1");
    wr(["d1", "migrations", "apply", "nwks-encounter", "--local", "--persist-to", P]);
    const email = `admin@${DOMAIN}`;
    const password = crypto.randomBytes(18).toString("base64url");
    const sa = spawnSync("node", ["scripts/seed-admin.mjs", "--email", email, "--password", password, "--name", "Encounter Admin", "--program", "both"], { cwd: REPO, encoding: "utf8", env: { ...process.env, NWKS_D1_PERSIST_TO: P } });
    if (sa.status !== 0) throw new Error(`seed-admin failed: ${sa.stderr.slice(-400)}`);
    const swapped = rewriteSeed();
    console.log(`[nwks-admin] seed rewritten: ${swapped.people} people, ${swapped.towns} towns mapped to invented ones`);
    const sd = spawnSync("node", [SEED_OUT], { cwd: REPO, encoding: "utf8", env: { ...process.env, NWKS_D1_PERSIST_TO: P } });
    if (sd.status !== 0) throw new Error(`seed failed: ${(sd.stderr || sd.stdout).slice(-600)}`);
    // The four newest men have paid in cash already (what the roster's one-click "Mark paid" records), so the
    // "Not paid yet" filter visibly narrows. Written here, not clicked: that click also starts a
    // letter flow that took the local server down mid-run.
    wr(["d1", "execute", "nwks-encounter", "--local", "--persist-to", P, "--command",
      `UPDATE registrations SET payment_state = 'expecting_cash', paid_at = '${new Date().toISOString()}', paid_recorded_by = 'reviewer@${DOMAIN}' WHERE id IN (SELECT id FROM registrations WHERE program = 'mens' AND role = 'attendee' AND admission_state = 'confirmed' ORDER BY created_at DESC LIMIT 4)`]);
    let audit = denyAudit(P);
    console.log(`[nwks-admin] deny audit: ${audit.cells} text cells x ${audit.terms} terms -> ${audit.hits} hits ${audit.where.length ? `in ${audit.where.join(", ")}` : ""}`);
    if (audit.hits) {
      console.log(`[nwks-admin] scrubbed ${scrubLocal(P, audit.where)} rows of migration content in the local copy`);
      audit = denyAudit(P);
      console.log(`[nwks-admin] deny audit again: ${audit.cells} cells -> ${audit.hits} hits`);
    }
    if (audit.hits) throw new Error("a deny-listed term is still in the local database: refusing to shoot");

    await loadInter();
    server = startServer(P);
    await waitUp();
    const login = await fetch(`${ORIGIN}/api/auth/login`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email, password }) });
    const set = login.headers.getSetCookie?.() ?? [];
    const jar = set.map((c) => {
      const [nv] = c.split(";");
      const i = nv.indexOf("=");
      return { name: nv.slice(0, i), value: nv.slice(i + 1), domain: "127.0.0.1", path: "/", httpOnly: true };
    });
    if (!login.ok || !jar.length) throw new Error(`local login failed: ${login.status}`);

    if (EXPLORE) {
      fs.mkdirSync(EXPLORE, { recursive: true });
      for (const [mode, vp] of [
        ["desk", { viewport: DESK, deviceScaleFactor: 1 }],
        ["tab", { viewport: { width: 768, height: 1024 }, deviceScaleFactor: 1 }],
      ]) {
        const { ctx, page, posts } = await session(browser, vp, jar);
        for (const [id, p] of [["dashboard", "/"], ["rooms", "/rooms"], ["attendees", "/attendees"], ["print", "/print"]]) {
          await go(page, p);
          await page.screenshot({ path: path.join(EXPLORE, `${id}-${mode}.png`) });
          fs.writeFileSync(path.join(EXPLORE, `${id}-${mode}.txt`), (await page.evaluate(() => [...document.querySelectorAll("h1,h2,h3,button,[role=tab],[data-cabin],[data-unit-id],[data-pin]")].slice(0, 120).map((e) => { const r = e.getBoundingClientRect(); return `${e.tagName.toLowerCase()} ${[...e.attributes].filter((a) => a.name.startsWith("data-") || a.name === "aria-label").map((a) => `${a.name}=${a.value}`).join(" ")} y=${Math.round(r.top)} x=${Math.round(r.left)} w=${Math.round(r.width)} h=${Math.round(r.height)} "${(e.textContent || "").trim().slice(0, 30)}"`; }))).join("\n"));
        }
        console.log(`[explore] ${mode} writes: ${JSON.stringify([...new Set(posts)])}`);
        await ctx.close();
      }
      return;
    }
    const revive = async () => {
      let up = false;
      try {
        up = (await fetch(`${ORIGIN}/api/health`, { signal: AbortSignal.timeout(3000) })).ok;
      } catch {}
      if (up) return;
      server.stop();
      await new Promise((r) => setTimeout(r, 1500));
      server = startServer(P);
      await waitUp();
    };
    const result = await captureAll(browser, jar, revive);
    const lines = [
      "// GENERATED by scripts/capture-nwks-admin.mjs. Do not edit by hand: re-run the script.",
      `// NWKS Encounter admin bundle ${BUNDLE} at ${SHA}, run locally on its demo seed with every person, town`,
      "// and church swapped for the invented NWKS set (src/data/demos/invented/nwks-encounter.ts).",
      "// Each still has a <still>.words.json beside it, read by tests/demo-privacy.probe.mjs (spec §7.2 #18).",
      "// Rects are still css px: desk stills are a 1440 x 900 window, phone stills 390 wide.",
      `export const NWKS_ADMIN_SHOTS = ${JSON.stringify(result, null, 2)} as const;`,
      "",
    ];
    fs.writeFileSync(DATA, lines.join("\n"));
    let total = 0;
    for (const [id, r] of Object.entries(result)) {
      if (!r.desk) continue;
      total += r.desk.bytes + (r.phone?.bytes ?? 0);
      console.log(`[nwks-admin] ${id}: desk ${(r.desk.bytes / 1024).toFixed(0)} KB, phone ${r.phone ? (r.phone.bytes / 1024).toFixed(0) : "-"} KB, targets ${Object.keys(r.targets).join(",")}`);
    }
    console.log(`[nwks-admin] ${Object.keys(result).length} views, ${(total / 1024).toFixed(0)} KB -> ${path.relative(ROOT, OUT)}`);
  } finally {
    await browser.close();
    if (server && process.env.NWKS_SERVER_LOG) fs.writeFileSync(process.env.NWKS_SERVER_LOG, server.log());
    server?.stop();
    fs.rmSync(P, { recursive: true, force: true });
    fs.rmSync(SEED_OUT, { force: true });
  }
}

/** In-page: where to drag one initials pin from Cabin 1 to a free bed in Cabin 3, and how it looks. */
function dragPlan() {
  const cab = (n) => [...document.querySelectorAll("button[aria-label]")].find((b) => b.getAttribute("aria-label") === `Open Cabin ${n}`);
  const c1 = cab(1)?.getBoundingClientRect();
  const c3 = cab(3)?.getBoundingClientRect();
  if (!c1 || !c3) return null;
  const dy = c3.top - c1.top;
  const dx = c3.left - c1.left;
  const pins = [...document.querySelectorAll('[data-testid^="pin-"]')].map((e) => ({ e, r: e.getBoundingClientRect() }));
  const inCab = (r, c) => r.top > c.top && r.top < c.top + 190 && r.left > c.left - 20 && r.left < c.left + 420;
  const one = pins.filter((p) => inCab(p.r, c1));
  const three = pins.filter((p) => inCab(p.r, c3));
  const free = one.map((p) => ({ x: p.r.left + dx, y: p.r.top + dy })).find((t) => !three.some((q) => Math.abs(q.r.left - t.x) < 6 && Math.abs(q.r.top - t.y) < 6));
  const from = one.find((p) => p.e.getAttribute("data-role") === "attendee") ?? one[0];
  if (!free || !from) return null;
  const cs = getComputedStyle(from.e);
  const bed = getComputedStyle(from.e.parentElement);
  return {
    id: from.e.getAttribute("data-testid"),
    initials: (from.e.textContent || "").trim(),
    from: { x: Math.round(from.r.left), y: Math.round(from.r.top), w: Math.round(from.r.width), h: Math.round(from.r.height) },
    to: { x: Math.round(free.x), y: Math.round(free.y), w: Math.round(from.r.width), h: Math.round(from.r.height) },
    look: { bg: cs.backgroundColor, border: cs.borderColor, color: cs.color, font: cs.fontSize, bed: bed.backgroundColor !== "rgba(0, 0, 0, 0)" ? bed.backgroundColor : "rgb(240, 236, 226)" },
  };
}

const unionOf = (rs) => {
  const x = Math.min(...rs.map((r) => r.x));
  const y = Math.min(...rs.map((r) => r.y));
  return { x, y, w: Math.max(...rs.map((r) => r.x + r.w)) - x, h: Math.max(...rs.map((r) => r.y + r.h)) - y };
};

/*
 * The click path (spec §6.3). `targets`: where the drawn cursor goes (desk still css px).
 * `bands`: the phone crop at the admin's narrowest layout (768): each band is the union of its
 * specs' rects, padded; several bands stack into one picture.
 */
const STEPS = [
  { id: "dashboard", hash: "/", targets: { firstTimers: { text: "First-timers", climb: 90, number: true } }, bands: [[{ text: "Attendees", exact: true, climb: 90 }, { text: "Dietary & health notes", climb: 90 }]] },
  { id: "cabins-before", hash: "/rooms", block: true, targets: { rerun: { sel: '[data-testid="rooms-rerun"]' } }, bands: [[{ sel: '[data-testid="rooms-rerun"]' }, { text: "confirmed people" }], [{ sel: 'button[aria-label="Open Cabin 1"]', climb: 160 }]] },
  { id: "cabins", hash: "/rooms", rerun: true, targets: {}, bands: [[{ sel: 'button[aria-label="Open Cabin 1"]', climb: 160 }], [{ sel: 'button[aria-label="Open Cabin 3"]', climb: 160 }]] },
  { id: "cabins-moved", hash: "/rooms", drag: true, targets: {}, bands: [[{ sel: 'button[aria-label="Open Cabin 1"]', climb: 160 }], [{ sel: 'button[aria-label="Open Cabin 3"]', climb: 160 }]] },
  { id: "attendees", hash: "/attendees", targets: { notPaid: { text: "Not paid yet", exact: true } }, bands: [[{ text: "Not paid yet", exact: true }, { text: "Drop", exact: true, nth: 2, climb: 50 }]] },
  { id: "attendees-unpaid", hash: "/attendees", unpaid: true, targets: {}, bands: [] },
  { id: "badges", hash: "/print", targets: { sheet: { text: "The sheet", exact: true } }, bands: [[{ text: "The badge, both faces", climb: 200 }]] },
  { id: "labels", hash: "/print", labels: true, targets: { labels: { sel: '[data-testid="job-luggage_label"]' } }, bands: [[{ text: "The sheet", exact: true, climb: 300 }]] },
];

async function captureAll(browser, jar, revive) {
  fs.mkdirSync(OUT, { recursive: true });
  if (REVIEW) fs.mkdirSync(REVIEW, { recursive: true });
  const desk = await session(browser, { viewport: DESK, deviceScaleFactor: 2 }, jar);
  const tab = await session(browser, { viewport: { width: 768, height: 3000 }, deviceScaleFactor: 2 }, jar);
  let blocked = false;
  const held = [];
  for (const s of [desk, tab]) {
    // The "before" board: the plan request the page sends on its first open is held open (never
    // answered) for the before shots, so the camp is drawn and everyone waits in the pool. It is
    // let go afterwards; the next open plans for real.
    await s.page.route(/\/api\/admin\/rooms\/seed(\?|$)/, (route) => (blocked ? held.push(route) : route.fallback()));
  }
  const result = {};
  for (const st of STEPS) {
    blocked = Boolean(st.block);
    if (!blocked) while (held.length) await held.shift().abort().catch(() => {});
    for (const [mode, s] of PHONE_CROPS ? [["desk", desk], ["tab", tab]] : [["desk", desk]]) {
      // Local workerd drops now and then (a request after a write); the plan lives in the persisted
      // D1, so a restarted server serves the same camp and the same session. One retry per view; a
      // desk drag is never redone (its pin has already moved).
      for (let tryN = 1; ; tryN++) {
        try {
          await shootView(st, mode, s);
          break;
        } catch (e) {
          if (tryN >= 2 || (st.drag && mode === "desk")) throw e;
          console.log(`[nwks-admin] ${st.id} ${mode} failed (${String(e.message).split("\n")[0]}); reviving the local server`);
          await revive();
        }
      }
    }
  }
  console.log(`[nwks-admin] writes seen: desk ${JSON.stringify([...new Set(desk.posts)])}`);
  await desk.ctx.close();
  await tab.ctx.close();
  return result;

  async function shootView(st, mode, s) {
      const page = s.page;
      if (st.hash === "/rooms") {
        // Re-open the board so it reads the current plan.
        await go(page, "/");
      }
      if (!(st.unpaid || st.labels) || mode === "tab") await go(page, st.hash);
      if (st.unpaid) await click(page, { text: "Not paid yet", exact: true });
      if (st.labels) await click(page, { text: "Luggage labels", exact: true });
      if (st.rerun && mode === "desk") {
        await click(page, { sel: '[data-testid="rooms-rerun"]' });
        await page.waitForLoadState("networkidle", { timeout: 6000 }).catch(() => {});
        await page.waitForTimeout(1500);
        await go(page, "/");
        await go(page, "/rooms");
      }
      if (st.drag && mode === "desk") {
        await go(page, "/");
        await go(page, "/rooms");
        const plan = await page.evaluate(dragPlan);
        if (!plan) throw new Error("no pin to drag from Cabin 1 to Cabin 3");
        result.drag = plan;
        const c = (r) => [r.x + r.w / 2, r.y + r.h / 2];
        const [fx, fy] = c(plan.from);
        const [tx, ty] = c(plan.to);
        await page.mouse.move(fx, fy);
        await page.mouse.down();
        for (let i = 1; i <= 24; i++) await page.mouse.move(fx + ((tx - fx) * i) / 24, fy + ((ty - fy) * i) / 24);
        await page.waitForTimeout(250);
        await page.mouse.up();
        await page.waitForLoadState("networkidle", { timeout: 6000 }).catch(() => {});
        await page.waitForTimeout(1500);
        const moved = await page.evaluate((id) => {
          const r = document.querySelector(`[data-testid="${id}"]`)?.getBoundingClientRect();
          return r ? { x: Math.round(r.left), y: Math.round(r.top) } : null;
        }, plan.id);
        result.drag.landed = moved;
        console.log(`[nwks-admin] drag ${plan.initials}: ${JSON.stringify(plan.from)} -> ${JSON.stringify(moved)} (aimed ${JSON.stringify(plan.to)})`);
        await go(page, "/");
        await go(page, "/rooms");
      }
      // No hover state in any shot: the pointer rests off every control.
      await page.mouse.move(2, mode === "desk" ? 898 : 2998);
      await page.waitForTimeout(400);
      if (mode === "desk") {
        const targets = {};
        for (const [k, spec] of Object.entries(st.targets)) {
          const r = await rectOf(page, spec);
          if (!r) {
            if (REVIEW) await page.screenshot({ path: path.join(REVIEW, `FAILED-${st.id}.png`) });
            throw new Error(`${st.id}: target ${k} not found (${page.url()})`);
          }
          targets[k] = r;
        }
        const rect = { x: 0, y: 0, w: DESK.width, h: DESK.height };
        const words = await page.evaluate(wordsIn, rect);
        const png = await page.screenshot({ type: "png" });
        result[st.id] = { desk: await writeStill(png, `${st.id}.webp`, DESK.width, 2880, words, rect), targets };
      } else {
        const bandSpecs = st.bands.length ? st.bands : STEPS.find((x) => x.id === st.id.replace("-unpaid", "")).bands;
        const bands = [];
        for (const specs of bandSpecs) {
          const rs = [];
          for (const sp of specs) {
            const r = await rectOf(page, sp);
            if (!r) throw new Error(`${st.id}: phone band ${JSON.stringify(sp)} not found`);
            rs.push(r);
          }
          const u = unionOf(rs);
          bands.push({ x: Math.max(0, u.x - 12), y: Math.max(0, u.y - 8), w: Math.min(768 - Math.max(0, u.x - 12), u.w + 24), h: u.h + 20 });
        }
        const pngs = [];
        const words = [];
        for (const r of bands) {
          pngs.push(await page.screenshot({ type: "png", clip: { x: r.x, y: r.y, width: r.w, height: r.h } }));
          words.push(...(await page.evaluate(wordsIn, r)));
        }
        let png = pngs[0];
        if (pngs.length > 1) {
          const gap = 24;
          const metas = await Promise.all(pngs.map((p) => sharp(p).metadata()));
          const W = Math.max(...metas.map((m) => m.width));
          const H = metas.reduce((n, m) => n + m.height, 0) + gap * (pngs.length - 1);
          let top = 0;
          const layers = pngs.map((p, i) => {
            const l = { input: p, top, left: 0 };
            top += metas[i].height + gap;
            return l;
          });
          png = await sharp({ create: { width: W, height: H, channels: 3, background: { r: 241, g: 237, b: 228 } } }).composite(layers).png().toBuffer();
        }
        result[st.id].phone = await writeStill(png, `${st.id}-phone.webp`, Math.round((await sharp(png).metadata()).width / 2), null, [...new Set(words)], bands.length === 1 ? bands[0] : bands);
        result[st.id].bands = bands;
      }
  }
}

/** Local workerd drops a connection now and then on a loaded machine; each attempt starts from a fresh database. */
async function main() {
  for (let attempt = 1; ; attempt++) {
    try {
      return await runOnce();
    } catch (e) {
      if (attempt >= 3 || EXPLORE) throw e;
      console.log(`[nwks-admin] attempt ${attempt} failed (${String(e.message).split("\n")[0]}); starting over`);
    }
  }
}

await main();
