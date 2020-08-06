import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { UiContextProvider } from "./context/UiContext";
import { CustomersContextProvider } from "./context/CustomersContext";
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.render(
  <AuthContextProvider>
    <UiContextProvider>
      <CustomersContextProvider>
        <App />
      </CustomersContextProvider>
    </UiContextProvider>
  </AuthContextProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
