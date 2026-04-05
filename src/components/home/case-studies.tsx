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
    gradient: "linear-gradient(135deg, #0D95E8 0%, #0A1628 100%)",
    image: "tyler-headshot-nobg.webp",
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
    image: "cassidy-hvac-nobg.webp",
    lightCard: true,
  },
  {
    title: "After-Hours Call Triage",
    tags: "AI Automation | Lead Capture | Routing",
    description:
      "Agentic system that receives after-hours inquiries, assesses urgency with AI, auto-responds via SMS, and routes to the right person.",
    gradient: "linear-gradient(135deg, #0D95E8 0%, #00D4AA 100%)",
    svgIcon: (
      <svg viewBox="0 0 120 120" fill="none" aria-hidden="true">
        <defs>
          <radialGradient id="triage-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0D95E8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0D95E8" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="triage-phone" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a2e4a" />
            <stop offset="100%" stopColor="#0f1e32" />
          </linearGradient>
          <linearGradient id="triage-screen" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0D95E8" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#00D4AA" stopOpacity="0.05" />
          </linearGradient>
          <filter id="triage-blur">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        {/* Background radial glow */}
        <circle cx="48" cy="60" r="46" fill="url(#triage-glow)" />
        {/* Glow bloom behind phone */}
        <ellipse cx="48" cy="62" rx="26" ry="32" fill="#0D95E8" fillOpacity="0.08" filter="url(#triage-blur)" />
        {/* Phone body */}
        <rect x="18" y="22" width="44" height="76" rx="7" fill="url(#triage-phone)" stroke="#0D95E8" strokeWidth="1.2" strokeOpacity="0.5" />
        {/* Phone screen area */}
        <rect x="23" y="32" width="34" height="52" rx="3" fill="url(#triage-screen)" />
        {/* Phone notch */}
        <rect x="35" y="26" width="10" height="2.5" rx="1.25" fill="#0D95E8" fillOpacity="0.3" />
        {/* Home indicator */}
        <rect x="39" y="88" width="6" height="2" rx="1" fill="#0D95E8" fillOpacity="0.4" />
        {/* Notification lines on screen */}
        <rect x="27" y="38" width="26" height="3" rx="1.5" fill="#0D95E8" fillOpacity="0.9" />
        <rect x="27" y="45" width="20" height="2.5" rx="1.25" fill="#00D4AA" fillOpacity="0.7" />
        <rect x="27" y="51" width="23" height="2.5" rx="1.25" fill="#0D95E8" fillOpacity="0.5" />
        {/* Branching arrow paths from phone */}
        <path d="M62 50 Q72 50 76 40" stroke="#0D95E8" strokeWidth="1.2" strokeOpacity="0.7" strokeDasharray="2 2" />
        <path d="M62 58 Q72 58 76 68" stroke="#00D4AA" strokeWidth="1.2" strokeOpacity="0.7" strokeDasharray="2 2" />
        {/* Arrow heads */}
        <path d="M74 38 L76 40 L74 42" stroke="#0D95E8" strokeWidth="1.2" strokeOpacity="0.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M74 66 L76 68 L74 70" stroke="#00D4AA" strokeWidth="1.2" strokeOpacity="0.8" strokeLinecap="round" strokeLinejoin="round" />
        {/* URGENT circle */}
        <circle cx="87" cy="35" r="9" fill="#EF4444" fillOpacity="0.2" stroke="#EF4444" strokeWidth="1" strokeOpacity="0.9" />
        <path d="M87 31 L87 36" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.9" />
        <circle cx="87" cy="39" r="1" fill="#EF4444" fillOpacity="0.9" />
        {/* QUEUED circle */}
        <circle cx="87" cy="72" r="9" fill="#0D95E8" fillOpacity="0.15" stroke="#0D95E8" strokeWidth="1" strokeOpacity="0.9" />
        <circle cx="87" cy="72" r="3" fill="#0D95E8" fillOpacity="0.6" />
        {/* Clock in top-right */}
        <circle cx="98" cy="22" r="11" fill="#0A1628" stroke="#00D4AA" strokeWidth="1" strokeOpacity="0.7" />
        <circle cx="98" cy="22" r="7.5" fill="none" stroke="#00D4AA" strokeWidth="0.8" strokeOpacity="0.3" />
        <path d="M98 16.5 L98 22 L102 25" stroke="#00D4AA" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" />
        <circle cx="98" cy="22" r="1" fill="#00D4AA" fillOpacity="0.9" />
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
      <svg viewBox="0 0 120 120" fill="none" aria-hidden="true">
        <defs>
          <radialGradient id="invoice-glow" cx="40%" cy="55%" r="55%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="invoice-doc" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2a1f0e" />
            <stop offset="100%" stopColor="#1c1008" />
          </linearGradient>
          <linearGradient id="invoice-beam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0" />
            <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#FBBF24" stopOpacity="1" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </linearGradient>
          <filter id="invoice-beam-blur">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
          <linearGradient id="invoice-card1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {/* Background glow */}
        <ellipse cx="60" cy="60" r="52" fill="url(#invoice-glow)" />
        {/* Document shape */}
        <rect x="12" y="18" width="52" height="70" rx="5" fill="url(#invoice-doc)" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.4" />
        {/* Document fold corner */}
        <path d="M52 18 L64 30" stroke="#F59E0B" strokeWidth="0.8" strokeOpacity="0.3" />
        <path d="M52 18 L52 30 L64 30" fill="#F59E0B" fillOpacity="0.08" />
        {/* Document lines */}
        <rect x="20" y="32" width="30" height="2.5" rx="1.25" fill="#F59E0B" fillOpacity="0.5" />
        <rect x="20" y="39" width="24" height="2" rx="1" fill="#F59E0B" fillOpacity="0.35" />
        <rect x="20" y="46" width="27" height="2" rx="1" fill="#F59E0B" fillOpacity="0.35" />
        <rect x="20" y="53" width="20" height="2" rx="1" fill="#F59E0B" fillOpacity="0.25" />
        <rect x="20" y="60" width="22" height="2" rx="1" fill="#F59E0B" fillOpacity="0.25" />
        <rect x="20" y="68" width="16" height="2" rx="1" fill="#F59E0B" fillOpacity="0.2" />
        {/* AI scan beam — glowing horizontal line */}
        <rect x="12" y="54" width="52" height="3" rx="1.5" fill="url(#invoice-beam)" />
        <rect x="12" y="54.5" width="52" height="2" rx="1" fill="url(#invoice-beam)" fillOpacity="0.6" filter="url(#invoice-beam-blur)" />
        {/* Sparkle dots around extraction */}
        <circle cx="72" cy="30" r="1.5" fill="#FBBF24" fillOpacity="0.9" />
        <circle cx="78" cy="42" r="1" fill="#F59E0B" fillOpacity="0.7" />
        <circle cx="70" cy="55" r="1" fill="#FBBF24" fillOpacity="0.6" />
        <circle cx="80" cy="62" r="1.5" fill="#F59E0B" fillOpacity="0.8" />
        {/* Extracted data cards stacking on the right */}
        <rect x="74" y="25" width="30" height="16" rx="3" fill="url(#invoice-card1)" stroke="#F59E0B" strokeWidth="0.8" strokeOpacity="0.6" />
        <rect x="20" y="27" width="16" height="2" rx="1" fill="#F59E0B" fillOpacity="0.5" transform="translate(54 0)" />
        <rect x="20" y="32" width="10" height="1.5" rx="0.75" fill="#F59E0B" fillOpacity="0.3" transform="translate(54 0)" />
        <rect x="74" y="47" width="30" height="16" rx="3" fill="url(#invoice-card1)" stroke="#F59E0B" strokeWidth="0.8" strokeOpacity="0.5" />
        <rect x="20" y="49" width="16" height="2" rx="1" fill="#EF4444" fillOpacity="0.5" transform="translate(54 0)" />
        <rect x="20" y="54" width="12" height="1.5" rx="0.75" fill="#EF4444" fillOpacity="0.3" transform="translate(54 0)" />
        <rect x="74" y="69" width="30" height="16" rx="3" fill="url(#invoice-card1)" stroke="#EF4444" strokeWidth="0.8" strokeOpacity="0.4" />
        <rect x="20" y="71" width="14" height="2" rx="1" fill="#F59E0B" fillOpacity="0.4" transform="translate(54 0)" />
        <rect x="20" y="76" width="9" height="1.5" rx="0.75" fill="#F59E0B" fillOpacity="0.25" transform="translate(54 0)" />
        {/* Checkmark badge */}
        <circle cx="36" cy="96" r="10" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="1" strokeOpacity="0.9" />
        <path d="M30 96 L34 100 L42 90" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.95" />
      </svg>
    ),
  },
  {
    title: "Automated Inventory System",
    tags: "Custom App | HG Oil Holdings | Live Tracking",
    description:
      "Centralized inventory platform with live tracking, inter-site transfers, automated cost formulas, and real-time reporting for insurance audits and compliance.",
    gradient: "linear-gradient(135deg, #f0f4f8 0%, #dce8f0 100%)",
    image: "hg-oil-icon.webp",
    lightCard: true,
  },
  {
    title: "AI Document Analysis",
    tags: "AI Automation | Workflow Integration | Efficiency",
    description:
      "Automation that ingests any document, extracts structured data, categorizes it, and forwards to downstream systems automatically.",
    gradient: "linear-gradient(135deg, #1E293B 0%, #334155 100%)",
    svgIcon: (
      <svg viewBox="0 0 120 120" fill="none" aria-hidden="true">
        <defs>
          <radialGradient id="docai-glow" cx="55%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="docai-doc1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e2d42" />
            <stop offset="100%" stopColor="#162134" />
          </linearGradient>
          <linearGradient id="docai-doc2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#243451" />
            <stop offset="100%" stopColor="#1a2840" />
          </linearGradient>
          <linearGradient id="docai-doc3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2c3f60" />
            <stop offset="100%" stopColor="#22324e" />
          </linearGradient>
          <radialGradient id="docai-lens" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.08" />
          </radialGradient>
          <filter id="docai-lens-glow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {/* Background glow */}
        <ellipse cx="62" cy="58" r="50" fill="url(#docai-glow)" />
        {/* Document stack — back doc (offset most) */}
        <rect x="22" y="28" width="52" height="66" rx="4" fill="url(#docai-doc3)" stroke="#60A5FA" strokeWidth="0.8" strokeOpacity="0.25" />
        {/* Document stack — mid doc */}
        <rect x="17" y="22" width="52" height="66" rx="4" fill="url(#docai-doc2)" stroke="#60A5FA" strokeWidth="0.8" strokeOpacity="0.35" />
        {/* Document stack — front doc */}
        <rect x="12" y="16" width="52" height="66" rx="4" fill="url(#docai-doc1)" stroke="#60A5FA" strokeWidth="1" strokeOpacity="0.55" />
        {/* Front doc corner fold */}
        <path d="M48 16 L64 32" stroke="#60A5FA" strokeWidth="0.8" strokeOpacity="0.3" />
        <path d="M48 16 L48 32 L64 32" fill="#60A5FA" fillOpacity="0.06" />
        {/* Front doc content lines */}
        <rect x="19" y="38" width="28" height="2.5" rx="1.25" fill="#60A5FA" fillOpacity="0.45" />
        <rect x="19" y="44" width="22" height="2" rx="1" fill="#60A5FA" fillOpacity="0.3" />
        <rect x="19" y="50" width="25" height="2" rx="1" fill="#60A5FA" fillOpacity="0.25" />
        <rect x="19" y="56" width="18" height="2" rx="1" fill="#60A5FA" fillOpacity="0.2" />
        {/* Magnifying glass body */}
        <circle cx="74" cy="68" r="24" fill="url(#docai-lens)" stroke="#60A5FA" strokeWidth="1.2" strokeOpacity="0.8" filter="url(#docai-lens-glow)" />
        <circle cx="74" cy="68" r="24" fill="none" stroke="#60A5FA" strokeWidth="1.2" strokeOpacity="0.8" />
        {/* Magnifying glass handle */}
        <line x1="92" y1="86" x2="104" y2="98" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.7" />
        <line x1="92" y1="86" x2="104" y2="98" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
        {/* Neural network inside lens */}
        <circle cx="67" cy="63" r="3" fill="#60A5FA" fillOpacity="0.85" />
        <circle cx="81" cy="63" r="3" fill="#60A5FA" fillOpacity="0.85" />
        <circle cx="74" cy="75" r="3" fill="#93C5FD" fillOpacity="0.9" />
        <circle cx="74" cy="57" r="2.5" fill="#BFDBFE" fillOpacity="0.75" />
        <line x1="67" y1="63" x2="81" y2="63" stroke="#60A5FA" strokeWidth="0.8" strokeOpacity="0.6" />
        <line x1="67" y1="63" x2="74" y2="75" stroke="#60A5FA" strokeWidth="0.8" strokeOpacity="0.5" />
        <line x1="81" y1="63" x2="74" y2="75" stroke="#60A5FA" strokeWidth="0.8" strokeOpacity="0.5" />
        <line x1="67" y1="63" x2="74" y2="57" stroke="#60A5FA" strokeWidth="0.8" strokeOpacity="0.4" />
        <line x1="81" y1="63" x2="74" y2="57" stroke="#60A5FA" strokeWidth="0.8" strokeOpacity="0.4" />
        {/* Floating data points */}
        <circle cx="8" cy="55" r="2" fill="#60A5FA" fillOpacity="0.4" />
        <circle cx="100" cy="28" r="1.5" fill="#93C5FD" fillOpacity="0.5" />
        <circle cx="106" cy="50" r="1" fill="#60A5FA" fillOpacity="0.35" />
        <circle cx="14" cy="90" r="1.5" fill="#60A5FA" fillOpacity="0.3" />
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
      <svg viewBox="0 0 120 120" fill="none" aria-hidden="true">
        <defs>
          <radialGradient id="fitness-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="fitness-body" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="fitness-ecg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
            <stop offset="40%" stopColor="#34D399" stopOpacity="1" />
            <stop offset="60%" stopColor="#10B981" stopOpacity="1" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="fitness-plan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0d3326" />
            <stop offset="100%" stopColor="#092a1e" />
          </linearGradient>
          <filter id="fitness-ecg-glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {/* Background glow */}
        <circle cx="60" cy="60" r="52" fill="url(#fitness-glow)" />
        {/* Body silhouette — head */}
        <circle cx="60" cy="22" r="9" fill="url(#fitness-body)" stroke="#10B981" strokeWidth="1" strokeOpacity="0.6" />
        {/* Body silhouette — torso */}
        <path d="M46 40 Q46 34 60 34 Q74 34 74 40 L78 70 Q78 74 74 74 L46 74 Q42 74 42 70 Z" fill="url(#fitness-body)" stroke="#10B981" strokeWidth="1" strokeOpacity="0.55" />
        {/* Body silhouette — arms */}
        <path d="M46 40 L30 58 Q28 62 32 64 L38 66" stroke="#10B981" strokeWidth="5" strokeLinecap="round" strokeOpacity="0.45" fill="none" />
        <path d="M74 40 L90 58 Q92 62 88 64 L82 66" stroke="#10B981" strokeWidth="5" strokeLinecap="round" strokeOpacity="0.45" fill="none" />
        {/* Body silhouette — legs */}
        <path d="M50 74 L46 100 Q45 104 50 104 L55 104 Q58 104 58 100 L60 80" stroke="#10B981" strokeWidth="5" strokeLinecap="round" strokeOpacity="0.4" fill="none" />
        <path d="M70 74 L74 100 Q75 104 70 104 L65 104 Q62 104 62 100 L60 80" stroke="#10B981" strokeWidth="5" strokeLinecap="round" strokeOpacity="0.4" fill="none" />
        {/* ECG heartbeat line — runs horizontally through torso */}
        <polyline
          points="10,57 24,57 30,57 36,42 42,72 48,50 54,57 66,57 72,57 78,57 84,57"
          stroke="url(#fitness-ecg)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#fitness-ecg-glow)"
        />
        {/* Dumbbell at bottom-left */}
        <rect x="10" y="83" width="22" height="6" rx="3" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="0.8" strokeOpacity="0.6" />
        <rect x="7" y="80" width="6" height="12" rx="2.5" fill="#10B981" fillOpacity="0.25" stroke="#10B981" strokeWidth="0.8" strokeOpacity="0.7" />
        <rect x="29" y="80" width="6" height="12" rx="2.5" fill="#10B981" fillOpacity="0.25" stroke="#10B981" strokeWidth="0.8" strokeOpacity="0.7" />
        {/* Plan card at top-right */}
        <rect x="80" y="14" width="34" height="38" rx="4" fill="url(#fitness-plan)" stroke="#10B981" strokeWidth="0.9" strokeOpacity="0.6" />
        <rect x="85" y="20" width="20" height="2" rx="1" fill="#10B981" fillOpacity="0.7" />
        <rect x="85" y="26" width="16" height="1.5" rx="0.75" fill="#34D399" fillOpacity="0.5" />
        <rect x="85" y="30" width="18" height="1.5" rx="0.75" fill="#10B981" fillOpacity="0.4" />
        <rect x="85" y="34" width="14" height="1.5" rx="0.75" fill="#10B981" fillOpacity="0.35" />
        <rect x="85" y="38" width="16" height="1.5" rx="0.75" fill="#10B981" fillOpacity="0.3" />
        <rect x="85" y="42" width="12" height="1.5" rx="0.75" fill="#10B981" fillOpacity="0.25" />
        {/* Green accent dots */}
        <circle cx="104" cy="70" r="2" fill="#34D399" fillOpacity="0.6" />
        <circle cx="110" cy="80" r="1.5" fill="#10B981" fillOpacity="0.4" />
        <circle cx="14" cy="40" r="1.5" fill="#10B981" fillOpacity="0.5" />
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
      <svg viewBox="0 0 120 120" fill="none" aria-hidden="true">
        <defs>
          <radialGradient id="email-glow" cx="50%" cy="70%" r="55%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="email-envelope" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2d2060" />
            <stop offset="100%" stopColor="#1e1540" />
          </linearGradient>
          <linearGradient id="email-card-a" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#312a6e" />
            <stop offset="100%" stopColor="#231e52" />
          </linearGradient>
          <linearGradient id="email-card-b" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b3480" />
            <stop offset="100%" stopColor="#2d2760" />
          </linearGradient>
          <linearGradient id="email-card-c" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4a3fa0" />
            <stop offset="100%" stopColor="#3a3180" />
          </linearGradient>
          <filter id="email-glow-filter">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {/* Background glow */}
        <ellipse cx="60" cy="72" rx="50" ry="44" fill="url(#email-glow)" />
        {/* Envelope body */}
        <rect x="18" y="68" width="64" height="44" rx="5" fill="url(#email-envelope)" stroke="#8B5CF6" strokeWidth="1.1" strokeOpacity="0.6" />
        {/* Envelope flap open — two triangular halves */}
        <path d="M18 68 L50 50 L82 68" fill="#2d2060" stroke="#8B5CF6" strokeWidth="1.1" strokeOpacity="0.55" />
        {/* Envelope flap crease */}
        <path d="M18 68 L50 84 L82 68" fill="none" stroke="#8B5CF6" strokeWidth="0.8" strokeOpacity="0.3" />
        {/* Envelope inner shadow line */}
        <line x1="18" y1="74" x2="82" y2="74" stroke="#8B5CF6" strokeWidth="0.6" strokeOpacity="0.15" />
        {/* Rising content cards — fanning out of envelope */}
        {/* Left card (angled left) */}
        <g transform="rotate(-18 60 68)">
          <rect x="28" y="14" width="30" height="40" rx="3" fill="url(#email-card-a)" stroke="#6366F1" strokeWidth="0.9" strokeOpacity="0.6" />
          <rect x="33" y="20" width="18" height="2" rx="1" fill="#6366F1" fillOpacity="0.6" />
          <rect x="33" y="25" width="14" height="1.5" rx="0.75" fill="#6366F1" fillOpacity="0.4" />
          <rect x="33" y="29" width="16" height="1.5" rx="0.75" fill="#6366F1" fillOpacity="0.35" />
          <rect x="33" y="33" width="12" height="1.5" rx="0.75" fill="#6366F1" fillOpacity="0.25" />
        </g>
        {/* Center card (straight up) */}
        <rect x="45" y="10" width="30" height="44" rx="3" fill="url(#email-card-b)" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.75" />
        <rect x="51" y="17" width="18" height="2.5" rx="1.25" fill="#A78BFA" fillOpacity="0.7" />
        <rect x="51" y="23" width="14" height="1.5" rx="0.75" fill="#8B5CF6" fillOpacity="0.5" />
        <rect x="51" y="27" width="16" height="1.5" rx="0.75" fill="#8B5CF6" fillOpacity="0.4" />
        <rect x="51" y="31" width="12" height="1.5" rx="0.75" fill="#8B5CF6" fillOpacity="0.35" />
        <rect x="51" y="35" width="14" height="1.5" rx="0.75" fill="#8B5CF6" fillOpacity="0.25" />
        {/* Right card (angled right) */}
        <g transform="rotate(18 60 68)">
          <rect x="62" y="14" width="30" height="40" rx="3" fill="url(#email-card-c)" stroke="#A78BFA" strokeWidth="0.9" strokeOpacity="0.55" />
          <rect x="67" y="20" width="18" height="2" rx="1" fill="#A78BFA" fillOpacity="0.55" />
          <rect x="67" y="25" width="13" height="1.5" rx="0.75" fill="#A78BFA" fillOpacity="0.38" />
          <rect x="67" y="29" width="15" height="1.5" rx="0.75" fill="#A78BFA" fillOpacity="0.3" />
          <rect x="67" y="33" width="11" height="1.5" rx="0.75" fill="#A78BFA" fillOpacity="0.22" />
        </g>
        {/* Sparkle marks */}
        <path d="M100 22 L101.2 26 L105 27.2 L101.2 28.4 L100 32 L98.8 28.4 L95 27.2 L98.8 26 Z" fill="#A78BFA" fillOpacity="0.9" />
        <path d="M12 38 L12.8 40.8 L15.5 41.5 L12.8 42.2 L12 45 L11.2 42.2 L8.5 41.5 L11.2 40.8 Z" fill="#8B5CF6" fillOpacity="0.7" />
        <path d="M108 50 L108.5 51.8 L110.2 52.2 L108.5 52.7 L108 54.5 L107.5 52.7 L105.8 52.2 L107.5 51.8 Z" fill="#6366F1" fillOpacity="0.6" />
        <circle cx="16" cy="60" r="1.5" fill="#8B5CF6" fillOpacity="0.5" />
        <circle cx="108" cy="72" r="1" fill="#A78BFA" fillOpacity="0.4" />
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
      <svg viewBox="0 0 120 120" fill="none" aria-hidden="true">
        <defs>
          <radialGradient id="hiring-glow" cx="50%" cy="60%" r="55%">
            <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hiring-funnel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="hiring-selected" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0.7" />
          </linearGradient>
          <filter id="hiring-output-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {/* Background glow */}
        <ellipse cx="60" cy="68" rx="48" ry="46" fill="url(#hiring-glow)" />
        {/* Funnel shape */}
        <path d="M10 22 L110 22 L76 62 L76 90 L44 90 L44 62 Z" fill="url(#hiring-funnel)" stroke="#0EA5E9" strokeWidth="1.1" strokeOpacity="0.5" />
        {/* Funnel sieve lines */}
        <line x1="30" y1="34" x2="90" y2="34" stroke="#0EA5E9" strokeWidth="0.7" strokeOpacity="0.35" strokeDasharray="3 3" />
        <line x1="40" y1="46" x2="80" y2="46" stroke="#0EA5E9" strokeWidth="0.7" strokeOpacity="0.3" strokeDasharray="3 3" />
        <line x1="48" y1="57" x2="72" y2="57" stroke="#0EA5E9" strokeWidth="0.7" strokeOpacity="0.25" strokeDasharray="2 3" />
        {/* 5 person circles entering funnel at top */}
        {/* Person 1 */}
        <circle cx="24" cy="14" r="6.5" fill="#0A1628" stroke="#0EA5E9" strokeWidth="1" strokeOpacity="0.7" />
        <circle cx="24" cy="12" r="2.5" fill="#0EA5E9" fillOpacity="0.55" />
        <path d="M18 20 Q18 17 24 17 Q30 17 30 20" fill="#0EA5E9" fillOpacity="0.4" />
        {/* Person 2 */}
        <circle cx="41" cy="12" r="6.5" fill="#0A1628" stroke="#0EA5E9" strokeWidth="1" strokeOpacity="0.6" />
        <circle cx="41" cy="10" r="2.5" fill="#0EA5E9" fillOpacity="0.5" />
        <path d="M35 18 Q35 15 41 15 Q47 15 47 18" fill="#0EA5E9" fillOpacity="0.35" />
        {/* Person 3 — center */}
        <circle cx="60" cy="10" r="6.5" fill="#0A1628" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.75" />
        <circle cx="60" cy="8" r="2.5" fill="#38BDF8" fillOpacity="0.6" />
        <path d="M54 16 Q54 13 60 13 Q66 13 66 16" fill="#38BDF8" fillOpacity="0.45" />
        {/* Person 4 */}
        <circle cx="79" cy="12" r="6.5" fill="#0A1628" stroke="#0EA5E9" strokeWidth="1" strokeOpacity="0.6" />
        <circle cx="79" cy="10" r="2.5" fill="#0EA5E9" fillOpacity="0.5" />
        <path d="M73 18 Q73 15 79 15 Q85 15 85 18" fill="#0EA5E9" fillOpacity="0.35" />
        {/* Person 5 */}
        <circle cx="96" cy="14" r="6.5" fill="#0A1628" stroke="#0EA5E9" strokeWidth="1" strokeOpacity="0.55" />
        <circle cx="96" cy="12" r="2.5" fill="#0EA5E9" fillOpacity="0.45" />
        <path d="M90 20 Q90 17 96 17 Q102 17 102 20" fill="#0EA5E9" fillOpacity="0.3" />
        {/* Funnel output stem */}
        <rect x="49" y="90" width="22" height="10" rx="3" fill="#0EA5E9" fillOpacity="0.15" stroke="#0EA5E9" strokeWidth="0.8" strokeOpacity="0.4" />
        {/* Blue output glow */}
        <ellipse cx="60" cy="108" rx="20" ry="6" fill="#0EA5E9" fillOpacity="0.15" filter="url(#hiring-output-glow)" />
        {/* 2 selected (highlighted) person circles at output */}
        <circle cx="47" cy="110" r="8" fill="url(#hiring-selected)" stroke="#38BDF8" strokeWidth="1.2" strokeOpacity="0.9" filter="url(#hiring-output-glow)" />
        <circle cx="47" cy="107.5" r="3" fill="white" fillOpacity="0.8" />
        <path d="M41 115 Q41 112 47 112 Q53 112 53 115" fill="white" fillOpacity="0.7" />
        {/* Checkmark on left selected */}
        <circle cx="53.5" cy="103.5" r="4" fill="#10B981" fillOpacity="0.95" />
        <path d="M51 103.5 L53 106 L57 101" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="73" cy="110" r="8" fill="url(#hiring-selected)" stroke="#38BDF8" strokeWidth="1.2" strokeOpacity="0.9" filter="url(#hiring-output-glow)" />
        <circle cx="73" cy="107.5" r="3" fill="white" fillOpacity="0.8" />
        <path d="M67 115 Q67 112 73 112 Q79 112 79 115" fill="white" fillOpacity="0.7" />
        {/* Checkmark on right selected */}
        <circle cx="79.5" cy="103.5" r="4" fill="#10B981" fillOpacity="0.95" />
        <path d="M77 103.5 L79 106 L83 101" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
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
    title: "Same Battles",
    tags: "Website Build | Bible Study Resource | Content Platform",
    description:
      "Bible study resource website for hosting verses, devotional content, and weekly men's study materials. Built from scratch with a clean, purpose-driven design.",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    image: "same-battles.webp",
  },
  {
    title: "Church iOS Application",
    tags: "iOS App | SwiftUI | Liquid Glass UI",
    description:
      "Modern iOS application built with Apple's latest liquid glass design language and SwiftUI. Cutting-edge mobile experience for community engagement and church operations.",
    gradient: "linear-gradient(135deg, #0A1628 0%, #1E3A5F 50%, #0D95E8 100%)",
    svgIcon: (
      <svg viewBox="0 0 120 120" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="church-glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#80E9FF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0D95E8" stopOpacity="0.6" />
          </linearGradient>
          <radialGradient id="church-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#0D95E8" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0D95E8" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="60" cy="60" r="50" fill="url(#church-glow)" />
        {/* iPhone outline */}
        <rect x="35" y="12" width="50" height="96" rx="12" stroke="#80E9FF" strokeWidth="1.5" strokeOpacity="0.5" />
        {/* Notch */}
        <rect x="50" y="16" width="20" height="5" rx="2.5" fill="#0D95E8" fillOpacity="0.3" />
        {/* Glass effect panels */}
        <rect x="40" y="28" width="40" height="20" rx="6" fill="url(#church-glass)" stroke="#80E9FF" strokeWidth="0.5" strokeOpacity="0.3" />
        <rect x="40" y="52" width="40" height="14" rx="6" fill="url(#church-glass)" stroke="#80E9FF" strokeWidth="0.5" strokeOpacity="0.3" />
        <rect x="40" y="70" width="40" height="14" rx="6" fill="url(#church-glass)" stroke="#80E9FF" strokeWidth="0.5" strokeOpacity="0.3" />
        {/* Tab bar */}
        <rect x="40" y="90" width="40" height="10" rx="5" fill="#0D95E8" fillOpacity="0.15" />
        <circle cx="50" cy="95" r="2" fill="#0D95E8" fillOpacity="0.6" />
        <circle cx="60" cy="95" r="2" fill="#80E9FF" />
        <circle cx="70" cy="95" r="2" fill="#0D95E8" fillOpacity="0.6" />
        {/* Apple-style glow at top */}
        <ellipse cx="60" cy="35" rx="15" ry="8" fill="#80E9FF" fillOpacity="0.08" />
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
