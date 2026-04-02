"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

interface CaseStudyCard {
  client: string;
  industry: string;
  resultHighlight: string;
  results: string[];
  href: string;
}

const caseStudyCards: CaseStudyCard[] = [
  {
    client: "Cassidy HVAC",
    industry: "HVAC / Home Services",
    resultHighlight: "5x organic reach increase in 30 days",
    results: [
      "100% hands-off daily content creation",
      "Eliminated outsourced marketing staff",
      "Generated inbound customer inquiries",
    ],
    href: "/contact",
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
  },
  {
    client: "HG Oil Holdings",
    industry: "Oil & Gas Operations",
    resultHighlight: "95% reduction in back-office inventory time",
    results: [
      "75%+ improvement in inventory accuracy",
      "Converted a loss center into a profit center",
      "10+ staff hours freed per week",
    ],
    href: "/contact",
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
  },
];

export function CaseStudies() {
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
      className="ps-case-studies"
      id="case-studies"
      aria-labelledby="case-studies-heading"
    >
      <div className="ps-case-studies-header">
        <div className="ps-eyebrow ps-eyebrow--light">Work</div>
        <h2
          id="case-studies-heading"
          className="ps-section-heading ps-section-heading--light"
        >
          What We&apos;ve Built. What It Did.
        </h2>
        <p
          style={{
            marginTop: "16px",
            fontSize: "1.0625rem",
            color: "var(--color-text-light-secondary)",
          }}
        >
          Every engagement starts with a problem. Here&apos;s how we solved a
          few of them.
        </p>
      </div>

      <div className="ps-case-studies-grid" ref={gridRef}>
        {caseStudyCards.map((study, index) => (
          <article key={`${study.client}-${index}`} className="ps-case-card">
            <div className="ps-case-card-top">
              <span className="ps-case-card-client">{study.client}</span>
              <span className="ps-case-card-tag">{study.industry}</span>
            </div>

            <p className="ps-case-card-result">{study.resultHighlight}</p>

            <ul className="ps-case-card-results-list" role="list">
              {study.results.map((result) => (
                <li key={result} className="ps-case-card-result-item">
                  {result}
                </li>
              ))}
            </ul>

            <Link href={study.href} className="ps-case-card-cta">
              Read the case study
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1 7h12M8 2l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
