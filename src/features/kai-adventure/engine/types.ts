export type AgeBand = "6-7" | "8-9" | "10-11";
export type JourneyLength = "quick" | "three-day";
export type VirtueId = "courage" | "kindness" | "perseverance";
export type RegionId = "mountain-of-echoes" | "whispering-woods" | "bridge-of-falling-stars";
export type MissionStatus = "not-started" | "accepted" | "completed";
export type ChallengeId = "fear" | "confidence" | "sharing" | "helping" | "giving-up" | "frustration";

export interface TextVariant {
  default: string;
  ageBands?: Partial<Record<AgeBand, string>>;
}

export interface SceneBase {
  id: string;
  title: TextVariant;
  body: TextVariant;
}

export interface NarrativeScene extends SceneBase {
  type: "narrative";
  nextSceneId: string;
}

export interface ChoiceOption {
  id: string;
  label: TextVariant;
  reaction: TextVariant;
  nextSceneId: string;
}

export interface ChoiceScene extends SceneBase {
  type: "choice";
  choices: ChoiceOption[];
}

export interface MissionScene extends SceneBase {
  type: "mission";
  mission: TextVariant;
  reassurance: TextVariant;
  nextSceneId: string;
}

export interface TransformationScene extends SceneBase {
  type: "transformation";
  nextSceneId: string;
}

export interface RewardScene extends SceneBase {
  type: "reward";
  rewardId: string;
}

export type QuestScene = NarrativeScene | ChoiceScene | MissionScene | TransformationScene | RewardScene;

export interface Reward {
  id: string;
  name: TextVariant;
  memory: TextVariant;
}

export interface QuestPack {
  schemaVersion: 1;
  id: string;
  version: number;
  virtueId: VirtueId;
  regionId: RegionId;
  challengeTags: ChallengeId[];
  priority: number;
  scenes: QuestScene[];
  parentPrompt: TextVariant;
  reward: Reward;
}

export interface ParentSetup {
  ageBand: AgeBand;
  challengeId: ChallengeId;
  journeyLength: JourneyLength;
}

export interface ActiveQuestRun {
  questId: string;
  sceneId: string;
  choiceIds: string[];
  transformationStarted: boolean;
}

export interface MissionProgress {
  status: MissionStatus;
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

export type AdventureAction =
  | { type: "hydrated"; progress: AdventureProgressV1 }
  | { type: "setup-saved"; setup: ParentSetup; selectedQuestIds: Partial<Record<RegionId, string>> }
  | { type: "quest-started"; questId: string; sceneId: string; regionId: RegionId }
  | { type: "scene-advanced"; sceneId: string; choiceId?: string }
  | { type: "mission-accepted"; questId: string }
  | { type: "mission-completed"; questId: string; transformationSceneId: string }
  | { type: "transformation-started" }
  | { type: "region-restored"; questId: string; regionId: RegionId; rewardSceneId: string }
  | { type: "reward-collected"; rewardId: string }
  | { type: "run-ended" };
