// src/data/showcase/scenes/hg-coi.ts — the HG Oil "COI" scene (ADR-0022 §4).
// Pure data: no React. The scene is src/components/showcase/scenes/HgCoiScene.tsx.
//
// One vendor's chase, start to finish, in the engine's own words. Source of
// every wording and rule: ~/.claude/agent-reports/ps-showcase-revamp-2026-11-03/
// coi-engine-flow.md (read-only study of ps-admin worker/src/coi*.js):
//   section 0  emails are written by one AI correspondent from the whole
//              thread, checked in code, passed by an independent judge; the
//              engine never rejects on limits, holder or endorsements; no
//              exclamation marks; the AI never says what it is.
//   section 2  the owner-approved seeds (first ask 2.1, reminder 2.4, redirect
//              ack 2.7, thanks 2.8), filled here for the invented cast.
//   section 3  the fields the reader records (`record_certificate`).
//   section 5  the panel's own words (Covered / Expiring / Not covered,
//              record sentences, last-touch phrases).
//   section 6  the 9-beat script this follows.
// Deliberate departures from the seeds, both for privacy: "in Plainville" is
// left out of the first ask, and the certificate holder's address is a
// placeholder (PO Box 000, Anytown, KS 00000), never HG Oil's real one.
//
// Every person, business, town and domain comes from the invented-name
// registry (src/data/demos/invented/hg-oil.ts) through the helpers below, so
// a name that is not registered fails the build, and the privacy probe reads
// what the window draws.
import { business, domain, person, town } from "@/data/demos/_invented";

const vendor = business("prairie-dog-pumping");
if (!vendor.aliases?.includes("Prairie Dog Pumping")) throw new Error("[hg-coi] register the short vendor name as an alias");
const V = vendor.name; // "Prairie Dog Pumping, LLC"
const V_SHORT = "Prairie Dog Pumping";
const AGENCY = business("smoky-valley-insurance").name;
const INS_A = business("larkspur-ridge-casualty").name;
const INS_B = business("ninebark-mutual").name;
const dale = person("hg-coi-dale");
const marcy = person("hg-coi-marcy");
const AGENCY_TOWN = town("hg-aldervale").name;
const VENDOR_TOWN = town("hg-emberton").name;
const HOLDER_TOWN = town("hg-anytown").name;

const MAILBOX = `audit@${domain("hg-coi-mailbox")}`;
const DALE_EMAIL = `${dale.first.toLowerCase()}@${domain("hg-coi-vendor")}`;
const MARCY_EMAIL = `${marcy.first.toLowerCase()}@${domain("hg-coi-agency")}`;

/** The engine's signature (coiRules.js:78-79). */
export const SIGNATURE = ["Tyler Preisser", "Preisser Solutions, on behalf of HG Oil Holdings"] as const;
const OUR_NAME = "Tyler Preisser";

/* ── The certificate ─────────────────────────────────────────────────────── */

export interface AcordPolicy {
  ltr: string;
  addl: string;
  subr: string;
  number: string;
  eff: string;
  exp: string;
}

export interface AcordData {
  /** Issue date, MM/DD/YYYY. */
  date: string;
  producer: { lines: readonly string[]; contact: string; phone: string; fax: string; email: string };
  insured: readonly string[];
  insurers: readonly { letter: string; name: string; naic: string }[];
  certificateNumber: string;
  gl: AcordPolicy & { eachOcc: string; rented: string; med: string; pai: string; genAgg: string; prodAgg: string };
  auto: AcordPolicy & { csl: string };
  umbrella: AcordPolicy & { eachOcc: string; agg: string; retention: string };
  wc: AcordPolicy & { excluded: "Y" | "N"; each: string; disEmp: string; disPol: string };
  description: string;
  holder: readonly string[];
}

const HOLDER = ["HG Oil Holdings, LLC", "PO Box 000", `${HOLDER_TOWN}, KS 00000`] as const;
const PRODUCER_LINES = [AGENCY, "118 W Main St", `${AGENCY_TOWN}, KS 67200`] as const;
const INSURED = [V, "2210 County Road 9", `${VENDOR_TOWN}, KS 67100`] as const;
const INSURERS = [
  { letter: "A", name: INS_A, naic: "24571" },
  { letter: "B", name: INS_B, naic: "31806" },
] as const;
const DESCRIPTION =
  "Oil and gas well pumping and lease service. Certificate holder is additional insured on general liability and auto, " +
  "and waiver of subrogation applies to general liability, auto and workers compensation, where required by written contract.";
