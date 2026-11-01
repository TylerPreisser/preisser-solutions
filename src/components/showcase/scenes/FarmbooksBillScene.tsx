"use client";

import { type CSSProperties } from "react";
import {
  fbBill,
  fbCaptions,
  fbCues,
  fbFarmPart,
  fbLandownerPart,
  fbLineSum,
  fbOffBy,
  fbShare,
  fbSummary,
  fbYear,
  fbYearAfter,
} from "@/data/demos/scenes/farmbooks";
import { Caption, Count, KindPill, SceneRoot, Typed, money, useTimeline, type SceneProps } from "./kit";
import "./farmbooks.css";

/**
 * FarmBooks, a bill read and checked (AI at work). Four beats, ~13 s:
 *  1 paper in: a photographed bill, boxes land on vendor, date, invoice number
 *  2 every line in plain words: co-op shorthand beside plain English and a
 *    category; the amount never changes
 *  3 the catch: the lines add to $10,649.75, the paper says $11,059.75, off by
 *    $410.00, so the bill is held: "1 bill needs your eyes"
 *  4 a clean bill files itself and splits in whole parts, farm 1 / landowner 2
 */

const beat = (n: number, step: number, last = false) =>
  step === n || (last && step > n) ? "scn-beat is-on" : step > n ? "scn-beat is-past" : "scn-beat";

