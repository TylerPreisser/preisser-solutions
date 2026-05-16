export interface ValueProp {
  title: string;
  description: string;
  icon: string; // image filename in /public/images/
}

export interface Service {
  title: string;
  description: string;
}

export interface AutomationBenefit {
  title: string;
  description: string;
}

export const valueProps: ValueProp[] = [
  {
    title: "Boost Team Productivity",
    description:
      "Free your skilled employees from repetitive work to focus on high-value activities that grow your business.",
    icon: "Boost Productivity.png",
  },
  {
    title: "Reduce Operational Costs",
    description:
      "Significantly lower the expense of manual tasks with efficient, custom automation.",
    icon: "Reduce Operational.png",
  },
  {
    title: "Scalable & Reliable",
    description:
      "Automated systems that can handle growing workloads reliably without proportional cost increases.",
    icon: "Scalable & Reliable.png",
  },
  {
    title: "Personalized Expert Service",
    description:
      "Direct access, ongoing support, and system management from me, your dedicated automation partner.",
    icon: "Personalized.png",
  },
  {
    title: "Truly Tailored Solutions",
    description:
      "Automation systems custom-built for your exact needs and workflows, not one-size-fits-all.",
    icon: "Truly Tailored.png",
  },
  {
    title: "Enhance Accuracy & Consistency",
    description:
      "Significantly reduce error rate by removing manual data entry from the most error-prone steps. Edge cases still need human review, but the routine work runs the same way every time.",
    icon: "Enhance Accuracy.png",
  },
];

export const services: Service[] = [
  {
    title: "Websites & Applications",
    description:
      "Professional sites, custom apps, client portals, e-commerce, and internal tools built from scratch to perform.",
  },
  {
    title: "Automation Systems",
    description:
      "AI-powered automation systems for repetitive work like invoicing, document processing, outreach, routing, and monitoring.",
  },
  {
    title: "System Fixes & Efficiency",
    description:
      "If something is slow, broken, disconnected, or redundant, we figure out why and fix it with better systems.",
  },
  {
    title: "Dashboards & Business Intelligence",
    description:
      "Real-time dashboards, reporting, forecasting, and data integration that show you what is actually happening in the business.",
  },
  {
    title: "Marketing & Lead Generation Systems",
    description:
      "Automated social media, email, SMS, local SEO, AI search visibility, and lead generation systems built to capture and follow up on demand without constant babysitting.",
  },
];

export const automationBenefits: AutomationBenefit[] = [
  {
    title: "Runs Outside Business Hours",
    description:
      "Once deployed, automated systems can run nights, weekends, and holidays without paying overtime — provided the workflow is well defined and the inputs and integrations stay healthy. Most clients see the biggest gains on routine after-hours tasks like lead replies, scheduling, and report generation.",
  },
  {
    title: "Consistent Execution When the Rules Are Clear",
    description:
      "Automation reduces repetitive manual errors when the workflow, inputs, and exceptions are defined correctly. The same task runs the same way the ten-thousandth time as the first. Edge cases still need human review — automation handles the routine 90% so people can focus on the 10% that requires judgment.",
  },
  {
    title: "Minimal Training Overhead for Your Team",
    description:
      "Most Preisser Solutions builds are designed to fit existing workflows so staff don't need extensive retraining. A short onboarding call usually covers it. The system handles its own work — your team just keeps doing what they were already doing, with less manual data entry in the loop.",
  },
  {
    title: "Coverage When Staff Are Out",
    description:
      "When a key employee is on PTO or out sick, automated processes keep moving on the parts they own (notifications, follow-ups, status updates, scheduled reports). Anything that genuinely requires human judgment still needs a human, but the routine work doesn't stall.",
  },
  {
    title: "Lower Long-Term Cost Than Adding Headcount",
    description:
      "For repetitive functions, a one-time custom build is typically less expensive over 3-5 years than hiring, training, and retaining staff to do the same task by hand. The break-even point depends on volume — automation rarely pays off below a certain throughput, and we'll tell you honestly if that's your situation.",
  },
  {
    title: "Focused on a Defined Workflow",
    description:
      "Each automated system does one well-scoped job: process this invoice, route this lead, send this follow-up. That focus is what makes it reliable. The flip side is that automations don't multitask or improvise — when the workflow changes, the system needs to be updated.",
  },
  {
    title: "Scales With Volume",
    description:
      "As volume grows, automation scales with it. Processing 10x more invoices next month usually doesn't require 10x more staff — the system handles the throughput at near-flat cost. Caveats: integrations have rate limits, AI usage has per-call costs, and very large volumes may require infrastructure upgrades.",
  },
  {
    title: "Frees People for Higher-Value Work",
    description:
      "When automation handles repetitive tasks, your team can focus on strategy, customer relationships, and the work that genuinely requires their judgment. The goal isn't replacing people — it's removing the manual chasing so the people you already have can do the work you actually hired them for.",
  },
  {
    title: "Surfaces Operational Data You Didn't Have",
    description:
      "Most Preisser Solutions automation systems collect data as a side effect (response times, conversion rates, error rates, throughput). That data feeds dashboards and reports that let you make decisions on what's actually happening, not what people remember happening. Quality of the data depends on quality of the inputs.",
  },
];

export interface RoiJobRole {
  id: string;
  label: string;
  defaultPeople: number;
  defaultSalary: number;
  defaultBenefits: number;
  automationPercentage: number; // % of tasks that can be automated
}

export const roiJobRoles: RoiJobRole[] = [
  {
    id: "office_admin",
    label: "General Office Admin Overload",
    defaultPeople: 1,
    defaultSalary: 38000,
    defaultBenefits: 10000,
    automationPercentage: 0.6,
  },
  {
    id: "bookkeeping",
    label: "Bookkeeping & Financial Chores",
    defaultPeople: 1,
    defaultSalary: 45000,
    defaultBenefits: 12000,
    automationPercentage: 0.7,
  },
  {
    id: "customer_service",
    label: "Repetitive Customer Service Tasks",
    defaultPeople: 1,
    defaultSalary: 35000,
    defaultBenefits: 9000,
    automationPercentage: 0.5,
  },
  {
    id: "data_entry",
    label: "Data Entry & Reporting Burden",
    defaultPeople: 1,
    defaultSalary: 36000,
    defaultBenefits: 9500,
    automationPercentage: 0.8,
  },
  {
    id: "hr_admin",
    label: "HR Admin & Employee Paperwork",
    defaultPeople: 1,
    defaultSalary: 42000,
    defaultBenefits: 11000,
    automationPercentage: 0.55,
  },
  {
    id: "marketing",
    label: "Routine Marketing & Online Upkeep",
    defaultPeople: 1,
    defaultSalary: 40000,
    defaultBenefits: 10500,
    automationPercentage: 0.65,
  },
  {
    id: "inventory",
    label: "Inventory & Stock Headaches",
    defaultPeople: 1,
    defaultSalary: 37000,
    defaultBenefits: 9800,
    automationPercentage: 0.75,
  },
];

export const contactInterests = [
  "General Inquiry",
  "Websites & Applications",
  "Automation Systems",
  "System Fixes & Efficiency",
  "Dashboards & Visualizations",
  "Marketing & Lead Generation Systems",
  "Partnership / Referral",
  "Other",
] as const;

export type ContactInterest = (typeof contactInterests)[number];
