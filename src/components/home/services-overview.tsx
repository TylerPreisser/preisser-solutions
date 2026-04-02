"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export function ServicesOverview() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (textRef.current) textRef.current.style.opacity = "1";
      if (visualRef.current) visualRef.current.style.opacity = "1";
      return;
    }

    import("@/lib/gsap").then(({ gsap, ScrollTrigger }) => {
      if (!sectionRef.current) return;

      gsap.fromTo(
        visualRef.current,
        { opacity: 0, x: -28 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: 28 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power2.out",
          delay: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="ps-section ps-section-light"
      id="results"
      aria-labelledby="feature-2-heading"
    >
      <div className="ps-container">
        <div className="ps-section-inner">
          <div className="ps-feature-split reversed">
            {/* Text column */}
            <div ref={textRef} className="ps-feature-text">
              <span className="ps-eyebrow-light">Real Results</span>
              <h2 id="feature-2-heading">
                Measurable outcomes<br />from day one
              </h2>
              <p>
                From Fortune 500-quality efficiency to small business agility —
                companies use Preisser Solutions to eliminate the manual work
                that slows their teams down and see results in the first 30 days.
              </p>

              <ul className="ps-feature-list" aria-label="Result highlights">
                {[
                  "40%+ average reduction in administrative overhead",
                  "10+ hours saved per employee per week",
                  "Zero missed follow-ups — every lead is contacted automatically",
                ].map((item, i) => (
                  <li key={i} className="ps-feature-list-item">
                    <span className="ps-feature-check" aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <Link href="/roi-calculator" className="ps-btn-primary">
                Estimate your ROI
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Visual column */}
            <div ref={visualRef} className="ps-feature-visual">
              <div
                style={{
                  borderRadius: "var(--hds-space-core-radius-md)",
                  overflow: "hidden",
                  border: "1px solid var(--hds-color-surface-border-quiet)",
                  boxShadow: "var(--shadow-lg)",
                }}
              >
                <Image
                  src="/images/stripe/DatavizStatic3x.png"
                  alt="Business metrics dashboard showing automation results"
                  width={600}
                  height={450}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
