# Section reorder, scroll-reveal stagger, hero/about highlights, service tool tags

Date: 2026-08-05
Status: Approved, not yet implemented

## Context

Four related visual/content changes to dahiana.work, requested together:

1. Swap the order of the Services and Work sections.
2. Add a scroll-triggered staggered text reveal — this directly conflicts with `design.md`'s Motion section, which currently states twice: "No scroll-triggered reveals, no parallax, no cursor-follow effects." That rule was deliberate (the site already spends its "motion budget" on the hero hand and footer envelope idle animations) and needs to be explicitly amended, not silently violated.
3. Highlight key phrases in the About section with the accent color, and update the About copy.
4. Add tool/technology tags to each Services line, styled as sharp-cornered chips (not the rounded pills from the reference screenshot that prompted this), using SEO-relevant keyword phrasing rather than literal tool names alone.

## 1. Section reorder

`src/pages/index.astro` and `src/pages/es/index.astro`: swap `<Work>` and `<Services>` component order. New page flow: Hero → About → Services → Work → Footer. No prop or data changes — this is a pure JSX reorder.

## 2. Scroll-reveal stagger

**design.md amendment** (Motion section): add one explicit exception alongside the existing hero-hand/footer-envelope idle-animation exceptions — a one-time, per-block fade-and-rise as each block enters the viewport (`opacity` 0→1, `translateY(12px)` → `translateY(0)`), staggered ~60–80ms per sibling. Never re-triggers once shown (no re-hide on scroll-up). All other scroll effects (parallax, cursor-follow, repeated/looping scroll animation) remain banned.

**Scope**: About, Services, Work, and Footer sections. Hero is excluded (already visible on initial page load, nothing to "reveal").

**Mechanism**:
- One shared `IntersectionObserver`, registered in a bundled `<script>` in `BaseLayout.astro` (auto-hashed by Astro's CSP, no `unsafe-inline`).
- Any element with `data-reveal` is observed; on first intersection (threshold ~0.15) it gets an `.is-visible` class and is unobserved (one-shot, not repeated).
- Each direct reveal-able child (heading, paragraph, list item) inside a `data-reveal` container gets a `.reveal-item` class. Default state: `opacity: 0; transform: translateY(12px);`. `[data-reveal].is-visible .reveal-item` resets to `opacity: 1; transform: translateY(0);` with `transition-delay` staggered via CSS `:nth-child` selectors (fixed increments, no per-item JS math).

**Degradation**:
- `prefers-reduced-motion: reduce`: `.reveal-item` renders fully visible immediately, no transition, regardless of `.is-visible` state.
- `<noscript>`: a global style forces `.reveal-item { opacity: 1 !important; transform: none !important; }`, since the JS observer never runs without JS — matches the project's existing no-JS fallback pattern (used for the nav's live time readout).

**Components touched**: `About.astro`, `Work.astro`, `Services.astro`, `Footer.astro` — each needs `data-reveal` on its section root and `reveal-item` on its direct content blocks. `BaseLayout.astro` gets the new bundled script and base CSS for `.reveal-item`/`[data-reveal]`.

## 3. About section: highlights + copy edit

**Data shape change** — `content.ts`'s `about: string[]` becomes `about: { text: string; highlight: string }[]`, where `highlight` is the exact substring of `text` to wrap in an accent-colored `<span>`. `About.astro` splits `text` on `highlight` at render time (exact string match, not regex — each highlight phrase appears exactly once per paragraph, so this is safe).

**Content**:
- EN paragraph 1 (unchanged text, now highlighted in full): "I'm a low-code and AI builder." — highlight: `"I'm a low-code and AI builder."`
- EN paragraph 2 (copy edit: "using low-code tools" → "using Low-Code, AI and Automation", highlighted): "So for the past four years, I've been developing products using Low-Code, AI and Automation, while also diving into design and doing some teaching along the way." — highlight: `"Low-Code, AI and Automation"`
- ES paragraph 1 (unchanged, highlighted in full): "Soy constructora low-code y de IA." — highlight: full sentence.
- ES paragraph 2 (copy edit + highlight, first-pass translation — **needs Dahiana's review before publish**, per the standing translation rule in `CLAUDE.md`): "Así que durante los últimos cuatro años he estado desarrollando productos con Low-Code, IA y Automatización, mientras profundizaba en diseño y enseñaba en el camino." — highlight: `"Low-Code, IA y Automatización"`

**Styling**: `design.md`'s contrast rule reserves accent-orange-as-text for large display type or non-text fills, since accent-on-cream measures ~3.3:1 (fails the 4.5:1 AA threshold for normal text, passes the 3:1 threshold for large text). About's body text is `clamp(1.125rem, 1vw + 1rem, 1.375rem)` (18–22px) per current `About.astro` — below the 24px "large text" line at normal weight. **Resolution**: pair the accent color with `font-weight: 700` on the highlighted span. WCAG's large-text contrast threshold (3:1) applies to bold text at 18.66px (14pt) and up, which this range meets except at the very smallest viewports — verify live via the release gate's contrast check at 375px width specifically, and if it fails there, fall back to accent color only above a min-width breakpoint with `font-weight: 700` plus the primary text color below it.

## 4. Service line tool tags

**Data shape change** — `content.ts`'s `services: string[]` becomes `services: { text: string; tags: string[] }[]`.

| Service line | EN tags | ES tags |
|---|---|---|
| Building apps and MVPs with Bubble. | `MVP` | `MVP` |
| Creating websites and landing pages with Webflow, WordPress, or Framer. | `WEBFLOW DEVELOPMENT`, `WORDPRESS DEVELOPMENT`, `DESIGN & LAYOUT` | `DESARROLLO WEBFLOW`, `DESARROLLO WORDPRESS`, `DISEÑO Y MAQUETACIÓN` |
| Building automations from scratch with n8n. | `WORKFLOW AUTOMATION`, `AI AUTOMATION` | `AUTOMATIZACIÓN DE FLUJOS`, `AUTOMATIZACIÓN CON IA` |
| SEO, AEO, automations, content marketing, and more. | `SEO STRATEGY`, `AEO`, `CONTENT MARKETING` | `ESTRATEGIA SEO`, `AEO`, `MARKETING DE CONTENIDO` |

**Rendering**: `Services.astro`'s `<li>` gets the sentence text plus a row of tag chips beneath/alongside it (flex-wrap row, `gap: var(--space-1)` or `var(--space-2)`).

**Chip styling** — explicitly not the rounded-pill shape from the reference screenshot; reuses the existing sharp-cornered button language (same family as nav links):
- `<span>` elements (non-interactive — no `href`/click, so no hover/focus/active states needed; they're labels, not controls).
- `font-family: var(--font-mono)`, uppercase, `letter-spacing: var(--tracking-tight)`, small (`--font-size-meta`).
- `border: 1px solid var(--color-text-primary)`, `border-radius: 2px` (matches the sharp-corner default, not a full pill).
- Text color `var(--color-text-primary)` (never accent-orange text directly on cream, per the existing contrast rule) — no fill color, no hover-fill, since these are static labels.

## Out of scope

- Any change to the Hero component itself (highlight lives in About, not Hero, per clarification).
- Interactive/clickable tags (e.g., filtering projects by tag) — purely presentational for now.
- Changing the reference screenshot's source site or crediting it — it was inspiration only, not an asset.
