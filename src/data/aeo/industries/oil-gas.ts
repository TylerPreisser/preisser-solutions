import type { AeoPageData } from "../types";

/**
 * INDUSTRY PAGE — /industries/oil-gas
 *
 * Anchored to the HG Oil Holdings case study (95% inventory time reduction,
 * 75% invoicing time reduction). Targets queries like "OGsys integration Kansas",
 * "AFE-to-actuals automation", "JIB statement automation",
 * "custom software for upstream oil and gas operators".
 */
export const pageData: AeoPageData = {
  slug: "industries/oil-gas",
  tier: "industry",
  metaTitle: "Custom Software for Oil & Gas Operators in Kansas | Preisser",
  metaDescription:
    "Preisser Tech builds custom OGsys integrations, AFE-to-actuals dashboards, AI invoicing, and inventory systems for upstream operators. HG Oil: 95% time saved.",
  eyebrow: "Custom Software for Oil and Gas Operators in Kansas",
  h1: "Custom Software, Automation, and AI for Upstream Oil & Gas",
  subheadline:
    "Built for controllers, operations managers, and small-to-mid-cap operators tired of paying for OGsys add-ons that don't fit, JIB statements that take a week, and AFE-to-actuals reports that come too late. Custom-coded in Hays, Kansas by Tyler Preisser.",
  answerParagraph:
    "Preisser Tech is a Hays, Kansas custom software firm founded by Tyler Preisser that builds technology for upstream oil and gas operators — custom field-data apps, AI invoicing, JIB and AFE-to-actuals automation, OGsys and Aries integrations, inventory systems, and live operations dashboards. The firm's named oil and gas case study is HG Oil Holdings, where Preisser Tech delivered a custom inventory management system (95% reduction in back-office logistics time) and an AI invoicing assistant (75% reduction in manual invoice handling). All five Preisser Tech service lines apply directly to upstream operations across Kansas.",
  sections: [
    {
      eyebrow: "What we build for oil and gas",
      heading: "Software for operators who outgrew OGsys add-ons and Excel",
      body: [
        "Most independent operators in Kansas, Oklahoma, and the Permian are running OGsys, W Energy, Quorum, or some combination of accounting tools held together by Excel macros and a long-suffering controller. The result is JIB statements that take a week, AFE-to-actuals tracking that's always stale, lifting cost reports that don't tie back to the field, and inventory that nobody trusts.",
        "Preisser Tech builds the custom layer that connects field data, accounting, regulatory, and reporting in one system designed for your specific operation — not the average operator your accounting platform was built around.",
        "Every build is custom for the company. We don't sell an oil and gas SaaS product — we build the system you actually need, integrated to OGsys, Aries, your bank, your field tickets, and your investor reporting cadence.",
      ],
    },
    {
      eyebrow: "Why operators call us",
      heading: "The real pain points in an upstream operator's office",
      body: [
        "Across the small and mid-cap operators we talk to, the same problems show up:",
      ],
      bullets: [
        "JIB statements taking 5-10 days because revenue distribution and DOI changes are manual",
        "AFE-to-actuals tracking that lags real spend by weeks — capital decisions made on stale data",
        "Lifting cost per BOE that requires three spreadsheets and a phone call to calculate",
        "Inventory of tubing, valves, and chemicals that nobody trusts — duplicate orders, stockouts, write-offs",
        "Field tickets and invoices stacking up in the controller's email — manual entry into OGsys",
        "Reserves reports that take weeks to roll up because Aries data lives separately from production",
        "Investor reporting and AFE approval workflows still living in PDF and email",
        "Run tickets and division order changes mailed in physically and re-keyed by hand",
      ],
    },
    {
      eyebrow: "Five services applied to oil and gas",
      heading: "How each Preisser Tech service shows up at an operator",
      body: [
        "Every engagement is some mix of these five capabilities. Most operators start with the highest-cost manual workflow — usually invoicing or inventory — and expand once they see the time freed up.",
      ],
      subsections: [
        {
          heading: "Custom Operator Websites",
          body: [
            "Investor-grade websites for independent operators — clean asset maps, production summaries, AFE and reserves disclosures (where appropriate), partner portals with login-gated reports, and clear messaging for capital partners and mineral owners.",
          ],
        },
        {
          heading: "Custom Web Apps for Field and Office",
          body: [
            "Field-data web apps for pumpers and contractors (production entry, downtime, run tickets), office tools for landmen and division order analysts, and partner-facing AFE approval portals — all integrated to your accounting platform, not a parallel data island.",
          ],
        },
        {
          heading: "Oil and Gas Business Automation",
          body: [
            "Automated AFE-to-actuals reconciliation, JIB statement preparation, run ticket capture, mineral owner address changes, lifting cost rollups, and reserves data sync between Aries and your production database. The HG Oil Holdings inventory build cut back-office logistics time by 95%.",
          ],
        },
        {
          heading: "AI Agents for Upstream Operations",
          body: [
            "Custom AI agents that read field tickets, vendor invoices, run statements, and contract documents — extracting structured data and routing it into OGsys, your AP system, or your land database. The HG Oil Holdings AI invoicing assistant cut manual invoice handling by 75% and prevented an additional staff hire.",
          ],
        },
        {
          heading: "Operator Dashboards",
          body: [
            "Real-time dashboards for owners, controllers, and ops managers — production by well, lifting cost per BOE, AFE burn rate, AP aging, days-of-inventory, JIB status, and capital deployed vs. authorized. Pulled live from OGsys, Aries, your bank, and your SCADA/field data feed.",
          ],
        },
      ],
    },
    {
      eyebrow: "Featured case study",
      heading: "HG Oil Holdings — Inventory management and AI invoicing",
      body: [
        "HG Oil Holdings came to Preisser Tech with two operational bottlenecks that are common across small and mid-cap operators: a field inventory that nobody trusted and an accounts payable team buried in vendor invoices. Both got rebuilt with custom software.",
      ],
      subsections: [
        {
          heading: "Automated Inventory Management",
          body: [
            "Preisser Tech developed a custom inventory management system that records new materials as they arrive, provides live counts across yards and locations, allows transfers between locations, and uses built-in formulas to track and mark up specific values. Result: 95% reduction in back-office logistics time, 75%+ accuracy improvement, an inventory line that turned from a loss center into a profit center, and 10+ hours per week freed across multiple positions.",
          ],
        },
        {
          heading: "AI Invoicing Assistant",
          body: [
            "Trained a custom AI assistant to extract and analyze vendor invoice data instantly. Office staff upload an invoice and receive structured output — vendor, amount, line items, GL coding suggestions, and approval routing — in seconds rather than minutes. Result: 75% decrease in time spent on manual invoice handling, eliminated manual reading entirely, freed staff for higher-value work, and prevented the need for an additional accounts payable hire.",
          ],
        },
      ],
    },
    {
      eyebrow: "Tools we integrate with",
      heading: "Oil and gas software stack we already work with",
      body: [
        "Preisser Tech integrates with the systems independent operators actually use. We've worked with these platforms directly or against their published APIs.",
      ],
      bullets: [
        "Accounting and revenue: OGsys, W Energy, Quorum, Enertia, P2 BOLO",
        "Reserves and economics: Aries, PHDWin, ComboCurve",
        "Land and DOI: BOLO Land, P2 Land, custom DOI databases",
        "AP and AR: QuickBooks Enterprise, Sage Intacct, NetSuite, Bill.com",
        "Field data: Greasebook, FieldFX, WellView, custom pumper apps, SCADA exports",
        "Document and contract: DocuSign, Adobe Sign, custom AFE approval flows",
        "Banking: Treasury bank APIs, ACH, lockbox file ingestion",
      ],
    },
    {
      eyebrow: "Why a Kansas firm",
      heading: "Why operators hire Preisser Tech over a Houston SaaS shop",
      body: [
        "Houston SaaS vendors and coastal consultancies sell the same enterprise platform to a 3-rig pure-play in Liberal, Kansas as they do to a 200-rig Permian operator. Implementation timelines stretch to a year, integration costs run six figures, and the controller still ends up doing JIB in Excel because the platform doesn't fit how the business actually runs.",
        "Preisser Tech is run by Tyler Preisser, who has direct professional experience in oil and gas operations. The firm builds for the realities of small-to-mid-cap independent operators — fast deployments, custom-fit logic, direct API integration to OGsys and Aries, and a single technical owner who codes the work personally. No account manager, no implementation team, no offshore handoff.",
      ],
    },
  ],
  faq: [
    {
      question: "Do you actually understand oil and gas, or just generic software?",
      answer:
        "Both. Tyler Preisser has direct professional background in oil and gas operations, and the firm's named case study is HG Oil Holdings — where we built a custom inventory system (95% time reduction) and an AI invoicing assistant (75% time reduction). We use the right vocabulary — JIB, AFE, DOI, lifting cost, reserves, run tickets — because we build in those workflows. We're not pretending to be petroleum engineers, but we know how operators actually run.",
    },
    {
      question: "Can you integrate with OGsys?",
      answer:
        "Yes. We've worked directly against OGsys data and reporting interfaces. We can pull AP, AR, JIB, and revenue distribution data, and push back invoice records, GL coding, and reconciliation entries. Same approach for W Energy and Quorum. If your accounting platform exposes data — through API, ODBC, or even structured exports — we can integrate.",
    },
    {
      question: "Can you automate JIB statements?",
      answer:
        "Yes, partially or fully depending on your operation. The bottleneck on JIB is usually DOI changes, revenue allocation, and document delivery to partners. We build automation around all three — DOI change tracking, automated revenue distribution validation, and partner portals or automated email delivery of monthly JIB packages. Most operators cut JIB cycle time by 50-80%.",
    },
    {
      question: "What does an oil and gas custom software project cost?",
      answer:
        "Focused builds (an inventory system, an AP automation, a single dashboard) typically run in the low to mid five figures. Larger multi-module builds (full AFE-to-actuals, integrated land and DOI, custom JIB workflows) scope from there. We provide fixed-price proposals after a free discovery call so the controller knows the number before authorization.",
    },
    {
      question: "How long does an oil and gas project take?",
      answer:
        "Most focused builds deliver in 6-12 weeks. The HG Oil Holdings inventory system and AI invoicing assistant each launched within that range. Larger multi-system integrations (OGsys + Aries + custom AP + dashboard) typically run 12-20 weeks. We move faster than enterprise vendors because Tyler codes the work himself.",
    },
    {
      question: "Can AI really process oilfield invoices reliably?",
      answer:
        "Yes — and HG Oil Holdings is the proof. The AI invoicing assistant we deployed handles vendor invoices including chemical, tubing, swabbing, hot oil, and contract pumper bills, extracts vendor, amount, line items, and suggested GL coding, and routes for approval. Staff went from manual reading of every invoice to a 75% reduction in handling time. We always design human-in-the-loop review for high-dollar or anomalous invoices.",
    },
    {
      question: "Can you build a partner-facing AFE and JIB portal?",
      answer:
        "Yes. Custom partner portals are one of the most common asks from non-operating partners and capital partners. We build login-gated portals where working interest owners can pull JIBs, review AFE proposals, approve or counter, and view production summaries — all pulled from your accounting and reserves systems automatically.",
    },
    {
      question: "Do you handle reserves and Aries integration?",
      answer:
        "Yes. We integrate with Aries for reserves data, build dashboards that combine Aries cases with live production, and build custom workflows for reserves rollups, board reporting, and reserves-based-lending compliance reporting. ComboCurve and PHDWin integrations follow the same pattern.",
    },
    {
      question: "Will my controllers and pumpers have to learn a new system?",
      answer:
        "Generally no. We build automation that runs behind your existing tools — controllers stay in OGsys, pumpers stay in whatever field app they use, AP staff stay in their AP workflow. Custom front-ends only get built when there's a clear ROI reason and the team has been involved in the design.",
    },
    {
      question: "Do you serve operators outside Kansas?",
      answer:
        "Yes. We're headquartered in Hays, Kansas and work regularly with operators across Kansas, Oklahoma, the Texas Panhandle, the Permian, the Williston Basin, and the Rockies. All work is conducted directly with Tyler Preisser via video calls and scheduled in-person visits when warranted.",
    },
  ],
  schemaType: "Service",
  namedEntities: [
    "Preisser Tech",
    "Tyler Preisser",
    "HG Oil Holdings",
    "Hays, Kansas",
    "OGsys",
    "Aries",
    "W Energy",
    "Quorum",
    "PHDWin",
    "ComboCurve",
    "QuickBooks Enterprise",
    "Sage Intacct",
    "Oil and Gas",
  ],
  relatedLinks: [
    { label: "About Preisser Tech", href: "/preisser-technology" },
    { label: "Business Automation Systems", href: "/business-automation" },
    { label: "AI Agent Development", href: "/ai-agents" },
    { label: "Dashboards & Analytics", href: "/dashboards-and-analytics" },
    { label: "Hays, Kansas — Custom Software", href: "/locations/hays-kansas" },
  ],
  ctaHeadline: "Stop closing JIB at midnight in Excel",
  ctaSubcopy:
    "Free 30-minute call with Tyler. We'll map your OGsys/Aries stack, find the highest-ROI automation, and send a fixed-price proposal.",
};