const LIMITS = {
  gl: { eachOcc: "1,000,000", rented: "100,000", med: "5,000", pai: "1,000,000", genAgg: "2,000,000", prodAgg: "2,000,000" },
  csl: "1,000,000",
  umb: { eachOcc: "2,000,000", agg: "2,000,000", retention: "10,000" },
  wc: { each: "1,000,000", disEmp: "1,000,000", disPol: "1,000,000" },
};

function certificate(o: { date: string; eff: string; exp: string; nums: [string, string, string, string]; certNo: string; withContact: boolean }): AcordData {
  return {
    date: o.date,
    producer: {
      lines: PRODUCER_LINES,
      // Last year's certificate printed no contact and no e-mail: that is why
      // the first ask goes to the vendor (beat 4), not to the agent.
      contact: o.withContact ? `${marcy.first} ${marcy.last}` : "",
      phone: "(785) 555-0147",
      fax: "(785) 555-0148",
      email: o.withContact ? MARCY_EMAIL : "",
    },
    insured: INSURED,
    insurers: INSURERS,
    certificateNumber: o.certNo,
    gl: { ltr: "A", addl: "Y", subr: "Y", number: o.nums[0], eff: o.eff, exp: o.exp, ...LIMITS.gl },
    auto: { ltr: "A", addl: "Y", subr: "Y", number: o.nums[1], eff: o.eff, exp: o.exp, csl: LIMITS.csl },
    umbrella: { ltr: "A", addl: "", subr: "", number: o.nums[2], eff: o.eff, exp: o.exp, ...LIMITS.umb },
    wc: { ltr: "B", addl: "", subr: "Y", number: o.nums[3], eff: o.eff, exp: o.exp, excluded: "N", ...LIMITS.wc },
    description: DESCRIPTION,
    holder: HOLDER,
  };
}

/** Beat 1: last year's certificate, from HG Oil's own files. */
export const OLD_CERT = certificate({
  date: "10/14/2025",
  eff: "10/12/2025",
  exp: "10/12/2026",
  nums: ["CPP 4418207", "BA 4418208", "CU 4418209", "WC 8830152"],
  certNo: "CL2510417",
  withContact: false,
});

/** Beat 7: the renewal, as Marcy sends it. */
export const NEW_CERT = certificate({
  date: "11/05/2026",
  eff: "10/12/2026",
  exp: "10/12/2027",
  nums: ["CPP 5520931", "BA 5520932", "CU 5520933", "WC 9914276"],
  certNo: "CL2611052",
  withContact: true,
});

/* ── What the reader records (coiPrompts.js record_certificate), in human words ── */

export interface ReadRow {
  label: string;
  value: string;
  /** The region of the form this came from (Acord25 data-region). */
  region: string;
}

export interface ReadPolicy {
  type: string;
  ltr: string;
  number: string;
  term: string;
  limit: string;
  marks: string;
}

export interface CertRead {
  file: string;
  rows: readonly ReadRow[];
  policies: readonly ReadPolicy[];
  after: readonly ReadRow[];
}

