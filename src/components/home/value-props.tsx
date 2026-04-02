"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

// Stripe-style product icons: colored SVG paths on a tinted background
// Each service gets a distinct Stripe product color
const serviceCards = [
  {
    title: "Workflow Automation",
    description:
      "Eliminate repetitive manual steps. We map your existing processes and replace them with automated pipelines that run 24/7 without oversight.",
    learnMore: "/services",
    iconBg: "rgba(99, 91, 255, 0.1)",
    iconColor: "#635bff",
    iconPath: "M13 10V3L4 14h7v7l9-11h-7z", // lightning bolt
  },
  {
    title: "Back Office Automation",
    description:
      "Invoicing, scheduling, data entry, reporting — all handled automatically. Your team stops doing admin and starts driving growth.",
    learnMore: "/services",
    iconBg: "rgba(36, 180, 126, 0.1)",
    iconColor: "#24b47e",
    iconPath: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    title: "Custom AI Assistants",
    description:
      "Purpose-built AI agents trained on your business. Answer customer questions, qualify leads, handle support — around the clock, on-brand.",
    learnMore: "/services",
    iconBg: "rgba(30, 167, 253, 0.1)",
    iconColor: "#1ea7fd",
    iconPath: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  },
  {
    title: "AI-Powered Outreach",
    description:
      "Automated follow-ups, personalized email sequences, and CRM enrichment that runs while you sleep. Never let a lead go cold again.",
    learnMore: "/services",
    iconBg: "rgba(245, 158, 11, 0.1)",
    iconColor: "#f59e0b",
    iconPath: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    title: "Digital Presence",
    description:
      "High-converting websites, landing pages, and digital assets built with the same precision as the automation systems behind them.",
    learnMore: "/services",
    iconBg: "rgba(239, 68, 68, 0.1)",
    iconColor: "#ef4444",
    iconPath: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
  },
  {
    title: "Website Development",
    description:
      "From fast-loading static sites to full-stack web applications — designed to convert, built to scale, and maintained automatically.",
    learnMore: "/services",
    iconBg: "rgba(156, 77, 204, 0.1)",
    iconColor: "#9c4dcc",
    iconPath: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
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
          { opacity: 0, y: 24 },
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
          duration: 0.55,
          stagger: 0.07,
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
    <section
      className="ps-section ps-section-white"
      id="services-overview"
      aria-labelledby="services-heading"
    >
      <div className="ps-container">
        <div className="ps-section-inner">
          {/* Section header */}
          <div className="ps-section-header" ref={headingRef}>
            <span className="ps-eyebrow-light">What We Build</span>
            <h2 id="services-heading">A fully integrated suite of automation solutions</h2>
            <p>
              Mix and match automation modules or deploy the entire platform.
              Every service is built custom for your business — no templates, no shortcuts.
            </p>
          </div>

          {/* 3×2 card grid */}
          <div className="ps-services-grid" ref={gridRef}>
            {serviceCards.map((card) => (
              <div key={card.title} className="ps-service-card">
                {/* Stripe-style product icon */}
                <div
                  className="ps-service-icon"
                  style={{ background: card.iconBg }}
                  aria-hidden="true"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={card.iconColor}
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d={card.iconPath} />
                  </svg>
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <Link href={card.learnMore} className="ps-btn-link">
                  Learn more
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
