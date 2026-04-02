export interface ValueProp {
  title: string;
  description: string;
  icon?: string;
}

export interface Service {
  title: string;
  description: string;
  details?: string;
  icon?: string;
}

export const valueProps: ValueProp[] = [
  {
    title: "Boost Productivity",
    description: "", // TODO: Content from Tyler's prompt
  },
  {
    title: "Enhance Accuracy",
    description: "",
  },
  {
    title: "Reduce Operational Cost",
    description: "",
  },
  {
    title: "Scalable & Reliable",
    description: "",
  },
];

export const services: Service[] = [
  {
    title: "Efficiency & Bottleneck Analysis",
    description: "",
  },
  {
    title: "Custom Automation Systems",
    description: "",
  },
  {
    title: "Back Office Automation",
    description: "",
  },
  {
    title: "Custom-Engineered AI Assistants",
    description: "",
  },
  {
    title: "Digital Presence & Optimization",
    description: "",
  },
  {
    title: "Professional Website Development",
    description: "",
  },
];
