"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { JsonLd } from "@/components/seo/JsonLd";
import { AgentCard } from "@/components/agents/AgentCard";
import type { AgentData } from "@/types/agent";

interface LinkedCaseStudy {
  slug: string;
  title: string;
  oneLine?: string;
  metric?: string;
}

interface AgentDetailPageProps {
  agent: AgentData;
  relatedAgents: AgentData[];
  linkedCaseStudy?: LinkedCaseStudy | null;
}

const STATUS_LABELS: Record<string, string> = {
  "proof-of-concept": "Proof of concept",
  deployable: "Deployable",
};

export function AgentDetailPage({
  agent,
  relatedAgents,
  linkedCaseStudy,
}: AgentDetailPageProps) {
  const reduceMotion = useReducedMotion();
  const capabilitiesRef = useRef<HTMLDivElement>(null);
  const ioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion) return;
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      if (capabilitiesRef.current) {
        const cards = capabilitiesRef.current.querySelectorAll<HTMLElement>(".cap-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.07,
            ease: "power2.out",
            scrollTrigger: {
              trigger: capabilitiesRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }

      if (ioRef.current) {
        gsap.fromTo(
          ioRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ioRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [reduceMotion]);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://preissersolutions.com/agents/${agent.slug}#service`,
    name: agent.name,
    serviceType: agent.category,
    description: agent.metaDescription,
    url: `https://preissersolutions.com/agents/${agent.slug}`,
    category: agent.category,
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    provider: {
      "@type": "Organization",
      "@id": "https://preissersolutions.com/#organization",
      name: "Preisser Solutions",
      url: "https://preissersolutions.com",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Agents",
        item: "https://preissersolutions.com/agents",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: agent.category,
        item: `https://preissersolutions.com/agents?category=${encodeURIComponent(agent.category)}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: agent.name,
        item: `https://preissersolutions.com/agents/${agent.slug}`,
      },
    ],
  };

  return (
    <article>
      <JsonLd data={[serviceSchema, breadcrumbSchema]} />

      {/* ── 1. Breadcrumb + Hero ────────────────────────── */}
      <section
        className="relative isolate overflow-hidden"
        style={{ background: "var(--theme-bg-primary)" }}
      >
        {/* Ambient blob */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute -top-32 -left-32 h-[560px] w-[560px] rounded-full blur-[130px]"
            style={{ background: "#0D95E8", opacity: 0.13 }}
          />
          <div
            className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full blur-[110px]"
            style={{ background: "#00D4AA", opacity: 0.07 }}
          />
        </div>

        <div className="ps-container relative pt-40 pb-24 sm:pt-48 sm:pb-28 lg:pt-52 lg:pb-32">
          {/* Breadcrumb */}
          <nav
            className="mb-10 flex items-center gap-2 text-xs"
            aria-label="Breadcrumb"
            style={{ color: "var(--theme-text-muted)" }}
          >
            <Link
              href="/agents"
              className="transition-colors duration-150 hover:underline"
              style={{ color: "var(--theme-text-muted)" }}
            >
              Agents
            </Link>
            <span aria-hidden="true">/</span>
            <span style={{ color: "var(--theme-text-muted)" }}>{agent.category}</span>
            <span aria-hidden="true">/</span>
            <span style={{ color: "var(--theme-text-primary)" }}>{agent.name}</span>
          </nav>

          {/* Eyebrow row */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span
              className="inline-flex items-center rounded-full border px-3.5 py-1 text-xs font-medium uppercase tracking-[0.13em]"
              style={{
                borderColor: "rgba(128,233,255,0.18)",
                background: "rgba(128,233,255,0.06)",
                color: "#80E9FF",
              }}
            >
              {agent.category}
            </span>
            {agent.status !== "production" && (
              <span
                className="inline-flex items-center rounded-full border px-3.5 py-1 text-xs font-medium tracking-wide"
                style={{
                  borderColor: "var(--theme-border)",
                  background: "var(--theme-bg-card)",
                  color: "var(--theme-text-muted)",
                }}
              >
                {STATUS_LABELS[agent.status] ?? agent.status}
              </span>
            )}
          </div>

          {/* H1 */}
          <h1
            className="max-w-4xl text-balance text-4xl font-semibold leading-[1.1] tracking-[-0.025em] sm:text-5xl md:text-6xl"
            style={{ color: "var(--theme-text-primary)" }}
          >
            {agent.h1}
          </h1>

          {/* Subheadline */}
          <p
            className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed sm:text-xl"
            style={{ color: "var(--theme-text-secondary)" }}
          >
            {agent.subheadline}
          </p>

          {/* CTA row */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={agent.cta.buttonHref}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #0D95E8 0%, #0B7BC0 100%)",
                color: "#ffffff",
                boxShadow: "0 8px 24px rgba(13,149,232,0.28)",
              }}
            >
              Scope this for my business
              <svg
                viewBox="0 0 16 16"
                fill="none"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  d="M1 8h14M9 2l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            {linkedCaseStudy && (
              <Link
                href={`/case-studies/${linkedCaseStudy.slug}`}
                className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-all duration-150 hover:opacity-80"
                style={{
                  borderColor: "var(--theme-border)",
                  background: "var(--theme-bg-card)",
                  color: "var(--theme-text-primary)",
                }}
              >
                See the case study
              </Link>
            )}
          </div>

          {/* Status disclosure */}
          {agent.statusNote && (
            <div
              className="mt-8 max-w-2xl rounded-xl border p-4 text-sm leading-relaxed"
              style={{
                borderColor: "rgba(128,233,255,0.14)",
                background: "rgba(128,233,255,0.04)",
                color: "var(--theme-text-secondary)",
              }}
              role="note"
            >
              {agent.statusNote}
            </div>
          )}
        </div>
      </section>

      {/* ── 2. What it does ────────────────────────────── */}
      <section
        className="py-20 md:py-24"
        style={{ background: "var(--theme-section-alt)" }}
      >
        <div className="ps-container">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-start">
            {/* Left: body paragraphs */}
            <div>
              <h2
                className="mb-8 text-2xl font-semibold tracking-tight sm:text-3xl"
                style={{ color: "var(--theme-text-primary)" }}
              >
                What it does
              </h2>
              <div className="space-y-5">
                {agent.whatItDoes.map((para, i) => (
                  <p
                    key={i}
                    className="text-base leading-relaxed sm:text-[17px]"
                    style={{ color: "var(--theme-text-secondary)" }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Right: headline metric (if present) */}
            {agent.headlineMetric && (
              <div
                className="rounded-2xl border p-10 text-center"
                style={{
                  background: "var(--theme-card-bg)",
                  borderColor: "var(--theme-card-border)",
                }}
              >
                <div
                  className="bg-clip-text text-6xl font-semibold leading-none tracking-[-0.04em] text-transparent sm:text-7xl"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #0D95E8 0%, #80E9FF 100%)",
                  }}
                >
                  {agent.headlineMetric.value}
                </div>
                <div
                  className="mt-4 text-sm uppercase tracking-[0.15em]"
                  style={{ color: "var(--theme-text-muted)" }}
                >
                  {agent.headlineMetric.label}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 3. Capabilities grid ───────────────────────── */}
      <section
        className="py-20 md:py-24"
        style={{ background: "var(--theme-bg-primary)" }}
      >
        <div className="ps-container">
          <h2
            className="mb-12 text-2xl font-semibold tracking-tight sm:text-3xl"
            style={{ color: "var(--theme-text-primary)" }}
          >
            Capabilities
          </h2>
          <div
            ref={capabilitiesRef}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {agent.capabilities.map((cap, i) => (
              <div
                key={i}
                className="cap-card rounded-2xl border p-7"
                style={{
                  background: "var(--theme-card-bg)",
                  borderColor: "var(--theme-card-border)",
                }}
              >
                <div
                  className="mb-1 h-1 w-8 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #0D95E8, #80E9FF)",
                  }}
                  aria-hidden="true"
                />
                <h3
                  className="mt-4 text-base font-semibold leading-snug"
                  style={{ color: "var(--theme-text-primary)" }}
                >
                  {cap.title}
                </h3>
                <p
                  className="mt-2.5 text-[15px] leading-relaxed"
                  style={{ color: "var(--theme-text-secondary)" }}
                >
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. How it works (numbered timeline) ────────── */}
      <section
        className="py-20 md:py-24"
        style={{ background: "var(--theme-section-alt)" }}
      >
        <div className="ps-container">
          <h2
            className="mb-12 text-2xl font-semibold tracking-tight sm:text-3xl"
            style={{ color: "var(--theme-text-primary)" }}
          >
            How it works
          </h2>
          <ol className="relative space-y-0" aria-label="Process steps">
            {agent.howItWorks.map((step, i) => (
              <li
                key={i}
                className="relative flex gap-8 pb-10 last:pb-0"
              >
                {/* Vertical connector line */}
                {i < agent.howItWorks.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="absolute left-5 top-10 bottom-0 w-px"
                    style={{ background: "var(--theme-border)" }}
                  />
                )}
                {/* Step number circle */}
                <div
                  className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-semibold"
                  style={{
                    background: "linear-gradient(135deg, #0D95E8 0%, #0B7BC0 100%)",
                    borderColor: "transparent",
                    color: "#ffffff",
                    boxShadow: "0 4px 12px rgba(13,149,232,0.3)",
                  }}
                  aria-hidden="true"
                >
                  {i + 1}
                </div>
                {/* Content */}
                <div className="pt-1.5">
                  <h3
                    className="text-base font-semibold leading-snug"
                    style={{ color: "var(--theme-text-primary)" }}
                  >
                    {step.step}
                  </h3>
                  <p
                    className="mt-2 text-[15px] leading-relaxed"
                    style={{ color: "var(--theme-text-secondary)" }}
                  >
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 5. Inputs / Outputs ────────────────────────── */}
      <section
        className="py-20 md:py-24"
        style={{ background: "var(--theme-bg-primary)" }}
      >
        <div className="ps-container">
          <div ref={ioRef}>
            <h2
              className="mb-12 text-2xl font-semibold tracking-tight sm:text-3xl"
              style={{ color: "var(--theme-text-primary)" }}
            >
              Inputs &amp; Outputs
            </h2>
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
              {/* Inputs */}
              <div>
                <h3
                  className="mb-6 text-xs font-semibold uppercase tracking-[0.16em]"
                  style={{ color: "#0D95E8" }}
                >
                  What it takes in
                </h3>
                <ul className="space-y-4">
                  {agent.inputs.map((input, i) => (
                    <li
                      key={i}
                      className="flex items-start justify-between gap-4 rounded-xl border p-4"
                      style={{
                        background: "var(--theme-card-bg)",
                        borderColor: "var(--theme-card-border)",
                      }}
                    >
                      <span
                        className="text-sm leading-snug"
                        style={{ color: "var(--theme-text-primary)" }}
                      >
                        {input.label}
                      </span>
                      {input.format && (
                        <span
                          className="shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-medium"
                          style={{
                            borderColor: "var(--theme-card-border)",
                            color: "var(--theme-text-muted)",
                            background: "var(--theme-bg-card)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {input.format}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Outputs */}
              <div>
                <h3
                  className="mb-6 text-xs font-semibold uppercase tracking-[0.16em]"
                  style={{ color: "#00D4AA" }}
                >
                  What it sends out
                </h3>
                <ul className="space-y-4">
                  {agent.outputs.map((output, i) => (
                    <li
                      key={i}
                      className="flex items-start justify-between gap-4 rounded-xl border p-4"
                      style={{
                        background: "var(--theme-card-bg)",
                        borderColor: "var(--theme-card-border)",
                      }}
                    >
                      <span
                        className="text-sm leading-snug"
                        style={{ color: "var(--theme-text-primary)" }}
                      >
                        {output.label}
                      </span>
                      {output.format && (
                        <span
                          className="shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-medium"
                          style={{
                            borderColor: "var(--theme-card-border)",
                            color: "var(--theme-text-muted)",
                            background: "var(--theme-bg-card)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {output.format}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Use cases ───────────────────────────────── */}
      <section
        className="py-20 md:py-24"
        style={{ background: "var(--theme-section-alt)" }}
      >
        <div className="ps-container">
          <h2
            className="mb-10 text-2xl font-semibold tracking-tight sm:text-3xl"
            style={{ color: "var(--theme-text-primary)" }}
          >
            When to use this agent
          </h2>
          <ul className="space-y-4 max-w-3xl">
            {agent.useCases.map((uc, i) => (
              <li key={i} className="flex gap-4">
                <span
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                  style={{ background: "#0D95E8" }}
                  aria-hidden="true"
                />
                <p
                  className="text-[15px] leading-relaxed sm:text-base"
                  style={{ color: "var(--theme-text-secondary)" }}
                >
                  {uc}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 7. Tech stack ──────────────────────────────── */}
      <section
        className="py-20 md:py-24"
        style={{ background: "var(--theme-bg-primary)" }}
      >
        <div className="ps-container">
          <h2
            className="mb-8 text-2xl font-semibold tracking-tight sm:text-3xl"
            style={{ color: "var(--theme-text-primary)" }}
          >
            Built on
          </h2>
          <div className="flex flex-wrap gap-3">
            {agent.techStack.map((tech, i) => (
              <span
                key={i}
                className="rounded-full border px-4 py-2 text-sm font-medium"
                style={{
                  borderColor: "var(--theme-card-border)",
                  background: "var(--theme-card-bg)",
                  color: "var(--theme-text-secondary)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Linked case study (conditional) ─────────── */}
      {linkedCaseStudy && (
        <section
          className="py-20 md:py-24"
          style={{ background: "var(--theme-section-alt)" }}
        >
          <div className="ps-container">
            <h2
              className="mb-8 text-2xl font-semibold tracking-tight sm:text-3xl"
              style={{ color: "var(--theme-text-primary)" }}
            >
              See it in production
            </h2>
            <Link
              href={`/case-studies/${linkedCaseStudy.slug}`}
              className="group relative flex max-w-2xl overflow-hidden rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "var(--theme-card-bg)",
                borderColor: "var(--theme-card-border)",
              }}
            >
              {/* Accent orb */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full blur-2xl"
                style={{ background: "#0D95E8", opacity: 0.1 }}
              />

              <div className="relative">
                {linkedCaseStudy.metric && (
                  <div
                    className="mb-4 bg-clip-text text-4xl font-semibold tracking-tight text-transparent"
                    style={{
                      backgroundImage: "linear-gradient(135deg, #0D95E8 0%, #80E9FF 100%)",
                    }}
                  >
                    {linkedCaseStudy.metric}
                  </div>
                )}
                <h3
                  className="text-xl font-semibold leading-snug"
                  style={{ color: "var(--theme-text-primary)" }}
                >
                  {linkedCaseStudy.title}
                </h3>
                {linkedCaseStudy.oneLine && (
                  <p
                    className="mt-3 text-[15px] leading-relaxed"
                    style={{ color: "var(--theme-text-secondary)" }}
                  >
                    {linkedCaseStudy.oneLine}
                  </p>
                )}
                <div className="mt-6 flex items-center gap-2">
                  <span className="text-sm font-medium" style={{ color: "#0D95E8" }}>
                    Read case study
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0D95E8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ── 9. Related agents ──────────────────────────── */}
      {relatedAgents.length > 0 && (
        <section
          className="py-20 md:py-24"
          style={{
            background: linkedCaseStudy
              ? "var(--theme-bg-primary)"
              : "var(--theme-section-alt)",
          }}
        >
          <div className="ps-container">
            <h2
              className="mb-10 text-2xl font-semibold tracking-tight sm:text-3xl"
              style={{ color: "var(--theme-text-primary)" }}
            >
              Related agents
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {relatedAgents.slice(0, 3).map((related, i) => (
                <AgentCard key={related.slug} agent={related} accentIndex={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 10. CTA section ────────────────────────────── */}
      <section
        className="relative isolate overflow-hidden py-24 md:py-32"
        style={{ background: "var(--theme-bg-primary)" }}
      >
        {/* Ambient glow */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
            style={{ background: "#0D95E8", opacity: 0.1 }}
          />
        </div>

        <div className="ps-container relative text-center">
          <h2
            className="mx-auto max-w-2xl text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] sm:text-4xl md:text-5xl"
            style={{ color: "var(--theme-text-primary)" }}
          >
            {agent.cta.heading}
          </h2>
          <p
            className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed"
            style={{ color: "var(--theme-text-secondary)" }}
          >
            {agent.cta.subcopy}
          </p>
          <div className="mt-10">
            <Link
              href={agent.cta.buttonHref}
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #0D95E8 0%, #0B7BC0 100%)",
                color: "#ffffff",
                boxShadow: "0 8px 32px rgba(13,149,232,0.32)",
              }}
            >
              {agent.cta.buttonLabel}
              <svg
                viewBox="0 0 16 16"
                fill="none"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  d="M1 8h14M9 2l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
