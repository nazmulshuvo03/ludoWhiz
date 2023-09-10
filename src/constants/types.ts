export enum AppStates {
  NOT_CONNECTED = "NOT_CONNECTED",
  INIT = "INIT",
  GAME = "GAME",
  GAME_OVER = "GAME_OVER",
}

export type HistoryData = {
  index: number;
  balance: number;
  amount: string;
};

export type Amount = {
  id: number;
  value: number;
};

export type GameData = {
  gameId: string;
  player: string;
  gameAmount: string;
  playerAmount: string;
};
