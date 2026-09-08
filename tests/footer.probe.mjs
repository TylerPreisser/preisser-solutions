/**
 * Client probe for the footer "Stay up to date" signup.
 *
 * Drives the REAL component on the running dev server and intercepts
 * /api/subscribe with page.route(), so every branch is exercised without a
 * single outbound email. Asserts the thing that was actually broken:
 * "Thanks for subscribing." must appear ONLY on a confirmed success.
 */
import { createRequire } from "node:module";
// Resolved relative to THIS file: Node walks up from tests/ to the repo's
// node_modules, so no absolute path and no assumption about the cwd.
const req = createRequire(import.meta.url);
const { chromium } = req("playwright");
import assert from "node:assert/strict";

// Any page that renders the site footer will do. The default is the port
// `npm run dev` actually uses; override it for a built export or an ad-hoc server:
//   PS_TEST_BASE_URL=http://127.0.0.1:4321 npm run test:e2e
const ORIGIN = (process.env.PS_TEST_BASE_URL || "http://127.0.0.1:3000").replace(/\/+$/, "");
const BASE = `${ORIGIN}/privacy`;

// Build identity. A stale server answers 200 exactly like a fresh one, so
// "something responded" is NOT evidence the probe tested current source. A
// green 8/8 run was once produced against a static export that predated the
// pillar rename entirely; these two strings make that specific failure loud.
// Update both on the next rename -- do not delete them.
const MUST_CONTAIN = "AI and Search Engine Visibility";     // src/components/home/service-pillars.tsx:581
const MUST_NOT_CONTAIN = "SEO AI Visibility Ad Management"; // the pre-rename name; stale builds only
const SUCCESS = "Thanks for subscribing.";
const MIN_FILL_MS = 3000;

// Preflight, part 1: is anything there? This probe drives a REAL rendered page,
// so it needs a server. Fail loudly and immediately when there isn't one --
// never skip. A suite that quietly passes because it ran nothing is not a suite.
// Retried and patient: `next dev` compiles a route on first request, and a cold
// or mid-recompile server can take far longer than a warm one (3s warm here,
// well over 8s cold). A tight timeout would report "no server" for a server
// that is merely busy -- an infrastructure flake dressed up as a test failure.
let html;
let lastError;
for (let attempt = 1; attempt <= 3; attempt += 1) {
  try {
    const res = await fetch(BASE, { method: "GET", signal: AbortSignal.timeout(45000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    html = await res.text();
    break;
  } catch (error) {
    lastError = error;
    if (attempt < 3) await new Promise((r) => setTimeout(r, 2000));
  }
}
if (html === undefined) {
  console.error(
    `\nFAIL  no server at ${BASE} after 3 attempts (${lastError.message})\n` +
      `      Start one, then re-run:  npm run dev\n` +
      `      Or point the probe at an existing one:\n` +
      `      PS_TEST_BASE_URL=http://127.0.0.1:4321 npm run test:e2e\n`
  );
  process.exit(1);
}

// Preflight, part 2: is it the RIGHT thing? Answering is not the same as being
// current. Assert the new content is present AND the superseded content is gone
// -- one without the other still lets a half-stale target through.
const missingNew = !html.includes(MUST_CONTAIN);
const carriesOld = html.includes(MUST_NOT_CONTAIN);
if (missingNew || carriesOld) {
  console.error(
    `\nFAIL  ${BASE} answered 200, but it is NOT the current build.\n` +
      (missingNew ? `      missing expected copy: ${JSON.stringify(MUST_CONTAIN)}\n` : "") +
      (carriesOld ? `      still carries superseded copy: ${JSON.stringify(MUST_NOT_CONTAIN)}\n` : "") +
      `      Refusing to run: a pass here would prove nothing about current source.\n` +
      `      Rebuild and re-serve, or point PS_TEST_BASE_URL at a current server.\n`
  );
  process.exit(1);
}

const browser = await chromium.launch();
let pass = 0;
let fail = 0;

// Retries absorb dev-server flake (other agents are editing this tree, so
// Fast Refresh fires mid-test). Assertions are identical on every attempt, so a
// genuine logic failure still fails all 3.
async function check(name, fn) {
  let last;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const context = await browser.newContext();
    const page = await context.newPage();
    const requests = [];
    try {
      await fn(page, requests);
      await context.close();
      pass += 1;
      console.log(`  PASS  ${name}${attempt > 1 ? ` (attempt ${attempt})` : ""}`);
      return;
    } catch (error) {
      last = error;
      await context.close();
    }
  }
  fail += 1;
  console.log(`  FAIL  ${name}\n        ${last.message.split("\n").slice(0,3).join(" | ")}`);
}

/** Installs an interceptor and records every body posted to /api/subscribe. */
async function intercept(page, requests, handler) {
  await page.route("**/api/subscribe", async (route) => {
    requests.push(JSON.parse(route.request().postData() || "{}"));
    await handler(route);
  });
}

const ok = (route) =>
  route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({ ok: true }),
  });

