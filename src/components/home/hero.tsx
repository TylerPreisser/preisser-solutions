"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { mountLedgerField } from "./hero-ledger-field";

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
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);

  const pillars = splitPillars(siteConfig.hero.h1);

  // The background: a ledger that files itself. See hero-ledger-field.ts for
  // the full rationale — it owns reduced-motion, off-screen pause, the theme
  // watcher and the contrast scrim.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const field = mountLedgerField(container);
    return () => field.destroy();
  }, []);

  // GSAP entrance timeline — the three pillar lines on their own stagger, then
  // the subhead, then the CTAs. Only opacity + transform.
  useEffect(() => {
    const lines = headlineRef.current
      ? Array.from(
          headlineRef.current.querySelectorAll<HTMLElement>(".ps-hero-line")
        )
      : [];

    const all = [...lines, subheadRef.current, ctasRef.current].filter(
      (el): el is HTMLElement => el !== null
    );

    // Static end-state. Used for prefers-reduced-motion and as the failure
    // path — the hero must never be left invisible.
    const reveal = () => {
      all.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
    };

    // Manual check, matching the convention used across this codebase.
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      reveal();
      return;
    }

    let cancelled = false;
    let timeline: { kill: () => void } | null = null;

    import("@/lib/gsap")
      .then(({ gsap }) => {
        if (cancelled) return;
        const tl = gsap.timeline({ delay: 0.15 });
        timeline = tl;
        tl.to(lines, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
          })
          .to(
            subheadRef.current,
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            "-=0.3"
          )
          .to(
            ctasRef.current,
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            "-=0.35"
          );
      })
      .catch((err) => {
        // Never drop silently: surface it, then show the hero anyway.
        console.error("[hero] GSAP chunk failed to load — revealing statically", err);
        reveal();
      });

    return () => {
      cancelled = true;
      timeline?.kill();
    };
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
          automation, and AI integration for Kansas businesses — admin
          dashboards, customer databases, document pipelines, and the
          automations that connect them. Founded by Tyler Preisser in Hays,
          Kansas.
        </p>

        {/*
          One <h1>, one accessible string. The spans are presentational line
          boxes — assistive tech reads the heading's full text content:
          "Business Software. Business Automation. AI Integration."
          The trailing space keeps the sentences separated for that reading;
          it collapses visually because each span is display: block.
        */}
        <h1 ref={headlineRef} className="ps-hero-headline">
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

        <p ref={subheadRef} className="ps-hero-subtitle">
          {siteConfig.hero.subhead}
        </p>

        <div ref={ctasRef} className="ps-hero-ctas">
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
    </section>
  );
}
