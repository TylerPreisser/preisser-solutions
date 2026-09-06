import fs from "node:fs";
import path from "node:path";

const KEY = "cd9d2166e08f09a44331c911b5dace2d";
const HOST = "preissersolutions.com";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// ---------------------------------------------------------------------------
// URL list — DERIVED from out/sitemap.xml, not hand-maintained (2026-09-05).
//
// This was a 110-entry hand-written array, and it had drifted badly. Measured
// against the current build before this change:
//
//   110 URLs submitted
//    56 actually in sitemap.xml
//    50 were REDIRECT SOURCES that 301 elsewhere
//     4 were static files or a template literal, not pages
//   175 live, indexable URLs were never submitted at all
//
// Telling Bing and Yandex to recrawl 50 URLs that immediately 301 wastes the
// IndexNow quota and asks them to re-discover pages we have already told them
// (via the sitemap and the redirects themselves) not to index. Meanwhile three
// quarters of the real site was invisible to this ping.
//
// sitemap.xml is already the canonical list: generate-sitemap.mjs excludes
// every redirect source AND every cross-canonical alias, by construction. So
// read it instead of duplicating it. This is the same reasoning generate-
// sitemap.mjs applies to its own exclusion set — a hand-mirrored list drifts,
// a derived one cannot.
//
// Requires a build first (out/sitemap.xml must exist); the script says so
// clearly rather than silently submitting a stale or empty list.
// ---------------------------------------------------------------------------
const SITEMAP_PATH = path.resolve("out/sitemap.xml");

if (!fs.existsSync(SITEMAP_PATH)) {
  console.error(
    `[indexnow] ${SITEMAP_PATH} not found. Run \`npm run build\` first — this script submits exactly what the sitemap contains.`,
  );
  process.exit(1);
}

const URL_LIST = [
  ...new Set(
    [...fs.readFileSync(SITEMAP_PATH, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      (m) => m[1].trim(),
    ),
  ),
];

if (URL_LIST.length === 0) {
  console.error("[indexnow] sitemap.xml contained no <loc> entries — refusing to submit an empty list.");
  process.exit(1);
}

const payload = {
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: URL_LIST,
};

console.log("Submitting URLs to IndexNow...");
console.log(`Host: ${HOST}`);
console.log(`Key location: ${KEY_LOCATION}`);
console.log(`URLs (${URL_LIST.length}):`);
URL_LIST.forEach((url) => console.log(`  ${url}`));
console.log();

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  body: JSON.stringify(payload),
});

if (response.ok) {
  console.log(`Success: ${response.status} ${response.statusText}`);
} else {
  const body = await response.text().catch(() => "");
  console.error(`Error: ${response.status} ${response.statusText}`);
  if (body) console.error(`Response: ${body}`);
  process.exit(1);
}