function Wheat({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M16 29V9M16 13c-3-1-4-4-4-6 3 0 4 3 4 6zm0 0c3-1 4-4 4-6-3 0-4 3-4 6zm0 6c-3-1-4-4-4-6 3 0 4 3 4 6zm0 0c3-1 4-4 4-6-3 0-4 3-4 6zm0 6c-3-1-4-4-4-6 3 0 4 3 4 6zm0 0c3-1 4-4 4-6-3 0-4 3-4 6zM16 9c-1-2 0-5 0-6 0 1 1 4 0 6z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PaperOne({ step }: { step: number }) {
  return (
    <div className={step >= 4 ? "fb-paper fb-paper--one is-away" : "fb-paper fb-paper--one"}>
      <div className="fb-paper__scan" aria-hidden="true" />
      <p className="fb-paper__vendor">
        <span className={step >= 1 ? "fb-box is-on" : "fb-box"} style={{ "--scn-i": 0 } as CSSProperties}>
          {fbBill.vendor.toUpperCase()}
        </span>
      </p>
      <p className="fb-paper__meta">
        <span className={step >= 1 ? "fb-box is-on" : "fb-box"} style={{ "--scn-i": 1 } as CSSProperties}>
          {fbBill.date.toUpperCase()}
        </span>
        <span className={step >= 1 ? "fb-box is-on" : "fb-box"} style={{ "--scn-i": 2 } as CSSProperties}>
          INV {fbBill.invoice}
        </span>
      </p>
      <div className="fb-paper__lines">
        {fbBill.lines.map((l, i) => (
          <p key={l.printed} className={step >= 2 ? "fb-box is-on is-line" : "fb-box is-line"} style={{ "--scn-i": i } as CSSProperties}>
            <span>{l.printed}</span>
            <span>{l.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
          </p>
        ))}
      </div>
      <p className={step >= 3 ? "fb-paper__total is-caught" : "fb-paper__total"}>
        <span>TOTAL DUE</span>
        <span>{money(fbBill.printedTotal)}</span>
      </p>
      <p className="fb-paper__foot">TERMS NET 30 · THANK YOU</p>
      <span className={step >= 3 ? "fb-stamp is-on" : "fb-stamp"}>Held for you</span>
    </div>
  );
}

function PaperTwo({ step }: { step: number }) {
  return (
    <div className={step >= 4 ? "fb-paper fb-paper--two is-in" : "fb-paper fb-paper--two"}>
      <p className="fb-paper__vendor">
        <span className="fb-box is-on">{fbShare.vendor.toUpperCase()}</span>
      </p>
      <p className="fb-paper__meta">
        <span className="fb-box is-on">SEP 22, 2026</span>
        <span className="fb-box is-on">INV #50277</span>
      </p>
      <div className="fb-paper__lines">
        <p className="fb-box is-on is-line">
          <span>FERT N80 LIQ APPL</span>
          <span>{fbShare.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
        </p>
      </div>
      <p className="fb-paper__total">
        <span>TOTAL DUE</span>
        <span>{money(fbShare.total)}</span>
      </p>
      <p className="fb-paper__foot">TERMS NET 30 · THANK YOU</p>
      <span className="fb-stamp is-good is-on">In the books</span>
    </div>
  );
}

function ReadCard({ step }: { step: number }) {
  const rows: [string, string][] = [
    ["Vendor", fbBill.vendor],
    ["Date", fbBill.date],
    ["Invoice", fbBill.invoice],
    ["Total printed", money(fbBill.printedTotal)],
  ];
  return (
    <div className={`fb-card fb-read scn-glass ${beat(1, step)}`}>
      <p className="fb-kicker">Read from the photo</p>
      {rows.map(([k, v], i) => (
        <p key={k} className="fb-read__row">
          <span>{k}</span>
          <b>
            <Typed text={v} on={step >= 1} cps={34} delay={350 + i * 480} />
          </b>
        </p>
      ))}
      <p className="fb-read__note">Matched to a vendor already on your books.</p>
    </div>
  );
}

function LinesCard({ step }: { step: number }) {
  return (
    <div className={`fb-card fb-lines scn-glass ${beat(2, step)}`}>
      <p className="fb-kicker">Every line, in plain words</p>
      {fbBill.lines.map((l, i) => (
        <div key={l.printed} className="fb-line" style={{ "--scn-i": i } as CSSProperties}>
          <p className="fb-line__printed">{l.printed}</p>
          <p className="fb-line__plain">
            <b>{l.plain}</b>
            <span className="scn-chip fb-cat">{l.category}</span>
          </p>
          <p className="fb-line__amt">{money(l.amount)}</p>
        </div>
      ))}
    </div>
  );
}

function CatchCard({ step }: { step: number }) {
  return (
    <div className={`fb-card fb-catch scn-glass ${beat(3, step)}`}>
      <p className="fb-kicker">Does it add up?</p>
      <p className="fb-catch__row">
        <span>Sum of the lines</span>
        <b>
          <Count value={step >= 3 ? fbLineSum : 0} ms={1400} format={money} />
        </b>
      </p>
      <p className="fb-catch__row">
        <span>Total printed on the bill</span>
        <b>{money(fbBill.printedTotal)}</b>
      </p>
      <p className="fb-catch__row is-off">
        <span>Off by</span>
        <b>{money(fbOffBy)}</b>
      </p>
      <p className="fb-catch__eyes">
        <span className="scn-chip fb-eyes">1 bill needs your eyes</span>
        <span>Before anyone pays it.</span>
      </p>
    </div>
  );
}

function SplitCard({ step }: { step: number }) {
  const total = fbShare.parts.farm + fbShare.parts.landowner;
  return (
    <div className={`fb-card fb-split scn-glass ${beat(4, step, true)}`}>
      <p className="fb-kicker">
        {fbShare.what} on {fbShare.field}, crop share
      </p>
      <p className="fb-split__total">{money(fbShare.total)}</p>
      <div className="fb-bar" style={{ "--scn-farm": `${(fbShare.parts.farm / total) * 100}%` } as CSSProperties}>
        <span className="fb-bar__farm" />
        <span className="fb-bar__land" />
      </div>
      <div className="fb-split__legend">
        <p>
          <span className="fb-sw is-farm" aria-hidden="true" />
          Your third <b>{money(fbFarmPart)}</b>
        </p>
        <p>
          <span className="fb-sw is-land" aria-hidden="true" />
          {"Landowner's two thirds"} <b>{money(fbLandownerPart)}</b>
          <em>owed back to you</em>
        </p>
      </div>
      <p className="fb-filed">
        <span className="scn-chip fb-in">In the books</span>
        <span>
          Filed under Fertilizer &amp; Lime, {fbShare.field}
        </span>
      </p>
      <p className="fb-year">
        <span>{fbYear.label}, your books</span>
        <b>
          <Count value={step >= 4 ? fbYearAfter : fbYear.before} ms={1300} format={money} />
        </b>
      </p>
    </div>
  );
}

export function FarmbooksBillScene({ layout, playing = true, loop = true, label = true }: SceneProps) {
  const { run, step, fading } = useTimeline(fbCues, { playing, loop });
  return (
    <SceneRoot brand="fb" layout={layout} label={label} fading={fading} summary={fbSummary} scene="farmbooks-bill" step={step}>
      <div className="fb-ground" aria-hidden="true" />
      <div key={run} className={`fb fb--${layout}`} aria-hidden="true">
        <p className="scn-top">
          <Wheat className="scn-top__mark fb-mark" />
          <span>FarmBooks</span>
          <KindPill kind="ai" />
        </p>
        <div className={step >= 1 ? "fb-desk is-in" : "fb-desk"}>
          <PaperOne step={step} />
          <PaperTwo step={step} />
        </div>
        <div className="fb-stage">
          <ReadCard step={step} />
          <LinesCard step={step} />
          <CatchCard step={step} />
          <SplitCard step={step} />
        </div>
        <Caption lines={fbCaptions} index={step} />
      </div>
    </SceneRoot>
  );
}
