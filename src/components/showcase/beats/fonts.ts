import { Bricolage_Grotesque, Figtree, Fraunces } from "next/font/google";
import type { PortalFont } from "@/data/showcase/types";

// The portal faces (marcommand-marketing-engine portal/clients/<slug>/theme.css):
// Hays draws Fraunces over Figtree, Duffer Bricolage Grotesque. Loaded only by
// the showcase chunk, which a visitor fetches on intent.
const fraunces = Fraunces({ subsets: ["latin"], variable: "--pt-f-fraunces", display: "swap" });
const figtree = Figtree({ subsets: ["latin"], variable: "--pt-f-figtree", display: "swap" });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--pt-f-bricolage", display: "swap" });

export const fontVars = `${fraunces.variable} ${figtree.variable} ${bricolage.variable}`;

export const fontStack: Record<PortalFont, string> = {
  fraunces: 'var(--pt-f-fraunces), Georgia, serif',
  figtree: 'var(--pt-f-figtree), system-ui, sans-serif',
  bricolage: 'var(--pt-f-bricolage), Arial, sans-serif',
  inter: 'var(--font-inter), system-ui, sans-serif',
};
