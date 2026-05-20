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
        // draft posts are excluded from production builds (listing, post
        // pages, and RSS) but rendered during `make dev` for previewing.
        // Flip to false or remove the field to publish.
        draft: z.boolean().optional(),
      }),
      stages: [],
      location: 'src/content/blog',
    },
  },
  adapters: [],
});
