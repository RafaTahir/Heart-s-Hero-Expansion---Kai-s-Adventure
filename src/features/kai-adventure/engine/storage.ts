import { progressSchema } from "./schema";
import { initialProgress } from "./reducer";
import type { AdventureProgressV1, StorageAdapter } from "./types";

export const STORAGE_PREFIX = "heart-hero:kai-adventure:";
export const STORAGE_KEY = `${STORAGE_PREFIX}progress`;

type Migration = (value: Record<string, unknown>) => AdventureProgressV1;

const migrations: Record<number, Migration> = {
  0: (value) => progressSchema.parse({ ...initialProgress, ...value, schemaVersion: 1 }),
};

export interface StorageRecovery {
  message: string | null;
}

export class LocalStorageAdapter implements StorageAdapter {
  readonly recovery: StorageRecovery = { message: null };

  constructor(private readonly store: Storage = window.localStorage, private readonly now: () => number = Date.now) {}

  load(): Promise<AdventureProgressV1 | null> {
    const raw = this.store.getItem(STORAGE_KEY);
    if (raw === null) return Promise.resolve(null);
    try {
      const parsed: unknown = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") throw new Error("Stored progress is not an object");
      const version = "schemaVersion" in parsed ? (parsed as { schemaVersion?: unknown }).schemaVersion : 0;
      if (version === 1) return Promise.resolve(progressSchema.parse(parsed));
      if (typeof version === "number" && migrations[version]) return Promise.resolve(migrations[version](parsed as Record<string, unknown>));
      throw new Error(`Unsupported progress version: ${String(version)}`);
    } catch {
      const backupKey = `${STORAGE_PREFIX}corrupt:${this.now()}`;
      this.store.setItem(backupKey, raw);
      this.store.removeItem(STORAGE_KEY);
      this.recovery.message = "Saved progress could not be read. A fresh adventure is ready.";
      return Promise.resolve(null);
    }
  }

  save(progress: AdventureProgressV1): Promise<void> {
    this.store.setItem(STORAGE_KEY, JSON.stringify(progressSchema.parse(progress)));
    return Promise.resolve();
  }

  clear(): Promise<void> {
    const keys = Array.from({ length: this.store.length }, (_, index) => this.store.key(index)).filter((key): key is string => Boolean(key?.startsWith(STORAGE_PREFIX)));
    for (const key of keys) this.store.removeItem(key);
    return Promise.resolve();
  }
}
