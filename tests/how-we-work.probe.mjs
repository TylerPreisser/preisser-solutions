/**
 * Browser probe for the "How We Work" section directly below the hero (ADR-0025).
 *
 * One golden scenario per way of reaching it: a mouse on a desktop, a finger on a
 * phone, a keyboard. It drives the REAL built page and asserts what the owner asked
 * for on 2026-11-21: the three lines sit right under the hero in the hero's type,
 * each line shows its explanation on hover or tap, and the lines themselves do not
 * change when hovered ("make ti just hover and not change the color and stuff").
 * It also holds the three behaviours the accessibility audit asked for: a hovered
 * explanation stays while the pointer is on it, Escape closes it, and a tap
 * outside the lines closes it.
 *
 *   PS_TEST_BASE_URL=http://127.0.0.1:4321 node tests/how-we-work.probe.mjs
 */
import { createRequire } from "node:module";
import assert from "node:assert/strict";

const req = createRequire(import.meta.url);
const { chromium } = req("playwright");

const ORIGIN = (process.env.PS_TEST_BASE_URL || "http://127.0.0.1:3000").replace(/\/+$/, "");
const HOME = `${ORIGIN}/`;

// The owner's copy, verbatim (ADR-0025). A change here is a change to his words.
const LINES = ["Get to know your business.", "Build a custom solution.", "Stand behind it."];
const BODIES = [
  "We sit down with you to learn how we can add value for your business and what your goals are.",
  "World-class custom software at Fortune 500 grade, engineered for your business alone. It runs on a global edge network spanning 300+ cities, with AES-256 encryption, post-quantum secured connections and multi-factor sign-in, and the most advanced AI models wired directly into your data.",
  "We support and stand by every solution we build. If a bug turns up, we fix it. When you want it to do more, we expand it. As your business grows, your software grows with it.",
];
const BELIEF =
  "We believe in building long-term relationships with all of our clients, because we want your success to be our success.";

// Never skip: a probe pointed at nothing must not pass as a probe that passed.
try {
  const res = await fetch(HOME, { signal: AbortSignal.timeout(45000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
} catch (error) {
  console.error(`\nFAIL  no server at ${HOME} (${error.message})\n      PS_TEST_BASE_URL=http://127.0.0.1:<port> node tests/how-we-work.probe.mjs\n`);
  process.exit(1);
}

const browser = await chromium.launch();
let pass = 0;
let fail = 0;

async function check(name, contextOptions, fn) {
  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();
  try {
    await page.goto(HOME, { waitUntil: "load" });
    // Paint is not hydration: wait until React owns the first line's handlers.
    await page.waitForFunction(() => {
      const el = document.querySelector(".ps-how__line");
      return !!el && Object.keys(el).some((k) => k.startsWith("__react"));
    }, null, { timeout: 20000 });
    // The site sets `scroll-behavior: smooth` on <html>. A smooth scroll is still moving when the next
    // step starts, and it slides the other lines under a pointer that has not moved, which hovers them.
    // So scroll instantly, then wait until the page has stopped.
    await page.addStyleTag({ content: "html { scroll-behavior: auto !important; }" });
    await page.evaluate(() => {
      const top = document.querySelector("#how-we-work").getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: Math.max(0, top - 120), behavior: "instant" });
    });
    await page.waitForFunction(() => {
      const y = window.scrollY;
      if (window.__psLastY === y) { window.__psStill = (window.__psStill || 0) + 1; } else { window.__psStill = 0; window.__psLastY = y; }
      return window.__psStill >= 5;
    }, null, { polling: 100, timeout: 10000 });
    await fn(page);
    pass += 1;
    console.log(`  PASS  ${name}`);
  } catch (error) {
    fail += 1;
    console.log(`  FAIL  ${name}\n        ${String(error.message).split("\n").slice(0, 4).join(" | ")}`);
  } finally {
    await context.close();
  }
}

/** Visible to a person: laid out, opaque and not visibility:hidden. Polls through the fade. */
async function waitShown(page, selector, shown) {
  try {
    await waitShownRaw(page, selector, shown);
  } catch {
    const now = await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el) return "missing";
      const cs = getComputedStyle(el);
      return `display ${cs.display}, visibility ${cs.visibility}, opacity ${cs.opacity}`;
    }, selector);
    const active = await page.evaluate(() => document.querySelector("#how-we-work").getAttribute("data-active"));
    throw new Error(`${selector} should be ${shown ? "shown" : "hidden"} but is: ${now} (data-active=${active})`);
  }
}

async function waitShownRaw(page, selector, shown) {
  await page.waitForFunction(
    ([sel, want]) => {
      const el = document.querySelector(sel);
      if (!el) return false;
      const cs = getComputedStyle(el);
      const isShown = cs.visibility === "visible" && parseFloat(cs.opacity) > 0.99;
      const isHidden = cs.visibility === "hidden";
      return want ? isShown : isHidden;
    },
    [selector, shown],
    { timeout: 5000 }
  );
}

