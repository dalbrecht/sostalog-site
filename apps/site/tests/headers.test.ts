import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const HEADERS_PATH = fileURLToPath(new URL('../public/_headers', import.meta.url));
const REDIRECTS_PATH = fileURLToPath(new URL('../public/_redirects', import.meta.url));

describe('_headers', () => {
  const text = readFileSync(HEADERS_PATH, 'utf-8');

  it('applies HSTS to all paths', () => {
    expect(text).toMatch(/^\/\*$/m);
    expect(text).toMatch(/Strict-Transport-Security:\s*max-age=31536000;\s*includeSubDomains;\s*preload/);
  });

  it('sets X-Content-Type-Options', () => {
    expect(text).toMatch(/X-Content-Type-Options:\s*nosniff/);
  });

  it('sets X-Frame-Options to DENY', () => {
    expect(text).toMatch(/X-Frame-Options:\s*DENY/);
  });

  it('sets a strict Referrer-Policy', () => {
    expect(text).toMatch(/Referrer-Policy:\s*strict-origin-when-cross-origin/);
  });

  it('disables interest-cohort and browsing-topics', () => {
    expect(text).toMatch(/Permissions-Policy:.*interest-cohort=\(\).*browsing-topics=\(\)/);
  });

  it('ships a self-only CSP', () => {
    expect(text).toMatch(/Content-Security-Policy:.*default-src 'self'/);
    expect(text).toMatch(/Content-Security-Policy:.*frame-ancestors 'none'/);
    expect(text).toMatch(/Content-Security-Policy:.*base-uri 'self'/);
    expect(text).toMatch(/Content-Security-Policy:.*form-action 'none'/);
  });

  it('does NOT set COOP/COEP (per spec § 4.5)', () => {
    expect(text).not.toMatch(/Cross-Origin-Opener-Policy/);
    expect(text).not.toMatch(/Cross-Origin-Embedder-Policy/);
  });
});

describe('_redirects', () => {
  const text = readFileSync(REDIRECTS_PATH, 'utf-8');

  it('redirects www to apex with 301', () => {
    expect(text).toMatch(/https:\/\/www\.sostalog\.com\/\*\s+https:\/\/sostalog\.com\/:splat\s+301/);
  });
});
