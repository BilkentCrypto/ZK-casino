import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import { configureConnection } from '@puzzlehq/sdk';
import { BrowserRouter as Router } from "react-router-dom";
import "core-js/stable/index.js";
import "regenerator-runtime/runtime.js";
import store from "./store";

configureConnection({
  dAppName: "ZK-casino",
  dAppUrl:  "http://localhost:3000/",
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
