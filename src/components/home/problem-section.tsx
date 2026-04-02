"use client";

import { useEffect, useRef } from "react";

const problemItems = [
  "Your CRM doesn't talk to your accounting software",
  "Data gets entered twice — sometimes three times",
  "Staff running reports by hand every week",
  "You hired software to save time; now you manage it",
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
            Your Technology Should Be Working for You — Not the Other Way Around
          </h2>
          <div className="ps-problem-body">
            <p>
              Every business runs on systems. Your CRM. Your scheduling tool.
              Your invoicing. Your website. Your marketing.
            </p>
            <p>
              And most of the time, those systems don&apos;t talk to each other.
              Data gets entered twice. Someone&apos;s running reports by hand.
              Your staff is doing work a machine should be doing. You hired
              software to save time, and now your team spends half their day
              managing it.
            </p>
            <p>
              <strong>That&apos;s where we come in.</strong>
            </p>
            <p>
              Preisser Solutions gets inside your operation, finds what&apos;s
              broken or slow, and builds the exact solution your business needs
              — whether that&apos;s connecting your systems, automating a
              process, or building something from scratch.
            </p>
            <p>
              Everything we build uses AI-first methodology. That means faster
              delivery, smarter systems, and outcomes that would have taken a
              traditional shop months.{" "}
              <strong>We do it in weeks.</strong>
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
              → These aren&apos;t permanent problems. They&apos;re engineering
              problems. And every one of them is fixable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
