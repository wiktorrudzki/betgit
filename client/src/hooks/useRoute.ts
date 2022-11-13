import { useContext } from "react";
import { RouteContext } from "../contexts/RouteContext";

const useRoute = () => {
  const context = useContext(RouteContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

export { useRoute };
