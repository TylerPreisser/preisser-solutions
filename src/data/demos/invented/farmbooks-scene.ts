// src/data/demos/invented/farmbooks-scene.ts
// Vocabulary for the FarmBooks showcase scene (scope farmbooks, alongside the
// case study's own set). Pure data: tests/demo-privacy.probe.mjs imports this
// file directly. No names: the scene's vendors and field come from the case
// study's already-checked set (Prairie General Farm Supply, Sagebrook Co-op,
// North 80).
import type { InventedSet } from "../_invented";

export const invented: InventedSet = {
  scope: "farmbooks",
  people: [],
  businesses: [],
  towns: [],
  domains: [],
  vocabulary: [
    // Co-op shorthand printed on the invented bills, kept beside the plain words.
    "ANHYD", "SPRD", "BLND", "FLDS", "TRT", "DSL", "FARM", "DLVY", "FERT", "N80", "LIQ", "APPL",
    "TERMS", "NET", "THANK",
    // Sentence-initial words in the scene's own copy.
    "Does", "Filed", "Landowner", "Nobody", "Snap",
  ],
  approved: [],
  assets: [],
};
