import fs from "node:fs";
import path from "node:path";
import type { BrowserContext } from "@playwright/test";

export const ORIGIN = "http://stage.test";
/** Resolved from the repo root (Playwright runs from there). */
export const OUT_DIR = path.resolve(process.env.PS_OUT_DIR ?? "out");

const TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

/** Cloudflare-style clean URLs over the flat export: /case-studies/x -> out/case-studies/x.html. */
export function resolveOut(urlPath: string): string | null {
  let p = decodeURIComponent(urlPath.split("?")[0].split("#")[0]);
  if (p.endsWith("/")) p += "index";
  const base = path.join(OUT_DIR, p);
  if (!base.startsWith(OUT_DIR)) return null;
  for (const candidate of [base, `${base}.html`, path.join(base, "index.html")]) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
  }
  return null;
}

export async function serveOut(context: BrowserContext): Promise<void> {
  await context.route((url) => url.origin !== ORIGIN, (route) => route.abort());
  await context.route(`${ORIGIN}/**`, async (route) => {
    const file = resolveOut(new URL(route.request().url()).pathname);
    if (!file) return route.fulfill({ status: 404, body: "not in out/" });
    return route.fulfill({ path: file, contentType: TYPES[path.extname(file)] ?? "application/octet-stream" });
  });
}
