/**
 * The motion of the How We Work section, checked at EVERY scroll position.
 *
 * A browser test stops at a few dozen places. The owner's bar is "it has to stay
 * flawless but it also needs to bet the smoothest possible scroll reactive"
 * (2026-11-21), and neither word is proved by a few dozen places. The section's
 * whole look is one pure function of one number (src/components/home/how-we-work-motion.ts),
 * so this walks that function across the whole track in ten thousand steps and
 * replays real kinds of scrolling through the follower at every frame rate a
 * device runs at. It needs no browser and takes under a second.
 *
 * What it proves, for all positions and not a sample:
 *   - nothing ever jumps: every value changes by a bounded amount per pixel scrolled
 *   - no two texts are ever on screen together, and no more than two lines share the light
 *   - wherever the reader stops, the picture settles on one clean beat, and settling
 *     is stable; it settles ONWARD in the direction they were scrolling, so a slow
 *     mouse wheel (a notch, a pause, a notch) never runs the picture backwards
 *   - the picture going up is the picture going down
 *   - the follower never overshoots and looks the same at 30, 60, 90, 120 and 240 frames a second
 *   - under a mouse wheel, a trackpad, a finger fling and a hard fling, at every
 *     frame rate and screen height, NO value ever moves faster than a full swing
 *     per 55ms (so no fade can finish in under about a tenth of a second), no two
 *     texts overlap, and it always comes to a clean rest
 *
 *   node tests/how-we-work-motion.probe.mjs
 */
import assert from "node:assert/strict";
import {
  BEATS, CLOSING, LEAD, LINES, MAX_SPEED, OFF_TO, TURN, beatOf, follow, followerAt, frame, keyTarget, offsetOf, plateau, positionOf, readerAt, rest, watch,
} from "../src/components/home/how-we-work-motion.ts";
import * as motion from "../src/components/home/how-we-work-motion.ts";

let pass = 0;
let fail = 0;
function check(name, fn) {
  try {
    fn();
    pass += 1;
    console.log(`  PASS  ${name}`);
  } catch (error) {
    fail += 1;
    console.log(`  FAIL  ${name}\n        ${String(error.message).split("\n").slice(0, 6).join(" | ")}`);
  }
}

/** Every number the section paints at `u`, flattened, with names for messages. */
function values(u, caps = null) {
  const f = frame(u, caps);
  // The light starts one line above the first and (ADR-0032) carries on one line below the last, so its
  // whole run is LINES + 1 lines long.
  const out = { light: f.light, ink: f.ink, lamp: (f.lamp + 1) / (LINES + 1) };
  f.lit.forEach((v, k) => { out[`line ${k + 1} lit`] = v; });
  // The band's offset against each line runs from -1 (a line above) to 1 (a line below).
  f.fill.forEach((v, k) => { out[`line ${k + 1} band`] = (v + 1) / 2; });
  f.texts.forEach((t, k) => { out[`text ${k + 1} opacity`] = t.opacity; });
  // The lines' entrance (ADR-0031): how visible each line is and how far it still has to rise (0 to 1).
  (f.rise ?? []).forEach((r, k) => { out[`line ${k + 1} entrance`] = r.opacity; out[`line ${k + 1} rise`] = r.y; });
  // And their exit as the closing sentence comes in (ADR-0032): how visible each still is and how far it has lifted away.
  (f.leave ?? []).forEach((r, k) => { out[`line ${k + 1} exit`] = r.opacity; out[`line ${k + 1} lift`] = r.y; });
  return out;
}

const STEP = 0.0005;
const positions = [];
for (let u = -1; u <= BEATS + 1e-9; u += STEP) positions.push(Number(u.toFixed(4)));

check(`every value stays between 0 and 1 at all ${positions.length} positions`, () => {
  for (const u of positions) {
    for (const [name, v] of Object.entries(values(u))) {
      assert.ok(v >= -1e-9 && v <= 1 + 1e-9, `${name} is ${v} at u=${u}`);
    }
  }
});

// The steepest thing in the picture is a text fading across a quarter of a beat. An ease-in-out's
// steepest slope is 1.5 over its width, so nothing may change faster than 1.5 / 0.25 = 6 per beat.
// A value that SWITCHES at a threshold changes by 1 in one step and fails this by a factor of 300.
const STEEPEST = 6;
check("nothing jumps: no value changes faster than 6 per beat anywhere on the track", () => {
  let worst = { rate: 0 };
  for (let i = 1; i < positions.length; i += 1) {
    const a = values(positions[i - 1]);
    const b = values(positions[i]);
    for (const name of Object.keys(a)) {
      const rate = Math.abs(b[name] - a[name]) / STEP;
      if (rate > worst.rate) worst = { rate, name, u: positions[i] };
    }
  }
  assert.ok(worst.rate <= STEEPEST + 0.05, `${worst.name} changes at ${worst.rate.toFixed(1)} per beat at u=${worst.u}`);
  console.log(`        steepest: ${worst.name}, ${worst.rate.toFixed(2)} per beat at u=${worst.u}`);
});

check("the text offsets never jump either (px per beat stays bounded)", () => {
  let worst = 0;
  for (let i = 1; i < positions.length; i += 1) {
    const a = frame(positions[i - 1]).texts;
    const b = frame(positions[i]).texts;
    a.forEach((t, k) => { worst = Math.max(worst, Math.abs(b[k].y - t.y) / STEP); });
  }
  assert.ok(worst <= 14 * (STEEPEST + 0.05), `a text moves at ${worst.toFixed(0)}px per beat`);
});

check("no two texts are ever on screen together", () => {
  for (const u of positions) {
    const showing = frame(u).texts.filter((t) => t.opacity > 0.02).length;
    assert.ok(showing <= 1, `${showing} texts are showing at u=${u}`);
  }
});

check("one light: the lit amounts never add up to more than one line's worth, on neighbouring lines only", () => {
  for (const u of positions) {
    const { lit } = frame(u);
    const total = lit.reduce((a, b) => a + b, 0);
    assert.ok(total <= 1 + 1e-9, `the lines are lit ${total.toFixed(3)} in total at u=${u}`);
    assert.ok(!(lit[0] > 0.001 && lit[2] > 0.001), `lines 1 and 3 are lit together at u=${u}`);
  }
});

check("the light only ever moves down the lines as the reader scrolls down", () => {
  let previous = -1;
  for (const u of positions) {
    const { lamp } = frame(u);
    assert.ok(lamp >= previous - 1e-12, `the light went back up at u=${u}`);
    previous = lamp;
  }
});

check("each text comes up once and leaves once (no flicker), and the closing sentence stays", () => {
  for (let k = 0; k <= CLOSING; k += 1) {
    let turns = 0;
    let direction = 0;
    let previous = frame(positions[0]).texts[k].opacity;
    for (const u of positions) {
      const v = frame(u).texts[k].opacity;
      const d = Math.sign(Number((v - previous).toFixed(9)));
      if (d !== 0 && d !== direction) {
        turns += 1;
        direction = d;
      }
      previous = v;
    }
    assert.equal(turns, k === CLOSING ? 1 : 2, `text ${k + 1} changed direction ${turns} times`);
  }
});

check("arriving, nothing is lit and nothing is written under the lines", () => {
  for (const u of positions.filter((x) => x <= OFF_TO)) {
    const f = frame(u);
    assert.ok(f.light === 0 && f.ink === 1 && f.lit.every((v) => v === 0) && f.texts.every((t) => t.opacity === 0), `something shows at u=${u}`);
  }
});

