// scenes/farmbooks/category-icons.tsx — ported verbatim from
// Farm Invoice Processing System/web/components/field/category-icons.tsx @8cbbbb4. No `bg-*`/
// `text-*`/CSS-var reference: only currentColor strokes and plain sizing, so no codemod needed.
import type { ReactElement } from "react";

type IconProps = { size?: number; className?: string; strokeWidth?: number };
const svg = (size: number, className?: string) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className,
});

export function FuelIcon({ size = 22, className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...svg(size, className)} strokeWidth={strokeWidth}>
      <path d="M4 20V6a2 2 0 012-2h6a2 2 0 012 2v14" />
      <path d="M3 20h12" />
      <path d="M7 9h4" />
      <path d="M14 8l3 3v6a2 2 0 002 2 2 2 0 002-2V9l-3-3" />
    </svg>
  );
}

export function FertilizerIcon({ size = 22, className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...svg(size, className)} strokeWidth={strokeWidth}>
      <path d="M8 4h8l-1 3c2 2 3 5 3 8a4 4 0 01-4 4H10a4 4 0 01-4-4c0-3 1-6 3-8z" />
      <path d="M10.5 12.5l3 3M13.5 12.5l-3 3" />
    </svg>
  );
}

export function ChemicalIcon({ size = 22, className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...svg(size, className)} strokeWidth={strokeWidth}>
      <path d="M8 9h6a2 2 0 012 2v9a1 1 0 01-1 1H7a1 1 0 01-1-1v-9a2 2 0 012-2z" />
      <path d="M9 9V6h4V4h-4" />
      <path d="M14 6h3M14 4h2" />
    </svg>
  );
}

export function SeedIcon({ size = 22, className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...svg(size, className)} strokeWidth={strokeWidth}>
      <path d="M12 21v-8" />
      <path d="M12 13c0-3 2-5 5-5 0 3-2 5-5 5z" />
      <path d="M12 15c0-3-2-5-5-5 0 3 2 5 5 5z" />
    </svg>
  );
}

export function FeedIcon({ size = 22, className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...svg(size, className)} strokeWidth={strokeWidth}>
      <path d="M5 8h14l-1.5 11a2 2 0 01-2 1.8H8.5a2 2 0 01-2-1.8z" />
      <path d="M4 8h16" />
      <path d="M9 5c0-1 1-2 3-2s3 1 3 2" />
    </svg>
  );
}

export function RepairIcon({ size = 22, className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...svg(size, className)} strokeWidth={strokeWidth}>
      <path d="M15 6a4 4 0 00-5 5l-6 6 2 2 6-6a4 4 0 005-5l-2.5 2.5-2-2z" />
    </svg>
  );
}

export function CustomHireIcon({ size = 22, className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...svg(size, className)} strokeWidth={strokeWidth}>
      <circle cx="7" cy="17" r="3.4" />
      <circle cx="17.5" cy="18" r="2.4" />
      <path d="M4 12V8h4l2 4h4V9h3v6" />
      <path d="M10.5 17h4.5" />
    </svg>
  );
}

export function LivestockIcon({ size = 22, className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...svg(size, className)} strokeWidth={strokeWidth}>
      <path d="M6 6c-2 0-3 1.5-3 3.5M18 6c2 0 3 1.5 3 3.5" />
      <path d="M6 6c0 6 2 12 6 12s6-6 6-12" />
      <path d="M9.5 11h.01M14.5 11h.01" />
      <path d="M10 15.5c1 .8 3 .8 4 0" />
    </svg>
  );
}

export function UtilityIcon({ size = 22, className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...svg(size, className)} strokeWidth={strokeWidth}>
      <path d="M13 3L5 13h6l-1 8 8-10h-6z" />
    </svg>
  );
}

export function FreightIcon({ size = 22, className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...svg(size, className)} strokeWidth={strokeWidth}>
      <path d="M3 6h11v9H3z" />
      <path d="M14 9h4l3 3v3h-7z" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </svg>
  );
}

export function SuppliesIcon({ size = 22, className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...svg(size, className)} strokeWidth={strokeWidth}>
      <path d="M4 8l8-4 8 4-8 4z" />
      <path d="M4 8v8l8 4 8-4V8" />
      <path d="M12 12v8" />
    </svg>
  );
}

export function CategoryTagIcon({ size = 22, className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...svg(size, className)} strokeWidth={strokeWidth}>
      <path d="M4 4h7l9 9-7 7-9-9z" />
      <circle cx="8" cy="8" r="1.3" />
    </svg>
  );
}

type Icon = (p: IconProps) => ReactElement;

const RULES: [RegExp, Icon][] = [
  [/fuel|diesel|\boil\b|gasol|propane|\bgas\b/i, FuelIcon],
  [/fertiliz|\blime\b|nitrogen|anhydrous|\burea\b|potash|phosph/i, FertilizerIcon],
  [/chemical|spray|herbicid|pesticid|fungicid|adjuvant|\bweed\b/i, ChemicalIcon],
  [/seed|plant/i, SeedIcon],
  [/feed|forage|\bhay\b|ration/i, FeedIcon],
  [/repair|mainten|\bparts?\b/i, RepairIcon],
  [/custom|\bhire\b|harvest|cutting|combin|swath|\bbale/i, CustomHireIcon],
  [/\bvet\b|veterin|livestock|breed|medicine|cattle|\bcalf\b|\bherd\b|animal|semen/i, LivestockIcon],
  [/util|electric|\bwater\b|irrigat|\bpower\b|internet|phone|communicat/i, UtilityIcon],
  [/freight|truck|\bhaul|shipping/i, FreightIcon],
  [/suppl/i, SuppliesIcon],
];

/** Resolve a category name (canonical or free-form) to its farmer icon; generic tag if unknown. */
export function categoryIcon(name: string): Icon {
  for (const [re, icon] of RULES) if (re.test(name)) return icon;
  return CategoryTagIcon;
}
