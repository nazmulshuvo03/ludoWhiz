import React, { useContext } from "react";
import { MainContext } from "../../providers/MainProvider";
import { AppStates } from "../../constants/types";
import Input from "../Form/Input";
import Button from "../Form/Button";

interface Props {}

const InitScreen: React.FC<Props> = ({}) => {
  const { updateState } = useContext(MainContext);

  return (
    <div className="flex flex-col justify-center items-center gap-3 bg-slate-600 rounded-2xl shadow-lg p-10">
      <Input
        type="text"
        placeholder="eg: 1000"
        label={"Enter your amount (in wei)"}
        className="w-96"
      />
      <Button onClick={() => updateState(AppStates.GAME)}>Continue</Button>
    </div>
  );
};

export default InitScreen;
