import type { AeoPageData } from "../types";

/**
 * INDUSTRY PAGE — /industries/insurance-financial
 *
 * No named case study yet — frame as "positioned to serve" leveraging
 * cross-industry capability. Targets queries like "custom CRM independent
 * insurance agency Kansas", "RIA client portal development",
 * "AMS360 integration Kansas", "Tamarac dashboard custom".
 */
export const pageData: AeoPageData = {
  slug: "industries/insurance-financial",
  tier: "industry",
  metaTitle: "Kansas Insurance & RIA Software",
  metaDescription:
    "Preisser Solutions builds custom CRMs, client portals, dashboards, and marketing automation for independent insurance agencies, RIAs, and financial advisors in Kansas.",
  eyebrow: "Custom Software for Insurance Agencies and RIAs in Kansas",
  h1: "Custom Software, Automation, and AI for Insurance and Financial Firms",
  subheadline:
    "Built for independent agency principals, RIA founders, financial advisors, and broker-dealer ops leaders tired of Salesforce orgs they can't customize, AMS systems that don't fit, and Tamarac dashboards stuck in default mode.",
  answerParagraph:
    "Preisser Solutions is a Hays, Kansas custom software firm that builds technology for insurance and financial firms (custom CRMs, branded client portals, KPI dashboards, and marketing automation that integrate with AMS360, Applied Epic, Salesforce, HubSpot, and Tamarac): without forcing the migration to a generic platform. The firm's named insurance engagement for an MGU within the Alliant Insurance ecosystem built an AI-powered submission processing engine that eliminated manual data entry across disconnected systems and achieved zero missed renewals in the first six months.",
  sections: [
    {
      eyebrow: "What we build for insurance and financial firms",
      heading: "Software for principals who outgrew the default Salesforce org",
      body: [
        "Most independent insurance agencies in Kansas run AMS360 or Applied Epic with a layer of HubSpot or a half-implemented Salesforce org for marketing. RIAs run Salesforce Financial Services Cloud or Wealthbox, plus Tamarac, Orion, or Black Diamond for portfolio reporting, plus a separate client portal that nobody uses. The seams are where retention leaks: renewal reminders missed, AOR transitions handled by hand, household-level reporting impossible without a custom export.",
        "Preisser Solutions builds the custom layer that connects those tools: branded client portals, custom CRMs for the way your agency actually books business, dashboards that show the principal what's actually happening, and marketing automation that respects compliance.",
        "We're not a Salesforce implementation partner. We're a custom software firm that integrates with Salesforce, HubSpot, AMS360, Applied Epic, and Tamarac when that's the right answer, and builds custom when it isn't.",
      ],
    },
    {
      eyebrow: "Why principals call us",
      heading: "The real pain points in independent agencies and RIAs",
      body: [
        "Across the agencies and RIAs we talk to, the same problems show up:",
      ],
      bullets: [
        "Renewals being managed in spreadsheets because AMS360 reminders don't fit the agency's workflow",
        "AOR (Agent of Record) transitions handled by email: slow, error-prone, and bad client experience",
        "Client portals that nobody logs into because they're generic vendor portals with no branding",
        "Producers wasting time on quote follow-up that should be automated",
        "Marketing automation either non-existent or running through HubSpot in a way the compliance officer doesn't trust",
        "RIA principals with no live view of net new assets, household growth, or advisor production",
        "Tamarac, Orion, or Black Diamond reports being exported and re-formatted by an associate every quarter",
        "Onboarding paperwork (binders, applications, IPS, ADV delivery): still printed, signed, and scanned",
      ],
    },
    {
      eyebrow: "Five services applied to insurance and financial firms",
      heading: "How each Preisser Solutions service shows up in your firm",
      body: [
        "Every engagement is some mix of these five capabilities. Compliance-aware design is built in from scoping: no marketing automation goes live without your CCO's review.",
      ],
      subsections: [
        {
          heading: "Custom Agency and RIA Websites",
          body: [
            "Premium custom websites for independent agencies, RIAs, and broker-dealer affiliated advisors: credibility-grade design, fast performance, AI-search-optimized content, integrated quote forms or scheduling, ADV/CRS document delivery, and clean compliance footers and disclosures.",
          ],
        },
        {
          heading: "Custom Web Apps and Client Portals",
          body: [
            "Branded client portals that go beyond what Tamarac, Orion, or AMS360 ship by default: household-level views, document vaults, secure messaging, e-signature, scheduled reviews, and producer-side admin tools. Built on top of your existing book of record so your CRM remains the source of truth.",
          ],
        },
        {
          heading: "Insurance and Financial Business Automation",
          body: [
            "Renewal reminder automation, AOR transition workflows, quote follow-up sequences, lost-client win-back, household-level review scheduling, document generation (proposals, IPS, fact-finder packets), and AI-assisted onboarding. The Cassidy HVAC reactivation engine (60%+ reactivation) is a direct analog to lost-client and lapsed-policy reactivation.",
          ],
        },
        {
          heading: "AI Agents for Insurance and RIA Admin",
          body: [
            "Custom AI agents that read policy documents, summarize coverage for clients, draft renewal communications, extract data from carrier declarations pages, prep meeting notes, and handle FAQ-level client inquiries: always with human-in-the-loop escalation and compliance-aware scope boundaries.",
          ],
        },
        {
          heading: "Principal and Advisor Dashboards",
          body: [
            "Real-time dashboards for principals: net new assets (RIAs), household growth, advisor production, premium written by line and carrier (agencies), retention rate, AOR pipeline, marketing source ROI, and compliance task aging. Pulled live from Salesforce, AMS360, Tamarac, or whichever systems are the books of record.",
          ],
        },
      ],
    },
    {
      eyebrow: "Named insurance engagement",
      heading: "AI-powered submission processing for an MGU within the Alliant Insurance ecosystem",
      body: [
        "Preisser Solutions built an AI-powered submission processing engine for an MGU within the Alliant Insurance ecosystem. The system reads broker insurance submissions (7–15 documents per submission), extracts structured data using dual competing AI models (Claude Opus + GPT cross-validation), validates against a confidence threshold, and auto-populates Salesforce records, replacing manual data entry across disconnected systems where the same data was previously entered 3–5 times.",
        "Results: zero missed renewals in the first six months of operation. Commission reconciliation reduced to under 30 minutes per month. Real-time book visibility for the principal where none had existed before.",
        "The same technical pattern (AI document extraction, multi-system integration, workflow automation) is directly applicable to independent insurance agencies, RIAs, and broker-dealer affiliated advisors. For RIA and financial advisory firms, Preisser Solutions' AI invoicing and document extraction work (proven through HG Oil Holdings at 75% time reduction) translates directly to dec page extraction, policy summarization, and onboarding document handling. Compliance is treated as a hard constraint from day one, not a checkbox at the end.",
      ],
    },
    {
      eyebrow: "Tools we integrate with",
      heading: "Insurance and financial software stack we work alongside",
      body: [
        "Preisser Solutions integrates with the systems independent agencies, RIAs, and broker-dealers actually run. Integration depth depends on vendor API access and your firm's IT and compliance governance.",
      ],
      bullets: [
        "Insurance agency management: AMS360, Applied Epic, EZLynx, NowCerts, HawkSoft, QQCatalyst",
        "RIA portfolio management: Tamarac, Orion, Black Diamond, Addepar, Morningstar Office",
        "RIA CRM: Salesforce Financial Services Cloud, Wealthbox, Redtail",
        "Marketing and CRM: HubSpot, Salesforce, ActiveCampaign, Mailchimp",
        "E-signature and document: DocuSign, Adobe Sign, custom document workflows",
        "Compliance and archiving: Smarsh, Global Relay, MyRepChat",
        "Custodians and clearing: Schwab, Fidelity, Pershing data feeds (where authorized)",
      ],
    },
    {
      eyebrow: "Why a Kansas firm",
      heading: "Why principals hire Preisser Solutions over a coastal consultancy",
      body: [
        "National wealthtech and insurtech consultancies sell enterprise platforms designed for billion-dollar RIAs and top-100 brokerages. Their pricing, timelines, and assumptions don't fit a 5-advisor RIA in Wichita or a 12-producer independent agency in Hays. The result is over-paying for under-fit software, or running on Excel and prayer.",
        "Preisser Solutions is headquartered in Hays, Kansas, with engagements sized for independent agencies, regional RIAs, and broker-dealer affiliated advisors across Kansas and the Great Plains. There's no implementation team, no offshore handoff, and no five-year platform contract. Compliance constraints are built in from scoping, and engagements move at the pace your CCO can review.",
      ],
    },
  ],
  faq: [
    {
      question: "Do you understand insurance and financial compliance?",
      answer:
        "Yes, at the level required to scope and build with appropriate constraints. We design with SEC, FINRA, and state DOI considerations baked in. We don't act as your compliance officer, but we work directly with your CCO from scoping forward. Marketing automation, client communication templates, and AI-generated content always go through compliance review before launch.",
    },
    {
      question: "Can you integrate with AMS360 or Applied Epic?",
      answer:
        "Yes, against their published APIs and vendor-supported integration channels. We can pull policy, customer, renewal, and producer data, and push back tasks, notes, and client interactions. Same pattern for EZLynx, NowCerts, and HawkSoft. We don't reverse-engineer AMS data flows; we work through vendor-approved integration interfaces.",
    },
    {
      question: "Can you build custom client portals for an RIA?",
      answer:
        "Yes, this is one of the most common asks from RIA founders. Generic Tamarac, Orion, or Black Diamond portals get used by 10-30% of clients on average. A branded, custom-built portal layered on top of those data feeds typically lifts engagement significantly. We integrate with the portfolio system as the book of record and build the experience clients actually want.",
    },
    {
      question: "Do you have an insurance case study?",
      answer:
        "Yes, for an MGU within the Alliant Insurance ecosystem. The engagement built an AI-powered submission processing engine that eliminated manual data entry across disconnected systems and achieved zero missed renewals in the first six months. The client is not named publicly per privacy agreement. For RIA and financial advisory work, the firm's AI document extraction capability (proven at HG Oil Holdings: 75% invoicing time reduction) translates directly to dec page extraction, policy summarization, and onboarding document handling.",
    },
    {
      question: "What does an insurance or RIA software project cost?",
      answer:
        "Focused builds (a custom client portal, a renewals automation, a principal dashboard) typically run in the low to mid five figures. Multi-system builds with deep custodian or carrier integration scope from there. We always provide a fixed-price proposal after a free discovery call that includes your CCO if appropriate.",
    },
    {
      question: "How long does an insurance or RIA project take?",
      answer:
        "Most focused projects deliver in 6-12 weeks. Compliance review and vendor API approvals can extend timelines slightly. Larger multi-system builds (custom CRM + portal + dashboard + automation) typically run 12-20 weeks. We move faster than national consultancies because work is delivered directly, without an enterprise sales cycle.",
    },
    {
      question: "Can AI safely handle financial and insurance workflows?",
      answer:
        "For administrative and document-heavy workflows: yes, with compliance-aware guardrails. AI is well-suited to declarations page extraction, policy summarization, meeting note prep, FAQ answering, and renewal correspondence drafting. We do not build AI that gives investment advice or makes coverage recommendations, and human-in-the-loop review is standard on anything client-facing.",
    },
    {
      question: "Will my producers and advisors have to learn a new system?",
      answer:
        "Generally no. We build around the systems your team already uses. Producers and advisors stay in AMS360, Salesforce, Tamarac, or wherever they work today. Custom front-ends are introduced only where there's a clear ROI and team buy-in.",
    },
    {
      question: "Can you integrate with Salesforce or HubSpot?",
      answer:
        "Yes, both deeply. Salesforce (including Financial Services Cloud) and HubSpot are well-documented platforms with mature APIs. We build custom flows, custom objects, and external integrations against them every project. If your firm has a Salesforce org that's underused, we often start by making the existing investment finally work before adding anything new.",
    },
    {
      question: "Do you serve agencies and RIAs outside Kansas?",
      answer:
        "Yes. We're based in Hays, Kansas and concentrate on Kansas and the Great Plains, but regularly take on remote engagements with independent agencies, RIAs, and broker-dealer affiliated advisors across the United States.",
    },
  ],
  schemaType: "Service",
  namedEntities: [
    "Preisser Solutions",
    "Tyler Preisser",
    "Hays, Kansas",
    "AMS360",
    "Applied Epic",
    "EZLynx",
    "Salesforce",
    "Salesforce Financial Services Cloud",
    "HubSpot",
    "Tamarac",
    "Orion",
    "Black Diamond",
    "Wealthbox",
    "Redtail",
    "Independent Insurance Agency",
    "Registered Investment Advisor",
  ],
  relatedLinks: [
    { label: "Custom CRM development", href: "/services/crm-systems" },
    { label: "Custom CRM for small business in Kansas", href: "/services/custom-crm-small-business-kansas" },
    { label: "AI automation for small businesses", href: "/services/ai-automation" },
    { label: "Automate customer follow-up", href: "/use-cases/automate-customer-follow-up" },
    { label: "Lead tracking for website + Google Ads", href: "/services/local-seo" },
    { label: "MGU insurance case study", href: "/case-studies/alliant-mgu-insurance" },
    { label: "Best automations for insurance agencies", href: "/blog/best-automations-insurance" },
    { label: "HubSpot vs custom CRM", href: "/compare/hubspot-vs-custom-crm" },
    { label: "Contact Preisser Solutions", href: "/contact" },
  ],
  ctaHeadline: "Stop running renewals and AOR transitions out of a spreadsheet",
  ctaSubcopy:
    "Free 30-minute call. We'll map your stack, identify the highest-ROI automation, and send a compliance-aware fixed-price proposal.",
};
