"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

// Second feature section — light bg, visual left / text right
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
        { opacity: 0, x: -32 },
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
        { opacity: 0, x: 32 },
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
      className="ps-section ps-section-white"
      id="results"
      aria-labelledby="feature-2-heading"
    >
      <div className="ps-container">
        <div className="ps-feature-split reversed">
          {/* Text column (order 2 on desktop via CSS) */}
          <div ref={textRef} className="ps-feature-text">
            <span className="ps-eyebrow-light">Real Results</span>
            <h2 id="feature-2-heading">
              Measurable Outcomes<br />From Day One
            </h2>
            <p>
              [Feature description — speak to the ROI, time savings, and operational
              improvements clients see after implementing Preisser Solutions automation.]
            </p>

            <ul className="ps-feature-list" aria-label="Result highlights">
              {[
                "[Result one — specific metric, e.g. XX% reduction in manual tasks]",
                "[Result two — specific metric, e.g. X hours saved per week]",
                "[Result three — specific outcome, e.g. zero missed follow-ups]",
              ].map((item, i) => (
                <li key={i} className="ps-feature-list-item">
                  <span className="ps-feature-check" aria-hidden="true">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <Link href="/roi-calculator" className="ps-btn-primary">
              Estimate your ROI
              <span className="ps-btn-arrow" aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Visual column (order 1 on desktop via CSS) */}
          <div ref={visualRef} className="ps-feature-visual">
            <div
              style={{
                width: "100%",
                aspectRatio: "4/3",
                background: "linear-gradient(135deg, var(--color-light) 0%, rgba(13,149,232,0.06) 50%, var(--color-light) 100%)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-border-light)",
                boxShadow: "var(--shadow-lg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "16px",
              }}
              aria-hidden="true"
            >
              {/* Placeholder for results dashboard screenshot */}
              <div
                style={{
                  width: "80%",
                  height: "12px",
                  background: "var(--color-border-light)",
                  borderRadius: "6px",
                }}
              />
              <div
                style={{
                  width: "65%",
                  height: "12px",
                  background: "var(--color-border-light)",
                  borderRadius: "6px",
                  opacity: 0.7,
                }}
              />
              <div
                style={{
                  width: "72%",
                  height: "12px",
                  background: "var(--color-border-light)",
                  borderRadius: "6px",
                  opacity: 0.5,
                }}
              />
              <div
                style={{
                  marginTop: "8px",
                  fontSize: "12px",
                  color: "var(--color-text-muted)",
                  letterSpacing: "0.05em",
                }}
              >
                [Results dashboard / screenshot]
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
