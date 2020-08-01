import React, { createContext, useState, useEffect, useContext } from "react";
import { UiContext } from "./UiContext";
import axios from "axios";

const CustomersContext = createContext();

const CustomersContextProvider = ({ children }) => {
  const { selectedCustomer, setAccordionExpanded } = useContext(UiContext);
  const [customers, setCustomers] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (!selectedCustomer) {
      setAccordionExpanded(false);
      return;
    }
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/customers/${selectedCustomer.id}/projects`
      )
      .then((projects) => {
        setProjects(projects.data);
        setAccordionExpanded(true);
      })
      .catch((e) => console.log(e));
  }, [selectedCustomer, setAccordionExpanded]);

  const defaultContext = {
    customers,
    projects,
    setCustomers,
    setProjects,
  };

  return (
    <CustomersContext.Provider value={defaultContext}>
      {children}
    </CustomersContext.Provider>
  );
};

export { CustomersContext, CustomersContextProvider };
