import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

// Build-time RSS endpoint. Emits a static dist/blog/rss.xml — no client JS,
// so it doesn't touch the zero-runtime-JS invariant. `context.site` resolves
// to the `site` value in astro.config (https://sostalog.com).
interface BlogData {
  title: string;
  date: Date;
  summary: string;
  draft?: boolean;
}

export async function GET(context: APIContext) {
  const includeDrafts = import.meta.env.DEV;
  const rawPosts = await getCollection('blog');
  const posts = (rawPosts as Array<(typeof rawPosts)[number] & { data: BlogData }>)
    .filter((post) => includeDrafts || !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'sostalog blog',
    description: 'Notes on journaling, attention, and building sosta.',
    site: context.site ?? 'https://sostalog.com',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.summary,
      pubDate: post.data.date,
      link: `/blog/${post.id}/`,
    })),
  });
}
