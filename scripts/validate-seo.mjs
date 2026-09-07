#!/usr/bin/env node
// Phase 4 SEO validator — per AI-native SEO upgrade directive §9.1.
// Verifies AI-discoverability root files, sitemap completeness, and per-page
// SEO requirements (title, meta description length, canonical, h1, JSON-LD,
// internal /contact link). Exits non-zero on any failure.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(PROJECT_ROOT, "out");
const PUBLIC_DIR = path.join(PROJECT_ROOT, "public");

// ---------------------------------------------------------------------------
// 0. SOURCE PREFLIGHT — the five pillar names must agree across the two files
//    that own them (added 2026-09-05)
//
// WHY THIS RUNS BEFORE THE BUILD-FRESHNESS INTERLOCK BELOW
//
// Everything after the interlock grades the HTML in out/, so it would be a
// false green to run it against a stale build. This check grades neither out/
// nor anything derived from it: it compares two SOURCE files to each other.
// Build staleness cannot make its answer wrong, and it is at its most useful
// on exactly the tree the interlock rejects — mid-rename, out/ not rebuilt yet,
// which is the moment the two names are most likely to have drifted apart.
// Deferring it behind the interlock would mean the one gate that catches a
// desync never runs on the one tree where a desync exists.
//
// WHAT IT ENFORCES
//
// Each pillar's name is written TWICE on purpose:
//   - src/lib/seo/pillars.ts          `name`  -> JSON-LD Service.name, which is
//                                              emitted into all 234 pages
//   - src/components/home/service-pillars.tsx `title` -> the visible card title
//                                              (the trailing period is styling)
//
// They are duplicated because importing the client component into the metadata
// layer would drag the homepage bundle into every route's server graph. That is
// a defensible reason to duplicate, but duplication without a gate is just a
// bug with a delay on it. Google's structured-data guidance is explicit that
// markup must match the visible text; when these two disagree, every page on
// the site tells an engine one thing and a human another.
//
// Until 2026-09-05 the ONLY thing holding the pair together was a prose comment
// in pillars.ts — and that comment had already rotted, citing
// service-pillars.tsx:542 when the title actually sat at :547. A comment that is
// wrong about where the other half lives cannot be what keeps the two halves in
// step. Hence a check that fails the build.
//
// All FIVE are compared, not just the pillar that happened to be renamed. The
// coupling is identical for the other four and nothing about them is safer.
// ---------------------------------------------------------------------------
const PILLAR_SEO_FILE = path.join(PROJECT_ROOT, "src", "lib", "seo", "pillars.ts");
const PILLAR_UI_FILE = path.join(
  PROJECT_ROOT, "src", "components", "home", "service-pillars.tsx",
);

/**
 * Reads `type` -> value pairs out of an object-literal array in source.
 *
 * Deliberately NOT one regex spanning `type` to `valueKey`. A single spanning
 * pattern that fails to find the value key inside one entry silently runs on
 * into the NEXT entry and pairs the wrong two strings — a parser that reports a
 * confident, wrong answer. Instead: find every `type:` position, then search
 * only the slice belonging to that entry. A missing key is then a hard error
 * rather than a shifted pairing.
 */
function readPillarPairs(file, startAnchor, valueKey) {
  const source = fs.readFileSync(file, "utf8");
  const start = source.indexOf(startAnchor);
  if (start === -1) {
    return { error: `could not find ${JSON.stringify(startAnchor)} in ${path.relative(PROJECT_ROOT, file)}` };
  }
  // Slicing from the array declaration skips the interface/type declarations
  // above it, whose union members would otherwise read as a sixth entry.
  const body = source.slice(start);

  const typeRe = /\btype:\s*"([^"]+)"/g;
  const starts = [];
  for (const m of body.matchAll(typeRe)) starts.push({ type: m[1], at: m.index });
  if (starts.length === 0) {
    return { error: `no \`type: "..."\` entries found in ${path.relative(PROJECT_ROOT, file)}` };
  }

  const valueRe = new RegExp(`\\b${valueKey}:\\s*"((?:[^"\\\\]|\\\\.)*)"`);
  const pairs = [];
  for (let i = 0; i < starts.length; i += 1) {
    const from = starts[i].at;
    const to = i + 1 < starts.length ? starts[i + 1].at : body.length;
    const found = valueRe.exec(body.slice(from, to));
    if (!found) {
      return {
        error:
          `pillar "${starts[i].type}" in ${path.relative(PROJECT_ROOT, file)} has no \`${valueKey}: "..."\``,
      };
    }
    pairs.push({ type: starts[i].type, value: found[1] });
  }
  return { pairs };
}

function pillarGateFail(lines) {
  for (const line of lines) console.log(line);
  console.log("");
  console.log("---------------------------------------------------------------");
  console.log("❌ SEO validation aborted: pillar name synchronisation");
  console.log("---------------------------------------------------------------");
  process.exit(1);
}

