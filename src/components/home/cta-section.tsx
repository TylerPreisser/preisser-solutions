"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export function CtaSection() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (contentRef.current) {
        contentRef.current.style.opacity = "1";
        contentRef.current.style.transform = "none";
      }
      return;
    }

    import("@/lib/gsap").then(({ gsap, ScrollTrigger }) => {
      if (!contentRef.current) return;

      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    });
  }, []);

  return (
    <section
      className="ps-cta-section"
      id="cta"
      aria-labelledby="cta-heading"
    >
      {/* Glow orb */}
      <div className="ps-cta-glow" aria-hidden="true" />

      {/* Subtle gradient accent */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(99,91,255,0.3), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="ps-cta-content" ref={contentRef}>
        <span className="ps-eyebrow" style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>
          Ready to Automate?
        </span>
        <h2 id="cta-heading">
          Stop doing what<br />a system can do
        </h2>
        <p>
          Get a free 30-minute consultation where we map out which parts of your
          business are ready to automate — and what it&apos;ll actually save you.
        </p>
        <div className="ps-cta-buttons">
          <Link href="/contact" className="ps-btn-primary-dark">
            Start now
          </Link>
          <Link href="/roi-calculator" className="ps-btn-secondary">
            Estimate your ROI
          </Link>
        </div>
      </div>
    </section>
  );
}
