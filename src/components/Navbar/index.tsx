import { useContext } from "react";
import { WalletContext } from "../../providers/WalletProvider";

export default function Navbar() {
  const { getWalletAccess, walletAddress, disconnectWallet } =
    useContext(WalletContext);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        LudoWhiz
      </div>
      <button
        style={{
          cursor: "pointer",
          padding: "10px",
          height: "fit-content",
        }}
        onClick={walletAddress ? disconnectWallet : getWalletAccess}
      >
        {walletAddress ? walletAddress : "Connect Wallet"}
      </button>
    </div>
  );
}
