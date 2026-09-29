// scenes/farmbooks/hero-total.tsx — ported from
// Farm Invoice Processing System/web/components/field-ui.tsx:105-123 @8cbbbb4 (`HeroTotal` only),
// codemodded per farmbooks.css's --fb-* token set (spec-FB §2c): text-ink -> --fb-ink,
// font-display -> --fb-font-display, tnum -> .fb-tnum.
import { money } from "./money";

export function HeroTotal({
  value,
  show,
  exact = false,
  className = "",
}: {
  value: number;
  show: boolean;
  exact?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`fb-tnum font-[family-name:var(--fb-font-display)] font-semibold leading-[0.95] tracking-tight text-[rgb(var(--fb-ink))] ${className}`}
    >
      {money(value, { show, exact })}
    </span>
  );
}
