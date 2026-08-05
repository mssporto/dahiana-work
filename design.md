# design.md — dahiana.work

Living design-system reference. This file and `src/styles/tokens.css` must always match — update both together, in the same change, whenever a design decision changes. This file has no code; it exists so any future session (human or LLM) can pick up the visual language without re-deriving it.

## Direction

Minimal, text-first, cream. Restraint comes from **one font, one accent color** — not from confining expressiveness to a single spot. Hierarchy is built from scale/weight/opacity contrast on the single typeface, used throughout every section (Hero, About, Work, Services, footer). The one deliberate "flashy" object in the system is a glossy, dimensionally-rendered 3D waving hand in the hero (successor to the old wave-emoji treatment) — idle-animated only, no scroll triggers.

## Color

| Token | Value | Role | Notes |
|---|---|---|---|
| `color-surface-base` | `#f1efea` | Page background | Cream — replaces the old near-black page background. Never pure `#FFFFFF`. |
| `color-surface-footer` | `#0a0a08` | Footer band background | The old near-black page background, reused as a dedicated dark closing band, not the whole page. Never pure `#000000`. |
| `color-text-primary` | `#131410` | Body/heading text on the cream body | ~16:1 contrast on `#f1efea` — excellent. |
| `color-text-muted` | `#4b4b47` | De-emphasized supporting copy (About body, Work row descriptions, nav readout) | ~7.7:1 on `#f1efea` — pinned to a real color, not `opacity` on `color-text-primary`, so contrast can't silently drift if the base palette changes. |
| `color-text-on-footer` | `#ffffff` | Body/heading text on the dark footer | Pure white as text is fine; the rule is about fills, not glyphs. |
| `color-text-accent` | `#f63d18` | Accent — fills and large type only | Hot orange-red. See usage rule below. |

**Accent usage rule:** `#f63d18` computes to ~3.3:1 against the cream body — passes AA for large text (≥24px) and non-text UI, fails AA for small text. Accent is therefore used **only** as: a fill (buttons, the footer sticker CTA, the mono-readout status dot) with near-black or white text on top, or as large display type. Never as small text or inline links sitting directly on the cream. Small inline links on cream use `color-text-primary` instead.

Contrast check (WCAG AA):
- `#131410` on `#f1efea` → ~16:1 ✅ (body text)
- `#ffffff` on `#0a0a08` → ~19.5:1 ✅ (footer body text)
- `#f63d18` on `#f1efea` → ~3.3:1 — fails small-text AA, passes large-text/non-text AA (3:1). Fills/large-type only.
- `#131410` on `#f63d18` (accent fill + near-black text) → check at build time and confirm ≥4.5:1 before shipping any filled button.

## Typography

- **One font for the entire site**: [Archivo](https://github.com/Omnibus-Type/Archivo) (SIL OFL, variable — weight axis 100–900), self-hosted at `public/fonts/archivo-variable.woff2`, wired via `@font-face` in `tokens.css`. Used for display and body both — the old "never the same font twice" rule is retired.
- No serif anywhere. No system-sans fallback role — Archivo carries every size from hero display down to meta text, with the system sans stack as the `@font-face` load fallback only.
- Hierarchy principle (replaces the old "one flashy moment"): contrast is built from **scale, weight, and opacity** on the single typeface, applied consistently across Hero, About, Work, Services, and the footer — not confined to one spot.
- Headline tracking: `letter-spacing: -0.03em`.
- Body line-height: `1.6`–`1.7`.
- Type scale uses `clamp()` for responsive sizing, e.g.:
  - Hero: `clamp(2.5rem, 6vw + 1rem, 5.5rem)`
  - Section heading: `clamp(1.5rem, 2vw + 1rem, 2.25rem)`
  - Body: `1rem` (fixed — body text should not fluidly scale)
  - Meta/mono-readout: `0.875rem`

## Spacing

8pt grid. All spacing tokens are multiples of `0.5rem` (8px at a 16px root):

| Token | Value |
|---|---|
| `space-1` | `0.5rem` (8px) |
| `space-2` | `1rem` (16px) |
| `space-3` | `1.5rem` (24px) |
| `space-4` | `2rem` (32px) |
| `space-6` | `3rem` (48px) |
| `space-8` | `4rem` (64px) |
| `space-12` | `6rem` (96px) |

No ad-hoc pixel values outside this scale.

## Breakpoints

Mobile-first. Test at minimum: `375px`, `768px`, `1024px`, `1440px`.

## Grid system

A visible but restrained hairline grid: thin, low-contrast lines barely darker than the cream (never a strong/dark outline color), with small crosshair tick marks at a few deliberate intersections — not every one. It's a signature texture, not wallpaper. Applies to the cream body sections; the dark footer band does not carry the grid.

## Buttons & nav

- Default button language: sharp-cornered rectangle (no border-radius, or max 2–4px), mono-spaced label text, thin border. Orange fill (`color-text-accent`) reserved for primary/hover state, with near-black text on top when filled.
- Persistent nav bar, sharp/mono button style for its links. Nav links are anchor-scrolls to sections (About, Work, Services, Contact), not separate routes.
- **Exception — the footer contact CTA**: the one sticker/peeling-corner badge in the whole system. No other scattered sticker/collage ephemera anywhere. Don't apply the sharp/mono button treatment to this one element, and don't apply the sticker treatment anywhere else.

## Mono live-data readout

- Content: Madrid local time (`Europe/Madrid`), Madrid coordinates (`40.417 N, 3.704 W`), and a manually-maintained status line ("available for new projects" / Spanish equivalent).
- Time is computed client-side from the real clock — never a static string baked in at build time.
- The status line is a plain string in `content.ts`, maintained by hand — no booking/CRM integration drives it.
- Placement: near the nav/header by default (adjustable — the only non-hard-locked placement call in the system).

## Motion

- Animate only `transform` and `opacity`. Never `transition-all`.
- Respect `prefers-reduced-motion: reduce`.
- Minimal/functional only: hover/focus states use `translateY` and opacity shifts, same as before. The one exception is the glossy 3D hand's idle animation (successor to the old wave-emoji keyframe) — that is the only animated element beyond standard hover/focus. No scroll-triggered reveals, no parallax, no cursor-follow effects.

## Depth

Base → elevated → floating. No more than these three levels; don't let every surface sit on the same z-plane.

## Content & provenance

- Source copy: `dahiana-website-text.html` — Dahiana's own authored bio/portfolio text (WordPress/Elementor export), rights owned, intended to be public.
- Structure: Hero (greeting + 3D hand only) → About (bio, moved out of Hero) → Work (text-row list, no cards/images) → Services (text-row list) → Footer (dark band, absorbs Contact).
- Languages: English (default, `/`) is source-of-truth; Spanish (`/es/`) is a Claude-drafted translation, human-reviewed before publish.

## Open / deferred

- No blog/CMS in scope — if one is added later, revisit the markdown-sanitizer section of `astro-website.md` before wiring in any markdown-rendered content.
- No brand photography exists yet — the Work section is text-only rows for this reason, not a placeholder state to be "fixed" later by adding cards.
