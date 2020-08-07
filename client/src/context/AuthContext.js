import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
const AuthContext = createContext();
axios.defaults.withCredentials = true;
const AuthContextProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState();
  const [hasAuthenticated, setHasAuthenticated] = useState(false);

  useEffect(() => {
    console.log(`${process.env.REACT_APP_SERVER_URL}/api/auth/authenticate`);
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/auth/authenticate`)
      .then((res) => {
        setAuthenticatedUser(res.data.id);
        setHasAuthenticated(true);
        console.log("user set: ", res);
      })
      .catch((err) => {
        console.log(err);
        setHasAuthenticated(true);
      });
  }, []);

  const defaultContext = {
    authenticatedUser,
    setAuthenticatedUser,
    hasAuthenticated,
  };

  console.log("HAS AUTHENTICATed: ", hasAuthenticated);

  return (
    <AuthContext.Provider value={defaultContext}>
      {hasAuthenticated && children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