{
  const seo = readPillarPairs(PILLAR_SEO_FILE, "export const SERVICE_PILLARS", "name");
  const ui = readPillarPairs(PILLAR_UI_FILE, "const services: ServicePillar[] = [", "title");

  if (seo.error || ui.error) {
    pillarGateFail([
      "❌ PILLAR NAMES: could not read the pillar list, so the names are UNVERIFIED.",
      "   An unreadable gate must fail, not pass silently.",
      ...[seo.error, ui.error].filter(Boolean).map((e) => `   ${e}`),
    ]);
  }

  const seoTypes = seo.pairs.map((p) => p.type);
  const uiTypes = ui.pairs.map((p) => p.type);
  if (seoTypes.length !== uiTypes.length || seoTypes.some((t, i) => t !== uiTypes[i])) {
    pillarGateFail([
      "❌ PILLAR NAMES: the two files no longer describe the same pillars.",
      `   src/lib/seo/pillars.ts                    : ${seoTypes.join(", ")}`,
      `   src/components/home/service-pillars.tsx   : ${uiTypes.join(", ")}`,
      "   Add or remove the pillar in BOTH files, in the same commit.",
    ]);
  }

  // The visible card title carries a trailing period as styling; the JSON-LD
  // name deliberately does not. That single character is the only difference
  // permitted between the two.
  const mismatches = [];
  for (let i = 0; i < seo.pairs.length; i += 1) {
    const seoName = seo.pairs[i].value;
    const uiTitle = ui.pairs[i].value.replace(/\.$/, "");
    if (seoName !== uiTitle) {
      mismatches.push({ type: seoTypes[i], seoName, uiTitle, raw: ui.pairs[i].value });
    }
  }

  if (mismatches.length > 0) {
    const lines = [
      `❌ PILLAR NAMES: ${mismatches.length} of ${seo.pairs.length} pillar name(s) disagree between structured data and visible text.`,
      "",
      "   Every page on this site emits the pillars.ts name in JSON-LD while the",
      "   homepage shows the service-pillars.tsx title. While these differ, the",
      "   markup contradicts the visible text on 234 pages.",
      "",
    ];
    for (const m of mismatches) {
      lines.push(`   pillar "${m.type}"`);
      lines.push(`     src/lib/seo/pillars.ts          name  : ${JSON.stringify(m.seoName)}`);
      lines.push(`     src/components/home/service-pillars.tsx title : ${JSON.stringify(m.raw)}`);
    }
    lines.push("");
    lines.push("   Rename in BOTH files in the SAME commit — never one alone.");
    pillarGateFail(lines);
  }

  console.log(
    `✅ pillar names in sync — all ${seo.pairs.length} of src/lib/seo/pillars.ts \`name\` match ` +
      `src/components/home/service-pillars.tsx \`title\` (${seoTypes.join(", ")})`,
  );
}

// ---------------------------------------------------------------------------
// 0. SOURCE PREFLIGHT — no em dashes in rendered copy, per ADR-0009 decision 5
//    (added 2026-09-06)
//
// WHY THIS RUNS BEFORE THE BUILD-FRESHNESS INTERLOCK BELOW
//
// Same reasoning as the pillar-name gate above: this grades SOURCE, not out/,
// so build staleness cannot make its answer wrong, and it is at its most
// useful on exactly the tree the interlock rejects — copy edited, out/ not
// rebuilt yet.
//
// WHAT IT ENFORCES
//
// ADR-0009 decision 5: "No em dashes anywhere in the restored copy; commas and
// colons only. The site is at zero site-wide and stays there." Commit 63398ef
// took the tree to zero and its message recorded the standing scope: the only
// em dashes left were "in source comments and one regex in
// src/app/site-map/page.tsx that strips em dashes from page titles".
//
// The rule then rotted anyway. `8c7c955` ("rebuild homepage") reintroduced 31
// em dashes into src/components/home/service-pillars.tsx, and the live apex
// served them for two days, because nothing in this validator looked. An ADR
// that only a human remembers is not enforced — hence a check that fails the
// build.
//
// SCOPE, AND WHY IT IS src/ ONLY
//
// src/ is where rendered copy lives. Deliberately NOT scanned:
//   - source comments        — not user-visible; the tree holds ~1,700 of them
//                              and the ADR governs copy, not commentary.
//   - regex literals         — src/app/site-map/page.tsx:92,175 match ON an em
//                              dash to strip it from page titles. Flagging the
//                              tool that enforces the rule would be perverse.
//   - functions/             — server code. The em dashes there are an empty
//                              field placeholder in the notification email to
//                              the owner and a comment inside a robots.txt
//                              body: owner- and machine-facing, not site copy.
//                              They predate the zero-site-wide state and were
//                              left in place by 63398ef.
//   - public/                — llms.txt, llms-full.txt, ai.txt, feed.xml and
//                              the .well-known set are machine-facing and were
//                              likewise untouched by 63398ef. Bringing them in
//                              scope is a copy decision for the owner, not
//                              something to smuggle in via a lint rule.
//
// EN DASHES (U+2013) ARE NOT CHECKED. The ADR names em dashes only, and the
// site's en dashes are all numeric ranges ("6am–9pm", "7–15 documents"), which
// is correct typography. Widening this to U+2013 would be inventing a rule the
// owner never set.
// ---------------------------------------------------------------------------
function copyGateFail(lines) {
  for (const line of lines) console.log(line);
  console.log("");
  console.log("---------------------------------------------------------------");
  console.log("❌ SEO validation aborted: em dashes in rendered copy");
  console.log("---------------------------------------------------------------");
  process.exit(1);
}

const EM_DASH = "—";
const COPY_DIR = path.join(PROJECT_ROOT, "src");
const COPY_EXTS = new Set([".ts", ".tsx"]);

// Served static prose, added 2026-09-07. These four are hand-maintained, are
// git-tracked, have no generator, and are copied byte-for-byte from public/
// into out/, so nothing about a build makes them self-correct. llms.txt and
// llms-full.txt exist so AI systems read and paraphrase the owner's prose back
// to a prospect, which makes them brand voice rather than incidental metadata;
// feed.xml is read by humans in feed readers. They held 147 em dashes between
// them, invisible to the src/ scan above.
//
// Scanned whole. Unlike a .ts file there is no comment or regex syntax here:
// every byte is content that ships, including ai.txt's leading `#` lines, which
// are the policy document itself and not commentary about code.
const COPY_TEXT_FILES = [
  path.join(PUBLIC_DIR, "llms.txt"),
  path.join(PUBLIC_DIR, "llms-full.txt"),
  path.join(PUBLIC_DIR, "feed.xml"),
  path.join(PUBLIC_DIR, "ai.txt"),
];

/** Every em dash in a plain-text/XML content file, as `{ line, snippet }`. */
function findTextEmDashes(source) {
  const hits = [];
  source.split("\n").forEach((text, i) => {
    for (let at = text.indexOf(EM_DASH); at !== -1; at = text.indexOf(EM_DASH, at + 1)) {
      hits.push({ line: i + 1, snippet: text.trim() });
    }
  });
  return hits;
}

