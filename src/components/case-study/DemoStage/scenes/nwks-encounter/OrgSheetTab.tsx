"use client";
import { useState, type ReactNode } from "react";
import { ProductScreen } from "../../ProductScreen";
import { TEAMS, SERVERS, ORG_RULE_HEADS, ORG_END_HEAD, orgSheet, type Server, type Team } from "@/data/demos/nwks-encounter";
import { person } from "@/data/demos/_invented";

/**
 * Org Sheet tab (spec-NW.md §2.3), rebuilt to the approved strip frames
 * 03-10 (critic-NW B4): "Preisser speaks, NWKS shows".
 *   - Above the product window, in the page's own voice: the rule being
 *     applied (F-code tag, the rule's own wording, one qualitative line).
 *     At rest: "Every man placed. No trade team broken." and the four rules.
 *   - Inside the window, in NWKS's own styling: the Org sheet header (Teams
 *     view, the encounter and its dates), the lanes, and the "Not on a team
 *     yet" waiting column, which drains as each rule places its men.
 *   - Only the current rule's men carry their lane tint (frames 04-06).
 * Per-step text is a swap cell (.nwks-swap) whose variants show by the kit's
 * own `data-track-step` / `data-track-armed` attributes on the panel (the
 * track root); at rest and without JS the end variant shows, so the markup is
 * the end frame (ADR-0016 §3). Source: admin/src/pages/orgsheet/
 * {TeamBoard,TeamLane,PersonCard,PoolLane}.tsx @6802623 (see SOURCE.md).
 */
const STEPS = [0, 1, 2, 3, 4, 5, 6] as const;
/** Their board's masonry, balanced by hand on the final sizes (strip fixture.js `columns`). */
const COLUMNS: readonly (readonly string[])[] = [["t1", "t2", "t4"], ["t3", "t6", "5a"], ["fd", "5b", "5c"]];

function teamServers(teamId: string): Server[] {
  return SERVERS.filter((s) => s.teamId === teamId);
}

/** One variant of a swap cell: visible while armed at any of `at`, or at rest when `at` includes "end". */
function At({ at, children, className = "" }: { at: readonly (number | "end")[]; children: ReactNode; className?: string }) {
  return (
    <span className={`nwks-at ${className}`} data-at={at.join(" ")}>
      {children}
    </span>
  );
}

function Swap({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`nwks-swap ${className}`}>{children}</span>;
}

/** Steps (0..6) at which `pred(k)` holds, for variants keyed on a derived value. */
function stepsWhere(pred: (k: number) => boolean): number[] {
  return STEPS.filter((k) => pred(k));
}

// ── Preisser's voice, above the product window ─────────────────────────
function RuleHead() {
  return (
    <div className="nwks-rh">
      <Swap className="nwks-rh-swap">
        {ORG_RULE_HEADS.map((h) => (
          <At key={h.tag} at={h.at} className="nwks-rh-v">
            <span className="nwks-rh-kicker">{h.kicker}</span>
            <span className="nwks-rh-line">
              <span className="nwks-rh-tag">{h.tag}</span>
              <span className="nwks-rh-title">{h.title}</span>
            </span>
            <span className="nwks-rh-gloss">{h.gloss}</span>
          </At>
        ))}
        <At at={["end"]} className="nwks-rh-v">
          <span className="nwks-rh-kicker">The read</span>
          <span className="nwks-rh-line">
            <span className="nwks-rh-title">{ORG_END_HEAD.title}</span>
          </span>
          <span className="nwks-rh-rules">
            {ORG_END_HEAD.rules.map((r) => (
              <span key={r.tag} className="nwks-rh-rule">
                <span className="nwks-rh-code">{r.tag}</span> {r.text}
              </span>
            ))}
          </span>
        </At>
      </Swap>
    </div>
  );
}

