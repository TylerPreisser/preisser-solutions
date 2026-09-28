"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
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
/** "27 of 48 placed" beside the rule headline (strip frames 04-07): a filter over the invented roster per step. */
function Placed() {
  const total = SERVERS.length;
  const values = Array.from(new Set(STEPS.map((k) => orgSheet.placedBy(k))));
  return (
    <span className="nwks-rh-placed">
      <Swap className="nwks-rh-placed-n">
        {values.map((n) => (
          <At key={n} at={[...stepsWhere((k) => orgSheet.placedBy(k) === n), ...(n === total ? (["end"] as const) : [])]}>
            {n}
          </At>
        ))}
      </Swap>{" "}
      of {total} placed
    </span>
  );
}

function RuleHead() {
  return (
    <div className="nwks-rh">
      <div className="nwks-rh-top">
        <Swap className="nwks-rh-kickers">
          {ORG_RULE_HEADS.map((h) => (
            <At key={h.tag} at={h.at} className="nwks-rh-kicker">
              {h.kicker}
            </At>
          ))}
          <At at={["end"]} className="nwks-rh-kicker">
            The read
          </At>
        </Swap>
        <Placed />
      </div>
      <Swap className="nwks-rh-swap">
        {ORG_RULE_HEADS.map((h) => (
          <At key={h.tag} at={h.at} className="nwks-rh-v">
            <span className="nwks-rh-line">
              <span className="nwks-rh-tag">{h.tag}</span>
              <span className="nwks-rh-title">{h.title}</span>
            </span>
            <span className="nwks-rh-gloss">{h.gloss}</span>
          </At>
        ))}
        <At at={["end"]} className="nwks-rh-v">
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
function LaneCount({ t, unit = false }: { t: Team; unit?: boolean }) {
  const finalN = teamServers(t.id).length;
  const values = Array.from(new Set(STEPS.map((k) => orgSheet.laneCountAt(t.id, k))));
  return (
    <Swap className="nwks-lane-count">
      {values.map((n) => (
        <At key={n} at={[...stepsWhere((k) => orgSheet.laneCountAt(t.id, k) === n), ...(n === finalN ? (["end"] as const) : [])]}>
          {unit ? `${n} ${n === 1 ? "man" : "men"}` : n}
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
        {/* A lane with no job (FOOD TEAM, nwks-encounter.ts TEAMS) has no
            separator to hang the count on; it reads "3 men" instead. */}
        <div className="nwks-lane-job">
          {t.job ? (
            <>
              <span>{t.job}</span>
              <span aria-hidden="true"> · </span>
              <LaneCount t={t} />
            </>
          ) : (
            <LaneCount t={t} unit />
          )}
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
        {/* The view toggle shows on a phone too (strip frame 10-phone); Print and Email stay desk-only. */}
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

function Finding({ misspelled, correct, times }: { misspelled: string; correct: string; times: number }) {
  return (
    <div className="nwks-dup-chip-row">
      <span className="nwks-pill">{misspelled}, first time serving</span>
      <span aria-hidden="true">→</span>
      <span className="nwks-pill nwks-pill--good">
        {correct}, {times} record{times === 1 ? "" : "s"} on file
      </span>
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
    <div className="nwks-dup-card">
      <p className="nwks-h">The system checks its own sheet</p>
      {/* Swap cell (lane NW5 item 4): until the check lands, the card says
          when it runs over an empty skeleton of the finding, the same pills
          drawn blank, so the board never rests over a blank band. */}
      <div className="nwks-swapb">
        <div className="nwks-dup-found nwks-dup-skel" data-stage-until="6">
          <Finding misspelled={misspelled.aliases?.[0] ?? ""} correct={misspelled.full} times={times} />
          <p className="nwks-sub">It runs once every man is placed.</p>
        </div>
        <div className="nwks-dup-found" data-stage-step="6" data-fx="rise">
          <Finding misspelled={misspelled.aliases?.[0] ?? ""} correct={misspelled.full} times={times} />
          <p className="nwks-sub">Listed for a person to settle. It never merges on its own.</p>
        </div>
      </div>
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

/**
 * The phone's lane switcher (critic-NW M1): it follows the read, showing the
 * lane the current rule touched most (orgSheet.laneFor), so each rule lands
 * where the visitor is looking; a tap picks any lane. It follows the kit's own
 * track attributes on the panel rather than duplicating the timeline. Every
 * lane stays in the DOM (the kit manages each chip's pending state; a lane
 * mounted later would miss it), and WITHOUT JS every lane renders stacked and
 * the pills (which would do nothing) are hidden, so all the men appear.
 */
function PhoneSwitcher() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [js, setJs] = useState(false);
  const [active, setActive] = useState(TEAMS[0].id);
  useEffect(() => {
    setJs(true);
    const root = ref.current?.closest("[data-track]");
    if (!root) return;
    const follow = () => {
      if (root.hasAttribute("data-track-armed")) setActive(orgSheet.laneFor(Number(root.getAttribute("data-track-step"))));
    };
    follow();
    const mo = new MutationObserver(follow);
    mo.observe(root, { attributes: true, attributeFilter: ["data-track-armed", "data-track-step"] });
    return () => mo.disconnect();
  }, []);
  const dupTeam = orgSheet.laneFor(6);
  return (
    <div ref={ref} className="nwks-switch" data-switch-js={js ? "" : undefined}>
      <div className="nwks-switch-pills" aria-label="Teams">
        {TEAMS.map((t) => (
          <button
            key={t.id}
            type="button"
            aria-pressed={t.id === active}
            className="nwks-switch-pill"
            data-touch={[...stepsWhere((k) => orgSheet.touchedAt(k).includes(t.id)), ...(t.id === dupTeam ? [6] : [])].join(" ")}
            style={{ ["--nw-lane-hue" as string]: `var(--nw-team-${t.hue})` }}
            onClick={() => setActive(t.id)}
          >
            {t.code === "FOOD" ? "FOOD TEAM" : `TEAM ${t.code}`} <LaneCount t={t} />
          </button>
        ))}
      </div>
      <div className="nwks-switch-lanes">
        {TEAMS.map((t) => (
          <div className="nwks-plane" key={t.id} data-on={t.id === active ? "" : undefined}>
            <Lane t={t} />
          </div>
        ))}
      </div>
    </div>
  );
}

function PhoneBody() {
  return (
    <div className="nwks-body nwks-org">
      <OrgHeader />
      <PhoneSwitcher />
      <Waiting compact />
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
