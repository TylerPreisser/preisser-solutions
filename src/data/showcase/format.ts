// src/data/showcase/format.ts — number words for the showcase data files, so an
// answer's figures are COMPUTED from the client's funnel rows, never typed.

export const count = (n: number) => n.toLocaleString("en-US");
export const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
export const sum = (xs: readonly number[]) => xs.reduce((a, b) => a + b, 0);
/** "1 in 37": how many visitors per lead, rounded. */
export const oneIn = (of: number, hits: number) => `1 in ${Math.round(of / hits)}`;
