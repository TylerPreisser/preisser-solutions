"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  AutomationVisual,
  SystemFixesVisual,
  DashboardVisual,
  // Readopted 2026-09-03 under ADR-0006. WebsiteVisual sat exported and
  // unimported in that file since commit 7a8393b collapsed the grid 5 -> 3;
  // its header said it was kept so it could be "imported into a rebuilt card
  // grid structure without losing the animations". This is that rebuild.
  WebsiteVisual,
  // RevenueVisual and CustomBuildVisual are deliberately NOT imported -- see
  // the note in card-visuals-backup.tsx, which is an explicit shelf for
  // visuals with no current card, not dead code. CustomBuildVisual joined it
  // on 2026-09-04 when ADR-0007 merged the Custom Websites card it drew into
  // the Websites card, which keeps WebsiteVisual. Neither file is pruned.
  SearchVisual,
} from "@/components/home/card-visuals-backup";
import {
  CardVisualBusinessChat,
  IconAfterHoursAiAgent,
  IconAgencyGradeBuild,
  IconAiFindableSeo,
  IconAiReadablePage,
  IconAiSafetyEngineering,
  IconBuiltForYouOnly,
  IconConversionPath,
  IconDecisionsEncoded,
  IconDocExtraction,
  IconFreedCapacity,
  IconGranularTracking,
  IconInboxRouted,
  IconMarCommandEngine,
  IconOngoingCadence,
  IconPlatformMigration,
  IconPrivateAiInstance,
  IconQuoteFromHistory,
  IconReviewFunnel,
  IconSharedSuccess,
  IconSnappyAndSecure,
  IconSpreadsheetMigration,
  IconSystemsConnected,
  IconThreeSecondRead,
  IconTrueAcquisitionCost,
} from "@/components/home/card-icons-v3";
import { JsonLd } from "@/components/seo/JsonLd";
import { LOCAL_BIZ_ID } from "@/lib/seo/schema";
import { seoSite } from "@/lib/seo/site";

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */

