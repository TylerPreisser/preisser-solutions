"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  WebsiteVisual,
  AutomationVisual,
  SystemFixesVisual,
  DashboardVisual,
  RevenueVisual,
} from "@/components/home/card-visuals-backup";

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */

interface StatItem {
  number: string;
  label: string;
}

interface ServiceTile {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface Differentiator {
  lead: string;
  body: string;
}

interface ServicePillar {
  type: string;
  title: string;
  description: string;
  href: string;
  visual: React.ReactNode;
  bullets: string[];
  stats: StatItem[];
  painPoints: string[];
  serviceTiles: ServiceTile[];
  differentiators: Differentiator[];
}

/* ─────────────────────────────────────────────────────────────
   SERVICE DATA
   ───────────────────────────────────────────────────────────── */

const services: ServicePillar[] = [
  {
    type: "websites",
    title: "Websites & Applications",
    description:
      "Professional sites, custom apps, client portals, and e-commerce systems — built from scratch, built to perform.",
    href: "/contact",
    visual: <WebsiteVisual />,
    bullets: [
      "Professional website development",
      "Custom web applications",
      "E-commerce and online sales systems",
      "Ongoing maintenance and performance support",
    ],
    stats: [
      { number: "81%", label: "of consumers research online before buying" },
      { number: "3 in 4", label: "Americans now search with AI weekly" },
      { number: "70%+", label: "of businesses see revenue increase after site launch" },
    ],
    painPoints: [
      "Our website exists, but it's never once brought in a customer.",
      "Our website hasn't generated a single lead in the time we've had it.",
      "We paid a developer two years ago and haven't been able to update it since.",
      "Our competitors' sites look like real companies. Ours looks like an afterthought.",
      "I know we need to show up in search results, but I have no idea where to start.",
      "We have an idea for a tool or app that would help our customers, but no way to build it.",
    ],
    serviceTiles: [
      {
        title: "Professional Website Builds",
        description:
          "Custom-coded, fast-loading, mobile-optimized websites. No templates, no page builders. Built to rank and convert.",
        icon: <IconProfessionalWebsite />,
      },
      {
        title: "AI Search Optimization (GEO)",
        description:
          "Your site optimized for ChatGPT, Perplexity, Google AI Overviews. 900M people use ChatGPT weekly. If you're not in those answers, your competitor is.",
        icon: <IconAISearch />,
      },
      {
        title: "Google Business Profile & Review Systems",
        description:
          "Full profile optimization plus automated review request systems. Top-ranking local businesses average 47 reviews.",
        icon: <IconGoogleBusiness />,
      },
      {
        title: "SEO & Local Search",
        description:
          "Site structure, content, and technical performance built to rank for the searches that matter in your market.",
        icon: <IconSEOLocalSearch />,
      },
      {
        title: "Custom Web Applications",
        description:
          "Client portals, booking systems, internal tools, intake forms, calculators. If you need more than a website, we build it.",
        icon: <IconCustomWebApp />,
      },
      {
        title: "UI/UX Redesign",
        description:
          "Your current site works but looks outdated. We redesign for modern aesthetics and higher conversion without rebuilding from scratch.",
        icon: <IconUIUXRedesign />,
      },
      {
        title: "E-Commerce & Online Sales",
        description:
          "Product catalogs, payments, inventory sync, automated orders. A real store, not a template.",
        icon: <IconECommerce />,
      },
    ],
    differentiators: [
      {
        lead: "AI search is our edge.",
        body: "We build for ChatGPT, Perplexity, and AI Overviews — not just Google. Almost nobody locally does this yet.",
      },
      {
        lead: "You own everything.",
        body: "Your code. Your domain. Your data. No proprietary lock-in.",
      },
      {
        lead: "Sites that generate business.",
        body: "Not digital brochures. Lead machines with tracking, forms, and conversion optimization built in.",
      },
    ],
  },
  {
    type: "automation",
    title: "Automation Systems",
    description:
      "AI-powered engines that handle your repetitive work — invoicing, outreach, document processing, you name it.",
    href: "/contact",
    visual: <AutomationVisual />,
    bullets: [
      "Process automation",
      "AI document processing",
      "Custom AI assistants",
      "Intelligent alerts and monitoring",
    ],
    stats: [
      { number: "240%", label: "average ROI, typically paid back in 6-9 months" },
      { number: "70–90%", label: "time reduction in document processing with AI" },
      { number: "$46K/yr", label: "average savings from fewer errors and less manual work" },
    ],
    painPoints: [
      "We have three people doing work that should take zero people.",
      "Every time someone quits, half our processes walk out the door with them.",
      "We're still copying data between systems by hand — in 2026.",
      "I know there's a faster way to do this, but nobody has time to figure it out.",
      "Our best employees are buried in busywork instead of the jobs I hired them for.",
      "We keep hiring to keep up with volume instead of fixing the process that causes it.",
    ],
    serviceTiles: [
      {
        title: "AI Document Processing",
        description:
          "Upload invoices, contracts, or forms. AI reads, extracts data, categorizes, and routes it to your systems. Seconds, not hours.",
        icon: <IconDocumentProcessing />,
      },
      {
        title: "Automated Scheduling & Reminders",
        description:
          "Confirmations, reminders, follow-ups, and reschedules via SMS and email. No-shows drop. Staff gets their time back.",
        icon: <IconSchedulingReminders />,
      },
      {
        title: "AI Customer Reactivation",
        description:
          "Dormant customer lists turned into revenue. AI crafts personalized outreach that reactivates 60%+ of inactive clients.",
        icon: <IconCustomerReactivation />,
      },
      {
        title: "Smart Lead Routing & Auto-Response",
        description:
          "New inquiry captured, auto-responded in under 60 seconds, categorized, and routed to the right person. Nothing falls through.",
        icon: <IconLeadRouting />,
      },
      {
        title: "Form Routing & Intake Automation",
        description:
          "Incoming form submissions categorized by type, auto-triaged, and routed with AI responses for common questions.",
        icon: <IconFormRouting />,
      },
      {
        title: "Inventory Management Systems",
        description:
          "Live tracking, automated reorder alerts, inter-site transfers, and cost formulas. From spreadsheets to a real system.",
        icon: <IconInventoryManagement />,
      },
      {
        title: "Employee Onboarding Automation",
        description:
          "Document collection, form signing, tax paperwork, equipment tracking — all automated before day one.",
        icon: <IconEmployeeOnboarding />,
      },
      {
        title: "Custom AI Assistants",
        description:
          "A digital team member that knows your business. Handles inquiries, pulls data, and manages routine tasks 24/7.",
        icon: <IconCustomAIAssistant />,
      },
      {
        title: "After-Hours Call & Text Triage",
        description:
          "Every after-hours inquiry received, assessed by AI, auto-responded via SMS, logged, and routed by urgency.",
        icon: <IconAfterHoursCall />,
      },
      {
        title: "Process Standardization & Compliance",
        description:
          "Your team does the same task five different ways. We build AI-enforced workflows that ensure consistency and compliance every time.",
        icon: <IconProcessCompliance />,
      },
    ],
    differentiators: [
      {
        lead: "Custom-built, not off-the-shelf.",
        body: "No generic Zapier chains. Every automation engineered for your specific workflow.",
      },
      {
        lead: "AI-first means smarter.",
        body: "Our automations read documents, understand context, and make intelligent decisions — not just follow rules.",
      },
      {
        lead: "Proven numbers.",
        body: "75% reduction in invoice handling. 60%+ customer reactivation. 95% reduction in inventory tracking time.",
      },
    ],
  },
  {
    type: "systems",
    title: "System Fixes & Efficiency",
    description:
      "Something's slow, broken, or redundant? We find it and fix it with better tech.",
    href: "/contact",
    visual: <SystemFixesVisual />,
    bullets: [
      "Workflow efficiency",
      "Platform integration",
      "System fixes and upgrades",
      "Modernization",
    ],
    stats: [
      { number: "22%", label: "average cost reduction within 3 years of streamlining tech" },
      { number: "90%", label: "of manual data entry errors eliminated through automation" },
      { number: "$500-$1,500/mo", label: "average savings from eliminating redundant software subscriptions" },
    ],
    painPoints: [
      "We use six different tools and none of them talk to each other.",
      "Half our processes are held together with workarounds nobody documented.",
      "We bought software that was supposed to fix everything. Now it's another problem.",
      "If one person is out sick, nobody knows how to run their system.",
      "We've outgrown our current setup but migrating feels impossible.",
      "Every month something breaks and we spend a week patching it instead of growing.",
    ],
    serviceTiles: [
      {
        title: "Workflow Efficiency Overhaul",
        description:
          "We walk through how your team actually works. Find the bottlenecks and eliminate them with a working solution.",
        icon: <IconWorkflowEfficiency />,
      },
      {
        title: "Platform Integration",
        description:
          "CRM doesn't talk to accounting. Scheduling disconnected from customer database. We wire your tools together so data flows once.",
        icon: <IconPlatformIntegration />,
      },
      {
        title: "Tool Stack Audit & Consolidation",
        description:
          "Paying for 8+ overlapping subscriptions? We audit, consolidate, and migrate. Typical savings: $500-$1,500/month.",
        icon: <IconToolStackAudit />,
      },
      {
        title: "System Diagnostics & Fixes",
        description:
          "Something's slow, clunky, or breaking at the worst time. We diagnose root cause and fix it properly.",
        icon: <IconSystemDiagnostics />,
      },
      {
        title: "Spreadsheet to Real System Migration",
        description:
          "Still tracking in Excel? We move you to modern tools without losing data and set it up right from day one.",
        icon: <IconSpreadsheetMigration />,
      },
      {
        title: "AI-Powered Compliance & Documentation",
        description:
          "Processes that live in people's heads get documented, systematized, and enforced by AI — so knowledge never walks out the door.",
        icon: <IconAICompliance />,
      },
      {
        title: "Data Pipeline & API Integration",
        description:
          "Custom connections between any systems via APIs, middleware, or automation layers. Your data flows where it needs to go.",
        icon: <IconDataPipeline />,
      },
    ],
    differentiators: [
      {
        lead: "Fixers, not consultants.",
        body: "No reports about your problems. We find what's broken and build the fix.",
      },
      {
        lead: "We know small business tech.",
        body: "QuickBooks. ServiceTitan. Square. Jobber. HubSpot. We've integrated them all.",
      },
      {
        lead: "Fixes that pay for themselves.",
        body: "Every improvement measured in time saved, errors eliminated, money recovered.",
      },
    ],
  },
  {
    type: "revenue",
    title: "Revenue Growth Engines",
    description:
      "Automated content, email, SMS, and lead generation systems that keep marketing moving without constant babysitting.",
    href: "/contact",
    visual: <RevenueVisual />,
    bullets: [
      "Automated social media content",
      "Email and SMS outreach engines",
      "SEO and search optimization",
      "Lead generation and conversion systems",
    ],
    stats: [
      { number: "3-5x", label: "increase in qualified inbound leads within 90 days" },
      { number: "60%+", label: "of untouched past customers re-engaged through AI outreach" },
      { number: "47+", label: "average Google reviews needed to rank in the local top 3" },
    ],
    painPoints: [
      "We do good work but rely almost entirely on word-of-mouth to get new customers.",
      "We've spent money on marketing before. I couldn't tell you what it actually did.",
      "Leads come in, but nobody follows up fast enough and they go cold.",
      "We have years of past customers we've never reached back out to.",
      "Our competitors are everywhere online. We're invisible.",
      "I know we're leaving money on the table. I just don't know where.",
    ],
    serviceTiles: [
      {
        title: "AI-Powered Customer Segmentation",
        description:
          "AI analyzes your customer data and segments by behavior, value, and likelihood to convert. Target the right people with the right message.",
        icon: <IconCustomerSegmentation />,
      },
      {
        title: "Individualized AI Marketing",
        description:
          "Hyper-personalized outreach crafted by AI for each customer based on their history, preferences, and engagement patterns.",
        icon: <IconIndividualizedMarketing />,
      },
      {
        title: "AI-Powered Advertising Management",
        description:
          "Google Ads, Facebook Ads, managed and optimized by AI. Budget allocation, bid strategy, and creative testing on autopilot.",
        icon: <IconAdvertisingManagement />,
      },
      {
        title: "Speed-to-Lead Auto Response",
        description:
          "New inquiry, personalized response in under 60 seconds, captured in CRM, right person notified. First response wins the customer.",
        icon: <IconSpeedToLead />,
      },
      {
        title: "Digital Presence Overhaul",
        description:
          "Full audit and rebuild of your online footprint — website, Google Business Profile, social accounts, review systems, local SEO.",
        icon: <IconDigitalPresence />,
      },
      {
        title: "SEO & AI Search Optimization",
        description:
          "Found on Google AND in AI search results. Content architecture for traditional SEO and AI citations.",
        icon: <IconSEOAIOptimization />,
      },
      {
        title: "Automated Review Generation",
        description:
          "Post-service SMS review requests that make it effortless. Target: 50+ reviews in 90 days.",
        icon: <IconAutomatedReviews />,
      },
      {
        title: "Lead Capture & Nurture Funnels",
        description:
          "Landing pages, lead magnets, email capture, automated nurture sequences, CRM integration. Every lead followed up for 90 days.",
        icon: <IconLeadNurtureFunnel />,
      },
      {
        title: "Marketing Performance Dashboard",
        description:
          "See exactly which channels drive leads and revenue. Connected to ads, social, email, and CRM.",
        icon: <IconMarketingDashboard />,
      },
    ],
    differentiators: [
      {
        lead: "Systems, not services.",
        body: "We build a marketing engine you own that runs automatically.",
      },
      {
        lead: "Proven, not projected.",
        body: "5x reach. 60%+ reactivation. 45% conversion increase. Real numbers from real clients.",
      },
      {
        lead: "Full funnel.",
        body: "Not just ads or social — the entire pipeline from discovery to conversion to re-engagement.",
      },
    ],
  },
  {
    type: "dashboards",
    title: "Dashboards & Business Intelligence",
    description:
      "See your business clearly. Real-time data, live reporting, actionable insight.",
    href: "/contact",
    visual: <DashboardVisual />,
    bullets: [
      "Custom dashboards",
      "Financial and operational reporting",
      "Data integration and cleanup",
      "Forecasting and trend analysis",
    ],
    stats: [
      { number: "73%", label: "of business data goes completely unused for decisions" },
      { number: "23x", label: "more likely to acquire customers with data-driven decisions" },
      { number: "65%", label: "of small businesses are profitable but can't tell you where" },
    ],
    painPoints: [
      "I make most decisions based on gut feeling because I don't have the numbers in front of me.",
      "By the time I get a report, the information is already two weeks old.",
      "Our data lives in five different places and nobody has a complete picture.",
      "I couldn't tell you our most profitable service line without digging through spreadsheets.",
      "My team spends hours building reports that I glance at for thirty seconds.",
      "We have data scattered across six platforms and none of it lines up when we need it.",
    ],
    serviceTiles: [
      {
        title: "Executive Dashboard",
        description:
          "One screen, three-second status of your entire business. Revenue, expenses, KPIs, cash flow — updated in real time.",
        icon: <IconExecutiveDashboard />,
      },
      {
        title: "AI-Powered Business Insights",
        description:
          "Ask your dashboard questions in plain English. 'Why is revenue down this month?' 'Which service is most profitable?' AI answers from your real data.",
        icon: <IconAIBusinessInsights />,
      },
      {
        title: "Financial Health Dashboard",
        description:
          "Live connection to QuickBooks, your bank, and invoicing. AR aging, cash position, revenue vs. forecast — always current.",
        icon: <IconFinancialHealth />,
      },
      {
        title: "Employee & Technician Productivity",
        description:
          "Revenue per tech, avg ticket, utilization, callbacks — pulled from your service platform automatically.",
        icon: <IconEmployeeProductivity />,
      },
      {
        title: "Marketing ROI Tracker",
        description:
          "One view connecting Google Ads, website analytics, social, and Google Business Profile. Know exactly what's working.",
        icon: <IconMarketingROI />,
      },
      {
        title: "Automated KPI & Trend Reporting",
        description:
          "Reports delivered to your inbox on whatever cadence you need. Zero effort from you.",
        icon: <IconKPIReporting />,
      },
      {
        title: "AI System Integration Dashboard",
        description:
          "All your tools, all your data, one unified view. AI monitors for anomalies and alerts you before problems escalate.",
        icon: <IconSystemIntegrationDashboard />,
      },
    ],
    differentiators: [
      {
        lead: "Dashboards you want to look at.",
        body: "Clean, visual, built for business owners — not analysts.",
      },
      {
        lead: "Connected to your real systems.",
        body: "Live data from QuickBooks, ServiceTitan, Square, your CRM.",
      },
      {
        lead: "Decisions, not data dumps.",
        body: "Built around the questions you actually need answered.",
      },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────
   SVG ICONS
   ───────────────────────────────────────────────────────────── */

function ExpandIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9.5 1.5H14.5V6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 14.5H1.5V9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   TILE SVG ICONS — 40 unique icons, one per service tile
   viewBox="0 0 48 48", stroke-based, recognizable at 80px
   ───────────────────────────────────────────────────────────── */

/* ── CARD 1: WEBSITES & APPLICATIONS ── */

function IconProfessionalWebsite() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Browser chrome */}
      <rect x="4" y="8" width="40" height="32" rx="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Top bar */}
      <line x1="4" y1="16" x2="44" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Traffic lights */}
      <circle cx="11" cy="12" r="1.5" fill="currentColor" fillOpacity="0.5" />
      <circle cx="16" cy="12" r="1.5" fill="currentColor" fillOpacity="0.35" />
      <circle cx="21" cy="12" r="1.5" fill="currentColor" fillOpacity="0.2" />
      {/* Code bracket left */}
      <path d="M17 27l-4 3 4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" />
      {/* Code bracket right */}
      <path d="M31 27l4 3-4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" />
      {/* Slash */}
      <line x1="26" y1="25" x2="22" y2="35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
    </svg>
  );
}

