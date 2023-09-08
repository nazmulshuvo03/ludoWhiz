import { colorPalette } from "../../constants/colors";
import { HISTORY_HEIGHT, HISTORY_WIDTH } from "../../constants/design";
import { HistoryData } from "../../constants/types";

interface HistoryProps {
  data: HistoryData[];
}

const History = ({ data }: HistoryProps) => {
  return (
    <div
      style={{
        height: HISTORY_HEIGHT,
        width: HISTORY_WIDTH,
        flex: 1,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        border: `1px solid ${colorPalette.accentColor}`,
      }}
    >
      <div
        style={{
          backgroundColor: colorPalette.accentColor,
          color: colorPalette.textColor,
          padding: "1rem 0",
          textAlign: "center",
        }}
      >
        History
      </div>
      {data &&
        data.length &&
        data.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0 0.5rem",
              backgroundColor: index % 2 === 0 ? "#eee" : "#ccc",
              color: colorPalette.backgroundColor,
            }}
          >
            <p
              style={{ fontWeight: "300", color: colorPalette.backgroundColor }}
            >
              {item.index}
            </p>
            <p
              style={{
                fontWeight: "500",
                color: item.amount.includes("-")
                  ? colorPalette.errorColor
                  : item.amount === "0%"
                  ? colorPalette.backgroundColor
                  : colorPalette.successColor,
              }}
            >
              {item.amount}
            </p>
            <p
              style={{
                fontWeight: "300",
                color: colorPalette.backgroundColor,
              }}
            >
              {item.balance}
            </p>
          </div>
        ))}
    </div>
  );
};

export default History;
