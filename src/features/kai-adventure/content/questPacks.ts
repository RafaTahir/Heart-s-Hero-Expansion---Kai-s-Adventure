import type { QuestPack, TextVariant } from "../engine/types";
import { validateQuestPacks } from "../engine/schema";

const text = (value: string): TextVariant => ({ default: value });

const courage: QuestPack = {
  schemaVersion: 1,
  id: "courage-echoes-v1",
  version: 1,
  virtueId: "courage",
  regionId: "mountain-of-echoes",
  challengeTags: ["fear", "confidence"],
  priority: 100,
  parentPrompt: text("Ask your child what felt difficult before it became easier."),
  reward: { id: "courage-compass", name: text("Courage Compass"), memory: text("I took one brave step even when I felt unsure.") },
  scenes: [
    { id: "arrival", type: "narrative", title: text("Mountain of Echoes"), body: text("The mountain repeats every worried thought. Kai's compass will not open."), nextSceneId: "echo-gate" },
    { id: "echo-gate", type: "choice", title: text("The echo gate"), body: text("A rumble fills the path. How should Kai move closer?"), choices: [
      { id: "call-out", label: text("Call into the cave"), reaction: text("Kai's voice shakes, then steadies."), nextSceneId: "crystal-crossing" },
      { id: "follow-pip", label: text("Follow Pip's glow"), reaction: text("Pip lights one safe foothold at a time."), nextSceneId: "crystal-crossing" },
    ] },
    { id: "crystal-crossing", type: "choice", title: text("One more step"), body: text("Clouds gather above the final crystal."), choices: [
      { id: "small-step", label: text("Take a small step"), reaction: text("The crystal answers with a tiny light."), nextSceneId: "real-world-mission" },
      { id: "name-the-feeling", label: text("Name the worried feeling"), reaction: text("The echo grows quieter when Kai names it."), nextSceneId: "real-world-mission" },
    ] },
    { id: "real-world-mission", type: "mission", title: text("A brave act"), body: text("The compass needs a brave act from your world."), mission: text("Do one small thing that feels difficult, with a grown-up nearby if you need them."), reassurance: text("Brave can still feel wobbly."), nextSceneId: "restoration" },
    { id: "restoration", type: "transformation", title: text("Light returns"), body: text("Pip's trail reaches the heart of the mountain."), nextSceneId: "courage-reward" },
    { id: "courage-reward", type: "reward", title: text("The compass awakens"), body: text("The Mountain of Echoes shines at sunrise."), rewardId: "courage-compass" },
  ],
};

const kindness: QuestPack = {
  schemaVersion: 1, id: "kindness-woods-v1", version: 1, virtueId: "kindness", regionId: "whispering-woods", challengeTags: ["sharing", "helping"], priority: 90,
  parentPrompt: text("Ask who felt different after a kind act."),
  reward: { id: "kindness-lantern", name: text("Kindness Lantern"), memory: text("I shared some light and helped a path grow.") },
  scenes: [
    { id: "arrival", type: "narrative", title: text("Whispering Woods"), body: text("The creatures have pulled their little paths apart."), nextSceneId: "lantern-fork" },
    { id: "lantern-fork", type: "choice", title: text("A light to share"), body: text("Two forest friends wait in the dark."), choices: [
      { id: "share-lantern", label: text("Share the lantern"), reaction: text("Both faces glow in the same warm circle."), nextSceneId: "real-world-mission" },
      { id: "help-first", label: text("Help make a path"), reaction: text("Kai moves one branch and another friend joins in."), nextSceneId: "real-world-mission" },
    ] },
    { id: "real-world-mission", type: "mission", title: text("Pass the light"), body: text("The woods need a kind act from your world."), mission: text("Share, help, or include someone in one small way."), reassurance: text("Small kindness can make room for someone."), nextSceneId: "restoration" },
    { id: "restoration", type: "transformation", title: text("Paths reconnect"), body: text("Lantern flowers open from root to root."), nextSceneId: "kindness-reward" },
    { id: "kindness-reward", type: "reward", title: text("The woods remember"), body: text("A warm lantern rises from the leaves."), rewardId: "kindness-lantern" },
  ],
};

const perseverance: QuestPack = {
  schemaVersion: 1, id: "perseverance-bridge-v1", version: 1, virtueId: "perseverance", regionId: "bridge-of-falling-stars", challengeTags: ["giving-up", "frustration"], priority: 80,
  parentPrompt: text("Ask what helped your child try one more time."),
  reward: { id: "perseverance-star", name: text("Steady Star"), memory: text("I paused, tried again, and helped the bridge hold.") },
  scenes: [
    { id: "arrival", type: "narrative", title: text("Bridge of Falling Stars"), body: text("Each stone slips away before Kai can cross."), nextSceneId: "falling-span" },
    { id: "falling-span", type: "choice", title: text("Try another way"), body: text("The same jump has failed twice."), choices: [
      { id: "pause-breathe", label: text("Pause and breathe"), reaction: text("Kai notices a steadier rhythm in the stars."), nextSceneId: "real-world-mission" },
      { id: "smaller-pieces", label: text("Try smaller pieces"), reaction: text("One small stone settles, then the next."), nextSceneId: "real-world-mission" },
    ] },
    { id: "real-world-mission", type: "mission", title: text("Try once more"), body: text("The bridge needs a steady act from your world."), mission: text("Return to something frustrating and try one small next step."), reassurance: text("A pause can be part of trying."), nextSceneId: "restoration" },
    { id: "restoration", type: "transformation", title: text("The bridge holds"), body: text("Star stones settle beneath Kai's feet."), nextSceneId: "perseverance-reward" },
    { id: "perseverance-reward", type: "reward", title: text("A steady star"), body: text("The night path shines all the way across."), rewardId: "perseverance-star" },
  ],
};

export const questPacks = validateQuestPacks([courage, kindness, perseverance]);