function readOf(c: AcordData, file: string): CertRead {
  const term = (p: AcordPolicy) => `${p.eff} to ${p.exp}`;
  const marks = (p: AcordPolicy) => [p.addl ? "addl insd" : "", p.subr ? "subr wvd" : ""].filter(Boolean).join(", ") || "none marked";
  return {
    file,
    rows: [
      { label: "Form", value: `ACORD 25 (2016/03), issued ${c.date}`, region: "head" },
      {
        label: "Producer",
        value: c.producer.contact ? `${AGENCY} · ${c.producer.contact} · ${c.producer.email}` : `${AGENCY} · no contact or e-mail printed`,
        region: "producer",
      },
      { label: "Insured", value: `${c.insured[0]} · ${c.insured[1]}, ${c.insured[2]}`, region: "insured" },
      { label: "Insurers", value: c.insurers.map((i) => `${i.letter} ${i.name} (NAIC ${i.naic})`).join(" · "), region: "insurers" },
    ],
    policies: [
      { type: "General liability", ltr: c.gl.ltr, number: c.gl.number, term: term(c.gl), limit: `$${c.gl.eachOcc} each occurrence · $${c.gl.genAgg} aggregate`, marks: marks(c.gl) },
      { type: "Auto", ltr: c.auto.ltr, number: c.auto.number, term: term(c.auto), limit: `$${c.auto.csl} combined single limit`, marks: marks(c.auto) },
      { type: "Umbrella", ltr: c.umbrella.ltr, number: c.umbrella.number, term: term(c.umbrella), limit: `$${c.umbrella.eachOcc} each occurrence`, marks: marks(c.umbrella) },
      { type: "Workers comp", ltr: c.wc.ltr, number: c.wc.number, term: term(c.wc), limit: `$${c.wc.each} each accident · per statute`, marks: marks(c.wc) },
    ],
    after: [
      { label: "Operations", value: "Oil and gas well pumping and lease service", region: "description" },
      { label: "Endorsements", value: "Additional insured, waiver of subrogation (mentioned)", region: "description" },
      { label: "Holder", value: c.holder.join(", "), region: "holder" },
    ],
  };
}

export const OLD_READ = readOf(OLD_CERT, `${V_SHORT} COI 2025-26.pdf`);
export const NEW_READ = readOf(NEW_CERT, `${V_SHORT} COI 2026-27.pdf`);

/** Beat 7: the checks the engine really makes, in its order (coiRules.js verdict). Never a limit, holder or endorsement check. */
export const VERDICT_CHECKS: readonly { check: string; result: string }[] = [
  { check: "A certificate", result: "yes, an ACORD 25" },
  { check: "Readable", result: "yes" },
  { check: `Insured matches ${V}`, result: "yes" },
  { check: "Dates plausible", result: "yes" },
  { check: "Not expired", result: "general liability ends Oct 12, 2027" },
  { check: "An insured amount on a line still in force", result: "yes" },
];

/* ── The mail ────────────────────────────────────────────────────────────── */

export type Who = "us" | "vendor" | "agent";

export interface MailMessage {
  id: string;
  who: Who;
  name: string;
  address: string;
  to: string;
  cc?: string;
  when: string;
  /** Body paragraphs, greeting first. */
  body: readonly string[];
  /** Closing and signature lines (code writes these, coiRules.js:2862, :5236). */
  sign: readonly string[];
  attach?: { name: string; size: string };
  /** One line for the inbox list. */
  snippet: string;
}

export const SUBJECT = `Certificate of insurance for ${V} - HG Oil Holdings`;

/** Shown highlighted in the ask: it appears only for a vendor that invoiced HG Oil this year (coiRules.js:3013-3027). */
export const PAYMENT_HOLD =
  "HG Oil isn't able to release payments to vendors without a current certificate on file, so payments will wait until this is on file.";

const ASK: MailMessage = {
  id: "ask",
  who: "us",
  name: OUR_NAME,
  address: MAILBOX,
  to: `${dale.first} ${dale.last}`,
  when: "Tue, Nov 3, 9:12 AM",
  body: [
    `Hi ${dale.first},`,
    `I keep the vendor insurance records for HG Oil Holdings. HG Oil requires an up-to-date certificate of insurance on file for every vendor they pay, no matter the amount, and ${V} is one of their vendors. The certificate we have on file ended October 12, 2026, so we don't have an up-to-date one for them. ${PAYMENT_HOLD}`,
    `Please reply to this email with a current certificate of liability insurance for ${V} attached as a PDF at your earliest convenience. It should name HG Oil Holdings, LLC as the certificate holder and show each policy's insured amount and expiration date.`,
    "If your insurance agent handles these, you may forward this email to them, or send me their email address and I will write to them directly.",
  ],
  sign: ["Best regards,", ...SIGNATURE],
  snippet: `Hi ${dale.first}, I keep the vendor insurance records for HG Oil Holdings.`,
};

/** Dale's own words: the AI's reply may only say what this sentence supports (coiPlaybook.js truth rule). */
export const DALE_QUOTE = `I have requested this from our insurance agent, ${marcy.first} with ${AGENCY}.`;

