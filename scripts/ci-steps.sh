#!/usr/bin/env bash
# THIS REPO'S CI GATE: .github/workflows/pages.yml ("Validate Site") step for step, sourced by scripts/ci-local.sh
# inside a CLEAN worktree ($WT). The first failing step ends the gate, as the workflow stops. Keep it in step
# with pages.yml (deploy.yml repeats its build/lint/tsc/validate:seo steps before deploying).
CI_NODE=22
ci_steps() {
  run npm-ci . npm ci --no-audit --no-fund
  run node-version . node --version
  # Hermetic probes (subscribe endpoint + host middleware): before the build, so it fails in seconds.
  run test . npm test
  run build . npm run build
  run lint . npm run lint
  run tsc . npx tsc --noEmit
  run validate-seo . npm run validate:seo
  # The footer signup in a real browser against the static export. macOS has no apt, so no --with-deps.
  run playwright-chromium . npx playwright install chromium
  run e2e-footer-signup . bash -c '
    npx --yes serve out -l 4321 --no-clipboard > /tmp/ci-local-serve.log 2>&1 &
    SERVE=$!
    trap "kill $SERVE 2>/dev/null" EXIT
    for _ in $(seq 1 30); do curl -sf -o /dev/null http://127.0.0.1:4321/privacy && break; sleep 1; done
    # Hard assert the bind: a probe pointed at nothing must not pass as a probe that passed.
    curl -sf -o /dev/null http://127.0.0.1:4321/privacy
    PS_TEST_BASE_URL=http://127.0.0.1:4321 npm run test:e2e'
}
ci_summary() { printf 'probes, build, lint, tsc, seo, browser e2e green'; }
