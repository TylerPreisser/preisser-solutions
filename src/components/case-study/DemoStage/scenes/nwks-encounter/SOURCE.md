# NWKS Encounter Proof Stage — sources and transforms (Lane NW)

Production source read at `nwks-deploy-main` commit `6802623` (detached, never checked out),
via `git -C "<nwks-deploy-main>" show 6802623:<path>`. Screenshots referenced below are at
`admin-guide-2026-09/shots/` (synthetic seed data; looked at for shape only, never copied).

## Tabs shipped, and why (ADR-0017 §1)

All six candidates ship, verified routed AND navigable at `6802623`:

| Tab | Route | Nav |
|---|---|---|
| Dashboard | `App.tsx:452` | `Nav.tsx:51` |
| Attendees | `App.tsx:453` | `Nav.tsx:54` |
| Org Sheet | `App.tsx:505` | `Nav.tsx:95` |
| Cabins | `App.tsx:504` | `Nav.tsx:92` |
| Email | `App.tsx:490` | `Nav.tsx:75` |
| Lookout AI | `App.tsx:494` | `Nav.tsx:65` |

No tab dropped. Lookout AI ships with **no "before" card**: `nwks-encounter.ts`'s `before`/`built`
copy has no pre-existing pain point for this specific feature, and its DO-NOT-CLAIM list
(`:34-55`) bars an hours-saved framing for it (spec-NW.md §2.6, "unresolved question 1" — resolved
by omission, which the `DemoTab.before?` contract already allows).

## Files read (shapes only, never data)

- `admin/src/theme.ts:36-70`, `shared/print/programBrand.ts:35-55` — men's colour tokens, already
  lifted into `skins.css`'s `.demo-skin--nwks-mens` by Lane F; this lane adds `--nw-*` extensions in
  `nwks-admin.css`, re-scoped from:
- `admin/src/pages/orgsheet/teamBoard.css`, `orgsheet.css` (`--org-*` vars, `.org-lane`/`.org-card`
  shapes) — every var renamed `--nw-*`, every selector re-scoped under `.demo-skin--nwks-mens .nwks-*`.
  No selector reuses a real class name from the product.
- `admin/tailwind.config.ts` — confirmed the men's/women's palettes are per-program; not used
  directly (Tailwind utilities are not transplanted here; the stage uses plain scoped CSS).
- `admin/src/pages/{DashboardPage,RosterPage,RoomsPage,Email,Ask}.tsx`,
  `admin/src/pages/rooms/legend.tsx`, `admin/src/components/email/emailTokens.ts` — anatomy only
  (headings, controls, field groups); no literal JSX or data copied. Component structure summarized
  in `~/.claude/agent-reports/ps-showcase-initiative/spec-NW.md` §2, itself cited to file:line.
- Lookout AI has **no screenshot** in the shots folder (`SHOT-LIST.md:84` calls for one; absent).
  Its anatomy is source-only (`Ask.tsx`, `ask/LookoutThread.tsx` header comments).

## Simplifications, stated (spec-NW.md §3, §Unresolved)

- **Cabins**: one cabin, two sides of 10 beds, vs. the real 6-cabin/144-bed board. Stated for phone
  legibility; not a claim about camp capacity.
- **Org Sheet duplicate-name catch**: told as the system checking its own sheet (a narrated card),
  never an audit tab or screen — the real audit endpoint exists but its UI was removed at the
  owner's request (`nwks-encounter.ts:48-49`).
- **No figure from `NWKS-Org-Engine-Handoff.md`** anywhere in this lane's code. The org-sheet
  placement rules (F1, F8, F10, F9) are stated qualitatively, reusing the concept strip's
  already-calibrated wording (`strip-nwks/fixture.js`, `strip-nwks/NOTES.md` revision 3).
- **No count from the live database.** Every number the screens draw (`src/data/demos/nwks-encounter.ts`)
  is a `.length`/`.filter().length` of the invented roster and attendee arrays, asserted by
  module-level invariants that fail `next build` if the story stops matching the data.
- **Email**: no real domain, no raster logo (`theme.ts` `logoSrc` was never imported here). The
  invented sender is `office@campmail.example`; the send action is stubbed (local state only, no
  network call — the stage's own scene has no server to send through in any case).
- **Attendees inner segmented control** (Registered/Wait List/Dropped) is a client-side React
  widget; without JavaScript only the Registered view renders (the page's default view). This is a
  narrower no-JS guarantee than the kit's own tab-stacking contract, which the six OUTER tabs still
  meet in full (every tab's content is in the server HTML, stacked, per `TabbedScreen`'s no-JS rule).

## Privacy

- The 48-man roster is **reused verbatim** from the approved concept strip (revision 3), already
  grepped 0/155 whole-word matches against `NWKS-Org-Engine-Handoff.md`.
- The 12 attendees, and the misspelled/aliased duplicate pairing, are all newly invented this lane.
  No WebSearch tool was available in this session, so the 12 new names were first checked only by
  hand: against every server surname (no collision), every entry in the private deny list at
  `~/.config/preisser/demo-denylist.txt` (no collision with any real NWKS staff name it carries —
  that file is not reproduced here, by design: this scene's own `test:privacy` source-scan checks
  this very file tree against that list, so quoting a denied name here to explain it is unused would
  itself be the leak), and the eight real Kansas launch points named in production screenshots (none
  of the six invented towns matches any of them; one of the eight is itself a deny-list entry, so it
  is likewise not reproduced here).
  **The team lead ran the web check 2026-09-28** ("<full name> Kansas" per person): eleven cleared
  as invented — Grant Ashwell, Miles Cordero, Grant Petracek, Owen Bratcher, Silas Kanaly, Perry
  Wooldridge, Denny Aldous, Hollis Vantrease, Emmett Sorenson, Barrett Lindeman, Corwin Haskell.
  **One originally invented attendee surname turned out to be a real person in Wichita, Kansas**
  (not reproduced here, by the same rule as above) and has been replaced everywhere in this lane
  with **"Nolan Ferrick"** (checked, no match; the registry id is now `att-nolan-ferrick`). All
  twelve now carry the team lead's checked marker in `src/data/demos/invented/nwks-encounter.ts`.
- The six launch towns (Aldervale, Kestrel Bend, Tollerton, Emberton, Fallowfield, Birchwood
  Corners) were already web-checked and cleared by the team lead 2026-09-28 (spec-NW.md §3); reused
  here unchanged.
- No emoji, no dollar amount, no admin-domain string, no logo asset anywhere in this lane's files.
