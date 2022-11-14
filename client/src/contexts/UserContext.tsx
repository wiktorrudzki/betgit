import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
};

type User = {
  username: string;
  id: number;
};

type UserProviderType = {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserContext = React.createContext<UserProviderType | undefined>(
  undefined
);
