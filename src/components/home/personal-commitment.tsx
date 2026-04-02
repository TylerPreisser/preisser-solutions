"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export function PersonalCommitment() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    import("@/lib/gsap").then(({ gsap, ScrollTrigger }) => {
      if (!sectionRef.current) return;

      const heading = sectionRef.current.querySelector(".ps-commitment-header");
      const subtitle = sectionRef.current.querySelector(".ps-commitment-subtitle");
      const text = sectionRef.current.querySelector(".ps-commitment-text");
      const visual = sectionRef.current.querySelector(".ps-commitment-visual");

      const targets = [heading, subtitle, text, visual].filter(Boolean);

      gsap.fromTo(
        targets,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    });
  }, []);

  return (
    <section
      id="personal-commitment"
      className="ps-commitment-section"
      ref={sectionRef}
    >
      <div className="ps-container">
        <h2 className="ps-commitment-header">
          Beyond Software: Your Dedicated Automation Experts
        </h2>
        <p className="ps-commitment-subtitle">Why wouldn&apos;t I just contract it out?</p>

        <div className="ps-commitment-content">
          <div className="ps-commitment-text">
            <div className="ps-commitment-text-quote">
              <p>
                &ldquo;You hire a firm to complete a specific task, you and your team still have to
                support and facilitate all of that outside help. At Preisser Solutions, we personally
                dive deep to understand your unique business&mdash;its specific bottlenecks, strengths
                and struggles. We then design and build custom solutions and automated systems tailored
                precisely to your business and industry. You&apos;re not just getting a service;
                you&apos;re getting a custom internal solution developed only for you. Part of our
                service is the upkeep and adaptation of our systems as long as we are your solution.
                This ensures all solutions we come up with fit seamlessly and deliver maximum efficiency
                without unnecessary disruptions.&rdquo;
              </p>
            </div>
            <p className="signature">— Tyler Preisser</p>
          </div>

          <div className="ps-commitment-visual">
            <Image
              src="/images/Tyler Portait.jpeg"
              alt="Tyler Preisser — Founder, Preisser Solutions"
              width={320}
              height={320}
              className="ps-tyler-photo"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
