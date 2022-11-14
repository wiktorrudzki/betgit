import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

export { useUser };
