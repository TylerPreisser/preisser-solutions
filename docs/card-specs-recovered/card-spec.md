# "What We Deliver" — Card Spec, five pillars
Drafted 2026-09-05 by docs-writer. **Revision 3** — e-commerce and lead funnel restored as BUILDABLE
cards; roster export count settled at four. **Revision 2** — incorporates Research Part 2 (plain language,
QuickBooks late-payments data, control-first AI framing). **Spec only. `service-pillars.tsx` was read,
never edited.**

## What this fixes, verified at source

The owner's complaint is literally true, and it is true for **three of the five pillars**. Verified by
grep against `src/components/home/service-pillars.tsx`:

| Pillar (`title:`) | Self-named card | Line |
|---|---|---|
| `Business Software.` (:133) | `title: "Business Software"` | **:158** |
| `Business Automation.` (:229) | `title: "Business Automation"` | **:254** |
| `AI Integration.` (:341) | `title: "AI Integration"` | **:369** |
| `Websites.` (:456) | none — first tile is `"Website Redesign"` | :486 |
| `Search, AI, and Ads.` (:576) | none — first tile is `"Local SEO"` | :599 |

All 34 cards below are checked against Hard Rule 1 mechanically. **No card carries its pillar's name.**

## Evidence ceiling — read this before trusting a row

I opened **one** implementation file: `src/components/home/service-pillars.tsx`. I did **not** open the
nwks, marcommand or ps-admin repositories. Every `file:line` in a "ledger row" below is **quoted from
the capability ledger**, itself a code-read artifact by another agent. A row here means *"the ledger
cites this at that line"*, not *"I read that line."* Where sources disagree I report it under
**Disagreements** rather than silently picking one.

## Plain language is a first-pass requirement, not a polish step

JMIR 2025 analysed 1,241 documents whose *stated purpose* was plain language; **2.8%** achieved it, and
first drafts in the lowest-jargon fifth were **>10× more likely** to still be low-jargon at the end.
Jargon survives editing. So every body line below was written plain on the first pass and then checked
against one test: *would a 55-year-old owner of a 12-person HVAC company say this sentence out loud to
their spouse?*

Consequences visible in the copy:
- **Three terms earn their place and are used deliberately:** the assistants by name (**ChatGPT,
  Gemini, Perplexity**), the buyer's own software by name, and nothing else.
- **"MCP" appears on no card**, in no body, in no title. It is the honest answer to *"what happens if we
  outgrow you?"* — *"these connections run on an open standard the major AI companies agreed on, so
  they aren't locked to us"* — and that belongs in a technical FAQ or a proposal appendix.
- **"Schema markup" / "structured data" is cut, not translated.** There is no plain version a buyer
  both understands and cares about, and Google's own guidance says it is not required for AI search.
  Note this removes the current tile `"Structured Data and Schema"` (:533).
- Deleted on sight wherever they appeared: scalable, future-proof, end-to-end, seamless, robust,
  leverage, holistic, bespoke, digital transformation.

## Naming convention (read from the file)

Pillar titles are Title Case **with a trailing period**. Card titles are Title Case **without** a
period and use `&` freely (`Client & Member Portals, Booking & Intake`).

**Pillar 5 rename:** `SEO AI Visibility Ad Management.` — the owner's five words unchanged, trailing
period added to match the four siblings. No commas or "and" added, because that would change the words.

## The claim-tier rule as applied here

- **"We build X"** — free for BUILDABLE.
- **"We have built X"** — requires a SHIPPED or PARTIAL row. PARTIAL is never rounded up.
- No client story, no number, no name that is not in the ledger.
- One extra guard the ledger imposes and I honoured: Lookout AI is PARTIAL, so *"we have built an
  assistant with server-injected tenant isolation"* is explicitly permitted by the ledger, but **any
  framing of it being in daily use is not** — it returns a 503 today (`routes/ai-ask.ts:215-227`).

---

# PILLAR 1 — Business Software.

12 SHIPPED rows. Selected for picturability, not count. The self-named card at :158 is deleted.

### Why the lead card leads
The owner's own framing is *"custom stuff for them to get them off of spreadsheets, move them into an
entire system."* It is also the only card here backed by a **completed, one-time real migration** —
seven import scripts that ran end to end — rather than a feature. It puts the buyer's actual situation
in card position 1.

**Reorder note (Research Part 2 considered and declined):** Part 2 proposed leading this pillar with an
adoption checkpoint — *"we check whether your team is actually using it, 30 and 90 days in."* It is a
good card and the pain behind it is evidenced (Gartner 2023: slow implementation 32%, under-resourced
implementation 41%). **It has no ledger row** — it is a service commitment, not a capability — so under
Hard Rule 6 it cannot ship as a card. Listed in the unsourced section below with a recommendation.

---

**1. Off the Spreadsheet, Into One System**
*Body:* The workbook everyone keeps emailing around becomes one system your whole team opens at the
same time — so nobody has to work out which copy is the real one.
*Ledger row + tier:* Pillar 1 — "Spreadsheet-to-D1 migration off the old Google Drive workflow",
**SHIPPED (one-time)** — `scripts/import_drive_documents.py`, `import_drive_export.py`,
`import_womens_drive.py`, `import_org_history.py`, `import_baptisms.py`, `import_mbox_testimonies.py`,
`build_slate_from_workbooks.py`. Reinforced by BUILDABLE P1 row 1.
*Claim check:* Body reads as present-tense capability = **"we build"**. **"We have built"** is
separately warranted and may be used in adjacent prose — a real shared-drive-to-database migration
shipped. No client named, no number claimed.

**2. Exports Shaped for Whoever Asked for Them**
*Body:* The same list comes out four different ways — one to send out, one to work from, one grouped
by location, one that feeds a sheet of labels — and you see it on screen before it downloads.
*Ledger row + tier:* Pillar 1 — "Roster export to real .xlsx with **four** named profiles",
**SHIPPED** — `admin/src/export/rosterWorkbook.ts:77`
(`export type ExportProfile = 'share' | 'working' | 'launch' | 'avery';`), dependency-free writer at
`admin/src/export/xlsx.ts`, preview at `ExportPreviewTile.tsx`.
*Claim check:* **"we have built"** — SHIPPED. **Settled in revision 3:** the dispatch said two profiles,
the ledger cites four at `rosterWorkbook.ts:77`, and the team lead has confirmed the ledger is right and
the brief carried an error from an earlier recon pass. The hedge is removed and the card now says
**four**, which is the more persuasive claim and the one the code supports. If anyone ever adds a fifth
profile, this card's number is the thing that goes stale — note it in the code comment.

**3. Badges, Tags & Labels Off the Live List**
*Body:* Name badges, tags and labels print straight from the list the event is actually running on —
no copying into a separate file the night before.
*Ledger row + tier:* Pillar 1 — "Badge & tag printing, incl. Avery label layout", **SHIPPED** —
`admin/src/pages/PrintPage.tsx`, `admin/src/pages/print/`, plus the `'avery'` export profile.
*Claim check:* **"we have built"** — SHIPPED.

**4. Who's Assigned Where — and the Schedule Prints Itself**
*Body:* Drag people onto rooms, crews or shifts and that board *is* the record everyone works from;
the staffing schedule prints as a PDF from the same place.
*Ledger row + tier:* Two SHIPPED rows, merged into one card. Pillar 1 — "Cabin / room assignment
board", **SHIPPED** — `admin/src/App.tsx:452`, `admin/src/pages/rooms/`. Pillar 1 — "Org Sheet staffing
with schedule PDF", **SHIPPED** — `admin/src/App.tsx:453`, `admin/src/pages/orgsheet/schedulePdf.ts`.
*Claim check:* **"we have built"** for the room board and the schedule PDF (both SHIPPED). The
generalisation to crews and shifts is **"we build"** — the body is written generically on purpose so it
never asserts a shipped crew-scheduling product. Merged from two cards in revision 1 to keep the stack
short; both halves are real and separable if the owner wants two.

