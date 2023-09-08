import React, { createContext, ReactNode, useState } from "react";
import { AppStates } from "../constants/types";
import tailwindConfig from "../../tailwind.config";

// Declare the context and its variable names with types
interface MainContextProps {
  theme: typeof tailwindConfig.theme;
  appState: AppStates;
  setAppState: (state: AppStates) => void;
}

// Create variable to hold the initial values
const initialMainContextValues: MainContextProps = {
  theme: tailwindConfig.theme?.extend,
  appState: AppStates.NOT_CONNECTED,
  setAppState: () => {},
};

const MainContext = createContext<MainContextProps>(initialMainContextValues);

interface MainProviderProps {
  children: ReactNode;
}

const MainProvider: React.FC<MainProviderProps> = ({ children }) => {
  const [appState, setAppState] = useState<AppStates>(AppStates.NOT_CONNECTED);
  const theme = tailwindConfig.theme?.extend;

  // Define and Export the provider state variables here
  const contextValues = {
    theme,
    appState,
    setAppState,
  };

  return (
    <MainContext.Provider value={contextValues}>
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, MainProvider };
