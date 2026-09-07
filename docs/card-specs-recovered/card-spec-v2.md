# "What We Deliver" — Card Spec v2, five pillars
**Rebuilt outside-in, 2026-09-05.** Replaces `card-spec.md` (Revision 3) wholesale.
**Spec only. `service-pillars.tsx` was read, never edited.**

---

## What changed, and why this is a rewrite

v1 was built inside-out: it catalogued what this firm has shipped and then described it. 28 of its
36 cards traced to existing code, and the result read as a feature list. The owner's verdict:

> "you are currently restricting to what you remember we have done instead of using the most desired
> and painful things that businesses wish they could automate and then saying we provide the exact
> solution to their problem whether its visibility over their entire business in one place or manual
> data entry"

v2 inverts the order of construction. **Every card starts from a pain in the 73-item inventory and
ends at a deliverable a buyer can picture.** The ledger is no longer the source of the cards; it is
the source of the *proof footnote* on the cards that can carry one.

**The rule that still binds:** "we solve exactly this" ships freely; "we have built this" needs a
ledger row. No invented client story, delivery record, number or case study anywhere.

**Kept from v1** (genuinely strong, and pain-first already): the plain-language discipline, the
zero-jargon vocabulary, the ban on MCP, and four card ideas that survived rewriting — the page
editor, the form-into-the-system card, the attribution-mismatch card, and the propose-don't-send
card. Everything else is new copy against a new pain.

---

## Evidence ceiling — read this before trusting a row

I opened **five documents** (`pain-inventory-ops.md`, `pain-inventory-mktg.md`,
`capability-ledger.md`, `card-spec.md`, and `src/components/home/service-pillars.tsx`) and, unlike
v1, I also **opened nine of the cited implementation files myself** in the nwks, marcommand and
ps-admin repositories. Those nine are marked **"verified by me at source"** where they appear.

Every other `file:line` in this spec is **quoted from the capability ledger**, itself a code-read
artifact by another agent. A row like that means *"the ledger cites this at that line"*, not
*"I read that line."* The distinction is kept visible in each claim check.

**What I verified at source, with what I read:**

| Claim | File:line | What I read |
|---|---|---|
| Assistant returns a clean 503 without the key | `nwks .../functions/_api/routes/ai-ask.ts:213-227` | `if (!c.env.ANTHROPIC_API_KEY) { … 'ai_unavailable' … 503` |
| The assistant route exists in the admin SPA | `nwks .../admin/src/App.tsx:442` | `<Route path="/ask" element={<Ask />} />` |
| Client-editable page editor exists | `nwks .../admin/src/App.tsx:507` | `<Route path="/page-details" element={<PageDetails />} />` |
| Form builder exists | `nwks .../admin/src/App.tsx:506` | `<Route path="/forms" element={<FormsEditor />} />` |
| Four export profiles, not two | `nwks .../admin/src/export/rosterWorkbook.ts:77` | `export type ExportProfile = 'share' \| 'working' \| 'launch' \| 'avery';` |
| Unattended mail redirects to the owner | `nwks .../wrangler.toml:36-52` | the 2026-08-20 incident comment + `UNATTENDED_EMAIL = "owner_only"` |
| Deterministic approval fast path, fail-closed | `ps-admin/agent/reply_ai.py:166-171` | `re.fullmatch(r"(approved?\|send( it)?\|…)")` then `if not shutil.which("claude"): return _hold(...)` |
| Additive-only invoice merge | `ps-admin/agent/invoice_run.py:41-42` | `def merge_description(base, additions):` / `"""Additive-only merge: every character of base survives; additions append."""` |
| The extraction incident is real and recorded | `ps-admin/agent/refdata_ingest.py:1-14` | the $168,600-from-a-2026-document docstring, verbatim |
| No ad platform write exists | `marcommand-main/src/connectors/googleAds/adapter.ts:63` | `export const GOOGLE_ADS_ACTIONS: readonly string[] = []` (and `:391`, an attempted mutation writes a `refused` row) |
| Attribution windows are stamped, not summed | `marcommand-main/src/connectors/meta/adapter.ts:33-41` | "Adding a Meta conversion to a Google conversion produces a number that means nothing" |
| The brief's signals are deterministic SQL | `marcommand-main/src/brief/brief.ts:38,42,62` | `{ name: 'untouchedLeads', … blindSpot: 'leads nobody has answered' }`, `spendWithoutConversions` |
| No composer, so no AI writes to a customer | `marcommand-main/src/responder/compose.ts:15` | "THERE IS NO COMPOSER REGISTERED IN THIS PHASE" |

That is 13 reads across 9 files. It is the honest ceiling on what I can claim first-hand.

---

## Rules applied to every card below

1. **No card carries its pillar's name.** Checked mechanically at the end.
2. **Every card names a deliverable a buyer can picture.** No card is a value or an adjective.
3. **Plain on the first draft.** Test applied to every body: *would a 55-year-old owner of a
   12-person HVAC company say this out loud to their spouse?* (JMIR 2025: of 1,241 documents whose
   stated purpose was plain language, **2.8%** achieved it; low-jargon first drafts were >10× more
   likely to stay that way. Jargon survives editing, so it was never written.)
4. **"MCP" appears on no card** — no title, no body, no card note. Zero credible SMB adoption data and
   every business-audience article about it is still a definitional explainer.
5. **No rejected statistic appears anywhere.** See the rejected-evidence check at the end.
6. **Claim tier:** "we build / we solve" is free. "We have built" needs a SHIPPED or PARTIAL row,
   and PARTIAL is never rounded up.

**Implementer's field shape** (read from `service-pillars.tsx:157-200`): each tile is
`{ title, description, href?, icon }`. Pillar titles keep their trailing period; card titles are
Title Case **without** a period and may use `&`. The existing 36 tiles at `:159-616` are replaced
wholesale — this is not a merge.

---

# PILLAR 1 — Business Software.

**Lead card: #1. Why it leads.** It is the owner's own calibration phrase, it has the widest reach
of any pain in the inventory — every business past five people has it, in every industry, whatever
software they run — and it is the entry point that pulls the rest of the pillar with it: you cannot
build one screen without touching the scattered history, the disconnected systems and the job-level
costing that cards 4, 5 and 7 sell.

**Recommended lead taken as given.**

---

**1. Your Whole Business on One Screen**
*Body:* The five or six numbers that actually decide your week — jobs, invoices, payments, who owes
you — pulled from the systems you already run and updated on their own. It opens on your phone.
*Pain:* **BS-1** — *"I can't tell you how we're doing without opening four different things and doing
math in my head. And by the time I've done it, it's out of date."* Tier A container (Xero *Emotional
Tax Return 2026*, 2026-02-12, n=300: 22 hours a month on financial management; 70% name it a
stressor). No number on the card.
*Proof:* **Carries proof — SHIPPED.** Multi-screen admin SPA over a live database
(`admin/src/App.tsx:383-517`, 25+ routes behind `<AuthGuard />`) — **verified by me at source** at
`:442/:506/:507`; ps-admin books dashboard (`worker/src/dashboard.js`, ledger row).
*Claim check:* Body says "we solve exactly this" in the present tense. **"We have built dashboards
over live business data" is separately warranted** and may be used in adjacent prose. No client, no
number, no "trusted by".