**5. The Books Are Ready Before Tax Season Is**
*Body:* Bank activity, invoices, payments and the current tax rates all sit in one place that stays
current, so the year-end scramble stops being a scramble.
*Ledger row + tier:* Pillar 1 — "Books / ledger, reconciliation, Plaid link, Stripe pay, tax rate
table", **SHIPPED** — `agent/ledger.py`, `agent/reconcile.py`, `agent/plaid_link.py`,
`agent/stripe_pay.py`, `agent/tax_rates.py`, dashboard at `worker/src/dashboard.js`. The "stays
current" half is `agent/refdata_ingest.py`, which pulls tax figures literally out of the primary IRS
document rather than from a summary.
*Claim check:* **"we have built"** — SHIPPED. **Hard limit: this is bookkeeping, not tax filing and not
tax advice.** The ledger has a tax *rate table*, not a return preparer. Do not let this card drift into
"we do your taxes." Added in revision 2 on Part 2's evidence: **77% of owners report tax-season anxiety
and bookkeeping/taxes is the #1 task they would hand to AI (17%)** — QuickBooks, fielded Dec 2025,
n=1,305, ±2.7pp. Do not print those numbers on the card; they are why the card exists.

**6. Their Own Login — Revoked the Day They Leave**
*Body:* Everyone gets their own account with only the screens their job needs, a second step at sign-in
that stays on unless somebody deliberately turns it off, and access you take back in one click.
*Ledger row + tier:* Pillar 1 — "Two-factor auth with a fail-secure off switch", **SHIPPED** —
`wrangler.toml:28-31` (only the exact string `"false"` disables it), parsed in
`functions/_api/security.ts twoFactorEnabled()`. Plus BUILDABLE P1 row 4 — `functions/_api/auth.ts
reviewerMayReach` is an **allowlist** (`routes/ai-ask.ts:9-13`), screens at `TeamPage.tsx`,
`SecurityPage.tsx`.
*Claim check:* **"we have built"** — SHIPPED. "Second step at sign-in" replaces "two-factor
authentication" per the plain-language pass. The fail-secure detail — a typo turns it back **on** — is
the differentiating half and is quoted from config, not invented.

**7. Personal Details That Delete Themselves on the Date You Set**
*Body:* A customer's phone number comes out of the system on the date you chose, and there is a record
of who looked at it before then.
*Ledger row + tier:* Pillar 1 — "Lead Desk — lightweight multi-tenant CRM with sealed PII, access log,
retention sweep, response-time report", **SHIPPED (deployed worker)** — `src/leaddesk/` (31 files,
8,154 LOC), routed first at `src/worker.ts:50`, retention on the daily cron at `src/worker.ts:96`.
*Claim check:* **"we have built"** — SHIPPED. Deliberately placed: data security / privacy is the
**#1 adoption barrier at 33%, up from 23% in 2025** (Bluevine/Centiment, 7–9 Apr 2026, n=942, ±3%).
Answers it with a shipped mechanism instead of a reassurance. "Retention window" was cut for "the date
you chose."

---

# PILLAR 2 — Business Automation.

The self-named card at :254 is deleted. **"MCP" appears nowhere.** **No number appears on any card.**
The circulating "340% ROI", "2.3-month payback", "82% copy-paste between systems" and "16+ hours a week
on admin" figures all trace only to content farms and are rejected.

### Why the lead card changed, and why the owner may want to overrule it

**Revision 2 reordered this pillar.** The owner's seed named **manual data entry** as the headline win.
It is now card **2**, not card 1.

The reason is Hard Rule 3 — the strongest differentiator leads — read against the evidence. The
best-sourced pain in either research report is unpaid invoices: **59% of small businesses have invoices
30+ days overdue, up from 47% a year earlier; average owed $17.7K; 39% could not cover payroll or bills
after a single late payment; 26% delayed their own salary; 74% lack full automation for bill
management** (Intuit QuickBooks 2026 Small Business Late Payments Report, drawing on a quarterly survey
of ~5,000 SMB owners plus the Dec 2025 survey of 1,305). It is recent, correctly populated, disclosed,
getting worse rather than better, and three-quarters of the market has not solved it. By contrast,
**every** public cost-of-manual-data-entry statistic is unsourced.

**Manual data entry did not get dropped — it is card 2, in the owner's own words.** If he prefers his
original order, this is a one-line swap and nothing else in the pillar changes.

---

**1. Invoices Go Out on Their Own and Chase Themselves**
*Body:* The invoice sends itself on schedule, the payment finds its own invoice when it lands, and you
stop being the person who has to ask.
*Ledger row + tier:* **This card is a split and the split is unusual — read it.**
- *Sends itself:* Pillar 2 — "Monthly invoice run on launchd (1st of month, 07:00)", **SHIPPED** —
  `agent/run_monthly.sh:1-4, 25-26`, rendered by `renderer/render.py`.
- *Payment finds its own invoice:* Pillar 2 — "Bank-deposit ↔ invoice reconciliation with deterministic
  re-check", **SHIPPED** — `agent/reconcile.py`, `agent/adjudicate.py:44-52`.
- *Chases / sends reminders / shows a live who-owes-what list:* **NO LEDGER ROW EXISTS.** The ledger
  contains no dunning, reminder or aging-report row, and I did not find one. The adjacency argument
  below is **mine, constructed for this card**, not the ledger's: the mail plumbing is built
  (`agent/graph_mail.py` reads a live Microsoft 365 mailbox), the scheduled-job plumbing is built
  (`run_monthly.sh` on launchd), and the system already knows which invoices are open and unpaid
  (`adjudicate.py:44-52` checks "invoice must be open and unused"). A reminder is a scheduled query
  over data already tracked, sent through mail already wired. I believe that is short. **I am flagging
  it as my argument so nobody later mistakes it for a ledger citation.**
*Claim check:* **RULED 2026-09-05 by team lead: ship it, as BUILDABLE.** The disclosure above stands —
the adjacency argument is mine, not the ledger's — and the card ships anyway because the pain is the
best-evidenced in either research report and buildable capability belongs on these cards.

**The phrasing constraint is absolute and it is the whole ruling.**
- **"We have built"** — available for the two halves that shipped: invoices that send themselves
  (`agent/run_monthly.sh:1-4, 25-26`) and payments that find their own invoice (`agent/reconcile.py`,
  `agent/adjudicate.py:44-52`).
- **"We build"** — the ONLY phrasing available for the chasing. There is no dunning row.
- **The body must read as something we build for the buyer, never as a system he already operates.**
  A present-tense *title* over a "this is what we build you" *body* is fine. A body implying his
  invoices are chasing themselves **today** is not, and no sentence anywhere on the page may pair this
  card with a past-tense claim about reminders. If a later editor writes "your invoices chase
  themselves" as a description of the current state, that is the failure this spec exists to prevent.

**LABELLED FALLBACK — one-line swap.** If the owner would rather not commit to building the dunning
step, replace the title with **"Invoices That Send Themselves — and Payments That Find Them."** That
version is fully SHIPPED-backed, needs no adjacency argument, and loses the strongest word in the
pillar. Nothing else in the card changes. My recommendation remains the chasing title plus building the
reminder; it is genuinely short and it is the whole pain.

**2. Entered Once, Never Retyped**
*Body:* Your systems tell each other instead of somebody retyping between them — fourteen outside
platforms already feed one shared table on a schedule, and the same wiring points at the tools you
actually run.
*Ledger row + tier:* Pillar 2 — "Scheduled connector sweep pulling 14 platforms into one fact table",
**SHIPPED** — `src/worker.ts:74` `handleConnectorScheduled(...)`, crons `["17 4 * * *", "23 */6 * * *"]`
at `wrangler.jsonc:112`. Supported by "Inbound-email → structured record pipeline", **SHIPPED**.
*Claim check:* Split, and the split is inside the sentence. **"We have built"** the fourteen-platform
feed (SHIPPED). Pointing it at a given client's tools is **"we build"** — "points at" is present-tense
capability, not a delivery record. This is the owner's must-survive item, preserved verbatim in
meaning. Part 2's addition — *"and we count how many times a week that was happening"* — is a
measurement commitment with no ledger row; see the unsourced list.

