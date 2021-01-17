import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "./redux/actions/authAction";
import Global from "./styles/Global";
import muiTheme from "./styles/muiTheme";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import MainPage from "./pages/MainPage";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { ThemeProvider } from "styled-components";

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(({ authReducer }) => authReducer.loading);

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
              <MainPage />
            </PrivateRoute>
            <Route exact path="/login">
              <LoginPage />
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
