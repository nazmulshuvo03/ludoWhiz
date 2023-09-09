import { ReactNode, createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import ABI from "./abi.json";
import { clearLocalState } from "../functions/state";

const CONTRACT_ADDDRESS = "0x8464135c8F25Da09e49BC8782676a84730C318bC";

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface WalletContextProps {
  provider: ethers.providers.JsonRpcProvider | null;
  signer: ethers.providers.JsonRpcSigner | null;
  contract: ethers.Contract | null;
  isWalletConnected: boolean;
  walletAddress: string;
  getWalletAccess: () => void;
  disconnectWallet: () => void;
}

const initialWalletContextValues: WalletContextProps = {
  provider: null,
  signer: null,
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
    useState<ethers.providers.JsonRpcProvider | null>(null);
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(
    null
  );
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string>("");

  useEffect(() => {
    if (window.ethereum) {
      // const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      // console.log("web3 provider: ", web3Provider);

      const rpcProvider = new ethers.providers.JsonRpcProvider(
        "http://127.0.0.1:8545"
      );
      console.log("json rpc provider: ", rpcProvider);

      setProvider(rpcProvider);
    }
  }, []);

  async function getWalletAccess() {
    if (provider) {
      const network = await provider.getNetwork();
      console.log("network: ", network);
      const signer = provider.getSigner();
      console.log("signer: ", signer);
      setSigner(signer);
      const address = await signer.getAddress();
      console.log("signer address: ", address);
      setWalletAddress(address);
      setIsWalletConnected(true);
      // const accounts = await provider.send("eth_requestAccounts", []);
      // console.log("accounts: ", accounts);
      // if (accounts.length > 0) {
      //   setIsWalletConnected(true);
      //   setWalletAddress(accounts[1]);
      // }
    }
  }

  async function disconnectWallet() {
    if (provider) {
      clearLocalState();
      await provider.send("eth_requestAccounts", [{ eth_accounts: {} }]);
      setIsWalletConnected(false);
      setWalletAddress("");
    }
  }

  async function getSigner() {
    if (provider) {
      const signer = provider.getSigner();
      console.log("signer: ", signer);
      setSigner(signer);
      const address = await signer.getAddress();
      console.log("signer address: ", address);
      const balance = await signer.getBalance();
      console.log("signer balance: ", ethers.utils.formatEther(balance), "eth");
      setWalletAddress(address);
      setIsWalletConnected(true);
      // await provider.send("eth_accounts", []);
      // const accounts = await provider.send("eth_accounts", []);
      // console.log("accounts: ", accounts);
      // if (accounts.length > 0) {
      //   setIsWalletConnected(true);
      //   setWalletAddress(accounts[1]);
      // }
    }
  }

  async function getContract() {
    if (signer) {
      const ethContract = new ethers.Contract(CONTRACT_ADDDRESS, ABI, signer);
      console.log("contract: ", ethContract);
      setContract(ethContract);
      // const contractSigner = ethContract.signer;
      // const contractSignerAddress = await contractSigner.getAddress();
      // console.log("contract signer address: ", contractSignerAddress);
      // const contractSignerBalance = await contractSigner.getBalance();
      // console.log(
      //   "contract signer balance: ",
      //   ethers.utils.formatEther(contractSignerBalance),
      //   "eth"
      // );
    }
  }

  // async function getContractDeployer() {
  //   if (provider) {
  //     provider
  //       .getTransactionReceipt(
  //         "0x38f80ee1ac0cea32ab62bd41ac51ebbc0beeef60c8f31d3639c9128e3784597a"
  //       )
  //       .then((receipt) => {
  //         if (receipt) {
  //           // The "from" field of the receipt contains the deployer's address
  //           const deployerAddress = receipt.from;
  //           console.log(`Deployer Address: ${deployerAddress}`);
  //         } else {
  //           console.log("Contract deployment receipt not found.");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error);
  //       });
  //   }
  // }

  useEffect(() => {
    if (provider) getSigner();
  }, [provider]);

  useEffect(() => {
    if (signer) getContract();
  }, [signer]);

  const value = {
    provider,
    signer,
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
