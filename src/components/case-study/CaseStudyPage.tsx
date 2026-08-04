"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { JsonLd } from "@/components/seo/JsonLd";
import type { CaseStudyData } from "@/types/case-study";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";

/**
 * Case study detail renderer.
 *
 * Premium, Stripe/Linear/Vercel-tier layout. Renders every section of a
 * CaseStudyData record:
 *
 *   1. Hero (dark, full-bleed, eyebrow + H1 + subheadline + result chips)
 *   2. At-a-glance metrics row (oversized numbers; count-up on entry)
 *   3. What existed before (light, narrative)
 *   4. What we built (dark surface, narrative + accent panel)
 *   5. Specifications (light, scannable bullets + subsections)
 *   6. Results (dark, dramatic cards; GSAP fade-in on scroll)
 *   7. Tech stack chips
 *   8. Related case studies (3 max)
 *   9. CTA (dark, prominent)
 *
 * Reusable across all 8 case studies. Content comes entirely from the
 * `data` prop — never hardcoded.
 */

// All 21 publishable case studies, indexed for related-case-study lookup.
const RELATED_CARD_INDEX: Record<
  string,
  { slug: string; label: string; oneLine: string; category: string }
> = {
  // ── 1. Named client engagements (canonical #1–8) ────────────
  "cassidy-hvac-reactivation": {
    slug: "cassidy-hvac-reactivation",
    label: "Cassidy HVAC — Customer Reactivation",
    oneLine: "60%+ dormant customer reactivation in 6 weeks",
    category: "AI Automation",
  },
  "cassidy-hvac-marketing-engine": {
    slug: "cassidy-hvac-marketing-engine",
    label: "Cassidy HVAC — AI Marketing Engine",
    oneLine: "5x organic reach in 30 days, agency replaced",
    category: "Marketing Automation",
  },
  "hg-oil-inventory-system": {
    slug: "hg-oil-inventory-system",
    label: "HG Oil Holdings — Inventory System",
    oneLine: "95% logistics-time reduction, loss center to profit center",
    category: "Custom Application",
  },
  "hg-oil-ai-invoice-processing": {
    slug: "hg-oil-ai-invoice-processing",
    label: "HG Oil Holdings — AI Invoice Processing",
    oneLine: "75% reduction in manual invoice handling",
    category: "AI Document Processing",
  },
  "alliant-mgu-insurance": {
    slug: "alliant-mgu-insurance",
    label: "An MGU within the Alliant Insurance Ecosystem",
    oneLine: "Dual-model AI submission processing, zero missed renewals",
    category: "Custom CRM",
  },
  "chicago-bus-operator": {
    slug: "chicago-bus-operator",
    label: "A Chicago-Area Bus Transportation Operator",
    oneLine: "Reconciliation: full day to a 15-minute exception queue",
    category: "Dashboards & BI",
  },
  "iron-and-oak-podcast": {
    slug: "iron-and-oak-podcast",
    label: "The Iron and Oak Podcast",
    oneLine: "134 pre-rendered pages, full cinematic media brand",
    category: "Website Build",
  },
  "wife-supply-co": {
    slug: "wife-supply-co",
    label: "Wife Supply Co",
    oneLine: "AI gift-matching engine, custom commerce front end",
    category: "AI Commerce",
  },

  // ── 2. Internal AI platforms (canonical #9, #16, #17, #21) ──
  marcommand: {
    slug: "marcommand",
    label: "MarCommand — Multi-Agent Marketing Engine",
    oneLine: "8 agents orchestrated end-to-end across every channel",
    category: "Internal Platform",
  },
  "agentic-coding-specialists": {
    slug: "agentic-coding-specialists",
    label: "Agentic AI Coding Specialists",
    oneLine: "Specialized agentic coding agents tuned per build domain",
    category: "Internal Platform",
  },
  "alpha-matrix": {
    slug: "alpha-matrix",
    label: "Alpha Matrix — Multi-Agent Stock Analysis",
    oneLine: "6 agents, daily pipeline, self-evolving soul files",
    category: "Internal Platform",
  },
  "query-dominance": {
    slug: "query-dominance",
    label: "Query Dominance Agent System",
    oneLine: "10 agents across 6 phases for SEO and GEO ownership",
    category: "Internal Platform",
  },

  // ── 3. Internal operational tools (canonical #14, #15, #20) ─
  "ai-email-digest": {
    slug: "ai-email-digest",
    label: "AI Email Digest System",
    oneLine: "Daily executive briefing — every important email summarized",
    category: "Internal Tool",
  },
  "hiring-pipeline-robin": {
    slug: "hiring-pipeline-robin",
    label: "Hiring Pipeline & AI Pre-Screener Robin",
    oneLine: "60-column tracker with Robin AI pre-screening",
    category: "Internal Tool",
  },
  "contact-form-crm-pipeline": {
    slug: "contact-form-crm-pipeline",
    label: "Contact Form → CRM → AI Pipeline",
    oneLine: "End-to-end automated lead pipeline, zero manual steps",
    category: "Internal Tool",
  },

  // ── 4. Pure capability offerings (canonical #10, #11, #12, #18, #19) ──
  "after-hours-call-triage": {
    slug: "after-hours-call-triage",
    label: "After-Hours Call Triage System",
    oneLine: "Every after-hours lead caught, classified, and routed",
    category: "Capability",
  },
  "ai-invoice-processing-platform": {
    slug: "ai-invoice-processing-platform",
    label: "AI Invoice Processing Platform",
    oneLine: "75% manual handling cut — proven at HG Oil, generalized",
    category: "Capability",
  },
  "ai-document-analysis": {
    slug: "ai-document-analysis",
    label: "AI Document Analysis & Data Extraction",
    oneLine: "Any document in, structured data out, systems updated",
    category: "Capability",
  },
  "custom-local-ai-models": {
    slug: "custom-local-ai-models",
    label: "Custom Local AI Models",
    oneLine: "AI on your hardware with zero data leaving the network",
    category: "Capability",
  },
  "ai-trend-behavioral-analysis": {
    slug: "ai-trend-behavioral-analysis",
    label: "AI Trend & Behavioral Analysis",
    oneLine: "Economic trends and behavioral patterns at scale",
    category: "Capability",
  },

  // ── 5. Proof of Concept (canonical #13) ─────────────────────
  "ai-fitness-wellness-agent": {
    slug: "ai-fitness-wellness-agent",
    label: "Custom AI Fitness & Wellness Agent",
    oneLine: "Personalized regimens from body comp + live research",
    category: "Proof of Concept",
  },
};

