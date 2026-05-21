"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { JsonLd } from "@/components/seo/JsonLd";
import type {
  LocationPageData,
  LocationServiceIcon,
} from "@/types/location";

/**
 * Location page renderer.
 *
 * Stripe/Linear/Vercel-tier layout for every /locations/[city] page. Sections:
 *
 *   1. Geographic Hero (dark, abstract topographical backdrop, no Tyler photo)
 *   2. Nearby areas chip grid
 *   3. Service offering cards
 *   4. Process timeline (5 steps)
 *   5. Local case studies (CONDITIONAL)
 *   6. Why local matters (CONDITIONAL)
 *   7. Industries served chips (CONDITIONAL)
 *   8. FAQ accordion
 *   9. Related locations (CONDITIONAL)
 *   10. CTA section
 *
 * Reusable across every location. All content comes from `data` — no
 * hardcoded city strings, no fake stock photography, no founder copy.
 */

// ── Schema ───────────────────────────────────────────────────
function buildSchema(data: LocationPageData) {
  const url = `https://preissersolutions.com/locations/${data.slug}`;
  const datePublished = data.datePublished ?? "2026-05-20";
  const dateModified = data.dateModified ?? datePublished;

  const cityState = `${data.city}, ${data.state}`;

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: data.metaTitle,
    description: data.metaDescription,
    inLanguage: "en-US",
    datePublished,
    dateModified,
    isPartOf: { "@id": "https://preissersolutions.com/#website" },
    breadcrumb: { "@id": `${url}#breadcrumb` },
    about: { "@id": `${url}#localbusiness` },
    mainEntity: { "@id": `${url}#localbusiness` },
  };

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://preissersolutions.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Locations",
        item: "https://preissersolutions.com/locations",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: cityState,
        item: url,
      },
    ],
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${url}#localbusiness`,
    name: "Preisser Solutions",
    url,
    description: data.hero.answerParagraph,
    image: "https://preissersolutions.com/images/og-image-v2.jpg",
    telephone: "+1-620-352-3296",
    email: "sales@preissersolutions.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hays",
      addressRegion: "KS",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: cityState,
      ...(data.coordinates
        ? {
            geo: {
              "@type": "GeoCoordinates",
              latitude: data.coordinates.lat,
              longitude: data.coordinates.lng,
            },
          }
        : {}),
    },
    parentOrganization: {
      "@id": "https://preissersolutions.com/#organization",
    },
  };

  const schemas: Record<string, unknown>[] = [
    webPage,
    breadcrumbList,
    localBusiness,
  ];

  if (data.faq.length >= 5) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: data.faq.map((q) => ({
        "@type": "Question",
        name: q.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: q.answer,
        },
      })),
    });
  }

  return schemas;
}

// ── Icons (inline — no extra deps) ───────────────────────────
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

const MapPin = ({ className = "" }: { className?: string }) => (
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
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ChevronDown = ({ className = "" }: { className?: string }) => (
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
    <path d="m6 9 6 6 6-6" />
  </svg>
);

function ServiceIconSvg({
  type,
  className = "",
}: {
  type: LocationServiceIcon;
  className?: string;
}) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true as const,
  };

  switch (type) {
    case "dashboard":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="9" rx="1.5" />
          <rect x="14" y="3" width="7" height="5" rx="1.5" />
          <rect x="14" y="12" width="7" height="9" rx="1.5" />
          <rect x="3" y="16" width="7" height="5" rx="1.5" />
        </svg>
      );
    case "automation":
      return (
        <svg {...common}>
          <path d="M12 2v3" />
          <path d="M12 19v3" />
          <path d="M4.93 4.93l2.12 2.12" />
          <path d="M16.95 16.95l2.12 2.12" />
          <path d="M2 12h3" />
          <path d="M19 12h3" />
          <path d="M4.93 19.07l2.12-2.12" />
          <path d="M16.95 7.05l2.12-2.12" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      );
    case "website":
      return (
        <svg {...common}>
          <rect x="2.5" y="4" width="19" height="15" rx="2" />
          <path d="M2.5 9h19" />
          <circle cx="6" cy="6.5" r="0.5" fill="currentColor" />
          <circle cx="8" cy="6.5" r="0.5" fill="currentColor" />
          <circle cx="10" cy="6.5" r="0.5" fill="currentColor" />
        </svg>
      );
    case "ai-agent":
      return (
        <svg {...common}>
          <rect x="4" y="6" width="16" height="13" rx="2" />
          <path d="M9 2v4" />
          <path d="M15 2v4" />
          <circle cx="9" cy="12" r="1" fill="currentColor" />
          <circle cx="15" cy="12" r="1" fill="currentColor" />
          <path d="M9 16h6" />
        </svg>
      );
    case "integration":
      return (
        <svg {...common}>
          <circle cx="6" cy="6" r="3" />
          <circle cx="18" cy="18" r="3" />
          <path d="M9 6h6a3 3 0 0 1 3 3v6" />
          <path d="M15 18H9a3 3 0 0 1-3-3V9" />
        </svg>
      );
    case "seo":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
          <path d="M8 11h6" />
          <path d="M11 8v6" />
        </svg>
      );
    case "document":
      return (
        <svg {...common}>
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
          <path d="M14 3v5h5" />
          <path d="M9 13h6" />
          <path d="M9 17h6" />
        </svg>
      );
  }
}

