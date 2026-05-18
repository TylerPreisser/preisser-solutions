#!/usr/bin/env node

import { readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.resolve("out");
const SITE_ORIGIN = "https://preissersolutions.com";
const TODAY = new Date().toISOString().slice(0, 10);

const EXCLUDED_HTML = new Set([
  "/404.html",
  "/yandex_9f19081f7abbbb70.html",
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
 * Per-URL priority. Set on 2026-05-18 as part of SEO Wave A. Replaces the
 * previous uniform 0.7 priority that gave Google no signal about which URLs
 * matter most. Highest signal goes to home, case studies (proof), services
 * (revenue), and the HQ city; lowest to boilerplate legal pages.
 */
function priorityFor(urlPath) {
  if (urlPath === "/") return "1.0";
  if (urlPath.startsWith("/case-studies/") || urlPath === "/case-studies") return "0.9";
  if (urlPath.startsWith("/services/") || urlPath === "/services") return "0.85";
  if (urlPath.startsWith("/locations/hays-kansas")) return "0.85";
  if (urlPath.startsWith("/locations/")) return "0.7";
  if (urlPath.startsWith("/compare/")) return "0.75";
  if (urlPath.startsWith("/industries/")) return "0.7";
  if (urlPath.startsWith("/use-cases/")) return "0.7";
  if (urlPath.startsWith("/blog/") || urlPath === "/blog") return "0.6";
  if (urlPath.startsWith("/insights/") || urlPath === "/insights") return "0.6";
  if (urlPath === "/about" || urlPath === "/contact" || urlPath === "/integrations") return "0.7";
  if (urlPath === "/privacy" || urlPath === "/terms") return "0.3";
  return "0.5";
}

/**
 * Per-URL changefreq. Was uniformly "weekly" — which is dishonest for legal
 * pages and wastes recrawl budget on stable service pages.
 */
function changefreqFor(urlPath) {
  if (urlPath === "/") return "weekly";
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
    const priority = priorityFor(urlPath);
    const changefreq = changefreqFor(urlPath);
    return `  <url>
    <loc>${escapeXml(`${SITE_ORIGIN}${urlPath}`)}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join("\n")}
</urlset>
`;

await stat(OUT_DIR);
await writeFile(path.join(OUT_DIR, "sitemap.xml"), xml, "utf8");
console.log(`[generate-sitemap] Wrote ${urls.length} URLs to out/sitemap.xml.`);
