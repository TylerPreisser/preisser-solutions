import { defineConfig } from "@playwright/test";

// Proof Stage gate (ADR-0016). Serves the BUILT export straight from out/
// through context.route (tests/e2e/lib/serve-out.ts): no server, no port, so a
// squatting server can never answer for this build (CLAUDE.md, matrix traps).
// Real Safari is not here; it is a separate, manual leg of the matrix.
export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: /.*\.spec\.ts$/,
  outputDir: "./test-results/e2e-artifacts",
  fullyParallel: true,
  forbidOnly: true,
  retries: 0,
  // This Mac runs several sessions at once; three workers keep the gate steady.
  workers: process.env.PS_E2E_WORKERS ? Number(process.env.PS_E2E_WORKERS) : 3,
  timeout: 60_000,
  reporter: [["list"]],
  projects: [
    { name: "chromium", use: { browserName: "chromium" } },
    { name: "webkit", use: { browserName: "webkit" } },
    { name: "firefox", use: { browserName: "firefox" } },
  ],
});
