import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://sostalog.com',
  build: {
    inlineStylesheets: 'auto',
  },
  prefetch: false,
  vite: {
    plugins: [tailwindcss()],
  },
});