// ADR-0031, the owner on 2026-11-22: "When I initially scroll down from hero the text there kinda jerks in at
// least initially let it animate in and etc scroll animation all that stuff". Measured on the build before it
// (agent-reports/ps-site-1122/hww-entrance): every line was at full strength the first frame it was on screen.
check("the lines come in with the scroll as the section arrives: each once, staggered, and all in before anything lights", () => {
  const { ENTER_FROM, ENTER_TO } = motion;
  assert.ok(typeof ENTER_FROM === "number" && typeof ENTER_TO === "number", "the motion has no entrance for the lines (no ENTER_FROM / ENTER_TO)");
  assert.ok(Array.isArray(frame(0).rise) && frame(0).rise.length === LINES, "frame(u) does not say where each line is in its entrance (frame(u).rise)");
  // It finishes before the light starts, with room to spare, and starts below where the block is held.
  assert.ok(ENTER_TO <= OFF_TO - 0.1 + 1e-9, `the entrance ends at u=${ENTER_TO}, too close to where the light starts (${OFF_TO})`);
  assert.ok(ENTER_FROM > -1, `the entrance starts at u=${ENTER_FROM}, outside the track's clamp`);
  // It starts only once all three lines are on screen. The top of the track is 0.18 - u/2 screens down the
  // window; the third line sits at most 0.501 of a screen down the held block (1366 by 625, the deepest of
  // the sixteen layouts from 320 by 568 to 1920 by 1080, measured 2026-11-22). If it started earlier, a
  // reader resting there would have the entrance finished for them (the settle) while a line was still
  // below the window, and that line would then scroll in at full strength: the first version did exactly that.
  const third = 0.18 - ENTER_FROM / 2 + 0.501;
  assert.ok(third <= 0.97, `when the entrance starts the third line can still be ${(third * 100).toFixed(0)}% of the way down the window, at the bottom edge or below it`);
  const last = [0, 0, 0];
  let partWay = 0;
  for (const u of positions) {
    const f = frame(u);
    f.rise.forEach((r, k) => {
      assert.ok(r.opacity >= last[k] - 1e-12, `line ${k + 1} goes back out at u=${u} while the reader scrolls down`);
      last[k] = r.opacity;
      if (u <= ENTER_FROM) assert.ok(r.opacity === 0 && r.y === 1, `line ${k + 1} shows above the entrance at u=${u}`);
      if (u >= ENTER_TO) assert.ok(r.opacity === 1 && r.y === 0, `line ${k + 1} is not fully in at u=${u}`);
      if (r.opacity > 0 && r.opacity < 1) partWay += 1;
    });
    // Staggered: the first line leads, the third follows.
    assert.ok(f.rise[0].opacity >= f.rise[1].opacity && f.rise[1].opacity >= f.rise[2].opacity, `the lines are not in order at u=${u}: ${f.rise.map((r) => r.opacity.toFixed(3)).join(", ")}`);
    // Nothing else moves until the three are in.
    if (f.light > 0 || f.lit.some((v) => v > 0) || f.texts.some((t) => t.opacity > 0) || f.ink < 1) {
      assert.ok(f.rise.every((r) => r.opacity === 1 && r.y === 0), `something lights at u=${u} before the lines are in`);
    }
  }
  assert.ok(partWay > 1000, `the lines were part way in at only ${partWay} positions: they are switched, not scrubbed`);
  // Each line rises and fades over at least a third of a beat (a sixth of a screen), so it follows the finger.
  const mid = frame((ENTER_FROM + ENTER_TO) / 2).rise;
  assert.ok(mid[0].opacity > mid[2].opacity + 0.2, `the stagger is too slight to see (${mid.map((r) => r.opacity.toFixed(2)).join(", ")})`);
});

check("the middle of each beat is exactly its own clean picture", () => {
  for (let k = 0; k < LINES; k += 1) {
    const f = frame(k + 0.5);
    assert.deepEqual(f.lit, [0, 1, 2].map((i) => (i === k ? 1 : 0)), `beat ${k + 1} lit`);
    assert.deepEqual(f.texts.map((t) => t.opacity), [0, 1, 2, 3].map((i) => (i === k ? 1 : 0)), `beat ${k + 1} texts`);
    assert.ok(f.texts[k].y === 0 && f.light === 1 && f.lamp === k && f.fill[k] === 0, `beat ${k + 1} is not at rest`);
  }
  // The closing beat (ADR-0032, which replaces ADR-0026's last beat): no light anywhere, the three lines gone,
  // the sentence alone. The words' own ink is back at full, which only a reader with reduced motion sees (for
  // them the lines stay, ADR-0032 point 5).
  const end = frame(CLOSING + 0.5);
  assert.deepEqual(end.lit, [0, 0, 0], "closing lit");
  assert.equal(end.light, 0, "closing light");
  assert.deepEqual(end.texts.map((t) => t.opacity), [0, 0, 0, 1], "closing texts");
  assert.deepEqual((end.leave ?? []).map((l) => l.opacity), [0, 0, 0], "closing: the three lines are not gone");
  assert.equal(end.ink, 1, "the lines' ink is not back at full on the closing beat (what reduced motion shows)");
});

check("wherever the reader stops, the picture settles on the nearest clean beat, and stays there", () => {
  for (const u of positions) {
    const r = rest(u);
    assert.equal(rest(r), r, `settling is not stable at u=${u}: ${r} then ${rest(r)}`);
    const f = frame(r);
    const all = [...f.lit, ...f.texts.map((t) => t.opacity)];
    assert.ok(all.every((v) => v === 0 || v === 1), `a half state at rest for u=${u}: ${all.join(", ")}`);
    if (f.rise) assert.ok(f.rise.every((x) => (x.opacity === 0 && x.y === 1) || (x.opacity === 1 && x.y === 0)), `a line rests part way in for u=${u}: ${f.rise.map((x) => x.opacity).join(", ")}`);
    assert.ok(f.texts.every((t) => t.y === 0 || t.opacity === 0), `a text rests off its line for u=${u}`);
    const beat = beatOf(u);
    if (beat === null) {
      assert.ok(f.texts.every((t) => t.opacity === 0) && f.light === 0, `something shows at rest while arriving, u=${u}`);
    } else {
      assert.equal(f.texts.filter((t) => t.opacity === 1).length, 1, `not exactly one text at rest for u=${u}`);
      assert.equal(f.texts[beat].opacity, 1, `the text at rest is not beat ${beat + 1}'s for u=${u}`);
      if (beat < LINES) assert.equal(f.lit[beat], 1, `the lit line at rest is wrong for u=${u}`);
      else assert.ok(f.lit.every((v) => v === 0) && f.light === 0, `a line is lit or the light is on at rest on the closing beat for u=${u}`);
      assert.ok(f.light === 0 || f.light === 1, `the light rests part way (${f.light}) for u=${u}`);
      if (f.leave) assert.ok(f.leave.every((x) => (x.opacity === 0 && x.y === 1) || (x.opacity === 1 && x.y === 0)), `a line rests part way out for u=${u}: ${f.leave.map((x) => x.opacity).join(", ")}`);
      // The nearest: never further than half the widest gap between two resting stretches.
      assert.ok(Math.abs(r - u) <= 0.31, `settling travels ${Math.abs(r - u).toFixed(2)} beats from u=${u}`);
    }
  }
});

check("a reader who stops while scrolling one way settles onward that way, and never back", () => {
  let onward = 0;
  for (const u of positions) {
    for (const way of [1, -1]) {
      const r = rest(u, way);
      assert.equal(rest(r, way), r, `settling is not stable going ${way} at u=${u}: ${r} then ${rest(r, way)}`);
      const f = frame(r);
      assert.ok([...f.lit, ...f.texts.map((t) => t.opacity)].every((v) => v === 0 || v === 1), `a half state at rest going ${way} for u=${u}`);
      if (f.rise) assert.ok(f.rise.every((x) => (x.opacity === 0 && x.y === 1) || (x.opacity === 1 && x.y === 0)), `a line rests part way in going ${way} for u=${u}`);
      if (f.leave) assert.ok(f.leave.every((x) => (x.opacity === 0 && x.y === 1) || (x.opacity === 1 && x.y === 0)), `a line rests part way out going ${way} for u=${u}`);
      assert.ok(f.light === 0 || f.light === 1, `the light rests part way (${f.light}) going ${way} for u=${u}`);
      assert.ok((r - u) * way >= 0, `stopping at u=${u} going ${way} takes the picture back ${Math.abs(r - u).toFixed(3)} beats`);
      // Onward: never further than the widest gap between two resting stretches.
      assert.ok(Math.abs(r - u) <= 0.6 + 1e-9, `stopping at u=${u} going ${way} moves the picture ${Math.abs(r - u).toFixed(2)} beats`);
      if ((r - u) * way > 0) {
        onward += 1;
        // And only from where the picture had already begun to change: nothing is at rest there.
        const here = frame(u);
        const moving = [...here.lit, ...here.texts.map((t) => t.opacity), here.light].some((v) => v > 0 && v < 1) || here.texts.every((t) => t.opacity === 0);
        assert.ok(moving, `stopping at u=${u} going ${way} moves a picture that was at rest`);
      }
    }
  }
  assert.ok(onward > 1000, `the picture settled onward at only ${onward} positions`);
});

check("a reader already inside a beat's resting stretch sees nothing move when they stop", () => {
  for (let k = 0; k <= CLOSING; k += 1) {
    const [from, to] = plateau(k);
    const still = JSON.stringify(values(from));
    for (let u = from; u <= Math.min(to, BEATS); u += STEP) {
      assert.equal(rest(u), u, `stopping at u=${u.toFixed(4)} moves the picture`);
      assert.equal(JSON.stringify(values(u)), still, `the picture changes inside beat ${k + 1}'s resting stretch at u=${u.toFixed(4)}`);
    }
  }
});

