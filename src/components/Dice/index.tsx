import { useEffect, useState } from "react";

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
        className={`bg-primary h-dice w-dice flex justify-center items-center rounded-md shadow-2xl`}
      >
        <div className="text-center text-text font-bold text-4xl">
          {loading ? "???" : dice === 0 ? "Roll Dice" : dice}
        </div>
      </button>
    </div>
  );
};

export default Dice;
