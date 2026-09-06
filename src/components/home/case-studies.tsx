"use client";

import { useEffect, useRef, useState } from "react";

interface CaseStudyCard {
  title: string;
  tags: string;
  description: string;
  gradient: string;
  image?: string;
  // Intrinsic pixel dimensions of `image` — required alongside `image` so the
  // <img> can carry width/height and reserve layout space before it loads.
  imageWidth?: number;
  imageHeight?: number;
  caseLogo?: string;
  // Intrinsic pixel dimensions of `caseLogo`.
  caseLogoWidth?: number;
  caseLogoHeight?: number;
  svgIcon?: React.ReactNode;
  lightCard?: boolean;
  /** Extra class on the logo img — lets one card opt out of the shared silhouette treatment. */
  logoClass?: string;
  /** Wordmark set under the logo, for marks that are an icon with no type in them. */
  logoWordmark?: string;
  /** Our own internal case-study page. Never a third-party destination. */
  href?: string;
  /**
   * The client's own public site, opened in a new tab from the bottom of the
   * revealed panel. Governed by DECISIONS/0002: a card only gets one when the
   * URL resolves 2xx AND the client is not one we anonymize. Deliberately a
   * separate field from `href` — several cards depend on `href` meaning "our
   * case-study page", and overloading it would send visitors off-site from a
   * link that reads as internal.
   */
  liveUrl?: string;
  /**
   * One outcome line shown on the CLOSED card face. Stage 2 of the conversion
   * plan: the section is headed "Real Projects. Real Results." but a closed
   * card showed only a logo and a tap affordance, putting every result one tap
   * deep.
   *
   * Every value is a VERBATIM substring of that card's own `description` — no
   * new copy is written here (ADR-0009). It is a separate field rather than a
   * truncation of `description` for two reasons: `data-density` is computed
   * from `description.length`, so a separate field leaves the size buckets
   * untouched by construction; and a truncated description reads as a sentence
   * cut off rather than a claim made.
   *
   * FarmBooks deliberately has none: every outcome sentence in it carries one
   * of the three frozen claims, and repeating one on the closed face would
   * change their built-HTML counts.
   */
  outcome?: string;
  /**
   * Per-icon vertical ink correction, as a length (e.g. "-7.32%").
   *
   * The icon BOX is centred exactly (verified: geomDY 0.00 on all 18 cards),
   * but a few inline SVGs draw their artwork off-centre inside their own
   * viewBox, so the drawn pixels land off-centre while the box is perfect.
   * Only set this where the icon is a SINGLE visual mass that genuinely sits
   * high or low. Do NOT set it to cancel an ink-bbox offset caused by a small
   * badge or foot in one corner — on those the primary shape is already
   * centred and a nudge would visibly push it off (cards 9, 10, 11, 15 and 16
   * are all that case; measured, then confirmed by eye against a centre
   * crosshair, 2026-09-05).
   *
   * Expressed in PERCENT of the icon's own box so it stays correct at both
   * the 100px mobile and 120px desktop icon sizes.
   */
  iconNudgeY?: string;
}

/** "https://farm-books.com/" -> "farm-books.com", for a link label that says where it goes. */
function liveUrlLabel(url: string): string {
  return url
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/+$/, "");
}

