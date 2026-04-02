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

    const els = [eyebrowRef, headlineRef, subtitleRef, ctasRef, scrollRef];

    if (prefersReduced) {
      els.forEach((r) => {
        if (r.current) {
          r.current.style.opacity = "1";
          r.current.style.transform = "none";
        }
      });
      return;
    }

    import("@/lib/gsap").then(({ gsap }) => {
      const tl = gsap.timeline({ delay: 0.15 });
      tl
        .to(eyebrowRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
        })
        .to(
          headlineRef.current,
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.3"
        )
        .to(
          subtitleRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.35"
        )
        .to(
          ctasRef.current,
          { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
          "-=0.3"
        )
        .to(
          scrollRef.current,
          { opacity: 1, duration: 0.5, ease: "power1.out" },
          "-=0.1"
        );
    });
  }, []);

  return (
    <section className="ps-hero" aria-label="Hero — Preisser Solutions">
      {/* Animated gradient mesh — Stripe signature */}
      <div className="ps-hero-bg" aria-hidden="true" />

      {/* Wave texture overlay */}
      <div className="ps-hero-wave" aria-hidden="true" />

      {/* Content */}
      <div className="ps-hero-content">
        <div ref={eyebrowRef} className="ps-hero-eyebrow">
          <span className="ps-hero-dot" aria-hidden="true" />
          Business Automation Infrastructure
        </div>

        <h1 ref={headlineRef} className="ps-hero-headline">
          Automation infrastructure to{" "}
          <span className="ps-highlight">grow your business</span>
        </h1>

        <p ref={subtitleRef} className="ps-hero-subtitle">
          Join the businesses of all sizes that use Preisser Solutions to
          eliminate manual work, embed AI into operations, power custom
          workflows, and build a more profitable company.
        </p>

        <div ref={ctasRef} className="ps-hero-ctas">
          <Link href="/contact" className="ps-btn-primary-dark">
            Start now
          </Link>
          <Link href="/contact" className="ps-btn-secondary">
            Contact sales
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