check("the band of light is one line tall: what it leaves on one line it gains on the next", () => {
  for (const u of positions) {
    const { fill, lit, lamp } = frame(u);
    for (let k = 0; k < LINES; k += 1) {
      assert.ok(Math.abs(fill[k] - Math.min(1, Math.max(-1, lamp - k))) < 1e-12, `line ${k + 1}'s band is not where the light is at u=${u}`);
      assert.ok(Math.abs(lit[k] - (1 - Math.abs(fill[k]))) < 1e-12, `line ${k + 1}'s glow does not match its band at u=${u}`);
    }
    // Between the first line and the last it is one line's worth. Above the first it is still coming down
    // into it, and below the last (ADR-0032) it is passing down off it and out.
    if (lamp >= 0 && lamp <= LINES - 1) assert.ok(Math.abs(lit.reduce((a, b) => a + b, 0) - 1) < 1e-9, `the band covers ${lit.reduce((a, b) => a + b, 0).toFixed(3)} lines at u=${u}`);
  }
});

check("Space and PageDown move exactly one beat, never skip the first or the last, and never scroll further than a page", () => {
  for (const windowHeight of [568, 625, 844, 900, 1180]) {
    const travel = windowHeight * 2;
    const beat = travel / BEATS;
    const page = (windowHeight * 0.8) / beat; // the least any browser's own page key scrolls, in beats
    const widest = (windowHeight * 0.875) / beat; // and the most (Chromium)
    const end = (travel + windowHeight * LEAD) / beat; // where the block lets go
    // On the track: forward goes to the middle of the next beat and never skips one.
    for (const u of positions.filter((x) => beatOf(x) !== null)) {
      const beatNow = beatOf(u);
      const forward = keyTarget(u, 1, page, end);
      const back = keyTarget(u, -1, page, end);
      assert.equal(forward, beatNow < CLOSING ? Math.min(beatNow + 1.5, u + page) : null, `forward from u=${u} (beat ${beatNow + 1}) goes to ${forward}`);
      assert.equal(back, beatNow > 0 ? Math.max(beatNow - 0.5, u - page) : null, `back from u=${u} (beat ${beatNow + 1}) goes to ${back}`);
      // Wherever it lands, the picture comes to rest on the very next beat, and it is never further than a page.
      if (forward !== null) assert.equal(beatOf(rest(forward, 1)), beatNow + 1, `forward from u=${u} does not land in the next beat`);
      if (back !== null) assert.equal(beatOf(rest(back, -1)), beatNow - 1, `back from u=${u} does not land in the previous beat`);
      if (forward !== null) assert.ok(forward - u <= page + 1e-9, `forward from u=${u} scrolls ${(forward - u).toFixed(2)} beats, more than a page`);
      if (back !== null) assert.ok(u - back <= page + 1e-9, `back from u=${u} scrolls ${(u - back).toFixed(2)} beats, more than a page`);
    }
    // Above the section (in the hero): the browser's own page is used unless it would carry the
    // reader past the middle of the first beat; then they are stopped there. Either way they end up
    // no further than the first beat, and never further than a page from where they were.
    for (let u = -4; u < OFF_TO; u += 0.01) {
      const forward = keyTarget(u, 1, page, end, null);
      for (const own of [page, widest]) {
        // Left to the browser, its own page (the least or the most) must still not pass the first beat.
        const lands = forward === null ? u + own : forward;
        assert.ok(lands <= plateau(0)[1] + 1e-9, `a page down from u=${u.toFixed(2)} above the section lands at ${lands.toFixed(2)}, past the first explanation (${windowHeight}px)`);
      }
      if (forward !== null) assert.ok(forward - u <= page + 1e-9, `a page down from u=${u.toFixed(2)} scrolls ${(forward - u).toFixed(2)} beats, more than a page (${windowHeight}px)`);
      assert.equal(keyTarget(u, -1, page, end), null, `a page up above the section is not the browser's at u=${u.toFixed(2)}`);
    }
    // Below the section: the same, coming back up into the last beat.
    for (let u = end + 0.01; u < end + 4; u += 0.01) {
      const back = keyTarget(u, -1, page, end);
      for (const own of [page, widest]) {
        const lands = back === null ? u - own : back;
        assert.ok(lands >= plateau(CLOSING)[0] - 1e-9, `a page up from u=${u.toFixed(2)} below the section lands at ${lands.toFixed(2)}, past the last beat (${windowHeight}px)`);
      }
      if (back !== null) assert.ok(u - back <= page + 1e-9, `a page up from u=${u.toFixed(2)} scrolls more than a page (${windowHeight}px)`);
      assert.equal(keyTarget(u, 1, page, end), null, `a page down below the section is not the browser's at u=${u.toFixed(2)}`);
    }
    // Pressing it over and over from the top of the hero visits every beat in order.
    const visited = [];
    let u = -(windowHeight - windowHeight * LEAD) / beat; // the top of the page: the section starts a screen down
    for (let presses = 0; presses < 12; presses += 1) {
      // What is showing where they have stopped, coming down.
      const next = keyTarget(u, 1, page, end, u > end ? null : beatOf(rest(u, 1)));
      u = next === null ? u + page : next;
      if (u > end) break;
      const showing = beatOf(rest(u, 1));
      if (showing !== null && visited[visited.length - 1] !== showing) visited.push(showing);
    }
    assert.deepEqual(visited, [0, 1, 2, 3], `paging down from the top of the page visits beats ${visited.map((k) => k + 1).join(", ")} (${windowHeight}px)`);
  }
  // The case that was missed: a 1440 by 900 window, the reader anywhere in the lower half of the hero.
  for (let y = 450; y <= 700; y += 10) {
    const u = (y - 900 + 900 * LEAD) / 450;
    assert.equal(keyTarget(u, 1, 1.6, 4.36, null), 0.5, `PageDown from ${y}px down the hero goes to ${keyTarget(u, 1, 1.6, 4.36, null)}, not the first explanation`);
  }
  // "Next" is counted from the beat that is SHOWING, which is not always the nearest: a reader who
  // came back up to the top of the section has nothing lit there, and must get line 1, not line 2.
  for (let u = OFF_TO + 0.01; u < 0.2; u += 0.01) {
    assert.equal(rest(u, -1), OFF_TO, `coming up to u=${u.toFixed(2)} something is still lit`);
    assert.equal(keyTarget(u, 1, 1.6, 4.36, beatOf(rest(u, -1))), 0.5, `with nothing lit at u=${u.toFixed(2)}, PageDown skips the first explanation`);
    assert.equal(keyTarget(u, 1, 1.6, 4.36, beatOf(rest(u, 1))), 1.5, `with line 1 lit at u=${u.toFixed(2)}, PageDown does not go to line 2`);
  }
  // And one who stopped while leaving line 1 downward is shown line 2: the next is line 3, a page
  // away at most (the middle of line 3's beat is further than that from here).
  assert.ok(Math.abs(keyTarget(0.8, 1, 1.6, 4.36, beatOf(rest(0.8, 1))) - 2.4) < 1e-9, `from 0.8 with line 2 showing, PageDown goes to ${keyTarget(0.8, 1, 1.6, 4.36, beatOf(rest(0.8, 1)))}`);
  assert.equal(beatOf(2.4), 2);
  assert.equal(keyTarget(1.2, -1, 1.6, 4.36, beatOf(rest(1.2, -1))), null);
  // And the offset it scrolls to is the inverse of reading the position.
  for (const u of [0.5, 1.5, 2.5, 3.5]) {
    assert.ok(Math.abs(positionOf(offsetOf(u, 844, 1688), 844, 1688) - u) < 1e-9, `offsetOf and positionOf disagree at u=${u}`);
  }
});

check("scroll offset to beat position: each beat is the same length and the ends are clamped", () => {
  const windowHeight = 844;
  const travel = 1688;
  const beat = travel / BEATS;
  for (let k = 0; k < BEATS; k += 1) {
    const middle = positionOf(-windowHeight * 0.18 + beat * (k + 0.5), windowHeight, travel);
    assert.ok(Math.abs(middle - (k + 0.5)) < 1e-9, `the middle of beat ${k + 1} maps to ${middle}`);
  }
  assert.equal(positionOf(-100000, windowHeight, travel), -1);
  assert.equal(positionOf(100000, windowHeight, travel), BEATS);
});

const RATES = [30, 60, 90, 120, 144, 240];

check("the follower never overshoots and always arrives, at every frame rate", () => {
  for (const hz of RATES) {
    for (const [from, to] of [[0.5, 1.5], [3.5, 0.5], [-0.35, 0.5], [1.0, 1.02], [0.2, 0.95]]) {
      const state = followerAt(from);
      let frames = 0;
      let previous = from;
      do {
        follow(state, to, 1000 / hz);
        assert.ok((to - state.x) * (to - from) >= 0, `overshoot at ${hz}Hz going ${from} to ${to}: at ${state.x}`);
        assert.ok(Math.abs(to - state.x) <= Math.abs(to - previous) + 1e-12, `moved away at ${hz}Hz going ${from} to ${to}`);
        previous = state.x;
        frames += 1;
        assert.ok(frames < 4 * hz, `still moving after 4 seconds at ${hz}Hz going ${from} to ${to}`);
      } while (state.moving);
      assert.equal(state.x, to, `did not arrive exactly at ${hz}Hz going ${from} to ${to}`);
      assert.deepEqual(frame(state.x, state.caps).texts, frame(to).texts, `the texts are not as they should be at rest at ${hz}Hz going ${from} to ${to}`);
    }
  }
});