function IconAISearch() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Magnifying glass circle */}
      <circle cx="20" cy="21" r="10" stroke="currentColor" strokeWidth="1.5" />
      {/* Magnifying handle */}
      <line x1="27.5" y1="28.5" x2="36" y2="37" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* AI sparkle — top right of glass */}
      <path d="M33 8l1 2.5 2.5 1-2.5 1L33 15l-1-2.5L29.5 11.5l2.5-1z" fill="currentColor" fillOpacity="0.9" />
      {/* Secondary sparkle */}
      <path d="M39 5l0.6 1.4L41 7l-1.4 0.6L39 9l-0.6-1.4L37 7l1.4-0.6z" fill="currentColor" fillOpacity="0.55" />
      {/* Inner search lines */}
      <line x1="14" y1="21" x2="26" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4" />
      <line x1="14" y1="25" x2="23" y2="25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.25" />
    </svg>
  );
}

function IconGoogleBusiness() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Location pin */}
      <path d="M24 6C18.48 6 14 10.48 14 16c0 8 10 20 10 20s10-12 10-20c0-5.52-4.48-10-10-10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
      {/* Stars */}
      <path d="M13 37l1 3 3-1-2 2.5 2 2.5-3-1-1 3-1-3-3 1 2-2.5-2-2.5 3 1z" fill="currentColor" fillOpacity="0.9" />
      <path d="M24 37l0.7 2 2-0.7-1.3 1.7 1.3 1.7-2-0.7-0.7 2-0.7-2-2 0.7 1.3-1.7-1.3-1.7 2 0.7z" fill="currentColor" fillOpacity="0.65" />
      <path d="M35 37l0.6 1.8 1.8-0.6-1.2 1.5 1.2 1.5-1.8-0.6-0.6 1.8-0.6-1.8-1.8 0.6 1.2-1.5-1.2-1.5 1.8 0.6z" fill="currentColor" fillOpacity="0.4" />
    </svg>
  );
}

