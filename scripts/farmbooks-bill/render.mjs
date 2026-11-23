#!/usr/bin/env node
/**
 * scripts/farmbooks-bill/render.mjs: renders the FarmBooks "Bills" scene's supplier invoice to a raster.
 *
 *   node scripts/farmbooks-bill/render.mjs
 *
 * Why a raster (design-spec-r2 §6.1, same reason as the ACORD in §2.1): document text built in CSS was
 * mis-sized by real iOS Safari on the old scene. A PNG drawn once, with fonts shipped in this folder
 * (Liberation Sans / Serif / Mono, SIL OFL 1.1, metric-compatible with Arial / Times / Courier), looks the
 * same in every engine by construction. Every text run below has an explicit px line-height.
 *
 * The bill is the invented one farm-books.com already publishes: Prairie General Farm Supply, invoice
 * 49813, Sept 15, 2024, four lines (diesel $320.00, seed corn $215.00, herbicide $98.50, hydraulic fluid
 * $67.00), total $700.50. Like the site we print NO subtotal/tax block (the engine checks the line sum
 * against the printed total only). Everything on it is invented demonstration data: the sold-to farm and
 * the towns come from the web-checked sets in src/data/demos/invented/.
 *
 * Writes (re-run only when the bill changes):
 *   public/images/demos/farmbooks/prairie-general-49813-<hash>.png        816 css wide at 1.5x, quantized
 *   public/images/demos/farmbooks/prairie-general-49813-thumb-<hash>.webp  240 px wide
 *   src/data/showcase/scenes/farmbooks-bill-regions.ts                        file names, size, regions, printed values
 *   src/data/demos/invented/farmbooks-bills.ts                                 (asset paths updated in place)
 */
import { createRequire } from "node:module";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const req = createRequire(import.meta.url);
const { chromium } = req("playwright");
const sharp = req("sharp");

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..", "..");
const OUT_DIR = path.join(ROOT, "public", "images", "demos", "farmbooks");
const REGIONS_TS = path.join(ROOT, "src", "data", "showcase", "scenes", "farmbooks-bill-regions.ts");
const INVENTED_TS = path.join(ROOT, "src", "data", "demos", "invented", "farmbooks-bills.ts");
const W = 816;
const DSF = 1.5;
const STEM = "prairie-general-49813";

/** What the paper prints. The scene's data module asserts its own copy against this (farmbooks-bills.ts). */
const BILL = {
  vendor: "Prairie General Farm Supply",
  invoice: "49813",
  date: "09/15/2024",
  account: "1045",
  total: "700.50",
  lines: [
    { item: "40210", desc: "DSL #2 DYED", qty: "100.0", um: "GAL", price: "3.200", amount: "320.00", fld: "EAST HALF" },
    { item: "51877", desc: "GRNG SD CORN", qty: "4", um: "BAG", price: "53.750", amount: "215.00", fld: "NORTH 80" },
    { item: "62034", desc: "HERB MIX 2.5 GL", qty: "1", um: "JUG", price: "98.500", amount: "98.50", fld: "" },
    { item: "70415", desc: "HYD FLUID UTF", qty: "5.0", um: "GAL", price: "13.400", amount: "67.00", fld: "EAST HALF" },
  ],
};

// The line amounts must add to the printed total to the cent (the bill passes FarmBooks' 2-cent check).
const cents = (s) => Math.round(Number(s) * 100);
const lineSum = BILL.lines.reduce((t, l) => t + cents(l.amount), 0);
if (lineSum !== cents(BILL.total)) throw new Error(`lines sum to ${lineSum / 100}, printed total is ${BILL.total}`);
for (const l of BILL.lines) {
  const ext = Math.round(Number(l.qty) * Number(l.price) * 100);
  if (ext !== cents(l.amount)) throw new Error(`${l.desc}: ${l.qty} x ${l.price} is not ${l.amount}`);
}

