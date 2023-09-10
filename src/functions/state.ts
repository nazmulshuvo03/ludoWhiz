import { AppStates, GameData, GameResult } from "../constants/types";

export const updateLocalState = (state: AppStates) => {
  localStorage.setItem("loduwhiz_state", JSON.stringify(state));
};

export const checkAndGetLocalState = (state: AppStates) => {
  const currentState = localStorage.getItem("loduwhiz_state");
  if (!currentState) {
    localStorage.setItem("loduwhiz_state", JSON.stringify(state));
  }
  return currentState ? JSON.parse(currentState) : state;
};

export const clearLocalState = () => {
  localStorage.removeItem("loduwhiz_state");
};

export const updateGameDataStorage = (data: GameData) => {
  localStorage.setItem("loduwhiz_game_data", JSON.stringify(data));
};

export const checkAndGetGameDataFromStorage = (data: GameData) => {
  const gameData = localStorage.getItem("loduwhiz_game_data");
  if (!gameData) {
    localStorage.setItem("loduwhiz_game_data", JSON.stringify(data));
  }
  return gameData ? JSON.parse(gameData) : data;
};

export const clearGameDataFromStorage = () => {
  localStorage.removeItem("loduwhiz_game_data");
};

export const updateGameResultStorage = (data: GameResult) => {
  localStorage.setItem("loduwhiz_game_result", JSON.stringify(data));
};

export const checkAndGetGameResultFromStorage = (data: GameResult) => {
  const gameData = localStorage.getItem("loduwhiz_game_result");
  if (!gameData) {
    localStorage.setItem("loduwhiz_game_result", JSON.stringify(data));
  }
  return gameData ? JSON.parse(gameData) : data;
};

export const clearGameResultFromStorage = () => {
  localStorage.removeItem("loduwhiz_game_result");
};
