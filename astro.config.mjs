// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://regexsheet.com',
  trailingSlash: 'never',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/404') &&
        !page.includes('/privacy') &&
        !page.includes('/terms') &&
        !page.includes('/contact'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
