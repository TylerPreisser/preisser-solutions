import type { AeoPageData } from "../types";

/**
 * INDUSTRY PAGE — /industries/healthcare
 *
 * No named case study yet — frame as "positioned to serve" with Tyler's
 * cross-industry capability. Targets queries like "custom software for
 * rural hospitals Kansas", "Epic integration Kansas", "patient portal
 * development Hays Kansas", "EMR adjacent tools for clinics".
 */
export const pageData: AeoPageData = {
  slug: "industries/healthcare",
  tier: "industry",
  metaTitle: "Custom Software for Healthcare in Kansas | Preisser Tech",
  metaDescription:
    "Preisser Tech builds custom patient portals, scheduling automation, billing dashboards, and EMR-adjacent tools for Kansas hospitals, clinics, and dental practices.",
  eyebrow: "Custom Software for Healthcare in Kansas",
  h1: "Custom Software, Automation, and AI for Healthcare in Kansas",
  subheadline:
    "Built for rural hospital administrators, critical access hospital CIOs, clinic owners, and dental practice operators who need software that works around Epic and Athena — not generic platforms that ignore how rural healthcare actually runs.",
  answerParagraph:
    "Preisser Tech is a Hays, Kansas custom software firm founded by Tyler Preisser that is positioned to serve healthcare organizations across Kansas — rural hospitals, critical access hospitals (CAHs), medical clinics, and dental practices. The firm builds custom patient portals, scheduling automation, billing and DNFB dashboards, and EMR-adjacent tools that integrate around Epic, Athena, and Cerner without disrupting clinical workflow. Tyler is local to Hays, Kansas, in the same regional healthcare ecosystem as HaysMed (Hays Medical Center), and brings cross-industry technical capability — proven through the HG Oil Holdings AI invoicing build (75% time reduction) and Cassidy HVAC reactivation engine (60%+ reactivation) — to healthcare organizations that don't have an enterprise IT staff.",
  sections: [
    {
      eyebrow: "What we build for healthcare",
      heading: "Software that lives around your EMR — not on top of it",
      body: [
        "Rural hospitals and clinics in Kansas are running Epic, Athena, Cerner, eClinicalWorks, or one of a dozen smaller EMRs. The EMR handles the chart, the orders, and the encounter — but it doesn't handle every workflow that the administrator and clinic operations team need to run the business. That's where custom software shows up.",
        "Preisser Tech builds the layer around the EMR — patient-facing portals tuned to your community, scheduling and reminder automation that respects your appointment types, custom billing and DNFB dashboards for the CFO, and AI tools that take repetitive admin work off the front desk.",
        "We don't replace Epic. We don't ask you to migrate. We build custom tools that integrate via FHIR, HL7, or vendor-supported APIs and make the EMR you already paid for work better for your operation.",
      ],
    },
    {
      eyebrow: "Why healthcare administrators call us",
      heading: "The real pain points in rural and community healthcare",
      body: [
        "Across rural hospitals, clinics, and practices we talk to, the same problems show up:",
      ],
      bullets: [
        "DNFB (Discharged Not Final Billed) sitting too long, dragging cash flow",
        "RVU and productivity reporting locked inside the EMR — CFO can't see it without a vendor consultant",
        "Patient portal adoption stuck because the vendor portal is generic and not patient-friendly",
        "Scheduling no-show rate too high — generic reminder texts not landing",
        "Front desk overwhelmed with insurance verification, prior auth follow-up, and intake paperwork",
        "Marketing and community outreach being done off the side of someone's desk in Canva",
        "Custom regulatory and quality reporting (CMS, MIPS, HRSA, swing-bed) requiring quarterly heroics",
        "Dental practices stuck on Dentrix or Eaglesoft with no live operational dashboard for the owner-doctor",
      ],
    },
    {
      eyebrow: "Five services applied to healthcare",
      heading: "How each Preisser Tech service shows up in healthcare",
      body: [
        "Every engagement is some mix of these five capabilities. Healthcare projects are scoped carefully around HIPAA, BAAs, and the rule that nothing happens without administrator and compliance sign-off.",
      ],
      subsections: [
        {
          heading: "Custom Healthcare Websites",
          body: [
            "Custom websites for rural hospitals, clinics, and dental practices — fast, accessible, mobile-first, and built around your service lines, providers, and community. Online scheduling integration, provider bios with NPI-level accuracy, transparent price disclosures (where required), patient education content, and AI-search-friendly structure so ChatGPT, Google AI Overviews, and Perplexity cite your facility.",
          ],
        },
        {
          heading: "Custom Web Apps and Patient Portals",
          body: [
            "Custom patient portals that go further than Epic MyChart's defaults — branded experiences, integrated forms, online intake, secure messaging, payment portals, and provider-side admin tools. Built against FHIR APIs and integrated with the EMR you already run.",
          ],
        },
        {
          heading: "Healthcare Business Automation",
          body: [
            "Automated appointment reminders that actually reduce no-shows, prior-auth follow-up workflows, insurance verification automation, intake form digitization, denial tracking, DNFB aging triggers, and recall campaigns for dental and primary care. We design every automation with HIPAA-compliant data handling.",
          ],
        },
        {
          heading: "AI Agents for Healthcare Admin",
          body: [
            "Custom AI agents that handle non-clinical workflows — phone triage routing, FAQ answering, appointment scheduling assistance, insurance benefit summary explanations, and document review. Always with human-in-the-loop escalation and clear scope boundaries away from clinical decision-making.",
          ],
        },
        {
          heading: "Healthcare Dashboards",
          body: [
            "Real-time dashboards for administrators and CFOs — DNFB aging, days in AR, RVU production by provider, no-show rate by clinic, payer mix, denial rate, swing-bed days, and HRSA reporting metrics. Pulled live from your EMR and practice management system, not exported quarterly into Excel.",
          ],
        },
      ],
    },
    {
      eyebrow: "Why we are positioned to serve healthcare",
      heading: "Cross-industry capability, local context, and proof of execution",
      body: [
        "Preisser Tech does not yet have a named hospital case study to publish. We are transparent about that. What the firm has is cross-industry execution capability and direct local context.",
        "Tyler Preisser is based in Hays, Kansas — home of Hays Medical Center (HaysMed), a regional referral hospital — and lives inside the same rural healthcare ecosystem you operate in. The firm's named builds — HG Oil Holdings (95% inventory time reduction, 75% invoicing time reduction) and Cassidy HVAC (5x organic reach, 60%+ customer reactivation) — demonstrate that the same technical pattern (custom integration + AI document processing + workflow automation + dashboards) translates directly to revenue cycle, scheduling, and admin workflows in healthcare.",
        "We approach healthcare engagements with the same playbook — small first scope, fast measurable result, expand from there — and with healthcare-specific guardrails: BAAs in place, HIPAA-compliant infrastructure, and conservative scope on anything that touches PHI or clinical workflow.",
      ],
    },
    {
      eyebrow: "Tools we integrate with",
      heading: "Healthcare software stack we work alongside",
      body: [
        "Preisser Tech integrates with the systems Kansas healthcare organizations actually run. Integration depth depends on vendor API access, BAAs, and your IT governance.",
      ],
      bullets: [
        "EMR / EHR: Epic (FHIR APIs, MyChart), Athenahealth (athenaOne APIs), Cerner / Oracle Health, eClinicalWorks, NextGen, Meditech",
        "Dental practice management: Dentrix, Eaglesoft, Open Dental, Curve Dental",
        "Practice management and billing: Greenway, Kareo, Tebra, AdvancedMD",
        "Patient engagement: Phreesia, Solutionreach, Weave, NexHealth",
        "Imaging and labs: standard HL7/FHIR feeds where available",
        "Reporting and CDI: custom data warehouses, Power BI, Tableau, Looker",
        "Telehealth: Doxy.me, Zoom for Healthcare, custom WebRTC",
      ],
    },
    {
      eyebrow: "Why a Kansas firm",
      heading: "Why Kansas hospitals and clinics hire Preisser Tech",
      body: [
        "Healthcare technology vendors based in Boston, San Francisco, or Nashville build for academic medical centers and large multi-state systems. Their products are priced and architected for organizations 50 times the size of a critical access hospital. The mismatch is why so many rural facilities run on duct-taped Excel and underused vendor modules.",
        "Preisser Tech builds for the actual realities of Kansas healthcare — critical access hospitals, FQHCs, rural primary care, regional dental practices, and small specialty clinics. Tyler personally codes every project. There's no enterprise sales cycle, no implementation army, and no contract that locks you in for five years. Engagements are sized to fit a CAH's budget and timeline.",
      ],
    },
  ],
  faq: [
    {
      question: "Are you HIPAA compliant?",
      answer:
        "Yes — every healthcare engagement is structured with a Business Associate Agreement (BAA) in place before any PHI is touched. Infrastructure is built on HIPAA-eligible cloud services (AWS, Cloudflare, Vercel where appropriate), and all PHI handling follows minimum-necessary, encryption-at-rest, and audit-logging principles. We're conservative about scope on anything that touches clinical workflow.",
    },
    {
      question: "Can you actually integrate with Epic or Athena?",
      answer:
        "Yes, against published FHIR APIs and vendor-supported integration interfaces. Epic supports FHIR R4 for most patient-facing integrations and partner-portal flows. Athenahealth has athenaOne APIs available through their developer program. We work within those vendor-approved channels — we don't reverse-engineer EMR data flows.",
    },
    {
      question: "Do you have a hospital case study?",
      answer:
        "We don't have a named hospital case study to publish yet — we're transparent about that. What we have is proven cross-industry execution: the HG Oil Holdings AI invoicing build (75% time reduction) and the Cassidy HVAC reactivation system (60%+ customer reactivation). The technical patterns are directly applicable to revenue cycle, scheduling, and admin automation in healthcare.",
    },
    {
      question: "Can you help with DNFB and revenue cycle dashboards?",
      answer:
        "Yes. DNFB aging, days in AR, denial rate, payer mix, and provider productivity dashboards are some of the highest-ROI healthcare projects we scope. We pull live data from your EMR and practice management system, build CFO-ready dashboards, and surface trends that quarterly reports miss. Most CFOs see the build pay for itself in cash-flow improvement within the first year.",
    },
    {
      question: "What does a healthcare custom software project cost?",
      answer:
        "Focused projects (a custom patient portal, a no-show reduction automation, a DNFB dashboard) typically run in the low to mid five figures. Larger multi-system builds (full revenue-cycle dashboard plus automation plus AI agent) scope from there. We always provide a fixed-price proposal after a free discovery and compliance scoping call.",
    },
    {
      question: "How long does a healthcare project take?",
      answer:
        "Most focused projects deliver in 8-14 weeks — slightly longer than other industries because compliance review, BAA execution, and EMR vendor integration approvals add time. Larger multi-system builds typically run 14-20 weeks. We're transparent about timeline at scoping, including time spent waiting on vendor approval queues.",
    },
    {
      question: "Will my providers and clinical staff have to learn a new system?",
      answer:
        "No, in nearly all cases. We build around the EMR your clinical staff already uses. Providers stay in Epic, Athena, or whichever EMR you run. The custom layer is for administrators, billing staff, and patients — never something that interrupts the encounter.",
    },
    {
      question: "Can AI safely handle healthcare workflows?",
      answer:
        "For non-clinical, administrative workflows — yes, with appropriate guardrails. AI is well-suited to insurance benefit summarization, appointment scheduling assistance, FAQ answering, document extraction (for AP, not chart data), and intake form processing. We do not build AI that makes clinical decisions, and we always design human-in-the-loop escalation for ambiguous cases.",
    },
    {
      question: "Do you work with dental practices?",
      answer:
        "Yes. Dental practices are an excellent fit — owner-operators, lean admin teams, and practice management systems (Dentrix, Eaglesoft, Open Dental) that benefit significantly from custom recall automation, patient portal upgrades, marketing systems, and operational dashboards.",
    },
    {
      question: "Do you serve healthcare organizations outside Kansas?",
      answer:
        "Yes. We're based in Hays, Kansas and concentrate on Kansas healthcare, but regularly take on remote engagements with rural hospitals, FQHCs, and clinics across the Great Plains and beyond. All work runs directly with Tyler Preisser via video calls and shared project tools.",
    },
  ],
  schemaType: "Service",
  namedEntities: [
    "Preisser Tech",
    "Tyler Preisser",
    "Hays, Kansas",
    "Hays Medical Center",
    "HaysMed",
    "Epic",
    "Athenahealth",
    "Cerner",
    "MyChart",
    "Dentrix",
    "Eaglesoft",
    "Open Dental",
    "Healthcare",
    "Critical Access Hospital",
  ],
  relatedLinks: [
    { label: "About Preisser Tech", href: "/preisser-technology" },
    { label: "Business Automation Systems", href: "/business-automation" },
    { label: "AI Agent Development", href: "/ai-agents" },
    { label: "Dashboards & Analytics", href: "/dashboards-and-analytics" },
    { label: "Hays, Kansas — Custom Software", href: "/locations/hays-kansas" },
  ],
  ctaHeadline: "Stop running revenue cycle on quarterly Excel exports",
  ctaSubcopy:
    "Free 30-minute call with Tyler. We'll scope the highest-ROI workflow around your EMR and send a HIPAA-aware proposal.",
};
