// src/data/demos/preisser-back-office.ts — the deposit-matcher Proof Stage
// (ADR-0016, ADR-0018). Fixture, the matching rule the stage narrates, and
// the stage script (captions, steps, narration). Every name and figure is
// invented and registered in ./invented/preisser-back-office.ts.
//
// Sources (ps-admin, origin/main @389aa89, read via `git show`; see
// src/components/case-study/DemoStage/scenes/preisser-back-office/SOURCE.md
// for the full citation list): agent/reconcile.py (the real matcher,
// `match_payments()`, and the "COLLISION ... left for Tyler" refusal print);
// panel/src/screens/money/ReviewView.tsx (`DepositRow`, `DepositDetail`,
// `acceptWords`, `TiesNote`, the three Group headings); bills/vm.ts
// (`tiesRatherThanPays`, the ties-not-pays doc comment).
//
// This fixture's rule is a SIMPLIFIED, honest shape of the real one
// (spec-BO.md §2.1): "same registered client ID and same amount" stands in
// for the real system's text-evidence check, and this stage's narration says
// so ("the bank text has to name the client") rather than implying a
// database join is doing the work.
import { defineStages } from "./_define";
import { business } from "./_invented";
import { sumCents, usdCents, type Cents } from "./_money";

export interface DemoInvoiceLine {
  label: string;
  cents: Cents;
}

export interface DemoInvoice {
  number: string;
  clientId: string;
  issued: string; // ISO date
  lines: readonly DemoInvoiceLine[];
  readonly client: string;
  readonly totalCents: Cents;
}

export interface DemoDeposit {
  id: string;
  posted: string; // ISO date
  /** The bank's own text for this row (invented). */
  descriptor: string;
  counterpartyId: string | null;
  cents: Cents;
  pending: boolean;
}

export type MatchOutcome =
  | { kind: "paid"; deposit: DemoDeposit; invoice: DemoInvoice; basis: string }
  // Local to this fixture (spec-BO.md §3.4): a later deposit whose evidence
  // and amount point at an invoice an EARLIER deposit in this same run
  // already paid. Never shared with src/types/demo-stage.ts.
  | { kind: "tied"; deposit: DemoDeposit; invoice: DemoInvoice; basis: string }
  | {
      kind: "queued";
      deposit: DemoDeposit;
      reason: "pending" | "no-counterparty" | "collision" | "no-exact-amount";
      basis: string;
      candidates: readonly DemoInvoice[];
    };

function invoice(number: string, clientId: string, issued: string, lines: DemoInvoiceLine[]): DemoInvoice {
  return {
    number,
    clientId,
    issued,
    lines,
    get client() {
      return business(clientId).name;
    },
    get totalCents() {
      return sumCents(lines.map((l) => l.cents));
    },
  };
}

const invoices: readonly DemoInvoice[] = [
  invoice("INV-2101", "larkspur-fence", "2026-02-10", [{ label: "Fence installation", cents: 185000 }]),
  invoice("INV-2102", "millbrook-grain", "2026-02-18", [{ label: "Grain handling", cents: 420000 }]),
  invoice("INV-2103", "cedarbend-vet", "2026-03-01", [{ label: "Herd health visit", cents: 96000 }]),
  invoice("INV-2104", "larkspur-fence", "2026-03-14", [{ label: "Fence repair", cents: 227500 }]),
  invoice("INV-2105", "millbrook-grain", "2026-03-12", [{ label: "Grain handling", cents: 420000 }]),
  invoice("INV-2106", "cedarbend-vet", "2026-03-20", [{ label: "Vaccinations", cents: 64000 }]),
];

