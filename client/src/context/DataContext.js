import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const { authenticatedUser } = useContext(AuthContext);
  const [customers, setCustomers] = useState();
  const [projects, setProjects] = useState();

  useEffect(() => {
    getAndSetCustomers();
    getProjects();
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

  const getAndSetCustomers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/customers`
      );
      setCustomers(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const addCustomer = async (values) => {
    const newCustomer = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/customers`,
      values
    );
    const allCustomers = await getAndSetCustomers();
    return allCustomers.find((customer) => customer.id === newCustomer.data.id);
  };

  const editCustomer = async (values) => {
    const updatedCustomer = await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/api/customers/:id`,
      values
    );
    const allCustomers = await getAndSetCustomers();
    return allCustomers.find(
      (customer) => customer.id === updatedCustomer.data.id
    );
  };

  const getProjects = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/projects`
      );
      return setProjects(data);
    } catch (e) {
      console.log(e);
    }
  };

  const defaultContext = {
    customers,
    projects,
    setCustomers,
    setProjects,
    getProjects,
    getAndSetCustomers,
    addCustomer,
    editCustomer,
  };
  return (
    <DataContext.Provider value={defaultContext}>
      {customers && projects && children}
    </DataContext.Provider>
  );
};

export { DataContext, DataContextProvider };
