/**
 * The motion of the How We Work section (ADR-0026), as arithmetic only.
 *
 * No DOM and no React in this file, on purpose. The whole look of the section
 * at any moment is `frame(u)` for one number `u`, the beat position, so it can
 * be checked at EVERY scroll position instead of at the handful a browser
 * test happens to stop on. tests/how-we-work-motion.probe.mjs does that: ten
 * thousand positions, every frame rate, replayed wheel and finger scrolls.
 * how-we-work.tsx only measures the page, calls these, and writes the result.
 *
 * `u` runs along the scroll track: 0 to 1 is the first line's beat, 1 to 2 the
 * second, 2 to 3 the third, 3 to 4 the closing sentence. Below 0 the section
 * is still arriving.
 */

/** The three lines. */
export const LINES = 3;
/** The beat after the last line: the relationship sentence. */
export const CLOSING = LINES;
/** Beats on the track. */
export const BEATS = LINES + 1;

/** The first line starts to light this share of a window's height before the
 *  block finishes arriving, so the reader never looks at a pinned screen on
 *  which nothing has happened. */
export const LEAD = 0.18;
/** How far the two lines that are not current step back. 0.5 keeps them at
 *  least 3:1 against the background in both themes. */
export const QUIET = 0.5;
/** The reader counts as having stopped when the page has not moved for this
 *  long AND for this many frames in a row. Both, because time alone is not
 *  enough: on a busy phone a single frame can take longer than this, and a
 *  timer would then mistake a stalled frame for a stopped reader and tug the
 *  picture backwards in the middle of a scroll. */
export const IDLE_MS = 140;
export const IDLE_FRAMES = 5;

/* The follower: how the painted position chases the scroll position. A
   critically damped spring, so it starts and stops gently and never overshoots,
   with a speed limit, so that however hard the page is flung no fade can finish
   in less than about a tenth of a second. Two beats a second is one screen a
   second: ordinary scrolling is under it and is followed exactly. */
/** The spring's time constant. Following a steady scroll, the picture trails
 *  it by about twice this. */
export const SPRING_MS = 55;
/** The speed limit, in beats per millisecond. */
export const MAX_SPEED = 1 / 500;
/** How quickly it may pick up speed: full speed takes this long to reach, so
 *  even a sudden jump in the scroll position (a notched mouse wheel in Safari,
 *  a click on the scrollbar) sets the picture moving gently. Slowing down is
 *  not limited: it always brakes in time. */
export const RAMP_MS = 110;
/** How quickly an explanation that may show again comes back up to full
 *  (CALM_MS), and how quickly one that was on its way up is taken away when the
 *  reader has already gone past its line (CALM_OUT_MS). Time constants, in ms. */
export const CALM_MS = 70;
export const CALM_OUT_MS = 40;
/** The follower works in steps of at most this long, so it behaves the same at
 *  every frame rate. */
export const SUBSTEP_MS = 4;
/** The longest time one frame may stand for. A slow device's frames (even five
 *  a second) are followed in real time; only a gap longer than this, which
 *  means the tab was in the background, is cut short so the picture does not
 *  arrive in one jump. */
export const MAX_FRAME_MS = 250;

/* Where each beat is at rest: the stretch of the track over which its picture
   does not change at all (its text fully in, the light still). Between two of
   these the picture is in motion. frame() and rest() are both written from
   these numbers so they cannot drift apart. */
/** How much of a beat a text takes to come in or go out, and where. */
const TEXT_IN_FROM = 0.05;
const TEXT_IN_TO = 0.3;
const TEXT_OUT_FROM = 0.7;
const TEXT_OUT_TO = 0.95;
/** The light leaves a line at this point in its beat and lands on the next
 *  line the same distance into the next beat. */
const LAMP_FROM = 0.72;
const LAMP_TO = 1.28;

