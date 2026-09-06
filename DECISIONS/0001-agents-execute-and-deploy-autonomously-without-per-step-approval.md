# ADR-0001: Agents execute this overhaul and deploy it live without per-step approval
Status: Accepted — 2026-09-03 (conversation) — Owner: Tyler Preisser
Supersedes / Superseded by: —

## Context
- Before this decision, the working pattern on this repo was: recon → present findings → ask the
  owner to resolve open questions → implement. During intake for the mobile/MarCommand overhaul the
  assistant surfaced ten open decisions and told the owner it would batch them for his answer.
- The owner rejected that pattern outright, 2026-09-03, quoted: *"stop asking for my permission on
  everything you are supposed to do all of this on your own and bypass permissions and automomously
  achieve all of this to perfection and then once its all perfect get everything live on main
  domains"*.
- This is consistent with the standing preference already recorded outside the repo
  (memory `deploy-live-by-default`, 2026-08-30: *"Always just run Wrangler deploy and deploy it live
  for my view."*).
- The repo's own gate `.claude/hooks/block-live-deploy.sh` blocks `wrangler pages deploy` and
  documents its own release valve: *"OVERRIDE (the owner's explicit say-so): env ALLOW_DEPLOY=1"*.

## Decision
1. For this overhaul, agents make the ordinary craft judgment calls themselves — copy, layout,
   motion timing, component boundaries, token choice, breakpoint strategy — and do not return to the
   owner to choose between reasonable alternatives. Where a choice is genuinely the owner's, the
   agent picks the defensible default, ships it, and names the choice in the handoff.
2. Production deploy is pre-authorized for this body of work. `ALLOW_DEPLOY=1` prefixed on
   `npx wrangler pages deploy out --project-name preisser-solutions` is the sanctioned invocation,
   not a bypass — it is the override the hook documents, exercised on the owner's explicit say-so
   recorded above. The full validation gate in CLAUDE.md ("Validate") still runs first, every time.
3. NOT allowed, and this ADR does not authorize it: publishing a client's identity that the codebase
   currently anonymizes, shipping an outbound link that does not resolve, deleting an indexed route,
   or force-pushing a trunk. Those are not craft judgment calls; see ADR-0002.
4. The one exception: if the validation gate fails and the fix is not obvious, the agent stops and
   reports rather than deploying a red build or weakening the gate to get past it.

## Consequences
- Implementers: proceed without approval checkpoints. Report what was decided, not what to decide.
- Review agents must NOT flag "did not confirm with the owner first" as a defect on this work, and
  must not flag the `ALLOW_DEPLOY=1` prefix as a policy violation.
- Cost accepted: the owner sees the result rather than the options. Reversal is by git revert plus a
  redeploy, which for a static export is cheap.

## Open / not yet decided
- The scope of this autonomy beyond the mobile/MarCommand overhaul. The owner's instruction was given
  in that context; it is recorded as covering that body of work, not as a permanent standing grant
  over every future repo action.

## Status note for review agents
While `Accepted`, this decision is BINDING: code that conforms to it is CONFORMANT, not defective —
do not flag it, do not "fix" it, do not recommend re-adding what it removed. Objections go under
"Decision Concerns" citing this ADR number — never as a bug or a blocking finding.

## Revisit criteria
- The owner asks to be consulted on a class of change again, or a deploy made under this ADR causes
  a production regression that a checkpoint would have caught.

## Sources
- Owner instruction, conversation, 2026-09-03 (quoted verbatim above).
- Memory slug `deploy-live-by-default`, 2026-08-30.
- `.claude/hooks/block-live-deploy.sh` — the override contract it documents.
