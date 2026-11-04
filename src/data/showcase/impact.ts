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
//    names, labels, steps, pairs, narration...) that holds a digit or a number
//    word: such copy must be a fact().
// 2. RUNTIME (defence in depth, fires when the window loads the client file,
//    so the privacy probe goes red): the same number rule, placeholders ("#",
//    "[", "TBD", "XX"), em/en dashes and curly quotes, and the layout's counts.
import type { ImpactBeat, ImpactChapter, ImpactCopy, ImpactFact, ImpactFigure } from "./types";

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

/** Copy that carries a number or a claim. The source is the type argument; it is not shipped. */
export function fact<S extends string = never>(text: string, ...source: SourceArgs<S>): ImpactFact {
  void source;
  return { kind: "fact", text };
}

/** A number shown large. The source is the type argument; it is not shipped. */
export function figure<S extends string = never>(value: string, label: string, ...source: SourceArgs<S>): ImpactFigure {
  void source;
  return { kind: "figure", value, label };
}

// ── Runtime checks ──────────────────────────────────────────────────────────

const PLACEHOLDER = /#|\[|\bTBD\b|XX/;
const DASH_OR_CURLY = /[–—‘’“”]/;
const NUMBER_WORD = new RegExp(`(^|[\\s-])(${NUMBER_WORDS.join("|")})(?=$|[\\s.,:;'-])`, "i");
export const hasNumber = (s: string) => /\d/.test(s) || NUMBER_WORD.test(s);

export class ImpactDataError extends Error {}

const textOf = (c: ImpactCopy) => (typeof c === "string" ? c : c.text);

/** Every string a visitor can see or hear, with where it sits and whether it is sourced. */
function shown(b: ImpactBeat): { where: string; text: string; sourced: boolean }[] {
  const out: { where: string; text: string; sourced: boolean }[] = [];
  const add = (where: string, c: ImpactCopy) => out.push({ where, text: textOf(c), sourced: typeof c !== "string" });
  const fig = (where: string, f: ImpactFigure) => out.push({ where, text: `${f.value} ${f.label}`, sourced: f.kind === "figure" });
  add("tab", b.tab);
  add("caption", b.caption);
  add("kicker", b.kicker);
  add("closing", b.closing);
  add("narration", b.narration);
  b.chapters.forEach((c: ImpactChapter, i) => {
    const at = `chapter ${i + 1}`;
    add(`${at} name`, c.name);
    if (c.cadence) add(`${at} cadence`, c.cadence);
    add(`${at} how`, c.how);
    add(`${at} hero before`, c.hero.before);
    add(`${at} hero now`, c.hero.now);
    for (const f of c.figures ?? []) fig(`${at} figure`, f);
    for (const t of c.time ?? []) {
      add(`${at} time label`, t.label);
      fig(`${at} time before`, t.before);
      fig(`${at} time now`, t.now);
    }
    for (const s of c.steps) {
      add(`${at} step verb`, s.verb);
      add(`${at} step`, s.text);
    }
    for (const p of c.pairs ?? []) {
      add(`${at} pair label`, p.label);
      add(`${at} pair before`, p.before);
      add(`${at} pair now`, p.now);
    }
  });
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
  if (beat.chapters.length < 1 || beat.chapters.length > 2) fail(slug, `${beat.chapters.length} chapters; 1 or 2`);
  beat.chapters.forEach((c, i) => {
    const at = `chapter ${i + 1} (${c.name})`;
    if (c.steps.length < 3 || c.steps.length > 5) fail(slug, `${at} has ${c.steps.length} steps; 3 to 5`);
    if ((c.figures?.length ?? 0) > 3) fail(slug, `${at} has more than 3 figures`);
    if ((c.pairs?.length ?? 0) > 4) fail(slug, `${at} has more than 4 pairs`);
    if ((c.time?.length ?? 0) > 2) fail(slug, `${at} has more than 2 time rows`);
  });
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
