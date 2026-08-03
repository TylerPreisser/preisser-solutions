#!/usr/bin/env node
// Phase 4 SEO validator — per AI-native SEO upgrade directive §9.1.
// Verifies AI-discoverability root files, sitemap completeness, and per-page
// SEO requirements (title, meta description length, canonical, h1, JSON-LD,
// internal /contact link). Exits non-zero on any failure.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(PROJECT_ROOT, "out");
const PUBLIC_DIR = path.join(PROJECT_ROOT, "public");

const errors = [];
const passes = [];

function pass(msg) {
  passes.push(msg);
  console.log(`✅ ${msg}`);
}
function fail(msg) {
  errors.push(msg);
  console.log(`❌ ${msg}`);
}

// ---------------------------------------------------------------------------
// 1. AI-discoverability root files (public/)
// ---------------------------------------------------------------------------
const ROOT_FILES = [
  "llms.txt",
  "llms-full.txt",
  "robots.txt",
  "ai.txt",
];

for (const file of ROOT_FILES) {
  const p = path.join(PUBLIC_DIR, file);
  if (!fs.existsSync(p)) {
    fail(`public/${file} missing`);
    continue;
  }
  const content = fs.readFileSync(p, "utf8");
  if (content.length < 100) {
    fail(`public/${file} too short (${content.length} chars; expected >100)`);
    continue;
  }
  pass(`public/${file} exists (${content.length} chars)`);
}

// ---------------------------------------------------------------------------
// 2. Sitemap — must contain every required route
// ---------------------------------------------------------------------------
const REQUIRED_ROUTES = [
  "/",
  "/about",
  "/contact",
  "/case-studies",
  "/services/custom-websites",
  "/services/local-seo",
  "/services/ai-search-optimization",
  "/services/ai-automation",
  "/business-automation",
  "/web-applications",
  "/locations/hays-kansas",
  "/locations/hays-kansas-web-design",
  "/services/seo-hays-ks",
  "/services/local-seo-hays-ks",
  "/services/ai-automation-hays-ks",
  "/services/ai-consulting-hays-ks",
  "/services/custom-ai-agents-hays-ks",
  "/locations/western-kansas-web-design",
  "/use-cases/ai-invoice-processing-small-business",
  "/industries/hvac-ai-receptionist",
];

const sitemapCandidates = [
  path.join(OUT_DIR, "sitemap.xml"),
  path.join(PUBLIC_DIR, "sitemap.xml"),
];
let sitemapPath = sitemapCandidates.find((p) => fs.existsSync(p));
let sitemap = "";
if (!sitemapPath) {
  fail("sitemap.xml not found in out/ or public/");
} else {
  sitemap = fs.readFileSync(sitemapPath, "utf8");
  pass(`sitemap.xml found at ${path.relative(PROJECT_ROOT, sitemapPath)}`);
  for (const route of REQUIRED_ROUTES) {
    // Match either "<loc>https://example.com/route</loc>" or "<loc>https://example.com</loc>" for /
    const needle = route === "/" ? "</loc>" : `${route}</loc>`;
    if (route === "/") {
      // Special case: home page might appear as "https://preissersolutions.com</loc>" or with trailing slash
      const homeRegex = /<loc>https?:\/\/[^/]+\/?<\/loc>/;
      if (homeRegex.test(sitemap)) {
        pass(`sitemap includes / (home)`);
      } else {
        fail(`sitemap missing home route /`);
      }
    } else if (sitemap.includes(needle)) {
      pass(`sitemap includes ${route}`);
    } else {
      fail(`sitemap missing route ${route}`);
    }
  }
}

