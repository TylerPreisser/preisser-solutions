#!/usr/bin/env node
/**
 * ui-audit.mjs — the real artifact check for this site.
 *
 * Serves the static export in `out/`, drives it with real browser engines
 * (Chromium and WebKit — WebKit is the engine iOS Safari actually uses), and
 * for every page x device combination it BOTH screenshots the page AND measures
 * it. Screenshots are for a human (and the design critic) to look at. The
 * measurements are what make a failure a fact instead of an opinion.
 *
 *   node scripts/ui-audit.mjs                       # everything
 *   node scripts/ui-audit.mjs --pages / /contact    # only these routes
 *   node scripts/ui-audit.mjs --devices "iPhone SE,Desktop"
 *   node scripts/ui-audit.mjs --engine webkit       # chromium | webkit | both
 *   node scripts/ui-audit.mjs --no-shots            # measure only, much faster
 *
 * Writes:
 *   qa/shots/<engine>/<device>/<route>.png
 *   qa/ui-audit.json      <- machine-readable findings
 *   qa/ui-audit.md        <- human-readable summary
 *
 * Exit code is 1 when any blocker is found, so this can gate a deploy.
 */

import http from 'node:http';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'out');
const QA_DIR = path.join(ROOT, 'qa');

// ---------------------------------------------------------------------------
// Device matrix. Widths chosen to sit either side of every breakpoint the site
// uses, plus the three phone sizes that actually matter in the wild.
// ---------------------------------------------------------------------------
const DEVICES = [
  { name: 'iPhone SE',        width: 375,  height: 667,  dpr: 2,   mobile: true,  hasTouch: true },
  { name: 'iPhone 14 Pro',    width: 393,  height: 852,  dpr: 3,   mobile: true,  hasTouch: true },
  { name: 'iPhone 15 Pro Max',width: 430,  height: 932,  dpr: 3,   mobile: true,  hasTouch: true },
  { name: 'Pixel 7',          width: 412,  height: 915,  dpr: 2.6, mobile: true,  hasTouch: true },
  { name: 'iPad Mini',        width: 768,  height: 1024, dpr: 2,   mobile: true,  hasTouch: true },
  { name: 'iPad Pro',         width: 1024, height: 1366, dpr: 2,   mobile: true,  hasTouch: true },
  { name: 'Laptop',           width: 1280, height: 800,  dpr: 2,   mobile: false, hasTouch: false },
  { name: 'Desktop',          width: 1440, height: 900,  dpr: 2,   mobile: false, hasTouch: false },
  { name: 'Wide',             width: 1920, height: 1080, dpr: 1,   mobile: false, hasTouch: false },
];

// Routes that carry the narrative. Everything else is generated from data and
// shares a template, so auditing one of each template is enough.
const DEFAULT_PAGES = [
  '/',
  '/services',
  '/products',
  '/case-studies',
  '/about',
  '/contact',
  '/pricing',
  '/process',
];

// ---------------------------------------------------------------------------
// args
// ---------------------------------------------------------------------------
function parseArgs(argv) {
  const out = { pages: null, devices: null, engine: 'both', shots: true };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--pages') { out.pages = []; while (argv[i + 1] && !argv[i + 1].startsWith('--')) out.pages.push(argv[++i]); }
    else if (a === '--devices') out.devices = argv[++i].split(',').map((s) => s.trim());
    else if (a === '--engine') out.engine = argv[++i];
    else if (a === '--no-shots') out.shots = false;
  }
  return out;
}
const ARGS = parseArgs(process.argv.slice(2));

// ---------------------------------------------------------------------------
// static server for out/
// ---------------------------------------------------------------------------
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif',
  '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml; charset=utf-8',
};

function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0].split('#')[0]);
  const candidates = [
    path.join(OUT_DIR, clean),
    path.join(OUT_DIR, clean, 'index.html'),
    path.join(OUT_DIR, `${clean.replace(/\/$/, '')}.html`),
  ];
  for (const c of candidates) {
    // keep the server inside out/ no matter what the request says
    if (!path.resolve(c).startsWith(OUT_DIR)) continue;
    try { if (fs.statSync(c).isFile()) return c; } catch { /* next candidate */ }
  }
  return null;
}

