import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const CustomerContext = createContext();

const CustomerContextProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);

  const defaultContext = {
    customers,
    setCustomers,
  };

  return (
    <CustomerContext.Provider value={defaultContext}>
      {children}
    </CustomerContext.Provider>
  );
};

export { CustomerContext, CustomerContextProvider };
