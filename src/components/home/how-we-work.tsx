"use client";

import { useRef, useState } from "react";

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
 * THE COPY IS THE OWNER'S, APPROVED 2026-11-21 ("thats perfect implement it").
 * The three lines, the three explanations and the relationship sentence ship
 * verbatim under ADR-0025. Do not tighten, reorder or "improve" any of it;
 * ADR-0009 records what happens when an agent does.
 *
 * Everything is server-rendered, so the explanations are in the static HTML
 * for crawlers whether or not this ever hydrates. Hidden explanations use
 * `visibility: hidden` (how-we-work.css), which also takes them out of the
 * accessibility tree, so `aria-expanded` on each line tells the truth.
 */
const STEPS = [
  {
    line: "Get to know your business.",
    body: "We sit down with you to learn how we can add value for your business and what your goals are.",
  },
  {
    line: "Build a custom solution.",
    body: "World-class custom software at Fortune 500 grade, engineered for your business alone. It runs on a global edge network spanning 300+ cities, with AES-256 encryption, post-quantum secured connections and multi-factor sign-in, and the most advanced AI models wired directly into your data.",
  },
  {
    line: "Stand behind it.",
    body: "We support and stand by every solution we build. If a bug turns up, we fix it. When you want it to do more, we expand it. As your business grows, your software grows with it.",
  },
] as const;

export function HowWeWork() {
  const [active, setActive] = useState<number | null>(null);
  // What the last press was made with. A mouse press must not toggle (hover
  // already shows the explanation, and a toggle would hide it under the
  // pointer); a touch or pen press must, because nothing hovers there. Safari
  // still fires `click` as a plain MouseEvent with no pointerType, so the type
  // is recorded on pointerdown instead of read off the click.
  const lastPointer = useRef<string>("mouse");

  return (
    <section
      className="ps-how"
      id="how-we-work"
      aria-labelledby="how-heading"
      data-active={active === null ? undefined : active}
    >
      <div className="ps-container">
        <p className="ps-eyebrow ps-how__eyebrow">How We Work</p>

        <h2 id="how-heading" className="ps-how__headline">
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
                lastPointer.current = e.pointerType || "mouse";
              }}
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") setActive(i);
              }}
              onPointerLeave={(e) => {
                if (e.pointerType === "mouse") setActive(null);
              }}
              onClick={(e) => {
                // detail === 0 is a keyboard activation (Enter or Space).
                if (e.detail !== 0 && lastPointer.current === "mouse") return;
                setActive((current) => (current === i ? null : i));
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
              We believe in building long-term relationships with all of our
              clients, because we want your success to be our success.
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
