import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ShowMenuProvider } from "./contexts/ShowMenuContext";
import { UserProvider } from "./contexts/UserContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserProvider>
      <ShowMenuProvider>
        <App />
      </ShowMenuProvider>
    </UserProvider>
  </React.StrictMode>
);
