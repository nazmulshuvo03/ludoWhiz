import { ReactNode, createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import ABI from "./abi.json";

const CONTRACT_ADDDRESS = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface WalletContextProps {
  provider: ethers.providers.Web3Provider | null;
  contract: ethers.Contract | null;
  isWalletConnected: boolean;
  walletAddress: string;
  getWalletAccess: () => void;
  disconnectWallet: () => void;
}

const initialWalletContextValues: WalletContextProps = {
  provider: null,
  contract: null,
  isWalletConnected: false,
  walletAddress: "",
  getWalletAccess: () => {},
  disconnectWallet: () => {},
};

const WalletContext = createContext<WalletContextProps>(
  initialWalletContextValues
);

interface WalletProviderProps {
  children: ReactNode;
}

const WalletProvider = ({ children }: WalletProviderProps) => {
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string>("");

  useEffect(() => {
    if (window.ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log("web3 provider: ", web3Provider);

      const rpcProvider = new ethers.providers.JsonRpcProvider(window.ethereum);
      console.log("json rpc provider: ", rpcProvider);

      setProvider(web3Provider);
    }
  }, []);

  async function getWalletAccess() {
    if (provider) {
      const network = await provider.getNetwork();
      console.log("network: ", network);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      console.log("signer: ", signer);
      const ethContract = new ethers.Contract(CONTRACT_ADDDRESS, ABI, signer);
      console.log("contract: ", ethContract);
      setContract(ethContract);
    }
  }

  async function disconnectWallet() {
    if (provider) {
      await provider.send("eth_requestAccounts", [{ eth_accounts: {} }]);
      setIsWalletConnected(false);
      setWalletAddress("");
    }
  }

  async function getWalletInfo() {
    if (provider) {
      const signer = provider.getSigner();
      console.log("signer: ", signer);
      await provider.send("eth_accounts", []);
      const accounts = await provider.send("eth_accounts", []);
      console.log("accounts: ", accounts);
      if (accounts.length > 0) {
        setIsWalletConnected(true);
        setWalletAddress(accounts[0]);
      }
    }
  }

  useEffect(() => {
    if (provider) {
      getWalletInfo();
    }
  }, [provider]);

  const value = {
    provider,
    contract,
    isWalletConnected,
    walletAddress,
    getWalletAccess,
    disconnectWallet,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};

export { WalletProvider, WalletContext };
