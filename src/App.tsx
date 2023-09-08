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

  console.log("state: ", appState);

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
