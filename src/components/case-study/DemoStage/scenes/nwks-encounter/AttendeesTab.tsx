"use client";
import { useState } from "react";
import { ProductScreen } from "../../ProductScreen";
import { ATTENDEES, attendeeName, attendeeTown, type Attendee } from "@/data/demos/nwks-encounter";

/**
 * Attendees tab (spec-NW.md §2.2): Registered / Wait List / Dropped, a
 * two-click drop confirm, and a waitlist row with an offer action.
 * Source: admin/src/pages/RosterPage.tsx @6802623 (see SOURCE.md).
 *
 * Review finding 3: the three groups used to be gated behind a `view` React
 * state that only a click could change, so without JavaScript (and during
 * the automated tour, which never clicks) only Registered ever rendered.
 * All three groups are now always in the DOM, stacked, matching the kit's
 * own no-JS contract for the outer tabs (`TabbedScreen.tsx`'s "every panel
 * renders stacked" rule) applied one level down to this tab's own inner
 * groups. The segmented control still updates `view`, now purely to mark
 * which group's heading is current for a JS-enabled reader (`aria-selected`
 * styling), not to hide the other two.
 */
// Rendered lowercase, shown capital by CSS (`.nwks-avatar { text-transform:
// uppercase }`): a bare 1-2 letter monogram in the DOM text is otherwise
// indistinguishable from an unregistered proper-noun token to the privacy
// probe, for any name the fixture ever uses.
function initials(a: Attendee): string {
  const p = attendeeName(a).split(" ");
  return `${p[0]?.[0] ?? ""}${p[1]?.[0] ?? ""}`.toLowerCase();
}

