import React, { useContext, useState } from "react";
import { Route, Redirect, BrowserRouter } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import InputField from "../components/InputField";
import CustomerWidget from "./CustomerWidget";

function PrivateRoute({ component: Component, ...rest }) {
  const { authenticatedUser, hasAuthenticated } = useContext(AuthContext);

  console.log("PrivateRoute render");
  console.log(authenticatedUser);
  console.log(rest);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (authenticatedUser) {
          return <CustomerWidget />;
        } else if (hasAuthenticated) {
          return <Redirect to="/login" />;
        }
      }}
    />
    // <BrowserRouter>
    //   {console.log(authenticatedUser)}
    //   <Route
    //     {...rest}
    //     path="/"
    //     // render={(props) =>
    //     //   authenticatedUser ? <Component {...rest} /> : <Redirect to="/" />
    //     // }
    //   >
    //     {/* <Component {...rest} /> */}
    //     {authenticatedUser ? <Component {...rest} /> : <Redirect to="/login" />}
    //   </Route>
    // </BrowserRouter>
  );
}

export default PrivateRoute;
