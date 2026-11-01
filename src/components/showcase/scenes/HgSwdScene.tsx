"use client";

import { type CSSProperties } from "react";
import {
  swdAgreements,
  swdCaptions,
  swdCues,
  swdEdit,
  swdElapsedSec,
  swdFiles,
  swdInvoiceCount,
  swdInvoices,
  swdMonth,
  swdPhases,
  swdRows,
  swdSummary,
  swdTie,
  type SwdRow,
} from "@/data/demos/scenes/hg-oil";
import { Caption, Count, KindPill, SceneRoot, money, useTimeline, type SceneProps } from "./kit";
import { HgBackdrop, HgMark } from "./hg-backdrop";
import "./hg.css";
import "./hg-swd.css";

/**
 * HG Oil, the saltwater (SWD) month-end close. AUTOMATION, not AI: there is no
 * model in hg-swd, and nothing here says or implies one. Five beats, ~13 s:
 *  1 the WATER FIGURES sheet; the field confirms one well's barrels (98 -> 103)
 *  2 Run: the six real phases start, the clock starts
 *  3 one formula, (31 - 0) x 103 x $0.20 = $638.60, and the invoice lines
 *  4 the tie-out: every vendor told exactly what they are paid; one is not
 *    (told $660.48, paid $330.24), it is held, fixed, and matches
 *  5 the files land with accounting; nothing goes to a vendor until a person releases it
 */

function Rate({ r }: { r: SwdRow }) {
  if (r.rate.kind === "fixed") return <>{money(r.rate.price)} flat</>;
  return (
    <>
      {money(r.rate.price)}/bbl
      {r.rate.min ? <span className="swd-rate__min">min {money(r.rate.min)}</span> : null}
    </>
  );
}

