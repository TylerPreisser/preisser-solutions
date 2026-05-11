#!/usr/bin/env node
/**
 * scripts/strip-404-noindex.mjs
 *
 * Postbuild step: removes the Next.js-injected
 *   <meta name="robots" content="noindex"/>
 * tag from the static 404 page (`out/404.html`).
 *
 * Why this exists:
 *   Next.js 15's App Router hardcodes a `noindex` meta tag into the head of
 *   `not-found` route output, regardless of whether `not-found.tsx` exports
 *   `metadata.robots = { index: true, follow: true }`. The custom metadata
 *   *is* emitted (as a second `<meta name="robots" content="index, follow"/>`
 *   tag later in the head), but when a page contains both, Google's most-
 *   restrictive-wins rule means the hardcoded `noindex` still applies.
 *
 *   Per Tyler's directive (2026-05-11), Preisser Tech has ZERO restrictions
 *   on AI crawlers and agents across every surface. The 404 page must be
 *   fully indexable too. This script enforces that after `next build`.
 *
 * What it does:
 *   - Reads `out/404.html`
 *   - Removes the FIRST `<meta name="robots" content="noindex"/>` tag found
 *     (the framework-injected one; we leave any subsequent `index, follow`
 *     tag emitted by our `metadata` export intact)
 *   - Writes the file back
 *
 * Safe to re-run. No-op if the noindex tag isn't found.
 */

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const FILE = path.resolve("out/404.html");
const NOINDEX_RE = /<meta\s+name="robots"\s+content="noindex"\s*\/?>/i;

async function main() {
  let html;
  try {
    html = await readFile(FILE, "utf8");
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log("[strip-404-noindex] out/404.html not found (build skipped or different output dir) — nothing to do.");
      return;
    }
    throw err;
  }

  if (!NOINDEX_RE.test(html)) {
    console.log("[strip-404-noindex] No <meta name=\"robots\" content=\"noindex\"> in out/404.html — nothing to strip.");
    return;
  }

  const stripped = html.replace(NOINDEX_RE, "");
  await writeFile(FILE, stripped, "utf8");
  console.log("[strip-404-noindex] Removed Next.js-injected noindex meta from out/404.html.");
}

main().catch((err) => {
  console.error("[strip-404-noindex] Failed:", err);
  process.exitCode = 1;
});
