"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const industryCards = [
  {
    label: "Industrial & Construction",
    image: "/images/stripe/enterprise-accordion-hertz.png",
  },
  {
    label: "Retail & E-commerce",
    image: "/images/stripe/enterprise-accordion-instacart.png",
  },
  {
    label: "Media & Publishing",
    image: "/images/stripe/enterprise-accordion-lemonde.png",
  },
  {
    label: "Consumer Brands",
    image: "/images/stripe/enterprise-accordion-urbn.png",
  },
];

export function EnterpriseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (contentRef.current) contentRef.current.style.opacity = "1";
      return;
    }

    import("@/lib/gsap").then(({ gsap, ScrollTrigger }) => {
      if (!contentRef.current) return;

      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="ps-section ps-enterprise-section"
      id="enterprise"
      aria-labelledby="enterprise-heading"
    >
      <div className="ps-enterprise-bg" aria-hidden="true" />

      <div className="ps-container">
        <div className="ps-section-inner">
          <div className="ps-enterprise-content" ref={contentRef}>
            {/* Header */}
            <div
              style={{
                maxWidth: "680px",
                marginBottom: "48px",
              }}
            >
              <span
                className="ps-eyebrow"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                Enterprise
              </span>
              <h2
                id="enterprise-heading"
                style={{
                  fontSize: "clamp(28px, 4vw, 48px)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  color: "#ffffff",
                  marginBottom: "20px",
                }}
              >
                Built for the most<br />operations-intensive businesses
              </h2>
              <p
                style={{
                  fontSize: "18px",
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.6)",
                  maxWidth: "52ch",
                  marginBottom: "28px",
                }}
              >
                Businesses across construction, retail, media, and consumer brands
                use Preisser Solutions to automate their most complex, high-volume
                internal operations — from multi-location scheduling to enterprise
                reporting pipelines.
              </p>
              <Link href="/services" className="ps-btn-secondary">
                Explore enterprise solutions
              </Link>
            </div>

            {/* 2x2 photo grid */}
            <div className="ps-enterprise-tabs">
              {industryCards.map((card) => (
                <div key={card.label} className="ps-enterprise-tab">
                  <Image
                    src={card.image}
                    alt={card.label}
                    width={600}
                    height={400}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div className="ps-enterprise-tab-overlay">
                    <span className="ps-enterprise-tab-label">{card.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
