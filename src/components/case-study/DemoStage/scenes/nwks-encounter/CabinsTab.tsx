import { ProductScreen } from "../../ProductScreen";
import { CABIN_RESIDENTS, CABIN_LATE_IDS, CABIN_SIDE_CAPACITY, cabins, cabinResidentName } from "@/data/demos/nwks-encounter";

const LATE = new Set(CABIN_LATE_IDS);
const lateResidents = CABIN_RESIDENTS.filter((r) => LATE.has(r.id));

/**
 * Cabins tab (spec-NW.md §2.4): one cabin, two sides of 10 beds, a stage
 * simplification from the real 6-cabin/144-bed board (SOURCE.md). Source:
 * admin/src/pages/RoomsPage.tsx, rooms/{CabinCard,legend}.tsx @6802623.
 */
// Lowercase, shown capital by CSS (see AttendeesTab.tsx's `initials` for why).
function initials(name: string): string {
  const p = name.split(" ");
  return `${p[0]?.[0] ?? ""}${p[1]?.[0] ?? ""}`.toLowerCase();
}

function Side({ label, side }: { label: string; side: "L" | "R" }) {
  const beds = CABIN_RESIDENTS.filter((r) => r.side === side);
  const empties = Math.max(0, CABIN_SIDE_CAPACITY - beds.length);
  return (
    <div className="nwks-cabin-side">
      <p className="nwks-cabin-side-h">
        Side {label} · {beds.length}/{CABIN_SIDE_CAPACITY}
      </p>
      <div className="nwks-beds">
        {beds.map((r, i) => (
          <div
            className={`nwks-bed${r.kind === "server" ? " nwks-bed--server" : ""}`}
            key={r.id}
            data-stage-step={LATE.has(r.id) ? "4" : "2"}
            data-fx="pop"
            style={{ transitionDelay: `${i * 40}ms` }}
            title={cabinResidentName(r)}
          >
            {initials(cabinResidentName(r))}
          </div>
        ))}
        {Array.from({ length: empties }).map((_, i) => (
          <div className="nwks-bed nwks-bed--empty" key={`empty-${label}-${i}`}>
            ·
          </div>
        ))}
      </div>
    </div>
  );
}

function Body() {
  return (
    <div className="nwks-body">
      <p className="nwks-cabin-readiness" data-stage-step="1">
        {cabins.placed} confirmed people · {cabins.totalBeds} beds in camp · {cabins.stillPendingConfirmation} still pending
        review {cabins.stillPendingConfirmation === 1 ? "is" : "are"} not placed until confirmed
      </p>
      <div className="nwks-row">
        <button type="button" className="nwks-btn">
          Rerun cabin assignment
        </button>
        <button type="button" className="nwks-btn">
          Cabin assignment sheet
        </button>
      </div>
      <div className="nwks-cabin-plate">
        <Side label="L" side="L" />
        <Side label="R" side="R" />
      </div>

      <div className="nwks-still-panel">
        {/* Kept as a permanent panel label, matching the real product (spec-NW.md
            §2.4: "a list of unplaced people or 'Everyone has a bed'") — the panel
            heading stays even once the panel resolves; it never claims anyone is
            still unplaced by itself. */}
        <p className="nwks-h" data-stage-step="3">
          Still to place
        </p>
        {/* Before step 4 lands (the chip's own bed pops in, above): each chip is a
            before-state element, hidden at rest and after the move plays.
            `data-stage-until` only (never paired with `data-stage-step` on the
            same element): the engine's own e2e check reads computed visibility on
            every `[data-stage-step]`, and visibility inherited from a hidden
            `data-stage-until` ancestor would misreport as a bug (Expected/Found,
            kit gap; not patched here per the lane's "never patch the kit" rule). */}
        <div className="nwks-row">
          {lateResidents.map((r) => (
            <span className="nwks-org-card" key={r.id} data-stage-until="4">
              {cabinResidentName(r)}
            </span>
          ))}
        </div>
        <p className="nwks-sub" data-stage-step="5">
          Everyone has a bed.
        </p>
      </div>

      <div className="nwks-legend">
        <span>
          <span className="nwks-legend-dot" style={{ background: "var(--nw-brand)" }} />
          Server
        </span>
        <span>
          <span className="nwks-legend-dot" style={{ background: "var(--nw-wash)", border: "1px solid var(--nw-rule)" }} />
          Attendee
        </span>
        <span>
          <span className="nwks-legend-dot" style={{ border: "1px dashed var(--nw-rule)" }} />
          No bed left this side
        </span>
        <span>Faded: still in your hand</span>
      </div>
    </div>
  );
}

export function CabinsScreen() {
  return <ProductScreen chrome="NWKS Admin · Cabins" tag="Recreation" desk={<Body />} />;
}
