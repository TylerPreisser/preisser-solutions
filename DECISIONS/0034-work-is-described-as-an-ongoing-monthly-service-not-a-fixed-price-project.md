# ADR-0034: Work is described as an ongoing monthly service, not a fixed-price project
Status: Accepted — 2026-11-23 (owner, conversation) — Owner: Tyler Preisser
Supersedes / Superseded by: —

## Context
- The site described every engagement as a fixed-price project: a fixed-price proposal, a one-time build, deposit and milestone payments, 30 days of support and then an optional retainer. An inventory on 2026-11-23 counted 1,102 such statements across about 150 pages. The contact page's "Common questions" answered "How does pricing work?" with "We share a fixed-price proposal ... total cost all stated up front."
- Owner, 2026-11-23, verbatim: "Under common questions it could say something more like we aren’t a 10million dollar Salesforce contract type of deal and we pride ourselves in the age of ai bringing McKinsey type (idk if should use that word) grade intelligence and or consulting technical consulting integrations and ai infrastructure or whatever for a price that makes it make sense for your business obviously we do everything on a monthly basis and ongoing yk and not a fixed fee sow upfront or something because every solution is a service from me and requires ongoing maintenance and etc and most smaller businesses can’t afford to front the entire build upfront kind of a thing"

## Decision
1. The site describes the work as an ongoing monthly service. The monthly price covers the build and the ongoing maintenance, support and improvement of what was built.
2. The reason given is the owner's: every solution needs ongoing maintenance, and most smaller businesses cannot afford to front an entire build.
3. The process stays a free scoping call and then a written proposal, which states the scope and the monthly price before the client commits.
4. The contact page's "How does pricing work?" answer says so, in the wording drafted from the owner's message.
5. The name "McKinsey" is left out of the copy (the owner was unsure of it); the copy says "a top consulting firm".
6. Not allowed without a new ADR: describing Preisser Solutions' own pricing as fixed-price, fixed-fee, one-time, deposit and milestone based, or hourly; stating a dollar figure, a contract length, a cancellation policy, or a setup fee (or the absence of one) that the owner has not supplied.

## Consequences
- Review agents must NOT flag the monthly-service wording, or restore fixed-price wording.
- Pages that already quoted a flat monthly price keep their numbers.
- Cost accepted: multi-year cost comparisons that were built on a one-time build price no longer have a basis and are left as they were until the owner rules on them.

## Open / not yet decided
- Ownership: the site still says the client owns the code, in many places. Whether that promise stands under the monthly service is the owner's to rule on; those sentences were left untouched.
- The Terms page (`src/data/aeo/terms.ts`) still describes deposits, a 50/50 schedule and IP transferring on full payment. It is legal copy and was not edited.
- Cost tables and payback claims that rest on a one-time build price, how a standalone paid audit is billed, and what a named client paid.
- Monthly amounts, minimum terms and cancellation are not stated by this ADR.

## Status note for review agents
While `Accepted`, this decision is BINDING: code that conforms to it is CONFORMANT, not defective —
do not flag it, do not "fix" it, do not recommend re-adding what it removed. Objections go under
"Decision Concerns" citing this ADR number — never as a bug or a blocking finding. Disagreement with a
settled decision is resolved by a NEW superseding ADR, never by editing this one.

## Revisit criteria
- The owner rules on ownership or the Terms page, or supplies monthly prices or terms to publish.

## Sources
- Owner message, 2026-11-23 (quoted above).
- Branches `chore/remove-footer-signup` and `content/monthly-service-pricing`.
