import React, { useState, useEffect, useContext } from "react";
import { MainContext } from "../../providers/MainProvider";
import Button from "../Form/Button";
import {
  clearGameDataFromStorage,
  clearLocalState,
} from "../../functions/state";
import { AppStates, CURRENCY } from "../../constants/types";
import { refreshAmountData } from "../../functions/amount";

interface GameOverScreenProps {
  // Define any props you want to pass to the component here
}

const GameOverScreen: React.FC<GameOverScreenProps> = () => {
  const { gameResult, setAppState } = useContext(MainContext);
  const [win, setWin] = useState(0);

  useEffect(() => {
    if (gameResult) {
      setWin(
        parseFloat(gameResult.resultAmount) -
          parseFloat(gameResult.playerAmount)
      );
    }
  }, [gameResult]);

  const handleGoHome = () => {
    clearLocalState();
    clearGameDataFromStorage();
    clearGameDataFromStorage();
    refreshAmountData();
    setAppState(AppStates.INIT);
  };

  console.log("gameResult: ", gameResult, win);

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div>
        <div className="text-4xl text-center font-bold py-4">
          {win > 0 ? (
            <span className="text-success">Congratulations!!</span>
          ) : (
            <span className="text-error">Sorry!!</span>
          )}
        </div>
        <div className="text-2xl text-center font-bold py-4">
          <span>You have </span>
          {win > 0 ? (
            <span className="text-success">won</span>
          ) : (
            <span className="text-error">lost</span>
          )}
          <span className="text-highlight text-3xl">
            {" "}
            {Math.abs(win)}
            {CURRENCY}
          </span>
        </div>
        <div className="w-full py-4 text-lg font-light flex flex-col justify-center items-center">
          <div>
            <div>
              <span>You have started the game with: </span>
              <span className="text-highlight">
                {gameResult?.playerAmount} {CURRENCY}
              </span>
            </div>
            <div>
              <span>You have completed the game with: </span>
              <span className="text-highlight">
                {gameResult?.resultAmount} {CURRENCY}
              </span>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <Button onClick={handleGoHome}>Go to home</Button>
        </div>
      </div>
    </div>
  );
};

export default GameOverScreen;
