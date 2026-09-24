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
  # A FREE port, never the workflow's fixed 4321: on this Mac other sessions' servers squat ports and answer
  # 200 with a foreign build (CLAUDE.md, browser matrix traps); the first gate run hit exactly that and the
  # probe refused ("NOT the current build"). The probe's copy check is the fingerprint that the served page
  # is this worktree's export.
  run e2e-footer-signup . bash -c '
    PORT=$("$CI_PYTHON3" -c "import socket; s=socket.socket(); s.bind((\"127.0.0.1\", 0)); print(s.getsockname()[1])")
    npx --yes serve out -l "$PORT" --no-clipboard > "$WT/.ci-local-serve.log" 2>&1 &
    SERVE=$!
    trap "kill $SERVE 2>/dev/null" EXIT
    for _ in $(seq 1 30); do curl -sf -o /dev/null "http://127.0.0.1:$PORT/privacy" && break; sleep 1; done
    # Hard assert the bind: a probe pointed at nothing must not pass as a probe that passed.
    curl -sf -o /dev/null "http://127.0.0.1:$PORT/privacy"
    PS_TEST_BASE_URL="http://127.0.0.1:$PORT" npm run test:e2e'
}
ci_summary() { printf 'probes, build, lint, tsc, seo, browser e2e green'; }
