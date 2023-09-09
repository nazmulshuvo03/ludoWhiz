import { useContext, useEffect, useState } from "react";
import { WalletContext } from "../../providers/WalletProvider";
import { getShortenedAddress } from "../../functions/string";
import Button from "../Form/Button";
import { ethers } from "ethers";

export default function Navbar() {
  const { getWalletAccess, walletAddress, disconnectWallet, contract } =
    useContext(WalletContext);
  const [whizBalance, setWhizBalance] = useState<string>("0");

  async function fetchWhizBalance() {
    let balance = await contract?.whizBalance();
    // balance = ethers.utils.formatEther(balance);
    balance = ethers.utils.formatUnits(balance, "wei");
    setWhizBalance(balance);
  }

  useEffect(() => {
    if (contract) fetchWhizBalance();
  }, [contract]);

  return (
    <div className="bg-primary text-text flex justify-between items-center px-5 py-3">
      <div className="text-text text-4xl font-bold font-mono">
        <span>LudoWhiz</span>
        <span className="text-base px-2 text-highlight">
          {whizBalance + "wei"}
        </span>
      </div>
      <Button
        className={`${walletAddress ? "bg-secondary" : "bg-button"} text-text`}
        onClick={walletAddress ? disconnectWallet : getWalletAccess}
      >
        {walletAddress ? getShortenedAddress(walletAddress) : "Connect Wallet"}
      </Button>
    </div>
  );
}
