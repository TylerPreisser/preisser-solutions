"use client";

import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { mountMarkLight, MARK_MIN_WIDTH, type MarkLight } from "./hero-mark-light";

/**
 * The H1 lives in site-config as ONE string ("Business Software. Business
 * Automation. AI Integration.") so the accessible name, the JSON-LD slogan and
 * the SEO validators all read the same text. The hero renders it as a
 * three-line wordmark, so we split it on the sentence boundary here and
 * re-append the period. The <h1> still contains the full string.
 *
 * Deliberately no regex lookbehind — iOS Safari < 16.4 throws a SyntaxError at
 * parse time, which would take the whole bundle down rather than one component.
 * Generic: any number of sentences renders as that many lines.
 */
function splitPillars(h1: string): string[] {
  const parts = h1
    .split(".")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => `${part}.`);
  return parts.length > 0 ? parts : [h1];
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const cueSentinelRef = useRef<HTMLSpanElement>(null);

  const pillars = splitPillars(siteConfig.hero.h1);

  // The background: the brand mark, drawn large and faint with one blue light
  // travelling its contour. See hero-mark-light.ts for the full rationale — it
  // owns reduced-motion, the off-screen cancel and the theme watcher, and it
  // measures THIS component's headline ink to decide where the mark may go.
  // Mounted in an effect on purpose: the headline below is server-rendered and
  // must never wait on it. The contrast scrim is CSS (.ps-hero-overlay).
  //
  // DESKTOP ONLY, since 2026-09-04. The client rejected the mark on phones in
  // three successive forms and asked for it gone there, so below MARK_MIN_WIDTH
  // nothing is created at all — not a hidden canvas, not a parked loop. That
  // skips the backing-store allocation, the IntersectionObserver, the resize
  // handler and the fonts.ready / animationend listeners on the device where
  // they cost the most.
  //
  // matchMedia rather than a one-shot width check so the boundary is handled in
  // both directions: rotating a phone to landscape crosses 768 and mounts it,
  // and narrowing a desktop window destroys it and releases the canvas.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mq = window.matchMedia(`(min-width: ${MARK_MIN_WIDTH}px)`);
    let bg: MarkLight | null = null;

    const sync = () => {
      if (mq.matches) {
        if (!bg) bg = mountMarkLight(container);
      } else if (bg) {
        bg.destroy();
        bg = null;
      }
    };

    sync();
    mq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      bg?.destroy();
    };
  }, []);

  // The entrance is CSS now (src/styles/hero-entrance.css), not a GSAP
  // timeline. The old timeline awaited a dynamic import("@/lib/gsap") — which
  // pulls gsap + ScrollTrigger — before raising opacity off 0, so the
  // server-rendered headline stayed invisible for ~600ms on localhost and
  // never appeared at all on Fast 3G. Nothing about the hero's appearance may
  // depend on JS reaching the browser.

  // Dismiss the cue once the page has actually moved — a "scroll down" prompt
  // that is still sitting there after you scrolled reads as broken UI.
  //
  // IntersectionObserver rather than a scroll listener: it never runs on the
  // main thread per-frame, and it fires exactly twice (out, and back in if the
  // user returns to the top). The sentinel is a zero-width absolutely
  // positioned span at the hero's top edge whose HEIGHT is the trigger
  // distance (20vh, set in hero-scroll-cue.css) — so the threshold is
  // expressed in CSS next to the rest of the cue's layout, not as a magic
  // pixel number in here. Written as a data attribute rather than React state
  // on purpose: this must not re-render the hero on scroll.
  useEffect(() => {
    const cue = cueRef.current;
    const sentinel = cueSentinelRef.current;
    if (!cue || !sentinel || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => {
        cue.dataset.cueHidden = entry.isIntersecting ? "false" : "true";
      },
      { threshold: 0 }
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  // The cue is a real affordance, so it has to actually go somewhere.
  //
  // The section following the hero carries no id and lives in page.tsx — a
  // file this component does not own — so the target is resolved from the DOM
  // instead: walk forward from the hero to the next section that is actually
  // RENDERED.
  //
  // Both halves of that test are load-bearing, measured on the built page:
  //   - tagName check: the immediate nextElementSibling is the 1px
  //     visually-hidden crawler paragraph, not a section.
  //   - height check: at 390px BOTH <ProofBar> (.ps-proof-bar) and
  //     <ValueStrip> (.ps-value-strip) compute to display:none, so a walk that
  //     stopped at the first <section> landed on a 0x0 box whose rect.top is
  //     0. That produced a negative target that clamped to 0 — the cue simply
  //     did nothing on mobile. Skipping zero-height sections lands on
  //     .ps-services (top 844) there and .ps-proof-bar (top 844) at 1440.
  //
  // Because the real destination therefore differs by viewport, the button's
  // accessible name stays generic ("Scroll to the next section") rather than
  // naming a section it would misname on one of the two.
  //
  // If the markup ever changes shape and nothing qualifies, fall back to one
  // viewport of travel, which is never wrong for a 100dvh hero.
  const scrollToNext = useCallback(() => {
    const hero = containerRef.current;
    if (!hero) return;

    let next: Element | null = hero.nextElementSibling;
    while (
      next &&
      (next.tagName !== "SECTION" || next.getBoundingClientRect().height === 0)
    ) {
      next = next.nextElementSibling;
    }

    // The header is fixed, so land the target below it. --nav-height is 88px
    // and 78px under 768px; reading the computed value picks up the media
    // query for free. The +24 matches the scroll-margin-top convention
    // already used by .product-catalog-section and .case-studies-grid-section.
    const navHeight =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--nav-height"
        ),
        10
      ) || 88;

    const top = next
      ? window.scrollY + next.getBoundingClientRect().top - navHeight - 24
      : window.scrollY + window.innerHeight;

    // globals.css sets `html { scroll-behavior: smooth }` inside @layer base,
    // and it IS now gated on `prefers-reduced-motion: no-preference` — that
    // gate was added 2026-09-03; before then it applied unconditionally.
    // "instant" is kept here anyway rather than "auto": it is correct under
    // both the old and new CSS, it does not depend on a media query in another
    // file staying put, and "auto" would silently start animating again if the
    // gate were ever removed.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: Math.max(0, top),
      behavior: prefersReduced ? "instant" : "smooth",
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="ps-hero"
      aria-label="Hero"
    >
      {/* Overlay for text readability */}
      <div className="ps-hero-overlay" aria-hidden="true" />

      {/* Hero content */}
      <div className="ps-hero-content">
        {/*
          AI-citation summary paragraph — server-rendered, semantically visible.
          Answers "What is Preisser Solutions?" in plain prose for AI agents that extract
          the first paragraph of a page for citations. Positioned visually below the
          animated headline via CSS order, but first in the DOM for crawlers.
        */}
        <p className="ps-hero-summary sr-only">
          Preisser Solutions builds custom business software, business
          automation, and AI integration: admin dashboards, customer
          databases, document pipelines, and the automations that connect
          them. Founded by Tyler Preisser.
        </p>

        {/*
          One <h1>, one accessible string. The spans are presentational line
          boxes — assistive tech reads the heading's full text content:
          "Business Software. Business Automation. AI Integration."
          The trailing space keeps the sentences separated for that reading;
          it collapses visually because each span is display: block.
        */}
        <h1 className="ps-hero-headline">
          {pillars.map((line, i) => (
            <span
              key={line}
              className={
                i === pillars.length - 1
                  ? "ps-hero-line ps-hero-line--accent"
                  : "ps-hero-line"
              }
            >
              {line}
              {i < pillars.length - 1 ? " " : ""}
            </span>
          ))}
        </h1>

        <div className="ps-hero-ctas">
          {/* prefetch={false}: eager prefetch on above-the-fold CTAs was the
              root cause of a 4.1s -> 0.8s mobile navigation regression. */}
          <Link
            href={siteConfig.hero.primaryCta.href}
            prefetch={false}
            className="ps-btn ps-btn-primary-dark"
          >
            {siteConfig.hero.primaryCta.label}
            <svg
              className="ps-btn-arrow"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 8h14M9 2l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <Link
            href={siteConfig.hero.secondaryCta.href}
            prefetch={false}
            className="ps-btn ps-btn-secondary"
          >
            {siteConfig.hero.secondaryCta.label}
          </Link>
        </div>
      </div>

      {/* Trigger distance for the dismiss-on-scroll observer above. Its height
          is the only thing about it that matters; it is invisible, unhittable
          and absolutely positioned, so it costs no layout. */}
      <span
        ref={cueSentinelRef}
        className="ps-hero-cue__sentinel"
        aria-hidden="true"
      />

      {/*
        Scroll cue. A <button>, deliberately, not an aria-hidden ornament:
        anything that looks this much like a control WILL get tapped, and a
        chevron that does nothing when pressed is worse than no chevron. So it
        is a real control — keyboard focusable, Enter/Space handled natively by
        the button element, 44x44 tap target, visible focus ring, and its text
        content ("Scroll to the next section") is its accessible name.

        The wrapper owns positioning and the scroll-away fade; the button owns
        the entrance (now CSS, in hero-entrance.css — it used to be GSAP). See
        hero-scroll-cue.css for why they are split.
      */}
      <div ref={cueRef} className="ps-hero-cue" data-cue-hidden="false">
        <button
          type="button"
          className="ps-hero-cue__btn"
          onClick={scrollToNext}
        >
          <span className="sr-only">Scroll to the next section</span>
          <svg
            className="ps-hero-cue__icon"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 8l5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