**2. The Business Runs the Week You're Not There**
*Body:* Approvals, pricing rules, who's on what job — the decisions that currently live in your head
get written into the system, so the work keeps moving on the week you're gone.
*Pain:* **BS-13** — *"I haven't taken a real week off in four years."* Tier A and the most
emotionally loaded pain in the pillar (Xero 2026-02-12: 8 hours a week consumed by worry, 61% sleep
less, 40% have considered giving up the business entirely). None of that goes on the card.
*Proof:* **Forward claim.** Adjacent shipped mechanics exist — email-driven approvals
(`agent/approval_watcher.py`, `agent/reply_ai.py:166-171`, verified by me) and scheduled work that
survives a sibling failure (`src/worker.ts:94-98`) — but there is no delivery record for
"the business ran without the owner", so none is implied.
*Claim check:* "we solve exactly this" only.

**3. When Someone Leaves, Their Access Leaves With Them**
*Body:* Everyone gets their own login and only the screens their job needs. The day they go you take
it back in one click — and you can show exactly what they could see while they were here.
*Pain:* **BS-6** — *"I honestly don't know what our last three employees still have access to."*
The strongest hard-numbered finding in the pillar and one almost nobody sells against (Proton
2026-01-22, Tier B: 61% have opened spreadsheets from a previous job; only 33–44% believe access is
cleaned up at offboarding). No number on the card.
*Proof:* **Carries proof — SHIPPED.** Two-factor auth with a fail-secure off switch
(`wrangler.toml:28-31` — only the exact string `"false"` disables it); role allowlist
(`functions/_api/auth.ts reviewerMayReach`); `TeamPage.tsx`, `SecurityPage.tsx`. I verified the
fail-safe pattern at source in the sibling `UNATTENDED_EMAIL` block of the same file, which names
`AUTH_2FA_ENABLED` as the model it copies.
*Claim check:* **"we have built"** warranted.

**4. The Spreadsheet Everyone's Afraid to Touch**
*Body:* The workbook half the company runs on becomes a system with real logins, real history and
rules you can see — so more than one person can safely operate it and nobody has to work out which
copy is the real one.
*Pain:* **BS-2** — *"There's a spreadsheet that runs half this company and I'm honestly scared to
touch it."* Tier B for the evidence, Tier D for the pain.
*Proof:* **Carries proof — SHIPPED (one-time).** Seven import scripts that ran end to end off a
shared Google Drive workflow (`scripts/import_drive_documents.py`, `import_drive_export.py`,
`import_womens_drive.py`, `import_org_history.py`, `import_baptisms.py`,
`import_mbox_testimonies.py`, `build_slate_from_workbooks.py`).
*Claim check:* **"we have built"** warranted — a real spreadsheet-to-database migration shipped.
Not "for a client in Hays": there is no such record and none is implied. Positioned at 4, not 1,
because "replace your spreadsheets" is the most crowded claim in the SMB software market.

**5. Whoever Answers the Phone Has the Whole History**
*Body:* One record per customer carrying every quote, job, invoice, note and photo — so the person
picking up can answer "what did you do for us last spring" without digging through email, the shared
drive and the old system.
*Pain:* **BS-5.** Tier D, stated on recognition. The "61% lack reliable data / 60% lack accessible
data" pair could not be traced to a primary and is not printed.
*Proof:* **Carries proof — SHIPPED.** Lead Desk, a lightweight CRM with sealed PII, an access log
and a retention sweep (`src/leaddesk/`, 31 files, 8,154 LOC; routed first at `src/worker.ts:50`).
*Claim check:* **"we have built"** warranted for the one-record-with-history half.

**6. It Stops Living in One Person's Head**
*Body:* The quote logic, the pricing rules, the checklist, the approval path — built into the
software as steps the system requires, so the process survives the person and a new hire can run it
in their first week.
*Pain:* **BS-3** (*"When Dave retires, nobody here knows how he does the quotes"*), with **BS-14**
(six-month onboarding) folded in. Both Tier D.
*Proof:* **Forward claim.**
*Claim check:* Do not attach the circulating key-person figures — *"one bad exit burns 2–3% of
revenue," "buyers knock 10–20% off"* are consultancy rules of thumb with no study behind them.

**7. Know Which Jobs Made Money Before You Quote the Next One**
*Body:* Cost and revenue tracked per job, customer and service line, so the report showing your
worst-margin work builds itself instead of being reconstructed from four exports.
*Pain:* **BS-4** — *"We're busy. I just can't tell you if we're busy making money or busy losing
it."* Tier B (OnDeck/Ocrolus Q4 2025, n=468: cash flow 29%; SoFi 2026: 42% name margin improvement
as the year's top priority). No number on the card.
*Proof:* **Forward claim.** The ps-admin books/ledger rows are bookkeeping
(`agent/ledger.py`, `agent/reconcile.py`), not job costing, and the two must not be blurred.

