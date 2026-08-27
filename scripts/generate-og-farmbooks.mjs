#!/usr/bin/env node
/**
 * scripts/generate-og-farmbooks.mjs
 *
 * Generates the FarmBooks case-study Open Graph card:
 *   public/images/case-studies/farmbooks-og.jpg  (1200x630)
 *
 * Why this exists:
 *   /case-studies/farmbooks previously shared the generic site card
 *   (/images/og-image-v2.jpg), so every share of the FarmBooks build looked
 *   like a share of the homepage. This builds a dedicated card from assets
 *   already in the repo — the wheat/ledger mark in
 *   public/images/case-studies/farmbooks-logo.svg, redrawn at card scale —
 *   plus the FarmBooks palette (warm paper, ink, wheat gold).
 *
 * Copy rules honored (docs/WRITER-AGENT-PROMPT.md):
 *   no dollar amounts, no emoji, no exclamation marks, no accuracy percentage.
 *   The claim on the card is the verified two-cent reconciliation gate
 *   (FarmBooks pipeline/validate.py:22,95-96), the same one the page uses.
 *
 * Typography note:
 *   The site ships Inter via next/font, which is not installed as a system
 *   font, so the rasterizer cannot use it. The card renders in the local
 *   grotesque fallback chain below (Helvetica Neue on macOS) — visually
 *   consistent with Inter at display sizes. This is a one-time asset bake,
 *   not a runtime path.
 *
 * Run: node scripts/generate-og-farmbooks.mjs
 *   sharp is already present in node_modules (Next.js image optimization).
 */

import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public/images/case-studies/farmbooks-og.jpg");

const W = 1200;
const H = 630;

// FarmBooks brand palette.
const PAPER = "#F3F1EB";
const INK = "#1C1813";
const GOLD = "#C9A227";

const SANS = "Helvetica Neue, Helvetica, Arial, sans-serif";

// The wheat/ledger mark from public/images/case-studies/farmbooks-logo.svg,
// drawn at 4x its 48px viewBox so the strokes stay crisp on the card.
const MARK_SCALE = 4;
const mark = (x, y) => `
  <g transform="translate(${x} ${y}) scale(${MARK_SCALE})"
     fill="none" stroke="${GOLD}" stroke-linecap="round" stroke-linejoin="round">
    <path d="M24 32V9" stroke-width="2.4"/>
    <path d="M24 28.5l-5-4.2M24 28.5l5-4.2M24 22.5l-4.6-3.9M24 22.5l4.6-3.9M24 16.5l-4-3.4M24 16.5l4-3.4" stroke-width="2.2"/>
    <circle cx="24" cy="7.2" r="2.1" fill="${GOLD}" stroke="none"/>
    <path d="M7 33.5c5-2.2 12-2.2 17 1 5-3.2 12-3.2 17-1v6.8c-5-2.2-12-2.2-17 1-5-3.2-12-3.2-17-1z" stroke-width="2.2"/>
    <path d="M24 34.5v6.8" stroke-width="2.2"/>
  </g>`;

// Faint ledger rules, kept in the bottom-right dead space so they never cross
// the type. Evokes the .xlsx the pipeline ends in.
const ledgerRules = Array.from({ length: 6 }, (_, i) => {
  const y = 496 + i * 17;
  return `<line x1="980" y1="${y}" x2="${W - 88}" y2="${y}" stroke="${INK}" stroke-width="1" opacity="0.10"/>`;
}).join("\n    ");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${PAPER}"/>
  <rect width="${W}" height="10" fill="${GOLD}"/>
  ${ledgerRules}

  ${mark(88, 96)}

  <!-- Co-brand lockup, one line: "FarmBooks · by Preisser Solutions". The dx
       carries the space around the middot; a leading text space is collapsed. -->
  <text x="292" y="202" font-family="${SANS}" font-weight="700"
        letter-spacing="-0.5" fill="${INK}"><tspan font-size="46">FarmBooks</tspan><tspan
        dx="20" font-size="27" font-weight="500" letter-spacing="0.3" opacity="0.62">&#183;</tspan><tspan
        dx="10" font-size="27" font-weight="500" letter-spacing="0.3" opacity="0.62">by Preisser Solutions</tspan></text>

  <text x="88" y="372" font-family="${SANS}" font-size="66" font-weight="700"
        letter-spacing="-1.6" fill="${INK}">Photograph a bill.</text>
  <text x="88" y="450" font-family="${SANS}" font-size="66" font-weight="700"
        letter-spacing="-1.6" fill="${INK}">Get Schedule-F-ready books.</text>

  <line x1="88" y1="500" x2="188" y2="500" stroke="${GOLD}" stroke-width="4"/>

  <text x="88" y="542" font-family="${SANS}" font-size="27" font-weight="500"
        fill="${INK}" opacity="0.74">The line amounts must match the printed total</text>
  <text x="88" y="578" font-family="${SANS}" font-size="27" font-weight="500"
        fill="${INK}" opacity="0.74">within two cents, or a person looks at it first.</text>
</svg>`;

const jpg = await sharp(Buffer.from(svg))
  .flatten({ background: PAPER })
  .jpeg({ quality: 92, chromaSubsampling: "4:4:4" })
  .toBuffer();

await writeFile(OUT, jpg);

const meta = await sharp(jpg).metadata();
console.log(
  `[generate-og-farmbooks] Wrote ${path.relative(ROOT, OUT)} — ` +
    `${meta.width}x${meta.height}, ${(jpg.length / 1024).toFixed(1)} KB.`
);