check("the follower starts gently: its first frame covers far less ground than its fastest", () => {
  const state = followerAt(0);
  const steps = [];
  for (let i = 0; i < 60; i += 1) {
    const before = state.x;
    follow(state, 1, 1000 / 120);
    steps.push(state.x - before);
  }
  assert.ok(steps[0] < Math.max(...steps) * 0.35, `the first frame covers ${(steps[0] / Math.max(...steps) * 100).toFixed(0)}% of the fastest frame`);
});

check("the follower takes the same path in time at every frame rate (within 2% of a beat)", () => {
  const at = (hz, ms) => {
    const state = followerAt(0);
    const frames = Math.round((ms * hz) / 1000);
    for (let i = 0; i < frames; i += 1) follow(state, 1.5, ms / frames);
    return state.x;
  };
  for (const ms of [50, 100, 200, 400, 800]) {
    const reference = at(240, ms);
    for (const hz of RATES) {
      assert.ok(Math.abs(at(hz, ms) - reference) < 0.02, `after ${ms}ms it is at ${at(hz, ms).toFixed(4)} at ${hz}Hz and ${reference.toFixed(4)} at 240Hz`);
    }
  }
});

check("the speed limit holds: the picture never moves faster than two beats a second", () => {
  for (const hz of RATES) {
    const state = followerAt(-1);
    let previous = state.x;
    for (let i = 0; i < 3 * hz; i += 1) {
      follow(state, BEATS, 1000 / hz);
      assert.ok((state.x - previous) / (1000 / hz) <= MAX_SPEED * 1.0001, `moved at ${(((state.x - previous) / (1000 / hz)) * 1000).toFixed(2)} beats a second at ${hz}Hz`);
      previous = state.x;
    }
  }
});

/**
 * Replays a scroll (a function from time in ms to scroll offset in px) through the SAME functions the
 * component's frame loop calls (watch, then follow), and returns the fastest any painted value moved
 * (per ms), whether two texts were ever on screen together, whether the picture ever stepped against
 * the reader while they were scrolling, and the furthest it ever came back from where it had got to.
 *
 * `way` is the direction of the scroll (1 down, -1 up). `forget` throws away what watch() remembers
 * about direction after every frame, which is how the section behaved before it settled onward: it
 * exists so the slow-wheel check below can be shown to FAIL on that behaviour.
 */
function replay({ scrollAt, duration, hz, windowHeight, travel, stallAt = -1, stallMs = 0, way = 1, forget = false }) {
  const dt = 1000 / hz;
  let state = null;
  let reader = null;
  let previous = null;
  let previousT = 0;
  let worst = { rate: 0 };
  let overlap = 0;
  let backwards = 0;
  let furthest = -Infinity;
  let retreat = 0;
  let comeback = 0;
  const lows = [1, 1, 1];
  // The most each text showed after the first 100ms of the scroll (so the text the reader started
  // on, already fading, is not counted as one that "showed").
  const peaks = [0, 0, 0, 0];
  const first = [null, null, null, null];
  // The longest any text sat at one part-way strength while the picture itself was moving.
  let frozen = { ms: 0 };
  const since = [null, null, null, null];
  let lastTexts = null;
  for (let t = 0; t <= duration + 3000; t += dt) {
    // A stalled main thread: no frame runs for a while, then one frame sees all of that time at once.
    if (t >= stallAt && t < stallAt + stallMs) continue;
    const u = positionOf(scrollAt(Math.min(t, duration)), windowHeight, travel);
    const before = state ? state.x : null;
    if (state === null) {
      reader = readerAt(u);
      state = followerAt(reader.target);
    } else {
      watch(reader, u, t);
      if (forget) {
        reader.direction = 0;
        reader.held = null;
      }
      follow(state, reader.target, t - previousT);
    }
    // While the reader is still scrolling, the picture must never step the other way.
    if (before !== null && reader.scrolling && t < duration && (state.x - before) * way < -1e-9) backwards += 1;
    furthest = Math.max(furthest, state.x * way);
    retreat = Math.max(retreat, furthest - state.x * way);
    // What a retreat looks like: an explanation that had started to fade coming back.
    if (way === 1) {
      frame(state.x, state.caps).texts.slice(0, LINES).forEach((text, k) => {
        if (state.x > k + 0.5) {
          lows[k] = Math.min(lows[k], text.opacity);
          comeback = Math.max(comeback, text.opacity - lows[k]);
        }
      });
    }
    frame(state.x, state.caps).texts.forEach((text, k) => {
      if (first[k] === null) first[k] = text.opacity;
      // "Showed" means came UP: a text that was never above where it started is only leaving.
      if (text.opacity > first[k] + 1e-9 || first[k] === 0) peaks[k] = Math.max(peaks[k], text.opacity);
    });
    const shown = frame(state.x, state.caps).texts.map((text) => text.opacity);
    shown.forEach((v, k) => {
      const still = lastTexts !== null && before !== null && state.x !== before && Math.abs(v - lastTexts[k]) < 1e-6 && v > 0.03 && v < 0.97;
      if (!still) since[k] = null;
      else {
        if (since[k] === null) since[k] = previousT;
        if (t - since[k] > frozen.ms) frozen = { ms: t - since[k], text: k + 1, at: v, t: Math.round(t) };
      }
    });
    lastTexts = shown;
    const now = values(state.x, state.caps);
    if (previous) {
      for (const name of Object.keys(now)) {
        const rate = Math.abs(now[name] - previous[name]) / (t - previousT);
        if (rate > worst.rate) worst = { rate, name, t: Math.round(t) };
      }
    }
    if (frame(state.x, state.caps).texts.filter((x) => x.opacity > 0.02).length > 1) overlap += 1;
    previous = now;
    previousT = t;
  }
  return { worst, overlap, backwards, retreat, comeback, end: state, peaks, frozen };
}

// Real kinds of scrolling, as offsets over time. One screen is 844px (a phone) or 900px (a laptop);
// the track gives two screens of travel, so a beat is half a screen.
const KINDS = {
  // A notched mouse wheel: 100px at a time, eased over ~120ms by the browser, five notches a second.
  "mouse wheel, 100px notches": (t) => {
    let y = 0;
    for (let n = 0; n * 200 <= t; n += 1) y += 100 * Math.min(1, (t - n * 200) / 120);
    return y;
  },
  // A finger flick on a phone: fast at first, coasting to a stop over about 1.6 seconds.
  "finger fling, 1500px": (t) => 1500 * (1 - Math.exp(-t / 350)),
  // A slow, steady trackpad drag through the whole track.
  "slow trackpad, 300px a second": (t) => 0.3 * t,
  // A hard fling: the whole track in under a second.
  "hard fling, 2400px": (t) => 2400 * (1 - Math.exp(-t / 180)),
};

// The requirement, the same at every frame rate: nothing on screen may move faster than one full
// swing (transparent to solid, or one line to the next) per 55ms. That is 0.30 of a swing per frame
// at 60 frames a second and 0.15 at 120, and it means no fade can ever finish in under about 85ms.
const FASTEST = 1 / 55;

for (const [kind, curve] of Object.entries(KINDS)) {
  check(`${kind}: nothing moves faster than a full swing per 55ms, texts never overlap, and it lands clean`, () => {
    let worst = { rate: 0 };
    for (const hz of RATES) {
      for (const windowHeight of [568, 659, 844, 900, 1180]) {
        const travel = windowHeight * 2;
        const start = -windowHeight * 0.7;
        const result = replay({ scrollAt: (t) => start + curve(t), duration: 6000, hz, windowHeight, travel });
        const where = `at ${hz}Hz on a ${windowHeight}px screen`;
        assert.equal(result.overlap, 0, `${result.overlap} frames with two texts ${where}`);
        assert.equal(result.backwards, 0, `the picture stepped backwards ${result.backwards} times while the reader was scrolling down ${where}`);
        assert.ok(result.worst.rate <= FASTEST, `${result.worst.name} moved at a full swing per ${(1 / result.worst.rate).toFixed(0)}ms ${where} (t=${result.worst.t}ms)`);
        if (result.worst.rate > worst.rate) worst = { ...result.worst, where };
        assert.ok(!result.end.moving, `still moving 3 seconds after the scroll ended ${where}`);
        const landed = frame(result.end.x, result.end.caps);
        assert.ok([...landed.lit, ...landed.texts.map((x) => x.opacity)].every((v) => v === 0 || v === 1), `did not come to a clean rest ${where}`);
        assert.ok(!landed.rise || landed.rise.every((x) => x.opacity === 0 || x.opacity === 1), `a line came to rest part way in ${where}`);
        assert.ok(!landed.leave || landed.leave.every((x) => x.opacity === 0 || x.opacity === 1), `a line came to rest part way out ${where}`);
        assert.ok(landed.light === 0 || landed.light === 1, `the light came to rest part way (${landed.light}) ${where}`);
      }
    }
    console.log(`        fastest: ${worst.name}, a full swing per ${(1 / worst.rate).toFixed(0)}ms ${worst.where}`);
  });
}

