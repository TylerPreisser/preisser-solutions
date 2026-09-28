// src/data/demos/preisser-back-office.ts — the deposit-matcher Proof Stage
// (ADR-0016, ADR-0018). Fixture, the matching rule the stage narrates, and
// the stage script (captions, steps, narration). Every name and figure is
// invented and registered in ./invented/preisser-back-office.ts.
//
// Sources (ps-admin, origin/main @389aa89, read via `git show`; see
// src/components/case-study/DemoStage/scenes/preisser-back-office/SOURCE.md
// for the full citation list): agent/reconcile.py `match_payments()` (the
// real auto-pay rail, :901-1032), `_decomposes()` (:648-670, subset-sum
// existence only), `_fifo_by_client()` (:713-727), `propose_candidates()`
// (:730-841, the proposal rail's "likely" confidence for a collision);
// panel/src/screens/money/ReviewView.tsx (`DepositRow`, `DepositDetail`,
// `acceptWords`, the three Group headings); bills/vm.ts
// (`tiesRatherThanPays`, the ties-not-pays doc comment, :157-164).
//
// Review fix (PR #10, review-BO.md): this file previously modeled two
// outcomes the real matcher does not have — a same-client equal-amount pair
// auto-pays FIFO to the oldest invoice rather than refusing, and a repeat
// deposit against an already-paid invoice is left unexplained rather than
// "tied" to it (tying is a person accepting a PROPOSAL for an invoice the
// OWNER hand-marked paid with no deposit behind it, the opposite situation).
// Both are corrected below; a genuine collision now needs a deposit that
// equals one open invoice AND a different combination of at least two other
// open invoices for the same client (`decomposesFromSubset`, mirroring
// `_decomposes`), and paid invoices are removed from the pool a later
// deposit can match against, mirroring `del remaining[...]`.
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
  | {
      kind: "queued";
      deposit: DemoDeposit;
      reason: "pending" | "no-counterparty" | "collision" | "no-exact-amount" | "unexplained";
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
  invoice("INV-2106", "cedarbend-vet", "2026-03-20", [{ label: "Vaccinations", cents: 64000 }]),
  // The two invoices whose SUM equals INV-2102's face value: the genuine
  // collision (review HIGH-1). Both stay open; the real matcher never
  // applies either reading for a decomposing amount (reconcile.py :959-982).
  invoice("INV-2107", "millbrook-grain", "2026-02-20", [{ label: "Grain handling", cents: 150000 }]),
  invoice("INV-2108", "millbrook-grain", "2026-02-22", [{ label: "Grain handling", cents: 270000 }]),
  // Stays open the whole fixture: without it, d7's "no open invoice for this
  // client is this amount" would be vacuously true (Larkspur would have NO
  // open invoices left at all, the same situation as d8) rather than a real
  // amount mismatch against a genuinely open invoice (review MEDIUM-3).
  invoice("INV-2109", "larkspur-fence", "2026-01-05", [{ label: "Fence materials", cents: 95000 }]),
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
 * True when at least two DISTINCT invoices in `pool` sum exactly to
 * `target` (agent/reconcile.py `_decomposes`, existence only — which
 * combination it is is never surfaced for acceptance, per `propose_candidates`
 * :771-774 "A combination is deliberately never offered for acceptance
 * here."). Brute-force over subsets: this fixture's per-client pools never
 * exceed a handful of invoices, unlike the real function's bitset DP, which
 * exists to stay linear at production scale (reconcile.py :655-657).
 */
function decomposesFromSubset(pool: readonly DemoInvoice[], target: Cents): boolean {
  const amounts = pool.map((i) => i.totalCents).filter((c) => c > 0 && c <= target);
  const n = amounts.length;
  for (let mask = 1; mask < 1 << n; mask += 1) {
    let count = 0;
    let sum = 0;
    for (let i = 0; i < n; i += 1) {
      if (mask & (1 << i)) {
        count += 1;
        sum += amounts[i];
      }
    }
    if (count >= 2 && sum === target) return true;
  }
  return false;
}

/** The oldest of a same-client, same-amount candidate set (agent/reconcile.py
 * `_fifo_by_client`, keyed here on `issued` as a stand-in for the real
 * `due_date`; not exercised by this fixture's eight deposits, kept for
 * correctness against the cited rule). */
function oldestByIssued(invs: readonly DemoInvoice[]): DemoInvoice {
  return [...invs].sort((a, b) => (a.issued < b.issued ? -1 : a.issued > b.issued ? 1 : 0))[0];
}

/**
 * The rule the stage narrates: a deposit pays an invoice only when the bank
 * text names the client AND the amount is exact, with exactly one such
 * invoice, AND no different combination of that client's other open
 * invoices also sums to the amount (agent/reconcile.py `match_payments`,
 * the collision guard `_decomposes` at :959). Same-client, same-amount
 * candidates (more than one invoice exactly equal to the deposit) pay the
 * oldest, FIFO (:982-993) — not a refusal. A deposit that repeats an amount
 * already paid earlier in this run matches nothing still open and is left
 * unexplained for a person (:1020-1031); it is never "tied" — tying is a
 * person accepting a PROPOSAL for an invoice the OWNER hand-marked paid with
 * no deposit behind it (bills/vm.ts `tiesRatherThanPays`), the opposite
 * situation, and this fixture does not model it.
 *
 * Processes `deposits` IN THE ORDER GIVEN (posted-date order, spec-BO.md
 * §3.4): a paid invoice is removed from the pool a later deposit can match,
 * mirroring `del remaining[inv["invoice_no"]]`.
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
    // Paid invoices leave the pool, so a later deposit can never match one a
    // prior deposit already claimed (reconcile.py `del remaining[...]`).
    const openSameClient = invList.filter((i) => i.clientId === d.counterpartyId && !paidNumbers.has(i.number));
    const exact = openSameClient.filter((i) => i.totalCents === d.cents);
    if (exact.length === 1) {
      const inv = exact[0];
      if (decomposesFromSubset(openSameClient, d.cents)) {
        return {
          kind: "queued",
          deposit: d,
          reason: "collision",
          basis:
            `${inv.number} is for exactly ${usdCents(d.cents)} and is unpaid, but ${usdCents(d.cents)} is also ` +
            "exactly a combination of smaller open invoices, so a single reading is not certain.",
          candidates: openSameClient,
        };
      }
      paidNumbers.add(inv.number);
      return { kind: "paid", deposit: d, invoice: inv, basis: `Same client, same amount: ${usdCents(d.cents)} for ${inv.number}.` };
    }
    if (exact.length > 1) {
      // Same client, identical amounts: FIFO to the oldest, not a refusal
      // (reconcile.py :982-989). Not reached by this fixture's data.
      const inv = oldestByIssued(exact);
      paidNumbers.add(inv.number);
      return {
        kind: "paid",
        deposit: d,
        invoice: inv,
        basis: `Same client, same amount, more than one open invoice: the oldest, ${inv.number}, is paid.`,
      };
    }
    if (decomposesFromSubset(openSameClient, d.cents)) {
      // No single open invoice equals the deposit, but a combination of
      // several does. Not reached by this fixture's data; kept for
      // correctness against `_batch_subsets`'s multi-decomposition refusal.
      return {
        kind: "queued",
        deposit: d,
        reason: "collision",
        basis: `No single open invoice is ${usdCents(d.cents)}, but a combination of open invoices is, so nothing is applied automatically.`,
        candidates: openSameClient,
      };
    }
    const paidSameAmount = [...paidNumbers]
      .map((n) => invList.find((i) => i.number === n))
      .find((i): i is DemoInvoice => Boolean(i) && i!.clientId === d.counterpartyId && i!.totalCents === d.cents);
    if (paidSameAmount) {
      return {
        kind: "queued",
        deposit: d,
        reason: "unexplained",
        basis: `${paidSameAmount.number} already paid this amount. Nothing open matches, so it is left for a person.`,
        candidates: openSameClient,
      };
    }
    return {
      kind: "queued",
      deposit: d,
      reason: "no-exact-amount",
      basis: `No open invoice for this client is ${usdCents(d.cents)}.`,
      candidates: openSameClient,
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
  get queued() {
    return this.outcomes.filter((o): o is Extract<MatchOutcome, { kind: "queued" }> => o.kind === "queued");
  },
} as const;

function invariant(ok: boolean, msg: string): void {
  if (!ok) throw new Error(`[deposit matcher fixture] ${msg} (spec-BO.md §3.5; review-BO.md)`);
}

// The captions promise these exact counts; if the data stops producing them,
// fail the build rather than ship a stage that contradicts its own story.
invariant(fixture.paid.length === 3, `expected 3 clean matches, got ${fixture.paid.length}`);
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
  fixture.queued.filter((q) => q.reason === "unexplained").length === 1,
  `expected exactly 1 unexplained row, got ${fixture.queued.filter((q) => q.reason === "unexplained").length}`,
);
// Review MEDIUM-3: d7's "no open invoice for this client is this amount"
// must be checked against a genuinely open invoice, not a vacuous empty pool.
const noExactAmountRow = fixture.queued.find((q) => q.reason === "no-exact-amount");
invariant(
  Boolean(noExactAmountRow && noExactAmountRow.candidates.length >= 1),
  "the no-exact-amount row must have at least one open same-client invoice to compare against",
);
// The collision must be a genuine subset-sum decomposition (>= 2 OTHER
// invoices besides the exact match), never a same-amount pair (review HIGH-1).
const collisionRow = fixture.queued.find((q) => q.reason === "collision");
invariant(Boolean(collisionRow && collisionRow.candidates.length >= 3), "the collision needs an exact match plus >= 2 decomposing invoices");
invariant(
  sumCents(fixture.paid.map((o) => o.deposit.cents)) === sumCents(fixture.paid.map((o) => o.invoice.totalCents)),
  "a paid deposit's cents must equal the invoice it paid",
);
invariant(sumCents(invoices.map((i) => i.totalCents)) === 1_507_500, "the eight invoices must sum to $15,075.00");

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
        "Deposits arrive, two are matched cleanly to a single invoice each, one amount matches an " +
        "invoice exactly but also a combination of two smaller ones and is held rather than guessed, " +
        "one deposit is still pending at the bank, one names no client the system recognizes, one " +
        "matches no open invoice for its client, and one repeats an amount already paid and is left " +
        "unexplained. The clients, invoices, and bank rows shown are an invented demonstration.",
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
          { caption: "A third deposit matches an invoice exactly, and also two smaller ones combined." },
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
            title: "A deposit that matches no open invoice for its client.",
            caption: "No open invoice for this client is this amount.",
          },
          {
            id: "unexplained",
            title: "A deposit that repeats one already paid.",
            caption: "It matches no open invoice, so it's left for a person to explain.",
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