const REPLY: MailMessage = {
  id: "reply",
  who: "vendor",
  name: `${dale.first} ${dale.last}`,
  address: DALE_EMAIL,
  to: OUR_NAME,
  when: "Wed, Nov 4, 11:40 AM",
  body: [DALE_QUOTE],
  sign: [`${dale.first} ${dale.last}`, V, "Sent from my iPhone"],
  snippet: DALE_QUOTE,
};

const ANSWER: MailMessage = {
  id: "answer",
  who: "us",
  name: OUR_NAME,
  address: MAILBOX,
  to: `${dale.first} ${dale.last}`,
  when: "Wed, Nov 4, 12:47 PM",
  body: [
    `Hi ${dale.first},`,
    `Thank you for letting me know ${marcy.first} at ${AGENCY} handles your insurance. I will watch for the certificate from her, and I will write to her directly if it does not arrive.`,
  ],
  sign: ["Best regards,", ...SIGNATURE],
  snippet: `Thank you for letting me know ${marcy.first} at ${AGENCY} handles your insurance.`,
};

const CERT_MAIL: MailMessage = {
  id: "cert",
  who: "agent",
  name: `${marcy.first} ${marcy.last}`,
  address: MARCY_EMAIL,
  to: OUR_NAME,
  cc: `${dale.first} ${dale.last}`,
  when: "Thu, Nov 5, 2:18 PM",
  body: [`Certificate for ${V_SHORT} attached.`],
  sign: [`${marcy.first} ${marcy.last}`, AGENCY, "(785) 555-0147"],
  attach: { name: NEW_READ.file, size: "212 KB" },
  snippet: `Certificate for ${V_SHORT} attached.`,
};

// The person who sent it is the one thanked: "Thank you." never "I wanted to
// let you know we received" (owner, Q103). The last sentence is a thanks, so
// code drops the "Best regards," line (coiRules.js:5236).
const THANKS: MailMessage = {
  id: "thanks",
  who: "us",
  name: OUR_NAME,
  address: MAILBOX,
  to: `${marcy.first} ${marcy.last}`,
  cc: `${dale.first} ${dale.last}`,
  when: "Thu, Nov 5, 3:02 PM",
  body: [
    `Hi ${marcy.first},`,
    `Thank you. We received the certificate, and ${V} is on file with HG Oil Holdings through October 12, 2027. I will reach out again before it comes due. Thanks again for getting this over to us.`,
  ],
  sign: [...SIGNATURE],
  snippet: `Thank you. We received the certificate, and ${V} is on file through October 12, 2027.`,
};

export const MAIL = { ask: ASK, reply: REPLY, answer: ANSWER, cert: CERT_MAIL, thanks: THANKS } as const;
export const MAILBOX_ADDRESS = MAILBOX;

/** Other threads in the mailbox list, so it reads as a working inbox. */
export const OTHER_THREADS: readonly { name: string; subject: string; when: string; attach?: boolean }[] = [
  { name: business("ironweed-water-hauling").name, subject: `Re: Certificate of insurance for ${business("ironweed-water-hauling").name} - HG Oil Holdings`, when: "Nov 2", attach: true },
  { name: business("chalk-bluff-hot-oil").name, subject: `Re: Certificate of insurance for ${business("chalk-bluff-hot-oil").name} - HG Oil Holdings`, when: "Oct 30", attach: true },
  { name: business("quarry-hill-welding").name, subject: `Re: Certificate of insurance for ${business("quarry-hill-welding").name} - HG Oil Holdings`, when: "Oct 27" },
  // Older, read threads: a working mailbox is never four threads deep (critic r1 #7).
  { name: business("kettle-creek-water").name, subject: `Re: Certificate of insurance for ${business("kettle-creek-water").name} - HG Oil Holdings`, when: "Oct 23", attach: true },
  { name: business("sandhill-injection").name, subject: `Re: Certificate of insurance for ${business("sandhill-injection").name} - HG Oil Holdings`, when: "Oct 21", attach: true },
  { name: business("red-cedar-roustabout").name, subject: `Re: Certificate of insurance for ${business("red-cedar-roustabout").name} - HG Oil Holdings`, when: "Oct 20" },
  { name: business("thornbush-water").name, subject: `Re: Certificate of insurance for ${business("thornbush-water").name} - HG Oil Holdings`, when: "Oct 16", attach: true },
];

