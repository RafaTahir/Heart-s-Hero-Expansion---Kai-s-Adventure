import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState, type ReactNode } from "react";

import { adventureReducer, initialProgress } from "./reducer";
import type { AdventureAction, AdventureProgressV1, QuestSource, StorageAdapter, VirtueLexicon } from "./types";

interface AdventureContextValue {
  progress: AdventureProgressV1;
  ready: boolean;
  notice: string;
  questSource: QuestSource;
  virtueLexicon: VirtueLexicon;
  dispatch: (action: AdventureAction) => void;
  reset: () => Promise<void>;
}

const AdventureContext = createContext<AdventureContextValue | null>(null);

export function AdventureProvider({ storage, questSource, virtueLexicon, children }: { storage: StorageAdapter; questSource: QuestSource; virtueLexicon: VirtueLexicon; children: ReactNode }) {
  const [progress, baseDispatch] = useReducer(adventureReducer, initialProgress);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let active = true;
    void storage.load().then((saved) => {
      if (!active) return;
      if (saved) baseDispatch({ type: "hydrated", progress: saved });
      const recovery = "recovery" in storage ? (storage as { recovery?: { message?: string | null } }).recovery?.message : null;
      setNotice(recovery ?? "");
      setReady(true);
    });
    return () => { active = false; };
  }, [storage]);

  const dispatch = useCallback((action: AdventureAction) => {
    baseDispatch(action);
  }, []);

  useEffect(() => {
    if (ready) void storage.save(progress).catch(() => setNotice("Progress could not be saved on this device."));
  }, [progress, ready, storage]);

  const reset = useCallback(async () => {
    await storage.clear();
    window.location.assign("/");
  }, [storage]);

  const value = useMemo(() => ({ progress, ready, notice, questSource, virtueLexicon, dispatch, reset }), [progress, ready, notice, questSource, virtueLexicon, dispatch, reset]);
  return <AdventureContext.Provider value={value}>{children}</AdventureContext.Provider>;
}

// Context hook intentionally shares this component module to keep the provider boundary private.
// eslint-disable-next-line react-refresh/only-export-components
export function useAdventure(): AdventureContextValue {
  const context = useContext(AdventureContext);
  if (!context) throw new Error("useAdventure must be used inside AdventureProvider");
  return context;
}
