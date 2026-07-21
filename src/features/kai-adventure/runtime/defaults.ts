import { questPacks } from "../content/questPacks";
import { LocalStorageAdapter } from "../engine/storage";
import type { QuestPack, QuestSource, VirtueId, VirtueLexicon } from "../engine/types";

export class StaticQuestSource implements QuestSource {
  constructor(private readonly packs: readonly QuestPack[] = questPacks) {}
  list() { return Promise.resolve(this.packs); }
  get(id: string) { return Promise.resolve(this.packs.find((pack) => pack.id === id)); }
}

export class EnglishVirtueLexicon implements VirtueLexicon {
  label(virtueId: VirtueId): string {
    return { courage: "Courage", kindness: "Kindness", perseverance: "Perseverance" }[virtueId];
  }
}

export const defaultStorage = new LocalStorageAdapter();
export const defaultQuestSource = new StaticQuestSource();
export const defaultVirtueLexicon = new EnglishVirtueLexicon();
