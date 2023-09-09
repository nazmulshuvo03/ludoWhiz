import { AGENT_SIZE, BOX_SIZE } from "../../../tailwind.config";

const Agent = ({ agentPosition = [0, 0] }) => {
  return (
    <div
      style={{
        left: agentPosition[0] + BOX_SIZE / 2 - AGENT_SIZE / 2,
        top: agentPosition[1] + BOX_SIZE / 2 - AGENT_SIZE / 2,
      }}
      className="fixed bg-secondary h-agent w-agent rounded-full shadow-2xl"
    />
  );
};

export default Agent;
