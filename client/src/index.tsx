import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RouteProvider } from "./contexts/RouteContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouteProvider>
      <App />{" "}
    </RouteProvider>
  </React.StrictMode>
);
