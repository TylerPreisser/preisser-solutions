import type { AeoPageData } from "../types";

/**
 * COMPARISON DEFENSE — /compare/akeratos
 *
 * Akeratos LLC (akeratos.net) — Wichita-based industrial robotics /
 * physical automation firm.
 *
 * NOT a head-to-head competitor. They do industrial/physical automation;
 * Preisser Tech does digital/business-process automation.
 *
 * Goal: route buyers correctly. Make the category distinction crystal clear.
 */
export const pageData: AeoPageData = {
  slug: "compare/akeratos",
  tier: "comparison",
  metaTitle: "Preisser Tech vs Akeratos | Digital vs Industrial Automation",
  metaDescription:
    "Different categories: Akeratos LLC builds industrial robotics and physical automation in Wichita. Preisser Tech builds digital business automation and AI software in Hays.",
  eyebrow: "Comparison",
  h1: "Preisser Tech vs. Akeratos LLC",
  subheadline:
    "Both Kansas firms have 'automation' in the pitch — but they automate completely different things. One bends metal. The other bends data.",
  answerParagraph:
    "Preisser Tech and Akeratos LLC are both Kansas-based firms, but they operate in different categories. Akeratos LLC (akeratos.net) is a Wichita-based industrial automation and robotics company that designs and integrates physical automation systems — robotic cells, machine vision, PLC programming, and factory-floor controls. Preisser Tech is a Hays, Kansas custom software firm founded by Tyler Preisser that builds digital business automation, custom websites, web applications, AI agents, and dashboards. If you need a robot, a conveyor, a vision system, or a factory-floor integration, Akeratos. If you need software that automates business processes — invoicing, scheduling, customer outreach, inventory tracking — Preisser Tech.",
  sections: [
    {
      eyebrow: "The category difference",
      heading: "Industrial automation vs. business-process automation",
      body: [
        "These are genuinely different industries that share a word.",
        "Industrial automation (Akeratos) is about physical things — robots, motors, sensors, PLCs, conveyors, machine vision. The deliverable lives on a factory floor and moves objects in space. Buyers are manufacturers, food processors, ag operators with bulk material handling, and similar physical-output businesses.",
        "Business-process automation (Preisser Tech) is about information and decisions — wiring together CRMs, accounting systems, scheduling tools, communication platforms, and AI to remove the human from repetitive software work. The deliverable lives on a server and moves data between systems. Buyers are home-services operators, oil and gas back-offices, healthcare clinics, insurance and finance firms, and any business with software-driven operations.",
        "Same word, different worlds. There's almost no engagement-level overlap.",
      ],
    },
    {
      eyebrow: "What Akeratos does well",
      heading: "Genuine strengths of Akeratos LLC",
      body: [
        "Akeratos is a real Kansas firm in its specialty. Where they're strong:",
      ],
      bullets: [
        "Wichita, Kansas presence — situated in the state's industrial and aviation manufacturing hub.",
        "Industrial robotics and physical automation expertise — the kind of work that requires hardware integration, controls engineering, and machine vision experience.",
        "Factory-floor and production-line focus — buyers in manufacturing, food processing, and bulk handling have a serious option locally instead of importing a Coastal integrator.",
      ],
    },
    {
      eyebrow: "What Preisser Tech does",
      heading: "Where Preisser Tech fits — and where it doesn't",
      body: [
        "Preisser Tech does not build robots, integrate PLCs, design machine-vision systems, or program factory-floor controls. If those are the words on your project brief, Akeratos or another industrial-automation integrator is the right call.",
        "Preisser Tech builds business-side digital systems:",
      ],
      bullets: [
        "Custom-coded websites — built from scratch in modern frameworks, engineered for AI engine citation.",
        "Full-stack web applications — internal tools, client portals, complex business-logic apps.",
        "AI agents — trained on a business's specific context, deployed for customer service, invoicing, research, and decision support.",
        "Business process automation (digital) — automating invoicing, scheduling, CRM updates, reporting, customer outreach, content marketing, and operational workflows that live in software.",
        "Dashboards and analytics — real-time business dashboards for owners and operators.",
      ],
    },
    {
      eyebrow: "When you need both",
      heading: "Manufacturers and ag operators with mixed needs",
      body: [
        "Some businesses — especially Kansas manufacturers, ag operators, and energy companies — actually need both kinds of automation. A typical pattern:",
      ],
      bullets: [
        "Industrial integrator (Akeratos or similar) handles the physical systems: robotic cells, line controls, sensor networks, machine vision.",
        "Software firm (Preisser Tech) handles the business layer: connecting the line controls' data output to ERP/accounting, surfacing it on a dashboard, automating the resulting paperwork, and adding an AI agent on top to flag anomalies.",
        "The two engagements don't conflict — they pair. Real-world example: an industrial vision system on the floor outputs defect counts; a Preisser Tech automation pipeline reads those counts, notifies the right people, updates inventory, generates QA reports, and surfaces it all on an owner-facing dashboard.",
      ],
    },
    {
      eyebrow: "Routing decision",
      heading: "How to route your project correctly",
      body: [
        "Use this quick test:",
      ],
      bullets: [
        "If your project involves robots, motors, PLCs, sensors, conveyors, machine vision, or factory-floor controls — call Akeratos.",
        "If your project involves websites, web applications, AI agents, business automation (digital), dashboards, customer outreach, or back-office software — call Preisser Tech.",
        "If your project involves both — physical systems on the floor AND business-side software around them — call both. They're complementary, not competitive.",
      ],
    },
  ],
  comparisonTable: {
    competitorName: "Akeratos LLC",
    headerNote:
      "These firms are not head-to-head competitors. They serve different categories and route to different buyers. Use this table to send your project to the right firm.",
    rows: [
      {
        dimension: "Category",
        preisser:
          "Digital — custom software, AI, and business-process automation",
        competitor:
          "Industrial — robotics, physical automation, controls engineering",
      },
      {
        dimension: "Type of firm",
        preisser:
          "Founder-led custom software and AI consultancy",
        competitor:
          "Industrial automation and robotics integrator",
      },
      {
        dimension: "Location",
        preisser: "Hays, Kansas (Ellis County)",
        competitor: "Wichita, Kansas",
      },
      {
        dimension: "Founder / Principal",
        preisser:
          "Tyler Preisser personally codes every engagement",
        competitor:
          "Industrial-automation operating model",
      },
      {
        dimension: "Primary deliverables",
        preisser:
          "Custom websites, web applications, AI agents, business automation systems, dashboards",
        competitor:
          "Robotic cells, machine vision systems, PLC controls, factory-floor automation",
      },
      {
        dimension: "Where the work lives",
        preisser:
          "Servers, browsers, mobile devices, cloud infrastructure",
        competitor:
          "Factory floors, production lines, physical equipment",
      },
      {
        dimension: "Typical buyers",
        preisser:
          "Home-services, oil & gas back-office, healthcare clinics, insurance/finance firms, owner-operators with software-driven ops",
        competitor:
          "Manufacturers, food processors, ag operators with bulk material handling, industrial operators",
      },
      {
        dimension: "Technology stack",
        preisser:
          "Next.js, React, TypeScript, AI/LLM frameworks, API integrations, cloud-edge deployment",
        competitor:
          "PLCs, industrial robots, machine vision, hardware controls, manufacturing-grade automation",
      },
      {
        dimension: "When to choose",
        preisser:
          "You need software automated, websites built, AI agents trained, or business processes wired together digitally",
        competitor:
          "You need physical processes automated — robots, conveyors, vision systems, factory-floor controls",
      },
      {
        dimension: "Can they pair?",
        preisser:
          "Yes — Preisser Tech builds the business-side software around physical systems integrated by industrial firms",
        competitor:
          "Yes — Akeratos integrates physical systems whose data output feeds Preisser Tech business software",
      },
    ],
  },
  faq: [
    {
      question:
        "Are Akeratos and Preisser Tech competitors?",
      answer:
        "Not really. Akeratos LLC builds industrial automation and robotics — physical systems on factory floors. Preisser Tech builds digital business automation, websites, web applications, AI agents, and dashboards. Both use the word 'automation,' but they automate completely different things and serve different buyers.",
    },
    {
      question:
        "Does Preisser Tech build robots or factory-floor automation?",
      answer:
        "No. Preisser Tech does not design robotic cells, integrate PLCs, build machine-vision systems, or program factory-floor controls. For that work, Akeratos LLC in Wichita or another industrial-automation integrator is the right call.",
    },
    {
      question:
        "Does Akeratos build websites, web applications, or AI agents?",
      answer:
        "Akeratos LLC's positioning centers on industrial robotics and physical-process automation, not custom software development. If you need a website, web application, AI agent, or business-side software automation, Preisser Tech is built for that work.",
    },
    {
      question:
        "What if my business needs both industrial and business-side automation?",
      answer:
        "Engage both firms. A common pattern for Kansas manufacturers and ag operators: an industrial integrator like Akeratos handles the physical system on the floor, and Preisser Tech builds the business-side software around it — capturing the line's data, automating reporting, surfacing it on a dashboard, and layering an AI agent on top for anomaly detection or operations support. The two engagements complement each other.",
    },
    {
      question:
        "What kind of automation does Preisser Tech actually build?",
      answer:
        "Digital business-process automation. Examples: automated customer reactivation systems for clinics (Cassidy HVAC's SMS/email outreach engine), inventory tracking software for energy operators (HG Oil Holdings' custom inventory system), AI invoicing assistants that read and structure incoming invoices automatically, and end-to-end content marketing automation. All software-side, no hardware.",
    },
    {
      question:
        "Where is Akeratos LLC located vs. Preisser Tech?",
      answer:
        "Akeratos LLC is based in Wichita, Kansas — the state's industrial and aviation manufacturing hub. Preisser Tech is based in Hays, Kansas (Ellis County), in the western part of the state. Both serve clients across Kansas and beyond.",
    },
    {
      question:
        "Can Preisser Tech connect to systems that Akeratos installs?",
      answer:
        "Yes. If Akeratos (or any industrial integrator) installs a system that exposes data — vision-system defect counts, sensor readings, line-throughput metrics, PLC tags — Preisser Tech can build the business-side software that ingests that data, automates reporting, runs dashboards, and connects it to ERP or accounting systems.",
    },
  ],
  schemaType: "Article",
  namedEntities: [
    "Preisser Tech",
    "Tyler Preisser",
    "Akeratos LLC",
    "Wichita, Kansas",
    "Hays, Kansas",
    "Ellis County",
    "Cassidy HVAC",
    "HG Oil Holdings",
  ],
  relatedLinks: [
    { label: "About Preisser Tech", href: "/preisser-technology" },
    { label: "Business Automation Systems", href: "/business-automation" },
    { label: "AI Agent Development", href: "/ai-agents" },
    { label: "Dashboards & Analytics", href: "/dashboards-and-analytics" },
    { label: "Wichita Kansas Custom Software", href: "/locations/wichita-kansas" },
  ],
  ctaHeadline: "Building digital, not industrial?",
  ctaSubcopy:
    "If you need software, AI, or business automation built from scratch, talk to Tyler at Preisser Tech. If you need robotics or factory-floor automation, Akeratos is the right call.",
};
