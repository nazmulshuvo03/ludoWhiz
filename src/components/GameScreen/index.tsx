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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <p style={{ fontSize: 36, fontWeight: "bold", color: "#333" }}>
          SoLudo
        </p>
        <p
          style={{
            fontSize: 36,
            fontWeight: "bold",
            color: "#333",
            padding: "0 0.5rem",
          }}
        >
          -
        </p>
        <p style={{ fontSize: 36, fontWeight: "bold", color: "#333" }}>
          {balance}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Board {...{ scoreIdx, setScoreIdx, setAgentPosition }} />
        <Agent {...{ agentPosition }} />
        <History {...{ data: history }} />
      </div>
      <Dice {...{ setScoreIdx }} />
    </div>
  );
};

export default GameScreen;