**Held back from Pillar 1, with reasons rather than silence:** BS-7 (growth breakage — too abstract
to picture), BS-8 (paying for unused software — the only numbers are small-*enterprise* SaaS data,
untransferable), BS-9 (whiteboard scheduling — strong, and the first card to add if the pillar goes
to eight), BS-10 (approvals in an inbox — folded into #2's body), BS-11 (inventory — the ledger cut
inventory for having no adjacency argument), BS-12 (proving what was said), BS-15 (quoting
consistency — folded into #6's body).

---

# PILLAR 2 — Business Automation.

**Lead card: #1. Why it leads.** It is the only pain in this pillar with Tier-A evidence at scale
(Intuit QuickBooks *2026 Small Business Late Payments Report*, drawing on ~5,000 owners surveyed per
quarter), it is **measurably getting worse** — 59% carrying invoices 30+ days overdue, up from 47%
in a single year — it attaches to money rather than time, and owners hate the task personally in a
way they do not hate data entry. Plenty of firms sell invoicing software; almost nobody credibly
sells *"we build the chasing so you never do it."*

**Recommended lead taken as given.** Note for the owner: he seeded manual data entry as the headline
win, and it sits at #2 in his own words. Leading with the evidenced card and following with the
owner-language card is deliberate — the lead card is the one most likely to be scrutinised, and #2
has no defensible number by design. This is a one-line swap if he wants it reversed.

---

**1. Get Paid Without Ever Chasing an Invoice Yourself**
*Body:* The invoice goes out the day the work is finished, the reminders escalate on their own,
every message carries a payment link, and one live list shows who owes what and for how long. You
stop being the collections department.
*Pain:* **BA-2** (*"I've done the work, I've sent the invoice, and now I have to be the guy who calls
and asks for the money"*), with **BA-3** (*"I don't think that job's been billed"*) folded into the
first clause. Tier A — the best-evidenced pain in either inventory.
*Proof:* **Carries proof — SHIPPED, in part.** Monthly invoice run on a schedule
(`agent/run_monthly.sh:1-4, 25-26`); print-exact rendering (`renderer/render.py` +
`renderer/template.html`); bank-deposit ↔ invoice reconciliation (`agent/reconcile.py`) with every
verdict re-checked deterministically (`agent/adjudicate.py:44-52`); approval by email reply
(`agent/reply_ai.py:166-171`, **verified by me at source**); card payment (`agent/stripe_pay.py`).
*Claim check:* **"we have built"** is warranted for issuing, rendering, approving and reconciling
invoices. **The escalating-reminder half has no ledger row** — it ships as "we solve exactly this,"
which the rule now permits, but no past-tense phrasing may go near it. This was v1's single most
important caveat and it survives unchanged.

**2. Your Systems Talk to Each Other Instead of Somebody Retyping**
*Body:* Entered once and it shows up everywhere it's needed — the won deal becomes the scheduled
job, the supplier invoice's numbers land against the order, and the customer never gets asked for
their address a third time. Anything that doesn't match gets flagged instead of going in silently
wrong.
*Pain:* **BA-1** (the owner's own second example), **consolidating BA-8** (asked four times),
**BA-11** (reading numbers off documents by hand) and **BA-15** (the sales-to-operations handoff).
All Tier D and deliberately unnumbered.
*Proof:* **Carries proof — SHIPPED.** Fourteen platforms swept into one fact table on a schedule
(`src/worker.ts:74`, crons `["17 4 * * *", "23 */6 * * *"]`); inbound email turned into a structured
record with dependency-free Word extraction (`email-worker/docx.ts`, 432 lines, wired at
`email-worker/worker.ts:7-15`); deterministic two-list matching (`agent/reconcile.py`).
*Claim check:* **"we have built"** warranted for scheduled system-to-system pipelines.
**No statistic may ever attach to this card.** The entire numeric literature for manual data entry
collapses to one self-promotional blog cluster — *"McKinsey 2024 SMB Automation Survey"* and
*"Salesforce's SMB research division"* are attributions to organisations and studies that do not
exist. Recognition sells this card; every owner who has this pain knows exactly who on their team
does it. **The word "website" does not appear here** — the first capture belongs to Pillar 4.

**3. The Last Week of Every Month Stops Disappearing**
*Body:* Bank activity, payments and invoices matched overnight, with only the handful that genuinely
don't line up put in front of a person — and every automatic match re-checked on the exact amount
before it's accepted.
*Pain:* **BA-4** — *"The last week of every month disappears into matching things up."* Tier A for
the container (Xero: 22 hours a month), Tier D for the reconciliation slice.
*Proof:* **Carries proof — SHIPPED.** `agent/reconcile.py` does the deterministic matching;
`agent/adjudicate.py:44-52` re-checks exact amount, open-and-unused invoice, and a confidence floor
before anything is accepted.
*Claim check:* **"we have built"** warranted.

**4. Nothing That Comes In at 9pm Waits Until Morning**
*Body:* Every after-hours enquiry gets an acknowledgement straight away and is sorted by urgency —
a real emergency reaches a person, everything else is queued with its context for the morning, with
follow-up that keeps going until someone replies.
*Pain:* **BA-16** (*"everything that comes in after five sits there until someone opens the
laptop"*), with **BA-5** (leads going cold) folded in. Tier D.
*Proof:* **Forward claim, and it must stay one.** The ledger's only outbound-reply row is
**NOT BUILT**: `src/responder/` is 21 files and 4,635 LOC that the worker cannot reach, and
`src/responder/compose.ts:15` states "THERE IS NO COMPOSER REGISTERED IN THIS PHASE"
(**verified by me at source**). `src/responder/egressGate.ts` is a build-failing scanner that proves
there is no outbound send path at all.
*Claim check:* present tense only, no past tense anywhere near it. **No speed-to-lead statistic** —
that literature is Harvard Business Review, **March 2011**, plus a **2007 MIT study**, recycled
undated across 2026 blogs, and citing it as current is a credibility risk on a site whose whole
proposition is AI-era competence. *"62% of calls go unanswered"* stays rejected.

**5. Proposals and Contracts That Build Themselves From the Job**
*Body:* The document is generated from the real record with the right pricing and terms already in
it, sent for signature and filed against the job — so nothing goes out as last week's proposal with
the names changed.
*Pain:* **BA-12** — *"eventually one goes out with the wrong name on it."* Tier D.
*Proof:* **Carries proof — SHIPPED, in part.** Print-exact document rendering to a fixed page
(`renderer/render.py` + `renderer/template.html`, letter canvas through headless Chrome) already
producing the monthly invoices.
*Claim check:* **"we have built"** for the rendering half only. Generation-from-record and the
signature step are forward claims — and the ledger explicitly **cut e-signature** for having no
adjacency argument in any of the three repositories, so the implementer must not imply an existing
e-signature integration.

**6. Nothing Expires Without You Knowing Weeks Ahead**
*Body:* Every certificate, licence, insurance renewal and contract date tracked in one place, with
the warning early enough to act on and the renewal assigned to a named person — instead of finding
out at a customer's gate.
*Pain:* **BA-9** — *"We found out the certificate expired because the customer's site turned us away
at the gate."* Tier D for the pain; US Chamber C_TEC (2025-08-18, Tier A) for the compliance anxiety
around it — 65% worry a patchwork of state tech policy raises legal and compliance costs. No number
on the card.
*Proof:* **Forward claim.** Adjacent: scheduled work that reports partial failure rather than
swallowing it (`src/worker.ts:94-98`).

**7. Nothing Goes Out to a Customer at 3am That You Haven't Seen**
*Body:* Every automated message is held at a gate you open deliberately. Until you do, it comes to
you instead — with the real recipient named in the subject, so you see exactly what the system was
about to do. Visible, never quietly dropped.
*Pain:* **No inventory ID. Stated plainly rather than dropped.** No researcher listed this as a
buyer pain, and I am not going to pretend one did. It earns its place for two reasons: it answers
the objection that blocks this entire pillar — *what happens when the automation goes wrong* — and it
is the strongest proof row in the pillar, written after a real failure rather than designed in a
meeting.
*Proof:* **Carries proof — SHIPPED.** `wrangler.toml:38-52`, written after a scheduled job on
2026-08-20 mailed thirteen admins nobody had asked it to. Only the exact string `"live"` opens the
gate, so the dangerous direction takes a deliberate edit. **Verified by me at source** — I read the
block including the owner's own quoted words about the incident.
*Claim check:* **"we have built"** warranted. **Do not name the organisation the incident happened
to**, and do not reproduce the owner's quote from that file on a public page.

**Held back from Pillar 2:** BA-6 (the monthly report writes itself — duplicates Pillar 1 #1),
BA-7 (self-service booking and reminders — genuinely felt, but commoditised by Calendly-class tools;
the first card to add if this pillar goes to eight), BA-10 (timesheets), BA-13 (reordering — the
ledger cut inventory for lack of adjacency), BA-14 (review requests — scoped out to avoid colliding
with Pillar 5's ground).

---

# PILLAR 3 — AI Integration.

**Lead card: #1. Why it leads.** Accuracy is the **#1 barrier among active AI users at 36%**, ahead
of data security at 34% (Simply Business *2026 Outlook*, n=1,047 US small business owners, fielded
Q4 2025 – Q1 2026). Every competitor in this category leads with capability — *what the AI can do*.
Leading with **control** answers the objection buyers actually have, inverts the category's default
message, and happens to be the half of this pillar with the most shipped code behind it. For an
anxious market the differentiated promise is not "our AI is more powerful", it is "our AI is
supervised, and here is exactly where you sit in the loop."

**Recommended lead taken as given.** This pillar carries **eight** cards rather than seven, because
the owner's stated priority is AI and because the inventory's two highest-value items — the control
card and the shadow-AI card — sell to opposite halves of the same anxious buyer.

---

**1. It Shows Its Work, and Never Makes the Big Call Without You**
*Body:* The model proposes and a person presses send. Where the stakes are real there's an approval
step and a hard limit on what it may do alone, and every answer arrives with the numbers and the
sources it used.
*Pain:* **AI-9** — *"It sounds sure of itself. That's what worries me."* Tier A.
*Proof:* **Carries proof — SHIPPED architecture, PARTIAL feature.** Propose-only is enforced
structurally, three separate times: `functions/_api/ai/agent.ts:4-8` ("PROPOSE tools only insert
`ai_pending_actions` — they NEVER send email"); `src/executor/kernel.ts:22-25` ("SHADOW IS THE
DEFAULT AND IT IS NOT A NO-OP… validated in full, recorded in full, and simply not executed"); and
every model verdict re-checked deterministically at `agent/adjudicate.py:44-52`.
**Verified by me at source:** every ad adapter's action list is literally empty —
`src/connectors/googleAds/adapter.ts:63` is `export const GOOGLE_ADS_ACTIONS: readonly string[] = []`
and an attempted mutation writes a `refused` row (`:391`).
*Claim check:* **"we have built"** warranted for the propose-don't-send architecture. The agent-loop
row itself is **PARTIAL** and is not rounded up to shipped.

**2. Your Team Is Already Using AI. We Make That Safe.**
*Body:* Find out which tools your people are actually pasting into, give them approved ones that are
safe for company data, write the one page of rules everyone will actually read, and keep the
sensitive material out of the public models.
*Pain:* **AI-10** — *"I'm sure half my team is using ChatGPT. I don't know what they're putting in
it."* **The most under-served pain in the entire 73-item inventory:** advice is everywhere, delivery
is nowhere, and it converts an AI objection into an AI sale.
*Proof:* **Forward claim.** No ledger row — nothing in the three repositories does AI-tool discovery
or policy work, and no adjacency argument is offered.
*Claim check:* "we solve exactly this" only. **Mandatory caveat, binding on anyone who later adds a
figure to supporting copy:** the *63% have no AI governance policy* and *97% of AI-related breaches
lacked AI access controls* figures come from IBM/Ponemon *Cost of a Data Breach 2025*
(**2025-07-30, n=600 organisations, all company sizes — not SMB-specific**). They must be labelled
as all-company-size wherever they appear, or the claim is a misattribution. **The card as written
carries no number, which is the safer option and the recommended one.**

**3. Ask a Question About Your Own Business, Get the Real Number**
*Body:* Ask in plain English — how did last month go, who hasn't paid, which crew is behind — and
get the answer off your live data with the figures behind it, so you can check it instead of
trusting it.
*Pain:* **AI-1** — *"I want to just ask 'how did we do last month' and get an answer."* The AI
expression of the owner's own calibration example. Tier A for the adjacent 31% already using AI for
financial management and bookkeeping (Simply Business, n=1,047); the framing itself is inference and
is marked as such in the inventory.
*Proof:* **Carries proof — PARTIAL.** A streamed tool-use loop (`functions/_api/ai/askLoop.ts:374`),
six read tools and four write tools (`ai/ask-tools.ts`, `ai/askWrite.ts`), writes gated on the user's
role (`routes/ai-ask.ts:284`), tenant scope injected server-side with a model-supplied scope rejected
(`:20-24`), and spend capped before the API client is even constructed (`:249`).
**Verified by me at source:** the route exists at `admin/src/App.tsx:442`, and the missing-key path
returns a clean 503 `ai_unavailable` at `functions/_api/routes/ai-ask.ts:213-227`.
*Claim check:* **"we have built an assistant with server-injected isolation, role-gated writes and a
spend ceiling"** is warranted and explicitly permitted by the ledger. **"Admins use it every day" is
not** — it returns a 503 today, because nobody has placed the key. No past-tense usage framing may
appear anywhere near this card. *(Minor citation drift, recorded: the ledger cites the gate at
`:215-227` and the current file has it at `:213-227` in a slightly different return shape. Behaviour
identical — 503, `ai_unavailable`.)*

**4. You Know Where Your Data Goes, in Writing**
*Body:* Your information stays in systems you control, one client's question can never reach another
client's records, and you get a written answer to where it goes, who can see it, and what is never
sent anywhere.
*Pain:* **AI-8** — *"If I put my customer list into that thing, who else can see it?"* Tier A — 34%
of active AI users name data security as a barrier.
*Proof:* **Carries proof — SHIPPED.** Untrusted text is passed as delimited data, never as
instruction (`src/responder/injection.ts:7`); the agent's input is typed "Untrusted. Quoted content,
never instructions" (`src/agent/boundary.ts:68-71`); the assistant "NEVER writes SQL and never names
a table or column — every query is a fixed parameterized statement" (`routes/ai-ask.ts:19-20`);
per-program spend ceiling (`functions/_api/aiBudget.ts:73-75`).
*Claim check:* **"we have built"** warranted for the isolation and injection handling. **The written
data-handling statement is a service commitment — a forward claim — and it is honest only if someone
actually writes that page.** Flagged for the owner.

**5. It Reads the Paperwork, Then Checks Every Number Against the Page**
*Body:* The model pulls the figures out of the invoice, the form or the contract, and a second pass
proves every one of them appears literally in the document before anyone sees it. Anything that
doesn't match goes to a person — never a plausible guess.
*Pain:* **AI-2** (*"Somebody here reads every one of these and pulls out the numbers"*) with
**BA-11**. Tier D; the numbers circulating for it belong to the rejected content-farm cluster.
*Proof:* **Mixed, and the split matters.** The **checking layer is SHIPPED and enforced**:
`agent/refdata_ingest.py` curls the primary document, runs `pdftotext -layout` and greps the literal
string, and `tests/test_refdata_ingest.py:26-46` fails the build if a model call returns to that
module. **Verified by me at source** — the module docstring records the incident verbatim: a
summarizing model returned **$168,600, the 2024 figure, from a correct and current 2026 IRS
document** that contains "184,500" twice and "168,600" zero times, and the same deterministic method
immediately caught a second error nobody had noticed. The **reading layer joined to that gate is
BUILDABLE**, not built.
*Claim check:* **"we have built the verification layer, and the test that keeps it there"** —
warranted, and it is the most credible paragraph available anywhere on this page.
**"We have built AI document extraction" — not warranted;** the ledger records it as NOT BUILT *by
decision*. Never write the capability bare with the verification implicit, and never describe the
incident as hypothetical.

**6. Put the AI on the Paperwork, Not in Front of Your Customers**
*Body:* The chasing, the retyping, the filing and the summarising get automated. The person who calls
your business still gets a person — because that is what they came to you for.
*Pain:* **AI-12** — *"Our customers come to us because we're not a big faceless company. I'm not
putting a bot in front of them."* Tier A — 86% rate the ability to speak with a human as important,
66% call it "very important". This is where most AI marketing in this segment actively backfires.
*Proof:* **Forward claim**, with an architectural note that happens to be true: this firm's code has
no path to a customer-facing send at all — `src/responder/compose.ts:15` ("THERE IS NO COMPOSER
REGISTERED IN THIS PHASE", **verified by me**) plus a build-failing egress gate.
*Claim check:* positioning, present tense, no delivery claim.

**7. Nobody Here Has to Learn to Run It**
*Body:* We build it, we run it, and we're the ones who fix it when it breaks. No new hire, no
internal owner, and no half-configured tool going stale the month after the person who set it up
leaves.
*Pain:* **AI-13** — *"Say we buy it. Who maintains it? There's no IT person here."* Tier A — the
learning curve blocks 31% of active users.
*Proof:* **Forward claim** — a service commitment, no ledger row and none needed.

**8. Start With One Job, Measure What It Saves, Then Decide**
*Body:* Pick one process, measure what it costs you now, automate that one, and measure again. You
decide about the second one with your own numbers instead of somebody's ROI slide.
*Pain:* **AI-15** (*"Everyone's quoting me a monthly fee. Nobody's told me what I get back"*) with
**AI-11** (*"Nobody's told me what for"*) folded in. Tier C — the 34%/77%/62%/60% figures reached
only through an aggregator, primary not located.
*Proof:* **Forward claim.**
*Claim check:* this card is the antidote to the category's inflated-ROI noise, so it must carry no
ROI figure of its own. *"340% ROI"* and *"2.3-month payback"* stay rejected — and a buyer who has
been told "340% ROI" by three vendors discounts the fourth automatically.

**Held back from Pillar 3:** AI-3 (front-desk deflection — conflicts head-on with #6's positioning,
and the ledger has no send path), AI-4 (drafting — 51% and 44% already do it themselves for free;
leading there says "we sell you what you already have"), AI-5 (continuous anomaly watching — good
card, low recognition), AI-6 (search everything the company knows), AI-7 (meeting summaries —
commoditised by Microsoft, Google and Zoom), AI-14 (state AI regulation — background anxiety, not a
purchase blocker), and **the AI cost-visibility card** ("you see what it costs, per question" —
strong SHIPPED proof at `aiBudget.ts:73-75` and `src/inference/engine.ts:183-198`, held back only
because it answers a question buyers ask *after* they have bought. **This is the swap to make if the
owner wants a proof-heavier pillar.**)

---

# PILLAR 4 — Websites.

**Lead card: #1. Why it leads.** Not because it is the best-evidenced — it has no primary study at
all — but because it wins the criterion that matters most here: **almost no competitor can credibly
claim it, because most of them profit from the opposite.** It is instantly recognisable, it is in
the owner's own language, and it is verifiable at handover rather than in twelve months. It is also
the only card in this pillar with a shipped client-facing editor behind it.

**Recommended lead taken as given.**

---

**1. Change Your Own Hours, Prices and Photos in a Minute**
*Body:* The things that actually change — hours, prices, staff, service areas, photos — you edit
yourself from a screen and it's live. No email to a guy, no three-day wait, no invoice for fixing a
phone number.
*Pain:* **W1** — *"I just want to fix a phone number and I have to email a guy and wait three days
and get a bill."* `[NO NUMBER]`, and that is stated honestly.
*Proof:* **Carries proof — SHIPPED.** In-browser page editor with a seeded document model and a
build-time check (`admin/src/pages/PageDetails.tsx`, `scripts/gen-page-document-seed.mjs`,
`scripts/check-page-document.mjs`). **Verified by me at source:**
`<Route path="/page-details" element={<PageDetails />} />` at `admin/src/App.tsx:507`.
*Claim check:* **"we have built"** warranted. **Do not print the "$50–$200 per change" figure** — it
is a vendor blog's own price list, not research.

**2. You Own the Domain, the Site and the Accounts**
*Body:* Registrar, DNS, hosting and the code are in your name from the first day, and the
credentials are handed to you in writing. If you ever want to leave, you can. That's on purpose.
*Pain:* **W7** — *"He owns the domain. I can't leave."* Distinct from W1: W1 is inconvenience, this
is captivity. Independent studios describe refusal of admin access as *the* diagnostic red flag.
*Proof:* **Forward claim — and a business commitment, not a capability.**
*Claim check:* **OWNER CONFIRMATION REQUIRED BEFORE THIS SHIPS.** It costs nothing to promise if it
is operationally true, and it is the single most damaging card on the page if it is not. Nobody but
the owner can rule on it.

**3. What Happens on Your Site Shows Up Where You Actually Work**
*Body:* A form or a booking on your site lands in the CRM, calendar or inbox the business already
runs on — assigned to a person, with a state you can mark handled, not on an island and not in a
shared inbox nobody opens.
*Pain:* **W5** (*"The website and the system I actually run the company on have never spoken"*),
with **W4** (*"It went to an inbox nobody checks"*) folded in. Both `[NO NUMBER]`, both resting on
recognition — **and neither may carry a statistic**, because two un-evidenced cards sitting adjacent
across pillars would imply a research base that does not exist.
*Proof:* **Carries proof — SHIPPED.** Form builder writing straight into the same database the admin
reads (`admin/src/pages/FormsEditor.tsx`, field catalogue at `scripts/gen-form-fields-seed.mjs`);
Lead Desk supplies the owner and the state. **Verified by me at source:**
`<Route path="/forms" element={<FormsEditor />} />` at `admin/src/App.tsx:506`.
*Claim check:* **"we have built"** warranted. **This card is the W5 boundary resolution — see the
ruling below.** It owns the first hop only, and the word *website* appears in this pillar alone.

**4. See Exactly Where People Give Up, and Fix That Step**
*Body:* Your own analytics on the three pages that matter, read back to you as a plain story of where
people quit — then one change to that spot, and the number after it.
*Pain:* **W3** — *"Analytics says four hundred visitors. So where are they?"* Tier A: Contentsquare
2026 Digital Experience Benchmark (99 billion+ sessions across 6,500 websites, published
2026-04-01) finds 35.2% of sessions hit friction. No number on the card.
*Proof:* **Carries proof — SHIPPED.** First-party analytics end to end: own snippet under a policed
size budget (`src/snippet/`, `scripts/check-snippet-budget.mjs`), queue and rate limiter
(`src/collector/`), Durable-Object sessionizer (`src/sessionizer/`).
*Claim check:* **"we have built"** warranted. **Do not sell page speed here.** The same Tier-A source
shows load-time friction fell 20% year over year and now affects only 10.9% of sessions — friction is
mostly not speed any more, which is a differentiator because the whole industry is still selling
speed. *"Mobile users abandon after 3 seconds"* stays rejected.

**5. A Site That Produces Something You Can Count**
*Body:* Pick the one outcome that matters — calls, booked jobs, quote requests — wire the site to it,
and get that number every month next to last month's. A good-looking brochure is not the goal.
*Pain:* **W2** (*"a nice-looking brochure that has never once made my phone ring"* — ~21% of small
businesses name too little traffic as their main website challenge, Tier B compilation), with
**W10** (the procurement version, felt at renewal) folded in.
*Proof:* **Carries proof — SHIPPED.** Ranked daily brief over real signals (`src/brief/brief.ts`,
**verified by me**: `untouchedLeads` at `:38` and `spendWithoutConversions` at `:42` are registered
signals); Lead Desk response-time report; first-party analytics above.
*Claim check:* **"we have built"** warranted for the measurement. **No conversion-rate promise** —
the "50–200% lift" and "1–2% vs 5–8%" benchmark family stays rejected.

**6. We'll Tell You If Your Site Is Fine. Sometimes It Is.**
*Body:* An honest written look at what is actually wrong, that is allowed to end with "keep it and
change these three things" — instead of every quote turning out to be a rebuild.
*Pain:* **W11** — *"Nobody will tell me what's actually wrong with it."* `[NO NUMBER]`, and the
inventory marks it as inference from the vendor-distrust evidence. **I am not upgrading that.**
*Proof:* **Forward claim** — a service commitment.

**7. Hand Your Phone to a Customer Without Wincing**
*Body:* Checked on the phone sizes your customers actually hold, with tap targets you can hit and
type you can read — and the screenshots to show you it was checked.
*Pain:* **W6** — *"I showed it to a customer on my phone and had to apologise."*
*Proof:* **Forward claim.** No ledger row exists for mobile QA. This repository does run a
four-engine, fourteen-viewport sweep as a working practice, but a practice is not a delivery record,
and the card claims only the practice.
*Claim check:* sell the embarrassment, not the load time — see the Contentsquare correction on #4.

**Held back from Pillar 4:** W4 (folded into #3), W8 (stale content — downstream of W1, often the
same root cause), **W9 (downtime alerting — held deliberately: the ledger proves failures are
*recorded*, not that anyone is *paged*, so shipping "you hear it from us" would be a promise about
an operational commitment nobody has made)**, W10 (folded into #5), W12 (form spam — sibling of W4),
W13 (accessibility litigation — the inventory left it an explicit stub and says it needs its own
research pass before it can become a card; I am not guessing at it).

---

# PILLAR 5 — SEO AI Visibility Ad Management.

**Lead card: #1. Why it leads.** Google publicly tells buyers to scrutinise this exact category, in
writing, dated **2026-07-10**. Quoting the platform against its own vendor ecosystem is a
credibility move competitors structurally cannot copy — they would have to indict themselves. It
also converts the buyer's loudest emotion in this category, distrust, into the reason to hire us.

**Recommended lead taken as given.**

---

**1. Google Says Be Careful Who You Hire for This. We'll Show You the Page.**
*Body:* Google's own guidance warns you about anyone promising rankings or claiming inside access to
its systems. We'll put that page in front of you and explain, in plain English, what we're doing and
why — with no proprietary scores.
*Pain:* **S1** — *"Three agencies told me three different things and they all want a retainer."*
Tier A, and the strongest card in this pillar.
*Proof:* **Forward claim** — a practice commitment. No ledger row is needed and none is claimed.
*Claim check and the exact words:* if the page quotes Google, it uses **only** the sentences a
researcher confirmed verbatim:
> "Be wary of third-party tools that promise ranking success or claim to use 'internal' Google
> metrics. No third-party tool has access to our internal ranking or AI systems."

and

> you "don't need to create new machine readable files, AI text files, markup, or Markdown to appear
> in Google Search."

— Google Search Central, *Optimizing your website for generative AI features on Google Search*,
published 2026-05-15, **last updated 2026-07-10 UTC**.
**Do not use** the `llms.txt` sentence ("will neither harm nor help your site's visibility or
rankings"). It could not be confirmed verbatim, two agents disagree about it, and this card's entire
value is being the one vendor in the category who quotes accurately.
**No card in this pillar sells "AEO" or "GEO" as a product** — Google's guidance frames them as
still SEO and warns buyers about services sold as separate, so the jargon would put this firm on the
wrong side of the quote it is leading with.

**2. We Ask ChatGPT About Your Business and Show You What It Says**
*Body:* We put the questions your customers would actually ask to the major assistants, screenshot
what comes back, and hand you the answers with everything wrong about you marked.
*Pain:* **S3** — *"My nephew asked ChatGPT for a plumber and it named three people, none of them
me."* Tier B: Global Payments, 1,000 US small business owners, 2026-05-06 — 78% already know AI
platforms can recommend their business, only 53% are doing anything about it. **That gap is the
entire market.** No number on the card.
*Proof:* **Forward claim, and it must stay one.** The ledger is unambiguous: AI-search visibility
measurement is **NOT BUILT** — no adapter, table or query anywhere, searched across all 14 connector
folders, all 15 migrations and `src/brief/signals.ts`. The BUILDABLE row's own instruction is: say
"we build this", never "we measure this today".
*Claim check:* present tense only. **Do not print** the Global Payments negatives (~40% finding
incorrect information, ~48% brand-personality loss) — the primary returned HTTP 403 on five attempts
and they remain unconfirmed.

**3. When AI Gets Your Address, Hours or Services Wrong, We Fix the Source**
*Body:* We correct what the assistants are reading — your Google profile, the directories, and the
plain statements of fact on your own pages — then re-check and show you what changed.
*Pain:* **S4** — *"It gave out our old address."* **The most under-served pain in the marketing
inventory:** maximum felt pain, because it is not lost opportunity but active misinformation about
your own business, and essentially nobody offers to *fix the source* rather than sell a monitoring
dashboard. **S13** (the neglected Google profile) is folded in.
*Proof:* **Forward claim** for the correcting. Adjacent SHIPPED: Google Business Profile and Yelp
ingestion (`src/connectors/googleBusinessProfile/adapter.ts`, 600 lines;
`src/connectors/yelp/adapter.ts`, 745 lines) — **reading** those profiles is built, writing to them
is not, and the card must not blur the two.
*Claim check:* **do not use** *"93% of businesses have at least one fact wrong in AI answers"* —
personal research blog, no recoverable methodology, exactly the shape this project already rejected.
The demonstration is the proof and it takes about ten minutes per client.

**4. First We Make Your Ads Countable. Then We Stop Paying for Clicks That Never Call.**
*Body:* Conversion tracking before anything else, then the search terms actually buying you clicks,
reported as cost per real enquiry — with the platforms whose numbers aren't comparable saying so on
their face.
*Pain:* **S5** — *"I'm paying for people looking for a job and people who want it free."*
*Proof:* **Carries proof — SHIPPED.** Eight paid platforms swept on a schedule into one table with
`native_attribution_window` stamped on every row. **Verified by me at source:**
`src/connectors/meta/adapter.ts:33-41` records that Meta's default 7-day-click-plus-1-day-view and
Google's click-date attribution mean "adding a Meta conversion to a Google conversion produces a
number that means nothing", and `src/brief/brief.ts:42` registers a `spendWithoutConversions` signal.
*Claim check:* **"we have built"** warranted for reading and reconciling spend.
**Not warranted: any automated bid or budget change.** Verified at source —
`src/connectors/googleAds/adapter.ts:63` is `export const GOOGLE_ADS_ACTIONS: readonly string[] = []`
and an attempted mutation writes a `refused` row. Do not print *"30–50% of local ad budget is
wasted"*; agency blogs, no primary. The defensible framing is untracked spend: a WordStream analysis
of ~500 small-business Google Ads accounts found fewer than half had conversion tracking installed —
**and even that is unverified at primary, so it stays off the card.**

**5. Your Traffic Dropped and It Probably Wasn't Your Fault**
*Body:* We separate what you actually lost from what the whole category lost, name the part that is
recoverable, and stop scoring you on sessions alone.
*Pain:* **S2** — *"Same rankings, half the visitors."*
*Proof:* **Carries proof — SHIPPED.** Google Search Console and Bing Webmaster ingested into one
fact table (`src/connectors/googleSearchConsole/adapter.ts`, 631 lines;
`src/connectors/bingWebmaster/adapter.ts`, 522 lines).
*Claim check:* the supporting numbers (Axios/Chartbeat 2026-03-17: search referrals down **60% for
small publishers** vs **22% for large**, with AI chatbots still under 1% of referrals) are
**publisher data, not local-services data.** Usable in a conversation with that caveat attached;
**not on the card**, which carries no number. Do not silently generalise it to a plumber.

**6. Being Found Isn't Being Quoted**
*Body:* Getting your page fetched is not the same as getting your business named in the answer. We
write the pages so they can be quoted — direct answers, real numbers, comparisons, the actual steps.
*Pain:* **S7** — *"It found my page and still didn't mention me."* The sleeper: Tier A, four months
old, and nobody in this market is talking about it.
*Proof:* **Forward claim.**
*Claim check:* the supporting research (arXiv 2604.25707, 2026-04-28, 21,143 search-layer citations
analysed, separating citation *selection* from citation *absorption*) is **a preprint**. If it is
ever cited in longer copy, it is described as the best available evidence rather than settled
science — which is itself on-brand for card 1. Nothing on the card cites it.

**7. We Report Booked Work, Not Rankings — and What We Couldn't See**
*Body:* The monthly report starts with enquiries and booked jobs, names who did the work and what
they did, and says out loud where the numbers were missing instead of quietly leaving a gap.
*Pain:* **S10** (*"My rankings went up and my revenue didn't"*) with **S11** (*"I don't even know if
anyone's doing the work I'm paying for"*) folded in. Both marked as inference in the inventory, and
not upgraded here.
*Proof:* **Carries proof — SHIPPED.** The ranked brief runs six deterministic signals and a signal
that throws is recorded as a **named blind spot** rather than taking the page down.
**Verified by me at source:** `src/brief/brief.ts:38,42` register `untouchedLeads` and
`spendWithoutConversions` with a `blindSpot` string each, and the comment at `:62` gives the reason —
a blind spot "tells somebody what they are not being told."
*Claim check:* **"we have built"** warranted for the brief and the blind-spot reporting.
**Not warranted: any claim that a model is involved** — the brief is deterministic SQL, no model
participates. Do not print the QuickSEO *$497.16/month* or *75% more likely to be dissatisfied*
figures (compilation, primary not recovered).

**Held back from Pillar 5:** S6 (sibling of S1, aimed at confusion rather than deceit — its
substance is inside #1), S8 (the 87.8% worry figure — sample skews medium and enterprise, nearly
half e-commerce, so it is not an SMB number), S9 (reviews — what owners *believe* drives AI
visibility, not measured causation, and the automation half sits in Pillar 2's rejected-for-overlap
list), S12 (the lapsed buyer — 2022 data, four years old), S14 (volatility), and **automated review
or comment replies — rejected on our own code**: NOT BUILT plus a build-failing egress gate.

---

# THE TWO STRUCTURAL DECISIONS THE RESEARCH ASKED FOR

## 1. The integration cluster is consolidated into one card

**BA-1, BA-8, BA-11 and BA-15 are one deliverable and now ship as one card** — Pillar 2 #2, *"Your
Systems Talk to Each Other Instead of Somebody Retyping"* — with the four situations carried as
supporting clauses inside a single body rather than as four lookalike cards:

| Inventory pain | Where it now lives |
|---|---|
| **BA-1** typing into a second system | the card's premise: "entered once and it shows up everywhere it's needed" |
| **BA-15** sales-to-operations handoff | "the won deal becomes the scheduled job" |
| **BA-11** reading numbers off documents | "the supplier invoice's numbers land against the order" |
| **BA-8** asking the customer four times | "the customer never gets asked for their address a third time" |

The mismatch clause — "anything that doesn't match gets flagged instead of going in silently wrong"
— carries the honesty that all four pains share. Four cards would have read as one card written four
ways, which is exactly the failure mode the brief named.

## 2. The W5 overlap: Websites owns the first hop, Automation owns everything after

**Ruling: Websites owns it.** Pillar 4 #3 ships as *"What Happens on Your Site Shows Up Where You
Actually Work"*; Pillar 2 #2 never mentions a website.

**The one-line reason:** the pain is felt while the owner is *looking at their website* thinking
"I paid for this thing and it doesn't even talk to my CRM" — so a buyer browsing the Websites pillar
with that complaint has to find the answer there.

The split is by where the buyer is standing when the pain bites:

| | Owner | The hop | Card |
|---|---|---|---|
| Website → systems | **Pillar 4 #3** | the form or booking the site itself produces, landing in the CRM, calendar or inbox | *"What Happens on Your Site Shows Up Where You Actually Work"* |
| System ↔ system | **Pillar 2 #2** | everything downstream — deal to job, quote to invoice, supplier document to ledger | *"Your Systems Talk to Each Other Instead of Somebody Retyping"* |

This is **the researchers' settled ruling, adopted — not a decision this spec made.** The ops
researcher ceded the first hop explicitly, and the team lead has since confirmed it, overriding his
own earlier instinct that integration belonged wholesale to Automation. It costs the Automation
pillar nothing: it keeps fifteen other pains and both of its lead cards.

**Enforcement rule for the implementer: the word "website" appears in Pillar 4 only.** Where an
Automation card must refer to the first capture, it says "whatever the customer gave you the first
time." The real collision was never W5 itself — it was **BA-8**, which originally read "one intake
that feeds every downstream system", and *intake* usually **is** the website form. The inventory
rewrote BA-8 to start one step later, and this spec renders it that way: P2 #2's clause is
*"the customer never gets asked for their address a third time"*, which begins after the first
capture and names no form, no intake and no site.

### Boundary enforcement audit — run mechanically, not asserted

Re-run this any time a card body is edited. Results as of this draft:

| Check | Result |
|---|---|
| `website` / `web site` in any Business Software, Automation or AI card body or title | **0 occurrences** |
| `site` in any Automation card body | **0 occurrences**; the only pillar whose bodies use it is Websites |
| `intake` anywhere in the spec | **0 occurrences** |
| Statistics (`%`, `$`) inside P4 #3 (W5) | **none** — and the card states its `[NO NUMBER]` status |
| Statistics inside P2 #2 (the BA-1/8/11/15 consolidation) | **none** — and the card carries the binding rule "no statistic may ever attach to this card" |
| `Chartbeat` / `Axios` outside Pillar 5 | **0 occurrences** — the 60%-vs-22% publisher figure is confined to P5 #5's claim check, where it is additionally labelled publisher data that must not be generalised to a local business |
| The disputed `llms.txt` sentence used as a quote | **never** — it appears once, inside a **"Do not use"** instruction. Only the two sentences a researcher confirmed personally are offered for quoting |

**One near-miss, checked and cleared rather than passed over:** P3 #5's body reads "the invoice, the
form or the contract." That *form* is a piece of paperwork being read by a document extractor, not a
website form, and it sits in the AI pillar with no site anywhere near it. Flagged here so a reviewer
can disagree with the call rather than have it made silently.

**Both recognition-only cards rest on recognition alone and neither may be propped up.** W5 is
`[NO NUMBER]` with no source located; BA-8 is Tier D for the same reason. They sit adjacent across
two pillars describing two halves of one journey, and they must not be written so as to imply a
shared research base that does not exist. The urge to add a figure to either is precisely the failure
this rewrite exists to prevent.

---

# COUNT LINE

**36 cards total** — Business Software ×7, Business Automation ×7, AI Integration ×8, Websites ×7,
SEO AI Visibility Ad Management ×7.

- **20 cards carry proof** — a SHIPPED or PARTIAL ledger row behind the delivery claim, and may use
  "we have built": P1 #1, #3, #4, #5 · P2 #1, #2, #3, #5, #7 · P3 #1, #3, #4, #5 · P4 #1, #3, #4, #5
  · P5 #4, #5, #7. *(4 · 5 · 4 · 4 · 3.)*
- **16 cards are forward claims** — "we solve exactly this", present tense, no delivery record
  implied: P1 #2, #6, #7 · P2 #4, #6 · P3 #2, #6, #7, #8 · P4 #2, #6, #7 · P5 #1, #2, #3, #6.
  *(3 · 2 · 4 · 3 · 4.)* One of the sixteen, **P5 #1**, makes no delivery claim of any kind — it
  promises only to show the buyer Google's page — so it warrants nothing and is counted here for
  bookkeeping.

**Arithmetic checked, not asserted:** 20 + 16 = 36, and the two lists partition every pillar's cards
with no card in both and none in neither. *(An earlier draft of this line said 21/15; it was wrong,
and it was caught by counting rather than by re-reading.)*
- **Three cards carry a proof half and a forward half, each stated inside its own claim check:**
  P2 #1 (issuing and reconciling invoices is built; the escalating chase is not), P2 #5 (print-exact
  rendering is built; generation-from-record and signature are not), P3 #5 (verification is built and
  test-enforced; the joined extractor is not).

**Cards I could not source to a pain in either inventory — stated plainly rather than dropped:**

1. **P2 #7, "Nothing Goes Out to a Customer at 3am That You Haven't Seen."** No inventory ID. No
   researcher listed it as a buyer pain. It ships anyway because it answers the objection that blocks
   the whole pillar and because it is the strongest proof row in it, written after a real 2026-08-20
   failure rather than designed in a meeting. **If the owner wants strict pain-sourcing, this is the
   card to cut**, and BA-7 (self-service booking and reminders) is the replacement.

That is the complete list. Every other card cites an inventory ID.

**Two cards need the owner's ruling before they ship, and neither is a code question:**

1. **P4 #2** — *"You Own the Domain, the Site and the Accounts."* An operational commitment. Honest
   only if it is actually how handovers work.
2. **P3 #4's written data-handling statement** — honest only if someone writes that page.

**Pillar-name check, run mechanically over all 36 titles.** No title contains "Business Software",
"Business Automation", "AI Integration", "Websites", "SEO", "AI Visibility" or "Ad Management".
Three near-misses, checked deliberately and cleared: P1 #1 and #2 contain the word *Business* alone
(not the pillar's name, and #1 is the owner's own calibration phrase); P4 #3 and #6 contain *Site*
(singular, not the pillar token *Websites*); P5 #4 contains *Ads* (not *Ad Management*). **Hard Rule
1 holds across all five pillars.**

**Rejected-evidence check.** I claimed "no card body contains a market statistic" and then checked
it rather than asserting it. **No card body contains a percentage, a dollar figure, a time-saved
claim or a performance multiple.** Ten bodies contain a descriptive quantity — "five or six
numbers", "one click", "three days", "the three pages that matter", "a third time", "three things",
"9pm", "3am", "one page", "the first day" — every one of which is a plain-speech quantity, not a
finding. Every statistic in this document lives in a *Pain* or *Claim check* line, where it is
addressed to the implementer and explicitly bounded.

Named and confirmed absent from every card: "340% ROI", "2.3-month payback", "82% copy-paste between
systems", "$126,000 lost per year", "62% of calls unanswered", the "50–200% conversion lift" and
"1–2% vs 5–8%" family, "$8,000–$25,000 per hour of downtime", "93% of businesses have a fact wrong
in AI answers", "30–50% of local ad budget wasted", "mobile users abandon after 3 seconds", "152
SaaS apps", "93% of SMBs use spreadsheets weekly", the McKinsey "SMB Automation Survey" and the
Salesforce "SMB research division" attributions, the Global Payments distrust cluster (HTTP 403),
and the HBR-2011/MIT-2007 speed-to-lead family. **"MCP" appears on no card** — the only three
mentions in this document are these rules about it.

---

# DISAGREEMENTS AND OPEN ITEMS — left visible, not reconciled

1. **Pillar 2's lead: the owner's seed vs. the evidence.** He named manual data entry as the headline
   win; the best-evidenced pain in either inventory is unpaid invoices. I led with invoices and put
   data entry at #2 in his own words. **His call, one-line swap.**
2. **Pillar 3 is eight cards, the others are seven.** Deliberate — AI is his stated priority and the
   pillar's two best items sell to opposite halves of the same buyer. If layout demands seven, cut
   **#8** (start with one job) and fold its sentence into #7's body.
3. **Pillar 5 title punctuation, carried forward unresolved from v1.** The four siblings are Title
   Case with a trailing period; `SEO AI Visibility Ad Management.` has no internal punctuation and
   reads as a run-on. Only the trailing period was added, because the owner's five words may not
   change and commas would change them.
4. **"SEO, AEO and GEO" as three products vs. Google's published position.** Google (2026-07-10)
   says optimizing for generative AI search *is* SEO and warns buyers about services sold as
   separate. This spec answers by quoting Google (P5 #1) rather than stacking acronyms. That is a
   positioning decision, not a fact I can correct — **his call, flagged not silently taken.**
5. **The `llms.txt` verbatim dispute is unresolved and stays unresolved.** Two agents disagree on
   whether the phrasing is Google's. The spec uses only the two sentences one agent confirmed
   personally. Nothing here depends on the disputed one.
6. **Citation drift, recorded not hidden:** the ledger cites the assistant's missing-key gate at
   `routes/ai-ask.ts:215-227`; the file I opened has it at `:213-227` in a slightly different return
   shape. Behaviour is identical (503, `ai_unavailable`). Where the ledger and the source disagree on
   a line number, I report both and take the source.

---

# APPENDIX — CARD TITLES ONLY
*(for the icon designer — nothing else needed)*

## Business Software.
1. Your Whole Business on One Screen
2. The Business Runs the Week You're Not There
3. When Someone Leaves, Their Access Leaves With Them
4. The Spreadsheet Everyone's Afraid to Touch
5. Whoever Answers the Phone Has the Whole History
6. It Stops Living in One Person's Head
7. Know Which Jobs Made Money Before You Quote the Next One

## Business Automation.
1. Get Paid Without Ever Chasing an Invoice Yourself
2. Your Systems Talk to Each Other Instead of Somebody Retyping
3. The Last Week of Every Month Stops Disappearing
4. Nothing That Comes In at 9pm Waits Until Morning
5. Proposals and Contracts That Build Themselves From the Job
6. Nothing Expires Without You Knowing Weeks Ahead
7. Nothing Goes Out to a Customer at 3am That You Haven't Seen

## AI Integration.
1. It Shows Its Work, and Never Makes the Big Call Without You
2. Your Team Is Already Using AI. We Make That Safe.
3. Ask a Question About Your Own Business, Get the Real Number
4. You Know Where Your Data Goes, in Writing
5. It Reads the Paperwork, Then Checks Every Number Against the Page
6. Put the AI on the Paperwork, Not in Front of Your Customers
7. Nobody Here Has to Learn to Run It
8. Start With One Job, Measure What It Saves, Then Decide

## Websites.
1. Change Your Own Hours, Prices and Photos in a Minute
2. You Own the Domain, the Site and the Accounts
3. What Happens on Your Site Shows Up Where You Actually Work
4. See Exactly Where People Give Up, and Fix That Step
5. A Site That Produces Something You Can Count
6. We'll Tell You If Your Site Is Fine. Sometimes It Is.
7. Hand Your Phone to a Customer Without Wincing

## SEO AI Visibility Ad Management.
1. Google Says Be Careful Who You Hire for This. We'll Show You the Page.
2. We Ask ChatGPT About Your Business and Show You What It Says
3. When AI Gets Your Address, Hours or Services Wrong, We Fix the Source
4. First We Make Your Ads Countable. Then We Stop Paying for Clicks That Never Call.
5. Your Traffic Dropped and It Probably Wasn't Your Fault
6. Being Found Isn't Being Quoted
7. We Report Booked Work, Not Rankings — and What We Couldn't See

*(Longest titles are P5 #4 and P5 #1. If the layout needs a cap: "First We Make Your Ads Countable"
and "Google Says Be Careful Who You Hire for This" both survive the trim without changing the
claim.)*