interface ServiceTile {
  /**
   * Short category label shown top-left on the tile face.
   *
   * The title is the OUTCOME the owner buys; this is the THING it is. Both
   * earn their place: the outcome persuades, the category is what a visitor
   * scans for and what they would have typed into a search box. Plain noun
   * phrase, 2-4 words. Two tiles in one pillar must never carry the same
   * label -- if they do, they are the same product and one should be cut.
   */
  product?: string;
  title: string;
  description: string;
  /**
   * Optional `/services/*` destination for this tile.
   *
   * Only the row-2 (websites/marketing) cards use it. It is rendered TWICE and
   * deliberately so:
   *   1. as a visible link list in the bottom sheet (BottomSheetDialog), which
   *      is where a reader who opened the card is actually looking, and
   *   2. as a real <a> in PillarCrawlerContent, which is server-rendered into
   *      out/index.html. The sheet is a portal that only exists after a click,
   *      so without (2) deleting websites-and-marketing.tsx would have removed
   *      /services/website-redesign, /conversion-optimization and /paid-ads
   *      from the homepage's static HTML entirely.
   *
   * Every value here must resolve to a real src/app/<path>/page.tsx and must
   * not appear in public/_redirects -- ADR-0003 §4 still stands.
   */
  href?: string;
  icon?: React.ReactNode;
  /** Opt-in wider graphic slot. Only the AI chat visual uses it. */
  wideGraphic?: boolean;
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
  /**
   * Display-only title for the CARD FACE. Falls back to `title`.
   *
   * DECOUPLED ON PURPOSE, 2026-09-04. `title` does three jobs at once: the
   * card face, JSON-LD `serviceType` on all 42 nested Offers, and the
   * OfferCatalog `name` on all 5 catalogs. schema.org defines `serviceType`
   * as the TYPE of service -- a category -- so putting an outcome sentence
   * there would change what the field MEANS, not merely its value.
   *
   * So: `cardTitle` is what a visitor reads, `title` is what a machine reads.
   * Structured data is byte-identical to before this field existed. Do NOT
   * "simplify" this by feeding cardTitle into the schema, and do not use it
   * in the bottom sheet or the crawler mirror -- both keep the category name
   * deliberately.
   *
   * CURRENTLY UNSET ON ALL FIVE PILLARS, and that is a finding, not an
   * oversight. Stage 3 tried outcome titles here ("One place instead of six
   * tools." etc). The decoupling worked perfectly -- serviceType and
   * OfferCatalog name stayed byte-identical -- but the titles wrap to 2-3
   * lines on mobile, which grows .ps-bento-card__text by 20-40px, which
   * pushes it back UP into the artwork. Read at 390: four of the five cards
   * had the title running through their own mockup. Reverted pending a
   * decision. The mechanism is proven and re-applying is five lines.
   */
  cardTitle?: string;
  description: string;
  href: string;
  visual: React.ReactNode;
  bullets: string[];
  painPoints: string[];
  /**
   * Which painPoints entry shows on the CARD FACE as the visible hook.
   *
   * STALE AS WRITTEN, corrected 2026-09-07. This block used to claim the card
   * face renders one painPoint visibly. It does not, and may never have:
   * measured against a fresh build in chromium, webkit and firefox, every
   * card face is the pillar title plus "Click for more" and nothing else.
   * `ps-bento-card__hook` and `hookIndex` each appear ZERO times in the
   * served HTML, and pillar 1's painPoints[1] appears exactly once in the
   * whole document -- inside the aria-hidden mirror. So this field is
   * currently inert: it is required, it is set on all five pillars, and it
   * changes nothing a visitor sees. Left in place rather than removed
   * because removing it is a wider change than this copy pass; do not cite
   * it as load-bearing until something actually renders it.
   *
   * An INDEX, not a string, on purpose: the visible hook can never drift from
   * the crawler copy, and swapping which sentence ships is a one-character
   * change. Required, not optional, so a new pillar has to choose.
   *
   * The mirror is NOT touched -- it still emits all six. Reader/crawler
   * duplication is settled policy (ADR-0005 decision 3), and `description`
   * plus every `serviceTile` already render twice today.
   */
  hookIndex: number;
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
    // Card-face hook: painPoints[1] -- the platform symptom every other bullet is a consequence of; the Salesforce line is longer and only speaks to buyers who already shortlisted it.
    hookIndex: 1,
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
        product: "Custom Admin Panel",
        title: "Your Whole Business on One Screen",
        description:
          "Every number that decides your week (jobs, invoices, payments, who owes you) pulled from the systems you already run and kept current on its own. One screen, built around how you make decisions, and it opens on your phone.",
        href: "/web-applications",
        icon: <IconOneScreenKpis />,
      },
      {
        product: "Executive Dashboard",
        title: "Know Exactly What's Going On in 3 Seconds",
        description:
          "This is the standard we build every dashboard to. An owner's time is the most expensive time in the building, so your key numbers sit on one screen, current and readable at a glance: what's coming in, what's owed, what's booked, and which jobs and service lines actually made you money.",
        icon: <IconThreeSecondRead />,
      },
      {
        product: "Rules & Approvals Engine",
        title: "Quit Repeating Yourself",
        description:
          "We build your decisions into your business's software. The approvals, the pricing rules, who goes on which job: written in as steps the system carries out on its own, so the answer is already there and the work keeps moving without you being asked again.",
        icon: <IconDecisionsEncoded />,
      },
      {
        product: "Spreadsheet Replacement",
        title: "Get Out of Spreadsheet Chaos",
        description:
          "We map your entire current workflow first, every sheet, every formula and every rule someone worked out along the way, then build it into real software and bring the data across with it. A clean move over, with nothing left behind and nothing rebuilt from memory.",
        icon: <IconSpreadsheetMigration />,
      },
      {
        product: "Customer Record System",
        title: "Every Customer's Entire History in One Record",
        description:
          "Every quote, job, invoice, note, photo and conversation you have ever had with a customer, imported from wherever it lives today into one record. Whoever picks up the phone has the whole relationship in front of them.",
        icon: <IconCustomerHistoryOnCall />,
      },
      {
        product: "Built-to-Fit Platform",
        title: "Completely Custom to Your Business",
        description:
          "Every dashboard, panel and workflow we build is mapped to how your business actually runs and how your industry actually works. No template that a thousand other companies are already sitting on, and no software you can tell was designed for somebody else and sold to you anyway.",
        icon: <IconBuiltForYouOnly />,
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
    // Card-face hook: painPoints[1] -- the most concrete, most universally recognised automation symptom in the set.
    hookIndex: 1,
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
        product: "Invoicing & Collections",
        title: "Invoices That Send and Chase Themselves",
        description:
          "The invoice goes out the moment the work is done, the reminders escalate on their own, and every message carries a payment link. The system becomes your collections department, so getting paid stops depending on anyone remembering to ask.",
        icon: <IconInvoiceAutoSend />,
      },
      {
        product: "System Integration",
        title: "Eliminate Manual Data Entry",
        description:
          "We build the flows that carry information everywhere it needs to go the moment it is entered once. The won deal becomes the scheduled job, the supplier invoice lands against the order, and the same details stop being typed into four systems that were never introduced to each other.",
        href: "/business-automation",
        icon: <IconEnteredOnce />,
      },
      {
        product: "Task Automation",
        title: "Free Up Your People for Work That Actually Matters",
        description:
          "The repeating work, the copying, the chasing, the filing and the checking, is exactly what automation is good at. We take it off your team so the people you hired for judgment spend their day using it.",
        icon: <IconFreedCapacity />,
      },
      {
        product: "After-Hours Triage",
        title: "After-Hours Customers Don't Fall Through the Cracks",
        description:
          "We build the triage that answers, sorts and routes everything arriving outside business hours. Urgent reaches a person, everything else is acknowledged and queued with its context, so the job that came in at 9pm is still yours in the morning.",
        icon: <IconAfterHoursTriage />,
      },
      {
        product: "Process Audit & Integration",
        title: "Get All Your Systems Talking to One Another",
        description:
          "We start with an audit of how work actually moves through your business, every tool, every handoff and every connection holding two systems together, then wire up what should be connected and retire what should not exist. One flow instead of ten that do not speak.",
        icon: <IconSystemsConnected />,
      },
      {
        product: "Document Generation",
        title: "Paperwork That Fills Itself Out",
        description:
          "Proposals, contracts and work orders generated from the real job record with the right pricing and terms already in them, sent out and filed against the job automatically.",
        icon: <IconDocumentFromRecord />,
      },
    ],
    differentiators: [
      {
        lead: "We diagnose before we prescribe.",
        body: "Full audit of your tools, data flow, and bottlenecks, then a clear fix plan with costs and timelines before any work starts.",
      },
      {
        lead: "Every platform your business runs on.",
        body: "QuickBooks, ServiceTitan, Square, Jobber, HubSpot, Salesforce, custom databases. We've integrated, migrated, and repaired them all.",
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
      "AI put exactly where it earns its place (reading documents, classifying, drafting), with a human gate on anything that matters. It isn't a product you buy from us. It's how the work gets done, and where it belongs inside your system.",
    href: "/contact",
    visual: <AutomationVisual />,
    bullets: [
      "Document extraction and classification",
      "AI-assisted drafting with approval gates",
      "Corrections that turn into durable rules",
      "AI inside the workflow, not bolted on beside it",
    ],
    // Card-face hook: painPoints[0] -- a picture of the actual daily waste; the alternatives describe a failed purchase rather than the need.
    hookIndex: 0,
    painPoints: [
      "Someone here retypes the same information off a PDF every single day.",
      "We were sold an AI tool. Nobody uses it and nobody trusts it.",
      "If the software is going to be wrong, it needs to tell me which one it got wrong, not let me find out at tax time.",
      "We can't have software emailing customers on its own.",
      "We fix the same mistake for it over and over and it never learns.",
      "A build like this used to be a three-month quote we couldn't justify.",
    ],
    serviceTiles: [
      {
        product: "Custom AI Business Agent",
        title: "Get Answers About Your Business in Seconds",
        description:
          "We build a custom agent that knows your business, your operations, your numbers and your customer database, and give your team a chat window to ask it real executive questions. It tracks the answer down across your own data and comes back in seconds.",
        href: "/services/ai-automation",
        icon: <CardVisualBusinessChat />,
        wideGraphic: true,
      },
      {
        product: "Private AI Instance",
        title: "Secure AI for Your Business",
        description:
          "Most businesses do not realise the free tools their team is using are training on everything pasted into them. We build you a private, secure instance instead: your data stays yours, it never becomes training material, and your people get AI that is genuinely safe to use.",
        icon: <IconPrivateAiInstance />,
      },
      {
        product: "AI Guardrails & Governance",
        title: "We Know How to Harness AI Safely",
        description:
          "We spent years building enterprise-grade AI infrastructure in environments where a mistake was not survivable. That is where you learn which guardrails actually hold, what a model should never be allowed to do alone, and exactly where a person belongs in the loop.",
        icon: <IconAiSafetyEngineering />,
      },
      {
        product: "AI Document Extraction",
        title: "Eliminate Entering Data Off Documents",
        description:
          "AI document extraction pulls the figures straight off the invoice, the form or the contract, and a second pass proves every number appears literally on the page before it goes anywhere. The typing stops and nothing gets quietly guessed.",
        icon: <IconDocExtraction />,
      },
      {
        product: "AI Booking Agent",
        title: "An After-Hours AI Agent That Books the Next Day",
        description:
          "An agent that genuinely helps the person who arrives at 10pm: it answers what they actually asked, then moves them toward an appointment in business hours. Useful to your customer, and it hands you a booked job instead of a missed call.",
        icon: <IconAfterHoursAiAgent />,
      },
      {
        product: "AI-Assisted Quoting",
        title: "Quote Faster Using What Your Past Jobs Already Know",
        description:
          "Every job you have completed is data about what the work really costs you. We put AI on top of that history so a new quote starts from your own numbers: real materials, real hours, real margins, instead of a guess.",
        icon: <IconQuoteFromHistory />,
      },
      {
        product: "AI Inbox Triage",
        title: "Nothing Gets Missed in the Inbox",
        description:
          "AI reads what comes in, email, forms and attachments, works out what it is and who it belongs to, files it against the right customer and job, and raises what needs a person, so nothing waits on someone noticing it.",
        icon: <IconInboxRouted />,
      },
    ],
    differentiators: [
      {
        lead: "It proposes. A person approves.",
        body: "Anything touching money, a customer, or the books passes a human gate before it counts. Handwritten bills never auto-post, and low-confidence reads go to a review queue.",
      },
      {
        lead: "A missed line shows up instead of disappearing.",
        body: "Every line on a bill has to add up to the printed total within two cents before anything posts. When it doesn't, the bill lands in a review queue where somebody sees it. On a farm bill, that is the difference between books you can file and books you have to go re-check by hand.",
      },
      {
        lead: "Three weeks instead of three months.",
        body: "AI is why a build that used to take a quarter now takes weeks, with guardrails, safety protocols, and code review steps around it. That speed is what makes a custom system cost less than configuring someone else's platform.",
      },
    ],
  },

  /* ───────────────────────────────────────────────────────────
     ROW 2 — added 2026-09-03 under ADR-0006, which lifted
     ADR-0003 decision 3's bar on a fourth pillar and deleted the
     standalone `websites-and-marketing.tsx` band in favour of
     these cards.

     Copy discipline: the tile descriptions marked "(band copy)"
     are lifted verbatim from the deleted band, which was itself
     compressed from the live /services/* pages and reviewed under
     ADR-0003 §3. Everything else is written from each page's own
     `subheadline` / `answerParagraph` in src/data/aeo/**. No
     metric, client name, outcome or price appears on these three
     cards — docs/WRITER-AGENT-PROMPT.md:31 gates quantified
     claims to a specific canonical project and none of these
     destinations has one. The pre-7a8393b card copy is NOT reused
     (ADR-0006 decision 3).

     Variant names here are accurate, unlike `websites`/`systems`/
     `automation` above, which predate the reposition. Keep them
     accurate.
     ─────────────────────────────────────────────────────────── */
  {
    // Merged 2026-09-04 (ADR-0007): the Website Redesign and Custom Websites
    // cards became one. `web` because `websites` is already taken as a layout
    // variant by Business Software (see the note at the top of this array) --
    // the name is accurate, per globals.css's instruction for the row-2 cards.
    type: "web",
    variant: "web",
    title: "Websites.",
    description:
      "Built from scratch in Next.js, React, and TypeScript. New builds, and rebuilds of the site you already have. No templates, no page builders, and no monthly platform that owns your pages. We take over Wix, Squarespace, WordPress, GoDaddy, and Webflow, and carry the search equity across with the redirects mapped and the content migrated before anything goes live.",
    href: "/contact",
    visual: <WebsiteVisual />,
    bullets: [
      "Custom-coded: no templates, no page builders",
      "301 redirects mapped before launch, not after",
      "Structured data built in, not bolted on",
      "Off the template platform and onto code you own",
    ],
    // Card-face hook: painPoints[3] -- commercial rather than cosmetic -- it ties the site to revenue, which is what this card argues.
    hookIndex: 3,
    painPoints: [
      "Our site looks like it was built a decade ago, because it was.",
      "Our website looks like everyone else's, because it is everyone else's template.",
      "We want off Squarespace but we're afraid of losing the rankings we have.",
      "We get traffic and almost none of it turns into a phone call.",
      "The person who built it stopped answering, and now nobody can change a word.",
      "We're paying for ads that land on a page nobody designed for converting.",
    ],
    // All ELEVEN tiles from both merged cards, verbatim and in order (five
    // from Website Redesign, then six from Custom Websites). ADR-0007
    // decision 3: every href-bearing tile MUST survive the merge --
    // /services/custom-websites, /services/conversion-optimization and
    // /services/ai-search-optimization reach the homepage ONLY through the
    // ex-custom-sites tiles, as real <a>s in PillarCrawlerContent.
    // (The trailing "tileLinks() dedupes by href, so 'Read more' still renders
    // 5 unique links, not 11" was removed 2026-09-05 with the Read-more block
    // itself — DECISIONS/0010. It described a client-only affordance that was
    // never in the served HTML, so it was never the path this note relies on.
    // PillarCrawlerContent, which IS server-rendered, still emits every
    // href-bearing tile, so ADR-0007 decision 3 is satisfied unchanged.)
    serviceTiles: [
      {
        product: "Custom Website Build",
        title: "Fortune 500 Quality, Built by Someone in Kansas",
        description:
          "Every site is written from the ground up in raw code, custom to your business, using the most current languages and frameworks available. That buys you the design, the animation, the polish and the security you would expect on a Fortune 500 site, from someone whose name and face are right here.",
        href: "/services/custom-websites",
        icon: <IconAgencyGradeBuild />,
      },
      {
        product: "Conversion-Focused Design",
        title: "Every Page Engineered to Produce a Customer",
        description:
          "We psychologically design the path of every website we build: what the eye lands on first, the order the argument arrives in, and where the decision gets made. Every page is laid out to move a visitor toward a booking or a sale.",
        href: "/services/conversion-optimization",
        icon: <IconConversionPath />,
      },
      {
        product: "AI-Readable Structure",
        title: "Built to Be Found Inside AI Conversations",
        description:
          "People ask ChatGPT, Claude and Gemini for recommendations now. We build every site so those assistants can read it cleanly, understand what you do and quote you in the answer, with the structured data and plain statements of fact they rely on.",
        icon: <IconAiReadablePage />,
      },
      {
        product: "Behavioural Analytics",
        title: "We Know When and Where People Clicked Off Your Website",
        description:
          "We build granular tracking into every site, so you can see the exact page and the exact moment a visitor left. The patterns show up over the first few months, and we make the changes those patterns point to.",
        icon: <IconGranularTracking />,
      },
      {
        product: "Performance & Security",
        title: "Snappy and Secure",
        description:
          "Your pages run on the fastest infrastructure available, everywhere in the world a visitor can click, and the code is written with security as a first concern rather than a plugin bolted on later. Load time decides whether someone stays or leaves.",
        icon: <IconSnappyAndSecure />,
      },
      {
        product: "Platform Migration",
        title: "We Migrate Your SEO Equity and All Your Content",
        description:
          "Coming off Wix, Squarespace, WordPress, GoDaddy or Webflow, we carry your search equity across with you: every old URL mapped to its new home, the structured data rebuilt, and every piece of your existing content moved over for you.",
        href: "/services/website-redesign",
        icon: <IconPlatformMigration />,
      },
      {
        product: "Systems Integration",
        title: "Every Site Routed Straight Into Your Business Software",
        description:
          "Every enquiry, form and booking is routed automatically into the systems your business actually runs on, and assigned where it belongs. Nothing lands in one person's inbox to be discovered on Thursday.",
        icon: <IconFormToRecord />,
      },
    ],
    differentiators: [
      {
        lead: "Custom-coded, start to finish.",
        body: "No template bought and repainted, no page builder, no offshore work. That is why it loads fast and why it can do things a template cannot.",
      },
      {
        lead: "The redirects are mapped before launch.",
        body: "Every old URL gets a destination, the metadata comes with it, and the search engines get told. The typical migration disaster is a launch-day discovery, so it happens before launch day here.",
      },
      {
        lead: "Designed around how you get paid.",
        body: "The layout follows the path from a stranger arriving to a customer calling. Pages that do not serve that path do not get built.",
      },
    ],
  },
  {
    type: "search-ads",
    variant: "search-ads",
    title: "AI and Search Engine Visibility.",
    description:
      "Getting found on the three surfaces that matter now: the Google local pack, the AI assistants people ask instead of typing into Google, and paid placement for when you need volume sooner than SEO can deliver it. Audit first, then a plan, then the work.",
    href: "/contact",
    visual: <SearchVisual />,
    bullets: [
      "Google Business Profile and local pack",
      "Cited by ChatGPT, Perplexity, Gemini, and Claude",
      "Google, Meta, and LinkedIn campaigns",
      "Reported on pipeline, not impressions",
    ],
    // Card-face hook: painPoints[2] -- matches the retitled card and its own AI OVERVIEW artwork; the local-pack lines are narrower.
    hookIndex: 2,
    painPoints: [
      "We don't show up on Google Maps for the thing we actually do.",
      "Our competitors are in the local pack and we're on page two.",
      "People are asking ChatGPT for a recommendation and it has never heard of us.",
      "We've spent months on ads and I still can't tell you what a customer costs.",
      "The last agency sent a dashboard of impressions and clicks and no answers.",
      "Our reviews trickle in and nobody has ever asked a customer for one.",
    ],
    serviceTiles: [
      {
        product: "Multi-Agent Marketing Engine",
        title: "MarCommand: Your Whole Marketing Operation as One Engine",
        description:
          "MarCommand is our own multi-agent marketing engine, and it runs behind every marketing engagement we take. It ingests every channel you run and coordinates the strategy, the copy, the creative, the paid spend and the reporting as a single system.",
        icon: <IconMarCommandEngine />,
      },
      {
        product: "Cross-Channel ROI Dashboard",
        title: "What's Your Real ROI on Ad Spend?",
        description:
          "Every channel you run reports into one dashboard showing what you spent, what came back, and what a customer actually cost you to win. One place, current, with the real number instead of impressions and clicks.",
        icon: <IconTrueAcquisitionCost />,
      },
      {
        product: "Ongoing Visibility Management",
        title: "We Defend Your Position Every Single Month",
        description:
          "Search and AI visibility move constantly, so the work never stops. Every few weeks we are making changes, re-checking what the assistants say about you and correcting whatever slipped. This is not a project that gets delivered and then left alone.",
        icon: <IconOngoingCadence />,
      },
      {
        product: "SEO & Answer Engine Optimisation",
        title: "World-Class SEO, Built to Be Found by AI",
        description:
          "We do the SEO work to a genuinely high standard, and we build for how people search now: assistants that answer rather than list. Your pages, your profiles and your plain facts get structured so a search engine and an AI model can both find you and name you.",
        href: "/services/ai-search-optimization",
        icon: <IconAiFindableSeo />,
      },
      {
        product: "Automated Review Funnel",
        title: "Google Reviews That Arrive Without Anyone Asking",
        description:
          "An automated funnel asks every customer at the moment the work is finished and they are happiest, and points them at the profile that moves what people see when they look you up. Nobody on your team has to remember to do it.",
        icon: <IconReviewFunnel />,
      },
      {
        product: "Outcome-Based Reporting",
        title: "Your Success Is Our Success",
        description:
          "Plenty of firms will hand you a report full of impressions and clicks that never turned into a single sale. That is not a result. If the work is not bringing you real leads, real customers and real awareness of your brand, it is not doing its job.",
        href: "/services/paid-ads",
        icon: <IconSharedSuccess />,
      },
    ],
    differentiators: [
      {
        lead: "Audit before proposal, every time.",
        body: "The first deliverable is an honest read on whether this channel is worth your money. Sometimes the answer is no, and that is still the answer you get.",
      },
      {
        lead: "One operator, not a junior media buyer.",
        body: "The person running the account is the person you talk to. No percent-of-spend model, no bloated retainer, no learning on your budget.",
      },
      {
        lead: "Search and AI search are one job now.",
        body: "The structured data that helps the local pack is the same structured data an AI engine reads before it recommends anyone. Doing them separately pays twice for one result.",
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
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   TILE SVG ICONS — 36 unique icons, ONE PER SERVICE TILE
   viewBox="0 0 48 48", stroke-based, legible at the 80px the
   .ps-carousel-card-graphic actually renders them at.

   FAMILY CONTRACT (all 36 obey it; do not add a 37th that does not):
     - viewBox "0 0 48 48", fill="none" at root, currentColor only.
     - strokeWidth 1.5 on EVERY stroked element. No 1.25, no 1.75.
     - strokeLinecap/strokeLinejoin "round" on every stroked element.
     - Secondary detail uses strokeOpacity 0.55. Nothing goes below
       0.5: the wrapper already paints these at rgba(255,255,255,.6)
       over a gradient, so 0.25 here lands at 15% white and vanishes.
     - Exactly ONE accent per icon -- the thing the card is about --
       carried by fill="currentColor" fillOpacity 0.85-0.9, never by
       a heavier stroke.
     - Corner radius: rx 2.5-3 on full panels, 2 on sub-panels,
       1-1.75 on chips. Shared optical box: content inside x 3-44.

   Rewritten 2026-09-05. The previous set had 42 components covering
   36 cards because SEVEN of them were reused across two-to-four
   cards each (IconDocumentProcessing alone served four cards in four
   different pillars). A shared icon cannot depict a specific
   deliverable, which was the whole brief, so the mapping is now 1:1.
   Do not reintroduce sharing to save a component.
   ───────────────────────────────────────────────────────────── */

/* ── PILLAR 1: BUSINESS SOFTWARE ── */

/* P1-4 "The Spreadsheet Everyone's Afraid to Touch": the workbook half the
   company runs on becomes one system with real logins and real history. */
function IconSpreadsheetToSystem() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* The workbook everyone emails around */}
      <rect x="5" y="13" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="5" y1="18.5" x2="21" y2="18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="5" y1="24.5" x2="21" y2="24.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="13" y1="18.5" x2="13" y2="31" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* Migration */}
      <line x1="23" y1="22" x2="29" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M26.5 19l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* One system */}
      <ellipse cx="38" cy="15" rx="5.5" ry="2.4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M32.5 15v14c0 1.33 2.46 2.4 5.5 2.4s5.5-1.07 5.5-2.4V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32.5 22c0 1.33 2.46 2.4 5.5 2.4s5.5-1.07 5.5-2.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      {/* ACCENT: the row that made it across */}
      <rect x="6.5" y="20.5" width="5" height="2.5" rx="1.25" fill="currentColor" fillOpacity="0.85" />
    </svg>
  );
}

