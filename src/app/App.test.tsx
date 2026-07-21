import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { App } from "./App";
import { initialProgress } from "@/features/kai-adventure/engine/reducer";
import { STORAGE_KEY } from "@/features/kai-adventure/engine/storage";

describe("App", () => {
  it("renders the illustrated map at a direct route", async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...initialProgress,
      setup: { ageBand: "8-9", challengeId: "fear", journeyLength: "quick" },
      selectedQuestIds: { "mountain-of-echoes": "courage-echoes-v1" },
    }));
    render(
      <MemoryRouter initialEntries={["/map"]} future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <App />
      </MemoryRouter>,
    );

    expect(await screen.findByRole("heading", { name: /choose a path/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /mountain of echoes/i })).toBeInTheDocument();
  });
});
