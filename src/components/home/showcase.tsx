"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

/**
 * Showcase — "Recent builds". Replaces the old MarCommand section in the
 * homepage narrative (§7 of docs/plans/2026-08-02-three-pillar-reposition.md).
 *
 * Every fact on these cards is verified in §9 of that plan. Do not add a claim
 * here that §9 does not carry. Specifically banned: MailChimp (NWKS uses
 * Resend), any statement that NWKS production email is currently sending,
 * nwksencounter.com as a live domain, any FarmBooks accuracy percentage, and
 * C3's AI assist described as live AI.
 *
 * Card idiom is deliberately the same one proven in
 * `src/components/products/ProductCard.tsx` (rounded-2xl, theme card border +
 * result-card background, -translate-y-1 lift with a blue-tinted shadow) so
 * this reads as part of the system rather than a bolted-on section.
 */

/** The three pillars, verbatim from §2 — punctuation included. */
const PILLAR = {
  software: "Business Software.",
  automation: "Business Automation.",
  ai: "AI Integration.",
} as const;

type PillarKey = keyof typeof PILLAR;

interface ShowcaseItem {
  name: string;
  href: string;
  /** Which pillars this build proves. Order matters — §2 order. */
  pillars: PillarKey[];
  /** One line: what it is. */
  lead: string;
  /** The receipts. Each one traceable to §9. */
  points: string[];
  /** Optional stack line, rendered under the points. */
  stack?: string;
  metric: { value: string; label: string };
}

const SHOWCASE: ShowcaseItem[] = [
  {
    name: "FarmBooks",
    href: "/case-studies/farmbooks",
    pillars: ["software", "automation", "ai"],
    lead: "Photograph a farm bill; get Schedule-F-ready books.",
    points: [
      "Vision and OCR read every bill independently, and each has to prove the section total — so a dropped line surfaces instead of vanishing silently.",
      "Handwritten bills always route to a human. Nothing handwritten is auto-posted.",
      "Corrections become durable rules, so the same vendor resolves itself next time.",
      "Output is a formula-driven .xlsx with live two-way SharePoint sync, where human edits win.",
    ],
    stack: "Next.js PWA on Cloudflare Workers + a Python extraction engine on Azure.",
    metric: { value: "1,069", label: "engine tests · 505 app tests green" },
  },
  {
    name: "C3 Studio",
    href: "/case-studies/c3-studio",
    pillars: ["software", "automation"],
    lead: "One admin login runs a website, a native iOS app, scheduling, comms, care, giving, and kids check-in.",
    points: [
      "18 typed content block types, rendered identically by the website and the native app from one API contract.",
      "Draft → Publish flips the site and the app live at the same moment.",
    ],
    metric: { value: "18", label: "block types · one API contract · two front ends" },
  },
  {
    name: "NWKS Encounter",
    href: "/case-studies/nwks-encounter",
    pillars: ["automation", "software"],
    lead: "Registration → confirmation → reminder → roster, for two separate ministries on one system.",
    points: [
      "A dedicated always-on cron worker drains scheduled campaigns in bounded chunks, because a synchronous send to 2,402 recipients took 67 seconds and would blow the per-request CPU budget.",
      "Passkey/WebAuthn two-factor with a recovery ladder.",
    ],
    metric: { value: "Two", label: "ministries · one registration and roster system" },
  },
];

const INTRO_LEAD =
  "These are not templates and not modules switched on inside someone else's platform. Each one is a whole internal system, built for a single business around how that business actually works, and shipped in weeks rather than quarters.";
const INTRO_TAIL =
  "Not everyone needs all of it. Some of this work is a full admin platform; some of it is one document pipeline.";

