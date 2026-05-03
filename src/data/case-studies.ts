export interface CaseStudyResult {
  highlight: string;
  text: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  title: string;
  subTitle: string; // mobile sub-title
  customHeader: string; // mobile custom header
  challenge: string;
  solution: string;
  results: CaseStudyResult[];
  ctaLabel: string;
  ctaHref: string;
  isYourCompany?: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "cassidy-social",
    client: "Cassidy HVAC",
    title:
      "Cassidy HVAC | Automated Social Media Engine",
    subTitle: "Social Media Automation",
    customHeader: "Automated Social Media Engine",
    challenge:
      "Cassidy HVAC was struggling with consistent outreach on social media. Their internal team had no time to plan, create, or post content regularly. Engagement was flat, brand visibility was declining, and no system existed to capitalize on trends or keep up with competitors — all while customers were active online and being captured elsewhere.",
    solution:
      "We deployed the Preisser Tech Proprietary Organic Marketing Automation system — a fully hands-free AI engine that automates daily social media content tailored to Cassidy HVAC's audience and goals. The system scrapes trending content, applies all of the top persuasive psychological concepts, auto-generates custom marketing visuals, and posts to Facebook and Instagram without requiring daily staff input. Everything routes through an optional email-based approval system — or can run fully autonomously.",
    results: [
      { highlight: "100% hands-off", text: "daily content creation & posting" },
      {
        highlight: "5x increase",
        text: "in organic reach within the first 30 days",
      },
      {
        highlight: "",
        text: "Replaced the need for outsourced or in-house marketing staff",
      },
      {
        highlight: "",
        text: "Triggered high-value engagements and inbound inquiries",
      },
      {
        highlight: "",
        text: "Fully scalable to other service areas or company branches",
      },
    ],
    ctaLabel: "Automate Your Marketing",
    ctaHref: "/contact",
  },
  {
    id: "cassidy-sms",
    client: "Cassidy HVAC",
    title:
      "Cassidy HVAC | AI-Driven Customer Reactivation",
    subTitle: "Automated SMS & Email Outreach",
    customHeader: "AI-Driven Customer Reactivation",
    challenge:
      "John C Cassidy was sitting on a large, inactive patient list — missing opportunities to re-engage past clients, promote services, and fill slow days. Office staff were manually sending reminders or offers, often inconsistently, and had no unified system to track replies, clicks, or conversions.",
    solution:
      "We implemented a fully automated SMS and email outreach engine that identifies outreach opportunities, uses ai to hyper personalize, and sends optimized messages based on behavioral triggers. The system integrates with their CRM, runs daily without input, and even auto-splits tests messages for higher response rates.",
    results: [
      {
        highlight: "60%+ reactivation",
        text: "of dormant patients within 6 weeks",
      },
      {
        highlight: "100% automation",
        text: "of promotional and reminder messages",
      },
      {
        highlight: "10+ hours/week",
        text: "saved in follow-ups and confirmations",
      },
      {
        highlight: "over 45%",
        text: "increased booking conversion rate",
      },
      { highlight: "", text: "Recovered thousands in missed appointment revenue" },
    ],
    ctaLabel: "Re-engage Your Customers",
    ctaHref: "/contact",
  },
  {
    id: "hg-oil-inventory",
    client: "HG Oil Holdings",
    title: "HG Oil Holdings | Automated Inventory Management",
    subTitle: "Inventory Management System",
    customHeader:
      "Live, Automated, User Friendly, Inventory Management System",
    challenge:
      "Excessive Man-Hours spent tracking down inventory when needed. No ability to view inventory or have a live count. Losing money on transportation and reconditioning costs.",
    solution:
      "I developed an automated easy to use one stop link to record new materials brought in, provide a live inventory and allow inventory transfers all the while using built in formulas to track and mark up specific values allowing HG Oil to turn a liability into a profit center.",
    results: [
      {
        highlight: "95% reduction",
        text: "in back office/logistics time spent tracking parts",
      },
      { highlight: "over 75%", text: "greatly improved accuracy" },
      { highlight: "", text: "Turned a loss into a profitable business" },
      {
        highlight: "10+ hours per week",
        text: "freed up across different positions",
      },
    ],
    ctaLabel: "We can do much more!",
    ctaHref: "/contact",
  },
  {
    id: "hg-oil-invoicing",
    client: "HG Oil Holdings",
    title: "HG Oil Holdings | AI Invoicing Assistant",
    subTitle: "AI Invoicing Assistant",
    customHeader: "AI-Powered Invoice Processing & Data Extraction",
    challenge:
      "Office staff with other tasks were overwhelmed spending 40+ hours a week handling, dispersing, analyzing and approving invoices.",
    solution:
      "We trained an Ai assistant with all neccessary data that allows employees to upload invoices and within seconds recieve the exact needed informaiton.",
    results: [
      {
        highlight: "75% decrease",
        text: "in time spent on manual invoice handling.",
      },
      { highlight: "Eliminates", text: "manually reading through Invoices" },
      { highlight: "", text: "Freed up office staff to tackle other greatly needed tasks" },
      { highlight: "", text: "Prevented managment from needing to hire additional staff" },
    ],
    ctaLabel: "Let us Prove our Value!",
    ctaHref: "/contact",
  },
  {
    id: "your-company",
    client: "Your Company!",
    title: "Your Company!",
    subTitle: "",
    customHeader: "",
    challenge: "",
    solution: "",
    results: [],
    ctaLabel: "Be the Next Success Story!",
    ctaHref: "/contact",
    isYourCompany: true,
  },
];

export const heroPainPoints = [
  "Do I really have to hire someone else just for that?",
  "I just can't find good, reliable help around here.",
  "Seems like nobody actually wants to work these days.",
  "Is it too much to ask for someone to just show up on time and do the job?",
  "Kids these days just don't want to work",
  "Good help is hard to find.",
  "Half the people wont even show up to the interview",
  "Nobody will stick around.",
  "The employee turnover rate is getting out of hand",
  "I feel like I'm running a daycare sometimes",
  "Another no-call, no-show",
  "I wish my employees care as much as I do.",
  "I wish people cared about more than just a paycheck.",
  "Why spend all the time training somebody if they're just going to leave in six months?",
  "All that effort getting them up to speed, just for them to walk out.",
  "I have to do everything myself if I want it done right",
  "I'll just have to go back and do it over anyway",
  "The amount of mistakes I have to catch... it's like a second job.",
  "I need things done right the FIRST time",
  "My best people are wasting their talent on these tedious tasks",
  "I should be out there finding new customers, not stuck here babysitting paperwork.",
  "I'm paying good money for skilled employees to do unskilled work half the time.",
  "I have to pick up all the slack when somebody takes vacation or calls in sick.",
  "If I'm not here, nothing gets done",
  "Just keeping track of everything is a constant battle.",
  "I just need things to run smooth.",
  "All I do is put out fires",
  "I don't want a bunch of new high tech software",
  "I don't want to have to learn a whole new system",
];
