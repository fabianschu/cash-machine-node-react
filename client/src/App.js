import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import CustomerWidget from "./components/CustomerWidget";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";

import { fetchCustomers } from "./redux/actions/customersAction";
import { fetchProjects } from "./redux/actions/projectsAction";
import { fetchInvoices } from "./redux/actions/invoicesAction";

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchProjects());
    dispatch(fetchInvoices());
  }, []);

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