// ── NWKS's own board ────────────────────────────────────────────────────
function OrgCard({ s }: { s: Server }) {
  const p = person(s.personId);
  const name = p.aliases?.length ? p.aliases[0] : p.full;
  return (
    <span className={`nwks-org-card${s.captain ? " nwks-org-card--captain" : ""}`} data-stage-step={s.step} data-fx="pop">
      <span className="nwks-org-name">{name}</span>
      <span className="nwks-org-marks" aria-hidden="true">
        <span className={s.captain ? "nwks-org-star nwks-org-star--on" : "nwks-org-star"}>{s.captain ? "★" : "☆"}</span>
        <span className="nwks-org-more">···</span>
      </span>
    </span>
  );
}

/** The lane's own count, as the board draws it, for the step being shown. */
function LaneCount({ t }: { t: Team }) {
  const finalN = teamServers(t.id).length;
  const values = Array.from(new Set(STEPS.map((k) => orgSheet.laneCountAt(t.id, k))));
  return (
    <Swap className="nwks-lane-count">
      {values.map((n) => (
        <At key={n} at={[...stepsWhere((k) => orgSheet.laneCountAt(t.id, k) === n), ...(n === finalN ? (["end"] as const) : [])]}>
          {n}
        </At>
      ))}
    </Swap>
  );
}

function Lane({ t }: { t: Team }) {
  const men = teamServers(t.id);
  const firstStep = Math.min(...men.map((s) => s.step));
  return (
    <div className="nwks-lane" style={{ ["--nw-lane-hue" as string]: `var(--nw-team-${t.hue})` }}>
      <div className="nwks-lane-head">
        <div className="nwks-lane-name">{t.name}</div>
        <div className="nwks-lane-job">
          {t.job ? <span>{t.job}</span> : null}
          <span aria-hidden="true"> · </span>
          <LaneCount t={t} />
        </div>
      </div>
      {firstStep > 1 ? (
        <p className="nwks-atd nwks-lane-empty" data-at={stepsWhere((k) => k < firstStep).join(" ")}>
          Nobody here yet. Drag a name in from <b>Not on a team yet</b>.
        </p>
      ) : null}
      <div className="nwks-lane-cards">
        {men.map((s) => (
          <OrgCard s={s} key={s.personId} />
        ))}
      </div>
    </div>
  );
}

/** "Not on a team yet": every server is in it before the read, and each leaves as his rule lands. */
function Waiting({ compact = false }: { compact?: boolean }) {
  const counts = Array.from(new Set(STEPS.map((k) => orgSheet.waitingAt(k))));
  const byHistory = [...SERVERS].sort((a, b) => b.timesServed - a.timesServed);
  return (
    <div className={`nwks-wait${compact ? " nwks-wait--compact" : ""}`}>
      <div className="nwks-wait-head">
        <span className="nwks-wait-kicker">Waiting</span>
        <span className="nwks-wait-title">Not on a team yet</span>
        <Swap className="nwks-wait-count">
          {counts.map((n) => (
            <At key={n} at={[...stepsWhere((k) => orgSheet.waitingAt(k) === n), ...(n === 0 ? (["end"] as const) : [])]}>
              {n} of {SERVERS.length} servers
            </At>
          ))}
        </Swap>
      </div>
      <div className="nwks-wait-find" aria-hidden="true">
        Find a name…
      </div>
      <div className="nwks-wait-list">
        {byHistory.map((s) => (
          <span className="nwks-wait-chip" key={s.personId} data-stage-until={s.step}>
            <span className="nwks-org-name">{person(s.personId).aliases?.[0] ?? person(s.personId).full}</span>
            <span className="nwks-wait-sub">{s.timesServed === 0 ? "first time serving" : `${s.timesServed} encounters`}</span>
          </span>
        ))}
      </div>
      <p className="nwks-atd nwks-wait-done" data-at={[...stepsWhere((k) => orgSheet.waitingAt(k) === 0), "end"].join(" ")}>
        Everyone registered to serve is standing on a team.
      </p>
    </div>
  );
}

function TableIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M4 10h16M10 10v9" />
    </svg>
  );
}

