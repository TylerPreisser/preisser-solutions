"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { valueProps } from "@/data/services";

export function ValueProps() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    import("@/lib/gsap").then(({ gsap, ScrollTrigger }) => {
      // Heading reveal
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

      // Cards staggered reveal
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".ps-benefit-item");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
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
    <section id="benefits-overview" className="ps-benefits-section" ref={sectionRef}>
      <div className="ps-container">
        <div className="ps-benefits-section-header" ref={headingRef}>
          <span className="ps-eyebrow">Why Preisser Solutions</span>
          <h2 className="ps-section-heading">The Preisser Solutions Advantage</h2>
          <p className="ps-section-subheading" style={{ margin: "0 auto" }}>
            Six reasons businesses choose us over hiring, contracting, or off-the-shelf software.
          </p>
        </div>

        <div className="ps-benefits-grid" ref={gridRef}>
          {valueProps.map((prop) => (
            <div key={prop.title} className="ps-benefit-item">
              <Image
                src={`/images/${encodeURIComponent(prop.icon)}`}
                alt={`${prop.title} icon`}
                width={56}
                height={56}
                className="ps-benefit-icon"
                loading="lazy"
              />
              <h3>{prop.title}</h3>
              <p>{prop.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
