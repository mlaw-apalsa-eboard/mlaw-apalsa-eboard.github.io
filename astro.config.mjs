// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.mlawapalsa.com',
  integrations: [sitemap()],
  // Keep old Squarespace URLs working after the move.
  redirects: {
    '/about': '/mission',
    '/cover-page': '/',
  },
});
