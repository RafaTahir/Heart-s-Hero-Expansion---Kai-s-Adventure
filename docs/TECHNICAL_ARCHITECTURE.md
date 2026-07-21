# Kai's Adventure — Technical Architecture

**Status:** Approved implementation architecture
**Deployment model:** Static client-side application on Vercel
**Runtime services:** None

## 1. Architecture goals

1. Deliver a dependable, visual-first standalone MVP under severe time constraints.
2. Keep the entire quest system deterministic and locally available.
3. Make the feature portable into Heart Hero without bringing the standalone shell with it.
4. Make content, labels, routing base, and persistence replaceable through narrow interfaces.
5. Preserve strict type safety, testability, accessibility, and storage recovery.
6. Prohibit accidental runtime AI, backend, authentication, or secret dependencies.

## 2. Repository findings and compatibility

The target repository `RafaTahir/Heart-s-Hero-Expansion---Kai-s-Adventure` was confirmed public and empty with `main` as its default branch.

The compatibility reference `RafaTahir/heart-hero-quest` was inspected at commit `9d850349ef230ae51cc0a3e023196f0bf45772a7`. Its relevant conventions are:

- Vite 5.4, React 18.3, TypeScript 5.8, Tailwind CSS 3.4, React Router 6.30;
- shadcn/Radix primitives and `lucide-react`;
- `@/` path aliases;
- CSS variables connected to Tailwind semantic tokens;
- client-side routes and full-screen visual scenes.

The parent also contains architecture that Kai must not inherit: Supabase auth/data contexts, protected routes, runtime image-generation functions, externally generated imagery, religious terminology, a global navbar/dashboard, generic grids, and permissive TypeScript options. No parent files or assets will be copied. The parent repository will not be modified.

## 3. Recommended stack

Use the parent-compatible major versions and lock exact versions in the generated lockfile during scaffolding:

- React 18 and React DOM 18;
- Vite 5 with the React SWC plugin;
- TypeScript 5 with `strict`, `noUncheckedIndexedAccess`, and `exactOptionalPropertyTypes` enabled where compatible;
- Tailwind CSS 3, PostCSS, and Autoprefixer;
- shadcn/Radix only for accessible primitives actually needed, such as Dialog and RadioGroup;
- React Router 6;
- Zod 3 for quest and storage validation;
- Lucide React for interface icons only;
- Vitest, React Testing Library, `user-event`, and jest-dom;
- Playwright and `@axe-core/playwright` for end-to-end and accessibility checks.

Do not add an animation library initially. Use reducer-driven phases plus scoped CSS/SVG transitions. Do not install Supabase, an OpenAI SDK, analytics, authentication, data-fetching frameworks, or server runtimes.

Bundle open-license fonts locally through font packages or checked-in licensed files. Record font names, source, and license in the README when selected during the visual phase.

## 4. Directory structure

```text
src/
  app/
    App.tsx
    AppRouter.tsx
    ErrorBoundary.tsx
  features/
    kai-adventure/
      assets/
        characters/
        regions/
        rewards/
      components/
      content/
        en/
          courage.ts
          kindness.ts
          perseverance.ts
          lexicon.ts
        catalog.ts
      engine/
        reducer.ts
        selectors.ts
        validation.ts
      hooks/
      routes/
        KaiAdventureRoutes.tsx
        routeGuards.ts
      scenes/
      state/
        AdventureProvider.tsx
        initialState.ts
      storage/
        localStorageAdapter.ts
        migrations.ts
      styles/
        kai-adventure.css
      types/
        adventure.ts
        content.ts
        public.ts
      utils/
      index.ts
  components/ui/
  index.css
  main.tsx
tests/
  e2e/
  fixtures/
```

The standalone `app` directory configures the router and injects local implementations. It owns no quest behavior. The feature's `index.ts` exports only the stable entry point, interfaces, core IDs, and integration helpers.

## 5. Public interfaces and core types

