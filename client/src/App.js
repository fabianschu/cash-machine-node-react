import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  useTheme,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import Layout from "./pages/Layout";
import theme from "./theme";
import SwitchModeToggle from "./components/SwitchModeToggle";
import { DataContext } from "./context/DataContext";
import axios from "axios";
import CustomerWidget from "./components/CustomerWidget";
import Modal from "./components/Modal";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import { AuthContext } from "./context/AuthContext";
import "./App.css";

const App = () => {
  const { customers, setCustomers } = useContext(DataContext);
  const { setAuthenticatedUser } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Layout>
        <PrivateRoute exact path="/" component={CustomerWidget} />
        <Route exact path="/login">
          <Login />
        </Route>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
