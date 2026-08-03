#!/usr/bin/env node
/**
 * TEMPORARY design-loop harness — screenshots the hero only, from `next dev`.
 * Deleted before hand-off; the durable check is scripts/ui-audit.mjs.
 */
import { chromium } from '@playwright/test';
import fs from 'node:fs';

const BASE = process.env.HERO_BASE || 'http://localhost:3000';
const OUT = '/private/tmp/claude-501/-Users-tylerpreisser-Desktop-Farm-Invoice-Processing-System/0e7f6e91-2712-4987-aaad-2962b3fe4b6d/scratchpad/hero';
fs.mkdirSync(OUT, { recursive: true });

const tag = process.argv[2] || 'v';

const CASES = [
  { name: 'desktop-dark',    w: 1440, h: 900, theme: 'dark',  rm: false },
  { name: 'desktop-light',   w: 1440, h: 900, theme: 'light', rm: false },
  { name: 'mobile-dark',     w: 375,  h: 667, theme: 'dark',  rm: false },
  { name: 'mobile-light',    w: 375,  h: 667, theme: 'light', rm: false },
  { name: 'desktop-dark-rm', w: 1440, h: 900, theme: 'dark',  rm: true  },
];

const browser = await chromium.launch();
for (const c of CASES) {
  const ctx = await browser.newContext({
    viewport: { width: c.w, height: c.h },
    deviceScaleFactor: 1,
    reducedMotion: c.rm ? 'reduce' : 'no-preference',
    colorScheme: c.theme === 'light' ? 'light' : 'dark',
  });
  const page = await ctx.newPage();
  await page.addInitScript((theme) => {
    try { localStorage.setItem('theme', theme); } catch {}
    document.documentElement.setAttribute('data-theme', theme);
  }, c.theme);
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.evaluate((theme) => document.documentElement.setAttribute('data-theme', theme), c.theme);
  await page.waitForTimeout(c.rm ? 700 : 5200);
  await page.screenshot({ path: `${OUT}/${tag}-${c.name}.png`, clip: { x: 0, y: 0, width: c.w, height: c.h } });
  await ctx.close();
}

// Frame pacing on the desktop dark case.
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
const pacing = await page.evaluate(() => new Promise((res) => {
  const gaps = []; let last = 0; let n = 0;
  const tick = (ts) => {
    if (last) gaps.push(ts - last);
    last = ts;
    if (++n < 200) requestAnimationFrame(tick);
    else { gaps.sort((a, b) => a - b); res({ median: +gaps[gaps.length >> 1].toFixed(2), p95: +gaps[Math.floor(gaps.length * 0.95)].toFixed(2), n: gaps.length }); }
  };
  requestAnimationFrame(tick);
}));
console.log('frame pacing (headless chromium, 1440x900 @dpr2):', JSON.stringify(pacing));
await browser.close();
console.log('wrote', OUT, tag);
