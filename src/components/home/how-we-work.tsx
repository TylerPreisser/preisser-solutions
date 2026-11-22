"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * How We Work: the section directly below the hero (ADR-0026).
 *
 * The hero's three-line wordmark, set on the opposite side, told by scrolling.
 * The section arrives as the three lines and nothing else. It then holds still
 * on screen while the reader scrolls, and one soft light travels down the
 * lines: the line under it turns the primary blue and glows, and that line's
 * explanation is the text showing. The owner, in terms: "Make it jusy the
 * three with no description then scroll reactive that shows description for
 * the 1st then the 2nd then the 3rd. Each should glow as u go." And: "it has
 * to stay flawless but it also needs to bet the smoothest possible scroll
 * reactive." A last beat brings the first two lines back to full strength
 * beside the lit third (the hero's own look) with the relationship sentence.
 *
 * HOW IT MOVES. Nothing is switched on and off at a threshold. The scroll
 * position is turned into one number, the beat position `u` (0 to 1 is the
 * first line's beat, and so on), and `frame(u)` says exactly what the section
 * looks like there: where the light is, how lit each line is, how visible
 * each text is. So everything is scrubbed by the reader's own scrolling,
 * forwards and backwards.
 *   - The number that is painted FOLLOWS the scroll position with a short
 *     ease (FOLLOW_MS), which is what hides the steps of a mouse wheel.
 *   - When scrolling stops part way between two beats, the painted number
 *     eases on to the middle of the nearest beat. The page does not move;
 *     only the picture settles. At rest the reader therefore never sees two
 *     half-faded texts or a light parked between two lines.
 *   - Each frame changes only `opacity` and `transform` (and one custom
 *     property that feeds an opacity). No layout and no repaint of the type.
 *   - No React state: a frame is written straight to the elements, so
 *     scrolling never re-renders anything.
 * Nothing takes over the scroll. With "reduce motion" on, there is no ease
 * and no scrubbing: each beat simply shows.
 *
 * THE COPY IS THE OWNER'S, APPROVED 2026-11-21 ("thats perfect implement it").
 * The three lines, the three explanations and the relationship sentence ship
 * verbatim under ADR-0026. Do not tighten, reorder or "improve" any of it;
 * ADR-0009 records what happens when an agent does. The <Nb> spans below add
 * no characters: they only stop a compound such as "long-term" or "AES-256"
 * from being split across two lines at its hyphen or space.
 *
 * Everything is server-rendered. With no JavaScript, or on a screen too short
 * to pin a block on (a phone on its side), the CSS drops the track and sets
 * the three explanations out one under another, so the words are always
 * readable. A text that is not the current one is transparent, not removed,
 * so a screen reader reads all of them in order.
 */
function Nb({ children }: { children: ReactNode }) {
  return <span className="ps-how__nobr">{children}</span>;
}

const STEPS: ReadonlyArray<{ line: string; body: ReactNode }> = [
  {
    line: "Get to know your business.",
    body: (
      <>
        We sit down with you to learn how we can add value for your business
        and what your goals are.
      </>
    ),
  },
  {
    line: "Build a custom solution.",
    body: (
      <>
        World-class custom software at <Nb>Fortune 500</Nb> grade, engineered
        for your business alone. It runs on a global edge network spanning 300+
        cities, with <Nb>AES-256</Nb> encryption, <Nb>post-quantum</Nb> secured
        connections and <Nb>multi-factor</Nb> <Nb>sign-in</Nb>, and the most
        advanced AI models wired directly into your data.
      </>
    ),
  },
  {
    line: "Stand behind it.",
    body: (
      <>
        We support and stand by every solution we build. If a bug turns up, we
        fix it. When you want it to do more, we <Nb>expand it.</Nb> As your
        business grows, your software grows with it.
      </>
    ),
  },
];

// The beat after the last line: the relationship sentence.
const CLOSING = STEPS.length;
const BEATS = STEPS.length + 1;

// The first line starts to light a little before the block finishes arriving,
// so the reader is never looking at a pinned screen on which nothing has
// happened. A share of the window's height.
const LEAD = 0.18;
// How far the two lines that are not current step back (0.5 keeps them at
// least 3:1 against the background in both themes).
const QUIET = 0.5;
// How quickly the picture follows the scroll position, as a time constant.
const FOLLOW_MS = 85;
// How long after the last scroll event the reader counts as having stopped.
const IDLE_MS = 140;

const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));

