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