/** The stretch of beat `k` that is at rest, as [from, to]. */
export function plateau(k: number): [number, number] {
  if (k === 0) return [0.2, TEXT_OUT_FROM];
  if (k === CLOSING) return [CLOSING + TEXT_IN_TO, BEATS];
  return [k + TEXT_IN_TO, k + TEXT_OUT_FROM];
}

export const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));

/** 0 before `from`, 1 after `to`, an ease-in-out in between. */
export function ease(from: number, to: number, x: number) {
  const t = clamp((x - from) / (to - from), 0, 1);
  return t * t * (3 - 2 * t);
}

export type Frame = {
  /** Which line the light is on, as a fraction (1.5 is half way from line 2 to
   *  line 3). It starts one line above the first (-1) and comes down into it. */
  lamp: number;
  /** How much of each line the light covers, 0 to 1. */
  lit: number[];
  /** Where the light's band is against each line: 0 covers the line, -1 is a
   *  whole line above it, 1 a whole line below. The blue is drawn only where
   *  the band is, so it passes down THROUGH the words from one line into the
   *  next instead of one line fading out while the next fades in. */
  fill: number[];
  /** The opacity of the lines' own words (the lines that are not current step back). */
  ink: number;
  /** The three explanations and then the closing sentence. */
  texts: Array<{ opacity: number; y: number }>;
  /** The strength of the light behind the lines. */
  light: number;
};

/** How much of text k shows at `u` when nothing holds it back. */
function textBase(k: number, u: number) {
  if (k === CLOSING) return ease(CLOSING + TEXT_IN_FROM, CLOSING + TEXT_IN_TO, u);
  const arriving = k === 0 ? ease(OFF_TO, plateau(0)[0], u) : ease(k + TEXT_IN_FROM, k + TEXT_IN_TO, u);
  return arriving * (1 - ease(k + TEXT_OUT_FROM, k + TEXT_OUT_TO, u));
}

/**
 * What the section looks like at beat position `u`. Pure, so the picture is
 * the same going down as coming back up. `caps`, when given, is the most each
 * text may show right now (see `follow`): at rest and in slow scrolling every
 * cap is out of the way and the picture is this function of `u` alone.
 */
export function frame(u: number, caps: readonly number[] | null = null): Frame {
  // The sequence switching on as the block arrives, and the last beat.
  const on = ease(OFF_TO, plateau(0)[0], u);
  const closing = ease(CLOSING - 1 + LAMP_FROM, CLOSING + 0.25, u);
  // The light comes down into the first line as the block arrives, rests on a
  // line for the middle of that line's beat, and glides to the next across the
  // boundary.
  let lamp = on - 1;
  for (let k = 0; k < LINES - 1; k += 1) lamp += ease(k + LAMP_FROM, k + LAMP_TO, u);
  const fill: number[] = [];
  const lit: number[] = [];
  for (let k = 0; k < LINES; k += 1) {
    const offset = clamp(lamp - k, -1, 1);
    fill.push(offset);
    lit.push(1 - Math.abs(offset));
  }
  const ink = 1 - QUIET * on * (1 - closing);
  // Each text comes up as the light lands on its line and leaves as the light
  // moves off, so no two texts are ever on screen together.
  const texts: Frame["texts"] = [];
  for (let k = 0; k < LINES; k += 1) {
    const arriving = k === 0 ? ease(OFF_TO, plateau(0)[0], u) : ease(k + TEXT_IN_FROM, k + TEXT_IN_TO, u);
    const leaving = ease(k + TEXT_OUT_FROM, k + TEXT_OUT_TO, u);
    texts.push({ opacity: Math.min(arriving * (1 - leaving), caps ? caps[k] : 1), y: (1 - arriving) * 14 - leaving * 10 });
  }
  const last = ease(CLOSING + TEXT_IN_FROM, CLOSING + TEXT_IN_TO, u);
  texts.push({ opacity: Math.min(last, caps ? caps[CLOSING] : 1), y: (1 - last) * 14 });
  return { lamp, lit, fill, ink, texts, light: on * (1 - 0.45 * closing) };
}

