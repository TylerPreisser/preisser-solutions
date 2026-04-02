"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const stats = [
  { number: "200+", label: "Automation systems deployed" },
  { number: "40%", label: "Average overhead reduction" },
  { number: "$2M+", label: "Saved for clients annually" },
  { number: "24/7", label: "Uptime — no manual intervention" },
];

// Stripe's actual customer logo images from the saved site
const customerLogos = [
  { src: "/images/stripe/Supabase.png", alt: "Supabase" },
  { src: "/images/stripe/linear.png", alt: "Linear" },
  { src: "/images/stripe/Runway.png", alt: "Runway" },
  { src: "/images/stripe/decagon.png", alt: "Decagon" },
  { src: "/images/stripe/lovable.png", alt: "Lovable" },
  { src: "/images/stripe/Eleven_Labs.png", alt: "Eleven Labs" },
  { src: "/images/stripe/browserbase.png", alt: "Browserbase" },
];

export function PersonalCommitment() {
  const statsRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    import("@/lib/gsap").then(({ gsap, ScrollTrigger }) => {
      if (logoRef.current) {
        gsap.fromTo(
          logoRef.current.querySelectorAll(".ps-customer-logo"),
          { opacity: 0, y: 12 },
          {
            opacity: 0.45,
            y: 0,
            duration: 0.5,
            stagger: 0.07,
            ease: "power2.out",
            scrollTrigger: {
              trigger: logoRef.current,
              start: "top 90%",
              once: true,
            },
          }
        );
      }

      if (statsRef.current) {
        const items = statsRef.current.querySelectorAll<HTMLElement>(".ps-stat-item-inner");
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 88%",
            once: true,
          },
        });
      }

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    });
  }, []);

  return (
    <>
      {/* Logo Bar — "Trusted by businesses across industries" */}
      <div className="ps-logo-bar" ref={logoRef}>
        <div className="ps-container">
          <p className="ps-logo-bar-label">Trusted by businesses across industries</p>
          <div className="ps-logo-grid" aria-label="Partner companies">
            {customerLogos.map((logo) => (
              <Image
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={28}
                className="ps-customer-logo"
                style={{ objectFit: "contain", height: "24px", width: "auto" }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="ps-stats-bar">
        <div className="ps-container">
          <div className="ps-stats-grid" ref={statsRef} role="list" aria-label="Key statistics">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`ps-stat-item-inner${i < stats.length - 1 ? " ps-stat-divider" : ""}`}
                role="listitem"
              >
                <div className="ps-stat-number">
                  {stat.number}
                </div>
                <div className="ps-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
