#!/usr/bin/env node
/**
 * scripts/generate-og-stage.mjs <slug> [--stage <id>] [--beat <id>]
 *
 * Share card for a case study with a Proof Stage: the stage's END FRAME,
 * screenshotted from the BUILT export (out/) with JavaScript off, composed onto
 * a 1200x630 card with the stage title and its "Demonstration data" label.
 * Generalizes scripts/generate-og-farmbooks.mjs (same sharp pipeline).
 *
 * Output: public/images/case-studies/<slug>[-<stage>]-stage-og.jpg
 * Needs:  npm run build first. Builds nothing itself; serves out/ through
 *         Playwright routing, no server, no port.
 * sharp is present through next (npm ls sharp), exactly as the FarmBooks script relies on.
 *
 * Copy rules (docs/WRITER-AGENT-PROMPT.md): the card's text is the stage title,
 * which may carry no amount (ADR-0016 §4); the label is printed on the card.
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const req = createRequire(import.meta.url);
const { chromium } = req("playwright");

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "out");
const ORIGIN = "http://og.test";
const W = 1200;
const H = 630;
const NAVY = "#0A1628";
const INK = "#FFFFFF";
const MUTED = "#94A3B8";
const BLUE = "#1590FF";
const SANS = "Helvetica Neue, Helvetica, Arial, sans-serif";
const SHOT = { x: 560, y: 64, w: 576, h: 502 };

function fail(msg, code = 1) {
  console.error(`[generate-og-stage] ${msg}`);
  process.exit(code);
}

function args(argv) {
  const out = { slug: null, stage: null, beat: null };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === "--stage") out.stage = argv[++i];
    else if (argv[i] === "--beat") out.beat = argv[++i];
    else if (!out.slug) out.slug = argv[i];
  }
  return out;
}

function resolveOut(urlPath) {
  let p = decodeURIComponent(urlPath.split("?")[0]);
  if (p.endsWith("/")) p += "index";
  const base = path.join(OUT, p);
  if (!base.startsWith(OUT)) return null;
  for (const c of [base, `${base}.html`, path.join(base, "index.html")]) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  }
  return null;
}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function wrap(text, max) {
  const lines = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    if ((line ? `${line} ${word}` : word).length > max && line) {
      lines.push(line);
      line = word;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

const a = args(process.argv.slice(2));
if (!a.slug || !/^[a-z0-9-]+$/.test(a.slug)) fail("usage: node scripts/generate-og-stage.mjs <slug> [--stage <id>] [--beat <id>]", 2);
if (!fs.existsSync(path.join(OUT, "case-studies", `${a.slug}.html`))) fail(`out/case-studies/${a.slug}.html is missing. Run npm run build first.`, 2);

const browser = await chromium.launch();
let info;
let png;
try {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2, javaScriptEnabled: false });
  await context.route((url) => url.origin !== ORIGIN, (r) => r.abort());
  await context.route(`${ORIGIN}/**`, (r) => {
    const f = resolveOut(new URL(r.request().url()).pathname);
    return f ? r.fulfill({ path: f }) : r.fulfill({ status: 404, body: "not in out/" });
  });
  const page = await context.newPage();
  await page.goto(`${ORIGIN}/case-studies/${a.slug}`, { waitUntil: "load" });
  const stage = page.locator(a.stage ? `[data-demo-stage="${a.stage}"]` : "[data-demo-stage]").first();
  if ((await stage.count()) === 0) fail(`no Proof Stage${a.stage ? ` "${a.stage}"` : ""} on /case-studies/${a.slug}`);
  info = await stage.evaluate((el) => ({
    id: el.getAttribute("data-demo-stage"),
    title: el.querySelector(".demo-stage__title")?.textContent?.trim() ?? "",
    label: el.querySelector("[data-demo-label]")?.textContent?.trim() ?? "",
  }));
  if (!info.label) fail(`stage "${info.id}" has no visible label (ADR-0016 §1)`);
  if (/\$\s?\d/.test(info.title)) fail(`stage "${info.id}" title carries an amount; the card text may not (ADR-0016 §4)`);
  const target = a.beat
    ? stage.locator(`[data-beat="${a.beat}"] .demo-screen`).first()
    : stage.locator('[data-beat-kind="screen"] .demo-screen').last();
  if ((await target.count()) === 0) fail(`no .demo-screen in ${a.beat ? `beat "${a.beat}"` : "a Screen beat"}`);
  png = await target.screenshot({ animations: "disabled" });
  await context.close();
} finally {
  await browser.close();
}

const fitted = await sharp(png).resize({ width: SHOT.w, height: SHOT.h, fit: "inside" }).png().toBuffer();
const meta = await sharp(fitted).metadata();
const titleLines = wrap(info.title, 20).slice(0, 3);
const labelW = Math.round(info.label.length * 11.5 + 40);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${NAVY}"/>
  <rect width="${W}" height="8" fill="${BLUE}"/>
  <text x="64" y="118" font-family="${SANS}" font-size="24" font-weight="500" fill="${MUTED}">Preisser Solutions · See it work</text>
  ${titleLines
    .map((l, i) => `<text x="64" y="${214 + i * 64}" font-family="${SANS}" font-size="54" font-weight="700" letter-spacing="-1.2" fill="${INK}">${esc(l)}</text>`)
    .join("\n  ")}
  <rect x="64" y="500" width="${labelW}" height="44" rx="22" fill="none" stroke="${MUTED}" stroke-width="2"/>
  <text x="${64 + 20}" y="529" font-family="${SANS}" font-size="20" font-weight="600" fill="${MUTED}">${esc(info.label)}</text>
</svg>`;

const jpg = await sharp(Buffer.from(svg))
  .composite([{ input: fitted, left: SHOT.x + Math.round((SHOT.w - meta.width) / 2), top: SHOT.y + Math.round((SHOT.h - meta.height) / 2) }])
  .flatten({ background: NAVY })
  .jpeg({ quality: 90, chromaSubsampling: "4:4:4" })
  .toBuffer();

const file = path.join(ROOT, "public", "images", "case-studies", `${a.slug}${a.stage ? `-${a.stage}` : ""}-stage-og.jpg`);
fs.writeFileSync(file, jpg);
const out = await sharp(jpg).metadata();
console.log(`[generate-og-stage] Wrote ${path.relative(ROOT, file)}: ${out.width}x${out.height}, ${(jpg.length / 1024).toFixed(1)} KB, stage "${info.id}".`);
