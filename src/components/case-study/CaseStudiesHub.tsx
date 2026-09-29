import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import type { CaseStudySummary } from "@/types/case-study";

interface Props {
  caseStudies: CaseStudySummary[];
}

/**
 * The three pillars, in the fixed order set by
 * docs/plans/2026-08-02-three-pillar-reposition.md §2. Every case study on the
 * grid leads its `category` string with one of these, so the chip row is the
 * pillar row — not a taxonomy of whatever words happened to be used.
 */
const FILTER_RANK: Record<string, number> = {
  "Business Software": 0,
  "Business Automation": 1,
  "AI Integration": 2,
};

function getFilterLabel(cs: CaseStudySummary) {
  return cs.category.split("•")[0].trim();
}

function slugifyFilter(label: string) {
  return (
    label
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "filter"
  );
}

function getFilters(caseStudies: CaseStudySummary[]) {
  const set = new Set<string>();
  caseStudies.forEach((cs) => set.add(getFilterLabel(cs)));

  const ordered = Array.from(set).sort((a, b) => {
    const ra = FILTER_RANK[a] ?? 100 + a.charCodeAt(0);
    const rb = FILTER_RANK[b] ?? 100 + b.charCodeAt(0);
    if (ra !== rb) return ra - rb;
    return a.localeCompare(b);
  });

  return ["All", ...ordered];
}

function buildFilterCss(filters: string[]) {
  const activeChipRules = filters
    .map((filter) => {
      const slug = slugifyFilter(filter);
      return `#case-filter-${slug}:checked ~ .case-studies-grid-section .ps-chip[for="case-filter-${slug}"]`;
    })
    .join(",\n");

  const cardRules = filters
    .filter((filter) => filter !== "All")
    .map((filter) => {
      const slug = slugifyFilter(filter);
      return `#case-filter-${slug}:checked ~ .case-studies-grid-section .case-study-card:not([data-case-filter="${slug}"]){display:none}`;
    })
    .join("\n");

  return `${activeChipRules}{border-color:var(--color-primary);background:var(--color-primary);color:#FFFFFF;box-shadow:var(--ps-chip-active-shadow)}\n${cardRules}`;
}

/**
 * Case Studies hub page renderer.
 *
 * The hub is server-rendered. Category filtering uses native radio inputs and
 * sibling CSS selectors so mobile does not hydrate the full card grid just to
 * filter, and iOS WebKit does not have to run ancestor :has() invalidation
 * across the long card list.
 */
