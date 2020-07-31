import React, { createContext, useState, useEffect } from "react";

const UiContext = createContext();

const UiContextProvider = ({ children }) => {
  const [mode, setMode] = useState("work");

  const [creatingCustomer, setCreatingCustomer] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(false);
  const [creatingInvoice, setCreatingInvoice] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedProjects, setSelectedProjects] = useState([]);

  const [accordionExpanded, setAccordionExpanded] = useState(false);

  useEffect(() => {
    setSelectedProjects([]);
  }, [selectedCustomer]);

  const closeModal = () => {
    setCreatingCustomer(false);
    setEditingCustomer(false);
    setCreatingInvoice(false);
  };

  const defaultContext = {
    creatingCustomer,
    editingCustomer,
    creatingInvoice,
    selectedCustomer,
    accordionExpanded,
    mode,
    selectedProjects,
    setCreatingCustomer,
    setCreatingInvoice,
    setEditingCustomer,
    setSelectedCustomer,
    closeModal,
    setAccordionExpanded,
    setMode,
    setSelectedProjects,
  };
  return (
    <UiContext.Provider value={defaultContext}>{children}</UiContext.Provider>
  );
};

export { UiContext, UiContextProvider };
