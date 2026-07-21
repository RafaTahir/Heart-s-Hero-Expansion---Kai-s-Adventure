# Kai's Adventure — Hackathon Evidence Plan

**Event:** OpenAI Build Week
**Category:** Education
**Evidence principle:** Make every claim traceable to a session record, commit, test result, screenshot, or deployment.

## 1. Provenance statement

Use this distinction consistently:

- **Pre-existing:** Heart Hero (`RafaTahir/heart-hero-quest`) existed before this hackathon and is inspected only for technology and future-integration compatibility.
- **New during Build Week:** Kai's Adventure is designed and built from an empty standalone repository, with original quest architecture, content, characters, SVG scenes, interactions, persistence, tests, documentation, and deployment.
- **Human decisions:** Rafa owns the product vision, audience, characters, virtues, regions, zero-runtime-AI choice, scope, delivery priorities, and approval of each phase.
- **Codex work:** Codex assists with repository inspection, planning, implementation, original code/SVG construction, testing, debugging, documentation, and evidence assembly under Rafa's direction.
- **GPT-5.6 use:** GPT-5.6 is used through Codex to reason about product requirements, architecture, UX, implementation, tests, and refinement.
- **Runtime truth:** The deployed application does not call GPT-5.6 or any OpenAI API. It contains typed local quest packs and requires no API key, backend, billing, or secret.

Do not say “AI-powered experience,” “generated for each child,” or similar language that implies runtime generation.

## 2. Build log evidence

Create one `BUILD_LOG.md` entry per phase containing:

- date/time and phase name;
- work completed;
- decisions made or approved by Rafa;
- work performed by Codex;
- changed modules at a subsystem level;
- verification commands and exact pass/fail results;
- manual checks and devices/viewports;
- primary commit SHA and SHA-record commit;
- Vercel preview/production URL where applicable;
- screenshots/evidence produced;
- known issues, cuts, and next allowed phase.

Never rewrite history to hide a failed test or abandoned approach. Record the failure and the verified correction concisely.

## 3. Codex and GPT-5.6 session evidence

For each meaningful session, retain a short factual summary in the build log or submission working notes:

- session objective and approved scope;
- important prompts or user decisions without personal/sensitive data;
- artifacts created or changed;
- checks run and defects found;
- decisions made by Rafa versus proposals made/executed by Codex;
- resulting commit SHA.

Useful evidence includes Codex task screenshots, plan excerpts, diffs, test output, and commit links. Do not publish hidden reasoning, credentials, local absolute paths, private configuration, or unrelated repository content.

## 4. Commit evidence

The repository history is the primary chronology.

Expected primary commits:

1. `docs: define Kai's Adventure product and build plan`
2. `chore: scaffold Kai's Adventure application`
3. `feat: establish Kai visual world and design system`
4. `feat: implement portable local quest engine`
5. `feat: complete Courage adventure journey`
6. `feat: add Kindness and Perseverance regions`
7. `feat: polish visual storytelling and accessibility`
8. `docs: prepare Kai's Adventure for judging`

Each primary commit is pushed to `origin/main`, recorded in a follow-up `docs: record <phase> commit`, linked from the log, and reported to Rafa. Evidence commits do not recursively record themselves.

At submission time, export or link:

- the planning commit;
- scaffold/first-deployment commit;
- Courage/demo-ready commit;
- final application commit;
- judging-documentation commit;
- the compare/history view showing incremental delivery.

## 5. Screenshot and before/after evidence

Capture stable PNG screenshots from the production build with ambient loops disabled.

### Required product frames

- opening scene with faded world;
- illustrated grown-up setup;
- initial map with Courage available and two sleeping regions;
- Courage story choice;
- Courage real-world mission accepted state;
- Mountain of Echoes immediately before restoration;
- the clearest transformation midpoint;
- restored Mountain and unlocked paths;
- Courage Compass reward and partial collection;
- all three restored regions and complete collection;
- grown-up reflection and reset confirmation.

### Responsive evidence

For opening, map, mission, and restored map, capture:

- mobile at 375 px;
- tablet at 768 px;
- desktop at 1280 px.

### Accessibility evidence

- visible keyboard focus on map and choice controls;
- reduced-motion transformation final state;
- automated axe summary;
- contrast-check summary for token pairs;
- keyboard-only critical-path result.

### Pre-existing versus new evidence