// Posted-date order (spec-BO.md §3.3) — required, because `matchDeposits`
// below tracks which invoice an earlier deposit in the same run already
// claimed. Never sorted at read time; the order IS the story.
const deposits: readonly DemoDeposit[] = [
  { id: "d1", posted: "2026-02-14", descriptor: business("larkspur-fence").aliases![0], counterpartyId: "larkspur-fence", cents: 185000, pending: false },
  { id: "d2", posted: "2026-03-01", descriptor: business("cedarbend-vet").aliases![0], counterpartyId: "cedarbend-vet", cents: 96000, pending: false },
  { id: "d3", posted: "2026-03-09", descriptor: business("larkspur-fence").aliases![0], counterpartyId: "larkspur-fence", cents: 227500, pending: false },
  { id: "d4", posted: "2026-03-15", descriptor: business("millbrook-grain").aliases![0], counterpartyId: "millbrook-grain", cents: 420000, pending: false },
  { id: "d5", posted: "2026-03-18", descriptor: business("millbrook-grain").aliases![0], counterpartyId: "millbrook-grain", cents: 96000, pending: true },
  { id: "d6", posted: "2026-03-19", descriptor: "Mobile Check Deposit", counterpartyId: null, cents: 64000, pending: false },
  { id: "d7", posted: "2026-03-21", descriptor: business("larkspur-fence").aliases![0], counterpartyId: "larkspur-fence", cents: 150000, pending: false },
  { id: "d8", posted: "2026-03-24", descriptor: business("larkspur-fence").aliases![0], counterpartyId: "larkspur-fence", cents: 185000, pending: false },
];

/**
 * The rule the stage narrates: a deposit pays an invoice only when the bank
 * text names the client AND the amount is exact, with exactly one such
 * invoice. Two exact candidates for the same client is a refusal, not a
 * pick (agent/reconcile.py `_decomposes`, the "COLLISION ... left for Tyler"
 * print). A later deposit whose only exact candidate was already paid by an
 * earlier deposit in this run ties to it instead of paying twice
 * (bills/vm.ts `tiesRatherThanPays`, ReviewView.tsx `TiesNote`).
 *
 * Processes `deposits` IN THE ORDER GIVEN (posted-date order, spec-BO.md
 * §3.4) — the "tied" kind only exists because this function remembers what
 * an earlier iteration paid.
 */
export function matchDeposits(dList: readonly DemoDeposit[], invList: readonly DemoInvoice[]): MatchOutcome[] {
  const paidNumbers = new Set<string>();
  return dList.map((d): MatchOutcome => {
    if (d.pending) {
      return {
        kind: "queued",
        deposit: d,
        reason: "pending",
        basis: "Still pending at the bank. Nothing is tied until it posts.",
        candidates: [],
      };
    }
    if (!d.counterpartyId) {
      return {
        kind: "queued",
        deposit: d,
        reason: "no-counterparty",
        basis: "The bank text names no client the system recognizes.",
        candidates: [],
      };
    }
    const sameClient = invList.filter((i) => i.clientId === d.counterpartyId);
    const exact = sameClient.filter((i) => i.totalCents === d.cents);
    if (exact.length === 1) {
      const inv = exact[0];
      if (paidNumbers.has(inv.number)) {
        return {
          kind: "tied",
          deposit: d,
          invoice: inv,
          basis: `${inv.number} is already paid. This ties to it; nothing is paid twice.`,
        };
      }
      paidNumbers.add(inv.number);
      return { kind: "paid", deposit: d, invoice: inv, basis: `Same client, same amount: ${usdCents(d.cents)} for ${inv.number}.` };
    }
    if (exact.length > 1) {
      return {
        kind: "queued",
        deposit: d,
        reason: "collision",
        basis: `${exact.length} open invoices are exactly ${usdCents(d.cents)}.`,
        candidates: exact,
      };
    }
    return {
      kind: "queued",
      deposit: d,
      reason: "no-exact-amount",
      basis: `No open invoice for this client is ${usdCents(d.cents)}.`,
      candidates: sameClient,
    };
  });
}

export const fixture = {
  invoices,
  deposits,
  get outcomes(): readonly MatchOutcome[] {
    return matchDeposits(deposits, invoices);
  },
  get paid() {
    return this.outcomes.filter((o): o is Extract<MatchOutcome, { kind: "paid" }> => o.kind === "paid");
  },
  get tied() {
    return this.outcomes.filter((o): o is Extract<MatchOutcome, { kind: "tied" }> => o.kind === "tied");
  },
  get queued() {
    return this.outcomes.filter((o): o is Extract<MatchOutcome, { kind: "queued" }> => o.kind === "queued");
  },
} as const;

