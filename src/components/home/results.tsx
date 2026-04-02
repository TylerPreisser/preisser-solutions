"use client";

import { useEffect, useRef } from "react";

interface Stat {
  number: string;
  numericValue: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  {
    number: "5x",
    numericValue: 5,
    suffix: "x",
    label: "organic reach increase in 30 days",
  },
  {
    number: "95%",
    numericValue: 95,
    suffix: "%",
    label: "reduction in inventory tracking time",
  },
  {
    number: "60%+",
    numericValue: 60,
    suffix: "%+",
    label: "dormant customer reactivation",
  },
  {
    number: "75%",
    numericValue: 75,
    suffix: "%",
    label: "decrease in invoice processing time",
  },
  {
    number: "10+",
    numericValue: 10,
    suffix: "+",
    label: "hours per week freed per engagement",
  },
];

export function Results() {
  const statsRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!statsRef.current) return;

    const statEls = Array.from(statsRef.current.children) as HTMLElement[];

    if (prefersReduced) {
      statEls.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    import("@/lib/gsap").then(({ gsap, ScrollTrigger }) => {
      if (!statsRef.current || hasAnimated.current) return;

      // Reveal animation
      gsap.fromTo(
        statEls,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 82%",
            once: true,
            onEnter: () => {
              if (hasAnimated.current) return;
              hasAnimated.current = true;

              // Count-up animation for each stat number
              statEls.forEach((statEl, index) => {
                const numberEl = statEl.querySelector(".ps-stat-number");
                if (!numberEl) return;

                const stat = stats[index];
                gsap.fromTo(
                  { val: 0 },
                  { val: stat.numericValue },
                  {
                    duration: 1.8,
                    ease: "power2.out",
                    delay: index * 0.1,
                    onUpdate: function () {
                      const current = Math.round(this.targets()[0].val);
                      numberEl.textContent = `${current}${stat.suffix}`;
                    },
                  }
                );
              });
            },
          },
        }
      );

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    });
  }, []);

  return (
    <section
      className="ps-results"
      id="results"
      aria-labelledby="results-heading"
    >
      <div className="ps-results-header">
        <div className="ps-eyebrow ps-eyebrow--light">Results</div>
        <h2
          id="results-heading"
          className="ps-section-heading ps-section-heading--light"
        >
          Real Results for Real Businesses
        </h2>
      </div>

      <div className="ps-stats-row" ref={statsRef}>
        {stats.map((stat) => (
          <div key={stat.label} className="ps-stat">
            <div className="ps-stat-number" aria-label={`${stat.number} — ${stat.label}`}>
              {stat.number}
            </div>
            <p className="ps-stat-label">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
