import { useContext } from "react";
import { ShowMenuContext } from "../contexts/ShowMenuContext";

const useShowMenu = () => {
  const context = useContext(ShowMenuContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

export { useShowMenu };
