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
      }}
      className="border border-accent"
    >
      <div
        style={{
          padding: "1rem 0",
          textAlign: "center",
        }}
        className="bg-accent text-text"
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
            }}
            className="text-background"
          >
            <p style={{ fontWeight: "300" }} className="text-background">
              {item.index}
            </p>
            <p
              style={{
                fontWeight: "500",
              }}
              className={`${
                item.amount.includes("-")
                  ? "text-error"
                  : item.amount === "0%"
                  ? "text-background"
                  : "text-success"
              }`}
            >
              {item.amount}
            </p>
            <p
              style={{
                fontWeight: "300",
              }}
              className="text-background"
            >
              {item.balance}
            </p>
          </div>
        ))}
    </div>
  );
};

export default History;
