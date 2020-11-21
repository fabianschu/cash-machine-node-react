import React, { createContext } from "react";
import useAxios from "../hooks/useAxios";

const InvoiceContext = createContext();

const InvoiceContextProvider = ({ children }) => {
  const [invoices, loading, postInvoice, putInvoice, deleteInvoice] = useAxios(
    "/invoices",
    []
  );

  const defaultContext = {
    invoices,
    loading,
    postInvoice,
    putInvoice,
    deleteInvoice,
  };

  return (
    <InvoiceContext.Provider value={defaultContext}>
      {children}
    </InvoiceContext.Provider>
  );
};

export { InvoiceContext, InvoiceContextProvider };
