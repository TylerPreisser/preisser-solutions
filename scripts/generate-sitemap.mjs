#!/usr/bin/env node

import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const OUT_DIR = path.resolve("out");
const SITE_ORIGIN = "https://preissersolutions.com";
const PUBLIC_DIR = path.resolve("public");
const SCRIPTS_DIR = path.resolve("scripts");
const REDIRECTS_FILE = path.join(PUBLIC_DIR, "_redirects");
// Per-URL content fingerprints + the date each URL's content last changed.
// Committed to the repo so <lastmod> survives CI rebuilds. See buildLastmod().
const LASTMOD_MANIFEST = path.join(SCRIPTS_DIR, "sitemap-lastmod.json");
const TODAY = new Date().toISOString().slice(0, 10);

const EXCLUDED_HTML = new Set([
  "/404.html",
  "/yandex_9f19081f7abbbb70.html",
]);

// Legacy case-study URLs excluded from sitemap — canonical replacements are in place.
// These shell routes still exist for backward-compat redirects but should not be indexed.
//
// Wave B (2026-05-21) addition — every route that has a 301 in public/_redirects
// must NOT appear here as a source. Including a redirected URL in sitemap.xml
// causes GSC "Page with redirect" errors (Google indexes the source, finds the
// 301, marks it invalid). Mirror public/_redirects keys here.
const EXCLUDED_PATHS = new Set([
  // Unshipped work removed 2026-08-03 (301 -> /case-studies in _redirects)
  "/case-studies/c3-studio",
  "/case-studies/nwks-encounter",
  // Legacy case-study slugs (redirect to canonical anonymized framings)
  "/case-studies/astrus-insurance",
  "/case-studies/sunrise-transportation",
  "/case-studies/cassidy-hvac",
  "/case-studies/customer-reactivation",
  "/case-studies/hg-oil-holdings",
  // Service-page consolidation (redirect to /services/* canonicals)
  "/custom-websites",
  "/dashboards-and-analytics",
  "/services/custom-crm",
  // Brand-defense legacy slug (redirect to /preisser-solutions)
  "/preisser-technology",
  // Compare URL duplicate consolidation (Wave A)
  "/compare/wix-vs-custom-website-small-business",
  "/compare/zapier-vs-custom-automation",
  "/compare/wordpress-vs-custom",
  // Tier-3 small-city locations (redirect to nearest Tier-1 city)
  "/locations/atchison-kansas",
  "/locations/beloit-kansas",
  "/locations/coffeyville-kansas",
  "/locations/colby-kansas",
  "/locations/concordia-kansas",
  "/locations/emporia-kansas",
  "/locations/goodland-kansas",
  "/locations/hill-city-kansas",
  "/locations/hutchinson-kansas",
  "/locations/junction-city-kansas",
  "/locations/lawrence-kansas",
  "/locations/liberal-kansas",
  "/locations/mcpherson-kansas",
  "/locations/newton-kansas",
  "/locations/norton-kansas",
  "/locations/olathe-kansas",
  "/locations/ottawa-kansas",
  "/locations/overland-park-kansas",
  "/locations/parsons-kansas",
  "/locations/phillipsburg-kansas",
  "/locations/pittsburg-kansas",
  "/locations/plainville-kansas",
  "/locations/pratt-kansas",
  "/locations/russell-kansas",
  "/locations/smith-center-kansas",
  // Use-case deletions (Wave 2)
  "/use-cases/ai-chatbot-small-business",
  "/use-cases/automate-invoice-processing-small-business",
  "/use-cases/lead-tracking-website-google-ads",
  "/use-cases/quickbooks-servicetitan-dashboard",
  // Industry-page deletions
  "/industries/agriculture",
  "/industries/auto-service",
  "/industries/construction",
  "/industries/dental",
  "/industries/electrical",
  "/industries/garage-door",
  "/industries/healthcare",
  "/industries/landscaping",
  "/industries/pest-control",
  "/industries/plumbing",
  "/industries/real-estate",
  "/industries/restaurants",
  "/industries/roofing",
  "/industries/veterinary",
  // Legacy .html URL rewrites — these get .html stripped above; the bare
  // canonical versions stay in. Only kept here for completeness.
  "/home",
]);

// Path prefixes excluded from sitemap. Catches /agents/* (entire tree was
// renamed to /products/*; every agents URL 301s) without needing to enumerate
// each agent slug individually.
const EXCLUDED_PREFIXES = [
  "/agents/",
  "/preisser-technology/",
];

// Exact-match agents index route + custom-websites aliases — listed as prefixes
// excluded above can't match the bare slug, so add them here.
EXCLUDED_PATHS.add("/agents");

