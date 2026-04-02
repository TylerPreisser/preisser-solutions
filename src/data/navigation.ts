export interface NavLink {
  label: string;
  href: string;
  id?: string;
}

export const navigation = {
  links: [
    { label: "Why Automation?", href: "/why-automation" },
    { label: "Estimate ROI", href: "/roi-calculator", id: "header-roi-btn" },
    { label: "Inquiry", href: "/contact" },
  ] as NavLink[],
} as const;
