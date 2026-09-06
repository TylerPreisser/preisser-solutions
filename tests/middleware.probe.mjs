/**
 * Probe for functions/_middleware.ts.
 *
 * Imports the REAL exported middleware and drives it with constructed Request
 * objects and a recording `next()`, so no network and no build are involved.
 *
 * It exists because of a deploy blocker found 2026-09-05: the duplicate-host
 * 301 fired for EVERY path, including `/api/*`, so a footer newsletter signup
 * submitted on www.preissersolutions.com was either CORS-rejected or had its
 * POST downgraded to GET by the redirect and answered "Method not allowed."
 * The visitor's address was lost either way.
 *
 * Both halves are asserted here on purpose. Exempting `/api/*` is only correct
 * if the SEO reason for the redirect survives, so every page case below must
 * keep 301ing to the apex. Deleting those assertions to "fix" a failure would
 * re-open the duplicate-content problem the redirect exists to solve.
 *
 * Run: node tests/middleware.probe.mjs
 */
import assert from "node:assert/strict";
const MODULE = new URL("../functions/_middleware.ts", import.meta.url);
const { onRequest } = await import(MODULE.href);

let nextCalled = 0;
const ctx = (request) => ({
  request,
  env: {},
  next: async () => {
    nextCalled += 1;
    return new Response(JSON.stringify({ reached: "origin-handler" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  },
});

let pass = 0, fail = 0;
async function check(name, fn) {
  nextCalled = 0;
  try { await fn(); pass++; console.log(`  PASS  ${name}`); }
  catch (e) { fail++; console.log(`  FAIL  ${name}\n        ${e.message}`); }
}

const post = (url, headers = {}) =>
  new Request(url, { method: "POST", headers: { "content-type": "application/json", ...headers }, body: "{}" });
const get = (url, headers = {}) => new Request(url, { method: "GET", headers });

console.log("\n=== API ROUTES ON DUPLICATE HOSTS MUST REACH THE FUNCTION ===");
for (const host of ["www.preissersolutions.com", "preisser-solutions.pages.dev"]) {
  for (const p of ["/api/subscribe", "/api/contact"]) {
    await check(`POST https://${host}${p} -> passes through (no 301)`, async () => {
      const res = await onRequest(ctx(post(`https://${host}${p}`)));
      assert.notEqual(res.status, 301, `got 301 -> ${res.headers.get("location")}`);
      assert.equal(res.status, 200);
      assert.equal(nextCalled, 1, "context.next() must have been called");
      assert.deepEqual(await res.json(), { reached: "origin-handler" });
    });
  }
}
await check("POST apex /api/subscribe -> passes through (unchanged)", async () => {
  const res = await onRequest(ctx(post("https://preissersolutions.com/api/subscribe")));
  assert.equal(res.status, 200);
  assert.equal(nextCalled, 1);
});
await check("Accept: text/markdown POST /api/subscribe -> NOT llms.txt", async () => {
  const res = await onRequest(ctx(post("https://preissersolutions.com/api/subscribe", { accept: "text/markdown" })));
  assert.equal(nextCalled, 1, "must reach the API, not serveMarkdownForAgents");
  assert.notEqual(res.headers.get("content-location"), "/llms.txt");
});

console.log("\n=== SEO CONSOLIDATION MUST BE INTACT FOR CONTENT ===");
const pageCases = [
  ["https://www.preissersolutions.com/", "https://preissersolutions.com/"],
  ["https://www.preissersolutions.com/contact", "https://preissersolutions.com/contact"],
  ["https://www.preissersolutions.com/services/local-seo", "https://preissersolutions.com/services/local-seo"],
  ["https://preisser-solutions.pages.dev/about", "https://preissersolutions.com/about"],
  ["https://preisser-solutions.pages.dev/sitemap.xml", "https://preissersolutions.com/sitemap.xml"],
  ["https://www.preissertech.com/contact.html", "https://preissersolutions.com/contact"],
];
for (const [from, to] of pageCases) {
  await check(`GET ${from} -> 301 ${to}`, async () => {
    const res = await onRequest(ctx(get(from)));
    assert.equal(res.status, 301, `expected 301, got ${res.status}`);
    assert.equal(res.headers.get("location"), to);
    assert.equal(nextCalled, 0);
  });
}
await check("a path merely CONTAINING 'api' still redirects (/apiary)", async () => {
  const res = await onRequest(ctx(get("https://www.preissersolutions.com/apiary")));
  assert.equal(res.status, 301);
  assert.equal(res.headers.get("location"), "https://preissersolutions.com/apiary");
});
await check("legacy host /api/ is NOT exempted (preissertech.com still 301s)", async () => {
  const res = await onRequest(ctx(get("https://preissertech.com/api/subscribe")));
  assert.equal(res.status, 301);
});
await check("robots.txt on www still served, not redirected", async () => {
  const res = await onRequest(ctx(get("https://www.preissersolutions.com/robots.txt")));
  assert.equal(res.status, 200);
});

console.log(`\n===== ${pass} passed, ${fail} failed =====`);
process.exit(fail === 0 ? 0 : 1);