// The owner's report, 2026-11-22, from his iPhone: "When I initially scroll down from hero the text there kinda
// jerks in". The first scroll of the page from the very top (the hero filling the window, the section one
// screen below it), in the three shapes a thumb makes: a slow drag that stops part way and lifts, a drag
// on into the first line, and a flick. The lines must come in with the finger, finish coming in, never go
// back while the finger goes on down, never come to rest part way, and go back out if he drags back up.
function firstScroll({ windowHeight, hz, moves }) {
  const travel = windowHeight * 2;
  const dt = 1000 / hz;
  // The hero is one screen high, so at the top of the page the track starts one window below.
  let y = -windowHeight;
  let t = 0;
  let reader = readerAt(positionOf(y, windowHeight, travel));
  const state = followerAt(reader.target);
  const frames = [];
  for (const { by, ms, hold = 0 } of moves) {
    const from = y;
    for (let e = 0; e < ms + hold + 1200; e += dt) {
      // A finger: an ease-out over `ms`, then still for `hold`, then 1.2s of nothing.
      const p = Math.min(1, e / ms);
      y = from + by * (1 - (1 - p) * (1 - p));
      t += dt;
      watch(reader, positionOf(y, windowHeight, travel), t);
      follow(state, reader.target, dt);
      frames.push({ t, y, way: Math.sign(by), moving: e < ms, f: frame(state.x, state.caps) });
    }
  }
  return { frames, end: frame(state.x, state.caps), x: state.x };
}

check("the first scroll from the top of the page: the lines come in with the finger and never come to rest part way", () => {
  assert.ok(frame(0).rise, "frame(u) has no entrance for the lines (frame(u).rise)");
  for (const windowHeight of [568, 659, 852, 874, 900, 1180]) {
    for (const hz of [30, 60, 120]) {
      const where = `${windowHeight}px at ${hz}Hz`;
      // Into the entrance and stop: every line ends fully in, the light still off.
      for (const stopAt of [0.25, 0.35, 0.45, 0.55]) {
        const run = firstScroll({ windowHeight, hz, moves: [{ by: windowHeight * stopAt + windowHeight * 0.0, ms: 420, hold: 160 }] });
        let worst = 0;
        for (let i = 1; i < run.frames.length; i += 1) {
          run.frames[i].f.rise.forEach((r, k) => {
            const before = run.frames[i - 1].f.rise[k];
            assert.ok(r.opacity >= before.opacity - 1e-9, `${where}, stopped at ${stopAt}: line ${k + 1} went back out (${before.opacity.toFixed(3)} to ${r.opacity.toFixed(3)}) while the finger went down`);
            worst = Math.max(worst, (r.opacity - before.opacity) / (run.frames[i].t - run.frames[i - 1].t));
          });
        }
        assert.ok(worst <= FASTEST, `${where}, stopped at ${stopAt}: a line came in at a full swing per ${(1 / worst).toFixed(0)}ms`);
        assert.ok(run.end.rise.every((r) => (r.opacity === 0 && r.y === 1) || (r.opacity === 1 && r.y === 0)), `${where}, stopped at ${stopAt}: a line rests part way in (${run.end.rise.map((r) => r.opacity.toFixed(3)).join(", ")})`);
        assert.ok(run.end.light === 0 && run.end.texts.every((x) => x.opacity === 0), `${where}, stopped at ${stopAt}: something lit on a stop before the section arrived`);
      }
      // A flick from the top that carries on into the first line: all in, then the first line lit.
      const flick = firstScroll({ windowHeight, hz, moves: [{ by: windowHeight * 1.05, ms: 380 }] });
      assert.ok(flick.end.rise.every((r) => r.opacity === 1 && r.y === 0), `${where}: after a flick into the first line the lines are not all in`);
      assert.equal(flick.end.lit[0], 1, `${where}: a flick into the first line did not light it`);
      for (const fr of flick.frames) {
        if (fr.f.light > 0) assert.ok(fr.f.rise.every((r) => r.opacity === 1 && r.y === 0), `${where}: the light came on at t=${fr.t.toFixed(0)}ms before the lines were in`);
      }
      // Part way in, then back up into the hero: every line goes back out, and rests out.
      const back = firstScroll({ windowHeight, hz, moves: [{ by: windowHeight * 0.5, ms: 420, hold: 160 }, { by: -windowHeight * 0.3, ms: 420, hold: 160 }] });
      assert.ok(back.end.rise.every((r) => r.opacity === 0 && r.y === 1), `${where}: dragged back up into the hero, the lines did not go back out (${back.end.rise.map((r) => r.opacity.toFixed(3)).join(", ")})`);
    }
  }
});

// A mouse wheel turned slowly: one notch, a pause long enough for the reader to count as stopped, then
// the next. This is the scroll the second design review caught running the picture backwards: at every
// pause the picture settled back to the line the reader was leaving, a half-faded explanation came
// back, and the next notch took it away again.
function slowWheel({ px, every, glide, windowHeight, way }) {
  const travel = windowHeight * 2;
  const from = way === 1 ? -windowHeight * 0.7 : travel + windowHeight * 0.4;
  const notches = Math.ceil((travel + windowHeight * 1.1) / px);
  const scrollAt = (t) => {
    let y = 0;
    for (let n = 0; n < notches && n * every <= t; n += 1) y += px * (glide === 0 ? 1 : Math.min(1, (t - n * every) / glide));
    return from + way * y;
  };
  return { scrollAt, duration: notches * every + 400, travel };
}
const SLOW = [];
for (const every of [220, 260, 300, 350, 400, 650]) {
  for (const px of [100, 120]) {
    for (const glide of [0, 120]) SLOW.push({ every, px, glide });
  }
}

check("a slow mouse wheel (a notch every 220 to 650ms), down and up: the picture never comes back at a pause", () => {
  let worst = { retreat: 0, comeback: 0 };
  for (const hz of [30, 60, 120, 240]) {
    for (const windowHeight of [568, 659, 844, 900, 1180]) {
      for (const wheel of SLOW) {
        for (const way of [1, -1]) {
          const { scrollAt, duration, travel } = slowWheel({ ...wheel, windowHeight, way });
          const result = replay({ scrollAt, duration, hz, windowHeight, travel, way });
          const where = `${way === 1 ? "down" : "up"}, ${wheel.px}px every ${wheel.every}ms, at ${hz}Hz on a ${windowHeight}px screen`;
          assert.ok(result.retreat <= 1e-9, `the picture came back ${result.retreat.toFixed(3)} beats (${where})`);
          // Two parts in a hundred of one text's strength: under what an eye can see, and it is the texts'
          // own easing as the picture catches up, not the picture going back (that is `retreat`, above).
          assert.ok(result.comeback <= 0.02, `an explanation that was fading came back by ${(result.comeback * 100).toFixed(1)}% (${where})`);
          assert.equal(result.backwards, 0, `the picture stepped against the reader ${result.backwards} times mid-scroll (${where})`);
          assert.equal(result.overlap, 0, `${result.overlap} frames with two texts (${where})`);
          assert.ok(result.worst.rate <= FASTEST, `${result.worst.name} moved at a full swing per ${(1 / result.worst.rate).toFixed(0)}ms (${where})`);
          assert.ok(!result.end.moving, `still moving 3 seconds after the scroll ended (${where})`);
          if (result.retreat > worst.retreat) worst = { retreat: result.retreat, comeback: Math.max(worst.comeback, result.comeback), where };
          worst.comeback = Math.max(worst.comeback, result.comeback);
        }
      }
    }
  }
  console.log(`        furthest the picture ever came back: ${worst.retreat.toFixed(3)} beats; most an explanation came back: ${(worst.comeback * 100).toFixed(2)}%`);
});

