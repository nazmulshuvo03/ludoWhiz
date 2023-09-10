import React, { useState, useEffect, useContext } from "react";
import { getAmountFromIdx } from "../../functions/amount";
import Board from "../Board";
import Agent from "../Agent";
import History from "../History";
import Dice from "../Dice";
import { HistoryData } from "../../constants/types";
import { MainContext } from "../../providers/MainProvider";

interface GameScreenProps {
  // Define any props you want to pass to the component here
}

const GameScreen: React.FC<GameScreenProps> = () => {
  const { gameData } = useContext(MainContext);
  const [scoreIdx, setScoreIdx] = useState(0);
  const [agentPosition, setAgentPosition] = useState([0, 0]);
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState<HistoryData[]>([
    {
      index: scoreIdx,
      balance,
      amount: "0%",
    },
  ]);

  useEffect(() => {
    if (gameData) {
      setBalance(parseFloat(gameData.playerAmount));
    }
  }, [gameData]);

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

  console.log("gameData: ", gameData);

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      {gameData ? (
        <div className="flex flex-col justify-center items-center">
          <div className="text-3xl font-bold text-text py-2">
            <span>You Game Balance: </span>
            <span className="text-highlight">{balance.toFixed(3)}</span>
          </div>
          <div className="w-full flex justify-center gap-10">
            <Board {...{ scoreIdx, setScoreIdx, setAgentPosition }} />
            <Agent {...{ scoreIdx, agentPosition }} />
            <History {...{ data: history }} />
          </div>
        </div>
      ) : (
        <div />
      )}
      <Dice {...{ setScoreIdx }} />
    </div>
  );
};

export default GameScreen;
