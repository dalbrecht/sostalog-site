# sostalog-site — Claude Code Guide

## Project Overview

Sostalog-site is the marketing site for [sosta](https://app.sostalog.com), hosted at `https://sostalog.com`. A single-page Astro 6 + Tailwind 4 site, statically generated, zero application JavaScript, deployed to Cloudflare Workers.

The Daylight visual language is mirrored from the sosta app — see `docs/adr/0001-mirror-daylight-tokens.md`.

## Key Commands

```bash
make bootstrap         # Install deps
make dev               # Astro dev server (http://localhost:4321)
make build             # Production build to apps/site/dist
make preview           # Preview the production build
make test              # Vitest + Playwright
make typecheck         # astro check
make lint              # astro check + format check
make fmt               # Prettier write
make ci                # Full pipeline
make pr                # Push current branch + open PR
```

## Conventions

- **Commits:** Conventional Commits format: `type(scope): subject`
  - Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `perf`, `ci`, `build`
  - Scopes: `site`, `repo`, `ci`, `deps`
- **Worktrees:** Use `git worktree add .claude/worktrees/<branch> -b <branch>` for isolated work
- **Work tracking:** GitHub Issues for all bugs, features, and tech debt
- **One task = one branch = one PR.** Work is not done until a PR exists.
- Never modify the root checkout from an automated agent session.

## Source of truth

The design spec lives in the sosta repo: `docs/superpowers/specs/2026-05-16-sosta-marketing-site-design.md`. Read it before non-trivial changes.

The implementation plan lives in the sosta repo: `docs/superpowers/plans/2026-05-16-sosta-marketing-site.md`.

## Architecture

- Astro 6 static-site generator.
- Tailwind 4 via `@tailwindcss/vite`, with `@theme` mapping CSS variables to utilities.
- Daylight tokens mirrored from sosta (see ADR 0001).
- Sagegrouse-initialized pnpm workspace with one app (`apps/site`). Two zero-stage content types are declared in `apps/site/sagegrouse.config.ts`: `changelog` (rendered inline on `/changelog`) and `blog` (a `/blog` index plus per-post pages at `/blog/<slug>/`, with an RSS feed at `/blog/rss.xml`).
- Cloudflare Workers Builds watches `main` and deploys to the `sostalog-site` Worker.

## Invariants

- The build ships zero application JavaScript (no `*.js` in `dist/`, no `<script>` in pages). CI guards this. Cloudflare may inject the Web Analytics beacon at the edge — that's accepted and called out in the smoke test.
- Total HTML + CSS weight is under 100 KB. CI guards this.
- The CTA links to `https://app.sostalog.com` — cross-origin to keep the two hosts cleanly separable.
- `www.sostalog.com` 301-redirects to the apex. The apex is canonical.

## Out of scope

Until a follow-up spec is written: docs, analytics, email capture, internationalization.
