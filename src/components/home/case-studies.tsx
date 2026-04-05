"use client";

import { useRef } from "react";

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
  {
    title: "The Iron and Oak Podcast",
    tags: "Website Build | Brand Identity | AI Search",
    description:
      "Built from zero — website, logo, full brand identity, podcast distribution across all major networks, and AI search optimization.",
    gradient: "linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #0f2010 100%)",
    image: "iron-oak.webp",
  },
  {
    title: "PreisserSolutions.com",
    tags: "Custom Website | Lead Pipeline | Local SEO",
    description:
      "Custom-coded, mobile-first website with integrated ROI calculator, case studies, and a contact pipeline that routes inquiries directly.",
    gradient: "linear-gradient(135deg, #0A1628 0%, #0F1D30 100%)",
    image: "preisser-solutions.webp",
  },
  {
    title: "TylerPreisser.com",
    tags: "Portfolio | GEO/SEO | AI Search Optimization",
    description:
      "Professional portfolio structured to be cited by ChatGPT, Perplexity, and Google AI Overviews. Fixed a critical JS rendering issue blocking crawlers.",
    gradient: "linear-gradient(135deg, #C4B49A 0%, #A89880 100%)",
    image: "tyler-headshot.webp",
  },
  {
    title: "Wife Supply Co",
    tags: "AI Application | Product Build | Full Deployment",
    description:
      "AI-powered gifting platform where users describe preferences and get personalized recommendations in real time. Concept to live deployment.",
    gradient: "linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)",
    image: "wife-supply.webp",
    lightCard: true,
  },
  {
    title: "AI Customer Reactivation Engine",
    tags: "AI Outreach | John C Cassidy HVAC | Revenue Recovery",
    description:
      "AI-powered SMS and email outreach that reactivated 60%+ of dormant customers. 45% increase in booking conversions.",
    gradient: "linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 100%)",
    image: "cassidy-hvac.webp",
    lightCard: true,
  },
  {
    title: "After-Hours Call Triage",
    tags: "AI Automation | Lead Capture | Routing",
    description:
      "Agentic system that receives after-hours inquiries, assesses urgency with AI, auto-responds via SMS, and routes to the right person.",
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
  {
    title: "AI Invoice Processing",
    tags: "Document Processing | Data Extraction | Automation",
    description:
      "AI reads invoices, extracts data, categorizes expenses, flags anomalies, and routes for approval. 75% reduction in processing time.",
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
  {
    title: "Automated Inventory System",
    tags: "Custom App | HG Oil Holdings | Live Tracking",
    description:
      "Centralized inventory platform with live tracking, inter-site transfers, automated cost formulas, and real-time reporting for insurance audits and compliance.",
    gradient: "linear-gradient(135deg, #f0f4f8 0%, #dce8f0 100%)",
    image: "hg-oil.webp",
    lightCard: true,
  },
  {
    title: "AI Document Analysis",
    tags: "AI Automation | Workflow Integration | Efficiency",
    description:
      "Automation that ingests any document, extracts structured data, categorizes it, and forwards to downstream systems automatically.",
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
  {
    title: "Custom AI Fitness Agent",
    tags: "Custom AI Agent | Personalization | Data",
    description:
      "AI agent that produces fully personalized fitness regimens based on body data, goals, and current research from across the internet.",
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
  {
    title: "AI Email Digest System",
    tags: "AI Automation | Email Management | Productivity",
    description:
      "Scans 24 hours of email, summarizes each in 1-3 sentences, categorizes into actionable buckets, outputs a clean briefing digest.",
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
  {
    title: "Hiring Pipeline & AI Screener",
    tags: "Google Workspace | Apps Script | AI Agent",
    description:
      "Complete hiring infrastructure with candidate tracking, automated outreach, and an AI pre-screener that ranks applicants automatically.",
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
  {
    title: "Contact Form to CRM Pipeline",
    tags: "Integration | Lead Automation | R Squared AI",
    description:
      "End-to-end automated lead pipeline: form capture, CRM logging, AI qualification, Slack notification. Zero manual steps.",
    gradient: "linear-gradient(135deg, #0A1628 0%, #0F1D30 100%)",
    image: "r-squared.webp",
  },
  {
    title: "Alpha Matrix — Multi-Agent AI",
    tags: "AI Architecture | R Squared AI | Autonomous",
    description:
      "Six specialized AI agents working in sequence with self-evolving intelligence. Enterprise-grade autonomous analysis system.",
    gradient: "linear-gradient(135deg, #0A1628 0%, #1a1040 50%, #0A1628 100%)",
    image: "r-squared.webp",
  },
];

export function CaseStudies() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollTrack(direction: "left" | "right") {
    if (!trackRef.current) return;
    const scrollAmount = 316; // card width (300) + gap (16)
    trackRef.current.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
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
        <div className="ps-work-nav" aria-label="Scroll case studies">
          <button
            className="ps-work-nav-btn"
            onClick={() => scrollTrack("left")}
            aria-label="Scroll left"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M10 3L5 8l5 5"
                stroke="currentColor"
                strokeWidth="2"
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
                d="M6 3l5 5-5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="ps-work-track" ref={trackRef} role="list">
        {caseStudyCards.map((study, index) => (
          <article
            key={`${study.title}-${index}`}
            className={`ps-work-card${study.lightCard ? " ps-work-card--light" : ""}`}
            role="listitem"
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

            {/* Static label at bottom-left */}
            <span className="ps-work-card-client">{study.title}</span>

            {/* Hover overlay with full details */}
            <div className="ps-work-card-overlay" aria-label={`${study.title} case study details`}>
              <span className="ps-work-card-tag">{study.tags}</span>
              <p className="ps-work-card-result">{study.description}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="ps-work-see-more">
        <a href="https://tylerpreisser.com" target="_blank" rel="noopener noreferrer">
          See more of what we&apos;ve built at TylerPreisser.com →
        </a>
      </div>
    </section>
  );
}
