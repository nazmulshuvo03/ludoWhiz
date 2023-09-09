import { AppStates } from "../constants/types";

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