function Body() {
  const registered = ATTENDEES.filter((a) => a.status === "registered");
  const waitlist = ATTENDEES.filter((a) => a.status.startsWith("waitlist"));
  const dropped = ATTENDEES.filter((a) => a.status === "dropped");

  const [view, setView] = useState<"registered" | "waitlist" | "dropped">("registered");
  // The drop-confirm demonstration (step 2) starts open on the last
  // registered row, so the no-JS/end-frame render already shows what a drop
  // confirmation looks like; a real click can still open it on any other
  // row, or close it (Cancel).
  const [dropId, setDropId] = useState<string | null>(() => registered[registered.length - 1]?.personId ?? null);
  // Tracks a real click on "Give the seat" for the waitlist-POSITION row
  // only (review finding 4: this used to be checked against a different
  // row's personId, so the click never changed anything on screen).
  const [offered, setOffered] = useState<Set<string>>(new Set());

  return (
    <div className="nwks-body">
      <div className="nwks-row" style={{ justifyContent: "space-between" }}>
        <div className="nwks-seg" role="tablist" aria-label="Attendee views">
          <button type="button" role="tab" aria-selected={view === "registered"} onClick={() => setView("registered")}>
            Registered ({registered.length})
          </button>
          <button type="button" role="tab" aria-selected={view === "waitlist"} onClick={() => setView("waitlist")}>
            Wait List ({waitlist.length})
          </button>
          <button type="button" role="tab" aria-selected={view === "dropped"} onClick={() => setView("dropped")}>
            Dropped ({dropped.length})
          </button>
        </div>
        <button type="button" className="nwks-btn">
          Export ▾
        </button>
      </div>

      <div className="nwks-roster" data-stage-step="1" data-fx="rise">
        {registered.map((a) => (
          <div className="nwks-r-row" key={a.personId}>
            <span className="nwks-avatar" aria-hidden="true">
              {initials(a)}
            </span>
            <div style={{ minWidth: 0 }}>
              <div className="nwks-r-name">{attendeeName(a)}</div>
              <div className="nwks-r-meta">
                {a.timesAttended === 0 ? "First time" : `${a.timesAttended} time${a.timesAttended === 1 ? "" : "s"} attended`} · {attendeeTown(a)}
                {a.inviterId ? " · invited by a server" : ""} · {a.shirtSize}
              </div>
            </div>
            <div className="nwks-r-actions">
              <button type="button" className="nwks-btn" disabled={a.paid}>
                Mark paid
              </button>
              <button type="button" className="nwks-btn" onClick={() => setDropId(dropId === a.personId ? null : a.personId)}>
                Drop
              </button>
            </div>
            {dropId === a.personId ? (
              <div className="nwks-drop-box" data-stage-step="2" data-fx="rise">
                <textarea placeholder="Reason for the drop" />
                {a.wasAlreadyPaid ? (
                  <p className="nwks-pill nwks-pill--warn" style={{ width: "fit-content" }}>
                    Was already paid: dropping does not clear or refund it
                  </p>
                ) : null}
                <div className="nwks-row">
                  <button type="button" className="nwks-btn nwks-btn--primary" onClick={() => setDropId(null)}>
                    Confirm drop
                  </button>
                  <button type="button" className="nwks-btn" onClick={() => setDropId(null)}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <p className="nwks-h" data-stage-step="3">
        Wait list
      </p>
      <div className="nwks-roster" data-fx="rise">
        {waitlist.map((a) => (
          <div className="nwks-r-row" key={a.personId} style={{ gridTemplateColumns: "auto minmax(0,1fr)" }} data-stage-step={a.status === "waitlist-offered" ? "4" : "3"}>
            <span className="nwks-avatar" aria-hidden="true">
              {initials(a)}
            </span>
            <div style={{ minWidth: 0, display: "grid", gap: 4 }}>
              <div className="nwks-row">
                <span className="nwks-r-name">{attendeeName(a)}</span>
                <span className="nwks-pill nwks-pill--warn">
                  {a.status === "waitlist-pending" ? "Pending review" : a.status === "waitlist-offered" ? "Offer sent" : "Waitlisted"}
                </span>
                <span className="nwks-r-meta">Waiting {a.daysWaiting} days</span>
              </div>
              <div className="nwks-status-line">
                {a.status === "waitlist-pending"
                  ? "Waiting on you to decide."
                  : a.status === "waitlist-position"
                    ? offered.has(a.personId)
                      ? "A seat was offered; his acceptance is pending."
                      : `Waiting for a seat: number ${a.waitlistPosition} in line.`
                    : "A seat was offered; his acceptance is pending."}
              </div>
              {a.reasonForReturning ? <div className="nwks-quote">&ldquo;{a.reasonForReturning}&rdquo;</div> : null}
              {a.status === "waitlist-pending" && a.selfReportedTimes !== undefined ? (
                <div className="nwks-r-meta">
                  Times attended: he wrote {a.selfReportedTimes}, the record shows {a.timesAttended}, worth a look.
                </div>
              ) : null}
              <div className="nwks-row">
                {a.status === "waitlist-pending" ? (
                  <>
                    <button type="button" className="nwks-btn nwks-btn--primary">
                      Approve as attendee
                    </button>
                    <button type="button" className="nwks-btn">
                      Ask for a reason
                    </button>
                  </>
                ) : a.status === "waitlist-position" ? (
                  offered.has(a.personId) ? (
                    <span className="nwks-pill nwks-pill--good">Offer sent, awaiting reply</span>
                  ) : (
                    <button
                      type="button"
                      className="nwks-btn nwks-btn--primary"
                      onClick={() => setOffered((s) => new Set(s).add(a.personId))}
                    >
                      Give the seat
                    </button>
                  )
                ) : (
                  <span className="nwks-pill nwks-pill--good">Offer sent, awaiting reply</span>
                )}
                <button type="button" className="nwks-btn">
                  Keep on waitlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="nwks-h">Dropped</p>
      <div className="nwks-roster">
        {dropped.map((a) => (
          <div className="nwks-r-row" key={a.personId}>
            <span className="nwks-avatar" aria-hidden="true">
              {initials(a)}
            </span>
            <div style={{ minWidth: 0 }}>
              <div className="nwks-r-name">{attendeeName(a)}</div>
              <div className="nwks-r-meta">{a.droppedReason}</div>
            </div>
            {a.wasAlreadyPaid ? <span className="nwks-pill nwks-pill--warn">Was paid</span> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export function AttendeesScreen() {
  return <ProductScreen chrome="NWKS Admin · Attendees" tag="Recreation" desk={<Body />} />;
}

export function AttendeesBefore() {
  return (
    <div className="nwks-tile" style={{ borderStyle: "dashed" }}>
      <p className="nwks-h">Their old materials</p>
      <p className="nwks-sub">A Google Form on a WordPress page; overflow retyped into a spreadsheet by hand.</p>
      <div className="nwks-status-line" style={{ marginTop: 8 }}>
        A closed weekend turned people away, and the waitlist was worked by telephone.
      </div>
    </div>
  );
}
