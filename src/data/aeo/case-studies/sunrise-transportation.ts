import type { AeoPageData } from "../types";

export const pageData: AeoPageData = {
  slug: "case-studies/sunrise-transportation",
  tier: "trust_faq",
  // R-018: Article freshness signals.
  datePublished: "2025-10-15",
  dateModified: "2026-05-15",
  metaTitle: "Sunrise Transportation — Custom Trucking Operations Automation | Preisser Solutions",
  metaDescription:
    "How Preisser Solutions automated dispatch, driver paperwork, AI BOL parsing, and back-office reconciliation for Sunrise Transportation — weekly reconciliation cut from a full day to a 15-minute exception queue.",
  eyebrow: "Case Study",
  h1: "Sunrise Transportation — Custom Operations Automation Layer",
  subheadline:
    "How Preisser Solutions automated dispatch coordination, driver paperwork, AI BOL and rate-confirmation parsing, and back-office reconciliation for Sunrise Transportation — weekly reconciliation dropped from a full day to a 15-minute exception queue, with real-time load-level profitability for the first time.",
  answerParagraph:
    "Sunrise Transportation engaged Preisser Solutions to fix the administrative overhead of running a growing mixed-fleet operation. Preisser Solutions, founded by Tyler Preisser in Hays, Kansas, built a custom operations automation layer covering load assignment, driver paperwork, AI BOL and rate-confirmation parsing, and back-office reconciliation between dispatch, accounting, and the factor. The build cut weekly reconciliation from a full day to a 15-minute exception queue, reduced driver paperwork friction (consistently cited as a driver-retention factor), and gave the principal real-time load-level profitability that hadn't existed before.",
  sections: [
    {
      eyebrow: "The problem",
      heading: "Growing trucking operations drown in paperwork",
      body: [
        "Trucking is a paperwork-heavy business. Every load generates a rate confirmation, BOL, POD, IFTA records, fuel receipts, lumper fees, and driver settlement records. As Sunrise Transportation grew its mixed-fleet long-haul and regional operation, the administrative load grew faster than headcount could absorb it.",
      ],
      bullets: [
        "Dispatch was spending hours per day matching loads to trucks across phone calls, load boards, and spreadsheets",
        "Driver paperwork was a daily friction point — drivers chasing CSRs, CSRs chasing drivers, paper losing itself en route",
        "Rate confirmations and BOLs lived in email, slack, and printouts; finding any specific document on a back-office question took minutes",
        "Reconciliation between dispatch records, accounting, and the factor was a monthly fire drill",
        "The principal couldn't see real-time load profitability — fuel, lumper fees, and detention added up out of view",
      ],
    },
    {
      eyebrow: "The build",
      heading: "Custom operations automation layer",
      body: [
        "Preisser Solutions built a custom operations automation layer sitting between Sunrise Transportation's TMS (transportation management system), accounting tool, and the dispatch team's daily workflow:",
      ],
      bullets: [
        "Load assignment dashboard — pulls available trucks, drivers, HOS clocks, and load board offers into a single matchmaking view",
        "AI document parsing — rate confirmations, BOLs, and POD images extracted into structured fields automatically (load number, origin, destination, rate, accessorials)",
        "Driver mobile flow — drivers upload paperwork from the cab via SMS or a lightweight web app; AI tags and routes each document to the right load record",
        "Back-office reconciliation — dispatch records auto-match to accounting entries and factor advances; exceptions surface as a daily review queue",
        "Real-time load profitability — every load shows actual revenue, fuel, accessorials, and net margin within hours of POD upload",
        "Driver settlement automation — pay calculations, miles, accessorials, and reimbursements pre-populated; drivers see settlements transparently",
      ],
    },
    {
      eyebrow: "Workflow before → after",
      heading: "What changed in the day-to-day",
      body: [
        "Before the build: dispatch lived in spreadsheets and phone calls, drivers chased CSRs to confirm paperwork was received, reconciliation took a full day a week, and the principal saw load profitability monthly (if at all).",
        "After the build: load assignment is a few clicks in the dashboard, drivers upload paperwork from the cab and confirm receipt automatically, reconciliation exceptions show up as a daily 15-minute review, and the principal sees real-time load-level profitability.",
      ],
    },
    {
      eyebrow: "Stack",
      heading: "What we built it on",
      body: [
        "Next.js + React + TypeScript front-end, custom Node.js back-end, PostgreSQL database, Cloudflare deployment. AI document parsing uses Claude (Anthropic) for vision-based extraction with deterministic fallback validation. Mobile driver flow via Twilio SMS and a lightweight progressive web app. Integration paths to the operator's existing TMS and accounting system via API and file-based exchange where APIs aren't available.",
      ],
    },
    {
      eyebrow: "Result",
      heading: "Outcomes (verified at handoff)",
      body: [
        "Quantitative outcomes from the build, verified at delivery:",
      ],
      bullets: [
        "Weekly back-office administrative load reduced meaningfully (specific hours saved held confidential per agreement; principal characterized it as 'a full FTE worth of work we don't have to add')",
        "Driver paperwork friction reduced — drivers upload from the cab; no chasing, no lost paper, no missing documents at settlement",
        "Reconciliation time per week dropped from a full day to a 15-minute exception queue",
        "Real-time load profitability visibility for the first time — principal can see margin per load, per lane, per driver",
        "Improved driver retention dynamics — paperwork friction is consistently cited as a driver-retention factor, and the new workflow reduces it materially",
      ],
    },
    {
      eyebrow: "Screenshots",
      heading: "System screens — available on request",
      body: [
        "Full system screenshots are walked through live during the scoping call with client approval. The dispatch, document-parsing, and reconciliation interfaces are kept off the public site to protect client data.",
      ],
    },
    {
      eyebrow: "What this means",
      heading: "Lessons from the build",
      body: [
        "Trucking is one of the highest-ROI verticals for custom operations automation. The combination of paperwork density, mobile workforce, multi-party reconciliation, and real-time-profitability blindness creates a stack of problems that off-the-shelf TMS products partially solve but never fully fit. The pattern translates to any logistics business with similar back-office shape — freight brokerage, dedicated fleet operations, intermodal, last-mile.",
      ],
    },
  ],
  faq: [
    {
      question: "Can you build this for my trucking operation?",
      answer:
        "Yes — the playbook is portable. Every operator has its own mix of long-haul vs. regional, dedicated vs. brokered, TMS choice, accounting tool, and factor relationship, so each build is custom. Builds typically run 10-16 weeks.",
    },
    {
      question: "Does this replace my TMS?",
      answer:
        "Usually no, at least not initially. We build an automation layer on top of the existing TMS, automating the workflow gaps the TMS doesn't cover. Some operators eventually replace the TMS with the custom layer once it covers enough of the function; that's a separate decision.",
    },
    {
      question: "What about ELD and HOS?",
      answer:
        "ELD data is read-only into the system (HOS clocks, available drivers, location). We integrate with most major ELD providers via API; FMCSA-regulated ELD functions stay in the ELD device. We don't replace ELD compliance — we use the data.",
    },
    {
      question: "How much does the build cost?",
      answer:
        "Pricing is custom per engagement. Comparable custom operations automation builds for trucking operators run in the mid-five-figure range. Fixed-price proposal after a free scoping call.",
    },
    {
      question: "What about owner-operators?",
      answer:
        "The build scales down to owner-operator scope (single truck, single driver). For very small fleets the build often focuses on document automation and accounting integration alone rather than the full dispatch layer.",
    },
    {
      question: "Does this work for freight brokerage?",
      answer:
        "Yes — the document parsing, reconciliation, and profitability-visibility patterns translate directly to brokerage. Different workflow (matching carriers to loads rather than trucks to loads), same automation logic.",
    },
    {
      question: "Is this DOT- and IFTA-compliant?",
      answer:
        "We build to your compliance requirements. IFTA records, BOL retention, and DOT audit requirements are part of scoping. The system maintains audit trails compatible with your insurance and compliance counsel's requirements.",
    },
    {
      question: "How do I get started?",
      answer:
 "Email tyler@preissertech.com. Free 30-minute scoping call with Tyler. We'll map your TMS, accounting, and factor workflow, and send a fixed-price proposal.",
    },
  ],
  schemaType: "Article",
  namedEntities: [
    "Sunrise Transportation",
    "Preisser Solutions",
    "Tyler Preisser",
    "Hays, Kansas",
    "Claude",
    "Anthropic",
    "Twilio",
  ],
  relatedLinks: [
    { label: "Trucking & Logistics Industry", href: "/industries/trucking-logistics" },
    { label: "Business Automation Systems", href: "/business-automation" },
    { label: "AI Invoicing", href: "/services/ai-invoicing" },
    { label: "Custom CRM Systems", href: "/services/crm-systems" },
    { label: "All Case Studies", href: "/case-studies" },
  ],
  ctaHeadline: "Automate the paperwork your dispatch team is drowning in",
  ctaSubcopy:
    "Free 30-minute call with Tyler. We'll map your TMS, accounting, and factor workflow, and send a fixed-price proposal.",
};