/**
 * Waits for React to actually OWN the footer form, not merely for it to exist.
 *
 * `waitFor({ state: "visible" })` only proves the server-rendered HTML painted.
 * Between paint and hydration there is a dead zone -- measured at 242ms against
 * `next dev` and 12ms against a static export -- in which Playwright's clicks
 * and fills mutate the DOM but fire NO React handler. A fill in that window
 * sets the input's value without ever reaching React state, and a click never
 * records `firstInteraction` (footer.tsx:210-222). The submit is then judged
 * empty, or implausibly fast, by the spam gate at footer.tsx:64-73 -- so the
 * probe reported a footer bug that was really a race in the probe.
 *
 * React 19 tags hydrated nodes with __reactProps$/__reactFiber$ keys; their
 * presence is the earliest reliable "handlers are attached" signal.
 */
async function awaitHydration(page) {
  await page.waitForFunction(
    () => {
      const el = document.querySelector("#footer-email");
      return !!el && Object.keys(el).some((k) => k.startsWith("__react"));
    },
    { timeout: 30000 }
  );
}

async function openFooter(page) {
  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  const input = page.locator("#footer-email");
  await input.scrollIntoViewIfNeeded();
  await input.waitFor({ state: "visible", timeout: 20000 });
  await awaitHydration(page);                // else the click below is a no-op
  await input.click();                       // registers firstInteraction
  await page.waitForTimeout(MIN_FILL_MS + 300); // clear the human-pace gate NOW
  return input;
}

/** Fills and submits atomically, re-filling if a dev Fast Refresh wiped state. */
async function submitWith(page, input, value) {
  await input.fill(value);
  if ((await input.inputValue()) !== value) await input.fill(value);
  await page.getByRole("button", { name: "Subscribe to newsletter" }).click();
}

const footerText = (page) => page.locator("#footer").innerText();

console.log("\n=== CLIENT: SUCCESS PATH ===");
await check("valid email + confirmed 200 -> posts address, shows success", async (page, requests) => {
  await intercept(page, requests, ok);
  const input = await openFooter(page);
  await input.fill("subscriber@example.com");
  await page.waitForTimeout(MIN_FILL_MS + 200); // clear the human-pace gate
  await page.getByRole("button", { name: "Subscribe to newsletter" }).click();
  await page.locator(".ps-footer-signup-success").waitFor({ timeout: 12000 });

  assert.equal(requests.length, 1, `expected 1 POST, got ${requests.length}`);
  console.log(`        captured POST body: ${JSON.stringify(requests[0])}`);
  assert.equal(requests[0].email, "subscriber@example.com");
  assert.match(await footerText(page), new RegExp(SUCCESS));
});

console.log("\n=== CLIENT: FAILURE PATHS — success must NOT render ===");
await check("503 from server -> real error, NO success, address kept", async (page, requests) => {
  await intercept(page, requests, (route) =>
    route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({ ok: false, error: "Signup is not configured." }),
    })
  );
  const input = await openFooter(page);
  await submitWith(page, input, "kept@example.com");
  const err = page.locator("#footer-signup-error");
  await err.waitFor({ timeout: 12000 });

  assert.equal(requests.length, 1);
  const text = await footerText(page);
  assert.doesNotMatch(text, new RegExp(SUCCESS), "MUST NOT claim success on a 503");
  assert.match(await err.innerText(), /not configured/i);
  assert.equal(await input.inputValue(), "kept@example.com", "address must not be lost");
});

