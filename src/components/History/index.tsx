import { HistoryData } from "../../constants/types";
import styles from "./style.module.css";

interface HistoryProps {
  data: HistoryData[];
}

const History = ({ data }: HistoryProps) => {
  return (
    <div className="border-4 border-accent h-history w-history flex flex-col justify-start rounded">
      <div className="bg-accent text-2xl font-bold text-text py-4 text-center">
        History
      </div>
      <div
        className={`overflow-y-auto h-full px-4 rounded bg-text ${styles.historyItems}`}
      >
        {data &&
          data.length &&
          data.map((item, index) => (
            <div
              key={index}
              className={`text-background flex py-3 px-2 border-b border-b-textAccent`}
            >
              <div className="text-background font-light w-1/5 text-left">
                {item.index}
              </div>
              <div
                className={`${
                  item.amount.includes("-")
                    ? "text-error"
                    : item.amount === "0%"
                    ? "text-background"
                    : "text-success"
                } font-bold w-1/5 text-center`}
              >
                {item.amount}
              </div>
              <div className="text-background font-light w-3/5 text-right">
                {item.balance.toFixed(3)}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default History;