**3. It Arrives as an Email and Files Itself**
*Body:* Somebody emails it in, the attachment gets opened and read, and the contents land on the right
record — so the person reviewing it sees the actual document, not a four-word covering note.
*Ledger row + tier:* Pillar 2 — "Inbound-email → structured record pipeline with .docx text extraction,
dependency-free", **SHIPPED** — `email-worker/docx.ts` (432 lines; `MAX_DOCX_BYTES = 10_000_000` at
`:46`), wired at `email-worker/worker.ts:7-15`, rationale at `docx.ts:5-8`.
*Claim check:* **"we have built"** — SHIPPED, for Word attachments. Honest limit worth keeping if there
is room: `.doc` and `.pdf` are refused **on purpose** (`docx.ts:17-20`) because a crude text-strip on
those "produces convincing garbage, which is worse than nothing." Do not imply every format works.

**4. Approve It by Replying "Yes" From Your Phone**
*Body:* Reply to the email the way you would to a person — a plain "approved" goes straight through,
and anything that asks for a change is held for you instead of guessed at.
*Ledger row + tier:* Pillar 2 — "Email-reply-driven invoice approval", **SHIPPED** —
`agent/reply_ai.py:167-169` (a plain approval is matched by a rule with no model call at all),
`agent/approval_watcher.py`, `agent/graph_mail.py`.
*Claim check:* **"we have built"** — SHIPPED, running for invoices today. The body does not claim it
works on arbitrary document types.

**5. Two Lists That Should Agree, Checked Every Morning**
*Body:* The obvious matches are already ticked off when you sit down, and you look only at the handful
that are genuinely unclear — instead of two windows open, going line by line.
*Ledger row + tier:* Pillar 2 — "Bank-deposit ↔ invoice reconciliation with deterministic re-check",
**SHIPPED** — `agent/reconcile.py`; every leftover re-checked against exact amount, open status and a
confidence floor before it is accepted (`agent/adjudicate.py:44-52`).
*Claim check:* **"we have built"** — SHIPPED for payments against invoices. The body deliberately no
longer lists "orders against shipments," which was a second example with no row behind it. **Boundary
with card 1:** card 1 is money you are owed going out and being chased; this card is any two lists that
should agree. If the implementer finds them too close, cut this one — card 1 is the stronger.

**6. The Things It Will Never Do Without You**
*Body:* Every automation comes with a written list of what it is not allowed to do unless a person says
yes — and until you deliberately turn it loose, automated mail goes to you, with the real recipient
named in the subject line.
*Ledger row + tier:* Pillar 2 — "Unattended-email blast guard (fail-safe redirect to owner)",
**SHIPPED** — `wrangler.toml:38-52`; only the exact string `"live"` opens the gate. Reinforced by
`src/executor/kernel.ts:22-25` ("SHADOW IS THE DEFAULT AND IT IS NOT A NO-OP"), **SHIPPED**.
*Claim check:* **"we have built"** — SHIPPED, two independent implementations. The *written list per
project* is **"we build"**. Aimed at the 78% of SMB owners who will not let AI run unsupervised.
**Do not narrate the 2026-08-20 incident that mailed 13 admins on the card** — it is why the guard
exists and it stays in the ledger.

**7. If Something Breaks, You Hear It From Us First**
*Body:* A job that fails at 2am is recorded by name and the unrelated jobs still finish — so you find
out from us, not from a customer two weeks later.
*Ledger row + tier:* Pillar 2 — "Daily retention sweeps that run even when a sibling job throws",
**SHIPPED** — `src/worker.ts:94-98` `Promise.allSettled([...])`, reasoning at `:88-93`, partial failures
logged as `sweep.partial_failure` / `retention.partial_failure`.
*Claim check:* **"we have built"** the failure isolation and the named-failure logging (SHIPPED). **"We
build"** the part where a human is notified and responds — the ledger shows the failure is *recorded*,
not that anyone is *paged*. The title says "you hear it from us," which is a service promise on top of
a shipped mechanism; it is honest only if somebody actually watches the log. **Confirm with the owner
before shipping this title.** Research Part 2 calls this "quietly one of the strongest cards
available," because the buyer has lived it with a previous vendor and has never heard anyone volunteer
it.

---

# PILLAR 3 — AI Integration.

**2 SHIPPED rows, 8 PARTIAL, 5 NOT BUILT, 11 BUILDABLE.** Both SHIPPED rows are guardrails — a spend
ceiling and prompt-injection handling. Code that *constrains* AI rather than being it. The self-named
card at :369 is deleted.

### Why the lead card changed — the most important reorder in this spec

Revision 1 led with capability (Lookout AI). **Revision 2 leads with control**, and the two SHIPPED
guardrail rows are now cards in their own right rather than footnotes.

Two independently-fielded surveys say the market is **anxious, not sceptical**: 78% of SMB owners do
not fully trust AI unsupervised and only 22% are completely confident; data-security concern moved
**23% → 33% in one year**; accuracy distrust sits at 31% (Bluevine/Centiment, April 2026, n=942, ±3%).
Meanwhile 40% fear falling behind without AI, but 37% would rather ask a human expert than trust AI's
advice, against 20% who would trust AI alone (QuickBooks, Dec 2025, n=1,305, ±2.7pp).

Read against our own ledger, that inverts the pillar's apparent weakness. The only AI code proven
shipped here is exactly what an anxious market is trying to buy. **The guardrails are the product.**
Lookout AI stays at the top of the stack as card 2 and its body is rewritten control-first — role-gated
writes, server-injected isolation and a pre-construction spend cap are control features before they are
AI features.

**Overrule note:** if the owner wants Lookout in position 1, swap cards 1 and 2. Nothing else moves.

Forbidden on any card here, per the ledger: "AI agents that optimize your ads", "8-agent marketing
system", bare "AI reads your documents", "AI writes your invoices", "AI answers your leads".

---

**1. It Asks You Before Anything That Matters**
*Body:* It does the work, then stops and asks before anything that counts — and you can see every time
it asked. It can propose and it cannot send; there is no path from the loop to a send button.
*Ledger row + tier:* Ledger 3.3 row 1, **BUILDABLE**, resting on three shipped or partial
implementations: `functions/_api/ai/agent.ts:4-8` — *"PROPOSE tools only insert `ai_pending_actions` —
they NEVER send email. The loop itself has no email access and no path to any send function"*
(**PARTIAL**); `src/executor/kernel.ts:22-25`, shadow by default, *"validated in full, recorded in
full, and simply not executed"* (**SHIPPED**); `wrangler.toml:38-52` (**SHIPPED**).
*Claim check:* **"We have built"** the propose-don't-send architecture — three independent
implementations exist, and the recording of every proposal exists. **"We build"** the written
permission list and the client-facing log per project. The phrase *"structurally, not by policy"* is
quotable from `agent.ts:4-8` and is the entire value of the card. Two sentences, deliberately: the
second one is the proof, and without it the first is a promise anyone can make.

**2. Ask Your Business a Question in Plain English**
*Body:* Ask "how many people from Hays registered this year?" and get the chart and the list behind it
off your own records — it can only ever see your business's data, whether it can change anything
depends on who is asking, and it stops when the month's budget is used up.
*Ledger row + tier:* Pillar 3 — "**Lookout AI** — natural-language assistant over live production data,
streamed, 6 read + 4 write tools, server-injected tenant isolation, metered spend cap", **PARTIAL** —
`ai/askLoop.ts:374`, `ai/ask-tools.ts` (1,535 lines; `find_person` :254, `get_person_profile` :278,
`list_people` :298, `event_overview` :330, `roster_breakdown` :345, `chart_data` :376),
`ai/askWrite.ts` (1,203 lines; `move_person_to_room` :215, `record_baptism` :253, `generate_sheet` :300,
`church_baptism_report` :327), scope injected server-side (`routes/ai-ask.ts:20-24`), writes gated at
`:284`, spend capped before the client is constructed at `:249`.
*Claim check:* **"we build"** is the shipping phrasing, per the ledger's own ✅ wording:
*"We build plain-English assistants that answer questions off your live business data, with the tenant
isolation, permission gates and spend caps that make that safe to put in front of staff."* PARTIAL does
warrant a bare "we have built one", and the ledger explicitly permits *"Preisser built a
natural-language data assistant over a live production database with server-injected tenant
isolation"* — but **no sentence anywhere may imply it is in daily use.** It returns a 503 today.
Rewritten in revision 2 so the three control properties are in the body rather than in a footnote.

