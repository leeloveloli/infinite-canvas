# Project Progress

## 2026-06-17

### Completed

- Forked `basketikun/infinite-canvas` to `leeloveloli/infinite-canvas`.
- Cloned the fork to `C:\Users\hywsm\infinite-canvas`.
- Installed dependencies in `web` with `bun install --frozen-lockfile`.
- Verified local production build with `bun run build`.
- Created and linked the Vercel project `infinite-canvas` under scope `lees-projects-3102547c`.
- Connected the Vercel project to `https://github.com/leeloveloli/infinite-canvas`.
- Added a compatibility fix so `web/next.config.ts` can build when Vercel deploys only the `web` directory.
- Built successfully with `vercel build --prod` and uploaded a production deployment.

### Key Decisions

- The app lives in `web`, so Vercel operations were run with `web` as the working directory.
- README mentions a root `vercel.json`, but the current repository does not include one. Deployment was handled by linking the `web` app directly.
- Vercel access protection was not disabled because it is a project security setting.

### Current Status

- Latest Vercel deployment build output is ready, but the deployment state is `BLOCKED`.
- Vercel project protection currently reports SSO protection for `all_except_custom_domains`, so the default `vercel.app` URL returns 401.
- Production alias recorded by Vercel: `https://infinite-canvas-lees-projects-3102547c.vercel.app`.

### Remaining Issues

- Decide whether to disable or adjust Vercel Deployment Protection for this project, or attach a custom domain.
- Confirm Vercel Git deployments use `web` as the root directory. If automatic Git builds fail from the repository root, set Root Directory to `web` in Vercel project settings.

### Next Steps

- If public access through `vercel.app` is required, explicitly confirm changing Vercel Deployment Protection.
- After protection/root settings are confirmed, trigger a fresh production deployment from Vercel or via CLI.
