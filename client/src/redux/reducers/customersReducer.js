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
} from "../types";

const initialState = {
  customers: [],
  loading: false,
  error: null,
  selectedCustomer: null,
};

export const customersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMERS_STARTED:
      return {
        ...state,
        loading: true,
      };
    case GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        customers: [...action.payload],
      };
    case GET_CUSTOMERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case SAVE_CUSTOMER_STARTED:
      return {
        ...state,
        loading: true,
      };
    case SAVE_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case SAVE_CUSTOMER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case UPDATE_CUSTOMER_STARTED:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case UPDATE_CUSTOMER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case SELECT_CUSTOMER:
      return {
        ...state,
        selectedCustomer: state.customers.find(
          (customer) => action.payload.customerId === customer.id
        ),
      };
    default:
      return state;
  }
};
