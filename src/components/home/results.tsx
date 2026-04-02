"use client";

import { useEffect, useRef } from "react";

interface ResultCard {
  kpi: string;
  client: string;
  industry: string;
  description: string;
  accentColor: string;
}

const resultCards: ResultCard[] = [
  {
    kpi: "Social media fully automated",
    client: "John C Cassidy HVAC",
    industry: "HVAC / Home Services",
    description:
      "100% hands-off daily content creation and posting. Organic reach increased dramatically within the first month.",
    accentColor: "#0D95E8",
  },
  {
    kpi: "Dormant customers reactivated",
    client: "John C Cassidy HVAC",
    industry: "HVAC / Home Services",
    description:
      "AI-powered SMS and email outreach reactivated the majority of inactive clients within 6 weeks. Booking conversions jumped significantly.",
    accentColor: "#635BFF",
  },
  {
    kpi: "Inventory turned profitable",
    client: "HG Oil Holdings",
    industry: "Oil & Gas Operations",
    description:
      "Centralized inventory system eliminated manual tracking and converted a cost center into a profit center. Staff freed up across multiple roles.",
    accentColor: "#00D4AA",
  },
  {
    kpi: "Invoice processing automated",
    client: "HG Oil Holdings",
    industry: "Oil & Gas Operations",
    description:
      "AI invoicing assistant replaced 40+ hours/week of manual reading and categorization. Eliminated the need for additional hires.",
    accentColor: "#F59E0B",
  },
];

export function Results() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!gridRef.current) return;

    const cards = Array.from(gridRef.current.children) as HTMLElement[];

    if (prefersReduced) {
      cards.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    import("@/lib/gsap").then(({ gsap, ScrollTrigger }) => {
      if (!gridRef.current) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    });
  }, []);

  return (
    <section
      className="ps-results"
      id="results"
      aria-labelledby="results-heading"
    >
      <div className="ps-results-header">
        <div className="ps-eyebrow ps-eyebrow--light">Results</div>
        <h2
          id="results-heading"
          className="ps-section-heading ps-section-heading--light"
        >
          Real Results for Real Businesses
        </h2>
      </div>

      <div className="ps-results-grid" ref={gridRef}>
        {resultCards.map((card) => (
          <div key={card.kpi} className="ps-result-card">
            <div
              className="ps-result-card-accent"
              style={{ background: card.accentColor }}
              aria-hidden="true"
            />
            <div className="ps-result-card-kpi">{card.kpi}</div>
            <div className="ps-result-card-meta">
              <span className="ps-result-card-client">{card.client}</span>
              <span className="ps-result-card-industry">{card.industry}</span>
            </div>
            <p className="ps-result-card-desc">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
