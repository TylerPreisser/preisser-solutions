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
 * The motion's arithmetic is proved at every scroll position, frame rate and kind
 * of scrolling by tests/how-we-work-motion.probe.mjs, with no browser. This file
 * proves the other half: that a real browser lays it out and paints what that
 * arithmetic says.
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

// The first page a fresh headless Chromium opens can stall for a minute or more before it paints (its
// main thread waits on the GPU process starting, measured on this machine on production and on the
// build alike), which used to time out whichever check ran first. Open one throwaway page and wait
// for it before any check starts.
{
  const warm = await browser.newContext();
  const wp = await warm.newPage();
  await wp.goto(HOME, { waitUntil: "load" });
  await wp.waitForFunction(() => {
    const el = document.querySelector("#how-we-work");
    return !!el && Object.keys(el).some((k) => k.startsWith("__react"));
  }, null, { timeout: 300000 });
  await warm.close();
}
let pass = 0;
let fail = 0;

// PS_TEST_ONLY=<words from a check's name> runs just the checks whose name has those words, for
// working on one of them. The gate runs them all.
const ONLY = (process.env.PS_TEST_ONLY || "").toLowerCase();

async function check(name, contextOptions, fn) {
  if (ONLY && !name.toLowerCase().includes(ONLY)) return;
  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();
  try {
    await page.goto(HOME, { waitUntil: "load" });
    if (contextOptions.javaScriptEnabled !== false) {
      // Paint is not hydration: wait until React owns the section.
      await page.waitForFunction(() => {
        const el = document.querySelector("#how-we-work");
        return !!el && Object.keys(el).some((k) => k.startsWith("__react"));
      }, null, { timeout: 120000 });
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
  // 140ms until the reader counts as stopped, then the picture eases to rest. The section says when
  // it is still moving (data-moving), so this waits for the fact instead of guessing a time.
  // Frames, not a fixed time: on a busy machine the scroll may not have been delivered to the page
  // 260ms later, and a read before the section has even started moving proves nothing.
  await page.evaluate(() => new Promise((done) => {
    let left = 4;
    const next = () => (left-- > 0 ? requestAnimationFrame(next) : done());
    next();
  }));
  await page.waitForFunction(() => !document.querySelector("#how-we-work").hasAttribute("data-moving"), null, { timeout: 12000 });
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
      eyebrowBottom: section.querySelector(".ps-how__eyebrow").getBoundingClientRect().bottom,
      belief: (() => {
        const el = section.querySelector(".ps-how__belief");
        const step = el.closest(".ps-how__step");
        const r = el.getBoundingClientRect();
        return { align: getComputedStyle(el).textAlign, left: r.left, right: r.right, stepTransform: getComputedStyle(step).transform };
      })(),
      vh: window.innerHeight,
      lines: [...section.querySelectorAll(".ps-how__line")].map((el) => {
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        const glow = getComputedStyle(el, "::after");
        const fill = el.querySelector(".ps-how__fill");
        const fillIn = el.querySelector(".ps-how__fill-in");
        // The blue words are drawn inside a window (the band). How much of the line that window is
        // NOT over: 0 when it covers the whole line, 1 when it is clear of it.
        const win = fill ? fill.getBoundingClientRect() : null;
        const over = win ? Math.max(0, Math.min(win.bottom, r.bottom) - Math.max(win.top, r.top)) / r.height : 0;
        const off = 1 - over;
        return {
          text: text(el.querySelector(".ps-how__ink")), left: r.left, right: r.right, top: r.top, bottom: r.bottom, height: r.height, fontSize: parseFloat(cs.fontSize),
          // How much of the line the light covers, the colour of the lit words, and the words underneath.
          lit: parseFloat(glow.opacity), band: off, litColor: fillIn ? getComputedStyle(fillIn).color : "", glow: glow.textShadow !== "none",
          litText: fillIn ? getComputedStyle(fillIn, "::after").content.replace(/^"|"$/g, "").replace(/" \/ ""$/, "") : "",
          ink: parseFloat(getComputedStyle(el.querySelector(".ps-how__ink")).opacity),
          opacity: parseFloat(cs.opacity), transform: cs.transform,
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

/** After a key press (which scrolls smoothly): wait for the page, then the picture, to come to rest. */
async function restedAfterKey(page) {
  await page.evaluate(() => { window.__psY = undefined; window.__psStill = 0; });
  await page.waitForTimeout(250);
  await page.waitForFunction(() => {
    const y = window.scrollY;
    if (window.__psY === y) window.__psStill = (window.__psStill || 0) + 1;
    else { window.__psStill = 0; window.__psY = y; }
    return window.__psStill >= 4;
  }, null, { polling: 100, timeout: 10000 });
  await page.waitForFunction(() => !document.querySelector("#how-we-work").hasAttribute("data-moving"), null, { timeout: 8000 });
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
        assert.ok(line.band < 0.01, `${label}: the band of light is ${(line.band * 100).toFixed(0)}% of a line off line ${k + 1} on its beat`);
        assert.equal(line.litColor, s.primary, `${label}: line ${k + 1} is not lit in the primary blue`);
        assert.ok(line.litText.startsWith(LINES[k]), `${label}: the lit copy of line ${k + 1} reads "${line.litText}"`);
        assert.ok(line.glow, `${label}: line ${k + 1} does not glow on its beat`);
      } else {
        assert.ok(line.lit < 0.01, `${label}: line ${k + 1} is lit on line ${i + 1}'s beat (${line.lit})`);
        assert.ok(line.band > 0.99, `${label}: part of line ${k + 1} is still blue on line ${i + 1}'s beat`);
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

  // The last beat (ADR-0032): the relationship sentence alone, where the lines were. No light, the lines gone.
  await scrollTo(page, t.top - t.lead + t.beat * 3.5);
  const closing = await read(page);
  assert.equal(closing.step, String(CLOSING), `${label}: the last beat was not reached`);
  assert.ok(closing.steps[CLOSING].opacity > 0.99, `${label}: the relationship sentence is not showing on the last beat`);
  assert.equal(closing.steps[CLOSING].text, BELIEF, `${label}: the relationship sentence is not the owner's copy`);
  assert.ok(closing.steps.slice(0, 3).every((s) => s.opacity < 0.01), `${label}: an explanation is still showing on the last beat`);
  assert.ok(closing.lines.every((l) => l.lit < 0.001 && l.band > 0.999), `${label}: a line is still lit on the last beat (${closing.lines.map((l) => l.lit).join(", ")})`);
  assert.ok(closing.light.opacity < 0.001, `${label}: the light is still on (${closing.light.opacity}) on the last beat`);
  assert.ok(closing.lines.every((l) => l.opacity < 0.001), `${label}: a line still shows on the last beat (${closing.lines.map((l) => l.opacity).join(", ")})`);
  assert.ok(Math.abs(closing.headlineTop - pinnedTop) <= 1, `${label}: the block moved on the last beat`);
  assert.ok(closing.steps[CLOSING].bottom <= closing.vh, `${label}: the relationship sentence runs off the bottom of the screen`);
  assert.ok(closing.steps[CLOSING].top >= closing.eyebrowBottom, `${label}: the relationship sentence runs up into the label`);

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

await check("the glow stays close to the lit words (owner: \"a bit tighter around the words\")",
  { viewport: { width: 1440, height: 900 } },
  async (page) => {
    // Owner, 2026-11-22, looking at the live page: "The glow needs to be a bit tighter around the
    // words but that's all iI would chnage". It reached 1.3 times the line's width and 3 times its
    // height then. Each line in turn: the light behind it is no more than a fifth wider than the line
    // and no more than 2.2 times its height.
    const t = await track(page);
    for (let k = 0; k < 3; k += 1) {
      await scrollTo(page, t.top + (k + 0.45) * t.beat - t.lead);
      const g = await page.evaluate((k) => {
        const line = document.querySelectorAll(".ps-how__line")[k].getBoundingClientRect();
        const light = document.querySelector(".ps-how__light").getBoundingClientRect();
        return { wide: light.width / line.width, high: light.height / line.height, off: Math.abs(light.top + light.height / 2 - line.top - line.height / 2) / line.height };
      }, k);
      assert.ok(g.wide <= 1.2, `line ${k + 1}: the glow is ${g.wide.toFixed(2)} times as wide as the words`);
      assert.ok(g.high <= 2.2, `line ${k + 1}: the glow is ${g.high.toFixed(2)} times as tall as the words`);
      assert.ok(g.off < 0.05, `line ${k + 1}: the glow is not centred on the words`);
    }
  });

await check("laptop windows (1366 by 625, 1280 by 580): the type sizes to the height and nothing is cut",
  { viewport: { width: 1366, height: 625 } },
  async (page) => {
    await story(page, "1366x625");
    await page.setViewportSize({ width: 1280, height: 580 });
    await page.waitForTimeout(400);
    await story(page, "1280x580");
  });

await check("keyboard: Space and PageDown show every explanation in turn, then leave the section",
  { viewport: { width: 1440, height: 900 } },
  async (page) => {
    const t = await track(page);
    await scrollTo(page, t.top - t.lead + t.beat * 0.4);
    assert.equal((await read(page)).step, "0", "keys: not on line 1 to begin with");
    const rested = () => restedAfterKey(page);
    for (const [key, want] of [["PageDown", "1"], ["Space", "2"], ["PageDown", "3"]]) {
      await page.keyboard.press(key);
      await rested();
      const s = await read(page);
      assert.equal(s.step, want, `keys: ${key} went to beat ${Number(s.step) + 1}, not beat ${Number(want) + 1}`);
      assert.ok(s.steps[Number(want)].opacity > 0.99, `keys: after ${key} explanation ${Number(want) + 1} is not showing`);
    }
    await page.keyboard.press("Shift+Space");
    await rested();
    assert.equal((await read(page)).step, "2", "keys: Shift+Space did not go back one beat");
    await page.keyboard.press("PageDown");
    await rested();
    // From the last beat the key is the browser's again: it pages on to Services.
    const before = await page.evaluate(() => window.scrollY);
    await page.keyboard.press("PageDown");
    await rested();
    const moved = (await page.evaluate(() => window.scrollY)) - before;
    assert.ok(moved > t.beat * 1.2, `keys: PageDown on the last beat moved ${Math.round(moved)}px, so the reader cannot page out of the section`);
  });

await check("keyboard from the hero: Space or PageDown from anywhere above the section never skips the first explanation",
  { viewport: { width: 1440, height: 900 } },
  async (page) => {
    for (const [w, h] of [[1440, 900], [1366, 625]]) {
      await page.setViewportSize({ width: w, height: h });
      await page.waitForTimeout(400);
      const t = await track(page);
      // Starts all the way down the hero, as fractions of its height. 0.5 to 0.8 is where a page used to
      // carry the reader past line 1; 0.67 to 0.77 is where line 1 used to light with its explanation
      // still cut off by the bottom of the window, so the key counted it as read.
      const starts = [0, 0.33, 0.5, 0.6, 0.67, 0.69, 0.71, 0.74, 0.77, 0.8, 0.85];
      for (let i = 0; i < starts.length; i += 1) {
        const y = Math.round(t.top * starts[i]);
        const key = i % 2 ? "Space" : "PageDown";
        // Arrive the way a reader does: from the top, coming DOWN, and pause there.
        await scrollTo(page, 0);
        await scrollTo(page, y);
        const first = await read(page);
        const seen = [];
        if (first.step !== null) {
          // A line is lit already. Then its explanation must be there to read, all of it.
          assert.equal(first.step, "0", `hero keys ${w}x${h}: beat ${Number(first.step) + 1} is showing at ${y}px before any key`);
          assert.ok(first.steps[0].opacity > 0.99 && first.steps[0].bottom <= first.vh, `hero keys ${w}x${h}: at ${y}px line 1 is lit but its explanation ends ${Math.round(first.steps[0].bottom - first.vh)}px below the window`);
          seen.push("0");
        }
        for (let presses = 0; presses < 8; presses += 1) {
          const before = await page.evaluate(() => window.scrollY);
          await page.keyboard.press(key);
          await restedAfterKey(page);
          const after = await page.evaluate(() => window.scrollY);
          assert.ok(after - before <= t.vh * 0.875 + 2, `hero keys ${w}x${h}: ${key} from ${Math.round(before)}px scrolled ${Math.round(after - before)}px, more than a page`);
          if (after > t.top + t.travel) break;
          const s = await read(page);
          if (s.step !== null && seen[seen.length - 1] !== s.step) {
            seen.push(s.step);
            const text = s.steps[Number(s.step)];
            assert.ok(text.opacity > 0.99 && text.bottom <= s.vh, `hero keys ${w}x${h}: beat ${Number(s.step) + 1} is not showing in full after ${key} from ${y}px`);
          }
        }
        assert.deepEqual(seen, ["0", "1", "2", "3"], `hero keys ${w}x${h}: ${key} from ${y}px down the page showed beats ${seen.map((k) => Number(k) + 1).join(", ")}`);
      }
      // And back up from below the section: Shift+Space lands on the last beat, then walks up.
      await scrollTo(page, t.top + t.travel + t.vh * 0.6);
      const seen = [];
      for (let presses = 0; presses < 8; presses += 1) {
        const before = await page.evaluate(() => window.scrollY);
        await page.keyboard.press("Shift+Space");
        await restedAfterKey(page);
        const after = await page.evaluate(() => window.scrollY);
        assert.ok(before - after <= t.vh * 0.875 + 2, `hero keys ${w}x${h}: Shift+Space from ${Math.round(before)}px scrolled ${Math.round(before - after)}px, more than a page`);
        const s = await read(page);
        if (s.step === null) break;
        if (seen[seen.length - 1] !== s.step) seen.push(s.step);
      }
      assert.deepEqual(seen, ["3", "2", "1", "0"], `hero keys ${w}x${h}: Shift+Space from below the section showed beats ${seen.map((k) => Number(k) + 1).join(", ")}`);
    }
  });

await check("a wobble back after stopping just past a line: the picture stays on the next line until the reader really turns",
  { viewport: { width: 1440, height: 900 } },
  async (page) => {
    const t = await track(page);
    await page.mouse.move(700, 450);
    for (const k of [0, 1]) {
      await scrollTo(page, t.top - t.lead + t.beat * (k + 0.5));
      // Wheel down in small ticks to a few pixels past where line k+1 starts to leave, and stop.
      const lineEnd = t.top - t.lead + t.beat * (k + 0.7);
      const stop = lineEnd + 4;
      const y = () => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => r(window.scrollY))));
      for (let i = 0; i < 200 && (await y()) < stop; i += 1) await page.mouse.wheel(0, (await y()) < stop - 12 ? 8 : 2);
      await scrollTo(page, await y());
      const at = await y();
      assert.ok(at >= stop && at <= stop + 4, `wobble: the wheel stopped at ${at}px, not just past ${Math.round(stop)}px`);
      assert.equal((await read(page)).step, String(k + 1), `wobble: stopping just past line ${k + 1} did not settle on line ${k + 2}`);
      // The wobble: a few pixels back, which puts the page inside the first line's own stretch again.
      const back = Math.ceil(at - lineEnd) + 3;
      await page.mouse.wheel(0, -back);
      await page.waitForTimeout(60);
      await scrollTo(page, await y());
      assert.ok((await y()) < lineEnd, `wobble: ${back}px back did not cross into line ${k + 1}'s own stretch`);
      const wobbled = await read(page);
      assert.equal(wobbled.step, String(k + 1), `wobble: ${back}px back sent the picture from line ${k + 2} to line ${Number(wobbled.step) + 1}`);
      assert.ok(wobbled.steps[k + 1].opacity > 0.99, `wobble: explanation ${k + 2} is not showing after the wobble`);
      // A real turn back up does go back.
      await page.mouse.wheel(0, -100);
      await page.waitForTimeout(60);
      await scrollTo(page, await page.evaluate(() => window.scrollY));
      assert.equal((await read(page)).step, String(k), `wobble: really scrolling back up did not return to line ${k + 1}`);
    }
  });

await check("a quick flick past a line (five fast wheel notches): the explanation in between never shows on the way",
  { viewport: { width: 1440, height: 900 } },
  async (page) => {
    const t = await track(page);
    await page.mouse.move(700, 450);
    for (const [from, delta, passed, lands, what] of [[0.5, 120, 1, "2", "down"], [2.5, -120, 1, "0", "up"]]) {
      await scrollTo(page, t.top - t.lead + t.beat * from);
      await page.evaluate(() => {
        const texts = [...document.querySelectorAll("#how-we-work .ps-how__step")];
        window.__psPeaks = texts.map(() => 0);
        window.__psFrames = 0;
        window.__psSampling = true;
        const tick = () => {
          if (!window.__psSampling) return;
          window.__psFrames += 1;
          texts.forEach((e, k) => { window.__psPeaks[k] = Math.max(window.__psPeaks[k], parseFloat(getComputedStyle(e).opacity)); });
          requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
      // Let the starting text be seen at full by the sampler, then flick.
      await page.waitForTimeout(120);
      for (let n = 0; n < 5; n += 1) await page.mouse.wheel(0, delta);
      await page.waitForTimeout(200);
      await page.waitForFunction(() => !document.querySelector("#how-we-work").hasAttribute("data-moving"), null, { timeout: 12000 });
      await page.waitForTimeout(200);
      const { peaks, frames } = await page.evaluate(() => { window.__psSampling = false; return { peaks: window.__psPeaks, frames: window.__psFrames }; });
      const s = await read(page);
      assert.ok(frames > 20, `flick ${what}: only ${frames} frames were sampled`);
      assert.equal(s.step, lands, `flick ${what}: it landed on beat ${Number(s.step) + 1}, so this flick does not pass over a line (scrollY ${await page.evaluate(() => window.scrollY)})`);
      assert.ok(peaks[passed] < 0.05, `flick ${what}: the passed-over explanation ${passed + 1} showed at ${(peaks[passed] * 100).toFixed(0)}% on the way`);
    }
  });

await check("a brisk steady scroll: no explanation is ever left hanging part way up",
  { viewport: { width: 1440, height: 900 } },
  async (page) => {
    const t = await track(page);
    for (const [w, h] of [[1440, 900], [390, 844]]) {
      await page.setViewportSize({ width: w, height: h });
      await page.waitForTimeout(400);
      const g = await track(page);
      for (const speed of [2.25, 2.5, 2.75, 3]) {
        for (const way of [1, -1]) {
          const from = way === 1 ? g.top - g.vh * 0.7 : g.top + g.travel + g.vh * 0.4;
          const to = way === 1 ? g.top + g.travel + g.vh * 0.4 : g.top - g.vh * 0.7;
          await scrollTo(page, from);
          // The page's own clock drives the scroll, so the speed is real whatever the frame rate.
          const worst = await page.evaluate(({ from, to, pxPerMs }) => new Promise((done) => {
            const texts = [...document.querySelectorAll("#how-we-work .ps-how__step")];
            const start = performance.now();
            const length = Math.abs(to - from);
            let last = null;
            const since = texts.map(() => null);
            let worst = { ms: 0 };
            const tick = (now) => {
              const gone = Math.min(length, (now - start) * pxPerMs);
              window.scrollTo({ top: from + Math.sign(to - from) * gone, behavior: "instant" });
              const shown = texts.map((e) => parseFloat(getComputedStyle(e).opacity));
              shown.forEach((v, k) => {
                // Frozen: the same part-way strength as last frame, while the page is scrolling steadily
                // (it always is here). In a steady scroll a text is coming, full, going or gone; never parked.
                const still = last !== null && gone < length && Math.abs(v - last[k]) < 1e-4 && v > 0.03 && v < 0.97;
                if (!still) since[k] = null;
                else {
                  if (since[k] === null) since[k] = now;
                  if (now - since[k] > worst.ms) worst = { ms: now - since[k], text: k + 1, at: v };
                }
              });
              last = shown;
              if (gone < length) requestAnimationFrame(tick);
              else done(worst);
            };
            requestAnimationFrame(tick);
          }), { from, to, pxPerMs: (speed * g.beat) / 1000 });
          assert.ok(worst.ms < 100, `brisk ${w}x${h}: at ${speed} beats a second ${way === 1 ? "down" : "up"}, explanation ${worst.text} sat at ${Math.round((worst.at || 0) * 100)}% for ${Math.round(worst.ms)}ms`);
        }
      }
    }
    assert.ok(t.travel > 0);
  });

await check("keyboard with focus on a header link: the page keys still move one beat at a time",
  { viewport: { width: 1440, height: 900 } },
  async (page) => {
    const t = await track(page);
    // Real Tab presses (a script's focus() is not what a keyboard reader has) until a header link has focus.
    let onLink = false;
    for (let i = 0; i < 8 && !onLink; i += 1) {
      await page.keyboard.press("Tab");
      onLink = await page.evaluate(() => {
        const el = document.activeElement;
        return !!el && el.tagName === "A" && !!el.closest("header");
      });
    }
    assert.ok(onLink, "focus keys: Tab never reached a link in the header");
    await scrollTo(page, t.top - t.lead + t.beat * 0.4);
    assert.equal((await read(page)).step, "0", "focus keys: not on line 1 to begin with");
    for (const [key, want] of [["PageDown", "1"], ["Space", "2"], ["PageUp", "1"], ["Shift+Space", "0"]]) {
      await page.keyboard.press(key);
      await restedAfterKey(page);
      const s = await read(page);
      assert.equal(s.step, want, `focus keys: with a header link focused, ${key} went to beat ${s.step === null ? "none" : Number(s.step) + 1}, not beat ${Number(want) + 1}`);
    }
    assert.ok(await page.evaluate(() => document.activeElement.tagName === "A"), "focus keys: the link lost focus");
  });

await check("a slow mouse wheel (one notch, a pause, the next): nothing that was fading ever comes back",
  { viewport: { width: 1440, height: 900 } },
  async (page) => {
    const t = await track(page);
    for (const pause of [240, 320, 420]) {
      await scrollTo(page, t.top - t.vh * 0.5);
      await page.mouse.move(700, 450);
      await page.evaluate(() => {
        const section = document.querySelector("#how-we-work");
        const lines = [...section.querySelectorAll(".ps-how__line")];
        const texts = [...section.querySelectorAll(".ps-how__step")];
        window.__psSamples = [];
        window.__psSampling = true;
        const tick = () => {
          if (!window.__psSampling) return;
          window.__psSamples.push({
            y: window.scrollY,
            lit: lines.map((l) => parseFloat(getComputedStyle(l, "::after").opacity)),
            text: texts.map((e) => parseFloat(getComputedStyle(e).opacity)),
          });
          requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
      const notches = Math.ceil((t.travel + t.vh * 0.9) / 100);
      for (let n = 0; n < notches; n += 1) {
        await page.mouse.wheel(0, 100);
        await page.waitForTimeout(pause);
      }
      const samples = await page.evaluate(() => { window.__psSampling = false; return window.__psSamples; });
      const moved = samples[samples.length - 1].y - samples[0].y;
      assert.ok(moved > t.travel, `slow wheel: the wheel only moved the page ${Math.round(moved)}px (${pause}ms)`);
      assert.ok(samples.length > notches * 4, `slow wheel: only ${samples.length} frames were sampled (${pause}ms)`);
      // Each explanation and each of the first two lines comes up, then goes: once it has started
      // to go it must only ever keep going. And on the way up it must only ever keep coming.
      const series = [
        ...[0, 1, 2].map((k) => [`explanation ${k + 1}`, samples.map((x) => x.text[k])]),
        ...[0, 1].map((k) => [`line ${k + 1}'s light`, samples.map((x) => x.lit[k])]),
      ];
      for (const [name, values] of series) {
        const peak = values.findIndex((v) => v > 0.99);
        assert.ok(peak >= 0, `slow wheel: ${name} never came fully up (${pause}ms)`);
        let high = 0;
        for (let i = 0; i <= peak; i += 1) {
          assert.ok(values[i] >= high - 0.03, `slow wheel: ${name} dipped from ${high.toFixed(2)} to ${values[i].toFixed(2)} on its way up (${pause}ms between notches)`);
          high = Math.max(high, values[i]);
        }
        let low = 1;
        for (let i = peak; i < values.length; i += 1) {
          assert.ok(values[i] <= low + 0.03, `slow wheel: ${name} came back from ${low.toFixed(2)} to ${values[i].toFixed(2)} after it had started to go (${pause}ms between notches)`);
          low = Math.min(low, values[i]);
        }
        assert.ok(low < 0.01, `slow wheel: ${name} never went (${pause}ms)`);
      }
      samples.forEach((x, i) => {
        assert.ok(x.text.filter((v) => v > 0.05).length <= 1, `slow wheel: two texts are on screen together at frame ${i} (${pause}ms)`);
      });
    }
  });

await check("a reader's own text spacing (WCAG 1.4.12): nothing is cut off, at desktop and phone size",
  { viewport: { width: 1440, height: 900 } },
  async (page) => {
    for (const [w, h] of [[1440, 900], [390, 844]]) {
      await page.setViewportSize({ width: w, height: h });
      await page.addStyleTag({ content: "#how-we-work * { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; }" });
      await page.waitForTimeout(500);
      const t = await track(page);
      if (t.position === "sticky") {
        // Still on the track: then every beat must still fit.
        for (let i = 0; i < 4; i += 1) {
          await scrollTo(page, t.top - t.lead + t.beat * (i + 0.5));
          const s = await read(page);
          assert.ok(s.headlineTop >= s.navBottom, `${w}: with text spacing the lines sit under the header`);
          assert.ok(s.steps[i].bottom <= s.vh, `${w}: with text spacing text ${i + 1} runs ${Math.round(s.steps[i].bottom - s.vh)}px off the screen`);
        }
      } else {
        // Stacked: everything is laid out to read, nothing hidden or overlapping.
        const s = await read(page);
        assert.ok(s.steps.every((st) => st.opacity > 0.99), `${w}: with text spacing some text is hidden in the stacked layout`);
        for (let i = 1; i < s.steps.length; i += 1) {
          assert.ok(s.steps[i].top >= s.steps[i - 1].bottom, `${w}: with text spacing text ${i + 1} overlaps text ${i}`);
        }
        assert.ok(s.pageOverflow <= 0, `${w}: with text spacing the page scrolls sideways by ${s.pageOverflow}px`);
      }
    }
  });

await check("a window that grows taller again: a section the script had to lay out flat goes back to the scroll story",
  { viewport: { width: 1440, height: 1400 } },
  async (page) => {
    await page.addStyleTag({ content: "#how-we-work * { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; }" });
    await page.waitForTimeout(500);
    const state = () => page.evaluate(() => {
      const section = document.querySelector("#how-we-work");
      return { stacked: section.getAttribute("data-stacked"), position: getComputedStyle(section.querySelector(".ps-how__pin")).position };
    });
    assert.deepEqual(await state(), { stacked: null, position: "sticky" }, "taller: with text spacing a 1440 by 1400 window does not hold the block to begin with");
    // Only the height changes. The wide-spaced lines no longer fit, so the script lays the section out flat.
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(500);
    assert.deepEqual(await state(), { stacked: "true", position: "static" }, "taller: at 1440 by 900 with text spacing the section was not laid out flat, so this proves nothing");
    // Laid out flat by the script after it had been drawing the entrance: every line is back to fully there.
    const flat = await page.evaluate(() => [...document.querySelectorAll("#how-we-work .ps-how__line")].map((l) => ({ opacity: getComputedStyle(l).opacity, transform: getComputedStyle(l).transform })));
    assert.ok(flat.every((l) => l.opacity === "1" && l.transform === "none"), `taller: laid out flat, a line is still faded or moved by the entrance (${JSON.stringify(flat)})`);
    // And the closing sentence is back where the flat layout puts it: on the left, unmoved (ADR-0032 is the track's alone).
    const sentence = await page.evaluate(() => { const b = document.querySelector("#how-we-work .ps-how__belief"); return { align: getComputedStyle(b).textAlign, step: getComputedStyle(b.closest(".ps-how__step")).transform }; });
    assert.ok((sentence.align === "left" || sentence.align === "start") && sentence.step === "none", `taller: laid out flat, the closing sentence is still set as on the track (${JSON.stringify(sentence)})`);
    await page.setViewportSize({ width: 1440, height: 1400 });
    await page.waitForTimeout(500);
    assert.deepEqual(await state(), { stacked: null, position: "sticky" }, "taller: the window grew back to 1400 tall and the section stayed laid out flat");
    const t = await track(page);
    await scrollTo(page, t.top - t.lead + t.beat * 1.5);
    assert.equal((await read(page)).step, "1", "taller: back on the track, the second beat does not show");
  });

await check("a phone's toolbar sliding away mid-scroll (resize events while scrolling) never makes the picture jump",
  { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, hasTouch: true, isMobile: true },
  async (page) => {
    const t = await track(page);
    const from = t.top - t.lead + t.beat * 0.5;
    const to = t.top - t.lead + t.beat * 3.5;
    await scrollTo(page, from);
    const lit = await page.evaluate(async ({ from, to }) => {
      const lines = [...document.querySelectorAll("#how-we-work .ps-how__line")];
      const frame = () => new Promise((r) => requestAnimationFrame(() => r()));
      const out = [];
      for (let i = 1; i <= 240; i += 1) {
        window.scrollTo({ top: from + ((to - from) * i) / 240, behavior: "instant" });
        if (i % 12 === 0) window.dispatchEvent(new Event("resize"));
        await frame();
        out.push(lines.map((l) => parseFloat(getComputedStyle(l, "::after").opacity)));
      }
      return out;
    }, { from, to });
    let jump = 0;
    const between = new Set();
    for (let i = 1; i < lit.length; i += 1) {
      for (let k = 0; k < 3; k += 1) {
        jump = Math.max(jump, Math.abs(lit[i][k] - lit[i - 1][k]));
        if (lit[i][k] > 0.03 && lit[i][k] < 0.97) between.add(`${k}:${lit[i][k].toFixed(2)}`);
      }
    }
    assert.ok(jump < 0.34, `toolbar: a line's light changed by ${jump.toFixed(2)} in one frame when a resize arrived mid-scroll`);
    assert.ok(between.size >= 60, `toolbar: the light passed through only ${between.size} in-between values; it is jumping, not following the scroll`);
  });

// ADR-0031. The owner, 2026-11-22, from his iPhone: "When I initially scroll down from hero the text there kinda
// jerks in at least initially let it animate in and etc scroll animation all that stuff". Recorded frame by frame
// on the build before (agent-reports/ps-site-1122/hww-entrance): each line was at full strength the very first
// frame it was on screen, at every size and in every engine.
/** Scroll from `from` to `to` a few px a frame (a finger that keeps moving) and read every frame. */
async function scrub(page, from, to, px) {
  return page.evaluate(async ({ from, to, px }) => {
    const section = document.querySelector("#how-we-work");
    const pin = section.querySelector(".ps-how__pin");
    const lines = [...section.querySelectorAll(".ps-how__line")];
    const frame = () => new Promise((r) => requestAnimationFrame(() => r()));
    const ty = (tf) => (tf && tf !== "none" ? parseFloat(tf.split(",")[5]) : 0);
    const out = [];
    const n = Math.max(1, Math.ceil(Math.abs(to - from) / px));
    for (let i = 0; i <= n; i += 1) {
      window.scrollTo({ top: from + ((to - from) * i) / n, behavior: "instant" });
      await frame();
      out.push({
        y: window.scrollY,
        pinTop: pin.getBoundingClientRect().top,
        step: section.getAttribute("data-step"),
        light: parseFloat(getComputedStyle(section.querySelector(".ps-how__light")).opacity),
        lines: lines.map((l) => {
          const cs = getComputedStyle(l);
          return { top: l.getBoundingClientRect().top, offsetTop: l.offsetTop, opacity: parseFloat(cs.opacity), ty: ty(cs.transform), lit: parseFloat(getComputedStyle(l, "::after").opacity) };
        }),
      });
    }
    return out;
  }, { from, to, px });
}

for (const [label, ctx] of [
  ["393 by 659", { viewport: { width: 393, height: 659 }, deviceScaleFactor: 3, hasTouch: true, isMobile: true }],
  ["1440 by 900", { viewport: { width: 1440, height: 900 } }],
]) {
  await check(`${label}: from the hero, the three lines come in with the scroll (never cut in), staggered, all in before the light, and back out going up`, ctx, async (page) => {
    const t = await track(page);
    await scrollTo(page, 0);
    const down = await scrub(page, 0, t.top - t.lead, 4);
    for (let k = 0; k < 3; k += 1) {
      const i = down.findIndex((f) => f.lines[k].top < t.vh - 1);
      assert.ok(i >= 0, `${label}: line ${k + 1} never came on screen`);
      const first = down[i].lines[k];
      assert.ok(first.opacity < 0.05, `${label}: line ${k + 1} was at full strength (${first.opacity}) the first frame it was on screen: it cuts in with no entrance`);
      const between = new Set(down.map((f) => f.lines[k].opacity).filter((v) => v > 0.03 && v < 0.97).map((v) => v.toFixed(2)));
      assert.ok(between.size >= 12, `${label}: line ${k + 1} came in through only ${between.size} in-between strengths; it is switched, not scrubbed`);
      const tys = down.map((f) => f.lines[k].ty);
      assert.ok(Math.max(...tys) >= 12 && Math.max(...tys) <= 40, `${label}: line ${k + 1} rises ${Math.max(...tys).toFixed(1)}px; a quiet entrance is a few tens of px`);
      for (let j = 1; j < down.length; j += 1) {
        assert.ok(down[j].lines[k].opacity >= down[j - 1].lines[k].opacity - 0.001, `${label}: line ${k + 1} went back out on the way down (${down[j - 1].lines[k].opacity} then ${down[j].lines[k].opacity})`);
        assert.equal(down[j].lines[k].offsetTop, down[0].lines[k].offsetTop, `${label}: line ${k + 1} moved in the layout during the entrance (it must be transform and opacity only)`);
      }
    }
    // Staggered: when the first line is half in, the third is behind it.
    const half = down.find((f) => f.lines[0].opacity >= 0.5);
    assert.ok(half.lines[2].opacity < half.lines[0].opacity - 0.15, `${label}: the lines come in together, not one after another (${half.lines.map((l) => l.opacity).join(", ")})`);
    // All in, at rest in place, before the light or a beat and before the block is held.
    for (const f of down) {
      if (f.light > 0.001 || f.step !== null || f.pinTop <= 0.5 || f.lines.some((l) => l.lit > 0.001)) {
        assert.ok(f.lines.every((l) => l.opacity > 0.999 && Math.abs(l.ty) < 0.05), `${label}: at y=${f.y} the light or the hold started before the lines were in (${f.lines.map((l) => `${l.opacity}/${l.ty}`).join(", ")})`);
      }
    }
    assert.ok(down.at(-1).lines.every((l) => l.opacity > 0.999), `${label}: the lines are not all in where the first line starts to light`);
    // And back up into the hero: they go back out.
    await scrub(page, t.top - t.lead, 0, 12);
    await scrollTo(page, 0);
    const top = await scrub(page, 0, 0, 1);
    assert.ok(top[0].lines.every((l) => l.opacity < 0.001), `${label}: back at the top, the lines did not go back out (${top[0].lines.map((l) => l.opacity).join(", ")})`);
  });
}

// Found on the first version of the entrance (agent-reports/ps-site-1122/hww-entrance, rec-new/batch4): the thumb
// rested while the third line was still below the window, the picture settled on (ADR-0027) and finished the whole
// entrance, and the third line then scrolled into view already at full strength, at 393 by 659 and 820 by 1180.
for (const [label, ctx] of [
  ["393 by 659", { viewport: { width: 393, height: 659 }, deviceScaleFactor: 3, hasTouch: true, isMobile: true }],
  ["820 by 1180", { viewport: { width: 820, height: 1180 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true }],
  ["1280 by 800", { viewport: { width: 1280, height: 800 } }],
]) {
  await check(`${label}: short strokes from the hero with a rest after each: no line ever comes on screen already at full strength`, ctx, async (page) => {
    const t = await track(page);
    await scrollTo(page, 0);
    const seen = [false, false, false];
    const step = t.beat * 0.07;
    for (let y = 0; y < t.top - t.lead; y += step) {
      const frames = await scrub(page, y, Math.min(y + step, t.top - t.lead), 4);
      for (const f of frames) {
        f.lines.forEach((l, k) => {
          if (!seen[k] && l.top < t.vh - 1) {
            seen[k] = true;
            assert.ok(l.opacity < 0.05, `${label}: line ${k + 1} came on screen at y=${f.y.toFixed(0)} already at ${l.opacity} after a rest further up: it was brought in while it was below the window`);
          }
        });
      }
      await page.waitForFunction(() => !document.querySelector("#how-we-work").hasAttribute("data-moving"), null, { timeout: 12000 });
    }
    assert.ok(seen.every(Boolean), `${label}: not every line came on screen`);
  });
}

await check("a reader who stops part way through the lines' entrance: they finish coming in (going down) or go back out (going up), never left part way",
  { viewport: { width: 393, height: 659 }, deviceScaleFactor: 3, hasTouch: true, isMobile: true },
  async (page) => {
    const t = await track(page);
    // Half way through the entrance (u = -0.35: the first line nearly in, the third about a third of the way).
    const mid = t.top - t.lead - t.beat * 0.35;
    await scrollTo(page, 0);
    await scrub(page, 0, mid, 6);
    await page.waitForFunction(() => !document.querySelector("#how-we-work").hasAttribute("data-moving"), null, { timeout: 12000 });
    const down = (await scrub(page, mid, mid, 1))[0];
    assert.ok(down.lines.every((l) => l.opacity > 0.999 && Math.abs(l.ty) < 0.05), `stopped part way in on the way down: lines at ${down.lines.map((l) => `${l.opacity}/${l.ty.toFixed(1)}px`).join(", ")}`);
    assert.equal(down.step, null, "stopped part way into the entrance: a beat lit");
    assert.ok(Math.abs(down.y - mid) <= 1, "settling moved the page");
    // Now a little way back up (more than a wobble) and stop.
    const up = mid - t.beat * 0.25;
    await scrub(page, mid, up, 6);
    await page.waitForFunction(() => !document.querySelector("#how-we-work").hasAttribute("data-moving"), null, { timeout: 12000 });
    const back = (await scrub(page, up, up, 1))[0];
    assert.ok(back.lines.every((l) => l.opacity < 0.001), `stopped part way on the way back up: lines at ${back.lines.map((l) => `${l.opacity}/${l.ty.toFixed(1)}px`).join(", ")}`);
  });

await check("reduced motion: the lines are simply there, at full strength and in place, all the way in from the hero",
  { viewport: { width: 393, height: 659 }, deviceScaleFactor: 3, hasTouch: true, isMobile: true, reducedMotion: "reduce" },
  async (page) => {
    const t = await track(page);
    await scrollTo(page, 0);
    const down = await scrub(page, 0, t.top - t.lead, 10);
    for (const f of down) {
      assert.ok(f.lines.every((l) => l.opacity > 0.999 && l.ty === 0), `reduced motion: at y=${f.y} a line is at ${f.lines.map((l) => `${l.opacity}/${l.ty}px`).join(", ")}`);
    }
  });

// Safari's toolbar slides away (or back) and the window's inner height changes by about 190px while the page
// itself scrolls by one pixel. Before this fix the beat position was worked out from window.innerHeight, so that
// alone moved it about a tenth of a beat: a reader resting near the end of the first line was carried on to
// the second line, and one resting near its start was sent back above the section, with no scroll at all.
for (const [label, ctx, at, to] of [
  ["toolbar sliding away (659 to 852 inner height)", { viewport: { width: 393, height: 659 }, deviceScaleFactor: 3, hasTouch: true, isMobile: true }, 0.64, 852],
  ["toolbar coming back (852 to 659 inner height)", { viewport: { width: 393, height: 852 }, deviceScaleFactor: 3, hasTouch: true, isMobile: true }, 0.25, 659],
]) {
  await check(`a phone's ${label} with a 1px scroll: the picture stays exactly where it is`, ctx, async (page) => {
    const t = await track(page);
    // Placed from the block's own height (100svh), which the toolbar does not change.
    const svh = await page.evaluate(() => document.querySelector("#how-we-work .ps-how__pin").getBoundingClientRect().height);
    const y = t.top - svh * 0.18 + t.beat * at;
    await scrollTo(page, y - t.beat * 0.3);
    await scrollTo(page, y);
    const before = await read(page);
    assert.equal(before.step, "0", `${label}: not resting on the first line to begin with`);
    await page.evaluate(async (h) => {
      const real = Object.getOwnPropertyDescriptor(Window.prototype, "innerHeight") || Object.getOwnPropertyDescriptor(window, "innerHeight");
      const from = window.innerHeight;
      for (let i = 1; i <= 4; i += 1) {
        const v = Math.round(from + ((h - from) * i) / 4);
        Object.defineProperty(window, "innerHeight", { configurable: true, get: () => v });
        window.dispatchEvent(new Event("resize"));
        await new Promise((r) => requestAnimationFrame(() => r()));
      }
      void real;
      // A real toolbar slides because the page is being scrolled: away on the way down, back on the way up.
      // One pixel of that scroll, so the section reads the reader's position again as it would on a phone.
      window.scrollBy({ top: h > from ? 1 : -1, behavior: "instant" });
    }, to);
    await page.evaluate(() => new Promise((done) => { let n = 8; const f = () => (n-- > 0 ? requestAnimationFrame(f) : done()); f(); }));
    await page.waitForTimeout(400);
    await page.waitForFunction(() => !document.querySelector("#how-we-work").hasAttribute("data-moving"), null, { timeout: 12000 });
    const after = await read(page);
    assert.equal(after.step, before.step, `${label}: the beat changed from ${before.step} to ${after.step} on a 1px scroll`);
    after.lines.forEach((l, k) => assert.ok(Math.abs(l.lit - before.lines[k].lit) < 0.01, `${label}: line ${k + 1}'s light moved from ${before.lines[k].lit} to ${l.lit} on a 1px scroll`));
    after.steps.forEach((st, k) => assert.ok(Math.abs(st.opacity - before.steps[k].opacity) < 0.01, `${label}: text ${k + 1} went from ${before.steps[k].opacity} to ${st.opacity} on a 1px scroll`));
  });
}


// ADR-0032. The owner, 2026-11-23, from his iPhone: "By the time it animates to the 4th thing that comes in the glow
// should have animated out and the 3 right aligned phrases maybe have animated out as the last sentence or whatever
// calling it comes in". On the build before, the light only dimmed to 55% on the last beat and the three lines came
// back to full strength and stayed above the sentence.
/** Scroll from `from` to `to` a few px a frame and read the hand-over on every painted frame. */
async function handScrub(page, from, to, px) {
  return page.evaluate(async ({ from, to, px }) => {
    const section = document.querySelector("#how-we-work");
    const lines = [...section.querySelectorAll(".ps-how__line")];
    const steps = [...section.querySelectorAll(".ps-how__step")];
    const light = section.querySelector(".ps-how__light");
    const eyebrow = section.querySelector(".ps-how__eyebrow");
    const frame = () => new Promise((r) => requestAnimationFrame(() => r()));
    const ty = (tf) => (tf && tf !== "none" ? parseFloat(tf.split(",")[5]) : 0);
    const box = (r) => ({ top: r.top, bottom: r.bottom, left: r.left, right: r.right });
    const out = [];
    const n = Math.max(1, Math.ceil(Math.abs(to - from) / px));
    for (let i = 0; i <= n; i += 1) {
      window.scrollTo({ top: from + ((to - from) * i) / n, behavior: "instant" });
      await frame();
      out.push({
        y: window.scrollY,
        light: parseFloat(getComputedStyle(light).opacity),
        eyebrow: box(eyebrow.getBoundingClientRect()),
        lines: lines.map((l) => {
          const r = l.getBoundingClientRect();
          const win = l.querySelector(".ps-how__fill").getBoundingClientRect();
          const over = Math.max(0, Math.min(win.bottom, r.bottom) - Math.max(win.top, r.top)) / r.height;
          return { ...box(r), opacity: parseFloat(getComputedStyle(l).opacity), ty: ty(getComputedStyle(l).transform), lit: parseFloat(getComputedStyle(l, "::after").opacity), band: 1 - over };
        }),
        texts: steps.map((e) => parseFloat(getComputedStyle(e).opacity)),
        // The words of the sentence, not its grid cell: that is what must not overlap a line.
        sentence: box(section.querySelector(".ps-how__belief").getBoundingClientRect()),
      });
    }
    return out;
  }, { from, to, px });
}

const rested = (page) => page.waitForFunction(() => !document.querySelector("#how-we-work").hasAttribute("data-moving"), null, { timeout: 12000 });
const overlapPx = (a, b) => Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)) * (Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) > 0 ? 1 : 0);
/** What a frame of the hand-over paints, as numbers, for comparing the way down with the way up. */
const handTuple = (f, riseBy) => [f.light, ...f.lines.map((l) => l.opacity), ...f.lines.map((l) => l.lit), ...f.lines.map((l) => l.ty / riseBy), f.texts[CLOSING], f.texts[2]];
function nearestOnCurve(point, curve) {
  let best = Infinity;
  for (let i = 1; i < curve.length; i += 1) {
    const a = curve[i - 1];
    const b = curve[i];
    // Distance (largest component) from the point to the segment a-b, by the closest parameter along it.
    let num = 0;
    let den = 0;
    for (let j = 0; j < a.length; j += 1) { num += (point[j] - a[j]) * (b[j] - a[j]); den += (b[j] - a[j]) ** 2; }
    const m = den === 0 ? 0 : Math.min(1, Math.max(0, num / den));
    best = Math.min(best, Math.max(...point.map((v, j) => Math.abs(v - (a[j] + (b[j] - a[j]) * m)))));
  }
  return best;
}

for (const [label, ctx] of [
  ["393 by 659", { viewport: { width: 393, height: 659 }, deviceScaleFactor: 3, hasTouch: true, isMobile: true }],
  ["402 by 874", { viewport: { width: 402, height: 874 }, deviceScaleFactor: 3, hasTouch: true, isMobile: true }],
  ["820 by 1180", { viewport: { width: 820, height: 1180 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true }],
  ["1440 by 900", { viewport: { width: 1440, height: 900 } }],
]) {
  await check(`${label}: the closing beat: the glow is out before the sentence shows, the lines leave as it comes in, it never overlaps a line, and going back up is the same in reverse`, ctx, async (page) => {
    const t = await track(page);
    const at = (u) => t.top - t.lead + t.beat * u;
    const riseBy = await page.evaluate(() => Math.min(34, Math.max(18, parseFloat(getComputedStyle(document.querySelector(".ps-how__line")).fontSize) * 0.8)));
    await scrollTo(page, at(2.5));
    const down = await handScrub(page, at(2.5), at(3.9), 3);
    await rested(page);
    const end = (await handScrub(page, at(3.9), at(3.9), 1))[0];
    // (a) From the first frame the sentence shows at all: no light, no lit line, no blue band.
    const first = down.findIndex((f) => f.texts[CLOSING] > 0.001);
    assert.ok(first >= 0, `${label}: the closing sentence never showed`);
    for (const f of down.slice(first)) {
      assert.ok(f.light <= 0.001 && f.lines.every((l) => l.lit <= 0.001 && l.band >= 0.999), `${label}: at y=${f.y} the sentence is at ${f.texts[CLOSING]} and the glow is still there (light ${f.light}, lit ${f.lines.map((l) => l.lit).join("/")}, band off ${f.lines.map((l) => l.band.toFixed(3)).join("/")})`);
    }
    // ... and it went out with the scroll, through many strengths, not in a cut.
    const dimming = new Set(down.slice(0, first).map((f) => f.light).filter((v) => v > 0.03 && v < 0.97).map((v) => v.toFixed(2)));
    assert.ok(dimming.size >= 6, `${label}: the light went out through only ${dimming.size} in-between strengths`);
    // (b) Once the sentence is fully in, no line shows; and while any of it shows, no visible line's box meets its words.
    for (const f of down) {
      if (f.texts[CLOSING] >= 0.999) assert.ok(f.lines.every((l) => l.opacity <= 0.001), `${label}: at y=${f.y} the sentence is in and the lines still show (${f.lines.map((l) => l.opacity).join(", ")})`);
      if (f.texts[CLOSING] > 0.001) {
        f.lines.forEach((l, k) => {
          if (l.opacity > 0.001) assert.ok(overlapPx(l, f.sentence) < 0.5, `${label}: at y=${f.y} the sentence (${f.texts[CLOSING]}) overlaps line ${k + 1} (${l.opacity}) by ${overlapPx(l, f.sentence).toFixed(1)}px`);
        });
        assert.ok(f.sentence.top >= f.eyebrow.bottom, `${label}: at y=${f.y} the sentence runs into the label`);
      }
    }
    // The lines leave with the scroll, top line first, moving up (transform), not in a cut.
    for (let k = 0; k < 3; k += 1) {
      const leaving = new Set(down.map((f) => f.lines[k].opacity).filter((v) => v > 0.03 && v < 0.97).map((v) => v.toFixed(2)));
      assert.ok(leaving.size >= 6, `${label}: line ${k + 1} left through only ${leaving.size} in-between strengths`);
      assert.ok(Math.min(...down.map((f) => f.lines[k].ty)) <= -12, `${label}: line ${k + 1} does not lift away as it leaves`);
    }
    const halfOut = down.find((f) => f.lines[0].opacity <= 0.5);
    assert.ok(halfOut && halfOut.lines[2].opacity > halfOut.lines[0].opacity + 0.15, `${label}: the lines do not leave top line first`);
    // At rest on the last beat: the sentence alone, flush right like the lines it replaced, in the held block.
    assert.ok(end.light <= 0.001 && end.lines.every((l) => l.opacity <= 0.001) && end.texts[CLOSING] >= 0.999, `${label}: at rest on the last beat the picture is not the sentence alone`);
    const s = await read(page);
    assert.ok(Math.abs(s.belief.right - s.contentRight) <= 1, `${label}: the sentence is not flush right (${s.belief.right} against ${s.contentRight})`);
    assert.ok(end.sentence.top >= end.eyebrow.bottom && end.sentence.bottom <= s.vh, `${label}: the sentence does not sit between the label and the bottom of the screen`);
    // (c) Back up: at every painted frame the picture is one the way down painted; the lines come back last line
    // first; and it ends on beat 3 exactly as it was.
    const up = await handScrub(page, at(3.9), at(2.5), 3);
    await rested(page);
    const back = await read(page);
    assert.ok(up[0].lines.every((l) => l.opacity <= 0.001) && up[0].light <= 0.001, `${label}: going up from the last beat the lines and the light were not gone to begin with (lines ${up[0].lines.map((l) => l.opacity).join(", ")}, light ${up[0].light}): there is no exit to reverse`);
    const curve = down.map((f) => handTuple(f, riseBy));
    let worst = { d: 0 };
    for (const f of up) {
      const d = nearestOnCurve(handTuple(f, riseBy), curve);
      if (d > worst.d) worst = { d, y: f.y, tuple: handTuple(f, riseBy).map((v) => v.toFixed(2)).join(" ") };
    }
    assert.ok(worst.d <= 0.05, `${label}: going up at y=${worst.y} the picture (${worst.tuple}) is ${worst.d.toFixed(3)} away from anything painted on the way down`);
    const returns = [0, 1, 2].map((k) => up.findIndex((f) => f.lines[k].opacity > 0.001));
    assert.ok(returns[2] >= 0 && returns[2] <= returns[1] && returns[1] <= returns[0], `${label}: going up the lines do not come back last line first (frames ${returns.join(", ")})`);
    assert.equal(back.step, "2", `${label}: back up, the third beat does not show`);
    assert.ok(back.lines.every((l) => l.opacity > 0.999) && back.lines[2].lit > 0.999 && back.light.opacity > 0.999 && back.steps[2].opacity > 0.999 && back.steps[CLOSING].opacity < 0.001, `${label}: back up, beat 3 is not as it was`);
  });

  await check(`${label}: a stop part way through the closing hand-over, down or up, never leaves a line, the glow or the sentence part way`, ctx, async (page) => {
    const t = await track(page);
    const at = (u) => t.top - t.lead + t.beat * u;
    const clean = (v) => v <= 0.001 || v >= 0.999;
    for (const stop of [2.76, 2.88, 3.0, 3.12, 3.24]) {
      for (const [from, want] of [[2.5, "3"], [3.9, "2"]]) {
        await scrollTo(page, at(from));
        await handScrub(page, at(from), at(stop), 4);
        await rested(page);
        const f = (await handScrub(page, at(stop), at(stop), 1))[0];
        const what = `${label}: stopped at ${stop} going ${from < stop ? "down" : "up"}`;
        assert.ok(clean(f.light) && f.lines.every((l) => clean(l.opacity) && clean(l.lit)) && f.texts.every(clean), `${what}: rests part way (light ${f.light}, lines ${f.lines.map((l) => `${l.opacity}/${l.lit}`).join(", ")}, texts ${f.texts.join(", ")})`);
        assert.equal((await read(page)).step, want, `${what}: settled on beat ${Number((await read(page)).step) + 1}, not onward`);
        assert.ok(Math.abs((await page.evaluate(() => window.scrollY)) - at(stop)) <= 1, `${what}: settling moved the page`);
      }
    }
  });
}

await check("reduced motion: on the last beat the three lines stay, unlit, and the sentence stays in its own place under them",
  { viewport: { width: 393, height: 659 }, deviceScaleFactor: 3, hasTouch: true, isMobile: true, reducedMotion: "reduce" },
  async (page) => {
    const t = await track(page);
    await scrollTo(page, t.top - t.lead + t.beat * 3.5);
    const s = await read(page);
    assert.equal(s.step, String(CLOSING), "reduced motion: the last beat was not reached");
    assert.ok(s.lines.every((l) => l.opacity > 0.999 && l.transform === "none"), `reduced motion: a line left or moved on the last beat (${s.lines.map((l) => `${l.opacity}/${l.transform}`).join(", ")})`);
    assert.ok(s.light.opacity < 0.001 && s.lines.every((l) => l.lit < 0.001), `reduced motion: the light is on (${s.light.opacity}) on the last beat`);
    assert.ok(s.steps[CLOSING].opacity > 0.999 && s.steps[CLOSING].top >= s.lines[2].bottom, "reduced motion: the sentence is not showing in its place under the lines");
    assert.ok(s.lines.every((l) => l.ink > 0.999), "reduced motion: the lines are not at full strength on the last beat");
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

await check("every phone width from 320 to 520: each of the three lines stays on one line",
  { viewport: { width: 402, height: 900 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true },
  async (page) => {
    // The type is sized from the width so the longest line just fits. How wide a line of text comes
    // out is not the same in every browser or at every size (this browser rounds each letter to whole
    // pixels at small sizes, and measured the first line anywhere from 12.4 to 13.1 times the type
    // size), so two widths prove nothing: at 396 to 402 wide the first line broke in two while 390 and
    // 320 were fine. Every width is looked at.
    const wrapped = [];
    let tightest = 0;
    for (let width = 320; width <= 520; width += 2) {
      await page.setViewportSize({ width, height: 900 });
      const lines = await page.evaluate(() => new Promise((done) => requestAnimationFrame(() => {
        const size = parseFloat(getComputedStyle(document.querySelector(".ps-how__headline")).fontSize);
        const box = document.querySelector(".ps-how__headline").getBoundingClientRect().width;
        done([...document.querySelectorAll(".ps-how__line")].map((line) => {
          const height = line.getBoundingClientRect().height;
          line.style.maxWidth = "none";
          const natural = line.getBoundingClientRect().width;
          line.style.maxWidth = "";
          return { broke: height > size * 1.6, fill: natural / box };
        }));
      })));
      lines.forEach((line, i) => {
        if (line.broke) wrapped.push(`${width}px line ${i + 1}`);
        tightest = Math.max(tightest, line.fill);
      });
    }
    assert.deepEqual(wrapped, [], `a line broke onto a second line at: ${wrapped.join(", ")}`);
    assert.ok(tightest <= 0.995, `the longest line fills ${(tightest * 100).toFixed(1)}% of the space it has; there is no margin left`);
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
    const lines = await page.evaluate(() => [...document.querySelectorAll("#how-we-work .ps-how__line")].map((l) => ({ opacity: getComputedStyle(l).opacity, transform: getComputedStyle(l).transform })));
    assert.ok(lines.every((l) => l.opacity === "1" && l.transform === "none"), `844x390: a line is faded or moved in the stacked layout (${JSON.stringify(lines)})`);
    assert.deepEqual(s.steps.map((st) => st.text), [...BODIES, BELIEF], "844x390: the stacked text is not the owner's copy in order");
    // The closing beat's move (ADR-0032) is the track's alone: laid out flat the sentence is where it always was.
    assert.ok((s.belief.align === "left" || s.belief.align === "start") && Math.abs(s.belief.left - s.contentLeft) <= 1, `844x390: the closing sentence is not set on the left under the explanations (${s.belief.align}, left ${s.belief.left})`);
    assert.equal(s.belief.stepTransform, "none", "844x390: the closing sentence is moved in the stacked layout");
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
    const lines = await page.evaluate(() => [...document.querySelectorAll("#how-we-work .ps-how__line")].map((l) => ({ opacity: getComputedStyle(l).opacity, transform: getComputedStyle(l).transform })));
    assert.ok(lines.every((l) => l.opacity === "1" && l.transform === "none"), `no JS: a line is faded or moved (${JSON.stringify(lines)})`);
    assert.deepEqual(s.steps.map((st) => st.text), [...BODIES, BELIEF], "no JS: the text is not the owner's copy in order");
    assert.ok((s.belief.align === "left" || s.belief.align === "start") && Math.abs(s.belief.left - s.contentLeft) <= 1, `no JS: the closing sentence is not set on the left under the explanations (${s.belief.align}, left ${s.belief.left})`);
    assert.equal(s.belief.stepTransform, "none", "no JS: the closing sentence is moved");
    assert.ok(s.sectionHeight < s.vh * 1.8, `no JS: the section is ${s.sectionHeight}px tall with nothing to drive it`);
  });

await browser.close();
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
