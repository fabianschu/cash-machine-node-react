import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
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

const App = () => {
  const { customers, setCustomers } = useContext(CustomersContext);

  useEffect(() => {
    axios
      .get("http://localhost:5000/customers")
      .then((customers) => {
        setCustomers(customers.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        {/* <SwitchModeToggle /> */}
        <Route exact path="/">
          {customers && <CustomerWidget />}
          <Modal />
        </Route>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
