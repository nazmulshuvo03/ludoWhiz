import { AGENT_SIZE, BASE_FONT_SIZE, BOX_SIZE } from "../../../tailwind.config";

const Agent = ({ scoreIdx = 0, agentPosition = [0, 0] }) => {
  const getPositonValue = (position: number) => {
    const value = position / BASE_FONT_SIZE + BOX_SIZE / 2 - AGENT_SIZE / 2;
    return `${value}rem`;
  };

  return (
    <div
      style={{
        left: getPositonValue(agentPosition[0]),
        top: getPositonValue(agentPosition[1]),
      }}
      className="fixed bg-secondary text-text h-agent w-agent rounded-full 
      shadow-2xl flex justify-center items-center font-medium text-base"
    >
      {scoreIdx > 0 && scoreIdx}
    </div>
  );
};

export default Agent;
