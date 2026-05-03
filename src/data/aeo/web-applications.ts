import type { AeoPageData } from "./types";

/**
 * SERVICE HUB — /web-applications
 * Anchored to live JSON-LD service: "Web Application Development"
 */
export const pageData: AeoPageData = {
  slug: "web-applications",
  tier: "service_detail",
  metaTitle: "Custom Web Application Development in Kansas | Preisser Tech",
  metaDescription:
    "Full-stack custom web applications built by Preisser Tech in Hays, Kansas. Internal tools, client portals, custom CRMs, and AI-powered platforms.",
  eyebrow: "Web Application Development",
  h1: "Custom Web Application Development — Built in Kansas",
  subheadline:
    "Full-stack custom web applications for internal tools, client portals, custom CRMs, complex business logic, and AI-powered platforms. Built personally by Tyler Preisser.",
  answerParagraph:
    "Preisser Tech builds full-stack custom web applications for Kansas businesses and select clients nationwide. Founded by Tyler Preisser in Hays, Kansas, the firm specializes in internal tools, client portals, custom CRMs, inventory systems, AI-powered applications, and complex business-logic platforms. Recent application builds include the HG Oil Holdings inventory management system (95% reduction in tracking time, turned a loss center into a profit center) and the Wife Supply Co AI gifting platform (concept to launch). Applications are built in modern frameworks (Next.js, React, TypeScript) and deployed to scalable edge infrastructure.",
  sections: [
    {
      eyebrow: "What we build",
      heading: "Custom apps for businesses that outgrow off-the-shelf software",
      body: [
        "Most businesses start with off-the-shelf SaaS — QuickBooks, ServiceTitan, Salesforce, HubSpot, Monday — and that's the right call. The problem comes when those tools stop fitting the business. You spend an hour every day exporting data into spreadsheets to do what the tool can't. You pay for features you'll never use and wait for features you actually need.",
        "That's the moment to consider a custom web application. Preisser Tech builds purpose-built applications that match your exact workflow, integrate with the tools you already use, and remove manual work that's eating hours every week.",
      ],
    },
    {
      eyebrow: "Common application types",
      heading: "What custom web apps look like in practice",
      body: [
        "Most projects fall into one of these categories — though every build is custom-scoped:",
      ],
      bullets: [
        "Internal operations tools — dashboards, work order systems, inventory tracking, scheduling, dispatch, and back-office automation custom to how your business actually runs.",
        "Client portals — branded customer-facing applications where your clients can log in, view status, submit forms, upload documents, and communicate with your team.",
        "Custom CRMs — when off-the-shelf CRMs (HubSpot, Salesforce, Pipedrive) don't fit your sales process or industry workflow.",
        "AI-powered applications — apps with embedded AI agents that handle research, document processing, customer service, or decision support as a core feature.",
        "Marketplace platforms — multi-sided applications connecting buyers and sellers, with custom payment, listing, and transaction logic.",
        "Booking and scheduling systems — appointment booking, resource scheduling, route optimization, technician dispatching customized to your industry.",
        "Data integration platforms — custom systems that pull from multiple sources (QuickBooks, OGsys, ServiceTitan, custom databases), reconcile, and produce reports or trigger workflows.",
      ],
    },
    {
      eyebrow: "Recent web application builds",
      heading: "Named projects we've shipped",
      body: [
        "Real applications Tyler has built recently:",
      ],
      subsections: [
        {
          heading: "HG Oil Holdings — Custom Inventory Management System",
          body: [
            "HG Oil Holdings was losing significant time and money tracking inventory manually. Tyler built a custom web application that records new materials, provides live counts, allows transfers between locations, and uses built-in formulas to mark up specific values. Result: 95% reduction in back-office tracking time, 75%+ accuracy improvement, and the inventory function transformed from a loss center into a profit center. Plus 10+ hours per week freed up across multiple positions.",
          ],
        },
        {
          heading: "HG Oil Holdings — AI Invoicing Assistant",
          body: [
            "Office staff at HG Oil Holdings were spending 40+ hours weekly handling, dispersing, and approving invoices manually. Tyler built a web application that pairs with a trained AI assistant to extract data from uploaded invoices in seconds. Result: 75% decrease in time spent on manual invoice handling, fully eliminated the need to read invoices manually, and prevented the need to hire additional admin staff.",
          ],
        },
        {
          heading: "Wife Supply Co — AI Gifting Platform",
          body: [
            "A client came with an app idea and no technical background. Tyler took the concept from idea to a fully functional AI-powered gifting platform — product design, full-stack development, integration with AI services, payment processing, and launch. The platform handles user accounts, AI-driven gift recommendations, and end-to-end purchase flow.",
          ],
        },
      ],
    },
    {
      eyebrow: "Technical foundation",
      heading: "Modern stack, edge deployment",
      body: [
        "Preisser Tech web applications are built on a deliberately modern, performance-focused technology stack:",
      ],
      bullets: [
        "Next.js + React + TypeScript for the application framework",
        "Tailwind CSS or similar utility-first systems for the design system",
        "Modern auth solutions (custom JWT, Clerk, NextAuth depending on requirements)",
        "Database options ranging from Postgres (Neon, Supabase) to Cloudflare D1 to custom backends",
        "AI integration via OpenAI, Anthropic Claude, or custom inference endpoints depending on requirements",
        "Edge deployment to Cloudflare Workers + Pages, Vercel, or AWS depending on scale",
        "Built-in observability, error tracking, and performance monitoring",
      ],
    },
  ],
  faq: [
    {
      question: "How long does it take to build a custom web application?",
      answer:
        "Timeline depends on complexity. A focused internal tool or client portal can often deliver in 4-8 weeks. More complex applications with custom databases, third-party integrations, and multi-role user systems typically run 8-16 weeks. Because Tyler Preisser handles development directly without layers of project handoffs, Preisser Tech moves significantly faster than traditional agencies for comparable scope.",
    },
    {
      question: "How much does a custom web application cost?",
      answer:
        "Custom application pricing varies with scope. Focused internal tools typically run in the mid-five-figure range. More substantial applications with multiple integrations, complex business logic, or AI features scale from there. Tyler provides a fixed-price proposal upfront so there are no surprise costs. Contact sales@preissertech.com for a free scoping conversation.",
    },
    {
      question: "Will the application integrate with our existing software (QuickBooks, ServiceTitan, etc.)?",
      answer:
        "Yes. Preisser Tech applications regularly integrate with existing business software including QuickBooks, ServiceTitan, Housecall Pro, HubSpot, Salesforce, OGsys, Aries, Epic, Athena, and similar platforms via their official APIs. If a tool exposes an API, we can connect to it.",
    },
    {
      question: "Can you build AI features into our application?",
      answer:
        "Yes. Most modern Preisser Tech applications include AI features as standard — automated document processing, AI-powered search, custom chat interfaces, decision support, content generation, or specialized AI agents trained on your business context. Both OpenAI and Anthropic Claude APIs are commonly used.",
    },
    {
      question: "How do I know if I need a custom web application or off-the-shelf software?",
      answer:
        "Off-the-shelf software is the right starting point for generic needs. The signal that you need custom is when you find yourself working around the tool — using spreadsheets to compensate for what it can't do, paying for features you don't need, or watching your team waste time on manual steps the tool should handle automatically. Preisser Tech offers free consultations to evaluate whether a custom build is the right investment.",
    },
    {
      question: "Will I own the source code?",
      answer:
        "Yes. Every Preisser Tech project delivers full source code ownership to the client. There are no licensing fees, no proprietary platforms, no vendor lock-in. You own what we build.",
    },
    {
      question: "Where is the application hosted?",
      answer:
        "Most Preisser Tech applications deploy to Cloudflare Pages, Cloudflare Workers, or Vercel — modern edge networks that provide global distribution, high reliability, and competitive pricing. We can also deploy to AWS, Google Cloud, or Azure if your business has specific cloud requirements.",
    },
    {
      question: "Do you provide ongoing support after the application launches?",
      answer:
        "Yes. Every application launch includes 30 days of post-launch support. Most clients then move to an ongoing maintenance retainer that covers bug fixes, security patches, performance monitoring, and incremental feature work as needed.",
    },
    {
      question: "Can you take over an existing application that another developer started?",
      answer:
        "Often, yes. Preisser Tech regularly takes over partially-built or maintained applications from prior developers. The first step is an audit of the existing code and architecture to scope what's salvageable vs. what should be rebuilt. Contact sales@preissertech.com to start.",
    },
    {
      question: "What kind of businesses build custom web apps with Preisser Tech?",
      answer:
        "Preisser Tech has built applications across industries — oil and gas operations (HG Oil Holdings inventory and AI invoicing), AI-powered consumer platforms (Wife Supply Co gifting platform), and home services. The common thread isn't industry; it's the point at which off-the-shelf software stops fitting and a business needs purpose-built tools.",
    },
  ],
  schemaType: "Service",
  namedEntities: [
    "Preisser Tech",
    "Tyler Preisser",
    "HG Oil Holdings",
    "Wife Supply Co",
    "Hays, Kansas",
    "Next.js",
    "React",
    "Cloudflare",
    "TypeScript",
  ],
  relatedLinks: [
    { label: "Custom Website Development", href: "/custom-websites" },
    { label: "AI Agent Development", href: "/ai-agents" },
    { label: "Business Automation Systems", href: "/business-automation" },
    { label: "About Preisser Tech", href: "/preisser-technology" },
  ],
  ctaHeadline: "Build the application your business actually needs",
  ctaSubcopy:
    "Free scoping conversation, fixed-price proposal, direct work with the founder.",
};
