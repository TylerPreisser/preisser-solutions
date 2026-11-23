#!/usr/bin/env node
/**
 * scripts/capture-showcase-site-stills.mjs — the Website tab's loading stills (`first` in
 * src/data/showcase/clients/<slug>.ts), recaptured from the clients' LIVE public home pages.
 *
 * The loading still sits under the loading bar until the live site cross-fades in over it, so it must
 * be the same picture: this shoots the live site INSIDE the showcase window's own frame, at the frame's
 * own size (402x874 and 320x568 phones, an 820x1180 tablet, a 1440x900 desktop), just after the site has gone Live (its preloader waited out) and the fade is over. Public pages
 * only; nothing is clicked inside them.
 *
 *   npm run build
 *   node scripts/capture-showcase-site-stills.mjs [--out public/images/showcase] [--only hays-academy,farmbooks]
 *        [--sizes phone,phone320,desk,tablet]
 *
 * The built out/ is served AS https://preissersolutions.com (tests/support/serve-prod-origin.mjs), the
 * one origin the client sites allow to frame them. Phone: 402x874 at 2x with an iPhone UA (the sheet's
 * frame, the bench's phone); desk: 1440x900 at 1.25x (the centred window's frame). Each file is named
 * <slug>-site-<phone|phone320|desk|tablet>-live-<sha256 8>.webp; the script prints each line and where it goes
 * (`first`, or an entry of `firstAt`).
 * Then swap the old file out of the client file and delete it from public/images/showcase.
 * Recapture whenever a client's live hero changes (Hays's "Next class starts" date, a seasonal banner):
 * the bench's still-vs-live check (tests/showcase-window.probe.mjs, check d) goes red when they drift.
 */
import { createRequire } from "node:module";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { serveAsProdOrigin, PROD_ORIGIN } from "../tests/support/serve-prod-origin.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const req = createRequire(path.join(ROOT, "package.json"));
const { chromium } = req("playwright");
const sharp = req("sharp");

const arg = (name, dflt) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > 0 ? process.argv[i + 1] : dflt;
};
const OUT_DIR = path.resolve(ROOT, arg("out", "public/images/showcase"));
const ONLY = (arg("only", "") || "").split(",").filter(Boolean);
const SIZES = (arg("sizes", "") || "").split(",").filter(Boolean); // e.g. --sizes phone320,tablet
const BUILD = path.join(ROOT, "out");

// slug -> the start of the home card button's aria-label
const CARDS = {
  farmbooks: "FarmBooks",
  "nwks-encounter": "NWKS Encounter",
  "hays-academy": "Hays Academy",
  "duffer-golf": "Duffer Golf",
  "hg-oil": "HG Oil",
};
const IPHONE = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
const IPAD = "Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
// name -> [context, where the line goes in the client file]. The window picks, per variant, the capture whose
// width is closest to the frame's render width, so each frame size the site reflows at gets its own.
const DEVICES = {
  phone: [{ viewport: { width: 402, height: 874 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: IPHONE }, "phone.first"],
  phone320: [{ viewport: { width: 320, height: 568 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: IPHONE }, "phone.firstAt"],
  desk: [{ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.25 }, "desk.first"],
  tablet: [{ viewport: { width: 820, height: 1180 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: IPAD }, "desk.firstAt"],
};
// After "Live": the 350 ms cross-fade, then the shot. This is what the visitor sees the moment the live site
// has taken over (Live already waited out each site's preloader, `revealMs`). Later would show the end of a
// site's own entrance (Hays's products drop in ~1.3 s after ready on desktop), which the loading still must
// NOT hold, or the handover takes them away and they fall in again.
const SETTLE_MS = 450;

if (!fs.existsSync(path.join(BUILD, "index.html"))) throw new Error("no out/index.html: run npm run build first");
const browser = await chromium.launch();
const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "America/Chicago" });
try {
  for (const [slug, label] of Object.entries(CARDS)) {
    if (ONLY.length && !ONLY.includes(slug)) continue;
    for (const [dev, [opts, where]] of Object.entries(DEVICES)) {
      if (SIZES.length && !SIZES.includes(dev)) continue;
      const ctx = await browser.newContext({ ...opts, reducedMotion: "no-preference" });
      try {
        await serveAsProdOrigin(ctx, BUILD);
        const page = await ctx.newPage();
        await page.goto(`${PROD_ORIGIN}/`, { waitUntil: "load" });
        await page.addStyleTag({ content: "html { scroll-behavior: auto !important; }" });
        const sel = `button.ps-work-card__toggle[aria-label^="${label}"]`;
        await page.waitForFunction((s) => {
          const el = document.querySelector(s);
          return !!el && Object.keys(el).some((k) => k.startsWith("__react"));
        }, sel, { timeout: 90000 });
        await page.evaluate((s) => document.querySelector(s).scrollIntoView({ block: "center", inline: "center", behavior: "instant" }), sel);
        await page.waitForTimeout(1500);
        const b = await page.locator(sel).boundingBox();
        if (opts.hasTouch) await page.touchscreen.tap(b.x + b.width / 2, b.y + b.height / 2);
        else await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2);
        await page.waitForSelector('.sc-web[data-state="live"]', { timeout: 20000 });
        await page.waitForTimeout(SETTLE_MS);
        const view = page.locator(".sc-web__view").first();
        const box = await view.boundingBox();
        const png = await view.screenshot({ animations: "allow" });
        const webp = await sharp(png).webp({ quality: 82 }).toBuffer();
        const hash = crypto.createHash("sha256").update(webp).digest("hex").slice(0, 8);
        const name = `${slug}-site-${dev}-live-${hash}.webp`;
        fs.writeFileSync(path.join(OUT_DIR, name), webp);
        const w = Math.round(box.width);
        const h = Math.round(box.height);
        // edge: the per-channel median colour 24-30 css px above the bottom, which a taller frame fades the picture
        // into and fills with (WebsiteBeat `band`; the last rows are the frame's own rounded corners).
        const dpr = opts.deviceScaleFactor;
        const meta = await sharp(png).metadata();
        const rows = Math.round(6 * dpr);
        const strip = await sharp(png).extract({ left: 0, top: meta.height - Math.round(24 * dpr) - rows, width: meta.width, height: rows }).removeAlpha().raw().toBuffer();
        const chan = [[], [], []];
        for (let i = 0; i < strip.length; i += 3) for (let c = 0; c < 3; c++) chan[c].push(strip[i + c]);
        const edge = "#" + chan.map((v) => v.sort((x, y) => x - y)[v.length >> 1].toString(16).padStart(2, "0")).join("");
        console.log(`${slug} ${dev} ${where}: { src: "/images/showcase/${name}", width: ${w}, height: ${h}, edge: "${edge}", captured: "Captured ${today}" }  (${webp.length} bytes)`);
      } finally {
        await ctx.close();
      }
    }
  }
} finally {
  await browser.close();
}
