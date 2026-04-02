"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

// Standalone CTA section — rendered by home page just before footer
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
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.12,
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

      <div className="ps-cta-content" ref={contentRef}>
        <span className="ps-eyebrow">Ready to Automate?</span>
        <h2 id="cta-heading">Stop Doing What a System Can Do</h2>
        <p>
          [CTA body — two sentences that create urgency and invite the prospect
          to take the next step. No-pressure, outcome-focused.]
        </p>
        <div className="ps-cta-buttons">
          <Link href="/contact" className="ps-btn-primary">
            Get a Free Consultation
            <span className="ps-btn-arrow" aria-hidden="true">→</span>
          </Link>
          <Link href="/roi-calculator" className="ps-btn-secondary">
            Estimate Your ROI
          </Link>
        </div>
      </div>
    </section>
  );
}
