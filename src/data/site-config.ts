export const siteConfig = {
  name: "Preisser Solutions",
  tagline: "AI-powered marketing for Kansas",
  url: "https://preissersolutions.com",
  contact: {
    email: "tyler@preissertech.com",
    location: "Hays, Kansas",
  },
  social: {
    // NOTE: URLs set in advance to canonical handles — once pages are created/renamed,
    // the JSON-LD sameAs array is immediately correct without a code deploy.
    linkedin: "https://www.linkedin.com/company/preissersolutions",
    facebook: "https://www.facebook.com/preissersolutions",
    twitter: "https://x.com/preissersolutions",
    github: "https://github.com/preissersolutions",
    crunchbase: "https://www.crunchbase.com/organization/preisser-solutions",
    linkedinPersonal: "https://www.linkedin.com/in/tyler-preisser",
    tylerPreisser: "https://tylerpreisser.com",
    rsquaredai: "https://rsquaredai.com",
  },
  founder: {
    name: "Tyler Preisser",
    title: "Founder & Owner",
    // R-057, R-059 (Phase 4.6) — Long-form founder bio rendered on the About page
    // and consumed by the /tyler-preisser AEO surface. Leads with consultant
    // identity (R Squared AI CPO, Preisser Solutions founder, FHSU Engineering
    // BS 2025, inventions, AI/automation systems for Kansas SMBs). Six required
    // sections in order. Total target: ≥1000 words. Verified facts only — every
    // claim here must be traceable to the master rebuild prompt.
    headshot: {
      src: "/images/tyler-preisser-headshot.jpg",
      alt: "Tyler Preisser, Founder of Preisser Solutions",
      width: 1200,
      height: 1200,
    },
    bio: {
      lead:
        "Tyler Preisser is the founder of Preisser Solutions and the Chief Product Officer of R Squared AI. He is a Hays, Kansas native, a 2025 Fort Hays State University graduate in Engineering Design and Technology, and a working inventor whose portfolio spans hydroelectric water purification, drone docking infrastructure, electromagnetic motor design, residential construction tooling, automotive protection systems, and CAD-driven custom jewelry. His day-to-day work is building AI agents, automation systems, and custom web platforms for Kansas small and mid-sized businesses through Preisser Solutions, and architecting product strategy at R Squared AI.",
      sections: [
        {
          heading: "Origin — Hays, Kansas",
          paragraphs: [
            "Tyler was born and raised in Hays, Kansas, in the agricultural and oil-producing corridor of western Kansas. Hays sits at the intersection of US-183 and Interstate 70 in Ellis County, surrounded by the wheat fields and rangeland of the High Plains and the Hugoton-Panhandle natural gas basin to the south. It is a market that runs on hard work, narrow margins, and personal trust — the kind of place where a handshake still closes a deal and a vendor's reputation travels faster than any marketing campaign.",
            "Growing up in this part of the state shaped how Preisser Solutions operates today. The businesses Tyler serves — independent HVAC operators, oil and gas holdings, rural healthcare practices, construction outfits, family-owned retailers — are the same kinds of businesses he grew up around. He understands the operational realities of running a business in a market where you cannot afford a six-month software project that ships late and over budget, where the owner is also the operator, and where most agency-style consulting feels like it was designed for someone else's economy.",
            "Hays is also home to Fort Hays State University, the regional research university where Tyler completed his engineering degree, and a growing technology and startup community that he is now an active part of. He has chosen to build his consultancy here on purpose: Kansas businesses deserve the same engineering, custom software, and AI work that coastal firms charge ten times the price for, delivered by a builder who actually lives in the same region they do.",
          ],
        },
        {
          heading: "Education — FHSU Engineering Design and Technology, 2025",
          paragraphs: [
            "Tyler graduated from Fort Hays State University in 2025 with a Bachelor of Science in Engineering Design and Technology. The program emphasizes applied engineering across mechanical, electrical, manufacturing, and product-development disciplines — design through prototyping, CAD-driven modeling, materials selection, and full lifecycle ownership of physical and digital products.",
            "During his time at FHSU, Tyler received the Hansen Hall scholarship, an FHSU-named award recognizing students with a track record of building and shipping work beyond the classroom. He also competed in the Faulkner Challenge, FHSU's flagship student startup competition, with the Sky Sprayers drone docking station project. The project — a docking and recharging infrastructure concept for agricultural spray drones — placed second in the Kansas Startup category, validating the engineering and the business case for autonomous ag infrastructure in the high plains.",
            "The Faulkner Challenge experience is one of several through-lines that connect Tyler's engineering education to his current work: take a hard, ambiguous problem; build a working prototype quickly; defend the design against people who know the domain; iterate. That cadence — research, build, ship, defend — is the same operating loop Preisser Solutions uses with software and AI clients today.",
          ],
        },
        {
          heading: "Industries — farming, aviation, oil field, and technology",
          paragraphs: [
            "Before founding Preisser Solutions, Tyler worked across industries that look, on the surface, like they have nothing in common: production agriculture, general aviation, oilfield services, and high-growth technology startups. In practice they share a great deal. All four are operationally complex, require precise execution under time pressure, and reward operators who can solve problems with their hands as well as with their heads.",
            "Farming taught him the rhythm of a business where the calendar is non-negotiable, equipment failure costs real money the same day it happens, and the spreadsheet has to match what is actually in the bin. Aviation taught him the discipline of checklists, redundancy, and the difference between a system that is convenient and a system that is safe. Oilfield work taught him how field operations actually run — pump jacks, lease roads, manual inventory, hauler logistics, and the importance of a simple dashboard that anyone in the field can read on a phone.",
            "Technology — the world he now spends most of his time in — taught him how the tools that automate all of the above are actually built. The combination is unusual: most software consultants have never set foot in a pumper's truck, and most field operators have never written a line of production code. Tyler has done both. That breadth is the reason Preisser Solutions can walk into a Kansas business, understand the workflow within an hour, and ship a working automation system in weeks rather than quarters.",
          ],
        },
        {
          heading: "Inventions — six working products across six industries",
          paragraphs: [
            "Tyler is an active inventor and product designer. His portfolio of original inventions reflects the same applied-engineering instinct that drives the consultancy: find a real-world problem, design a system that solves it, build a prototype, and prove it works. The six current projects span agriculture, aerospace, energy, construction, automotive, and consumer goods.",
          ],
          bullets: [
            "Bia AgTech — a hydroelectric water purification system designed to deliver clean water using locally available flow energy, targeted at agricultural and off-grid applications.",
            "Sky Sprayers — an autonomous drone docking and recharging station for agricultural spray drones, recognized with second place in the Kansas Startup category of FHSU's Faulkner Challenge.",
            "Electromagnetic Pulsation Motor — an original motor architecture exploring pulsed electromagnetic actuation as an alternative to conventional rotating-field designs.",
            "Roof Truss Optimization — a design and tooling system for residential roof truss configuration aimed at reducing material waste and accelerating framing in production homebuilding.",
            "Car Bubble — an automotive protection product that shields a parked vehicle from environmental damage in storage and outdoor conditions.",
            "Custom Jewelry CAD — a parametric CAD workflow for designing and manufacturing custom jewelry, bridging traditional jeweler craft with modern computer-aided manufacturing.",
          ],
        },
        {
          heading: "AI, software, and consulting — R Squared AI and Preisser Solutions",
          paragraphs: [
            "Tyler is the Chief Product Officer of R Squared AI, where he is responsible for product direction across the company's AI product line. The work at R Squared AI feeds directly into the consultancy: every AI agent architecture, evaluation framework, and deployment pattern Tyler validates at R Squared AI becomes available to Preisser Solutions clients as field-tested capability rather than theory.",
            "Preisser Solutions, founded in 2023, is Tyler's flagship custom software and AI consultancy. It serves Kansas businesses and a small number of out-of-state clients with custom websites, web applications, business automation, AI agents, dashboards, CRM systems, and local SEO. Over twenty-two client projects have been delivered to date across HVAC, oil and gas, healthcare, media, ecommerce, and professional services.",
            "Two in-house systems anchor the consultancy's technical capability. Alpha Matrix is a six-agent autonomous analysis architecture — a coordinated multi-agent system for deep research, scoring, and decision support — developed inside Preisser Solutions and used to support client engagements that require sustained analytical work at machine scale. MarCommand is a proprietary multi-agent marketing intelligence engine, a coordinated system of marketing-focused agents that compounds research, content, and outreach work across a client's funnel. Both are real, working systems — not slideware — and both are why Preisser Solutions can deliver AI-powered marketing and operations work in weeks rather than quarters.",
            "Tyler also operates a consumer media presence, Preisser Media, with a combined audience of more than 300,000 followers and over 30 million views across video platforms. That audience is separate from the consultancy's commercial work but informs the same underlying skill: building systems — content, distribution, automation — that compound over time.",
          ],
        },
        {
          heading: "Operating philosophy — founder-led, no subcontractors, AI-first",
          paragraphs: [
            "Preisser Solutions runs on three rules that have not changed since the day Tyler founded it. First: every engagement is founder-led. Clients work with Tyler directly from the first conversation through delivery and ongoing support. There are no account managers, no project coordinators inserted between the client and the work, and no quality cliff after the sales call.",
            "Second: no subcontractors. Preisser Solutions does not white-label other agencies' work, does not subcontract development to overseas shops, and does not resell template builds. Every line of code, every agent, every automation, and every published page is built in-house by Tyler. The cost and time savings of that model are passed through to the client; the accountability stays with the builder.",
            "Third: AI-first delivery. The consultancy uses AI tooling — including its own Alpha Matrix and MarCommand systems — as a core part of how work is produced, not as a marketing label. That is what makes single-operator delivery viable at the scope and quality clients expect. It is also what allows Preisser Solutions to ship in weeks what comparable firms quote in quarters.",
            "Geographically, the service area is Kansas first. Tyler builds for Hays, Wichita, Topeka, Kansas City, Salina, Manhattan, Garden City, Dodge City, and the rural communities in between. A small number of remote engagements outside Kansas are accepted when the work is a fit, but the consultancy is intentionally rooted in the state, and the bias is toward serving the businesses that operate in the same region the founder lives in.",
            "If you are a Kansas business that needs a custom website, an AI agent that actually works, a dashboard that reflects reality, or an automation system that removes a manual workflow — and you want to talk to the person who will design it, build it, and stand behind it — that is what Preisser Solutions is for.",
          ],
        },
      ],
    },
  },
  meta: {
    title: "Preisser Solutions | AI Automation, Websites & Local SEO in Kansas",
    description:
      "Preisser Solutions builds AI automation, custom websites, local SEO, web apps, dashboards, and AI search optimization systems for Hays and western Kansas businesses.",
    themeColor: "#0D95E8",
  },
  // R-031..R-033: homepage hero content. All textual content lives in data files
  // per project convention — components render, data files own the words.
  hero: {
    h1: "AI Automation, Custom Websites, and Local SEO in Hays, Kansas",
    subhead:
      "Preisser Solutions builds the systems behind modern small businesses: high-converting websites, local SEO, AI search visibility, CRM workflows, dashboards, and automations that reduce manual work and increase qualified leads.",
    primaryCta: {
      label: "Book a Business Systems Audit",
      href: "/contact?intent=audit",
    },
    secondaryCta: {
      label: "See Case Studies",
      href: "/case-studies",
    },
  },
  // R-034: trust / value strip. 8 pipe-separated items rendered as pill items
  // in the existing horizontal marquee.
  valueStrip: [
    "Hays, Kansas based",
    "Founder-led",
    "Websites",
    "Automation",
    "Local SEO",
    "Dashboards",
    "CRM Systems",
    "AI Search Optimization",
  ],
  // R-035: verifiable proof numbers. Sourced from case studies.
  proofBar: [
    { number: "22+", label: "projects completed" },
    { number: "95%", label: "inventory tracking reduction" },
    { number: "94%", label: "faster system workflow" },
    { number: "Kansas-first", label: "service area" },
  ],
} as const;
