# Kai's Adventure — Implementation Plan

**Status:** Approved sequence
**Delivery rule:** A verified, pushed phase and its recorded SHA are required before the next phase begins.

## 1. Critical path and milestones

```text
Planning package
  → Standalone scaffold + first Vercel deployment
  → Visual foundation
  → Quest engine + storage
  → Complete Courage vertical slice + recordable demo
  → Kindness and Perseverance
  → Accessibility/performance polish
  → Judging package
```

- **Earliest working deployment:** after Phase 1, with the static shell and deep-link configuration.
- **Earliest valid hackathon demo:** after Phase 4, when Courage supports setup, map, choice, mission accept/return, transformation, reward, reflection, persistence, and reset.
- **Critical path:** scaffold → visual foundation → engine/storage → complete Courage loop → deployed verification.
- **Parallelizable after scaffold:** original SVG construction, local quest-pack writing, and pure reducer/schema tests. These streams merge only at a phase boundary and must not bypass the verification gate.

## 2. Git gate used after every phase

1. Confirm intended files with `git status -sb` and inspect the diff.
2. Run the phase's automated checks and fix failures.
3. Complete manual verification and record results in `BUILD_LOG.md`.
4. Stage only phase files and create the primary commit.
5. Push the primary commit to `origin/main`.
6. Capture the primary SHA and add it to the phase log entry.
7. Commit the log-only update as `docs: record <phase> commit` and push it.
8. Report both SHAs to Rafa before beginning the next phase.

The evidence commit records the primary commit only and is not recursively required to record its own SHA.

## 3. Phase 0 — Planning package

### Goal

Create a decision-complete product, UX, architecture, delivery, integration, evidence, checklist, build-log, and README package without application code.

### Expected files

`docs/PRODUCT_REQUIREMENTS.md`, `docs/VISUAL_UX_SPEC.md`, `docs/TECHNICAL_ARCHITECTURE.md`, `docs/IMPLEMENTATION_PLAN.md`, `docs/BUILD_CHECKLIST.md`, `docs/HEART_HERO_INTEGRATION_PLAN.md`, `docs/HACKATHON_EVIDENCE_PLAN.md`, `BUILD_LOG.md`, and `README.md`.

### Functional output

Locked scope, interfaces, state/storage behavior, routes, test cases, delivery gates, integration boundaries, and evidence process.

### Visual output

An enforceable screen specification, character behavior matrix, responsive rules, original SVG inventory, and transformation choreography.

### Dependencies

Inspection of the empty target and Heart Hero at reference commit `9d850349ef230ae51cc0a3e023196f0bf45772a7`.

### Verification

```text
git diff --check
git status -sb
repository file-inventory check
terminology and forbidden-dependency searches
manual cross-document consistency review
```

### Manual acceptance

- Every requested section is present.
- Kai is always a boy and Pip remains his nonverbal light-fox companion.
- Courage is the showcase and required first region.
- The same scope, routes, storage key, interfaces, and phase names appear throughout.
- Runtime AI, Supabase, auth, backend, and secrets appear only as explicit exclusions or parent-repository findings.

### Commits

- Primary: `docs: define Kai's Adventure product and build plan`
- Evidence: `docs: record planning commit`

### Risks

Contradictory prose, accidental implementation claims, or a circular SHA-record requirement.

### Must not start

No `package.json`, application source, generated art, deployment config, dependency installation, or Vercel project setup.

## 4. Phase 1 — Standalone scaffold

### Goal

Create a strict, testable Vite shell and establish continuous deployment before feature implementation.

### Expected modules

Package/lock files, strict TypeScript and Vite configuration, Tailwind/PostCSS, minimal shadcn utilities, root app/router/error boundary, feature `index.ts`, test configuration, CI workflow, and `vercel.json`.

### Functional output

- Local dev server and a production build.
- Placeholder routes mounted through `KaiAdventureRoutes`.
- Error boundary and not-found recovery.
- Unit/component/e2e harnesses with one smoke test each.

### Visual output

A deliberately plain branded placeholder—not a partial story scene—showing the product name and “Planning complete; adventure under construction.”

### Dependencies

Approved planning package and Node/npm environment.

### Verification

```text
npm ci
npm run typecheck
npm run lint
npm run test
npm run test:e2e
npm run build
```

Manually start the production preview, refresh `/map`, and confirm the SPA fallback. Connect the repository to Vercel and repeat `/`, `/map`, and an invalid-route check on the public deployment.

### Acceptance criteria

- Strict typecheck, lint, unit, e2e, and build pass.
- `dist` is produced with no secret or server dependency.
- Vercel deployment is public and direct refreshes work.
- The feature boundary has no dependency on the standalone shell.

### Commit

Primary: `chore: scaffold Kai's Adventure application`

### Risks

Dependency drift from parent majors, unnecessary shadcn packages, or Vercel rewrite errors.

