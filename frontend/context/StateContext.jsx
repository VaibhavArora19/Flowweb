import { createContext, useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";

export const AppContext = createContext();

export const AppWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [aiCode, setAiCode] = useState(null);

  useEffect(() => fcl.currentUser.subscribe(setUser), []);

  const sharedState = {
    user,
    aiCode,
    setAiCode,
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
};
