"use client";

import { useEffect, useRef } from "react";

interface WhyBlock {
  icon: string;
  title: string;
  description: string;
}

const whyBlocks: WhyBlock[] = [
  {
    icon: "📞",
    title: "Direct Access",
    description:
      "You don't get handed off to a junior dev or an account manager. Tyler Preisser builds your system, manages your project, and picks up the phone when you call. That's it.",
  },
  {
    icon: "⚡",
    title: "AI-Native Speed",
    description:
      "We use artificial intelligence at every stage — from analysis to build to deployment. What used to take agencies months, we ship in weeks. Not because we cut corners. Because we work smarter.",
  },
  {
    icon: "🎯",
    title: "Built for Your Business",
    description:
      "We don't resell templates. We study your operation, identify what's costing you time and money, and build a custom solution that fits like it was always supposed to be there.",
  },
  {
    icon: "🤝",
    title: "Ongoing Partnership",
    description:
      "Every system we build comes with support. As long as you're our client, we maintain, adapt, and improve what we've built — because your business doesn't stop evolving, and neither should your technology.",
  },
];

export function WhyUs() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!gridRef.current) return;

    const blocks = Array.from(gridRef.current.children) as HTMLElement[];

    if (prefersReduced) {
      blocks.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    import("@/lib/gsap").then(({ gsap, ScrollTrigger }) => {
      if (!gridRef.current) return;

      gsap.fromTo(
        blocks,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.12,
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
      className="ps-why"
      id="why-us"
      aria-labelledby="why-heading"
    >
      <div className="ps-why-header">
        <div className="ps-eyebrow">Why Us</div>
        <h2
          id="why-heading"
          className="ps-section-heading ps-section-heading--dark"
        >
          Why Work with Us
        </h2>
      </div>

      <div className="ps-why-grid" ref={gridRef}>
        {whyBlocks.map((block) => (
          <div key={block.title} className="ps-why-block">
            <div className="ps-why-block-icon" aria-hidden="true">
              {block.icon}
            </div>
            <h3 className="ps-why-block-title">{block.title}</h3>
            <p className="ps-why-block-desc">{block.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