/** 0 before `from`, 1 after `to`, an ease-in-out in between. */
function ease(from: number, to: number, x: number) {
  const t = clamp((x - from) / (to - from), 0, 1);
  return t * t * (3 - 2 * t);
}

/**
 * What the section looks like at beat position `u`. Pure, so the picture is
 * the same going down as coming back up.
 */
function frame(u: number) {
  // The sequence switching on as the block arrives, and the last beat.
  const on = ease(-0.3, 0.15, u);
  const closing = ease(2.85, 3.2, u);
  // Which line the light is on, as a fraction: it rests on a line for most of
  // that line's beat and glides to the next across the boundary.
  const lamp = ease(0.8, 1.2, u) + ease(1.8, 2.2, u);
  const lit = STEPS.map((_, k) => on * Math.max(0, 1 - Math.abs(lamp - k)));
  const ink = 1 - QUIET * on * (1 - closing);
  // Each text comes up as the light lands on its line and leaves as the light
  // moves off, so no two texts are ever on screen together.
  const texts = STEPS.map((_, k) => {
    const arriving = k === 0 ? ease(-0.12, 0.15, u) : ease(k + 0.04, k + 0.2, u);
    const leaving = ease(k + 0.8, k + 0.95, u);
    return { opacity: arriving * (1 - leaving), y: (1 - arriving) * 14 - leaving * 10 };
  });
  const last = ease(CLOSING + 0.05, CLOSING + 0.22, u);
  texts.push({ opacity: last, y: (1 - last) * 14 });
  return { lamp, lit, ink, texts, light: on * (1 - 0.45 * closing) };
}

/** Where the picture comes to rest for a reader who has stopped at `u`. */
function rest(u: number) {
  if (u < -0.1) return Math.min(u, -0.35);
  return clamp(Math.floor(u), 0, CLOSING) + 0.5;
}

