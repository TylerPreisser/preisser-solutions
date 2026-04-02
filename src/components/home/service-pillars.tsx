"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

interface ServicePillar {
  title: string;
  description: string;
  gradient: string;
  href: string;
}

const services: ServicePillar[] = [
  {
    title: "Websites & Applications",
    description:
      "Professional sites, custom apps, client portals, e-commerce — built from scratch, built to perform.",
    gradient: "linear-gradient(135deg, #0D95E8 0%, #635BFF 100%)",
    href: "/services",
  },
  {
    title: "Automation Systems",
    description:
      "AI-powered engines that handle your repetitive work — invoicing, outreach, document processing, you name it.",
    gradient: "linear-gradient(135deg, #635BFF 0%, #a855f7 100%)",
    href: "/services",
  },
  {
    title: "System Fixes & Efficiency",
    description:
      "Something's slow, broken, or redundant? We find it and fix it with better tech.",
    gradient: "linear-gradient(135deg, #00D4AA 0%, #0D95E8 100%)",
    href: "/services",
  },
  {
    title: "Dashboards & Business Intelligence",
    description:
      "See your business clearly. Real-time data, live reporting, actionable insight.",
    gradient: "linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)",
    href: "/services",
  },
  {
    title: "Marketing & Growth Engines",
    description:
      "Automated content, email, SMS, SEO — lead generation systems that run without you.",
    gradient: "linear-gradient(135deg, #EF4444 0%, #635BFF 100%)",
    href: "/services",
  },
];

export function ServicePillars() {
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
          stagger: 0.1,
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
      className="ps-services"
      id="services"
      aria-labelledby="services-heading"
    >
      <div className="ps-services-header">
        <div className="ps-eyebrow ps-eyebrow--light">Services</div>
        <h2
          id="services-heading"
          className="ps-section-heading ps-section-heading--light"
        >
          What We Build
        </h2>
      </div>

      <div className="ps-bento-grid" ref={gridRef}>
        {services.map((service, i) => (
          <Link
            key={service.title}
            href={service.href}
            className={`ps-bento-card ${i === 0 ? "ps-bento-card--large" : ""}`}
          >
            {/* Gradient visual area */}
            <div
              className="ps-bento-card-visual"
              style={{ background: service.gradient }}
              aria-hidden="true"
            />
            {/* Content area */}
            <div className="ps-bento-card-content">
              <h3 className="ps-bento-card-title">{service.title}</h3>
              <p className="ps-bento-card-desc">{service.description}</p>
              <span className="ps-bento-card-link">
                Learn more
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
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