**3. It Reads the Document, Then Checks Every Number Against It**
*Body:* We pointed a model at a tax document and it gave us a confident figure that was two years out
of date — off a document that was current, and that contains the right number twice and the wrong one
not at all. So now every figure has to be found in the document itself before anyone sees it, the ones
it cannot confirm go to a person, and a test stops the build if anyone removes that check.
*Ledger row + tier:* Two rows, and the split matters.
- The refusal and the test: Pillar 3 — "AI document extraction", **NOT BUILT — by decision, with a test
  enforcing it** — `agent/refdata_ingest.py:5-13`, `tests/test_refdata_ingest.py:26-46` (bans
  `anthropic`/`openai`/`PROMPT`/`shutil.which`/`claude` from the module source, pins `subprocess.run`
  argv[0] to `{CURL, PDFTOTEXT}`).
- The pattern being sold: ledger 3.2, **BUILDABLE** — "model proposes, deterministic checker gates",
  already implemented three times: `agent/adjudicate.py:44-52`,
  `functions/_api/testimonies/classify.ts`, `src/responder/validate.ts:5-7`.
*Claim check:* **"we build"** for the joined read-then-verify pipeline; the two halves exist separately
and have never been joined. **"We have built"** is warranted for the verification layer and the
build-failing test, which are real. **This card gets three sentences and that is deliberate.** The
ledger explicitly forbids softening the incident into "we ensure accuracy" and explicitly forbids
describing it as hypothetical. It happened; owning it is the differentiator. **Do not print the dollar
figures** — "two years out of date" carries it, and the digits invite a "which document?" conversation
a card cannot hold. Part 2 independently identifies *"flags the ones it isn't sure about"* as the
differentiating half, which is why that clause is in the body and not in the notes.

**4. When It Doesn't Know, It Says So**
*Body:* Two possible matches produce a question, not a confident answer about the wrong person or the
wrong invoice — "I'm not sure" is an answer it is allowed to give.
*Ledger row + tier:* Ledger 3.3 row 7, **BUILDABLE**, on shipped behaviour:
`routes/ai-ask.ts:24-26` — *"A name matching more than one person returns a candidate list; the model
is required to ask which one and forbidden from picking. That is the top failure mode for this
feature."* Plus `admin/src/askApi.ts:38-47` and `agent/adjudicate.py` deferral.
*Claim check:* **"we build"**. The rule is implemented and the ledger calls it the most-repeated rule in
the repos, but as a generalised product the row is BUILDABLE, so present tense only. Aimed at the 31%
"distrusting AI's accuracy" barrier. **Distinct from card 1:** card 1 is permission before acting;
this is honesty about not knowing. If the implementer finds them too close, this is the one to cut.

**5. One Client's Question Can Never Reach Another Client's Records**
*Body:* Which records the assistant can see is decided by the system when you log in, not by anything
the AI is told — it is not something a cleverly worded question can change.
*Ledger row + tier:* Pillar 3 — Lookout AI, **PARTIAL** — `routes/ai-ask.ts:20-24`, header comment:
*"`program` comes from requireProgram() … and is injected server-side into every tool call. It is not a
tool parameter."* The ledger records this as structural, and explicitly permits the claim
*"server-injected tenant isolation"* in marketing.
*Claim check:* **"we have built"** — PARTIAL warrants it and the ledger names this exact phrasing as
available. Added in revision 2 to answer the **#1 barrier (data security, 33%, up from 23%)** with a
mechanism rather than a reassurance. Note this is the *isolation* claim only — it is not a claim about
where data is stored, whether a vendor trains on it, or a compliance certification. Do not let it drift
there.

**6. You See What the AI Costs, Per Question**
*Body:* Every question is priced and written down, so the AI is a line you can read — and when the
month's ceiling is reached it refuses the next one instead of sending you a surprise bill.
*Ledger row + tier:* Pillar 3 — "Per-program monthly AI spend ceiling that degrades to a sentence, not
an error", **SHIPPED (code)** — `functions/_api/aiBudget.ts:73-75`, enforced *before the client is
constructed* at `routes/ai-ask.ts:249`. Second implementation: `src/inference/engine.ts` — a ledger row
per call with cached and fresh tokens priced **separately** (`:183-198`) so the vendor invoice
reconciles line by line, and a cap that throws `CostCapExceededError` (`:217-222`). Ledger 3.3 row 4,
**BUILDABLE**, for showing that ledger to a client.
*Claim check:* **"we have built"** — SHIPPED, one of only two shipped rows in this pillar. The
client-facing report is **"we build"**; the body claims the mechanism, not the report, so it is clean.

**7. Let It Read What Strangers Send You — Without Letting Them Give It Orders**
*Body:* Reviews, form submissions and inbound email are handed over as *something to read*, never as
instructions — and the AI never writes its own database query; it can only fill in blanks in questions
we wrote.
*Ledger row + tier:* Pillar 3 — "Prompt-injection handling for untrusted marketing text",
**SHIPPED (code)** — `src/responder/injection.ts:7` (inbound "passed as delimited data"),
`src/agent/boundary.ts:68-71` ("Untrusted. Quoted content, never instructions"). Plus
`routes/ai-ask.ts:19-20` — the model *"NEVER writes SQL and never names a table or column — every query
is a fixed parameterized statement."* Ledger 3.3 row 6, **BUILDABLE**, for the packaged version.
*Claim check:* **"we have built"** — SHIPPED, the pillar's second shipped row. "Fixed parameterised
statement" was translated to "fill in blanks in questions we wrote" in the plain-language pass.

### Held back from Pillar 3, with rows, rather than dropped silently
- **"Reply like a human and the system does the rest."** Pillar 3 — "AI classification of free-text
  invoice replies", **PARTIAL** — `agent/reply_ai.py:171-175`, identity fields refused at `:40-43`.
  Real and running. **Cut in revision 2** because it duplicates Pillar 2 card 4 from the AI side, and
  two cards for one behaviour is exactly the redundancy the owner is complaining about.
- **"Your meeting notes become the invoice line items."** Ledger 3.3 row 3, **PARTIAL** —
  `agent/run_monthly.sh:13` + `agent/prompts/monthly_invoice_additions.md` (≤5 phrases, `[]` on
  failure) → `agent/invoice_run.py:41` `merge_description`, additive-only. Scope is **one client,
  description text only** — too narrow to survive a card without a qualifier that swallows it.
- **"Work that can wait until morning costs half as much."** Ledger 3.3 row 5, **BUILDABLE** —
  `src/inference/engine.ts:273`. Nothing submits a batch today and buyers do not shop on this.
- **A customer-facing chatbot.** Deliberately absent. Research Part 2 found no credible evidence SMB
  buyers want one and the 78% trust figure points the other way; our own ledger says
  `src/responder/compose.ts:15-19` — *"THERE IS NO COMPOSER REGISTERED IN THIS PHASE"* — so we could
  not claim it anyway. Both reasons agree, which is rare.

---

# PILLAR 4 — Websites.

This pillar already had no self-named card, so Hard Rule 1 was not the problem here — vagueness was.
Every card below names something the buyer can picture.

### Why the lead card leads
The two loudest fears in the website-buying literature are **ownership** and **"can I edit it myself,
and what exactly can I change?"** — with the observation that *"'Yes, with training' and 'yes, anything'
are different answers."* We have a shipped in-browser editor, so we can answer the harder version of
that question in position 1. Table-stakes claims (mobile-responsive, fast, SEO-friendly) are barred
from the lead slot: a buyer is shocked by their absence, not impressed by their presence.