// Order is deliberate: the three shipped internal platforms lead, then the
// operational client wins, then the internal tooling. Every claim below is
// verified in docs/plans/2026-08-02-three-pillar-reposition.md §9 — do not add
// a number that is not on that list. The two anonymized clients stay anonymized.
const caseStudyCards: CaseStudyCard[] = [
  // FarmBooks — flagship. Document pipeline + Schedule-F-ready books.
  {
    title: "FarmBooks",
    outcome: "Tax season stopped being a data-entry month.",
    tags: "Farming | Document Pipeline | Bookkeeping",
    description:
      "A farm bookkeeper was retyping every co-op and dealer bill into a spreadsheet by hand, line by line, field by field, ahead of every tax season. Now a phone photo of the bill becomes categorized, Schedule-F-ready books. Anything the system is not certain about, and anything handwritten, goes to a person instead of being guessed at. Tax season stopped being a data-entry month.",
    // FarmBooks' own palette, not ours: its manifest declares #F2F2F7 and the
    // mark is gold #C9A227. Card runs light so the gold reads as the gold.
    gradient: "linear-gradient(150deg, #FDFCF7 0%, #F2F2F7 55%, #E8E4D6 100%)",
    lightCard: true,
    // No `href` on purpose. The card used to carry a "Read the case study"
    // link to /case-studies/farmbooks alongside the live link; the owner asked
    // for the case-study link off this card (2026-09-03) — with the real
    // product one tap away, a write-up about it is the weaker destination.
    // The /case-studies/farmbooks ROUTE still exists and stays in the sitemap;
    // only the card's link to it is gone. Do not "restore" this href.
    // Verified 2026-09-03: https://farm-books.com -> 200. See DECISIONS/0002.
    liveUrl: "https://farm-books.com",
    // Real FarmBooks mark — the actual PWA icon shipped at farm-books.com
    // (web/app/icon.svg, declared in web/app/manifest.ts).
    caseLogo: "/images/case-studies/farmbooks-logo.svg",
    caseLogoWidth: 48,
    caseLogoHeight: 48,
    logoClass: "ps-work-card-logo--farmbooks",
    logoWordmark: "FarmBooks",
  },
  // Alliant Insurance ecosystem MGU: AI Submission Processing (anonymized per privacy rules)
  {
    title: "An MGU Within the Alliant Insurance Ecosystem",
    outcome: "Zero missed renewals in the first six months.",
    tags: "AI Submission Processing | Insurance | Salesforce + Azure AI",
    description:
      "AI engine reads broker submissions (7–15 documents per submission), extracts structured data using dual competing AI models (Claude Opus + GPT cross-validation), and auto-populates Salesforce records. Eliminated manual data entry across systems where the same data was previously entered 3–5 times. Zero missed renewals in the first six months.",
    gradient: "linear-gradient(135deg, #0a1f3c 0%, #1590FF 100%)",
    caseLogo: "/images/case-studies/astrus-logo.png",
    caseLogoWidth: 2066,
    caseLogoHeight: 530,
  },
  // Chicago-area bus transportation operator: Power BI + Ops Automation (anonymized per privacy rules)
  {
    title: "A Chicago-Area Bus Transportation Operator",
    outcome: "Weekly reconciliation dropped from a full day",
    tags: "Power BI Dashboards | Ops Automation | Dispatch + AI Parsing",
    description:
      "Five Power BI dashboards (workforce planning, revenue/EBITDA, safety scorecard, FY26 goals, and routes/runs), plus AI BOL parsing, rate-confirmation parsing, and back-office reconciliation automation. Weekly reconciliation dropped from a full day to a 15-minute exception queue, with real-time load-level profitability for the first time.",
    gradient: "linear-gradient(135deg, #0F2744 0%, #1a3a6e 100%)",
    caseLogo: "/images/case-studies/sunrise-transportation-logo.svg",
    caseLogoWidth: 150,
    caseLogoHeight: 64,
  },
  // Iron and Oak Podcast
  {
    title: "The Iron and Oak Podcast",
    outcome: "Designed and built the full cinematic media brand",
    tags: "Custom Media Brand | 134 Pages | GSAP Cinematic",
    description:
      "Designed and built the full cinematic media brand from concept to launch: custom design system, 134 pre-rendered pages, GSAP-powered smooth scroll, dark and light modes, and a content architecture spanning 12 episodes and 109 questions.",
    gradient: "linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #0f2010 100%)",
    image: "iron-oak.webp",
    imageWidth: 2048,
    imageHeight: 2048,
    // Verified 2026-09-03: https://theironandoakpodcast.com -> 200. See DECISIONS/0002.
    liveUrl: "https://theironandoakpodcast.com",
  },
  // Cassidy HVAC: Customer Reactivation
  {
    title: "AI Customer Reactivation Engine",
    outcome: "Reactivated 60%+ of dormant Cassidy HVAC customers within six weeks.",
    tags: "AI Outreach | Cassidy HVAC | Revenue Recovery",
    description:
      "Reactivated 60%+ of dormant Cassidy HVAC customers within six weeks. CRM-integrated AI generated hyper-personalized SMS and email outreach using each customer's service history, equipment age, and seasonal context, driving a 45%+ booking conversion lift.",
    gradient: "linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 100%)",
    image: "cassidy-hvac-nobg.webp",
    imageWidth: 505,
    imageHeight: 100,
    lightCard: true,
  },
  // HG Oil Holdings: Inventory
  {
    title: "Automated Inventory System",
    outcome: "95% reduction in back-office logistics time",
    tags: "Custom App | HG Oil Holdings | Live Tracking",
    description:
      "95% reduction in back-office logistics time and 75%+ accuracy improvement on inventory counts and transfers. Live counts, full audit trails, and codified markup formulas turned HG Oil Holdings' inventory function from a loss center into a profit center.",
    gradient: "linear-gradient(135deg, #f0f4f8 0%, #dce8f0 100%)",
    image: "hg-oil-icon.webp",
    imageWidth: 180,
    imageHeight: 150,
    lightCard: true,
  },
  // Wife Supply Co
  {
    title: "Wife Supply Co",
    outcome: "Built the entire AI-powered gifting platform",
    tags: "AI Commerce | Custom Build | Full Deployment",
    description:
      "Built the entire AI-powered gifting platform from concept to launch: a custom AI gift-matching engine, custom commerce front end, conversion-optimized funnels, and a brand-engineered design system that doesn't look like another Shopify store.",
    gradient: "linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)",
    image: "wife-supply.webp",
    imageWidth: 1024,
    imageHeight: 996,
    lightCard: true,
  },
  // Our own site (Preisser Solutions)
  {
    title: "PreisserSolutions.com",
    outcome: "A website built to work as a sales tool.",
    tags: "Custom Website | Lead Pipeline | Local + AI SEO",
    description:
      "Our own flagship site, built the same way we build yours: custom-coded in Next.js, React, and TypeScript, engineered for local SEO and AI search citation, and connected straight into the lead pipeline. A website built to work as a sales tool.",
    gradient: "linear-gradient(135deg, #0A1628 0%, #0F1D30 100%)",
    image: "preisser-solutions.webp",
    imageWidth: 1024,
    imageHeight: 1024,
  },
  // Alpha Matrix
  {
    title: "Alpha Matrix: Multi-Agent AI",
    outcome: "Six autonomous AI agents running in parallel",
    tags: "AI Architecture | Multi-Agent | Autonomous",
    description:
      "Six autonomous AI agents running in parallel: scanning, analyzing, scoring, and producing strategic output without human intervention. Developed in-house at Preisser Solutions as a working demonstration of multi-agent analytical infrastructure.",
    gradient: "linear-gradient(135deg, #0A1628 0%, #1a1040 50%, #0A1628 100%)",
    image: "preisser-solutions.webp",
    imageWidth: 1024,
    imageHeight: 1024,
    href: "/case-studies/alpha-matrix",
  },
  // After-Hours Call Triage
  {
    title: "After-Hours Call Triage",
    outcome: "This system answers calls, handles texts, qualifies urgency",
    tags: "AI Automation | Lead Capture | Routing",
    description:
      "Every call that goes to voicemail after 5 PM is a customer choosing your competitor by 8 AM. This system answers calls, handles texts, qualifies urgency, and routes the right ones to you, so you stop losing jobs while you sleep.",
    gradient: "linear-gradient(135deg, #1590FF 0%, #00D4AA 100%)",
    svgIcon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Phone handset */}
        <path d="M14 6h20a2 2 0 0 1 2 2v26a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" strokeOpacity="0.6" />
        <circle cx="24" cy="33" r="1.5" fill="currentColor" stroke="none" />
        <path d="M20 10h8" strokeOpacity="0.5" />
        {/* Clock overlay */}
        <circle cx="35" cy="13" r="7" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeOpacity="0.9" />
        <path d="M35 10v3.5l2 1.5" strokeOpacity="0.9" />
      </svg>
    ),
  },
  // AI Invoice Processing
  {
    title: "AI Invoice Processing",
    outcome: "A proven pattern that eliminates the invoice backlog",
    tags: "Document Processing | AI Automation | Back-Office",
    description:
      "AI extracts vendor, line items, totals, and GL codes from any invoice format in seconds: no manual data entry, no missed approvals, no need to hire additional office staff to keep up with volume. A proven pattern that eliminates the invoice backlog without adding headcount.",
    gradient: "linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)",
    svgIcon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Receipt body */}
        <path d="M10 6h28v36l-4-3-4 3-4-3-4 3-4-3-4 3-4-3V6z" strokeOpacity="0.7" />
        <path d="M17 16h14" />
        <path d="M17 22h14" />
        <path d="M17 28h8" />
        {/* Checkmark badge */}
        <circle cx="36" cy="34" r="6" fill="currentColor" fillOpacity="0.2" stroke="currentColor" />
        <path d="M33 34l2 2 4-4" />
      </svg>
    ),
  },
  // AI Document Analysis
  {
    title: "AI Document Analysis",
    outcome: "Stop paying skilled people to do copy-paste work.",
    tags: "AI Automation | Workflow Integration | Efficiency",
    description:
      "This system reads contracts, invoices, permits, and any other document your team currently re-types by hand, then extracts the data and puts it exactly where it needs to go. Stop paying skilled people to do copy-paste work.",
    gradient: "linear-gradient(135deg, #1E293B 0%, #334155 100%)",
    svgIcon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Document with folded corner */}
        <path d="M12 4h20l8 8v32H12V4z" strokeOpacity="0.7" />
        <path d="M32 4v8h8" strokeOpacity="0.5" />
        <path d="M18 20h12" strokeOpacity="0.6" />
        <path d="M18 26h8" strokeOpacity="0.6" />
        {/* Magnifying glass */}
        <circle cx="30" cy="34" r="6" strokeOpacity="0.9" />
        <path d="M34.5 38.5L39 43" strokeOpacity="0.9" />
      </svg>
    ),
  },
  // Custom AI Fitness Agent
  {
    title: "Custom AI Fitness Agent",
    // Ink measured +8.68px off the card centre at 390x844; the artwork sits
    // low inside its own viewBox while the box itself is centred exactly.
    iconNudgeY: "-8.68%",
    outcome: "We built an AI agent that generates personalized fitness and nutrition regimens",
    tags: "Custom AI Agent | Personalization | Data",
    description:
      "We built an AI agent that generates personalized fitness and nutrition regimens, work that previously required a human expert for every client. This is a proof of concept for any business where expert knowledge gets repeated hundreds of times a day.",
    gradient: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
    svgIcon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Heartbeat line */}
        <polyline points="4,26 12,26 16,16 20,36 24,22 28,26 44,26" strokeOpacity="0.9" />
        {/* Dumbbell */}
        <path d="M10 38h6" />
        <rect x="7" y="36" width="3" height="4" rx="1" fill="currentColor" fillOpacity="0.2" stroke="currentColor" />
        <rect x="16" y="36" width="3" height="4" rx="1" fill="currentColor" fillOpacity="0.2" stroke="currentColor" />
        <path d="M32 38h6" />
        <rect x="29" y="36" width="3" height="4" rx="1" fill="currentColor" fillOpacity="0.2" stroke="currentColor" />
        <rect x="38" y="36" width="3" height="4" rx="1" fill="currentColor" fillOpacity="0.2" stroke="currentColor" />
      </svg>
    ),
  },
  // AI Email Digest System
  {
    title: "AI Email Digest System",
    outcome: "One briefing. Every morning.",
    tags: "AI Automation | Email Management | Productivity",
    description:
      "One briefing. Every morning. Every important email from the last 24 hours: summarized, prioritized, and ready for decisions. Built for the business owner who loses their first productive hour to an inbox full of noise.",
    gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    svgIcon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Open envelope */}
        <rect x="4" y="12" width="40" height="28" rx="3" strokeOpacity="0.7" />
        <path d="M4 15l20 14 20-14" strokeOpacity="0.8" />
        {/* Sparkle marks */}
        <path d="M36 6l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" fill="currentColor" fillOpacity="0.8" stroke="none" />
        <path d="M42 10l0.6 1.8 1.8 0.6-1.8 0.6-0.6 1.8-0.6-1.8-1.8-0.6 1.8-0.6z" fill="currentColor" fillOpacity="0.6" stroke="none" />
      </svg>
    ),
  },
  // Hiring Pipeline & AI Screener
  {
    title: "Hiring Pipeline & AI Screener",
    // Ink measured -7.32px off the card centre at 390x844; the artwork sits
    // high inside its own viewBox while the box itself is centred exactly.
    iconNudgeY: "7.32%",
    outcome: "Applications come in, the AI ranks and screens them against your criteria",
    tags: "Google Workspace | Apps Script | AI Agent",
    description:
      "Applications come in, the AI ranks and screens them against your criteria, and qualified candidates surface to the top, automatically. No more spreadsheet tracking, no more \"I think we already called that one,\" no more losing good applicants because nobody followed up fast enough.",
    gradient: "linear-gradient(135deg, #0EA5E9 0%, #2563EB 100%)",
    svgIcon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Funnel */}
        <path d="M8 10h32l-12 14v14l-8-4V24L8 10z" strokeOpacity="0.7" fill="currentColor" fillOpacity="0.1" />
        {/* Person silhouettes at top of funnel */}
        <circle cx="16" cy="5" r="2.5" strokeOpacity="0.8" />
        <path d="M12 10c0-2.2 1.8-4 4-4s4 1.8 4 4" strokeOpacity="0.5" />
        <circle cx="32" cy="5" r="2.5" strokeOpacity="0.8" />
        <path d="M28 10c0-2.2 1.8-4 4-4s4 1.8 4 4" strokeOpacity="0.5" />
      </svg>
    ),
  },
  // Agentic AI Coding Specialists
  {
    title: "Agentic AI Coding Specialists",
    outcome: "This is the toolset behind our speed.",
    tags: "AI Architecture | Agentic Coding | Claude Code",
    description:
      "Built specialized agentic coding models: AI systems that don\u2019t just generate code, they architect, debug, and ship entire projects autonomously. Each agent is tuned for a specific domain: web development, automation pipelines, data analysis. This is the toolset behind our speed.",
    gradient: "linear-gradient(135deg, #7C3AED 0%, #2563EB 50%, #1590FF 100%)",
    svgIcon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="6" y="8" width="36" height="28" rx="3" strokeOpacity="0.7" />
        <path d="M16 18l-5 5 5 5" strokeOpacity="0.9" />
        <path d="M32 18l5 5-5 5" strokeOpacity="0.9" />
        <path d="M27 16l-6 16" strokeOpacity="0.6" />
        <circle cx="24" cy="42" r="2" fill="currentColor" fillOpacity="0.5" stroke="none" />
        <path d="M20 44h8" strokeOpacity="0.4" />
      </svg>
    ),
  },
  // Custom Local AI Models
  {
    title: "Custom Local AI Models",
    outcome: "Designed and deployed custom AI models that run locally",
    tags: "AI Engineering | Local Deployment | Custom Training",
    description:
      "Designed and deployed custom AI models that run locally: no cloud dependency, no data leaving your network. Tuned for specific business operations with proprietary logic built in. When off-the-shelf AI doesn\u2019t fit the problem, we build one that does.",
    gradient: "linear-gradient(135deg, #0F172A 0%, #1E293B 40%, #7C3AED 100%)",
    svgIcon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="10" y="14" width="28" height="22" rx="2" strokeOpacity="0.7" />
        <path d="M10 20h28" strokeOpacity="0.4" />
        <circle cx="24" cy="30" r="4" strokeOpacity="0.8" />
        <path d="M24 26v-6" strokeOpacity="0.5" />
        <path d="M18 8h12" strokeOpacity="0.4" />
        <path d="M22 8v6" strokeOpacity="0.4" />
        <path d="M26 8v6" strokeOpacity="0.4" />
        <circle cx="15" cy="17" r="1" fill="currentColor" fillOpacity="0.6" stroke="none" />
        <circle cx="19" cy="17" r="1" fill="currentColor" fillOpacity="0.4" stroke="none" />
      </svg>
    ),
  },
  // AI Trend & Behavioral Analysis
  {
    title: "AI Trend & Behavioral Analysis",
    outcome: "Built AI models that calculate economic trends",
    tags: "AI Research | Predictive Modeling | Economics",
    description:
      "Built AI models that calculate economic trends and map psychological behavior patterns: systems that process market signals, consumer data, and behavioral indicators to surface insights no spreadsheet or manual analysis can produce.",
    gradient: "linear-gradient(135deg, #1590FF 0%, #6366F1 50%, #EC4899 100%)",
    svgIcon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 38l10-12 8 6 8-14 10-6" strokeOpacity="0.9" />
        <circle cx="16" cy="26" r="2" strokeOpacity="0.6" fill="currentColor" fillOpacity="0.15" />
        <circle cx="24" cy="32" r="2" strokeOpacity="0.6" fill="currentColor" fillOpacity="0.15" />
        <circle cx="32" cy="18" r="2" strokeOpacity="0.6" fill="currentColor" fillOpacity="0.15" />
        <circle cx="42" cy="12" r="2" strokeOpacity="0.6" fill="currentColor" fillOpacity="0.15" />
        <path d="M6 42h36" strokeOpacity="0.3" />
        <path d="M6 42V6" strokeOpacity="0.3" />
      </svg>
    ),
  },
];

