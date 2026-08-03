import { chromium } from '@playwright/test';
import fs from 'node:fs';
const OUT = '/private/tmp/claude-501/-Users-tylerpreisser-Desktop-Farm-Invoice-Processing-System/0e7f6e91-2712-4987-aaad-2962b3fe4b6d/scratchpad/hero';
fs.mkdirSync(OUT, { recursive: true });
const tag = process.argv[2] || 's';
const theme = process.argv[3] || 'dark';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: theme });
const page = await ctx.newPage();
await page.addInitScript((t) => { try { localStorage.setItem('theme', t); } catch {} document.documentElement.setAttribute('data-theme', t); }, theme);
await page.goto('http://localhost:3111', { waitUntil: 'networkidle' });
await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme);
let prev = 0;
for (const s of [2, 9, 17, 25, 33]) {
  await page.waitForTimeout((s - prev) * 1000); prev = s;
  await page.screenshot({ path: `${OUT}/${tag}-${theme}-t${s}.png`, clip: { x: 620, y: 0, width: 820, height: 900 } });
}
await b.close();
console.log('series done');
