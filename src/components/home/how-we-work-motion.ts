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
/** How long after the last scroll event the reader counts as having stopped. */
export const IDLE_MS = 140;

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
/** Texts stay out of the way while the picture is this many beats behind the
 *  reader (a fling), fading back as it closes to the smaller number, so a
 *  paragraph never flashes past on the way to another. */
export const CALM_NEAR = 0.45;
export const CALM_FAR = 0.9;
/** The time constant of that fading. */
export const CALM_MS = 70;
/** The follower works in steps of at most this long, so it behaves the same at
 *  every frame rate. */
export const SUBSTEP_MS = 4;
/** The longest time one frame may stand for, so a tab that was in the
 *  background does not arrive in one jump. */
export const MAX_FRAME_MS = 64;

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
  /** Which line the light is on, as a fraction (1.5 is half way from line 2 to line 3). */
  lamp: number;
  /** How lit each line is, 0 to 1. */
  lit: number[];
  /** The opacity of the lines' own words (the lines that are not current step back). */
  ink: number;
  /** The three explanations and then the closing sentence. */
  texts: Array<{ opacity: number; y: number }>;
  /** The strength of the light behind the lines. */
  light: number;
};

/**
 * What the section looks like at beat position `u`. Pure, so the picture is
 * the same going down as coming back up. `calm` (0 to 1) only scales the
 * texts: it is 1 except while the picture is catching up with a fling.
 */
export function frame(u: number, calm = 1): Frame {
  // The sequence switching on as the block arrives, and the last beat.
  const on = ease(-0.3, 0.2, u);
  const closing = ease(CLOSING - 1 + LAMP_FROM, CLOSING + 0.25, u);
  // The light rests on a line for the middle of that line's beat and glides to
  // the next across the boundary.
  let lamp = 0;
  for (let k = 0; k < LINES - 1; k += 1) lamp += ease(k + LAMP_FROM, k + LAMP_TO, u);
  const lit: number[] = [];
  for (let k = 0; k < LINES; k += 1) lit.push(on * Math.max(0, 1 - Math.abs(lamp - k)));
  const ink = 1 - QUIET * on * (1 - closing);
  // Each text comes up as the light lands on its line and leaves as the light
  // moves off, so no two texts are ever on screen together.
  const texts: Frame["texts"] = [];
  for (let k = 0; k < LINES; k += 1) {
    const arriving = k === 0 ? ease(-0.1, 0.2, u) : ease(k + TEXT_IN_FROM, k + TEXT_IN_TO, u);
    const leaving = ease(k + TEXT_OUT_FROM, k + TEXT_OUT_TO, u);
    texts.push({ opacity: arriving * (1 - leaving) * calm, y: (1 - arriving) * 14 - leaving * 10 });
  }
  const last = ease(CLOSING + TEXT_IN_FROM, CLOSING + TEXT_IN_TO, u);
  texts.push({ opacity: last * calm, y: (1 - last) * 14 });
  return { lamp, lit, ink, texts, light: on * (1 - 0.45 * closing) };
}

/** The beat a position belongs to: the one whose resting stretch is nearest.
 *  null while the section is still arriving. */
export function beatOf(u: number): number | null {
  if (u < -0.1) return null;
  let best = 0;
  let bestDistance = Infinity;
  for (let k = 0; k <= CLOSING; k += 1) {
    const [from, to] = plateau(k);
    const distance = u < from ? from - u : u > to ? u - to : 0;
    if (distance < bestDistance) {
      best = k;
      bestDistance = distance;
    }
  }
  return best;
}

/** Where the picture comes to rest for a reader who has stopped at `u`: the
 *  nearest point at which a beat is at rest (so it moves as little as it can),
 *  or nothing at all while the section is arriving. */
export function rest(u: number) {
  const beat = beatOf(u);
  if (beat === null) return Math.min(u, -0.35);
  const [from, to] = plateau(beat);
  return clamp(u, from, to);
}

/** The beat position for a scroll offset. `scrolled` is how far the top of
 *  the track is above the top of the window, in px. */
export function positionOf(scrolled: number, windowHeight: number, travel: number) {
  return clamp((scrolled + windowHeight * LEAD) / (travel / BEATS), -1, BEATS);
}

/** The follower's state: the painted position, its speed, and how calm the
 *  texts are. */
export type Follower = { x: number; v: number; calm: number; calmV: number; moving: boolean };

export function followerAt(u: number): Follower {
  return { x: u, v: 0, calm: 1, calmV: 0, moving: false };
}

/**
 * Advances the follower by `dt` ms towards `target`, in place. `moving` is
 * false once it has arrived and the texts are calm, which is when the caller
 * may stop asking for frames.
 */
export function follow(state: Follower, target: number, dt: number): Follower {
  const total = Math.min(MAX_FRAME_MS, Math.max(0, dt));
  const steps = Math.max(1, Math.ceil(total / SUBSTEP_MS));
  const h = total / steps;
  const w = 1 / SPRING_MS;
  const wc = 1 / CALM_MS;
  for (let i = 0; i < steps; i += 1) {
    const before = target - state.x;
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
    const wanted = 1 - ease(CALM_NEAR, CALM_FAR, Math.abs(target - state.x));
    const gap = wanted - state.calm;
    state.calmV += (wc * wc * gap - 2 * wc * state.calmV) * h;
    state.calm += state.calmV * h;
    if (gap * (wanted - state.calm) <= 0) {
      state.calm = wanted;
      state.calmV = 0;
    }
    state.calm = clamp(state.calm, 0, 1);
  }
  if (Math.abs(target - state.x) < 0.0005 && Math.abs(state.v) < 0.00001) {
    state.x = target;
    state.v = 0;
  }
  if (state.x === target && Math.abs(1 - state.calm) < 0.002) {
    state.calm = 1;
    state.calmV = 0;
  }
  state.moving = state.x !== target || state.calm !== 1;
  return state;
}