/** Below this the section is still arriving and nothing is lit. At this point
 *  the top of the block is a fifth of a screen from where it will be held, so
 *  the first explanation is on screen by the time it shows: a reader who
 *  pauses on the way in must never be shown a line as "the one you are on"
 *  with its explanation cut off by the bottom of the window. */
export const OFF_TO = -0.05;
/**
 * Where the picture comes to rest for a reader who has stopped at `u`.
 *
 * `direction` is the way they were scrolling (1 down, -1 up, 0 unknown, as on a
 * fresh load). Inside a resting stretch nothing moves. Between two, with no
 * direction, it goes to the nearer. With a direction it always goes ON in that
 * direction, never back: a reader working a mouse wheel one slow notch at a
 * time pauses between notches, and settling back to the nearer stretch at
 * every pause ran the picture backwards and brought a half-faded text back
 * only for it to leave again on the next notch. The picture starts to change
 * exactly where a resting stretch ends, so "they have begun to leave this
 * line" and "stopping now finishes the change" are the same place.
 */
export function rest(u: number, direction: -1 | 0 | 1 = 0) {
  // The stretches in order: "nothing lit" below OFF_TO, then each beat's.
  let lo = OFF_TO;
  if (u <= lo) return u;
  for (let k = 0; k <= CLOSING; k += 1) {
    const [from, to] = plateau(k);
    if (u < from) {
      // In the gap between the stretch that ends at `lo` and this one.
      if (direction === 1) return from;
      if (direction === -1) return lo;
      return u - lo <= from - u ? lo : from;
    }
    if (u <= to) return u;
    lo = to;
  }
  return lo;
}

/** The beat a position comes to rest in, or null while the section is still
 *  arriving (nothing lit). */
export function beatOf(u: number, direction: -1 | 0 | 1 = 0): number | null {
  const r = rest(u, direction);
  if (r <= OFF_TO) return null;
  for (let k = 0; k <= CLOSING; k += 1) {
    if (r <= plateau(k)[1]) return k;
  }
  return CLOSING;
}

/**
 * Where Space, PageDown (direction 1) or Shift+Space, PageUp (direction -1)
 * should take a reader who is at `u`: the middle of the next or the previous
 * beat. A page key scrolls most of a screen, which is nearly two beats, so
 * left alone it skips an explanation. null means "not ours": the browser pages
 * as usual.
 *
 * `u` here is NOT clamped to the track: it may be above the section (negative)
 * or below it (more than `end`, the position at which the block lets go).
 * `page` is how many beats one page key would scroll in the browser that
 * scrolls least (eight tenths of the window; Chromium scrolls a little more,
 * and its own page from just outside the section still lands inside the first
 * or last beat). A reader above the
 * section whose page would carry them PAST the middle of the first beat is
 * stopped there, and one below it whose page up would pass the middle of the
 * last beat is stopped there, so neither end is skipped. We only ever shorten
 * a page, never lengthen one: nothing above or below the section is skipped
 * either.
 *
 * `showing` is the beat the picture is on (or heading for), null for none. It
 * is not always the beat nearest to `u`: the picture settles onward in the
 * direction of travel, so a reader who came back UP to the top of the section
 * has nothing lit where one who came down to the same place has the first
 * line. "Next" is counted from what they can see.
 */
export function keyTarget(u: number, direction: 1 | -1, page: number, end: number, showing: number | null = beatOf(u)): number | null {
  if (u > end) return direction === -1 && u - page < CLOSING + 0.5 ? CLOSING + 0.5 : null;
  if (showing === null) return direction === 1 && u + page > 0.5 ? 0.5 : null;
  const next = showing + direction;
  if (next < 0 || next > CLOSING) return null;
  // The middle of the next beat, but never further than a page from where the
  // reader is: the picture may be settled up to six tenths of a beat ahead of
  // them, and the middle of the beat after that can be more than a page away.
  // A page from here is always inside that beat's resting stretch or just
  // short of it, and stopping there settles on it.
  return direction === 1 ? Math.min(next + 0.5, u + page) : Math.max(next + 0.5, u - page);
}