function IconSEOLocalSearch() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Graph axes */}
      <line x1="8" y1="38" x2="8" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
      <line x1="8" y1="38" x2="42" y2="38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
      {/* Trending up line */}
      <polyline points="10,34 18,28 26,22 34,16 42,10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      {/* Data points */}
      <circle cx="18" cy="28" r="2" fill="currentColor" fillOpacity="0.7" />
      <circle cx="26" cy="22" r="2" fill="currentColor" fillOpacity="0.7" />
      <circle cx="34" cy="16" r="2" fill="currentColor" fillOpacity="0.7" />
      {/* Arrow tip */}
      <path d="M38 8l4 2-2 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCustomWebApp() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* App window */}
      <rect x="5" y="7" width="38" height="30" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <line x1="5" y1="15" x2="43" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
      {/* Gear body */}
      <circle cx="24" cy="26" r="5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.9" />
      <circle cx="24" cy="26" r="2" fill="currentColor" fillOpacity="0.4" />
      {/* Gear teeth */}
      <line x1="24" y1="18" x2="24" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="24" y1="32" x2="24" y2="34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="26" x2="18" y2="26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="30" y1="26" x2="32" y2="26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="18.34" y1="20.34" x2="19.76" y2="21.76" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <line x1="28.24" y1="30.24" x2="29.66" y2="31.66" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <line x1="18.34" y1="31.66" x2="19.76" y2="30.24" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <line x1="28.24" y1="21.76" x2="29.66" y2="20.34" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      {/* Windowbar dots */}
      <circle cx="10" cy="11" r="1.25" fill="currentColor" fillOpacity="0.45" />
      <circle cx="14" cy="11" r="1.25" fill="currentColor" fillOpacity="0.3" />
    </svg>
  );
}

