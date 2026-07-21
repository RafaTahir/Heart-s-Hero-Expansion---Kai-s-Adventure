# Kai's Adventure — Heart Hero Integration Plan

**Current status:** Standalone hackathon product
**Future destination:** `heart-hero-quest/src/features/kai-adventure`
**Current restriction:** Do not modify or integrate into Heart Hero during the hackathon.

## 1. Standalone now

The target repository owns a small application shell whose only responsibilities are browser startup, top-level error handling, Router creation, and injection of local implementations. The actual experience lives under `src/features/kai-adventure` and must not import from `src/app`.

The standalone build uses:

- `StaticQuestSource` for the bundled English quest packs;
- `LocalStorageAdapter` for device progress;
- `EnglishVirtueLexicon` for Courage, Kindness, and Perseverance;
- a configurable route base, defaulting to `/`;
- `.kai-adventure` scoped visual tokens.

This keeps the hackathon deployment independent, static, resettable, and free of parent accounts, navigation, or database assumptions.

## 2. Modules intended to move

Move or package the complete feature directory:

```text
src/features/kai-adventure/
  assets/
  components/
  content/
  engine/
  hooks/
  routes/
  scenes/
  state/
  storage/
  styles/
  types/
  utils/
  index.ts
```

Do not move the standalone `src/app`, `src/main.tsx`, root router, standalone error boundary, Vercel configuration, or repository-specific README/build evidence into Heart Hero.

## 3. Stable public boundary

The feature barrel exports:

- `KaiAdventureRoutes` and `KaiAdventureRoutesProps`;
- `StorageAdapter`, `QuestSource`, and `VirtueLexicon`;
- `AdventureProgressV1` and migration helpers needed by adapters;
- stable `AgeBand`, `JourneyLength`, `ChallengeId`, `VirtueId`, and `RegionId` values;
- bundled `StaticQuestSource`, `EnglishVirtueLexicon`, and optionally `LocalStorageAdapter`;
- validation functions for any replacement quest source.

Heart Hero imports only from this barrel. It must not reach into feature-internal files or duplicate reducer logic.

Example future mount:

```tsx
<Route
  path="/kai/*"
  element={
    <KaiAdventureRoutes
      basePath="/kai"
      storage={accountStorage}
      questSource={staticQuestSource}
      virtueLexicon={heartHeroLexicon}
    />
  }
/>
```

React Router already exists in the parent, so the feature must not create a nested `BrowserRouter`.

## 4. Integration sequence

1. Pin the standalone release commit and run its complete tests.
2. Compare dependency majors with the then-current Heart Hero lockfile.
3. Copy/package only the feature directory and documented font/asset licenses.
4. Mount routes under a parent-selected base path such as `/kai/*`.
5. Replace standalone shared controls with thin adapters around parent shadcn primitives where APIs differ.
6. Map shared semantic tokens while preserving scoped `--kai-*` scene tokens.
7. Implement and test the account-backed `StorageAdapter`.
8. Select the desired `VirtueLexicon`; keep stored IDs unchanged.
9. Migrate optional local device progress only with explicit user consent and an idempotent migration.
10. Run Kai's unit/component/e2e suite inside the parent plus the parent's existing regression suite.
11. Release behind an ordinary parent navigation entry or feature flag; do not remove standalone support until the integration is stable.

## 5. Storage replacement

The reducer and components know only `StorageAdapter`:

```ts
interface StorageAdapter {
  load(): Promise<AdventureProgressV1 | null>;
  save(progress: AdventureProgressV1): Promise<void>;
  clear(): Promise<void>;
}
```

The standalone adapter stores one versioned local envelope. A future `AccountStorageAdapter` may read/write the same progress shape through Heart Hero's account layer. It must preserve:

- quest, scene, region, virtue, and reward IDs;
- idempotent completed/restored/collected sets;
- schema version and migration behavior;
- persistence-before-navigation semantics;
- explicit error/retry behavior.

The feature must not import Supabase or any account client directly. Account identity and transport remain parent concerns. If progress synchronization is added, the adapter owns conflict policy; the reducer remains deterministic.

