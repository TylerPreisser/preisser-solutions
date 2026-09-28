import { ProductScreen } from "../../ProductScreen";
import { StepNote } from "./StepNote";
import {
  CABIN_RESIDENTS,
  CABIN_PARTIES,
  CABIN_UNPLACED,
  CABIN_HAND_PLACED_ID,
  CABIN_SIDE_CAPACITY,
  CABIN_BUNKS_PER_SIDE,
  cabins,
  cabinResidentName,
  attendeeName,
  type CabinResident,
} from "@/data/demos/nwks-encounter";

/**
 * Cabins tab (spec-NW.md §2.4; critic-NW M7): ONE cabin drawn as their floor
 * plan seen from above (rooms/CabinCard.tsx @6802623): a gabled roof, the
 * "CABIN 1 · 20/20" header with its lock, the L and R halves either side of
 * the centre divide, five bunks a side with a lower and an upper bed, and the
 * door. Servers are gold circles, attendees square plates; a party (an
 * attendee and the server who invited him) shares a bunk and a pin. The one
 * man pending review waits in "Still to place". A stage simplification from
 * the real 6-cabin/144-bed board (SOURCE.md).
 *
 * Every bed slot is drawn at every step, so before the draft the plan reads
 * as an empty cabin rather than a hole; each name pops into its slot.
 */
const HAND = CABIN_RESIDENTS.find((r) => r.id === CABIN_HAND_PLACED_ID) as CabinResident;
const WAITING = CABIN_UNPLACED[0];

/** The step each resident's bed fills at (the draft, or the one move by hand). */
const stepOf = (r: CabinResident) => (r.id === HAND.id ? 4 : 2);
const STEPS = [0, 1, 2, 3, 4, 5] as const;

/**
 * A bed count as the board draws it at each step: 0/20 on the empty cabin,
 * then what the draft filled, then full. Variants share one cell and key on
 * the kit's own track attributes (the .nwks-at rules in nwks-admin.css), so
 * at rest and without JS only the end count renders.
 */
function BedCount({ of, cap }: { of: readonly CabinResident[]; cap: number }) {
  const at = (k: number) => of.filter((r) => stepOf(r) <= k).length;
  const values = Array.from(new Set(STEPS.map(at)));
  return (
    <span className="nwks-swap">
      {values.map((n) => (
        <span key={n} className="nwks-at" data-at={[...STEPS.filter((k) => at(k) === n), ...(n === of.length ? ["end"] : [])].join(" ")}>
          {n}/{cap}
        </span>
      ))}
    </span>
  );
}

/** One pin colour per party, in board order, from the product's own team ramp. */
const PIN = new Map(CABIN_PARTIES.map((p, i) => [p.server, i % 8]));

// Lowercase, shown capital by CSS (see AttendeesTab.tsx's `initials` for why).
function initials(name: string): string {
  const p = name.split(" ");
  return `${p[0]?.[0] ?? ""}${p[1]?.[0] ?? ""}`.toLowerCase();
}

function Bed({ r }: { r: CabinResident | undefined }) {
  if (!r) return <span className="nwks-berth nwks-berth--open" />;
  const name = cabinResidentName(r);
  return (
    <span className="nwks-berth">
      <span
        className={`nwks-plate nwks-plate--${r.kind}`}
        data-stage-step={stepOf(r)}
        data-fx="pop"
        style={{ transitionDelay: `${(r.bunk * 2 + (r.berth === "upper" ? 1 : 0)) * 35}ms` }}
        title={name}
      >
        {initials(name)}
        {r.party ? (
          <i className="nwks-pin" style={{ ["--nw-pin" as string]: `var(--nw-team-${PIN.get(r.party)})` }} />
        ) : null}
      </span>
    </span>
  );
}

