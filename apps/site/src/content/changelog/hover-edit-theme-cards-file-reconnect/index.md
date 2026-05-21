---
title: 'Hover to edit, theme preview cards, and one-click file reconnect'
date: 2026-05-21
version: v0.3.0
summary: Entry rows are quieter with a hover-to-edit affordance, the theme picker became live-preview cards, and your journal file reconnects in one click after a reload.
---

### What's new

- **Quieter entry rows, hover to edit.** The always-visible "editable for…" countdown and the "frozen" badge are gone. Hover or focus an entry and an editable one reveals an edit pencil — with the time left to edit in its tooltip — while a frozen entry shows a lock. The record stays still until you reach for it, and the pencil is still reachable by keyboard.
- **Theme picker, redesigned.** `Settings → Theme` is now a grid of preview cards. Each card shows a miniature of its theme, and hovering or focusing one live-previews it across the whole app before you commit; **System** shows a split light/dark preview.
- **One-click file reconnect.** Your browser keeps the `.sosta` file you picked across reloads but drops the write permission. Instead of silently downgrading you to download-only, SostaLog now keeps the file connected and — when the grant lapses — offers a single **Reconnect** that re-grants access and resumes auto-save, without re-picking the file.

### Polish

- The File backend panel in `Settings` has a clearer primary/secondary button hierarchy and a status dot showing whether your file is connected, needs reconnecting, or is in manual/download mode.
- Settings modal dividers are now visible in dark mode.
- The composer's focus ring no longer doubles up or clips along its bottom edge.
- Sidebar tag counts update the moment you add or remove a `#hashtag`, instead of waiting for a reload.
- The install prompt no longer lingers after you've installed SostaLog as an app.
- The About panel has been rewritten to better describe what SostaLog is and how your entries stay on your device. SostaLog is now proprietary software (© 2026 Don Albrecht).
