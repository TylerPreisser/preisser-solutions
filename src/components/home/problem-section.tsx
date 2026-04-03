"use client";

import { useEffect, useRef } from "react";

const problemItems = [
  "Your website is outdated and not pulling its weight",
  "Your systems don't talk to each other",
  "Your team is buried in manual work that should've been automated years ago",
  "You need something custom and nothing on the market fits",
];

export function ProblemSection() {
  const textRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!textRef.current || !visualRef.current) return;

    if (prefersReduced) {
      textRef.current.style.opacity = "1";
      textRef.current.style.transform = "none";
      visualRef.current.style.opacity = "1";
      visualRef.current.style.transform = "none";
      return;
    }

    import("@/lib/gsap").then(({ gsap, ScrollTrigger }) => {
      if (!textRef.current || !visualRef.current) return;

      gsap.to(textRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 82%",
          once: true,
        },
      });

      gsap.to(visualRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.75,
        ease: "power3.out",
        delay: 0.15,
        scrollTrigger: {
          trigger: visualRef.current,
          start: "top 82%",
          once: true,
        },
      });

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    });
  }, []);

  return (
    <section className="ps-problem" id="problem" aria-labelledby="problem-heading">
      <div className="ps-problem-inner">
        {/* Left: text */}
        <div ref={textRef} className="ps-problem-text">
          <div className="ps-eyebrow ps-eyebrow--light">The Problem</div>
          <h2
            id="problem-heading"
            className="ps-section-heading ps-section-heading--light"
          >
            You Know What Your Business Needs. You Just Need Someone Who Can Build It.
          </h2>
          <div className="ps-problem-body">
            <p>
              Every business hits a point where the technology can&apos;t keep
              up. Your website&apos;s outdated. Your systems don&apos;t talk to
              each other. Your team is buried in manual work that should&apos;ve
              been automated years ago. You need a custom tool and nothing on
              the market fits. You need something built &mdash; and you need
              someone who can actually do it.
            </p>
            <p>
              That&apos;s what Preisser Solutions is. We&apos;re builders. You
              bring us the problem, we build the solution. Websites.
              Applications. Automation systems. Dashboards. Integrations. If it
              involves technology, we can design it and build it &mdash; from
              concept to deployment.
            </p>
            <p>
              The difference? We build with AI at the core of everything we do.
              Not as a gimmick. As a method. It means we can do in two weeks
              what a traditional dev shop quotes you three months for. Same
              quality. Fraction of the time. Because the tools we use to build
              are a generation ahead of everyone else in this space.
            </p>
          </div>
        </div>

        {/* Right: visual card */}
        <div ref={visualRef} className="ps-problem-visual" aria-hidden="true">
          <div className="ps-problem-card">
            <p className="ps-problem-card-title">What We Find In Every Business</p>
            <ul className="ps-problem-list" role="list">
              {problemItems.map((item) => (
                <li key={item} className="ps-problem-list-item">
                  <span className="ps-problem-list-dot" />
                  <span className="ps-problem-list-text">{item}</span>
                </li>
              ))}
            </ul>
            <div className="ps-problem-divider" />
            <p className="ps-problem-resolution">
              → You bring us the problem, and we build the solution.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
