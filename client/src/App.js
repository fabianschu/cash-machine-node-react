import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Layout from "./pages/Layout";
import MainWidget from "./components/MainWidget";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "./redux/actions/authAction";

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(({ authReducer }) => authReducer.loading);

  useEffect(() => {
    dispatch(authenticate());
  }, []);

  if (loading) return <p>LOADING</p>;

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Redirect to="/customers" />
          </Route>
          <PrivateRoute
            exact
            path="/customers/:customerId"
            component={MainWidget}
          />
          <PrivateRoute path="/customers" component={MainWidget} />
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
