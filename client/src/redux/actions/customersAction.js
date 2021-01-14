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
  SELECT_CUSTOMER,
  TOGGLE_CUSTOMER_CREATION,
  TOGGLE_CUSTOMER_EDIT,
} from "../types";
import axios from "../apiClient";

export function fetchCustomers() {
  return function (dispatch) {
    dispatch(getCustomersStarted());
    return axios
      .get(`/customers`)
      .then(({ data }) => {
        console.log(data);
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

export function saveCustomer(customer, history) {
  return async (dispatch) => {
    dispatch(saveCustomerStarted());
    try {
      const { data } = await axios.post(`/customers`, customer);
      dispatch(saveCustomerSuccess(data));
      dispatch(fetchCustomers());
      history.push(`/customers/${data.id}`);
    } catch (err) {
      console.log(err);
      dispatch(saveCustomerFailure(err.message));
    }
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
      .post(`/customers/${customer.id}`, customer)
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

export const selectCustomer = (customerId) => ({
  type: SELECT_CUSTOMER,
  payload: {
    customerId,
  },
});

export const toggleCustomerCreation = () => ({
  type: TOGGLE_CUSTOMER_CREATION,
});

export const toggleCustomerEdit = () => ({
  type: TOGGLE_CUSTOMER_EDIT,
});
