"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { caseStudies } from "@/data/case-studies";

export function SocialProof() {
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    import("@/lib/gsap").then(({ gsap, ScrollTrigger }) => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
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
        const cards = gridRef.current.querySelectorAll(".ps-case-study-card, .ps-your-company-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
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
    <section id="case-studies" className="ps-case-studies-section">
      <div className="ps-container">
        <div className="ps-case-studies-header" ref={headingRef}>
          <span className="ps-eyebrow-dark">Real Results</span>
          <h2 className="ps-section-heading-dark">Client Success Stories</h2>
          <p className="ps-section-subheading-dark" style={{ margin: "0 auto" }}>
            See what custom automation has done for businesses like yours.
          </p>
        </div>

        <div className="ps-case-studies-grid" ref={gridRef}>
          {caseStudies.map((study) => {
            if (study.isYourCompany) {
              return (
                <div key={study.id} className="ps-your-company-card">
                  <h3>{study.client}</h3>
                  <p>Your business could be featured here.</p>
                  <Link href={study.ctaHref} className="ps-btn-primary" style={{ marginTop: "8px" }}>
                    {study.ctaLabel}
                    <span className="ps-btn-arrow" aria-hidden="true">→</span>
                  </Link>
                </div>
              );
            }

            const titleWithoutClient = study.title.replace(`${study.client} | `, "");

            return (
              <div key={study.id} className="ps-case-study-card">
                <span className="ps-case-study-client-badge">{study.client}</span>
                <h3>{titleWithoutClient}</h3>

                <span className="ps-case-study-label">Challenge</span>
                <p>{study.challenge}</p>

                <span className="ps-case-study-label">Our Solution</span>
                <p>{study.solution}</p>

                <span className="ps-case-study-label" style={{ marginTop: "20px" }}>
                  Key Results
                </span>
                <ul className="ps-case-study-results-list" style={{ marginTop: "8px" }}>
                  {study.results.map((result, idx) => (
                    <li key={idx}>
                      {result.highlight && (
                        <span className="highlight-result">{result.highlight} </span>
                      )}
                      {result.text}
                    </li>
                  ))}
                </ul>

                <Link href={study.ctaHref} className="ps-case-study-cta">
                  {study.ctaLabel}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
