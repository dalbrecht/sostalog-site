---
title: 'Post-launch update: edit entries, jump to a date, theme override'
date: 2026-05-18
version: v0.2.0
summary: You can now edit entries within the freeze window, jump to any day via the activity heatmap, pin a theme, and the timeline got a visual refresh.
---

### What's new

- **Edit entries within the freeze window.** Each entry shows a pencil icon while it's still editable; clicking opens the composer pre-seeded with the entry's body. You can also delete from there. Once the entry freezes (24 hours by default), the pencil disappears.
- **Jump to any day.** Click an activity heatmap cell to scroll the timeline to that day. The URL updates to `#date/YYYY-MM-DD` so you can deep-link a specific day.
- **Theme override.** `Settings → Theme` lets you pin **Light**, **Dark**, or follow your **System** preference. Your choice persists across reloads.
- **Multi-tab safety.** If you open sosta in a second tab of the same browser, that tab now shows a banner explaining the journal is already open elsewhere and disables writes — your storage stays consistent.

### Polish

- Timeline rows redesigned — the card chrome is gone, replaced with hairline separators between entries in the same day. Titles now share the timestamp line and there's a small status pill (frozen badge or editable countdown).
- `Settings → Freeze window` surfaces the per-unit minimum (60 minutes / 1 hour / 1 day) on the custom input, so a value below the floor no longer fails silently.
- Settings panels trap keyboard focus inside the modal while open and return focus to the control that opened them on close.
- Your first entry appears in the timeline immediately after saving — no longer needs a reload.
