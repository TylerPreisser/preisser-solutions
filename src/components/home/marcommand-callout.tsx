"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { MarCommandDashboard } from "@/components/home/marcommand-dashboard";

export function MarCommandCallout() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!contentRef.current) return;

    const children = Array.from(contentRef.current.children) as HTMLElement[];

    if (prefersReduced) {
      children.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    import("@/lib/gsap").then(({ gsap, ScrollTrigger }) => {
      if (!contentRef.current) return;

      gsap.fromTo(
        children,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
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
      className="ps-marcommand"
      id="marcommand"
      aria-labelledby="marcommand-heading"
    >
      {/* Decorative glow — top left */}
      <div className="ps-marcommand-glow" aria-hidden="true" />

      <div className="ps-marcommand-inner ps-marcommand-inner--stacked" ref={contentRef}>

        {/* Copy block: heading + body + closer + CTA */}
        <div className="ps-marcommand-copy">
          <div className="ps-eyebrow ps-eyebrow--brand">MarCommand</div>
          <h2
            id="marcommand-heading"
            className="ps-marcommand-heading"
          >
            MarCommand
          </h2>
          <p className="ps-marcommand-body">
            MarCommand is Preisser Solutions&apos;s internal marketing intelligence workflow
            for organizing your services, audiences, channels, competitors, content,
            ads, reviews, and follow-up into one practical visibility plan.
          </p>
          <div className="ps-marcommand-cta">
            <Link href="/contact?offer=hays-visibility-audit" className="ps-btn ps-btn-primary-dark">
              Get a Free Hays Visibility Audit
              <svg
                className="ps-btn-arrow"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1 8h14M9 2l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Dashboard mockup — full-width visual anchor. FROZEN — do not modify MarCommandDashboard. */}
        <div className="ps-marcommand-dashboard-wrap">
          <p className="sr-only">Dashboard values shown are sample data for interface demonstration.</p>
          <MarCommandDashboard />
        </div>


      </div>
    </section>
  );
}