/** What the classifier made of Dale's reply (coiPrompts.js classify_vendor_reply). */
export const READ_AS = {
  meaning: "redirect",
  contact: `${marcy.first}, insurance agent at ${AGENCY}`,
  summary: `Agent at ${AGENCY} will issue the certificate`,
} as const;

/* ── Beat 4: who to write, and the reminder ladder ─────────────────────────── */

export const HUNT = {
  steps: [
    { k: "On last year's certificate", v: `${AGENCY}: no contact, no e-mail printed` },
    { k: "So it searched HG Oil's mail", v: `for invoices from ${V_SHORT}` },
    { k: "Found", v: `${dale.first} invoiced HG Oil Oct 14 from ${DALE_EMAIL}` },
  ],
  query: `from:${V_SHORT} invoice`,
  hit: { from: DALE_EMAIL, subject: `Invoice 2291 - ${V}`, when: "Oct 14" },
  bounce: "An address that bounces gets the same search: the address they invoiced from.",
} as const;

/** Lapsed tier (ended within 30 days): every 5 to 10 days, the AI picks each gap (coiRules.js:132-134). */
export const LADDER = {
  band: "Ended less than 30 days ago: a reminder every 5 to 10 days. The AI picks each gap.",
  rungs: [
    { when: "Nov 3", what: "The ask", state: "sent" },
    { when: "About Nov 10", what: "Reminder", state: "next" },
    { when: "About Nov 17", what: "Reminder", state: "later" },
    { when: "About Nov 24", what: "Last note", state: "later" },
  ],
  after: "Still silent after the last note: it goes to a person, in Needs me.",
  never: "Never chased after a reply that asks it to wait. Never chased once covered.",
  reminder: `I am following up on the certificate of insurance for ${V}, since HG Oil needs a current certificate on file for every vendor they pay. Please reply to this email with the PDF attached at your earliest convenience, or ask your agent to send it.`,
} as const;

/* ── The vendor desk (panel words: words.ts COV_LOOK, record sentences, last touch) ── */

export type Cov = "covered" | "expiring" | "missing";

export interface DeskRow {
  name: string;
  cov: Cov;
  record: string;
  touch: string;
  needs?: string;
  source?: string;
}

const COVERED_OTHERS: readonly DeskRow[] = [
  { name: business("chalk-bluff-hot-oil").name, cov: "covered", record: "Covered through Mar 1, 2027.", touch: "Accepted Oct 30" },
  { name: business("ironweed-water-hauling").name, cov: "covered", record: "Covered through Jun 1, 2027.", touch: "Accepted Nov 2" },
  { name: business("quarry-hill-welding").name, cov: "covered", record: "Covered through Aug 15, 2027.", touch: "Accepted Oct 27" },
  { name: business("kettle-creek-water").name, cov: "covered", record: "Covered through May 1, 2027.", touch: "Accepted Oct 23" },
  { name: business("sandhill-injection").name, cov: "covered", record: "Covered through Jan 15, 2027.", touch: "Accepted Oct 21" },
  { name: business("thornbush-water").name, cov: "covered", record: "Covered through Sep 30, 2027.", touch: "Accepted Oct 16" },
];
const RED_CEDAR = business("red-cedar-roustabout").name;

export const DESK_BEFORE: readonly DeskRow[] = [
  {
    name: V,
    cov: "missing",
    record: "Not covered since Oct 12, 2026: general liability ended.",
    touch: "Not asked yet",
    source: `Invoiced this year · Oct 14 · from ${DALE_EMAIL}`,
  },
  { name: RED_CEDAR, cov: "expiring", record: "General liability ends Dec 21, 2026, in 48 days.", touch: "Asked Oct 26" },
  ...COVERED_OTHERS,
];

export const DESK_AFTER: readonly DeskRow[] = [
  { name: V, cov: "covered", record: "Covered through Oct 12, 2027.", touch: "Accepted Nov 5" },
  {
    name: RED_CEDAR,
    cov: "expiring",
    record: "General liability ends Dec 21, 2026, in 48 days.",
    touch: "Asked Oct 26",
    needs: "Asked something only you can answer",
  },
  ...COVERED_OTHERS,
];

export const deskCounts = (rows: readonly DeskRow[]) => ({
  missing: rows.filter((r) => r.cov === "missing").length,
  expiring: rows.filter((r) => r.cov === "expiring").length,
  covered: rows.filter((r) => r.cov === "covered").length,
  needs: rows.filter((r) => r.needs).length,
});

