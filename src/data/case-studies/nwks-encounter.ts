import type { CaseStudyData } from "@/types/case-study";

// NWKS Encounter — the retreat website and the administration system behind it.
// Live at nwksencounter.com (a single self-contained HTML document on Cloudflare
// Pages) with a Hono API, a React admin panel, D1, KV and R2 behind it.
//
// THIS ROUTE WAS A 301 UNTIL 2026-09-18. It was pulled on 2026-08-03 with C3
// Studio under "not finished and should not be presented as delivered". That is
// no longer true and the redirect is gone from public/_redirects: the ministry's
// own domain went live in the 2026-08-19 cutover and both Encounters now run
// their registration and administration on it.
//
// NAMING: approved by Tyler on 2026-09-18 (docs/CANONICAL-PROJECTS.md). The
// ministry is nameable. The people in it are NOT. Never publish an attendee,
// volunteer, leader or admin name, never a count read out of the live database,
// and never link or screenshot the admin panel — it is the ministry's own login,
// and the site's Contacts sections publish real phone numbers and emails by
// design. This repo is PUBLIC.
//
// SOURCE OF CLAIMS. Every sentence traces to one of four places:
//   1. A file:line-cited fact sheet read off the PRODUCTION branch
//      (origin/feature/team-email-lookout-shape). `main` is 243 commits behind
//      it and understates the system; do not re-source anything from `main`.
//   2. A second fact sheet on the public site, whose source is identical across
//      main, the production branch and release/sunday-launch.
//   3. The ministry's own recorded working session of 2026-08-19, transcribed
//      with timestamps into the repo's demo-debrief brief. The before-state
//      quotes below are theirs, not ours.
//   4. Direct measurement of the LIVE artifact at nwksencounter.com on
//      2026-09-18 — 732,053 bytes, zero external scripts, zero external
//      stylesheets, both icons as data: URIs, and all four registration and
//      waitlist endpoints present in the served bytes.
//
// DO NOT CLAIM, each one checked and rejected:
//   - Any hours-saved figure. NO MEASURED TIME SAVING EXISTS on either branch;
//     a grep for every hour-shaped string across functions, admin, db, docs,
//     scripts, cron and shared returns only TTLs and timestamps. The outcome is
//     written as work eliminated, never as hours claimed.
//   - Any dollar figure. The repo holds three (a volunteer's own valuation of
//     her badge-typing time, the old and new hosting cost, and a rejected
//     print-on-demand quote). ALL are barred by the site's no-pricing rule.
//   - A "50/50 placed, 0 trade violations" proving run. It appears NOWHERE in
//     version control on any branch; its only source is a handoff document
//     outside the repo naming a different repo and branch. Unverifiable.
//   - Payment processing. Giving is a link-out; no card details reach the
//     system and there is no PCI scope. The reconciliation screen is real, the
//     processing is not.
//   - An "Audit screen". The eight backward checks ship as an ENDPOINT; the tab
//     was removed at the owner's request. Say the system checks its own sheet.
//   - Weekend arrival check-in. What shipped is POST-ENCOUNTER check-in. Not
//     the same thing.
//   - "Operator-switchable transition concepts" or "ambient particle
//     backgrounds". Both ship in the public bundle as unreachable dead code.
//   - An admin session length (security.ts and auth.ts disagree), or Duo as a
//     shipped second factor (the code exists, the secrets do not).
export const caseStudy: CaseStudyData = {
  slug: "nwks-encounter",
  metaTitle: "NWKS Encounter: Registration to Roster",
  metaDescription:
    "Two retreat weekends a year on one system: registration that opens on schedule, a waitlist instead of a closed door, and the rosters the weekend runs on.",
  datePublished: "2026-09-18",
  dateModified: "2026-09-18",

  category: "Business Software • Registration and Administration",
  clientName: "NWKS Encounter",
  clientNameDisplay: "NWKS Encounter",
  industry: "Ministry: retreat registration and administration",

  h1: "NWKS Encounter: Nobody Retypes Anything",
  subheadline:
    "A ministry's whole year of busy work, mapped into one custom-built administration panel: registration, cabins, volunteer teams, the weekend schedule and the printed rosters, with AI across the back office.",
  oneLine:
    "Executive visibility into the ministry, and 90% of the busy work automated",

  liveLink: {
    label: "See it live at nwksencounter.com",
    href: "https://nwksencounter.com",
  },

  headlineResults: [
    { value: "720 pieces", label: "Of printed paper per Encounter, hand-typed on the last night before" },
    { value: "684 placements", label: "Across 14 Encounters, 2015 to 2026, the history the engine measures" },
    { value: "Every 1 to 2 days", label: "One person hand-emailed every new sign-up; the system sends it now" },
    { value: "127 rules", label: "The database itself enforces, keeping the two ministries apart" },
  ],

  // OWNER-SUPPLIED FRAMING, 2026-09-18, same as the homepage card. He dictated
  // the substance and rejected the previous version; this is his emphasis, not
  // a summary of the body below. The 90% is his figure about his own
  // engagement. See the note on `description` in components/home/case-studies.
  hub: {
    problem:
      "Northwest Kansas Encounter is a ministry in Northwest Kansas, running two retreat weekends a year on volunteer time. The leadership's year was spent on busy work: registrations taken on a borrowed form, a room plan rebuilt from scratch every cycle, the weekend's teams and its printed paper retyped by hand, and launch details emailed to every new sign-up one person at a time.",
    built:
      "Preisser Solutions mapped their business processes, use cases and busy work into one seamless, custom-built administration panel, with artificial intelligence integrations across the back office. Registration, cabins, volunteer teams, the weekend schedule, email and the printed rosters all run from the same place, on one system where the men's and women's data cannot cross.",
    outcome: "Executive visibility into the ministry, and 90% of the busy work automated",
  },

  before: {
    heading: "Everything after the form was somebody retyping it.",
    body: [
      "Northwest Kansas Encounter puts on two retreat weekends a year, one for men and one for women, staffed by volunteers. Sign-ups ran on a WordPress site pointed at Google Forms, which turned away anyone without a Google account, and the women's server places filled within the first five minutes, so the overflow was retyped into a spreadsheet by hand. The women's Encounter could not sign a volunteer up online at all: its form existed as a disabled stub the site never referenced. A weekend that filled stopped taking people, and the waitlist was worked by telephone, where by the time somebody was called a lot of them had already made other plans.",
      "Behind the form, the same work was done again and again by hand. Room assignments were, in the ministry's own words, one hundred percent manual: a spreadsheet rebuilt from scratch every cycle, grouped by who had invited whom and then by town, with three people touching it. The volunteer team sheet was a static workbook re-typed each cycle, down to roughly forty-nine server names hand-keyed into a spare column so somebody had something to drag from. Launch-point details were personally emailed to everyone who had signed up, every one to two days, by one person in each program. The recurring letters had gone out for a decade from Word documents on somebody's laptop.",
      "It ended on the last night with the paper the weekend physically runs on. One volunteer sat and hand-typed 720 printed pieces for 144 people, 288 name cards and 432 stickers, putting the logo in by hand, and then did the luggage tags. And the ministry raised the real risk itself, unprompted, before anyone asked: they had no security at all on a system collecting a lot of names and phone numbers.",
    ],
  },

  built: {
    heading: "One system, and a tiebreak the whole build was judged against.",
    body: [
      "The design rule this engagement was decided by is written into its own documents and quoted back across four of them: the design that means nobody retypes anything wins. Every part of what follows is an instance of it.",
      "The public side is one page. Registration opens at an instant the ministry sets in advance and flips on its own with no network call at that moment, because an Encounter fills and the ministry announces a time. Before the announced minute there is no form at all, not a disabled one and not a notice. After it, the same form quietly re-points at a waitlist when the weekend is full, so a person who arrives late joins a queue with their details already captured. When a seat is released the next person is emailed an offer with a day to take it, and the seat is held by an unresolved outcome rather than by a clock, claimed by a compare-and-swap so two people cannot accept the same bed. Viewing the offer changes nothing and only a deliberate action accepts it, so an email scanner opening the link on somebody's behalf cannot take a seat for them.",
      "The cabins are drafted rather than arranged. A weighted planner works the whole board against seven ranked objectives, the two heaviest being that a town's men are not placed on a side with none of that town's servers, and that a man lands in the same cabin as the server who invited him. It is tuned to produce a defensible first draft of roughly 144 bed assignments, so two volunteers can correct it by hand in an evening and hand the result to the printer with nobody retyping a name. A bed set by hand is locked and a rerun never moves it. The weighting itself was argued down once, from a level where one rule had stopped being a weight and had become a hard constraint wearing a number, and the test that pins the order of those objectives caught the first replacement value for being a different instruction rather than a gentler one.",
      "The weekend's volunteer teams are drafted from the ministry's own history: 684 team placements across fourteen Encounters between 2015 and 2026, plus twenty of their schedule workbooks, turned into eleven measured rules. Nothing in it is a preference somebody typed in, and deliberately no rule names a team, so the women's Encounter is entitled to a different answer to the same question out of its own sheets. The most useful thing it does is refuse: handed a programme it has no history for, it declines to draft at all and says so, on the reasoning that with no past sheets there is nothing on offer but a guess with a confident interface. Once a sheet exists the system also reads it backwards, running eight checks against a decade of practice, including the one nobody could do by eye: spotting that a man who has captained the same team for years has been quietly re-registered under a misspelling of his own surname and placed among the first-timers. That check is deliberately built to share no code with the engine that drafts, so it can catch that engine's own drift.",
      "Then the paper, which is where the retyping actually ended. Three print jobs and four workbook profiles produce the badges, luggage tags and rosters, all written from scratch with no dependencies and drawn at absolute coordinates into a PDF rather than handed to a browser's print dialog, because a correctly registered sheet of label stock should not depend on somebody setting margins, scale and headers right in whatever browser they are in front of at midnight the night before the Encounter. The cheapest win shipped before the generator even existed: an export shaped exactly the way the label importer expects, which retired the hand-typing outright. And nothing is blocked by one unresolved person, because the tags that can be made get made and the person who could not be placed is named on an exception page instead. The paper reports its own gap.",
      "The security answer is the one the ministry asked for. Passwords are scrypt, sessions are opaque and server-held, there are three roles on a default-deny allowlist so a route added next month is refused to reviewers until someone opens it on purpose, and every administrative action is written to an audit trail where a refusal is logged rather than quietly returning an empty list. Most of all the two ministries cannot reach each other's records. That is enforced by the database itself, 127 triggers of which 113 are that separation, because the leak that actually happened did not come through a route: an import script wrote straight to the database and put eighteen men's registrations under an invented women's event, where they surfaced in the women's administrators' panel. A route can be forgotten and a trigger cannot, and a standing test now fails the build if a new table is added without one.",
    ],
  },

  specifications: {
    heading: "What the ministry can do now that it could not before.",
    bullets: [
      "Registration opens at an announced instant and flips on its own, with no network call at the moment it opens",
      "A full or closed weekend collects a waitlist on the same form, instead of turning people away to be telephoned later",
      "Both Encounters can sign up volunteers online; the women's Encounter previously had no path at all",
      "Nobody needs a Google account to register",
      "A released seat is offered to the next person automatically, with a day to accept before it moves on",
      "Cabins are drafted by a weighted planner against seven ranked objectives, and a bed set by hand is never moved",
      "Volunteer teams are drafted from the ministry's own eleven years of sheets, and the draft refuses rather than guesses",
      "The finished sheet is checked backwards against a decade of practice, including duplicate people under misspelled names",
      "Badges, luggage tags and rosters print from the system onto named label stock, with no name retyped",
      "Launch-point details and the ministry's decade of recurring letters send from templates instead of a laptop",
      "Post-encounter check-in runs from a QR code per town, so one sheet of paper does not have to hang in eight places at once",
      "Men's and women's records cannot cross, enforced in the database rather than in the code that talks to it",
    ],
    subsections: [
      {
        title: "The public site",
        items: [
          "The entire site is one self-contained document: every stylesheet, every script and every image inlined",
          "Measured live on 2026-09-18 at 732,053 bytes with zero external stylesheets and zero external scripts",
          "The build refuses to emit a file that is not self-contained, and fails on any surviving external reference",
          "Four registration forms across the two Encounters and the two roles, each with its own waitlist destination",
          "The office edits its own questions and page copy without a developer, but cannot retarget a weekend's sign-ups",
          "A phone number is never reformatted into a different number: a value that cannot be prettified without dropping a character is left exactly as typed",
        ],
      },
      {
        title: "How it refuses",
        items: [
          "Handed a programme it has no history for, the team draft declines to build one and says why",
          "Unattended mail is redirected to one inbox, with its real recipient named in the subject, until somebody deliberately turns it live",
          "Second-factor enforcement is on unless one exact string turns it off; a misspelling leaves it on",
          "Reviewer access is an allowlist, so a route added next month is refused until someone opens it on purpose",
          "A shared sign-up link lands every claim in a pending queue for a human, rather than granting anything itself",
          "An account that has done work is retired rather than deleted, because its rows are somebody's byline",
          "A bulk offer pass is bounded, and a pass that stopped early says so rather than swallowing it",
        ],
      },
    ],
  },

  results: [
    {
      value: "720 pieces",
      label: "Of printed paper per Encounter, for 144 people",
      context:
        "288 name cards and 432 stickers were hand-typed by one volunteer on the last night, logo included, and then again for the luggage tags. They now print from records nobody has retyped, and an unplaceable person is named on an exception page rather than stopping the run.",
    },
    {
      value: "684 placements",
      label: "Across 14 Encounters, 2015 to 2026",
      context:
        "The ministry's own history, turned into eleven measured rules that draft the weekend's volunteer teams. No rule names a team, so each Encounter gets the answer its own sheets support, and with no history at all the engine refuses to draft rather than guess.",
    },
    {
      value: "Every 1 to 2 days",
      label: "One person hand-emailed every new sign-up",
      context:
        "Launch-point details were personally sent by one volunteer in each program, because the old system held a launch point's name and nowhere to put the address, the departure time or the coordinator's phone number the email is made of.",
    },
    {
      value: "127 rules",
      label: "Enforced by the database itself",
      context:
        "113 of them keep the men's and women's records apart, after an import script wrote eighteen men's registrations under an invented women's event. A route can be forgotten and a trigger cannot, and a standing test now fails if a new table arrives without one.",
    },
  ],

  techStack: [
    "Cloudflare Pages",
    "Cloudflare Workers",
    "Hono",
    "D1",
    "Cloudflare KV",
    "Cloudflare R2",
    "React",
    "Vite",
    "TypeScript",
    "WebAuthn passkeys",
    "Playwright",
  ],

  relatedSlugs: ["iron-and-oak-podcast", "chicago-bus-operator", "hg-oil-inventory-system"],

  cta: {
    heading: "Is somebody on your team retyping the same list every cycle?",
    subcopy:
      "Preisser Solutions builds the system the office actually runs on, including the paper that comes out of it. Scoping begins with a conversation about how the work is done today.",
    buttonLabel: "Start a scoping conversation",
    buttonHref: "/contact",
  },
};
