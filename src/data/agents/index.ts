import type { AgentData, AgentCategory } from "@/types/agent";

// Revenue & Marketing
import { agent as customerReactivationAgent } from "./customer-reactivation-agent";
import { agent as socialMarketingAgent } from "./social-marketing-agent";
import { agent as marcommandEngine } from "./marcommand-engine";
import { agent as queryDominanceAgentSystem } from "./query-dominance-agent-system";

// Operations & Back-Office
import { agent as inventoryOperationsAgent } from "./inventory-operations-agent";
import { agent as invoiceProcessingAgent } from "./invoice-processing-agent";
import { agent as documentAnalysisAgent } from "./document-analysis-agent";
import { agent as bolRateConfirmationAgent } from "./bol-rate-confirmation-agent";

// Sales & Lead Capture
import { agent as afterHoursCallTriage } from "./after-hours-call-triage";
import { agent as leadPipelineAgent } from "./lead-pipeline-agent";
import { agent as submissionProcessingAgent } from "./submission-processing-agent";

// Analysis & Decision Support
import { agent as alphaMatrix } from "./alpha-matrix";
import { agent as trendBehavioralAnalysisAgent } from "./trend-behavioral-analysis-agent";
import { agent as emailDigestAgent } from "./email-digest-agent";
import { agent as robinHiringScreener } from "./robin-hiring-screener";
import { agent as fitnessWellnessAgent } from "./fitness-wellness-agent";
import { agent as giftingRecommendationAgent } from "./gifting-recommendation-agent";

// Engineering & Infrastructure
import { agent as agenticCodingSpecialists } from "./agentic-coding-specialists";
import { agent as localAiDeploymentAgent } from "./local-ai-deployment-agent";

/**
 * All agents in display order.
 *
 * Sort order (maps directly to the hub grid):
 *   1. Revenue & Marketing
 *   2. Operations & Back-Office
 *   3. Sales & Lead Capture
 *   4. Analysis & Decision Support
 *   5. Engineering & Infrastructure
 *
 * Within each category: alphabetical by name.
 *
 * Adding a new agent? Create a data file in this folder, import it here,
 * add it to the array in the correct category group, and create the matching
 * route under src/app/agents/[slug]/page.tsx. Slug becomes the route segment.
 */
export const agents: AgentData[] = [
  // 1. Revenue & Marketing
  customerReactivationAgent,
  marcommandEngine,
  queryDominanceAgentSystem,
  socialMarketingAgent,

  // 2. Operations & Back-Office
  bolRateConfirmationAgent,
  documentAnalysisAgent,
  inventoryOperationsAgent,
  invoiceProcessingAgent,

  // 3. Sales & Lead Capture
  afterHoursCallTriage,
  leadPipelineAgent,
  submissionProcessingAgent,

  // 4. Analysis & Decision Support
  alphaMatrix,
  emailDigestAgent,
  fitnessWellnessAgent,
  giftingRecommendationAgent,
  robinHiringScreener,
  trendBehavioralAnalysisAgent,

  // 5. Engineering & Infrastructure
  agenticCodingSpecialists,
  localAiDeploymentAgent,
];

export const agentBySlug: Record<string, AgentData> = Object.fromEntries(
  agents.map((a) => [a.slug, a])
);

export function getAgent(slug: string): AgentData | undefined {
  return agentBySlug[slug];
}

export const AGENT_CATEGORIES: AgentCategory[] = [
  "Revenue & Marketing",
  "Operations & Back-Office",
  "Sales & Lead Capture",
  "Analysis & Decision Support",
  "Engineering & Infrastructure",
];

export function agentsByCategory(category: AgentCategory): AgentData[] {
  return agents.filter((a) => a.category === category);
}
