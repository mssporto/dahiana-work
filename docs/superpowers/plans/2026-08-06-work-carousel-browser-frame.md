# Work Carousel Browser-Frame Tile Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Work carousel's cropped (`object-fit: cover`) screenshot tiles with uncropped (`object-fit: contain`) screenshots framed in a lightweight SVG-style browser-chrome bar, per `docs/superpowers/specs/2026-08-06-work-carousel-browser-frame-design.md`.

**Architecture:** Pure Astro + native scoped `<style>`, no new dependencies. `Work.astro`'s frontmatter gains a `domainFor()` helper; its markup gains two wrapper spans (`.card-chrome`, `.card-viewport`) inside the existing `.card-face`; its CSS restructures `.card-face` from a single cropped `<img>` into a flex-column chrome-bar-plus-viewport layout. `content.ts` loses the now-dead `imagePosition` field. `design.md` gets one stale line corrected.

**Tech Stack:** Astro 7.1.6, TypeScript 6.0.3, native CSS custom properties (`src/styles/tokens.css`). No test framework exists in this repo — verification is `astro check` (type safety) + `astro build` (compiles) + manual browser check via the dev server, per this project's existing release-gate process in `CLAUDE.md`.

## Global Constraints

- No Tailwind — native Astro scoped `<style>` blocks only.
- Animate only `transform` and `opacity`, never `transition-all` — this plan touches no animation, but must not regress the existing fan-stack transitions in `Work.astro`.
- WCAG 2.1/2.2 AA — ≥4.5:1 contrast for small text; the domain label must use the solid `--color-text-muted` token (~7.7:1 on cream), never an `opacity`-based color.
- 8pt spacing grid — all new spacing values must be existing `--space-*` tokens or literal `rem` values that are multiples of `0.5rem`.
- No pure `#000000`/`#FFFFFF` fills — reuse `--color-text-primary` (`#131410`) for the dark mat, not pure black.
- Both locales (`en` default `/`, `es` at `/es/`) must stay in sync — any `content.ts` change touches both `en` and `es` blocks.
- `design.md` and `tokens.css` must never drift — this plan doesn't add new tokens, but does correct a stale claim in `design.md`.
- Sharp corners / no more than the existing 2px `border-radius` already used on `.card-face`.

---

### Task 1: Remove the dead `imagePosition` field from `content.ts`

**Files:**
- Modify: `src/data/content.ts:1-8` (the `Project` interface), and the four `imagePosition: 'left top'` usages (KeepCoding + Fortnight.Studio, in both `en` and `es` blocks).

**Interfaces:**
- Consumes: nothing from earlier tasks (this is the first task).
- Produces: `Project` interface with no `imagePosition` field — Task 2 relies on this being gone so `Work.astro` no longer references it.

`imagePosition` was used to shift `object-position` on a cropped (`object-fit: cover`) image. Once Task 3 switches to `object-fit: contain`, `object-position` has no visible effect (a `contain`-fit image is already fully visible and centered), so the field becomes dead configuration that would silently do nothing — remove it now so there's no stale field for a future editor to "fix."

- [ ] **Step 1: Remove the field from the `Project` interface**

In `src/data/content.ts`, find:
```ts
export interface Project {
  org: string;
  url: string;
  description: string;
  image: string;
  imagePosition?: string;
}
```
Change to:
```ts
export interface Project {
  org: string;
  url: string;
  description: string;
  image: string;
}
```

- [ ] **Step 2: Remove the four usages**

In the `en` block, find the KeepCoding project:
```ts
    {
      org: 'KeepCoding',
      url: 'https://keepcoding.io/',
      description: 'Served as CMO and taught classes for a digital marketing bootcamp.',
      image: '/images/keepcoding.io.png',
      imagePosition: 'left top',
    },
```
Remove the `imagePosition: 'left top',` line (keep everything else, including the trailing comma on `image`).

Do the same for the `en` Fortnight.Studio project:
```ts
    {
      org: 'Fortnight.Studio',
      url: 'https://www.fortnight.studio/',
      description: 'Developed agentic workflows, AEO, and automation solutions.',
      image: '/images/www.fortnight.studio.png',
      imagePosition: 'left top',
    },
```
Remove its `imagePosition: 'left top',` line.

Repeat both removals in the `es` block (same two projects, same field, Spanish `description` text unaffected).

- [ ] **Step 3: Verify no remaining references**

Run: `grep -rn "imagePosition" src/`
Expected: no output (empty — confirms `content.ts` and `Work.astro` no longer reference it; `Work.astro` still references it until Task 3, so if this repo has both tasks done out of order, expect one match in `Work.astro` until that task lands).

- [ ] **Step 4: Type-check**

