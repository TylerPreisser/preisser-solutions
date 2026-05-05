"use client";

import { useRef, useState } from "react";

interface CaseStudyCard {
  title: string;
  tags: string;
  description: string;
  gradient: string;
  image?: string;
  svgIcon?: React.ReactNode;
  lightCard?: boolean;
}

const caseStudyCards: CaseStudyCard[] = [
  // 1
  {
    title: "The Iron and Oak Podcast",
    tags: "Website Build | AI Search Optimization",
    description:
      "We built the entire online presence from a founder's vision — website, theme, logos, AI search optimization, Google optimization, distribution across every platform. A concept turned into something professional and discoverable.",
    gradient: "linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #0f2010 100%)",
    image: "iron-oak.webp",
  },
  // 2
  {
    title: "Wife Supply Co",
    tags: "AI Application | Product Build | Full Deployment",
    description:
      "An AI model psychologically trained to help men buy gifts for their wives. The system reads the buyer's profile and the wife's preferences, then returns perfectly tailored product recommendations. Internal Preisser Tech R&D build.",
    gradient: "linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)",
    image: "wife-supply.webp",
    lightCard: true,
  },
  // 3
  {
    title: "PreisserTech.com",
    tags: "Custom Website | Lead Pipeline | Local SEO",
    description:
      "This is our own site, and we built it the same way we build yours — custom-coded, integrated lead pipeline, and an ROI calculator that qualifies prospects before they ever hit our calendar. No templates. No page builders. A website that actually works as a sales tool.",
    gradient: "linear-gradient(135deg, #0A1628 0%, #0F1D30 100%)",
    image: "preisser-tech.webp",
  },
  // 4
  {
    title: "AI Customer Reactivation Engine",
    tags: "AI Outreach | John C Cassidy HVAC | Revenue Recovery",
    description:
      "Re-engaged 60%+ of past customers and dropped them back into the service pipeline. We used AI to intelligently segment them by propensity — based on the HVAC units they owned — then sent personalized messaging to each segment. Revenue already earned once, just needed a second conversation.",
    gradient: "linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 100%)",
    image: "cassidy-hvac-nobg.webp",
    lightCard: true,
  },
  // 5
  {
    title: "Automated Inventory System",
    tags: "Custom App | HG Oil Holdings | Live Tracking",
    description:
      "95% reduction in inventory tracking time. If your team is still counting stock by hand, updating spreadsheets from memory, or guessing what's on the truck — this is what it looks like when that problem disappears.",
    gradient: "linear-gradient(135deg, #f0f4f8 0%, #dce8f0 100%)",
    image: "hg-oil-icon.webp",
    lightCard: true,
  },
  // 6
  {
    title: "Contact Form to CRM Pipeline",
    tags: "Integration | Lead Automation | R Squared AI",
    description:
      "From the moment a lead fills out a form to the moment they're tagged, scored, and assigned in the CRM — zero manual steps. No inbox monitoring. No copy-pasting into spreadsheets. Leads move through your pipeline whether your team is watching or not.",
    gradient: "linear-gradient(135deg, #0A1628 0%, #0F1D30 100%)",
    image: "r-squared.webp",
  },
  // 7
  {
    title: "Alpha Matrix — Multi-Agent AI",
    tags: "AI Architecture | R Squared AI | Autonomous",
    description:
      "Six autonomous AI agents running in parallel — scanning, analyzing, scoring, and producing strategic output without human intervention. This is the ceiling of what business AI can do today, and we built it specifically for this use case.",
    gradient: "linear-gradient(135deg, #0A1628 0%, #1a1040 50%, #0A1628 100%)",
    image: "r-squared.webp",
  },
  // 8
  {
    title: "TylerPreisser.com",
    tags: "Portfolio | GEO/SEO | AI Search Optimization",
    description:
      "A professional portfolio engineered to rank in both traditional search and AI-powered search tools like ChatGPT and Perplexity. If your competitors show up when someone asks AI for a recommendation in your industry and you don't, you're already behind.",
    gradient: "linear-gradient(135deg, #0D95E8 0%, #0A1628 100%)",
    image: "tyler-headshot-nobg.webp",
  },
  // 9
  {
    title: "After-Hours Call Triage",
    tags: "AI Automation | Lead Capture | Routing",
    description:
      "Every call that goes to voicemail after 5 PM is a customer choosing your competitor by 8 AM. This system answers calls, handles texts, qualifies urgency, and routes the right ones to you — so you stop losing jobs while you sleep.",
    gradient: "linear-gradient(135deg, #0D95E8 0%, #00D4AA 100%)",
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
  // 10
  {
    title: "AI Invoice Processing",
    tags: "Document Processing | Data Extraction | Automation",
    description:
      "A 75% reduction in time spent processing invoices. No more manual data entry, no more chasing down approvals, no more paying someone to do what a system handles in seconds. Your back office runs whether your team is at their desks or not.",
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
  // 11
  {
    title: "AI Document Analysis",
    tags: "AI Automation | Workflow Integration | Efficiency",
    description:
      "This system reads contracts, invoices, permits, and any other document your team currently re-types by hand — then extracts the data and puts it exactly where it needs to go. Stop paying skilled people to do copy-paste work.",
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
  // 12
  {
    title: "Custom AI Fitness Agent",
    tags: "Custom AI Agent | Personalization | Data",
    description:
      "We built an AI agent that generates personalized fitness and nutrition regimens — work that previously required a human expert for every client. This is a proof of concept for any business where expert knowledge gets repeated hundreds of times a day.",
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
  // 13
  {
    title: "AI Email Digest System",
    tags: "AI Automation | Email Management | Productivity",
    description:
      "One briefing. Every morning. Every important email from the last 24 hours — summarized, prioritized, and ready for decisions. Built for the business owner who loses their first productive hour to an inbox full of noise.",
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
  // 14
  {
    title: "Hiring Pipeline & AI Screener",
    tags: "Google Workspace | Apps Script | AI Agent",
    description:
      "Applications come in, the AI ranks and screens them against your criteria, and qualified candidates surface to the top — automatically. No more spreadsheet tracking, no more \"I think we already called that one,\" no more losing good applicants because nobody followed up fast enough.",
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
  // 15
  {
    title: "Agentic AI Coding Specialists",
    tags: "AI Architecture | Agentic Coding | Claude Code",
    description:
      "Built specialized agentic coding models \u2014 AI systems that don\u2019t just generate code, they architect, debug, and ship entire projects autonomously. Each agent is tuned for a specific domain: web development, automation pipelines, data analysis. This is the toolset behind our speed.",
    gradient: "linear-gradient(135deg, #7C3AED 0%, #2563EB 50%, #0D95E8 100%)",
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
  // 16
  {
    title: "Custom Local AI Models",
    tags: "AI Engineering | Local Deployment | Custom Training",
    description:
      "Designed and deployed custom AI models that run locally \u2014 no cloud dependency, no data leaving your network. Tuned for specific business operations with proprietary logic built in. When off-the-shelf AI doesn\u2019t fit the problem, we build one that does.",
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
  // 17
  {
    title: "AI Trend & Behavioral Analysis",
    tags: "AI Research | Predictive Modeling | Economics",
    description:
      "Built AI models that calculate economic trends and map psychological behavior patterns \u2014 systems that process market signals, consumer data, and behavioral indicators to surface insights no spreadsheet or manual analysis can produce.",
    gradient: "linear-gradient(135deg, #0D95E8 0%, #6366F1 50%, #EC4899 100%)",
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
  // Track which card is tapped on mobile (null = none active)
  const [activeMobileCard, setActiveMobileCard] = useState<number | null>(null);

  function scrollTrack(direction: "left" | "right") {
    if (!trackRef.current) return;
    const scrollAmount = 316; // card width (300) + gap (16)
    trackRef.current.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  }

  function handleCardTap(index: number) {
    // Toggle: tap same card to close, tap different card to switch
    setActiveMobileCard((prev) => (prev === index ? null : index));
  }

  // Close overlay when user scrolls the track (they're moving on)
  function handleTrackScroll() {
    if (activeMobileCard !== null) {
      setActiveMobileCard(null);
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
          const isMobileActive = activeMobileCard === index;
          return (
            <article
              key={`${study.title}-${index}`}
              className={[
                "ps-work-card",
                study.lightCard ? "ps-work-card--light" : "",
                isMobileActive ? "ps-work-card--tapped" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              role="listitem"
              onClick={() => handleCardTap(index)}
            >
              {/* Gradient background layer */}
              <div
                className="ps-work-card-bg"
                style={{ background: study.gradient }}
                aria-hidden="true"
              />

              {/* Logo/image centered on the card */}
              {study.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/cases/${study.image}`}
                  alt={study.title}
                  className={`ps-work-card-logo${study.title === "TylerPreisser.com" ? " ps-work-card-logo--headshot" : ""}`}
                />
              ) : study.svgIcon ? (
                <div className="ps-work-card-icon" aria-hidden="true">{study.svgIcon}</div>
              ) : null}

              {/* Static label + tap hint at bottom-left (mobile default state) */}
              <div className="ps-work-card-label-group">
                <span className="ps-work-card-client">{study.title}</span>
                <span className="ps-work-card-tap-hint" aria-hidden="true">Tap for details</span>
              </div>

              {/* Overlay with full details — hover on desktop, tap on mobile */}
              <div
                className="ps-work-card-overlay"
                aria-label={`${study.title} case study details`}
              >
                <span className="ps-work-card-tag">{study.tags}</span>
                <p className="ps-work-card-result">{study.description}</p>
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
