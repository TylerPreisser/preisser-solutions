import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import type { CaseStudySummary } from "@/types/case-study";

interface Props {
  caseStudies: CaseStudySummary[];
}

const FILTER_RANK: Record<string, number> = {
  "Named Engagement": 0,
  "Internal Platform": 10,
  "Internal Tool": 20,
  Capability: 30,
  "Proof of Concept": 40,
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
          <div className="absolute -top-40 -left-40 h-[640px] w-[640px] rounded-full bg-[#0D95E8] opacity-[0.18] blur-[140px]" />
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

        <div className="ps-container relative pt-40 pb-24 sm:pt-48 sm:pb-32 lg:pt-56 lg:pb-36">
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
              Real Work, Real Outcomes.
            </h1>
            <p
              className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed sm:text-xl"
              style={{ color: "var(--theme-text-secondary)" }}
            >
              Every Preisser Solutions case study is a real engagement with a
              measurable result. Named where the client has consented;
              anonymized where the relationship requires it.
            </p>

            <div className="case-studies-hero-stats mt-16 flex flex-wrap gap-x-12 gap-y-6 md:mt-20">
              <div className="case-studies-hero-stat">
                <div
                  className="bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl"
                  style={{ backgroundImage: "linear-gradient(135deg, var(--theme-text-primary), #80E9FF)" }}
                >
                  {caseStudies.length}
                </div>
                <div
                  className="mt-1 text-xs uppercase tracking-[0.14em]"
                  style={{ color: "var(--theme-text-muted)" }}
                >
                  Published case studies
                </div>
              </div>
              <div className="case-studies-hero-stat-divider h-12 w-px self-end" style={{ background: "var(--theme-card-border)" }} />
              <div className="case-studies-hero-stat">
                <div
                  className="bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl"
                  style={{ backgroundImage: "linear-gradient(135deg, var(--theme-text-primary), #80E9FF)" }}
                >
                  {filters.length - 1}
                </div>
                <div
                  className="mt-1 text-xs uppercase tracking-[0.14em]"
                  style={{ color: "var(--theme-text-muted)" }}
                >
                  Capability categories
                </div>
              </div>
              <div className="case-studies-hero-stat-divider h-12 w-px self-end" style={{ background: "var(--theme-card-border)" }} />
              <div className="case-studies-hero-stat">
                <div
                  className="bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl"
                  style={{ backgroundImage: "linear-gradient(135deg, var(--theme-text-primary), #80E9FF)" }}
                >
                  100%
                </div>
                <div
                  className="mt-1 text-xs uppercase tracking-[0.14em]"
                  style={{ color: "var(--theme-text-muted)" }}
                >
                  Outcomes from real builds
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and grid */}
      <section
        id="case-study-grid"
        className="case-studies-grid-section relative pb-32 pt-20 md:pt-24"
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

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
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

function HubCard({
  cs,
  index,
  filterSlug,
}: {
  cs: CaseStudySummary;
  index: number;
  filterSlug: string;
}) {
  const primary = cs.headlineResults[0];

  const accent =
    index % 3 === 0
      ? "from-[#0D95E8]/15 to-[#0D95E8]/0"
      : index % 3 === 1
      ? "from-[#80E9FF]/12 to-[#80E9FF]/0"
      : "from-[#00D4AA]/10 to-[#00D4AA]/0";

  return (
    <div className="case-study-card" data-case-filter={filterSlug}>
      <Link
        href={`/case-studies/${cs.slug}`}
        prefetch={false}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#0D95E8]/40 hover:shadow-[0_24px_60px_-20px_rgba(13,149,232,0.18)]"
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
          style={{ color: "var(--theme-text-muted)" }}
        >
          {cs.category}
        </div>

        {primary && (
          <div className="mt-5">
            <div
              className="bg-clip-text text-4xl font-semibold leading-none tracking-[-0.03em] text-transparent sm:text-5xl"
              style={{ backgroundImage: "linear-gradient(135deg, var(--theme-text-primary), #0D95E8)" }}
            >
              {primary.value}
            </div>
            <div
              className="mt-2 text-xs uppercase tracking-[0.14em]"
              style={{ color: "var(--theme-text-secondary)" }}
            >
              {primary.label}
            </div>
          </div>
        )}

        <h3
          className="mt-7 text-balance text-xl font-semibold leading-snug"
          style={{ color: "var(--theme-text-primary)" }}
        >
          {cs.clientNameDisplay}
        </h3>

        <p
          className="mt-3 flex-1 text-[15px] leading-relaxed"
          style={{ color: "var(--theme-text-secondary)" }}
        >
          {cs.oneLine}
        </p>

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
