import type { ProductData, ProductCategory } from "@/types/product";

// Revenue & Marketing
import { product as customerReactivationAgent } from "./customer-reactivation-agent";
import { product as socialMarketingAgent } from "./social-marketing-agent";
import { product as customerResearchAgent } from "./customer-research-agent";
import { product as outboundSalesAgent } from "./outbound-sales-agent";

// Operations & Back-Office
import { product as invoiceProcessingAgent } from "./invoice-processing-agent";
import { product as intelligentInventoryMonitoring } from "./intelligent-inventory-monitoring";
import { product as aiBookkeeper } from "./ai-bookkeeper";
import { product as complianceAgent } from "./compliance-agent";

// Sales & Lead Capture
import { product as businessTriageAgent } from "./business-triage-agent";
import { product as industrySpecificAgent } from "./industry-specific-agent";

// Intelligence & Decision Support
import { product as aiDigitalReceptionist } from "./ai-digital-receptionist";
import { product as businessForecastAgent } from "./business-forecast-agent";

// Flagship Platforms
import { product as marcommandEngine } from "./marcommand-engine";

// Custom & Infrastructure
import { product as customAgentDevelopment } from "./custom-agent-development";
import { product as localAiDeploymentAgent } from "./local-ai-deployment-agent";
import { product as agenticCodingSpecialists } from "./agentic-coding-specialists";

// Labs
import { product as fitnessWellnessAgent } from "./fitness-wellness-agent";
import { product as giftingRecommendationAgent } from "./gifting-recommendation-agent";

/**
 * All products in display order.
 *
 * Sort order (maps directly to the hub grid):
 *   1. Revenue & Marketing
 *   2. Operations & Back-Office
 *   3. Sales & Lead Capture
 *   4. Intelligence & Decision Support
 *   5. Flagship Platforms
 *   6. Custom & Infrastructure
 *   7. Labs (rendered separately)
 *
 * Adding a new product? Create a data file in this folder, import it here,
 * add it to the array in the correct category group, and create the matching
 * route under src/app/products/[slug]/page.tsx. Slug becomes the route segment.
 */
export const products: ProductData[] = [
  // 1. Revenue & Marketing
  customerReactivationAgent,
  socialMarketingAgent,
  customerResearchAgent,
  outboundSalesAgent,

  // 2. Operations & Back-Office
  invoiceProcessingAgent,
  intelligentInventoryMonitoring,
  aiBookkeeper,
  complianceAgent,

  // 3. Sales & Lead Capture
  businessTriageAgent,
  industrySpecificAgent,

  // 4. Intelligence & Decision Support
  aiDigitalReceptionist,
  businessForecastAgent,

  // 5. Flagship Platforms
  marcommandEngine,

  // 6. Custom & Infrastructure
  customAgentDevelopment,
  localAiDeploymentAgent,
  agenticCodingSpecialists,

  // 7. Labs
  fitnessWellnessAgent,
  giftingRecommendationAgent,
];

export const productBySlug: Record<string, ProductData> = Object.fromEntries(
  products.map((p) => [p.slug, p])
);

export function getProduct(slug: string): ProductData | undefined {
  return productBySlug[slug];
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "Revenue & Marketing",
  "Operations & Back-Office",
  "Sales & Lead Capture",
  "Intelligence & Decision Support",
  "Flagship Platforms",
  "Custom & Infrastructure",
  "Labs",
];

export function productsByCategory(category: ProductCategory): ProductData[] {
  return products.filter((p) => p.category === category);
}
