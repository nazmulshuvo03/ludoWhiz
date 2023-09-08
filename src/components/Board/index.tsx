import { useRef, useEffect } from "react";
import {
  BOX_BORDER,
  BOX_PER_ROW,
  BOX_SIZE,
  AGENT_DEFAULT_POSITION,
} from "../../constants/design";
import Box from "../Box";
import { getAmountFromIdx } from "../../functions/amount";
import { colorPalette } from "../../constants/colors";

interface BoardProps {
  scoreIdx?: number;
  setScoreIdx?: (scoreIdx: number) => void;
  setAgentPosition?: (position: number[]) => void;
}

const Board = ({
  scoreIdx = 0,
  setScoreIdx = () => {},
  setAgentPosition = () => {},
}: BoardProps) => {
  const boxRefs = useRef<(HTMLDivElement | null)[]>(
    Array(100)
      .fill(null)
      .map(() => null)
  );

  const getPositionFromIndex = (index: number) => {
    const boxNode = boxRefs.current[index - 1];
    if (boxNode !== null) {
      const boxPosition = boxNode.getBoundingClientRect();
      console.log(index, boxPosition);
      return [boxPosition.x, boxPosition.y];
    } else {
      return [0, 0];
    }
  };

  const handleClick = (index: number) => {
    setScoreIdx(index + 1);
  };

  const getBoxColor = (index: number) => {
    // let color =
    //   index % 2 === 0 ? colorPalette.errorColor : colorPalette.successColor;
    let color = colorPalette.backgroundAccent;
    const amount = getAmountFromIdx(index);
    if (amount) {
      if (amount.value > 0)
        color = `rgba(0, 255, 0, ${Math.abs(amount.value) / 10})`;
      else color = `rgba(255, 0, 0, ${Math.abs(amount.value) / 10})`;
    }
    return color;
  };

  const boxes = Array(100)
    .fill(null)
    .map((_, index) => (
      <Box
        key={index}
        color={getBoxColor(index + 1)}
        id={index + 1}
        reference={(node: any) => (boxRefs.current[index] = node)}
        handleClick={() => handleClick(index)}
      />
    ));

  useEffect(() => {
    if (scoreIdx === 0) {
      setAgentPosition(AGENT_DEFAULT_POSITION);
    } else {
      const positions = getPositionFromIndex(scoreIdx);
      setAgentPosition(positions);
    }
  }, [scoreIdx]);

  return (
    <div
      style={{
        width: BOX_SIZE * BOX_PER_ROW + BOX_PER_ROW * BOX_BORDER * 2,
        height: BOX_SIZE * BOX_PER_ROW + BOX_PER_ROW * BOX_BORDER * 2,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        border: `${BOX_BORDER}px solid ${colorPalette.textColor}`,
      }}
    >
      {boxes}
    </div>
  );
};

export default Board;