```ts
export type AgeBand = "6-7" | "8-9" | "10-11";
export type JourneyLength = "quick" | "three-day";
export type VirtueId = "courage" | "kindness" | "perseverance";
export type RegionId =
  | "mountain-of-echoes"
  | "whispering-woods"
  | "bridge-of-falling-stars";

export type ChallengeId =
  | "afraid-to-try"
  | "gives-up-quickly"
  | "struggles-to-share"
  | "avoids-helping"
  | "becomes-frustrated"
  | "lacks-confidence";

export type MissionStatus = "not-started" | "accepted" | "completed";

export interface TextVariant {
  key: string;
  default: string;
  byAge?: Partial<Record<AgeBand, string>>;
}

export type QuestScene =
  | NarrativeScene
  | ChoiceScene
  | MissionScene
  | TransformationScene
  | RewardScene;

export interface QuestPack {
  schemaVersion: 1;
  id: string;
  version: number;
  virtueId: VirtueId;
  regionId: RegionId;
  challengeTags: ChallengeId[];
  priority: number;
  startSceneId: string;
  scenes: QuestScene[];
  parentPrompt: TextVariant;
  reward: Reward;
}

export interface AdventureProgressV1 {
  schemaVersion: 1;
  setup: ParentSetup | null;
  selectedQuestIds: Partial<Record<RegionId, string>>;
  activeRun: ActiveQuestRun | null;
  missions: Partial<Record<string, MissionProgress>>;
  completedQuestIds: string[];
  restoredRegionIds: RegionId[];
  collectedRewardIds: string[];
  recoveryNotice?: "corrupt-storage-reset";
}

export interface StorageAdapter {
  load(): Promise<AdventureProgressV1 | null>;
  save(progress: AdventureProgressV1): Promise<void>;
  clear(): Promise<void>;
}

export interface QuestSource {
  list(): Promise<readonly QuestPack[]>;
  get(id: string): Promise<QuestPack | undefined>;
}

export interface VirtueLexicon {
  label(virtueId: VirtueId, locale?: string): string;
}

export interface KaiAdventureRoutesProps {
  basePath?: string;
  storage: StorageAdapter;
  questSource: QuestSource;
  virtueLexicon: VirtueLexicon;
}
```

Scene types are discriminated by `kind`. Choice targets reference scene IDs; mission, transformation, and reward scenes reference typed local entities. Components receive resolved copy and typed view models rather than raw storage.

## 6. Quest content and validation

Each region has a local TypeScript quest pack. Content modules contain data only and import no React component.

At test time—and development startup—Zod schemas verify:

- supported schema and quest versions;
- globally unique quest IDs and unique scene IDs within a pack;
- a valid start scene and valid choice/next targets;
- all scenes reachable from the start;
- at least one path to mission, transformation, and reward;
- matching virtue/region/reward relationships;
- known challenge tags and supported age bands;
- nonempty default English copy and unique text keys;
- child caption and action-length budgets;
- one parent prompt and one reward per quest.

Invalid built-in content fails tests and development startup. Production uses only the prevalidated bundled catalog.

### Deterministic selection

`selectQuest(catalog, regionId, setup)` performs:

1. filter by `regionId` and age-band support;
2. score exact challenge-tag matches above nonmatches;
3. sort by descending score, then ascending `priority`, then lexicographic quest ID;
4. return the first pack;
5. persist that quest ID before entering its first scene.

Existing persisted selections always win when the pack remains valid. No random number, current time, network result, or runtime model affects selection.

Challenge recommendations are separate from selection:

- afraid to try / lacks confidence → Courage;
- struggles to share / avoids helping → Kindness;
- gives up quickly / becomes frustrated → Perseverance.

## 7. State model and reducer

Use one pure `adventureReducer(state, event)` with exhaustive event handling. Events include:

- `SETUP_COMPLETED`;
- `QUEST_SELECTED`;
- `SCENE_ENTERED`;
- `CHOICE_MADE`;
- `MISSION_ACCEPTED`;
- `MISSION_COMPLETED`;
- `TRANSFORMATION_STARTED`;
- `TRANSFORMATION_FINISHED`;
- `REWARD_COLLECTED`;
- `RECOVERY_ACKNOWLEDGED`;
- `RESET_COMPLETED`.

Important invariants:

