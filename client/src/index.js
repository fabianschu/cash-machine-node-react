import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { UiContextProvider } from "./context/UiContext";
import { DataContextProvider } from "./context/DataContext";
import { AuthContextProvider } from "./context/AuthContext";
import "./App.css";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <AuthContextProvider>
      <DataContextProvider>
        <UiContextProvider>
          <App />
        </UiContextProvider>
      </DataContextProvider>
    </AuthContextProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
