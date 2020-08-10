import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const DataContext = createContext();

const DataContextProvider = ({ children }) => {
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

  // useEffect(() => {
  //   if (!selectedCustomer) {
  //     setAccordionExpanded(false);
  //     return;
  //   }
  //   axios
  //     .get(
  //       `${process.env.REACT_APP_SERVER_URL}/api/customers/${selectedCustomer.id}/projects`
  //     )
  //     .then((response) => {
  //       console.log(response.data);
  //       setProjects(response.data);
  //       setAccordionExpanded(true);
  //     })
  //     .catch((e) => console.log(e));
  // }, [selectedCustomer]);

  const getAndSetProjects = async () => {};

  const defaultContext = {
    customers,
    projects,
    setCustomers,
    setProjects,
  };

  return (
    <DataContext.Provider value={defaultContext}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataContextProvider };
