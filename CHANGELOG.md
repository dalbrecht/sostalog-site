# Changelog

All notable changes to this project are documented here. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- Initial marketing site at `https://sostalog.com`.
- Single-page landing with hero, showcase, three beats (Capture / Tag / Freeze), pillars ("Yours. Quiet. Free."), repeat CTA, and footer.
- Daylight tokens mirrored from sosta (see ADR 0001).
- Cloudflare Worker `sostalog-site` with `_headers` (HSTS, CSP, etc.) and `_redirects` (www → apex).
- GitHub Actions CI: typecheck, lint, test, build with page-weight and zero-JS guards.
- Sagegrouse pipeline initialized (empty config) ready to grow a changelog or blog.
