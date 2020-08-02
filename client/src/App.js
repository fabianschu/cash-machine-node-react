import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import {
  useTheme,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import Layout from "./pages/Layout";
import theme from "./theme";
import SwitchModeToggle from "./components/SwitchModeToggle";
import { CustomersContext } from "./context/CustomersContext";
import axios from "axios";
import CustomerWidget from "./components/CustomerWidget";
import Modal from "./components/Modal";
import Login from "./pages/Login";

const App = () => {
  const { customers, setCustomers } = useContext(CustomersContext);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/customers`)
      .then((customers) => {
        setCustomers(customers.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        {/* <SwitchModeToggle /> */}
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          {customers && <CustomerWidget />}
          <Modal />
        </Route>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
