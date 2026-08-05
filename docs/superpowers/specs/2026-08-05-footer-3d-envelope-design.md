# Footer CTA — 3D envelope replaces sticker

Date: 2026-08-05
Status: Approved, not yet implemented

## Context

The v2 redesign shipped with a footer contact CTA styled as an orange, rotated "sticker" badge (peeling-corner effect) linking to `hello@dahiana.work`. `design.md` names this the one deliberate sticker/collage element in the system, with an explicit rule against adding sticker treatment anywhere else.

Separately, the hero already carries a glossy 3D asset (Microsoft Fluent Emoji "Waving Hand", self-hosted PNG, idle-animated) — this replaced an earlier flat SVG attempt and a since-reverted interactive Three.js experiment that was rejected as visually bad. `design.md` currently calls the hand "the one deliberate flashy object in the system" and its idle animation "the only exception" to the no-extra-animation rule (stated in both the Direction and Motion sections).

This spec covers replacing the footer sticker with a second glossy 3D asset (an envelope) from the same Fluent Emoji pipeline, which means these principles need to be reworded, not just added to.

## Decision

Replace the sticker badge entirely with:
1. A static, idle-animated 3D envelope image (Fluent Emoji 3D pack, same source/license/pipeline as the hero hand).
2. A plain text `mailto:` link below it, styled with the system's standard interactive-element treatment (no more one-off sticker styling).

Rejected alternatives (from brainstorming):
- Real interactive 3D (Three.js/WebGL) — explicitly avoided; this is the exact approach that failed for the hero hand and was fully reverted.
- Keeping the envelope beside or overlaid on the sticker — rejected in favor of a full replacement, since the "one sticker in the system" rule was being retired anyway.
- No animation on the envelope — rejected in favor of an idle animation to bookend the hero hand, accepting that this changes the "one flashy object" principle to two.

## Asset

- Source: Fluent Emoji 3D pack (MIT), same repo/pipeline already used for the hero hand.
- Target file: `public/images/envelope-3d.png`, sourced from the Fluent Emoji "Envelope" 3D variant. If "Envelope" doesn't render cleanly against the dark footer band at fetch time, fall back to "E-Mail" from the same pack — a visual substitution only, not a design change.
- Attribution: add to `README.md` § Third-party assets, alongside the existing hand credit.

## Component changes — `src/components/Footer.astro`

- Remove: `.sticker` element, its `::before` peeling-corner pseudo-element, rotate transform, box-shadow.
- Add: `<img>` for the envelope asset (idle-animated), and a plain text anchor (`mailto:{ctaEmail}`) rendered below it showing the email address as visible text.
- Layout: envelope above, email text link below — mirrors how the hero hand sits above its headline.
- Link states: adopt the system's standard hover/focus/active pattern — `translateY` + opacity shift on hover, visible `focus-visible` outline, `translateY` reset on active. No bespoke styling now that the sticker exception is gone.

## Animation

- Envelope gets a slow idle loop (float and/or gentle rotate), CSS-only, animating only `transform`/`opacity`.
- No scroll trigger, no cursor-follow, no click-triggered animation — idle loop only, matching the hand's existing constraint.
- Respects `prefers-reduced-motion: reduce` (loop disabled/frozen when set).

## design.md updates required

Three passages currently written around a single flashy/animated object need generalizing to two:

1. **Direction** section: "The one deliberate 'flashy' object in the system is a glossy, dimensionally-rendered 3D waving hand in the hero..." → reword to name both the hero hand and the footer envelope as the system's two deliberate flashy objects, both idle-animated only, no scroll triggers.
2. **Motion** section: "The one exception is the glossy 3D hand's idle animation... that is the only animated element beyond standard hover/focus." → reword to "these two exceptions" (hand + envelope).
3. **Buttons & nav** section: remove the sticker-exception carve-out ("Exception — the footer contact CTA: the one sticker/peeling-corner badge...") entirely, since no sticker treatment remains anywhere in the system.

`design.md` and `tokens.css`/component code must not drift — per `CLAUDE.md`'s standing rule, update the doc in the same change as the component.

## Accessibility

- Envelope image: `alt=""` (decorative) if the adjacent text link already states the email address clearly; reassess to a short descriptive alt only if the text ends up visually redundant/hidden at some breakpoint.
- Email text link: real visible text, not an image label — keeps it keyboard-navigable and screen-reader-clear regardless of the image.
- Contrast: verify the plain text link against `--color-surface-footer` still meets WCAG AA (currently uses `--color-text-on-footer` for the CTA copy — carry that token forward for the link and re-check contrast once styled, per CLAUDE.md's release gate).

## Out of scope

- Any interactivity beyond the idle loop (no cursor-follow, no click-triggered motion) — this is the boundary the prior 3D hand experiment crossed and got rejected for.
- Sourcing a non-Fluent-Emoji asset.
- Changing the hero hand.
