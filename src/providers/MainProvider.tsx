import React, { createContext, ReactNode, useEffect, useState } from "react";
import { AppStates, GameData } from "../constants/types";
import tailwindConfig from "../../tailwind.config";
import {
  updateLocalState,
  checkAndGetLocalState,
  updateGameDataStorage,
  checkAndGetGameDataFromStorage,
} from "../functions/state";

// Declare the context and its variable names with types
interface MainContextProps {
  theme: typeof tailwindConfig.theme;
  appState: AppStates;
  setAppState: (state: AppStates) => void;
  updateState: (state: AppStates) => void;
  gameData: GameData;
  updateGameData: (gameData: GameData) => void;
}

// Create variable to hold the initial values
const initialMainContextValues: MainContextProps = {
  theme: tailwindConfig.theme?.extend,
  appState: AppStates.NOT_CONNECTED,
  setAppState: () => {},
  updateState: () => {},
  gameData: {
    gameId: "",
    player: "",
    gameAmount: "",
    playerAmount: "",
  },
  updateGameData: () => {},
};

const MainContext = createContext<MainContextProps>(initialMainContextValues);

interface MainProviderProps {
  children: ReactNode;
}

const MainProvider: React.FC<MainProviderProps> = ({ children }) => {
  const [appState, setAppState] = useState<AppStates>(AppStates.NOT_CONNECTED);
  const [gameData, setGameData] = useState<GameData>({
    gameId: "",
    player: "",
    gameAmount: "",
    playerAmount: "",
  });
  const theme = tailwindConfig.theme?.extend;

  useEffect(() => {
    const currentState: AppStates = checkAndGetLocalState(
      AppStates.NOT_CONNECTED
    );
    setAppState(currentState);
  }, []);

  useEffect(() => {
    const currentGameData: GameData = checkAndGetGameDataFromStorage({
      gameId: "",
      player: "",
      gameAmount: "",
      playerAmount: "",
    });
    setGameData(currentGameData);
  }, []);

  const updateState = (state: AppStates) => {
    setAppState(state);
    updateLocalState(state);
  };

  const updateGameData = (gameData: GameData) => {
    setGameData(gameData);
    updateGameDataStorage(gameData);
  };

  // Define and Export the provider state variables here
  const contextValues = {
    theme,
    appState,
    setAppState,
    updateState,
    gameData,
    updateGameData,
  };

  return (
    <MainContext.Provider value={contextValues}>
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, MainProvider };
