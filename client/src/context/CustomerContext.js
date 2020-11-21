import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import useAxios from "../hooks/useAxios";

const config = {
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api`,
};

const axiosInstance = axios.create(config);

const CustomerContext = createContext();

const CustomerContextProvider = ({ children }) => {
  // const [customers, setCustomers] = useState([]);
  const [data, loading, getCustomer, updateCustomer] = useAxios(
    "/customers",
    []
  );

  // const [putData, putLoading, updateCustomer] = useAxios("/customers", "put");
  // const [postData, postLoading, postCustomer] = useAxios("/customers", "post");

  // const loadingCustomer = [loading, putLoading, postLoading].some((el) => el);

  // console.log(data);
  // console.log(putData);
  // console.log(postData);
  // console.log(loadingCustomer);

  const defaultContext = {
    customers: data,
    updateCustomer,
  };

  return (
    <CustomerContext.Provider value={defaultContext}>
      {children}
    </CustomerContext.Provider>
  );
};

export { CustomerContext, CustomerContextProvider };
