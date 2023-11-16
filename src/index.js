import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "core-js/stable/index.js";
import "regenerator-runtime/runtime.js";
import store from "./store";
import { WalletProvider } from "@demox-labs/aleo-wallet-adapter-react";
import { WalletModalProvider } from "@demox-labs/aleo-wallet-adapter-reactui";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import {
  DecryptPermission,
  WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";
import { WalletMultiButton } from "@demox-labs/aleo-wallet-adapter-reactui";
require("@demox-labs/aleo-wallet-adapter-reactui/styles.css");

// const wallets = useMemo(
//   () => [
//     new LeoWalletAdapter({
//       appName: "Leo Demo App",
//     }),
//   ],
//   []
// );

ReactDOM.createRoot(document.getElementById("root")).render(
  // <WalletProvider
  //   wallets={wallets}
  //   decryptPermission={DecryptPermission.UponRequest}
  //   network={WalletAdapterNetwork.Localnet}
  //   autoConnect
  // >
  //    <WalletModalProvider>
  //    <>
  //     <WalletMultiButton />
  //   </>
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
  // </WalletModalProvider>
  // </WalletProvider>
);
