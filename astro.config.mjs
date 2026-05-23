import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://humorfrank.github.io',
  base: process.env.NODE_ENV === 'production' ? '/learn-ai-agent/' : '/',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});