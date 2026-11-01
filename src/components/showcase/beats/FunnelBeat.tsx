"use client";

import { useId, type CSSProperties } from "react";
import type { Funnel, FunnelBeat as FunnelBeatData } from "@/data/showcase/types";
import { Fit, Mark, PortalFrame, RailGlyph, TopBar, useCount, useSteps, type BeatProps, type FocusRect } from "./shared";

/**
 * The MarCommand Overview (marcommand-marketing-engine packages/portal-ui
 * overview/*, rendered on its harness with the hays-measured fixture and the
 * Duffer organic sample, 2026-11-01): the stage band of numbers, the cards on
 * the left rail, a stream from each card into the funnel, and the client's mark
 * where the funnel ends. Drawn at 960 x 600 css px and scaled as one picture;
 * the phone gets the same desktop composition with a camera that moves along it.
 */
export const W = 960;
export const H = 600;
const RAIL = { x: 24, w: 300, top: 166, bottom: 592 };
const BAND = { x0: 352, x1: 936 };
const SEAL = { x: 892, r: 44 };

/** How long the beat runs before the window moves on. */
export const funnelMs = (phone: boolean) => (phone ? 9200 : 6800);

function layout(f: Funnel, phone: boolean) {
  const n = f.rail.length;
  const step = Math.min(80, (RAIL.bottom - RAIL.top) / n);
  const cardH = step - 8;
  // Phone: a short rail sits right under the ad spend, so the opening shot is never a few cards in empty ground.
  const y0 = RAIL.top + (phone ? 0 : ((RAIL.bottom - RAIL.top) - step * n) / 2) + 4;
  const cy = (RAIL.top + RAIL.bottom) / 2;
  const colW = (BAND.x1 - BAND.x0) / f.stages.length;
  const colX = f.stages.map((_, i) => BAND.x0 + i * colW);
  // The funnel's rings stand at each stage after the first, shrinking toward the mark.
  const rings = colX.slice(1).map((x, i, all) => {
    const k = all.length === 1 ? 0 : i / (all.length - 1);
    return { x: x + 12, ry: 150 - k * 92, rx: 14 - k * 5 };
  });
  return { step, cardH, y0, cy, colW, colX, rings };
}

function ribbonPath(x0: number, y0: number, xe: number, ye: number, x1: number, y1: number) {
  return `M${x0},${y0} C${x0 + 120},${y0} ${xe - 110},${ye} ${xe},${ye} C${xe + 90},${ye} ${x1 - 90},${y1} ${x1},${y1}`;
}

