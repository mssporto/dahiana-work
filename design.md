# design.md — dahiana.work

Living design-system reference. This file and `src/styles/tokens.css` must always match — update both together, in the same change, whenever a design decision changes. This file has no code; it exists so any future session (human or LLM) can pick up the visual language without re-deriving it.

## Direction

Minimal, text-first, cream. Restraint comes from **one font, one accent color** — not from confining expressiveness to a single spot. Hierarchy is built from scale/weight/opacity contrast on the single typeface, used throughout every section (Hero, About, Work, Services, footer). There are two deliberate "flashy" objects in the system: a glossy, dimensionally-rendered 3D waving hand in the hero (successor to the old wave-emoji treatment) and a matching 3D envelope in the footer contact CTA — both idle-animated only, no scroll triggers. A third, functionally-motivated idle animation exists on the nav's live-status dot (see Motion) — it's a status indicator, not a decorative "flashy" object, so it's tracked separately from the two-object rule above.

## Color

| Token | Value | Role | Notes |
|---|---|---|---|
| `color-surface-base` | `#f1efea` | Page background | Cream — replaces the old near-black page background. Never pure `#FFFFFF`. |
| `color-surface-footer` | `#0a0a08` | Footer band background | The old near-black page background, reused as a dedicated dark closing band, not the whole page. Never pure `#000000`. |
| `color-text-primary` | `#131410` | Body/heading text on the cream body | ~16:1 contrast on `#f1efea` — excellent. |
| `color-text-muted` | `#4b4b47` | De-emphasized supporting copy (About body, Work row descriptions, nav readout) | ~7.7:1 on `#f1efea` — pinned to a real color, not `opacity` on `color-text-primary`, so contrast can't silently drift if the base palette changes. |
| `color-text-on-footer` | `#ffffff` | Body/heading text on the dark footer | Pure white as text is fine; the rule is about fills, not glyphs. |
| `color-text-accent` | `#f63d18` | Accent — fills and large type only | Hot orange-red. See usage rule below. |
| `color-status-live` | `#1a7a4c` | Nav live-status dot only | Muted technical green — signals "available," distinct from the orange accent so status and interactive/brand-accent meanings never collide. ~4.6:1 on `#f1efea`. |

**Accent usage rule:** `#f63d18` computes to ~3.3:1 against the cream body — passes AA for large text (≥24px) and non-text UI, fails AA for small text. Accent is therefore used **only** as: a fill (buttons, the footer contact CTA on hover, hover-fill on nav links) with near-black or white text on top, or as large display type ≥24px enforced by an explicit `font-size` floor, not left to a paragraph's own responsive clamp (the About section's `.accent-highlight` inherited its parent paragraph's clamp and dipped to ~19.75px at narrow viewports — still technically WCAG-compliant at that size, but under this file's own ≥24px bar; it now sets its own `clamp(1.5rem, 1vw + 1.3rem, 1.75rem)` floor). Never as small text or inline links sitting directly on the cream. Small inline links on cream use `color-text-primary` instead. The nav's live-status dot uses `color-status-live`, not the accent — status color and brand-accent color are kept semantically separate.

Contrast check (WCAG AA):
- `#131410` on `#f1efea` → ~16:1 ✅ (body text)
- `#ffffff` on `#0a0a08` → ~19.5:1 ✅ (footer body text)
- `#f63d18` on `#f1efea` → ~3.3:1 — fails small-text AA, passes large-text/non-text AA (3:1). Fills/large-type only.
- `#1a7a4c` on `#f1efea` → ~4.6:1 ✅ (status dot, non-text UI)
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
| `space-16` | `8rem` (128px) |

No ad-hoc pixel values outside this scale.

## Breakpoints

Mobile-first. Test at minimum: `375px`, `768px`, `1024px`, `1440px`.

## Box model

Global `box-sizing: border-box` reset (`*`, `*::before`, `*::after`, set in `BaseLayout`) — required for the `2.75rem` tap-target convention below to actually measure `2.75rem`. Without it, an anchor with `min-height: 2.75rem` plus its own padding/border renders taller than 44px (verified: nav pills/lang-switch rendered 62px before this reset). `<button>` elements are unaffected either way — browsers default them to `border-box` already.

## Grid system

A visible but restrained hairline grid: thin, low-contrast lines barely darker than the cream (never a strong/dark outline color), with small crosshair tick marks at a few deliberate intersections — not every one. It's a signature texture, not wallpaper. Applies to the cream body sections; the dark footer band does not carry the grid.

## Buttons & nav

