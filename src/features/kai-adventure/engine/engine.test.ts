import { questPacks } from "../content/questPacks";
import { adventureReducer, initialProgress } from "./reducer";
import { validateQuestPacks } from "./schema";
import { selectQuest } from "./selectQuest";
import { LocalStorageAdapter, STORAGE_KEY, STORAGE_PREFIX } from "./storage";

describe("portable quest engine", () => {
  it("validates all three static packs and selects deterministically", () => {
    expect(validateQuestPacks(questPacks)).toHaveLength(3);
    expect(selectQuest(questPacks, "mountain-of-echoes", "fear")?.id).toBe("courage-echoes-v1");
    expect(selectQuest([...questPacks].reverse(), "mountain-of-echoes", "fear")?.id).toBe("courage-echoes-v1");
  });

  it("restores and collects idempotently", () => {
    const started = adventureReducer(initialProgress, { type: "quest-started", questId: "courage-echoes-v1", sceneId: "arrival", regionId: "mountain-of-echoes" });
    const restored = adventureReducer(started, { type: "region-restored", questId: "courage-echoes-v1", regionId: "mountain-of-echoes", rewardSceneId: "courage-reward" });
    const twice = adventureReducer(restored, { type: "region-restored", questId: "courage-echoes-v1", regionId: "mountain-of-echoes", rewardSceneId: "courage-reward" });
    const collected = adventureReducer(adventureReducer(twice, { type: "reward-collected", rewardId: "courage-compass" }), { type: "reward-collected", rewardId: "courage-compass" });
    expect(collected.restoredRegionIds).toEqual(["mountain-of-echoes"]);
    expect(collected.collectedRewardIds).toEqual(["courage-compass"]);
  });

  it("backs up malformed data and resets only Kai-prefixed keys", async () => {
    localStorage.clear();
    localStorage.setItem(STORAGE_KEY, "not-json");
    localStorage.setItem("unrelated:key", "keep");
    const storage = new LocalStorageAdapter(localStorage, () => 1234);
    await expect(storage.load()).resolves.toBeNull();
    expect(localStorage.getItem(`${STORAGE_PREFIX}corrupt:1234`)).toBe("not-json");
    expect(storage.recovery.message).toMatch(/fresh adventure/i);
    await storage.clear();
    expect(localStorage.getItem("unrelated:key")).toBe("keep");
    expect(Array.from({ length: localStorage.length }, (_, index) => localStorage.key(index))).not.toContain(expect.stringContaining(STORAGE_PREFIX));
  });

  it("migrates known version zero and rejects an unknown future version", async () => {
    localStorage.clear();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ schemaVersion: 0, setup: null }));
    const storage = new LocalStorageAdapter(localStorage, () => 9);
    await expect(storage.load()).resolves.toMatchObject({ schemaVersion: 1, setup: null });
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ schemaVersion: 99 }));
    await expect(storage.load()).resolves.toBeNull();
    expect(localStorage.getItem(`${STORAGE_PREFIX}corrupt:9`)).toContain("99");
  });
});
