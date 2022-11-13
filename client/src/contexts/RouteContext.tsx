import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
};

type RouteProviderType = {
  currentRoute: string;
  setCurrentRoute: React.Dispatch<React.SetStateAction<string>>;
};

export const RouteProvider: React.FC<Props> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState("/");

  return (
    <RouteContext.Provider value={{ currentRoute, setCurrentRoute }}>
      {children}
    </RouteContext.Provider>
  );
};

export const RouteContext = React.createContext<RouteProviderType | undefined>(
  undefined
);
