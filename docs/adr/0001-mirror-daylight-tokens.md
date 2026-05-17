# 0001 — Mirror Daylight tokens from the sosta repo

**Status:** Accepted
**Date:** 2026-05-16
**Context:** docs/superpowers/specs/2026-05-16-sosta-marketing-site-design.md § 6

## Context

The marketing site shares a visual language with the sosta app. The
canonical source for the Daylight palette is `src/apps/shared/styles/tokens.css`
in the sosta repo. We need a way to keep the marketing site visually
consistent with the app without coupling the two repositories at the
package level.

## Decision

We vendor the relevant subset of Daylight tokens into the marketing repo
as a one-time copy. The mirrored file (`apps/site/src/styles/tokens.css`)
carries a comment header naming its source path, source commit SHA, and
mirror date.

The mirrored subset is: surface, foreground, border, the rose accent only
(no ochre/moss/blue secondaries — those map to app-specific affordances),
status (success/danger/warn), shadows, radius, and spacing. App-component
variables (`--hashtag-*`, `--frozen-fg`) are not mirrored.

A Vitest test (`apps/site/tests/tokens.test.ts`) asserts that every
required variable is defined and that no excluded variable has leaked in.

## Consequences

- Visual drift between app and marketing site is possible. We accept
  manual re-mirroring on Daylight palette changes; the brand surface is
  small enough that occasional drift is cheaper than the workspace
  plumbing for a shared package.
- The marketing site has zero runtime dependency on the sosta repo. It
  can be built and deployed independently.
- If re-mirroring becomes frequent (≥3 manual updates), revisit:
  publish tokens as a `@sosta/design-tokens` package consumed by both
  repos. Until then, this stays a documented manual process.

## Alternatives considered

- **Workspace package** — Publish tokens from sosta to npm and consume
  from both repos. Adds release plumbing and version coupling for a
  surface that rarely changes.
- **Single monorepo** — Move marketing site into the sosta repo as
  `apps/marketing/`. Considered and rejected in spec § 3; pollutes the
  PWA's dep graph and conflates two deploy targets.
- **Git submodule** — Submodule the sosta repo from the marketing repo
  and read tokens.css directly. Submodules are operationally fragile;
  the value is not worth the friction.
