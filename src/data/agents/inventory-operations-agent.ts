import type { AgentData } from "@/types/agent";

export const agent: AgentData = {
  slug: "inventory-operations-agent",
  metaTitle: "Inventory Operations Agent | Preisser Solutions",
  metaDescription:
    "Centralized live inventory across multiple sites with transfer tracking, codified cost and markup logic, and full audit trail — 95% back-office time reduction.",
  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  name: "Inventory Operations Agent",
  tagline:
    "Centralized live inventory across sites, transfer tracking, codified cost and markup logic.",
  category: "Operations & Back-Office",
  status: "production",
  industries: ["Oil and gas", "Field services", "Logistics", "Industrial operations"],

  h1: "Live inventory across every site — no phone calls, no spreadsheets.",
  subheadline:
    "A centralized inventory platform that provides real-time counts per site, tracks every inter-site transfer with a full audit trail, and applies codified cost and markup logic automatically.",
  oneLine:
    "Replaces phone-call-and-spreadsheet inventory with a live, multi-site platform that tracks costs and transfers automatically.",
  headlineMetric: {
    value: "95%",
    label: "back-office logistics time reduction",
  },

  whatItDoes: [
    "Multi-site inventory without a centralized system is a daily operational drag. When staff need to know what's at a site, they call. When materials move between locations, someone writes it down — maybe. When cost and markup calculations are done manually, errors compound. The operational overhead is invisible until the audit reveals what it's been costing.",
    "The Inventory Operations Agent replaces that process with a single web application accessible from any device. Every site's inventory is visible in real time from a single interface. Materials coming in are logged on intake. Inter-site transfers are tracked with timestamps and responsible parties. Cost formulas are codified into the system so markup calculations are consistent and automatic.",
    "The system was built and proven at HG Oil Holdings, where it reduced back-office logistics tracking time by 95%, improved inventory accuracy by 75%+, and converted what had been a loss-generating operation into a profit center. The same architecture deploys to any business managing physical assets across multiple locations.",
  ],
  capabilities: [
    {
      title: "Live multi-site inventory counts",
      description:
        "Real-time inventory visibility per site — no phone calls, no waiting for a report, no guessing what's actually on the floor.",
    },
    {
      title: "Intake logging and audit trail",
      description:
        "Every material entering any site is logged on intake with timestamps, quantities, and source documentation, creating a complete chain of custody.",
    },
    {
      title: "Inter-site transfer tracking",
      description:
        "Every transfer between sites is recorded with originating and receiving locations, transfer quantity, date, and responsible party — eliminating transfer discrepancies.",
    },
    {
      title: "Codified cost and markup formulas",
      description:
        "Cost basis and markup logic are built into the system so every item's value calculates consistently — no manual spreadsheet math, no margin calculation errors.",
    },
    {
      title: "Multi-role access control",
      description:
        "Role-based access lets operations staff, managers, and executives each see the view they need without exposing data or edit capability beyond their scope.",
    },
    {
      title: "Single-link universal access",
      description:
        "The entire platform is accessible via a single URL from any device — no software installation, no VPN required for field staff.",
    },
  ],
  inputs: [
    { label: "Existing inventory records (if any)", format: "CSV / spreadsheet" },
    { label: "Site locations and organizational structure", format: "Configuration" },
    { label: "Cost basis and markup formulas per material category", format: "Configuration / spreadsheet" },
    { label: "User roster and role assignments", format: "CSV / configuration" },
  ],
  outputs: [
    { label: "Live inventory count dashboard per site", format: "Web application" },
    { label: "Transfer log with full audit trail", format: "Web application / CSV export" },
    { label: "Per-item cost and markup calculations", format: "Web application / report" },
    { label: "Discrepancy and anomaly alerts", format: "Email / dashboard notification" },
    { label: "Inventory position report by site or organization-wide", format: "PDF / CSV export" },
  ],
  howItWorks: [
    {
      step: "Data migration and setup",
      description:
        "Existing inventory records are imported, sites are configured, cost formulas are codified, and user access roles are assigned.",
    },
    {
      step: "Intake logging",
      description:
        "As materials arrive at any site, staff log them in the system — quantities, source, and relevant specs — establishing the live count baseline.",
    },
    {
      step: "Live count maintenance",
      description:
        "The system maintains a running real-time count per site, updated automatically on every intake and transfer entry.",
    },
    {
      step: "Transfer tracking",
      description:
        "When materials move between sites, a transfer is logged with origin, destination, quantity, and responsible party — both sides of the move are updated instantly.",
    },
    {
      step: "Cost and margin reporting",
      description:
        "Codified formulas apply automatically to every item, producing cost-basis and markup data without manual calculation. Reports can be pulled on demand.",
    },
  ],
  useCases: [
    "Use this when your operations span multiple sites and the only way to know what's at each location is to call someone.",
    "Use this when inter-site material transfers are tracked inconsistently — or not at all — and reconciliation takes hours.",
    "Use this when cost-of-goods calculations are done in a spreadsheet and errors in that spreadsheet are silently affecting margin.",
    "Use this when an inventory audit reveals that what the spreadsheet says and what's on the floor are meaningfully different.",
    "Use this when operational scale is growing faster than your current manual tracking process can support.",
  ],
  techStack: [
    "Custom web application",
    "Real-time database",
    "Role-based access control",
    "CSV import/export pipeline",
    "Automated cost formula engine",
  ],
  linkedCaseStudySlug: "hg-oil-inventory-system",
  relatedSlugs: [
    "invoice-processing-agent",
    "document-analysis-agent",
    "bol-rate-confirmation-agent",
  ],
  cta: {
    heading: "Want live inventory visibility across your operation?",
    subcopy:
      "Preisser Solutions builds centralized inventory platforms configured to your sites, your materials, and your cost structure. The first conversation covers your current process and where it's breaking.",
    buttonLabel: "Scope this for my operation",
    buttonHref: "/contact?agent=inventory-operations-agent",
  },
};
