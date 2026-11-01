"use client";

import { type CSSProperties } from "react";
import { BEDS, bedCounts, bedsCaptions, bedsCues, bedsFill, bedsSummary, launchPoints, needLine, signup, sleepers, type Sleeper } from "@/data/demos/scenes/nwks-encounter";
import { Caption, KindPill, SceneRoot, Typed, useReveal, useTimeline, type SceneProps } from "./kit";
import "./nwks.css";

/**
 * NWKS Women's Encounter, sign-up to bed (custom built for one camp; no AI is
 * claimed). Four beats, ~12.5 s:
 *  1 the sign-up types itself: launch point, sandwich, shirt size, lower bunk
 *  2 she lands in "Needs a bed", grouped by launch point; Cabin 1 is empty
 *  3 Auto-fill: all 18 drop into beds, lower-bunk requests on lower beds,
 *    "18 need a bed" counts to 0. One clock (`placed`) drives the count, the
 *    list and the beds, so they agree in every frame (critique r6 D1)
 *  4 the cabin map prints: names big, town small, SERVER marks, the footer
 */

const order = new Map(sleepers.map((s, i) => [s.id, i]));
const isPlaced = (s: Sleeper, placed: number) => (order.get(s.id) ?? 0) < placed;
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

function Form({ step, phone }: { step: number; phone: boolean }) {
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
      <div className={phone ? "nw-field nw-field--desk" : "nw-field"}>
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

function Needs({ step, phone, placed }: { step: number; phone: boolean; placed: number }) {
  const waiting = step >= 3 ? sleepers.length - placed : step >= 2 ? sleepers.length : sleepers.length - 1;
  const all = step >= 3 && placed >= sleepers.length;
  return (
    <div className={`nw-needs scn-glass${step >= 1 ? " is-in" : ""}${all ? " is-done" : ""}`}>
      <p className="nw-needs__head">
        <span>Needs a bed</span>
        <b data-need={waiting}>{needLine(waiting)}</b>
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
                const gone = step >= 3 && isPlaced(s, placed);
                const cls = `nw-row-p${isNew ? " is-new" : ""}${isNew && step < 2 ? " is-pending" : ""}${gone ? " is-placed" : ""}`;
                return (
                  <p key={s.id} className={cls}>
                    <Person s={s} compact={phone} />
                  </p>
                );
              })}
          </div>
        ))}
        {phone ? null : <p className={all ? "nw-all is-on" : "nw-all"}>Everyone has a bed.</p>}
      </div>
      {phone ? <p className={all ? "nw-all is-on" : "nw-all"}>Everyone has a bed.</p> : null}
    </div>
  );
}

function Slot({ s, label, placed, full, phone }: { s?: Sleeper; label: string; placed: boolean; full?: boolean; phone: boolean }) {
  const on = Boolean(s) && placed;
  return (
    <p className={on ? "nw-slot is-placed" : "nw-slot"}>
      <span className="nw-slot__bed">
        {phone ? label.replace("Lower ", "L").replace("Upper ", "U") : label}
        {full && !phone ? <i className="nw-full">Full bed</i> : null}
      </span>
      <span className="nw-slot__who">
        <span className="nw-slot__free">Free</span>
        {s ? (
          <span className="nw-slot__name">
            <b>{phone ? s.first : s.name}</b>
            {s.server ? <span className="nw-server">Server</span> : null}
            {phone ? null : <em>{s.town}</em>}
          </span>
        ) : null}
      </span>
    </p>
  );
}

function Board({ step, placed, phone }: { step: number; placed: number; phone: boolean }) {
  const sides: ("left" | "right")[] = ["left", "right"];
  const on = step >= 3;
  const count = (side: "left" | "right") => (on ? sleepers.filter((s) => s.slot.side === side && isPlaced(s, placed)).length : 0);
  return (
    <div className={`nw-card nw-board ${step === 2 || step === 3 ? "scn-beat is-on" : step > 3 ? "scn-beat is-past nw-board--under" : "scn-beat"}`}>
      <p className="nw-board__head">
        <b>Cabin 1</b>
        <span className={on ? "nw-auto is-pressed" : "nw-auto"}>
          Auto-fill <i>{sleepers.length}</i>
        </span>
      </p>
      <div className="nw-sides">
        {sides.map((side) => (
          <div key={side} className="nw-side">
            <p className="nw-side__head">
              <b>{side === "left" ? "Left" : "Right"}</b>
              <span>
                <span className="scn-num">{count(side)}</span> of 10
              </span>
            </p>
            {BEDS.map((bed) => {
              const s = at(side, bed);
              return <Slot key={bed} label={bed} s={s} placed={on && Boolean(s) && isPlaced(s!, placed)} full={side === "left" && bed === "Lower 1"} phone={phone} />;
            })}
          </div>
        ))}
      </div>
      <div className="nw-floor">
        <span className="nw-slot__bed">Floor</span>
        {floor.length ? (
          floor.map((s) => <Slot key={s.id} label="Floor mattress" s={s} placed={on && isPlaced(s, placed)} phone={phone} />)
        ) : (
          <span className="nw-floor__none">No one on the floor</span>
        )}
      </div>
    </div>
  );
}