function IconUIUXRedesign() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Layout grid — 2 columns */}
      <rect x="5" y="8" width="16" height="32" rx="2" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
      <rect x="25" y="8" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.35" />
      <rect x="25" y="26" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.35" />
      {/* Paintbrush handle */}
      <line x1="30" y1="12" x2="44" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.9" />
      {/* Paintbrush tip */}
      <path d="M28 14c-1.5 1.5-4 3.5-4 3.5s2-2.5 3.5-4l0.5 0.5z" fill="currentColor" fillOpacity="0.8" />
      {/* Sparkle accent */}
      <path d="M38 18l0.8 2 2 0.8-2 0.8-0.8 2-0.8-2-2-0.8 2-0.8z" fill="currentColor" fillOpacity="0.7" />
    </svg>
  );
}

function IconECommerce() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cart body */}
      <path d="M6 8h4l5 20h18l4-14H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Cart wheels */}
      <circle cx="18" cy="34" r="2.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.8" />
      <circle cx="30" cy="34" r="2.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.8" />
      {/* Price tag */}
      <path d="M36 12l4 4-8 8-4-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
      <circle cx="39" cy="13" r="1.25" fill="currentColor" fillOpacity="0.6" />
    </svg>
  );
}

/* ── CARD 2: AUTOMATION SYSTEMS ── */

function IconDocumentProcessing() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Document */}
      <path d="M10 6h20l8 8v28H10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 6v8h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" />
      {/* Scan lines */}
      <line x1="16" y1="20" x2="32" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.9" />
      <line x1="16" y1="26" x2="32" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
      <line x1="16" y1="32" x2="26" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.35" />
      {/* Scanner beam */}
      <line x1="8" y1="26" x2="40" y2="26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.25" />
    </svg>
  );
}

function IconSchedulingReminders() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Calendar */}
      <rect x="6" y="10" width="28" height="28" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <line x1="6" y1="18" x2="34" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
      <line x1="14" y1="6" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="26" y1="6" x2="26" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Calendar marks */}
      <circle cx="14" cy="25" r="1.5" fill="currentColor" fillOpacity="0.7" />
      <circle cx="20" cy="25" r="1.5" fill="currentColor" fillOpacity="0.5" />
      <circle cx="20" cy="31" r="1.5" fill="currentColor" fillOpacity="0.35" />
      {/* Clock */}
      <circle cx="36" cy="34" r="8" stroke="currentColor" strokeWidth="1.5" />
      <line x1="36" y1="29" x2="36" y2="34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="36" y1="34" x2="40" y2="36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconCustomerReactivation() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Person */}
      <circle cx="20" cy="14" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 38c0-6.63 5.37-12 12-12s12 5.37 12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
      {/* Refresh arrow — circular */}
      <path d="M36 22c3.31 0 6 2.69 6 6s-2.69 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.9" />
      <path d="M30 28c0-3.31 2.69-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.9" />
      {/* Arrow tips */}
      <path d="M36 20l2 4-4-1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M36 36l-2-4 4 1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconLeadRouting() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Funnel */}
      <path d="M8 10h32l-12 14v12l-8-4V24z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Routing arrows — right side */}
      <line x1="40" y1="30" x2="46" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
      <path d="M38 24l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" />
      <line x1="40" y1="36" x2="46" y2="36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
    </svg>
  );
}

function IconFormRouting() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Form */}
      <rect x="6" y="6" width="26" height="32" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <line x1="12" y1="14" x2="26" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />
      <line x1="12" y1="20" x2="26" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
      <line x1="12" y1="26" x2="20" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.35" />
      {/* Branching arrows */}
      <line x1="32" y1="22" x2="40" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M36 16l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" />
      {/* Branch top */}
      <path d="M38 22v-8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeOpacity="0.5" />
      <path d="M38 22v8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeOpacity="0.5" />
      <circle cx="43" cy="14" r="2" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.7" />
      <circle cx="43" cy="30" r="2" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.45" />
    </svg>
  );
}

function IconInventoryManagement() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Warehouse outline */}
      <path d="M6 20L24 8l18 12v22H6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" />
      {/* Boxes */}
      <rect x="10" y="28" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="20" y="28" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
      <rect x="30" y="28" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
      {/* Barcode lines */}
      <line x1="12" y1="32" x2="12" y2="34" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.9" />
      <line x1="14" y1="31" x2="14" y2="35" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.9" />
      <line x1="16" y1="32" x2="16" y2="34" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.9" />
    </svg>
  );
}

function IconEmployeeOnboarding() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Person */}
      <circle cx="16" cy="13" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 34c0-5.52 4.48-10 10-10s10 4.48 10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
      {/* Checklist */}
      <rect x="28" y="10" width="16" height="22" rx="2" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
      <polyline points="31,17 33,19 37,15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="31,23 33,25 37,21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
      <line x1="31" y1="29" x2="37" y2="29" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.35" />
    </svg>
  );
}

