import { Fragment } from "react";
import { JsonLd } from "@/components/seo/JsonLd";
import type { CaseStudyData } from "@/types/case-study";

interface Props {
  caseStudies: CaseStudyData[];
}

interface CaseStudyHubCard {
  slug: string;
  category: string;
  clientNameDisplay: string;
  h1: string;
  oneLine: string;
  filterClass: string;
  primary?: {
    value: string;
    label: string;
  };
}

function buildFilters(caseStudies: CaseStudyData[]) {
  const rank: Record<string, number> = {
    "Named Engagement": 0,
    "Internal Platform": 10,
    "Internal Tool": 20,
    Capability: 30,
    "Proof of Concept": 40,
  };
  const set = new Set<string>();

  caseStudies.forEach((cs) => {
    set.add(cs.category.split("•")[0].trim());
  });

  const ordered = Array.from(set).sort((a, b) => {
    const ra = rank[a] ?? 100 + a.charCodeAt(0);
    const rb = rank[b] ?? 100 + b.charCodeAt(0);
    if (ra !== rb) return ra - rb;
    return a.localeCompare(b);
  });

  return ["All", ...ordered];
}

function buildCards(
  caseStudies: CaseStudyData[],
  filters: string[]
): CaseStudyHubCard[] {
  return caseStudies.map((cs) => ({
    slug: cs.slug,
    category: cs.category,
    clientNameDisplay: cs.clientNameDisplay,
    h1: cs.h1,
    oneLine: cs.oneLine,
    filterClass: `ps-case-filter-${filters.indexOf(
      cs.category.split("•")[0].trim()
    )}`,
    primary: cs.headlineResults[0],
  }));
}

function buildFilterCss(filters: string[]) {
  const rules = filters
    .map((_, index) => {
      const input = `#ps-case-filter-${index}`;
      const active =
        `${input}:checked + .ps-case-filter-chip { ` +
        "border-color: var(--color-primary); background: var(--color-primary); " +
        "color: #fff; box-shadow: 0 8px 30px rgba(13,149,232,0.25); }";

      if (index === 0) return active;

      return `${active}
${input}:checked ~ .ps-case-grid .ps-case-card-shell:not(.ps-case-filter-${index}) { display: none; }`;
    })
    .join("\n");

  return `.ps-case-filter-input {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
.ps-case-filter-chip {
  display: inline-flex;
  cursor: pointer;
  align-items: center;
  border-radius: 9999px;
  border: 1px solid var(--theme-card-border);
  background: var(--theme-card-bg);
  color: var(--theme-text-secondary);
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: border-color 150ms ease, background 150ms ease, color 150ms ease, box-shadow 150ms ease;
}
.ps-case-filter-input:focus-visible + .ps-case-filter-chip {
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
}
${rules}`;
}

/**
 * Case Studies hub page renderer.
 *
 * The page stays SEO/AEO-complete and statically rendered. The category
 * filters are CSS-driven so mobile does not hydrate a card-grid runtime.
 */
export function CaseStudiesHub({ caseStudies }: Props) {
  const filters = buildFilters(caseStudies);
  const cards = buildCards(caseStudies, filters);

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
          <div className="absolute -left-40 -top-40 h-[640px] w-[640px] rounded-full bg-[#0D95E8] opacity-[0.18] blur-[140px]" />
          <div className="absolute -right-40 top-60 h-[520px] w-[520px] rounded-full bg-[#80E9FF] opacity-[0.10] blur-[120px]" />
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
          <div>
            <div
              className="mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em]"
              style={{
                border: "1px solid var(--theme-card-border)",
                background: "var(--theme-card-bg)",
                color: "var(--color-primary)",
              }}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--color-primary)" }}
              />
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

            <div className="mt-16 flex flex-wrap gap-x-12 gap-y-6 md:mt-20">
              <div>
                <div
                  className="bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, var(--theme-text-primary), #80E9FF)",
                  }}
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
              <div
                className="h-12 w-px self-end"
                style={{ background: "var(--theme-card-border)" }}
              />
              <div>
                <div
                  className="bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, var(--theme-text-primary), #80E9FF)",
                  }}
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
              <div
                className="h-12 w-px self-end"
                style={{ background: "var(--theme-card-border)" }}
              />
              <div>
                <div
                  className="bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, var(--theme-text-primary), #80E9FF)",
                  }}
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

      <CaseStudiesCssGrid cards={cards} filters={filters} />
    </div>
  );
}

function CaseStudiesCssGrid({
  cards,
  filters,
}: {
  cards: CaseStudyHubCard[];
  filters: string[];
}) {
  return (
    <section
      className="relative pb-32 pt-20 md:pt-24"
      style={{
        background: "var(--theme-section-alt)",
        transition: "background 300ms ease",
      }}
    >
      <style>{buildFilterCss(filters)}</style>
      <div className="ps-container">
        <fieldset className="relative border-0 p-0">
          <legend
            className="mb-3 text-xs font-medium uppercase tracking-[0.18em]"
            style={{ color: "var(--theme-text-muted)" }}
          >
            Filter by category
          </legend>

          <div className="mb-12 flex flex-wrap items-center gap-2">
            {filters.map((filter, index) => (
              <Fragment key={filter}>
                <input
                  className="ps-case-filter-input"
                  type="radio"
                  name="case-study-filter"
                  id={`ps-case-filter-${index}`}
                  defaultChecked={index === 0}
                />
                <label
                  className="ps-case-filter-chip"
                  htmlFor={`ps-case-filter-${index}`}
                >
                  {filter}
                </label>
              </Fragment>
            ))}

            <div className="ps-case-grid grid w-full gap-6 pt-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {cards.map((card, idx) => (
                <HubCard key={card.slug} card={card} index={idx} />
              ))}
            </div>
          </div>
        </fieldset>
      </div>
    </section>
  );
}

function HubCard({
  card,
  index,
}: {
  card: CaseStudyHubCard;
  index: number;
}) {
  const accent =
    index % 3 === 0
      ? "from-[#0D95E8]/15 to-[#0D95E8]/0"
      : index % 3 === 1
        ? "from-[#80E9FF]/12 to-[#80E9FF]/0"
        : "from-[#00D4AA]/10 to-[#00D4AA]/0";

  return (
    <div className={`ps-case-card-shell ${card.filterClass}`}>
      <a
        href={`/case-studies/${card.slug}`}
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
          {card.category}
        </div>

        {card.primary && (
          <div className="mt-5">
            <div
              className="bg-clip-text text-4xl font-semibold leading-none tracking-[-0.03em] text-transparent sm:text-5xl"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, var(--theme-text-primary), #0D95E8)",
              }}
            >
              {card.primary.value}
            </div>
            <div
              className="mt-2 text-xs uppercase tracking-[0.14em]"
              style={{ color: "var(--theme-text-secondary)" }}
            >
              {card.primary.label}
            </div>
          </div>
        )}

        <h3
          className="mt-7 text-balance text-xl font-semibold leading-snug"
          style={{ color: "var(--theme-text-primary)" }}
        >
          {card.clientNameDisplay}
        </h3>

        <p
          className="mt-3 flex-1 text-[15px] leading-relaxed"
          style={{ color: "var(--theme-text-secondary)" }}
        >
          {card.oneLine}
        </p>

        <div
          className="mt-7 flex items-center justify-between border-t pt-5"
          style={{ borderColor: "var(--theme-card-border)" }}
        >
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
      </a>
    </div>
  );
}
