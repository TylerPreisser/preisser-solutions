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
              Locations
            </div>
            <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.025em] sm:text-6xl md:text-7xl">
              Locations We Serve
            </h1>
            <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-white/70 sm:text-xl">
              Preisser Solutions is based in Hays, Kansas. We deliver in person
              across western and central Kansas, and remotely nationwide.
            </p>

            <div className="mt-14 flex flex-wrap gap-x-12 gap-y-6">
              <div>
                <div className="bg-gradient-to-br from-white to-[#80E9FF] bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl">
                  {totalCities}
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.14em] text-white/50">
                  Location pages
                </div>
              </div>
              <div className="h-12 w-px bg-white/10 self-end" />
              <div>
                <div className="bg-gradient-to-br from-white to-[#80E9FF] bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl">
                  {regions.length}
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.14em] text-white/50">
                  Regions of Kansas
                </div>
              </div>
              <div className="h-12 w-px bg-white/10 self-end" />
              <div>
                <div className="bg-gradient-to-br from-white to-[#80E9FF] bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl">
                  Hays
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.14em] text-white/50">
                  Headquarters
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Regions ─────────────────────────────────────────── */}
      <section className="relative bg-[#F6F9FC] pb-32 pt-20">
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
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[#475569]">
            <span className="inline-block h-1 w-1 rounded-full bg-[#0D95E8]" />
            {region.name}
          </div>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#475569]">
            {region.blurb}
          </p>
        </div>
        <div className="text-xs uppercase tracking-[0.14em] text-[#94A3B8]">
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
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#0D95E8]/40 hover:shadow-[0_24px_60px_-20px_rgba(13,149,232,0.18)]"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-[#0D95E8]/12 to-[#0D95E8]/0 blur-2xl"
              />
              <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#94A3B8]">
                {loc.region ?? loc.state}
              </div>
              <h3 className="mt-4 text-xl font-semibold leading-snug tracking-tight text-[#0A1628]">
                {loc.city}, {loc.state}
              </h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[#475569]">
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