// ---------------------------------------------------------------------------
// 3. Per-route HTML validation
// ---------------------------------------------------------------------------
function htmlPathForRoute(route) {
  if (route === "/") {
    return path.join(OUT_DIR, "index.html");
  }
  const trimmed = route.replace(/^\//, "");
  // Project emits FLAT HTML (e.g. out/locations/hays-kansas.html), so check
  // flat form first; fall back to nested index.html.
  const flat = path.join(OUT_DIR, `${trimmed}.html`);
  if (fs.existsSync(flat)) return flat;
  const nested = path.join(OUT_DIR, trimmed, "index.html");
  if (fs.existsSync(nested)) return nested;
  return null;
}

for (const route of REQUIRED_ROUTES) {
  const htmlPath = htmlPathForRoute(route);
  if (!htmlPath) {
    fail(`HTML missing for ${route} (checked flat + nested forms in out/)`);
    continue;
  }
  const html = fs.readFileSync(htmlPath, "utf8");
  const rel = path.relative(PROJECT_ROOT, htmlPath);

  // <title>
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) {
    fail(`${rel}: missing <title> content`);
  } else {
    pass(`${rel}: <title> ok (${titleMatch[1].trim().length} chars)`);
  }

  // <meta name="description">
  const descMatch = html.match(
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i,
  );
  if (!descMatch) {
    fail(`${rel}: missing <meta name="description">`);
  } else {
    const len = descMatch[1].length;
    if (len < 80 || len > 170) {
      fail(`${rel}: meta description out of range (${len} chars; want 80-170)`);
    } else {
      pass(`${rel}: meta description ok (${len} chars)`);
    }
  }

  // <link rel="canonical">
  if (!/<link[^>]+rel=["']canonical["']/i.test(html)) {
    fail(`${rel}: missing <link rel="canonical">`);
  } else {
    pass(`${rel}: canonical ok`);
  }

  // <h1>
  if (!/<h1[\s>]/i.test(html)) {
    fail(`${rel}: missing <h1>`);
  } else {
    pass(`${rel}: <h1> ok`);
  }

  // application/ld+json
  if (!/<script[^>]+type=["']application\/ld\+json["']/i.test(html)) {
    fail(`${rel}: missing application/ld+json script`);
  } else {
    pass(`${rel}: JSON-LD ok`);
  }

  // href="/contact" (skip for /contact itself)
  if (route !== "/contact") {
    // Accept /contact alone or with query string, fragment, or trailing path.
    if (!/href=["']\/contact(?:["'?#/])/i.test(html)) {
      fail(`${rel}: missing internal link to /contact`);
    } else {
      pass(`${rel}: /contact link ok`);
    }
  }
}

// ---------------------------------------------------------------------------
// 4. Whole-corpus gates (added 2026-08-03)
//
// Everything above checks 19 hand-listed routes. That let real, site-wide
// defects through: dead internal links, and <title> tags carrying the brand
// twice because 160 source files end their own title with "| Preisser
// Solutions" while layout.tsx appends it again via title.template.
//
// The budgets below are RATCHETS, not targets. Each is set to the count that
// existed when the gate was introduced, so the build passes today and fails the
// moment the number goes UP. When you fix pages, LOWER the number in the same
// commit — that is what makes the fix permanent. If you legitimately add pages
// that raise a count, raise the budget in the same commit and say why.
// ---------------------------------------------------------------------------
const BUDGETS = {
  // <title> containing "Preisser Solutions" more than once — the doubled-brand
  // bug described in docs/plans/2026-08-02-three-pillar-reposition.md §10b
  // (source titles ended with the brand AND layout.tsx's title.template
  // appended it again). It was 110 pages earlier on 2026-08-03 and is now 0.
  // This gate is what keeps it at 0: it is a clean state, so never raise this.
  doubledBrandTitles: 0,
  // Titles over ~60 chars get truncated in Google's SERP. Was 162 before the
  // doubled-brand fix, now 18 — the remainder are genuinely long titles that
  // need editorial shortening, not a mechanical fix. Lower as they are fixed.
  longTitles: 17,
  // Two distinct URLs sharing one <title> compete with each other for the same
  // query. Was 2, now 0. Clean state — never raise this.
  duplicateTitleGroups: 0,
  // Internal links pointing at a URL that 301s. Not fatal, but every one is a
  // wasted crawl hop and a diluted internal-link signal. All 83 are literal
  // href strings in src/data/aeo/**; six distinct stale targets account for
  // nearly all of them. Target: 0.
  linksToRedirects: 7,
};

function walkHtml(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(p, acc);
    else if (entry.name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

if (fs.existsSync(OUT_DIR)) {
  const htmlFiles = walkHtml(OUT_DIR);

  // Every path the deploy can actually serve: built pages + static assets.
  const servable = new Set();
  (function walkAll(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) walkAll(p);
      else {
        const rel = "/" + path.relative(OUT_DIR, p).split(path.sep).join("/");
        servable.add(rel);
        if (rel.endsWith("/index.html")) servable.add(rel.slice(0, -"/index.html".length) || "/");
        else if (rel.endsWith(".html")) servable.add(rel.slice(0, -".html".length));
      }
    }
  })(OUT_DIR);
  servable.add("/");

  // Redirect sources, so a link to a 301 is reported as a redirect (not broken).
  const redirectSources = new Set();
  const redirectPrefixes = [];
  const redirectsFile = path.join(PUBLIC_DIR, "_redirects");
  if (fs.existsSync(redirectsFile)) {
    for (const raw of fs.readFileSync(redirectsFile, "utf8").split("\n")) {
      const line = raw.trim();
      if (!line || line.startsWith("#")) continue;
      const [from] = line.split(/\s+/);
      if (!from || !from.startsWith("/")) continue;
      if (from.includes("*")) {
        const prefix = from.slice(0, from.indexOf("*"));
        if (prefix.length > 1) redirectPrefixes.push(prefix);
      } else {
        redirectSources.add(from.length > 1 && from.endsWith("/") ? from.slice(0, -1) : from);
      }
    }
  }
  const isRedirected = (p) =>
    redirectSources.has(p) || redirectPrefixes.some((prefix) => p.startsWith(prefix));

  const brokenLinks = [];
  const redirectLinks = [];
  const titleOwners = new Map();
  const doubledBrand = [];
  const longTitles = [];
  const SKIP_HREF = /^(https?:|mailto:|tel:|#|javascript:|data:)/i;

  for (const file of htmlFiles) {
    const rel = "/" + path.relative(OUT_DIR, file).split(path.sep).join("/");
    const route = rel === "/index.html" ? "/" : rel.replace(/\.html$/, "");
    const html = fs.readFileSync(file, "utf8");

    const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "").trim();
    if (title && route !== "/404") {
      if (!titleOwners.has(title)) titleOwners.set(title, []);
      titleOwners.get(title).push(route);
      if ((title.match(/Preisser Solutions/gi) || []).length > 1) doubledBrand.push({ route, title });
      if (title.length > 60) longTitles.push({ route, title, len: title.length });
    }

    for (const m of html.matchAll(/href\s*=\s*["']([^"']+)["']/gi)) {
      const raw = m[1].trim();
      if (!raw || SKIP_HREF.test(raw)) continue;
      let target = raw.split("#")[0].split("?")[0];
      if (!target) continue;
      if (!target.startsWith("/")) continue; // relative links are rare here; skip
      if (target.startsWith("/_next/")) continue;
      const bare = target.length > 1 && target.endsWith("/") ? target.slice(0, -1) : target;
      if (isRedirected(bare)) {
        redirectLinks.push({ file: rel, href: raw });
      } else if (!servable.has(bare) && !servable.has(target)) {
        brokenLinks.push({ file: rel, href: raw });
      }
    }
  }

  const duplicateTitleGroups = [...titleOwners.entries()].filter(([, v]) => v.length > 1);

  // -- broken internal links: hard gate, no budget ---------------------------
  if (brokenLinks.length === 0) {
    pass(`no broken internal links across ${htmlFiles.length} built pages`);
  } else {
    fail(`${brokenLinks.length} broken internal link(s) — every one is a 404 for a crawler:`);
    for (const b of brokenLinks.slice(0, 25)) console.log(`     ${b.file} -> ${b.href}`);
  }

  // -- ratcheted budgets -----------------------------------------------------
  const ratchets = [
    ["doubledBrandTitles", doubledBrand.length, doubledBrand.map((d) => `${d.route} :: ${d.title}`)],
    ["longTitles", longTitles.length, longTitles.map((d) => `${d.route} (${d.len}) :: ${d.title}`)],
    ["duplicateTitleGroups", duplicateTitleGroups.length,
      duplicateTitleGroups.map(([t, routes]) => `"${t}" <- ${routes.join(", ")}`)],
    ["linksToRedirects", redirectLinks.length, redirectLinks.map((r) => `${r.file} -> ${r.href}`)],
  ];

  for (const [name, actual, details] of ratchets) {
    const budget = BUDGETS[name];
    if (actual > budget) {
      fail(`${name}: ${actual} exceeds budget ${budget}. Fix the new offenders, or raise BUDGETS.${name} in scripts/validate-seo.mjs and justify it.`);
      for (const d of details.slice(0, 15)) console.log(`     ${d}`);
      if (details.length > 15) console.log(`     … and ${details.length - 15} more`);
    } else if (actual < budget) {
      pass(`${name}: ${actual} (budget ${budget}) — improved; LOWER BUDGETS.${name} to ${actual} to lock this in.`);
    } else {
      pass(`${name}: ${actual} (at budget)`);
    }
  }
}

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------
console.log("");
console.log("---------------------------------------------------------------");
console.log(`Checks passed: ${passes.length}`);
console.log(`Checks failed: ${errors.length}`);
console.log("---------------------------------------------------------------");

if (errors.length > 0) {
  console.log("");
  console.log("Errors:");
  for (const e of errors) {
    console.log(`  ❌ ${e}`);
  }
  console.log("");
  console.log("❌ SEO validation failed");
  process.exit(1);
} else {
  console.log("✅ SEO validation completed");
  process.exit(0);
}
