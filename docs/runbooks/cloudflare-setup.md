# Cloudflare setup runbook — sostalog-site

One-time configuration to wire `dalbrecht/sostalog-site` to a new Cloudflare Worker named `sostalog-site` serving `https://sostalog.com` and `https://www.sostalog.com`.

## Prerequisites

- Cloudflare account with the `sostalog.com` zone already in your account (registered via Cloudflare Registrar per the sosta hosting spec).
- GitHub repo `dalbrecht/sostalog-site` exists and `main` has at least one passing CI build.

## 1. Create the Worker

1. Open `dash.cloudflare.com` → Workers & Pages → Create.
2. Choose **Import a repository**. Connect to GitHub if not already.
3. Select `dalbrecht/sostalog-site`.
4. Configure (Cloudflare's unified Workers Builds UI as of mid-2026 has three build fields plus the project metadata):
   - **Project name:** `sostalog-site`
   - **Production branch:** `main`
   - **Path:** `apps/site` — the monorepo subdirectory where `wrangler.toml` lives. Leaving this blank causes Wrangler to fail with "The Wrangler application detection logic has been run in the root of a workspace instead of targeting a specific project." The build and deploy commands both execute from this directory.
   - **Build command:** `pnpm install --frozen-lockfile && pnpm build` — pnpm walks up from `apps/site/` to find the workspace's `pnpm-workspace.yaml` and `pnpm-lock.yaml`, so the install correctly resolves the monorepo. `pnpm build` runs the local `build` script (`astro build`), which writes to `apps/site/dist/`.
   - **Deploy command:** `npx wrangler deploy` (default — leave as-is). Wrangler reads `apps/site/wrangler.toml`, which declares `[assets] directory = "./dist"`, and uploads the built site.
   - **Environment variables:** none.

5. Click **Save and Deploy.** First build takes ~2-3 minutes.

## 2. Bind the apex custom domain

After the Worker exists:

1. Workers & Pages → `sostalog-site` → Settings → Domains & Routes.
2. Add custom domain: `sostalog.com`. Cloudflare creates the AAAA/A records automatically.
3. Wait ~30 seconds for the TLS cert to propagate.

Do NOT bind `www.sostalog.com` to the Worker — the `www` host redirects to the apex via a zone-level Redirect Rule (next section), so it never reaches the Worker. Binding it would double-handle the request and prevent the redirect from firing.

## 2a. Configure www → apex Redirect Rule (zone-level)

Workers static-assets `_redirects` only accepts relative URLs, so it cannot perform host-to-host redirects. We use a Cloudflare Redirect Rule at the zone level instead.

1. dash.cloudflare.com → `sostalog.com` zone → Rules → Redirect Rules → **Create rule**.
2. **Rule name:** `www to apex`.
3. **If incoming requests match:**
   - Field: `Hostname`
   - Operator: `equals`
   - Value: `www.sostalog.com`
4. **Then:**
   - Type: `Dynamic`
   - Expression: `concat("https://sostalog.com", http.request.uri.path)`
   - Status code: `301`
   - Preserve query string: ✅ (checked)
5. Click **Deploy.**

The DNS for `www.sostalog.com` must exist for the rule to fire. The simplest setup is a proxied CNAME `www → sostalog.com` (or an A/AAAA record pointing at any Cloudflare-proxied target). Cloudflare's Redirect Rules intercept BEFORE the request hits the Worker, so the destination doesn't matter as long as the host resolves through Cloudflare.

## 3. Verify the redirect

```bash
curl -sI https://www.sostalog.com/ | head -3
```

Expected: `HTTP/2 301` and `location: https://sostalog.com/`.

If the redirect doesn't fire, check that:
- The Redirect Rule is **enabled** (toggle in the dashboard).
- DNS for `www.sostalog.com` resolves through Cloudflare (orange-cloud proxied).
- The Worker does NOT have `www.sostalog.com` bound as a custom domain (Section 2 step).

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