function OrgHeader() {
  return (
    <div className="nwks-org-head">
      <div className="nwks-org-id">
        <span className="nwks-org-icon">
          <TableIcon />
        </span>
        <span className="nwks-org-titles">
          <span className="nwks-org-kicker">Org sheet</span>
          <span className="nwks-org-title">Men&apos;s Encounter 2027</span>
          <span className="nwks-org-dates">2027-04-01 – 2027-04-03</span>
        </span>
      </div>
      <div className="nwks-org-tools" aria-hidden="true">
        <span className="nwks-org-toggle">
          <span className="nwks-org-toggle-on">Teams</span>
          <span>Master schedule</span>
        </span>
        <span className="nwks-org-tool nwks-desk-only">Print</span>
        <span className="nwks-org-tool nwks-desk-only">Email</span>
      </div>
    </div>
  );
}

function DupCheck() {
  const misspelled = person("srv-gus-pemberdahl");
  // The record's own history, not a typed literal (review finding 1): the
  // correctly spelled record's `timesServed` from the fixture, via a getter.
  const record = SERVERS.find((s) => s.personId === "srv-gus-pemberdahl") as Server;
  const times = record.timesServed;
  return (
    <div className="nwks-dup-card" data-stage-step="6" data-fx="rise">
      <p className="nwks-h">The system checks its own sheet</p>
      <div className="nwks-dup-chip-row">
        <span className="nwks-pill">{misspelled.aliases?.[0]}, first time serving</span>
        <span aria-hidden="true">→</span>
        <span className="nwks-pill nwks-pill--good">
          {misspelled.full}, {times} record{times === 1 ? "" : "s"} on file
        </span>
      </div>
      <p className="nwks-sub">Listed for a person to settle. It never merges on its own.</p>
    </div>
  );
}

function Body() {
  return (
    <div className="nwks-body nwks-org">
      <OrgHeader />
      <div className="nwks-board">
        <div className="nwks-board-lanes">
          <div className="nwks-tiles-cols">
            {COLUMNS.map((col) => (
              <div className="nwks-tiles-col" key={col.join("-")}>
                {col.map((id) => (
                  <Lane t={TEAMS.find((t) => t.id === id) as Team} key={id} />
                ))}
              </div>
            ))}
          </div>
          <DupCheck />
        </div>
        <Waiting />
      </div>
    </div>
  );
}

function PhoneSwitcher() {
  const [active, setActive] = useState(TEAMS[0].id);
  const team = TEAMS.find((t) => t.id === active) as Team;
  return (
    <div>
      <div className="nwks-switch-pills" aria-label="Teams">
        {TEAMS.map((t) => (
          <button
            key={t.id}
            type="button"
            aria-pressed={t.id === active}
            className="nwks-switch-pill"
            style={{ ["--nw-lane-hue" as string]: `var(--nw-team-${t.hue})` }}
            onClick={() => setActive(t.id)}
          >
            {t.code === "FOOD" ? "FOOD TEAM" : `TEAM ${t.code}`}
          </button>
        ))}
      </div>
      <Lane t={team} />
    </div>
  );
}

function PhoneBody() {
  return (
    <div className="nwks-body nwks-org">
      <OrgHeader />
      <Waiting compact />
      <PhoneSwitcher />
      <DupCheck />
    </div>
  );
}

export function OrgSheetScreen() {
  return (
    <div className="nwks-orgstage">
      <RuleHead />
      <ProductScreen chrome="NWKS Admin · Org Sheet" tag="Recreation · demonstration data" desk={<Body />} phone={<PhoneBody />} />
    </div>
  );
}

export function OrgSheetBefore() {
  return (
    <div className="nwks-tile" style={{ borderStyle: "dashed" }}>
      <p className="nwks-h">Their old materials</p>
      <p className="nwks-sub">A static workbook re-typed each cycle, names hand-keyed into a spare column so somebody had something to drag from.</p>
    </div>
  );
}
