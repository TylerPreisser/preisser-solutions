"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

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
        <div className="ps-eyebrow">Free Consultation</div>
        <h2 id="cta-heading" className="ps-cta-heading">
          You&apos;ve Got the Problem. We&apos;ll Build the Fix.
        </h2>
        <p className="ps-cta-body">
          Whether it&apos;s a website, an app, an automation, or something you
          haven&apos;t even figured out how to describe yet &mdash; it starts
          with a conversation.
        </p>
        <div className="ps-cta-buttons">
          <Link href="/contact" className="ps-btn ps-btn-primary-dark">
            Tell Us What You Need
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
          <Link href="/services" className="ps-btn ps-btn-secondary">
            Explore Services
          </Link>
        </div>
      </div>
    </section>
  );
}
