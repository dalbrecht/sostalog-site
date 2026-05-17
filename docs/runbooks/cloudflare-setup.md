# Cloudflare setup runbook — sostalog-site

One-time configuration to wire `dalbrecht/sostalog-site` to a new Cloudflare Worker named `sostalog-site` serving `https://sostalog.com` and `https://www.sostalog.com`.

## Prerequisites

- Cloudflare account with the `sostalog.com` zone already in your account (registered via Cloudflare Registrar per the sosta hosting spec).
- GitHub repo `dalbrecht/sostalog-site` exists and `main` has at least one passing CI build.

## 1. Create the Worker

1. Open `dash.cloudflare.com` → Workers & Pages → Create.
2. Choose **Import a repository**. Connect to GitHub if not already.
3. Select `dalbrecht/sostalog-site`.
4. Configure:
   - **Project name:** `sostalog-site`
   - **Production branch:** `main`
   - **Build command:** `pnpm install --frozen-lockfile && pnpm --filter @sostalog/site build`
   - **Build output directory:** `apps/site/dist`
   - **Root directory:** (leave blank — repo root)
   - **Environment variables:** none.

5. Click **Save and Deploy.** First build takes ~2-3 minutes.

## 2. Bind custom domains

After the Worker exists:

1. Workers & Pages → `sostalog-site` → Settings → Domains & Routes.
2. Add custom domain: `sostalog.com`. Cloudflare creates the AAAA/A records automatically.
3. Add custom domain: `www.sostalog.com`. Same automatic DNS.
4. Wait ~30 seconds for TLS certs to propagate.

## 3. Verify the redirect

```bash
curl -sI https://www.sostalog.com/ | head -3
```

Expected: `HTTP/2 301` and `location: https://sostalog.com/`.

If the redirect doesn't fire, check `public/_redirects` was committed and the latest build includes it (`apps/site/dist/_redirects`).

## 4. Configure GitHub branch protection

1. `github.com/dalbrecht/sostalog-site` → Settings → Branches → Add branch ruleset.
2. Branch name pattern: `main`.
3. Enable:
   - Require a pull request before merging.
   - Require status checks to pass: `typecheck`, `lint`, `test`, `build`.
   - Require branches to be up to date before merging.
   - Block force pushes.
4. Save.

## 5. Smoke test

```bash
# Headers present
curl -sI https://sostalog.com/ | grep -iE 'strict-transport|x-content-type|x-frame|referrer|permissions|content-security'

# Redirect
curl -sI https://www.sostalog.com/ | grep -iE 'location|301'

# 404 page renders
curl -s https://sostalog.com/this-does-not-exist | grep -i 'nothing here'
```

## 6. Rollback

If a deploy breaks production:

1. Workers & Pages → `sostalog-site` → Deployments.
2. Find the last known-good deployment, click **Rollback**.
3. Open a PR in `dalbrecht/sostalog-site` to fix the source.
