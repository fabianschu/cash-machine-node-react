import React, { createContext, useState, useEffect, useContext } from "react";
import { DataContext } from "./DataContext";

const UiContext = createContext();

const UiContextProvider = ({ children }) => {
  const { addCustomer, editCustomer, archiveProjects } = useContext(
    DataContext
  );

  const [creatingCustomer, setCreatingCustomer] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(false);
  const [creatingInvoice, setCreatingInvoice] = useState(false);

  const [creatingProject, setCreatingProject] = useState(false);

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
    setCreatingProject(false);
  };

  const modifyCustomers = async (values) => {
    if (creatingCustomer) {
      setSelectedCustomer(null);
      const newCustomer = await addCustomer(values);
      setSelectedCustomer(newCustomer);
    }
    if (editingCustomer) {
      setSelectedCustomer(null);
      const updatedCustomer = await editCustomer(values);
      if (!updatedCustomer) setSelectedCustomer(null);
      else setSelectedCustomer(updatedCustomer);
    }
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
    modifyCustomers,
    creatingProject,
  };

  return (
    <UiContext.Provider value={defaultContext}>{children}</UiContext.Provider>
  );
};

export { UiContext, UiContextProvider };
