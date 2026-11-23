#!/usr/bin/env node
/**
 * render-acord.mjs — draws HG Oil's demonstration ACORD 25 ONCE, as a raster
 * (design-spec-r2 §2.1). Run it whenever VENDOR_CERT or the form changes:
 *
 *   node scripts/render-acord.mjs
 *
 * Why a picture: real iOS Safari drew the live HTML form (CSS zoom ~0.4) with
 * its fine print ~2.3x too large for its cells, so labels ran over each other.
 * An <img> at display size is the same in every engine by construction.
 *
 * Source of truth stays the real component (src/components/showcase/scenes/
 * Acord25.tsx) and its CSS (the ".ac" section of scenes/hg-coi.css, or
 * scenes/acord25.css once that section moves). This script:
 *   1. renders Acord25 with VENDOR_CERT (src/data/showcase/scenes/hg-vendor.ts)
 *      to static HTML (react-dom/server; jiti loads the TSX),
 *   2. lays it out in Playwright Chromium at 816 x 1056, deviceScaleFactor 1.5,
 *      with SHIPPED fonts only (scripts/fonts: Arimo for Arial, Cousine for
 *      Courier New) and fails if any face does not load, any text resolves to
 *      another family, any line-height is "normal", or any typed value is
 *      clipped by its cell,
 *   3. measures the four check regions (native 816 px) from the layout,
 *   4. writes, quantized to 16 colours (sharp/libimagequant):
 *        public/images/demos/hg-oil/acord25-prairie-dog.png       1224 x 1584
 *        public/images/demos/hg-oil/acord25-prairie-dog-thumb.webp 408 x 528
 *        public/images/demos/hg-oil/acord25-prairie-dog.words.json  (the words drawn, for the privacy rule on stills)
 *        src/data/showcase/scenes/hg-vendor-regions.ts             (generated)
 *
 * Tools: playwright (devDependency), and jiti + sharp, which this repo already
 * installs through next and eslint/tailwind (no new dependency).
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const req = createRequire(path.join(ROOT, "package.json"));
const FONTS = path.join(ROOT, "scripts/fonts");
const OUT_DIR = path.join(ROOT, "public/images/demos/hg-oil");
const PUBLIC_BASE = "/images/demos/hg-oil";
const NAME = "acord25-prairie-dog";
const REGIONS_TS = path.join(ROOT, "src/data/showcase/scenes/hg-vendor-regions.ts");
const W = 816;
const H = 1056;
const DSF = 1.5;
const COLOURS = 16;

function need(name) {
  try {
    return req(name);
  } catch (e) {
    throw new Error(`[render-acord] cannot load "${name}" from ${ROOT}/node_modules (run npm ci): ${e.message}`);
  }
}

/* ── 1. The form's HTML ───────────────────────────────────────────────────── */
const { createJiti } = need("jiti");
const jiti = createJiti(path.join(ROOT, "scripts/render-acord.mjs"), {
  jsx: { runtime: "automatic" },
  alias: { "@/": path.join(ROOT, "src") + "/" },
});
const { Acord25 } = await jiti.import(path.join(ROOT, "src/components/showcase/scenes/Acord25.tsx"));
const { VENDOR_CERT } = await jiti.import(path.join(ROOT, "src/data/showcase/scenes/hg-vendor.ts"));
const React = need("react");
const { renderToStaticMarkup } = need("react-dom/server");
const markup = renderToStaticMarkup(React.createElement(Acord25, { c: VENDOR_CERT }));

/* ── The form's CSS, with every face mapped to a shipped font ─────────────── */
function acordCss() {
  const own = path.join(ROOT, "src/components/showcase/scenes/acord25.css");
  if (fs.existsSync(own)) return fs.readFileSync(own, "utf8");
  const src = fs.readFileSync(path.join(ROOT, "src/components/showcase/scenes/hg-coi.css"), "utf8");
  const at = src.indexOf("The ACORD 25 (2016/03) page");
  if (at < 0) throw new Error("[render-acord] the ACORD section of hg-coi.css was not found (moved? put it in scenes/acord25.css)");
  return src.slice(src.lastIndexOf("/*", at));
}
let css = acordCss();
const families = [];
css = css.replace(/font-family:\s*([^;]+);/g, (_, stack) => {
  families.push(stack.trim());
  if (/courier/i.test(stack)) return "font-family: ShipCousine;";
  if (/arial/i.test(stack)) return "font-family: ShipArimo;";
  throw new Error(`[render-acord] no shipped face for font-family: ${stack}`);
});
// The wordmark is Arial Black on paper; it is drawn in Arimo Bold Italic (no Arial Black anywhere).
css = css.replace(/(\.ac-logo\s*\{[^}]*?)font-weight:\s*900;/, "$1font-weight: 700;");

