import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  // Local e2e suite. Smoke tests live in `tests/smoke.spec.ts` and run
  // under a separate config (playwright.smoke.config.ts), so explicitly
  // exclude them here to keep `test:e2e` fast and dev-server-bound.
  testMatch: ['**/page.spec.ts'],
  testIgnore: ['**/smoke.spec.ts'],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'pnpm run dev',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  projects: [
    { name: 'chromium-desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 5'] } },
  ],
});
