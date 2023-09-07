import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { WalletProvider } from "./providers/WalletProvider.tsx";
import { MainProvider } from "./providers/MainProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MainProvider>
      <WalletProvider>
        <App />
      </WalletProvider>
    </MainProvider>
  </React.StrictMode>
);