const face = (family, file, weight, style = "normal") =>
  `@font-face{font-family:${family};src:url("/fonts/${encodeURIComponent(file)}") format("truetype");font-weight:${weight};font-style:${style};font-display:block}`;
const page = `<!doctype html><html><head><meta charset="utf-8"><style>
${face("ShipArimo", "Arimo[wght].ttf", "400 700")}
${face("ShipArimo", "Arimo-Italic[wght].ttf", "400 700", "italic")}
${face("ShipCousine", "Cousine-Regular.ttf", "400")}
${face("ShipCousine", "Cousine-Bold.ttf", "700")}
/* The site's preflight (Tailwind) sets these for every element; the form is laid out under them. */
*,*::before,*::after{box-sizing:border-box}
p{margin:0}
html,body{margin:0;padding:0;background:#fff}
${css}
</style></head><body>${markup}</body></html>`;

/* ── 2. Lay it out and check it ───────────────────────────────────────────── */
const { chromium } = need("playwright");
const browser = await chromium.launch();
let shot;
let regions;
let words;
try {
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: DSF });
  await ctx.route("**/*", async (r) => {
    const u = new URL(r.request().url());
    if (u.host !== "acord.local") return r.abort();
    if (u.pathname === "/") return r.fulfill({ status: 200, contentType: "text/html", body: page });
    if (u.pathname.startsWith("/fonts/")) {
      const f = path.join(FONTS, path.basename(decodeURIComponent(u.pathname)));
      if (!fs.existsSync(f)) return r.fulfill({ status: 404, body: "" });
      return r.fulfill({ status: 200, contentType: "font/ttf", body: fs.readFileSync(f) });
    }
    return r.abort();
  });
  const p = await ctx.newPage();
  await p.goto("http://acord.local/");
  const check = await p.evaluate(async () => {
    const problems = [];
    // Load every declared face; a missing file rejects.
    const faces = [...document.fonts];
    const loaded = await Promise.allSettled(faces.map((f) => f.load()));
    loaded.forEach((r, i) => {
      if (r.status !== "fulfilled") problems.push(`face ${faces[i].family} ${faces[i].weight} ${faces[i].style} failed to load`);
    });
    await document.fonts.ready;
    const ac = document.querySelector(".ac");
    for (const el of [ac, ...ac.querySelectorAll("*")]) {
      const cs = getComputedStyle(el);
      if (cs.lineHeight === "normal") problems.push(`line-height normal on .${el.className || el.tagName}`);
      const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.nodeValue.trim());
      if (hasText && !/^"?Ship(Arimo|Cousine)"?$/.test(cs.fontFamily)) problems.push(`text in ${cs.fontFamily} on .${el.className}`);
    }
    // No text may be clipped by, or print over the edge of, its cell: every
    // text run's box must sit inside the content box of the nearest cell that
    // clips (overflow != visible), on both axes, to within 0.5 px.
    const walk = document.createTreeWalker(ac, NodeFilter.SHOW_TEXT);
    for (let n = walk.nextNode(); n; n = walk.nextNode()) {
      if (!n.nodeValue.trim()) continue;
      const r = document.createRange();
      r.selectNodeContents(n);
      const lines = [...r.getClientRects()].filter((q) => q.width > 0.5 && q.height > 0.5);
      for (let c = n.parentElement; c && c !== ac; c = c.parentElement) {
        const cs = getComputedStyle(c);
        if (cs.overflow === "visible") continue;
        const b = c.getBoundingClientRect();
        const box = {
          l: b.left + parseFloat(cs.borderLeftWidth),
          r: b.right - parseFloat(cs.borderRightWidth),
          t: b.top + parseFloat(cs.borderTopWidth),
          b: b.bottom - parseFloat(cs.borderBottomWidth),
        };
        for (const q of lines) {
          const out = [box.l - q.left, q.right - box.r, box.t - q.top, q.bottom - box.b].map((v) => Math.round(v * 10) / 10);
          if (out.some((v) => v > 0.5)) problems.push(`"${n.nodeValue.trim().slice(0, 40)}" outside .${c.className} by l/r/t/b ${out.join("/")}`);
        }
        break;
      }
    }
    const R = (el) => el.getBoundingClientRect();
    const head = [...ac.querySelectorAll(".ac-cov__head > span")];
    const blocks = ["gl", "auto", "umbrella", "wc"].map((k) => ac.querySelector(`[data-k="${k}"]`));
    if (head.length !== 8 || blocks.some((b) => !b)) problems.push("coverage table structure changed");
    const top = R(blocks[0]).top;
    const bottom = R(blocks[3]).bottom;
    const col = (a, b) => ({ x: R(head[a]).left, w: R(head[b]).right - R(head[a]).left });
    const box = ({ x, w }) => ({ x: Math.round(x), y: Math.round(top), w: Math.round(w), h: Math.round(bottom - top) });
    const holder = R(ac.querySelector('[data-k="holder"]'));
    const regions = {
      type: box(col(0, 1)),
      dates: box(col(5, 6)),
      limits: box(col(7, 7)),
      holder: { x: Math.round(holder.left), y: Math.round(holder.top), w: Math.round(holder.width), h: Math.round(holder.height) },
    };
    const words = [...new Set(ac.innerText.split(/\s+/).map((w) => w.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "")).filter(Boolean))].sort();
    const size = R(ac);
    return { problems, regions, words, size: [size.width, size.height] };
  });
  if (check.size[0] !== W || check.size[1] !== H) check.problems.push(`page is ${check.size.join(" x ")}, not ${W} x ${H}`);
  if (check.problems.length) throw new Error(`[render-acord] the form did not lay out cleanly:\n  ${check.problems.join("\n  ")}`);
  regions = check.regions;
  words = check.words;
  shot = await p.locator(".ac").screenshot({ type: "png" });
} finally {
  await browser.close();
}