**Reorder note (Part 2 considered, partly declined):** Part 2 proposed leading with *"we prove the form
works from a real phone before we launch, and we report enquiries — not visits."* I agree it is a
strong, checkable, unglamorous promise. **It has no ledger row** — it is a launch protocol, not a
capability — so it cannot ship as a card under Hard Rule 6. Its insight is folded into card 2's body,
which now says where the enquiry lands. The full version is in the unsourced list with a
recommendation.

---

**1. Change Your Own Words Without Calling Us**
*Body:* Edit the text on your own site from an admin screen — no developer, no waiting, no invoice for
a sentence.
*Ledger row + tier:* Pillar 4 — "In-browser web page editor (client edits their own copy)",
**SHIPPED** — `admin/src/App.tsx:507` `<Route path="/page-details" element={<PageDetails />} />`,
`admin/src/pages/PageDetails.tsx`, `page-editor.css`. BUILDABLE P4 row 1 adds
`scripts/gen-page-document-seed.mjs`, `scripts/check-page-document.mjs`.
*Claim check:* **"we have built"** — SHIPPED. Part 2's sharpening — that the differentiator is *the
specificity of the list of what you can change*, not the promise — is a documentation deliverable with
no ledger row; see the unsourced list.

**2. A Form That Goes Into the System, Not an Inbox**
*Body:* Forms write straight into the system your business runs on, landing on a record with somebody's
name against it — instead of an email notification a person has to type back in.
*Ledger row + tier:* Pillar 4 — "Form builder with a seeded field catalogue", **SHIPPED** —
`admin/src/App.tsx:506` `<Route path="/forms" element={<FormsEditor />} />`,
`scripts/gen-form-fields-seed.mjs`, over the same database the admin reads.
*Claim check:* **"we have built"** — SHIPPED. Body strengthened in revision 2 to name where the enquiry
lands, which is the half Part 2 identified as the real answer to *"people visit and nothing happens."*

**3. One Address for the Site and the Software Behind It**
*Body:* Your public site and the system your team logs into live at one address — one domain, one
login, and a link that does not exist says so plainly instead of showing a page that pretends.
*Ledger row + tier:* Pillar 4 — "Hash-routed SPA served as Worker static assets alongside a JSON API on
one origin", **SHIPPED** — `marcommand-main/wrangler.jsonc` `"assets": {"directory": "./dist"}`, with
the reasoning at ~lines 245-261. BUILDABLE P4 row 3.
*Claim check:* **"we have built"** — SHIPPED. The honest version of the owner's *"sites wired into their
systems."* "Returns a real 404" was translated out.

**4. Documents That Print Exactly Right, Every Time**
*Body:* Invoices, statements and certificates come out on a fixed page, so the footer does not slide
onto page two when the description runs long.
*Ledger row + tier:* Pillar 4 — "Public-facing invoice/document rendering to print-exact PDF",
**SHIPPED** — `renderer/render.py` + `renderer/template.html`, already producing monthly invoices.
*Claim check:* **"we have built"** — SHIPPED.

**5. Your Links Keep Working When the Domain Moves**
*Body:* Every link and image in the emails your system sends is built from one set of addresses, so
changing your domain does not blank the logo in somebody's inbox.
*Ledger row + tier:* Pillar 4 — "Public marketing site + admin on custom domains, Cloudflare-hosted",
**SHIPPED** — `functions/_api/origins.ts resolveOrigins()` is the single reader of `PUBLIC_ORIGIN` /
`ADMIN_ORIGIN` / `ASSET_ORIGIN` (`wrangler.toml:56-60`), pinned by `origins.test.ts` precisely because
a typo there breaks images in a real person's mail.
*Claim check:* **"we have built"** — SHIPPED.

**6. Publish a Page, Tell the Search Engines the Same Minute**
*Body:* New and changed pages are submitted for indexing the moment they go up, instead of waiting to
be found.
*Ledger row + tier:* Pillar 5 — "IndexNow submission — the one real platform write in the product",
**SHIPPED** — `src/connectors/indexnow/adapter.ts` (359 lines),
`DECISIONS/0002-indexnow-submission-is-a-platform-write.md`. BUILDABLE P5 row 2: firing it from a
content change is wiring.
*Claim check:* **"we have built"** the submission adapter (SHIPPED); **"we build"** the publish-time
trigger. Cross-pillar borrow, declared: the row sits under Pillar 5 in the ledger but the deliverable
is a website build item, and the owner listed AI/search readiness under Websites.

**7. Take Orders and Payments on Your Own Site**
*Body:* People buy from you on your own site, the payment goes through, and the order lands as a record
your team can actually work from — with the receipt coming out the same way your invoices do.
*Ledger row + tier:* **BUILDABLE. No single ledger row — this is an adjacency argument across five
SHIPPED rows**, recorded here the way the ledger records its own BUILDABLE arguments:
- Taking the money: Pillar 1 — "Books / ledger, reconciliation, Plaid link, **Stripe pay**, tax rate
  table", **SHIPPED** — `agent/stripe_pay.py`.
- The thing the customer fills in writing into the real system: Pillar 4 — form builder, **SHIPPED** —
  `admin/src/App.tsx:506`, `scripts/gen-form-fields-seed.mjs`.
- Orders as records staff can work, with roles: Pillar 1 — multi-screen admin over a live database,
  **SHIPPED** — `admin/src/App.tsx:383-517`, 25+ routes behind `<AuthGuard />`.
- The receipt: Pillar 4 — print-exact document rendering, **SHIPPED** — `renderer/render.py` +
  `renderer/template.html`, already producing monthly invoices.
- Storefront and application on one address: Pillar 4, **SHIPPED** — `wrangler.jsonc`
  `"assets": {"directory": "./dist"}`.
*Claim check:* **"we build" ONLY.** Nothing here is a record of having shipped a store.
**Two limits, and the first one is not optional.**
**(a) Stock and inventory are deliberately outside this card.** The ledger considered **inventory** and
**cut it** — *"Four candidates were considered and cut for having no adjacency argument: voice/phone
handling, e-signature, payroll, and inventory. Nothing in any of the three repositories is a short step
to them, and inventing an argument is the exact failure this ledger exists to prevent."* I am not going
to reinstate by the back door a capability the ledger cut by name. The body says orders and payments and
stops there. **Do not let this card grow a stock-level, low-stock-alert or warehouse claim.**
**(b) There is no `/services/e-commerce` route on the site today** — verified against
`src/app/services/`, which has 25 service directories and no commerce, shop, store or cart among them.
This card is a new capability claim with no existing service page behind it, unlike card 8.
*Honest read:* the adjacency is real but it is the thinnest in this spec — selling online is
catalogue + cart + checkout + orders, and of those we can argue payment, orders and receipts from
shipped code while catalogue and cart are genuinely new. I am stating it rather than smoothing it. It
clears the BUILDABLE bar; it would not clear a SHIPPED one, and nothing on the page should suggest it does.

**8. See Where People Give Up — and Fix That Step**
*Body:* We watch the path from landing on your site to getting in touch, find the step where people
quit, change that one step, and then watch again.
*Ledger row + tier:* **BUILDABLE. An adjacency argument across three SHIPPED rows plus a live
commitment we already make**, and this one is strong because the loop closes:
- *Watch:* Pillar 5 — "First-party site analytics: own snippet, own sessionizer, **own funnel**",
  **SHIPPED** — `src/snippet/`, `src/sessionizer/` (Durable Object), `src/collector/`.
- *Change the step:* Pillar 4 — in-browser page editor, **SHIPPED** — `admin/src/App.tsx:507` — so the
  fix does not need a developer or a deploy.
- *Where they get in touch:* Pillar 4 — form builder writing into the backing system, **SHIPPED**.
- *Already sold:* the route `src/app/services/conversion-optimization/page.tsx` exists (**verified by
  me, not quoted from the ledger**), and its data file
  `src/data/aeo/services/conversion-optimization.ts` already commits in production to *"Funnel
  analysis: identify where traffic is leaking out of the conversion path."*
