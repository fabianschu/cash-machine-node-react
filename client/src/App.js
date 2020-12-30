import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import CustomerWidget from "./components/CustomerWidget";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

import { connect } from "react-redux";
import { fetchCustomers } from "./redux/actions/customersAction";

const App = (props) => {
  const { customers, fetchCustomers } = props;

  useEffect(() => {
    fetchCustomers();
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

// export default App;

const mapStateToProps = (state) => {
  return {
    customers: state.customersReducer,
  };
};

const mapDispatchToProps = {
  fetchCustomers,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