// ---------------------------------------------------------------------------
// Derive the exclusion set from public/_redirects (2026-08-03)
//
// EXCLUDED_PATHS above was hand-maintained and its comment said it "must mirror
// public/_redirects". A hand-mirrored list drifts: the moment someone adds a
// 301 without remembering to add the twin entry here, that URL goes back into
// sitemap.xml and Google files it as "Page with redirect".
//
// So we now READ _redirects and treat every redirect source as excluded. The
// literal set above is kept as a superset for anything excluded for a reason
// OTHER than a redirect, and because it documents intent — but it is no longer
// load-bearing, and drift is structurally impossible rather than merely
// discouraged. Any redirect source that 301s is never emitted, by construction.
// ---------------------------------------------------------------------------
function parseRedirects(text) {
  const exact = new Set();
  const prefixes = [];
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const [from] = line.split(/\s+/);
    if (!from || !from.startsWith("/")) continue;
    if (from.includes("*")) {
      const prefix = from.slice(0, from.indexOf("*"));
      if (prefix.length > 1) prefixes.push(prefix);
      continue;
    }
    // "/foo/" and "/foo" address the same page here — normalize to the bare form.
    exact.add(from.length > 1 && from.endsWith("/") ? from.slice(0, -1) : from);
  }
  return { exact, prefixes };
}

const redirects = parseRedirects(await readFile(REDIRECTS_FILE, "utf8"));
for (const p of redirects.exact) EXCLUDED_PATHS.add(p);
for (const p of redirects.prefixes) {
  if (!EXCLUDED_PREFIXES.includes(p)) EXCLUDED_PREFIXES.push(p);
}

// ---------------------------------------------------------------------------
// <lastmod> that reflects reality
//
// Every URL used to be stamped with today's date on every build. That is a
// freshness claim we cannot support: it tells Google 232 pages changed tonight
// when three did, and a source that cries wolf gets its lastmod ignored.
//
// Instead we fingerprint each page's *meaningful* content and only move
// lastmod when the fingerprint actually moves. Normalization strips the parts
// of the document that churn on every build regardless of content — the Next.js
// hydration payload and the fingerprinted asset URLs — so an untouched page
// keeps its date across rebuilds.
// ---------------------------------------------------------------------------
function contentFingerprint(html) {
  const normalized = html
    // Next.js stamps the build ID into an HTML comment on every page
    // (<!--AKOq7ZRVKQNLq_4DV3cS_-->) and React emits <!--$--> suspense markers.
    // The build ID is different on every single build, so without this every
    // page would look "changed" every time and lastmod would be worthless.
    // Verified: with comments stripped, an untouched page (/terms, /privacy)
    // normalizes byte-identically across two consecutive builds.
    .replace(/<!--[\s\S]*?-->/g, "")
    // Drop every <script> except JSON-LD: the __next_f hydration payload and
    // the chunk <script src> list change whenever ANY page's JS changes.
    .replace(/<script(?![^>]*application\/ld\+json)[^>]*>[\s\S]*?<\/script>/gi, "")
    // Drop preload/stylesheet links to build-fingerprinted assets.
    .replace(/<link[^>]+\/_next\/static\/[^>]*>/gi, "")
    // Drop any remaining fingerprinted asset path.
    .replace(/\/_next\/static\/[^"')\s]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return createHash("sha256").update(normalized).digest("hex").slice(0, 16);
}

function loadManifest() {
  try {
    return JSON.parse(fs.readFileSync(LASTMOD_MANIFEST, "utf8"));
  } catch {
    return {};
  }
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(fullPath);
    }
  }

  return files;
}

