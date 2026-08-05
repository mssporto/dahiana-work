# Redesign handoff — dahiana.work v2

This document exists because the creative-direction interview that produced it happened in a session that won't carry over. Read this in full before touching code. It supersedes the parts of `CLAUDE.md` and `design.md` it explicitly contradicts (listed in §2) — those two files have **not** been edited yet; that's step 1 of the build.

## 0. Where things stand

The current build (light-*pre*-redesign) is functionally complete and passing all checks: `astro build`/`astro check` clean, `npm audit` clean, bilingual EN/ES, CSP wired, Fraunces self-hosted for the old hero treatment. None of that plumbing is wrong — the redesign changes the design system on top of it, not the Astro/i18n/CSP/deploy foundation. Nothing here touches `astro.config.mjs`, the i18n setup, or the security headers.

## 1. Locked decisions (do not re-litigate these)

**Palette**
- Body background: cream `#f1efea` (replaces the old near-black `#0a0a08` as the *page* background).
- Footer background: the old near-black `#0a0a08` — reused, not discarded. It becomes a dedicated dark band, not the whole page.
- Accent: `#f63d18`, unchanged, bright. Contrast-checked: ~3.3:1 against the cream (fails 4.5:1 AA for small text, passes 3:1 for large text ≥24px and for non-text UI). **Rule: accent is only used as a fill (buttons, the sticker CTA, the mono-readout status dot, etc.) with near-black or white text on top of it, or as large display type. Never as small text/links sitting directly on the cream.** Small inline links use the near-black text color instead.
- Body text on cream: near-black (reuse the existing `#131410` token) — computes to ~16:1 contrast, excellent.

**Typography**
- One font for the entire site: **Archivo** (Google Fonts, OFL license, variable — weight range 100–900, has a width axis too). Self-host it the same way Fraunces was self-hosted (see §4 for the exact method used last time).
- Drop Fraunces entirely. Drop the old "never the same font for both display and body" rule — that rule is retired.
- Drop the old "exactly one flashy moment, confined to the hero" rule. Replacement principle: **hierarchy is built from scale/weight/opacity contrast on the single font, used throughout every section** (About, Work, Services, footer) — not confined to one spot. Restraint now comes from "one font, one accent color," not from confining expressiveness spatially.
- No serif anywhere.

**The one indulgence (glossy/3D object)**
- A glossy, dimensionally-rendered 3D waving hand — an evolution of the current wave emoji next to the hero greeting, not a flat emoji character. This is the single "flashy" object in the whole system. Idle animation only (see Motion below) — no scroll-triggered behavior.

**Grid**
- A visible but restrained hairline grid: thin, low-contrast lines (barely darker than the cream — do not use a strong/dark outline color), with small crosshair tick marks at a *few* deliberate intersections, not every one. It's a signature texture, not wallpaper.