function IconCustomAIAssistant() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Chat bubble */}
      <path d="M6 8h36v24H26l-8 8v-8H6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* AI brain dots (neural connections) */}
      <circle cx="17" cy="20" r="3" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.8" />
      <circle cx="28" cy="20" r="3" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.8" />
      <circle cx="22.5" cy="13" r="2.5" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.55" />
      {/* Neural lines */}
      <line x1="19.5" y1="18" x2="20.5" y2="15" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5" />
      <line x1="25.5" y1="18" x2="24.5" y2="15" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5" />
      <line x1="20" y1="20" x2="25" y2="20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.4" />
    </svg>
  );
}

function IconAfterHoursCall() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Phone handset */}
      <path d="M14 6h6l3 9-4 2c2 4 5 8 9 10l2-4 9 3v6c0 2-2 4-4 4C16 36 12 16 12 10c0-2 2-4 2-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Moon */}
      <path d="M36 8a8 8 0 0 1 0 12 8 8 0 0 1 0-12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8" />
      <path d="M36 8c-1.5 1.5-2.5 3.5-2.5 6s1 4.5 2.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
      {/* Stars */}
      <circle cx="44" cy="10" r="1" fill="currentColor" fillOpacity="0.7" />
      <circle cx="42" cy="5" r="1" fill="currentColor" fillOpacity="0.5" />
    </svg>
  );
}

function IconProcessCompliance() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Shield */}
      <path d="M24 4L8 10v12c0 10 7 18 16 22 9-4 16-12 16-22V10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Checkmark */}
      <polyline points="16,23 21,28 32,18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" />
    </svg>
  );
}

/* ── CARD 3: SYSTEM FIXES & EFFICIENCY ── */

function IconWorkflowEfficiency() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Gear */}
      <circle cx="22" cy="24" r="7" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="22" cy="24" r="2.5" fill="currentColor" fillOpacity="0.4" />
      {/* Gear teeth */}
      <line x1="22" y1="14" x2="22" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="22" y1="31" x2="22" y2="34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="24" x2="15" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="29" y1="24" x2="32" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="15.22" y1="17.22" x2="17.34" y2="19.34" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <line x1="26.66" y1="28.66" x2="28.78" y2="30.78" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <line x1="15.22" y1="30.78" x2="17.34" y2="28.66" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <line x1="26.66" y1="19.34" x2="28.78" y2="17.22" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      {/* Speedometer arc */}
      <path d="M33 34a12 12 0 0 0 5-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />
      <path d="M36 16a12 12 0 0 1 4 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.45" />
      {/* Needle */}
      <line x1="38" y1="28" x2="34" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.9" />
    </svg>
  );
}

function IconPlatformIntegration() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Puzzle piece left */}
      <path d="M6 16h12v-4a4 4 0 0 1 8 0v4h4v12h-4a4 4 0 0 0 0 8h4v6H6V32h4a4 4 0 0 0 0-8H6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconToolStackAudit() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Multiple stacked tool layers */}
      <rect x="6" y="28" width="36" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.9" />
      <rect x="9" y="20" width="30" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.65" />
      <rect x="13" y="12" width="22" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
      {/* Merge arrow pointing down */}
      <path d="M24 6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
      <path d="M20 10l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
      {/* Consolidate arrow */}
      <path d="M10 36l6 6h16l6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" />
    </svg>
  );
}

function IconSystemDiagnostics() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Wrench */}
      <path d="M34 6a8 8 0 0 0-7.6 10.4L8 34a4 4 0 0 0 5.6 5.6l18.4-18.4A8 8 0 0 0 34 6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" />
      <circle cx="11.5" cy="36.5" r="1.5" fill="currentColor" fillOpacity="0.6" />
      {/* Heartbeat / pulse line */}
      <polyline points="22,22 26,14 29,26 32,19 36,22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" />
    </svg>
  );
}

function IconSpreadsheetMigration() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Spreadsheet table — left */}
      <rect x="4" y="10" width="18" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
      <line x1="4" y1="16" x2="22" y2="16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5" />
      <line x1="4" y1="22" x2="22" y2="22" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.35" />
      <line x1="13" y1="10" x2="13" y2="30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.35" />
      {/* Arrow right */}
      <path d="M24 20h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M28 17l4 3-4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* App window — right */}
      <rect x="32" y="10" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <line x1="32" y1="15" x2="46" y2="15" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5" />
      <circle cx="35" cy="12.5" r="1" fill="currentColor" fillOpacity="0.6" />
      <rect x="34" y="18" width="10" height="2" rx="1" fill="currentColor" fillOpacity="0.4" />
      <rect x="34" y="22" width="7" height="2" rx="1" fill="currentColor" fillOpacity="0.3" />
      <rect x="34" y="26" width="9" height="2" rx="1" fill="currentColor" fillOpacity="0.2" />
    </svg>
  );
}

function IconAICompliance() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Document */}
      <path d="M10 6h20l8 8v28H10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
      <path d="M30 6v8h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4" />
      {/* Lock */}
      <rect x="19" y="26" width="10" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M21 26v-3a3 3 0 0 1 6 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="24" cy="30.5" r="1.25" fill="currentColor" fillOpacity="0.8" />
      {/* AI sparkle */}
      <path d="M34 12l0.8 2 2 0.8-2 0.8-0.8 2-0.8-2-2-0.8 2-0.8z" fill="currentColor" fillOpacity="0.75" />
    </svg>
  );
}

function IconDataPipeline() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Pipe / tube horizontal */}
      <path d="M4 20h10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.9" />
      <path d="M14 16h8v16h-8z" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M22 24h10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.7" />
      <path d="M32 16h8v16h-8z" rx="1" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.8" />
      <path d="M40 24h4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.5" />
      {/* Data dots flowing */}
      <circle cx="9" cy="24" r="2" fill="currentColor" fillOpacity="0.9" />
      <circle cx="27" cy="24" r="2" fill="currentColor" fillOpacity="0.65" />
      {/* Arrow direction */}
      <path d="M38 20l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" />
    </svg>
  );
}

/* ── CARD 4: REVENUE GROWTH ENGINES ── */

function IconCustomerSegmentation() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Group 1 — top left circle */}
      <circle cx="14" cy="16" r="8" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.9" />
      <circle cx="10" cy="14" r="2" fill="currentColor" fillOpacity="0.7" />
      <circle cx="17" cy="14" r="2" fill="currentColor" fillOpacity="0.7" />
      <circle cx="13.5" cy="19" r="2" fill="currentColor" fillOpacity="0.7" />
      {/* Group 2 — top right circle */}
      <circle cx="34" cy="16" r="8" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" />
      <circle cx="30" cy="14" r="2" fill="currentColor" fillOpacity="0.5" />
      <circle cx="37" cy="14" r="2" fill="currentColor" fillOpacity="0.5" />
      {/* Group 3 — bottom */}
      <circle cx="24" cy="34" r="8" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
      <circle cx="24" cy="32" r="2" fill="currentColor" fillOpacity="0.35" />
    </svg>
  );
}

