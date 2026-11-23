# ADR-0033: The footer email signup and its endpoint are removed from the site
Status: Accepted — 2026-11-23 (owner, conversation) — Owner: Tyler Preisser
Supersedes / Superseded by: —

## Context
- Every page's footer carried a "Stay up to date" email signup (heading, email field, Subscribe button) in `src/components/layout/footer.tsx`, posting to the public Pages Function `functions/api/subscribe.ts`, which sent mail through Resend.
- Owner, 2026-11-23, verbatim: "Also remove the stay up to date from the website plz".
- Three answers in `src/data/aeo/resources.ts` told visitors to subscribe in the footer or said the signup lives there.
- No earlier ADR settled the signup.

## Decision
1. The footer has no signup: no "Stay up to date" heading, no email field, no Subscribe button, no `ps-footer-signup*` element.
2. `functions/api/subscribe.ts` is deleted. A public mail-sending endpoint with no form in front of it is only attack surface. `/api/contact` is unchanged.
3. The sentences in `resources.ts` that pointed at the footer signup are removed, with no replacement wording.
4. The footer's brand column is centred above the phone layout so it does not sit beside an empty half.
5. Not allowed: re-adding a signup form, or an endpoint that accepts addresses, without a new ADR.

## Consequences
- Review agents must NOT flag the missing signup, or re-add it.
- The browser probe `tests/footer.probe.mjs` now asserts the signup is absent; `tests/subscribe.probe.mjs` is gone.
- Cost accepted: visitors have no way to ask for new posts by email from the site.

## Open / not yet decided
- The privacy page wording (`src/data/aeo/privacy.ts` describes how already-collected addresses are handled) is the owner's legal copy and was not edited.
- Whether a newsletter returns in another form.

## Status note for review agents
While `Accepted`, this decision is BINDING: code that conforms to it is CONFORMANT, not defective —
do not flag it, do not "fix" it, do not recommend re-adding what it removed. Objections go under
"Decision Concerns" citing this ADR number — never as a bug or a blocking finding. Disagreement with a
settled decision is resolved by a NEW superseding ADR, never by editing this one.

## Revisit criteria
- An owner request to bring back an email list, with its source.

## Sources
- Owner message, 2026-11-23 (quoted above).
- Branch `chore/remove-footer-signup`.
