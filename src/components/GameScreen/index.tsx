import React, { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { getAmountFromIdx } from "../../functions/amount";
import Board from "../Board";
import Agent from "../Agent";
import History from "../History";
import Dice from "../Dice";
import { AppStates, CURRENCY, HistoryData } from "../../constants/types";
import { MainContext } from "../../providers/MainProvider";
import Button from "../Form/Button";
import { WalletContext } from "../../providers/WalletProvider";

interface GameScreenProps {
  // Define any props you want to pass to the component here
}

const GameScreen: React.FC<GameScreenProps> = () => {
  const { gameData, updateState, updateGameResult } = useContext(MainContext);
  const { contract, signer, fetchWhizBalance } = useContext(WalletContext);
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

  const gameFinalize = async () => {
    if (contract) {
      const amount = ethers.utils.parseUnits(balance.toString(), CURRENCY);
      const tx = await contract?.finishGame(amount, gameData?.gameId);
      tx.wait();
      console.log("Finalize game transaction: ", tx);
    }
  };

  const handleGameOver = async () => {
    await gameFinalize();
    if (signer) {
      const signBl = await signer.getBalance();
      console.log(
        "signer balance after game finish: ",
        ethers.utils.formatUnits(signBl, CURRENCY)
      );
    }
    fetchWhizBalance();
    updateGameResult({
      gameId: gameData?.gameId,
      player: gameData?.player,
      gameAmount: gameData?.gameAmount,
      playerAmount: gameData?.playerAmount,
      resultAmount: balance.toString(),
    });
    updateState(AppStates.GAME_OVER);
  };

  console.log("gameData: ", gameData);

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      {gameData ? (
        <div className="flex flex-col justify-center items-center">
          <div className="text-3xl font-bold text-text py-2">
            <span>You Game Balance: </span>
            <span className="text-highlight">
              {balance.toFixed(3) + CURRENCY}
            </span>
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
      {scoreIdx < 100 ? (
        <Dice {...{ setScoreIdx }} />
      ) : (
        <div className="text-3xl font-bold text-text py-2 flex gap-4 items-center">
          <div>Game Over!</div>
          <Button onClick={handleGameOver}>Go to Results</Button>
        </div>
      )}
    </div>
  );
};

export default GameScreen;
