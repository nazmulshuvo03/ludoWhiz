import { useContext } from "react";
import { WalletContext } from "../../providers/WalletProvider";
import { colorPalette } from "../../constants/colors";
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
        backgroundColor: colorPalette.primaryColor,
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
          backgroundColor: walletAddress
            ? colorPalette.secondaryColor
            : colorPalette.buttonColor,
          borderRadius: "25rem",
          border: "none",
          outline: "none",
          color: colorPalette.textColor,
          fontSize: "1rem",
          fontWeight: "500",
        }}
        onClick={walletAddress ? disconnectWallet : getWalletAccess}
      >
        {walletAddress ? getShortenedAddress(walletAddress) : "Connect Wallet"}
      </button>
    </div>
  );
}
