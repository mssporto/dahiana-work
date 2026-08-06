# dahiana.work

Dahiana Porto's personal portfolio site. Static, single-page-per-language, built with [Astro](https://astro.build). See [`CLAUDE.md`](./CLAUDE.md) for the full build ruleset and [`design.md`](./design.md) for the design system.

## Stack

- Astro 7, no framework/Tailwind — native scoped `<style>` blocks
- Bilingual via `astro:i18n`: English at `/`, Spanish at `/es/`
- `@astrojs/sitemap`, built-in CSP (`security.csp`), self-hosted fonts, no third-party analytics
- Deploy target: Cloudflare Pages (agent prepares, human executes — see `CLAUDE.md` § Deployment)

## Structure

```
src/
├── components/   # Nav, Hero, About, Work, Services, Footer
├── layouts/      # BaseLayout (meta/OG/JSON-LD/CSP shell)
├── pages/        # index.astro (en), es/index.astro, 404.astro
├── data/         # content.ts — hardcoded per-locale copy
└── styles/       # tokens.css — design tokens, mirrors design.md
public/
├── fonts/ images/ favicon.svg favicon.ico
├── robots.txt  llms.txt  _headers
```

## Commands

| Command           | Action                                        |
| :----------------- | :--------------------------------------------- |
| `npm ci`            | Install dependencies (reproducible, from lockfile) |
| `npm run dev`       | Start local dev server at `localhost:4321`     |
| `npm run build`     | Build production site to `./dist/`             |
| `npm run preview`   | Preview the production build locally           |
| `npm run check`     | Run `astro check` (type/template diagnostics)  |
| `npm audit --audit-level=high` | Check dependency vulnerabilities |

## Status

- v2 redesign: cream body / dark footer band, single self-hosted Archivo font, sharp/mono nav with a live Madrid time + coordinates readout, text-row Work list (no cards), footer sticker CTA.
- English + Spanish pages build and pass `astro check` with 0 errors.
- Spanish copy is a first-pass translation — pending Dahiana's review before publish.
- Not yet its own git repo (deferred until there's a commit-worthy milestone); will be **private** on GitHub per standing rule.

## Third-party assets

- `public/images/waving-hand-3d.png` — Waving Hand, 3D style, from [microsoft/fluentui-emoji](https://github.com/microsoft/fluentui-emoji), MIT License, Copyright (c) Microsoft Corporation.
- `public/images/envelope-3d.png` — Envelope, 3D style, from [microsoft/fluentui-emoji](https://github.com/microsoft/fluentui-emoji), MIT License, Copyright (c) Microsoft Corporation.
