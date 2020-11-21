import React, { createContext, useEffect } from "react";
import useAxios from "../hooks/useAxios";

const CustomerContext = createContext();

const CustomerContextProvider = ({ children }) => {
  const [
    customers,
    loading,
    postCustomer,
    putCustomer,
    deleteCustomer,
  ] = useAxios("/customers", []);

  const defaultContext = {
    customers,
    loading,
    postCustomer,
    putCustomer,
    deleteCustomer,
  };

  return (
    <CustomerContext.Provider value={defaultContext}>
      {children}
    </CustomerContext.Provider>
  );
};

export { CustomerContext, CustomerContextProvider };