### Optional device-to-account migration

- Detect local progress only after the user is signed in and the feature is mounted.
- Show the user what will be imported; do not silently merge child data.
- Merge by stable IDs, treating completed/restored/collected arrays as sets.
- Prefer the furthest valid active scene only when both records refer to the same selected quest version; otherwise retain account progress and preserve the local backup.
- Record the import as completed so it cannot repeat.

This behavior is future work and is not implemented in the hackathon repository.

## 6. Alternative terminology and localization

Quest logic stores `VirtueId`, never a display label. Components request labels from:

```ts
interface VirtueLexicon {
  label(virtueId: VirtueId, locale?: string): string;
}
```

The MVP injects plain English. A future Heart Hero lexicon may provide alternative terminology without changing quest IDs, availability rules, storage, analytics keys, or engine behavior.

Quest copy uses stable text keys, an English default, and optional age variants. A future localization layer may resolve those keys from locale bundles. The built-in English fallback remains available. Do not search/replace virtue text through components or mutate IDs to match translated labels.

## 7. Quest-source replacement

The engine consumes `QuestSource` and validates every returned `QuestPack`. The static source remains the default and offline-safe implementation.

A future authored-content service or optional runtime generator may implement the same interface, but it must:

- return the same versioned schema;
- pass all graph, content, age, and identifier validation;
- fail safely to the static source;
- never make runtime generation mandatory for the feature;
- add explicit loading, error, privacy, safety, cost, and moderation requirements before release.

No such adapter, service, endpoint, key, or SDK belongs in the hackathon MVP.

## 8. Design-system integration

### Reuse from Heart Hero

- Button, Dialog/AlertDialog, RadioGroup, visually-hidden, toast/live-region, and icon conventions where accessible and API-compatible.
- Existing React Router and app-level error/logging infrastructure.
- Shared semantic tokens for base text, focus, destructive actions, and common surfaces when they meet contrast requirements.

### Keep Kai-scoped

- Scene palettes, restoration colors, region-specific lighting, story typography, map geometry, SVG layer IDs, transformation timings, and character/reward art.
- `.kai-adventure` root and `--kai-*` variables.
- Full-screen scene layout and visual progress language.

### Avoid duplication and pollution

- Do not copy the parent's global `index.css` into the feature.
- Do not register a second Tailwind reset or global body theme.
- Do not ship duplicate shadcn components when a compatible parent primitive can be adapted.
- Do not reuse the parent's global Navbar inside child scenes; the feature uses its own sparse map/collection/grown-up navigation.
- Do not expose generic feature class names such as `.card`, `.glass`, or `.hero`; use scoped components or `kai-` names.

## 9. Compatibility risks

| Risk | Required response |
|---|---|
| Parent upgrades React/Router/Tailwind | Test a compatibility branch; adapt the feature boundary rather than forking engine/content |
| Parent Supabase types leak into feature | Reject direct imports; keep them inside `AccountStorageAdapter` outside the portable core |
| Global CSS changes scene art | Maintain `.kai-adventure` scoping and add visual regression coverage in the parent |
| Alternative labels change stored values | Store only stable IDs and resolve labels at render time |
| Parent auth has multiple child profiles | Construct one adapter per active child; never put profile logic in quest components |
| Existing routes collide | Change `basePath`; internal route definitions remain relative |
| Runtime source is unavailable | Fall back to bundled static packs and preserve current progress |

## 10. Integration acceptance criteria

- [ ] The standalone application still builds and tests from its own repository.
- [ ] Heart Hero mounts Kai under a configurable base path without a nested router.
- [ ] Feature code imports no standalone app-shell module.
- [ ] Quest engine and content tests run unchanged in the parent.
- [ ] Account persistence is provided only through `StorageAdapter`.
- [ ] Alternative labels render without changing stable IDs or stored progress.
- [ ] Parent primitives replace duplicates without changing Kai's accessible behavior.
- [ ] `.kai-adventure` styles do not alter non-Kai pages, and parent global styles do not break Kai scenes.
- [ ] No runtime AI is required; the static source remains fully functional.
