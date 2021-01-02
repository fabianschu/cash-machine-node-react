import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import CustomerWidget from "./CustomerWidget";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const isAuthenticated = useSelector(({ authReducer }) => authReducer.userId);
  return (
    <Route
      render={() => {
        if (isAuthenticated) {
          return <CustomerWidget />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
