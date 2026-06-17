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
- Verified `https://api.saki.lat/v1/models` works server-side with the provided OpenAI-compatible key; `https://api.saki.lat/models` returns 403.
- Confirmed `api.saki.lat` does not return `Access-Control-Allow-Origin`, so browser direct model fetching and generation requests are blocked by CORS.
- Added AI channel request mode support: `前端直连` and `Next.js 转发`.
- Added `/api/ai-proxy` to forward OpenAI-compatible model, image, text, audio and video requests through the deployed Next.js app.
- Verified local `/api/ai-proxy` can fetch the Saki model list with HTTP 200.
- Adjusted proxy-mode browser requests to send the upstream key as `X-AI-Authorization`; the Next.js proxy converts it back to `Authorization` before calling the upstream API. This avoids Vercel Deployment Protection treating the upstream key as a Vercel auth header.

### Key Decisions

- The app lives in `web`, so Vercel operations were run with `web` as the working directory.
- README mentions a root `vercel.json`, but the current repository does not include one. Deployment was handled by linking the `web` app directly.
- Vercel access protection was not disabled because it is a project security setting.
- For APIs without browser CORS support, channels should use `Next.js 转发`.

### Current Status

- Latest Vercel production deployment is `READY`.
- Vercel project Root Directory is set to `web`.
- Vercel project protection currently reports SSO protection for `all_except_custom_domains`, so the `infinite-canvas-*.vercel.app` URLs return 401.
- Public alias verified with HTTP 200 and title `无限画布`: `https://web-eight-tan-84.vercel.app`.
- Production alias recorded by Vercel: `https://infinite-canvas-lees-projects-3102547c.vercel.app`.

### Remaining Issues

- Decide whether to disable or adjust Vercel Deployment Protection for this project, or attach a custom domain.

### Next Steps

- If public access through `vercel.app` is required, explicitly confirm changing Vercel Deployment Protection.
- Use the verified public alias for testing, or attach a preferred custom domain.
- Configure the Saki channel with Base URL `https://api.saki.lat`, the provided key, and request mode `Next.js 转发`; then click `拉取模型`.
