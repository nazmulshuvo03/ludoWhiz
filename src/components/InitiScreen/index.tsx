import React, { useContext } from "react";
import { MainContext } from "../../providers/MainProvider";
import { AppStates } from "../../constants/types";

interface Props {}

const InitScreen: React.FC<Props> = ({}) => {
  const { setAppState } = useContext(MainContext);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label>Enter your amount (in wei)</label>
        <input type="text" placeholder="eg: 1000 wei" />
        <button onClick={() => setAppState(AppStates.GAME)}>Continue</button>
      </div>
    </div>
  );
};

export default InitScreen;
