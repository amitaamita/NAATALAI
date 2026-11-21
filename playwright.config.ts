import { defineConfig, devices } from "@playwright/test";

// Parcours de bout en bout, simulés sur un smartphone Android (CA15).
export default defineConfig({
  testDir: "tests/e2e",
  use: {
    baseURL: "http://localhost:3000",
    ...devices["Pixel 5"],
  },
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
