"use client";

import { useRef } from "react";
import Link from "next/link";

interface CaseStudyCard {
  client: string;
  industry: string;
  resultHighlight: string;
  results: string[];
  href: string;
  gradient: string;
}

const caseStudyCards: CaseStudyCard[] = [
  {
    client: "Cassidy HVAC",
    industry: "HVAC / Home Services",
    resultHighlight: "5x organic reach increase in 30 days",
    results: [
      "100% hands-off daily content creation and posting",
      "Eliminated outsourced marketing or additional staff",
      "Generated inbound customer inquiries directly from social content",
    ],
    href: "/contact",
    gradient: "linear-gradient(145deg, #1e3a5f 0%, #2d1b69 100%)",
  },
  {
    client: "Cassidy HVAC",
    industry: "HVAC / Home Services",
    resultHighlight: "60%+ dormant customer reactivation in 6 weeks",
    results: [
      "100% automation of promotional messaging",
      "10+ hours/week saved in manual follow-up",
      "45% increase in booking conversion rate",
    ],
    href: "/contact",
    gradient: "linear-gradient(145deg, #2d1b69 0%, #4a0e8f 100%)",
  },
  {
    client: "HG Oil Holdings",
    industry: "Oil & Gas Operations",
    resultHighlight: "95% reduction in back-office inventory time",
    results: [
      "75%+ improvement in inventory accuracy",
      "Converted a loss-generating operation into a profitable unit",
      "Freed 10+ staff hours per week across multiple roles",
    ],
    href: "/contact",
    gradient: "linear-gradient(145deg, #0a4a4a 0%, #0d2d6b 100%)",
  },
  {
    client: "HG Oil Holdings",
    industry: "Oil & Gas Operations",
    resultHighlight: "75% decrease in manual invoice processing time",
    results: [
      "Eliminated manual reading of every invoice",
      "Freed staff for higher-priority tasks",
      "Prevented need to hire additional headcount",
    ],
    href: "/contact",
    gradient: "linear-gradient(145deg, #7c3100 0%, #9b1a0a 100%)",
  },
];

export function CaseStudies() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollTrack(direction: "left" | "right") {
    if (!trackRef.current) return;
    const scrollAmount = 316; // card width (300) + gap (16)
    trackRef.current.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  }

  return (
    <section className="ps-work" id="case-studies" aria-labelledby="work-heading">
      <div className="ps-work-header">
        <div>
          <span className="ps-eyebrow ps-eyebrow--light">Work</span>
          <h2 id="work-heading" className="ps-section-heading ps-section-heading--light">
            What We&apos;ve Built. What It Did.
          </h2>
        </div>
        <div className="ps-work-nav" aria-label="Scroll case studies">
          <button
            className="ps-work-nav-btn"
            onClick={() => scrollTrack("left")}
            aria-label="Scroll left"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M10 3L5 8l5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className="ps-work-nav-btn"
            onClick={() => scrollTrack("right")}
            aria-label="Scroll right"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M6 3l5 5-5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="ps-work-track" ref={trackRef} role="list">
        {caseStudyCards.map((study, index) => (
          <article
            key={`${study.client}-${index}`}
            className="ps-work-card"
            role="listitem"
          >
            {/* Gradient background layer */}
            <div
              className="ps-work-card-bg"
              style={{ background: study.gradient }}
              aria-hidden="true"
            />

            {/* Static label at bottom-left */}
            <span className="ps-work-card-client">{study.client}</span>

            {/* Hover overlay with full details */}
            <div className="ps-work-card-overlay" aria-label={`${study.client} case study details`}>
              <span className="ps-work-card-tag">{study.industry}</span>
              <p className="ps-work-card-result">{study.resultHighlight}</p>
              <Link href={study.href} className="ps-work-card-link" tabIndex={0}>
                Read the case study
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="M1 7h12M8 2l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
