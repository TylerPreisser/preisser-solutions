// scenes/farmbooks/icons.tsx — a trimmed copy of
// Farm Invoice Processing System/web/components/icons.tsx @8cbbbb4: only `Check`, `Doc`, `Ruler`,
// `Spreadsheet`, plus the shared `base()` helper and `IconProps` type the four call sites need.
type IconProps = {
  size?: number;
  className?: string;
  strokeWidth?: number;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
};

const a11y = ({ "aria-label": label, "aria-hidden": hidden }: IconProps) =>
  label ? { role: "img", "aria-label": label } : { "aria-hidden": hidden ?? true };

const base = (name: string, size: number, className: string | undefined, aria: IconProps) => ({
  "data-icon": name,
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  className,
  ...a11y(aria),
});

export function Check({ size = 18, className, strokeWidth = 2.6, ...aria }: IconProps) {
  return (
    <svg {...base("Check", size, className, aria)} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12.5L9.5 18 20 6.5" />
    </svg>
  );
}

export function Doc({ size = 24, className, strokeWidth = 2, ...aria }: IconProps) {
  return (
    <svg {...base("Doc", size, className, aria)} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.5 3.5h7L18 8v12.5H6.5z" />
      <path d="M13 3.5V8h5M9 12h6M9 15.5h6" />
    </svg>
  );
}

export function Ruler({ size = 24, className, strokeWidth = 2, ...aria }: IconProps) {
  return (
    <svg {...base("Ruler", size, className, aria)} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="8.5" width="19" height="7" rx="1.6" />
      <path d="M7 8.5v2.6M12 8.5v3.6M17 8.5v2.6" />
    </svg>
  );
}

export function Spreadsheet({ size = 24, className, strokeWidth = 2, ...aria }: IconProps) {
  return (
    <svg {...base("Spreadsheet", size, className, aria)} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4.5" width="16" height="15" rx="1.5" />
      <path d="M4 10h16M4 15h16M10 4.5v15" />
    </svg>
  );
}