/**
 * Every em dash in `source` that can reach a visitor's screen, as
 * `{ line, snippet }`.
 *
 * Skips comments and regex literals and flags EVERYTHING else, rather than
 * looking only inside string literals. Copy reaches the page two ways in this
 * codebase — as a quoted string in a data object and as bare JSX text between
 * tags — and a string-only scan would be blind to the second. An em dash can
 * appear in neither an identifier nor a number, so "not a comment and not a
 * regex" is the whole of the user-visible surface.
 */
function findRenderedEmDashes(source) {
  const hits = [];
  const n = source.length;
  let i = 0;
  let line = 1;
  // Last significant code character, to tell a regex literal `/.../` from a
  // division operator. `a / b` cannot start a regex; `.replace(/.../)` can.
  let prevSig = "";

  const record = (at) => {
    const from = source.lastIndexOf("\n", at) + 1;
    let to = source.indexOf("\n", at);
    if (to === -1) to = n;
    hits.push({ line, snippet: source.slice(from, to).trim() });
  };

  while (i < n) {
    const c = source[i];
    const nx = i + 1 < n ? source[i + 1] : "";

    if (c === "\n") { line += 1; i += 1; continue; }

    if (c === "/" && nx === "/") {
      while (i < n && source[i] !== "\n") i += 1;
      continue;
    }
    if (c === "/" && nx === "*") {
      i += 2;
      while (i < n && !(source[i] === "*" && source[i + 1] === "/")) {
        if (source[i] === "\n") line += 1;
        i += 1;
      }
      i += 2;
      continue;
    }
    if (c === "/" && !/[A-Za-z0-9_$)\]]/.test(prevSig)) {
      i += 1;
      let inClass = false;
      while (i < n) {
        const d = source[i];
        if (d === "\\") { i += 2; continue; }
        if (d === "\n") { line += 1; break; }
        if (d === "[") inClass = true;
        else if (d === "]") inClass = false;
        else if (d === "/" && !inClass) { i += 1; break; }
        i += 1;
      }
      prevSig = "/";
      continue;
    }
    if (c === '"' || c === "'" || c === "`") {
      i += 1;
      while (i < n) {
        const d = source[i];
        if (d === "\\") { i += 2; continue; }
        if (d === c) { i += 1; break; }
        if (d === "\n") line += 1;
        if (d === EM_DASH) record(i);
        i += 1;
      }
      prevSig = c;
      continue;
    }
    if (c === EM_DASH) record(i);
    if (!/\s/.test(c)) prevSig = c;
    i += 1;
  }
  return hits;
}

function walkCopyFiles(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkCopyFiles(full, acc);
    else if (COPY_EXTS.has(path.extname(entry.name))) acc.push(full);
  }
  return acc;
}

{
  const copyFiles = walkCopyFiles(COPY_DIR).sort();
  if (copyFiles.length === 0) {
    copyGateFail([
      "❌ EM DASHES: found no source files under src/, so the copy is UNVERIFIED.",
      "   An unreadable gate must fail, not pass silently.",
    ]);
  }

  const offenders = [];
  for (const file of copyFiles) {
    const rel = path.relative(PROJECT_ROOT, file);
    for (const hit of findRenderedEmDashes(fs.readFileSync(file, "utf8"))) {
      offenders.push({ rel, ...hit });
    }
  }

  const missing = COPY_TEXT_FILES.filter((f) => !fs.existsSync(f));
  if (missing.length > 0) {
    copyGateFail([
      "❌ EM DASHES: served text file(s) missing, so their copy is UNVERIFIED.",
      "   An unreadable gate must fail, not pass silently.",
      ...missing.map((f) => `   ${path.relative(PROJECT_ROOT, f)}`),
    ]);
  }
  for (const file of COPY_TEXT_FILES) {
    const rel = path.relative(PROJECT_ROOT, file);
    for (const hit of findTextEmDashes(fs.readFileSync(file, "utf8"))) {
      offenders.push({ rel, ...hit });
    }
  }

  if (offenders.length > 0) {
    const files = new Set(offenders.map((o) => o.rel));
    const lines = [
      `❌ EM DASHES: ${offenders.length} em dash(es) in rendered copy across ${files.size} file(s).`,
      "",
      "   ADR-0009 decision 5: no em dashes anywhere in the site's copy, commas",
      "   and colons only. The site is at zero site-wide and stays there.",
      "",
    ];
    for (const o of offenders) {
      lines.push(`   ${o.rel}:${o.line}`);
      lines.push(`     ${o.snippet.length > 160 ? `${o.snippet.slice(0, 157)}...` : o.snippet}`);
    }
    lines.push("");
    lines.push("   Replace each with the punctuation the sentence actually wants: a colon");
    lines.push("   where the dash introduces a list or an explanation, a comma for a light");
    lines.push("   aside, parentheses for a true parenthetical, or a full stop where it is");
    lines.push("   splicing two independent clauses. Do NOT blanket-substitute.");
    copyGateFail(lines);
  }

  console.log(
    `✅ no em dashes in rendered copy — ${copyFiles.length} source files under src/ ` +
      `plus ${COPY_TEXT_FILES.length} served text files clean ` +
      "(ADR-0009 decision 5; comments and regex literals excluded)",
  );
}

// ---------------------------------------------------------------------------
// 0. BUILD-FRESHNESS INTERLOCK (added 2026-09-05)
//
// This runs BEFORE every other check and exits the process the moment it trips.
//
// Everything below this point grades the static HTML sitting in out/. Nothing
// below it knew or cared how old that HTML was. On 2026-09-05 this script
// reported a clean run against an out/ that predated a service-pillar rename:
// out/index.html was written at 09:14:35, the renamed pillar lived in
// src/components/home/service-pillars.tsx at 10:20:23, and the new pillar name
// "SEO AI Visibility Ad Management" appeared ZERO times in the HTML being
// graded while the old "Search, AI, and Ads" appeared 11 times. The validator
// still said 152 checks, 0 failures.
//
// A harness that certifies a build which no longer exists is worse than no
// harness, because it hands you a confident green. So: the newest artifact in
// out/ must be at least as new as the newest real source input. This is a HARD
// failure with a non-zero exit, not a warning — a warning in a CI log is a
// green, and there is deliberately no environment-variable bypass.
// ---------------------------------------------------------------------------
const FRESHNESS_SOURCES = [
  "src",
  "public",
  "scripts",
  "next.config.ts",
  "package.json",
];
const FRESHNESS_IGNORE = new Set(["node_modules", ".next", "out", ".git"]);

