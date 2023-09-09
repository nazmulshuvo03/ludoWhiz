import React, { useState, useEffect } from "react";
import { getAmountFromIdx } from "../../functions/amount";
import Board from "../Board";
import Agent from "../Agent";
import History from "../History";
import Dice from "../Dice";
import { HistoryData } from "../../constants/types";

interface GameScreenProps {
  // Define any props you want to pass to the component here
}

const GameScreen: React.FC<GameScreenProps> = () => {
  const [scoreIdx, setScoreIdx] = useState(0);
  const [agentPosition, setAgentPosition] = useState([0, 0]);
  const [balance, setBalance] = useState(500);
  const [history, setHistory] = useState<HistoryData[]>([
    {
      index: scoreIdx,
      balance,
      amount: "0%",
    },
  ]);

  useEffect(() => {
    const amount = getAmountFromIdx(scoreIdx);
    if (amount) {
      setBalance((prev) => prev + (amount.value * prev) / 100);
    }
  }, [scoreIdx]);

  useEffect(() => {
    const amount = getAmountFromIdx(scoreIdx);
    if (!amount) return;
    setHistory((prev) => [
      { index: scoreIdx, balance, amount: `${amount.value}%` },
      ...prev,
    ]);
  }, [balance]);

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <div className="w-full flex justify-center gap-10">
        <Board {...{ scoreIdx, setScoreIdx, setAgentPosition }} />
        <Agent {...{ scoreIdx, agentPosition }} />
        <History {...{ data: history }} />
      </div>
      <Dice {...{ setScoreIdx }} />
    </div>
  );
};

export default GameScreen;
