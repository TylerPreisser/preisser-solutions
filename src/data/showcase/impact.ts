// src/data/showcase/impact.ts — builds an Impact beat and refuses a bad one.
//
// Two layers, so a number can never reach the page without a source:
//
// 1. TYPES (tsc and `next build` fail). A source is a TYPE argument, so it is
//    checked at build and erased from the bundle; nothing internal ships.
//      fact<"Owner, Oct 23 2026">("...")      copy that carries a number or claim
//      figure<"Measured live, Sep 17 2026">("74", "label")
//    A source must start with an oracle (Owner, Client's words, Measured live,
//    Published on this site, How it is built, Our audit of the old site) and
//    may not name a path, file, meeting or memory. impactBeat() then refuses,
//    at the type level, any PLAIN string anywhere in the beat (kicker, closing,
//    unit, text, narration...) that holds a digit or a number word: such copy
//    must be a fact(). Every number in a big or row slot is a figure().
// 2. RUNTIME (defence in depth, fires when the window loads the client file,
//    so the privacy probe goes red): the same number rule, placeholders ("#",
//    "[", "TBD", "XX"), em/en dashes and curly quotes, and the layout's counts.
import type { ImpactBeat, ImpactCopy, ImpactFact, ImpactFigure, ImpactStat } from "./types";

/** Words that state a quantity. Copy that uses one must be a fact(). */
export const NUMBER_WORDS = [
  "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve",
  "seventeen", "twenty", "thirty", "forty", "fifty", "hundred", "thousand", "million",
  "percent", "half", "dozen", "minute", "minutes", "seconds", "milliseconds", "hour", "hours",
] as const;

// ── Type-level checks ───────────────────────────────────────────────────────

type OracleKind = "Owner" | "Client's words" | "Measured live" | "Published on this site" | "How it is built" | "Our audit of the old site";
type Oracle = OracleKind | `${OracleKind}, ${string}`;
/** What an oracle note may not contain: anything that points inside our machines or meetings. */
type Internal = "/" | "\\" | "~" | ".md" | ".ts" | ".js" | ".py" | ".json" | "Granola" | "memory" | "README" | "agent-reports";

type SourceProblem<S extends string> = [S] extends [never]
  ? "missing source: write fact<\"Owner, Oct 23 2026\">(...)"
  : string extends S
    ? "the source must be a string literal"
    : S extends Oracle
      ? S extends `${string}${Internal}${string}`
        ? "the source names a path, file, meeting or memory: keep that citation outside the repo"
        : null
      : "the source must start with Owner, Client's words, Measured live, Published on this site, How it is built or Our audit of the old site";

type SourceArgs<S extends string> = SourceProblem<S> extends null ? [] : [problem: SourceProblem<S>];

type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type NumWord = (typeof NUMBER_WORDS)[number];
type W = NumWord | Capitalize<NumWord>;
type After = " " | "." | "," | ":" | ";" | "'" | "-";
type Before = " " | "-";
type HasNumber<S extends string> = S extends `${string}${Digit}${string}`
  ? true
  : S extends W | `${W}${After}${string}` | `${string}${Before}${W}` | `${string}${Before}${W}${After}${string}`
    ? true
    : false;

interface NeedsFact<S> {
  "this copy holds a number: make it fact<\"<oracle>, <date>\">(...)": S;
}
interface NeedsLiteral {
  "write the copy inline as a string literal, so the number check can read it": true;
}

/**
 * Every plain string in T that holds a number (or that the checker cannot read,
 * because it was built at runtime) becomes an impossible type, so the call
 * fails to compile.
 */
type Checked<T> = T extends ImpactFact | ImpactFigure
  ? T
  : T extends string
    ? string extends T
      ? NeedsLiteral
      : HasNumber<T> extends true
        ? NeedsFact<T>
        : T
    : T extends readonly unknown[]
      ? { readonly [K in keyof T]: Checked<T[K]> }
      : T extends object
        ? { readonly [K in keyof T]: Checked<T[K]> }
        : T;

// ── Builders ────────────────────────────────────────────────────────────────

/** What fact() and figure() made. A value that is not in here was written by hand, so it is unsourced. */
const MINTED = new WeakSet<object>();

