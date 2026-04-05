"use client";

import { useRef } from "react";

interface CaseStudyCard {
  title: string;
  tags: string;
  description: string;
  gradient: string;
  image?: string;
  svgIcon?: React.ReactNode;
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
    gradient: "linear-gradient(135deg, #0A1628 0%, #1E3A5F 100%)",
    image: "tyler-headshot.webp",
  },
  {
    title: "Wife Supply Co",
    tags: "AI Application | Product Build | Full Deployment",
    description:
      "AI-powered gifting platform where users describe preferences and get personalized recommendations in real time. Concept to live deployment.",
    gradient: "linear-gradient(135deg, #0d1a2e 0%, #0a1a33 50%, #0d1a2e 100%)",
    image: "wife-supply.webp",
  },
  {
    title: "AI Customer Reactivation Engine",
    tags: "AI Outreach | John C Cassidy HVAC | Revenue Recovery",
    description:
      "AI-powered SMS and email outreach that reactivated 60%+ of dormant customers. 45% increase in booking conversions.",
    gradient: "linear-gradient(135deg, #0a1628 0%, #0d1e35 50%, #0a1628 100%)",
    image: "cassidy-hvac.webp",
  },
  {
    title: "After-Hours Call Triage",
    tags: "AI Automation | Lead Capture | Routing",
    description:
      "Agentic system that receives after-hours inquiries, assesses urgency with AI, auto-responds via SMS, and routes to the right person.",
    gradient: "linear-gradient(135deg, #0D95E8 0%, #00D4AA 100%)",
    svgIcon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6.5 2h11a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
        <path d="M12 8v3" />
        <path d="M5.5 15.5a6.5 6.5 0 0 0 13 0" />
        <path d="M15.5 13a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z" />
        <path d="M5.5 13a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z" />
        <path d="M12 22v-3" />
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <path d="M8 7h8" />
        <path d="M8 11h8" />
        <path d="M8 15h5" />
        <path d="M15 17l2 2 3-3" />
      </svg>
    ),
  },
  {
    title: "Automated Inventory System",
    tags: "Custom App | Live Tracking | Operations",
    description:
      "Centralized inventory platform with live tracking, inter-site transfers, automated cost formulas, and real-time reporting for insurance audits and compliance.",
    gradient: "linear-gradient(135deg, #f0f4f8 0%, #dce8f0 100%)",
    image: "hg-oil.webp",
  },
  {
    title: "AI Document Analysis",
    tags: "AI Automation | Workflow Integration | Efficiency",
    description:
      "Automation that ingests any document, extracts structured data, categorizes it, and forwards to downstream systems automatically.",
    gradient: "linear-gradient(135deg, #1E293B 0%, #334155 100%)",
    svgIcon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <circle cx="11" cy="15" r="3" />
        <path d="M13.27 17.27L16 20" />
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6.5 6.5h1.5v11H6.5z" />
        <path d="M16 6.5h1.5v11H16z" />
        <path d="M8 10h8" />
        <path d="M8 14h8" />
        <path d="M2 10h4.5" />
        <path d="M2 14h4.5" />
        <path d="M17.5 10H22" />
        <path d="M17.5 14H22" />
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 7l10 7 10-7" />
        <path d="M17 2l1.5 1.5L20 2" />
        <path d="M19 5v-3" />
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="9" cy="7" r="3" />
        <path d="M3 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2" />
        <path d="M19 8l2 2-4 4" />
        <line x1="15" y1="14" x2="21" y2="14" />
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
  {
    title: "Preisser Media — 300K+ Followers",
    tags: "Social Media | Systems | Audience Building",
    description:
      "Built 300K+ followers and 30M+ views across TikTok, Instagram, Facebook, YouTube with repeatable systems and processes.",
    gradient: "linear-gradient(135deg, #EC4899 0%, #F43F5E 100%)",
    svgIcon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="6" width="14" height="12" rx="2" />
        <path d="M16 10l5-3v10l-5-3V10z" />
        <circle cx="9" cy="12" r="2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "See More of What We've Built",
    tags: "Full Portfolio | TylerPreisser.com",
    description:
      "Explore the full portfolio of projects, inventions, and builds at tylerpreisser.com.",
    gradient: "linear-gradient(135deg, #0A1628 0%, #1E3A5F 50%, #0D95E8 100%)",
    svgIcon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8l4 4-4 4" />
        <path d="M8 12h8" />
      </svg>
    ),
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
            className="ps-work-card"
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
                className="ps-work-card-logo"
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
    </section>
  );
}
