/** Probe for the site-wide response headers declared in public/_headers. */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const text = readFileSync(new URL("../public/_headers", import.meta.url), "utf8");
const lines = text.split("\n");
const start = lines.findIndex((l) => l.trim() === "/*");
assert.ok(start === 0, "the /* block must be first");
const block = [];
for (const l of lines.slice(start + 1)) {
  if (l.trim() && !l.startsWith(" ") && !l.startsWith("\t")) break;
  block.push(l.trim());
}
const get = (name) =>
  block.find((l) => l.toLowerCase().startsWith(name.toLowerCase() + ":"));

let fail = 0;
function check(name, fn) {
  try {
    fn();
    console.log(`  PASS  ${name}`);
  } catch (e) {
    fail += 1;
    console.log(`  FAIL  ${name}\n        ${e.message}`);
  }
}

check("HSTS present", () => assert.match(get("Strict-Transport-Security") ?? "", /max-age=\d{7,}/));
check("nosniff present", () => assert.match(get("X-Content-Type-Options") ?? "", /nosniff/));
check("Referrer-Policy present", () => assert.ok(get("Referrer-Policy")));
check("framing denied to other origins", () =>
  assert.match(get("X-Frame-Options") ?? "", /SAMEORIGIN|DENY/));
check("CSP is Report-Only with object-src and base-uri", () => {
  const h = get("Content-Security-Policy-Report-Only") ?? "";
  assert.match(h, /default-src 'self'/);
  assert.match(h, /object-src 'none'/);
  assert.match(h, /base-uri 'self'/);
});
// Cloudflare injects its Web Analytics beacon at the edge; real Safari reported
// script-src-elem violations for static.cloudflareinsights.com on every page.
check("CSP allows Cloudflare's injected analytics beacon", () => {
  const h = get("Content-Security-Policy-Report-Only") ?? "";
  const dir = (name) => (h.split(";").map((d) => d.trim()).find((d) => d.startsWith(name + " ")) ?? "");
  assert.match(dir("script-src"), /https:\/\/static\.cloudflareinsights\.com(\s|$)/);
  assert.match(dir("connect-src"), /https:\/\/cloudflareinsights\.com(\s|$)/);
});
check("no ENFORCED CSP on /* (report-only phase)", () =>
  assert.equal(get("Content-Security-Policy"), undefined));

console.log(fail ? `\n${fail} failed` : "\nall passed");
process.exit(fail ? 1 : 0);
