import type { CaseStudyData } from "@/types/case-study";
import { stages } from "@/data/demos/preisser-back-office";

// Own business (ADR-0018). One case study, "the Preisser Solutions back
// office," with `demo` as an array of Proof Stages that grows as each
// clears (ADR-0018 §1). First stage: deposit-to-invoice matching that
// refuses to guess (ADR-0016; spec-BO.md).
//
// specifications/results/techStack describe only what has SHIPPED — this one
// stage. ADR-0016 forbids inventing a metric or a capability ahead of the
// code, so these do not describe the five later stages ADR-0018 §1 lists in
// order; they are written back into this file as each one ships.
export const caseStudy: CaseStudyData = {
  slug: "preisser-back-office",
  metaTitle: "Our Own Back Office, Built In-House",
  metaDescription:
    "The owner's own administration panel: deposits tied to invoices only on real evidence, never a " +
    "guess, and every other back-office problem it solves along the way.",
  datePublished: "2026-09-28",
  dateModified: "2026-09-28",

  category: "Internal Platform",
  clientName: "Preisser Solutions back office (our own business)",
  clientNameDisplay: "the Preisser Solutions back office",
  industry: "Professional services back-office administration",

  h1: "The Back Office We Built to Run Our Own Business",
  subheadline:
    "One administration panel, built the same way we build for clients, solving the ordinary problems " +
    "of running a services business, starting with a rule that refuses to guess whose deposit is whose.",
  oneLine: "Deposits tied to invoices only when nothing is left to guess",

  headlineResults: [
    { value: "Evidence, not odds", label: "A deposit auto-pays only on a name match and an exact amount" },
    { value: "Refuses, not guesses", label: "Two invoices at once amount left for a person, never picked" },
    { value: "Nothing silent", label: "Every refusal is logged and later resolved by a person, not dropped" },
  ],

  hub: {
    problem:
      "Bank deposits arrive with almost nothing identifying who sent them, and an amount alone is not " +
      "evidence of who paid.",
    built:
      "A matcher that ties a deposit to an invoice only when the bank text names the client and the " +
      "amount is exact, refuses outright when an amount could belong to more than one invoice, and " +
      "leaves everything it cannot prove for a person to decide.",
    outcome: "A deposit is never assigned to the wrong client on the strength of a coincidence.",
  },

  before: {
    heading: "Bank deposits arrived with almost nothing identifying who sent them.",
    body: [
      "Every deposit posts with only what the bank happened to capture: a merchant name that may or " +
        "may not name the client, and an amount that on its own proves nothing. An amount matching an " +
        "invoice is a coincidence until something else confirms it, and reconciling that by eye does " +
        "not scale past a handful of accounts.",
      "The back office we run our own business on needed the same discipline we build for clients: " +
        "never post a match it cannot prove, and never leave a person guessing which reading is real.",
    ],
  },

  built: {
    heading: "A matcher that ties a deposit to an invoice only when nothing is left to guess.",
    body: [
      "A daily job compares every unmatched deposit's bank text and amount against the client's open " +
        "invoices. A deposit only pays automatically when the bank text names that client and the " +
        "amount matches exactly one open invoice; anything else is left in a queue with the reason " +
        "attached, never auto-posted on a guess.",
      "When an amount could belong to more than one open invoice for the same client, the matcher " +
        "refuses outright rather than picking one. A person decides. The same discipline extends to a " +
        "deposit that repeats one already paid: it ties to the existing invoice instead of paying it " +
        "again.",
    ],
  },

  specifications: {
    heading: "The deposit-to-invoice matcher, the first proof stage of the back office.",
    bullets: [
      "A daily matcher that ties a bank deposit to an invoice only on a name match and an exact amount",
      "A hold queue for anything the matcher cannot prove: a competing amount, no counterparty, no exact match",
      "A tie state that connects a deposit to an invoice already marked paid, without paying it twice",
      // TODO(Lane BO / later stage, ADR-0018 §1): the monthly invoice run,
      // meeting filing, the client tool list, the advisor, the phase-plan
      // journey and the work board each add their own bullets here as they ship.
    ],
  },

  results: [
    {
      value: "Evidence, not odds",
      label: "A deposit auto-pays only on a name match and an exact amount",
      context: "The bank text has to name the client and the amount has to match exactly: a coincidence never posts on its own.",
    },
    {
      value: "Refuses, not guesses",
      label: "Two invoices at once amount left for a person, never picked",
      context: "When an amount fits more than one open invoice for the same client, the matcher refuses outright rather than choosing.",
    },
    {
      value: "Nothing silent",
      label: "Every refusal is logged and later resolved by a person, not dropped",
      context: "A deposit the matcher cannot place stays queued with its reason attached until a person decides.",
    },
  ],

  techStack: ["Cloudflare Workers", "React administration panel", "Python back-office agent", "Plaid bank feed"],

  relatedSlugs: ["farmbooks", "nwks-encounter"],

  cta: {
    heading: "Want a back office that refuses to guess?",
    subcopy:
      "Preisser Solutions builds the administration panels and the automation underneath them. " +
      "Scoping begins with a conversation about your sources and your decisions.",
    buttonLabel: "Start a scoping conversation",
    buttonHref: "/contact",
  },

  demo: stages,
};
