"use client";

import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import type {
  ImpactBeat as ImpactBeatData,
  ImpactCopy,
  ImpactStat,
} from "@/data/showcase/types";
import type { BeatProps } from "./shared";
import { DufferQrScene } from "../scenes/DufferQrScene";
import "./impact.css";

/**
 * The Impact tab (ADR-0025 §3, round 2 spec §3). Big numbers first: the old
 * number struck through, the new one at display size, a label under it; then
 * up to four smaller rows and one optional sentence. A slot with no sourced
 * number is simply absent from its array, so nothing is drawn for it: no empty
 * box, no reserved space (a client with only "now" numbers closes the before
 * row up entirely).
 *
 * Layout follows the PANEL's width (container queries in impact.css), so it is
 * right in the desktop window and the phone sheet alike. On a phone at most two
 * big cards stack; a third demotes to the first row, its before kept.
 *
 * Motion (spec §3.3), once per tab entry, only under data-play (set by JS when
 * motion is allowed): before fades in, the strike draws, the new number rises,
 * cards stagger, rows follow. At rest, and under reduced motion, everything is
 * simply there. No count-up: a counting number cannot be read until it stops.
 *
 * Real facts, not demonstration data: a `data-fact-stage`, scanned by the
 * privacy probe like a demo stage but carrying no "Demonstration data" label.
 */
export function ImpactBeat({
  client,
  beat,
  variant,
  active,
  reduced,
  quiet,
}: BeatProps<ImpactBeatData>) {
  const scroller = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const textEl = useRef<HTMLParagraphElement>(null);
  const textH = useRef(0);
  const [play, setPlay] = useState(false);
  const [overflow, setOverflow] = useState(false);
  const [edge, setEdge] = useState({ top: false, more: false });
  const [textFits, setTextFits] = useState(true);
  const uid = useId();
  const kickerId = `${uid}-k`;
  const narrId = `${uid}-n`;
  const phone = variant === "phone";

  // Phone: at most two big cards; a third demotes to the head of the rows (rows cap 3 + the demoted one).
  const big = phone ? beat.big.slice(0, 2) : beat.big;
  const rows = phone
    ? [...beat.big.slice(2), ...beat.rows.slice(0, 3)]
    : beat.rows;
  const hasBefore = big.some((s) => s.before || s.oldWay);
  const solo = big.length === 1 && rows.length === 0;
  const lastCardAt =
    (hasBefore ? 600 : 200) + Math.max(0, big.length - 1) * 140 + 380;

  // Runs once each time the tab is entered; leaving it re-arms the next entry.
  useEffect(() => {
    setPlay(active && !reduced);
  }, [active, reduced]);

  function readEdge(el: HTMLElement) {
    const top = el.scrollTop > 0;
    const more = el.scrollTop + el.clientHeight < el.scrollHeight - 1;
    setEdge((e) => (e.top === top && e.more === more ? e : { top, more }));
  }

  // The scroller joins the Tab order only when there is something to scroll; the
  // sentence shows on a phone only if the whole of it fits (spec §3.2).
  useLayoutEffect(() => {
    const el = scroller.current;
    const col = inner.current;
    if (!el || !col) return;
    const read = () => {
      const t = textEl.current;
      if (t && t.offsetHeight > 0) textH.current = t.offsetHeight + 14;
      if (phone && beat.text) {
        const withText =
          col.scrollHeight + (t && t.offsetHeight > 0 ? 0 : textH.current);
        setTextFits(withText <= el.clientHeight + 1);
      } else {
        setTextFits(true);
      }
      setOverflow(el.scrollHeight > el.clientHeight + 1);
      readEdge(el);
    };
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    ro.observe(col);
    return () => ro.disconnect();
  }, [phone, beat.text]);

  return (
    <section
      className="im"
      data-fact-stage={`${client.slug}-impact`}
      data-solo={solo ? "" : undefined}
      data-before={hasBefore ? "some" : "none"}
      data-play={play ? "" : undefined}
      aria-hidden={quiet || undefined}
      aria-labelledby={kickerId}
      aria-describedby={narrId}
      style={{ "--im-rows-at": `${lastCardAt}ms` } as CSSProperties}
    >
      <p id={narrId} data-demo-narration hidden>
        {beat.narration}
      </p>
      <div
        ref={scroller}
        className="im__scroll"
        data-edge={
          edge.top && edge.more
            ? "both"
            : edge.top
              ? "top"
              : edge.more
                ? "bottom"
                : undefined
        }
        tabIndex={overflow ? 0 : undefined}
        onScroll={(e) => readEdge(e.currentTarget)}
      >
        <div ref={inner} className="im__col">
          {beat.lead === "qr-story" ? (
            // Spec §3.5: Duffer's Impact leads with the QR story.
            <div className="im__lead" data-lead="qr-story">
              <DufferQrScene variant={variant} active={active} reduced={reduced} />
            </div>
          ) : null}
          <div className="im__body">
            <p className="im__k" id={kickerId}>
              {beat.kicker}
            </p>
            {big.length > 0 ? (
              <div
                className="im__big"
                data-n={big.length}
                style={{ "--n": big.length } as CSSProperties}
              >
                {big.map((s, i) => (
                  <Card key={s.now.label} s={s} i={i} />
                ))}
              </div>
            ) : null}
            {rows.length > 0 ? (
              <ul className="im__rows">
                {rows.map((s, i) => (
                  <Row key={s.now.label} s={s} i={i} />
                ))}
              </ul>
            ) : null}
            {beat.text ? (
              <p
                ref={textEl}
                className="im__text"
                hidden={!textFits}
                style={{ "--i": rows.length } as CSSProperties}
              >
                {copy(beat.text)}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

const copy = (c: ImpactCopy) => (typeof c === "string" ? c : c.text);

function Value({ v, unit }: { v: string; unit?: string }) {
  return (
    <>
      {v}
      {unit ? <small>{unit}</small> : null}
    </>
  );
}

function Card({ s, i }: { s: ImpactStat; i: number }) {
  return (
    <div
      className="im__card"
      data-has-before={s.before || s.oldWay ? "" : undefined}
      style={{ "--i": i } as CSSProperties}
    >
      {s.oldWay && !s.before ? (
        <span className="im__old">{copy(s.oldWay)}</span>
      ) : null}
      {s.before ? (
        <span className="im__was">
          <span className="ps-visually-hidden">Before: </span>
          <span className="im__was-v">
            <Value v={s.before.value} unit={s.unit} />
          </span>
        </span>
      ) : null}
      <span className="im__now">
        <span className="ps-visually-hidden">Now: </span>
        <Value v={s.now.value} unit={s.unit} />
      </span>
      <p className="im__lab">{s.now.label}</p>
    </div>
  );
}

function Row({ s, i }: { s: ImpactStat; i: number }) {
  return (
    <li className="im__row" style={{ "--i": i } as CSSProperties}>
      <span className="im__row-l">{s.now.label}</span>
      <span className="im__row-r">
        {s.before ? (
          <span className="im__row-w">
            <span className="ps-visually-hidden">Before: </span>
            {s.before.value}
          </span>
        ) : null}
        <span className="im__row-v">
          <span className="ps-visually-hidden">Now: </span>
          <Value v={s.now.value} unit={s.unit} />
        </span>
      </span>
    </li>
  );
}

/** How long the tab plays before the window moves on: 3200 + 1200 per big + 600 per row, capped at 9000 (spec §3.3). */
export function impactMs(b: ImpactBeatData): number {
  return Math.min(9000, 3200 + 1200 * b.big.length + 600 * b.rows.length);
}
