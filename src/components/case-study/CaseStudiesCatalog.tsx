import Link from "next/link";

export interface CaseStudySummary {
  slug: string;
  category: string;
  group: string;
  clientNameDisplay: string;
  h1: string;
  oneLine: string;
  industry: string;
  metric?: {
    value: string;
    label: string;
  };
}

interface Props {
  caseStudies: CaseStudySummary[];
}

interface CategoryMeta {
  description: string;
  accentColor: string;
}

const CATEGORY_META: Record<string, CategoryMeta> = {
  "AI Automation": {
    description: "Agents and workflows that recover revenue, reduce manual work, and move faster than a human queue.",
    accentColor: "#80E9FF",
  },
  "Marketing Automation": {
    description: "Systems that turn strategy, content, and distribution into a repeatable engine.",
    accentColor: "#0D95E8",
  },
  "Custom Application Build": {
    description: "Custom software and dashboards built around the way the business actually operates.",
    accentColor: "#00D4AA",
  },
  "AI Document Processing": {
    description: "Invoice, document, and submission workflows where AI reads, extracts, and routes the work.",
    accentColor: "#6B7FFF",
  },
  "Custom CRM": {
    description: "Purpose-built CRM and policy systems for teams that outgrew spreadsheets and generic SaaS.",
    accentColor: "#0D95E8",
  },
  "Dashboards & BI": {
    description: "Operator dashboards, reconciliation tools, and decision surfaces built from real business data.",
    accentColor: "#00D4AA",
  },
  "Website Build": {
    description: "Custom-coded websites and media systems built for speed, conversion, and AI search.",
    accentColor: "#80E9FF",
  },
  "AI Commerce": {
    description: "Custom commerce and recommendation systems that go beyond a template storefront.",
    accentColor: "#6B7FFF",
  },
  "Internal Platform": {
    description: "Working internal systems that run Preisser Solutions and prove the delivery architecture.",
    accentColor: "#94A3B8",
  },
  "Internal Tool": {
    description: "Focused operational tools that remove repeated owner and team work.",
    accentColor: "#94A3B8",
  },
  "Capability": {
    description: "Reusable AI and automation patterns built from proven operating needs.",
    accentColor: "#0D95E8",
  },
  "Proof of Concept": {
    description: "Validated prototypes that show how a custom agent or product could work in the field.",
    accentColor: "#6B7FFF",
  },
};

const FALLBACK_META: CategoryMeta = {
  description: "Founder-led builds with real systems, real constraints, and documented outcomes.",
  accentColor: "#0D95E8",
};

