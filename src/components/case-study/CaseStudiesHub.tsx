"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { JsonLd } from "@/components/seo/JsonLd";
import type { CaseStudyData } from "@/types/case-study";

interface Props {
  caseStudies: CaseStudyData[];
}

/**
 * Case Studies hub page renderer.
 *
 * Stripe/Linear-tier card grid for the full set of publishable case studies.
 * No fake stock photography — every card is built from typography, color,
 * and the project's actual headline metric.
 *
 * Filter chips drawn from the union of case-study categories. "All" is the
 * default and renders every card in source order (= hub display order).
 */
export function CaseStudiesHub({ caseStudies }: Props) {
  const reduceMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<string>("All");

  // Build the filter chip set from the data. Top-level filter labels are
  // derived from the FIRST token of each `category` field (the high-level
  // capability), e.g. "AI Automation • Revenue Recovery" → "AI Automation".
  //
  // Filter order: "All" first, then a deterministic ranked order so the chips
  // read cleanly even as new case studies arrive. The "Other" bucket at the
  // bottom is forward-compatible — any first-token we haven't ranked falls in
  // alphabetically after the known set.
  const filters = useMemo(() => {
    const RANK: Record<string, number> = {
      "Named Engagement": 0,
      "Internal Platform": 10,
      "Internal Tool": 20,
      Capability: 30,
      "Proof of Concept": 40,
    };
    const set = new Set<string>();
    caseStudies.forEach((cs) => {
      const head = cs.category.split("•")[0].trim();
      set.add(head);
    });
    const ordered = Array.from(set).sort((a, b) => {
      const ra = RANK[a] ?? 100 + a.charCodeAt(0);
      const rb = RANK[b] ?? 100 + b.charCodeAt(0);
      if (ra !== rb) return ra - rb;
      return a.localeCompare(b);
    });
    return ["All", ...ordered];
  }, [caseStudies]);

  const visible = useMemo(() => {
    if (activeFilter === "All") return caseStudies;
    return caseStudies.filter(
      (cs) => cs.category.split("•")[0].trim() === activeFilter
    );
  }, [caseStudies, activeFilter]);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://preissersolutions.com/case-studies#collection",
    url: "https://preissersolutions.com/case-studies",
    name: "Case Studies — Preisser Solutions",
    description:
      "Real engagements, real outcomes. Preisser Solutions case studies span HVAC, oil and gas, insurance, transportation, media, and AI commerce.",
    inLanguage: "en-US",
    isPartOf: { "@id": "https://preissersolutions.com/#website" },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: caseStudies.length,
      itemListElement: caseStudies.map((cs, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `https://preissersolutions.com/case-studies/${cs.slug}`,
        name: cs.h1,
      })),
    },
  };

  return (
    <div>
      <JsonLd data={collectionSchema} />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#0A1628] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-80"
        >
          <div className="absolute -top-40 -left-40 h-[640px] w-[640px] rounded-full bg-[#0D95E8] opacity-[0.18] blur-[140px]" />
          <div className="absolute top-60 -right-40 h-[520px] w-[520px] rounded-full bg-[#80E9FF] opacity-[0.10] blur-[120px]" />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />

        <div className="ps-container relative pt-32 pb-20 sm:pt-40 sm:pb-28">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-[#80E9FF]">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#80E9FF]" />
              Case Studies
            </div>
            <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.025em] sm:text-6xl md:text-7xl">
              Real Work, Real Outcomes.
            </h1>
            <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-white/70 sm:text-xl">
              Every Preisser Solutions case study is a real engagement with a
              measurable result. Named where the client has consented;
              anonymized where the relationship requires it.
            </p>

            {/* Top-level stats strip */}
            <div className="mt-14 flex flex-wrap gap-x-12 gap-y-6">
              <div>
                <div className="bg-gradient-to-br from-white to-[#80E9FF] bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl">
                  {caseStudies.length}
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.14em] text-white/50">
                  Published case studies
                </div>
              </div>
              <div className="h-12 w-px bg-white/10 self-end" />
              <div>
                <div className="bg-gradient-to-br from-white to-[#80E9FF] bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl">
                  {filters.length - 1}
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.14em] text-white/50">
                  Capability categories
                </div>
              </div>
              <div className="h-12 w-px bg-white/10 self-end" />
              <div>
                <div className="bg-gradient-to-br from-white to-[#80E9FF] bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl">
                  100%
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.14em] text-white/50">
                  Outcomes from real builds
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Filters + Grid ──────────────────────────────────── */}
      <section className="relative bg-[#F6F9FC] pb-32 pt-16">
        <div className="ps-container">
          {/* Filter chips */}
          <div className="mb-10 flex flex-wrap items-center gap-2">
            {filters.map((f) => {
              const active = f === activeFilter;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActiveFilter(f)}
                  className={
                    "inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-all " +
                    (active
                      ? "border-[#0A1628] bg-[#0A1628] text-white shadow-[0_8px_30px_rgba(10,22,40,0.18)]"
                      : "border-[#E2E8F0] bg-white text-[#475569] hover:border-[#0D95E8]/40 hover:text-[#0A1628]")
                  }
                >
                  {f}
                </button>
              );
            })}
          </div>

          {/* Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((cs, idx) => (
              <HubCard key={cs.slug} cs={cs} index={idx} reduceMotion={!!reduceMotion} />
            ))}
          </div>

          {visible.length === 0 && (
            <div className="mx-auto max-w-md py-16 text-center text-[#475569]">
              No case studies match this filter yet.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// ── Card ─────────────────────────────────────────────────────
function HubCard({
  cs,
  index,
  reduceMotion,
}: {
  cs: CaseStudyData;
  index: number;
  reduceMotion: boolean;
}) {
  const primary = cs.headlineResults[0];

  // Subtle accent variation by index — keeps the grid visually rhythmic.
  const accent =
    index % 3 === 0
      ? "from-[#0D95E8]/15 to-[#0D95E8]/0"
      : index % 3 === 1
      ? "from-[#80E9FF]/12 to-[#80E9FF]/0"
      : "from-[#00D4AA]/10 to-[#00D4AA]/0";

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: Math.min(index * 0.06, 0.4),
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        href={`/case-studies/${cs.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#0D95E8]/40 hover:shadow-[0_24px_60px_-20px_rgba(13,149,232,0.18)]"
      >
        {/* Accent corner block — abstract, no photography */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${accent} blur-2xl`}
        />

        {/* Category eyebrow */}
        <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#94A3B8]">
          {cs.category}
        </div>

        {/* Big primary number */}
        {primary && (
          <div className="mt-5">
            <div className="bg-gradient-to-br from-[#0A1628] to-[#0D95E8] bg-clip-text text-4xl font-semibold leading-none tracking-[-0.03em] text-transparent sm:text-5xl">
              {primary.value}
            </div>
            <div className="mt-2 text-xs uppercase tracking-[0.14em] text-[#475569]">
              {primary.label}
            </div>
          </div>
        )}

        {/* Title */}
        <h3 className="mt-7 text-balance text-xl font-semibold leading-snug text-[#0A1628]">
          {cs.clientNameDisplay}
        </h3>

        {/* One-line context */}
        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[#475569]">
          {cs.oneLine}
        </p>

        {/* Footer */}
        <div className="mt-7 flex items-center justify-between border-t border-[#E2E8F0] pt-5">
          <span className="text-sm font-medium text-[#0D95E8] group-hover:text-[#0B7BC0]">
            Read case study
          </span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-[#0D95E8] transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      </Link>
    </motion.div>
  );
}
