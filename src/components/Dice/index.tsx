import { useEffect, useState } from "react";
import { DICE_SIZE } from "../../constants/design";

interface DiceProps {
  setScoreIdx?: (scoreIdx: number | ((prev: number) => number)) => void;
}

const Dice = ({ setScoreIdx = () => {} }: DiceProps) => {
  const [dice, setDice] = useState(0);
  const [loading, setLoading] = useState(false);

  const rollDice = () => {
    setLoading(true);
    setDice(0);
    setTimeout(() => {
      setLoading(false);
      setDice(Math.floor(Math.random() * 6) + 1);
    }, 1000);
  };

  useEffect(() => {
    if (dice !== 0) {
      setScoreIdx((prev: number) => (prev < 100 ? prev + dice : 0));
    }
  }, [dice, setScoreIdx]);

  return (
    <div>
      <button
        onClick={rollDice}
        style={{
          width: DICE_SIZE,
          height: DICE_SIZE,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 6,
          padding: 6,
          boxShadow: "rgb(179 178 178) 0px 0px 4px 0px",
          border: "2px solid rgb(179 178 178)",
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#333",
          }}
        >
          {loading ? "???" : dice === 0 ? "Roll Dice" : dice}
        </div>
      </button>
    </div>
  );
};

export default Dice;