export function CaseStudiesCatalog({ caseStudies }: Props) {
  const seen = new Set<string>();
  const groups = caseStudies
    .map((study) => study.group)
    .filter((group) => {
      if (seen.has(group)) return false;
      seen.add(group);
      return true;
    });
  const filters = ["All", ...groups];

  return (
    <div>
      <section
        className="relative isolate overflow-hidden"
        style={{ background: "var(--theme-section-switchable)" }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full bg-[#0D95E8] opacity-[0.12] blur-[120px]" />
          <div className="absolute top-40 -right-32 h-[420px] w-[420px] rounded-full bg-[#80E9FF] opacity-[0.08] blur-[100px]" />
          <div className="absolute bottom-0 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[#00D4AA] opacity-[0.06] blur-[100px]" />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(var(--theme-text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--theme-text-primary) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />

        <div className="ps-container relative pt-36 pb-14 sm:pt-40 sm:pb-16 lg:pt-44 lg:pb-20">
          <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.07] tracking-[-0.025em] sm:text-5xl md:text-6xl">
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, var(--theme-text-primary) 30%, #80E9FF 100%)" }}
            >
              Case Studies
            </span>
          </h1>

          <p
            className="mt-5 max-w-2xl text-pretty text-base leading-relaxed sm:text-lg"
            style={{ color: "var(--theme-text-secondary)" }}
          >
            Real Preisser Solutions builds, organized like the AI Agent Catalog:
            pick a category, scan the outcome, and open the full case study.
          </p>

          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 sm:mt-12">
            <div>
              <div
                className="bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl"
                style={{ backgroundImage: "linear-gradient(135deg, var(--theme-text-primary), #80E9FF)" }}
              >
                {caseStudies.length}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--theme-text-muted)" }}>
                Case studies
              </div>
            </div>
            <div className="h-10 w-px self-end" style={{ background: "var(--theme-card-border)" }} />
            <div>
              <div
                className="bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl"
                style={{ backgroundImage: "linear-gradient(135deg, var(--theme-text-primary), #80E9FF)" }}
              >
                100%
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--theme-text-muted)" }}>
                From real builds
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-28 pt-10" style={{ background: "var(--theme-section-alt)" }}>
        <div className="ps-container">
          <style>{buildCaseFilterCss(filters)}</style>

          <fieldset className="ps-case-filters relative border-0 p-0">
            {filters.map((filter) => (
              <input
                key={filter}
                className="ps-filter-input"
                type="radio"
                name="case-study-filter"
                id={`ps-case-filter-${toFilterSlug(filter)}`}
                defaultChecked={filter === "All"}
              />
            ))}

            <legend className="sr-only">Filter case studies by category</legend>
            <div className="ps-chips-wrapper">
              <div className="ps-chips-scroll">
                {filters.map((filter) => {
                  return (
                    <label
                      key={filter}
                      className="ps-chip"
                      htmlFor={`ps-case-filter-${toFilterSlug(filter)}`}
                      style={{
                        borderColor: "var(--theme-card-border)",
                        background: "var(--theme-card-bg)",
                        color: "var(--theme-text-secondary)",
                      }}
                    >
                      {filter}
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="ps-filter-content mt-10 space-y-20">
              {groups.map((group) => {
                const groupStudies = caseStudies.filter((study) => study.group === group);
                const meta = CATEGORY_META[group] ?? FALLBACK_META;
                return (
                  <div
                    key={group}
                    className="ps-filter-group"
                    data-filter-group={toFilterSlug(group)}
                  >
                    <div
                      className="mb-8"
                      style={{ borderTop: "1px solid var(--theme-card-border)", paddingTop: "1.75rem" }}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="mt-1 hidden shrink-0 sm:block"
                          style={{
                            width: "4px",
                            height: "48px",
                            borderRadius: "2px",
                            background: meta.accentColor,
                            opacity: 0.85,
                          }}
                        />
                        <div>
                          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <h2
                              className="text-2xl font-semibold leading-snug tracking-tight md:text-3xl"
                              style={{ color: "var(--theme-text-primary)" }}
                            >
                              {group}
                            </h2>
                            <span
                              className="font-mono text-[11px] font-medium uppercase tracking-[0.14em]"
                              style={{ color: "var(--theme-text-muted)" }}
                            >
                              {groupStudies.length} {groupStudies.length === 1 ? "study" : "studies"}
                            </span>
                          </div>
                          <p
                            className="mt-1 text-sm leading-relaxed"
                            style={{ color: "var(--theme-text-secondary)" }}
                          >
                            {meta.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {groupStudies.map((study) => (
                        <CaseStudyCard key={study.slug} study={study} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </fieldset>
        </div>
      </section>

      <section className="py-16 sm:py-20" style={{ background: "var(--theme-section-switchable)" }}>
        <div className="ps-container">
          <div
            className="relative overflow-hidden rounded-2xl border px-8 py-10 sm:px-12 sm:py-14"
            style={{
              borderColor: "var(--theme-card-border)",
              background: "var(--theme-card-bg)",
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#0D95E8] opacity-[0.08] blur-[80px]"
            />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div
                  className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em]"
                  style={{ color: "var(--color-primary)" }}
                >
                  Custom Builds
                </div>
                <h2
                  className="text-2xl font-semibold leading-snug tracking-tight sm:text-3xl"
                  style={{ color: "var(--theme-text-primary)" }}
                >
                  Want to be the next case study?
                </h2>
                <p
                  className="mt-2 max-w-lg text-base leading-relaxed"
                  style={{ color: "var(--theme-text-secondary)" }}
                >
                  Preisser Solutions maps the workflow, identifies the highest-ROI build, and sends a fixed-price proposal.
                </p>
              </div>
              <div className="shrink-0">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-[15px] font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-[0_8px_30px_rgba(13,149,232,0.3)]"
                  style={{ background: "var(--color-primary)" }}
                >
                  Start a scoping conversation
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function toFilterSlug(value: string) {
  if (value === "All") return "all";
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildCaseFilterCss(filters: string[]) {
  const rules = filters
    .map((filter) => {
      const slug = toFilterSlug(filter);
      const input = `#ps-case-filter-${slug}`;
      const label = `.ps-case-filters label[for="ps-case-filter-${slug}"]`;
      const checked = `${input}:checked ~ .ps-chips-wrapper ${label}`;
      const active =
        `${checked} { border-color: var(--color-primary); background: var(--color-primary); ` +
        "color: #FFFFFF; box-shadow: 0 8px 30px rgba(13,149,232,0.25); }";

      if (slug === "all") return active;

      return `${active}
${input}:checked ~ .ps-filter-content .ps-filter-group:not([data-filter-group="${slug}"]) { display: none; }`;
    })
    .join("\n");

  return `.ps-filter-input {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
${rules}`;
}

function CaseStudyCard({ study }: { study: CaseStudySummary }) {
  return (
    <div className="h-full">
      <Link
        href={`/case-studies/${study.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px_rgba(13,149,232,0.18)]"
        style={{
          borderColor: "var(--theme-card-border)",
          background: "var(--theme-result-card-bg)",
        }}
        aria-label={`${study.clientNameDisplay} case study`}
      >
        <div className="flex min-h-[220px] flex-col p-5">
          <div
            className="mb-3 text-[10px] font-medium uppercase tracking-[0.16em]"
            style={{ color: "var(--theme-text-muted)" }}
          >
            {study.category}
          </div>

          {study.metric && (
            <div className="mb-4">
              <div
                className="text-3xl font-semibold leading-none tracking-tight"
                style={{ color: "var(--color-primary)" }}
              >
                {study.metric.value}
              </div>
              <div
                className="mt-1 text-[11px] uppercase tracking-[0.12em]"
                style={{ color: "var(--theme-text-muted)" }}
              >
                {study.metric.label}
              </div>
            </div>
          )}

          <h3
            className="text-[16px] font-semibold leading-snug transition-colors duration-200 group-hover:text-[#80E9FF]"
            style={{ color: "var(--theme-text-primary)" }}
          >
            {study.clientNameDisplay}
          </h3>

          <p
            className="mt-2 flex-1 text-[13px] leading-relaxed"
            style={{ color: "var(--theme-text-secondary)" }}
          >
            {study.oneLine}
          </p>

          <div className="mt-5 flex items-center gap-1.5 text-[12px] font-medium text-[#0D95E8] transition-all duration-200 group-hover:gap-2 group-hover:text-[#80E9FF]">
            Read case study
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{ boxShadow: "inset 0 0 0 1px rgba(128,233,255,0.2)" }}
        />
      </Link>
    </div>
  );
}
