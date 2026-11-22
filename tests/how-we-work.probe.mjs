/**
 * Browser probe for the "How We Work" section directly below the hero (ADR-0026).
 *
 * It drives the REAL built page and asserts what the owner asked for on 2026-11-21:
 * "Make it jusy the three with no description then scroll reactive that shows
 * description for the 1st then the 2nd then the 3rd. Each should glow as u go."
 *
 * And: "it has to stay flawless but it also needs to bet the smoothest possible
 * scroll reactive."
 *
 * So: the section arrives as the three lines and nothing else; while the reader
 * scrolls, the block holds still, a light travels down the lines, each line turns
 * the primary blue with a glow in turn, and that line's explanation (his words,
 * verbatim) is the only one showing; a last beat shows the relationship sentence;
 * scrolling back up undoes it. The change is SCRUBBED by the scroll (many
 * in-between values, never a jump, never two texts at once), and when the reader
 * stops part way it SETTLES on a clean beat. On every size the lines and the
 * showing text fit on one screen. With no JavaScript, and on a screen too short
 * to pin a block on, everything is simply laid out to read.
 *
 *   PS_TEST_BASE_URL=http://127.0.0.1:4321 node tests/how-we-work.probe.mjs
 */
import { createRequire } from "node:module";
import assert from "node:assert/strict";

const req = createRequire(import.meta.url);
const { chromium } = req("playwright");

const ORIGIN = (process.env.PS_TEST_BASE_URL || "http://127.0.0.1:3000").replace(/\/+$/, "");
const HOME = `${ORIGIN}/`;

// The owner's copy, verbatim (ADR-0026). A change here is a change to his words.
const LINES = ["Get to know your business.", "Build a custom solution.", "Stand behind it."];
const BODIES = [
  "We sit down with you to learn how we can add value for your business and what your goals are.",
  "World-class custom software at Fortune 500 grade, engineered for your business alone. It runs on a global edge network spanning 300+ cities, with AES-256 encryption, post-quantum secured connections and multi-factor sign-in, and the most advanced AI models wired directly into your data.",
  "We support and stand by every solution we build. If a bug turns up, we fix it. When you want it to do more, we expand it. As your business grows, your software grows with it.",
];
const BELIEF =
  "We believe in building long-term relationships with all of our clients, because we want your success to be our success.";
const CLOSING = 3;

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
    if (contextOptions.javaScriptEnabled !== false) {
      // Paint is not hydration: wait until React owns the section.
      await page.waitForFunction(() => {
        const el = document.querySelector("#how-we-work");
        return !!el && Object.keys(el).some((k) => k.startsWith("__react"));
      }, null, { timeout: 20000 });
      // The site sets `scroll-behavior: smooth` on <html>; a smooth scroll is still moving when the
      // next step measures. Scroll instantly instead.
      await page.addStyleTag({ content: "html { scroll-behavior: auto !important; }" });
    }
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

/** Where the track is and how long each beat is, from the page's own geometry. */
async function track(page) {
  return page.evaluate(() => {
    const section = document.querySelector("#how-we-work");
    const pin = section.querySelector(".ps-how__pin");
    const top = section.getBoundingClientRect().top + window.scrollY;
    const travel = section.offsetHeight - pin.offsetHeight;
    return { top, travel, beat: travel / 4, lead: window.innerHeight * 0.18, vh: window.innerHeight, position: getComputedStyle(pin).position };
  });
}

async function scrollTo(page, y) {
  await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
  // 140ms until the reader counts as stopped, then the picture eases to rest.
  await page.waitForTimeout(1100);
}

