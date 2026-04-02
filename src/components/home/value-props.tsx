"use client";

import { useEffect, useRef } from "react";

// Service card icon colors — distinct, Stripe-style per-card colors
const iconColors = [
  { bg: "rgba(13, 149, 232, 0.12)", color: "#0D95E8" },
  { bg: "rgba(0, 212, 170, 0.12)", color: "#00D4AA" },
  { bg: "rgba(99, 91, 255, 0.12)", color: "#635BFF" },
  { bg: "rgba(255, 107, 53, 0.12)", color: "#FF6B35" },
  { bg: "rgba(245, 158, 11, 0.12)", color: "#F59E0B" },
  { bg: "rgba(239, 68, 68, 0.12)", color: "#EF4444" },
];

// Emoji icons as placeholders — replace with SVGs later
const icons = ["⚡", "📊", "🔧", "🤖", "🌐", "✏️"];

const serviceCards = [
  {
    title: "Workflow Automation",
    description: "[Service description — what this automation does and the problem it solves for the business.]",
    learnMore: "/services",
  },
  {
    title: "Back Office Automation",
    description: "[Service description — what this automation does and the problem it solves for the business.]",
    learnMore: "/services",
  },
  {
    title: "Custom AI Assistants",
    description: "[Service description — what this automation does and the problem it solves for the business.]",
    learnMore: "/services",
  },
  {
    title: "AI-Powered Outreach",
    description: "[Service description — what this automation does and the problem it solves for the business.]",
    learnMore: "/services",
  },
  {
    title: "Digital Presence",
    description: "[Service description — what this automation does and the problem it solves for the business.]",
    learnMore: "/services",
  },
  {
    title: "Website Development",
    description: "[Service description — what this automation does and the problem it solves for the business.]",
    learnMore: "/services",
  },
];

export function ValueProps() {
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    import("@/lib/gsap").then(({ gsap, ScrollTrigger }) => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.children,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll<HTMLElement>(".ps-service-card");
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.09,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    });
  }, []);

  return (
    <section className="ps-section ps-section-light" id="services-overview" aria-labelledby="services-heading">
      <div className="ps-container">
        {/* Section header */}
        <div className="ps-section-header" ref={headingRef}>
          <span className="ps-eyebrow-light">What We Build</span>
          <h2 id="services-heading">A Full Suite of Automation Solutions</h2>
          <p>
            [Section subtitle — one or two sentences framing the services as a unified
            solution for business efficiency.]
          </p>
        </div>

        {/* 3×2 card grid */}
        <div className="ps-services-grid" ref={gridRef}>
          {serviceCards.map((card, i) => (
            <div key={card.title} className="ps-service-card">
              <div
                className="ps-service-icon"
                style={{ background: iconColors[i].bg }}
                aria-hidden="true"
              >
                <span style={{ fontSize: "22px" }}>{icons[i]}</span>
              </div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <a href={card.learnMore} className="ps-btn-link">
                Learn more
                <span className="ps-btn-arrow" aria-hidden="true">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
