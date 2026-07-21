# Kai's Adventure — Product Requirements

**Descriptor:** A Heart Hero Expansion
**Status:** Planning approved; application not yet implemented
**Category:** Education
**Primary audience:** Children aged 6–11
**Secondary audience:** A parent or guardian completing setup and reflection

## 1. Vision and problem

Kai's Adventure is a visual-first interactive storybook game in which children restore a fading fantasy world through real acts of courage, kindness, and perseverance.

Abstract character values are difficult for children to connect to daily behavior. Existing educational products often explain a value, quiz the child, or reward screen activity. Kai's Adventure instead makes a real-world action the turning point: the world changes only after the child accepts a small mission and returns to say, “I did it.”

> Children do not simply learn virtues. They help Kai restore a living world by practising them.

The MVP succeeds when it feels like a premium illustrated storybook, a small adventure game, and a tactile digital toy—not a chatbot, worksheet, dashboard, or generic collection of cards.

## 2. Product principles

1. **Show before telling.** Each major screen must communicate its purpose through composition, character pose, light, motion, and state before the child reads.
2. **Action creates meaning.** A story choice leads to a small real-world mission; completion produces the emotional and visual payoff.
3. **Kai acts, Pip reacts, the child decides.** Kai carries the emotional story. Pip guides attention and reacts without becoming a talking tutor.
4. **No moral test.** Choices are short, expressive ways forward, not obvious right/wrong answers or scored lessons.
5. **Restoration is progress.** The world map, environmental movement, and collectibles communicate progress without points or analytics.
6. **Child experience first.** Grown-up setup and reflection stay brief and separate from the adventure.
7. **Portable by design.** Content, progression, storage, virtue labels, and the feature entry point remain replaceable without rewriting the quest engine.
8. **Static and dependable.** The deployed product requires no account, backend, secret, network-generated content, API billing, or runtime AI.

## 3. Audience

### Primary user

Children in three bands:

- **6–7:** highly concrete language, strong icon support, one idea per caption.
- **8–9:** default narrative voice, short emotional context, clear consequences.
- **10–11:** slightly richer phrasing without longer interaction steps.

Children may use touch, mouse, keyboard, zoom, reduced motion, or assistive technology. Reading ability must not be the only way to understand a scene.

### Secondary user

A parent or guardian:

- chooses an age band, current challenge, and journey length;
- hands the device to the child;
- may later open one short reflection prompt;
- may reset the demo after an explicit confirmation.

No parent account, dashboard, progress analytics, or security claim is part of the MVP.

## 4. Characters

### Kai

Kai is a boy approximately nine years old. He is curious, warm, expressive, brave in flashes, and believably uncertain. He grows alongside the child rather than teaching from a position of perfection.

His consistent silhouette includes a warm brown explorer jacket, travel scarf, small satchel, and glowing compass. His poses must clearly show hesitation, attention, decision, effort, relief, and celebration. The character treatment must be original, age-appropriate, and readable from mobile size.

### Pip

Pip is a small floating fox-like companion made from warm light, with large ears, bright eyes, and a comet-like tail. Pip communicates through position, brightness, gesture, and movement rather than dialogue. Pip may point toward the next meaningful control, mirror Kai's emotion, or trace a restoration path. Pip begins dim and becomes brighter as regions recover.

## 5. World and virtues

Only plain-English virtue labels appear in this version.

| Region | Virtue | Initial state | Restored state | Reward |
|---|---|---|---|---|
| Mountain of Echoes | Courage | Storm-bound cavern; fearful echoes; dormant crystals | Clouds split, sunrise arrives, crystals glow, compass awakens | Courage Compass |
| Whispering Woods | Kindness | Creatures isolated; roots and paths tangled; lantern flowers closed | Creatures reconnect, paths reopen, flowers and tree lights awaken | Kindness Lantern |
| Bridge of Falling Stars | Perseverance | Unstable bridge; fallen stones; fragmented night sky | Stones settle, star fragments return, sky brightens, Kai and Pip cross | Perseverance Star |

The Mountain of Echoes is the required opening region and showcase vertical slice. Kindness and Perseverance are visible but sleeping until Courage is restored; both unlock together afterward.

## 6. Core journey

