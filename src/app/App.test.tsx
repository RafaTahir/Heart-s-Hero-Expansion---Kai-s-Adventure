import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { App } from "./App";

describe("App", () => {
  it("renders the illustrated map at a direct route", () => {
    render(
      <MemoryRouter initialEntries={["/map"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: /choose a path/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /mountain of echoes/i })).toBeInTheDocument();
  });
});
