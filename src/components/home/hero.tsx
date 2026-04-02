"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export function Hero() {
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      [eyebrowRef, headlineRef, subtitleRef, ctasRef, scrollRef].forEach((r) => {
        if (r.current) {
          r.current.style.opacity = "1";
          r.current.style.transform = "none";
        }
      });
      return;
    }

    import("@/lib/gsap").then(({ gsap }) => {
      const tl = gsap.timeline({ delay: 0.1 });
      tl
        .to(eyebrowRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        })
        .to(
          headlineRef.current,
          { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" },
          "-=0.25"
        )
        .to(
          subtitleRef.current,
          { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
          "-=0.3"
        )
        .to(
          ctasRef.current,
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.25"
        )
        .to(
          scrollRef.current,
          { opacity: 1, duration: 0.4, ease: "power1.out" },
          "-=0.05"
        );
    });
  }, []);

  return (
    <section className="ps-hero" aria-label="Hero — Preisser Solutions">
      {/* Animated gradient mesh */}
      <div className="ps-hero-bg" aria-hidden="true" />

      {/* Central glow */}
      <div className="ps-hero-glow" aria-hidden="true" />

      {/* Content */}
      <div className="ps-hero-content">
        <div ref={eyebrowRef} className="ps-hero-eyebrow">
          <span className="ps-hero-dot" aria-hidden="true" />
          Business Automation Solutions
        </div>

        <h1 ref={headlineRef} className="ps-hero-headline">
          Automate What{" "}
          <span className="ps-highlight">Slows&nbsp;You&nbsp;Down</span>
        </h1>

        <p ref={subtitleRef} className="ps-hero-subtitle">
          [Hero tagline — one or two sentences describing the core value proposition
          of the business automation services. Bold, outcome-focused.]
        </p>

        <div ref={ctasRef} className="ps-hero-ctas">
          <Link href="/contact" className="ps-btn-primary">
            Get a Free Consultation
            <span className="ps-btn-arrow" aria-hidden="true">→</span>
          </Link>
          <Link href="/roi-calculator" className="ps-btn-secondary">
            Estimate Your ROI
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="ps-scroll-indicator" aria-hidden="true">
        <span className="ps-scroll-indicator-text">Scroll</span>
        <span className="ps-scroll-indicator-line" />
      </div>
    </section>
  );
}