/* ── 4. Write the assets ──────────────────────────────────────────────────── */
const sharp = need("sharp");
fs.mkdirSync(OUT_DIR, { recursive: true });
const pngPath = path.join(OUT_DIR, `${NAME}.png`);
const thumbPath = path.join(OUT_DIR, `${NAME}-thumb.webp`);
const wordsPath = path.join(OUT_DIR, `${NAME}.words.json`);
await sharp(shot).png({ palette: true, colours: COLOURS, dither: 0.6, compressionLevel: 9, effort: 10 }).toFile(pngPath);
await sharp(shot).resize(408, 528, { kernel: "lanczos3" }).webp({ quality: 82, effort: 6 }).toFile(thumbPath);
fs.writeFileSync(wordsPath, JSON.stringify({ source: "scripts/render-acord.mjs", words }, null, 2) + "\n");
const meta = await sharp(pngPath).metadata();
const png = fs.statSync(pngPath).size;
const thumb = fs.statSync(thumbPath).size;
if (meta.width !== W * DSF || meta.height !== H * DSF) throw new Error(`[render-acord] png is ${meta.width} x ${meta.height}`);

const ts = `// GENERATED by scripts/render-acord.mjs. Do not edit; re-run the script.
// The ACORD 25 raster HG Oil's Vendor Insurance scene shows (design-spec-r2 §2.1),
// and the four regions its checks outline, in the form's native 816 x 1056 px.
export const ACORD_IMAGE = {
  src: "${PUBLIC_BASE}/${NAME}.png",
  thumb: "${PUBLIC_BASE}/${NAME}-thumb.webp",
  width: ${meta.width},
  height: ${meta.height},
  nativeW: ${W},
  nativeH: ${H},
  bytes: ${png},
  thumbBytes: ${thumb},
} as const;

export const ACORD_REGIONS = {
${Object.entries(regions)
  .map(([k, r]) => `  ${k}: { x: ${r.x}, y: ${r.y}, w: ${r.w}, h: ${r.h} },`)
  .join("\n")}
} as const;
`;
fs.writeFileSync(REGIONS_TS, ts);
console.log(`[render-acord] faces: ${[...new Set(families)].join(" | ")} -> ShipArimo / ShipCousine`);
console.log(`[render-acord] ${path.relative(ROOT, pngPath)} ${meta.width}x${meta.height} ${png} B (${COLOURS} colours)`);
console.log(`[render-acord] ${path.relative(ROOT, thumbPath)} 408x528 ${thumb} B`);
console.log(`[render-acord] regions ${JSON.stringify(regions)}`);
console.log(`[render-acord] ${words.length} distinct words -> ${path.relative(ROOT, wordsPath)}`);