function htmlPathToUrl(filePath) {
  const relative = `/${path.relative(OUT_DIR, filePath).replaceAll(path.sep, "/")}`;
  if (EXCLUDED_HTML.has(relative)) return null;
  if (relative === "/index.html") return "/";
  return relative.replace(/\.html$/, "");
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/**
 * Per-URL priority. Updated 2026-05-21 (SEO Wave B — sitelink targeting).
 *
 * Goal: the 6 primary navigation hubs (products, services, case-studies,
 * locations, about, contact) must outrank their own detail pages so Google
 * picks them as sitelink candidates instead of deep programmatic pages.
 *
 * Rules:
 *   1.0  — homepage + the 4 top commercial hubs
 *   0.95 — locations hub, about, contact (sitelink targets)
 *   0.9  — blog index, process (secondary hubs)
 *   0.8  — detail pages under the hubs (don't compete with the hub)
 *   0.75 — compare pages (programmatic, useful but not sitelink candidates)
 *   0.7  — location detail pages, industry pages, use-case pages
 *   0.5  — everything else (fallback)
 *   0.3  — legal boilerplate
 */
function priorityFor(urlPath) {
  // ── Tier 1 — homepage + top commercial hubs (1.0) ─────────────────────
  if (urlPath === "/") return "1.0";
  if (urlPath === "/products")     return "1.0";
  if (urlPath === "/services")     return "1.0";
  if (urlPath === "/case-studies") return "1.0";

  // ── Tier 2 — sitelink targets: locations hub, about, contact (0.95) ───
  if (urlPath === "/locations") return "0.95";
  if (urlPath === "/about")     return "0.95";
  if (urlPath === "/contact")   return "0.95";

  // ── Tier 3 — secondary hubs (0.9) ─────────────────────────────────────
  if (urlPath === "/blog")    return "0.9";
  if (urlPath === "/process") return "0.9";

  // ── Tier 4 — hub detail pages (0.8) — sit below their hubs ───────────
  // Individual product, service, and case-study detail pages. We deliberately
  // hold them at 0.8 so the hubs outrank them in Google's sitelink selection.
  if (urlPath.startsWith("/products/"))     return "0.8";
  if (urlPath.startsWith("/services/"))     return "0.8";
  if (urlPath.startsWith("/case-studies/")) return "0.8";
  if (urlPath.startsWith("/blog/"))         return "0.8";
  if (urlPath.startsWith("/insights/") || urlPath === "/insights") return "0.8";

  // ── Tier 5 — compare pages (0.75) ─────────────────────────────────────
  if (urlPath.startsWith("/compare/")) return "0.75";

  // ── Tier 6 — location detail pages + programmatic AEO pages (0.7) ────
  if (urlPath.startsWith("/locations/")) return "0.7";
  if (urlPath.startsWith("/industries/")) return "0.7";
  if (urlPath.startsWith("/use-cases/"))  return "0.7";

  // ── Tier 7 — legal boilerplate (0.3) ─────────────────────────────────
  if (urlPath === "/privacy" || urlPath === "/terms") return "0.3";

  // ── Fallback ──────────────────────────────────────────────────────────
  return "0.5";
}

/**
 * Per-URL changefreq. Was uniformly "weekly" — which is dishonest for legal
 * pages and wastes recrawl budget on stable service pages.
 */
function changefreqFor(urlPath) {
  if (urlPath === "/") return "weekly";
  if (urlPath === "/products") return "weekly";
  if (urlPath.startsWith("/products/")) return "monthly";
  if (urlPath.startsWith("/case-studies") || urlPath.startsWith("/blog") || urlPath.startsWith("/insights")) return "weekly";
  if (
    urlPath.startsWith("/services") ||
    urlPath.startsWith("/compare") ||
    urlPath.startsWith("/locations") ||
    urlPath.startsWith("/industries") ||
    urlPath.startsWith("/use-cases")
  ) return "monthly";
  if (urlPath === "/privacy" || urlPath === "/terms") return "yearly";
  return "monthly";
}

const htmlFiles = await walk(OUT_DIR);
const fileByUrl = new Map();
for (const file of htmlFiles) {
  const urlPath = htmlPathToUrl(file);
  if (urlPath) fileByUrl.set(urlPath, file);
}

const urls = [...fileByUrl.keys()]
  .filter((urlPath) => !EXCLUDED_PATHS.has(urlPath))
  .filter((urlPath) => !EXCLUDED_PREFIXES.some((prefix) => urlPath.startsWith(prefix)))
  .sort((a, b) => {
    if (a === "/") return -1;
    if (b === "/") return 1;
    return a.localeCompare(b);
  });

// Resolve <lastmod> per URL against the committed fingerprint manifest.
const previous = loadManifest();
const manifest = {};
let changed = 0;
let seeded = 0;
const lastmodFor = new Map();

for (const urlPath of urls) {
  const hash = contentFingerprint(await readFile(fileByUrl.get(urlPath), "utf8"));
  const prior = previous[urlPath];
  let lastmod;
  if (!prior) {
    // First time we have ever recorded this URL: today is the honest answer.
    lastmod = TODAY;
    seeded += 1;
  } else if (prior.hash === hash) {
    lastmod = prior.lastmod; // content is genuinely unchanged — keep the date
  } else {
    lastmod = TODAY;
    changed += 1;
  }
  manifest[urlPath] = { hash, lastmod };
  lastmodFor.set(urlPath, lastmod);
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((urlPath) => {
    const priority = priorityFor(urlPath);
    const changefreq = changefreqFor(urlPath);
    return `  <url>
    <loc>${escapeXml(`${SITE_ORIGIN}${urlPath}`)}</loc>
    <lastmod>${lastmodFor.get(urlPath)}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join("\n")}
</urlset>
`;

await writeFile(LASTMOD_MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

await stat(OUT_DIR);
await writeFile(path.join(OUT_DIR, "sitemap.xml"), xml, "utf8");
console.log(`[generate-sitemap] Wrote ${urls.length} URLs to out/sitemap.xml.`);
console.log(
  `[generate-sitemap] lastmod: ${changed} changed, ${seeded} newly tracked, ` +
    `${urls.length - changed - seeded} unchanged (date preserved).`,
);

// A page that exists, is indexable, and is not redirected but never reaches
// sitemap.xml is invisible to Search Console. Say so loudly rather than
// silently emitting a short sitemap.
const omitted = [...fileByUrl.keys()].filter((u) => !urls.includes(u));
if (omitted.length) {
  console.log(`[generate-sitemap] ${omitted.length} built page(s) intentionally omitted:`);
  for (const u of omitted) console.log(`[generate-sitemap]   - ${u}`);
}