/* P1-2 "The Business Runs the Week You're Not There": the week with your
   days blocked out, and the work running straight through the gap. */
function IconWeekRunsWithoutYou() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* The week */}
      <rect x="4" y="6" width="40" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="4" y1="12" x2="44" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="14" y1="3" x2="14" y2="8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="34" y1="3" x2="34" y2="8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* The days you are gone */}
      <rect x="18" y="15" width="14" height="6" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <line x1="19.5" y1="19.5" x2="30.5" y2="16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* The work keeps moving anyway */}
      <line x1="7" y1="35" x2="40" y2="35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M37.5 32l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="35" r="3.2" stroke="currentColor" strokeWidth="1.5" />
      {/* ACCENT: the approval that ran while you were away */}
      <circle cx="25" cy="35" r="3.6" fill="currentColor" fillOpacity="0.9" />
    </svg>
  );
}


/* P1-5 "Whoever Answers the Phone Has the Whole History": the call, and
   the one customer record carrying every job behind it. */
function IconCustomerHistoryOnCall() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Somebody picks up */}
      <path d="M17 5a1.6 1.6 0 011.6-1.6h2.6a1.2 1.2 0 011.16.88l.8 2.8a1.2 1.2 0 01-.5 1.32l-1.52 1.04a11.2 11.2 0 005.12 5.12l1.04-1.52a1.2 1.2 0 011.32-.5l2.8.8a1.2 1.2 0 01.88 1.16v2.6a1.6 1.6 0 01-1.6 1.6C22.76 19.8 17 14.04 17 5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* One record per customer */}
      <rect x="6" y="21" width="36" height="23" rx="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* ACCENT: whose record it is */}
      <rect x="10" y="25" width="13" height="3.5" rx="1.75" fill="currentColor" fillOpacity="0.85" />
      {/* Every quote, job, invoice and photo, in order */}
      <line x1="12" y1="32" x2="12" y2="39.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <circle cx="12" cy="32.5" r="1.3" fill="currentColor" fillOpacity="0.55" />
      <circle cx="12" cy="36" r="1.3" fill="currentColor" fillOpacity="0.55" />
      <circle cx="12" cy="39.5" r="1.3" fill="currentColor" fillOpacity="0.55" />
      <line x1="16" y1="32.5" x2="37" y2="32.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="16" y1="36" x2="33" y2="36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="16" y1="39.5" x2="29" y2="39.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
    </svg>
  );
}

