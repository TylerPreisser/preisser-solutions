"use client";

import { useRef } from "react";

interface CaseStudyCard {
  title: string;
  tags: string;
  description: string;
  gradient: string;
}

const caseStudyCards: CaseStudyCard[] = [
  {
    title: "The Iron and Oak Podcast",
    tags: "Website Build | Brand Identity | AI Search",
    description:
      "Built from zero — website, logo, full brand identity, podcast distribution across all major networks, and AI search optimization.",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
  },
  {
    title: "PreisserSolutions.com",
    tags: "Custom Website | Lead Pipeline | Local SEO",
    description:
      "Custom-coded, mobile-first website with integrated ROI calculator, case studies, and a contact pipeline that routes inquiries directly.",
    gradient: "linear-gradient(135deg, #0D95E8 0%, #635BFF 100%)",
  },
  {
    title: "TylerPreisser.com",
    tags: "Portfolio | GEO/SEO | AI Search Optimization",
    description:
      "Professional portfolio structured to be cited by ChatGPT, Perplexity, and Google AI Overviews. Fixed a critical JS rendering issue blocking crawlers.",
    gradient: "linear-gradient(135deg, #0A1628 0%, #1E3A5F 100%)",
  },
  {
    title: "Wife Supply Co",
    tags: "AI Application | Product Build | Full Deployment",
    description:
      "AI-powered gifting platform where users describe preferences and get personalized recommendations in real time. Concept to live deployment.",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    title: "AI Customer Reactivation Engine",
    tags: "AI Outreach | John C Cassidy HVAC | Revenue Recovery",
    description:
      "AI-powered SMS and email outreach that reactivated 60%+ of dormant customers. 45% increase in booking conversions.",
    gradient: "linear-gradient(135deg, #635BFF 0%, #a855f7 100%)",
  },
  {
    title: "After-Hours Call Triage",
    tags: "AI Automation | Lead Capture | Routing",
    description:
      "Agentic system that receives after-hours inquiries, assesses urgency with AI, auto-responds via SMS, and routes to the right person.",
    gradient: "linear-gradient(135deg, #0D95E8 0%, #00D4AA 100%)",
  },
  {
    title: "AI Invoice Processing",
    tags: "Document Processing | Data Extraction | Automation",
    description:
      "AI reads invoices, extracts data, categorizes expenses, flags anomalies, and routes for approval. 75% reduction in processing time.",
    gradient: "linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)",
  },
  {
    title: "Automated Inventory System",
    tags: "Custom App | Live Tracking | Operations",
    description:
      "Centralized inventory platform with live tracking, inter-site transfers, automated cost formulas, and real-time reporting for insurance audits and compliance.",
    gradient: "linear-gradient(135deg, #00D4AA 0%, #0D95E8 100%)",
  },
  {
    title: "AI Document Analysis",
    tags: "AI Automation | Workflow Integration | Efficiency",
    description:
      "Automation that ingests any document, extracts structured data, categorizes it, and forwards to downstream systems automatically.",
    gradient: "linear-gradient(135deg, #1E293B 0%, #334155 100%)",
  },
  {
    title: "Custom AI Fitness Agent",
    tags: "Custom AI Agent | Personalization | Data",
    description:
      "AI agent that produces fully personalized fitness regimens based on body data, goals, and current research from across the internet.",
    gradient: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
  },
  {
    title: "AI Email Digest System",
    tags: "AI Automation | Email Management | Productivity",
    description:
      "Scans 24 hours of email, summarizes each in 1-3 sentences, categorizes into actionable buckets, outputs a clean briefing digest.",
    gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
  },
  {
    title: "Hiring Pipeline & AI Screener",
    tags: "Google Workspace | Apps Script | AI Agent",
    description:
      "Complete hiring infrastructure with candidate tracking, automated outreach, and an AI pre-screener that ranks applicants automatically.",
    gradient: "linear-gradient(135deg, #0EA5E9 0%, #2563EB 100%)",
  },
  {
    title: "Contact Form to CRM Pipeline",
    tags: "Integration | Lead Automation | R Squared AI",
    description:
      "End-to-end automated lead pipeline: form capture, CRM logging, AI qualification, Slack notification. Zero manual steps.",
    gradient: "linear-gradient(135deg, #14B8A6 0%, #0D95E8 100%)",
  },
  {
    title: "Alpha Matrix — Multi-Agent AI",
    tags: "AI Architecture | R Squared AI | Autonomous",
    description:
      "Six specialized AI agents working in sequence with self-evolving intelligence. Enterprise-grade autonomous analysis system.",
    gradient:
      "linear-gradient(135deg, #7C3AED 0%, #4F46E5 50%, #0D95E8 100%)",
  },
  {
    title: "Preisser Media — 300K+ Followers",
    tags: "Social Media | Systems | Audience Building",
    description:
      "Built 300K+ followers and 30M+ views across TikTok, Instagram, Facebook, YouTube with repeatable systems and processes.",
    gradient: "linear-gradient(135deg, #EC4899 0%, #F43F5E 100%)",
  },
  {
    title: "See More of What We've Built",
    tags: "Full Portfolio | TylerPreisser.com",
    description:
      "Explore the full portfolio of projects, inventions, and builds at tylerpreisser.com.",
    gradient: "linear-gradient(135deg, #0A1628 0%, #1E3A5F 50%, #0D95E8 100%)",
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
