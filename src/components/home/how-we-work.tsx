"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { BEATS, LEAD, beatOf, clamp, follow, followerAt, frame, keyTarget, offsetOf, positionOf, readerAt, watch } from "./how-we-work-motion";

/**
 * How We Work: the section directly below the hero (ADR-0026).
 *
 * The hero's three-line wordmark, set on the opposite side, told by scrolling.
 * The section arrives as the three lines and nothing else. It then holds still
 * on screen while the reader scrolls, and one band of light travels down
 * through the lines: the words inside it are the primary blue and glow, so the
 * blue passes from one line into the next, and the explanation of the line it
 * is on is the text showing. The owner, in terms: "Make it jusy the
 * three with no description then scroll reactive that shows description for
 * the 1st then the 2nd then the 3rd. Each should glow as u go." And: "it has
 * to stay flawless but it also needs to bet the smoothest possible scroll
 * reactive." A last beat brings the first two lines back to full strength
 * beside the lit third (the hero's own look) with the relationship sentence.
 *
 * HOW IT MOVES. Nothing is switched on and off at a threshold. The scroll
 * position is turned into one number, the beat position `u` (0 to 1 is the
 * first line's beat, and so on), and `frame(u)` (how-we-work-motion.ts, which
 * holds all the arithmetic and is tested at every position) says exactly what
 * the section looks like there: where the light is, how lit each line is, how visible
 * each text is. So everything is scrubbed by the reader's own scrolling,
 * forwards and backwards.
 *   - The number that is painted FOLLOWS the scroll position on a damped
 *     spring with a speed limit. That hides the steps of a mouse wheel, starts
 *     and stops gently, never overshoots, and means that however hard the
 *     page is flung no fade finishes in under about a tenth of a second.
 *     While the picture is catching up with a fling the texts stay out of the
 *     way, so a paragraph never flashes past on the way to another.
 *   - "Stopped" is judged inside the frame loop: the page has not moved for
 *     140ms and for five frames running. A timer alone would mistake one
 *     slow frame on a busy phone for a stopped reader.
 *   - When scrolling stops part way between two beats, the painted number
 *     eases on to the nearest point at which a beat is at rest. The page does
 *     not move; only the picture settles. At rest the reader therefore never
 *     sees two half-faded texts or a light parked between two lines.
 *   - As the section arrives from the hero, the three lines come in with the
 *     scroll, one after another, before anything lights (ADR-0031). That is
 *     part of `frame(u)` too, so it is scrubbed, runs backwards going up, and
 *     never rests part way.
 *   - The scroll position is measured against the held block's own height
 *     (one small-viewport screen), never window.innerHeight: on a phone the
 *     inner height changes by about 190px whenever the browser's toolbar slides,
 *     and that alone used to move the picture by a tenth of a beat.
 *   - Each frame changes only `opacity` and `transform` (and one custom
 *     property that feeds an opacity). No layout and no repaint of the type.
 *   - No React state: a frame is written straight to the elements, so
 *     scrolling never re-renders anything.
 * Nothing takes over the scroll, with one small exception for the keyboard:
 * Space and PageDown scroll most of a screen, which is nearly two beats, so
 * while the block is held they are made to move exactly one beat (otherwise a
 * keyboard reader never sees the second explanation). With "reduce motion"
 * on, there is no ease and no scrubbing: each beat simply shows.
 *
 * IF IT DOES NOT FIT. The held block is one screen high. When the lines and
 * the longest explanation do not fit in it (a very short window, a reader's
 * own text spacing or zoom), the component marks the section data-stacked and
 * the stylesheet lays everything out to read instead, exactly as it does with
 * no JavaScript. Nothing is ever clipped to keep the effect.
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

/** How far the soft light behind the lit line reaches, as a multiple of the line's own width and
 *  height. Close to the words: the owner asked for the glow "a bit tighter around the words"
 *  (2026-11-22); it was 1.3 wide and 3 high. */
const LIGHT_WIDE = 1.14;
const LIGHT_HIGH = 2;

