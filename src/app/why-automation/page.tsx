"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { automationBenefits } from "@/data/services";
import type { Metadata } from "next";

// Icon colors cycling through for benefit cards
const iconColors = [
  { bg: "rgba(13, 149, 232, 0.12)", color: "#0D95E8" },
  { bg: "rgba(0, 212, 170, 0.12)", color: "#00D4AA" },
  { bg: "rgba(99, 91, 255, 0.12)", color: "#635BFF" },
  { bg: "rgba(255, 107, 53, 0.12)", color: "#FF6B35" },
  { bg: "rgba(245, 158, 11, 0.12)", color: "#F59E0B" },
  { bg: "rgba(239, 68, 68, 0.12)", color: "#EF4444" },
  { bg: "rgba(13, 149, 232, 0.12)", color: "#0D95E8" },
  { bg: "rgba(0, 212, 170, 0.12)", color: "#00D4AA" },
  { bg: "rgba(99, 91, 255, 0.12)", color: "#635BFF" },
];

const benefitNumbers = ["01", "02", "03", "04", "05", "06", "07", "08", "09"];

export default function WhyAutomationPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    import("@/lib/gsap").then(({ gsap, ScrollTrigger }) => {
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.children,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.2,
          }
        );
      }

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll<HTMLElement>(".ps-why-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 28 },
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

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    });
  }, []);

  return (
    <div className="ps-page-wrapper">
      {/* Page hero */}
      <div className="ps-page-hero">
        <div className="ps-container">
          <div className="ps-page-hero-content" ref={heroRef}>
            <span className="ps-eyebrow">The Case for Automation</span>
            <h1>Why Automate Your Business?</h1>
            <p>
              Automation isn&apos;t just about efficiency — it&apos;s about freeing your
              team to do the work that actually moves the needle.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits grid */}
      <div className="ps-section ps-section-light">
        <div className="ps-container">
          <div
            ref={gridRef}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {automationBenefits.map((benefit, i) => (
              <div key={benefit.title} className="ps-why-card ps-card">
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      background: iconColors[i % iconColors.length].bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: "700",
                      color: iconColors[i % iconColors.length].color,
                      flexShrink: 0,
                      fontVariantNumeric: "tabular-nums",
                    }}
                    aria-hidden="true"
                  >
                    {benefitNumbers[i]}
                  </div>
                  <h3
                    style={{
                      fontSize: "17px",
                      fontWeight: "600",
                      color: "var(--color-text-dark)",
                      lineHeight: "1.3",
                    }}
                  >
                    {benefit.title}
                  </h3>
                </div>
                <p style={{ fontSize: "15px", lineHeight: "1.65", color: "var(--color-text-body)" }}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="ps-cta-section">
        <div className="ps-cta-glow" aria-hidden="true" />
        <div className="ps-cta-content">
          <span className="ps-eyebrow">Ready to Automate?</span>
          <h2>Every Business Has Tasks That Could Run on Autopilot</h2>
          <p>
            Let&apos;s find yours and build a custom solution that works 24/7
            without adding headcount.
          </p>
          <div className="ps-cta-buttons">
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
