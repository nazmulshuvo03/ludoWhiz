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
        border: "1px solid #333",
      }}
    >
      <div
        style={{
          backgroundColor: "#333",
          color: "#fff",
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
            }}
          >
            <p>{item.index}</p>
            <p
              style={{
                color: item.amount.includes("-")
                  ? "red"
                  : item.amount === "0%"
                  ? "#333"
                  : "green",
              }}
            >
              {item.amount}
            </p>
            <p style={{ fontWeight: "bold", color: "#333" }}>{item.balance}</p>
          </div>
        ))}
    </div>
  );
};

export default History;
