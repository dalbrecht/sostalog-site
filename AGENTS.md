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

The site ships no runtime JavaScript. No `client:*` directives, no `<script>` tags in pages, no third-party widgets. CI fails the build if a `*.js` bundle is produced or an inline `<script>` is detected. If a change genuinely needs JS, raise it in a design discussion before implementing.

## Sagegrouse

The repo has `@sagegrouse/core`, `@sagegrouse/astro`, and `@sagegrouse/cli` installed but no content types declared. `sagegrouse.config.ts` is intentionally empty. To add a blog or changelog later, declare a content type, add the stage folders, and register the collection in `src/content.config.ts` — see [sagegrouse docs](https://github.com/dalbrecht/sagegrouse).
