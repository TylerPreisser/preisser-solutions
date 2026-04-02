"use client";

import { useEffect, useRef } from "react";

// Testimonials section — dark bg, 3-column cards
const testimonials = [
  {
    badge: "Company Name",
    quote: "[Client quote goes here — a specific, results-focused testimonial from a satisfied client. Two or three sentences that highlight a concrete outcome.]",
    name: "[Client Name]",
    role: "[Title] at [Company]",
  },
  {
    badge: "Company Name",
    quote: "[Client quote goes here — a specific, results-focused testimonial from a satisfied client. Two or three sentences that highlight a concrete outcome.]",
    name: "[Client Name]",
    role: "[Title] at [Company]",
  },
  {
    badge: "Company Name",
    quote: "[Client quote goes here — a specific, results-focused testimonial from a satisfied client. Two or three sentences that highlight a concrete outcome.]",
    name: "[Client Name]",
    role: "[Title] at [Company]",
  },
];

export function SocialProof() {
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
        const cards = gridRef.current.querySelectorAll<HTMLElement>(".ps-testimonial-card");
        gsap.to(cards, {
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
        });
      }

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    });
  }, []);

  return (
    <section
      className="ps-section ps-section-dark"
      id="testimonials"
      aria-labelledby="testimonials-heading"
    >
      <div className="ps-container">
        {/* Section header */}
        <div className="ps-section-header on-dark" ref={headingRef}>
          <span className="ps-eyebrow">Client Stories</span>
          <h2 id="testimonials-heading">What Clients Say</h2>
          <p>
            [Section subtitle — brief framing of the testimonials section.]
          </p>
        </div>

        {/* 3-column testimonial grid */}
        <div className="ps-testimonials-grid" ref={gridRef}>
          {testimonials.map((t, i) => (
            <div key={i} className="ps-testimonial-card">
              <div className="ps-testimonial-badge">{t.badge}</div>
              <p className="ps-testimonial-quote">
                <span className="ps-quote-mark" aria-hidden="true">&ldquo;</span>
                {t.quote}
              </p>
              <div className="ps-testimonial-author">
                <div className="ps-testimonial-name">{t.name}</div>
                <div className="ps-testimonial-role">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