// ---------------------------------------------------------------------------
// ONE named exclusion. Do not widen this to `scripts/**`, and do not delete it.
//
// The question this interlock asks is: "is out/ older than anything that
// DETERMINES ITS CONTENTS?" Most of scripts/ genuinely qualifies —
// generate-sitemap.mjs writes out/sitemap.xml, strip-404-noindex.mjs rewrites
// out/404.html, generate-og-farmbooks.mjs writes into public/images/, and
// regenerate-location-routes.mjs generates route source under src/. Editing any
// of those really does stale out/, so they all stay in the source set.
//
// This file is the INSTRUMENT, not an input. It is the only script in scripts/
// with no write call of any kind: it reads out/ and public/ and prints. Editing
// a thermometer does not change the temperature. Left in the set, the validator
// declares its own output stale every time someone improves it, and the third
// person to trip that will just delete the interlock — which is how a gate dies.
//
// scripts/ui-audit.mjs is the same shape (reads out/, writes only to qa/). It is
// NOT excluded here, because nothing has yet required it and a second exclusion
// added speculatively is how a named exception becomes a blanket one.
// ---------------------------------------------------------------------------
const FRESHNESS_EXCLUDE_FILES = new Set([
  path.join(PROJECT_ROOT, "scripts", "validate-seo.mjs"),
]);

function collectFiles(target, ignore, acc = []) {
  let st;
  try {
    st = fs.lstatSync(target);
  } catch {
    return acc; // missing input is not a freshness problem
  }
  if (st.isSymbolicLink()) return acc;
  if (st.isDirectory()) {
    for (const entry of fs.readdirSync(target)) {
      if (ignore.has(entry)) continue;
      collectFiles(path.join(target, entry), ignore, acc);
    }
    return acc;
  }
  if (st.isFile()) acc.push({ file: target, mtimeMs: st.mtimeMs });
  return acc;
}

// Local wall-clock, so the timestamps printed here line up with `ls -l` and
// `stat` output from the same machine rather than being an hour off in UTC.
function stamp(ms) {
  const d = new Date(ms);
  const pad = (n) => String(n).padStart(2, "0");
  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ` +
    `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
  );
}

function stale(lines) {
  for (const line of lines) console.log(line);
  console.log("");
  console.log("---------------------------------------------------------------");
  console.log("❌ SEO validation aborted: build freshness interlock");
  console.log("---------------------------------------------------------------");
  process.exit(1);
}

if (!fs.existsSync(OUT_DIR)) {
  stale([
    "❌ BUILD FRESHNESS: out/ does not exist, so there is nothing to validate.",
    "   Reporting zero checks as success would be a false green.",
    "   Run `npm run build` first.",
  ]);
}

const builtFiles = collectFiles(OUT_DIR, new Set([".git"]));
if (builtFiles.length === 0) {
  stale([
    "❌ BUILD FRESHNESS: out/ exists but contains no files.",
    "   Reporting zero checks as success would be a false green.",
    "   Run `npm run build` first.",
  ]);
}
const newestBuilt = builtFiles.reduce((a, b) => (b.mtimeMs > a.mtimeMs ? b : a));

const sourceFiles = FRESHNESS_SOURCES.flatMap((entry) =>
  collectFiles(path.join(PROJECT_ROOT, entry), FRESHNESS_IGNORE),
).filter((f) => !FRESHNESS_EXCLUDE_FILES.has(f.file));
const newerThanBuild = sourceFiles
  .filter((f) => f.mtimeMs > newestBuilt.mtimeMs)
  .sort((a, b) => b.mtimeMs - a.mtimeMs);

if (newerThanBuild.length > 0) {
  const worst = newerThanBuild[0];
  const relOf = (f) => path.relative(PROJECT_ROOT, f);
  const lines = [
    `❌ BUILD FRESHNESS: out/ is STALE. ${newerThanBuild.length} source file(s) are newer than the newest build artifact.`,
    `   newest source   : ${relOf(worst.file)}  (${stamp(worst.mtimeMs)})`,
    `   newest artifact : ${relOf(newestBuilt.file)}  (${stamp(newestBuilt.mtimeMs)})`,
    "",
    "   Every result this script would print describes a build that no longer",
    "   matches the source tree. That is a false green, so nothing else ran.",
    "   Re-run `npm run build`, then `npm run validate:seo` again.",
    "",
    "   Newest offenders:",
  ];
  for (const f of newerThanBuild.slice(0, 10)) {
    lines.push(`     ${stamp(f.mtimeMs)}  ${relOf(f.file)}`);
  }
  if (newerThanBuild.length > 10) {
    lines.push(`     … and ${newerThanBuild.length - 10} more`);
  }
  stale(lines);
}

console.log(
  `✅ build freshness ok — newest artifact ${path.relative(PROJECT_ROOT, newestBuilt.file)} (${stamp(newestBuilt.mtimeMs)}) is not older than any source input`,
);

const errors = [];
const passes = [];

function pass(msg) {
  passes.push(msg);
  console.log(`✅ ${msg}`);
}
function fail(msg) {
  errors.push(msg);
  console.log(`❌ ${msg}`);
}

// ---------------------------------------------------------------------------
// 1. AI-discoverability root files (public/)
// ---------------------------------------------------------------------------
const ROOT_FILES = [
  "llms.txt",
  "llms-full.txt",
  "robots.txt",
  "ai.txt",
];

for (const file of ROOT_FILES) {
  const p = path.join(PUBLIC_DIR, file);
  if (!fs.existsSync(p)) {
    fail(`public/${file} missing`);
    continue;
  }
  const content = fs.readFileSync(p, "utf8");
  if (content.length < 100) {
    fail(`public/${file} too short (${content.length} chars; expected >100)`);
    continue;
  }
  pass(`public/${file} exists (${content.length} chars)`);
}

