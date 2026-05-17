import { defineConfig, devices } from '@playwright/test';

// Smoke tests hit the deployed production site (https://sostalog.com and
// https://www.sostalog.com). They share the test directory with the local
// e2e suite but use a distinct config so they don't spin up the local dev
// server, don't inherit a localhost baseURL, and aren't pulled into the
// default `test:e2e` run. Invoke via `pnpm test:smoke`.
export default defineConfig({
  testDir: './tests',
  testMatch: ['**/smoke.spec.ts'],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium-desktop', use: { ...devices['Desktop Chrome'] } }],
});
