// src/data/demos/invented/preisser-back-office.ts
// Invented names for /case-studies/preisser-back-office ONLY (ADR-0018 §4: no
// real client, amount, bank descriptor, routing or account digit). Pure data:
// tests/demo-privacy.probe.mjs imports this file directly. No runtime imports.
import type { InventedSet } from "../_invented";

export const invented: InventedSet = {
  scope: "preisser-back-office",
  people: [],
  businesses: [],
  towns: [],
  domains: [],
  vocabulary: [],
  approved: [],
  assets: [],
};
