import { useContext, useEffect } from "react";
import { MainContext } from "./providers/MainProvider";
import { WalletContext } from "./providers/WalletProvider";
import Navbar from "./components/Navbar";
import InitScreen from "./components/InitiScreen";
import GameScreen from "./components/GameScreen";
import GameOverScreen from "./components/GameOverScreen";
import { AppStates } from "./constants/types";

function App() {
  const { appState, setAppState } = useContext(MainContext);
  const { isWalletConnected } = useContext(WalletContext);

  useEffect(() => {
    if (isWalletConnected) {
      if (appState === AppStates.NOT_CONNECTED) {
        setAppState(AppStates.INIT);
      } else {
        setAppState(appState);
      }
    } else {
      setAppState(AppStates.NOT_CONNECTED);
    }
  }, [isWalletConnected]);

  console.log("app state: ", appState);

  return (
    <div className="h-full w-full flex flex-col">
      <Navbar />
      <div className="flex-1 flex justify-center items-center">
        {appState === AppStates.INIT ? (
          <InitScreen />
        ) : appState === AppStates.GAME ? (
          <GameScreen />
        ) : appState === AppStates.GAME_OVER ? (
          <GameOverScreen />
        ) : (
          <h1>Please connect your wallet</h1>
        )}
      </div>
    </div>
  );
}

export default App;
