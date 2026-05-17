# AGENTS.md — sostalog-site

This file contains guidance for AI agents working on this repo. Human contributors should also find it useful.

## Branch & PR conventions

- Branch naming: `type/description` in kebab-case (e.g., `feature/og-image`, `fix/footer-year`).
- One task = one branch = one PR. Work is not done until a PR exists.
- Use `git worktree add .claude/worktrees/<branch> -b <branch>` for isolated work.
- Never modify the root checkout from an automated agent session.
- All PRs must pass the `typecheck`, `lint`, `test`, and `build` CI jobs.

## Page-weight invariant

The page ships under 100 KB combined HTML+CSS. CI fails the build if this is exceeded. If a change pushes weight up, audit before merging — typically the cause is fonts (subset further?), CSS bloat (utility duplication?), or an inlined image that should be a public asset.

## Zero-JS invariant

The build ships no application JavaScript. No `client:*` directives, no `<script>` tags in pages, no third-party widgets in source. CI fails the build if a `*.js` bundle is produced or an inline `<script>` is detected in `dist/`. If a change genuinely needs JS, raise it in a design discussion before implementing.

Cloudflare may inject the Web Analytics beacon (`static.cloudflareinsights.com/beacon.min.js`) at the edge for sites with analytics enabled. The smoke test (`apps/site/tests/smoke.spec.ts`) allow-lists that one host and fails on anything else. If a new edge-injected script appears (e.g. a future Cloudflare feature), update the allow-list deliberately rather than broadening the check.

## Sagegrouse

The repo has `@sagegrouse/core`, `@sagegrouse/astro`, and `@sagegrouse/cli` installed but no content types declared. `sagegrouse.config.ts` is intentionally empty. To add a blog or changelog later, declare a content type, add the stage folders, and register the collection in `src/content.config.ts` — see [sagegrouse docs](https://github.com/dalbrecht/sagegrouse).