function Side({ side }: { side: "L" | "R" }) {
  const here = cabins.sideResidents(side);
  return (
    <div className="nwks-cabin-half">
      <p className="nwks-cabin-half-h">
        <b>{side}</b>
        <BedCount of={here} cap={CABIN_SIDE_CAPACITY} />
      </p>
      {Array.from({ length: CABIN_BUNKS_PER_SIDE }).map((_, bunk) => (
        <div className="nwks-bunk" key={bunk}>
          <Bed r={here.find((r) => r.bunk === bunk && r.berth === "lower")} />
          <Bed r={here.find((r) => r.bunk === bunk && r.berth === "upper")} />
        </div>
      ))}
    </div>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="7" width="10" height="7" rx="1.5" />
      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
    </svg>
  );
}

function CabinPlan() {
  return (
    <div className="nwks-cabin">
      <svg className="nwks-cabin-roof" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
        <polyline points="1,9.5 50,1 99,9.5" fill="none" stroke="currentColor" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      </svg>
      <p className="nwks-cabin-h">
        <span>Cabin 1</span>
        <span className="nwks-cabin-n">
          <BedCount of={CABIN_RESIDENTS} cap={cabins.totalBeds} />
        </span>
        <LockIcon />
      </p>
      <div className="nwks-cabin-walls">
        <Side side="L" />
        <span className="nwks-cabin-divide" aria-hidden="true" />
        <Side side="R" />
        <span className="nwks-cabin-door" aria-hidden="true" />
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
      <StepNote tab="cabins" k={1} />
      <div className="nwks-row nwks-desk-only">
        <button type="button" className="nwks-btn">
          Rerun cabin assignment
        </button>
        <button type="button" className="nwks-btn">
          Cabin assignment sheet
        </button>
      </div>
      <div className="nwks-cabin-wrap">
        <div className="nwks-cabin-board">
        <CabinPlan />
        <div className="nwks-cabin-side">
          <StepNote tab="cabins" k={2} />
          {/* "Still to place": their centre panel (spec-NW.md §2.4). Each
              swap cell (.nwks-swapb) holds a before-state line and the thing
              that replaces it in one grid cell, so the panel never rests as a
              blank band while the story plays (lane NW5 item 4). */}
          <div className="nwks-still-panel">
            <p className="nwks-h">Still to place</p>
            <div className="nwks-swapb">
              <p className="nwks-sub" data-stage-until="3">
                The draft goes first.
              </p>
              <div className="nwks-still-list" data-stage-step="3" data-fx="rise">
                <span className="nwks-still-row">
                  <span className="nwks-org-card">{attendeeName(WAITING)}</span>
                  <span className="nwks-pill nwks-pill--warn">pending review</span>
                </span>
                {/* The man placed by hand: here until his move lands, faded
                    ("in your hand", legend.tsx) while it does. */}
                <span className="nwks-still-row nwks-still-hand" data-stage-until="5">
                  <span className="nwks-org-card">{cabinResidentName(HAND)}</span>
                  <span className="nwks-pill">no bed yet</span>
                </span>
              </div>
            </div>
            <StepNote tab="cabins" k={3} />
            <StepNote tab="cabins" k={4} />
            <div className="nwks-swapb">
              <p className="nwks-sub" data-stage-until="5">
                Drag a name onto any open bed.
              </p>
              <p className="nwks-sub" data-stage-step="5">
                Everyone confirmed has a bed.
              </p>
            </div>
            <StepNote tab="cabins" k={5} />
          </div>
          <div className="nwks-legend">
            <span>
              <i className="nwks-legend-mark nwks-plate--server" />
              Server
            </span>
            <span>
              <i className="nwks-legend-mark nwks-plate--attendee" />
              Attendee
            </span>
            <span>
              <i className="nwks-legend-mark nwks-legend-pin" />
              Same pin: came together
            </span>
            <span>Faded: still in your hand</span>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export function CabinsScreen() {
  return <ProductScreen chrome="NWKS Admin · Cabins" tag="Recreation" desk={<Body />} />;
}
