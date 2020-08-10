import React, { createContext, useState, useEffect, useContext } from "react";
import { DataContext } from "./DataContext";
import axios from "axios";

const UiContext = createContext();

const UiContextProvider = ({ children }) => {
  const [mode, setMode] = useState("work");
  console.log(DataContext);
  const { setProjects } = useContext(DataContext);

  const [creatingCustomer, setCreatingCustomer] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(false);
  const [creatingInvoice, setCreatingInvoice] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedProjects, setSelectedProjects] = useState([]);

  const [accordionExpanded, setAccordionExpanded] = useState(false);

  useEffect(() => {
    setSelectedProjects([]);

    if (!selectedCustomer) {
      setAccordionExpanded(false);
      return;
    }

    if (selectedCustomer) {
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
    }
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
