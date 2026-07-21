import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { AdventureProvider } from "../engine/AdventureContext";
import type { KaiAdventureRoutesProps } from "../engine/types";
import { MapScreen, OpeningScreen, SetupScreen } from "../screens/VisualFoundation";

const QuestScreen = lazy(() => import("../screens/AdventureScreens").then((module) => ({ default: module.QuestScreen })));
const MissionScreen = lazy(() => import("../screens/AdventureScreens").then((module) => ({ default: module.MissionScreen })));
const TransformationScreen = lazy(() => import("../screens/AdventureScreens").then((module) => ({ default: module.TransformationScreen })));
const RewardScreen = lazy(() => import("../screens/AdventureScreens").then((module) => ({ default: module.RewardScreen })));
const CollectionScreen = lazy(() => import("../screens/AdventureScreens").then((module) => ({ default: module.CollectionScreen })));
const GrownUpScreen = lazy(() => import("../screens/AdventureScreens").then((module) => ({ default: module.GrownUpScreen })));
const ResetScreen = lazy(() => import("../screens/AdventureScreens").then((module) => ({ default: module.ResetScreen })));

export function KaiAdventureRoutes({ basePath = "", storage, questSource, virtueLexicon }: KaiAdventureRoutesProps) {
  const prefix = basePath.replace(/^\/+|\/+$/g, "");
  const at = (path: string) => [prefix, path].filter(Boolean).join("/");

  return (
    <AdventureProvider storage={storage} questSource={questSource} virtueLexicon={virtueLexicon}>
      <Suspense fallback={<main className="kai-loading" aria-live="polite"><p>Opening the next page…</p></main>}>
      <Routes>
        <Route path={at("")} element={<OpeningScreen />} />
        <Route path={at("setup")} element={<SetupScreen />} />
        <Route path={at("map")} element={<MapScreen />} />
        <Route path={at("quest/:regionId/:sceneId")} element={<QuestScreen />} />
        <Route path={at("mission/:regionId")} element={<MissionScreen />} />
        <Route path={at("transform/:regionId")} element={<TransformationScreen />} />
        <Route path={at("reward/:regionId")} element={<RewardScreen />} />
        <Route path={at("collection")} element={<CollectionScreen />} />
        <Route path={at("grown-up")} element={<GrownUpScreen />} />
        <Route path={at("reset")} element={<ResetScreen />} />
        <Route path="*" element={<Navigate to={prefix ? `/${prefix}` : "/"} replace />} />
      </Routes>
      </Suspense>
    </AdventureProvider>
  );
}
