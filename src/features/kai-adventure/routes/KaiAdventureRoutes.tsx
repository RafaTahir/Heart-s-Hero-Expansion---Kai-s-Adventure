import { Navigate, Route, Routes } from "react-router-dom";

import { AdventureProvider } from "../engine/AdventureContext";
import type { KaiAdventureRoutesProps } from "../engine/types";
import { CollectionScreen, GrownUpScreen, MissionScreen, QuestScreen, ResetScreen, RewardScreen, TransformationScreen } from "../screens/AdventureScreens";
import { MapScreen, OpeningScreen, SetupScreen } from "../screens/VisualFoundation";

export function KaiAdventureRoutes({ basePath = "", storage, questSource, virtueLexicon }: KaiAdventureRoutesProps) {
  const prefix = basePath.replace(/^\/+|\/+$/g, "");
  const at = (path: string) => [prefix, path].filter(Boolean).join("/");

  return (
    <AdventureProvider storage={storage} questSource={questSource} virtueLexicon={virtueLexicon}>
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
    </AdventureProvider>
  );
}
