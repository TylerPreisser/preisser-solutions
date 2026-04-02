"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

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
        visualRef.current,
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
      className="ps-section ps-section-dark"
      id="how-it-works"
      aria-labelledby="feature-1-heading"
    >
      {/* Subtle gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 0% 50%, rgba(99,91,255,0.12) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      <div className="ps-container">
        <div className="ps-section-inner">
          <div className="ps-feature-split">
            {/* Text column */}
            <div ref={textRef} className="ps-feature-text on-dark">
              <span className="ps-eyebrow" style={{ color: "rgba(255,255,255,0.5)" }}>
                How It Works
              </span>
              <h2 id="feature-1-heading">
                Built for your business,<br />not a template
              </h2>
              <p>
                We spend time inside your operation before writing a single line of code.
                Every workflow we automate is mapped against how your business actually runs —
                not how a software vendor thinks it should run.
              </p>

              <ul className="ps-feature-list" aria-label="Key differentiators">
                {[
                  "Deep discovery: we document every manual process first",
                  "Custom-built systems — no off-the-shelf automation tools",
                  "Fully handed off with training, docs, and ongoing support",
                ].map((item, i) => (
                  <li key={i} className="ps-feature-list-item on-dark">
                    <span className="ps-feature-check on-dark" aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <Link href="/why-automation" className="ps-btn-link on-dark">
                Why automation works
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Visual column — Stripe bento terminal screenshot */}
            <div ref={visualRef} className="ps-feature-visual">
              <div
                style={{
                  borderRadius: "var(--hds-space-core-radius-md)",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 40px 80px rgba(0,0,0,0.4)",
                }}
              >
                <Image
                  src="/images/stripe/bento-terminal.png"
                  alt="Automation workflow dashboard"
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
