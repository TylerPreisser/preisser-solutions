"use client";

import { type CSSProperties } from "react";
import { BEDS, bedCounts, bedsCaptions, bedsCues, bedsSummary, launchPoints, signup, sleepers, type Sleeper } from "@/data/demos/scenes/nwks-encounter";
import { Caption, Count, KindPill, SceneRoot, Typed, useTimeline, type SceneProps } from "./kit";
import "./nwks.css";

/**
 * NWKS Women's Encounter, sign-up to bed (custom built for one camp; no AI is
 * claimed). Four beats, ~12.5 s:
 *  1 the sign-up types itself: launch point, sandwich, shirt size, lower bunk
 *  2 she lands in "Needs a bed", grouped by launch point; Cabin 1 is empty
 *  3 Auto-fill: all 18 drop into beds, lower-bunk requests on lower beds,
 *    "18 need a bed" counts to 0
 *  4 the cabin map prints: names big, town small, SERVER marks, the footer
 */

const STEP_MS = 165;
const order = new Map(sleepers.map((s, i) => [s.id, i]));
const at = (side: "left" | "right", bed: string) => sleepers.find((s) => s.slot.side === side && s.slot.bed === bed);
const floor = sleepers.filter((s) => s.slot.side === "floor");

function Mark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="#6b1f3a" />
      <path d="M9 29V18l11-8 11 8v11M15 29v-7h10v7M9 29h22" fill="none" stroke="#f6e7ec" strokeWidth="2.4" strokeLinejoin="round" />
    </svg>
  );
}

function Form({ step }: { step: number }) {
  const on = step >= 1;
  const f = signup;
  return (
    <div className={`nw-card nw-form ${step === 1 ? "scn-beat is-on" : step > 1 ? "scn-beat is-past nw-form--away" : "scn-beat"}`}>
      <p className="nw-form__head">
        <b>{"Women's Encounter"}</b>
        <span>Attendee sign-up</span>
      </p>
      <div className="nw-field">
        <span>First and last name</span>
        <p className="nw-input">
          <Typed text={f.who.name} on={on} cps={22} delay={300} />
        </p>
      </div>
      <div className="nw-field">
        <span>Launch point</span>
        <p className="nw-input nw-select">
          <Typed text={f.who.town} on={on} cps={22} delay={1150} />
        </p>
      </div>
      <div className="nw-field">
        <span>What kind of sandwich do you prefer?</span>
        <p className="nw-input nw-select">
          <Typed text={f.sandwich} on={on} cps={34} delay={1650} />
        </p>
      </div>
      <div className="nw-row">
        <div className="nw-field">
          <span>T-shirt size</span>
          <p className="nw-seg">
            {["S", "M", "L", "XL"].map((s) => (
              <i key={s} className={s === f.shirt ? "is-on" : undefined}>
                {s}
              </i>
            ))}
          </p>
        </div>
        <div className="nw-field">
          <span>Need a lower bunk?</span>
          <p className="nw-check">
            <i className="is-on" aria-hidden="true" />
            Yes, please
          </p>
        </div>
      </div>
      <div className="nw-field">
        <span>Who invited you?</span>
        <p className="nw-input">
          <Typed text={f.who.invitedBy ?? ""} on={on} cps={24} delay={2300} />
        </p>
      </div>
    </div>
  );
}

function Person({ s, compact }: { s: Sleeper; compact?: boolean }) {
  return (
    <span className="nw-person">
      <b>{compact ? s.first : s.name}</b>
      {s.server ? <span className="nw-server">Server</span> : null}
      {!compact && s.lower ? <span className="nw-tag">Lower bunk</span> : null}
      {!compact && s.invitedBy ? <span className="nw-inv">Invited by {s.invitedBy}</span> : null}
    </span>
  );
}

function Needs({ step, phone }: { step: number; phone: boolean }) {
  const left = step >= 3 ? 0 : step >= 2 ? sleepers.length : sleepers.length - 1;
  return (
    <div className={`nw-needs scn-glass${step >= 1 ? " is-in" : ""}${step >= 3 ? " is-done" : ""}`}>
      <p className="nw-needs__head">
        <span>Needs a bed</span>
        <b>
          <Count value={left} ms={step >= 3 ? sleepers.length * STEP_MS + 500 : 500} /> need a bed
        </b>
      </p>
      <div className="nw-needs__list">
        {launchPoints.map((lp) => (
          <div key={lp.name} className="nw-group">
            {phone ? null : (
              <p className="nw-group__town">
                {lp.name} <span>{lp.n}</span>
              </p>
            )}
            {sleepers
              .filter((s) => s.town === lp.name)
              .map((s) => {
                const isNew = s.id === signup.who.id;
                const cls = `nw-row-p${isNew ? " is-new" : ""}${isNew && step < 2 ? " is-pending" : ""}${step >= 3 ? " is-placed" : ""}`;
                return (
                  <p key={s.id} className={cls} style={{ "--scn-d": `${(order.get(s.id) ?? 0) * STEP_MS + 400}ms` } as CSSProperties}>
                    <Person s={s} compact={phone} />
                  </p>
                );
              })}
          </div>
        ))}
        {phone ? null : <p className={step >= 3 ? "nw-all is-on" : "nw-all"}>Everyone has a bed.</p>}
      </div>
      {phone ? <p className={step >= 3 ? "nw-all is-on" : "nw-all"}>Everyone has a bed.</p> : null}
    </div>
  );
}