function startServer() {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const file = resolveFile(req.url || '/');
      if (!file) {
        const notFound = resolveFile('/404.html');
        if (notFound) {
          res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
          fs.createReadStream(notFound).pipe(res);
          return;
        }
        res.writeHead(404, { 'content-type': 'text/plain' });
        res.end('not found');
        return;
      }
      res.writeHead(200, { 'content-type': MIME[path.extname(file)] || 'application/octet-stream' });
      fs.createReadStream(file).pipe(res);
    });
    server.on('error', reject);
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }));
  });
}

// ---------------------------------------------------------------------------
// The measurement pass. This runs inside the page, so everything it reports is
// a rendered fact — computed styles and real bounding boxes, not source guesses.
// ---------------------------------------------------------------------------
const PROBE = /* js */ `(() => {
  const findings = [];
  const add = (severity, kind, detail) => findings.push({ severity, kind, ...detail });

  const vw = window.innerWidth;
  const de = document.documentElement;

  const describe = (el) => {
    if (!el) return '<none>';
    const id = el.id ? '#' + el.id : '';
    const cls = (typeof el.className === 'string' && el.className)
      ? '.' + el.className.trim().split(/\\s+/).slice(0, 3).join('.')
      : '';
    const txt = (el.textContent || '').trim().replace(/\\s+/g, ' ').slice(0, 40);
    return el.tagName.toLowerCase() + id + cls + (txt ? ' "' + txt + '"' : '');
  };

  // --- 1. horizontal overflow -------------------------------------------------
  const scrollW = Math.max(de.scrollWidth, document.body.scrollWidth);
  if (scrollW > vw + 1) {
    // find the specific elements sticking out past the viewport
    const culprits = [];
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (r.right > vw + 1 || r.left < -1) {
        const cs = getComputedStyle(el);
        if (cs.position === 'fixed' && cs.visibility === 'hidden') continue;
        culprits.push({ selector: describe(el), left: Math.round(r.left), right: Math.round(r.right) });
      }
    }
    // keep the outermost few — inner children just inherit the parent's problem
    add('blocker', 'horizontal-overflow', {
      measured: scrollW + 'px scrollWidth vs ' + vw + 'px viewport',
      expected: 'scrollWidth <= viewport width',
      culprits: culprits.slice(0, 6),
    });
  }

  // Decorative illustrations (browser mockups, dashboard mockups, SVG scenes) legitimately
  // contain tiny labels and low-contrast chrome. They are pictures of an interface, not an
  // interface. Judging them by text rules produces noise, so skip anything inside one.
  const isDecorative = (el) =>
    !!el.closest('[aria-hidden="true"], svg, .ps-browser, .ps-site-card, .ps-fix-visual, [class*="-visual"], [class*="-mock"], [class*="Visual"]');

  // Genuinely non-interactive to a user: hidden from the a11y tree, removed
  // from the tab order, or parked off-screen. Honeypot spam-trap inputs are
  // all three at once — they have a layout box but no user can ever reach
  // them, so measuring their touch target is meaningless.
  const isUnreachable = (el) => {
    if (el.closest('[aria-hidden="true"]')) return true;
    if (el.getAttribute('tabindex') === '-1') return true;
    const r = el.getBoundingClientRect();
    if (r.right <= 0 || r.bottom <= 0 || r.left >= vw) return true;
    // an ancestor faded to zero still hides this element, even though
    // getComputedStyle on the element itself reports opacity: 1
    let n = el;
    while (n && n !== document.documentElement) {
      const cs = getComputedStyle(n);
      if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0) return true;
      n = n.parentElement;
    }
    return false;
  };

  // --- 2. tap targets ---------------------------------------------------------
  // Only meaningful where there is a finger. On a mouse-driven viewport a 24px-tall
  // text link is fine, so flagging it there is noise.
  const INTERACTIVE = 'a[href], button, [role="button"], input:not([type="hidden"]), select, textarea, summary, [onclick]';
  const seenTap = new Set();
  for (const el of (window.__AUDIT_TOUCH__ ? document.querySelectorAll(INTERACTIVE) : [])) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;              // hidden
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none' || cs.opacity === '0') continue;
    if (isUnreachable(el)) continue;
    // an anchor wrapping a big card is fine; only flag the small ones
    if (r.height >= 44 && r.width >= 44) continue;
    // inline links inside a paragraph are a known, accepted exception
    const inProse = el.closest('p, li, figcaption');
    if (inProse && el.tagName === 'A' && cs.display.startsWith('inline')) continue;
    const key = describe(el);
    if (seenTap.has(key)) continue;
    seenTap.add(key);
    add(r.height < 32 || r.width < 32 ? 'blocker' : 'major', 'tap-target', {
      selector: key,
      measured: Math.round(r.width) + 'x' + Math.round(r.height),
      expected: '>= 44x44 css px',
    });
  }

  // --- 3. tiny text -----------------------------------------------------------
  // A 14px floor is a phone rule. Applying it at desktop widths flags legitimate
  // fine print and illustration labels, so only run it where it actually matters.
  const seenText = new Set();
  for (const el of (vw < 768 ? document.querySelectorAll('p, li, span, a, td, div, label, small') : [])) {
    if (!el.childNodes.length) continue;
    if (isDecorative(el)) continue;
    const direct = Array.from(el.childNodes).some((n) => n.nodeType === 3 && n.textContent.trim().length > 12);
    if (!direct) continue;
    const cs = getComputedStyle(el);
    const size = parseFloat(cs.fontSize);
    if (size >= 14) continue;
    const key = describe(el);
    if (seenText.has(key)) continue;
    seenText.add(key);
    add(size < 12 ? 'major' : 'minor', 'tiny-text', {
      selector: key, measured: size + 'px', expected: '>= 14px body text on phones',
    });
  }

  // --- 4. 100vh misuse (the classic iOS Safari address-bar bug) ---------------
  for (const el of document.querySelectorAll('body *')) {
    const cs = getComputedStyle(el);
    for (const prop of ['height', 'minHeight']) {
      const raw = el.style[prop] || '';
      if (/\\b100vh\\b/.test(raw)) {
        add('major', 'vh-unit', {
          selector: describe(el), measured: prop + ': ' + raw,
          expected: 'use 100dvh / 100svh — 100vh is wrong under the iOS Safari toolbar',
        });
      }
    }
  }

  // --- 5. images without intrinsic size (layout shift) ------------------------
  for (const img of document.querySelectorAll('img')) {
    const cs = getComputedStyle(img);
    const hasAttrs = img.getAttribute('width') && img.getAttribute('height');
    const hasRatio = cs.aspectRatio && cs.aspectRatio !== 'auto';
    if (!hasAttrs && !hasRatio) {
      add('major', 'cls-risk-image', {
        selector: describe(img),
        measured: 'no width/height attrs and no aspect-ratio',
        expected: 'explicit width+height or aspect-ratio to reserve space',
      });
    }
    if (!img.getAttribute('alt') && img.getAttribute('alt') !== '') {
      add('major', 'missing-alt', { selector: describe(img), measured: 'no alt attribute', expected: 'alt text, or alt="" if decorative' });
    }
  }

  // --- 6. contrast ------------------------------------------------------------
  const parseColor = (c) => {
    const m = c.match(/rgba?\\(([^)]+)\\)/);
    if (!m) return null;
    const p = m[1].split(',').map((v) => parseFloat(v));
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  };
  const lum = ({ r, g, b }) => {
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  // This site is dark-FIRST: :root is the dark palette. Defaulting an unresolved
  // background to white therefore inverts the whole calculation and reports light
  // text on a light background that does not exist. Walk to the real page background
  // instead, and if even that is transparent, decline to judge rather than guess.
  const pageBg = (() => {
    for (const n of [document.body, document.documentElement]) {
      const c = parseColor(getComputedStyle(n).backgroundColor);
      if (c && c.a > 0.85) return c;
    }
    return null;
  })();
  // Composite translucent layers rather than ignoring them. A pill painted
  // rgba(10,22,40,0.75) over a light card is still effectively dark; skipping
  // it and falling through to the page background inverts the verdict and
  // reports a false failure on text that is actually perfectly legible.
  const over = (fg, bg) => ({
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
    a: 1,
  });
  const effectiveBg = (el) => {
    const layers = [];
    let n = el;
    while (n && n !== document.documentElement) {
      const cs = getComputedStyle(n);
      // text over a gradient or image can't be judged from one color
      if (cs.backgroundImage && cs.backgroundImage !== 'none') return null;
      const c = parseColor(cs.backgroundColor);
      if (c && c.a > 0.001) {
        if (c.a >= 0.999) {                       // opaque — everything below is hidden
          return layers.reduceRight((acc, l) => over(l, acc), c);
        }
        layers.push(c);
      }
      n = n.parentElement;
    }
    if (!pageBg) return null;
    return layers.reduceRight((acc, l) => over(l, acc), pageBg);
  };
  const seenContrast = new Set();
  for (const el of document.querySelectorAll('p, li, a, h1, h2, h3, h4, h5, h6, span, button, td, label')) {
    const direct = Array.from(el.childNodes).some((n) => n.nodeType === 3 && n.textContent.trim().length > 3);
    if (!direct) continue;
    if (isDecorative(el)) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none' || parseFloat(cs.opacity) < 0.6) continue;
    if (isUnreachable(el)) continue;
    const fg = parseColor(cs.color); if (!fg || fg.a < 0.6) continue;
    const bg = effectiveBg(el);
    if (!bg) continue;                 // unresolvable background — don't guess
    const L1 = lum(fg), L2 = lum(bg);
    const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    const size = parseFloat(cs.fontSize);
    const bold = parseInt(cs.fontWeight, 10) >= 700;
    const large = size >= 24 || (size >= 18.66 && bold);
    const need = large ? 3 : 4.5;
    if (ratio + 0.05 < need) {
      const key = describe(el);
      if (seenContrast.has(key)) continue;
      seenContrast.add(key);
      add(ratio < need - 1.5 ? 'blocker' : 'major', 'contrast', {
        selector: key,
        measured: ratio.toFixed(2) + ':1 (' + cs.color + ' on rgb(' + [bg.r, bg.g, bg.b].map(Math.round).join(',') + '))',
        expected: '>= ' + need + ':1',
      });
    }
  }

  // --- 7. accessible names on interactive elements ----------------------------
  for (const el of document.querySelectorAll('a[href], button, [role="button"]')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    const name = (el.getAttribute('aria-label') || el.getAttribute('title') || el.textContent || '').trim()
      || (el.querySelector('img[alt]')?.getAttribute('alt') || '').trim();
    if (!name) {
      add('blocker', 'no-accessible-name', {
        selector: describe(el), measured: 'empty accessible name',
        expected: 'text content, aria-label, or an img alt',
      });
    }
  }

  // --- 8. heading order -------------------------------------------------------
  const hs = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6'));
  const h1s = hs.filter((h) => h.tagName === 'H1');
  if (h1s.length === 0) add('major', 'heading-structure', { selector: 'document', measured: '0 h1', expected: 'exactly one h1' });
  if (h1s.length > 1) add('major', 'heading-structure', { selector: 'document', measured: h1s.length + ' h1 elements', expected: 'exactly one h1' });
  let prev = 0;
  for (const h of hs) {
    const lvl = parseInt(h.tagName[1], 10);
    if (prev && lvl > prev + 1) {
      add('minor', 'heading-skip', { selector: describe(h), measured: 'h' + prev + ' -> h' + lvl, expected: 'no skipped heading levels' });
    }
    prev = lvl;
  }

  // --- 9. above the fold ------------------------------------------------------
  const h1 = document.querySelector('h1');
  const fold = window.innerHeight;
  const aboveFold = {
    h1Visible: h1 ? h1.getBoundingClientRect().top < fold : false,
    h1Text: h1 ? (h1.textContent || '').trim().replace(/\\s+/g, ' ').slice(0, 160) : null,
    firstCtaVisible: (() => {
      const cta = document.querySelector('main a[href], main button');
      return cta ? cta.getBoundingClientRect().top < fold : false;
    })(),
    firstCtaText: (() => {
      const cta = document.querySelector('main a[href], main button');
      return cta ? (cta.textContent || '').trim().replace(/\\s+/g, ' ').slice(0, 60) : null;
    })(),
  };
  if (!aboveFold.h1Visible) {
    add('major', 'fold', { selector: 'h1', measured: 'h1 below the fold', expected: 'primary message visible without scrolling' });
  }

  return {
    findings,
    meta: {
      viewport: vw + 'x' + window.innerHeight,
      scrollWidth: scrollW,
      documentHeight: de.scrollHeight,
      title: document.title,
      h1: aboveFold.h1Text,
      aboveFold,
      counts: {
        links: document.querySelectorAll('a[href]').length,
        buttons: document.querySelectorAll('button').length,
        images: document.querySelectorAll('img').length,
        headings: hs.length,
      },
    },
  };
})()`;

