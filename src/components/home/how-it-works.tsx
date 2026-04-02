"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

// Feature showcase section — dark bg, text left / visual right
export function HowItWorks() {
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
        textRef.current,
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
        visualRef.current,
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
      className="ps-section ps-section-dark"
      id="how-it-works"
      aria-labelledby="feature-1-heading"
    >
      <div className="ps-container">
        <div className="ps-feature-split">
          {/* Text column */}
          <div ref={textRef} className="ps-feature-text on-dark">
            <span className="ps-eyebrow">How It Works</span>
            <h2 id="feature-1-heading">
              Built for Your Business,<br />Not a Template
            </h2>
            <p>
              [Feature description — explain the custom-built approach. How Preisser
              Solutions dives deep into the business, understands the workflows,
              and builds automation specifically for them.]
            </p>

            <ul className="ps-feature-list" aria-label="Key differentiators">
              {[
                "[Differentiator one — specific, outcome-focused]",
                "[Differentiator two — specific, outcome-focused]",
                "[Differentiator three — specific, outcome-focused]",
              ].map((item, i) => (
                <li key={i} className="ps-feature-list-item on-dark">
                  <span className="ps-feature-check on-dark" aria-hidden="true">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <Link href="/why-automation" className="ps-btn-link" style={{ color: "var(--color-accent-cyan)" }}>
              Why automation works
              <span className="ps-btn-arrow" aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Visual column — placeholder for screenshot/illustration */}
          <div ref={visualRef} className="ps-feature-visual">
            <div
              style={{
                width: "100%",
                aspectRatio: "4/3",
                background: "linear-gradient(135deg, rgba(13,149,232,0.12) 0%, rgba(99,91,255,0.12) 50%, rgba(0,72,229,0.08) 100%)",
                borderRadius: "var(--radius-md)",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "16px",
              }}
              aria-hidden="true"
            >
              {/* Placeholder visual — mockup/screenshot goes here */}
              <div
                style={{
                  width: "80%",
                  height: "12px",
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: "6px",
                }}
              />
              <div
                style={{
                  width: "65%",
                  height: "12px",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "6px",
                }}
              />
              <div
                style={{
                  width: "72%",
                  height: "12px",
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: "6px",
                }}
              />
              <div
                style={{
                  marginTop: "8px",
                  fontSize: "12px",
                  color: "var(--color-text-on-dark-muted)",
                  letterSpacing: "0.05em",
                }}
              >
                [Feature screenshot / illustration]
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
