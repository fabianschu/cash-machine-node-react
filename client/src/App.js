import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import MainWidget from "./components/MainWidget";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "./redux/actions/authAction";
import Global from "./styles/Global";
import muiTheme from "./styles/muiTheme";
import theme from "./styles/theme";
import Login from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { ThemeProvider } from "styled-components";
import Button from "@material-ui/core/Button";

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(({ authReducer }) => authReducer.loading);
  // const error = useSelector(({ authReducer }) => authReducer.error);

  useEffect(() => {
    dispatch(authenticate());
  }, [dispatch]);

  if (loading) return <p>LOADING</p>;

  return (
    <BrowserRouter>
      <Global />
      <MuiThemeProvider theme={muiTheme}>
        <ThemeProvider theme={muiTheme}>
          <Switch>
            <PrivateRoute path="/main">
              <MainWidget />
            </PrivateRoute>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Redirect to="/main" />
            </Route>
          </Switch>
        </ThemeProvider>
      </MuiThemeProvider>
    </BrowserRouter>
  );
};

export default App;
