# Kai's Adventure — Visual UX Specification

**Status:** Implementation specification
**Experience target:** Premium picture book × animated adventure × layered pop-up toy

## 1. Visual language

The interface is a sequence of illustrated places, not a conventional website. Each view uses a full-bleed scene, a single dominant action, restrained text, and environmental state as navigation.

### Composition

- Use a consistent 1440×900 SVG composition space with `preserveAspectRatio` and safe focal zones for portrait crops.
- Keep Kai in the lower-left or center foreground and Pip near the next meaningful action.
- Reserve the lower 28% of scenes for short captions and actions without covering faces or mission objects.
- Keep a consistent page gutter: 16 px mobile, 24 px tablet, 32 px desktop.
- Do not use sidebars, dashboard navigation, dense card grids, stock photography, or generic purple gradients.

### Palette and restoration

All colors become scoped `--kai-*` tokens on `.kai-adventure`.

- **Faded world:** cool blue-gray, mist green, charcoal-violet shadows, low saturation, still shapes.
- **Shared restored light:** sunrise gold and warm cream.
- **Courage:** amber, coral, mineral cyan, clear dawn blue.
- **Kindness:** lantern gold, leaf teal, berry coral, warm bark.
- **Perseverance:** midnight blue, silver, starlight gold, restrained violet used only for night depth.

Restoration is not a color filter alone. It also changes cloud position, flower shape, path continuity, creature proximity, bridge geometry, star count, light sources, Pip brightness, and explicit status labels.

### Typography and copy

- Bundle an open-license story display face and highly legible rounded sans face locally.
- Display headings remain short and scale from 32 px mobile to 64 px desktop.
- Body text is at least 16 px; child primary controls are at least 18 px.
- Child captions: no more than two short sentences and approximately 24 words total.
- Primary action labels: normally four words or fewer.
- No tiny text below 12 px, paragraph walls, lesson summaries, scores, or pedagogical jargon.

## 2. Global interaction rules

- Every action uses `<button>` or `<a>`, never an interactive `div`.
- Touch targets are at least 44×44 px, separated by at least 8 px.
- All controls have a visible, 3:1 contrast `focus-visible` ring.
- Hover is enhancement only. Touch and keyboard expose the same labels and state.
- Press feedback uses a 100 ms color/scale response only when reduced motion is not requested.
- Page changes move focus to the new screen heading or scene container and update the document title.
- Dialogs trap focus, close with Escape, and return focus to their trigger.
- A persistent polite live region announces mission acceptance, region restoration, reward collection, storage recovery, and reset.
- Back navigation is supported. Route guards redirect impossible or stale deep links to the nearest valid stage with a short recovery notice.

## 3. Screen-by-screen specification

### Screen 1 — Opening scene (`/`)

**Scene:** Kai and dim Pip stand on a foreground ridge facing three faded landmarks. The Mountain of Echoes is the clearest silhouette; the woods and bridge sit farther away.

**Text:**

- “Kai's world is losing its light.”
- “Help restore it, one brave act at a time.”

**Primary action:** “Begin Adventure”
**Secondary affordance:** small but clearly labelled “Grown-up” control if saved setup exists.

**Behavior:** Pip glides once toward the primary action; Kai looks from the compass to the world. The initial action routes to setup when setup is absent and to the map when setup exists. Focus begins on the main heading, then the action.

### Screen 2 — Grown-up setup (`/setup`)

**Scene:** An open illustrated travel journal overlays a quiet camp scene. Kai and Pip remain decorative at the edge so the grown-up context is clear without losing the story world.

**Structure:** Three `<fieldset>` groups appear in a single, linear sequence:

1. Age band: three illustrated radio buttons.
2. Current challenge: six illustrated radio buttons, presented as two columns only when width permits.
3. Journey length: Quick Quest or Three-Day Adventure.

**Primary action:** “Hand to Child”
**Validation:** on submit, focus the first incomplete legend and show a specific inline message. Do not validate while the user is choosing.

**Visual selections:** selected choices use a check shape, stronger border, short status text, and tonal change; color is not the only cue.

### Screen 3 — World map (`/map`)

**Scene:** A single illustrated landscape connects the mountain, woods, and bridge. Kai and Pip stand on a winding foreground path. No cards float above the map.

**Region states:**

- `available`: open path, pulsing landmark only in motion-safe mode, button label “Enter region.”
- `sleeping`: closed path, sleeping symbol, visible label “Sleeping — restore Courage first.”
- `restored`: warm environmental movement, reward emblem, visible label “Restored.”
- `mission accepted`: small mission pennant and “Return to mission.”

Courage is visually central and initially available. Once restored, both other paths unfold. If the setup challenge recommends one of the newly available virtues, Pip hovers beside that landmark and a nonexclusive “Suggested next” ribbon appears.