1. Open on Kai and Pip facing a faded world.
2. Show the two-line premise and “Begin Adventure.”
3. A grown-up chooses age band, current challenge, and journey length.
4. Hand the device to the child.
5. Show the interactive world map and three visible region states.
6. Enter an available region through a visual transition.
7. Discover the regional problem through a full-screen scene.
8. Make one or more large illustrated choices.
9. Receive one small real-world mission.
10. Choose “I'll do it,” which persists acceptance and permits a return to the map.
11. Return later—or continue immediately for a demonstration—and choose “I did it.”
12. Watch the region transform from faded to restored.
13. Collect the region's virtue object.
14. Return to a map that visibly preserves restoration.
15. Optionally open the collection or grown-up reflection.

There are no clocks or calendar gates. Quick Quest hides day framing. Three-Day Adventure labels Discover, Choose, and Do as Days 1–3 while using the same quest graph and allowing uninterrupted progress.

## 7. Functional requirements

### 7.1 Opening and setup

- The opening scene fills the viewport and contains only the approved premise, primary action, accessible grown-up context, and original scene art.
- Setup uses three labelled illustrated selection groups, not text inputs:
  - age: 6–7, 8–9, 10–11;
  - challenge: afraid to try, gives up quickly, struggles to share, avoids helping, becomes frustrated, lacks confidence;
  - length: Quick Quest, Three-Day Adventure.
- Every group requires one choice before continuing, preserves earlier selections on validation failure, and exposes semantic labels and focus states.
- Setup is stored locally and can be changed through the grown-up area.

### 7.2 World map and progression

- The map shows Kai, Pip, all three regions, region names, virtue symbols, and a status that is not communicated by color alone.
- Region states are `available`, `sleeping`, or `restored`.
- Courage is the sole available region before any completion. Restoring it unlocks Kindness and Perseverance.
- The selected challenge recommends a relevant available virtue without preventing another available choice:
  - afraid to try or lacks confidence → Courage;
  - struggles to share or avoids helping → Kindness;
  - gives up quickly or becomes frustrated → Perseverance.
- An accepted mission is visible on the relevant region with a clear “Return to mission” action.
- Completed regions remain inspectable in their restored state.

### 7.3 Quest loop

Every quest contains Discover, Choose, Do, Return, Transform, and Collect stages.

- Narrative captions contain no more than two short sentences.
- Primary action labels should usually contain no more than four words.
- Visual choices use semantic buttons, an original illustration or symbol, a short caption, and Kai/Pip reaction cues.
- Choices may change reaction copy or visual state but do not score the child or block completion.
- Each quest has one concrete mission:
  - Courage: “Try one thing once before saying, ‘I can't.’”
  - Kindness: “Help someone today before they ask.”
  - Perseverance: “Finish one small thing even when you want to stop.”
- “I'll do it” sets the mission to `accepted`. “I did it” sets it to `completed` and begins transformation.
- A reload at any stage resumes the same selected quest and scene.

### 7.4 Transformation and collection

- The Courage transformation is the most polished sequence and must visibly include Pip's light trail, separating clouds, sunrise, glowing crystals, Kai's compass awakening, and the reward reveal.
- Kindness and Perseverance receive shorter but complete region-specific sequences.
- A visible “Skip animation” control is available without waiting for the sequence to finish.
- Reduced-motion mode changes immediately to the restored composition and provides an assistive announcement.
- Completion atomically preserves the completed quest, restored region, and collected reward; reloads cannot lose or duplicate a reward.
- The collection shows silhouettes for missing rewards and full original illustrations for collected rewards.

### 7.5 Grown-up reflection and reset

- A clearly labelled grown-up control opens a separate view; it is not presented as authentication.
- Each completed quest exposes one short prompt. Courage's initial prompt is: “Ask your child what felt difficult before it became easier.”
- Reset has a plain explanation, Cancel and “Reset adventure” actions, keyboard focus management, and a second confirmation step.
- Reset removes only keys under `heart-hero:kai-adventure:` and returns to the opening scene.

## 8. Non-functional requirements