/** How far back a reader must come before they count as having turned round.
 *  A finger lifting off glass, a trackpad coming to rest and a wheel's last
 *  click all wobble a few pixels the other way; that must not send a picture
 *  that has settled onward back a whole line. About 18px on a 900px screen. */
export const TURN = 0.04;

/**
 * What the frame loop knows about the reader: where they are, whether they
 * are still scrolling, which way they were going, and where the picture
 * should be heading because of it.
 */
export type Reader = {
  position: number; // where they were on the last frame
  movedAt: number; // when that last changed
  still: number; // and for how many frames it has not
  scrolling: boolean;
  direction: -1 | 0 | 1; // which way they are going
  turn: number; // the furthest they have got that way
  // Where the picture settled when they last stopped. If that is AHEAD of
  // them and they carry on the same way, it waits there for them to catch up
  // rather than coming back to meet them.
  held: number | null;
  target: number; // where the picture is heading
};

export function readerAt(u: number): Reader {
  return { position: u, movedAt: 0, still: 0, scrolling: false, direction: 0, turn: u, held: null, target: rest(u) };
}

/**
 * One frame of watching the reader: `u` is where they are now, `now` the
 * frame's time in ms. Sets `reader.target`. While they scroll the picture
 * heads for where they are; once they have stopped (IDLE_FRAMES and IDLE_MS
 * without moving) it heads for a clean beat. `snap` is for a reader who asked
 * for reduced motion: the picture is only ever on a clean beat.
 */
export function watch(reader: Reader, u: number, now: number, snap = false): Reader {
  // Where a stop here would settle, unless the picture is already settled
  // further on in the direction of travel: then it stays there. Otherwise a
  // reader who stopped just past a line's end (the picture goes on to the
  // next) and wobbled a few pixels back, into the first line's own resting
  // stretch, would be sent back a whole line for moving a few pixels.
  const settle = () => {
    const r = rest(u, reader.direction);
    return reader.held !== null && (reader.held - r) * reader.direction > 0 ? reader.held : r;
  };
  if (u !== reader.position) {
    if (reader.direction === 0) reader.direction = u > reader.position ? 1 : -1;
    if ((u - reader.turn) * reader.direction >= 0) reader.turn = u;
    else if (Math.abs(u - reader.turn) > TURN) {
      // They have really turned round, not just wobbled.
      reader.direction = reader.direction === 1 ? -1 : 1;
      reader.turn = u;
      reader.held = null;
    }
    reader.position = u;
    reader.movedAt = now;
    reader.still = 0;
    reader.scrolling = true;
    if (snap) {
      reader.held = settle();
      reader.target = reader.held;
    } else if (reader.held !== null && (reader.held - u) * reader.direction > 0) reader.target = reader.held;
    else {
      reader.held = null;
      reader.target = u;
    }
  } else if (reader.scrolling) {
    reader.still += 1;
    if (reader.still >= IDLE_FRAMES && now - reader.movedAt >= IDLE_MS) {
      // They have stopped: let the picture settle, onward if they had started
      // to leave a line, and remember where.
      reader.scrolling = false;
      reader.held = settle();
      reader.target = reader.held;
    }
  }
  return reader;
}

/** The scroll offset (how far the top of the track is above the top of the
 *  window, in px) for a beat position. The inverse of positionOf. */
export function offsetOf(u: number, windowHeight: number, travel: number) {
  return u * (travel / BEATS) - windowHeight * LEAD;
}

/** The beat position for a scroll offset. `scrolled` is how far the top of
 *  the track is above the top of the window, in px. */