async function read(page) {
  return page.evaluate(() => {
    const section = document.querySelector("#how-we-work");
    const hero = document.querySelector(".ps-hero");
    let next = hero.nextElementSibling;
    while (next && (next.tagName !== "SECTION" || next.getBoundingClientRect().height === 0)) next = next.nextElementSibling;
    const box = section.querySelector(".ps-container");
    const pad = parseFloat(getComputedStyle(box).paddingRight);
    const boxRect = box.getBoundingClientRect();
    const text = (el) => el.innerText.replace(/\s+/g, " ").trim();
    const steps = [...section.querySelectorAll(".ps-how__step")].map((el) => {
      const r = el.getBoundingClientRect();
      return { opacity: parseFloat(getComputedStyle(el).opacity), top: r.top, bottom: r.bottom, text: text(el.querySelector(".ps-how__body, .ps-how__belief")) };
    });
    const headline = section.querySelector(".ps-how__headline").getBoundingClientRect();
    return {
      nextSectionId: next ? next.id : null,
      step: section.getAttribute("data-step"),
      sectionHeight: section.offsetHeight,
      pageOverflow: document.documentElement.scrollWidth - window.innerWidth,
      contentLeft: boxRect.left + pad,
      contentRight: boxRect.right - pad,
      headlineTop: headline.top,
      headlineBottom: headline.bottom,
      navBottom: document.querySelector("header").getBoundingClientRect().bottom,
      vh: window.innerHeight,
      lines: [...section.querySelectorAll(".ps-how__line")].map((el) => {
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        const lit = getComputedStyle(el, "::after");
        return {
          text: text(el), left: r.left, right: r.right, top: r.top, bottom: r.bottom, height: r.height, fontSize: parseFloat(cs.fontSize),
          // The lit copy of the line that is faded in over it, and the words underneath.
          lit: parseFloat(lit.opacity), litColor: lit.color, glow: lit.textShadow !== "none",
          ink: parseFloat(getComputedStyle(el.querySelector(".ps-how__ink")).opacity),
        };
      }),
      light: (() => {
        const el = section.querySelector(".ps-how__light");
        const r = el.getBoundingClientRect();
        return { opacity: parseFloat(getComputedStyle(el).opacity), centre: r.top + r.height / 2 };
      })(),
      steps,
      heroFontSize: parseFloat(getComputedStyle(document.querySelector(".ps-hero-headline")).fontSize),
      primary: (() => {
        const probe = document.createElement("span");
        probe.style.color = "var(--color-primary)";
        document.body.appendChild(probe);
        const c = getComputedStyle(probe).color;
        probe.remove();
        return c;
      })(),
    };
  });
}

function assertLayout(s, label) {
  assert.equal(s.nextSectionId, "how-we-work", `${label}: the section right after the hero is not #how-we-work`);
  assert.deepEqual(s.lines.map((l) => l.text), LINES, `${label}: the three lines are not the owner's words`);
  assert.ok(s.pageOverflow <= 0, `${label}: the page scrolls sideways by ${s.pageOverflow}px`);
  s.lines.forEach((line, i) => {
    assert.ok(line.height < line.fontSize * 1.6, `${label}: line ${i + 1} wrapped onto more than one line`);
    assert.ok(line.left >= s.contentLeft - 0.5, `${label}: line ${i + 1} runs off the left of the content box`);
    assert.ok(Math.abs(line.right - s.contentRight) <= 1, `${label}: line ${i + 1} is not flush right`);
  });
}