- Default button language: sharp-cornered rectangle (no border-radius, or max 2–4px), mono-spaced label text, thin border. Orange fill (`color-text-accent`) reserved for primary/hover state, with near-black text on top when filled.
- Persistent nav bar, sharp/mono button style for its links. Nav links are anchor-scrolls to sections (About, Work, Services, Contact), not separate routes.
- Nav link and language-switch hover is a directional wipe-fill (`scaleX` from an edge, not an opacity fade) — see Motion.
- The footer contact CTA uses the standard interactive-element treatment (underline, hover/focus/active states), same as links elsewhere — no sticker/collage treatment anywhere in the system.
- Footer contact row also has a small copy-to-clipboard icon button next to the email link: no border/background of its own (icon-only, matching text color), glyph is two overlapping outlined squares (a literal "copy" pictogram), swaps to a checkmark for ~1.8s after a successful copy. Sized smaller than the standard 2.75rem tap target on purpose — it's a secondary convenience action next to the primary mailto link, not a primary control. Sits at `space-1` (8px) from the email link — tight enough to read as "belonging to" the email, not a third, unrelated row item.
- Footer vertical padding is fluid — `clamp(space-12, 14vw, space-16)` — so the closing band gets proportionally more breathing room on wide viewports instead of staying pinned to a fixed 96px regardless of screen size. The `cta-text` and `email-link` sizes scale up with it (`clamp()`, larger max than before) so the closing statement and CTA read as a deliberate finale, not an afterthought.
- Every section heading (`.section-heading`) is capped to the same 42rem content column even when its section's outer container is wider (e.g. Work's carousel needs a 64rem-wide stage, but its heading is centered within a 42rem box) — this keeps every heading's left edge aligned across Hero/About/Work/Services regardless of each section's own max-width.
- Work carousel dots are `2.75rem` (44px) tap targets — unlike the footer copy button, dots are the *primary* way to jump between projects on touch, so they get the standard target size even though the visible glyph (the `::after` square) stays small.
- Work carousel cards are real links (they navigate to the live project URL) but only when already active — clicking/activating an inactive card brings it to the front instead. Each card's `aria-label` reflects this dynamically ("… — select to bring to front" vs "… — opens in a new tab"), and a visually-hidden instruction paragraph (`aria-describedby` on the carousel group) spells out the pattern for assistive tech. Keep both in sync if the interaction model ever changes.

## Mono live-data readout

- Content: Madrid local time (`Europe/Madrid`), Madrid coordinates (`40.417 N, 3.704 W`), and a manually-maintained status line ("available for new projects" / Spanish equivalent).
- Time is computed client-side from the real clock — never a static string baked in at build time.
- The status line is a plain string in `content.ts`, maintained by hand — no booking/CRM integration drives it.
- Placement: true-centered in the nav bar via absolute positioning (`left: 50%; transform: translate(-50%, -50%)`) inside the `position: sticky` nav — a flex `space-between` layout alone would center it relative to the *gap* between the nav links and language switch, not the bar itself, and those two groups aren't equal width. Hidden below `900px` (raised from `768px` to give the centered readout room before it would otherwise collide with the flex items on either side).
- The status dot is a live-status indicator: solid `color-status-live` dot plus a looping "radar ping" ring (`::before`, `scale` 1→2.6 with `opacity` 0.6→0, `transform`/`opacity` only) — see Motion's third idle-animation exception.

## Motion

- Animate only `transform` and `opacity`. Never `transition-all`.
- Respect `prefers-reduced-motion: reduce`.
- Minimal/functional only: hover/focus states use `translateY` and opacity shifts, same as before. Idle (continuously-looping) animation is capped at three elements, each with a distinct reason to run forever: the glossy 3D hand (successor to the old wave-emoji keyframe), the footer's 3D envelope, and the nav's live-status dot ping (a real status indicator, not decoration — see Mono live-data readout). No other element gets an idle animation; this cap is deliberate, not a placeholder to be raised opportunistically.
- **One additional exception**: a one-time, per-block scroll-reveal — each section's heading/paragraph/list-item blocks fade and rise (`opacity` 0→1, `translateY(12px)`→`0`) as the section enters the viewport, staggered ~70ms per sibling. Fires once per element and never re-hides on scroll-up. No parallax, no cursor-follow, and no *repeating* or *looping* scroll effects — those remain banned.
- **One more exception**: interactive elements across the site (nav links/language switch, the Work carousel, the footer email CTA and its copy button) may combine `transform` sub-properties (rotate + scale + translate together) with `opacity` — and, for hover-fill wipes, `transform: scaleX` on a pseudo-element in place of an opacity fade — in direct response to hover, click, or keyboard input. Still `transform`/`opacity` only, still never `transition-all`. `prefers-reduced-motion` collapses the response to instant, non-animated state changes (or a plain background-color swap where a fill communicates the state). This is scoped to interaction-driven response only — not a license for new idle or scroll-triggered motion.
- Concrete interaction-driven examples now in the system: nav/language-switch hover-fill wipes; the Work carousel's diagonal light sheen sweeping the active card on hover, its snappier ease-out-expo card easing, and its prev/next buttons' press-squash feedback; the footer copy button's icon-swap (copy glyph ↔ checkmark, `scale/opacity` cross-fade) on successful copy.

## Depth

Base → elevated → floating. No more than these three levels; don't let every surface sit on the same z-plane.

## Content & provenance

- Source copy: `dahiana-website-text.html` — Dahiana's own authored bio/portfolio text (WordPress/Elementor export), rights owned, intended to be public.
- Structure: Hero (greeting + 3D hand only) → About (bio, moved out of Hero) → Services (text-row list with tag chips) → Work (a fan-stacked carousel of real project screenshots, each tile framed in a lightweight browser-chrome bar) → Footer (dark band, absorbs Contact).
- Languages: English (default, `/`) is source-of-truth; Spanish (`/es/`) is a Claude-drafted translation, human-reviewed before publish.

## Open / deferred

- No blog/CMS in scope — if one is added later, revisit the markdown-sanitizer section of `astro-website.md` before wiring in any markdown-rendered content.
