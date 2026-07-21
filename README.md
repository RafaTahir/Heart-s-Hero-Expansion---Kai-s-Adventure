# Kai's Adventure

> **Planning-stage repository:** the product and delivery specifications are complete, but the application has not been scaffolded or built yet. There is no live demo in this phase.

**Kai's Adventure — A Heart Hero Expansion** is a planned visual-first interactive storybook game for children aged 6–11. Children help Kai, a nine-year-old explorer, and Pip, his magical light-fox companion, restore a fading fantasy world by practising Courage, Kindness, and Perseverance in real life.

> Children do not simply learn virtues. They help Kai restore a living world by practising them.

## Planning documents

- [Product requirements](docs/PRODUCT_REQUIREMENTS.md)
- [Visual UX specification](docs/VISUAL_UX_SPEC.md)
- [Technical architecture](docs/TECHNICAL_ARCHITECTURE.md)
- [Implementation plan](docs/IMPLEMENTATION_PLAN.md)
- [Build checklist](docs/BUILD_CHECKLIST.md)
- [Heart Hero integration plan](docs/HEART_HERO_INTEGRATION_PLAN.md)
- [Hackathon evidence plan](docs/HACKATHON_EVIDENCE_PLAN.md)
- [Build log](BUILD_LOG.md)

## Project overview

_To be updated after implementation._

The planned MVP contains three regions and a complete loop of visual discovery, expressive choice, real-world mission, return, environmental transformation, and collectible reward. The Mountain of Echoes/Courage journey is the showcase vertical slice.

## Demo

_Not available during the planning phase._

The future public Vercel URL, demo video, judge reset route, and screenshot evidence will be added only after they are verified.

## Features

_Planned, not yet implemented:_

- original full-screen Kai and Pip story scenes;
- Courage, Kindness, and Perseverance quest regions;
- real-world missions with “I'll do it” and “I did it” return flow;
- visible faded-to-restored environmental transformations;
- three virtue collectibles and a visual collection;
- brief grown-up setup and reflection;
- versioned local progress, corrupted-state recovery, and interface reset;
- keyboard, touch, reduced-motion, mobile, tablet, and desktop support.

## Architecture

The approved architecture is a static Vite/React/TypeScript application using Tailwind CSS, shadcn/Radix primitives, React Router, structured local quest packs, a pure reducer, and an injected storage adapter. The portable feature will live under `src/features/kai-adventure` behind a thin standalone shell.

The deployed MVP will use **no OpenAI API, runtime AI, Supabase, backend, authentication, external database, API key, secret, or runtime-generated image**.

See [Technical Architecture](docs/TECHNICAL_ARCHITECTURE.md) for the full design.

## Running locally

_Not available until the scaffold phase._

Verified install, development, preview, and Node requirements will be added after the package and lockfile exist. Do not infer commands from this planning-stage repository.

## Deployment

_Not deployed during the planning phase._

The intended target is a public static Vite deployment on Vercel, built with `npm run build` into `dist`, with a documented SPA rewrite for direct route refreshes and no environment variables.

## Testing instructions

_Not available until the scaffold phase._

The approved test strategy includes strict typechecking, ESLint, Vitest/Testing Library, Playwright end-to-end journeys, axe accessibility scans, responsive screenshots, storage migration/recovery tests, and Vercel smoke checks.

## Accessibility

The specification requires WCAG AA contrast, semantic controls, 44×44 px touch targets, logical keyboard navigation, visible focus, non-color state cues, labelled SVG scenes, live announcements, browser zoom, reduced motion, and responsive layouts at 375, 768, and 1280 px.

See [Visual UX Specification](docs/VISUAL_UX_SPEC.md) for the enforceable interaction and visual rules.

## How Codex was used

During planning, Codex inspected the empty target repository and the existing Heart Hero compatibility reference, then produced the requirements, UX, architecture, phased implementation, checklist, integration, evidence, and build-log documents under Rafa's direction.

Later phase descriptions will record only work actually completed and verified by Codex.

## How GPT-5.6 was used

GPT-5.6, through Codex, supported product reasoning, technical architecture, UX specification, risk analysis, implementation sequencing, and verification planning.

GPT-5.6 is a development tool for this project. It is **not** a runtime dependency of the planned product.

## Built during OpenAI Build Week

Kai's Adventure is being created as a new standalone Education-category project during OpenAI Build Week. The target repository was empty at the start of planning. Phase commits and evidence will distinguish new Build Week work from the pre-existing Heart Hero application.

## Relationship to Heart Hero

The existing [`heart-hero-quest`](https://github.com/RafaTahir/heart-hero-quest) repository is a compatibility reference only and is not modified by this project. Kai uses a compatible frontend technology family but does not copy Heart Hero's Supabase/auth coupling, runtime image generation, religious terminology, global navigation, or assets.

The future integration path mounts the portable feature under `heart-hero-quest/src/features/kai-adventure` and injects routing base, persistence, quest source, and virtue labels. See [Heart Hero Integration Plan](docs/HEART_HERO_INTEGRATION_PLAN.md).

## Future integration and roadmap

After the hackathon, the portable interfaces may support account-backed persistence, localization, alternative virtue labels, more regions, optional narration, and an optional validated runtime quest source. These are roadmap items, not MVP claims. Static local quests will remain supported.

## Current status

- [x] Repository inspection
- [x] Product and UX planning
- [x] Technical architecture
- [x] Sequenced delivery and test planning
- [x] Integration and hackathon evidence planning
- [ ] Planning package verification and push
- [ ] Application scaffold
- [ ] Working product
- [ ] Public deployment
