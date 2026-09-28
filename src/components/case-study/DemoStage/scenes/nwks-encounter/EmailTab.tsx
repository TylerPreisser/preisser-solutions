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
  // Starts true (review finding 3): step 4's caption is "a confirmation
  // follows," but the confirmation used to be gated behind a real click,
  // which no-JS and the automated tour can never make, so step 4 had no
  // element that changes. The confirmation is now the resting/end-frame
  // state, matching every other tab's own end-state-first convention; the
  // button still works, it just has nothing left to reveal.
  const [sent, setSent] = useState(true);

  const count = email.audienceCount(who, Array.from(selectedTowns));

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
            {/* Real merge-field tokens, no inner spaces (review finding 11,
                emailTokens.ts@6802623:43-47: {{first_name}}, {{event_title}},
                {{start_date}}, {{end_date}}). `{{ encounter_dates }}`, a token
                the product does not ship, is gone. */}
            <span className="nwks-field-pill" data-stage-step="2" data-fx="pop">
              {"{{first_name}}"}
            </span>
            <span className="nwks-field-pill">{"{{launch_point}}"}</span>
            <span className="nwks-field-pill">{"{{start_date}}"}</span>
            <span className="nwks-field-pill">{"{{end_date}}"}</span>
          </div>
          <div className="nwks-letter-band">
            <div className="nwks-letter-brand">Men&apos;s Encounter 2027</div>
            <div className="nwks-letter-body">
              <p>Dear {"{{first_name}}"},</p>
              <p>
                Your launch point is {"{{launch_point}}"}. See you {"{{start_date}}"} to {"{{end_date}}"}.
              </p>
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
          <p className="nwks-audience-count">
            This email goes to{" "}
            {/* Keyed on the count itself (review finding 5): the kit's counter
                overwrites this node's `textContent` directly, bypassing React,
                so a stale count would otherwise survive a later, un-animated
                change (toggling a town/audience control). A new key forces a
                fresh DOM node per value, so the node's own text is always
                already the current formatted value, matching the contract. */}
            <span key={count} data-stage-step="3" data-count-to={count}>
              {count}
            </span>{" "}
            people
          </p>
          <div className="nwks-row" style={{ marginTop: 10 }}>
            <button type="button" className="nwks-btn nwks-btn--primary" onClick={() => setSent(true)}>
              Send to {count} people
            </button>
            <button type="button" className="nwks-btn">
              Schedule this send…
            </button>
          </div>
          {sent ? (
            <p className="nwks-pill nwks-pill--good" data-stage-step="4" data-fx="rise">
              Send confirmed (demonstration only, no message leaves this recreation)
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function EmailScreen() {
  return <ProductScreen chrome="NWKS Admin · Email" tag="Recreation" desk={<Body />} />;
}
