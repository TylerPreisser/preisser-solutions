// src/data/demos/invented/farmbooks-bills.ts
// The FarmBooks "Bills" walkthrough on the home showcase (design-spec-r2 §6.1), scope farmbooks.
// Pure data: tests/demo-privacy.probe.mjs imports this file directly. No runtime imports.
//
// No new names: the bill's vendor, the farm, every supplier and every field come from the case
// study's already web-checked set (invented/farmbooks.ts). This file registers only the rendered
// bill (and its thumbnail) as stage assets, and the capitalised words the scene's copy and the
// co-op shorthand printed on the bill use.
import type { InventedSet } from "../_invented";

export const invented: InventedSet = {
  scope: "farmbooks",
  people: [],
  businesses: [],
  towns: [],
  domains: [],
  vocabulary: [
    // Co-op shorthand printed on the bill and shown beside the plain words (DSL is already in farmbooks-scene).
    "DYED", "GRNG", "SD", "BAG", "HERB", "GL", "HYD", "UTF",
    // The scene's own UI copy: step names, the camera gate, the app's screens and buttons.
    "Snaps", "Sums", "Framing", "Upload", "Uploading", "Drop", "Needs", "Printed", "Split", "Ties", "Booked",
    "Glance", "Includes", "Cost", "Supplier",
  ],
  approved: [
    {
      name: "Excel",
      source: "the spreadsheet format FarmBooks exports its At a Glance workbook in (.xlsx; FarmBooks workbook_template.py); a product name, not a client",
    },
  ],
  assets: [
    {
      path: "/images/demos/farmbooks/prairie-general-49813-1b819e77.png",
      provenance:
        "Rendered in this repo by scripts/farmbooks-bill/render.mjs (Chromium, shipped Liberation fonts, 1.5x, 24-colour " +
        "palette). An invented supplier invoice: the bill farm-books.com already publishes (Prairie General Farm Supply, " +
        "invoice 49813, four lines, $700.50), sold to the invented Coyote Draw Farms; its two towns (Aldervale, Emberton) " +
        "are the web-checked invented towns of the hg-oil set; phone 555-0142 is a fictional-use number.",
    },
    {
      path: "/images/demos/farmbooks/prairie-general-49813-thumb-1b819e77.webp",
      provenance: "The same render, 240 px wide (scripts/farmbooks-bill/render.mjs).",
    },
  ],
};
