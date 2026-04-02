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
      "Eliminate costly human errors in critical processes with systems that work perfectly, 24/7.",
    icon: "Enhance Accuracy.png",
  },
];

export const services: Service[] = [
  {
    title: "Efficiency & Bottleneck Analysis",
    description:
      "I personally conduct thorough deep dives into your current workflows to pinpoint critical bottlenecks and identify key areas for significant improvement and cost savings through automation.",
  },
  {
    title: "Custom Automation Systems",
    description:
      "Forget generic software. I design and build bespoke automation systems—from simple task automators to more complex workflow solutions—all tailored to your specific operational needs and personally managed by me.",
  },
  {
    title: "Back Office Automation Excellence",
    description:
      "Is your team bogged down by daily administrative duties? We automate essential back-office operations—from financial tasks and data organization to routine communications and reporting—freeing your skilled team to focus on core business growth and exceptional client service.",
  },
  {
    title: "Custom-Engineered Automated Assistants",
    description:
      "Imagine a digital assistant, engineered by me specifically for your business. These automated 'experts' can handle complex customer support inquiries, provide instant internal data retrieval, or manage and monitor key processes 24/7 with precision. (Everything we design is easy for anyone to use.)",
  },
  {
    title: "Online/Digital Presence & Optimization",
    description:
      "Ensure your business not only shows up online, but truly stands out and delivers results. We optimize your complete digital ecosystem—including your website's performance, targeted SEO optimization, automated social media engagement, and streamlined email marketing funnels—using custom-built systems to convert your online presence into a consistent engine for growth and client acquisition.",
  },
  {
    title: "Professional Website Development",
    description:
      "Need a new website or an upgrade to truly reflect your business? I build professional, responsive, and effective websites designed to capture leads and clearly communicate your value, all managed with the same personal attention to detail.",
  },
];

export const automationBenefits: AutomationBenefit[] = [
  {
    title: "Works Around the Clock",
    description:
      "Unlike employees, automated systems don't clock out. They run 24/7—nights, weekends, holidays—processing tasks and delivering results without interruption or overtime pay.",
  },
  {
    title: "Done Right, Every Time",
    description:
      "Automation follows exact rules, every single time. No bad days, no shortcuts, no missed steps. The same task executes the same way whether it's the first run or the ten-thousandth.",
  },
  {
    title: "Zero Training on Your End",
    description:
      "Once built and deployed, our systems require no training from your team. They simply work. No learning curve, no onboarding sessions, no user manuals to distribute.",
  },
  {
    title: "No Sick Days, No Vacations",
    description:
      "When a key employee is out, critical processes can stall. Automated systems have no absenteeism. Your operations continue smoothly regardless of staffing situations.",
  },
  {
    title: "More Cost-Effective Long-Term",
    description:
      "Compared to hiring, training, and retaining staff for repetitive functions, custom automation delivers consistent output at a fraction of the ongoing cost—and it only gets more efficient over time.",
  },
  {
    title: "Focused, Dedicated Performance",
    description:
      "Humans juggle multiple tasks and distractions. Automated systems are singularly focused. Each system does exactly what it was built to do—relentlessly and without distraction.",
  },
  {
    title: "Scales With Your Business",
    description:
      "As your volume grows, automation scales with it. Need to process 10x more invoices next month? The system handles it without hiring 10x more staff or paying overtime.",
  },
  {
    title: "Frees Human Talent",
    description:
      "Your people are your greatest asset. When automation handles the repetitive, your team can focus on strategy, relationships, and the creative work that actually grows the business.",
  },
  {
    title: "Provides Actionable Insights",
    description:
      "Many of our systems don't just automate—they also collect and surface data. Get real-time visibility into your operations so you can make faster, smarter decisions.",
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
  "Efficiency & Bottleneck Analysis",
  "Custom Automation Systems",
  "Back Office Automation",
  "Custom-Engineered AI Assistants",
  "Online/Digital Presence & Optimization",
  "Professional Website Development",
  "ROI Consultation",
  "Partnership / Referral",
  "Pricing & Packages",
  "Other",
] as const;

export type ContactInterest = (typeof contactInterests)[number];