function invariant(ok: boolean, msg: string): void {
  if (!ok) throw new Error(`[deposit matcher fixture] ${msg} (spec-BO.md §3.5)`);
}

// The captions promise these exact counts; if the data stops producing them,
// fail the build rather than ship a stage that contradicts its own story.
invariant(fixture.paid.length === 3, `expected 3 clean matches, got ${fixture.paid.length}`);
invariant(fixture.tied.length === 1, `expected exactly 1 tied outcome, got ${fixture.tied.length}`);
invariant(
  fixture.queued.filter((q) => q.reason === "collision").length === 1,
  `expected exactly 1 collision, got ${fixture.queued.filter((q) => q.reason === "collision").length}`,
);
invariant(
  fixture.queued.filter((q) => q.reason === "pending").length === 1,
  `expected exactly 1 pending row, got ${fixture.queued.filter((q) => q.reason === "pending").length}`,
);
invariant(
  fixture.queued.filter((q) => q.reason === "no-counterparty").length === 1,
  `expected exactly 1 no-counterparty row, got ${fixture.queued.filter((q) => q.reason === "no-counterparty").length}`,
);
invariant(
  fixture.queued.filter((q) => q.reason === "no-exact-amount").length === 1,
  `expected exactly 1 no-exact-amount row, got ${fixture.queued.filter((q) => q.reason === "no-exact-amount").length}`,
);
invariant(
  sumCents(fixture.paid.map((o) => o.deposit.cents)) === sumCents(fixture.paid.map((o) => o.invoice.totalCents)),
  "a paid deposit's cents must equal the invoice it paid",
);
invariant(sumCents(invoices.map((i) => i.totalCents)) === 1_412_500, "the six invoices must sum to $14,125.00");

export const stages = defineStages([
  {
    shape: "beats",
    id: "deposit-matcher",
    title: "A deposit that will not guess",
    kicker:
      "This Money tab normally holds two more groups: charges waiting for a bucket, and proposals " +
      "waiting for a yes. Here it shows only deposits waiting for an invoice.",
    skin: "psadmin",
    narration: {
      label: "Demonstration data",
      description:
        "This stage shows the Preisser Solutions back office matching bank deposits to open invoices. " +
        "Deposits arrive, two are matched cleanly to a single invoice each, one amount matches two " +
        "open invoices for the same client and is held rather than guessed, one deposit is still " +
        "pending at the bank, one names no client the system recognizes, one is short of every open " +
        "invoice, and one repeats a deposit already tied to an invoice. The clients, invoices, and bank " +
        "rows shown are an invented demonstration.",
    },
    beats: [
      {
        kind: "before",
        id: "statement",
        caption:
          "Before: a bank statement on one screen, a spreadsheet of open invoices on another, and a " +
          "person cross-checking both by eye.",
      },
      {
        kind: "read",
        id: "matching",
        caption: "Deposits post from the bank, and the matcher decides on each one before a person ever sees it.",
        steps: [
          { caption: "Bank rows come in for the day." },
          { caption: "One deposit's name and amount point at a single open invoice. It's marked paid." },
          { caption: "A second deposit resolves the same clean way." },
          { caption: "A third deposit's amount fits two open invoices for one client. It waits for a person." },
          { caption: "A fourth deposit hasn't posted yet. Nothing is tied until it clears." },
        ],
      },
      {
        kind: "caught",
        id: "held",
        caption: "Three more deposits, three different reasons the matcher will not guess.",
        cards: [
          {
            id: "no-counterparty",
            title: "A deposit with no name on it.",
            caption: "The amount matches an invoice, but the bank text names no client the system recognizes.",
          },
          {
            id: "no-exact-amount",
            title: "A deposit for less than any open invoice.",
            caption: "No open invoice for this client is worth exactly what came in.",
          },
          {
            id: "tied",
            title: "A deposit that repeats one already paid.",
            caption: "It ties to the invoice already paid instead of paying it a second time.",
          },
        ],
      },
      {
        kind: "screen",
        id: "review",
        caption: "The Money tab's Review view, recreated: the deposits still waiting on a person.",
        chrome: "Money · Review",
      },
    ],
  },
]);
