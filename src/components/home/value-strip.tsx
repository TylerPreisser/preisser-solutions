"use client";

import { useEffect, useRef } from "react";

const valueItems = [
  {
    icon: "⚡",
    strong: "AI-first approach",
    text: "5x faster than traditional dev shops",
  },
  {
    icon: "📍",
    strong: "Built for Kansas businesses",
    text: "Not Silicon Valley startups",
  },
  {
    icon: "🤝",
    strong: "Work directly with Tyler",
    text: "The person who builds it",
  },
  {
    icon: "✓",
    strong: "No retainers required",
    text: "Scope it. Build it. Ship it.",
  },
];

export function ValueStrip() {
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!itemsRef.current) return;

    const children = Array.from(itemsRef.current.children) as HTMLElement[];

    if (prefersReduced) {
      children.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    import("@/lib/gsap").then(({ gsap, ScrollTrigger }) => {
      if (!itemsRef.current) return;

      gsap.fromTo(
        children,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: itemsRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    });
  }, []);

  return (
    <section className="ps-value-strip" aria-label="Key advantages">
      <div className="ps-value-strip-inner" ref={itemsRef}>
        {valueItems.map((item) => (
          <div key={item.strong} className="ps-value-item">
            <span className="ps-value-icon" aria-hidden="true">
              {item.icon}
            </span>
            <p className="ps-value-text">
              <strong>{item.strong}</strong>
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