// ── Schema ───────────────────────────────────────────────────
function buildSchema(data: CaseStudyData) {
  const url = `https://preissersolutions.com/case-studies/${data.slug}`;
  const datePublished = data.datePublished ?? "2026-05-01";
  const dateModified = data.dateModified ?? datePublished;

  // Article schema with articleSection: "Case Study" (Schema.org has no
  // first-class CaseStudy type; Google AI Overviews + Perplexity treat
  // Article+articleSection as the conventional pattern).
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    url,
    headline: data.h1,
    description: data.metaDescription,
    articleSection: "Case Study",
    inLanguage: "en-US",
    datePublished,
    dateModified,
    author: { "@id": "https://preissersolutions.com/#organization" },
    publisher: { "@id": "https://preissersolutions.com/#organization" },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isPartOf: { "@id": "https://preissersolutions.com/#website" },
    about: {
      "@type": "Thing",
      name: data.industry,
    },
    keywords: data.techStack.join(", "),
  };
}

// ── Small SVG icons (inline — no extra deps) ─────────────────
const ArrowRight = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const Spark = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
  </svg>
);

// ── Hero ─────────────────────────────────────────────────────
function Hero({ data }: { data: CaseStudyData }) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative isolate overflow-hidden"
      style={{
        background: "var(--theme-section-switchable)",
        color: "var(--theme-text-primary)",
        transition: "background 300ms ease, color 300ms ease",
      }}
    >
      {/* Decorative gradient mesh — non-photographic, abstract */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-80"
      >
        <div className="absolute -top-40 -left-40 h-[640px] w-[640px] rounded-full bg-[#1590FF] opacity-[0.18] blur-[140px]" />
        <div className="absolute top-60 -right-40 h-[520px] w-[520px] rounded-full bg-[#80E9FF] opacity-[0.10] blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-[#00D4AA] opacity-[0.07] blur-[120px]" />
      </div>

      {/* Faint grid lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(var(--theme-text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--theme-text-primary) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      <div className="ps-container relative pt-40 pb-24 sm:pt-48 sm:pb-32 lg:pt-56 lg:pb-36">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Breadcrumb-style top nav */}
          <div
            className="mb-10 flex items-center gap-3 text-sm"
            style={{ color: "var(--theme-text-muted)" }}
          >
            <Link
              href="/case-studies"
              prefetch={false}
              className="transition-colors hover:opacity-100"
              style={{ color: "var(--theme-text-secondary)" }}
            >
              Case Studies
            </Link>
            <span style={{ color: "var(--theme-text-muted)" }}>/</span>
            <span style={{ color: "var(--theme-text-secondary)" }}>{data.clientNameDisplay}</span>
          </div>

          {/* Eyebrow chip */}
          <div
            className="mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] backdrop-blur"
            style={{
              border: "1px solid var(--theme-card-border)",
              background: "var(--theme-card-bg)",
              color: "var(--color-primary)",
            }}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: "var(--color-primary)" }} />
            {data.category}
          </div>

          {/* H1 */}
          <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.025em] sm:text-5xl md:text-6xl lg:text-7xl">
            {data.h1}
          </h1>

          {/* Subheadline */}
          <p
            className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed sm:text-xl"
            style={{ color: "var(--theme-text-secondary)" }}
          >
            {data.subheadline}
          </p>

          {/* Headline result chips */}
          {data.headlineResults.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-3">
              {data.headlineResults.map((r) => (
                <div
                  key={r.label}
                  className="group relative overflow-hidden rounded-2xl px-5 py-3 backdrop-blur transition-all hover:border-[#1590FF]/50"
                  style={{
                    border: "1px solid var(--theme-card-border)",
                    background: "var(--theme-card-bg)",
                  }}
                >
                  <div
                    className="text-2xl font-semibold tracking-tight sm:text-3xl"
                    style={{ color: "var(--theme-text-primary)" }}
                  >
                    {r.value}
                  </div>
                  <div
                    className="mt-0.5 text-xs uppercase tracking-wider"
                    style={{ color: "var(--theme-text-muted)" }}
                  >
                    {r.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {data.statusNote && (
            <div className="mt-10 flex max-w-2xl items-start gap-3 rounded-xl border border-amber-400/20 bg-amber-400/[0.04] p-4 text-sm text-amber-200/80">
              <Spark className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
              <span>{data.statusNote}</span>
            </div>
          )}
        </motion.div>
      </div>

      {/* bottom edge — clean line, no curves */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "var(--theme-card-border)" }}
      />
    </section>
  );
}

// ── At-a-glance metrics row ──────────────────────────────────
function MetricsRow({ data }: { data: CaseStudyData }) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative border-b"
      style={{
        borderColor: "var(--theme-card-border)",
        background: "var(--theme-section-alt)",
        transition: "background 300ms ease, border-color 300ms ease",
      }}
    >
      <div className="ps-container py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {data.headlineResults.map((r, idx) => (
            <motion.div
              key={`${r.value}-${idx}`}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative"
            >
              {idx > 0 && (
                <div
                  aria-hidden="true"
                  className="absolute -left-5 top-2 hidden h-12 w-px lg:block"
                  style={{ background: "var(--theme-card-border)" }}
                />
              )}
              <div
                className="text-xs font-medium uppercase tracking-[0.14em]"
                style={{ color: "var(--theme-text-muted)" }}
              >
                {String(idx + 1).padStart(2, "0")}
              </div>
              <div
                className="mt-3 bg-clip-text text-5xl font-semibold leading-none tracking-[-0.03em] text-transparent sm:text-6xl"
                style={{ backgroundImage: "linear-gradient(135deg, var(--theme-text-primary), #1590FF)" }}
              >
                {r.value}
              </div>
              <div
                className="mt-4 text-sm leading-snug"
                style={{ color: "var(--theme-text-secondary)" }}
              >
                {r.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── What existed before ──────────────────────────────────────
function BeforeSection({ data }: { data: CaseStudyData }) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative py-20 sm:py-28"
      style={{
        background: "var(--theme-section-alt)",
        transition: "background 300ms ease",
      }}
    >
      <div className="ps-container">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em]"
                style={{
                  border: "1px solid var(--theme-card-border)",
                  background: "var(--theme-result-card-bg)",
                  color: "var(--theme-text-secondary)",
                }}
              >
                <span className="inline-block h-1 w-1 rounded-full" style={{ background: "var(--color-primary)" }} />
                Before
              </div>
              <h2
                className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] sm:text-4xl"
                style={{ color: "var(--theme-text-primary)" }}
              >
                {data.before.heading}
              </h2>
            </motion.div>
          </div>
          <div className="lg:col-span-8">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              {data.before.body.map((para, idx) => (
                <p
                  key={idx}
                  className="text-pretty text-lg leading-relaxed"
                  style={{ color: "var(--theme-text-primary)" }}
                >
                  {para}
                </p>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── What we built ────────────────────────────────────────────
function BuiltSection({ data }: { data: CaseStudyData }) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative isolate overflow-hidden py-24 sm:py-32"
      style={{
        background: "var(--theme-section-switchable)",
        color: "var(--theme-text-primary)",
        transition: "background 300ms ease, color 300ms ease",
      }}
    >
      {/* Accent corner glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 h-[480px] w-[480px] rounded-full bg-[#1590FF] opacity-[0.12] blur-[120px]"
      />
      <div className="ps-container relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em]"
                style={{
                  border: "1px solid var(--theme-card-border)",
                  background: "var(--theme-card-bg)",
                  color: "var(--color-primary)",
                }}
              >
                <span className="inline-block h-1 w-1 rounded-full" style={{ background: "var(--color-primary)" }} />
                What we built
              </div>
              <h2 className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] sm:text-4xl">
                {data.built.heading}
              </h2>
            </motion.div>
          </div>
          <div className="lg:col-span-8">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              {data.built.body.map((para, idx) => (
                <p
                  key={idx}
                  className="text-pretty text-lg leading-relaxed"
                  style={{ color: "var(--theme-text-secondary)" }}
                >
                  {para}
                </p>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Specifications ───────────────────────────────────────────
function SpecsSection({ data }: { data: CaseStudyData }) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative py-24 sm:py-32"
      style={{
        background: "var(--theme-section-switchable)",
        transition: "background 300ms ease",
      }}
    >
      <div className="ps-container">
        <div className="mb-14 max-w-3xl">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em]"
              style={{
                border: "1px solid var(--theme-card-border)",
                background: "var(--theme-card-bg)",
                color: "var(--theme-text-secondary)",
              }}
            >
              <span className="inline-block h-1 w-1 rounded-full" style={{ background: "var(--color-primary)" }} />
              Specifications
            </div>
            <h2
              className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] sm:text-4xl"
              style={{ color: "var(--theme-text-primary)" }}
            >
              {data.specifications.heading}
            </h2>
          </motion.div>
        </div>

        {/* Top-level capability bullets — 2 col grid */}
        {data.specifications.bullets.length > 0 && (
          <div className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {data.specifications.bullets.map((b, idx) => (
              <motion.div
                key={idx}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: Math.min(idx * 0.04, 0.3) }}
                className="flex items-start gap-3 border-b py-4 last:border-b-0"
                style={{ borderColor: "var(--theme-card-border)" }}
              >
                <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--color-primary)" }} />
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "var(--theme-text-primary)" }}
                >
                  {b}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Subsections — appear below as titled blocks */}
        {data.specifications.subsections &&
          data.specifications.subsections.length > 0 && (
            <div className="mt-16 grid gap-10 lg:grid-cols-2">
              {data.specifications.subsections.map((sub, idx) => (
                <motion.div
                  key={sub.title}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                  className="group relative rounded-2xl p-8 transition-all hover:border-[#1590FF]/40 hover:shadow-[0_12px_40px_rgba(21,144,255,0.08)]"
                  style={{
                    border: "1px solid var(--theme-card-border)",
                    background: "var(--theme-section-alt)",
                  }}
                >
                  <h3
                    className="text-lg font-semibold tracking-tight"
                    style={{ color: "var(--theme-text-primary)" }}
                  >
                    {sub.title}
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {sub.items.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-[15px] leading-relaxed"
                        style={{ color: "var(--theme-text-secondary)" }}
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full" style={{ background: "var(--theme-text-muted)" }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          )}
      </div>
    </section>
  );
}

// ── Results ──────────────────────────────────────────────────
function ResultsSection({ data }: { data: CaseStudyData }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  // GSAP scroll-trigger reveal — staggered cards.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const cards = section.querySelectorAll<HTMLElement>(
      "[data-result-card]"
    );
    if (prefersReduced) {
      gsap.set(cards, { opacity: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden py-24 sm:py-32"
      style={{
        background: "var(--theme-section-switchable)",
        color: "var(--theme-text-primary)",
        transition: "background 300ms ease, color 300ms ease",
      }}
    >
      {/* Gradient corner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/3 h-[480px] w-[480px] rounded-full bg-[#1590FF] opacity-[0.10] blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-[#00D4AA] opacity-[0.06] blur-[120px]"
      />

      <div className="ps-container relative">
        <div className="mb-16 max-w-3xl">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em]"
            style={{
              border: "1px solid var(--theme-card-border)",
              background: "var(--theme-card-bg)",
              color: "var(--color-primary)",
            }}
          >
            <span className="inline-block h-1 w-1 rounded-full" style={{ background: "var(--color-primary)" }} />
            Results
          </div>
          <h2 className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] sm:text-5xl">
            Outcomes the engagement actually produced.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {data.results.map((r, idx) => (
            <div
              key={`${r.value}-${idx}`}
              data-result-card
              className="group relative overflow-hidden rounded-2xl p-8 backdrop-blur-sm transition-all hover:border-[#1590FF]/40 sm:p-10"
              style={{
                border: "1px solid var(--theme-card-border)",
                background: "var(--theme-result-card-bg)",
              }}
            >
              {/* corner accent */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#1590FF]/10 blur-2xl transition-opacity group-hover:opacity-100"
              />
              <div className="relative">
                <div
                  className="text-xs font-medium uppercase tracking-[0.14em]"
                  style={{ color: "var(--theme-text-muted)" }}
                >
                  Result {String(idx + 1).padStart(2, "0")}
                </div>
                <div
                  className="mt-4 flex items-baseline gap-2 bg-clip-text text-6xl font-semibold leading-none tracking-[-0.03em] text-transparent sm:text-7xl"
                  style={{ backgroundImage: "linear-gradient(135deg, var(--theme-text-primary), #80E9FF)" }}
                >
                  {r.value}
                </div>
                <div
                  className="mt-5 text-base font-medium"
                  style={{ color: "var(--theme-text-primary)" }}
                >
                  {r.label}
                </div>
                <p
                  className="mt-3 text-[15px] leading-relaxed"
                  style={{ color: "var(--theme-text-secondary)" }}
                >
                  {r.context}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Tech stack chips ─────────────────────────────────────────
function TechStackSection({ data }: { data: CaseStudyData }) {
  if (data.techStack.length === 0) return null;

  return (
    <section
      className="border-y py-14"
      style={{
        borderColor: "var(--theme-card-border)",
        background: "var(--theme-section-switchable)",
        transition: "background 300ms ease, border-color 300ms ease",
      }}
    >
      <div className="ps-container">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div
            className="text-xs font-medium uppercase tracking-[0.14em]"
            style={{ color: "var(--theme-text-muted)" }}
          >
            Tech stack
          </div>
          <div className="flex flex-wrap gap-2.5">
            {data.techStack.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors hover:border-[#1590FF]/40 hover:[color:var(--theme-accent-text)]"
                style={{
                  border: "1px solid var(--theme-card-border)",
                  background: "var(--theme-section-alt)",
                  color: "var(--theme-text-primary)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Related case studies ─────────────────────────────────────
function RelatedSection({ data }: { data: CaseStudyData }) {
  const related = data.relatedSlugs
    .map((s) => RELATED_CARD_INDEX[s])
    .filter(Boolean);

  if (related.length === 0) return null;

  return (
    <section
      className="py-24 sm:py-28"
      style={{
        background: "var(--theme-section-alt)",
        transition: "background 300ms ease",
      }}
    >
      <div className="ps-container">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em]"
              style={{
                border: "1px solid var(--theme-card-border)",
                background: "var(--theme-result-card-bg)",
                color: "var(--theme-text-secondary)",
              }}
            >
              <span className="inline-block h-1 w-1 rounded-full" style={{ background: "var(--color-primary)" }} />
              More work
            </div>
            <h2
              className="mt-4 text-balance text-3xl font-semibold tracking-[-0.02em] sm:text-4xl"
              style={{ color: "var(--theme-text-primary)" }}
            >
              Related case studies
            </h2>
          </div>
          <Link
            href="/case-studies"
            prefetch={false}
            className="group inline-flex items-center gap-2 text-sm font-medium [color:var(--theme-accent-text)] hover:[color:var(--theme-accent-text)]"
          >
            All case studies
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {related.map((r) => (
            <Link
              key={r.slug}
              href={`/case-studies/${r.slug}`}
              prefetch={false}
              className="group relative flex flex-col overflow-hidden rounded-2xl p-7 transition-all hover:-translate-y-1 hover:border-[#1590FF]/40 hover:shadow-[0_24px_60px_-20px_rgba(21,144,255,0.18)]"
              style={{
                border: "1px solid var(--theme-card-border)",
                background: "var(--theme-result-card-bg)",
              }}
            >
              <div
                className="text-[11px] font-medium uppercase tracking-[0.14em]"
                style={{ color: "var(--theme-text-muted)" }}
              >
                {r.category}
              </div>
              <h3
                className="mt-3 text-lg font-semibold leading-snug"
                style={{ color: "var(--theme-text-primary)" }}
              >
                {r.label}
              </h3>
              <p
                className="mt-3 flex-1 text-[15px] leading-relaxed"
                style={{ color: "var(--theme-text-secondary)" }}
              >
                {r.oneLine}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium [color:var(--theme-accent-text)]">
                Read case study
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA ──────────────────────────────────────────────────────
function CtaSection({ data }: { data: CaseStudyData }) {
  return (
    <section
      className="relative isolate overflow-hidden py-24 sm:py-32"
      style={{
        background: "var(--theme-section-switchable)",
        color: "var(--theme-text-primary)",
        transition: "background 300ms ease, color 300ms ease",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1590FF] opacity-[0.10] blur-[140px]" />
      </div>

      <div className="ps-container relative text-center">
        <h2 className="mx-auto max-w-3xl text-balance text-4xl font-semibold leading-[1.1] tracking-[-0.025em] sm:text-5xl md:text-6xl">
          {data.cta.heading}
        </h2>
        <p
          className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed"
          style={{ color: "var(--theme-text-secondary)" }}
        >
          {data.cta.subcopy}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={data.cta.buttonHref}
            prefetch={false}
            className="group inline-flex items-center gap-2 rounded-xl bg-[#1590FF] px-7 py-3.5 text-base font-medium text-white shadow-[0_8px_30px_rgba(21,144,255,0.35)] transition-all hover:bg-[#0D76D6] hover:shadow-[0_12px_40px_rgba(21,144,255,0.45)]"
          >
            {data.cta.buttonLabel}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/case-studies"
            prefetch={false}
            className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-base font-medium transition-all"
            style={{
              border: "1px solid var(--theme-card-border)",
              color: "var(--theme-text-primary)",
            }}
          >
            See all case studies
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Top-level ────────────────────────────────────────────────
export function CaseStudyPage({ data }: { data: CaseStudyData }) {
  const schema = buildSchema(data);
  // Case-study detail pages were the last class on the site without a
  // breadcrumb trail. buildBreadcrumbs prepends Home at position 1.
  const breadcrumbSchema = buildBreadcrumbs([
    { name: "Case Studies", url: "https://preissersolutions.com/case-studies" },
    {
      name: data.clientNameDisplay || data.h1,
      url: `https://preissersolutions.com/case-studies/${data.slug}`,
    },
  ]);

  return (
    <article>
      <JsonLd data={[schema, breadcrumbSchema]} />
      <Hero data={data} />
      <MetricsRow data={data} />
      <BeforeSection data={data} />
      <BuiltSection data={data} />
      <SpecsSection data={data} />
      <ResultsSection data={data} />
      <TechStackSection data={data} />
      <RelatedSection data={data} />
      <CtaSection data={data} />
    </article>
  );
}
