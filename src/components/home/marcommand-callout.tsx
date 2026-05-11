"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export function MarCommandCallout() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!contentRef.current) return;

    const children = Array.from(contentRef.current.children) as HTMLElement[];

    if (prefersReduced) {
      children.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    import("@/lib/gsap").then(({ gsap, ScrollTrigger }) => {
      if (!contentRef.current) return;

      gsap.fromTo(
        children,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    });
  }, []);

  return (
    <section
      className="ps-marcommand"
      id="marcommand"
      aria-labelledby="marcommand-heading"
    >
      {/* Decorative glow — top left */}
      <div className="ps-marcommand-glow" aria-hidden="true" />

      <div className="ps-marcommand-inner" ref={contentRef}>

        {/* Left: heading + body + CTA */}
        <div className="ps-marcommand-left">
          <div className="ps-eyebrow ps-eyebrow--brand">MarCommand</div>
          <h2
            id="marcommand-heading"
            className="ps-marcommand-heading"
          >
            The AI Brain Behind Your Ad Spend
          </h2>
          <p className="ps-marcommand-body">
            Every agency in the region runs your ads and emails you a PDF once
            a month. MarCommand is different. It&apos;s a custom AI marketing
            intelligence platform — your own private dashboard — that ingests
            live data from every channel you run (Google Ads, Meta, TikTok,
            YouTube, LinkedIn, email, LSAs, geofencing, organic, retail partner
            referrals) and scores each one by actual dollar ROI. Every day, it
            tells you exactly where to move the money next.
          </p>
          <p className="ps-marcommand-closer">
            Set guardrails and let MarCommand execute automatically, or stay
            in the loop on every recommendation. Either way, you own the
            dashboard forever — even if you fire us. Nobody else in Kansas is
            building this for local and regional businesses. That&apos;s the moat.
          </p>
          <div className="ps-marcommand-cta">
            <Link href="/contact" className="ps-btn ps-btn-primary-dark">
              Build My MarCommand
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
          </div>
        </div>

        {/* Right: pull-quote */}
        <div className="ps-marcommand-right">
          <div className="ps-marcommand-quote-wrap" aria-label="Sample MarCommand recommendation">
            <div className="ps-marcommand-quote-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 14c0-4.4 3.6-8 8-8v4c-2.2 0-4 1.8-4 4v1h4v8H6v-9zm14 0c0-4.4 3.6-8 8-8v4c-2.2 0-4 1.8-4 4v1h4v8h-8v-9z" fill="currentColor" fillOpacity="0.6" />
              </svg>
            </div>
            <blockquote className="ps-marcommand-quote">
              This LinkedIn campaign is outperforming your geofencing spend
              4.2x. Recommend shifting $1,800 from geofencing to LinkedIn next
              cycle.
            </blockquote>
            <div className="ps-marcommand-quote-source">
              MarCommand — daily recommendation
            </div>
          </div>

          <div className="ps-marcommand-features">
            <div className="ps-marcommand-feature">
              <span className="ps-marcommand-feature-dot" aria-hidden="true" />
              Live data from every channel you run
            </div>
            <div className="ps-marcommand-feature">
              <span className="ps-marcommand-feature-dot" aria-hidden="true" />
              Scored by actual dollar ROI — not vanity metrics
            </div>
            <div className="ps-marcommand-feature">
              <span className="ps-marcommand-feature-dot" aria-hidden="true" />
              Daily reallocation recommendations with projected lift
            </div>
            <div className="ps-marcommand-feature">
              <span className="ps-marcommand-feature-dot" aria-hidden="true" />
              Custom dashboard, private login, yours forever
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