function IconIndividualizedMarketing() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Person */}
      <circle cx="16" cy="14" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 34c0-5.52 4.48-10 10-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" />
      {/* Personalized message bubble with star */}
      <path d="M22 18h20v14l-4-3H22z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Star inside bubble = personalized */}
      <path d="M32 23l1 3 3 0.5-2 2.5 0.5 3-2.5-1.5-2.5 1.5 0.5-3-2-2.5 3-0.5z" fill="currentColor" fillOpacity="0.8" />
    </svg>
  );
}

function IconAdvertisingManagement() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Megaphone */}
      <path d="M8 18h8l16-10v24L16 22H8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="8" y1="18" x2="8" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
      <path d="M12 28l2 8h4l2-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
      {/* AI chip */}
      <rect x="34" y="10" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.85" />
      <rect x="36" y="12" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
      {/* Chip pins */}
      <line x1="36" y1="8" x2="36" y2="10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeOpacity="0.6" />
      <line x1="39" y1="8" x2="39" y2="10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeOpacity="0.6" />
      <line x1="36" y1="20" x2="36" y2="22" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeOpacity="0.6" />
      <line x1="39" y1="20" x2="39" y2="22" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeOpacity="0.6" />
    </svg>
  );
}

function IconSpeedToLead() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Lightning bolt */}
      <path d="M28 4L14 26h12l-6 18 22-26H30z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Chat bubble — bottom right */}
      <path d="M30 32h12v8l-3-2H30z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.75" />
      {/* Chat dots */}
      <circle cx="34" cy="36" r="1" fill="currentColor" fillOpacity="0.8" />
      <circle cx="38" cy="36" r="1" fill="currentColor" fillOpacity="0.8" />
    </svg>
  );
}

function IconDigitalPresence() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Globe */}
      <circle cx="22" cy="24" r="16" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="22" cy="24" rx="7" ry="16" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.5" />
      <line x1="6" y1="24" x2="38" y2="24" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeOpacity="0.4" />
      <line x1="8" y1="16" x2="36" y2="16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.25" />
      <line x1="8" y1="32" x2="36" y2="32" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.25" />
      {/* Refresh arrows */}
      <path d="M38 16a10 10 0 0 1 2 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.85" />
      <path d="M40 24a10 10 0 0 1-4 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.85" />
      <path d="M38 14l2 4-4 0" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.75" />
      <path d="M36 34l-2-4 4 0" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.75" />
    </svg>
  );
}

function IconSEOAIOptimization() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Search bar */}
      <rect x="4" y="16" width="30" height="10" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="11" cy="21" r="2.5" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.6" />
      <line x1="15" y1="21" x2="28" y2="21" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeOpacity="0.4" />
      {/* Upward arrow */}
      <line x1="38" y1="38" x2="38" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />
      <path d="M34 17l4-5 4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Sparkle */}
      <path d="M36 8l0.7 1.7 1.7 0.7-1.7 0.7-0.7 1.7-0.7-1.7-1.7-0.7 1.7-0.7z" fill="currentColor" fillOpacity="0.75" />
    </svg>
  );
}

function IconAutomatedReviews() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Large star */}
      <path d="M24 6l4.5 9 10 1.5-7 7 1.5 10L24 29l-9 4.5 1.5-10-7-7 10-1.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Automated loop arrow */}
      <path d="M36 36a10 10 0 0 1-12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.85" />
      <path d="M24 42a10 10 0 0 1-8-14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.85" />
      <path d="M38 32l-2 5 4 1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.75" />
    </svg>
  );
}

function IconLeadNurtureFunnel() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Funnel shape */}
      <path d="M6 8h36l-13 16v16l-10-6V24z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Heart inside funnel — nurture */}
      <path d="M20 29c0-2 1.5-4 4-4s4 2 4 4c0 3-4 7-4 7s-4-4-4-7z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.85" />
    </svg>
  );
}

function IconMarketingDashboard() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Screen / chart */}
      <rect x="4" y="8" width="40" height="28" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <line x1="14" y1="44" x2="34" y2="44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
      <line x1="24" y1="36" x2="24" y2="44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
      {/* Bar chart */}
      <rect x="10" y="22" width="6" height="10" rx="1" fill="currentColor" fillOpacity="0.4" />
      <rect x="19" y="16" width="6" height="16" rx="1" fill="currentColor" fillOpacity="0.5" />
      <rect x="28" y="12" width="6" height="20" rx="1" fill="currentColor" fillOpacity="0.65" />
      {/* Eye symbol — visibility */}
      <ellipse cx="37" cy="13" rx="4" ry="2.5" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.8" />
      <circle cx="37" cy="13" r="1.25" fill="currentColor" fillOpacity="0.7" />
    </svg>
  );
}

/* ── CARD 5: DASHBOARDS & BUSINESS INTELLIGENCE ── */

function IconExecutiveDashboard() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Screen */}
      <rect x="3" y="7" width="42" height="30" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <line x1="14" y1="43" x2="34" y2="43" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
      <line x1="24" y1="37" x2="24" y2="43" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
      {/* KPI tiles */}
      <rect x="7" y="11" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.8" />
      <rect x="21" y="11" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.6" />
      <rect x="35" y="11" width="6" height="9" rx="2" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.4" />
      {/* Bottom row — larger tile + sparkline */}
      <rect x="7" y="23" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.7" />
      <polyline points="9,30 12,26 15,28 18,24 22,27" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" />
      <rect x="27" y="23" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.45" />
    </svg>
  );
}

function IconAIBusinessInsights() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Brain outline */}
      <path d="M24 10c-4 0-8 2-9 6-3 0-6 3-5 7-2 1-4 4-3 7 1 2 3 4 5 4h24c2 0 4-2 5-4 1-3-1-6-3-7 1-4-2-7-5-7-1-4-5-6-9-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" />
      {/* Chart/insight emerging */}
      <polyline points="16,28 20,22 24,26 28,18 32,22" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" />
      {/* Sparkle */}
      <path d="M38 8l0.8 2 2 0.8-2 0.8-0.8 2-0.8-2-2-0.8 2-0.8z" fill="currentColor" fillOpacity="0.7" />
    </svg>
  );
}

function IconFinancialHealth() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Dollar sign circle */}
      <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
      <line x1="20" y1="10" x2="20" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
      <path d="M15 14h7a4 4 0 0 1 0 8h-4a4 4 0 0 0 0 8h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Heartbeat line — right side */}
      <polyline points="30,32 33,26 36,34 38,28 42,32" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" />
    </svg>
  );
}