export function CaseStudies() {
  const trackRef = useRef<HTMLDivElement>(null);
  // Which card's detail panel is open. One at a time, every viewport — the
  // reveal is no longer mobile-only, so this is not "activeMobileCard".
  const [openCard, setOpenCard] = useState<number | null>(null);
  // scrollLeft at the moment a card was opened. Focusing the toggle button can
  // make the browser scroll the card into view, which fires onScroll and used
  // to slam the panel shut on the very click that opened it. Only a real user
  // scroll (> 24px away from where we started) counts as "moving on".
  const scrollAtOpenRef = useRef(0);

  // Entry fade for the bottom affordance + its scrim.
  //
  // A 240ms fade was authored on .ps-work-card__bob in globals.css, but its
  // ONLY triggers were :hover — gated behind `pointer: fine` — and
  // :focus-visible. On a phone neither ever fires, so the label and its
  // gradient simply translated in at the scroll's own speed (measured
  // 34.0px/frame, settled by t~293ms). The owner called that "it jerks one in
  // real quick instead of fading it in" (2026-09-04).
  //
  // A `data-` attribute, not a class: this element's className is a React
  // prop that CHANGES when the card opens (see the className array below), so
  // a class added via classList.add would be wiped on the very first tap and
  // — the observer having already unobserved — would never come back. React
  // does not touch attributes it did not set. Same reasoning and same idiom
  // as hero.tsx:137-139.
  //
  // The arming class goes on the TRACK so the hidden state cannot exist
  // without JS: no script, no `--reveal`, nothing is ever at opacity 0.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(
      track.querySelectorAll<HTMLElement>(".ps-work-card")
    );
    if (cards.length === 0) return;

    track.classList.add("ps-work-track--reveal");

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Reduced motion short-circuits to the final state in the effect AND in
    // CSS, matching card-visuals-backup.tsx:860-868.
    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      cards.forEach((card) => {
        card.dataset.revealed = "true";
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.revealed = "true";
          io.unobserve(entry.target);
        });
      },
      // Viewport, not the track: with the track as root, every card that is
      // horizontally in view would reveal while the section is still below
      // the fold, and the first fade would be spent unseen.
      { threshold: 0.35 }
    );

    cards.forEach((card) => io.observe(card));
    return () => io.disconnect();
  }, []);

  function scrollTrack(direction: "left" | "right") {
    if (!trackRef.current) return;
    const scrollAmount = 316; // card width (300) + gap (16)
    trackRef.current.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  }

  function handleCardToggle(index: number) {
    scrollAtOpenRef.current = trackRef.current?.scrollLeft ?? 0;
    // Toggle: activate the same card to close, a different card to switch
    setOpenCard((prev) => (prev === index ? null : index));
  }

  // Close the panel when the user scrolls the track (they're moving on)
  function handleTrackScroll() {
    if (openCard === null) return;
    const now = trackRef.current?.scrollLeft ?? 0;
    if (Math.abs(now - scrollAtOpenRef.current) > 24) {
      setOpenCard(null);
    }
  }

  return (
    <section className="ps-work" id="case-studies" aria-labelledby="work-heading">
      <div className="ps-work-header">
        <div>
          <span className="ps-eyebrow ps-eyebrow--light">OUR WORK</span>
          <h2 id="work-heading" className="ps-section-heading ps-section-heading--light">
            Real Projects. Real Results.
          </h2>
        </div>
        {/* Nav arrows — hidden on mobile via CSS (touch scroll is native) */}
        <div className="ps-work-nav" aria-label="Scroll case studies">
          <button
            className="ps-work-nav-btn"
            onClick={() => scrollTrack("left")}
            aria-label="Scroll left"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className="ps-work-nav-btn"
            onClick={() => scrollTrack("right")}
            aria-label="Scroll right"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M6 4L10 8L6 12"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="ps-work-track" ref={trackRef} role="list" onScroll={handleTrackScroll}>
        {caseStudyCards.map((study, index) => {
          const isOpen = openCard === index;
          const panelId = `ps-work-panel-${index}`;
          // Per-card type scale, from the client's 2026-09-04 note: the
          // panel should be "sized to fit the card on a card by card basis".
          // Copy runs 219-377 characters across the eighteen cards, so one
          // fixed size has to serve the longest and leaves the other
          // fifteen under-set — which is what made the panel look
          // bottom-weighted and half-empty.
          //
          // Computed from the static data at render, so this is baked into
          // the SSG HTML: no runtime measuring, no reflow, no flash of
          // wrong size. Boundaries sit inside natural gaps in the length
          // distribution (290|339 and 261|275), not next to a real value,
          // so a copy edit of a character or two cannot flip a card into a
          // different size. If you change a description, re-check the
          // bucket AND re-run the 320x568 clipping check.
          const copyLength = study.description.length;
          const density =
            copyLength >= 300 ? "long" : copyLength >= 268 ? "mid" : "short";
          // NOTE: `outcome` deliberately does NOT feed `density` — density is
          // computed from `description.length` only, so adding an outcome line
          // cannot move a card between size buckets.
          // Defensive: `href` is meant to be an internal route, but if one is
          // ever absolute it must still get the new-tab treatment.
          const hrefIsExternal = study.href ? /^https?:\/\//.test(study.href) : false;
          return (
            <article
              key={`${study.title}-${index}`}
              className={[
                "ps-work-card",
                study.lightCard ? "ps-work-card--light" : "",
                isOpen ? "ps-work-card--open" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              data-density={density}
              data-has-outcome={study.outcome ? "true" : undefined}
              style={
                study.iconNudgeY
                  ? ({ "--ps-icon-nudge-y": study.iconNudgeY } as React.CSSProperties)
                  : undefined
              }
              role="listitem"
            >
              {/* Gradient background layer */}
              <div
                className="ps-work-card-bg"
                style={{ background: study.gradient }}
                aria-hidden="true"
              />

              {/* Logo/image centered on the card */}
              {study.caseLogo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${study.caseLogo}`}
                  alt={study.title}
                  loading="lazy"
                  width={study.caseLogoWidth}
                  height={study.caseLogoHeight}
                  className={`ps-work-card-logo ps-work-card-logo--company${
                    study.logoClass ? ` ${study.logoClass}` : ""
                  }`}
                />
              ) : null}
              {study.caseLogo && study.logoWordmark ? (
                <span className="ps-work-card-wordmark" aria-hidden="true">
                  {study.logoWordmark}
                </span>
              ) : study.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/cases/${study.image}`}
                  alt={study.title}
                  loading="lazy"
                  width={study.imageWidth}
                  height={study.imageHeight}
                  className={`ps-work-card-logo${study.title === "TylerPreisser.com" ? " ps-work-card-logo--headshot" : ""}`}
                />
              ) : study.svgIcon ? (
                <div className="ps-work-card-icon" aria-hidden="true">{study.svgIcon}</div>
              ) : null}

              {/* The card is NOT an anchor any more. It used to be, on the two
                  cards with an `href`, which made a click navigate instead of
                  inform and made it impossible to put a link in the panel
                  without nesting <a> inside <a>. The whole card face is now a
                  disclosure button, and every link lives inside the panel as a
                  sibling of that button — so no anchor is ever nested. */}
              <button
                type="button"
                className="ps-work-card__toggle"
                aria-expanded={isOpen}
                aria-controls={panelId}
                aria-label={`Details for ${study.title}`}
                onClick={() => handleCardToggle(index)}
              />

              {/* Detail panel. Kept at opacity 0 rather than display:none so the
                  title and description stay in the SSG HTML for AI crawlers;
                  aria-hidden + tabIndex -1 keep the collapsed copy out of the
                  screen-reader flow and out of the tab order, so nothing is
                  focusable while invisible. */}
              <div id={panelId} className="ps-work-card__panel" aria-hidden={!isOpen || undefined}>
                <div className="ps-work-card__panel-scroll">
                  <h3 className="ps-work-card__panel-title">{study.title}</h3>
                  <span className="ps-visually-hidden">{study.tags}</span>
                  <p className="ps-work-card__panel-body">{study.description}</p>
                </div>

                {(study.href || study.liveUrl) && (
                  <div className="ps-work-card__panel-links">
                    {study.href && (
                      <a
                        className="ps-work-card__panel-link ps-work-card__panel-link--case"
                        href={study.href}
                        target={hrefIsExternal ? "_blank" : undefined}
                        rel={hrefIsExternal ? "noopener noreferrer" : undefined}
                        aria-label={`Read the ${study.title} case study`}
                        tabIndex={isOpen ? undefined : -1}
                      >
                        Read the case study
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M3 8h10M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    )}
                    {study.liveUrl && (
                      <a
                        className="ps-work-card__panel-link ps-work-card__panel-link--live"
                        href={study.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={isOpen ? undefined : -1}
                      >
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M6.5 9.5a3 3 0 0 0 4.24 0l2.12-2.12a3 3 0 0 0-4.24-4.24l-.7.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          <path d="M9.5 6.5a3 3 0 0 0-4.24 0L3.14 8.62a3 3 0 0 0 4.24 4.24l.7-.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        Visit {liveUrlLabel(study.liveUrl)}
                        <span className="ps-visually-hidden"> (opens in a new tab)</span>
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Affordance — bottom-left, text-only with a subtle vertical bob.
                  Reveal is click/tap driven on every viewport now, so the
                  pointer-device label says "Click for more"; touch devices get
                  "Tap for more" via CSS @media (hover: none).
                  Decorative only (aria-hidden); a11y is on the toggle button. */}
              {/* Outcome line on the CLOSED face. A SIBLING of the panel, not a
                  child: the panel is opacity:0 / pointer-events:none as a unit,
                  so anything inside it would either stay invisible or reveal the
                  whole story and kill the tap. Hidden while the card is open so
                  it never double-prints under the revealed copy.
                  aria-hidden because the identical words are already in the
                  panel, which is opacity:0 rather than display:none and is
                  therefore already read by assistive tech — announcing them
                  twice would be worse than not announcing them here. */}
              {study.outcome ? (
                <p className="ps-work-card__outcome" aria-hidden="true">
                  {study.outcome}
                </p>
              ) : null}

              <div className="ps-work-card__bob" aria-hidden="true">
                <span className="ps-work-card__bob-label ps-work-card__bob-label--hover">Click for more</span>
                <span className="ps-work-card__bob-label ps-work-card__bob-label--tap">Tap for more</span>
              </div>
            </article>
          );
        })}
      </div>

      <p className="ps-work-swipe-hint" aria-hidden="true">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          style={{ display: "inline-block", verticalAlign: "middle", marginRight: "4px" }}
        >
          <path
            d="M1 8h14M9 2l6 6-6 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Swipe to explore
      </p>
    </section>
  );
}
