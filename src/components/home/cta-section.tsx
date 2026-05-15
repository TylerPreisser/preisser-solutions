"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

export function CtaSection() {
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
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    });
  }, []);

  return (
    <section
      className="ps-cta-section"
      id="cta"
      aria-labelledby="cta-heading"
    >
      {/* Radial glow */}
      <div className="ps-cta-glow" aria-hidden="true" />

      <div className="ps-cta-content" ref={contentRef}>
        <div className="ps-eyebrow">Hays Visibility Sprint</div>
        <h2 id="cta-heading" className="ps-cta-heading">
          Ready to see where your business is losing Google visibility, calls, and follow-up?
        </h2>
        <p className="ps-cta-subcopy">
          We&apos;ll review your Google visibility, website conversion path, review gap,
          competitor signals, and lead follow-up, then give you a practical 30-day action plan.
        </p>
        <div className="ps-cta-buttons">
          <Link
            href="/contact?offer=hays-visibility-audit"
            className="ps-btn ps-btn-primary-dark"
            onClick={() =>
              trackEvent("cta_click", {
                location: "homepage_final_cta",
                link_text: "Get a Free Hays Visibility Audit",
              })
            }
          >
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
          <a
            href="tel:+16203523296"
            className="ps-btn ps-btn-secondary"
            onClick={() =>
              trackEvent("phone_call_click", {
                location: "homepage_final_cta",
                link_text: "Call Preisser Solutions",
              })
            }
          >
            Call Preisser Solutions
          </a>
        </div>
        <Link
          href="/case-studies"
          className="ps-cta-portfolio-link"
        >
          See proof standards and resources &rarr;
        </Link>
      </div>
    </section>
  );
}
