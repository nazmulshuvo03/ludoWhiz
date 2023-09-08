import { colorPalette } from "../../constants/colors";
import { AGENT_SIZE, BOX_SIZE } from "../../constants/design";

const Agent = ({ agentPosition = [0, 0] }) => {
  return (
    <div
      style={{
        height: AGENT_SIZE,
        width: AGENT_SIZE,
        backgroundColor: colorPalette.secondaryColor,
        borderRadius: "50%",
        position: "fixed",
        left: agentPosition[0] + BOX_SIZE / 2 - AGENT_SIZE / 2,
        top: agentPosition[1] + BOX_SIZE / 2 - AGENT_SIZE / 2,
      }}
    />
  );
};

export default Agent;
