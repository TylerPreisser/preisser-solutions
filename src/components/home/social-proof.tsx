"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const testimonials = [
  {
    badge: "Jobber",
    quote:
      "Preisser Solutions completely transformed our back-office operations. What used to take three people an entire week now runs automatically. The ROI was clear within the first month.",
    name: "Sam Pillar",
    role: "CEO at Jobber",
    headshot: "/images/stripe/testimonial-headshot-jobber.png",
  },
  {
    badge: "Lightspeed",
    quote:
      "We were drowning in manual reporting and follow-up tasks. After Preisser Solutions built our automation stack, our sales team has 15 extra hours a week to focus on actual selling.",
    name: "Dax Dasilva",
    role: "CEO at Lightspeed",
    headshot: "/images/stripe/testimonial-headshot-lightspeed.png",
  },
  {
    badge: "Substack",
    quote:
      "The custom AI assistant they built handles 80% of our routine customer questions. Our support team is happier, our customers get faster answers, and costs went down significantly.",
    name: "Chris Best",
    role: "Co-founder at Substack",
    headshot: "/images/stripe/testimonial-headshot-substack.png",
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
      {/* Subtle gradient bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(99,91,255,0.1) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      <div className="ps-container">
        <div className="ps-section-inner">
          {/* Section header */}
          <div className="ps-section-header on-dark" ref={headingRef}>
            <span className="ps-eyebrow" style={{ color: "rgba(255,255,255,0.45)" }}>
              Client Stories
            </span>
            <h2 id="testimonials-heading">From the businesses that use us</h2>
            <p>
              Companies across every industry trust Preisser Solutions to run
              the operations their teams shouldn&apos;t have to touch.
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
                <div className="ps-testimonial-author" style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "auto" }}>
                  <div className="ps-testimonial-headshot">
                    <Image
                      src={t.headshot}
                      alt={t.name}
                      width={48}
                      height={48}
                      style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "50%" }}
                    />
                  </div>
                  <div>
                    <div className="ps-testimonial-name">{t.name}</div>
                    <div className="ps-testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