function IconEmployeeProductivity() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Person */}
      <circle cx="16" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 32c0-5.52 4.48-10 10-10s10 4.48 10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" />
      {/* Bar chart — right side */}
      <line x1="30" y1="38" x2="30" y2="10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeOpacity="0.4" />
      <rect x="32" y="28" width="5" height="10" rx="1" fill="currentColor" fillOpacity="0.5" />
      <rect x="38" y="20" width="5" height="18" rx="1" fill="currentColor" fillOpacity="0.7" />
    </svg>
  );
}

function IconMarketingROI() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bullseye target */}
      <circle cx="22" cy="22" r="16" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
      <circle cx="22" cy="22" r="10" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.65" />
      <circle cx="22" cy="22" r="4" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.85" />
      <circle cx="22" cy="22" r="1.5" fill="currentColor" fillOpacity="0.9" />
      {/* Dollar return arrow */}
      <path d="M32 34l6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />
      <text x="35" y="43" fontSize="8" fill="currentColor" fillOpacity="0.8" fontFamily="monospace" fontWeight="bold">$</text>
      <path d="M36 30l2 4 4-2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" />
    </svg>
  );
}

function IconKPIReporting() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Document */}
      <path d="M10 6h20l8 8v28H10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
      <path d="M30 6v8h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4" />
      {/* Trend line on document */}
      <polyline points="16,26 20,22 24,24 28,18 32,20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" />
      {/* Data line below */}
      <line x1="16" y1="32" x2="32" y2="32" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeOpacity="0.4" />
      <line x1="16" y1="36" x2="26" y2="36" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeOpacity="0.3" />
    </svg>
  );
}

function IconSystemIntegrationDashboard() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Central screen */}
      <rect x="14" y="14" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="21" r="3" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.7" />
      {/* Connected nodes */}
      <circle cx="5" cy="8" r="3" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.7" />
      <line x1="7.5" y1="10" x2="14" y2="16" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeOpacity="0.5" />
      <circle cx="43" cy="8" r="3" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.7" />
      <line x1="40.5" y1="10" x2="34" y2="16" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeOpacity="0.5" />
      <circle cx="5" cy="40" r="3" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.5" />
      <line x1="7.5" y1="38" x2="14" y2="30" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeOpacity="0.4" />
      <circle cx="43" cy="40" r="3" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.5" />
      <line x1="40.5" y1="38" x2="34" y2="30" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeOpacity="0.4" />
      {/* Bottom stand */}
      <line x1="18" y1="44" x2="30" y2="44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4" />
      <line x1="24" y1="28" x2="24" y2="44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   CAROUSEL GRADIENT PALETTE
   Each index maps to a unique gradient so the carousel is
   visually rich regardless of how many tiles a service has.
   ───────────────────────────────────────────────────────────── */

const CARD_GRADIENTS = [
  "linear-gradient(135deg, #0D95E8, #635BFF)",
  "linear-gradient(135deg, #635BFF, #a855f7)",
  "linear-gradient(135deg, #00D4AA, #0D95E8)",
  "linear-gradient(135deg, #F59E0B, #EF4444)",
  "linear-gradient(135deg, #0D95E8, #00D4AA)",
  "linear-gradient(135deg, #a855f7, #EF4444)",
  "linear-gradient(135deg, #EF4444, #F59E0B)",
  "linear-gradient(135deg, #00D4AA, #635BFF)",
];

/* ─────────────────────────────────────────────────────────────
   SERVICE CAROUSEL
   Horizontal scroll snap carousel with arrow navigation.
   ───────────────────────────────────────────────────────────── */

