import type { ProductData } from "@/types/product";

export const product: ProductData = {
  slug: "intelligent-inventory-monitoring",
  metaTitle: "Intelligent Inventory Monitoring | Preisser Solutions",
  metaDescription:
    "Watches inventory across sites, detects discrepancies, tracks transfers with full audit trail, and produces monthly reports automatically — 95% back-office time reduction.",
  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  name: "Intelligent Inventory Monitoring",
  tagline:
    "Watches inventory across sites, flags discrepancies, produces monthly reports automatically.",
  category: "Operations & Back-Office",
  status: "production",
  industries: ["Oil and gas", "Field services", "Logistics", "Industrial operations"],

  h1: "Live inventory across every site — discrepancies flagged, reports automated.",
  subheadline:
    "A centralized inventory platform that provides real-time counts per site, tracks every inter-site transfer with a full audit trail, flags discrepancies when stock counts diverge from system records, and produces monthly reports automatically.",
  oneLine:
    "Replaces manual multi-site inventory tracking with live counts, automatic discrepancy detection, and monthly reporting.",
  headlineMetric: {
    value: "95%",
    label: "back-office logistics time reduction",
  },

  whatItDoes: [
    "Multi-site inventory without a centralized system creates two persistent problems: you never know what's actually where, and you find out about discrepancies only during audits — after the damage is done. The Intelligent Inventory Monitoring system solves both with real-time visibility and automated anomaly detection.",
    "The platform provides live inventory counts per site, updated on every intake and transfer. Every inter-site material movement is logged with timestamps, origin, destination, and responsible party — creating a complete chain of custody. Cost basis and markup formulas are codified into the system so margin calculations are consistent and automatic. When stock counts diverge from system records — whether from unlogged transfers, data entry errors, or actual loss — the system flags the discrepancy and alerts operations staff rather than waiting for an audit to find it.",
    "Monthly reports generate automatically: inventory position by site, transfer history, cost and markup summary, and discrepancy log. The system was built and proven at HG Oil Holdings, where it reduced back-office logistics tracking time by 95%, improved inventory accuracy by 75%+, and converted a loss-generating operation into a profit center. The same architecture deploys to any business managing physical assets across multiple locations.",
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
      title: "Discrepancy detection and alerts",
      description:
        "Monitors for anomalies when stock counts diverge from system records and alerts operations staff immediately rather than surfacing the problem during an audit.",
    },
    {
      title: "Codified cost and markup formulas",
      description:
        "Cost basis and markup logic are built into the system so every item's value calculates consistently — no manual spreadsheet math, no margin calculation errors.",
    },
    {
      title: "Automated monthly reporting",
      description:
        "Monthly inventory position, transfer history, cost summary, and discrepancy log generate automatically — no manual compilation required.",
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
    { label: "Discrepancy alert when counts diverge from system records", format: "Email / dashboard notification" },
    { label: "Per-item cost and markup calculations", format: "Web application / report" },
    { label: "Automated monthly inventory position report", format: "PDF / CSV export" },
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
      step: "Discrepancy monitoring",
      description:
        "The system continuously checks for divergence between logged counts and expected system records. Anomalies trigger immediate alerts rather than waiting for a scheduled audit.",
    },
    {
      step: "Automated reporting",
      description:
        "Monthly reports compile automatically — inventory position by site, transfer history, cost and markup summary, and discrepancy log — without manual assembly.",
    },
  ],
  useCases: [
    "Use this when your operations span multiple sites and the only way to know what's at each location is to call someone.",
    "Use this when inter-site material transfers are tracked inconsistently — or not at all — and reconciliation takes hours.",
    "Use this when cost-of-goods calculations are done in a spreadsheet and errors in that spreadsheet are silently affecting margin.",
    "Use this when an inventory audit reveals that what the spreadsheet says and what's on the floor are meaningfully different.",
    "Use this when monthly inventory reporting is a manual compilation exercise that takes days and still produces errors.",
  ],
  techStack: [
    "Custom web application",
    "Real-time database",
    "Discrepancy detection engine",
    "Role-based access control",
    "CSV import/export pipeline",
    "Automated cost formula engine",
    "Automated report generation",
  ],
  linkedCaseStudySlug: "hg-oil-inventory-system",
  relatedSlugs: [
    "invoice-processing-agent",
    "ai-bookkeeper",
    "compliance-agent",
  ],
  cta: {
    heading: "Want live inventory visibility with automatic discrepancy detection?",
    subcopy:
      "Preisser Solutions builds centralized inventory platforms configured to your sites, your materials, and your cost structure. The first conversation covers your current process and where it's breaking.",
    buttonLabel: "Scope this for my operation",
    buttonHref: "/contact?product=intelligent-inventory-monitoring",
  },
};
