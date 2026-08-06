# Work carousel: browser-frame tile treatment

Date: 2026-08-06
Status: Approved, not yet implemented

## Context

The Work carousel (built per `2026-08-05-work-section-carousel-design.md`, later swapped from monogram tiles to real client screenshots) currently renders each card face as a full-bleed `object-fit: cover` crop of a wide landscape screenshot (3146×1608) squeezed into a much shorter card. The user flagged three problems at once: the six sites' own colors/fonts clash against the site's restrained cream/mono aesthetic, the crop is arbitrary and sometimes cuts off meaningful content, and the raw-screenshot look reads as generic/templated rather than designed.

Explored and rejected via visual-companion brainstorming: (1) a duotone color-wash + accent corner ticks, (2) a monogram front-face with the screenshot only peeking in on hover, (3) a full custom vector "case study" browser-chrome frame. None landed — the user's actual objection was simpler than any of these: the crop itself. Cropping was the core issue, not the color treatment or the resting-state identity.

Switching to `object-fit: contain` (no crop) solves the crop complaint, but leaves bare letterbox space on non-16:9 screenshots. Framing that letterbox space in a lightweight SVG browser-chrome bar (rather than raw empty space) addresses the "reads as generic" complaint without reintroducing color-treatment gimmicks.

## Decision summary

- **Fit mode**: `object-fit: contain` replaces `cover`. No project screenshot is ever cropped.
- **Letterbox fill**: the space around the contained image is filled dark (`color-text-primary`, `#131410`) — chosen over a cream fill because it reads as a distinct "screen sitting inside a window," not a blend into the page background.
- **Chrome bar**: a thin cream (`color-surface-base`) bar sits above the image area, containing three small dots (one lit `color-text-accent`, two muted `color-text-primary` at low opacity) and a mono-spaced domain label. The accent dot is always lit — not tied to active/hover state, matching the user's explicit call to keep this simple (no extra state logic).
- **Domain label**: derived from each project's `url` at render time (strip protocol/`www.`/trailing slash), not from `org` — e.g. `fortnight.studio`, `gghostel.com`, `keepcoding.io`. This can diverge from the `org` name shown in `.active-info` below the stack (e.g. Divino Hotels' active-org text vs. `gghostel.com` in the frame) — that's expected and fine, it mirrors how a real browser address bar works.
- **Frame border**: a thin hairline border (`color-text-primary` at low opacity) around the whole tile, sharp corners — no border-radius beyond the existing 2px the card-face already uses, consistent with the site's sharp-cornered button/input language.
- **No new source images.** The six existing files in `public/images/` are reused as-is; only the CSS fit mode and the surrounding frame markup change.
- **Carousel mechanics unchanged.** Fan-stack positioning, hover/focus scale, keyboard nav, dots, prev/next, and the `--diff` custom-property system are untouched — this spec only changes what lives inside `.card-face`.

## Markup structure (`Work.astro`)

Current:
```astro
<span class="card-face">
  <img src={project.image} alt={`${project.org} website preview`} loading="lazy" decoding="async" style={`object-position: ${project.imagePosition ?? 'center top'}`} />
</span>
```

New:
```astro
<span class="card-face">
  <span class="card-chrome">
    <span class="chrome-dot chrome-dot--accent"></span>
    <span class="chrome-dot"></span>
    <span class="chrome-dot"></span>
    <span class="chrome-domain">{domainFor(project.url)}</span>
  </span>
  <span class="card-viewport">
    <img src={project.image} alt={`${project.org} website preview`} loading="lazy" decoding="async" />
  </span>
</span>
```

`domainFor(url)` is a small helper in `Work.astro`'s frontmatter: `new URL(url).hostname.replace(/^www\./, '')`. Computed once per project at build time (Astro frontmatter), not client-side.

`project.imagePosition` becomes unused and is removed from `Project` in `content.ts` (and from the two projects currently setting it, KeepCoding and Fortnight.Studio) — `object-position` has no effect under `object-fit: contain` centered scaling, so the field is dead weight once this ships.

## CSS approach

- `.card-face` becomes a flex column: fixed-height `.card-chrome` bar (~`1.25rem`–`1.5rem`, enough for 8pt-grid alignment) on top, `.card-viewport` filling the remainder.
- `.card-viewport`: `background-color: var(--color-text-primary)` (the dark mat), `display: flex; align-items: center; justify-content: center`.
- `.card-viewport img`: `max-width: 100%; max-height: 100%; object-fit: contain` (belt-and-suspenders with the flex centering — flex centering handles the letterboxing, `object-fit: contain` guarantees the image itself never overflows its own box at odd aspect ratios).
- `.card-chrome`: `background-color: var(--color-surface-base)`, flex row, `align-items: center`, `gap: var(--space-1)`, small horizontal padding (`var(--space-1)`).
- `.chrome-dot`: small (`0.375rem`) circle, `background-color: var(--color-text-primary)`, `opacity: 0.3`.
- `.chrome-dot--accent`: `background-color: var(--color-text-accent); opacity: 1`.
- `.chrome-domain`: `font-family: var(--font-mono); font-size: 0.625rem`, `color: var(--color-text-muted)` (solid token, ~7.7:1 on cream per `design.md` — not `opacity` on `color-text-primary`, so contrast can't silently drift), `margin-left: auto` (right-aligned after the dots), `white-space: nowrap; overflow: hidden; text-overflow: ellipsis` for long domains at the smallest card width.
- Outer hairline: move the existing `border-radius: 2px; overflow: hidden` from `.card-face` onto the same element, add `border: 1px solid var(--grid-line-color)` — reuses the existing hairline-grid token (`#e6e3dc`, `tokens.css:44`) already established for the site's low-contrast line texture, rather than inventing a new border color.
- Remove the existing `.card-face::after` dark-overlay-dims-inactive-cards treatment — it was designed for full-bleed cover images; with a dark letterbox mat and chrome bar already providing visual weight, an additional darkening overlay on inactive cards would double up. Inactive/active visual distinction continues to come from the fan-stack's existing scale/rotation/translate falloff (per the original carousel spec) — no replacement dimming treatment is added.

## Accessibility

- No change to existing alt text (`${project.org} website preview`) — still describes the image, not the chrome decoration.
- Chrome dots and domain label are decorative/informational, not interactive — no new focusable elements, no `aria-*` needed beyond what the card link already has.
- Contrast: mono domain label uses the solid `color-text-muted` token (~7.7:1 on cream, already verified in `design.md`) — no opacity-based text color, so contrast can't drift.

## design.md update required

- Line 99 ("No brand photography exists yet — the Work section is text-only rows for this reason, not a placeholder state to be 'fixed' later by adding cards") is stale — the Work section has carried real screenshots in a card carousel since 2026-08-05/06. Replace with a short note describing the current browser-frame tile treatment (or simply remove the claim and point to this spec + the 2026-08-05 carousel spec).
- No motion-budget changes — this spec doesn't touch animation, only the static tile composition.

## Out of scope

- Touch/swipe gestures — unchanged from the original carousel spec, still click/keyboard/buttons only.
- New/recaptured source screenshots — explicitly deferred; current files are reused as-is (confirmed with user).
- Per-card active/hover state on the chrome dot — explicitly rejected in favor of always-lit accent dot (confirmed with user).