export function Showcase() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!gridRef.current) return;

    const cards = Array.from(gridRef.current.children) as HTMLElement[];

    if (prefersReduced) {
      cards.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    import("@/lib/gsap").then(({ gsap, ScrollTrigger }) => {
      if (!gridRef.current) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 28, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
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
      className="ps-section"
      id="showcase"
      aria-labelledby="showcase-heading"
      style={{
        background: "var(--theme-bg-primary)",
        transition: "background-color 300ms ease",
      }}
    >
      <div className="ps-container">
        <header className="max-w-3xl">
          <div className="ps-eyebrow ps-eyebrow--light">Recent builds</div>
          <h2 id="showcase-heading" className="ps-section-heading ps-section-heading--light">
            Three systems, built this year.
          </h2>
          <p className="ps-body-text ps-body-text--light mt-5">{INTRO_LEAD}</p>
          <p className="ps-body-text ps-body-text--light mt-3">{INTRO_TAIL}</p>
        </header>

        <div
          ref={gridRef}
          className="mt-12 grid grid-cols-1 gap-6 min-[940px]:grid-cols-3"
        >
          {SHOWCASE.map((item) => (
            <div key={item.name} className="flex">
              <Link
                href={item.href}
                prefetch={false}
                aria-label={`Read the ${item.name} case study`}
                className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px_rgba(13,149,232,0.18)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D95E8]"
                style={{
                  borderColor: "var(--theme-card-border)",
                  background: "var(--theme-result-card-bg)",
                }}
              >
                {/* Pillar tags — which pillar this build proves. "AI Integration."
                    renders in the brand blue; that colour split is the brand device. */}
                <ul className="mb-4 flex flex-wrap gap-1.5" aria-label="Pillars this build proves">
                  {item.pillars.map((key) => (
                    <li
                      key={key}
                      className="inline-flex items-center rounded-full border px-2.5 py-1 text-[12px] font-medium leading-none"
                      style={{
                        borderColor: "var(--theme-card-border)",
                        // --theme-accent-text, not --color-primary: the raw brand
                        // blue is only 3.24:1 on a white card.
                        color:
                          key === "ai" ? "var(--theme-accent-text)" : "var(--theme-text-muted)",
                      }}
                    >
                      {PILLAR[key]}
                    </li>
                  ))}
                </ul>

                <h3
                  className="text-[19px] font-semibold leading-snug tracking-tight transition-colors duration-200 group-hover:[color:var(--theme-accent-text)]"
                  style={{ color: "var(--theme-text-primary)" }}
                >
                  {item.name}
                </h3>

                <p
                  className="mt-2 text-[14px] font-medium leading-relaxed"
                  style={{ color: "var(--theme-text-primary)" }}
                >
                  {item.lead}
                </p>

                <ul className="mt-4 flex flex-1 flex-col gap-2.5">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="relative pl-4 text-[13px] leading-relaxed"
                      style={{ color: "var(--theme-text-secondary)" }}
                    >
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-[0.55em] inline-block h-1 w-1 rounded-full"
                        style={{ background: "var(--color-primary)" }}
                      />
                      {point}
                    </li>
                  ))}
                </ul>

                {item.stack && (
                  <p
                    className="mt-4 text-[12px] leading-relaxed"
                    style={{ color: "var(--theme-text-muted)" }}
                  >
                    {item.stack}
                  </p>
                )}

                <div
                  className="mt-5 flex items-baseline gap-1.5 border-t pt-4"
                  style={{ borderColor: "var(--theme-card-border)" }}
                >
                  <span
                    className="text-xl font-bold leading-none tracking-tight"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {item.metric.value}
                  </span>
                  <span
                    className="text-[12px] leading-tight"
                    style={{ color: "var(--theme-text-muted)" }}
                  >
                    {item.metric.label}
                  </span>
                </div>

                {/* Colour comes from --theme-accent-text so it darkens on the
                    light theme; the cyan hover was 1.40:1 on white. */}
                <div
                  className="mt-4 flex min-h-[24px] items-center gap-1.5 text-[12px] font-medium transition-all duration-200 group-hover:gap-2"
                  style={{ color: "var(--theme-accent-text)" }}
                >
                  Read the case study
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>

                {/* Hover border glow overlay — same treatment as ProductCard. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(128,233,255,0.2)" }}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