/* ── Beat 8 and 9: filed, and the package (coiExport.js:4-8, coiPackage.js:27-28) ── */

const fileName = (vendorName: string, expIso: string) => `${vendorName} - COI - exp ${expIso}.pdf`;
export const FILED = `Certificates/${fileName(V, "2027-10-12")}`;
export const PACKAGE = {
  zip: "HG Oil vendor insurance 2026.zip",
  rundown: "HG Oil vendor rundown 2026.pdf",
  files: [
    fileName(business("chalk-bluff-hot-oil").name, "2027-03-01"),
    fileName(business("ironweed-water-hauling").name, "2027-06-01"),
    fileName(V, "2027-10-12"),
    fileName(business("quarry-hill-welding").name, "2027-08-15"),
    fileName(RED_CEDAR, "2026-12-21"),
    fileName(business("sandhill-injection").name, "2027-01-15"),
    fileName(business("thornbush-water").name, "2027-09-30"),
    fileName(business("kettle-creek-water").name, "2027-05-01"),
  ].sort(),
  note: "Every accepted certificate, ready for HG Oil's insurer.",
  loop: "When a policy nears its end, the loop starts again: a renewal notice 60 days out, one reminder, then quiet until it ends.",
} as const;

/* ── The beats ───────────────────────────────────────────────────────────── */

export type CoiBeatId = "read" | "detect" | "ask" | "chase" | "reply" | "answer" | "cert" | "filed" | "package";

export interface CoiBeat {
  id: CoiBeatId;
  /** The step strip's label. */
  title: string;
  /** The window's caption line while this beat plays. */
  caption: string;
  /** How long it plays; the email moments dwell longest. */
  ms: number;
}

export const COI_BEATS: readonly CoiBeat[] = [
  { id: "read", title: "Reads it", caption: "Last year's ACORD 25 from HG Oil's files. The AI reads every field as printed.", ms: 14500 },
  { id: "detect", title: "Finds the gap", caption: "The 7:15 morning check: the policies ended Oct 12, so the vendor turns red.", ms: 6000 },
  { id: "ask", title: "Asks", caption: "The AI writes the ask. Code checks it and an independent judge passes it before it sends.", ms: 16000 },
  { id: "chase", title: "Follows up", caption: "No agent e-mail on the old certificate, so it found Dale's address on his invoice. Silence gets reminders.", ms: 10000 },
  { id: "reply", title: "Reads reply", caption: "Dale answers the next day. The AI reads his reply with the whole thread.", ms: 9000 },
  { id: "answer", title: "Answers", caption: "It answers an hour later, as a person would, and says only what Dale's own words support.", ms: 14000 },
  { id: "cert", title: "Reads renewal", caption: "Marcy sends the renewal. It is read and checked: a certificate, readable, the right insured, live dates, an insured amount.", ms: 15800 },
  { id: "filed", title: "Files it", caption: "Marcy is thanked, the PDF is filed by its end date, and the vendor turns green.", ms: 12500 },
  { id: "package", title: "Package", caption: "One press builds the year's package for HG Oil's insurer. Renewals start the loop again.", ms: 9500 },
];

export const COI_TOTAL_MS = COI_BEATS.reduce((n, b) => n + b.ms, 0);

export const coiNarration =
  `Demonstration: HG Oil's vendor insurance engine chasing one vendor, ${V}, on invented data. ` +
  "The AI reads last year's ACORD 25 certificate field by field and finds the policies ended October 12. " +
  `It emails ${dale.first}, the owner, for a current certificate; his address came from an invoice he sent HG Oil. ` +
  `${dale.first} replies that his agent, ${marcy.first} at ${AGENCY}, will send it, and the AI answers him. ` +
  `${marcy.first} sends the renewal; it is read and checked, ${marcy.first} is thanked, the certificate is filed, ` +
  "and the vendor shows covered through October 12, 2027. One press then builds the year's package for HG Oil's insurer.";

/** Who wrote each message, for the avatar. */
export const PEOPLE = {
  dale: { first: dale.first, full: `${dale.first} ${dale.last}` },
  marcy: { first: marcy.first, full: `${marcy.first} ${marcy.last}` },
  agency: AGENCY,
  vendor: V,
  vendorShort: V_SHORT,
} as const;
