# Kai's Adventure — Build Checklist

Use this checklist in order. Do not begin a phase until the prior phase's verification, primary push, SHA-record push, and Rafa-facing report are complete.

## Phase gate template

- [ ] Confirm the active branch is `main` and the remote is the target repository.
- [ ] Review `git status -sb`; identify every intended file and preserve unrelated work.
- [ ] Complete the phase's implementation and documentation only.
- [ ] Run all phase verification commands.
- [ ] Fix every blocking failure and rerun the affected command.
- [ ] Complete the phase's manual verification.
- [ ] Update `BUILD_LOG.md` with work, decisions, checks, deployment, and known issues.
- [ ] Inspect the staged diff; stage only the intended phase files.
- [ ] Create the approved primary phase commit.
- [ ] Push the primary commit to `origin/main`.
- [ ] Capture the full primary commit SHA.
- [ ] Add that SHA to `BUILD_LOG.md`.
- [ ] Commit the log-only update as `docs: record <phase> commit`.
- [ ] Push the evidence commit to `origin/main`.
- [ ] Report both SHAs and verification results to Rafa.
- [ ] Stop before starting the next phase.

## Phase 0 — Planning package

### Repository inspection

- [x] Confirm the target repository is public, empty, and defaults to `main`.
- [x] Inspect Heart Hero at commit `9d850349ef230ae51cc0a3e023196f0bf45772a7`.
- [x] Record compatible stack conventions.
- [x] Record parent coupling and assets that must not be copied.
- [x] Confirm the parent repository was not modified.

### Documents

- [x] Create `docs/PRODUCT_REQUIREMENTS.md`.
- [x] Create `docs/VISUAL_UX_SPEC.md`.
- [x] Create `docs/TECHNICAL_ARCHITECTURE.md`.
- [x] Create `docs/IMPLEMENTATION_PLAN.md`.
- [x] Create `docs/BUILD_CHECKLIST.md`.
- [x] Create `docs/HEART_HERO_INTEGRATION_PLAN.md`.
- [x] Create `docs/HACKATHON_EVIDENCE_PLAN.md`.
- [x] Create `BUILD_LOG.md`.
- [x] Create a planning-stage `README.md`.

### Planning verification pause

- [x] Confirm all nine expected files exist and are nonempty.
- [x] Run `git diff --check`.
- [x] Confirm Kai is consistently a boy approximately nine years old.
- [x] Confirm Pip is consistently the nonverbal magical light-fox companion.
- [x] Confirm Courage, Kindness, and Perseverance are the only MVP virtues.
- [x] Confirm Courage is the first and deepest journey.
- [x] Confirm the exact routes, storage key, schema version, and public interfaces agree.
- [x] Confirm Quick and Three-Day modes share content and have no timer.
- [x] Confirm Vercel build/output/rewrite behavior is documented.
- [x] Confirm Supabase, authentication, backend services, secrets, and runtime AI appear only as exclusions or parent findings.
- [x] Confirm application files and dependencies have not been created.
- [x] Complete the phase gate: primary commit `docs: define Kai's Adventure product and build plan`.
- [x] Complete the SHA-record commit `docs: record planning commit`.
- [x] Report both planning SHAs to Rafa.

## Phase 1 — Standalone scaffold

- [ ] Add Vite 5, React 18, TypeScript 5, and SWC configuration.
- [ ] Enable strict TypeScript and the `@/` alias.
- [ ] Add Tailwind 3/PostCSS with minimal shadcn utilities.
- [ ] Add React Router 6 and the thin standalone app shell.
- [ ] Add `src/features/kai-adventure/index.ts` with placeholder public exports.
- [ ] Add route-level error and not-found recovery.
- [ ] Add Vitest, Testing Library, user-event, and jest-dom.
- [ ] Add Playwright and axe integration with one smoke path.
- [ ] Add `typecheck`, `lint`, `test`, `test:e2e`, and `build` scripts.
- [ ] Add CI checks for clean installs and production builds.
- [ ] Add Vercel SPA rewrite; output remains `dist`.
- [ ] Confirm there are no secrets, server functions, OpenAI SDKs, Supabase, auth, or analytics.
- [ ] Run `npm ci`.
- [ ] Run `npm run typecheck`.
- [ ] Run `npm run lint`.
- [ ] Run `npm run test`.
- [ ] Run `npm run test:e2e`.
- [ ] Run `npm run build`.
- [ ] Preview locally and refresh `/map` directly.
- [ ] Connect `main` to Vercel and record the public deployment.
- [ ] Test `/`, `/map`, and an invalid URL on Vercel.
- [ ] Complete the phase gate with primary commit `chore: scaffold Kai's Adventure application`.

