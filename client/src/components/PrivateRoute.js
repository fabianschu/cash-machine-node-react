import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import CustomerWidget from "./CustomerWidget";

function PrivateRoute({ component: Component, ...rest }) {
  const { authenticatedUser } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (authenticatedUser) {
          return <CustomerWidget />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
}

export default PrivateRoute;
