import type { CaseStudyData } from "@/types/case-study";

// Canonical project #3 — HG Oil Holdings Automated Inventory Management System.
// Real. Built while Tyler was VP of Operations at HG Oil Holdings.
export const caseStudy: CaseStudyData = {
  slug: "hg-oil-inventory-system",
  metaTitle: "HG Oil Holdings — Inventory System",
  metaDescription:
    "HG Oil Holdings turned a loss center into a profit center with a custom inventory management platform — 95% logistics-time reduction, 75%+ accuracy lift.",
  datePublished: "2024-04-22",
  dateModified: "2026-05-20",

  category: "Business Software • Inventory Operations",
  clientName: "HG Oil Holdings",
  clientNameDisplay: "HG Oil Holdings",
  industry: "Oil and gas operations",

  h1: "HG Oil Holdings — Loss Center to Profit Center",
  subheadline:
    "A centralized inventory platform replaced a phone-call-and-spreadsheet process — 95% back-office time reduction, 75%+ accuracy improvement, and a recovered margin line.",
  oneLine: "95% logistics-time reduction, loss center to profit center",

  headlineResults: [
    { value: "95%", label: "Back-office time reduction" },
    { value: "75%+", label: "Inventory accuracy improvement" },
    { value: "Loss to Profit", label: "Operation converted" },
    { value: "10+ hrs/wk", label: "Staff hours freed" },
  ],

  hub: {
    problem:
      "Nobody could say what material was sitting at which site without phoning operators in the field, and transport and reconditioning costs were quietly eating the margin on stock that should have been an asset.",
    built:
      "A centralized, role-aware inventory application with live counts per site, inter-site transfers on a full audit trail, and cost formulas that revalue material as it moves and gets reconditioned.",
    outcome: "95% less back-office logistics time, 75%+ better inventory accuracy, and a loss center that now turns a margin",
  },

  before: {
    heading: "No centralized visibility, no live counts, no way to know what was where.",
    body: [
      "Before the build, HG Oil Holdings had no centralized inventory visibility across sites. There were no live counts. Knowing what was where required phone calls to operators in the field.",
      "Transportation and reconditioning costs were quietly eating margin. Materials that should have been recoverable assets were functionally sitting as liabilities on the books — because nobody could see them, value them, or move them between sites without a manual chain of calls and emails.",
    ],
  },

  built: {
    heading: "One link, live counts, codified cost formulas across every site.",
    body: [
      "Preisser Solutions built a centralized web application — accessible via a single link, role-aware across the operations team. It records all incoming materials, provides live inventory counts per site, and enables inter-site transfers with a full audit trail.",
      "Built-in cost formulas automatically track and mark up values as materials move and get reconditioned. The line that had previously been a loss center became measurable, manageable, and ultimately profitable.",
    ],
  },

  specifications: {
    heading: "What the platform does.",
    bullets: [
      "Custom web application with single-link access for every authorized user",
      "Live inventory counts per site, updated in real time as materials move",
      "Inter-site transfer tracking with full audit trail (who, what, when, where)",
      "Codified cost and markup formulas applied automatically per material type",
      "Multi-role access across operations, accounting, and management",
      "Replaces phone-call-driven reconciliation with self-serve visibility",
    ],
    subsections: [
      {
        title: "Inventory operations",
        items: [
          "All incoming materials recorded at point of arrival",
          "Live per-site counts visible to every authorized role",
          "Inter-site transfers logged with origin, destination, and quantity",
          "Reconditioning cycle tracked from arrival through sale",
        ],
      },
      {
        title: "Cost and margin tracking",
        items: [
          "Codified cost formulas applied automatically per material type",
          "Markup logic baked into the system — no manual recalculation",
          "Margin visibility per site and per material category",
          "Audit trail supports finance and operations reconciliation",
        ],
      },
    ],
  },

  results: [
    {
      value: "95%",
      label: "Reduction in back-office logistics time",
      context:
        "Back-office time spent tracking, calling, and reconciling logistics dropped by 95% once the platform went live.",
    },
    {
      value: "75%+",
      label: "Inventory accuracy improvement",
      context:
        "Inventory accuracy across sites improved by 75% or more — moving from rough estimates to live counts.",
    },
    {
      value: "Loss → Profit",
      label: "Operation converted",
      context:
        "An operational line that was running as a loss center was converted into a profitable, measurable unit.",
    },
    {
      value: "10+ hrs/wk",
      label: "Staff hours freed",
      context:
        "Over ten staff hours per week were freed up across the operations team — time previously lost to manual reconciliation.",
    },
  ],

  techStack: [
    "Custom web application",
    "Multi-site inventory model",
    "Inter-site transfer engine",
    "Cost-formula codification",
    "Role-based access control",
    "Audit trail logging",
  ],

  relatedSlugs: [
    "hg-oil-ai-invoice-processing",
    "chicago-bus-operator",
    "alliant-mgu-insurance",
  ],

  cta: {
    heading: "Have an operation that should be a profit center but isn't?",
    subcopy:
      "Preisser Solutions builds custom operational platforms that turn invisible costs into managed margin lines. Scoping begins with a conversation.",
    buttonLabel: "Start a scoping conversation",
    buttonHref: "/contact",
  },
};
