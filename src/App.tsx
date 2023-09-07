import { useContext } from "react";
import { MainContext } from "./providers/MainProvider";
import { WalletContext } from "./providers/WalletProvider";
import Navbar from "./components/Navbar";

function App() {
  const { count } = useContext(MainContext);
  const { contract } = useContext(WalletContext);

  console.log("count: ", count);
  console.log("contract: ", contract);

  return (
    <div>
      <Navbar />
      <h1>Hello from LudoWhiz</h1>
    </div>
  );
}

export default App;
