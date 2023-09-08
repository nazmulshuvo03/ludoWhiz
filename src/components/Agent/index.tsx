import { AGENT_SIZE, BOX_SIZE } from "../../constants/design";

const Agent = ({ agentPosition = [0, 0] }) => {
  return (
    <div
      style={{
        height: AGENT_SIZE,
        width: AGENT_SIZE,
        borderRadius: "50%",
        position: "fixed",
        left: agentPosition[0] + BOX_SIZE / 2 - AGENT_SIZE / 2,
        top: agentPosition[1] + BOX_SIZE / 2 - AGENT_SIZE / 2,
      }}
      className="bg-secondary"
    />
  );
};

export default Agent;