/* P1-1 "Your Whole Business on One Screen": one panel carrying the five
   or six numbers that decide the week, and the same panel on a phone. */
function IconOneScreenKpis() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* The one screen */}
      <rect x="3" y="7" width="29" height="26" rx="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="3" y1="13" x2="32" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* ACCENT: the number that actually decides the week */}
      <rect x="6" y="16" width="10" height="6" rx="2" fill="currentColor" fillOpacity="0.85" />
      <rect x="19" y="16" width="10" height="6" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="6" y="24.5" width="10" height="6" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="19" y="24.5" width="10" height="6" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      {/* It opens on your phone */}
      <rect x="33" y="25" width="11" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="36.5" y1="28" x2="40.5" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="35.5" y1="33" x2="41.5" y2="33" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="35.5" y1="37.5" x2="39.5" y2="37.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
    </svg>
  );
}

/* P1-7 "Know Which Jobs Made Money Before You Quote the Next One":
   margin per job against a zero line, and the one that lost money. */
function IconPerJobMargin() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Zero */}
      <line x1="5" y1="32" x2="43" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="8" x2="8" y2="38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* Job by job */}
      <rect x="12" y="17" width="6.5" height="15" rx="1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="21" y="11" width="6.5" height="21" rx="1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="36" y="20" width="6.5" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* ACCENT: the job you lost money on */}
      <rect x="28.5" y="32" width="6.5" height="9" rx="1.5" fill="currentColor" fillOpacity="0.9" />
    </svg>
  );
}

/* P1-3 "When Someone Leaves, Their Access Leaves With Them": their own
   login, only the screens their job needs, taken back in one click. */
function IconLoginRevoked() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Their account */}
      <rect x="5" y="12" width="24" height="22" rx="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12.5" cy="20" r="3" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.55" />
      <path d="M8.5 27.5c0-2.2 1.8-3.6 4-3.6s4 1.4 4 3.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="19" y1="19" x2="26" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="19" y1="23" x2="24" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* Their own key */}
      <circle cx="38" cy="15" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M38 18.5v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="38" y1="22.5" x2="41" y2="22.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="38" y1="25.5" x2="40.5" y2="25.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Revoked */}
      <circle cx="36" cy="35" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M31.4 30.4l9.2 9.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* ACCENT: the click that did it */}
      <rect x="19" y="28" width="6" height="2.5" rx="1.25" fill="currentColor" fillOpacity="0.85" />
    </svg>
  );
}

/* P1-6 "It Stops Living in One Person's Head": what one person knows,
   written out as steps the system requires of everybody. */
function IconProcessOutOfHead() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* The person it currently lives in */}
      <circle cx="11" cy="13" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4.5 25c0-3.5 2.9-5.6 6.5-5.6s6.5 2.1 6.5 5.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* Out of their head */}
      <line x1="14" y1="31" x2="20.5" y2="31" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 28.5l2.5 2.5-2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Required steps, in the software */}
      <rect x="23" y="7" width="21" height="34" rx="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="26.5" y="12" width="4" height="4" rx="1.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="26.5" y="22" width="4" height="4" rx="1.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="26.5" y="32" width="4" height="4" rx="1.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      {/* ACCENT: the step the system will not let you skip */}
      <rect x="33" y="12" width="8" height="4" rx="2" fill="currentColor" fillOpacity="0.85" />
      <line x1="33" y1="24" x2="41" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="33" y1="34" x2="39" y2="34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
    </svg>
  );
}

/* ── PILLAR 2: BUSINESS AUTOMATION ── */

/* P2-1 "Get Paid Without Ever Chasing an Invoice Yourself": the invoice
   goes out on its own and the reminders escalate without you. */
function IconInvoiceAutoSend() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* The invoice */}
      <rect x="6" y="7" width="24" height="32" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="10" y1="13" x2="20" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="10" y1="19" x2="26" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="10" y1="23" x2="26" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="10" y1="27" x2="22" y2="27" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="10" y1="31" x2="26" y2="31" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* ACCENT: the total */}
      <rect x="18" y="33.5" width="8" height="3" rx="1.5" fill="currentColor" fillOpacity="0.85" />
      {/* Goes out on its own */}
      <path d="M33 8l10 4.5-10 4.5 2-4.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Chases itself */}
      <path d="M41 21a9 9 0 0 1-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <path d="M34.5 27.5L32 30l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
    </svg>
  );
}

/* P2-2 "Your Systems Talk to Each Other Instead of Somebody Retyping":
   entered once, and every system that needs it just agrees. */
function IconEnteredOnce() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Typed once */}
      <rect x="14" y="5" width="20" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* ACCENT: the value you entered, the only time anybody types it */}
      <rect x="17" y="8.25" width="9" height="2.5" rx="1.25" fill="currentColor" fillOpacity="0.9" />
      <line x1="29" y1="7.5" x2="29" y2="11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Your systems tell each other */}
      <line x1="24" y1="14" x2="24" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M21.5 16.5L24 19l2.5-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="4" y="22" width="11" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="18" y="22" width="11" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="32" y="22" width="11" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="15" y1="28" x2="18" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="29" y1="28" x2="32" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* Instead of somebody retyping between them */}
      <path d="M6.6 27.5l1.9 1.9 3.4-3.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <path d="M20.6 27.5l1.9 1.9 3.4-3.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <path d="M34.6 27.5l1.9 1.9 3.4-3.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      {/* On a schedule */}
      <circle cx="24" cy="40" r="4.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.55" />
      <path d="M24 37.4V40l1.9 1.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
    </svg>
  );
}


/* P2-4 "Nothing That Comes In at 9pm Waits Until Morning": the after-hours
   enquiry splits -- the emergency reaches a person, the rest queues. */
function IconAfterHoursTriage() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* After hours */}
      <path d="M13.6 4.6a6.6 6.6 0 100 12.8 7.4 7.4 0 010-12.8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      {/* It comes in anyway */}
      <rect x="3" y="22" width="13" height="9.5" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="6.5" y1="26.5" x2="12.5" y2="26.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* Sorted by urgency */}
      <path d="M16 26.5L24 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 27.5L26 37" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* ACCENT: the one that is a real emergency */}
      <circle cx="25.5" cy="13" r="2.8" fill="currentColor" fillOpacity="0.9" />
      {/* It reaches a person */}
      <circle cx="36" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M30.5 19.5c0-3 2.5-4.9 5.5-4.9s5.5 1.9 5.5 4.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* The rest is queued, with its context, for the morning */}
      <rect x="27" y="31" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <line x1="30" y1="35.5" x2="40" y2="35.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="30" y1="39" x2="37" y2="39" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
    </svg>
  );
}

/* P2-5 "Proposals and Contracts That Build Themselves From the Job": the
   real record becomes the document, priced, and out for signature. */
function IconDocumentFromRecord() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* The job record it is built from */}
      <rect x="3" y="11" width="14" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <line x1="6.5" y1="17" x2="13.5" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="6.5" y1="21.5" x2="11" y2="21.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* Built, not retyped */}
      <line x1="18.5" y1="19" x2="23" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20.5 16.5l2.5 2.5-2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* The proposal */}
      <path d="M27 5h9l8 8v27a2 2 0 01-2 2H27a2 2 0 01-2-2V7a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M36 5v8h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <line x1="29" y1="19" x2="40" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="29" y1="23.5" x2="37" y2="23.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* ACCENT: the pricing that came off the job */}
      <rect x="29" y="27.5" width="9" height="4" rx="2" fill="currentColor" fillOpacity="0.85" />
      {/* Out for signature */}
      <path d="M29 37.5c1.4-2.6 2.5 1.6 3.9 0s2.2-3 3.5-1.2 1.9 1.4 2.6.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="29" y1="40.5" x2="40" y2="40.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
    </svg>
  );
}

/* P2-3 "The Last Week of Every Month Stops Disappearing": bank activity and
   invoices matched overnight, with only the genuine mismatch left open. */
function IconTwoListsReconciled() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* List one */}
      <rect x="4" y="7" width="15" height="34" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="7" y1="14" x2="16" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="7" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="7" y1="28" x2="16" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="7" y1="35" x2="16" y2="35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* List two */}
      <rect x="29" y="7" width="15" height="34" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="32" y1="14" x2="41" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="32" y1="21" x2="41" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="32" y1="28" x2="41" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="32" y1="35" x2="41" y2="35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* Already ticked off when you sit down */}
      <path d="M21.4 14l1.9 1.9 3.4-3.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <path d="M21.4 21l1.9 1.9 3.4-3.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <path d="M21.4 28l1.9 1.9 3.4-3.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      {/* ACCENT: the handful you actually look at */}
      <circle cx="24" cy="35" r="3.5" fill="currentColor" fillOpacity="0.85" />
    </svg>
  );
}

/* P2-7 "Nothing Goes Out to a Customer at 3am That You Haven't Seen": the
   written list of what the automation will never do without you. */
function IconGuardrailList() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* The written list */}
      <rect x="8" y="8" width="32" height="34" rx="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="19" y="5" width="10" height="6" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Not allowed, unless a person says yes */}
      <circle cx="15" cy="19" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12.9 16.9l4.2 4.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="21" y1="19" x2="34" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <circle cx="15" cy="27" r="3" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.55" />
      <path d="M12.9 24.9l4.2 4.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="21" y1="27" x2="34" y2="27" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <circle cx="15" cy="35" r="3" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.55" />
      <path d="M12.9 32.9l4.2 4.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="21" y1="35" x2="30" y2="35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* ACCENT: the line only you can cross */}
      <rect x="21" y="12" width="13" height="3" rx="1.5" fill="currentColor" fillOpacity="0.85" />
    </svg>
  );
}

/* P2-6 "Nothing Expires Without You Knowing Weeks Ahead": the date it runs
   out sits at the end of the run, the warning is raised weeks before it, and
   the renewal has a named person on it. */