/** The whole story, top to bottom and back, on one screen size. */
async function story(page, label) {
  const t = await track(page);
  assert.equal(t.position, "sticky", `${label}: the block is not pinned`);
  assert.ok(t.travel > t.vh, `${label}: the track gives only ${Math.round(t.travel)}px of scrolling for four beats`);

  // Arriving: the three lines and nothing else.
  await scrollTo(page, t.top - t.vh * 0.55);
  const arriving = await read(page);
  assertLayout(arriving, label);
  assert.equal(arriving.step, null, `${label}: a beat is already showing while the section is still arriving`);
  assert.ok(arriving.steps.every((s) => s.opacity < 0.01), `${label}: text is showing under the three lines before any scrolling`);
  assert.ok(arriving.lines.every((l) => l.lit < 0.01 && l.ink > 0.99), `${label}: a line is lit or stepped back before any scrolling`);
  assert.ok(arriving.light.opacity < 0.01, `${label}: the light is on before any scrolling`);

  // Each line in turn.
  let pinnedTop = null;
  for (let i = 0; i < 3; i += 1) {
    await scrollTo(page, t.top - t.lead + t.beat * (i + 0.5));
    const s = await read(page);
    assert.equal(s.step, String(i), `${label}: beat ${i + 1} did not select line ${i + 1}`);
    s.lines.forEach((line, k) => {
      if (k === i) {
        assert.ok(line.lit > 0.99, `${label}: line ${k + 1} is not lit on its beat (${line.lit})`);
        assert.equal(line.litColor, s.primary, `${label}: line ${k + 1} is not lit in the primary blue`);
        assert.ok(line.glow, `${label}: line ${k + 1} does not glow on its beat`);
      } else {
        assert.ok(line.lit < 0.01, `${label}: line ${k + 1} is lit on line ${i + 1}'s beat (${line.lit})`);
        assert.ok(line.ink <= 0.6, `${label}: line ${k + 1} did not step back on line ${i + 1}'s beat`);
      }
    });
    assert.ok(s.light.opacity > 0.9, `${label}: the light is not on for line ${i + 1}`);
    assert.ok(s.light.centre > s.lines[i].top && s.light.centre < s.lines[i].bottom, `${label}: the light is not on line ${i + 1}`);
    s.steps.forEach((st, k) => {
      if (k === i) assert.ok(st.opacity > 0.99, `${label}: explanation ${k + 1} is not showing on its beat`);
      else assert.ok(st.opacity < 0.01, `${label}: explanation or sentence ${k + 1} is showing on line ${i + 1}'s beat`);
    });
    assert.equal(s.steps[i].text, BODIES[i], `${label}: explanation ${i + 1} is not the owner's copy`);
    // Held still, clear of the header, and all of it on screen.
    if (pinnedTop === null) pinnedTop = s.headlineTop;
    assert.ok(Math.abs(s.headlineTop - pinnedTop) <= 1, `${label}: the lines moved ${Math.round(s.headlineTop - pinnedTop)}px between beats`);
    assert.ok(s.headlineTop >= s.navBottom, `${label}: the lines sit under the header`);
    assert.ok(s.steps[i].bottom <= s.vh, `${label}: explanation ${i + 1} runs ${Math.round(s.steps[i].bottom - s.vh)}px off the bottom of the screen`);
    assertLayout(s, `${label} beat ${i + 1}`);
  }

  // The last beat: the relationship sentence, beside the hero's own look.
  await scrollTo(page, t.top - t.lead + t.beat * 3.5);
  const closing = await read(page);
  assert.equal(closing.step, String(CLOSING), `${label}: the last beat was not reached`);
  assert.ok(closing.steps[CLOSING].opacity > 0.99, `${label}: the relationship sentence is not showing on the last beat`);
  assert.equal(closing.steps[CLOSING].text, BELIEF, `${label}: the relationship sentence is not the owner's copy`);
  assert.ok(closing.steps.slice(0, 3).every((s) => s.opacity < 0.01), `${label}: an explanation is still showing on the last beat`);
  assert.ok(closing.lines[2].lit > 0.99, `${label}: the third line is not lit on the last beat`);
  assert.ok(closing.lines.slice(0, 2).every((l) => l.lit < 0.01 && l.ink > 0.99), `${label}: the first two lines did not come back to full strength`);
  assert.ok(Math.abs(closing.headlineTop - pinnedTop) <= 1, `${label}: the lines moved on the last beat`);
  assert.ok(closing.steps[CLOSING].bottom <= closing.vh, `${label}: the relationship sentence runs off the bottom of the screen`);

  // Smooth: going from line 1 to line 2 a little at a time, the picture passes through many in-between
  // values (it is scrubbed, not switched), line 2 only ever gets brighter on the way, and no two texts
  // are ever on screen together.
  await scrollTo(page, t.top - t.lead + t.beat * 0.5);
  const samples = await page.evaluate(async ({ from, to }) => {
    const section = document.querySelector("#how-we-work");
    const lines = [...section.querySelectorAll(".ps-how__line")];
    const texts = [...section.querySelectorAll(".ps-how__step")];
    const frame = () => new Promise((r) => requestAnimationFrame(() => r()));
    const out = [];
    for (let i = 1; i <= 60; i += 1) {
      window.scrollTo({ top: from + ((to - from) * i) / 60, behavior: "instant" });
      await frame();
      await frame();
      out.push({
        lit: lines.map((l) => parseFloat(getComputedStyle(l, "::after").opacity)),
        text: texts.map((e) => parseFloat(getComputedStyle(e).opacity)),
      });
    }
    return out;
  }, { from: t.top - t.lead + t.beat * 0.5, to: t.top - t.lead + t.beat * 1.5 });
  const between = new Set(samples.map((x) => x.lit[1]).filter((v) => v > 0.03 && v < 0.97).map((v) => v.toFixed(2)));
  assert.ok(between.size >= 6, `${label}: line 2 lit up in ${between.size} in-between steps; it is switching, not following the scroll`);
  for (let i = 1; i < samples.length; i += 1) {
    assert.ok(samples[i].lit[1] >= samples[i - 1].lit[1] - 0.001, `${label}: line 2 flickered on the way up (${samples[i - 1].lit[1]} then ${samples[i].lit[1]})`);
    assert.ok(Math.abs(samples[i].lit[1] - samples[i - 1].lit[1]) < 0.34, `${label}: line 2 jumped by ${Math.abs(samples[i].lit[1] - samples[i - 1].lit[1]).toFixed(2)} in one frame`);
  }
  samples.forEach((x, i) => {
    assert.ok(x.text.filter((v) => v > 0.05).length <= 1, `${label}: two texts are on screen together at sample ${i} (${x.text.join(", ")})`);
  });

  // Flawless at rest: stop exactly on the boundary between two lines and the picture settles on one
  // clean beat by itself, without the page moving.
  const boundary = t.top - t.lead + t.beat * 1.0;
  await scrollTo(page, boundary);
  const settled = await read(page);
  assert.ok(settled.lines.every((l) => l.lit < 0.01 || l.lit > 0.99), `${label}: a line is half lit at rest (${settled.lines.map((l) => l.lit).join(", ")})`);
  assert.equal(settled.lines.filter((l) => l.lit > 0.99).length, 1, `${label}: not exactly one line is lit at rest`);
  assert.ok(settled.steps.every((s) => s.opacity < 0.01 || s.opacity > 0.99), `${label}: a text is half faded at rest (${settled.steps.map((s) => s.opacity).join(", ")})`);
  assert.equal(settled.steps.filter((s) => s.opacity > 0.99).length, 1, `${label}: not exactly one text is showing at rest`);
  assert.ok(Math.abs((await page.evaluate(() => window.scrollY)) - boundary) <= 1, `${label}: settling moved the page`);

  // Scrolling back up undoes it.
  await scrollTo(page, t.top - t.lead + t.beat * 0.5);
  assert.equal((await read(page)).step, "0", `${label}: scrolling back up did not return to line 1`);
  await scrollTo(page, t.top - t.vh * 0.55);
  const back = await read(page);
  assert.equal(back.step, null, `${label}: scrolling back above the section left a beat showing`);
  assert.ok(back.steps.every((s) => s.opacity < 0.01), `${label}: text is still showing after scrolling back above the section`);

  // And the page carries on to Services after the track.
  await scrollTo(page, t.top + t.travel + t.vh);
  const services = await page.evaluate(() => {
    const el = document.querySelector(".ps-services-header h2");
    return el ? el.getBoundingClientRect().top : null;
  });
  assert.ok(services !== null && services < t.vh, `${label}: Services is not on screen one screen after the track ends`);
  return arriving;
}