- Link the empty target repository state or first planning commit.
- Link Heart Hero's inspected reference commit separately.
- Do not use Heart Hero screenshots as “before” product frames for Kai; explain that it is a compatibility reference, not an earlier Kai version.
- Show the target repository growing through phase commits.

Store judge-facing images in a documented repository evidence directory during the final phase, with filenames containing screen, state, and viewport.

## 6. README requirements

The final README must contain verified content for:

- one-sentence problem and product statement;
- public demo URL and `/reset` instructions;
- feature list centered on the real-world mission/restoration loop;
- static architecture and portable quest interfaces;
- exact local install, dev, test, and build commands;
- Vercel deployment configuration;
- accessibility and responsive behavior;
- what existed before Build Week and what is new;
- how Codex accelerated planning, coding, testing, and refinement;
- how GPT-5.6 contributed during development;
- explicit statement that no runtime AI or API key is used;
- Rafa's decisions versus Codex implementation work;
- relationship and future integration path to Heart Hero;
- asset/font licenses and original-art statement;
- known MVP scope cuts and future roadmap.

Remove the planning-stage banner only after the implementation and all claims are verified.

## 7. Demo video plan

Target a concise 90–150 second recording.

1. **Problem and promise (10–15 s):** abstract values become real actions; show the faded world.
2. **Setup (10–15 s):** select age, challenge, and Quick Quest; state that setup is local and account-free.
3. **Map and story (20–30 s):** show sleeping regions, enter Courage, and make a visual choice.
4. **Real-world bridge (15–20 s):** accept the mission, show persisted return state, then choose “I did it.”
5. **Signature payoff (20–30 s):** show the Courage transformation without cuts if timing permits, then collect the compass.
6. **Progress (10–15 s):** show the restored map, unlocked regions, collection, and reflection prompt.
7. **Technical truth (10–15 s):** static typed quest engine, local versioned persistence, original SVGs, no runtime AI/backend, future Heart Hero adapters.
8. **Close (5 s):** show public URL and reset route.

Record from a clean/rehearsed state, hide browser extensions and personal information, use no copyrighted music, and provide captions. Audio is optional for the product and may be added only to the submission video with appropriate rights.

## 8. `/feedback` session

Before final submission:

- run a dedicated `/feedback` session against the public deployment;
- ask for product value, child comprehension, visual originality, core-loop completeness, accessibility, and judge-demo risks;
- record the date, high-priority findings, accepted/rejected recommendations, and resulting commit(s);
- rerun verification after any change;
- do not add late features in response to feedback—fix clarity, defects, accessibility, or demo friction only.

## 9. Vercel evidence and testing

Record:

- Vercel project and production URL;
- deployment commit SHA and deployment timestamp;
- detected Vite build, `npm run build`, and `dist` output;
- confirmation that no environment variables or server functions exist;
- direct-refresh results for every public route;
- clean-storage and persisted-storage journeys;
- mobile/tablet/desktop checks;
- reduced-motion check;
- reset confirmation and replay;
- browser console/network inspection showing no model, Supabase, auth, or backend calls.

Retest the production URL immediately before submission and after any final documentation/deployment change.

## 10. Submission checklist

- [ ] Education category and family problem are stated clearly.
- [ ] Public Vercel URL opens without login.
- [ ] Courage can be completed from a clean device without assistance.
- [ ] `/reset` is obvious and works for judges.
- [ ] All three regions and rewards are functional.
- [ ] README install/test/build instructions pass from a clean checkout.
- [ ] Build log contains every primary phase SHA and verification result.
- [ ] Commit history demonstrates incremental Build Week work.
- [ ] Target was empty before planning; Heart Hero is identified as pre-existing reference only.
- [ ] Codex and GPT-5.6 contributions are accurate and supported by evidence.
- [ ] No runtime GPT-5.6/OpenAI API claim appears.
- [ ] Dependency and network review confirms zero runtime AI/backend/auth/secrets.
- [ ] Original SVG and font/license notes are complete.
- [ ] Before/after, responsive, reduced-motion, focus, and collection screenshots are included.
- [ ] Demo video is captioned, concise, rights-safe, and matches the deployed build.
- [ ] `/feedback` findings and responses are recorded.
- [ ] Accessibility, e2e, production build, and Vercel smoke checks pass.
- [ ] Submission text does not claim unimplemented roadmap features.
