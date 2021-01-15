import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = (props) => {
  const isAuthenticated = useSelector(({ authReducer }) => authReducer.userId);
  const { component } = props;
  return (
    <Route
      {...props}
      render={() => {
        if (isAuthenticated) {
          return component;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