**Controls:** collection in the lower corner, grown-up in the opposite corner, reset only inside the grown-up area. Mobile uses a vertically panning composition with landmark buttons in DOM order: Courage, Kindness, Perseverance, Collection, Grown-up.

### Screen 4 — Region introduction (`/quest/:regionId/:sceneId`)

**Scene:** A camera-like move or cross-scene wipe enters the region. A title plaque is part of the landscape rather than a generic header.

**Content:** region name, virtue label, one short problem sentence, “Step closer.” Three-Day mode also shows a compact “Day 1 · Discover” marker.

**Kai/Pip:** Kai examines the obstacle. Pip points into the scene, dimmer than its final state.

### Screen 5 — Story scene (`/quest/:regionId/:sceneId`)

**Scene:** Full-screen environmental illustration with a foreground decision object and readable Kai/Pip poses.

**Choices:** one or two large illustrated buttons anchored to scene objects. Each includes a symbol, a caption of roughly 3–10 words, and an accessible label that includes the visible caption. Choices are not marked correct or incorrect. Selection produces one short reaction beat, saves the next scene, then advances.

**Courage depth:** two choice beats are permitted; Kindness and Perseverance use one each. Branches adjust reaction copy/pose and converge on the mission.

### Screen 6 — Real-world mission (`/mission/:regionId`)

**Scene object:** the mission appears as a compass message, lantern note, or star fragment—never a dashboard card.

**Content:** virtue name, one mission sentence, and one reassurance from Kai. Three-Day mode labels this “Day 3 · Do”; Quick Quest omits the marker.

**Actions:**

- Initial: “I'll do it.”
- Accepted: “I did it” and “Back to map.”
- Completed: redirect to transformation.

Acceptance immediately persists. A child may leave and return later. The interface deliberately permits “I did it” immediately for judge demonstrations and does not imply time verification.

### Screen 7 — Transformation (`/transform/:regionId`)

This is the signature payoff. Controls remain available while the sequence plays.

**Courage sequence:**

1. Pip traces a warm light path through the cavern.
2. Echo rings shrink and dissolve.
3. Storm clouds separate to reveal sunrise.
4. Crystal groups illuminate from near to far.
5. Kai's compass opens and emits a clear beam.
6. The restored landscape settles; the Courage Compass rises from the environment.

Use a reducer-controlled phase list. Individual beats last 300–500 ms; the total may span approximately 2.5–3 seconds because it is a skippable narrative sequence, not a blocking UI transition. Persist the transformation stage before starting so reload resumes safely.

**Kindness:** Pip carries light between creatures, roots uncurl, paths reconnect, lantern flowers bloom.
**Perseverance:** bridge stones settle in order, Pip steadies the last stone, star fragments rise, the sky brightens.

**Controls:** “Skip animation” is visible from the beginning. Skip and reduced motion apply the final state immediately. A live region announces “The Mountain of Echoes is restored,” or equivalent, only once.

### Screen 8 — Reward collection (`/reward/:regionId`)

**Scene:** the collectible occupies the visual center while Kai celebrates and Pip loops around it once in motion-safe mode.

**Actions:** “Add to Collection,” followed by “Back to Map” and a secondary “View Collection.” Collection is idempotent; reloading cannot duplicate the object.

### Screen 9 — Hero collection (`/collection`)

**Scene:** a carved cabinet/constellation embedded in the world. It contains exactly three named positions.

- Missing objects appear as outlined silhouettes with “Not found yet.”
- Collected objects show their original SVG, virtue label, region, and short action memory.
- Empty state says “Your first treasure is waiting in the Mountain of Echoes” with “Go to Map.”

No points, percentages, comparison, or dense inventory grid.

### Screen 10 — Parent reflection (`/grown-up`)

**Scene:** the travel journal returns with one prompt for each completed quest. Before completion, show a simple explanation and “Back to Adventure.”

**Initial Courage prompt:** “Ask your child what felt difficult before it became easier.”

Controls include “Change setup,” “Reset adventure,” and “Back to map.” Reset opens an accessible confirmation dialog. This screen makes no authentication or privacy-security claim.

### Screen 11 — Reset (`/reset`)

**Scene:** a quiet, desaturated map preview and a clearly grown-up confirmation panel.

**Copy:** explain that setup, missions, restored regions, and collectibles on this device will be removed.
**Actions:** “Cancel” and “Reset adventure.”
**Success:** clear only `heart-hero:kai-adventure:*`, announce completion, and route to `/` with focus on the opening heading.

## 4. Flow and transition map

```text
Opening → Setup → Map → Region intro → Story choice(s) → Mission
                                      Mission accepted → Map → Mission return
                                      Mission completed → Transform → Reward
                                                               ↘ Collection
                                                               ↘ Map
Map/Collection → Grown-up → Reflection / Change setup / Reset
Reset confirmed → Opening
```

