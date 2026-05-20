import { defineConfig, z } from '@sagegrouse/core';

export default defineConfig({
  contentRoot: 'src/content',
  contentTypes: {
    changelog: {
      schema: z.object({
        title: z.string(),
        date: z.date(),
        version: z.string().optional(),
        summary: z.string(),
      }),
      stages: [],
      location: 'src/content/changelog',
    },
    blog: {
      schema: z.object({
        title: z.string(),
        date: z.date(),
        summary: z.string(),
      }),
      stages: [],
      location: 'src/content/blog',
    },
  },
  adapters: [],
});
