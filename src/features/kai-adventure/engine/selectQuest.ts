import type { ChallengeId, QuestPack, RegionId, VirtueId } from "./types";

export const challengeRecommendation: Record<ChallengeId, VirtueId> = {
  fear: "courage",
  confidence: "courage",
  sharing: "kindness",
  helping: "kindness",
  "giving-up": "perseverance",
  frustration: "perseverance",
};

export function selectQuest(packs: readonly QuestPack[], regionId: RegionId, challengeId: ChallengeId): QuestPack | undefined {
  return [...packs]
    .filter((pack) => pack.regionId === regionId)
    .sort((left, right) => {
      const tagDifference = Number(right.challengeTags.includes(challengeId)) - Number(left.challengeTags.includes(challengeId));
      return tagDifference || right.priority - left.priority || left.id.localeCompare(right.id);
    })[0];
}
