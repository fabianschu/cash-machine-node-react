import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const { authenticatedUser } = useContext(AuthContext);

  const [customers, setCustomers] = useState();
  const [projects, setProjects] = useState();
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    getAndSetCustomers();
    getProjects();
    getUserProfile();
  }, []);

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

  const getAndSetProjects = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/projects`
      );
      return setProjects(data);
    } catch (e) {
      console.log(e);
    }
  };

  const addProject = async (values) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/projects`,
        values
      );
    } catch (e) {
      console.log(e);
    }
    await getAndSetProjects();
  };

  const editProject = async (values) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api/projects/:id`,
        values
      );
    } catch (e) {
      console.log(e);
    }
    await getAndSetProjects();
  };

  const deleteProject = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/api/projects/${id}`
      );
    } catch (e) {
      console.log(e);
    }
    await getAndSetProjects();
  };

  const getUserProfile = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/user_profiles/${authenticatedUser}`
      );
      setUserProfile(data);
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
    addProject,
    editProject,
    deleteProject,
  };

  return (
    <DataContext.Provider value={defaultContext}>
      {customers && projects && children}
    </DataContext.Provider>
  );
};

export { DataContext, DataContextProvider };
