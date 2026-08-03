import type { CaseStudyData, CaseStudySummary } from "@/types/case-study";

// Flagship platforms — the three-pillar reposition showcase
// (docs/plans/2026-08-02-three-pillar-reposition.md)
import { caseStudy as farmbooks } from "./farmbooks";
import { caseStudy as c3Studio } from "./c3-studio";
import { caseStudy as nwksEncounter } from "./nwks-encounter";

// Named client engagements (canonical #1–8)
import { caseStudy as cassidyReactivation } from "./cassidy-hvac-reactivation";
import { caseStudy as cassidyMarketing } from "./cassidy-hvac-marketing-engine";
import { caseStudy as hgOilInventory } from "./hg-oil-inventory-system";
import { caseStudy as hgOilInvoice } from "./hg-oil-ai-invoice-processing";
import { caseStudy as alliantMgu } from "./alliant-mgu-insurance";
import { caseStudy as chicagoBus } from "./chicago-bus-operator";
import { caseStudy as ironAndOak } from "./iron-and-oak-podcast";
import { caseStudy as wifeSupply } from "./wife-supply-co";

// Internal Platforms (canonical #9, #16, #17, #21)
import { caseStudy as marcommand } from "./marcommand";
import { caseStudy as agenticCoding } from "./agentic-coding-specialists";
import { caseStudy as alphaMatrix } from "./alpha-matrix";
import { caseStudy as queryDominance } from "./query-dominance";

// Internal Tools (canonical #14, #15, #20)
import { caseStudy as emailDigest } from "./ai-email-digest";
import { caseStudy as hiringRobin } from "./hiring-pipeline-robin";
import { caseStudy as contactFormPipeline } from "./contact-form-crm-pipeline";

// Capabilities (canonical #10, #11, #12, #18, #19)
import { caseStudy as afterHoursTriage } from "./after-hours-call-triage";
import { caseStudy as invoiceProcessingPlatform } from "./ai-invoice-processing-platform";
import { caseStudy as documentAnalysis } from "./ai-document-analysis";
import { caseStudy as localAiModels } from "./custom-local-ai-models";
import { caseStudy as trendAnalysis } from "./ai-trend-behavioral-analysis";

// Proof of Concept (canonical #13)
import { caseStudy as fitnessAgent } from "./ai-fitness-wellness-agent";

// Website Builds (canonical #22, #23)
import { caseStudy as preisserSolutionsSite } from "./preisser-solutions-site";
import { caseStudy as tylerPreisserSite } from "./tyler-preisser-site";

/**
 * Every published case study — one entry per /case-studies/<slug> route.
 *
 * This is the full registry, NOT the hub grid. The grid is `hubSlugs` below.
 * Entries stay here even when they are off the grid, because each has a live
 * indexed route and because `getCaseStudy` backs the product pages.
 *
 * Grouping:
 *   0. Flagship platforms (FarmBooks, C3 Studio, NWKS Encounter)
 *   1. Named client engagements (canonical #1–8)
 *   2. Internal AI platforms (canonical #9, #16, #17, #21)
 *   3. Internal operational tools (canonical #14, #15, #20)
 *   4. Pure capability offerings (canonical #10, #11, #12, #18, #19)
 *   5. Proof of concept (canonical #13)
 *   6. Website builds (canonical #22, #23)
 *
 * Adding a new case study? Create a data file in this folder, import it here,
 * add it to the array in the correct group, and create the matching route
 * under src/app/case-studies/[slug]/page.tsx. Slug becomes the route segment.
 * If it is a real client engagement, also add the slug to `hubSlugs` and give
 * the data file a `hub` block.
 */
export const caseStudies: CaseStudyData[] = [
  // 0. Flagship platforms
  farmbooks,
  c3Studio,
  nwksEncounter,

  // 1. Named client engagements
  cassidyReactivation,
  cassidyMarketing,
  hgOilInventory,
  hgOilInvoice,
  alliantMgu,
  chicagoBus,
  ironAndOak,
  wifeSupply,

  // 2. Internal AI platforms
  marcommand,
  agenticCoding,
  alphaMatrix,
  queryDominance,

  // 3. Internal operational tools
  emailDigest,
  hiringRobin,
  contactFormPipeline,

  // 4. Pure capability offerings
  afterHoursTriage,
  invoiceProcessingPlatform,
  documentAnalysis,
  localAiModels,
  trendAnalysis,

  // 5. Proof of concept
  fitnessAgent,

  // 6. Website builds
  preisserSolutionsSite,
  tylerPreisserSite,
];

export const caseStudyBySlug: Record<string, CaseStudyData> = Object.fromEntries(
  caseStudies.map((cs) => [cs.slug, cs])
);

export function getCaseStudy(slug: string): CaseStudyData | undefined {
  return caseStudyBySlug[slug];
}

/**
 * What appears on the /case-studies grid — and nothing else.
 *
 * The hub answers exactly one question for a prospect: "has he solved a
 * problem like mine, for a business like mine." Only real engagements and
 * substantial delivered platforms qualify. Internal tooling, proofs of
 * concept, capability blurbs with no client, and our own website builds are
 * deliberately NOT listed here.
 *
 * Everything left out stays fully reachable at /case-studies/<slug> — those
 * routes are indexed, they are their own page.tsx files, and they remain in
 * `caseStudies` above so `getCaseStudy` (used by the 16 product pages) keeps
 * resolving. This list controls the grid only.
 *
 * Order = display order. Anything added here MUST define `hub` in its data
 * file, or the card renders without the four buyer questions.
 */
export const hubSlugs: string[] = [
  // Flagship platforms
  "farmbooks",
  "c3-studio",
  "nwks-encounter",

  // Named client engagements
  "hg-oil-inventory-system",
  "hg-oil-ai-invoice-processing",
  "alliant-mgu-insurance",
  "chicago-bus-operator",
  "cassidy-hvac-reactivation",
  "iron-and-oak-podcast",
  "wife-supply-co",
];

export const hubCaseStudies: CaseStudyData[] = hubSlugs
  .map((slug) => caseStudyBySlug[slug])
  .filter((cs): cs is CaseStudyData => Boolean(cs));

export function toSummary(cs: CaseStudyData): CaseStudySummary {
  return {
    slug: cs.slug,
    category: cs.category,
    clientNameDisplay: cs.clientNameDisplay,
    industry: cs.industry,
    h1: cs.h1,
    oneLine: cs.oneLine,
    headlineResults: cs.headlineResults,
    hub: cs.hub,
  };
}

/** Summaries for the hub grid — the curated roster, not every data file. */
export const caseStudySummaries: CaseStudySummary[] =
  hubCaseStudies.map(toSummary);

/** Every published case study, including the ones kept off the hub grid. */
export const allCaseStudySummaries: CaseStudySummary[] =
  caseStudies.map(toSummary);
