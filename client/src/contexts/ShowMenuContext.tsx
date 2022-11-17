import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
};

type ShowMenuProviderType = {
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ShowMenuProvider: React.FC<Props> = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <ShowMenuContext.Provider value={{ showMenu, setShowMenu }}>
      {children}
    </ShowMenuContext.Provider>
  );
};

export const ShowMenuContext = React.createContext<
  ShowMenuProviderType | undefined
>(undefined);