const clock = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s) % 60).padStart(2, "0")}`;

/** Which of the six phases have finished by this step. */
const phasesDone = (step: number) => (step >= 4 ? 6 : step >= 3 ? 5 : step >= 2 ? 2 : 0);
const elapsed = (step: number) => (step >= 4 ? swdElapsedSec : step >= 3 ? 41 : step >= 2 ? 9 : 0);

const beat = (show: boolean, past: boolean) => (show ? "scn-beat is-on" : past ? "scn-beat is-past" : "scn-beat");

function Sheet({ step, rows }: { step: number; rows: number }) {
  const edited = step >= 1;
  return (
    <div className="swd-sheet">
      <p className="swd-sheet__tab">
        <span className="swd-xl" aria-hidden="true">
          X
        </span>
        Water figures
        <span className="swd-sheet__meta">{swdAgreements} agreements</span>
      </p>
      <table>
        <thead>
          <tr>
            <th>Vendor</th>
            <th className="is-swd">SWD</th>
            <th className="is-num">BPD</th>
            <th className="is-num">Down</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {swdRows.slice(0, rows).map((r, i) => {
            const isEdit = i === swdEdit.row;
            return (
              <tr key={r.vendor} className={step >= 4 && i === 5 ? "is-caught" : undefined}>
                <td>{r.vendor}</td>
                <td className="is-swd">{r.swd}</td>
                <td className={isEdit ? "is-num swd-edit" : "is-num"}>
                  {isEdit ? (
                    <span className="swd-edit__cell">
                      <span className="swd-edit__was">{swdEdit.was}</span>
                      <span className="swd-edit__now">{r.bpd}</span>
                    </span>
                  ) : (
                    r.bpd
                  )}
                  {isEdit && edited ? <span className="swd-edit__note">Confirmed</span> : null}
                </td>
                <td className="is-num">{r.down}</td>
                <td>
                  <Rate r={r} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function RunBar({ step }: { step: number }) {
  const done = phasesDone(step);
  return (
    <div className="swd-run">
      <span className={step >= 2 ? "swd-run__btn is-pressed" : "swd-run__btn"}>
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="M5 3.5v9l7-4.5z" fill="currentColor" />
        </svg>
        Run
      </span>
      <div className="swd-run__bar">
        {swdPhases.map((p, i) => (
          <span
            key={p}
            className={i < done ? "swd-seg is-done" : "swd-seg"}
            style={{ "--scn-d": `${(i < 2 ? i : i < 5 ? i - 2 : 0) * 650}ms` } as CSSProperties}
          >
            <i />
            <b>{i + 1}/6</b>
          </span>
        ))}
      </div>
      <span className="swd-run__clock">
        <Count value={elapsed(step)} ms={step >= 3 ? 2400 : 1300} format={clock} />
      </span>
    </div>
  );
}

function Log({ step, phone }: { step: number; phone: boolean }) {
  const done = phasesDone(step);
  const lines = [
    `[1/6] ${swdPhases[0]}: ${swdAgreements} agreements`,
    `[2/6] ${swdPhases[1]}: A/P and GL`,
    `[3/6] ${swdPhases[2]}`,
    `[4/6] ${swdPhases[3]}: 17 PDFs`,
    `[5/6] ${swdPhases[4]}`,
    `[6/6] ${swdPhases[5]}`,
  ].slice(0, phone ? 4 : 6);
  return (
    <div className={`swd-card swd-log scn-glass ${beat(step <= 2, step > 2)}`}>
      <p className="swd-card__kicker">{swdMonth.label} close</p>
      <p className={step >= 1 ? "swd-log__field is-on" : "swd-log__field"}>
        <span className="swd-dot" aria-hidden="true" />
        Field confirmed {swdRows[0].lease}: <b>{swdRows[0].bpd} BPD</b>
      </p>
      <div className="swd-log__lines">
        {lines.map((l, i) => (
          <p key={l} className={i < done ? "is-on is-done" : step >= 1 ? "is-on" : undefined} style={{ "--scn-i": i < 2 ? i : 0 } as CSSProperties}>
            {l}
            <span className="swd-ok">done</span>
          </p>
        ))}
      </div>
    </div>
  );
}

function Formula({ step, lines }: { step: number; lines: number }) {
  const r = swdRows[0];
  return (
    <div className={`swd-card swd-formula scn-glass ${beat(step === 3, step > 3)}`}>
      <p className="swd-card__kicker">One formula, every line</p>
      <p className="swd-eq">
        <span>
          ({swdMonth.days} days − {r.down} down)
        </span>
        <span>× {r.bpd} BPD</span>
        <span>× {money(r.rate.price)}</span>
        <span className="swd-eq__is">= {money(swdInvoices[0].amount)}</span>
      </p>
      <div className="swd-lines">
        {swdInvoices.slice(0, lines).map((inv, i) => (
          <p key={inv.no} style={{ "--scn-i": i } as CSSProperties} className={i === 0 ? "is-first" : undefined}>
            <span className="swd-mono">{inv.no}</span>
            <span className="swd-lines__v">{inv.vendor}</span>
            <span className="swd-lines__amt">{money(inv.amount)}</span>
          </p>
        ))}
        <p className="swd-lines__more" style={{ "--scn-i": lines } as CSSProperties}>
          and {swdInvoiceCount - lines} more, {swdInvoiceCount} invoice lines
        </p>
      </div>
    </div>
  );
}

function TieOut({ step, rows }: { step: number; rows: number }) {
  const shown = swdTie.slice(swdTie.length - rows);
  return (
    <div className={`swd-card swd-tie scn-glass ${beat(step === 4, step > 4)}`}>
      <p className="swd-card__kicker">Tie-out: every vendor told exactly what they are paid</p>
      <table>
        <thead>
          <tr>
            <th>Vendor</th>
            <th className="is-num">Told</th>
            <th className="is-num">Paid</th>
            <th className="is-st">Status</th>
          </tr>
        </thead>
        <tbody>
          {shown.map((t, i) => (
            <tr key={t.vendor} className={t.caught ? "swd-tie__caught" : undefined} style={{ "--scn-i": i } as CSSProperties}>
              <td>{t.vendor}</td>
              <td className="is-num">{money(t.told)}</td>
              <td className="is-num">
                {t.caught ? (
                  <span className="swd-swap">
                    <span className="swd-swap__bad">{money(t.paid)}</span>
                    <span className="swd-swap__good">{money(t.told)}</span>
                  </span>
                ) : (
                  money(t.paid)
                )}
              </td>
              <td className="is-st">
                {t.caught ? (
                  <span className="swd-swap">
                    <span className="swd-swap__bad">
                      <span className="swd-st is-held">Held</span>
                    </span>
                    <span className="swd-swap__good">
                      <span className="swd-st">Matches</span>
                    </span>
                  </span>
                ) : (
                  <span className="swd-st">Matches</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="swd-tie__note">
        <span className="swd-swap">
          <span className="swd-swap__bad">Caught before it went out. Nothing is sent until they match.</span>
          <span className="swd-swap__good">Fixed in the sheet and run again. Every vendor matches.</span>
        </span>
      </p>
    </div>
  );
}

function Files({ step }: { step: number }) {
  return (
    <div className={`swd-card swd-files ${beat(step >= 5, false)}`}>
      <div className="swd-drop scn-glass">
        <p className="swd-drop__to">To accounting</p>
        <div className="swd-drop__files">
          {swdFiles.controller.map((f, i) => (
            <span key={f} className="swd-file" style={{ "--scn-i": i } as CSSProperties}>
              <i aria-hidden="true" />
              {f}
            </span>
          ))}
        </div>
      </div>
      <div className="swd-drop scn-glass">
        <p className="swd-drop__to">To accounts payable</p>
        <div className="swd-drop__files">
          <span className="swd-file is-pack" style={{ "--scn-i": 4 } as CSSProperties}>
            <i aria-hidden="true" />
            {swdFiles.ap}
          </span>
        </div>
      </div>
      {/* The outcome on its own card, never straight over the pumpjack art (critique r8 N4). */}
      <div className="swd-outcome scn-glass">
        <p className="swd-took">
          Closed in <b>{clock(swdElapsedSec)}</b>
        </p>
        <p className="swd-zero">Nothing goes to a vendor until a person releases it.</p>
      </div>
    </div>
  );
}

export function HgSwdScene({ layout, playing = true, loop = true, label = true, caption = true, onCaption }: SceneProps) {
  const { run, step, fading } = useTimeline(swdCues, { playing, loop });
  const phone = layout === "phone";
  return (
    <SceneRoot brand="hg" layout={layout} label={label} fading={fading} summary={swdSummary} scene="hg-swd" step={step}>
      <HgBackdrop />
      <div key={run} className={`swd swd--${layout}`} aria-hidden="true">
        <p className="scn-top">
          <HgMark className="scn-top__mark" />
          <span>Month-end close</span>
          <KindPill kind="auto" />
        </p>
        <div className={`swd-left scn-glass${step >= 1 ? " is-in" : ""}${step >= 4 ? " is-behind" : ""}`}>
          <Sheet step={step} rows={phone ? 3 : swdRows.length} />
          <RunBar step={step} />
        </div>
        <div className="swd-stage">
          <Log step={step} phone={phone} />
          <Formula step={step} lines={phone ? 3 : 6} />
          <TieOut step={step} rows={phone ? 3 : 6} />
          <Files step={step} />
        </div>
        <Caption lines={swdCaptions} index={step} show={caption} onLine={onCaption} />
      </div>
    </SceneRoot>
  );
}
