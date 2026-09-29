// src/data/demos/invented/preisser-back-office.ts
// Invented names for /case-studies/preisser-back-office ONLY (ADR-0018 §4: no
// real client, amount, bank descriptor, routing or account digit). Pure data:
// tests/demo-privacy.probe.mjs imports this file directly. No runtime imports.
//
// Every business below is fiction, invented for spec-BO.md §3.1 and cleared
// by a web search before being registered here (WebSearch, exact phrase, run
// by the lead 2026-09-28 — see each entry's `checked`). None appears in any
// ps-admin fixture, config value, or asset; none is drawn from any other
// repo's seed data.
import type { InventedSet } from "../_invented";

export const invented: InventedSet = {
  scope: "preisser-back-office",
  people: [],
  businesses: [
    {
      id: "larkspur-fence",
      name: "Larkspur Fence & Supply",
      // The bank's own uppercase descriptor text for this client (invented).
      aliases: ["LARKSPUR FENCE SUP"],
      checked:
        "2026-09-28 web: WebSearch (exact phrase) returned only fence contractors " +
        "in Larkspur, CA/CO. No business of this name. Cleared (spec-BO.md §3.1).",
    },
    {
      id: "millbrook-grain",
      name: "Millbrook Grain Services",
      aliases: ["MILLBROOK GRAIN SV"],
      checked:
        "2026-09-28 web: WebSearch (exact phrase) returned Millbrook Farms, " +
        "Millbrook Healthcare and Millbrook Proving Ground, none a grain services " +
        "firm. Cleared (spec-BO.md §3.1).",
    },
    {
      id: "cedarbend-vet",
      name: "Cedar Bend Veterinary Clinic",
      aliases: ["CEDARBEND VET CLINIC"],
      checked:
        "2026-09-28 web: WebSearch (exact phrase) returned Cedar Veterinary " +
        "Clinic (Cedar City, UT) and Bend Veterinary Clinic, no clinic of this " +
        "exact name. Cleared (spec-BO.md §3.1).",
    },
  ],
  towns: [],
  domains: [
    // Registered for completeness (spec-BO.md §3.1); unused this stage.
    { id: "larkspur-fence-domain", domain: "larkspurfence.example" },
    { id: "millbrook-grain-domain", domain: "millbrookgrain.example" },
    { id: "cedarbend-vet-domain", domain: "cedarbendvet.example" },
  ],
  // Stage-specific UI words not in tests/demo-privacy/common-words.txt
  // (which is generic, not per-stage): the bank's own generic descriptor for
  // an unidentified depositor, "Mobile Check Deposit" (agent/reconcile.py,
  // panel/src/screens/money/bills/vm.ts doc comments — the bank's phrase, not
  // an invented name, and not privacy-sensitive).
  vocabulary: ["Mobile", "Check", "Pick"],
  approved: [],
  assets: [],
};
