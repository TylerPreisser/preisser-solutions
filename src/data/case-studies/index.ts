import type { CaseStudyData, CaseStudySummary } from "@/types/case-study";

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

// Website Builds (canonical #22, #23, #24)
import { caseStudy as preisserSolutionsSite } from "./preisser-solutions-site";
import { caseStudy as tylerPreisserSite } from "./tyler-preisser-site";
import { caseStudy as rsquaredaiSite } from "./rsquaredai-site";

/**
 * Canonical, publishable case studies — order = hub display order.
 *
 * Sort order (the order maps directly onto the hub grid):
 *   1. Named client engagements (canonical #1–8)
 *   2. Internal AI platforms (canonical #9, #16, #17, #21)
 *   3. Internal operational tools (canonical #14, #15, #20)
 *   4. Pure capability offerings (canonical #10, #11, #12, #18, #19)
 *   5. Proof of concept (canonical #13)
 *   6. Website builds (canonical #22, #23, #24)
 *
 * Adding a new case study? Create a data file in this folder, import it here,
 * add it to the array in the correct group, and create the matching route
 * under src/app/case-studies/[slug]/page.tsx. Slug becomes the route segment.
 */
export const caseStudies: CaseStudyData[] = [
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
  rsquaredaiSite,
];

export const caseStudyBySlug: Record<string, CaseStudyData> = Object.fromEntries(
  caseStudies.map((cs) => [cs.slug, cs])
);

export function getCaseStudy(slug: string): CaseStudyData | undefined {
  return caseStudyBySlug[slug];
}

export function toSummary(cs: CaseStudyData): CaseStudySummary {
  return {
    slug: cs.slug,
    category: cs.category,
    clientNameDisplay: cs.clientNameDisplay,
    h1: cs.h1,
    oneLine: cs.oneLine,
    headlineResults: cs.headlineResults,
  };
}

export const caseStudySummaries: CaseStudySummary[] = caseStudies.map(toSummary);
