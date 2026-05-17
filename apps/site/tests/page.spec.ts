import { expect, test } from '@playwright/test';

test.describe('Landing page', () => {
  test('hero CTA links to app.sostalog.com', async ({ page }) => {
    await page.goto('/');
    const cta = page.getByRole('link', { name: /open sosta/i }).first();
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', 'https://app.sostalog.com');
  });

  test('header renders wordmark and GitHub link', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('banner').getByText('sostalog')).toBeVisible();
    const gh = page.getByRole('banner').getByRole('link', { name: /github/i });
    await expect(gh).toHaveAttribute('href', 'https://github.com/dalbrecht/sosta');
  });

  test('hero renders headline and sub-copy', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Capture the day in the spaces between.');
    await expect(page.getByText(/A timestamped note here\./)).toBeVisible();
  });

  test('showcase image is present, lazy-loaded, and has width/height', async ({ page }) => {
    await page.goto('/');
    const img = page.getByRole('img', { name: /sosta timeline/i });
    await expect(img).toBeVisible();
    await expect(img).toHaveAttribute('loading', 'lazy');
    await expect(img).toHaveAttribute('decoding', 'async');
    await expect(img).toHaveAttribute('width');
    await expect(img).toHaveAttribute('height');
  });

  test('three beats render: Capture, Tag, Freeze', async ({ page }) => {
    await page.goto('/');
    const beats = page.locator('section[aria-label="How sosta works"] h3');
    await expect(beats).toHaveText(['Capture.', 'Tag.', 'Freeze.']);
  });

  test('pillars section renders heading and four bullets', async ({ page }) => {
    await page.goto('/');
    const pillars = page.locator('section[aria-label="Why sosta"]');
    await expect(pillars.getByRole('heading', { level: 2 })).toHaveText('Yours. Quiet. Free.');
    await expect(pillars.locator('li')).toHaveCount(4);
  });

  test('page has exactly two "Open sosta" CTAs', async ({ page }) => {
    await page.goto('/');
    const ctas = page.getByRole('link', { name: /^open sosta/i });
    await expect(ctas).toHaveCount(2);
  });

  test('footer renders license and year', async ({ page }) => {
    await page.goto('/');
    const footer = page.getByRole('contentinfo');
    await expect(footer).toContainText('MIT');
    await expect(footer).toContainText('2026');
  });

  test('header nav contains a Changelog link', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Main' });
    const link = nav.getByRole('link', { name: 'Changelog' });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/changelog');
  });

  test('footer sitemap row contains brand and Changelog link', async ({ page }) => {
    await page.goto('/');
    const sitemap = page.getByRole('navigation', { name: 'Footer' });
    await expect(sitemap).toBeVisible();
    await expect(sitemap.getByRole('link', { name: 'sostalog' })).toHaveAttribute('href', '/');
    await expect(sitemap.getByRole('link', { name: 'Changelog' })).toHaveAttribute(
      'href',
      '/changelog',
    );
  });
});
