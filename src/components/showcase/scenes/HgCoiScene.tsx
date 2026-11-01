"use client";

import { type CSSProperties } from "react";
import {
  coiCaptions,
  coiCertificate as C,
  coiCounts,
  coiCues,
  coiEmail,
  coiExceptions,
  coiReplies,
  coiSummary,
  coiWallTotal,
} from "@/data/demos/scenes/hg-oil";
import { Caption, KindPill, SceneRoot, seeded, useRollSet, useTimeline, whole, type SceneProps } from "./kit";
import { HgBackdrop, HgMark } from "./hg-backdrop";
import "./hg.css";

/**
 * HG Oil, vendor insurance (COI): the AI story. Five beats over ~13 s:
 *  1 the wall: 192 vendors, 50 of them due (Not covered / Expiring)
 *  2 a certificate arrives and is read field by field; Covered
 *  3 the 50 due vendors fold into ONE email to their insurance agent
 *  4 three replies, each understood; "sent it to admin@" makes it search the inbox
 *  5 the wall turns green; 2 exceptions reach a person; the insurer's package is ready
 */

type Tile = "covered" | "expiring" | "missing" | "needs";

// Which tile is which vendor. A seeded shuffle so the wall looks organic and
// the server and the client draw the same wall.
const ORDER = seeded(coiWallTotal, 7);
const MISSING = ORDER.slice(0, 14);
const EXPIRING = ORDER.slice(14, 50);
const DUE = new Set([...MISSING, ...EXPIRING]);
const CERT_TILE = MISSING[0]; // Chalk Bluff Hot Oil, read in beat 2
const REPLY_FILED = [EXPIRING[0], MISSING[1]]; // filed in beat 4
const NEEDS = [MISSING[2], EXPIRING[1]]; // the two exceptions

function tileState(i: number, step: number): Tile {
  if (step >= 5) return NEEDS.includes(i) ? "needs" : "covered";
  if (step >= 2 && i === CERT_TILE) return "covered";
  if (step >= 4 && REPLY_FILED.includes(i)) return "covered";
  if (MISSING.includes(i)) return "missing";
  if (EXPIRING.includes(i)) return "expiring";
  return "covered";
}