export function positionOf(scrolled: number, windowHeight: number, travel: number) {
  return clamp((scrolled + windowHeight * LEAD) / (travel / BEATS), -1, BEATS);
}

/**
 * The painted position and how it is moving.
 *
 * `caps[k]` is the most text k may show. It exists for one thing: a reader who
 * flicks from one line to somewhere past the next must not see the explanation
 * in between come up and go again on the picture's way through. So a text may
 * only come up while the place the picture is heading for has not already gone
 * past that text's line (in the direction of travel). Once it has, the text can
 * only go down: it follows the scroll out as usual if it was showing in full,
 * and it is taken away over CALM_OUT_MS if it was caught part way up. When the reader
 * comes back to it, it is let up again over CALM_MS.
 */
export type Follower = { x: number; v: number; dir: -1 | 0 | 1; caps: number[]; capV: number[]; moving: boolean };

export function followerAt(u: number): Follower {
  return { x: u, v: 0, dir: 0, caps: [1, 1, 1, 1], capV: [0, 0, 0, 0], moving: false };
}
export function follow(state: Follower, target: number, dt: number): Follower {
  const total = Math.min(MAX_FRAME_MS, Math.max(0, dt));
  const steps = Math.max(1, Math.ceil(total / SUBSTEP_MS));
  const h = total / steps;
  const w = 1 / SPRING_MS;
  let settled = true;
  for (let i = 0; i < steps; i += 1) {
    const before = target - state.x;
    if (before !== 0) state.dir = before > 0 ? 1 : -1;
    let a = w * w * before - 2 * w * state.v;
    // Speeding up (or setting off): limited. Braking: never limited.
    if (a * state.v >= 0) a = clamp(a, -MAX_SPEED / RAMP_MS, MAX_SPEED / RAMP_MS);
    state.v += a * h;
    state.v = clamp(state.v, -MAX_SPEED, MAX_SPEED);
    state.x += state.v * h;
    // Arrived, or stepped across: stop exactly on the target, never past it.
    if (before * (target - state.x) <= 0) {
      state.x = target;
      state.v = 0;
    }
    if (i === steps - 1 && Math.abs(target - state.x) < 0.0005 && Math.abs(state.v) < 0.00001) {
      state.x = target;
      state.v = 0;
    }
    settled = true;
    for (let k = 0; k <= CLOSING; k += 1) {
      const [from, to] = plateau(k);
      // May this text come up? Only while the picture is not heading for
      // somewhere beyond its line.
      const wanted = state.dir === 0 || (state.dir > 0 ? target <= to : target >= from);
      let c = state.caps[k];
      if (wanted) {
        if (c < 1) {
          const wc = 1 / CALM_MS;
          state.capV[k] += (wc * wc * (1 - c) - 2 * wc * state.capV[k]) * h;
          c += state.capV[k] * h;
          if (c >= 0.998) {
            c = 1;
            state.capV[k] = 0;
          } else settled = false;
        }
      } else {
        if (state.capV[k] > 0) state.capV[k] = 0;
        // It can only go down from what it shows now.
        const base = textBase(k, state.x);
        if (base < c) {
          c = base;
          state.capV[k] = 0;
        }
        // Held below what the scroll alone would show: it was caught part way
        // up when the reader went past. Take it away, wherever the picture is
        // on its line by now; left at that strength it would hang there, faint,
        // until the picture got to the end of the line. A text showing all the
        // scroll gives it (cap and scroll agree) just leaves with the scroll.
        if (c > 0 && c < base) {
          const wc = 1 / CALM_OUT_MS;
          state.capV[k] += (wc * wc * (0 - c) - 2 * wc * state.capV[k]) * h;
          c += state.capV[k] * h;
          if (c <= 0.002) {
            c = 0;
            state.capV[k] = 0;
          } else settled = false;
        } else state.capV[k] = 0;
      }
      state.caps[k] = clamp(c, 0, 1);
    }
  }
  state.moving = state.x !== target || !settled;
  return state;
}
