import { defineConfig } from '@sagegrouse/core';

// Intentionally empty: the marketing site has no staged content yet.
// Adding a blog or changelog is a future spec — see
// docs/superpowers/specs/2026-05-16-sosta-marketing-site-design.md § 10.
export default defineConfig({
  contentRoot: 'src/content',
  contentTypes: {},
  adapters: [],
});
