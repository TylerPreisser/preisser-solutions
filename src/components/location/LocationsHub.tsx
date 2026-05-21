"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { JsonLd } from "@/components/seo/JsonLd";
import type { LocationPageData } from "@/types/location";
import type { LocationRegion } from "@/data/locations";

interface Props {
  locationsBySlug: Record<string, LocationPageData>;
  regions: LocationRegion[];
}

/**
 * /locations hub page.
 *
 * Geographic grouping — Western / Central / Southwest / Northeast / South-Central
 * Kansas. Each region renders a card grid of the cities served. Mirrors the
 * case-studies hub design pattern.
 */
export function LocationsHub({ locationsBySlug, regions }: Props) {
  const reduceMotion = useReducedMotion();

  const totalCities = Object.values(locationsBySlug).length;

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://preissersolutions.com/locations#collection",
    url: "https://preissersolutions.com/locations",
    name: "Locations We Serve — Preisser Solutions",
    description:
      "Preisser Solutions is headquartered in Hays, KS, and delivers custom software, AI automation, and websites across Kansas.",
    inLanguage: "en-US",
    isPartOf: { "@id": "https://preissersolutions.com/#website" },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: totalCities,
      itemListElement: Object.values(locationsBySlug).map((l, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `https://preissersolutions.com/locations/${l.slug}`,
        name: `${l.city}, ${l.state}`,
      })),
    },
  };

  return (
    <div>
      <JsonLd data={collectionSchema} />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        className="relative isolate overflow-hidden"
        style={{
          background: "var(--theme-section-switchable)",
          color: "var(--theme-text-primary)",
          transition: "background 300ms ease, color 300ms ease",
        }}
      >
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
            <div
              className="mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em]"
              style={{
                border: "1px solid var(--theme-card-border)",
                background: "var(--theme-card-bg)",
                color: "var(--color-primary)",
              }}
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: "var(--color-primary)" }} />
              Locations
            </div>
            <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.025em] sm:text-6xl md:text-7xl">
              Locations We Serve
            </h1>
            <p
              className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed sm:text-xl"
              style={{ color: "var(--theme-text-secondary)" }}
            >
              Preisser Solutions is based in Hays, Kansas. We deliver in person
              across western and central Kansas, and remotely nationwide.
            </p>

            <div className="mt-16 flex flex-wrap gap-x-12 gap-y-6 md:mt-20">
              <div>
                <div
                  className="bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl"
                  style={{ backgroundImage: "linear-gradient(135deg, var(--theme-text-primary), #80E9FF)" }}
                >
                  {totalCities}
                </div>
                <div
                  className="mt-1 text-xs uppercase tracking-[0.14em]"
                  style={{ color: "var(--theme-text-muted)" }}
                >
                  Location pages
                </div>
              </div>
              <div className="h-12 w-px self-end" style={{ background: "var(--theme-card-border)" }} />
              <div>
                <div
                  className="bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl"
                  style={{ backgroundImage: "linear-gradient(135deg, var(--theme-text-primary), #80E9FF)" }}
                >
                  {regions.length}
                </div>
                <div
                  className="mt-1 text-xs uppercase tracking-[0.14em]"
                  style={{ color: "var(--theme-text-muted)" }}
                >
                  Regions of Kansas
                </div>
              </div>
              <div className="h-12 w-px self-end" style={{ background: "var(--theme-card-border)" }} />
              <div>
                <div
                  className="bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl"
                  style={{ backgroundImage: "linear-gradient(135deg, var(--theme-text-primary), #80E9FF)" }}
                >
                  Hays
                </div>
                <div
                  className="mt-1 text-xs uppercase tracking-[0.14em]"
                  style={{ color: "var(--theme-text-muted)" }}
                >
                  Headquarters
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Regions ─────────────────────────────────────────── */}
      <section
        className="relative pb-32 pt-20 md:pt-24"
        style={{
          background: "var(--theme-section-alt)",
          transition: "background 300ms ease",
        }}
      >
        <div className="ps-container space-y-20">
          {regions.map((region) => (
            <RegionBlock
              key={region.name}
              region={region}
              locationsBySlug={locationsBySlug}
              reduceMotion={!!reduceMotion}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function RegionBlock({
  region,
  locationsBySlug,
  reduceMotion,
}: {
  region: LocationRegion;
  locationsBySlug: Record<string, LocationPageData>;
  reduceMotion: boolean;
}) {
  const items = region.slugs
    .map((s) => locationsBySlug[s])
    .filter(Boolean);

  if (items.length === 0) return null;

  return (
    <div>
      <div className="mb-10 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
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
            {region.name}
          </div>
          <p
            className="mt-3 max-w-2xl text-[15px] leading-relaxed"
            style={{ color: "var(--theme-text-secondary)" }}
          >
            {region.blurb}
          </p>
        </div>
        <div
          className="text-xs uppercase tracking-[0.14em]"
          style={{ color: "var(--theme-text-muted)" }}
        >
          {items.length} {items.length === 1 ? "page" : "pages"}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((loc, idx) => (
          <motion.div
            key={loc.slug}
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.5,
              delay: Math.min(idx * 0.05, 0.3),
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Link
              href={`/locations/${loc.slug}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#0D95E8]/40 hover:shadow-[0_24px_60px_-20px_rgba(13,149,232,0.18)]"
              style={{
                border: "1px solid var(--theme-card-border)",
                background: "var(--theme-result-card-bg)",
              }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-[#0D95E8]/12 to-[#0D95E8]/0 blur-2xl"
              />
              <div
                className="text-[11px] font-medium uppercase tracking-[0.14em]"
                style={{ color: "var(--theme-text-muted)" }}
              >
                {loc.region ?? loc.state}
              </div>
              <h3
                className="mt-4 text-xl font-semibold leading-snug tracking-tight"
                style={{ color: "var(--theme-text-primary)" }}
              >
                {loc.city}, {loc.state}
              </h3>
              <p
                className="mt-3 flex-1 text-[15px] leading-relaxed"
                style={{ color: "var(--theme-text-secondary)" }}
              >
                {loc.hero.subheadline}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#0D95E8] group-hover:text-[#0B7BC0]">
                Visit page
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
