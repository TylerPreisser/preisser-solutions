# Preisser Solutions Proposal System

This folder is the control center for creating custom proposal pages inside the existing `preissersolutions.com` repo.

It is not a separate app. It is not a separate project. It is a prompt-and-component kit for Codex or Claude Code.

## How To Use

1. Open Codex or Claude Code in this repo.
2. Open `docs/proposal-system/MASTER_PROMPT.md`.
3. Fill out the intake block at the bottom of that prompt.
4. Paste the whole thing into the coding agent.
5. The agent should read the existing site, use the component recipes in this folder, create one proposal page at `/proposals/[company-slug]-[random]`, and report the URL.

## Files

- `MASTER_PROMPT.md`: The full command prompt. This is the thing you paste.
- `TRIGGER_PROMPT.md`: Short version to paste when the agent can read this repo.
- `INTAKE.md`: Blank intake form for sales-call notes.
- `COMPONENT_RECIPES.md`: Proposal section/component options the coding agent should use.
- `PRICING_AND_ROI.md`: Locked pricing, add-ons, ROI math, and proof points.
- `QUALITY_BAR.md`: The checklist every generated proposal must pass.

## Principle

The proposal page must feel like Preisser Solutions built it, because it lives inside Preisser Solutions. The agent should reuse the existing site rhythm, CSS vocabulary, layout patterns, animations, buttons, cards, and tone. The files here only tell it what to build and what content to use.
