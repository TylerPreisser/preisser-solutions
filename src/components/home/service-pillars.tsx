"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  AutomationVisual,
  SystemFixesVisual,
  DashboardVisual,
} from "@/components/home/card-visuals-backup";
import { JsonLd } from "@/components/seo/JsonLd";
import { LOCAL_BIZ_ID } from "@/lib/seo/schema";
import { seoSite } from "@/lib/seo/site";

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */

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
  /** Stable key + DOM id for this pillar. */
  type: string;
  /**
   * Which existing `.ps-bento-card--<variant>` layout class this card reuses.
   * Kept separate from `type` because the variant names come from the old
   * five-pillar bento and no longer match the pillar they style.
   */
  variant: string;
  /** Optional extra utility classes for grid placement overrides. */
  cardClass?: string;
  title: string;
  description: string;
  href: string;
  visual: React.ReactNode;
  bullets: string[];
  painPoints: string[];
  serviceTiles: ServiceTile[];
  differentiators: Differentiator[];
}

/* ─────────────────────────────────────────────────────────────
   SERVICE DATA
   ───────────────────────────────────────────────────────────── */

const services: ServicePillar[] = [
  {
    type: "software",
    // Reuses the existing .ps-bento-card--websites layout variant.
    variant: "websites",
    // At >=940px the --websites variant spans the full row (it was the
    // hero card of the old five-card bento). With three pillars each card
    // is one third, so the span is reset here. See the note in the report:
    // this belongs in globals.css once Stream B owns the 3-card grid.
    title: "Business Software.",
    description:
      "The platform your team logs into. Admin dashboards, customer and member databases, client portals, and the internal tools that replace the shared spreadsheet. Real-time views of the numbers that actually run your business. Built for owners, not analysts.",
    href: "/contact",
    visual: <DashboardVisual />,
    bullets: [
      "Admin dashboards and internal tools",
      "Customer and member databases",
      "Client portals, booking, and intake",
      "Custom web and mobile applications",
    ],
    painPoints: [
      "We've outgrown spreadsheets and shared inboxes, but Salesforce isn't a serious option for a company our size.",
      "Our data lives in five different places and nobody has a complete picture.",
      "I make most decisions on gut feeling because I don't have the numbers in front of me.",
      "By the time I get a report, the information is already two weeks old.",
      "We pay for a platform, use a tenth of it, and still can't change a field without calling someone.",
      "We paid someone to build our system years ago and we haven't been able to change it since.",
    ],
    serviceTiles: [
      {
        title: "Admin Dashboard",
        description:
          "One login that runs the operation — records, scheduling, communication, and reporting in one place instead of six tools that don't talk. C3 Studio runs a church's website, iOS app, scheduling, comms, care, giving, and kids check-in from a single admin.",
        icon: <IconExecutiveDashboard />,
      },
      {
        title: "Real-Time Business Reporting",
        description:
          "Real-time views of the numbers that actually run your business. Built for owners, not analysts. If you can use your phone, you can use this.",
        icon: <IconKPIReporting />,
      },
      {
        title: "Customer & Member Databases",
        description:
          "One record per customer or member — history, status, and documents attached — that every other part of the system reads from. New signups get matched against existing records instead of quietly creating a second one.",
        icon: <IconCustomerReactivation />,
      },
      {
        title: "Client Portals, Booking & Intake",
        description:
          "A login for the people you serve: their documents, their history, their appointments. Booking and intake forms that write straight into your system instead of into somebody's inbox.",
        icon: <IconCustomWebApp />,
      },
      {
        title: "Financial & Operational Reporting",
        description:
          "AR aging, cash position, revenue against forecast, cost per job — connected to the systems those numbers already live in, so the report is current when you open it.",
        icon: <IconFinancialHealth />,
      },
      {
        title: "One Data Model, Website and App",
        description:
          "C3 Studio renders 18 typed content block types identically on a Next.js website and a native SwiftUI iOS app from a single API contract. Draft → Publish flips the website and the app live at the same time.",
        icon: <IconSystemIntegrationDashboard />,
      },
      {
        title: "Spreadsheets to a Real System",
        description:
          "The shared workbook everyone edits becomes a system with real records, permissions, and history — migrated with the data you already have, not a fresh start.",
        icon: <IconSpreadsheetMigration />,
      },
    ],
    differentiators: [
      {
        lead: "One place instead of six tools.",
        body: "Records, scheduling, communication, and reporting sit behind one login and read from one database. Nothing to reconcile between exports.",
      },
      {
        lead: "It's better because it isn't generic.",
        body: "Nothing to turn off, no unused modules, and no consultant needed to change a field. It's built around how your business actually works, not around someone else's assumptions about your industry.",
      },
      {
        lead: "You own everything.",
        body: "Your code. Your domain. Your data. No proprietary lock-in and no six-figure platform bill.",
      },
    ],
  },
  {
    type: "automation",
    // Reuses the existing .ps-bento-card--systems layout variant, which is
    // height-tuned on mobile for the before/after board this card renders.
    variant: "systems",
    // --systems carries order:5 in the <640px stack; with three pillars it
    // needs to sit second. Belongs in globals.css — see the report.
    title: "Business Automation.",
    description:
      "The work that happens without anyone doing it. Registration → confirmation → reminder. Bill → categorized ledger. Form → CRM → follow-up. Scheduled jobs, notifications, and the integrations that make the tools you already pay for talk to each other.",
    href: "/contact",
    visual: <SystemFixesVisual />,
    bullets: [
      "Scheduled jobs, reminders, and notifications",
      "Form and document intake routing",
      "Integrations between the tools you already pay for",
      "Diagnosing and fixing the process underneath",
    ],
    painPoints: [
      "We have three people doing work that shouldn't take any.",
      "We're still copying data between systems by hand.",
      "We use six different tools and none of them talk to each other.",
      "Every time someone quits, half our processes walk out the door with them.",
      "Half our processes are held together with workarounds nobody documented.",
      "Our best people are buried in busywork instead of the work we hired them for.",
    ],
    serviceTiles: [
      {
        title: "Registration → Confirmation → Reminder",
        description:
          "Someone signs up, gets matched against existing records, lands on a roster, and gets a confirmation — with nobody retyping a name or sending a message by hand. Registration → dedup → roster → confirmation is the chain that runs two annual retreat events for NWKS Encounter off one codebase.",
        icon: <IconSchedulingReminders />,
      },
      {
        title: "Scheduled Jobs That Run Themselves",
        description:
          "A dedicated always-on worker drains scheduled sends in bounded chunks. It exists because pushing 2,402 recipients in one request took 67 seconds and would blow the per-request CPU budget. The unglamorous version is the one that doesn't fall over.",
        icon: <IconAfterHoursCall />,
      },
      {
        title: "Form Routing & Intake Automation",
        description:
          "Submissions categorized by type, checked against existing records, and routed to the person who owns them. Duplicates get matched, not re-keyed.",
        icon: <IconFormRouting />,
      },
      {
        title: "Platform Integration",
        description:
          "The CRM doesn't talk to accounting. Scheduling is disconnected from the customer database. We wire the tools together so data gets entered once and shows up everywhere it's needed.",
        icon: <IconPlatformIntegration />,
      },
      {
        title: "Inventory & Operations Tracking",
        description:
          "Live tracking, reorder alerts, transfers between sites, and cost formulas. For HG Oil Holdings this cut back-office logistics time by 95% and pushed inventory accuracy past 75%.",
        icon: <IconInventoryManagement />,
      },
      {
        title: "Renewals & Deadlines That Don't Get Missed",
        description:
          "Dates tracked in the system rather than in someone's head, with the reminder chain attached. A managing general underwriter in the Alliant Insurance ecosystem went six months with zero missed renewals.",
        icon: <IconProcessCompliance />,
      },
      {
        title: "Reconciliation & Exception Queues",
        description:
          "The machine matches what it can and hands you only what it can't. A Chicago-area bus operator's reconciliation went from a full day to a 15-minute exception queue.",
        icon: <IconDataPipeline />,
      },
      {
        title: "System Diagnostics & Fixes",
        description:
          "Something is slow, clunky, or breaking at the worst possible time. We find the root cause and fix that, rather than adding another tool on top of it.",
        icon: <IconSystemDiagnostics />,
      },
      {
        title: "Tool Stack Audit & Consolidation",
        description:
          "Paying for four subscriptions that overlap? We audit what you have, consolidate where it makes sense, and migrate without stopping the business.",
        icon: <IconToolStackAudit />,
      },
      {
        title: "Employee Onboarding Automation",
        description:
          "Document collection, form signing, tax paperwork, and equipment tracking handled before day one instead of during week one.",
        icon: <IconEmployeeOnboarding />,
      },
    ],
    differentiators: [
      {
        lead: "We diagnose before we prescribe.",
        body: "Full audit of your tools, data flow, and bottlenecks — then a clear fix plan with costs and timelines before any work starts.",
      },
      {
        lead: "Every platform your business runs on.",
        body: "QuickBooks, ServiceTitan, Square, Jobber, HubSpot, Salesforce, custom databases — we've integrated, migrated, and repaired them all.",
      },
      {
        lead: "Measured in hours recovered and errors eliminated.",
        body: "HG Oil Holdings: 95% less back-office logistics time. A Chicago-area bus operator: reconciliation from a full day to a 15-minute exception queue. If it doesn't pay for itself, we don't ship it.",
      },
    ],
  },
  {
    type: "ai",
    // Reuses the existing .ps-bento-card--automation layout variant, which
    // is height-tuned for the workflow diagram this card renders.
    variant: "automation",
    title: "AI Integration.",
    description:
      "AI put exactly where it earns its place — reading documents, classifying, drafting — with a human gate on anything that matters. It isn't a product you buy from us. It's how the work gets done, and where it belongs inside your system.",
    href: "/contact",
    visual: <AutomationVisual />,
    bullets: [
      "Document extraction and classification",
      "AI-assisted drafting with approval gates",
      "Corrections that turn into durable rules",
      "AI inside the workflow, not bolted on beside it",
    ],
    painPoints: [
      "Someone here retypes the same information off a PDF every single day.",
      "We were sold an AI tool. Nobody uses it and nobody trusts it.",
      "If the software is going to be wrong, it needs to tell me which one it got wrong — not let me find out at tax time.",
      "We can't have software emailing customers on its own.",
      "We fix the same mistake for it over and over and it never learns.",
      "A build like this used to be a three-month quote we couldn't justify.",
    ],
    serviceTiles: [
      {
        title: "Document Extraction & Classification",
        description:
          "A photographed bill becomes a categorized ledger line. In FarmBooks, vision and OCR read the same page independently and each has to prove the section total, so a dropped line surfaces instead of vanishing silently. That is how a $92.57 line OCR alone had dropped got recovered.",
        icon: <IconDocumentProcessing />,
      },
      {
        title: "A Human Gate on Anything That Matters",
        description:
          "Handwritten bills are always routed to a person and never auto-posted. Anything the system isn't confident about goes to a review queue instead of quietly into the books.",
        icon: <IconHumanApproval />,
      },
      {
        title: "AI-Assisted Drafting, You Approve",
        description:
          "AI proposes the email, the summary, the categorization. A person approves it before it goes anywhere. Nothing autosends.",
        icon: <IconCustomAIAssistant />,
      },
      {
        title: "It Learns From Your Corrections",
        description:
          "When you fix something the system got wrong, that correction is stored as a durable rule. The same input resolves itself next time instead of coming back to your queue.",
        icon: <IconCorrectionRules />,
      },
      {
        title: "AI Inside the Workflow, Not Bolted On",
        description:
          "No chatbot parked in the corner of the screen. The model sits at the step where the work actually happens — reading the document, sorting the intake, drafting the follow-up — inside the system your team already uses.",
        icon: <IconWorkflowEfficiency />,
      },
      {
        title: "Structured Output You Can Audit",
        description:
          "FarmBooks ends in a formula-driven spreadsheet — Month Summary and Ledger with live rollups, synced two ways with SharePoint, where a human edit always wins. You can check the machine's work in the tool you already use.",
        icon: <IconAICompliance />,
      },
    ],
    differentiators: [
      {
        lead: "It proposes. A person approves.",
        body: "Anything touching money, a customer, or the books passes a human gate before it counts. Handwritten bills never auto-post, and low-confidence reads go to a review queue.",
      },
      {
        lead: "Two readers, one answer.",
        body: "Vision and OCR read the same bill independently and each has to prove the section total. When they disagree, the line goes to review — it doesn't disappear. The engine that does it carries 1,069 tests against a corpus of 23 photographed real bills.",
      },
      {
        lead: "Three weeks instead of three months.",
        body: "AI is why a build that used to take a quarter now takes weeks — with guardrails, safety protocols, and code review steps around it. That speed is what makes a custom system cost less than configuring someone else's platform.",
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

/* ── AI INTEGRATION ── */

/* Human gate: a machine-read document handed to a person to approve. */
function IconHumanApproval() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Document */}
      <path d="M8 6h16l6 6v18H8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
      <path d="M24 6v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4" />
      <line x1="13" y1="17" x2="25" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
      <line x1="13" y1="22" x2="21" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.35" />
      {/* Reviewer */}
      <circle cx="31" cy="30" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M22 44c0-4.97 4.03-9 9-9s9 4.03 9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
      {/* Approval check */}
      <polyline points="36,17 39,20 45,13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" />
    </svg>
  );
}

/* A correction becoming a durable rule: edit, loop, then a fixed rule row. */
function IconCorrectionRules() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Pencil — the correction */}
      <path d="M6 30l16-16 6 6-16 16H6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="20" y1="16" x2="26" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
      {/* Loop back — it gets remembered */}
      <path d="M30 10a12 12 0 0 1 8 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8" />
      <path d="M38 30l-4-1 1 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" />
      {/* Stored rule */}
      <rect x="26" y="34" width="18" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
      <polyline points="29,38.5 31,40.5 35,36.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" />
      <line x1="38" y1="38.5" x2="41" y2="38.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeOpacity="0.45" />
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
            className={`ps-carousel-card ps-ai-fetch-hover${tappedIndex === i ? " tapped" : ""}`}
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
      className={`ps-bento-card ps-bento-card--${service.variant}${
        service.cardClass ? ` ${service.cardClass}` : ""
      }`}
      aria-label={`${service.title} — open details`}
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
        {/* "AI Integration." carries the brand blue wherever the three pillars
            are listed together — see §2 of the reposition plan. This is the
            most literal such place, so the device has to hold here. */}
        <h3
          className={
            "ps-bento-card__title" +
            (service.type === "ai" ? " ps-bento-card__title--accent" : "")
          }
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
        <div className="ps-dialog-drag-handle" aria-hidden="true" />

        {/* Visual area — large animated preview */}
        <div className="ps-dialog-visual">
          <div className="ps-dialog-visual-art" aria-hidden="true">
            {service.visual}
          </div>

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

          {/* Child 2 — Service Tiles Carousel */}
          <div className="ps-dialog-section ps-dialog-reveal">
            <ServiceCarousel tiles={service.serviceTiles} />
          </div>

          {/* CTA */}
          <div className="ps-dialog-cta ps-dialog-reveal">
            <a href="/contact" className="ps-dialog-cta-btn">
              Reach out
            </a>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}