function Bunk({ side, n, phone }: { side: "left" | "right"; n: number; phone: boolean }) {
  const lower = at(side, `Lower ${n}`);
  const upper = at(side, `Upper ${n}`);
  // Phone prints one letter per bunk (U / L). The full-size bed never prints
  // "F" there: next to "nobody on the floor" it read as Floor (critique r8 N5),
  // so on a phone the letter is dropped and the row spells "Full bed" instead.
  const line = (s: Sleeper | undefined, which: string) => (
    <p className={s ? "nw-pb" : "nw-pb is-empty"}>
      <span className="nw-pb__which">{phone ? (which === "Full" ? "" : which[0]) : which}</span>
      {s ? (
        <>
          <b>{phone ? s.first : s.name}</b>
          {phone ? null : <em>{s.town}</em>}
          {s.server ? <span className="nw-server">Server</span> : null}
          {phone && which === "Full" ? <span className="nw-server nw-pb__full">Full bed</span> : null}
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

function Print({ step, phone }: { step: number; phone: boolean }) {
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
                <Bunk key={n} side={side} n={n} phone={phone} />
              ))}
            </div>
          ))}
        </div>
        <p className="nw-plan__floor">
          <span>Floor mattress</span>
          {floor.length ? (
            floor.map((s) => (
              <b key={s.id}>
                {s.name} <em>{s.town}</em>
              </b>
            ))
          ) : (
            <em>None needed</em>
          )}
        </p>
        <p className="nw-page__foot">
          {/* Kept in three unbreakable groups, so a phone never wraps "floor" onto a line of its own (critique r8 S7). */}
          <span>Left {bedCounts.left} of 10 ·</span> <span>Right {bedCounts.right} of 10 ·</span>{" "}
          <span>{bedCounts.floor === 0 ? "nobody" : bedCounts.floor} on the floor</span>
        </p>
      </div>
    </div>
  );
}

export function NwksBedsScene({ layout, playing = true, loop = true, label = true, caption = true, onCaption }: SceneProps) {
  const { run, step, fading } = useTimeline(bedsCues, { playing, loop, holdMs: 4200 });
  return <Body key={run} run={run} step={step} fading={fading} layout={layout} label={label} caption={caption} onCaption={onCaption} />;
}

function Body({ step, fading, layout, label, caption, onCaption }: { run: number; step: number; fading: boolean; layout: SceneProps["layout"]; label: boolean; caption: boolean; onCaption?: (line: string) => void }) {
  const phone = layout === "phone";
  // The one Auto-fill clock: how many women are in beds (all of them on the final frame).
  const placed = useReveal(step >= 3, sleepers.length, bedsFill.first, bedsFill.step);
  return (
    <SceneRoot brand="nw" layout={layout} label={label} fading={fading} summary={bedsSummary} scene="nwks-beds" step={step}>
      <div className="nw-ground" aria-hidden="true" />
      <div className={`nw nw--${layout}`} aria-hidden="true">
        <p className="scn-top">
          <Mark className="scn-top__mark" />
          <span>{phone ? "Cabins" : "Women's Encounter cabins"}</span>
          <KindPill kind="custom" />
        </p>
        <Needs step={step} phone={phone} placed={placed} />
        <div className="nw-stage">
          <Form step={step} phone={phone} />
          <Board step={step} placed={placed} phone={phone} />
          <Print step={step} phone={phone} />
        </div>
        {/* The Auto-fill line arrives with the first woman placed, never ahead of the fill (critique r8 S8). */}
        <Caption lines={bedsCaptions} index={step >= 3 && placed === 0 ? 2 : step} show={caption} onLine={onCaption} />
      </div>
    </SceneRoot>
  );
}