const font = (file) => `data:font/ttf;base64,${fs.readFileSync(path.join(HERE, "fonts", file)).toString("base64")}`;
const BLANK_ROWS = 7;

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: "Bill Sans"; src: url(${font("LiberationSans-Regular.ttf")}); font-weight: 400; }
@font-face { font-family: "Bill Sans"; src: url(${font("LiberationSans-Bold.ttf")}); font-weight: 700; }
@font-face { font-family: "Bill Serif"; src: url(${font("LiberationSerif-Bold.ttf")}); font-weight: 700; }
@font-face { font-family: "Bill Mono"; src: url(${font("LiberationMono-Regular.ttf")}); font-weight: 400; }
@font-face { font-family: "Bill Mono"; src: url(${font("LiberationMono-Bold.ttf")}); font-weight: 700; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: #fff; }
/* The pre-printed form is one green; what the store's printer filled in is black mono. */
#bill { --g: #1d5a35; --rule: #a9cdb3; --tint: #eef6f0; width: ${W}px; padding: 38px 42px 30px; background: #fffdf8;
  color: #161616; font: 400 12px/16px "Bill Sans"; -webkit-font-smoothing: antialiased; }
.g { color: var(--g); }
.lbl { font: 700 9.5px/12px "Bill Sans"; letter-spacing: .06em; color: var(--g); text-transform: uppercase; }
.m { font: 400 15px/19px "Bill Mono"; }
.head { display: flex; justify-content: space-between; align-items: flex-start; }
.brand { display: flex; gap: 14px; align-items: flex-start; padding: 2px 10px 6px 0; }
.brand svg { width: 62px; height: 70px; flex: none; }
.name { font: 700 33px/36px "Bill Serif"; letter-spacing: .5px; color: var(--g); }
.sub { font: 700 14px/18px "Bill Sans"; letter-spacing: .34em; color: var(--g); margin-top: 1px; }
.addr { font: 400 11.5px/15px "Bill Sans"; color: #33433a; margin-top: 6px; }
.inv { width: 268px; }
.inv h1 { font: 700 30px/32px "Bill Sans"; letter-spacing: .1em; color: var(--g); text-align: right; margin-bottom: 8px; }
.grid { display: grid; grid-template-columns: 104px 1fr; border: 1.5px solid var(--g); }
.grid > div { padding: 4px 8px; min-height: 28px; display: flex; align-items: center; border-top: 1px solid var(--rule); }
.grid > div:nth-child(-n+2) { border-top: 0; }
.grid > div:nth-child(odd) { background: var(--tint); border-right: 1px solid var(--rule); }
.grid .m { font-size: 15px; line-height: 19px; }
.parties { display: grid; grid-template-columns: 1.35fr 1fr 1fr; margin-top: 18px; border: 1.5px solid var(--g); }
.parties > div { padding: 6px 10px 8px; min-height: 86px; }
.parties > div + div { border-left: 1px solid var(--rule); }
.parties .m { font-size: 14px; line-height: 18px; margin-top: 4px; }
table { width: 100%; border-collapse: collapse; margin-top: 16px; border: 1.5px solid var(--g); }
th { background: var(--g); color: #fff; font: 700 9.5px/12px "Bill Sans"; letter-spacing: .06em; text-transform: uppercase; text-align: left; padding: 6px 8px; }
th.r, td.r { text-align: right; }
td { padding: 0 8px; border-top: 1px solid var(--rule); vertical-align: top; }
td + td, th + th { border-left: 1px solid var(--rule); }
th + th { border-left-color: rgba(255,255,255,.35); }
tr.line td { padding-top: 7px; padding-bottom: 7px; }
tr.line td .m { font-size: 15px; line-height: 19px; }
.fld { font: 400 13px/17px "Bill Mono"; color: #3b3b3b; margin-top: 2px; }
tr.blank td { height: 31px; }
.foot { display: flex; justify-content: space-between; align-items: stretch; margin-top: 16px; gap: 18px; }
.recv { flex: 1; border: 1.5px solid var(--g); padding: 6px 10px; position: relative; min-height: 78px; }
.recv svg { position: absolute; left: 22px; top: 26px; width: 150px; height: 44px; }
.recv .line { position: absolute; left: 10px; right: 10px; bottom: 16px; border-top: 1px solid var(--rule); }
.tot { width: 268px; border: 2px solid var(--g); display: grid; grid-template-rows: auto 1fr; }
.tot .lbl { background: var(--g); color: #fff; padding: 6px 10px; }
.tot .m { font: 700 26px/32px "Bill Mono"; text-align: right; padding: 12px 12px; }
.terms { margin-top: 14px; display: flex; justify-content: space-between; font: 400 10.5px/14px "Bill Sans"; color: #33433a; }
.thanks { font: 700 12px/16px "Bill Sans"; color: var(--g); }
.copy { font: 700 10.5px/14px "Bill Sans"; letter-spacing: .14em; color: var(--g); align-self: flex-end; }
</style></head><body>
<div id="bill">
  <div class="head">
    <div class="brand" data-k="vendor">
      <svg viewBox="0 0 62 70" aria-hidden="true">
        <g fill="none" stroke="#1d5a35" stroke-width="2.4" stroke-linejoin="round">
          <path d="M8 66V30l10-8 10 8v36"/><path d="M28 66V18l9-9 9 9v48"/><path d="M46 66V34l7-6 7 6v32"/>
          <path d="M3 66h56"/><path d="M14 66V52h8v14"/><path d="M33 26h8M33 34h8M33 42h8"/>
        </g>
      </svg>
      <div>
        <div class="name">PRAIRIE GENERAL</div>
        <div class="sub">FARM SUPPLY</div>
        <div class="addr">Feed · Seed · Fuel · Chemicals · Hardware</div>
        <div class="addr" style="margin-top:0">1400 Elevator Road · Aldervale, KS 67200</div>
        <div class="addr" style="margin-top:0">Phone (785) 555-0142</div>
      </div>
    </div>
    <div class="inv">
      <h1>INVOICE</h1>
      <div class="grid">
        <div class="lbl">Invoice no.</div><div class="m" data-k="invoice"><b>${BILL.invoice}</b></div>
        <div class="lbl">Date</div><div class="m" data-k="date">${BILL.date}</div>
        <div class="lbl">Account</div><div class="m">${BILL.account}</div>
        <div class="lbl">Page</div><div class="m">1 OF 1</div>
      </div>
    </div>
  </div>
  <div class="parties">
    <div><div class="lbl">Sold to</div><div class="m">COYOTE DRAW FARMS<br>RR 1, BOX 40<br>EMBERTON, KS 67180</div></div>
    <div><div class="lbl">Ship via</div><div class="m">CUSTOMER<br>PICKUP</div></div>
    <div><div class="lbl">Terms</div><div class="m">NET 30<br>DUE 10/15/2024<br>CLERK 12</div></div>
  </div>
  <table>
    <colgroup><col style="width:74px"><col><col style="width:68px"><col style="width:52px"><col style="width:98px"><col style="width:108px"></colgroup>
    <thead><tr><th>Item no.</th><th>Description</th><th class="r">Qty</th><th>UM</th><th class="r">Unit price</th><th class="r">Amount</th></tr></thead>
    <tbody>
      ${BILL.lines
        .map(
          (l, i) => `<tr class="line" data-k="line${i + 1}"><td class="m">${l.item}</td><td><div class="m">${l.desc}</div>${
            l.fld ? `<div class="fld" data-k="fld${i + 1}">FLD: ${l.fld}</div>` : ""
          }</td><td class="r m">${l.qty}</td><td class="m">${l.um}</td><td class="r m">${l.price}</td><td class="r m">${l.amount}</td></tr>`,
        )
        .join("")}
      ${Array.from({ length: BLANK_ROWS }, () => `<tr class="blank"><td></td><td></td><td></td><td></td><td></td><td></td></tr>`).join("")}
    </tbody>
  </table>
  <div class="foot">
    <div class="recv"><div class="lbl">Received by</div>
      <svg viewBox="0 0 150 44" aria-hidden="true"><path d="M4 30c6-14 12-22 15-16s-6 20 0 18 9-20 14-18-3 15 3 14 8-12 13-10 2 9 7 8 9-6 14-5M70 24c10-3 30-6 48-8" fill="none" stroke="#2747a8" stroke-width="2" stroke-linecap="round"/></svg>
      <div class="line"></div>
    </div>
    <div class="tot" data-k="total"><div class="lbl">Invoice total</div><div class="m">$${BILL.total}</div></div>
  </div>
  <div class="terms">
    <div>Terms: net 30 days. A finance charge of 1.5% per month is added to past-due balances.<div class="thanks">Thank you for your business!</div></div>
    <div class="copy">CUSTOMER COPY</div>
  </div>
</div>
</body></html>`;

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: W, height: 1200 }, deviceScaleFactor: DSF });
  await page.setContent(html, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  const faces = await page.evaluate(() => [...document.fonts].filter((f) => f.status === "loaded").map((f) => `${f.family} ${f.weight}`));
  if (faces.length !== 5) throw new Error(`expected the 5 shipped faces loaded, got ${JSON.stringify(faces)}`);
  const el = page.locator("#bill");
  const box = await el.boundingBox();
  const H = Math.round(box.height);
  const regions = await page.evaluate(() => {
    const root = document.getElementById("bill").getBoundingClientRect();
    const out = {};
    for (const e of document.querySelectorAll("[data-k]")) {
      const r = e.getBoundingClientRect();
      out[e.getAttribute("data-k")] = [r.left - root.left, r.top - root.top, r.width, r.height].map((v) => Math.round(v));
    }
    return out;
  });
  const raw = await el.screenshot({ type: "png" });

  // A 24-colour palette keeps the file small (~47 KB); the form is one green, the print black, the signature blue.
  const png = await sharp(raw).png({ palette: true, colors: 24, compressionLevel: 9, effort: 10 }).toBuffer();
  const thumb = await sharp(raw).resize({ width: 240 }).webp({ quality: 82 }).toBuffer();
  const hash = crypto.createHash("sha256").update(png).digest("hex").slice(0, 8);
  const meta = await sharp(png).metadata();

  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const f of fs.readdirSync(OUT_DIR)) if (f.startsWith(`${STEM}-`)) fs.rmSync(path.join(OUT_DIR, f));
  const pngName = `${STEM}-${hash}.png`;
  const thumbName = `${STEM}-thumb-${hash}.webp`;
  fs.writeFileSync(path.join(OUT_DIR, pngName), png);
  fs.writeFileSync(path.join(OUT_DIR, thumbName), thumb);

  const ts = `// GENERATED by scripts/farmbooks-bill/render.mjs. Do not edit; re-run the script when the bill changes.
// The rendered supplier invoice for the FarmBooks "Bills" scene (invented demonstration data) and the
// native-px boxes (css px at ${W} wide) of what the scene points at on it.

export const BILL_IMG = {
  src: "/images/demos/farmbooks/${pngName}",
  thumb: "/images/demos/farmbooks/${thumbName}",
  /** css px; the PNG is ${DSF}x (${meta.width} x ${meta.height}). */
  w: ${W},
  h: ${H},
} as const;

export type BillRegion = readonly [x: number, y: number, w: number, h: number];

export const BILL_REGIONS = {
${Object.entries(regions).map(([k, v]) => `  ${k}: [${v.join(", ")}],`).join("\n")}
} as const satisfies Record<string, BillRegion>;

/** What the paper prints; src/data/showcase/scenes/farmbooks-bills.ts must agree or the build fails. */
export const BILL_PRINTED = {
  vendor: ${JSON.stringify(BILL.vendor)},
  invoice: ${JSON.stringify(BILL.invoice)},
  date: ${JSON.stringify(BILL.date)},
  total: ${JSON.stringify(BILL.total)},
  amounts: ${JSON.stringify(BILL.lines.map((l) => l.amount))},
  fields: ${JSON.stringify(BILL.lines.map((l) => l.fld))},
} as const;
`;
  fs.writeFileSync(REGIONS_TS, ts);
  // The privacy probe only allows registered stage assets: keep the registry on the new file names.
  const reg = fs.readFileSync(INVENTED_TS, "utf8");
  const next = reg.replace(new RegExp(`${STEM}-[0-9a-f]{8}\\.png`, "g"), pngName).replace(new RegExp(`${STEM}-thumb-[0-9a-f]{8}\\.webp`, "g"), thumbName);
  if (!next.includes(pngName) || !next.includes(thumbName)) throw new Error(`${INVENTED_TS} must register both rendered files`);
  fs.writeFileSync(INVENTED_TS, next);
  console.log(`wrote ${pngName} (${meta.width}x${meta.height}, ${png.length} B), ${thumbName} (${thumb.length} B), regions ${Object.keys(regions).join(" ")}`);
  console.log(`faces: ${faces.join(", ")}`);
} finally {
  await browser.close();
}
