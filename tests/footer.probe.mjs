/**
 * Browser probe for the site footer.
 *
 * The footer has no email signup: no "Stay up to date" heading, no email field,
 * no Subscribe button, nothing classed ps-footer-signup*. What it does carry
 * (logo, three-part tagline, location, email link, copyright, five links) must
 * still be there, and the page must not scroll sideways.
 *
 * Base URL: PS_TEST_BASE_URL (a built export), default the dev server.
 */
import { createRequire } from "node:module";
import assert from "node:assert/strict";
const req = createRequire(import.meta.url);
const { chromium } = req("playwright");

const ORIGIN = (process.env.PS_TEST_BASE_URL || "http://127.0.0.1:3000").replace(/\/+$/, "");
const PATHS = ["/", "/services", "/privacy"];
const VIEWPORTS = [
  { name: "393x852", width: 393, height: 852, mobile: true },
  { name: "1440x900", width: 1440, height: 900, mobile: false },
];

// A stale server answers 200 like a fresh one. Fail loudly if nothing is there.
let lastError;
let up = false;
for (let attempt = 1; attempt <= 3 && !up; attempt += 1) {
  try {
    const res = await fetch(`${ORIGIN}/privacy`, { signal: AbortSignal.timeout(45000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    up = true;
  } catch (error) {
    lastError = error;
    await new Promise((r) => setTimeout(r, 2000));
  }
}
if (!up) {
  console.error(`FAIL  no server at ${ORIGIN} (${lastError.message})`);
  process.exit(1);
}

const browser = await chromium.launch();
let failures = 0;
try {
  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vp.mobile ? 3 : 1,
      isMobile: vp.mobile,
      hasTouch: vp.mobile,
    });
    for (const path of PATHS) {
      const label = `${path} @ ${vp.name}`;
      const page = await context.newPage();
      try {
        await page.goto(`${ORIGIN}${path}`, { waitUntil: "load", timeout: 120000 });
        const footer = page.locator("footer#footer");
        await footer.waitFor({ state: "attached", timeout: 120000 });
        const facts = await page.evaluate(() => {
          const f = document.querySelector("footer#footer");
          const text = f.textContent || "";
          const links = [...f.querySelectorAll(".ps-footer-legal a")].map((a) => a.textContent.trim());
          return {
            text,
            hasStay: /stay up to date/i.test(text),
            emailInputs: f.querySelectorAll('input[type="email"], input[name="email"], form').length,
            subscribeButtons: [...f.querySelectorAll("button, [role=button], input[type=submit]")]
              .filter((b) => /subscribe/i.test(b.textContent || b.value || b.getAttribute("aria-label") || "")).length,
            signupClass: f.querySelectorAll('[class*="ps-footer-signup"]').length,
            logo: !!f.querySelector("img.ps-footer-logo-img"),
            taglineLines: [...f.querySelectorAll(".ps-footer-tagline-line")].map((s) => s.textContent.trim()),
            location: (f.querySelector(".ps-footer-location") || {}).textContent || "",
            mail: (f.querySelector('a[href^="mailto:"]') || {}).textContent || "",
            copy: (f.querySelector(".ps-footer-copy") || {}).textContent || "",
            links,
            overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          };
        });
        assert.equal(facts.hasStay, false, 'footer text contains "Stay up to date"');
        assert.equal(facts.emailInputs, 0, "footer has an email input or a form");
        assert.equal(facts.subscribeButtons, 0, "footer has a Subscribe button");
        assert.equal(facts.signupClass, 0, "footer has an element classed ps-footer-signup*");
        assert.ok(facts.logo, "footer logo missing");
        assert.equal(facts.taglineLines.length, 3, `tagline should have 3 parts, got ${facts.taglineLines.length}`);
        assert.match(facts.location, /Hays, Kansas/);
        assert.match(facts.mail, /@preissersolutions\.com$/);
        assert.match(facts.copy, /©\s*\d{4}.*All Rights Reserved\./);
        assert.deepEqual(facts.links, ["Products", "Locations", "Privacy", "Terms", "Site Map"]);
        assert.ok(facts.overflowX <= 0, `horizontal scroll of ${facts.overflowX}px`);
        console.log(`ok    ${label}`);
      } catch (error) {
        failures += 1;
        console.error(`FAIL  ${label}: ${error.message.split("\n")[0]}`);
      } finally {
        await page.close();
      }
    }
    await context.close();
  }
} finally {
  await browser.close();
}
if (failures) {
  console.error(`\n${failures} footer check(s) failed`);
  process.exit(1);
}
console.log("\nfooter probe: all checks passed");
