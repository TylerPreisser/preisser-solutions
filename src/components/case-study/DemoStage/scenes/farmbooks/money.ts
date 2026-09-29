// scenes/farmbooks/money.ts — ported verbatim from
// Farm Invoice Processing System/web/lib/format.ts:76-86 @8cbbbb4 (the `money` export only).
// Fixture amounts in src/data/demos/farmbooks.ts are plain dollar floats (not the kit's integer
// cents), so they format through this rather than the kit's usdCents — see SOURCE.md "Money
// representation".
export function money(amount: number, opts: { show?: boolean; exact?: boolean }): string {
  const fixed = opts.exact ? amount.toFixed(2) : Math.round(amount).toString();
  const [whole, cents] = fixed.split(".");
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return cents ? `$${grouped}.${cents}` : `$${grouped}`;
}
