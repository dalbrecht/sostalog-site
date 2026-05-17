import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://sostalog.com',
  build: {
    inlineStylesheets: 'auto',
  },
  prefetch: false,
});
