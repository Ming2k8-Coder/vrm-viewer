import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  testMatch: '**/*.spec.js',
  timeout: 60000,
  expect: {
    timeout: 35000,
  },
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    headless: true,
    launchOptions: {
      args: ['--use-gl=angle', '--ignore-gpu-blocklist', '--no-sandbox'],
    },
  },
  projects: [
    {
      name: 'chromium',
      testDir: './tests/e2e',
      testMatch: '**/*.spec.js',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npx serve -l 3000 .',
    port: 3000,
    reuseExistingServer: true,
    timeout: 120000,
  },
});
