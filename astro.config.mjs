// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://regexsheet.com',
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/404') &&
        !page.includes('/privacy') &&
        !page.includes('/terms') &&
        !page.includes('/contact') &&
        !page.includes('/tester'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