- Courage is available until restored; the other regions are sleeping until then.
- An active run references a valid selected quest and scene.
- `MISSION_COMPLETED` persists before navigation to transformation.
- Transformation can safely restart after reload.
- `TRANSFORMATION_FINISHED` adds quest and region IDs idempotently.
- `REWARD_COLLECTED` adds the reward ID idempotently and clears the active run only after a safe destination exists.
- Browser history never rolls state backward.

The provider dispatches an event, computes the next state, persists it, and only then performs route navigation. Persistence failure preserves the previous state and shows an inline recovery action rather than claiming success.

## 8. Storage strategy

### Keys and envelope

- Primary key: `heart-hero:kai-adventure:progress`
- Corrupt backup: `heart-hero:kai-adventure:corrupt:<timestamp>`
- Schema version: `1`

The local adapter reads an envelope, migrates it, validates the result, and returns typed progress. It never exposes raw `localStorage` access to components.

### Migration and recovery

- Missing key → return `null`, then use clean initial state.
- Valid v1 → load directly.
- Known older version → run sequential pure migrations and validate v1.
- Invalid JSON, invalid migrated data, or unknown future version → copy the raw value to a corrupt backup, remove the primary value, return clean state with `recoveryNotice`.
- Storage unavailable or quota failure → retain the current in-memory state, show a specific message, and offer Retry or Reset.

Reset enumerates keys and removes only those beginning `heart-hero:kai-adventure:` after confirmation. Tests must prove unrelated local-storage keys survive.

## 9. Routing and route guards

The standalone shell uses `BrowserRouter` and mounts:

```text
/
/setup
/map
/quest/:regionId/:sceneId
/mission/:regionId
/transform/:regionId
/reward/:regionId
/collection
/grown-up
/reset
```

`KaiAdventureRoutes` accepts `basePath`, allowing future mounting at `/kai` without changing feature internals. Guards validate setup, region availability, selected quest, active scene, mission state, and completion state.

Invalid or stale URLs redirect to the nearest safe route:

- missing setup → `/setup`;
- sleeping region → `/map` with a status notice;
- invalid scene/region → current valid active route or `/map`;
- completed mission before transformation → `/transform/:regionId`;
- finished transformation before collection → `/reward/:regionId`.

Vercel receives a catch-all rewrite to `/index.html`, so direct SPA route refreshes work.

## 10. Component boundaries

- `KaiAdventureRoutes`: public route boundary and dependency injection.
- `AdventureProvider`: hydration, reducer dispatch, persistence sequencing, and recovery state.
- `SceneFrame`: heading focus, live region, safe-area layout, and view transition shell.
- `WorldMap`: derives region view models; contains no selection or storage logic.
- `QuestSceneView`: renders discriminated scene types and resolved copy.
- `MissionView`: mission state and actions through reducer events.
- `TransformationSequence`: visual phase runner; completion callback is idempotent.
- `HeroCollection`: renders collected/missing reward view models.
- `GrownUpView` and `ResetDialog`: reflection, setup link, and confirmed reset.
- `KaiFigure`, `PipGuide`, and layered region scenes: original visual components with accessible metadata.

Screens do not call `localStorage`, select quests, mutate progress arrays, or hardcode virtue labels.

## 11. Visual and animation strategy

- Scope CSS under `.kai-adventure` and define all palette, typography, elevation, focus, and motion values as `--kai-*` tokens.
- Keep global CSS to Tailwind layers, body baseline, and the feature root mount.
- Use layered inline SVG when React-controlled state changes layers; use imported SVG files for static decorative art.
- Give major SVGs fixed view boxes and named groups: `sky`, `terrain`, `characters`, `interactive`, `effects`, `reward`.
- Drive transformations with a declarative phase array and phase classes/data attributes.
- Animate only named properties. Micro interactions stay at 100–150 ms; scene transitions at 300–400 ms; the skippable Courage narrative sequence may total about three seconds in bounded beats.
- A custom `useReducedMotion` hook applies final state immediately and disables Pip loops, parallax, pulse, and essential-content fades.
- Keep a visible skip action throughout each transformation.

## 12. Accessibility architecture