interface ServiceCarouselProps {
  tiles: ServiceTile[];
}

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M10 12L6 8L10 4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M6 4L10 8L6 12"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ServiceCarousel({ tiles }: ServiceCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [tappedIndex, setTappedIndex] = useState<number | null>(null);

  function scrollLeft() {
    trackRef.current?.scrollBy({ left: -296, behavior: "smooth" });
  }

  function scrollRight() {
    trackRef.current?.scrollBy({ left: 296, behavior: "smooth" });
  }

  // Toggle tapped state on mobile tap; untap when tapping elsewhere
  const handleCardClick = useCallback((i: number) => {
    setTappedIndex((prev) => (prev === i ? null : i));
  }, []);

  return (
    <div className="ps-carousel">
      <div className="ps-carousel-header">
        <h4>What We Deliver</h4>
        <div className="ps-carousel-nav">
          <button
            className="ps-carousel-btn"
            onClick={scrollLeft}
            aria-label="Scroll left"
            type="button"
          >
            <ChevronLeftIcon />
          </button>
          <button
            className="ps-carousel-btn"
            onClick={scrollRight}
            aria-label="Scroll right"
            type="button"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      <div className="ps-carousel-track" ref={trackRef}>
        {tiles.map((tile, i) => (
          <div
            key={tile.title}
            className={`ps-carousel-card${tappedIndex === i ? " tapped" : ""}`}
            onClick={() => handleCardClick(i)}
            role="button"
            tabIndex={0}
            aria-label={tile.title}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleCardClick(i);
            }}
          >
            <div
              className="ps-carousel-card-visual"
              style={{ background: CARD_GRADIENTS[i % CARD_GRADIENTS.length] }}
            />
            {tile.icon && (
              <div className="ps-carousel-card-graphic" aria-hidden="true">
                {tile.icon}
              </div>
            )}
            {/* Title always visible at bottom-left */}
            <div className="ps-carousel-card-label">
              <span className="ps-carousel-card-title-text">{tile.title}</span>
              <span className="ps-carousel-card-hint">Tap for details</span>
            </div>
            {/* Overlay with description — hover on desktop, tap on mobile */}
            <div className="ps-carousel-card-overlay">
              <p className="ps-carousel-card-overlay-title">{tile.title}</p>
              <p className="ps-carousel-card-overlay-desc">{tile.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   BENTO CARD
   Exact Stripe nesting: expand icon (top-right), title (bottom-left),
   gradient border, clip-path breathe inner, visual content.
   ───────────────────────────────────────────────────────────── */

interface BentoCardProps {
  service: ServicePillar;
  onClick: () => void;
}

function BentoCard({ service, onClick }: BentoCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null);

  // Set CSS vars for grow/shift amounts — equal on all sides so
  // the breathe animation expands uniformly from the card center.
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const grow = 6; // px — same on all sides

    function updateGrow() {
      if (!card) return;
      card.style.setProperty("--card-shift-x", `${-grow}px`);
      card.style.setProperty("--card-shift-y", `${-grow}px`);
      card.style.setProperty("--card-grow-x", `${grow}px`);
      card.style.setProperty("--card-grow-y", `${grow}px`);
    }

    updateGrow();

    const ro = new ResizeObserver(updateGrow);
    ro.observe(card);
    return () => ro.disconnect();
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.setProperty("--card-mouse-x", `${x}px`);
    card.style.setProperty("--card-mouse-y", `${y}px`);
  }

  return (
    <button
      ref={cardRef}
      className={`ps-bento-card ps-bento-card--${service.type}`}
      aria-labelledby={`bento-card-${service.type}-title`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      style={{
        "--card-mouse-x": "0px",
        "--card-mouse-y": "0px",
        "--card-grow-x": "6px",
        "--card-grow-y": "6px",
        "--card-shift-x": "-6px",
        "--card-shift-y": "-6px",
        "--card-radius": "12px",
        "--card-duration": "800ms",
        "--card-ease": "cubic-bezier(0.165, 0.84, 0.44, 1)",
      } as React.CSSProperties}
    >
      {/* Expand icon — top right, frosted glass circle */}
      <div className="ps-bento-card__expand" aria-hidden="true">
        <ExpandIcon />
      </div>

      {/* Title — bottom left, overlaid on the visual */}
      <div className="ps-bento-card__text">
        <h3
          className="ps-bento-card__title"
          id={`bento-card-${service.type}-title`}
        >
          {service.title}
        </h3>
      </div>

      {/* Gradient border that tracks mouse */}
      <div className="ps-bento-card__border" aria-hidden="true">
        <div className="ps-bento-card__border-color">
          <div className="ps-bento-card__border-color-gradient" />
        </div>
      </div>

      {/* Inner content with clip-path breathe on hover */}
      <div className="ps-bento-card__inner">
        <div className="ps-bento-card__content">
          <div className="ps-bento-card__content-inner">
            {service.visual}
          </div>
        </div>
      </div>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────
   BOTTOM-SHEET DIALOG
   Stripe-style: slides up from bottom, light overlay, staggered
   content reveal, scroll-lock with scrollbar compensation.
   ───────────────────────────────────────────────────────────── */

interface BottomSheetDialogProps {
  service: ServicePillar;
  onClose: () => void;
}

function BottomSheetDialog({ service, onClose }: BottomSheetDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const touchCurrentY = useRef(0);

  // Mount → next frame → add open class (drives CSS transitions)
  useEffect(() => {
    // Compensate for scrollbar width before locking scroll
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    // Defer open to next paint so the initial transform is rendered first
    const raf = requestAnimationFrame(() => {
      setIsOpen(true);
    });

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    document.addEventListener("keydown", handleKey);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Animate out, then call onClose after transition completes
  function handleClose() {
    setIsOpen(false);
    setTimeout(onClose, 720);
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartY.current = e.touches[0].clientY;
  }

  function handleTouchMove(e: React.TouchEvent) {
    // Only allow swipe-to-dismiss when panel is scrolled to top
    const panel = panelRef.current;
    if (!panel || panel.scrollTop > 5) return;

    touchCurrentY.current = e.touches[0].clientY;
    const diff = touchCurrentY.current - touchStartY.current;
    // Require a deliberate 120px downward drag to dismiss
    if (diff > 120) {
      handleClose();
    }
  }

  // Focus the panel on open for accessibility
  useEffect(() => {
    if (isOpen && panelRef.current) {
      panelRef.current.focus();
    }
  }, [isOpen]);

  return createPortal(
    <>
      {/* Overlay — light Stripe blue-white */}
      <div
        className={`ps-dialog-overlay${isOpen ? " ps-dialog-overlay--open" : ""}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={`ps-dialog-panel${isOpen ? " ps-dialog-panel--open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={service.title}
        tabIndex={-1}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {/* Visual area — large animated preview */}
        <div className="ps-dialog-visual" aria-hidden="true">
          {service.visual}

          {/* Close button floats over the visual */}
          <button
            className="ps-dialog-close-btn"
            onClick={handleClose}
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Content area — staggered reveal */}
        <div className="ps-dialog-content">
          {/* Child 1 — Title */}
          <h3 className="ps-dialog-title ps-dialog-reveal">{service.title}</h3>

          {/* Child 2 — Stat Bar */}
          <div className="ps-dialog-stats ps-dialog-reveal" aria-label="Key statistics">
            {service.stats.map((stat) => (
              <div key={stat.label} className="ps-dialog-stat">
                <span className="ps-dialog-stat__number">{stat.number}</span>
                <span className="ps-dialog-stat__label">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Child 3 — Service Tiles Carousel */}
          <div className="ps-dialog-section ps-dialog-reveal">
            <ServiceCarousel tiles={service.serviceTiles} />
          </div>

          {/* Child 4 — Pain Points (moved below What We Deliver) */}
          <div className="ps-dialog-section ps-dialog-reveal">
            <h4 className="ps-dialog-section-heading">Sound familiar?</h4>
            <div className="ps-dialog-pains">
              {service.painPoints.map((pain) => (
                <div key={pain} className="ps-dialog-pain">
                  &ldquo;{pain}&rdquo;
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="ps-dialog-cta ps-dialog-reveal">
            <a href="/contact" className="ps-dialog-cta-btn">
              This sound like you? Let&rsquo;s talk.
            </a>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN EXPORT
   ───────────────────────────────────────────────────────────── */

export function ServicePillars() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleExpand = useCallback((index: number) => {
    setExpandedIndex(index);
  }, []);

  const handleClose = useCallback(() => {
    setExpandedIndex(null);
  }, []);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!gridRef.current) return;

    const cards = Array.from(gridRef.current.children) as HTMLElement[];

    if (prefersReduced) {
      cards.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "";
      });
      return;
    }

    // Initial hidden state — GSAP will animate these in
    cards.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(28px)";
    });

    import("@/lib/gsap").then(({ gsap, ScrollTrigger }) => {
      if (!gridRef.current) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    });
  }, []);

  return (
    <section
      className="ps-services"
      id="services"
      aria-labelledby="services-heading"
    >
      <div className="ps-services-header">
        <div className="ps-eyebrow ps-eyebrow--light">Services</div>
        <h2
          id="services-heading"
          className="ps-section-heading ps-section-heading--light"
        >
          What We Build
        </h2>
      </div>

      <div className="ps-bento-grid" ref={gridRef}>
        {services.map((service, i) => (
          <BentoCard
            key={service.type}
            service={service}
            onClick={() => handleExpand(i)}
          />
        ))}
      </div>

      {/* Bottom-sheet dialog portal */}
      {expandedIndex !== null && (
        <BottomSheetDialog
          service={services[expandedIndex]}
          onClose={handleClose}
        />
      )}
    </section>
  );
}