function IconExpiryEarlyWarning() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Weeks ahead of it */}
      <path d="M20 9V5.5h20.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      {/* The run up to the date */}
      <line x1="5" y1="13" x2="36" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* The date it runs out */}
      <rect x="36" y="8.5" width="8" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* ACCENT: the warning, early enough to do something about */}
      <circle cx="20" cy="13" r="3.4" fill="currentColor" fillOpacity="0.9" />
      <line x1="20" y1="16.5" x2="20" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* The certificate, and the person renewing it */}
      <rect x="7" y="21" width="34" height="22" rx="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="7" y1="27" x2="41" y2="27" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="11" y1="32.5" x2="28" y2="32.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="11" y1="37.5" x2="23" y2="37.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <circle cx="34" cy="35" r="3.2" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.55" />
    </svg>
  );
}

/* ── PILLAR 3: AI INTEGRATION (all seven are about CONTROL) ── */

/* P3-1 "It Shows Its Work, and Never Makes the Big Call Without You": the
   work is done and waiting behind a barrier only your approval lifts. */
function IconApprovalGate() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* It can propose */}
      <rect x="5" y="26" width="15" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="8.5" y1="31" x2="16.5" y2="31" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="8.5" y1="34.5" x2="14" y2="34.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* It cannot send */}
      <line x1="27" y1="16" x2="27" y2="40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="23" y1="40" x2="31" y2="40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <rect x="27" y="24" width="15" height="3.5" rx="1.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="33" y1="24" x2="31" y2="27.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="38" y1="24" x2="36" y2="27.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* Until you say so */}
      <circle cx="27" cy="10" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M24 10l2 2 4-4.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* ACCENT: every time it asked is on the record */}
      <rect x="5" y="19" width="10" height="3" rx="1.5" fill="currentColor" fillOpacity="0.85" />
    </svg>
  );
}

/* P3-3 "Ask a Question About Your Own Business, Get the Real Number": a
   plain question in, the live figures and the list behind them out. */
function IconPlainEnglishQuery() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Plain English, typed */}
      <rect x="5" y="6" width="38" height="11" rx="5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="11" y1="11.5" x2="28" y2="11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="32" y1="8.5" x2="32" y2="14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* The chart */}
      <line x1="5" y1="38" x2="25" y2="38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <rect x="7" y="26" width="4" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      {/* ACCENT: the answer */}
      <rect x="13" y="22" width="4" height="15" rx="1.5" fill="currentColor" fillOpacity="0.85" />
      <rect x="19" y="29" width="4" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      {/* And the list behind it */}
      <rect x="27" y="21" width="16" height="17" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="30" y1="26" x2="40" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="30" y1="30" x2="40" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="30" y1="34" x2="36" y2="34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
    </svg>
  );
}

/* P3-5 "It Reads the Paperwork, Then Checks Every Number Against the Page":
   the figure has to be found in the source document before anyone sees it. */
function IconNumberVerification() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* The document itself */}
      <rect x="5" y="5" width="26" height="38" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="9" y1="11" x2="27" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="9" y1="15" x2="27" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="9" y1="32" x2="27" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="9" y1="37" x2="22" y2="37" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* ACCENT: the figure, found in the document */}
      <rect x="9" y="19" width="10" height="4.5" rx="1.25" fill="currentColor" fillOpacity="0.85" />
      {/* Checked against it */}
      <circle cx="19" cy="21.2" r="6.8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M23.8 26l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Every number */}
      <path d="M34 12l1.7 1.7 3.5-3.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <path d="M34 22l1.7 1.7 3.5-3.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <path d="M34 32l1.7 1.7 3.5-3.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
    </svg>
  );
}

/* P3-7 "Nobody Here Has to Learn to Run It": the system runs on your side
   of the line; the people who operate and fix it are on ours. */
function IconWeRunAndFixIt() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Your side: it just runs */}
      <rect x="3" y="13" width="21" height="22" rx="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="3" y1="20" x2="24" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* ACCENT: running, with nobody here minding it */}
      <circle cx="8" cy="16.5" r="2.1" fill="currentColor" fillOpacity="0.9" />
      <line x1="7" y1="25.5" x2="20" y2="25.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="7" y1="30" x2="16" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* The line between your staff and ours */}
      <line x1="27" y1="5" x2="27" y2="43" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* Our side: we build it, run it, fix it */}
      <circle cx="37" cy="14" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M30.5 26c0-3.5 2.9-5.7 6.5-5.7s6.5 2.2 6.5 5.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <path d="M37 31c0 5.5-5 8.5-13 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M27 34.4L24 38l3.6 2.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* P3-2 "Your Team Is Already Using AI. We Make That Safe.": the tool your
   people may paste into, the one they may not, and the one page of rules. */
function IconApprovedAiTools() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Approved for company data */}
      <rect x="5" y="6" width="16" height="15" rx="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 13.8l3 3 5.5-6.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Not approved */}
      <rect x="27" y="6" width="16" height="15" rx="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <path d="M31 10l8 7M39 10l-8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* The one page everyone will actually read */}
      <rect x="10" y="26" width="28" height="17" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* ACCENT: the rule at the top of it */}
      <rect x="13.5" y="29.5" width="11" height="3.5" rx="1.75" fill="currentColor" fillOpacity="0.85" />
      <line x1="13.5" y1="36" x2="34.5" y2="36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="13.5" y1="39.5" x2="29" y2="39.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
    </svg>
  );
}

/* P3-8 "Start With One Job, Measure What It Saves, Then Decide": one
   process picked out, measured before, measured after, and the gap. */
function IconMeasureOneProcess() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Pick one */}
      <rect x="5" y="6" width="11" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="18.5" y="5" width="11" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="32" y="6" width="11" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      {/* What it costs you now */}
      <rect x="6" y="20" width="32" height="7" rx="3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* ACCENT: what it costs after */}
      <rect x="6" y="31" width="16" height="7" rx="3.5" fill="currentColor" fillOpacity="0.9" />
      {/* The difference you decide on */}
      <line x1="25" y1="42" x2="35" y2="42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <path d="M24.5 42l3-2.6M24.5 42l3 2.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <path d="M35.5 42l-3-2.6M35.5 42l-3 2.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
    </svg>
  );
}

/* P3-6 "Put the AI on the Paperwork, Not in Front of Your Customers": the
   filing and chasing is automated; the customer still gets a person. */
function IconAiOnPaperworkHumanOnPhone() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* The line we will not cross */}
      <line x1="24" y1="5" x2="24" y2="43" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* The paperwork, handled */}
      <rect x="3" y="11" width="13" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="6.5" y="15" width="13" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="9.5" y1="21" x2="16.5" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="9.5" y1="25.5" x2="14" y2="25.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <path d="M8 35l3 3 5.5-6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Your customer */}
      <circle cx="34" cy="11" r="4.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M28 21.5c0-3.2 2.7-5.2 6-5.2s6 2 6 5.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <line x1="34" y1="24" x2="34" y2="29" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* ACCENT: still a person on the other end */}
      <circle cx="34" cy="34" r="4.2" fill="currentColor" fillOpacity="0.9" />
      <path d="M28 44.5c0-3.2 2.7-5.2 6-5.2s6 2 6 5.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}


/* P3-4 "You Know Where Your Data Goes, in Writing": it stays inside
   systems you control, what leaves is stopped, and you get it in writing. */
function IconDataHandlingStatement() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Systems you control */}
      <rect x="4" y="6" width="24" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="8" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <line x1="11" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* What is never sent anywhere */}
      <line x1="29" y1="16" x2="34" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M32 13.5l2.5 2.5-2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="38" y1="9.5" x2="38" y2="22.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* In writing */}
      <rect x="13" y="29" width="27" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* ACCENT: the written answer */}
      <rect x="16.5" y="32.5" width="10" height="3.5" rx="1.75" fill="currentColor" fillOpacity="0.85" />
      <line x1="16.5" y1="39.5" x2="36.5" y2="39.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
    </svg>
  );
}

/* ── PILLAR 4: WEBSITES ── */

/* P4-1 "Change Your Own Hours, Prices and Photos in a Minute": your own
   page, your own cursor on the line that changes. */
function IconEditOwnCopy() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Your site */}
      <rect x="5" y="8" width="38" height="32" rx="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="5" y1="15" x2="43" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <circle cx="9.5" cy="11.5" r="1.2" fill="currentColor" fillOpacity="0.55" />
      <circle cx="13.5" cy="11.5" r="1.2" fill="currentColor" fillOpacity="0.55" />
      {/* ACCENT: the sentence you are changing */}
      <rect x="10" y="20" width="15" height="3.5" rx="1.75" fill="currentColor" fillOpacity="0.85" />
      <line x1="10" y1="28" x2="27" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="10" y1="33" x2="21" y2="33" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* No developer */}
      <path d="M35 33.5l-4.2 1.2 1.2-4.2 8.6-8.6a1.6 1.6 0 0 1 2.3 0l.7.7a1.6 1.6 0 0 1 0 2.3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* P4-3 "What Happens on Your Site Shows Up Where You Actually Work": the
   form writes to a record with somebody's name on it; no shared inbox. */
function IconFormToRecord() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* The form */}
      <rect x="4" y="8" width="17" height="32" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="7" y="13" width="11" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="7" y="21" width="11" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      {/* ACCENT: submit */}
      <rect x="7" y="30" width="11" height="6" rx="2" fill="currentColor" fillOpacity="0.85" />
      {/* Straight into the system */}
      <line x1="23" y1="22" x2="27.5" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M25.5 19.5L28 22l-2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Not an inbox */}
      <rect x="22.5" y="32" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <path d="M22 37.8l8-6.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Landing on a record with a name against it */}
      <rect x="30" y="12" width="13" height="24" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="36.5" cy="19" r="3" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.55" />
      <line x1="33" y1="26" x2="40" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="33" y1="30" x2="38" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
    </svg>
  );
}

/* P4-2 "You Own the Domain, the Site and the Accounts": the keys, in your
   name, to the registrar, the hosting and the code. Redrawn because the
   first attempt shared a silhouette with P4-6 and its key read as a blob. */
