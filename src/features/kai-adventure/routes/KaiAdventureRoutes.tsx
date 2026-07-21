import { Navigate, Route, Routes } from "react-router-dom";

import { FoundationPlaceholder, MapScreen, OpeningScreen, SetupScreen } from "../screens/VisualFoundation";

export function KaiAdventureRoutes() {
  return (
    <Routes>
      <Route index element={<OpeningScreen />} />
      <Route path="setup" element={<SetupScreen />} />
      <Route path="map" element={<MapScreen />} />
      <Route path="quest/:regionId/:sceneId" element={<FoundationPlaceholder title="A trail into the story" />} />
      <Route path="collection" element={<FoundationPlaceholder title="The hero collection" />} />
      <Route path="grown-up" element={<FoundationPlaceholder title="The grown-up journal" />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