// ---------------------------------------------------------------------------
// 2. Sitemap — must contain every required route
// ---------------------------------------------------------------------------
const REQUIRED_ROUTES = [
  "/",
  "/about",
  "/contact",
  "/case-studies",
  "/services/custom-websites",
  "/services/local-seo",
  "/services/ai-search-optimization",
  "/services/ai-automation",
  "/business-automation",
  "/web-applications",
  "/locations/hays-kansas",
  "/locations/hays-kansas-web-design",
  "/services/seo-hays-ks",
  "/services/local-seo-hays-ks",
  "/services/ai-automation-hays-ks",
  "/services/ai-consulting-hays-ks",
  "/services/custom-ai-agents-hays-ks",
  "/locations/western-kansas-web-design",
  "/use-cases/ai-invoice-processing-small-business",
  "/industries/hvac-ai-receptionist",
];

const sitemapCandidates = [
  path.join(OUT_DIR, "sitemap.xml"),
  path.join(PUBLIC_DIR, "sitemap.xml"),
];
let sitemapPath = sitemapCandidates.find((p) => fs.existsSync(p));
let sitemap = "";
if (!sitemapPath) {
  fail("sitemap.xml not found in out/ or public/");
} else {
  sitemap = fs.readFileSync(sitemapPath, "utf8");
  pass(`sitemap.xml found at ${path.relative(PROJECT_ROOT, sitemapPath)}`);
  for (const route of REQUIRED_ROUTES) {
    // Match either "<loc>https://example.com/route</loc>" or "<loc>https://example.com</loc>" for /
    const needle = route === "/" ? "</loc>" : `${route}</loc>`;
    if (route === "/") {
      // Special case: home page might appear as "https://preissersolutions.com</loc>" or with trailing slash
      const homeRegex = /<loc>https?:\/\/[^/]+\/?<\/loc>/;
      if (homeRegex.test(sitemap)) {
        pass(`sitemap includes / (home)`);
      } else {
        fail(`sitemap missing home route /`);
      }
    } else if (sitemap.includes(needle)) {
      pass(`sitemap includes ${route}`);
    } else {
      fail(`sitemap missing route ${route}`);
    }
  }
}