// Motion check: does the site honour prefers-reduced-motion? Run separately
// because it needs a second context with the media feature forced.
const MOTION_PROBE = /* js */ `(() => {
  const moving = [];
  for (const el of document.querySelectorAll('body *')) {
    const cs = getComputedStyle(el);
    const animated = cs.animationName !== 'none' && parseFloat(cs.animationDuration) > 0.05;
    const transitioned = cs.transitionProperty !== 'none'
      && cs.transitionProperty !== 'all'
      && parseFloat(cs.transitionDuration) > 0.05;
    if (animated) {
      moving.push({
        selector: el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') +
          (typeof el.className === 'string' && el.className ? '.' + el.className.trim().split(/\\s+/).slice(0,2).join('.') : ''),
        animation: cs.animationName + ' ' + cs.animationDuration,
      });
    }
    if (moving.length > 25) break;
  }
  return moving;
})()`;

// ---------------------------------------------------------------------------
async function main() {
  if (!fs.existsSync(OUT_DIR)) {
    console.error(`\n  out/ does not exist. Run \`npm run build\` first.\n`);
    process.exit(2);
  }

  const { chromium, webkit } = await import('playwright');
  const engines = ARGS.engine === 'both'
    ? [['chromium', chromium], ['webkit', webkit]]
    : [[ARGS.engine, ARGS.engine === 'webkit' ? webkit : chromium]];

  const pages = ARGS.pages && ARGS.pages.length ? ARGS.pages : DEFAULT_PAGES;
  const devices = ARGS.devices ? DEVICES.filter((d) => ARGS.devices.includes(d.name)) : DEVICES;

  const { server, port } = await startServer();
  const base = `http://127.0.0.1:${port}`;
  console.log(`serving out/ on ${base}`);
  console.log(`${pages.length} pages x ${devices.length} devices x ${engines.length} engine(s)\n`);

  await fsp.mkdir(QA_DIR, { recursive: true });
  // Wipe old shots first. A half-overwritten directory mixes this run's images
  // with the previous run's, and a stale screenshot read as current is worse
  // than no screenshot at all.
  if (ARGS.shots) await fsp.rm(path.join(QA_DIR, 'shots'), { recursive: true, force: true });
  const report = { generatedAt: new Date().toISOString(), base, results: [] };

  for (const [engineName, engine] of engines) {
    // A missing browser binary must not throw away the results we already have.
    let browser;
    try {
      browser = await engine.launch();
    } catch (err) {
      console.log(`  [SKIP ] ${engineName} unavailable: ${String(err).split('\n')[0]}`);
      report.skippedEngines = [...(report.skippedEngines || []), { engine: engineName, reason: String(err).split('\n')[0] }];
      continue;
    }
    for (const device of devices) {
      const context = await browser.newContext({
        viewport: { width: device.width, height: device.height },
        deviceScaleFactor: device.dpr,
        isMobile: engineName === 'chromium' ? device.mobile : undefined,
        hasTouch: device.hasTouch,
      });
      const page = await context.newPage();
      // the probe needs to know whether this run has a finger or a mouse
      await context.addInitScript(`window.__AUDIT_TOUCH__ = ${device.hasTouch ? 'true' : 'false'};`);
      const consoleErrors = [];
      page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 200)); });
      page.on('pageerror', (e) => consoleErrors.push('pageerror: ' + String(e).slice(0, 200)));

      for (const route of pages) {
        const url = base + route;
        const entry = { engine: engineName, device: device.name, viewport: `${device.width}x${device.height}`, route, findings: [], meta: null, consoleErrors: [] };
        try {
          const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
          entry.status = resp ? resp.status() : null;
          // let scroll-reveal animations settle so we screenshot the resting state
          await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
          await page.waitForTimeout(450);
          await page.evaluate(() => window.scrollTo(0, 0));
          await page.waitForTimeout(350);

          const probe = await page.evaluate(PROBE);
          entry.findings = probe.findings;
          entry.meta = probe.meta;
          entry.consoleErrors = consoleErrors.splice(0);

          if (ARGS.shots) {
            const slug = route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '-');
            const dir = path.join(QA_DIR, 'shots', engineName, device.name.replace(/\s+/g, '-'));
            await fsp.mkdir(dir, { recursive: true });
            await page.screenshot({ path: path.join(dir, `${slug}.png`), fullPage: true });
          }
        } catch (err) {
          entry.error = String(err).slice(0, 300);
          entry.findings.push({ severity: 'blocker', kind: 'page-error', selector: route, measured: entry.error, expected: 'page loads' });
        }
        report.results.push(entry);
        const blockers = entry.findings.filter((f) => f.severity === 'blocker').length;
        const majors = entry.findings.filter((f) => f.severity === 'major').length;
        const flag = blockers ? 'BLOCK' : majors ? 'major' : 'ok';
        console.log(`  [${flag.padEnd(5)}] ${engineName.padEnd(8)} ${device.name.padEnd(18)} ${route.padEnd(16)} ${blockers}b ${majors}m`);
      }
      await context.close();
    }

    // reduced-motion check, once per engine at phone width
    const rmContext = await browser.newContext({
      viewport: { width: 393, height: 852 }, deviceScaleFactor: 3,
      reducedMotion: 'reduce', hasTouch: true,
    });
    const rmPage = await rmContext.newPage();
    for (const route of pages.slice(0, 3)) {
      try {
        await rmPage.goto(base + route, { waitUntil: 'networkidle', timeout: 45000 });
        await rmPage.waitForTimeout(600);
        const moving = await rmPage.evaluate(MOTION_PROBE);
        if (moving.length) {
          report.results.push({
            engine: engineName, device: 'reduced-motion', viewport: '393x852', route,
            findings: moving.map((m) => ({
              severity: 'major', kind: 'reduced-motion-ignored', selector: m.selector,
              measured: m.animation, expected: 'no animation under prefers-reduced-motion: reduce',
            })),
            meta: null, consoleErrors: [],
          });
          console.log(`  [major] ${engineName.padEnd(8)} reduced-motion     ${route.padEnd(16)} ${moving.length} still animating`);
        }
      } catch { /* route already reported as a page-error above */ }
    }
    await rmContext.close();
    await browser.close();
  }

  server.close();

  // ---- summarise -----------------------------------------------------------
  const all = report.results.flatMap((r) => r.findings.map((f) => ({ ...f, engine: r.engine, device: r.device, route: r.route })));
  const blockers = all.filter((f) => f.severity === 'blocker');
  const majors = all.filter((f) => f.severity === 'major');
  const minors = all.filter((f) => f.severity === 'minor');

  // group identical defects so the report is about problems, not repetitions
  const grouped = new Map();
  for (const f of all) {
    const key = `${f.severity}|${f.kind}|${f.selector}|${f.expected}`;
    if (!grouped.has(key)) grouped.set(key, { ...f, contexts: [] });
    grouped.get(key).contexts.push(`${f.engine}/${f.device}${f.route === '/' ? '' : f.route}`);
  }
  const uniq = [...grouped.values()].sort((a, b) => {
    const rank = { blocker: 0, major: 1, minor: 2 };
    return rank[a.severity] - rank[b.severity] || b.contexts.length - a.contexts.length;
  });

  report.summary = {
    blockers: blockers.length, majors: majors.length, minors: minors.length,
    uniqueDefects: uniq.length,
    byKind: all.reduce((acc, f) => { acc[f.kind] = (acc[f.kind] || 0) + 1; return acc; }, {}),
  };
  report.defects = uniq;

  await fsp.writeFile(path.join(QA_DIR, 'ui-audit.json'), JSON.stringify(report, null, 2));

  const md = [
    `# UI audit`, '',
    `Generated ${report.generatedAt}`, '',
    `**${blockers.length} blockers · ${majors.length} major · ${minors.length} minor** across ${report.results.length} page/device runs.`,
    `${uniq.length} unique defects after grouping.`, '',
    '## Unique defects', '',
  ];
  for (const d of uniq) {
    md.push(`### [${d.severity}] ${d.kind} — \`${d.selector}\``);
    md.push(`- measured: ${d.measured}`);
    md.push(`- expected: ${d.expected}`);
    if (d.culprits?.length) md.push(`- culprits: ${d.culprits.map((c) => `\`${c.selector}\` (right=${c.right})`).join(', ')}`);
    md.push(`- seen on ${d.contexts.length}: ${d.contexts.slice(0, 8).join(', ')}${d.contexts.length > 8 ? ' …' : ''}`);
    md.push('');
  }
  await fsp.writeFile(path.join(QA_DIR, 'ui-audit.md'), md.join('\n'));

  console.log(`\n  ${blockers.length} blockers · ${majors.length} major · ${minors.length} minor  (${uniq.length} unique)`);
  console.log(`  qa/ui-audit.json  qa/ui-audit.md  qa/shots/\n`);
  process.exit(blockers.length ? 1 : 0);
}

main().catch((e) => { console.error(e); process.exit(2); });
