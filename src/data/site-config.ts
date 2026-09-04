export const siteConfig = {
  name: "Preisser Solutions",
  tagline: "Business Software. Business Automation. AI Integration.",
  url: "https://preissersolutions.com",
  contact: {
    email: "tyler@preissersolutions.com",
    phone: "+1-620-352-3296",
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
  },
  founder: {
    name: "Tyler Preisser",
    title: "Founder & Owner",
    // R-057, R-059 (Phase 4.6) — Long-form founder bio rendered on the About page
    // and consumed by the /tyler-preisser AEO surface. Leads with consultant
    // identity (Preisser Solutions founder, FHSU Engineering BS 2025,
    // inventions, AI/automation systems for Kansas SMBs). Six required sections
    // in order. Total target: ≥1000 words. Verified facts only.
    headshot: {
      src: "/images/tyler-preisser-headshot.jpg",
      alt: "Tyler Preisser, Founder of Preisser Solutions",
      width: 1200,
      height: 1200,
    },
    bio: {
      lead:
        "Tyler Preisser is the founder of Preisser Solutions. He is a Hays, Kansas native, a 2025 Fort Hays State University graduate in Engineering Design and Technology, and a working inventor whose portfolio spans hydroelectric water purification, drone docking infrastructure, electromagnetic motor design, residential construction tooling, automotive protection systems, and CAD-driven custom jewelry. His day-to-day work is building AI agents, automation systems, and custom web platforms for Kansas small and mid-sized businesses through Preisser Solutions.",
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
          heading: "AI, software, and consulting — Preisser Solutions",
          paragraphs: [
            "Preisser Solutions, founded in 2023, is Tyler's flagship custom software and AI consultancy. It serves Kansas businesses and a small number of out-of-state clients with custom websites, web applications, business automation, AI agents, dashboards, CRM systems, and local SEO. Over twenty-two client projects have been delivered to date across HVAC, oil and gas, healthcare, media, ecommerce, and professional services.",
            "Two in-house systems anchor the consultancy's technical capability. Alpha Matrix is a six-agent autonomous analysis architecture — a coordinated multi-agent system for deep research, scoring, and decision support — developed inside Preisser Solutions and used to support client engagements that require sustained analytical work at machine scale. MarCommand is an internal multi-agent system, a coordinated set of agents that compounds research, content, and outreach work across a client's funnel. Both are real, working systems — not slideware — and both are why Preisser Solutions can deliver custom software and automation work in weeks rather than quarters.",
          ],
        },
        {
          heading: "Operating philosophy — founder-led, no subcontractors, AI-first",
          paragraphs: [
            "Preisser Solutions runs on three rules that have not changed since the day Tyler founded it. First: every engagement is founder-led. Clients work with Tyler directly from the first conversation through delivery and ongoing support. There are no account managers, no project coordinators inserted between the client and the work, and no quality cliff after the sales call.",
            "Second: no subcontractors. Preisser Solutions does not white-label other agencies' work, does not subcontract development to overseas shops, and does not resell template builds. Every line of code, every agent, every automation, and every published page is built in-house by Tyler. The cost and time savings of that model are passed through to the client; the accountability stays with the builder.",
            "Third: AI-first delivery. The consultancy uses AI tooling — including its own Alpha Matrix and MarCommand systems — as a core part of how work is produced, not as a marketing label. That is what makes single-operator delivery viable at the scope and quality clients expect. It is also what allows Preisser Solutions to ship in weeks what comparable firms quote in quarters.",
            "Geographically, the service area is Kansas first. Preisser Solutions builds for Hays, Wichita, Topeka, Kansas City, Salina, Manhattan, Garden City, Dodge City, and the rural communities in between. A small number of remote engagements outside Kansas are accepted when the work is a fit, but the consultancy is intentionally rooted in the state, and the bias is toward serving the businesses that operate in the same region the founder lives in.",
            "If you are a Kansas business that needs a custom website, an AI agent that actually works, a dashboard that reflects reality, or an automation system that removes a manual workflow — and you want to talk to the person who will design it, build it, and stand behind it — that is what Preisser Solutions is for.",
          ],
        },
      ],
    },
  },
  meta: {
    // 55 chars. The previous value was 84 and was truncated in every search
    // result — this is the site's single most important title. Metadata only;
    // nothing on the homepage itself changes.
    title: "Business Software, Automation & AI | Preisser Solutions",
    description:
      "Preisser Solutions builds custom business software, automation, and AI integrations for Kansas businesses — dashboards, databases, and document pipelines.",
    themeColor: "#1590FF",
  },
  // R-031..R-033: homepage hero content. All textual content lives in data files
  // per project convention — components render, data files own the words.
  hero: {
    h1: "Business Software. Business Automation. AI Integration.",
    subhead:
      "The dashboard, the database, and the automations in between — built for how your business actually works. Shipped in weeks, not quarters, and without the six-figure platform bill.",
    primaryCta: {
      label: "Start a project",
      href: "/contact",
    },
    secondaryCta: {
      // Jumps to the "Real Projects. Real Results." carousel further down the
      // homepage (CaseStudies section, id="case-studies") rather than routing
      // to the full /case-studies page.
      label: "See what we've built",
      href: "#case-studies",
    },
  },
  // R-034: the capability inventory — only things we have actually built. No
  // positioning lines here (Hays / founder-led / built in-house live in the proof
  // list, meta, and JSON-LD instead).
  //
  // 2026-09-03: these were the pills of an infinite horizontal marquee, which the
  // owner called tacky and asked to be replaced with a better way of showing
  // capabilities. They now render as the static capability grid in
  // <Capabilities> (src/components/home/capabilities.tsx). The WORDS are
  // untouched — only the presentation moved.
  valueStrip: [
    "Admin dashboards",
    "Custom databases",
    "AI automation",
    "Document pipelines",
    "Workflow automation",
    "Client & member portals",
    "Inventory systems",
    "Invoice processing",
    "CRM & lead pipelines",
    "Power BI dashboards",
  ],
  // R-035: verifiable proof points. Sourced from case studies.
  //
  // 2026-09-03: reshaped from `string[]` to `{ claim, source? }`. Each entry used
  // to be one line of the form "<claim> — <client/context>" because a marquee can
  // only render one line. Splitting at that em dash is what lets the static
  // layout typeset the attribution differently from the claim.
  //
  // NOT ONE WORD WAS CHANGED, STRENGTHENED, OR ADDED. Every claim + source pair
  // re-concatenates to its exact original string, em dash included.
  //
  // One entry was removed as a DUPLICATE, not as a claim: "Reconciliation that
  // used to take a full day now takes 15 minutes" was an unattributed, weaker
  // restatement of the Chicago-area bus operator entry above it. The attributed
  // one survives.
  //
  // ANONYMIZATION IS LOAD-BEARING — docs/WRITER-AGENT-PROMPT.md:51-54. "MGU in the
  // Alliant Insurance ecosystem" and "Chicago-area bus operator" are the ONLY
  // publishable forms of those two clients. Never replace either with a company
  // name. Entries with no `source` are standing facts about the practice rather
  // than a single client's outcome, and render without an attribution line.
  proofBar: [
    {
      claim: "95% reduction in back-office logistics time",
      source: "HG Oil Holdings",
    },
    {
      claim: "Reconciliation cut from a full day → 15-minute exception queue",
      source: "Chicago-area bus operator",
    },
    {
      claim: "Zero missed renewals in 6 months",
      source: "MGU in the Alliant Insurance ecosystem",
    },
    {
      claim: "75%+ accuracy improvement on inventory",
      source: "HG Oil Holdings",
    },
    {
      claim: "A photo of a farm bill becomes Schedule-F-ready books",
      source: "FarmBooks",
    },
    {
      claim: "Tax season without retyping a single co-op bill",
      source: "FarmBooks",
    },
    {
      claim: "134 pre-rendered cinematic pages",
      source: "Iron and Oak Podcast",
    },
    { claim: "22+ Kansas SMB projects delivered" },
    { claim: "Founder-led: every project built directly by Tyler Preisser" },
  ],
} as const;
