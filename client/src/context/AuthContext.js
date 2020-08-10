import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
const AuthContext = createContext();
axios.defaults.withCredentials = true;
const AuthContextProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState();
  const [hasAuthenticated, setHasAuthenticated] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/auth/authenticate`)
      .then((res) => {
        setAuthenticatedUser(res.data.id);
        setHasAuthenticated(true);
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

  return (
    <AuthContext.Provider value={defaultContext}>
      {hasAuthenticated && children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
