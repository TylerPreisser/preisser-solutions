"use client";

import { useEffect, useRef } from "react";

const valueItems = [
  {
    icon: "//",
    strong: "Websites, apps, automations,",
    text: " dashboards, and integrations",
  },
  {
    icon: "->",
    strong: "AI-first methodology —",
    text: " we ship in weeks, not months",
  },
  {
    icon: "<>",
    strong: "Built for Kansas businesses,",
    text: " not Silicon Valley startups",
  },
  {
    icon: ">>",
    strong: "You work directly with the person",
    text: " who builds it",
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
