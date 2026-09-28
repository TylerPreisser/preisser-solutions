/** Integer cents. Fixtures type every amount in cents so every sum is exact. */
export type Cents = number;

export function assertCents(c: number, where: string): Cents {
  if (!Number.isInteger(c)) throw new Error(`[demo fixture] ${where}: ${c} is not a whole number of cents`);
  return c;
}

export function sumCents(values: readonly Cents[]): Cents {
  return values.reduce((a, b) => a + b, 0);
}

/**
 * "$1,250.00". Hand-rolled rather than Intl so the server and every browser
 * print identical bytes; a hydration mismatch here would be a visible flicker.
 */
export function usdCents(c: Cents): string {
  const sign = c < 0 ? "-" : "";
  const abs = Math.abs(Math.round(c));
  const dollars = Math.floor(abs / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${sign}$${dollars}.${String(abs % 100).padStart(2, "0")}`;
}

export function intText(n: number): string {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
