import { ProductScreen } from "../../ProductScreen";
import { StepNote } from "./StepNote";
import { dashboard, attendeeName, attendeeTown } from "@/data/demos/nwks-encounter";

/**
 * Dashboard tab (spec-NW.md §2.1): sign-up bands, six stat cards, payment,
 * attendee depth, recent registrations, by-launch-location, shirt sizes.
 * Source: admin/src/pages/DashboardPage.tsx @6802623 (see SOURCE.md).
 */
function Body() {
  const maxTown = Math.max(1, ...dashboard.byTown.map((t) => t.count));
  const maxDepth = Math.max(1, ...dashboard.depthBuckets.map((b) => b.count));
  return (
    <div className="nwks-body">
      <div className="nwks-row" data-stage-step="1">
        <span className="nwks-pill nwks-pill--warn">Attendee sign-ups · Full</span>
        <span className="nwks-pill nwks-pill--good">Server sign-ups · Open</span>
      </div>
      <StepNote tab="dashboard" k={1} />

      <div className="nwks-stat-grid" data-stage-step="2" data-fx="rise">
        <div className="nwks-stat">
          <div className="nwks-stat-n" data-stage-step="2" data-count-to={dashboard.attendeeCount}>
            {dashboard.attendeeCount}
          </div>
          <div className="nwks-stat-l">Attendees</div>
        </div>
        <div className="nwks-stat">
          <div className="nwks-stat-n" data-stage-step="2" data-count-to={dashboard.serverCount}>
            {dashboard.serverCount}
          </div>
          <div className="nwks-stat-l">Servers</div>
        </div>
        <div className="nwks-stat">
          <div className="nwks-stat-n" data-stage-step="2" data-count-to={dashboard.firstTimers}>
            {dashboard.firstTimers}
          </div>
          <div className="nwks-stat-l">First-timers</div>
        </div>
        <div className="nwks-stat">
          <div className="nwks-stat-n" data-stage-step="2" data-count-to={dashboard.dropped}>
            {dashboard.dropped}
          </div>
          <div className="nwks-stat-l">Dropped</div>
        </div>
        <div className="nwks-stat">
          <div className="nwks-stat-n" data-stage-step="2" data-count-to={dashboard.needsDecision}>
            {dashboard.needsDecision}
          </div>
          <div className="nwks-stat-l">Needs your decision</div>
        </div>
        <div className="nwks-stat">
          <div className="nwks-stat-n" data-stage-step="2" data-count-to={2}>
            2
          </div>
          <div className="nwks-stat-l">Dietary &amp; health notes</div>
        </div>
      </div>
      <StepNote tab="dashboard" k={2} />

      <div className="nwks-tiles">
        <div className="nwks-tile">
          <p className="nwks-h">Payment</p>
          <div className="nwks-bar-row" data-stage-step="1">
            <div className="nwks-bar-track">
              <div
                className="nwks-bar-fill"
                style={{ transform: `scaleX(${dashboard.paidByCard / Math.max(1, dashboard.attendeeCount)})` }}
              />
            </div>
          </div>
          <p className="nwks-sub">
            {dashboard.paidByCard} paid by card · {dashboard.unpaid} not yet paid
          </p>
        </div>
        <div className="nwks-tile">
          <p className="nwks-h">Attendee Depth</p>
          {dashboard.depthBuckets.map((b) => (
            <div className="nwks-bar-row" key={b.label} data-stage-step="3" data-fx="sweep">
              <span>{b.label}</span>
              <span className="nwks-stat-l">{b.count}</span>
              <div className="nwks-bar-track">
                <div className="nwks-bar-fill" style={{ transform: `scaleX(${b.count / maxDepth})` }} />
              </div>
            </div>
          ))}
          <button type="button" className="nwks-btn" style={{ marginTop: 8 }}>
            Review returning attendees
          </button>
        </div>
      </div>
      <StepNote tab="dashboard" k={3} />

      <div className="nwks-tiles">
        <div className="nwks-tile">
          <p className="nwks-h">Recent Registrations</p>
          {/* Four distinct rows from the fixture (critic-NW M5): the man, his
              role chip, and two facts from his own record. */}
          <div className="nwks-recent">
            {dashboard.recentRegistrations.map((a, i) => (
              <div className="nwks-recent-row" key={a.personId} data-stage-step="2" data-fx="rise" style={{ transitionDelay: `${i * 60}ms` }}>
                <span className="nwks-r-name">{attendeeName(a)}</span>
                <span className="nwks-pill">Attendee</span>
                <span className="nwks-r-meta">
                  {attendeeTown(a)} · {a.timesAttended === 0 ? "first time" : "returning"}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="nwks-tile">
          <p className="nwks-h">By Launch Location</p>
          {dashboard.byTown.map((t) => (
            <div className="nwks-bar-row" key={t.id} data-stage-step="4" data-fx="sweep">
              <span>{t.name}</span>
              <span className="nwks-stat-l">{t.count}</span>
              <div className="nwks-bar-track">
                <div className="nwks-bar-fill" style={{ transform: `scaleX(${t.count / maxTown})` }} />
              </div>
            </div>
          ))}
          <p className="nwks-sub" data-stage-step="4">
            Counts every attendee who has not dropped, by the launch point on their own record.
          </p>
        </div>
      </div>
      <StepNote tab="dashboard" k={4} />

      <div className="nwks-tile" data-stage-step="4">
        <p className="nwks-h">Shirt Sizes</p>
        <div className="nwks-row" style={{ marginTop: 6 }}>
          {dashboard.shirtSizes.map((s) => (
            <span className="nwks-pill" key={s.size}>
              {s.size} · {s.count}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DashboardScreen() {
  return <ProductScreen chrome="NWKS Admin · Dashboard" tag="Recreation" desk={<Body />} />;
}
