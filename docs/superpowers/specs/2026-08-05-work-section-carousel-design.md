# Work section: interactive monogram carousel

Date: 2026-08-05
Status: Approved, not yet implemented

## Context

The user wants the "Some of the projects I've worked on" (Work) section turned into an interactive carousel, using a shared React/Framer Motion/Tailwind reference component as inspiration only — not to be replicated as-is. The reference's whole visual identity depends on square photo thumbnails; this project has no project photography (an explicit open gap noted in `HANDOFF.md`: "No brand photography still... Work section is deliberately text-only rows for this reason"). It also depends on three dependencies not present in this project (React, Framer Motion, lucide-react) and Tailwind utility classes, both of which conflict with `CLAUDE.md`'s hard rules ("No Tailwind," pinned/minimal toolchain).

This spec replaces `Work.astro`'s current plain text-row `<ul>` with a vanilla Astro/CSS/JS carousel, and negotiates one addition to `design.md`'s motion budget.

## Decision summary

- **No new dependencies.** Pure Astro + native scoped `<style>` + one small bundled `<script>`, matching the pattern already used for the scroll-reveal observer and the (now-static) footer envelope.
- **Card face**: a monogram tile (org initials, large mono/display type) over a subtle geometric pattern — not a photo, since none exist.
- **Color treatment**: inactive cards = near-black fill, cream initials. Active card = accent-orange fill, near-black initials — reusing the existing "accent marks the selected/focused thing" convention (nav status dot, hover fills), not inventing new per-card color variety.
- **Content beneath the stack**: active project's org name + one-line description, in text — the reference has no equivalent since it never carried real sentence-length content.
- **Controls**: sharp-cornered prev/next buttons + dot indicators (matching the nav-link/service-tag visual language), not the reference's rounded dark glass pill.
- **Link behavior**: the active/front card links to the project's real URL; clicking any other (inactive) card brings it to the front instead of navigating.
- **Motion budget**: `design.md` gains one new exception — interaction-driven `transform` (rotate + scale + translateY together) + `opacity` response to hover/click/keyboard on this component. Still `transform`/`opacity` only, still no `transition-all`, `prefers-reduced-motion` collapses the effect to an instant, non-fanned, non-animated slide change.

## Data model

`content.ts`'s existing `Project { org, url, description }` needs one addition: `initials?: string` is unnecessary — initials are derived at render time from `org` (first letter of each space-separated word, max 2 characters, uppercased). No data shape change required; `Work.astro` computes initials from `project.org` directly.

Pattern variant (diagonal hairlines vs. dot grid) alternates by array index parity (`i % 2`) — deterministic, no new data field needed.

## Markup structure (`Work.astro`)

```
<section id="work" data-reveal>
  <h2 class="reveal-item">{heading}</h2>

  <div class="carousel" data-carousel>
    <div class="stack" role="list">
      {projects.map((project, i) => (
        <a class="card" style={`--diff: ${i}`} data-index={i} href={project.url} target="_blank" rel="noopener noreferrer nofollow">
          <span class="card-face">{initials}</span>
        </a>
      ))}
    </div>

    <p class="active-info" aria-live="polite">
      <strong>{activeProject.org}</strong> — {activeProject.description}
    </p>

    <div class="controls">
      <button data-prev aria-label="Previous project">‹</button>
      <div class="dots" role="tablist">
        {projects.map((project, i) => <button role="tab" data-dot={i} aria-label={`Go to ${project.org}`} />)}
      </div>
      <button data-next aria-label="Next project">›</button>
    </div>
  </div>
</section>
```

Notes:
- `--diff` is set server-side to the raw index only as a fallback; the client script recalculates and overwrites it as `index - activeIndex` on init and on every state change, since "distance from active" is inherently dynamic.
- The "active card is a real link" behavior means the card element's tag/attributes change with state: simplest implementation is to always render an `<a href={project.url}>`, but make inactive cards' click handler `preventDefault()` and jump-to-slide instead of navigating (real link stays in the DOM/accessibility tree either way, which is actually better for AT/no-JS: without JS, every card is just a real link to its project, stacked as a plain row — a reasonable no-JS fallback).
- `aria-live="polite"` on `.active-info` announces the active project change to screen readers when navigated via controls.

## CSS approach

Each `.card` reads a `--diff` custom property (integer, can be negative) and computes:
- `transform: translateX(calc(var(--diff) * 70%)) rotate(calc(var(--diff) * var(--fan-rotate, 5deg))) scale(var(--card-scale, 1))`
- Hover state (via `[data-carousel]:hover`) increases `--fan-rotate` and reduces `--card-scale` for non-active cards via a CSS custom property override at the container level, cascading down — no JS needed for the hover response itself, only for click/keyboard-driven `activeIndex` changes (which do need JS to rewrite each card's `--diff`).
- Active card (`[data-index="<activeIndex>"]`, marked via a `.is-active` class the script toggles) gets `--card-scale: 1.05` and the accent-fill treatment.
- Title/description text swap uses `opacity` only, no layout shift (both old/new active text occupy the same box via absolute positioning or a simple textContent swap without transition — simplest: `textContent` swap has no meaningful transition to make here, since it's not fading between two simultaneous strings).
- `prefers-reduced-motion: reduce`: removes `transition` entirely; state still changes (cards still reposition), just instantly.

## JS behavior (bundled `<script>`, same file/pattern as the reveal observer)

- Tracks `activeIndex` (init from a `data-active` attribute, default `0` — reference defaulted to a middle index, but `0` is more sensible for real list content read top-to-bottom... actually keep parity with reference's spirit: default to the first project, index `0`, since there's no reason to bury the first entry).
- Click on a card: if it's already active, let the native link navigate (no `preventDefault`). If inactive, `preventDefault()` and set it active instead.
- Prev/next buttons: clamp `activeIndex` between `0` and `projects.length - 1`.
- Dots: set `activeIndex` directly.
- Left/Right arrow keys when the carousel container has focus: same as prev/next.
- On every `activeIndex` change: update each card's `--diff` custom property, toggle `.is-active`, update `.active-info`'s text content, update `aria-selected`/`aria-current` on the matching dot.

## Accessibility

- No-JS fallback: cards render as a de-facto simple stacked/wrapped list of real links (no fan effect, since that's JS-driven state, but nothing is hidden or non-functional).
- Keyboard: arrow keys when focused within the carousel, all buttons/dots are real `<button>` elements with visible `focus-visible` states.
- `aria-live="polite"` region announces the active project on change.
- Reduced motion: fan/slide transitions removed, state changes remain instant and functional.
- Dots get `aria-label` naming the target project by org name (`Go to {org}`), not just a position number.

## design.md update required

Motion section gains: "Interactive components (e.g. the Work carousel) may combine `transform` sub-properties (rotate + scale + translate together) and `opacity` in response to hover, click, or keyboard input — still `transform`/`opacity` only, never `transition-all`, and `prefers-reduced-motion` collapses the effect to instant, non-animated state changes." This is explicitly scoped to interaction-driven response, not a new idle-animation or scroll-trigger category.

## Out of scope

- Real project photography — this is the monogram-tile stand-in until that exists; revisit per `HANDOFF.md`'s existing open item.
- Touch/swipe gestures — click/keyboard/buttons only for this pass.
- Autoplay — the reference has none; not adding one.
