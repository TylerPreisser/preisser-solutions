"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

interface ServicePillar {
  icon: string;
  title: string;
  description: string;
  accentColor: string;
  href: string;
}

const services: ServicePillar[] = [
  {
    icon: "WA",
    title: "Websites & Applications",
    description:
      "Professional sites, custom apps, client portals, e-commerce — built from scratch, built to perform.",
    accentColor: "#0D95E8",
    href: "/services",
  },
  {
    icon: "AS",
    title: "Automation Systems",
    description:
      "AI-powered engines that handle your repetitive work — invoicing, outreach, document processing, you name it.",
    accentColor: "#635BFF",
    href: "/services",
  },
  {
    icon: "SF",
    title: "System Fixes & Efficiency",
    description:
      "Something's slow, broken, or redundant? We find it and fix it with better tech.",
    accentColor: "#00D4AA",
    href: "/services",
  },
  {
    icon: "BI",
    title: "Dashboards & Business Intelligence",
    description:
      "See your business clearly. Real-time data, live reporting, actionable insight.",
    accentColor: "#F59E0B",
    href: "/services",
  },
  {
    icon: "MG",
    title: "Marketing & Growth Engines",
    description:
      "Automated content, email, SMS, SEO — lead generation systems that run without you.",
    accentColor: "#EF4444",
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

      <div className="ps-services-grid" ref={gridRef}>
        {services.map((service) => (
          <article key={service.title} className="ps-service-card">
            <div
              className="ps-service-card-accent"
              style={{ background: service.accentColor }}
              aria-hidden="true"
            />
            <div className="ps-service-card-icon" aria-hidden="true">
              {service.icon}
            </div>
            <h3 className="ps-service-card-title">{service.title}</h3>
            <p className="ps-service-card-desc">{service.description}</p>
            <Link href={service.href} className="ps-service-card-link">
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
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