check("that check can fail: without settling onward, the same slow wheels do run the picture backwards", () => {
  const windowHeight = 900;
  let old = { retreat: 0, comeback: 0 };
  let caught = 0;
  for (const wheel of SLOW) {
    const { scrollAt, duration, travel } = slowWheel({ ...wheel, windowHeight, way: 1 });
    const result = replay({ scrollAt, duration, hz: 60, windowHeight, travel, forget: true });
    if (result.retreat > 1e-9) caught += 1;
    old = { retreat: Math.max(old.retreat, result.retreat), comeback: Math.max(old.comeback, result.comeback) };
  }
  assert.ok(old.retreat > 0.15 && old.comeback > 0.3, `the old behaviour came back only ${old.retreat.toFixed(3)} beats and ${(old.comeback * 100).toFixed(0)}%: this replay cannot see the fault it is for`);
  // Not all: a notch every 220ms that glides for 120ms leaves a 100ms pause, too short to count as a stop.
  assert.ok(caught >= SLOW.length * 0.75, `the old behaviour is caught on only ${caught} of the ${SLOW.length} slow wheels`);
  console.log(`        the old behaviour: caught on ${caught} of ${SLOW.length} slow wheels, came back up to ${old.retreat.toFixed(2)} beats, an explanation came back by up to ${(old.comeback * 100).toFixed(0)}%`);
});

check("a wobble as the reader lets go (a few pixels the other way) does not send a settled picture back a line", () => {
  const windowHeight = 900;
  const travel = 1800;
  const at = (u) => u * (travel / BEATS) - windowHeight * LEAD; // the offset for a beat position
  for (const hz of [30, 60, 120]) {
    // Down to just past line 1, stop: the picture settles on line 2. Then a wobble back.
    for (const [back, want, what] of [[6, 1.3, "a 6px wobble"], [Math.floor(TURN * 450) - 1, 1.3, "a wobble just under a real turn"], [60, 0.7, "a real 60px scroll back up"]]) {
      const scrollAt = (t) => (t < 500 ? at(0.4) + (at(0.9) - at(0.4)) * (t / 500) : t < 1300 ? at(0.9) : at(0.9) - back);
      const result = replay({ scrollAt, duration: 1400, hz, windowHeight, travel });
      assert.ok(Math.abs(result.end.x - want) < 1e-9, `after ${what} the picture rests at ${result.end.x.toFixed(3)}, not ${want} (${hz}Hz)`);
    }
    // The same going up: up to just above line 2's stretch, stop (settles on line 1), wobble down.
    for (const [forward, want, what] of [[6, 0.7, "a 6px wobble"], [60, 1.3, "a real 60px scroll back down"]]) {
      const scrollAt = (t) => (t < 500 ? at(1.6) + (at(1.1) - at(1.6)) * (t / 500) : t < 1300 ? at(1.1) : at(1.1) + forward);
      const result = replay({ scrollAt, duration: 1400, hz, windowHeight, travel, way: -1 });
      assert.ok(Math.abs(result.end.x - want) < 1e-9, `going up, after ${what} the picture rests at ${result.end.x.toFixed(3)}, not ${want} (${hz}Hz)`);
    }
  }
});

check("a wobble back ACROSS a line's end, after the picture has settled onward, does not undo it", () => {
  // The third design review's case: stop a few pixels past where line 1 starts to leave (the picture
  // settles on to line 2), then come back a few pixels, which puts the reader inside line 1's own
  // resting stretch again. The picture must stay on line 2 until they really turn round.
  const windowHeight = 900;
  const travel = 1800;
  const at = (u) => u * (travel / BEATS) - windowHeight * LEAD;
  for (const hz of [30, 60, 120]) {
    for (const [past, back, want, what] of [[5, 6, 1.3, "5px past, 6px back"], [3, 4, 1.3, "3px past, 4px back"], [9, 12, 1.3, "9px past, 12px back"], [5, 60, 0.7 - (55 / 450), "5px past, a real 60px back"]]) {
      const stop = at(0.7) + past;
      const scrollAt = (t) => (t < 500 ? at(0.4) + (stop - at(0.4)) * (t / 500) : t < 1300 ? stop : t < 2100 ? stop - back : stop - back);
      const result = replay({ scrollAt, duration: 2200, hz, windowHeight, travel });
      assert.ok(Math.abs(result.end.x - want) < 1e-6, `${what}: the picture rests at ${result.end.x.toFixed(3)}, not ${want.toFixed(3)} (${hz}Hz)`);
    }
    // And for a reader who asked for reduced motion (the picture is only ever on a clean beat).
    const reader = readerAt(0.4);
    let now = 0;
    const step = (u) => { now += 1000 / hz; watch(reader, u, now, true); };
    for (let i = 1; i <= 20; i += 1) step(0.4 + ((0.711 - 0.4) * i) / 20);
    for (let i = 0; i < hz; i += 1) step(0.711);
    assert.equal(reader.target, 1.3, `reduced motion: stopped past line 1's end, the picture is at ${reader.target}`);
    step(0.698);
    for (let i = 0; i < hz; i += 1) step(0.698);
    assert.equal(reader.target, 1.3, `reduced motion: a 6px wobble back sent the picture to ${reader.target}`);
    for (let i = 1; i <= 10; i += 1) step(0.698 - 0.012 * i);
    for (let i = 0; i < hz; i += 1) step(0.578);
    assert.equal(reader.target, 0.578, `reduced motion: a real turn back did not return to line 1 (${reader.target})`);
  }
});

check("a quick flick that lands just past a line never shows the passed-over explanation on the way", () => {
  // Five fast wheel notches, or a phone fling, from one line to just past the end of the next: the
  // picture settles on to the line after, two away from where it started. The explanation in between
  // must not come up and go again (the third design review saw it at 25%, readable).
  let worst = { peak: 0 };
  for (const hz of [30, 60, 120, 240]) {
    for (const windowHeight of [568, 844, 900, 1180]) {
      const travel = windowHeight * 2;
      const beat = travel / BEATS;
      const at = (u) => u * beat - windowHeight * LEAD;
      const flicks = [];
      for (const gapMs of [16, 30, 60]) {
        // down: from the middle of line 1 to just past the end of line 2; up: the mirror.
        flicks.push({ way: 1, name: `wheel flick down, a notch every ${gapMs}ms`, from: 0.5, to: 1.78, over: 4 * gapMs + 120, passed: 1, lands: 2 });
        flicks.push({ way: -1, name: `wheel flick up, a notch every ${gapMs}ms`, from: 2.5, to: 1.22, over: 4 * gapMs + 120, passed: 1, lands: 0 });
      }
      flicks.push({ way: 1, name: "phone fling down", from: 0.45, to: 2.215, over: 900, passed: 1, lands: 2, fling: true });
      flicks.push({ way: 1, name: "long flick down past two lines", from: 0.5, to: 2.78, over: 500, passed: 1, lands: 3 });
      for (const flick of flicks) {
        const scrollAt = (t) => {
          const p = Math.min(1, t / flick.over);
          const eased = flick.fling ? 1 - Math.exp(-5 * p) + p * Math.exp(-5) : p;
          return at(flick.from) + (at(flick.to) - at(flick.from)) * Math.min(1, eased);
        };
        const result = replay({ scrollAt, duration: flick.over + 100, hz, windowHeight, travel, way: flick.way });
        const where = `${flick.name}, at ${hz}Hz on a ${windowHeight}px screen`;
        const landed = frame(result.end.x, result.end.caps).texts.map((t) => t.opacity);
        assert.equal(landed[flick.lands], 1, `${where}: it did not land on text ${flick.lands + 1} (${landed.join(", ")})`);
        assert.ok(result.peaks[flick.passed] < 0.05, `${where}: the passed-over explanation ${flick.passed + 1} showed at ${(result.peaks[flick.passed] * 100).toFixed(0)}%`);
        assert.equal(result.overlap, 0, `${where}: two texts at once`);
        assert.ok(result.worst.rate <= FASTEST, `${where}: ${result.worst.name} moved at a full swing per ${(1 / result.worst.rate).toFixed(0)}ms`);
        if (result.peaks[flick.passed] > worst.peak) worst = { peak: result.peaks[flick.passed], where };
      }
    }
  }
  console.log(`        most a passed-over explanation ever showed: ${(worst.peak * 100).toFixed(1)}%`);
});

check("a brisk steady scroll never leaves an explanation hanging part way: it follows the scroll or it goes", () => {
  // The fourth design review's case: at 2.25 to 3 beats a second the picture runs a little behind,
  // an explanation starts to come up, the reader passes its line, and it was left frozen at whatever
  // strength it had reached (5% to 88%) for a third of a second before leaving.
  let worst = { ms: 0 };
  for (const hz of [30, 60, 120, 240]) {
    for (const windowHeight of [568, 844, 900, 1180]) {
      const travel = windowHeight * 2;
      const beat = travel / BEATS;
      for (const way of [1, -1]) {
        for (let speed = 1; speed <= 4.001; speed += 0.125) {
          const from = way === 1 ? -windowHeight * 0.7 : travel + windowHeight * 0.4;
          const duration = ((travel + windowHeight * 1.1) / (speed * beat)) * 1000;
          const scrollAt = (t) => from + way * speed * beat * (t / 1000);
          const result = replay({ scrollAt, duration, hz, windowHeight, travel, way });
          const where = `${speed} beats a second ${way === 1 ? "down" : "up"}, at ${hz}Hz on a ${windowHeight}px screen`;
          assert.ok(result.frozen.ms <= 60, `explanation ${result.frozen.text} sat at ${(result.frozen.at * 100).toFixed(0)}% for ${Math.round(result.frozen.ms)}ms (${where})`);
          assert.equal(result.overlap, 0, `two texts at once (${where})`);
          assert.ok(result.worst.rate <= FASTEST, `${result.worst.name} moved at a full swing per ${(1 / result.worst.rate).toFixed(0)}ms (${where})`);
          if (result.frozen.ms > worst.ms) worst = { ...result.frozen, where };
        }
      }
    }
  }
  console.log(`        longest any explanation sat part way: ${Math.round(worst.ms)}ms`);
});

