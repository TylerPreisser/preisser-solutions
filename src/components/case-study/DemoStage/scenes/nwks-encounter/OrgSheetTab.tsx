"use client";
import { useState } from "react";
import { ProductScreen } from "../../ProductScreen";
import { TEAMS, SERVERS, serverName, type Server } from "@/data/demos/nwks-encounter";
import { person } from "@/data/demos/_invented";

/**
 * Org Sheet tab (spec-NW.md §2.3): the Teams board, drafted from history,
 * plus the duplicate-name catch, told as the system checking its own sheet
 * (no audit screen, ADR-0017 §4). Source: admin/src/pages/orgsheet/
 * {TeamBoard,TeamLane,PersonCard,PoolLane}.tsx @6802623 (see SOURCE.md).
 */
function teamServers(teamId: string): Server[] {
  return SERVERS.filter((s) => s.teamId === teamId);
}

function OrgCard({ s }: { s: Server }) {
  const p = person(s.personId);
  const name = p.aliases?.length ? p.aliases[0] : p.full;
  return (
    <span className="nwks-org-card" data-stage-step={s.step} data-fx="pop">
      {s.captain ? <span className="nwks-org-star nwks-org-star--on">★</span> : <span className="nwks-org-star">☆</span>}
      {name}
    </span>
  );
}

function Tiles({ teams }: { teams: typeof TEAMS }) {
  return (
    <div className="nwks-tiles-grid">
      {teams.map((t) => (
        <div className="nwks-lane" key={t.id} style={{ ["--nw-lane-hue" as string]: `var(--nw-team-${t.hue})` }}>
          <div className="nwks-lane-name">
            {t.name}
            <span className="nwks-lane-count" aria-label={`${teamServers(t.id).length} servers`} data-stage-step="2" data-count-to={teamServers(t.id).length}>
              {teamServers(t.id).length}
            </span>
          </div>
          {t.job ? <div className="nwks-lane-job">{t.job}</div> : null}
          <div className="nwks-lane-cards">
            {teamServers(t.id).map((s) => (
              <OrgCard s={s} key={s.personId} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function PhoneSwitcher() {
  const [active, setActive] = useState(TEAMS[0].id);
  const team = TEAMS.find((t) => t.id === active) as (typeof TEAMS)[number];
  return (
    <div>
      <div className="nwks-switch-pills" role="tablist" aria-label="Teams" data-stage-scroller>
        {TEAMS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-current={t.id === active}
            aria-selected={t.id === active}
            className="nwks-switch-pill"
            onClick={() => setActive(t.id)}
          >
            {t.code} · {teamServers(t.id).length}
          </button>
        ))}
      </div>
      <div className="nwks-switch-lane" style={{ ["--nw-lane-hue" as string]: `var(--nw-team-${team.hue})` }}>
        <div className="nwks-lane-name">{team.name}</div>
        {team.job ? <div className="nwks-lane-job">{team.job}</div> : null}
        <div className="nwks-lane-cards">
          {teamServers(team.id).map((s) => (
            <OrgCard s={s} key={s.personId} />
          ))}
        </div>
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
      <p className="nwks-sub">
        Two spellings, one likely man. The system lists the pair for a person to settle; it never
        merges on its own.
      </p>
    </div>
  );
}

function Body() {
  return (
    <div className="nwks-body">
      <div className="nwks-org-toolbar">
        <span className="nwks-org-ready" data-stage-step="1">
          READY WHEN YOU OPENED IT: Teams {TEAMS.length} · Servers {SERVERS.length} · Days 3
        </span>
        <button type="button" className="nwks-btn">
          Print
        </button>
      </div>
      <Tiles teams={TEAMS} />
      <div className="nwks-pool">
        <p className="nwks-h">Not on a team yet</p>
        <p className="nwks-sub">Every man on the sheet has a team.</p>
      </div>
      <DupCheck />
    </div>
  );
}

function PhoneBody() {
  return (
    <div className="nwks-body">
      <span className="nwks-org-ready" data-stage-step="1">
        Teams {TEAMS.length} · Servers {SERVERS.length}
      </span>
      <PhoneSwitcher />
      <DupCheck />
    </div>
  );
}

export function OrgSheetScreen() {
  return <ProductScreen chrome="NWKS Admin · Org Sheet" tag="Recreation" desk={<Body />} phone={<PhoneBody />} />;
}

export function OrgSheetBefore() {
  return (
    <div className="nwks-tile" style={{ borderStyle: "dashed" }}>
      <p className="nwks-h">Their old materials</p>
      <p className="nwks-sub">A static workbook re-typed each cycle, names hand-keyed into a spare column so somebody had something to drag from.</p>
      <div className="nwks-status-line" style={{ marginTop: 8 }}>
        {serverName(SERVERS[0])}, the sheet&apos;s own captain, hand-listed above forty-nine other names.
      </div>
    </div>
  );
}
