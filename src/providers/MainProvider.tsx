import React, { createContext, ReactNode, useEffect, useState } from "react";
import { AppStates } from "../constants/types";
import tailwindConfig from "../../tailwind.config";
import { updateLocalState, checkAndGetLocalState } from "../functions/state";

// Declare the context and its variable names with types
interface MainContextProps {
  theme: typeof tailwindConfig.theme;
  appState: AppStates;
  setAppState: (state: AppStates) => void;
  updateState: (state: AppStates) => void;
}

// Create variable to hold the initial values
const initialMainContextValues: MainContextProps = {
  theme: tailwindConfig.theme?.extend,
  appState: AppStates.NOT_CONNECTED,
  setAppState: () => {},
  updateState: () => {},
};

const MainContext = createContext<MainContextProps>(initialMainContextValues);

interface MainProviderProps {
  children: ReactNode;
}

const MainProvider: React.FC<MainProviderProps> = ({ children }) => {
  const [appState, setAppState] = useState<AppStates>(AppStates.NOT_CONNECTED);
  const theme = tailwindConfig.theme?.extend;

  useEffect(() => {
    const currentState: AppStates = checkAndGetLocalState(
      AppStates.NOT_CONNECTED
    );
    setAppState(currentState);
  }, []);

  const updateState = (state: AppStates) => {
    setAppState(state);
    updateLocalState(state);
  };

  // Define and Export the provider state variables here
  const contextValues = {
    theme,
    appState,
    setAppState,
    updateState,
  };

  return (
    <MainContext.Provider value={contextValues}>
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, MainProvider };