check("a stalled main thread mid-scroll (a 400ms hitch) is never mistaken for a stopped reader", () => {
  for (const hz of RATES) {
    for (const stallAt of [300, 700, 1100, 1900]) {
      // A slow steady scroll down, with nothing running for 400ms in the middle of it.
      const result = replay({ scrollAt: (t) => -600 + 0.35 * t, duration: 6000, hz, windowHeight: 844, travel: 1688, stallAt, stallMs: 400 });
      assert.equal(result.backwards, 0, `the picture stepped backwards after a hitch at ${stallAt}ms at ${hz}Hz`);
      assert.equal(result.overlap, 0, `${result.overlap} frames with two texts after a hitch at ${stallAt}ms at ${hz}Hz`);
    }
  }
});

check("a badly overloaded device (5 and 10 frames a second) still never steps backwards or overlaps texts", () => {
  for (const hz of [5, 10, 15]) {
    for (const curve of Object.values(KINDS)) {
      const result = replay({ scrollAt: (t) => -600 + curve(t), duration: 6000, hz, windowHeight: 844, travel: 1688 });
      assert.equal(result.backwards, 0, `the picture stepped backwards ${result.backwards} times at ${hz} frames a second`);
      assert.equal(result.overlap, 0, `${result.overlap} frames with two texts at ${hz} frames a second`);
      assert.ok(result.worst.rate <= FASTEST, `${result.worst.name} moved at a full swing per ${(1 / result.worst.rate).toFixed(0)}ms at ${hz} frames a second`);
      assert.ok(!result.end.moving, `still moving 3 seconds after the scroll ended at ${hz} frames a second`);
    }
  }
});

check("a fling straight past the whole section never flashes a paragraph on the way", () => {
  for (const hz of [60, 120]) {
    const dt = 1000 / hz;
    const state = followerAt(-0.5);
    let seen = 0;
    // The reader is at the far end at once; the picture catches up at its speed limit.
    for (let t = 0; t < 1500; t += dt) {
      follow(state, BEATS, dt);
      const f = frame(state.x, state.caps);
      if (state.x > 0.3 && state.x < CLOSING) seen = Math.max(seen, ...f.texts.slice(0, LINES).map((x) => x.opacity));
    }
    assert.ok(seen < 0.05, `an explanation reached ${(seen * 100).toFixed(0)}% on the way past at ${hz}Hz`);
  }
});

// ---------------------------------------------------------------------------------------------------------
// The closing beat (ADR-0032). The owner, 2026-11-23, from his iPhone: "By the time it animates to the 4th
// thing that comes in the glow should have animated out and the 3 right aligned phrases maybe have animated
// out as the last sentence or whatever calling it comes in". Before this, the light only dimmed by 45% on the
// last beat and the three lines came back to full strength and stayed, under the sentence.
//
// Each rule is a function of a picture function F(u, caps), so the same rule is run against frame() and,
// below, against a planted defect of each kind: a rule that cannot fail is not a rule.
// ---------------------------------------------------------------------------------------------------------
const IN_PLACE = { opacity: 1, y: 0 };
/** How visible line k is: its entrance times its exit (no exit at all counts as never leaving). */
const shows = (f, k) => f.rise[k].opacity * (f.leave ? f.leave[k] : IN_PLACE).opacity;
/** Where the closing sentence first shows at all, going down. */
function sentenceFrom(F) {
  for (const u of positions) if (F(u).texts[CLOSING].opacity > 0) return u;
  return null;
}

/** (a) No glow, no lit blue and no band anywhere from the sentence's first visible position on; and the light
 *  eases out, scrubbed, between the end of beat 3's rest and there. */
function glowRule(F) {
  const from = sentenceFrom(F);
  const bad = [];
  if (from === null) return ["the closing sentence never shows"];
  for (const u of positions) {
    if (u < from) continue;
    const f = F(u);
    if (f.light !== 0) bad.push(`the light is at ${f.light.toFixed(3)} at u=${u}, where the sentence is already showing (from u=${from})`);
    else if (f.lit.some((v) => v !== 0)) bad.push(`a line is lit (${f.lit.map((v) => v.toFixed(3)).join(", ")}) at u=${u}`);
    else if (f.fill.some((v) => Math.abs(v) !== 1)) bad.push(`the blue band is still over a line (${f.fill.map((v) => v.toFixed(3)).join(", ")}) at u=${u}`);
    if (bad.length > 3) break;
  }
  let between = 0;
  let previous = 1;
  for (const u of positions) {
    if (u < plateau(LINES - 1)[1] || u > from) continue;
    const f = F(u);
    if (f.light > 0 && f.light < 1) between += 1;
    if (f.light > previous + 1e-12) bad.push(`the light comes back up on its way out at u=${u}`);
    previous = f.light;
  }
  if (between < 200) bad.push(`the light goes out through only ${between} in-between positions: it is cut, not eased out with the scroll`);
  return bad;
}

/** (b) Once the sentence is fully in, none of the three lines shows; and since it rests where they were, no
 *  line shows at all while any of it does. The lines leave as one staggered move, top line first, scrubbed,
 *  rising away (transform and opacity only), and they finish leaving right where the sentence starts. */
function linesRule(F) {
  const bad = [];
  let partWay = 0;
  let exitEnd = null;
  const last = [1, 1, 1];
  for (const u of positions) {
    const f = F(u);
    const s = f.texts[CLOSING].opacity;
    const on = [0, 1, 2].map((k) => shows(f, k));
    if (s >= 1 && on.some((v) => v > 0)) bad.push(`the sentence is fully in at u=${u} and the lines still show at ${on.map((v) => v.toFixed(3)).join(", ")}`);
    else if (s > 0 && on.some((v) => v > 0)) bad.push(`the sentence (${s.toFixed(3)}) and a line (${on.map((v) => v.toFixed(3)).join(", ")}) are on screen together at u=${u}`);
    if (!f.leave) continue;
    f.leave.forEach((l, k) => {
      if (u > OFF_TO && l.opacity > last[k] + 1e-12) bad.push(`line ${k + 1} comes back while the reader scrolls down at u=${u}`);
      if (u > OFF_TO) last[k] = l.opacity;
      if (Math.abs(l.opacity + l.y - 1) > 1e-9) bad.push(`line ${k + 1}'s lift and fade are not one move at u=${u}`);
      if (l.opacity > 0 && l.opacity < 1) partWay += 1;
    });
    if (f.leave[0].opacity > f.leave[1].opacity + 1e-12 || f.leave[1].opacity > f.leave[2].opacity + 1e-12) bad.push(`the lines do not leave top line first at u=${u}`);
    if (exitEnd === null && f.leave.every((l) => l.opacity === 0)) exitEnd = u;
    if (bad.length > 3) break;
  }
  const end = F(BEATS);
  if (!end.leave) return [...bad, "frame(u) has no exit for the lines (frame(u).leave): they never leave"];
  if (partWay < 1000) bad.push(`the lines were part way out at only ${partWay} positions: they are switched, not scrubbed`);
  const from = sentenceFrom(F);
  if (exitEnd === null || from === null || from - exitEnd > 0.1) bad.push(`the lines finish leaving at u=${exitEnd}, not as the sentence comes in (u=${from})`);
  return bad;
}

/** A finger on the page from beat position `from`: each move eases out over `ms`, is held still for `hold`,
 *  then 1.2s of nothing. Through the same watch and follow the page runs; `F` paints. */