/* ─────────────────────────────────────────────────────────────
   SCHEMA — OfferCatalog
   Emit each pillar as an OfferCatalog with its serviceTiles as
   nested Offer→Service items. Lets Google + AI Overviews build
   a clean service-catalog entity graph from the same pillar data
   that drives the interactive UI (single source of truth).
   ───────────────────────────────────────────────────────────── */

function pillarOfferCatalogSchema() {
  const URL = seoSite.url;
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": `${URL}/#service-catalog`,
    name: "Preisser Solutions Service Catalog",
    url: URL,
    provider: { "@id": LOCAL_BIZ_ID },
    numberOfItems: services.reduce((n, p) => n + p.serviceTiles.length, 0),
    itemListElement: services.map((pillar) => ({
      "@type": "OfferCatalog",
      name: pillar.title,
      description: pillar.description,
      itemListElement: pillar.serviceTiles.map((tile) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: tile.title,
          description: tile.description,
          serviceType: pillar.title,
          provider: { "@id": LOCAL_BIZ_ID },
        },
      })),
    })),
  };
}

/* ─────────────────────────────────────────────────────────────
   CRAWLER-VISIBLE PILLAR DETAIL
   Visually-hidden but semantically present block that emits every
   serviceTile, painPoint, and differentiator from the same pillar
   data that drives the dialog. Lets HTML-only AI crawlers
   (ChatGPT-User, Claude-User, OAI-SearchBot, PerplexityBot,
   Google-Extended, CCBot) extract details that interactive users
   see only after opening the bento popup. aria-hidden=true keeps
   screen readers from announcing this as a duplicate of the live
   dialog content.
   ───────────────────────────────────────────────────────────── */

