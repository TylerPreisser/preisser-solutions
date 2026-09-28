#!/usr/bin/env node
/**
 * tests/demo-privacy.probe.mjs — the Proof Stage privacy guard (ADR-0016 §5).
 *
 * Reads the BUILT export and builds nothing. Run after `npm run build`.
 *   node tests/demo-privacy.probe.mjs              scan out/
 *   node tests/demo-privacy.probe.mjs --self-test  plant bad strings in synthetic pages; must go red on each
 *
 * An ALLOWLIST, not a ban list. Inside every [data-demo-stage], each
 * capitalised word must be an invented name (src/data/demos/invented/*.ts,
 * the page's own scope plus _shared), an approved entity, a registered
 * vocabulary word, or a common word (tests/demo-privacy/common-words.txt).
 * Rules:
 *   token          a capitalised word that is none of the above
 *   routing        a run of 9+ digits (single spaces or dashes allowed) in a stage
 *   domain         a domain or email in a stage that is not a registered *.example domain
 *   asset          an image in a stage that is not a registered /images/demos/ asset
 *   label          a stage without exactly one label from the closed vocabulary
 *   narration      a stage without a narration paragraph of 80+ characters
 *   heading        an h1 or h2 inside a stage (ADR-0016 §6)
 *   dollar-outside a "$<digit>" amount on a case-study page OUTSIDE every stage,
 *                  including <title>, <meta> and JSON-LD (ADR-0016 §4)
 *   deny           a PRIVATE deny-list term in a stage or in stage source files
 *   deny-site      a "site:" deny-list term anywhere in out/
 *   css-namespace  a stage stylesheet declaring a site or Tailwind variable, or @theme
 *
 * Deny list: PS_DEMO_DENYLIST, default ~/.config/preisser/demo-denylist.txt.
 * Missing or empty = exit 2. Hits print masked.
 * Exit codes: 0 clean, 1 violations, 2 configuration error.
 */
import { createRequire } from "node:module";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const req = createRequire(import.meta.url);
const { chromium } = req("playwright");

const SELF = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(SELF), "..");
const OUT = path.resolve(process.env.PS_OUT_DIR || path.join(ROOT, "out"));
const DENY_PATH = process.env.PS_DEMO_DENYLIST || path.join(os.homedir(), ".config", "preisser", "demo-denylist.txt");
const INVENTED_DIR = path.join(ROOT, "src", "data", "demos", "invented");
const COMMON_PATH = path.join(ROOT, "tests", "demo-privacy", "common-words.txt");
// Overridable so the self-test can plant a temp source root without touching
// the real repo (review-F.md MEDIUM 4).
const SOURCE_ROOTS = process.env.PS_SOURCE_ROOTS
  ? process.env.PS_SOURCE_ROOTS.split(path.delimiter).filter(Boolean)
  : [path.join(ROOT, "src", "data", "demos"), path.join(ROOT, "src", "components", "case-study", "DemoStage")];
const LABELS = ["Demonstration data", "Recreation · demonstration data"];
const FILE_TLDS = ["pdf", "xlsx", "xls", "csv", "png", "jpg", "jpeg", "webp", "svg", "txt", "docx", "json"];
const RESERVED_VAR = /^--(color|theme|font|shadow|radius|tw|container|nav|ease|section|spacing|text|breakpoint)-/;

class ConfigError extends Error {}

const mask = (t) => (t.length <= 2 ? "**" : `${t[0]}${"*".repeat(t.length - 2)}${t[t.length - 1]}`);
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const phraseRe = (p, flags) =>
  new RegExp(`(?<![\\p{L}\\p{N}])${escapeRe(p.normalize("NFKC").trim()).replace(/\s+/g, "\\s+")}(?![\\p{L}\\p{N}])`, flags);

