import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import CustomerWidget from "./components/CustomerWidget";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

const App = () => {
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