## Phase 2 — Visual world and design system

- [ ] Select and document locally bundled open-license fonts.
- [ ] Add `.kai-adventure` and scoped `--kai-*` tokens.
- [ ] Add faded, shared-restored, Courage, Kindness, and Perseverance palettes.
- [ ] Add focus, spacing, typography, radius, and motion tokens.
- [ ] Build `SceneFrame` and the live-region/focus foundation.
- [ ] Build semantic `LayeredScene` SVG structure.
- [ ] Draw Kai's base and required emotional poses.
- [ ] Draw Pip's dim, pointing, moving, and bright states.
- [ ] Draw the three-landmark faded world map and status ornaments.
- [ ] Implement the opening scene.
- [ ] Implement all setup fieldsets and illustrated radio selections.
- [ ] Implement map fixture states: available, sleeping, mission, restored.
- [ ] Add `useReducedMotion` and static alternatives.
- [ ] Confirm every action is a real button/link and every target is at least 44×44 px.
- [ ] Confirm no information is hover-only or color-only.
- [ ] Test 375, 768, and 1280 px layouts.
- [ ] Test keyboard order, focus rings, Escape/focus return where applicable.
- [ ] Check token contrast and SVG descriptions.
- [ ] Run typecheck, lint, tests, targeted e2e, and build.
- [ ] Complete the phase gate with primary commit `feat: establish Kai visual world and design system`.

## Phase 3 — Portable quest engine

- [ ] Define all public IDs, text variants, entities, scenes, progress, and adapter types.
- [ ] Add discriminated Zod schemas for content and storage.
- [ ] Add English virtue lexicon and copy resolver with age fallbacks.
- [ ] Add Courage, Kindness, and Perseverance data-only quest packs.
- [ ] Validate unique IDs, targets, reachability, terminal stages, age support, and copy limits.
- [ ] Add static catalog and `QuestSource` implementation.
- [ ] Implement deterministic quest selection and persisted IDs.
- [ ] Implement challenge-to-virtue recommendation mapping.
- [ ] Implement the pure exhaustive reducer and state invariants.
- [ ] Implement selectors for availability, mission, map, collection, and recovery views.
- [ ] Implement async `StorageAdapter` with `heart-hero:kai-adventure:progress`.
- [ ] Implement v1 envelope, migration registry, corrupt backup, and recovery notice.
- [ ] Implement scoped reset that preserves unrelated storage.
- [ ] Implement `AdventureProvider` persistence-before-navigation behavior.
- [ ] Implement base-path routes and nearest-safe-route guards.
- [ ] Test every setup combination for deterministic output.
- [ ] Test reducer transitions and idempotency.
- [ ] Test malformed, older, unknown-future, unavailable, and quota-failure storage.
- [ ] Reload every stage manually and verify route recovery.
- [ ] Run typecheck, lint, coverage tests, targeted e2e, and build.
- [ ] Complete the phase gate with primary commit `feat: implement portable local quest engine`.

## Phase 4 — Complete Courage journey

- [ ] Draw Mountain of Echoes sky, terrain, cavern, echoes, crystals, effects, and reward layers.
- [ ] Implement the Courage region introduction.
- [ ] Implement two concise, nonjudgmental Courage choice beats.
- [ ] Implement the compass mission object and approved Courage mission.
- [ ] Persist “I'll do it” and expose return-to-mission on the map.
- [ ] Permit immediate “I did it” without a timer.
- [ ] Persist completion before transformation navigation.
- [ ] Implement Pip light trail.
- [ ] Implement echo reduction and cloud separation.
- [ ] Implement sunrise and crystal illumination.
- [ ] Implement Kai's compass awakening and reward emergence.
- [ ] Add visible skip and immediate reduced-motion final state.
- [ ] Add one-time restoration announcement.
- [ ] Implement Courage Compass collection idempotently.
- [ ] Implement partial collection and Courage parent prompt.
- [ ] Implement accessible grown-up reset and replay.
- [ ] Reload after setup, choice, acceptance, completion, transformation, and collection.
- [ ] Verify both sleeping regions unlock only after Courage restoration.
- [ ] Test complete keyboard and touch paths.
- [ ] Test Vercel on an actual mobile viewport/device.
- [ ] Run all automated checks and Courage e2e.
- [ ] Record the earliest valid demo after this phase.
- [ ] Complete the phase gate with primary commit `feat: complete Courage adventure journey`.