await check("network abort -> real error, NO success", async (page, requests) => {
  await intercept(page, requests, (route) => route.abort("failed"));
  const input = await openFooter(page);
  await submitWith(page, input, "netfail@example.com");
  await page.locator("#footer-signup-error").waitFor({ timeout: 12000 });

  const text = await footerText(page);
  assert.doesNotMatch(text, new RegExp(SUCCESS), "MUST NOT claim success when the request died");
  assert.match(text, /couldn't reach the server/i);
});

await check("200 but {ok:false} -> treated as failure, NO success", async (page, requests) => {
  await intercept(page, requests, (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: false, error: "Nope." }),
    })
  );
  const input = await openFooter(page);
  await submitWith(page, input, "liar@example.com");
  await page.locator("#footer-signup-error").waitFor({ timeout: 12000 });
  assert.doesNotMatch(await footerText(page), new RegExp(SUCCESS));
});

console.log("\n=== CLIENT: MALFORMED / EMPTY INPUT — must not even post ===");
await check("malformed address -> error, ZERO requests", async (page, requests) => {
  await intercept(page, requests, ok);
  const input = await openFooter(page);
  await submitWith(page, input, "not-an-email");
  await page.locator("#footer-signup-error").waitFor({ timeout: 12000 });

  assert.equal(requests.length, 0, "a malformed address must never be posted");
  assert.match(await footerText(page), /valid email address/i);
  assert.doesNotMatch(await footerText(page), new RegExp(SUCCESS));
});

await check("empty submit -> error, ZERO requests", async (page, requests) => {
  await intercept(page, requests, ok);
  const input = await openFooter(page);
  await page.getByRole("button", { name: "Subscribe to newsletter" }).click();
  await page.locator("#footer-signup-error").waitFor({ timeout: 12000 });

  assert.equal(requests.length, 0, "an empty submit must never be posted");
  assert.match(await footerText(page), /enter your email/i);
  assert.doesNotMatch(await footerText(page), new RegExp(SUCCESS));
});

console.log("\n=== CLIENT: BOT GATES — no fake success ===");
await check("instant submit -> asks to confirm, does NOT claim success", async (page, requests) => {
  await intercept(page, requests, ok);
  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  const input = page.locator("#footer-email");
  await input.scrollIntoViewIfNeeded();
  await input.waitFor({ state: "visible", timeout: 20000 });
  await awaitHydration(page);                // the gate can only trip once React listens
  await input.fill("fast@example.com");
  await page.getByRole("button", { name: "Subscribe to newsletter" }).click(); // no wait
  await page.locator("#footer-signup-error").waitFor({ timeout: 12000 });

  assert.equal(requests.length, 0, "the too-fast gate must not post");
  const text = await footerText(page);
  assert.match(text, /confirm you're human/i);
  assert.doesNotMatch(text, new RegExp(SUCCESS), "old code showed success here — that was the bug");

  // A human presses again and it goes through.
  await page.getByRole("button", { name: "Subscribe to newsletter" }).click();
  await page.locator(".ps-footer-signup-success").waitFor({ timeout: 12000 });
  assert.equal(requests.length, 1);
});

await check("double-click -> exactly ONE request", async (page, requests) => {
  await intercept(page, requests, async (route) => {
    await new Promise((r) => setTimeout(r, 600)); // hold it open to race the 2nd click
    await ok(route);
  });
  const input = await openFooter(page);
  await input.fill("double@example.com");
  const button = page.getByRole("button", { name: "Subscribe to newsletter" });
  await button.click();
  await button.click({ force: true, timeout: 2000 }).catch(() => {}); // disabled → ignored
  await page.locator(".ps-footer-signup-success").waitFor({ timeout: 15000 });
  assert.equal(requests.length, 1, `double-click sent ${requests.length} requests`);
});

console.log(`\n===== ${pass} passed, ${fail} failed =====`);
await browser.close();
process.exit(fail === 0 ? 0 : 1);
