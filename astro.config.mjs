import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default ({ command }) => defineConfig({
  site: 'https://humorfrank.github.io',
  base: command === 'build' ? '/learn-ai-agent/' : '/',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});