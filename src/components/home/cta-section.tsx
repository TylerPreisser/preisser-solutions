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

      <div className="ps-cta-content ps-cta-content--no-body" ref={contentRef}>
        <div className="ps-eyebrow">Get in Touch</div>
        <h2 id="cta-heading" className="ps-cta-heading">
          Find out how we can help your business.
        </h2>
        {/* NO BODY COPY HERE, BY INSTRUCTION. The owner reduced this section
            to its heading on 2026-09-05: he asked for it to say
            "Find out how we can help your business." and said it twice,
            identically. The h2 above ALREADY was that string byte for byte,
            so the reduction was a deletion, not a rewrite. Nothing was
            reworded.

            This supersedes the ADR-0009 note that used to sit here telling
            future passes not to tighten his paragraph. That note was right
            until he changed his mind; it is not a veto on his own later
            instruction.

            WHERE THE PARAGRAPH WENT. Its opening claim, "We start by
            listening, finding out how we can help you achieve your
            business's biggest goals, or even solve your business's biggest
            problems.", was moved VERBATIM into Why Us, which is where he
            asked for it. See why-us.tsx.

            WHAT WAS NOT CARRIED OVER, so it is findable if he wants it back:
              - "We have a very effective, unique approach: experience in
                enterprise software and consulting, as well as development."
              - "We are the ones who ideate with you and come up with
                solutions, and the same person who builds it works with you
                every step of the way."
            The second of those is echoed elsewhere on the site
            (data/locations/hays-kansas.ts and data/aeo/
            premium-web-development-kansas.ts) but no longer appears anywhere
            on the HOME page. The first appears nowhere else at all.

            Do not re-add copy here to "fill" the section. If it looks empty,
            that is a spacing problem: see .ps-cta-content--no-body. */}
        <div className="ps-cta-buttons">
          <Link href="/contact" className="ps-btn ps-btn-primary-dark">
            Reach out
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
        <a
          href="https://tylerpreisser.com"
          target="_blank"
          rel="noopener noreferrer"
          className="ps-cta-portfolio-link"
        >
          More of our founder&apos;s projects &rarr;
        </a>
      </div>
    </section>
  );
}