function handOver({ F = frame, hz, windowHeight, from, moves }) {
  const travel = windowHeight * 2;
  const beat = travel / BEATS;
  const at = (u) => u * beat - windowHeight * LEAD;
  const dt = 1000 / hz;
  let y = at(from);
  let t = 0;
  const reader = readerAt(positionOf(y, windowHeight, travel));
  const state = followerAt(reader.target);
  const frames = [];
  for (const { to, ms, hold = 0 } of moves) {
    const start = y;
    for (let e = 0; e < ms + hold + 1200; e += dt) {
      const p = Math.min(1, e / ms);
      y = start + (at(to) - start) * (1 - (1 - p) * (1 - p));
      t += dt;
      watch(reader, positionOf(y, windowHeight, travel), t);
      follow(state, reader.target, dt);
      const before = frames.length ? frames[frames.length - 1].x : state.x;
      // Between two painted positions, the picture at eight points on the way (in the order the reader
      // passed them), so the way down can be compared with the way up at any position, not only at
      // the ones a frame happened to land on.
      const between = [];
      // (Uncapped: the caps belong to the frame's own position, and on a slow drag they are out of the way.)
      for (let i = 1; i < 8; i += 1) between.push({ x: before + ((state.x - before) * i) / 8, f: F(before + ((state.x - before) * i) / 8, null) });
      frames.push({ t, way: Math.sign(at(to) - start), x: state.x, f: F(state.x, state.caps), between });
    }
  }
  return { frames, end: frames[frames.length - 1] };
}

/** What the hand-over paints, as numbers: each line's visibility and lift, the light, the lit lines, the
 *  band, the sentence. */
const handValues = (f) => [
  ...[0, 1, 2].map((k) => shows(f, k)), ...[0, 1, 2].map((k) => (f.leave ? f.leave[k].y : 0)),
  f.light, ...f.lit, ...f.fill.map((v) => (v + 1) / 2), f.texts[CLOSING].opacity, f.texts[LINES - 1].opacity,
];

/** (c) Going back up from the closing beat is the way down run backwards: at every painted position on the
 *  way up the picture is the one painted at that position on the way down; the lines come back last line
 *  first; and it ends on beat 3 exactly as it was. */
function reverseRule(makeF) {
  const bad = [];
  for (const hz of [30, 60, 120]) {
    for (const windowHeight of [659, 852, 900]) {
      const run = handOver({ F: makeF(), hz, windowHeight, from: 2.5, moves: [{ to: 3.7, ms: 1400, hold: 200 }, { to: 2.5, ms: 1400, hold: 200 }] });
      const where = `${windowHeight}px at ${hz}Hz`;
      const turn = run.frames.findIndex((fr) => fr.way === -1);
      const down = run.frames.slice(0, turn).flatMap((fr) => [...fr.between, fr]).filter((fr, i, a) => i === 0 || fr.x > a[i - 1].x);
      const up = run.frames.slice(turn);
      const top = down[down.length - 1].f;
      if ([0, 1, 2].some((k) => shows(top, k) !== 0)) bad.push(`${where}: the lines never left on the way down`);
      for (const fr of up) {
        const i = down.findIndex((d) => d.x >= fr.x);
        if (i <= 0) continue;
        const a = down[i - 1];
        const b = down[i];
        const m = b.x === a.x ? 0 : (fr.x - a.x) / (b.x - a.x);
        const want = handValues(a.f).map((v, j) => v + (handValues(b.f)[j] - v) * m);
        const got = handValues(fr.f);
        const worst = Math.max(...got.map((v, j) => Math.abs(v - want[j])));
        if (worst > 0.01) {
          bad.push(`${where}: going up at u=${fr.x.toFixed(4)} the picture is not the one painted there going down (off by ${worst.toFixed(3)}: ${got.map((v) => v.toFixed(2)).join(" ")} against ${want.map((v) => v.toFixed(2)).join(" ")})`);
          break;
        }
      }
      const back = [0, 1, 2].map((k) => up.findIndex((fr) => shows(fr.f, k) > 0));
      if (!(back[2] >= 0 && back[2] <= back[1] && back[1] <= back[0])) bad.push(`${where}: going up the lines do not come back last line first (first frames ${back.join(", ")})`);
      const end = run.end.f;
      const clean = [0, 1, 2].every((k) => shows(end, k) === 1) && end.light === 1 && end.lit[2] === 1 && end.texts[LINES - 1].opacity === 1 && end.texts[CLOSING].opacity === 0;
      if (!clean) bad.push(`${where}: back up, beat 3 is not as it was (${handValues(end).map((v) => v.toFixed(2)).join(" ")})`);
      if (bad.length > 3) return bad;
    }
  }
  return bad;
}

/** (d) Wherever a reader stops in the hand-over, going down or up, by a slow drag or a flick, every line is all
 *  in or all out, the light all on or all off, and one text is showing: nothing rests part way. */
function restRule(makeF) {
  const bad = [];
  const isClean = (f) => [0, 1, 2].every((k) => shows(f, k) === 0 || shows(f, k) === 1) && (!f.leave || f.leave.every((l) => l.y === 0 || l.y === 1))
    && (f.light === 0 || f.light === 1) && f.lit.every((v) => v === 0 || v === 1) && f.texts.every((x) => x.opacity === 0 || x.opacity === 1);
  for (const hz of [30, 60, 120]) {
    for (const windowHeight of [568, 659, 852, 900, 1180]) {
      for (let stop = 2.66; stop <= 3.34 + 1e-9; stop += 0.04) {
        for (const [from, ms, what] of [[2.5, 900, "a slow drag down"], [2.5, 180, "a flick down"], [3.7, 900, "a slow drag up"], [3.7, 180, "a flick up"]]) {
          const run = handOver({ F: makeF(), hz, windowHeight, from, moves: [{ to: stop, ms, hold: 160 }] });
          if (!isClean(run.end.f)) {
            bad.push(`${what} that stops at u=${stop.toFixed(2)} rests part way (${windowHeight}px at ${hz}Hz): ${handValues(run.end.f).map((v) => v.toFixed(3)).join(" ")}`);
            if (bad.length > 3) return bad;
          }
        }
      }
    }
  }
  return bad;
}

check("the closing beat: the glow has fully eased out, with the scroll, by the time the closing sentence starts to show (ADR-0032)", () => {
  const bad = glowRule(frame);
  assert.deepEqual(bad, [], bad.join(" | "));
});

check("the closing beat: the three lines leave as the sentence comes in, top line first, and none shows once it is in (ADR-0032)", () => {
  const bad = linesRule(frame);
  assert.deepEqual(bad, [], bad.join(" | "));
});

check("the closing beat: going back up is the way down exactly reversed, and it lands on beat 3 as it was (ADR-0032)", () => {
  const bad = reverseRule(() => frame);
  assert.deepEqual(bad, [], bad.join(" | "));
});

check("the closing beat: a stop anywhere in the hand-over, down or up, slow or a flick, never leaves a line, the glow or the sentence part way (ADR-0032)", () => {
  const bad = restRule(() => frame);
  assert.deepEqual(bad, [], bad.join(" | "));
});

check("those four rules can fail: each catches its own planted defect", () => {
  const { ease } = motion;
  const full = (f) => f.leave ?? [IN_PLACE, IN_PLACE, IN_PLACE].map((x) => ({ ...x }));
  // The glow still there, faintly, as the sentence starts (it reaches 0 at 3.12 instead of before 3.05).
  const glowLate = (u, caps) => { const f = frame(u, caps); f.light = Math.max(f.light, u < BEATS ? 1 - ease(2.7, 3.12, u) : 0); return f; };
  // Line 3 left behind at 30% under the sentence.
  const lineStays = (u, caps) => { const f = frame(u, caps); f.leave = full(f).map((l, k) => (k === 2 && u > 3 ? { opacity: Math.max(l.opacity, 0.3), y: Math.min(l.y, 0.7) } : l)); return f; };
  // The sentence starting while line 3 is still on screen.
  const overlap = (u, caps) => { const f = frame(u, caps); f.texts[CLOSING] = { ...f.texts[CLOSING], opacity: Math.max(f.texts[CLOSING].opacity, ease(2.95, 3.3, u)) }; return f; };
  // Once the lines have gone they stay gone: going back up they never return.
  const oneWay = () => { let far = -Infinity; return (u, caps) => { far = Math.max(far, u); const f = frame(u, caps); if (far >= 3.3) f.leave = [0, 1, 2].map(() => ({ opacity: 0, y: 1 })); return f; }; };
  // The exit stretched past the start of the closing beat's rest (3.45 instead of before 3.3).
  const longExit = () => (u, caps) => { const f = frame(u, caps); f.leave = [0, 1, 2].map((k) => { const t = ease(2.7 + 0.05 * k, 3.45, u); return { opacity: 1 - t, y: t }; }); return f; };
  const caught = {
    "glow late": glowRule(glowLate).length,
    "line 3 stays": linesRule(lineStays).length,
    "sentence over a line": linesRule(overlap).length,
    "no way back": reverseRule(oneWay).length,
    "exit past the rest": restRule(longExit).length,
  };
  for (const [what, n] of Object.entries(caught)) assert.ok(n > 0, `the planted defect "${what}" was not caught`);
  console.log(`        caught: ${Object.entries(caught).map(([w, n]) => `${w} (${n})`).join(", ")}`);
});

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
