import React, { createContext, useState, useEffect, useContext } from "react";
import { DataContext } from "./DataContext";

const UiContext = createContext();

const UiContextProvider = ({ children }) => {
  const { addCustomer, editCustomer, customers } = useContext(DataContext);

  const [creatingCustomer, setCreatingCustomer] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(false);
  const [creatingInvoice, setCreatingInvoice] = useState(false);

  const [creatingProject, setCreatingProject] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProjects, setSelectedProjects] = useState([]);

  const [accordionExpanded, setAccordionExpanded] = useState(false);

  const setSelectedCustomerById = (id) => {
    if (!id) return setSelectedCustomer(null);
    setSelectedCustomer(customers.find((customer) => customer.id === id));
  };

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
    setCreatingProject(false);
  };

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
    setCreatingProject,
    setSelectedCustomer,
    closeModal,
    setAccordionExpanded,
    setSelectedProjects,
    setSelectedCustomerById,
    creatingProject,
  };

  return (
    <UiContext.Provider value={defaultContext}>{children}</UiContext.Provider>
  );
};

export { UiContext, UiContextProvider };