function IconYouOwnTheAssets() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* The keys, handed to you */}
      <circle cx="9" cy="13" r="6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="9" cy="13" r="2.2" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.55" />
      <line x1="15" y1="13" x2="39" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="31" y1="13" x2="31" y2="19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="36.5" y1="13" x2="36.5" y2="17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* ACCENT: the name it is all in, from the first day */}
      <rect x="5" y="24" width="17" height="6" rx="3" fill="currentColor" fillOpacity="0.85" />
      <line x1="25" y1="27" x2="42" y2="27" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* Registrar, hosting, the code itself */}
      <rect x="5" y="35" width="11" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="18.5" y="35" width="11" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="32" y="35" width="11" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
    </svg>
  );
}

/* P4-6 "We'll Tell You If Your Site Is Fine. Sometimes It Is.": the
   written audit that is allowed to end in keep it, and three changes. */
function IconHonestSiteAudit() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* The written look at it */}
      <rect x="6" y="4" width="30" height="38" rx="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="6" y1="11" x2="36" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* ACCENT: the verdict -- keep it */}
      <rect x="10" y="14.5" width="13" height="4" rx="2" fill="currentColor" fillOpacity="0.85" />
      {/* And change these three things */}
      <rect x="10" y="23" width="3.5" height="3.5" rx="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <line x1="16.5" y1="24.75" x2="31" y2="24.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <rect x="10" y="30" width="3.5" height="3.5" rx="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <line x1="16.5" y1="31.75" x2="28" y2="31.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <rect x="10" y="37" width="3.5" height="3.5" rx="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <line x1="16.5" y1="38.75" x2="25" y2="38.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* Sometimes it is fine */}
      <circle cx="37" cy="35" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M33.7 35l2.4 2.4 4.4-4.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* P4-5 "A Site That Produces Something You Can Count": the site, the one
   outcome wired to it, and the count that goes up. */
function IconCountedOutcome() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* The site */}
      <rect x="6" y="4" width="36" height="17" rx="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="6" y1="10" x2="42" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <circle cx="10" cy="7" r="1.1" fill="currentColor" fillOpacity="0.55" />
      <circle cx="14" cy="7" r="1.1" fill="currentColor" fillOpacity="0.55" />
      {/* Wired to one outcome */}
      <line x1="24" y1="21" x2="24" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M21.5 24l2.5 2.5 2.5-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Something you can count */}
      <rect x="12" y="29" width="24" height="15" rx="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="17" y1="33.5" x2="17" y2="39.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="21" y1="33.5" x2="21" y2="39.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="25" y1="33.5" x2="25" y2="39.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* ACCENT: this month's */}
      <rect x="29" y="33.5" width="3" height="6" rx="1.5" fill="currentColor" fillOpacity="0.9" />
    </svg>
  );
}

/* P4-7 "Hand Your Phone to a Customer Without Wincing": type you can read
   and a target big enough to hit, on the phone they are actually holding. */
function IconPhoneTapTargets() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* The phone they are holding */}
      <rect x="11" y="3" width="26" height="42" rx="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="20" y1="7.5" x2="28" y2="7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* Type you can read */}
      <line x1="16" y1="14" x2="32" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="19" x2="27" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* ACCENT: a target you can actually hit */}
      <rect x="15" y="24" width="18" height="9" rx="4.5" fill="currentColor" fillOpacity="0.9" />
      {/* Checked with a real thumb */}
      <circle cx="24" cy="38.5" r="3.4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="38.5" r="6.4" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.55" />
    </svg>
  );
}

/* P4-4 "See Exactly Where People Give Up, and Fix That Step": the funnel,
   and the one step they leak out of. */
function IconFunnelDropOff() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Everyone who lands */}
      <circle cx="14" cy="5" r="1.5" fill="currentColor" fillOpacity="0.55" />
      <circle cx="24" cy="5" r="1.5" fill="currentColor" fillOpacity="0.55" />
      <circle cx="34" cy="5" r="1.5" fill="currentColor" fillOpacity="0.55" />
      {/* The path to getting in touch */}
      <path d="M6 9h36L29 24v13l-10 5V24z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12.1" y1="16" x2="35.9" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="15.5" y1="20" x2="32.5" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* ACCENT: the step where they quit */}
      <path d="M12.1 16h23.8l-3.4 4H15.5z" fill="currentColor" fillOpacity="0.55" />
      <line x1="34" y1="18" x2="41" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M38.5 15.5L41 18l-2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* The few who get through */}
      <circle cx="24" cy="45.5" r="1.5" fill="currentColor" fillOpacity="0.85" />
    </svg>
  );
}

/* ── PILLAR 5: AI AND SEARCH ENGINE VISIBILITY ── */

/* P5-2 "We Ask ChatGPT About Your Business and Show You What It Says": one
   real customer question, the assistants' answers, and what they got wrong. */
function IconAssistantAnswers() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* The question your customers actually ask */}
      <rect x="4" y="18" width="15" height="11" rx="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="7" y1="22" x2="16" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="7" y1="26" x2="13" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <path d="M8 29v3.5l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Put to three assistants */}
      <line x1="19.5" y1="24" x2="21" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="21" y1="10.5" x2="21" y2="37.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* Their answers */}
      <rect x="22" y="5" width="21" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="22" y="18.5" width="21" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="22" y="32" width="21" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      {/* ACCENT: the one that named you */}
      <rect x="25" y="8.5" width="5" height="4" rx="1.5" fill="currentColor" fillOpacity="0.9" />
      <line x1="32.5" y1="10.5" x2="40" y2="10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* Who got named instead */}
      <rect x="25" y="22" width="5" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <line x1="32.5" y1="24" x2="40" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <rect x="25" y="35.5" width="5" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <line x1="32.5" y1="37.5" x2="40" y2="37.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
    </svg>
  );
}

/* P5-6 "Being Found Isn't Being Quoted": your words inside the answer,
   versus a link sitting underneath it. */
function IconCitedVsAnswer() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* What the assistant actually said */}
      <rect x="5" y="5" width="38" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="9" y1="10" x2="39" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* ACCENT: your sentence, in the answer */}
      <rect x="9" y="13.5" width="22" height="3.5" rx="1.75" fill="currentColor" fillOpacity="0.9" />
      <line x1="9" y1="20" x2="33" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* Only one of those wins the customer */}
      <line x1="5" y1="27" x2="43" y2="27" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Merely listed underneath */}
      <rect x="5" y="31" width="38" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="9" y="34" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <path d="M16 33h3.5v3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <line x1="16" y1="36.5" x2="19.5" y2="33" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="24" y1="37" x2="39" y2="37" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
    </svg>
  );
}

/* P5-4 "First We Make Your Ads Countable. Then We Stop Paying for Clicks
   That Never Call.": tracking on the ad first, then the enquiry it caused. */
function IconAdsMadeCountable() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* The ad */}
      <rect x="3" y="6" width="23" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="7" y1="11.5" x2="22" y2="11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="7" y1="16" x2="17" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* ACCENT: the tracking, fitted before anything else */}
      <path d="M44 12v7a2 2 0 01-2 2h-8l-5-5.5L34 10h8a2 2 0 012 2z" fill="currentColor" fillOpacity="0.9" />
      {/* The click */}
      <path d="M19 22l9.5 3.6-4 1.4-1.4 4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Which one actually became an enquiry */}
      <line x1="10" y1="22" x2="10" y2="29" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <path d="M7.5 27l2.5 2.5 2.5-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="4" y="31" width="38" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="8" y="34.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <line x1="18" y1="35.5" x2="38" y2="35.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="18" y1="39.5" x2="31" y2="39.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
    </svg>
  );
}


/* P5-7 "We Report Booked Work, Not Rankings -- and What We Couldn't See":
   the month's booked jobs on the left, the gap named on the right. Turned
   landscape and two-column because the first attempt was a third portrait
   document with three rows and read as P4-6. */
function IconBookedWorkReport() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* The monthly report */}
      <rect x="4" y="8" width="40" height="32" rx="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="24" y1="13" x2="24" y2="35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* ACCENT: it opens with the work you actually booked */}
      <rect x="8" y="13" width="12" height="9" rx="2.5" fill="currentColor" fillOpacity="0.85" />
      <line x1="8" y1="27" x2="20" y2="27" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="8" y1="31.5" x2="16" y2="31.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* And what we could not see, left visibly empty instead of filled in */}
      <rect x="28" y="13" width="12" height="9" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="31" y1="17.5" x2="37" y2="17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="28" y1="27" x2="40" y2="27" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="28" y1="31.5" x2="35" y2="31.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
    </svg>
  );
}

/* P5-3 "When AI Gets Your Address, Hours or Services Wrong, We Fix the
   Source": correct the profile and the directories, then re-check. */
function IconFixTheSource() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Profile, directories, your own pages */}
      <rect x="3" y="5" width="15" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="3" y="18" width="15" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="3" y="31" width="15" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      {/* ACCENT: the fact we corrected at the source */}
      <rect x="6.5" y="21.5" width="8" height="3.5" rx="1.75" fill="currentColor" fillOpacity="0.9" />
      {/* Into what the assistants read */}
      <line x1="19.5" y1="23" x2="24" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M21.5 20.5l2.5 2.5-2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* The answer, now right */}
      <rect x="26" y="11" width="18" height="22" rx="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="29.5" y1="18" x2="40.5" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="29.5" y1="23" x2="37" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* Re-checked, and shown to you */}
      <path d="M35 36.5c0 4-9 6.5-19 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <path d="M19 38.2L15.5 40.6l3.1 2.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
    </svg>
  );
}

/* P5-5 "Your Traffic Dropped and It Probably Wasn't Your Fault": the whole
   category's curve, yours falling further below it, and the gap between
   them -- the part that is actually recoverable. Divergence widened from
   the first attempt, where the two curves read as one thick line. */
function IconCategoryVsYou() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* What it is measured against */}
      <line x1="7" y1="6" x2="7" y2="40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="7" y1="40" x2="43" y2="40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* What the whole category lost */}
      <path d="M9 12c8 1 12 5 17 8s10 3.5 16 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      {/* What you actually lost */}
      <path d="M9 12c8 3 11 12 17 17s10 6.5 16 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* ACCENT: the part of the gap that is yours to get back */}
      <rect x="35.3" y="25" width="3.4" height="8" rx="1.7" fill="currentColor" fillOpacity="0.9" />
    </svg>
  );
}

