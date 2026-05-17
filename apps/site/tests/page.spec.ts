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
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Capture the day in the spaces between.',
    );
    await expect(page.getByText(/A timestamped note here\./)).toBeVisible();
  });
});
