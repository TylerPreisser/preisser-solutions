"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const happenings = [
  {
    tag: "Case Study",
    title: "How a construction firm cut invoicing time by 70% with automated billing",
    description: "Manual invoicing was eating 8 hours a week. Now it runs automatically every Friday.",
    image: "/images/stripe/the-happenings-payment-processing-mobile.png",
    href: "/about",
  },
  {
    tag: "Results",
    title: "AI assistant handles 80% of inbound customer inquiries without human intervention",
    description: "A retail client deployed a custom AI assistant and cut support costs in half.",
    image: "/images/stripe/the-happenings-agentic-mobile.png",
    href: "/about",
  },
  {
    tag: "Automation",
    title: "The complete guide to automating your back office in 30 days",
    description: "A step-by-step breakdown of how we discover, map, and automate any operation.",
    image: "/images/stripe/the-happenings-bfcm-mobile.png",
    href: "/why-automation",
  },
  {
    tag: "Technology",
    title: "Why AI-powered outreach converts 3x better than templated email campaigns",
    description: "Personalization at scale — how Preisser Solutions trains AI on your voice.",
    image: "/images/stripe/the-happenings-tidemark-mobile.png",
    href: "/services",
  },
  {
    tag: "Industry",
    title: "The hidden cost of manual processes — and how to calculate it for your business",
    description: "Most businesses underestimate manual overhead by 40%. Use our ROI calculator to find out.",
    image: "/images/stripe/the-happenings-payment-retailers-mobile.png",
    href: "/roi-calculator",
  },
];

export function Happenings() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      className="ps-section ps-section-white"
      id="happenings"
      aria-labelledby="happenings-heading"
    >
      <div className="ps-section-inner">
        <div className="ps-container">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: "16px",
              marginBottom: "32px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <span className="ps-eyebrow-light">The Happenings</span>
              <h2
                id="happenings-heading"
                style={{
                  fontSize: "clamp(24px, 3vw, 36px)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                  color: "var(--hds-color-text-solid)",
                }}
              >
                From the Preisser Solutions team
              </h2>
            </div>
            <Link
              href="/about"
              className="ps-btn-link"
              style={{ flexShrink: 0 }}
            >
              See all
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Scrollable card strip — full-bleed on mobile */}
        <div ref={scrollerRef} className="ps-happenings">
          {/* Left padding spacer */}
          <div style={{ flexShrink: 0, width: "max(var(--container-pad), calc((100vw - 1200px)/2 + var(--container-pad)))" }} aria-hidden="true" />

          {happenings.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="ps-happening-card"
              aria-label={item.title}
            >
              <div className="ps-happening-media">
                <Image
                  src={item.image}
                  alt=""
                  width={320}
                  height={180}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  aria-hidden="true"
                />
              </div>
              <div className="ps-happening-body">
                <span className="ps-happening-tag">{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </Link>
          ))}

          {/* Right padding spacer */}
          <div style={{ flexShrink: 0, width: "max(var(--container-pad), calc((100vw - 1200px)/2 + var(--container-pad)))" }} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