/* P5-1 "Google Says Be Careful Who You Hire for This. We'll Show You the
   Page.": the guidance quoted from the source, not our claim about it. */
function IconOfficialGuidance() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* The guidance */}
      <rect x="5" y="5" width="24" height="32" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* ACCENT: their own words */}
      <path d="M9 11h4.3v4.3c0 2.1-1.3 3.4-3.1 3.8l-.6-1.5c1-.3 1.5-.9 1.6-1.8H9z" fill="currentColor" fillOpacity="0.9" />
      <path d="M16.5 11h4.3v4.3c0 2.1-1.3 3.4-3.1 3.8l-.6-1.5c1-.3 1.5-.9 1.6-1.8h-2.2z" fill="currentColor" fillOpacity="0.9" />
      <line x1="9" y1="24" x2="25" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="9" y1="28" x2="25" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="9" y1="32" x2="20" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* Official */}
      <circle cx="35" cy="33" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="35" cy="33" r="4.2" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.55" />
      <path d="M31.5 38.5l-1.2 5.5 4.7-2.3 4.7 2.3-1.2-5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   CAROUSEL GRADIENT PALETTE
   Each index maps to a unique gradient so the carousel is
   visually rich regardless of how many tiles a service has.
   ───────────────────────────────────────────────────────────── */

