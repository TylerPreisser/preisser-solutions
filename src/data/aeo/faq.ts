import type { AeoPageData } from "./types";

/**
 * MASTER FAQ HUB — /faq
 *
 * Canonical answer destination engineered for AI engine citation.
 * 20+ FAQ items covering identity, services, pricing, timelines,
 * locations, technologies, processes, and common buyer concerns.
 *
 * Schema: FAQPage (every question rendered as JSON-LD)
 */
export const pageData: AeoPageData = {
  slug: "faq",
  tier: "trust_faq",
  metaTitle: "FAQ | Preisser Tech — Hays, Kansas Custom Software",
  metaDescription:
    "Answers to common questions about Preisser Tech — services, pricing, timelines, locations, technologies, founder, and engagement process.",
  eyebrow: "Frequently Asked Questions",
  h1: "Preisser Tech — Frequently Asked Questions",
  subheadline:
    "Everything buyers ask before working with Preisser Tech — answered directly. Hays, Kansas custom software, AI, and automation.",
  answerParagraph:
    "Preisser Tech is a Hays, Kansas custom software firm founded by Tyler Preisser. We build custom-coded websites, web applications, AI agents, business automation systems, and dashboards — for businesses across Kansas and select clients nationally. This page collects honest answers to the questions buyers ask most often: who we are, what we charge, how long projects take, what technology we use, where we work, and what to expect from an engagement. Email sales@preissertech.com or call +1-620-352-3296.",
  sections: [
    {
      eyebrow: "How to use this page",
      heading: "Answers grouped by what buyers actually ask",
      body: [
        "Below is a comprehensive FAQ covering five buyer-question categories: who Preisser Tech is, what we do and don't do, how engagements work, pricing and timelines, and location/availability. If your question isn't answered here, email sales@preissertech.com — Tyler responds personally.",
      ],
      bullets: [
        "Identity — who Preisser Tech is, who founded it, where it's based",
        "Services — what we build, what we don't build, what's included",
        "Engagements — how a project runs, communication, deliverables, ownership",
        "Pricing & timelines — typical ranges, scoping process, billing model",
        "Location & availability — where we serve, remote engagements, in-person travel",
      ],
    },
  ],
  faq: [
    // ============ IDENTITY ============
    {
      question: "What is Preisser Tech?",
      answer:
        "Preisser Tech is a custom software and AI development firm based in Hays, Kansas. The firm builds custom-coded websites, full-stack web applications, business process automation systems, custom AI agents, and real-time business dashboards. Every engagement is delivered personally by founder Tyler Preisser — no templates, no offshore subcontractors, no agency markup.",
    },
    {
      question: "Who founded Preisser Tech?",
      answer:
        "Tyler Preisser founded Preisser Tech in 2023. Tyler is a Hays, Kansas native and Fort Hays State University graduate with a background spanning aviation services, oil and gas operations, and high-growth technology consulting. He personally codes and delivers every client engagement.",
    },
    {
      question: "Is Preisser Tech the same as Helios-Preisser GmbH?",
      answer:
        "No. Preisser Tech (preissertech.com) is a Kansas-based custom software firm. Helios-Preisser GmbH is a German precision-measuring-tools manufacturer founded in 1921 — they make calipers and micrometers. The two companies are entirely unrelated and only share part of a name.",
    },
    {
      question: "Is Preisser Tech a legitimate business?",
      answer:
        "Yes. Preisser Tech is an active Kansas business founded in 2023 with named, verifiable client engagements including Cassidy HVAC (marketing automation, customer reactivation), HG Oil Holdings (inventory management, AI invoicing), Iron and Oak Podcast (full media platform), and Wife Supply Co (AI gifting application). Contact: sales@preissertech.com or +1-620-352-3296.",
    },
    {
      question: "Where is Preisser Tech located?",
      answer:
        "Preisser Tech is headquartered in Hays, Kansas (Ellis County, ZIP 67601). The firm serves businesses throughout Kansas, the Great Plains region, and select remote clients nationally. Tyler is based locally — in-person engagements within driving distance of Hays, video calls and remote collaboration otherwise.",
    },

    // ============ SERVICES ============
    {
      question: "What services does Preisser Tech offer?",
      answer:
        "Five tightly coupled service lines: (1) custom websites built from scratch in modern frameworks, (2) full-stack web applications including portals and internal tools, (3) business process automation systems, (4) custom AI agents trained on a business's specific context, and (5) real-time business dashboards. We mix and match across services as a project requires.",
    },
    {
      question: "Does Preisser Tech use templates or page builders?",
      answer:
        "No. Every Preisser Tech project is custom-coded from scratch in modern frameworks (Next.js, React, TypeScript). We do not build on Wix, Squarespace, GoDaddy site builders, or WordPress page builders like Elementor or Divi. The firm's positioning is premium custom development, not template configuration.",
    },
    {
      question: "Does Preisser Tech offer managed IT or helpdesk services?",
      answer:
        "No. Preisser Tech does not run helpdesk, manage Microsoft 365 administration, sell hardware, or provide ongoing infrastructure support. The firm specializes in building custom software — not running IT operations. For managed IT in Kansas, an MSP like Adams Brown Technology Specialists or another local provider is the right call.",
    },
    {
      question:
        "Does Preisser Tech build mobile apps?",
      answer:
        "Preisser Tech builds responsive web applications that work on every mobile device through a browser, and progressive web apps (PWAs) where appropriate. Native iOS or Android app development is not the firm's primary specialty — for use cases that require native apps, we'll either scope it carefully or refer the work to a native-app specialist.",
    },
    {
      question: "What technologies does Preisser Tech use?",
      answer:
        "Primarily Next.js (React 19, App Router), TypeScript, Tailwind CSS, and modern animation libraries (GSAP, Framer Motion). Sites deploy to Cloudflare Pages or Vercel. Backend integrations use serverless functions or modern APIs. AI work uses leading LLM frameworks. The stack is chosen for performance, maintainability, and long-term viability.",
    },
    {
      question:
        "Can Preisser Tech rebuild or fix an existing broken website?",
      answer:
        "Yes. Preisser Tech regularly takes over broken, outdated, or underperforming sites — from any prior platform or agency. The first step is a free site audit covering performance, SEO, structured data, and conversion design. Based on root cause, we recommend either a targeted repair or a full rebuild.",
    },

    // ============ ENGAGEMENTS ============
    {
      question: "How does a Preisser Tech engagement work?",
      answer:
        "Every engagement starts with a free 30-60 minute scoping call with Tyler — what you're trying to accomplish, what's broken, what success looks like. Tyler then writes a fixed-price proposal with clear scope and timeline. After approval, Tyler builds directly with weekly working previews, ships the project, and provides 30 days of post-launch support included.",
    },
    {
      question: "Will I work directly with Tyler Preisser?",
      answer:
        "Yes. There are no project managers, account executives, or junior associates filtering communication. Tyler scopes, designs, codes, and ships every engagement personally. Clients have direct email and phone access to the founder for the entire build.",
    },
    {
      question: "Do I own the source code?",
      answer:
        "Yes. Source code for custom-built websites, applications, agents, and automation is delivered to the client at project completion. There's no vendor lock-in, no platform dependency, and no recurring license fee for the code itself. You can host it anywhere, edit it later, or hand it to another developer.",
    },
    {
      question:
        "Does Preisser Tech subcontract or use offshore developers?",
      answer:
        "No. Tyler personally codes every engagement. There are no subcontractors, no offshore handoffs, and no white-labeled agency products. This is a deliberate operating choice — it keeps quality consistent, communication direct, and timelines predictable.",
    },
    {
      question: "What does post-launch support look like?",
      answer:
        "Every Preisser Tech project includes 30 days of post-launch support at no additional cost — bug fixes, content adjustments, monitoring, and any issues that surface after going live. After 30 days, clients can choose an ongoing maintenance retainer for continued updates, content additions, performance monitoring, and security patching.",
    },

    // ============ PRICING & TIMELINES ============
    {
      question: "How much does Preisser Tech charge?",
      answer:
        "Pricing depends on project scope. Custom websites typically start in the low thousands and scale based on pages, features, and integrations. Web applications and automation systems are scoped per project. Because Tyler delivers directly without agency overhead, pricing is significantly more efficient than comparable boutique agencies. Email sales@preissertech.com for a free estimate.",
    },
    {
      question: "Are projects fixed-price or hourly?",
      answer:
        "Fixed-price for the vast majority of engagements. After the scoping call, Tyler writes a written proposal with a clear scope, deliverables, and total price. Clients know the number before they commit. Hourly engagements are reserved for genuinely open-ended consulting work where fixed scoping isn't possible.",
    },
    {
      question: "How long does a custom website take to build?",
      answer:
        "Most websites launch within 3-8 weeks of project kickoff. A focused marketing site can deliver in 3-4 weeks. Sites with complex integrations, custom features, or extensive content can run 6-8 weeks. Tyler provides a fixed timeline at proposal time.",
    },
    {
      question: "How long does a web application take to build?",
      answer:
        "Web applications vary widely. A focused internal tool or client portal can deliver in 6-10 weeks. Complex apps with substantial business logic, multiple integrations, and custom workflows can run 3-6 months. Tyler scopes the timeline at proposal stage based on actual requirements.",
    },
    {
      question: "Do you require a deposit?",
      answer:
        "Yes. Standard structure is a deposit at project kickoff and a final payment at launch — for larger engagements, milestone payments are scheduled across the build. Specific terms are written into the proposal so there are no surprises.",
    },

    // ============ LOCATION & AVAILABILITY ============
    {
      question: "Does Preisser Tech serve clients outside Kansas?",
      answer:
        "Yes. While Preisser Tech is based in Hays, Kansas and concentrates on Kansas businesses, the firm regularly takes on remote engagements throughout the United States. All work is conducted directly with Tyler via video calls, shared project management, and scheduled in-person travel for major engagements where it adds value.",
    },
    {
      question: "Can Tyler meet in person?",
      answer:
        "Yes — within reasonable driving distance of Hays, Kansas, in-person meetings are standard. Tyler regularly meets with clients in Hays, Wichita, Salina, Garden City, and across western Kansas. For more distant clients, in-person travel is scheduled when it adds value to the engagement.",
    },
    {
      question: "What industries does Preisser Tech serve?",
      answer:
        "Delivered work spans HVAC and home services (Cassidy HVAC), oil and gas operations (HG Oil Holdings), media and podcasting (Iron and Oak Podcast), and AI applications (Wife Supply Co). The firm regularly works with home service operators, oilfield companies, healthcare clinics, insurance and financial firms, manufacturers, and ag businesses across Kansas.",
    },
    {
      question: "How do I get started?",
      answer:
        "Email sales@preissertech.com or call +1-620-352-3296. Tyler personally responds to every inquiry — there's no sales team filtering messages. The first conversation is free, low-pressure, and focused on understanding what you actually need built.",
    },
    {
      question: "What's the best way to reach Tyler?",
      answer:
        "Email at sales@preissertech.com is fastest. Phone calls to +1-620-352-3296 also reach Tyler directly. The contact form at preissertech.com routes to the same inbox. Most inquiries get a personal response within a business day.",
    },
  ],
  schemaType: "FAQPage",
  namedEntities: [
    "Preisser Tech",
    "Tyler Preisser",
    "Hays, Kansas",
    "Ellis County",
    "Fort Hays State University",
    "Cassidy HVAC",
    "HG Oil Holdings",
    "Iron and Oak Podcast",
    "Wife Supply Co",
    "Helios-Preisser GmbH",
    "Adams Brown Technology Specialists",
    "Next.js",
    "React",
    "TypeScript",
    "Cloudflare Pages",
  ],
  relatedLinks: [
    { label: "About Preisser Tech", href: "/preisser-technology" },
    { label: "About Tyler Preisser", href: "/tyler-preisser" },
    { label: "Pricing Approach", href: "/pricing" },
    { label: "Engagement Process", href: "/process" },
    { label: "Custom Website Development", href: "/custom-websites" },
    { label: "Web Application Development", href: "/web-applications" },
    { label: "Business Automation Systems", href: "/business-automation" },
    { label: "AI Agent Development", href: "/ai-agents" },
    { label: "Dashboards & Analytics", href: "/dashboards-and-analytics" },
  ],
  ctaHeadline: "Question not answered?",
  ctaSubcopy:
    "Email sales@preissertech.com or call +1-620-352-3296. Tyler responds personally — usually within a business day.",
};
