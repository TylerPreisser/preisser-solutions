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

      {/* ── Kansas Map ───────────────────────────────────────── */}
      <div className="hidden md:block" aria-hidden="true">
        <KansasMap />
      </div>

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

/**
 * Inline SVG map of Kansas + immediate border cities.
 * Coordinate math: KS bounding box lat 37.0–40.2, lng -102.2–-94.6
 *   x = (102.2 + lng) / 7.6 * 800   (lng is negative, so 102.2 + neg = dist from W edge)
 *   y = (40.2 - lat) / 3.2 * 500
 * Each dot is a clickable Link to the location page.
 */
function KansasMap() {
  type Dot = {
    slug: string;
    label: string;
    lat: number;
    lng: number;
    region: "western" | "central" | "southwest" | "northeast" | "kc" | "south" | "border";
  };

  const dots: Dot[] = [
    { slug: "hays-kansas",                           label: "Hays",          lat: 38.879, lng: -99.327, region: "western" },
    { slug: "ellis-kansas-web-design",               label: "Ellis",         lat: 38.934, lng: -99.556, region: "western" },
    { slug: "wakeeney-kansas-web-design",            label: "WaKeeney",      lat: 39.026, lng: -99.881, region: "western" },
    { slug: "colby-kansas-web-design",               label: "Colby",         lat: 39.395, lng: -101.052, region: "western" },
    { slug: "goodland-kansas-web-design",            label: "Goodland",      lat: 39.352, lng: -101.711, region: "western" },
    { slug: "oakley-kansas-web-design",              label: "Oakley",        lat: 39.129, lng: -100.852, region: "western" },
    { slug: "hill-city-kansas-web-design",           label: "Hill City",     lat: 39.367, lng: -99.837, region: "western" },
    { slug: "norton-kansas-web-design",              label: "Norton",        lat: 39.836, lng: -99.893, region: "western" },
    { slug: "phillipsburg-kansas-web-design",        label: "Phillipsburg",  lat: 39.748, lng: -99.318, region: "western" },
    { slug: "great-bend-kansas",                     label: "Great Bend",    lat: 38.364, lng: -98.765, region: "central" },
    { slug: "salina-kansas",                         label: "Salina",        lat: 38.840, lng: -97.611, region: "central" },
    { slug: "hutchinson-kansas-web-design",          label: "Hutchinson",    lat: 38.061, lng: -97.929, region: "central" },
    { slug: "mcpherson-kansas-web-design",           label: "McPherson",     lat: 38.371, lng: -97.664, region: "central" },
    { slug: "newton-kansas-web-design",              label: "Newton",        lat: 38.047, lng: -97.345, region: "central" },
    { slug: "pratt-kansas-web-design",               label: "Pratt",         lat: 37.643, lng: -98.737, region: "central" },
    { slug: "garden-city-kansas",                    label: "Garden City",   lat: 37.972, lng: -100.872, region: "southwest" },
    { slug: "dodge-city-kansas",                     label: "Dodge City",    lat: 37.752, lng: -100.017, region: "southwest" },
    { slug: "liberal-kansas-web-design",             label: "Liberal",       lat: 37.043, lng: -100.921, region: "south" },
    { slug: "manhattan-kansas",                      label: "Manhattan",     lat: 39.184, lng: -96.572, region: "northeast" },
    { slug: "junction-city-kansas-web-design",       label: "Junction City", lat: 39.028, lng: -96.831, region: "northeast" },
    { slug: "lawrence-kansas-web-design",            label: "Lawrence",      lat: 38.972, lng: -95.235, region: "northeast" },
    { slug: "topeka-kansas",                         label: "Topeka",        lat: 39.048, lng: -95.677, region: "northeast" },
    { slug: "olathe-kansas-custom-software",         label: "Olathe",        lat: 38.884, lng: -94.820, region: "kc" },
    { slug: "overland-park-kansas-custom-software",  label: "OP",            lat: 38.982, lng: -94.669, region: "kc" },
    { slug: "lenexa-kansas-custom-software",         label: "Lenexa",        lat: 38.952, lng: -94.733, region: "kc" },
    { slug: "wichita-kansas",                        label: "Wichita",       lat: 37.687, lng: -97.330, region: "south" },
    { slug: "derby-kansas-web-design",               label: "Derby",         lat: 37.548, lng: -97.263, region: "south" },
  ];

  const W = 800;
  const H = 520;
  const LNG_W = -102.4;
  const LNG_E = -94.4;
  const LAT_N = 40.5;
  const LAT_S = 36.8;
  const LNG_SPAN = LNG_E - LNG_W;
  const LAT_SPAN = LAT_N - LAT_S;

  const toX = (lng: number) => ((lng - LNG_W) / LNG_SPAN) * W;
  const toY = (lat: number) => ((LAT_N - lat) / LAT_SPAN) * H;

  const regionColors: Record<string, string> = {
    western:   "#0D95E8",
    central:   "#34D399",
    southwest: "#F59E0B",
    northeast: "#6366F1",
    kc:        "#8B5CF6",
    south:     "#EC4899",
    border:    "#94A3B8",
  };

  return (
    <section
      className="relative py-10"
      style={{ background: "var(--theme-section-alt)", transition: "background 300ms ease" }}
    >
      <div className="ps-container">
        <div className="mb-5 flex items-center justify-between">
          <div
            className="text-xs font-medium uppercase tracking-[0.14em]"
            style={{ color: "var(--theme-text-muted)" }}
          >
            Service Area Map
          </div>
          <div className="flex flex-wrap gap-4 text-[11px]" style={{ color: "var(--theme-text-muted)" }}>
            {(["western", "central", "southwest", "northeast", "kc", "south", "border"] as const).map((r) => (
              <span key={r} className="flex items-center gap-1.5">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: regionColors[r] }}
                />
                {r === "western" ? "Western KS" :
                  r === "central" ? "Central KS" :
                  r === "southwest" ? "SW Kansas" :
                  r === "northeast" ? "NE & Flint Hills" :
                  r === "kc" ? "KC Metro" :
                  r === "south" ? "South-Central" :
                  "Border Markets"}
              </span>
            ))}
          </div>
        </div>

        <div
          className="w-full overflow-hidden rounded-xl"
          style={{
            border: "1px solid var(--theme-card-border)",
            background: "var(--theme-card-bg)",
          }}
        >
          <svg
            viewBox={`0 0 ${W} ${H}`}
            width="100%"
            className="block"
            aria-label="Map of Kansas service area"
            role="img"
          >
            {/* Grid lines */}
            {[37.5, 38.0, 38.5, 39.0, 39.5, 40.0].map((lat) => (
              <line
                key={`lat-${lat}`}
                x1={0}
                y1={toY(lat)}
                x2={W}
                y2={toY(lat)}
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.07"
              />
            ))}
            {[-95, -96, -97, -98, -99, -100, -101, -102].map((lng) => (
              <line
                key={`lng-${lng}`}
                x1={toX(lng)}
                y1={0}
                x2={toX(lng)}
                y2={H}
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.07"
              />
            ))}

            {/* Kansas state border (approximate rectangle) */}
            <rect
              x={toX(-102.05)}
              y={toY(40.0)}
              width={toX(-94.62) - toX(-102.05)}
              height={toY(37.0) - toY(40.0)}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              opacity="0.15"
              rx="2"
            />

            {/* State label */}
            <text
              x={toX(-98.5)}
              y={toY(38.5)}
              textAnchor="middle"
              fontSize="14"
              fontWeight="600"
              fill="currentColor"
              opacity="0.08"
              letterSpacing="6"
            >
              KANSAS
            </text>

            {/* Location dots */}
            {dots.map((dot) => {
              const x = toX(dot.lng);
              const y = toY(dot.lat);
              const color = regionColors[dot.region];
              return (
                <g key={dot.slug}>
                  <Link href={`/locations/${dot.slug}`}>
                    <circle
                      cx={x}
                      cy={y}
                      r={7}
                      fill={color}
                      opacity="0.22"
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r={4}
                      fill={color}
                      className="cursor-pointer transition-opacity hover:opacity-90"
                    />
                    <title>{dot.label}</title>
                  </Link>
                </g>
              );
            })}
          </svg>
        </div>
        <p
          className="mt-3 text-center text-[11px]"
          style={{ color: "var(--theme-text-muted)" }}
        >
          Click any dot to visit that location page. Hover to see city name.
        </p>
      </div>
    </section>
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
