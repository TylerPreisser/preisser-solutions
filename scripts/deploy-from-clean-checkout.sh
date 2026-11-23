#!/usr/bin/env bash
# Deploy the site (Cloudflare Pages project `preisser-solutions`, https://preissersolutions.com) from THIS machine.
# Replaces .github/workflows/deploy.yml (Deploy Site): same build, lint, tsc, validate:seo, same pinned wrangler, same
# `pages deploy out --branch main`, same live-chunk proof. The validation in pages.yml (probes, e2e, privacy, stage) is
# the ci-local gate (scripts/ci-steps.sh); this script refuses a sha without a green ci-local status.
#
# Usage: scripts/deploy-from-clean-checkout.sh <sha> [--dry-run]
#   --dry-run  every gate and the full build; read-only Cloudflare calls only (whoami, deployments list); nothing
#              is uploaded. A failed gate is reported as "would refuse" instead of stopping.
# Run it through _workspace/tools/deploy.sh <repo dir> <sha> [--dry-run], which exports CLOUDFLARE_API_TOKEN from the vault.
# Rollback is printed before the rollout and again at the end.
set -euo pipefail

SHA_ARG=""; DRY=0
for a in "$@"; do
  case "$a" in
    --dry-run) DRY=1 ;;
    -*) echo "unknown flag: $a (usage: deploy-from-clean-checkout.sh <sha on origin/main> [--dry-run])" >&2; exit 2 ;;
    *) [ -z "$SHA_ARG" ] || { echo "only one sha" >&2; exit 2; }; SHA_ARG="$a" ;;
  esac
done
[ -n "$SHA_ARG" ] || { echo "usage: deploy-from-clean-checkout.sh <sha on origin/main> [--dry-run]" >&2; exit 2; }

REPO="$(cd "$(dirname "$0")/.." && pwd)"
PROJECT="preisser-solutions"
HOST="https://preissersolutions.com"
GH_REPO="TylerPreisser/preisser-solutions"
WRANGLER="wrangler@4.53.0"
export CLOUDFLARE_ACCOUNT_ID="${CLOUDFLARE_ACCOUNT_ID:-af76b8aeaa433c3fd3c17ce77375062f}"

[ -n "${CLOUDFLARE_API_TOKEN:-}" ] || { echo "FATAL: CLOUDFLARE_API_TOKEN is unset; run through _workspace/tools/deploy.sh <repo dir> <sha>" >&2; exit 1; }

REFUSALS=0
refuse() {
  if [ "$DRY" = 1 ]; then echo "DRY-RUN would refuse: $*" >&2; REFUSALS=$((REFUSALS + 1)); else echo "FATAL: $*" >&2; exit 1; fi
}
[ "$DRY" = 1 ] && echo "== DRY RUN: nothing will be changed in production"

# One deployer at a time.
LOCK="${TMPDIR:-/tmp}/preisser-solutions-deploy.lock"
exec 9>"$LOCK"
flock -n 9 || { echo "FATAL: another preisser-solutions deploy holds $LOCK; one deployer at a time" >&2; exit 1; }

NODE_V="$(node -p 'process.versions.node')"
node -e 'const [a,b]=process.versions.node.split(".").map(Number); process.exit(a>22||(a===22&&b>=18)?0:1)' \
  || { echo "FATAL: node $NODE_V is below 22.18 (package.json engines)" >&2; exit 1; }

# ---- gates: sha is the tip of origin/main (deploy.yml's out-of-order guard) and green on ci-local --------------------
git -C "$REPO" fetch -q origin main
SHA="$(git -C "$REPO" rev-parse "${SHA_ARG}^{commit}")"
MAIN_SHA="$(git -C "$REPO" rev-parse origin/main)"
git -C "$REPO" merge-base --is-ancestor "$SHA" origin/main || refuse "$SHA is not on origin/main (push it first)"
[ "$SHA" = "$MAIN_SHA" ] || refuse "$SHA is not the tip of origin/main ($MAIN_SHA); deploying it would roll production back"
GH_TOKEN="$(gh auth token --user TylerPreisser 2>/dev/null || true)"; export GH_TOKEN
STATUS_LINE="$(gh api "repos/$GH_REPO/commits/$SHA/status" --jq '[.statuses[] | select(.context=="ci-local")][0] | "\(.state)\t\(.description)"' 2>/dev/null || true)"
STATE="${STATUS_LINE%%$'\t'*}"
if [ "$STATE" = "success" ]; then
  echo "ci-local green for $SHA: ${STATUS_LINE#*$'\t'}"
else
  refuse "$SHA has no green ci-local status (found '${STATE:-none}'); run _workspace/tools/ci-local/run.sh --repo \"$REPO\" --status $SHA in the background and wait"
fi
unset GH_TOKEN

# ---- clean scratch worktree of exactly $SHA ----------------------------------------------------------------------------
SCRATCH="$(mktemp -d)"; WT="$SCRATCH/site-deploy"
git -C "$REPO" worktree add --detach "$WT" "$SHA" >/dev/null
cleanup() { git -C "$REPO" worktree remove --force "$WT" >/dev/null 2>&1 || true; rm -rf "$SCRATCH"; }
trap cleanup EXIT
BUILD_SHA="$(git -C "$WT" rev-parse HEAD)"
[ "$BUILD_SHA" = "$SHA" ] || { echo "FATAL: worktree HEAD $BUILD_SHA != requested $SHA" >&2; exit 1; }
TS="$(date -u +%Y%m%dT%H%M%SZ)"
VERSION_TAG="${BUILD_SHA:0:7}-$TS"

