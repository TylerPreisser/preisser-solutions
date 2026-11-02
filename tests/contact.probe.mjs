/**
 * Probe for functions/api/contact.ts.
 *
 * Imports the REAL exported handler and replaces globalThis.fetch with a
 * recorder, so nothing leaves this machine.
 */
import assert from "node:assert/strict";

const MODULE = new URL("../functions/api/contact.ts", import.meta.url);
const { onRequest } = await import(MODULE.href);

const ENV = {
  RESEND_API_KEY: "re_TEST_KEY_NOT_REAL",
  CONTACT_FROM: "Preisser Solutions <website@preissersolutions.com>",
  CONTACT_TO: "tyler@preissersolutions.com",
};

let captured = [];
const realFetch = globalThis.fetch;
globalThis.fetch = async (url, init) => {
  captured.push({ url: String(url), init });
  return new Response(JSON.stringify({ id: "fake-id" }), { status: 200 });
};
process.on("exit", () => {
  globalThis.fetch = realFetch;
});

const GOOD = {
  name: "Jane Doe",
  email: "jane.doe+biz@example.com",
  phone: "",
  company: "Acme",
  need: "Automation",
  timeline: "Q1",
  details: "We would like to talk about automating our invoicing.",
  website: "",
};

function post(
  body,
  {
    raw = null,
    url = "https://preissersolutions.com/api/contact",
    origin = "https://preissersolutions.com",
    referer = null,
    secFetchSite = null,
    contentLength = null,
  } = {}
) {
  const payload = raw !== null ? raw : JSON.stringify(body);
  return new Request(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(contentLength === null
        ? {}
        : { "content-length": String(contentLength) }),
      ...(origin === null ? {} : { origin }),
      ...(referer === null ? {} : { referer }),
      ...(secFetchSite === null ? {} : { "sec-fetch-site": secFetchSite }),
    },
    body: payload,
  });
}

const call = (request) => onRequest({ request, env: ENV });

let pass = 0;
let fail = 0;
async function check(name, fn) {
  captured = [];
  try {
    await fn();
    pass += 1;
    console.log(`  PASS  ${name}`);
  } catch (error) {
    fail += 1;
    console.log(`  FAIL  ${name}\n        ${error.message}`);
  }
}

console.log("\n=== SUCCESS PATH ===");
await check("same-origin valid enquiry -> 200, one send, reply_to is the address", async () => {
  const res = await call(post(GOOD));
  assert.equal(res.status, 200);
  assert.equal(captured.length, 1);
  assert.equal(JSON.parse(captured[0].init.body).reply_to, GOOD.email);
});
await check("www origin is accepted", async () => {
  const res = await call(post(GOOD, { origin: "https://www.preissersolutions.com" }));
  assert.equal(res.status, 200);
});
await check("no Origin but an allowed Referer is accepted", async () => {
  const res = await call(
    post(GOOD, { origin: null, referer: "https://preissersolutions.com/contact" })
  );
  assert.equal(res.status, 200);
});

await check("a branch preview origin is accepted", async () => {
  const res = await call(post(GOOD, { origin: "https://3f2a91c0.preisser-solutions.pages.dev" }));
  assert.equal(res.status, 200);
});

console.log("=== ORIGIN CHECK ===");
for (const [label, opts] of [
  ["foreign Origin", { origin: "https://evil.example" }],
  ["lookalike Origin", { origin: "https://preissersolutions.com.evil.example" }],
  ["pages.dev lookalike Origin", { origin: "https://preisser-solutions.pages.dev.evil.example" }],
  ["other pages.dev project Origin", { origin: "https://evil-preisser-solutions.pages.dev" }],
  ["Origin: null", { origin: "null" }],
  ["no Origin and no Referer", { origin: null }],
  ["foreign Referer, no Origin", { origin: null, referer: "https://evil.example/x" }],
  ["Sec-Fetch-Site: cross-site", { secFetchSite: "cross-site" }],
]) {
  await check(`${label} -> 403, no send`, async () => {
    const res = await call(post(GOOD, opts));
    assert.equal(res.status, 403);
    assert.equal(captured.length, 0);
  });
}

console.log("=== BODY SIZE CAP ===");
await check("declared Content-Length over the cap -> 413, no send", async () => {
  const res = await call(post(GOOD, { contentLength: 10_000_000 }));
  assert.equal(res.status, 413);
  assert.equal(captured.length, 0);
});
await check("a long pasted message (60 KB) is still accepted", async () => {
  const res = await call(post({ ...GOOD, details: "x".repeat(60_000) }));
  assert.equal(res.status, 200);
});
await check("undeclared oversized body -> 413, no send", async () => {
  const res = await call(post({ ...GOOD, details: "x".repeat(200_000) }));
  assert.equal(res.status, 413);
  assert.equal(captured.length, 0);
});
await check("JSON null body -> 400, not a crash", async () => {
  const res = await call(post(null, { raw: "null" }));
  assert.equal(res.status, 400);
  assert.equal(captured.length, 0);
});
await check("a maximum-length legitimate enquiry still passes", async () => {
  const res = await call(post({ ...GOOD, details: "é".repeat(5000) }));
  assert.equal(res.status, 200);
});

console.log("=== EMAIL BECOMES reply_to ===");
for (const bad of [
  "a@example.com, b@evil.example",
  "a@example.com;b@evil.example",
  "Evil <a@example.com>",
  '"a b"@example.com',
  "a@example.com\r\nBcc: x@evil.example",
  "a@example.com\nBcc: x@evil.example",
  "a@@example.com",
  "a@example",
  "a@exa mple.com",
  "a@example.com>",
  "<a@example.com>",
  '"a"@example.com',
  "a,b@example.com",
  "a;b@example.com",
  "a\\b@example.com",
  "a@example.com\u0000",
]) {
  await check(`rejects ${JSON.stringify(bad)} -> 400, no send`, async () => {
    const res = await call(post({ ...GOOD, email: bad }));
    assert.equal(res.status, 400);
    assert.equal(captured.length, 0);
  });
}
for (const ok of ["a.b+c@example.co.uk", "o'brien@example.com", "x_y-z@sub.example.org"]) {
  await check(`accepts ${ok}`, async () => {
    const res = await call(post({ ...GOOD, email: ok }));
    assert.equal(res.status, 200);
    assert.equal(JSON.parse(captured[0].init.body).reply_to, ok);
  });
}

console.log("=== UNCHANGED BEHAVIOUR ===");
await check("honeypot still answers 200 and sends nothing", async () => {
  const res = await call(post({ ...GOOD, website: "http://spam.example" }));
  assert.equal(res.status, 200);
  assert.equal(captured.length, 0);
});
await check("GET -> 405", async () => {
  const res = await call(new Request("https://preissersolutions.com/api/contact"));
  assert.equal(res.status, 405);
});

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
