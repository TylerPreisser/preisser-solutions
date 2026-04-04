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
    title: "Automated Social Media Engine",
    tags: "AI Marketing | Content Production | Growth",
    description:
      "Fully autonomous AI system that generates content, creates visuals, and publishes daily. 5x organic reach increase in 30 days.",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    title: "AI Customer Reactivation Engine",
    tags: "AI Outreach | Data Cleanup | Revenue Recovery",
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
      "Centralized inventory platform with live counts, inter-site transfers, and automated cost tracking. 95% reduction in tracking time.",
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
    tags: "Integration | Lead Automation | No-Code",
    description:
      "End-to-end automated lead pipeline: form capture, CRM logging, AI qualification, Slack notification. Zero manual steps.",
    gradient: "linear-gradient(135deg, #14B8A6 0%, #0D95E8 100%)",
  },
  {
    title: "Alpha Matrix — Multi-Agent AI",
    tags: "AI Architecture | Multi-Agent | Autonomous",
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
    title: "SkySprayers — Drone Docking Station",
    tags: "Invention | Engineering | Prototype",
    description:
      "Autonomous agricultural spray-drone docking station. Concept through CAD to working prototype. 2nd Place Kansas Startup Competition.",
    gradient: "linear-gradient(135deg, #22C55E 0%, #15803D 100%)",
  },
  {
    title: "BIA — Hydroelectric Filtration",
    tags: "Invention | Engineering | Problem-Solving",
    description:
      "Hydroelectric livestock water purification using pre-existing water pressure for UV-C filtration. No external electricity required.",
    gradient: "linear-gradient(135deg, #06B6D4 0%, #0284C7 100%)",
  },
  {
    title: "Electromagnetic Pulsation Motor",
    tags: "Invention | Engineering | Prototype",
    description:
      "Novel electromagnetic motor designed and prototyped from theory through engineering to working model.",
    gradient: "linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)",
  },
  {
    title: "Roof Truss Optimization",
    tags: "Engineering | Cost Reduction | Efficiency",
    description:
      "Truss design system achieving 9% lumber cost reduction while maintaining structural integrity. Applied at Truss Craft Structural Components.",
    gradient: "linear-gradient(135deg, #D97706 0%, #B45309 100%)",
  },
  {
    title: "Car Bubble — Vehicle Shelter",
    tags: "Invention | Prototyping | Product",
    description:
      "Collapsible protective vehicle shelter taken from initial idea through multiple working prototypes.",
    gradient: "linear-gradient(135deg, #475569 0%, #1E293B 100%)",
  },
  {
    title: "Custom Jewelry CAD Design",
    tags: "Precision Engineering | CAD | Design",
    description:
      "Bespoke engagement rings and fine jewelry designed in Autodesk Inventor and SOLIDWORKS with sub-millimeter precision.",
    gradient:
      "linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #92400E 100%)",
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
            22 Projects. Real Results.
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
              <span className="ps-work-card-link">
                View project <span aria-hidden="true">&gt;</span>
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
