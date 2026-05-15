#!/usr/bin/env node

import { readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.resolve("out");
const PUBLIC_SITEMAP = path.resolve("public/sitemap.xml");
const SITE_ORIGIN = "https://preissersolutions.com";
const TODAY = new Date().toISOString().slice(0, 10);

const EXCLUDED_HTML = new Set([
  "/404.html",
  "/yandex_9f19081f7abbbb70.html",
]);
const REDIRECTED_URL_PATHS = new Set([
  "/custom-websites",
  "/preisser-technology",
  "/premium-web-development-kansas",
  "/business-automation",
  "/ai-agents",
  "/dashboards-and-analytics",
  "/web-applications",
]);
const LEGACY_NOINDEX_URL_PATHS = new Set([
  "/faq",
  "/pricing",
  "/process",
  "/why-automation",
  "/roi-calculator",
]);

const INDEXABLE_LOCATION_PATHS = new Set(["/locations", "/locations/hays-kansas"]);
const INDEXABLE_INDUSTRY_PATHS = new Set([
  "/industries",
  "/industries/contractors",
  "/industries/restaurants",
  "/industries/professional-services",
]);
const INDEXABLE_SERVICE_PATHS = new Set([
  "/services",
  "/services/local-seo-hays-ks",
  "/services/google-business-profile-optimization-hays-ks",
  "/services/google-ads-hays-ks",
  "/services/web-design-hays-ks",
  "/services/social-media-marketing-hays-ks",
  "/services/ai-automation-hays-ks",
]);

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
  const urlPath = relative.replace(/\.html$/, "");
  if (REDIRECTED_URL_PATHS.has(urlPath)) return null;
  if (LEGACY_NOINDEX_URL_PATHS.has(urlPath)) return null;
  if (urlPath.startsWith("/compare/")) return null;
  if (urlPath.startsWith("/locations/") && !INDEXABLE_LOCATION_PATHS.has(urlPath)) return null;
  if (urlPath.startsWith("/industries/") && !INDEXABLE_INDUSTRY_PATHS.has(urlPath)) return null;
  if (urlPath.startsWith("/services/") && !INDEXABLE_SERVICE_PATHS.has(urlPath)) return null;
  return urlPath;
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const htmlFiles = await walk(OUT_DIR);
const urls = htmlFiles
  .map(htmlPathToUrl)
  .filter(Boolean)
  .sort((a, b) => {
    if (a === "/") return -1;
    if (b === "/") return 1;
    return a.localeCompare(b);
  });

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((urlPath) => {
    const priority = urlPath === "/" ? "1.0" : "0.7";
    return `  <url>
    <loc>${escapeXml(`${SITE_ORIGIN}${urlPath}`)}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join("\n")}
</urlset>
`;

await stat(OUT_DIR);
await writeFile(path.join(OUT_DIR, "sitemap.xml"), xml, "utf8");
await writeFile(PUBLIC_SITEMAP, xml, "utf8");
console.log(`[generate-sitemap] Wrote ${urls.length} URLs to out/sitemap.xml and public/sitemap.xml.`);
