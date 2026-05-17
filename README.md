# sostalog-site

The marketing site for [sosta](https://app.sostalog.com). Lives at [https://sostalog.com](https://sostalog.com).

## Stack

Astro 6 + Tailwind 4 + [sagegrouse](https://github.com/dalbrecht/sagegrouse). Deployed to Cloudflare Workers via Cloudflare Workers Builds.

## Develop

```bash
make bootstrap
make dev          # http://localhost:4321
```

## Build

```bash
make build        # apps/site/dist
make preview      # serve the build locally
```

## Deploy

`main` auto-deploys to production via Cloudflare Workers Builds. PRs get preview URLs commented on the PR.

## Design source of truth

The Daylight visual language is mirrored from the [sosta repo](https://github.com/dalbrecht/sosta) — see [docs/adr/0001-mirror-daylight-tokens.md](docs/adr/0001-mirror-daylight-tokens.md).

## License

[MIT](LICENSE)