function Slot({ s, label, step, full }: { s?: Sleeper; label: string; step: number; full?: boolean }) {
  const placed = s && step >= 3;
  return (
    <p className={placed ? "nw-slot is-placed" : "nw-slot"} style={s ? ({ "--scn-d": `${(order.get(s.id) ?? 0) * STEP_MS + 400}ms` } as CSSProperties) : undefined}>
      <span className="nw-slot__bed">
        {label}
        {full ? <i className="nw-full">Full bed</i> : null}
      </span>
      <span className="nw-slot__who">
        <span className="nw-slot__free">Free</span>
        {s ? (
          <span className="nw-slot__name">
            <b>{s.name}</b>
            {s.server ? <span className="nw-server">Server</span> : null}
            <em>{s.town}</em>
          </span>
        ) : null}
      </span>
    </p>
  );
}

function Board({ step }: { step: number }) {
  const sides: ("left" | "right")[] = ["left", "right"];
  const placed = step >= 3;
  return (
    <div className={`nw-card nw-board ${step === 2 || step === 3 ? "scn-beat is-on" : step > 3 ? "scn-beat is-past nw-board--under" : "scn-beat"}`}>
      <p className="nw-board__head">
        <b>Cabin 1</b>
        <span className={step >= 3 ? "nw-auto is-pressed" : "nw-auto"}>
          Auto-fill <i>{sleepers.length}</i>
        </span>
      </p>
      <div className="nw-sides">
        {sides.map((side) => (
          <div key={side} className="nw-side">
            <p className="nw-side__head">
              <b>{side === "left" ? "Left" : "Right"}</b>
              <span>
                <Count value={placed ? bedCounts[side] : 0} ms={placed ? sleepers.length * STEP_MS : 0} /> of 10
              </span>
            </p>
            {BEDS.map((bed) => (
              <Slot key={bed} label={bed} s={at(side, bed)} step={step} full={side === "left" && bed === "Lower 1"} />
            ))}
          </div>
        ))}
      </div>
      <div className="nw-floor">
        <span className="nw-slot__bed">Floor</span>
        {floor.map((s) => (
          <Slot key={s.id} label="Floor mattress" s={s} step={step} />
        ))}
      </div>
    </div>
  );
}

function Bunk({ side, n }: { side: "left" | "right"; n: number }) {
  const lower = at(side, `Lower ${n}`);
  const upper = at(side, `Upper ${n}`);
  const line = (s: Sleeper | undefined, which: string) => (
    <p className={s ? "nw-pb" : "nw-pb is-empty"}>
      <span className="nw-pb__which">{which}</span>
      {s ? (
        <>
          <b>{s.name}</b>
          <em>{s.town}</em>
          {s.server ? <span className="nw-server">Server</span> : null}
        </>
      ) : (
        <em>Open</em>
      )}
    </p>
  );
  return (
    <div className="nw-bunk">
      {line(upper, "Upper")}
      {line(lower, side === "left" && n === 1 ? "Full" : "Lower")}
    </div>
  );
}

function Print({ step }: { step: number }) {
  return (
    <div className={`nw-card nw-print ${step >= 4 ? "scn-beat is-on" : "scn-beat"}`}>
      <div className="nw-page">
        <p className="nw-page__head">
          <b>Cabin 1</b>
          <span>{"Women's Encounter"}</span>
        </p>
        <div className="nw-plan">
          {(["left", "right"] as const).map((side) => (
            <div key={side} className="nw-plan__side">
              <p className="nw-plan__label">{side === "left" ? "Left" : "Right"}</p>
              {[1, 2, 3, 4, 5].map((n) => (
                <Bunk key={n} side={side} n={n} />
              ))}
            </div>
          ))}
        </div>
        <p className="nw-plan__floor">
          <span>Floor mattress</span>
          {floor.map((s) => (
            <b key={s.id}>
              {s.name} <em>{s.town}</em>
            </b>
          ))}
        </p>
        <p className="nw-page__foot">
          Left {bedCounts.left} of 10 · Right {bedCounts.right} of 10 · {bedCounts.floor} on the floor
        </p>
      </div>
    </div>
  );
}

export function NwksBedsScene({ layout, playing = true, loop = true, label = true }: SceneProps) {
  const { run, step, fading } = useTimeline(bedsCues, { playing, loop, holdMs: 3400 });
  const phone = layout === "phone";
  return (
    <SceneRoot brand="nw" layout={layout} label={label} fading={fading} summary={bedsSummary} scene="nwks-beds" step={step}>
      <div className="nw-ground" aria-hidden="true" />
      <div key={run} className={`nw nw--${layout}`} aria-hidden="true">
        <p className="scn-top">
          <Mark className="scn-top__mark" />
          <span>{phone ? "Cabins" : "Women's Encounter cabins"}</span>
          <KindPill kind="custom" />
        </p>
        <Needs step={step} phone={phone} />
        <div className="nw-stage">
          <Form step={step} />
          <Board step={step} />
          <Print step={step} />
        </div>
        <Caption lines={bedsCaptions} index={step} />
      </div>
    </SceneRoot>
  );
}
