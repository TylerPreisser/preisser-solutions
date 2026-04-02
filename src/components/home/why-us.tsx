"use client";

import { useEffect, useRef } from "react";

interface WhyBlock {
  icon: string;
  title: string;
  description: string;
}

const whyBlocks: WhyBlock[] = [
  {
    icon: "01",
    title: "We Build Everything In-House.",
    description:
      "No subcontractors. No offshore teams. No white-labeled templates. Tyler Preisser designs it, builds it, and supports it. When you call, you talk to the person who wrote the code.",
  },
  {
    icon: "02",
    title: "AI Makes Us Dangerously Fast.",
    description:
      "We use AI at every stage of our process — research, design, development, testing. It's not a marketing buzzword. It's why we deliver in weeks what traditional shops take months to finish. You get the same (or better) quality at a fraction of the timeline.",
  },
  {
    icon: "03",
    title: "Built for Your Business. Not a Template.",
    description:
      "We don't plug you into a pre-built platform and call it custom. We study your operation, understand your workflows, and build a solution that fits your business specifically. It works the way you work — not the other way around.",
  },
  {
    icon: "04",
    title: "We Stay With It.",
    description:
      "Every system we build comes with ongoing support. If something breaks, we fix it. If your business changes, we adapt the system. As long as you're our client, we're in it with you.",
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
          We Don&apos;t Outsource. We Don&apos;t Resell. We Build.
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
