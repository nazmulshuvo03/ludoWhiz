import { AMOUNTS } from "../constants/amounts";

export const getAmountFromIdx = (idx: number) =>
  AMOUNTS.find((amount) => amount.id === idx);
