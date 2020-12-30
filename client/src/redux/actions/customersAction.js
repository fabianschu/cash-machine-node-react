import {
  GET_CUSTOMERS_STARTED,
  GET_CUSTOMERS_SUCCESS,
  GET_CUSTOMERS_FAILURE,
  SAVE_CUSTOMER_STARTED,
  SAVE_CUSTOMER_SUCCESS,
  SAVE_CUSTOMER_FAILURE,
  UPDATE_CUSTOMER_STARTED,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAILURE,
} from "../types";
import axios from "axios";

export function fetchCustomers() {
  return function (dispatch) {
    dispatch(getCustomersStarted());
    return axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/customers`)
      .then(({ data }) => {
        dispatch(getCustomersSuccess(data));
      })
      .catch((err) => {
        dispatch(getCustomersFailure(err.message));
      });
  };
}

const getCustomersStarted = () => ({
  type: GET_CUSTOMERS_STARTED,
});

const getCustomersSuccess = (customers) => ({
  type: GET_CUSTOMERS_SUCCESS,
  payload: [...customers],
});

const getCustomersFailure = (error) => ({
  type: GET_CUSTOMERS_FAILURE,
  payload: {
    error,
  },
});

export function saveCustomer(customer) {
  return function (dispatch) {
    dispatch(saveCustomerStarted());
    return axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/customers`, customer)
      .then(({ data }) => {
        dispatch(saveCustomerSuccess(data));
      })
      .catch((err) => {
        dispatch(saveCustomerFailure(err.message));
      });
  };
}

const saveCustomerStarted = () => ({
  type: SAVE_CUSTOMER_STARTED,
});

const saveCustomerSuccess = (customer) => ({
  type: SAVE_CUSTOMER_SUCCESS,
  payload: {
    customer,
  },
});

const saveCustomerFailure = (error) => ({
  type: SAVE_CUSTOMER_FAILURE,
  payload: {
    error,
  },
});

export function updateCustomer(customer) {
  return function (dispatch) {
    dispatch(updateCustomerStarted());
    return axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api/customers/${customer.id}`,
        customer
      )
      .then(({ data }) => {
        dispatch(updateCustomerSuccess(data));
      })
      .catch((err) => {
        dispatch(updateCustomerFailure(err.message));
      });
  };
}

const updateCustomerStarted = () => ({
  type: UPDATE_CUSTOMER_STARTED,
});

const updateCustomerSuccess = (customer) => ({
  type: UPDATE_CUSTOMER_SUCCESS,
  payload: {
    customer,
  },
});

const updateCustomerFailure = (error) => ({
  type: UPDATE_CUSTOMER_FAILURE,
  payload: {
    error,
  },
});
