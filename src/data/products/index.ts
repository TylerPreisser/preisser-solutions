import type { ProductData, ProductCategory } from "@/types/product";

// Marketing & Growth
import { product as customerReactivationAgent } from "./customer-reactivation-agent";
import { product as socialMarketingAgent } from "./social-marketing-agent";
import { product as customerResearchAgent } from "./customer-research-agent";
import { product as outboundSalesAgent } from "./outbound-sales-agent";
import { product as marcommandEngine } from "./marcommand-engine";

// Operations & Back-Office
import { product as invoiceProcessingAgent } from "./invoice-processing-agent";
import { product as intelligentInventoryMonitoring } from "./intelligent-inventory-monitoring";
import { product as aiBookkeeper } from "./ai-bookkeeper";
import { product as complianceAgent } from "./compliance-agent";

// Sales & Customer Service
import { product as businessTriageAgent } from "./business-triage-agent";
import { product as industrySpecificAgent } from "./industry-specific-agent";
import { product as aiDigitalReceptionist } from "./ai-digital-receptionist";

// Decision Intelligence
import { product as businessForecastAgent } from "./business-forecast-agent";

// Custom Builds
import { product as customAgentDevelopment } from "./custom-agent-development";
import { product as localAiDeploymentAgent } from "./local-ai-deployment-agent";
import { product as agenticCodingSpecialists } from "./agentic-coding-specialists";

/**
 * All products in display order.
 *
 * Sort order (maps directly to the hub grid):
 *   1. Marketing & Growth
 *   2. Operations & Back-Office
 *   3. Sales & Customer Service
 *   4. Decision Intelligence
 *   5. Custom Builds
 *
 * Adding a new product? Create a data file in this folder, import it here,
 * add it to the array in the correct category group, and create the matching
 * route under src/app/products/[slug]/page.tsx. Slug becomes the route segment.
 */
export const products: ProductData[] = [
  // 1. Marketing & Growth
  customerReactivationAgent,
  socialMarketingAgent,
  customerResearchAgent,
  outboundSalesAgent,
  marcommandEngine,

  // 2. Operations & Back-Office
  invoiceProcessingAgent,
  intelligentInventoryMonitoring,
  aiBookkeeper,
  complianceAgent,

  // 3. Sales & Customer Service
  businessTriageAgent,
  industrySpecificAgent,
  aiDigitalReceptionist,

  // 4. Decision Intelligence
  businessForecastAgent,

  // 5. Custom Builds
  customAgentDevelopment,
  localAiDeploymentAgent,
  agenticCodingSpecialists,
];

export const productBySlug: Record<string, ProductData> = Object.fromEntries(
  products.map((p) => [p.slug, p])
);

export function getProduct(slug: string): ProductData | undefined {
  return productBySlug[slug];
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "Marketing & Growth",
  "Operations & Back-Office",
  "Sales & Customer Service",
  "Decision Intelligence",
  "Custom Builds",
];

export function productsByCategory(category: ProductCategory): ProductData[] {
  return products.filter((p) => p.category === category);
}