export function HowWeWork() {
  const trackRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const pin = pinRef.current;
    const light = lightRef.current;
    if (!track || !pin || !light) return;
    const lines = Array.from(track.querySelectorAll<HTMLElement>(".ps-how__line"));
    const inks = Array.from(track.querySelectorAll<HTMLElement>(".ps-how__ink"));
    const texts = Array.from(track.querySelectorAll<HTMLElement>(".ps-how__step"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    let pinned = false;
    let travel = 0;
    let boxes: Array<{ x: number; y: number; w: number; h: number }> = [];
    let shown = Number.NaN; // the beat position that is painted
    let target = 0; // the one it is heading for
    let scrolling = false;
    let raf = 0;
    let lastTime = 0;
    let idle = 0;

    const position = () =>
      clamp((-track.getBoundingClientRect().top + window.innerHeight * LEAD) / (travel / BEATS), -1, BEATS);

    const paint = (u: number) => {
      const f = frame(u);
      lines.forEach((line, k) => line.style.setProperty("--lit", f.lit[k].toFixed(3)));
      inks.forEach((ink) => {
        ink.style.opacity = f.ink.toFixed(3);
      });
      texts.forEach((text, k) => {
        const t = f.texts[k];
        text.style.opacity = t.opacity.toFixed(3);
        text.style.transform = `translate3d(0, ${t.y.toFixed(2)}px, 0)`;
        // Only the text that is showing can be selected or clicked.
        if (t.opacity > 0.5) text.setAttribute("data-on", "true");
        else text.removeAttribute("data-on");
      });
      // The light takes the shape of the line it is on and glides between the
      // shapes of two lines while it is between them.
      const a = boxes[clamp(Math.floor(f.lamp), 0, boxes.length - 1)];
      const b = boxes[clamp(Math.ceil(f.lamp), 0, boxes.length - 1)];
      if (a && b) {
        const m = f.lamp - Math.floor(f.lamp);
        const w = a.w + (b.w - a.w) * m;
        const h = a.h + (b.h - a.h) * m;
        const cx = a.x + a.w / 2 + (b.x + b.w / 2 - a.x - a.w / 2) * m;
        const cy = a.y + a.h / 2 + (b.y + b.h / 2 - a.y - a.h / 2) * m;
        light.style.transform = `translate3d(${(cx - 50).toFixed(1)}px, ${(cy - 50).toFixed(1)}px, 0) scale(${((w * 1.3) / 100).toFixed(3)}, ${((h * 3) / 100).toFixed(3)})`;
      }
      light.style.opacity = f.light.toFixed(3);
      // For anything that needs the beat as a fact: tests, and the next person.
      const beat = u < -0.1 ? null : clamp(Math.floor(u), 0, CLOSING);
      if (beat === null) track.removeAttribute("data-step");
      else if (track.getAttribute("data-step") !== String(beat)) track.setAttribute("data-step", String(beat));
    };

    const tick = (now: number) => {
      raf = 0;
      const dt = Math.min(64, now - lastTime);
      lastTime = now;
      if (reduce.matches || Number.isNaN(shown)) shown = target;
      else {
        shown += (target - shown) * (1 - Math.exp(-dt / FOLLOW_MS));
        if (Math.abs(target - shown) < 0.0005) shown = target;
      }
      paint(shown);
      if (shown !== target || scrolling) raf = window.requestAnimationFrame(tick);
    };
    const run = () => {
      if (raf === 0) {
        lastTime = performance.now();
        raf = window.requestAnimationFrame(tick);
      }
    };

    const onScroll = () => {
      if (!pinned) return;
      scrolling = true;
      const u = position();
      target = reduce.matches ? rest(u) : u;
      window.clearTimeout(idle);
      idle = window.setTimeout(() => {
        scrolling = false;
        target = rest(position());
        run();
      }, IDLE_MS);
      run();
    };

    // Everything that depends on the size of things. Runs at the start and
    // whenever the window or the type changes size (a web font arriving).
    const measure = () => {
      pinned = getComputedStyle(pin).position === "sticky";
      travel = track.offsetHeight - pin.offsetHeight;
      if (!pinned || travel <= 0) {
        // The stacked layout: hand every look back to the stylesheet.
        pinned = false;
        window.cancelAnimationFrame(raf);
        raf = 0;
        lines.forEach((line) => line.style.removeProperty("--lit"));
        inks.forEach((ink) => ink.style.removeProperty("opacity"));
        texts.forEach((text) => {
          text.style.removeProperty("opacity");
          text.style.removeProperty("transform");
          text.removeAttribute("data-on");
        });
        light.style.removeProperty("opacity");
        track.removeAttribute("data-step");
        shown = Number.NaN;
        return;
      }
      boxes = lines.map((line) => ({ x: line.offsetLeft, y: line.offsetTop, w: line.offsetWidth, h: line.offsetHeight }));
      target = rest(position());
      shown = target;
      paint(shown);
    };

    measure();
    const sizes = new ResizeObserver(measure);
    sizes.observe(track);
    lines.forEach((line) => sizes.observe(line));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      sizes.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(idle);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={trackRef} className="ps-how" id="how-we-work" aria-labelledby="how-heading">
      <div ref={pinRef} className="ps-how__pin">
        <div className="ps-container">
          <p className="ps-eyebrow ps-how__eyebrow">How We Work</p>

          <div className="ps-how__stage">
            <span ref={lightRef} className="ps-how__light" aria-hidden="true" />
            <h2 id="how-heading" className="ps-how__headline">
              {STEPS.map((item, i) => (
                // data-text feeds the lit copy of the line, which is drawn by
                // the stylesheet over the line and faded in. It is not in the
                // page's text, so the heading reads once.
                <span key={item.line} className="ps-how__line" data-text={item.line}>
                  <span className="ps-how__ink">
                    {item.line}
                    {i < STEPS.length - 1 ? " " : ""}
                  </span>
                </span>
              ))}
            </h2>
          </div>

          <div className="ps-how__slot">
            {STEPS.map((item, i) => (
              <div key={item.line} className="ps-how__step">
                <p className="ps-eyebrow ps-how__num">
                  0{i + 1} · {item.line.replace(/\.$/, "")}
                </p>
                <p className="ps-how__body">{item.body}</p>
              </div>
            ))}

            <div className="ps-how__step ps-how__step--closing">
              <p className="ps-how__belief">
                We believe in building <Nb>long-term</Nb> relationships with all
                of our clients, because we want your success to be our success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
