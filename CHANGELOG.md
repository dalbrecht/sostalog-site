# Changelog

All notable changes to this project are documented here. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- `/changelog` page surfacing hand-curated sosta product updates. Header gains a `Changelog` nav link (`aria-current="page"` on the active route); Footer gains a sitemap row above the license line. Sagegrouse pipeline activated for the first time with the `changelog` content type (zero-stage `location:` config). Per-page weight guard in CI extended to every `dist/**/*.html`.

## [1.0.0] — 2026-05-17

### Added

- Initial marketing site live at `https://sostalog.com`.
- Single-page landing with hero, showcase, three beats (Capture / Tag / Freeze), pillars ("Yours. Quiet. Free."), repeat CTA, and footer.
- Daylight tokens mirrored from sosta (see ADR 0001) and wired to Tailwind 4 via `@theme`.
- Self-hosted Crimson Pro (serif headings) and Geist Sans (body).
- Cloudflare Worker `sostalog-site` serving static assets with HSTS, CSP, X-Frame-Options, Referrer-Policy, and Permissions-Policy headers via `public/_headers`.
- `www.sostalog.com` 301-redirects to the apex via a Cloudflare zone-level Redirect Rule.
- GitHub Actions CI: typecheck, lint, test, build — with page-weight (under 100 KB HTML+CSS) and zero-JS guards.
- Sagegrouse pipeline initialized (empty config) ready to grow a changelog or blog.
- Production smoke suite (`tests/smoke.spec.ts`) covering apex status, security headers, www redirect, CTA target, app.sostalog.com regression, and zero-application-JS verification.
