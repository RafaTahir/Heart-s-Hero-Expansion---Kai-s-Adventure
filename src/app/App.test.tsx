import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { App } from "./App";

describe("App", () => {
  it("renders the scaffold and supports the map deep link", () => {
    render(
      <MemoryRouter initialEntries={["/map"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: /kai's adventure is waking up/i })).toBeInTheDocument();
  });
});
