import { expect, test } from '@playwright/test';

const PROD_URL = 'https://sostalog.com';

test.describe('Production smoke tests', () => {
  test('apex returns 200', async ({ request }) => {
    const res = await request.get(PROD_URL);
    expect(res.status()).toBe(200);
  });

  test('all required security headers are present', async ({ request }) => {
    const res = await request.get(PROD_URL);
    const headers = res.headers();
    expect(headers['strict-transport-security']).toMatch(/max-age=31536000/);
    expect(headers['x-content-type-options']).toBe('nosniff');
    expect(headers['x-frame-options']).toBe('DENY');
    expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
    expect(headers['content-security-policy']).toMatch(/default-src 'self'/);
    expect(headers['permissions-policy']).toMatch(/interest-cohort=\(\)/);
  });

  test('www redirects to apex', async ({ request }) => {
    // maxRedirects: 0 disables automatic redirect-following so we can assert
    // on the 301 response itself. Per Playwright types/types.d.ts, this
    // option lives on the per-call methods (.get/.fetch/.post/etc.),
    // not on APIRequestContext.newContext.
    const res = await request.get('https://www.sostalog.com/', { maxRedirects: 0 });
    expect(res.status()).toBe(301);
    expect(res.headers()['location']).toBe('https://sostalog.com/');
  });

  test('CTA links to app.sostalog.com', async ({ page }) => {
    await page.goto(PROD_URL);
    const cta = page.getByRole('link', { name: /open sosta/i }).first();
    await expect(cta).toHaveAttribute('href', 'https://app.sostalog.com');
  });

  test('app.sostalog.com still loads (regression check)', async ({ request }) => {
    const res = await request.get('https://app.sostalog.com/');
    expect(res.status()).toBe(200);
  });

  test('page ships no application JS', async ({ page }) => {
    // Our build emits zero JS (CI guards this against dist/), but Cloudflare
    // auto-injects the Web Analytics beacon at the edge for sites with
    // analytics enabled. The beacon is ~1KB, async, cookie-free, and out of
    // our build's hands — allow it but fail on any other script.
    //
    // Match the full URL prefix (not just hostname) so a different script
    // served from the same host would still fail. The beacon URL looks like
    // https://static.cloudflareinsights.com/beacon.min.js/<hash>.
    const ALLOWED_SCRIPT_URL_PREFIX = 'https://static.cloudflareinsights.com/beacon.min.js/';
    const unexpectedScripts: string[] = [];
    page.on('request', (req) => {
      if (req.resourceType() !== 'script') return;
      if (!req.url().startsWith(ALLOWED_SCRIPT_URL_PREFIX)) {
        unexpectedScripts.push(req.url());
      }
    });
    await page.goto(PROD_URL, { waitUntil: 'networkidle' });
    expect(unexpectedScripts).toEqual([]);
  });

  test('/changelog returns 200 with required security headers', async ({ request }) => {
    const res = await request.get(`${PROD_URL}/changelog`);
    expect(res.status()).toBe(200);
    const headers = res.headers();
    expect(headers['strict-transport-security']).toMatch(/max-age=31536000/);
    expect(headers['content-security-policy']).toMatch(/default-src 'self'/);
    expect(headers['x-content-type-options']).toBe('nosniff');
    expect(headers['x-frame-options']).toBe('DENY');
  });
});
