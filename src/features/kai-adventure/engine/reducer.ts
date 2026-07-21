import type { AdventureAction, AdventureProgressV1 } from "./types";

export const initialProgress: AdventureProgressV1 = {
  schemaVersion: 1,
  setup: null,
  selectedQuestIds: {},
  activeRun: null,
  missions: {},
  completedQuestIds: [],
  restoredRegionIds: [],
  collectedRewardIds: [],
};

function appendUnique<T>(items: readonly T[], item: T): T[] {
  return items.includes(item) ? [...items] : [...items, item];
}

export function adventureReducer(state: AdventureProgressV1, action: AdventureAction): AdventureProgressV1 {
  switch (action.type) {
    case "hydrated":
      return action.progress;
    case "setup-saved":
      return { ...state, setup: action.setup, selectedQuestIds: { ...state.selectedQuestIds, ...action.selectedQuestIds } };
    case "quest-started":
      return {
        ...state,
        selectedQuestIds: { ...state.selectedQuestIds, [action.regionId]: action.questId },
        activeRun: { questId: action.questId, sceneId: action.sceneId, choiceIds: [], transformationStarted: false },
      };
    case "scene-advanced":
      if (!state.activeRun) return state;
      return { ...state, activeRun: { ...state.activeRun, sceneId: action.sceneId, choiceIds: action.choiceId ? appendUnique(state.activeRun.choiceIds, action.choiceId) : state.activeRun.choiceIds } };
    case "mission-accepted":
      return { ...state, missions: { ...state.missions, [action.questId]: { status: "accepted" } } };
    case "mission-completed":
      return {
        ...state,
        missions: { ...state.missions, [action.questId]: { status: "completed" } },
        activeRun: state.activeRun ? { ...state.activeRun, sceneId: action.transformationSceneId, transformationStarted: true } : state.activeRun,
      };
    case "transformation-started":
      return state.activeRun ? { ...state, activeRun: { ...state.activeRun, transformationStarted: true } } : state;
    case "region-restored":
      return {
        ...state,
        completedQuestIds: appendUnique(state.completedQuestIds, action.questId),
        restoredRegionIds: appendUnique(state.restoredRegionIds, action.regionId),
        activeRun: state.activeRun ? { ...state.activeRun, sceneId: action.rewardSceneId } : state.activeRun,
      };
    case "reward-collected":
      return { ...state, collectedRewardIds: appendUnique(state.collectedRewardIds, action.rewardId) };
    case "run-ended":
      return { ...state, activeRun: null };
  }
}
