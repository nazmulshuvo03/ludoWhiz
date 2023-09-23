import { useContext } from "react";
import { WalletContext } from "../../providers/WalletProvider";
import { getShortenedAddress } from "../../functions/string";
import Button from "../Form/Button";
import { CURRENCY } from "../../constants/types";

export default function Navbar() {
  const { getWalletAccess, walletAddress, disconnectWallet, whizBalance } =
    useContext(WalletContext);

  console.log("whiz balance navbar: ", whizBalance);

  return (
    <div className="bg-primary text-text flex justify-between items-center px-5 py-3">
      <div className="text-text text-4xl font-bold font-mono">
        <span>LudoWhiz</span>
        <span className="text-base px-2 text-highlight">
          {whizBalance + CURRENCY}
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