## Phase 5 — Kindness and Perseverance

- [ ] Draw the Woods faded/restored layers, creatures, roots, flowers, and lantern.
- [ ] Implement Kindness intro, one choice, mission, return, transformation, reward, and prompt.
- [ ] Draw the Bridge faded/restored layers, stones, stars, and reward.
- [ ] Implement Perseverance intro, one choice, mission, return, transformation, reward, and prompt.
- [ ] Verify both regions remain sleeping before Courage and available afterward.
- [ ] Complete both quests in either order.
- [ ] Verify all map restoration permutations.
- [ ] Verify all three rewards and parent prompts persist.
- [ ] Verify Quick and Three-Day presentation on both quests.
- [ ] Confirm no new virtues, scoring, accounts, runtime AI, or scope expansion.
- [ ] Run all automated checks and all-region e2e.
- [ ] Complete the phase gate with primary commit `feat: add Kindness and Perseverance regions`.

## Phase 6 — Accessibility, responsive, and performance polish

- [ ] Run axe scans on every major route/state.
- [ ] Resolve all serious and critical violations.
- [ ] Complete the entire experience keyboard-only.
- [ ] Confirm logical focus order and visible 3:1 focus rings.
- [ ] Confirm Enter/Space, Escape, focus trapping, and focus return.
- [ ] Confirm all touch targets and target spacing.
- [ ] Confirm WCAG AA text/icon/boundary contrast.
- [ ] Confirm every meaningful state has a non-color cue.
- [ ] Confirm SVG titles/descriptions and decorative hiding.
- [ ] Test 200% zoom.
- [ ] Test `prefers-reduced-motion` on every animated view.
- [ ] Capture stable 375, 768, and 1280 px screenshots.
- [ ] Remove layout overflow and hidden/covered actions.
- [ ] Lazy-load noncritical region modules and set asset dimensions.
- [ ] Test with CPU/network throttling and record performance findings.
- [ ] Test every direct route refresh on Vercel.
- [ ] Run the full automated suite and production build.
- [ ] Complete the phase gate with primary commit `feat: polish visual storytelling and accessibility`.

## Phase 7 — Judging readiness

- [ ] Replace planning-stage README notices with verified product information.
- [ ] Add public demo URL and reset instructions.
- [ ] Document exact local install/build/test commands.
- [ ] Explain architecture and future Heart Hero integration.
- [ ] Explain Codex and GPT-5.6 use without claiming runtime AI.
- [ ] Distinguish pre-existing Heart Hero from all new Kai work.
- [ ] Add dependency, asset, font, and license notes.
- [ ] Complete every `BUILD_LOG.md` phase entry and commit SHA.
- [ ] Capture before/after map and Courage transformation evidence.
- [ ] Capture mobile, tablet, desktop, keyboard, reduced-motion, and accessibility evidence.
- [ ] Write and rehearse the concise demo script.
- [ ] Run and record a `/feedback` session.
- [ ] Test README steps from a clean checkout.
- [ ] Re-run the complete automated suite and Vercel smoke test.
- [ ] Verify every external link and every submission claim.
- [ ] Complete the submission checklist in the evidence plan.
- [ ] Complete the phase gate with primary commit `docs: prepare Kai's Adventure for judging`.

## Scope protection

- [ ] Cut ambient parallax before any core-loop work.
- [ ] Cut optional transformation replay before any required screen.
- [ ] Cut extra age/branch variants before accessibility or persistence.
- [ ] Cut secondary-quest branching before functional completeness.
- [ ] Never cut the complete Courage loop.
- [ ] Never cut visible transformation, map progression, persistence, or reset.
- [ ] Never cut one complete Kindness and Perseverance path.
- [ ] Never cut semantic controls, focus visibility, contrast, mobile usability, or reduced motion.
