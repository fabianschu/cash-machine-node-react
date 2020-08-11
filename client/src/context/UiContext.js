import React, { createContext, useState, useEffect, useContext } from "react";
import { DataContext } from "./DataContext";
import axios from "axios";

const UiContext = createContext();

const UiContextProvider = ({ children }) => {
  const [mode, setMode] = useState("work");
  const { getProjects } = useContext(DataContext);

  const [creatingCustomer, setCreatingCustomer] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(false);
  const [creatingInvoice, setCreatingInvoice] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedProjects, setSelectedProjects] = useState([]);

  const [accordionExpanded, setAccordionExpanded] = useState(false);

  useEffect(() => {
    console.log("useEffect within UiContext");
    console.log(selectedCustomer);
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
    console.log("close modal");
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

  console.log(selectedCustomer);

  return (
    <UiContext.Provider value={defaultContext}>{children}</UiContext.Provider>
  );
};

export { UiContext, UiContextProvider };
