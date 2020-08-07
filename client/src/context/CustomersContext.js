import React, { createContext, useState, useEffect, useContext } from "react";
import { UiContext } from "./UiContext";
import axios from "axios";

const CustomersContext = createContext();

const CustomersContextProvider = ({ children }) => {
  const { selectedCustomer, setAccordionExpanded } = useContext(UiContext);
  const [customers, setCustomers] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/customers`)
      .then((response) => {
        console.log(response.data);
        setCustomers(response.data);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (!selectedCustomer) {
      setAccordionExpanded(false);
      return;
    }
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api/customers/${selectedCustomer.id}/projects`
      )
      .then((response) => {
        console.log(response.data);
        setProjects(response.data);
        setAccordionExpanded(true);
      })
      .catch((e) => console.log(e));
  }, [selectedCustomer]);

  const defaultContext = {
    customers,
    projects,
    setCustomers,
    setProjects,
  };

  return (
    <CustomersContext.Provider value={defaultContext}>
      {/* {customers && children} */}
      {children}
    </CustomersContext.Provider>
  );
};

export { CustomersContext, CustomersContextProvider };
