/**
 * Serve the built `out/` AS the production origin through Playwright request interception.
 *
 * The client sites (haysacademy.edu, farm-books.com, ...) only allow being framed by
 * https://preissersolutions.com, so on localhost their live frames never load. Here the page's
 * origin really is https://preissersolutions.com: every request to it is answered from `out/`
 * (with the `/*` headers of out/_headers), every other request goes to the real network.
 * Responses carry `x-ps-probe-source: local-out` so a test can prove the interception is real.
 */
import fs from "node:fs";
import path from "node:path";

export const PROD_ORIGIN = "https://preissersolutions.com";
const TYPES = {
  ".html": "text/html; charset=utf-8", ".txt": "text/plain; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".json": "application/json", ".xml": "application/xml", ".svg": "image/svg+xml",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".avif": "image/avif",
  ".ico": "image/x-icon", ".woff2": "font/woff2", ".mp4": "video/mp4", ".webm": "video/webm",
};

/** The header lines under the `/*` block of out/_headers (comments and `!` detach lines skipped). */
export function starHeaders(outDir) {
  const lines = fs.readFileSync(path.join(outDir, "_headers"), "utf8").split("\n");
  const start = lines.findIndex((l) => l.trim() === "/*");
  const headers = {};
  for (let i = start + 1; i < lines.length; i++) {
    const l = lines[i];
    if (l.trim() === "" || !/^\s/.test(l)) break;
    const t = l.trim();
    if (t.startsWith("#") || t.startsWith("!")) continue;
    const k = t.indexOf(":");
    if (k > 0) headers[t.slice(0, k).trim().toLowerCase()] = t.slice(k + 1).trim();
  }
  return headers;
}

export function resolveOut(outDir, urlPath) {
  let p = decodeURIComponent(urlPath);
  if (p.endsWith("/")) p += "index";
  const base = path.join(outDir, p);
  if (!base.startsWith(outDir)) return null;
  for (const c of [base, `${base}.html`, path.join(base, "index.html")]) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  }
  return null;
}

/** delayMs adds a fixed wait before each answer, to stand in for a CDN round trip (default 0). */
export async function serveAsProdOrigin(context, outDir, { delayMs = 0 } = {}) {
  const headers = starHeaders(outDir);
  await context.route(`${PROD_ORIGIN}/**`, async (route) => {
    const u = new URL(route.request().url());
    const file = resolveOut(outDir, u.pathname);
    if (delayMs) await new Promise((r) => setTimeout(r, delayMs));
    if (!file) return route.fulfill({ status: 404, body: "not in out/", headers: { "x-ps-probe-source": "local-out" } });
    const ext = path.extname(file);
    return route.fulfill({
      status: 200,
      body: fs.readFileSync(file),
      headers: { ...headers, "content-type": TYPES[ext] ?? "application/octet-stream", "x-ps-probe-source": "local-out" },
    });
  });
}
