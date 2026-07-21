import { Navigate, Route, Routes } from "react-router-dom";

import { AdventureProvider } from "../engine/AdventureContext";
import type { KaiAdventureRoutesProps } from "../engine/types";
import { FoundationPlaceholder, MapScreen, OpeningScreen, SetupScreen } from "../screens/VisualFoundation";

export function KaiAdventureRoutes({ basePath = "", storage, questSource, virtueLexicon }: KaiAdventureRoutesProps) {
  const prefix = basePath.replace(/^\/+|\/+$/g, "");
  const at = (path: string) => [prefix, path].filter(Boolean).join("/");

  return (
    <AdventureProvider storage={storage} questSource={questSource} virtueLexicon={virtueLexicon}>
      <Routes>
        <Route path={at("")} element={<OpeningScreen />} />
        <Route path={at("setup")} element={<SetupScreen />} />
        <Route path={at("map")} element={<MapScreen />} />
        <Route path={at("quest/:regionId/:sceneId")} element={<FoundationPlaceholder title="A trail into the story" />} />
        <Route path={at("collection")} element={<FoundationPlaceholder title="The hero collection" />} />
        <Route path={at("grown-up")} element={<FoundationPlaceholder title="The grown-up journal" />} />
        <Route path="*" element={<Navigate to={prefix ? `/${prefix}` : "/"} replace />} />
      </Routes>
    </AdventureProvider>
  );
}
