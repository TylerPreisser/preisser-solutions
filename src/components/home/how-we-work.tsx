"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * How We Work: the section directly below the hero (ADR-0025).
 *
 * The hero's three-line wordmark, set on the opposite side. Each line is a
 * button: pointing at it (mouse) or tapping it (touch) or pressing Enter or
 * Space on it (keyboard) shows its explanation in the slot below, in place of
 * the relationship sentence. The lines themselves never change on hover. The
 * owner asked for that in terms: "make ti just hover and not change the color
 * and stuff".
 *
 * A hovered explanation stays up until the pointer leaves the SECTION, not the
 * line, so a reader can move down onto the text and read or select it without
 * it vanishing (WCAG 1.4.13: content shown on hover must be hoverable,
 * persistent and dismissible). Escape dismisses it; so does a tap anywhere
 * outside the headline on a touch screen.
 *
 * THE COPY IS THE OWNER'S, APPROVED 2026-11-21 ("thats perfect implement it").
 * The three lines, the three explanations and the relationship sentence ship
 * verbatim under ADR-0025. Do not tighten, reorder or "improve" any of it;
 * ADR-0009 records what happens when an agent does. The <Nb> spans below add
 * no characters: they only stop a compound such as "long-term" or "AES-256"
 * from being split across two lines at its hyphen or space.
 *
 * Everything is server-rendered, so the explanations are in the static HTML
 * for crawlers whether or not this ever hydrates. Hidden explanations are
 * `visibility: hidden` (or `display: none` on phones) in how-we-work.css,
 * which also takes them out of the accessibility tree, so `aria-expanded` on
 * each line tells the truth.
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
        connections and <Nb>multi-factor</Nb> sign-in, and the most advanced AI
        models wired directly into your data.
      </>
    ),
  },
  {
    line: "Stand behind it.",
    body: (
      <>
        We support and stand by every solution we build. If a bug turns up, we
        fix it. When you want it to do more, we expand it. As your business
        grows, your software grows with it.
      </>
    ),
  },
];

// How long the pointer must rest on a line before it takes over from an
// explanation that is already showing. Without it, moving the mouse from the
// first line down to its explanation crosses the other two and flashes
// through all three on the way.
const SWITCH_DELAY_MS = 120;

export function HowWeWork() {
  const [active, setActive] = useState<number | null>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const switchTimer = useRef<number | null>(null);
  // What the press that is about to become a click was made with. A mouse
  // press must not toggle (hover already shows the explanation, and a toggle
  // would hide it under the pointer); every other activation toggles: touch,
  // pen, keyboard, and assistive technology that sends a bare click with no
  // pointerdown at all. So only a recorded mouse press is special-cased, and
  // the record is cleared once its click has been handled. Safari still fires
  // `click` as a plain MouseEvent with no pointerType, which is why the type
  // is recorded on pointerdown instead of read off the click.
  const lastPointer = useRef<string | null>(null);

  const cancelSwitch = () => {
    if (switchTimer.current !== null) {
      window.clearTimeout(switchTimer.current);
      switchTimer.current = null;
    }
  };

  useEffect(() => cancelSwitch, []);

  // While an explanation is open: Escape closes it, and so does a touch or pen
  // press anywhere outside the headline. Bound only while one is open, so the
  // page carries no listener at rest.
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    const onPress = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      const headline = headlineRef.current;
      if (headline && e.target instanceof Node && headline.contains(e.target)) return;
      setActive(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPress);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPress);
    };
  }, [active]);

  return (
    <section
      className="ps-how"
      id="how-we-work"
      aria-labelledby="how-heading"
      data-active={active === null ? undefined : active}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        cancelSwitch();
        setActive(null);
      }}
    >
      <div className="ps-container">
        <p className="ps-eyebrow ps-how__eyebrow">How We Work</p>

        <h2 id="how-heading" className="ps-how__headline" ref={headlineRef}>
          {STEPS.map((step, i) => (
            <button
              key={step.line}
              type="button"
              className={
                i === STEPS.length - 1
                  ? "ps-how__line ps-how__line--accent"
                  : "ps-how__line"
              }
              aria-expanded={active === i}
              aria-controls={`how-step-${i}`}
              onPointerDown={(e) => {
                lastPointer.current = e.pointerType || null;
              }}
              onPointerEnter={(e) => {
                if (e.pointerType !== "mouse") return;
                cancelSwitch();
                if (active === null) {
                  setActive(i);
                } else if (active !== i) {
                  switchTimer.current = window.setTimeout(() => {
                    switchTimer.current = null;
                    setActive(i);
                  }, SWITCH_DELAY_MS);
                }
              }}
              onPointerLeave={(e) => {
                if (e.pointerType === "mouse") cancelSwitch();
              }}
              onClick={(e) => {
                // detail === 0 is a keyboard activation (Enter or Space).
                const byMouse = e.detail !== 0 && lastPointer.current === "mouse";
                lastPointer.current = null;
                cancelSwitch();
                if (byMouse) setActive(i);
                else setActive((current) => (current === i ? null : i));
              }}
            >
              {step.line}
              {i < STEPS.length - 1 ? " " : ""}
            </button>
          ))}
        </h2>

        <div className="ps-how__slot">
          <div className="ps-how__rest">
            <p className="ps-how__belief">
              We believe in building <Nb>long-term</Nb> relationships with all
              of our clients, because we want your success to be our success.
            </p>
            <p className="ps-how__hint" aria-hidden="true">
              <span className="ps-how__hint-hover">Hover a line</span>
              <span className="ps-how__hint-touch">Tap a line</span>
            </p>
          </div>

          {STEPS.map((step, i) => (
            <div
              key={step.line}
              id={`how-step-${i}`}
              className="ps-how__step"
              data-on={active === i ? "true" : undefined}
            >
              <p className="ps-eyebrow ps-how__num">
                0{i + 1} · {step.line.replace(/\.$/, "")}
              </p>
              <p className="ps-how__body">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