export function HowWeWork() {
  const trackRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const pin = pinRef.current;
    const light = lightRef.current;
    if (!track || !pin || !light) return;
    const content = pin.firstElementChild as HTMLElement;
    const lines = Array.from(track.querySelectorAll<HTMLElement>(".ps-how__line"));
    const inks = Array.from(track.querySelectorAll<HTMLElement>(".ps-how__ink"));
    const fills = Array.from(track.querySelectorAll<HTMLElement>(".ps-how__fill"));
    const fillIns = Array.from(track.querySelectorAll<HTMLElement>(".ps-how__fill-in"));
    const texts = Array.from(track.querySelectorAll<HTMLElement>(".ps-how__step"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    let pinned = false;
    let travel = 0;
    // The height of the held block: one small-viewport screen (100svh), which a
    // phone's toolbar sliding away does not change. Every scroll position is
    // turned into a beat position against this, never against
    // window.innerHeight, which the toolbar does change.
    let vh = 0;
    // How far below its place a line starts its entrance, in px: about eight
    // tenths of its own type size, between 18 and 34px (the hero's lines rise 24px).
    let riseBy = 0;
    let boxes: Array<{ x: number; y: number; w: number; h: number }> = [];
    // How far each band window travels for one line's worth of the light: the
    // line's height plus one of the window's two soft margins, so the band is
    // one piece as it passes from a line to the next, plus the little by which
    // the tails of g and y hang below a line, so that at a whole line away the
    // window is clear of every letter. Exact, not rounded: a fraction of a
    // pixel matters on a phone.
    let fillHeights: number[] = [];
    let shown = followerAt(0); // the beat position that is painted, and how it is moving
    let reader = readerAt(0); // where the reader is, and where that sends the picture
    let raf = 0;
    let lastTime = 0;

    const position = () => positionOf(-track.getBoundingClientRect().top, vh, travel);

    const paint = (u: number, caps: readonly number[]) => {
      const f = frame(u, caps);
      lines.forEach((line, k) => {
        line.style.setProperty("--lit", f.lit[k].toFixed(3));
        // The entrance. With reduced motion the lines are simply there.
        if (reduce.matches) {
          line.style.removeProperty("opacity");
          line.style.removeProperty("transform");
        } else {
          line.style.opacity = f.rise[k].opacity.toFixed(3);
          line.style.transform = `translate3d(0, ${(f.rise[k].y * riseBy).toFixed(2)}px, 0)`;
        }
      });
      // The band: a window the height of the line that slides down over the
      // blue copy of the words, while the copy itself is moved back by the
      // same amount so the words stay exactly where they are.
      fills.forEach((fill, k) => {
        const by = f.fill[k] * (fillHeights[k] || 0);
        fill.style.transform = `translate3d(0, ${by.toFixed(2)}px, 0)`;
        fillIns[k].style.transform = `translate3d(0, ${(-by).toFixed(2)}px, 0)`;
      });
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
      // The glow behind the band takes the shape of the line it is on and
      // glides between the shapes of two lines while it is between them. On
      // its way in it comes down from one line above the first.
      const first = boxes[0];
      if (first) {
        let w = first.w;
        let h = first.h;
        let cx = first.x + first.w / 2;
        let cy = first.y + first.h / 2 + Math.min(0, f.lamp) * first.h;
        if (f.lamp > 0) {
          const a = boxes[clamp(Math.floor(f.lamp), 0, boxes.length - 1)];
          const b = boxes[clamp(Math.ceil(f.lamp), 0, boxes.length - 1)];
          const m = f.lamp - Math.floor(f.lamp);
          w = a.w + (b.w - a.w) * m;
          h = a.h + (b.h - a.h) * m;
          cx = a.x + a.w / 2 + (b.x + b.w / 2 - a.x - a.w / 2) * m;
          cy = a.y + a.h / 2 + (b.y + b.h / 2 - a.y - a.h / 2) * m;
        }
        light.style.transform = `translate3d(${(cx - 50).toFixed(1)}px, ${(cy - 50).toFixed(1)}px, 0) scale(${((w * LIGHT_WIDE) / 100).toFixed(3)}, ${((h * LIGHT_HIGH) / 100).toFixed(3)})`;
      }
      light.style.opacity = f.light.toFixed(3);
      // For anything that needs the beat as a fact: tests, and the next person.
      const beat = beatOf(u);
      if (beat === null) track.removeAttribute("data-step");
      else if (track.getAttribute("data-step") !== String(beat)) track.setAttribute("data-step", String(beat));
    };

    const tick = (now: number) => {
      raf = 0;
      const dt = now - lastTime;
      lastTime = now;
      // Where the reader is now, read every frame (scroll events can arrive
      // late or bunched; the position itself is always current).
      watch(reader, position(), now, reduce.matches);
      if (reduce.matches) shown = followerAt(reader.target);
      else follow(shown, reader.target, dt);
      paint(shown.x, shown.caps);
      if (shown.moving || reader.scrolling) raf = window.requestAnimationFrame(tick);
      // Lets a test (or anything else) wait for the picture to come to rest
      // instead of guessing how long that takes.
      else track.removeAttribute("data-moving");
    };
    const run = () => {
      if (raf === 0) {
        lastTime = performance.now();
        track.setAttribute("data-moving", "true");
        raf = window.requestAnimationFrame(tick);
      }
    };

    // A scroll only wakes the frame loop; the loop reads the position itself.
    const onScroll = () => {
      if (!pinned) return;
      reader.scrolling = true;
      run();
    };

    // Everything that depends on the size of things. Runs at the start and
    // whenever the window or the type changes size (a web font arriving).
    const measure = () => {
      const wasPinned = pinned;
      // Ask for the track layout, then check the block really fits in it.
      track.removeAttribute("data-stacked");
      pinned = getComputedStyle(pin).position === "sticky";
      if (pinned) {
        const box = getComputedStyle(pin);
        const room = pin.clientHeight - parseFloat(box.paddingTop) - parseFloat(box.paddingBottom);
        if (content.offsetHeight > room + 0.5) {
          track.setAttribute("data-stacked", "true");
          pinned = false;
        }
      }
      travel = track.offsetHeight - pin.offsetHeight;
      if (!pinned || travel <= 0) {
        // The stacked layout: hand every look back to the stylesheet.
        pinned = false;
        window.cancelAnimationFrame(raf);
        raf = 0;
        lines.forEach((line) => {
          line.style.removeProperty("--lit");
          line.style.removeProperty("opacity");
          line.style.removeProperty("transform");
        });
        inks.forEach((ink) => ink.style.removeProperty("opacity"));
        fills.forEach((fill) => fill.style.removeProperty("transform"));
        fillIns.forEach((fill) => fill.style.removeProperty("transform"));
        texts.forEach((text) => {
          text.style.removeProperty("opacity");
          text.style.removeProperty("transform");
          text.removeAttribute("data-on");
        });
        light.style.removeProperty("opacity");
        track.removeAttribute("data-step");
        track.removeAttribute("data-moving");
        return;
      }
      vh = pin.getBoundingClientRect().height;
      riseBy = clamp(parseFloat(getComputedStyle(lines[0]).fontSize) * 0.8, 18, 34);
      boxes = lines.map((line) => ({ x: line.offsetLeft, y: line.offsetTop, w: line.offsetWidth, h: line.offsetHeight }));
      fillHeights = fills.map((fill, k) => {
        const line = lines[k].getBoundingClientRect().height;
        const margin = (fill.getBoundingClientRect().height - line) / 2;
        return line + margin + parseFloat(getComputedStyle(lines[k]).fontSize) * 0.14;
      });
      if (wasPinned) {
        // Already telling the story: the sizes changed under a picture that
        // may be moving. Keep it where it is, redraw it at the new sizes, and
        // let the frame loop find the reader again. Starting it afresh here
        // would make it jump.
        paint(shown.x, shown.caps);
        run();
        return;
      }
      reader = readerAt(position());
      shown = followerAt(reader.target);
      paint(shown.x, shown.caps);
    };
    // The size observer does not fire for a window that only grows taller
    // while the section is laid out flat (nothing it watches changes size
    // then), so a resize re-checks, but ONLY then. While the block is held, a
    // resize is not news: a phone sends one every time its toolbar slides away
    // mid-scroll, and the size observer already covers every real change.
    const onResize = () => {
      if (!pinned) measure();
    };

    // Space and PageDown, Shift+Space and PageUp: one beat at a time while the
    // block is held. Anything typed into a control is left alone.
    const onKey = (e: KeyboardEvent) => {
      if (!pinned || e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
      const direction =
        e.key === "PageDown" || (e.key === " " && !e.shiftKey) ? 1 : e.key === "PageUp" || (e.key === " " && e.shiftKey) ? -1 : 0;
      if (direction === 0) return;
      const from = e.target instanceof Element ? e.target : null;
      // Typing is never ours. Space on something Space operates is not ours
      // either. A link is fine: Space and the page keys scroll from a link.
      if (from && from.closest("input, textarea, select, [contenteditable]:not([contenteditable='false'])")) return;
      if (e.key === " " && from && from.closest("button, summary, [role='button'], [role='switch'], [role='checkbox'], [role='tab'], [role='menuitem']")) return;
      const top = track.getBoundingClientRect().top;
      const beat = travel / BEATS;
      const lead = vh * LEAD;
      // The beat the reader is being shown. One exception: on the way in, the
      // first line can be lit while the bottom of its explanation is still
      // below the window. They have not been shown it yet, so the key must
      // bring it up, not move past it.
      let showing = beatOf(reader.target);
      if (showing === 0 && direction === 1 && texts[0].getBoundingClientRect().bottom > window.innerHeight + 0.5) showing = null;
      // Not clamped to the track: a reader above or below the section whose
      // page would carry them into it must not skip its first or last beat.
      // A page is taken as eight tenths of the window, the least any browser
      // scrolls for one, so a key we handle never goes further than its own.
      const next = keyTarget((-top + lead) / beat, direction, (window.innerHeight * 0.8) / beat, (travel + lead) / beat, showing);
      if (next === null) return;
      e.preventDefault();
      window.scrollTo({
        top: window.scrollY + top + offsetOf(next, vh, travel),
        behavior: reduce.matches ? "auto" : "smooth",
      });
    };

    measure();
    const sizes = new ResizeObserver(measure);
    sizes.observe(track);
    lines.forEach((line) => sizes.observe(line));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      sizes.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
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
                // data-text feeds the two lit copies of the line, both drawn by
                // the stylesheet from that attribute: the glow (the line's
                // ::after) and the blue words (inside ps-how__fill, the window
                // that the band slides over them). Neither is in the page's
                // text, so the heading reads once.
                <span key={item.line} className="ps-how__line" data-text={item.line}>
                  <span className="ps-how__ink">
                    {item.line}
                    {i < STEPS.length - 1 ? " " : ""}
                  </span>
                  <span className="ps-how__fill" aria-hidden="true">
                    <span className="ps-how__fill-in" data-text={item.line} />
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
