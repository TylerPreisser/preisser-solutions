/**
 * The five service pillars — single source of truth for STRUCTURED DATA.
 *
 * ---------------------------------------------------------------------------
 * WHY THIS FILE EXISTS
 * ---------------------------------------------------------------------------
 * Before this file, `src/app/layout.tsx` hand-wrote an Organization
 * `makesOffer` array containing only THREE of the five pillars. The two
 * marketing-side pillars (Websites; Search/AI/Ads) were absent from the
 * Organization node entirely, so every engine reading our structured data saw
 * a company that does not build websites and does not do search work.
 *
 * ---------------------------------------------------------------------------
 * RENAMING A PILLAR
 * ---------------------------------------------------------------------------
 * The fifth pillar was renamed to "SEO AI Visibility Ad Management" on
 * 2026-09-05. `name` on the `search-ads` entry BELOW was the only change
 * needed in the SEO layer — the Organization `makesOffer` graph reads from
 * here, so the rename propagated to all 232 pages automatically.
 *
 * The pillar name ALSO appears once in presentation code, owned by another
 * team, as `title` in the `services` array of:
 *
 *     src/components/home/service-pillars.tsx   title: "AI and Search Engine Visibility."
 *
 * (That pointer deliberately carries NO line number any more. It said `:542`
 * while the title actually sat at `:547`, which is how a prose invariant rots:
 * it drifts, nobody notices, and by the time it matters it is pointing at the
 * wrong thing. The gate below is now the thing that holds the pair together.)
 *
 * That file is NOT imported here on purpose: it is a client component full of
 * JSX visuals, and pulling it into the metadata/schema layer would drag the
 * whole homepage bundle into every route's server graph. The home team should
 * import `SERVICE_PILLARS` from this file and render `.name` instead of the
 * literal, at which point there is exactly one string to change.
 *
 * Until they do, treat the two as a matched pair. Google's own guidance is
 * that structured data must match the visible text on the page
 * (developers.google.com/search/docs/appearance/ai-features, updated
 * 2025-12-10), so these must be renamed in the SAME commit — never one alone.
 *
 * ENFORCED, no longer merely requested: `scripts/validate-seo.mjs` compares all
 * five `name` values here against the five `title` values there (trailing period
 * aside) and exits non-zero if any pair disagrees. `npm run validate:seo` will
 * fail the moment one is renamed without the other.
 *
 * `type` mirrors the `ServicePillar.type` discriminator used by
 * service-pillars.tsx so the two lists can be zipped when that wiring happens.
 */

export interface ServicePillarSeo {
  /** Matches ServicePillar["type"] in src/components/home/service-pillars.tsx. */
  type: "software" | "automation" | "ai" | "web" | "search-ads";
  /**
   * Display name, WITHOUT the trailing period the homepage card adds.
   * This is the string that ships in JSON-LD `Service.name`.
   */
  name: string;
  /** schema.org Service.serviceType — a stable category, not marketing copy. */
  serviceType: string;
  /** schema.org Service.description. Kept factual and under ~320 chars. */
  description: string;
  /** Primary landing route for this pillar, root-relative. */
  path: string;
}

export const SERVICE_PILLARS: readonly ServicePillarSeo[] = [
  {
    type: "software",
    name: "Business Software",
    serviceType: "Custom business software development",
    description:
      "Admin dashboards, customer and member databases, client portals, and internal tools: the platform your team actually logs into, built for how your business works.",
    path: "/web-applications",
  },
  {
    type: "automation",
    name: "Business Automation",
    serviceType: "Business process automation",
    description:
      "Workflow automation for document pipelines, scheduled jobs, notifications and confirmations, and the system integrations that connect them: the work that happens without anyone doing it.",
    path: "/business-automation",
  },
  {
    type: "ai",
    name: "AI Integration",
    serviceType: "AI integration",
    description:
      "AI put exactly where it earns its place: reading and classifying documents, drafting with a human approval gate, and joining an existing workflow, never replacing judgment on anything that matters.",
    path: "/services/ai-automation",
  },
  {
    type: "web",
    name: "Websites",
    serviceType: "Custom website design and development",
    description:
      "Custom-coded sites in Next.js, React, and TypeScript. New builds and rebuilds of an existing site, including migrations off Wix, Squarespace, WordPress, GoDaddy, and Webflow with redirects mapped and search equity carried across before launch.",
    path: "/services/custom-websites",
  },
  {
    // Renamed 2026-09-05 to "SEO AI Visibility Ad Management", in the same commit
    // as the visible title in service-pillars.tsx, per the file header.
    type: "search-ads",
    name: "AI and Search Engine Visibility",
    serviceType: "Search engine optimization and answer engine optimization",
    description:
      "Getting found on the surfaces that matter now: the Google local pack, the AI assistants people ask instead of searching, and paid placement when volume is needed sooner than SEO can deliver it. Audit first, then a plan, then the work.",
    path: "/services/ai-search-optimization",
  },
] as const;
