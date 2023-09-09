import { HistoryData } from "../../constants/types";

interface HistoryProps {
  data: HistoryData[];
}

const History = ({ data }: HistoryProps) => {
  return (
    <div className="border-box border-accent h-history w-history overflow-y-auto flex flex-col justify-start rounded">
      <div className="bg-accent text-text py-4 text-center">History</div>
      {data &&
        data.length &&
        data.map((item, index) => (
          <div
            key={index}
            className={`${
              index % 2 === 0 ? "bg-slate-50" : "bg-slate-200"
            } text-background flex py-3`}
          >
            <div className="text-background font-light w-1/5 text-center">
              {item.index}
            </div>
            <p
              className={`${
                item.amount.includes("-")
                  ? "text-error"
                  : item.amount === "0%"
                  ? "text-background"
                  : "text-success"
              } font-bold w-2/5 text-center`}
            >
              {item.amount}
            </p>
            <p className="text-background font-light w-2/5 text-center">
              {item.balance}
            </p>
          </div>
        ))}
    </div>
  );
};

export default History;