Browser Back may return to a previous safe view but must not reverse a completed mission or remove restoration. State is authoritative; routes describe the current view.

## 5. Kai and Pip behavior matrix

| Moment | Kai | Pip |
|---|---|---|
| Faded world | concerned, compass closed | dim, close to Kai |
| Available choice | looks toward options | points to the first focusable option after a short delay |
| Choice made | acts on the chosen path | mirrors confidence or curiosity |
| Mission offered | faces the child, open posture | circles the mission object |
| Mission accepted | determined stance | brighter, points back toward map |
| Transformation | shields eyes, then steps forward | traces the restoration path |
| Reward | holds or observes collectible | brightest state, celebratory loop |

Pip never supplies dialogue, evaluates the child, or repeatedly moves in a distracting loop.

## 6. Responsive behavior

### Mobile — 375 px target

- Use `100dvh` with safe-area padding.
- Crop scenes around the active character/object; do not shrink the entire desktop composition into illegibility.
- Stack choices and keep the primary action reachable near the bottom without covering content.
- Allow map vertical panning within a controlled viewport; do not require horizontal precision tapping.
- Preserve 44 px targets and 16 px body text.

### Tablet — 768 px target

- Treat landscape tablet as the primary demonstration canvas.
- Keep choices beside or over the lower scene edge, with the full landmark visible.
- Setup may use two-column challenge choices while retaining DOM reading order.

### Desktop — 1280 px target

- Center the scene inside a maximum 1440 px composition with atmospheric side fill beyond it.
- Do not stretch text or controls across the viewport.
- Pointer hover may add subtle depth, but no information is hover-only.

## 7. Motion and reduced motion

- Micro feedback: 100–150 ms; dialogs and small entrances: 200–250 ms; scene changes: 300–400 ms.
- Specify properties explicitly; never use `transition: all`.
- Prefer transform and opacity; use SVG stroke/fill transitions only on bounded scene layers.
- Parallax is optional polish and is disabled on touch, reduced motion, and constrained devices.
- Do not animate child-readable text into view while it is being read.
- Reduced-motion mode uses immediate state replacement, static Pip guidance, no pulsing, no parallax, and no slow fades of essential content.

## 8. Reusable visual components

- `SceneFrame`: viewport, safe zones, heading focus, live-region integration.
- `LayeredScene`: semantic SVG title/description and named layer slots.
- `KaiFigure`: pose and compass-state variants.
- `PipGuide`: position, brightness, direction, and reduced-motion variants.
- `StoryCaption`: constrained child copy and optional day marker.
- `IllustratedChoice`: semantic choice button with icon/scene art and selection state.
- `RegionLandmark`: available/sleeping/restored/mission states.
- `MissionObject`: compass message, lantern note, or star fragment shell.
- `TransformationSequence`: phase runner, skip behavior, final-state callback.
- `RewardReveal`: collectible presentation and idempotent collect action.
- `GrownUpControl`: labelled trigger and journal transition.
- `ProgressConstellation`: three-object collection without scores.

## 9. Original SVG asset plan

All central assets are created directly in the repository.

- Character sheets: Kai base plus uncertain, deciding, acting, relieved, and celebrating poses; Pip dim, pointing, moving, and bright states.
- World map: shared terrain, paths, three landmark groups, status ornaments, and progress lights.
- Courage: cavern foreground/midground/background, echo rings, clouds, sunrise, crystal groups, compass beam, Courage Compass.
- Kindness: tree layers, tangled/untangled roots, three creature silhouettes, lantern flowers, Kindness Lantern.
- Perseverance: sky layers, bridge stones, star fragments, Perseverance Star.
- UI objects: travel journal, day ribbon, mission pennant, sleeping/restored marks, focus-safe icons.

Each major SVG uses stable group IDs such as `sky`, `terrain`, `characters`, `interactive`, `effects`, and `reward`. Decorative SVGs use empty alternative text; meaningful scenes use `role="img"`, `<title>`, and `<desc>`.

## 10. Visual acceptance checklist

- [ ] Every required screen is understandable from scene composition before reading.
- [ ] No screen resembles a corporate dashboard, chatbot, worksheet, or generic card grid.
- [ ] Kai and Pip remain visually consistent at mobile and desktop sizes.
- [ ] All region states differ through shape, label, and environment—not color alone.
- [ ] Courage's six-beat transformation is legible and skippable.
- [ ] Reduced motion reaches the same final meaning immediately.
- [ ] Focus order follows visual order and every control has a visible focus state.
- [ ] Child copy and action labels remain within the specified limits.
- [ ] The map and all choices work without hover.
- [ ] Original SVG source is stored, editable, and attributable to this repository.
