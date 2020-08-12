import React, { createContext, useState, useEffect, useContext } from "react";
import { DataContext } from "./DataContext";
import axios from "axios";

const UiContext = createContext();

const UiContextProvider = ({ children }) => {
  const { fetchProjects, customers, addCustomer, setCustomers } = useContext(
    DataContext
  );

  const [creatingCustomer, setCreatingCustomer] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(false);
  const [creatingInvoice, setCreatingInvoice] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProjects, setSelectedProjects] = useState([]);

  const [accordionExpanded, setAccordionExpanded] = useState(false);

  useEffect(() => {
    setSelectedProjects([]);

    if (!selectedCustomer) {
      setAccordionExpanded(false);
      return;
    }

    if (selectedCustomer) {
      setAccordionExpanded(true);
    }
  }, [selectedCustomer]);

  const closeModal = () => {
    setCreatingCustomer(false);
    setEditingCustomer(false);
    setCreatingInvoice(false);
  };

  const modifyCustomers = async (values) => {
    let response;
    // if (editingCustomer) {
    //   response = await axios.put(
    //     `${process.env.REACT_APP_SERVER_URL}/api/customers/${selectedCustomer.id}`,
    //     values
    //   );
    // } else if (creatingCustomer) {
    response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/customers`,
      values
    );
    // const id = await addCustomer();
    const allCustomers = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/customers`
    );
    const { id } = response.data;
    console.log(id);
    console.log(allCustomers.data);
    console.log(allCustomers.data.find((customer) => customer.id === id));
    setCustomers(allCustomers.data);
    setSelectedCustomer(
      allCustomers.data.find((customer) => customer.id === id)
    );

    // if (response.data) {
    //   console.log.setSelectedCustomer(
    //     allCustomers.data.find((customer) => customer.id === response.data.id)
    //   );
    // }
    // }
  };
  console.log(customers);
  console.log(selectedCustomer);
  const defaultContext = {
    creatingCustomer,
    editingCustomer,
    creatingInvoice,
    selectedCustomer,
    accordionExpanded,
    selectedProjects,
    setCreatingCustomer,
    setCreatingInvoice,
    setEditingCustomer,
    setSelectedCustomer,
    closeModal,
    setAccordionExpanded,
    setSelectedProjects,
    modifyCustomers,
  };

  return (
    <UiContext.Provider value={defaultContext}>{children}</UiContext.Provider>
  );
};

export { UiContext, UiContextProvider };
