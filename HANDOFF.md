# Handoff — dahiana.work

This document exists so a new session can pick up exactly where this one left off. It replaces `REDESIGN_BRIEF.md` (renamed) — that brief's build order is done; this file is the current-state snapshot going forward. Read this in full before touching code.

## 0. Where things stand right now

The v2 redesign is **built, audited, and committed** — this is a real project state, not a plan:

- Cream body (`#f1efea`) / dark footer band (`#0a0a08`), single self-hosted Archivo font, sharp/mono nav with a live Madrid time + coordinates readout, text-row Work list (no cards), footer sticker CTA. Full spec in `design.md`.
- Passed a full `/impeccable audit` pass (17/20 → fixes applied for all P1–P3 findings: landmark nesting, missing Contact heading, motion-budget violations, touch targets, muted-text token, no-JS readout fallback). Re-verified: `astro check`/`astro build` clean, CSP intact, landmarks confirmed via accessibility snapshot.
- `PRODUCT.md` written (impeccable's strategic doc — register: brand, users, anti-references, design principles).
- **Repo is live**: `dahiana_work` was isolated into its own git repo (it used to live inside an unrelated parent monorepo — that's fixed now) and pushed to **[github.com/mssporto/dahiana-work](https://github.com/mssporto/dahiana-work)**, private, on branch `main`. One baseline commit (`4b3a319`).

## 1. The 3D-hand detour (tried and reverted)

The hero's waving hand went through three iterations this session:

1. **First build**: a hand-drawn SVG with CSS gradients approximating "glossy 3D." Functional but visibly flat — flagged as an open item in the original brief.
2. **Landed on main**: swapped for Microsoft's **Fluent Emoji 3D** "Waving Hand" (`public/images/waving-hand-3d.png`), MIT-licensed, self-hosted, zero new dependencies. Genuinely glossy/dimensional, credited in `README.md` § Third-party assets. **This is what's live now.**
3. **Tried and rejected**: a real interactive 3D version — Three.js (pinned `0.185.1`) + a CC-BY rigged hand model (glTF, sourced from poly.pizza, no-login-required CC asset host) + cursor-follow rotation + baked wave animation, tinted to the `#f63d18` accent. Built on branch `experiment/3d-interactive-hand`. **Visual result was rejected outright** ("looks absolutely horrific") — the model's orientation/lighting didn't read as intended even after a corrective rotation fix. Branch deleted, `three`/`@types/three` uninstalled, `Hand3D.astro` and `public/models/` removed, `Hero.astro` reverted to the Fluent Emoji version. `main` is clean of any trace of this attempt.

**Do not re-attempt Option C (real interactive 3D) without a materially different approach** — if revisited, it needs actual visual iteration/screenshots checked *before* presenting it as done, and probably a different model source or a from-scratch procedural build rather than a found rigged asset, since orientation problems from FBX→glTF conversion were the likely root cause.

## 2. Repo / deploy state

- Remote: `https://github.com/mssporto/dahiana-work` (private, confirmed via `gh repo view`).
- Branch: `main` only. No feature branches currently open.
- Per `CLAUDE.md`'s standing deployment flow (unchanged): agent prepares (branch, PR-ready commits), human executes anything account/DNS/merge-related. The repo itself was created this session with the user's **explicit one-time override** of the "agent must not create the GitHub repo" rule — that override does not carry forward to future sessions; ask again if repo-level actions come up.
- Cloudflare Pages project, custom domain, DNS: **not yet started** — still fully deferred to the human per `CLAUDE.md`.

## 3. Still open

- **Spanish copy needs human review.** Nav labels (`nav.work` translated as "Proyectos"), About/Work/Services text — all first-pass Claude translations, unreviewed by Dahiana.
- **Grid crosshair ticks** (per `design.md`'s Grid system section) were never added — only the base tiled hairline grid shipped. Minor/decorative, flagged but not blocking.
- **Contrast**: verified live in-browser via Playwright (not just arithmetic) during the audit — this is done, not open, but re-verify if palette changes again.
- No brand photography still (unchanged from original brief — Work section is deliberately text-only rows for this reason).

## 4. Judgment calls made along the way (not explicitly specified upstream)

- Bumped `--font-weight-heading` 500 → 700, since Archivo (no optical-size axis) needed more weight contrast than Fraunces did to carry hierarchy.
- Added a `--color-text-muted` token (`#4b4b47`) rather than relying on `opacity` for de-emphasized text — pinned, verified contrast (~7.7:1) instead of an incidental one.
- Nav/lang-switch buttons bumped to `min-height: 2.75rem` for touch-target compliance.

## 5. Release gate (re-run before next ship)

Same as `CLAUDE.md`'s checklist — last run clean as of this session's audit pass: `astro build`/`astro check` (0 errors), `npm audit --audit-level=high` (0 vulnerabilities), secret/PII pre-flight scan (clean, only `hello@dahiana.work` present), CSP with hashes and no `unsafe-inline`/`unsafe-eval`, landmarks correct (`banner`/`main`/`contentinfo`), responsive 375–1440px. Re-run all of it if anything changes before considering this shippable to Cloudflare Pages.