async function layout(page) {
  return page.evaluate(() => {
    const hero = document.querySelector(".ps-hero");
    let next = hero.nextElementSibling;
    while (next && (next.tagName !== "SECTION" || next.getBoundingClientRect().height === 0)) next = next.nextElementSibling;
    const box = document.querySelector(".ps-how .ps-container");
    const pad = parseFloat(getComputedStyle(box).paddingRight);
    const boxRect = box.getBoundingClientRect();
    return {
      nextSectionId: next ? next.id : null,
      heading: document.querySelector("#how-heading").textContent.replace(/\s+/g, " ").trim(),
      pageOverflow: document.documentElement.scrollWidth - window.innerWidth,
      contentLeft: boxRect.left + pad,
      contentRight: boxRect.right - pad,
      lines: [...document.querySelectorAll(".ps-how__line")].map((el) => {
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return { left: r.left, right: r.right, height: r.height, fontSize: parseFloat(cs.fontSize), color: cs.color, opacity: cs.opacity };
      }),
      heroFontSize: parseFloat(getComputedStyle(document.querySelector(".ps-hero-headline")).fontSize),
    };
  });
}

function assertLayout(l, label) {
  assert.equal(l.nextSectionId, "how-we-work", `${label}: the section right after the hero must be #how-we-work`);
  assert.equal(l.heading, LINES.join(" "), `${label}: the heading must read the owner's three lines`);
  assert.ok(l.pageOverflow <= 0, `${label}: the page scrolls sideways by ${l.pageOverflow}px`);
  l.lines.forEach((line, i) => {
    assert.ok(line.height < line.fontSize * 1.6, `${label}: line ${i + 1} wrapped (${line.height}px tall at ${line.fontSize}px)`);
    assert.ok(line.left >= l.contentLeft - 0.5, `${label}: line ${i + 1} overruns the content box on the left by ${(l.contentLeft - line.left).toFixed(1)}px`);
    assert.ok(Math.abs(line.right - l.contentRight) <= 1, `${label}: line ${i + 1} is not on the right edge (${line.right} vs ${l.contentRight})`);
  });
}

await check("desktop mouse: under the hero, hero-sized, hover shows the explanation and changes nothing else",
  { viewport: { width: 1440, height: 900 } },
  async (page) => {
    const rest = await layout(page);
    assertLayout(rest, "1440");
    assert.equal(rest.lines[0].fontSize, rest.heroFontSize, "at 1440 the lines must be the hero's exact size");
    await waitShown(page, ".ps-how__rest", true);
    assert.equal((await page.locator(".ps-how__belief").innerText()).replace(/\s+/g, " ").trim(), BELIEF);
    for (let i = 0; i < 3; i += 1) {
      await page.locator(".ps-how__line").nth(i).hover();
      await waitShown(page, `#how-step-${i}`, true);
      await waitShown(page, ".ps-how__rest", false);
      assert.equal((await page.locator(`#how-step-${i} .ps-how__body`).innerText()).replace(/\s+/g, " ").trim(), BODIES[i]);
      const during = await layout(page);
      during.lines.forEach((line, k) => {
        assert.equal(line.color, rest.lines[k].color, `hovering line ${i + 1} changed the colour of line ${k + 1}`);
        assert.equal(line.opacity, rest.lines[k].opacity, `hovering line ${i + 1} changed the opacity of line ${k + 1}`);
      });
    }
    // The explanation must survive the pointer moving onto it (WCAG 1.4.13), and Escape must dismiss it.
    await page.locator("#how-step-2 .ps-how__body").hover();
    await page.waitForTimeout(600);
    await waitShown(page, "#how-step-2", true);
    await page.keyboard.press("Escape");
    await waitShown(page, "#how-step-2", false);
    await waitShown(page, ".ps-how__rest", true);
    // Leaving the SECTION is what returns it to rest.
    await page.locator(".ps-how__line").nth(0).hover();
    await waitShown(page, "#how-step-0", true);
    await page.locator(".ps-hero-headline").hover();
    await waitShown(page, "#how-step-0", false);
    await waitShown(page, ".ps-how__rest", true);
  });

await check("phone touch: one line each, no sideways scroll, tap opens and closes",
  { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, hasTouch: true, isMobile: true },
  async (page) => {
    assertLayout(await layout(page), "390");
    await page.locator(".ps-how__line").nth(1).tap();
    await waitShown(page, "#how-step-1", true);
    await waitShown(page, ".ps-how__rest", false);
    await page.locator(".ps-how__line").nth(2).tap();
    await waitShown(page, "#how-step-2", true);
    await waitShown(page, "#how-step-1", false);
    await page.locator(".ps-how__line").nth(2).tap();
    await waitShown(page, "#how-step-2", false);
    await waitShown(page, ".ps-how__rest", true);
    // A tap anywhere outside the three lines closes an open explanation.
    await page.locator(".ps-how__line").nth(0).tap();
    await waitShown(page, "#how-step-0", true);
    await page.locator(".ps-how__eyebrow").tap();
    await waitShown(page, "#how-step-0", false);
    await waitShown(page, ".ps-how__rest", true);
  });

await check("small phone: 320px wide still fits every line",
  { viewport: { width: 320, height: 568 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true },
  async (page) => {
    const l = await layout(page);
    assertLayout(l, "320");
    l.lines.forEach((line, i) => assert.ok(line.height >= 24, `320: line ${i + 1} is a ${line.height}px tap target, under 24px`));
  });

await check("keyboard: Enter opens a line and says so, Enter closes it",
  { viewport: { width: 1280, height: 800 } },
  async (page) => {
    const first = page.locator(".ps-how__line").first();
    await first.focus();
    assert.equal(await first.getAttribute("aria-expanded"), "false");
    await page.keyboard.press("Enter");
    await waitShown(page, "#how-step-0", true);
    assert.equal(await first.getAttribute("aria-expanded"), "true");
    await page.keyboard.press("Enter");
    await waitShown(page, "#how-step-0", false);
    assert.equal(await first.getAttribute("aria-expanded"), "false");
  });

await browser.close();
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
