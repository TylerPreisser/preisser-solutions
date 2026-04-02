"use client";

import { useState, useEffect, useRef } from "react";
import { services } from "@/data/services";

export function ServicesOverview() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
        const cards = gridRef.current.querySelectorAll(".ps-service-item");
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

  const handleServiceClick = (index: number) => {
    if (!isMobile) return;
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="services" className="ps-services-section">
      <div className="ps-container">
        <div className="ps-services-section-header" ref={headingRef}>
          <span className="ps-eyebrow">What We Do</span>
          <h2 className="ps-section-heading">How We Help Your Business Thrive</h2>
          <p className="ps-section-subheading" style={{ margin: "0 auto" }}>
            From deep-dive workflow analysis to fully custom automation systems — every solution is
            built specifically for your business.
          </p>
        </div>

        <div className="ps-services-grid" ref={gridRef}>
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`ps-service-item${activeIndex === index ? " active" : ""}`}
              onClick={() => handleServiceClick(index)}
              role={isMobile ? "button" : undefined}
              aria-expanded={isMobile ? activeIndex === index : undefined}
              tabIndex={isMobile ? 0 : undefined}
              onKeyDown={
                isMobile
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleServiceClick(index);
                      }
                    }
                  : undefined
              }
            >
              <h4>{service.title}</h4>
              <div
                className="ps-service-description"
                dangerouslySetInnerHTML={{ __html: `<p>${service.description}</p>` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
