import { Route, Routes } from "react-router-dom";

import { KaiAdventureRoutes } from "@/features/kai-adventure";
import { defaultQuestSource, defaultStorage, defaultVirtueLexicon } from "@/features/kai-adventure/runtime/defaults";

export function App() {
  return (
    <div className="kai-adventure">
      <Routes>
        <Route path="/*" element={<KaiAdventureRoutes storage={defaultStorage} questSource={defaultQuestSource} virtueLexicon={defaultVirtueLexicon} />} />
      </Routes>
    </div>
  );
}
