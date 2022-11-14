import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RouteProvider } from "./contexts/RouteContext";
import { UserProvider } from "./contexts/UserContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouteProvider>
      <UserProvider>
        <App />{" "}
      </UserProvider>
    </RouteProvider>
  </React.StrictMode>
);
