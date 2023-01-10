import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RouteProvider } from "./contexts/RouteContext";
import { ShowMenuProvider } from "./contexts/ShowMenuContext";
import { UserProvider } from "./contexts/UserContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouteProvider>
      <UserProvider>
        <ShowMenuProvider>
          <App />{" "}
        </ShowMenuProvider>
      </UserProvider>
    </RouteProvider>
  </React.StrictMode>
);
