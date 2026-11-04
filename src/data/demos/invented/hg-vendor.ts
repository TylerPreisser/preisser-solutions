// src/data/demos/invented/hg-vendor.ts
// HG Oil's "Vendor Insurance" walkthrough on the home showcase (ADR-0025 §2), scope hg-oil.
// Pure data: tests/demo-privacy.probe.mjs imports this file directly. No runtime imports.
//
// No new names: the vendor, its agency and insurers, the agent, the towns and the filing list all
// come from the hg-oil set (invented/hg-oil.ts). This file registers only the rendered certificate
// (and its thumbnail) as stage assets, and the capitalised words the scene's own copy uses.
import type { InventedSet } from "../_invented";

export const invented: InventedSet = {
  scope: "hg-oil",
  people: [],
  businesses: [],
  towns: [],
  domains: [],
  vocabulary: [
    // Step names, controls and checklist words, and the "M" of "$1M".
    "Arrives", "Good", "Play", "Effective", "Expires", "M",
  ],
  approved: [],
  assets: [
    {
      path: "/images/demos/hg-oil/acord25-prairie-dog.png",
      provenance:
        "Rendered in this repo by scripts/render-acord.mjs (Chromium, bundled Arimo and Cousine, 1.5x, 16-colour palette) " +
        "from the Acord25 component and the invented certificate in src/data/showcase/scenes/hg-vendor.ts; every name on it " +
        "is from the hg-oil set; the holder address is a placeholder (PO Box 000, Anytown, KS 00000).",
    },
    {
      path: "/images/demos/hg-oil/acord25-prairie-dog-thumb.webp",
      provenance: "The same render as acord25-prairie-dog.png, 408 x 528.",
    },
  ],
};