await check("desktop: three lines alone, then each lights up with its explanation as the page scrolls",
  { viewport: { width: 1440, height: 900 } },
  async (page) => {
    const s = await story(page, "1440");
    // The hero's own type, at the hero's own size on a desktop.
    assert.ok(Math.abs(s.lines[0].fontSize - s.heroFontSize) <= 0.5, `1440: headline is ${s.lines[0].fontSize}px, the hero's is ${s.heroFontSize}px`);
  });

await check("phone: the same story, and everything fits on one screen",
  { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, hasTouch: true, isMobile: true },
  async (page) => {
    await story(page, "390");
  });

await check("small phone: 320 by 568 still fits the lines and the longest explanation",
  { viewport: { width: 320, height: 568 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true },
  async (page) => {
    await story(page, "320");
  });

await check("phone on its side: too short to pin, so everything is laid out to read",
  { viewport: { width: 844, height: 390 }, deviceScaleFactor: 3, hasTouch: true, isMobile: true },
  async (page) => {
    const t = await track(page);
    assert.equal(t.position, "static", "844x390: the block is pinned on a screen too short to hold it");
    await scrollTo(page, t.top);
    const s = await read(page);
    assertLayout(s, "844x390");
    assert.equal(s.step, null, "844x390: a beat was set in the stacked layout");
    assert.ok(s.steps.every((st) => st.opacity > 0.99), "844x390: some of the text is hidden in the stacked layout");
    assert.deepEqual(s.steps.map((st) => st.text), [...BODIES, BELIEF], "844x390: the stacked text is not the owner's copy in order");
    for (let i = 1; i < s.steps.length; i += 1) {
      assert.ok(s.steps[i].top >= s.steps[i - 1].bottom, `844x390: text ${i + 1} overlaps text ${i}`);
    }
  });

await check("no JavaScript: all the words are there to read, with no empty scrolling",
  { viewport: { width: 1280, height: 800 }, javaScriptEnabled: false },
  async (page) => {
    const s = await read(page);
    assert.deepEqual(s.lines.map((l) => l.text), LINES, "no JS: the three lines are missing");
    assert.ok(s.steps.every((st) => st.opacity > 0.99), "no JS: some of the text is hidden");
    assert.deepEqual(s.steps.map((st) => st.text), [...BODIES, BELIEF], "no JS: the text is not the owner's copy in order");
    assert.ok(s.sectionHeight < s.vh * 1.8, `no JS: the section is ${s.sectionHeight}px tall with nothing to drive it`);
  });

await browser.close();
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