export function FunnelBeat({ client, beat, variant, active, fill, reduced, quiet }: BeatProps<FunnelBeatData>) {
  const f = beat.funnel;
  const phone = variant === "phone";
  const L = layout(f, phone);
  const gid = useId().replace(/:/g, "");

  // 0 rest, 1 streams draw and numbers count, 2 the people flow.
  const play = useSteps(active, reduced, [[60, 1], [1100, 2]] as const, 0, 2);
  // The phone's camera (critique r8 S3): it never shows the whole dashboard as a
  // thumbnail. It opens on the channel cards at reading size (every label 11 css
  // px or more on a 320 phone), pans along the streams into the funnel, and ends
  // on the stage band from "Visited" to the mark, its left edge just before a
  // column so no number is cut there. Reduced motion rests on the cards.
  // Opening: the ad spend and the cards. Between the lead and each card is a clean line for the bottom edge.
  const railEnd = L.y0 + f.rail.length * L.step - 4;
  const clean = [154, ...f.rail.map((_, i) => L.y0 + i * L.step + L.cardH + 4)];
  const cards: FocusRect = { left: RAIL.x - 4, top: 52, w: RAIL.w + 8, h: railEnd - 52, clean };
  // Then the first two stages and the streams leaving the cards.
  const streams: FocusRect = { left: L.colX[0] - 10, top: 52, w: L.colX[2] - L.colX[0] };
  // Last: from a stage column's left edge to the mark, as close as the phone's height allows.
  const band: FocusRect = { left: L.colX[1] - 10, top: 52, w: W - L.colX[1] + 10, h: 388, lefts: [1, 2, 3].map((i) => L.colX[i] - 10) };
  const cam = useSteps<FocusRect | null>(
    active && phone && fill,
    reduced || !(phone && fill),
    [
      [2300, streams],
      [4600, band],
    ] as const,
    cards,
    cards,
  );
  const camMs = cam && cam.lefts ? 1500 : 1700;

  const maxW = Math.max(...f.rail.map((r) => r.weight));
  const hue = (h: 1 | 2) => (h === 1 ? "var(--pt-chart-1)" : "var(--pt-chart-2)");
  const ringX0 = L.rings[0]?.x ?? 480;

  return (
    <PortalFrame client={client} stage="funnel" narration={beat.narration} variant={variant} fill={fill} quiet={quiet}>
      <Fit w={W} h={H} focus={phone && fill ? cam : null} moveMs={camMs}>
        <div className={phone ? "pt-screen pt-funnel pt-funnel--phone" : "pt-screen pt-funnel"} data-play={play}>
          <TopBar tab="Overview" window={f.window} />

          <div className="pt-lead" style={{ left: RAIL.x, width: RAIL.w }}>
            <p className="pt-k">{f.lead.kicker}</p>
            <p className="pt-lead__v">{f.lead.value}</p>
            <p className="pt-lead__sub">
              {f.lead.sub.map((s) => (
                <span key={s.label}>
                  {s.label} <b>{s.value}</b>
                </span>
              ))}
            </p>
          </div>

          <div className="pt-band" style={{ left: BAND.x0, width: BAND.x1 - BAND.x0 }}>
            {f.stages.map((s, i) => (
              <Stage key={s.label} label={s.label} value={s.value} note={s.note} on={play >= 1} delay={i * 120} reduced={reduced} />
            ))}
          </div>

          <svg className="pt-flow" viewBox={`0 0 ${W} ${H}`} width={W} height={H} aria-hidden="true">
            <defs>
              <linearGradient id={`${gid}-cone`} x1="0" x2="1">
                <stop offset="0" stopColor="var(--pt-accent)" stopOpacity="0.05" />
                <stop offset="1" stopColor="var(--pt-accent)" stopOpacity="0.2" />
              </linearGradient>
              <radialGradient id={`${gid}-glow`}>
                <stop offset="0.55" stopColor="var(--pt-accent)" stopOpacity="0.32" />
                <stop offset="1" stopColor="var(--pt-accent)" stopOpacity="0" />
              </radialGradient>
            </defs>
            {L.colX.slice(1).map((x) => (
              <line key={x} className="pt-guide" x1={x} x2={x} y1={160} y2={596} />
            ))}
            {/* The cone, from the first ring to the mark. */}
            {L.rings.length > 0 ? (
              <path
                className="pt-cone"
                fill={`url(#${gid}-cone)`}
                d={`M${ringX0},${L.cy - L.rings[0].ry} L${SEAL.x},${L.cy - SEAL.r * 0.9} L${SEAL.x},${L.cy + SEAL.r * 0.9} L${ringX0},${L.cy + L.rings[0].ry} Z`}
              />
            ) : null}
            {L.rings.map((r) => (
              <ellipse key={r.x} className="pt-ring" cx={r.x} cy={L.cy} rx={r.rx} ry={r.ry} />
            ))}
            {f.rail.map((item, i) => {
              const y0 = L.y0 + i * L.step + L.cardH / 2;
              const ye = L.cy + (y0 - L.cy) * 0.42;
              const deep = item.reach >= f.stages.length - 1;
              const x1 = deep ? SEAL.x - 20 : L.colX[Math.min(item.reach, f.stages.length - 1)] + L.colW * 0.55;
              const y1 = L.cy + (y0 - L.cy) * (deep ? 0.06 : 0.22);
              const d = ribbonPath(RAIL.x + RAIL.w, y0, ringX0, ye, x1, y1);
              const sw = Math.max(2, (22 * item.weight) / maxW);
              const style = { "--d": `${i * 70}ms` } as CSSProperties;
              return (
                <g key={item.label} style={style}>
                  <path className="pt-ribbon pt-ribbon--halo" d={d} stroke={hue(item.hue)} strokeWidth={sw + 7} pathLength={1} />
                  <path className="pt-ribbon" d={d} stroke={hue(item.hue)} strokeWidth={sw} pathLength={1} />
                  {sw >= 6 ? <path className="pt-people" d={d} /> : null}
                </g>
              );
            })}
            <circle className="pt-glow" cx={SEAL.x} cy={L.cy} r={SEAL.r * 1.9} fill={`url(#${gid}-glow)`} />
          </svg>

          <div className="pt-seal" style={{ left: SEAL.x - SEAL.r, top: L.cy - SEAL.r, width: SEAL.r * 2, height: SEAL.r * 2 }}>
            <Mark mark={client.theme.mark} size={46} />
          </div>

          {f.rail.map((item, i) => (
            <div key={item.label} className="pt-card" style={{ left: RAIL.x, width: RAIL.w, top: L.y0 + i * L.step, height: L.cardH }}>
              <span className={`pt-card__icon pt-card__icon--${item.hue}`}>
                <RailGlyph icon={item.icon} />
              </span>
              <span className="pt-card__text">
                <span className="pt-card__label">{item.label}</span>
                <span className="pt-card__sub">{item.sub}</span>
              </span>
              {item.figures.map((v, k) => (
                <span key={k} className="pt-card__fig">
                  <b>{v.toLocaleString("en-US")}</b>
                  <small>{f.railFigures[k]}</small>
                </span>
              ))}
            </div>
          ))}
        </div>
      </Fit>
    </PortalFrame>
  );
}

function Stage({ label, value, note, on, delay, reduced }: { label: string; value: number; note?: string; on: boolean; delay: number; reduced: boolean }) {
  const n = useCount(value, on, 1100 + delay, reduced);
  return (
    <div className="pt-stage">
      <p className="pt-k">{label}</p>
      <p className="pt-stage__v">{n.toLocaleString("en-US")}</p>
      {note ? <p className="pt-stage__note">{note}</p> : null}
    </div>
  );
}
