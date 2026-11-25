#!/usr/bin/env bash
# THIS REPO'S CI GATE: .github/workflows/pages.yml ("Validate Site") step for step, sourced by scripts/ci-local.sh
# inside a CLEAN worktree ($WT). The first failing step ends the gate, as the workflow stops. Keep it in step
# with pages.yml (deploy.yml repeats its build/lint/tsc/validate:seo steps before deploying).
CI_NODE=22
ci_steps() {
  run npm-ci . npm ci --no-audit --no-fund
  run node-version . node --version
  # Hermetic probes (contact endpoint + host middleware): before the build, so it fails in seconds.
  run test . npm test
  run build . npm run build
  run lint . npm run lint
  run tsc . npx tsc --noEmit
  run validate-seo . npm run validate:seo
  # The footer probe launches chromium only (tests/footer.probe.mjs). The other two browsers are the Proof Stage
  # matrix's and are installed below, only when that step runs. macOS has no apt, so no --with-deps.
  run playwright-chromium . npx playwright install chromium
  # A FREE port, never the workflow's fixed 4321: on this Mac other sessions' servers squat ports and answer
  # 200 with a foreign build (CLAUDE.md, browser matrix traps); the first gate run hit exactly that and the
  # probe refused ("NOT the current build"). The probe's copy check is the fingerprint that the served page
  # is this worktree's export.
  run e2e . bash -c '
    PORT=$("$CI_PYTHON3" -c "import socket; s=socket.socket(); s.bind((\"127.0.0.1\", 0)); print(s.getsockname()[1])")
    npx --yes serve out -l "$PORT" --no-clipboard > "$WT/.ci-local-serve.log" 2>&1 &
    SERVE=$!
    trap "kill $SERVE 2>/dev/null" EXIT
    for _ in $(seq 1 30); do curl -sf -o /dev/null "http://127.0.0.1:$PORT/privacy" && break; sleep 1; done
    # Hard assert the bind: a probe pointed at nothing must not pass as a probe that passed.
    curl -sf -o /dev/null "http://127.0.0.1:$PORT/privacy"
    # The four probes only read the static export and each launches its own browser: run them side by side
    # (npm run test:e2e runs them one after another). Any failing probe fails the step.
    export PS_TEST_BASE_URL="http://127.0.0.1:$PORT"; PIDS=""
    for P in footer how-we-work marcommand-card cta-blend; do node "tests/$P.probe.mjs" & PIDS="$PIDS $!"; done
    FAIL=0; for PID in $PIDS; do wait "$PID" || FAIL=1; done; exit $FAIL'
  # Proof Stage (ADR-0016). The privacy guard proves it can fail before it is trusted, then scans
  # out/. The real run reads the deny list at PS_DEMO_DENYLIST or ~/.config/preisser/demo-denylist.txt
  # and FAILS CLOSED when it is missing.
  run demo-privacy-selftest . node tests/demo-privacy.probe.mjs --self-test
  run demo-privacy . node tests/demo-privacy.probe.mjs
  # The Proof Stage matrix (3 browsers x 14 viewports x 2 themes) is the slow step. It runs when the change can
  # reach the stage: its scenes and data, the case-study pages, shared layout/styles, or the test setup. A change
  # elsewhere (a home card's copy or link) skips it; a full gate and the nightly always run it.
  if ci_touched 'src/components/case-study/**' 'src/data/demos/**' 'src/data/case-studies/**' 'src/app/case-studies/**' \
      'src/app/layout.tsx' 'src/app/globals.css' 'src/styles/**' 'src/components/layout/**' 'src/components/ui/**' \
      'src/lib/**' 'tests/e2e/**' 'playwright.config.ts' 'package.json' 'package-lock.json' 'next.config.ts' \
      'postcss.config.mjs' 'scripts/ci-steps.sh'; then
    run playwright-stage-browsers . npx playwright install webkit firefox
    # Workers: idle cores, floor 4, ceiling 12; PS_E2E_WORKERS overrides (playwright.config.ts).
    export PS_E2E_WORKERS="${PS_E2E_WORKERS:-$(node -e "const o=require('os');console.log(Math.min(12,Math.max(4,Math.floor(o.cpus().length-o.loadavg()[0]))))")}"
    run e2e-demo-stage . npx playwright test --config playwright.config.ts
  else
    ci_skip e2e-demo-stage "the change does not reach the Proof Stage"
  fi
}
ci_summary() { printf 'probes, build, lint, tsc, seo, browser e2e, demo privacy, demo stage green'; }
