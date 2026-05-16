import type { AeoPageData } from "../types";

/**
 * SERVICE PAGE — /services/business-automation-hays-ks
 *
 * Target query: "business automation Hays KS" and variants.
 * Local twin of the /business-automation umbrella page, scoped for Hays and
 * western Kansas SMBs that are bleeding hours on manual admin work.
 */
export const pageData: AeoPageData = {
  slug: "services/business-automation-hays-ks",
  tier: "service_detail",
  metaTitle: "Business Automation in Hays, KS",
  metaDescription:
    "Custom business process automation for Hays, Kansas businesses — invoicing, forms, CRM updates, reporting, scheduling, and operations workflows.",
  eyebrow: "Business Automation in Hays, KS",
  h1: "Business Process Automation for Hays, Kansas Companies",
  subheadline:
    "Practical, custom automation for the manual work that eats hours every week — invoicing, follow-up, data entry, reporting, scheduling, and operations handoffs.",
  answerParagraph:
    "Preisser Solutions builds custom business automation for Hays, KS companies that have outgrown spreadsheets and copy-paste workflows. Founded by Tyler Preisser in Hays, the firm scopes, builds, and supports automation for invoicing, intake forms, CRM updates, reporting, scheduling, and the operations handoffs in between. Every project starts with a paid systems audit so the work targets real bottlenecks, not theoretical ones. Fixed price, plain-English scope, no monthly software subscription disguised as a service.",
  sections: [
    {
      eyebrow: "Why automation matters",
      heading: "When manual work becomes a tax on the business",
      body: [
        "Most Hays small and mid-sized businesses are not short on customers. They are short on hours. The owner or office manager spends ten to twenty hours a week on work that does not require judgment — re-typing invoice data, copying contact info between tools, building the same weekly report, chasing the same follow-up emails. That time is a tax. It does not show up on the P&L, but it caps how big the business can get without hiring.",
        "Business automation removes that tax. The work that used to take a person an hour either runs in the background, runs in seconds, or stops being necessary entirely because two tools that used to be disconnected now talk to each other.",
        "The right scope of automation is not 'automate everything.' It is automate the predictable, repeatable, judgment-free pieces, then leave humans in charge of the parts that need judgment. Preisser Solutions builds toward that line on purpose.",
      ],
    },
    {
      eyebrow: "What we build",
      heading: "What we automate for Hays businesses",
      body: [
        "Every automation engagement is scoped after a systems audit, so the exact work varies. The recurring categories below cover roughly 80% of what gets built for Hays and Kansas SMB clients.",
      ],
      bullets: [
        "Invoicing — auto-generated invoices from QuickBooks, Stripe, or a CRM, with PDF and email delivery and a tracked status that updates when payment hits",
        "Lead intake — website form submissions routed to the CRM, tagged by source, with instant SMS and email confirmation to the lead and an alert to the team",
        "CRM updates — automatic stage changes when a quote is sent, accepted, or paid; automatic note creation from call recordings; deduplication on import",
        "Reporting — weekly and monthly business reports built once and delivered automatically, replacing the recurring spreadsheet exercise",
        "Scheduling — calendar-aware booking flows, automatic confirmations, reminder sequences, and reschedule links — wired to the actual calendar",
        "Document handoffs — proposal, contract, and onboarding document generation triggered from the CRM, with signature capture",
        "Operations workflows — internal handoffs between sales, ops, and accounting that stop relying on someone remembering to send the email",
        "Reactivation — lapsed-customer SMS and email campaigns triggered by inactivity windows the business defines",
      ],
    },
    {
      eyebrow: "What we leave alone",
      heading: "What we leave to humans",
      body: [
        "Automation only works when the line between machine work and human work is drawn deliberately. Three categories are intentionally left to humans on every engagement: pricing conversations, scope debates, and anything that involves judgment about a real person's situation. A bot replying to a frustrated customer is worse than a slow human reply. A bot quoting a price on a job it cannot inspect is worse than no quote at all.",
        "Preisser Solutions designs the workflows so the human gets the right information at the right moment, then steps in to do the part only a human should do. The automation does the lookup, the data entry, the scheduling, and the routing. The owner or team does the conversation.",
      ],
    },
    {
      eyebrow: "Toolchain",
      heading: "Tools we connect for Hays clients",
      body: [
        "Most Hays businesses already have the right tools — they just are not talking to each other. Automation work usually means connecting what already exists, not replacing it. The recurring tools across Hays and Kansas clients include QuickBooks, Stripe, Google Workspace, Microsoft 365, HubSpot, Pipedrive, Monday, Notion, Airtable, Zapier, Make, Twilio, SendGrid, and ServiceTitan-style field-service platforms.",
        "When a connection between two tools does not exist out-of-the-box, Preisser Solutions builds the custom integration directly against the underlying API. Tyler is the engineer doing the build, so there is no handoff to a third-party developer and no surprise discovery that 'that integration is not supported.' The HG Oil case study documents that pattern at 95% data sync improvement and 75% time saved by replacing manual entry with a tracked, audited connection between systems.",
      ],
    },
    {
      eyebrow: "How projects ship",
      heading: "How an automation engagement ships",
      body: [
        "Every project starts with a paid systems audit. Tyler maps the current workflows, identifies the highest-leverage targets, and writes a fixed-price proposal that lists exactly what will be automated, how the success will be measured, and when each piece ships. Most engagements are scoped in two-week sprints, with a working automation live at the end of each sprint instead of a quarterly waterfall delivery.",
        "Support after launch is included for a defined period. Once the workflows are running, monthly retainer support is offered for businesses that want ongoing iteration — but it is not required. Plenty of clients get a sprint of work done, run it for a year unchanged, and come back when the next bottleneck appears.",
      ],
    },
    {
      eyebrow: "Local examples",
      heading: "Examples for Hays and Kansas SMBs",
      body: [
        "A western Kansas service business with thirty trucks was losing two hours a day to manual job-completion data entry from paper tickets to QuickBooks. The fix was a mobile form that captured the same data in the field, pushed it to QuickBooks automatically, and produced the daily revenue report by 6 AM. Two hours a day became zero, and the daily revenue number became available a day earlier.",
        "A Hays-area professional services firm was sending the same five-document onboarding email manually to every new client, and missing a step roughly one in twenty times. The fix was a templated onboarding workflow triggered by a CRM stage change, with each document customized to the client's data. The five-document sequence still goes out — it is just now produced automatically, on time, every time, and signed back into the CRM when complete.",
        "Neither of those projects required ripping out the existing tools. The right answer was almost always to connect what already worked instead of forcing the team onto something new.",
      ],
    },
  ],
  faq: [
    {
      question: "What kinds of work can be automated for a Hays small business?",
      answer:
        "Anything that is predictable, repeatable, and does not require judgment. Invoicing, lead intake, follow-up, scheduling, document generation, reporting, data entry between systems, and operations handoffs are the most common targets. Pricing decisions, customer conversations, and case-by-case judgment stay with the human team on purpose.",
    },
    {
      question: "Do I need to replace my current software to automate?",
      answer:
        "Usually no. Most Hays businesses already have the right tools — they just are not connected. Preisser Solutions builds custom integrations between the systems already in place. Replacing software only happens when the current tool fundamentally cannot do what the business needs, and that conclusion comes from the audit, not from a sales pitch.",
    },
    {
      question: "How much does business automation cost in Hays?",
      answer:
        "The systems audit is a fixed price, usually in the low four figures. The automation build is scoped after the audit and is also fixed price — most projects land in the mid four figures to low five figures depending on how many workflows are in scope. There is no percentage of revenue, no monthly software lock-in, and no surprise add-on once the proposal is signed.",
    },
    {
      question: "Is this the same as buying a SaaS automation tool?",
      answer:
        "No. Off-the-shelf tools like Zapier and Make are useful when the workflow fits a generic template. The automation work Preisser Solutions ships is custom and built for the specific way the business actually operates. Where Zapier or Make is the right answer, that is what gets used — but it is configured and supported, not handed off as a DIY product.",
    },
    {
      question: "How fast can the first automation be live?",
      answer:
        "After the audit, the first sprint usually delivers a working automation in two to three weeks. Larger engagements ship additional sprints in two-week increments after that. The goal is real value live in the business in the first month, not a six-month enterprise rollout.",
    },
    {
      question: "Do you support the automation after it ships?",
      answer:
        "Yes. Every project includes a defined post-launch support window. Beyond that, a flat monthly retainer is available for businesses that want ongoing iteration and new automation work. The retainer is optional, not a condition of the build.",
    },
  ],
  schemaType: "Service",
  namedEntities: [
    "Preisser Solutions",
    "Tyler Preisser",
    "Hays, Kansas",
    "Ellis County",
    "QuickBooks",
    "Stripe",
    "HubSpot",
    "Zapier",
    "Make",
    "ServiceTitan",
  ],
  relatedLinks: [
    { label: "Business Automation Overview", href: "/business-automation" },
    { label: "AI Automation in Hays, KS", href: "/services/ai-automation-hays-ks" },
    { label: "Use Case: Automate Data Entry", href: "/use-cases/automate-data-entry-small-business" },
    { label: "Use Case: Automate Invoice Processing", href: "/use-cases/automate-invoice-processing-small-business" },
    { label: "Contact Preisser Solutions", href: "/contact" },
  ],
  ctaHeadline: "Get a free automation audit for your Hays business",
  ctaSubcopy:
    "Tyler will map your current workflows, identify the highest-leverage targets, and send a fixed-price proposal — no monthly software subscription required.",
};
