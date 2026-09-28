"use client";
import { useState } from "react";
import { ProductScreen } from "../../ProductScreen";
import { EMAIL_TEMPLATES, EMAIL_SENDER, email, ATTENDEES } from "@/data/demos/nwks-encounter";
import { town } from "@/data/demos/_invented";

/**
 * Email tab (spec-NW.md §2.5): templates rail, the letter, and who this send
 * reaches. No real domain, no raster logo (ADR-0017 §5); the send is stubbed.
 * Source: admin/src/components/email/{EmailWorkbench,emailTokens}.tsx,
 * admin/src/pages/Email.tsx @6802623 (see SOURCE.md).
 */
const TOWN_IDS = Array.from(new Set(ATTENDEES.map((a) => a.townId)));

function Body() {
  const [tpl, setTpl] = useState<(typeof EMAIL_TEMPLATES)[number]["id"]>(EMAIL_TEMPLATES[0].id);
  const [who, setWho] = useState<"Everyone" | "Attendees" | "Servers">("Servers");
  const [selectedTowns, setSelectedTowns] = useState<Set<string>>(new Set(["aldervale"]));
  const [sent, setSent] = useState(false);

  const audience = Array.from(selectedTowns).flatMap((t) => email.audienceFor(t));
  const count = who === "Servers" ? audience.length : 0;

  return (
    <div className="nwks-body">
      <div className="nwks-email-cols">
        <div className="nwks-email-col" data-stage-step="1">
          <p className="nwks-h">You send these ({email.manualCount})</p>
          <p className="nwks-sub" style={{ marginBottom: 6 }}>
            BEFORE THE WEEKEND
          </p>
          {EMAIL_TEMPLATES.filter((t) => t.manual).map((t) => (
            <button key={t.id} type="button" className="nwks-tpl-item" aria-current={tpl === t.id} onClick={() => setTpl(t.id)}>
              {t.label}
            </button>
          ))}
          <p className="nwks-sub" style={{ marginTop: 10 }}>
            These send themselves ({email.automatedCount})
          </p>
          <p className="nwks-sub">Sent history</p>
        </div>

        <div className="nwks-email-col">
          <div className="nwks-letter-head">
            <span>From: {EMAIL_SENDER}</span>
            <span>To: the merged recipient</span>
            <span>Subject: {EMAIL_TEMPLATES.find((t) => t.id === tpl)?.label}</span>
          </div>
          <div className="nwks-row" style={{ margin: "8px 0" }}>
            <span className="nwks-seg">
              <button type="button" aria-pressed="true">
                Writing
              </button>
              <button type="button" aria-pressed="false">
                As they&apos;ll read it
              </button>
            </span>
          </div>
          <div className="nwks-row" style={{ marginBottom: 8 }}>
            <span className="nwks-field-pill" data-stage-step="2" data-fx="pop">
              {"{{ first_name }}"}
            </span>
            <span className="nwks-field-pill">{"{{ launch_point }}"}</span>
            <span className="nwks-field-pill">{"{{ encounter_dates }}"}</span>
          </div>
          <div className="nwks-letter-band">
            <div className="nwks-letter-brand">Men&apos;s Encounter 2027</div>
            <div className="nwks-letter-body">
              <p>Dear {"{{ first_name }}"},</p>
              <p>Your launch point is {"{{ launch_point }}"}. See you {"{{ encounter_dates }}"}.</p>
            </div>
          </div>
          <div className="nwks-row" style={{ marginTop: 8 }}>
            <button type="button" className="nwks-btn">
              Save changes
            </button>
            <button type="button" className="nwks-btn">
              Save as new template
            </button>
          </div>
        </div>

        <div className="nwks-email-col">
          <p className="nwks-h">Who this goes to</p>
          <div className="nwks-seg" style={{ marginTop: 6 }} data-stage-step="3">
            {(["Everyone", "Attendees", "Servers"] as const).map((w) => (
              <button key={w} type="button" aria-pressed={who === w} onClick={() => setWho(w)}>
                {w}
              </button>
            ))}
          </div>
          <p className="nwks-sub" style={{ marginTop: 10 }}>
            Launch points ({selectedTowns.size} of {TOWN_IDS.length})
          </p>
          <div className="nwks-toggle-grid" data-stage-step="3">
            {TOWN_IDS.map((id) => (
              <button
                key={id}
                type="button"
                className="nwks-toggle-chip"
                aria-pressed={selectedTowns.has(id)}
                onClick={() =>
                  setSelectedTowns((s) => {
                    const next = new Set(s);
                    if (next.has(id)) next.delete(id);
                    else next.add(id);
                    return next;
                  })
                }
              >
                {town(id).name}
              </button>
            ))}
          </div>
          <p className="nwks-sub" style={{ marginTop: 10 }}>
            Everyone else is left out of this send.
          </p>
          <p className="nwks-audience-count" data-stage-step="3" data-count-to={count}>
            This email goes to {count} people
          </p>
          <div className="nwks-row" style={{ marginTop: 10 }}>
            <button type="button" className="nwks-btn nwks-btn--primary" onClick={() => setSent(true)}>
              Send to {count} people
            </button>
            <button type="button" className="nwks-btn">
              Schedule this send…
            </button>
          </div>
          {sent ? <p className="nwks-pill nwks-pill--good">Send confirmed (demonstration only, no message leaves this recreation)</p> : null}
        </div>
      </div>
    </div>
  );
}

export function EmailScreen() {
  return <ProductScreen chrome="NWKS Admin · Email" tag="Recreation" desk={<Body />} />;
}

export function EmailBefore() {
  return (
    <div className="nwks-tile" style={{ borderStyle: "dashed" }}>
      <p className="nwks-h">Their old materials</p>
      <p className="nwks-sub">Recurring letters sent for a decade from Word documents on somebody&apos;s laptop, one at a time.</p>
    </div>
  );
}
