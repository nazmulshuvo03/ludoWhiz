import { useContext } from "react";
import { WalletContext } from "../../providers/WalletProvider";
import { getShortenedAddress } from "../../functions/string";

export default function Navbar() {
  const { getWalletAccess, walletAddress, disconnectWallet } =
    useContext(WalletContext);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0.5rem 1rem",
      }}
      className="bg-primary text-text"
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
          borderRadius: "25rem",
          border: "none",
          outline: "none",
          fontSize: "1rem",
          fontWeight: "500",
        }}
        className={`${walletAddress ? "bg-secondary" : "bg-button"} text-text`}
        onClick={walletAddress ? disconnectWallet : getWalletAccess}
      >
        {walletAddress ? getShortenedAddress(walletAddress) : "Connect Wallet"}
      </button>
    </div>
  );
}