// ── Hero ─────────────────────────────────────────────────────
function Hero({ data }: { data: LocationPageData }) {
  const reduceMotion = useReducedMotion();
  const cityState = `${data.city}, ${data.state}`;

  return (
    <section
      className="relative isolate overflow-hidden"
      style={{
        background: "var(--theme-section-switchable)",
        color: "var(--theme-text-primary)",
        transition: "background 300ms ease, color 300ms ease",
      }}
    >
      {/* Decorative gradient mesh */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-80"
      >
        <div className="absolute -top-40 -left-40 h-[640px] w-[640px] rounded-full bg-[#0D95E8] opacity-[0.18] blur-[140px]" />
        <div className="absolute top-60 -right-40 h-[520px] w-[520px] rounded-full bg-[#80E9FF] opacity-[0.10] blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-[#00D4AA] opacity-[0.07] blur-[120px]" />
      </div>

      {/* Topographical-feel concentric arcs — abstract, not a real map */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18]"
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0"
        >
          <defs>
            <radialGradient id="topo-fade" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="rgba(128, 233, 255, 0.65)" />
              <stop offset="100%" stopColor="rgba(128, 233, 255, 0)" />
            </radialGradient>
            <mask id="topo-mask">
              <rect width="1200" height="800" fill="url(#topo-fade)" />
            </mask>
          </defs>
          <g
            mask="url(#topo-mask)"
            stroke="rgba(128, 233, 255, 0.55)"
            strokeWidth="1"
            fill="none"
          >
            {Array.from({ length: 14 }, (_, i) => {
              const r = 60 + i * 60;
              return (
                <circle key={i} cx="900" cy="380" r={r} />
              );
            })}
          </g>
        </svg>
      </div>

      {/* Faint grid lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(var(--theme-text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--theme-text-primary) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      <div className="ps-container relative pt-40 pb-24 sm:pt-48 sm:pb-32 lg:pt-56 lg:pb-36">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Breadcrumb — "All service areas" anchor gives /locations hub
              stronger upward link equity than a bare "Locations" label. */}
          <div
            className="mb-10 flex items-center gap-3 text-sm"
            style={{ color: "var(--theme-text-muted)" }}
          >
            <Link
              href="/locations"
              className="transition-colors"
              style={{ color: "var(--theme-text-secondary)" }}
            >
              All service areas
            </Link>
            <span style={{ color: "var(--theme-text-muted)" }}>/</span>
            <span style={{ color: "var(--theme-text-secondary)" }}>{cityState}</span>
          </div>

          {/* Eyebrow chip with pin */}
          <div
            className="mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] backdrop-blur"
            style={{
              border: "1px solid var(--theme-card-border)",
              background: "var(--theme-card-bg)",
              color: "var(--color-primary)",
            }}
          >
            <MapPin className="h-3.5 w-3.5" />
            {data.hero.eyebrow}
          </div>

          {/* H1 — city name pops in cyan */}
          <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.025em] sm:text-5xl md:text-6xl lg:text-7xl">
            {renderH1WithCityAccent(data.hero.h1, data.city)}
          </h1>

          {/* Subheadline */}
          <p
            className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed sm:text-xl"
            style={{ color: "var(--theme-text-secondary)" }}
          >
            {data.hero.subheadline}
          </p>

          {/* Answer paragraph */}
          <div
            className="mt-10 max-w-3xl rounded-2xl p-6 backdrop-blur-sm sm:p-7"
            style={{
              border: "1px solid var(--theme-card-border)",
              background: "var(--theme-card-bg)",
            }}
          >
            <div
              className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em]"
              style={{ color: "var(--theme-text-muted)" }}
            >
              Overview
            </div>
            <p
              className="text-pretty text-base leading-relaxed sm:text-[17px]"
              style={{ color: "var(--theme-text-secondary)" }}
            >
              {data.hero.answerParagraph}
            </p>
          </div>

          {/* Region + coords inline strip */}
          {(data.region || data.coordinates) && (
            <div
              className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.14em]"
              style={{ color: "var(--theme-text-muted)" }}
            >
              {data.region && (
                <div className="flex items-center gap-2">
                  <span className="inline-block h-1 w-1 rounded-full" style={{ background: "var(--color-primary)" }} />
                  Region · {data.region}
                </div>
              )}
              {data.coordinates && (
                <div className="flex items-center gap-2">
                  <span className="inline-block h-1 w-1 rounded-full" style={{ background: "var(--color-primary)" }} />
                  {data.coordinates.lat.toFixed(3)}°N,{" "}
                  {Math.abs(data.coordinates.lng).toFixed(3)}°W
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>

      {/* Bottom edge */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "var(--theme-card-border)" }}
      />
    </section>
  );
}

/**
 * If the H1 contains the city name as a discrete token, wrap it in a span
 * tinted cyan. Otherwise render plain. Keeps city visually load-bearing
 * without a server/client text-rewriting hack.
 */
function renderH1WithCityAccent(h1: string, city: string) {
  // Match the first occurrence of the standalone city token. Case-sensitive
  // is fine — H1s consistently use proper case.
  const idx = h1.indexOf(city);
  if (idx === -1) return h1;
  const before = h1.slice(0, idx);
  const after = h1.slice(idx + city.length);
  return (
    <>
      {before}
      <span className="bg-gradient-to-br from-[#80E9FF] to-[#0D95E8] bg-clip-text text-transparent">
        {city}
      </span>
      {after}
    </>
  );
}

// ── Nearby areas ─────────────────────────────────────────────
function NearbyAreasSection({ data }: { data: LocationPageData }) {
  const reduceMotion = useReducedMotion();
  if (data.nearbyAreas.length === 0) return null;

  return (
    <section
      className="relative border-b py-20 sm:py-24"
      style={{
        borderColor: "var(--theme-card-border)",
        background: "var(--theme-section-switchable)",
        transition: "background 300ms ease, border-color 300ms ease",
      }}
    >
      <div className="ps-container">
        <div className="mb-10 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em]"
              style={{
                border: "1px solid var(--theme-card-border)",
                background: "var(--theme-section-alt)",
                color: "var(--theme-text-secondary)",
              }}
            >
              <span className="inline-block h-1 w-1 rounded-full" style={{ background: "var(--color-primary)" }} />
              Service area
            </div>
            <h2
              className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] sm:text-4xl"
              style={{ color: "var(--theme-text-primary)" }}
            >
              Areas we serve near {data.city}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {data.nearbyAreas.map((area, idx) => {
            const inner = (
              <div
                className="flex h-full flex-col justify-between gap-2 rounded-xl px-4 py-4 transition-all hover:-translate-y-0.5 hover:border-[#0D95E8]/40 hover:shadow-[0_12px_30px_-15px_rgba(13,149,232,0.25)]"
                style={{
                  border: "1px solid var(--theme-card-border)",
                  background: "var(--theme-result-card-bg)",
                }}
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-[#0D95E8]" />
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--theme-text-primary)" }}
                  >
                    {area.name}
                  </span>
                </div>
                {area.distanceLabel && (
                  <div
                    className="text-[11px] uppercase tracking-[0.12em]"
                    style={{ color: "var(--theme-text-muted)" }}
                  >
                    {area.distanceLabel}
                  </div>
                )}
              </div>
            );
            return (
              <motion.div
                key={`${area.name}-${idx}`}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.45,
                  delay: Math.min(idx * 0.03, 0.25),
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {area.href ? (
                  <Link href={area.href} className="block h-full">
                    {inner}
                  </Link>
                ) : (
                  inner
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Service cards ────────────────────────────────────────────
function ServiceCardsSection({ data }: { data: LocationPageData }) {
  const reduceMotion = useReducedMotion();
  if (data.serviceCards.length === 0) return null;

  return (
    <section
      className="relative py-24 sm:py-28"
      style={{
        background: "var(--theme-section-alt)",
        transition: "background 300ms ease",
      }}
    >
      <div className="ps-container">
        <div className="mb-14 max-w-3xl">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em]"
            style={{
              border: "1px solid var(--theme-card-border)",
              background: "var(--theme-result-card-bg)",
              color: "var(--theme-text-secondary)",
            }}
          >
            <span className="inline-block h-1 w-1 rounded-full" style={{ background: "var(--color-primary)" }} />
            What we build
          </div>
          <h2
            className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] sm:text-4xl"
            style={{ color: "var(--theme-text-primary)" }}
          >
            What we build for {data.city} businesses
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {data.serviceCards.map((card, idx) => (
            <motion.div
              key={`${card.title}-${idx}`}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.55,
                delay: Math.min(idx * 0.06, 0.3),
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <ServiceCard card={card} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ card }: { card: LocationPageData["serviceCards"][number] }) {
  const inner = (
    <div
      className="group relative flex h-full flex-col rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#0D95E8]/40 hover:shadow-[0_24px_60px_-20px_rgba(13,149,232,0.18)]"
      style={{
        border: "1px solid var(--theme-card-border)",
        background: "var(--theme-result-card-bg)",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#0D95E8]/10 blur-2xl opacity-0 transition-opacity group-hover:opacity-100"
      />
      <div className="relative flex items-center justify-center self-start rounded-xl bg-gradient-to-br from-[#0D95E8]/15 to-[#80E9FF]/10 p-3 text-[#0D95E8]">
        <ServiceIconSvg type={card.icon} className="h-6 w-6" />
      </div>
      <h3
        className="relative mt-6 text-lg font-semibold tracking-tight"
        style={{ color: "var(--theme-text-primary)" }}
      >
        {card.title}
      </h3>
      <ul className="relative mt-4 flex-1 space-y-2.5">
        {card.bullets.map((b, j) => (
          <li
            key={j}
            className="flex items-start gap-2.5 text-[14px] leading-relaxed"
            style={{ color: "var(--theme-text-secondary)" }}
          >
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full" style={{ background: "var(--color-primary)" }} />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      {card.href && (
        <div className="relative mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#0D95E8] group-hover:text-[#0B7BC0]">
          Learn more
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>
      )}
    </div>
  );

  if (card.href) {
    return (
      <Link href={card.href} className="block h-full">
        {inner}
      </Link>
    );
  }
  return inner;
}

// ── Process timeline ─────────────────────────────────────────
function ProcessSection({ data }: { data: LocationPageData }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const items = sectionRef.current.querySelectorAll<HTMLElement>(
      "[data-process-step]"
    );
    if (prefersReduced || items.length === 0) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.09,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === sectionRef.current) t.kill();
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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 h-[480px] w-[480px] rounded-full bg-[#0D95E8] opacity-[0.10] blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 left-0 h-[420px] w-[420px] rounded-full bg-[#00D4AA] opacity-[0.06] blur-[120px]"
      />

      <div className="ps-container relative">
        <div className="mb-14 max-w-3xl">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em]"
            style={{
              border: "1px solid var(--theme-card-border)",
              background: "var(--theme-card-bg)",
              color: "var(--color-primary)",
            }}
          >
            <span className="inline-block h-1 w-1 rounded-full" style={{ background: "var(--color-primary)" }} />
            How we work
          </div>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] sm:text-4xl">
            From scoping call to launch
          </h2>
        </div>

        {/* Horizontal connector — desktop only */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute left-6 top-6 hidden h-[calc(100%-3rem)] w-px bg-gradient-to-b from-white/15 via-white/8 to-transparent lg:left-0 lg:top-6 lg:h-px lg:w-full lg:bg-gradient-to-r"
          />
          <ol className="grid gap-x-6 gap-y-10 lg:grid-cols-5">
            {data.process.map((step, idx) => (
              <li
                key={`${step.title}-${idx}`}
                data-process-step
                className="relative pl-14 lg:pl-0"
              >
                {/* Number badge */}
                <div
                  className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-xl text-base font-semibold tracking-tight backdrop-blur lg:relative lg:mb-6 lg:h-11 lg:w-11"
                  style={{
                    border: "1px solid var(--theme-card-border)",
                    background: "var(--theme-card-bg)",
                    color: "var(--color-primary)",
                  }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <h3
                  className="text-base font-semibold tracking-tight"
                  style={{ color: "var(--theme-text-primary)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: "var(--theme-text-secondary)" }}
                >
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

// ── Case studies (conditional) ───────────────────────────────
function CaseStudiesSection({ data }: { data: LocationPageData }) {
  const reduceMotion = useReducedMotion();
  if (!data.caseStudies || data.caseStudies.length === 0) return null;

  return (
    <section
      className="relative py-24 sm:py-28"
      style={{
        background: "var(--theme-section-switchable)",
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
                background: "var(--theme-section-alt)",
                color: "var(--theme-text-secondary)",
              }}
            >
              <span className="inline-block h-1 w-1 rounded-full" style={{ background: "var(--color-primary)" }} />
              Local work
            </div>
            <h2
              className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] sm:text-4xl"
              style={{ color: "var(--theme-text-primary)" }}
            >
              Work we have shipped
            </h2>
          </div>
          <Link
            href="/case-studies"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[#0D95E8] hover:text-[#0B7BC0]"
          >
            All case studies
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {data.caseStudies.map((cs, idx) => (
            <motion.div
              key={cs.slug}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.55,
                delay: idx * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                href={`/case-studies/${cs.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#0D95E8]/40 hover:shadow-[0_24px_60px_-20px_rgba(13,149,232,0.18)]"
                style={{
                  border: "1px solid var(--theme-card-border)",
                  background: "var(--theme-result-card-bg)",
                }}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-[#0D95E8]/15 to-[#0D95E8]/0 blur-2xl"
                />
                <div
                  className="text-[11px] font-medium uppercase tracking-[0.14em]"
                  style={{ color: "var(--theme-text-muted)" }}
                >
                  {cs.category}
                </div>
                <div className="mt-5">
                  <div
                    className="bg-clip-text text-4xl font-semibold leading-none tracking-[-0.03em] text-transparent sm:text-5xl"
                    style={{ backgroundImage: "linear-gradient(135deg, var(--theme-text-primary), #0D95E8)" }}
                  >
                    {cs.headlineNumber}
                  </div>
                </div>
                <h3
                  className="mt-6 text-lg font-semibold leading-snug"
                  style={{ color: "var(--theme-text-primary)" }}
                >
                  {cs.clientDisplay}
                </h3>
                <p
                  className="mt-3 flex-1 text-[15px] leading-relaxed"
                  style={{ color: "var(--theme-text-secondary)" }}
                >
                  {cs.oneLine}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#0D95E8] group-hover:text-[#0B7BC0]">
                  Read case study
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Why local (conditional) ──────────────────────────────────
function WhyLocalSection({ data }: { data: LocationPageData }) {
  const reduceMotion = useReducedMotion();
  if (!data.whyLocal || data.whyLocal.length === 0) return null;

  const regionLabel = data.region ?? `${data.state}`;

  return (
    <section
      className="relative py-24 sm:py-28"
      style={{
        background: "var(--theme-section-alt)",
        transition: "background 300ms ease",
      }}
    >
      <div className="ps-container">
        <div className="mb-12 max-w-2xl">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em]"
            style={{
              border: "1px solid var(--theme-card-border)",
              background: "var(--theme-result-card-bg)",
              color: "var(--theme-text-secondary)",
            }}
          >
            <span className="inline-block h-1 w-1 rounded-full" style={{ background: "var(--color-primary)" }} />
            Why local
          </div>
          <h2
            className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] sm:text-4xl"
            style={{ color: "var(--theme-text-primary)" }}
          >
            Why work with a {regionLabel} firm
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {data.whyLocal.map((item, idx) => (
            <motion.div
              key={idx}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: idx * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="rounded-2xl p-7"
              style={{
                border: "1px solid var(--theme-card-border)",
                background: "var(--theme-result-card-bg)",
              }}
            >
              <div className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-[#0D95E8]">
                {String(idx + 1).padStart(2, "0")}
              </div>
              <p
                className="text-pretty text-[15px] leading-relaxed"
                style={{ color: "var(--theme-text-primary)" }}
              >
                {item}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Industries (conditional) ─────────────────────────────────
function IndustriesSection({ data }: { data: LocationPageData }) {
  if (!data.industriesServed || data.industriesServed.length === 0) return null;

  return (
    <section
      className="relative border-y py-16"
      style={{
        borderColor: "var(--theme-card-border)",
        background: "var(--theme-section-switchable)",
        transition: "background 300ms ease, border-color 300ms ease",
      }}
    >
      <div className="ps-container">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div
              className="text-[11px] font-medium uppercase tracking-[0.14em]"
              style={{ color: "var(--theme-text-muted)" }}
            >
              Industries we serve in {data.city}
            </div>
            <h3
              className="mt-3 max-w-md text-balance text-xl font-semibold tracking-[-0.01em]"
              style={{ color: "var(--theme-text-primary)" }}
            >
              Capability built for the work {data.city} actually does
            </h3>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {data.industriesServed.map((ind) => (
              <span
                key={ind}
                className="inline-flex items-center rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors hover:border-[#0D95E8]/40 hover:text-[#0D95E8]"
                style={{
                  border: "1px solid var(--theme-card-border)",
                  background: "var(--theme-section-alt)",
                  color: "var(--theme-text-primary)",
                }}
              >
                {ind}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FAQ ──────────────────────────────────────────────────────
function FaqSection({ data }: { data: LocationPageData }) {
  if (data.faq.length === 0) return null;

  return (
    <section
      className="relative py-24 sm:py-28"
      style={{
        background: "var(--theme-section-alt)",
        transition: "background 300ms ease",
      }}
    >
      <div className="ps-container">
        <div className="mb-12 max-w-2xl">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em]"
            style={{
              border: "1px solid var(--theme-card-border)",
              background: "var(--theme-result-card-bg)",
              color: "var(--theme-text-secondary)",
            }}
          >
            <span className="inline-block h-1 w-1 rounded-full" style={{ background: "var(--color-primary)" }} />
            FAQ
          </div>
          <h2
            className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] sm:text-4xl"
            style={{ color: "var(--theme-text-primary)" }}
          >
            FAQ — {data.city}, {data.state}
          </h2>
        </div>

        <div className="mx-auto max-w-3xl space-y-3">
          {data.faq.map((q, idx) => (
            <details
              key={idx}
              className="group rounded-2xl px-6 py-5 transition-colors open:border-[#0D95E8]/40 hover:border-[#0D95E8]/30"
              style={{
                border: "1px solid var(--theme-card-border)",
                background: "var(--theme-result-card-bg)",
              }}
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left">
                <span
                  className="text-base font-medium leading-snug"
                  style={{ color: "var(--theme-text-primary)" }}
                >
                  {q.question}
                </span>
                <span style={{ color: "var(--theme-text-secondary)" }}>
                  <ChevronDown className="mt-0.5 h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180" />
                </span>
              </summary>
              <p
                className="mt-4 text-[15px] leading-relaxed"
                style={{ color: "var(--theme-text-secondary)" }}
              >
                {q.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Related locations (conditional) ──────────────────────────
function RelatedLocationsSection({
  data,
  allLocationSlugs,
}: {
  data: LocationPageData;
  allLocationSlugs?: Set<string>;
}) {
  if (!data.relatedLocations || data.relatedLocations.length === 0) return null;

  const valid = data.relatedLocations.filter((slug) =>
    allLocationSlugs ? allLocationSlugs.has(slug) : true
  );
  if (valid.length === 0) return null;

  return (
    <section
      className="border-t py-16"
      style={{
        borderColor: "var(--theme-card-border)",
        background: "var(--theme-section-switchable)",
        transition: "background 300ms ease, border-color 300ms ease",
      }}
    >
      <div className="ps-container">
        <div className="mb-8">
          <div
            className="text-[11px] font-medium uppercase tracking-[0.14em]"
            style={{ color: "var(--theme-text-muted)" }}
          >
            Other locations we serve
          </div>
          <h2
            className="mt-3 text-balance text-xl font-semibold tracking-[-0.01em]"
            style={{ color: "var(--theme-text-primary)" }}
          >
            Continue exploring
          </h2>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {/* Hub back-link — anchored "All service areas" pushes link equity
              up to /locations so Google ranks the hub over detail pages. */}
          <Link
            href="/locations"
            className="group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all hover:border-[#0D95E8]/40 hover:text-[#0D95E8]"
            style={{
              border: "1px solid var(--color-primary)",
              background: "var(--theme-section-alt)",
              color: "var(--color-primary)",
            }}
          >
            All service areas
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          {valid.map((slug) => (
            <Link
              key={slug}
              href={`/locations/${slug}`}
              className="group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all hover:border-[#0D95E8]/40 hover:text-[#0D95E8]"
              style={{
                border: "1px solid var(--theme-card-border)",
                background: "var(--theme-section-alt)",
                color: "var(--theme-text-primary)",
              }}
            >
              <MapPin className="h-3.5 w-3.5 text-[#0D95E8]" />
              {prettifySlug(slug)}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function prettifySlug(slug: string): string {
  return slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ")
    .replace(/\bKansas\b/, "KS");
}

// ── CTA ──────────────────────────────────────────────────────
function CtaSection({ data }: { data: LocationPageData }) {
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
        <div className="absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0D95E8] opacity-[0.10] blur-[140px]" />
      </div>

      <div className="ps-container relative text-center">
        <h2 className="mx-auto max-w-3xl text-balance text-4xl font-semibold leading-[1.1] tracking-[-0.025em] sm:text-5xl md:text-6xl">
          {data.cta.headline}
        </h2>
        <p
          className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed"
          style={{ color: "var(--theme-text-secondary)" }}
        >
          {data.cta.subcopy}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={data.cta.primaryButton.href}
            className="group inline-flex items-center gap-2 rounded-xl bg-[#0D95E8] px-7 py-3.5 text-base font-medium text-white shadow-[0_8px_30px_rgba(13,149,232,0.35)] transition-all hover:bg-[#0B7BC0] hover:shadow-[0_12px_40px_rgba(13,149,232,0.45)]"
          >
            {data.cta.primaryButton.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          {data.cta.secondaryLink && (
            <Link
              href={data.cta.secondaryLink.href}
              className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-base font-medium transition-all"
              style={{
                border: "1px solid var(--theme-card-border)",
                color: "var(--theme-text-primary)",
              }}
            >
              {data.cta.secondaryLink.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Top-level ────────────────────────────────────────────────
export function LocationPage({
  data,
  allLocationSlugs,
}: {
  data: LocationPageData;
  /** Optional set of valid slugs — filters relatedLocations to avoid 404s. */
  allLocationSlugs?: Set<string>;
}) {
  const schemas = buildSchema(data);

  return (
    <article>
      <JsonLd data={schemas} />
      <Hero data={data} />
      <NearbyAreasSection data={data} />
      <ServiceCardsSection data={data} />
      <ProcessSection data={data} />
      <CaseStudiesSection data={data} />
      <WhyLocalSection data={data} />
      <IndustriesSection data={data} />
      <FaqSection data={data} />
      <RelatedLocationsSection data={data} allLocationSlugs={allLocationSlugs} />
      <CtaSection data={data} />
    </article>
  );
}