/** Copy that carries a number or a claim. The source is the type argument; it is not shipped. */
export function fact<S extends string = never>(text: string, ...source: SourceArgs<S>): ImpactFact {
  void source;
  const f = { kind: "fact", text } as ImpactFact;
  MINTED.add(f);
  return f;
}

/** A number shown large. The source is the type argument; it is not shipped. */
export function figure<S extends string = never>(value: string, label: string, ...source: SourceArgs<S>): ImpactFigure {
  void source;
  const f = { kind: "figure", value, label } as ImpactFigure;
  MINTED.add(f);
  return f;
}

// ── Runtime checks ──────────────────────────────────────────────────────────

const PLACEHOLDER = /#|\[|\bTBD\b|XX/;
const DASH_OR_CURLY = /[–—‘’“”]/;
const NUMBER_WORD = new RegExp(`(^|[\\s-])(${NUMBER_WORDS.join("|")})(?=$|[\\s.,:;'-])`, "i");
export const hasNumber = (s: string) => /\d/.test(s) || NUMBER_WORD.test(s);

export class ImpactDataError extends Error {}

const textOf = (c: ImpactCopy) => (typeof c === "string" ? c : c.text);
const isMinted = (c: object) => MINTED.has(c);

/** Every string a visitor can see or hear, with where it sits and whether it is sourced. */
function shown(b: ImpactBeat): { where: string; text: string; sourced: boolean }[] {
  const out: { where: string; text: string; sourced: boolean }[] = [];
  const add = (where: string, c: ImpactCopy) => out.push({ where, text: textOf(c), sourced: typeof c !== "string" && isMinted(c) });
  const fig = (where: string, f: ImpactFigure) =>
    out.push({ where, text: `${f.value} ${f.label}`, sourced: isMinted(f) });
  add("tab", b.tab);
  add("caption", b.caption);
  add("kicker", b.kicker);
  add("narration", b.narration);
  if (b.text) add("text", b.text);
  const stat = (where: string, s: ImpactStat) => {
    fig(`${where} now`, s.now);
    if (s.before) fig(`${where} before`, s.before);
    if (s.unit !== undefined) out.push({ where: `${where} unit`, text: s.unit, sourced: false });
  };
  b.big.forEach((s, i) => stat(`big ${i + 1}`, s));
  b.rows.forEach((s, i) => stat(`row ${i + 1}`, s));
  return out;
}

function fail(slug: string, what: string): never {
  throw new ImpactDataError(`impact beat for ${slug}: ${what}`);
}

function validate(slug: string, beat: ImpactBeat): ImpactBeat {
  for (const s of shown(beat)) {
    if (PLACEHOLDER.test(s.text)) fail(slug, `placeholder in ${s.where}: "${s.text}"`);
    if (DASH_OR_CURLY.test(s.text)) fail(slug, `em/en dash or curly quote in ${s.where}: "${s.text}"`);
    if (!s.sourced && hasNumber(s.text)) fail(slug, `${s.where} holds a number with no source: "${s.text}"`);
    if (!s.text.trim()) fail(slug, `${s.where} is empty`);
  }
  if (beat.big.length > 3) fail(slug, `${beat.big.length} big numbers; 3 at most`);
  if (beat.rows.length > 4) fail(slug, `${beat.rows.length} rows; 4 at most`);
  if (beat.text && textOf(beat.text).length > 140) fail(slug, "text is over 140 characters");
  // Nothing to show: the client file must drop the beat, so the tab disappears.
  if (beat.big.length === 0 && beat.rows.length === 0 && !beat.lead) fail(slug, "no big numbers, rows or lead: drop the Impact beat");
  if (beat.narration.length < 80) fail(slug, "narration is under 80 characters");
  return beat;
}

type ImpactInput = Omit<ImpactBeat, "kind">;

/**
 * Builds the beat. At build the types refuse any plain string with a number;
 * at load the runtime check refuses placeholders, dashes and bad counts.
 */
export function impactBeat<const B extends ImpactInput>(slug: string, b: B & Checked<B>): ImpactBeat {
  return validate(slug, { kind: "impact", ...(b as ImpactInput) });
}
