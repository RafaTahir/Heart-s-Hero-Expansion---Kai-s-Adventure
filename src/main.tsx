import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { App } from "@/app/App";
import { AppErrorBoundary } from "@/app/ErrorBoundary";
import "@/index.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Kai's Adventure could not find its root element.");
}

createRoot(root).render(
  <StrictMode>
    <AppErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppErrorBoundary>
  </StrictMode>,
);