**Stickers**
- No scattered sticker/collage ephemera anywhere (that was benorth.studio's move, explicitly rejected).
- Exactly **one** exception: the primary contact CTA in the footer is styled as a sticker (peeling-corner badge treatment), not a plain button.
- Resolution of an apparent tension: the general button language (below) is sharp-rectangle/mono — that's the *default* for nav items and any other buttons. The footer's one contact CTA is the deliberate sticker exception to that default. Don't apply the sticker treatment anywhere else, and don't apply the sharp/mono treatment to that one footer CTA.

**Buttons & nav**
- Default button language: sharp-cornered rectangle (no border-radius, or max 2–4px), mono-spaced label text, thin border. Orange fill reserved for primary/hover state, with near-black text on top when filled.
- New persistent nav bar (the current site has none). Nav items use this same sharp/mono button style. Links are anchor-scrolls to sections, not separate routes.
- Nav items: `About`, `Work`, `Services`, `Contact` (Contact anchors down to the footer, since Contact lives there now — see Structure below).

**Structure (4 sections + footer, replacing the current 3-chunk layout)**
- **Hero**: shortens to greeting only (name + the glossy 3D hand). The bio paragraphs currently in `Hero.astro` move out.
- **About** (new section): carries the bio text that used to live in the Hero.
- **Work** (renamed from "Projects"): plain text-row list — org name + description as typography only, arrow icon per row, **no boxed cards, no images**. This sidesteps the fact that there's no project photography yet.
- **Services**: stays a list, same typographic-hierarchy treatment (no boxes), unchanged in content from what's in `content.ts` now.
- **Footer** (dark, `#0a0a08`): absorbs Contact entirely. This is the single closing statement of the page: the `hello@dahiana.work` CTA (styled as the one sticker), plus the mono-readout line (see below).

**Mono live-data readout**
- Content: Madrid time (timezone `Europe/Madrid`) + Madrid coordinates (~`40.4168° N, 3.7038° W`, format loosely like `40.417 N, 3.704 W` to match the mono-readout aesthetic) + a status line reading **"available for new projects."**
- The status line is a manually-maintained string in `content.ts`, not automated — Dahiana is committing to updating it herself when it stops being true. Don't build any booking/CRM integration to drive it.
- The time should be computed client-side (or at build+revalidate) from the real clock — don't hardcode a static time string that goes stale immediately after build.
- Placement: not explicitly decided in the interview. Reasonable default: near the nav/header (that's where haoqi.design put theirs, and it reads naturally as a persistent status strip). Treat this placement as a low-risk default, adjustable if it looks wrong once built — everything else in this doc is a hard lock, this one placement call is not.

**Motion**
- Minimal/functional only. Hover/focus states exactly like the current build (translateY on interactive rows, opacity shifts). The glossy 3D hand gets a subtle idle animation (successor to the current wave keyframe animation), and that's the *only* animated element beyond standard hover/focus.
- No scroll-triggered reveals, no parallax, no cursor-follow effects anywhere.
- Existing rule stays in force: animate only `transform`/`opacity`, respect `prefers-reduced-motion`, never `transition-all`.

## 2. Required edits to CLAUDE.md and design.md (do this first, before any component work)

These files currently describe the *old* system and will actively mislead anyone (human or agent) who reads them without this brief. Update them to match §1 before writing component code, so the two files stay the living source of truth they're meant to be:

- `design.md` §Color: replace the dark-surface palette description with cream body / dark footer, and add the accent-usage constraint (fills/large-type only, never small text on cream).
- `design.md` §Typography: replace the Fraunces section with Archivo, remove the two-font rule, describe the "hierarchy via scale/weight/opacity throughout" principle replacing "one flashy moment."
- `design.md` §Motion: unchanged in substance, but confirm it still says transform/opacity-only, and note the one exception is now the 3D hand, not the wave emoji.
- `design.md`: add a new subsection for the grid system and the mono-readout, since neither exists in the current file.
- `CLAUDE.md` §Styling: remove "never the same font for both" and "exactly one flashy moment" as written — replace with the new principles.
- `CLAUDE.md` §Anti-generic guardrails: keep as-is, still applies.
- Regenerate `tokens.css` to match the updated `design.md` in the same change (per the file's own rule that the two must never drift).

## 3. content.ts changes

- Split the bio paragraphs (`intro: string[]`) out of the Hero-facing fields into a new `about` field/section, for both `en` and `es`.
- Add nav labels (`About`, `Work`, `Services`, `Contact` — and their `es` equivalents) to the content interface.
- Rename `projectsHeading`/`projects` conceptually to "Work" in the UI copy if desired (data shape can stay `projects` internally, just update the visible heading text/labels — don't do a pointless field rename for its own sake).
- Add the status line ("available for new projects" / Spanish equivalent) as a maintained string field.
- Do not add `ctaCalendarUrl`/`ctaBookLabel` back — that CTA was deliberately removed in an earlier session and stays removed. The footer's one CTA is the sticker-styled email link, not a calendar link.

## 4. Font self-hosting (Archivo)

Same method used last time for Fraunces — this worked cleanly, reuse it:
1. Fetch the Google Fonts CSS2 endpoint for Archivo with a modern desktop Chrome user-agent string (this returns the variable woff2 URL rather than static per-weight TTFs, which is what you want): `https://fonts.googleapis.com/css2?family=Archivo:wght@100..900&display=swap` (add the width axis to the query if you want `wdth` too — check what Google actually serves before assuming both axes are in one file).
2. `curl` the returned `.woff2` URL (latin subset) into `public/fonts/archivo-variable.woff2`.
3. Delete `public/fonts/fraunces-variable.woff2` (no longer referenced — don't leave an orphaned asset).
4. Wire `@font-face` in `tokens.css` with `font-weight: 100 900` (and the `wdth` range if applicable), `font-display: swap`.
5. Verify the license is OFL (it is, for Archivo) and that the file actually lands in `dist/fonts/` after build (check `dist/_astro/*.css` references it, same verification done for Fraunces).

## 5. Component-level build order (suggested, not mandatory — reorder if a dependency emerges)

1. `tokens.css` — new palette, Archivo font-face, weight/size scale tokens (you'll likely need more granular size/weight steps than the current 4-step scale, since hierarchy is now doing more work across more sections).
2. `Nav.astro` (new) — sharp/mono button-style anchor links, includes the mono-readout (placement per §1).
3. `Hero.astro` — strip down to greeting + 3D hand only.
4. `About.astro` (new) — bio content, moved from Hero.
5. `Work.astro` (rename/rework of `ProjectsGrid.astro`) — plain text-row list.
6. `ServicesAndContact.astro` → split into `Services.astro` (list only) and fold Contact into a new `Footer.astro`.
7. `Footer.astro` (new) — dark band, sticker CTA, mono readout if not placed in nav instead.
8. `LangSwitch.astro` — decide whether it merges into the new nav or stays a separate floating element (not explicitly decided in the interview; default to folding it into the nav for consistency, since we now have a persistent nav bar to hold it).
9. Update `index.astro` / `es/index.astro` to assemble the new section order: Nav → Hero → About → Work → Services → Footer.
10. Update `BaseLayout.astro` only if needed for CSP changes (there shouldn't be any — no new external resources).

## 6. Verification before calling the redesign done

Same release gate as before, re-run in full: `astro build`, `astro check` (0 errors), `npm audit --audit-level=high`, secret/PII pre-flight scan, visual check at 375/768/1024/1440 in both locales via a real browser (not just a build success), WCAG AA contrast re-check specifically for the new cream/accent/near-black combinations (the math in §1 is a starting estimate, not a substitute for checking the actual rendered colors), CSP still present with hashes and no `unsafe-inline`, `dist/` secret scan clean.

## 7. Explicitly unchanged / still deferred (not affected by this redesign)

- Still no brand photography — the Work section's move to text-only rows is partly *because* of this; don't block the redesign on acquiring images.
- Spanish copy is still a Claude first-pass translation pending Dahiana's human review — the new About/Work/Services/nav copy will need the same review pass once translated.
- Astro/i18n/CSP/deploy-target setup unchanged.

## 8. Repo / deploy

Dahiana confirmed: once this redesign is ready, push to a **new private GitHub repo under `mssporto`**. Per standing rule, it must be created private — no exceptions. Per `CLAUDE.md`'s deployment flow, the agent prepares (branch push) but a human executes anything account/DNS/merge-related (repo creation itself, if it requires an OAuth/login flow the agent can't do headlessly, may also need Dahiana to do it manually — check what `gh repo create` requires in the session before assuming it can be scripted end-to-end).