function PillarCrawlerContent() {
  return (
    <section
      className="ps-visually-hidden ps-pillar-crawler-content"
      aria-hidden="true"
    >
      <h2>Preisser Solutions Service Details</h2>
      {services.map((pillar) => (
        <div key={`crawler-${pillar.type}`}>
          <h3>{pillar.title}</h3>
          <p>{pillar.description}</p>

          {pillar.bullets.length > 0 && (
            <>
              <h4>Capabilities</h4>
              <ul>
                {pillar.bullets.map((bullet, i) => (
                  <li key={`b-${i}`}>{bullet}</li>
                ))}
              </ul>
            </>
          )}

          <h4>What we build</h4>
          <ul>
            {pillar.serviceTiles.map((tile, i) => (
              <li key={`t-${i}`}>
                <strong>{tile.title}</strong>
                {" — "}
                {tile.description}
              </li>
            ))}
          </ul>

          <h4>The pain we hear</h4>
          <ul>
            {pillar.painPoints.map((pain, i) => (
              <li key={`p-${i}`}>{pain}</li>
            ))}
          </ul>

          <h4>How we&apos;re different</h4>
          <ul>
            {pillar.differentiators.map((diff, i) => (
              <li key={`d-${i}`}>
                <strong>{diff.lead}</strong>
                {" "}
                {diff.body}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN EXPORT
   ───────────────────────────────────────────────────────────── */

export function ServicePillars() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  // Three pillars, rendered in plan order:
  // Business Software → Business Automation → AI Integration.
  const displayedServices = services;

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
          One System Instead of Six Tools
        </h2>
        <p className="ps-services-intro">
          Everything a Kansas business runs on lands in one place instead of six tools that don&apos;t talk to each other — and it&apos;s built for how you actually work, which is exactly why it beats a generic platform. Nothing to turn off, no unused modules, no consultant needed to change a field, and no six-figure platform bill. Not every business needs all three of these. Some needed a whole admin system; some needed one document pipeline.
        </p>
      </div>

      <div className="ps-bento-grid" ref={gridRef}>
        {displayedServices.map((service, i) => (
          <BentoCard
            key={service.type}
            service={service}
            onClick={() => handleExpand(i)}
          />
        ))}
      </div>

      {/* Crawler-visible expansion of every pillar's popup content.
          Visually hidden (WCAG ps-visually-hidden); aria-hidden so
          screen readers don't duplicate the dialog. AI crawlers parse
          HTML directly and extract this text. */}
      <PillarCrawlerContent />

      {/* OfferCatalog schema — emits each serviceTile as a
          schema.org Offer→Service for Google + AI Overviews. */}
      <JsonLd data={pillarOfferCatalogSchema()} />

      {/* Bottom-sheet dialog portal */}
      {expandedIndex !== null && (
        <BottomSheetDialog
          service={displayedServices[expandedIndex]}
          onClose={handleClose}
        />
      )}
    </section>
  );
}