*Claim check:* **"we build" ONLY.**
**On the word "psychology" — I left it off the card, deliberately.** The owner's raw list says
"psychology lead funnel." His *meaning* — designing the path so people actually convert rather than
just arrive — is fully preserved in the body. But "psychology" on a card face is a claim to
behavioural-science expertise, and I have no evidence base for it in either research report or the
ledger; what I can evidence is measure → change → measure, which is what the body says. **If the owner
wants the word, that is his call and it is a one-word edit — but it would be the only claim on the page
resting on nothing.** Measurement is a claim we can keep; a psychology claim is one a buyer can ask us
to prove.

### The Google tension, and how this pillar handles it
The owner's raw list includes *"maximum SEO, AEO and GEO."* Google Search Central, updated 2026-07-10,
says verbatim: *"From Google Search's perspective, optimizing for generative AI search is optimizing
for the search experience, and thus still SEO,"* mythbusts `llms.txt` and special markup, and tells
buyers to *"review our guidance on evaluating third-party SEO advice"* before hiring an AEO/GEO vendor.
No consensus definition distinguishes GEO from AEO from AIO; Forrester's Nikhil Lai calls the terms
*"significantly, but not fundamentally, different from SEO."*

**Decision:** Websites carries no acronym card and no schema/structured-data card. The owner's meaning
— *build it so search and AI answers can both use it* — is delivered by cards 3 and 6, which are
concrete and shipped. The acronym question is answered head-on in Pillar 5 card 7, where quoting Google
*against* our own category is a credibility move rather than a dodge.

### Owner list items handled elsewhere
- **E-commerce** and **"psychology lead funnel"** were dropped in revision 2 for want of a ledger row.
  **Restored in revision 3 as cards 7 and 8**, written BUILDABLE with their adjacency arguments stated,
  on the owner's widened brief: *"even if I haven't done it yet, it can still be a capability inventory
  item."* The BUILDABLE tier requires an adjacency argument, not a `file:line`, and both have one — but
  see the honest read on card 7, whose adjacency is the thinnest in this spec.
- **"Granular tracking down to where a visitor dropped off."** Sourced, but the row is Pillar 5's
  first-party analytics stack, so it is delivered as Pillar 5 card 6 rather than duplicated here.
- **"Custom web applications."** Sourced (Pillar 1 "Multi-screen admin SPA over a live D1 database",
  SHIPPED), but as a Websites card it restates Pillar 1 and reads like a category, not a deliverable.
  Deliberately not written.

---

# PILLAR 5 — SEO AI Visibility Ad Management.

Renamed from `Search, AI, and Ads.` (:576). The owner: *"we really need to come up with those things
that are going to set us apart on this one."* Eight SHIPPED rows, two NOT BUILT — and the NOT BUILT one
is the AI-visibility measurement everybody wants. That shapes the claim phrasing more than anything
else on the page.

