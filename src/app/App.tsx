import { Route, Routes } from "react-router-dom";

import { KaiAdventureRoutes } from "@/features/kai-adventure";

export function App() {
  return (
    <Routes>
      <Route path="/*" element={<KaiAdventureRoutes />} />
    </Routes>
  );
}