### Must not start

No quest prose, finished Kai/Pip art, state persistence, or production transformation.

## 5. Phase 2 — Visual world and design system

### Goal

Establish the original visual language and implement the opening, setup, and world-map compositions without progression logic.

### Expected modules

Scoped Kai CSS tokens, local fonts/licenses, `SceneFrame`, `LayeredScene`, `KaiFigure`, `PipGuide`, `IllustratedChoice`, map landmark primitives, opening/setup/map screens, and original SVG sources.

### Functional output

- Semantic opening action and fully accessible setup controls backed by temporary in-memory state.
- Static map view models for available, sleeping, mission, and restored fixture states.
- Reduced-motion hook and focus/live-region foundation.

### Visual output

- Consistent Kai and Pip silhouettes/poses.
- Faded opening world and coherent three-landmark map.
- Illustrated setup selections without a form-heavy appearance.
- Tokenized faded/restored palettes and responsive focal zones.

### Dependencies

Phase 1 shell, route mounts, and test harness.

### Verification

```text
npm run typecheck
npm run lint
npm run test
npm run test:e2e -- --project=chromium
npm run build
```

Manually review at 375, 768, and 1280 px; keyboard through setup; enable reduced motion; inspect every SVG at 200% zoom; run contrast checks on token pairs.

### Acceptance criteria

- Screens read visually before captions are read.
- No clickable `div`, hover-only information, global token leakage, stock imagery, or generic dashboard grid.
- Focus rings, 44 px targets, labels, fieldsets, and responsive crops work.
- All central visual sources are original and stored in the repository.

### Commit

Primary: `feat: establish Kai visual world and design system`

### Risks

Overdrawing assets, inconsistent character proportions, and unreadable portrait crops.

### Must not start

No local persistence, quest selection, completion reducer, final transformation, or secondary-quest polish.

## 6. Phase 3 — Portable quest engine

### Goal

Implement and validate the portable, deterministic content and progression layer without coupling it to final scene polish.

### Expected modules

Public/core types, Zod schemas, English lexicon, three local quest packs, catalog/source, selector, reducer, view-model selectors, local-storage adapter, migration registry, provider, and route guards.

### Functional output

- Deterministic selection and persisted quest IDs.
- Setup, active scene, choice, mission, transformation, reward, and completion state transitions.
- Courage-first availability and challenge recommendation.
- Schema-versioned save, migration, corrupt backup, storage-failure recovery, and scoped reset.

### Visual output

Fixture-based engine states rendered through existing scene frames; no final transformation art.

### Dependencies

Phase 1 test harness and Phase 2 component contracts.

### Verification

```text
npm run typecheck
npm run lint
npm run test -- --coverage
npm run test:e2e -- --grep "persistence|route guard|setup"
npm run build
```

Manually reload at every stored stage, inject malformed/unknown storage, deny storage access, and verify unrelated keys survive reset.

### Acceptance criteria

- All content passes graph/schema validation.
- Every setup combination returns the same quest on repeat runs.
- Reducer invariants and idempotency tests pass.
- Storage recovery is visible and actionable.
- Components contain no quest prose, direct browser storage, or hardcoded virtue labels.

### Commit

Primary: `feat: implement portable local quest engine`

### Risks

Overgeneralized schemas, async hydration flicker, invalid deep links, or duplicate completion.

### Must not start

No final transformation sequence, collectible flourish, runtime content adapter, or account persistence.

## 7. Phase 4 — Complete Courage journey

### Goal

Deliver the complete, polished, recordable showcase loop.

### Expected modules

Courage region intro and choice scenes, mission object/view, transformation phase runner, Mountain of Echoes layers, Courage Compass reveal, collection state, grown-up reflection, reset experience, and Courage e2e/visual tests.

### Functional output

Opening → setup → map → Courage story → mission accept → map/return → mission complete → transformation → reward → collection/map, with reload safety and reset.

### Visual output

The six-beat Courage transformation, expressive Kai/Pip reactions, restored Mountain map state, reward reveal, and one-object collection.

### Dependencies

Validated engine/storage and established visual system.

### Verification

```text
npm run typecheck
npm run lint
npm run test
npm run test:e2e -- --grep "Courage"
npm run build
```

Manually run keyboard and touch paths, reload after each stage, skip transformation, enable reduced motion, verify live announcements, reset/replay, and test the deployed Vercel build on a mobile device.

### Acceptance criteria

- The full Courage loop has no placeholder or dead end.
- Mission acceptance and completion persist correctly.
- Transformation is legible, skippable, reduced-motion safe, and never duplicates reward state.
- Both sleeping regions unlock after restoration.
- The public deployment is sufficient to record a valid hackathon demo.

### Commit

Primary: `feat: complete Courage adventure journey`

### Risks

Transformation timing, SVG performance, resume during animation, and insufficient emotional payoff.

