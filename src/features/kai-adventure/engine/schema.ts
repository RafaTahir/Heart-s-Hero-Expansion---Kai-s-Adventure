import { z } from "zod";

import type { AdventureProgressV1, QuestPack } from "./types";

const ageBandSchema = z.enum(["6-7", "8-9", "10-11"]);
const challengeSchema = z.enum(["fear", "confidence", "sharing", "helping", "giving-up", "frustration"]);
const regionSchema = z.enum(["mountain-of-echoes", "whispering-woods", "bridge-of-falling-stars"]);
const virtueSchema = z.enum(["courage", "kindness", "perseverance"]);
const textVariantSchema = z.object({
  default: z.string().min(1),
  ageBands: z.record(ageBandSchema, z.string().min(1)).optional(),
});
const baseSceneSchema = z.object({ id: z.string().min(1), title: textVariantSchema, body: textVariantSchema });
const questSceneSchema = z.discriminatedUnion("type", [
  baseSceneSchema.extend({ type: z.literal("narrative"), nextSceneId: z.string().min(1) }),
  baseSceneSchema.extend({
    type: z.literal("choice"),
    choices: z.array(z.object({ id: z.string().min(1), label: textVariantSchema, reaction: textVariantSchema, nextSceneId: z.string().min(1) })).min(1).max(2),
  }),
  baseSceneSchema.extend({ type: z.literal("mission"), mission: textVariantSchema, reassurance: textVariantSchema, nextSceneId: z.string().min(1) }),
  baseSceneSchema.extend({ type: z.literal("transformation"), nextSceneId: z.string().min(1) }),
  baseSceneSchema.extend({ type: z.literal("reward"), rewardId: z.string().min(1) }),
]);

export const questPackSchema: z.ZodType<QuestPack> = z.object({
  schemaVersion: z.literal(1),
  id: z.string().min(1),
  version: z.number().int().positive(),
  virtueId: virtueSchema,
  regionId: regionSchema,
  challengeTags: z.array(challengeSchema).min(1),
  priority: z.number().int(),
  scenes: z.array(questSceneSchema).min(5),
  parentPrompt: textVariantSchema,
  reward: z.object({ id: z.string().min(1), name: textVariantSchema, memory: textVariantSchema }),
}).superRefine((pack, context) => {
  const sceneIds = new Set<string>();
  const choiceIds = new Set<string>();
  for (const scene of pack.scenes) {
    if (sceneIds.has(scene.id)) context.addIssue({ code: "custom", message: `Duplicate scene id: ${scene.id}` });
    sceneIds.add(scene.id);
    if (scene.type === "choice") {
      for (const choice of scene.choices) {
        if (choiceIds.has(choice.id)) context.addIssue({ code: "custom", message: `Duplicate choice id: ${choice.id}` });
        choiceIds.add(choice.id);
      }
    }
  }
  for (const scene of pack.scenes) {
    const nextIds = scene.type === "choice" ? scene.choices.map((choice) => choice.nextSceneId) : scene.type === "reward" ? [] : [scene.nextSceneId];
    for (const nextId of nextIds) if (!sceneIds.has(nextId)) context.addIssue({ code: "custom", message: `Unreachable transition target: ${nextId}` });
    if (scene.type === "reward" && scene.rewardId !== pack.reward.id) context.addIssue({ code: "custom", message: "Reward scene and pack reward differ" });
  }
  if (pack.scenes[0]?.type !== "narrative") context.addIssue({ code: "custom", message: "First scene must be narrative" });
  if (!pack.scenes.some((scene) => scene.type === "mission")) context.addIssue({ code: "custom", message: "Mission scene required" });
  if (!pack.scenes.some((scene) => scene.type === "transformation")) context.addIssue({ code: "custom", message: "Transformation scene required" });
  if (!pack.scenes.some((scene) => scene.type === "reward")) context.addIssue({ code: "custom", message: "Reward scene required" });
});

export const progressSchema: z.ZodType<AdventureProgressV1> = z.object({
  schemaVersion: z.literal(1),
  setup: z.object({ ageBand: ageBandSchema, challengeId: challengeSchema, journeyLength: z.enum(["quick", "three-day"]) }).nullable(),
  selectedQuestIds: z.record(regionSchema, z.string()),
  activeRun: z.object({ questId: z.string(), sceneId: z.string(), choiceIds: z.array(z.string()), transformationStarted: z.boolean() }).nullable(),
  missions: z.record(z.string(), z.object({ status: z.enum(["not-started", "accepted", "completed"]) })),
  completedQuestIds: z.array(z.string()),
  restoredRegionIds: z.array(regionSchema),
  collectedRewardIds: z.array(z.string()),
});

export function validateQuestPacks(packs: readonly QuestPack[]): readonly QuestPack[] {
  const ids = new Set<string>();
  for (const pack of packs) {
    questPackSchema.parse(pack);
    if (ids.has(pack.id)) throw new Error(`Duplicate quest pack id: ${pack.id}`);
    ids.add(pack.id);
  }
  return packs;
}
