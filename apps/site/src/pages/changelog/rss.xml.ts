import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

// Build-time RSS endpoint. Emits a static dist/changelog/rss.xml — no client
// JS, so it doesn't touch the zero-runtime-JS invariant. `context.site`
// resolves to the `site` value in astro.config (https://sostalog.com).
//
// Changelog entries render inline on the single /changelog page, so each feed
// item links to that page's per-entry fragment (#<entry id>) rather than a
// standalone route. Mirrors the field shape in `apps/site/sagegrouse.config.ts`.
interface ChangelogData {
  title: string;
  date: Date;
  version?: string;
  summary: string;
}

export async function GET(context: APIContext) {
  const rawEntries = await getCollection('changelog');
  const entries = (rawEntries as Array<(typeof rawEntries)[number] & { data: ChangelogData }>).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  return rss({
    title: 'SostaLog changelog',
    description: "What's new in SostaLog. Newest first.",
    site: context.site ?? 'https://sostalog.com',
    // Items deep-link to per-entry fragments on the single /changelog page.
    // Disable the default trailing-slash normalization, which would otherwise
    // append a slash *after* the #fragment and break the anchor.
    trailingSlash: false,
    items: entries.map((entry) => ({
      title: entry.data.version ? `${entry.data.title} (${entry.data.version})` : entry.data.title,
      description: entry.data.summary,
      pubDate: entry.data.date,
      link: `/changelog/#${entry.id}`,
    })),
  });
}