export function parseDenyList(text) {
  const entries = [];
  text.split(/\r?\n/).forEach((raw, i) => {
    const line = raw.trim();
    if (!line || line.startsWith("#")) return;
    const site = line.startsWith("site:");
    const term = (site ? line.slice(5) : line).trim();
    if (term) entries.push({ line: i + 1, term, site });
  });
  return entries;
}

function loadDenyList() {
  if (!fs.existsSync(DENY_PATH)) {
    throw new ConfigError(`deny list missing at ${DENY_PATH} (set PS_DEMO_DENYLIST). Failing closed, ADR-0016 §5.`);
  }
  const entries = parseDenyList(fs.readFileSync(DENY_PATH, "utf8"));
  if (entries.length === 0) throw new ConfigError(`deny list at ${DENY_PATH} has no entries. Failing closed.`);
  return entries;
}

async function loadRegistry() {
  if (!fs.existsSync(INVENTED_DIR)) throw new ConfigError(`registry directory missing: ${INVENTED_DIR}`);
  const sets = [];
  for (const f of fs.readdirSync(INVENTED_DIR).filter((n) => n.endsWith(".ts")).sort()) {
    const mod = await import(pathToFileURL(path.join(INVENTED_DIR, f)).href);
    if (!mod.invented || typeof mod.invented.scope !== "string") {
      throw new ConfigError(`${f} does not export \`invented\` with a scope`);
    }
    sets.push(mod.invented);
  }
  return sets;
}

function loadCommon() {
  if (!fs.existsSync(COMMON_PATH)) throw new ConfigError(`common-word list missing: ${COMMON_PATH}`);
  return fs.readFileSync(COMMON_PATH, "utf8").split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));
}

/** What one page may show: _shared plus the page's own scope. */
function cfgFor(slug, sets, common, deny) {
  const use = sets.filter((s) => s.scope === "_shared" || s.scope === slug);
  const cfg = { phrases: [], domains: [], assets: [], words: [...common], labels: LABELS, fileTlds: FILE_TLDS };
  for (const s of use) {
    for (const p of s.people) cfg.phrases.push(`${p.first} ${p.last}`, p.first, p.last, ...(p.aliases ?? []));
    for (const b of s.businesses) cfg.phrases.push(b.name, ...(b.aliases ?? []));
    for (const t of s.towns) cfg.phrases.push(t.name);
    for (const a of s.approved) cfg.phrases.push(a.name);
    for (const d of s.domains) cfg.domains.push(d.domain.toLowerCase());
    for (const a of s.assets) cfg.assets.push(a.path);
    cfg.words.push(...s.vocabulary);
  }
  cfg.deny = deny.map((d) => ({ line: d.line, term: d.term }));
  return cfg;
}

/* Runs INSIDE the page (page.evaluate); the page's own scripts are disabled.
   Self-contained on purpose: closures do not cross into the page. */