// ---------------------------------------------------------------------------
// 3. Per-route HTML validation
// ---------------------------------------------------------------------------
function htmlPathForRoute(route) {
  if (route === "/") {
    return path.join(OUT_DIR, "index.html");
  }
  const trimmed = route.replace(/^\//, "");
  // Project emits FLAT HTML (e.g. out/locations/hays-kansas.html), so check
  // flat form first; fall back to nested index.html.
  const flat = path.join(OUT_DIR, `${trimmed}.html`);
  if (fs.existsSync(flat)) return flat;
  const nested = path.join(OUT_DIR, trimmed, "index.html");
  if (fs.existsSync(nested)) return nested;
  return null;
}

for (const route of REQUIRED_ROUTES) {
  const htmlPath = htmlPathForRoute(route);
  if (!htmlPath) {
    fail(`HTML missing for ${route} (checked flat + nested forms in out/)`);
    continue;
  }
  const html = fs.readFileSync(htmlPath, "utf8");
  const rel = path.relative(PROJECT_ROOT, htmlPath);

  // <title> — document title only, entity-decoded. See documentTitle().
  const titleText = documentTitle(html);
  if (!titleText) {
    fail(`${rel}: missing <title> content`);
  } else {
    pass(`${rel}: <title> ok (${titleText.length} chars)`);
  }

  // <meta name="description">
  const descMatch = html.match(
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i,
  );
  if (!descMatch) {
    fail(`${rel}: missing <meta name="description">`);
  } else {
    const len = descMatch[1].length;
    if (len < 80 || len > 170) {
      fail(`${rel}: meta description out of range (${len} chars; want 80-170)`);
    } else {
      pass(`${rel}: meta description ok (${len} chars)`);
    }
  }

  // <link rel="canonical">
  if (!/<link[^>]+rel=["']canonical["']/i.test(html)) {
    fail(`${rel}: missing <link rel="canonical">`);
  } else {
    pass(`${rel}: canonical ok`);
  }

  // <h1>
  if (!/<h1[\s>]/i.test(html)) {
    fail(`${rel}: missing <h1>`);
  } else {
    pass(`${rel}: <h1> ok`);
  }

  // application/ld+json
  if (!/<script[^>]+type=["']application\/ld\+json["']/i.test(html)) {
    fail(`${rel}: missing application/ld+json script`);
  } else {
    pass(`${rel}: JSON-LD ok`);
  }

  // href="/contact" (skip for /contact itself)
  if (route !== "/contact") {
    // Accept /contact alone or with query string, fragment, or trailing path.
    if (!/href=["']\/contact(?:["'?#/])/i.test(html)) {
      fail(`${rel}: missing internal link to /contact`);
    } else {
      pass(`${rel}: /contact link ok`);
    }
  }
}

// ---------------------------------------------------------------------------
// 4. Whole-corpus gates (added 2026-08-03)
//
// Everything above checks 19 hand-listed routes. That let real, site-wide
// defects through: dead internal links, and <title> tags carrying the brand
// twice because 160 source files end their own title with "| Preisser
// Solutions" while layout.tsx appends it again via title.template.
//
// The budgets below are RATCHETS, not targets. Each is set to the count that
// existed when the gate was introduced, so the build passes today and fails the
// moment the number goes UP. When you fix pages, LOWER the number in the same
// commit — that is what makes the fix permanent. If you legitimately add pages
// that raise a count, raise the budget in the same commit and say why.
// ---------------------------------------------------------------------------
const BUDGETS = {
  // <title> containing "Preisser Solutions" more than once — the doubled-brand
  // bug described in docs/plans/2026-08-02-three-pillar-reposition.md §10b
  // (source titles ended with the brand AND layout.tsx's title.template
  // appended it again). It was 110 pages earlier on 2026-08-03 and is now 0.
  // This gate is what keeps it at 0: it is a clean state, so never raise this.
  doubledBrandTitles: 0,
  // Titles over ~60 chars get truncated in Google's SERP. Was 162 before the
  // doubled-brand fix, then reported as 17-18 for a long time.
  //
  // LOWERED TO 0 on 2026-09-05 — and NOT by shortening 18 titles. All 18 were
  // measurement artifacts of the old extractor, which this commit also fixed
  // (see documentTitle() above):
  //   - 17 were under 60 rendered characters and were only pushed over by
  //     counting "&amp;" as 5 chars and "&#x27;" as 6. Google truncates on
  //     rendered characters.
  //   - 1 (/products/marcommand-engine) was not a document title at all. The
  //     old regex grabbed the first <title> anywhere in the file, which was the
  //     accessible name of an inline SVG: "MarCommand: Multi-Channel Marketing
  //     Engine workflow animation" (61). Its real title is 47 chars.
  // Verified against the running dev server, all 232 routes, entity-decoded and
  // head-scoped: zero titles exceed 60 rendered characters. Clean state — never
  // raise this without checking you are not re-measuring an SVG label.
  longTitles: 0,
  // Two distinct URLs sharing one <title> compete with each other for the same
  // query. Was 2, now 0. Clean state — never raise this.
  duplicateTitleGroups: 0,
  // Internal links pointing at a URL that 301s. Every one is a wasted crawl hop
  // and a diluted internal-link signal.
  //
  // LOWERED TO 0 on 2026-09-05. All 9 source occurrences (7 of which rendered)
  // were repointed at the destination public/_redirects already sends them to,
  // so behaviour is unchanged and only the hop is gone. One was fixed
  // differently: a "Smith Center, KS" nearby-area entry had its href dropped
  // rather than repointed, because the target city has no page and the
  // nearbyAreas array already lists href-less cities for exactly that reason.
  // Clean state — never raise this.
  linksToRedirects: 0,
};

// ---------------------------------------------------------------------------
// Document-title extraction (fixed 2026-09-05)
//
// The old one-liner `html.match(/<title[^>]*>...<\/title>/i)` had TWO bugs that
// between them invented 18 phantom "over-length title" defects:
//
//   1. IT MATCHED THE FIRST <title> ANYWHERE IN THE DOCUMENT. Inline SVGs use
//      <title> as their accessible name. /products/marcommand-engine has
//      <title>MarCommand: Multi-Channel Marketing Engine workflow animation</title>
//      inside its animation SVG — 61 chars — which was being measured and
//      reported as that page's document title. Its real <title> is
//      "MarCommand Marketing Engine | Preisser Solutions" (47). Shortening the
//      SVG label to satisfy the budget would have degraded an accessibility
//      label to fix a defect that never existed.
//
//   2. IT MEASURED HTML-ENTITY SOURCE LENGTH, NOT RENDERED LENGTH. "&amp;"
//      counts as 5 characters and "&#x27;" as 6. Seventeen titles containing
//      "&" or an apostrophe were pushed over the 60-char line by their own
//      encoding. Google truncates on rendered characters, not source bytes.
//
// So: scope to <head>, then decode entities, then measure.
// ---------------------------------------------------------------------------
function decodeEntities(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&"); // must be last
}

// Everything above </head>. Anything after it is body content: inline SVG
// <title> accessible names, and the Next.js RSC flight payload, which repeats
// every meta tag as escaped JSON inside a <script>. Both have already fooled a
// whole-file regex in this script once.
function headOf(html) {
  return html.split(/<\/head>/i)[0];
}

function stripComments(s) {
  return s.replace(/<!--[\s\S]*?-->/g, "");
}

function documentTitle(html) {
  const m = headOf(html).match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? decodeEntities(m[1]).trim() : "";
}

// Reads one attribute off a single tag. Returns null when the attribute is
// absent, and "" when it is present but empty — the caller must be able to tell
// those two apart, because `content=""` and no `content` at all are different
// defects with different fixes.
function tagAttr(tag, attrName) {
  const m = tag.match(
    new RegExp(`\\b${attrName}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'>]+))`, "i"),
  );
  if (!m) return null;
  return m[1] !== undefined ? m[1] : m[2] !== undefined ? m[2] : m[3];
}

// ---------------------------------------------------------------------------
// The brand string every page's og:site_name must equal.
//
// Deliberately NOT a fresh literal typed into this file. It is read at runtime
// out of the declaring source of truth, src/data/site-config.ts
// (`siteConfig.name`), which is the same string src/app/layout.tsx:91 hands to
// `openGraph.siteName`. A copied literal would drift the first time the brand
// changed and the gate would then be asserting history. This script is plain
// ESM and cannot `import` a .ts module, so it parses the declaration instead,
// and refuses to run rather than guess if the shape ever changes.
// ---------------------------------------------------------------------------
const EXPECTED_SITE_NAME = (() => {
  const configPath = path.join(PROJECT_ROOT, "src", "data", "site-config.ts");
  let src;
  try {
    src = fs.readFileSync(configPath, "utf8");
  } catch {
    console.log(`❌ cannot read ${path.relative(PROJECT_ROOT, configPath)} — og:site_name has no source of truth to check against.`);
    process.exit(1);
  }
  const decl = src.indexOf("export const siteConfig");
  const m =
    decl === -1 ? null : src.slice(decl).match(/\bname:\s*["'`]([^"'`]+)["'`]/);
  if (!m) {
    console.log(`❌ could not find \`siteConfig.name\` in ${path.relative(PROJECT_ROOT, configPath)} — update the extractor in scripts/validate-seo.mjs, do not delete the gate.`);
    process.exit(1);
  }
  return m[1];
})();

// Finds the FIRST <meta property="og:site_name"> in the document <head>, with
// HTML comments removed, and reports the state of its content attribute:
//   { present: false }               no such tag in <head>
//   { present: true, value: null }   tag exists but carries no content attribute
//   { present: true, value: "..." }  content, entity-decoded and trimmed ("" if empty)
function headOgSiteName(html) {
  const head = stripComments(headOf(html));
  for (const m of head.matchAll(/<meta\b[^>]*>/gi)) {
    const tag = m[0];
    const property = tagAttr(tag, "property");
    if (!property || property.trim().toLowerCase() !== "og:site_name") continue;
    const content = tagAttr(tag, "content");
    return { present: true, value: content === null ? null : decodeEntities(content).trim() };
  }
  return { present: false };
}

function walkHtml(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(p, acc);
    else if (entry.name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

if (fs.existsSync(OUT_DIR)) {
  const htmlFiles = walkHtml(OUT_DIR);

  // Every path the deploy can actually serve: built pages + static assets.
  const servable = new Set();
  (function walkAll(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) walkAll(p);
      else {
        const rel = "/" + path.relative(OUT_DIR, p).split(path.sep).join("/");
        servable.add(rel);
        if (rel.endsWith("/index.html")) servable.add(rel.slice(0, -"/index.html".length) || "/");
        else if (rel.endsWith(".html")) servable.add(rel.slice(0, -".html".length));
      }
    }
  })(OUT_DIR);
  servable.add("/");

  // Redirect sources, so a link to a 301 is reported as a redirect (not broken).
  const redirectSources = new Set();
  const redirectPrefixes = [];
  const redirectsFile = path.join(PUBLIC_DIR, "_redirects");
  if (fs.existsSync(redirectsFile)) {
    for (const raw of fs.readFileSync(redirectsFile, "utf8").split("\n")) {
      const line = raw.trim();
      if (!line || line.startsWith("#")) continue;
      const [from] = line.split(/\s+/);
      if (!from || !from.startsWith("/")) continue;
      if (from.includes("*")) {
        const prefix = from.slice(0, from.indexOf("*"));
        if (prefix.length > 1) redirectPrefixes.push(prefix);
      } else {
        redirectSources.add(from.length > 1 && from.endsWith("/") ? from.slice(0, -1) : from);
      }
    }
  }
  const isRedirected = (p) =>
    redirectSources.has(p) || redirectPrefixes.some((prefix) => p.startsWith(prefix));

  const brokenLinks = [];
  const redirectLinks = [];
  const titleOwners = new Map();
  const doubledBrand = [];
  const longTitles = [];
  const SKIP_HREF = /^(https?:|mailto:|tel:|#|javascript:|data:)/i;

  for (const file of htmlFiles) {
    const rel = "/" + path.relative(OUT_DIR, file).split(path.sep).join("/");
    const route = rel === "/index.html" ? "/" : rel.replace(/\.html$/, "");
    const html = fs.readFileSync(file, "utf8");

    const title = documentTitle(html);
    if (title && route !== "/404") {
      if (!titleOwners.has(title)) titleOwners.set(title, []);
      titleOwners.get(title).push(route);
      if ((title.match(/Preisser Solutions/gi) || []).length > 1) doubledBrand.push({ route, title });
      if (title.length > 60) longTitles.push({ route, title, len: title.length });
    }

    for (const m of html.matchAll(/href\s*=\s*["']([^"']+)["']/gi)) {
      const raw = m[1].trim();
      if (!raw || SKIP_HREF.test(raw)) continue;
      let target = raw.split("#")[0].split("?")[0];
      if (!target) continue;
      if (!target.startsWith("/")) continue; // relative links are rare here; skip
      if (target.startsWith("/_next/")) continue;
      const bare = target.length > 1 && target.endsWith("/") ? target.slice(0, -1) : target;
      if (isRedirected(bare)) {
        redirectLinks.push({ file: rel, href: raw });
      } else if (!servable.has(bare) && !servable.has(target)) {
        brokenLinks.push({ file: rel, href: raw });
      }
    }
  }

  const duplicateTitleGroups = [...titleOwners.entries()].filter(([, v]) => v.length > 1);

  // -- broken internal links: hard gate, no budget ---------------------------
  if (brokenLinks.length === 0) {
    pass(`no broken internal links across ${htmlFiles.length} built pages`);
  } else {
    fail(`${brokenLinks.length} broken internal link(s) — every one is a 404 for a crawler:`);
    for (const b of brokenLinks.slice(0, 25)) console.log(`     ${b.file} -> ${b.href}`);
  }

  // -- ratcheted budgets -----------------------------------------------------
  const ratchets = [
    ["doubledBrandTitles", doubledBrand.length, doubledBrand.map((d) => `${d.route} :: ${d.title}`)],
    ["longTitles", longTitles.length, longTitles.map((d) => `${d.route} (${d.len}) :: ${d.title}`)],
    ["duplicateTitleGroups", duplicateTitleGroups.length,
      duplicateTitleGroups.map(([t, routes]) => `"${t}" <- ${routes.join(", ")}`)],
    ["linksToRedirects", redirectLinks.length, redirectLinks.map((r) => `${r.file} -> ${r.href}`)],
  ];

  for (const [name, actual, details] of ratchets) {
    const budget = BUDGETS[name];
    if (actual > budget) {
      fail(`${name}: ${actual} exceeds budget ${budget}. Fix the new offenders, or raise BUDGETS.${name} in scripts/validate-seo.mjs and justify it.`);
      for (const d of details.slice(0, 15)) console.log(`     ${d}`);
      if (details.length > 15) console.log(`     … and ${details.length - 15} more`);
    } else if (actual < budget) {
      pass(`${name}: ${actual} (budget ${budget}) — improved; LOWER BUDGETS.${name} to ${actual} to lock this in.`);
    } else {
      pass(`${name}: ${actual} (at budget)`);
    }
  }
}

// ---------------------------------------------------------------------------
// 5. Site-wide infrastructure gates (added 2026-09-05)
//
// Three defects were found by crawling out/ that NO existing check caught,
// because every check above either samples 19 hand-listed routes or looks at
// one page in isolation. These are whole-corpus, cross-file gates. All three
// are HARD gates at 0 — they were each fixed to 0 in the same commit that added
// them, so any non-zero number is a regression, not a backlog.
// ---------------------------------------------------------------------------
if (fs.existsSync(OUT_DIR) && sitemap) {
  const htmlFiles = walkHtml(OUT_DIR);
  const NON_PAGE = new Set(["/404", "/yandex_9f19081f7abbbb70"]);

  const byRoute = new Map();
  for (const file of htmlFiles) {
    const rel = "/" + path.relative(OUT_DIR, file).split(path.sep).join("/");
    const route = rel === "/index.html" ? "/" : rel.replace(/\.html$/, "");
    byRoute.set(route, fs.readFileSync(file, "utf8"));
  }
  const indexable = [...byRoute.keys()].filter((r) => !NON_PAGE.has(r));

  // -- 5a. og:site_name on every indexable page ------------------------------
  // Next.js REPLACES the parent `openGraph` object when a child route exports
  // its own — it does not deep-merge. layout.tsx sets siteName once; every page
  // that exported an openGraph block silently overrode it away. This was
  // missing on 232 of 232 pages before 2026-09-05. If this fires again, a new
  // page exported `openGraph` without `siteName`.
  //
  // The original form of this gate was `/property="og:site_name"/i.test(html)`
  // over the WHOLE file, which could not fail. A substring test passes on
  // `content=""`, on the tag with no `content` attribute at all, on a wrong
  // brand, and on the tag sitting inside an HTML comment; and because it was
  // unscoped it also matched the Next.js RSC flight payload in <body>, where
  // every meta tag is repeated as escaped JSON. It guarded a codemod across 232
  // pages while being incapable of reporting a defect.
  //
  // This is the same class of bug as the old <title> extractor (see
  // documentTitle() above), so it is fixed the same way and with the same
  // helpers: scope to <head>, drop comments, parse the tag rather than the
  // file, decode entities, then compare against the declared brand.
  const siteNameProblems = [];
  for (const r of indexable) {
    const found = headOgSiteName(byRoute.get(r));
    if (!found.present) {
      siteNameProblems.push(`${r} — no <meta property="og:site_name"> in <head>`);
    } else if (found.value === null) {
      siteNameProblems.push(`${r} — og:site_name tag has no content attribute`);
    } else if (found.value === "") {
      siteNameProblems.push(`${r} — og:site_name content is empty`);
    } else if (found.value !== EXPECTED_SITE_NAME) {
      siteNameProblems.push(
        `${r} — og:site_name is "${found.value}", expected "${EXPECTED_SITE_NAME}"`,
      );
    }
  }
  if (siteNameProblems.length === 0) {
    pass(`og:site_name present on all ${indexable.length} indexable pages`);
  } else {
    fail(
      `${siteNameProblems.length} page(s) with a bad og:site_name — every indexable page needs \`siteName: "${EXPECTED_SITE_NAME}"\` in its openGraph block (Next REPLACES the parent openGraph object, it does not inherit siteName from layout.tsx):`,
    );
    for (const p of siteNameProblems.slice(0, 15)) console.log(`     ${p}`);
    if (siteNameProblems.length > 15) console.log(`     … and ${siteNameProblems.length - 15} more`);
  }

  // -- 5b. every sitemap URL must canonicalise to itself ---------------------
  // A sitemap entry says "index this URL"; a canonical pointing elsewhere on
  // the same page says "no, index that other one". Google resolves it by
  // dropping the URL ("Alternate page with proper canonical tag"). Alias routes
  // like /services/after-hours-call-triage are legitimate pages — they just
  // must not be submitted. generate-sitemap.mjs now filters them out; this
  // gate proves it stayed filtered.
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    m[1].replace("https://preissersolutions.com", "").replace(/\/$/, "") || "/",
  );
  const canonicalConflicts = [];
  for (const url of sitemapUrls) {
    const html = byRoute.get(url);
    if (!html) continue; // covered by the per-route checks above
    const declared = (html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i) || [])[1];
    if (!declared) continue;
    const norm = declared.replace("https://preissersolutions.com", "").replace(/\/$/, "") || "/";
    if (norm !== url) canonicalConflicts.push(`${url} -> canonical ${norm}`);
  }
  if (canonicalConflicts.length === 0) {
    pass(`all ${sitemapUrls.length} sitemap URLs canonicalise to themselves`);
  } else {
    fail(`${canonicalConflicts.length} sitemap URL(s) canonicalise elsewhere — remove them from the sitemap or fix the canonical:`);
    for (const c of canonicalConflicts.slice(0, 15)) console.log(`     ${c}`);
  }

  // -- 5c. no orphaned indexable route ---------------------------------------
  // A route in sitemap.xml with zero inbound internal links is the weakest
  // state a page can be in: crawlers reach it only via the sitemap and get no
  // internal-link signal about what it is. Two case-study routes were in this
  // state before 2026-09-05. /site-map is the site's HTML index and is the
  // right place to fix any new occurrence.
  const inbound = new Map(indexable.map((r) => [r, 0]));
  for (const [route, html] of byRoute) {
    const seen = new Set();
    for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) {
      const target = m[1].replace(/\/$/, "") || "/";
      if (target.startsWith("/_next")) continue;
      if (target === route || seen.has(target)) continue;
      seen.add(target);
      if (inbound.has(target)) inbound.set(target, inbound.get(target) + 1);
    }
  }
  const sitemapSet = new Set(sitemapUrls);
  const orphans = [...inbound.entries()].filter(([r, n]) => n === 0 && sitemapSet.has(r));
  if (orphans.length === 0) {
    pass(`no orphaned routes — all ${sitemapSet.size} submitted URLs have >=1 inbound internal link`);
  } else {
    fail(`${orphans.length} submitted URL(s) have ZERO inbound internal links — link them from /site-map or a relevant hub:`);
    for (const [r] of orphans.slice(0, 15)) console.log(`     ${r}`);
  }
}

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------
console.log("");
console.log("---------------------------------------------------------------");
console.log(`Checks passed: ${passes.length}`);
console.log(`Checks failed: ${errors.length}`);
console.log("---------------------------------------------------------------");

if (errors.length > 0) {
  console.log("");
  console.log("Errors:");
  for (const e of errors) {
    console.log(`  ❌ ${e}`);
  }
  console.log("");
  console.log("❌ SEO validation failed");
  process.exit(1);
} else {
  console.log("✅ SEO validation completed");
  process.exit(0);
}