**Barred from this pillar:** the "84% of AI citations come from earned media" figure (UNVERIFIED —
dropped, not softened) and the "38% of AI-cited sources rank in Google's top 10" figure (UNVERIFIED and
in direct tension with Google's own position).

### Why the lead card changed — and this one contradicts my dispatch

The dispatch named **"cited vs. absorbed"** as the lead card candidate. **I moved it to card 2** and led
with the prompt-set audit instead. Three reasons, and the owner should overrule me in one line if he
disagrees:

1. **Both research reports independently rank the prompt-set audit first.** Part 1's ordered
   differentiator shortlist puts it at #1; Part 2 calls it *"the strongest card on the site, in my
   judgement."*
2. **The stated ordering rule points the same way.** Part 2 §C.3: *"Lead every pillar with the card
   that answers the buyer's loudest fear, not the one that describes the firm's best skill."*
   "My customers ask ChatGPT instead of Googling and I have no idea what it says about me" is the fear.
   Cited-vs-absorbed is our best technical insight — a skill.
3. **The lead card names competitors.** The output of a prompt-set audit is a document showing who
   appeared instead of you. That is emotionally hard to ignore in a way a measurement framework is not.

Cited-vs-absorbed loses nothing at position 2 — it stays the best-sourced differentiator on the page
(arXiv 2604.25707, 30 April 2026, 602 prompts, 21,143 citations) and it is what makes card 1 credible.

### The concentration you must see before approving this pillar
**Cards 1 and 2 both rest on a row with zero code today** — Pillar 5, "AI-search / AEO visibility
measurement", **NOT BUILT** (searched all 14 connector folders, all 15 migrations, `src/brief/signals.ts`).
So the pillar opens with two "we build" cards and the eight SHIPPED rows start at card 3. That is a
deliberate trade: the strongest-evidenced differentiators here are the ones we have not built, and the
things we have built are less differentiating. The alternative — leading with the ad-spend table
(SHIPPED) — is more defensible and less compelling. **This is a judgement the owner should make
knowingly, which is why it is written here rather than buried.**

---

**1. We Ask ChatGPT, Gemini and Perplexity About You — and Show You Their Answers**
*Body:* We put the real questions your customers ask to the assistants they actually use, then show you
every answer you are missing from — and who got named instead of you.
*Ledger row + tier:* Pillar 5 — "AI-search / AEO visibility measurement", **NOT BUILT** → BUILDABLE
P5 row 1. The adjacency argument is the ledger's: the connector interface is merged with **fourteen**
adapters written against it (`src/connectors/`, ~20,500 LOC), plus `scheduler.ts`, `syncHealth.ts` and a
shared fact table — a new source plugs into finished machinery.
*Claim check:* **"we build" ONLY.** The ledger's instruction is explicit — *"Say 'we build this', never
'we measure this today' — no code for it exists."* Naming the assistants is deliberate: Part 2 finds
"ChatGPT" is the opposite of jargon and that naming the products is simultaneously plainer and more
specific than "AI visibility optimization." The illustrative "~50 questions" is **not** on the card —
nobody has committed to a count. **This is the card most likely to be laundered into past tense by a
later editor. Put the warning in the code comment.**

**2. Being Listed and Being the Answer Are Two Different Things**
*Body:* Your page can be linked underneath an answer and still contribute nothing to what the assistant
actually said. Only one of those wins the customer, so we report them separately.
*Ledger row + tier:* Same row — Pillar 5, **NOT BUILT** → BUILDABLE P5 row 1. External evidence:
arXiv 2604.25707, 30 April 2026, Zhang Kai / He Xinyue / Yao Jingang — 602 prompts, 21,143 valid
citations, 23,745 feature records; citation *selection* and citation *absorption* are driven by
different factors. **[A]-sourced, four months old, no SMB competitor mentions it.**
*Claim check:* **"we build" ONLY**, same constraint as card 1. "Selection" and "absorption" are
translated out of the copy entirely — the plain version *is* the title.

**3. All Your Ad Spend in One Table — With the Mismatches Flagged**
*Body:* Google, Meta, Microsoft, LinkedIn, TikTok, Reddit, Pinterest and Nextdoor spend in one place,
each line marked with how it was counted, so nobody adds two numbers that mean different things.
*Ledger row + tier:* Pillar 5 — "Ad spend from 8 paid platforms, normalised, with attribution windows
stamped per row", **SHIPPED** — `src/connectors/meta/adapter.ts:33-41` records that Meta's default is
7-day click **plus** 1-day view while Google attributes to the click date and counts no view-throughs,
so *"adding a Meta conversion to a Google conversion produces a number that means nothing"* — and
stamps `native_attribution_window` on every row. BUILDABLE P5 row 3 for the client-facing report.
*Claim check:* **"we have built"** — SHIPPED, and the eight platform names are read from the ledger, not
assembled. The client-facing *report* over that table is **"we build"**; the body describes the table.
"Attribution window" was translated to "how it was counted." The refusal to fudge is the
differentiator, and it answers *"every platform reports a different number and I don't know which to
believe."*

**4. Every Morning, the Five Things Costing You Money**
*Body:* A ranked list waiting for you — money going out with nothing coming back, leads nobody
answered, a channel that quietly stopped reporting — plus a plain note about anything it could not see.
*Ledger row + tier:* Pillar 5 — "Daily ranked brief", **SHIPPED (deterministic)** —
`src/brief/brief.ts:36-39`, six signals: `untouchedLeads`, `slowResponse`, `brokenConnections`,
`failingConnections`, `nothingConnected`, `spendWithoutConversions`. Blind-spot reporting at
`brief.ts:15-20`, **SHIPPED**.
*Claim check:* **"we have built"** — SHIPPED. **Do not attach "AI" to this card in any form.** The
ledger is emphatic: "**No model involved**." It is six database checks, ranked. The honesty — the note
about what it could not see — is worth more than the AI label would be.

**5. Visitors Who Come From an AI Assistant Get Counted Separately**
*Body:* People who arrive from ChatGPT, Gemini or Perplexity are counted as their own group with their
own results, instead of being buried in "referral" or "direct" where you cannot see them.
*Ledger row + tier:* Pillar 5 — "First-party site analytics: own snippet, own sessionizer, own funnel",
**SHIPPED** (the measurement stack is ours, so how visitors are grouped is ours to define). The
AI-referrer split itself is **BUILDABLE** — no ledger row names it. External evidence: Adobe Digital
Insights Q1 2026 [A], >1 trillion US retail visits — AI-referred traffic converted 38% *worse* than
non-AI in March 2025 and 42% *better* in March 2026.
*Claim check:* **"we build"** — the split does not exist as code. **The Adobe numbers do not go on the
card.** The panel is US retail, not SMB services, and the research is explicit it must never read as
"your business will see this." If the owner wants the figure in body copy elsewhere, the only safe
framing is *"the direction of the market flipped inside twelve months, measured across a trillion
visits,"* dated. The vendor "4.4x–23x" multiples are rejected outright.

**6. Your Own Numbers, Not Somebody Else's Dashboard**
*Body:* Your own measurement running on your own site, so you can see where a visitor gave up — and you
keep it if you ever stop working with us.
*Ledger row + tier:* Pillar 5 — "First-party site analytics", **SHIPPED** — `src/snippet/` (size-budgeted
by `scripts/check-snippet-budget.mjs`), `src/sessionizer/` (Durable Object), `src/collector/` (queue +
rate limiter), retention enforced on the daily cron (`src/worker.ts:96`). BUILDABLE P5 row 5: installing
it on a client site is deployment.
*Claim check:* **"we have built"** the measurement stack — SHIPPED. **"We build"** / commercial promise
for "you keep it if you stop working with us" — that half is an ownership commitment, not code.
**Confirm with the owner that it is operationally true before shipping that clause.** Delivers the
owner's Websites item *"granular tracking down to where a visitor dropped off"* and answers the
agency-churn grievance about *"dashboards on agency tools that clients lose access to."*

**7. Google's Own Words on AEO and GEO**
*Body:* Google's July 2026 guidance says optimising for AI search is still just SEO, and that you do
not need special files or extra code added to your site for it. We agree, mostly. Here is the part that
genuinely is different — and what we do about it.
*Ledger row + tier:* **No ledger row, and it needs none — this card makes no delivery claim.** A
positioning statement sourced to Google Search Central,
`developers.google.com/search/docs/fundamentals/ai-optimization-guide`, last updated **2026-07-10** [A].
Verbatim: *"From Google Search's perspective, optimizing for generative AI search is optimizing for the
search experience, and thus still SEO."* Also verbatim: *"You don't need to create new machine readable
files, AI text files, markup, or Markdown to appear in Google Search"* and *"Structured data isn't
required for generative AI search, and there's no special schema.org markup you need to add."*
*Claim check:* Neither "we build" nor "we have built" — a stated position. The only first-person
commitment is *"here is the part that genuinely is different — and what we do about it,"* which promises
a document, not a capability. **That promise creates an obligation: the short list has to actually
exist somewhere on the site before this ships.** `llms.txt` and "schema markup" were kept out of the
card face per the plain-language pass; the verbatim quotes stay here for the FAQ. Every competitor
sells AEO and GEO as two premium products while Google publicly warns buyers about exactly that;
quoting Google against our own category is a credibility move no competitor will copy.

### Held back from Pillar 5, marked rather than dropped
> **Unverified:** *"Every month you see which channels your ad money actually went to and which
> searches it actually matched"* — Performance Max channel-level and search-term reporting. A genuine
> 2026-specific edge with a 12–18 month shelf life, answering the loudest agency complaint (*"monthly
> reports with metrics they can't tie to revenue"*). **Not confirmed against the implementation and not
> confirmed against Google.** The feature list (channel-level reporting, full search-term reporting,
> campaign-level negative keywords up to 10,000, asset-level reporting) comes only from PPC blogs; the
> research explicitly did not check it against Google's release notes. There is no Preisser ledger row
> for reading or reporting PMax data — the Google Ads adapter is read-only spend ingestion with an
> empty action list (`src/connectors/googleAds/adapter.ts:63`). **What would confirm it:** Google Ads
> release notes for the 2026 PMax update, plus a decision on whether we report from the Google Ads UI
> or from our own table. **DO NOT SHIP UNTIL BOTH ARE DONE.**

**Review replies — considered and rejected on our own code, not on the research.** Research Part 2
proposes *"Every review gets a reply within a day. Written for you, sent by you."* It rates its own
evidence **WEAK — [C] only, and self-contradictory** (one source gave both "54% of Google reviews
receive a business response" and "response rate rose to ~73%" on the same page), and the claim that
response rate feeds Google's local ranking is unconfirmed by Google. **Our ledger settles it
independently:** "AI-composed customer replies" is **NOT BUILT** — `src/responder/compose.ts:15-19`,
*"THERE IS NO COMPOSER REGISTERED IN THIS PHASE"* — and `src/responder/egressGate.ts` is a
build-failing scanner proving there is no path to an outbound send at all. A review-reply card would be
contradicted by our own build gate. **Not written.** Review *reading* is real (Google Business Profile
and Yelp ingestion, SHIPPED), but a monitoring card sitting next to a capability we deliberately
blocked invites the question, and it is close to table stakes anyway.

---

# COUNT LINE

**36 cards total** (P1 ×7, P2 ×7, P3 ×7, P4 ×8, P5 ×7).

- **28 cards** make a claim warranted by a **SHIPPED or PARTIAL** row and may use "we have built".
  (P1 ×7, P2 ×7, P3 ×5, P4 ×6, P5 ×3.)
- **7 cards** are warranted only by a **BUILDABLE** row and use "we build" exclusively:
  P3 #3, P3 #4, **P4 #7, P4 #8**, P5 #1, P5 #2, P5 #5. Two of those seven — the e-commerce and
  lead-funnel cards — carry **no single ledger row at all**; they are adjacency arguments assembled
  across several SHIPPED rows, stated in full in their claim checks. The funnel argument is strong
  because the measure-change-measure loop closes on shipped parts. **The e-commerce argument is the
  thinnest in this spec and its own claim check says so.**
- **1 card** (P5 #7) has **no ledger row and needs none** — it claims no delivery.
- **8 of the 28** additionally carry a "we build" half for something beyond what shipped, each called
  out in its own claim check: P1 #1, P1 #4, P2 #1, P2 #2, P2 #7, P3 #1, P3 #6, P4 #6, P5 #3, P5 #6.

**One card contains a half with no ledger row at all, and it is the lead card of Pillar 2.**
P2 #1's *"chase themselves"* — no dunning, reminder or aging row exists in the ledger. The adjacency
argument is **mine, not the ledger's**, and it is written out in full in that card's entry. Either
build the reminder step or use the alternative title supplied there. This is the single most important
line in the count.

**Cards I could not source, stated plainly rather than dropped:**
1. **Performance Max channel-level reporting** (P5) — written above, **marked UNVERIFIED, held from
   shipping.** No ledger row; external feature list never checked against Google.
2. **Review replies** (P5) — **rejected on our own code**, `compose.ts:15-19` NOT BUILT plus a
   build-failing egress gate. Not written.
3. **"We count how many times a week that retyping was happening"** (P2, Part 1 differentiator #1, and
   genuinely unmatchable because nobody can source the statistic) — a measurement commitment with no
   ledger row. Not written as a card. **Strong recommendation: put it in body copy.**
4. **The 30/90-day adoption checkpoint** (P1, Part 2's proposed lead) — a service commitment, no row.
   Not written. Recommend as body copy or a proposal term.
5. **"The domain, the hosting and the site are in your name from day one"** (P4) — the loudest website
   fear, and it costs nothing to promise **if it is true**. Not a code claim, so no row. **Ask the
   owner whether it is operationally true; if yes, it is the strongest addition available to Pillar 4.**
6. **"We prove the form works from a real phone before we launch"** (P4, Part 2's proposed lead) — a
   launch protocol, no row. Not written. Its insight is folded into P4 #2's body.
7. **A named list of what the client can edit, with a short walkthrough video** (P4) — documentation
   deliverable, no row. Not written; would strengthen P4 #1 materially.

**Scope note the implementer needs:** the self-named-card defect affects **three pillars, not five** —
`Business Software` at `:158`, `Business Automation` at `:254`, `AI Integration` at `:369`. `Websites.`
and `Search, AI, and Ads.` were **already clean**; their first tiles are `"Website Redesign"` (:486) and
`"Local SEO"` (:599). Those two pillars still get new card sets here, but for vagueness, not for Hard
Rule 1. Do not go looking for a self-named card in them.

**Pillar-name check:** verified mechanically. None of the 36 titles contains "Business Software",
"Business Automation", "AI Integration", "Websites", "SEO", "AI Visibility" or "Ad Management" as its
subject. P5 #7 contains "AEO and GEO", which are not the pillar's name. **Hard Rule 1 holds across all
five pillars.**

**Rejected-evidence check.** I first wrote "no card body contains a number" and then checked it, and
it is false: nine bodies contain one. All nine are descriptive quantities, none is a statistic, and
each is traceable — "fourteen outside platforms" (read from the ledger's connector count), "a four-word
covering note" (`docx.ts:5-8`), "two windows open", "fails at 2am", "two weeks later", "two years out
of date" and "twice" (the extraction incident, which the ledger forbids softening), "page two",
"two numbers that mean different things", and "July 2026" (the date of Google's guidance, which the
research says to date explicitly). **No card body contains a market statistic, a percentage, a dollar
figure or a performance claim.** That is the claim I can actually defend, and it is the one that
matters. The rejected clusters — "$126,000 lost to
missed calls", "62% of calls unanswered", "340% ROI", "2.3-month payback", "82% copy-paste",
"16+ hours a week on admin", "84% of AI citations from earned media", "38% of AI-cited sources rank
top 10", the "4.4x–23x" conversion multiples, and the review-management figures — appear nowhere except
in explicit rejection notes. The HBR speed-to-lead research (**2011**, and the related MIT/InsideSales
study is **2007**) is cited on no card; that cluster is recycled across 2026 blogs as current and using
it would be a real credibility risk.

---

# DISAGREEMENTS — left unresolved, not silently reconciled

**1. Roster export profile count — RESOLVED, recorded for the trail.** The dispatch said two profiles;
the ledger cites four at `admin/src/export/rosterWorkbook.ts:77` — `export type ExportProfile = 'share'
| 'working' | 'launch' | 'avery';` — flagging it as **"Correction: four, not two."** The team lead has
confirmed the ledger is right and the brief carried an error from an earlier recon pass. **P1 card 2 now
states four.** I still have not opened that file myself; the resolution rests on the ledger's citation
plus the lead's confirmation, not on my own read.

**2. Pillar 5 lead card: my dispatch vs. both research reports.** The dispatch named cited-vs-absorbed
as the lead candidate. Part 1's shortlist, Part 2's pain-first ordering, and Part 2's stated ordering
rule (§C.3, lead with the loudest fear rather than the best skill) all put the prompt-set audit first.
**I followed the research and demoted cited-vs-absorbed to card 2, and I am flagging it rather than
quietly doing it.** One-line swap to reverse.

**3. Pillar 2 lead card: the owner's seed vs. the evidence.** The owner named manual data entry as the
headline win. The best-sourced pain in either report is unpaid invoices (47%→59% overdue in one year).
I led with invoices and kept manual data entry at card 2 in the owner's own words. **This is his call
and a one-line swap.**

**4. "SEO, AEO and GEO" as three products vs. Google's published position.** The owner's raw list asks
for all three. Google (2026-07-10) says optimizing for generative AI search *is* SEO, mythbusts the
tactics the acronyms are usually sold with, and warns buyers about AEO/GEO vendors. This is a
**decision, not a fact I can correct** — it is the owner's positioning. The spec answers it by quoting
Google directly (P5 #7) rather than stacking acronyms or dropping his meaning. If he wants three
acronyms sold as three line items, that is his call to make and mine to flag.

**5. Pillar 5 title punctuation.** The four siblings are Title Case with a trailing period.
`SEO AI Visibility Ad Management` has no internal punctuation and reads as a run-on next to
`Search, AI, and Ads.` I added only the trailing period, because the words may not change and commas
would change them. Unresolved, left to the owner.

**6. Two service promises sit on top of shipped mechanisms and need the owner's confirmation, not a
developer's.** P2 #7 *"you hear it from us first"* — the ledger proves the failure is *recorded*, not
that anyone is *paged*. P5 #6 *"you keep it if you stop working with us"* — an ownership commitment, not
code. Both are honest only if someone confirms they are operationally true.

---

# APPENDIX — CARD TITLES ONLY
*(for the icon designer — nothing else needed)*

## Business Software.
1. Off the Spreadsheet, Into One System
2. Exports Shaped for Whoever Asked for Them
3. Badges, Tags & Labels Off the Live List
4. Who's Assigned Where — and the Schedule Prints Itself
5. The Books Are Ready Before Tax Season Is
6. Their Own Login — Revoked the Day They Leave
7. Personal Details That Delete Themselves on the Date You Set

## Business Automation.
1. Invoices Go Out on Their Own and Chase Themselves
2. Entered Once, Never Retyped
3. It Arrives as an Email and Files Itself
4. Approve It by Replying "Yes" From Your Phone
5. Two Lists That Should Agree, Checked Every Morning
6. The Things It Will Never Do Without You
7. If Something Breaks, You Hear It From Us First

## AI Integration.
1. It Asks You Before Anything That Matters
2. Ask Your Business a Question in Plain English
3. It Reads the Document, Then Checks Every Number Against It
4. When It Doesn't Know, It Says So
5. One Client's Question Can Never Reach Another Client's Records
6. You See What the AI Costs, Per Question
7. Let It Read What Strangers Send You — Without Letting Them Give It Orders

## Websites.
1. Change Your Own Words Without Calling Us
2. A Form That Goes Into the System, Not an Inbox
3. One Address for the Site and the Software Behind It
4. Documents That Print Exactly Right, Every Time
5. Your Links Keep Working When the Domain Moves
6. Publish a Page, Tell the Search Engines the Same Minute
7. Take Orders and Payments on Your Own Site
8. See Where People Give Up — and Fix That Step

## SEO AI Visibility Ad Management.
1. We Ask ChatGPT, Gemini and Perplexity About You — and Show You Their Answers
2. Being Listed and Being the Answer Are Two Different Things
3. All Your Ad Spend in One Table — With the Mismatches Flagged
4. Every Morning, the Five Things Costing You Money
5. Visitors Who Come From an AI Assistant Get Counted Separately
6. Your Own Numbers, Not Somebody Else's Dashboard
7. Google's Own Words on AEO and GEO

*(Longest titles are P5 #1 and P3 #5. If the layout needs a cap: "We Ask ChatGPT, Gemini and Perplexity
About You" and "One Client's Data Can Never Reach Another's" — both survive the trim without changing
the claim.)*
