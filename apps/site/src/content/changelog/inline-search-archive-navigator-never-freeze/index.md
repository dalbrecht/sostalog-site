---
title: 'Search where you write, a year-by-month archive, and a Never-freeze option'
date: 2026-05-22
version: v0.4.0
summary: Search now lives inline in the sidebar, you can browse straight to any past day through a Year › Month › Day archive, and freezing entries is now optional.
---

### What's new

- **Search where you write.** The sidebar's `⌘K Search` button is now an inline search box. Type a query and press Enter to search — results appear right in the sidebar, no modal in the way. Clicking a result jumps to that entry's day, and clicking a `#hashtag` runs the same search. The advanced query builder is still a click (or `⌘K`) away when you need it.
- **Browse your archive by date.** The old date picker is replaced by a collapsible **Year › Month › Day** navigator that lists only the days you actually wrote something. Drill down from a year to a month to a specific day and the timeline jumps straight there — today, yesterday, and the day before stay on the quick buttons and activity heatmap.
- **Make entries editable forever.** `Settings → Freeze window` now has a **Never** option. Pick it and entries stay editable (and deletable) indefinitely instead of locking after the freeze window — useful if you treat your journal as a living document rather than an append-only log.

### Polish

- Timestamps moved into their own column in the timeline, so every entry's content shares one clean left edge whether or not it has a title.
- Links in the Settings and About panels now use the theme blue in dark mode, matching the rest of the app instead of falling back to the default link color.
- Diagnostics is no longer a separate Settings tab — it's tucked into a collapsible section at the bottom of the **About** panel, keeping the settings surface tidier.