const CARD_GRADIENTS = [
  "linear-gradient(135deg, #1590FF, #635BFF)",
  "linear-gradient(135deg, #635BFF, #a855f7)",
  "linear-gradient(135deg, #00D4AA, #1590FF)",
  "linear-gradient(135deg, #F59E0B, #EF4444)",
  "linear-gradient(135deg, #1590FF, #00D4AA)",
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
              <div
                className={`ps-carousel-card-graphic${tile.wideGraphic ? " ps-carousel-card-graphic--wide" : ""}`}
                aria-hidden="true"
              >
                {tile.icon}
              </div>
            )}
            {/* Title always visible at bottom-left */}
            {tile.product && (
              <span className="ps-carousel-card-product">{tile.product}</span>
            )}
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
   TILE LINK EXTRACTION

   THE BUTTON-vs-LINK PROBLEM, AND HOW IT IS SOLVED.

   Every card in .ps-bento-grid is a <button> that opens a bottom
   sheet. The websites/marketing content this grid absorbed under
   ADR-0006 was six <Link>s that navigate. Those are two different
   affordances and they cannot both live on the card face:

   - An <a> inside the <button> is invalid HTML and a nested
     interactive control. Not an option.
   - Making the three new cards <a>s instead would give one grid
     two meanings behind one identical expand icon: three cards
     that open in place, three that leave the page, with nothing
     visually distinguishing them. That is the worse failure -- a
     card whose affordance lies about what it does.

   So: EVERY card stays a <button> and EVERY card expands. The
   navigation lives one level in, in the sheet, as a real link row
   under the carousel -- which is where a reader who opened a card
   is actually looking, and where the old band's descriptions now
   live as tile copy.

   The cost, stated plainly: the six /services/* URLs move out of
   the initial paint. PillarCrawlerContent pays that back by
   emitting them as real <a>s in the server-rendered HTML, and the
   report recommends the lead add the three that only the deleted
   band carried (website-redesign, conversion-optimization,
   paid-ads) to `serviceLinks` in page.tsx, which this agent does
   not own.
   ───────────────────────────────────────────────────────────── */

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
      // aria-label OVERRIDES all inner text here, and that is load-bearing:
      // .ps-bento-card__inner (the artwork) is NOT aria-hidden, so without a
      // label the accessible name would absorb "REVENUE MIX", "94%",
      // "ACTIVITY" and the rest of the mockup. Do not remove it.
      // "Open details" is the device-neutral form of the visible
      // "Click/Tap for more" cue, which is aria-hidden for that reason.
      // The title stays first so voice control ("click Business Software")
      // still targets the card (WCAG 2.5.3, Label in Name).
      aria-label={`${service.cardTitle ?? service.title} Open details`}
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
          {service.cardTitle ?? service.title}
        </h3>
        {/* Device-appropriate affordance. BOTH spans are always in the DOM;
            CSS picks one with @media (hover: none) — no JS, no user-agent
            sniffing. This is the same mechanism the Our Work cards already
            use (.ps-work-card__bob-label--hover / --tap, globals.css), reused
            rather than reinvented so there is one pattern on the page.

            aria-hidden because the button's aria-label already carries the
            device-neutral "Open details"; without this a UA that composes
            inner text would announce the cue twice.

            The pain-point hook that stood here from 2026-09-04 was removed
            the same day on the owner's instruction — the card face is title
            plus affordance only. `hookIndex` and `painPoints` are DELIBERATELY
            KEPT: the crawler mirror still emits all 30, and restoring the
            visible hook is one span. */}
        <span className="ps-bento-card__cue" aria-hidden="true">
          <span className="ps-bento-card__cue--hover">Click for more</span>
          <span className="ps-bento-card__cue--tap">Tap for more</span>
        </span>
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
  const overlayRef = useRef<HTMLDivElement>(null);
  // Set by the mount effect; called by handleClose. See both for why.
  const releaseBackgroundRef = useRef<(() => void) | null>(null);
  const touchStartY = useRef(0);
  const touchCurrentY = useRef(0);

  // Mount → next frame → add open class (drives CSS transitions)
  useEffect(() => {
    // Compensate for scrollbar width before locking scroll
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    /* MODAL SEMANTICS — SC 2.4.3 / 2.4.11.

       Scroll-lock stopped the page MOVING behind the sheet; it never stopped
       the page being REACHED. `aria-modal="true"` on the panel is a promise to
       assistive tech, not an instruction to the browser: Tab still walked out
       of the sheet and into the document underneath. Measured on this build
       before the fix, chromium at 1280x800 — the 13th and 14th Tab presses
       after open landed on `.ps-skip-link` and then `.ps-logo-link`, and
       hit-testing the focused logo returned `COVERED-by: .ps-dialog-overlay`
       on 5/5 of its corners and centre while the sheet was still open. WebKit
       escaped sooner, on press 9, into the footer newsletter input. So a
       keyboard visitor was focused on a control they could neither see nor
       click. Firefox happened to keep focus inside and showed nothing wrong,
       which is exactly why this is fixed by semantics rather than per engine.

       `inert` is the fix rather than `aria-hidden`, because only `inert`
       removes the subtree from the TAB ORDER; `aria-hidden` hides it from the
       accessibility tree while leaving focus free to walk straight in, which
       trades a visible bug for a silent one. Verified supported
       (`'inert' in HTMLElement.prototype`) in chromium, WebKit and firefox on
       this machine; the `aria-hidden` branch below is the floor for anything
       older, and it is deliberately paired with the sheet's own focus handling
       rather than used alone.

       Applied to the body's OTHER children — the sheet is `createPortal`'d
       onto `document.body`, so header, main and footer are its siblings, not
       its ancestors. The overlay and panel are skipped by identity, and
       anything already inert is left alone so this cannot clobber another
       owner's attribute when it restores. */
    const inertSupported = "inert" in HTMLElement.prototype;
    const backgrounded: HTMLElement[] = [];
    for (const node of Array.from(document.body.children)) {
      if (!(node instanceof HTMLElement)) continue;
      if (node === panelRef.current || node === overlayRef.current) continue;
      // Non-rendered head-ish nodes Next streams into body, plus the route
      // announcer, which is a live region and must not be muted.
      if (/^(SCRIPT|STYLE|LINK|META|TITLE|NEXT-ROUTE-ANNOUNCER)$/.test(node.tagName)) continue;
      if (node.hasAttribute("inert") || node.getAttribute("aria-hidden") === "true") continue;
      node.setAttribute(inertSupported ? "inert" : "aria-hidden", "true");
      backgrounded.push(node);
    }

    /* Idempotent, and called from TWO places on purpose — see handleClose.
       Only what this sheet took is released, so a re-entrant open cannot
       leave part of the document permanently unreachable. */
    let released = false;
    const releaseBackground = () => {
      if (released) return;
      released = true;
      for (const node of backgrounded) {
        node.removeAttribute(inertSupported ? "inert" : "aria-hidden");
      }
    };
    releaseBackgroundRef.current = releaseBackground;

    // Defer open to next paint so the initial transform is rendered first
    const raf = requestAnimationFrame(() => {
      setIsOpen(true);
    });

    /* The live focusable set, recomputed on every Tab rather than captured at
       mount. The sheet's content is dynamic — the carousel, the CTA and the
       reveal-gated blocks are not all present at first paint — so a set built
       once goes stale and starts wrapping at the wrong element.

       `getClientRects().length` is the visibility test on purpose: it is false
       for `display:none` and for a detached node while staying true for a
       transformed or off-screen-but-rendered element, which the sheet has
       plenty of mid-animation. A negative `tabindex` is excluded because it is
       programmatically focusable but not tabbable — the panel itself carries
       `tabIndex={-1}` and must not become a cycle stop. */
    const getFocusable = (): HTMLElement[] => {
      const panel = panelRef.current;
      if (!panel) return [];
      const selector =
        'a[href],area[href],button,input,select,textarea,summary,iframe,' +
        'audio[controls],video[controls],[contenteditable=""],[contenteditable="true"],[tabindex]';
      return Array.from(panel.querySelectorAll<HTMLElement>(selector)).filter((el) => {
        if (el.hasAttribute("disabled") || el.getAttribute("aria-hidden") === "true") return false;
        if (el instanceof HTMLInputElement && el.type === "hidden") return false;
        const ti = el.getAttribute("tabindex");
        if (ti !== null && Number(ti) < 0) return false;
        if (el.closest("[inert]")) return false;
        return el.getClientRects().length > 0;
      });
    };

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        handleClose();
        return;
      }
      if (e.key !== "Tab" || e.defaultPrevented) return;

      /* EXPLICIT WRAP — do not delegate this to the engine.

         `inert` on the body's other children (above) correctly stops Tab
         walking out of the sheet, but it leaves the wrap point to the engine
         and the engines disagree. Measured on this build, firefox at 390x844
         dark: press 12 lands on `.ps-dialog-cta-btn` ("Reach out") and presses
         13, 14, 15 and 16 all report that SAME element — firefox will not wrap
         from the last tabbable element back to the first, so Tab silently
         stops working. Chromium and webkit do continue, but only by passing
         through `<body>` at the wrap point: Shift+Tab from the first element
         returned `BODY` on both. Nobody was trapped in any engine (Escape and
         Shift+Tab still worked), but "Tab does nothing" is not an acceptable
         keyboard experience, and a body stop is a wasted press.

         Wrapping here makes the cycle identical in all three rather than
         correct in two. Note this does NOT suppress firefox's own tab stop on
         `.ps-carousel-track` (press 4 above) — that is firefox making a
         scrollable region keyboard reachable, which is a feature, and it sits
         mid-cycle where the wrap never touches it. */
      const focusables = getFocusable();
      const panel = panelRef.current;
      if (!panel || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      // Focus outside the sheet, or resting on the panel itself, has no
      // neighbour to advance to — send it to the appropriate end.
      if (!active || active === panel || !panel.contains(active)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
        return;
      }
      if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      }
      // Anything mid-cycle is left to the engine, which is why firefox keeps
      // its scrollable-region stop instead of being tabbed straight past it.
    }
    document.addEventListener("keydown", handleKey);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      // Safety net for an unmount that did NOT come through handleClose —
      // a parent unmount or a route change. Idempotent, so the normal path
      // having already released is a no-op.
      releaseBackground();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Animate out, then call onClose after transition completes
  function handleClose() {
    setIsOpen(false);
    setTimeout(() => {
      /* Release the background BEFORE handing control back to the parent, and
         NOT in the unmount cleanup where this started.

         The parent restores focus to the opening card inside a
         requestAnimationFrame. Whether React had already committed this
         component's unmount — and so run the cleanup — by the time that frame
         arrived was a race, and it was lost at phone widths: traced at
         360x640, `focus()` fired with the card still inside an inert subtree
         and the visitor landed on <body> instead of the card they opened. At
         1280x800 the same code won the race and looked correct, which is
         precisely why this cannot be left to timing.

         Releasing here is deterministic: the background stays inert for the
         whole 720ms close animation, right up to the statement before the
         parent is told to restore focus. */
      releaseBackgroundRef.current?.();
      onClose();
    }, 720);
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
        ref={overlayRef}
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

        {/* Close control.

            Docked HERE — as a direct, zero-height sticky child of the
            scrolling panel — rather than inside .ps-dialog-visual, where it
            used to live. One cause, two defects:

              * .ps-dialog-visual is normal-flow content inside the panel, and
                the panel is the scroll container (globals.css .ps-dialog-panel
                is position:fixed + overflow-y:auto). So the button scrolled
                away with the artwork and was unreachable in the Read-more
                state on desktop.
              * It was hidden outright below 768px by `display: none
                !important` in TWO separate max-width:768px blocks, on the
                reasoning that you "tap overlay to dismiss". At 92dvh there is
                almost no overlay left to tap and no visible affordance for it,
                so the mobile sheet was a modal with no advertised way out.

            Sticky to the panel keeps exactly ONE close control reachable at
            every width and every scroll position, which is also why the button
            is not duplicated per breakpoint. Escape (handleKey above) and
            focus restore to the opening card (handleClose in the parent) were
            already correct and are left alone. */}
        <div className="ps-dialog-close-dock">
          <button
            type="button"
            className="ps-dialog-close-btn"
            onClick={handleClose}
            /* Titles carry a trailing full stop ("Websites."), which a screen
               reader would announce mid-label as "Close Websites. details".
               Strip it so the name reads as one phrase. */
            aria-label={`Close ${service.title.replace(/\.$/, "")} details`}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Visual area — large animated preview */}
        <div className="ps-dialog-visual">
          <div className="ps-dialog-visual-art" aria-hidden="true">
            {service.visual}
          </div>
        </div>

        {/* Content area — staggered reveal */}
        <div className="ps-dialog-content">
          {/* Child 1 — Title */}
          <h3 className="ps-dialog-title ps-dialog-reveal">{service.title}</h3>

          {/* Child 2 — Service Tiles Carousel */}
          <div className="ps-dialog-section ps-dialog-reveal">
            <ServiceCarousel tiles={service.serviceTiles} />
          </div>

          {/* The "Read more" service-link list that stood here was removed
              2026-09-05 on the owner's instruction: "On each one of these Bento
              cards, get rid of the 'Read More' thing there. That's dumb."
              See DECISIONS/0010. Do not re-add it.

              It orphaned nothing. The block was createPortal'd and mounted only
              on click, so `ps-dialog-links`, `ps-dialog-links-label` and the
              string "Read more" appeared ZERO times in the served HTML — no
              crawler ever saw those links. Every destination it carried keeps
              4-40 inbound links from /services, /site-map, the homepage crawler
              <details> cluster (protected by ADR-0005 decision 3) and blog body
              copy. The destination pages and routes are KEPT — that was gated
              and settled separately. Only the affordance is gone. */}

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
    // `provider` removed from the OfferCatalog node 2026-09-05 (Team G, SEO
    // infra). OfferCatalog is an ItemList -> Intangible, and schema.org's
    // `provider` domainIncludes is {Invoice, Reservation, Service, Trip} — it
    // does not admit OfferCatalog. Validated against schema.org's official
    // vocabulary (schemaorg-current-https.jsonld); this was the last remaining
    // domain violation in the whole site's JSON-LD graph.
    //
    // No signal is lost: every nested Service below still carries
    // `provider: { "@id": LOCAL_BIZ_ID }`, which is the valid placement and the
    // one an engine actually reads to attribute the service to the business.
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
                {/* A tile with an href emits a real anchor. This block is
                    server-rendered into out/index.html, so these are the
                    homepage's only static links to the /services/* pages the
                    deleted websites-and-marketing band used to carry. Plain
                    <a>, not next/link: prefetching links inside a
                    visually-hidden block would re-create the 4.1s -> 0.8s
                    mobile navigation regression noted at hero.tsx:162-163. */}
                {tile.href ? (
                  /* tabIndex={-1} is REQUIRED, not optional, and must not be
                     removed. This whole section is aria-hidden="true" and
                     `.ps-visually-hidden` hides it with `clip`, NOT
                     `display: none` — so without this these anchors stay in
                     the tab order. A real Tab walk found stops 13-25 of 57
                     all at x=-1: thirteen consecutive invisible tab stops
                     mid-page, and axe flags it as `aria-hidden-focus`.
                     Removing them from the tab order does NOT remove them
                     from the DOM or from a crawler's path, which is the
                     whole point of this block. Do NOT "fix" this instead by
                     switching to display:none or deleting the links —
                     that would orphan six /services/* pages plus the three
                     pillar hubs from the homepage entirely. */
                  <a href={tile.href} tabIndex={-1}>
                    <strong>{tile.title}</strong>
                  </a>
                ) : (
                  <strong>{tile.title}</strong>
                )}
                {": "}
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
  // Five cards, rendered in source order.
  //   Row 1 — Business Software → Business Automation → AI Integration
  //   Row 2 — Websites → Search and Ads
  // Row 2 was folded in from the deleted websites-and-marketing.tsx band
  // under ADR-0006, which lifted ADR-0003's bar on a fourth pillar. The
  // hero <h1>, siteConfig.hero.h1 and the JSON-LD slogan are untouched:
  // ADR-0006 decision 4 moves cards, not the positioning sentence.
  //
  // 2026-09-04 (ADR-0007): six cards became five. Website Redesign and
  // Custom Websites merged into one `web` card titled "Websites."; that
  // ADR settles the card count ADR-0006 left open. Five cards do NOT
  // divide evenly above 1 column, so two grid-column spans now exist —
  // see the note above the card-height rules in globals.css.
  //
  // The mobile `order` rules in globals.css must stay in step with this
  // array — five cards, orders 1..5. A new card with no order rule gets
  // order:0 and jumps to the top of the mobile stack.
  const displayedServices = services;

  // Which card opened the sheet. Held in a ref as well as state because
  // handleClose needs it AFTER setExpandedIndex(null) has been queued, and a
  // [] -deps useCallback would otherwise close over a stale value.
  const openerIndexRef = useRef<number | null>(null);

  const handleExpand = useCallback((index: number) => {
    openerIndexRef.current = index;
    setExpandedIndex(index);
  }, []);

  const handleClose = useCallback(() => {
    const idx = openerIndexRef.current;
    openerIndexRef.current = null;
    setExpandedIndex(null);

    // Return focus to the card that opened the sheet. Without this, closing
    // dropped focus to <body> and a keyboard user restarted from the top of
    // the document — the sheet is a portal on document.body, so when it
    // unmounts there is nothing adjacent for focus to fall back to.
    //
    // Restored by INDEX off gridRef rather than by remembering
    // document.activeElement: a mouse click does not reliably focus a
    // <button> in every engine, so activeElement is often <body> at open
    // time and would restore nothing. The index is deterministic.
    //
    // rAF because onClose fires at the end of the close animation and React
    // has not yet committed the unmount; focusing in the same tick can be
    // undone as the portal tears down.
    if (idx !== null) {
      const card = gridRef.current?.children[idx] as HTMLElement | undefined;
      if (card) {
        requestAnimationFrame(() => card.focus());
      }
    }
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
          Built to Fit Your Business
        </h2>
        {/* The .ps-services-intro paragraph was removed 2026-09-04 on the
            owner's instruction: "remove the extra text under the built for
            your business. that paragraph".

            IT TOOK "22+ Kansas SMB projects delivered." WITH IT. That string
            was relocated INTO this paragraph when <Capabilities> was deleted,
            precisely because it was the homepage's only quantified scale
            claim and had nowhere else to live. It is now absent from the
            homepage entirely. It still exists site-wide in public/llms.txt,
            public/llms-full.txt, public/docs/agent-api.md, the agent-skills
            SKILL.md and src/data/aeo/tyler-preisser.ts (which renders on
            /tyler-preisser, not /). Flagged, not restored -- putting it
            somewhere else would be re-adding text the owner just removed. */}
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
