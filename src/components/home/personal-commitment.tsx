"use client";

// Logo bar + Stats bar — sits between hero and the service cards section
// This replaces the old PersonalCommitment component in the section order.
// The Tyler personal commitment quote moves to a standalone section below.

import { useEffect, useRef } from "react";

const stats = [
  { number: "XX", suffix: "%", label: "Faster than manual processes" },
  { number: "$X", suffix: "M+", label: "Saved for clients" },
  { number: "XXX", suffix: "+", label: "Automations deployed" },
  { number: "24/7", suffix: "", label: "System uptime, no downtime" },
];

// Placeholder company logos (gray rectangles of varying widths)
const logoWidths = [88, 72, 96, 80, 110, 68, 92];

export function PersonalCommitment() {
  const statsRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    import("@/lib/gsap").then(({ gsap, ScrollTrigger }) => {
      if (logoRef.current) {
        gsap.fromTo(
          logoRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: logoRef.current,
              start: "top 90%",
              once: true,
            },
          }
        );
      }

      if (statsRef.current) {
        const items = statsRef.current.querySelectorAll<HTMLElement>(".ps-stat-item-inner");
        gsap.fromTo(
          items,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    });
  }, []);

  return (
    <>
      {/* Logo Bar */}
      <div className="ps-logo-bar" ref={logoRef}>
        <div className="ps-container">
          <p className="ps-logo-bar-label">Trusted by businesses across industries</p>
          <div className="ps-logo-grid" aria-label="Trusted companies (placeholder logos)">
            {logoWidths.map((w, i) => (
              <div
                key={i}
                className="ps-logo-placeholder"
                style={{ width: `${w}px` }}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="ps-stats-bar">
        <div className="ps-container">
          <div className="ps-stats-grid" ref={statsRef} role="list" aria-label="Key statistics">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`ps-stat-item-inner${i < stats.length - 1 ? " ps-stat-divider" : ""}`}
                role="listitem"
              >
                <div className="ps-stat-number">
                  {stat.number}
                  <span className="ps-stat-accent">{stat.suffix}</span>
                </div>
                <div className="ps-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
