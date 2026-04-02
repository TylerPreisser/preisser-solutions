"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { automationBenefits } from "@/data/services";

export default function WhyAutomationPage() {
  const gridRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    import("@/lib/gsap").then(({ gsap, ScrollTrigger }) => {
      // Hero entrance
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power2.out",
            delay: 0.2,
          }
        );
      }

      // Cards staggered
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".ps-automation-benefit-item");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    });
  }, []);

  return (
    <div className="ps-why-page">
      {/* Hero */}
      <div className="ps-why-page-hero">
        <div className="ps-container">
          <div ref={heroRef}>
            <span
              className="ps-eyebrow-dark"
              style={{ textAlign: "center", display: "block", marginBottom: "16px" }}
            >
              The Case for Automation
            </span>
            <h1>Why Automate Your Business?</h1>
            <p>
              Automation isn&apos;t just about efficiency — it&apos;s about freeing your team to
              do the work that actually moves the needle. Here&apos;s why forward-thinking businesses
              are making the switch.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits grid */}
      <div className="ps-why-content">
        <div className="ps-container">
          <div className="ps-automation-benefits-grid" ref={gridRef}>
            {automationBenefits.map((benefit, index) => (
              <div key={benefit.title} className="ps-automation-benefit-item">
                <div className="ps-benefit-number">{index + 1}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="ps-why-bottom-cta">
        <div className="ps-container">
          <h2>Ready to Put Automation to Work for You?</h2>
          <p>
            Every business has repetitive processes that could run on autopilot. Let&apos;s find yours
            and build a custom solution together.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="ps-btn-primary">
              Start the Conversation
              <span className="ps-btn-arrow" aria-hidden="true">→</span>
            </Link>
            <Link href="/roi-calculator" className="ps-btn-secondary">
              Calculate Your ROI
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
