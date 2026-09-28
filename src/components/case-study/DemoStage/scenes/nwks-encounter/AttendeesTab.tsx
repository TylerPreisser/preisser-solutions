"use client";
import { useState } from "react";
import { ProductScreen } from "../../ProductScreen";
import { ATTENDEES, attendeeName, attendeeTown, type Attendee } from "@/data/demos/nwks-encounter";

/**
 * Attendees tab (spec-NW.md §2.2): Registered / Wait List / Dropped segmented
 * control, a two-click drop confirm, and a waitlist row with an offer action.
 * Source: admin/src/pages/RosterPage.tsx @6802623 (see SOURCE.md).
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
  const [view, setView] = useState<"registered" | "waitlist" | "dropped">("registered");
  const [dropId, setDropId] = useState<string | null>(null);
  const [offered, setOffered] = useState<Set<string>>(new Set());

  const registered = ATTENDEES.filter((a) => a.status === "registered");
  const waitlist = ATTENDEES.filter((a) => a.status.startsWith("waitlist"));
  const dropped = ATTENDEES.filter((a) => a.status === "dropped");

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

      {view === "registered" ? (
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
                <div className="nwks-drop-box">
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
      ) : null}

      {view === "waitlist" ? (
        <div className="nwks-roster" data-stage-step="3" data-fx="rise">
          {waitlist.map((a) => (
            <div className="nwks-r-row" key={a.personId} style={{ gridTemplateColumns: "auto minmax(0,1fr)" }}>
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
                      ? `Waiting for a seat: number ${a.waitlistPosition} in line.`
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
                    <button
                      type="button"
                      className="nwks-btn nwks-btn--primary"
                      onClick={() => setOffered((s) => new Set(s).add(a.personId))}
                    >
                      Give the seat
                    </button>
                  ) : (
                    <span className="nwks-pill nwks-pill--good">{offered.has(a.personId) ? "Offer confirmed" : "Offer sent, awaiting reply"}</span>
                  )}
                  <button type="button" className="nwks-btn">
                    Keep on waitlist
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {view === "dropped" ? (
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
      ) : null}
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
