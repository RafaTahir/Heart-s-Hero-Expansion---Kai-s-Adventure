import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { App } from "./App";

describe("App", () => {
  it("renders the illustrated map at a direct route", async () => {
    render(
      <MemoryRouter initialEntries={["/map"]} future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <App />
      </MemoryRouter>,
    );

    expect(await screen.findByRole("heading", { name: /choose a path/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /mountain of echoes/i })).toBeInTheDocument();
  });
});