function checkDocument(cfg) {
  const V = [];
  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const norm = (s) => s.normalize("NFKC").replace(/[‘’]/g, "'").replace(/\s+/g, " ").trim();
  const wordRe = (p) => new RegExp(`(?<![\\p{L}\\p{N}])${esc(norm(p)).replace(/ /g, "\\s+")}(?![\\p{L}\\p{N}])`, "giu");
  const maskTerm = (t) => (t.length <= 2 ? "**" : `${t[0]}${"*".repeat(t.length - 2)}${t[t.length - 1]}`);
  const phraseRes = [...new Set(cfg.phrases)].filter(Boolean).sort((a, b) => b.length - a.length).map(wordRe);
  const denyRes = cfg.deny.map((d) => ({ line: d.line, masked: maskTerm(d.term), re: wordRe(d.term) }));
  const words = new Set(cfg.words.map((w) => w.toLowerCase().replace(/\.$/, "")));
  // href/src/srcset/action/xlink:href: a link target or a file reference must
  // be readable by the domain and deny rules, not just visible prose (HIGH 2).
  const ATTRS = [
    "alt", "aria-label", "aria-description", "title", "placeholder", "value", "content", "label",
    "href", "src", "srcset", "action", "xlink:href",
  ];
  const at = (el) => {
    const beat = el.closest("[data-beat]")?.getAttribute("data-beat");
    return `${el.tagName.toLowerCase()}${beat ? ` in beat ${beat}` : ""}`;
  };
  const units = (root, skip) => {
    const out = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      const p = n.parentElement;
      if (!p || (skip && skip(p))) continue;
      const t = norm(n.nodeValue || "");
      if (t) out.push({ text: t, at: at(p) });
    }
    for (const el of [root, ...root.querySelectorAll("*")]) {
      if (skip && skip(el)) continue;
      for (const a of ATTRS) {
        const v = el.getAttribute(a);
        if (v && norm(v)) out.push({ text: norm(v), at: `${at(el)}[${a}]` });
      }
    }
    return out;
  };

  const stages = [...document.querySelectorAll("[data-demo-stage]")];
  for (const st of stages) {
    const id = st.getAttribute("data-demo-stage") || "(unnamed)";
    const labels = [...st.querySelectorAll("[data-demo-label]")].map((e) => norm(e.textContent || ""));
    if (labels.length !== 1 || !cfg.labels.includes(labels[0])) {
      V.push({ rule: "label", stage: id, detail: `labels found: ${JSON.stringify(labels)}` });
    }
    const narration = st.querySelector("[data-demo-narration]");
    if (!narration || norm(narration.textContent || "").length < 80) {
      V.push({ rule: "narration", stage: id, detail: "missing, or under 80 characters" });
    }
    for (const h of st.querySelectorAll("h1, h2")) {
      V.push({ rule: "heading", stage: id, detail: `<${h.tagName.toLowerCase()}> inside a stage` });
    }
    for (const img of st.querySelectorAll("img, source, image")) {
      const src = img.getAttribute("src") || img.getAttribute("srcset") || img.getAttribute("href") || "";
      const p = src.trim().split(/[\s?#]/)[0];
      if (p && !cfg.assets.includes(p)) V.push({ rule: "asset", stage: id, detail: `${p} is not a registered demo asset` });
    }
    for (const u of units(st)) {
      for (const m of u.text.matchAll(/(?<!\d)(?:\d[ -]?){8,}\d(?!\d)/g)) {
        V.push({ rule: "routing", stage: id, detail: `${JSON.stringify(m[0])} in ${u.at}` });
      }

      // Deny check runs on the RAW text, before any domain/filename stripping,
      // so a denied real name riding inside a filename, an email local part or
      // a link target (now read via ATTRS) is still caught (review-F.md HIGH 2).
      for (const d of denyRes) {
        d.re.lastIndex = 0;
        if (d.re.test(u.text)) V.push({ rule: "deny", stage: id, detail: `deny-list line ${d.line} (${d.masked}) in ${u.at}` });
      }

      const domRe = /\b[\w.+-]+@([a-z0-9-]+(?:\.[a-z0-9-]+)+)\b|\b((?:[a-z0-9-]+\.)+([a-z]{2,}))\b/gi;
      const localParts = [];
      for (const m of u.text.matchAll(domRe)) {
        const isEmail = Boolean(m[1]);
        const d = (m[1] || m[2] || "").toLowerCase();
        const isFilename = !isEmail && cfg.fileTlds.includes(d.split(".").pop());
        if (!isFilename && !cfg.domains.includes(d)) {
          V.push({ rule: "domain", stage: id, detail: `${JSON.stringify(m[0])} in ${u.at}` });
        }
        // The local part (an email's name before "@", or a filename's stem
        // before its extension) still needs the same token scan as ordinary
        // prose: a real surname must not escape by riding inside either shape.
        const at = m[0].indexOf("@");
        const local = at >= 0 ? m[0].slice(0, at) : m[0].replace(/\.[a-z0-9]+$/i, "");
        localParts.push(local.replace(/[._-]/g, " "));
      }
      let t = u.text.replace(domRe, " ");
      if (localParts.length) t += " " + localParts.join(" ");
      for (const re of phraseRes) t = t.replace(re, " ");
      for (const m of t.matchAll(/\p{L}[\p{L}\p{N}'.-]*/gu)) {
        for (const part of m[0].split("-")) {
          const core = part.replace(/'s$/i, "").replace(/[.']+$/g, "");
          if (!core || !/^\p{Lu}/u.test(core) || words.has(core.toLowerCase())) continue;
          V.push({ rule: "token", stage: id, detail: `${JSON.stringify(core)} in ${u.at}: "${u.text.slice(0, 90)}"` });
        }
      }
    }
  }

  const skipOutside = (el) => Boolean(el.closest("[data-demo-stage], style, template, script:not([type='application/ld+json'])"));
  for (const u of units(document.documentElement, skipOutside)) {
    if (/\$\s?\d|\bUSD\s?\d|\d\s?USD\b|\d\s?dollars?\b/i.test(u.text)) {
      V.push({ rule: "dollar-outside", stage: null, detail: `${JSON.stringify(u.text.slice(0, 90))} in ${u.at}` });
    }
  }
  return { violations: V, stages: stages.map((s) => s.getAttribute("data-demo-stage")) };
}

function* walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

function sourceChecks(deny) {
  const V = [];
  const res = deny.map((d) => ({ ...d, re: phraseRe(d.term, "iu") }));
  for (const root of SOURCE_ROOTS) {
    for (const f of walk(root)) {
      if (!/\.(tsx?|css|json|md)$/.test(f)) continue;
      const text = fs.readFileSync(f, "utf8");
      const rel = path.relative(ROOT, f);
      for (const d of res) if (d.re.test(text)) V.push({ rule: "deny", stage: null, detail: `deny-list line ${d.line} (${mask(d.term)}) in ${rel}` });
      if (f.endsWith(".css")) {
        // Comments may name the rule ("never @theme"); only code counts.
        const code = text.replace(/\/\*[\s\S]*?\*\//g, "");
        if (/@theme\b/.test(code)) V.push({ rule: "css-namespace", stage: null, detail: `${rel} contains @theme` });
        for (const m of code.matchAll(/(--[a-z0-9-]+)\s*:/gi)) {
          if (RESERVED_VAR.test(m[1])) V.push({ rule: "css-namespace", stage: null, detail: `${rel} declares ${m[1]}` });
        }
      }
    }
  }
  return V;
}

function siteChecks(deny) {
  const site = deny.filter((d) => d.site).map((d) => ({ ...d, re: phraseRe(d.term, "iu") }));
  const V = [];
  if (site.length === 0) return V;
  for (const f of walk(OUT)) {
    if (!/\.(html|txt|js|css|json|xml|webmanifest)$/.test(f)) continue;
    const text = fs.readFileSync(f, "utf8");
    for (const d of site) {
      if (d.re.test(text)) V.push({ rule: "deny-site", stage: null, detail: `deny-list line ${d.line} (${mask(d.term)}) in ${path.relative(ROOT, f)}` });
    }
  }
  return V;
}

async function checkHtml(page, html, cfg) {
  await page.setContent(html, { waitUntil: "domcontentloaded" });
  return page.evaluate(checkDocument, cfg);
}

async function newPage(browser) {
  const context = await browser.newContext({ javaScriptEnabled: false });
  await context.route("**/*", (r) => r.abort());
  return { context, page: await context.newPage() };
}

function report(V, summary) {
  for (const v of V) console.log(`  FAIL  [${v.rule}] ${v.page ?? ""}${v.stage ? ` stage=${v.stage}` : ""}  ${v.detail}`);
  console.log(V.length ? `\nFAIL  ${V.length} violation(s). ${summary}` : `PASS  ${summary}`);
}

async function main() {
  const dir = path.join(OUT, "case-studies");
  if (!fs.existsSync(dir)) throw new ConfigError(`no built export at ${dir}. Run \`npm run build\` first; this probe builds nothing.`);
  const deny = loadDenyList();
  const sets = await loadRegistry();
  const common = loadCommon();
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".html")).map((f) => path.join(dir, f));
  const hub = path.join(OUT, "case-studies.html");
  if (fs.existsSync(hub)) files.push(hub);
  if (files.length === 0) throw new ConfigError(`no case-study pages in ${dir}`);

  const browser = await chromium.launch();
  const V = [];
  let stageCount = 0;
  try {
    const { context, page } = await newPage(browser);
    for (const f of files) {
      const slug = path.basename(f, ".html");
      const res = await checkHtml(page, fs.readFileSync(f, "utf8"), cfgFor(slug, sets, common, deny));
      stageCount += res.stages.length;
      const route = `/${path.relative(OUT, f).replace(/\.html$/, "")}`;
      for (const v of res.violations) V.push({ page: route, ...v });
    }
    await context.close();
  } finally {
    await browser.close();
  }
  V.push(...sourceChecks(deny), ...siteChecks(deny));
  report(V, `${files.length} pages, ${stageCount} stages, ${deny.length} deny entries, ${sets.length} registry sets`);
  return V.length ? 1 : 0;
}

/* ---------------------------------------------------------------- self-test */

const SELF_SET = {
  scope: "_self",
  people: [{ id: "p", first: "Dale", last: "Whitcomb", checked: "self-test fixture" }],
  businesses: [{ id: "b", name: "Harlan Feed Co.", checked: "self-test fixture" }],
  towns: [],
  domains: [{ id: "d", domain: "harlanfeed.example" }],
  vocabulary: [],
  approved: [],
  assets: [],
};

const PAGE = (inStage, head = "") =>
  `<!doctype html><html><head><title>Self test</title>${head}</head><body><main><p>Outside copy.</p>` +
  `<figure data-demo-stage="kit"><figcaption><h3>A stage</h3><span data-demo-label>Demonstration data</span></figcaption>` +
  `<p data-demo-narration>This stage shows a deposit tied to an invoice, one step at a time, on invented data. ` +
  `Nothing on it is real. The data is a demonstration.</p><div data-beat="b1"><p>${inStage}</p></div></figure></main></body></html>`;

/** Full control over the label and narration, for review-F.md MEDIUM 4's label/narration cases. */
const PAGE_STAGE = (label, narration) =>
  `<!doctype html><html><head><title>Self test</title></head><body><main><p>Outside copy.</p>` +
  `<figure data-demo-stage="kit"><figcaption><h3>A stage</h3>${label}</figcaption>` +
  `${narration}<div data-beat="b1"><p>Paid.</p></div></figure></main></body></html>`;

const CASES = [
  { name: "clean control", html: PAGE("Harlan Feed Co. paid INV-2031 for $1,250.00. Dale Whitcomb approved it. billing@harlanfeed.example"), expect: [] },
  { name: "unregistered name", html: PAGE("Zorbanek paid the invoice."), expect: ["token"] },
  { name: "routing-shaped number", html: PAGE("Routing 123 456 789"), expect: ["routing"] },
  { name: "amount outside the stage", html: PAGE("Paid.", `<meta name="description" content="Saved $4,200 a month">`), expect: ["dollar-outside"] },
  { name: "amount in JSON-LD", html: PAGE("Paid.", `<script type="application/ld+json">{"description":"Saved $4,200"}</script>`), expect: ["dollar-outside"] },
  { name: "real-looking domain", html: PAGE("Mail billing@harlanfeed.com"), expect: ["domain"] },
  { name: "deny-list term", html: PAGE("Qzxplanted paid."), deny: ["Qzxplanted"], expect: ["deny", "token"] },
  { name: "heading inside a stage", html: PAGE("<h2>Paid</h2>"), expect: ["heading"] },
  { name: "RSC references are not amounts", html: PAGE("Paid.", `<script>self.__next_f.push([1,"$L3 $1 $undefined"])</script>`), expect: [] },
  // review-F.md HIGH 2: a denied real name must not escape by riding inside a
  // filename, an email local part, or a link target (href was unread before).
  { name: "filename carries a deny term", html: PAGE("See attached Whitcomb.pdf for the account."), deny: ["Whitcomb"], expect: ["deny"] },
  { name: "hyphenated filename carries a deny term", html: PAGE("See whitcomb-march.pdf, attached."), deny: ["Whitcomb"], expect: ["deny"] },
  { name: "capitalised filename, no deny entry", html: PAGE("Attached: Zorbanek.pdf"), expect: ["token"] },
  {
    name: "email local part carries a deny term (registered domain)",
    html: PAGE("See whitcomb@harlanfeed.example for the account."),
    deny: ["Whitcomb"],
    expect: ["deny"],
  },
  {
    name: "href to an unregistered admin domain",
    html: PAGE('See <a href="https://realadmin.example.org">the admin panel</a>.'),
    deny: ["realadmin.example.org"],
    expect: ["deny", "domain"],
  },
  {
    name: "mailto href to a real person",
    html: PAGE('<a href="mailto:whitcomb@realclient.example.org">Email</a>'),
    deny: ["Whitcomb"],
    expect: ["deny", "domain"],
  },
  // review-F.md MEDIUM 4: label, narration and asset must each be shown red once.
  { name: "no label at all", html: PAGE_STAGE("", `<p data-demo-narration>This stage shows a deposit tied to an invoice, one step at a time, on invented data. Nothing on it is real. The data is a demonstration.</p>`), expect: ["label"] },
  { name: "wrong label text", html: PAGE_STAGE(`<span data-demo-label>wrong label</span>`, `<p data-demo-narration>This stage shows a deposit tied to an invoice, one step at a time, on invented data. Nothing on it is real. The data is a demonstration.</p>`), expect: ["label"] },
  { name: "two labels", html: PAGE_STAGE(`<span data-demo-label>Demonstration data</span><span data-demo-label>Demonstration data</span>`, `<p data-demo-narration>This stage shows a deposit tied to an invoice, one step at a time, on invented data. Nothing on it is real. The data is a demonstration.</p>`), expect: ["label"] },
  { name: "narration missing", html: PAGE_STAGE(`<span data-demo-label>Demonstration data</span>`, ""), expect: ["narration"] },
  { name: "narration too short", html: PAGE_STAGE(`<span data-demo-label>Demonstration data</span>`, `<p data-demo-narration>not enough words here.</p>`), expect: ["narration"] },
  { name: "unregistered image asset", html: PAGE('<img src="/images/demos/unregistered.jpg" alt="a screen">'), expect: ["asset"] },
];

async function runSelfTest() {
  const common = loadCommon();
  let bad = 0;
  const say = (ok, name, got) => {
    if (!ok) bad += 1;
    console.log(`  ${ok ? "PASS" : "FAIL"}  self-test: ${name}${got !== undefined ? `  -> [${got.join(", ")}]` : ""}`);
  };
  const browser = await chromium.launch();
  try {
    const { context, page } = await newPage(browser);
    for (const c of CASES) {
      const deny = (c.deny ?? []).map((term, i) => ({ line: i + 1, term, site: false }));
      const cfg = cfgFor("_self", [SELF_SET], common, deny);
      const { violations } = await checkHtml(page, c.html, cfg);
      const got = [...new Set(violations.map((v) => v.rule))].sort();
      say(JSON.stringify(got) === JSON.stringify([...c.expect].sort()), c.name, got);
    }
    await context.close();
  } finally {
    await browser.close();
  }

  // Fail-closed: a missing or empty deny list, or a missing export, is exit 2.
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "demo-privacy-"));
  fs.mkdirSync(path.join(tmp, "case-studies"));
  fs.writeFileSync(path.join(tmp, "case-studies", "x.html"), PAGE("Paid."));
  const empty = path.join(tmp, "empty.txt");
  fs.writeFileSync(empty, "# no entries\n");
  const runs = [
    ["missing deny list exits 2", { PS_OUT_DIR: tmp, PS_DEMO_DENYLIST: path.join(tmp, "absent.txt") }],
    ["empty deny list exits 2", { PS_OUT_DIR: tmp, PS_DEMO_DENYLIST: empty }],
    ["missing export exits 2", { PS_OUT_DIR: path.join(tmp, "absent-out"), PS_DEMO_DENYLIST: empty }],
  ];
  for (const [name, env] of runs) {
    const r = spawnSync(process.execPath, [SELF], { env: { ...process.env, ...env }, encoding: "utf8" });
    say(r.status === 2, `${name} (got ${r.status})`);
  }
  fs.rmSync(tmp, { recursive: true, force: true });

  // review-F.md MEDIUM 4: deny-site, css-namespace and the source-file deny
  // check (sourceChecks) are not exercised by checkDocument at all — they read
  // the filesystem directly. Spawn the real probe (not --self-test) against a
  // planted temp export and a planted temp source root (PS_SOURCE_ROOTS), and
  // confirm each rule fires at least once.
  const fsTmp = fs.mkdtempSync(path.join(os.tmpdir(), "demo-privacy-fs-"));
  fs.mkdirSync(path.join(fsTmp, "case-studies"));
  fs.writeFileSync(path.join(fsTmp, "case-studies", "x.html"), PAGE("Paid."));
  fs.writeFileSync(path.join(fsTmp, "leaked.txt"), "SelfTestSiteTerm appears in a served file.\n");
  const srcTmp = path.join(fsTmp, "fake-source");
  fs.mkdirSync(srcTmp);
  fs.writeFileSync(srcTmp + "/bad.css", "/* planted css-namespace test file */\n.foo { --color-primary: #000; }\n@theme { }\n");
  fs.writeFileSync(srcTmp + "/bad.ts", "// SelfTestSourceTerm should never be committed here\n");
  const fsDeny = path.join(fsTmp, "deny.txt");
  fs.writeFileSync(fsDeny, "SelfTestSourceTerm\nsite:SelfTestSiteTerm\n");
  const fsRun = spawnSync(process.execPath, [SELF], {
    env: { ...process.env, PS_OUT_DIR: fsTmp, PS_DEMO_DENYLIST: fsDeny, PS_SOURCE_ROOTS: srcTmp },
    encoding: "utf8",
  });
  const fsOut = `${fsRun.stdout}\n${fsRun.stderr}`;
  const fired = (rule) => new RegExp(`\\[${rule}\\]`).test(fsOut);
  say(fsRun.status === 1, `planted filesystem-level run exits 1 (got ${fsRun.status})`);
  say(fired("deny-site"), "  deny-site rule fired");
  say(fired("css-namespace"), "  css-namespace rule fired");
  say(fired("deny"), "  source-file deny rule fired (sourceChecks)");
  fs.rmSync(fsTmp, { recursive: true, force: true });

  console.log(bad ? `\nFAIL  self-test: ${bad} case(s) did not behave` : "PASS  self-test: every planted string went red, the clean control stayed green");
  return bad ? 1 : 0;
}

try {
  process.exitCode = process.argv.includes("--self-test") ? await runSelfTest() : await main();
} catch (e) {
  if (e instanceof ConfigError) {
    console.error(`CONFIG  ${e.message}`);
    process.exitCode = 2;
  } else {
    console.error(e);
    process.exitCode = 1;
  }
}