### Must not start

No additional virtues, secondary branching polish, narration, scoring, accounts, or analytics.

## 8. Phase 5 — Kindness and Perseverance

### Goal

Complete the remaining two shorter quests without reducing Courage quality.

### Expected modules

Woods and bridge scene layers, one choice path each, mission objects, shorter transformation phase lists, Kindness Lantern, Perseverance Star, prompts, map states, and e2e coverage.

### Functional output

Both unlocked regions support story, mission accept/return, completion, restoration, collection, reflection, and persistence.

### Visual output

Lantern flowers/path reconnection and bridge/star restoration, plus a complete three-object cabinet/constellation.

### Dependencies

Phase 4 shared mission, transformation, reward, and collection components.

### Verification

```text
npm run typecheck
npm run lint
npm run test
npm run test:e2e -- --grep "Kindness|Perseverance|all regions"
npm run build
```

Manually complete the quests in both orders, reload at mission/reward stages, inspect all map combinations, and verify all prompts and collectibles.

### Acceptance criteria

- Both quests are functional and complete, though shorter than Courage.
- Three restored states and rewards persist without ordering bugs.
- Choice language is nonjudgmental and missions use the approved wording.
- No copied visual or content assets appear.

### Commit

Primary: `feat: add Kindness and Perseverance regions`

### Risks

Secondary art consuming time, duplicated code, or regression of Courage progression.

### Must not start

No fourth virtue, more regions, distinct timed adventures, user-generated quests, or runtime AI.

## 9. Phase 6 — Accessibility, responsiveness, and performance

### Goal

Harden the complete product across input methods, assistive technology, viewports, and constrained mobile performance.

### Expected modules

Focus utilities, live-region refinements, responsive scene rules, asset lazy loading, error/recovery states, axe suites, visual snapshots, and performance documentation.

### Functional output

Full keyboard operation, stable error recovery, route-level lazy loading, and robust direct refreshes.

### Visual output

Polished optical alignment, contrast, crops, safe areas, motion timing, and reduced-motion alternatives without adding features.

### Dependencies

All three complete quests.

### Verification

```text
npm run typecheck
npm run lint
npm run test
npm run test:e2e
npm run build
```

Run axe on every major route, keyboard-only critical path, 200% zoom, reduced motion, 375/768/1280 px screenshots, throttled mobile performance, and production route refreshes.

### Acceptance criteria

- No serious/critical axe violations.
- Logical focus, visible rings, Escape/focus return, 44 px targets, and WCAG AA tokens are confirmed.
- Reduced motion preserves all meaning without staged movement.
- No layout overflow or hidden primary action at target widths.
- Initial and lazy chunks meet the budget chosen during scaffolding and show no avoidable layout shift.

### Commit

Primary: `feat: polish visual storytelling and accessibility`

### Risks

Late visual regressions, SVG DOM weight, and inaccessible custom scene controls.

### Must not start

No new product features or content branches.

## 10. Phase 7 — Judging readiness

### Goal

Produce accurate, reproducible evidence and a judge-friendly public handoff.

### Expected files

Final README, build/evidence log, screenshots, demo script, architecture diagram if useful, license/attribution notes, and submission checklist.

### Functional output

Reproducible local instructions, public deployment, reset path, testing evidence, and clear provenance.

### Visual output

Curated opening, faded map, Courage mission, transformation, restored map, collection, and responsive screenshots; concise demo video.

### Dependencies

Production-complete application and stable Vercel URL.

### Verification

```text
npm ci
npm run typecheck
npm run lint
npm run test
npm run test:e2e
npm run build
git diff --check
```

Follow README instructions on a clean checkout, run `/feedback`, test the public reset flow, verify every link, and compare claims against Git history and the dependency tree.

### Acceptance criteria

- No README section claims runtime GPT-5.6 or a feature that is not built.
- Pre-existing Heart Hero and new Kai work are clearly separated.
- Commit, screenshot, responsive, accessibility, Vercel, and session evidence are complete.
- A judge can open, finish Courage, and reset without assistance.

### Commit

Primary: `docs: prepare Kai's Adventure for judging`

### Risks

Unverifiable AI claims, stale screenshots, broken links, or a demo that spends too long in setup.

### Must not start

Only critical defects may change product behavior; no feature expansion.

## 11. Cut order under schedule pressure

Cut in this order:

1. decorative parallax and extra ambient particles;
2. optional transformation replay outside full reset;
3. bespoke wording for every age/choice combination beyond required fallbacks;
4. extra choice branches in Kindness and Perseverance;
5. nonessential collectible flourishes and secondary environmental loops.

Never cut the complete Courage loop, clear transformation, map progression, local persistence/reset, one complete path for Kindness and Perseverance, mobile usability, semantic controls, focus visibility, contrast, or reduced-motion completion.