# ---- BUILD (deploy.yml: npm ci, build, lint, tsc, validate:seo) -----------------------------------------------------------
echo "== building $BUILD_SHA ($VERSION_TAG) in $WT"
cd "$WT"
npm ci --no-audit --no-fund > "$SCRATCH/npm-ci.log" 2>&1 || { cat "$SCRATCH/npm-ci.log"; exit 1; }
npm run build
npm run lint
npx tsc --noEmit
npm run validate:seo
[ -f out/index.html ] || { echo "FATAL: build produced no out/index.html; not deploying" >&2; exit 1; }
CHUNK="$(grep -o '_next/static/chunks/app/page-[a-f0-9]*\.js' out/index.html | head -n1 || true)"
[ -n "$CHUNK" ] || { echo "FATAL: no app/page chunk found in out/index.html; not deploying" >&2; exit 1; }
# generate-sitemap.mjs (part of `npm run build`) rewrites scripts/sitemap-lastmod.json by design; nothing else may change.
DIRTY="$(git -C "$WT" status --porcelain | grep -v ' scripts/sitemap-lastmod.json$' || true)"
[ -z "$DIRTY" ] || { echo "FATAL: tree is dirty after the build: $(echo "$DIRTY" | head -5)" >&2; exit 1; }
echo "built; the home page chunk this build serves: $CHUNK"

# ---- prove the token, record the rollback target BEFORE rolling out ---------------------------------------------------
wr() { npx --yes "$WRANGLER" "$@"; }
wr whoami > "$SCRATCH/whoami.txt" 2>&1 || true
grep -q "$CLOUDFLARE_ACCOUNT_ID" "$SCRATCH/whoami.txt" || { echo "FATAL: the Cloudflare token cannot see account $CLOUDFLARE_ACCOUNT_ID" >&2; exit 1; }
echo "cloudflare token ok for account $CLOUDFLARE_ACCOUNT_ID"

wr pages deployment list --project-name "$PROJECT" --json > "$SCRATCH/deployments.json" 2> "$SCRATCH/deployments.err" \
  || { echo "FATAL: 'wrangler pages deployment list' failed, so no rollback target can be recorded:" >&2; cat "$SCRATCH/deployments.err" >&2; exit 1; }
PREV="$(python3 - "$SCRATCH/deployments.json" <<'PY'
import json, sys
raw = open(sys.argv[1]).read()
try:
    d = json.loads(raw[raw.index("["):raw.rindex("]") + 1])
except ValueError:
    print("PARSE_ERROR"); sys.exit(0)
prod = [x for x in d if x.get("Environment") == "Production" and x.get("Branch") == "main"]
print(("%s %s" % (prod[0]["Id"], prod[0].get("Source", "?"))) if prod else "PARSE_ERROR")   # newest first
PY
)"
[ "$PREV" != "PARSE_ERROR" ] || { echo "FATAL: cannot read the current production deployment from the deployments list:" >&2; head -c 600 "$SCRATCH/deployments.json" >&2; exit 1; }
PREV_ID="${PREV%% *}"; PREV_SRC="${PREV##* }"
# Pages has no wrangler rollback: the Cloudflare API rolls production back to an earlier deployment.
ROLLBACK="python3 ~/.claude/tools/secrets.py env PS_ADMIN_ENV.cloudflare_api_token:CLOUDFLARE_API_TOKEN -- sh -c 'curl -sS -X POST -H \"Authorization: Bearer \$CLOUDFLARE_API_TOKEN\" https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/pages/projects/$PROJECT/deployments/$PREV_ID/rollback'"
echo "ROLLBACK target: deployment $PREV_ID (source $PREV_SRC)"
echo "ROLLBACK command: $ROLLBACK"

if [ "$DRY" = 1 ]; then
  echo "== DRY RUN: would run: $WRANGLER pages deploy out --project-name $PROJECT --branch main --commit-hash $BUILD_SHA --commit-dirty=false"
  echo "== DRY RUN: would then fetch $HOST/?cb=<n> until HTTP 200 and the body contains $CHUNK"
  echo "DRY-RUN COMPLETE for $BUILD_SHA: $REFUSALS gate(s) would refuse; nothing was deployed. Rollback: $ROLLBACK"
  exit 0
fi

# ---- ROLL OUT (a separate command from the build above). --branch main is REQUIRED: without it Cloudflare files the
# upload as a Preview and production keeps serving the old build while wrangler exits 0. Run from the root so functions/ ships.
wr pages deploy out --project-name "$PROJECT" --branch main --commit-hash "$BUILD_SHA" --commit-dirty=false

# ---- prove the LIVE apex serves this build (exit 0 from wrangler proves nothing) -------------------------------------------
fail() { echo "FAILED: $1" >&2; echo "ROLLBACK: $ROLLBACK" >&2; exit 1; }
for attempt in $(seq 1 12); do
  CODE="$(curl -sS -o "$SCRATCH/live.html" -w '%{http_code}' -H 'Cache-Control: no-cache' "$HOST/?cb=$TS-$attempt" || echo 000)"
  echo "attempt $attempt: HTTP $CODE"
  if [ "$CODE" = "200" ] && grep -qF "$CHUNK" "$SCRATCH/live.html"; then
    echo "live apex serves $CHUNK"
    echo "DEPLOYED $BUILD_SHA ($VERSION_TAG) to $HOST; previous deployment $PREV_ID ($PREV_SRC)"
    echo "ROLLBACK: $ROLLBACK"
    exit 0
  fi
  sleep 10
done
fail "$HOST did not return 200 with $CHUNK"