- Radix/shadcn Dialog and RadioGroup provide focus trapping and composite keyboard behavior.
- `SceneFrame` owns focus-on-navigation and a single polite live region.
- All interactive artwork is wrapped by semantic buttons; decorative SVG children use `aria-hidden`.
- Meaningful scenes use `role="img"`, `<title>`, and `<desc>`; nearby text duplicates essential actions and status.
- Region view models provide textual status so state never depends on color.
- Automated axe scans cover every major route; manual tests cover logical tab order, Enter/Space, Escape, focus return, browser zoom, and reduced motion.
- Token pairs are checked for WCAG AA before visual sign-off.

## 13. Testing strategy

### Unit tests

- schema validation and invalid fixture rejection;
- deterministic selection across every setup combination;
- challenge recommendation mapping;
- reducer transition table and idempotency;
- availability selectors and Courage unlock rule;
- copy resolver age fallback and virtue lexicon use;
- migration, corrupt backup, storage failure, and scoped reset.

### Component tests

- setup group semantics, validation, and preserved values;
- world-map statuses and accessible labels;
- illustrated choices with keyboard activation;
- mission accept/complete behavior;
- skip and reduced-motion transformation paths;
- collection empty/partial/complete states;
- reset confirmation, cancellation, and focus return.

### End-to-end tests

- complete Courage from a clean device, reload after acceptance, transform, collect, and verify both unlocks;
- complete all three quests and verify map/collection persistence;
- direct-refresh every route and validate recovery redirects;
- run 375, 768, and 1280 px journeys;
- axe scan and keyboard-only critical path;
- corrupted/unknown storage recovery and unrelated-key preservation.

Use stable local assets and disable optional ambient motion in screenshot tests to prevent visual flakiness.

## 14. Vercel deployment

The repository is a static Vite application:

- install: `npm ci`;
- build: `npm run build`;
- output: `dist`;
- secrets/environment variables: none;
- server functions: none.

Root `vercel.json` during scaffolding:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Connect `origin/main` to a public Vercel project after scaffolding. Test the deployment on mobile, direct route refreshes, a clean storage profile, persisted progress, reduced motion, and reset. Record the production URL and test date in `BUILD_LOG.md`.

## 15. Integration interfaces

Future Heart Hero integration will:

1. copy or package only `src/features/kai-adventure`;
2. mount `KaiAdventureRoutes` at a parent-selected base path;
3. inject the parent-compatible quest source, virtue lexicon, and account-backed storage adapter;
4. map shared buttons/dialogs/icons to parent primitives at the feature boundary;
5. retain `.kai-adventure` scene tokens while mapping shared semantic tokens;
6. preserve quest, scene, virtue, region, and reward IDs during data migration.

An optional runtime content adapter may later implement `QuestSource`, but it must validate the same `QuestPack` schema and cannot become mandatory. The static source remains the fallback and the MVP ships no runtime adapter or OpenAI dependency.

## 16. Risks and mitigations

| Risk | Mitigation |
|---|---|
| SVG work consumes the schedule | Finish reusable Kai/Pip and Courage layers first; use simpler but complete secondary scenes |
| Complex motion becomes fragile | Use explicit reducer phases, bounded CSS transitions, skip, and final-state tests |
| Reload creates duplicate completion | Make reducer additions and callbacks idempotent; persist before navigation |
| Storage corruption strands the demo | Validate, back up, recover to clean state, and expose interface reset |
| Portrait layouts hide visual focus | Define scene focal zones and test 375 px from the visual phase onward |
| Parent integration creates CSS conflicts | Scope tokens/selectors and keep the standalone shell outside the feature |
| “AI project” wording implies runtime AI | Repeat zero-runtime-AI boundary in architecture, README, evidence, and dependency checks |
| Deep links fail on Vercel | Add the documented SPA rewrite and test every route in production |

## 17. Prohibited dependencies and coupling

The MVP must not contain or require:

- `@supabase/supabase-js`, authentication providers, protected routes, or account models;
- `openai`, model endpoints, prompt execution, runtime image generation, or API keys;
- Vercel/serverless functions, custom servers, databases, analytics dashboards, or secret environment variables;
- copied parent assets, religious labels, global parent navigation, or parent-specific context imports;
- component-embedded quest prose, hardcoded virtue labels, random quest selection, or direct component access to browser storage.