Run: `npx astro check`
Expected: 0 errors. (If `Work.astro` still reads `project.imagePosition` at this point, TypeScript will report it as an unknown property — that's expected until Task 3 removes the read. If this plan is executed in task order, Task 3 happens next and clears it. If you're verifying Task 1 in isolation, seeing that one error referencing `Work.astro` is the correct, expected state — don't "fix" it here.)

- [ ] **Step 5: Commit**

```bash
git add src/data/content.ts
git commit -m "Remove dead imagePosition field ahead of contain-fit carousel tiles"
```

---

### Task 2: Add the `domainFor()` helper and browser-chrome markup to `Work.astro`

**Files:**
- Modify: `src/components/Work.astro:1-43` (frontmatter and template).

**Interfaces:**
- Consumes: `Project` type from `../data/content` (now without `imagePosition`, per Task 1).
- Produces: a `domainFor(url: string): string` function in `Work.astro`'s frontmatter, and new `.card-chrome` / `.chrome-dot` / `.chrome-dot--accent` / `.chrome-domain` / `.card-viewport` elements inside each `.card-face` — Task 3's CSS task styles these exact class names.

- [ ] **Step 1: Add the `domainFor` helper to the frontmatter**

In `src/components/Work.astro`, the frontmatter currently reads:
```astro
---
import type { Project } from '../data/content';

interface Props {
  heading: string;
  projects: Project[];
}
const { heading, projects } = Astro.props;

const activeProject = projects[0];
---
```
Change to:
```astro
---
import type { Project } from '../data/content';

interface Props {
  heading: string;
  projects: Project[];
}
const { heading, projects } = Astro.props;

const activeProject = projects[0];

function domainFor(url: string): string {
  return new URL(url).hostname.replace(/^www\./, '');
}
---
```

- [ ] **Step 2: Replace the card-face markup**

Find:
```astro
            <span class="card-face">
              <img
                src={project.image}
                alt={`${project.org} website preview`}
                loading="lazy"
                decoding="async"
                style={`object-position: ${project.imagePosition ?? 'center top'}`}
              />
            </span>
```
Replace with:
```astro
            <span class="card-face">
              <span class="card-chrome">
                <span class="chrome-dot chrome-dot--accent"></span>
                <span class="chrome-dot"></span>
                <span class="chrome-dot"></span>
                <span class="chrome-domain">{domainFor(project.url)}</span>
              </span>
              <span class="card-viewport">
                <img
                  src={project.image}
                  alt={`${project.org} website preview`}
                  loading="lazy"
                  decoding="async"
                />
              </span>
            </span>
```

- [ ] **Step 3: Type-check**

Run: `npx astro check`
Expected: 0 errors — confirms `domainFor` type-checks and no remaining reference to the removed `imagePosition` field.

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: build succeeds. This confirms `domainFor(project.url)` runs at build time for all six projects without throwing (it would throw if any `project.url` were an invalid URL string — all six are already valid `https://...` URLs in `content.ts`, so this should pass cleanly).

- [ ] **Step 5: Commit**

```bash
git add src/components/Work.astro
git commit -m "Add browser-chrome markup and domain helper to Work carousel cards"
```

---

### Task 3: Restructure `.card-face` CSS — contain-fit viewport, chrome bar, hairline border

**Files:**
- Modify: `src/components/Work.astro:184-237` (the `.card`, `.card-face`, `.card-face img`, and `.card-face::after` style rules).

**Interfaces:**
- Consumes: `.card-chrome`, `.chrome-dot`, `.chrome-dot--accent`, `.chrome-domain`, `.card-viewport` class names from Task 2's markup; `--grid-line-color`, `--color-surface-base`, `--color-text-primary`, `--color-text-accent`, `--color-text-muted`, `--font-mono`, `--space-1` tokens from `src/styles/tokens.css`.
- Produces: the final visual tile treatment — no later task depends on new names from this one.

This is a pure CSS change with a visual (not type-level) test cycle, since the project has no test framework — verification is the dev server + browser, per `CLAUDE.md`'s "start the dev server and use the feature in a browser" rule for frontend changes.

- [ ] **Step 1: Replace the `.card-face` rule**

Find:
```css
  .card-face {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 2px;
    overflow: hidden;
    background-color: var(--color-text-primary);
  }
```
Replace with:
```css
  .card-face {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    border-radius: 2px;
    overflow: hidden;
    border: 1px solid var(--grid-line-color);
  }

  .card-chrome {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    gap: var(--space-1);
    height: 1.5rem;
    padding: 0 var(--space-1);
    background-color: var(--color-surface-base);
  }

  .chrome-dot {
    width: 0.375rem;
    height: 0.375rem;
    border-radius: 50%;
    background-color: var(--color-text-primary);
    opacity: 0.3;
  }

  .chrome-dot--accent {
    background-color: var(--color-text-accent);
    opacity: 1;
  }

  .chrome-domain {
    font-family: var(--font-mono);
    font-size: 0.625rem;
    color: var(--color-text-muted);
    margin-left: auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .card-viewport {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-color: var(--color-text-primary);
  }
```

- [ ] **Step 2: Replace the `.card-face img` rule**

Find:
```css
  .card-face img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    display: block;
  }
```
Replace with:
```css
  .card-viewport img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    display: block;
  }
```

- [ ] **Step 3: Remove the dimming-overlay rules**

Find and delete both of these rules entirely:
```css
  .card-face::after {
    content: '';
    position: absolute;
    inset: 0;
    background-color: var(--color-surface-base);
    opacity: 0.55;
    transition: opacity 0.3s ease;
  }

  .card.is-active .card-face::after {
    opacity: 0;
  }
```
(Rationale, from the spec: the dark letterbox mat + cream chrome bar already carry visual weight; the fan-stack's existing scale/rotation/translate falloff still distinguishes active from inactive cards, so no replacement dimming treatment is needed.)

- [ ] **Step 4: Start the dev server**

Run: `astro dev --background`
Then check it started: `astro dev status`
Expected: server running, no build errors printed.

- [ ] **Step 5: Visual check in browser — English**

Navigate to `http://localhost:4321/` (or whatever port `astro dev status` reports), scroll to the Work section. Confirm:
- Each tile shows a cream chrome bar with one accent-orange dot, two muted dots, and a mono domain label (e.g. `fortnight.studio`) right-aligned.
- The screenshot below the chrome bar is fully visible (no cropping) and centered on a dark background — no part of any of the 6 screenshots is cut off.
- Clicking through all 6 cards (via dots, prev/next, and clicking a side card) still works — the fan-stack animation is unaffected.
- Long domain labels (if any exceed the tile width) truncate with an ellipsis rather than wrapping or overflowing.

- [ ] **Step 6: Visual check in browser — Spanish**

Navigate to `http://localhost:4321/es/`, repeat the same checks in Step 5. Confirm the same 6 tiles render identically (the tile treatment is language-agnostic — only the surrounding page text differs).

- [ ] **Step 7: Responsive check**

Resize the browser (or use dev tools device toolbar) to 375px, 768px, 1024px, and 1440px widths. Confirm the chrome bar text doesn't overlap the dots at the narrowest card width, and the viewport image stays centered and uncropped at every size.

- [ ] **Step 8: Reduced-motion check**

Enable "prefers-reduced-motion: reduce" (via OS setting or browser dev tools rendering emulation), reload, and confirm card transitions still work (just without the eased animation) — this task didn't touch the transition rules, so this is a regression check, not a new behavior.

- [ ] **Step 9: Stop the dev server**

Run: `astro dev stop`

- [ ] **Step 10: Build and type-check**

Run: `npm run build && npx astro check`
Expected: both succeed with 0 errors.

- [ ] **Step 11: Commit**

```bash
git add src/components/Work.astro
git commit -m "Restructure Work carousel tiles: contain-fit viewport + browser-chrome frame"
```

---

### Task 4: Correct the stale claim in `design.md`

**Files:**
- Modify: `design.md:99`.

**Interfaces:**
- Consumes: nothing (documentation-only change).
- Produces: nothing consumed by other tasks — this is the last task.

- [ ] **Step 1: Replace the stale line**

Find:
```
- No brand photography exists yet — the Work section is text-only rows for this reason, not a placeholder state to be "fixed" later by adding cards.
```
Replace with:
```
- The Work section renders real client screenshots in a browser-chrome-framed carousel (see `docs/superpowers/specs/2026-08-05-work-section-carousel-design.md` and `docs/superpowers/specs/2026-08-06-work-carousel-browser-frame-design.md`) — this line previously claimed the section was still text-only, which stopped being true once the carousel shipped.
```

- [ ] **Step 2: Verify `design.md`/`tokens.css` still match**

Run: `grep -n "grid-line-color" src/styles/tokens.css design.md`
Expected: `tokens.css` shows the `--grid-line-color: #e6e3dc` declaration; `design.md`'s "Grid system" section already documents the same hairline-grid concept in prose (no numeric value needed there, per the existing pattern in that section) — confirms no drift was introduced.

- [ ] **Step 3: Commit**

```bash
git add design.md
git commit -m "Correct stale design.md claim about Work section being text-only"
```

---

## Final Verification

- [ ] Run the full release-gate subset relevant to this change: `npm run build`, `npx astro check`, then `astro dev --background` and manually re-check both `/` and `/es/` Work sections in a browser (per Task 3 Steps 5-7), then `astro dev stop`.
- [ ] `grep -rn "imagePosition" src/` returns nothing.
- [ ] `git log --oneline -5` shows four commits: content.ts cleanup, markup change, CSS restructure, design.md correction.
