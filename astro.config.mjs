// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://dahiana.work',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          es: 'es',
        },
      },
      serialize(item) {
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
  ],
  security: {
    // Astro emits a <meta http-equiv="content-security-policy"> with hashes
    // for every script/style it bundles.
    csp: {
      // GTM injects gtm.js itself; scriptDirective.resources merges with
      // Astro's auto-generated hashes for our own bundled scripts.
      scriptDirective: {
        resources: ["'self'", 'https://www.googletagmanager.com'],
      },
      directives: [
        "default-src 'self'",
        "img-src 'self' data: https://www.googletagmanager.com https://www.google-analytics.com",
        "font-src 'self'",
        "connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com",
        "frame-src https://www.googletagmanager.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'none'",
      ],
    },
  },
});