- Use React, Vite, TypeScript, Tailwind CSS, shadcn/Radix primitives, and React Router in versions compatible with the parent application's major versions.
- Enable strict TypeScript and keep feature code under `src/features/kai-adventure` behind a thin standalone shell.
- Store all quest content in typed local modules and validate it during tests.
- Require no OpenAI SDK, runtime generation, Supabase, authentication, backend function, external database, secret, or environment variable.
- Use original, repository-owned layered SVG/CSS assets for central visuals; do not copy parent imagery or copyrighted game art.
- Scope design tokens under `.kai-adventure` using `--kai-*` variables and avoid global CSS pollution.
- Build with `npm run build` into `dist` and support direct route refreshes on Vercel.
- Keep all core interactions usable offline after the static application has loaded.
- Set explicit SVG view boxes/aspect ratios, lazy-load noncritical region modules, and avoid layout shift.

## 9. Accessibility requirements

- WCAG AA contrast: 4.5:1 for body text and 3:1 for large text, meaningful icons, boundaries, and focus rings.
- Minimum 44×44 CSS pixel touch targets with at least 8 px between adjacent actions.
- Logical keyboard order; Enter/Space activation; Escape closes dialogs; focus returns to the trigger.
- Visible `focus-visible` styling on every interactive element.
- Native buttons, links, fieldsets, legends, radio groups, and dialogs; no clickable `div` elements.
- Meaning cannot rely on color: pair region state with shape, icon, label, and/or environmental detail.
- Meaningful SVG scenes expose a title and description; decorative layers are hidden.
- Announce persisted mission, restored region, and collected reward changes through a polite live region.
- Respect browser zoom and `prefers-reduced-motion`; no mandatory audio.
- Test at 375 px, 768 px, and 1280 px and with keyboard-only navigation.

## 10. Success criteria

The MVP is successful when:

- a first-time child can reach and understand the Courage mission without adult explanation after setup;
- the full Courage loop, including accept/return/complete/transform/collect, works after reloads;
- judges can reset and replay the experience without developer tools;
- Courage completion unlocks both remaining regions and the map visibly retains restoration;
- Kindness and Perseverance each provide a complete shorter loop and collectible;
- all three age bands, six challenges, and both length settings select deterministic local content;
- the production build contains no runtime AI or backend dependency;
- major screens pass automated accessibility checks and manual keyboard review;
- a direct refresh of every public route works on Vercel;
- the product is recognizable as an original visual storybook rather than a dashboard, chatbot, or template.

## 11. Scope and explicit exclusions

### MVP scope

- Eleven specified screens/views and their transitions.
- Three virtue regions, three missions, three transformations, and three collectibles.
- Courage-first progression, local persistence, collection, parent reflection, and reset.
- Original Kai, Pip, map, region, reward, and UI SVG assets.
- Static Vercel deployment and judge-ready evidence.

### Out of scope

- OpenAI API calls or any runtime AI generation.
- Supabase, authentication, accounts, cloud persistence, or parent analytics.
- Child avatar customization, multiplayer, social features, payments, voice narration, or required audio.
- Complex scoring, user-created quests, generated runtime images, or a content-management system.
- Eight completed regions, Islamic terminology, localization delivery, or integration into the parent repository.

These items must not be quietly reintroduced during the MVP.

## 12. Future roadmap

After the hackathon, possible additions are account-backed persistence, localization, alternative virtue lexicons, optional narration, more virtues and regions, richer parent reflection, and a validated runtime quest source. Each addition must use the existing storage, content-source, and label-provider boundaries. Runtime AI, if ever introduced, must be optional and must emit the same validated quest-pack schema; the static source remains a supported mode.

## 13. Product acceptance checklist

- [ ] Kai is consistently a boy approximately nine years old.
- [ ] Pip remains a nonverbal magical light-fox companion.
- [ ] Only Courage, Kindness, and Perseverance are implemented as MVP virtues.
- [ ] Courage is the first and deepest journey.
- [ ] The real-world mission, not an onscreen score, triggers restoration.
- [ ] Child copy meets the two-sentence and short-action limits.
- [ ] All eleven required views are reachable and have defined empty/error/recovery states.
- [ ] Persistence, corrupted-state recovery, and reset meet the specified behavior.
- [ ] All accessibility and responsive requirements are verified.
- [ ] No runtime AI, backend, authentication, or secret is present.
- [ ] README, build log, evidence, deployment, and integration documentation are complete.