export function CaseStudiesHub({ caseStudies }: Props) {
  const filters = getFilters(caseStudies);
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://preissersolutions.com/case-studies#collection",
    url: "https://preissersolutions.com/case-studies",
    name: "Case Studies: Preisser Solutions",
    description:
      "What was broken, what we built, and what changed: Preisser Solutions engagements across farming, oil and gas, insurance, transportation, HVAC, ministry, and media.",
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
    <div className="case-studies-hub">
      <JsonLd data={collectionSchema} />

      <script
        dangerouslySetInnerHTML={{
          __html: `!function(){if(location.hash)return;try{history.scrollRestoration='manual'}catch(e){}var t=function(){scrollTo(0,0)};requestAnimationFrame(t);addEventListener('pageshow',function(){requestAnimationFrame(t)},{once:true})}();`,
        }}
      />

      <style dangerouslySetInnerHTML={{ __html: buildFilterCss(filters) }} />

      {filters.map((filter) => {
        const slug = slugifyFilter(filter);
        return (
          <input
            key={slug}
            className="case-filter-radio"
            type="radio"
            name="case-study-category"
            id={`case-filter-${slug}`}
            defaultChecked={filter === "All"}
          />
        );
      })}

      {/* Hero */}
      <section
        className="case-studies-hero relative isolate overflow-hidden"
        style={{
          background: "var(--theme-section-switchable)",
          color: "var(--theme-text-primary)",
          transition: "background 300ms ease, color 300ms ease",
        }}
      >
        <div
          aria-hidden="true"
          className="case-studies-hero-glow pointer-events-none absolute inset-0 -z-10 opacity-80"
        >
          <div className="absolute -top-40 -left-40 h-[640px] w-[640px] rounded-full bg-[#1590FF] opacity-[0.18] blur-[140px]" />
          <div className="absolute top-60 -right-40 h-[520px] w-[520px] rounded-full bg-[#80E9FF] opacity-[0.10] blur-[120px]" />
        </div>
        <div
          aria-hidden="true"
          className="case-studies-grid-bg pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(var(--theme-text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--theme-text-primary) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />

        {/*
          Bottom padding is intentionally lighter than the top. It was sized to
          sit under a three-stat strip that no longer exists; left at pb-36 it
          read as a hole rather than as deliberate space.
        */}
        <div className="ps-container relative pt-40 pb-16 sm:pt-48 sm:pb-20 lg:pt-56 lg:pb-24">
          <div>
            <div
              className="mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em]"
              style={{
                border: "1px solid var(--theme-card-border)",
                background: "var(--theme-card-bg)",
                color: "var(--color-primary)",
              }}
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: "var(--color-primary)" }} />
              Case Studies
            </div>
            <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.025em] sm:text-6xl md:text-7xl">
              What We Built, and What Changed.
            </h1>
            <p
              className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed sm:text-xl"
              style={{ color: "var(--theme-text-secondary)" }}
            >
              Each of these is a real business with a real before-state. What
              was broken, what we built for them, and what changed once it was
              running. Named where the client has consented; anonymized where
              the relationship requires it.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and grid */}
      <section
        id="case-study-grid"
        className="case-studies-grid-section relative pb-32 pt-12 md:pt-16"
        style={{
          background: "var(--theme-section-alt)",
          transition: "background 300ms ease",
        }}
      >
        <div className="ps-container">
          <div
            className="mb-3 text-xs font-medium uppercase tracking-[0.18em]"
            style={{ color: "var(--theme-text-muted)" }}
          >
            Filter by category
          </div>

          <div className="mb-12">
            <div className="ps-chips-wrapper">
              <div className="ps-chips-scroll">
                {filters.map((filter) => {
                  const slug = slugifyFilter(filter);
                  return (
                    <label
                      key={slug}
                      htmlFor={`case-filter-${slug}`}
                      className="ps-chip"
                    >
                      {filter}
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {caseStudies.map((cs, idx) => (
              <HubCard
                key={cs.slug}
                cs={cs}
                index={idx}
                filterSlug={slugifyFilter(getFilterLabel(cs))}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/**
 * One row of the card's structured body — a label and the sentence under it.
 * The labels are deliberately literal ("The problem", "What we built",
 * "What changed"): the card exists to answer a buyer's four questions in
 * order, not to show off a metric.
 */
function CardFact({
  label,
  children,
  emphasis = false,
}: {
  label: string;
  children: React.ReactNode;
  emphasis?: boolean;
}) {
  return (
    <div>
      {/*
        --theme-text-secondary, not --theme-text-muted: muted (#64748B) on the
        card background (#0F1D30 in dark) measures 3.56:1, under the 4.5:1 AA
        floor for body text. Secondary clears it in both themes.
      */}
      <div
        className="text-[11px] font-semibold uppercase tracking-[0.16em]"
        style={{
          color: emphasis
            ? "var(--theme-accent-text)"
            : "var(--theme-text-secondary)",
        }}
      >
        {label}
      </div>
      <p
        className={
          emphasis
            ? "mt-1.5 text-[15px] font-semibold leading-snug"
            : "mt-1.5 text-[15px] leading-relaxed"
        }
        style={{
          color: emphasis
            ? "var(--theme-text-primary)"
            : "var(--theme-text-secondary)",
        }}
      >
        {children}
      </p>
    </div>
  );
}

function HubCard({
  cs,
  index,
  filterSlug,
}: {
  cs: CaseStudySummary;
  index: number;
  filterSlug: string;
}) {
  // Fall back to the one-line summary and the leading result for any entry
  // that has not been given hub copy yet, so a missing block degrades to
  // something readable instead of an empty card.
  const primary = cs.headlineResults[0];
  const problem = cs.hub?.problem;
  const built = cs.hub?.built ?? cs.oneLine;
  const outcome =
    cs.hub?.outcome ??
    (primary ? `${primary.value}: ${primary.label}` : undefined);

  const accent =
    index % 3 === 0
      ? "from-[#1590FF]/15 to-[#1590FF]/0"
      : index % 3 === 1
      ? "from-[#80E9FF]/12 to-[#80E9FF]/0"
      : "from-[#00D4AA]/10 to-[#00D4AA]/0";

  return (
    <div className="case-study-card" data-case-filter={filterSlug}>
      <Link
        href={`/case-studies/${cs.slug}`}
        prefetch={false}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#1590FF]/40 hover:shadow-[0_24px_60px_-20px_rgba(21,144,255,0.18)]"
        style={{
          borderColor: "var(--theme-card-border)",
          background: "var(--theme-result-card-bg)",
          transition:
            "background 300ms ease, border-color 200ms ease, transform 300ms ease, box-shadow 300ms ease",
        }}
      >
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${accent} blur-2xl`}
        />

        <div
          className="text-[11px] font-medium uppercase tracking-[0.14em]"
          style={{ color: "var(--theme-text-secondary)" }}
        >
          {cs.category}
        </div>

        {/* 1. Who */}
        <h3
          className="mt-5 text-balance text-2xl font-semibold leading-snug"
          style={{ color: "var(--theme-text-primary)" }}
        >
          {cs.clientNameDisplay}
        </h3>
        <div
          className="mt-1.5 text-[13px] leading-snug"
          style={{ color: "var(--theme-text-secondary)" }}
        >
          {cs.industry}
        </div>

        <div className="mt-6 mb-6 flex flex-col gap-5">
          {/* 2. What was broken */}
          {problem && <CardFact label="The problem">{problem}</CardFact>}

          {/* 3. What got built */}
          <CardFact label="What we built">{built}</CardFact>
        </div>

        {/*
          4. What changed. `mt-auto` pins this to the bottom of the card so the
          outcome panels line up across a row; the `mb-6` on the block above
          guarantees the gap when there is no slack to absorb. Letting the prose
          block grow with `flex-1` instead left a dead gap above the panel on
          whichever card in a row had the shorter copy.
        */}
        {outcome && (
          <div
            className="mt-auto rounded-xl border p-5"
            style={{
              borderColor: "rgba(21, 144, 255, 0.28)",
              background: "rgba(21, 144, 255, 0.06)",
            }}
          >
            <CardFact label="What changed" emphasis>
              {outcome}
            </CardFact>
          </div>
        )}

        <div
          className="mt-7 flex items-center justify-between border-t pt-5"
          style={{ borderColor: "var(--theme-card-border)" }}
        >
          <span className="text-sm font-medium [color:var(--theme-accent-text)] group-hover:[color:var(--theme-accent-text)]">
            Read case study
          </span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 [color:var(--theme-accent-text)] transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      </Link>
    </div>
  );
}
