"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load hero canvas animation
  useEffect(() => {
    if (!canvasRef.current) return;

    const script = document.createElement("script");
    script.src = "/ps-hero-animation.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // GSAP entrance timeline
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const targets = [eyebrowRef, headlineRef, subtitleRef, ctasRef, scrollRef];

    if (prefersReduced) {
      targets.forEach((r) => {
        if (r.current) {
          r.current.style.opacity = "1";
          r.current.style.transform = "none";
        }
      });
      return;
    }

    import("@/lib/gsap").then(({ gsap }) => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl
        .to(eyebrowRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        })
        .to(
          headlineRef.current,
          { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" },
          "-=0.3"
        )
        .to(
          subtitleRef.current,
          { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" },
          "-=0.4"
        )
        .to(
          ctasRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.35"
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
      {/* Animated canvas background */}
      <canvas
        ref={canvasRef}
        id="ps-hero-canvas"
        aria-hidden="true"
      />

      {/* Overlay for readability */}
      <div className="ps-hero-overlay" aria-hidden="true" />

      {/* Hero content */}
      <div className="ps-hero-content">
        <div ref={eyebrowRef} className="ps-hero-eyebrow">
          <span className="ps-hero-dot" aria-hidden="true" />
          AI-Powered Business Technology
        </div>

        <h1 ref={headlineRef} className="ps-hero-headline">
          Your Business Runs on Systems.
          <br />
          We Make Them Work.
        </h1>

        <p ref={subtitleRef} className="ps-hero-subtitle">
          Preisser Solutions builds, fixes, and automates the technology behind
          your business — so your team stops fighting their tools and starts
          using them.
        </p>

        <div ref={ctasRef} className="ps-hero-ctas">
          <Link href="/contact" className="ps-btn ps-btn-primary-dark">
            Talk to Tyler
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
          <Link href="/#services" className="ps-btn ps-btn-secondary">
            See What We Build
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="ps-scroll-indicator" aria-hidden="true">
        <svg
          className="ps-scroll-chevron"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}