function Wall({ step, cols }: { step: number; cols: number }) {
  return (
    <div className={step >= 5 ? "coi-wall is-wave" : "coi-wall"} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` } as CSSProperties}>
      {Array.from({ length: coiWallTotal }, (_, i) => {
        const s = tileState(i, step);
        const asked = (step === 3 || step === 4) && DUE.has(i) && s !== "covered";
        const col = i % cols;
        const row = Math.floor(i / cols);
        const cls = `coi-tile is-${s}${asked ? " is-asked" : ""}${i === CERT_TILE && step === 2 ? " is-hot" : ""}`;
        return <i key={i} className={cls} style={{ "--scn-d": `${col * 34 + row * 22}ms` } as CSSProperties} />;
      })}
    </div>
  );
}

function Counters({ step }: { step: number }) {
  const c = coiCounts[Math.max(0, Math.min(coiCounts.length - 1, step - 1))];
  // One roll for the four numbers, so they add up to 192 in every frame.
  const [covered, expiring, missing, needs] = useRollSet([c.covered, c.expiring, c.missing, c.needs]);
  return (
    <div className="coi-counts" data-total={covered + expiring + missing + needs}>
      <div className="coi-count is-covered">
        <span className="scn-num">{whole(covered)}</span>
        <span>Covered</span>
      </div>
      <div className="coi-count is-expiring">
        <span className="scn-num">{whole(expiring)}</span>
        <span>Expiring</span>
      </div>
      <div className="coi-count is-missing">
        <span className="scn-num">{whole(missing)}</span>
        <span>Not covered</span>
      </div>
      <div className={step >= 5 ? "coi-count is-needs is-shown" : "coi-count is-needs"}>
        <span className="scn-num">{whole(needs)}</span>
        <span>Needs you</span>
      </div>
    </div>
  );
}

const beat = (n: number, step: number) => (step === n ? "scn-beat is-on" : step > n ? "scn-beat is-past" : "scn-beat");

function Today({ step }: { step: number }) {
  const c = coiCounts[0];
  return (
    <div className={`coi-card coi-today scn-glass ${beat(1, step)}`}>
      <p className="coi-today__big">
        <b>{c.missing + c.expiring}</b> vendors need a current certificate
      </p>
      <p className="coi-today__row">
        <span className="coi-dot is-missing" aria-hidden="true" />
        {c.missing} not covered
      </p>
      <p className="coi-today__row">
        <span className="coi-dot is-expiring" aria-hidden="true" />
        {c.expiring} expiring this month
      </p>
      <p className="coi-today__row">
        <span className="coi-dot is-covered" aria-hidden="true" />
        {c.covered} covered, so they hear nothing from us
      </p>
    </div>
  );
}

function Certificate({ step, compact }: { step: number; compact?: boolean }) {
  const fields: [string, string][] = [
    ["Producer", C.producer],
    ["Insured", C.insured],
    ...C.lines.map((l) => [l.kind, l.limit] as [string, string]),
    ["Policy period", C.period],
    ["Additional insured", C.additionalInsured],
    ["Certificate holder", C.holder],
  ];
  const shown = compact ? fields.filter((f) => f[0] !== "Producer" && f[0] !== "Additional insured") : fields;
  return (
    <div className={`coi-card coi-cert ${beat(2, step)}`}>
      <div className="coi-cert__paper">
        <p className="coi-cert__title">
          <b>ACORD 25</b> Certificate of liability insurance
        </p>
        <div className="coi-cert__scan" aria-hidden="true" />
        <dl className="coi-cert__fields">
          {shown.map(([k, val], i) => (
            <div key={k} className="coi-f" style={{ "--scn-i": i } as CSSProperties}>
              <dt>{k}</dt>
              <dd>{val}</dd>
              <i className="coi-f__tick" aria-hidden="true" />
            </div>
          ))}
        </dl>
        <p className="coi-verdict" style={{ "--scn-i": shown.length } as CSSProperties}>
          <span className="scn-chip coi-chip--good">Covered</span>
          <span>{C.verdict.replace(/^Covered /, "")}</span>
        </p>
      </div>
    </div>
  );
}

function Email({ step }: { step: number }) {
  return (
    <div className={`coi-card coi-mail scn-glass ${beat(3, step)}`}>
      <div className="coi-mail__head">
        <p>
          <span>From</span>
          <b>{coiEmail.from}</b>
        </p>
        <p>
          <span>To</span>
          <b>{coiEmail.to}</b>
        </p>
        <p>
          <span>Subject</span>
          <b>{coiEmail.subject}</b>
        </p>
      </div>
      <p className="coi-mail__body">{coiEmail.body}</p>
      <div className="coi-mail__chips">
        {coiEmail.chips.map((c, i) => (
          <span key={c} className="scn-chip coi-chip--due" style={{ "--scn-i": i } as CSSProperties}>
            {c}
          </span>
        ))}
        <span className="scn-chip coi-chip--more" style={{ "--scn-i": coiEmail.chips.length } as CSSProperties}>
          and {coiEmail.more} more
        </span>
      </div>
      <p className="coi-mail__sent">
        <span className="coi-mail__count">50 vendors</span>
        <span className="coi-mail__arrow" aria-hidden="true">
          →
        </span>
        <span className="coi-mail__count is-one">1 email</span>
      </p>
    </div>
  );
}

function Replies({ step }: { step: number }) {
  return (
    <div className={`coi-card coi-replies ${beat(4, step)}`}>
      {coiReplies.map((r, i) => (
        <div key={r.heard} className={r.hunt ? "coi-reply is-hunt" : "coi-reply"} style={{ "--scn-i": i } as CSSProperties}>
          <p className="coi-reply__said">{r.said}</p>
          <p className="coi-reply__read">
            <span className="scn-chip coi-chip--heard">{r.heard}</span>
            <span className="coi-reply__out">
              {r.hunt ? (
                <span className="coi-hunt" aria-hidden="true">
                  <svg viewBox="0 0 16 16">
                    <circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M10.4 10.4 14 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  Searching the admin inbox
                </span>
              ) : null}
              <span className="coi-reply__did">{r.did}</span>
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}

function Exceptions({ step }: { step: number }) {
  return (
    <div className={`coi-card coi-done ${beat(5, step)}`}>
      <p className="coi-done__head">
        <span className="coi-dot is-needs" aria-hidden="true" />
        Needs you <b>{coiExceptions.length}</b>
      </p>
      {coiExceptions.map((x, i) => (
        <div key={x.vendor} className="coi-x" style={{ "--scn-i": i } as CSSProperties}>
          <div>
            <b>{x.vendor}</b>
            <span>{x.why}</span>
          </div>
          <span className="coi-x__act">{x.act}</span>
        </div>
      ))}
      <div className="coi-pkg" style={{ "--scn-i": 2 } as CSSProperties}>
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="M3 5.5 8 3l5 2.5v5L8 13l-5-2.5zM3 5.5 8 8l5-2.5M8 8v5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
        <span>
          Annual package for your insurer <b>Ready</b>
        </span>
      </div>
    </div>
  );
}

export function HgCoiScene({ layout, playing = true, loop = true, label = true, caption = true, onCaption }: SceneProps) {
  const { run, step, fading } = useTimeline(coiCues, { playing, loop });
  const phone = layout === "phone";
  return (
    <SceneRoot brand="hg" layout={layout} label={label} fading={fading} summary={coiSummary} scene="hg-coi" step={step}>
      <HgBackdrop />
      <div key={run} className={`coi coi--${layout}`} aria-hidden="true">
        <p className="scn-top">
          <HgMark className="scn-top__mark" />
          <span>Vendor insurance</span>
          <KindPill kind="ai" />
        </p>
        <div className={step >= 1 ? "coi-left scn-glass is-in" : "coi-left scn-glass"}>
          <Counters step={step} />
          <Wall step={step} cols={phone ? 24 : 16} />
        </div>
        <div className="coi-stage">
          <Today step={step} />
          <Certificate step={step} compact={phone} />
          <Email step={step} />
          <Replies step={step} />
          <Exceptions step={step} />
        </div>
        <Caption lines={coiCaptions} index={step} show={caption} onLine={onCaption} />
      </div>
    </SceneRoot>
  );
}
