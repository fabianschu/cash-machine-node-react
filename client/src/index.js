import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { UiContextProvider } from "./context/UiContext";
import { DataContextProvider } from "./context/DataContext";
import { AuthContextProvider } from "./context/AuthContext";
import { CustomerContextProvider } from "./context/CustomerContext";
import "./App.css";
import { InvoiceContextProvider } from "./context/InvoiceContext";
import { ProjectContextProvider } from "./context/ProjectContext";

ReactDOM.render(
  <AuthContextProvider>
    <DataContextProvider>
      <UiContextProvider>
        <CustomerContextProvider>
          <InvoiceContextProvider>
            <ProjectContextProvider>
              <App />
            </ProjectContextProvider>
          </InvoiceContextProvider>
        </CustomerContextProvider>
      </UiContextProvider>
    </DataContextProvider>
  </AuthContextProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
