import { Amount } from "../constants/types";

const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generatedAmountData = () => {
  const dataArray: Amount[] = [];

  for (let i = 0; i < 20; i++) {
    const id: number = getRandomInt(1, 100);
    const value: number = getRandomInt(-10, 10);

    dataArray.push({ id, value });
  }

  return dataArray;
};

const amountDataFromStorage = () => {
  const data = localStorage.getItem("loduwhiz_amounts");
  if (!data)
    localStorage.setItem(
      "loduwhiz_amounts",
      JSON.stringify(generatedAmountData())
    );
  return data ? JSON.parse(data) : [];
};

export const refreshAmountData = () => {
  localStorage.setItem(
    "loduwhiz_amounts",
    JSON.stringify(generatedAmountData())
  );
};

export const getAmountFromIdx = (idx: number) => {
  const amounts = amountDataFromStorage();
  return amounts.find((amount: Amount) => amount.id === idx);
};
