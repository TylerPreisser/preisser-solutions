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
 *   - wherever the reader stops, the picture settles on one clean beat, the nearest
 *     one, and settling is stable
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
  BEATS, CLOSING, IDLE_MS, LINES, MAX_SPEED, beatOf, follow, followerAt, frame, plateau, positionOf, rest,
} from "../src/components/home/how-we-work-motion.ts";

let pass = 0;
let fail = 0;
function check(name, fn) {
  try {
    fn();
    pass += 1;
    console.log(`  PASS  ${name}`);
  } catch (error) {
    fail += 1;
    console.log(`  FAIL  ${name}\n        ${String(error.message).split("\n")[0]}`);
  }
}

/** Every number the section paints at `u`, flattened, with names for messages. */
function values(u, calm = 1) {
  const f = frame(u, calm);
  const out = { light: f.light, ink: f.ink, lamp: f.lamp / (LINES - 1) };
  f.lit.forEach((v, k) => { out[`line ${k + 1} lit`] = v; });
  f.texts.forEach((t, k) => { out[`text ${k + 1} opacity`] = t.opacity; });
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
  for (const u of positions.filter((x) => x <= -0.3)) {
    const f = frame(u);
    assert.ok(f.light === 0 && f.ink === 1 && f.lit.every((v) => v === 0) && f.texts.every((t) => t.opacity === 0), `something shows at u=${u}`);
  }
});

check("the middle of each beat is exactly its own clean picture", () => {
  for (let k = 0; k < LINES; k += 1) {
    const f = frame(k + 0.5);
    assert.deepEqual(f.lit, [0, 1, 2].map((i) => (i === k ? 1 : 0)), `beat ${k + 1} lit`);
    assert.deepEqual(f.texts.map((t) => t.opacity), [0, 1, 2, 3].map((i) => (i === k ? 1 : 0)), `beat ${k + 1} texts`);
    assert.ok(f.texts[k].y === 0 && f.light === 1 && f.lamp === k, `beat ${k + 1} is not at rest`);
  }
  const end = frame(CLOSING + 0.5);
  assert.deepEqual(end.lit, [0, 0, 1], "closing lit");
  assert.deepEqual(end.texts.map((t) => t.opacity), [0, 0, 0, 1], "closing texts");
  assert.equal(end.ink, 1, "the first two lines are not back at full strength on the closing beat");
});

check("wherever the reader stops, the picture settles on the nearest clean beat, and stays there", () => {
  for (const u of positions) {
    const r = rest(u);
    assert.equal(rest(r), r, `settling is not stable at u=${u}: ${r} then ${rest(r)}`);
    const f = frame(r);
    const all = [...f.lit, ...f.texts.map((t) => t.opacity)];
    assert.ok(all.every((v) => v === 0 || v === 1), `a half state at rest for u=${u}: ${all.join(", ")}`);
    assert.ok(f.texts.every((t) => t.y === 0 || t.opacity === 0), `a text rests off its line for u=${u}`);
    const beat = beatOf(u);
    if (beat === null) {
      assert.ok(f.texts.every((t) => t.opacity === 0) && f.light === 0, `something shows at rest while arriving, u=${u}`);
    } else {
      assert.equal(f.texts.filter((t) => t.opacity === 1).length, 1, `not exactly one text at rest for u=${u}`);
      assert.equal(f.texts[beat].opacity, 1, `the text at rest is not beat ${beat + 1}'s for u=${u}`);
      assert.equal(f.lit[Math.min(beat, LINES - 1)], 1, `the lit line at rest is wrong for u=${u}`);
      // The nearest: never further than half the widest gap between two resting stretches.
      assert.ok(Math.abs(r - u) <= 0.31, `settling travels ${Math.abs(r - u).toFixed(2)} beats from u=${u}`);
    }
  }
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
      assert.equal(state.calm, 1, `the texts are not calm on arrival at ${hz}Hz going ${from} to ${to}`);
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
 * Replays a scroll (a function from time in ms to scroll offset in px) through the same loop the
 * component runs, and returns the fastest any painted value moved (per ms), whether two texts were
 * ever on screen together, and whether the picture ever passed the reader.
 */
function replay({ scrollAt, duration, hz, windowHeight, travel, eventEvery = 0 }) {
  const dt = 1000 / hz;
  let state = null;
  let target = 0;
  let lastEvent = -Infinity;
  let lastScroll = scrollAt(0);
  let previous = null;
  let worst = { rate: 0 };
  let overlap = 0;
  for (let t = 0; t <= duration + 3000; t += dt) {
    const scroll = scrollAt(Math.min(t, duration));
    // The browser tells the page about scrolling at most once a frame, sometimes less often.
    const due = eventEvery === 0 || Math.floor(t / eventEvery) !== Math.floor((t - dt) / eventEvery);
    if (scroll !== lastScroll && due) {
      lastScroll = scroll;
      lastEvent = t;
      target = positionOf(scroll, windowHeight, travel);
    } else if (t - lastEvent >= IDLE_MS) {
      target = rest(positionOf(lastScroll, windowHeight, travel));
    }
    if (state === null) state = followerAt(target);
    else follow(state, target, dt);
    const now = values(state.x, state.calm);
    if (previous) {
      for (const name of Object.keys(now)) {
        const rate = Math.abs(now[name] - previous[name]) / dt;
        if (rate > worst.rate) worst = { rate, name, t: Math.round(t) };
      }
    }
    if (frame(state.x, state.calm).texts.filter((x) => x.opacity > 0.02).length > 1) overlap += 1;
    previous = now;
  }
  return { worst, overlap, end: state };
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
        assert.ok(result.worst.rate <= FASTEST, `${result.worst.name} moved at a full swing per ${(1 / result.worst.rate).toFixed(0)}ms ${where} (t=${result.worst.t}ms)`);
        if (result.worst.rate > worst.rate) worst = { ...result.worst, where };
        assert.ok(!result.end.moving, `still moving 3 seconds after the scroll ended ${where}`);
        const landed = frame(result.end.x, result.end.calm);
        assert.ok([...landed.lit, ...landed.texts.map((x) => x.opacity)].every((v) => v === 0 || v === 1), `did not come to a clean rest ${where}`);
      }
    }
    console.log(`        fastest: ${worst.name}, a full swing per ${(1 / worst.rate).toFixed(0)}ms ${worst.where}`);
  });
}

check("scroll events arriving late (every 50ms, a busy main thread) change nothing about that", () => {
  for (const hz of RATES) {
    const result = replay({ scrollAt: (t) => -600 + 1500 * (1 - Math.exp(-t / 350)), duration: 6000, hz, windowHeight: 844, travel: 1688, eventEvery: 50 });
    assert.equal(result.overlap, 0, `${result.overlap} frames with two texts at ${hz}Hz`);
    assert.ok(result.worst.rate <= FASTEST, `${result.worst.name} moved at a full swing per ${(1 / result.worst.rate).toFixed(0)}ms at ${hz}Hz`);
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
      const f = frame(state.x, state.calm);
      if (state.x > 0.3 && state.x < CLOSING) seen = Math.max(seen, ...f.texts.slice(0, LINES).map((x) => x.opacity));
    }
    assert.ok(seen < 0.05, `an explanation reached ${(seen * 100).toFixed(0)}% on the way past at ${hz}Hz`);
  }
});

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
