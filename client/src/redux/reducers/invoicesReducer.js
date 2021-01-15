import {
  GET_INVOICES_STARTED,
  GET_INVOICES_SUCCESS,
  GET_INVOICES_FAILURE,
  SAVE_INVOICE_STARTED,
  SAVE_INVOICE_SUCCESS,
  SAVE_INVOICE_FAILURE,
  UPDATE_INVOICE_STARTED,
  UPDATE_INVOICE_SUCCESS,
  UPDATE_INVOICE_FAILURE,
  TOGGLE_INVOICE_CREATION,
} from "../types";

const initialState = {
  invoices: [],
  loading: false,
  error: null,
  creatingInvoice: false,
};

export const invoicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INVOICES_STARTED:
      return {
        ...state,
        loading: true,
      };
    case GET_INVOICES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        invoices: [...state.invoices, ...action.payload],
      };
    case GET_INVOICES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case SAVE_INVOICE_STARTED:
      return {
        ...state,
        loading: true,
      };
    case SAVE_INVOICE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case SAVE_INVOICE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case UPDATE_INVOICE_STARTED:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_INVOICE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case UPDATE_INVOICE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case TOGGLE_INVOICE_CREATION:
      return {
        ...state,
        creatingInvoice: !state.creatingInvoice,
      };
    default:
      return state;
  }
};
