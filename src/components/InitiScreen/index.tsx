import React, { useContext, useState } from "react";
import { MainContext } from "../../providers/MainProvider";
import { AppStates } from "../../constants/types";
import Input from "../Form/Input";
import Button from "../Form/Button";
import { WalletContext } from "../../providers/WalletProvider";
import { ethers } from "ethers";

interface Props {}

const InitScreen: React.FC<Props> = ({}) => {
  const { updateState } = useContext(MainContext);
  const { contract } = useContext(WalletContext);
  const [fundAmount, setFundAmount] = useState<string>("100");

  async function fundWhiz() {
    const amount = ethers.utils.parseUnits(fundAmount, "gwei");
    const tx = await contract?.fundWhiz({ value: amount });
    await tx?.wait();
    console.log("funded whiz", tx);
    alert("Whiz thanks you for your contribution!");
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-3 bg-slate-600 rounded-2xl shadow-lg p-10">
        <Input
          type="text"
          placeholder="eg: 1000"
          label={"Enter your amount (in wei: 1 eth = 10e18 wei)"}
          className="w-96"
        />
        <Button onClick={() => updateState(AppStates.GAME)}>Continue</Button>
      </div>
      <div className="flex mt-auto gap-2 py-5">
        <Input
          value={fundAmount}
          type="text"
          placeholder="eg: 1000 (in gwei: 1 eth = 10e9 gwei)"
          onChange={(e) => setFundAmount(e.target.value)}
        />
        <Button onClick={fundWhiz}>Fund Whiz</Button>
      </div>
    </div>
  );
};

export default InitScreen;
