# Kai's Adventure — Judging Status

## Ready now

- Complete Courage, Kindness, and Perseverance journeys.
- Persisted mission return and all-three collection.
- Six-beat Courage restoration with skip and reduced-motion completion.
- Keyboard setup, visible focus, 44 px targets, live announcements, axe checks, and responsive 375/768/1280 evidence.
- Strict static build with original SVG artwork and no runtime AI, backend, authentication, database, environment variable, or secret.
- Incremental primary and evidence commits on `main`.

## Evidence inventory

- `opening-faded-1280.png` — opening promise and faded state.
- `map-sleeping-1280.png` — Courage available, two sleeping regions.
- `map-restored-375.png`, `map-restored-768.png`, `map-restored-1280.png` — responsive complete map.
- `collection-complete-1280.png` — all three named collectibles.
- `courage-transformation-midpoint-1280.png` — staged signature payoff.
- `courage-reduced-motion-final-1280.png` — immediate accessible final composition.
- `setup-keyboard-focus-768.png` — visible keyboard focus evidence.
- Automated evidence: Vitest engine tests and Playwright all-region, route-refresh, axe, keyboard, touch-size, reduced-motion, and responsive checks.

## External actions still required

These cannot be completed without the owner's Vercel connection and submission access:

- Link the GitHub repository to Vercel and deploy `main` with no environment variables.
- Record the production URL and smoke-test every route.
- Run the dedicated `/feedback` session against that public URL; record accepted/rejected findings here.
- Record and caption the demo video using `DEMO_SCRIPT.md`.
- Enter the Education submission and attach URL, video, repository, and evidence.

## `/feedback` record

**Status:** pending public deployment.  
**Required prompts:** product value, child comprehension, visual originality, core-loop completeness, accessibility, and judge-demo risks.  
**Scope rule:** accept clarity, defect, accessibility, or demo-friction fixes only; do not add late features.

## Deployment configuration

- Framework: Vite.
- Install: `npm ci`.
- Build: `npm run build`.
- Output: `dist`.
- SPA routing: committed `vercel.json` catch-all rewrite.
- Environment variables: none.
