import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    // Build output and vendored code. Nothing here is project source and none
    // of it is committed.
    //
    // `.claude/worktrees/**` is the agent-worktree root. Each worktree is an
    // untracked checkout carrying its own `.next/` build output, and the
    // patterns above are root-relative in flat config, so a nested
    // `<worktree>/.next/` escapes `.next/**` and gets linted. That put 49
    // `no-assign-module-variable` errors from eleven other agents' webpack
    // bundles into `npm run lint` and made the deploy gate unpassable for
    // everyone. This entry completes the intent already expressed by
    // `.next/**` and `out/**`: do not lint build output.
    //
    // Deliberately scoped to the worktree root, NOT to `**/.next/**`. Widening
    // the pattern itself would also silence a real `.next` committed anywhere
    // in src/, which should still be an error.
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      ".claude/worktrees/**",
      "next-env.d.ts",
    ],
  },
  ...compat.extends("next/core-web-vitals"),
];

export default eslintConfig;
