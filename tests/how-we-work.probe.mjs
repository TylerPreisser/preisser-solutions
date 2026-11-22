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
