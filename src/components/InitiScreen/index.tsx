import React, { useContext, useState, useEffect } from "react";
import { MainContext } from "../../providers/MainProvider";
import { AppStates } from "../../constants/types";
import Input from "../Form/Input";
import Button from "../Form/Button";
import { WalletContext } from "../../providers/WalletProvider";
import { ethers } from "ethers";
import { BigNumber } from "ethers";

interface Props {}

const InitScreen: React.FC<Props> = ({}) => {
  const { updateState } = useContext(MainContext);
  const { contract, signer } = useContext(WalletContext);
  const [userBalance, setUserBalance] = useState<string>("0");
  const [gameStartAmount, setGameStartAmount] = useState<string>("0");
  const [fundAmount, setFundAmount] = useState<string>("100");

  async function fundWhiz() {
    const amount = ethers.utils.parseUnits(fundAmount, "wei");
    const tx = await contract?.fundWhiz({ value: amount });
    await tx?.wait();
    console.log("funded whiz", tx);
    alert("Whiz thanks you for your contribution!");
  }

  async function getUserBalance() {
    let balance = (await signer?.getBalance()) as BigNumber;
    const formattedBalance = ethers.utils.formatUnits(balance, "wei");
    setUserBalance(formattedBalance);
  }

  async function gameInitialize() {
    // const tx = await contract?.initializeGame(gameStartAmount, "wei");
    updateState(AppStates.GAME);
  }

  useEffect(() => {
    if (signer) getUserBalance();
  }, [signer]);

  return (
    <div>
      <div>
        <div className="text-2xl px-1 py-3">
          <span>You have </span>
          <span className="text-highlight font-bold text-xl">
            {userBalance} wei
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-3 bg-slate-600 rounded-2xl shadow-lg p-10">
        <Input
          type="text"
          placeholder="eg: 1000"
          label={"Enter your amount (in wei: 1 eth = 10e18 wei)"}
          className="w-96"
          value={gameStartAmount}
          onChange={(e) => setGameStartAmount(e.target.value)}
        />
        <Button onClick={gameInitialize}>Continue</Button>
      </div>
      <div className="flex mt-auto gap-2 py-5 justify-center items-center">
        <Input
          value={fundAmount}
          type="text"
          placeholder="eg: 1000 (in wei: 1 eth = 10e18 wei)"
          onChange={(e) => setFundAmount(e.target.value)}
        />
        <Button onClick={fundWhiz}>Fund Whiz</Button>
      </div>
    </div>
  );
};

export default InitScreen;
