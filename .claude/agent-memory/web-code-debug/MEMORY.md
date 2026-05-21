# Preisser Solutions — Web Debug Memory

## Theme System (CRITICAL)

The theme system uses `data-theme="dark"|"light"` on `<html>`. Only CSS custom properties
prefixed `--theme-*` flip per theme. Hardcoded Tailwind utilities like `bg-[#0A1628]` or
`text-[#475569]` are COMPILED INTO LITERALS — they NEVER adapt.

### Canonical themeable tokens (defined in `src/styles/globals.css` lines 67–128)
- `--theme-section-switchable` — primary page background that swaps dark↔light
- `--theme-section-alt` — alternating section background (one level off primary)
- `--theme-bg-primary`, `--theme-bg-secondary`, `--theme-bg-surface`
- `--theme-text-primary`, `--theme-text-secondary`, `--theme-text-muted`
- `--theme-card-bg`, `--theme-card-border`
- `--theme-result-card-bg`, `--theme-result-card-border` (more opaque card)
- `--theme-nav-bg`, `--theme-nav-shadow`, `--theme-border`

### Tokens that DO NOT EXIST (do not invent)
- `--theme-dark`, `--theme-text-on-dark`, `--theme-primary` — these were referenced in
  `src/app/page.tsx` from a prior fix attempt and SILENTLY fell through to nothing.
- `--ps-color-*` family — used in `src/app/not-found.tsx` but never defined.

### Brand accents that are intentionally static (NOT theme-aware)
- `#0D95E8` (brand primary), `#80E9FF` (cyan), `#00D4AA` (green), `#0B7BC0` (primary hover)
- These belong in gradient stops, decorative blurred halos, icon strokes, and CTA buttons.
- They look correct on both themes by design.

## Patterns that broke theming and how to fix

1. **Tailwind arbitrary color utilities** (`bg-[#...]`, `text-[#...]`, `border-[#...]`)
   compile into static literals. To theme: use inline `style={{ background: 'var(--theme-...)'}}`.
   Components fixed under this banner: `CaseStudiesHub.tsx`, `CaseStudyPage.tsx`,
   `LocationsHub.tsx`, `LocationPage.tsx`, `not-found.tsx`.

2. **Non-theme CSS variables in inline styles** (`var(--color-dark, #0A1628)`)
   reference static tokens that point at dark navy regardless of theme. Replace with
   `var(--theme-section-switchable)` (or the appropriate token).
   Components fixed: `AeoPage.tsx`, `site-map/page.tsx`.

3. **AEO typography classes** in `globals.css` (`.aeo-h1`, `.aeo-h2`, `.aeo-body-p`, etc.)
   were locked to `--color-text-light-primary` (#0A1628) and `--color-text-dark-secondary`.
   Now reference `--theme-text-primary`/`--theme-text-secondary` so they flip.

4. **InternalLinkBlock cards** (`.ps-link-block__item` in `globals.css` line 8411):
   default `--theme-card-bg` was `rgba(255,255,255,0.03)` — too transparent to see in dark.
   Now uses explicit `rgba(255,255,255,0.05)` + light-mode override `#FFFFFF` so cards
   stand out clearly on both themes.

## Build / Verify

- `npm run build` from project root. Static export → `out/`. 191 pages expected.
- Quick audit query after edits:
  `grep -rnE 'bg-\[#[0-9A-Fa-f]{3,6}\]|text-\[#[0-9A-Fa-f]{3,6}\]|--color-dark|--color-light' src/components/ src/app/`
- Acceptable remaining hex literals: `#0D95E8`, `#80E9FF`, `#00D4AA`, `#0B7BC0`
  (brand gradient stops/hovers/icons). Anything else on a surface/text/border is a bug.

## Files / surfaces NOT to touch

- `src/components/home/service-pillars.tsx` — `CARD_GRADIENTS` array of branded gradient
  visuals. Theme-agnostic by design.
- `src/components/home/case-studies.tsx` — homepage case-study card gradient backgrounds.
  Each case study has a custom branded gradient; cards intentionally don't flip.
- `.ps-bento-card__content` (globals.css line 1429) — has explicit `[data-theme="light"]`
  override (line 924) with `#E8EDF3` background. Bento cards are theme-aware via the
  override pattern, not via tokens.
- MarCommand dashboard mockup classes (`.mc3-*`) — branded UI mockup with full light-mode
  override set near line 5876.
